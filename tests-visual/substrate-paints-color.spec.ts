// AX.W00 — proof:substrate-paints-color, the SHARED substrate-paints-non-black
// readPixels primitive (the W07 aurora + W08 blob per-surface gates compose it).
//
// The CPU-oracle blindspot (slices 6 F2, 10 F1, 11 F1, 12 F4): the entire
// proof:aurora-* / proof:blob-* fleet is static-text / CPU-math — a BLACK live
// aurora and a FLOODED live blob both pass it. This spec mounts the REAL component
// on a REAL device, reads back the canvas, and asserts on the painted image.
//
// READBACK MECHANISM (AX.W00 orchestrator real-device fix). A WebGL2/WebGPU canvas
// is NOT reliably readable via `ctx.drawImage(canvas) + getImageData`: without
// `preserveDrawingBuffer:true` the drawing buffer reads EMPTY after compositing
// (the blob read 0.000 that way), and a raw readback GPU-stalls on software GL. The
// only robust cross-context readback is a COMPOSITED element screenshot
// (`locator.screenshot()`), decoded with pngjs — it captures exactly the displayed
// pixels, regardless of the GL context's preserveDrawingBuffer. On a dev box the
// real GPU (Metal) paints; a GPU-less CI runner SwiftShader-degrades (the gate
// driver SKIPs befitting-silent when no browser binary is installed).
//
//   AURORA — DEFAULT (initial preset) + best-effort each preset at t=1: maxChannel
//            > 0 over the INTERIOR (a non-black luma floor). A blacked render →
//            maxChannel == 0 → RED. The per-preset hue/chroma parity is W10/W11;
//            W00 owns ONLY the non-black floor.
//   BLOB   — BLOB_CONFIG_DEFAULTS: the LOOSE non-flood COVERAGE band ~0.10–0.70 of
//            the canvas (fraction of pixels DIFFERING from the corner background —
//            a composited screenshot has no alpha, so the transparent margin reads
//            as background, and "painted" = "differs from the corner"). Catches BOTH
//            the flood (→1) AND the blank (→0). W08's TIGHT 0.25–0.6 droplet band is
//            a strict SUBSET (anything W08 passes, this passes).
//
// keyframes I-1/I-2 instrument design: the SCENES + preset keys are re-sourced from
// the manifest (pi-manifest.ts), and each readback is a NAMED-REGION baseline
// sampled 3× with an anti-flake MEDIAN verdict (a single flaky frame cannot flip it).

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS, sourcePresetKeys } from "./pi-manifest.ts";

// ── tunables (the W00 LOOSE floors) ──────────────────────────────────────────
const AURORA_INTERIOR_INSET = 0.2; // sample the central 60% box (avoid edge fade)
const AURORA_MAX_CHANNEL_FLOOR = 0; // maxChannel must be STRICTLY > 0 (non-black)
const BLOB_COVERAGE_MIN = 0.1; // W00 LOOSE floor (W08 narrows to 0.25)
const BLOB_COVERAGE_MAX = 0.7; // W00 LOOSE ceil (W08 narrows to 0.6)
const BLOB_FRAMES = 6; // read back N frames; verdict over the peak
const ANTI_FLAKE_RUNS = 3; // 3-run named-region baseline (median verdict)
const COLOR_DIFF_THRESHOLD = 40; // |ΔR|+|ΔG|+|ΔB| over the corner bg = "painted"

// The aurora 12-preset drive on a real-GPU screenshot pass is well under this, but
// software-GL degrade + the procedural settle want generous headroom.
test.setTimeout(180_000);

/** Median of a numeric array (the robust 3-run anti-flake verdict). */
function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

/** Composited element screenshot → decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Largest per-pixel max(R,G,B) over the interior inset box — a non-black floor. */
function interiorMaxChannel(png: PNG, inset: number): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let maxCh = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const m = Math.max(data[i]!, data[i + 1]!, data[i + 2]!);
            if (m > maxCh) maxCh = m;
        }
    }
    return maxCh;
}

/**
 * Coverage = fraction of pixels DIFFERING from the canvas-corner background by a
 * perceptual threshold. A composited screenshot renders a transparent margin as the
 * page background, so the corner IS the background; a contained droplet leaves a
 * margin (coverage in-band), a flood fills it (→1), a blank paints nothing (→0).
 */
function coverageVsCorner(png: PNG, threshold: number): number {
    const { width: w, height: h, data } = png;
    const corners: number[][] = [
        [1, 1],
        [w - 2, 1],
        [1, h - 2],
        [w - 2, h - 2],
    ].map(([cx, cy]) => {
        const i = (cy! * w + cx!) * 4;
        return [data[i]!, data[i + 1]!, data[i + 2]!];
    });
    const bg = [0, 1, 2].map((k) =>
        Math.round(corners.reduce((s, c) => s + c[k]!, 0) / corners.length),
    );
    let differ = 0;
    for (let i = 0; i < data.length; i += 4) {
        const d =
            Math.abs(data[i]! - bg[0]!) +
            Math.abs(data[i + 1]! - bg[1]!) +
            Math.abs(data[i + 2]! - bg[2]!);
        if (d > threshold) differ++;
    }
    return differ / (w * h);
}

test.describe("substrate-paints-color (π lane — fail-CLOSED)", () => {
    test("aurora paints a non-black interior on DEFAULT + every preset at t=1", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.aurora.path);
        const auroraCanvas = page.locator("canvas.aurora-canvas").first();
        await auroraCanvas.waitFor({ state: "visible", timeout: 20_000 });

        // Re-source the 12 keys (anti-drift manifest check) — the SCENES/preset list
        // is the source-of-truth manifest, never a hand list.
        const presetKeys = sourcePresetKeys();
        expect(presetKeys.length).toBe(12);

        const results: Record<string, number> = {};
        async function settleAndRead(label: string) {
            await page.waitForTimeout(600); // procedural loop → t≈1 steady state
            const reads: number[] = [];
            for (let r = 0; r < ANTI_FLAKE_RUNS; r++) {
                reads.push(interiorMaxChannel(await grab(auroraCanvas), AURORA_INTERIOR_INSET));
                await page.waitForTimeout(100);
            }
            results[label] = median(reads);
        }

        // DEFAULT (the story's initial preset render) — the binding floor.
        await settleAndRead("DEFAULT");

        // Best-effort per-preset drive: click each preset chip if a picker exists,
        // else cycle via the keyboard. The non-black floor is asserted per read
        // regardless of whether the preset actually switched (per-preset hue parity
        // is W10/W11; W00 asserts ONLY that every rendered frame is non-black).
        const picker = page.locator(
            '[data-preset-key], .aurora-preset-picker button, [role="tab"][data-preset]',
        );
        const n = await picker.count();
        for (let i = 0; i < presetKeys.length; i++) {
            if (n >= presetKeys.length) {
                await picker.nth(i).click({ trial: false }).catch(() => {});
            } else {
                await page.keyboard.press("ArrowRight").catch(() => {});
            }
            await settleAndRead(presetKeys[i]!);
        }

        const black = Object.entries(results).filter(
            ([, mx]) => !(mx > AURORA_MAX_CHANNEL_FLOOR),
        );
        expect(
            black,
            `aurora painted a BLACK interior (maxChannel == 0) for: ${black
                .map(([k, v]) => `${k}=${v}`)
                .join(", ")} — the black-canvas class the CPU oracles miss`,
        ).toEqual([]);
    });

    test("blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.blob.path);
        // The goo-blob story mounts SEVERAL <GooBlob> instances; the first is the
        // BLOB_CONFIG_DEFAULTS render.
        const blobCanvas = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blobCanvas.waitFor({ state: "visible", timeout: 20_000 });

        // Read N frames per run; the verdict is the PEAK coverage (the droplet
        // breathes/orbits, so coverage oscillates — the peak is the most-filled
        // frame, which must STILL leave a transparent margin).
        const peaks: number[] = [];
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            let peak = 0;
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const cov = coverageVsCorner(await grab(blobCanvas), COLOR_DIFF_THRESHOLD);
                if (cov > peak) peak = cov;
                await page.waitForTimeout(80);
            }
            peaks.push(peak);
        }
        const verdict = median(peaks);

        expect(
            verdict,
            `blob coverage ${verdict.toFixed(3)} is below the non-blank floor ${BLOB_COVERAGE_MIN} — the blob did not paint (blank/black canvas)`,
        ).toBeGreaterThanOrEqual(BLOB_COVERAGE_MIN);
        expect(
            verdict,
            `blob coverage ${verdict.toFixed(3)} exceeds the non-flood ceil ${BLOB_COVERAGE_MAX} — the blob FLOODED the canvas (no transparent margin)`,
        ).toBeLessThanOrEqual(BLOB_COVERAGE_MAX);
    });
});
