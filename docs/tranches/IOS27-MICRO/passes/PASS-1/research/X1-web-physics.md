# X1 — web spring/gesture physics SOTA (IOS27-MICRO pass 1)

verified-model: claude-fable-5 (system-context model ID, verbatim)
seat: X1 (cross-cutting — serves every family blind)
date: 2026-07-18
scope: velocity-seeded springs, gesture velocity tracking, scroll-driven animation + overscroll
observability in Safari 2026, interruptible/catchable transitions, FLIP vs live-morph. Named sources,
version-cited Safari support. Physics targets cross-referenced against `analysis/MARKS.md`.

## Verdict in one paragraph

There is no native spring primitive on the web in 2026 — `spring()` (CSSWG issue #280, filed by Apple
2016) never left Safari Technology Preview and has no resolution. The standardized path is `linear()`
easing (Safari 17.2+) carrying a pre-sampled spring curve, applied through CSS or WAAPI; velocity
seeding is done by keeping the spring model in JS and regenerating the curve at interrupt time. Safari
26.x closed nearly every gap that used to force Chrome-only patterns: scroll-driven animations (26.0),
threaded on the compositor (26.4), `scrollend` + `Animation.overallProgress` + fractional pointer
coordinates (26.2), coalesced/predicted pointer events (18.2). Safari is also the ONLY engine that
exposes rubber-band overscroll to JS (out-of-range `scrollTop`). View Transitions are snapshot-based
and wrong for finger-attached morphs of live content; the liquid-dock work needs live-morph via
transform channels plus the FLIP/projection correction idiom for geometry.

## A. Springs on the web — the state of the primitive

**CSS `spring()` — dead as a platform feature.** Proposed July 2016 by Apple (weinig/dino, filed by
grorg) as `spring(mass stiffness damping initialVelocity)` — csswg-drafts issue #280. Implemented
behind a flag in Safari Technology Preview only (demo persists at webkit.org/demos/spring); never in
stable Safari, no CSSWG resolution, no 2024–2026 movement on the issue. The WG's umbrella for richer
easing is issue #229 (css-easing-2 complex easing). Do not wait for it.

**`linear()` is the standardized carrier.** CSS Easing Level 2 `linear(stop, stop N%, …)` encodes any
sampled curve including overshoot (values >1 / <0). Support: Chrome 113, Firefox 112, **Safari 17.2**
— years below our Safari 26 floor. Works in `transition-timing-function`, `animation-timing-function`,
AND the WAAPI `easing` option (verified: bram.us "How to use a Custom Easing Function with WAAPI",
Jan 2024). Two constraints follow from its shape:
1. Duration is not part of the curve — a spring's settle time must be computed and set as the
   animation duration alongside the generated stops.
2. The curve is fixed at generation time — mid-flight retargeting with preserved velocity requires
   regenerating (section B); a bare CSS transition retarget restarts the spring curve from v=0.

**Generators (named):**
- **Motion (motion.dev) `spring()`** — the production-grade one: parameters stiffness/damping/mass or
  the perceptual pair `visualDuration` + `bounce` (0–1), plus `velocity` for seeding and
  `restSpeed`/`restDelta` for settle detection. Returns a generator sampled into a `linear()` string +
  duration; `element.style.transition = "all " + spring(0.5)` emits the full CSS fragment. Motion's
  `animate()` rides WAAPI, so compiled springs run compositor-side.
- **okikio/spring-easing** — library-agnostic frame/`linear()` generation, works with raw WAAPI, GSAP,
  anime.js; supports initial velocity.
- **Jake Archibald's linear-easing-generator** and Josh Comeau's "Springs and Bounces in Native CSS" —
  the reference explainers for hand-rolled generation.
- **anime.js v4** — ships spring + custom-easing → WAAPI `linear()` compilation as well.

**Parameter mapping to MARKS.** Apple's own perceptual parameterization (WWDC23 "Animate with
springs") is duration + bounce, where bounce ≈ 1−ζ. MARKS measures the dock springback at ζ≈0.5–0.65,
f≈2–2.5Hz, settle ≤250ms with one overshoot — i.e. bounce≈0.35–0.5, visualDuration≈0.15–0.25s. That
sits adjacent to the existing `springPreset("dock")` {0.68, 0.64}. The compile pipeline should go
preset → (ζ, f, v₀) → closed-form underdamped solution → `linear()` stops + duration. Sample
adaptively (dense near extrema); ~40–80 stops reproduce an overshoot spring transparently.

## B. Velocity-seeded interruption — the four idioms

The core problem, stated by the spec: CSS transition retargeting replaces the running transition and
restarts easing from zero velocity — Comeau demonstrates the "hit a wall" turnaround vs a
velocity-aware spring. The `reversing shortening factor` (CSS Transitions §"faster reversing of
interrupted transitions") only compresses duration on pure A→B→A reverses — it does not preserve
velocity and does not apply to retargets to new values. The arXiv "Signals and Systems Approach to
Animation" (1703.00521) formalizes it: interrupted transitions cannot be smooth in both position and
velocity. The idioms, in order of preference for glass-ui:

1. **Model-in-JS, curve regeneration (the Motion idiom).** The spring model lives in JS, so at
   interrupt time position AND velocity are known analytically — no DOM measurement. Cancel (or
   `commitStyles()` then cancel) the running WAAPI animation, regenerate `linear()` + duration with
   `velocity: v` seeded, `element.animate()` again. Compositor-resident playback, main-thread work
   only at the interrupt instant. Safari 26.2 fixed `commitStyles()` for completed animations and for
   custom/logical properties. Safari 26.2 also added **`Animation.overallProgress`** (0–1) — progress
   reads without private bookkeeping.
2. **rAF spring loop** (react-spring, Motion hybrid, our existing JS springs) — write
   transform/opacity per frame. Fully interruptible and catchable by construction; costs main thread
   every frame. Right for gesture-attached scrub (which is per-frame anyway), wrong for release
   animations when idiom 1 is available.
3. **Additive correction** — layer a decaying delta-spring on top of the base animation instead of
   cancelling it: WAAPI `composite: "add"` / CSS `animation-composition: add | accumulate` — Safari
   16.0+ (caniuse mdn-css_properties_animation-composition). This is Apple's native additive-animation
   trick ported to the web: position stays C0-continuous through any number of interrupts, and each
   correction spring carries its own velocity. Best for rapid re-targeting (the CC scrub-catch).
4. **Closed-form spring inside a CSS transition** (ktsn/css-spring-animation) — register `--t` via
   `CSS.registerProperty`, transition `--t` linearly, express the spring as
   `calc(P * (A*var(--t) + B) * exp(-C*var(--t)) - Q)`; velocity carried automatically at takeover.
   Elegant, but registered-custom-property animation interpolates on the main thread, not the
   compositor — fails our compositor-first bar for the hot paths; keep as a niche tool.

**Scrub/catch mechanics.** WAAPI animations pause, reverse, and scrub (`currentTime`,
`updatePlaybackRate`); the MARKS "everything is a scrub" mandate maps to: finger-down = direct style
writes (or a paused animation scrubbed by progress), release = idiom-1 spring seeded with tracker
velocity, catch = read `overallProgress` + model velocity, re-enter scrub. No fire-and-forget.

## C. Gesture velocity tracking — the idioms

**Sample feed.** `pointermove` + **`getCoalescedEvents()`** for full-rate history and
**`getPredictedEvents()`** for latency compensation — both in **Safari 18.2** (announced STP 202;
"WebKit Features in Safari 18.2"), Chrome/Firefox long prior. **Safari 26.2** added fractional
`clientX/clientY` on PointerEvent/TouchEvent — sub-pixel deltas, materially better velocity precision
at 120Hz displays. **`pointerrawupdate` is NOT in Safari** (Chrome + Firefox only, caniuse) — plan for
coalesced-at-rAF cadence, never rely on raw-update cadence.

**Estimator.** The cross-platform reference is the Android/Flutter `VelocityTracker`: keep up to ~20
samples inside a trailing **100ms window**, fit a degree-2 polynomial by least squares, take the
first-derivative coefficient as velocity (Android "Track touch and pointer movements"; Flutter
`gestures` VelocityTracker uses the same LSQ fit). The cheap alternative (last-delta/dt or EMA of
deltas — what use-gesture and Motion do) is acceptable for springs but noisy at release; the LSQ
window is what makes flick-vs-place discrimination reliable. Rules that matter:
- window = 100ms; evict older samples — velocity is a property of the END of the gesture;
- stall detection — if the newest sample is older than ~40–100ms at pointerup, velocity is zero (the
  slow-place case: MARKS demands zero overshoot there);
- feed coalesced events, not just dispatched moves — dispatched cadence is rAF-quantized;
- compute in component-space px/s (MARKS targets: flick release ~1150–1300 px/s, fast collapse up to
  ~2600 px/s, hard-arrest 1145→325 px/s in one 83ms frame — a tracker sampling only dispatched events
  at 60Hz cannot see that arrest; coalesced can);
- derive acceleration as the windowed derivative of the LSQ velocity — needed for the
  momentum/velocity/acceleration facility the campaign wants on ALL components.

**PRM note.** The tracker itself is measurement, not motion — it stays on under
`prefers-reduced-motion`; only the spring/overshoot consumers gate.

## D. Scroll-driven animation + overscroll observability — Safari 2026 truths

**Scroll-driven animations (SDA).**
- **Safari 26.0** (Sept 2025): CSS SDA ships — `scroll()` and `view()` timelines, `animation-timeline`,
  `animation-range` ("WebKit Features in Safari 26.0"; the WebKit "Guide to Scroll-driven Animations
  with just CSS").
- **Safari 26.4** (Mar 2026): **threaded SDA** — scroll-driven animations run on the compositor
  thread ("WebKit Features for Safari 26.4"). This is the license to bind dock/card reveal ladders to
  scroll position without main-thread jank.
- **Safari 26.5** (Jun 2026): four reliability fixes — timeline ranges, `animation-play-state`
  pausing, view-timeline progress values, bfcache restoration ("WebKit Features for Safari 26.5").
- **JS `ScrollTimeline`/`ViewTimeline` constructors: not announced in any Safari 26.x or 27-beta
  post** — every WebKit communication frames SDA as CSS-authored. Treat the JS API as absent; the
  flackr/scroll-timeline polyfill is the JS route if ever needed. Probe live before relying either way
  (`typeof ScrollTimeline`).

**Overscroll observability.** Two engine-truths, both load-bearing for overpull:
1. SDA timeline progress is bounded 0–100% of the scroll range — rubber-band excursions are NOT
   representable in a scroll timeline. Overpull cannot be driven by SDA.
2. **Safari is the one engine where JS can observe rubber-banding**: during overscroll Safari updates
   `scrollTop`/`scrollY` beyond the max and below zero (MDN `Element.scrollTop`; "Six Things I Learned
   About iOS Safari's Rubber-Band Scrolling"), unless `overscroll-behavior: none` disables the bounce.
   Chrome/Firefox clamp. So on real scrollers, the overpull magnitude is directly readable in a scroll
   handler on Safari — a gift for scroll-surface overpull effects.
   For the dock itself the cleaner architecture remains gesture-owned overpull: `touch-action: none`
   surface, pointer tracker, our own resistive-damping map (MARKS hallmark 2) — engine-independent and
   shape-controllable (the asymmetric compression MARKS measures is not a scroll physics we can
   inherit anyway).
- `overscroll-behavior`: Safari 16+ — fence scroll chaining and pull-to-refresh around the dock.
- **`scrollend`**: **Safari 26.2** (Dec 2025) — baseline across engines (InfoQ, Apr 2026; caniuse).
  Use for settle/detent commitment on scroll surfaces instead of debounce timers.
- Scroll anchoring (`overflow-anchor`): Safari 27 beta (WWDC26, "News from WWDC26: WebKit in Safari 27
  beta") — irrelevant to physics but affects reveal-ladder layouts that insert content above the fold.

## E. Interruptible morphs — View Transitions vs FLIP vs live-morph

**View Transitions.** Same-document: Safari 18.0. Cross-document: Safari 18.2 (also Chrome 126).
`document.activeViewTransition`: Safari 26.2. The architecture is snapshot-based — the OLD state is a
static image (non-interactive), the NEW state's snapshot is live DOM; the `::view-transition-group`
animates position/size between snapshot layers (MDN "Using the View Transition API"; Chrome's
"Misconceptions about view transitions"). Consequences:
- fine for DISCRETE morphs fired on commit — the Safari-style lens handoff, a tab-content swap;
- wrong for finger-attached, scrubbed, live-content morphs — the old side freezes, mid-gesture catch
  is not expressible, and a slow update callback freezes the page on the old snapshot. The Find My
  goo-lens and the dock-to-card growth are live-morph problems, not VT problems.

**FLIP.** Paul Lewis's 2015 technique (First-Last-Invert-Play) — transform-only geometry animation.
Known failure: scale distorts border-radius, box-shadow, and children. The production cure is the
Motion/Framer "projection" system — per-frame projection of a target bounding box with distortion
correction for border-radius/box-shadow across arbitrarily deep trees, and `layoutId`-based shared-
element morphs (motion.dev "Layout Animation"; nan.fyi "Inside Framer's Magic Motion"). Cost model:
per-frame measure+apply on the main thread — acceptable for one dock, not for broadcast use.

**Live-morph, compositor-first (the glass-ui lane).** WebKit's reliably composited channels are
transform and opacity (filter partially; width/height/border-radius/clip-path/custom properties are
main-thread). The MARKS physics is friendlier to this than it looks:
- overpull compression deforms glass AND content as one body — that is literally `scale` with
  `transform-origin` at the anchored edge (bottom-center for the dock) — pure compositor;
- dock→card growth: bottom edge pinned, top travels — a bottom-anchored container animating
  `translateY`+`scaleY` on the glass layer with counter-scaled content, or real height for the commit
  animation with the FLIP correction only during the spring;
- width breathe (+4–5%) — `scaleX` at that magnitude keeps border-radius distortion under ~1px on
  dock radii; correct only if measurably visible;
- the CC blur cliff (≤100ms medium snap) means backdrop-filter blur radius never needs to be
  ANIMATED continuously — crossfade the medium's opacity (compositor) over a constant blur, which
  also sidesteps WebKit's non-composited filter-radius interpolation.

## F. Recommended facility shape (synthesis for all families)

1. **Three regimes per interactive surface** (MARKS §6): scrub (gesture-attached, per-frame direct
   writes from the pointer model — reveal ladder as a pure function of expansion fraction), spring
   (release → idiom-1 velocity-seeded `linear()` WAAPI animation), detent/pin (spring wells crossed at
   speed produce the ~170ms catch; a held bound adds the compression channel).
2. **One velocity facility** — coalesced-fed, 100ms-LSQ tracker exposing {v, a, momentum} in
   component space; every family consumes the same numbers.
3. **One spring compiler** — preset (ζ, f) or (visualDuration, bounce) + v₀ → closed form → `linear()`
   + duration; regeneration on interrupt; additive `accumulate` correction for rapid catches.
4. **Multi-clock choreography as separate animations** — blur medium (snap ≤100ms), opacity (~150ms),
   geometry (~600ms decelerating) as three WAAPI animations on distinct layers, never one timeline —
   the CC 1:4 fade:stretch desync (MARKS §5) falls out for free and each clock stays independently
   interruptible.
5. **PRM gate at the preset layer** — reduced motion collapses springs to short opacity fades; the
   velocity tracker and state model stay live.
6. **Safari floor is generous**: everything above needs at most Safari 26.2 except threaded SDA
   (26.4); the campaign's "Safari 2026 common denominator" is fully covered — no polyfills on the hot
   path, flackr/scroll-timeline only if a JS ScrollTimeline need materializes.

## Sources

- WebKit: "WebKit Features in Safari 26.0" (webkit.org/blog/17333); "A guide to Scroll-driven
  Animations with just CSS" (17101); "WebKit Features for Safari 26.2" (17640); "…for Safari 26.4"
  (17862); "…for Safari 26.5" (17938); "News from WWDC26: WebKit in Safari 27 beta" (17967); "WebKit
  Features in Safari 18.2" (16301); "Release Notes for Safari Technology Preview 202" (15798);
  webkit.org/demos/spring.
- CSSWG: issue #280 "[css-timing] spring() timing function"; issue #229 "[css-easing-2] Complex
  easing/timing functions"; drafts.csswg.org/css-easing.
- MDN: `Element.scrollTop` (overscroll values), `PointerEvent.getCoalescedEvents`, `ScrollTimeline`,
  `Animation.commitStyles`, `animation-composition`, "Using the View Transition API",
  `pointerrawupdate`.
- caniuse: linear() (Chrome 113 / Firefox 112 / Safari 17.2), animation-composition (Safari 16.0),
  scrollend (Safari 26.2; InfoQ "Safari Adds Scrollend Event Support", Apr 2026), pointerrawupdate
  (no Safari), getPredictedEvents.
- Motion: motion.dev/docs/spring; "Improvements to Web Animations API"; "Layout Animation — React
  FLIP & Shared Element"; nan.fyi/magic-motion.
- Josh Comeau, "Springs and Bounces in Native CSS"; bram.us, "How to use a Custom Easing Function
  with the Web Animations API" (2024-01-12); Jake Archibald, linear-easing-generator;
  okikio/spring-easing; ktsn/css-spring-animation; flackr/scroll-timeline.
- Android Developers, "Track touch and pointer movements" (VelocityTracker LSQ, 100ms/20-sample
  window); Flutter `gestures` VelocityTracker.
- "A Signals and Systems Approach to Animation" (arXiv 1703.00521) — interrupted-transition
  smoothness impossibility.
- Special Agent Squeaky, "Six Things I Learned About iOS Safari's Rubber-Band Scrolling".
- Apple WWDC23 session "Animate with springs" (duration+bounce parameterization); WWDC26 session 204
  "What's new in WebKit for Safari 27".

## Unknowns

Resolved this pass: spring() status (dormant, STP-only, no resolution); linear() as the carrier +
Safari 17.2; SDA Safari 26.0 / threaded 26.4 / fixes 26.5; scrollend Safari 26.2; overallProgress +
commitStyles hardening + fractional pointer coords Safari 26.2; coalesced/predicted events Safari
18.2; pointerrawupdate absent from Safari; animation-composition Safari 16.0; view transitions 18.0 /
18.2 cross-doc + snapshot architecture; Safari's out-of-range scrollTop during rubber-band; the
VelocityTracker LSQ idiom; Motion's velocity-seeded linear() compile.

Remaining (need live probes, not more reading):
1. JS `ScrollTimeline`/`ViewTimeline` constructor presence in Safari 26.x — one-line feature probe.
2. Which SDA-driven properties actually stay on Safari's compositor thread post-26.4 (transform-only,
   or opacity/filter too) — paint-arm probe.
3. WAAPI `composite:"add"` / `accumulate` — whether WebKit keeps the composed result accelerated or
   drops to main thread — trace probe.
4. `getPredictedEvents()` quality for finger touch (vs Pencil) on iOS 26 — empirical.
5. Root-scroller rubber-band observability on iOS 26 specifically (element scrollers confirmed;
   `window.scrollY` under the visual viewport needs a device check).
