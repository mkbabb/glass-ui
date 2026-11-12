// capture.mjs --site <dir> --engine chromium|webkit --out <dir> [--widths 390,1440] [--themes light,dark]
// Paint captures + measurements for proposal A (per-plate shape springs). One browser per run,
// a new context per cell (engine × width × theme × plate count), everything closed in finally.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import os from "node:os";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const NM = path.join(REPO, "node_modules");
const playwright = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, k, i, arr) => (k.startsWith("--") ? [...a, [k.slice(2), arr[i + 1]]] : a), []));
const site = path.resolve(args.site);
const engine = args.engine ?? "chromium";
const out = path.resolve(args.out);
const widths = (args.widths ?? "390,1440").split(",").map(Number);
const themes = (args.themes ?? "light,dark").split(",");
fs.mkdirSync(path.join(out, "png"), { recursive: true });

// Playwright WebKit 26.5 (not Safari) kills the page on a nested translucent color-mix(), which the
// dock plate border resolves to (dock/harness/adapter-head.mjs). Same shim as the dock harness: WebKit only.
const WEBKIT_SHIM = ".glass-dock .dock-plate { border-color: var(--dock-plate-expanded-border) !important; }";
const NAIVE = `.glass-dock-cluster > .glass-dock::before { display: none !important; }
.glass-dock-cluster > .glass-dock { box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--shadow-dock) !important; }
.glass-dock-cluster > .glass-dock > .dock-plate { clip-path: none !important; }
.glass-dock-cluster > .glass-dock[data-seam-start="fused"] { margin-inline-start: 0 !important; }`;

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    let p = path.join(site, decodeURIComponent(u.pathname));
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html");
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/`;

const L = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
const decode = (buf) => PNG.sync.read(buf);
const rec = { engine, load: [], cells: [] };
const load = () => +os.loadavg()[0].toFixed(1);

async function open(browser, w, theme, n, extra = {}) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 560 }, deviceScaleFactor: extra.dsf ?? 2, colorScheme: theme, reducedMotion: extra.reduced ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => console.log(`  pageerror ${e.message}`));
    page.on("console", (m) => { if (m.type() === "error") console.log(`  console ${m.text()}`); });
    if (theme === "dark") await page.addInitScript(() => { const f = () => document.documentElement.classList.add("dark"); document.documentElement ? f() : document.addEventListener("readystatechange", f, { once: true }); });
    if (engine === "webkit" && !process.env.NO_SHIM) await page.addInitScript((css) => { const add = () => { const st = document.createElement("style"); st.textContent = css; (document.head || document.documentElement).appendChild(st); }; document.documentElement ? add() : document.addEventListener("readystatechange", add, { once: true }); }, WEBKIT_SHIM);
    const q = new URLSearchParams({ n: String(n), fused: extra.fused ? "1" : "0", ...(extra.flat ? { flat: "1" } : {}) });
    await page.goto(`${base}?${q}`);
    if (extra.flat) await page.addStyleTag({ content: ".band { display: none; }" });
    if (extra.naive) await page.addStyleTag({ content: NAIVE });
    await page.waitForFunction(() => window.__cluster?.ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    return { ctx, page };
}

async function clusterBox(page) {
    return page.evaluate(() => {
        const ds = [...document.querySelectorAll(".glass-dock-cluster > .glass-dock")];
        const rs = ds.map((d) => d.getBoundingClientRect());
        const x0 = Math.min(...rs.map((r) => r.left)), x1 = Math.max(...rs.map((r) => r.right));
        const y0 = Math.min(...rs.map((r) => r.top)), y1 = Math.max(...rs.map((r) => r.bottom));
        return { x0, x1, y0, y1, plates: rs.map((r) => ({ l: r.left, r: r.right, t: r.top, b: r.bottom })) };
    });
}

async function shot(page, name, box) {
    const pad = 28;
    const vw = page.viewportSize().width;
    const clip = { x: Math.max(0, box.x0 - pad), y: box.y0 - pad, width: Math.min(vw, box.x1 + pad) - Math.max(0, box.x0 - pad), height: box.y1 - box.y0 + 2 * pad };
    const buf = await page.screenshot({ clip, animations: "allow" });
    fs.writeFileSync(path.join(out, "png", name + ".png"), buf);
    return { buf, clip };
}

/** Radii and computed values that must never carry a %. */
async function radii(page) {
    return page.evaluate(() => {
        const props = ["border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius"];
        const out = [];
        for (const d of document.querySelectorAll(".glass-dock-cluster > .glass-dock")) {
            for (const el of [d, d.querySelector(".dock-plate")]) {
                const cs = getComputedStyle(el);
                out.push(props.map((p) => cs.getPropertyValue(p)).join(" "));
            }
            out.push(getComputedStyle(d, "::before").getPropertyValue("border-top-left-radius"));
        }
        return out;
    });
}

/** Seam reads on a capture: for each fused join, the step at the join against the
    mean of the columns 4 px either side (device px ×2), on three rows: the halo above,
    the plate interior just under the top edge, and the halo below. */
function seamRead(buf, clip, box, S = 2) {
    const img = decode(buf);
    const res = [];
    const rowsCss = { haloTop: box.y0 - 5, interior: box.y0 + 3.5, haloBottom: box.y1 + 5 };
    for (let k = 0; k < box.plates.length - 1; k++) {
        const a = box.plates[k], b = box.plates[k + 1];
        const seamCss = (a.r + b.l) / 2;
        const out = { seam: k };
        for (const [name, yc] of Object.entries(rowsCss)) {
            const y = Math.round((yc - clip.y) * S);
            const xs = Math.round((seamCss - clip.x) * S);
            const col = (x) => L(img.data, (y * img.width + x) * 4);
            let worst = 0;
            for (let x = xs - 3; x <= xs + 3; x++) {
                const ref = (col(x - 8) + col(x + 8)) / 2;
                worst = Math.max(worst, Math.abs(col(x) - ref));
            }
            // the same read 40 px into plate A, for the noise floor of that row
            const xn = Math.round((seamCss - 40 - clip.x) * S);
            let floor = 0;
            for (let x = xn - 3; x <= xn + 3; x++) floor = Math.max(floor, Math.abs(col(x) - (col(x - 8) + col(x + 8)) / 2));
            out[name] = { step: +worst.toFixed(1), floor: +floor.toFixed(1) };
        }
        res.push(out);
    }
    return res;
}

/** Backdrop live under each plate: stripe contrast (luminance stdev on a row through the
    plate's top padding) against the bare band beside the cluster. A dead backdrop shows the
    stripes at full contrast. */
function blurRead(buf, clip, box) {
    const img = decode(buf);
    const S = 2;
    const y = Math.round((box.y0 + 4 - clip.y) * S);
    const sd = (x0, x1) => { const v = []; for (let x = Math.round((x0 - clip.x) * S); x < Math.round((x1 - clip.x) * S); x++) v.push(L(img.data, (y * img.width + x) * 4)); const m = v.reduce((a, b) => a + b, 0) / v.length; return Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length); };
    const plates = box.plates.map((p) => +sd(p.l + 14, p.r - 14).toFixed(1));
    const bareX0 = Math.max(clip.x + 1, box.x0 - 26);
    const bare = +sd(bareX0, box.x0 - 4).toFixed(1);
    return { plates, bare };
}

let browser;
try {
    browser = await playwright[engine].launch({ headless: true });
    for (const w of widths) for (const theme of themes) for (const n of [3, 2]) {
        const tag = `${engine}-${w}-${theme}-n${n}`;
        const cell = { tag, load: load() };
        try {
        // rest split
        let { ctx, page } = await open(browser, w, theme, n, { fused: false });
        try {
            let box = await clusterBox(page);
            let s = await shot(page, `${tag}-rest-split`, box);
            cell.split = { blur: blurRead(s.buf, s.clip, box), radii: await radii(page) };
            // the fuse, pinned at three spring phases (the FLIP arms on the real state change)
            await page.evaluate(() => window.__cluster.set(true));
            cell.mid = [];
            for (const p of [0.25, 0.5, 0.75]) {
                await page.evaluate((p) => window.__cluster.scrub(p), p);
                await page.waitForTimeout(120);
                box = await clusterBox(page);
                s = await shot(page, `${tag}-mid-${String(p * 100).padStart(2, "0")}`, box);
                cell.mid.push({ p, blur: blurRead(s.buf, s.clip, box), radii: await radii(page), gaps: box.plates.slice(1).map((b, i) => +(b.l - box.plates[i].r).toFixed(2)) });
            }
        } finally { await ctx.close(); }
        // rest fused (arrived at through the real spring, not loaded fused)
        ({ ctx, page } = await open(browser, w, theme, n, { fused: false }));
        try {
            await page.evaluate(() => window.__cluster.set(true));
            await page.waitForTimeout(1200);
            const box = await clusterBox(page);
            const s = await shot(page, `${tag}-rest-fused`, box);
            cell.fused = { seam: seamRead(s.buf, s.clip, box), blur: blurRead(s.buf, s.clip, box), radii: await radii(page), gaps: box.plates.slice(1).map((b, i) => +(b.l - box.plates[i].r).toFixed(2)) };
        } finally { await ctx.close(); }
        // seam on a flat field (the stripes off), ours vs the naive abutment
        for (const naive of [false, true]) {
            ({ ctx, page } = await open(browser, w, theme, n, { fused: true, flat: true, naive }));
            try {
                const box = await clusterBox(page);
                const s = await shot(page, `${tag}-flat-fused${naive ? "-naive" : ""}`, box);
                cell[naive ? "flatNaive" : "flat"] = seamRead(s.buf, s.clip, box);
            } finally { await ctx.close(); }
        }
        } catch (e) { cell.error = String(e.message).split("\n")[0]; console.log(tag, "ERROR", cell.error); rec.cells.push(cell); continue; }
        rec.cells.push(cell);
        console.log(tag, JSON.stringify({ seam: cell.fused.seam, flat: cell.flat, naive: cell.flatNaive, blurMid: cell.mid[1].blur, gaps: cell.fused.gaps }));
    }

    // the seam at DPR 1 (the border paints 1px there, so the inset and overlap must follow it)
    rec.dpr1 = {};
    for (const naive of [false, true]) {
        const { ctx, page } = await open(browser, 1440, "light", 3, { fused: true, flat: true, naive, dsf: 1 });
        try {
            const box = await clusterBox(page);
            const s = await shot(page, `${engine}-1440-light-n3-flat-fused-dpr1${naive ? "-naive" : ""}`, box);
            rec.dpr1[naive ? "naive" : "ours"] = seamRead(s.buf, s.clip, box, 1);
        } finally { await ctx.close(); }
    }
    console.log("dpr1", JSON.stringify(rec.dpr1));

    // frame cost, a11y and reduced motion at 1440 light, 3 plates
    {
        const { ctx, page } = await open(browser, 1440, "light", 3, { fused: false });
        try {
            const cdp = engine === "chromium" ? await ctx.newCDPSession(page) : null;
            if (cdp) await cdp.send("Performance.enable");
            const metrics = async () => (cdp ? Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value])) : null);
            const runFrames = () => page.evaluate(() => new Promise((res) => {
                const t = []; let last = performance.now(); const t0 = last;
                const tick = (now) => { t.push(now - last); last = now; if (now - t0 < 1000) requestAnimationFrame(tick); else res(t); };
                requestAnimationFrame(tick);
            }));
            const sum = (a, b, k) => (a && b ? +(b[k] - a[k]).toFixed(4) : null);
            const idle0 = await metrics(); const idleFrames = await runFrames(); const idle1 = await metrics();
            const m0 = await metrics();
            const morphP = runFrames();
            await page.evaluate(() => window.__cluster.set(true));
            const morphFrames = await morphP;
            const m1 = await metrics();
            const stats = (f) => { const s = [...f].sort((a, b) => a - b); return { frames: f.length, p50: +s[Math.floor(s.length / 2)].toFixed(2), p95: +s[Math.floor(s.length * 0.95)].toFixed(2), max: +s[s.length - 1].toFixed(2) }; };
            const keys = ["LayoutCount", "RecalcStyleCount", "LayoutDuration", "RecalcStyleDuration", "ScriptDuration", "TaskDuration"];
            rec.frameCost = {
                load: load(),
                idle: { rAF: stats(idleFrames), ...(idle0 ? Object.fromEntries(keys.map((k) => [k, sum(idle0, idle1, k)])) : {}) },
                morph: { rAF: stats(morphFrames), ...(m0 ? Object.fromEntries(keys.map((k) => [k, sum(m0, m1, k)])) : {}) },
            };
            // JS cost per frame of the cluster's own onFrame: time 200 scrubs
            rec.frameCost.scrubMsPerFrame = await page.evaluate(() => { const t0 = performance.now(); for (let i = 0; i < 200; i++) window.__cluster.scrub((i % 100) / 100); return +((performance.now() - t0) / 200).toFixed(4); });
            console.log("frameCost", JSON.stringify(rec.frameCost));
        } finally { await ctx.close(); }

        // a11y: tab order, roles, names, focus through a fuse
        const a = await open(browser, 1440, "light", 3, { fused: false });
        try {
            const tree = () => a.page.evaluate(() => [...document.querySelectorAll(".glass-dock-cluster button, .glass-dock-cluster [role=toolbar], .glass-dock-cluster [aria-label]")].map((e) => `${e.tagName}|${e.getAttribute("role") ?? ""}|${e.getAttribute("aria-label") ?? e.textContent.trim()}|${e.tabIndex}|${e.hasAttribute("inert")}`));
            const tabOrder = async () => { await a.page.evaluate(() => { let s = document.getElementById("sentinel"); if (!s) { s = document.createElement("button"); s.id = "sentinel"; s.textContent = "start"; document.body.prepend(s); } s.focus(); }); const seq = []; for (let i = 0; i < 7; i++) { await a.page.keyboard.press("Tab"); seq.push(await a.page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent.trim() || document.activeElement?.tagName)); } return seq; };
            const before = { tree: await tree(), tab: await tabOrder() };
            await a.page.evaluate(() => document.querySelector('[data-plate="controls"] button').focus());
            const focused0 = await a.page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
            await a.page.evaluate(() => window.__cluster.set(true));
            await a.page.waitForTimeout(1200);
            const focused1 = await a.page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
            const after = { tree: await tree(), tab: await tabOrder() };
            rec.a11y = { treeSame: JSON.stringify(before.tree) === JSON.stringify(after.tree), tabSame: JSON.stringify(before.tab) === JSON.stringify(after.tab), focusKept: focused0 === focused1, focused0, focused1, tab: after.tab, nodes: after.tree.length };
            console.log("a11y", JSON.stringify(rec.a11y));
        } finally { await a.ctx.close(); }

        // reduced motion: translate never set, fade dips and rises, lands fused
        const r = await open(browser, 1440, "light", 3, { fused: false, reduced: true });
        try {
            const trace = await r.page.evaluate(() => new Promise((res) => {
                const root = document.querySelector(".glass-dock-cluster");
                const ds = [...root.children];
                const out = []; const t0 = performance.now();
                const tick = () => {
                    out.push({ t: +(performance.now() - t0).toFixed(1), fade: +getComputedStyle(ds[1]).getPropertyValue("--dock-cluster-fade"), tr: ds.map((d) => d.style.translate).join("|"), fe: +getComputedStyle(ds[0]).getPropertyValue("--dock-fuse-end") });
                    if (performance.now() - t0 < 700) requestAnimationFrame(tick); else res(out);
                };
                window.__cluster.set(true);
                requestAnimationFrame(tick);
            }));
            const fades = trace.map((x) => x.fade);
            rec.reduced = { minFade: Math.min(...fades), endFade: fades.at(-1), anyTranslate: trace.some((x) => x.tr.replace(/\|/g, "") !== ""), fuseValues: [...new Set(trace.map((x) => x.fe))], frames: trace.length };
            const box = await clusterBox(r.page);
            await shot(r.page, `${engine}-1440-light-n3-reduced-end`, box);
            console.log("reduced", JSON.stringify(rec.reduced));
        } finally { await r.ctx.close(); }

        // interrupted: fuse, reverse at 40% of the way, record seam fuse per frame (continuity)
        const it = await open(browser, 1440, "light", 3, { fused: false });
        try {
            const trace = await it.page.evaluate(() => new Promise((res) => {
                const ds = [...document.querySelectorAll(".glass-dock-cluster > .glass-dock")];
                const out = []; const t0 = performance.now(); let flipped = false;
                const tick = () => {
                    const fe = +getComputedStyle(ds[0]).getPropertyValue("--dock-fuse-end");
                    out.push({ t: +(performance.now() - t0).toFixed(1), fe, x: +ds[0].getBoundingClientRect().left.toFixed(2) });
                    if (!flipped && fe > 0.4) { flipped = true; window.__cluster.set(false); }
                    if (performance.now() - t0 < 1000) requestAnimationFrame(tick); else res(out);
                };
                window.__cluster.set(true);
                requestAnimationFrame(tick);
            }));
            let maxJump = 0; for (let i = 1; i < trace.length; i++) maxJump = Math.max(maxJump, Math.abs(trace[i].x - trace[i - 1].x));
            rec.interrupt = { peakFuse: Math.max(...trace.map((x) => x.fe)), endFuse: trace.at(-1).fe, maxStepPx: +maxJump.toFixed(2), frames: trace.length };
            console.log("interrupt", JSON.stringify(rec.interrupt));
        } finally { await it.ctx.close(); }

        // a control-set change (the page's control count) while fused: neighbours FLIP
        const cs = await open(browser, 1440, "light", 3, { fused: true });
        try {
            const trace = await cs.page.evaluate(() => new Promise((res) => {
                const ds = [...document.querySelectorAll(".glass-dock-cluster > .glass-dock")];
                const out = []; const t0 = performance.now(); let fired = false;
                const tick = () => { out.push({ x0: +ds[0].getBoundingClientRect().left.toFixed(2), x2: +ds[2].getBoundingClientRect().left.toFixed(2) }); if (!fired) { fired = true; window.__cluster.extra(true); } if (performance.now() - t0 < 900) requestAnimationFrame(tick); else res(out); };
                requestAnimationFrame(tick);
            }));
            let j0 = 0, j2 = 0; for (let i = 1; i < trace.length; i++) { j0 = Math.max(j0, Math.abs(trace[i].x0 - trace[i - 1].x0)); j2 = Math.max(j2, Math.abs(trace[i].x2 - trace[i - 1].x2)); }
            rec.controlSet = { travel0: +(trace.at(-1).x0 - trace[0].x0).toFixed(2), travel2: +(trace.at(-1).x2 - trace[0].x2).toFixed(2), maxStep0: +j0.toFixed(2), maxStep2: +j2.toFixed(2), frames: trace.length };
            const box = await clusterBox(cs.page);
            await shot(cs.page, `${engine}-1440-light-n3-controlset-end`, box);
            console.log("controlSet", JSON.stringify(rec.controlSet));
        } finally { await cs.ctx.close(); }
    }
} finally {
    if (browser) await browser.close();
    server.close();
    fs.writeFileSync(path.join(out, `record-${engine}.json`), JSON.stringify(rec, null, 1));
}
