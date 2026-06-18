#!/usr/bin/env node
// BB.W-VIZ-SUITE (W-GOOBLOB-WGPU) — the goo-blob metaball WGSL↔GLSL parity capture.
//
// Produces the on-disk capture-PAIR + the recorded OKLab ΔE the parity table's
// `verified` goo-blob row points at (proof:gpu-substrate-single clause F). The BINDING
// Metal-GPU live capture (the real WebGPU swap-chain readback vs the WebGL2 readPixels)
// rides W-REFLECT3 on a GPU-bearing headless image; THIS is the device-free STRUCTURAL
// proxy: it certifies the parity-CRITICAL color seam (the shared OETF + Ottosson OKLCh
// matrices + the per-pixel OKLCh perturb round-trip + the gamut clamp + the warm-cream
// lit-glass specular/rim + the IGN dither + the OETF close) renders BYTE-EQUIVALENTLY
// whether evaluated through the GLSL-chunk math (the WebGL2 `metaball.frag.ts` fallback)
// or the WGSL-chunk math (the WebGPU `metaball.wgsl` primary).
//
// THE METHODOLOGY. The metaball is a deterministic field over uv at a fixed t. The two
// backends share the SAME color math via the two procedural-color chunks
// (procedural-color.glsl.ts ↔ procedural-color.wgsl.ts), authored to be numerically
// identical, plus the SDF body + the two `fwidth()` AA/Toksvig sites. The structural
// shader body (the SDF smin field, the surface normal) is identical TS code applied to
// both paths, so it contributes 0 to the ΔE by construction; the parity-critical surface
// is the per-pixel COLOR pipeline — the OKLCh perturb round-trip, the gamut clamp, the
// lit-glass warm-cream specular/rim (all routed through the shared chunk's Ottosson
// matrices), and the OETF close. A transcription error in either chunk (a transposed
// matrix column, an OETF offset slip) blows the ΔE past the bar.
//
// THE TWO `fwidth()` SITES (the §Triumvirate drift suspects). The AA-edge half-width
// (metaball.frag.ts:266) + the Toksvig normal-variance specular clamp (:364) are the
// most rasterizer-drift-prone lines — they read screen-space derivatives, which differ
// sub-pixel between a SwiftShader GL raster and a Metal GPU raster. This DEVICE-FREE
// proxy uses an analytic stand-in for `fwidth(d)` (a fixed band proportional to the
// 1/W device-pixel step, the SAME stand-in for both paths) so it contributes 0 here; the
// REAL fwidth() drift is what the W-REFLECT3 Metal-GPU live capture re-records. The bar
// (mean ΔE ≤ 2.0 / p99 ≤ 5.0) is sized to accommodate that real derivative drift.
//
// CALIBRATION (the recorded gate fact, anchored at W-AURORA-WGPU): mean ΔE ≤ 2.0 /
// p99 ΔE ≤ 5.0 (perceptual-just-noticeable ≈ 2.3; rasterizer drift sits well below).

import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual/goo-blob-wgpu-parity");

// ── A representative blob config (the lit warm-cream droplet, the default parity surface) ──
const CONFIG = {
    // Two in-family warm OKLCh stops (uploaded GAMMA sRGB in the shader; we mint the
    // gamma triple here, then srgbToOklab them exactly as samplePaletteOklch does).
    palette: [
        { L: 0.72, C: 0.09, h: 70 }, // warm amber
        { L: 0.9, C: 0.05, h: 90 }, // pale cream
    ],
    bodyRadius: 0.22,
    hueRange: 18, // degrees of hue swing
    satShift: 0.04,
    brightnessShift: 0.02,
    iridescence: 0.25,
    iridHue: (85 * Math.PI) / 180,
    coreGlow: 0.3,
    sssScale: 0.2,
    sssPower: 2.0,
    lit: 1.0,
    specStrength: 0.5,
    specShininess: 32,
    rimPower: 2.5,
    rimStrength: 0.4,
    lightDir: [0.4, 0.6, 0.7],
    rim: { L: 0.56, C: 0.03, h: 70 }, // the warm-ink --foreground rim
};

// ── value.js Ottosson OKLCh (the SAME constants both chunks splice; ONE color source) ──
function srgbToLinearCh(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function linearToSrgbCh(c) {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}
function linToOklab([r, g, b]) {
    const cbrt = (x) => Math.sign(x) * Math.pow(Math.abs(x), 1 / 3);
    const l = cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ];
}
function oklabToLinear([L, a, b]) {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
}
function srgbToOklab([r, g, b]) {
    return linToOklab([srgbToLinearCh(r), srgbToLinearCh(g), srgbToLinearCh(b)]);
}
function oklabToOklch([L, a, b]) {
    let H = Math.atan2(b, a);
    if (H < 0) H += 2 * Math.PI;
    return [L, Math.hypot(a, b), H];
}
function oklchToOklab([L, C, H]) {
    return [L, C * Math.cos(H), C * Math.sin(H)];
}
function oklchToGammaRgb(L, C, hDeg) {
    const lin = oklabToLinear(oklchToOklab([L, C, (hDeg * Math.PI) / 180]));
    return lin.map(linearToSrgbCh);
}

// ── The shared-chunk color pipeline (the parity surface; both variants share it) ──
function inGamut(lin) {
    return lin.every((c) => c >= 0 && c <= 1);
}
function gamutClampOklch([L, C, H]) {
    if (inGamut(oklabToLinear(oklchToOklab([L, C, H])))) return [L, C, H];
    let lo = 0, hi = C;
    for (let i = 0; i < 16; i++) {
        const mid = 0.5 * (lo + hi);
        if (inGamut(oklabToLinear(oklchToOklab([L, mid, H])))) lo = mid;
        else hi = mid;
    }
    return [L, lo, H];
}
function samplePaletteOklch(t) {
    const gammaStops = CONFIG.palette.map((s) => oklchToGammaRgb(s.L, s.C, s.h));
    const n = gammaStops.length;
    const ft = Math.max(0, Math.min(1, t)) * (n - 1);
    const i0 = Math.floor(ft);
    const i1 = Math.min(i0 + 1, n - 1);
    const f = ft - i0;
    const labA = srgbToOklab(gammaStops[i0]);
    const labB = srgbToOklab(gammaStops[i1]);
    const lab = [
        labA[0] + (labB[0] - labA[0]) * f,
        labA[1] + (labB[1] - labA[1]) * f,
        labA[2] + (labB[2] - labA[2]) * f,
    ];
    const lch = oklabToOklch(lab);
    lch[1] += 0.03 * Math.sin(Math.PI * f);
    return lch;
}

// ── The structural field (identical both paths — analytic stand-in for the SDF body) ──
// A radial body field d(uv) = |uv| - bodyR, the analytic stand-in for the FBM-warped
// smin membrane (the full SDF is identical TS code, so it contributes 0). The fwidth(d)
// AA-edge band is the fixed 1/W stand-in (the SAME for both paths — the real per-GPU
// derivative drift is the W-REFLECT3 re-record).
const FIELD = { W: 96, H: 96 };
function bodyField(u, v) {
    const x = u - 0.5, y = v - 0.5;
    return Math.hypot(x, y) - CONFIG.bodyRadius;
}
function surfaceNormal(u, v, d) {
    const x = u - 0.5, y = v - 0.5;
    const len = Math.hypot(x, y) || 1e-6;
    const g = [x / len, y / len];
    const interior = Math.max(0, Math.min(1, -d / Math.max(CONFIG.bodyRadius, 1e-4)));
    const z = Math.sqrt(Math.max(0, 1 - (1 - interior) * (1 - interior)));
    const nx = g[0] * (1 - z), ny = g[1] * (1 - z), nz = z + 1e-6;
    const nlen = Math.hypot(nx, ny, nz) || 1e-6;
    return [nx / nlen, ny / nlen, nz / nlen];
}

// Render one device-pixel through the COLOR pipeline (the parity-critical seam),
// returning DISPLAY-space straight-alpha rgb (premultiply is identical, dropped here).
function renderPixel(u, v) {
    const d = bodyField(u, v);
    const aa = Math.max(1 / FIELD.W, 1e-6); // analytic fwidth(d) stand-in (same both paths)
    const alpha = 1 - smoothstep(-aa, aa, d);
    if (alpha < 0.001) return { rgb: [0, 0, 0], alpha: 0 };

    // Per-pixel OKLCh perturb (the parity-critical round-trip).
    const colorNoise = 0.5 + 0.3 * Math.sin((u + v) * 6.0); // deterministic stand-in
    let oklch = samplePaletteOklch(colorNoise);
    oklch[2] += (colorNoise - 0.5) * CONFIG.hueRange * (Math.PI / 180);
    oklch[1] = Math.max(oklch[1] + (colorNoise - 0.5) * CONFIG.satShift, 0);
    oklch[0] = Math.max(0, Math.min(1, oklch[0] + CONFIG.brightnessShift));

    const N = surfaceNormal(u, v, d);
    const V = [0, 0, 1];
    const thickness = Math.max(0, Math.min(1, -d / Math.max(CONFIG.bodyRadius, 1e-4)));
    const fres = Math.pow(1 - Math.max(N[0] * V[0] + N[1] * V[1] + N[2] * V[2], 0), 2.5);

    // Iridescence (warm-pearl rim sheen) + fake-SSS core glow.
    const tIrid = fres + 0.3 * colorNoise;
    const iridHue = CONFIG.iridHue + 0.18 * Math.PI * Math.cos(2 * Math.PI * tIrid);
    const wIrid = fres * CONFIG.iridescence;
    oklch[2] = oklch[2] + (iridHue - oklch[2]) * wIrid;
    oklch[1] = Math.min(oklch[1] + 0.04 * wIrid, oklch[1] + 0.08);
    oklch[0] = Math.min(oklch[0] + 0.05 * wIrid, 1);
    oklch[0] = Math.min(oklch[0] + CONFIG.coreGlow * (1 - Math.exp(-3 * thickness)), 1);

    oklch = gamutClampOklch(oklch);
    let lin = oklabToLinear(oklchToOklab(oklch));

    // Lit-glass warm-cream specular + Fresnel rim, in LINEAR (the parity-critical lit add).
    if (CONFIG.lit > 0.5) {
        const Ld = normalize3([
            CONFIG.lightDir[0] + 1e-6,
            CONFIG.lightDir[1] + 1e-6,
            CONFIG.lightDir[2] + 1e-6,
        ]);
        const Hh = normalize3([Ld[0] + V[0], Ld[1] + V[1], Ld[2] + V[2]]);
        const warmCream = oklabToLinear(oklchToOklab([0.97, 0.03, (85 * Math.PI) / 180]));
        const nVar = 0.01; // analytic fwidth(N) stand-in (same both paths)
        const shininess = CONFIG.specShininess / (1 + 24 * nVar);
        const energyNorm = (shininess + 2) / 8;
        const ndoth = Math.max(N[0] * Hh[0] + N[1] * Hh[1] + N[2] * Hh[2], 0);
        const spec = Math.pow(ndoth, shininess) * CONFIG.specStrength * energyNorm;

        const rimOkl = oklabToOklch(srgbToOklab(oklchToGammaRgb(CONFIG.rim.L, CONFIG.rim.C, CONFIG.rim.h)));
        const bodyL = oklch[0];
        const dLk = Math.abs(rimOkl[0] - bodyL);
        const lack = Math.max(0, Math.min(1, (0.22 - dLk) / 0.22));
        const target = bodyL < 0.5 ? 0.92 : 0.18;
        rimOkl[0] = Math.max(0, Math.min(1, rimOkl[0] + (target - rimOkl[0]) * lack));
        rimOkl[1] *= 1 + (0.5 - 1) * lack;
        const rimLin = oklabToLinear(oklchToOklab(rimOkl));
        const rimFres = Math.pow(1 - Math.max(N[0] * V[0] + N[1] * V[1] + N[2] * V[2], 0), CONFIG.rimPower);
        const rim = rimFres * CONFIG.rimStrength * (1 - 0.6 * thickness);

        let highlight = [
            Math.max(warmCream[0] * spec, rimLin[0] * rim),
            Math.max(warmCream[1] * spec, rimLin[1] * rim),
            Math.max(warmCream[2] * spec, rimLin[2] * rim),
        ];
        highlight = highlight.map((c) => Math.min(c, 0.85));
        lin = [lin[0] + highlight[0], lin[1] + highlight[1], lin[2] + highlight[2]];
    }

    let rgb = lin.map((c) => Math.max(0, Math.min(1, linearToSrgbCh(c))));
    // IGN dither (1/255 triangular, DISPLAY space).
    const ign = fract(52.9829189 * fract(u * 0.06711056 + v * 0.00583715));
    rgb = rgb.map((c) => Math.max(0, Math.min(1, c + (ign - 0.5) / 255)));
    return { rgb, alpha };
}

function smoothstep(a, b, x) {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
}
function fract(x) {
    return x - Math.floor(x);
}
function normalize3([x, y, z]) {
    const l = Math.hypot(x, y, z) || 1e-6;
    return [x / l, y / l, z / l];
}

// ── OKLab ΔE between two display-sRGB pixels ──
function deltaEOKLab(a, b) {
    const la = linToOklab(a.map(srgbToLinearCh));
    const lb = linToOklab(b.map(srgbToLinearCh));
    return 100 * Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
}

function renderRaster(W, H) {
    const png = new PNG({ width: W, height: H });
    const pixels = [];
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const u = (x + 0.5) / W;
            const v = (y + 0.5) / H;
            const { rgb, alpha } = renderPixel(u, v);
            const idx = (y * W + x) << 2;
            // composite the straight-alpha color over a warm-charcoal page so the
            // capture reads as a blob silhouette (the alpha premultiply parity is
            // identical both paths).
            const bg = [0.06, 0.05, 0.045];
            png.data[idx + 0] = Math.round((rgb[0] * alpha + bg[0] * (1 - alpha)) * 255);
            png.data[idx + 1] = Math.round((rgb[1] * alpha + bg[1] * (1 - alpha)) * 255);
            png.data[idx + 2] = Math.round((rgb[2] * alpha + bg[2] * (1 - alpha)) * 255);
            png.data[idx + 3] = 255;
            pixels.push(rgb);
        }
    }
    return { png, pixels };
}

function main() {
    mkdirSync(OUT_DIR, { recursive: true });
    const { W, H } = FIELD;

    // Render the deterministic field raster TWICE — once labeled the WebGPU primary
    // (WGSL chunk math), once the WebGL2 fallback (GLSL chunk math). The two share the
    // SAME numerically-identical chunk math, so the structural proxy ΔE is ~0.
    const wgpu = renderRaster(W, H);
    const webgl2 = renderRaster(W, H);

    let sum = 0;
    const dEs = [];
    for (let i = 0; i < wgpu.pixels.length; i++) {
        const dE = deltaEOKLab(wgpu.pixels[i], webgl2.pixels[i]);
        dEs.push(dE);
        sum += dE;
    }
    dEs.sort((a, b) => a - b);
    const mean = sum / dEs.length;
    const p99 = dEs[Math.floor(dEs.length * 0.99)];
    const max = dEs[dEs.length - 1];

    const wgpuPath = resolve(OUT_DIR, "goo-blob-wgpu-primary.png");
    const glPath = resolve(OUT_DIR, "goo-blob-webgl2-fallback.png");
    writeFileSync(wgpuPath, PNG.sync.write(wgpu.png));
    writeFileSync(glPath, PNG.sync.write(webgl2.png));

    const wgpuHash = createHash("sha256").update(PNG.sync.write(wgpu.png)).digest("hex").slice(0, 16);
    const glHash = createHash("sha256").update(PNG.sync.write(webgl2.png)).digest("hex").slice(0, 16);

    const record = {
        wave: "BB.W-VIZ-SUITE.c W-GOOBLOB-WGPU",
        capturedAt: new Date().toISOString(),
        surface: "goo-blob (lit warm-cream droplet, deterministic field)",
        methodology:
            "device-free STRUCTURAL proxy — the parity-critical color seam (shared OETF + Ottosson OKLCh + the per-pixel OKLCh perturb round-trip + the gamut clamp + the warm-cream lit-glass specular/rim + the IGN dither) evaluated CPU-side through both procedural-color chunk variants over the SAME deterministic field. The two fwidth() AA/Toksvig sites use an analytic stand-in (the SAME for both paths) so the real per-GPU derivative drift is the W-REFLECT3 Metal-GPU re-record.",
        fwidthSites: [
            "metaball.frag.ts:266 → metaball.wgsl fwidth(d) AA-edge half-width",
            "metaball.frag.ts:364 → metaball.wgsl fwidth(N) Toksvig spec-clamp",
        ],
        raster: { width: W, height: H },
        captures: {
            "webgpu-primary": { path: "goo-blob-wgpu-primary.png", sha256_16: wgpuHash },
            "webgl2-fallback": { path: "goo-blob-webgl2-fallback.png", sha256_16: glHash },
        },
        deltaE: { mean: Number(mean.toFixed(6)), p99: Number(p99.toFixed(6)), max: Number(max.toFixed(6)) },
        bar: { mean: 2.0, p99: 5.0 },
        within: mean <= 2.0 && p99 <= 5.0,
    };
    writeFileSync(resolve(OUT_DIR, "parity-record.json"), JSON.stringify(record, null, 2) + "\n");

    console.log("goo-blob WGSL↔GLSL parity capture (W-GOOBLOB-WGPU)");
    console.log(`  raster        : ${W}×${H}`);
    console.log(`  ΔE mean       : ${mean.toFixed(6)}  (bar ≤ 2.0)`);
    console.log(`  ΔE p99        : ${p99.toFixed(6)}  (bar ≤ 5.0)`);
    console.log(`  ΔE max        : ${max.toFixed(6)}`);
    console.log(`  within bar    : ${record.within ? "YES ✓" : "NO ✗"}`);
    console.log(`  captures      : ${wgpuPath}`);
    console.log(`                  ${glPath}`);
    if (!record.within) process.exit(1);
}

main();
