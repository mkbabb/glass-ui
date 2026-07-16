<script setup lang="ts">
import { computed } from "vue";
import { fillFor } from "./geometry";
import type { TimelineSegment } from "./types";

/**
 * <SegmentedTimeline> — adjacent gradient bands with boundary dots.
 *
 * Internal variant SFC dispatched from <GlassTimeline variant="segmented">.
 * Per Z.W2.T1 / A2 §B5. Speedtest consumes this as a 3-cell
 * (ping/download/upload) progress timeline; gradient endpoints map to
 * per-phase chart-color tokens. Visual shape: N rectangles in a row.
 *
 * Each cell owns its own gradient background and per-state fill; the
 * boundary dot is a button anchored to the right edge of each cell
 * (the boundary between this cell and the next, or the timeline
 * terminus).
 */
const props = defineProps<{
    segments?: TimelineSegment[];
}>();

const emit = defineEmits<{
    /** Segment dot hover-enter (mouseenter + focus). */
    hover: [payload: { key: string; segment: TimelineSegment }];
    /** Segment dot hover-leave (mouseleave + blur). */
    hoverEnd: [payload: { key: string; segment: TimelineSegment }];
    /** Segment dot click (and keyboard Enter / Space). */
    click: [payload: { key: string; segment: TimelineSegment }];
}>();

const segmentList = computed<TimelineSegment[]>(() => props.segments ?? []);

/**
 * BD.W-TIMELINE-RAIL-UNIFY (LEG 1) — resolve a segment's single
 * representative cel hue for the tinted-GLASS cel `--cel-accent`. RETIRES the
 * opaque `gradientFor(seg)` `chart-*` fill: a `{from,to}` pair contributes its
 * `to` (the saturated phase hue); a raw CSS string is not parseable into a
 * single stop, so it falls back to the token default. The dispatcher's
 * `.timeline-cel` recipe mixes this to a translucent glass over the warm rail.
 */
function celAccentFor(seg: TimelineSegment): string {
    if (seg.gradient && typeof seg.gradient === "object") {
        return seg.gradient.to;
    }
    return "var(--cel-accent)";
}

function onSegmentHover(seg: TimelineSegment) {
    emit("hover", { key: seg.key, segment: seg });
}

function onSegmentLeave(seg: TimelineSegment) {
    emit("hoverEnd", { key: seg.key, segment: seg });
}

function onSegmentClick(seg: TimelineSegment) {
    emit("click", { key: seg.key, segment: seg });
}
</script>

<template>
    <div
        class="timeline-row timeline-segmented"
        role="group"
        aria-label="Timeline progress"
    >
        <div class="segmented-track timeline-rail">
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
                    class="segmented-band timeline-cel"
                    :style="{
                        '--cel-accent': celAccentFor(seg),
                        width: `${fillFor(seg) * 100}%`,
                    }"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    class="segmented-dot"
                    :aria-label="`${seg.label}: ${seg.state}`"
                    :aria-current="seg.state === 'active' ? 'step' : undefined"
                    :data-state="seg.state"
                    @mouseenter="onSegmentHover(seg)"
                    @mouseleave="onSegmentLeave(seg)"
                    @focus="onSegmentHover(seg)"
                    @blur="onSegmentLeave(seg)"
                    @click="onSegmentClick(seg)"
                >
                    <span class="sr-only">{{ seg.label }}</span>
                </button>
            </div>
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

/* The segmented lane COMPOSES `.timeline-rail` (warm-glass, from the
   dispatcher's shared register) — this scoped block carries ONLY the
   segmented-local layout. BD.W-TIMELINE-RAIL-UNIFY (LEG 1+3): the rail is
   PAINTED (warm lane); the `--timeline-segment-gap` between cels reveals the
   RAIL (the iOS battery/storage tinted-lane read — NOT N independent
   capsules). Height rides the √φ ladder's segmented rung (h/√φ). The cels are
   translucent insets (`.timeline-cel`), so the warm field bleeds UP through
   them. `overflow:hidden` clips the cels to the pill; the float-dots escape
   via z-stacking above. */
.segmented-track {
    position: relative;
    display: flex;
    gap: var(--timeline-segment-gap, 2px);
    width: 100%;
    height: var(--timeline-h-segmented, 0.59rem);
    /* NO `overflow: hidden` on the track — the float-dots (LEG 3) must escape
       to read as lifted above the lane. The CELS clip to their own
       `.segmented-cell` (overflow:hidden + radius) so the tinted glass still
       rounds; the rail's own warm-glass background rounds via its border-
       radius without a clip. */
}

.segmented-cell {
    position: relative;
    flex: var(--timeline-segment-flex, 1 1 0);
    min-width: 0;
    height: 100%;
    /* round the cel ends so each tinted chip reads as a lozenge in the lane. */
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.segmented-band {
    position: absolute;
    inset: 0;
    width: 0%;
    border-radius: inherit;
    transition:
        width var(--duration-slow, 0.45s) var(--ease-out, ease-out);
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
    /* BD.W-TIMELINE-RAIL-UNIFY (LEG 3) — the segmented dot FLOATS above the
       lane (independence). A warm-glass fill + the keyed rim + a
       `.shadow-cartoon-sm` cast (the cast offsets DOWN, opposite the upper
       key-light, so it coheres with the one key). Warm, not gray. */
    background: var(--glass-bg-floating);
    backdrop-filter: var(--glass-blur-quiet);
    -webkit-backdrop-filter: var(--glass-blur-quiet);
    border: 1.5px solid var(--glass-border-accent);
    box-shadow:
        var(--glass-material-rim),
        var(--shadow-cartoon-sm, 0 2px 4px oklch(0 0 0 / 0.18));
    padding: 0;
    cursor: pointer;
    z-index: 2;
    transition:
        background var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-cartoon-punch, var(--ease-standard)),
        box-shadow var(--duration-fast) var(--ease-standard);
}

/* AC.W6d F2.I-04 — WCAG 2.5.5 target-size compliance.
   The 14px dot grows an invisible 44×44 pointer hit-area via a
   `::before` pseudo: `inset: -15px` extends 15px on each side
   (14 + 15 + 15 = 44px exactly), satisfying WCAG 2.5.5 (level AAA)
   without disturbing the visible dot geometry. The pseudo inherits
   `pointer-events: auto` from the button so taps + clicks within the
   44×44 region register on the dot. The coarse-pointer media query
   below promotes the visible dot too, so finger-precision users see
   a wider visible affordance. */
.segmented-dot::before {
    content: "";
    position: absolute;
    inset: -15px;
    border-radius: inherit;
}

@media (pointer: coarse) {
    .segmented-dot {
        /* On coarse-pointer devices, lift the visible dot to the
           --timeline-dot-size-touch token (default 20px) — the visible
           glyph reads more confidently under finger occlusion while the
           ::before halo still extends to 44×44. */
        width: var(--timeline-dot-size-touch, var(--timeline-dot-size, 20px));
        height: var(--timeline-dot-size-touch, var(--timeline-dot-size, 20px));
    }
    .segmented-dot::before {
        /* Recompute inset against the lifted dot so the total stays
           44×44: (44 - dot-size) / 2. For the default 20px dot the
           inset becomes -12px (20 + 12 + 12 = 44). */
        inset: calc((var(--timeline-touch-target, 44px) - var(--timeline-dot-size-touch, 20px)) / -2);
    }
}

.segmented-dot:hover,
.segmented-dot:focus-visible {
    /* the float-dot lifts toward the key-light on hover (the cartoon punch). */
    transform: translate(50%, -50%) scale(1.18);
    box-shadow:
        var(--glass-material-rim),
        var(--shadow-cartoon-md, 0 3px 7px oklch(0 0 0 / 0.22));
}

.segmented-dot:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

/* per-state tints — a translucent wash of the lifecycle hue over the warm
   glass (the dot stays glassy; build-trap-(d) 0-alpha is oklch(.../0)). */
.segmented-cell[data-state="active"] .segmented-dot {
    background: color-mix(
        in oklab,
        var(--accent, var(--foreground)) 55%,
        var(--glass-bg-floating)
    );
}

.segmented-cell[data-state="completed"] .segmented-dot {
    background: color-mix(
        in oklab,
        var(--success, var(--foreground)) 60%,
        var(--glass-bg-floating)
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
}
</style>
