# D5 · pass 1 · R-W: prior art for the engagement register

| field | value |
|---|---|
| seat | D5 pass 1, R-W (prior art). Background only: the verdict comes from the prototypes (`REGISTRY.md` §3.1) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `12c5a3e9`; `git diff --stat v10.1.0 HEAD -- src` prints nothing (the 10.1.0 bytes, as at round 0) |
| inputs | `PORTFOLIO.md` (whole), `REGISTRY.md` (whole, incl. O-87), `BASELINE.md` §0-§2, `harness/HARNESS.md`. The iOS 27 corpus: `docs/tranches/IOS27-MICRO/CHARTER.md` (whole), `analysis/MARKS.md` (whole, incl. the pass-2 corrections C1-C7), `analysis/MARKS-D-POPOVER.md`, `MARKS-C-MUSIC.md`, `MARKS-C-APPS.md` (sections cited below), `docs/tranches/BJ/formation/ios27/IOS27-CODEX.md` laws 5-9 and 14-20. `src/composables/motion/spring/springPresets.ts:65-97`, `src/composables/dom/useTouchGate.ts:21-52`, `src/components/dock/composables/useDockHold.ts:147` |
| instrument | `pass-1/rw/platform-probe.mjs`: one page, four reads (feature support; a registered `<number>` under a `linear()` spring; a mid-flight retarget, unseeded vs velocity-seeded; popover + anchor + `@starting-style` + `::backdrop`). Playwright 1.61.1 by absolute path; headless Chromium 149.0.7827.55 and Playwright WebKit 26.5. No build, no worktree needed: the probe never touches `src/` |
| engines | **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | Extreme throughout (1-minute 224-504): other seats' browsers. Every run's load is in its JSON and stderr. The timing reads are velocity signs and ratios, which hold across five runs at different loads; no absolute duration is claimed |
| artefacts | `pass-1/rw/logs/platform-probe-2026-10-07T07-48-53-644Z.json` (run 2, both engines, load 224-267), `…T08-11-32-300Z.json` (run 3: Chromium with the seeded-CSS arm, load 274-279; its WebKit stage timed out at 180 s, load 268), `…T08-17-03-496Z.json` and `…T08-20-46-751Z.json` (runs 5-1 and 5-2, WebKit, load 504 and 346). Stage timings: `logs/run*.stderr` |

## 0 · In brief

1. **iOS 27 shows engagement through light first and geometry second.** The press brightens about 50 ms before anything moves. A long press swells about 10% and then *holds still* until commit. A held engagement sustains its light for the whole hold. The commit is a hard content cut (≤17 ms) followed by about 250 ms of light release. Every geometric arrival rides one spring register (ζ ≈ 0.80-0.85, f_n ≈ 3.2 Hz, settle ≈ 180 ms). Overshoot is paid for by velocity (≈0.02-0.025 px per px/s of crossing velocity). Slow or zero-velocity arrivals land dead. The one exception is fired presentations, which carry a 4-5% intrinsic overshoot (§1).
2. **Apple's own canon says the same in its own terms** (WWDC18 803, WWDC23 10158, WWDC25 219): highlight on touch-down and confirm on touch-up; track 1:1; every motion can be redirected at any moment and keeps its velocity when retargeted; reward momentum with overshoot, and only momentum. Liquid Glass "illuminates from within" under the finger. Controls "lift up into Liquid Glass temporarily" so "the resting state stay[s] visually quiet" (§2). This is Apple's reading of the ladder's engaged rung as *promotion* (Q-3), not an in-place grow.
3. **On the web, velocity handoff takes a script write per release. CSS alone cannot do it.** Measured: when a CSS transition is retargeted mid-flight, its velocity reverses sign within one frame in 5 of 5 cells across both engines (e.g. +2032 → −729 px/s, Chromium). A per-release `linear()` spring seeded with the measured velocity keeps the sign in 8 of 8 cells. That holds whether it is written as a CSS `transition` (one style write) or as WAAPI (§3.2). A registered `<number>` carries a `linear()` spring's overshoot in both engines (peak 1.042 against the analytic 1.042). An unregistered property flips (§3.1).
4. **The platform pieces the families lean on exist in both engines**: `popover`, anchor positioning (incl. `position-try-fallbacks`, `anchor-scope`, `position-visibility`), `@starting-style`, `transition-behavior: allow-discrete`, `linear()`, `@property`, `command`/`commandfor`, scroll-driven animations, document View Transitions, `sibling-index()`. These are Chromium-only, so no rung may use them: `if()`, `interpolate-size`/`calc-size()`, `corner-shape`, `interestfor`, `popover="hint"`, `dialog closedby`, element-scoped `startViewTransition`, `scrollsnapchange`, `container-type: scroll-state`, `timeline-trigger` (§3).
5. **Three seams for the agglomerator** (stated, not minted; §4): (a) E-2's bound asks a zero-velocity keyboard commit for a *geometric* bounce, which iOS puts in the light channel (law 19). (b) On real iOS Safari, `:active` needs a `touchstart` listener on the element or an ancestor. Any CSS-only press rung (A, C, D) depends on that listener. In glass-ui it exists only conditionally (UNMEASURED in real Safari). (c) The hold envelope (sustain, not pulse) is a bound E-3 and E-5 do not yet state.

## 1 · iOS 27: press, hold, commit, fling (the IOS27-MICRO marks)

Every figure below is a measured or bounded read from the corpus. The citations point at the line that holds it. Corrections are taken as final (MARKS.md's pass-2 C1-C7 void several first reads, and nothing below cites a voided one).

| idiom | what iOS 27 does (measured) | source | the D5 row it bears on |
|---|---|---|---|
| **press: light first** | Pill tap brightens the band +3% for ~50 ms before any motion; the eyeglass glyph reddens 35-70 ms before the fusion moves. "Engagement is displayed by LIGHT first" | `MARKS-C-MUSIC.md:110-113`; codex law 9 ("light changes ~80ms before shape") | E-5 (a press-only *property* already satisfies its bound), D5-C's channel budget, O-87 (light that carries state is in; ornament is out) |
| **press: whole-component wash** | Find My: on press the lens brightens in place and "a cyan liquid glow blooms past the capsule bounds and washes across the whole tab bar (engagement displayed by the entire component)". Music charges the *destination* slot (+70% redness, ~83 ms) before travel | `MARKS.md:114-115,262-263`; `MARKS-C-MUSIC.md:143` | Q-1 option (a): a passive child shows its container's engagement (C's inheritance) |
| **long press: charge, then hold still** | The pressed thumbnail swells to ~10% larger over ~250 ms, then holds: 13 bit-identical frames (≥200 ms) "a charged, swollen, waiting state" before commit | `MARKS-D-POPOVER.md:53-61`; routing note 5 `:231-234` ("swell ~8-10% on springPreset("press") and HOLD") | the held rung (A's `held` class, E-3's "sustained") |
| **hold: an envelope, not a pulse** | charge (+15 L at birth) → peak (~+35% at +160 ms) → **sustain for the hold's whole life** → release ~250 ms after commit. "A press that only pulses has misread this law" | codex law 20 | E-3 and E-5 bounds say nothing about sustain (seam (c), §4) |
| **commit: on release only** | Find My drag lens: "selection COMMITS ON RELEASE only — the sheet never changes while the finger is down"; content hard-cuts ≤17 ms, then ~150-250 ms of light decay | codex law 16(c) incl. its corpus-redo amendment | E-2's pointer column (commit on `pointerup`, never `pointerdown`) |
| **commit: overshoot lives in light** | "geometry never overshoots without velocity … but entrance LUMINANCE does"; the lens lands 15-20% wide on the light channel and cools ~250 ms | codex law 19; `MARKS.md:119-121` | E-2's pop bound (seam (a), §4) |
| **arrival: one register** | Dock landing ζ 0.80 (0.77-0.88), f_d 1.7 Hz, settle ≈180 ms; context-menu open ζ 0.82, f_n 3.12-3.33 Hz, settle 180 ms. "iOS 27 runs ONE terminal-arrival register across the dock morph and the context-menu open" | `MARKS.md:354-379`; `MARKS-D-POPOVER.md:79-105` | FL-2 (no minted figure): the table's `dock` row (0.30, ζ 0.88, `springPresets.ts:84-86`) sits in that bracket |
| **overshoot is velocity-bought** | +11 px at 570 px/s crossing (0.02 px per px/s); popover 0.0246; the codex rubber-band gain 0.023. Slow-placed arrivals land with zero bounce. Exception: fired presentations ride `panel` (0.40, ζ 0.71) with 4-5% intrinsic overshoot | `MARKS.md:375-379,415-416`; `MARKS-D-POPOVER.md:99-105`; codex law 14(c)/(e) | E-2, E-4, Q-5 |
| **fling: tracked leader, ballistic release** | Two regimes split at the finger: 1:1 scrub while tracked; on release a spring seeded with the release velocity. "Never tween a tracked drag." Detent target = nearest(y + v·τ), τ ≈ 0.2 s; flicks skip detents | codex laws 15, 7(c), 14(a); `MARKS.md:244-249` | E-4 and H-7 (the slider, sheet, sortable list, tabs drag) |
| **interruption: re-seat, never reset** | Under rapid re-taps "the lens re-seats mid-cool with no reset and no blink — velocity-continuous interruption"; CC dismissal caught mid-flight and reversed with the blur medium persisting | `MARKS.md:434-442,205-208,259-261` | every rung's retarget (§3.2) |
| **detuned channels** | fade : geometry ≈ 1 : 4 (CC open; popover 100 ms vs 320-360 ms); "Equal timings kill the effect" | `MARKS.md:188-192`; `MARKS-D-POPOVER.md:73-77`; codex law 5 | the envelope table (`engageEnvelopes.ts`) already separates the light clock from the geometry spring |
| **continuity of state** | content state survives every morph; nothing mounts popping | codex law 17 | H-8 (a component that mounts committed pops nothing) |
| **idle** | iOS *parks* its controls; the ambient breathing floor lives on editorial cards, not controls ("No specular event ever appears on a static card — light motion is reserved for engagement") | `MARKS-C-MUSIC.md:122-131`; `MARKS.md:165-167`; codex law 11 | Q-2: the corpus sides with the ladder's REST rung (default (b)) and with O-87's "no idle shimmer that carries no state" |

## 2 · Apple's stated canon

**"Designing Fluid Interfaces"** (WWDC 2018 session 803; <https://developer.apple.com/videos/play/wwdc2018/803/>, transcript read 2026-10-07):
- Touch-down and touch-up: "the button should highlight immediately when I touch down on it"; "we shouldn't confirm the tap until my touch goes up"; dragging out and lifting cancels.
- 1:1 tracking: "touch and content should move together. One-to-one tracking is extremely important."
- Hysteresis: "usually 10 points in iOS" before a touch becomes a swipe.
- Springs described by damping ratio and response rather than duration ("mass stiffness and damping will remain behind the scenes"). Start at 100% damping; "if the gesture that's driving the motion itself has momentum, then you should reward that momentum with a little bit of overshoot." This is the same law the corpus measures as velocity-bought overshoot.
- Redirection: thought and gesture run in parallel, so every animation must be interruptible and redirectable mid-flight.
- Momentum projection: the session's code projects a release with the scroll deceleration rate. The widely reproduced sample is `(v / 1000) * rate / (1 - rate)`, with `rate = 0.998` for `.normal`. The fetched transcript summary did not reproduce the code verbatim, so the exact form is cited from memory of the session. The corpus measures its own projection constant τ ≈ 0.2 s (codex law 7(c)).
- Rubber banding: the boundary is signalled "gradually and softly", tracking throughout, and elasticity pulls the content back on release.

**"Animate with springs"** (WWDC 2023 session 10158; <https://developer.apple.com/videos/play/wwdc2023/10158/>):
- Springs take (duration, bounce); "use a spring with bounce 0" when unsure.
- Velocity on retarget: "a spring animation uses the velocity it had when it was retargeted as the initial velocity towards its new destination". This is the property §3.2 measures the web lacking in CSS.
- Gesture velocity: "a spring can start with any initial velocity, so we get a natural feeling where our animation picks up right where the gesture ends."

**"Meet Liquid Glass"** (WWDC 2025 session 219; <https://developer.apple.com/videos/play/wwdc2025/219/>):
- "responds to interaction by instantly flexing and energizing with light"; "the material illuminates from within … Starting right under your fingertips, the glow spreads throughout the element and onto any Liquid Glass elements nearby." This is press light first, and it reaches neighbours.
- "Elements can even lift up into Liquid Glass temporarily, such as when you interact with a component. This lets the resting state stay visually quiet, while it comes to life on touch … the transparent liquid lens can be seen through to precisely observe the value underneath it." This is the engaged rung as **promotion into a lens** (the ladder's reading, `engageLadder.ts:182-193`; D5-E; Q-3 options (b)/(c)). It is not a 1.06 in-place grow.

## 3 · The web, measured (Chromium 149 / Playwright WebKit 26.5)

### 3.0 Support (run 2 `…07-48-53…json`; identical in runs 3 and 5 where re-read)

| feature | Chromium | PW WebKit | real Safari | ship note (sourced) |
|---|---|---|---|---|
| `linear()` easing | yes | yes | UNMEASURED | |
| `@property` / `CSS.registerProperty` | yes | yes | UNMEASURED | |
| `transition-behavior: allow-discrete` | yes | yes | UNMEASURED | Safari 17.4 (<https://webkit.org/blog/15063/webkit-features-in-safari-17-4/>) |
| `@starting-style` | yes | yes | UNMEASURED | |
| `popover` | yes | yes | UNMEASURED | Safari 17.0 (per the Safari 26.0 post below) |
| `popover="hint"` | yes | **no** | UNMEASURED | |
| `anchor-name`, `position-area`, `anchor()` | yes | yes | UNMEASURED | Safari 26.0 (<https://webkit.org/blog/17333/webkit-features-in-safari-26-0/>) |
| `position-try-fallbacks: flip-block`, `anchor-scope`, `position-visibility` | yes | yes | UNMEASURED | flip and `position-visibility` refinements in Safari 26.2 (<https://webkit.org/blog/17640/webkit-features-for-safari-26-2/>) |
| `command` / `commandfor` | yes | yes | UNMEASURED | Safari 26.2 (same post) |
| `interestfor` | yes | **no** | UNMEASURED | |
| `<dialog closedby>` | yes | **no** | UNMEASURED | |
| `:open` | yes | yes | UNMEASURED | |
| `document.startViewTransition`, `view-transition-class` | yes | yes | UNMEASURED | `document.activeViewTransition` in Safari 26.2 |
| element-scoped `startViewTransition` | yes | **no** | UNMEASURED | |
| `animation-timeline: scroll()` / `view()` | yes | yes | UNMEASURED | Safari 26.0 |
| `scrollend` | yes | yes | UNMEASURED | |
| `scrollsnapchange`, `container-type: scroll-state` | yes | **no** | UNMEASURED | |
| `interpolate-size`, `calc-size()`, `if()`, `corner-shape`, `timeline-trigger` | yes | **no** | UNMEASURED | |
| `sibling-index()` | yes | yes | UNMEASURED | |
| `animation-composition`, WAAPI `composite: "add"`, `commitStyles` | yes | yes | UNMEASURED | |
| `PointerEvent.getPredictedEvents` | yes | yes | UNMEASURED | |
| `PointerEvent.getCoalescedEvents` | no | no | UNMEASURED | **INCONCLUSIVE**: a secure-context API, and the probe page is `setContent` on `about:blank`. Re-read on an http(s) origin before any route relies on it |
| `navigator.vibrate` | yes | **no** | UNMEASURED | iOS Safari has no Vibration API. Its only haptic is the native `<input type=checkbox switch>` (switch shipped Safari 17.4; the iOS haptic tick arrived with Safari 18, per WebKit bug 285120 <https://bugs.webkit.org/show_bug.cgi?id=285120>) |
| `<input switch>` | no | yes | UNMEASURED | |

### 3.1 A registered number carries the spring; an unregistered one flips

`--e` registered as `<number>`, transitioned 0 → 1 over a `linear()` curve sampled from the `panel` row (0.40, ζ 0.71; 655 ms, 61 points). Read with `getComputedStyle` every frame:

| run | engine | frames | distinct values | peak | unregistered `--u`: distinct values |
|---|---|---|---|---|---|
| 2 | Chromium | 88 | 54 | **1.04198** | 1 (flips to `1`) |
| 2 | WebKit | 46 | 33 | **1.04205** | 1 |
| 3 | Chromium | 92 | 57 | 1.04208 | 1 |
| 5-1 | WebKit | 47 | 31 | 1.04168 | 1 |
| 5-2 | WebKit | 46 | 32 | 1.04177 | 1 |

The analytic overshoot of ζ 0.71 is e^(−ζπ/√(1−ζ²)) = 0.042. Both engines reproduce it to the third decimal. A scalar route (D5-C) can therefore carry an intrinsic-overshoot row through `@property` + `linear()` with no script, in both engines. This needs a paint read before it counts, but it carries.

### 3.2 Velocity on retarget: CSS loses it; a seeded curve keeps it

A 40 px box transitions `translateX` 0 → 300 px on the `dock` row (0.30, ζ 0.88). At ≥90 ms (and ≥3 frames) it is retargeted to 0 three ways: (i) a plain CSS retarget; (ii) a CSS retarget whose `transition` is rewritten in the same frame to a `linear()` spring seeded with the measured velocity (one style write); (iii) a WAAPI animation with the same seeded curve. The velocities are px/s over the last frame before the retarget and the first two frames after it:

| run | engine | arm | v before | v after (1st frame) | v after (2nd frame) |
|---|---|---|---|---|---|
| 2 | Chromium | plain CSS | +2032 | **−729** | −1807 |
| 3 | Chromium | plain CSS | +1998 | **−723** | −1751 |
| 2 | WebKit | plain CSS | +2258 | **−1213** | −2316 |
| 5-1 | WebKit | plain CSS | +2461 | **−1386** | −2440 |
| 5-2 | WebKit | plain CSS | +2230 | **−932** | −2355 |
| 3 | Chromium | seeded CSS | +2191 | +1749 | −483 |
| 5-1 | WebKit | seeded CSS | +2241 | +622 | −1897 |
| 5-2 | WebKit | seeded CSS | +2211 | +456 | −1912 |
| 2 | Chromium | seeded WAAPI | +2167 | +1488 | +528 |
| 3 | Chromium | seeded WAAPI | +2001 | +1117 | +187 |
| 2 | WebKit | seeded WAAPI | +2310 | +598 | −834 |
| 5-1 | WebKit | seeded WAAPI | +2250 | +775 | −670 |
| 5-2 | WebKit | seeded WAAPI | +2363 | +561 | −865 |

Plain CSS reverses the motion within one frame in 5 of 5 cells. That is a velocity cliff of 2700-3800 px/s, the "blink" iOS never shows (§1, interruption). Both seeded arms carry the incoming motion forward and decelerate through zero in 8 of 8 cells. The deceleration is steep because `dock` is stiff (ω_n = 20.9 rad/s). The predicted spring deceleration at ~200 px from target and ~2200 px/s is ≈1.7×10⁵ px/s². That matches the measured per-frame drops (≈1000 px/s per 8.3 ms frame in Chromium, ≈1500 per 16.7 ms frame in WebKit). The WebKit frame cadence is coarser under this load (46-61 frames per second of sampling against Chromium's 120), so its first-frame figures are averages over a longer interval.

What this settles as background:
- **A CSS transition does not accept an initial slope**, but it can be given one: rewrite `transition-timing-function` to a velocity-seeded `linear()` in the same frame as the new value. That is a script write per release, and it answers R-C's question 5 ("does a CSS transition accept an initial slope, or does the scalar need WAAPI?"): either works, and both are script.
- **D5-D's "momentum out of reach by construction" stands**: pure CSS has no velocity.
- `useLiquidPress` (an interruptible spring in script, `useLiquidPress.ts:1-24`) is already the in-tree instance of the seeded path for the press. Velocity handoff for E-4 is the same machinery applied at release.

### 3.3 The top-layer stage pieces work in both engines

A `popover="manual"` element with `position-anchor` + `position-area: bottom`, `@starting-style { opacity: 0 }` and `::backdrop { backdrop-filter: blur(6px) }` was shown with `showPopover()`:

| run | engine | `:popover-open` | entry opacity, first 8 frames | anchored below / centred | `::backdrop` computed `backdrop-filter` |
|---|---|---|---|---|---|
| 2 | Chromium | true | 0, 0, 0.023, 0.083, 0.139, 0.217, 0.274, 0.335 | true / true (pop top 430 = anchor bottom 430) | `blur(6px)` |
| 2 | WebKit | true | 0.007, 0.133, 0.19, 0.263, 0.333, 0.367, 0.42, 0.483 | true / true | `blur(6px)` |
| 5-1, 5-2 | WebKit | true | starts 0 and 0.007, rising | true / true | `blur(6px)` |

D5-E's mechanism sketch (`PORTFOLIO.md` §4 D5-E) parses, positions and runs its entry transition in both engines. Two things remain open: the `::backdrop` blur is a computed-style read, not a paint read (D5-E question 3), and real Safari is UNMEASURED.

## 4 · What the prior art says to each family and to the checklist (background, not a verdict)

| family / row | what the prior art supports | what it warns |
|---|---|---|
| D5-A | iOS's ladder is per-class in kind: a tap register (`press`, lands dead), an arrival register (`dock`), a fired-presentation register (`panel`, intrinsic overshoot). A class table maps onto that | a CSS-only class recipe has no velocity (§3.2); the `held` class needs a script leg, as PORTFOLIO already says |
| D5-B | Apple's model is one gesture object that tracks 1:1, carries velocity on release and is interruptible at any point (WWDC18/23). That is B's "one door". Commit on release only (law 16(c)) | none from prior art; cost is B's own question |
| D5-C | §3.1: the registered scalar carries a `linear()` spring's overshoot in both engines; light-first ordering is a scalar mapping (light at low `--engage`, geometry later) | §3.2: retargeting the scalar mid-flight (press released before the press spring lands) reverses with a cliff unless the release rewrites the curve; that is a script write on every release, not only for momentum |
| D5-D | Liquid Glass puts the response *in the material* ("illuminates from within … spreads … onto any Liquid Glass elements nearby"); that is D's centre | the same material quote says the glow reaches neighbours: a substrate-local recipe cannot do that without inheritance (C) or a stage (E) |
| D5-E | "lift up into Liquid Glass temporarily … the resting state stay[s] visually quiet" is promotion verbatim; §3.3 shows the top-layer stage parts work in both engines | the projection (clone vs moved node) is untouched by prior art; Apple's lens shows the *value underneath*, a clone-of-detail reading closer to the loupe than to a projected control |
| D5-X3 (View Transitions per commit) | stays not minted: element-scoped `startViewTransition` is Chromium-only (§3.0), and the document-scoped one snapshots the page | — |
| Q-1 | Find My's whole-bar wash and Liquid Glass's spread to neighbours read as option (a), the container's engagement visible in the atom | default (c) stands until ruled; this is evidence, not a ruling |
| Q-2 | iOS parks its controls; light motion is reserved for engagement (`MARKS.md:165-167`); O-87 strikes idle shimmer that carries no state. Both support default (b) | — |
| Q-3 | Apple's own words favour promotion (b), with the lens over the value | the coarse/fine split of default (c) is not something Apple distinguishes |
| Q-5 | iOS commits by travel where a body exists (lens, sheet) and by light where none does (law 19) | see seam (a) |

**Seams for the pass-1 agglomerator** (each a candidate checklist row with its reason, as `REGISTRY.md` §2 allows; this seat adds none):

- **(a) E-2's pop bound vs law 19.** E-2 asks every commit, including a keyboard commit with zero velocity, for a geometric peak ≥0.015 and a bounce ≥0.002 below settle (`PORTFOLIO.md` §1.1). iOS measures zero-velocity geometric arrivals as landing dead. The exception is fired presentations on `panel`. iOS puts the commit's overshoot in the light channel, which overshoots and cools in ~250 ms. Two ways to resolve it: let E-2 accept a light-channel overshoot (a luminance read on the commit), or accept that D5's commits are deliberately livelier than iOS's, as a declared divergence. Either is the owner's or the agglomerator's call. O-87 is compatible with the light reading only if the light carries the commit and is not a halo.
- **(b) The real-Safari `:active` precondition.** iOS Safari applies `:active` on touch only when a `touchstart` listener exists on the element or an ancestor. This is long-documented WebKit behaviour (e.g. <https://bugs.webkit.org/show_bug.cgi?id=138816>; <https://css-tricks.com/?p=14148>). Apple's own workaround is an empty `ontouchstart`. In glass-ui, the slider and dock install host `touchstart` listeners (`useDockHold.ts:147`). The document-level listener in `useTouchGate.ts:35-40` exists only while a gate is registered. A CSS-only press rung (A's recipes, C's `:active` → `--engage`, D's substrates) may therefore be silent on a real iPhone for components with no such ancestor. Playwright cannot see this. **UNMEASURED (owner's safaridriver checkbox)**, and a candidate FL-7 cell.
- **(c) Sustain.** Law 20 says a held engagement *sustains* its light for the whole hold. E-3 already reads "sustained" for geometry. E-5 and the held rung have no sustain bound, so a press that pulses and decays during a long hold would pass them. This is a candidate bound on the held rung: the light value at hold +1 s ≥ its value at +200 ms.

## 5 · Honesty ledger

- MEASURED here: §3.0 support (both engines, 3 runs agree), §3.1 (5 runs), §3.2 (13 cells, 5 runs), §3.3 (computed style and geometry, 4 runs).
- INCONCLUSIVE: `getCoalescedEvents` (secure-context page needed). Run 3's WebKit stage timed out at 180 s under load 268 (`logs/run3.stderr`). Runs 5-1 and 5-2 re-read WebKit in full. One earlier WebKit attempt failed because a frame starved under load. The probe's retarget now waits for ≥3 frames, and that run's log was dropped, not counted.
- From sources, not measured: the WWDC quotes (transcripts fetched 2026-10-07), the Safari ship versions (WebKit blog posts cited per row), the iOS `:active` rule and the switch haptic. The momentum-projection code form is cited from memory of WWDC18 803 (§2).
- UNMEASURED: every real-Safari cell. Paint: no screenshot was taken; §3.3's backdrop blur is computed style only.
