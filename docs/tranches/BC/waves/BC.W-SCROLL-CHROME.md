# BC.W-SCROLL-CHROME — the scroll-driven chrome BEHAVIORS (shrink-on-down, expand-on-up, opacity/blur-on-scroll, snap-to-state, persistent-by-default)

- **Band:** 13 (feature — dock-search + scroll-system) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** after `BC.W-SCROLL-TRIGGER` (it reads that wave's direction/velocity/crossing + the `--scroll-t` native ramp). Before `BC.W-DOCK-SEARCH` (the dock-search seam consumes the optional collapse-on-scroll opt-in this wave ships). Independent of the converged 74 (it threads `useScrollProgress`/`scroll-choreography.css`, adds no Band-1/2/4 surface; `BC.W-PAGE-CHASSIS` owns the page-HERO sticky scroll-shrink — a DISTINCT surface, the dock floats, not sticky-in-flow).
- **Owns / closes:**
  - `WAVE-IMPACTS-FEAT.md` BC.W-SCROLL-CHROME [ios27-search-scroll-sota] "User mandate (d): a robust scroll system — expand-on-click, shrink-on-scroll, opacity-on-scroll, trigger-points. The iOS-26/27 scroll-collapse model (direction + velocity + threshold + snap-to-nearest), made a REUSABLE web composable, with the iOS-27 persistent-default lesson baked in."
  - `ios27-search-scroll-sota.md §5 W1` (`BC.W-SCROLL-CHROME` the reusable scroll-collapse primitive) + §0 (the iOS-27 persistent-default course-correction — "two taps is always worse than one").
  - The §3.2 gap #1 (`ios27-search-scroll-sota.md`): "No scroll-collapsing-chrome composable" — `useScrollProgress` (0..1 map) + the scroll-choreography CSS (entrance recipes) exist, but NO direction+velocity+threshold+snap collapse-STATE machine.

## Goal (the gestalt)
Scroll down a page with a floating chrome bar (a dock, a header) and it shrinks smoothly into a compact form as content rises past it; scroll up and it expands back; flick fast and it toggles immediately; stop scrolling and it SNAPS to the nearest fully-collapsed-or-expanded state — never frozen half-collapsed at rest. It shrinks via a compositor `transform: scale/translateY` and quiets via `opacity` (+ an optional blur cross-fade) — the box never reflows per scroll frame, the CDP Layout track is flat. And the default is PERSISTENT: a bare chrome bar does NOT collapse on scroll — collapse is a deliberate, user-honest opt-in (the iOS-27 lesson that auto-collapse costs a tap and was widely criticized). The collapse READS the trigger reader's direction/velocity/crossing, eased on the BC spring canon — so the shrink reads as one coherent glide, the chrome quiets but stays CRISP (a shrunken bar is not a blurry mess).

## Starting state (measured, file:line)
glass-ui has the continuous + native substrate but NO collapse-state machine:
- **`src/composables/motion/useScrollProgress.ts:42-111`** — the 0..1 viewport map (one element's scroll progress); no direction, no snap, no collapsed state.
- **`src/styles/scroll-choreography.css:1-46`** — the native `scroll()`/`view()` register (`.scroll-build`/`.scroll-cascade`/`.scroll-pin`/`.smooth-scroll`), the PRM outer-gate (`@media (prefers-reduced-motion: no-preference)` at `:65`), the `@supports (animation-timeline: …)` gate, the compositor-only floor ("every @keyframes step + transition animates ONLY transform/translate/scale/opacity/clip-path — NEVER a layout-triggering property", `:38-46`). These are ENTRANCE recipes (mount/scroll-build), NOT a collapse-state machine.
- **`src/components/custom/fading-scroll/composables/useFadingScroll.ts:1-19`** — the dual-path single-writer + the PRM-stays-discrete model (the legibility-cue-survives-reduce rule). The reference shape.
- **The dock's anti-thrash precedent** — `useDockState`'s `HOVER_INTENT_MS=60ms` (`constants.ts:93`) intent-dwell + the `EDGE_BAND_PX=24` geometry recheck (the flip-thrash structural guard, `useDockState.ts:99-162`). The flip-delta threshold mirrors this.
- **`BC.W-SCROLL-TRIGGER`** — ships `useScrollTrigger` (direction/velocity/crossing + the `--scroll-t` native ramp + the flip-delta debounce). **This wave's prerequisite** — `useScrollChrome` is a thin collapse-state machine OVER the reader, it does NOT re-derive a scroll reader.
- **The W55 / on-glass legibility seam** — `--glass-tint-strength-aa` (20%, `glass/ladder.css`) + the bright-bucket darken + `--on-glass-muted` (`hsl(30 26% 35%)`, 5.76:1 vs plate, `tokens/on-glass-fg.css:35`). The chrome stays legible as it quiets (the W-DOCK-SHRINK-BLUR fence — the shrunken dock is crisp; the opacity quiets the SEPARATION/shadow, not the glass blur into mud).
- **The `proof:no-layout-animation` gate** (`scripts/proof-no-layout-animation.mjs`, `package.json:643`) — the keyframe/transition reflow-set floor the compositor-only shrink must clear.

There is no `useScrollChrome` (`grep` → ZERO). The four-part iOS model (direction + flip-delta + velocity + snap-to-nearest, `ios27-search-scroll-sota.md §2.1`) is unbuilt.

## Target spec (grounded)

### 1. `useScrollChrome(scrollContainerRef, opts)` — the collapse-state machine (on `/motion-core`, engine-free)
```ts
// @mkbabb/glass-ui/motion-core (engine-free — vue-only; ships beside useScrollTrigger)
export interface UseScrollChromeOptions {
  /** Opt-in: collapse on scroll. DEFAULT FALSE — persistent-by-default (the iOS-27 lesson). */
  collapseOnScroll?: boolean;
  /** The flip-delta debounce (px) before a direction flip commits. Default 8 (the reader's). */
  flipDeltaPx?: number;
  /** Optional velocity gate (px/s): a flick over this collapses/expands IMMEDIATELY,
   *  a slow drag respects the threshold. Default off (undefined). */
  velocityGate?: number;
  /** Snap-to-nearest commits past this fraction of the collapse range on scroll-STOP. Default 0.5. */
  snapMidpoint?: number;
  /** The scroll distance over which the chrome travels 0→1 collapsed (px). Default 116
   *  (the citymall headerHeight×2 reference) — the trigger-point span. */
  collapseRangePx?: number;
}

export interface UseScrollChromeReturn {
  /** 0..1 collapse fraction (drives the consumer's transform/opacity ramp). */
  collapseT: Ref<number>;
  /** True once collapseT past snapMidpoint (the discrete state). */
  collapsed: Ref<boolean>;
  /** Committed scroll direction (from the reader). */
  direction: Ref<"down" | "up" | null>;
  /** Force a re-read + re-evaluate (post-resize). */
  recalculate: () => void;
}
export function useScrollChrome(
  scrollContainer: MaybeRefOrGetter<HTMLElement | Window | null>,
  opts?: UseScrollChromeOptions,
): UseScrollChromeReturn;
```
It COMPOSES `useScrollTrigger` (the reader): direction-on-`down` past `collapseRangePx` ramps `collapseT` 0→1, direction-on-`up` ramps it 1→0; the optional `velocityGate` short-circuits to the endpoint on a flick; on scroll-STOP (a debounced no-tick window, the `onMomentumScrollEnd` analogue) `collapseT` SNAPS to 0 or 1 past `snapMidpoint` (no half-state at rest, `ios27-search-scroll-sota.md §2.1` part 4). It writes a registered `@property --chrome-collapse-t` (`<number>` 0..1, inherits) — the consumer's CSS reads it for the shrink/opacity ramp.

### 2. The CSS recipe — the compositor-only shrink/quiet (`src/styles/scroll-chrome.css`, `@import` after `scroll-choreography.css`)
A thin recipe the chrome consumer composes (`.scroll-chrome`), reading the `--chrome-collapse-t` custom:
- **Shrink** — `transform: scale(calc(1 - var(--chrome-collapse-t) * <shrink-depth>)) translateY(calc(var(--chrome-collapse-t) * <rise-px>))` — NEVER an animated `height`/`padding`/`width` (the `proof:no-layout-animation` floor; the citymall `transform scale instead of width/height` rule, `ios27-search-scroll-sota.md §2.2`). `transform-origin` at the chrome's anchor edge (top for a header, the dock's natural seat for a dock).
- **Quiet** — `opacity: calc(1 - var(--chrome-collapse-t) * <fade-depth>)` (the chrome quiets toward, but never to, transparent — a never-invisible floor; the NN/g pale-fade trap is the FORBIDDEN direction, so the fade-depth is bounded LOW, the bar reads at every collapse fraction). The SEPARATION/shadow LIFTS as content scrolls under (`box-shadow` strengthening on `--chrome-collapse-t` — Apple "as text scrolls underneath, shadows become more prominent", `ios27-search-scroll-sota.md §2.3`) — a paint-prop, compositor-safe.
- **The blur stays CRISP** — the chrome's `backdrop-filter` blur is NOT animated by `--chrome-collapse-t` (the W-DOCK-SHRINK-BLUR fence — the shrunken bar is crisp glass, not a blurry mess; only an optional `filter: blur` opacity CROSS-FADE on the chrome's OWN pixels rides the quiet, never the resting plate `backdrop-filter`).
- **The SPATIAL/EFFECTS split** — the shrink/translate (SPATIAL) is the `collapseT`-driven transform (no CSS transition needed — the JS scalar already glides on the reader's tick); where a CSS transition IS used (a non-scroll-driven settle), the SPATIAL legs ride a `--spring-*` per-spring clock and the EFFECTS (opacity/shadow) ride the no-overshoot `--ease-out` bezier (W-MOTION-CANON P1/P3 — a closing chrome must never overshoot past gone).
- **The native-ramp path** — on a `supportsScrollTimeline()` engine the `--chrome-collapse-t` ramp rides `animation-timeline: scroll(self)` directly (the `useScrollProgress` native precedent: the composable's JS writer is inert, the CSS owns the compositor); the snap-to-state is the JS leg (a snap is a discrete commit, not a continuous ramp — it rides the reader's scroll-stop tick on every engine).

### 3. PERSISTENT by default (the iOS-27 lesson, `ios27-search-scroll-sota.md §0`)
`collapseOnScroll` defaults FALSE. A bare `useScrollChrome` / `.scroll-chrome` does NOT collapse — `collapseT` stays 0 (persistent). Collapse is the explicit `{ collapseOnScroll: true }` opt-in. This is the binding course-correction: iOS 26 auto-collapsed and was criticized (NN/g "controls appearing and disappearing force users to constantly re-scan"); iOS 27 made the bar persistent ("two taps is always worse than one"). The gate has a teeth-bearing assert: a planted always-collapse default reds (the persistent-default fence).

### 4. PRM (the discrete-state-survives model, `useFadingScroll` precedent)
Under `prefers-reduced-motion: reduce` the `collapseT` ramp drops to a DISCRETE snap (collapsed/expanded state stays correct — a collapse is partly a legibility/space cue, the `useFadingScroll` rule), the interpolation frames drop, the snap is instant. The CSS recipe's transform/opacity ramp is inside the PRM-no-preference gate (the `scroll-choreography.css` outer-gate discipline); the discrete `collapsed` state is read on every engine. The chrome is NEVER stuck half-collapsed under PRM (the snap commits instantly).

### The numbers (the bake table)
| axis | TARGET | source |
|---|---|---|
| collapse model | direction + flip-delta + velocity-gate + snap-to-nearest | `ios27-search-scroll-sota.md §2.1` (citymall RN reference) |
| flip-delta debounce | 8px (anti-thrash; mirror `HOVER_INTENT_MS=60ms`) | `ios27-search-scroll-sota.md §2.1` + constants.ts:93 |
| snap midpoint | 0.5 of the collapse range, on scroll-stop | `ios27-search-scroll-sota.md §2.1` part 4 |
| collapse range | 116px default (citymall headerHeight×2), tunable | `ios27-search-scroll-sota.md §2.1` |
| shrink channel | `transform: scale/translateY` (NEVER height/padding) | `proof:no-layout-animation` / `ios27-search-scroll-sota.md §2.2` |
| quiet channel | `opacity` (bounded — never invisible) + shadow LIFT on scroll | `ios27-search-scroll-sota.md §2.3` (Apple shadow-on-scroll) |
| blur | stays CRISP (NOT collapse-animated; resting `backdrop-filter` untouched) | W-DOCK-SHRINK-BLUR fence |
| SPATIAL/EFFECTS | shrink=collapseT transform; settle SPATIAL=`--spring-*`, EFFECTS=`--ease-out` | W-MOTION-CANON P1/P3 |
| default | PERSISTENT (`collapseOnScroll: false`) — collapse is opt-in | `ios27-search-scroll-sota.md §0` (iOS-27 course-correction) |
| PRM | ramp→discrete snap; `collapsed` state correct, instant, never half | `useFadingScroll` PRM model |
| `@property --chrome-collapse-t` | `<number>` 0..1, inherits, initial-value 0 | the `--scroll-t`/`--dock-morph-t` registered-property precedent |
| subpath | `/motion-core` (engine-free) | beside `useScrollTrigger` |

## Mechanism / files
- **NEW `src/composables/motion/useScrollChrome.ts`** — the collapse-state machine (composes `useScrollTrigger`; ramps `collapseT` on direction + range; velocity-gate short-circuit; snap-to-nearest on scroll-stop; writes `--chrome-collapse-t`). Vue-only → `/motion-core`-eligible.
- **NEW `src/styles/scroll-chrome.css`** — the `.scroll-chrome` recipe (the compositor-only shrink/quiet/shadow-lift, reading `--chrome-collapse-t`, native-ramp-gated, PRM-carved). `@import`-ed after `scroll-choreography.css` in `src/styles/index.css`.
- **NEW `@property --chrome-collapse-t`** in `src/styles/tokens/property-regs.css` (`<number>`, inherits, initial-value 0).
- **Edit `src/composables/motion/core/index.ts`** — `export * from "../useScrollChrome";` (the `/motion-core` barrel).
- **Edit `src/api/index.ts`** — publish `UseScrollChromeOptions`/`UseScrollChromeReturn`.
- **NEW `demo/stories/motion/scroll-system.vue`** — the consumer #2 exerciser: a long page with a floating header that collapses on scroll-down + expands on scroll-up + snaps on scroll-stop (the captured-paint surface). It is ALSO the `BC.W-SCROLL-TRIGGER` T5 demo consumer.
- **READ-ONLY:** `useScrollTrigger.ts` (the reader it composes — never re-forks the scroll read), `scroll-choreography.css` (the native substrate it sits beside), the W55/on-glass tokens (it reads them for the quiet legibility, never re-tunes them), `proof:no-layout-animation.mjs` (the floor it clears).
- **The ONE reader:** `useScrollChrome` reads `useScrollTrigger`; no second scroll listener (the `BC.W-SCROLL-TRIGGER` `createScrollReader` is the source).

## Acceptance (captured-paint gestalt + machine gate + π)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP, both modes + WebKit):** a recorded frame-series of `demo/stories/motion/scroll-system.vue` — scroll DOWN: the floating header SHRINKS smoothly into a compact bar past the threshold; scroll UP: it EXPANDS back; a fast flick toggles immediately; on scroll-STOP it SNAPS to the nearest fully-collapsed-or-expanded state (no half-state frozen at rest). The bar is LEGIBLE at every collapse fraction (never the pale-fade-into-content trap). Captured to `docs/tranches/BC/audit/visual/W-SCROLL-CHROME-DELTA.md` (Live-verify = captured delta via the dev-tools MCP, never a commit claim) with the AZ-form freshness headers (capture date + demo build hash + browser/GPU).
2. **Machine gate `proof:scroll-chrome`** (born-RED on HEAD → GREEN; device-free SOURCE arm `["local","ci","release"]`, `scripts/proof-scroll-chrome.mjs`):
   - **C1 — the composable exists ONCE on `/motion-core` + composes the reader.** `useScrollChrome` is exported from `motion/core/index.ts`; it imports `useScrollTrigger` (composes the reader — no second `addEventListener("scroll")`, no second rAF coalesce). Engine-free (vue-only). Born-RED (no such export). Self-test bite: a planted raw scroll listener in `useScrollChrome` reds.
   - **C2 — PERSISTENT-by-default.** `collapseOnScroll` defaults `false`; a bare `useScrollChrome` keeps `collapseT` at 0. Born-RED if the default collapses (the iOS-27 fence). Self-test bite: a planted `collapseOnScroll = true` default reds; a planted unconditional collapse-ramp reds.
   - **C3 — compositor-only shrink/quiet.** `.scroll-chrome` (and the `useScrollChrome` ramp) animate ONLY the compositor set (transform/translate/scale/opacity/filter/box-shadow/`--*`); NO `height`/`padding`/`width`/`inline-size`/`top` collapse leg (`proof:no-layout-animation` extended-in-place owns the corpus — this clause adds the `.scroll-chrome` audit). Born-RED if a layout-property collapse leg survives. Self-test bite: a planted `transition: height var(--…)` collapse leg reds.
   - **C4 — the flip-delta + snap-midpoint + velocity-gate present.** `flipDeltaPx` defaults 8; `snapMidpoint` defaults 0.5; the snap commits on scroll-stop; the optional `velocityGate` short-circuits. Born-RED if the snap-to-state or flip-delta is absent (a no-snap collapse leaves a half-state at rest — the §2.1 defect). Self-test bite: a planted no-snap ramp (collapseT rests mid-range) reds C4.
   - **C5 — the blur stays crisp + the quiet never goes invisible.** The `--chrome-collapse-t` ramp does NOT drive the resting `backdrop-filter` blur (the W-DOCK-SHRINK-BLUR fence); the `opacity` quiet is bounded above a never-invisible floor (the NN/g pale-fade trap forbidden). Born-RED if a collapse leg drives `backdrop-filter` blur OR fades opacity to 0. Self-test bite: a planted `backdrop-filter: blur(calc(… * --chrome-collapse-t))` reds; a planted `opacity: calc(1 - --chrome-collapse-t)` (→0) reds.
   - **C6 — PRM-discrete.** Under reduce the ramp drops to a discrete instant snap WHILE the `collapsed` state stays correct (the CSS recipe's ramp is inside the PRM-no-preference gate; the discrete snap is on every engine). Born-RED if the chrome can rest half-collapsed under PRM. Self-test bite: a planted ramp outside the PRM gate reds.
   - **+ a self-test bite per clause.**
3. **π readback `tests-visual/scroll-chrome.spec.ts`** (both modes + WebKit, LOCAL real-render — rides `BC.W-PAINT-GATE` / the gestalt close):
   - A **CDP Layout-track trace** across the collapse: the Layout track is FLAT (zero per-frame layout — the compositor-only floor), born-RED if a height/padding collapse leg triggers per-frame layout.
   - A **per-frame `--chrome-collapse-t` sample** (rAF `getComputedStyle`): scroll-down ramps it 0→1 monotonically; scroll-up ramps 1→0; on scroll-stop it SNAPS to 0 or 1 (past 0.5), no half-state — born-RED on a no-snap HEAD.
   - A **velocity-gate assert**: a fast scripted flick collapses/expands immediately (collapseT jumps to the endpoint), a slow drag respects the threshold.
   - A **legibility assert**: at the most-collapsed fraction the chrome's computed `opacity` is above the never-invisible floor (the bar reads), both modes; the resting `backdrop-filter` blur radius is UNCHANGED across the collapse (crisp, not blurred-into-mud).
   - **PRM**: under `prefers-reduced-motion: reduce` the collapse is a single instant snap (zero interpolation frames), the `collapsed` state correct.
   - **WebKit**: the shrink/quiet runs (transform/opacity is cross-engine — no `backdrop-filter: url()` on this path); the snap-to-state paints on WebKit.
   - **Captured to `W-SCROLL-CHROME-DELTA.md`** beside the gestalt frame-series.

## Fences / invariants (must NOT regress)
- **PERSISTENT default** — `collapseOnScroll: false`; collapse is opt-in (the iOS-27 lesson, C2). The bare chrome never auto-collapses.
- **No JS scroll lib** — composes `useScrollTrigger` (the native `scroll()`/rAF dual-path); no Lenis/GSAP/momentum loop.
- **One reader** — `useScrollChrome` reads `useScrollTrigger`; it never re-derives a scroll read (no second listener, C1).
- **Compositor-only** — transform/opacity/filter/box-shadow/`--*`; NEVER per-scroll-frame height/padding (`proof:no-layout-animation`, C3).
- **Crisp glass** — the collapse never drives the resting `backdrop-filter` blur (the W-DOCK-SHRINK-BLUR fence, C5); the shrunken bar is crisp.
- **Never invisible** — the opacity quiet is bounded above a legible floor (the NN/g pale-fade trap forbidden, C5); the bar reads at every collapse fraction.
- **PRM discrete-survives** — the `collapsed` STATE is correct under reduce (instant snap, no half-state, C6); only the ramp interpolation drops (`useFadingScroll` model).
- **Engine-free leaf** — `useScrollChrome` imports `vue` only; ships on `/motion-core`, not `/motion`.
- **`BC.W-PAGE-CHASSIS` boundary** — that wave owns the PAGE-hero sticky scroll-shrink (a sticky-in-flow surface); this wave is the FLOATING chrome collapse (the dock + a floating header). No double-ownership: a page hero is `BC.W-PAGE-CHASSIS`'s, a floating bar is this wave's (the dock-search consumer is `BC.W-DOCK-SEARCH`'s).
- **Clean break, no alias** (MEMORY: no backwards compat): the chrome behavior is the new composable + recipe; no legacy scroll-collapse path to alias.

## Folds (deferrals discharged)
- **The §3.2 gap #1 scroll-collapse composable** (`ios27-search-scroll-sota.md`) — DECIDED/BUILD: the direction+velocity+threshold+snap collapse-state machine is built here over the `BC.W-SCROLL-TRIGGER` reader. DECIDED, no re-book.
- **The iOS-27 persistent-default lesson** (`ios27-search-scroll-sota.md §0`) — DECIDED/BAKED: `collapseOnScroll` defaults false; the gate's C2 fence makes the persistence machine-locked (a future always-collapse default reds). DECIDED.
- **The SegmentedTabs tab-bar scroll-minimize** (`ios27-tab-switcher.md §1.4`) — HELD: that booked opt-in stays a SegmentedTabs concern (a tab-bar minimize, NOT a floating-chrome collapse); a SegmentedTabs that wants it composes `useScrollChrome`, but the tab-bar wiring is its own wave's. Recorded HELD-with-rationale (no double-ownership).
