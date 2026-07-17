<script setup lang="ts">
import { computed } from "vue";
import { useOptionalDockContext } from "./composables/dockContext";

/**
 * <DockSeparator>.
 *
 * An orientation-aware divider that demarcates dock item GROUPS (transport |
 * navigation | settings) for affordance hierarchy. The raw `.dock-separator`
 * class was axis-blind — a fixed VERTICAL 1px hairline that paints a useless
 * 1px-wide sliver in a column (vertical) dock and a single cell-sliver in a grid
 * dock. This primitive bundles the orientation contract the bare class could not:
 * it reads the dock `orientation`/`layout` via `useOptionalDockContext()` and the
 * dock-root ancestor class (`.glass-dock.vertical`, `.layout-grid`) drives the
 * PERPENDICULAR paint (dock.css) —
 *   - row dock (horizontal, default) → a vertical 1px hairline
 *   - column dock (vertical, rail)  → a horizontal 1px rule (cross-extent)
 *   - grid dock (`layout="grid"`)     → a full-row section break (grid-column: 1, -1)
 *
 * It is a thin oriented `<div>` (KISS); `data-orientation` is the explicit axis
 * marker (so the perpendicular paint resolves even when used inside a
 * `<DockLayerGroup>` that is not directly under a `.glass-dock.vertical`). It
 * renders outside a dock too (the optional context defaults to horizontal) — a
 * befitting-silent standalone render, not a violation.
 *
 * Decorative by role: `role="separator"` + `aria-orientation` give it a semantic
 * landmark without it being interactive (it has no four-state contract — a flex
 * gap rule, not a control).
 *
 * the `anchor` prop is the seam-locator (direction (b)): an
 * anchored separator stamps `data-rail-anchor`, which the enclosing `<GlassDock>`
 * reads to seat the `#rail` line AT this divider's measured offset (the divider IS
 * the rail's anchor seam — one primitive folds 's section-divider model and
 * 's anchor-at-the-divider). The exposed measurable seam offset is the painted
 * position of this element within the dock-frame; GlassDock's seam read consumes it.
 */
const props = withDefaults(
    defineProps<{
        /**
         * the seam-locator affordance (direction (b): the
         * separator IS the rail's anchor). When `anchor` is set the separator stamps a
         * `data-rail-anchor` marker so the enclosing `<GlassDock>` can read THIS
         * divider's measured offset within the dock-frame and seat the `#rail` line at
         * it (the divider and the rail unify into one primitive — the user's "where the
         * dividing line is"). NO geometry side-effect on the separator itself; it is the
         * SAME thin oriented hairline either way, just flagged as the rail's seam. A
         * dock with at most one anchored separator is the contract (the first marked
         * wins; the rail reads one seam offset).
         */
        anchor?: boolean;
    }>(),
    { anchor: false },
);

const dock = useOptionalDockContext();

const orientation = computed(() => dock?.orientation.value ?? "horizontal");
/* The separator's own AXIS is perpendicular to the dock's layout axis: in a
   horizontal (row) dock it is a vertical hairline; in a vertical (column) dock it
   is a horizontal rule. `data-orientation` names the dock's layout axis so the
   dock.css perpendicular paint keys off it. */
const dataOrientation = computed(() => orientation.value);
/* ARIA: a vertical-layout dock's separator divides a horizontal run of items
   visually but separates a VERTICAL stack — `aria-orientation` reflects the
   separator's own painted axis (perpendicular to the layout). */
const ariaOrientation = computed(() =>
    orientation.value === "vertical" ? "horizontal" : "vertical",
);
</script>

<template>
    <div
        class="dock-separator"
        :class="{ 'dock-separator--anchor': anchor }"
        role="separator"
        :data-orientation="dataOrientation"
        :data-rail-anchor="anchor || undefined"
        :aria-orientation="ariaOrientation"
    />
</template>
