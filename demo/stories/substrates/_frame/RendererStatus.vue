<script setup lang="ts">
import { computed } from "vue";
import type { RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";

const { status } = defineProps<{ status: RendererStatus }>();
const engine = computed(
    () =>
        ({
            webgpu: "WebGPU",
            webgl2: "WebGL 2",
            canvas2d: "Canvas 2D",
            css: "CSS",
        })[status.engine],
);
</script>

<template>
    <output
        class="renderer-status text-micro font-mono"
        :class="{ 'renderer-status--error': status.phase === 'error' }"
        :title="status.error ?? status.adapter"
        :data-renderer="status.engine"
        :data-state="status.phase"
        aria-live="polite"
    >
        <span class="renderer-status__dot" aria-hidden="true" />
        <span>{{ engine }}</span>
        <span aria-hidden="true">·</span>
        <span class="renderer-status__adapter">{{
            status.error ?? status.adapter
        }}</span>
    </output>
</template>

<style scoped>
.renderer-status {
    display: inline-flex;
    align-items: center;
    max-inline-size: min(80%, 28rem);
    gap: 0.35rem;
    border: 1px solid color-mix(in oklch, var(--border) 55%, transparent);
    border-radius: var(--radius-pill);
    background: color-mix(in oklch, var(--card) 76%, transparent);
    padding: 0.3rem 0.65rem;
    color: var(--muted-foreground);
    line-height: 1.2;
    backdrop-filter: var(--glass-cell-backdrop-filter, blur(10px));
}

.renderer-status__dot {
    inline-size: 0.4rem;
    block-size: 0.4rem;
    flex: none;
    border-radius: 50%;
    background: var(--primary);
    opacity: 0.75;
}

.renderer-status[data-state="initializing"] .renderer-status__dot {
    opacity: 0.35;
}

.renderer-status--error {
    color: var(--destructive);
}

.renderer-status--error .renderer-status__dot {
    background: currentColor;
}

.renderer-status__adapter {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
