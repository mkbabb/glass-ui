<script setup lang="ts">
import { type HTMLAttributes, computed, toRef } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../../../utils";
import { useProgressGeometry, type ProgressSegment } from "./useProgressGeometry";

/**
 * Sectioned progress variant — the phase-bus (AB.W3.T2). Renders N colour-coded
 * cells with gradient seams between siblings; the active cell carries a spring
 * fill driven by `activeProgress` and a living catch-light sweep.
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
</script>

<template>
    <ProgressRoot
        v-bind="delegatedProps"
        :model-value="aggregateValue"
        :class="
            cn(
                'relative h-[var(--progress-sectioned-height,0.875rem)] w-full overflow-hidden rounded-pill progress-sectioned-rail',
                props.class,
            )
        "
    >
        <!-- Sectioned variant does NOT use the indicator — segments paint the fill
         themselves. The indicator stays a hidden a11y prop carrier. -->
        <ProgressIndicator class="absolute inset-0 pointer-events-none opacity-0" />

        <!-- Cells — paint after the indicator so the cells sit on top. -->
        <div
            v-for="(cell, i) in cells"
            :key="cell.key"
            class="progress-sectioned-cell"
            :data-state="cell.resolvedState"
            :data-index="i"
            :style="{
                left: cell.startPct + '%',
                width: cell.widthPct + '%',
                '--cell-color': cell.color,
                '--cell-fill': cell.fill,
            }"
        >
            <!-- Cell fill — saturated portion. Width animates via transition for the
           active cell's spring grow. -->
            <span
                class="progress-sectioned-fill"
                :style="{ width: cell.fill * 100 + '%' }"
            />
            <!-- Active living sweep — only paints when state=active. -->
            <span
                v-if="cell.resolvedState === 'active'"
                class="progress-sectioned-sweep"
                aria-hidden="true"
            />
        </div>
        <!-- Seam blend overlays between adjacent cells. -->
        <template v-for="(cell, i) in cells" :key="`seam-${cell.key}`">
            <span
                v-if="i < cells.length - 1"
                class="progress-sectioned-seam"
                :style="{
                    left: cell.endPct + '%',
                    '--seam-from': cell.color,
                    '--seam-to': cells[i + 1].color,
                }"
                aria-hidden="true"
            />
        </template>
    </ProgressRoot>
</template>

<style scoped>
/* ─────────────────────── Sectioned phase-bus rail (AB.W3.T2) ───────────────────────

   The rail reads as a machined channel: a top catch-light strip, an inner-shadow
   groove, and a low outer drop so it lifts off the background. Cells absolutely
   position over the rail; each paints a muted base tint plus a saturated fill that
   grows from the leading edge. Seams paint a 1cell-wide gradient blend so adjacent
   colours read as living glass joints, not hard CSS stripes.
─────────────────────────────────────────────────────────────────────────────── */
.progress-sectioned-rail {
    /* Track depth — recessed glass channel. */
    background:
        linear-gradient(
            to bottom,
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 10%, transparent) 0%,
            transparent 50%,
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 4%, transparent) 100%
        ),
        var(--progress-sectioned-track, var(--secondary, hsl(0 0% 92%)));
    box-shadow:
        inset 0 1px 1.5px
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 18%, transparent),
        inset 0 -1px 0 color-mix(in srgb, hsl(0 0% 100%) 12%, transparent),
        0 1px 2px color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 8%, transparent);
}

.progress-sectioned-cell {
    position: absolute;
    inset-block: 0;
    overflow: hidden;
    /* Pending cells render a frosted muted tint of the phase colour so the phase
       identity reads in idle/pre-active state. */
    background: color-mix(in srgb, var(--cell-color) 12%, transparent);
    transition: background var(--duration-normal, 0.3s) var(--ease-apple, ease);
}

.progress-sectioned-cell[data-state="completed"] {
    /* Completed cells stay saturated/recessed — the fill SPAN paints the
       saturated tone; the cell BG drops to transparent so we don't double-paint. */
    background: transparent;
}

.progress-sectioned-cell[data-state="active"] {
    background: color-mix(in srgb, var(--cell-color) 18%, transparent);
}

.progress-sectioned-fill {
    position: absolute;
    left: 0;
    inset-block: 0;
    /* The fill is anchored at the cell's leading edge and grows by `width`. Round
       only the incrementing (trailing) edge so the fill front reads as a pill cap;
       the leading edge stays square to seat flush against the prior cell. */
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
    background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--cell-color) 95%, white 12%) 0%,
        var(--cell-color) 55%,
        color-mix(in srgb, var(--cell-color) 88%, black 8%) 100%
    );
    box-shadow:
        inset 0 1px 0 color-mix(in srgb, hsl(0 0% 100%) 28%, transparent),
        inset 0 -1px 0
            color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 18%, transparent);
    /* Spring physics on the width grow — linear() spring curve from --spring-snappy
       gives the user-mandated overshoot. */
    transition: width var(--duration-slow, 0.45s)
        var(--spring-snappy, var(--ease-apple-spring, ease-out));
    will-change: width;
}

.progress-sectioned-cell[data-state="completed"] .progress-sectioned-fill {
    /* Completed cells are saturated at full width — no transition so a re-mount
       (e.g. variant switch) paints stable. */
    transition: none;
}

/*
 * Sweep — living catch-light for the active cell. A diagonal highlight glides
 * across the cell's fill region, repeating every 1.8s so the bar reads as "alive"
 * while the metric is sampling.
 */
.progress-sectioned-sweep {
    position: absolute;
    inset: 0;
    pointer-events: none;
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

/*
 * Seam — a small slice of the rail width at the boundary between two adjacent
 * cells. The gradient blends `--seam-from` (left cell) to `--seam-to` (right cell)
 * so the visual reads as a living glass joint rather than a hard CSS stripe.
 */
.progress-sectioned-seam {
    position: absolute;
    inset-block: 0;
    transform: translateX(-50%);
    width: clamp(0.5rem, 6%, 1.5rem);
    pointer-events: none;
    background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--seam-from) 60%, transparent) 0%,
        color-mix(in srgb, var(--seam-from) 35%, transparent) 30%,
        color-mix(in srgb, hsl(0 0% 100%) 18%, transparent) 50%,
        color-mix(in srgb, var(--seam-to) 35%, transparent) 70%,
        color-mix(in srgb, var(--seam-to) 60%, transparent) 100%
    );
    opacity: 0.5;
    mix-blend-mode: screen;
}

@media (prefers-reduced-motion: reduce) {
    /* W3 contract: completed/current/future states stay visually distinct (colour
       + saturation); sweep + overshoot disable. */
    .progress-sectioned-fill {
        transition-duration: 0.01ms;
    }
    .progress-sectioned-sweep {
        animation: none;
        opacity: 0;
    }
}
</style>
