# BC.W-SCROLL-TRIGGER — the robust scroll-EVENT / trigger-point system (one rAF-coalesced reader, discrete onCross + continuous progress)

- **Band:** 13 (feature — dock-search + scroll-system; the new feature-band fanned out from `research/feat/WAVE-IMPACTS-FEAT.md`) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** FIRST of the Band-13 scroll cluster — no deps. Before `BC.W-SCROLL-CHROME` (the chrome BEHAVIORS that read this reader's output) and `BC.W-DOCK-SEARCH` (the dock-search seam consumes the chrome). Independent of the converged 74 (it threads the existing `useScrollProgress`/`useScrollTracker` leaves, touches no Band-1/2/4 surface).
- **Owns / closes:**
  - `WAVE-IMPACTS-FEAT.md` BC.W-SCROLL-TRIGGER [glassui-facility-census] "Build the robust dock-scroll SYSTEM the user mandate names — expand-on-interact, shrink-on-scroll, opacity-on-scroll, trigger-points — that the dock scroll-behaviors consume."
  - User mandate (d) — "a robust scroll system … trigger-points" (`ios27-search-scroll-sota.md §2.1` the direction + threshold + velocity + snap model).
  - The §3.2 gap #1 (`ios27-search-scroll-sota.md`): "No trigger-point/event reader (onCross/onEnter/onLeave)." glass-ui has continuous scroll legs (`useScrollProgress` 0..1 + `useScrollTracker` rAF-coalesced read) but NO discrete crossing-event reader and NO factored single rAF-coalesced core.

## Goal (the gestalt)
There is ONE scroll reader in the library. Point it at a scroll source (the window, a scroll container, or an element's own `scroll()`/`view()` timeline) and it gives you back two things off the SAME rAF-coalesced read: a continuous `progress` ref (0..1) for ramps, and discrete crossing events — `onCross(threshold, direction)`, `onEnter`, `onLeave` — that fire ONCE when the scroll position passes a declared trigger-point in a given direction (with a flip-delta debounce so a 1px jitter never re-fires). The dock, a page header, an InfiniteScroll sentinel, a ToC tracker — every chrome that reacts to scroll consumes this ONE reader; nobody adds a fourth `addEventListener("scroll")`. On a native-scroll-timeline engine the continuous ramp rides `scroll()`/`view()` on the compositor (zero JS), and the JS leg attaches only for the discrete crossing events the native timeline cannot emit — the dual-path single-writer the library already speaks. Under reduced motion the ramp drops and the discrete events still fire (a trigger-point is a STATE signal, not a flourish).

## Starting state (measured, file:line)
glass-ui has continuous scroll legs but no trigger-point reader and no factored rAF core:
- **`src/composables/motion/useScrollProgress.ts:42-111`** — a 0..1 viewport→progress map, dual-path single-writer (the native-timeline-gated pattern: `NATIVE_SCROLL_TIMELINE = supportsScrollTimeline()` at `:28`; on a supporting engine `onMounted` returns early at `:80` and attaches NOTHING — 0 scroll/resize listeners, 0 ResizeObservers; the `.scroll-progress` CSS recipe owns the compositor axis). The fallback writes `progress.value` off a `requestAnimationFrame`-coalesced `schedule()` (`:67-73`). **This is the dual-path precedent.** It maps ONE element's viewport position; it has no direction, no velocity, no crossing event, no trigger-point.
- **`src/composables/sidebar/useScrollTracker.ts:86-129`** — a rAF-coalesced scroll reader (`onScroll` at `:87` guards `if (locked || rafId) return; rafId = requestAnimationFrame(...)`), a `containerTop`/`activeZoneTop`-relative distance computation (`:96-120`), the `scrollContainer ?? document` source resolution (`:190-192`). But it is LOCKED to the active-section (ToC) use — it resolves `activeId` (deepest-visible / closest-to-active-zone), not a generic crossing event. The rAF-coalesce + the `scrollContainer`-or-document source resolution is the core to FACTOR.
- **`src/styles/scroll-choreography.css:65, :29-46`** — the native `scroll()`/`view()` substrate + the PRM outer-gate discipline (`@media (prefers-reduced-motion: no-preference)` wraps the whole register; `@supports (animation-timeline: …)` gates the scroll-driven recipes; a non-supporting engine gets the static read). The `--demo-main-progress` named timeline pattern. **This is the native-ramp half** the continuous progress output rides.
- **`src/components/custom/fading-scroll/composables/useFadingScroll.ts:1-40`** — the dual-path-with-single-writer reference (`NATIVE_SCROLL_TIMELINE` gates the listener/observer machinery OFF on a supporting engine, so "the two never both write"); the PRM-stays-discrete model ("the edge fade is a LEGIBILITY cue, not motion — under reduce it does not vanish; the discrete overflow-edge presence stays correct"). **This is the PRM model** for the discrete-events-survive-PRM rule.
- **The dock has ZERO scroll-reactivity** (`ios27-search-scroll-sota.md §3.2`: `grep -nE 'addEventListener|scrollY|onScroll|@scroll' GlassDock.vue` → no hits; `useDockState` collapse is hover/timer/click ONLY, `useDockState.ts:196-338`). So the dock-search seam (`BC.W-DOCK-SEARCH`) has no scroll input — this wave is its prerequisite.

The four scroll legs (`useScrollProgress`, `useScrollTracker.onScroll`, `useFadingScroll`, any future dock listener) each own a `requestAnimationFrame`-coalesce + a source-resolution. The factoring is real: ONE rAF-coalesced reader, the others become views over it.

## Target spec (grounded)

### 1. `useScrollTrigger(scrollSource, opts)` — the ONE reader (on `/motion-core`, engine-free)
```ts
// @mkbabb/glass-ui/motion-core (engine-free leaf — vue-only, no @mkbabb/keyframes.js,
// no @vueuse/core; ships on src/composables/motion/core/index.ts beside useScrollProgress,
// useIntersectionPause, useRAFLoop, usePointerVelocityField — the engine-free precedent)
export interface TriggerPoint {
  /** A pixel offset on the scroll source, OR a 0..1 progress fraction (resolved against
   *  the source's scrollable extent), OR a named element whose top crosses the source. */
  at: number | { fraction: number } | { element: MaybeRefOrGetter<HTMLElement | null> };
  /** Fire on which crossing direction. Default "both". */
  direction?: "down" | "up" | "both";
  /** Stable id for the event payload + de-dup. */
  id?: string;
}

export interface UseScrollTriggerOptions {
  triggers?: TriggerPoint[];
  /** The flip-delta debounce (px) before a DIRECTION flip commits — the anti-thrash,
   *  mirroring the dock's HOVER_INTENT_MS=60ms hysteresis. Default 8 (the RN reference). */
  flipDeltaPx?: number;
  /** Resolve the continuous `progress` ref against the source (0..1). Default true. */
  trackProgress?: boolean;
  onCross?: (id: string, dir: "down" | "up", scrollPos: number) => void;
  onEnter?: (id: string) => void;  // crossed a trigger scrolling INTO its region
  onLeave?: (id: string) => void;  // crossed OUT of its region
}

export interface UseScrollTriggerReturn {
  /** Continuous 0..1 scroll progress off the SAME rAF read (native-timeline-gated). */
  progress: Ref<number>;
  /** Current scroll direction (committed past flipDeltaPx). */
  direction: Ref<"down" | "up" | null>;
  /** Current scroll velocity (px/s, framerate-independent — Δpos / Δt). */
  velocity: Ref<number>;
  /** Force a re-read + re-evaluate every trigger (post-resize/layout). */
  recalculate: () => void;
}
export function useScrollTrigger(
  scrollSource: MaybeRefOrGetter<HTMLElement | Window | null>,
  opts?: UseScrollTriggerOptions,
): UseScrollTriggerReturn;
```

### 2. Factor the rAF-coalesced core ONCE — the no-fourth-listener move
The `useScrollTracker.onScroll` rAF-coalesce + source-resolution core (`useScrollTracker.ts:87-129, :190-192`) is lifted into a small private leaf `src/composables/motion/scrollReader.ts` (`createScrollReader(source, onTick)` — the `requestAnimationFrame`-coalesced scroll listener + the `scrollContainer ?? document/window` resolution + the cleanup). `useScrollTrigger` composes it; `useScrollTracker` RE-POINTS onto it (its `onScroll`+`rafId` core is replaced by a `createScrollReader` subscription — the ToC distance-resolution logic stays, only the listener plumbing is shared); `useScrollProgress` STAYS a progress-only view (it already owns its dual-path; this wave does not fold it — but it MAY be re-pointed onto `createScrollReader` for the fallback leg in a follow-up, recorded as the booked consolidation, NOT forced here — DRY without contrivance). **The fence: after this wave there is ONE rAF-coalesced scroll-listener core; no surface re-adds a raw `addEventListener("scroll")` + its own rAF.**

### 3. Dual-path single-writer (the native ramp + the JS discrete events)
- **Continuous `progress`** — on a `supportsScrollTimeline()` engine the ramp is owned by the CSS `scroll()`/`view()` recipe (the `useScrollProgress` precedent: the composable becomes the inert non-attaching path; the consumer reads a `@property --scroll-t` custom the CSS writes, OR the composable's `progress` ref on the fallback). The native path writes a registered `@property --scroll-t` (`<number>` 0..1, `inherits: true`) via `animation-timeline: scroll(self)` so a consumer's CSS ramp (shrink/opacity) reads it with zero JS. The JS leg writes `progress.value` only when `!NATIVE_SCROLL_TIMELINE`.
- **Discrete `onCross`/`onEnter`/`onLeave`** — these CANNOT ride a CSS scroll-timeline (a timeline drives a property, it does not emit an event), so the JS reader's rAF tick evaluates the triggers EVERY engine (native or fallback) — but only the cheap crossing check (compare last scrollPos vs each trigger, fire on a direction-committed cross). This is the legitimate JS-on-a-native-engine case: the ramp is native, the EVENTS are JS, and they read the SAME `createScrollReader` tick — never a second listener.

### 4. Direction + velocity + the flip-delta debounce (the trigger-point model, `ios27-search-scroll-sota.md §2.1`)
- **Direction** — track `scrollPos` delta frame-over-frame; a direction FLIP commits only past `flipDeltaPx` (default 8px, the anti-thrash mirroring `HOVER_INTENT_MS`), so a 1px jitter does not toggle `direction` and does not re-fire a crossing.
- **Velocity** — `Δpos / Δt` (px/s, framerate-independent so 60/120Hz read the same physical velocity — the `usePointerVelocityField` precedent: derive per-second, never per-frame). Exposed for the chrome's optional velocity-gate (a fast flick).
- **Crossing** — `onCross(id, dir, pos)` fires once when `scrollPos` passes a trigger's resolved px in the committed direction; `onEnter`/`onLeave` are the region-relative pair (entered/left a trigger's region). De-dup by id so a hover-back-and-forth across the same trigger fires enter→leave→enter, not a storm.

### 5. PRM (the discrete-events-survive model, `useFadingScroll` precedent)
Under `prefers-reduced-motion: reduce` the continuous `progress` ramp drops to a DISCRETE snap (the native CSS ramp's interpolation drops via the outer PRM gate; the JS `progress` snaps to the nearest endpoint) — but `onCross`/`onEnter`/`onLeave` STILL fire (a trigger-point is a STATE signal — the consumer that collapses chrome past a threshold must still get the cross under PRM; only the interpolation between states drops). This is the `useFadingScroll` rule ("the legibility cue does not vanish under reduce, it stops interpolating") applied to the trigger reader.

### The numbers (the bake table)
| axis | TARGET | source |
|---|---|---|
| rAF-coalesced reader core | ONE `createScrollReader` (factored from `useScrollTracker.onScroll`) | useScrollTracker.ts:87-129 |
| flip-delta debounce | 8px (anti-thrash; mirror `HOVER_INTENT_MS=60ms`) | `ios27-search-scroll-sota.md §2.1` + constants.ts:93 |
| velocity | px/s, framerate-independent (`Δpos/Δt`) | `usePointerVelocityField` precedent (the accel/velocity-per-second discipline) |
| native ramp path | `animation-timeline: scroll(self)` → `@property --scroll-t` (0..1, inherits) | scroll-choreography.css / useScrollProgress.ts:28-80 |
| JS fallback path | rAF-coalesced listener, `supportsScrollTimeline()`-gated single-writer | useScrollProgress.ts:80-100 |
| discrete events | JS rAF tick every engine (events can't ride a CSS timeline), SAME reader | `ios27-search-scroll-sota.md §2.2` |
| PRM | ramp drops to discrete snap; `onCross`/`onEnter`/`onLeave` STILL fire | `useFadingScroll` PRM model |
| subpath | `/motion-core` (engine-free — vue-only) | motion/core/index.ts (the useScrollProgress/usePointerVelocityField leaf set) |

## Mechanism / files
- **NEW `src/composables/motion/useScrollTrigger.ts`** — the reader (composes `createScrollReader`; resolves triggers to px; emits direction/velocity/crossing; native-timeline-gated continuous ramp). Vue-only (no `@mkbabb/keyframes.js`, no `@vueuse/core`) so it is `/motion-core`-eligible.
- **NEW `src/composables/motion/scrollReader.ts`** — the private rAF-coalesced reader leaf (the `useScrollTracker.onScroll` core factored: `requestAnimationFrame`-coalesce + `scrollContainer ?? document/window` resolution + cleanup). NOT exported on a public barrel (internal leaf; `useScrollTrigger`/`useScrollTracker` import it relatively).
- **Edit `src/composables/sidebar/useScrollTracker.ts:87-129, :184-199`** — re-point the `onScroll`+`rafId` plumbing onto `createScrollReader` (the distance-resolution + deepest-visible logic stays; only the listener/coalesce is shared). The reactive-roots signature + `activeId`/`forceRecalculate`/`lockTracking` surface is UNCHANGED (the `BC.W-TOC-RECONCILE` canon — this wave shares the listener, never changes the ToC API).
- **Edit `src/composables/motion/core/index.ts`** — `export * from "../useScrollTrigger";` (the engine-free `/motion-core` barrel, beside `useScrollProgress`/`usePointerVelocityField`). NOT the keyframes-bearing `/motion` barrel (engine-free → both `/motion-core` and root-barrel-eligible by the `useLiquidFlex`/`usePointerVelocityField` precedent — but ship on `/motion-core`; the dock-search consumer reaches it there).
- **Edit `src/api/index.ts`** — publish `TriggerPoint`/`UseScrollTriggerOptions`/`UseScrollTriggerReturn` on the `/api` discovery surface (the consumer types its trigger array).
- **NEW `@property --scroll-t`** in `src/styles/tokens/property-regs.css` (`<number>`, `inherits: true`, `initial-value: 0`) — the native-ramp custom (the `--chrome-collapse-t`/`--dock-morph-t` registered-property precedent; `BC.W-SCROLL-CHROME` reads it for the shrink/opacity ramp).
- **READ-ONLY:** `useScrollProgress.ts` (stays a progress-only view — the booked consolidation onto `createScrollReader` is recorded, NOT forced here), `scroll-choreography.css` (the native substrate it threads), `useScrollTracker`'s ToC distance/active logic (only the listener plumbing is shared).
- **The ONE reader:** `createScrollReader` is the single rAF-coalesced scroll-listener core; `useScrollTrigger` + `useScrollTracker` are views over it. No fourth listener.

## Acceptance (behaviour-π + machine gate + unit)
1. **Machine gate `proof:scroll-trigger`** (born-RED on HEAD → GREEN at the fix; device-free SOURCE arm `["local","ci","release"]`, `scripts/proof-scroll-trigger.mjs`):
   - **T1 — the reader exists ONCE on `/motion-core` + engine-free.** `useScrollTrigger` is exported from `src/composables/motion/core/index.ts`; the file imports `vue` only (no `@mkbabb/keyframes.js`, no `@vueuse/core` — the `/motion-core` leaf bar, the `usePointerVelocityField` precedent). Born-RED (no such export at HEAD). Self-test bite: a planted `import … from "@mkbabb/keyframes.js"` in the reader reds the engine-free assert.
   - **T2 — the rAF-coalesced reader is factored ONCE (no fourth listener).** `createScrollReader` exists; `useScrollTracker` composes it (its inline `onScroll`+`requestAnimationFrame` plumbing is GONE — re-pointed onto the shared core); `grep` finds exactly ONE `addEventListener("scroll"` + `requestAnimationFrame`-coalesce pair in the scroll-reader leaf set (the reader + the `useScrollProgress` fallback's own pre-existing one, which is on the recorded booked-consolidation allowlist — NOT a regression). Born-RED if a second raw scroll listener + rAF pair survives outside the allowlist. Self-test bite: a planted `addEventListener("scroll", …); requestAnimationFrame(…)` in a non-allowlisted file reds.
   - **T3 — dual-path single-writer.** The continuous ramp is `supportsScrollTimeline()`-gated (the JS `progress` writer attaches NOTHING on a native engine — the `useScrollProgress.ts:80` early-return precedent); the `@property --scroll-t` is registered (`<number>`, inherits) and the native `animation-timeline: scroll()` recipe writes it. The discrete crossing events run the JS rAF tick on EVERY engine (events can't ride a timeline) over the SAME `createScrollReader`. Born-RED if both the native ramp AND a JS ramp writer attach on a native engine. Self-test bite: a planted unconditional JS `progress` write (bypassing the `NATIVE_SCROLL_TIMELINE` gate) reds.
   - **T4 — direction + velocity + flip-delta + PRM-discrete.** `flipDeltaPx` defaults 8; a direction flip commits only past it; `velocity` is `Δpos/Δt` per-second; under PRM the ramp drops to a discrete snap WHILE `onCross`/`onEnter`/`onLeave` still fire (the `useFadingScroll` PRM model — a structural assert that the crossing-event path is NOT inside the PRM-no-preference gate). Born-RED if the crossing events are gated off under PRM (the trigger-point-vanishes bug). Self-test bite: a planted `@media (prefers-reduced-motion: reduce) { /* skip onCross */ }` reds T4.
   - **T5 — ≥2-consumer record.** `docs/consumer-evidence/use-scroll-trigger.md` names the binary consumers: #1 `BC.W-SCROLL-CHROME` (the dock + page-header collapse) and #2 the demo scroll-system story (`demo/stories/motion/scroll-system.vue` — the page/list exerciser). Born-RED (no evidence doc at HEAD). The dock-search seam (`BC.W-DOCK-SEARCH`) is the named third.
   - **+ a self-test bite per clause.**
2. **Behaviour-π `tests/composables/motion/useScrollTrigger.test.ts`** (headless unit, device-free — the reader is a pure scroll→event mapper, no GPU):
   - A scripted scroll source (a fake `scrollTop` sequence fed through the rAF tick): scrolling DOWN past a trigger's px fires `onCross(id, "down", pos)` EXACTLY ONCE; scrolling back UP past it fires `onCross(id, "up", pos)` once; a 4px jitter at the trigger (below `flipDeltaPx=8`) fires NOTHING (the anti-thrash). `direction` flips only past 8px; `velocity` reads the scripted px/s.
   - `onEnter`/`onLeave` fire as the source enters/leaves a trigger region (de-dup by id — a back-and-forth fires enter→leave→enter, not a storm).
   - PRM (`matchMedia` reduce mocked): the continuous `progress` snaps to discrete endpoints WHILE `onCross` still fires on the scripted cross (the trigger-point survives PRM).
   - The native-timeline path mocked (`supportsScrollTimeline()` → true): the JS `progress` writer does NOT attach (0 scroll listeners for the ramp), the discrete-event rAF tick STILL runs (the dual-path: native ramp, JS events).
3. **The π LIVE arm rides `BC.W-SCROLL-CHROME`** (the visual consumer) — this reader is engine-free + device-free, so its own binding proof is the unit test; the captured-paint truth is the chrome behavior the next wave drives off it (the `BC.W-GESTALT-FIRST` per-consumer-paint discipline — a pure reader's gate is the behaviour-π, the paint is the consumer's).

## Fences / invariants (must NOT regress)
- **No JS scroll lib** — no Lenis/GSAP/Locomotive; the native `scroll()`/`view()` substrate + the rAF dual-path fallback ONLY (the `BB.W-SCROLL-MOTION` fence). `createScrollReader` is a thin rAF-coalesced listener, not a momentum loop.
- **One reader** — after this wave there is ONE rAF-coalesced scroll-listener core (`createScrollReader`); `useScrollTracker` and `useScrollTrigger` are views over it; no surface re-adds a raw `addEventListener("scroll")`+rAF pair (T2). The `useScrollProgress` fallback's pre-existing listener is on the recorded booked-consolidation allowlist (DRY without forcing a same-wave fold).
- **Engine-free leaf** — `useScrollTrigger` imports `vue` only (the `/motion-core` bar); it never reaches `@mkbabb/keyframes.js` or `@vueuse/core` (T1). It ships on `/motion-core`, NOT the keyframes-bearing `/motion` barrel.
- **Dual-path single-writer** — the native ramp and the JS ramp NEVER both write (T3); the JS discrete-event tick is the only legitimate JS-on-a-native-engine path (events can't ride a timeline).
- **`useScrollTracker`'s ToC API is byte-stable** — this wave shares the listener plumbing ONLY; the reactive-roots signature + `activeId`/`activeRootId`/`forceRecalculate`/`lockTracking`/`unlockTracking` surface is UNCHANGED (the `BC.W-TOC-RECONCILE` canon owns the ToC family — no collision).
- **PRM discrete-survives** — the crossing events are NOT inside the PRM-no-preference gate; only the continuous ramp interpolation drops under reduce (T4 — the `useFadingScroll` model).
- **Clean break, no alias** (MEMORY: no backwards compat): `useScrollTracker`'s listener plumbing is RE-POINTED onto `createScrollReader` in place, no dual listener kept; no `onScroll-legacy`.

## Folds (deferrals discharged)
- **The §3.2 gap #1 trigger-point reader** (`ios27-search-scroll-sota.md`) — DECIDED/BUILD: the discrete `onCross`/`onEnter`/`onLeave` reader is built here on the factored rAF core. The continuous `useScrollProgress` and the ToC `useScrollTracker` STAY (this wave threads them, never re-forks them). DECIDED, no re-book.
- **The `useScrollProgress` → `createScrollReader` consolidation** — BOOKED (not forced): `useScrollProgress` keeps its own dual-path this wave (DRY without contrivance — a same-wave fold of a working leaf is over-reach); the consolidation onto the shared reader is the recorded booked successor IFF a third consumer makes it pay. Recorded BOOKED-with-rationale on the T2 allowlist.
