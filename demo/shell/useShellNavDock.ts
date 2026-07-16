/** Shared route-to-facet navigation for the desktop and mobile demo docks. */
import { computed } from "vue";
import type { Component, ComputedRef, WritableComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContextualDockLayers } from "./useContextualDockLayers";
import { pushRoute } from "../chassis/routeTransition";

export interface ShellFacetItem {
    id: string;
    label: string;
    icon?: Component;
}

export interface UseShellNavDockOptions {
    /**
     * Fired after a genuine user facet-chip activation navigates. The `SidebarDock`
     * passes `() => emit("navigate")` (a facet click inside the mobile off-canvas
     * Sheet host closes it); the persistent `BottomDock` omits it (a facet click just
     * changes route — nothing to close). Never fired on a v-model echo.
     */
    onNavigate?: () => void;
}

export interface UseShellNavDock {
    /** Route facets, omitted when no choice exists. */
    railItems: ComputedRef<ShellFacetItem[]>;
    /** The active-facet registry — the ONE writable computed both docks bind. */
    railContext: WritableComputedRef<string | undefined>;
}

export function useShellNavDock(
    options: UseShellNavDockOptions = {},
): UseShellNavDock {
    const route = useRoute();
    const router = useRouter();
    const { layers: contextLayers } = useContextualDockLayers(route);

    const railItems = computed<ShellFacetItem[]>(() =>
        contextLayers.value.length > 1
            ? contextLayers.value.map((l) => ({
                  id: l.id,
                  label: l.label,
                  icon: typeof l.icon === "string" ? undefined : l.icon,
              }))
            : [],
    );

    const activeStoryId = computed<string | undefined>(
        () => route.meta.storyId as string | undefined,
    );

    // The active facet — the one whose entries contain the current story (so the
    // carousel highlight tracks where you are). ONE registry: the rail writes the SAME
    // navigation state the category/story nav drives, no parallel store.
    const railContext = computed<string | undefined>({
        get: () => {
            const here = contextLayers.value.find((l) =>
                l.entries.some((e) => e.storyId === activeStoryId.value),
            );
            return (here ?? contextLayers.value[0])?.id;
        },
        set: (id) => {
            // Navigate only on a genuine user chip activation, never from a v-model
            // echo of the `get` fallback. The equality short-circuit IS the
            // user-activation discriminator: a real chip click on a facet writes an id
            // DIFFERENT from the one `get` already resolved (so it falls through and
            // navigates), while any echo re-writes the value `get` just returned
            // (id === railContext.value → short-circuit, no `router.push`). A chip
            // click on the already-active facet is a legitimate no-op (you are there).
            if (id === undefined || id === railContext.value) {
                return;
            }
            const facet = contextLayers.value.find((l) => l.id === id);
            const first = facet?.entries[0];
            const categoryId = route.meta.categoryId as string | undefined;
            if (first && categoryId) {
                void pushRoute(router, `/${categoryId}/${first.storyId}`);
                options.onNavigate?.();
            }
        },
    });

    return { railItems, railContext };
}
