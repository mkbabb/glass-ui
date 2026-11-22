// ownerm.mjs: m9/owner9m.mjs for MEASURE-9 part M. One change: question 18's hover steps are each injected (this build's
// hover is 6.5 % in light and 5 % in dark, tokens/glass.css), and labelled so; the rest is owner9m's, unchanged.
// owner9m.mjs (m9/mkowner9.py writes it from pm/ownerm.mjs; RU-107, RU-122: see that script) <port> <out-dir> [--engine chromium|webkit] [--only set,...] [--label build|proto|today]: MEASURE-8 part M, the
// frames for the owner's questions 14 and 18 to 21 on the measure's one build of the tip (question 10's frames are
// m8/plate8.mjs's; question 12 is a table). m8/owner9.mjs's helpers and rules, unchanged: a dock is opened only when folded
// and by its folded face; every frame records the document's scheme and the dock's posture at the shot, and pm/stripsm.py
// refuses a frame whose scheme or posture is not its label's; crops are clamped to the stage's box. Sets:
//   q14   atlas's head row at 1440, folded, open and 1 s into the linger: the legend's shift in px and the plate's cover of
//         it in px2, read from the frame's own boxes. With --label proto (the tree's dev server with S7's arith prototype,
//         s8/ru61b.py, applied): the same row and the in-flow dock beside a legend, labelled as the overlay not built
//   q18   nav at 1440, the pointer resting on Home beside the current page (Reports, its fill 10 %): hover at 5, 6.5 and
//         8 % (8 % is this build's), and 10 % (the previous build's hover) for reference, each label with the hover
//         against the current page's fill and against the dock behind it, read from the frame's pixels
//   q19   w-g8 at 1440: a dialog opened from a dock seat, a press on the dimmed page behind it, the dock after its pause;
//         beside it a menu opened from a seat and a press outside it
//   q20   the controls dock (w-ctl, four controls) at 1440: at rest, the pointer on it, after its pause; at 390 at rest;
//         one control (w-ctl1)
//   q21   nav (current Reports) and dials (5Y, Lin) in dark on the warm field and on the dark grid: the current seat's
//         words against its patch and the patch against the dock behind it; with --label today on v11.0.2's page
//   scroll the question 10 compositions (nav, pill) at 390 on a touch: scrollWidth against clientWidth, both schemes
// One browser, a context per cell, closed in finally. Writes <out>/<set>.<label>.<engine>.<k>.png and
// <out>/owner9m.<label>.<engine>.json.
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
const GROUND = val("--ground", "");
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
// free: the controls dock sits at the window's corner, outside the stage, so its frames are limited by the viewport only.
const crop = async (p, sel, file, pad = 24, free = false) => {
    const b = await p.locator(sel).first().boundingBox();
    const st = await p.evaluate(() => { const s = document.querySelector("[data-testid=comp-stage]") ?? document.querySelector("[data-testid=wi8-stage]"); const r = s?.getBoundingClientRect(); return r ? [r.left, r.top, r.right, r.bottom] : null; });
    const vp = p.viewportSize();
    const lim = st && !free ? [Math.max(0, st[0]), Math.max(0, st[1]), Math.min(vp.width, st[2]), Math.min(vp.height, st[3])] : [0, 0, vp.width, vp.height];
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
        const inkOf = (el) => { const oc = new OffscreenCanvas(1, 1).getContext("2d"); oc.fillStyle = getComputedStyle(el).color; oc.fillRect(0, 0, 1, 1); return [...oc.getImageData(0, 0, 1, 1).data].slice(0, 3); }; const gb = ring(B); return { hover: fa?.map(Math.round), current: fb?.map(Math.round), ground: ga?.map(Math.round), groundB: gb?.map(Math.round), againstCurrent: fa && fb ? +CR(fa, fb).toFixed(2) : null, againstGround: fa && ga ? +CR(fa, ga).toFixed(2) : null, currentAgainstGround: fb && gb ? +CR(fb, gb).toFixed(2) : null, wordsOnCurrent: fb ? +CR(inkOf(B), fb).toFixed(2) : null };
    }, { shot, aSel, bSel });
};
const DOCK = "[data-story-stage] .glass-dock";

const tipOf = async (p, sel) => p.evaluate((s) => document.querySelector(s)?.classList.contains("collapsed") ? "folded" : document.querySelector(s)?.classList.contains("expanded") ? "open" : "rest", sel);
const waitFold = async (p, sel, ms) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if ((await tipOf(p, sel)) === "folded") return Date.now() - t0; await sleep(100); } return null; };
const stageShot = async (p, file) => {
    const st = await p.evaluate(() => { const s = document.querySelector("[data-testid=wi8-stage]") ?? document.body; const r = s.getBoundingClientRect(); return [Math.max(0, r.left), Math.max(0, r.top), Math.min(innerWidth, r.right), Math.min(innerHeight, r.bottom)]; });
    await p.screenshot({ path: file, clip: { x: st[0], y: st[1], width: st[2] - st[0], height: st[3] - st[1] } });
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    let k = 0;
    if (want("q14") && LABEL !== "today") for (const scheme of ["light", "dark"]) {
        const rows = LABEL === "proto" ? [["w-atlas", "w-atlas-row", "w-atlas-legend", "atlas's figure header"], ["w-inflow", "w-inflow-row", "w-inflow-beside", "a dock in a row beside a legend"]] : [["w-atlas", "w-atlas-row", "w-atlas-legend", "atlas's figure header"]];
        for (const [id, row, nb, what] of rows) await cell({ w: 1440, scheme, url: `?c=dock-wi8&cell=${id}` }, async (p) => {
            const box = (sel) => p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }, sel);
            const read = async () => { const d = await p.evaluate((id) => { const e = document.querySelector(`[data-testid=${id}]`); const r = (e.querySelector(":scope > .dock-plate") ?? e).getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }, id); const l = await box(`[data-testid=${nb}]`); const cov = Math.round(Math.max(0, Math.min(d[2], l[2]) - Math.max(d[0], l[0])) * Math.max(0, Math.min(d[3], l[3]) - Math.max(d[1], l[1]))); return { d, l, cov }; };
            const who = LABEL === "proto" ? "the overlay that is not built (a prototype)" : "this build";
            if (GROUND) await p.evaluate((g) => { document.documentElement.style.background = g; document.body.style.background = g; for (const s of document.querySelectorAll("[data-testid=wi8-stage], [data-story-stage]")) s.style.background = g; }, GROUND);
            const groundAt = () => p.evaluate(() => { const s = document.querySelector("[data-testid=wi8-stage]") ?? document.body; return getComputedStyle(s).backgroundColor; });
            await p.mouse.move(2, 880); await sleep(400);
            const r0 = await read();
            const shot = async (label, wanted, extra = {}) => { const file = `${out}/q14.${LABEL}.${engine}.${k++}.png`; await crop(p, id === "w-inflow" ? `[data-testid=${id}] .dock-plate` : `[data-testid=${row}]`, file, 16); await push({ set: "q14", ground: await groundAt(), row: id, file, dock: `[data-testid=${id}]`, wanted, label: `${what}, ${who}: ${label}; ${scheme}`, ...extra }); };
            await shot("the dock folded", "folded");
            await openDock(p, `[data-testid=${id}]`, false); await sleep(600);
            const r1 = await read();
            const shift = Math.round(Math.max(Math.abs(r1.l[0] - r0.l[0]), Math.abs(r1.l[2] - r0.l[2])));
            await shot(`the dock open: the legend moves ${shift} px, ${r1.cov} px² of it lies under the dock`, "open", { shift, cover: r1.cov });
            await p.mouse.move(700, 880, { steps: 3 }); await sleep(1000);
            const r2 = await read();
            await shot(`1 s after the pointer leaves, the dock still open: the legend ${Math.round(Math.abs(r2.l[0] - r0.l[0]))} px from its place, ${r2.cov} px² under the dock`, (await isOpen(p, `[data-testid=${id}]`)) ? "open" : "folded", { shift2: Math.round(Math.abs(r2.l[0] - r0.l[0])), cover2: r2.cov });
        });
    }
    k = 0;
    if (want("q18") && LABEL === "build") {
        const HV = [["5 % (this build's in dark)", 5], ["6.5 % (this build's in light)", 6.5], ["8 %", 8], ["10 % (the current page's own step, for reference)", 10]];
        for (const [name, pct] of HV) for (const scheme of ["light", "dark"]) {
            const file = `${out}/q18.${LABEL}.${engine}.${k++}.png`;
            const css = `.glass-dock { --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) ${pct}%, transparent); }`;
            await cell({ w: 1440, scheme, url: "?c=dock-comp&page=nav&ground=field", css }, async (p) => {
                const hb = await p.evaluate(() => { const d = document.querySelector("[data-story-stage] .glass-dock"); const cur = d.querySelector("[aria-current]"); const home = [...d.querySelectorAll(".dock-tab-button")].find((c) => /home/i.test(c.textContent)); home.setAttribute("data-owner-hover", ""); cur.setAttribute("data-owner-current", ""); const b = home.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, cur: cur.textContent.trim() }; });
                await p.mouse.move(hb.x, hb.y - 40); await p.mouse.move(hb.x, hb.y, { steps: 3 }); await sleep(700);
                const r = await fillsOf(p, "[data-owner-hover]", "[data-owner-current]");
                await crop(p, DOCK, file);
                await push({ set: "q18", file, dock: DOCK, wanted: "open", pct, readings: r, label: `the pointer rests on Home; ${hb.cur} is the current page (its highlight 10 % of the text colour). Hover at ${name}: it stands ${r?.againstCurrent ?? "?"}:1 from the current page's highlight and ${r?.againstGround ?? "?"}:1 from the dock behind it; ${scheme}` });
            });
        }
    }
    k = 0;
    if (want("q19") && LABEL === "build") for (const scheme of ["light"]) {
        await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-g8" }, async (p) => {
            const D = "[data-testid=w-g8]";
            await openDock(p, D, false);
            await p.locator("[data-testid=w-g8-dialog]").click(); await sleep(700);
            // Open means reka's data-state="open": a closing dialog keeps its node (and checkVisibility) through its exit fade.
            const dlg = () => p.evaluate(() => document.querySelector("[data-testid=w-g8-dialog-content]")?.getAttribute("data-state") === "open");
            let f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await crop(p, "[data-testid=w-g8-dialog-content]", f, 24, true);
            await push({ set: "q19", file: f, dock: D, wanted: "open", first: true, label: `a dialog opened from a dock button, its title legible; the page behind it is dimmed and the dock is open; ${scheme}` });
            const t0 = Date.now();
            await p.mouse.click(60, 60); await sleep(250);
            const open1 = await isOpen(p, D), d1 = await dlg();
            f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);
            await push({ set: "q19", file: f, dock: D, wanted: open1 ? "open" : "folded", dialogOpen: d1, dockOpen: open1, label: `a quarter second after a press on the dimmed page: the dialog ${d1 ? "is still open" : "has closed"}, the dock ${open1 ? "stays open" : "has folded"}; ${scheme}` });
            await p.mouse.move(700, 880, { steps: 2 });
            const ms = await waitFold(p, D, 14000);
            const landed = ms === null ? null : await (async () => { const t1 = Date.now(); while (Date.now() - t1 < 2000) { if (!(await p.evaluate((d) => document.querySelector(d)?.hasAttribute("data-morphing"), D))) return Date.now() - t0; await sleep(50); } return null; })();
            await sleep(120);
            f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);
            await push({ set: "q19", file: f, dock: D, wanted: ms !== null ? "folded" : null, foldMs: ms === null ? null : Date.now() - t0, landedMs: landed, label: ms !== null ? `the dock has folded by itself and landed, ${((landed ?? Date.now() - t0) / 1000).toFixed(1)} s after that press (its usual pause, then the fold); ${scheme}` : `the dock had not folded 14 s after that press; ${scheme}` });
        });
        await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-g8" }, async (p) => {
            const D = "[data-testid=w-g8]";
            await openDock(p, D, false);
            await p.locator("[data-testid=w-g8-menu]").click(); await sleep(600);
            const menu = () => p.evaluate(() => document.querySelector("[data-testid=w-g8-menu-content]")?.getAttribute("data-state") === "open");
            let f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);
            await push({ set: "q19", file: f, dock: D, wanted: "open", label: `beside it, a menu opened from a dock button; ${scheme}` });
            await p.mouse.click(60, 60); await sleep(250);
            const open1 = await isOpen(p, D), m1 = await menu();
            f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);
            await push({ set: "q19", file: f, dock: D, wanted: open1 ? "open" : "folded", label: `a quarter second after a press outside the menu: the menu ${m1 ? "is still open" : "has closed"} and the dock ${open1 ? "is still open" : "has folded with it"}; ${scheme}` });
        });
    }
    k = 0;
    if (want("q5") && LABEL === "build" && engine === "chromium") for (const id of ["w-card", "w-rounded", "w-pill"]) {
        await cell({ w: 1440, scheme: "light", url: `?c=dock-wi8&cell=${id}` }, async (p) => {
            const D = `[data-testid=${id}]`;
            const corner = () => p.evaluate((d) => { const pl = document.querySelector(d)?.querySelector(".dock-plate"); if (!pl) return null; const r = pl.getBoundingClientRect(); const cs = getComputedStyle(pl); const rad = cs.borderTopLeftRadius.endsWith("%") ? (parseFloat(cs.borderTopLeftRadius) / 100) * Math.min(r.width, r.height) : parseFloat(cs.borderTopLeftRadius); return { w: Math.round(r.width), h: Math.round(r.height), corner: Math.round(Math.min(rad, r.width / 2, r.height / 2)) }; }, D);
            await p.mouse.move(2, 880); await sleep(500);
            let c = await corner(); let f = `${out}/q5.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 24);
            await push({ set: "q5", file: f, dock: D, wanted: "folded", label: `a ${id.slice(2)} dock folded: ${c.w} by ${c.h} px, its corner ${c.corner} px` });
            await openDock(p, D, false); await sleep(900);
            c = await corner(); f = `${out}/q5.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 24);
            await push({ set: "q5", file: f, dock: D, wanted: "open", label: `the same dock open: ${c.w} by ${c.h} px, its corner ${c.corner} px` });
        });
    }
    k = 0;
    if (want("q20") && LABEL === "build") for (const scheme of ["light"]) {
        await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-ctl" }, async (p) => {
            const D = "[data-testid=w-ctl]";
            await p.mouse.move(700, 450); await sleep(1500);
            const n = await p.evaluate((s) => document.querySelectorAll(`${s} .dock-run .dock-icon-button`).length, D);
            let f = `${out}/q20.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 40, true);
            await push({ set: "q20", file: f, dock: D, wanted: "folded", label: `a figure's controls dock with ${n} controls on a desktop (1440 px): at rest it is folded to one round button; ${scheme}` });
            await openDock(p, D, false); await sleep(500);
            f = `${out}/q20.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 40, true);
            await push({ set: "q20", file: f, dock: D, wanted: "open", label: `the pointer on it: it opens to its ${n} controls; ${scheme}` });
            const t0 = Date.now();
            await p.mouse.move(700, 450, { steps: 3 });
            const ms = await waitFold(p, D, 10000);
            await sleep(900); // the fold's travel lands before the frame (the class changes at its start)
            f = `${out}/q20.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 40, true);
            await push({ set: "q20", file: f, dock: D, wanted: ms !== null ? "folded" : null, foldMs: ms, label: ms !== null ? `the pointer gone: it folds again after ${(ms / 1000).toFixed(1)} s; ${scheme}` : `the pointer gone: still open after 10 s; ${scheme}` });
        });
        await cell({ w: 390, scheme, url: "?c=dock-wi8&cell=w-ctl", coarse: true }, async (p) => {
            const D = "[data-testid=w-ctl]";
            await sleep(1500);
            const f = `${out}/q20.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 40, true);
            await push({ set: "q20", file: f, dock: D, wanted: "folded", label: `the same dock on a phone (390 px): folded at rest as well; ${scheme}` });
        });
        await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-ctl1" }, async (p) => {
            const D = "[data-testid=w-ctl1]";
            await p.mouse.move(700, 450); await sleep(1500);
            const f = `${out}/q20.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 40, true);
            await push({ set: "q20", file: f, dock: D, wanted: "open", label: `a controls dock with one control (the theme button): it is that button, never folded; ${scheme}` });
        });
    }
    k = 0;
    if (want("q21") && LABEL !== "proto") {
        const who = LABEL === "today" ? "today's dock (11.0.2)" : "this build";
        for (const [page, ground, gname] of [["nav", "field", "the warm figure page"], ["nav", "grid", "the dark grid page"], ["dials", "field", "the warm figure page"]]) {
            await cell({ w: 1440, scheme: "dark", url: `?c=dock-comp&page=${page}&ground=${ground}` }, async (p) => {
                const sel = await p.evaluate(() => { const d = document.querySelector("[data-story-stage] .glass-dock"); const cur = d.querySelector("[aria-current], [aria-pressed='true'], [aria-selected='true'], [data-state='on'], [data-state='active']"); if (!cur) return null; cur.setAttribute("data-owner-current", ""); const other = [...d.querySelectorAll("button, [role=tab], [role=radio]")].find((b) => b !== cur && !b.contains(cur) && !cur.contains(b) && b.getBoundingClientRect().width > 8); other?.setAttribute("data-owner-hover", ""); return { cur: (cur.getAttribute("aria-label") || cur.textContent).trim().slice(0, 20) }; });
                await p.mouse.move(2, 880); await sleep(600);
                const r = sel ? await fillsOf(p, "[data-owner-hover]", "[data-owner-current]") : null;
                const f = `${out}/q21.${LABEL}.${engine}.${k++}.png`; await crop(p, DOCK, f);
                await push({ set: "q21", file: f, dock: DOCK, wanted: "open", readings: r, who, page, ground, label: `${who}, dark, on ${gname}: the selected ${sel?.cur ?? "?"}; its words read ${r?.wordsOnCurrent ?? "?"}:1 on its highlight (4.5:1 is the floor for words), and the highlight stands ${r?.currentAgainstGround ?? "?"}:1 off the dock behind it; dark` });
            });
        }
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
    const f = `${out}/owner9m.${LABEL}.${engine}.json`;
    let prev = []; try { prev = JSON.parse(readFileSync(f, "utf8")); } catch {}
    const keep = ONLY ? prev.filter((m) => !ONLY.split(",").includes(m.set)) : [];
    writeFileSync(f, JSON.stringify([...keep, ...meta], null, 1));
    console.log(`ownerm frames ${engine} ${LABEL}: ${meta.length}`);
}
