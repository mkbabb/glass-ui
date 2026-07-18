# CRIT-F2 — adversarial critique, family F2 NATIVE-SCROLL, pass 1

verified-model: claude-fable-5 (system-context model ID, verbatim). Adversarial critic seat,
2026-07-18. Inputs read whole: SPEC-F2-NATIVE-SCROLL.md, F2-NATIVE-SCROLL.md (research digest),
MARKS.md, REGISTRY.md, CHARTER.md, `prototypes/f2-native-scroll/` (empty), F1 PROBE-NOTES (the
pass-1 evidence standard), and the named kin verified in source (`springPresets.ts`,
`scrollReader.ts`, `useScrollTrigger.ts`, `useDragVelocity.ts`, `scroll-tokens.css`,
`drawer/composables/`, `drawer/styles.css`).

Posture: the family's current state is presumed wrong until evidenced. What follows is what
survived and what did not.

## What survived

- The research digest is genuinely strong: version-cited Safari facts (26.0/26.2/26.4/26.5),
  the unclamped-`scrollTop` MDN find, the viliket prior-art read, the honest-losses ledger.
- The kin table is honest — every named file exists and does what the digest says
  (`createScrollReader` at scrollReader.ts:80, `useScrollTrigger` px/s velocity, the
  `useDragVelocity` tanh/PRM contract, `--glass-drawer-t`) — with one exception (gap 7).
- The two-regime duality claim (scrub = timeline position, release = UA momentum) is the
  family's real structural insight and is correctly led with.
- The losses are priced, not hidden: mid-detent catch MISS, Safari springback DEGRADE, Chrome
  no-rubber-band, wheel no-overpull. No masked fallback found in the text.
- The status line itself ("substrate for scroll-shaped surfaces, not the whole-problem
  architecture") is honest scoping, not vacuous convergence.

## Open gaps — enumerated

### G1. The prototype does not exist

`prototypes/f2-native-scroll/` is an empty directory — no `index.html`, no PROBE-NOTES, no
captures, and not marked spec-only either. The charter is explicit: "a prototype either runs or
is marked spec-only." Every sibling family carries a prototype with PROBE-NOTES; F1's carries a
browser-seat VERIFIED section with live measurements. SPEC §5 describes the prototype that
proves the riskiest claim in the present tense; nothing proves anything today. Every HIT in the
§3 table is a gate that cannot fail because nothing runs.
**Closes with:** the §5 bottom-sheet prototype built and driven, PROBE-NOTES + a browser-seat
VERIFIED section, captured per the live-π law on BOTH engines — and for this family Chrome-only
verification is insufficient by construction: the architecture is Safari-native; a Safari 26.4+
paint pass (macOS at minimum, iOS Simulator for touch) is the load-bearing arm.

### G2. The load-bearing unknown is resolved by citation, not by paint

U2's "RESOLVED" rests on one MDN paragraph about unclamped `scrollTop`. Unprobed: (a) whether
the unclamped read holds for ELEMENT scrollers under iOS touch (the corpus platform) and not
just macOS trackpad; (b) whether it reports during a HELD stationary finger past the bound (the
250ms pin — the exact corpus moment) rather than only during moving overscroll; (c) the digest's
"scroll events fire throughout" half-claim, which the quoted MDN text does not state and which
carries no citation of its own — and the whole `--gl-overpull` writer ticks off scroll events.
The spec's status line says the unknown is "resolved FOR it"; on the evidence in the tranche it
is resolved on paper.
**Closes with:** the G1 prototype's unclamped-read trace — value log during drag-past-bound,
held pin, and release spring, on Safari touch and trackpad, with the event stream recorded.

### G3. The Chrome mirror's input stream is unspecified — the elegant-reduction trap

The Chrome path is "a driven pointer mirror (the `useDragVelocity` drag-window-gated pattern)."
The hard part is skipped: on Chrome touch, once the native scroller takes the gesture, the
element receives `pointercancel` and the pointer stream STOPS — there is no pointermove to
mirror overpull from at the very moment the bound is reached. The spec depends on native scroll
for H1/H5 (the timeline) and on live pointer deltas for H2 (the mirror) on the same surface in
the same gesture, and never mentions `touch-action`, `overscroll-behavior`, `pointercancel`, or
any gesture-ownership contract that lets both exist. As written, the "one contract, two
writers" claim has no working second writer on Chrome touch.
**Closes with:** a specified Chrome gesture-ownership mechanism (bound-proximity touch-action
switching, a scroll-position-derived overpull surrogate, or an owned-gesture zone) proven in the
prototype under Chrome touch emulation.

### G4. Inner-content scrolling contradicts detent-at-max-offset

§1 makes pin-past-detent literal overscroll by placing the FULL detent at the maximal scroll
offset. §1 also puts pinned chrome sticky in the scroller with "content slides under it," and
the corpus surfaces carry scrollable lists (Maps Recents, Find My devices). If list content
shares the scroll flow, the maximal offset exceeds the FULL detent and pin-past-detent becomes
ordinary scrolling — the reformulation that resolved U3 collapses. If content is capped to the
card, any list taller than the card is unreachable. The remaining option — a nested inner
scroller — is the classic web-bottom-sheet hard problem (gesture handoff at the inner top edge,
scroll chaining) and appears nowhere in the spec. This is a load-bearing "and then the hard
part."
**Closes with:** an explicit anatomy ruling — single flow with a content cap, or nested
scroller plus a specified handoff contract — with the U3 reformulation re-derived under it and
exercised in the prototype (expand to full, scroll the inner list, collapse by dragging the
list from its top).

### G5. H5's HIT is overclaimed — range ratios give ordering, not durations

MARKS §5's close targets are duration-quantified and occur AFTER release: content out ~170ms,
empty-medium beat 100–200ms, medium tail ~400–450ms decelerating. On the native substrate the
post-release traversal speed is the UA fling; authored range ratios control ORDER and scrub
states but cannot bound those durations — a fast flick compresses the whole close into the
fling's UA-fixed time, and the signature beat may vanish. The §3 table scores "three clocks +
inversion + beat" as unconditional HIT with no argument or measurement that a fling traversal
lands in the MARKS bands. F1's follower model gives channels their own time constants; F2
structurally cannot — that is a price, and it is not on the ledger.
**Closes with:** a measured flick-dismiss on the prototype against the MARKS §5 close bands;
either the bands pass in paint or the H5 row splits into "order + scrub: HIT / post-release
durations: UA-priced DEGRADE."

### G6. Direction-scoped band sets require an unspecified JS state writer

H5 authors close bands as "a second `animation-range` set selected by scroll direction state."
No such selector exists on Safari (`scroll-state()` is Chrome-only per the family's own §1
table, and does not expose direction anyway) — so the selection is a JS-written class/attr
flag inside the family's flagship "desync without a JS clock" claim. Unstated: the writer, its
hysteresis, and the discontinuity hazard when a mid-flight catch flips the set while bands are
mid-range (the CC interrupt is the acceptance case; a set swap mid-gesture is a visible jump —
the exact anti-goal). F1's prototype had to formalize target-keyed intent to survive this; F2
has the same problem and no answer.
**Closes with:** a specified direction/intent classifier (writer, flip condition, continuity
argument under mid-flight reversal) proven on the prototype's interrupt scenario — or the
close-order inversion moves to the losses ledger.

### G7. The Chrome-mirror spring citation is stale and misses the measured physics

The spec and digest cite `springPreset("dock")` as {0.68, 0.64}. In current source the dock
preset is {response: 0.3, dampingFraction: 0.82} (springPresets.ts:95–99); 0.68/0.64 appears
nowhere in the file. Worse than stale: ζ≈0.82 yields ~1% overshoot — the MARKS springback wants
one overshoot at ~30–50% of the overpull distance. So the claim that the Chrome mirror is "set
exactly" to the measured physics is false twice over. Note also the MARKS-internal tension the
F1 seat flagged (ζ≈0.5–0.65 stated vs 30–50% overshoot implying ζ≈0.21–0.36, awaiting the R3
re-burst) — F2 inherits it silently.
**Closes with:** corrected citation; a named preset (new `springPresets.ts` register entry —
the single-authority rule permits additions) tuned inside the R3-arbitrated bracket; the
MARKS-internal ζ contradiction acknowledged and tied to the R3 re-burst.

### G8. The var contracts are not implementable as written

`--gl-overpull` is "signed, px-normalized" — normalized against what constant? No `@property`
registration (syntax, inherits, initial-value), no reader list, no teardown/no-idle-rAF proof
obligation, no park-point definition (which U-R4 admits is unresolved). `--scroll-v` likewise
inherits "the `useDragVelocity` shape" by reference without stating gain, clamp, or window for
the scroll source. The digest's own spec-shape item 3 prescribed exact names, ranges, writers,
readers, teardown proofs; the spec delivers names only.
**Closes with:** the full contract table — registration, range, normalization constant,
per-engine writer, reader set, park signal, teardown proof — for both vars.

### G9. No engine matrix, no stated no-SDA floor

The digest's spec-shape item 5 prescribed an engine matrix (Safari-native / Chrome-mirror /
no-timeline fallback) with a degrade floor per row. The spec has feasibility prose and no
matrix. Unanswered: when `supportsCssTimeline` fails, does the ladder render terminal, does
`useScrollScene` drive it, do detents survive? "No masking fallback" is only checkable when the
floor is written down.
**Closes with:** the matrix table with a visible-degrade statement per row.

### G10. The PRM contract is one clause

The spec pins the vars to 0 under PRM and stops. Unstated: whether timelines bind at all,
whether the reveal ladder renders terminal (fully revealed at any height?), whether snap
detents remain functional, what the medium band does. The digest's item 9 prescribed exactly
this section; it was dropped.
**Closes with:** a PRM section per the scroll-driven.css outer-gate pattern covering ladder,
medium, detents, and both vars.

### G11. The taffy-zone mechanism contradicts the travel model

§1: the card top "travels by scrolling, not by transform." H1: "the first ~40px of range drive
a stretch band while the travel band starts at 40px." Scroll-flow travel has no delayed start —
the top edge moves the moment scrollTop moves. Holding the card still through the first 40px
requires a counter-translate band, i.e. a transform on the travel path the spec's own anatomy
sentence forbids.
**Closes with:** the counter-translate lead-in band specified explicitly (it is
compositor-legal) and the §1 sentence amended to admit it.

### G12. Depth-grade transcription error

MARKS §5: deeper rows travel ~20% farther than top rows — ~1.2× total, top to bottom. Spec and
digest both say "~1.2× per depth step," which compounds to ~1.7× over three steps.
**Closes with:** a one-word fix and the correct multipliers carried into the band table.

### G13. Consumer-less substrate — no committed first consumer

By the spec's own H6 boundary, the headline corpus surfaces (the dock's gesture face, the tab
lens travel) fall OUTSIDE the family. What remains in-library: the drawer (currently on the
house JS snap engine, migration deferred to a round-2 ruling), a hypothetical pill carousel,
list ladders. Nothing is named as a committed adopter. A substrate no shipped surface consumes
is the named failure mode.
**Closes with:** the round-2 migration table naming at least one committed first consumer
(the drawer is the honest candidate, per the consumer-updates ruling) with its adoption wave.

### G14. Mid-detent option (b) is untested against its own physics

The priced fallback for the ~170ms catch — a "visual-only well cue band" — is traversal-speed-
bound: at fling speed the band is crossed in ~30–60ms. Whether a cue that brief reads as a
catch at all is unexamined; as written it may be a gate that cannot fail because no acceptance
number is attached to it.
**Closes with:** the cue prototyped at measured fling speed with a stated acceptance band, or
option (b) struck and the round-2 ruling reduced to accept-vs-cede.

### G15. The spec's own probe ledger stands open

U-R1 (SDA threading with `backdrop-filter` on the animated surface), U-R2 (rubber-banded offset
vs timeline range — claimed design-neutral, still unobserved), U-R4 (`scrollend` during
rubber-band settle — this decides G8's park point), U6 (wheel/trackpad feel). All four are
honest entries; all four are open.
**Closes with:** the named probes run on the G1 prototype page, both engines, captured.

## Convergence

The research layer is near-complete and honestly cited; the spec layer is coherent but carries
four load-bearing mechanism holes (G3, G4, G5, G6), one factually wrong physics citation (G7),
and three prescribed-then-dropped sections (G8, G9, G10); the evidence layer is absent
entirely (G1, G2, G15). Elegance earns nothing; nothing here has been seen in paint.

**Convergence: 50%.**
