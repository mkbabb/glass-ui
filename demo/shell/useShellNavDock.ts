/**
 * useShellNavDock — the shared shell-dock facet-rail loop + morph-button wiring
 * (BG.W-SHELL-DOCK-DRY).
 *
 * The two demo shell docks — the desktop `SidebarDock.vue` (vertical category rail)
 * and the mobile-primary `BottomDock.vue` (horizontal story bar) — byte-DUPLICATED a
 * cohesive block of navigation logic: the route→facet resolver wire, the `railItems`
 * map, the SHELL-HOLD `railContext` writable computed (the equality short-circuit that
 * navigates ONLY on a genuine user chip activation, never a v-model echo), the
 * arrow-roving `onFacetKeydown`, and the `glass-ui-demo:toggle-dock-morph` window-event
 * dispatch. This composable factors that ONCE over the two thin SFCs — the DRY.
 *
 * THE FENCE (SHELL-DOCK-DRY re-scope): the desktop↔mobile SWAP is a pure CSS media
 * query (`dock-nav.css` `@media (max-width: 767px)`), a SEPARATE axis from the
 * user-driven V↔H dock morph. This composable stays ⟂ to it — it owns NO breakpoint /
 * orientation / matchMedia logic, so the morph state can never collide with the 768px
 * responsive swap. The facet keydown is axis-AGNOSTIC by construction (ArrowRight OR
 * ArrowDown → next; ArrowLeft OR ArrowUp → prev), so the ONE handler serves both the
 * vertical and the horizontal rail (the tablist's `aria-orientation` carries the axis
 * semantics). The mobile off-canvas Sheet trigger + each dock's OWN section descriptors
 * + the per-dock category-nav loop stay LOCAL to the SFCs.
 */
import { computed } from "vue";
import type { ComputedRef, WritableComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { DockStackItem } from "@glass/components/custom/dock";
import { useContextualDockLayers } from "../composables/useContextualDockLayers";

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
    /** The route facets as `<DockStack mode="facets">` items (empty when ≤1 facet). */
    railItems: ComputedRef<DockStackItem[]>;
    /** The active-facet registry — the ONE writable computed both docks bind. */
    railContext: WritableComputedRef<string | undefined>;
    /** Arrow-key roving across the facet tablist (axis-agnostic; Home/End jump). */
    onFacetKeydown: (e: KeyboardEvent, index: number) => void;
    /** Dispatch the in-situ V↔H dock-morph window event (AppShell owns the driver). */
    openDockMorph: () => void;
}

export function useShellNavDock(
    options: UseShellNavDockOptions = {},
): UseShellNavDock {
    const route = useRoute();
    const router = useRouter();
    const { layers: contextLayers } = useContextualDockLayers(route);

    // AZ.W-RAIL3 — the chips ARE the route facets. The strip renders only when the
    // section carries >1 facet (a single-facet section shows the bare controls, no
    // clutter). Each chip carries its per-facet accent hue (the `mode="facets"`
    // carousel's `--glass-accent` rim; a `--section-color-N` library identity).
    const railItems = computed<DockStackItem[]>(() =>
        contextLayers.value.length > 1
            ? contextLayers.value.map((l) => ({
                  id: l.id,
                  label: l.label,
                  icon: typeof l.icon === "string" ? undefined : l.icon,
                  accent: l.accent,
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
            // BA.W-SHELL-HOLD (FD-FS-4) — the page must HOLD. The `set` navigates ONLY
            // on a genuine user chip activation, NEVER from a non-interactive v-model
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
                void router.push(`/${categoryId}/${first.storyId}`);
                options.onNavigate?.();
            }
        },
    });

    // W-NAV-DOCK-FIX F8 — arrow-key roving across the facet tablist (the active chip is
    // the only tab-stop, arrows move + activate). Axis-AGNOSTIC: the OR pairs serve BOTH
    // the vertical SidebarDock rail AND the horizontal BottomDock rail from ONE handler
    // (the tablist's `aria-orientation` carries the axis semantics). Home/End jump.
    function onFacetKeydown(e: KeyboardEvent, index: number): void {
        const items = railItems.value;
        if (items.length === 0) return;
        let next = -1;
        if (e.key === "ArrowRight" || e.key === "ArrowDown")
            next = (index + 1) % items.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
            next = (index - 1 + items.length) % items.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = items.length - 1;
        else return;
        e.preventDefault();
        railContext.value = items[next]?.id;
    }

    // BA.W-DOCK-MORPH-INSITU — the in-situ V↔H orientation-morph trigger. Dispatches
    // the ONE `glass-ui-demo:toggle-dock-morph` window event both shell docks fire
    // (AppShell hosts the state + the `useDockOrientationMorph` driver — the shell is
    // the driver's binary consumer #2). ONE event path, no parallel open machinery.
    function openDockMorph(): void {
        window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph"));
    }

    return { railItems, railContext, onFacetKeydown, openDockMorph };
}
