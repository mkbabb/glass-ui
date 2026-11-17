// ink8.mjs <port> <tag> [--engine chromium|webkit] [--pages a,b] [--css file --label name] [--shots dir] [--base log] [--crop]:
// MEASURE-8 H5 (RU-82 as amended for C7-M5, C7-M9, C7-M14; RU-68 as amended for C7-M3, C7-M4, R7-6). ink7.mjs with:
//   - settle: every shot waits until the stage's docks run no animation and carry no [data-morphing] (up to 3 s); an
//     item whose opacity product lies between 0.02 and 0.98 is unsettled and its cell is read once more, and an item
//     still unsettled on that read fails its cell, printed with its opacity (never skipped);
//   - opened cells only: a dock that did not open is opened again (hover, then a press on its folded face), and a dock
//     still not open is recorded `opened: false` and never judged as open;
//   - --base that does not exist exits non-zero; the mark and loose clauses are read in the pass;
//   - hover at fine pointers only (a phone has no hover): the 390 cells read no hover clause;
//   - the folded posture only on a dock that folds, confirmed by its `collapsed` class at the shot; a dock that rests open
//     is read at rest and labelled so, never as folded;
//   - the mark selector takes [aria-pressed='true'];
//   - each item's background from a 2 px ring 1 px outside its box (the modal colour), not from its own box, and each
//     item records its background and its opacity product; a seat's fill (a mark, a hovered seat) is its box's modal
//     colour with the pixels near its own ink masked (a glyph can no longer own the bin);
//   - plate and field: the median colour of the box, read three times, the spread printed;
//   - RU-68's floors: a mark no weaker than each engine's v11.0.2 reading on the cell (less 0.02), except where the
//     polarity flipped (v11.0.2's mark darker than its ground, the build's lighter: dials's 5Y and Lin on the dark field),
//     where 1.2 holds, with the colours printed; the hover against its own ground no weaker than v11.0.2's on the cell
//     (less 0.02), 1.1 where v11.0.2 has none; against current 1.2 (printed, the owner's question 18 holds it);
//   - two readings more: whether a segmented control's hover takes the dock's token (dials: the hovered segment's
//     computed background against the dock's computed --dock-control-hover-bg), and one held press (dials and nav, both
//     schemes, 1440: the pointer held down on the current seat and on a resting one, the fill against its rest);
//   - --crop: WebKit's canvas-tools Grid seat cropped open, saved beside the log (C7-M5).
// ink7.mjs <port> <tag> [--engine chromium|webkit] [--pages a,b] [--css file --label name] [--shots dir] [--base log]:
// MEASURE-7, G-15 with RU-56's and RU-57's clauses as amended (fold 6: R-1, R-2, C6-M2, C6-M3, C-7). ink.mjs (P3's
// instrument, unchanged: every word 4.5:1 and every glyph 3:1 against what is painted behind it) on the ten
// compositions and the loose cell, folded and open, dark and light, over the stage's field and a flat ground, at 1440 (or --w),
// and on each cell four readings more, all from screenshots of the page (no getContext on a live canvas):
//   mark    each current mark in an open dock (a seat with aria-current or data-active, a selected segment) against the
//           ground it sits on: the modal colour of its box against the modal colour of a 2 px ring 2 px outside it,
//           the pointer off the dock. The clause compares it with the same cell's v11.0.2 reading (--base: that run's
//           log): no weaker, less 0.02 for the screenshot's rounding.
//   hover   the pointer rests on the seat beside the current one: the hovered seat's modal colour against the current
//           seat's, 1.2:1 or more (RU-56 as amended: WebKit's shipped mark, until the owner picks, question 18).
//   plate   the plate against the field under it: the modal colour of the dock's box, and of the same box with the
//           dock hidden (visibility), folded and open. Printed per cell; not gated (RU-57 as amended: an exclusion
//           for the default, not a bound).
//   loose   ?page=loose: DockControl outside any dock; its current fill and a hovered fill against the ground, which
//           must read as v11.0.2's within 0.02 (C-7).
// One browser per run, a context per cell, closed in finally. Log: logs/m7-ink-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const PAGES = (val("--pages", "") || "nav,chrome,rail,figure-tools,dials,canvas-tools,transport,pager,corner-controls,action-row,loose").split(",");
const SHOTS = val("--shots", null);
const CSS = val("--css", null) ? readFileSync(val("--css"), "utf8") : "";
const LABEL = val("--label", "build");
// --w 390: the same cells at 390 by 844 with a coarse pointer (RU-57 as amended: the ladder is also read at 390).
const VW = +val("--w", "1440");
if (val("--base", null) && !existsSync(val("--base"))) { console.error(`--base ${val("--base")} does not exist`); process.exit(2); }
const BASE = val("--base", null) ? JSON.parse(readFileSync(val("--base"), "utf8")) : null;
const CROP = a.includes("--crop");
const FINE = VW >= 800;
const HOVER_MIN = +val("--hover", "1.2");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// RU-56's marks: a dock seat or a segment that says it is current (a pager's dots are their own indicator, not a fill).
const MARK_SEL = ":is(.dock-icon-button, .dock-tab-button, .segmented-tab, [role='tab']):is([aria-current='page'], [aria-current='true'], [data-active]:not([data-active='false']), [aria-selected='true'], [aria-pressed='true'])";
// in-page, from one screenshot: ink of every text run and icon in the stage's docks, each current mark against its
// ground, a hovered seat against the current one, and the modal colour of each dock's box.
const READ = async ({ shotB64, only, hovered, MARK_SEL }) => {
    const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
    const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
    const c2 = new OffscreenCanvas(bmp.width, bmp.height);
    const x2 = c2.getContext("2d", { willReadFrequently: true });
    x2.drawImage(bmp, 0, 0);
    const img = x2.getImageData(0, 0, bmp.width, bmp.height);
    const oc = new OffscreenCanvas(1, 1).getContext("2d", { willReadFrequently: true });
    const rgba = (css) => { oc.clearRect(0, 0, 1, 1); oc.fillStyle = "#000"; oc.fillStyle = css; oc.fillRect(0, 0, 1, 1); const d = oc.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const px = (x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
    const modal = (pts) => {
        const bins = new Map();
        for (const [x, y] of pts) {
            if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue;
            const p = px(x, y); const k = (p[0] >> 4) * 256 + (p[1] >> 4) * 16 + (p[2] >> 4);
            const b = bins.get(k) || [0, 0, 0, 0]; b[0] += p[0]; b[1] += p[1]; b[2] += p[2]; b[3]++; bins.set(k, b);
        }
        let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
        return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null;
    };
    const boxPts = (r) => { const o = []; for (let y = Math.ceil(r.top); y < Math.floor(r.bottom); y++) for (let x = Math.ceil(r.left); x < Math.floor(r.right); x++) o.push([x, y]); return o; };
    const ringPts = (r, off, wd) => { const o = []; const L0 = Math.floor(r.left) - off - wd, T0 = Math.floor(r.top) - off - wd, R0 = Math.ceil(r.right) + off + wd, B0 = Math.ceil(r.bottom) + off + wd;
        for (let y = T0; y < B0; y++) for (let x = L0; x < R0; x++) { const inner = x >= L0 + wd && x < R0 - wd && y >= T0 + wd && y < B0 - wd; if (!inner) o.push([x, y]); } return o; };
    // RU-82 (C7-M5): an item's background from a 2 px ring 1 px outside its box, never from its own box
    const bgOf = (r) => modal(ringPts(r, 1, 2));
    // a seat's fill: its box's modal colour with the pixels near its own ink masked
    const fillOf = (el, r) => { const ink = rgba(getComputedStyle(el).color); const pts = boxPts(r).filter(([x, y]) => { if (x < 0 || y < 0 || x >= img.width || y >= img.height) return false; const p = px(x, y); return CR(p, ink) >= 1.6; }); return modal(pts.length > 8 ? pts : boxPts(r)); };
    const stage = document.querySelector("[data-story-stage]");
    const docks = [...(stage?.querySelectorAll(".glass-dock") ?? [])].filter((d) => only == null || d.getAttribute("aria-label") === only);
    const ink = [];
    for (const d of docks) {
        const items = [];
        const tw = document.createTreeWalker(d, NodeFilter.SHOW_TEXT);
        for (let n = tw.nextNode(); n; n = tw.nextNode()) {
            if (!/[\p{L}\p{N}]/u.test(n.data)) continue;
            const el = n.parentElement; if (!el || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            if (el.closest(".sr-only")) continue;
            const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
            if (q.width < 2 || q.height < 2) continue;
            items.push({ kind: "text", el, rect: q, text: n.data.trim().slice(0, 16) });
        }
        for (const svg of d.querySelectorAll("svg")) {
            if (!svg.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            const q = svg.getBoundingClientRect(); if (q.width < 4) continue;
            items.push({ kind: "icon", el: svg, rect: q, text: svg.getAttribute("class")?.match(/lucide-([a-z0-9-]+)/)?.[1] ?? "svg" });
        }
        for (const it of items) {
            let op = 1; for (let e = it.el; e && e !== document.body; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
            const c = rgba(getComputedStyle(it.el).color);
            const bg = bgOf(it.rect);
            if (!bg) continue;
            const al = c[3] * op; const mix = [0, 1, 2].map((i) => c[i] * al + bg[i] * (1 - al));
            const cr = +CR(mix, bg).toFixed(2);
            const unsettled = op > 0.02 && op < 0.98;
            ink.push({ dock: d.getAttribute("aria-label"), kind: it.kind, text: it.text, cr, need: it.kind === "text" ? 4.5 : 3, pass: cr >= (it.kind === "text" ? 4.5 : 3) && !unsettled, op: +op.toFixed(3), bg: bg.map(Math.round), unsettled });
        }
    }
    // The current marks: a seat or segment that says it is current, visible, in an open dock (or the loose row).
    const scope = only === "loose" ? [stage?.querySelector("[data-testid=loose-row]")].filter(Boolean) : docks.filter((d) => d.classList.contains("expanded"));
    const SEL = MARK_SEL;
    const marks = [];
    const seen = new Set();
    for (const d of scope) for (const m of d.querySelectorAll(SEL)) {
        if (seen.has(m) || [...seen].some((s) => s.contains(m) || m.contains(s))) continue;
        if (!m.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
        const r = m.getBoundingClientRect(); if (r.width < 8 || r.height < 8) continue;
        seen.add(m);
        const fill = fillOf(m, r), ground = modal(ringPts(r, 2, 2));
        if (!fill || !ground) continue;
        const name = m.getAttribute("aria-label") || m.textContent.trim().slice(0, 12) || m.className.toString().slice(0, 20);
        const out = { dock: only === "loose" ? "loose" : d.getAttribute("aria-label"), name, mark: +CR(fill, ground).toFixed(3), fill: fill.map(Math.round), ground: ground.map(Math.round) };
        if (hovered) {
            const h = document.querySelector(`[data-ink7-hover]`);
            if (h && h.parentElement === m.parentElement) { const hr = h.getBoundingClientRect(); const hf = fillOf(h, hr); out.hover = { name: h.getAttribute("aria-label") || h.textContent.trim().slice(0, 12), againstCurrent: +CR(hf, fill).toFixed(3), againstGround: +CR(hf, modal(ringPts(hr, 2, 2))).toFixed(3), fill: hf.map(Math.round) }; }
        }
        marks.push(out);
    }
    const median = (pts) => { const ch = [[], [], []]; for (const [x, y] of pts) { if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue; const p = px(x, y); ch[0].push(p[0]); ch[1].push(p[1]); ch[2].push(p[2]); } if (!ch[0].length) return null; return ch.map((c) => { c.sort((p, q) => p - q); return c[c.length >> 1]; }); };
    const boxes = docks.map((d) => { const r = (d.querySelector(".dock-plate") ?? d).getBoundingClientRect(); return { dock: d.getAttribute("aria-label"), posture: d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest", rect: [r.left, r.top, r.right, r.bottom], color: median(boxPts(r))?.map(Math.round) }; });
    return { ink, marks, boxes, CRs: null };
};
// the field under a dock: the same box's modal colour with the dock hidden
const fieldUnder1 = async (p, boxes) => {
    await p.evaluate(() => { for (const d of document.querySelectorAll("[data-story-stage] .glass-dock")) d.style.visibility = "hidden"; });
    await sleep(120);
    const shot = (await p.screenshot({ type: "png" })).toString("base64");
    const r = await p.evaluate(async ({ shotB64, boxes }) => {
        const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
        const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
        const c2 = new OffscreenCanvas(bmp.width, bmp.height); const x2 = c2.getContext("2d", { willReadFrequently: true }); x2.drawImage(bmp, 0, 0);
        const img = x2.getImageData(0, 0, bmp.width, bmp.height);
        const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
        const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
        const CR = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        return boxes.map((b) => {
            const bins = new Map();
            for (let y = Math.ceil(b.rect[1]); y < Math.floor(b.rect[3]); y++) for (let x = Math.ceil(b.rect[0]); x < Math.floor(b.rect[2]); x++) {
                if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue;
                const i = (y * img.width + x) * 4; const k = (img.data[i] >> 4) * 256 + (img.data[i + 1] >> 4) * 16 + (img.data[i + 2] >> 4);
                const e = bins.get(k) || [0, 0, 0, 0]; e[0] += img.data[i]; e[1] += img.data[i + 1]; e[2] += img.data[i + 2]; e[3]++; bins.set(k, e);
            }
            const ch = [[], [], []];
            for (let y = Math.ceil(b.rect[1]); y < Math.floor(b.rect[3]); y++) for (let x = Math.ceil(b.rect[0]); x < Math.floor(b.rect[2]); x++) { if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue; const i = (y * img.width + x) * 4; ch[0].push(img.data[i]); ch[1].push(img.data[i + 1]); ch[2].push(img.data[i + 2]); }
            const f = ch[0].length ? ch.map((c) => { c.sort((p, q) => p - q); return c[c.length >> 1]; }) : null;
            return { dock: b.dock, posture: b.posture, plate: b.color, field: f, plateVsField: f && b.color ? +CR(b.color, f).toFixed(3) : null };
        });
    }, { shotB64: shot, boxes });
    await p.evaluate(() => { for (const d of document.querySelectorAll("[data-story-stage] .glass-dock")) d.style.removeProperty("visibility"); });
    await sleep(80);
    return r;
};
// RU-82 (C7-M9): plate and field three times, the median of the three plate-against-field readings and their spread
const fieldUnder = async (p, shoot, only) => {
    const reads = [];
    for (let k = 0; k < 3; k++) { const r = await shoot(only, false); reads.push(await fieldUnder1(p, r.boxes)); await sleep(150); }
    return reads[0].map((b, i) => { const xs = reads.map((rr) => rr[i]?.plateVsField).filter((x) => x != null).sort((p2, q2) => p2 - q2); return { ...b, reads: xs, plateVsField: xs.length ? xs[xs.length >> 1] : null, spread: xs.length ? +(xs[xs.length - 1] - xs[0]).toFixed(3) : null }; });
};
// settle: no running animation and no [data-morphing] in the stage's docks, up to 3 s
const settle = async (p) => p.evaluate(async () => { const t0 = performance.now(); while (performance.now() - t0 < 3000) { const docks = [...document.querySelectorAll("[data-story-stage] .glass-dock")]; const busy = docks.some((d) => d.hasAttribute("data-morphing") || d.getAnimations({ subtree: true }).some((x) => x.playState === "running" && !/aurora/i.test(String(x.effect?.target?.className ?? "")))); if (!busy) return +(performance.now() - t0).toFixed(0); await new Promise((r) => setTimeout(r, 50)); } return -1; });
const out = { engine, label: LABEL, width: VW, css: CSS, hoverMin: HOVER_MIN, cells: [] };
let browser;
const baseCell = (page, ground, scheme, dock) => BASE?.cells.find((c) => c.page === page && c.ground === ground && c.scheme === scheme && c.posture === "open" && (c.dock === dock || page === "loose")) ?? null;
const baseMark = (page, ground, scheme, dock, name) => baseCell(page, ground, scheme, dock)?.marks?.find((m) => m.name === name) ?? null;
const baseHover = (page, ground, scheme, dock, name) => (baseCell(page, ground, scheme, dock)?.hover ?? []).find((m) => m.hover && m.hover.name === name)?.hover?.againstGround ?? null;
const lum = (p) => { const l = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * l(p[0]) + 0.7152 * l(p[1]) + 0.0722 * l(p[2]); };
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    for (const page of PAGES) for (const ground of ["field", "flat"]) for (const scheme of ["dark", "light"]) {
        const ctx = await browser.newContext({ viewport: { width: VW, height: VW < 800 ? 844 : 900 }, deviceScaleFactor: 1, colorScheme: scheme, ...(VW < 800 ? { hasTouch: true, ...(engine === "chromium" ? { isMobile: true } : {}) } : {}) });
        if (CSS) await ctx.addInitScript((css) => { addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.setAttribute("data-g15-state", ""); st.textContent = css; document.head.appendChild(st); }); }, CSS);
        try {
            const p = await ctx.newPage();
            const errors = [];
            p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 160)));
            await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${page}&ground=${ground}${scheme === "dark" ? "&scheme=dark" : ""}`);
            // 60 s: a dev server compiles the page on its first request (MEASURE-7 reads token states on one).
            await p.waitForFunction(() => window.__animReady === true, null, { timeout: 60000 }).catch(() => {});
            await p.waitForSelector(page === "loose" ? "[data-testid=loose-row]" : "[data-story-stage] .glass-dock", { timeout: 60000 });
            await sleep(2500);
            await p.mouse.move(2, 2);
            await sleep(400);
            const shoot1 = async (only, hovered) => { await settle(p); return p.evaluate(READ, { shotB64: (await p.screenshot({ type: "png" })).toString("base64"), only, hovered, MARK_SEL }); };
            // RU-82 (C7-M14): an item unsettled is read once more; still unsettled, it fails (printed with its opacity)
            // (printed beside the verdict, not changing it: an item whose opacity is the same on both reads, with no animation
            // running, is marked steadyOp, so a designed resting opacity, the DarkModeToggle's 0.8, is told from a mid-change read)
            const shoot = async (only, hovered) => { let r = await shoot1(only, hovered); if (r.ink.some((x) => x.unsettled)) { const first = r.ink.map((x) => `${x.dock}|${x.kind}|${x.text}|${x.op}`); await sleep(500); r = await shoot1(only, hovered); r.reread = true; for (const x of r.ink) if (x.unsettled && first.includes(`${x.dock}|${x.kind}|${x.text}|${x.op}`)) x.steadyOp = true; } return r; };
            const sch = await p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
            if (page === "loose") {
                const r = await shoot("loose", false);
                const cur = r.marks[0];
                // hover the resting control beside the current one
                const hb = await p.evaluate(() => { const row = document.querySelector("[data-testid=loose-row]"); const h = [...row.children].find((c) => !c.hasAttribute("data-active")); h.setAttribute("data-ink7-hover", ""); const b = h.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
                await p.mouse.move(hb.x, hb.y, { steps: 3 }); await sleep(450);
                const rh = await shoot("loose", true);
                const base = BASE ? BASE.cells.find((c) => c.page === "loose" && c.ground === ground && c.scheme === scheme) : null;
                const cell = { page, ground, scheme, scheme_read: sch, posture: "open", dock: "loose", marks: rh.marks, mark: cur?.mark ?? null, base: base ? { mark: base.mark ?? null, hover: base.marks?.[0]?.hover?.againstGround ?? null } : null };
                const hv = FINE ? (rh.marks[0]?.hover?.againstGround ?? null) : null;
                cell.looseFails = [];
                if (cell.base && cell.base.mark != null && cell.mark != null && Math.abs(cell.mark - cell.base.mark) > 0.02) cell.looseFails.push(`current fill ${cell.mark} against v11.0.2 ${cell.base.mark}`);
                if (cell.base && cell.base.hover != null && hv != null && Math.abs(hv - cell.base.hover) > 0.02) cell.looseFails.push(`hover fill ${hv} against v11.0.2 ${cell.base.hover}`);
                out.cells.push(cell);
                if (errors.length) out.cells.push({ page, ground, scheme, errors });
                continue;
            }
            const folded = await shoot(null, false);
            const pf = await fieldUnder(p, shoot, null);
            // RU-82: the folded posture only for a dock that folds (its `collapsed` class at the shot); the others rest open
            const postures = folded.boxes.map((b) => `${b.dock}: ${b.posture}`);
            const anyFolded = folded.boxes.some((b) => b.posture === "folded");
            out.cells.push({ page, ground, scheme, scheme_read: sch, posture: anyFolded ? "folded" : "rest (no dock folds)", postures, n: folded.ink.length, min: folded.ink.length ? Math.min(...folded.ink.map((x) => x.cr)) : null, fails: folded.ink.filter((x) => !x.pass), all: folded.ink, plate: pf.filter((x) => x.posture === "folded"), plateRest: pf.filter((x) => x.posture !== "folded"), reread: !!folded.reread });
            if (SHOTS) { mkdirSync(SHOTS, { recursive: true }); await p.screenshot({ path: `${SHOTS}/${tag}-${engine}-${page}-${ground}-${scheme}-folded.png` }); }
            const docks = await p.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock")].map((d) => d.getAttribute("aria-label")));
            for (let k = 0; k < docks.length; k++) {
                const box = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, top: r.y, open: d.classList.contains("expanded") }; }, k);
                if (!box.open && VW < 800) {
                    // RU-59 at 390: a tap on the folded face, never the dock's centre (a seat on an icon dock)
                    const fb = await p.evaluate((k) => { const f = document.querySelectorAll("[data-story-stage] .glass-dock")[k].querySelector(".dock-layer--summary"); const r = f?.getBoundingClientRect(); return r && r.width > 2 ? { x: r.x + r.width / 2, y: r.y + r.height / 2 } : null; }, k);
                    if (fb) { await p.touchscreen.tap(fb.x, fb.y); await sleep(900); }
                } else if (!box.open) {
                    await p.mouse.move(box.x - 6, box.y); await p.mouse.move(box.x, box.y, { steps: 3 }); await sleep(900);
                    const open = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                    if (!open) { await p.mouse.click(box.x, box.y); await sleep(900); }
                }
                let isOpen = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                if (!isOpen) {
                    // RU-82: a dock that did not open is opened again, by a press on its folded face, never its centre
                    const fb = await p.evaluate((k) => { const f = document.querySelectorAll("[data-story-stage] .glass-dock")[k].querySelector(".dock-layer--summary"); const r = f?.getBoundingClientRect(); return r && r.width > 2 ? { x: r.x + r.width / 2, y: r.y + r.height / 2 } : null; }, k);
                    if (fb) { if (VW < 800) await p.touchscreen.tap(fb.x, fb.y); else await p.mouse.click(fb.x, fb.y); await sleep(1000); }
                    isOpen = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                }
                if (!isOpen) { out.cells.push({ page, ground, scheme, scheme_read: sch, posture: "open", dock: docks[k], opened: false, n: null, note: "did not open after a second try: not judged as open" }); await p.mouse.click(4, VW < 800 ? 830 : 890); await p.mouse.move(2, 2); await sleep(400); continue; }
                const r = await shoot(docks[k], false);
                // the pointer off the dock (above it), the linger still holding it open: the marks at rest
                const nb = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, top: r.y, bottom: r.y + r.height }; }, k);
                await p.mouse.move(nb.x, nb.top > 40 ? nb.top - 24 : nb.bottom + 24, { steps: 2 }); await sleep(450);
                const rm = await shoot(docks[k], false);
                const pf2 = await fieldUnder(p, shoot, docks[k]);
                // the seat beside the current one hovered
                let hov = null;
                const hb = await p.evaluate(({ k, SEL }) => {
                    const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k];
                    const m = d.querySelector(SEL); if (!m) return null;
                    const sibs = [...m.parentElement.children].filter((c) => c !== m && c.checkVisibility() && c.getBoundingClientRect().width > 8);
                    const i = [...m.parentElement.children].indexOf(m);
                    const h = sibs.sort((p2, q2) => Math.abs([...m.parentElement.children].indexOf(p2) - i) - Math.abs([...m.parentElement.children].indexOf(q2) - i))[0];
                    if (!h) return null;
                    document.querySelectorAll("[data-ink7-hover]").forEach((e) => e.removeAttribute("data-ink7-hover"));
                    h.setAttribute("data-ink7-hover", "");
                    const b = h.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
                }, { k, SEL: MARK_SEL });
                if (FINE && hb && rm.marks.length) {
                    await p.mouse.move(hb.x, hb.y, { steps: 3 }); await sleep(450);
                    hov = (await shoot(docks[k], true)).marks;
                }
                // RU-68 (C7-M3): the floor is v11.0.2's mark on the cell, or 1.2 where the polarity flipped
                const marks = rm.marks.map((m) => {
                    const b = baseMark(page, ground, scheme, docks[k], m.name);
                    const flipped = !!(b && b.fill && b.ground && m.fill && m.ground && Math.sign(lum(b.fill) - lum(b.ground)) !== Math.sign(lum(m.fill) - lum(m.ground)));
                    return { ...m, base: b ? b.mark : null, baseFill: b?.fill ?? null, baseGround: b?.ground ?? null, flipped, floor: b ? (flipped ? 1.2 : +(b.mark - 0.02).toFixed(3)) : null };
                });
                const markFails = marks.filter((m) => m.floor != null && m.mark < m.floor).map((m) => `mark ${m.name} ${m.mark} < ${m.flipped ? "1.2 (the polarity flipped: v11.0.2 " + m.baseFill + " on " + m.baseGround + ", now " + m.fill + " on " + m.ground + ")" : "v11.0.2 " + m.base}`);
                const hoverFails = [], hoverNotes = [];
                for (const m of hov ?? []) {
                    if (!m.hover) continue;
                    const bg = baseHover(page, ground, scheme, docks[k], m.hover.name);
                    const floor = bg != null ? +(bg - 0.02).toFixed(3) : 1.1;
                    if (m.hover.againstGround < floor) hoverFails.push(`hover ${m.hover.name} against its ground ${m.hover.againstGround} < ${bg != null ? "v11.0.2 " + bg : "1.1"}`);
                    if (m.hover.againstCurrent < HOVER_MIN) hoverNotes.push(`hover ${m.hover.name} against current ${m.name} ${m.hover.againstCurrent} < ${HOVER_MIN} (question 18)`);
                }
                out.cells.push({ page, ground, scheme, scheme_read: sch, posture: "open", dock: docks[k], opened: isOpen, reread: !!r.reread, n: r.ink.length, min: r.ink.length ? Math.min(...r.ink.map((x) => x.cr)) : null, fails: r.ink.filter((x) => !x.pass), all: r.ink, marks, hover: hov, markFails, hoverFails, hoverNotes, plate: pf2 });
                // RU-68 (C7-M4, R7-6): two readings more, at 1440 on dials and nav over the field
                if (FINE && ground === "field" && (page === "dials" || page === "nav")) {
                    const ex = { page, ground, scheme, dock: docks[k], extra: true };
                    // whether a segmented control's hover takes the dock's token
                    const seg = await p.evaluate((k) => {
                        const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k];
                        const t = [...d.querySelectorAll(".segmented-tab, [role='tab']")].find((x) => x.getAttribute("aria-selected") !== "true" && x.checkVisibility());
                        if (!t) return null;
                        document.querySelectorAll("[data-ink7-hover]").forEach((e) => e.removeAttribute("data-ink7-hover"));
                        const r = t.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
                    }, k);
                    if (seg) {
                        await p.mouse.move(seg.x, seg.y, { steps: 3 }); await sleep(450);
                        ex.segmentedHover = await p.evaluate(({ k, x, y }) => {
                            const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k];
                            const t = document.elementFromPoint(x, y)?.closest(".segmented-tab, [role='tab']");
                            const probe = document.createElement("span"); probe.style.background = "var(--dock-control-hover-bg)"; t?.parentElement?.appendChild(probe);
                            const token = getComputedStyle(probe).backgroundColor; probe.remove();
                            const own = t ? getComputedStyle(t).backgroundColor : null;
                            const cs = t ? getComputedStyle(t) : null;
                            return { segment: t?.textContent?.trim().slice(0, 12) ?? null, background: own, dockHoverToken: token, takesToken: own === token, backgroundImage: cs?.backgroundImage?.slice(0, 80) ?? null };
                        }, { k, ...seg });
                    }
                    // one held press: the pointer held down on the current seat and on a resting one
                    const seats = await p.evaluate(({ k, SEL }) => {
                        const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k];
                        const m = d.querySelector(SEL); if (!m) return null;
                        const rest = [...m.parentElement.children].find((c) => c !== m && c.checkVisibility() && c.getBoundingClientRect().width > 8 && !c.matches(SEL));
                        const box = (e, w) => { e.setAttribute("data-ink8-press", w); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, name: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 12), which: w }; };
                        return { current: box(m, "current"), rest: rest ? box(rest, "rest") : null };
                    }, { k, SEL: MARK_SEL });
                    if (seats) {
                        ex.press = {};
                        for (const which of ["current", "rest"]) {
                            const st = seats[which]; if (!st) continue;
                            const fillAt = async () => p.evaluate(async ({ shotB64, which }) => {
                                const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0)); const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
                                const c2 = new OffscreenCanvas(bmp.width, bmp.height); const x2 = c2.getContext("2d", { willReadFrequently: true }); x2.drawImage(bmp, 0, 0); const img = x2.getImageData(0, 0, bmp.width, bmp.height);
                                const el = document.querySelector(`[data-ink8-press="${which}"]`); if (!el) return { fill: null, ground: null, againstGround: null }; const r = el.getBoundingClientRect();
                                const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); const L = (q) => 0.2126 * lin(q[0]) + 0.7152 * lin(q[1]) + 0.0722 * lin(q[2]); const CR = (a2, b2) => { const u = L(a2), v = L(b2); return (Math.max(u, v) + 0.05) / (Math.min(u, v) + 0.05); };
                                const oc = new OffscreenCanvas(1, 1).getContext("2d"); oc.fillStyle = getComputedStyle(el).color; oc.fillRect(0, 0, 1, 1); const ink = [...oc.getImageData(0, 0, 1, 1).data].slice(0, 3);
                                const bins = new Map(); const ringB = new Map();
                                const put = (m, x0, y0) => { const i = (y0 * img.width + x0) * 4; const q = [img.data[i], img.data[i + 1], img.data[i + 2]]; const kk = (q[0] >> 4) * 256 + (q[1] >> 4) * 16 + (q[2] >> 4); const b = m.get(kk) || [0, 0, 0, 0]; b[0] += q[0]; b[1] += q[1]; b[2] += q[2]; b[3]++; m.set(kk, b); return q; };
                                for (let yy = Math.ceil(r.top); yy < Math.floor(r.bottom); yy++) for (let xx = Math.ceil(r.left); xx < Math.floor(r.right); xx++) { const i = (yy * img.width + xx) * 4; const q = [img.data[i], img.data[i + 1], img.data[i + 2]]; if (CR(q, ink) >= 1.6) put(bins, xx, yy); }
                                for (let yy = Math.floor(r.top) - 4; yy < Math.ceil(r.bottom) + 4; yy++) for (let xx = Math.floor(r.left) - 4; xx < Math.ceil(r.right) + 4; xx++) { const inner = xx >= Math.floor(r.left) - 2 && xx < Math.ceil(r.right) + 2 && yy >= Math.floor(r.top) - 2 && yy < Math.ceil(r.bottom) + 2; if (!inner) put(ringB, xx, yy); }
                                const mo = (m) => { let best = null; for (const b of m.values()) if (!best || b[3] > best[3]) best = b; return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null; };
                                const f = mo(bins), g = mo(ringB);
                                return { fill: f?.map(Math.round), ground: g?.map(Math.round), againstGround: f && g ? +CR(f, g).toFixed(3) : null, scale: getComputedStyle(el).scale };
                            }, { shotB64: (await p.screenshot({ type: "png" })).toString("base64"), which: st.which });
                            await p.mouse.move(st.x, st.y, { steps: 2 }); await sleep(400);
                            const restRead = await fillAt();
                            await p.mouse.down(); await sleep(350);
                            const held = await fillAt();
                            await p.mouse.up(); await sleep(200);
                            ex.press[which] = { seat: st.name, hovered: restRead, held, heldAgainstHovered: held.fill && restRead.fill ? (() => { const l = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); const L = (q) => 0.2126 * l(q[0]) + 0.7152 * l(q[1]) + 0.0722 * l(q[2]); const u = L(held.fill), v = L(restRead.fill); return +((Math.max(u, v) + 0.05) / (Math.min(u, v) + 0.05)).toFixed(3); })() : null };
                            await p.keyboard.press("Escape").catch(() => {});
                        }
                    }
                    out.cells.push(ex);
                }
                // C7-M5: WebKit's canvas-tools Grid seat, cropped while open
                if (CROP && page === "canvas-tools") { const gb = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const g = [...d.querySelectorAll("button, [role=button]")].find((b) => /grid/i.test(b.getAttribute("aria-label") ?? "")); if (!g) return null; const r = g.getBoundingClientRect(); return { x: r.x - 6, y: r.y - 6, width: r.width + 12, height: r.height + 12, label: g.getAttribute("aria-label") }; }, k); if (gb) { const dir = new URL(`../../crops-m8/`, import.meta.url); mkdirSync(dir, { recursive: true }); await p.screenshot({ path: new URL(`ink8-${tag}-${engine}-canvas-tools-${ground}-${scheme}-grid-seat.png`, dir).pathname, clip: { x: gb.x, y: gb.y, width: gb.width, height: gb.height } }); } }
                if (SHOTS && k === 0) await p.screenshot({ path: `${SHOTS}/${tag}-${engine}-${page}-${ground}-${scheme}-open.png` });
                await p.keyboard.press("Escape").catch(() => {});
                await p.mouse.click(4, VW < 800 ? 830 : 890); await p.mouse.move(2, 2); await sleep(500);
            }
            if (errors.length) out.cells.push({ page, ground, scheme, errors });
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    const cs = out.cells.filter((c) => c.n != null);
    const loose = out.cells.filter((c) => c.page === "loose" && c.looseFails);
    out.summary = {
        cells: cs.length,
        failing: cs.filter((c) => c.fails.length).length,
        minText: Math.min(...cs.flatMap((c) => c.all.filter((x) => x.kind === "text").map((x) => x.cr))),
        minIcon: Math.min(...cs.flatMap((c) => c.all.filter((x) => x.kind === "icon").map((x) => x.cr))),
        marks: cs.flatMap((c) => c.marks ?? []).length,
        markFails: cs.flatMap((c) => c.markFails ?? []).length,
        minMark: Math.min(...cs.flatMap((c) => (c.marks ?? []).map((m) => m.mark))),
        hoverReads: cs.flatMap((c) => (c.hover ?? []).filter((m) => m.hover)).length,
        hoverFails: cs.flatMap((c) => c.hoverFails ?? []).length,
        hoverNotes: cs.flatMap((c) => c.hoverNotes ?? []).length,
        unsettledFails: cs.flatMap((c) => c.all.filter((x) => x.unsettled)).length,
        unsettledSteady: cs.flatMap((c) => c.all.filter((x) => x.unsettled && x.steadyOp)).length,
        notOpened: out.cells.filter((c) => c.opened === false).length,
        minHover: Math.min(...cs.flatMap((c) => (c.hover ?? []).filter((m) => m.hover).map((m) => m.hover.againstCurrent))),
        looseFails: loose.flatMap((c) => c.looseFails).length,
        schemeMismatch: out.cells.filter((c) => c.scheme_read && c.scheme_read !== c.scheme).length,
    };
    writeFileSync(new URL(`../../logs/m8-ink-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out));
    console.log(JSON.stringify(out.summary));
    for (const c of cs.filter((c) => c.fails.length || c.markFails?.length || c.hoverFails?.length)) console.log(`${c.page} ${c.ground} ${c.scheme} ${c.posture}${c.dock ? " " + c.dock : ""}: ${[...c.fails.map((f) => `${f.kind} ${f.text} ${f.cr}${f.unsettled ? " (unsettled, op " + f.op + (f.steadyOp ? ", the same on both reads" : "") + ")" : ""}`), ...(c.markFails ?? []), ...(c.hoverFails ?? [])].join(", ")}`);
    for (const c of out.cells.filter((c) => c.opened === false)) console.log(`${c.page} ${c.ground} ${c.scheme} ${c.dock}: did not open (not judged)`);
    for (const c of loose.filter((c) => c.looseFails.length)) console.log(`loose ${c.ground} ${c.scheme}: ${c.looseFails.join(", ")}`);
    for (const c of out.cells.filter((c) => c.plate)) console.log(`plate ${c.page} ${c.ground} ${c.scheme} ${c.posture}${c.dock ? " " + c.dock : ""}: ${c.plate.map((x) => `${x.dock} ${x.plateVsField} (spread ${x.spread})`).join("; ")}`);
}
