# lens-c — SCROLL-CHOREOGRAPHY, greenfield (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Lens: maximum 1940s-technicolor FLOW & PUNCH — anticipation, follow-through, overlapping action, arcs,
> squash & stretch with real WEIGHT/INERTIA. The boldest variant that is still idiomatic + cross-engine.
> The bar: the scroll-choreography WORKS + carries liquid weight, both modes, both engines.

---

## 0 — The live interrogation (REAL scroll gesture, Chrome 149, `/motion/scroll-*`)

Captured live on `http://localhost:5173`, real scroll sweep + frame-series readback + `getAnimations()`
introspection. The DELTA artefacts: `./scroll-system-live.png` + the readbacks below.

### (1) Does it WORK? — NO for the headline stage. Mechanism + breakage, exact:

**`.scroll-pin` is DEAD.** The story renders inside a chassis whose real scroll port is
`main.demo-main-scroller` (`scrollHeight 4164 / clientHeight 806`, `overflow-y:auto`). The `.scroll-pin`
container declares `scroll-timeline-name: --gl-pin` on **itself** — but it is `overflow:visible`, i.e. NOT a
scroll container. A `scroll-timeline-name` only produces progress when the named element actually scrolls.
Readback across a full scroll sweep (pin `rect.top` 1277 → −1502, the pin travelling through the viewport):

```
gl-pin-reveal  timeline=ScrollTimeline  playState=running  currentTime=NULL
revealOpacity: 1  revealTransform: none   (EVERY frame, i=0..6)
settleTransform: none                      (EVERY frame)
```

The animation is *bound and "running"* but its `currentTime` is **`null`** — the `--gl-pin` timeline is
inactive because its source element does not scroll. So the reveal phase (opacity 0→1, translateY 2.5rem,
scale 0.96) and settle phase **never fire**. The headline "scrolling advances time inside the pinned stage"
move shows a static terminal frame. This is not jank — it is a **structurally dead timeline**. The
`@supports (timeline-scope: --gl-pin)` gate passes (Chrome supports it), so there is no graceful-static
escape hatch — it silently renders nothing.

**`.scroll-cascade` is ALIVE but un-exercised.** Its `view()` timeline resolves (`currentTime` is a real
`CSSNumericValue`, not null — `view()` correctly tracks the element against the *viewport*, independent of
which ancestor scrolls). But the demo has only **3 oversized `<section>` children**, each taller than the
entry window, so they are already past `entry 45%` by the time they are observed — `opacity:1,
transform:matrix(1,0,0,1,0,0)` across the sweep. The recipe works; the demo never shows it.

**`.scroll-build` (route-enter)** fires on mount (it is a plain `@keyframes`, not a timeline) and is fit.

### (2) Are we using KEYFRAMES.JS? — NO. The v5 scroll engine ships UNCONSUMED.

keyframes.js exports a complete JS scroll-progress driver — **verified present** in
`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts`:

- `class ScrollScene` + `createScrollScene(spec)` (`:1268`, `:2706`) — the SO-2 JS driver.
- `scrollProgress(p)` (`:2730`) — drive from a raw scroll position; maps through the parsed
  `animation-range` to local progress.
- `.tick(dt)` (`:2734`) — advances the **scrub `SmoothProgress` smoother** (the damping the native
  `animation-range` lane LACKS — the liquid-weight leg).
- `snap` via `decayRest` + `SpringProgress` (`ScrollSceneOptions.snap`/`snapSpring`) — physics snap-on-idle.
- `.on("enter"|"leave", cb)` (`:2761`) — threshold detector derived from the range.
- `ScrollSceneBackend` dispatch (`:2659`) — native-vs-JS, with `scrub`/`snap`/`velocity` forcing JS.

**grep proves zero consumption:** `ScrollScene` / `createScrollScene` appear in **NO** `src/` or `demo/`
file. `src/composables/motion/useScrollProgress.ts`, `useScrollTrigger.ts`, `useScrollChrome.ts`,
`scrollReader.ts` all **explicitly fence keyframes.js OUT** ("no `@mkbabb/keyframes.js`", `scrollReader.ts:20`,
`useScrollTrigger.ts:33`). They hand-roll `progress = pos / extent` (`useScrollTrigger.ts:209`) — a raw,
unsmoothed ratio. So: the scroll-progress engine the user is asking about **exists in the sibling dep and is
wired to nothing.** The composables re-implement a strictly-weaker subset (1:1, no scrub, no snap-physics).

### (3) LIQUID-WEIGHT — NO. Stiff 1:1, zero inertia.

`useScrollTrigger.evaluate()` writes `progress.value = clamp01(pos / extent)` directly on every rAF tick.
There is **no `SmoothProgress` damping, no spring settle, no momentum**. The JS continuous ramp is a hard
1:1 jump that tracks the raw scrollbar. `useScrollChrome` ramps `collapseT` over a px range linearly and
SNAPS on scroll-stop — no spring on the snap either (it `apply(settled)` instantly). The native CSS legs
(`.scroll-cascade`/`.scroll-pin`) are `linear` timeline maps — also 1:1 (correct for a *scrubbed* axis, but
nothing carries the patient `--spring-gentle` settle the user wants). Verdict: **the whole system is stiff.**
This violates the standing law (design.md §L4: "Motion that snaps tight with no give … is the anti-pattern").

### (4) CROSS-ENGINE — the native path is the SOLE path; no Safari-safe JS baseline is wired.

`.scroll-pin` sits behind `@supports (animation-timeline: scroll()) and (timeline-scope: --gl-pin)`. On
Safari < 26 (no `scroll()`/`timeline-scope`) the gate fails and the stage renders **static** — a "correct
non-pinned read" per the CSS comment, BUT that means the headline choreography is **Chrome-only**. The
keyframes.js `ScrollScene` JS driver — which IS the Safari-15-safe baseline — is wired to nothing, so there
is no progressive-enhancement story: it is native-or-nothing. This is exactly the "default-to-broken-on-
Safari" failure the brief warns against.

### (5) The `.scroll-build` / `.scroll-cascade` arms — owned by entrance-reveal; reconcile, do not dup.

`entrance-reveal/WAVE-AMENDMENT.md` AMENDMENT 2 already owns the **squish augment** of
`gl-page-build`/`gl-cascade-build` (Bug B, the in-place `scale:`-longhand reciprocal-squish edit) + the
`--i` key + the PRM arm. **This lens must NOT re-edit those keyframes.** It owns the *scroll-progress
engine* + the *pin* + the *smoothing/liquid-weight*; it CROSS-LINKS the cascade squish.

---

## 1 — The greenfield idea: **`createScrollScene` IS the engine; the timeline is a render target, not the driver**

One sentence: **make the keyframes.js `ScrollScene` driver the single source of scroll-progress truth on
EVERY engine, write its scrub-smoothed `--scroll-t` into a CSS custom property, and let CSS
`@keyframes`/recipes consume that ONE property — so native `scroll()`/`view()` becomes a *progressive
compositor handoff* for the pure-cosmetic legs only, never the load-bearing driver.**

The current architecture has it backwards: it treats native `scroll()`/`view()` as primary and the JS as an
absent fallback. Invert it. The JS `ScrollScene` runs on Safari-15 AND Chrome, gives us **scrub
(`SmoothProgress` inertia) + snap (`SpringProgress`) + velocity + enter/leave for FREE** (all already
solved in the sibling dep), and writes a single damped `--scroll-t ∈ [0,1]` per scene. CSS reads `--scroll-t`
for the cosmetic interpolations. Where the leg is a *pure* compositor cosmetic (a parallax drift, a fade)
AND the engine has native `scroll()`/`view()`, we let the native timeline drive THAT property directly (the
dual-path single-writer the codebase already understands) — but the **liquid-weight scrub is JS-owned
always**, because native `animation-range` has no smoother (keyframes.js says so itself: "the damping the
native lane LACKS").

### The single boldest move

**Kill the `--gl-pin` named-scroll-timeline entirely. Replace the pin with `useScrollPin` — a
`createScrollScene({ scrub, snap })`-backed composable that writes ONE `--pin-t` custom property onto the
sticky stage, and drives the phases as a CARTOON SLAM: anticipation dip → overshoot → settle, scrubbed by
the spring-damped `--pin-t`, not by raw scroll.** The stage no longer needs to BE a scroll container; the
composable reads whatever the real scroll port is (resolved via the existing `createScrollReader` source
resolution — `HTMLElement | Window`), so the chassis's `main.demo-main-scroller` port Just Works. This single
move fixes defect (1) [dead timeline], (2) [now uses keyframes.js], (3) [scrub = liquid weight], and (4)
[JS driver = Safari baseline] at once.

---

## 2 — The mechanism (composables · tokens · recipes), DEFT union with the shipped set

### 2a — `useScrollScene` — the ONE new leaf (wraps `createScrollScene`, owns the rAF)

A thin Vue wrapper that UNIONS the shipped `createScrollReader` (the rAF-coalesced scroll source — reused,
not re-forked) with the keyframes.js `createScrollScene` driver (the smoothing/snap/events — reused, not
re-implemented). It is the seam the four shipped composables were missing.

```ts
// src/composables/motion/useScrollScene.ts  (keyframes-bearing → ships on /motion, NOT /motion-core)
import { createScrollScene, type ScrollSceneOptions } from "@mkbabb/keyframes.js";
import { createScrollReader, type ScrollSource } from "./scrollReader";   // REUSE the shipped core
import { useRAFLoop } from "./useRAFLoop";                                 // REUSE the shipped loop

export interface UseScrollSceneOptions extends ScrollSceneOptions {
  /** Write the damped 0..1 onto this element as `--scroll-t` (the dual-path JS leg). */
  bindEl?: MaybeRefOrGetter<HTMLElement | null>;
  /** The custom-property name to write. Default "--scroll-t". */
  property?: string;
  /** Honor PRM: drop scrub+snap to a discrete 1:1 (no smoother frames). Default true. */
  respectReducedMotion?: boolean;
}
// Returns { progress: Ref<number>, enter: hook, leave: hook, recalculate }.
```

- **The rAF discipline:** the scene owns no loop (`createScrollScene` doc: "the scene owns no rAF"). The
  shipped `useRAFLoop` runs ONLY while the smoother is unsettled (`scene.settled === false`) — it auto-stops
  at rest (no free-running loop; the no-Lenis-momentum-loop fence is honored — this is a *settle* loop, not a
  perpetual one). On each scroll tick `createScrollReader.onTick` calls `scene.scrollProgress(rawP)`; on each
  rAF frame `scene.tick(dt)` advances the `SmoothProgress` damper; the damped value is written to
  `--scroll-t` (the dual-path single-writer JS leg) AND mirrored to a reactive ref.
- **Liquid weight, finally:** `scrub` defaults to `~0.18s` of `SmoothProgress` damping (the patient
  `--spring-gentle` feeling design.md §L2 names for scroll); `snap` is opt-in (the pin uses it; a free parallax
  does not). This is the inertia — the property lags the raw scrollbar with weight, exactly the standing law.
- **One reader, no fourth listener:** it composes `createScrollReader` (the existing core). No new
  `addEventListener("scroll")`. This satisfies the no-fourth-listener fence the codebase enforces.

### 2b — Retarget the shipped composables onto `useScrollScene` (no re-fork, a UNION)

- **`useScrollProgress`** (the `pos/extent` math): replace its hand-rolled `computeProgress` with a
  `useScrollScene({ scrub })` instance. The `NATIVE_SCROLL_TIMELINE` early-return STAYS for the pure-cosmetic
  CSS leg, but the returned `Ref<number>` now carries scrub-weight on the JS path. **No public-API change**
  (still `Ref<number>`), so consumers don't break — a clean internal re-platform.
- **`useScrollTrigger`**: keep its discrete `onCross/onEnter/onLeave` (those are fit and orthogonal), but
  its continuous `progress` ramp delegates to a `useScrollScene` rather than `clamp01(pos/extent)`. The
  velocity/direction logic stays (it is the chrome-collapse input). The enter/leave could later fold into
  `ScrollScene.on(...)`, but that is an OPTIONAL DRY follow-on, not required (survival-of-the-fittest: the
  trigger's flip-delta debounce is fit, keep it).
- **`useScrollChrome`**: its `collapseT` snap-on-stop becomes a `snap: [0,1]` + `snapSpring` on a
  `useScrollScene` — the snap is now a **`SpringProgress` settle**, not an instant `apply(settled)`. THIS is
  the liquid-weight the chrome collapse was missing (the bar shrinks with a spring-damped settle, never a
  hard cut). Persistent-by-default (`collapseOnScroll:false`) is KEPT.

### 2c — `useScrollPin` + the rewritten `.scroll-pin` recipe (the headline fix)

Delete `scroll-timeline-name: --gl-pin` + `timeline-scope: --gl-pin` from `scroll-choreography.css`. Replace
with `useScrollPin(scrollPort, { stageRef, phases })` — a `useScrollScene({ scrub: 0.2, snap: phaseSnaps })`
that writes `--pin-t ∈ [0,1]` onto the sticky stage. The recipe becomes a pure `--pin-t` reader:

```css
.scroll-pin-stage { position: sticky; inset-block-start: 0; }
/* Phase windows read --pin-t — NO animation-timeline, NO @supports gate needed (works on every engine). */
.scroll-pin-phase-reveal {
  /* anticipation dip → overshoot → settle, mapped off the SPRING-DAMPED --pin-t (cartoon slam). */
  opacity: clamp(0, calc(var(--pin-t) / 0.45), 1);
  translate: 0 calc((1 - clamp(0,calc(var(--pin-t)/0.45),1)) * var(--scroll-pin-lift, 2.5rem));
  scale: calc(0.96 + 0.04 * clamp(0,calc(var(--pin-t)/0.45),1));
}
```

(For the cosmetic parallax sub-leg on a `scroll()`-capable engine we MAY still bind a native
`animation-timeline: scroll(nearest)` to a `@property --pin-parallax` — that's the legitimate progressive
compositor handoff for a pure drift; but the LOAD-BEARING phase reveal is `--pin-t`, JS-driven, universal.)

**CARTOON PUNCH on the pin:** the phase keyframes carry the §L4 register — `--motion-weight`-scaled
squash&stretch (`scale:`-longhand reciprocal, vol-preserving, the W-LIQUID-FLEX engine — NOT a new squish
engine), a `--ease-cartoon-punch` anticipation dip on the reveal IN, a layered `--shadow-cartoon-md` cel
cast on the headline card that travels OPPOSITE the scroll drift (design.md §Cartoon-shadows "moving cast",
a `::after` transform, never animated box-shadow), and follow-through (the caption settles `+6ms·weight`
after the card — overlapping action). The `--pin-t` being spring-damped means the slam *arrives with
inertia*, then the snap settles it — the 1940s "weight lands, jiggles, settles" feel.

### 2d — Tokens (depend-on, no re-mint)

| token | home | role |
|---|---|---|
| `--scroll-t` | written by `useScrollScene` per-scene | the ONE damped 0..1 every recipe reads |
| `--pin-t` | `useScrollPin` (a named `--scroll-t`) | the pin phase clock |
| `--scroll-scrub` | §Motion (NEW, this wave) | the default scrub seconds (`~0.18s`, the §L2 gentle feel) |
| `--motion-weight` | `BD.W-MORPH-PUNCH-TOKENS` (DEPEND-ON) | scales the pin squash/cast/overshoot |
| `--ease-cartoon-punch` | `BD.W-MORPH-PUNCH-TOKENS` (DEPEND-ON) | the anticipation-dip pin-IN curve |
| `--shadow-cartoon-md` | §Cartoon-shadows (extant) | the pin cel cast |
| `--spring-gentle` | §L2 (extant) | the scrub feeling reference |

Only `--scroll-scrub` is minted here. Everything else is consumed via `var(…, fallback)` so the recipe
ships GREEN before the punch-token wave lands.

---

## 3 — Cross-engine (Chrome + Safari), a11y/PRM

- **Safari-15 baseline = the JS `ScrollScene`.** Because the load-bearing driver is now JS, the pin/scrub
  WORK on Safari 15+ with zero native scroll-timeline. `scroll()`/`view()` become a **pure progressive
  enhancement** for cosmetic-only legs (parallax drift, the bare cascade fade) under
  `@supports (animation-timeline: scroll())` — and even there the JS path is the single writer of the
  load-bearing `--scroll-t` (the dual-path single-writer law). **Default-to-broken-on-Safari is eliminated**
  by construction.
- **No `view()`/`timeline-scope` reliance for the headline.** The pin recipe needs NO `@supports` gate — it
  reads a custom property a composable writes. The `timeline-scope` newest-primitive fragility is GONE.
- **`linear()` floor:** any `linear()`-spring CSS (if used for a cosmetic leg) carries the
  `@supports (animation-timing-function: linear(0,1))` cubic-bezier fallback (Safari < 17.2) — the codebase
  precedent. The JS `SpringProgress`/`SmoothProgress` need no such floor (pure math).
- **PRM carve:** `respectReducedMotion` drops scrub + snap to a discrete 1:1 (no smoother frames, no
  spring settle) — the scene still resolves `--scroll-t` but as a hard ratio, and the pin shows its terminal
  phase (no slam, no cast travel, no overshoot). This mirrors the existing `useScrollChrome`/`useFadingScroll`
  "discrete-survives" model. `prefers-reduced-transparency` does not touch the cel cast (opaque ink, a
  legibility asset). The `.smooth-scroll` native opt-in stays PRM-gated (vestibular).
- **Compositor-only:** every leg animates `opacity`/`translate`/`scale`/`clip-path` off the custom property
  — never a layout property (the proof:no-layout-animation floor). The cel cast is a `::after` transform.

---

## 4 — DELTA-ASSAY → the wave amendment (reconcile vs the 116-wave set; NO dup vs entrance-reveal)

| wave | disposition | what changes |
|---|---|---|
| `BB.W-SCROLL-MOTION` (the `.scroll-build/-cascade/-pin` author) | **AUGMENT** | (a) DELETE `scroll-timeline-name:--gl-pin`/`timeline-scope` from `.scroll-pin`; rewrite the phase recipes as `--pin-t` readers (universal, no `@supports`). (b) Lift the no-keyframes.js fence on the scroll *engine* leaves: mint `useScrollScene` wrapping `createScrollScene`. The `.scroll-build` mount-clock + the `view()` cosmetic enhancement structure KEPT. |
| `BC.W-SCROLL-TRIGGER` (authors `useScrollTrigger`/`scrollReader`) | **AUGMENT** | continuous `progress` ramp delegates to `useScrollScene` (scrub-weight); the discrete `onCross/onEnter/onLeave` + flip-delta debounce + velocity/direction KEPT byte-for-byte; `scrollReader` REUSED as the scene's source resolver (no re-fork). |
| `BC.W-SCROLL-CHROME` (authors `useScrollChrome`) | **AUGMENT** | the scroll-stop snap becomes a `snap:[0,1]` + `snapSpring` `SpringProgress` settle (the liquid-weight the collapse lacked); persistent-by-default KEPT. |
| `useScrollProgress` author wave | **AUGMENT** | internal re-platform onto `useScrollScene`; public `Ref<number>` UNCHANGED (no consumer break). |
| `W-LIQUID-ENTRANCE-GENERAL` / entrance-reveal AMENDMENT 2 | **CROSS-LINK ONLY** | it OWNS the `.scroll-build/.scroll-cascade` squish keyframe edit (Bug B). This lens does NOT touch those keyframes — it owns the *engine*/*pin*/*scrub*. The cascade squish + the scrub-weight compose cleanly (one writes the keyframe, the other the driver). |
| `BD.W-MORPH-PUNCH-TOKENS` | **DEPEND-ON** | `--motion-weight` + `--ease-cartoon-punch` for the pin cartoon register, via `var(…, fallback)`. |
| every other wave | **NO CHANGE** | nothing pruned. |

**Net: 4 AUGMENT (existing) + 1 NEW leaf (`useScrollScene`) + 1 CROSS-LINK (entrance-reveal owns the
cascade squish) + 1 DEPEND-ON. ZERO re-fork, ZERO dup of the entrance-reveal scope.**

### The born-RED gate (a REAL scroll gesture + a frame-series readback, both modes, both engines)

- **R-PIN (RED on HEAD — live-confirmed):** drive a real scroll sweep on the resolved port; assert the pin
  reveal phase `opacity`/`transform`/`scale` MOVE across the sweep AND the bound animation's progress is
  non-null. HEAD: `gl-pin-reveal currentTime===null`, `opacity:1, transform:none` ALL frames (captured).
- **R-WEIGHT (RED on HEAD):** sample `--scroll-t` (or the JS `progress`) at the instant of a scroll STOP;
  assert it LAGS the raw `scrollTop/extent` ratio for ≥2 frames then converges (the scrub inertia). HEAD:
  `progress === pos/extent` exactly (no lag) — RED.
- **R-SNAP (RED on HEAD):** a slow drag near a chrome-collapse midpoint, release; assert `collapseT`
  overshoots/settles via spring (≥1 frame past the endpoint then back). HEAD: instant `apply(settled)` — RED.
- **R-KF (static, RED on HEAD):** grep asserts `createScrollScene` is imported by `src/`. HEAD: zero
  imports — RED.
- **R-SAFARI (paired-engine):** under WebKit with native `scroll()` FORCED off, the pin STILL fires (JS
  driver). HEAD: `@supports` gate fails → static stage — RED.
- **R-PRM:** under reduce, `--scroll-t` is a hard 1:1, the pin shows terminal phase, zero slam/cast frames.
- **Paired engine (Chromium + WebKit, both modes):** the capture is the DELTA artefact (the [[Live-verify
  capture]] law) — a screenshot + paired-π frame-series, not a commit-message claim.

**What reds on HEAD (live-confirmed this session):** R-PIN (`currentTime:null`, dead `--gl-pin`), R-KF
(`createScrollScene` consumed nowhere), R-WEIGHT/R-SNAP (stiff 1:1, no smoother), R-SAFARI (native-or-static).

---

## 5 — Why this is the fittest variant (survival, not novelty)

It REUSES three shipped cores — `createScrollReader` (source), `createScrollScene` (smoother/snap/events),
`useRAFLoop` (settle loop) — and adds exactly ONE seam (`useScrollScene`) that the four extant composables
were each independently missing. It INVERTS the one wrong assumption (native-timeline-as-primary) into the
correct one (JS-scene-as-primary, native-as-progressive-cosmetic-handoff), which simultaneously fixes the
dead pin, the absent keyframes.js wiring, the missing liquid weight, AND the Safari gap. It does NOT re-fork
the entrance-reveal squish, does NOT add a momentum library, does NOT re-mint the punch tokens. The cartoon
PUNCH (anticipation dip, vol-preserving squash, moving cel cast, overlapping follow-through) rides the
extant `useLiquidFlex` + `--shadow-cartoon-md` + `--ease-cartoon-punch` — loud, alive, golden-proportioned,
and now WEIGHTED, because the clock under it is a spring-damped scene instead of a raw scrollbar ratio.
