import type { SurfaceTier } from "./axes";

/** Private ladder resolver. Decoration paint remains attribute-driven. */
export function resolveSurfaceClass(tier: SurfaceTier, deep = false): string {
    return deep ? "glass-floating glass-deep" : `glass-${tier}`;
}
