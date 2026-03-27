<script setup lang="ts">
import { ref } from "vue";
import { useMetaballs } from "./useMetaballs";
import type { MetaballConfig } from "./types";

const props = defineProps<{
    config?: MetaballConfig;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { isSupported } = useMetaballs(canvasRef, props.config);

defineExpose({ isSupported });
</script>

<template>
    <canvas
        v-if="isSupported"
        ref="canvasRef"
        class="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
    <slot v-else name="fallback" />
</template>
