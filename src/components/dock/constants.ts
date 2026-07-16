// AY.W-COLOCATE — the dock feature-dir constants home. The module-scope magic
// constants the dock composables read live HERE (the feature-dir `constants.ts`
// convention) rather than being re-declared at the top of each composable. The
// DI context modules (`composables/*Context.ts`) import their `Symbol(label)`
// strings from here so a label is never re-typed at two call sites.

import { springPreset } from "../../composables/motion/springPresets";

/**
 * The ONE dock-morph spring authority — the iOS-26 interruptible-physics tuning the
 * dock morph orchestrator and controlled face crossfade both read. Co-located here so
 * the `response`/`damping` pair is defined once.
 */
export const DOCK_SPRING = {
    response: springPreset("dock").response,
    dampingFraction: springPreset("dock").dampingFraction,
} as const;

/**
 * The shape-morph squish cap — mirrors `--dock-morph-max-stretch` (density.css). The
 * lifted iOS-27 register (BD.W-MOTION-WEIGHT C1·R3 drift fix: the prior 1.08 was stale).
 */
export const DOCK_MORPH_MAX_STRETCH = 1.14;

// BI.W-DOCK-RETIRES — the `SIRI_FORMS`/`SIRI_SQRT_PHI`/`siriFormOf` Siri-island form
// ladder is DEFINITION-ABSENT (the Siri capability retired decided-terminal; clean break,
// no alias — see the disposition register, retiredBy: BI.W-DOCK-RETIRES).

/** `Symbol()` label for the `DockContext` injection key (`dockContext.ts`). */
export const DOCK_CONTEXT_LABEL = "glass-ui:dock-context";

/** `Symbol()` label for the `DockCrossfadeContext` injection key (`dockCrossfadeContext.ts`). */
export const DOCK_LAYER_GROUP_LABEL = "glass-ui:dock-layer-group";

/** The intent-dwell before a collapsed→hover expand commits (a sweeping-edge enter is
 *  canceled by the chasing leave inside this window) — the calmer hover register KEPT
 *  by W-DOCK-SPINE. BI.W-DOCK-RETIRES deleted the `EDGE_BAND_PX` moving-edge-sweep
 *  recheck band (the ~120L hysteresis): post-SPINE the hit frame is a STATIONARY
 *  state-sized box, so a mid-morph leave never sweeps a moving edge past the cursor. */
export const HOVER_INTENT_MS = 60;

/* R5-TAP (R5-3) — the MORPH-SETTLE window for the click-integrity guard
 * (`useDockClickIntegrity`). After the dock flips collapsed→expanded (a tap or a
 * hover-approach click that initiated the expand), the layer swap shifts every
 * control's coordinates as the box morphs. A click that arrives within this window
 * AND lands on a DIFFERENT element than the one under the pointer at pointerdown is
 * the post-swap-coordinate hit (a Home link under a gear tap, Next under a gear
 * click) — it is swallowed. The window is the `--spring-dock` settle ENVELOPE; it is
 * a floor backstop only — the live `[data-morphing]` attribute is the primary
 * settle signal, this caps the window so a never-settling morph can't trap clicks
 * forever. Mirrors the slides interim 320ms guard (now retired by this root fix). */
export const MORPH_SETTLE_MS = 840;
