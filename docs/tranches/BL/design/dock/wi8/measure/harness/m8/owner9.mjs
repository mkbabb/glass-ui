// owner9.mjs <port> <out-dir> [--engine chromium|webkit] [--only set,...] [--label build|proto]: MEASURE-8 H7 (RU-83 as
// amended for R7-2, R7-9, C7-2, C7-M1; RU-69). The frames for the owner's questions 13, 14, 17 and 18 and the seat-set
// strip, and two readings, on the pass's build (Q10's frames, the wash row and the fission frames are m8/plate8.mjs's,
// which records plate against field and show-through beside each frame). m7/owner8.mjs's rules: a dock is opened only
// when folded and by its folded face; every frame records the document's scheme and the dock's posture at the shot, and
// m8/strips8.py refuses a frame whose scheme or posture is not its label's. Crops are clamped to the stage's box.
//   q13      w-many at 390 on a touch, open: an icon seat pressed and held 700 ms (what a phone shows when held)
//   q14      w-atlas's head row at 1440, folded, open, and 1 s into the linger: the label states the legend's shift in px
//            and the plate's cover of it in px², read from the frame's own boxes, cropped to the row.
//            With --label proto (run on the dev server with m7/ru61.patch applied): the same row and w-inflow's row,
//            cropped to the row, labelled as RU-61's prototype
//   q17      row 1 share 0.5 (v11.0.2's), row 2 share 0.9 (this build), row 3 every icon seat sized from the words (1.5 em),
//            the theme seat included, each row's Find and theme glyph sizes in its label; row 4 w-glyphs's tab dock with
//            the glyph and word spaced as Home Assistant spaces them (tabs.css:68-70, `.dock-word` margin
//            var(--icon-label-gap)) and pictures (a landscape drawing) for the img and picture seats; row 5 a tab glyph at a
//            14 px word (1.5 em, 21 px) beside a lucide glyph at its own 24 px
//   q18      nav at 1440, the pointer resting on Home beside the current page (Reports): hover at 5, 6.5 and 8 % (P0a's
//            range) over the current step taken (20 %), and the build's 10 % as a labelled reference; each label carries
//            the hover against current and against its own ground, read from the frame's pixels
//   seatset  w-seatset at 1440: opened by hover, the pointer then leaves the dock, and the seat is added within the
//            linger; eight frames 25 ms apart
//   veil     RU-69's reading: with the control row's CSS (m7/states/ladder-today.css) injected, and without it, the computed
//            --glass-veil-dock, --dock-plate-collapsed-tier, --glass-veil-tier and --glass-veil-rung on the pill's
//            .dock-plate, folded and open, both schemes
//   scroll   the Q10 compositions (nav, pill) at 390 on a touch: document scrollWidth against clientWidth, both schemes
// One browser, a context per cell, closed in finally. Writes <out>/<set>.<label>.<engine>.<k>.png and
// <out>/owner9.<label>.<engine>.json.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, out] = a;
const engine = val("--engine", "chromium");
const ONLY = val("--only", null);
const LABEL = val("--label", "build");
const want = (k) => !ONLY || ONLY.split(",").includes(k);
const TODAY_CSS = readFileSync(new URL("../m7/states/ladder-today.css", import.meta.url), "utf8");
mkdirSync(out, { recursive: true });
const meta = [];
let curPage = null;
const schemeOf = (p) => p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
const postureOf = (p, sel) => p.evaluate((s) => { const d = document.querySelector(s); return d ? (d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest") : null; }, sel);
const push = async (m) => { m.scheme = curPage ? await schemeOf(curPage).catch(() => null) : null; if (m.dock && curPage) m.posture = await postureOf(curPage, m.dock).catch(() => null); meta.push(m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
async function cell({ w, scheme, url, css, coarse }, fn) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, deviceScaleFactor: 2, colorScheme: scheme, ...(coarse ? { hasTouch: true, ...(engine === "chromium" ? { isMobile: true } : {}) } : {}) });
    if (css) await ctx.addInitScript((c) => addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.textContent = c; document.head.appendChild(st); }), css);
    try {
        const p = await ctx.newPage();
        curPage = p;
        await p.goto(`http://127.0.0.1:${port}/${url}${scheme === "dark" ? "&scheme=dark" : ""}`);
        await p.waitForFunction(() => window.__animReady === true, null, { timeout: 30000 }).catch(() => {});
        if (scheme === "dark") await p.evaluate(() => document.documentElement.classList.add("dark"));
        await sleep(2200);
        return await fn(p);
    } finally {
        await ctx.close();
    }
}
// a crop around an element, clamped to the stage's box (the comp page's stage, else the harness stage) and the viewport
const crop = async (p, sel, file, pad = 24) => {
    const b = await p.locator(sel).first().boundingBox();
    const st = await p.evaluate(() => { const s = document.querySelector("[data-testid=comp-stage]") ?? document.querySelector("[data-testid=wi8-stage]"); const r = s?.getBoundingClientRect(); return r ? [r.left, r.top, r.right, r.bottom] : null; });
    const vp = p.viewportSize();
    const lim = st ? [Math.max(0, st[0]), Math.max(0, st[1]), Math.min(vp.width, st[2]), Math.min(vp.height, st[3])] : [0, 0, vp.width, vp.height];
    const x0 = Math.max(lim[0], b.x - pad), y0 = Math.max(lim[1], b.y - pad), x1 = Math.min(lim[2], b.x + b.width + pad), y1 = Math.min(lim[3], b.y + b.height + pad);
    await p.screenshot({ path: file, clip: { x: x0, y: y0, width: Math.max(1, x1 - x0), height: Math.max(1, y1 - y0) } });
};
const isOpen = (p, sel) => p.evaluate((s) => document.querySelector(s)?.classList.contains("expanded") ?? false, sel);
const openDock = async (p, sel, coarse) => {
    if (await isOpen(p, sel)) return true;
    const face = p.locator(`${sel} .dock-layer--summary`).first();
    const b = (await face.count()) ? await face.boundingBox() : null;
    if (!b || b.width < 2) return false;
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    if (coarse) await p.touchscreen.tap(cx, cy);
    else { await p.mouse.move(b.x - 8, cy); await p.mouse.move(cx, cy, { steps: 3 }); }
    await sleep(1000);
    if (!(await isOpen(p, sel)) && !coarse) { await p.mouse.click(cx, cy); await sleep(900); }
    return isOpen(p, sel);
};
// a seat's fill (its box's modal colour with its own ink masked) against another's and against the ring outside it
const fillsOf = async (p, aSel, bSel) => {
    const shot = (await p.screenshot({ type: "png" })).toString("base64");
    return p.evaluate(async ({ shot, aSel, bSel }) => {
        const bin = Uint8Array.from(atob(shot), (c) => c.charCodeAt(0));
        const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
        const c2 = new OffscreenCanvas(bmp.width, bmp.height); const g = c2.getContext("2d", { willReadFrequently: true }); g.drawImage(bmp, 0, 0);
        const img = g.getImageData(0, 0, bmp.width, bmp.height);
        const sx = bmp.width / innerWidth;
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = (q) => 0.2126 * lin(q[0]) + 0.7152 * lin(q[1]) + 0.0722 * lin(q[2]);
        const CR = (u, v) => { const x = L(u), y = L(v); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        const px = (x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
        const modal = (pts) => { const m = new Map(); for (const q of pts) { const k = (q[0] >> 4) * 256 + (q[1] >> 4) * 16 + (q[2] >> 4); const e = m.get(k) || [0, 0, 0, 0]; e[0] += q[0]; e[1] += q[1]; e[2] += q[2]; e[3]++; m.set(k, e); } let best = null; for (const e of m.values()) if (!best || e[3] > best[3]) best = e; return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null; };
        const fill = (el) => { const r = el.getBoundingClientRect(); const oc = new OffscreenCanvas(1, 1).getContext("2d"); oc.fillStyle = getComputedStyle(el).color; oc.fillRect(0, 0, 1, 1); const ink = [...oc.getImageData(0, 0, 1, 1).data].slice(0, 3); const pts = []; for (let y = Math.ceil(r.top * sx); y < Math.floor(r.bottom * sx); y++) for (let x = Math.ceil(r.left * sx); x < Math.floor(r.right * sx); x++) { const q = px(x, y); if (CR(q, ink) >= 1.6) pts.push(q); } return modal(pts); };
        const ring = (el) => { const r = el.getBoundingClientRect(); const pts = []; for (let y = Math.floor((r.top - 4) * sx); y < Math.ceil((r.bottom + 4) * sx); y++) for (let x = Math.floor((r.left - 4) * sx); x < Math.ceil((r.right + 4) * sx); x++) { const inner = x >= (r.left - 1) * sx && x < (r.right + 1) * sx && y >= (r.top - 1) * sx && y < (r.bottom + 1) * sx; if (!inner && x >= 0 && y >= 0 && x < img.width && y < img.height) pts.push(px(x, y)); } return modal(pts); };
        const A = document.querySelector(aSel), B = document.querySelector(bSel);
        if (!A || !B) return null;
        const fa = fill(A), fb = fill(B), ga = ring(A);
        return { hover: fa?.map(Math.round), current: fb?.map(Math.round), ground: ga?.map(Math.round), againstCurrent: fa && fb ? +CR(fa, fb).toFixed(2) : null, againstGround: fa && ga ? +CR(fa, ga).toFixed(2) : null };
    }, { shot, aSel, bSel });
};
const DOCK = "[data-story-stage] .glass-dock";
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    let k = 0;
    if (want("q13") && LABEL === "build") await cell({ w: 390, scheme: "light", url: "?c=dock-wi8&cell=w-many", coarse: true }, async (p) => {
        const opened = await openDock(p, "[data-testid=w-many]", true); await sleep(500);
        const s = await p.evaluate(() => { const d = document.querySelector("[data-testid=w-many]"); const run = d.querySelector(".dock-run") ?? d; const rb = run.getBoundingClientRect(); const e = [...d.querySelectorAll(".dock-icon-button")].find((x) => { const b = x.getBoundingClientRect(); return b.width > 8 && b.left >= rb.left && b.right <= rb.right && !x.hasAttribute("aria-current"); }); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, name: e.getAttribute("aria-label") || e.textContent.trim() }; });
        if (!s) { await push({ set: "q13", label: `w-many at 390: no icon seat in view (opened ${opened})` }); return; }
        const cdp = engine === "chromium" ? await p.context().newCDPSession(p) : null;
        if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: s.x, y: s.y }] });
        else await p.evaluate(({ x, y }) => { const t = document.elementFromPoint(x, y); const touch = new Touch({ identifier: 1, target: t, clientX: x, clientY: y }); t.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "touch", isPrimary: true, clientX: x, clientY: y, bubbles: true })); t.dispatchEvent(new TouchEvent("touchstart", { touches: [touch], targetTouches: [touch], changedTouches: [touch], bubbles: true, cancelable: true })); }, s).catch(() => {});
        await sleep(700);
        const tips = await p.evaluate(() => [...document.querySelectorAll("[role=tooltip]")].filter((t) => t.checkVisibility()).map((t) => t.textContent.trim()));
        const menus = await p.evaluate(() => [...document.querySelectorAll("[role=menu], [role=listbox]")].filter((t) => t.checkVisibility()).length);
        const file = `${out}/q13.${LABEL}.${engine}.${k++}.png`;
        await crop(p, "[data-testid=w-many]", file, 60);
        await push({ set: "q13", file, dock: "[data-testid=w-many]", label: `a phone (390 px, touch): the ${s.name} icon seat pressed and held 700 ms on a dock of many seats; a name shows: ${tips.length ? tips.join(", ") : "none"}${menus ? "; a menu opened" : ""}; light`, tips, wanted: "open" });
        if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }).catch(() => {});
    });
    k = 0;
    if (want("q14")) for (const scheme of ["light", "dark"]) {
        const rows = LABEL === "proto" ? [["w-atlas", "w-atlas-row", "w-atlas-legend", "atlas's head row"], ["w-inflow", "w-inflow-row", "w-inflow-beside", "an in-flow dock beside a legend"]] : [["w-atlas", "w-atlas-row", "w-atlas-legend", "atlas's head row"]];
        for (const [id, row, nb, what] of rows) await cell({ w: 1440, scheme, url: `?c=dock-wi8&cell=${id}` }, async (p) => {
            const box = (sel) => p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }, sel);
            const read = async () => { const d = await p.evaluate((id) => { const e = document.querySelector(`[data-testid=${id}]`); const r = (e.querySelector(":scope > .dock-plate") ?? e).getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }, id); const l = await box(`[data-testid=${nb}]`); const cov = Math.round(Math.max(0, Math.min(d[2], l[2]) - Math.max(d[0], l[0])) * Math.max(0, Math.min(d[3], l[3]) - Math.max(d[1], l[1]))); return { d, l, cov }; };
            const who = LABEL === "proto" ? "RU-61's prototype (not this build)" : "this build";
            await p.mouse.move(2, 880); await sleep(400);
            const r0 = await read();
            const shot = async (label, wanted, extra = {}) => { const file = `${out}/q14.${LABEL}.${engine}.${k++}.png`; await crop(p, `[data-testid=${row}]`, file, 16); await push({ set: "q14", file, dock: `[data-testid=${id}]`, wanted, label: `${what}, ${who}: ${label}; 1440 px wide; ${scheme}`, ...extra }); };
            await shot("the dock folded", "folded");
            await openDock(p, `[data-testid=${id}]`, false); await sleep(600);
            const r1 = await read();
            const shift = Math.round(Math.max(Math.abs(r1.l[0] - r0.l[0]), Math.abs(r1.l[2] - r0.l[2])));
            await shot(`the dock open: it moves the legend ${shift} px and covers ${r1.cov} px² of it`, "open", { shift, cover: r1.cov });
            await p.mouse.move(700, 880, { steps: 3 }); await sleep(1000);
            const r2 = await read();
            await shot(`1 s after the pointer leaves (the linger): the legend ${Math.round(Math.abs(r2.l[0] - r0.l[0]))} px from its folded place, ${r2.cov} px² covered`, (await isOpen(p, `[data-testid=${id}]`)) ? "open" : "folded");
        });
    }
    k = 0;
    if (want("q17") && LABEL === "build") {
        const sizes = () => curPage.evaluate(() => { const d = document.querySelector("[data-story-stage] .glass-dock"); const find = [...d.querySelectorAll("button, [role=button]")].find((b) => /find|search/i.test(b.getAttribute("aria-label") ?? "")); const theme = [...d.querySelectorAll("button, [role=button]")].find((b) => /theme|dark|light|mode/i.test(b.getAttribute("aria-label") ?? "")); const g = (b) => { const s = b?.querySelector("svg"); const r = s?.getBoundingClientRect(); return r ? `${r.width.toFixed(1)} px` : "none"; }; const word = d.querySelector(".dock-tab-button"); return { find: g(find), theme: g(theme), word: word ? getComputedStyle(word).fontSize : "" }; });
        const ROWS = [
            ["share 0.5 of the seat (v11.0.2's)", ".glass-dock { --dock-icon-glyph-ratio: 0.5; }"],
            ["share 0.9 of the seat (this build)", ""],
            ["every icon seat sized from the words beside it (1.5 em), the theme seat included", ".glass-dock .dock-icon-button svg, .glass-dock [data-glass-dock-seat] > svg, .glass-dock .dock-icon-button > * > svg, .glass-dock .dark-mode-toggle-button > svg { inline-size: 1.5em !important; block-size: 1.5em !important; width: 1.5em !important; height: 1.5em !important; } .glass-dock .dark-mode-toggle-button { font-size: inherit; }"],
        ];
        for (const [label, css] of ROWS) for (const scheme of ["light", "dark"]) {
            const file = `${out}/q17.${LABEL}.${engine}.${k++}.png`;
            await cell({ w: 1440, scheme, url: "?c=dock-comp&page=nav&ground=field", css }, async (p) => {
                const s = await sizes();
                await crop(p, DOCK, file);
                await push({ set: "q17", file, dock: DOCK, wanted: "open", label: `icon seats beside worded tabs, ${label}: Find's glyph ${s.find}, the theme seat's ${s.theme}, the words ${s.word}; 1440 px wide; ${scheme}` });
            });
        }
        const SPACE = ".glass-dock .dock-word { margin-inline-start: var(--icon-label-gap); }";
        for (const scheme of ["light", "dark"]) {
            const file = `${out}/q17.${LABEL}.${engine}.${k++}.png`;
            await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-glyphs", css: SPACE }, async (p) => {
                const g = await p.evaluate(() => [...document.querySelectorAll("[data-testid=w-glyphs-tab] .dock-tab-button")].map((b) => { const gl = b.querySelector(":scope > :is(svg, img, picture)"); const w = b.querySelector(".dock-word"); const r = gl?.getBoundingClientRect(), q = w?.getBoundingClientRect(); return `${w?.textContent.trim()} ${r ? r.width.toFixed(1) : "?"} px, ${r && q ? (q.left - r.right).toFixed(1) : "?"} px to its word`; }).join("; "));
                await crop(p, "[data-testid=w-glyphs-tab]", file);
                await push({ set: "q17", file, dock: "[data-testid=w-glyphs-tab]", wanted: "open", label: `a glyph and its word inside one tab, spaced as Home Assistant spaces them; the image and picture seats hold a picture: ${g}; 1440 px wide; ${scheme}` });
            });
        }
        const PAIR = ".glass-dock .dock-word { margin-inline-start: var(--icon-label-gap); } [data-testid=w-glyphs-tab] .dock-tab-button { font-size: 14px; } [data-testid=w-glyphs-tab] .dock-tab-button:first-child > svg { inline-size: 24px !important; block-size: 24px !important; width: 24px !important; height: 24px !important; }";
        for (const scheme of ["light"]) {
            const file = `${out}/q17.${LABEL}.${engine}.${k++}.png`;
            await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-glyphs", css: PAIR }, async (p) => {
                const g = await p.evaluate(() => [...document.querySelectorAll("[data-testid=w-glyphs-tab] .dock-tab-button")].map((b) => { const gl = b.querySelector(":scope > :is(svg, img, picture)"); const r = gl?.getBoundingClientRect(); return `${b.querySelector(".dock-word")?.textContent.trim()} ${r ? r.width.toFixed(1) : "?"} px`; }));
                await crop(p, "[data-testid=w-glyphs-tab]", file);
                await push({ set: "q17", file, dock: "[data-testid=w-glyphs-tab]", wanted: "open", label: `14 px words: Home's glyph at lucide's own 24 px (${g[0]}), the others at 1.5 em of the word (${g.slice(1).join(", ")}); 1440 px wide; ${scheme}` });
            });
        }
    }
    k = 0;
    if (want("q18") && LABEL === "build") {
        const H = [["5 %", 5], ["6.5 %", 6.5], ["8 %", 8], ["10 % (the build's, for reference)", 10]];
        for (const [name, pct] of H) for (const scheme of ["light", "dark"]) {
            const file = `${out}/q18.${LABEL}.${engine}.${k++}.png`;
            const css = pct === 10 ? "" : `.glass-dock { --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) ${pct}%, transparent); }`;
            await cell({ w: 1440, scheme, url: "?c=dock-comp&page=nav&ground=field", css }, async (p) => {
                const hb = await p.evaluate(() => { const d = document.querySelector("[data-story-stage] .glass-dock"); const cur = d.querySelector("[aria-current]"); const home = [...d.querySelectorAll(".dock-tab-button")].find((c) => /home/i.test(c.textContent)); home.setAttribute("data-owner-hover", ""); cur.setAttribute("data-owner-current", ""); const b = home.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, cur: cur.textContent.trim() }; });
                await p.mouse.move(hb.x, hb.y - 40); await p.mouse.move(hb.x, hb.y, { steps: 3 }); await sleep(700);
                const r = await fillsOf(p, "[data-owner-hover]", "[data-owner-current]");
                await crop(p, DOCK, file);
                await push({ set: "q18", file, dock: DOCK, wanted: "open", pct, readings: r, label: `the pointer rests on Home; ${hb.cur} is the current page (its fill 20 %). Hover at ${name}: against current ${r?.againstCurrent ?? "unread"}:1, against its own ground ${r?.againstGround ?? "unread"}:1; 1440 px wide; ${scheme}` });
            });
        }
    }
    k = 0;
    if (want("seatset") && LABEL === "build") for (const scheme of ["light"]) await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-seatset" }, async (p) => {
        await openDock(p, "[data-testid=w-seatset]", false);
        // the pointer leaves the dock first, so no seat carries a hover fill; the seat is added within the linger
        await p.mouse.move(700, 880, { steps: 3 }); await sleep(150);
        const before = await isOpen(p, "[data-testid=w-seatset]");
        const t0 = Date.now();
        await p.evaluate(() => document.querySelector("[data-testid=w-seatset-add]").click());
        for (let j = 0; j < 8; j++) { const file = `${out}/seatset.${LABEL}.${engine}.${k++}.png`; await crop(p, "[data-testid=w-seatset]", file); await push({ set: "seatset", file, dock: "[data-testid=w-seatset]", wanted: before ? "open" : null, label: `${Date.now() - t0} ms after a seat is added; the pointer is off the dock (the dock open in its linger); ${scheme}` }); await sleep(25); }
    });
    if (want("veil") && LABEL === "build") {
        const res = [];
        for (const scheme of ["light", "dark"]) for (const [ctl, css] of [["the control row's CSS injected", TODAY_CSS], ["nothing injected", ""]]) await cell({ w: 1440, scheme, url: "?c=dock-comp&page=pill&ground=field", css }, async (p) => {
            for (const posture of ["folded", "open"]) {
                if (posture === "open") await openDock(p, DOCK, false);
                const v = await p.evaluate(() => { const pl = document.querySelector("[data-story-stage] .glass-dock .dock-plate"); const cs = getComputedStyle(pl); const d = document.querySelector("[data-story-stage] .glass-dock"); return Object.fromEntries([["--glass-veil-dock", cs], ["--dock-plate-collapsed-tier", cs], ["--glass-veil-tier", cs], ["--glass-veil-rung", cs], ["--glass-level", cs]].map(([k, s]) => [k, s.getPropertyValue(k).trim()]).concat([["background", cs.backgroundColor], ["root --glass-veil-dock", getComputedStyle(document.documentElement).getPropertyValue("--glass-veil-dock").trim()], ["posture", d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest"]])); });
                res.push({ scheme, with: ctl, posture, ...v, schemeRead: await schemeOf(p) });
            }
        });
        meta.push({ set: "veil", readings: res });
        console.log("veil", JSON.stringify(res));
    }
    if (want("scroll") && LABEL === "build") {
        const res = [];
        for (const page of ["nav", "pill"]) for (const scheme of ["light", "dark"]) for (const ground of ["grid", "field", "daraksha"]) await cell({ w: 390, scheme, url: `?c=dock-comp&page=${page}&ground=${ground}`, coarse: true }, async (p) => {
            const v = await p.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
            res.push({ page, ground, scheme, ...v, overflows: v.scrollWidth > v.clientWidth });
        });
        meta.push({ set: "scroll", readings: res });
        console.log("scroll", JSON.stringify(res.map((r) => `${r.page} ${r.ground} ${r.scheme} ${r.scrollWidth}/${r.clientWidth}`)));
    }
} finally {
    if (browser) await browser.close();
    const f = `${out}/owner9.${LABEL}.${engine}.json`;
    let prev = []; try { prev = JSON.parse(readFileSync(f, "utf8")); } catch {}
    const keep = ONLY ? prev.filter((m) => !ONLY.split(",").includes(m.set)) : [];
    writeFileSync(f, JSON.stringify([...keep, ...meta], null, 1));
    console.log(`owner9 frames ${engine} ${LABEL}: ${meta.length}`);
}
