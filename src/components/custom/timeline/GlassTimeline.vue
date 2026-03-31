<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    modelValue: number;
    label?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [v: number];
    scrubStart: [];
    scrubEnd: [];
}>();

const trackRef = ref<HTMLElement>();
const scrubbing = ref(false);

function tFromPointer(e: PointerEvent): number {
    const rect = trackRef.value!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
}

function onTrackDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    scrubbing.value = true;
    emit("scrubStart");
    emit("update:modelValue", tFromPointer(e));
}

function onTrackMove(e: PointerEvent) {
    if (!scrubbing.value) return;
    emit("update:modelValue", tFromPointer(e));
}

function onTrackUp() {
    scrubbing.value = false;
    emit("scrubEnd");
}

function onTrackKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 0.1 : 0.01;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        emit("update:modelValue", Math.min(1, props.modelValue + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        emit("update:modelValue", Math.max(0, props.modelValue - step));
    }
}
</script>

<template>
    <div class="timeline-row">
        <div v-if="label" class="timeline-caret" :style="{ left: (modelValue * 100) + '%' }">
            <span class="caret-value font-mono-code">{{ label }}</span>
        </div>
        <div
            ref="trackRef"
            class="glass-track"
            role="slider"
            tabindex="0"
            :aria-valuenow="modelValue"
            aria-valuemin="0"
            aria-valuemax="1"
            aria-label="Timeline"
            @pointerdown="onTrackDown"
            @pointermove="onTrackMove"
            @pointerup="onTrackUp"
            @pointercancel="onTrackUp"
            @keydown="onTrackKeydown"
        >
            <div class="glass-fill" :style="{ width: (modelValue * 100) + '%' }" />
            <div class="glass-thumb" :style="{ left: (modelValue * 100) + '%' }" />
        </div>
    </div>
</template>

<style scoped>
.timeline-row {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 0.25rem;
    position: relative;
    display: flex;
    align-items: center;
}

.timeline-caret {
    position: absolute;
    bottom: calc(100% + 6px);
    transform: translateX(-50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-standard);
    z-index: var(--z-popover);
    user-select: none;
    -webkit-user-select: none;
}

.timeline-row:hover .timeline-caret,
.timeline-row:has(.glass-track:active) .timeline-caret {
    opacity: 1;
}

.caret-value {
    display: block;
    padding: 0.125rem 0.375rem;
    font-size: var(--type-small);
    font-weight: 500;
    color: var(--popover-foreground);
    background: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
    white-space: nowrap;
}

.glass-track {
    position: relative;
    width: 100%;
    height: 24px;
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--foreground) 5%, transparent);
    backdrop-filter: var(--glass-blur-subtle);
    -webkit-backdrop-filter: var(--glass-blur-subtle);
    cursor: pointer;
    touch-action: none;
    overflow: hidden;
    transition: background var(--duration-fast) var(--ease-standard);
    outline: none;
}

.glass-track:hover,
.glass-track:focus-visible {
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
}

.glass-track:focus-visible {
    box-shadow: var(--focus-ring-shadow);
}

.glass-fill {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--foreground) 7%, transparent);
    border-radius: var(--radius-pill);
    pointer-events: none;
}

.glass-thumb {
    position: absolute;
    top: 50%;
    transform: translate(calc(-50% - 3px), -50%);
    width: 6px;
    height: 16px;
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--foreground) 25%, transparent);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--duration-fast) var(--ease-standard),
        width var(--duration-fast) var(--ease-standard),
        height var(--duration-fast) var(--ease-standard),
        background var(--duration-fast) var(--ease-standard);
}

.glass-track:hover .glass-thumb {
    opacity: 1;
    width: 8px;
    height: 18px;
    background: color-mix(in srgb, var(--foreground) 40%, transparent);
}
</style>
