<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui'
import { cn } from '../../../utils'

type ProgressVariant = 'default' | 'gradient' | 'sectioned'

/**
 * Segment shape consumed by `variant="sectioned"`. Mirrors
 * `TimelineSegment` (`@mkbabb/glass-ui/timeline`) deliberately so a
 * consumer can pass the same array to both the timeline rail and the
 * phase-bus progress without re-shaping. Optional fields default
 * sensibly:
 *  - `state`    → "pending"
 *  - `weight`   → 1 (equal share)
 *  - `color`    → consumer-controlled CSS (`var(--chart-{key})` etc.);
 *                 sectioned variant requires it for the colour cells
 */
export interface ProgressSegment {
  /** Stable identifier — matched against `currentSegmentKey`. */
  key: string
  /** Display label (currently unused visually; surfaced for a11y/title). */
  label?: string
  /**
   * CSS colour expression (hex, oklch, color-mix, `var(--token)`).
   * Drives the cell fill, the gradient stops between siblings, and
   * the active-fill spring overlay.
   */
  color: string
  /** Lifecycle state. Drives saturation + sweep. Defaults to "pending". */
  state?: 'pending' | 'active' | 'completed'
  /**
   * Relative width weight. Per-cell widths = `weight / sum(weights)`.
   * Default `1` (equal share — the speedtest pings/jitter/dl/ul case).
   */
  weight?: number
}

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class']
      /**
       * 'default'    = bg-secondary rail + bg-primary indicator.
       * 'gradient'   = rail respects --progress-track; indicator
       *                respects --progress-fill (free-form CSS, including
       *                gradients). Default variant from v1.0.x.
       * 'sectioned'  = phase-bus (AB.W3.T2). Renders N colour-coded cells
       *                with gradient seams between siblings; the active
       *                cell carries a spring fill driven by
       *                `activeProgress` and a living catch-light sweep.
       *                The single `modelValue` is ignored in favour of
       *                the per-cell state map. Consumers wire:
       *                  - `segments`           (the cells)
       *                  - `currentSegmentKey`  (which cell is active)
       *                  - `activeProgress`     (0..1 fill of the active cell)
       */
      variant?: ProgressVariant
      /** Sectioned only — ordered segment list. */
      segments?: ProgressSegment[]
      /** Sectioned only — key of the currently active segment. */
      currentSegmentKey?: string | null
      /**
       * Sectioned only — 0..1 fill of the active segment. Drives the
       * spring overlay inside the active cell. Pre-active cells fill
       * 0; post-active cells render at full saturation as "completed".
       */
      activeProgress?: number
    }
  >(),
  {
    modelValue: 0,
    variant: 'default',
    segments: () => [],
    currentSegmentKey: null,
    activeProgress: 0,
  },
)

const delegatedProps = computed(() => {
  const { class: _, variant: _v, segments: _s, currentSegmentKey: _c, activeProgress: _a, ...delegated } = props
  return delegated
})

const rootClass = computed(() => {
  if (props.variant === 'sectioned') {
    // Sectioned rail owns its own depth + radius via the
    // `.progress-sectioned-rail` selector below. Tailwind keeps the
    // overflow guard + base height; tokens own track depth.
    return 'relative h-[var(--progress-sectioned-height,0.875rem)] w-full overflow-hidden rounded-pill progress-sectioned-rail'
  }
  if (props.variant === 'gradient') {
    return 'relative h-4 w-full overflow-hidden rounded-pill bg-[var(--progress-track,theme(colors.secondary.DEFAULT))]'
  }
  return 'relative h-4 w-full overflow-hidden rounded-pill bg-secondary'
})

const indicatorClass = computed(() => {
  if (props.variant === 'sectioned') {
    // Sectioned variant does NOT use the indicator — segments paint
    // the fill themselves. Hide the indicator entirely so it doesn't
    // mask the cell paint.
    return 'absolute inset-0 pointer-events-none opacity-0'
  }
  if (props.variant === 'gradient') {
    return 'h-full w-full flex-1 rounded-pill [background:var(--progress-fill,theme(colors.primary.DEFAULT))] transition-transform'
  }
  return 'h-full w-full flex-1 rounded-pill bg-primary transition-transform'
})

// ── Sectioned segment geometry ─────────────────────────────────────
// Derive per-cell start/end percentages from the weight distribution.

interface SectionedCell extends ProgressSegment {
  startPct: number
  endPct: number
  widthPct: number
  resolvedState: 'pending' | 'active' | 'completed'
  fill: number // 0..1 — how much of THIS cell paints saturated
}

const cells = computed<SectionedCell[]>(() => {
  if (props.variant !== 'sectioned' || props.segments.length === 0) return []

  const weights = props.segments.map((s) => s.weight ?? 1)
  const total = weights.reduce((a, b) => a + b, 0) || 1

  // Resolve states: explicit state on segment wins; otherwise infer
  // from currentSegmentKey order. Cells before current = completed;
  // current = active; after = pending.
  const currentIdx = props.segments.findIndex((s) => s.key === props.currentSegmentKey)

  let runningPct = 0
  return props.segments.map((seg, i) => {
    const widthPct = (weights[i] / total) * 100
    const startPct = runningPct
    const endPct = runningPct + widthPct
    runningPct = endPct

    let resolvedState: 'pending' | 'active' | 'completed'
    if (seg.state) {
      resolvedState = seg.state
    } else if (currentIdx < 0) {
      resolvedState = 'pending'
    } else if (i < currentIdx) {
      resolvedState = 'completed'
    } else if (i === currentIdx) {
      resolvedState = 'active'
    } else {
      resolvedState = 'pending'
    }

    const fill =
      resolvedState === 'completed'
        ? 1
        : resolvedState === 'active'
          ? Math.max(0, Math.min(1, props.activeProgress))
          : 0

    return { ...seg, startPct, endPct, widthPct, resolvedState, fill }
  })
})

// ── reka-ui ProgressRoot value derivation (sectioned) ──────────────
// For accessibility, the underlying ProgressRoot still benefits from
// a numeric value so the [role="progressbar"] reports a meaningful
// aria-valuenow. Compute from cumulative cell fill.
const sectionedAggregateValue = computed(() => {
  if (props.variant !== 'sectioned' || cells.value.length === 0) return props.modelValue ?? 0
  let sum = 0
  for (const c of cells.value) sum += c.fill * c.widthPct
  return Math.max(0, Math.min(100, sum))
})

const effectiveModelValue = computed(() =>
  props.variant === 'sectioned' ? sectionedAggregateValue.value : (props.modelValue ?? 0),
)
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :model-value="effectiveModelValue"
    :class="cn(rootClass, props.class)"
  >
    <ProgressIndicator
      :class="indicatorClass"
      :style="variant === 'sectioned' ? undefined : `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />

    <!-- Sectioned cells — paint after the indicator so the cells sit on top
         and the indicator stays a hidden a11y prop carrier. -->
    <template v-if="variant === 'sectioned'">
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
        <!-- Cell fill — saturated portion. Width animates via
             transition for the active cell's spring grow. -->
        <span
          class="progress-sectioned-fill"
          :style="{ width: (cell.fill * 100) + '%' }"
        />
        <!-- Active living sweep — only paints when state=active. -->
        <span
          v-if="cell.resolvedState === 'active'"
          class="progress-sectioned-sweep"
          aria-hidden="true"
        />
      </div>
      <!-- Seam blend overlays between adjacent cells. Painted as the
           last child so they sit above cell fills; pointer-events:none
           keeps interaction (if any) on the cells themselves. -->
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
    </template>
  </ProgressRoot>
</template>

<style scoped>
/* ─────────────────────── Sectioned phase-bus rail (AB.W3.T2) ───────────────────────

   The rail itself reads as a machined channel: a top catch-light
   strip, an inner-shadow groove, and a low outer drop so it lifts
   off the background. Token-overridable so consumers can tune depth
   per surface.

   Cells absolutely position over the rail. Each cell paints a
   muted base tint plus a saturated fill that grows from the leading
   edge with `transition` (the consumer drives `activeProgress` via
   keyframes.js SmoothProgress).

   Seams between cells paint a 1cell-wide gradient blend so adjacent
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
        inset 0 1px 1.5px color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 18%, transparent),
        inset 0 -1px 0 color-mix(in srgb, hsl(0 0% 100%) 12%, transparent),
        0 1px 2px color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 8%, transparent);
}

.progress-sectioned-cell {
    position: absolute;
    inset-block: 0;
    overflow: hidden;
    /* Pending cells render a frosted muted tint of the phase colour
       so the phase identity reads in idle/pre-active state. */
    background: color-mix(
        in srgb,
        var(--cell-color) 12%,
        transparent
    );
    /* Each cell's leading edge is the only place the fill paints
       from; rounded ends are owned by the rail's `rounded-pill`. */
    transition: background var(--duration-normal, 0.3s) var(--ease-apple, ease);
}

.progress-sectioned-cell[data-state="completed"] {
    /* Completed cells stay saturated/recessed — the colour reads
       at full opacity. The fill SPAN paints the saturated tone; the
       cell BG drops to transparent so we don't double-paint. */
    background: transparent;
}

.progress-sectioned-cell[data-state="active"] {
    background: color-mix(
        in srgb,
        var(--cell-color) 18%,
        transparent
    );
}

.progress-sectioned-fill {
    position: absolute;
    left: 0;
    inset-block: 0;
    /* The fill is anchored at the cell's leading edge and grows by
       `width`; its incrementing (trailing) edge sits mid-cell where the
       rail's `rounded-pill` mask has no curvature, so it would render
       squared. Round only that incrementing edge so the fill front
       reads as a pill cap — the leading edge stays square to seat flush
       against the prior cell / rail terminus. */
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
        inset 0 -1px 0 color-mix(in srgb, var(--shadow-color, hsl(0 0% 0%)) 18%, transparent);
    /* Spring physics on the width grow — linear() spring curve from
       --spring-snappy gives the user-mandated overshoot. */
    transition:
        width var(--duration-slow, 0.45s) var(--spring-snappy, var(--ease-apple-spring, ease-out));
    will-change: width;
}

.progress-sectioned-cell[data-state="completed"] .progress-sectioned-fill {
    /* Completed cells are saturated at full width — no transition
       so a re-mount (e.g. variant switch) paints stable. */
    transition: none;
}

/*
 * Sweep — living catch-light for the active cell. A diagonal
 * highlight glides across the cell's fill region, repeating every
 * 1.8s so the bar reads as "alive" while the metric is sampling.
 * The sweep masks against the fill via `mix-blend-mode` so it tints
 * the colour without flattening it.
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
    0%   { background-position: 220% 0; }
    100% { background-position: -120% 0; }
}

/*
 * Seam — 8% of the rail width at the boundary between two adjacent
 * cells. The gradient blends `--seam-from` (left cell) to
 * `--seam-to` (right cell) so the visual reads as a living glass
 * joint rather than a hard CSS stripe.
 */
.progress-sectioned-seam {
    position: absolute;
    inset-block: 0;
    /* Width is a small slice of the rail; pulled back 4% of width
       at the seam centre so it straddles the boundary symmetrically. */
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
    /* W3 contract: completed/current/future states stay visually
       distinct (colour + saturation); sweep + overshoot disable. */
    .progress-sectioned-fill {
        transition-duration: 0.01ms;
    }
    .progress-sectioned-sweep {
        animation: none;
        opacity: 0;
    }
}
</style>
