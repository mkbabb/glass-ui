// BC.W-VIZ-CONCENTRIC — the analytic radial-Fourier ring-interference evaluator (the
// SINGLE math source the WGSL fragment shader + the GLSL fallback transcribe line-for-line).
//
// Concentric reads as thin bright ELLIPSOID LINES that beat into distinct waves — NOT a
// smooth color cloud. The field value at p is a sum of CLEAN low-frequency radial sinusoids
// about one-or-more centers cⱼ; two families at slightly different wavelengths BEAT into a
// low-frequency moiré envelope (the "distinct waves"). The render extracts the field's
// CRESTS as constant-width antialiased strokes via Inigo Quilez's distance-estimation
// (de ≈ |f|/|∇f|, iquilezles.org/articles/distance/) — the gradient is available in CLOSED
// FORM because the field is a sum of sinusoids (a sum of cosines), so the JS round-trip
// stays exact (no fwidth, no central-difference, no second eval).
//
// The math (real + cited):
//
//   phase_ij(p,t) = k_i·‖R(−αⱼ)(p − cⱼ)‖_e − ω_i·t + φ_i
//   f(p,t)        = Σ_j Σ_i  A_i · sin( phase_ij ) · weightⱼ
//   ∇phase_ij(p)  = k_i · ∇‖·‖_e   (a closed-form sum of cosines through the chain rule)
//
//   where ‖·‖_e is the ELLIPSOIDAL norm sqrt((dx/a)² + (dy/b)²) with axis ratios (a,b) so
//   the rings are concentric ELLIPSES (the "3D-rendered-to-2D" depth implication), computed
//   in the family's ROTATED frame R(−αⱼ) so two tilted elliptical families cross into rich
//   moiré (the literal "ellipsoid lines that form distinct waves"). k_i = 2π/λ_i is the
//   radial wavenumber, ω_i = √(g·k_i) the deep-water dispersion frequency (Tessendorf,
//   *Simulating Ocean Water*, SIGGRAPH 2001 — the suite's ONE dispersion law, shared with
//   the dot-flow-field), φ_i a phase seed.
//
// `proof:concentric` clause 3 asserts the JS `sampleRingField()`/`ellipsoidalGradMag()`/the
// isoline `de` and the WGSL/GLSL transcriptions produce the same f(p,t) at a fixed sample
// set within fp tolerance (the transcription-drift trap closed by a round-trip, not a
// per-line edit loop — the dot-flow-field precedent).

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

/**
 * One CLEAN radial ring component. `amplitude` A_i, `wavelength` λ_i (so k_i = 2π/λ_i),
 * `phase` φ_i. `ω_i = √(g·k_i)` is derived from the dispersion relation, not stored (the
 * SAME dispersion the flow field's Gerstner sum uses — the ONE suite dispersion law). A
 * family carries 1–2 clean low frequencies, NEVER a turbulence octave ladder (the noise
 * amplifier that read as a blur).
 */
export interface RingComponent {
    amplitude: number;
    wavelength: number;
    phase: number;
}

/**
 * A ring origin in domain space [-1,1]² (multi-center → interference). `rotAlpha` is the
 * per-family tilt of the ellipsoidal frame (radians) — two families at different tilts cross
 * into rich moiré. It reuses the spare `centers[j].w` uniform lane (no byte-layout change).
 */
export interface RingCenter {
    x: number;
    y: number;
    /** Per-center weight (a far center contributes a fainter ring family). */
    weight: number;
    /** The per-family ellipsoid tilt (radians); 0 = the un-rotated frame. */
    rotAlpha: number;
}

/** Deep-water gravity constant (normalized; scales the dispersion ω — shared with the flow field). */
export const RING_GRAVITY = 9.81;

/** Two-pi. */
const TAU = Math.PI * 2;

/**
 * The ellipsoidal radial distance ‖p − c‖_e = sqrt((dx/a)² + (dy/b)²) in the family's
 * ROTATED frame R(−α): rotate (p − c) by −α, then scale each axis by (a,b). The axis ratio
 * tilts the rings into ellipses; the rotation tilts the ellipse so crossing families read as
 * distinct waves. The single radial metric the WGSL shader transcribes.
 */
export function ellipsoidalRadiusRot(
    p: Vec2,
    center: RingCenter,
    axisA: number,
    axisB: number,
): number {
    const ca = Math.cos(center.rotAlpha);
    const sa = Math.sin(center.rotAlpha);
    const px = p.x - center.x;
    const py = p.y - center.y;
    // R(−α)·(p − c): the rotated local coordinate.
    const rx = ca * px + sa * py;
    const ry = -sa * px + ca * py;
    const dx = rx / Math.max(axisA, 1e-4);
    const dy = ry / Math.max(axisB, 1e-4);
    return Math.sqrt(dx * dx + dy * dy);
}

/** The un-rotated ellipsoidal radius (rotAlpha = 0). Kept for the gate's axis-ratio assert. */
export function ellipsoidalRadius(
    p: Vec2,
    center: RingCenter,
    axisA: number,
    axisB: number,
): number {
    const dx = (p.x - center.x) / Math.max(axisA, 1e-4);
    const dy = (p.y - center.y) / Math.max(axisB, 1e-4);
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * |∇r| of the rotated ellipsoidal radius r = ‖R(−α)(p − c)‖_e. By the chain rule, with
 * u = R(−α)(p − c) and the scaled coordinates (ux/a, uy/b):
 *
 *   ∂r/∂p = Rᵀ · ( ux/a² , uy/b² ) / r   →   |∇r| = sqrt((ux/a²)² + (uy/b²)²) / r
 *
 * (the rotation Rᵀ is orthonormal so it does not change the magnitude). At r→0 the gradient
 * is ill-defined; ε-clamp the denominator. This is the closed-form magnitude the IQ
 * distance-estimation de = |sin(phase)| / (|cos(phase)|·k·|∇r|) divides by.
 */
export function ellipsoidalGradMag(
    p: Vec2,
    center: RingCenter,
    axisA: number,
    axisB: number,
): number {
    const ca = Math.cos(center.rotAlpha);
    const sa = Math.sin(center.rotAlpha);
    const px = p.x - center.x;
    const py = p.y - center.y;
    const rx = ca * px + sa * py;
    const ry = -sa * px + ca * py;
    const a = Math.max(axisA, 1e-4);
    const b = Math.max(axisB, 1e-4);
    const sx = rx / a;
    const sy = ry / b;
    const r = Math.sqrt(sx * sx + sy * sy);
    // ∇r = ( sx/a , sy/b ) / r  (rotated back, magnitude-preserving).
    const gx = sx / a;
    const gy = sy / b;
    return Math.sqrt(gx * gx + gy * gy) / Math.max(r, 1e-4);
}

/**
 * The radial-Fourier ring-interference value f(p,t) ∈ ℝ — the multi-center weighted sum of
 * CLEAN radial sinusoids. The SINGLE math source the WGSL `fs_main` + the GLSL fallback
 * transcribe. `speed` scales the dispersion ω (the ring-travel speed). Returns the
 * un-normalized field value (the BEAT ENVELOPE the shader tints through the palette).
 */
export function sampleRingField(
    p: Vec2,
    timeSec: number,
    centers: readonly RingCenter[],
    rings: readonly RingComponent[],
    axisA: number,
    axisB: number,
    speed: number,
): number {
    let acc = 0;
    for (const c of centers) {
        const radius = ellipsoidalRadiusRot(p, c, axisA, axisB);
        let centerSum = 0;
        for (const r of rings) {
            const k = TAU / Math.max(r.wavelength, 1e-4);
            // ω = √(g·k); speed scales the travel (the dispersion-driven term — shared law).
            const omega = Math.sqrt(RING_GRAVITY * k) * speed;
            const theta = k * radius - omega * timeSec + r.phase;
            centerSum += r.amplitude * Math.sin(theta);
        }
        acc += centerSum * c.weight;
    }
    return acc;
}

/**
 * The IQ gradient-normalized distance-to-isoline INK at p — the per-pixel line strength,
 * the union (brightest-wins `max`) over every (family × ring) crest. For a sinusoid
 * s = sin(phase), de ≈ |s| / |∇s| = |sin| / (|cos|·k·|∇r|) is the analytic (domain-units)
 * distance to the nearest crest everywhere; the SHADER converts it to a constant PIXEL
 * width via fwidth(phase): dePx = de·gradPhase / fwidth(phase) = |sin|/(|cos|·fwidth(phase)),
 * then line = 1 − smoothstep(lineHalfW, lineHalfW+aa, dePx) with lineHalfW/aa in pixels. The
 * JS takes `phaseDeriv` as the per-pixel phase derivative (the fwidth(phase) analogue) so a
 * node round-trip matches the shader exactly; a bare call uses a representative default.
 *
 * Returns { ink, env } — ink ∈ [0,1] the line strength (the alpha/brightness), env the raw
 * beat-envelope value (the hue driver, identical to sampleRingField).
 */
export function ringIsolineInk(
    p: Vec2,
    timeSec: number,
    centers: readonly RingCenter[],
    rings: readonly RingComponent[],
    axisA: number,
    axisB: number,
    speed: number,
    lineHalfW: number,
    aa: number,
    phaseDeriv = 0.08,
): { ink: number; env: number } {
    let ink = 0;
    let env = 0;
    for (const c of centers) {
        const radius = ellipsoidalRadiusRot(p, c, axisA, axisB);
        const gradR = ellipsoidalGradMag(p, c, axisA, axisB);
        for (const r of rings) {
            const k = TAU / Math.max(r.wavelength, 1e-4);
            const omega = Math.sqrt(RING_GRAVITY * k) * speed;
            const phase = k * radius - omega * timeSec + r.phase;
            const s = Math.sin(phase);
            const cphase = Math.abs(Math.cos(phase));
            const gradPhase = Math.max(k * gradR, 1e-4);
            // The analytic domain-units distance (round-trips JS↔WGSL↔GLSL).
            const de = Math.abs(s) / Math.max(cphase * gradPhase, 1e-4);
            // Convert to PIXELS (the shader uses fwidth(phase); JS takes the derivative).
            const dePx = (de * gradPhase) / Math.max(phaseDeriv, 1e-4);
            const line = 1 - smoothstep(lineHalfW, lineHalfW + aa, dePx);
            const w = r.amplitude * c.weight;
            ink = Math.max(ink, line * w);
            env += s * w;
        }
    }
    return { ink: clamp01(ink), env };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = clamp01((x - edge0) / Math.max(edge1 - edge0, 1e-6));
    return t * t * (3 - 2 * t);
}

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Build a CLEAN beating ring FAMILY — 1–2 low-frequency radial sinusoids, NOT a turbulence
 * octave ladder. `baseWavelength` ≈ 0.18 sets the ring spacing; a second harmonic at
 * 0.5×base (optional) adds a subtle inner-ring texture without busying the field. The
 * amplitudes are FLAT (energy is not the point — clean lines are), so each crest paints a
 * crisp isoline. Distinct families get slightly different base wavelengths (a small Δλ) so
 * they BEAT into the moiré envelope — the "distinct waves."
 */
export function buildRingFamily(
    baseWavelength: number,
    harmonics = 1,
    phaseSeed = 0,
): RingComponent[] {
    const out: RingComponent[] = [];
    const n = Math.max(1, Math.min(2, harmonics));
    for (let i = 0; i < n; i++) {
        out.push({
            // a flat-ish amplitude; the second harmonic is fainter (subtle inner texture).
            amplitude: i === 0 ? 1.0 : 0.45,
            // the base ring + an optional 2× tighter inner ring (NOT a 0.62-octave ladder).
            wavelength: baseWavelength / (i + 1),
            phase: (phaseSeed + i * 1.618033) % TAU,
        });
    }
    return out;
}
