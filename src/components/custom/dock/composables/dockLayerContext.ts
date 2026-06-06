import type { Component, Ref } from "vue";
import { createStrictContext } from "../../../../composables/context";

/**
 * DockLayerGroup context — DI surface for `<DockLayer>` children registering
 * with their parent `<DockLayerGroup>` for the switcher rail + crossfade
 * coordination.
 *
 * O.W2 Lane A — canonical typed-key + helper-pair DI shape per invariant
 * 25. Replaces the prior raw `provide("dockLayerGroup", {...})` + duplicated
 * inline interface in `DockLayer.vue`. The context is distinct from
 * `DockContext` (a `<DockLayerGroup>` doesn't have to live inside a
 * `<GlassDock>`) so it gets its own module-local key.
 */
export interface DockLayerDescriptor {
    id: string;
    label?: string;
    icon?: Component | string;
}

export interface DockLayerGroupContext {
    register(desc: DockLayerDescriptor): void;
    unregister(id: string): void;
    /**
     * AU.W8b.6 — group-orchestrated layer state, exposed READ-ONLY. The
     * `<DockLayerGroup>` (via `useLayerTransition`) owns the writable refs and
     * provides `readonly()` projections; a `<DockLayer>` child can read but
     * never write this state. A child `currentLayerId.value = …` is a compile
     * error (see `__tests__/dockLayerContext.readonly.test-d.ts`).
     */
    currentLayerId: Readonly<Ref<string>>;
    leavingLayerId: Readonly<Ref<string | null>>;
}

// Strict + optional (reserved) over ONE key (AV.W14): `<DockLayerGroup>`
// provides; `<DockLayer>` children use strict.
const ctx = createStrictContext<DockLayerGroupContext>(
    "glass-ui:dock-layer-group",
    "[glass-ui:dock] <DockLayer> must be used inside <DockLayerGroup>",
);

export const DOCK_LAYER_GROUP_KEY = ctx.KEY;

export function provideDockLayerGroupContext(context: DockLayerGroupContext): void {
    ctx.provide(context);
}

/** Strict — throws when used outside `<DockLayerGroup>`. */
export const useDockLayerGroupContext = ctx.use;

/** Befitting silent default; reserved for future consumers. */
export const useOptionalDockLayerGroupContext = ctx.useOptional;
