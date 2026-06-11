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
const BLOB_INTERIOR_INSET = 0.12; // exclude the outer rounded-corner band from coverage
const BLOB_COVERAGE_MIN = 0.1; // W00 LOOSE floor (W08 narrows to 0.25)
const BLOB_COVERAGE_MAX = 0.7; // W00 LOOSE ceil (W08 narrows to 0.55)
const BLOB_FRAMES = 6; // read back N frames; verdict over the peak
const ANTI_FLAKE_RUNS = 3; // 3-run named-region baseline (median verdict)
const COLOR_DIFF_THRESHOLD = 40; // |ΔR|+|ΔG|+|ΔB| over the modal bg = "painted"

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
 * The MODAL background RGB — the most-common 16-step-quantized colour over the whole
 * canvas. For a contained droplet that is the cream field. UNLIKE a 4-corner average
 * it is immune to the rounded-card clip's dark corner pixels (the goo-blob story
 * mounts each canvas in a `rounded-card overflow-hidden` cell, so the literal corners
 * fall OUTSIDE the clip and read dark — a corner-average false-floods even a contained
 * droplet, exactly what W08's blob-render.spec.ts robust metric corrects).
 */
function modalBackground(png: PNG): [number, number, number] {
    const { data } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        const key =
            ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    let best = 0;
    let bestKey = 0;
    for (const [k, c] of counts) if (c > best) ((best = c), (bestKey = k));
    return [((bestKey >> 8) & 0xf) << 4, ((bestKey >> 4) & 0xf) << 4, (bestKey & 0xf) << 4];
}

/**
 * Coverage = fraction of INTERIOR-INSET pixels DIFFERING from the MODAL background by a
 * perceptual threshold. The inset excludes the rounded-corner band; the modal bg is
 * clip-robust. A contained droplet leaves a margin (coverage in-band), a flood fills it
 * (→1), a blank paints nothing (→0). W08's TIGHT band (0.25–0.55) is a strict SUBSET of
 * this LOOSE floor, measured on the SAME metric (subset-consistent by construction).
 */
function interiorCoverage(png: PNG, inset: number, threshold: number): number {
    const { width: w, height: h, data } = png;
    const bg = modalBackground(png);
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let differ = 0;
    let total = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const d =
                Math.abs(data[i]! - bg[0]!) +
                Math.abs(data[i + 1]! - bg[1]!) +
                Math.abs(data[i + 2]! - bg[2]!);
            if (d > threshold) differ++;
            total++;
        }
    }
    return differ / total;
}

test.describe("substrate-paints-color (π lane — fail-CLOSED)", () => {
    test("aurora paints a non-black interior on DEFAULT + every preset at t=1", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.aurora.path);
        const auroraCanvas = page.locator("canvas.aurora-canvas").first();
        await auroraCanvas.waitFor({ state: "visible", timeout: 20_000 });

        // Re-source the 13 keys (anti-drift manifest check) — the SCENES/preset list
        // is the source-of-truth manifest, never a hand list. (12→13 at the AY
        // aurora reconcile: SPEEDTEST joined the kept roster; the walk below
        // covers every sourced key, so the pin is only the staleness witness.)
        const presetKeys = sourcePresetKeys();
        expect(presetKeys.length).toBe(13);

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
                const cov = interiorCoverage(
                    await grab(blobCanvas),
                    BLOB_INTERIOR_INSET,
                    COLOR_DIFF_THRESHOLD,
                );
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
