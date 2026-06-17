<template>
    <div
        class="border-progress"
        :class="cn(props.class)"
        :data-coverage="props.coverage ?? 'full-ring'"
        :data-milestone="milestoneEdge ? '' : undefined"
        :style="rootStyle"
        role="progressbar"
        :aria-valuenow="ariaNow"
        aria-valuemin="0"
        :aria-valuemax="max"
    >
        <!-- The masked-conic RING — the element's BORDER, not a floating bar. An
             absolutely-positioned ring layer (inset:0, matching the host radius)
             whose `conic-gradient` is mask-composited so ONLY the border band
             paints (padding-box EXCLUDED from border-box → the radius-following
             cut-out). The host INTERIOR is untouched: a default-slotted glass
             card still transmits the backdrop THROUGH its content box. -->
        <div class="border-progress__ring" aria-hidden="true" />
        <div class="border-progress__content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";
import { spectrumStops } from "./composables/useBorderSpectrum";
import {
    BORDER_PROGRESS_DEFAULT_SPECTRUM,
    BORDER_PROGRESS_WIDTH_DEFAULT,
    BORDER_PROGRESS_RADIUS_DEFAULT,
    type BorderProgressCoverage,
    type BorderProgressMilestone,
    type BorderProgressMilestoneEvent,
} from "./constants";

defineOptions({ name: "BorderProgress" });

export interface BorderProgressProps {
    /** The progress scalar. 0..1 (or 0..`max`) drives the registered conic angle. */
    value: number;
    /** The value-axis ceiling. Default `1` (a 0..1 scalar; pass `100` for percent). */
    max?: number;
    /** `full-ring` (default) sweeps the perimeter; `bottom-edge` paints only the bottom band. */
    coverage?: BorderProgressCoverage;
    /**
     * The conic color stops — CSS color strings. Default the LIBRARY brand ramp
     * (the `--section-color-*`/`--viz-*` tokens, resolved in the cascade). A
     * consumer passes its OWN phase palette (presets-in-consumers — no consumer
     * hue enters a library token). CONCRETE anchors are walked OKLCH/shorter-hue;
     * `var(--…)` token anchors pass through to the live cascade.
     */
    stops?: readonly string[];
    /** The ring thickness in px (default within the 10-14px envelope). */
    width?: number;
    /** The host border-radius in px the ring follows. Default 16. */
    radius?: number;
    /**
     * Phase-edge boundaries. The ring fires `milestone` + (PRM-gated) pulses when
     * `value` crosses one. The consumer owns the phase colors (the chassis
     * `--phase-color` cascade precedent — the milestone is the EVENT seam).
     */
    milestones?: readonly BorderProgressMilestone[];
    /** Pass-through class on the root. */
    class?: string;
}

const props = defineProps<BorderProgressProps>();

const emit = defineEmits<{
    milestone: [event: BorderProgressMilestoneEvent];
}>();

const max = computed(() => props.max ?? 1);
const fraction = computed(() => {
    const m = max.value || 1;
    const f = props.value / m;
    return f < 0 ? 0 : f > 1 ? 1 : f;
});
const ariaNow = computed(() => props.value);

// The spectrum walk — the CONSUME (the brand ramp via the /color leaf). The
// resolved stops are written as a `--border-progress-spectrum` gradient-stop list
// the conic-gradient reads. CONCRETE anchors are sampled OKLCH/shorter-hue; the
// default `var(--…)` token ramp passes through to the live cascade.
const spectrum = computed<string[]>(() =>
    spectrumStops(props.stops ?? BORDER_PROGRESS_DEFAULT_SPECTRUM),
);
const spectrumStopList = computed(() => {
    const s = spectrum.value;
    const n = s.length;
    if (n === 1) return `${s[0]}, ${s[0]}`;
    return s
        .map((color, i) => `${color} ${((i / (n - 1)) * 100).toFixed(2)}%`)
        .join(", ");
});

// The milestone-edge state (the `data-milestone` PRM-gated pulse). The ring pulses
// for one paint when a boundary is crossed; the emit carries the crossed edge.
const milestoneEdge = ref(false);
const lastFraction = ref(fraction.value);
watch(fraction, (nv, ov) => {
    const list = props.milestones;
    if (!list || list.length === 0) {
        lastFraction.value = nv;
        return;
    }
    const m = max.value || 1;
    for (const ms of list) {
        const edge = ms.at / m;
        if ((ov < edge && nv >= edge) || (ov > edge && nv <= edge)) {
            emit("milestone", { milestone: ms, value: props.value });
            milestoneEdge.value = true;
            requestAnimationFrame(() => {
                milestoneEdge.value = false;
            });
        }
    }
    lastFraction.value = nv;
});

const rootStyle = computed<CSSProperties>(
    () =>
        ({
            // The @property-animated fill drives the conic sweep (it INTERPOLATES;
            // a bare unregistered var() snaps — the §18 registered-property idiom).
            "--border-progress-fill": `${(fraction.value * 100).toFixed(3)}%`,
            "--border-progress-width": `${props.width ?? BORDER_PROGRESS_WIDTH_DEFAULT}px`,
            "--border-progress-radius": `${props.radius ?? BORDER_PROGRESS_RADIUS_DEFAULT}px`,
            "--border-progress-spectrum": spectrumStopList.value,
        }) as CSSProperties,
);
</script>
