<script setup lang="ts">
import { computed } from "vue";
import { useOptionalDockContext } from "./composables/dockContext";

/**
 * <DockSeparator> — AX.W45 D13-c / DK5.
 *
 * An orientation-aware divider that demarcates dock item GROUPS (transport |
 * navigation | settings) for affordance hierarchy. The raw `.dock-separator`
 * class was axis-blind — a fixed VERTICAL 1px hairline that paints a useless
 * 1px-wide sliver in a column (vertical) dock and a single cell-sliver in a grid
 * dock. This primitive bundles the orientation contract the bare class could not:
 * it reads the dock `orientation`/`layout` via `useOptionalDockContext()` and the
 * dock-root ancestor class (`.glass-dock.vertical` / `.layout-grid`) drives the
 * PERPENDICULAR paint (dock.css) —
 *   - row dock (horizontal, default) → a vertical 1px hairline
 *   - column dock (vertical / rail)  → a horizontal 1px rule (cross-extent)
 *   - grid dock (`layout="grid"`)     → a full-row section break (grid-column: 1 / -1)
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
 */
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
        role="separator"
        :data-orientation="dataOrientation"
        :aria-orientation="ariaOrientation"
    />
</template>
