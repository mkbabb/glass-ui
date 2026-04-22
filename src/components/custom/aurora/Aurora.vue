<script setup lang="ts">
import { ref } from "vue";
import { useAurora } from "./composables/useAurora";
import type { AuroraConfig } from "./presets";

export interface AuroraProps {
    config?: Partial<AuroraConfig>;
}

const props = defineProps<AuroraProps>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const { config } = useAurora(canvasRef, props.config);

defineExpose({ config });
</script>

<template>
    <canvas ref="canvasRef" aria-hidden="true" />
</template>
