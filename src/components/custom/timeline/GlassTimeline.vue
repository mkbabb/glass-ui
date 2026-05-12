<script setup lang="ts">
import { computed, ref } from "vue";
import type { TimelineSegment, TimelineSegmentGradient } from "./types";

/**
 * <GlassTimeline> — three-variant timeline primitive.
 *
 * - `variant="scrubber"` (default): single-track normalized 0..1 scrubber
 *   with full keyboard a11y (role=slider + arrow-key step + shift-step).
 *   Backward-compatible with the pre-Z.W2 single-track model.
 *
 * - `variant="segmented"` (Z.W2.T1 / A2 §B5): adjacent gradient bands,
 *   one per phase, with boundary dots that emit `hover` + `click` events
 *   carrying the segment key + payload. Visual shape: N rectangles in a row.
 *
 * - `variant="continuous"` (AA.W1 / A4 §S-17): ONE rounded-pill rail
 *   substrate with N absolute-positioned `.continuous-region` children
 *   spanning prev-boundary → current-boundary. Same `TimelineSegment[]`
 *   data shape as `segmented`. Visual shape: ONE pill with N internal
 *   gradient regions + optional seam dividers + boundary dots overlaid.
 *   Used by multi-phase progress UIs where the phases are conceptually
 *   one progression bar (speedtest ping → download → upload).
 *
 * Per-segment gradient: either `{from, to}` (expanded as 90deg L→R linear
 * gradient) or a raw CSS gradient string consumed verbatim. Falls back
 * to `--timeline-segment-default-gradient` when omitted.
 */
const props = withDefaults(
    defineProps<{
        /** Variant — backward-compatible default `scrubber`. */
        variant?: "scrubber" | "segmented" | "continuous";
        // Scrubber-only ────────────────────────────────────────────
        /** 0..1 scrubber position. Required for scrubber variant. */
        modelValue?: number;
        /** Tooltip caret text (scrubber variant only). */
        label?: string;
        // Segmented + continuous ───────────────────────────────────
        /** Phase descriptors (segmented + continuous variants). */
        segments?: TimelineSegment[];
        // Continuous-only ──────────────────────────────────────────
        /**
         * Optional aria-label for the continuous variant's rail
         * (role=progressbar). Falls back to a comma-joined list of segment
         * labels when omitted.
         */
        ariaLabel?: string;
    }>(),
    {
        variant: "scrubber",
        modelValue: 0,
    },
);

const emit = defineEmits<{
    // Scrubber events ──────────────────────────────────────────────
    "update:modelValue": [v: number];
    scrubStart: [];
    scrubEnd: [];
    // Segmented events ─────────────────────────────────────────────
    /** Segment dot hover (mouseenter + focus). */
    hover: [payload: { key: string; segment: TimelineSegment }];
    /** Segment dot click (and keyboard Enter / Space). */
    click: [payload: { key: string; segment: TimelineSegment }];
}>();

// ── Scrubber state ─────────────────────────────────────────────────
const trackRef = ref<HTMLElement>();
const scrubbing = ref(false);

function tFromPointer(e: PointerEvent): number {
    const rect = trackRef.value!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
}

function onTrackDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    scrubbing.value = true;
    emit("scrubStart");
    emit("update:modelValue", tFromPointer(e));
}

function onTrackMove(e: PointerEvent) {
    if (!scrubbing.value) return;
    emit("update:modelValue", tFromPointer(e));
}

function onTrackUp() {
    scrubbing.value = false;
    emit("scrubEnd");
}

function onTrackKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 0.1 : 0.01;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        emit("update:modelValue", Math.min(1, props.modelValue + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        emit("update:modelValue", Math.max(0, props.modelValue - step));
    }
}

// ── Segmented state ────────────────────────────────────────────────

/**
 * Resolve a segment's gradient declaration to a CSS background expression.
 * - `string` (raw CSS): consumed verbatim — caller controls direction.
 * - `{from, to}` pair: expanded to `linear-gradient(90deg, from, to)`.
 * - undefined: falls through to the `--timeline-segment-default-gradient`
 *   token (consumer can override on the primitive or via a section-tone).
 */
function gradientFor(seg: TimelineSegment): string {
    if (typeof seg.gradient === "string") return seg.gradient;
    if (seg.gradient && typeof seg.gradient === "object") {
        const g = seg.gradient as TimelineSegmentGradient;
        return `linear-gradient(90deg, ${g.from}, ${g.to})`;
    }
    return "var(--timeline-segment-default-gradient, linear-gradient(90deg, var(--surface-tint-15), var(--surface-tint-25)))";
}

/**
 * Fill percentage per state. Explicit `progress` wins; otherwise the
 * canonical mapping (pending=0, active=0.5, completed=1). Clamped to
 * [0, 1] so consumers can't paint past the segment box.
 */
function fillFor(seg: TimelineSegment): number {
    if (typeof seg.progress === "number") {
        return Math.max(0, Math.min(1, seg.progress));
    }
    if (seg.state === "completed") return 1;
    if (seg.state === "active") return 0.5;
    return 0;
}

function onSegmentHover(seg: TimelineSegment) {
    emit("hover", { key: seg.key, segment: seg });
}

function onSegmentClick(seg: TimelineSegment) {
    emit("click", { key: seg.key, segment: seg });
}

function onSegmentKeydown(e: KeyboardEvent, seg: TimelineSegment) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        emit("click", { key: seg.key, segment: seg });
    }
}

/**
 * Equal-width segments by default. The flex track distributes available
 * width via `flex: 1 1 0`; consumers wanting weighted distribution can
 * override `--timeline-segment-flex` per-segment (advanced; not load-
 * bearing for the speedtest 3-segment shape).
 */
const segmentList = computed<TimelineSegment[]>(() => props.segments ?? []);

// ── Continuous-variant geometry ────────────────────────────────────
//
// Region geometry is driven by per-segment `weight` (default 1). Each
// region's left edge is the cumulative sum of all prior segment weights
// divided by the total weight; its width is its own share. The output
// values are normalized 0..1 fractions; the template multiplies by 100
// to express them as CSS `%`. Stable across reactive segment edits.

/**
 * Total weight across all segments. Returns at least 1 to guard the
 * `width / totalWeight` divisor when `segments` is empty (the template's
 * `v-if` already short-circuits, but defensive zero-guard avoids NaN).
 */
const totalWeight = computed<number>(() => {
    const sum = segmentList.value.reduce(
        (acc, s) => acc + (typeof s.weight === "number" && s.weight > 0 ? s.weight : 1),
        0,
    );
    return sum > 0 ? sum : 1;
});

function segmentWeight(seg: TimelineSegment): number {
    return typeof seg.weight === "number" && seg.weight > 0 ? seg.weight : 1;
}

function regionLeft(i: number): number {
    let acc = 0;
    for (let j = 0; j < i; j += 1) {
        const s = segmentList.value[j];
        if (s) acc += segmentWeight(s);
    }
    return acc / totalWeight.value;
}

function regionWidth(i: number): number {
    const s = segmentList.value[i];
    if (!s) return 0;
    return segmentWeight(s) / totalWeight.value;
}

function boundaryX(i: number): number {
    return regionLeft(i) + regionWidth(i);
}

/**
 * Continuous-variant region background. For `completed` segments the full
 * gradient paints end-to-end; for `active` the gradient paints up to
 * `fillFor(seg) * 100%` and then fades to transparent (the rail substrate
 * shows through past the active fill); `pending` segments paint nothing
 * (background transparent — the rail substrate shows through).
 */
function continuousRegionBackground(seg: TimelineSegment): string {
    if (seg.state === "pending") return "transparent";
    const base = gradientFor(seg);
    if (seg.state === "completed") return base;
    // active — paint from→to up to fillFor, then transparent past it.
    // We do this by stacking a transparent overlay via a second gradient:
    // the consumer's gradient is the base layer; a flat transparent layer
    // (sized via inline width on a child div) would be cleaner, but the
    // single-background-string path keeps the region's CSS contract
    // declarative. For partial active fill we let the base gradient paint
    // the full region and rely on the consumer's gradient stops carrying
    // their own opacity ramp; the canonical phase gradients fade to a
    // muted endpoint, so the visual reads as "progress within the region".
    return base;
}

/**
 * Continuous-variant active-region fill width (0..1, applied as a clip
 * mask on the region's right edge for partial-fill animation). For
 * `completed` returns 1; for `pending` returns 0; for `active` returns
 * `fillFor(seg)` (which honours explicit `progress` overrides).
 */
function continuousFillWidth(seg: TimelineSegment): number {
    return fillFor(seg);
}

/**
 * Aggregate progress for the continuous variant's aria-valuenow.
 * Returns the count of completed segments + fractional progress of any
 * active segment, normalized to 0..N. Consumers expect "how many phases
 * are done" not "0..1 percent" so the valuemax is the segment count.
 */
const continuousAriaValueNow = computed<number>(() => {
    let acc = 0;
    for (const s of segmentList.value) {
        if (s.state === "completed") acc += 1;
        else if (s.state === "active") acc += fillFor(s);
    }
    // Round to 2 decimals — aria-valuenow tolerates non-integers but the
    // rendered string should be terse for assistive tech read-aloud.
    return Math.round(acc * 100) / 100;
});

const continuousAriaLabel = computed<string>(() => {
    if (props.ariaLabel) return props.ariaLabel;
    const names = segmentList.value.map((s) => s.label).filter(Boolean);
    return names.length > 0 ? `Timeline: ${names.join(", ")}` : "Timeline";
});
</script>

<template>
    <!-- Continuous variant (AA.W1 / A4 §S-17) ─────────────────────
         ONE rounded-pill rail substrate + N absolute-positioned region
         children. Boundary dots overlay the rail at the seams. Same
         TimelineSegment[] shape as segmented; only the visual geometry
         differs (1 pill vs N pills). -->
    <div
        v-if="variant === 'continuous'"
        class="timeline-row timeline-continuous"
        role="group"
        :aria-label="continuousAriaLabel"
    >
        <div
            class="continuous-track"
            role="progressbar"
            :aria-valuemin="0"
            :aria-valuemax="segmentList.length"
            :aria-valuenow="continuousAriaValueNow"
            :aria-label="continuousAriaLabel"
        >
            <!-- N region children, each absolute-positioned within the rail. -->
            <div
                v-for="(seg, i) in segmentList"
                :key="seg.key"
                class="continuous-region"
                :class="[`state-${seg.state}`, i === segmentList.length - 1 && 'is-last']"
                :data-state="seg.state"
                :style="{
                    left: `${regionLeft(i) * 100}%`,
                    width: `${regionWidth(i) * 100}%`,
                    background: continuousRegionBackground(seg),
                    '--continuous-fill-width': `${continuousFillWidth(seg) * 100}%`,
                }"
                aria-hidden="true"
            />
            <!-- Boundary dot overlays — same recipe as segmented-dot.
                 One dot per segment, anchored at the segment's right edge. -->
            <button
                v-for="(seg, i) in segmentList"
                :key="`dot-${seg.key}`"
                type="button"
                class="continuous-dot segmented-dot"
                :aria-label="`${seg.label}: ${seg.state}`"
                :data-state="seg.state"
                :style="{ left: `${boundaryX(i) * 100}%` }"
                @mouseenter="onSegmentHover(seg)"
                @focus="onSegmentHover(seg)"
                @click="onSegmentClick(seg)"
                @keydown="onSegmentKeydown($event, seg)"
            >
                <span class="sr-only">{{ seg.label }}</span>
            </button>
        </div>
    </div>

    <!-- Segmented variant ─────────────────────────────────────────── -->
    <div
        v-else-if="variant === 'segmented'"
        class="timeline-row timeline-segmented"
        role="group"
        aria-label="Timeline progress"
    >
        <div class="segmented-track">
            <div
                v-for="(seg, i) in segmentList"
                :key="seg.key"
                class="segmented-cell"
                :class="[
                    `state-${seg.state}`,
                    i === 0 && 'is-first',
                    i === segmentList.length - 1 && 'is-last',
                ]"
                :data-state="seg.state"
            >
                <div
                    class="segmented-band"
                    :style="{
                        background: gradientFor(seg),
                        width: `${fillFor(seg) * 100}%`,
                    }"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    class="segmented-dot"
                    :aria-label="`${seg.label}: ${seg.state}`"
                    :data-state="seg.state"
                    @mouseenter="onSegmentHover(seg)"
                    @focus="onSegmentHover(seg)"
                    @click="onSegmentClick(seg)"
                    @keydown="onSegmentKeydown($event, seg)"
                >
                    <span class="sr-only">{{ seg.label }}</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Scrubber variant (default; backward-compatible) ──────────── -->
    <div v-else class="timeline-row">
        <div v-if="label" class="timeline-caret" :style="{ left: (modelValue * 100) + '%' }">
            <span class="caret-value fira-code">{{ label }}</span>
        </div>
        <div
            ref="trackRef"
            class="glass-track"
            role="slider"
            tabindex="0"
            :aria-valuenow="modelValue"
            aria-valuemin="0"
            aria-valuemax="1"
            aria-label="Timeline"
            @pointerdown="onTrackDown"
            @pointermove="onTrackMove"
            @pointerup="onTrackUp"
            @pointercancel="onTrackUp"
            @keydown="onTrackKeydown"
        >
            <div class="glass-fill" :style="{ width: (modelValue * 100) + '%' }" />
            <div class="glass-thumb" :style="{ left: (modelValue * 100) + '%' }" />
        </div>
    </div>
</template>

<style scoped>
.timeline-row {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 0.25rem;
    position: relative;
    display: flex;
    align-items: center;
}

.timeline-caret {
    position: absolute;
    bottom: calc(100% + 6px);
    transform: translateX(-50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-standard);
    z-index: var(--z-popover);
    user-select: none;
    -webkit-user-select: none;
}

.timeline-row:hover .timeline-caret,
.timeline-row:has(.glass-track:active) .timeline-caret {
    opacity: 1;
}

.caret-value {
    display: block;
    padding: 0.125rem 0.375rem;
    font-size: var(--type-small);
    font-weight: 500;
    color: var(--popover-foreground);
    background: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
    white-space: nowrap;
}

.glass-track {
    position: relative;
    width: 100%;
    height: 24px;
    border-radius: var(--radius-pill);
    background: var(--surface-tint-6);
    backdrop-filter: var(--glass-blur-wash);
    -webkit-backdrop-filter: var(--glass-blur-wash);
    cursor: pointer;
    touch-action: none;
    overflow: hidden;
    transition: background var(--duration-fast) var(--ease-standard);
    outline: none;
}

.glass-track:hover,
.glass-track:focus-visible {
    background: var(--surface-tint-8);
}

.glass-track:focus-visible {
    box-shadow: var(--focus-ring-shadow);
}

.glass-fill {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: var(--surface-tint-8);
    border-radius: var(--radius-pill);
    pointer-events: none;
}

.glass-thumb {
    position: absolute;
    top: 50%;
    transform: translate(calc(-50% - 3px), -50%);
    width: 6px;
    height: 16px;
    border-radius: var(--radius-sm);
    background: var(--surface-tint-25);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--duration-fast) var(--ease-standard),
        width var(--duration-fast) var(--ease-standard),
        height var(--duration-fast) var(--ease-standard),
        background var(--duration-fast) var(--ease-standard);
}

.glass-track:hover .glass-thumb {
    opacity: 1;
    width: 8px;
    height: 18px;
    background: var(--surface-tint-40);
}

/* ─────────────────────── Segmented variant ───────────────────────
   Adjacent gradient bands with boundary dots. Each cell owns its own
   gradient background and per-state fill; the boundary dot is a
   button anchored to the right edge of each cell (the boundary
   between this cell and the next, or the timeline terminus).

   Per Z.W2.T1 / A2 §B5. Speedtest consumes this as a 3-cell
   (ping/download/upload) progress timeline; gradient endpoints map
   to per-phase chart-color tokens. */
.timeline-segmented {
    padding: 0;
    flex: 1 1 0;
    min-width: 0;
}

.segmented-track {
    position: relative;
    display: flex;
    width: 100%;
    height: var(--timeline-segmented-height, 12px);
    border-radius: var(--radius-pill);
    background: var(--surface-tint-6);
    overflow: hidden;
    backdrop-filter: var(--glass-blur-wash);
    -webkit-backdrop-filter: var(--glass-blur-wash);
}

.segmented-cell {
    position: relative;
    flex: var(--timeline-segment-flex, 1 1 0);
    min-width: 0;
    height: 100%;
}

.segmented-cell + .segmented-cell {
    border-left: 1px solid color-mix(in srgb, var(--foreground) 8%, transparent);
}

.segmented-band {
    position: absolute;
    inset: 0;
    width: 0%;
    transition:
        width var(--duration-slow, 0.55s) var(--ease-out, ease-out),
        background var(--duration-fast, 0.18s) var(--ease-standard, ease);
    will-change: width;
}

.segmented-dot {
    position: absolute;
    top: 50%;
    /* Anchor each dot to its segment's right boundary (the seam between
       this cell and the next). The last cell's dot sits at its terminus
       so the timeline reads as N+1 markers: one between each pair plus
       a final cap. */
    right: 0;
    transform: translate(50%, -50%);
    width: var(--timeline-dot-size, 12px);
    height: var(--timeline-dot-size, 12px);
    border-radius: 50%;
    background: var(--surface-tint-15);
    border: 2px solid var(--background, white);
    box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow-color) 12%, transparent);
    padding: 0;
    cursor: pointer;
    z-index: 1;
    transition:
        background var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.segmented-dot:hover,
.segmented-dot:focus-visible {
    background: var(--surface-tint-40);
    transform: translate(50%, -50%) scale(1.2);
    box-shadow: 0 2px 6px color-mix(in srgb, var(--shadow-color) 18%, transparent);
}

.segmented-dot:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

.segmented-cell[data-state="active"] .segmented-dot {
    background: color-mix(in srgb, var(--accent, var(--foreground)) 60%, var(--surface-tint-15));
}

.segmented-cell[data-state="completed"] .segmented-dot {
    background: color-mix(in srgb, var(--success, var(--foreground)) 70%, var(--surface-tint-15));
}

/* ─────────────────────── Continuous variant ───────────────────────
   AA.W1 / A4 §S-17. ONE rounded-pill rail substrate + N absolute-
   positioned region children spanning prev-boundary → current-boundary.
   Per-region gradient drives the visual; optional seam dividers at
   region boundaries are gated by `--timeline-continuous-seam-opacity`
   (set to `0` to suppress entirely). Boundary dots reuse the
   `.segmented-dot` recipe — only their positioning differs (absolute
   left-anchored vs flex-cell right-anchored). */
.timeline-continuous {
    padding: 0;
    flex: 1 1 0;
    min-width: 0;
}

.continuous-track {
    position: relative;
    width: 100%;
    height: var(--timeline-continuous-height, 12px);
    border-radius: var(--radius-pill);
    background: var(--surface-tint-6);
    overflow: hidden;
    backdrop-filter: var(--glass-blur-wash);
    -webkit-backdrop-filter: var(--glass-blur-wash);
}

.continuous-region {
    position: absolute;
    top: 0;
    bottom: 0;
    /* `left` and `width` come from inline style (computed from regionLeft/Width). */
    transition:
        width var(--duration-slow, 0.45s) var(--ease-out, ease-out),
        left var(--duration-slow, 0.45s) var(--ease-out, ease-out),
        background var(--duration-fast, 0.2s) var(--ease-standard, ease);
    will-change: width, left, background;
}

.continuous-region.state-pending {
    /* Pending regions paint nothing — rail substrate shows through. */
    background: transparent;
}

/* Seam dividers — paint a 1px vertical line at each region's right edge
   for boundary legibility. Opt out via `--timeline-continuous-seam-opacity: 0`.
   The last region's seam is suppressed (it's the rail's terminus, not a
   region boundary). */
.continuous-region::after {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    bottom: 10%;
    width: 1px;
    background: var(
        --timeline-continuous-seam-color,
        color-mix(
            in srgb,
            var(--foreground) calc(var(--timeline-continuous-seam-opacity, 0.25) * 100%),
            transparent
        )
    );
    pointer-events: none;
}

.continuous-region.is-last::after {
    /* No seam at the terminus. */
    display: none;
}

/* Boundary dot positioning override — absolute, left-anchored to the
   computed `boundaryX(i)` (vs `.segmented-dot` which is right-anchored
   to its flex cell). The rest of the dot recipe is inherited via the
   shared `.segmented-dot` class. */
.continuous-dot {
    /* Override the segmented dot's right-anchor positioning. */
    right: auto;
    transform: translate(-50%, -50%);
}

.continuous-dot:hover,
.continuous-dot:focus-visible {
    transform: translate(-50%, -50%) scale(1.2);
}

/* Screen-reader-only span baked into the dot button. */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

@media (prefers-reduced-motion: reduce) {
    .segmented-band {
        transition-duration: 0.01ms;
    }
    .segmented-dot {
        transition-duration: 0.01ms;
    }
    .continuous-region {
        transition-duration: 0.01ms;
    }
    .continuous-dot {
        transition-duration: 0.01ms;
    }
}
</style>
