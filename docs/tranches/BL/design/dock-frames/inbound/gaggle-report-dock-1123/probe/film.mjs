// The gaggle report dock film (dock-frames O-420 inbound). A measurement, no source edits.
//
//   PW_MODULE=<dashboard>/node_modules/playwright/index.mjs \
//   ~/.claude/guard/guarded --timeout 60 -- node film.mjs --engine chromium --base http://127.0.0.1:5437 --out <dir>
//   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- node film.mjs --engine webkit ...
//
// The page is gaggle's route R report (dashboard/src/report, PageDock.vue on glass-ui 11.1.0's GlassDock), served
// from fixtures by `npm run report:serve`. One browser per run (Playwright's headless shell for Chromium); one
// new context per cell; everything closed in finally.
//
// Every motion is sampled every animation frame by lib.mjs SAMPLER (getBoundingClientRect of the dock's outer
// box, its plate, every seat, the gliding mark, the theme toggles and the popovers). When a motion shows a
// fault, it is run again under a screenshot loop (a frame every few animation frames), and a strip of the
// frames that show the fault is written as PNG, with the rest box drawn on each frame and 4x insets.
import fs from "node:fs";
import path from "node:path";
import { SAMPLER, analyse, faultsOf } from "./lib.mjs";

const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const ENGINE = arg("engine", "chromium");
const BASE = arg("base", "http://127.0.0.1:5437");
const OUT = path.resolve(arg("out", "./out"));
const CELLS = new RegExp(arg("cells", "."));
const FILM = arg("film", "1") === "1";
const SCENE = arg("scene", "nov23");
const MOTIONS = arg("motions", null) ? new RegExp(arg("motions")) : null;   // re-run only these motions; merged into the cell's JSON
const { chromium, webkit } = await import(process.env.PW_MODULE ?? "playwright");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(path.join(OUT, "runs", ENGINE, "raw"), { recursive: true });
fs.mkdirSync(path.join(OUT, "strips"), { recursive: true });

const H = { 1440: 900, 768: 1024, 390: 844 };
const CELL_LIST = [];
for (const w of [1440, 768, 390]) for (const scheme of ["light", "dark"]) for (const rm of [false, true]) CELL_LIST.push({ lens: "team", w, scheme, rm });
CELL_LIST.push({ lens: "gaggle", w: 390, scheme: "light", rm: false });
const cellId = (c) => `${c.lens}-${c.w}-${c.scheme}${c.rm ? "-rm" : ""}`;

// ---------------------------------------------------------------- helpers driven from node
const centre = async (page, sel) => {
    const b = await page.locator(sel).first().boundingBox();
    if (!b) throw new Error("no box for " + sel);
    return [b.x + b.width / 2, b.y + b.height / 2];
};
const neutral = async (page) => { const vw = page.viewportSize().width; await page.mouse.move(Math.round(vw / 2), 24); };
const still = (page) => page.evaluate(() => new Promise((res) => {
    let last = null, same = 0, n = 0;
    const key = () => {
        const d = document.querySelector(".r-dock-seat .glass-dock");
        if (!d) return "";
        return [d, d.querySelector(".dock-run-mark"), ...document.querySelectorAll(".dark-mode-toggle-button, [data-reka-popper-content-wrapper] > *")].filter(Boolean).map((e) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.width, b.height].map((v) => v.toFixed(2)).join(","); }).join("|") + "@" + scrollY;
    };
    const tick = () => { const k = key(); same = k === last ? same + 1 : 0; last = k; if (same >= 15 || ++n > 360) res(n); else requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
}));
const isDark = (page) => page.evaluate(() => document.documentElement.classList.contains("dark"));
const menuOpen = (page) => page.evaluate(() => !!document.querySelector("[data-reka-popper-content-wrapper] .r-menu"));
const findOpen = (page) => page.evaluate(() => !!document.querySelector("[data-reka-popper-content-wrapper] .r-find-pop"));
const scrollTop = async (page) => { await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" })); await sleep(300); };
async function closeAll(page) {
    for (let i = 0; i < 3; i++) {
        if (!(await menuOpen(page)) && !(await findOpen(page))) break;
        await page.keyboard.press("Escape");
        await sleep(350);
    }
    await page.evaluate(() => document.activeElement?.blur?.());
}
async function openMenu(page) { if (!(await menuOpen(page))) { await page.locator('.r-dock-seat [data-seat="sections"]').click(); await sleep(700); } }
async function openFind(page) { if (!(await findOpen(page))) { await page.locator('.r-dock-seat [data-seat="find"]').click(); await sleep(700); } }
const togSel = (compact) => (compact ? "[data-reka-popper-content-wrapper] .r-menu .dark-mode-toggle-button" : '.r-dock-seat [data-seat="theme"] .dark-mode-toggle-button');
async function ensureScheme(page, wantDark, compact) {
    if ((await isDark(page)) === wantDark) return;
    if (compact) await openMenu(page);
    await page.locator(togSel(compact)).first().click();
    await sleep(900);
}
async function press(page) { await page.mouse.down(); await sleep(120); await page.mouse.up(); }

// ---------------------------------------------------------------- the motions
// grp: b = every way the dock could collapse or expand (and the section switch); c = hover on the theme toggle;
// d = press and toggle of the theme toggle. Each `pre` sets the motion's start state from any state, so a
// motion can be run again for its film. `above` is how much of the screen above the dock its frames keep.
function motions(c, compact) {
    const startDark = c.scheme === "dark";
    const vw = c.w, vh = H[c.w];
    const outsidePt = [4, Math.round(vh * 0.4)];
    const m = [
        { id: "b-dock-hover-in", grp: "b", pre: async (p) => { await closeAll(p); await neutral(p); }, go: async (p) => { const [x, y] = await centre(p, ".r-dock-seat .kit-lamp-seat"); await p.mouse.move(x, y); }, win: 1200 },
        { id: "b-dock-hover-out", grp: "b", pre: async (p) => { await closeAll(p); const [x, y] = await centre(p, ".r-dock-seat .kit-lamp-seat"); await p.mouse.move(x, y); await sleep(400); }, go: (p) => neutral(p), win: 1200 },
        { id: "b-escape-in-dock", grp: "b", pre: async (p) => { await closeAll(p); await neutral(p); await p.locator(compact ? '.r-dock-seat [data-seat="sections"]' : '.r-dock-seat [data-seat="section"]').first().focus(); await sleep(300); }, go: (p) => p.keyboard.press("Escape"), win: 1200, after: (p) => p.evaluate(() => document.activeElement?.blur?.()) },
        { id: "b-outside-tap", grp: "b", pre: async (p) => { await closeAll(p); await neutral(p); }, go: (p) => p.mouse.click(...outsidePt), win: 1200 },
        { id: "b-scroll", grp: "b", pre: async (p) => { await closeAll(p); await scrollTop(p); await p.mouse.move(Math.round(vw / 2), Math.round(vh / 2)); }, go: (p) => p.mouse.wheel(0, 1400), win: 2400, after: scrollTop },
        // the run's scroll is put back to where the page loads it (0), so a second run of this motion starts as the first did
        { id: "b-find-open", grp: "b", pre: async (p) => { await closeAll(p); await neutral(p); await p.evaluate(() => { const r = document.querySelector(".r-dock-seat .dock-run"); if (r) r.scrollLeft = 0; }); await sleep(300); }, go: (p) => p.locator('.r-dock-seat [data-seat="find"]').click(), win: 1400, above: 260 },
        { id: "b-find-close", grp: "b", popGoes: true, pre: async (p) => { await openFind(p); }, go: (p) => p.keyboard.press("Escape"), win: 1400, above: 260, after: closeAll },
    ];
    if (!compact) {
        m.push({ id: "b-section-switch", grp: "b", pre: async (p) => { await closeAll(p); await scrollTop(p); await neutral(p); }, go: async (p) => { const seats = p.locator('.r-dock-seat [data-seat="section"]:not([data-off]):not([aria-current])'); await seats.nth((await seats.count()) - 1).click(); }, win: 3200, after: scrollTop });
        m.push({ id: "c-theme-hover-in", grp: "c", pre: async (p) => { await closeAll(p); await neutral(p); await sleep(500); }, go: async (p) => { const [x, y] = await centre(p, togSel(false)); await p.mouse.move(x, y); }, win: 1600 });
        m.push({ id: "c-theme-hover-out", grp: "c", pre: async (p) => { await closeAll(p); const [x, y] = await centre(p, togSel(false)); await p.mouse.move(x, y); await sleep(1100); }, go: (p) => neutral(p), win: 1200 });
        m.push({ id: "d-theme-toggle-1", grp: "d", pre: async (p) => { await closeAll(p); await ensureScheme(p, startDark, false); const [x, y] = await centre(p, togSel(false)); await p.mouse.move(x, y); await sleep(1000); }, go: press, win: 1600 });
        m.push({ id: "d-theme-toggle-2", grp: "d", pre: async (p) => { await closeAll(p); await ensureScheme(p, !startDark, false); const [x, y] = await centre(p, togSel(false)); await p.mouse.move(x, y); await sleep(1000); }, go: press, win: 1600, after: neutral });
    } else {
        m.push({ id: "b-menu-open", grp: "b", popGoes: true, skipTog: true, pre: async (p) => { await closeAll(p); await openFind(p); await closeAll(p); await neutral(p); }, go: (p) => p.locator('.r-dock-seat [data-seat="sections"]').click(), win: 1400, above: 440 });
        m.push({ id: "b-menu-escape", grp: "b", popGoes: true, skipTog: true, pre: (p) => openMenu(p), go: (p) => p.keyboard.press("Escape"), win: 1400, above: 440 });
        m.push({ id: "b-menu-outside", grp: "b", popGoes: true, skipTog: true, pre: async (p) => { await closeAll(p); await openMenu(p); }, go: (p) => p.mouse.click(...outsidePt), win: 1400, above: 440 });
        m.push({ id: "b-section-switch", grp: "b", popGoes: true, skipTog: true, pre: async (p) => { await closeAll(p); await scrollTop(p); await openMenu(p); }, go: async (p) => { const it = p.locator("[data-reka-popper-content-wrapper] .r-menu .r-menu__item:not([data-off]):not([aria-current])"); await it.nth((await it.count()) - 1).click(); }, win: 3200, above: 440, after: async (p) => { await closeAll(p); await scrollTop(p); } });
        m.push({ id: "c-theme-hover-in", grp: "c", pre: async (p) => { await closeAll(p); await openMenu(p); const [x, y] = await centre(p, "[data-reka-popper-content-wrapper] .r-menu__theme > span:last-child"); await p.mouse.move(x, y); await sleep(500); }, go: async (p) => { const [x, y] = await centre(p, togSel(true)); await p.mouse.move(x, y); }, win: 1400, above: 440 });
        m.push({ id: "c-theme-hover-out", grp: "c", pre: async (p) => { await openMenu(p); const [x, y] = await centre(p, togSel(true)); await p.mouse.move(x, y); await sleep(600); }, go: async (p) => { const [x, y] = await centre(p, "[data-reka-popper-content-wrapper] .r-menu__theme > span:last-child"); await p.mouse.move(x, y); }, win: 1200, above: 440 });
        m.push({ id: "d-theme-toggle-1", grp: "d", pre: async (p) => { await ensureScheme(p, startDark, true); await openMenu(p); const [x, y] = await centre(p, togSel(true)); await p.mouse.move(x, y); await sleep(600); }, go: press, win: 1600, above: 440 });
        m.push({ id: "d-theme-toggle-2", grp: "d", pre: async (p) => { await ensureScheme(p, !startDark, true); await openMenu(p); const [x, y] = await centre(p, togSel(true)); await p.mouse.move(x, y); await sleep(600); }, go: press, win: 1600, above: 440, after: async (p) => { await closeAll(p); await neutral(p); } });
    }
    return c.rm ? m.filter((x) => x.grp !== "c") : m;
}

// ---------------------------------------------------------------- one recorded run of a motion
async function record(page, mo, filmIt) {
    await mo.pre?.(page);
    await still(page);
    await page.evaluate(() => window.__film.start());
    await sleep(250);
    const shots = [];
    let stop = false, loop = null, clip = null, offset = 0;
    if (filmIt) {
        const vw = page.viewportSize().width, vh = page.viewportSize().height;
        const d = await page.evaluate(() => { const b = document.querySelector(".r-dock-seat .glass-dock").getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; });
        const above = mo.above ?? 76;
        const x0 = mo.grp === "c" ? 0 : Math.max(0, Math.floor(d[0] - 40)), x1 = mo.grp === "c" ? vw : Math.min(vw, Math.ceil(d[0] + d[2] + 40));
        const y0 = Math.max(0, Math.floor(d[1] - above));
        clip = { x: x0, y: y0, width: x1 - x0, height: vh - y0 };
        const n0 = performance.now();
        const pt = await page.evaluate(() => performance.now() - window.__film.t0);
        offset = pt - (n0 + performance.now()) / 2;
        loop = (async () => {
            while (!stop) {
                const t = performance.now();
                try { const buf = await page.screenshot({ clip, animations: "allow", caret: "initial" }); shots.push({ t: t + offset, buf }); } catch { /* the page is busy; next */ }
            }
        })();
        await sleep(60);
    }
    await page.evaluate(() => window.__film.mark());
    await mo.go(page);
    await sleep(mo.win);
    stop = true;
    await loop;
    const rec = await page.evaluate(() => window.__film.stop());
    // the trigger is the first input event the page saw after the mark (pointer, key or wheel), else the mark
    const ev = rec.events.find((e) => e.t >= rec.trig && e.t < rec.trig + 150 && e.type !== "pointerup");
    if (ev) rec.trig = ev.t;
    await mo.after?.(page);
    return { rec, shots, clip };
}

// ---------------------------------------------------------------- the strip
async function strip(browser, file, rec, a, shots, clip, faults, title) {
    if (!shots.length) return null;
    const restDock = a.rest.dock;
    const fr = rec.frames.filter((f) => f.dock);
    const near = (t) => fr.reduce((b, f) => (Math.abs(f.t - t) < Math.abs(b.t - t) ? f : b), fr[0]);
    // pick tiles: last before the trigger, the frames nearest each fault time and the tail, the last
    const pick = new Set();
    const idxAt = (t) => shots.reduce((bi, s, i) => (Math.abs(s.t - t) < Math.abs(shots[bi].t - t) ? i : bi), 0);
    const before = shots.filter((s) => s.t < rec.trig);
    pick.add(before.length ? shots.indexOf(before[before.length - 1]) : 0);
    for (const f of faults) if (f.at != null) { const i = idxAt(f.at); pick.add(i); if (i > 0) pick.add(i - 1); if (i + 1 < shots.length) pick.add(i + 1); }
    for (const tt of a.tail.slice(-3)) pick.add(idxAt(tt.t));
    if (a.tail.length) { const i = idxAt(a.tail[a.tail.length - 1].t); if (i + 1 < shots.length) pick.add(i + 1); }
    const after = shots.filter((s) => s.t > rec.trig);
    if (after.length) { pick.add(shots.indexOf(after[Math.min(2, after.length - 1)])); pick.add(shots.length - 1); }
    const idx = [...pick].sort((x, y) => x - y).slice(0, 12);
    const seatFault = faults.find((f) => f.seat);
    const rows = idx.map((i) => {
        const s = shots[i];
        const f = near(s.t);
        const dl = f.dock ? (f.dock[0] - restDock[0]).toFixed(2) : "-";
        const dr = f.dock ? (f.dock[0] + f.dock[2] - restDock[0] - restDock[2]).toFixed(2) : "-";
        const dc = f.dock ? (f.dock[0] + f.dock[2] / 2 - restDock[0] - restDock[2] / 2).toFixed(2) : "-";
        let seatTxt = "", seatBox = null, seatRest = null;
        if (seatFault) {
            const k = seatFault.seat;
            const restF = rec.frames.filter((g) => g.t < rec.trig && g.dock).pop() ?? fr[0];
            seatRest = k.startsWith("tog") ? restF.tog?.[k] ?? fr.find((g) => g.tog?.[k])?.tog?.[k] : restF.seats?.[k];
            seatBox = k.startsWith("tog") ? f.tog?.[k] : f.seats?.[k];
            if (seatBox && seatRest) seatTxt = ` | ${k} dx ${(seatBox[0] + seatBox[2] / 2 - seatRest[0] - seatRest[2] / 2).toFixed(2)} dw ${(seatBox[2] - seatRest[2]).toFixed(2)}`;
        }
        return { src: "data:image/png;base64," + s.buf.toString("base64"), label: `t ${(s.t - rec.trig).toFixed(0)} ms (frame t ${(f.t - rec.trig).toFixed(0)}) | dock dl ${dl} dc ${dc} dr ${dr}${seatTxt}`, seatRest };
    });
    const W = clip.width, Hh = clip.height, Z = 4, ZW = 48;
    const gx = (x) => x - clip.x, gy = (y) => y - clip.y;
    const lines = [restDock[0], restDock[0] + restDock[2] / 2, restDock[0] + restDock[2]].map(gx);
    const zoomAt = seatFault && rows[0].seatRest ? [[gx(rows[0].seatRest[0] + rows[0].seatRest[2] / 2), gy(rows[0].seatRest[1] + rows[0].seatRest[3] / 2), "seat"]] : [[lines[0], gy(restDock[1] + restDock[3] / 2), "left edge"], [lines[2], gy(restDock[1] + restDock[3] / 2), "right edge"]];
    const zh = Math.min(Hh, 40);
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;padding:12px;background:#202020;color:#eee;font:12px/1.4 ui-monospace,Menlo,monospace}
h1{font-size:13px;margin:0 0 4px} .f{margin:0 0 10px;color:#f9c} .row{margin:0 0 10px} .lab{margin:0 0 3px}
.tile{position:relative;display:inline-block;vertical-align:top;outline:1px solid #555}
.tile img{display:block} .g{position:absolute;top:0;bottom:0;width:1px;background:rgba(255,0,200,.85)} .g.c{background:rgba(0,220,255,.9)}
.sb{position:absolute;outline:1px solid rgba(0,220,255,.95)}
.z{position:relative;display:inline-block;vertical-align:top;margin-left:8px;width:${ZW * Z}px;height:${zh * Z}px;background-repeat:no-repeat;image-rendering:pixelated;outline:1px solid #555}
.z i{position:absolute;top:0;bottom:0;left:${(ZW / 2) * Z}px;width:1px;background:rgba(255,0,200,.9)} .z b{position:absolute;left:2px;top:0;font-weight:400;color:#fff;background:#0008;font-size:10px}
</style></head><body><h1>${title}</h1><div class="f">${faults.map((f) => f.kind + ": " + f.why).join("<br>")}</div>
${rows.map((r) => `<div class="row"><div class="lab">${r.label}</div><div class="tile" style="width:${W}px;height:${Hh}px"><img src="${r.src}" width="${W}" height="${Hh}">${lines.map((x, j) => `<span class="g${j === 1 ? " c" : ""}" style="left:${x}px"></span>`).join("")}${r.seatRest ? `<span class="sb" style="left:${gx(r.seatRest[0])}px;top:${gy(r.seatRest[1])}px;width:${r.seatRest[2]}px;height:${r.seatRest[3]}px"></span>` : ""}</div>${zoomAt.map(([zx, zy, nm]) => `<span class="z" style="background-image:url(${r.src});background-size:${W * Z}px ${Hh * Z}px;background-position:${-(zx - ZW / 2) * Z}px ${-(zy - zh / 2) * Z}px"><i></i><b>${nm} 4x, line = rest</b></span>`).join("")}</div>`).join("\n")}
<div>magenta lines: the outer box's rest left and right; cyan: its rest centre${seatFault ? "; cyan box: the seat's rest box" : ""}. Frames are page screenshots taken every few animation frames in a second run of the same motion; numbers are that run's rAF sample nearest the screenshot.</div>
</body></html>`;
    const ctx = await browser.newContext({ viewport: { width: Math.max(600, W + 2 * ZW * Z + 60), height: 400 }, deviceScaleFactor: 1 });
    try {
        const pg = await ctx.newPage();
        await pg.setContent(html, { waitUntil: "load" });
        await pg.screenshot({ path: file, fullPage: true });
    } finally {
        await ctx.close();
    }
    return path.basename(file);
}

// ---------------------------------------------------------------- one cell
async function runCell(browser, c) {
    const id = cellId(c);
    const compact = c.lens === "team" ? c.w < 1180 : c.w < 1024;
    const url = `${BASE}/${c.lens}/${SCENE}/`;
    const res = { cell: id, engine: ENGINE, ...c, compact, url, load: null, motions: {}, faults: [], strips: [], startedAt: new Date().toISOString(), load1: (await import("node:os")).loadavg()[0] };
    const mkCtx = () => browser.newContext({ viewport: { width: c.w, height: H[c.w] }, deviceScaleFactor: 1, colorScheme: c.scheme, reducedMotion: c.rm ? "reduce" : "no-preference" });
    const ctx = await mkCtx();
    try {
        await ctx.addInitScript(SAMPLER);
        const page = await ctx.newPage();
        // (a) first open on load
        await page.goto(url, { waitUntil: "load" });
        await page.waitForSelector(".r-dock-seat .glass-dock", { timeout: 15000 });
        await sleep(4000);
        const lrec = await page.evaluate(() => window.__film.stop());
        lrec.trig = 0;
        const la = analyse(lrec, { restAt: "end" });
        const firstDock = lrec.frames.find((f) => f.dock);
        la.firstDockAt = firstDock?.t ?? null;
        la.firstDockOpacity = firstDock?.op ?? null;
        la.fontsLoadedAt = lrec.frames.find((f) => f.fonts === "loaded")?.t ?? null;
        const lf = faultsOf(la, {});
        res.load = la;
        if (lf.length) {
            res.faults.push(...lf.map((f) => ({ ...f, motion: "a-load" })));
            fs.writeFileSync(path.join(OUT, "runs", ENGINE, "raw", `${id}-a-load.json`), JSON.stringify(lrec));
            if (FILM) {
                // film the load in its own context: screenshots of the dock band from the first commit
                const fctx = await mkCtx();
                try {
                    await fctx.addInitScript(SAMPLER);
                    const fp = await fctx.newPage();
                    const shots = [];
                    let stop = false;
                    const vh = H[c.w];
                    const rest = la.rest.dock;
                    const clip = { x: Math.max(0, Math.floor(rest[0] - 40)), y: Math.max(0, Math.floor(rest[1] - 76)), width: Math.min(c.w, Math.ceil(rest[0] + rest[2] + 40)) - Math.max(0, Math.floor(rest[0] - 40)), height: vh - Math.max(0, Math.floor(rest[1] - 76)) };
                    const nav = fp.goto(url, { waitUntil: "commit" });
                    await nav;
                    const n0 = performance.now();
                    const pt = await fp.evaluate(() => performance.now() - window.__film.t0).catch(() => 0);
                    const offset = pt - (n0 + performance.now()) / 2;
                    const t1 = performance.now();
                    while (!stop && performance.now() - t1 < 4000) {
                        const t = performance.now();
                        try { shots.push({ t: t + offset, buf: await fp.screenshot({ clip, animations: "allow" }) }); } catch { await sleep(16); }
                    }
                    const frec = await fp.evaluate(() => window.__film.stop());
                    frec.trig = 0;
                    const fa = analyse(frec, { restAt: "end" });
                    const s = await strip(browser, path.join(OUT, "strips", `${ENGINE}-${id}-a-load.png`), frec, fa, shots, clip, lf, `${ENGINE} ${id} a-load (first open on load)`);
                    if (s) res.strips.push(s);
                } finally {
                    await fctx.close();
                }
            }
        }
        // (b)-(e)
        for (const mo of motions(c, compact).filter((x) => !MOTIONS || MOTIONS.test(x.id))) {
            let a, fl;
            try {
                const { rec } = await record(page, mo, false);
                a = analyse(rec);
                fl = faultsOf(a, mo);
                res.motions[mo.id] = a;
                if (fl.length) {
                    res.faults.push(...fl.map((f) => ({ ...f, motion: mo.id })));
                    fs.writeFileSync(path.join(OUT, "runs", ENGINE, "raw", `${id}-${mo.id}.json`), JSON.stringify(rec));
                    if (FILM) {
                        const { rec: frec, shots, clip } = await record(page, mo, true);
                        const fa = analyse(frec);
                        const ff = faultsOf(fa, mo);
                        res.motions[mo.id].filmRun = { outer: fa.outer, toggles: fa.toggles, seats: fa.seats, faults: ff.length, shots: shots.length };
                        const s = await strip(browser, path.join(OUT, "strips", `${ENGINE}-${id}-${mo.id}.png`), frec, fa, shots, clip, ff.length ? ff : fl, `${ENGINE} ${id} ${mo.id}`);
                        if (s) res.strips.push(s);
                    }
                }
            } catch (e) {
                res.motions[mo.id] = { err: String(e?.message ?? e).slice(0, 300) };
                try { await closeAll(page); await scrollTop(page); } catch { /* next */ }
            }
            process.stdout.write(`  ${mo.id}: ${res.motions[mo.id].err ? "ERR " + res.motions[mo.id].err : `outer l/c/r ${a.outer.l}/${a.outer.c}/${a.outer.r} run scroll ${a.run.restScrollLeft}->${a.run.endScrollLeft} (overflow ${a.run.overflow}) settle ${a.settle} ms faults ${fl.length}`}\n`);
        }
    } finally {
        await ctx.close();
    }
    const file = path.join(OUT, "runs", ENGINE, `${id}.json`);
    if (MOTIONS && fs.existsSync(file)) {
        const old = JSON.parse(fs.readFileSync(file, "utf8"));
        for (const [k, v] of Object.entries(res.motions)) old.motions[k] = v;
        old.faults = [...(old.faults ?? []).filter((f) => !(f.motion in res.motions)), ...res.faults.filter((f) => f.motion in res.motions)];
        old.strips = [...new Set([...(old.strips ?? []), ...res.strips])];
        old.reruns = [...(old.reruns ?? []), { at: res.startedAt, motions: Object.keys(res.motions), load1: res.load1 }];
        fs.writeFileSync(file, JSON.stringify(old, null, 1));
        return old;
    }
    fs.writeFileSync(file, JSON.stringify(res, null, 1));
    return res;
}

// ---------------------------------------------------------------- main
const launcher = ENGINE === "webkit" ? webkit : chromium;
const browser = await launcher.launch({ headless: true });
try {
    for (const c of CELL_LIST) {
        const id = cellId(c);
        if (!CELLS.test(id)) continue;
        console.log(`${ENGINE} ${id}`);
        try {
            const r = await runCell(browser, c);
            console.log(`  -> ${r.faults.length} faults, ${r.strips.length} strips`);
        } catch (e) {
            console.log(`  cell failed: ${e?.message ?? e}`);
            fs.writeFileSync(path.join(OUT, "runs", ENGINE, `${id}.json`), JSON.stringify({ cell: id, engine: ENGINE, err: String(e?.stack ?? e) }, null, 1));
        }
    }
} finally {
    await browser.close();
}
