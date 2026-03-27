<script setup lang="ts">
import { ref } from "vue";
import {
    useAuroraBlobs,
    type AuroraBlobsConfig,
} from "./composables/useAuroraBlobs";

export interface AuroraBlobsProps {
    /** Colors for the blobs (CSS strings) */
    colors?: string[];
    /** Number of blobs */
    blobCount?: number;
    /** Base radius as fraction of min dimension (0-1) */
    baseRadius?: number;
    /** Canvas blur in px */
    blur?: number;
    /** Animation speed multiplier */
    speed?: number;
    /** Alpha in light mode */
    alphaLight?: number;
    /** Alpha in dark mode */
    alphaDark?: number;
    /** Orbital drift amplitude (0-0.5) */
    orbitAmplitude?: number;
}

const props = defineProps<AuroraBlobsProps>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

const { config } = useAuroraBlobs(canvasRef, {
    colors: props.colors,
    blobCount: props.blobCount,
    baseRadius: props.baseRadius,
    blur: props.blur,
    speed: props.speed,
    alphaLight: props.alphaLight,
    alphaDark: props.alphaDark,
    orbitAmplitude: props.orbitAmplitude,
});

defineExpose({ config });
</script>

<template>
    <canvas
        ref="canvasRef"
        class="aurora-blobs"
        aria-hidden="true"
    />
</template>

<style scoped>
.aurora-blobs {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}
</style>
