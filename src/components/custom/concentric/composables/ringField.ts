// BB.W-VIZ-SUITE (W-CONCENTRIC) — the analytic radial-Fourier ring-interference
// evaluator (the SINGLE math source the WGSL fragment shader + the GLSL fallback
// transcribe line-for-line).
//
// Concentric is the RADIAL analogue of the dot-flow-field's Gerstner wave potential: a
// fullscreen fragment field where the value at p is a sum of radial sinusoids about
// one-or-more centers c_j — the Fourier ring expansion (the user's "3D-rendered-to-2D
// concentric-wave"; the same Fourier-series vocabulary the flow field's wave potential
// uses, so the suite carries ONE math language). It is a PURE fragment pass (no
// particles), the same shape-class as aurora.
//
// The math (real + cited):
//
//   f(p,t) = Σ_j Σ_i  A_i · sin( k_i·‖p − c_j‖_e − ω_i·t + φ_i )
//
//   where ‖·‖_e is the ELLIPSOIDAL norm sqrt((dx/a)² + (dy/b)²) with axis ratios (a,b)
//   so the rings are concentric ELLIPSES (the "3D-rendered-to-2D" depth implication — a
//   tilted disc reads as ellipses), and the multi-center sum produces ring INTERFERENCE
//   (moiré-like beats where two ring families cross — the elegant concentric-wave look).
//   k_i = 2π/λ_i is the radial wavenumber, ω_i = √(g·k_i) the dispersion frequency (the
//   SAME deep-water dispersion the flow field uses — Tessendorf, *Simulating Ocean
//   Water*, SIGGRAPH 2001; the suite's ONE dispersion law), φ_i a phase seed. A small M
//   (4-8 radial octaves of decreasing λ) gives the braided multi-scale ring structure;
//   the amplitudes follow the SAME Phillips-spectrum falloff A_i ∝ exp(−1/(k_i·L)²)/k_i²
//   so the field is energy-realistic, not flat-banded.
//
// `proof:concentric` clause 3 asserts the JS `sampleRingField()` and the WGSL `fs_main`
// transcription produce the same f(p,t) at a fixed sample set within fp tolerance (the
// uniform-alignment / transcription-drift trap closed by a round-trip, not a per-line
// edit loop — the dot-flow-field precedent).

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

/**
 * One radial ring component. `amplitude` A_i, `wavelength` λ_i (so k_i = 2π/λ_i), `phase`
 * φ_i. `ω_i = √(g·k_i)` is derived from the dispersion relation, not stored (the SAME
 * dispersion the flow field's Gerstner sum uses — the ONE suite dispersion law).
 */
export interface RingComponent {
    amplitude: number;
    wavelength: number;
    phase: number;
}

/** A ring origin in domain space [-1,1]² (multi-center → interference). */
export interface RingCenter {
    x: number;
    y: number;
    /** Per-center weight (a far center contributes a fainter ring family). */
    weight: number;
}

/** Deep-water gravity constant (normalized; scales the dispersion ω — shared with the flow field). */
export const RING_GRAVITY = 9.81;

/** Two-pi. */
const TAU = Math.PI * 2;

/**
 * The ellipsoidal radial distance ‖p − c‖_e = sqrt((dx/a)² + (dy/b)²). The axis ratio
 * (a,b) tilts the rings into ellipses (the 3D-tilt depth implication). The single radial
 * metric the WGSL shader transcribes.
 */
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
 * The radial-Fourier ring-interference value f(p,t) ∈ ℝ — the multi-center sum of radial
 * sinusoids. The SINGLE math source the WGSL `fs_main` + the GLSL fallback transcribe.
 * `speed` scales the dispersion ω (the ring-travel speed). Returns the un-normalized
 * field value (the shader maps it through the palette).
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
        const radius = ellipsoidalRadius(p, c, axisA, axisB);
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
 * Build the default 5-octave Phillips-spectrum radial ring ladder. Amplitudes follow
 * `A_i ∝ exp(−1/(k_i·L)²) / k_i²` (Tessendorf §4, the SAME falloff the flow field uses),
 * so the rings are energy-realistic. The decreasing wavelength gives the multi-scale
 * concentric structure (broad outer rings + fine inner interference).
 */
export function buildRingLadder(octaves = 5): RingComponent[] {
    const L = 1.4; // the largest ring scale (Phillips L)
    const out: RingComponent[] = [];
    let wavelength = 0.7;
    for (let i = 0; i < octaves; i++) {
        const k = TAU / wavelength;
        const phillips = Math.exp(-1 / (k * L) ** 2) / (k * k);
        out.push({
            amplitude: phillips * 0.9,
            wavelength,
            // a golden-ratio phase walk so the octaves do not beat into a standing pattern
            phase: (i * 1.618033) % TAU,
        });
        wavelength *= 0.62; // decreasing λ → increasing k (multi-scale)
    }
    return out;
}
