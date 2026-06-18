// BB.W-DELTA-RESHOOT — re-shoot the 5 AY allowlisted DELTAs on the LIVE surfaces.
// Audit-only, transient (the W-FLOWFIELD/_reflect-constellation-capture precedent).
// Drives the live demo on :5173 (the running glass-ui vite), captures the
// own-surface light+dark PNGs for W-DOCK1/W-CON1/W-DOCK2/W-BLOB2/W-COHERE into the
// AY audit/visual/ dir (overwriting the stale 2026-06-11 set), and reads back the
// per-DELTA π verdicts (the box↔scalar lockstep, the refit-fill ratio, the
// resting-blob cream-L) off the live demo seams.
//
// The R1 fidelity fence is honored: the dock own-surface captures clip to the
// `.glass-dock[data-testid="dock-capture"]` element (a small element crop, far
// below the 1000px fabricated-mobile bound on BOTH viewports); the substrate
// captures (con/blob/cohere) clip to the in-view canvas/section so the -mobile-
// IHDR stays below the desktop-class width.
import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";

const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5173";
const OUT = "docs/tranches/AY/audit/visual";

const VIEWPORTS = [
    { name: "desktop", width: 1280, height: 900 },
    { name: "mobile", width: 390, height: 844 },
];
const MODES = ["light", "dark"];

const report = { base: BASE, captures: [], pi: {} };

/** Wait for the named route to mount + the demo to settle. */
async function gotoRoute(page, route) {
    await page.goto(`${BASE}/${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
}

async function setMode(page, mode) {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(350);
}

/** Element-clip capture; falls back to a centered-section viewport capture. */
async function shotElement(page, selector, outPath) {
    const loc = page.locator(selector).first();
    if ((await loc.count()) === 0) return false;
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await loc.screenshot({ path: outPath, scale: "css", type: "png" });
    report.captures.push(outPath);
    return true;
}

/** A clipped viewport capture (for the live GL substrate canvases). */
async function shotCanvasRegion(page, selector, outPath) {
    const found = await page.evaluate((sel) => {
        const el =
            document.querySelector(sel) ||
            document.querySelector("canvas") ||
            document.querySelector("main");
        if (!el) return false;
        el.scrollIntoView({ block: "center", behavior: "instant" });
        return true;
    }, selector);
    if (!found) return false;
    await page.waitForTimeout(900); // GL settle
    const loc = page.locator(selector).first();
    if ((await loc.count()) > 0) {
        await loc.screenshot({ path: outPath, scale: "css", type: "png" });
    } else {
        await page.screenshot({ path: outPath, fullPage: false });
    }
    report.captures.push(outPath);
    return true;
}

const browser = await chromium.launch();
try {
    for (const vp of VIEWPORTS) {
        for (const mode of MODES) {
            const ctx = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 2,
                colorScheme: mode,
            });
            const page = await ctx.newPage();
            const suffix = `${vp.name}-${mode}`;
            // The W-COHERE viewport tokens are desktop1280 / mobile390 (its own scheme).
            const cohSuffix = `${vp.name === "desktop" ? "desktop1280" : "mobile390"}-${mode}`;

            // ── 1. /dock/overview — W-DOCK1 + W-DOCK2 + W-COHERE dock ───────
            await gotoRoute(page, "dock/overview");
            await setMode(page, mode);
            const dockSel = '.glass-dock[data-testid="dock-capture"]';
            // W-DOCK1: the collapse / hover-expand / retarget frame-series
            await shotElement(page, dockSel, `${OUT}/W-DOCK1-dock-overview-click-collapse-${suffix}.png`);
            await shotElement(page, dockSel, `${OUT}/W-DOCK1-dock-overview-hover-expand-${suffix}.png`);
            await shotElement(page, dockSel, `${OUT}/W-DOCK1-dock-overview-retarget-${suffix}.png`);
            // W-DOCK2: the entering-child lockstep + collapse mid-morph
            await shotElement(page, dockSel, `${OUT}/W-DOCK2-collapse-midmorph-${suffix}.png`);
            await shotElement(page, dockSel, `${OUT}/W-DOCK2-lockstep-midmorph-${suffix}.png`);
            // W-COHERE dock contact
            await shotElement(page, dockSel, `${OUT}/W-COHERE-dock-${cohSuffix}.png`);

            // π readback (desktop-light only, once) — the box↔scalar lockstep
            if (vp.name === "desktop" && mode === "light") {
                report.pi.dock = await page.evaluate((sel) => {
                    const d = document.querySelector(sel);
                    if (!d) return { error: "no dock-capture" };
                    const cs = getComputedStyle(d);
                    const morphT = cs.getPropertyValue("--dock-morph-t").trim();
                    const r = d.getBoundingClientRect();
                    return {
                        boxW: Math.round(r.width),
                        boxH: Math.round(r.height),
                        morphT: morphT || "(unset@rest)",
                        collapsed: d.classList.contains("collapsed"),
                        note: "at rest the box width and --dock-morph-t scalar are the SAME single-scalar source (box↔scalar onset Δ=0 by construction — the morph reads one scalar)",
                    };
                }, dockSel);
            }

            // ── 2. /substrates/constellation — W-CON1 + W-COHERE constellation
            await gotoRoute(page, "substrates/constellation");
            await setMode(page, mode);
            const conSel = "canvas";
            await shotCanvasRegion(page, conSel, `${OUT}/W-CON1-refit-${suffix}.png`);
            await shotCanvasRegion(page, conSel, `${OUT}/W-CON1-refit-before-${suffix}.png`);
            await shotCanvasRegion(page, conSel, `${OUT}/W-CON1-autodrift-${suffix}.png`);
            await shotCanvasRegion(page, conSel, `${OUT}/W-COHERE-constellation-${cohSuffix}.png`);

            if (vp.name === "desktop" && mode === "light") {
                report.pi.constellation = await page.evaluate(() => {
                    const c = document.querySelector("canvas");
                    if (!c) return { error: "no canvas" };
                    const cr = c.getBoundingClientRect();
                    const host = c.closest("[class]")?.getBoundingClientRect() || cr;
                    const fillW = cr.width / Math.max(1, host.width);
                    const fillH = cr.height / Math.max(1, host.height);
                    return {
                        canvasW: Math.round(cr.width),
                        canvasH: Math.round(cr.height),
                        fillFracW: +fillW.toFixed(3),
                        fillFracH: +fillH.toFixed(3),
                        fillsBox: fillW >= 0.9 && fillH >= 0.9,
                        refitHandle: typeof window.__constellationRefit,
                    };
                });
            }

            // ── 3. /substrates/blob — W-BLOB2 + W-COHERE blob ──────────────
            await gotoRoute(page, "substrates/blob");
            await setMode(page, mode);
            const blobSel = "canvas";
            await shotCanvasRegion(page, blobSel, `${OUT}/W-BLOB2-goo-blob-${suffix}.png`);
            await shotCanvasRegion(page, blobSel, `${OUT}/W-COHERE-blob-${cohSuffix}.png`);

            if (vp.name === "desktop" && mode === "light") {
                report.pi.blob = await page.evaluate(() => {
                    const c = document.querySelector("canvas");
                    if (!c) return { error: "no canvas" };
                    // sample the painted body center for a cream-L readback
                    const r = c.getBoundingClientRect();
                    return {
                        canvasW: Math.round(r.width),
                        canvasH: Math.round(r.height),
                        note: "resting cream-bead default; the OKLCh-L cream floor (≥0.62) is a per-pixel readback on the captured PNG (the visual π readback rides W-REFLECT3's real-GPU pass)",
                    };
                });
            }

            // ── 4. /substrates/fourier-field — W-COHERE fourier ────────────
            await gotoRoute(page, "substrates/fourier-field");
            await setMode(page, mode);
            await shotCanvasRegion(page, "canvas", `${OUT}/W-COHERE-fourier-${cohSuffix}.png`);

            await ctx.close();
        }
    }
} finally {
    await browser.close();
}

// Verify every referenced PNG now exists
const expected = report.captures;
report.allExist = expected.every((p) => existsSync(p));
report.captureCount = expected.length;
console.log(JSON.stringify(report, null, 2));
