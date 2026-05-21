<script setup lang="ts">
import { computed } from "vue";
import { X, GripVertical } from "@lucide/vue";
import { Slider } from "../../../src/components/ui/slider";
import { hexToOklchStop, oklchStopToHex, type OklchStop } from "../../../src/components/custom/aurora";

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
        <span class="text-mono-caption text-muted-foreground">{{ index }}</span>
        <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
                <span class="text-mono-caption w-3 text-muted-foreground">L</span>
                <Slider
                    class="flex-1 py-1"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :model-value="[stop.L]"
                    @update:model-value="(v: number[] | undefined) => v && patch({ L: v[0] })"
                />
                <span class="text-mono-caption w-7 text-right text-muted-foreground">
                    {{ stop.L.toFixed(2) }}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-mono-caption w-3 text-muted-foreground">C</span>
                <Slider
                    class="flex-1 py-1"
                    :min="0"
                    :max="0.3"
                    :step="0.005"
                    :model-value="[stop.C]"
                    @update:model-value="(v: number[] | undefined) => v && patch({ C: v[0] })"
                />
                <span class="text-mono-caption w-7 text-right text-muted-foreground">
                    {{ stop.C.toFixed(2) }}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-mono-caption w-3 text-muted-foreground">h</span>
                <Slider
                    class="flex-1 py-1"
                    :min="0"
                    :max="360"
                    :step="1"
                    :model-value="[stop.h]"
                    @update:model-value="(v: number[] | undefined) => v && patch({ h: v[0] })"
                />
                <span class="text-mono-caption w-7 text-right text-muted-foreground">
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
