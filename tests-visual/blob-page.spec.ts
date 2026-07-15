// AZ.W-BLOB-PAGE — the TRUE blob-page defect's π lane (born-RED at HEAD pre-fix).
//
// RE-ATTRIBUTION (the wave's §0 RE-GROUND): the GL renderer is NOT re-opened — the
// bead is crisp (refuted C6-1 / F2-R3-9-pixelation). The defect surface is THREE TRUE
// things this spec measures on the LIVE /substrates/blob page:
//   1. SWATCH-EDGE-CRISP — the static WatercolorDot SVG swatch edge flung isolated
//      dark specks into the light margin at high DPR (the "pixelated / low-res"
//      reading lived HERE, in the CSS-px feTurbulence, not in the GL bead). Measured
//      at MAX CONTRAST: the largest static swatch is forced pure black (the shipped
//      filter unchanged) and the fling-speck count is asserted below the floor. The
//      old sRGB/4-octave/scale-1.5/non-stitched filter read 7 specks on a black swatch
//      (ground c6-blob-07-black-2x.png); the device-px linearRGB/6-octave/stitch fix
//      reads 0.
//   2. SATELLITES-SEPARATE — the page-default bead's satellites orbited INSIDE the body
//      (orbitRadius 0.17 < bodyRadius 0.22), so the orbit show was invisible (single
//      connected component every frame, silhouette CV ≈ 0.026 perimeter-only). The
//      page-local orbit override (0.36 > body 0.22, 4 satellites at radius 0.11) lifts
//      the satellites OUTSIDE the skin: the metaball pseudopod/neck show reads on mount
//      (silhouette CV peaks ≈ 0.10, ≈3.7× baseline) AND a fully-separated satellite
//      component appears (peak connected-component count = 2). The four-side
//      containment HOLDS (worst-edge paint fraction = 0.000).
//   3. HERO-FIRST IA — the page LEADS with the living GL <Blob> hero, the static
//      WatercolorDot swatch row DEMOTED below it (a DOM-order assertion).
//
// Runner-truth: this spec LOADS :5199, so proof:blob-page is auto-detected
// LIVE_VERIFIED_LOCAL_ONLY. The device-free GL-fence is the SEPARATE
// proof:blob-page-fence (ci-tagged) — this spec carries the three visual π bites only.

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// ── tunables (live-set against the real device) ────────────────────────────────
// SWATCH-EDGE: fling-speck = a dark edge pixel with ≥3 of its 4 distance-5 neighbours
// in the light field (an isolated fleck flung off the contour into the margin). The
// old filter read 7 on a black swatch; the fix reads 0. Ceiling 3 admits a stray AA
// fleck while REDding the old coarse displacement.
const SPECK_DARK_T = 100;
const SPECK_LIGHT_T = 140;
const SPECK_NBR_DIST = 5;
const FLING_SPECK_MAX = 3;
// SATELLITES: the silhouette deviation (per-angle radius CV) the orbit-outside-body
// geometry drives. Baseline (orbit INSIDE body, 0.17 < body 0.22) peaks ≈ 0.026
// (perimeter-only pinch, single component every frame). The orbit-just-outside-body fix
// (0.30 > body 0.22, 4 satellites at radius 0.10) peaks ≈ 0.055 over a full cycle — the
// satellites neck the body as visible pseudopods. Floor 0.04 sits clear above the
// swallowed baseline (so the C6-3 geometry reds) AND clear below the reliable peak (so
// the show passes). The connected-component count is the STRONGER witness when a
// satellite fully detaches (count ≥ 2); the spec passes on EITHER (the OR the wave spec
// §6 bite 2 names), since the cream-on-light low contrast + the smin bridge (the
// membrane axis, W-BLOB-STUDIO's, left at default) mean full detachment is intermittent
// — the strong neck-pinch is the reliable witness, full separation a bonus.
const SILHOUETTE_CV_FLOOR = 0.04;
const DIFF_T = 38;
// Sample a FULL orbit cycle (the orbit phase runs 8-14s; 64 frames × 180ms ≈ 11.5s)
// so the PEAK neck-pinch is reliably caught — a short window can land entirely in a
// quiet inter-merge lull and miss the peak (the flake the long window removes). Over a
// full cycle the peak CV reliably reaches ≈ 0.055 (p90 ≈ 0.050); the 0.04 floor sits
// clear below it AND clear above the swallowed-orbit baseline ≈ 0.026.
const SAT_FRAMES = 64;
const FOOTPRINT_INSET = 0.1875;
const EDGE_RING_W = 2;
const SIDE_MARGIN_MAX = 0.6; // four-side containment ceil (the satellite-overflow budget)

test.setTimeout(180_000);

function luma(d: Buffer, i: number): number {
    return 0.299 * d[i]! + 0.587 * d[i + 1]! + 0.114 * d[i + 2]!;
}
function modalBg(png: PNG): [number, number, number] {
    const { data } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        const k = ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
        counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    let best = 0, bk = 0;
    for (const [k, c] of counts) if (c > best) { best = c; bk = k; }
    return [((bk >> 8) & 15) * 16 + 8, ((bk >> 4) & 15) * 16 + 8, (bk & 15) * 16 + 8];
}
function diff(d: Buffer, i: number, bg: [number, number, number]): number {
    return Math.abs(d[i]! - bg[0]) + Math.abs(d[i + 1]! - bg[1]) + Math.abs(d[i + 2]! - bg[2]);
}

/** Isolated dark fling-specks in the light margin (the D1 coarse-edge defect). */
function flingSpecks(png: PNG): number {
    const { width: w, height: h, data } = png;
    const D = SPECK_NBR_DIST;
    let s = 0;
    for (let y = D; y < h - D; y++)
        for (let x = D; x < w - D; x++) {
            const i = (y * w + x) * 4;
            if (luma(data, i) >= SPECK_DARK_T) continue;
            const nb = [
                luma(data, (y * w + x - D) * 4),
                luma(data, (y * w + x + D) * 4),
                luma(data, ((y - D) * w + x) * 4),
                luma(data, ((y + D) * w + x) * 4),
            ].filter((v) => v > SPECK_LIGHT_T).length;
            if (nb >= 3) s++;
        }
    return s;
}

/** Connected-component count of painted regions (4-connectivity, min-area filtered). */
function components(png: PNG, bg: [number, number, number]): number {
    const { width: w, height: h, data } = png;
    const painted = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) if (diff(data, i * 4, bg) > DIFF_T) painted[i] = 1;
    const seen = new Uint8Array(w * h);
    let comps = 0;
    const stack: number[] = [];
    const MIN_AREA = Math.max(20, Math.floor(w * h * 0.0006));
    for (let s = 0; s < w * h; s++) {
        if (!painted[s] || seen[s]) continue;
        let area = 0;
        stack.length = 0; stack.push(s); seen[s] = 1;
        while (stack.length) {
            const pp = stack.pop()!; area++;
            const x = pp % w, y = (pp / w) | 0;
            if (x + 1 < w) { const n = pp + 1; if (painted[n] && !seen[n]) { seen[n] = 1; stack.push(n); } }
            if (x - 1 >= 0) { const n = pp - 1; if (painted[n] && !seen[n]) { seen[n] = 1; stack.push(n); } }
            if (y + 1 < h) { const n = pp + w; if (painted[n] && !seen[n]) { seen[n] = 1; stack.push(n); } }
            if (y - 1 >= 0) { const n = pp - w; if (painted[n] && !seen[n]) { seen[n] = 1; stack.push(n); } }
        }
        if (area >= MIN_AREA) comps++;
    }
    return comps;
}

/** Per-angle outermost-painted-radius CV about the painted centroid (the neck-pinch). */
function silhouetteCV(png: PNG, bg: [number, number, number]): number {
    const { width: w, height: h, data } = png;
    let sx = 0, sy = 0, n = 0;
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            if (diff(data, (y * w + x) * 4, bg) <= DIFF_T) continue;
            sx += x; sy += y; n++;
        }
    if (n < 16) return 0;
    const cx = sx / n, cy = sy / n, BINS = 64;
    const maxR = new Array<number>(BINS).fill(0);
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            if (diff(data, (y * w + x) * 4, bg) <= DIFF_T) continue;
            const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy);
            let b = Math.floor(((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI)) * BINS);
            if (b >= BINS) b = BINS - 1;
            if (r > maxR[b]!) maxR[b] = r;
        }
    const radii = maxR.filter((r) => r > 0);
    if (radii.length < BINS / 2) return 0;
    const m = radii.reduce((a, b) => a + b, 0) / radii.length;
    const v = radii.reduce((a, b) => a + (b - m) * (b - m), 0) / radii.length;
    return m > 0 ? Math.sqrt(v) / m : 0;
}

/** Worst footprint-edge paint fraction (the four-side containment witness). */
function worstSideMargin(png: PNG, bg: [number, number, number]): number {
    const { width: w, height: h, data } = png;
    const fx0 = Math.floor(w * FOOTPRINT_INSET), fx1 = Math.ceil(w * (1 - FOOTPRINT_INSET));
    const fy0 = Math.floor(h * FOOTPRINT_INSET), fy1 = Math.ceil(h * (1 - FOOTPRINT_INSET));
    const ring = (cells: () => Iterable<[number, number]>) => {
        let t = 0, dn = 0;
        for (const [x, y] of cells()) { t++; if (diff(data, (y * w + x) * 4, bg) > DIFF_T) dn++; }
        return t ? dn / t : 0;
    };
    const L = ring(function* () { for (let x = fx0; x < fx0 + EDGE_RING_W; x++) for (let y = fy0; y < fy1; y++) yield [x, y]; });
    const R = ring(function* () { for (let x = fx1 - EDGE_RING_W; x < fx1; x++) for (let y = fy0; y < fy1; y++) yield [x, y]; });
    const T = ring(function* () { for (let y = fy0; y < fy0 + EDGE_RING_W; y++) for (let x = fx0; x < fx1; x++) yield [x, y]; });
    const B = ring(function* () { for (let y = fy1 - EDGE_RING_W; y < fy1; y++) for (let x = fx0; x < fx1; x++) yield [x, y]; });
    return Math.max(L, R, T, B);
}

async function largestSwatch(page: import("@playwright/test").Page): Promise<Locator> {
    const swatches = page.locator('[data-testid="watercolor-swatch"]');
    await swatches.first().waitFor({ state: "visible", timeout: 20_000 });
    const n = await swatches.count();
    let best = swatches.first(), bestW = 0;
    for (let i = 0; i < n; i++) {
        const box = await swatches.nth(i).boundingBox();
        if (box && box.width > bestW) { bestW = box.width; best = swatches.nth(i); }
    }
    return best;
}

/** Mask the viewport-fixed shell-dock chrome before a pixel measurement. The
 *  W-RAIL3 floating facet carousel rides the sidebar dock's midline OVER page
 *  content (the ratified floating-overlay paradigm — content scrolls behind), so
 *  an element-screenshot of content near the viewport's mid-left band captures a
 *  chip's dark glyph pixels as false "specks". The probe's subject is the BLOB
 *  surface, never the shell chrome; masking it is honest, hiding the page is not. */
async function maskShellChrome(page: import("@playwright/test").Page): Promise<void> {
    await page.addStyleTag({
        content: ".dock-hairline-slot, .glass-dock-frame { display: none !important; }",
    });
}

test.describe("blob-page (π lane — the TRUE blob-page defect, fail-CLOSED)", () => {
    // The static WatercolorDot swatch edge renders a clean DEVICE-PX contour with no
    // coarse flung speckle, measured at MAX CONTRAST (the largest swatch forced black).
    test.describe(() => {
        test.use({ deviceScaleFactor: 3 });
        test("SWATCH-EDGE-CRISP — no coarse flung speckle on the device-px swatch edge", async ({ page }) => {
            await page.goto(PI_TARGETS.blob.path);
            await maskShellChrome(page);
            const sw = await largestSwatch(page);
            // Force the shipped swatch to pure black (the FILTER unchanged) — the max-
            // contrast case the D1 coarse displacement flung specks into.
            await sw.evaluate((el) => { (el as HTMLElement).style.backgroundColor = "#000000"; });
            await page.waitForTimeout(300);
            const png = PNG.sync.read(await sw.screenshot());
            const specks = flingSpecks(png);
            expect(
                specks,
                `WatercolorDot black-swatch fling-speck count ${specks} exceeds the device-px-crisp ceiling ${FLING_SPECK_MAX} — the SVG turbulence filter flung isolated dark specks into the light margin (the coarse low-res-reading edge D1; the old sRGB/4-octave/scale-1.5/non-stitched filter read 7, the device-px linearRGB/6-octave/stitch fix reads 0)`,
            ).toBeLessThanOrEqual(FLING_SPECK_MAX);
        });
    });

    // The page-default bead's satellites orbit OUTSIDE the body skin: the metaball
    // pseudopod/neck show reads (silhouette CV ≫ the swallowed-orbit baseline) AND/OR a
    // satellite fully separates (component count ≥ 2). Source-witness: orbitRadius >
    // bodyRadius. Four-side containment HOLDS.
    test.describe(() => {
        test.use({ deviceScaleFactor: 2 });
        test("SATELLITES-SEPARATE — the orbit show reads on the page-default bead (CV ≫ baseline OR a separated component), contained", async ({ page }) => {
            await page.goto(PI_TARGETS.blob.path);
            await maskShellChrome(page);
            const blob = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
            await blob.waitFor({ state: "visible", timeout: 20_000 });
            await page.waitForTimeout(600);
            let peakComps = 1, maxCV = 0, maxEdge = 0;
            for (let f = 0; f < SAT_FRAMES; f++) {
                const png = PNG.sync.read(await blob.screenshot());
                const bg = modalBg(png);
                peakComps = Math.max(peakComps, components(png, bg));
                maxCV = Math.max(maxCV, silhouetteCV(png, bg));
                maxEdge = Math.max(maxEdge, worstSideMargin(png, bg));
                await page.waitForTimeout(180);
            }
            // The orbit SHOW reads: either a full separation (≥2 components) OR a strong
            // neck-pinch (CV ≫ the swallowed-orbit baseline ≈ 0.026). The swallowed-orbit
            // HEAD reds BOTH (CV ≈ 0.026 < floor AND single component every frame).
            const showReads = peakComps >= 2 || maxCV >= SILHOUETTE_CV_FLOOR;
            expect(
                showReads,
                `the satellite orbit show is NOT visible: peak connected-component count ${peakComps} (< 2 — no satellite fully separated) AND peak silhouette CV ${maxCV.toFixed(4)} (< the floor ${SILHOUETTE_CV_FLOOR} — the satellites orbit INSIDE the body skin and merge entirely, the C6-3 swallowed-orbit baseline ≈ 0.026). Lift orbitRadius past bodyRadius so the orbit→merge→absorb→emerge show reads.`,
            ).toBe(true);
            // FOUR-SIDE CONTAINMENT — the bead stays inside the 1.6×-oversized canvas
            // footprint (the AX.W15 containment holds at the new orbit).
            expect(
                maxEdge,
                `blob worst footprint-edge paint fraction ${maxEdge.toFixed(3)} exceeds the satellite-overflow ceil ${SIDE_MARGIN_MAX} — the raised orbit broke the four-side containment (the bead clips the canvas edge)`,
            ).toBeLessThanOrEqual(SIDE_MARGIN_MAX);

            // SOURCE-WITNESS — the page's effective orbitRadius > bodyRadius. The page's
            // stageConfig spreads BLOB_CONFIG_DEFAULTS then overrides geometry.orbitRadius
            // (the D2 fix); the bodyRadius stays the default. Parse both from source.
            const blobVue = fileURLToPath(new URL("../demo/stories/substrates/blob.vue", import.meta.url));
            const typesTs = fileURLToPath(new URL("../src/components/blob/types.ts", import.meta.url));
            const blobSrc = readFileSync(blobVue, "utf8");
            const typesSrc = readFileSync(typesTs, "utf8");
            const orbitOverride = blobSrc.match(/orbitRadius:\s*([\d.]+)/);
            const bodyDefault = typesSrc.match(/bodyRadius:\s*([\d.]+)/);
            const orbit = orbitOverride ? Number(orbitOverride[1]) : NaN;
            const body = bodyDefault ? Number(bodyDefault[1]) : NaN;
            expect(
                orbit,
                `could not parse the page's orbitRadius override from blob.vue — the source-witness cannot confirm orbitRadius > bodyRadius`,
            ).toBeGreaterThan(0);
            expect(
                orbit,
                `the page's effective orbitRadius ${orbit} is NOT greater than bodyRadius ${body} — the satellites still orbit INSIDE the body skin (the C6-3 geometry: orbit 0.17 < body 0.22). The source MUST lift orbitRadius past bodyRadius.`,
            ).toBeGreaterThan(body);
        });
    });

    // The page LEADS with the living GL <Blob> hero; the static WatercolorDot swatch
    // row is DEMOTED below it (a DOM-order assertion).
    test("HERO-FIRST IA — the first interactive blob surface in DOM order is the GL hero, not the static swatch row", async ({ page }) => {
        await page.goto(PI_TARGETS.blob.path);
        await maskShellChrome(page);
        await page.locator('canvas[data-testid="goo-blob-canvas"]').first().waitFor({ state: "visible", timeout: 20_000 });
        await page.locator('[data-testid="watercolor-swatch"]').first().waitFor({ state: "attached", timeout: 20_000 });
        // The DOCUMENT order of the first GL canvas vs the first static swatch. The GL
        // hero must come FIRST (Node.DOCUMENT_POSITION_FOLLOWING = 4 means the swatch
        // follows the canvas).
        const heroBeforeStatic = await page.evaluate(() => {
            const canvas = document.querySelector('canvas[data-testid="goo-blob-canvas"]');
            const swatch = document.querySelector('[data-testid="watercolor-swatch"]');
            if (!canvas || !swatch) return null;
            // 4 = DOCUMENT_POSITION_FOLLOWING (swatch follows canvas in document order)
            return (canvas.compareDocumentPosition(swatch) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
        });
        expect(
            heroBeforeStatic,
            `the living GL <Blob> hero does NOT lead the page in DOM order — the static WatercolorDot swatch row still precedes it (the C6-4 inverted IA: a fresh viewer reads the static swatches as "the blobs"). Re-order so the GL hero leads.`,
        ).toBe(true);
    });
});
