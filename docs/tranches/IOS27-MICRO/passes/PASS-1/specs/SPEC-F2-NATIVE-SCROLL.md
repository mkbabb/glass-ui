# SPEC-F2-NATIVE-SCROLL — the scroller as physics engine

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE, BOUNDED — the family's load-bearing unknown (overscroll observability) resolved FOR
it, but two cross-family acceptance invariants are natively inexpressible and Chrome re-admits JS
physics; the honest position is a substrate for scroll-shaped surfaces, not the whole-problem
architecture. Inputs: REGISTRY §F2, MARKS (whole), F2 digest, X1/X2/X3 digests.
Tooling: DesignSync reachable this pass (live `list_projects` call; empty project list — noted for
pass-2 component seats).

---

## 1. Architecture

The platform's scroller is the physics engine. The expandable surface is an overflow container
whose scroll range IS the expansion range: detents are snap stops, the scrub regime is scroll
position, the reveal ladder is `animation-range` bands on a shared timeline (threaded on Safari's
compositor since 26.4), release momentum is the native fling, and overpull is Safari's own
rubber-band at the container bounds — observable, because Safari reports unclamped `scrollTop`
during overscroll (negative past the top, beyond extent past the bottom, `scroll` events firing
throughout). Zero idle rAF by construction.

**Container anatomy.**
- One scroller per expandable surface; the card sits in the scroll flow — its top edge travels by
  scrolling, not by transform; the bottom edge is pinned by layout (the card enters from the bottom
  of the scrollport — MARKS §1 asymmetry free).
- Detents = snap points at rest / mid (the Maps 1976–2017 catch height) / full; container
  `scroll-snap-type: y mandatory`, `scroll-snap-stop: normal` so flings pass detents; the FULL
  detent sits at the maximal scroll offset so pin-past-detent is literally overscroll at a bound.
- Pinned chrome (the tab bar never travels) is `position: sticky` in the scroller; content slides
  under it. `scroll-state()` queries are Chrome-only — stuck styling derives from the timeline.
- The viliket pure-web-bottom-sheet skeleton (snap-point elements positioned by vars, track spacer,
  `scroll-timeline` on the host) is the validated mechanical base; F2 adds the physics it lacks:
  overpull channel, compression body, reveal ladder, velocity bridge.

**The var contracts.**
- `--gl-overpull` (signed, px-normalized): Safari writer = the unclamped read
  (`max(0, −scrollTop)` / `max(0, scrollTop − extent)`) inside the existing `createScrollReader`
  rAF-coalesced tick — no new listener; Chrome writer = a driven pointer mirror (the
  `useDragVelocity` drag-window-gated pattern), release via `SpringProgress` on
  `springPreset("dock")`. One contract, two writers, engine-gated — single-writer per engine.
  Parked by `scrollend` (Baseline; Safari 26.2). PRM pins 0.
- `--scroll-v`: the `useDragVelocity` var shape (tanh-saturated, event-window-gated, PRM-pinned),
  scroll-sourced off the ONE reader core.
A CSS timeline can never express the overpull magnitude — keyframe output clamps at range bounds —
so the squish channel is a JS-var bridge by construction, not by fallback.

**Spring authority.** On Safari the UA owns every bound spring and snap settle — kin of the UIKit
spring the corpus filmed, accepted as in-character, never fought with a competing writer. On Chrome
the mirror spring is ours: `springPreset("dock")`. Relation to `springPresets.ts`: CONSUMER
(Chrome mirror only); on Safari neither generalization nor consumer — the spec says so to keep the
no-second-authority fence.

## 2. Mechanism per hallmark

**H1 growth ladder.** The card top travels by scroll; the reveal ladder is `animation-range` bands
on the surface's `scroll(self)` timeline, transcribed straight from MARKS §6 note 4 (handle 0–5%,
title ghost 10–30%, row N at 40%+10%·N), per-element fade + 30–60px rise, height-keyed by
construction — scrub-correct and threaded off-main since 26.4. Sides breathe as a `scaleX` band;
icons emerge from a clipped tray via a `translateY` band. The pre-commit taffy zone is a range
lead-in: the first ~40px of range drive a stretch band while the travel band starts at 40px.

**H2 overpull compression + springback.** Down-pull and pin-past-detent are both overscroll at a
bound: the UA supplies resistive damping, the hold under a stationary finger, and the release
spring; `--gl-overpull` mirrors the magnitude into the compression body — one container-level
`scale` (width −7.5%, height −21% down; ~−1% up), bottom-anchored, content deforming with the
container because the scale sits on the container tree. LOSS, stated: the springback constants are
UA-fixed on the Safari path — the measured ζ≈0.5–0.65 band cannot be tuned toward; deviation is
accepted as platform character. Chrome's mirror spring is exact but is our JS physics.

**H3 lens.** The family's native fit is the Safari pill: the tab strip is a snap carousel
(`scroll-snap-align: center`), the lens is pinned chrome, the world scrolls beneath it —
self-centering for free, the one Safari behavior MARKS says to keep. Tab TAP drives a programmatic
smooth scroll whose progress feeds the light bands via the timeline. LOSS, stated: smooth-scroll
timing is UA-defined, so the Find My arrival choreography (oversized ~110–120% landing held ~200ms,
1.2–1.4s press→settle) cannot ride the native clock — the lens light body needs a driven clock
(F5's `useLeadTrail` consumption) on top of the carousel substrate. F2 supplies the carousel and the
scrub; it does not supply Find-My-grade arrival physics.

**H4 material tiers.** Unchanged from the shipped ladder (container = resting/floating rungs,
control = quiet + own rim); the medium is opacity-over-constant-radius driven by a timeline band
(never an animated blur radius). The two-tier budget is token territory; F2 contributes only the
clocks-as-ranges.

**H5 multi-clock choreography.** The cleanest structural claim: all three clocks are RANGE RATIOS
on one scroll timeline — medium = a 0–8% cliff band, fade bands ≈¼ the length of their stretch
bands, stretch = the full range with `linear()` deceleration in the keyframes, depth-graded travel =
per-row multipliers (~1.2× per depth step), periphery = range offset. Desync without a JS clock;
interrupt-catch is free because position is the only state; the release leg inherits UA momentum —
the two-regime invariant is the scroller's own duality. The close-order inversion and the
empty-medium beat are direction-scoped band sets (close bands ≠ reversed open bands), authored as a
second `animation-range` set selected by scroll direction state.

**H6 momentum facility.** Scroll velocity in px/s off the one reader core (`useScrollTrigger`
already emits it), published as `--scroll-v`; `scrollend` is the honest park signal on every 2026
engine. BOUNDARY, stated: the family's substrate covers scroll-shaped surfaces only — pointer-drag
surfaces that are not scrollers (the dock's own gesture face, sliders) still need the pointer-side
facility, so F2 alone cannot be the ALL-components answer; it is the scroll arm of whichever
facility wins.

## 3. MARKS acceptance targets — hit/degrade/miss, priced

| target | verdict | mechanism / price |
|---|---|---|
| bottom pinned, top travels, sides breathe (§1) | HIT | scroll-flow layout + scaleX band |
| reveal ladder height-keyed (§1/§6) | HIT | animation-range bands, threaded 26.4 |
| pin-past-detent + hold + snapback (§1) | HIT on Safari | overscroll at max-scroll bound; Chrome via mirror |
| overpull compression, one body (§2) | HIT | `--gl-overpull` → container scale |
| springback ζ/f/overshoot exact (§2) | DEGRADE on Safari | UA-fixed return curve; exact only on the Chrome mirror |
| ~40px taffy zone (§2) | HIT | range lead-in band |
| lens continuous body + arrival physics (§3) | MISS natively | carousel + centering HIT; arrival needs a driven light clock (F5 seam) |
| three clocks + inversion + beat (§5) | HIT | range ratios + direction-scoped band sets |
| medium persists across interrupts (§5) | HIT | position is the only state; medium band never resets |
| velocity inheritance on release (§6) | HIT on Safari | native fling; Chrome mirror seeded |
| transient mid-detent catch ~170ms (§6) | MISS natively | no per-point snap strictness exists; priced options: (a) accept — slow gestures still settle on mid; (b) visual-only well cue band; JS nudge rejected (competing writer) |
| everything a scrub (Beyond) | HIT | scroll position is the state |

Two cross-family invariants land MISS/DEGRADE by construction. The family does not contest this;
it prices it.

## 4. Safari-2026 feasibility

The strongest platform hand of any family: SDA shipped 26.0, threaded 26.4, reliability fixes 26.5;
`scrollend` 26.2 (Baseline); unclamped `scrollTop` is Safari-only and is exactly the observability
the overpull needs; `timeline-scope` 26.0. Chrome runs the same bands but has no element
rubber-band — the mirror is mandatory there, and paint evidence must be captured on BOTH engines.
Open platform risks: U-R1 (does SDA threading hold with `backdrop-filter` on the animated surface),
U-R2 (does a rubber-banded offset advance a `scroll()` timeline past its range — design-neutral
either way, the var owns the forbidden region), U-R4 (`scrollend` timing during rubber-band settle —
decides the bridge's exact park point). JS `ScrollTimeline` constructors: treat as absent in Safari
(X1) — everything here is CSS-authored.

## 5. The prototype that proves the riskiest claim

**Riskiest claim: a real Safari 26.4+ scroller carrying a glass (backdrop-filter) card stays
threaded and paints the full ladder + overpull loop correctly — including the unclamped read during
a held pin.** Build the bottom-sheet demo on the viliket skeleton: three snap detents, the full
reveal ladder as range bands, `--gl-overpull` wired to the compression body, Chrome mirror behind
the engine gate. Drive: slow scrub, fling past the mid detent, deep down-pull held 250ms, release.
Capture per the live-π law on both engines: ladder band onsets vs MARKS §6, compression magnitudes
at held pin, springback traces (accepting the UA curve on Safari, dock preset on Chrome), plus the
U-R1 thread trace and the U-R4 `scrollend` timing read.

## 6. Open gaps

| # | gap | next move |
|---|---|---|
| U-R1 | SDA threading with backdrop-filter on the animated surface | §5 prototype trace |
| U-R2 | rubber-banded offset vs timeline range (design-neutral) | one-line probe on the same page |
| U-R4 | `scrollend` semantics during rubber-band settle | same page |
| U6 | trackpad/wheel feel divergence on macOS (wheel: no overpull, var stays 0 — honest degrade) | live feel probe, pass 2 |
| — | adoption boundary: which surfaces are genuinely scroll-shaped (sheet/card growth, pill carousel, list ladders) vs gesture-shaped (dock overpull face, tab lens travel) — the migration table vs the drawer's house JS engine per the consumer-updates ruling | round-2 ruling |
| — | the two priced MISSes (mid-detent catch at speed, Safari springback exactness) — accepted, cued, or ceded to a JS-physics family on those surfaces | round-2 ruling against F1/F3 |

Round-2 position, stated for the record: F2's range-ratio choreography and its Safari-native
overpull are real wins on scroll-shaped surfaces, and its Chrome path already IS a small F1. The
cheapest coherent system uses F2 as the substrate where the platform gives physics away and the
JS-spine kernel everywhere else — one var contract either way.
