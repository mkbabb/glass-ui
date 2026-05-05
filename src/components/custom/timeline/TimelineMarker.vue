<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";

/**
 * <TimelineMarker> — single keyframe glyph rendered at a horizontal
 * position derived from `time / duration`. `variant="diamond"` rotates
 * the marker 45° (the keyframes.js timeline idiom); `variant="circle"`
 * renders a filled disc. Both expose hover-scale + focus-ring contracts.
 */
export type TimelineMarkerVariant = "diamond" | "circle";

export interface TimelineMarkerProps {
    /** Absolute time in the same unit as the parent's `duration`. */
    time: number;
    /** Total duration of the parent timeline. Defaults to 1. */
    duration?: number;
    /** Glyph shape. */
    variant?: TimelineMarkerVariant;
    /** Selection state — applies the active styling (no scale jump). */
    selected?: boolean;
    /** Color override; defaults to `--easing-accent`. */
    color?: string;
    /** Marker pixel size on the cross-axis. */
    size?: number;
    /** Accessible label. */
    label?: string;
    class?: string;
}

const props = withDefaults(defineProps<TimelineMarkerProps>(), {
    duration: 1,
    variant: "diamond",
    selected: false,
    size: 12,
});

defineOptions({ name: "TimelineMarker" });

const emit = defineEmits<{
    activate: [time: number];
}>();

const leftPercent = computed(() => {
    const dur = props.duration <= 0 ? 1 : props.duration;
    const ratio = Math.max(0, Math.min(1, props.time / dur));
    return `${(ratio * 100).toFixed(4)}%`;
});

const markerStyle = computed<CSSProperties>(() => ({
    left: leftPercent.value,
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: props.color ?? "var(--easing-accent)",
}));

function onActivate(e: MouseEvent | KeyboardEvent) {
    if (e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " ") return;
    if (e instanceof KeyboardEvent) e.preventDefault();
    emit("activate", props.time);
}
</script>

<template>
    <button
        type="button"
        :class="
            cn(
                'timeline-marker',
                `timeline-marker--${variant}`,
                selected && 'is-selected',
                props.class,
            )
        "
        :style="markerStyle"
        :aria-label="label ?? `Marker at ${time}`"
        :aria-pressed="selected"
        @click="onActivate"
        @keydown="onActivate"
    />
</template>

<style scoped>
.timeline-marker {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) rotate(0);
    background: currentColor;
    border: 2px solid color-mix(in srgb, currentColor 60%, var(--background));
    cursor: grab;
    padding: 0;
    transition:
        transform var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.timeline-marker:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

.timeline-marker--diamond {
    border-radius: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
}

.timeline-marker--circle {
    border-radius: 9999px;
}

.timeline-marker:hover {
    transform: translate(-50%, -50%) rotate(0) scale(1.08);
}

.timeline-marker--diamond:hover {
    transform: translate(-50%, -50%) rotate(45deg) scale(1.08);
}

.timeline-marker.is-selected {
    border-color: currentColor;
    transform: translate(-50%, -50%) rotate(0) scale(1.18);
}

.timeline-marker--diamond.is-selected {
    transform: translate(-50%, -50%) rotate(45deg) scale(1.18);
}

@media (prefers-reduced-motion: reduce) {
    .timeline-marker {
        transition: none;
    }
    .timeline-marker:hover,
    .timeline-marker.is-selected {
        transform: translate(-50%, -50%) rotate(0);
    }
    .timeline-marker--diamond:hover,
    .timeline-marker--diamond.is-selected {
        transform: translate(-50%, -50%) rotate(45deg);
    }
}
</style>
