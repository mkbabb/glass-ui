<script setup lang="ts">
import { computed, ref } from "vue";
import ContinuousMarkers from "./ContinuousMarkers.vue";
import ContinuousRail from "./ContinuousRail.vue";
import { createContinuousGeometry, stitchedRailGradient } from "./geometry";
import type { TimelineSegment } from "./types";

/**
 * <ContinuousTimeline> — ONE rounded-pill rail substrate with N
 * absolute-positioned region children spanning prev-boundary →
 * current-boundary. Internal variant SFC dispatched from
 * <GlassTimeline variant="continuous">.
 *
 * Used by multi-phase progress UIs where
 * the phases are conceptually one progression bar (speedtest ping →
 * download → upload).
 *
 * The progressbar rail and
 * the interactive marker buttons are rendered as SIBLINGS, not as
 * parent/child. `.continuous-track[role="progressbar"]` is a
 * non-interactive aggregate-progress surface; `.continuous-markers
 * ul[role="list"]` is the focusable marker overlay.
 *
 * Each marker button is wrapped in <HoverPopover>
 * so hover surfaces a color-coded popover with the segment's
 * `{ label, value, description, state }`. Consumers override the
 * popover body via the scoped `#popoverContent` slot.
 *
 * The `currentSegmentKey` prop stamps
 * `data-current="true"` on the matching marker so consumers (panel /
 * W3 raised-rivet styling) can distinguish the active phase from the
 * transient hovered phase. Hover affects the popover only; the
 * underlying current marker survives hover-leave.
 *
 * Non-scoped style contract: the
 * `.timeline-popover` rules live in a non-scoped <style> block at the
 * bottom of THIS SFC because HoverCardPortal escapes scoped CSS. The
 * rules must live in a component that participates in the continuous
 * render path; this is that component.
 *
 * The continuous variant emits an
 * optional `#detail` scoped slot rendered as a sibling of the rail wrap,
 * payload-rich with `{ segment, source, currentKey, hoveredKey }`. The
 * primitive owns the effective-segment resolution (hovered ?? current);
 * consumers own the choreography (e.g., a `<Transition mode="out-in">`
 * fade-swap keyed on the segment's stable key). The slot mount carries
 * a `min-height` reservation via `--timeline-detail-min-height` so
 * idle ↔ active transitions do not reflow the surrounding layout.
 * This keeps detail choreography consumer-owned without reflowing the rail.
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
         * Current segment key. Stamps `data-current="true"`
         * on the matching marker (and `data-completed="true"` on prior
         * markers, derived from each segment's `state`). Hover affects
         * the popover only; the current marker survives hover-leave so
         * the panel's current-phase binding does not flicker.
         */
        currentSegmentKey?: string;
        /**
         * Disable the default per-marker HoverPopover.
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
 * The one rail-spanning stitched gradient. The
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

/**
 * The continuous variant owns hovered-key tracking.
 * owns the hovered-segment state (the previously consumer-side
 * `hoveredSegmentKey` ref that lived in speedtest's PhaseTimeline.vue
 * migrates inward). The `#detail` slot then receives both the current
 * key AND the hovered key in its scoped payload, and the primitive
 * computes the `effectiveSegment` (hovered overrides current) +
 * `detailSource` (`"hovered"` / `"current"` / `"idle"`) so consumers do
 * not re-derive them per-render. Hover trumps current — the panel
 * affordance behaves as "tell me about this transient marker", with the
 * current-phase reading restored on hover-leave.
 */
const hoveredKey = ref<string | null>(null);

const effectiveSegment = computed<TimelineSegment | null>(() => {
    const list = segmentList.value;
    if (list.length === 0) return null;
    const key = hoveredKey.value ?? props.currentSegmentKey ?? null;
    if (key == null) return null;
    return list.find((s) => s.key === key) ?? null;
});

const detailSource = computed<"hovered" | "current" | "idle">(() => {
    if (hoveredKey.value != null) return "hovered";
    if (props.currentSegmentKey != null) return "current";
    return "idle";
});

function onSegmentHover(seg: TimelineSegment) {
    hoveredKey.value = seg.key;
    emit("hover", { key: seg.key, segment: seg });
}

function onSegmentLeave(seg: TimelineSegment) {
    // Only clear the hovered key if THIS segment is the currently-tracked
    // hover — a fast skim from segment A's popover to segment B's trigger
    // can fire leave-of-A after enter-of-B; gating on key equality
    // preserves B's hover state through that interleaving.
    if (hoveredKey.value === seg.key) {
        hoveredKey.value = null;
    }
    emit("hoverEnd", { key: seg.key, segment: seg });
}

function onSegmentClick(seg: TimelineSegment) {
    emit("click", { key: seg.key, segment: seg });
}
</script>

<template>
    <!-- Structural split: the
         rail and the marker buttons are SIBLINGS, not parent/child.
         `.continuous-track[role="progressbar"]` is a non-interactive
         aggregate-progress surface (no focusable descendants — fixes
         axe `nested-interactive`); `.continuous-markers` is a sibling
         `<ul role="list">` overlay carrying the per-phase interactive
         buttons. The marker list lives outside the rail's
         `overflow: hidden` clip, so the dots' outer 16px box paints in
         full. -->
    <div
        class="timeline-row timeline-continuous"
        role="group"
        :aria-label="continuousAriaLabel"
    >
        <div class="continuous-track-wrap">
            <!-- The non-interactive progressbar rail (the region children
                 windowing into the stitched gradient). DECK-PRIVATE child. -->
            <ContinuousRail
                :segments="segmentList"
                :rail-gradient="railGradient"
                :rail-aria-label="continuousAriaLabel"
                :value-now="continuousAriaValueNow"
                :region-left="regionLeft"
                :region-width="regionWidth"
            />

            <!-- The interactive marker overlay — sibling of the rail (Option C
                 structural split). DECK-PRIVATE child. The orchestrator owns
                 hovered-key state; the markers child emits raw hover signals
                 and forwards the consumer's `#popoverContent` slot. -->
            <ContinuousMarkers
                :segments="segmentList"
                :markers-aria-label="continuousAriaLabel"
                :current-segment-key="currentSegmentKey"
                :disable-popover="disablePopover"
                :boundary-x="boundaryX"
                @hover="onSegmentHover"
                @hover-end="onSegmentLeave"
                @click="onSegmentClick"
            >
                <template v-if="$slots.popoverContent" #popoverContent="{ segment }">
                    <slot name="popoverContent" :segment="segment" />
                </template>
            </ContinuousMarkers>
        </div>

        <!-- The payload-rich `#detail` scoped slot lets consumers
             mount inline to surface a per-segment detail row (label,
             value, description, etc.) keyed to the effective segment
             (hovered ?? current). Primitive owns the resolution; the
             consumer owns the choreography (e.g., a `<Transition
             mode="out-in">` fade-swap keyed on the segment's stable
             key). The wrap reserves `--timeline-detail-min-height` so
             idle ↔ active transitions do not reflow the surrounding
             layout. -->
        <div v-if="$slots.detail" class="continuous-detail">
            <slot
                name="detail"
                :segment="effectiveSegment"
                :source="detailSource"
                :current-key="props.currentSegmentKey ?? null"
                :hovered-key="hoveredKey"
            />
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
   One rounded-pill rail substrate with
   N absolute-positioned region children spanning prev-boundary →
   current-boundary. Per-region gradient drives the visual; optional
   seam dividers at region boundaries are gated by
   `--timeline-continuous-seam-opacity` (set to `0` to suppress
   entirely).

   The rail and marker
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

/* The `#detail` slot mounts beside `.continuous-track-wrap`.
   Reserves `--timeline-detail-min-height` so idle ↔ active transitions
   keyed by the consumer (`<Transition mode="out-in">`) do not reflow
   the surrounding layout. Consumers override the reservation per-host
   by setting `--timeline-detail-min-height` on the wrapping context.
   The primitive paints nothing inside the wrap — the consumer's slot
   body composes the visual. */
.continuous-detail {
    min-height: var(--timeline-detail-min-height, 1.25rem);
    margin-block-start: 0.25rem;
}
</style>

<!-- The `.timeline-popover`
     rules live in a NON-scoped <style> block because the HoverPopover
     content portals out of this component (rendered into the body via
     reka-ui's HoverCardPortal), so scoped CSS doesn't reach it. The
     `.timeline-popover` class is applied to the portaled HoverPopover
     content via the `:class` prop; the popover body span/div tree lives
     under it.

     CONTRACT: this block must live in a SFC that participates in the
     continuous render path so the global rules are loaded whenever a
     continuous-variant timeline mounts. Do NOT move to a separate .css
     file because this component owns the portal CSS contract. -->
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
