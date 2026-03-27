<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, nextTick, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../../ui/tooltip";

export interface ToggleOption {
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
    tooltip?: string;
}

export interface BouncyToggleProps {
    options: ToggleOption[];
    modelValue: string | string[];
    multiSelect?: boolean;
    /** "default" = subtle muted slider; "pill" = solid foreground pill */
    variant?: "default" | "pill";
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<BouncyToggleProps>(), {
    multiSelect: false,
    variant: "default",
});

const emit = defineEmits<{
    "update:modelValue": [value: string | string[]];
}>();

const containerRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<HTMLElement[]>([]);

// ── Computed state ──

const isPill = computed(() => props.variant === "pill");

const activeValues = computed<string[]>(() => {
    if (props.multiSelect) {
        return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
    }
    return [props.modelValue as string];
});

const isActive = (value: string) => activeValues.value.includes(value);

// ── Single-select slider style ──

const singleSliderStyle = ref<Record<string, string>>({
    width: "0px",
    transform: "translateX(0px)",
    opacity: "0",
});

function updateSingleSlider() {
    if (props.multiSelect) return;
    const idx = props.options.findIndex((o) => o.value === (props.modelValue as string));
    if (idx < 0 || !buttonRefs.value[idx]) return;
    const btn = buttonRefs.value[idx];
    singleSliderStyle.value = {
        width: `${btn.offsetWidth}px`,
        transform: `translateX(${btn.offsetLeft}px)`,
        opacity: "1",
    };
}

// ── Multi-select slider styles ──

const multiSliderStyles = ref<Record<string, Record<string, string>>>({});

function updateMultiSliders() {
    if (!props.multiSelect) return;
    const styles: Record<string, Record<string, string>> = {};
    for (const value of activeValues.value) {
        const optionIdx = props.options.findIndex((o) => o.value === value);
        const btn = buttonRefs.value[optionIdx];
        if (!btn) continue;
        styles[value] = {
            width: `${btn.offsetWidth}px`,
            transform: `translateX(${btn.offsetLeft}px)`,
            opacity: "1",
        };
    }
    multiSliderStyles.value = styles;
}

// ── Unified update ──

function updateSliders() {
    if (props.multiSelect) {
        updateMultiSliders();
    } else {
        updateSingleSlider();
    }
}

// ── Button press animation (Web Animations API) ──

function animatePress(btn: HTMLElement) {
    // Cancel any in-flight press animations on this button
    btn.getAnimations().forEach((a) => a.cancel());

    btn.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(0.93)", offset: 0.25 },
            { transform: "scale(1.02)", offset: 0.7 },
            { transform: "scale(1)" },
        ],
        {
            duration: 200,
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", // --ease-apple-spring
        },
    );
}

// ── Selection handler ──

function select(value: string, idx: number) {
    const option = props.options[idx];
    if (option?.disabled) return;

    const btn = buttonRefs.value[idx];
    if (btn) {
        animatePress(btn);
    }

    if (props.multiSelect) {
        const current = [...activeValues.value];
        const existingIdx = current.indexOf(value);
        if (existingIdx > -1) {
            // Don't deselect the last remaining value
            if (current.length > 1) {
                current.splice(existingIdx, 1);
            }
        } else {
            current.push(value);
        }
        emit("update:modelValue", current);
    } else {
        emit("update:modelValue", value);
    }
}

// ── Watchers ──

watch(() => props.modelValue, () => nextTick(updateSliders), { deep: true });
watch(() => props.options, () => nextTick(updateSliders), { deep: true });

// ── Lifecycle ──

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    nextTick(updateSliders);
    if (containerRef.value) {
        resizeObserver = new ResizeObserver(() => updateSliders());
        resizeObserver.observe(containerRef.value);
    }
});

onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<template>
    <div
        ref="containerRef"
        :class="cn(
            isPill ? 'bouncy-toggle bouncy-toggle--pill' : 'bouncy-toggle',
            props.class,
        )"
    >
        <!-- Single-select slider -->
        <div
            v-if="!multiSelect"
            :class="isPill ? 'bouncy-slider bouncy-slider--pill' : 'bouncy-slider'"
            :style="singleSliderStyle"
        />

        <!-- Multi-select sliders (one per active value) -->
        <template v-if="multiSelect">
            <div
                v-for="value in activeValues"
                :key="'slider-' + value"
                :class="isPill ? 'bouncy-slider bouncy-slider--pill' : 'bouncy-slider'"
                :style="multiSliderStyles[value] ?? { opacity: '0' }"
            />
        </template>

        <!-- Buttons -->
        <template v-for="(option, idx) in options" :key="option.value">
            <!-- With tooltip -->
            <TooltipProvider v-if="option.tooltip" :delay-duration="200">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                            :class="[
                                isPill ? 'bouncy-btn bouncy-btn--pill' : 'bouncy-btn',
                                { 'is-active': isActive(option.value) },
                                option.disabled && 'is-disabled',
                            ]"
                            :disabled="option.disabled"
                            @click="select(option.value, idx)"
                        >
                            <slot name="option" :option="option" :active="isActive(option.value)">
                                {{ option.label }}
                            </slot>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" :side-offset="8">
                        {{ option.tooltip }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <!-- Without tooltip -->
            <button
                v-else
                :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                :class="[
                    isPill ? 'bouncy-btn bouncy-btn--pill' : 'bouncy-btn',
                    { 'is-active': isActive(option.value) },
                    option.disabled && 'is-disabled',
                ]"
                :disabled="option.disabled"
                @click="select(option.value, idx)"
            >
                <slot name="option" :option="option" :active="isActive(option.value)">
                    {{ option.label }}
                </slot>
            </button>
        </template>
    </div>
</template>

<style scoped>
/* ── Default variant ── */
.bouncy-toggle {
    position: relative;
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
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
    background: hsl(var(--background));
    z-index: 0;
    inset-block: 0.1875rem;
    border-radius: 0.3125rem;
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.08),
        0 0 0 1px hsl(var(--border) / 0.3);
    transition:
        transform var(--duration-normal) var(--ease-spring),
        width var(--duration-normal) var(--ease-spring),
        opacity var(--duration-fast) ease;
}

@media (min-width: 640px) {
    .bouncy-slider {
        inset-block: 0.25rem;
        border-radius: 0.375rem;
    }
}

.bouncy-btn {
    position: relative;
    z-index: 10;
    border: none;
    background: none;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    padding: 0.25rem 0.625rem;
    border-radius: 0.3125rem;
    font: inherit;
    font-size: 0.8125rem;
    color: hsl(var(--muted-foreground));
    transition: color var(--duration-fast) ease;
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

.bouncy-btn.is-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
    filter: blur(0.5px);
}

/* ── Pill variant ── */
.bouncy-toggle--pill {
    border-radius: var(--radius-pill);
    background: hsl(var(--foreground) / 0.05);
    padding: 0.125rem;
    gap: 0.125rem;
}

.bouncy-slider--pill {
    border-radius: var(--radius-pill);
    background: hsl(var(--foreground));
    box-shadow: none;
    inset-block: 0.125rem;
}

.bouncy-btn--pill {
    border-radius: var(--radius-pill);
    padding: 0.125rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
}

@media (min-width: 640px) {
    .bouncy-btn--pill {
        padding: 0.125rem 0.625rem;
        font-size: 0.75rem;
    }
}

.bouncy-btn--pill.is-active {
    color: hsl(var(--background));
}
</style>
