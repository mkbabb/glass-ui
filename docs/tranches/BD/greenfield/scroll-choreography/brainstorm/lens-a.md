# Lens A — SCROLL-CHOREOGRAPHY, greenfield (pure iOS-27 fidelity)

> GREENFIELD-INTERROGATE → DELTA-ASSAY → wave-amendment. The lens: the most faithful,
> audacious iOS-27 Liquid-Glass scroll system glass-ui can ship — and it must actually
> WORK and carry LIQUID WEIGHT, both modes, both engines. Born-RED, default-to-broken.

---

## 0. The live interrogation — what is actually on screen (captured, not claimed)

Route: `/motion/scroll-choreography`, Chromium, light mode, dev server live. Real scroll
gesture driven on the true scroll container + a frame-series readback.

### 0.1 THE DEMO DOES NOT WORK — the choreography is structurally DEAD

The page presents three recipes: `.scroll-build` (mount page-build), `.scroll-cascade`
(per-section `view()` cascade), `.scroll-pin` (fixed-stage-advances-time). Capability
badges all read **supported** (`scroll()`, `view()`, `timeline-scope` all true on this
Chromium). So the gates are open — yet the choreography never moves:

**The `.scroll-pin` stage — frame-series across the full scroll range (the scroller is
`main.demo-main-scroller`, scrollH 4164 / clientH 806, max 3358px):**

| scroll frac | scrollTop | `.scroll-pin-phase-reveal` transform | opacity | pinTop (stage sweeping?) |
|---|---|---|---|---|
| 0.00 | 0 | `none` | 1 | 1391 |
| 0.20 | 672 | `none` | 1 | 719 |
| 0.40 | 1343 | `none` | 1 | 48 (pinned) |
| 0.55 | 1847 | `none` | 1 | −456 |
| 0.70 | 2351 | `none` | 1 | −960 |
| 1.00 | 3357 | `none` | 1 | −1966 |

The stage IS pinning + scrolling (pinTop sweeps 1391 → 48 → −1966), but the reveal
**transform never leaves `none` and opacity never leaves 1** across the ENTIRE range. The
phase animation is bound but inert.

**The `.scroll-cascade > *` — transform stays `matrix(1,0,0,1,0,0)` (identity) at every
sampled frac.** The `view()` cascade never fires either.

**The smoking gun (the animation's own timeline state, captured in place at frac 0.42):**
```
{ name: "gl-pin-reveal", state: "running", currentTime: null,
  timeline: { type: "ScrollTimeline", currentTime: null } }
```
The animation is `running` and bound to a real `ScrollTimeline` — but the timeline's
`currentTime` is **`null`**. A `ScrollTimeline.currentTime === null` means **the named
scroll-timeline `--gl-pin` resolved NO scroll container**, so progress never computes and
the animation parks at its `from` keyframe forever.

### 0.2 THE ROOT CAUSE — the named timeline is declared on a NON-scroller

`scroll-choreography.css` declares:
```css
.scroll-pin { scroll-timeline-name: --gl-pin; scroll-timeline-axis: block; timeline-scope: --gl-pin; }
```
But `.scroll-pin` is `position: relative; overflow: visible` — **it is NOT a scroll
container.** A `scroll-timeline-name` only produces a non-null progress when its declaring
element actually scrolls. The REAL scroller is an ancestor, `main.demo-main-scroller`
(ancestor-chain captured: `section → section.scroll-cascade → div.card → div.story-hero →
article.scroll-build → main.demo-main-scroller[overflow-y:auto]`). The demo chassis
(`demo/layout/dock-nav.css`) already correctly names `scroll-timeline-name:
--demo-main-progress` on `.demo-main-scroller` and exposes `--scroll-progress-scroller:
--demo-main-progress` to the `.scroll-progress` bar (which DOES work). But the
choreography register **ignores that named scroller** — `.scroll-pin` invents its own
`--gl-pin` on a passive div, and `.scroll-cascade > *` uses bare `view(block)`, which in
this deeply-nested, `contain`-bearing, sticky-context chassis resolves against the wrong
(non-scrolling) box and yields identity. **Net: the entire CSS-only scroll choreography is
inert in the one chassis it ships in.** Born-RED is honest and easy.

### 0.3 LIQUID WEIGHT — absent by construction, even if it DID fire

Two separate liquid-weight failures, both confirmed in source:

- **`useScrollProgress.ts` is a stiff 1:1 jump.** `computeProgress()` =
  `clamp01((start − rect.top) / span)` written straight to a `ref` on every rAF scroll
  tick. **Zero smoothing, zero inertia, zero spring.** Whatever consumes this number
  tracks scroll position 1:1 — the exact "stiff jump" the standing law forbids ("ALL
  scrolling … should have INERTIA and LIQUID WEIGHT").
- **The CSS recipes are `linear`-scrubbed.** Even when fixed, `.scroll-cascade`/`.scroll-pin`
  use `animation: … auto linear both` bound to the scroll-timeline — a strict 1:1 map of
  scroll-position → keyframe-progress. That is the CORRECT primitive for a *scrubbed*
  progress axis (a spring on a scrubbed timeline reads as a scrubbed spring), but it means
  the system has **no lag, no follow-through, no settle** — it is glued to the finger. iOS
  scroll-choreography is NOT glued: the content has a hair of inertia, a smoothed catch-up,
  a settle when the finger lifts. glass-ui ships none of that on the scroll axis.

### 0.4 ARE WE USING KEYFRAMES.JS? — NO. And keyframes.js ships the exact engine we need.

The user's literal question. The answer is **no, and pointedly so**:
- `useScrollProgress.ts`, `scrollReader.ts`, `useScrollTrigger.ts`, `useScrollChrome.ts`
  are all explicitly **keyframes-FREE + vueuse-FREE** (header comments say so verbatim — "no
  `@mkbabb/keyframes.js`") so they can ship on the engine-free `/motion-core` subpath. They
  hand-roll a rAF scroll listener (`scrollReader.ts` — a thin coalescer, NOT a momentum
  loop, with a "no-Lenis/GSAP fence") and write a raw clamped ratio.
- Meanwhile **`@mkbabb/keyframes.js@4.3.0` (installed, sibling dep) ships the entire
  scroll-progress facility the brief calls "the v5.0 facility"** — verified in
  `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts`:
  - **`SmoothProgress`** — a frame-rate-independent first-order damped smoother with a
    managed rAF loop: `setTarget(t)`, `tickDt(dt)`, `play(onFrame)`, `settled`, PRM-snap
    (`_snapSettled`). **This IS the liquid-weight primitive for a scroll number.**
  - **`SpringProgress`** — second-order damped spring (response, ζ), already wrapped by
    `useSpring`. The over-/under-damped settle for a weightier catch-up.
  - **`ScrollScene` / `createScrollScene(spec)`** — a JS scroll-progress driver with
    `range` + `scrub` (a `scrub: 0.2` lag term — literally the liquid-weight knob).
  - **`parseScrollCSS` / `serializeScrollOptions` / `dispatchScrollBackend`** — the
    "conservative-correct backend dispatch" (K.W9 SCROLL-AS-CSS): author the scroll spec
    ONCE, dispatch to the native CSS `scroll()`/`view()` timeline when supported, fall back
    to the JS `ScrollScene` when not — **the cross-engine dual-path, already built in the
    dependency, unused by glass-ui.**
  - **`springLinearStops` / `springTimingFunction`** — the spring's `linear()` twin: a
    spring-shaped easing string you can drop onto a *scrubbed* `animation-timeline` so the
    scroll map is NOT linear — it carries spring weight on the compositor (the answer to
    §0.3's "linear-scrubbed has no weight" with ZERO JS).

So: glass-ui hand-rolled a stiff, keyframes-free scroll number AND a broken CSS-only
choreography, while the sibling dependency ships a `scrub`-able, spring-shaped,
dual-backend scroll engine. **That gap IS the wave.**

---

## 1. The greenfield idea — "the scroll IS a spring you scrub"

One sentence: **scroll-progress is not a raw ratio glued to the finger — it is a
spring-smoothed value with a `scrub` lag, authored once and dispatched to the native CSS
compositor timeline (spring-shaped, not linear) where supported and to the keyframes.js
`ScrollScene` JS driver where not — so every scroll-driven surface (progress bars, the
section cascade, the pinned stage, the chrome collapse) carries the SAME liquid weight in
both engines and both modes.**

The system has four faithful iOS-27 behaviours, all on ONE progress spine:

1. **Smoothed progress (the liquid-weight floor).** `useScrollProgress` returns a
   `SmoothProgress`-damped number, not a 1:1 clamp. The raw `(start − rect.top)/span` ratio
   becomes the `setTarget()`; the returned `ref` is the smoothed `current`. A scroll burst
   sets a target; the value catches up with inertia + a settle when the finger lifts. PRM →
   `SmoothProgress.snap()` (1:1, no lag — the vestibular floor). This is the standing-law
   compliance, ONE composable, every consumer inherits it.

2. **The section cascade — spring-shaped scrub, not linear.** `.scroll-cascade > *` stays
   a native `view()` timeline (compositor, 60fps, Safari-15-safe fallback), but its easing
   becomes the `springLinearStops({ζ:0.85})` `linear()` twin instead of `linear` — so each
   card's entrance, though scroll-scrubbed, reads with spring weight (a hair of overshoot at
   the end of its range). ZERO JS. The `--spring-gentle` (ζ=0.85, <1% overshoot, design.md
   §80, "the patient-settle variant for scroll-driven choreography") is the named curve.

3. **The pinned stage — FIXED to the real scroller + scrubbed-spring phases.** `.scroll-pin`
   stops inventing `--gl-pin` on a non-scroller. Two correct paths, dual-backend:
   - **Native (Safari-16+ / Chromium):** the stage binds to the **chassis's existing named
     scroller** `--demo-main-progress` via `timeline-scope` lifted to the scroller (or a
     `view()` on the stage's own box — whichever resolves non-null; the gate is a
     `currentTime !== null` assertion, born-RED on today's HEAD). Phases ride `range`
     windows with the spring-shaped easing.
   - **Fallback / Safari-15 (no `timeline-scope`):** the keyframes.js `ScrollScene` JS
     driver computes the same 0..1 phase progress off `useScrollProgress` (already
     SmoothProgress-damped → the JS path gets liquid weight for FREE), writing the phase
     `--pin-phase-t` custom the recipe reads. Same visual, JS-driven, weighted.

4. **The chrome collapse — already fit, threaded onto the spine.** `useScrollChrome`
   (persistent-by-default, the iOS-27 lesson — KEEP verbatim) already ramps `collapseT` +
   snaps on scroll-stop. Its only weakness is the ramp is a raw lerp; thread its
   `collapseT` through the SAME `SmoothProgress` so the collapse carries the same inertia as
   everything else. The velocity-gate flick + scroll-stop snap stay.

**The spine:** ONE authored scroll spec → `dispatchScrollBackend` decides native-CSS vs
JS-`ScrollScene` per engine → `SmoothProgress`/`springLinearStops` put the liquid weight on
BOTH paths. No second scroll listener (the `scrollReader` core stays the ONE listener), no
Lenis/GSAP (keyframes.js is a first-party sibling, not a 40KB net dep), no re-fork.

---

## 2. THE SINGLE BOLDEST MOVE

**Adopt keyframes.js as the scroll-progress engine and make `scrub` a first-class liquid-
weight token — `--scroll-scrub`.** Today's `useScrollProgress` is keyframes-FREE on
principle (the `/motion-core` purity fence) and stiff as a consequence. The bold move
inverts that principle for the scroll spine: **`useScrollProgress` (and the new
`useScrollScene`) import `@mkbabb/keyframes.js`'s `SmoothProgress` + `ScrollScene` +
`springLinearStops`**, and a single design token **`--scroll-scrub` (rest ≈ `1/φ ≈ 0.62`,
the §L4 rest motion-weight)** sets the lag on every scroll-driven surface at once — the
cascade's spring-stop softness, the smoothed-progress damping, the pin-phase catch-up, the
chrome-collapse inertia. One scalar, authored once, golden-proportioned, names "how much
liquid weight the scroll carries." PRM zeroes it (→ 1:1 snap). The keyframes-free stiff
clamp is DELETED (no-backwards-compat, no legacy). This is the move because it answers all
four of the user's questions in one stroke: it makes the demo WORK (the pin/cascade get a
non-null timeline via the JS `ScrollScene` fallback + the fixed native binding), it wires
keyframes.js (the literal "are we using KEYFRAMES.JS?" — now yes, the v5.0 scroll facility),
it injects LIQUID WEIGHT (SmoothProgress + spring-stops + `scrub` on every surface), and it
nails CROSS-ENGINE (`dispatchScrollBackend` = native CSS where supported, `ScrollScene` JS
where not — Safari-15-safe baseline, `view()`/`scroll()` as the progressive enhancement,
exactly the story-page-standard edict).

---

## 3. Mechanism — tokens, composables, recipes (deft, KISS, no re-fork)

### 3.1 Composables (the keyframes.js adoption — UNION, not new fork)

| Symbol | Disposition | Change |
|---|---|---|
| `useScrollProgress.ts` | **AUGMENT (clean break)** | Returns a `SmoothProgress`-damped number. Raw ratio → `setTarget`; returned ref → smoothed `current`; PRM → `.snap()`. Keeps the native-timeline early-return (when the CSS owns the axis, attach nothing). `--scroll-scrub` sets the damping. **Imports `@mkbabb/keyframes.js` (the fence lifts for the scroll spine — documented).** |
| `useScrollScene.ts` | **NEW (thin)** | Wraps keyframes.js `createScrollScene` + `dispatchScrollBackend`: author `{ range, scrub }` once, dispatch native-CSS-or-JS per engine, expose the phase progress ref. The pin stage's dual-backend driver. Composes the ONE `scrollReader` (no second listener) for the JS path. |
| `scrollReader.ts` | **KEEP verbatim** | Still the ONE rAF-coalesced listener core. The JS `ScrollScene` path reads through it. |
| `useScrollTrigger.ts` | **KEEP** (discrete events) | The crossing/direction/velocity reader is FIT — events can't ride a CSS timeline, so it stays JS on every engine. No change beyond optionally threading `velocity` into the SmoothProgress target for a velocity-coupled catch-up (the morph-more-on-move law). |
| `useScrollChrome.ts` | **AUGMENT (minor)** | Thread `collapseT` through `SmoothProgress` for collapse inertia; keep persistent-by-default + velocity-gate + scroll-stop snap verbatim (all FIT, iOS-27-correct). |

### 3.2 Recipes (`scroll-choreography.css` — in-place fixes, no second file)

- **`.scroll-pin` — FIX the timeline binding (the born-RED defect).** Stop declaring
  `scroll-timeline-name` on a non-scroller. Bind the stage phases to the chassis's real
  named scroller (`--demo-main-progress`, already emitted by `.demo-main-scroller`) via the
  `timeline-scope` raised to the scroller, OR a `view()` on the stage box — gated on a live
  `currentTime !== null` proof. The JS `ScrollScene` writes `--pin-phase-t` on the
  non-supporting path. Phases ride `var(--ease-scroll-spring)` not `linear`.
- **`.scroll-cascade > *` — spring-shaped scrub.** Replace `auto linear both` with
  `auto var(--ease-scroll-spring) both` where `--ease-scroll-spring` =
  `springLinearStops({response:.5, ζ:.85})` `linear()` (the `--spring-gentle` twin). The
  `view(block)` axis stays; the fix is the easing carries weight. Verify `view()` resolves
  non-null in THIS chassis (the cascade is identity-frozen today — same root class).
- **`.scroll-build` — KEEP** (it is mount-driven, fires on every engine, already works);
  fold in the entrance-reveal `.liquid-enter` squish per the cross-link below.
- **`.smooth-scroll` — KEEP** (native `scroll-behavior:smooth`, PRM-gated, zero runtime).

### 3.3 Tokens

```
--scroll-scrub: 0.62;   /* 1/φ — the scroll liquid-weight rest (§L4); PRM → 0 (1:1 snap) */
--ease-scroll-spring: linear(…);  /* springLinearStops(ζ=0.85) — the gentle scrub twin */
```
Both live in `scroll-tokens.css` (the existing home). `--scroll-scrub` is the ONE knob;
`useScrollProgress`/`useScrollScene`/`useScrollChrome` all read it. PRM cascade zeroes it
alongside `--motion-weight` (§L5, one assignment).

---

## 4. Cross-engine (Chrome + Safari) — the dual-path, honestly

| Path | Native CSS (Chromium, Safari 16+) | JS fallback (Safari 15, no `timeline-scope`, PRM-test envs) |
|---|---|---|
| smoothed progress | CSS `scroll()` owns axis; composable early-returns inert | `useScrollProgress` `SmoothProgress` is the sole writer |
| section cascade | `view(block)` + spring-`linear()` easing, compositor | (entrance is a mount `.liquid-enter` fallback — never a silent gap) |
| pinned stage | named scroller timeline-scope + spring `range` phases | `ScrollScene` JS driver writes `--pin-phase-t`, SmoothProgress-weighted |
| dispatch | `dispatchScrollBackend` → "native" | `dispatchScrollBackend` → "js" |

The edict (story-page-standard): **`view()`/`scroll()` is a PROGRESSIVE ENHANCEMENT, the
keyframes.js JS `ScrollScene` is the Safari-15-safe baseline.** Default-to-broken-on-Safari:
the gate FAILS unless the JS path is proven to drive the pin phases with `currentTime`/
`--pin-phase-t` advancing under a forced `@supports`-false emulation. No `view()`-only
surface ships. No `backdrop-filter:url()`; the choreography is transform/opacity/clip-path
only (the compositor floor) — Safari-safe by construction.

---

## 5. a11y / PRM carve

- **PRM is the outer gate** on every CSS recipe (kept — `.scroll-build`/`.scroll-cascade`/
  `.scroll-pin` never bind under reduce; terminal static state).
- **`--scroll-scrub → 0`** under PRM (the §L5 cascade): `SmoothProgress.snap()` → 1:1, no
  lag, no settle — a scroll-progress NUMBER still tracks (it is a state signal, not a
  flourish), but with zero interpolated motion. The pin stage shows its terminal phase.
- **Discrete signals survive** (`useScrollTrigger` crossings, `useScrollChrome.collapsed`
  state) — the useFadingScroll discrete-survives model, unchanged.
- **WCAG 2.2.2 / no auto-advance** — the choreography is scroll-DRIVEN (user-controlled),
  not auto-playing; nothing to pause. `.smooth-scroll` drops under PRM (vestibular).

---

## 6. Reconcile vs the 116-wave set + entrance-reveal (NO dup, the DEFT union)

- **`useScrollChrome` / `useScrollTrigger` / `scrollReader` — KEEP.** These are the BC
  scroll-reader waves; FIT. The amendment threads liquid weight onto `useScrollChrome`'s
  ramp; it does NOT re-fork the reader. Persistent-by-default stays.
- **vs `entrance-reveal` `W-LIQUID-ENTRANCE-GENERAL` (the `.scroll-build`/`.scroll-cascade`
  augment).** That wave ALREADY edits these two keyframes in-place to add the
  `scale:`-longhand reciprocal squish (Bug A/B fixes). **This lens does NOT re-author the
  keyframes** — it only swaps the cascade's `linear` → spring-`linear()` EASING and fixes
  the `.scroll-pin` timeline BINDING (a different defect — the entrance wave never touched
  the pin's `scroll-timeline-name`-on-a-non-scroller bug). CROSS-LINK: the squish legs land
  via the entrance wave; the scrub-weight + the pin-binding fix land here. Coordinated edit,
  ONE keyframe block, two concerns.
- **vs `W-SCROLL-FLUIDITY` / `BD.W-SCROLL-MINIMIZE`** (named in the entrance WAVE-AMENDMENT
  cross-links) — this lens IS the concrete `W-SCROLL-FLUIDITY` content: the
  liquid-weight-on-scroll + the keyframes.js adoption. Fold here; no new wave name.
- **NEW wave proposed:** `BD.W-SCROLL-LIQUID-ENGINE` — (a) keyframes.js `SmoothProgress`/
  `ScrollScene`/`springLinearStops` adoption in `useScrollProgress` + new `useScrollScene`;
  (b) the `.scroll-pin` timeline-binding fix (born-RED: `currentTime: null` today); (c) the
  `--scroll-scrub` token + the spring-scrubbed cascade; (d) the cross-engine
  `dispatchScrollBackend` dual-path. AUGMENTS the BC scroll-reader waves; DEPENDS-ON nothing
  new; CROSS-LINKS the entrance keyframe edit. ZERO prune.

---

## 7. The CRITICAL GATE — born-RED, real scroll gesture, frame-series, both engines

1. **R-DEAD (RED on HEAD — captured today):** on `/motion/scroll-choreography`, drive a
   real scroll on `main.demo-main-scroller`; assert `.scroll-pin-phase-reveal` transform
   ≠ `none` for ≥1 mid-range frame AND the bound `ScrollTimeline.currentTime !== null`.
   **HEAD is `transform:none` all frames + `currentTime: null` (proven §0.1/§0.2).**
2. **R-CASCADE (RED on HEAD):** `.scroll-cascade > *` transform ≠ identity for ≥1 entry
   frame. HEAD is `matrix(1,0,0,1,0,0)` all frames (proven §0.1).
3. **R-WEIGHT (RED on HEAD):** scroll a fixed delta, then HOLD; sample `useScrollProgress`
   over the next ~8 frames — assert the value keeps moving (settles) AFTER the scroll stops
   (the SmoothProgress catch-up). HEAD jumps 1:1 and is static the instant scroll stops.
4. **R-KEYFRAMES (RED on HEAD):** assert the scroll spine imports `@mkbabb/keyframes.js`
   (`SmoothProgress`/`ScrollScene`). HEAD imports none (keyframes-free by header law).
5. **R-SAFARI (the cross-engine arm):** under a forced no-`timeline-scope` emulation, the
   JS `ScrollScene` drives `--pin-phase-t` 0→1 across the scroll range (the baseline path is
   proven, not assumed). Paired engine: Chromium + WebKit, both modes — the DELTA artefact
   is the captured frame-series, not a commit claim (the Live-verify-capture law).
6. **R-PRM:** under reduce, `--scroll-scrub → 0`, SmoothProgress snaps 1:1, the CSS recipes
   stay terminal, discrete crossings still fire.

**Gestalt bar:** the scroll-choreography WORKS (pin + cascade + progress fire and track),
carries LIQUID WEIGHT (SmoothProgress + spring-scrub + `--scroll-scrub`), on the
keyframes.js v5.0 scroll engine, both modes, both engines — the iOS-27 reference matched or
bettered, born honest-RED on today's dead demo.
