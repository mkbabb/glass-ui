<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'

/**
 * <CardHeader> — header lane of the Card family.
 *
 * AI.W1-α additive `shrink` modifier — when true, the header binds to the
 * `--card-scroll` named scroll-timeline (emitted by the canonical
 * `.card-scroll-host` utility on a scroll-overflow ancestor) and runs a
 * 3-lane choreography as the host scrolls:
 *
 *   1. Header padding shrink (0..120px scroll range) — top/bottom padding
 *      collapses from 1rem/0.5rem to 0.5rem/0.25rem.
 *   2. Title font-size shrink (0..120px) — `[data-slot="card-title"]`
 *      glyph scales from `--type-heading` down to `--type-prose`.
 *   3. Description grid-row collapse (0..80px, faster fade) —
 *      `[data-slot="card-description"]` collapses its 1fr → 0fr grid
 *      row while fading opacity → 0; the slot retires entirely past the
 *      80px boundary, freeing vertical real estate for the body.
 *
 * The choreography migrates verbatim from value.js's `PaneHeader.vue`
 * (the load-bearing pane-scroll-fade pattern that ran across the 9 panes)
 * — same `--card-scroll` timeline, same `0..120px` / `0..80px` ranges,
 * same animation keyframes (renamed `pane-*` → `card-*`).
 *
 * **Required ancestor**: when `shrink` is true, `.card-scroll-host` MUST
 * sit on the scroll-overflow ancestor (typically the same `<Card>` host's
 * scroll wrapper). Without that host the named timeline never emits and
 * the choreography sits idle. Documented in DESIGN.md `## Card` section.
 *
 * Sticky positioning + background tint stay consumer-side (the consumer
 * adds `class="sticky top-0 backdrop-blur-md"` etc. via `props.class`);
 * `--card-header-bg` is the canonical tint token for that backdrop.
 */
const props = defineProps<{
  /**
   * Bind the header to the `--card-scroll` named timeline and run the
   * 3-lane shrink choreography. Requires `.card-scroll-host` on the
   * scroll-overflow ancestor. Default `false` — the existing 5+
   * consumers see no change.
   */
  shrink?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn(
      '@container/card-header flex flex-col gap-y-1.5 p-(--card-spacing)',
      // AW.W24 — when a <CardAction> slot is present, the header reflows to a
      // two-column grid (content | action) so the action sits top-right. With
      // no action it stays the flex column (zero delta for the 5+ consumers).
      'has-data-[slot=card-action]:grid has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-action]:items-start',
      shrink && 'card-header--shrink',
      props.class,
    )"
  >
    <slot />
  </div>
</template>

<style scoped>
/* AI.W1-α — 3-lane shrink choreography migrated verbatim from
   value.js/demo/@/components/custom/panes/PaneHeader.vue (the load-bearing
   pane-scroll-fade pattern that ran across the 9 panes). Renamed
   identifiers `pane-*` → `card-*`; selectors moved from class hooks
   (`.pane-header-title`) to canonical data-slot hooks
   (`[data-slot="card-title"]`) so consumer `class=` overrides cannot
   accidentally suppress the choreography.

   The 0..120px / 0..80px animation-range cliff is intentional asymmetry:
   description fades out faster than the header collapses, so the title
   is the last element to fully settle.

   The PRM bracket forces all three animations to ~0.01ms so reduced-
   motion users see the rest-state (full padding, full title size, full
   description visibility) — the scroll-timeline degrades gracefully
   when the user has no scrolled offset, so PRM users effectively keep
   the rest layout. The explicit bracket belt-and-braces the contract. */
.card-header--shrink {
  animation: card-header-shrink linear both;
  animation-timeline: --card-scroll;
  animation-range: 0px 120px;
  background: var(--card-header-bg);
}

.card-header--shrink > [data-slot="card-title"] {
  animation: card-title-shrink linear both;
  animation-timeline: --card-scroll;
  animation-range: 0px 120px;
}

.card-header--shrink > [data-slot="card-description"] {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  margin-top: 0.125rem;
  animation: card-desc-shrink linear both;
  animation-timeline: --card-scroll;
  animation-range: 0px 80px;
}

.card-header--shrink > [data-slot="card-description"] > * {
  min-height: 0;
}

@keyframes card-header-shrink {
  from {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
  to {
    padding-top: 0.5rem;
    padding-bottom: 0.25rem;
  }
}

@keyframes card-title-shrink {
  from {
    font-size: var(--type-heading);
  }
  to {
    font-size: var(--type-prose);
  }
}

@keyframes card-desc-shrink {
  from {
    grid-template-rows: 1fr;
    opacity: 1;
    margin-top: 0.125rem;
  }
  to {
    grid-template-rows: 0fr;
    opacity: 0;
    margin-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-header--shrink,
  .card-header--shrink > [data-slot="card-title"],
  .card-header--shrink > [data-slot="card-description"] {
    animation-duration: 0.01ms !important;
  }
}
</style>
