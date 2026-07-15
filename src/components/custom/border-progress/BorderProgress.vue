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
import { cn } from "../../_shared/class-names";
import { spectrumStops } from "./composables/useBorderSpectrum";
import {
    BORDER_PROGRESS_DEFAULT_SPECTRUM,
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
    /**
     * The ring thickness in px (default within the 10-14px envelope). UNSET, the
     * ring defers to the `--border-progress-width` cascade token (fallback 12px).
     */
    width?: number;
    /**
     * The host border-radius in px the ring follows. UNSET, the ring defers to
     * the `--border-progress-radius` cascade token (fallback 16px) — so a pill
     * host themes the ring with `--border-progress-radius: var(--radius-pill)`.
     */
    radius?: number;
    /**
     * Phase-edge boundaries. The ring fires `milestone` + (PRM-gated) pulses when
     * `value` crosses one. The consumer owns the phase colors (the chassis
     * `--phase-color` cascade precedent — the milestone is the EVENT seam).
     */
    milestones?: readonly BorderProgressMilestone[];
    /**
     * BI.W-SCROLL-PROGRESS-RIM (atlas C1/#185) — the per-item `[0,1]` STEPPER seam. When
     * provided, the band is partitioned into N equal arcs (one per item) and each item's
     * `[0,1]` scalar fills its OWN arc — so a consumer (the atlas dock-progress) binds
     * PER-ITEM, not only the aggregate `value`. Each scalar is clamped to `[0,1]`; the arc
     * hues walk the spectrum across the segments (the rainbow spread). UNSET, the aggregate
     * single-fill sweep (`value`) paints (byte-identical). The successor-contract half of
     * ask #23 — the consume renderer lands on the atlas side.
     */
    segments?: readonly number[];
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
// the conic-gradient reads. The default `var(--…)` token ramp passes through to the
// live cascade SYNCHRONOUSLY (value.js-free, no dynamic load — byte-identical paint).
// CONCRETE anchors show the synchronous interim first, then UPGRADE to the OKLCH/
// shorter-hue perceptual walk on the next tick when `/color/spectrum-walk` resolves
// (BC.W-AX-BP-LAZY — the value.js spectrum walk rides a dynamic `import()` boundary;
// PROMOTED to the shared `/color` leaf at BI.W-SCROLL-PROGRESS-RIM).
const spectrum = ref<string[]>([]);
const resolveSpectrum = () => {
    const stops = props.stops ?? BORDER_PROGRESS_DEFAULT_SPECTRUM;
    // The synchronous result (the `var()` pass-through or the concrete-anchor
    // interim); the cold path upgrades `spectrum` via the callback on the next tick.
    spectrum.value = spectrumStops(stops, undefined, (walked) => {
        // Guard the stale-write race: only adopt the upgrade if the live stops still
        // match the request that fired this load.
        if ((props.stops ?? BORDER_PROGRESS_DEFAULT_SPECTRUM) === stops) {
            spectrum.value = walked;
        }
    });
};
resolveSpectrum();
watch(() => props.stops, resolveSpectrum);
// THE FILL-SCALED STOP LIST (BG.W-DOCK-SCROLL-PROGRESS — the sweep made real).
// The stops position at `calc(var(--border-progress-fill) * f)` so the spectrum
// spans the FILLED extent and the `transparent var(--border-progress-fill)` front
// in the gradient lands exactly at the last stop — a hard fill edge that SWEEPS as
// the registered <percentage> fill interpolates. The prior fixed `0..100%`
// positions were the inert-fill defect: CSS clamps a non-decreasing stop list, so
// `transparent var(--fill)` (fill < 100%) clamped UP past the 100% spectrum tail
// and the ring painted the FULL perimeter at EVERY value (live-verified at 42% —
// the fill never swept).
const spectrumStopList = computed(() => {
    const s = spectrum.value;
    const n = s.length;
    const at = (f: number) =>
        `calc(var(--border-progress-fill, 0%) * ${f.toFixed(4)})`;
    if (n === 1) return `${s[0]} 0%, ${s[0]} ${at(1)}`;
    return s.map((color, i) => `${color} ${at(i / (n - 1))}`).join(", ");
});

// BI.W-SCROLL-PROGRESS-RIM (atlas C1/#185) — the PER-ITEM stepper stop list. When
// `segments` is provided the band is N equal arcs; arc i spans [i/N, (i+1)/N] and its
// item's clamped [0,1] scalar fills [i/N, i/N + seg/N], transparent to (i+1)/N — a stepped
// per-item read (the atlas binds each item, not only the aggregate). The arc hues walk the
// resolved spectrum across the segments. The gradient positions are non-decreasing (CSS
// clamps), so the fill is `100%` in this mode (the base recipe's trailing `transparent
// var(--fill)` is a no-op at the tail; this stop list encodes its own transparent bands).
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const segmentStopList = computed<string | null>(() => {
    const segs = props.segments;
    if (!segs || segs.length === 0) return null;
    const s = spectrum.value;
    const N = segs.length;
    const colorAt = (i: number) => {
        if (s.length === 0) return "var(--section-color-7)";
        const idx = N <= 1 ? 0 : Math.round((i / (N - 1)) * (s.length - 1));
        return s[Math.min(s.length - 1, Math.max(0, idx))];
    };
    const pct = (f: number) => `${(f * 100).toFixed(3)}%`;
    const out: string[] = [];
    for (let i = 0; i < N; i++) {
        const base = i / N;
        const filled = base + clamp01(segs[i]) / N;
        const next = (i + 1) / N;
        const c = colorAt(i);
        out.push(
            `${c} ${pct(base)}`,
            `${c} ${pct(filled)}`,
            `transparent ${pct(filled)}`,
            `transparent ${pct(next)}`,
        );
    }
    return out.join(", ");
});
// The per-item mode is active IFF a non-empty `segments` array is supplied.
const perItem = computed(() => (props.segments?.length ?? 0) > 0);

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

// PROPS DEFER TO THE CASCADE WHEN UNSET (BG.W-DOCK-SCROLL-PROGRESS — token-first):
// the inline `--border-progress-width`/`--border-progress-radius` customs are
// written ONLY when the prop is provided, so an unset prop lets an ancestor theme
// the ring off the tokens (`--border-progress-radius: var(--radius-pill)` follows a
// pill host with zero measurement); the CSS `var(…, 12px)`/`var(…, 16px)` fallbacks
// (border-progress.css) keep the JS defaults byte-identical for the bare mount.
const rootStyle = computed<CSSProperties>(
    () =>
        ({
            // The @property-animated fill drives the conic sweep (it INTERPOLATES;
            // a bare unregistered var() snaps — the §18 registered-property idiom). In
            // the PER-ITEM stepper mode the fill pins `100%` (the segment stop list
            // encodes its own transparent bands ending at 100%, so the base recipe's
            // trailing `transparent var(--fill)` is a tail no-op).
            "--border-progress-fill": perItem.value
                ? "100%"
                : `${(fraction.value * 100).toFixed(3)}%`,
            ...(props.width != null
                ? { "--border-progress-width": `${props.width}px` }
                : {}),
            ...(props.radius != null
                ? { "--border-progress-radius": `${props.radius}px` }
                : {}),
            "--border-progress-spectrum":
                segmentStopList.value ?? spectrumStopList.value,
        }) as CSSProperties,
);
</script>
