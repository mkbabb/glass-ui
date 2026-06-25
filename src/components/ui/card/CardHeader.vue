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
 *   4. Header background lift (0..120px — BB.W-SCROLL-CARD) — a `::before`
 *      BACKPLATE carrying the `--card-header-bg` tint fades `opacity: 0 → 1`
 *      on the same timeline, so a stuck header reads transparent over the
 *      body at scroll-top and lifts to the painted tint as it sticks. The
 *      opacity channel keeps the lift compositor-safe.
 *
 * BB.W-SCROLL-CARD — the two text lanes (2 + 3) re-target via `:slotted()`
 * (the precise Vue scoped-CSS slotted-content selector, the MetricRow.vue
 * idiom) so they MATCH a consumer-SLOTTED <CardTitle>/<CardDescription>; the
 * prior `:deep()` enabler was the W-CARD-COMPOSITE minimal stopgap, replaced
 * here by the precise tool (no descendant-leak sledgehammer).
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
 * Sticky positioning stays consumer-side (the consumer adds
 * `class="sticky top-0 backdrop-blur-md"` etc. via `props.class`); the
 * background TINT is now scroll-driven by lane 4 (the `::before` backplate),
 * reading `--card-header-bg` as the canonical tint token.
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
  /* BD.W-CARD-CEL-MOTION (§6) — the scroll-shrink lanes ease with the house
     spring/cartoon-punch curve, NOT `linear both` (the liquid-weight-universal
     law: a scroll-DRIVEN choreography is a DRIVER, not an observer — it earns
     weight). The four `animation:` shorthands below carry `var(--card-shrink-ease)`
     as their timing function so the title "sets down" with anticipation +
     follow-through rather than scrubbing mechanically with the scrollbar. The
     curve is the SHARED `--ease-cartoon-punch` (scheme-motion.css) — zero new
     keyframe family, zero new curve. Under PRM the `@supports` block never binds
     (the lanes render in terminal rest), so the eased curve only ever paints when
     motion is allowed — the weight is free of an a11y carve. The 0..120 / 0..80
     asymmetric cliff (good overlapping-action timing) is KEPT. */
  --card-shrink-ease: var(--ease-cartoon-punch, linear);
  /* BD.W-CARD-CEL-MOTION (§6) — re-point the stuck-header backplate to a KEYED
     WARM-GLASS plate, not the flat `--card` 60% srgb mix (the shipped
     `--card-header-bg`, shadow.css). Over the field a stuck header should read
     warm-transmissive with ONE edge vocabulary (header + body): the SAME
     `--glass-tint-*` warm-admit seam the card body reads (the W55 tinted floating
     rung — the lifted/forward read). Card-LOCAL re-point of the token (the
     shared-token at shadow.css is READ-ONLY); a consumer override on the host still
     wins (it sets `--card-header-bg` at a higher specificity / inline). */
  --card-header-bg: color-mix(
    in oklab,
    var(--glass-bg-floating),
    var(--glass-tint-source) var(--glass-tint-strength)
  );
  /* BB.W-SCROLL-CARD lane 4 (A4) — the header background is a scroll-driven
     LIFT, not a static tint. A `::before` BACKPLATE carries the
     `--card-header-bg` tint and fades `opacity: 0 → 1` on the same
     `--card-scroll` timeline, so a stuck header reads transparent over the
     body at scroll-top and lifts to the painted tint as it sticks (the
     standard sticky-header affordance). The `opacity` channel is
     compositor-safe — a scroll-driven `background-color` keyframe would be a
     (cheaper-but-still) PAINT lane, so the opacity-on-a-backplate form is the
     preferred compositor channel. The backplate is `position: absolute`
     behind the slotted content (z-index 0; the slot sits above at the default
     stacking), so it never occludes the title/description. */
  position: relative;
}

.card-header--shrink::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  /* The backplate reads the (card-locally re-pointed) `--card-header-bg` warm-glass
     seam — see the `.card-header--shrink` re-point above. */
  background: var(--card-header-bg);
  opacity: 0;
  border-radius: inherit;
  pointer-events: none;
}

/* The slotted content sits ABOVE the scroll-driven backplate. */
.card-header--shrink > :slotted(*) {
  position: relative;
  z-index: 1;
}

/* Lane 3 base: the description is a transform-collapsible block. transform-
   origin: top so the scaleY collapse retires it UPWARD (toward the title),
   not toward its own center.

   :slotted() is LOAD-BEARING on the descendant lanes (lane 2 title + lane 3
   description): <CardTitle>/<CardDescription> are SLOTTED children from
   sibling SFCs, so they do NOT carry CardHeader's `data-v-…` scope hash;
   a plain `.card-header--shrink > [data-slot="card-title"]` scoped selector
   rewrites to require that hash on the child and NEVER matches a slotted
   title (the 2-of-3-lanes-dead defect, the value.js PaneHeader lineage trap).
   `:slotted()` is the PRECISE Vue scoped-CSS slotted-content selector (the
   exact idiom MetricRow.vue:284-285 already speaks) — it re-targets the
   choreography at content this component's parent passed into the `<slot/>`,
   without the `:deep()` sledgehammer that would leak the lanes into UNRELATED
   nested cards. This is the W-SCROLL-CARD scoped-slot fix (W4): the dead
   title/description lanes now MATCH the consumer-slotted CardTitle/
   CardDescription, so the choreography animates for the real consumer case. */
.card-header--shrink > :slotted([data-slot="card-description"]) {
  transform-origin: top;
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    /* Lane 1 — header content compress. The header content slides up via
       translateY so the top breathing room visually compresses; the
       header BOX keeps its layout size (no padding reflow). */
    .card-header--shrink {
      animation: card-header-shrink var(--card-shrink-ease) both;
      animation-timeline: --card-scroll;
      animation-range: 0px 120px;
      transform-origin: top;
    }

    /* Lane 4 — the scroll-driven header background LIFT. The backplate fades
       in (opacity 0 → 1) on the same --card-scroll timeline so the stuck
       header lifts from transparent to the painted --card-header-bg tint.
       opacity is the compositor-safe channel (the box's own background is
       never animated). */
    .card-header--shrink::before {
      animation: card-header-bg-lift var(--card-shrink-ease) both;
      animation-timeline: --card-scroll;
      animation-range: 0px 120px;
    }

    /* Lane 2 — title shrink-in-place. transform: scale() down to the pinned
       ratio with the leading edge anchored, so the glyph visually shrinks
       toward --type-prose; the text run lays out ONCE at --type-heading.
       :slotted() reaches the slotted <CardTitle> (see the lane-3 base note). */
    .card-header--shrink > :slotted([data-slot="card-title"]) {
      animation: card-title-shrink var(--card-shrink-ease) both;
      animation-timeline: --card-scroll;
      animation-range: 0px 120px;
      transform-origin: left top;
    }

    /* Lane 3 — description retire. opacity fade + scaleY collapse (origin
       top), the real-estate reclaim composited, not a grid-track relayout. */
    .card-header--shrink > :slotted([data-slot="card-description"]) {
      animation: card-desc-shrink var(--card-shrink-ease) both;
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

    @keyframes card-header-bg-lift {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
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
