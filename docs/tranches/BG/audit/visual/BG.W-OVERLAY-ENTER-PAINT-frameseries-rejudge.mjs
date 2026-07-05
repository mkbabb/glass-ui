// BG.W-OVERLAY-ENTER-PAINT — LIVE overlay-bloom frame-series probe (non-authoring paint judge).
// Drives the LIVE (non-capture) demo route on :5200, opens each overlay, and rAF-samples the
// content element's computed scale/opacity/filter/translate over the ENTER (and the scrim), then
// the EXIT — the frame series is the binding paint proof (NEVER a settled capture). Runs BOTH
// engines (playwright chromium + webkit = real WebKit) in BOTH modes over Dialog/Sheet/Popover.
//
//   node BG.W-OVERLAY-ENTER-PAINT-frameseries.mjs <chromium|webkit>
//
// Writes <engine>-<mode>-<route>.frames.json + settled/mid-bloom PNGs into ./overlay-enter-paint-rejudge/.

import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "overlay-enter-paint-rejudge");
mkdirSync(OUT, { recursive: true });

const BASE = "http://localhost:5200";
const ENGINE = process.argv[2] || "chromium";
const launcher = ENGINE === "webkit" ? webkit : chromium;

// route → { path, triggerText, contentSel, modal }
const ROUTES = [
    { id: "dialog", path: "/containers/dialog", triggerText: "Open glass dialog", contentSel: ".glass-reveal.z-modal", modal: true },
    { id: "sheet", path: "/containers/sheet", triggerText: "Open right", contentSel: '[data-slot="sheet-content"]', modal: true },
    { id: "popover", path: "/containers/popover", triggerText: "Dimensions", contentSel: ".popover-content", modal: false },
];
const MODES = ["light", "dark"];

// The in-page driver: click the named trigger, then rAF-sample the content element (and, for a
// modal, the scrim) from its first mount frame until settled/for a window. Returns the series.
const SAMPLER = ({ triggerText, contentSel, modal, windowMs }) =>
    new Promise((resolve) => {
        const btns = [...document.querySelectorAll("button, [role='button']")];
        const trig = btns.find((b) => (b.textContent || "").trim().toLowerCase().includes(triggerText.toLowerCase()));
        if (!trig) return resolve({ error: "trigger-not-found", triggerText });
        const frames = [];
        const scrimSel = '.z-overlay[data-state], .fixed.inset-0.z-overlay';
        let t0 = null;
        let firstFound = null;
        let settledFor = 0;
        const readEl = (el) => {
            const cs = getComputedStyle(el);
            return { opacity: parseFloat(cs.opacity), scale: cs.scale, translate: cs.translate, transform: cs.transform, filter: cs.filter };
        };
        const scrimEl = () => {
            const list = [...document.querySelectorAll(scrimSel)];
            return list.length ? list[list.length - 1] : null;
        };
        function tick(ts) {
            if (t0 === null) t0 = ts;
            const el = document.querySelector(contentSel);
            if (el) {
                if (firstFound === null) firstFound = ts;
                const rec = { t: Math.round(ts - firstFound), ...readEl(el) };
                const sc = scrimEl();
                if (sc) {
                    const scs = getComputedStyle(sc);
                    rec.scrimOpacity = parseFloat(scs.opacity);
                    rec.scrimBg = scs.backgroundColor;
                    // effective scrim alpha = element opacity × bg-color alpha
                    const m = scs.backgroundColor.match(/rgba?\(([^)]+)\)/);
                    let bgA = 1;
                    if (m) { const parts = m[1].split(",").map((s) => parseFloat(s)); bgA = parts.length >= 4 ? parts[3] : 1; }
                    rec.scrimEffAlpha = rec.scrimOpacity * bgA;
                }
                frames.push(rec);
                const settled = Math.abs(rec.opacity - 1) < 0.01 && (rec.scale === "none" || /^1\s+1$/.test(rec.scale) || rec.scale === "1") && (rec.filter === "none" || /blur\(0px?\)/.test(rec.filter));
                settledFor = settled ? settledFor + 1 : 0;
            }
            const elapsed = firstFound === null ? ts - t0 : ts - firstFound;
            if ((firstFound !== null && settledFor >= 6) || elapsed > windowMs) return resolve({ frames, foundAt: firstFound !== null });
            requestAnimationFrame(tick);
        }
        // dispatch the open, then start sampling from the very next frame
        trig.click();
        requestAnimationFrame(tick);
    });

// Exit sampler: press Escape (or click the trigger area) and sample the content element receding.
const EXIT_SAMPLER = ({ contentSel, windowMs }) =>
    new Promise((resolve) => {
        const frames = [];
        let firstFound = null;
        let gone = 0;
        const readEl = (el) => {
            const cs = getComputedStyle(el);
            return { opacity: parseFloat(cs.opacity), scale: cs.scale, translate: cs.translate, filter: cs.filter };
        };
        // fire close: Escape key (on document + active + the content itself), plus an
        // outside pointer for a non-modal popover.
        const fireEsc = (tgt) => tgt && tgt.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, which: 27, bubbles: true }));
        const contentNow = document.querySelector(contentSel);
        fireEsc(document);
        fireEsc(document.activeElement);
        fireEsc(contentNow);
        // outside click fallback (popover / non-modal)
        document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        document.body.click();
        function tick(ts) {
            if (firstFound === null) firstFound = ts;
            const el = document.querySelector(contentSel);
            if (el) {
                frames.push({ t: Math.round(ts - firstFound), ...readEl(el) });
                gone = 0;
            } else {
                gone += 1;
            }
            if (gone >= 3 || ts - firstFound > windowMs) return resolve({ frames });
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });

async function run() {
    const browser = await launcher.launch();
    const results = {};
    for (const mode of MODES) {
        for (const route of ROUTES) {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
            await ctx.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch (e) {} }, mode);
            const page = await ctx.newPage();
            const url = `${BASE}${route.path}`;
            await page.goto(url, { waitUntil: "networkidle" });
            await page.evaluate((m) => {
                const el = document.documentElement;
                if (m === "dark") el.classList.add("dark"); else el.classList.remove("dark");
                el.style.colorScheme = m;
            }, mode);
            await page.waitForTimeout(600);
            const ua = await page.evaluate(() => navigator.userAgent);
            const gl = await page.evaluate(() => { try { const c = document.createElement("canvas"); const g = c.getContext("webgl"); const e = g.getExtension("WEBGL_debug_renderer_info"); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a"; } catch (e) { return "n/a"; } });
            const startingStyleSupported = await page.evaluate(() => { try { return CSS.supports("selector(:has(*))") && typeof CSSStartingStyleRule !== "undefined"; } catch (e) { return false; } });

            // ENTER series
            const enter = await page.evaluate(SAMPLER, { triggerText: route.triggerText, contentSel: route.contentSel, modal: route.modal, windowMs: 900 }).catch((e) => ({ error: String(e) }));
            // mid-bloom best-effort: reopen and screenshot at ~90ms (racy but visual)
            // (content stays open from ENTER; grab a settled screenshot now)
            await page.waitForTimeout(500);
            const settledPng = join(OUT, `${ENGINE}-${mode}-${route.id}-settled.png`);
            await page.screenshot({ path: settledPng, fullPage: false });
            // EXIT series
            const exit = await page.evaluate(EXIT_SAMPLER, { contentSel: route.contentSel, windowMs: 700 }).catch((e) => ({ error: String(e) }));

            const key = `${mode}-${route.id}`;
            results[key] = { engine: ENGINE, mode, route: route.id, url, ua, gl, startingStyleSupported, enter, exit };
            writeFileSync(join(OUT, `${ENGINE}-${key}.frames.json`), JSON.stringify(results[key], null, 2));
            console.log(`[${ENGINE}] ${key}: enter=${enter.frames?.length ?? "ERR"}f exit=${exit.frames?.length ?? "ERR"}f found=${enter.foundAt}`);
            await ctx.close();
        }
    }
    await browser.close();
    writeFileSync(join(OUT, `${ENGINE}-ALL.json`), JSON.stringify(results, null, 2));
    console.log(`[${ENGINE}] DONE -> ${OUT}`);
}
run().catch((e) => { console.error(e); process.exit(1); });
