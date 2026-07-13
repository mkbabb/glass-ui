<template>
    <LabeledField
        :label="label"
        :tooltip="tooltip"
        :label-class="labelClass"
        :required="required"
        :hide-label="hideLabel"
    >
        <!-- BI.W-SLIDER-THUMB-NAME — the never-nameless floor. The field's own
             label text feeds the slotted <Slider> as `aria-label`, which Slider.vue
             forwards onto the reka <SliderThumb> (the role="slider" element). This
             is the ONLY name path that reaches the thumb: an `aria-labelledby` on
             the <Slider> falls through to the reka SliderRoot (a roleless group span),
             NOT the thumb — reka's SliderThumbImpl only reads `$attrs['aria-label']`
             (`aria-label = $attrs['aria-label'] || getLabel(index, count)`, and
             getLabel returns undefined for a single-thumb slider). So a LabeledSlider
             NEVER yields a nameless thumb; the accessible name equals the field label. -->
        <Slider
            :aria-label="label"
            class="py-2"
            :min="min"
            :max="max"
            :step="step"
            :model-value="[modelValue]"
            @update:model-value="(v: number[] | undefined) => { if (v) emit('update:modelValue', v[0]!) }"
        />
    </LabeledField>
</template>

<script setup lang="ts">
import LabeledField from "./LabeledField.vue";
import { Slider } from "../../ui/slider";

defineProps<{
    modelValue: number;
    label: string;
    tooltip: string;
    labelClass?: string;
    min: number;
    max: number;
    step: number;
    /** AQ.W4 §W4.5 — thread the required-field asterisk onto the label. */
    required?: boolean;
    /**
     * AZ.W-BLOB-REDRESS — render the label `sr-only` (kept for a11y, hidden
     * visually) when an enclosing chrome row (a `<ConfiguratorRow>`) already
     * supplies the visible human label. Avoids the double-label leak.
     */
    hideLabel?: boolean;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: number];
}>();
</script>
