#!/usr/bin/env node
// aurora-make-ref-plates — mint the 3 synthetic reference plates (AY.W-AUR1 §1).
//
// The reference corpus is MEASUREMENT GROUND, not a library API (the fixtures precedent —
// starry-night-crop.png). The 3 missing plates anchor the THREE metric poles the
// downstream painterly tuner reads against:
//
//   aurora-ref-mesh-gradient.png — OpenAI/"Ethereal-Glow" smooth-pole: the LOWER
//       colorfulness band + a STEEP spectrum roll-off (smooth ≠ turbulent) + low
//       anisotropy (no strokes). The "calm premium-SaaS default" reference.
//   aurora-ref-skyscape.png — atmospheric-scattering zones+gradient: warm-light /
//       cool-shadow vertical value bands + soft cloud turbulence (a mid colorfulness,
//       mid anisotropy register).
//   aurora-ref-oil-pastel.png — tooth + scumble: broken-color subtractive-mix dabs at
//       HIGH chroma (the K-M colorfulness target the muddy-lerp pole fails).
//
// Each is a faithful synthetic exemplar of its register, deterministic (seeded PRNG) so a
// re-run reproduces the byte-identical plate. They are replaceable per the Named-successor
// clause: W-AUR-PAINTERLY re-sources any deficient plate during tuning. NEVER imported into
// src/ or shipped in dist/.

import { writeFileSync } from "node:fs";
import { PNG } from "pngjs";

const W = 256;
const H = 192;

function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Minimal OKLCh → sRGB (Ottosson) for perceptual-uniform stop placement.
function oklchToSrgb(L, C, hDeg) {
    const h = (hDeg * Math.PI) / 180;
    const a = C * Math.cos(h);
    const b = C * Math.sin(h);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    const oetf = (v) =>
        v <= 0.0031308 ? 12.92 * v : 1.055 * Math.max(0, v) ** (1 / 2.4) - 0.055;
    return [
        Math.max(0, Math.min(255, Math.round(oetf(r) * 255))),
        Math.max(0, Math.min(255, Math.round(oetf(g) * 255))),
        Math.max(0, Math.min(255, Math.round(oetf(bl) * 255))),
    ];
}

function write(name, fill) {
    const png = new PNG({ width: W, height: H });
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const [r, g, b] = fill(x, y);
            const i = (y * W + x) * 4;
            png.data[i] = r;
            png.data[i + 1] = g;
            png.data[i + 2] = b;
            png.data[i + 3] = 255;
        }
    }
    writeFileSync(`tests-visual/fixtures/${name}`, PNG.sync.write(png));
    console.log(`wrote tests-visual/fixtures/${name}`);
}

// ── plate 1 — mesh gradient (smooth pole) ────────────────────────────────────
// A handful of soft Gaussian colour blobs in OKLCh, summed and normalized. Smooth →
// steep spectrum roll-off, low anisotropy, a calm-but-present colourfulness.
{
    const rnd = mulberry32(0x5eed01);
    const blobs = [];
    for (let i = 0; i < 5; i++) {
        blobs.push({
            cx: rnd() * W,
            cy: rnd() * H,
            r: 70 + rnd() * 90,
            L: 0.55 + rnd() * 0.25,
            C: 0.09 + rnd() * 0.07,
            h: rnd() * 360,
        });
    }
    write("aurora-ref-mesh-gradient.png", (x, y) => {
        let wsum = 0;
        let L = 0;
        let C = 0;
        let hx = 0;
        let hy = 0;
        for (const bl of blobs) {
            const d2 = (x - bl.cx) ** 2 + (y - bl.cy) ** 2;
            const wgt = Math.exp(-d2 / (2 * bl.r * bl.r));
            wsum += wgt;
            L += wgt * bl.L;
            C += wgt * bl.C;
            hx += wgt * Math.cos((bl.h * Math.PI) / 180);
            hy += wgt * Math.sin((bl.h * Math.PI) / 180);
        }
        if (wsum < 1e-6) return oklchToSrgb(0.6, 0.05, 0);
        return oklchToSrgb(L / wsum, C / wsum, (Math.atan2(hy, hx) * 180) / Math.PI);
    });
}

// ── plate 2 — skyscape (atmospheric scattering, zones+gradient) ───────────────
// Vertical value bands: warm horizon → cool zenith. Soft fBm cloud turbulence laid over,
// at moderate amplitude → a mid colourfulness / mid anisotropy register.
{
    const rnd = mulberry32(0x5eed02);
    // value-noise lattice for soft clouds.
    const GS = 9;
    const grid = [];
    for (let i = 0; i < GS * GS; i++) grid.push(rnd());
    const lerp = (a, b, t) => a + (b - a) * t;
    const fade = (t) => t * t * (3 - 2 * t);
    const noise = (fx, fy) => {
        const gx = fx * (GS - 1);
        const gy = fy * (GS - 1);
        const x0 = Math.floor(gx);
        const y0 = Math.floor(gy);
        const tx = fade(gx - x0);
        const ty = fade(gy - y0);
        const g = (xi, yi) =>
            grid[Math.min(GS - 1, yi) * GS + Math.min(GS - 1, xi)];
        return lerp(
            lerp(g(x0, y0), g(x0 + 1, y0), tx),
            lerp(g(x0, y0 + 1), g(x0 + 1, y0 + 1), tx),
            ty,
        );
    };
    write("aurora-ref-skyscape.png", (x, y) => {
        const v = y / H; // 0 zenith → 1 horizon
        // warm horizon (h≈55 amber) → cool zenith (h≈250 blue), lightness rises to horizon.
        const L = lerp(0.45, 0.82, v) + (noise(x / W, y / H) - 0.5) * 0.12;
        const C = lerp(0.07, 0.12, v) + (noise(x / W + 0.3, y / H + 0.3) - 0.5) * 0.04;
        const h = lerp(250, 55, v) + (noise(x / W + 0.6, y / H) - 0.5) * 25;
        return oklchToSrgb(Math.max(0.1, Math.min(0.95, L)), Math.max(0.02, C), h);
    });
}

// ── plate 3 — oil pastel (tooth + scumble, K-M chroma target) ─────────────────
// Broken-colour scumbled dabs at HIGH OKLCh chroma over a tooth substrate. Overlapping
// complementary dabs read as subtractive mix, not a muddy grey lerp → high colourfulness,
// moderate anisotropy (the dab direction varies).
{
    const rnd = mulberry32(0x5eed03);
    const buf = new Float64Array(W * H * 3);
    // base wash.
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            const [r, g, b] = oklchToSrgb(0.6, 0.13, 35 + 60 * (x / W));
            const i = (y * W + x) * 3;
            buf[i] = r;
            buf[i + 1] = g;
            buf[i + 2] = b;
        }
    // scumbled dabs — high-chroma broken colour, complementary jitter.
    const DABS = 2200;
    for (let d = 0; d < DABS; d++) {
        const cx = rnd() * W;
        const cy = rnd() * H;
        const ang = rnd() * Math.PI;
        const len = 4 + rnd() * 10;
        const wid = 1.5 + rnd() * 2.5;
        const baseH = 35 + 300 * rnd();
        const L = 0.45 + rnd() * 0.4;
        const C = 0.16 + rnd() * 0.09; // HIGH chroma (the K-M target)
        const [dr, dg, db] = oklchToSrgb(L, C, baseH);
        const ca = Math.cos(ang);
        const sa = Math.sin(ang);
        for (let t = -len; t <= len; t += 0.8) {
            for (let s = -wid; s <= wid; s += 0.8) {
                const px = Math.round(cx + t * ca - s * sa);
                const py = Math.round(cy + t * sa + s * ca);
                if (px < 0 || px >= W || py < 0 || py >= H) continue;
                const i = (py * W + px) * 3;
                // tooth: skip some pixels so the substrate shows through (scumble).
                if (rnd() < 0.25) continue;
                const a = 0.6;
                buf[i] = buf[i] * (1 - a) + dr * a;
                buf[i + 1] = buf[i + 1] * (1 - a) + dg * a;
                buf[i + 2] = buf[i + 2] * (1 - a) + db * a;
            }
        }
    }
    write("aurora-ref-oil-pastel.png", (x, y) => {
        const i = (y * W + x) * 3;
        return [Math.round(buf[i]), Math.round(buf[i + 1]), Math.round(buf[i + 2])];
    });
}
