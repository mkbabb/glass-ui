<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

export interface TabOption {
    label: string;
    value: string;
}

const props = defineProps<{
    options: TabOption[];
    modelValue: string;
    class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const containerRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<HTMLElement[]>([]);
const sliderStyle = ref<Record<string, string>>({
    width: "0px",
    transform: "translateX(0px)",
    opacity: "0",
});

function updateSlider() {
    const idx = props.options.findIndex((o) => o.value === props.modelValue);
    if (idx < 0 || !buttonRefs.value[idx]) return;
    const btn = buttonRefs.value[idx];
    sliderStyle.value = {
        width: `${btn.offsetWidth}px`,
        transform: `translateX(${btn.offsetLeft}px)`,
        opacity: "1",
    };
}

function select(value: string, idx: number) {
    const btn = buttonRefs.value[idx];
    if (btn) {
        btn.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(0.93)", offset: 0.25 },
                { transform: "scale(1.02)", offset: 0.7 },
                { transform: "scale(1)" },
            ],
            { duration: 180, easing: "ease-out" },
        );
    }
    emit("update:modelValue", value);
}

watch(() => props.modelValue, () => nextTick(updateSlider));
watch(() => props.options, () => nextTick(updateSlider), { deep: true });

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    nextTick(updateSlider);
    if (containerRef.value) {
        resizeObserver = new ResizeObserver(() => updateSlider());
        resizeObserver.observe(containerRef.value);
    }
});

onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<template>
    <div ref="containerRef" :class="cn('bouncy-toggle', props.class)">
        <div class="bouncy-slider" :style="sliderStyle" />
        <button
            v-for="(option, idx) in options"
            :key="option.value"
            :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
            class="bouncy-btn"
            :class="{ 'is-active': modelValue === option.value }"
            @click="select(option.value, idx)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<style scoped>
.bouncy-toggle {
    position: relative;
    display: inline-grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    padding: 0.1875rem;
    border-radius: 0.4375rem;
    background: hsl(var(--muted) / 0.5);
}

@media (min-width: 640px) {
    .bouncy-toggle {
        padding: 0.25rem;
        border-radius: 0.5rem;
    }
}

.bouncy-slider {
    position: absolute;
    inset-block: 0.1875rem;
    border-radius: 0.3125rem;
    background: hsl(var(--background));
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.08),
        0 0 0 1px hsl(var(--border) / 0.3);
    transition:
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.15s ease;
    z-index: 0;
}

@media (min-width: 640px) {
    .bouncy-slider {
        inset-block: 0.25rem;
        border-radius: 0.375rem;
    }
}

.bouncy-btn {
    position: relative;
    z-index: 1;
    padding: 0.25rem 0.625rem;
    border-radius: 0.3125rem;
    border: none;
    background: none;
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    cursor: pointer;
    transition: color 0.2s ease;
    white-space: nowrap;
}

@media (min-width: 640px) {
    .bouncy-btn {
        padding: 0.3125rem 0.75rem;
        font-size: 0.875rem;
    }
}

.bouncy-btn.is-active {
    color: hsl(var(--foreground));
}
</style>
