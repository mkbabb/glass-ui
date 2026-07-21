<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type {
    ScrollProgressRimOrientation,
    ScrollProgressRimSegments,
} from "./types";

defineOptions({ name: "ScrollProgressRim" });

const DEFAULT_STOPS = [
    "var(--section-color-0)",
    "var(--section-color-5)",
    "var(--section-color-4)",
    "var(--section-color-3)",
    "var(--section-color-2)",
    "var(--section-color-7)",
] as const;

// A dot crossfades over this fraction band as the fill-pill's leading edge
// reaches its center — the "swallow" of law 12, never a hard on/off flip.
const SWALLOW_BAND = 0.06;

export interface ScrollProgressRimProps {
    /** Aggregate progress in the same units as `max`. */
    value: number;
    /** Aggregate ceiling. @default 1 */
    max?: number;
    /**
     * Optional discrete positions. Each entry renders as a dot; the fill-pill
     * swallows a dot as it passes. The values seed the aggregate read but the
     * pill length is always the true `value / max` fraction (never pinned full).
     */
    segments?: ScrollProgressRimSegments;
    /** The fill axis. @default "horizontal" */
    orientation?: ScrollProgressRimOrientation;
    /** CSS color anchors for the fill's spectrum. */
    stops?: readonly string[];
}

const props = withDefaults(defineProps<ScrollProgressRimProps>(), {
    max: 1,
    orientation: "horizontal",
});

const clamp = (value: number, min: number, max: number) =>
    Number.isNaN(value) ? min : Math.min(max, Math.max(min, value));
const max = computed(() =>
    Number.isFinite(props.max) && props.max > 0 ? props.max : 1,
);
const value = computed(() => clamp(props.value, 0, max.value));
const fraction = computed(() => value.value / max.value);
const spectrum = computed(() => (props.stops?.length ? props.stops : DEFAULT_STOPS));

// The spectrum is a LINEAR gradient along the fill axis (never an angular conic):
// as the pill grows it reveals more of the band — the liquid-volume read of law 12.
const spectrumGradient = computed(() => {
    const axis = props.orientation === "vertical" ? "to top" : "to right";
    const stops = spectrum.value;
    if (stops.length === 1) {
        return `linear-gradient(${axis}, ${stops[0]}, ${stops[0]})`;
    }
    const body = stops
        .map(
            (color, index) =>
                `${color} ${((index / (stops.length - 1)) * 100).toFixed(2)}%`,
        )
        .join(", ");
    return `linear-gradient(${axis}, ${body})`;
});

// One dot per discrete position, at its slot center; a dot the pill has reached
// crossfades toward 0 (swallowed), a dot ahead stays lit.
const dots = computed(() => {
    const segments = props.segments;
    if (!segments?.length) return [];
    return segments.map((_, index) => {
        const position = (index + 0.5) / segments.length;
        const opacity = clamp((position - fraction.value) / SWALLOW_BAND, 0, 1);
        return { position, opacity };
    });
});

const style = computed<CSSProperties>(
    () =>
        ({
            "--scroll-progress-rim-fill": `${(fraction.value * 100).toFixed(3)}%`,
            "--scroll-progress-rim-spectrum": spectrumGradient.value,
        }) as CSSProperties,
);
</script>

<template>
    <div
        class="scroll-progress-rim"
        :data-orientation="orientation"
        :style="style"
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin="0"
        :aria-valuenow="value"
        :aria-valuemax="max"
    >
        <span class="scroll-progress-rim__track" aria-hidden="true">
            <span class="scroll-progress-rim__fill" />
            <span
                v-for="(dot, index) in dots"
                :key="index"
                class="scroll-progress-rim__dot"
                :style="{
                    '--dot-position': `${(dot.position * 100).toFixed(3)}%`,
                    opacity: dot.opacity.toFixed(3),
                }"
            />
        </span>
    </div>
</template>
