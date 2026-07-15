<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../_shared/class-names'

/**
 * <CardHeader> — header lane of the Card family.
 *
 * AI.W1-α additive `shrink` modifier — when true, the header binds to the
 * `--card-scroll` named scroll-timeline (emitted by the canonical
 * `.card-scroll-host` utility on a scroll-overflow ancestor, owned by
 * `<ScrollCard>`) and runs the 4-lane compositor-safe shrink choreography as
 * the host scrolls: (1) header content compress (translateY), (2) title
 * shrink-in-place (the shared `title-collapse` SCALE keyframe), (3)
 * description retire (opacity + scaleY), (4) header background lift (a
 * `::before` backplate opacity). Every lane is COMPOSITOR-SAFE (scale /
 * transform / opacity only — BB.W-CARD-COMPOSITE) so ZERO reflow fires per
 * scroll frame (the A'-3 CLS 1.03 worst-cluster killed).
 *
 * BG.W-SCROLL-SHRINK-UNIFY — the choreography is EXTERNALIZED to the global,
 * un-hashed `src/styles/card-scroll.css` (this SFC carries NO `<style>` block).
 * A global stylesheet has no Vue `data-v-…` scope hash, so it reaches the
 * light-DOM slotted `<CardTitle>`/`<CardDescription>` via the PLAIN descendant
 * selector `.card-header--shrink > [data-slot=…]` (the correct global-file form
 * — no `:slotted()`/`:deep()` scope escape needed). The lane-2 title SCALE leg
 * is shared with the page/hero large-title collapse via ONE `@keyframes
 * title-collapse` (the DRY fold; card supplies `--title-collapse-scale: 0.695`,
 * page/hero supply `0.82`). The scrub ease is the NO-OVERSHOOT
 * `--card-shrink-ease` (off the retired cartoon-punch — a scroll scrub must be
 * monotonic). `proof:no-layout-animation` (W1-W4) makes the layout-property
 * class structurally impossible to re-ship AND asserts the externalized-global
 * shape.
 *
 * **Required ancestor**: when `shrink` is true, `.card-scroll-host` MUST sit on
 * the scroll-overflow ancestor (`<ScrollCard>` owns it). Without that host the
 * named timeline never emits and the choreography sits idle. Sticky positioning
 * stays consumer-side (the consumer adds `class="sticky top-0"` etc. via
 * `props.class`); the background TINT is scroll-driven by lane 4.
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
      '@container/card-header flex flex-col gap-y-(--card-pad-title-gap) px-(--card-pad-inline) pt-(--card-pad-block) pb-0',
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
