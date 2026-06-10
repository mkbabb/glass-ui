// AY.W-COLOCATE — the dock feature-dir constants home. The module-scope magic
// constants the dock composables read live HERE (the feature-dir `constants.ts`
// convention) rather than being re-declared at the top of each composable. The
// DI context modules (`composables/*Context.ts`) import their `Symbol(label)`
// strings from here so a label is never re-typed at two call sites.

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
