// Demo-site measuring probe (read-only) against the LIVE site https://glass.babb.dev.
//
// Machine law (~/.claude/CLAUDE.md): run only through `~/.claude/guard/guarded` (never
// --light: this launches a browser). Chromium HEADLESS SHELL only. The launch flags
// `--use-angle=metal --enable-gpu --ignore-gpu-blocklist` are the one named exception
// the brief allows, so GPU canvases (aurora/blob WebGL/WebGPU) actually render.
// One browser per run, a NEW CONTEXT per route, everything closed in `finally`.
// No getContext on any live page canvas: context counts come from an init-script hook
// that only OBSERVES the page's own calls; pixels come from page.screenshot.
//
// usage: node probe.mjs <cell: d1440|l1440|m390> <outFile.jsonl> [routeFilterRegex]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../../../../..");
const BASE = "https://glass.babb.dev";
const [cell, outFile, filt] = process.argv.slice(2);
const CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};
const C = CELLS[cell];
if (!C) throw new Error("cell?");

export function routes() {
    const t = fs.readFileSync(path.join(REPO, "demo/stories/manifest.ts"), "utf8");
    const stories = [...t.matchAll(/\bs\(\s*"([^"]+)",\s*"([^"]+)"/g)].map((m) => `/${m[1]}/${m[2]}`);
    const cats = [...new Set(stories.map((s) => s.split("/")[1]))].map((c) => `/${c}`);
    return ["/", ...cats, ...stories];
}

const INIT = (scheme) => `
try { localStorage.setItem("vueuse-color-scheme", ${JSON.stringify(scheme)}); } catch {}
window.__ctx = []; window.__probeQuiet = false;
(() => {
  const hook = (proto, kind) => {
    const orig = proto.getContext;
    proto.getContext = function (t, ...a) {
      const r = orig.call(this, t, ...a);
      if (!window.__probeQuiet && r && !this.__probeCtx) {
        this.__probeCtx = t;
        window.__ctx.push({ kind, t, cls: (this.className && this.className.baseVal === undefined) ? String(this.className || '') : '', at: performance.now() });
      }
      return r;
    };
  };
  hook(HTMLCanvasElement.prototype, 'canvas');
  if (self.OffscreenCanvas) hook(OffscreenCanvas.prototype, 'offscreen');
})();
`;

// ---------- in-page collector (runs via page.evaluate) ----------
const COLLECT = ({ shotB64, step, vw, vh, measureDocks }) => {
    const COMP_SEL = [
        "canvas", "button", "input", "textarea", "select", "table", "video", "img",
        "[role=slider]", "[role=switch]", "[role=tab]", "[role=tablist]", "[role=checkbox]",
        "[role=radio]", "[role=radiogroup]", "[role=combobox]", "[role=menu]", "[role=menubar]",
        "[role=progressbar]", "[role=grid]", "[role=table]", "[role=listbox]", "[role=toolbar]",
        "[role=meter]", "[role=status]", "[role=tabpanel]", ".glass-dock", "[data-slot]",
        ".aurora-root", ".goo-blob-wrapper", ".constellation", ".fourier-field",
    ].join(",");
    const main = document.querySelector("#demo-main") || document.querySelector("main");
    const header = main && main.querySelector(".story-page-chrome");
    const isComp = (el) => !!(el && el.closest && el.closest(COMP_SEL));
    const pathOf = (el) => {
        const p = [];
        for (let e = el; e && e !== main && p.length < 6; e = e.parentElement) {
            let s = e.tagName.toLowerCase();
            const cls = typeof e.className === "string" ? e.className.trim().split(/\s+/).filter((c) => c && !c.includes(":") && !c.includes("[")).slice(0, 2) : [];
            if (cls.length) s += "." + cls.join(".");
            p.unshift(s);
        }
        return p.join(">");
    };
    // colour resolution through our OWN 1x1 canvas (never a page canvas)
    window.__probeQuiet = true;
    const oc = new OffscreenCanvas(1, 1);
    const ox = oc.getContext("2d", { willReadFrequently: true });
    window.__probeQuiet = false;
    const rgbaCache = new Map();
    const toRGBA = (css) => {
        if (rgbaCache.has(css)) return rgbaCache.get(css);
        ox.clearRect(0, 0, 1, 1);
        ox.fillStyle = "#000"; ox.fillStyle = css;
        ox.fillRect(0, 0, 1, 1);
        const d = ox.getImageData(0, 0, 1, 1).data;
        const r = [d[0], d[1], d[2], d[3] / 255];
        rgbaCache.set(css, r);
        return r;
    };
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    return (async () => {
        let img = null;
        if (shotB64) {
            const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
            const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
            window.__probeQuiet = true;
            const c2 = new OffscreenCanvas(bmp.width, bmp.height);
            const x2 = c2.getContext("2d", { willReadFrequently: true });
            window.__probeQuiet = false;
            x2.drawImage(bmp, 0, 0);
            img = x2.getImageData(0, 0, bmp.width, bmp.height);
        }
        const px = (x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
        const regionStats = (r) => {
            const x0 = Math.max(0, Math.floor(r.left)), y0 = Math.max(0, Math.floor(r.top));
            const x1 = Math.min(img.width - 1, Math.ceil(r.right)), y1 = Math.min(img.height - 1, Math.ceil(r.bottom));
            if (x1 <= x0 || y1 <= y0) return null;
            const area = (x1 - x0) * (y1 - y0);
            const stride = Math.max(1, Math.floor(Math.sqrt(area / 6000)));
            const bins = new Map(); const pts = [];
            for (let y = y0; y <= y1; y += stride) for (let x = x0; x <= x1; x += stride) {
                const p = px(x, y); pts.push(p);
                const k = (p[0] >> 4) * 256 + (p[1] >> 4) * 16 + (p[2] >> 4);
                const b = bins.get(k) || [0, 0, 0, 0]; b[0] += p[0]; b[1] += p[1]; b[2] += p[2]; b[3]++; bins.set(k, b);
            }
            let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
            const bg = [best[0] / best[3], best[1] / best[3], best[2] / best[3]];
            return { pts, bg, modeShare: best[3] / pts.length };
        };
        const out = { step, scrollTop: main ? main.scrollTop : 0, texts: [], overlaps: [], headerOverlap: null };
        if (!main) return out;
        // ---- text runs ----
        const groups = new Map();
        const tw = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        for (let n = tw.nextNode(); n; n = tw.nextNode()) {
            if (!/[\p{L}\p{N}]/u.test(n.data)) continue;
            const el = n.parentElement;
            if (!el || el.closest("script,style,noscript,[aria-hidden=true] svg")) continue;
            if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) continue;
            const g = groups.get(el) || { el, nodes: [] }; g.nodes.push(n); groups.set(el, g);
        }
        const runs = [];
        for (const { el, nodes } of groups.values()) {
            let l = 1e9, t = 1e9, r = -1e9, b = -1e9, text = "";
            for (const n of nodes) {
                const rg = document.createRange(); rg.selectNodeContents(n);
                for (const q of rg.getClientRects()) { if (q.width < 1 || q.height < 1) continue; l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); }
                text += n.data;
            }
            if (r < 0) continue;
            const rect = { left: l, top: t, right: r, bottom: b };
            const inView = l >= 0 && t >= 0 && r <= vw && b <= vh;
            runs.push({ el, rect, text: text.replace(/\s+/g, " ").trim(), inView });
        }
        // ---- contrast for fully visible runs ----
        for (const run of runs) {
            if (!run.inView || !img) continue;
            const el = run.el; const cs = getComputedStyle(el);
            let op = 1; for (let e = el; e; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
            const ink = toRGBA(cs.color);
            const fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight, 10);
            const large = fs >= 24 || (fs >= 18.66 && fw >= 700);
            const st = regionStats({ left: run.rect.left - 1, top: run.rect.top, right: run.rect.right + 1, bottom: run.rect.bottom });
            if (!st) continue;
            const a = ink[3] * op;
            const inkC = [0, 1, 2].map((i) => ink[i] * a + st.bg[i] * (1 - a));
            const clipText = cs.webkitBackgroundClip === "text" || cs.backgroundClip === "text";
            let painted = 1; for (const p of st.pts) painted = Math.max(painted, CR(p, st.bg));
            const computed = clipText || ink[3] === 0 ? painted : CR(inkC, st.bg);
            // what sits on top of the run's centre
            const cx = (run.rect.left + run.rect.right) / 2, cy = (run.rect.top + run.rect.bottom) / 2;
            const top = document.elementFromPoint(cx, cy);
            const covered = top && !(el.contains(top) || top.contains(el) || top === el) ? pathOf(top) : null;
            const inHeader = !!(header && header.contains(el));
            run.res = {
                path: pathOf(el), text: run.text.slice(0, 80), words: (run.text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length,
                fs, fw, large, ink: cs.color, op: +op.toFixed(3), bg: st.bg.map(Math.round), modeShare: +st.modeShare.toFixed(2),
                cr: +computed.toFixed(2), painted: +painted.toFixed(2), rect: [run.rect.left, run.rect.top, run.rect.right - run.rect.left, run.rect.bottom - run.rect.top].map(Math.round),
                inComp: isComp(el), inHeader, covered, scrollTop: Math.round(main.scrollTop),
            };
            out.texts.push(run.res);
        }
        // ---- text painted over other text (both visible, unrelated elements) ----
        const vis = runs.filter((r) => r.inView && r.res);
        for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
            const A = vis[i], B = vis[j];
            if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
            const ix = Math.min(A.rect.right, B.rect.right) - Math.max(A.rect.left, B.rect.left);
            const iy = Math.min(A.rect.bottom, B.rect.bottom) - Math.max(A.rect.top, B.rect.top);
            if (ix <= 2 || iy <= 2) continue;
            const aa = (A.rect.right - A.rect.left) * (A.rect.bottom - A.rect.top), bb = (B.rect.right - B.rect.left) * (B.rect.bottom - B.rect.top);
            const share = (ix * iy) / Math.min(aa, bb);
            if (share < 0.15) continue;
            out.overlaps.push({ a: A.res.path, at: A.res.text.slice(0, 40), b: B.res.path, bt: B.res.text.slice(0, 40), share: +share.toFixed(2), aHeader: A.res.inHeader, bHeader: B.res.inHeader, scrollTop: Math.round(main.scrollTop) });
        }
        if (header) {
            const hr = header.getBoundingClientRect();
            const under = vis.filter((r) => !header.contains(r.el) && r.rect.top < hr.bottom && r.rect.bottom > hr.top);
            const hs = getComputedStyle(header), hb = getComputedStyle(header, "::before");
            out.headerOverlap = {
                rect: [hr.left, hr.top, hr.width, hr.height].map(Math.round), collapseT: hs.getPropertyValue("--chrome-collapse-t"), transform: hs.transform,
                radius: [hs.borderTopLeftRadius, hs.borderTopRightRadius, hs.borderBottomRightRadius, hs.borderBottomLeftRadius], boxShadow: hs.boxShadow,
                plate: { bg: hb.backgroundImage.slice(0, 160), opacity: hb.opacity, radius: [hb.borderTopLeftRadius, hb.borderTopRightRadius, hb.borderBottomRightRadius, hb.borderBottomLeftRadius], inset: [hb.top, hb.left, hb.bottom] },
                runsUnder: under.length, underSample: under.slice(0, 4).map((r) => r.res.text.slice(0, 40)),
                headerMinCr: Math.min(99, ...vis.filter((r) => header.contains(r.el)).map((r) => r.res.cr)),
            };
        }
        if (step > 0) return out;
        // ---- step-0 only: page anatomy ----
        const all = runs;
        const prose = all.filter((r) => !isComp(r.el) && !r.el.closest("pre,code,kbd"));
        const words = prose.reduce((s, r) => s + (r.text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length, 0);
        // words before first component (document order)
        let wbf = 0, firstComp = null;
        const tw2 = document.createTreeWalker(main, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
        for (let n = tw2.nextNode(); n; n = tw2.nextNode()) {
            if (n.nodeType === 1) {
                if (n.matches(COMP_SEL) && !n.closest(".story-page-chrome") && n.getBoundingClientRect().width * n.getBoundingClientRect().height > 400 && n.checkVisibility()) { firstComp = pathOf(n); break; }
            } else if (/[\p{L}\p{N}]/u.test(n.data) && n.parentElement && n.parentElement.checkVisibility() && !n.parentElement.closest("pre,code")) wbf += (n.data.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
        }
        // area above the fold: component union vs prose union on an 8px grid within main's box
        const mr = main.getBoundingClientRect();
        const G = 8, cols = Math.ceil(vw / G), rows = Math.ceil(vh / G);
        const comp = new Uint8Array(cols * rows), pro = new Uint8Array(cols * rows);
        const paint = (arr, r) => {
            const x0 = Math.max(mr.left, r.left), y0 = Math.max(mr.top, r.top), x1 = Math.min(mr.right, r.right), y1 = Math.min(mr.bottom, r.bottom);
            if (x1 <= x0 || y1 <= y0) return;
            for (let y = Math.floor(y0 / G); y < Math.ceil(y1 / G); y++) for (let x = Math.floor(x0 / G); x < Math.ceil(x1 / G); x++) arr[y * cols + x] = 1;
        };
        const compEls = [...main.querySelectorAll(COMP_SEL)].filter((e) => !e.closest(".story-page-chrome") && !(e.parentElement && e.parentElement.closest(COMP_SEL)) && e.checkVisibility());
        for (const e of compEls) paint(comp, e.getBoundingClientRect());
        for (const r of prose) paint(pro, r.rect);
        let ca = 0, pa = 0; for (let i = 0; i < comp.length; i++) { ca += comp[i]; pa += pro[i] && !comp[i] ? 1 : 0; }
        const vpArea = vw * vh;
        // duplicates
        const count = (sel) => document.querySelectorAll(sel).length;
        const inMain = (sel) => main.querySelectorAll(sel).length;
        const dupText = (sel, min) => {
            const m = new Map();
            for (const e of main.querySelectorAll(sel)) { const t = e.textContent.replace(/\s+/g, " ").trim(); if (t.length >= min) m.set(t, (m.get(t) || 0) + 1); }
            return [...m].filter(([, n]) => n > 1).map(([t, n]) => ({ t: t.slice(0, 60), n }));
        };
        const canv = [...document.querySelectorAll("canvas")].map((c) => {
            const r = c.getBoundingClientRect();
            let st = null;
            if (img && r.width > 4 && r.height > 4 && r.top < vh && r.bottom > 0) {
                const s = regionStats({ left: Math.max(0, r.left), top: Math.max(0, r.top), right: Math.min(vw, r.right), bottom: Math.min(vh, r.bottom) });
                if (s) { const lum = s.pts.map(L); const m = lum.reduce((a, b) => a + b, 0) / lum.length; const sd = Math.sqrt(lum.reduce((a, b) => a + (b - m) ** 2, 0) / lum.length); st = { meanL: +m.toFixed(4), sdL: +sd.toFixed(4), modeShare: +s.modeShare.toFixed(2) }; }
            }
            return { cls: String(c.className || ""), parent: pathOf(c.parentElement), inMain: main.contains(c), rect: [r.left, r.top, r.width, r.height].map(Math.round), ctx: c.__probeCtx || null, st };
        });
        const box = (e) => { const r = e.getBoundingClientRect(); return { rect: [r.left, r.top, r.width, r.height].map(Math.round), vpShare: +((Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / vpArea).toFixed(3)), scrollsInside: e.scrollHeight > e.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(e).overflowY), scrollH: e.scrollHeight, clientH: e.clientHeight }; };
        const configurators = [...document.querySelectorAll("[data-slot=configurator]")].map((c) => ({
            root: box(c), stage: c.querySelector(".configurator-stage") ? box(c.querySelector(".configurator-stage")) : null,
            aside: c.querySelector(".configurator-aside") ? box(c.querySelector(".configurator-aside")) : null,
            controls: c.querySelector(".configurator-controls") ? box(c.querySelector(".configurator-controls")) : null,
            path: pathOf(c),
        }));
        const de = document.documentElement;
        const overflowEls = [...main.querySelectorAll("*")].filter((e) => { const r = e.getBoundingClientRect(); return r.right > vw + 1 && r.width > 0 && e.checkVisibility() && getComputedStyle(e).position !== "fixed"; });
        out.anatomy = {
            title: document.title, words, wordsBeforeFirst: wbf, firstComp, compShare: +(ca * G * G / vpArea).toFixed(3), proseShare: +(pa * G * G / vpArea).toFixed(3),
            mainScrollH: main.scrollHeight, mainClientH: main.clientHeight,
            libRoots: { aurora: count(".aurora-root"), auroraMain: inMain(".aurora-root"), blob: count(".goo-blob-wrapper"), blobMain: inMain(".goo-blob-wrapper"), constellation: count(".constellation-canvas"), fourier: count(".fourier-field"), configurator: count("[data-slot=configurator]"), docks: count(".glass-dock"), docksMain: inMain(".glass-dock") },
            dupHeadings: dupText("h1,h2,h3,h4", 3), dupParas: dupText("p", 40),
            canvases: canv, ctx: window.__ctx.slice(), configurators,
            overflow: { docX: de.scrollWidth > de.clientWidth, mainX: main.scrollWidth > main.clientWidth + 1, n: overflowEls.length, sample: overflowEls.slice(0, 4).map((e) => pathOf(e) + "@" + Math.round(e.getBoundingClientRect().right)) },
            renderer: null,
        };
        return out;
    })();
};

const DOCKS = ({ vw, vh }) => {
    const main = document.querySelector("#demo-main");
    const parse = (v, w, h) => { const parts = v.split(" "); const f = (s, d) => s.endsWith("%") ? parseFloat(s) / 100 * d : parseFloat(s); return [f(parts[0], w), f(parts[1] || parts[0], h)]; };
    const corners = (el) => {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        const raw = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        const rr = raw.map((v) => parse(v, r.width, r.height));
        // CSS radius scaling: f = min over sides(side / sum of adjacent radii)
        const f = Math.min(1, r.width / (rr[0][0] + rr[1][0] || 1e-9), r.width / (rr[3][0] + rr[2][0] || 1e-9), r.height / (rr[0][1] + rr[3][1] || 1e-9), r.height / (rr[1][1] + rr[2][1] || 1e-9));
        const eff = rr.map(([x, y]) => +Math.min(x * f, y * f).toFixed(1));
        return { raw, eff, w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    };
    const pathOf = (el) => { const p = []; for (let e = el; e && e !== document.body && p.length < 5; e = e.parentElement) { let s = e.tagName.toLowerCase(); const c = typeof e.className === "string" ? e.className.trim().split(/\s+/).filter((x) => x && !x.includes(":") && !x.includes("[")).slice(0, 2) : []; if (c.length) s += "." + c.join("."); if (e.dataset && e.dataset.testid) s += `[${e.dataset.testid}]`; p.unshift(s); } return p.join(">"); };
    return [...document.querySelectorAll(".glass-dock")].map((d, i) => {
        const vertical = d.classList.contains("vertical");
        const plate = d.querySelector(":scope > .dock-plate");
        const root = corners(d), pl = plate ? corners(plate) : null;
        const geo = pl || root;
        const cross = vertical ? geo.w : geo.h;
        const need = cross / 2;
        const stadium = geo.eff.every((e) => e >= need - 1.5);
        const pcs = plate ? getComputedStyle(plate) : null;
        const r = d.getBoundingClientRect();
        return {
            i, path: pathOf(d), testid: d.dataset.testid || null, inMain: !!(main && main.contains(d)), cls: d.className, vertical,
            state: d.classList.contains("collapsed") ? "collapsed" : d.classList.contains("always-expanded") ? "always-expanded" : d.classList.contains("expanded") ? "expanded" : "?",
            rect: [r.left, r.top, r.width, r.height].map(Math.round), inView: r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw,
            root, plate: pl, stadium, need: +need.toFixed(1), runFits: d.querySelector("[data-run-fits]") ? d.querySelector("[data-run-fits]").dataset.runFits : null,
            plateBg: pcs ? pcs.backgroundColor : null, plateBackdrop: pcs ? (pcs.backdropFilter || pcs.webkitBackdropFilter) : null, plateOpacity: pcs ? pcs.opacity : null,
            rootBg: getComputedStyle(d).backgroundColor, rootBackdrop: getComputedStyle(d).backdropFilter, plateAnim: pcs ? pcs.animationName : null,
            fixed: getComputedStyle(d).position === "fixed" || !!d.closest("[style*=fixed]"),
        };
    });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({
    headless: true,
    // the one named exception (brief): GPU canvases must render on the GPU
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
});
const out = fs.createWriteStream(outFile, { flags: "a" });
try {
    // renderer once (our own canvas on about:blank)
    {
        const ctx = await browser.newContext();
        const p = await ctx.newPage();
        const rend = await p.evaluate(() => { const c = document.createElement("canvas"); const g = c.getContext("webgl"); const e = g && g.getExtension("WEBGL_debug_renderer_info"); return g ? { renderer: g.getParameter(e ? e.UNMASKED_RENDERER_WEBGL : g.RENDERER), vendor: g.getParameter(e ? e.UNMASKED_VENDOR_WEBGL : g.VENDOR), gpu: !!navigator.gpu } : null; });
        out.write(JSON.stringify({ cell, renderer: rend, ua: await p.evaluate(() => navigator.userAgent) }) + "\n");
        await ctx.close();
    }
    const list = routes().filter((r) => !filt || new RegExp(filt).test(r));
    for (const route of list) {
        const ctx = await browser.newContext({ viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1, reducedMotion: "no-preference" });
        const row = { cell, route, errors: [], steps: [] };
        try {
            await ctx.addInitScript(INIT(C.scheme));
            const page = await ctx.newPage();
            page.on("console", (m) => { if (m.type() === "error") row.errors.push(m.text().slice(0, 200)); });
            page.on("pageerror", (e) => row.errors.push("pageerror: " + String(e.message).slice(0, 200)));
            const t0 = Date.now();
            const resp = await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
            row.status = resp ? resp.status() : null;
            await page.waitForSelector("#demo-main", { timeout: 15000 }).catch(() => {});
            await sleep(2500);
            row.loadMs = Date.now() - t0;
            row.finalUrl = page.url();
            const { width: vw, height: vh } = C.viewport;
            const maxSteps = 7;
            for (let step = 0; step < maxSteps; step++) {
                const shot = (await page.screenshot({ type: "png" })).toString("base64");
                const res = await page.evaluate(COLLECT, { shotB64: shot, step, vw, vh });
                row.steps.push(res);
                const more = await page.evaluate(() => { const m = document.querySelector("#demo-main"); if (!m) return false; const before = m.scrollTop; m.scrollTo({ top: before + m.clientHeight * 0.8, behavior: "instant" }); return m.scrollTop > before + 4; });
                if (!more) break;
                await sleep(450);
            }
            await page.evaluate(() => { const m = document.querySelector("#demo-main"); if (m) m.scrollTo({ top: 0, behavior: "instant" }); });
            await sleep(500);
            row.docksRest = await page.evaluate(DOCKS, { vw, vh });
            if (cell === "d1440") {
                // hover each collapsed in-main dock open, then re-measure (the open posture)
                row.docksOpen = [];
                const n = row.docksRest.length;
                for (let i = 0; i < n && i < 14; i++) {
                    if (row.docksRest[i].state !== "collapsed") continue;
                    const ok = await page.evaluate((i) => { const d = document.querySelectorAll(".glass-dock")[i]; if (!d) return null; d.scrollIntoView({ block: "center" }); const r = d.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, i);
                    if (!ok) continue;
                    await sleep(250);
                    await page.mouse.move(ok[0], ok[1], { steps: 4 });
                    await sleep(900);
                    const all = await page.evaluate(DOCKS, { vw, vh });
                    row.docksOpen.push(all[i]);
                    await page.mouse.move(2, vh - 2);
                    await sleep(300);
                }
            }
        } catch (e) {
            row.fail = String(e && e.message || e).slice(0, 300);
        } finally {
            await ctx.close().catch(() => {});
        }
        out.write(JSON.stringify(row) + "\n");
        process.stdout.write(`${cell} ${route} steps=${row.steps.length} err=${row.errors.length}${row.fail ? " FAIL " + row.fail : ""}\n`);
    }
} finally {
    await browser.close().catch(() => {});
    out.end();
}
