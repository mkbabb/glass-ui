<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";

/**
 * <TimelinePlayhead> — vertical scrub indicator absolutely positioned
 * within a parent timeline track. Renders a 2px-wide bar with a
 * conic-gradient progress dot at the top, matching the keyframes.js
 * playhead vocabulary.
 */
export interface TimelinePlayheadProps {
    /** Current time in the same unit as `duration`. */
    time: number;
    /** Total duration of the parent timeline. Defaults to 1. */
    duration?: number;
    /** Color override; defaults to `--accent-color`. */
    color?: string;
    /** Show the conic-gradient progress dot at the top of the bar. */
    showCap?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<TimelinePlayheadProps>(), {
    duration: 1,
    showCap: true,
});

defineOptions({ name: "TimelinePlayhead" });

const ratio = computed(() => {
    const dur = props.duration <= 0 ? 1 : props.duration;
    return Math.max(0, Math.min(1, props.time / dur));
});

const playheadStyle = computed<CSSProperties>(() => ({
    left: `${(ratio.value * 100).toFixed(4)}%`,
    color: props.color ?? "var(--accent-color)",
    "--playhead-deg": `${(ratio.value * 360).toFixed(2)}deg`,
}) as CSSProperties);
</script>

<template>
    <div
        :class="cn('timeline-playhead', props.class)"
        :style="playheadStyle"
        aria-hidden="true"
    >
        <span v-if="showCap" class="timeline-playhead__cap" />
        <span class="timeline-playhead__bar" />
    </div>
</template>

<style scoped>
.timeline-playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    transform: translateX(-50%);
    pointer-events: none;
    color: var(--accent-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
}

.timeline-playhead__cap {
    width: 12px;
    height: 12px;
    border-radius: 9999px;
    background: conic-gradient(
        from -90deg,
        currentColor var(--playhead-deg, 0deg),
        color-mix(in srgb, currentColor 20%, transparent) 0
    );
    border: 1.5px solid color-mix(in srgb, currentColor 80%, var(--background));
    box-shadow: 0 0 6px color-mix(in srgb, currentColor 50%, transparent);
    margin-top: -6px;
}

.timeline-playhead__bar {
    flex: 1 1 auto;
    width: 2px;
    background: currentColor;
    box-shadow: 0 0 4px color-mix(in srgb, currentColor 50%, transparent);
}
</style>
