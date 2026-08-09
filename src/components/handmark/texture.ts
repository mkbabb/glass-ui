/**
 * texture.ts — the L3 grain as ONE parameterized SVG <filter> (pure; SPEC §4.2).
 * ─────────────────────────────────────────────────────────────────────────────
 * `grainFilter(id, b, seed)` returns the markup for ONE static, seeded <filter>
 * driven entirely by the brush vector. The KISS invariant (the PEN-is-free law,
 * SPEC §12 acc-4):
 *
 *     grain <= 0 && grainScale <= 0  ⇒  returns ''  ⇒  NO filter emitted  ⇒  bare <path>.
 *
 * So pen/marker-lite get the cleanest vector edge at zero filter cost; pencil/
 * crayon get a real broken-edge filter. SAME code path, field delta only — never
 * an instrument `if`.
 *
 * The graph is the proven 5-stage pipeline from the `proto/_final` sandbox (it
 * supersets the bare SPEC §4.2 graph with a trailing re-break displacement —
 * `ds-crayon-handmark §4.4` keeps the proven one):
 *   1. feTurbulence (warp)      — low-freq fractal noise for edge wobble
 *   2. feDisplacementMap (wob)  — push the stroke edge by grainScale
 *   3. feTurbulence (grain)     — high-freq noise = paper tooth / wax grain
 *   4. feColorMatrix (grainA)   — threshold the grain into a hard alpha mask
 *   5. feComposite + feDisplace — knock paper-through holes (operator="in") + re-break
 *
 * CRITICAL (the Δ4 gate, `ds-crayon-handmark §3`): this filter is STATIC + SEEDED.
 * It rasters ONCE per (mount, resize, scheme flip) and is cached. The draw-on is a
 * `clip-path: inset()` wipe that mutates only the clip — it NEVER animates
 * `stroke-dashoffset` under the filter (which would re-raster the graph per frame).
 * Boil does NOT ship on this register (`ds-crayon-handmark §5.3`).
 *
 * `id` MUST be per-instance (the component's `useId()`) so two marks never collide
 * their <filter> namespaces — the house per-instance SVG-namespace idiom.
 *
 * The grain sub-seed is derived (`seed ^ 0x85eb`) per SPEC §7, so one top seed
 * re-rolls the grain coherently with the centerline wobble.
 */
import type { Brush } from "./brush";

/** @returns SVG <filter> markup, or '' when the brush is clean ink (pen). */
export function grainFilter(id: string, b: Brush, seed: number): string {
    if (b.grain <= 0 && b.grainScale <= 0) return ""; // clean ink → no filter at all

    // Derived grain sub-seed (SPEC §7), clamped to the feTurbulence integer seed.
    const s = (seed ^ 0x85eb) & 0xffff;
    const lo = (0.55 - b.grain * 0.42).toFixed(3);
    const op = b.grain > 0 ? "in" : "over"; // grain>0 punches holes THROUGH the body
    return `
  <filter id="${id}" x="-40%" y="-60%" width="180%" height="220%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${(0.012 * b.roughness).toFixed(4)}" numOctaves="2" seed="${s}" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="${(b.grainScale * 1.4).toFixed(2)}" xChannelSelector="R" yChannelSelector="G" result="wob"/>
    <feTurbulence type="fractalNoise" baseFrequency="${b.grainFreq}" numOctaves="${b.octaves}" seed="${s + 17}" result="grain"/>
    <feColorMatrix in="grain" type="matrix" result="grainA"
      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${(6 + b.grain * 10).toFixed(2)} ${lo}"/>
    <feComposite in="wob" in2="grainA" operator="${op}" result="grained"/>
    <feDisplacementMap in="grained" in2="grain" scale="${(b.grainScale * 2.0).toFixed(2)}" xChannelSelector="R" yChannelSelector="G"/>
  </filter>`;
}

/** Does this brush emit a grain filter? (the pen-is-free predicate). */
export function hasGrain(b: Brush): boolean {
    return b.grain > 0 || b.grainScale > 0;
}
