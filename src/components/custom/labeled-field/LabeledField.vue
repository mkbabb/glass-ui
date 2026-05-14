<template>
    <div class="labeled-field">
        <IconTooltip v-if="tooltip" :text="tooltip">
            <label :class="cn('labeled-field-label', labelClass)">{{ label }}</label>
        </IconTooltip>
        <label v-else :class="cn('labeled-field-label', labelClass)">{{ label }}</label>
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { IconTooltip } from "../icon-tooltip";
import { cn } from "../../../utils";

/**
 * LabeledField — parent SFC for the labeled-field family (V.W3.T5 / A5 §5.5).
 *
 * Owns the IconTooltip + label layer that the four sibling primitives
 * (LabeledInput, LabeledSelect, LabeledSlider, LabeledSwitch) used to repeat
 * across their templates. The form control composes via `<slot />`.
 *
 * The four wrappers stay intact for API ergonomics (per the B5 §5.5 keep-wrappers
 * path) but now compose `<LabeledField>` internally — the canonical recipe
 * lives in one place. Consumers may also import `<LabeledField>` directly
 * if they want full control of the slot.
 *
 * The `.labeled-field-label` utility class lives at `utilities.css` and
 * paints the canonical typography (font-display + body-size + muted-fg +
 * cursor-help). The previous mixed `text-base` / `text-lg` literals
 * harmonise on a single body-size token.
 */
defineProps<{
    label: string;
    tooltip?: string;
    labelClass?: HTMLAttributes["class"];
}>();
</script>
