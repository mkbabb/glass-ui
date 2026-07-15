<script setup lang="ts">
import { type HTMLAttributes, computed, toRef } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../_shared/class-names";
import { useProgressGeometry, type ProgressSegment } from "./useProgressGeometry";

/**
 * Sectioned progress variant — the phase-bus (AB.W3.T2; rebuilt on a SINGLE-FILL
 * gradient paint model at BA.W-PROGRESS-GRADIENT). The bar reads as ONE continuous
 * blended liquid filling a frosted recessed glass channel: segment colours hold
 * their identity across their span and blend over short transition zones at the
 * boundaries, the active front carries the single pill cap + catch-light, and
 * pending phases keep their real hue as a faint ghost on the track.
 *
 * The paint is NOT per-cell rectangles. ONE `.progress-sectioned-flow` element
 * spans the cumulative filled extent (`filledExtentPct`, derived off the same
 * `useProgressGeometry` cells[]) and paints ONE `linear-gradient` whose stops are
 * the segment colours (hard stop-pairs hold each hue crisp; short soft zones at
 * the boundaries give the blend). No screen-seam band, no internal pill caps, no
 * dead notch. The pending remainder of the recessed track carries a faint
 * phase-tinted ghost gradient built from the pending cells' own colours.
 *
 * The single `modelValue` is NOT the truth here — the per-cell state map is. The
 * underlying `[role="progressbar"]` reports a numeric `aria-valuenow` derived from
 * the cumulative cell fill (`useProgressGeometry.aggregateValue`), which is the
 * sectioned variant's OWN value, not a silent override of any consumer-supplied
 * modelValue (the `Progress` dispatcher refuses a modelValue-as-truth misuse out
 * loud — see the prop-boundary contract there). The thin dispatcher routes here
 * for `variant="sectioned"`.
 */
const props = withDefaults(
    defineProps<
        Omit<ProgressRootProps, "modelValue"> & {
            class?: HTMLAttributes["class"];
            /** Ordered segment list — the cells. */
            segments?: ProgressSegment[];
            /** Key of the currently active segment. */
            currentSegmentKey?: string | null;
            /**
             * 0..1 fill of the active segment. Drives the spring overlay inside the
             * active cell. Pre-active cells fill 0; post-active cells render at full
             * saturation as "completed".
             */
            activeProgress?: number;
        }
    >(),
    {
        segments: () => [],
        currentSegmentKey: null,
        activeProgress: 0,
    },
);

const delegatedProps = computed(() => {
    const {
        class: _,
        segments: _s,
        currentSegmentKey: _c,
        activeProgress: _a,
        ...delegated
    } = props;
    return delegated;
});

const { cells, aggregateValue } = useProgressGeometry({
    segments: toRef(props, "segments"),
    currentSegmentKey: toRef(props, "currentSegmentKey"),
    activeProgress: toRef(props, "activeProgress"),
});

// ── The filled extent (RC-1 + RC-4) ──────────────────────────────────────────
// The cumulative filled extent across the WHOLE rail, in rail-% (0..100): the
// completed run runs to its endPct; the active cell's front is
// `startPct + widthPct * fill`. The single fill element spans this width.
const filledExtentPct = computed(() => {
    let front = 0;
    for (const c of cells.value) {
        const cellFront = c.startPct + c.widthPct * c.fill;
        if (cellFront > front) front = cellFront;
    }
    return Math.max(0, Math.min(100, front));
});

// The active cell — its colour drives the leading-edge cap catch-light.
const activeCell = computed(
    () => cells.value.find((c) => c.resolvedState === "active") ?? null,
);

// ── The single-fill gradient (RC-1 + RC-2) ───────────────────────────────────
// ONE linear-gradient over the filled-extent element. Each segment's FILLED span
// is re-normalized to the filled extent so the gradient spans the fill element
// (not the whole rail). A segment contributes a hard stop-PAIR holding its hue
// crisp across its span; a SHORT soft transition zone at each interior boundary
// gives the blend. Distinct segments AND a continuous blend, at once.
const BLEND_HALF = 3.2; // % of the FILLED extent each side of a boundary blends.

const flowGradient = computed(() => {
    const extent = filledExtentPct.value;
    if (extent <= 0) return "none";
    // The filled segments: completed cells (full) + the active cell up to its
    // front. Each maps a [start,end] span (in filled-extent %) carrying its hue.
    const spans: { from: number; to: number; color: string }[] = [];
    for (const c of cells.value) {
        const cellFront = c.startPct + c.widthPct * c.fill;
        if (cellFront <= c.startPct) continue; // nothing painted for this cell
        // Re-normalize the cell's painted span [startPct, cellFront] onto 0..100
        // of the FILLED extent.
        const from = (c.startPct / extent) * 100;
        const to = (cellFront / extent) * 100;
        spans.push({ from: Math.max(0, from), to: Math.min(100, to), color: c.color });
    }
    if (spans.length === 0) return "none";

    const stops: string[] = [];
    spans.forEach((s, i) => {
        const prev = spans[i - 1];
        const next = spans[i + 1];
        // Leading edge of this band: a soft blend zone shared with the prior band,
        // else a hard start at the band edge.
        const start = prev ? s.from + BLEND_HALF : s.from;
        // Trailing edge: a soft blend zone shared with the next band, else the
        // band's true end (the active front — the cap rounds it).
        const end = next ? s.to - BLEND_HALF : s.to;
        // The hard band holding this segment's hue crisp across its core span.
        stops.push(`${s.color} ${start.toFixed(2)}%`);
        stops.push(`${s.color} ${Math.max(start, end).toFixed(2)}%`);
    });
    return `linear-gradient(90deg, ${stops.join(", ")})`;
});

// ── The pending ghost (RC-3) ─────────────────────────────────────────────────
// The empty/pending remainder of the recessed track carries faint phase-tinted
// ghost stops built from the pending cells' OWN colours at low alpha — so a
// pending phase keeps its identity on the track, replacing the flat 12% neutral
// wash. Painted across the WHOLE rail (0..100); the fill overpaints the filled
// part, leaving the ghost visible only on the pending remainder.
const GHOST_ALPHA = "14%";

const trackGhost = computed(() => {
    const stops: string[] = [];
    for (const c of cells.value) {
        // Only PENDING (unfilled) cells contribute a ghost; completed/active are
        // overpainted by the flow fill.
        if (c.resolvedState === "completed") continue;
        if (c.resolvedState === "active" && c.fill >= 1) continue;
        const ghost = `color-mix(in srgb, ${c.color} ${GHOST_ALPHA}, transparent)`;
        stops.push(`${ghost} ${c.startPct.toFixed(2)}%`);
        stops.push(`${ghost} ${c.endPct.toFixed(2)}%`);
    }
    if (stops.length === 0) return "none";
    return `linear-gradient(90deg, ${stops.join(", ")})`;
});
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :model-value="aggregateValue"
        :class="
            cn(
                'relative h-[var(--progress-sectioned-height,0.875rem)] w-full overflow-hidden rounded-pill progress-sectioned-rail',
                props.class,
            )
        "
        :style="{ '--progress-track-ghost': trackGhost }"
    >
        <!-- Sectioned variant does NOT use the indicator — the single fill paints
         the bar. The indicator stays a hidden a11y prop carrier. -->
        <ProgressIndicator class="absolute inset-0 pointer-events-none opacity-0" />

        <!-- ONE fill element spanning the cumulative filled extent. Its width
             animates on the --spring-snappy clock; its background is ONE
             linear-gradient built from the segment colours — distinct bands that
             blend over short boundary zones. The front (trailing edge) rounds to
             the single pill cap; the leading edge is clipped by the rail's
             rounded-pill. -->
        <div
            class="progress-sectioned-flow"
            :style="{
                width: filledExtentPct + '%',
                '--flow-gradient': flowGradient,
                '--front-color': activeCell ? activeCell.color : 'transparent',
            }"
        >
            <!-- The living catch-light sweep — rides ONLY the active front. -->
            <span
                v-if="activeCell"
                class="progress-sectioned-sweep"
                aria-hidden="true"
            />
        </div>
    </ProgressRoot>
</template>

<style scoped>
/* ─────────────────────── Sectioned phase-bus rail (BA.W-PROGRESS-GRADIENT) ──────

   The rail is a frosted recessed glass channel: a --glass-bg-quiet track over the
   substrate (the IG-C1 glass meter register), a top catch-light strip, an
   inner-shadow groove, and a low outer drop so it lifts off the background. ONE
   fill element spans the cumulative filled extent and paints ONE linear-gradient
   whose stops are the segment colours — distinct bands that blend over short
   boundary zones, no per-cell pills, no screen seam, no dead notch. The pending
   remainder carries a faint phase-tinted ghost so each pending phase keeps its
   identity.
─────────────────────────────────────────────────────────────────────────────── */
.progress-sectioned-rail {
    /* Track depth — recessed glass channel. The frosted --glass-bg-quiet register
       reads over a rich substrate; the inner-shadow groove + the pending ghost
       layer ON it. */
    background:
        linear-gradient(
            to bottom,
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 10%, transparent) 0%,
            transparent 50%,
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 4%, transparent) 100%
        ),
        var(--progress-track-ghost, none),
        var(--glass-bg-quiet);
    backdrop-filter: var(--glass-blur-quiet);
    box-shadow:
        inset 0 1px 1.5px
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 18%, transparent),
        inset 0 -1px 0 color-mix(in srgb, hsl(0 0% 100%) 12%, transparent),
        0 1px 2px color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 8%, transparent);
}

/*
 * The single fill — anchored at the rail's leading edge, grows by `width` (the
 * filled extent). Paints ONE gradient built from the segment colours. Rounds ONLY
 * the trailing (front) corner so the active front reads as the single pill cap;
 * the leading edge is square (the rail's rounded-pill clip handles it).
 */
.progress-sectioned-flow {
    position: absolute;
    left: 0;
    inset-block: 0;
    /* The ONE leading-edge cap — only the front rounds. */
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
    background: var(--flow-gradient, none);
    box-shadow:
        inset 0 1px 0 color-mix(in srgb, hsl(0 0% 100%) 28%, transparent),
        inset 0 -1px 0
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 18%, transparent),
        /* a soft catch-light bloom on the active front cap */
            2px 0 6px -2px color-mix(in srgb, var(--front-color) 45%, transparent);
    /* Spring physics on the width grow — the --spring-snappy linear() curve gives
       the user-mandated overshoot. AX.W05 — the `ease-out` keyword is the sole
       no-linear() fallback. */
    transition: width var(--duration-slow, 0.45s) var(--spring-snappy, ease-out);
    will-change: width;
}

/*
 * Sweep — living catch-light for the active front. A diagonal highlight glides
 * across the leading region, repeating every 1.8s so the bar reads as "alive"
 * while the metric is sampling. Anchored to the fill's trailing edge.
 */
.progress-sectioned-sweep {
    position: absolute;
    inset-block: 0;
    right: 0;
    width: min(40%, 3rem);
    pointer-events: none;
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
    background: linear-gradient(
        100deg,
        transparent 30%,
        color-mix(in srgb, hsl(0 0% 100%) 40%, transparent) 50%,
        transparent 70%
    );
    background-size: 220% 100%;
    background-position: 200% 0;
    animation: progress-sectioned-sweep 1.8s var(--ease-apple, ease) infinite;
    mix-blend-mode: overlay;
    opacity: 0.65;
}

@keyframes progress-sectioned-sweep {
    0% {
        background-position: 220% 0;
    }
    100% {
        background-position: -120% 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    /* W3 contract: completed/current/future states stay visually distinct (colour
       + saturation); sweep + overshoot disable. */
    .progress-sectioned-flow {
        transition-duration: 0.01ms;
    }
    .progress-sectioned-sweep {
        animation: none;
        opacity: 0;
    }
}
</style>
