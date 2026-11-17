// owner8.mjs <port> <out-dir> [--engine chromium|webkit] [--only set]: MEASURE-7 step 9, the frames for the owner's
// questions 10 and 13 to 18 (RULINGS-6, the final seventh-pass order, step 9), on the pass's build. owner7.mjs's rules
// (RU-59): a dock is opened only when folded and by its folded face (hover at 1440, a tap at 390); every frame records
// the document's scheme at the shot and strips7.py refuses a frame whose scheme is not its label's. Page screenshots by
// Playwright's headless page, element crops; no screencapture. One browser, a context per cell, closed in finally.
// Writes <out>/<set>.<engine>.<k>.png and <out>/owner8.<engine>.json (label, scheme, readings per frame).
//   ladder   (Q10) the dials composition over the stage's field at each rung (level 1, 0.85, 0.7, 0.55, 0.4) and the
//            control row (v11.0.2's veil, full ink), folded and open, dark and light, at 1440 and 390
//   glyph3   (Q17) the nav composition open at 1440: the icon seats at share 0.5 (v11.0.2's), at 0.9 (this build), and
//            at the word-derived size (1.5 em) beside the worded tabs; and w-glyphs's tab dock with its glyph measured
//   hover3   (Q18) the nav composition open at 1440, the pointer on Home beside the current page (Reports), at three
//            hover strengths; each frame's hover-against-current ratio is read from its own pixels
//   legend   (Q14) atlas's head row (w-atlas): folded, open over the legend, and 1 s into the linger after the pointer
//            leaves; with the open plate's cover of the legend in px
//   transport (Q15) keyframes's transport as shipped (centre) and with anchor="start": folded and open, Play's box
//   phone    (Q13) the nav composition at 390 on a touch: a seat pressed and held 700 ms (what a phone shows: no name)
//   cue      (Q16) w-many at 390 on a touch, open at rest: the run cut at a whole seat, nothing cues the rest
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, out] = a;
const engine = val("--engine", "chromium");
const ONLY = val("--only", null);
const want = (k) => !ONLY || ONLY.split(",").includes(k);
const ST = new URL("./states/", import.meta.url);
const state = (n) => readFileSync(new URL(`ladder-${n}.css`, ST), "utf8");
mkdirSync(out, { recursive: true });
const meta = [];
let curPage = null;
const schemeOf = (p) => p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
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
        await p.waitForFunction(() => window.__animReady === true, null, { timeout: 30000 }).catch(() => {});
        await sleep(2200);
        return await fn(p);
    } finally {
        await ctx.close();
    }
}
const crop = async (p, sel, file, pad = 24) => {
    const b = await p.locator(sel).first().boundingBox();
    const vp = p.viewportSize();
    const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad);
    await p.screenshot({ path: file, clip: { x, y, width: Math.min(vp.width - x, b.width + 2 * pad), height: Math.min(vp.height - y, b.height + 2 * pad) } });
};
const isOpen = (p, sel) => p.evaluate((s) => document.querySelector(s)?.classList.contains("expanded") ?? false, sel);
const openDock = async (p, sel, coarse) => {
    if (await isOpen(p, sel)) return true;
    const face = p.locator(`${sel} .dock-layer--summary`).first();
    let b = (await face.count()) ? await face.boundingBox() : null;
    if (!b || b.width < 2) return false;
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    if (coarse) await p.touchscreen.tap(cx, cy);
    else { await p.mouse.move(b.x - 8, cy); await p.mouse.move(cx, cy, { steps: 3 }); }
    await sleep(1000);
    if (!(await isOpen(p, sel)) && !coarse) { await p.mouse.click(cx, cy); await sleep(900); }
    return isOpen(p, sel);
};
// the modal colour of a box and the hover-against-current ratio, from the page's own pixels (no getContext on a live canvas)
const ratioOf = async (p, aSel, bSel) => {
    const shot = (await p.screenshot({ type: "png" })).toString("base64");
    return p.evaluate(async ({ shot, aSel, bSel }) => {
        const bin = Uint8Array.from(atob(shot), (c) => c.charCodeAt(0));
        const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
        const c2 = new OffscreenCanvas(bmp.width, bmp.height); const g = c2.getContext("2d"); g.drawImage(bmp, 0, 0);
        const sx = bmp.width / innerWidth;
        const modal = (el) => {
            const r = el.getBoundingClientRect(); const m = new Map();
            const x0 = Math.round((r.left + r.width * 0.12) * sx), x1 = Math.round((r.right - r.width * 0.12) * sx), y0 = Math.round((r.top + 2) * sx), y1 = Math.round((r.top + 5) * sx);
            const d = g.getImageData(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0)).data;
            for (let i = 0; i < d.length; i += 4) { const k = `${d[i] >> 2},${d[i + 1] >> 2},${d[i + 2] >> 2}`; m.set(k, (m.get(k) || 0) + 1); }
            const top = [...m.entries()].sort((x, y) => y[1] - x[1])[0][0].split(",").map((v) => (+v << 2) + 2);
            return top;
        };
        const lum = ([r, g2, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g2) + 0.0722 * f(b); };
        const A = document.querySelector(aSel), B = document.querySelector(bSel);
        if (!A || !B) return null;
        const fa = modal(A), fb = modal(B); const la = lum(fa), lb = lum(fb);
        return { hover: fa, current: fb, ratio: +((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)).toFixed(3) };
    }, { shot, aSel, bSel });
};
const DOCK = "[data-story-stage] .glass-dock";
try {
    // the headless shell with owner7.mjs's raster flags, so the frames paint as owner7's and crop.mjs's do
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    let k = 0;
    const RUNGS = [["today", "v11.0.2's veil (the control row), words at full strength"], ["1", "level 1"], ["085", "level 0.85"], ["07", "level 0.7"], ["055", "level 0.55"], ["04", "level 0.4"]];
    if (want("ladder")) for (const w of [1440, 390]) for (const [r, label] of RUNGS) for (const scheme of ["dark", "light"]) for (const posture of ["folded", "open"]) {
        const file = `${out}/ladder.${engine}.${k++}.png`;
        await cell({ w, scheme, url: "?c=dock-comp&page=dials&ground=field", css: state(r), coarse: w < 800 }, async (p) => {
            if (posture === "open") await openDock(p, DOCK, w < 800); else await p.mouse.move(2, 2).catch(() => {});
            await sleep(400);
            await crop(p, DOCK, file, 40);
            await push({ set: "ladder", file, rung: r, w, posture, label: `${label}; ${w} px wide; ${scheme}; ${posture}`, open: await isOpen(p, DOCK) });
        });
    }
    k = 0;
    const G3 = [["0.5", "share 0.5 of the seat (v11.0.2's)", ".glass-dock { --dock-icon-glyph-ratio: 0.5; }"], ["0.9", "share 0.9 of the seat (this build)", ""], ["1.5em", "sized from the words beside them (1.5 em)", ".glass-dock .dock-icon-button > svg { width: 1.5em; height: 1.5em; }"]];
    if (want("glyph3")) {
        for (const [, label, css] of G3) for (const scheme of ["light", "dark"]) {
            const file = `${out}/glyph3.${engine}.${k++}.png`;
            await cell({ w: 1440, scheme, url: "?c=dock-comp&page=nav&ground=field", css }, async (p) => {
                const g = await p.evaluate(() => { const s = document.querySelector("[data-story-stage] .glass-dock .dock-icon-button > svg"); const b = s?.getBoundingClientRect(); return b ? `${b.width.toFixed(1)} px` : "no icon seat"; });
                await crop(p, DOCK, file);
                await push({ set: "glyph3", file, label: `icon seats beside worded tabs at ${label}: the Find glyph is ${g}; 1440 px wide; ${scheme}` });
            });
        }
        const file = `${out}/glyph3.${engine}.${k++}.png`;
        await cell({ w: 1440, scheme: "light", url: "?c=dock-wi8&cell=w-glyphs" }, async (p) => {
            const g = await p.evaluate(() => { const s = document.querySelector("[data-testid=w-glyphs-tab] .dock-tab-button > svg"); const b = s?.getBoundingClientRect(); const fs = s ? getComputedStyle(s.parentElement).fontSize : ""; return b ? `${b.width.toFixed(1)} px at a ${fs} word` : "none"; });
            await crop(p, "[data-testid=w-glyphs-tab]", file);
            await push({ set: "glyph3", file, label: `an icon next to a word inside one tab: ${g} (it was 24 px); 1440 px wide; light` });
        });
    }
    k = 0;
    // Q18: hover against current at three strengths. The current fill is the build's; the hover fill is set nearer to it
    // or farther from it, and the frame's own pixels give the ratio printed in its label.
    const H3 = [["near", ".glass-dock { --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora) 20%, transparent); }"], ["middle", ".glass-dock { --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora) 14%, transparent); }"], ["far", ".glass-dock { --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora) 7%, transparent); }"]];
    if (want("hover3")) for (const [name, css] of H3) for (const scheme of ["light", "dark"]) {
        const file = `${out}/hover3.${engine}.${k++}.png`;
        await cell({ w: 1440, scheme, url: "?c=dock-comp&page=nav&ground=field", css }, async (p) => {
            const hb = await p.evaluate(() => { const d = document.querySelector("[data-story-stage] .glass-dock"); const cur = d.querySelector("[aria-current]"); const sib = [...cur.parentElement.children].find((c) => c !== cur && c.matches(".dock-tab-button, .dock-icon-button")); sib.setAttribute("data-owner-hover", ""); cur.setAttribute("data-owner-current", ""); const b = sib.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
            await p.mouse.move(hb.x, hb.y - 40); await p.mouse.move(hb.x, hb.y, { steps: 3 }); await sleep(600);
            const r = await ratioOf(p, "[data-owner-hover]", "[data-owner-current]");
            await crop(p, DOCK, file);
            await push({ set: "hover3", file, strength: name, ratio: r?.ratio, label: `Home hovered beside the current page (Reports): ${name}, hovered against current ${r?.ratio ?? "unread"}:1; 1440 px wide; ${scheme}` });
        });
    }
    k = 0;
    if (want("legend")) for (const scheme of ["light", "dark"]) {
        await cell({ w: 1440, scheme, url: "?c=dock-wi8&cell=w-atlas" }, async (p) => {
            const shot = async (label, extra = {}) => { const file = `${out}/legend.${engine}.${k++}.png`; await crop(p, "[data-testid=w-atlas-row]", file, 16); await push({ set: "legend", file, label: `${label}; 1440 px wide; ${scheme}`, ...extra }); };
            await p.mouse.move(2, 2); await sleep(300);
            await shot("atlas's head row, the dock folded");
            await openDock(p, "[data-testid=w-atlas]", false); await sleep(500);
            const cover = await p.evaluate(() => { const d = document.querySelector("[data-testid=w-atlas]"); const pl = (d.querySelector(":scope > .dock-plate") ?? d).getBoundingClientRect(); const l = document.querySelector("[data-testid=w-atlas-legend]").getBoundingClientRect(); const x = Math.max(0, Math.min(pl.right, l.right) - Math.max(pl.left, l.left)), y = Math.max(0, Math.min(pl.bottom, l.bottom) - Math.max(pl.top, l.top)); return Math.round(x * y); });
            await shot(`the dock open over the legend (the plate covers ${cover} px of it)`, { cover });
            await p.mouse.move(700, 600, { steps: 3 }); await sleep(1000);
            await shot("1 s after the pointer leaves, the linger holding it open");
        });
    }
    k = 0;
    if (want("transport")) for (const [c, how] of [["w-kf", "as shipped (it opens around its centre)"], ["w-kfs", "with anchor=\"start\" (it opens away from Play)"]]) {
        await cell({ w: 1440, scheme: "light", url: `?c=dock-wi8&cell=${c}` }, async (p) => {
            const play = () => p.evaluate(() => { const b = document.querySelector("[data-testid=w-kf-play]").getBoundingClientRect(); return `${b.left.toFixed(0)} px`; });
            const shot = async (label) => { const file = `${out}/transport.${engine}.${k++}.png`; await crop(p, "[data-testid=w-kf-wrap]", file, 8); await push({ set: "transport", file, label: `keyframes's transport ${how}: ${label}, Play's left edge at ${await play()}; 1440 px wide; light` }); };
            await p.mouse.move(2, 2); await sleep(300);
            await shot("folded");
            const b = await p.locator("[data-testid=w-kf-play]").boundingBox();
            await p.mouse.move(b.x + b.width / 2, b.y - 60); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 }); await sleep(1100);
            await shot("open, the pointer where Play was");
        });
    }
    k = 0;
    if (want("phone")) await cell({ w: 390, scheme: "light", url: "?c=dock-comp&page=nav&ground=field", coarse: true }, async (p) => {
        await openDock(p, DOCK, true);
        const s = await p.evaluate(() => { const e = [...document.querySelectorAll("[data-story-stage] .glass-dock .dock-run > *")].find((x) => !x.hasAttribute("aria-current") && x.getBoundingClientRect().width > 8); const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, name: e.getAttribute("aria-label") || e.textContent.trim() }; });
        const cdp = engine === "chromium" ? await p.context().newCDPSession(p) : null;
        if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: s.x, y: s.y }] });
        else await p.evaluate(({ x, y }) => { const t = document.elementFromPoint(x, y); const touch = new Touch({ identifier: 1, target: t, clientX: x, clientY: y }); t.dispatchEvent(new TouchEvent("touchstart", { touches: [touch], targetTouches: [touch], changedTouches: [touch], bubbles: true })); t.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "touch", clientX: x, clientY: y, bubbles: true })); }, s).catch(() => {});
        await sleep(700);
        const tips = await p.evaluate(() => [...document.querySelectorAll("[role=tooltip]")].filter((t) => t.checkVisibility()).map((t) => t.textContent.trim()));
        const file = `${out}/phone.${engine}.${k++}.png`;
        await p.screenshot({ path: file, clip: { x: 0, y: 500, width: 390, height: 344 } });
        await push({ set: "phone", file, label: `a phone (390 px, touch): ${s.name} pressed and held 700 ms; a name shows: ${tips.length ? tips.join(", ") : "none"}; light`, tips });
        if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }).catch(() => {});
    });
    k = 0;
    if (want("cue")) for (const scheme of ["light"]) await cell({ w: 390, scheme, url: "?c=dock-wi8&cell=w-many", coarse: true }, async (p) => {
        await openDock(p, "[data-testid=w-many]", true); await sleep(600);
        const n = await p.evaluate(() => { const d = document.querySelector("[data-testid=w-many]"); const run = d.querySelector(".dock-layers > .dock-run"); const rb = run.getBoundingClientRect(); const seats = [...run.children]; return `${seats.filter((s) => { const b = s.getBoundingClientRect(); return b.left >= rb.left - 0.5 && b.right <= rb.right + 0.5; }).length} of ${seats.length} seats show`; });
        const file = `${out}/cue.${engine}.${k++}.png`;
        await crop(p, "[data-testid=w-many]", file);
        await push({ set: "cue", file, label: `more seats than fit at 390 px (touch), open at rest: ${n}, nothing cues the rest; ${scheme}` });
    });
} finally {
    if (browser) await browser.close();
    const f = `${out}/owner8.${engine}.json`;
    let prev = []; try { prev = JSON.parse(readFileSync(f, "utf8")); } catch {}
    const keep = ONLY ? prev.filter((m) => !ONLY.split(",").includes(m.set)) : [];
    writeFileSync(f, JSON.stringify([...keep, ...meta], null, 1));
    console.log(`owner8 frames ${engine}: ${meta.length}`);
}
