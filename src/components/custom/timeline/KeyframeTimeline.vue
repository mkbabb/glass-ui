<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";
import TimelineMarker, { type TimelineMarkerVariant } from "./TimelineMarker.vue";
import TimelinePlayhead from "./TimelinePlayhead.vue";
import TimelineRuler from "./TimelineRuler.vue";

/**
 * <KeyframeTimeline> — horizontal scrub area with a top tick-ruler,
 * a body track, an absolutely-positioned playhead, and zero-or-more
 * keyframe markers. Lifted from the keyframes.js animation-controls
 * timeline; generalized over `duration` rather than [0,1].
 *
 * `update:current-time` fires on click + drag. Markers are rendered
 * from the optional `:markers` array; emit `markerActivate` when a
 * marker is clicked / Enter-keyed.
 */
export interface KeyframeTimelineMarker {
    id: string | number;
    time: number;
    variant?: TimelineMarkerVariant;
    color?: string;
    selected?: boolean;
    label?: string;
}

export interface KeyframeTimelineProps {
    /** Total duration; same unit consumed by `currentTime` and marker times. */
    duration: number;
    /** Current playhead position. v-model:current-time. */
    currentTime: number;
    /** Optional keyframe descriptors. */
    markers?: KeyframeTimelineMarker[];
    /** Show the top ruler. Defaults to true. */
    showRuler?: boolean;
    /** Tick interval for the ruler (same unit as duration). */
    tickInterval?: number;
    /** Major-label cadence. */
    labelEvery?: number;
    /** Optional unit suffix. */
    unit?: string;
    /** Total visual height of the timeline body. */
    height?: number;
    class?: string;
}

const props = withDefaults(defineProps<KeyframeTimelineProps>(), {
    markers: () => [],
    showRuler: true,
    tickInterval: 0.1,
    labelEvery: 5,
    unit: "",
    height: 56,
});

const emit = defineEmits<{
    "update:currentTime": [time: number];
    markerActivate: [marker: KeyframeTimelineMarker];
    scrubStart: [];
    scrubEnd: [];
}>();

defineOptions({ name: "KeyframeTimeline" });

const trackRef = ref<HTMLElement | null>(null);
const scrubbing = ref(false);

const dur = computed(() => (props.duration <= 0 ? 1 : props.duration));

function timeFromPointer(e: PointerEvent): number {
    const el = trackRef.value;
    if (!el) return props.currentTime;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    return ratio * dur.value;
}

function onTrackDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    scrubbing.value = true;
    emit("scrubStart");
    emit("update:currentTime", timeFromPointer(e));
}

function onTrackMove(e: PointerEvent) {
    if (!scrubbing.value) return;
    emit("update:currentTime", timeFromPointer(e));
}

function onTrackUp() {
    if (!scrubbing.value) return;
    scrubbing.value = false;
    emit("scrubEnd");
}

function onKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? dur.value * 0.1 : dur.value * 0.01;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        emit("update:currentTime", Math.min(dur.value, props.currentTime + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        emit("update:currentTime", Math.max(0, props.currentTime - step));
    } else if (e.key === "Home") {
        e.preventDefault();
        emit("update:currentTime", 0);
    } else if (e.key === "End") {
        e.preventDefault();
        emit("update:currentTime", dur.value);
    }
}

const bodyStyle = computed<CSSProperties>(() => ({
    height: `${props.height}px`,
}));
</script>

<template>
    <div :class="cn('keyframe-timeline', props.class)">
        <TimelineRuler
            v-if="showRuler"
            :duration="dur"
            :tick-interval="tickInterval"
            :label-every="labelEvery"
            :unit="unit"
            class="keyframe-timeline__ruler"
        />
        <div
            ref="trackRef"
            class="keyframe-timeline__track"
            :style="bodyStyle"
            role="slider"
            tabindex="0"
            :aria-valuenow="currentTime"
            aria-valuemin="0"
            :aria-valuemax="dur"
            aria-label="Timeline scrubber"
            @pointerdown="onTrackDown"
            @pointermove="onTrackMove"
            @pointerup="onTrackUp"
            @pointercancel="onTrackUp"
            @keydown="onKeydown"
        >
            <TimelineMarker
                v-for="marker in markers"
                :key="marker.id"
                :time="marker.time"
                :duration="dur"
                :variant="marker.variant ?? 'diamond'"
                :color="marker.color"
                :selected="marker.selected"
                :label="marker.label ?? `Keyframe at ${marker.time}`"
                @activate="emit('markerActivate', marker)"
            />
            <TimelinePlayhead :time="currentTime" :duration="dur" />
        </div>
    </div>
</template>

<style scoped>
.keyframe-timeline {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    user-select: none;
    -webkit-user-select: none;
}

.keyframe-timeline__ruler {
    pointer-events: none;
}

.keyframe-timeline__track {
    position: relative;
    width: 100%;
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--foreground) 5%, transparent);
    border: 1px solid var(--border);
    cursor: pointer;
    touch-action: none;
    outline: none;
    transition: background var(--duration-fast) var(--ease-standard);
}

.keyframe-timeline__track:hover,
.keyframe-timeline__track:focus-visible {
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
}

.keyframe-timeline__track:focus-visible {
    box-shadow: var(--focus-ring-shadow);
}
</style>
