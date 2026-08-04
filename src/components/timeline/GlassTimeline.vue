<script setup lang="ts">
import ContinuousTimeline from "./ContinuousTimeline.vue";
import ScrubberTimeline from "./ScrubberTimeline.vue";
import SegmentedTimeline from "./SegmentedTimeline.vue";
import type { TimelineSegment } from "./types";

/**
 * <GlassTimeline> — dispatcher SFC for three structurally-distinct
 * timeline variants.
 *
 * - `variant="scrubber"` (default): single-track normalized 0..1 scrubber
 *   with full keyboard a11y (role=slider + arrow-key step + shift-step).
 *   Delegates to `<ScrubberTimeline>`.
 *
 * - `variant="segmented"`: adjacent gradient bands,
 *   one per phase, with boundary dots that emit `hover` + `click` events
 *   carrying the segment key + payload. Delegates to `<SegmentedTimeline>`.
 *
 * - `variant="continuous"`: one rounded-pill rail
 *   substrate with N absolute-positioned region children. Delegates to
 *   `<ContinuousTimeline>`. The continuous variant owns the popover
 *   portal CSS contract (non-scoped <style> block; see ContinuousTimeline).
 *
 * Per-segment gradient: either `{from, to}` (expanded as 90deg L→R linear
 * gradient) or a raw CSS gradient string consumed verbatim. Falls back
 * to `--timeline-segment-default-gradient` when omitted.
 *
 * The three variant SFCs + `geometry.ts` shared math live alongside in
 * the same package. Consumer imports through
 * `@mkbabb/glass-ui/timeline` are unchanged.
 */
const props = withDefaults(
    defineProps<{
        /** Variant — default `scrubber`. */
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
         * Current segment key (continuous variant).
         * Stamps `data-current="true"` on the matching marker so consumers
         * can distinguish the active
         * phase from the transient hovered phase.
         */
        currentSegmentKey?: string;
        /**
         * Disable the default per-marker
         * HoverPopover (continuous variant). The dot still emits
         * `hover` / `click` events.
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
    hover: [payload: { key: string; segment: TimelineSegment }];
    hoverEnd: [payload: { key: string; segment: TimelineSegment }];
    click: [payload: { key: string; segment: TimelineSegment }];
}>();
</script>

<template>
    <!-- Continuous variant — delegates to <ContinuousTimeline>. Forwards
         the popoverContent slot so consumers can override the popover
         body via the same `#popoverContent` slot name. -->
    <ContinuousTimeline
        v-if="variant === 'continuous'"
        :segments="props.segments"
        :aria-label="props.ariaLabel"
        :current-segment-key="props.currentSegmentKey"
        :disable-popover="props.disablePopover"
        @hover="(payload) => emit('hover', payload)"
        @hover-end="(payload) => emit('hoverEnd', payload)"
        @click="(payload) => emit('click', payload)"
    >
        <template #popoverContent="slotProps">
            <slot name="popoverContent" v-bind="slotProps" />
        </template>
        <!-- Forward the `#detail` scoped slot on the continuous
             variant only. The scrubber +
             segmented variants do not carry this surface. -->
        <template v-if="$slots.detail" #detail="slotProps">
            <slot name="detail" v-bind="slotProps" />
        </template>
    </ContinuousTimeline>

    <!-- Segmented variant — delegates to <SegmentedTimeline>. -->
    <SegmentedTimeline
        v-else-if="variant === 'segmented'"
        :segments="props.segments"
        @hover="(payload) => emit('hover', payload)"
        @hover-end="(payload) => emit('hoverEnd', payload)"
        @click="(payload) => emit('click', payload)"
    />

    <!-- Scrubber variant (default) — delegates to <ScrubberTimeline>. -->
    <ScrubberTimeline
        v-else
        :model-value="props.modelValue"
        :label="props.label"
        @update:model-value="(v) => emit('update:modelValue', v)"
        @scrub-start="emit('scrubStart')"
        @scrub-end="emit('scrubEnd')"
    />
</template>

<!-- ════════════════════════════════════════════════════════════════════
     The one shared timeline register.

     NON-SCOPED <style> block (the same portal-CSS-contract pattern
     ContinuousTimeline.vue uses for `.timeline-popover`): the three variant
     SFCs (scrubber · segmented · continuous) all COMPOSE `.timeline-rail`,
     so the recipe lives ONCE in the dispatcher — which is always in the
     render path — rather than re-forked into three scoped blocks. KISS/DRY:
     one warm-glass substrate, three interiors.

     This block COMPOSES the booked Band-0 register READ-ONLY — it re-mints
     NOTHING the sibling amendments own. It DECLARES only the timeline-LOCAL
     sizing root (`--sqrt-phi` + the √φ ladder off ONE `--timeline-h`) and the
     `--cel-accent` interior default. Per LANE DISCIPLINE the shared register
     files (glass-capsule.css, tokens/*.css, glass.css) stay untouched.
     ════════════════════════════════════════════════════════════════════ -->
<style>
/* ── §A. The √φ sizing root (LEG 3) — MINT `--sqrt-phi` ONCE, re-base the
   three rail heights + head/rivet/gap on the ladder off ONE `--timeline-h`.
   Scoped to `.timeline-row` so the mint is timeline-local (the shared roots
   are read-only). The base `--timeline-h` re-points the existing per-variant
   height tokens; each variant rung is one √φ step off it (continuous = base,
   segmented = h/√φ, scrubber = h·√φ — the tall a11y scrub surface). */
.timeline-row {
    --sqrt-phi: 1.272;
    /* ONE base — the continuous rail (the loudest, the bar). */
    --timeline-h: var(--timeline-continuous-height, 0.75rem);
    /* √φ ladder rungs off the base. */
    --timeline-h-segmented: calc(var(--timeline-h) / var(--sqrt-phi));
    --timeline-h-scrubber: calc(var(--timeline-h) * var(--sqrt-phi));
    /* the bead seats φ-INSIDE the scrub channel (head ≈ channel/√φ): reads as
       a bead in the strip, never filling it. */
    --timeline-head: calc(var(--timeline-h-scrubber) / var(--sqrt-phi));
    /* the continuous rivet is one √φ step below the dot register. */
    --timeline-rivet: calc(var(--timeline-dot-size, 0.875rem) / var(--sqrt-phi));
    /* the segmented gap reveals the warm RAIL between cels (the iOS
       battery/storage tinted-lane read) — a √φ-derived hairline, not a void. */
    --timeline-segment-gap: calc(var(--timeline-h) / var(--sqrt-phi) / 5);
    /* the tinted-glass cel accent default (segmented interior); consumers
       re-point per-phase. Warm-neutral until a phase hue lands. */
    --cel-accent: var(--accent, var(--foreground));
}

/* ── §B. `.timeline-rail` — the ONE warm-glass substrate (LEG 1).
   COMPOSES the booked Band-0 register: the warm `--card`-derived floor +
   REAL `--glass-blur-floating` transmission + the keyed rim + warm
   under-shadow + the ambient-tint seam. Replaces the three private
   `--surface-tint-6` + `--glass-blur-wash` gray recipes 1:1 (no alias, no
   legacy). The fill/cels/head sit `inset:0` ABOVE the rail so the route's
   `.paper-field` transmits THROUGH the whole bar — a lens, not a gray scrim. */
.timeline-rail {
    position: relative;
    border-radius: var(--radius-pill);
    /* §3 root-cause #2 (dormant-tint) CURE — the warm floor, both modes,
       enrolled in the ambient seam (no-op at the default 0% strength). */
    background: var(--glass-plate-resting);
    /* §3 root-cause #1 (flat-field) CURE — REAL transmission (build owns the
       -webkit- prefix into dist per the glass.css single-source policy). The radius
       PAIRS the rail's ink: it paints the resting rung, so it is 16px thick. A rung is
       a thickness of the same glass — a resting ink under a floating kernel is two
       rungs pretending to be one, and it broke the ladder's monotone-dilution law at
       the surface while the token table still proved it. */
    backdrop-filter: var(--glass-blur-resting);
    -webkit-backdrop-filter: var(--glass-blur-resting);
    /* §3 (c) defined edge — the keyed rim + warm under-shadow. */
    border: 1px solid var(--glass-border-accent);
    box-shadow: var(--glass-material-rim), var(--glass-under-shadow-default);
}

/* deep-transmit opt-in (media-grade rail over a vibrant field) — re-points
   the blur token only. */
.timeline-rail.is-deep {
    backdrop-filter: var(--glass-blur-deep);
    -webkit-backdrop-filter: var(--glass-blur-deep);
}

/* PRT / prefers-contrast floor — the rail falls to the warm-but-opaque
   `--card` shape (the ONE `--glass-level: 0` path — NOT a `.glass-opaque`
   class, which does not exist). Warmth kept, transmission dropped. Authored
   as plain per-feature arms (no light-dark() inset-fragment trap). */
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
    .timeline-rail {
        --glass-level: 0;
    }
}

/* ── §C. `.timeline-cel` — the tinted-GLASS interior cel (segmented; LEG 1).
   RETIRES the opaque `gradientFor(seg)` `chart-*` fill: a translucent
   `--cel-accent` glass over the warm rail (the field bleeds UP through it)
   with a keyed inner cel edge so it reads as a DEFINED chip, not a pastel
   ghost. The black-premultiply trap: the 0-alpha arm is `oklch(... / 0)`, NEVER bare
   `transparent` (the WebKit black-premultiply hole). */
.timeline-cel {
    background: color-mix(
        in oklab,
        var(--cel-accent) 38%,
        oklch(0 0 0 / 0)
    );
    /* The keyed inner cel edge is the LIBRARY rim, not a local re-spell of it. It said
       the same thing — lit on the key-facing edge, shaded opposite — in its own white
       at 0.26, twice the ceiling every other plate in the library holds to, and off the
       `--glass-key-*` sign pair, so a consumer moving the key left the cel lit from the
       old side. One rim, one light source. */
    box-shadow: var(--glass-material-rim);
}
</style>
