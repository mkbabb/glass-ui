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
      /**
       * AI.W4-M.1 — indeterminate sweep. When true, the gradient
       * variant's rail runs a slow left-to-right gradient pan
       * (`--motion-duration-progress-indeterminate`, 4s default) and
       * the indicator hides. Reka's ProgressRoot already supports the
       * indeterminate shape via a null modelValue; the prop here is
       * an explicit opt-in for consumers that want the sweep without
       * managing the modelValue lifecycle. PRM retires the sweep to
       * a static rail.
       */
      indeterminate?: boolean
      /**
       * AJ-W4-ε — opt out of the publisher-side crescendo overlay. The
       * gradient variant's lifecycle paints a screen-blended white cap
       * on the leading edge past 85% modelValue (the typed
       * `--progress-crescendo` percentage interpolates the cap alpha).
       * Consumers that bake their own leading-edge brightening into
       * `--progress-fill` (e.g. speedtest's under-meter bar, whose
       * gradient stops at 80%/100% paint a `color-mix` white tail
       * directly into the fill) would otherwise double-brighten the
       * same edge.
       *
       * The pre-W4-ε migration shape was a consumer-side typed-property
       * override (`--progress-crescendo: 0%` in the consumer's scoped
       * CSS) — correct in behaviour but visually noisier than a
       * declarative prop. `:disable-crescendo="true"` collapses the
       * publisher overlay cleanly: the crescendo rule keys off
       * `data-crescendo="disabled"` so the screen-blended cap layer
       * never paints, and the typed style binding pins
       * `--progress-crescendo: 0%` so any downstream rule that
       * `var()`s the typed property reads the floor.
       *
       * The intake-pulse + discharge-flash still fire — those are
       * temporal envelopes on the rail / indicator (not gradient
       * overlays), so a consumer that wants the lifecycle envelopes
       * but not the crescendo cap can opt into this surgically.
       */
      disableCrescendo?: boolean
    }
  >(),
  {
    modelValue: 0,
    variant: 'default',
    segments: () => [],
    currentSegmentKey: null,
    activeProgress: 0,
    indeterminate: false,
    disableCrescendo: false,
  },
)

const delegatedProps = computed(() => {
  const { class: _, variant: _v, segments: _s, currentSegmentKey: _c, activeProgress: _a, indeterminate: _i, disableCrescendo: _dc, ...delegated } = props
  return delegated
})

// ── AI.W4-M.1 lifecycle state attr ────────────────────────────────
// `data-lifecycle` is glass-ui's W4 lifecycle hook. reka-ui already
// emits its own `data-state` (`'loading' | 'indeterminate' |
// 'complete'`) on both the root and the indicator — we layer a
// distinct attribute so the two read paths don't collide. The W4
// gestalt cares about FOUR phases (idle / loading / progressing /
// complete) rather than reka's three (the "progressing" register is
// the typical 5..99% body of a real metric; "loading" is the rising-
// edge intake pulse band; "idle" is the at-rest plate).
//
// Drives: intake pulse (loading rising edge), crescendo brightening
// (≥85% modelValue, via the typed --progress-crescendo), and the
// discharge flash (complete). Sectioned/indeterminate variants opt
// out of the lifecycle — their motion stories are owned elsewhere.
const lifecycleState = computed<'idle' | 'loading' | 'progressing' | 'complete'>(() => {
  if (props.variant === 'sectioned' || props.indeterminate) return 'idle'
  const value = props.modelValue ?? 0
  if (value <= 0) return 'idle'
  if (value >= 100) return 'complete'
  if (value < 5) return 'loading'
  return 'progressing'
})

// `--progress-crescendo` typed CSS variable — typed at the tokens.css
// §18 @property registration. Past 85% the leading-edge gradient
// stop brightens proportionally; below 85% the typed variable stays
// at 0% (the @property initial-value). Inline style binding so the
// computed percentage interpolates via the typed-property contract.
//
// AJ-W4-ε — `:disable-crescendo` pins the typed property at 0% so
// any downstream `var()` consumer reads the floor; the CSS overlay
// rule below additionally gates on `data-crescendo="disabled"` so
// the screen-blended cap never paints in the first place. The two
// gates compose defensively: the typed-property floor is the
// belt, the data-attr selector is the suspenders.
const crescendoStyle = computed(() => {
  if (props.variant !== 'gradient' || props.indeterminate) return undefined
  if (props.disableCrescendo) return { '--progress-crescendo': '0%' }
  const value = props.modelValue ?? 0
  if (value < 85) return { '--progress-crescendo': '0%' }
  const ramp = ((value - 85) / 15) * 100
  return { '--progress-crescendo': `${Math.min(100, Math.max(0, ramp))}%` }
})

const rootClass = computed(() => {
  if (props.variant === 'sectioned') {
    // Sectioned rail owns its own depth + radius via the
    // `.progress-sectioned-rail` selector below. Tailwind keeps the
    // overflow guard + base height; tokens own track depth.
    return 'relative h-[var(--progress-sectioned-height,0.875rem)] w-full overflow-hidden rounded-pill progress-sectioned-rail'
  }
  if (props.variant === 'gradient') {
    return 'relative h-4 w-full overflow-hidden rounded-pill bg-[var(--progress-track,theme(colors.secondary.DEFAULT))] progress-gradient-rail'
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
    :data-lifecycle="lifecycleState"
    :data-indeterminate="indeterminate || undefined"
    :data-crescendo="disableCrescendo ? 'disabled' : undefined"
  >
    <ProgressIndicator
      :class="indicatorClass"
      :style="
        variant === 'sectioned'
          ? undefined
          : {
              transform: `translateX(-${100 - (props.modelValue ?? 0)}%)`,
              ...(crescendoStyle ?? {}),
            }
      "
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
/* ─────────────────────── AI.W4-M.1 — Progress lifecycle gestalt ───────────────────────

   Three rules layer on the `gradient` variant to ship the mandate-
   explicit progress motion grammar:

   • Intake pulse — the rail background opacity ramps 0.6 → 1.0 → 0.85
     over 220ms on the rising-edge of `[data-state="loading"]`. Reads
     as "the bar woke up". One-shot keyframe (no loop); the rail
     settles at its resting opacity.

   • Crescendo — the indicator's leading-edge gradient stop brightens
     past 85% modelValue. The typed `--progress-crescendo` percentage
     interpolates smoothly via the `@property` registration in
     tokens.css §18; the gradient stop reads the typed value through a
     `color-mix` and shifts toward `hsl(0 0% 100%)`. Reads as "the
     metric is closing in on the peak".

   • Discharge glow — at 100% the indicator's leading edge brightens
     toward 95% white via a localized inset box-shadow that decays
     back to rest over 220-240ms. Reads as "the metric arrived; the
     metric-front celebrates" — a localized celebratory discharge at
     the leading edge under reka's `translateX(-N%)` transform, not a
     global brightness pass on the whole bar (AJ.W2-ε; FD2 §3.1
     proposal 1). Single keyframe; no loop.

   • Indeterminate sweep — when `[data-indeterminate]` is set, the rail
     hosts a 4s left-to-right gradient pan; the indicator hides via the
     `display: none` rule below. PRM retires the sweep to a static rail.

   PRM brackets at the bottom of the block.
─────────────────────────────────────────────────────────────────────────────── */
.progress-gradient-rail[data-lifecycle="loading"] {
    animation: progress-intake-pulse var(--motion-duration-progress-intake, 220ms)
        var(--motion-ease-standard, ease-out) 1;
}

.progress-gradient-rail[data-lifecycle="complete"] [data-state="complete"] {
    /* Discharge glow targets the indicator. The indicator carries
       reka's `data-state="complete"` when modelValue hits max; the
       parent rail's `data-lifecycle="complete"` gates the rule so a
       sibling indeterminate sweep cannot accidentally trigger the
       glow. */
    animation: progress-discharge-glow var(--motion-duration-progress-crescendo, 240ms)
        var(--motion-ease-standard, ease-out) 1;
}

.progress-gradient-rail[data-indeterminate] {
    background: linear-gradient(
        90deg,
        var(--progress-track, var(--secondary)) 0%,
        color-mix(in srgb, var(--progress-fill, var(--primary)) 60%, var(--progress-track, var(--secondary))) 50%,
        var(--progress-track, var(--secondary)) 100%
    );
    background-size: 200% 100%;
    animation: progress-indeterminate-sweep
        var(--motion-duration-progress-indeterminate, 4s) linear infinite;
}

.progress-gradient-rail[data-indeterminate] > * {
    /* Hide the indicator while the rail itself paints the sweep. */
    display: none;
}

/* Crescendo — the leading-edge gradient stop brightens past 85%. The
   indicator paints a `linear-gradient` overlay on top of its
   `--progress-fill` background: a transparent body with a white
   leading-edge cap whose alpha equals `--progress-crescendo` (typed
   `<percentage>`, registered at tokens.css §18). Below 85% the typed
   variable sits at 0% so the overlay is transparent and the fill
   reads at its consumer-declared colour. The right-aligned linear-
   gradient hugs the indicator's leading edge under the
   `translateX(-N%)` transform reka applies (the gradient origin
   stays anchored to the indicator's right edge, which is the visible
   metric front).

   AJ-W4-ε — the `:not([data-crescendo="disabled"])` guard retires the
   overlay entirely when the consumer opts out via the
   `disable-crescendo` prop. Consumers that bake their own leading-
   edge brightening into `--progress-fill` (the speedtest under-meter
   bar's color-mix tail at the 80-100% stop is the canonical case)
   would otherwise double-brighten the same edge under the screen
   blend; the data-attribute opt-out is the cleaner gestalt than the
   consumer-side `--progress-crescendo: 0%` override that the prop
   replaces. */
.progress-gradient-rail[data-lifecycle="progressing"]:not([data-crescendo="disabled"]) [data-state],
.progress-gradient-rail[data-lifecycle="complete"]:not([data-crescendo="disabled"]) [data-state="complete"] {
    background-image:
        linear-gradient(
            to right,
            transparent 0%,
            transparent 80%,
            color-mix(in srgb, hsl(0 0% 100%) var(--progress-crescendo, 0%), transparent) 100%
        );
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-blend-mode: screen;
}

@keyframes progress-intake-pulse {
    /* AJ.W2-ε refinement — opacity modulation, NOT background-color
       modulation. The rail's resting background carries the
       --progress-track color at chassis-glass register; pulsing the
       opacity 0.6→1.0→0.85 reads as a visible breathing-pulse on
       the translucent rail, whereas the prior color-mix modulation
       read as a subtle hue-shift (FD1 §6.6; FD2 §3.1 proposal 1). */
    0%   { opacity: 0.6; }
    50%  { opacity: 1.0; }
    100% { opacity: 0.85; }
}

@keyframes progress-discharge-glow {
    /* AJ.W2-ε refinement — leading-edge glow, NOT global filter pass.
       The indicator paints a localized `box-shadow` glow on the right
       edge (the metric-front under the translateX(-N%) reka
       transform) that brightens toward 95% white then decays. Reads
       as "the metric ARRIVED" — a celebratory localized discharge —
       rather than the prior global brightness flash (FD1 §6.6; FD2
       §3.1 proposal 1). */
    0% {
        box-shadow: inset -0.25rem 0 0.5rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 0%, transparent);
    }
    40% {
        box-shadow: inset -0.25rem 0 0.75rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 95%, transparent);
    }
    100% {
        box-shadow: inset -0.25rem 0 0.5rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 0%, transparent);
    }
}

@keyframes progress-indeterminate-sweep {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
    .progress-gradient-rail[data-lifecycle="loading"],
    .progress-gradient-rail[data-lifecycle="complete"] [data-state="complete"] {
        animation: none;
    }
    .progress-gradient-rail[data-indeterminate] {
        animation: none;
        background-size: 100% 100%;
        background-position: 0 0;
    }
}

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
        width var(--duration-slow, 0.45s) var(--spring-snappy, ease-out);
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
