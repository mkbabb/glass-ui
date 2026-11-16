// owner7.mjs: MEASURE-7, RU-59. owner.mjs with the label checked against the page: `openDock` returns when the dock is
// already open, and where it must tap it taps the folded face (`.dock-layer--summary`), never the dock's centre (at 390
// the nav dock's centre is its theme seat, and Chromium's tap flipped the theme); every frame records the document's
// scheme at the shot (`html.dark`), and `strips7.py` refuses a frame whose scheme is not its label's.
// owner.mjs <port> <out-dir> [--engine chromium|webkit]: MEASURE-6, RU-49 step 7's frames for the owner's strips
// (page screenshots by Playwright's headless page, element crops; no screencapture). Writes <out>/<set>.<engine>.<k>.png
// and <out>/owner.<engine>.json (the label of every frame). One browser, a context per cell, closed in finally.
//   glyph   the glyph's share of its seat at 0.5, 0.75 and 0.9 (--dock-icon-glyph-ratio on the dock), on the nav
//           composition over the stage's field, open, at 1440 and 390, dark and light
//   plate   the plate at three firmnesses on the dials composition (the busiest ink) over the stage's field, folded
//           and open, dark and light: today's tiers, RU-44 step 1 (one tier at the base rung), and the state that
//           passed G-15 (--plate <css-file>)
//   hover   the site dock (w-seat) open at 1440: at rest, a seat hovered, the same seat pressed (held down)
//   seatset the site dock with a seat added (w-seatset): frames shot every ~40 ms from the add
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, out] = a;
const engine = val("--engine", "chromium");
const ONLY = val("--only", null);
const want = (k) => !ONLY || ONLY === k;
const plateCss = val("--plate", null) ? readFileSync(val("--plate"), "utf8") : null;
// On this build (RU-44 in): today's plate restored (two tiers, level 1, dimmed ink), and step 1 alone (level 1).
const TODAY = `:root { --glass-veil-dock: calc(var(--glass-veil-base) - 1 * var(--glass-veil-step)); } .glass-dock { --dock-plate-collapsed-tier: var(--glass-veil-wash); --glass-level: 1; } .glass-dock .dock-select-trigger__chevron { opacity: 0.5; } .glass-dock .dock-tab-button { color: var(--muted-foreground); } .glass-dock .segmented-tab:not([data-active]) { color: color-mix(in oklab, var(--muted-foreground), var(--glass-capsule-warm) 12%); }`;
const STEP1 = `.glass-dock { --glass-level: 1; }`;
mkdirSync(out, { recursive: true });
const meta = [];
let curPage = null;
const push = async (m) => { m.scheme = curPage ? await schemeOf(curPage).catch(() => null) : null; meta.push(m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
async function cell({ w, scheme, url, css, coarse }, fn) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, deviceScaleFactor: 2, colorScheme: scheme, ...(coarse ? { hasTouch: true, ...(engine === "chromium" ? { isMobile: true } : {}) } : {}) });
    if (css) await ctx.addInitScript((c) => addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.textContent = c; document.head.appendChild(st); }), css);
    try {
        const p = await ctx.newPage();
        curPage = p;
        await p.goto(`http://127.0.0.1:${port}/${url}${scheme === "dark" ? "&scheme=dark" : ""}`);
        await p.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 }).catch(() => {});
        await sleep(2200);
        return await fn(p);
    } finally {
        await ctx.close();
    }
}
const crop = async (p, sel, file, pad = 24) => {
    const b = await p.locator(sel).first().boundingBox();
    const vw = p.viewportSize().width;
    await p.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: Math.min(vw - Math.max(0, b.x - pad), b.width + 2 * pad), height: b.height + 2 * pad } });
};
const isOpen = (p, sel) => p.evaluate((s) => document.querySelector(s)?.classList.contains("expanded") ?? false, sel);
const schemeOf = (p) => p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
// RU-59: open only a folded dock, and by its folded face: hover it (fine) or tap it (coarse); a press on the face when
// hover does not open it. Never the dock's centre, which on an open or icon dock is a seat.
const openDock = async (p, sel, coarse) => {
    if (await isOpen(p, sel)) return true;
    const face = p.locator(`${sel} .dock-layer--summary`).first();
    let b = (await face.count()) ? await face.boundingBox() : null;
    if (!b || b.width < 2) b = null;
    if (!b) return false;
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    if (coarse) await p.touchscreen.tap(cx, cy);
    else { await p.mouse.move(b.x - 8, cy); await p.mouse.move(cx, cy, { steps: 3 }); }
    await sleep(1000);
    if (!(await isOpen(p, sel)) && !coarse) { await p.mouse.click(cx, cy); await sleep(900); }
    return isOpen(p, sel);
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    let k = 0;
    if (want("glyph")) for (const share of ["0.5", "0.75", "0.9"]) for (const w of [1440, 390]) for (const scheme of ["dark", "light"]) {
        const file = `${out}/glyph.${engine}.${k++}.png`;
        const css = `.glass-dock { --dock-icon-glyph-ratio: ${share}; }`;
        await cell({ w, scheme, url: "?c=dock-comp&page=nav&ground=field", css, coarse: w < 800 }, async (p) => {
            await openDock(p, "[data-story-stage] .glass-dock", w < 800);
            const g = await p.evaluate(() => { const s = document.querySelector("[data-story-stage] .glass-dock .dock-run > * svg, [data-story-stage] .glass-dock .dock-run svg"); const b = s?.closest("[data-glass-dock-seat]") ?? s?.parentElement; return s ? { glyph: +s.getBoundingClientRect().width.toFixed(1), seat: +(b?.getBoundingClientRect().width ?? 0).toFixed(1) } : null; });
            await crop(p, "[data-story-stage] .glass-dock", file);
            await push({ set: "glyph", file, label: `glyph share ${share} of the seat, ${w} px wide, ${scheme}`, measured: g });
        });
    }
    k = 0;
    const plates = [["today's plate (two tiers, dimmed ink)", TODAY], ["one tier at the base rung, level 1", STEP1], ["this build: one tier, level 0.4, full ink (passed G-15)", ""]];
    if (want("plate")) for (const [label, css] of plates) for (const scheme of ["dark", "light"]) for (const posture of ["folded", "open"]) {
        const file = `${out}/plate.${engine}.${k++}.png`;
        await cell({ w: 1440, scheme, url: "?c=dock-comp&page=dials&ground=field", css }, async (p) => {
            if (posture === "open") await openDock(p, "[data-story-stage] .glass-dock", false);
            else await p.mouse.move(2, 2);
            await sleep(400);
            await crop(p, "[data-story-stage] .glass-dock", file, 40);
            await push({ set: "plate", file, label: `${label}; ${scheme}, ${posture}` });
        });
    }
    k = 0;
    if (want("hover")) await cell({ w: 1440, scheme: "light", url: "?c=dock-wi8&cell=w-seat" }, async (p) => {
        await openDock(p, "[data-testid=w-seat]", false);
        const shot = async (label) => { const file = `${out}/hover.${engine}.${k++}.png`; await crop(p, "[data-testid=w-seat]", file); await push({ set: "hover", file, label }); };
        const b = await p.locator("[data-testid=w-seat-search]").boundingBox();
        await p.mouse.move(b.x - 60, b.y - 30); await sleep(300);
        await p.mouse.move(b.x + 4, b.y + b.height / 2, { steps: 3 }); await sleep(700);
        await shot("open, no seat under the pointer");
        await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 }); await sleep(500);
        await shot("the Search seat hovered");
        await p.mouse.down(); await sleep(300);
        await shot("the Search seat pressed and held");
        await p.mouse.move(b.x + b.width / 2, b.y - 80, { steps: 4 }); await p.mouse.up();
    });
    k = 0;
    if (want("seatset")) await cell({ w: 1440, scheme: "light", url: "?c=dock-wi8&cell=w-seatset" }, async (p) => {
        await openDock(p, "[data-testid=w-seatset]", false);
        const btn = await p.$("[data-testid=w-seatset-add]") ?? await p.$("[data-testid=w-seatset-toggle]");
        if (!btn) { await push({ set: "seatset", label: "no add control found on w-seatset" }); return; }
        // the pointer stays on the open dock; the add is pressed by script, so the dock never folds
        const t0 = Date.now();
        await p.evaluate(() => document.querySelector("[data-testid=w-seatset-add]").click());
        for (let j = 0; j < 8; j++) { const file = `${out}/seatset.${engine}.${k++}.png`; await crop(p, "[data-testid=w-seatset]", file); await push({ set: "seatset", file, label: `${Date.now() - t0} ms after a seat is added` }); await sleep(25); }
    });
} finally {
    if (browser) await browser.close();
    const f = `${out}/owner.${engine}.json`;
    let prev = []; try { prev = JSON.parse(readFileSync(f, "utf8")); } catch {}
    const keep = ONLY ? prev.filter((m) => m.set !== ONLY) : [];
    writeFileSync(f, JSON.stringify([...keep, ...meta], null, 1));
    console.log(`owner frames ${engine}: ${meta.length}`);
}
