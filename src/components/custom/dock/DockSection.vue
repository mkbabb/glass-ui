<script setup lang="ts">
import { computed } from "vue";
import DockSeparator from "./DockSeparator.vue";
import type { DockSectionDescriptor } from "./constants";

/**
 * <DockSection> — BA.W-DOCK-SECTIONS. The declarative tripartite section-descriptor
 * chassis the R8-9 mandate names ("the docks COMPLETELY lack sections" + "abstract
 * this into a re-usable component for layering"). A consumer passes ONE
 * `sections: readonly DockSectionDescriptor[]` array and the dock body renders the
 * three-zone gestalt — a leading `rail-core` home/brand region, named `section`
 * groups demarcated by `<DockSeparator>`, and a trailing `nav` group — by COMPOSING
 * the existing `<DockSeparator>` (the divider seam) over the dock's already-in-flow
 * controls, NOT a parallel layer machine and NOT a re-mounted column-rail layer
 * group (the W-RAIL3 inflation source).
 *
 * THE NO-INFLATION CONTRACT (the spec's Scope item 2). The section model returns
 * WITHOUT the box-inflation that motivated W-RAIL3's deletion: `<DockSection>` GROUPS
 * the controls a consumer already places (via the per-kind slots) and adds only
 * `<DockSeparator>` seams between them. It does NOT mount a `<DockLayerGroup>` switcher
 * rail (the prior inflator that demanded column height). A section's contextual facets
 * (`descriptor.layers`) are surfaced to the consumer to feed the seam `<DockRail>` —
 * the facets ride the rail OUTSIDE the dock box, never re-inflate it.
 *
 * DESCRIPTOR-DRIVEN (the gate's S1 bite). The render is a `v-for` over `sections`,
 * the `kind` switching the zone — a 5-section dock renders from the array, never a
 * hardcoded three-element literal. Each descriptor's content is the consumer's slot
 * keyed by the descriptor `id` (so the consumer keeps authoring its real controls);
 * the chassis owns ONLY the zone grouping + the divider rhythm + the `data-kind`
 * marker the section.css recipe reads.
 *
 * The seam ANCHOR (direction (b)). The descriptor carrying `anchor: true` (or, by
 * convention, the boundary BEFORE the trailing `nav` group / the rail-core tail) marks
 * its leading `<DockSeparator anchor>` so the dock's `#rail` line co-locates with that
 * divider. The chassis stamps `anchor` on the separator that precedes the FIRST
 * post-rail-core / pre-nav boundary by default; a consumer overrides via the
 * `anchorId` prop.
 */
const props = withDefaults(
    defineProps<{
        /**
         * The declarative section descriptors. Rendered in order: `rail-core` leads,
         * `section` groups follow (each preceded by a `<DockSeparator>`), `nav` trails.
         */
        sections: readonly DockSectionDescriptor[];
        /**
         * Which descriptor's LEADING `<DockSeparator>` is the rail's anchor seam
         * (direction (b)). Defaults to the first `nav` descriptor (the user's "the nav
         * separator on the bottom dock"); on a dock with no `nav` the first boundary
         * after `rail-core` anchors. Pass an explicit `id` to override (the ℱ-home
         * separator on the sidebar is the `rail-core`'s trailing seam — pass its id).
         */
        anchorId?: string;
        /** Accessible label for the section group landmark. */
        ariaLabel?: string;
    }>(),
    { ariaLabel: "Dock sections" },
);

/* The resolved anchor descriptor id — the seam the `#rail` co-locates with. Default:
   the first `nav` descriptor (the nav-separator seam); fall back to the first
   non-rail-core descriptor (so a nav-less dock still anchors at a real boundary). */
const resolvedAnchorId = computed<string | undefined>(() => {
    if (props.anchorId) return props.anchorId;
    const nav = props.sections.find((s) => s.kind === "nav");
    if (nav) return nav.id;
    const firstNonCore = props.sections.find((s) => s.kind !== "rail-core");
    return firstNonCore?.id;
});

/* Whether a descriptor is preceded by a `<DockSeparator>`. The `rail-core` zone leads
   (no leading divider). Every subsequent zone is divider-demarcated — the tripartite
   grammar. The divider is the rail's ANCHOR when the descriptor it precedes is the
   resolved anchor id. */
function leadingSeparator(index: number): boolean {
    return index > 0;
}
function isAnchorSeparator(descriptor: DockSectionDescriptor): boolean {
    return descriptor.id === resolvedAnchorId.value;
}

/* The zone's CSS modifier. The `rail-core` kind maps to the `--core` class token (NOT
   `--rail-core`) so the dock-band "rail"-noun is NOT re-overloaded (AZ.W-DOCK-TAXONOMY
   de-overloaded it; the `data-kind="rail-core"` data-attr carries the spec vocabulary,
   the CSS class never says "rail"). */
function zoneClass(kind: DockSectionDescriptor["kind"]): string {
    return `dock-section-zone--${kind === "rail-core" ? "core" : kind}`;
}
</script>

<template>
    <div class="dock-section" role="group" :aria-label="ariaLabel">
        <template v-for="(section, index) in sections" :key="section.id">
            <!-- The divider seam between zones (the rail-core zone leads with none).
                 The seam preceding the resolved anchor descriptor is the rail's anchor
                 (direction (b) — the divider IS the rail's seat). -->
            <DockSeparator
                v-if="leadingSeparator(index)"
                :anchor="isAnchorSeparator(section)"
            />
            <!-- The grouped zone — the consumer authors its real controls into the
                 per-section slot keyed by the descriptor id; the chassis owns only the
                 grouping wrapper + the `data-kind` the recipe reads. -->
            <div
                class="dock-section-zone"
                :class="zoneClass(section.kind)"
                :data-kind="section.kind"
                :data-section-id="section.id"
                :aria-label="section.label || undefined"
            >
                <slot :name="section.id" :section="section" :kind="section.kind" />
            </div>
        </template>
    </div>
</template>
