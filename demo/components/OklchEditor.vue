<script setup lang="ts">
import { computed } from "vue";
import { oklchStopToHex, type OklchStop } from "@/components/custom/aurora";
import { LabeledSlider } from "@/components/custom/labeled-field";

const props = defineProps<{
    modelValue: OklchStop;
    label: string;
    tooltip: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: OklchStop];
}>();

const preview = computed(() => oklchStopToHex(props.modelValue));

function update(key: keyof OklchStop, value: number) {
    emit("update:modelValue", { ...props.modelValue, [key]: value });
}
</script>

<template>
    <div class="space-y-2">
        <div class="flex items-center gap-2">
            <span
                class="inline-block h-5 w-5 rounded-full border border-border/40"
                :style="{ backgroundColor: preview }"
                :title="preview"
            />
            <label class="font-display text-base text-muted-foreground" :title="tooltip">{{ label }}</label>
            <span class="ml-auto font-mono text-micro text-muted-foreground">
                L {{ modelValue.L.toFixed(2) }}
                · C {{ modelValue.C.toFixed(2) }}
                · h {{ Math.round(modelValue.h) }}°
            </span>
        </div>
        <LabeledSlider
            :model-value="modelValue.L"
            label="L"
            tooltip="Lightness (0–1)"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => update('L', v)"
        />
        <LabeledSlider
            :model-value="modelValue.C"
            label="C"
            tooltip="Chroma (0–0.4)"
            :min="0"
            :max="0.4"
            :step="0.005"
            @update:model-value="(v: number) => update('C', v)"
        />
        <LabeledSlider
            :model-value="modelValue.h"
            label="h"
            tooltip="Hue (0–360°)"
            :min="0"
            :max="360"
            :step="1"
            @update:model-value="(v: number) => update('h', v)"
        />
    </div>
</template>
