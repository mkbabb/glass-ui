<script setup lang="ts">
// One Constellation filling its box. Its behaviours are fixed when it mounts, so a
// change to one cross-fades to a fresh field; reach, accent and strength change live.
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { Constellation, type ConstellationField } from "@glass/components/constellation";
import { useTokenColor } from "@glass/composables/dom/useTokenColor";
import StageSwap from "../../chassis/variants/StageSwap.vue";
import { CONSTELLATION_PRESETS, type ConstellationStudio } from "./constellation/studio";

const props = withDefaults(
    defineProps<{ studio?: ConstellationStudio; frozen?: boolean }>(),
    { studio: () => CONSTELLATION_PRESETS[0]!.config, frozen: false },
);

const signature = (): string => {
    const s = props.studio;
    return [s.count, s.link, s.warp, s.wander, s.well, s.pinned, props.frozen].join("|");
};

// Settle a dragged slider before mounting the next field.
const mounted = ref(signature());
let timer = 0;
watch(signature, (next) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (mounted.value = next), 220);
});
onBeforeUnmount(() => window.clearTimeout(timer));

const shown = computed(() => {
    const [count, link, warp, wander, well, pinned, frozen] = mounted.value.split("|");
    return {
        count: Number(count),
        link: Number(link),
        warp: warp === "true",
        wander: wander === "true",
        well: well === "true",
        pinned: pinned === "true",
        frozen: frozen === "true",
    };
});

const { value: accent } = useTokenColor("--constellation-accent", { fallback: "#b35030" });

// The focal mark: a ring that pulses outward around the warped or pinned node.
const drawFocal = computed(() => {
    const s = shown.value;
    if (!s.warp && !s.wander && !s.well && !s.pinned) return undefined;
    return (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
        const pin = field.pinnedIndex >= 0 ? field.nodes[field.pinnedIndex] : undefined;
        const x = pin ? pin.x : field.warp.x;
        const y = pin ? pin.y : field.warp.y;
        if (!pin && field.focalIndex < 0 && x === 0 && y === 0) return;
        const k = field.k;
        const phase = (now % 2400) / 2400;
        ctx.strokeStyle = accent.value;
        ctx.fillStyle = accent.value;
        ctx.lineWidth = 1.5 * k;
        ctx.globalAlpha = (1 - phase) * 0.55;
        ctx.beginPath();
        ctx.arc(x, y, (11 + phase * 22) * k, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(x, y, 13 * k, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 4.6 * k, 0, Math.PI * 2);
        ctx.fill();
    };
});
</script>

<template>
    <StageSwap :swap-key="mounted" class="constellation-stage">
        <Constellation
            seed="glass-ui"
            :count="shown.count"
            :link="shown.link"
            :pointer-reactive="studio.pointer && !shown.frozen"
            :warp-on-click="shown.warp"
            :wander="shown.wander ? { minIdle: 1400, jitter: 600 } : false"
            :gravity-well="shown.well"
            :pinned="shown.pinned"
            :pinned-drift="shown.pinned ? { wanderFrac: 0.16, durMs: 2400, minIdle: 1200, jitter: 800 } : false"
            :warp-auto-release="shown.pinned"
            :accent-edges="studio.accent"
            :opacity-ceiling="studio.ceiling"
            :freeze="shown.frozen"
            :draw-overlay="drawFocal"
            class="absolute inset-0"
        />
    </StageSwap>
</template>

<style scoped>
.constellation-stage,
.constellation-stage :deep(.stage-swap-pane) {
    position: absolute;
    inset: 0;
}
</style>
