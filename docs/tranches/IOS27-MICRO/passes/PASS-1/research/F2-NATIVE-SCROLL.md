# F2 NATIVE-SCROLL SUBSTRATE — pass-1 research digest

Verified model: `claude-fable-5` (system context: "The exact model ID is claude-fable-5"). Seat: F2.
Date: 2026-07-17. Inputs: `../analysis/MARKS.md` (read whole), REGISTRY.md §F2 + cross-family
invariants only (early-round independence held), the named codebase kin (read in source), web research
(cited inline + Sources).

Headline: the family's load-bearing unknown is RESOLVED — Safari reports unclamped `scrollTop` during
rubber-band, so the overpull is natively observable on the target engine; and Safari 26.0/26.4 shipped
scroll-driven animations, threaded. The held-pin-past-detent reformulates cleanly as overscroll at a
bound (native on Safari). The two honest losses: the ~170ms transient mid-detent catch is inexpressible
natively, and Chrome elements never rubber-band — Chrome needs a driven overpull mirror.

---

## 1. Platform truth, Safari 2026 (version-cited)

| fact | status | source |
|---|---|---|
| `animation-timeline: scroll()/view()` + `animation-range` | Safari 26.0 (Sept 2025) | [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) |
| Threaded scroll-driven animations — scroll()/view() run on the compositor thread, no code change | Safari 26.4 | [WebKit Features for Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/) |
| SDA progress-accuracy + `animation-play-state` bug batch fixed | Safari 26.5 (June 2026) | [WebKit Features for Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/) |
| `scroll(self)`, `nearest`, `root` scroller keywords; `block/inline/x/y` axes | Safari 26 | [WebKit SDA guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) |
| `timeline-scope` (named cross-element timelines) | Safari 26.0; Chrome 116+; Firefox 155+ | [caniuse timeline-scope](https://caniuse.com/mdn-css_properties_timeline-scope) |
| `scrollend` event | Safari 26.2 (Dec 2025) — Baseline complete (Chrome 114, Firefox 109) | [InfoQ](https://www.infoq.com/news/2026/04/safari-scrollend-support/), [caniuse](https://caniuse.com/mdn-api_element_scrollend_event) |
| Unclamped `scrollTop` during overscroll — "Safari responds to overscrolling by updating `scrollTop` beyond the maximum scroll position (unless … `overscroll-behavior` … `none`) … may be negative on Safari just by continuing to scroll up"; Chrome and Firefox do NOT | Safari, both directions, read-only (cannot be SET out of range) | [MDN Element.scrollTop](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop) |
| `scrollsnapchange`/`scrollsnapchanging` events | Chrome 129+ only; Safari NOT supported through 26.5/27, TP unknown | [caniuse](https://caniuse.com/mdn-api_element_scrollsnapchanging_event), [Chrome blog](https://developer.chrome.com/blog/scroll-snap-events) |
| `scroll-state()` container queries (`stuck`/`snapped`) | Chrome 133+ only; Safari in progress, not shipped as of mid-2026 | [caniuse](https://caniuse.com/mdn-css_at-rules_container_scroll-state_queries_stuck), [MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries) |
| Element-scroller rubber-band on desktop: Safari macOS has it; Chrome only on body/root; Firefox none | structural | [elastic-scroll-polyfill README](https://github.com/atomiks/elastic-scroll-polyfill) |
| Snap strictness (`proximity`/`mandatory`) is a CONTAINER property; per-target only `scroll-snap-align` + `scroll-snap-stop` — no per-point strictness exists | spec | [MDN scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type), [MDN scroll-snap-stop](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop) |
| Smooth-scroll / snap-settle timing and easing are UA-defined — not author-tunable | spec | [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) |

Consequences for the family, stated plainly:

- The reveal ladder as `animation-range` bands on a `scroll(self)` (or named + `timeline-scope`)
  timeline is fully in-budget on Safari 2026, and since 26.4 it is off-main-thread — the compositor-first
  bound is met by the platform itself.
- Settle detection (`scrollend`) is Baseline — the JS squish bridge gets an honest park signal on every
  target engine; no debounced no-tick heuristic needed on the native path (`useScrollChrome`'s
  debounce idiom remains the fallback shape).
- Snap-position OBSERVATION events and `scroll-state(snapped)` are Chrome-only — detent-state readout on
  Safari is derived from `scrollend` + offset arithmetic, not platform events.

## 2. The load-bearing unknown: overscroll observability — RESOLVED

The honest observation channel exists and is exactly one read: on Safari, `element.scrollTop` reports
the rubber-banded position — negative past the top bound, beyond `scrollHeight − clientHeight` past the
bottom — during the whole overscroll, and `scroll` events fire throughout ([MDN Element.scrollTop](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)).
So the overpull magnitude is `max(0, −scrollTop)` / `max(0, scrollTop − extent)` read inside the
existing rAF-coalesced `createScrollReader` tick — no new listener, no polling, zero idle cost (the
reader already sleeps between bursts; `scrollend` parks the bridge).

Split by engine:

- Safari (touch AND macOS trackpad): native rubber-band on element scrollers + unclamped offsets. The
  UA supplies the resistive damping (MARKS §2: finger travels far, displacement ~60–70px), the hold
  under a stationary finger, and the release spring. The JS bridge only mirrors the magnitude into a
  CSS var for the compression body (§4 below).
- Chrome (all platforms): element scrollers neither rubber-band nor report out-of-range offsets — there
  is no native overpull to observe. The family's Chrome path is a driven mirror: pointer deltas past the
  bounds (the `useDragVelocity` drag-window-gated pattern) write the same var; release runs
  `SpringProgress` seeded with release velocity on `springPreset("dock")`. One var contract, two
  writers, engine-gated — the single-writer rule holds per engine.

Design-neutral corollary (static reasoning, no browser needed): even if Safari's rubber-banded offset
advanced a `scroll()` timeline past its range (unverified, see unknowns), keyframe output clamps at the
range boundaries — a CSS timeline can never EXPRESS the overpull magnitude beyond the bound. The squish
channel is therefore a JS-var bridge by construction, not by fallback. The CSS timeline owns 0..1; the
var owns the forbidden region.

## 3. Held-pin-past-detent — RESOLVED by reformulation

REGISTRY posed this as "native snap cannot pin PAST a detent under a held finger." Correct — but the
corpus moment (MARKS §1: pinned at 1442, 130px past the 1573 detent, held 250ms, 130px snapback on
release) is not a snap phenomenon. It is overscroll at a container bound:

- Lay out the scroller so the FULL detent is the maximal scroll offset (the last snap point sits at the
  end of the scroll range).
- Dragging past it is then Safari's own rubber-band: resistively damped displacement (the magnetic-
  ceiling feel), position held while the finger holds, spring return on release. The hard arrest in ~2
  frames (1145→325 px/s) is the entry into the damped region. All native on Safari; observable via the
  unclamped read; the −1% width compression rides the same var as §2.
- The down-side overpull (MARKS §2, −7.5%/−21% compression) is the same mechanism at the minimal bound.

What the platform does NOT give: the springback constants. The UA return curve is fixed (and the snap
settle is UA-timed — [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)).
The family's honest position: on Safari the return IS platform physics — kin of the very UIKit spring
the corpus filmed — and deviation from ζ≈0.5–0.65 is accepted as in-character; it cannot be tuned and
must not be fought with a competing JS writer. On Chrome the mirror spring is ours and is set exactly:
`springPreset("dock")` {0.68, 0.64} — the stated relation to `springPresets.ts` is CONSUMER (Chrome
mirror only); on Safari the kernel is neither generalization nor consumer — the UA owns the spring, and
the spec must say so to keep the no-second-authority fence.

## 4. Container anatomy — what exists in prior art, what the family adds

Strong prior art exists: viliket's pure-web-bottom-sheet ([repo](https://github.com/viliket/pure-web-bottom-sheet),
[write-up](https://viliket.github.io/posts/native-like-bottom-sheets-on-the-web/)) is a shipping
scroll-snap-substrate sheet — `overflow-y: scroll` + `scroll-snap-type: y mandatory` host, invisible
1px snap-point elements positioned by `--snap` vars, a track-extending spacer, `scroll-timeline:
--sheet-timeline y` on the host driving backdrop fade via `animation-range`, snap-change detection via
`scrollsnapchange` with an IntersectionObserver fallback, and a documented WebKit `pointer-events`
propagation bug + workaround. It validates the family mechanically and marks the gap: it has no
overpull channel, no compression body, no reveal ladder, no velocity bridge — the physics the corpus
demands is exactly what F2 adds on top of this skeleton.

The F2 anatomy (findings, not yet spec):

- ONE scroller per expandable surface — an overlay scroll container whose scroll range IS the
  expansion range; the card surface sits in the scroll flow (its top edge travels by scrolling, not by
  transform — no animated width/height on the hot path). Bottom edge pinned by layout (the MARKS §1
  asymmetry is free: the card enters from the bottom of the scrollport).
- Detents = snap points: rest, mid (Maps' 1976–2017 catch height), full. Container strictness
  `mandatory` on the block axis; `scroll-snap-stop: normal` everywhere so flings pass detents (MARKS §6:
  passing detents produces a catch, not a stop — see the loss in §6 below).
- The reveal ladder = `animation-range` bands on the shared timeline, per element, height-keyed exactly
  as MARKS §6 note 4 prescribes (handle 0–5%, title ghost 10–30%, rows 40%+10%·N). Scrub regime is
  automatic — the timeline IS position. Since 26.4 these bands run threaded.
- Sides-breathe (+4–5%) and icon under-margin emergence are timeline bands too: `scaleX` on the surface
  (transform, compositor) and `translateY` out of a clipped tray.
- The squish/overpull channel: one CSS var (working name `--gl-overpull`, signed, px-normalized) written
  by the coalesced reader on Safari (§2) and the pointer mirror on Chrome; the compression body reads it
  as `scale`/`translate` on container AND content together (MARKS §2 note 1: glass and content deform as
  one body — one var inherited by both tiers satisfies this).
- Velocity facility: `useScrollTrigger` already emits framerate-independent px/s velocity off the ONE
  reader core; the family generalizes the `useDragVelocity` var contract (`tanh`-saturated, clamped,
  event-window-gated, PRM-pinned-0) to a scroll-sourced `--scroll-v` — same shape, second source, still
  no second velocity engine. `scrollend` closes the window.
- Pinned chrome (tab bar never travels): `position: sticky` within the scroller; content slides under.
  `scroll-state(stuck)` is NOT available on Safari — stuck-state styling, if needed, derives from the
  same timeline, not from the container query.

Existing library stack, measured against this:

| kin | state | fit |
|---|---|---|
| `supportsCssTimeline.ts` | shipped, hardened negative-probe detection | the gate, unchanged; F2 extends the same pattern if it needs a `scroll(self)` probe |
| `scrollReader.ts` | ONE rAF-coalesced listener core, vue-free | the overpull read rides this tick — no fourth listener |
| `useScrollProgress.ts` / `scroll-driven.css` | dual-path single-writer, native CSS primary | the exact discipline F2 scales up to a full choreography |
| `useScrollScene.ts` + `useScrollPin.ts` | JS spring spine (keyframes.js SmoothProgress/SpringProgress), auto-parking | the Chrome-mirror driver + the no-native fallback writer |
| `useScrollTrigger.ts` / `useScrollChrome.ts` | velocity/direction reader + collapse state machine, scroll-STOP snap debounce | velocity source; the debounce idiom is superseded by `scrollend` on 2026 engines |
| `useDragVelocity.ts` | drag-window-gated `--atom-drag-v`, tanh-saturated, PRM-safe, zero idle rAF | the var-contract template for `--gl-overpull` + `--scroll-v` |
| drawer (`useDrawerSnap` + styles.css) | house JS snap engine, `--glass-drawer-t` scalar, vaul abrogated | the incumbent counter-architecture: F2 is its inversion (platform owns physics); the spec must state which surfaces migrate and which keep the JS engine |
| `scroll-tokens.css` | token register incl. `--spring-dock`/`--dock-resize-spring` | detent geometry + range bands become tokens here |
| dock `overflow.css`, toggle-group | `overscroll-behavior` containment already in use | precedent for the overscroll story's containment edges |

## 5. Multi-clock choreography on one timeline

MARKS §5's three clocks (medium ≤100ms cliff, fade ≈¼ of stretch, stretch ~600ms decelerating) look
time-based but the CC gesture is a scrub — and the corpus itself proves position-mapping (the Find My
card: reveal state a pure function of height). On the native substrate all three clocks are RANGE
ratios on the one scroll timeline: medium = a 0–8% band (the cliff), fade = bands ~¼ the length of
their stretch bands, stretch = the full range with `linear()` deceleration shaped in the keyframes,
depth-graded travel = per-row `translateY` multipliers (~1.2× per depth step), periphery lag = range
offset. Desync without a single JS clock; interrupt-catch (everything is a scrub) is free because
position is the only state. The RELEASE leg (fling) inherits the UA's momentum — the two-regime
invariant (scrub under gesture, physics after) is the scroller's own duality. This is the family's
cleanest structural claim and should lead the spec.

## 6. The honest losses (priced)

1. The ~170ms transient mid-detent catch (MARKS §6 note 2) is inexpressible natively. No per-point
   strictness exists; `scroll-snap-stop: always` inverts the feel (full stop at speed — the opposite of
   a well crossed at speed); native `normal` + `mandatory` means slow passes SETTLE on the mid detent
   (correct) but fast passes skip it with no catch (the loss). Options, in family character:
   (a) accept — the mid detent still exists for slow gestures; (b) a visual-only well: a narrow
   timeline band around the detent that dips a deceleration CUE (scale/glow) without touching physics;
   (c) a JS nudge fighting UA momentum — rejected: programmatic scroll during WebKit momentum is
   historically unreliable (unknown U-R3) and a competing writer breaks the single-authority fence.
2. Chrome element scrollers have no rubber-band, period — the overpull is Safari-native, Chrome-mirrored.
   The two paths must land on one var contract with per-engine writers, and paint evidence must be
   captured on BOTH engines (the live-π law).
3. Springback constants at bounds are UA-fixed on the Safari path (§3).
4. Wheel/trackpad divergence (charter question 3), structural findings: macOS Safari trackpad
   rubber-bands element scrollers and holds displacement while fingers rest — near-touch semantics;
   discrete wheels produce stepped deltas, no rubber-band, snap settles post-`scrollend` on the UA
   clock — the scrub regime goes chunky and the overpull channel is simply absent (var stays 0; the
   design degrades to detents + reveal ladder, which is honest). Feel-grade divergence needs the pass-2
   live probe (this seat owns no browser).

## 7. Unknowns table

| id | unknown (from charter) | verdict | evidence |
|---|---|---|---|
| U1 | Safari 2026 scroll-driven-animation coverage | RESOLVED — Safari 26.0 ships scroll()/view()/animation-range; 26.4 threads them on the compositor; 26.5 fixes progress-accuracy; timeline-scope 26.0 | WebKit 17333/17862/17938; caniuse timeline-scope |
| U2 | Overscroll observability (load-bearing) | RESOLVED — Safari reports unclamped scrollTop during rubber-band, both bounds, scroll events fire; Chrome/Firefox never do → Safari-native read + Chrome pointer mirror | MDN Element.scrollTop, quoted §1 |
| U3 | Held-pin-past-detent expressibility | RESOLVED by reformulation — it is overscroll at a bound, native on Safari touch/trackpad; detent-at-max-scroll layout; Chrome via driven mirror | §3; MDN scrollTop; MARKS §1 |
| U4 | ~170ms transient mid-detent catch | RESOLVED-NEGATIVE — no per-point snap strictness in the platform; priced options (a)/(b), JS nudge rejected | MDN scroll-snap-type/-stop; §6.1 |
| U5 | Snap/springback timing tunability | RESOLVED-NEGATIVE — UA-defined; Safari path accepts platform physics (in-character), Chrome mirror uses springPreset("dock") | MDN scroll-behavior; §3 |
| U6 | Trackpad/wheel vs touch divergence, macOS | PARTIAL — structural facts resolved (Safari trackpad rubber-bands elements, Chrome body-only, wheel has no overpull); feel grading needs a live probe | elastic-scroll-polyfill README; §6.4 |
| U-R1 | SDA compositing WITH backdrop-filter on the animated surface (does threading hold; does the backdrop resample correctly) | REMAINING — needs a live paint probe on Safari 26.4+; 17862 states no limitations but names none of this | pass-2 probe: glass card + scroll()-driven transform, screenshot + paired-π |
| U-R2 | Does Safari's rubber-banded offset advance a scroll() timeline past 0/1 | REMAINING but design-neutral — keyframe output clamps at range bounds regardless; squish stays a JS var either way | static reasoning §2 |
| U-R3 | Programmatic scrollTo during WebKit momentum (only if the U4 nudge is ever revisited) | REMAINING — deliberately unpursued | §6.1 |
| U-R4 | `scrollend` firing semantics during rubber-band settle on Safari 26.2+ (fires at gesture end or spring rest?) | REMAINING — decides the exact park point of the overpull bridge; one-line live probe | pass-2 |

## 8. The shape the F2 spec should take

1. **The claim, one paragraph** — the scroller is the physics engine; state the two-regime duality
   (scrub = timeline position, release = UA momentum) as the structural argument, per §5.
2. **The container anatomy contract** — scroller/spacer/snap-point/sticky-chrome/clipped-tray DOM, with
   the detent-at-max-scroll layout rule (§3) and the one-scroller content-handoff (sheet growth and
   inner list share the scroll flow). Diagram plus a table naming which element owns which channel.
3. **The var contracts** — `--gl-overpull` (signed, both bounds, per-engine writers, single-writer per
   engine, PRM pinned 0, parked by `scrollend`) and `--scroll-v` (the `useDragVelocity` shape,
   scroll-sourced) — exact names, ranges, writers, readers, teardown proofs (the no-idle-rAF unit).
4. **The range-band choreography tables** — per hallmark, the MARKS numbers transcribed to range
   percentages: reveal ladder (§1), CC three-clock ratios (§5), breathe/squish bands. Tokens in
   `scroll-tokens.css`, keyframes in a new `scroll-substrate` recipe under the scroll-driven.css
   dual-path discipline.
5. **The engine matrix** — Safari-native vs Chrome-mirror vs no-timeline fallback (the
   `supportsCssTimeline` gate extended), with the degrade floor stated per row and no masking fallback:
   where the mirror is absent the overpull is absent, visibly.
6. **The spring-authority statement** — UA owns Safari-bound springs; `springPreset("dock")` owns the
   Chrome mirror; keyframes.js `SpringProgress` is consumed, never duplicated (§3).
7. **The losses ledger** — §6 items carried verbatim with their prices; no silent scope-narrowing.
8. **The probe list** — U-R1/U-R2/U-R4 as pass-2 live probes with capture requirements (screenshot +
   paired-π, both engines), per the evidence discipline.
9. **PRM** — the scroll-driven.css outer-gate pattern: under reduce, no timeline binds, content renders
   terminal, detents remain functional, vars pinned 0.
10. **Migration boundary** — which surfaces adopt the substrate (dock-to-card, CC-like overlays) and
    which keep the house JS snap engine (drawer), with the consumer-updates ruling honored.

## Sources

- https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- https://webkit.org/blog/17862/webkit-features-for-safari-26-4/
- https://webkit.org/blog/17938/webkit-features-for-safari-26-5/
- https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
- https://caniuse.com/mdn-css_properties_timeline-scope
- https://caniuse.com/mdn-api_element_scrollend_event
- https://www.infoq.com/news/2026/04/safari-scrollend-support/
- https://caniuse.com/mdn-api_element_scrollsnapchanging_event
- https://developer.chrome.com/blog/scroll-snap-events
- https://caniuse.com/mdn-css_at-rules_container_scroll-state_queries_stuck
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries
- https://github.com/atomiks/elastic-scroll-polyfill
- https://github.com/viliket/pure-web-bottom-sheet
- https://viliket.github.io/posts/native-like-bottom-sheets-on-the-web/
- https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
- https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
- https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
