<script setup lang="ts">
// StorySection — canonical "label + body" host across the storybook.
//
// The dominant idiom in `demo/stories/**` is:
//   <section class="flex flex-col gap-3">
//     <p class="section-label">{label}</p>
//     <p class="text-prose text-muted-foreground">{blurb}</p>
//     ... content ...
//   </section>
//
// 129 hosts ship the `flex flex-col gap-3` wrapper; 104 ship the
// section-label paragraph as their first child. The duplication collapses
// behind this SFC. Replaces the wrapper + label + (optional) blurb with
// a single declarative element.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../src/utils/cn";

interface StorySectionProps {
    /** Renders as `<p class="section-label">`. Optional — omit for label-less sections. */
    label?: string;
    /** Optional muted prose under the label, before the slot content. */
    blurb?: string;
    /** Gap between label, blurb, and slot content. */
    gap?: "sm" | "md" | "lg";
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<StorySectionProps>(), {
    gap: "md",
});

const gapClass = computed(() => {
    switch (props.gap) {
        case "sm":
            return "gap-2";
        case "lg":
            return "gap-6";
        case "md":
        default:
            return "gap-3";
    }
});
</script>

<template>
    <section :class="cn('flex flex-col', gapClass, props.class)">
        <slot v-if="$slots.label" name="label" />
        <p v-else-if="label" class="section-label">{{ label }}</p>
        <!-- The blurb is SUPPORTING demo chrome, not long-form prose — the
             `text-small` workhorse rung (W-SB-TYPE: bias the story chrome DOWN to
             the documented ladder; `text-prose` read WAY too large for a caption). -->
        <p v-if="blurb" class="text-small text-muted-foreground max-w-prose">
            {{ blurb }}
        </p>
        <slot />
    </section>
</template>
