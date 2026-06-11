// AY.W-COLOCATE — the dock feature-dir constants home. The module-scope magic
// constants the dock composables read live HERE (the feature-dir `constants.ts`
// convention) rather than being re-declared at the top of each composable. The
// DI context modules (`composables/*Context.ts`) import their `Symbol(label)`
// strings from here so a label is never re-typed at two call sites.

import type { Component } from "vue";

/**
 * AZ.W-RAIL3 — one `<DockRail>` chip descriptor: the visible facet the floating
 * carousel strip renders (id + label + glyph). A `<script setup>` SFC cannot
 * re-export a named type through the `export { default }` barrel, so the chip
 * descriptor lives here (the colocated types home) and the SFC imports it; the
 * barrel re-exports it for consumers typing their `items` array.
 */
export interface DockRailItem {
    /** The context id this chip selects (written to `v-model:context`). */
    id: string;
    /** The chip label. */
    label: string;
    /** The chip glyph (a `@lucide/vue` icon or any component). */
    icon?: Component;
}

/**
 * The ONE dock-morph spring authority — the iOS-26 interruptible-physics tuning the
 * dock's single `SpringProgress` orchestrator (`dockMorphContext.ts`) AND the
 * `useLayerTransition` engine both read. Co-located here so the `response`/`damping`
 * pair is defined ONCE rather than duplicated at the top of each composable (the two
 * prior copies were a DRY hazard — a re-tune had to touch both).
 */
export const DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 } as const;

/**
 * The CSS properties whose `transitionend` the dock-morph window watches to know a
 * resize-morph has settled (`useDockMorphWindow.ts`). A `transitionend` on any other
 * property is ignored.
 */
export const RESIZE_MORPH_PROPS = new Set(["width", "height", "padding", "transform"]);

/** `Symbol()` label for the `DockContext` injection key (`dockContext.ts`). */
export const DOCK_CONTEXT_LABEL = "glass-ui:dock-context";

/** `Symbol()` label for the `DockLayerGroupContext` injection key (`dockLayerContext.ts`). */
export const DOCK_LAYER_GROUP_LABEL = "glass-ui:dock-layer-group";

/** `Symbol()` label for the `DockMorphContext` injection key (`dockMorphContext.ts`). */
export const DOCK_MORPH_LABEL = "glass-ui:dock-morph-context";

/** AZ.W-DOCK-FLICKER — the hover-hysteresis tuning pair (useDockState).
 *  HOVER_INTENT_MS: the intent-dwell before a collapsed→hover expand commits
 *  (a sweeping-edge enter is canceled by the chasing leave inside this window).
 *  EDGE_BAND_PX: the morphing-edge-sweep recheck band — a mid-morph leave with
 *  the pointer still inside (within this band of the moving edge) is the box
 *  edge sweeping past the cursor, not a real exit. */
export const HOVER_INTENT_MS = 60;
export const EDGE_BAND_PX = 24;

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
export const MORPH_SETTLE_MS = 320;
