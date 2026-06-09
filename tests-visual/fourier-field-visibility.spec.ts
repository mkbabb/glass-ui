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
//   (2) the trail body READS — the mean painted intensity over the canvas clears
//       a perceptibility floor (the peak*trailFloor survival).
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
// the trail-body perceptibility floor (the mean painted intensity over the whole
// canvas). The landed render reads ~0.35 (final) / ~0.52 (hero) light, lifted
// under the dark additive fork; the floor sits well below the lowest measured.
const BODY_MEAN_MIN = 0.08;
// the canvas indices in the story's "Two presets" section: 0 = hero, 1 = final.
const HERO_IDX = 0;
const FINAL_IDX = 1;

test.setTimeout(180_000);

interface FieldReadback {
    painted: number;
    spanW: number;
    spanH: number;
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
    const bodyMean = sum / (w * h);
    return { painted, spanW, spanH, bodyMean };
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

            // (2) the trail body reads — the survival floor (both presets paint).
            expect(
                fin.bodyMean,
                `final preset trail body is sub-perceptible: mean painted intensity ${fin.bodyMean.toFixed(3)} (< ${BODY_MEAN_MIN}) — the body died to the floor (${dark ? "dark" : "light"})`,
            ).toBeGreaterThanOrEqual(BODY_MEAN_MIN);
            expect(
                hero.bodyMean,
                `hero preset trail body is sub-perceptible: mean ${hero.bodyMean.toFixed(3)} (< ${BODY_MEAN_MIN}) — ${dark ? "dark" : "light"}`,
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
