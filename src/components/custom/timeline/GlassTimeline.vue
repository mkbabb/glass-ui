<script setup lang="ts">
import ContinuousTimeline from "./ContinuousTimeline.vue";
import ScrubberTimeline from "./ScrubberTimeline.vue";
import SegmentedTimeline from "./SegmentedTimeline.vue";
import type { TimelineSegment } from "./types";

/**
 * <GlassTimeline> — dispatcher SFC for three structurally-distinct
 * timeline variants. Public surface UNCHANGED from the pre-O.W3 god-module.
 *
 * - `variant="scrubber"` (default): single-track normalized 0..1 scrubber
 *   with full keyboard a11y (role=slider + arrow-key step + shift-step).
 *   Delegates to `<ScrubberTimeline>`.
 *
 * - `variant="segmented"` (Z.W2.T1 / A2 §B5): adjacent gradient bands,
 *   one per phase, with boundary dots that emit `hover` + `click` events
 *   carrying the segment key + payload. Delegates to `<SegmentedTimeline>`.
 *
 * - `variant="continuous"` (AA.W1 / A4 §S-17): ONE rounded-pill rail
 *   substrate with N absolute-positioned region children. Delegates to
 *   `<ContinuousTimeline>`. The continuous variant owns the popover
 *   portal CSS contract (non-scoped <style> block; see ContinuousTimeline).
 *
 * Per-segment gradient: either `{from, to}` (expanded as 90deg L→R linear
 * gradient) or a raw CSS gradient string consumed verbatim. Falls back
 * to `--timeline-segment-default-gradient` when omitted.
 *
 * O.W3 Lane A — this dispatcher replaces the prior 1049-line monolith.
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
         * AB.W2.T3 (A2 §B2.b) — current segment key (continuous variant).
         * Stamps `data-current="true"` on the matching marker so consumers
         * (panel / W3 raised-rivet styling) can distinguish the active
         * phase from the transient hovered phase.
         */
        currentSegmentKey?: string;
        /**
         * AB.W2.T2 (A4 §B2.c) — disable the default per-marker
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
         body via the same `#popoverContent` slot name as the pre-O.W3
         monolithic source. -->
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
        <!-- AI.W1-δ — forward the `#detail` scoped slot on the continuous
             variant only (option γ per post-RD-3 §3). The scrubber +
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
