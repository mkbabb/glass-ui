<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../../utils/cn";

/**
 * <TimelineRuler> — horizontal tick rule with evenly-spaced marks +
 * numeric labels for the major ticks. Pairs with <KeyframeTimeline>
 * but is also valid as a standalone scrubber annotation.
 */
export interface TimelineRulerProps {
    /** Total duration. */
    duration: number;
    /** Spacing between ticks (same unit as `duration`). */
    tickInterval?: number;
    /** Show numeric label every N ticks. */
    labelEvery?: number;
    /** Decimals for label formatting. */
    labelDecimals?: number;
    /** Optional unit suffix appended to labels (e.g. "s", "ms"). */
    unit?: string;
    class?: string;
}

const props = withDefaults(defineProps<TimelineRulerProps>(), {
    tickInterval: 0.1,
    labelEvery: 5,
    labelDecimals: 1,
    unit: "",
});

defineOptions({ name: "TimelineRuler" });

interface Tick {
    t: number;
    pct: string;
    isMajor: boolean;
    label: string | null;
}

const ticks = computed<Tick[]>(() => {
    const dur = props.duration <= 0 ? 1 : props.duration;
    const step = props.tickInterval <= 0 ? dur / 10 : props.tickInterval;
    const out: Tick[] = [];
    const count = Math.floor(dur / step + 1e-9);
    for (let i = 0; i <= count; i++) {
        const t = i * step;
        const ratio = t / dur;
        const isMajor = i % props.labelEvery === 0;
        out.push({
            t,
            pct: `${(ratio * 100).toFixed(4)}%`,
            isMajor,
            label: isMajor
                ? `${t.toFixed(props.labelDecimals)}${props.unit}`
                : null,
        });
    }
    return out;
});
</script>

<template>
    <div :class="cn('timeline-ruler', props.class)" role="presentation">
        <span
            v-for="tick in ticks"
            :key="tick.t"
            class="timeline-ruler__tick"
            :class="{ 'is-major': tick.isMajor }"
            :style="{ left: tick.pct }"
        >
            <span v-if="tick.label" class="timeline-ruler__label">{{ tick.label }}</span>
        </span>
    </div>
</template>

<style scoped>
.timeline-ruler {
    position: relative;
    width: 100%;
    height: 18px;
    user-select: none;
    -webkit-user-select: none;
}

.timeline-ruler__tick {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 1px;
    height: 6px;
    background: color-mix(in srgb, var(--foreground) 25%, transparent);
}

.timeline-ruler__tick.is-major {
    height: 10px;
    background: color-mix(in srgb, var(--foreground) 50%, transparent);
}

.timeline-ruler__label {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: var(--type-micro, 0.625rem);
    color: var(--muted-foreground);
    white-space: nowrap;
}
</style>
