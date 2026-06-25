/**
 * boil-spike.mjs — THROWAWAY de-risk for the GOLDEN boil re-author.
 *
 * Proves the single boldest mechanism: the new `naturalUnderlinePoints` body
 * (φ-incommensurate value-noise displacement off the house mulberry32) produces
 * a centerline that is born-RED→GREEN on the gate the GOLDEN spec sketches:
 *   A1 — irregular hump SPACING (spacing CV ≥ 0.18) + NO sharp autocorr peak (≤ 0.6)
 *   A2 — irregular AMPLITUDE (extremum-amp CV ≥ 0.20)
 *
 * It runs BOTH morphologies (OLD sinusoid vs NEW value-noise) over ≥3 seeds and
 * prints the gate statistics side by side. node-only, zero deps.
 */

// ── the house prng leaf (verbatim from src/utils/prng.ts) ──────────────────
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const VB_W = 100;
const PERIODS_MIN = 2,
    PERIODS_MAX = 4;

// ── OLD morphology (geometry.ts:68 at HEAD — the sinusoid, born-RED) ─────────
const OLD_AMP_FRAC = 0.022;
function oldNatural(x1, y, x2, seed, segments) {
    const span = x2 - x1;
    const rng = mulberry32(seed >>> 0);
    const periods =
        PERIODS_MIN + Math.floor(rng() * (PERIODS_MAX - PERIODS_MIN + 1));
    const amp = span * OLD_AMP_FRAC;
    const phase = rng() * Math.PI * 2;
    const w1 = 0.65 + rng() * 0.35;
    const w2 = 0.2 + rng() * 0.3;
    const n = Math.max(6, segments);
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = x1 + span * t;
        const base =
            w1 * Math.sin(phase + t * Math.PI * 2 * periods) +
            w2 * Math.sin(phase * 1.7 + t * Math.PI * 2 * (periods + 1));
        const envelope = Math.sin(Math.PI * t);
        const jitter = (rng() - 0.5) * 0.4;
        pts.push([x, y + amp * (base + jitter) * envelope]);
    }
    return pts;
}

// ── NEW morphology (the GOLDEN re-author) ────────────────────────────────────
// φ-incommensurate fractal value-noise: disp(t) = Σ aₖ·vnoise(t·fₖ + φₖ),
// fₖ = F0·φ^k (mutually irrational → never closes into a period),
// aₖ = A·(1/φ)^k (per-octave decay), per-octave seeded phase φₖ.
// 1-D value noise = lerp between seeded lattice values, smootherstep-faired.
const PHI = 1.6180339887;
const NEW_AMP_FRAC = 0.05; // ~2.3× the old — a VISIBLE hand wander
const NOISE_OCTAVES = 4; // 4 octaves → richer non-periodicity, no seed peaks
const NOISE_F0 = 1.9; // base spatial frequency over [0,1] (fewer, lazier humps)

// a seeded 1-D value-noise sampler (lattice + smootherstep fairing).
function makeVNoise(rng) {
    // a fixed lattice of seeded values in [-1,1], indexed by floor(x) with wrap.
    const N = 256;
    const lat = new Float64Array(N);
    for (let i = 0; i < N; i++) lat[i] = rng() * 2 - 1;
    const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    return (x) => {
        const xi = Math.floor(x);
        const f = x - xi;
        const a = lat[((xi % N) + N) % N];
        const b = lat[(((xi + 1) % N) + N) % N];
        return a + (b - a) * smoother(f);
    };
}

function newNatural(x1, y, x2, seed, segments) {
    const span = x2 - x1;
    if (span <= 0)
        return [
            [x1, y],
            [x2, y],
        ];
    const rng = mulberry32(seed >>> 0);
    const amp = span * NEW_AMP_FRAC;
    // per-octave amplitude (1/φ decay), frequency (φ^k), and seeded phase.
    const oct = [];
    for (let k = 0; k < NOISE_OCTAVES; k++) {
        oct.push({
            a: Math.pow(1 / PHI, k),
            f: NOISE_F0 * Math.pow(PHI, k),
            phi: rng() * 1000, // seeded phase offset into the lattice
            noise: makeVNoise(rng),
        });
    }
    // normalize so Σaₖ ≈ 1 (keep the visible amplitude predictable)
    const aSum = oct.reduce((s, o) => s + o.a, 0);
    const n = Math.max(8, segments * 2); // denser sampling resolves the high octave
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = x1 + span * t;
        let disp = 0;
        for (const o of oct) disp += o.a * o.noise(t * o.f + o.phi);
        disp /= aSum;
        // endpoint anchor: a narrow cosine taper ONLY at the very ends (not a
        // body-wide envelope) — the ends settle to baseline so draw-on doesn't pop,
        // but the BODY amplitude stays irregular (no symmetric sin(π·t) floor).
        const edge = 0.12;
        const anchor =
            t < edge
                ? 0.5 - 0.5 * Math.cos((t / edge) * Math.PI)
                : t > 1 - edge
                  ? 0.5 - 0.5 * Math.cos(((1 - t) / edge) * Math.PI)
                  : 1;
        pts.push([x, y + amp * disp * anchor]);
    }
    return pts;
}

// ── gate statistics ──────────────────────────────────────────────────────────
function detrend(ys) {
    // remove the linear trend so we measure wobble, not slope
    const n = ys.length;
    const mx = (n - 1) / 2;
    const my = ys.reduce((s, v) => s + v, 0) / n;
    let sxy = 0,
        sxx = 0;
    for (let i = 0; i < n; i++) {
        sxy += (i - mx) * (ys[i] - my);
        sxx += (i - mx) * (i - mx);
    }
    const slope = sxx ? sxy / sxx : 0;
    return ys.map((v, i) => v - (my + slope * (i - mx)));
}

function extrema(ys) {
    const ex = [];
    for (let i = 1; i < ys.length - 1; i++) {
        if (
            (ys[i] > ys[i - 1] && ys[i] >= ys[i + 1]) ||
            (ys[i] < ys[i - 1] && ys[i] <= ys[i + 1])
        )
            ex.push(i);
    }
    return ex;
}

function cv(arr) {
    if (arr.length < 2) return 0;
    const m = arr.reduce((s, v) => s + v, 0) / arr.length;
    if (m === 0) return 0;
    const v = arr.reduce((s, x) => s + (x - m) * (x - m), 0) / arr.length;
    return Math.sqrt(v) / Math.abs(m);
}

function maxAutocorrPeak(ys) {
    const d = detrend(ys);
    const n = d.length;
    const mean = d.reduce((s, v) => s + v, 0) / n;
    const c = d.map((v) => v - mean);
    const c0 = c.reduce((s, v) => s + v * v, 0) || 1;
    let peak = 0;
    // search lags from 2 (skip trivial) to n/2 — a clean sine peaks ≈1 at its period
    for (let lag = 2; lag < Math.floor(n / 2); lag++) {
        let s = 0;
        for (let i = 0; i + lag < n; i++) s += c[i] * c[i + lag];
        peak = Math.max(peak, Math.abs(s / c0));
    }
    return peak;
}

function stats(fn, label) {
    const seeds = [3, 17, 42, 101];
    const rows = [];
    for (const seed of seeds) {
        const pts = fn(4, 20, VB_W - 4, seed, 14);
        const ys = pts.map((p) => p[1]);
        const yRange = Math.max(...ys) - Math.min(...ys);
        const ex = extrema(detrend(ys));
        const spacing = [];
        for (let i = 1; i < ex.length; i++) spacing.push(ex[i] - ex[i - 1]);
        const amps = ex.map((i) => Math.abs(detrend(ys)[i]));
        rows.push({
            seed,
            yRange: +yRange.toFixed(2),
            nExtrema: ex.length,
            spacingCV: +cv(spacing).toFixed(3),
            ampCV: +cv(amps).toFixed(3),
            autocorrPeak: +maxAutocorrPeak(ys).toFixed(3),
        });
    }
    // determinism: same seed reproduces byte-equal
    const a = JSON.stringify(fn(4, 20, 96, 3, 14));
    const b = JSON.stringify(fn(4, 20, 96, 3, 14));
    const reproduces = a === b;
    // distinct: seed 3 ≠ seed 17
    const distinct =
        JSON.stringify(fn(4, 20, 96, 3, 14)) !==
        JSON.stringify(fn(4, 20, 96, 17, 14));
    console.log(`\n===== ${label} =====`);
    console.table(rows);
    const meanSpacingCV =
        rows.reduce((s, r) => s + r.spacingCV, 0) / rows.length;
    const meanAmpCV = rows.reduce((s, r) => s + r.ampCV, 0) / rows.length;
    // A1 is the LOAD-BEARING periodicity gate, evaluated PER-SEED (every seed must
    // clear, not the mean — a single periodic seed is a fail). The autocorr peak is
    // the discriminating measure (the sinusoid self-correlates ~0.8; noise stays low).
    const maxPeak = Math.max(...rows.map((r) => r.autocorrPeak));
    const A1 = meanSpacingCV >= 0.18 && maxPeak <= 0.6;
    const A2 = meanAmpCV >= 0.2;
    console.log(
        `  A1 (spacingCV≥0.18 & MAX autocorrPeak≤0.6): meanSpacingCV=${meanSpacingCV.toFixed(3)} maxPeak=${maxPeak.toFixed(3)} → ${A1 ? "GREEN" : "RED"}`,
    );
    console.log(
        `  A2 (ampCV≥0.20 corroborating):              meanAmpCV=${meanAmpCV.toFixed(3)} → ${A2 ? "GREEN" : "RED"}`,
    );
    console.log(
        `  A4 (determinism): reproduces=${reproduces} distinct=${distinct} → ${reproduces && distinct ? "GREEN" : "RED"}`,
    );
    return { A1, A2 };
}

console.log(
    "GOLDEN boil-spike — the gate must be born-RED on OLD, GREEN on NEW.",
);
const oldR = stats(oldNatural, "OLD sinusoid (HEAD — must RED)");
const newR = stats(newNatural, "NEW φ-incommensurate value-noise (GOLDEN — must GREEN)");

console.log("\n===== VERDICT =====");
console.log(
    `OLD A1=${oldR.A1 ? "GREEN" : "RED"}  (the periodicity gate — want RED, born-RED proof)`,
);
console.log(
    `NEW A1=${newR.A1 ? "GREEN" : "RED"} A2=${newR.A2 ? "GREEN" : "RED"}  (want GREEN/GREEN — fix proof)`,
);
console.log(
    "\nNOTE: A1 (autocorr periodicity peak) is the LOAD-BEARING discriminator — born-RED",
);
console.log(
    "on the OLD sinusoid by construction. A2 (amplitude-CV) is CORROBORATING only: the",
);
console.log(
    "OLD sinusoid already varies amplitude across seeds, so A2 alone is a FALSE-GREEN",
);
console.log(
    "risk — the GOLDEN gate must key its born-RED proof on A1's autocorr peak.",
);
const pass = !oldR.A1 && newR.A1 && newR.A2;
console.log(`\nSPIKE ${pass ? "PASS ✓ — the mechanism de-risks the GOLDEN gate (A1 born-RED→GREEN, A2 GREEN)" : "FAIL ✗ — tune the constants"}`);
process.exit(pass ? 0 : 1);
