// PASS-2 FOLD-1 probe: the challenge-1 probe plus the fold reads (no inset(50%) exemption, .dock-controls clip, silhouette ends, control boxes by label, trigger sitedock + focus cells, reader breakpoint cells).
// CHALLENGE-1 probe: the pass-2 probe (unchanged above the challenge-1 parts) plus tools/parts-c1.mjs inlined.
// PASS-2 probe (O-200 one dock, O-202 swap, O-199 capsule, F5). Helpers are the fold probe's, unchanged (lines 1-125).
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
const tag = args.tag ?? "p2";
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
    const q = new URLSearchParams({ mode: o.mode ?? "design", fused: o.fused ? "1" : "0", ...(o.q ?? {}), ...(o.theme === "dark" ? { dark: "1" } : {}), ...(o.query ?? {}) });
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

// ------------------------------------------------------------------ pass-2 parts
const OFF = { follow: "0", glide: "0", cede: "0", scalemap: "0", ink: "share", tone: "share" }; // the fold build's behaviour, same bundle
// one frame's reads, in the page
const FRAME_READ = () => {
    const root = document.querySelector("[data-testid=cluster]");
    const ds = [...root.querySelectorAll(":scope > .glass-dock")];
    const rb = root.getBoundingClientRect();
    const lenses = [...root.querySelectorAll(":scope > .dock-cluster-lens")];
    const xs = (s) => [...s.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((q) => +q[1]);
    // a lens's share is its first sub-path; what follows it is the 1 px neck overlap (r7)
    const shares = lenses.map((l) => { const v = xs(getComputedStyle(l).clipPath.split(/Z|z/)[0]); const lx = l.getBoundingClientRect().left; return v.length ? [+(Math.min(...v) + lx).toFixed(2), +(Math.max(...v) + lx).toFixed(2)] : null; });
    const memberBox = ds.map((d) => { const r = d.getBoundingClientRect(); return [+r.left.toFixed(2), +r.right.toFixed(2)]; });
    const plateBox = ds.map((d) => { const p = d.querySelector(":scope > .dock-plate"); const r = p.getBoundingClientRect(); return [+r.left.toFixed(2), +r.right.toFixed(2)]; });
    // the glass each member paints: its share in a cluster, its own plate box alone
    const glass = shares.length === ds.length && shares.every(Boolean) ? shares : plateBox;
    let shareOverlap = 0;
    for (let i = 1; i < glass.length; i++) shareOverlap = Math.max(shareOverlap, glass[i - 1][1] - glass[i][0]);
    // % radius on a non-square box, elliptical radii, % in clip strings: the whole subtree
    let pct = 0, ell = 0, clipPct = 0, ownClipPct = 0;
    for (const e of [root, ...root.querySelectorAll("*")]) {
        const cs = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        const sq = Math.abs(r.width - r.height) < 0.5;
        for (const c of [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius]) {
            if (/%/.test(c) && !sq && r.width > 0) pct++;
            const parts = c.split(" ");
            if (parts.length === 2 && parts[0] !== parts[1]) ell++;
        }
        // the cluster's own writes: its layers, a member's plate and ring, a member's controls clip
        if (/%/.test(cs.clipPath) && e.matches(".dock-cluster-lens, .dock-cluster-tone, .dock-cluster-shadow, .dock-cluster-shadow *, .dock-cluster > .glass-dock > .dock-plate, .dock-cluster > .glass-dock > .dock-controls")) { ownClipPct++; (window.__ownClipPctWho ??= new Set()).add(`${(e.className?.baseVal ?? e.className).toString().split(" ")[0]}: ${cs.clipPath.slice(0, 40)}`); }
        if (e.matches(".dock-cluster > .glass-dock > .dock-plate") && /%/.test(getComputedStyle(e, "::before").clipPath)) ownClipPct++;
        if (/%/.test(cs.clipPath)) { clipPct++; (window.__clipPctWho ??= new Set()).add(`${(e.className?.baseVal ?? e.className).toString().split(" ")[0]}: ${cs.clipPath.slice(0, 40)}`); }
    }
    // content outside the glass: every control, its painted opacity (product up to the root)
    let outMax = 0, outOpMax = 0, outVisMax = 0; window.__outWho = "";
    for (const b of root.querySelectorAll("button")) {
        const di = ds.findIndex((d) => d.contains(b));
        if (di < 0) continue;
        let op = 1;
        for (let a = b; a && a !== root.parentElement; a = a.parentElement) op *= +getComputedStyle(a).opacity;
        const vis = getComputedStyle(b).visibility !== "hidden" && !b.closest("[inert]");
        if (!vis && op < 0.01) continue;
        const r = b.getBoundingClientRect();
        const g = glass[di];
        const mb = ds[di].hasAttribute("data-morphing") ? ds[di].getBoundingClientRect() : null;
        let l = mb ? Math.max(r.left, mb.left) : r.left, rr = mb ? Math.min(r.right, mb.right) : r.right;
        // a face content clipped by the cluster's glide (inset px, negative allowed)
        for (const fc of [b.closest(".dock-face-content"), b.closest(".dock-controls > *")]) {
            // inset() with 1-4 lengths, as the engine serializes it (a symmetric clip shortens)
            const m = fc?.style.clipPath?.match(/^inset\(([^)]*)\)$/);
            if (m) { const v = m[1].trim().split(/\s+/).map((x) => parseFloat(x)); const [t, r = t, b = t, lft = r] = v; void b; const fr = fc.getBoundingClientRect(); l = Math.max(l, fr.left + lft); rr = Math.min(rr, fr.right - r); }
        }
        const out = rr <= l ? 0 : Math.max(0, Math.min(rr, g[0]) - l) + Math.max(0, rr - Math.max(l, g[1]));
        if (op > 0.05 && out > outMax) window.__outWho = `${ds[di].getAttribute("aria-label")}/${b.getAttribute("aria-label") ?? b.textContent.trim()} op ${op.toFixed(2)} ctl [${l.toFixed(1)},${rr.toFixed(1)}] glass [${g[0]},${g[1]}]`;
        if (op > 0.25) outVisMax = Math.max(outVisMax, out);
        if (op > 0.05) outMax = Math.max(outMax, out);
        outOpMax = Math.max(outOpMax, out * op);
    }
    const sil = shares.every(Boolean) && shares.length ? [Math.min(...shares.map((x) => x[0])), Math.max(...shares.map((x) => x[1]))] : null;
    // each member's visible controls, by label: the union of its painted buttons (opacity > 0.25)
    const ctl = {};
    ds.forEach((d) => {
        let lo = Infinity, hi = -Infinity;
        for (const b of d.querySelectorAll("button")) {
            let op = 1; for (let a = b; a && a !== root.parentElement; a = a.parentElement) op *= +getComputedStyle(a).opacity;
            if (op <= 0.25 || getComputedStyle(b).visibility === "hidden" || b.closest("[inert]")) continue;
            const r = b.getBoundingClientRect(); if (r.width < 1) continue;
            lo = Math.min(lo, r.left); hi = Math.max(hi, r.right);
        }
        if (lo < hi) ctl[d.getAttribute("aria-label")] = [+lo.toFixed(2), +hi.toFixed(2)];
    });
    const faces = [...root.querySelectorAll(".dock-face")].map((f) => +(+getComputedStyle(f).opacity).toFixed(3));
    const p = window.__clusterPaint ?? null;
    return { ctlClip: ds.map((d) => { const c = d.querySelector(":scope > .dock-controls > .dock-layers") ?? d.querySelector(":scope > .dock-controls > *"); const r = c?.getBoundingClientRect(); return c ? `${c.style.clipPath} @ [${r.left.toFixed(1)},${r.right.toFixed(1)}] member [${d.getBoundingClientRect().left.toFixed(1)},${d.getBoundingClientRect().right.toFixed(1)}]` : null; }), outVisMax: +outVisMax.toFixed(2), outWho: window.__outWho, ownClipPct, ownClipPctWho: [...(window.__ownClipPctWho ?? [])].slice(0, 4), dbg: window.__clusterPaint?.dbg, m: window.__clusterPaint?.m, sil, ctl, clipPctWho: [...(window.__clipPctWho ?? [])].slice(0, 6), memberBox, plateBox, shares, shareOverlap: +shareOverlap.toFixed(2), pct, ell, clipPct, outMax: +outMax.toFixed(2), outOpMax: +outOpMax.toFixed(2), faces, morphing: ds.map((d) => d.hasAttribute("data-morphing")), k: p?.k, follow: p?.follow?.map((v) => +v.toFixed(2)), gliding: p?.gliding, now: window.__clusterNow?.()?.map((v) => +v.toFixed(3)) };
};

// a virtual-clock episode: `acts` run at t=0 (in order), then `ms` of 8.33 ms frames; png at `shots` (ms)
async function trace(page, acts, ms, name, shots = []) {
    await page.evaluate(() => window.__vc.freeze());
    await page.evaluate((acts) => { for (const [fn, arg] of acts) window.__ab[fn](arg); }, acts);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
    const frames = [];
    const n = Math.round(ms / FRAME);
    for (let i = 0; i < n; i++) {
        const f = await page.evaluate(async ([F, read]) => {
            window.__vc.step(F);
            await new Promise((r) => setTimeout(r, 0));
            // one rendering update: a fresh observer's first delivery comes after every earlier observer's
            await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); });
            return (0, eval)(`(${read})`)();
        }, [FRAME, FRAME_READ.toString()]);
        f.t = +((i + 1) * FRAME).toFixed(1);
        frames.push(f);
        const want = shots.find((s) => Math.abs(s - f.t) < FRAME / 2);
        if (want !== undefined && name) {
            const g = await geom(page);
            // crop to the painted glass as well as the member boxes (a shrinking glide paints wider)
            const top = Math.min(...g.members.map((q) => q.t)), bot = Math.max(...g.members.map((q) => q.b));
            for (const sh of f.shares ?? []) if (sh) g.members.push({ l: sh[0], r: sh[1], t: top, b: bot });
            const img = await shot(page, `${name}-t${want}`, g, 20);
            f.img = img;
        }
    }
    await page.evaluate(() => window.__vc.thaw());
    return frames;
}
const maxStep = (frames, get) => { let m = 0, at = 0; for (let i = 1; i < frames.length; i++) { const d = Math.abs(get(frames[i]) - get(frames[i - 1])); if (d > m) { m = d; at = frames[i].t; } } return { max: +m.toFixed(2), at }; };
function summarize(frames, f0) {
    const last = frames.at(-1);
    const n = last.memberBox.length;
    const edges = {};
    for (let i = 0; i < n; i++) {
        const l = (f) => f.memberBox[i]?.[0] ?? NaN, r = (f) => f.memberBox[i]?.[1] ?? NaN;
        const s0 = f0?.memberBox[i] ?? frames[0].memberBox[i] ?? [NaN, NaN];
        const first = f0?.memberBox[i] && frames[0].memberBox[i] ? { l: +Math.abs(l(frames[0]) - s0[0]).toFixed(2), r: +Math.abs(r(frames[0]) - s0[1]).toFixed(2) } : null;
        const ok = frames.filter((f) => f.memberBox.length === n);
        edges[i] = { travelL: +Math.abs(l(last) - s0[0]).toFixed(2), travelR: +Math.abs(r(last) - s0[1]).toFixed(2), firstFrame: first, stepL: maxStep(ok, l), stepR: maxStep(ok, r) };
    }
    const gl = (f) => (f.shares.length === f.memberBox.length && f.shares.every(Boolean) ? f.shares : f.plateBox);
    const gaps = frames.map((f) => { const g = gl(f); return g.slice(1).map((s, i) => +(s[0] - g[i][1]).toFixed(2)); });
    return {
        frames: frames.length, edges,
        shareOverlapMax: Math.max(...frames.map((f) => f.shareOverlap)),
        pct: frames.reduce((a, f) => a + f.pct, 0), ell: frames.reduce((a, f) => a + f.ell, 0), clipPct: frames.reduce((a, f) => a + f.clipPct, 0), ownClipPct: frames.reduce((a, f) => a + (f.ownClipPct ?? 0), 0), ownClipPct: frames.reduce((a, f) => a + f.ownClipPct, 0), clipPctWho: frames.at(-1).clipPctWho, ownClipPctWho: frames.at(-1).ownClipPctWho,
        outsideMaxPx: Math.max(...frames.map((f) => f.outMax)), outsideOpMax: Math.max(...frames.map((f) => f.outOpMax)), outsideVisMaxPx: Math.max(...frames.map((f) => f.outVisMax ?? 0)),
        gapFirst: gaps[0], gapLast: gaps.at(-1),
        kMin: Math.min(...frames.map((f) => Math.min(...(f.k ?? [1])))),
        clipPctWho: last.clipPctWho,
        // the glass (share, or plate alone) each member painted in the first frame, against the frame before
        glassFirst: f0 ? gl(frames[0]).map((g, i) => (gl(f0)[i] ? [+(g[0] - gl(f0)[i][0]).toFixed(2), +(g[1] - gl(f0)[i][1]).toFixed(2)] : null)) : null,
        glassStep: gl(last).map((_, i) => ({ l: maxStep(frames.filter((f) => gl(f).length === gl(last).length), (f) => gl(f)[i][0]), r: maxStep(frames.filter((f) => gl(f).length === gl(last).length), (f) => gl(f)[i][1]) })),
    };
}
// the ink profile across a join in one frame (flat field): the bridge reads the interior ink, or the bare field
function bridge(img, f, i, theme) {
    const g = f.shares.every(Boolean) ? f.shares : f.plateBox;
    const a = f.memberBox[i], b = f.memberBox[i + 1];
    const y = img.clip.y + img.clip.height / 2;
    const inside = [];
    for (let x = a[1] - 14; x <= a[1] - 6; x += 0.5) inside.push(L(img, x, y));
    const ink = inside.reduce((s, v) => s + v, 0) / inside.length;
    let dev = 0, at = null;
    const x0 = Math.min(a[1], g[i][1]) - 1, x1 = Math.max(b[0], g[i + 1][0]) + 1;
    for (let x = x0; x <= x1; x += 1 / img.dsf) { const d = Math.abs(L(img, x, y) - ink); if (d > dev) { dev = d; at = +x.toFixed(2); } }
    return { ink: +ink.toFixed(1), bridgeDev: +dev.toFixed(1), at, span: [+x0.toFixed(2), +x1.toFixed(2)] };
}
// the left cap of member 0's ink: the boundary x at rows down from its top, against a circle and an ellipse
function cap(img, f, field) {
    const [x0, x1] = f.shares[0] ?? f.plateBox[0];
    const top = img.clip.y + 20, h = img.clip.height - 40, r = h / 2;
    const rows = [1.5, 3, 6, 10, r * 0.6];
    const res = rows.map((dy) => {
        const y = top + dy;
        let bx = null;
        for (let x = x0 - 2; x < x0 + r + 4; x += 1 / img.dsf) if (Math.abs(L(img, x, y) - field) > 4) { bx = x; break; }
        const circ = x0 + r - Math.sqrt(Math.max(0, r * r - (r - dy) ** 2));
        return { dy: +dy.toFixed(1), boundary: bx === null ? null : +(bx - x0).toFixed(2), circle: +(circ - x0).toFixed(2) };
    });
    return { r: +r.toFixed(2), rows: res };
}

async function cellOneDock(browser, o, label, q) {
    const out = {};
    // (1) expand + the theme fissions out (the reader reaches for the dock)
    let { ctx, page, errs } = await open(browser, { ...o, fused: true, q: { shape: "onedock", ...q } });
    try {
        const f0 = await page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
        const fr = await trace(page, [["set", false], ["expand"]], 900, o.mode === "flat" ? `onedock-${label}-${o.w}-${o.theme}-expand` : null, o.mode === "flat" ? [50, 117, 250] : []);
        out.expand = { ...summarize(fr, f0), at0: f0, errs: errs.slice(0, 4) };
        if (o.mode === "flat") {
            const fl = await page.evaluate(() => 0);
            void fl;
            out.expand.bridge = fr.filter((f) => f.img).map((f) => ({ t: f.t, ...bridge(f.img, f, 0, o.theme), now: f.now, k: f.k }));
            out.expand.cap = fr.filter((f) => f.img).map((f) => ({ t: f.t, k: f.k?.[0], ...cap(f.img, f, L(f.img, f.img.clip.x + 3, f.img.clip.y + 3)) }));
            fr.forEach((f) => delete f.img);
        }
        out.expand.trace = fr.filter((_, i) => i % 3 === 0).map((f) => ({ t: f.t, m: f.memberBox, s: f.shares, k: f.k, fo: f.follow, now: f.now, mo: f.morphing }));
        // (2) collapse + fuse (the reader leaves); from the settled expanded, fissioned state
        await page.waitForTimeout(200);
        const g0 = await page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
        const fc = await trace(page, [["set", true], ["collapse"]], 900, o.mode === "flat" ? `onedock-${label}-${o.w}-${o.theme}-collapse` : null, o.mode === "flat" ? [50, 117, 250] : []);
        out.collapse = { ...summarize(fc, g0), at0: g0 };
        if (o.mode === "flat") {
            out.collapse.bridge = fc.filter((f) => f.img).map((f) => ({ t: f.t, ...bridge(f.img, f, 0, o.theme), now: f.now, k: f.k }));
            out.collapse.cap = fc.filter((f) => f.img).map((f) => ({ t: f.t, k: f.k?.[0], ...cap(f.img, f, L(f.img, f.img.clip.x + 3, f.img.clip.y + 3)) }));
            fc.forEach((f) => delete f.img);
        }
        out.collapse.trace = fc.filter((_, i) => i % 3 === 0).map((f) => ({ t: f.t, m: f.memberBox, s: f.shares, k: f.k, fo: f.follow, now: f.now, mo: f.morphing }));
        out.errs = errs.slice(0, 4);
    } finally { await ctx.close(); }
    return out;
}

async function partOneDock(browser) {
    const res = {};
    for (const w of [390, 1440]) for (const theme of ["light", "dark"]) for (const [label, q] of [["p2", {}], ["fold", OFF]].filter(([l]) => (args.labels ?? "p2,fold,v1100").split(",").includes(l))) {
        const key = `${label}-${w}-${theme}`;
        res[key] = await cellOneDock(browser, { w, theme, mode: "flat" }, label, q);
        const e = res[key].expand, c = res[key].collapse;
        log("onedock", key, "| expand: glass first", JSON.stringify(e.glassFirst), "glass steps", JSON.stringify(e.glassStep?.map((x) => [x.l.max, x.r.max])), "collapse glass first", JSON.stringify(c.glassFirst), "steps", JSON.stringify(c.glassStep?.map((x) => [x.l.max, x.r.max])), "theme(1) firstFrame", JSON.stringify(e.edges[1]?.firstFrame), "stepL", JSON.stringify(e.edges[1]?.stepL), "travel", e.edges[1]?.travelL, "overlap", e.shareOverlapMax, "pct/ell/clip%", e.pct, e.ell, e.clipPct, "bridge", JSON.stringify(e.bridge?.map((b) => b.bridgeDev)), "| collapse: theme stepL", JSON.stringify(c.edges[1]?.stepL), "travel", c.edges[1]?.travelL, "bridge", JSON.stringify(c.bridge?.map((b) => b.bridgeDev)), "outside", c.outsideMaxPx, e.outsideMaxPx, "errs", res[key].errs.length);
    }
    rec.cells.onedock = res;
}

async function cellSwap(browser, o, label, q) {
    const out = {};
    const { ctx, page, errs } = await open(browser, { ...o, fused: true, q: { shape: "swap", ...q } });
    try {
        const png = o.mode === "flat" || o.shots;
        const f0 = await page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
        const fr = await trace(page, [["layer", "tool"]], 900, png ? `swap-${label}-${o.w}-${o.theme}-${o.mode}-in` : null, png ? [33, 83, 167] : []);
        out.in = { ...summarize(fr, f0), at0: f0 };
        fr.forEach((f) => delete f.img);
        out.in.trace = fr.filter((_, i) => i % 3 === 0).map((f) => ({ t: f.t, m: f.memberBox, s: f.shares, p: f.plateBox, faces: f.faces, out: f.outMax, outOp: f.outOpMax, outVis: f.outVisMax, who: f.outWho, cc: f.ctlClip, fo: f.follow, gl: f.gliding }));
        await page.waitForTimeout(200);
        const g0 = await page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
        const fb = await trace(page, [["layer", "tools"]], 900, png ? `swap-${label}-${o.w}-${o.theme}-${o.mode}-out` : null, png ? [33, 83, 167] : []);
        out.out = { ...summarize(fb, g0), at0: g0 };
        fb.forEach((f) => delete f.img);
        out.out.trace = fb.filter((_, i) => i % 3 === 0).map((f) => ({ t: f.t, m: f.memberBox, s: f.shares, p: f.plateBox, faces: f.faces, out: f.outMax, outOp: f.outOpMax, outVis: f.outVisMax, who: f.outWho, fo: f.follow, gl: f.gliding }));
        out.errs = errs.slice(0, 4);
    } finally { await ctx.close(); }
    return out;
}
async function partSwap(browser) {
    const res = {};
    for (const w of [390, 1440]) for (const theme of ["light", "dark"]) for (const [label, q] of [["p2", {}], ["fold", OFF], ["v1100", { nocluster: "1" }]].filter(([l]) => (args.labels ?? "p2,fold,v1100").split(",").includes(l))) {
        const key = `${label}-${w}-${theme}`;
        res[key] = await cellSwap(browser, { w, theme, mode: "design", shots: w === 1440 }, label, q);
        const a = res[key].in, b = res[key].out;
        const dockW = (f) => f.memberBox[0][1] - f.memberBox[0][0];
        log("swap", key, "| in: dock width", (a.at0.memberBox[0][1] - a.at0.memberBox[0][0]).toFixed(1), "->", dockW({ memberBox: a.trace.at(-1).m }).toFixed(1), "glass first frame", JSON.stringify(a.glassFirst), "glass steps", JSON.stringify(a.glassStep?.map((x) => [x.l.max, x.r.max])), "glass R step", JSON.stringify(a.edges[0]?.stepR), "overlap", a.shareOverlapMax, "outside px/op", a.outsideMaxPx, a.outsideOpMax, "last member stepL", JSON.stringify(a.edges[Object.keys(a.edges).at(-1)]?.stepL), "| out: glass first", JSON.stringify(b.glassFirst), "glass steps", JSON.stringify(b.glassStep?.map((x) => [x.l.max, x.r.max])), "step", JSON.stringify(b.edges[0]?.stepR), "last member stepL", JSON.stringify(b.edges[Object.keys(b.edges).at(-1)]?.stepL), "overlap", b.shareOverlapMax, "outside", b.outsideMaxPx, b.outsideOpMax, "errs", res[key].errs.length);
    }
    rec.cells.swap = res;
}

// O-198: reduced motion over the one-dock and the swap, real clock, both directions
async function partPrm(browser) {
    const res = {};
    for (const [name, q, acts] of [["onedock-expand", { shape: "onedock" }, [["set", false], ["expand"]]], ["onedock-collapse", { shape: "onedock", open: "1" }, [["set", true], ["collapse"]]], ["swap-in", { shape: "swap" }, [["layer", "tool"]]], ["swap-out", { shape: "swap", __pre: "tool" }, [["layer", "tools"]]], ["plant-waapi", { shape: "onedock" }, "WAAPI"]]) {
        const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design", reduced: true, fused: name !== "onedock-collapse", q });
        try {
            if (q.__pre) { await page.evaluate((l) => window.__ab.layer(l), q.__pre); await page.waitForTimeout(400); }
            const r = await page.evaluate(([acts, waapi]) => new Promise((resolve) => {
                const root = document.querySelector("[data-testid=cluster]");
                const anims = new Map();
                const t0 = performance.now();
                const lens0 = root.querySelector(".dock-cluster-lens");
                const geoOf = () => [lens0 ? getComputedStyle(lens0).clipPath : "", ...[...root.querySelectorAll(":scope > .glass-dock")].map((d) => `${getComputedStyle(d).translate}|${d.getBoundingClientRect().width.toFixed(1)}|${getComputedStyle(d).scale}`)].join(" ; ");
                const geo = [[0, geoOf()]];
                let lastOp = 0;
                const sample = () => {
                    for (const a of root.getAnimations({ subtree: true })) {
                        const kf = a.effect?.getKeyframes?.() ?? [];
                        const pr = a.transitionProperty ?? [...new Set(kf.flatMap((k) => Object.keys(k).filter((x) => !["offset", "easing", "composite", "computedOffset"].includes(x))))].join("+");
                        anims.set(`${a.constructor.name}:${pr}`, (anims.get(`${a.constructor.name}:${pr}`) ?? 0) + 1);
                        if (pr === "opacity" && a.playState === "running") lastOp = performance.now() - t0;
                    }
                };
                if (waapi) { window.__ab.set(false); window.__ab.expand(); for (const l of root.querySelectorAll(".dock-cluster-lens")) l.animate([{ clipPath: getComputedStyle(l).clipPath }, { clipPath: "inset(0px)" }], 300); }
                else for (const [fn, arg] of acts) window.__ab[fn](arg);
                // geometry is read after the frame's ResizeObserver delivery (a fresh observer fires
                // after every earlier one), so it is the state that paints, not a pre-observer state
                const painted = () => new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); });
                const f = async () => { sample(); await painted(); const g = geoOf(); if (geo.at(-1)[1] !== g) geo.push([+(performance.now() - t0).toFixed(1), g]); if (performance.now() - t0 < 700) requestAnimationFrame(f); else resolve({ geometryStates: geo.length, geometryChangesAt: geo.map((x) => x[0]), lastOpacityAt: +lastOp.toFixed(1), animations: Object.fromEntries(anims) }); };
                requestAnimationFrame(f);
            }), [acts === "WAAPI" ? [] : acts, acts === "WAAPI"]);
            const nonOpacity = Object.keys(r.animations).filter((k) => !/:opacity$/.test(k));
            r.verdict = nonOpacity.length === 0 && r.geometryStates <= 2 && r.lastOpacityAt <= 160 ? "GREEN" : "RED";
            res[name] = { ...r, errs: errs.slice(0, 3) };
            log("prm", name, r.verdict, "geoStates", r.geometryStates, JSON.stringify(r.geometryChangesAt), "lastOp", r.lastOpacityAt, JSON.stringify(r.animations));
        } finally { await ctx.close(); }
    }
    rec.cells.prm = res;
}

// (h): the accessibility tree and tab order through a fuse and a fission, collapsed and expanded
async function partA11y(browser) {
    const res = {};
    for (const w of [390, 1440]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: true, q: { shape: "onedock" } });
        try {
            const census = () => page.evaluate(() => [...document.querySelectorAll("[data-testid=cluster] button, [data-testid=cluster] [role]")].map((e) => [e.getAttribute("role") ?? e.tagName, e.getAttribute("aria-label") ?? e.textContent.trim(), e.tabIndex, !!e.closest("[inert]"), !!e.closest("[aria-hidden=true]"), e.disabled ?? false].join("|")));
            const walk = async () => { await page.focus("#sentinel-before"); const seq = []; for (let i = 0; i < 14; i++) { await page.keyboard.press("Tab"); const n = await page.evaluate(() => { const a = document.activeElement; return a?.closest("[data-testid=cluster]") ? (a.getAttribute("aria-label") ?? a.textContent.trim()) : a?.id || a?.tagName; }); seq.push(n); if (n === "sentinel-after") break; } return seq; };
            const snap = () => page.locator("[data-testid=cluster]").ariaSnapshot();
            const st = {};
            for (const [k, acts] of [["collapsed-fused", []], ["collapsed-split", [["set", false]]], ["expanded-split", [["expand"]]], ["expanded-fused", [["set", true]]]]) {
                for (const [fn, arg] of acts) await page.evaluate(([fn, arg]) => window.__ab[fn](arg), [fn, arg]);
                await page.waitForTimeout(700);
                st[k] = { census: await census(), aria: await snap() };
            }
            // focus held on a member control through a fuse and a fission (expanded)
            await page.evaluate(() => { const b = [...document.querySelectorAll("[data-testid=cluster] button")].find((x) => x.getAttribute("aria-label")?.includes("theme")); b.focus(); window.__ab.set(false); });
            const kept = [];
            for (let i = 0; i < 20; i++) { await page.waitForTimeout(25); kept.push(await page.evaluate(() => document.activeElement?.getAttribute("aria-label"))); }
            res[w] = { fuseCollapsedSame: JSON.stringify(st["collapsed-fused"]) === JSON.stringify(st["collapsed-split"]), fuseExpandedSame: JSON.stringify(st["expanded-split"]) === JSON.stringify(st["expanded-fused"]), states: st, focusKept: kept.every((k) => k === kept[0] && k), errs: errs.slice(0, 3) };
            log("a11y", w, "collapsed fuse=fission", res[w].fuseCollapsedSame, "expanded fuse=fission", res[w].fuseExpandedSame, "focus kept", res[w].focusKept);
        } finally { await ctx.close(); }
    }
    rec.cells.a11y = res;
}

// O-199 + I8-G1 on the one-dock shapes: the flat seam per join and the outer corner, at rest, per DSF
async function partRest(browser) {
    const res = [];
    for (const dsf of (args.dsfs ?? "2").split(",").map(Number)) for (const w of [390, 1440]) for (const theme of ["light", "dark"]) for (const [state, q] of [["collapsed", { shape: "onedock" }], ["expanded", { shape: "onedock", open: "1" }], ["swap-tool", { shape: "swap", __pre: "tool" }]]) {
        const { ctx, page, errs } = await open(browser, { w, dsf, theme, mode: "flat", fused: true, q: { ...q, ...(args.query ? Object.fromEntries(new URLSearchParams(args.query)) : {}) } });
        try {
            if (q.__pre) { await page.evaluate((l) => window.__ab.layer(l), q.__pre); await page.waitForTimeout(900); }
            if (args.css) await page.addStyleTag({ content: args.css });
            await page.waitForTimeout(150);
            const g = await geom(page);
            const img = await shot(page, dsf === 2 && w === 390 ? `rest-${state}-${w}-${theme}` : (dsf !== 2 && dsf !== 1 && dsf !== 3 ? `rest-dpr${dsf}-${state}-${w}-${theme}` : null), g, 28, dsf);
            const joins = seamCell(img, g);
            const corner = await page.evaluate(() => { const root = document.querySelector("[data-testid=cluster]"); const l = root.querySelector(".dock-cluster-lens"); const d = root.querySelector(":scope > .glass-dock").getBoundingClientRect(); const m = getComputedStyle(l).clipPath.match(/M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/); return { r: m ? +(+m[1] - (d.left - l.getBoundingClientRect().left)).toFixed(2) : null, halfH: +(d.height / 2).toFixed(2) }; });
            res.push({ dsf, w, theme, state, corner, joins: joins.map((j) => ({ x: j.x, line: j.maxLine, tone: j.maxTone, rows: Object.fromEntries(Object.entries(j).filter(([k]) => ["rimTop", "inTop", "mid", "inBot"].includes(k))) })), memberLeftFrac: g.members.map((m) => frac(m.l)), memberRightFrac: g.members.map((m) => frac(m.r)), errs: errs.slice(0, 3) });
            log("rest", dsf, w, theme, state, "corner", JSON.stringify(corner), "joins", joins.map((j) => `${j.maxLine}/${j.maxTone}`).join(" ; "));
        } finally { await ctx.close(); }
    }
    rec.cells.rest = res;
}

// isolation: freeze an episode at t, then paint the frame with one layer hidden at a time and read the row across join 0
const ISO = {
    none: "",
    rings: ".dock-cluster .dock-plate::before{display:none!important}",
    lenses: ".dock-cluster-lens,.dock-cluster-tone{visibility:hidden!important}",
    plate0: ".dock-cluster>.glass-dock:nth-child(1 of .glass-dock)>.dock-plate{visibility:hidden!important}",
    plate1: ".dock-cluster>.glass-dock:nth-last-child(1 of .glass-dock)>.dock-plate{visibility:hidden!important}",
    grain: ".dock-cluster .dock-plate::after{display:none!important}",
    shadow: ".dock-cluster-shadow{display:none!important}",
    // layer hypotheses (F5): a plate painted unclipped; members on their own layers; the root on one
    noclip: ".dock-cluster>.glass-dock>.dock-plate{clip-path:none!important}",
    memberLayers: ".dock-cluster>.glass-dock{will-change:transform}",
    rootLayer: ".dock-cluster{will-change:transform}",
    plateLayers: ".dock-cluster>.glass-dock>.dock-plate{will-change:transform}",
};
async function partIso(browser) {
    const res = {};
    const cells = JSON.parse(args.iso ?? '[{"name":"collapse117","q":{"shape":"onedock","open":"1"},"fused":false,"acts":[["set",true],["collapse"]],"t":117}]');
    for (const c of cells) for (const theme of (args.themes ?? "light").split(",")) for (const w of (args.ws ?? "1440").split(",").map(Number)) {
        const { ctx, page, errs } = await open(browser, { w, theme, dsf: +(args.dsf ?? 2), mode: "flat", fused: c.fused, q: c.q });
        try {
            if (c.pre) { for (const [fn, arg] of c.pre) await page.evaluate(([fn, arg]) => window.__ab[fn](arg), [fn, arg]); await page.waitForTimeout(900); }
            let f = null;
            if (c.acts?.length) { const fr = await trace(page, c.acts, c.t, null, []); f = fr.at(-1); await page.evaluate(() => window.__vc.freeze()); }
            else f = await page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
            const g = await geom(page);
            const cut = f.shares?.[1]?.[0] ?? (g.members[0].r + g.members[1].l) / 2;
            const out = {};
            for (const [v, css] of Object.entries(ISO).filter(([k]) => !args.variants || args.variants.split(",").includes(k))) {
                const h = css ? await page.addStyleTag({ content: css }) : null;
                await page.waitForTimeout(60);
                const img = await shot(page, `iso-${c.name}-${w}-${theme}-${v}`, g, 20, +(args.dsf ?? 2));
                const y = img.clip.y + img.clip.height / 2;
                const row = [];
                for (let x = cut - 4; x <= cut + 4 + 1e-6; x += 1 / img.dsf) row.push(Math.round(L(img, x, y)));
                out[v] = row.join(" ");
                if (h) await h.evaluate((n) => n.remove());
            }
            res[`${c.name}-${w}-${theme}`] = { cut, frame: { m: f.memberBox, s: f.shares, k: f.k, now: f.now }, rows: out, errs: errs.slice(0, 3) };
            log("iso", c.name, w, theme, "cut", cut, "\n" + Object.entries(out).map(([k, v]) => `   ${k.padEnd(7)} ${v}`).join("\n"));
        } finally { await ctx.close(); }
    }
    rec.cells.iso = res;
}

// ------------------------------------------------------------------ challenge-1 parts (pass 2, round 1)
const readNow = (page) => page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
// virtual clock with acts at frame indices: seq = [[frame, [[fn,arg],...]], ...]
async function traceSeq(page, seq, ms) {
    await page.evaluate(() => window.__vc.freeze());
    const frames = [];
    const n = Math.round(ms / FRAME);
    for (let i = 0; i < n; i++) {
        const acts = seq.filter(([k]) => k === i).flatMap(([, a]) => a);
        if (acts.length) {
            await page.evaluate((acts) => { for (const [fn, arg] of acts) window.__ab[fn](arg); }, acts);
            await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
            await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
        }
        const f = await page.evaluate(async ([F, read]) => {
            window.__vc.step(F);
            await new Promise((r) => setTimeout(r, 0));
            await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); });
            return (0, eval)(`(${read})`)();
        }, [FRAME, FRAME_READ.toString()]);
        f.t = +((i + 1) * FRAME).toFixed(1);
        f.i = i;
        frames.push(f);
    }
    await page.evaluate(() => window.__vc.thaw());
    return frames;
}
const glassOf = (f) => (f.shares.length === f.memberBox.length && f.shares.every(Boolean) ? f.shares : f.plateBox);

// I · interrupted swaps and the reversal control (r2: shares only, members tracked by label, png around the interrupt)
async function partInterrupt(browser) {
    const res = {};
    const W = +(args.w ?? 1440);
    const cells = [
        ["swap-in-then-out@83", { shape: "swap" }, null, [[0, [["layer", "tool"]]], [10, [["layer", "tools"]]]]],
        ["swap-in-then-out@42", { shape: "swap" }, null, [[0, [["layer", "tool"]]], [5, [["layer", "tools"]]]]],
        ["swap-out-then-in@42", { shape: "swap" }, "tool", [[0, [["layer", "tools"]]], [5, [["layer", "tool"]]]]],
        ["swap-in-then-out@83 toolrun=0 (no membership change)", { shape: "swap", toolrun: "0" }, null, [[0, [["layer", "tool"]]], [10, [["layer", "tools"]]]]],
    ];
    for (const [name, q, pre, seq] of cells) {
        const { ctx, page, errs } = await open(browser, { w: W, theme: "light", mode: "design", fused: true, q });
        try {
            if (pre) { await page.evaluate((l) => window.__ab.layer(l), pre); await page.waitForTimeout(1200); }
            const k = seq.at(-1)[0];
            const LBL = () => [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")].map((d) => d.getAttribute("aria-label"));
            const read = async () => { const f = await readNow(page); f.labels = await page.evaluate(LBL); return f; };
            const f0 = await read();
            await page.evaluate(() => window.__vc.freeze());
            const frames = [f0];
            for (let i = 0; i < 90; i++) {
                const acts = seq.filter(([j]) => j === i).flatMap(([, a]) => a);
                // --order (resume attribution): unset = the fold's read (two macrotask waits, so the cluster's ResizeObserver lands
                // before or after tick k by real-clock luck); pre = a rendering update delivers it before the tick; post = the
                // browser's own order: the act, its microtasks (MutationObserver), then the tick, then layout and ResizeObserver
                if (acts.length && args.order === "post") { await page.evaluate(async ([acts, F]) => { for (const [fn, arg] of acts) window.__ab[fn](arg); await Promise.resolve(); await Promise.resolve(); window.__vc.step(F); await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); }); }, [acts, FRAME]); const f = await read(); f.i = i; f.t = +((i + 1) * FRAME).toFixed(1); frames.push(f); continue; }
                if (acts.length) { await page.evaluate((acts) => { for (const [fn, arg] of acts) window.__ab[fn](arg); }, acts); await page.evaluate(() => new Promise((r) => setTimeout(r, 0))); await page.evaluate(() => new Promise((r) => setTimeout(r, 0))); }
                if (acts.length && args.order === "pre") await page.evaluate(() => new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); }));
                await page.evaluate(async (F) => { window.__vc.step(F); await new Promise((r) => setTimeout(r, 0)); await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); }); }, FRAME);
                const f = await read(); f.i = i; f.t = +((i + 1) * FRAME).toFixed(1);
                if (i >= k - 1 && i <= k + 1) { const g = await geom(page); for (const sh of f.shares ?? []) if (sh) g.members.push({ l: sh[0], r: sh[1], t: g.members[0].t, b: g.members[0].b }); await shot(page, `interrupt-${name.split(" ")[0]}-${W}-f${i}`, g, 20); }
                frames.push(f);
            }
            await page.evaluate(() => window.__vc.thaw());
            // the glass of a member, by label, from the lens shares only (a frame whose lens count lags its member count is flagged, not read)
            const glassBy = (f, lbl) => { const i = f.labels.indexOf(lbl); if (i < 0) return null; if (f.shares.length !== f.memberBox.length || !f.shares[i]) return "mismatch"; return f.shares[i]; };
            const out = {};
            for (const [tn, lbl, side] of [["dockR", f0.labels[0], 1], ["themeL", "Theme", 0], ["themeR", "Theme", 1], ["silL", "__sil", 0], ["silR", "__sil", 1], ["dockCtlL", "ctl:" + f0.labels[0], 0], ["dockCtlR", "ctl:" + f0.labels[0], 1], ["themeCtlL", "ctl:Theme", 0]]) {
                const xs = frames.map((f) => { if (lbl === "__sil") return f.sil ? f.sil[side] : null; if (lbl.startsWith("ctl:")) { const c = f.ctl?.[lbl.slice(4)]; return c ? c[side] : null; } const g = glassBy(f, lbl); return g === "mismatch" || !g ? null : g[side]; });
                const d = xs.slice(1).map((x, i) => (x == null || xs[i] == null ? null : +(x - xs[i]).toFixed(2)));
                const valid = xs.filter((x) => x != null);
                const travel = +(Math.max(...valid) - Math.min(...valid)).toFixed(2);
                let maxStep = 0, maxAt = -1; d.forEach((v, i) => { if (v != null && Math.abs(v) > maxStep) { maxStep = Math.abs(v); maxAt = i; } });
                out[tn] = { travel, maxStep: +maxStep.toFixed(2), maxStepFrame: maxAt, maxStepPctOfTravel: +(100 * maxStep / travel).toFixed(1), around: d.slice(Math.max(0, k - 2), k + 4), mismatchFrames: frames.map((f, i) => (glassBy(f, lbl) === "mismatch" ? i - 1 : null)).filter((v) => v != null) };
            }
            const key = `${name}-${W}`;
            res[key] = { interruptFrame: k, tracks: out, shareOverlapMax: Math.max(...frames.map((f) => f.shareOverlap)), memberCounts: [...new Set(frames.map((f) => f.memberBox.length))], pct: frames.reduce((a, f) => a + f.pct, 0), ell: frames.reduce((a, f) => a + f.ell, 0), frames: frames.map((f) => ({ dbg: f.dbg, m: f.m, i: f.i ?? -1, labels: f.labels, shares: f.shares, sil: f.sil, ctl: f.ctl, memberBox: f.memberBox, now: f.now, out: f.outMax, outOp: f.outOpMax })), outsideMaxPx: Math.max(...frames.map((f) => f.outMax)), outsideOpMax: Math.max(...frames.map((f) => f.outOpMax)), outsideVisMaxPx: Math.max(...frames.map((f) => f.outVisMax ?? 0)), clipPct: frames.reduce((a, f) => a + f.clipPct, 0), errs: errs.slice(0, 4) };
            log("interrupt", name, W, Object.entries(out).map(([t, v]) => `${t}: travel ${v.travel} maxStep ${v.maxStep} (${v.maxStepPctOfTravel}%)@f${v.maxStepFrame} around[k-2..k+3] ${JSON.stringify(v.around)} mismatch ${JSON.stringify(v.mismatchFrames)}`).join(" | "), "overlap", res[key].shareOverlapMax, "pct/ell", res[key].pct, res[key].ell, "errs", errs.length);
        } finally { await ctx.close(); }
    }
    rec.cells.interrupt = res;
}

// T · the §5 trigger, fused = !dock.expanded, driven by a real pointer and a real Tab (real clock)
async function partTrigger(browser) {
    const res = {};
    for (const w of (args.ws ?? "1440,390").split(",").map(Number)) {
        // pointer: reach for the dock, then for the theme, and rest on it
        {
          for (const [lab, extra] of [["after", {}], ["after-sitedock", { sitedock: "1" }], ["before", { nocluster: "1" }]]) {
            const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: true, q: { shape: "onedock", bind: "1", ...extra } });
            try {
                const rects = () => page.evaluate(() => { const ds = [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")]; const r = (e) => { const b = e.getBoundingClientRect(); return [+b.left.toFixed(1), +b.right.toFixed(1), +b.top.toFixed(1), +b.bottom.toFixed(1)]; }; const tbtn = [...document.querySelectorAll("[data-testid=cluster] button")].find((b) => /theme/i.test(b.getAttribute("aria-label") ?? "")); const tb = tbtn.getBoundingClientRect(); return { dock: r(ds[0]), theme: [+tb.left.toFixed(1), +tb.right.toFixed(1), +tb.top.toFixed(1), +tb.bottom.toFixed(1)], themeBtn: [tb.left + tb.width / 2, tb.top + tb.height / 2], expanded: window.__ab.expanded(), fused: window.__ab.fused() }; });
                const hit = (x, y) => page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); const b = e?.closest("button"); return b ? (b.getAttribute("aria-label") ?? b.textContent.trim()) : e?.className?.toString().split(" ")[0] ?? null; }, [x, y]);
                const r0 = await rects();
                const dc = [(r0.dock[0] + r0.dock[1]) / 2, (r0.dock[2] + r0.dock[3]) / 2];
                await page.mouse.move(dc[0], dc[1], { steps: 6 });
                await page.waitForTimeout(1300);
                const r1 = await rects();
                const p = r1.themeBtn;
                await page.mouse.move(p[0], p[1], { steps: 10 });
                await page.waitForTimeout(400);
                const r2 = await rects();
                const h2 = await hit(p[0], p[1]);
                const samples = [];
                for (let i = 0; i < 12; i++) { await page.waitForTimeout(400); const r = await rects(); samples.push({ t: 400 * (i + 1), themeL: r.theme[0], expanded: r.expanded, under: await hit(p[0], p[1]) }); }
                const r3 = await rects();
                res[`pointer-${lab}-${w}`] = { atRest: r0, reached: r1, onTheme: { ...r2, under: h2 }, after: { ...r3, under: await hit(p[0], p[1]) }, themeSlidUnderPointer: +(r3.theme[0] - r2.theme[0]).toFixed(1), samples, errs: errs.slice(0, 4) };
                log("trigger pointer", lab, w, "theme at rest", JSON.stringify(r0.theme), "reached", JSON.stringify(r1.theme), "expanded", r1.expanded, "| pointer on theme: under", h2, "| after", JSON.stringify(samples.map((s) => [s.t, s.themeL, s.expanded, s.under])));
            } finally { await ctx.close(); }
          }
        }
        // keyboard: Tab from the sentinel through the cluster
        {
            const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: true, q: { shape: "onedock", bind: "1" } });
            try {
                const st = () => page.evaluate(() => { const ds = [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")]; const a = document.activeElement; return { active: a?.closest("[data-testid=cluster]") ? (a.getAttribute("aria-label") ?? a.textContent.trim()) : a?.id || a?.tagName, themeL: +ds.at(-1).getBoundingClientRect().left.toFixed(1), expanded: window.__ab.expanded() }; });
                await page.focus("#sentinel-before");
                const seq = [await st()];
                for (let i = 0; i < 10; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(900); const s = await st(); seq.push(s); if (/theme/i.test(s.active ?? "") || s.active === "sentinel-after") break; }
                const after = [];
                for (let i = 0; i < 10; i++) { await page.waitForTimeout(500); after.push(await st()); }
                res[`keyboard-${w}`] = { seq, after, errs: errs.slice(0, 4) };
                // focus hold: the dock expanded by focus on its own control, then Tab to the theme, then rest
                await page.evaluate(() => window.__ab.expand());
                await page.waitForTimeout(900);
                await page.evaluate(() => [...document.querySelectorAll("[data-testid=cluster] button")].find((b) => b.getAttribute("aria-label") === "Name")?.focus());
                await page.waitForTimeout(300);
                const fseq = [await st()];
                for (let i = 0; i < 8; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(150); const s = await st(); fseq.push(s); if (/theme/i.test(s.active ?? "")) break; }
                const fafter = [];
                for (let i = 0; i < 12; i++) { await page.waitForTimeout(400); fafter.push(await st()); }
                res[`focus-${w}`] = { seq: fseq, after: fafter };
                log("trigger focus", w, "walk", JSON.stringify(fseq.map((s) => [s.active, s.themeL, s.expanded])), "| rest on theme", JSON.stringify(fafter.map((s) => [s.active, s.themeL, s.expanded])));
                log("trigger keyboard", w, "Tab walk", JSON.stringify(seq.map((s) => [s.active, s.themeL, s.expanded])), "| then", JSON.stringify(after.map((s) => [s.active, s.themeL, s.expanded])));
            } finally { await ctx.close(); }
        }
    }
    rec.cells.trigger = res;
}

// G8 over a glide: a backdrop-filtered element under an ancestor clip-path / opacity < 1 / filter, each frame
const G8_READ = () => {
    const root = document.querySelector("[data-testid=cluster]");
    const hits = [];
    let n = 0;
    for (const e of root.querySelectorAll("*")) {
        const cs = getComputedStyle(e);
        const bf = cs.backdropFilter ?? cs.webkitBackdropFilter;
        if (!bf || bf === "none") continue;
        n++;
        for (let a = e.parentElement; a; a = a.parentElement) {
            const ac = getComputedStyle(a);
            const why = ac.clipPath !== "none" ? `clip-path ${ac.clipPath.slice(0, 50)}` : +ac.opacity < 1 ? `opacity ${(+ac.opacity).toFixed(3)}` : ac.filter !== "none" ? `filter ${ac.filter}` : "";
            if (why) { hits.push(`${(e.className?.baseVal ?? e.className).toString().split(" ").slice(0, 2).join(".")} <- ${(a.className?.baseVal ?? a.className).toString().split(" ")[0]}: ${why}`); break; }
        }
    }
    return { n, hits };
};
async function partG8Glide(browser) {
    const res = {};
    const cells = [
        ["onedock page change (pages->page)", { shape: "onedock", open: "1" }, [["layer", "page"]]],
        ["onedock reader page change (pages->page)", { shape: "onedock", open: "1", reader: "1" }, [["layer", "page"]]],
        ["swap in", { shape: "swap" }, [["layer", "tool"]]],
    ];
    for (const [name, q, acts] of cells) for (const [label, extra] of [["p2", {}], ["v1100", { nocluster: "1" }]]) {
        const { ctx, page, errs } = await open(browser, { w: 1440, mode: "design", fused: false, q: { ...q, ...extra } });
        try {
            await page.waitForTimeout(600);
            const rest = await page.evaluate((r) => (0, eval)(`(${r})`)(), G8_READ.toString());
            await page.evaluate(() => window.__vc.freeze());
            await page.evaluate((acts) => { for (const [fn, arg] of acts) window.__ab[fn](arg); }, acts);
            await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
            const per = [];
            for (let i = 0; i < 60; i++) {
                const g = await page.evaluate(async ([F, read]) => { window.__vc.step(F); await new Promise((r) => setTimeout(r, 0)); await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); }); return (0, eval)(`(${read})`)(); }, [FRAME, G8_READ.toString()]);
                per.push({ t: +((i + 1) * FRAME).toFixed(1), n: g.n, hits: g.hits.length, who: g.hits.slice(0, 3) });
            }
            await page.evaluate(() => window.__vc.thaw());
            const frames = per.filter((p) => p.hits > 0);
            res[`${name}-${label}`] = { rest, framesWithHit: frames.length, of: per.length, first: frames[0] ?? null, maxHits: Math.max(...per.map((p) => p.hits)), bfElements: Math.max(...per.map((p) => p.n)), errs: errs.slice(0, 3) };
            log("g8glide", name, label, "rest hits", rest.hits.length, JSON.stringify(rest.hits.slice(0, 2)), "| frames with a hit", frames.length, "/", per.length, "max", res[`${name}-${label}`].maxHits, "bf elements", res[`${name}-${label}`].bfElements, "first", JSON.stringify(frames[0]?.who ?? []));
        } finally { await ctx.close(); }
    }
    rec.cells.g8glide = res;
}

// R · restraint counts inside the cluster subtree, at rest
const RESTRAINT_READ = () => {
    const root = document.querySelector("[data-testid=cluster]");
    const layers = (s) => (s === "none" ? 0 : s.split(/,(?![^(]*\))/).length);
    const multiShadow = [], bfs = new Map(), grads = [];
    for (const e of [root, ...root.querySelectorAll("*")]) {
        const cs = getComputedStyle(e);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const r = e.getBoundingClientRect(); if (r.width < 1) continue;
        const n = layers(cs.boxShadow);
        const name = (e.className?.baseVal ?? e.className).toString().split(" ").slice(0, 2).join(".") || e.tagName;
        if (n > 1) multiShadow.push(`${name} ×${n}`);
        const bf = cs.backdropFilter ?? cs.webkitBackdropFilter;
        if (bf && bf !== "none" && !/inset\(50%\)/.test(cs.clipPath)) bfs.set(bf, [...(bfs.get(bf) ?? []), name]);
        for (const pe of [null, "::before", "::after"]) { const c = getComputedStyle(e, pe); if (/gradient/.test(c.backgroundImage) && c.display !== "none" && c.content !== "none") grads.push(`${name}${pe ?? ""}: ${c.backgroundImage.slice(0, 60)}`); }
    }
    return { multiShadow, backdropFilters: Object.fromEntries([...bfs].map(([k, v]) => [k, v.length + " × " + [...new Set(v)].join(", ")])), gradients: grads.slice(0, 8), gradientCount: grads.length };
};
async function partRestraint(browser) {
    const res = {};
    for (const [name, q, acts] of [["onedock expanded, pages face (open page active)", { shape: "onedock", open: "1" }, []], ["onedock expanded, reader face", { shape: "onedock", open: "1", reader: "1" }, [["layer", "page"]]]]) for (const theme of ["light", "dark"]) {
        const { ctx, page, errs } = await open(browser, { w: 1440, theme, mode: "design", fused: true, q });
        try {
            for (const [fn, arg] of acts) await page.evaluate(([fn, arg]) => window.__ab[fn](arg), [fn, arg]);
            await page.waitForTimeout(1200);
            const r = await page.evaluate((x) => (0, eval)(`(${x})`)(), RESTRAINT_READ.toString());
            res[`${name}-${theme}`] = { ...r, errs: errs.slice(0, 3) };
            log("restraint", name, theme, JSON.stringify(r));
        } finally { await ctx.close(); }
    }
    rec.cells.restraint = res;
}

// S · daraksha's real placement: .site-dock on the cluster root (the §5 "after"), against the "before"
async function partSiteDock(browser) {
    const res = {};
    for (const w of [1440, 390]) for (const [label, q] of [["after (cluster root .site-dock)", { shape: "onedock", sitedock: "1" }], ["before (div.site-dock, theme in #persistent)", { shape: "onedock", sitedock: "1", nocluster: "1" }]]) for (const open1 of [false, true]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: !open1, q: { ...q, ...(open1 ? { open: "1" } : {}) } });
        try {
            await page.waitForTimeout(900);
            const r = await page.evaluate(() => {
                const root = document.querySelector("[data-testid=cluster]");
                const cs = getComputedStyle(root);
                const rr = root.getBoundingClientRect();
                const ds = [...root.querySelectorAll(":scope > .glass-dock")].map((d) => d.getBoundingClientRect());
                const l = Math.min(...ds.map((d) => d.left)), rgt = Math.max(...ds.map((d) => d.right));
                return { gutter: getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim(), rootStyleLeft: root.style.left, computedLeft: cs.left, computedRight: cs.right, position: cs.position, root: [+rr.left.toFixed(2), +rr.right.toFixed(2), +rr.width.toFixed(2)], row: [+l.toFixed(2), +rgt.toFixed(2)], rowCentreMinusViewportCentre: +((l + rgt) / 2 - innerWidth / 2).toFixed(2), vw: innerWidth, docW: document.scrollingElement.scrollWidth };
            });
            res[`${label}-${w}-${open1 ? "expanded" : "collapsed"}`] = { ...r, errs: errs.slice(0, 3) };
            log("sitedock", label, w, open1 ? "expanded" : "collapsed", JSON.stringify(r), "errs", errs.length, JSON.stringify(errs.slice(0, 2)));
        } finally { await ctx.close(); }
    }
    rec.cells.sitedock = res;
}

// D · daraksha's real reader row, expanded, at real widths: does the after fit where the before fit?
async function partReader(browser) {
    const res = {};
    for (const w of [360, 390, 612, 640, 656, 660, 664, 700, 1440]) for (const [label, extra] of [["after", {}], ["after-41.25rem", { narrowAt: "41.25" }], ["before", { nocluster: "1" }]]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: false, q: { shape: "onedock", open: "1", reader: "1", ...extra } });
        try {
            await page.evaluate(() => window.__ab.layer("page"));
            await page.waitForTimeout(1300);
            const r = await page.evaluate(() => {
                const root = document.querySelector("[data-testid=cluster]");
                const stage = root.parentElement.getBoundingClientRect();
                const ds = [...root.querySelectorAll(":scope > .glass-dock")].map((d) => d.getBoundingClientRect());
                const l = Math.min(...ds.map((d) => d.left)), rgt = Math.max(...ds.map((d) => d.right));
                const offscreen = [...root.querySelectorAll("button")].filter((b) => { const x = b.getBoundingClientRect(); return x.width > 0 && !b.closest("[inert]") && getComputedStyle(b).visibility !== "hidden" && (x.left < 0 || x.right > innerWidth); }).map((b) => b.getAttribute("aria-label") ?? b.textContent.trim());
                return { row: [+l.toFixed(1), +rgt.toFixed(1), +(rgt - l).toFixed(1)], container: [+stage.left.toFixed(1), +stage.right.toFixed(1), +stage.width.toFixed(1)], overflowAttr: root.hasAttribute("data-overflow"), docW: document.scrollingElement.scrollWidth, vw: innerWidth, offscreen };
            });
            res[`${label}-${w}`] = { ...r, errs: errs.slice(0, 3) };
            log("reader", label, w, JSON.stringify(r), "errs", JSON.stringify(errs.slice(0, 2)));
        } finally { await ctx.close(); }
    }
    rec.cells.reader = res;
}

// M · the seam mid-motion at fractional ratios: freeze an episode at t, read the line across each contacted cut
// fold-1 resume: the painted silhouette's y extent at x = X, from the tone's own path() (M/L/C/Z, absolute)
function neckAt(d, X) {
    const tok = d.match(/[MLCZ]|-?\d+(?:\.\d+)?/g) ?? [];
    let i = 0, cx = 0, cy = 0, sx = 0, sy = 0; const ys = [];
    const seg = (pts) => { // pts: [[x,y],...] control polygon from the current point
        const n = 64, P = [[cx, cy], ...pts];
        const at = (t) => { if (P.length === 2) return [P[0][0] + (P[1][0] - P[0][0]) * t, P[0][1] + (P[1][1] - P[0][1]) * t];
            const u = 1 - t; return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
        let a = at(0);
        for (let k = 1; k <= n; k++) { const b = at(k / n);
            if (Math.abs(a[0] - X) < 0.05) ys.push(a[1]);
            if ((a[0] - X) * (b[0] - X) < 0) ys.push(a[1] + (b[1] - a[1]) * (X - a[0]) / (b[0] - a[0]));
            a = b; }
        if (Math.abs(a[0] - X) < 0.05) ys.push(a[1]);
        [cx, cy] = P.at(-1);
    };
    while (i < tok.length) { const c = tok[i++]; const num = () => +tok[i++];
        if (c === "M") { cx = sx = num(); cy = sy = num(); }
        else if (c === "L") seg([[num(), num()]]);
        else if (c === "C") seg([[num(), num()], [num(), num()], [num(), num()]]);
        else if (c === "Z") seg([[sx, sy]]); }
    return ys.length ? { top: Math.min(...ys), bot: Math.max(...ys) } : null;
}
async function partMotionSeam(browser) {
    const res = [];
    const eps = [["collapse", { shape: "onedock", open: "1" }, false, [["set", true], ["collapse"]]], ["fuse", { shape: "onedock", open: "1" }, false, [["set", true]]], ["swap-in", { shape: "swap" }, true, [["layer", "tool"]]]];
    for (const dsf of (args.dsfs ?? "1.25,2.2,2.625").split(",").map(Number)) for (const theme of ["light", "dark"]) for (const [name, q, fused, acts] of eps) for (const t of [100, 200, 400]) {
        const { ctx, page, errs } = await open(browser, { w: 1440, dsf, theme, mode: "flat", fused, q });
        try {
            const fr = await trace(page, acts, t, null, []);
            await page.evaluate(() => window.__vc.freeze());
            const f = fr.at(-1);
            const g = await geom(page);
            for (const s of f.shares ?? []) if (s) g.members.push({ l: s[0], r: s[1], t: g.members[0].t, b: g.members[0].b });
            const img = await shot(page, null, g, 24, dsf);
            const top = Math.min(...g.members.map((m) => m.t)), bot = Math.max(...g.members.map((m) => m.b));
            const rows = { inTop: top + 8, mid: (top + bot) / 2, inBot: bot - 8 };
            // the rows inside the painted glass at the cut: the neck's own top + 8, middle, bottom − 8 (a row
            // through the neck's rim reads the rim, not a seam); the member rows are kept beside them
            const tone = await page.evaluate(() => { const e = document.querySelector("[data-testid=cluster] .dock-cluster-tone") ?? document.querySelector(".dock-cluster-tone"); const r = e.getBoundingClientRect(); const m = /path\("([^"]*)"\)/.exec(e.style.clipPath); return { d: m ? m[1] : "", left: r.left, top: r.top }; });
            const cuts = [];
            for (let i = 0; i < (f.shares?.length ?? 0) - 1; i++) {
                const a = f.shares[i], b = f.shares[i + 1];
                if (!a || !b || b[0] - a[1] > 0.6) continue; // not in contact
                const jx = (a[1] + b[0]) / 2;
                let memberLine = 0, memberTone = 0;
                for (const y of Object.values(rows)) { const s = seamAt(img, y, jx); memberLine = Math.max(memberLine, s.line); memberTone = Math.max(memberTone, s.tone); }
                const nk = neckAt(tone.d, jx - tone.left);
                const neck = nk ? { top: nk.top + tone.top, bot: nk.bot + tone.top } : null;
                const nrows = neck ? (neck.bot - neck.top >= 20 ? [neck.top + 8, (neck.top + neck.bot) / 2, neck.bot - 8] : [(neck.top + neck.bot) / 2]) : Object.values(rows);
                let line = 0, tone2 = 0;
                for (const y of nrows) { const s = seamAt(img, y, jx); line = Math.max(line, s.line); tone2 = Math.max(tone2, s.tone); }
                cuts.push({ i, x: +jx.toFixed(2), line, tone: tone2, neck: neck ? [+(neck.top - top).toFixed(2), +(neck.bot - top).toFixed(2)] : null, memberLine, memberTone, now: f.now });
                // --plant seam (the bite): a 1 px rim-coloured line down the neck at the cut, read by the same rows
                if (args.plant === "seam" && neck) {
                    await page.evaluate(([x, t, h]) => { const e = document.createElement("div"); e.className = "plant-seam"; const c = getComputedStyle(document.querySelector(".dock-cluster")).getPropertyValue("--glass-border-dock").trim() || "rgba(0,0,0,.12)"; Object.assign(e.style, { position: "fixed", left: `${x - 0.5}px`, top: `${t}px`, width: "1px", height: `${h}px`, background: c, zIndex: 9999, pointerEvents: "none" }); document.body.append(e); }, [jx, neck.top, neck.bot - neck.top]);
                    const img2 = await shot(page, null, g, 24, dsf);
                    await page.evaluate(() => document.querySelectorAll(".plant-seam").forEach((e) => e.remove()));
                    let pl = 0; for (const y of nrows) pl = Math.max(pl, seamAt(img2, y, jx).line);
                    cuts.at(-1).plantLine = pl;
                }
            }
            res.push({ dsf, theme, name, t, cuts, errs: errs.slice(0, 2) });
            log("mseam", dsf, theme, name, t, JSON.stringify(cuts));
            if (cuts.some((c) => c.line > 1.5)) fs.writeFileSync(path.join(out, "png", `${engine}-${tag}-mseam-${name}-dpr${dsf}-${theme}-t${t}.png`), PNG.sync.write(img.png));
        } finally { await ctx.close(); }
    }
    rec.cells.mseam = res;
}

// ── challenge-2 parts ───────────────────────────────────────────────────────────────────────
// H · the hold after a click: reach the dock with the pointer, click a control, take the pointer off the cluster, rest 8 s
async function partClickHold(browser) {
    const res = {};
    for (const w of (args.ws ?? "1440,390").split(",").map(Number)) for (const [lab, extra] of [["after", {}], ["after-sitedock", { sitedock: "1" }], ["before", { nocluster: "1" }]]) for (const target of ["theme", "Colour"]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "design", fused: true, q: { shape: "onedock", bind: "1", ...extra } });
        try {
            const st = () => page.evaluate((target) => {
                const root = document.querySelector("[data-testid=cluster]");
                const btn = [...root.querySelectorAll("button")].find((b) => (target === "theme" ? /theme/i.test(b.getAttribute("aria-label") ?? "") : b.getAttribute("aria-label") === target));
                const r = btn?.getBoundingClientRect();
                const a = document.activeElement;
                return { btn: r ? [r.left + r.width / 2, r.top + r.height / 2] : null, btnL: r ? +r.left.toFixed(1) : null, expanded: window.__ab.expanded(), fused: window.__ab.fused(), active: a && a !== document.body ? (a.getAttribute("aria-label") ?? a.id ?? a.tagName) : "body" };
            }, target);
            const d0 = await page.evaluate(() => { const r = document.querySelector("[data-testid=cluster] > .glass-dock").getBoundingClientRect(); return [(r.left + r.right) / 2, (r.top + r.bottom) / 2]; });
            await page.mouse.move(d0[0], d0[1], { steps: 6 });
            await page.waitForTimeout(1300);
            const s1 = await st();
            await page.mouse.move(s1.btn[0], s1.btn[1], { steps: 8 });
            await page.waitForTimeout(300);
            await page.mouse.click(s1.btn[0], s1.btn[1]);
            await page.waitForTimeout(200);
            const s2 = await st();
            // off the cluster, onto the bare page above it
            await page.mouse.move(w / 2, 30, { steps: 8 });
            const samples = [];
            for (let i = 0; i < 16; i++) { await page.waitForTimeout(500); const s = await st(); samples.push([500 * (i + 1), s.expanded, s.active]); }
            const collapsedAt = samples.find((s) => !s[1])?.[0] ?? null;
            const key = `${lab}-${target}-${w}`;
            res[key] = { reached: s1, clicked: s2, samples, collapsedAtMs: collapsedAt, errs: errs.slice(0, 4) };
            log("clickhold", key, "expanded after reach", s1.expanded, "| active after click", s2.active, "| collapsed at", collapsedAt, "ms after leaving |", JSON.stringify(samples.filter((_, i) => i % 2 === 1)));
        } finally { await ctx.close(); }
    }
    rec.cells.clickhold = res;
}

// R8 · two collapsible members: W-I.8 R-8 says the cluster throws on mount, naming both
async function partTwoCol(browser) {
    const res = {};
    for (const w of [1440]) {
        const { ctx, page, errs } = await open(browser, { w, mode: "flat", fused: true, q: { shape: "onedock", twocol: "1" } });
        try {
            const read = () => page.evaluate(() => { const root = document.querySelector("[data-testid=cluster]"); const ds = [...root.querySelectorAll(":scope > .glass-dock")]; return { members: ds.map((d) => ({ label: d.getAttribute("aria-label"), collapsible: d.querySelector(".dock-layer--summary, [data-dock-face=summary]") ? true : null, morphing: d.hasAttribute("data-morphing"), w: +d.getBoundingClientRect().width.toFixed(1) })), lenses: [...root.querySelectorAll(":scope > .dock-cluster-lens")].filter((l) => getComputedStyle(l).clipPath !== 'path("M0 0")').length, painters: ds.filter((d) => getComputedStyle(d.querySelector(":scope > .dock-plate")).visibility !== "hidden").length, appErrors: window.__errors ?? 0 }; });
            const r0 = await read();
            const f0 = await readNow(page);
            // both members morph at once: the dock expands and the theme member expands
            const fr = await trace(page, [["expand"], ["expand2"]], 300, "twocol-both-expand", [83]);
            const mid = fr[9];
            const r1 = await read();
            res[`${w}`] = { mount: r0, afterBothExpand: r1, mid: { morphing: mid.morphing, shares: mid.shares, memberBox: mid.memberBox, k: mid.k }, f0: { shares: f0.shares, memberBox: f0.memberBox }, errs: errs.slice(0, 6) };
            log("twocol", w, "mount", JSON.stringify(r0), "| errs", JSON.stringify(errs.slice(0, 4)), "| both expanding at 83 ms: morphing", JSON.stringify(mid.morphing), "k", JSON.stringify(mid.k), "shares", JSON.stringify(mid.shares), "members", JSON.stringify(mid.memberBox), "| after", JSON.stringify(r1));
        } finally { await ctx.close(); }
    }
    rec.cells.twocol = res;
}

// I2 · interrupts the fold did not run: the one dock's expand interrupted by a collapse (Escape) and back; a page change
// interrupted by a collapse; a swap reversed twice. Same read as partInterrupt (shares by label), stored as cells.interrupt
async function partInterrupt2(browser) {
    const res = {};
    const W = +(args.w ?? 1440);
    const cells = [
        ["onedock-expand-then-collapse@42", { shape: "onedock", bind: "1" }, null, [[0, [["expand"]]], [5, [["collapse"]]]]],
        ["v1100-expand-then-collapse@42", { shape: "onedock", nocluster: "1" }, null, [[0, [["expand"]]], [5, [["collapse"]]]]],
        ["v1100-collapse-then-expand@83", { shape: "onedock", nocluster: "1", open: "1" }, null, [[0, [["collapse"]]], [10, [["expand"]]]]],
        ["v1100-expand-then-pagechange@83", { shape: "onedock", nocluster: "1" }, null, [[0, [["expand"]]], [10, [["layer", "page"]]]]],
        ["v1100-pagechange-then-collapse@42", { shape: "onedock", nocluster: "1", open: "1" }, null, [[0, [["layer", "page"]]], [5, [["collapse"]]]]],
        ["onedock-expand-then-collapse@83", { shape: "onedock", bind: "1" }, null, [[0, [["expand"]]], [10, [["collapse"]]]]],
        ["onedock-collapse-then-expand@83", { shape: "onedock", bind: "1", open: "1" }, null, [[0, [["collapse"]]], [10, [["expand"]]]]],
        ["onedock-pagechange-then-collapse@42", { shape: "onedock", bind: "1", open: "1" }, null, [[0, [["layer", "page"]]], [5, [["collapse"]]]]],
        ["onedock-expand-then-pagechange@83", { shape: "onedock", bind: "1" }, null, [[0, [["expand"]]], [10, [["layer", "page"]]]]],
        ["swap-in-out-in@42,84", { shape: "swap" }, null, [[0, [["layer", "tool"]]], [5, [["layer", "tools"]]], [10, [["layer", "tool"]]]]],
        ["swap-in", { shape: "swap" }, null, [[0, [["layer", "tool"]]]]],
        ["swap-out", { shape: "swap" }, "tool", [[0, [["layer", "tools"]]]]],
        ["swap-vcol-in", { shape: "swap", vcol: "1" }, null, [[0, [["layer", "tool"]]]]],
        ["swap-vcol-out", { shape: "swap", vcol: "1" }, "tool", [[0, [["layer", "tools"]]]]],
        ["swap-vcol-in-then-out@42", { shape: "swap", vcol: "1" }, null, [[0, [["layer", "tool"]]], [5, [["layer", "tools"]]]]],
    ].filter(([n]) => (!args.only || n.includes(args.only)) && (args.vcol === "1" ? true : !n.includes("vcol") && !/^swap-(in|out)$/.test(n)));
    for (const [name, q, pre, seq] of cells) {
        const { ctx, page, errs } = await open(browser, { w: W, theme: "light", mode: "design", fused: !q.open, q });
        try {
            if (pre) { await page.evaluate((l) => window.__ab.layer(l), pre); await page.waitForTimeout(1200); }
            if (q.open) await page.waitForTimeout(1200);
            const k = seq.at(-1)[0];
            const LBL = () => [...document.querySelectorAll("[data-testid=cluster] > .glass-dock")].map((d) => d.getAttribute("aria-label"));
            const read = async () => { const f = await readNow(page); f.labels = await page.evaluate(LBL); return f; };
            const f0 = await read();
            await page.evaluate(() => window.__vc.freeze());
            const frames = [f0];
            for (let i = 0; i < 110; i++) {
                const acts = seq.filter(([j]) => j === i).flatMap(([, a]) => a);
                // the browser's own order ("post", the binding read of PF1 §R)
                if (acts.length) { await page.evaluate(async ([acts, F]) => { for (const [fn, arg] of acts) window.__ab[fn](arg); await Promise.resolve(); await Promise.resolve(); window.__vc.step(F); await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); }); }, [acts, FRAME]); }
                else await page.evaluate(async (F) => { window.__vc.step(F); await new Promise((r) => setTimeout(r, 0)); await new Promise((r) => { const ro = new ResizeObserver(() => { ro.disconnect(); r(); }); ro.observe(document.body); }); }, FRAME);
                const f = await read(); f.i = i; f.t = +((i + 1) * FRAME).toFixed(1);
                if (seq.some(([j]) => i >= j - 1 && i <= j + 1) && args.shots !== "0") { const g = await geom(page); for (const sh of f.shares ?? []) if (sh) g.members.push({ l: sh[0], r: sh[1], t: g.members[0].t, b: g.members[0].b }); await shot(page, `i2-${name}-${W}-f${i}`, g, 20); }
                frames.push(f);
            }
            await page.evaluate(() => window.__vc.thaw());
            // nocluster (11.0.0 control): no lenses, the glass is the plate itself
            const glassBy = (f, lbl) => { const i = f.labels.indexOf(lbl); if (i < 0) return null; if (!f.shares.length) return f.plateBox[i] ?? null; if (f.shares.length !== f.memberBox.length || !f.shares[i]) return "mismatch"; return f.shares[i]; };
            const out = {};
            for (const [tn, lbl, side] of [["dockL", f0.labels[0], 0], ["dockR", f0.labels[0], 1], ["themeL", "Theme", 0], ["themeR", "Theme", 1], ["silL", "__sil", 0], ["silR", "__sil", 1], ["dockCtlL", "ctl:" + f0.labels[0], 0], ["themeCtlL", "ctl:Theme", 0]]) {
                const xs = frames.map((f) => { if (lbl === "__sil") return f.sil ? f.sil[side] : null; if (lbl.startsWith("ctl:")) { const c = f.ctl?.[lbl.slice(4)]; return c ? c[side] : null; } const g = glassBy(f, lbl); return g === "mismatch" || !g ? null : g[side]; });
                const d = xs.slice(1).map((x, i) => (x == null || xs[i] == null ? null : +(x - xs[i]).toFixed(2)));
                const valid = xs.filter((x) => x != null);
                const travel = +(Math.max(...valid) - Math.min(...valid)).toFixed(2);
                let maxStep = 0, maxAt = -1; d.forEach((v, i) => { if (v != null && Math.abs(v) > maxStep) { maxStep = Math.abs(v); maxAt = i; } });
                out[tn] = { travel, maxStep: +maxStep.toFixed(2), maxStepFrame: maxAt, maxStepPctOfTravel: +(100 * maxStep / travel).toFixed(1), around: seq.map(([j]) => d.slice(Math.max(0, j - 2), j + 4)), xs: xs.map((x) => (x == null ? null : +x.toFixed(2))) };
            }
            const key = `${name}-${W}`;
            res[key] = { interruptFrame: k, acts: seq, tracks: out, shareOverlapMax: Math.max(...frames.map((f) => f.shareOverlap)), pct: frames.reduce((a, f) => a + f.pct, 0), ell: frames.reduce((a, f) => a + f.ell, 0), ownClipPct: frames.reduce((a, f) => a + (f.ownClipPct ?? 0), 0), frames: frames.map((f) => ({ i: f.i ?? -1, labels: f.labels, plateBox: f.plateBox, shares: f.shares, sil: f.sil, ctl: f.ctl, memberBox: f.memberBox, now: f.now, morphing: f.morphing, k: f.k, out: f.outMax, outVis: f.outVisMax, outWho: f.outWho })), outsideVisMaxPx: Math.max(...frames.map((f) => f.outVisMax ?? 0)), errs: errs.slice(0, 4) };
            log("interrupt2", key, Object.entries(out).map(([t, v]) => `${t}: travel ${v.travel} maxStep ${v.maxStep} (${v.maxStepPctOfTravel}%)@f${v.maxStepFrame} around ${JSON.stringify(v.around)}`).join(" | "), "overlap", res[key].shareOverlapMax, "pct/ell/own%", res[key].pct, res[key].ell, res[key].ownClipPct, "outVis", res[key].outsideVisMaxPx, "errs", errs.length);
        } finally { await ctx.close(); }
    }
    rec.cells.interrupt = res;
}

// S · restraint inside the fused plate: shadow layers, gradients and blur values on every painted element of the cluster subtree
const SHADE_READ = () => {
    const root = document.querySelector("[data-testid=cluster]");
    const rows = [];
    const vis = (e) => { const cs = getComputedStyle(e); if (cs.visibility === "hidden" || cs.display === "none") return false; for (let a = e; a; a = a.parentElement) if (+getComputedStyle(a).opacity < 0.01) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const layers = (s) => (s && s !== "none" ? s.split(/,(?![^(]*\))/).length : 0);
    for (const e of [root, ...root.querySelectorAll("*")]) {
        if (!vis(e)) continue;
        for (const pse of [null, "::before", "::after"]) {
            const cs = getComputedStyle(e, pse);
            if (pse && (cs.content === "none" || cs.content === "normal")) continue;
            const name = `${e.tagName.toLowerCase()}.${(e.className?.baseVal ?? e.className).toString().split(" ").filter(Boolean).slice(0, 2).join(".")}${pse ?? ""}`;
            const bs = layers(cs.boxShadow), ts = cs.textShadow !== "none" ? 1 : 0;
            const grad = /gradient\(/.test(cs.backgroundImage) ? cs.backgroundImage.slice(0, 90) : "";
            const bf = cs.backdropFilter && cs.backdropFilter !== "none" ? cs.backdropFilter : "";
            const op = +cs.opacity;
            if (bs || ts || grad || bf) rows.push({ name, bs, ts, grad, bf, op, label: e.closest("button")?.getAttribute("aria-label") ?? null });
        }
    }
    return rows;
};
async function partShade(browser) {
    const res = {};
    for (const w of [1440]) for (const theme of ["light", "dark"]) for (const [state, q] of [["collapsed", { shape: "onedock" }], ["expanded-pages", { shape: "onedock", open: "1" }], ["v1100-expanded", { shape: "onedock", open: "1", nocluster: "1" }]]) {
        const { ctx, page, errs } = await open(browser, { w, theme, mode: "design", fused: !q.open, q });
        try {
            if (q.open) await page.waitForTimeout(1200);
            const rows = await page.evaluate((r) => (0, eval)(`(${r})`)(), SHADE_READ.toString());
            const key = `${state}-${w}-${theme}`;
            const shadows = rows.filter((r) => r.bs || r.ts), grads = rows.filter((r) => r.grad), blurs = [...new Set(rows.filter((r) => r.bf).map((r) => r.bf))];
            res[key] = { shadows, grads, blurs, errs: errs.slice(0, 3) };
            log("shade", key, "shadow layers", JSON.stringify(shadows.map((r) => `${r.name}:${r.bs}${r.ts ? "+text" : ""}`)), "| gradients", JSON.stringify(grads.map((r) => `${r.name}${r.label ? "(" + r.label + ")" : ""}: ${r.grad}`).slice(0, 8)), "| blur values", JSON.stringify(blurs));
        } finally { await ctx.close(); }
    }
    rec.cells.shade = res;
}

const browser = await (engine === "webkit" ? playwright.webkit : playwright.chromium).launch({ headless: true });
try {
    rec.version = browser.version();
    for (const p of parts) {
        try {
            if (p === "onedock") await partOneDock(browser);
            if (p === "swap") await partSwap(browser);
            if (p === "prm") await partPrm(browser);
            if (p === "a11y") await partA11y(browser);
            if (p === "rest") await partRest(browser);
            if (p === "iso") await partIso(browser);
            if (p === "interrupt") await partInterrupt(browser);
            if (p === "trigger") await partTrigger(browser);
            if (p === "g8glide") await partG8Glide(browser);
            if (p === "restraint") await partRestraint(browser);
            if (p === "sitedock") await partSiteDock(browser);
            if (p === "reader") await partReader(browser);
            if (p === "mseam") await partMotionSeam(browser);
            if (p === "clickhold") await partClickHold(browser);
            if (p === "twocol") await partTwoCol(browser);
            if (p === "interrupt2") await partInterrupt2(browser);
            if (p === "shade") await partShade(browser);
        } catch (e) { rec.cells[`${p}-error`] = String(e?.stack ?? e).slice(0, 800); log("PART ERROR", p, String(e).slice(0, 300)); }
    }
} finally {
    await browser.close();
    server.close();
    rec.ended = new Date().toISOString();
    fs.writeFileSync(path.join(out, "data", `${engine}-${tag}.json`), JSON.stringify(rec, null, 1));
    log("wrote", path.join(out, "data", `${engine}-${tag}.json`));
}
