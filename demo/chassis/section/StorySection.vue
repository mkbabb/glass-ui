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
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<StorySectionProps>(), {
    gap: "md",
    level: "subheading",
});

const gapClass = computed(() => {
    if (props.gap === "sm") return "gap-2";
    if (props.gap === "lg") return "gap-6";
    return "gap-3";
});

const headingClass = computed(() => {
    if (props.level === "title") return "text-title";
    if (props.level === "heading") return "text-heading";
    return "text-subheading";
});
</script>

<template>
    <section :class="cn('flex flex-col', gapClass, props.class)">
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
