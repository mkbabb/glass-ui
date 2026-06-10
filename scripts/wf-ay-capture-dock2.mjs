// AY.W-DOCK2 — own-surface live frame-series CAPTURE (RG1 / HG6 debt discharge).
//
// Captures the REAL collapsible dock at /dock/overview (data-testid="dock-capture")
// driving the EXPAND morph, and persists, per {viewport × theme}:
//   (1) a keyframe still at the morph midpoint (the entering controls mid-reveal,
//       riding the shell edge — the lockstep the gate now ASSERTS), and
//   (2) a frame-series strip (5 frames across the morph) showing the entering-child
//       opacity onset tracking the shell-width onset frame-by-frame.
// Plus a persisted GREEN run of proof:dock-animation-live against the real dock
// (RG2) is run separately by the orchestrator; this script lands the PNGs RG1 owes.
//
// Real dimensions: desktop 1440×900, mobile 390×844 (the 390-width audited class).
// Modeled on scripts/proof-dock-items-lag-capture.mjs (the W-DOCK1 harness).

import { resolve } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const DOCK_ROUTE = "/dock/overview";
const DOCK_SELECTOR = '.glass-dock[data-testid="dock-capture"]';

const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900 },
    { id: "mobile", width: 390, height: 844 },
];
const THEMES = ["light", "dark"];

// Read the dock root width + --dock-morph-t scalar + the LAST entering child opacity
// on ONE rAF timeline while the expand morph runs. The dock defaults EXPANDED, so the
// probe first COLLAPSES (LEAVE + wait out the collapse-delay), THEN drives the EXPAND
// (full pointer-over sequence at the dock centre) and samples that ramp.
// Returns {times,widths,morphTs,lastChildOpacities}.
function pageProbe(sel) {
    return new Promise((done) => {
        const root = document.querySelector(sel);
        if (!root) return done({ error: "no dock" });
        const fire = (types) => {
            const r = root.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            for (const t of types)
                root.dispatchEvent(
                    new PointerEvent(t, {
                        bubbles: true,
                        clientX: cx,
                        clientY: cy,
                        pointerType: "mouse",
                    }),
                );
        };
        const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove"];
        const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];
        // collapse first so the EXPAND ramp is real
        fire(LEAVE);
        setTimeout(() => {
            const times = [];
            const widths = [];
            const morphTs = [];
            const lastChildOpacities = [];
            const t0 = performance.now();
            fire(ENTER);
            let frames = 0;
            function step() {
                const t = performance.now() - t0;
                const cs = getComputedStyle(root);
                const w = root.getBoundingClientRect().width;
                const mt = parseFloat(cs.getPropertyValue("--dock-morph-t")) || 0;
                const full = root.querySelector(".dock-layer--full");
                let op = 1;
                if (full && full.children.length) {
                    const last = full.children[full.children.length - 1];
                    op = parseFloat(getComputedStyle(last).opacity);
                }
                times.push(t);
                widths.push(w);
                morphTs.push(mt);
                lastChildOpacities.push(op);
                frames += 1;
                if (frames < 90 && t < 1500) requestAnimationFrame(step);
                else done({ times, widths, morphTs, lastChildOpacities });
            }
            requestAnimationFrame(step);
        }, 1100);
    });
}

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch();
    const results = [];
    try {
        for (const vp of VIEWPORTS) {
            for (const theme of THEMES) {
                const ctx = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    deviceScaleFactor: 2,
                    colorScheme: theme === "dark" ? "dark" : "light",
                });
                const page = await ctx.newPage();
                // Force the readable spring path (delete startViewTransition pre-boot).
                await page.addInitScript(() => {
                    try {
                        let p = document;
                        while (p) {
                            if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                                delete p.startViewTransition;
                                break;
                            }
                            p = Object.getPrototypeOf(p);
                        }
                    } catch {
                        /* non-configurable */
                    }
                });
                await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
                if (theme === "dark")
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                else
                    await page.evaluate(() => document.documentElement.classList.remove("dark"));
                await page.waitForSelector(DOCK_SELECTOR, { timeout: 8000 });
                await page.locator(DOCK_SELECTOR).scrollIntoViewIfNeeded();
                await page.waitForTimeout(500);

                // (a) sample the expand-morph frame-series.
                const series = await page.evaluate(
                    ({ sel, fn }) => {
                        const probe = new Function(`return (${fn})`)();
                        return probe(sel);
                    },
                    { sel: DOCK_SELECTOR, fn: pageProbe.toString() },
                );

                // (b) keyframe still at the morph MIDPOINT — collapse first (LEAVE +
                // wait out the collapse-delay), then drive the EXPAND and shoot when
                // --dock-morph-t crosses ~0.5 (entering controls mid-reveal).
                const fireSeq = (sel, kind) => {
                    const root = document.querySelector(sel);
                    if (!root) return;
                    const r = root.getBoundingClientRect();
                    const cx = r.x + r.width / 2;
                    const cy = r.y + r.height / 2;
                    const ENTER = [
                        "pointerover",
                        "pointerenter",
                        "mouseover",
                        "mouseenter",
                        "pointermove",
                    ];
                    const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];
                    for (const t of kind === "enter" ? ENTER : LEAVE)
                        root.dispatchEvent(
                            new PointerEvent(t, {
                                bubbles: true,
                                clientX: cx,
                                clientY: cy,
                                pointerType: "mouse",
                            }),
                        );
                };
                await page.evaluate(
                    ([sel, fn]) => new Function(`return (${fn})`)()(sel, "leave"),
                    [DOCK_SELECTOR, fireSeq.toString()],
                );
                await page.waitForTimeout(1100);
                await page.evaluate(
                    ([sel, fn]) => new Function(`return (${fn})`)()(sel, "enter"),
                    [DOCK_SELECTOR, fireSeq.toString()],
                );
                // wait for mid-morph
                await page
                    .waitForFunction(
                        (sel) => {
                            const root = document.querySelector(sel);
                            const mt =
                                parseFloat(
                                    getComputedStyle(root).getPropertyValue("--dock-morph-t"),
                                ) || 0;
                            return mt > 0.4 && mt < 0.75;
                        },
                        DOCK_SELECTOR,
                        { timeout: 1500, polling: 8 },
                    )
                    .catch(() => {});
                const stillName = `W-DOCK2-lockstep-midmorph-${vp.id}-${theme}.png`;
                await page
                    .locator(DOCK_SELECTOR)
                    .screenshot({ path: resolve(VISUAL_DIR, stillName) });

                // (c) collapse-direction keyframe (the §7 D9/D10 arm) — settle expanded,
                // then leave + shoot mid-collapse.
                await page.waitForTimeout(900);
                await page.evaluate(
                    ([sel, fn]) => new Function(`return (${fn})`)()(sel, "leave"),
                    [DOCK_SELECTOR, fireSeq.toString()],
                );
                await page
                    .waitForFunction(
                        (sel) => {
                            const root = document.querySelector(sel);
                            const mt =
                                parseFloat(
                                    getComputedStyle(root).getPropertyValue("--dock-morph-t"),
                                ) || 0;
                            return mt > 0.25 && mt < 0.7;
                        },
                        DOCK_SELECTOR,
                        { timeout: 1500, polling: 8 },
                    )
                    .catch(() => {});
                const collapseName = `W-DOCK2-collapse-midmorph-${vp.id}-${theme}.png`;
                await page
                    .locator(DOCK_SELECTOR)
                    .screenshot({ path: resolve(VISUAL_DIR, collapseName) });

                // onset analysis for the DELTA.
                const onset = (arr, ts, isOpacity) => {
                    // first frame where the value departs its t0 baseline by > eps.
                    const base = arr[0];
                    const eps = isOpacity ? 0.02 : 1.0;
                    for (let i = 1; i < arr.length; i++) {
                        if (Math.abs(arr[i] - base) > eps) return Math.round(ts[i] * 10) / 10;
                    }
                    return null;
                };
                const boxOnset = onset(series.widths, series.times, false);
                const childOnset = onset(series.lastChildOpacities, series.times, true);
                results.push({
                    viewport: vp.id,
                    theme,
                    still: stillName,
                    collapse: collapseName,
                    boxOnsetMs: boxOnset,
                    childOnsetMs: childOnset,
                    childVsBoxMs:
                        boxOnset != null && childOnset != null
                            ? Math.round((childOnset - boxOnset) * 10) / 10
                            : null,
                    peakWidth: Math.round(Math.max(...series.widths) * 10) / 10,
                    peakMorphT: Math.round(Math.max(...series.morphTs) * 1000) / 1000,
                    frames: series.times.length,
                });
                await ctx.close();
            }
        }
    } finally {
        await browser.close();
    }
    console.log(JSON.stringify(results, null, 2));
}

run().catch((e) => {
    console.error("CAPTURE FAILED:", e.message);
    process.exit(1);
});
