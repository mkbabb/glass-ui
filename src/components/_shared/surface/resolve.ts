import type { SurfaceTier } from "../axes";

/**
 * The ONE surface resolver — a plain function, not a composable.
 *
 * Seven call sites across six files ask this question, and six of them pass the
 * literal `"floating"` wanting nothing but the class string. A `useSurface()`
 * returning `{ class, attrs }` would ship an `attrs` member with exactly ONE
 * consumer — sub-`≥2-sites` machinery for a solved problem. The portaled roots'
 * attribute contract is `overlayContentAttrs()`, which COMPOSES this.
 *
 * `deep` is ORTHOGONAL: it thickens the resolved tier, it never jumps to
 * another one. The predecessor returned the literal `"glass-floating
 * glass-deep"` for every deep surface, so `<Surface tier="overlay" deep>`
 * silently became floating and two of the three shipped depth grades were
 * unreachable through the public door.
 */
export function surfaceClass(tier: SurfaceTier, deep = false): string {
    return deep ? `glass-${tier} glass-deep` : `glass-${tier}`;
}
