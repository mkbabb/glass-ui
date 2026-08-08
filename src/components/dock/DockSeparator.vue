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
 *   - row dock (horizontal, default) → a vertical 1px rule
 *   - column dock (vertical)         → a horizontal 1px rule
 *   - grid dock (`layout="grid"`)    → a full-row section break (grid-column: 1, -1)
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
 * `anchor` promotes this separator to THE HAIRLINE — the line ARCHAEOLOGY E29
 * records the owner asking for ≥2×: a hairline that sits INSIDE the horizontal or
 * vertical dock. It is the same primitive and
 * the same one `--dock-hairline` colour; what changes is the SPAN — the anchored
 * form stretches across the cross extent of its LAYOUT ROOT instead of floating at
 * `--dock-separator-height` with a gap either side. The layout root is a `.glass-dock`
 * or a `<DockLayerGroup>` on its own (both arms are in layer-group.css, and the group
 * is a root here exactly as it is for every other rule in that partial). With neither
 * ancestor there is no cross extent to span and the anchored form paints as the plain
 * divider — the same befitting-silent standalone render, stated rather than promised.
 *
 * [BK #72] Until this cut `anchor` stamped a marker attribute and a modifier class
 * for a slot that existed in no file, and both
 * markers were read by exactly zero selectors and zero code — a prop that did
 * nothing. It does something now. A dock takes at most one hairline (one line across
 * a dock is the point of it); nothing enforces that but nothing needs to.
 */
const props = withDefaults(
    defineProps<{
        /**
         * Promote this separator to the dock hairline: one 1px rule spanning the
         * cross extent of its layout root — a `.glass-dock` or a standalone
         * `<DockLayerGroup>` — in a row OR a column. Off by default: the plain
         * separator is the short group divider.
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
        :class="{ 'dock-hairline': anchor }"
        role="separator"
        :data-orientation="dataOrientation"
        :data-dock-hairline="anchor || undefined"
        :aria-orientation="ariaOrientation"
    />
</template>
