<script setup lang="ts">
// BA.W-DEMO-AFFORDANCES.1 — the ONE demo play-control register.
//
// The storybook's canonical play/replay affordance, alongside <StorySection> /
// <ShowcaseFrame>. Every demo motion-fire site reaches for THIS, never a
// hand-rolled control. It wraps a real <Button> (the content-width pill, the
// glass `default` register that POPs over the W-STAGE-staged backdrop now that
// W-DARK-MATERIAL's dark glass transmits) with the Lucide <Play>/<Pause> glyph
// as a LEADING icon — never the `▶` U+25B6 text glyph. The same Button contract
// owns both content-width and icon-only geometry.
//
// The `playing` register mirrors the dock transport idiom
// (dock/overview.vue: <Pause v-if="playing"/> / <Play v-else/>). Omitting `label`
// gives the icon-only register; passing it gives the leading-icon + text pill.
import { computed } from "vue";
import { Play, Pause } from "@lucide/vue";
import { Button, type ButtonEmphasis, type ButtonSize } from "@glass/components/button";

const props = withDefaults(
    defineProps<{
        /**
         * The trailing text label. Defaults to "Play". Pass an empty string for
         * the icon-only register (the compact transport case).
         */
        label?: string;
        /**
         * The playing register — Play↔Pause glyph swap (the dock transport idiom).
         * When provided the control reads as a toggle; the glyph reflects state.
         */
        playing?: boolean;
        /** The Button emphasis. Defaults to the ordinary command register. */
        emphasis?: ButtonEmphasis;
        /** The Button size rung. Defaults to `md`. */
        size?: ButtonSize;
        /** Disabled passthrough. */
        disabled?: boolean;
    }>(),
    {
        label: "Play",
        playing: undefined,
        emphasis: "secondary",
        size: "md",
    },
);

const emit = defineEmits<{ play: [] }>();

// Icon-only when the label is an explicit empty string.
const iconOnly = computed(() => props.label === "");
const accessibleLabel = computed(() =>
    props.playing === true ? "Pause" : iconOnly.value ? "Play" : undefined,
);

function onClick(): void {
    emit("play");
}
</script>

<template>
    <Button
        :emphasis="emphasis"
        :size="size"
        :icon-only="iconOnly"
        :disabled="disabled"
        :aria-label="accessibleLabel"
        :aria-pressed="playing === undefined ? undefined : playing"
        @click="onClick"
    >
        <Pause v-if="playing === true" />
        <Play v-else />
        <span v-if="!iconOnly">{{ label }}</span>
    </Button>
</template>
