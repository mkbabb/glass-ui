// Shared Dock constants. Composables and DI contexts import their motion values
// and labels from this single owner.

import { springPreset } from "../../composables/motion/spring/springPresets";

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
 * iOS-27 register.
 */
export const DOCK_MORPH_MAX_STRETCH = 1.14;

/** `Symbol()` label for the `DockContext` injection key (`dockContext.ts`). */
export const DOCK_CONTEXT_LABEL = "glass-ui:dock-context";

/** `Symbol()` label for the `DockCrossfadeContext` injection key (`dockCrossfadeContext.ts`). */
export const DOCK_LAYER_GROUP_LABEL = "glass-ui:dock-layer-group";

/** Intent dwell before a collapsed→hover expand commits. A chasing leave inside
 * this window cancels the expansion. */
export const HOVER_INTENT_MS = 60;

/* Morph-settle window for the click-integrity guard
 * (`useDockClickIntegrity`). After the dock flips collapsed→expanded (a tap or a
 * hover-approach click that initiated the expand), the layer swap shifts every
 * control's coordinates as the box morphs. A click that arrives within this window
 * AND lands on a DIFFERENT element than the one under the pointer at pointerdown is
 * the post-swap-coordinate hit (a Home link under a gear tap, Next under a gear
 * click) — it is swallowed. The window is the `--spring-dock` settle ENVELOPE; it is
 * a floor backstop only — the live `[data-morphing]` attribute is the primary
 * settle signal, this caps the window so a never-settling morph can't trap clicks
 * forever. */
export const MORPH_SETTLE_MS = 840;
