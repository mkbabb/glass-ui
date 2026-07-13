# useLeadTrail

## Artefact path

`src/composables/motion/useLeadTrail.ts` — published on `@mkbabb/glass-ui/motion-core` AND the root barrel (it imports `vue` only — engine-FREE + vueuse-FREE, a hand-rolled critically-damped integrator with NO spring engine, so it is root-barrel safe per the `useLiquidFlex` / `usePointerVelocityField` precedent).

## What it is

The ONE two-edge lead/trail integrator behind the platform's liquid MORPH indicators. A morphing indicator is not a point that slides — it has TWO edges: a **LEAD** edge that springs toward the target (the stiff dock register, response 0.68 / ζ 0.64, reused as bare numerics — NO keyframes import) and a **TRAIL** edge that lags then catches up (`trail += (lead − trail)·(1 − exp(−dt/τ))`, τ ≈ 270ms). The **gap** between the edges IS the worm's live elongation; the trail catching the lead is the **emergent release-at-arrival** (no timer). ONE rAF, self-parking when settled; interruption is FREE (a retarget re-seats the lead target, the velocity carries); PRM seats instantly (zero in-between frames).

`drive(target)` retargets the lead; `seat(value)` snaps both edges (mount / resize / PRM); `onFrame(edges)` is the per-frame DOM-write path (`lo`/`hi` = `min`/`max` of the edges, direction-agnostic — a forward and a backward hop paint the same barbell). `drive(fractionalIndex → px)` is the seam W-CAROUSEL-REBUILD's drag-scrub feeds.

## The ≥2-consumer bar (L invariant 8 / J-inv-10) — met by construction

### 1. The pager worm (LIVE, this wave — BI.W-PAGER-WORM)

`src/components/custom/pager-dots/composables/usePagerWorm.ts` composes `useLeadTrail({ onFrame: paintWorm })` — the pager's active indicator GOO-MORPHS from dot to dot as the two-edge worm: the lead springs toward `centerOf(active)`, the trail lags then reels in, and the barbell (bodyA at `lo`, a welling neck, bodyB at `hi`) is projected off the `(lo, hi)` edges each frame + merged by the `#pager-worm-goo` filter. This CURES the σ8 whole-layer-filter annihilation (the empty-pill defect, D-PAGER PASS-1 §0 Defect 1) at the driver root — the CSS-transition `--goo-t`/`--pager-worm-duration` clock is retired for the interruptible spring.

**Proof:** `rg -n 'useLeadTrail' src/components/custom/pager-dots/composables/usePagerWorm.ts`

### 2. The B3 eyeglass release (NAMED — B3.W-TABS-FACTOR consumer #2)

The B3 dock/tabs eyeglass indicator (`--eyeglass-*`) reads the SAME two-edge release: the eyeglass edge springs to the selected control while the trailing edge lags, giving the eyeglass its liquid stretch-and-reform on selection (the E4 release seam the B3-TABS-FACTOR band names `useLeadTrail` as consumer #2 by construction — the ≥2 bar met at birth, NOT a speculative shelf primitive). The eyeglass consumes the identical `drive`/`seat`/`onFrame` surface — a single integrator, two morph indicators.

**Booked proof (at B3-TABS-FACTOR land):** `rg -n 'useLeadTrail' src/components/custom/tabs/ src/composables/motion/`

## The load-bearing constraints (recorded)

- **ONE rAF, keyframes-FREE.** The integrator owns a single self-rescheduling `step` loop that PARKS when settled (offscreen-friendly by construction — nothing runs at rest). The lead spring is a hand-rolled semi-implicit-Euler critically-damped integrator (sub-stepped ×8 for stiff-spring stability); NO `@mkbabb/keyframes.js` `SpringProgress`, NO `@vueuse/core`. This is the SCC-trap + no-spring-engine fence the `usePointerVelocityField` precedent set — so it ships on the engine-free `/motion-core` surface AND the root barrel.
- **Interruption is FREE.** `drive(next)` re-seats the target; the lead continues from its LIVE `(position, velocity)`, so a rapid re-select mid-flight inherits the momentum (the iOS interruptible contract, NOT a transition restart).
- **Release-at-arrival is EMERGENT.** No timer, no `--pager-worm-duration` clock — the trail's exponential catch of the lead IS the reform; the loop seats dead-on + parks when the edges agree.
- **PRM = seat.** Under `prefers-reduced-motion: reduce` `drive` seats instantly (zero in-between frames, no spring, no elongation) — the worm is ONE body on the target; only the consumer's fade survives. The PRM signal is a SINGLE cached `matchMedia` listener (the AV.W7 `useWebGLCanvas` substrate pattern).

## Re-audit proof

A consumer-count of < 2 at the B3-TABS-FACTOR close — with the eyeglass booked-proof grep still empty — wires or retires this integrator (the no-substrate-without-consumer bar). The pager worm alone is a LIVE binary consumer; the eyeglass is the named second by construction.
