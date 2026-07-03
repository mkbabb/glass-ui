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
import type { CSSProperties, HTMLAttributes } from "vue";
import { computed } from "vue";
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "../../../utils";
import { useAccentTone } from "../../../composables/color";
import { chipVariants, type ChipVariants } from "./chipVariants";

const props = defineProps<ToggleProps & {
    /** The accent COLOUR identity — a complete `<color>` (e.g. `var(--section-color-7)`
     *  or a concrete `oklch(…)`). Defaults to `var(--primary)` via the register. The
     *  SEMANTIC choice is a prop; the strength MAGNITUDES are tokens (no over-prop). */
    tone?: string;
    /** The structural size rung. Default `md`. */
    size?: ChipVariants["size"];
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
    cn(chipVariants({ size: props.size }), props.class),
);

// The chip is the ≥3rd `--glass-fill-tint` consumer — the translucent
// `.glass-capsule` body tints toward the SAME `:tone` hue so the lens reads as
// COLORED warm glass (the `.glass-chip` recipe applies the axis; a default tone
// keeps the no-op warm floor). The strength is a calm stop (body ink stays
// legible); `--glass-fill-tint` rides on top of `toneStyle`'s `--tone`/ink.
const chipStyle = computed<CSSProperties>(() => ({
    ...toneStyle.value,
    "--glass-fill-tint": props.tone ?? "var(--primary)",
    "--glass-fill-strength": "var(--chip-glass-strength, 12%)",
}) as CSSProperties);
</script>

<template>
    <Toggle
        v-bind="forwarded"
        :class="chipClass"
        :style="chipStyle"
    >
        <slot />
    </Toggle>
</template>
