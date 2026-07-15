/**
 * noise.ts — the φ-incommensurate fractal value-noise BOIL VOICE (pure, PENCIL-BOIL-FREE).
 * ─────────────────────────────────────────────────────────────────────────────
 * The natural-underline morphology (the masthead `boil` voice) is a 1-D fractal
 * value-noise DISPLACEMENT off the HOUSE `mulberry32`, NOT a seeded sinusoid (the
 * prior body self-correlated into a near-period — a spell-check squiggle). It sums
 * octaves at φ-stepped frequencies (mutually irrational → the sum NEVER closes into
 * a period); each octave's amplitude decays by 1/φ. The result is a hump-to-hump-
 * IRREGULAR hand line whose inter-extremum spacing-CV is the honest teeth.
 *
 * WHY ITS OWN LEAF (BG.W-HANDMARK-PERFECT): geometry.ts imports `@mkbabb/pencil-boil`
 * at module top, and node's type-stripping refuses to strip a TS module under
 * node_modules — so a device-free gate cannot import geometry.ts to sample the REAL
 * emitted point-set. This leaf imports ONLY the house prng + the marking constants
 * (both pure, strippable), so `proof:handmark-audit` imports the REAL
 * `naturalUnderlinePoints` and measures its spacing-CV over 400 seeds (never a
 * symbol-presence regex — the W-GATE-TRUTH-AUDIT discipline). geometry.ts re-exports
 * it, so the /handmark barrel surface is unchanged.
 *
 * THE SEED RECONCILE (BA.W-HANDMARK [S2]): the wobble seeds from the HOUSE prng leaf
 * (src/composables/glass/procedural/prng.ts mulberry32 — the AV.W14 single-source), ZERO pencil-boil
 * `mulberry32` import.
 */
import { mulberry32 } from "../../../composables/glass/procedural/prng";
import {
    NOISE_AMP_FRAC,
    NOISE_EDGE,
    NOISE_F0,
    NOISE_OCTAVES,
    NOISE_PHI,
} from "./constants";

/** smootherstep (6t⁵−15t⁴+10t³) — the C² fairing for the value-noise lerp. */
export function smootherstep(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * The boil voice — φ-incommensurate fractal value-noise (the masthead morphology):
 *
 *   disp(t) = Σ_{k=0..OCT-1} aₖ · vnoiseₖ(t·fₖ + φₖ)   normalised by Σaₖ
 *     fₖ = NOISE_F0 · φ^k   (φ mutually-irrational steps → the sum NEVER closes
 *                            into a period — the non-periodicity mechanism)
 *     aₖ = (1/φ)^k          (per-octave decay)
 *     φₖ = seeded per-octave phase (house mulberry32)
 *     vnoiseₖ = seeded lattice value-noise, smootherstep-faired
 *
 * The four atlas axes:
 *   - amplitude SCALES with the rendered span (`(x2−x1) × NOISE_AMP_FRAC × ampScale`),
 *     not a viewBox-stretched constant (a long word and a short word wobble in
 *     proportion); `ampScale` is the BG.W-HANDMARK-PERFECT excursion knob (default 1
 *     ⇒ byte-identical; the SFC derives it from the brush `wobble` scalar, decoupling
 *     excursion from stroke `weight`);
 *   - the hump-to-hump spacing is IRREGULAR (the φ-incommensurate octave sum — the
 *     honest non-periodicity teeth, spacing-CV ~0.41 at the paint count vs the prior
 *     sinusoid's ~0.14, over 400 seeds);
 *   - the non-uniform body gives the pf hull a pressure-taper-friendly point stream;
 *   - the seed is the HOUSE mulberry32.
 *
 * ENDPOINT anchor (NOT a body-wide envelope): a narrow cosine taper at the very ends
 * only (`NOISE_EDGE`), so the ends settle to baseline (no draw-on pop) while the BODY
 * amplitude stays irregular hump-to-hump. FILTER-FREE: the wander is in the control
 * points + the hull width, never a feTurbulence.
 */
export function naturalUnderlinePoints(
    x1: number,
    y: number,
    x2: number,
    seed: number,
    segments: number,
    ampScale = 1,
): [number, number][] {
    const span = x2 - x1;
    if (span <= 0) return [[x1, y], [x2, y]];
    const s = seed >>> 0;
    // SCALE-relative amplitude × the excursion knob (default 1 ⇒ byte-identical).
    const amp = span * NOISE_AMP_FRAC * ampScale;

    // Per-octave seeded phase (one rng stream, order-fixed for determinism) + a
    // per-octave seeded value-noise lattice (a sub-stream so octaves are independent).
    const phaseRng = mulberry32(s);
    let ampSum = 0;
    const octaves = Array.from({ length: NOISE_OCTAVES }, (_, k) => {
        const phase = phaseRng() * 10;
        const freq = NOISE_F0 * Math.pow(NOISE_PHI, k);
        const weight = Math.pow(1 / NOISE_PHI, k);
        ampSum += weight;
        const subRng = mulberry32((s ^ Math.imul(0x9e3779b9, k + 1)) >>> 0);
        const lattice = new Map<number, number>();
        const node = (idx: number): number => {
            let v = lattice.get(idx);
            if (v === undefined) {
                v = subRng();
                lattice.set(idx, v);
            }
            return v;
        };
        const vnoise = (x: number): number => {
            const i0 = Math.floor(x);
            const f = x - i0;
            const a = node(i0);
            const b = node(i0 + 1);
            return a + (b - a) * smootherstep(f); // [0,1)
        };
        return { phase, freq, weight, vnoise };
    });

    const n = Math.max(6, segments);
    const pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = x1 + span * t;
        let disp = 0;
        for (const o of octaves) {
            // centre the [0,1) lattice value to [-1,1] so the body straddles baseline.
            disp += o.weight * (o.vnoise(t * o.freq + o.phase) * 2 - 1);
        }
        disp /= ampSum;
        // endpoint-only cosine taper — the ends settle to baseline; the BODY is irregular.
        let edge = 1;
        if (t < NOISE_EDGE) {
            edge = 0.5 - 0.5 * Math.cos((t / NOISE_EDGE) * Math.PI);
        } else if (t > 1 - NOISE_EDGE) {
            edge = 0.5 - 0.5 * Math.cos(((1 - t) / NOISE_EDGE) * Math.PI);
        }
        pts.push([x, y + amp * disp * edge]);
    }
    return pts;
}
