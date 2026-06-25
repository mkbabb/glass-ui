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
 * compute kernel transcribes; `proof:viz-dotflow` clause F3 round-trips the two paths.
 *
 * RETOPOLOGY (BC.W-VIZ-DOTFLOW). The curl domain-scale dropped 1.7→0.55 (coarse braiding,
 * not fine chatter) per the §3.2 regime inversion. The velocity is no longer an advection
 * integrand (the lattice does not advect) — it is the DISPLACEMENT field's perp-gradient
 * source. `sampleDisplacement` is the per-frame sub-cell offset; `sampleVelocity` stays as
 * the round-trip anchor + the analytic ∇⊥h the displacement reads.
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
    // The curl-noise term reads at a COARSE domain scale (×0.55 — the §3.2 inversion off
    // the prior ×1.7 fine braiding) on a slow time scale (the organic break the
    // reference shows, kept LOW so it never overwhelms the dominant sweeping wave).
    const c = curlFBM({ x: p.x * 0.55 + timeSec * 0.15, y: p.y * 0.55 });
    return {
        x: g.x + c.x * curlStrength,
        y: g.y + c.y * curlStrength,
    };
}

// ── BD.W-DOTFLOW-AURORA-CURRENT: the cursor VORTEX (the flow register's interaction) ─
// The SINGLE math source the WGSL `cs_flow`/the GLSL state-pass transcribe line-for-line
// (the `proof:dotflow-fence` F1b vortex witness + the F3 round-trip cover this). r = p −
// cursor; a gaussian fall-off; a TRUE tangential ∇⊥ swirl + a drag-along term + a radial
// burst shove. Inert when the pointer is inactive.

/** The cursor-vortex lever set (the √φ-laddered radius + the spin/drag/burst gains). */
export interface VortexParams {
    cursor: Vec2;
    /** Pointer velocity (domain units / sec). */
    pointerVel: Vec2;
    /** Flick-burst impulse 0..1. */
    burst: number;
    /** Pointer active? (inert when false — the vortex is off). */
    active: boolean;
    radius: number;
    spin: number;
    dragGain: number;
    burstShove: number;
}

/**
 * The velocity the cursor injects at `p` — the perturbation `cs_flow` adds to the curl
 * current. A true tangential vortex (∇⊥ of the radial), plus a drag-along (the streamlines
 * follow the gesture) and a radial flick shove (the shockwave), all gaussian-falling off the
 * vortex radius. Returns the un-normalized perturbation in domain/sec.
 */
export function pointerVortex(p: Vec2, v: VortexParams): Vec2 {
    if (!v.active) return { x: 0, y: 0 };
    const rx = p.x - v.cursor.x;
    const ry = p.y - v.cursor.y;
    const d = Math.hypot(rx, ry);
    const radius = Math.max(v.radius, 1e-3);
    const fall = Math.exp(-(d * d) / (radius * radius));
    // tangential ∇⊥ swirl (normalized perpendicular of r).
    const sx = -ry;
    const sy = rx;
    const sl = Math.hypot(sx, sy) || 1e-6;
    const swirlX = sx / sl;
    const swirlY = sy / sl;
    const radX = rx / Math.max(d, 1e-4);
    const radY = ry / Math.max(d, 1e-4);
    const x = swirlX * v.spin + v.pointerVel.x * v.dragGain + radX * v.burst * v.burstShove;
    const y = swirlY * v.spin + v.pointerVel.y * v.dragGain + radY * v.burst * v.burstShove;
    return { x: x * fall, y: y * fall };
}

// ── BC.W-VIZ-DOTFLOW: the anchored dot-matrix topology (the gestalt fix) ─────────
// The field stops being a free-advecting particle cloud and becomes a CALM ANCHORED
// LATTICE a slow LARGE wave sweeps through (research/viz/dot-flow-field.md §3.3, §5).
// Four pure node-testable functions the WGSL transcribes line-for-line; the round-trip
// gate (F3) locks JS↔WGSL parity at a fixed (index, t) sample set.

/** The shipped domain half-extent (the lattice is laid out over [-half, half]²). */
export const FLOW_DOMAIN_HALF = 0.85;

/**
 * The deterministic lattice origin for a particle index — the WGSL `instance_index →
 * origin` mapping matches this EXACTLY (the F3 round-trip anchor). `cols` columns, square
 * pitch in DOMAIN units; the grid is centered on the origin so the field reads symmetric.
 * Index `i` walks row-major (`col = i % cols`, `row = floor(i / cols)`).
 */
export function gridOrigin(index: number, cols: number, pitch: number): Vec2 {
    const c = Math.max(cols, 1);
    const col = index % c;
    const row = Math.floor(index / c);
    // Center the lattice: the (cols-1) span × pitch, halved, is the leading offset.
    const half = ((c - 1) * pitch) / 2;
    return { x: col * pitch - half, y: row * pitch - half };
}

/**
 * The scalar Gerstner HEIGHT at an origin — the brightness driver (the moving bright
 * stripe the lattice paints). `h(o,t) = Σ_i A_i·sin(k_i·(D_i·o) − ω_i·t + φ_i)`, the SAME
 * sum the velocity derives from (no second wave table). The brightness field reads at the
 * ANCHOR (`o`), not the live position, so the sweep is stable + low-frequency.
 */
export function sampleHeight(
    o: Vec2,
    timeSec: number,
    waves: readonly WaveComponent[],
    windSpeed: number,
): number {
    let h = 0;
    let ampSum = 0;
    for (const w of waves) {
        const k = TAU / Math.max(w.wavelength, 1e-4);
        const d = dirOf(w.direction);
        const omega = Math.sqrt(FLOW_GRAVITY * k) * windSpeed;
        const theta = k * (d.x * o.x + d.y * o.y) - omega * timeSec + w.phase;
        h += w.amplitude * Math.sin(theta);
        ampSum += Math.abs(w.amplitude);
    }
    // Normalize to ≈[-1,1] by the total amplitude so the `waveBand` thresholds are
    // wave-table-independent (the Phillips amplitude at a large λ is otherwise huge —
    // 1/k² with small k). The WGSL transcribes the SAME normalization.
    return h / Math.max(ampSum, 1e-4);
}

/**
 * The sub-cell DISPLACEMENT for an origin — the divergence-free ∇⊥h (the Gerstner perp-
 * gradient) PLUS a faint coarse curl break. The dot eases toward `o + disp·displaceAmp`
 * (the restoring spring lives in the kernel); this is the target offset, NOT an advection
 * step. Capped LOW by `displaceAmp` so the dot never leaves its cell by > ~0.5 pitch.
 */
export function sampleDisplacement(
    o: Vec2,
    timeSec: number,
    waves: readonly WaveComponent[],
    windSpeed: number,
    curlStrength: number,
): Vec2 {
    // The displacement reads the analytic flow velocity (∇⊥h + the coarse curl break),
    // then BOUNDS it through a smooth tanh-ish soft-clamp so the wave amplitude can never
    // blow the sub-cell cap — the magnitude rides into [0,1) regardless of the wave
    // table, and `displaceAmp` (in pitch units, capped < 0.5 pitch) scales the final
    // offset. The WGSL transcribes the SAME soft-clamp.
    const v = sampleVelocity(o, timeSec, waves, windSpeed, curlStrength);
    const mag = Math.hypot(v.x, v.y);
    if (mag < 1e-5) return { x: 0, y: 0 };
    // soft-clamp: mag → tanh(mag) keeps direction, bounds magnitude into [0,1).
    const bounded = Math.tanh(mag);
    const s = bounded / mag;
    return { x: v.x * s, y: v.y * s };
}

/**
 * The sweeping bright-stripe band: a `smoothstep` band centered `center` width `width`
 * over the normalized height — the moving iso-band that lights the dots it passes. The
 * band is symmetric about the center (a soft ridge crossing the lattice as `h` sweeps).
 */
export function waveBand(h: number, center: number, width: number): number {
    const w = Math.max(width, 1e-3);
    // Distance from the band center, soft-thresholded — 1 at the center, falling to 0 at
    // ±width. The two-sided smoothstep makes a soft ridge (not a hard edge).
    const d = Math.abs(h - center);
    return 1 - smoothstep(0, w, d);
}

/** A scalar smoothstep (the GLSL/WGSL twin), for `waveBand`. */
function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = Math.min(Math.max((x - edge0) / Math.max(edge1 - edge0, 1e-6), 0), 1);
    return t * t * (3 - 2 * t);
}

/**
 * Build the wave ladder about a dominant wind direction. BC.W-VIZ-DOTFLOW REGIME
 * INVERSION (research/viz/dot-flow-field.md §3.2): the LOW-frequency coherent regime — a
 * LARGE base wavelength (≈½–1 period across the view → ONE dominant sweeping wave), 2-3
 * octaves (no fine chatter), a steep amplitude persistence (×0.38 → the base wave
 * dominates, detail a whisper), the λ falloff floored so the finest λ ≥ ~⅓ view. The
 * directions spread MODESTLY about `windDirection` (the sweep reads as ONE coherent form,
 * not a braided delta).
 *
 * `lambda0Mul` is λ₀ as a MULTIPLE of the domain extent (default 2.5 — the §1 target);
 * `octaves` is 2-3 (the coherent band). Amplitudes follow the Phillips falloff × the
 * per-octave persistence so the field stays energy-realistic.
 */
export function buildWaveLadder(
    windDirection: number,
    octaves = 3,
    lambda0Mul = 2.5,
): WaveComponent[] {
    // λ₀ as a multiple of the full domain extent (2·half) — a LARGE dominant wavelength.
    const domainExtent = 2 * FLOW_DOMAIN_HALF;
    const lambda0 = Math.max(lambda0Mul, 0.5) * domainExtent;
    // The Phillips L scales with the dominant wave so the spectrum stays realistic.
    const L = lambda0 / TAU;
    // Floor the finest λ at ~⅓ the view so no octave introduces fine chatter.
    const minLambda = domainExtent / 3;
    const oct = Math.max(1, Math.min(Math.round(octaves), 3));
    const out: WaveComponent[] = [];
    let wavelength = lambda0;
    let persistence = 1;
    for (let i = 0; i < oct; i++) {
        const lam = Math.max(wavelength, minLambda);
        const k = TAU / lam;
        const phillips = Math.exp(-1 / (k * L) ** 2) / (k * k);
        // A MODEST spread (±8° per octave) — the sweep stays one coherent form.
        const spread = (i % 2 === 0 ? 1 : -1) * (8 + i * 4);
        out.push({
            amplitude: phillips * persistence,
            wavelength: lam,
            direction: windDirection + spread,
            phase: (i * 1.618033) % TAU,
        });
        wavelength *= 0.58; // §3.2 falloff (floored above)
        persistence *= 0.38; // §3.2 amplitude persistence — base dominates
    }
    return out;
}
