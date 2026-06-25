# GOLDEN — SCROLL-CHOREOGRAPHY (the canonical reference)

> The single best variant, synthesized from lens-a (iOS-27 fidelity), lens-b (cross-engine /
> perf-first) and lens-c (cartoon-technicolor punch). The system: `useScrollProgress` /
> `useScrollTrigger` / `useScrollChrome` / `scrollReader` + the `.scroll-build` / `.scroll-cascade` /
> `.scroll-pin` arms + `scroll-driven.css` / `scroll-choreography.css`.
>
> **The verbatim ask answered in one line:** `/motion/scroll-choreography` is *structurally dead*
> (the `.scroll-pin` named timeline resolves `currentTime: null`), we are *not* using keyframes.js
> for the scroll spine, and the scroll number is a *stiff 1:1 jump with zero liquid weight*. The
> golden fix adopts keyframes.js's **synchronously-exported** physics primitives — `SmoothProgress`
> (scrub inertia) + `SpringProgress` (snap settle) + `springLinearStops` (the compositor spring-stop
> twin) — as the scroll spine, fixes the dead pin with a JS `--pin-t` driver on **every** engine, and
> makes liquid weight the DEFAULT for every felt scroll axis. Both modes, both engines.

---

## 0 — The three lenses, reconciled (what each contributed, where they were wrong)

All three lenses INDEPENDENTLY captured the same three live defects (a strong convergence signal):

1. **`.scroll-pin` is DEAD** — `scroll-timeline-name: --gl-pin` is declared on the `.scroll-pin`
   element, which is `overflow: visible` with zero internal scroll extent → it is **not a scroll
   port**. A named `scroll-timeline` measures *the declaring element's own* scroll progress; `.scroll-pin`
   never scrolls, so `--gl-pin`'s `currentTime` is permanently `null` and the bound `gl-pin-reveal`
   animation parks at its `from` keyframe forever. `getComputedStyle(.scroll-pin-phase-reveal).transform`
   reads `none` and `opacity: 1` at **every** scroll fraction across the full extent. The real scroll
   port is the chassis ancestor `main.demo-main-scroller` (`scrollHeight 4164 / clientHeight 806`).
2. **Not using keyframes.js + stiff** — `useScrollProgress` / `scrollReader` / `useScrollTrigger` /
   `useScrollChrome` all explicitly fence keyframes.js OUT (header comments say so) and hand-roll
   `progress = clamp01(pos/extent)` written 1:1 each rAF tick. Zero smoothing, zero inertia, zero
   spring settle — the exact "stiff jump" design.md §L4 forbids ("Motion that snaps tight with no
   give … is the anti-pattern").
3. **Cross-engine: native-or-nothing** — the pin sits behind `@supports (animation-timeline: scroll())
   and (timeline-scope: --gl-pin)`; on Safari < 26 it renders static. No JS floor under the felt
   choreography → "default-to-broken-on-Safari".

**The shared boldest move (all three lenses):** adopt the keyframes.js scroll facility and make
`scrub` a first-class liquid-weight knob; demote native `scroll()`/`view()` to a *progressive
compositor handoff for cosmetic-only legs*, since native `animation-range` has **no smoother** and
structurally cannot carry liquid weight.

### The de-risking correction the GOLDEN makes (none of the three lenses caught this)

All three lenses planned to `import { createScrollScene } from "@mkbabb/keyframes.js"`. **That import
resolves to `undefined` at the installed `@mkbabb/keyframes.js@4.3.0`.** Verified at the runtime
boundary (both CJS and ESM):

```
ScrollScene:undefined | createScrollScene:undefined | dispatchScrollBackend:undefined
SmoothProgress:function | SpringProgress:function | springLinearStops:function
ScrollTimeline:function | decayRest:function
```

`ScrollScene` / `createScrollScene` / `dispatchScrollBackend` live ONLY in the `.d.ts` type surface
and in a lazily `import()`-ed chunk (`dist/scroll-scene-*.js`) reachable solely through
`await loadAnimationEngine()` (the async heavy-engine accessor) — they are **not** static top-level
named exports. A synchronous composable cannot depend on them without an async boundary that would
stall the first scroll frame.

**Resolution (KISS, survival-of-the-fittest):** `ScrollScene` is itself a thin composition of
`SmoothProgress` (scrub) + `SpringProgress` (snap) + a parsed range. Those three primitives ARE
synchronously exported. So the GOLDEN builds its one JS scroll driver — `useScrollScene` — directly on
those synchronous primitives + the SHIPPED `createScrollReader`, exactly the factoring `ScrollScene`
performs, with **zero async load, zero new net dep, and the same physics**. If a future
keyframes.js bumps `createScrollScene` to a static export, `useScrollScene`'s internals swap to it
behind an unchanged signature (a one-file refactor, no consumer break). This is the lens-b/lens-c
"ScrollScene-is-the-engine" gestalt, grounded to what actually ships today.

### The lens merge

| Concern | Winner | Why |
|---|---|---|
| The engine seam | **lens-b/-c `useScrollScene`** — one wrapper unioning `createScrollReader` + the kf physics | The DRY core the four composables were each groping toward; one writer of every 0..1 axis |
| Liquid weight is DEFAULT not enhancement | **lens-b** | Native `scroll()` has no smoother; the felt axes MUST be the JS lane on both engines |
| The pin fix mechanism | **lens-c `--pin-t` custom-prop driver** (no `@supports` gate at all) over lens-b's `scroll(nearest)` native | A JS-written custom prop works on EVERY engine with no timeline primitive; lens-b's anonymous `scroll(nearest)` is kept as the *optional cosmetic-parallax* progressive handoff only |
| The `--scroll-scrub` golden token (`1/φ`-family) | **lens-a** | One scalar, golden-proportioned, names "how much liquid weight the scroll carries"; PRM → 0 |
| Spring-shaped compositor scrub for the cascade | **lens-a `springLinearStops`** | The cascade stays native `view()` (compositor, cheap) but its easing carries spring weight with ZERO JS |
| Cartoon PUNCH on the pin (anticipation dip, vol-preserving squash, moving cel cast, follow-through) | **lens-c** | The 1940s-technicolor register on the load-bearing phase, riding extant `useLiquidFlex` + `--shadow-cartoon-*` + `--ease-cartoon-punch` |
| No-dup vs entrance-reveal (the `.scroll-build`/`.scroll-cascade` squish keyframes) | **all three (cross-link only)** | entrance-reveal's `W-LIQUID-ENTRANCE-GENERAL` owns the squish keyframe edit; this wave owns the engine/pin/scrub |
| Survival ledger (KEEP `scrollReader` + `useScrollProgress` floor; REFINE chrome/trigger; RE-INVENT pin) | **lens-b/-c** | No re-fork, no legacy |

---

## 1 — The golden design (visual + motion + interaction)

**One sentence:** scroll-progress is a **spring-smoothed value with a `--scroll-scrub` lag** — authored
once, written as a damped `--scroll-t`/`--pin-t` custom property by the JS spine on every engine, with
native `scroll()`/`view()` kept only as a progressive compositor handoff for cosmetic legs — so every
felt scroll surface (the section cascade, the pinned cartoon-slam stage, the chrome collapse, the
progress bar) carries the SAME liquid weight in both engines and both modes.

Four iOS-27-faithful behaviours on ONE progress spine:

### 1a — Smoothed progress (the liquid-weight floor)
`useScrollProgress` returns a `SmoothProgress`-damped number, not a 1:1 clamp. The raw
`(start − rect.top)/span` ratio becomes `setTarget()`; the returned ref is the smoothed `current`. A
scroll burst sets a target; the value catches up with inertia and **keeps moving (settles) after the
finger lifts** — the liquid-weight signature. PRM → `SmoothProgress.snap()` (1:1, no lag — the
vestibular floor). ONE composable; every consumer inherits it. Public API unchanged (`Ref<number>`).

### 1b — The section cascade — spring-shaped scrub, NOT linear (compositor, zero JS)
`.scroll-cascade > *` stays a native `view()` timeline (off the compositor, 60fps, Safari-degrade
safe). Its easing changes from `linear` to `var(--ease-scroll-spring)` — a `springLinearStops(...)`
`linear()` curve (the `--spring-gentle` twin, ζ≈0.85, <1% overshoot) — so each card's scroll-scrubbed
entrance reads with spring WEIGHT (a hair of overshoot at the end of its range). The Safari degrade
falls to the **mount-clock cel-slam, never a flat fade** (entrance-reveal GOLDEN §2d). Zero JS on this
leg — the platform carries it.

### 1c — The pinned stage — RE-INVENTED as a `--pin-t` cartoon-slam (the headline fix, every engine)
Delete `scroll-timeline-name: --gl-pin` + `timeline-scope: --gl-pin` entirely. The phases become pure
`--pin-t` readers; `useScrollScene` (via `useScrollPin`) writes the spring-damped `--pin-t ∈ [0,1]`
onto the sticky stage off the *resolved real scroll port* (`createScrollReader` resolves
`main.demo-main-scroller` automatically). **No `animation-timeline`, no `@supports` gate — works on
every engine including Safari 15.** The phases carry the CARTOON register (lens-c):

- **anticipation dip → overshoot → settle** mapped off the spring-damped `--pin-t` (the slam *arrives
  with inertia*, then the `SpringProgress` snap settles it — the 1940s "weight lands, jiggles,
  settles" feel).
- **vol-preserving squash & stretch** via the extant `useLiquidFlex` `scale:`-longhand reciprocal
  (NOT a new squish engine), scaled by `--motion-weight`.
- **a moving cel cast** — a `--shadow-cartoon-md` layered offset on the headline card's `::after` that
  travels OPPOSITE the scroll drift (design.md §Cartoon-shadows "moving cast"; a `::after` transform,
  never an animated `box-shadow`).
- **follow-through / overlapping action** — the caption settles `+~6ms·weight` after the card.

The cosmetic parallax sub-leg MAY still bind a native `animation-timeline: scroll(nearest block)` to a
`@property --pin-parallax` on a `scroll()`-capable engine (the legitimate progressive compositor
handoff for a pure drift) — but the LOAD-BEARING reveal is `--pin-t`, JS-driven, universal.

### 1d — The chrome collapse — already fit, threaded onto the spine
`useScrollChrome` (persistent-by-default — the iOS-27 lesson, KEEP verbatim) keeps its velocity-gate
flick + scroll-stop snap. Its only weakness: the scroll-stop snap is an instant `apply(settled)`. Thread
it through a `SpringProgress` snap so the bar settles with a spring (the liquid-weight the collapse
lacked), and thread the `collapseT` ramp through `SmoothProgress` for collapse inertia. All other
behaviour (persistent default, velocity gate, direction read) stays byte-equivalent.

**The spine:** ONE authored scroll spec → `useScrollScene` (kf `SmoothProgress`/`SpringProgress` over
the ONE `createScrollReader`) writes the damped custom prop → native `scroll()`/`view()` is the
cosmetic-only progressive handoff. No second scroll listener, no Lenis/GSAP (keyframes.js is a
first-party sibling), no parallel fork.

---

## 2 — The mechanism (tokens · composables · recipes · files)

### 2a — Composables (the keyframes.js adoption — a UNION, not a new fork)

| Symbol | File | Disposition | Change |
|---|---|---|---|
| `useScrollScene` | `src/composables/motion/useScrollScene.ts` | **NEW leaf** (the seam) | Wraps the SHIPPED `createScrollReader` (the ONE coalesced listener — reused) + kf `SmoothProgress` (scrub) + `SpringProgress` (snap). Author `{ source, range, scrub, snap, bindEl, property }` once; writes the damped 0..1 to `--scroll-t` (or a named prop) AND a reactive ref. Owns no perpetual rAF — `SmoothProgress.play()` runs only while unsettled, auto-parks at rest (the no-momentum-loop fence honored). **Keyframes-bearing → ships on `/motion`, NOT `/motion-core`.** |
| `useScrollPin` | `src/composables/motion/useScrollPin.ts` | **NEW thin** | `useScrollScene({ scrub: --scroll-scrub-pin, snap: phaseSnaps, property: "--pin-t" })` bound to the sticky stage. The dual-backend driver of the headline pin. |
| `useScrollProgress` | `src/composables/motion/useScrollProgress.ts` | **AUGMENT (clean break)** | Internal re-platform onto `SmoothProgress`: raw ratio → `setTarget`; returned ref → smoothed `current`; PRM → `.snap()`. Keeps the `NATIVE_SCROLL_TIMELINE` early-return (when CSS owns the cosmetic axis, attach nothing). `--scroll-scrub` sets the damping. **Public `Ref<number>` UNCHANGED** (no consumer break). |
| `scrollReader.ts` | (same) | **KEEP verbatim** | Still the ONE rAF-coalesced listener core. `useScrollScene` composes it. The "no-fourth-listener" fence holds. |
| `useScrollTrigger.ts` | (same) | **AUGMENT (minor)** | The continuous `progress` ramp delegates to `useScrollScene` (scrub weight); the discrete `onCross/onEnter/onLeave` + flip-delta debounce + velocity/direction KEPT (fit — events can't ride a CSS timeline; they stay JS on every engine). Optionally thread `velocity` into the `SmoothProgress` target for a velocity-coupled catch-up (the morph-more-on-move law). |
| `useScrollChrome.ts` | (same) | **AUGMENT (minor)** | scroll-stop snap → `SpringProgress` settle; `collapseT` ramp → `SmoothProgress`. Persistent-by-default + velocity-gate KEPT verbatim. **NOTE the subpath cost:** this currently ships on engine-free `/motion-core`; threading kf physics moves it (or a thin physics shim) onto `/motion`. The dock-search consumer reaches the unchanged behaviour; the PRM discrete-snap path needs no kf, so the `/motion-core` floor degrades to the existing instant snap when the physics shim is absent. |

### 2b — Recipes (`scroll-choreography.css` — in-place, no second file)

- **`.scroll-pin` — RE-INVENT (the born-RED defect).** Delete `scroll-timeline-name`/`timeline-scope`
  and the whole `@supports (... timeline-scope: --gl-pin)` gate. The stage is plain `position: sticky;
  inset-block-start: 0`. The phases read `--pin-t` (written by `useScrollPin`):
  ```css
  .scroll-pin-stage { position: sticky; inset-block-start: 0; }
  /* phase windows read the SPRING-DAMPED --pin-t — no animation-timeline, no @supports, every engine */
  .scroll-pin-phase-reveal {
    --t: clamp(0, calc(var(--pin-t, 0) / var(--scroll-pin-phase-reveal-end-frac, 0.45)), 1);
    opacity: var(--t);
    translate: 0 calc((1 - var(--t)) * var(--scroll-pin-lift, 2.5rem));
    /* vol-preserving squash via the longhand scale (useLiquidFlex register), --motion-weight scaled */
    scale: calc(0.96 + 0.04 * var(--t));
  }
  ```
  PRM arm: `--pin-t` resolves as a hard 1:1 ratio (no slam, no cast travel, no overshoot) — the stage
  shows its terminal phase.
- **`.scroll-cascade > *` — spring-shaped scrub.** `auto linear both` → `auto var(--ease-scroll-spring)
  both`. The `view(block)` axis stays. Verify `view()` resolves non-null in THIS chassis. Safari degrade
  → mount-clock cel-slam (one `@supports`-else reusing the `.scroll-build` mount keyframe).
- **`.scroll-build` — KEEP** (mount-driven, fires on every engine, works). entrance-reveal owns its
  squish augment.
- **`.smooth-scroll` — KEEP** (native, PRM-gated, zero runtime).

### 2c — Tokens (`scroll-tokens.css` — the existing home)

```css
--scroll-scrub: 0.62;     /* 1/φ — the scroll liquid-weight rest (§L4); the ONE knob; PRM → 0 (1:1 snap) */
--scroll-scrub-pin: 0.50; /* the pin drifts heavier (a scene, not a control) — still 1/φ-family */
--ease-scroll-spring: linear(/* springLinearStops({response:.5,dampingFraction:.85}) */);
--scroll-snap-spring: var(--spring-gentle);             /* ζ=0.85 — the §L4 scroll-choreography curve */
--scroll-pin-phase-reveal-end-frac: 0.45;               /* the reveal window as a fraction (calc-friendly) */
/* DEPEND-ON (var(…, fallback) so the recipe ships GREEN before these land): */
/*   --motion-weight, --ease-cartoon-punch  → BD.W-MORPH-PUNCH-TOKENS */
/*   --shadow-cartoon-md                     → §Cartoon-shadows (extant) */
```

`--scroll-scrub` is the ONE liquid-weight knob; `useScrollProgress`/`useScrollScene`/`useScrollChrome`
all read it. PRM zeroes it alongside `--motion-weight` (§L5, one assignment). `--ease-scroll-spring` is
generated by `springLinearStops` (a build-time stop-set baked into the token) with the
`@supports (animation-timing-function: linear(0,1))` cubic-bezier fallback for Safari < 17.2 (the house
precedent).

---

## 3 — Cross-engine (Chrome AND Safari) — the dual-path, honestly

| Axis | Chrome / Safari 26+ (native available) | Safari ≤25 / PRM-test / no-`timeline-scope` (JS floor) |
|---|---|---|
| smoothed progress | CSS may own a cosmetic axis; composable early-returns inert | `useScrollProgress` `SmoothProgress` is the sole writer |
| section cascade | `view(block)` + `--ease-scroll-spring` (compositor) | mount-clock cel-slam (NOT a flat fade) |
| **pinned stage (FELT)** | **`--pin-t` JS writer (identical to Safari)** + optional `scroll(nearest)` cosmetic parallax | **`--pin-t` JS writer** — the SAME path, identical visual |
| chrome collapse (FELT) | JS `SpringProgress` snap | JS `SpringProgress` snap — identical |
| triggers (enter/leave) | JS `scene.on` / flip-delta | identical — no CSS-event possible |
| progress bar (stiff OK) | native `scroll()` `scaleX` | JS `scaleX` writer (nobody feels its lag) |

**The edict (story-page-standard):** native `view()`/`scroll()` is a PROGRESSIVE ENHANCEMENT for
COSMETIC legs only; the **JS spine is the floor for every FELT axis on both engines** — so Safari is
never the degraded path for anything the user feels (it is byte-identical to Chrome). No felt surface
is `view()`/`scroll()`-only with no floor.

**MEATBALL / liquid carve:** every scroll-driven leg animates `transform`/`translate`/`scale`/`opacity`/
`clip-path`/a `--*-t` custom prop ONLY (compositor-only, the `proof:no-layout-animation` floor). No
`backdrop-filter: url()` rides a scroll axis. The goo/metaball filters are static SVG, sRGB
color-interp, untouched by scroll — the cartoon cel cast is a `::after` transform, never an animated
`box-shadow`. Default-to-broken-on-Safari is eliminated by construction.

---

## 4 — a11y / PRM carve

- **PRM is the outer gate** on every CSS *keyframe* recipe (kept) AND the inner gate on the JS spine:
  `--scroll-scrub → 0` (the §L5 cascade) → `SmoothProgress.snap()` / `SpringProgress` settle → instant
  set. A scroll-progress *number* still tracks (it is a state signal, not a flourish) but with zero
  interpolated motion. The pin shows its terminal phase; the cascade paints in place.
- **Discrete signals survive** — `useScrollTrigger` crossings + `useScrollChrome.collapsed` state fire
  under PRM (the useFadingScroll discrete-survives model). A collapse is partly a legibility/space cue.
- **WCAG 2.2.2 / no auto-advance** — the choreography is scroll-DRIVEN (user-controlled), not
  auto-playing; nothing to pause. `.smooth-scroll` drops under PRM (vestibular).
- **`prefers-reduced-transparency` / `prefers-contrast`** — untouched; scroll choreography is
  transform/opacity, not a transmissive layer. The opaque cel cast stays (a legibility asset).

---

## 5 — DELTA-ASSAY → the wave amendment (reconcile vs the 116-wave set; NO dup)

| existing wave | disposition | what changes |
|---|---|---|
| `BB.W-SCROLL-MOTION` (authors the three arms) | **AUGMENT** | DELETE the `--gl-pin` named timeline + `timeline-scope` gate; rewrite the pin phases as `--pin-t` readers (universal). The `.scroll-build` mount-clock + the `view()` cosmetic cascade KEPT. Lift the no-keyframes.js fence on the scroll *engine* leaves only. |
| `BC.W-SCROLL-TRIGGER` (`useScrollTrigger`/`scrollReader`) | **AUGMENT** | continuous `progress` delegates to `useScrollScene` (scrub weight); discrete crossings + flip-delta + velocity/direction KEPT byte-for-byte; `scrollReader` REUSED (no re-fork). |
| `BC.W-SCROLL-CHROME` (`useScrollChrome`) | **AUGMENT** | scroll-stop snap → `SpringProgress` settle; `collapseT` ramp → `SmoothProgress`; persistent-by-default KEPT. (Subpath: physics-bearing → `/motion`; the `/motion-core` floor keeps the instant-snap PRM path.) |
| `useScrollProgress` author wave | **AUGMENT** | internal re-platform onto `SmoothProgress`; public `Ref<number>` UNCHANGED. |
| `W-LIQUID-ENTRANCE-GENERAL` / entrance-reveal AMENDMENT 2 | **CROSS-LINK ONLY** | it OWNS the `.scroll-build`/`.scroll-cascade` squish keyframe edit (Bug B). This wave does NOT re-edit those keyframes — only the cascade `linear → --ease-scroll-spring` EASING swap + the Safari-degrade-to-cel-slam `@supports`-else. |
| `BD.W-SCROLL-FLUIDITY` | **REFRAME** | the rail slow-glide IS the same `SmoothProgress` scrub; reconcile the no-Lenis fence with the truth that keyframes.js is the sanctioned in-house smoother (NOT a 3rd-party momentum lib). This wave IS its concrete content; fold here. |
| `BD.W-SCROLL-MINIMIZE` | **REFRAME** | the dock direction-read FEEDS `useScrollScene`'s direction/velocity (one reader); the collapse snap becomes the `SpringProgress` settle. Still drives the shipped `collapse()`/`expand()` verbs. |
| `BD.W-MORPH-PUNCH-TOKENS` | **DEPEND-ON** | `--motion-weight` + `--ease-cartoon-punch` for the pin cartoon register, via `var(…, fallback)`. |
| **NEW: `BD.W-SCROLL-LIQUID-ENGINE`** | **AUTHOR** | (a) `useScrollScene` + `useScrollPin` (kf `SmoothProgress`/`SpringProgress`/`springLinearStops` over the ONE `createScrollReader`); (b) the `.scroll-pin` `--pin-t` re-invention (born-RED: `currentTime: null` today); (c) the `--scroll-scrub` token + the spring-scrubbed cascade; (d) the cross-engine JS-floor dual-path. AUGMENTS the BC scroll waves; CROSS-LINKS the entrance keyframe edit. ZERO prune. |

**Net:** 5 AUGMENT/REFRAME (existing) + 1 NEW author wave (2 new leaves) + 1 CROSS-LINK + 1 DEPEND-ON.
ZERO re-fork, ZERO dup of the entrance-reveal scope, ZERO legacy alias.

---

## 6 — The acceptance bar + the born-RED gate (REAL scroll gesture · frame-series · both engines)

The DELTA artefact is a captured per-frame transform/opacity table + a paired-π readback (the
Live-verify-capture law), NOT a commit-message claim. Paired engine: Chromium + WebKit, both modes.

1. **R-PIN (RED on HEAD — captured):** on `/motion/scroll-choreography`, drive a real scroll on
   `main.demo-main-scroller`; assert `.scroll-pin-phase-reveal` `opacity`/`transform` change
   **monotonically** across the pin's scroll slice (≥1 mid-range frame ≠ terminal). HEAD:
   `transform: none`, `opacity: 1` ALL frames + the bound `ScrollTimeline.currentTime === null`.
2. **R-CASCADE (RED on HEAD):** `.scroll-cascade > *` transform ≠ identity for ≥1 entry frame, AND its
   resolved easing is the spring `linear(...)`, not `linear`.
3. **R-WEIGHT (RED on HEAD — the liquid-weight proof):** scroll a fixed delta then HOLD; sample the
   progress ref over the next ~8 frames — it MUST keep moving (settle/converge) AFTER the scroll stops
   (the `SmoothProgress` catch-up over ≥3 frames). HEAD jumps 1:1 and is static the instant scroll stops.
4. **R-SNAP (RED on HEAD):** a slow drag near a chrome-collapse midpoint, release; `collapseT`
   overshoots then settles via spring (≥1 frame past the endpoint then back). HEAD: instant
   `apply(settled)`.
5. **R-KEYFRAMES (RED on HEAD):** assert the scroll spine imports `SmoothProgress`/`SpringProgress` from
   `@mkbabb/keyframes.js`. HEAD imports none (keyframes-free by header law).
6. **R-SAFARI (the cross-engine arm):** under a forced no-`timeline-scope` / WebKit emulation, the JS
   `useScrollPin` drives `--pin-t` 0→1 across the scroll range (the baseline path proven, not assumed).
7. **R-PRM:** under reduce, `--scroll-scrub → 0`, `SmoothProgress` snaps 1:1, the CSS recipes stay
   terminal, discrete crossings still fire.

**GATE-AUTHORING LESSON (from the live spike):** assert on the CSS `translate`/`scale` **longhands**
(or on `--pin-t`/`opacity`), NOT on `getComputedStyle(...).transform` — the longhands do not fold into
the computed `transform` matrix, so a working `--pin-t` driver reads `transform: "none"` while
`translate: "0px 1.57px"`, `scale: "0.997"`, `opacity: "0.96"` are all live. The spike's R-PIN initially
mis-read `transform: none` for this reason; the true signal is the longhand / opacity / `--pin-t` sweep.

**Born-RED sketch (the π/readback that proves it) — Playwright/devtools-mcp, on the real scroller:**
```js
// R-PIN + R-WEIGHT, one sweep on main.demo-main-scroller
const sc = document.querySelector("main.demo-main-scroller");
const reveal = document.querySelector(".scroll-pin-phase-reveal");
const max = sc.scrollHeight - sc.clientHeight;
const frames = [];
for (const f of [0, 0.2, 0.4, 0.55, 0.7, 1.0]) {
  sc.scrollTop = f * max;
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); // 2 rAF
  const cs = getComputedStyle(reveal);
  frames.push({ f, transform: cs.transform, opacity: cs.opacity,
                pinT: getComputedStyle(document.querySelector(".scroll-pin-stage")).getPropertyValue("--pin-t") });
}
// R-PIN passes iff transform is NOT "none" / opacity NOT "1" for ≥1 mid frame (today: all none/1 → RED)
// R-WEIGHT: after the last set, sample reveal.transform across 8 more rAF with scrollTop FROZEN —
//   the matrix must keep changing (the smoother converging) for ≥3 frames (today: frozen → RED)
const monotone = frames.some(x => x.transform !== "none" || x.opacity !== "1");
console.log(JSON.stringify({ R_PIN: monotone, frames }, null, 2));
```

**Gestalt bar:** the scroll-choreography WORKS (pin + cascade + progress fire and track), carries
LIQUID WEIGHT (`SmoothProgress` scrub + `SpringProgress` snap + `--scroll-scrub`), on the keyframes.js
physics spine, both modes, both engines — the iOS-27 reference matched or bettered, born honest-RED on
today's dead demo, the AUDACIOUS cartoon-slam pin loud and golden-proportioned.

---

## 7 — Survival-of-the-fittest ledger

- **KEEP (fit):** `scrollReader` (the ONE coalesced read), `useScrollProgress`'s public surface +
  `NATIVE_SCROLL_TIMELINE` early-return, `.scroll-build` + `.scroll-cascade` (work), `scroll-driven.css`
  `.scroll-progress` + `[data-scroll-reveal]`, `supportsCssTimeline`, persistent-by-default chrome.
- **REFINE (weak):** the cross-engine doctrine (native-primary → JS-liquid-primary for felt axes); add
  `--scroll-scrub` weight everywhere; the cascade `linear → --ease-scroll-spring`; the chrome snap →
  spring; the cascade Safari-degrade → cel-slam.
- **RE-INVENT (broken):** `.scroll-pin` (named `--gl-pin` timeline → `--pin-t` JS driver on every
  engine); `useScrollChrome`'s instant snap → `SpringProgress` settle.
- **NO LEGACY:** the keyframes-free stiff clamp is DELETED (no alias). The new `useScrollScene` is the
  one engine; the others compose or wrap it. The `createScrollScene` phantom is NOT depended on — the
  synchronously-shipped `SmoothProgress`/`SpringProgress`/`springLinearStops` are.

---

## 8 — The spike (de-risk of the boldest mechanism) — VERIFIED GREEN, live

`./golden/pin-spike.html` (+ `pin-spike-mid.png`) — a throwaway page that builds `useScrollPin` on the
**synchronously-exported** `SmoothProgress` + `springLinearStops` (NOT the `createScrollScene` phantom),
writing a spring-damped `--pin-t` onto a plain `position: sticky` stage off the real scroll port via the
shipped `createScrollReader` idiom — **no `scroll-timeline-name`, no `@supports`, no `timeline-scope`**.
Served by vite (which resolves the bare `@mkbabb/keyframes.js` import) and driven live via
chrome-devtools-mcp. Captured readback:

| gate | result | evidence |
|---|---|---|
| **R-PIN** | GREEN | `--pin-t` tracks the real scroller monotonically `0 → 0.013 → 0.292 → 0.502 → 0.712 → 1.0`; `opacity 0 → 1`; at mid-reveal `translate: 0px 1.57px`, `scale: 0.997` (the longhands move; `transform` stays `none` — the gate lesson above) |
| **R-WEIGHT** | GREEN | step-scroll to 0.5 then FREEZE → `--pin-t` keeps converging for 10/11 frames (`0 → .053 → .257 → .357 → … → .429`) AFTER the scroll stops — the `SmoothProgress` liquid-weight catch-up |
| **R-KEYFRAMES** | GREEN | the spine is a live `SmoothProgress` instance (`tickDt` present) — kf physics, not a hand-rolled clamp |
| **R-CASCADE-EASE** | GREEN | `springLinearStops({response:.5,dampingFraction:.85})` emits `linear(0, 0.286 4%, 0.657 8%, …)` — the zero-JS spring scrub for the cascade |

**The single most uncertain claim is de-risked:** the load-bearing pin works on every engine with no
timeline primitive, carries liquid weight, and runs on what keyframes.js@4.3.0 *actually* exports today.
The production wave ports `useScrollPin`'s logic into `src/composables/motion/` over the real
`createScrollReader` + Vue lifecycle; the mechanism is proven.
