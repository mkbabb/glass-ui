<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";

interface StorySectionProps {
    /** Semantic section heading. */
    heading?: string;
    /**
     * The heading's TYPE rung — the section's place on the story type ladder
     * (F10). `subheading` (√φ, 20.4px) is the default body-section rung;
     * `heading` (φ, 25.9px) marks a lead/primary section a rung above the
     * default; `title` (φ^³ᐟ², 32.9px) is the page's dominant section. The
     * axis is the fix for the total flatness (every heading was pinned to
     * `text-subheading`) — hierarchy now reads FROM SIZE, and a page can
     * separate its lead section from its body sections by ≥1 rung. The `#heading`
     * slot still overrides wholesale for a bespoke heading.
     */
    level?: "title" | "heading" | "subheading";
    /** Optional compact category or state label; not a second heading. */
    label?: string;
    blurb?: string;
    gap?: "sm" | "md" | "lg";
    /**
     * The section's place in the cel field — the ONE new chassis API this layout
     * needs. `cel` (default) joins the self-packing run at `--measure-cel`; `full`
     * takes the whole row, which is what a table, a stage or a lead specimen wants.
     *
     * It is a `data-` attribute rather than a class because the rule that reads it
     * is a DESCENDANT selector on the article: `StoryBodyRenderer` renders its
     * sections under a `display: contents` wrapper, so the sections are grid ITEMS
     * without being grid CHILDREN.
     */
    span?: "cel" | "full";
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<StorySectionProps>(), {
    gap: "md",
    level: "subheading",
    span: "cel",
});

/* The rungs, not the Tailwind scale. `gap-6` (1.5rem) was off the `4·8·12·20·32`
   series entirely and, more to the point, never transposed: a section's internal
   rhythm stayed desktop-sized on a 390px phone while everything around it stepped
   down. */
const gapClass = computed(() => {
    if (props.gap === "sm") return "gap-(--sp-2)";
    if (props.gap === "lg") return "gap-(--sp-5)";
    return "gap-(--sp-3)";
});

const headingClass = computed(() => {
    if (props.level === "title") return "text-title";
    if (props.level === "heading") return "text-heading";
    return "text-subheading";
});
</script>

<template>
    <section
        :class="cn('story-section flex flex-col', gapClass, props.class)"
        :data-span="props.span"
    >
        <slot v-if="$slots.label" name="label" />
        <p v-else-if="label" class="section-label">{{ label }}</p>

        <slot v-if="$slots.heading" name="heading" />
        <h2 v-else-if="heading" :class="headingClass">{{ heading }}</h2>

        <p v-if="blurb" class="text-small text-muted-foreground max-w-prose">
            {{ blurb }}
        </p>

        <div
            v-if="$slots.default"
            :class="cn('story-section__body flex flex-col', gapClass)"
        >
            <slot />
        </div>
    </section>
</template>

<style scoped>
/* THE CONTAINER CONTRACT. A section receives its width from the cel field and
   re-keys its own internals against THAT, never against the viewport — which is
   the only way one arm can be correct both inside a 336px cel and at full span.
   The sliver hazard is bounded by construction: sections live in definite grid
   tracks, and a StorySection is never legal in a shrink-to-fit parent. */
.story-section {
    container: cel / inline-size;
    /* THE SLIVER FLOOR, and it is not defensive padding — it is measured. A size
       container carries `contain: inline-size`, which makes the element's inline
       size independent of its CONTENTS, so its min-content contribution is ZERO.
       In a grid track that is harmless (the track is definite). In a FLEX row it
       is fatal: `flex-shrink` finds a zero floor and collapses the section to 0px
       wide with its heading intact and unpaintable — measured at `/data/search`,
       `/data/virtual-section` and `/data/infinite-scroll`, where a section sits
       beside a control row. The floor is the cel measure itself, `min()`-guarded
       so it can still fall below a cel inside a phone-width column. One
       declaration in the chassis instead of a `flex-1` at each call site, because
       the hazard belongs to the container contract, not to the three pages that
       happened to find it. */
    min-inline-size: min(var(--measure-cel), 100%);
}
</style>
