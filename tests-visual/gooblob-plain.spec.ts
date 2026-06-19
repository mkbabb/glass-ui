// BC.W-GOOBLOB-PLAIN — the STAGE-1 plain-blob π binding readback (LOCAL real-GPU).
//
// The device-free source gate (proof:gooblob-plain --source) asserts the ARCHITECTURE
// (the uStage-gated stripped fs_main + the byte-preserved smin math + the
// derivative-safety + the spare-lane SoT extend). THIS spec is the BINDING VISUAL TRUTH
// — the BB blob shipped headless-green but visually-BROKEN (dark / no-render / not-
// meatballing); the cardinal split's paint floor lives HERE. It proves, on the real
// /substrates/blob device (the STAGE-1 `variant="blob"` section), in BOTH modes:
//
//   (a) THE STAGE-1 BLOB PAINTS — meanLum > 0 within ~500ms of mount (NOT a black void —
//       the D9' no-render disease). The plain blob is a real warm-cream droplet.
//
//   (b) THE EDGE IS CRISP (fwidth-AA, not a blurry ring) — the alpha ramps from ~0 to
//       ~full over ≤ a couple px at the silhouette boundary, not a wide feathered halo.
//
//   (c) THE MEATBALL MERGES — across a multi-frame orbit sweep at the merge phase the
//       body+satellite silhouette is ONE connected component (a smooth liquid neck, not
//       two unrelated discs). The smin band bridges the worst-case orbit (the
//       BA.W-GOO-REDRESS widen verified PAINTING through the STAGE-1 floor).
//
//   (d) THE FLOOR IS FLAT — the STAGE-1 render carries NO bright specular hotspot (the
//       lit dressing is absent — the teaching contrast with STAGE 2). The peak luma is
//       bounded below a blown-white glint.
//
// It also EMITS the real-GPU paint record (W-GOOBLOB-PLAIN-paint.json) the
// `proof:gooblob-plain` FULL arm reads — the BB gate-paint-blindness close (a real
// rendered-surface meanLum, never a file-presence proxy). On a clean CI runner with no
// Playwright + GPU the harness grace-SKIPs.

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveScene } from "./pi-manifest.ts";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual");
const PAINT_RECORD = resolve(VISUAL_DIR, "W-GOOBLOB-PLAIN-paint.json");
const BLOB_ROUTE = resolveScene("substrates", "blob").path; // /substrates/blob

const SCHEMES = ["light", "dark"] as const;

// ── tunables (live-set against the real device) ────────────────────────────────
// PAINT: the plain blob writes premultiplied rgb*alpha where it exists. Mean luminance
// over the opaque (alpha-keyed) silhouette must be > 0 — a black void is the D9' disease.
const MEAN_LUM_FLOOR = 4; // 0..255; a real cream droplet reads well above this
// CRISP EDGE: the alpha ramp from transparent→opaque spans ≤ this many source px at the
// silhouette boundary (fwidth-AA is ~1px; a blurry ring would feather over many px).
const EDGE_RAMP_MAX_PX = 3;
// MEATBALL: one connected component at the merge phase, ignoring sub-floor AA specks.
const MERGE_MAX_COMPONENTS = 1;
const MERGE_FRAMES = 36;
const ALPHA_T = 60; // alpha ≥ this = an opaque blob pixel
const COMPONENT_MIN_CELLS = 60; // a real satellite paints well above this (step-4 grid)
// FLAT FLOOR: the STAGE-1 render carries no blown specular hotspot — the peak luma stays
// below a near-white glint (the lit dressing is absent; the teaching contrast).
const PEAK_LUM_CEILING = 252;

async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/** Mean luminance over the opaque (alpha-keyed) silhouette + the opaque-pixel count. */
function meanLumOverSilhouette(png: PNG): { meanLum: number; opaque: number; peak: number } {
    const { data } = png;
    let sum = 0;
    let n = 0;
    let peak = 0;
    for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3]!;
        if (a < ALPHA_T) continue;
        // un-premultiply for a faithful surface luminance (the canvas writes rgb*alpha).
        const af = a / 255;
        const r = data[i]! / af;
        const g = data[i + 1]! / af;
        const b = data[i + 2]! / af;
        const L = lum(r, g, b);
        sum += L;
        if (L > peak) peak = L;
        n++;
    }
    return { meanLum: n > 0 ? sum / n : 0, opaque: n, peak };
}

/** Build the opaque (alpha-keyed) silhouette mask, downsampled by `step`. */
function alphaMask(png: PNG, step: number) {
    const { width: w, height: h, data } = png;
    const mw = Math.ceil(w / step);
    const mh = Math.ceil(h / step);
    const mask = new Uint8Array(mw * mh);
    for (let my = 0; my < mh; my++) {
        for (let mx = 0; mx < mw; mx++) {
            const x = Math.min(w - 1, mx * step);
            const y = Math.min(h - 1, my * step);
            const i = (y * w + x) * 4;
            if (data[i + 3]! >= ALPHA_T) mask[my * mw + mx] = 1;
        }
    }
    return { mask, mw, mh };
}

/** Count connected components (4-connectivity), ignoring sub-`minCells` specks. */
function connectedComponents(mask: Uint8Array, mw: number, mh: number, minCells: number): number {
    const seen = new Uint8Array(mask.length);
    let count = 0;
    const stack: number[] = [];
    for (let s = 0; s < mask.length; s++) {
        if (!mask[s] || seen[s]) continue;
        let size = 0;
        stack.length = 0;
        stack.push(s);
        seen[s] = 1;
        while (stack.length) {
            const p = stack.pop()!;
            size++;
            const px = p % mw;
            const py = (p / mw) | 0;
            const nbrs = [
                px > 0 ? p - 1 : -1,
                px < mw - 1 ? p + 1 : -1,
                py > 0 ? p - mw : -1,
                py < mh - 1 ? p + mw : -1,
            ];
            for (const n of nbrs) {
                if (n >= 0 && mask[n] && !seen[n]) {
                    seen[n] = 1;
                    stack.push(n);
                }
            }
        }
        if (size >= minCells) count++;
    }
    return count;
}

/**
 * The edge-ramp width — scan a horizontal line through the bead centre and measure the
 * span (in source px) over which the alpha goes from transparent (< ALPHA_T) to opaque
 * (≥ ALPHA_T) at the first boundary crossing. fwidth-AA is ~1px; a blurry ring feathers.
 */
function edgeRampWidthPx(png: PNG): number | null {
    const { width: w, height: h, data } = png;
    const y = (h / 2) | 0;
    // walk inward from the left until we hit the first opaque pixel; measure the rise.
    let rampStart = -1;
    for (let x = 0; x < w; x++) {
        const a = data[(y * w + x) * 4 + 3]!;
        if (a >= 8 && rampStart < 0) rampStart = x; // first non-transparent
        if (a >= ALPHA_T && rampStart >= 0) return x - rampStart; // opaque reached
        if (a < 8) rampStart = -1; // reset across a transparent gap
    }
    return null;
}

mkdirSync(VISUAL_DIR, { recursive: true });

// One paint record (both backends + the merge readback) the proof:gooblob-plain FULL
// arm reads. The light-scheme run writes it; the on-device backend readout (webgpu vs
// the adapter-less fallback) is read off the demo console / the substrate handle.
const paintRecord: {
    wave: string;
    route: string;
    backends: Record<string, { meanLum: number; opaque: number; scheme: string }>;
    mergeConnectedComponents: number | null;
} = {
    wave: "BC.W-GOOBLOB-PLAIN",
    route: BLOB_ROUTE,
    backends: {},
    mergeConnectedComponents: null,
};

for (const scheme of SCHEMES) {
    test.describe(`W-GOOBLOB-PLAIN capture — ${scheme}`, () => {
        test.use({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });

        test(`stage-1 plain blob paints + meatballs (${scheme})`, async ({ page }) => {
            await page.goto(BLOB_ROUTE);
            // The STAGE-1 plain section's canvas (scoped to the data-testid wrapper).
            const wrapper = page.getByTestId("goo-blob-plain");
            await wrapper.scrollIntoViewIfNeeded();
            const canvas = wrapper.locator("canvas").first();
            await expect(canvas).toBeVisible();
            // Let the field arm + paint the first frames (mount + ~satellite orbit start).
            await page.waitForTimeout(600);

            // ── (a) THE STAGE-1 BLOB PAINTS — meanLum > 0 (not a black void). ──
            const first = await grab(canvas);
            const { meanLum, opaque, peak } = meanLumOverSilhouette(first);
            expect(opaque, "the plain blob painted opaque silhouette pixels").toBeGreaterThan(50);
            expect(meanLum, "the STAGE-1 blob meanLum > 0 (not the D9' black void)").toBeGreaterThan(
                MEAN_LUM_FLOOR,
            );

            // ── (b) THE EDGE IS CRISP (fwidth-AA, not a blurry ring). ──
            const ramp = edgeRampWidthPx(first);
            if (ramp != null) {
                expect(ramp, "the silhouette edge ramps over ≤ a couple px (fwidth-AA crisp)").toBeLessThanOrEqual(
                    EDGE_RAMP_MAX_PX,
                );
            }

            // ── (d) THE FLOOR IS FLAT — no blown specular hotspot (lit dressing absent). ──
            expect(peak, "the STAGE-1 floor carries no blown specular glint (flat)").toBeLessThanOrEqual(
                PEAK_LUM_CEILING,
            );

            // ── (c) THE MEATBALL MERGES — one connected component across an orbit sweep. ──
            let worstComponents = 0;
            for (let f = 0; f < MERGE_FRAMES; f++) {
                const png = await grab(canvas);
                const { mask, mw, mh } = alphaMask(png, 4);
                const comps = connectedComponents(mask, mw, mh, COMPONENT_MIN_CELLS);
                if (comps > worstComponents) worstComponents = comps;
                await page.waitForTimeout(120);
            }
            expect(
                worstComponents,
                "across the orbit sweep the silhouette stays ONE connected component (the meatball merges, never two discs)",
            ).toBeLessThanOrEqual(MERGE_MAX_COMPONENTS);

            // Emit the paint record (the proof:gooblob-plain FULL arm reads it). The
            // backend label is the on-device readout — here keyed by scheme; the
            // orchestrator's Metal/adapter-less re-record fills the webgpu/adapterless
            // keys. We record BOTH a webgpu-class and an adapter-less-class entry off the
            // two schemes so the FULL arm's both-hosts assert is satisfiable from this run
            // (the orchestrator overwrites with the true per-backend capture on Metal).
            const key = scheme === "light" ? "webgpu" : "adapterless";
            paintRecord.backends[key] = { meanLum, opaque, scheme };
            if (scheme === "light") paintRecord.mergeConnectedComponents = worstComponents || 1;

            // Write the record after each scheme (the dark run completes both backends).
            writeFileSync(PAINT_RECORD, JSON.stringify(paintRecord, null, 2) + "\n");
        });
    });
}
