// FOLD copy of challenge/tools/probe.mjs: adds the G6 WAAPI bite and the geometry-state count, and the
// per-frame outer-edge trace for the router cell. Otherwise unchanged.
// probe.mjs --engine chromium|webkit --site <built site> --out <challenge dir> --tag <name> [--parts a,b,...]
// W-I.8 challenger: the cells AB.md and spec-graft r1-r5 did not measure, on the graft prototype
// (spec-graft/prototype.patch) plus one read-only hook (window.__clusterNow, the painted join vector).
// One browser per run, a new context per cell, everything closed in finally. Metrics follow AB.md §1.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import os from "node:os";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const playwright = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");
const args = Object.fromEntries(process.argv.slice(2).reduce((a, k, i, arr) => (k.startsWith("--") ? [...a, [k.slice(2), arr[i + 1]]] : a), []));
const engine = args.engine ?? "chromium";
const site = path.resolve(args.site);
const out = path.resolve(args.out);
const tag = args.tag ?? "base";
const parts = new Set((args.parts ?? "dpr,narrow,coarse,interrupt,pagechange,router,vertical,rtl,minsize,prm,g8").split(","));
fs.mkdirSync(path.join(out, "png"), { recursive: true });
fs.mkdirSync(path.join(out, "data"), { recursive: true });
const FRAME = 1000 / 120;
const WEBKIT_SHIM = ".naive-row .dock-plate { border-color: var(--dock-plate-expanded-border) !important; }";
const VCLOCK = () => {
    const realRAF = window.requestAnimationFrame.bind(window);
    const realCAF = window.cancelAnimationFrame.bind(window);
    let frozen = false, t = 0, id = 1e7;
    const q = new Map();
    window.requestAnimationFrame = (cb) => { if (!frozen) return realRAF(cb); const i = ++id; q.set(i, cb); return i; };
    window.cancelAnimationFrame = (i) => { if (q.has(i)) q.delete(i); else realCAF(i); };
    window.__vc = {
        freeze() { frozen = true; t = performance.now(); },
        step(ms) { t += ms; const cbs = [...q.values()]; q.clear(); for (const cb of cbs) { try { cb(t); } catch (e) { console.error("vc cb", e); } } },
        thaw() { frozen = false; const cbs = [...q.values()]; q.clear(); for (const cb of cbs) realRAF(cb); },
    };
};
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    let p = path.join(site, decodeURIComponent(u.pathname));
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html");
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const rec = { engine, tag, started: new Date().toISOString(), load: os.loadavg()[0], cells: {} };
const log = (...a) => console.log(`[${engine}/${tag}]`, ...a);
const Lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

async function open(browser, o = {}) {
    const dsf = o.dsf ?? 2;
    const ctxOpts = { viewport: { width: o.w ?? 1440, height: o.h ?? 560 }, deviceScaleFactor: dsf, colorScheme: o.theme ?? "light", reducedMotion: o.reduced ? "reduce" : "no-preference" };
    if (o.touch) { ctxOpts.hasTouch = true; if (engine === "chromium") ctxOpts.isMobile = true; }
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
    page.on("crash", () => errs.push("PAGE CRASH"));
    await page.addInitScript(VCLOCK);
    if (engine === "webkit") await page.addInitScript((css) => { const add = () => { const st = document.createElement("style"); st.textContent = css; (document.head || document.documentElement).appendChild(st); }; document.documentElement ? add() : document.addEventListener("readystatechange", add, { once: true }); }, WEBKIT_SHIM);
    const q = new URLSearchParams({ mode: o.mode ?? "design", fused: o.fused ? "1" : "0", ...(o.theme === "dark" ? { dark: "1" } : {}), ...(o.query ?? {}) });
    await page.goto(`${base}/?${q}`);
    await page.waitForFunction(() => window.__ab?.ready, null, { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    return { ctx, page, errs, dsf };
}
const geom = (page) => page.evaluate(() => {
    const root = document.querySelector("[data-testid=cluster]");
    const ds = [...root.querySelectorAll(":scope > .glass-dock")];
    const R = (e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom }; };
    return { root: R(root), members: ds.map(R), labels: ds.map((d) => d.getAttribute("aria-label")), minInline: ds.map((d) => d.style.minInlineSize), radius: ds.map((d) => getComputedStyle(d).borderTopLeftRadius), vw: innerWidth, docW: document.scrollingElement.scrollWidth, now: window.__clusterNow?.() ?? null };
});
async function shot(page, name, g, pad = 28, dsf = 2) {
    const all = [...g.members, g.root];
    const x0 = Math.max(0, Math.floor(Math.min(...all.map((p) => p.l)) - pad)), x1 = Math.min(g.vw, Math.ceil(Math.max(...all.map((p) => p.r)) + pad));
    const y0 = Math.max(0, Math.floor(Math.min(...all.map((p) => p.t)) - pad)), y1 = Math.ceil(Math.max(...all.map((p) => p.b)) + pad);
    const clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
    const buf = await page.screenshot({ clip });
    if (name) fs.writeFileSync(path.join(out, "png", `${engine}-${tag}-${name}.png`), buf);
    return { png: PNG.sync.read(buf), clip, dsf };
}
function L(img, x, y) {
    const { png, clip, dsf } = img;
    const px = Math.floor((x - clip.x) * dsf), py = Math.floor((y - clip.y) * dsf);
    if (px < 0 || py < 0 || px >= png.width || py >= png.height) return NaN;
    return Lum(png.data, (py * png.width + px) * 4);
}
// AB.md §1 line: max |L(x) − mean(L(x−4), L(x+4))| over device columns within ±3 css px; tone: |mean (jx, jx+8] − mean [jx−8, jx)|
function seamAt(img, y, jx) {
    const s = 1 / img.dsf;
    let line = 0, at = jx;
    for (let x = jx - 3; x <= jx + 3; x += s) { const v = Math.abs(L(img, x, y) - (L(img, x - 4, y) + L(img, x + 4, y)) / 2); if (v > line) { line = v; at = x; } }
    const half = (a, b) => { let t = 0, n = 0; for (let x = a; x <= b; x += s) { t += L(img, x, y); n++; } return t / n; };
    return { line: +line.toFixed(1), at: +at.toFixed(2), tone: +Math.abs(half(jx + 1, jx + 8) - half(jx - 8, jx - 1)).toFixed(1) };
}
function seamCell(img, g) {
    const p = g.members;
    const t = Math.min(...p.map((q) => q.t)), b = Math.max(...p.map((q) => q.b)), mid = (t + b) / 2;
    const rows = { rimTop: t + 2, inTop: t + 6, mid, inBot: b - 6 };
    const joins = [];
    for (let i = 0; i < p.length - 1; i++) {
        const jx = (p[i].r + p[i + 1].l) / 2;
        const j = { x: +jx.toFixed(3) };
        let line = 0, tone = 0;
        for (const [k, y] of Object.entries(rows)) { j[k] = seamAt(img, y, jx); line = Math.max(line, j[k].line); tone = Math.max(tone, j[k].tone); }
        j.maxLine = line; j.maxTone = tone;
        joins.push(j);
    }
    // FOLD: the interior control — the same line metric at every 2 px of each member's
    // interior (>= 12 px from its ends), same rows: what the surface itself reads with no cut.
    // each sample is the join metric itself (seamAt's ±3 px window, max over the four rows)
    // centred on an interior x; reported as the max and the median over all samples.
    const samples = [];
    for (const q of p) for (let x = q.l + 12; x <= q.r - 12; x += 7) samples.push(Math.max(...Object.values(rows).map((y) => seamAt(img, y, x).line)));
    samples.sort((a, b) => a - b);
    joins.ctrl = { max: samples.at(-1), p50: samples[Math.floor(samples.length / 2)], n: samples.length };
    return joins;
}
const frac = (v) => +(v - Math.floor(v)).toFixed(3);

// ---------------------------------------------------------------- parts
async function partDpr(browser) {
    const res = [];
    for (const dsf of (args.dsfs ?? "1,2,3,2.625").split(",").map(Number)) for (const w of [390, 1440]) for (const theme of ["light", "dark"]) {
        const { ctx, page, errs } = await open(browser, { w, dsf, theme, mode: "flat", fused: true, query: args.query ? Object.fromEntries(new URLSearchParams(args.query)) : undefined });
        try {
            const g = await geom(page);
            const img = await shot(page, dsf === 2 ? null : `dpr${dsf}-${w}-${theme}-flat-fused`, g, 28, dsf);
            const joins = seamCell(img, g);
            res.push({ dsf, w, theme, interiorCtrlLine: joins.ctrl, joins: joins.map((j) => ({ x: j.x, line: j.maxLine, tone: j.maxTone, rows: Object.fromEntries(Object.entries(j).filter(([k]) => ["rimTop", "inTop", "mid", "inBot"].includes(k))) })), memberLeftFrac: g.members.map((m) => frac(m.l)), memberRightFrac: g.members.map((m) => frac(m.r)), rootLeft: g.root.l, errs: errs.slice(0, 3) });
            log("dpr", dsf, w, theme, joins.map((j) => `${j.maxLine}/${j.maxTone}`).join(" ; "), "| interior ctrl", JSON.stringify(joins.ctrl));
        } finally { await ctx.close(); }
    }
    rec.cells.dpr = res;
}

async function partNarrow(browser) {
    const res = [];
    for (const w of [320, 360]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: true });
        try {
            const g = await geom(page);
            await shot(page, `narrow${w}-fused`, { ...g, members: [...g.members, { l: 0, r: w, t: g.root.t, b: g.root.b }] }, 20);
            const ov = await page.evaluate(() => [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")].map((d) => { const m = d.getBoundingClientRect(); return { label: d.getAttribute("aria-label"), sw: d.scrollWidth, cw: d.clientWidth, buttons: [...d.querySelectorAll("button")].map((b) => { const r = b.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { name: b.getAttribute("aria-label") || b.textContent.trim(), l: +r.left.toFixed(1), r: +r.right.toFixed(1), insideMember: r.left >= m.left - 0.5 && r.right <= m.right + 0.5, hitSelf: !!hit && (hit === b || b.contains(hit)) }; }) }; }));
            res.push({ w, root: g.root, members: g.members, overflowRight: +(g.root.r - w).toFixed(2), overflowLeft: +(-g.root.l).toFixed(2), docScrollW: g.docW, memberOverflow: ov, minInline: g.minInline, errs: errs.slice(0, 3) });
            log("narrow", w, "root", g.root.l.toFixed(1), g.root.r.toFixed(1), "doc", g.docW);
        } finally { await ctx.close(); }
    }
    rec.cells.narrow = res;
}

async function partCoarse(browser) {
    const res = [];
    for (const theme of ["light", "dark"]) {
        const { ctx, page, errs } = await open(browser, { w: 390, h: 844, dsf: 3, theme, touch: true, mode: "flat", fused: true });
        try {
            const mm = await page.evaluate(() => ({ coarse: matchMedia("(pointer: coarse)").matches, hover: matchMedia("(hover: none)").matches }));
            const g = await geom(page);
            const img = await shot(page, `coarse-dsf3-${theme}-flat-fused`, g, 28, 3);
            const joins = seamCell(img, g);
            res.push({ theme, mm, heights: g.members.map((m) => +(m.b - m.t).toFixed(2)), radius: g.radius, joins: joins.map((j) => ({ x: j.x, line: j.maxLine, tone: j.maxTone })), errs: errs.slice(0, 3) });
            log("coarse", theme, JSON.stringify(mm), joins.map((j) => `${j.maxLine}/${j.maxTone}`).join(" ; "));
        } finally { await ctx.close(); }
    }
    rec.cells.coarse = res;
}

// virtual-clock episodes: returns the painted join vector at every frame
async function episode(page, steps) {
    return page.evaluate(([steps, F]) => new Promise((resolve) => {
        const trace = [];
        window.__vc.freeze();
        let t = 0;
        const run = async () => {
            for (const s of steps) {
                if (s.set) window.__ab.set(s.set);
                if (s.controls !== undefined) window.__ab.controls(s.controls);
                await new Promise((r) => setTimeout(r, 0));
                await new Promise((r) => setTimeout(r, 0));
                const n = Math.round(s.ms / F);
                for (let i = 0; i < n; i++) {
                    window.__vc.step(F); t += F;
                    const ds = [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")];
                    const root = document.querySelector("[data-testid=cluster]");
                    const rl = root.getBoundingClientRect().left;
                    const shx = [...root.querySelectorAll(":scope > .dock-cluster-lens")].map((l) => { const xs = [...getComputedStyle(l).clipPath.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((q) => +q[1] + rl); return xs.length ? [Math.min(...xs), Math.max(...xs)] : null; });
                    const shareOverlap = Math.max(0, ...shx.slice(1).map((e, k) => (e && shx[k] ? shx[k][1] - e[0] : 0)));
                    const op = ds.map((d) => +getComputedStyle(d).opacity);
                    trace.push({ shareOverlap: +shareOverlap.toFixed(2), op, t: +t.toFixed(2), j: (window.__clusterNow?.() ?? []).map((v) => +v.toFixed(4)), n: ds.length, edges: ds.map((d) => { const r = d.getBoundingClientRect(); return [+r.left.toFixed(2), +r.right.toFixed(2)]; }), ev: s.label });
                }
            }
            resolve(trace);
        };
        run();
    }), [steps, FRAME]);
}
function kinematics(trace, k) {
    const v = trace.map((f, i) => (i === 0 ? 0 : ((f.j[k] ?? NaN) - (trace[i - 1].j[k] ?? NaN)) / (FRAME / 1000)));
    return v;
}
async function partInterrupt(browser) {
    const res = {};
    const cases = {
        // G5's own cell: all joins reverse at 80 ms
        reverseAll: [{ set: [true, true], ms: 80, label: "fuse" }, { set: [false, false], ms: 1200, label: "fission" }],
        // the theme fissions out while the fuse is in flight (join 1 reverses, join 0 keeps going)
        partialReverse: [{ set: [true, true], ms: 80, label: "fuse" }, { set: [true, false], ms: 1200, label: "theme out" }],
        // a fuse of join 0 in flight, then join 1 joins it (k = join 1, whose old span is 0)
        joinJoins: [{ set: [true, false], ms: 80, label: "fuse j0" }, { set: [true, true], ms: 1200, label: "fuse all" }],
    };
    for (const [name, steps] of Object.entries(cases)) {
        const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design" });
        try {
            const tr = await episode(page, steps);
            const i0 = tr.findIndex((f) => f.ev === steps[1].label);
            const per = [0, 1].map((k) => {
                const v = kinematics(tr, k);
                return { before: +v[i0 - 1].toFixed(2), at: +v[i0].toFixed(2), after: +v[i0 + 1].toFixed(2), vAround: v.slice(i0 - 3, i0 + 4).map((x) => +x.toFixed(2)), jAround: tr.slice(i0 - 3, i0 + 4).map((f) => f.j[k]), maxJ: Math.max(...tr.map((f) => f.j[k])), minJ: Math.min(...tr.map((f) => f.j[k])), end: tr.at(-1).j[k] };
            });
            res[name] = { frameOfInterrupt: i0, tInterrupt: tr[i0]?.t, joins: per, errs: errs.slice(0, 3) };
            log("interrupt", name, JSON.stringify(per.map((p) => [p.before, p.at, p.after])));
        } finally { await ctx.close(); }
    }
    rec.cells.interrupt = res;
}

async function partPageChange(browser) {
    const res = {};
    for (const [name, steps] of Object.entries({
        // a page change (the controls member leaves) 40 ms into a collapse (fuse)
        leaveDuringFuse: [{ set: [true, true], ms: 40, label: "fuse" }, { controls: false, ms: 600, label: "member leaves" }],
        // a page change (the controls member arrives) 40 ms into an expand (fission)
        arriveDuringFission: [{ controls: false, ms: 100, label: "settle" }, { set: [true, true], ms: 1200, label: "fused" }, { set: [false, false], ms: 40, label: "fission" }, { controls: true, ms: 600, label: "member arrives" }],
    })) {
        const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design" });
        try {
            const tr = await episode(page, steps);
            const last = steps.at(-1).label;
            const i0 = tr.findIndex((f) => f.ev === last);
            const win = tr.slice(Math.max(0, i0 - 2), i0 + 4).map((f) => ({ t: f.t, j: f.j, n: f.n, edges: f.edges }));
            const jJump = Math.max(...tr.slice(1).map((f, i) => (f.j.length === tr[i].j.length ? Math.max(...f.j.map((v, k) => Math.abs(v - tr[i].j[k]))) : (f.j.length && tr[i].j.length ? Math.abs(f.j[0] - tr[i].j[0]) : 0))));
            // the outer (Pages, Theme) edges' largest single-frame move
            const edgeJump = Math.max(...tr.slice(1).map((f, i) => (f.n && tr[i].n ? Math.max(Math.abs(f.edges[0][0] - tr[i].edges[0][0]), Math.abs(f.edges.at(-1)[1] - tr[i].edges.at(-1)[1])) : 0)));
            const framesJMoving = tr.slice(i0).filter((f, i, a) => i > 0 && f.j.some((v, k) => Math.abs(v - (a[i - 1].j[k] ?? v)) > 1e-4)).length;
            const pre = tr[Math.max(0, i0 - 1)], end = tr.at(-1);
            const travel = [+(end.edges[0][0] - pre.edges[0][0]).toFixed(2), +(end.edges.at(-1)[1] - pre.edges.at(-1)[1]).toFixed(2)];
            // overlap between neighbouring members' painted boxes, worst frame
            const overlap = Math.max(0, ...tr.slice(i0).map((f) => Math.max(0, ...f.edges.slice(1).map((e, k) => f.edges[k][1] - e[0]))));
            const shareOv = Math.max(0, ...tr.slice(i0).map((f) => f.shareOverlap));
            res[name] = { outerTravel: travel, maxOverlapPx: +overlap.toFixed(2), maxShareOverlapPx: +shareOv.toFixed(2), arriverOpacity: tr.slice(i0, i0 + 40).map((f) => f.op[1]), edgeTrace: tr.slice(Math.max(0, i0 - 1), i0 + 50).map((f) => [f.t, f.edges[0][0], f.edges.at(-1)[1]]), window: win, maxJoinJumpPerFrame: +jJump.toFixed(4), maxOuterEdgeJumpPerFrame: +edgeJump.toFixed(2), framesJoinsMoveAfterChange: framesJMoving, errs: errs.slice(0, 3) };
            const g = await geom(page);
            await shot(page, `pagechange-${name}-end`, g);
            log("pagechange", name, "travel", JSON.stringify(res[name].outerTravel), "boxOverlap", res[name].maxOverlapPx, "shareOverlap", res[name].maxShareOverlapPx, "jJump", jJump.toFixed(3), "edgeJump", edgeJump.toFixed(1), "framesMoving", framesJMoving);
        } finally { await ctx.close(); }
    }
    rec.cells.pagechange = res;
}

// daraksha §5 consumer logic on a real clock: the reader has reached for the dock (expanded) and goes to a page
async function partRouter(browser) {
    const res = {};
    for (const [name, to] of Object.entries({ toNoControls: "/b", toControls: "/c" })) {
        const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design", query: { router: "1" } });
        try {
            await page.evaluate(() => window.__ab.reach(true));
            await page.waitForTimeout(1500);
            const s = await page.evaluate((to) => new Promise((resolve) => {
                const out = [];
                const t0 = performance.now();
                // painted reach: how far member 0's share (lens 0 clip, root px) extends past member 0's own right edge
                const reachPx = () => { const root = document.querySelector("[data-testid=cluster]"); const rr = root.getBoundingClientRect(); const m = root.querySelector(":scope > .glass-dock").getBoundingClientRect(); const xs = [...getComputedStyle(root.querySelector(".dock-cluster-lens")).clipPath.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((q) => +q[1] + rr.left); return +(Math.max(...xs) - m.right).toFixed(2); };
                const pre = { edges: [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")].map((d) => { const r = d.getBoundingClientRect(); return [+r.left.toFixed(1), +r.right.toFixed(1)]; }), reach: reachPx(), state: window.__ab.state() };
                out.push({ pre });
                const f = () => {
                    const st = window.__ab.state();
                    const ds = [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")];
                    out.push({ t: +(performance.now() - t0).toFixed(1), fused: st.fused, changing: st.changing, route: st.route, j: (window.__clusterNow?.() ?? []).map((v) => +v.toFixed(3)), n: ds.length, edges: ds.map((d) => { const r = d.getBoundingClientRect(); return [+r.left.toFixed(1), +r.right.toFixed(1)]; }), reach: reachPx() });
                    if (performance.now() - t0 < 1200) requestAnimationFrame(f); else resolve(out);
                };
                // the `changing` flag's own timeline, sampled in microtask/macrotask order around the push
                const flags = [];
                const watch = setInterval(() => flags.push([+(performance.now() - t0).toFixed(1), window.__ab.state().changing]), 0);
                requestAnimationFrame(f);
                window.__ab.go(to).then(() => flags.push(["push resolved", +(performance.now() - t0).toFixed(1), window.__ab.state().changing]));
                setTimeout(() => clearInterval(watch), 300);
                window.__flags = flags;
            }), to);
            const flags = await page.evaluate(() => window.__flags);
            const pre = s.shift().pre;
            const fusedFrames = s.filter((f) => f.fused).length;
            const changingSamples = flags.filter((f) => f[1] === true).length;
            const gap = 10; // --dock-cluster-gap: a share must reach gap/2 past its member to touch at the cut
            const maxReach = Math.max(...s.map((f) => f.reach));
            const framesTouching = s.filter((f) => f.reach >= gap / 2 - 0.5).length;
            res[name] = { frames: s.length, pre, framesWithFusedTrue: fusedFrames, maxPaintedReachPx: maxReach, framesSharesTouching: framesTouching, changingTrueSamplesOnTimers: changingSamples, flagsHead: flags.slice(0, 4), membersBeforeAfter: [pre.edges, s.at(-1).edges], themeLeftEdgeFirstFrameMove: +(s[0].edges.at(-1)[0] - pre.edges.at(-1)[0]).toFixed(1), maxOuterEdgeMovePerFrame: +Math.max(Math.abs(s[0].edges.at(-1)[1] - pre.edges.at(-1)[1]), Math.abs(s[0].edges[0][0] - pre.edges[0][0]), ...s.slice(1).map((f, i) => Math.max(Math.abs(f.edges.at(-1)[1] - s[i].edges.at(-1)[1]), Math.abs(f.edges[0][0] - s[i].edges[0][0])))).toFixed(2), outerTravel: [+(s.at(-1).edges[0][0] - pre.edges[0][0]).toFixed(1), +(s.at(-1).edges.at(-1)[1] - pre.edges.at(-1)[1]).toFixed(1)], reachTrace: s.slice(0, 40).map((f) => [f.t, f.reach]), errs: errs.slice(0, 3) };
            log("router", name, "maxEdgeStep", res[name].maxOuterEdgeMovePerFrame, "travel", JSON.stringify(res[name].outerTravel), "fusedFrames", fusedFrames, "maxReach", maxReach, "touching", framesTouching, "themeMove", res[name].themeLeftEdgeFirstFrameMove);
        } finally { await ctx.close(); }
    }
    rec.cells.router = res;
}

// geometry of each member's painted share against its own box (vertical, RTL)
const shareCoverage = (page) => page.evaluate(() => {
    const root = document.querySelector("[data-testid=cluster]");
    const ds = [...root.querySelectorAll(":scope > .glass-dock")];
    const rr = root.getBoundingClientRect();
    const lenses = [...root.querySelectorAll(":scope > .dock-cluster-lens")];
    const bbox = (clip, ox, oy) => { const n = [...clip.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((m) => [+m[1] + ox, +m[2] + oy]); if (!n.length) return null; const xs = n.map((p) => p[0]), ys = n.map((p) => p[1]); return { l: Math.min(...xs), r: Math.max(...xs), t: Math.min(...ys), b: Math.max(...ys) }; };
    return ds.map((d, i) => {
        const m = d.getBoundingClientRect();
        const sh = lenses[i] ? bbox(getComputedStyle(lenses[i]).clipPath, rr.left, rr.top) : null;
        const ix = sh ? Math.max(0, Math.min(sh.r, m.right) - Math.max(sh.l, m.left)) : 0, iy = sh ? Math.max(0, Math.min(sh.b, m.bottom) - Math.max(sh.t, m.top)) : 0;
        return { label: d.getAttribute("aria-label"), member: [m.left, m.right, m.top, m.bottom].map((v) => +v.toFixed(1)), share: sh && [sh.l, sh.r, sh.t, sh.b].map((v) => +v.toFixed(1)), coverage: sh ? +((ix * iy) / (m.width * m.height)).toFixed(3) : null };
    });
});
async function partLayout(browser, name, query) {
    const res = [];
    for (const v of [[false, false], [true, true], [true, false]]) {
        const { ctx, page, errs } = await open(browser, { w: 1440, h: 700, mode: "design", query });
        try {
            await page.evaluate((v) => window.__ab.set(v), v);
            await page.waitForTimeout(1600);
            const g = await geom(page);
            await shot(page, `${name}-${v.map((x) => (x ? "F" : "s")).join("")}`, g);
            const cov = await shareCoverage(page);
            res.push({ fused: v, coverage: cov, dir: await page.evaluate(() => getComputedStyle(document.querySelector("[data-testid=cluster]")).direction), errs: errs.slice(0, 5), errCount: errs.length });
            log(name, JSON.stringify(v), cov.map((c) => `${c.label}:${c.coverage}`).join(" "), "errs", errs.length);
        } finally { await ctx.close(); }
    }
    rec.cells[name] = res;
}

async function partMinsize(browser) {
    const res = [];
    for (const w of [1440, 390]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: true });
        try {
            const read = () => page.evaluate(() => {
                const d = document.querySelector("[data-testid=cluster] > .glass-dock[aria-label=Pages]");
                const w1 = d.getBoundingClientRect().width;
                const min = d.style.minInlineSize;
                d.style.minInlineSize = "";
                const w0 = d.getBoundingClientRect().width;
                d.style.minInlineSize = min;
                return { width: +w1.toFixed(3), natural: +w0.toFixed(3), minInline: min, emptyPx: +(w1 - w0).toFixed(3), tabs: d.querySelectorAll("button").length };
            });
            const before = await read();
            await shot(page, `minsize-${w}-before`, await geom(page));
            await page.evaluate(() => window.__ab.tabs(["Read"]));
            await page.waitForTimeout(800);
            const after = await read();
            await shot(page, `minsize-${w}-after-1tab`, await geom(page));
            res.push({ w, before, after, errs: errs.slice(0, 3) });
            log("minsize", w, JSON.stringify(before), "->", JSON.stringify(after));
        } finally { await ctx.close(); }
    }
    rec.cells.minsize = res;
}

async function partPrm(browser) {
    const res = {};
    for (const [name, css] of Object.entries({
        baseline: "",
        plantLensClip: ".dock-cluster-lens, .dock-cluster-tone { transition: clip-path 300ms linear; }",
        plantLensClipImportant: ".dock-cluster-lens, .dock-cluster-tone { transition: clip-path 300ms linear !important; }",
        plantPlateRadius: ".dock-cluster > .glass-dock > .dock-plate { transition: border-radius 300ms linear, clip-path 300ms linear; }",
        plantWaapiLens: "WAAPI",
    })) {
        const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design", reduced: true });
        try {
            if (css && css !== "WAAPI") await page.addStyleTag({ content: css });
            await page.waitForTimeout(100);
            const r = await page.evaluate((waapi) => new Promise((resolve) => {
                const root = document.querySelector("[data-testid=cluster]");
                const els = [root, ...root.querySelectorAll("*")];
                const nonOpacityListed = new Set(), nonOpacityRunning = new Set();
                const anims = new Map();
                const t0 = performance.now();
                const desc = (e) => (e.className?.baseVal ?? e.className ?? e.tagName).toString().split(" ")[0] || e.tagName;
                const sample = () => {
                    for (const e of els) {
                        const cs = getComputedStyle(e);
                        const props = cs.transitionProperty.split(",").map((s) => s.trim());
                        const durs = cs.transitionDuration.split(",").map((s) => parseFloat(s));
                        props.forEach((p, i) => {
                            if (p === "none" || p === "opacity") return;
                            nonOpacityListed.add(`${desc(e)}:${p}`);
                            if ((durs[i % durs.length] ?? 0) > 0) nonOpacityRunning.add(`${desc(e)}:${p}`);
                        });
                    }
                    for (const a of root.getAnimations({ subtree: true })) {
                        const kf = a.effect?.getKeyframes?.() ?? [];
                        const pr = a.transitionProperty ?? [...new Set(kf.flatMap((k) => Object.keys(k).filter((x) => !["offset", "easing", "composite", "computedOffset"].includes(x))))].join("+");
                        anims.set(`${a.constructor.name}:${pr}`, (anims.get(`${a.constructor.name}:${pr}`) ?? 0) + 1);
                    }
                };
                const lens0 = root.querySelector(".dock-cluster-lens");
                const geo = [];
                window.__ab.set(true);
                if (waapi) for (const l of root.querySelectorAll(".dock-cluster-lens")) l.animate([{ clipPath: getComputedStyle(l).clipPath }, { clipPath: "inset(0px)" }], 300);
                const f = () => { sample(); const g = getComputedStyle(lens0).clipPath; if (geo.at(-1)?.[1] !== g) geo.push([+(performance.now() - t0).toFixed(1), g]); if (performance.now() - t0 < 600) requestAnimationFrame(f); else resolve({ geometryStates: geo.length, geometryChangesAt: geo.map((x) => x[0]), nonOpacityListed: [...nonOpacityListed].slice(0, 30), nonOpacityListedCount: nonOpacityListed.size, nonOpacityWithDuration: [...nonOpacityRunning], animations: Object.fromEntries(anims) }); };
                requestAnimationFrame(f);
            }), css === "WAAPI");
            const nonOpacityAnims = Object.keys(r.animations).filter((k) => !/:opacity$/.test(k));
            r.verdictByAnimations = nonOpacityAnims.length === 0 && r.geometryStates <= 2 ? "GREEN" : "RED";
            res[name] = { ...r, errs: errs.slice(0, 3) };
            log("prm", name, r.verdictByAnimations, "geoStates", r.geometryStates, "listed", r.nonOpacityListedCount, "withDuration", r.nonOpacityWithDuration.length, JSON.stringify(r.animations));
        } finally { await ctx.close(); }
    }
    rec.cells.prm = res;
}

// G8's runtime half, as written in W-I.8 §3, plus whether an SVG filter is painting anywhere in the cluster
async function partG8(browser) {
    const res = {};
    const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design", fused: true });
    try {
        await page.evaluate(() => {
            const ns = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(ns, "svg");
            svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.style.position = "absolute";
            svg.innerHTML = '<filter id="cluster-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter>';
            document.body.appendChild(svg);
        });
        await page.waitForTimeout(300);
        const g8 = await page.evaluate(() => {
            const all = [...document.querySelectorAll("*")];
            const bd = (e) => { const v = getComputedStyle(e).backdropFilter || getComputedStyle(e).webkitBackdropFilter; return v && v !== "none"; };
            const bad = [];
            for (const e of all.filter(bd)) {
                for (let a = e.parentElement; a; a = a.parentElement) {
                    const cs = getComputedStyle(a);
                    if ((cs.filter && cs.filter !== "none") || (cs.clipPath && cs.clipPath !== "none") || (cs.maskImage && cs.maskImage !== "none") || +cs.opacity < 1 || cs.mixBlendMode !== "normal" || bd(a)) bad.push(`${e.className} < ${a.className}`);
                }
            }
            const containsBd = all.filter((e) => getComputedStyle(e).filter !== "none" && (bd(e) || [...e.querySelectorAll("*")].some(bd)));
            const svgFiltered = [...document.querySelectorAll("[data-testid=cluster] *")].filter((e) => /url\(/.test(getComputedStyle(e).filter)).map((e) => `${e.className}: ${getComputedStyle(e).filter}`);
            return { ancestorViolations: bad, filterOverBackdrop: containsBd.map((e) => e.className), svgFilteredInCluster: svgFiltered };
        });
        const g = await geom(page);
        await shot(page, "g8-fused", g);
        res.g8 = { ...g8, verdict: g8.ancestorViolations.length === 0 && g8.filterOverBackdrop.length === 0 ? "GREEN" : "RED", errs: errs.slice(0, 3) };
        log("g8", res.g8.verdict, "svg-filtered in cluster:", g8.svgFilteredInCluster.length);
    } finally { await ctx.close(); }
    rec.cells.g8 = res;
}

const browser = await (engine === "webkit" ? playwright.webkit : playwright.chromium).launch({ headless: true });
try {
    rec.version = browser.version();
    for (const p of parts) {
        try {
            if (p === "dpr") await partDpr(browser);
            if (p === "narrow") await partNarrow(browser);
            if (p === "coarse") await partCoarse(browser);
            if (p === "interrupt") await partInterrupt(browser);
            if (p === "pagechange") await partPageChange(browser);
            if (p === "router") await partRouter(browser);
            if (p === "vertical") await partLayout(browser, "vertical", { orient: "vertical" });
            if (p === "rtl") await partLayout(browser, "rtl", { rtl: "1" });
            if (p === "minsize") await partMinsize(browser);
            if (p === "prm") await partPrm(browser);
            if (p === "g8") await partG8(browser);
        } catch (e) { rec.cells[`${p}-error`] = String(e?.stack ?? e).slice(0, 800); log("PART ERROR", p, String(e).slice(0, 300)); }
    }
} finally {
    await browser.close();
    server.close();
    rec.ended = new Date().toISOString();
    fs.writeFileSync(path.join(out, "data", `${engine}-${tag}.json`), JSON.stringify(rec, null, 1));
    log("wrote", path.join(out, "data", `${engine}-${tag}.json`));
}
