/**
 * useContextualDockLayers — the route→layer-set seam (AZ.W-DOCK-CONTEXT).
 *
 * Binds the dock's EXISTING layer registry (`DockLayerGroup` + `DockLayer` +
 * provide/inject) to the active route, so the demo shell docks display a DIFFERENT
 * `DockLayer` set per page-context. This is the thin, idiomatic route→layer map the
 * R3-14 redesign mandate names — NOT a new layer machinery (the registry already
 * exists; this layers a route-keyed lookup ON it).
 *
 * The lookup is GENERAL and route-INDEXED: it reads the active category off
 * `route.meta.categoryId` (the manifest category id the router stamps on every story
 * route) and indexes `CONTEXT_LAYER_MAP[categoryId]`. Because the binding is
 * `route → layers` keyed off the manifest's own category tree, adding a category's
 * contextual layers is a manifest row (in `dock-layer-contexts.ts`), and the swap is
 * deterministic — the SAME dock renders a DIFFERENT layer set purely because the
 * route changed.
 */
import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import {
    CONTEXT_LAYER_MAP,
    FALLBACK_CONTEXT_LAYER,
    type ContextLayer,
} from "./dock-layer-contexts";

export interface UseContextualDockLayersReturn {
    /** The active category id off the route (null when off any story route). */
    categoryId: ComputedRef<string | null>;
    /** The contextual DockLayer set for the active route-context. */
    layers: ComputedRef<ContextLayer[]>;
    /** The default-active layer id (the first of the contextual set). */
    activeLayerId: ComputedRef<string>;
}

/**
 * Resolve the contextual DockLayer set for the active route.
 *
 * @param route the active route (the caller passes `useRoute()`; tests can feed a
 *   plain `{ meta: { categoryId } }` — the seam reads `route.meta.categoryId` only,
 *   the GENERAL route-key, never a hardcoded per-route branch).
 */
export function useContextualDockLayers(
    route: Pick<RouteLocationNormalizedLoaded, "meta">,
): UseContextualDockLayersReturn {
    const categoryId = computed<string | null>(() => {
        const id = route.meta.categoryId as string | undefined;
        return id ?? null;
    });

    const layers = computed<ContextLayer[]>(() => {
        const id = categoryId.value;
        // The GENERAL route-indexed read — `route → layers` off the manifest
        // category key. A mapped category returns its facet set; an unmapped one
        // (or no category) falls back to the single generic section layer. NEVER a
        // hardcoded `if (route === A) … else if (B)` pair.
        const mapped = id ? CONTEXT_LAYER_MAP[id] : undefined;
        return mapped && mapped.length > 0 ? mapped : [FALLBACK_CONTEXT_LAYER];
    });

    const activeLayerId = computed<string>(
        () => layers.value[0]?.id ?? FALLBACK_CONTEXT_LAYER.id,
    );

    return { categoryId, layers, activeLayerId };
}
