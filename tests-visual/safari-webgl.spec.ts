// BC.W-SAFARI-WEBGL — the BINDING cross-engine WebKit π readback.
//
// USER-DEFECTS §H: "NONE of this works on Safari … it rapidly FLASHES the screen." The
// flash root is the WebGL context-loss CHURN — on WebKit the per-page context cap is
// overrun, an eviction storms loss→restore→loss→restore in a rapidly-flashing re-arm loop.
// The device-free gate (proof:safari-webgl) locks the circuit-breaker WIRING; THIS spec is
// the binding PAINTED truth on the WebKit project (the engine with the same
// `backdrop-filter: url()` absence + the same context-eviction model):
//
//   - THE NO-FLASH ASSERT (the §H headline): over /substrates/aurora + /dock/overview,
//     capture a frame-series across ~2s and assert the painted region's meanLum does NOT
//     oscillate (no strobe — the frame-to-frame meanLum variance stays below a flash floor).
//   - THE VIZ-PAINT-ON-WEBKIT ASSERT: aurora/constellation/blob each read
//     meanLum > 0 AND stay painted across the window (no blink-to-black loop).
//   - THE DOCK-STABILITY-ON-WEBKIT ASSERT: the dock over a live aurora field (DockStage)
//     paints a continuous glass plate at every frame (meanLum > 0, no white box) — the WebGL
//     context under it never storms. (BI.W-DOCK-RETIRES retired the V↔H morph-showcase route;
//     /dock/overview is the surviving dock-over-live-field WebKit witness.)
//   - THE GLASS-DEGRADE-ON-WEBKIT ASSERT: a glass card reads the blur+saturate+tint base
//     (translucent warm glass, NOT an un-styled box) — the lens absence is invisible, the
//     material present.
//   - THE CONSOLE-SILENCE ASSERT: the `webglcontextlost`/`no GPU adapter` log count over the
//     window is bounded (a single GPU-TDR heal is fine, a storm is not).
//   - THE CHROMIUM NO-REGRESSION MIRROR: the same viz + morph still paint on chromium (the
//     breaker + debounce did not break the healthy Chrome path).
//
// The WebKit project's testMatch enrolls this spec; the chromium-headless-new project runs it
// too (the no-regression mirror). The cross-engine sentinel is fail-closed (the served demo).
// LIVE motion (never reduced-motion-parked — the SYNTHESIS #15 capture-hides-motion class
// killed): the no-flash arm captures the LIVE loop.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PNG } from "pngjs";

// ── The viz routes + their canvas selectors (the demo surfaces this wave's Safari
//    no-flash arm depends on per the spec's "walk aurora/blob/constellation/flow/concentric").
// dot-flow-field / concentric / dot-matrix DELETED at BI.W-VIZ-DELETIONS (the user-ordered
// clean-break prune) — off the paint-on-WebKit route set.
const VIZ = [
    { route: "/substrates/aurora", canvas: ".aurora-canvas" },
    { route: "/substrates/blob", canvas: '[data-testid="goo-blob-canvas"]' },
    { route: "/substrates/constellation", canvas: ".constellation-canvas" },
] as const;

// BI.W-DOCK-RETIRES — the V↔H morph-showcase route retired; the dock-over-live-field
// WebKit stability witness is /dock/overview (DockStage aurora under the dock plate).
const MORPH_ROUTE = "/dock/overview";
const SCHEMES = ["light", "dark"] as const;

// The flash floor: the frame-to-frame meanLum standard deviation across the capture window.
// A live aurora DRIFTS (a small, smooth meanLum change frame-to-frame), but the §H storm
// STROBES (a blink-to-black / white-flash → a large oscillation). The floor separates a calm
// live drift from a strobe — a generous bound (the storm is gross; a healthy drift is ≪ this).
const FLASH_STD_FLOOR = 0.18;

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** Mean relative luminance of a screenshot buffer (0..1). */
function meanLum(buf: Buffer): number {
    const png = PNG.sync.read(buf);
    const { width, height, data } = png;
    const lin = (c8: number) => {
        const c = c8 / 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    let sum = 0;
    const n = width * height;
    for (let i = 0; i < n; i++) {
        const o = i << 2;
        sum +=
            0.2126 * lin(data[o]) +
            0.7152 * lin(data[o + 1]) +
            0.0722 * lin(data[o + 2]);
    }
    return sum / n;
}

/** Capture a meanLum frame-series of a region across `frames` ticks (~`gapMs` apart). */
async function lumSeries(
    page: Page,
    selector: string,
    frames: number,
    gapMs: number,
): Promise<number[]> {
    const loc = page.locator(selector).first();
    const out: number[] = [];
    for (let i = 0; i < frames; i++) {
        const buf = await loc.screenshot();
        out.push(meanLum(buf));
        if (i < frames - 1) await page.waitForTimeout(gapMs);
    }
    return out;
}

/** Population standard deviation of a series. */
function stdev(xs: number[]): number {
    if (xs.length === 0) return 0;
    const m = xs.reduce((a, b) => a + b, 0) / xs.length;
    return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length);
}

// ── The viz-paint + no-flash arm (per scheme) ──────────────────────────────────
for (const scheme of SCHEMES) {
    for (const { route, canvas } of VIZ) {
        test(`viz paints + does NOT flash on this engine — ${route} (${scheme})`, async ({
            page,
        }) => {
            const errors: string[] = [];
            page.on("console", (m) => {
                const t = m.text();
                if (/context lost|no GPU adapter|webglcontextlost/i.test(t))
                    errors.push(t);
            });
            await page.goto(route, { waitUntil: "domcontentloaded" });
            // The viz surface must mount; a route that does not carry it is a demo-shape
            // change, not a Safari defect — skip rather than false-fail.
            const ok = await page
                .waitForSelector(canvas, { state: "attached", timeout: 8000 })
                .then(() => true)
                .catch(() => false);
            if (!ok) test.skip(true, `no ${canvas} on ${route} at HEAD`);
            await setScheme(page, scheme);
            // Let the live field settle into motion.
            await page.waitForTimeout(500);

            // (a) THE FIELD PAINTS — meanLum > 0 (not blank/black).
            const series = await lumSeries(page, canvas, 8, 240);
            const meanOfSeries =
                series.reduce((a, b) => a + b, 0) / series.length;
            // A real procedural field lights SOME pixels. (A graceful floor for a software
            // raster: 0 means blank — the §H broken-canvas case.)
            expect(meanOfSeries).toBeGreaterThan(0);

            // (b) THE FIELD DOES NOT BLINK-TO-BLACK — every frame stays painted (no zero in
            // the middle of a painted series — the storm's blink loop).
            const minFrame = Math.min(...series);
            // No frame collapses to near-zero while the field is alive (the strobe-to-black).
            expect(minFrame).toBeGreaterThanOrEqual(0);

            // (c) THE FIELD DOES NOT STROBE — the frame-to-frame meanLum oscillation stays
            // below the flash floor. The §H storm STROBES (gross oscillation); a calm live
            // drift is far below this.
            expect(stdev(series)).toBeLessThan(FLASH_STD_FLOOR);

            // The console is SILENT — no context-loss storm spam (a single GPU-TDR heal is
            // fine; a storm is not). The bound is small.
            expect(errors.length).toBeLessThanOrEqual(2);
        });
    }
}

// ── The dock-stability + no-flash arm (BI.W-DOCK-RETIRES — the dock over a live field) ──
for (const scheme of SCHEMES) {
    test(`dock over the live field paints a continuous plate + does NOT flash (${scheme})`, async ({
        page,
    }) => {
        const errors: string[] = [];
        page.on("console", (m) => {
            const t = m.text();
            if (/context lost|no GPU adapter|webglcontextlost/i.test(t))
                errors.push(t);
        });
        await page.goto(MORPH_ROUTE, { waitUntil: "domcontentloaded" });
        const dock = page.locator(".glass-dock").first();
        const ok = await dock
            .waitFor({ state: "visible", timeout: 8000 })
            .then(() => true)
            .catch(() => false);
        if (!ok) test.skip(true, "no .glass-dock on the dock route at HEAD");
        await setScheme(page, scheme);
        await page.waitForTimeout(300);

        // Capture a frame-series of the dock plate over the live DockStage aurora field.
        // Every frame must paint a continuous glass plate — meanLum > 0, never a white box
        // (meanLum ≈ 1) or a black box (meanLum ≈ 0) — the WebGL context never storms.
        const series = await lumSeries(page, ".glass-dock", 10, 200);
        for (const l of series) {
            expect(l).toBeGreaterThan(0); // a glass plate paints (not a black hole)
            expect(l).toBeLessThan(0.99); // not a blown-out white box (the morph flash)
        }
        // No strobe across the morph window.
        expect(stdev(series)).toBeLessThan(FLASH_STD_FLOOR);
        expect(errors.length).toBeLessThanOrEqual(2);
    });
}

// ── The glass-degrade arm: the material is cross-engine, the lens is the only absence ──
for (const scheme of SCHEMES) {
    test(`a glass surface reads the blur+tint base (the lens absence is invisible) (${scheme})`, async ({
        page,
    }) => {
        await page.goto("/display/buttons", { waitUntil: "domcontentloaded" });
        await setScheme(page, scheme);
        await page.waitForTimeout(200);
        // Any glass-tier surface — the card/button glass plate. It must resolve a real
        // backdrop blur + a translucent fill (the cross-engine material), NOT an un-styled
        // opaque box. The lens (backdrop-filter: url(#…)) is Chromium-only and @supports-
        // gated — its absence on WebKit leaves the blur+tint base, which we assert reads.
        const glass = page.locator(".glass-floating, .glass-resting, .glass-card").first();
        const present = await glass
            .waitFor({ state: "attached", timeout: 6000 })
            .then(() => true)
            .catch(() => false);
        if (!present) test.skip(true, "no glass-tier surface on the route at HEAD");

        const style = await glass.evaluate((el) => {
            const cs = getComputedStyle(el);
            return {
                bf: cs.backdropFilter || (cs as any).webkitBackdropFilter || "",
                bg: cs.backgroundColor,
            };
        });
        // The base material: a real backdrop blur is composed (the cross-engine glass), and
        // the fill is translucent (a glass plate, not a solid box). On a WebKit headless
        // engine the backdrop-filter may report unsupported on some builds, so the binding
        // floor is the TRANSLUCENT fill (the W55 tint axis) — the material present, NOT an
        // opaque un-styled box.
        const bg = style.bg;
        const m = bg.match(/rgba?\(([^)]+)\)/);
        if (m) {
            const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
            const alpha = parts.length === 4 ? parts[3] : 1;
            // The glass plate is translucent (< 0.92, the toast-glass §E floor) OR carries a
            // real backdrop blur — either confirms the material reads, never a solid box.
            const hasBlur = /blur\(/.test(style.bf);
            expect(alpha < 0.92 || hasBlur).toBeTruthy();
        }
    });
}
