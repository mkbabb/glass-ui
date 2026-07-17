// writeVelocityWeight — the tiny consumer-side velocity-weight writer.
//
// The §2c BOLDEST move: a driver in active fast motion transiently RAISES its own
// `--motion-weight` toward 1, so the deformation grows the faster the surface
// travels and self-extinguishes back to rest as it settles. "Elements morph MORE
// the faster they move" becomes a measurable, universal, single-scalar law — not 29
// per-primitive tanh constants.
//
// The mechanism is compositor-only and engine-free: `useLiquidFlex` already computes
// the saturating velocity term `tanh(|ṫ|·k) ∈ [0,1]` (its `velStyle` emits it as
// `--flex-vel`, the primitive STAYS element-less). Each `--stretch` write-site that
// already has the morphing element in hand calls this helper to fold the velocity
// channel into a transient weight boost on THAT element:
//   `--motion-weight = 0.618 + 0.382 * flexVel`
// so a fast jump pushes weight to ~0.96, a slow nudge stays ~0.65, a settled travel
// returns to exactly 0.618 — self-extinguishing, volume-preserving. Because the cap
// is derived site-locally off `--motion-weight` (each consumer's getter reads the
// live weight off its own element), the transient boost deepens the squish AND (when
// the surface composes the cartoon register) the punch share AND the shadow travel —
// all from this one write.
//
// `--flex-vel` is registered `inherits: false` (property-regs.css §18) so the
// per-frame write invalidates exactly ONE element, never a subtree (the
// subtree-storm perf bite). The weight write rides the SAME element (driver-scoped, the local
// override the consumer's cap getter re-reads).
//
// Engine-FREE + vueuse-FREE (no `vue`, no `@mkbabb/keyframes.js`) — ships on the
// `/motion-core` surface.

/** The rest weight (1/φ ≈ 0.618) — the centroid of the iOS-27 register triangle. */
export const MOTION_WEIGHT_REST = 0.618;

/**
 * Fold the live velocity term into a transient `--motion-weight` boost on the
 * driving element, and mirror the term onto `--flex-vel` (the non-inheriting live
 * channel). Call it at an EXISTING `--stretch` write-site with the morphing element
 * + the saturating velocity term `useLiquidFlex` already computed.
 *
 * @param el       the driving element (the same element the cap getter reads weight off)
 * @param flexVel  the saturating velocity term `tanh(|ṫ|·k) ∈ [0,1]` (the `--flex-vel` value)
 */
export function writeVelocityWeight(
    el: HTMLElement | null | undefined,
    flexVel: number,
): void {
    if (!el) return;
    const v = flexVel < 0 ? 0 : flexVel > 1 ? 1 : flexVel;
    const weight = MOTION_WEIGHT_REST + (1 - MOTION_WEIGHT_REST) * v;
    el.style.setProperty("--flex-vel", v.toFixed(4));
    el.style.setProperty("--motion-weight", weight.toFixed(4));
}

/**
 * The SITE-LOCAL effective-cap derivation (the spike-corrected mechanism). Reads
 * BOTH the live `--motion-weight` AND the per-velocity boost off the consuming
 * element, scaling the EXISTING cap token toward 1.0 as weight→0 and toward its
 * shipped rest value at weight 0.618. NO `--*-stretch-k` coefficient cohort — the
 * cap token IS the single source, read directly with a `(weight/0.618)` factor:
 *
 *   `cap_eff = 1 + (cap_token − 1) · (weight + (1 − weight)·flexVel) / 0.618`
 *
 * so `cap_eff == cap_token` at rest weight 0.618 + zero velocity (the UNION fence,
 * feel byte-identical) AND `cap_eff == 1.0` at weight 0 (the PRM/observer fence).
 * The `(1 − weight)·flexVel` term lets a fast travel transiently deepen the cap
 * even before the weight write has propagated (the morph-more-on-move read).
 *
 * @param el        the consuming element (live `--motion-weight`/`--flex-vel`)
 * @param capToken  the resolved `--*-max-stretch` cap value (≥1; the shipped rest cap)
 * @returns the effective cap to hand `useLiquidFlex` (≥1)
 */
export function effectiveCap(
    el: HTMLElement | null | undefined,
    capToken: number,
): number {
    if (capToken <= 1) return capToken < 1 ? 1 : capToken;
    let weight = MOTION_WEIGHT_REST;
    let flexVel = 0;
    if (el) {
        const cs = getComputedStyle(el);
        const w = Number.parseFloat(cs.getPropertyValue("--motion-weight"));
        const fv = Number.parseFloat(cs.getPropertyValue("--flex-vel"));
        if (Number.isFinite(w)) weight = w < 0 ? 0 : w;
        if (Number.isFinite(fv)) flexVel = fv < 0 ? 0 : fv > 1 ? 1 : fv;
    }
    const blended = weight + (1 - weight) * flexVel;
    const cap = 1 + (capToken - 1) * (blended / MOTION_WEIGHT_REST);
    return cap < 1 ? 1 : cap;
}
