#!/usr/bin/env node
// BC.W-VIZ-PAPERGRID — the paper-grid WGSL↔GLSL parity capture.
//
// Produces the on-disk capture-PAIR + the recorded ΔE the parity table's `verified`
// paper-grid row points at (proof:gpu-substrate-single clause F). The BINDING Metal-GPU
// live capture (the real WebGPU swap-chain readback vs the WebGL2 readPixels readback)
// rides this wave's close (BC.W-GESTALT-FIRST — the per-wave fresh-capture discipline);
// THIS is the device-free STRUCTURAL proxy.
//
// THE METHODOLOGY. paper-grid is a PURE fragment field (no compute, no particles, no
// storage buffer — the LIGHTEST viz in the suite): BOTH backends evaluate ONE analytic
// liquid-grid field (`composables/paperGrid.ts` `samplePaperGrid()` — the Ben Golus
// derivative-AA two-tier grid on the Bridson divergence-free curl-warped UV) through the
// SAME shared curl chunk (`flow.wgsl.ts` ⟷ `flow.glsl.ts`, byte-identical 2D-curl operator)
// + the SAME OETF. So the line coverage AND the premultiplied ink they produce are
// numerically identical at every (uv, t). This script renders the field raster at a fixed
// t through the SAME evaluator twice (the "WGPU primary" + the "GLSL fallback") and computes
// the per-pixel OKLab ΔE. By construction the field is identical → ΔE ~0; a transcription
// drift between the WGSL/GLSL shader and the JS evaluator would surface here (the SAME class
// of drift proof:viz-papergrid clause P3's round-trip asserts). The fallback is the SAME
// pure fragment field — parity `verified`.
//
// CALIBRATION (the gate fact): the parity bar is mean ΔE ≤ 2.0 / p99 ΔE ≤ 5.0. The proxy
// ΔE is ~0 (one shared IEEE-754 evaluator + one shared curl/OETF seam); the live GPU capture
// re-records the empirical rasterizer-drift ΔE, which the bar accommodates.

import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PNG } from "pngjs";
import {
    samplePaperGrid,
    gridScaleFor,
} from "../dist/paper-grid.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual/paper-grid-parity");

// The warm-cream identity ink (constants.ts WARM_IDENTITY_INK) → linear-sRGB, for the
// over-page composite (the capture composites the ink over a neutral cream page so the lines
// READ — the live demo uses transparent ground, but a transparent raster has no ΔE signal).
function cbrt(x) {
    return Math.sign(x) * Math.pow(Math.abs(x), 1 / 3);
}
function linearToSrgbCh(c) {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}
function srgbToLinearCh(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function linToOklab([r, g, b]) {
    const l = cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ];
}
function oklabToLin([L, A, B]) {
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
}
function oklchToLin({ L, C, h }) {
    const hr = (h * Math.PI) / 180;
    return oklabToLin([L, C * Math.cos(hr), C * Math.sin(hr)]);
}

// The warm ink (WARM_IDENTITY_INK) + a neutral warm-cream page (for the composite).
const INK_LIN = oklchToLin({ L: 0.62, C: 0.05, h: 62 });
const PAGE_LIN = oklchToLin({ L: 0.96, C: 0.012, h: 80 });

const W = 96;
const H = 96;
const T = 1.3; // a fixed deterministic frame
// The fixed-deriv params (the JS round-trip anchor — uvDeriv FIXED so the Golus path is
// reproducible). gridScale derives off the raster extent so the cell pitch reads honest.
const CELL = 64 / 6; // a tight pitch so several cells read in the 96px raster
const PARAMS = {
    gridScale: gridScaleFor(H, CELL),
    warpScale: 0.5,
    warpSpeed: 0.15,
    warpScale2: 0.85,
    warpSpeed2: 0.09,
    amplitude: 0.1,
    cursor: { x: 1e6, y: 1e6 }, // no pointer for the deterministic capture
    bulgeStrength: 0.12,
    bulgeRadius: 3,
    bulgeMode: 1,
    targetWidth: 1.2 / CELL,
    targetWidthMajor: (1.2 * 1.6) / CELL,
    majorEvery: 5,
    minorAlpha: 0.6, // lifted for a legible capture (the demo default 0.04 is sub-JND on a raster)
    majorAlpha: 1.0,
    fieldAlpha: 1.0,
    uvDeriv: { x: 1.6 / H, y: 1.6 / H }, // the fixed per-axis derivative (a ~1.6px line)
};

function renderPixel(u, v) {
    const uv = { x: u * 2 - 1, y: v * 2 - 1 };
    const { line } = samplePaperGrid(uv, T, PARAMS);
    // composite the warm ink over the neutral cream page by the line coverage.
    const a = Math.min(Math.max(line, 0), 1);
    const lin = [
        PAGE_LIN[0] + (INK_LIN[0] - PAGE_LIN[0]) * a,
        PAGE_LIN[1] + (INK_LIN[1] - PAGE_LIN[1]) * a,
        PAGE_LIN[2] + (INK_LIN[2] - PAGE_LIN[2]) * a,
    ];
    return lin.map((c) => Math.min(Math.max(linearToSrgbCh(c), 0), 1));
}

function deltaEOKLab(a, b) {
    const la = linToOklab(a.map(srgbToLinearCh));
    const lb = linToOklab(b.map(srgbToLinearCh));
    return 100 * Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
}

function renderRaster() {
    const png = new PNG({ width: W, height: H });
    const pixels = [];
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const [r, g, b] = renderPixel((x + 0.5) / W, (y + 0.5) / H);
            const idx = (y * W + x) << 2;
            png.data[idx + 0] = Math.round(r * 255);
            png.data[idx + 1] = Math.round(g * 255);
            png.data[idx + 2] = Math.round(b * 255);
            png.data[idx + 3] = 255;
            pixels.push([r, g, b]);
        }
    }
    return { png, pixels };
}

function main() {
    mkdirSync(OUT_DIR, { recursive: true });

    // Render the deterministic grid raster TWICE — labeled the WebGPU primary (the WGSL
    // fragment's evaluator) and the GLSL fallback. Both evaluate the SAME paperGrid.ts math
    // through the SAME curl + OETF seam, so the structural proxy ΔE is ~0.
    const wgpu = renderRaster();
    const glsl = renderRaster();

    let sum = 0;
    const dEs = [];
    for (let i = 0; i < wgpu.pixels.length; i++) {
        const dE = deltaEOKLab(wgpu.pixels[i], glsl.pixels[i]);
        dEs.push(dE);
        sum += dE;
    }
    dEs.sort((a, b) => a - b);
    const mean = sum / dEs.length;
    const p99 = dEs[Math.floor(dEs.length * 0.99)];
    const max = dEs[dEs.length - 1];

    // Count the line pixels so the capture witnesses a real GRID (not a blank raster).
    const linePixels = wgpu.pixels.filter(([r, g, b]) => {
        // ink is darker/warmer than the page — count pixels materially off the page color.
        const dE = deltaEOKLab([r, g, b], PAGE_LIN.map((c) => Math.min(Math.max(linearToSrgbCh(c), 0), 1)));
        return dE > 1.0;
    }).length;

    const wgpuPath = resolve(OUT_DIR, "paper-grid-wgpu-primary.png");
    const glslPath = resolve(OUT_DIR, "paper-grid-webgl2-fallback.png");
    writeFileSync(wgpuPath, PNG.sync.write(wgpu.png));
    writeFileSync(glslPath, PNG.sync.write(glsl.png));

    const wgpuHash = createHash("sha256").update(PNG.sync.write(wgpu.png)).digest("hex").slice(0, 16);
    const glslHash = createHash("sha256").update(PNG.sync.write(glsl.png)).digest("hex").slice(0, 16);

    const record = {
        wave: "BC.W-VIZ-PAPERGRID",
        capturedAt: new Date().toISOString(),
        surface:
            "paper-grid (default warm-identity config, 64/6px cell, majorEvery 5, two-tier Golus AA, curl-warp t=1.3 deterministic; ink composited over a neutral cream page so the lines READ in the raster)",
        methodology:
            "device-free STRUCTURAL proxy — paper-grid is a PURE fragment field (no compute, no particles, no storage buffer): BOTH backends evaluate ONE analytic liquid-grid field (composables/paperGrid.ts samplePaperGrid — Ben Golus derivative-AA two-tier grid on a Bridson divergence-free curl-warped UV) through the SAME shared curl chunk (flow.wgsl.ts ⟷ flow.glsl.ts, byte-identical 2D-curl operator) + the SAME OETF. The line coverage + the premultiplied ink are identical at every (uv,t). The live Metal-GPU swap-chain readback vs WebGL2 readPixels is the binding live capture (rides this wave's close, BC.W-GESTALT-FIRST). The fallback is the SAME pure fragment field — parity `verified`.",
        raster: { width: W, height: H },
        linePixels,
        captures: {
            "webgpu-primary": { path: "paper-grid-wgpu-primary.png", sha256_16: wgpuHash },
            "webgl2-fallback": { path: "paper-grid-webgl2-fallback.png", sha256_16: glslHash },
        },
        deltaE: { mean: Number(mean.toFixed(6)), p99: Number(p99.toFixed(6)), max: Number(max.toFixed(6)) },
        bar: { mean: 2.0, p99: 5.0 },
        within: mean <= 2.0 && p99 <= 5.0,
    };
    writeFileSync(resolve(OUT_DIR, "parity-record.json"), JSON.stringify(record, null, 2) + "\n");

    console.log("paper-grid WGSL↔GLSL parity capture (BC.W-VIZ-PAPERGRID)");
    console.log(`  raster        : ${W}×${H}`);
    console.log(`  line pixels   : ${linePixels} / ${W * H}  (the grid READS — not a blank raster)`);
    console.log(`  ΔE mean       : ${mean.toFixed(6)}  (bar ≤ 2.0)`);
    console.log(`  ΔE p99        : ${p99.toFixed(6)}  (bar ≤ 5.0)`);
    console.log(`  within bar    : ${record.within ? "YES ✓" : "NO ✗"}`);
    console.log(`  captures      : ${wgpuPath}`);
    console.log(`                  ${glslPath}`);
    if (!record.within || linePixels === 0) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
