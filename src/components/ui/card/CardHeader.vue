<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'

/**
 * <CardHeader> — header lane of the Card family.
 *
 * AI.W1-α additive `shrink` modifier — when true, the header binds to the
 * `--card-scroll` named scroll-timeline (emitted by the canonical
 * `.card-scroll-host` utility on a scroll-overflow ancestor) and runs a
 * 3-lane choreography as the host scrolls. The 3 lanes are now
 * COMPOSITOR-SAFE (transform/opacity only — BB.W-CARD-COMPOSITE) so ZERO
 * reflow fires per scroll frame (the A'-3 CLS 1.03 worst-cluster killed):
 *
 *   1. Header content compress (0..120px scroll range) — the header content
 *      slides up via `transform: translateY` as the host scrolls so the top
 *      breathing room visually compresses; the header box keeps its layout
 *      size (no padding reflow). The visual gestalt — ~0.5rem of top space
 *      collapses — reads identically.
 *   2. Title shrink (0..120px) — `[data-slot="card-title"]` scales DOWN via
 *      `transform: scale(--card-title-shrink-ratio)` (origin: leading edge),
 *      so the glyph visually shrinks from `--type-heading` to roughly
 *      `--type-prose` while the text run lays out ONCE (no per-frame
 *      `font-size` text re-measure — the worst reflow lane, killed).
 *   3. Description retire (0..80px, faster fade) —
 *      `[data-slot="card-description"]` fades `opacity: 1 → 0` AND collapses
 *      `transform: scaleY(1 → 0)` (origin: top) so the slot visually retires
 *      upward; the real-estate reclaim is the composited scaleY, NOT a
 *      `grid-template-rows` relayout.
 *
 * The choreography ORIGINALLY migrated verbatim from value.js's
 * `PaneHeader.vue`, which animated LAYOUT properties (padding/font-size/
 * grid-template-rows/margin) — a per-scroll-frame reflow storm (CLS 1.03,
 * the A'-3 P0 that shipped at 4.0.0). BB.W-CARD-COMPOSITE re-expresses each
 * lane as the compositor-transform equivalent the house already speaks
 * (the `scroll-driven.css` scaleX/translateY/opacity idiom) — the visual
 * choreography is IDENTICAL; only the mechanism changed. The
 * `proof:no-layout-animation` gate makes the layout-property class
 * structurally impossible to re-ship.
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

<style scoped>
/* BB.W-CARD-COMPOSITE — the 3-lane shrink choreography re-expressed
   COMPOSITOR-SAFE (transform/opacity only). The ORIGINAL pattern (migrated
   verbatim from value.js's PaneHeader.vue) animated LAYOUT properties —
   padding (lane 1), font-size (lane 2), grid-template-rows + margin
   (lane 3) — forcing a browser re-layout on EVERY scroll-timeline frame
   (the A'-3 P0, CLS 1.03 at 4.0.0). Each lane is now the compositor-
   transform equivalent the house already speaks (scroll-driven.css's
   scaleX/translateY/opacity idiom): ZERO reflow per scroll frame, the
   visual choreography IDENTICAL. proof:no-layout-animation is the
   architectural lock that makes the layout-property class impossible to
   re-ship.

   Selectors stay on the canonical data-slot hooks
   (`[data-slot="card-title"]`) so consumer `class=` overrides cannot
   accidentally suppress the choreography.

   The 0..120px / 0..80px animation-range cliff is intentional asymmetry:
   description retires faster than the header compresses, so the title is
   the last element to fully settle.

   PRM is the OUTER gate (the scroll-driven.css discipline §Scope 4): the
   whole `@supports (animation-timeline: scroll())` block sits under
   `prefers-reduced-motion: no-preference`, so under PRM no scroll
   animation attaches AT ALL and the header renders in its terminal rest
   state (full top space, full title size, full description visibility) —
   the `from` keyframe never binds because the animation never binds. No
   JS fallback + no `animation-duration: 0.01ms` stub is needed: the
   outer gate is the primary AND complete contract (the prior explicit
   `0.01ms` belt-and-braces added nothing the outer gate does not, so it
   is retired per §Scope 4 — recorded here, not duplicated dead).

   --card-title-shrink-ratio is the lane-2 scale ratio pinned from the
   resolved type tokens at the default scale: --type-prose floor (1.125rem
   / 18px) ÷ --type-heading (1.618rem / 25.9px) ≈ 0.695. The ratio is a
   STATIC scalar (NOT a per-frame font-size re-measure); --type-prose is a
   clamp() so the ratio cannot be CSS-divided live (the §Triumvirate
   lane-2 trap) — it is pinned here as the reference knob. A consumer whose
   container-query / --ui-scale moves the tokens off this ratio overrides
   --card-title-shrink-ratio; that is a NAMED knob, never a fallback to a
   font-size animation. */
.card-header--shrink {
  --card-title-shrink-ratio: 0.695;
  background: var(--card-header-bg);
}

/* Lane 3 base: the description is a transform-collapsible block. transform-
   origin: top so the scaleY collapse retires it UPWARD (toward the title),
   not toward its own center.

   :deep() is LOAD-BEARING on the descendant lanes (lane 2 title + lane 3
   description): <CardTitle>/<CardDescription> are SLOTTED children from
   sibling SFCs, so they do NOT carry CardHeader's `data-v-…` scope hash;
   a plain `.card-header--shrink > [data-slot="card-title"]` scoped selector
   rewrites to require that hash on the child and NEVER matches a slotted
   title (the 2-of-3-lanes-dead defect). `:deep()` drops the descendant
   scope-attr requirement so the lanes reach the real slotted content. This
   is the minimal enabler the W-CARD-COMPOSITE lanes 2+3 require; the broader
   consumer-slot-match work (the scroll-driven header background, the
   <ScrollCard>/<ScrollCardHeader> family) is W-SCROLL-CARD's scope, riding
   ON the compositor-safe keyframes minted here. */
.card-header--shrink > :deep([data-slot="card-description"]) {
  transform-origin: top;
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    /* Lane 1 — header content compress. The header content slides up via
       translateY so the top breathing room visually compresses; the
       header BOX keeps its layout size (no padding reflow). */
    .card-header--shrink {
      animation: card-header-shrink linear both;
      animation-timeline: --card-scroll;
      animation-range: 0px 120px;
      transform-origin: top;
    }

    /* Lane 2 — title shrink-in-place. transform: scale() down to the pinned
       ratio with the leading edge anchored, so the glyph visually shrinks
       toward --type-prose; the text run lays out ONCE at --type-heading.
       :deep() reaches the slotted <CardTitle> (see the lane-3 base note). */
    .card-header--shrink > :deep([data-slot="card-title"]) {
      animation: card-title-shrink linear both;
      animation-timeline: --card-scroll;
      animation-range: 0px 120px;
      transform-origin: left top;
    }

    /* Lane 3 — description retire. opacity fade + scaleY collapse (origin
       top), the real-estate reclaim composited, not a grid-track relayout. */
    .card-header--shrink > :deep([data-slot="card-description"]) {
      animation: card-desc-shrink linear both;
      animation-timeline: --card-scroll;
      animation-range: 0px 80px;
    }

    @keyframes card-header-shrink {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-0.5rem);
      }
    }

    @keyframes card-title-shrink {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(var(--card-title-shrink-ratio));
      }
    }

    @keyframes card-desc-shrink {
      from {
        opacity: 1;
        transform: scaleY(1);
      }
      to {
        opacity: 0;
        transform: scaleY(0);
      }
    }
  }
}
</style>
