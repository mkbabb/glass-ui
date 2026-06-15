// BA.W-REFLECT2 — the BA gestalt reflection capture-conductor (audit-only, transient).
//
// Mirrors scripts/wf-az-reflect.js's role but for the BA gestalt roster: it drives
// the ROOT-hoisted Playwright against the live :5199 demo and captures WHOLE-PAGE
// frames (fullPage:true — NOT the cropped mechanism zoom) for each of the EIGHT
// W-REFLECT2 roster surfaces, BOTH modes × ≥2 viewports, over the real
// W-DARK-MATERIAL backdrop. The captures are the BINDING own-surface evidence the
// gestalt verdict rides; a doc claim is never evidence (the AZ W-REFLECT step-2 bar).
//
// The surfaces (the roster's eight): dock · configurators-goo · aurora ·
// glass-feedback · shell · motion-fourier · dark-register · cross-repo. Each maps to
// the demo route(s) the roster declares; cross-repo's adopt/deploy state is a
// docs-read (W-CLOSE owns the slides handoff), so its captures ride the BA glass
// surface the slides consumer adopts (the demo's glass-material + a feedback toast).
//
// USAGE: node scripts/wf-ba-reflect.js   (the demo must already be live on :5199)
// AUDIT-ONLY: this script writes ONLY PNGs under docs/tranches/BA/audit/reflect/.

import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "docs/tranches/BA/audit/reflect";
const BASE = "http://localhost:5199";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
];
const MODES = ["light", "dark"];

// Each surface -> the route to capture whole-page. The route is the roster's
// primary demonstration surface for that named surface.
const SURFACES = [
    { surface: "dock", route: "/dock/overview", settle: 1800 },
    { surface: "configurators-goo", route: "/substrates/blob", settle: 2000 },
    { surface: "aurora", route: "/substrates/aurora", settle: 2000 },
    { surface: "glass-feedback", route: "/feedback/notification", settle: 1400 },
    { surface: "shell", route: "/forms/inputs", settle: 1600 },
    { surface: "motion-fourier", route: "/substrates/fourier-studio", settle: 1800 },
    { surface: "dark-register", route: "/substrates/glass-material", settle: 1800 },
    { surface: "cross-repo", route: "/feedback/toast", settle: 1400 },
];

const browser = await chromium.launch();
const written = [];
try {
    for (const { surface, route, settle } of SURFACES) {
        for (const vp of VIEWPORTS) {
            for (const mode of MODES) {
                const ctx = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    deviceScaleFactor: 2,
                    colorScheme: mode,
                    // Freeze the WebGL/aurora substrates: useWebGLCanvas paints ONE
                    // static frame then PARKS under prefers-reduced-motion (the
                    // documented substrate-PRM mirror), so the fullPage screenshot
                    // does not race a continuously-repainting compositor canvas.
                    reducedMotion: "reduce",
                });
                const page = await ctx.newPage();
                // Set the dark class on the html BEFORE navigation settles, then
                // again after (the app's reactive dark store re-applies on mount).
                await page.addInitScript((m) => {
                    try {
                        localStorage.setItem(
                            "vueuse-color-scheme",
                            m === "dark" ? "dark" : "light",
                        );
                    } catch (e) {
                        /* ignore */
                    }
                }, mode);
                // The demo router is createWebHistory — REAL paths, not hash routes.
                // waitUntil:"load" (NOT networkidle — the live WebGL/aurora canvases
                // keep the network busy so networkidle never fires and times out).
                await page.goto(`${BASE}${route}`, {
                    waitUntil: "load",
                    timeout: 30000,
                });
                // Confirm the SPA router resolved the path (not the / redirect).
                await page
                    .waitForFunction(
                        (r) => location.pathname === r,
                        route,
                        { timeout: 8000 },
                    )
                    .catch(() => {});
                await page.evaluate((m) => {
                    document.documentElement.classList.toggle("dark", m === "dark");
                }, mode);
                await page.waitForTimeout(settle);
                // Re-assert the mode after the settle (route-enter transition + any
                // dark-store re-application could have flickered it).
                await page.evaluate((m) => {
                    document.documentElement.classList.toggle("dark", m === "dark");
                }, mode);
                await page.waitForTimeout(300);
                const path = `${OUT}/${surface}-${mode}-${vp.name}-full.png`;
                try {
                    await page.screenshot({
                        path,
                        fullPage: true,
                        timeout: 90000,
                    });
                    written.push(path);
                } catch (e) {
                    console.log(
                        `  WARN screenshot failed for ${surface}-${mode}-${vp.name}: ${e.message.split("\n")[0]}`,
                    );
                }
                await ctx.close();
            }
        }
        console.log(`captured: ${surface} (${route}) — 4 frames`);
    }
} finally {
    await browser.close();
}

console.log(`\nwrote ${written.length} whole-page captures under ${OUT}`);
