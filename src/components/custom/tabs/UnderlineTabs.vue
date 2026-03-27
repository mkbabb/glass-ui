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
const underlineStyle = ref<Record<string, string>>({
    width: "0px",
    transform: "translateX(0px)",
});

function updateUnderline() {
    const idx = props.options.findIndex((o) => o.value === props.modelValue);
    if (idx < 0 || !buttonRefs.value[idx]) return;
    const btn = buttonRefs.value[idx];
    underlineStyle.value = {
        width: `${btn.offsetWidth}px`,
        transform: `translateX(${btn.offsetLeft}px)`,
    };
}

function select(value: string) {
    emit("update:modelValue", value);
}

watch(() => props.modelValue, () => nextTick(updateUnderline));
watch(() => props.options, () => nextTick(updateUnderline), { deep: true });

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    nextTick(updateUnderline);
    if (containerRef.value) {
        resizeObserver = new ResizeObserver(() => updateUnderline());
        resizeObserver.observe(containerRef.value);
    }
});

onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<template>
    <div ref="containerRef" :class="cn('underline-tabs', props.class)">
        <div class="underline-indicator" :style="underlineStyle" />
        <button
            v-for="(option, idx) in options"
            :key="option.value"
            :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
            class="underline-tab"
            :class="{ 'is-active': modelValue === option.value }"
            @click="select(option.value)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<style scoped>
.underline-tabs {
    position: relative;
    display: flex;
    gap: 0.25rem;
}

.underline-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: hsl(var(--foreground));
    border-radius: var(--radius-sm);
    transition:
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.underline-tab {
    position: relative;
    border: none;
    background: none;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    padding: 0.375rem 0.75rem;
    font: inherit;
    color: hsl(var(--muted-foreground));
    transition: color var(--duration-normal) var(--ease-standard);
    border-radius: 0.25rem;
}

.underline-tab:hover {
    color: hsl(var(--foreground) / 0.7);
}

.underline-tab.is-active {
    color: hsl(var(--foreground));
}
</style>
