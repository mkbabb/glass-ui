// W-B.17 prototype probe. One browser per run, a new context per configuration,
// everything closed in finally. The run serves its own harness and stops it.
// usage: node probe.mjs <chromium|webkit> <outDir> [config...]
// configs: l1440 d1440 l390 d390 rm1440 (default all) ; extra phases: owed cost rest bare
import { chromium, webkit } from "playwright";
import { createServer } from "vite";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { sampleChange, judgeChange } from "../../../src/testing/no-snap/index.ts";

const [engineName, outDir, ...args] = process.argv.slice(2);
const ENGINE = engineName === "webkit" ? webkit : chromium;
const PORT = engineName === "webkit" ? 5372 : 5371;
const ALL = ["l1440", "d1440", "l390", "d390", "rm1440"];
const configs = args.filter((a) => ALL.includes(a));
const extras = new Set(args.filter((a) => !ALL.includes(a)));
const runConfigs = configs.length ? configs : extras.size ? [] : ALL;
mkdirSync(join(outDir, "frames"), { recursive: true });

const CONF = {
    l1440: { mode: "light", vw: 1440, vh: 900, coarse: false, rm: false },
    d1440: { mode: "dark", vw: 1440, vh: 900, coarse: false, rm: false },
    l390: { mode: "light", vw: 390, vh: 844, coarse: true, rm: false },
    d390: { mode: "dark", vw: 390, vh: 844, coarse: true, rm: false },
    rm1440: { mode: "light", vw: 1440, vh: 900, coarse: false, rm: true },
};

const setH = (page, patch) => page.evaluate((p) => Object.assign(window.__h, p), patch);
const away = (page, c) => page.mouse.move(c.vw - 10, 5);
const hover = (sel) => async (page) => {
    const b = await page.locator(sel).boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
};
const hoverAt = (sel, fx, fy) => async (page) => {
    const b = await page.locator(sel).boundingBox();
    await page.mouse.move(b.x + b.width * fx, b.y + b.height * fy);
};

// Each cell: a clip, targets, a set-up, and an in and an out trigger.
const P = ["box", "opacity", "scale", "translate", "rotate", "background-color", "outline-color", "stroke-dashoffset"];
function cells(c) {
    const fine = !c.coarse;
    const plateHover = (id, extra = []) => ({
        name: `plate-hover-${id}`, clip: `#${id}`, targets: [`#${id}::before`, `#${id} > svg`, ...extra],
        in: fine ? hover(`#${id}`) : (p) => p.tap(`#${id}`),
        out: fine ? (p) => away(p, c) : async () => {},
    });
    const list = [
        { ...plateHover("b-pin"), clip: ".bar", still: ["#b-spool", "#b-folder"] },
        { ...plateHover("seat44") },
        { ...plateHover("g16") },
        { ...plateHover("g24") },
        { ...plateHover("row"), targets: ["#row::before", "#row > svg"] },
        { name: "glyph-nudge", clip: "#nudge", targets: ["#nudge::before", "#nudge-g"], in: fine ? hover("#nudge") : (p) => p.tap("#nudge"), out: (p) => away(p, c) },
        { name: "glyph-turn", clip: "#turn", targets: ["#turn::before", "#turn-g"], in: fine ? hover("#turn") : (p) => p.tap("#turn"), out: (p) => away(p, c) },
        { name: "glyph-draw", clip: "#draw", targets: ["#draw::before", "#draw-p"], in: fine ? hover("#draw") : (p) => p.tap("#draw"), out: (p) => away(p, c) },
        { name: "glyph-sun-group", clip: "#sun", targets: ["#sun-g"], in: fine ? hover("#sun") : (p) => p.tap("#sun"), out: (p) => away(p, c) },
        { name: "glyph-flip", clip: "#chev", targets: ["#chev::before", "#chev-g"], setup: (p) => away(p, c), in: (p) => setH(p, { expanded: true }), out: (p) => setH(p, { expanded: false }) },
        { name: "plate-focus", clip: "#focus", targets: ["#focus::before", "#focus"], props: ["opacity", "scale", "outline-color"],
          setup: async (p) => { await p.keyboard.press("Shift"); },
          in: async (p) => { await p.keyboard.press("Tab"); await p.evaluate(() => document.querySelector("#focus").focus()); },
          out: (p) => p.evaluate(() => document.activeElement?.blur()) },
        { name: "plate-press", clip: "#press", targets: ["#press::before", "#press"], props: ["opacity", "scale"],
          setup: fine ? hover("#press") : async () => {}, in: (p) => p.mouse.down(), out: (p) => p.mouse.up(),
          pre: fine ? null : hover("#press") },
        { name: "plate-on", clip: "#on", targets: ["#on::before", "#on > svg"], setup: (p) => away(p, c), in: (p) => setH(p, { on: true }), out: (p) => setH(p, { on: false }) },
        { name: "plate-busy", clip: "#busy", targets: ["#busy::before", "#busy"], props: ["opacity", "scale", "box"], in: (p) => setH(p, { busy: true }), out: (p) => setH(p, { busy: false }), soak: 700 },
        { name: "plate-idle", clip: "#idle", targets: ["#idle::before"], props: ["opacity", "scale"], in: (p) => setH(p, { idle: true }), out: (p) => setH(p, { idle: false }), soak: 700 },
        { name: "presence-plain", clip: "#pres-host", targets: ["#pres-p"], props: ["opacity", "translate", "box"], in: (p) => setH(p, { note: true }), out: (p) => setH(p, { note: false }) },
        { name: "presence-swap", clip: "#swap", targets: ["#sw-play", "#sw-pause"], props: ["opacity", "scale"], setup: (p) => away(p, c), in: (p) => setH(p, { playing: true }), out: (p) => setH(p, { playing: false }) },
        { name: "bite-bare-swap", clip: "#bare", targets: ["#bare-play", "#bare-pause"], props: ["opacity", "scale"], setup: (p) => away(p, c), in: (p) => setH(p, { bare: true }), out: (p) => setH(p, { bare: false }) },
        { name: "presence-stay-mark", clip: ".stayseat", targets: ["#stay-mark"], props: ["opacity", "scale", "translate", "visibility"], in: (p) => setH(p, { mark: true }), out: (p) => setH(p, { mark: false }) },
        { name: "presence-stay-line", clip: "#stay-line", targets: ["#stay-line"], props: ["opacity", "translate", "visibility"], in: (p) => setH(p, { stay: true }), out: (p) => setH(p, { stay: false }) },
        { name: "presence-reclaim", clip: "#cell-form", targets: ["#err", "#f7"], props: ["opacity", "translate", "box"], in: (p) => setH(p, { error: true }), out: (p) => setH(p, { error: false }) },
        { name: "follow-cmd", clip: "#cmd", targets: ["#cmd"], props: ["box"], in: (p) => setH(p, { query: "command 50" }), out: (p) => setH(p, { query: "" }) },
        { name: "follow-sel", clip: "#cell-sel", targets: ["#sel", "#sel-t", "#sel-next"], props: ["box", "opacity", "scale"], setup: (p) => away(p, c), in: (p) => setH(p, { value: "Ease in out cubic" }), out: (p) => setH(p, { value: "Linear" }) },
    ];
    return list;
}

// In-page film helpers (the same pause-and-seek clock as the helper).
async function collect(page, frames = 4) {
    return page.evaluate(async (frames) => {
        const raf = () => new Promise((r) => requestAnimationFrame(r));
        const st = (window.__film ??= { all: new Set(document.getAnimations()), list: [] });
        let fresh = [];
        for (let i = 0; i < frames && !fresh.length; i++) {
            await raf();
            fresh = document.getAnimations().filter((a) => !st.all.has(a) && a.playState !== "finished");
        }
        if (fresh.length) { await raf(); fresh = document.getAnimations().filter((a) => !st.all.has(a) && a.playState !== "finished"); }
        const base = st.list.length;
        let span = 0, infinite = false;
        for (const a of fresh) {
            a.pause(); st.all.add(a); st.list.push(a);
            const t = a.effect.getComputedTiming();
            if (Number.isFinite(t.endTime)) span = Math.max(span, t.endTime); else infinite = true;
        }
        return { base, n: fresh.length, span: span || (infinite ? 1100 : 0), infinite };
    }, frames);
}
const seek = (page, base, t) => page.evaluate(([base, t]) => {
    const l = window.__film.list;
    for (let i = base; i < l.length; i++) {
        const e = l[i].effect.getComputedTiming().endTime;
        l[i].currentTime = Number.isFinite(e) ? Math.min(t, e - 0.01) : t;
    }
}, [base, t]);
const finish = (page, base) => page.evaluate((base) => {
    const l = window.__film.list;
    for (let i = base; i < l.length; i++) l[i].effect.getTiming().iterations === Infinity ? l[i].play() : l[i].finish();
}, base);
const settle = (page) => page.evaluate(async () => {
    const raf = () => new Promise((r) => requestAnimationFrame(r));
    for (let i = 0; i < 40; i++) {
        const live = document.getAnimations().filter((a) => a.playState === "running" && a.effect.getTiming().iterations !== Infinity);
        if (!live.length) break;
        await Promise.all(live.map((a) => a.finished.catch(() => null)));
    }
    await raf(); await raf();
    delete window.__film;
});
const nodes = (page, sel) => page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.querySelectorAll("*").length + 1 : 0;
}, sel);

async function clipOf(page, sel) {
    await page.locator(sel).first().scrollIntoViewIfNeeded();
    const b = await page.locator(sel).first().boundingBox();
    const pad = 8;
    return { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad };
}

async function film(page, cell, trigger, prefix, clip, N = 8) {
    const files = [];
    const nodeCounts = {};
    nodeCounts.rest = await nodes(page, cell.nodeSel ?? cell.clip);
    const restPath = `${prefix}-rest.png`;
    await page.screenshot({ path: restPath, clip });
    files.push({ path: restPath, t: "rest" });
    await page.evaluate(() => { window.__film = { all: new Set(document.getAnimations()), list: [] }; });
    await trigger(page);
    let offset = 0;
    for (let phase = 0; phase < 3; phase++) {
        const got = await collect(page, phase === 0 ? 4 : 12);
        if (!got.n) break;
        for (let k = 0; k < N; k++) {
            const t = (got.span * k) / (N - 1);
            await seek(page, got.base, t);
            if (k === Math.floor(N / 2)) nodeCounts[`mid${phase}`] = await nodes(page, cell.nodeSel ?? cell.clip);
            const f = `${prefix}-p${phase}-${k}.png`;
            await page.screenshot({ path: f, clip });
            files.push({ path: f, t: Math.round(offset + t) });
        }
        offset += got.span;
        await finish(page, got.base);
        if (got.infinite) break;
    }
    await settle(page);
    nodeCounts.end = await nodes(page, cell.nodeSel ?? cell.clip);
    const endPath = `${prefix}-end.png`;
    await page.screenshot({ path: endPath, clip });
    files.push({ path: endPath, t: "end" });
    return { files, nodeCounts };
}

async function reset(page, c) {
    await page.mouse.up().catch(() => {});
    await away(page, c);
    await page.evaluate(() => { document.activeElement?.blur?.(); Object.assign(window.__h, { on: false, expanded: false, busy: false, idle: false, note: false, playing: false, bare: false, stay: false, mark: false, error: false, query: "", value: "Linear" }); });
    await page.waitForTimeout(450);
    await settle(page);
}

async function openPage(browser, c, url) {
    const ctx = await browser.newContext({
        viewport: { width: c.vw, height: c.vh }, deviceScaleFactor: 2,
        hasTouch: c.coarse, isMobile: c.coarse, reducedMotion: c.rm ? "reduce" : "no-preference",
        colorScheme: c.mode,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("#app > *");
    await page.evaluate(() => document.fonts.ready);
    return { ctx, page, errors };
}

const out = { engine: engineName, configs: {}, extras: {} };
let browser, server;
try {
    server = await createServer({ configFile: new URL("./vite.config.ts", import.meta.url).pathname, server: { port: PORT, strictPort: true }, logLevel: "error" });
    await server.listen();
    const BASE = `http://localhost:${PORT}/`;
    browser = await ENGINE.launch({ headless: true });

    for (const key of runConfigs) {
        const c = CONF[key];
        const { ctx, page, errors } = await openPage(browser, c, `${BASE}?mode=${c.mode}`);
        try {
            const res = (out.configs[key] = { cells: {}, errors });
            const only = process.env.CELLS ? new Set(process.env.CELLS.split(",")) : null;
            for (const cell of cells(c).filter((x) => !only || only.has(x.name))) {
                const r = (res.cells[cell.name] = {});
                for (const dir of ["in", "out"]) {
                    try {
                        await reset(page, c);
                        if (cell.setup) await cell.setup(page);
                        if (cell.pre) await cell.pre(page);
                        await page.waitForTimeout(400); await settle(page);
                        if (dir === "out") {
                            await cell.in(page);
                            await page.waitForTimeout(cell.soak ?? 450);
                            if (!cell.soak) await settle(page);
                        }
                        await page.locator(cell.clip).first().scrollIntoViewIfNeeded();
                        const samples = await sampleChange(page, { trigger: () => cell[dir](page), targets: cell.targets, properties: cell.props ?? P, still: cell.still, step: 1000 / 60 });
                        const verdict = judgeChange(samples);
                        const props = [...new Set(samples.animations.map((a) => `${a.target}:${a.properties.join("+")}`))];
                        // Film strip of the same change, from the same rest.
                        await reset(page, c);
                        if (cell.setup) await cell.setup(page);
                        if (cell.pre) await cell.pre(page);
                        await page.waitForTimeout(400); await settle(page);
                        if (dir === "out") {
                            await cell.in(page);
                            await page.waitForTimeout(cell.soak ?? 450);
                            if (!cell.soak) await settle(page);
                        }
                        const clip = await clipOf(page, cell.clip);
                        const f = await film(page, cell, cell[dir], join(outDir, "frames", `${key}-${cell.name}-${dir}`), clip);
                        r[dir] = {
                            pass: verdict.pass, findings: verdict.findings, legs: verdict.legs,
                            animations: samples.animations, props, frames: samples.frames.length,
                            series: samples.frames.map((fr) => ({ t: +fr.t.toFixed(1), read: fr.read })), rest: samples.rest, end: samples.end,
                            film: f.files, nodeCounts: f.nodeCounts, samples,
                        };
                    } catch (e) {
                        r[dir] = { error: String(e).slice(0, 400) };
                    }
                }
                process.stdout.write(`${key} ${cell.name} in:${r.in?.pass ?? r.in?.error?.slice(0, 40)} out:${r.out?.pass ?? r.out?.error?.slice(0, 40)}\n`);
            }
        } finally {
            await ctx.close();
        }
    }

    if (extras.has("owed")) out.extras.owed = await owed(browser, BASE);
    if (extras.has("cost") && engineName === "chromium") out.extras.cost = await cost(browser, BASE);
    if (extras.has("rest")) out.extras.rest = await rest(browser, BASE);
    if (extras.has("bare")) out.extras.bare = await bare(browser, BASE);
    if (extras.has("bites")) out.extras.bites = await bites(browser, BASE);
} finally {
    writeFileSync(join(outDir, `results-${engineName}-${[...runConfigs, ...extras].join("+")}.json`), JSON.stringify(out, null, 1));
    await browser?.close();
    await server?.close();
}

// ── Owed readings that need wall-clock frames (rAF recorders), both engines. ──
async function owed(browser, BASE) {
    const c = CONF.l1440;
    const { ctx, page } = await openPage(browser, c, `${BASE}?mode=light`);
    const o = {};
    try {
        const recorder = (fnBody) => page.evaluate(fnBody);
        // Item 3: leaving a breath. Per frame opacity of the ::before across the drop.
        for (const [name, on, off] of [["idle", { idle: true }, { idle: false }], ["busy", { busy: true }, { busy: false }]]) {
            await reset(page, c);
            o[`breath-${name}`] = await page.evaluate(async ([name, on, off]) => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                const el = document.querySelector(`#${name}`);
                const read = () => +getComputedStyle(el, "::before").opacity;
                Object.assign(window.__h, on);
                const before = [];
                const t0 = performance.now();
                while (performance.now() - t0 < 650) { await raf(); before.push(read()); }
                Object.assign(window.__h, off);
                const after = [];
                for (let i = 0; i < 16; i++) { await raf(); after.push(read()); }
                return { before: before.slice(-6), after };
            }, [name, on, off]);
        }
        // Item 4: a swap's hand-over, and a second toggle at 60 ms.
        for (const second of [null, 60]) {
            await reset(page, c);
            o[`swap-${second ?? "single"}`] = await page.evaluate(async (second) => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                const log = [];
                const t0 = performance.now();
                const read = () => {
                    const a = document.querySelector("#sw-play"), b = document.querySelector("#sw-pause");
                    return { t: +(performance.now() - t0).toFixed(1), play: a ? +getComputedStyle(a).opacity : null, pause: b ? +getComputedStyle(b).opacity : null };
                };
                window.__h.playing = true;
                let toggled = false;
                while (performance.now() - t0 < 600) {
                    await raf();
                    if (second && !toggled && performance.now() - t0 >= second) { window.__h.playing = false; toggled = true; }
                    log.push(read());
                }
                return log;
            }, second);
        }
        // Item 7: follow, interrupted at 80 ms (the command panel, and the select trigger).
        for (const [name, sel, a, b] of [["cmd", "#cmd", { query: "command 50" }, { query: "" }], ["sel", "#sel", { value: "Ease in out cubic" }, { value: "Linear" }]]) {
            await reset(page, c);
            await page.locator(sel).scrollIntoViewIfNeeded();
            o[`follow-interrupt-${name}`] = await page.evaluate(async ([sel, a, b]) => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                const el = document.querySelector(sel);
                const log = [];
                const t0 = performance.now();
                Object.assign(window.__h, a);
                let done = false;
                while (performance.now() - t0 < 600) {
                    await raf();
                    if (!done && performance.now() - t0 >= 80) { Object.assign(window.__h, b); done = true; }
                    const r = el.getBoundingClientRect();
                    log.push({ t: +(performance.now() - t0).toFixed(1), w: +r.width.toFixed(2), h: +r.height.toFixed(2) });
                }
                return log;
            }, [sel, a, b]);
        }
        // Reclaim, wall clock: the field below the error line, per frame, in and out.
        for (const [name, v] of [["in", true], ["out", false]]) {
            await reset(page, c);
            if (!v) { await setH(page, { error: true }); await page.waitForTimeout(400); }
            await page.locator("#f7").scrollIntoViewIfNeeded();
            o[`reclaim-wall-${name}`] = await page.evaluate(async (v) => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                const el = document.querySelector("#f7"); const host = document.querySelector("#cell-form");
                const log = []; const t0 = performance.now();
                window.__h.error = v;
                while (performance.now() - t0 < 400) { await raf(); log.push({ t: +(performance.now() - t0).toFixed(1), y: +(el.getBoundingClientRect().y - host.getBoundingClientRect().y).toFixed(2), err: !!document.querySelector("#err") }); }
                return log;
            }, v);
        }
        // Single follow, wall clock, for the strip of sizes.
        for (const [name, sel, a] of [["cmd", "#cmd", { query: "command 50" }], ["sel", "#sel", { value: "Ease in out cubic" }]]) {
            await reset(page, c);
            o[`follow-wall-${name}`] = await page.evaluate(async ([sel, a]) => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                const el = document.querySelector(sel);
                const log = [];
                const t0 = performance.now();
                Object.assign(window.__h, a);
                while (performance.now() - t0 < 500) { await raf(); const r = el.getBoundingClientRect(); log.push({ t: +(performance.now() - t0).toFixed(1), w: +r.width.toFixed(2), h: +r.height.toFixed(2) }); }
                return log;
            }, [sel, a]);
        }
        // Item 5: the inner group's centre while it turns (seeked).
        await reset(page, c);
        await page.locator("#sun").scrollIntoViewIfNeeded();
        await page.evaluate(() => { window.__film = { all: new Set(document.getAnimations()), list: [] }; });
        await hover("#sun")(page);
        const g = await collect(page);
        const centres = [];
        for (let k = 0; k <= 8; k++) {
            await seek(page, g.base, (g.span * k) / 8);
            centres.push(await page.evaluate(() => { const r = document.querySelector("#sun-g").getBoundingClientRect(); const cs = getComputedStyle(document.querySelector("#sun-g")); return { cx: +(r.x + r.width / 2).toFixed(2), cy: +(r.y + r.height / 2).toFixed(2), rotate: cs.rotate, origin: cs.transformOrigin, box: cs.transformBox }; }));
        }
        await finish(page, g.base); await settle(page);
        o["sun-group"] = { animations: g.n, centres };
        // G-NEST.
        await reset(page, c);
        const readNest = () => page.evaluate(() => ({
            outerGlyph: getComputedStyle(document.querySelector("#nest-outer-g")).translate,
            outerPlate: getComputedStyle(document.querySelector("#nest-outer"), "::before").opacity,
            innerGlyph: getComputedStyle(document.querySelector("#nest-inner-g")).scale,
            innerPlate: getComputedStyle(document.querySelector("#nest-inner"), "::before").opacity,
        }));
        await page.locator("#nest-outer").scrollIntoViewIfNeeded();
        await hover("#nest-inner")(page); await page.waitForTimeout(400);
        const overInner = await readNest();
        await hoverAt("#nest-outer", 0.35, 0.5)(page); await page.waitForTimeout(400);
        const overOuter = await readNest();
        o.nest = { overInner, overOuter };
        // A .plate that also carries .focus-ring: whose transition wins on the control.
        o.focusRingTransition = await page.evaluate(() => { const cs = getComputedStyle(document.querySelector("#focus")); return { property: cs.transitionProperty, duration: cs.transitionDuration }; });
        // G-HIT: a press 1 px inside each edge; scale on the way back.
        await reset(page, c);
        const hit = {};
        for (const id of ["hit40", "hit24"]) {
            await page.locator(`#${id}`).scrollIntoViewIfNeeded();
            const b = await page.locator(`#${id}`).boundingBox();
            const pts = { left: [b.x + 1, b.y + b.height / 2], right: [b.x + b.width - 1, b.y + b.height / 2], top: [b.x + b.width / 2, b.y + 1], bottom: [b.x + b.width / 2, b.y + b.height - 1] };
            const r = {};
            for (const [edge, [x, y]] of Object.entries(pts)) {
                const before = await page.evaluate(() => window.__h.hits);
                await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(200);
                const pressed = await page.evaluate((id) => getComputedStyle(document.querySelector(`#${id}`)).scale, id);
                const maxBack = page.evaluate(async (id) => {
                    const raf = () => new Promise((r) => requestAnimationFrame(r));
                    let m = 0; const el = document.querySelector(`#${id}`);
                    for (let i = 0; i < 24; i++) { await raf(); const s = parseFloat(getComputedStyle(el).scale) || 1; m = Math.max(m, s); }
                    return m;
                }, id);
                await page.mouse.up();
                const mb = await maxBack;
                const after = await page.evaluate(() => window.__h.hits);
                r[edge] = { fired: after > before, pressed, maxScaleBack: mb };
                await away(page, c); await page.waitForTimeout(250);
            }
            hit[id] = r;
        }
        o.hit = hit;
    } finally {
        await ctx.close();
    }
    // Coarse press: a tap, and (Chromium) a held touch.
    const cc = CONF.l390;
    const m = await openPage(browser, cc, `${BASE}?mode=light`);
    try {
        await m.page.locator("#press").scrollIntoViewIfNeeded();
        const rec = m.page.evaluate(async () => {
            const raf = () => new Promise((r) => requestAnimationFrame(r));
            const el = document.querySelector("#press"); const log = [];
            const t0 = performance.now();
            while (performance.now() - t0 < 700) { await raf(); const cs = getComputedStyle(el, "::before"); log.push({ t: +(performance.now() - t0).toFixed(0), o: +cs.opacity, s: getComputedStyle(el).scale }); }
            return log;
        });
        await m.page.waitForTimeout(50);
        await m.page.tap("#press");
        o.coarseTap = await rec;
        if (engineName === "chromium") {
            const cdp = await m.ctx.newCDPSession(m.page);
            const b = await m.page.locator("#press").boundingBox();
            const pt = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
            const rec2 = m.page.evaluate(async () => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                const el = document.querySelector("#press"); const log = [];
                const t0 = performance.now();
                while (performance.now() - t0 < 900) { await raf(); log.push({ t: +(performance.now() - t0).toFixed(0), o: +getComputedStyle(el, "::before").opacity, s: getComputedStyle(el).scale }); }
                return log;
            });
            await m.page.waitForTimeout(50);
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [pt] });
            await m.page.waitForTimeout(300);
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            o.coarseHold = await rec2;
        }
    } finally {
        await m.ctx.close();
    }
    return o;
}

// ── Chromium cost: traces of layout, style and paint in each change, at 1x and 4x CPU. ──
async function cost(browser, BASE) {
    const c = CONF.l1440;
    const res = {};
    for (const rate of [1, 4]) {
        const { ctx, page } = await openPage(browser, c, `${BASE}?mode=light`);
        try {
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate });
            const runs = [
                ["plate-hover-in", "#seat44", hover("#seat44"), null],
                ["plate-hover-out", "#seat44", (p) => away(p, c), hover("#seat44")],
                ["glyph-nudge-in", "#nudge", hover("#nudge"), null],
                ["glyph-draw-in", "#draw", hover("#draw"), null],
                ["plate-press-in", "#press", (p) => p.mouse.down(), hover("#press")],
                ["plate-press-out", "#press", (p) => p.mouse.up(), async (p) => { await hover("#press")(p); await p.mouse.down(); }],
                ["focus-in", "#focus", async (p) => { await p.keyboard.press("Tab"); await p.evaluate(() => document.querySelector("#focus").focus()); }, null],
                ["breath-idle-1s", "#idle", (p) => setH(p, { idle: true }), null, 1100],
                ["presence-plain-in", "#pres-host", (p) => setH(p, { note: true }), null],
                ["presence-swap-in", "#swap", (p) => setH(p, { playing: true }), null, 450],
                ["presence-stay-in", "#stay-line", (p) => setH(p, { stay: true }), null],
                ["follow-cmd-shrink", "#cmd", (p) => setH(p, { query: "command 50" }), null],
                ["follow-cmd-grow", "#cmd", (p) => setH(p, { query: "" }), (p) => setH(p, { query: "command 50" })],
                ["follow-sel", "#sel", (p) => setH(p, { value: "Ease in out cubic" }), null, 450],
                ["reclaim-in", "#cell-form", (p) => setH(p, { error: true }), null],
                ["reclaim-out", "#cell-form", (p) => setH(p, { error: false }), (p) => setH(p, { error: true })],
                ["blur-sweep-12", "#blur-host", async (p) => { const b = await p.locator("#blur-host").boundingBox(); await p.mouse.move(b.x + 10, b.y + 30); await p.mouse.move(b.x + b.width - 10, b.y + 30, { steps: 24 }); await p.mouse.move(b.x + 10, b.y + b.height - 28, { steps: 24 }); await away(p, c); }, null, 300],
            ];
            for (const [name, sel, trig, pre, wait] of runs) {
                await reset(page, c);
                await page.locator(sel).scrollIntoViewIfNeeded();
                if (pre) { await pre(page); await page.waitForTimeout(450); await settle(page); }
                await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.frame", "blink.animations", "cc"] });
                await page.evaluate(() => console.timeStamp("probe-A"));
                await trig(page);
                await page.waitForTimeout(wait ?? 350);
                await page.evaluate(() => console.timeStamp("probe-B"));
                const buf = await browser.stopTracing();
                res[`${name}@${rate}x`] = parseTrace(JSON.parse(buf.toString()));
                await page.mouse.up().catch(() => {});
            }
        } finally {
            await ctx.close();
        }
    }
    return res;
}

function parseTrace(t) {
    const ev = t.traceEvents ?? t;
    const stamp = (n) => ev.find((e) => e.name === "TimeStamp" && e.args?.data?.message === n);
    const A = stamp("probe-A"), B = stamp("probe-B");
    if (!A || !B) return { error: "no stamps" };
    const pid = A.pid, tid = A.tid;
    const inWin = (e) => e.ts >= A.ts && e.ts <= B.ts && e.pid === pid;
    const main = ev.filter((e) => inWin(e) && e.tid === tid && e.ph === "X");
    const named = (n) => main.filter((e) => e.name === n);
    const layouts = named("Layout").map((e) => ({ at: +((e.ts - A.ts) / 1000).toFixed(1), ms: +((e.dur ?? 0) / 1000).toFixed(3) }));
    const tasks = main.filter((e) => e.name === "RunTask" || e.name === "ThreadControllerImpl::RunTask").map((e) => (e.dur ?? 0) / 1000);
    const frames = ev.filter((e) => inWin(e) && (e.name === "BeginMainThreadFrame" || e.name === "BeginFrame") && e.tid === tid).length;
    const compAnims = ev.filter((e) => inWin(e) && /Animation/.test(e.name) && /cc|compositor/i.test(e.cat ?? "")).map((e) => e.name);
    return {
        windowMs: +((B.ts - A.ts) / 1000).toFixed(1),
        layouts,
        layoutCount: layouts.length,
        layoutMaxMs: layouts.reduce((m, l) => Math.max(m, l.ms), 0),
        layoutSumMs: +layouts.reduce((s, l) => s + l.ms, 0).toFixed(3),
        styleRecalcs: named("UpdateLayoutTree").length + named("RecalculateStyles").length,
        paints: named("Paint").length,
        mainFrames: frames,
        longestTaskMs: +Math.max(0, ...tasks).toFixed(2),
        compositorAnimationEvents: [...new Set(compAnims)].slice(0, 8),
    };
}

// ── G-REST: the 40/40/10 page. ──
async function rest(browser, BASE) {
    const c = CONF.l1440;
    const ctx = await browser.newContext({ viewport: { width: c.vw, height: c.vh } });
    const r = {};
    try {
        await ctx.addInitScript(() => {
            window.__restLog = [];
            const t0 = performance.now();
            const tick = () => {
                window.__restLog.push({ t: Math.round(performance.now() - t0), n: document.getAnimations ? document.getAnimations().length : -1 });
                if (performance.now() - t0 < 800) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}?page=rest`, { waitUntil: "load" });
        await page.waitForTimeout(900);
        r.load = await page.evaluate(() => window.__restLog);
        r.counts = await page.evaluate(() => ({ plates: document.querySelectorAll(".plate").length, glyphs: document.querySelectorAll("[data-glyph]").length, stays: document.querySelectorAll("[data-presence]").length }));
        const btn = page.locator(".plate").first();
        await btn.hover(); await page.waitForTimeout(400);
        await page.mouse.move(c.vw - 10, 5); await page.waitForTimeout(500);
        r.afterHover = await page.evaluate(() => document.getAnimations().length);
        await page.evaluate(() => document.querySelector(".plate").setAttribute("data-idle", ""));
        await page.waitForTimeout(200);
        r.idleOne = await page.evaluate(() => document.getAnimations().map((a) => ({ kind: a.constructor.name, target: a.effect.target?.className?.baseVal ?? a.effect.target?.className, pseudo: a.effect.pseudoElement, props: Object.keys(a.effect.getKeyframes()[0] ?? {}).filter((k) => !["offset", "computedOffset", "easing", "composite"].includes(k)) })));
        await btn.hover(); await page.waitForTimeout(150);
        r.idleUnderPointer = await page.evaluate(() => document.getAnimations().filter((a) => a.effect.getTiming().iterations === Infinity).length);
        r.idleUnderPointerAll = await page.evaluate(() => document.getAnimations().map((a) => a.constructor.name + ":" + (a.transitionProperty ?? a.animationName)));
    } finally {
        await ctx.close();
    }
    return r;
}

// ── G-BARE: scripts off, static markup with the built CSS. ──
async function bare(browser, BASE) {
    const c = CONF.l1440;
    const r = {};
    let css = "";
    {
        const { ctx, page } = await openPage(browser, c, `${BASE}?mode=light`);
        try {
            css = await page.evaluate(() => [...document.styleSheets].map((s) => { try { return [...s.cssRules].map((x) => x.cssText).join("\n"); } catch { return ""; } }).join("\n"));
        } finally { await ctx.close(); }
    }
    const svg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`;
    const curve = (on) => `<svg ${on ? 'data-glyph="draw"' : ""} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path pathLength="1" d="M3 20 C 10 20, 12 4, 21 4"/></svg>`;
    const st = `.seat{display:inline-grid;place-items:center;inline-size:40px;block-size:40px;border:0;border-radius:12px;background:transparent;color:var(--foreground);padding:0}.blk{display:flex;gap:12px;padding:12px;align-items:center}body{margin:0;background:var(--background);color:var(--foreground)}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style><style>${st}</style></head><body>
<div class="blk" id="with"><button id="w1" class="seat plate">${svg}</button><button id="w2" class="seat plate" aria-pressed="true">${svg}</button><button id="w3" class="seat plate">${curve(true)}</button><span id="w4" data-presence data-absent style="display:inline-block;inline-size:60px;block-size:20px;background:red">x</span><span id="after">after</span></div>
<div class="blk" id="without"><button class="seat">${svg}</button><button class="seat" aria-pressed="true">${svg}</button><button class="seat">${curve(false)}</button></div>
</body></html>`;
    const file = join(outDir, "bare.html");
    writeFileSync(file, html);
    const ctx = await browser.newContext({ viewport: { width: 600, height: 200 }, javaScriptEnabled: false, deviceScaleFactor: 1 });
    try {
        const page = await ctx.newPage();
        await page.goto("file://" + file);
        await page.screenshot({ path: join(outDir, `bare-${engineName}-with.png`), clip: await page.locator("#w1").boundingBox().then((b) => ({ x: b.x, y: b.y, width: 132, height: 40 })) });
        await page.screenshot({ path: join(outDir, `bare-${engineName}-without.png`), clip: await page.locator("#without button").first().boundingBox().then((b) => ({ x: b.x, y: b.y, width: 132, height: 40 })) });
        r.read = await page.evaluate(() => ({
            w2plate: getComputedStyle(document.querySelector("#w2"), "::before").opacity,
            w1plate: getComputedStyle(document.querySelector("#w1"), "::before").opacity,
            w3dash: getComputedStyle(document.querySelector("#w3 path")).strokeDashoffset,
            w4: (() => { const e = document.querySelector("#w4"); const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { w: b.width, h: b.height, opacity: cs.opacity, visibility: cs.visibility }; })(),
        }));
        // Hover with scripts off: the transition is CSS alone. Read mid-way and at rest.
        const b = await page.locator("#w1").boundingBox();
        await page.mouse.move(b.x + 20, b.y + 20);
        await page.waitForTimeout(50);
        const mid = await page.evaluate(() => ({ o: getComputedStyle(document.querySelector("#w1"), "::before").opacity, s: getComputedStyle(document.querySelector("#w1 > svg")).scale }));
        await page.waitForTimeout(400);
        const end = await page.evaluate(() => ({ o: getComputedStyle(document.querySelector("#w1"), "::before").opacity, s: getComputedStyle(document.querySelector("#w1 > svg")).scale }));
        r.hover = { mid, end };
    } catch (e) {
        r.error = String(e).slice(0, 300);
    } finally { await ctx.close(); }
    return r;
}

// ── Bites: each plant must fail the check. ──
async function bites(browser, BASE) {
    const c = CONF.l1440;
    const plants = {
        "no-plate-fade": ".plate::before{transition: scale var(--spring-present-duration) var(--spring-present) !important}",
        "plate-starts-at-0.75": "@keyframes plant{from{opacity:.75}} @media (hover:hover){.plate:hover::before{animation: plant var(--duration-control) linear}}",
        "glyph-width-leg": ".plate > svg{transition: width var(--duration-fast) linear !important} .plate:hover > svg{width: 24px}",
    };
    const res = {};
    for (const [name, css] of Object.entries(plants)) {
        const { ctx, page } = await openPage(browser, c, `${BASE}?mode=light`);
        try {
            await page.addStyleTag({ content: css });
            for (const dir of ["in", "out"]) {
                await reset(page, c);
                await page.locator("#seat44").scrollIntoViewIfNeeded();
                if (dir === "out") { await hover("#seat44")(page); await page.waitForTimeout(400); await settle(page); }
                const smp = await sampleChange(page, { trigger: dir === "in" ? () => hover("#seat44")(page) : () => away(page, c), targets: ["#seat44::before", "#seat44 > svg"], properties: P });
                const v = judgeChange(smp);
                res[`${name}-${dir}`] = { pass: v.pass, findings: v.findings, props: smp.animations.map((a) => a.properties.join("+")) };
            }
        } finally { await ctx.close(); }
    }
    return res;
}
