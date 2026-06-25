# Scroll Choreography — GREENFIELD (Lens B: cross-engine / perf-first)

> The SCROLL-CHOREOGRAPHY system redesigned from first principles: `useScrollProgress` /
> `useScrollTrigger` / `useScrollChrome` / `scrollReader` + the `.scroll-build` / `.scroll-cascade` /
> `.scroll-pin` arms + `scroll-system` / `scroll-vt`. The user's verbatim: *"/motion/scroll-choreography
> DOESN'T EVEN REALLY WORK. Are we using KEYFRAMES.JS?"* + the standing law *"ALL of our scrolling
> should have INERTIA and LIQUID WEIGHT."*
>
> **The one-line answer: it DOESN'T work, we are NOT using keyframes.js, and keyframes.js v5 ships the
> EXACT facility (`ScrollScene` / `createScrollScene`) that fixes both the broken `.scroll-pin` AND the
> missing liquid weight — it was fenced OUT and hand-rolled worse.**

---

## 0 — Live interrogation (REAL scroll gesture, Chrome, frame-series readback)

Driven on `http://localhost:5173/motion/scroll-choreography` via chrome-devtools-mcp. The real scroller
is `MAIN.demo-main-scroller` (`scrollHeight 4164`, `clientHeight 806`), NOT the document
(`documentElement.scrollHeight === innerHeight === 806` — the document does not scroll at all).

### Finding 1 — `.scroll-pin` is DEAD (the headline defect — born-RED CONFIRMED)

I drove `main.scrollTop` across the full extent (`0 → 3358px`) in 11 steps, waiting 2 rAF per step for
the compositor, and read `getComputedStyle` on the pin phases each frame:

| scrollTop | stage `top` (px) | stage pos | `.reveal` transform | `.reveal` opacity | `.settle` transform |
|-----------|------------------|-----------|---------------------|-------------------|---------------------|
| 0    | 1392 | sticky | `none` | 1 | `none` |
| 1007 | 1220 | sticky | `none` | 1 | `none` |
| 2015 | 1053 | sticky | `none` | 1 | `none` |
| 3358 | 863  | sticky | `none` | 1 | `none` |

**Across the ENTIRE scroll extent the pin phases NEVER change.** `reveal_transform: none`,
`reveal_opacity: 1` at every sample. The "stage" `top` drifts `1392 → 863` (it slides with content — it
does **not** pin: a `position: sticky; top: 0` element inside a flex column that isn't its scroll port
never sticks). The reveal/settle choreography that is the entire point of the demo produces **zero
motion**. The user is exactly right: it doesn't work.

**Root cause (SOURCE-VERIFIED).** The `.scroll-pin` recipe declares `scroll-timeline: --gl-pin` on the
`.scroll-pin` element itself (block-size `320vh`), and the phases bind `animation-timeline: --gl-pin`.
But:

```js
pin.scrollHeight === pin.clientHeight   // 2577 === 2577 → pin_isScrollPort: false
getComputedStyle(pin).overflow          // "visible"
```

A named `scroll-timeline` measures **the declaring element's own scroll progress**. `.scroll-pin` has
`overflow: visible` and zero internal scroll extent — it is **not a scroll port**. So `--gl-pin` is a
`ScrollTimeline` whose `currentTime` is permanently pinned at the start; `reveal.getAnimations()[0]`
reports `{ name: "gl-pin-reveal", timelineType: "ScrollTimeline", playState: "running" }` — *running*,
but on a timeline that never advances, so the keyframe resolves to its terminal state and nothing moves.
The author wanted `scroll-timeline` to read the *ancestor* scroller; it reads the element's *own*
(absent) scroll. This is the classic named-scroll-timeline-on-a-non-scroller bug. **Dead by construction,
on the most capable engine (Chrome, all `@supports` true).**

### Finding 2 — `.scroll-cascade` (view-timeline) WORKS; `.scroll-build` (mount) WORKS

The cascade cards carry `animationName: gl-cascade-build`, `animationTimeline: view()`, and resolve to a
live `matrix(...)` — the per-child `view()` entrance fires and tracks. `.scroll-build` fires once on
mount (1 container present). **These two arms are FIT** — survival-of-the-fittest keeps them. Only the
`.scroll-pin` arm is broken, and the JS `useScrollProgress` is stiff (Finding 4).

### Finding 3 — are we using KEYFRAMES.JS? **NO — and a perfect-fit facility goes unused.**

SOURCE-VERIFIED (`grep` over `node_modules/@mkbabb/keyframes.js/dist`):

- `useScrollProgress.ts` — raw `getBoundingClientRect()` + a hand-rolled rAF-coalesced
  `scroll`/`resize` listener + `ResizeObserver`. **No keyframes.js import.** Stiff 1:1 map, `Math.max/min`
  clamp, zero smoothing.
- `scrollReader.ts` — header literally states *"no `@mkbabb/keyframes.js`"*; it is a Vue-free rAF
  coalescer. **Fences keyframes.js OUT.**
- `useScrollTrigger.ts` / `useScrollChrome.ts` — headers state *"no `@mkbabb/keyframes.js`"*; both
  hand-roll velocity/direction/collapse from `scrollReader`.
- The CSS arms (`scroll-driven.css`, `scroll-choreography.css`) are native `scroll()`/`view()` —
  no JS engine at all.

Meanwhile keyframes.js **v5 ships exactly the scroll engine this system needs** (verified exports):

```
Draggable, ScrollTimeline, SmoothProgress, SpringProgress,
decay, decayRest, reseatToSpring, springLinearStops, springTimingFunction
+ ScrollScene, createScrollScene, parseScrollTimeline   (dist/scroll-scene-*.js, keyframes.d.ts:2706)
```

`ScrollScene` (verbatim from `keyframes.d.ts:2690`):
> *Drives an engine's progress from a raw scroll position through the parsed `animation-range`, composing
> the SHIPPED primitives: `scrub → SmoothProgress damping (the smoothing the native lane lacks)`;
> `snap → decayRest + SpringProgress settle`; `enter/leave → the threshold detector derived from the
> parsed range`. The caller drives the loop (`scrollProgress(p)` per scroll event); the scene owns no rAF.*

It even **dispatches to native `ScrollTimeline` when present and falls to the JS driver otherwise**
(`keyframes.d.ts:1417` *"native ScrollTimeline present + NO scrub/snap → native; native ABSENT (Firefox,
jsdom, SSR) → JS"*). **This is the cross-engine, liquid-weight, single-API scroll facility the user is
asking for — and glass-ui reinvented a worse, stiffer, native-only-or-bust version and fenced this out.**

### Finding 4 — LIQUID WEIGHT: absent. Stiff 1:1, no inertia.

`useScrollProgress` writes `progress = clamp((start - rect.top) / span)` — a **direct, instantaneous**
map. No smoothing, no damping, no spring. design.md §L4 mandates *liquid weight is universal on drivers*
and names `--spring-gentle` (ζ=0.85) as *"the patient-settle variant for scroll-driven choreography"* —
but no scroll composable consumes a spring. The native CSS arms are also raw `linear` interpolation of
scroll position (no scrub-lag). **Every scroll-progress read is a hard 1:1 jump.** The user's law is
unmet across the whole system.

### Finding 5 — Safari posture (default-to-broken-on-Safari, per story-page-standard)

The `entrance-reveal` GOLDEN is binding: **`view()`/`scroll()` entry-ranges shipped Safari 26 (late
2025)** — on the Safari that ships *today* a `view()` timeline is *skipped to a plain fade* and a
`scroll()` timeline does not bind. So:

- `.scroll-cascade` (`view()`) → already degrades to a plain mount fade on most Safari (acceptable, but
  per entrance-reveal it should degrade to the **mount-clock cel-slam**, never a flat fade).
- `.scroll-pin` (`scroll()` + `timeline-scope`) → **does not bind on Safari at all → static terminal
  read** (which is the *correct* read since it's broken on Chrome too, but on a working pin it would be a
  silent dead stage on Safari).
- `useScrollProgress` is the only **Safari-15-safe** scroll-progress baseline — and it's stiff.

The cross-engine rule (design.md §L7): the JS progress is the floor; `view()`/`scroll()` is a
*progressive enhancement only*. The current system has the floor (JS) and the enhancement (CSS) but the
**floor is stiff and the broken `.scroll-pin` enhancement has no JS floor at all** (it's
enhancement-only, so Safari gets nothing).

---

## 1 — The core idea: ONE scroll engine — `useScrollScene`, keyframes.js-backed, native-when-it-can, JS-with-liquid-weight-otherwise

Collapse the four hand-rolled composables (`useScrollProgress`, `scrollReader`, `useScrollTrigger`,
`useScrollChrome`) and the broken `.scroll-pin` arm onto **one Vue composable, `useScrollScene`, that
wraps keyframes.js `createScrollScene`**. It is the single writer of every scroll-driven 0..1 axis in the
library. It answers all five interrogation points at once:

```
                      useScrollScene(target, { range, scrub, snap, triggers })
                                          │
        ┌─────────────────────────────────┴─────────────────────────────────┐
        │  kf createScrollScene — ONE backend dispatch (keyframes.d.ts:1417) │
        ├────────────────────────────────────────────────────────────────────┤
   NATIVE LANE (Chrome/Safari-26+, no scrub/snap)   │   JS LANE (everything else, OR scrub/snap asked)
   → native ScrollTimeline on the compositor,        │   → ScrollScene.scrollProgress(p) per scroll tick
     CSS .scroll-progress / view() owns the axis,     │     scrub → SmoothProgress damping  (LIQUID WEIGHT)
     ZERO JS per frame                                │     snap  → decayRest + SpringProgress (INERTIA)
                                                       │     enter/leave → range-derived triggers
        └─────────────────────────────── single 0..1 progress ref ───────────┘
                                          │
        the consumers: a parallax depth, a pinned stage's phase clock, a progress bar,
        a dock collapse-t, a scroll-linked type axis — all read ONE smoothed ref / one CSS var
```

**Why this is the right gestalt, not a patch.** The current four composables already share one rAF
coalescer (`scrollReader`) and a native-vs-JS single-writer discipline — but they hand-roll the
velocity, the direction debounce, the collapse snap, the (absent) smoothing, AND they explicitly refuse
the library that ships all of it tested. keyframes.js `ScrollScene` *is* the factored core they were
groping toward: it owns the range→progress map, the scrub smoother, the snap physics (`decayRest` +
`SpringProgress`), and the enter/leave detector — and it picks native-vs-JS itself. We delete our
worse copies and thread the real one. This is DRY + KISS + the no-re-fork law, and it makes
liquid-weight *free* (it's a `scrub:` number).

---

## 2 — The single boldest move

**Make liquid weight the DEFAULT for every scroll-driven axis by routing ALL of them through the
keyframes.js JS lane with a `scrub` ≈ `1/φ`-derived smoothing — and demote the native `scroll()`/`view()`
compositor lane to the *reduced-motion / power-saver / "I asked for stiff"* path, not the default.**

This inverts the shipped doctrine. The current system treats native `scroll()`/`view()` as *primary*
(off-main-thread, the INP lever) and JS as the *grudging fallback*. But native `scroll()` is a **stiff
1:1 linear map with no smoother** (keyframes.d.ts:2780 says it verbatim: *"the damping the native
`animation-range` lane LACKS"*) — it structurally **cannot** carry liquid weight. The user's binding law
is *liquid weight on ALL scrolling*. Therefore the **liquid path is the JS lane** (it's the only one with
a `SmoothProgress` scrub-lag + a `SpringProgress` snap-settle), and it must be the default for any axis
the user *feels* (parallax, pin-phase, dock collapse, scroll-linked type) — driven by **one shared rAF
(`useRAFLoop`, already shipped, offscreen-paused via `useIntersectionPause`)** calling `scene.tick(dt)`.
The native compositor lane stays for the cases where stiffness is *correct and cheap*: a thin top-of-page
**progress bar** (`scaleX`, nobody feels its lag), and the **PRM floor** (under reduce, the scrub seconds
drop to 0 → instant, vestibular-safe, and it can ride native `scroll()` since there's no smoother to
want). The trade — a shared rAF over an `IntersectionObserver`-gated set of on-screen scenes — is a
*known, bounded* main-thread cost (one coalesced tick, the exact `scrollReader` budget we already pay),
bought for the thing the user explicitly demanded and the platform cannot give for free. **Liquid weight
is not an enhancement we layer on; it is the reason the JS lane is primary.**

---

## 3 — The mechanism (composables / recipes / tokens)

### 3.1 `useScrollScene` — the ONE Vue wrapper (replaces 4 composables)

```ts
// src/composables/motion/useScrollScene.ts  (keyframes.js-backed — the SCC heavy tier, /motion subpath)
import { createScrollScene, type ScrollScene } from "@mkbabb/keyframes.js";
import { useRAFLoop } from "./useRAFLoop";            // shipped — the ONE driver loop
import { useIntersectionPause } from "./useIntersectionPause"; // shipped — offscreen-pause
import { createScrollReader } from "./scrollReader";  // shipped — the ONE coalesced reader (KEPT)

export interface UseScrollSceneOptions {
  range?: AnimationRangeValue;     // "entry 0% cover 30%" etc — kf parses it
  scrub?: number;                  // seconds of SmoothProgress lag. DEFAULT --scroll-scrub (≈0.12s ≈ liquid)
  snap?: number[];                 // local-progress snap points → decayRest + SpringProgress
  snapSpring?: Partial<SpringProgressOptions>; // defaults to springPreset("gentle") ζ=0.85
  triggers?: { at: number|{fraction:number}|{element}; on: "enter"|"leave"; cb }[];
  source?: ScrollSource;           // window | element — resolved by scrollReader (KEPT)
}
// returns { progress: Ref<number>, direction, velocity, settled, recalculate }
```

- **The read** stays on the shipped `createScrollReader` (the ONE coalesced `scroll` listener — no
  fourth listener; this is the fit part we keep). Per coalesced tick it computes `p = position/extent`
  and calls `scene.scrollProgress(p)`.
- **The smoothing** is `scene.tick(dt)` driven by **one** `useRAFLoop` shared across all live scenes,
  gated by `useIntersectionPause` so an off-screen scene's loop sleeps (the perf carve). `scene.settled`
  parks the loop when the smoother converges (no free-running rAF at rest — the existing one-shot idiom,
  now a proper convergence park).
- **The snap** (`scene.snapTo(velocity)` → `scene.tickSnap(dt)`) gives the dock collapse + the pin-stage
  their iOS `onMomentumScrollEnd` snap *for free* from `decayRest` + `SpringProgress` — deleting
  `useScrollChrome`'s hand-rolled snap-midpoint state machine.
- **The triggers** are `scene.on("enter"/"leave", cb)` — deleting `useScrollTrigger`'s hand-rolled
  flip-delta crossing detector.

`useScrollProgress` (Safari-15-safe, keyframes-free, `/motion-core`) **survives as the thin floor** for
the engine-free subpath consumers (dock-search) — but it gains an *optional* `scrub` that, when set,
lerps toward target each rAF (`p += (target − p) * (1 − exp(−dt/τ))`, the same exponential `SmoothProgress`
uses) so even the core-tier read carries weight without pulling in keyframes.js. The heavy
`useScrollScene` is for the `/motion` consumers that want the full physics.

### 3.2 `.scroll-pin` — RE-INVENT (it's the only broken arm)

The named-scroll-timeline-on-a-non-scroller bug is unfixable as a pure CSS named timeline (the pin
element can't be both the sticky stage *and* its own scroll port). Two correct mechanisms, dual-path:

- **Native lane (Chrome / Safari 26+):** the pin's phases bind `animation-timeline: scroll(nearest
  block)` — an **anonymous** `scroll()` timeline that reads the *nearest ancestor scroller*
  (`.demo-main-scroller`), NOT a named timeline on the static pin element. `animation-range` maps the
  pin's own slice of that scroll. This is the one-character-class fix to the actual bug (named `--gl-pin`
  on a non-scroller → anonymous `scroll(nearest)`), and it's compositor-cheap.
- **JS lane (Safari ≤25, the liquid default):** `useScrollScene({ range: pin-slice, scrub })` drives a
  `--gl-pin-t` custom prop on the stage; the phases interpolate off `--gl-pin-t` via `@property` +
  `calc()`. This is the Safari floor the broken arm never had — and it carries scrub-lag weight.

Single writer: `@supports (animation-timeline: scroll())` gates the native lane; else the JS lane writes
`--gl-pin-t`. The pin **always** works on both engines (the gestalt bar).

### 3.3 `.scroll-build` / `.scroll-cascade` — KEEP + reconcile with entrance-reveal (no dup)

These are FIT (Finding 2). Per the entrance-reveal WAVE-AMENDMENT they are **AUGMENTED in place** (the
`-cel` cartoon-slam modifier + the `--i` time-clock stagger) by `W-LIQUID-ENTRANCE-GENERAL`. This
scroll-choreography wave **does NOT re-edit them** — it cross-links (the WAVE-AMENDMENT already names
`W-SCROLL-FLUIDITY`/`W-SCROLL-MINIMIZE` as cross-link partners on the shared in-place keyframe edit). The
one reconcile this lens adds: the `.scroll-cascade` `view()` arm's Safari degrade must fall to the
**mount-clock cel-slam, never a flat fade** (entrance-reveal GOLDEN §2d) — a one-line `@supports`-else
that re-uses the `.scroll-build` mount keyframe. **Zero new entrance work; zero dup vs entrance-reveal.**

### 3.4 Tokens (§L4 / §L6 — golden proportion)

```css
--scroll-scrub: 0.12s;        /* default SmoothProgress lag — the liquid-weight floor (driver-scoped) */
--scroll-scrub-pin: 0.20s;    /* the pin stage drifts heavier (a scene, not a control) */
--scroll-snap-spring: var(--spring-gentle);  /* ζ=0.85 — design.md §L4 "scroll choreography" curve */
--motion-weight: …;           /* DEPEND-ON BD.W-MORPH-PUNCH-TOKENS — co-scales scrub with the cartoon */
/* PRM: --scroll-scrub → 0s (instant, native-lane eligible, vestibular-safe) */
```

The scrub seconds rest near `1/φ`-family small values (≈0.12s ≈ a perceptible-but-not-laggy glide);
`--motion-weight` co-scales them so the scroll glide and the cartoon deformation read as ONE proportioned
system, never two unrelated tics (§L4).

---

## 4 — Cross-engine (§L7 — Chrome AND Safari, the paired floor)

| axis | Chrome | Safari (today) | mechanism | fence |
|------|--------|----------------|-----------|-------|
| progress bar (stiff OK) | native `scroll()` `scaleX` | native if 26+, else JS `scaleX` writer | compositor / JS floor | nobody feels its lag |
| parallax / pin-phase / dock-collapse (FELT) | **JS lane, scrub-lag** (default) | **JS lane, scrub-lag** | `ScrollScene` JS driver — identical both engines | liquid weight is the point |
| `.scroll-cascade` entry | native `view()` | mount-clock cel-slam (NOT flat fade) | `@supports` dual, entrance-reveal | never a flat fade |
| triggers (enter/leave) | JS `scene.on` | JS `scene.on` | identical — `ScrollScene` JS, no CSS-event possible | one detector |

**Default-to-broken-on-Safari is honored**: the FELT axes are JS-lane *on both engines* (so Safari is
never the degraded path for the things the user feels — it's identical to Chrome), and the only
native-lane axes are the ones whose stiffness is invisible (progress bar) or whose Safari-26 absence is a
*correct* static read (the pin's native enhancement, which has a JS floor underneath). No axis is
`view()`/`scroll()`-only with no floor. **MEATBALL/liquid carve**: scroll-driven motion animates
`transform`/`opacity`/`scaleX`/`--*-t` custom props ONLY (compositor-only, `proof:no-layout-animation`);
no `backdrop-filter: url()` rides a scroll axis; the goo/metaball filters are static SVG, untouched by
scroll.

---

## 5 — a11y / PRM carve

- **PRM (`prefers-reduced-motion: reduce`):** `--scroll-scrub → 0s` → `scene` requests no scrub → the JS
  lane tracks 1:1 instantly (vestibular-safe), and the axis becomes native-`scroll()`-eligible (no
  smoother wanted). The snap drops its `SpringProgress` settle to an instant set. **Triggers
  (enter/leave) STILL fire** under PRM — a trigger is a state signal, not a flourish (the shipped
  `useScrollTrigger` PRM model, preserved). The `.scroll-pin` shows its terminal phase statically; the
  cascade paints in place. No scroll axis *requires* motion to be correct.
- **`prefers-reduced-transparency` / `prefers-contrast: more`:** untouched — scroll choreography is
  transform/opacity, not a transmissive layer.
- **No layout animation:** every axis is compositor-only (the proof gate); the JS lane writes a custom
  prop / transform, never a layout property per frame.

---

## 6 — DELTA-ASSAY → wave amendment (reconcile vs the 116-wave set, no dup)

| existing wave | disposition | what this lens sharpens |
|---|---|---|
| `BD.W-SCROLL-FLUIDITY` | **REFRAME** | The rail slow-glide is **the same `ScrollScene` scrub** (not just native `scroll-behavior: smooth`) — the wave's "continuous slow-glide, not a snap" IS `scrub` smoothing; reconcile its no-Lenis fence with the truth that **keyframes.js `ScrollScene` is the sanctioned in-house smoother** (it is NOT Lenis/GSAP — it's the library's own sibling dep, honestly attributed). The fence is "no 3rd-party momentum lib", which `ScrollScene` is not. |
| `BD.W-SCROLL-MINIMIZE` | **REFRAME** | The dock scroll-minimize direction-read FEEDS `useScrollScene`'s `direction`/`velocity` (one reader) instead of a bespoke `scrollTop`-delta in `useDockState`; the collapse snap becomes `scene.snapTo()` (`decayRest`+`SpringProgress`) — the iOS `onMomentumScrollEnd` it hand-rolls. Still drives the shipped `collapse()`/`expand()` verbs (one registry). |
| `W-LIQUID-ENTRANCE-GENERAL` (entrance-reveal) | **DEPEND-ON / cross-link** | Owns the `.scroll-build`/`.scroll-cascade` in-place augment. This wave does NOT re-edit them; it adds only the cascade-Safari-degrade-to-cel-slam reconcile (one `@supports`-else). |
| `BD.W-MORPH-PUNCH-TOKENS` (NEW, cross-track) | **DEPEND-ON** | Sole authority for `--motion-weight` / `--ease-cartoon-punch`; the scrub co-scales via `var(…, fallback)`. |
| **NEW: `BD.W-SCROLL-SCENE-ENGINE`** | **AUTHOR** | The headline: author `useScrollScene` (kf `createScrollScene` wrapper); FIX `.scroll-pin` (named→anonymous `scroll(nearest)` native + JS `--gl-pin-t` floor); thread `scrub` liquid-weight default; DELETE the hand-rolled snap (`useScrollChrome`) + crossing detector (`useScrollTrigger`) cores onto `ScrollScene`, KEEP `scrollReader` (the read) + `useScrollProgress` (the core-tier floor). |

**Born-RED gates for `BD.W-SCROLL-SCENE-ENGINE`:**
1. **E1 (pin works):** a real scroll-gesture frame-series on `/motion/scroll-choreography` — the
   `.scroll-pin-phase-reveal` transform/opacity MUST change monotonically across the pin's scroll slice,
   BOTH modes, BOTH the **webkit** project (JS floor) and chromium (native). RED on HEAD (Finding 1: it's
   frozen). The cardinal artefact: the captured per-frame transform delta table.
2. **E2 (liquid weight):** drive a step-scroll and read the progress ref's settle — it MUST lag/glide
   (a frame-series shows convergence over ≥3 frames after the scroll stops), NOT jump 1:1. RED on HEAD
   (`useScrollProgress` is instantaneous).
3. **E3 (keyframes.js wired):** `useScrollScene` imports `createScrollScene` from `@mkbabb/keyframes.js`
   (source assertion); the hand-rolled snap/crossing cores are DELETED (DEFINITION-ABSENT). RED on HEAD.
4. **E4 (cross-engine floor):** no FELT axis is `view()`/`scroll()`-only with no JS floor; the pin has a
   `--gl-pin-t` JS writer under `@supports not (animation-timeline: scroll())`. RED on HEAD (pin is
   enhancement-only, Safari gets nothing).
5. **E5 (no dup):** `.scroll-build`/`.scroll-cascade` keyframes byte-unchanged by THIS wave (owned by the
   entrance-reveal augment); only the cascade Safari-degrade `@supports`-else added.

---

## 7 — Survival-of-the-fittest ledger

- **KEEP (fit):** `scrollReader` (the ONE coalesced read), `useScrollProgress` (the Safari-15 core-tier
  floor, +optional scrub), `.scroll-build` + `.scroll-cascade` (work), `scroll-driven.css` `.scroll-progress`
  + `[data-scroll-reveal]` (the cheap native progress-bar/reveal), `supportsCssTimeline` (the hardened
  probe), `useRAFLoop` + `useIntersectionPause` (the shared loop + offscreen-pause).
- **REFINE (weak):** the cross-engine doctrine (native-primary → JS-liquid-primary for felt axes); add
  `scrub` weight everywhere; cascade Safari-degrade to cel-slam.
- **RE-INVENT (broken):** `.scroll-pin` (named→anonymous timeline + JS floor); `useScrollChrome`'s
  snap state machine → `scene.snapTo()`; `useScrollTrigger`'s crossing detector → `scene.on()`.
- **NO LEGACY:** the hand-rolled snap/velocity/crossing cores are deleted, not aliased. The new
  `useScrollScene` is the one engine; the others compose or wrap it.

**Gestalt bar met:** the scroll-choreography WORKS (pin fires + tracks, both engines) AND carries liquid
weight (scrub-lag default, spring-snap settle), both modes, both engines — and it's keyframes.js-backed,
the answer to the user's literal question.
