# The Connectivity Atlas letter (2026-06-12, BINDING cross-repo input — the d6-lineage reconciliation ask)

Relayed by the user from the atlas session (canonical file:
`usf/docs/tranches/G/letters/glass-ui-atlas-needs-3.14.md`, their repo; the condensed
form below is the operative text). The atlas is glass-ui's largest external consumer;
it consumed the **d6 fork lineage** (the registry 3.11.0/3.11.1/3.11.2/3.12.0
publishes — local branch `feat/d6-library-3.10`, 9 commits off merge-base `87c2d384`,
tip `2755ebbd`) and is moving to mainline as latest. It holds `^3.12.0` (build green,
parity 3/3) until the BA cut lands.

**The lineage truth this letter closes**: the AZ close flagged 3.11.x/3.12.0 as
"stale-lineage publishes" — but the atlas was a LIVE CONSUMER on that lineage. The
fork's capabilities were absent from mainline 3.13.0 not because they lacked
consumers but because their consumer was on the other line. Verified at HEAD:
`onFlipSettled` / `HandMark` / `InkMark` / `BRUSHES` / `PAPER_WASH_GROUND` /
`useRouteTransition` = 0 files on master; the fork log carries every named item
(`9467bd16` the E-arc wave incl. the useGlobalDark settle + paperWash ground;
`749d45ad` the HandMark measure anchors = 3.11.1; `fee5e3cd` the toggleDark
forced-reflow deletion = 3.11.2; `2755ebbd` the icon-morph `data-allow-motion`
carve + the 251-line born-RED test = 3.12.0; `3b10db81` the pencil-boil ^0.4.0 dep).

## The condensed letter (verbatim-relayed)

> To the BA tranche session, from the Connectivity Atlas (your largest external
> consumer):
>
> The atlas is moving to your base as latest. We ask for zero legacy shims, zero
> compat re-exports — where you superseded an idiom, tell us the new shape and we
> migrate. Three registers:
>
> **A — capabilities we cannot lose (need-shaped, not name-shaped):**
> 1. A post-theme-flip SETTLE seam — our entire color architecture (palette memo,
>    atomic chart retint, aurora re-derivation) subscribes to ONE post-flip
>    post-paint moment; 3.13.0 removed onFlipSettled. Any natural shape works
>    (promise off the toggle, event, VT-finished hook) — without it the round-trip
>    goes lossy again.
> 2. The hand-mark family's home — /handmark (InkMark/HandMark/BRUSHES) left 3.13.0;
>    it's the platform's hand voice. Where does it live now?
> 3. A flip suppression that doesn't gag its own toggle — both arms: the transition
>    storm dies AND the DarkModeToggle's icon morph runs. The d6 carve
>    (data-allow-motion) plus a 6-assert born-RED test
>    (DarkModeToggle.icon-morph.test.ts, d6 @ 2755ebbd) port cleanly — adopt or
>    solve structurally better, but port the test.
> 4. A named aurora ground profile (was PAPER_WASH_GROUND) and the route-transition
>    idiom (was useRouteTransition).
> 5. MetricBadge amount→value we acknowledge as intentional — we just migrate.
>
> **B — the d6 fixes 3.13.0 dropped — fold or provably subsume, by name in the cut
> notes, never silently:** the HandMark content-node measure anchors (3.11.1), the
> toggleDark forced-reflow deletion (~40ms/flip, 3.11.2), the icon-morph carve
> (3.12.0).
>
> **C — new cargo with design-grade specs ready:** the highlighter finish (your tree
> ships ~90% dormant; four field deltas: geometry rides LOW not middle · engage
> ribbon:"hull" · non-zero taper · let cap:"square" reach the DOM · isolation must
> not trap the multiply) · the natural-underline morphology at the pencil-boil root
> (scale-relative amplitude, irregular 2–4 periods, pressure taper, seed discipline —
> born-RED gates port from our spec) · the silver structure quad (gold shipped; the
> structure metal never did).
>
> **D — the cut:** semver honesty on the A-list breaks (they're major-grade); after
> this cut the d6 lineage retires and the fork closes; the lineage map from 636adeae
> ships in the notes.

Atlas-side: R-LETTER is signed — their G2a is this letter's root work (ours), G2b
grows the measured 7-surface/~30-call-site migration ahead of the
underline/highlighter/silver consumption, and they hold ^3.12.0 until our cut.

## Routing

The 3-lane opus analysis (A+B fork-gap census · C-cargo state-vs-spec · the lineage
map + cut mechanics) runs immediately; Fable synthesizes the BA amendment (the
reconciliation wave(s) + the W-CLOSE cut-notes/lineage/semver folds — register D
REINFORCES hinge H4 arm (a), 4.0.0). Tranche development only — NO implementation.
