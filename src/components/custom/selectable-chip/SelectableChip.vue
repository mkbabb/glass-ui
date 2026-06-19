<script setup lang="ts">
/**
 * SelectableChip — the public face of the BC.W-ACCENT-TONE tonal-accent register.
 * A reka-`Toggle` selectable chip whose COLOUR identity comes from ONE `:tone` (a
 * complete `<color>`): the chip reads the `.accent-tone` register — a faint idle
 * FILL floored ≥3:1 (legible at rest, the load-bearing fourier ask), a bolder active
 * BAND + EDGE rim, and a contrast-safe INK label (auto-darkened/lightened by value.js
 * `safeAccentColor` so the text never drops below AA over the resolved band).
 *
 * Usage:
 *   <SelectableChip v-model="on" :tone="'var(--section-color-7)'">React</SelectableChip>
 *
 * The toggle state is the reka-ui Toggle `modelValue` contract — bind via `v-model`
 * (or `:model-value` / `@update:model-value`). For an exclusive picker, wire the chips
 * via direct refs (deliberately unopinionated about ToggleGroup — the ToggleChip
 * precedent).
 *
 * VALUE.JS-BEARING: this SFC STATICALLY imports `useAccentTone` (the contrast-safe-ink
 * composable, which reaches value.js `safeAccentColor`/`computeSafeAccent`), so the
 * chip chunk transitively reaches value.js — it ships on `/selectable-chip` ONLY, OFF
 * the value.js-free root barrel (the BorderProgress/EasingPicker SCC-trap precedent).
 */
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "../../../utils";
import { useAccentTone } from "../../../composables/color";
import { selectableChipVariants, type SelectableChipVariants } from "./selectableChipVariants";

const props = defineProps<ToggleProps & {
    /** The accent COLOUR identity — a complete `<color>` (e.g. `var(--section-color-7)`
     *  or a concrete `oklch(…)`). Defaults to `var(--primary)` via the register. The
     *  SEMANTIC choice is a prop; the strength MAGNITUDES are tokens (no over-prop). */
    tone?: string;
    /** The structural size rung. Default `md`. */
    size?: SelectableChipVariants["size"];
    class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<ToggleEmits>();

// The contrast-safe ink (the JS half) — { --tone, --accent-ink-resolved }. A
// `var(--…)` tone passes through (the CSS fallback ink carries it); a concrete
// colour resolves a value.js-floored ink.
const { toneStyle } = useAccentTone(() => props.tone ?? "var(--primary)");

const forwarded = useForwardPropsEmits(
    () => {
        const { class: _class, tone: _tone, size: _size, ...rest } = props;
        return rest;
    },
    emits,
);

const chipClass = computed(() =>
    cn(selectableChipVariants({ size: props.size }), props.class),
);
</script>

<template>
    <Toggle
        v-bind="forwarded"
        :class="chipClass"
        :style="toneStyle"
    >
        <slot />
    </Toggle>
</template>
