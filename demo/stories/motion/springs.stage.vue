<script setup lang="ts">
// Springs' stage: the curve's plot with its travelling dot, and a disc that travels the
// same curve along a track. A new curve wipes on and plays; an edit replays it.
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RotateCcw } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { EasingCurve } from "@glass/components/easing";
import { buildCurve, curvePath, curvePresets, type CurveConfig } from "./springs/curve";

const props = defineProps<{
    config?: CurveConfig;
    /** Bumped when a preset is chosen: the plot wipes on again. */
    version?: number;
}>();

const fallback = curvePresets()[0]!.config;
const curve = computed(() => buildCurve(props.config ?? fallback));
const path = computed(() => curvePath(curve.value.fn));

const t = ref(1);
const value = computed(() => curve.value.fn(t.value));
const drawn = ref(true);

const span = computed(() => curve.value.peak - curve.value.floor);
const along = computed(() => (value.value - curve.value.floor) / span.value);
const clipped = computed(() => curve.value.peak > 1.1 || curve.value.floor < -0.1);

let raf = 0;
let start = 0;

function frame(now: number): void {
    if (!start) start = now;
    t.value = Math.min(1, (now - start) / curve.value.ms);
    raf = t.value < 1 ? requestAnimationFrame(frame) : 0;
}

function play(): void {
    cancelAnimationFrame(raf);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        t.value = 1;
        return;
    }
    start = 0;
    t.value = 0;
    raf = requestAnimationFrame(frame);
}

function wipeAndPlay(): void {
    drawn.value = false;
    requestAnimationFrame(() => {
        drawn.value = true;
        play();
    });
}

let pending = 0;
watch(
    () => props.config && { ...props.config },
    () => {
        window.clearTimeout(pending);
        pending = window.setTimeout(play, 200);
    },
    { deep: true },
);
watch(() => props.version, wipeAndPlay);

onMounted(() => window.setTimeout(play, 400));
onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    window.clearTimeout(pending);
});

defineExpose({ play });
</script>

<template>
    <div class="springs-stage">
        <EasingCurve
            class="springs-plot"
            :strokes="[{ d: path }]"
            :progress="t"
            :travel="value"
            :clipped="clipped"
            :drawn="drawn"
            label="Response over time"
        />
        <div class="springs-track" aria-hidden="true">
            <span class="springs-disc" :style="{ '--along': along }" />
        </div>
        <Button
            emphasis="secondary"
            size="sm"
            icon-only
            class="springs-replay"
            aria-label="Play"
            @click="play"
        >
            <RotateCcw class="size-4" aria-hidden="true" />
        </Button>
    </div>
</template>

<style scoped>
.springs-stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    inline-size: 100%;
    block-size: 100%;
    padding: 1.5rem;
    container-type: inline-size;
}

.springs-plot {
    inline-size: min(26rem, 52cqi);
}

.springs-track {
    --disc: 2.5rem;
    position: relative;
    inline-size: min(36rem, 100%);
    block-size: calc(var(--disc) + 0.5rem);
    border-radius: var(--radius-pill);
    background: color-mix(in oklab, var(--foreground) 6%, transparent);
    container-type: inline-size;
}

.springs-disc {
    position: absolute;
    inset-block-start: 0.25rem;
    inset-inline-start: 0.25rem;
    inline-size: var(--disc);
    block-size: var(--disc);
    border-radius: var(--radius-pill);
    background: var(--motion-accent, var(--primary));
    translate: calc(var(--along) * (100cqi - var(--disc) - 0.5rem)) 0;
}

.springs-replay {
    position: absolute;
    inset-block-end: 0.75rem;
    inset-inline-start: 0.75rem;
}
</style>
