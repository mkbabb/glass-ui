<script setup lang="ts">
import { computed } from "vue";
import HoverPopover from "../hover-popover/HoverPopover.vue";
import {
    continuousFillWidth,
    createContinuousGeometry,
    popoverPayloadFor,
    stitchedRailGradient,
    stitchedRegionWindow,
} from "./geometry";
import type { TimelineSegment } from "./types";

/**
 * <ContinuousTimeline> — ONE rounded-pill rail substrate with N
 * absolute-positioned region children spanning prev-boundary →
 * current-boundary. Internal variant SFC dispatched from
 * <GlassTimeline variant="continuous">.
 *
 * AA.W1 / A4 §S-17 + AB.W2.T1+T4. Used by multi-phase progress UIs where
 * the phases are conceptually one progression bar (speedtest ping →
 * download → upload).
 *
 * AB.W2.T4 (A4 §nested-interactive — Option C): the progressbar rail and
 * the interactive marker buttons are rendered as SIBLINGS, not as
 * parent/child. `.continuous-track[role="progressbar"]` is a
 * non-interactive aggregate-progress surface; `.continuous-markers
 * ul[role="list"]` is the focusable marker overlay.
 *
 * AB.W2.T2 (A4 §B2.c): each marker button is wrapped in <HoverPopover>
 * so hover surfaces a color-coded popover with the segment's
 * `{ label, value, description, state }`. Consumers override the
 * popover body via the scoped `#popoverContent` slot.
 *
 * AB.W2.T3 (A2 §B2.b): the `currentSegmentKey` prop stamps
 * `data-current="true"` on the matching marker so consumers (panel /
 * W3 raised-rivet styling) can distinguish the active phase from the
 * transient hovered phase. Hover affects the popover only; the
 * underlying current marker survives hover-leave.
 *
 * NON-SCOPED <style> CONTRACT (O.W3 Lane A — Rβ §3.1): the
 * `.timeline-popover` rules live in a non-scoped <style> block at the
 * bottom of THIS SFC because HoverCardPortal escapes scoped CSS. The
 * rules must live in a component that participates in the continuous
 * render path; this is that component.
 */
const props = withDefaults(
    defineProps<{
        segments?: TimelineSegment[];
        /**
         * Optional aria-label for the rail (role=progressbar). Falls back
         * to a comma-joined list of segment labels when omitted.
         */
        ariaLabel?: string;
        /**
         * AB.W2.T3 — current segment key. Stamps `data-current="true"`
         * on the matching marker (and `data-completed="true"` on prior
         * markers, derived from each segment's `state`). Hover affects
         * the popover only; the current marker survives hover-leave so
         * the panel's current-phase binding does not flicker.
         */
        currentSegmentKey?: string;
        /**
         * AB.W2.T2 — disable the default per-marker HoverPopover.
         * Useful when a consumer wants to fully own the hover affordance
         * (e.g. anchor a single popover externally). The dot still emits
         * `hover` / `click` events.
         */
        disablePopover?: boolean;
    }>(),
    {
        disablePopover: false,
    },
);

const emit = defineEmits<{
    /** Segment dot hover-enter (mouseenter + focus). */
    hover: [payload: { key: string; segment: TimelineSegment }];
    /** Segment dot hover-leave (mouseleave + blur). */
    hoverEnd: [payload: { key: string; segment: TimelineSegment }];
    /** Segment dot click (and keyboard Enter / Space). */
    click: [payload: { key: string; segment: TimelineSegment }];
}>();

const segmentList = computed<TimelineSegment[]>(() => props.segments ?? []);

const { regionLeft, regionWidth, boundaryX, continuousAriaValueNow } =
    createContinuousGeometry(segmentList);

/**
 * AC.W9 (Lane B / B2) — the ONE rail-spanning stitched gradient. The
 * `continuous` variant is conceptually a single progression bar; every
 * region windows into THIS gradient so the phase hues cross-fade
 * smoothly across the boundaries with no per-region seam. Recomputed
 * only when the segment set / weights / colours change.
 */
const railGradient = computed<string>(() =>
    stitchedRailGradient(segmentList.value),
);

const continuousAriaLabel = computed<string>(() => {
    if (props.ariaLabel) return props.ariaLabel;
    const names = segmentList.value.map((s) => s.label).filter(Boolean);
    return names.length > 0 ? `Timeline: ${names.join(", ")}` : "Timeline";
});

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
 * hover signal: it inherits reka-ui's `hoverOpenDelay`/`closeDelay`
 * cadence, so the pointer skim across the trigger edge (and the
 * popover content overlapping the dot) does not flicker
 * `hover`/`hoverEnd` events. Raw `mouseenter` / `mouseleave` on the
 * bare-fallback dot (when `disablePopover=true`) still emits the same
 * event surface — consumers see one contract.
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
</script>

<template>
    <!-- AA.W1 / A4 §S-17 + AB.W2.T1+T4 — Option C structural split: the
         rail and the marker buttons are SIBLINGS, not parent/child.
         `.continuous-track[role="progressbar"]` is a non-interactive
         aggregate-progress surface (no focusable descendants — fixes
         axe `nested-interactive`); `.continuous-markers` is a sibling
         `<ul role="list">` overlay carrying the per-phase interactive
         buttons. The marker list lives outside the rail's
         `overflow: hidden` clip, so the dots' outer 16px box paints in
         full (fixes the AB.W2 B2.a perceived-off-centre artefact). -->
    <div
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
                     AC.W9 (B2) — each region WINDOWS into the one shared
                     `--stitch-gradient` (the rail-spanning stitched
                     gradient) via `background-size` / `background-
                     position-x`, so the phase hues cross-fade smoothly
                     across the boundaries — one continuous bar, no seam.
                     `--continuous-fill-width` is the LIVE binding for the
                     active-fill paint (consumed by `.continuous-region-
                     fill` below). -->
                <div
                    v-for="(seg, i) in segmentList"
                    :key="seg.key"
                    class="continuous-region"
                    :class="[
                        `state-${seg.state}`,
                        i === 0 && 'is-first',
                        i === segmentList.length - 1 && 'is-last',
                    ]"
                    :data-state="seg.state"
                    :style="{
                        left: `${regionLeft(i) * 100}%`,
                        width: `${regionWidth(i) * 100}%`,
                        '--stitch-gradient': railGradient,
                        '--stitch-size-x': stitchedRegionWindow(regionLeft(i), regionWidth(i)).sizeX,
                        '--stitch-pos-x': stitchedRegionWindow(regionLeft(i), regionWidth(i)).positionX,
                        '--continuous-fill-width': `${continuousFillWidth(seg) * 100}%`,
                    }"
                    aria-hidden="true"
                >
                    <!-- AB.W2.T4 — the fill child clips the gradient to
                         `--continuous-fill-width`. Pending regions render
                         no fill (the var resolves to 0%); completed
                         regions paint 100%; active regions paint the
                         current progress fraction. -->
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
                                <svg
                                    v-if="seg.state === 'completed'"
                                    class="continuous-dot-check"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
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
                        <svg
                            v-if="seg.state === 'completed'"
                            class="continuous-dot-check"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </li>
            </ul>
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
    /* Consumer opacity knob — speedtest paints the bottom timeline as a
       quieter echo of the under-meter phase bus (default 1; the consumer
       sets `--continuous-fill-opacity: 0.74` and lifts to 1 on hover via
       the cascade). Decouples consumer-side dim from this primitive's
       internal selector tree (retires the prior `:deep()` reach). */
    opacity: var(--continuous-fill-opacity, 1);
    transition: opacity var(--duration-normal, 0.3s) var(--ease-out, ease-out);
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

/* AC.W9 (B2) — fill child WINDOWS into the ONE rail-spanning stitched
   gradient. The gradient (`--stitch-gradient`) is identical across every
   region; each region scales it up by `--stitch-size-x` (= 1 / region
   width) and offsets it by `--stitch-pos-x` so its slice aligns with the
   rail-fraction it occupies. The hues therefore cross-fade smoothly
   through every boundary — one continuous bar, no per-region seam.

   The fill child clips the windowed gradient to `--continuous-fill-
   width`: completed regions get a full-width fill (100%); active regions
   paint the current progress fraction; pending regions paint nothing.
   The parent region itself does NOT paint a background — the fill child
   is the single source of paint. */
.continuous-region {
    /* No own background — the fill child paints. */
    background: transparent;
}

.continuous-region-fill {
    position: absolute;
    inset: 0;
    width: var(--continuous-fill-width, 0%);
    background-image: var(--stitch-gradient, none);
    /* Window into the rail-spanning gradient: scale the gradient to the
       full rail (size-x = 1 / regionWidth) and offset so this region's
       slice is the visible one. background-repeat:no-repeat keeps the
       single gradient instance; the size/position do the windowing. */
    background-size: var(--stitch-size-x, 100%) 100%;
    background-position-x: var(--stitch-pos-x, 0%);
    background-position-y: center;
    background-repeat: no-repeat;
    transition: width var(--duration-slow, 0.45s) var(--ease-out, ease-out);
    will-change: width;
    pointer-events: none;
}

/* AC.W9 (B2) — proper rounded ends. The fill child's corners must NOT
   blanket-inherit the rail's pill radius (that rounds interior regions'
   fills on all four corners, leaving the rail's true leading + trailing
   edges squared off where a partial fill or a state seam lands). The
   rail terminus rounding is anchored to the FIRST region's leading edge
   and the LAST region's trailing edge; interior regions stay square so
   the stitched fill reads as one unbroken bar. */
.continuous-region-fill {
    border-radius: 0;
}
.continuous-region.is-first > .continuous-region-fill {
    border-start-start-radius: var(--radius-pill);
    border-end-start-radius: var(--radius-pill);
}
.continuous-region.is-last > .continuous-region-fill {
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
}

/* Completed regions: paint the full gradient end-to-end. */
.continuous-region.state-completed > .continuous-region-fill {
    width: 100%;
}

/* AF.W1 (D12) — active regions paint a partial-width fill, so the fill's
   incrementing (trailing) edge sits mid-region where the rail's
   `rounded-pill` mask has no curvature and would render squared. Round
   that incrementing edge so the live fill front reads as a pill cap.
   This composes with the is-first/is-last terminus rounding above —
   an active first region keeps its rounded leading edge AND gains a
   rounded incrementing edge; an active interior region rounds only the
   incrementing edge. */
.continuous-region.state-active > .continuous-region-fill {
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
}

/* Pending regions: no fill paint (substrate shows through). */
.continuous-region.state-pending > .continuous-region-fill {
    width: 0;
    background-image: none;
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

/* The marker dot recipe — duplicates the segmented-dot base recipe
   inside this SFC's scope because the continuous-dot OVERRIDES the
   layout-coupled positioning (no flex-cell parent anymore). The dot
   class on the rendered element is `continuous-dot segmented-dot` so
   the override styles below apply over a base segmented-dot block. */
.segmented-dot {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
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

.segmented-dot:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

/* Boundary dot — the marker button. Inherits the dot recipe from
   `.segmented-dot` above (radius, border, transition) but overrides the
   layout-coupled positioning (no flex-cell parent anymore).

   AC.W9 (B3) — the dot is a GLASS primitive: a translucent tinted fill
   over a backdrop blur with a hairline ring, not an opaque puck. The
   glass treatment is the resting recipe; the per-state rules below only
   re-tint the same glass (they no longer paint an opaque solid). All
   knobs are CSS custom properties declared in tokens.css §16 TIMELINE
   so consumers can tune the tint / blur / ring without reaching into
   this scope. */
.continuous-dot {
    position: relative;
    right: auto;
    /* Layout flow inside the marker `<li>` (the marker handles
       positioning via its own `transform`). The dot is intrinsically
       sized; we drop the segmented-dot's translate transform. */
    transform: none;
    /* Glass fill: a translucent tint (NOT opaque) so the rail's hue
       reads faintly through the dot — the glass-design idiom. The 2px
       border becomes a hairline glass ring. The unprefixed
       backdrop-filter is authored alone — Lightning CSS emits the
       -webkit- form per the glass.css single-source policy. */
    background: var(--timeline-dot-fill);
    backdrop-filter: var(--timeline-dot-blur);
    border-color: var(--timeline-dot-ring);
    /* Symmetric soft shadow so the perceived centre coincides with the
       math centre; a faint inner highlight gives the glass its convex
       lensing read. */
    box-shadow:
        0 0 4px color-mix(in srgb, var(--shadow-color) 22%, transparent),
        inset 0 1px 1px color-mix(in srgb, var(--foreground) 8%, transparent);
}

.continuous-dot:hover,
.continuous-dot:focus-visible {
    /* No translate compensation — pure scale around the marker's centre. */
    transform: scale(1.2);
}

/* AC.W6d F2.I-04 — WCAG 2.5.5 target-size hit-area at the continuous
   variant. The dot is 14px (default) painted at the inner centre of the
   marker `<li>`. A `::before` pseudo extends the pointer-receptive area
   to 44×44 (14 + 15 + 15) without enlarging the visible dot. The pseudo
   inherits the button's pointer-events so taps within the halo register.
   Coarse-pointer devices promote the visible dot via
   --timeline-dot-size-touch + recompute the inset so the halo stays at
   44×44 across the lifted geometry. */
.continuous-dot::before {
    content: "";
    position: absolute;
    inset: -15px;
    border-radius: inherit;
}

@media (pointer: coarse) {
    .continuous-dot {
        width: var(--timeline-dot-size-touch, var(--timeline-dot-size, 20px));
        height: var(--timeline-dot-size-touch, var(--timeline-dot-size, 20px));
    }
    .continuous-dot::before {
        inset: calc((var(--timeline-touch-target, 44px) - var(--timeline-dot-size-touch, 20px)) / -2);
    }
}

/* AB.W2.T3 — `data-current` marks the active phase regardless of hover
   state. AC.W9 (B3) — the per-state rules re-tint the SAME glass dot;
   they no longer paint an opaque solid. The tint is a translucent wash
   over the glass fill so the dot stays glassy (backdrop blur + ring
   intact) while still reading its lifecycle state. Consumers override
   the tint colour via `--timeline-dot-tint-current` /
   `--timeline-dot-tint-completed`. */
.continuous-dot[data-current] {
    background: color-mix(
        in srgb,
        var(--timeline-dot-tint-current) 22%,
        var(--surface-tint-12)
    );
    border-color: color-mix(
        in srgb,
        var(--timeline-dot-tint-current) 40%,
        var(--glass-border-floating)
    );
}

.continuous-dot[data-state="completed"] {
    background: color-mix(
        in srgb,
        var(--timeline-dot-tint-completed) 22%,
        var(--surface-tint-12)
    );
    border-color: color-mix(
        in srgb,
        var(--timeline-dot-tint-completed) 40%,
        var(--glass-border-floating)
    );
}

/* AF.W1 (A4 §C1) — completion-tick affordance. When a segment reaches
   `state === "completed"` the dot draws a self-drawing check: the path
   sweeps in via `stroke-dashoffset` while the dot punches a one-beat
   overshoot pop. This is the badge grammar (staged, self-drawing, one
   overshoot, reduced-motion end-state) at miniature scale, built into
   the primitive so consumers get the affordance for free. The stroke
   colour reads `--timeline-dot-check-color` (default the completed
   tint) so a consumer can retint without a `:deep()` reach. */
.continuous-dot-check {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
}

.continuous-dot-check path {
    fill: none;
    stroke: var(--timeline-dot-check-color);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* Path length of `M5 13l4 4L19 7` ≈ 28 units; a 32-unit dash fully
       covers it. The mark starts fully hidden (offset = dash) and the
       keyframe sweeps the offset to 0 so the check writes itself on. */
    stroke-dasharray: 32;
    stroke-dashoffset: 32;
    animation:
        continuous-dot-check-draw var(--duration-slow, 0.45s)
            var(--ease-out, ease-out) var(--duration-fast, 0.2s) forwards;
}

/* The dot itself plays a one-beat overshoot pop as the check lands —
   the single overshoot of the badge grammar. No fill mode: once the
   pop settles the dot releases the transform so the hover scale (and
   any future transform) is unobstructed. */
.continuous-dot[data-completed] {
    animation: continuous-dot-pop var(--duration-normal, 0.3s)
        var(--ease-apple-spring, cubic-bezier(0.2, 0.9, 0.25, 1.2));
}

@keyframes continuous-dot-check-draw {
    from {
        stroke-dashoffset: 32;
    }
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes continuous-dot-pop {
    0% {
        transform: scale(0.82);
    }
    60% {
        transform: scale(1.12);
    }
    100% {
        transform: scale(1);
    }
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
    .continuous-region {
        transition-duration: 0.01ms;
    }
    .continuous-region-fill {
        transition-duration: 0.01ms;
    }
    .continuous-dot {
        transition-duration: 0.01ms;
    }
    /* Completion tick collapses to its drawn end-state — the check is
       fully present, the pop is retired. The affirmation survives
       motion-off; only the motion goes. */
    .continuous-dot[data-completed] {
        animation: none;
    }
    .continuous-dot-check path {
        animation: none;
        stroke-dashoffset: 0;
    }
}
</style>

<!-- O.W3 Lane A (Rβ §3.1 — preserved verbatim): the `.timeline-popover`
     rules live in a NON-scoped <style> block because the HoverPopover
     content portals out of this component (rendered into the body via
     reka-ui's HoverCardPortal), so scoped CSS doesn't reach it. The
     `.timeline-popover` class is applied to the portaled HoverPopover
     content via the `:class` prop; the popover body span/div tree lives
     under it.

     CONTRACT: this block must live in a SFC that participates in the
     continuous render path so the global rules are loaded whenever a
     continuous-variant timeline mounts. Do NOT move to a separate .css
     file — Rβ §5 (portal CSS contract). -->
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
