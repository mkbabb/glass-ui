# useLeadTrail

## Artefact path

`src/composables/motion/morph/useLeadTrail.ts` — published on `@mkbabb/glass-ui/motion-core` AND the root barrel (it imports `vue` only — engine-FREE + vueuse-FREE, a hand-rolled damped integrator with NO spring engine, so it is root-barrel safe per the `useLiquidFlex` / `usePointerVelocityField` precedent).

## What it is

The pager worm's two-edge lead/trail integrator. A morphing indicator is not a point that slides — it has TWO edges: a **LEAD** edge that uses the pager-owned response 0.68 / ζ 0.64 (NO keyframes import) and a **TRAIL** edge that lags then catches up (`trail += (lead − trail)·(1 − exp(−dt/τ))`, τ ≈ 270ms). The **gap** between the edges IS the worm's live elongation; the trail catching the lead is the **emergent release-at-arrival** (no timer). ONE rAF, self-parking when settled; interruption is FREE (a retarget re-seats the lead target, the velocity carries); PRM seats instantly (zero in-between frames).

`drive(target)` retargets the lead; `seat(value)` snaps both edges (mount / resize / PRM); `onFrame(edges)` is the per-frame DOM-write path (`lo`/`hi` = `min`/`max` of the edges, direction-agnostic — a forward and a backward hop paint the same barbell). `drive(fractionalIndex → px)` is the seam W-CAROUSEL-REBUILD's drag-scrub feeds.

## Consumer

### The pager worm (BI.W-PAGER-WORM)

`src/components/custom/pager-dots/composables/usePagerWorm.ts` composes `useLeadTrail({ onFrame: paintWorm })` — the pager's active indicator GOO-MORPHS from dot to dot as the two-edge worm: the lead springs toward `centerOf(active)`, the trail lags then reels in, and the barbell (bodyA at `lo`, a welling neck, bodyB at `hi`) is projected off the `(lo, hi)` edges each frame + merged by the `#pager-worm-goo` filter. This CURES the σ8 whole-layer-filter annihilation (the empty-pill defect, D-PAGER PASS-1 §0 Defect 1) at the driver root — the CSS-transition `--goo-t`/`--pager-worm-duration` clock is retired for the interruptible spring.

SegmentedTabs does not consume this driver. Its one measured lens fill travels on the
shared `snappy` selection clock; the former two-rest-state release was removed by P092
and is not a second motion path.

## The load-bearing constraints (recorded)

- **ONE rAF, keyframes-FREE.** The integrator owns a single self-rescheduling `step` loop that PARKS when settled (offscreen-friendly by construction — nothing runs at rest). The lead spring is a hand-rolled semi-implicit-Euler damped integrator (sub-stepped ×8 for stiff-spring stability); NO `@mkbabb/keyframes.js` `SpringProgress`, NO `@vueuse/core`. This is the SCC-trap + no-spring-engine fence the `usePointerVelocityField` precedent set — so it ships on the engine-free `/motion-core` surface AND the root barrel.
- **Interruption is FREE.** `drive(next)` re-seats the target; the lead continues from its LIVE `(position, velocity)`, so a rapid re-select mid-flight inherits the momentum (the iOS interruptible contract, NOT a transition restart).
- **Release-at-arrival is EMERGENT.** No timer, no `--pager-worm-duration` clock — the trail's exponential catch of the lead IS the reform; the loop seats dead-on + parks when the edges agree.
- **PRM = seat.** Under `prefers-reduced-motion: reduce` `drive` seats instantly (zero in-between frames, no spring, no elongation) — the worm is ONE body on the target; only the consumer's fade survives. The PRM signal is a SINGLE cached `matchMedia` listener (the AV.W7 `useWebGLCanvas` substrate pattern).

## Re-audit proof

The pager worm is the deliberate product owner. A future consumer must share this exact
two-edge behavior; a nominal consumer-count target is not a reason to wire unrelated UI
or mint another driver.
