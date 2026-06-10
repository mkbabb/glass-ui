// AY.W-FF2 — proof:fourier-field-visibility-live, the π-lane phosphor-comet
// VISIBILITY render observation (the device gate the static gate cannot reach).
// Mirrors the substrate-paints-color shape: a REAL component render + a
// painted-canvas readback, NOT a grep.
//
// The CPU-oracle blindspot the cardinal lesson names: typecheck + the static
// `proof:fourier-field-intensity` gate ALL pass while the LIVE field could still
// paint a faint corner stub (the chronic AX→AY visible-invisibility). So this
// spec navigates to the REAL `/substrates/fourier-field` story — which mounts the
// real <FourierField hero> + <FourierField final> on the live Canvas2D substrate
// — scrolls each into view (the substrate parks an offscreen surface), and READS
// BACK the painted canvas (a composited element screenshot decoded with pngjs —
// the robust GPU/2D-context readback). It runs for BOTH `.dark = false` (the
// `source-over` blend on cream) AND `.dark = true` (the additive `lighter`
// phosphor bloom on ink). Born-RED at HEAD: the 0.24-quadratic `final` preset
// painted a corner stub (spanW/spanH well below the 25% floor) and a
// sub-perceptible body.
//
// The intensity-recession truth (the loudness knob is load-bearing) is the
// COMPLEMENTARY UNIT assert — `tests/components/custom/fourier-field/
// FourierField.smoke.test.ts` asserts `peak = peakAlpha * intensityClamped` so a
// recessed intensity strictly dims the paint (the math is load-bearing). The
// device gate owns the VISIBLE truths a real render alone can witness; the smoke
// test owns the intensity arithmetic. (happy-dom has no Canvas2D, so a pixel
// readback at two intensities is not a unit-test capability — the math IS.)
//
// ASSERTS (per preset × per mode):
//   (1) NOT a corner stub — the painted bounding box spans ≥25% of width AND
//       ≥25% of height. A trail-only curve that filled a corner failed this; the
//       landed render traverses the frame. The direct D2 binding truth.
//   (1b) [W-FF3] the comet is a SUBSTANTIAL ARC — the painted bbox DIAGONAL spans
//       ≥0.6 (normalized). The W-FF2 RG2 named the 25%-span floor a weak proxy a
//       thin arc clears; the diagonal floor binds the rebuilt register's "comet
//       body toward ~1/3 period" sweep (the rebuilt presets traverse diag≥1.0;
//       the faint W-FF2 stub measured diag≈0.3). The arc-length metric the RG2
//       called for — beyond the bbox-span proxy.
//   (2) the trail body READS BOLD — the mean painted intensity over the canvas
//       clears a perceptibility floor. [W-FF3] the floor is RAISED from 0.08 to
//       1.5: the W-FF2 faint hairline measured ~0.35 (clearing 0.08 trivially —
//       the "far too faint" the user flagged); the rebuilt bold ≈3px/≈0.9-peak
//       register measures ≥4.2 light (≥12 dark). The 1.5 floor binds the BOLD
//       register and REDs the faint one — not a non-emptiness rubber-stamp.
//   (3) BOTH modes — every assert runs for isDark=false AND isDark=true.
//   (5) the two presets are a DISTINCT family — `hero` (epicycles ON,
//       scaffolding) paints measurably more structure than `final` (trail-only)
//       at the same intensity.

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { resolveScene } from "./pi-manifest.ts";

const FOURIER = resolveScene("substrates", "fourier-field");

// "painted" = a pixel whose colour differs from the canvas's own modal background
// (read off the corner) by more than this L1 channel-sum. The field paints a
// saturated hue, so a real stroke clears it; the calm card background reads ~0.
const PAINT_THRESHOLD = 24;
// the non-corner-stub floor: the painted bbox must span ≥ this fraction per axis.
const BBOX_SPAN_MIN = 0.25;
// [W-FF3] the arc-length floor (the RG2 metric beyond bbox-span): the painted
// bbox DIAGONAL, normalized. The rebuilt comet sweeps diag≥1.0; a thin corner
// stub measures ≈0.3. 0.6 binds the substantial-arc register, REDs a stub.
const ARC_DIAG_MIN = 0.6;
// [W-FF3] the BOLD trail-body floor (the mean painted intensity over the whole
// canvas). RAISED from the W-FF2 0.08 non-emptiness rubber-stamp: the faint
// hairline measured ~0.35; the rebuilt bold register reads ≥4.2 light / ≥12 dark.
// 1.5 binds the bold register and REDs the faint one (the user's "far too faint").
const BODY_MEAN_MIN = 1.5;
// the canvas indices in the story's "Two presets" section: 0 = hero, 1 = final.
const HERO_IDX = 0;
const FINAL_IDX = 1;

test.setTimeout(180_000);

interface FieldReadback {
    painted: number;
    spanW: number;
    spanH: number;
    diag: number;
    bodyMean: number;
}

/** Composited element screenshot → decoded RGBA (the robust canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Decode the painted-pixel metrics over the canvas's own modal background. */
function analyze(png: PNG): FieldReadback {
    const { width: w, height: h, data } = png;
    // the modal background = the top-left corner pixel (outside the centred curve).
    const bg = [data[0]!, data[1]!, data[2]!];
    let painted = 0;
    let sum = 0;
    let minX = w;
    let minY = h;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const d =
                Math.abs(bg[0]! - data[i]!) +
                Math.abs(bg[1]! - data[i + 1]!) +
                Math.abs(bg[2]! - data[i + 2]!);
            if (d > PAINT_THRESHOLD) {
                painted++;
                sum += d;
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }
    }
    const spanW = maxX >= minX ? (maxX - minX + 1) / w : 0;
    const spanH = maxY >= minY ? (maxY - minY + 1) / h : 0;
    // the normalized bbox diagonal — the arc-length proxy (the RG2 metric): a
    // comet that sweeps the frame reads ≈1.0..1.41; a corner stub reads ≈0.3.
    const diag = Math.sqrt(spanW * spanW + spanH * spanH);
    const bodyMean = sum / (w * h);
    return { painted, spanW, spanH, diag, bodyMean };
}

/** Scroll a canvas into view (un-park the substrate), settle, screenshot, read. */
async function readCanvas(
    page: import("@playwright/test").Page,
    idx: number,
): Promise<FieldReadback> {
    const canvas = page.locator("canvas.fourier-field-canvas").nth(idx);
    await canvas.waitFor({ state: "visible", timeout: 20_000 });
    await canvas.scrollIntoViewIfNeeded();
    // the substrate seeds + animates a few frames after un-park; settle a moving
    // comet trail so the readback sees the established curve, not the first frame.
    await page.waitForTimeout(1800);
    return analyze(await grab(canvas));
}

for (const dark of [false, true]) {
    test.describe(`fourier-field-visibility-live — ${dark ? "dark" : "light"} (π lane — fail-CLOSED)`, () => {
        test.use({ colorScheme: dark ? "dark" : "light" });

        test(`final preset reads (not a corner stub) + trail body + distinct family`, async ({
            page,
        }) => {
            await page.goto(FOURIER.path);
            if (dark) await page.evaluate(() => document.documentElement.classList.add("dark"));
            await page.waitForLoadState("networkidle");

            const hero = await readCanvas(page, HERO_IDX);
            const fin = await readCanvas(page, FINAL_IDX);

            // (1) final is NOT a corner stub — the bbox traverses the frame.
            expect(
                fin.spanW,
                `final preset paints a corner stub: bbox spans only ${(fin.spanW * 100).toFixed(0)}% width (< ${BBOX_SPAN_MIN * 100}%) — ${dark ? "dark" : "light"}`,
            ).toBeGreaterThanOrEqual(BBOX_SPAN_MIN);
            expect(
                fin.spanH,
                `final preset paints a corner stub: bbox spans only ${(fin.spanH * 100).toFixed(0)}% height (< ${BBOX_SPAN_MIN * 100}%) — ${dark ? "dark" : "light"}`,
            ).toBeGreaterThanOrEqual(BBOX_SPAN_MIN);

            // (1b) [W-FF3] the comet is a SUBSTANTIAL ARC — the bbox DIAGONAL (the
            // RG2 arc-length metric) clears 0.6 for BOTH presets. A thin arc that
            // cleared the bbox-span proxy but only nicked a corner fails here.
            expect(
                fin.diag,
                `final preset comet is a stub, not a substantial arc: bbox diagonal ${fin.diag.toFixed(3)} (< ${ARC_DIAG_MIN}) — the comet must sweep ~1/3 the period (${dark ? "dark" : "light"})`,
            ).toBeGreaterThanOrEqual(ARC_DIAG_MIN);
            expect(
                hero.diag,
                `hero preset comet is a stub: bbox diagonal ${hero.diag.toFixed(3)} (< ${ARC_DIAG_MIN}) — ${dark ? "dark" : "light"}`,
            ).toBeGreaterThanOrEqual(ARC_DIAG_MIN);

            // (2) the trail body reads BOLD — the RAISED survival floor (both
            // presets paint a bold, present stroke, not a faint hairline).
            expect(
                fin.bodyMean,
                `final preset trail body is faint: mean painted intensity ${fin.bodyMean.toFixed(3)} (< ${BODY_MEAN_MIN}) — the bold register is absent, the field reads "far too faint" (${dark ? "dark" : "light"})`,
            ).toBeGreaterThanOrEqual(BODY_MEAN_MIN);
            expect(
                hero.bodyMean,
                `hero preset trail body is faint: mean ${hero.bodyMean.toFixed(3)} (< ${BODY_MEAN_MIN}) — ${dark ? "dark" : "light"}`,
            ).toBeGreaterThanOrEqual(BODY_MEAN_MIN);

            // (5) hero (epicycles ON — scaffolding) paints measurably more
            // structure than final (trail-only) at the same intensity.
            expect(
                hero.painted,
                `hero did not paint more structure than final (hero ${hero.painted}px vs final ${fin.painted}px) — the epicycle scaffolding is absent, the presets are not a distinct family (${dark ? "dark" : "light"})`,
            ).toBeGreaterThan(fin.painted);
        });
    });
}
