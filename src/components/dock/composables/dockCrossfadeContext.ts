import type { Component, Ref } from "vue";
import { createStrictContext } from "../../../composables/context";
import { DOCK_LAYER_GROUP_LABEL } from "../constants";

/**
 * the crossfade face-registration context.
 *
 * `<DockCrossfade:active>` provides this; each face host (`<DockLayer>`) registers
 * its id + label + icon + host element on mount. The crossfade slot owns ONE face
 * registry.
 * A switcher rail (where one exists — `<DockLayerGroup>`) reads `faces` for its chip
 * run; the controlled-no-rail 5-pane case (a consumer) consumes `<DockCrossfade>`
 * DIRECTLY and reads only `activeId`/`leavingId` (no rail, no selection engine).
 *
 * The context is DISTINCT from `DockContext` (a `<DockCrossfade>` need not live inside
 * a `<GlassDock>`) and from the plate collapse orchestrator — the
 * face crossfade is orthogonal to the box morph (the compound: a face-swap DURING a
 * simultaneous collapse rides two independent scalars — per-face `--dock-t` for the
 * opacity overlap, the inheriting `--dock-morph-t` for the plate clip). It keeps its
 * own module-local key (canonical typed-key DI).
 */
export interface DockFaceDescriptor {
    id: string;
    label?: string;
    icon?: Component | string;
}

export interface DockFaceRegistration extends DockFaceDescriptor {
    /**
     * The face host element. The crossfade slot writes the per-face `--dock-t`
     * opacity scalar here + measures its `scrollHeight` for the peak reserve.
     */
    el: HTMLElement;
}

export interface DockCrossfadeContext {
    /** Announce a face host (idempotent per id) — kicks a peak re-measure. */
    register(reg: DockFaceRegistration): void;
    /** Retract a face host on unmount — kicks a peak re-measure. */
    unregister(id: string): void;
    /**
     * The active face id (the one shown at rest). Exposed READ-ONLY: a `<DockLayer>`
     * child reads its active state but never writes the controlled `active` value
     * (the ONE registry lives on the caller's model).
     */
    activeId: Readonly<Ref<string>>;
    /** The face currently dissolving out, or `null`. READ-ONLY to faces. */
    leavingId: Readonly<Ref<string | null>>;
    /**
     * The registered face descriptors in registration order — the switcher rail's
     * chip source (a `<DockLayerGroup>` reads this; the controlled-no-rail case
     * ignores it).
     */
    faces: Readonly<Ref<DockFaceDescriptor[]>>;
}

// Strict and optional access share one key: `<DockCrossfade>` provides;
// `<DockLayer>` children use strict.
const ctx = createStrictContext<DockCrossfadeContext>(
    DOCK_LAYER_GROUP_LABEL,
    "[glass-ui:dock] <DockLayer> must be used inside <DockCrossfade> (or <DockLayerGroup>)",
);

export const { KEY: DOCK_CROSSFADE_KEY } = ctx;

export function provideDockCrossfadeContext(context: DockCrossfadeContext): void {
    ctx.provide(context);
}

/** Strict — throws when used outside `<DockCrossfade>`. */
export const useDockCrossfadeContext = ctx.use;

/** Befitting silent default; reserved for future consumers. */
export const useOptionalDockCrossfadeContext = ctx.useOptional;
