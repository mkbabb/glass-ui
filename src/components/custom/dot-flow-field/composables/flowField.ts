// BB.W-VIZ-SUITE (W-FLOWFIELD) — the analytic ∇⊥ψ flow-field evaluator (the SINGLE
// math source the WGSL compute kernel transcribes line-for-line).
//
// The dot-flow-field is a curl-noise flow field traced by advected particles, where
// the scalar potential undulates as a Gerstner / Tessendorf sum-of-sines water-wave
// field (the user's "water-like waves that are Fourier-defined"). This module is the
// CITED-SOTA math, pure + testable in node — the WGSL `flow-field.compute.wgsl`
// transcribes `sampleVelocity()` EXACTLY, and `proof:flow-field` clause 3 asserts the
// two paths agree on `v(p,t)` at a fixed sample set within fp tolerance (the
// uniform-alignment / transcription-drift trap closed by a round-trip, not a per-line
// edit loop).
//
// The math (real + cited):
//
// 1. The wave potential (Tessendorf / Gerstner sum-of-sines). The scalar height field
//    at position p=(x,y), time t:
//        h(p,t) = Σ_i A_i · sin( k_i·(D_i·p) − ω_i·t + φ_i )
//    where A_i amplitude, k_i = 2π/λ_i wavenumber, D_i unit direction, ω_i = √(g·k_i)
//    the deep-water dispersion frequency (long waves travel faster — "real ocean math,
//    not arbitrary noise"; Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001), φ_i a
//    phase seed. The amplitudes follow a Phillips-spectrum falloff so the field is
//    energy-realistic. A small N (4-8 octaves) gives the braided, multi-scale undulation.
//
// 2. The flow field (divergence-free curl — Bridson). The dots must FOLLOW the field
//    without piling up. In 2D the curl of a scalar potential ψ is the perpendicular
//    gradient (∇⊥ψ = (∂ψ/∂y, −∂ψ/∂x)), divergence-free BY CONSTRUCTION (Bridson, Houser,
//    Nordenstam, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007), so the particles
//    swirl + braid without converging. The suite sets ψ = h(p,t) (PLUS an optional fbm
//    curl-noise term, weighted by `curlStrength`), so the streamlines ARE the iso-contours
//    of the water-wave height — the dots ride the crests + troughs.
//
//    The gradient is ANALYTIC (no finite difference): for the Gerstner term,
//        ∂h/∂x = Σ_i A_i·k_i·D_i.x·cos(θ_i), ∂h/∂y = Σ_i A_i·k_i·D_i.y·cos(θ_i),
//        θ_i = k_i·(D_i·p) − ω_i·t + φ_i,
//    and the velocity is v = (∂h/∂y, −∂h/∂x).
//
// 3. The curl-noise braiding term composes the SHARED `curlFBM` operator (BB.B1,
//    `src/composables/glass/webgl/shaders/flow.glsl.ts` — the divergence-free curl of a
//    scalar fbm potential). This is the BOOKED #3 consumer that satisfies its
//    ≥3-consumer bar. The JS side mirrors the same value-noise fbm + central-difference
//    curl so the round-trip holds (the GLSL/WGSL chunk + this JS evaluator share ONE
//    operator definition, transcribed not re-derived).

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

/**
 * One Gerstner / Tessendorf wave component. `amplitude` A_i, `wavelength` λ_i (so
 * k_i = 2π/λ_i), `direction` in DEGREES (the unit travel direction), `phase` φ_i.
 * `ω_i = √(g·k_i)` is derived from the dispersion relation, not stored.
 */
export interface WaveComponent {
    amplitude: number;
    wavelength: number;
    /** Travel direction in degrees (0 = +x). */
    direction: number;
    phase: number;
}

/** Deep-water gravity constant (normalized; scales the dispersion ω). */
export const FLOW_GRAVITY = 9.81;

/** Two-pi. */
const TAU = Math.PI * 2;

/** A unit direction from degrees. */
function dirOf(deg: number): Vec2 {
    const r = (deg * Math.PI) / 180;
    return { x: Math.cos(r), y: Math.sin(r) };
}

/**
 * The Gerstner-sum velocity v(p,t) = ∇⊥h = (∂h/∂y, −∂h/∂x), ANALYTIC. The single
 * math source the WGSL kernel transcribes. `windSpeed` scales the dispersion ω;
 * `windDirection` (deg) is folded into each component's direction by the caller (the
 * components carry their own absolute direction). Returns the un-normalized flow vector.
 */
export function gerstnerVelocity(
    p: Vec2,
    timeSec: number,
    waves: readonly WaveComponent[],
    windSpeed: number,
): Vec2 {
    let dhdx = 0;
    let dhdy = 0;
    for (const w of waves) {
        const k = TAU / Math.max(w.wavelength, 1e-4);
        const d = dirOf(w.direction);
        // ω = √(g·k); windSpeed scales the travel speed (the dispersion-driven term).
        const omega = Math.sqrt(FLOW_GRAVITY * k) * windSpeed;
        const theta = k * (d.x * p.x + d.y * p.y) - omega * timeSec + w.phase;
        const c = Math.cos(theta);
        // ∂h/∂x = A·k·D.x·cos(θ), ∂h/∂y = A·k·D.y·cos(θ).
        const akc = w.amplitude * k * c;
        dhdx += akc * d.x;
        dhdy += akc * d.y;
    }
    // v = ∇⊥h = (∂h/∂y, −∂h/∂x) — the divergence-free perpendicular gradient.
    return { x: dhdy, y: -dhdx };
}

// ── The shared curl-noise braiding term (BB.B1 curlFBM JS mirror) ──────────────
// The JS twin of `flow.glsl.ts`'s `curlFBM(p)` — central-difference curl of a scalar
// value-noise fbm potential. Transcribed not re-derived; the round-trip gate asserts
// the JS + WGSL paths agree.
const CURL_EPS = 0.012;

function hash21(x: number, y: number): number {
    // The blob-local 3D-p3 hash mirror (the WGSL `hash21`), so the JS noise basis
    // matches the kernel's exactly.
    let px = (x * 0.1031) % 1;
    let py = (y * 0.1031) % 1;
    let pz = (x * 0.1031) % 1;
    if (px < 0) px += 1;
    if (py < 0) py += 1;
    if (pz < 0) pz += 1;
    const d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
    px += d;
    py += d;
    pz += d;
    let v = ((px + py) * pz) % 1;
    if (v < 0) v += 1;
    return v;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** Quintic-faded 2D value noise (matches the WGSL `valueNoise`). */
function valueNoise(x: number, y: number): number {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    const a = hash21(ix, iy);
    const b = hash21(ix + 1, iy);
    const c = hash21(ix, iy + 1);
    const d = hash21(ix + 1, iy + 1);
    return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

/** A 3-octave scalar fbm potential (the host noise basis the curl operator wraps). */
function potentialFBM(x: number, y: number): number {
    let v = 0;
    let amp = 0.5;
    let freq = 1;
    let px = x;
    let py = y;
    for (let i = 0; i < 3; i++) {
        v += amp * valueNoise(px * freq, py * freq);
        // FBM_ROT mat2(0.8, 0.6, -0.6, 0.8) — same rotation as the shared chunk.
        const rx = 0.8 * px - 0.6 * py;
        const ry = 0.6 * px + 0.8 * py;
        px = rx;
        py = ry;
        freq *= 2.0;
        amp *= 0.5;
    }
    return v;
}

/** The 2D curl of the scalar fbm potential (the JS twin of `curlFBM`). */
export function curlFBM(p: Vec2): Vec2 {
    const dx =
        potentialFBM(p.x + CURL_EPS, p.y) - potentialFBM(p.x - CURL_EPS, p.y);
    const dy =
        potentialFBM(p.x, p.y + CURL_EPS) - potentialFBM(p.x, p.y - CURL_EPS);
    const gx = dx / (2 * CURL_EPS);
    const gy = dy / (2 * CURL_EPS);
    // ∇×ψ in 2D — rotate the gradient 90°: (∂ψ/∂y, −∂ψ/∂x).
    return { x: gy, y: -gx };
}

/**
 * The COMPOSITE flow velocity v(p,t): the Gerstner sum-of-sines analytic ∇⊥h PLUS the
 * `curlStrength`-weighted fbm curl-noise braiding term. The SINGLE math source the WGSL
 * compute kernel transcribes; `proof:flow-field` clause 3 round-trips the two paths.
 */
export function sampleVelocity(
    p: Vec2,
    timeSec: number,
    waves: readonly WaveComponent[],
    windSpeed: number,
    curlStrength: number,
): Vec2 {
    const g = gerstnerVelocity(p, timeSec, waves, windSpeed);
    if (curlStrength <= 0) return g;
    // The curl-noise term advects on a slow time scale (the braiding the reference shows).
    const c = curlFBM({ x: p.x * 1.7 + timeSec * 0.15, y: p.y * 1.7 });
    return {
        x: g.x + c.x * curlStrength,
        y: g.y + c.y * curlStrength,
    };
}

/**
 * Build the default 6-octave Phillips-spectrum wave ladder about a dominant wind
 * direction. Amplitudes follow `A_i ∝ exp(−1/(k_i·L)²) / k_i²` (Tessendorf §4), so the
 * field is energy-realistic. The directions spread about `windDirection` so the
 * streamlines braid like a river delta (not a flat band).
 */
export function buildWaveLadder(
    windDirection: number,
    octaves = 6,
): WaveComponent[] {
    const L = 1.6; // the largest wave from the dominant wind (Phillips L)
    const out: WaveComponent[] = [];
    let wavelength = 2.4;
    for (let i = 0; i < octaves; i++) {
        const k = TAU / wavelength;
        const phillips = Math.exp(-1 / (k * L) ** 2) / (k * k);
        // A spread that widens with octave — the fine octaves braid more.
        const spread = (i % 2 === 0 ? 1 : -1) * (18 + i * 9);
        out.push({
            amplitude: phillips * 0.5,
            wavelength,
            direction: windDirection + spread,
            phase: (i * 1.618033) % TAU,
        });
        wavelength *= 0.62; // decreasing λ → increasing k (multi-scale)
    }
    return out;
}
