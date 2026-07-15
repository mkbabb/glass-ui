<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { ScrollProgressRimCoverage, ScrollProgressRimSegments } from "./types";

defineOptions({ name: "ScrollProgressRim" });

const DEFAULT_STOPS = [
    "var(--section-color-0)",
    "var(--section-color-5)",
    "var(--section-color-4)",
    "var(--section-color-3)",
    "var(--section-color-2)",
    "var(--section-color-7)",
] as const;

export interface ScrollProgressRimProps {
    /** Aggregate progress in the same units as `max`. */
    value: number;
    /** Aggregate ceiling. @default 1 */
    max?: number;
    /** Optional per-item fill values. Each segment is clamped to [0, 1]. */
    segments?: ScrollProgressRimSegments;
    /** Which part of the host edge carries progress. @default "full-ring" */
    coverage?: ScrollProgressRimCoverage;
    /** CSS color anchors for the rim's spectrum. */
    stops?: readonly string[];
}

const props = withDefaults(defineProps<ScrollProgressRimProps>(), {
    max: 1,
    coverage: "full-ring",
});

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));
const max = computed(() => (props.max > 0 ? props.max : 1));
const value = computed(() => clamp(props.value, 0, max.value));
const fraction = computed(() => value.value / max.value);
const spectrum = computed(() => (props.stops?.length ? props.stops : DEFAULT_STOPS));

const aggregateStops = computed(() => {
    const stops = spectrum.value;
    const at = (part: number) =>
        `calc(var(--scroll-progress-rim-fill, 0%) * ${part.toFixed(4)})`;
    if (stops.length === 1) return `${stops[0]} 0%, ${stops[0]} ${at(1)}`;
    return stops
        .map((color, index) => `${color} ${at(index / (stops.length - 1))}`)
        .join(", ");
});

const segmentStops = computed(() => {
    const segments = props.segments;
    if (!segments?.length) return null;

    const stops = spectrum.value;
    const percent = (part: number) => `${(part * 100).toFixed(3)}%`;
    return segments
        .flatMap((segment, index) => {
            const start = index / segments.length;
            const fill = start + clamp(segment, 0, 1) / segments.length;
            const end = (index + 1) / segments.length;
            const color =
                stops[
                    segments.length === 1
                        ? 0
                        : Math.round(
                              (index / (segments.length - 1)) * (stops.length - 1),
                          )
                ] ?? DEFAULT_STOPS[0];
            return [
                `${color} ${percent(start)}`,
                `${color} ${percent(fill)}`,
                `transparent ${percent(fill)}`,
                `transparent ${percent(end)}`,
            ];
        })
        .join(", ");
});

const style = computed<CSSProperties>(
    () =>
        ({
            "--scroll-progress-rim-fill": props.segments?.length
                ? "100%"
                : `${(fraction.value * 100).toFixed(3)}%`,
            "--scroll-progress-rim-spectrum":
                segmentStops.value ?? aggregateStops.value,
        }) as CSSProperties,
);
</script>

<template>
    <div
        class="scroll-progress-rim"
        :data-coverage="coverage"
        :style="style"
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin="0"
        :aria-valuenow="value"
        :aria-valuemax="max"
    >
        <span class="scroll-progress-rim__track" aria-hidden="true" />
    </div>
</template>
