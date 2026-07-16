<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";

interface StorySectionProps {
    /** Semantic section heading. */
    heading?: string;
    /** Optional compact category or state label; not a second heading. */
    label?: string;
    blurb?: string;
    gap?: "sm" | "md" | "lg";
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<StorySectionProps>(), {
    gap: "md",
});

const gapClass = computed(() => {
    if (props.gap === "sm") return "gap-2";
    if (props.gap === "lg") return "gap-6";
    return "gap-3";
});
</script>

<template>
    <section :class="cn('flex flex-col', gapClass, props.class)">
        <slot v-if="$slots.label" name="label" />
        <p v-else-if="label" class="section-label">{{ label }}</p>

        <slot v-if="$slots.heading" name="heading" />
        <h2 v-else-if="heading" class="text-subheading">{{ heading }}</h2>

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
