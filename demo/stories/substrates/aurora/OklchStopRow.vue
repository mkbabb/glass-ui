<script setup lang="ts">
import { computed } from "vue";
import { X, GripVertical } from "@lucide/vue";
import { Slider } from "@glass/components/slider";
import { hexToOklchStop, oklchStopToHex, type OklchStop } from "@glass/components/aurora";

/**
 * One palette-stop row: drag handle + swatch + inline L/C/h sliders + delete.
 * Lives inside a SortableList in the palette dock layer.
 *
 * The swatch is a native <input type="color"> so users can paste in a hex.
 * Under the hood the value round-trips through OKLCh (library helpers), so
 * painting stays perceptually uniform.
 */

const props = defineProps<{
    stop: OklchStop;
    index: number;
    removable: boolean;
}>();

const emit = defineEmits<{
    (e: "update", next: OklchStop): void;
    (e: "remove"): void;
}>();

const hex = computed(() => oklchStopToHex(props.stop));

/* Per-channel gradient tracks for the spectrum slider. Each ramp is an OKLCh
   gradient holding the row's other two channels fixed, so a track reads as
   "what this channel does to THIS color":
     L → black → white (at the row's chroma + hue),
     C → grey (chroma 0) → saturated (chroma 0.3) at the row's L + hue,
     h → the full hue wheel at the row's L + chroma. */
const lTrack = computed(() => {
    const { C, h } = props.stop;
    return `linear-gradient(to right, oklch(0 ${C} ${h}), oklch(1 ${C} ${h}))`;
});
const cTrack = computed(() => {
    const { L, h } = props.stop;
    return `linear-gradient(to right, oklch(${L} 0 ${h}), oklch(${L} 0.3 ${h}))`;
});
const hTrack = computed(() => {
    const { L, C } = props.stop;
    const stops = [0, 60, 120, 180, 240, 300, 360]
        .map((deg) => `oklch(${L} ${C} ${deg})`)
        .join(", ");
    return `linear-gradient(to right, ${stops})`;
});

function patch(patch: Partial<OklchStop>) {
    emit("update", { ...props.stop, ...patch });
}

function onSwatch(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    const next = hexToOklchStop(v);
    emit("update", next);
}
</script>

<template>
    <div
        class="grid items-center gap-x-2 gap-y-1 rounded-panel border border-border/40 bg-card/50 p-2"
        style="grid-template-columns: 18px 28px 22px 1fr 28px"
    >
        <button
            type="button"
            data-sortable-handle
            class="flex cursor-grab items-center justify-center text-muted-foreground/60 hover:text-foreground"
            aria-label="Drag to reorder"
        >
            <GripVertical :size="14" />
        </button>
        <input
            type="color"
            :value="hex"
            class="h-6 w-7 cursor-pointer appearance-none rounded border border-border/40 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
            :aria-label="`Stop ${index + 1} color`"
            @input="onSwatch"
        />
        <span class="text-mono-small text-muted-foreground">{{ index }}</span>
        <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
                <span class="text-mono-small w-3 text-muted-foreground">L</span>
                <Slider
                    class="flex-1 py-1"
                    variant="spectrum"
                    size="sm"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :model-value="[stop.L]"
                    :aria-label="`Stop ${index + 1} lightness`"
                    :style="{ '--slider-track-bg': lTrack }"
                    @update:model-value="(v: number[] | undefined) => v && patch({ L: v[0] })"
                />
                <span class="text-mono-small w-7 text-right text-muted-foreground">
                    {{ stop.L.toFixed(2) }}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-mono-small w-3 text-muted-foreground">C</span>
                <Slider
                    class="flex-1 py-1"
                    variant="spectrum"
                    size="sm"
                    :min="0"
                    :max="0.3"
                    :step="0.005"
                    :model-value="[stop.C]"
                    :aria-label="`Stop ${index + 1} chroma`"
                    :style="{ '--slider-track-bg': cTrack }"
                    @update:model-value="(v: number[] | undefined) => v && patch({ C: v[0] })"
                />
                <span class="text-mono-small w-7 text-right text-muted-foreground">
                    {{ stop.C.toFixed(2) }}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-mono-small w-3 text-muted-foreground">h</span>
                <Slider
                    class="flex-1 py-1"
                    variant="spectrum"
                    size="sm"
                    :min="0"
                    :max="360"
                    :step="1"
                    :model-value="[stop.h]"
                    :aria-label="`Stop ${index + 1} hue`"
                    :style="{ '--slider-track-bg': hTrack }"
                    @update:model-value="(v: number[] | undefined) => v && patch({ h: v[0] })"
                />
                <span class="text-mono-small w-7 text-right text-muted-foreground">
                    {{ Math.round(stop.h) }}°
                </span>
            </div>
        </div>
        <button
            type="button"
            class="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/60 transition-colors hover:text-destructive disabled:opacity-30 disabled:hover:text-muted-foreground/60"
            :disabled="!removable"
            :aria-label="`Remove stop ${index + 1}`"
            @click="emit('remove')"
        >
            <X :size="13" />
        </button>
    </div>
</template>
