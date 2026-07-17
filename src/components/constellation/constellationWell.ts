// The gravity-well force is isolated from constellationInteraction.ts as one cohesive
// sub-concern: the held-pointer inverse-square
// pull + the asymmetric |v|→speed cool-back (the field-heats-while-held / cools-on-release
// invariant). `constellationInteraction.ts` re-exports `stepWell` so the field engine + the package barrel
// reach it through that module unchanged. The token read (`readInteractionConfig`) stays in
// the interaction module (it spans warp+well+wander); this leaf owns only the per-frame force.

import type { ConstellationField } from "./constellationField";

// ── Gravity-well force ───────────────────────────────────────────────────────
/** Below this strength the well force is sub-perceptual — skip the O(count) pass. */
const WELL_EPS = 1e-3;
/**
 * The `|v|→speed` ease-back rate (per second), ASYMMETRIC by well phase (the
 * shape-(ii) cool-down). While the well is HELD it is GENTLE
 * ({@link WELL_COOL_HELD}/s) so the inverse-square force out-paces it and the field
 * HEATS to a bounded equilibrium (the perturb the π gate reads); once RELEASED it is
 * BRISK ({@link WELL_COOL_RELEASED}/s) so the lattice re-settles to within a few % of
 * `speed` inside the ≥30-frame window (the field-cools invariant). The asymmetry is
 * what lets BOTH invariants hold at once — a single mid rate either masks the perturb
 * (too brisk) or never cools (too gentle). Preferred over the steer's hard
 * `|v|=speed` renorm because the well MUST be able to heat the field while held.
 *
 * The gentle held rate lets the force create a visible perturb across refresh rates;
 * the brisk released rate returns the field to its configured drift without a tail.
 */
const WELL_COOL_HELD = 0.6;
const WELL_COOL_RELEASED = 11.0;
/**
 * The strength-ramp rate (per second) is ASYMMETRIC by phase, MIRRORING the cool
 * asymmetry. The ARM rate is `cfg.ramp` (the token — a gentle ≈0.25s ease so the
 * pull blooms in, not snaps). The RELEASE rate is a brisk {@link WELL_RELEASE_RAMP}
 * floor (independent of `cfg.ramp`) so on release the pull DROPS below
 * {@link WELL_EPS} within a handful of frames — the inverse-square force STOPS
 * injecting velocity, and the brisk {@link WELL_COOL_RELEASED} `|v|→speed` ease
 * then renorms the lattice to within a few % of `speed` inside the ≥30-frame
 * window (the field-cools invariant). A symmetric `cfg.ramp` release decays the
 * pull too slowly — the force keeps heating the field past the 30-frame sample,
 * so the field reads HOT at any canvas where the held equilibrium |v| sits above
 * the tolerance (the live-vs-unit `k`-scale divergence the π gate caught).
 *
 * THE 22.0 DERIVATION (F8.2 F1.3 — so the next tuner does not treat it as free):
 * `strength` decays as `(1 − min(rate/60, 1))^n` per frame at 60 fps. At
 * `rate = 22/s` the per-frame factor is `(1 − 22/60) ≈ 0.633`, so `strength`
 * falls below {@link WELL_EPS} (1e-3) in `n ≈ ln(1e-3)/ln(0.633) ≈ 15` frames —
 * about HALF the ≥30-frame cool sample. That leaves the remaining ~15+ frames for
 * the {@link WELL_COOL_RELEASED} `|v|→speed` ease to renorm the lattice inside the
 * window. A slower rate (e.g. the 4/s ARM token → ~110 frames to clear EPS) keeps
 * the force injecting velocity well past the sample → the field reads HOT. This is
 * why the release ramp is a FIXED const (F8.2), NOT the consumer `cfg.ramp` token:
 * it guards the cool invariant, so a consumer must NOT be able to slow it past the
 * §6-clause-2 cool gate.
 */
const WELL_RELEASE_RAMP = 22.0;

/** dt clamp (s) — the SAME park-resume guard the warp uses (constellationInteraction's
 *  WARP_DT_CLAMP); a clamped dt resolves the park-mid-well teleport for free. */
const WELL_DT_CLAMP = 0.05;

/**
 * Advance the gravity-well one `dt`. A transient held-pointer force
 * composed inside `stepField` (NO new rAF): ease `well.strength` toward
 * `well.target` (1 held / 0 released) at `cfg.ramp`/s; while active, add an
 * inverse-square pull toward the held point onto each node within `cfg.reach`
 * (the `max(d, soften)` no-singularity floor + the `cfg.maxSpeed` no-slingshot
 * clamp); ALWAYS ease every node's |v| back toward `speed` (the field-cools
 * invariant — so a released well re-settles). No-ops (entirely skipped) when
 * `field.well` is undefined → the default render is the plain field.
 *
 * `dt` is clamped to {@link WELL_DT_CLAMP} (the same park-resume guard the warp
 * uses) so a tab-throttle gap cannot slingshot the field in one giant step.
 */
export function stepWell(
    field: ConstellationField,
    k: number,
    speed: number,
    dt: number,
): void {
    const well = field.well;
    if (!well || !(dt > 0)) return;
    const h = Math.min(dt, WELL_DT_CLAMP);
    const cfg = well.cfg;
    // Ease the pull strength toward its target (1 held, 0 released) — a bounded
    // approach so a long frame cannot overshoot the [0,1] ramp. The ARM rate is
    // the `cfg.ramp` token (gentle bloom); the RELEASE rate is the brisk
    // WELL_RELEASE_RAMP floor so the pull drops below WELL_EPS in a handful of
    // frames and the force STOPS injecting velocity (the cool-down precondition).
    const rampRate = well.target > 0 ? cfg.ramp : WELL_RELEASE_RAMP;
    const ramp = Math.min(rampRate * h, 1);
    well.strength += (well.target - well.strength) * ramp;
    if (well.strength < WELL_EPS) well.strength = well.target <= 0 ? 0 : well.strength;

    const { nodes } = field;
    const reach = cfg.reach * k;
    const reach2 = reach * reach;
    const cap = cfg.maxSpeed * k;
    // The cool-back fraction this frame (the |v|→speed ease toward `speed`),
    // ASYMMETRIC: gentle while held (`target > 0` → the field heats), brisk once
    // released (`target ≤ 0` → the field cools fast). See the WELL_COOL_* doc.
    const coolRate = well.target > 0 ? WELL_COOL_HELD : WELL_COOL_RELEASED;
    const cool = Math.min(coolRate * h, 1);
    const active = well.strength > WELL_EPS && well.x >= 0;
    // The pinned node is exempt from the well pull and the |v|→speed
    // ease-back — it holds its anchor (the gentle `pinnedDrift` is the only mover).
    const pinned = field.pinnedIndex;
    for (let i = 0; i < nodes.length; i++) {
        if (i === pinned) continue;
        const p = nodes[i];
        if (active) {
            const dx = well.x - p.x;
            const dy = well.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 <= reach2) {
                const d = Math.max(Math.sqrt(d2), cfg.soften); // singularity floor
                const a = (cfg.gain * well.strength) / (d * d); // inverse-square pull
                let nvx = p.vx + (dx / d) * a * h;
                let nvy = p.vy + (dy / d) * a * h;
                const nsp = Math.hypot(nvx, nvy);
                if (nsp > cap) {
                    nvx = (nvx / nsp) * cap; // no-slingshot clamp
                    nvy = (nvy / nsp) * cap;
                }
                p.vx = nvx;
                p.vy = nvy;
            }
        }
        // |v|→speed ease-back (the field-cools invariant). Pulls each node's speed
        // a `cool` fraction toward `speed` every frame — while the well is held the
        // force out-paces it (the field heats), once released it wins (the field
        // cools back to `speed`). A node at rest (|v|≈0) is nudged up to `speed`.
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 1e-9) {
            const eased = sp + (speed - sp) * cool;
            const scale = eased / sp;
            p.vx *= scale;
            p.vy *= scale;
        }
    }
}
