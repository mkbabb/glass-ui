<script setup lang="ts">
import { computed, ref } from "vue";
import HoverPopover from "../hover-popover/HoverPopover.vue";
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
 *   AB.W2.T4 (A4 §nested-interactive — Option C): the continuous variant
 *   renders the progressbar rail and the interactive marker buttons as
 *   SIBLINGS, not as parent/child. `.continuous-track[role="progressbar"]`
 *   is a non-interactive aggregate-progress surface; `.continuous-markers
 *   ul[role="list"]` is the focusable marker overlay. The structural
 *   split closes the AA-carry-forward axe `nested-interactive` violation
 *   and (as a side benefit) lets the dots escape the rail's
 *   `overflow: hidden` clip — fixing the AB.W2 B2.a perceived-off-centre
 *   visual artefact in the same DOM rewrite.
 *
 *   AB.W2.T2 (A4 §B2.c): each marker button is wrapped in
 *   `<HoverPopover>` so hover surfaces a color-coded popover with the
 *   segment's `{ label, value, description, state }`. Consumers override
 *   the popover body via the scoped `#popoverContent` slot.
 *
 *   AB.W2.T3 (A2 §B2.b): the `currentSegmentKey` prop stamps
 *   `data-current="true"` on the matching marker so consumers (panel /
 *   W3 raised-rivet styling) can distinguish the active phase from the
 *   transient hovered phase. Hover affects the popover only; the
 *   underlying current marker survives hover-leave.
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
        /**
         * AB.W2.T3 (A2 §B2.b) — current segment key.
         *
         * When set, stamps `data-current="true"` on the matching marker
         * (and `data-completed="true"` on prior markers, derived from
         * each segment's `state`). Consumers read these data hooks for
         * panel rendering ("show CURRENT, not stale hovered") and W3 will
         * read them for the raised-rivet phase-bus echo styling.
         *
         * Hover affects only the floating popover; the `data-current`
         * marker survives hover-leave so the panel's current-phase
         * binding does not flicker.
         */
        currentSegmentKey?: string;
        /**
         * AB.W2.T2 (A4 §B2.c) — disable the default per-marker
         * HoverPopover. Useful when a consumer wants to fully own the
         * hover affordance (e.g. anchor a single popover externally). The
         * dot still emits `hover` / `click` events.
         */
        disablePopover?: boolean;
    }>(),
    {
        variant: "scrubber",
        modelValue: 0,
        disablePopover: false,
    },
);

const emit = defineEmits<{
    // Scrubber events ──────────────────────────────────────────────
    "update:modelValue": [v: number];
    scrubStart: [];
    scrubEnd: [];
    // Segmented + continuous events ────────────────────────────────
    /** Segment dot hover-enter (mouseenter + focus). */
    hover: [payload: { key: string; segment: TimelineSegment }];
    /** Segment dot hover-leave (mouseleave + blur). AB.W2.T3 (A2 §B2.b)
     *  — lets consumers blend hover-over-current ("hovered wins; on
     *  hover-leave, current returns"). */
    hoverEnd: [payload: { key: string; segment: TimelineSegment }];
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

function onSegmentLeave(seg: TimelineSegment) {
    emit("hoverEnd", { key: seg.key, segment: seg });
}

/**
 * AB.W2.T2/T3 — HoverPopover-driven hover state.
 *
 * The popover's debounced `v-model:open` state is the authoritative
 * hover signal for the continuous variant: it inherits reka-ui's
 * `hoverOpenDelay`/`closeDelay` cadence, so the pointer skim across
 * the trigger edge (and the popover content overlapping the dot)
 * does not flicker `hover`/`hoverEnd` events. Raw `mouseenter` /
 * `mouseleave` on the bare-fallback dot (when `disablePopover=true`)
 * still emits the same event surface — consumers see one contract.
 */
function onPopoverOpenChange(seg: TimelineSegment, open: boolean) {
    if (open) onSegmentHover(seg);
    else onSegmentLeave(seg);
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
    // The per-region inline width comes from the geometry above; the
    // per-region `--continuous-fill-width` CSS var (set inline) is
    // consumed by `.continuous-region-fill` to clip the gradient to the
    // active progress fraction. W2.T4 painted the variable as a clip
    // mask on a child element so the var is actually load-bearing in
    // the rendered tree (W3 will lean on this substrate for the
    // phase-bus echo).
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

// AB.W2.T2 — default popover content rendering: read `value` shape if the
// consumer supplied the AA-canonical `{ label, value, description, state }`
// payload (the speedtest PhaseDetail), otherwise fall back to the
// segment's own label/state. The slot scope exposes the full segment so
// consumers can override entirely.
interface DefaultPopoverPayload {
    label?: string;
    value?: unknown;
    description?: string;
    state?: string;
}

function popoverPayloadFor(seg: TimelineSegment): DefaultPopoverPayload {
    const v = (seg.value ?? null) as DefaultPopoverPayload | null;
    return {
        label: v?.label ?? seg.label,
        value: v?.value,
        description: v?.description,
        state: v?.state ?? seg.state,
    };
}
</script>

<template>
    <!-- Continuous variant (AA.W1 / A4 §S-17 + AB.W2.T1+T4) ─────────
         Option C structural split: the rail and the marker buttons are
         SIBLINGS, not parent/child. `.continuous-track[role="progressbar"]`
         is a non-interactive aggregate-progress surface (no focusable
         descendants — fixes axe `nested-interactive`); `.continuous-markers`
         is a sibling `<ul role="list">` overlay carrying the per-phase
         interactive buttons. The marker list lives outside the rail's
         `overflow: hidden` clip, so the dots' outer 16px box paints in
         full (fixes the AB.W2 B2.a perceived-off-centre artefact). -->
    <div
        v-if="variant === 'continuous'"
        class="timeline-row timeline-continuous"
        role="group"
        :aria-label="continuousAriaLabel"
    >
        <div class="continuous-track-wrap">
            <div
                class="continuous-track"
                role="progressbar"
                :aria-valuemin="0"
                :aria-valuemax="segmentList.length"
                :aria-valuenow="continuousAriaValueNow"
                :aria-label="continuousAriaLabel"
            >
                <!-- N region children, each absolute-positioned within the rail.
                     The region's inline `--continuous-fill-width` is the LIVE
                     binding for the active-fill paint (consumed by
                     `.continuous-region-fill` below). -->
                <div
                    v-for="(seg, i) in segmentList"
                    :key="seg.key"
                    class="continuous-region"
                    :class="[`state-${seg.state}`, i === segmentList.length - 1 && 'is-last']"
                    :data-state="seg.state"
                    :style="{
                        left: `${regionLeft(i) * 100}%`,
                        width: `${regionWidth(i) * 100}%`,
                        '--region-gradient': continuousRegionBackground(seg),
                        '--continuous-fill-width': `${continuousFillWidth(seg) * 100}%`,
                    }"
                    aria-hidden="true"
                >
                    <!-- AB.W2.T4 — the fill child clips the gradient to
                         `--continuous-fill-width`. Pending regions render
                         no fill (the var resolves to 0%); completed
                         regions paint 100%; active regions paint the
                         current progress fraction. Without this child
                         the CSS var was computed-but-unused, which made
                         partial fill invisible. -->
                    <div class="continuous-region-fill" />
                </div>
            </div>

            <!-- Marker list — sibling of the progressbar rail. Lives
                 outside the rail's clip mask so the dots' outer 16px
                 box paints in full. Each marker is `position: absolute`
                 over the wrap, anchored at `boundaryX(i) * 100%`. -->
            <ul
                v-if="segmentList.length > 0"
                class="continuous-markers"
                role="list"
                :aria-label="`${continuousAriaLabel} — phase markers`"
            >
                <li
                    v-for="(seg, i) in segmentList"
                    :key="`dot-li-${seg.key}`"
                    class="continuous-marker"
                    role="listitem"
                    :style="{ left: `${boundaryX(i) * 100}%` }"
                >
                    <HoverPopover
                        v-if="!disablePopover"
                        side="top"
                        :side-offset="10"
                        :hover-open-delay="120"
                        :close-delay="160"
                        :class="`timeline-popover timeline-popover-${seg.key}`"
                        @update:open="(open) => onPopoverOpenChange(seg, open)"
                    >
                        <template #trigger>
                            <button
                                type="button"
                                class="continuous-dot segmented-dot"
                                :aria-label="`${seg.label}: ${seg.state}`"
                                :data-state="seg.state"
                                :data-current="seg.key === currentSegmentKey || undefined"
                                :data-completed="seg.state === 'completed' || undefined"
                                @click="onSegmentClick(seg)"
                                @keydown="onSegmentKeydown($event, seg)"
                            >
                                <span class="sr-only">{{ seg.label }}</span>
                            </button>
                        </template>
                        <template #content>
                            <slot name="popoverContent" :segment="seg">
                                <!-- Default color-coded body: reads
                                     gradient.from as the tint so the
                                     accent matches the segment's hue. -->
                                <div
                                    class="timeline-popover-body"
                                    :style="{
                                        '--popover-tint':
                                            typeof seg.gradient === 'object' && seg.gradient
                                                ? seg.gradient.to
                                                : 'var(--foreground)',
                                    }"
                                >
                                    <span class="timeline-popover-label">
                                        {{ popoverPayloadFor(seg).label }}
                                    </span>
                                    <span
                                        v-if="popoverPayloadFor(seg).value != null"
                                        class="timeline-popover-value tabular-nums"
                                    >
                                        {{ popoverPayloadFor(seg).value }}
                                    </span>
                                    <span
                                        v-if="popoverPayloadFor(seg).description"
                                        class="timeline-popover-description"
                                    >
                                        {{ popoverPayloadFor(seg).description }}
                                    </span>
                                    <span class="timeline-popover-state">
                                        {{ popoverPayloadFor(seg).state }}
                                    </span>
                                </div>
                            </slot>
                        </template>
                    </HoverPopover>
                    <!-- Popover-disabled fallback: bare button, same
                         contract minus the HoverPopover wrap. -->
                    <button
                        v-else
                        type="button"
                        class="continuous-dot segmented-dot"
                        :aria-label="`${seg.label}: ${seg.state}`"
                        :data-state="seg.state"
                        :data-current="seg.key === currentSegmentKey || undefined"
                        :data-completed="seg.state === 'completed' || undefined"
                        @mouseenter="onSegmentHover(seg)"
                        @mouseleave="onSegmentLeave(seg)"
                        @focus="onSegmentHover(seg)"
                        @blur="onSegmentLeave(seg)"
                        @click="onSegmentClick(seg)"
                        @keydown="onSegmentKeydown($event, seg)"
                    >
                        <span class="sr-only">{{ seg.label }}</span>
                    </button>
                </li>
            </ul>
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
                    @mouseleave="onSegmentLeave(seg)"
                    @focus="onSegmentHover(seg)"
                    @blur="onSegmentLeave(seg)"
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
            :aria-valuenow="Number(modelValue ?? 0)"
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
        width var(--duration-slow, 0.45s) var(--ease-out, ease-out),
        background var(--duration-fast, 0.2s) var(--ease-standard, ease);
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
    /* AB.W2.T1 — include the dot's border in its 14px box so the
       perceived centre coincides with the math centre. */
    box-sizing: border-box;
    width: var(--timeline-dot-size, 14px);
    height: var(--timeline-dot-size, 14px);
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
   AA.W1 / A4 §S-17 + AB.W2.T1+T4. ONE rounded-pill rail substrate +
   N absolute-positioned region children spanning prev-boundary →
   current-boundary. Per-region gradient drives the visual; optional
   seam dividers at region boundaries are gated by
   `--timeline-continuous-seam-opacity` (set to `0` to suppress
   entirely).

   AB.W2.T4 — structural Option C split: the rail and the marker
   buttons are SIBLINGS inside a relative-positioned `.continuous-
   track-wrap` parent. The marker `<ul>` overlay paints over the rail
   without nesting inside it, so:

     1. The progressbar's `role="progressbar"` no longer has focusable
        descendants (axe `nested-interactive` closed).
     2. The dots' outer 14px box escapes the rail's `overflow: hidden`
        clip — the perceived centre coincides with the math centre
        (B2.a closed). */
.timeline-continuous {
    padding: 0;
    flex: 1 1 0;
    min-width: 0;
}

.continuous-track-wrap {
    position: relative;
    width: 100%;
    /* Reserve vertical space for the dots' outer halo (radius + border +
       hover scale uplift). Pure layout — paints nothing itself. */
    padding-block: calc(var(--timeline-dot-size, 14px) * 0.6);
    margin-block: calc(var(--timeline-dot-size, 14px) * -0.6);
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

/* AB.W2.T4 — fill child paints the per-phase gradient (carried via
   the inline `--region-gradient` CSS var on the parent) up to
   `--continuous-fill-width`. The substrate gestalt: gradient lives on
   the CSS var; the fill child clips the gradient to the active
   progress fraction; completed regions get a full-width fill child
   that composes to 100% paint; pending regions paint nothing. The
   parent region itself does NOT paint a background — the fill child
   is the single source of paint. */
.continuous-region {
    /* No own background — the fill child paints. */
    background: transparent;
}

.continuous-region-fill {
    position: absolute;
    inset: 0;
    width: var(--continuous-fill-width, 0%);
    background: var(--region-gradient, transparent);
    /* Inherit the rail's pill rounding via clip. */
    border-radius: inherit;
    transition: width var(--duration-slow, 0.45s) var(--ease-out, ease-out);
    will-change: width;
    pointer-events: none;
}

/* Completed regions: paint the full gradient end-to-end. */
.continuous-region.state-completed > .continuous-region-fill {
    width: 100%;
}

/* Pending regions: no fill paint (substrate shows through). */
.continuous-region.state-pending > .continuous-region-fill {
    width: 0;
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

/* AB.W2.T4 — marker list overlay. Sibling of the rail; lives outside
   the rail's `overflow: hidden` clip so the dots paint in full. */
.continuous-markers {
    position: absolute;
    inset: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    pointer-events: none;
}

.continuous-marker {
    position: absolute;
    top: 50%;
    /* `left` from inline style (anchored to boundaryX(i) * 100%). */
    transform: translate(-50%, -50%);
    /* The marker container itself is non-interactive; only the inner
       button receives pointer events. AB.W2.T1 — `display: flex`
       collapses the default `list-item` line-box metrics (which added
       a 1px vertical drift between the dot's geometric centre and the
       li's translate anchor); flex sizes the marker box exactly to the
       inner button so the translate centres on the dot's geometric
       middle. `line-height: 0` belt-and-braces the inline-box collapse
       in case the dot ever gains text content beyond the .sr-only span. */
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    pointer-events: none;
}

.continuous-marker > * {
    pointer-events: auto;
}

/* Boundary dot — the marker button. Inherits the dot recipe from
   `.segmented-dot` (radius, border, transition) but overrides the
   layout-coupled positioning (no flex-cell parent anymore). */
.continuous-dot {
    position: relative;
    right: auto;
    /* Layout flow inside the marker `<li>` (the marker handles
       positioning via its own `transform`). The dot is intrinsically
       sized; we drop the segmented-dot's translate transform. */
    transform: none;
    /* AB.W2.T1 (A4 §B2 + A2 §B2.a) — opaque background so the rail
       does not bleed through; symmetric `box-shadow` so the perceived
       centre coincides with the math centre; `box-sizing: border-box`
       (inherited from segmented-dot) keeps the 2px border inside the
       14px box. */
    background: var(--background, white);
    box-shadow: 0 0 4px color-mix(in srgb, var(--shadow-color) 22%, transparent);
}

.continuous-dot:hover,
.continuous-dot:focus-visible {
    /* No translate compensation — pure scale around the marker's centre. */
    transform: scale(1.2);
}

/* AB.W2.T3 — `data-current` marks the active phase regardless of hover
   state. Per-phase color hooks (`data-state` + the segment's gradient
   tint) survive the structural split so W3 can paint the raised-rivet
   echo without DOM surgery. */
.continuous-dot[data-current] {
    background: color-mix(
        in srgb,
        var(--accent, var(--foreground)) 30%,
        var(--background, white)
    );
}

.continuous-dot[data-state="completed"] {
    background: color-mix(
        in srgb,
        var(--success, var(--foreground)) 30%,
        var(--background, white)
    );
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
    .continuous-region-fill {
        transition-duration: 0.01ms;
    }
    .continuous-dot {
        transition-duration: 0.01ms;
    }
}
</style>

<!-- AB.W2.T2 — popover panel styling. Lives in a NON-scoped <style>
     block because the HoverPopover content portals out of this
     component (rendered into the body via reka-ui's HoverCardPortal),
     so scoped CSS doesn't reach it. The .timeline-popover class is
     applied to the portaled HoverPopover content via the `:class`
     prop; the popover body span/div tree lives under it. -->
<style>
.timeline-popover {
    /* Tighter than the default hover-popover padding — this surface
       is content-dense (label + value + description + state). */
    padding: 0.5rem 0.75rem;
    max-width: 18rem;
}

.timeline-popover .timeline-popover-body {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    /* Per-phase tint via the inline --popover-tint var. The left
       border picks up the segment's hue so the popover reads as
       "this phase's data". */
    border-left: 2px solid var(--popover-tint, var(--foreground));
    padding-left: 0.5rem;
}

.timeline-popover .timeline-popover-label {
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--popover-tint, var(--foreground));
    font-size: var(--type-small, 0.85rem);
}

.timeline-popover .timeline-popover-value {
    font-family: var(--font-mono, "Fira Code", monospace);
    font-weight: 500;
    color: var(--popover-foreground, var(--foreground));
    font-size: var(--type-body, 1rem);
}

.timeline-popover .timeline-popover-description {
    font-size: var(--type-small, 0.85rem);
    color: var(--muted-foreground);
    line-height: 1.4;
}

.timeline-popover .timeline-popover-state {
    font-size: var(--type-mono-caption, 0.75rem);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted-foreground);
    font-family: var(--font-mono, "Fira Code", monospace);
}
</style>
