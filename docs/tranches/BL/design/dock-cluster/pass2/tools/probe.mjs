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
    let pct = 0, ell = 0, clipPct = 0;
    for (const e of [root, ...root.querySelectorAll("*")]) {
        const cs = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        const sq = Math.abs(r.width - r.height) < 0.5;
        for (const c of [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius]) {
            if (/%/.test(c) && !sq && r.width > 0) pct++;
            const parts = c.split(" ");
            if (parts.length === 2 && parts[0] !== parts[1]) ell++;
        }
        if (/%/.test(cs.clipPath) && !/^inset\(50%\)$/.test(cs.clipPath)) { clipPct++; (window.__clipPctWho ??= new Set()).add(`${(e.className?.baseVal ?? e.className).toString().split(" ")[0]}: ${cs.clipPath.slice(0, 40)}`); }
    }
    // content outside the glass: every control, its painted opacity (product up to the root)
    let outMax = 0, outOpMax = 0;
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
        const fc = b.closest(".dock-face-content");
        const ci = fc?.style.clipPath?.match(/inset\((-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px\)/);
        if (ci) { const fr = fc.getBoundingClientRect(); l = Math.max(l, fr.left + +ci[4]); rr = Math.min(rr, fr.right - +ci[2]); }
        const out = rr <= l ? 0 : Math.max(0, Math.min(rr, g[0]) - l) + Math.max(0, rr - Math.max(l, g[1]));
        if (op > 0.05) outMax = Math.max(outMax, out);
        outOpMax = Math.max(outOpMax, out * op);
    }
    const faces = [...root.querySelectorAll(".dock-face")].map((f) => +(+getComputedStyle(f).opacity).toFixed(3));
    const p = window.__clusterPaint ?? null;
    return { clipPctWho: [...(window.__clipPctWho ?? [])].slice(0, 6), memberBox, plateBox, shares, shareOverlap: +shareOverlap.toFixed(2), pct, ell, clipPct, outMax: +outMax.toFixed(2), outOpMax: +outOpMax.toFixed(2), faces, morphing: ds.map((d) => d.hasAttribute("data-morphing")), k: p?.k, follow: p?.follow?.map((v) => +v.toFixed(2)), gliding: p?.gliding, now: window.__clusterNow?.()?.map((v) => +v.toFixed(3)) };
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
        pct: frames.reduce((a, f) => a + f.pct, 0), ell: frames.reduce((a, f) => a + f.ell, 0), clipPct: frames.reduce((a, f) => a + f.clipPct, 0),
        outsideMaxPx: Math.max(...frames.map((f) => f.outMax)), outsideOpMax: Math.max(...frames.map((f) => f.outOpMax)),
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
    for (const w of [390, 1440]) for (const theme of ["light", "dark"]) for (const [label, q] of [["p2", {}], ["fold", OFF]]) {
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
        out.in.trace = fr.filter((_, i) => i % 3 === 0).map((f) => ({ t: f.t, m: f.memberBox, s: f.shares, p: f.plateBox, faces: f.faces, out: f.outMax, outOp: f.outOpMax, fo: f.follow, gl: f.gliding }));
        await page.waitForTimeout(200);
        const g0 = await page.evaluate((read) => (0, eval)(`(${read})`)(), FRAME_READ.toString());
        const fb = await trace(page, [["layer", "tools"]], 900, png ? `swap-${label}-${o.w}-${o.theme}-${o.mode}-out` : null, png ? [33, 83, 167] : []);
        out.out = { ...summarize(fb, g0), at0: g0 };
        fb.forEach((f) => delete f.img);
        out.out.trace = fb.filter((_, i) => i % 3 === 0).map((f) => ({ t: f.t, m: f.memberBox, s: f.shares, p: f.plateBox, faces: f.faces, out: f.outMax, outOp: f.outOpMax, fo: f.follow, gl: f.gliding }));
        out.errs = errs.slice(0, 4);
    } finally { await ctx.close(); }
    return out;
}
async function partSwap(browser) {
    const res = {};
    for (const w of [390, 1440]) for (const theme of ["light", "dark"]) for (const [label, q] of [["p2", {}], ["fold", OFF], ["v1100", { nocluster: "1" }]]) {
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
        } catch (e) { rec.cells[`${p}-error`] = String(e?.stack ?? e).slice(0, 800); log("PART ERROR", p, String(e).slice(0, 300)); }
    }
} finally {
    await browser.close();
    server.close();
    rec.ended = new Date().toISOString();
    fs.writeFileSync(path.join(out, "data", `${engine}-${tag}.json`), JSON.stringify(rec, null, 1));
    log("wrote", path.join(out, "data", `${engine}-${tag}.json`));
}
