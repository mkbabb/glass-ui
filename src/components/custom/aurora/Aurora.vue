<script setup lang="ts">
import { ref } from "vue";
import { useAurora } from "./composables/useAurora";

export interface AuroraProps {
    colors?: string[];
    blobCount?: number;
    baseRadius?: number;
    blur?: number;
    speed?: number;
    alphaLight?: number;
    alphaDark?: number;
    orbitAmplitude?: number;
}

const props = defineProps<AuroraProps>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const { config } = useAurora(canvasRef, {
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
    <canvas ref="canvasRef" aria-hidden="true" />
</template>
