# useScrollTrigger

## Artefact path

`src/composables/motion/scroll/useScrollTrigger.ts` — published on `@mkbabb/glass-ui/motion-core` (it imports `vue` only — engine-FREE + vueuse-FREE, the `usePointerVelocityField`/`useScrollProgress`/`useLiquidFlex` precedent). NOT on the keyframes-bearing `/motion` barrel. The private rAF-coalesced core it composes is `src/composables/motion/scroll/scrollReader.ts` (`createScrollReader` — an internal leaf, off every public barrel).

## Disposition: the ONE scroll reader, published with BOOKED binary consumers (the Band-13 scroll-cluster floor)

`useScrollTrigger` is the trigger-point reader the user mandate (d) names ("a robust scroll system … trigger-points", `ios27-search-scroll-sota.md §2.1`) and the `§3.2 gap #1` the census found ("No trigger-point/event reader — onCross/onEnter/onLeave"). glass-ui had continuous scroll legs (`useScrollProgress` 0..1 + `useScrollTracker` rAF-coalesced ToC read) but NO discrete crossing-event reader and NO factored single rAF-coalesced core. This wave is the FIRST of the Band-13 scroll cluster (no deps); it threads the existing legs, never re-forks them.

The visual-load-bearing ≥2-consumer bar (L invariant 8 / J-inv-10) is satisfied by the binary consumers below: the demo scroll-system story is the LIVE exerciser AT THIS WAVE, and `BC.W-SCROLL-CHROME` (the dock + page-header collapse) is the BOOKED chrome consumer that reads this reader's `progress`/`direction`/`velocity`/crossing output.

## Binary consumers

1. **The demo scroll-system story** (`demo/stories/motion/scroll-system.vue`) — the LIVE exerciser at this wave. A scrollable page declares trigger-points (a shrink threshold at 120px, a fraction trigger at 0.5, an element trigger); the story shows the live `progress`/`direction`/`velocity` readout + the discrete `onCross`/`onEnter`/`onLeave` event log firing once per crossing (the anti-thrash flip-delta demonstrated by a jitter at the boundary firing NOTHING). This is the `useScrollTrigger()` call site that proves the reader reads.
   **Live proof**: `rg -n 'useScrollTrigger' demo/stories/motion/scroll-system.vue`

2. **`BC.W-SCROLL-CHROME`** (the dock + page-header collapse — the next Band-13 wave) — the chrome BEHAVIORS that read this reader's output. The dock collapses on scroll-down past a threshold (a `direction`-gated `onCross`), the page header shrinks on a continuous `progress` ramp (the native `--scroll-t` custom on a supporting engine, the JS `progress` ref on the fallback), and the opacity-on-scroll ramp reads the same reader. This is the BOOKED binary consumer; its edit lands in `BC.W-SCROLL-CHROME`.
   **Booked proof (at W-SCROLL-CHROME land)**: `rg -n 'useScrollTrigger' src/components/custom/dock/ demo/layout/`

The named THIRD is the dock-search seam (`BC.W-DOCK-SEARCH`) — the search overlay consumes the chrome's scroll-collapse state (expand-on-interact / shrink-on-scroll), which reads this reader.

## The load-bearing constraints (recorded)

- **One reader / no fourth listener.** After this wave there is ONE rAF-coalesced scroll-listener core — `createScrollReader` (`scrollReader.ts`). `useScrollTrigger` composes it; `useScrollTracker` (the ToC tracker) RE-POINTS onto it (its inline `onScroll` + `requestAnimationFrame` plumbing is GONE — only the ToC distance-resolution logic stays). No surface re-adds a raw `addEventListener("scroll")` + its own rAF. The `useScrollProgress` fallback's pre-existing listener is on the recorded BOOKED-consolidation allowlist (DRY without a same-wave fold of a working leaf — the consolidation onto the shared reader is the recorded booked successor IFF a third consumer makes it pay).
- **Dual-path single-writer.** The continuous `progress` ramp is `supportsScrollTimeline()`-gated: on a native engine the `.scroll-progress`-style CSS recipe owns the ramp (writes `@property --scroll-t` on the compositor — ZERO JS) and the JS `progress` writer attaches NOTHING (the `useScrollProgress.ts:80` early-return precedent). The discrete crossing events CANNOT ride a CSS scroll-timeline (a timeline drives a property, it does not emit an event), so the JS reader's rAF tick evaluates the triggers on EVERY engine over the SAME `createScrollReader` tick — the legitimate JS-on-a-native-engine path. The native ramp and the JS ramp never both write.
- **Direction + velocity + the flip-delta debounce.** `direction` flips only past `flipDeltaPx` (default 8px, the anti-thrash mirroring the dock `HOVER_INTENT_MS=60ms` hysteresis), so a 1px jitter never toggles it. `velocity` is `Δpos / Δt` per SECOND (px/s, framerate-independent — a 60Hz and a 120Hz read the same physical velocity, the `usePointerVelocityField` per-second discipline). A crossing fires ONCE per pass; `passed` de-dups so a back-and-forth fires enter→leave→enter, not a storm.
- **PRM discrete-survives.** Under `prefers-reduced-motion: reduce` the continuous `progress` ramp drops to a DISCRETE snap (the native CSS interpolation drops via the outer PRM gate; the JS `progress` snaps to the nearest endpoint) — but `onCross`/`onEnter`/`onLeave` STILL fire (a trigger-point is a STATE signal, not a flourish; the crossing-event path is NOT inside the PRM-no-preference gate). The `useFadingScroll` rule ("the legibility cue does not vanish under reduce, it stops interpolating") applied to the trigger reader.
- **Engine-free leaf.** `useScrollTrigger` imports `vue` only — no `@vueuse/core`, no `@mkbabb/keyframes.js` — so it ships on `/motion-core`. `scrollReader.ts` is vue-FREE (a plain DOM `EventTarget` + rAF coalesce); the composable wrappers own the Vue lifecycle.

## No JS scroll lib (the BB.W-SCROLL-MOTION fence)

No Lenis/GSAP/Locomotive. The native `scroll()`/`view()` substrate + the rAF dual-path fallback ONLY. `createScrollReader` is a thin rAF-coalesced listener (a single in-flight frame per scroll burst, the `useScrollProgress`/`useFadingScroll` fallback idiom), NOT a momentum loop.

## Re-audit proof

This document satisfies the no-overfitting bar for `useScrollTrigger` while `BC.W-SCROLL-CHROME` (the dock + page-header collapse) is the booked binary consumer ahead of its land. The demo scroll-system story is the LIVE exerciser at this wave; once `BC.W-SCROLL-CHROME` lands, the booked proof grep above MUST find the chrome consumer. If the chrome wave is abandoned and no real chrome consumes the reader, the reader retires (or a real consumer is wired). A consumer-count of <2 — with the demo exerciser absent and the booked chrome grep failing — REDs `proof:scroll-trigger` (its T5 consumer clause).
