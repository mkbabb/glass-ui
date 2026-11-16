// ink7.mjs <port> <tag> [--engine chromium|webkit] [--pages a,b] [--css file --label name] [--shots dir] [--base log]:
// MEASURE-7, G-15 with RU-56's and RU-57's clauses as amended (fold 6: R-1, R-2, C6-M2, C6-M3, C-7). ink.mjs (P3's
// instrument, unchanged: every word 4.5:1 and every glyph 3:1 against what is painted behind it) on the ten
// compositions and the loose cell, folded and open, dark and light, over the stage's field and a flat ground, at 1440,
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
const BASE = val("--base", null) && existsSync(val("--base")) ? JSON.parse(readFileSync(val("--base"), "utf8")) : null;
const HOVER_MIN = +val("--hover", "1.2");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// RU-56's marks: a dock seat or a segment that says it is current (a pager's dots are their own indicator, not a fill).
const MARK_SEL = ":is(.dock-icon-button, .dock-tab-button, .segmented-tab, [role='tab']):is([aria-current='page'], [aria-current='true'], [data-active]:not([data-active='false']), [aria-selected='true'])";
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
    const bgOf = (r) => modal(boxPts({ left: Math.max(0, r.left), top: Math.max(0, r.top), right: Math.min(img.width - 1, r.right), bottom: Math.min(img.height - 1, r.bottom) }));
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
            const bg = bgOf({ left: it.rect.left - 3, top: it.rect.top - 2, right: it.rect.right + 3, bottom: it.rect.bottom + 2 });
            if (!bg) continue;
            const al = c[3] * op; const mix = [0, 1, 2].map((i) => c[i] * al + bg[i] * (1 - al));
            const cr = +CR(mix, bg).toFixed(2);
            ink.push({ dock: d.getAttribute("aria-label"), kind: it.kind, text: it.text, cr, need: it.kind === "text" ? 4.5 : 3, pass: cr >= (it.kind === "text" ? 4.5 : 3) });
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
        const fill = modal(boxPts(r)), ground = modal(ringPts(r, 2, 2));
        if (!fill || !ground) continue;
        const name = m.getAttribute("aria-label") || m.textContent.trim().slice(0, 12) || m.className.toString().slice(0, 20);
        const out = { dock: only === "loose" ? "loose" : d.getAttribute("aria-label"), name, mark: +CR(fill, ground).toFixed(3), fill: fill.map(Math.round), ground: ground.map(Math.round) };
        if (hovered) {
            const h = document.querySelector(`[data-ink7-hover]`);
            if (h && h.parentElement === m.parentElement) { const hr = h.getBoundingClientRect(); const hf = modal(boxPts(hr)); out.hover = { name: h.getAttribute("aria-label") || h.textContent.trim().slice(0, 12), againstCurrent: +CR(hf, fill).toFixed(3), againstGround: +CR(hf, modal(ringPts(hr, 2, 2))).toFixed(3), fill: hf.map(Math.round) }; }
        }
        marks.push(out);
    }
    const boxes = docks.map((d) => { const r = d.getBoundingClientRect(); return { dock: d.getAttribute("aria-label"), rect: [r.left, r.top, r.right, r.bottom], color: modal(boxPts(r))?.map(Math.round) }; });
    return { ink, marks, boxes, CRs: null };
};
// the field under a dock: the same box's modal colour with the dock hidden
const fieldUnder = async (p, boxes) => {
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
            let best = null; for (const e of bins.values()) if (!best || e[3] > best[3]) best = e;
            const f = best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null;
            return { dock: b.dock, plate: b.color, field: f?.map(Math.round), plateVsField: f && b.color ? +CR(b.color, f).toFixed(3) : null };
        });
    }, { shotB64: shot, boxes });
    await p.evaluate(() => { for (const d of document.querySelectorAll("[data-story-stage] .glass-dock")) d.style.removeProperty("visibility"); });
    await sleep(80);
    return r;
};
const out = { engine, label: LABEL, css: CSS, hoverMin: HOVER_MIN, cells: [] };
let browser;
const baseMark = (page, ground, scheme, dock, name) => {
    if (!BASE) return null;
    const c = BASE.cells.find((c) => c.page === page && c.ground === ground && c.scheme === scheme && c.posture === "open" && (c.dock === dock || page === "loose"));
    const m = c?.marks?.find((m) => m.name === name);
    return m ? m.mark : null;
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    for (const page of PAGES) for (const ground of ["field", "flat"]) for (const scheme of ["dark", "light"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        if (CSS) await ctx.addInitScript((css) => { addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.setAttribute("data-g15-state", ""); st.textContent = css; document.head.appendChild(st); }); }, CSS);
        try {
            const p = await ctx.newPage();
            const errors = [];
            p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 160)));
            await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${page}&ground=${ground}${scheme === "dark" ? "&scheme=dark" : ""}`);
            await p.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 }).catch(() => {});
            await p.waitForSelector(page === "loose" ? "[data-testid=loose-row]" : "[data-story-stage] .glass-dock", { timeout: 15000 });
            await sleep(2500);
            await p.mouse.move(2, 2);
            await sleep(400);
            const shoot = async (only, hovered) => p.evaluate(READ, { shotB64: (await p.screenshot({ type: "png" })).toString("base64"), only, hovered, MARK_SEL });
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
                const hv = rh.marks[0]?.hover?.againstGround ?? null;
                cell.looseFails = [];
                if (cell.base && cell.base.mark != null && cell.mark != null && Math.abs(cell.mark - cell.base.mark) > 0.02) cell.looseFails.push(`current fill ${cell.mark} against v11.0.2 ${cell.base.mark}`);
                if (cell.base && cell.base.hover != null && hv != null && Math.abs(hv - cell.base.hover) > 0.02) cell.looseFails.push(`hover fill ${hv} against v11.0.2 ${cell.base.hover}`);
                out.cells.push(cell);
                if (errors.length) out.cells.push({ page, ground, scheme, errors });
                continue;
            }
            const folded = await shoot(null, false);
            const pf = await fieldUnder(p, folded.boxes);
            out.cells.push({ page, ground, scheme, scheme_read: sch, posture: "folded", n: folded.ink.length, min: folded.ink.length ? Math.min(...folded.ink.map((x) => x.cr)) : null, fails: folded.ink.filter((x) => !x.pass), all: folded.ink, plate: pf });
            if (SHOTS) { mkdirSync(SHOTS, { recursive: true }); await p.screenshot({ path: `${SHOTS}/${tag}-${engine}-${page}-${ground}-${scheme}-folded.png` }); }
            const docks = await p.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock")].map((d) => d.getAttribute("aria-label")));
            for (let k = 0; k < docks.length; k++) {
                const box = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, top: r.y, open: d.classList.contains("expanded") }; }, k);
                if (!box.open) {
                    await p.mouse.move(box.x - 6, box.y); await p.mouse.move(box.x, box.y, { steps: 3 }); await sleep(900);
                    const open = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                    if (!open) { await p.mouse.click(box.x, box.y); await sleep(900); }
                }
                const isOpen = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                const r = await shoot(docks[k], false);
                // the pointer off the dock (above it), the linger still holding it open: the marks at rest
                const nb = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, top: r.y, bottom: r.y + r.height }; }, k);
                await p.mouse.move(nb.x, nb.top > 40 ? nb.top - 24 : nb.bottom + 24, { steps: 2 }); await sleep(450);
                const rm = await shoot(docks[k], false);
                const pf2 = await fieldUnder(p, rm.boxes);
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
                if (hb && rm.marks.length) {
                    await p.mouse.move(hb.x, hb.y, { steps: 3 }); await sleep(450);
                    hov = (await shoot(docks[k], true)).marks;
                }
                const marks = rm.marks.map((m) => ({ ...m, base: baseMark(page, ground, scheme, docks[k], m.name) }));
                const markFails = marks.filter((m) => m.base != null && m.mark < m.base - 0.02).map((m) => `mark ${m.name} ${m.mark} < v11.0.2 ${m.base}`);
                const hoverFails = (hov ?? []).filter((m) => m.hover && m.hover.againstCurrent < HOVER_MIN).map((m) => `hover ${m.hover.name} against current ${m.name} ${m.hover.againstCurrent} < ${HOVER_MIN}`);
                out.cells.push({ page, ground, scheme, scheme_read: sch, posture: "open", dock: docks[k], opened: isOpen, n: r.ink.length, min: r.ink.length ? Math.min(...r.ink.map((x) => x.cr)) : null, fails: r.ink.filter((x) => !x.pass), all: r.ink, marks, hover: hov, markFails, hoverFails, plate: pf2 });
                if (SHOTS && k === 0) await p.screenshot({ path: `${SHOTS}/${tag}-${engine}-${page}-${ground}-${scheme}-open.png` });
                await p.keyboard.press("Escape").catch(() => {});
                await p.mouse.click(4, 890); await p.mouse.move(2, 2); await sleep(500);
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
        minHover: Math.min(...cs.flatMap((c) => (c.hover ?? []).filter((m) => m.hover).map((m) => m.hover.againstCurrent))),
        looseFails: loose.flatMap((c) => c.looseFails).length,
        schemeMismatch: out.cells.filter((c) => c.scheme_read && c.scheme_read !== c.scheme).length,
    };
    writeFileSync(new URL(`../../logs/m7-ink-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out));
    console.log(JSON.stringify(out.summary));
    for (const c of cs.filter((c) => c.fails.length || c.markFails?.length || c.hoverFails?.length)) console.log(`${c.page} ${c.ground} ${c.scheme} ${c.posture}${c.dock ? " " + c.dock : ""}${c.opened === false ? " (did not open)" : ""}: ${[...c.fails.map((f) => `${f.kind} ${f.text} ${f.cr}`), ...(c.markFails ?? []), ...(c.hoverFails ?? [])].join(", ")}`);
    for (const c of loose.filter((c) => c.looseFails.length)) console.log(`loose ${c.ground} ${c.scheme}: ${c.looseFails.join(", ")}`);
    for (const c of out.cells.filter((c) => c.plate)) console.log(`plate ${c.page} ${c.ground} ${c.scheme} ${c.posture}${c.dock ? " " + c.dock : ""}: ${c.plate.map((x) => `${x.dock} ${x.plateVsField}`).join("; ")}`);
}
