<script setup lang="ts">
import { computed, type CSSProperties, watchEffect } from "vue";
import { ProgressIndicator, ProgressRoot } from "reka-ui";
import { resolveValueFraction, resolveValueMarks } from "../_shared/field/valueDomain";
import type { ProgressProps } from "./types";

const props = withDefaults(defineProps<ProgressProps>(), {
    modelValue: 0,
    variant: "default",
    status: "default",
    orientation: "horizontal",
    marks: () => [],
    indeterminate: false,
});

const delegatedProps = computed(() => {
    const {
        class: _,
        variant: _variant,
        status: _status,
        orientation: _orientation,
        marks: _marks,
        indeterminate: _indeterminate,
        ...delegated
    } = props;
    return delegated;
});

const isIndeterminate = computed(() => props.indeterminate || props.modelValue == null);
const max = computed(() => props.max ?? 100);
const fraction = computed(() => resolveValueFraction(props.modelValue, 0, max.value));
const marks = computed(() =>
    isIndeterminate.value ? [] : resolveValueMarks(props.marks, 0, max.value),
);
watchEffect(() => {
    if (!isIndeterminate.value || !props.marks.length) return;

    const message = "[glass-ui] Progress: `marks` require determinate progress.";
    if (import.meta.env.DEV) throw new Error(message);
    console.error(message);
});
const lifecycleState = computed(() => {
    if (props.variant !== "gradient") return undefined;
    if (isIndeterminate.value) return "idle";
    if (fraction.value <= 0) return "idle";
    if (fraction.value >= 1) return "complete";
    if (fraction.value < 0.05) return "loading";
    return "progressing";
});
const rootStyle = computed(() => {
    const crescendo = Math.min(1, Math.max(0, (fraction.value - 0.85) / 0.15));
    return {
        "--progress-value-percent": `${fraction.value * 100}%`,
        ...(props.variant === "gradient" && {
            "--progress-crescendo": `${isIndeterminate.value ? 0 : crescendo * 100}%`,
        }),
    } as CSSProperties;
});
const indicatorClass = computed(() => ({
    "glass-liquid-fill": props.variant === "liquid",
    "progress-liquid-fill": props.variant === "liquid",
}));
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :model-value="isIndeterminate ? null : props.modelValue"
        class="progress-rail"
        :class="props.class"
        :data-variant="props.variant"
        :data-status="props.status"
        :data-orientation="props.orientation"
        :data-lifecycle="lifecycleState"
        :data-indeterminate="isIndeterminate || undefined"
        :aria-invalid="props.status === 'error' || undefined"
        :aria-orientation="props.orientation"
        :style="rootStyle"
    >
        <span v-if="marks.length" class="progress-value-marks" aria-hidden="true">
            <span
                v-for="mark in marks"
                :key="mark.value"
                class="progress-value-mark"
                :style="{ '--value-mark-position': `${mark.position * 100}%` }"
            />
        </span>
        <ProgressIndicator class="progress-value-fill" :class="indicatorClass" />
    </ProgressRoot>
</template>

<style scoped>
.progress-rail {
    position: relative;
    display: block;
    inline-size: 100%;
    block-size: var(--progress-size, 1rem);
    overflow: hidden;
    border-radius: var(--radius-pill);
    background: var(--progress-track, var(--progress-track-on-glass));
}

.progress-rail[data-orientation="vertical"] {
    inline-size: var(--progress-size, 1rem);
    block-size: var(--progress-vertical-size, 12rem);
}

.progress-rail[data-status="error"] {
    --progress-fill: var(--destructive);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--destructive) 48%, transparent);
}

.progress-value-marks {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.progress-value-mark {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: var(--value-mark-position);
    inline-size: var(--value-mark-size, 0.375rem);
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(
        --value-mark-color,
        color-mix(in srgb, var(--foreground) 34%, transparent)
    );
    transform: translate(-50%, -50%);
}

.progress-rail:dir(rtl) .progress-value-mark {
    transform: translate(50%, -50%);
}

.progress-rail[data-orientation="vertical"] .progress-value-mark {
    inset-block-start: auto;
    inset-block-end: var(--value-mark-position);
    inset-inline-start: 50%;
    transform: translate(-50%, 50%);
}

.progress-rail[data-orientation="vertical"]:dir(rtl) .progress-value-mark {
    transform: translate(50%, 50%);
}

.progress-value-fill {
    position: relative;
    z-index: 1;
    display: block;
    inline-size: 100%;
    block-size: 100%;
    border-radius: inherit;
    background: var(--progress-fill, var(--primary));
    transform: translateX(calc(-100% + var(--progress-value-percent)));
    transition: transform var(--duration-normal) var(--ease-standard);
}

.progress-rail:dir(rtl) .progress-value-fill {
    transform: translateX(calc(100% - var(--progress-value-percent)));
}

.progress-rail[data-orientation="vertical"] .progress-value-fill {
    transform: translateY(calc(100% - var(--progress-value-percent)));
}

.progress-liquid-fill {
    --liquid-fill-tint: var(--progress-fill, var(--primary));
}

.progress-rail[data-variant="gradient"][data-lifecycle="loading"] {
    animation: progress-intake-pulse var(--motion-duration-progress-intake, 220ms)
        var(--motion-ease-standard, ease-out) 1;
}

.progress-rail[data-variant="gradient"][data-lifecycle="complete"]
    [data-state="complete"] {
    animation: progress-discharge-glow var(--motion-duration-progress-crescendo, 240ms)
        var(--motion-ease-standard, ease-out) 1;
}

.progress-rail[data-indeterminate] {
    background: linear-gradient(
        90deg,
        var(--progress-track, var(--progress-track-on-glass)) 0%,
        color-mix(
                in srgb,
                var(--progress-fill, var(--primary)) 60%,
                var(--progress-track, var(--progress-track-on-glass))
            )
            50%,
        var(--progress-track, var(--progress-track-on-glass)) 100%
    );
    background-size: 200% 100%;
    animation: progress-indeterminate-sweep
        var(--motion-duration-progress-indeterminate, 4s) linear infinite;
}

.progress-rail[data-orientation="vertical"][data-indeterminate] {
    background-image: linear-gradient(
        0deg,
        var(--progress-track, var(--progress-track-on-glass)) 0%,
        color-mix(
                in srgb,
                var(--progress-fill, var(--primary)) 60%,
                var(--progress-track, var(--progress-track-on-glass))
            )
            50%,
        var(--progress-track, var(--progress-track-on-glass)) 100%
    );
    background-size: 100% 200%;
    animation-name: progress-indeterminate-rise;
}

.progress-rail[data-indeterminate] > * {
    display: none;
}

.progress-rail[data-variant="gradient"][data-lifecycle="progressing"] [data-state],
.progress-rail[data-variant="gradient"][data-lifecycle="complete"]
    [data-state="complete"] {
    background-image: linear-gradient(
        to right,
        transparent 0%,
        transparent 80%,
        color-mix(in srgb, hsl(0 0% 100%) var(--progress-crescendo, 0%), transparent)
            100%
    );
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-blend-mode: screen;
}

@keyframes progress-intake-pulse {
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.85;
    }
}

@keyframes progress-discharge-glow {
    0% {
        box-shadow: inset -0.25rem 0 0.5rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 0%, transparent);
    }
    40% {
        box-shadow: inset -0.25rem 0 0.75rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 95%, transparent);
    }
    100% {
        box-shadow: inset -0.25rem 0 0.5rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 0%, transparent);
    }
}

@keyframes progress-indeterminate-sweep {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

@keyframes progress-indeterminate-rise {
    0% {
        background-position: 0 200%;
    }
    100% {
        background-position: 0 -200%;
    }
}

@media (prefers-reduced-motion: reduce) {
    .progress-rail[data-variant="gradient"][data-lifecycle="loading"],
    .progress-rail[data-variant="gradient"][data-lifecycle="complete"]
        [data-state="complete"],
    .progress-rail[data-indeterminate] {
        animation: none;
    }

    .progress-value-fill {
        transition: none;
    }

    .progress-rail[data-indeterminate] {
        background-size: 100% 100%;
        background-position: 0 0;
    }
}
</style>
