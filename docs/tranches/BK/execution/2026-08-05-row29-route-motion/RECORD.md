# BK #29 · W-ROUTE-MOTION — the record

**Row:** #29 W-ROUTE-MOTION · Φ5 · **selected by re-scout, not by assumption**
**Seat:** scout+implement · **modelId `claude-opus-5[1m]`** (Opus, per the ⊕¹⁵ model law's fanout arm)
**Date:** 2026-08-05 · **Base:** `c49dc3f7` (the brief cited `4917a042`; HEAD had advanced by #28's landing)
**Spec of record:** `TERMINAL-ROSTER.md:179` (TR wins on divergence), which cites WAVES:654 with F06
re-scoped, GREENFIELD-TERMINAL R-D (`:257`), and EXEMPLARS-CODEX #29 (rows I4 `:131` · I4b `:132`).

---

## 0 · THE SELECTION, AND ITS GROUNDS

The cursor closes every Φ5 landing with *"the procession still opens on a **re-scout**, never on an
assumed next"* — a line it earned, because ⊕⁴¹'s assumed next (#25) was false and had to be struck.
So the selection was re-derived from both authorities rather than read off ⊕⁴³.

Walking TR §A order from the last landing:

| row | state | disposition |
|---|---|---|
| #18 · #19 · #23 · #24 · #26 · #27 · #28 | LANDED (⊕³⁸/⊕³⁹/⊕³⁷/⊕⁴⁰/⊕⁴¹/⊕⁴²/⊕⁴³) | not selectable |
| #21 W-DAG-REDUCE | UNSTARTED | **GATED** — `#17` hard (`EXECUTION-DAG:32`), and #17 is itself Φ4-UNSTARTED |
| #22 W-FROST | DEMOTED→CURE-CUT (⊕³⁰) | IN-FLIGHT; never selectable |
| #25 W-FIELD-WELL | UNSTARTED | **GATED** on its own rides-clause — #82 owns the `field-control.css` seam (C-13k) and #22's rung is unbuilt |
| **#29 W-ROUTE-MOTION** | **UNSTARTED** | **SELECTED.** `EXECUTION-DAG:40` deps it on `#26`, satisfied at `d27ec5dc`; ⊕⁴¹ recorded the unblock and ⊕⁴³ names it next |

No ASK gate and no owner gate attaches to #29. Its gate cell names `G-NO-FLASH (non-dock)` — an
**already-seated** MOTION-family seat (`gates/ROSTER.md:24`), so this row binds and arms under it and
mints nothing; seats stay at 60 and the register receipt is byte-identical.

---

## 1 · THE WORK ORDER — TR#29's CELL, VERBATIM

> `| 29 | W-ROUTE-MOTION ⊕⁵ | WAVES:654, F06 re-scoped (UNREPRODUCED, GF-DOCK R-D:257) + **EXEMPLARS-CODEX #29 row — the typed grammar's terminal constants** (SE-3/SE-5): icon inhale ×1.57/42 ms · label-drops-first · radius-ratio carry · world at 1.7-2× · landing bloom · focus punch-out · ease-in collapse with opacity CUT · 1:8 parallax · window-not-carousel, only the tapped cell participates | Φ5 | G-NO-FLASH (non-dock). ⊕⁵ the grammar is RULED (the codex row), not proved mid-wave; WAVES:657's "the wave proves which" survives only as F06's paint-order-vs-duration *diagnosis* step, never as a mechanism choice |`

Derived items: **I-1** the typed grammar (one mechanism per nav class) · **I-2** the nine terminal
constants · **I-3** F06 re-scoped · **I-4** G-NO-FLASH armed, non-dock · **I-5** seats +0.

---

## 2 · I-1 · THE GRAMMAR — four classes, and the row each one binds

WAVES:654 asks for *"one typed transition grammar, one mechanism per nav class"* and then leaves the
grammar to be discovered mid-wave. TR ⊕⁵ closes that: the grammar is RULED by the codex row. What
was missing was a SUBJECT — there was no artefact naming the classes, so nothing could be asked
whether a class owned one mechanism, or whether its world outlived its foreground.

`src/composables/motion/route/routeGrammar.ts` is that subject, on the `engageLadder.ts` precedent:
**it mints no spring figure.** A row NAMES the spring row that owns its job and the clock it reads
that row on; every response, damping fraction and settle stays in `springPresets.ts`. It carries
nothing else: a row is what the mechanism and the CSS mirror both READ, so the unread `window` flag
and the unread `channels`/`RouteChannel` union were struck — the first is `nav !== "route"` at the
one site that needs it, the second is the recipe body's own keyframe list.

| class | foreground | world | why that row |
|---|---|---|---|
| `route` | `present` | — | the chrome-only cut: nothing is continuous, so the transition IS the root cross-fade. This is R-D's *"deliberate ≤1-frame cut"* for the case with no continuity object. |
| `zoom` | `panel` | `world` | the **extent morph** is panel's stated one job, and its intrinsic +4.2% mid-clock peak IS the LANDING BLOOM. LAW 4 permits exactly one rebounding row; the bloom therefore costs no second register and no literal. |
| `lateral` | `dock` | `world` | a sibling push is a rect travelling between two positions — dock's job by name, the same ruling ⊕⁴¹ made for #48's member travel. |
| `collapse` | **no spring** (`--ease-in`) | `world` | §7: an exit takes a bezier, always. Its clock is the exit reader of the row it reverses (`panel`), so a recede cannot outlast the arrival it undoes (#26's law). |

Mirrored verbatim into `tokens/motion-registers.css` as a fourth register family beside
`enter-overlay`/`enter-menu`/`enter-tooltip` — the same `{spring, clock}` shape, under a drift arm,
exactly as the `--engage-*` block mirrors `engageEnvelopes.ts`. The recipe body is the grammar block
in `styles/view-transition.css`; it states no clock, no curve and no magnitude of its own.

The mechanism is `routeTransition()` (`route/useRouteTransition.ts`), shipped on the engine-free
`/motion-core` surface beside the substrate it wraps — no `vue`, no keyframes.js, no router. It does
the two things `useViewTransition.ts` documents itself as refusing: it names the ONE element that
participates, and it types the transition.

---

## 3 · I-2 · THE NINE CONSTANTS, EACH WITH ITS LIVE MEASUREMENT

Every figure below was read out of Chromium at `:5400` off the real consumer path — the demo's own
click handler — not from source. Viewport 1440×907.

| constant | how it is built | measured live |
|---|---|---|
| **icon inhale ×1.57 / 42 ms** | a keyframe on `::view-transition-old(gl-route-window)`, so it costs zero latency and rides the flight's head | `scale` **1 → 1.47837 @21ms → 1.57 @42ms**, held |
| **label-drops-first** | the label is its OWN name, so it can leave before the body it sits on; its clock is the inhale's | `::view-transition-old(gl-route-label)` **42ms**, linear |
| **radius-ratio carry** | both ends read ONE radius role (#23's spine); the group interpolates it | group keyframes carry the pair's own radii; the **+15% mid-flight swell is REFUSED** — §9 item 4 forbids faking the superellipse, and states that continuity is the load-bearing half |
| **world at 1.7–2×** | the ratio our two table-fixed rows produce; never set | **zoom 1.267× · lateral 2.714× · collapse 2.000×** — see §7 DEVIATION-1 |
| **landing bloom** | `panel`'s intrinsic peak on the extent morph | width **+1.882%**, height **+3.280%**, peak at **63.3%** of clock — and both under LAW 4's 4.7% ceiling, because a curve peak of 1.04211 realizes as `4.211% × travel/destination` |
| **focus punch-out** | free: the window and label are NAMED, so they are lifted out of the root snapshot and the world's blur cannot reach them | one declaration; `::view-transition-old(root)` at t=0.35 computes `blur(14.6929px) brightness(0.66941)` |
| **ease-in collapse, opacity CUT** | `--ease-in` + a 0%,90%→100% keyframe, with a **conserving twin** (§6) | group **250ms** on `cubic-bezier(0.4, 0, 1, 1)`; old held at **1** through 60% of clock |
| **1:8 parallax** | ONE ratio token, spent on both parallax cases | content **180px** = 0.125×1440 · world **22.5px** = 180/8, **exactly 1:8**, measured |
| **window-not-carousel** | the mechanism holds at most one window name and one label name, sweeps before it writes, clears on `finished` | the DOM arms; the sweep arm plants a leaked name and proves only the tapped cell survives |

The RECEDE's own two channels, §3(d): world travel measured **−113.375px** = `0.125 × 907lvb`, blur
bound to the ladder's **floating** rung (`--glass-blur-floating-radius`, **20px** — which IS the
corpus's own ~20px, reached by naming a rung rather than by spelling a radius, since raw `blur(Npx)`
is forbidden; the rung ABOVE it, `--glass-blur-overlay-radius` at 22px, is the ladder's top and
belongs to overlay surfaces), dim to `brightness(0.55)` — `brightness` rather than `opacity` so
chroma survives (§9 item 1) **and** so the alpha channel stays free for the conserved fade.

**The window's clock:** the group interpolates `344×318.4 @(224,587) → 1152×1333.75 @(188,40)` over
450ms on `linear(0 0%, 0.00971 2.041%, …)` — `--spring-panel`, resolved in the engine.

---

## 4 · I-3 · F06, RE-SCOPED — the diagnosis step, and nothing more

TR ⊕⁵ is explicit that WAVES:657's *"the wave proves which"* survives only as F06's
paint-order-vs-duration **diagnosis**. R-D (`:257`) already took that measurement: `main` opacity
flat 1.000, zero blank frames — **the flash is UNREPRODUCED**; what exists is a 109.8ms swap frame
plus 597.9ms of jank that reads as both slow and flashing. That finding is **UNCHANGED and
re-affirmed**: nothing in this cut claims to cure a flash that does not reproduce.

What the cut does claim is narrower and checkable: the root pair's alpha conservation — the property
that WOULD produce a flash if broken — was cured at ⊕²¹ and **nothing held it cured**. One careless
retune to a spring curve and it returns, with every suite green. §6 is what holds it now.

**R-D's dock ruling is honoured literally.** A route change stays a deliberate cut for the dock: no
rule in the library grammar names a dock selector, no dock element is ever given a window name, and
an arm asserts the declaration census is clean. The dock is the continuity object — and §5's second
cure is what finally makes it read that way.

---

## 5 · TWO DEFECTS FOUND IN LIVE PAINT, NEITHER VISIBLE TO ANY HEADLESS GATE

The row went to a cure cut. Both defects were green on every arm, on both suites, and on
`vue-tsc`; both were found by holding a frame in Chromium and looking at it.

**(1) THE INHALED SOURCE GHOSTED THE WHOLE FLIGHT.** With the window pair cross-fading over the
class clock, the departing cell was held at ×1.57 *and* scaled another 1.8× by the group — a
~3×-magnified snapshot of the card painted at 56% opacity across the arriving page for 450ms
(`cells/pi-zoom-t035.jpeg`, the "Ada Lovelace / @example.com" garbage overlay). The cure is the
codex's own constant, read properly: I4 measures the **artwork→surface crossfade at ~42ms**, not
over the flight. The handover IS the inhale; what flies the remaining 408ms is the destination.
Cured at `cells/pi-zoom-t035-cured.jpeg`.

**(2) THE COLLAPSE PAIR WAS OVERBRIGHT, AND MY OWN ARM COULD NOT SEE IT.** *"Opacity held then CUT"*
over an ordinarily fading arrival sums to **1.9 under `plus-lighter`** — the exact defect G-NO-FLASH
names, pointed the other way. It paints as a magnified double exposure rather than as a white frame,
which is why it survived an arm that read only the ROOT pair
(`cells/pi-collapse-t060-dark.jpeg`). The cure: the arrival is held at ZERO for exactly as long as
the departure is held at one, and the two swap inside the last tenth — `gl-route-cut-in`, the cut's
conserving twin. Conserved at every t, and a cut is still what it reads as. **The arm was widened
with it**: `COMPOSITED_PAIRS` now censuses every pair the grammar composites, and a second arm reds
if the grammar ever authors an alpha keyframe with no twin. Measured post-cure in the engine:
window-pair sum **exactly 1**, root-pair sum **exactly 1**, in both modes.

Two further cures came out of the same looking:

**(3) THE WINDOW SPILLED.** A snapshot lays out at the group's inline size with its OWN aspect, so a
3075px page flying into a 346px cell paints far outside the rect it is travelling to. The canon
already rules the answer — §9.6's *"the destination is laid out complete and revealed by clip"*,
§9.5's *"stops at the content column's gutter"* — so the group clips. It is the difference between a
page arriving and a page spilling, and `overflow: clip` is the whole of it.

**(4) PERSISTENT CHROME RECEDED AGAINST ITS OWN UNMOVED COPY.** The rail and the footer dock sit in
BOTH states and are replaced by neither, but unnamed they ride the root snapshot and therefore blur,
dim and travel 113px against their identical selves. Named without a clock they dissolve on the UA's
own quarter-second while their contents swap. The library now ships a shared
`view-transition-class: gl-route-chrome` — the `.gl-list-item` group-class precedent in the same
file — which resolves persistent chrome on the handover clock and then holds it still. The demo
binds it on the rail and the footer. `cells/pi-zoom-t035-chrome-lifted.jpeg` is R-D's sentence in a
frame: the dock's seat is **already open on the destination**, crisp, while the world behind it
recedes. **This is a consumer act** — the library still names no dock, nothing here animates a dock,
and R-D's rejection of View Transitions as the dock's own collapse mechanism is untouched.

---

## 5b · THE CURE ROUND — one FATAL defect of the same class, and five bookkeeping cures

The cut went to adjudication and came back CURE-REQUIRED. **C-1 was fatal, and it was §5(2)'s own
defect one level up.** The row cured the held-then-CUT pair and widened the arm from the root pair to
every pair the grammar AUTHORS — and an authored pair is not a composited one. On the demo's
most-travelled path the runtime composites a pair the sheet never authors: **a window half with no
partner.**

The path is the sidebar rail's category chip. `CatalogLanding` declares section paths, the chip
pushes a depth-2 story path (`useStoryNavigation.ts:54`, `useShellNavDock.ts:77`), so `planNav` types
0→2 as `zoom` and keys the window on the DEEPER path — which the catalog does not carry.
`windowFor()` misses, `nameElement(source, …)` names nothing, and the mechanism then named the
destination anyway. A lone new half on the 42ms handover clock reaches α=1 while the root pair is
still conserving to 1: **measured live at 1.900 (t=57ms), peak 1.9263 at t=42ms, above 1 for 528 of
570ms** — Challenger A's 1.895 reproduced on my own run.

**The cure has two halves because the defect does.**

- **(a) the reversible half — `useRouteTransition.ts`.** Whether the source resolved is settled
  BEFORE the old state is captured, so the mechanism now declines to name a destination whose source
  named nothing, and the class degrades to the alpha-conserving root cross-fade its own grammar row
  already documents. A name is only worth writing if it completes a pair.
- **(b) the irreversible mirror — `view-transition.css`.** Source resolved, destination not: the name
  is inside a snapshot the runtime already took and JS cannot un-name it. Four per-type `:only-child`
  forks give an unmatched half the ROOT pair's own keyframe on the ROOT pair's own per-type clock,
  which is exactly :230-235's physics restated for one half — over the unmatched rect the sum is
  `α_root-other-half + α_window`, and that is 1 at every t iff the window rides the root curve.

**LIVE, ON THE RAIL PATH, BOTH DIRECTIONS AND BOTH MODES** (Chromium 150, `:5400`, 1440×907, the
demo's own click handler; α read off the paused VT pseudos through `getComputedStyle`, 21 samples
across the clock):

| direction | class | window halves | α summed over the unmatched rect | worst deviation from 1 |
|---|---|---|---|---|
| `/` → `/display/buttons`, rail chip · **light** | zoom | **none** — (a) declined | root pair alone, `1.000000` at all 21 samples | **0** |
| `/` → `/display/buttons`, rail chip · **dark** | zoom | **none** — (a) declined | root pair alone, `1.000000` at all 21 samples | **0** |
| `/display/buttons` → `/` · **light** | collapse | `old` only | `α_win + α_root-new` = `1.000000` at all 21 samples | **0** |
| `/display/buttons` → `/` · **dark** | collapse | `old` only | `1.000000` at all 21 samples (0.9+0.1 · 0.5+0.5 · 0+1) | **0** |

**THE DELTA, MEASURED NOT ASSERTED.** Reverting each half in place and re-measuring the same click:
the forward case peaks at **1.900 @57ms** (true peak **1.9263 @42ms**), the mirror at **1.900 @225ms**
— the departure held at 1 through 90% of the 250ms clock over an arrival fading in. Cells:
`pi-collapse-unmatched-t150-dark.jpeg` (pre-cure, sum **1.6** at 60% of clock — the departing page
fully opaque over the arriving catalog) beside `pi-collapse-unmatched-t150-dark-cured.jpeg` (sum
**1.000000**, α_win 0.4 + α_root-new 0.6). The mechanism was restored byte-exact after the delta run
(`sha256` identical), as was `scheme-motion.css` after the detector's plant.

**One finding out of the delta run, worth stating:** (b) alone conserves BOTH directions — with the
mechanism reverted and only the forks in place the forward case still summed to 1 at every t. (a) is
not redundant to it: what (a) removes is the spurious extra layer itself, so the forward case is one
honest root cross-fade rather than a conserved-but-pointless duplicate of the arriving page.

The five other cures: **C-2** the arms above · **C-3** the arm count, corrected everywhere ·
**C-4** the advertised detector, made real · **C-5** the blur rationale, rewritten truthfully ·
**C-6** `settleSeconds` reading only a BARE `Ns` as a figure, so a clamped token resolves through the
re-derivation instead of answering `0.12` for a clock that ships at `0.25`. Three discretionary
residue items were ruled and applied: `ROUTE_WINDOW_ATTR` is now CONSUMED by the demo's `windowFor()`
instead of the selector being hardcoded beside it; `RouteNavRow.window` and the
`channels`/`RouteChannel` union are DELETED (nothing read them — the mechanism re-derives the first
as `nav !== "route"` and the recipe body owns the second); and `CatalogLanding.vue`'s
`data-route-window="/"` is DELETED as unreachable by enumeration over `planNav`, which keys zoom and
collapse on the deeper path. **`route` is now reachable only from an unmanifested equal-depth path**
— i.e. the 404 — and the `collapse` return leg is what keeps that class from being the only door.

---

## 6 · I-4 · G-NO-FLASH, ARMED — and what it can and cannot see

WAVES:659 states the gate as a frame assertion — *"no route change produces a frame whose mean
luminance deviates beyond threshold from both its endpoints."* That is a π measurement, taken above.
What a headless arm can hold, and what nothing held before, is the MECHANISM it depends on.

The flash is an alpha defect with exactly one shape: the two halves composite under `plus-lighter`,
so the page stays whole iff `α_old(t) + α_new(t) = 1` at every t. The arms parse the keyframes,
sample both curves, and assert the sum — a spring on either half, a duration split, or a
non-complementary keyframe each fail it. **Twenty-seven arms across two files**, counted verbatim
off `vitest --reporter=verbose`: `tests/styles/route-motion.test.ts` (**17**) +
`tests/composables/useRouteTransition.test.ts` (**10**, the mechanism half — window-not-carousel,
the stale-name sweep, the snapshot-moment naming, the unmatched-window degrade in both directions,
the direction sign, the substrate fallback).

*(The adjudication's C-3 dictated 23 = 15 + 8, which was the census of the PRE-cure tree; C-2's four
new arms take it to 27 = 17 + 10. The figure above is the shipped one, re-counted after the cure.)*

**SCOPE, STATED — three things the arms cannot see, all by construction:** real luminance (a frame is
paint; source is source — the π above is the frame half) · a consumer's own root-pair override in
ITS stylesheet · whether the runtime typed the transition at all, for a caller reaching past
`routeTransition` into `startViewTransition`, which is the substrate's documented contract and not a
hole.

**BORN-RED, MEASURED ON A PRISTINE HEAD TREE** (`git archive HEAD`, plus the two test files and the
grammar TABLE — the table is the ruling made executable; the CURE stays absent):
**22 of 27 RED**, and the five GREEN are named rather than counted as wins:

- the linear-timing arm and the channel-separation arm — GREEN at HEAD, because ⊕²¹'s root cure is
  genuinely true there. That is the arm's whole value: it was true and **unheld**.
- the world-finishes-last arm and the ratio arm — GREEN because they read the TABLE against the
  generated tokens, so they pass the moment the table exists.
- the dock declaration census — GREEN at HEAD.

Of the 22 RED, 10 are the mechanism file, RED as **ABSENT SUBJECT** (the import fails; recorded as
absent-subject, not as ten independent reds), and 12 are CSS arms red on their own subject.

**BORN-RED OF THE FOUR NEW ARMS, MEASURED AGAINST THE PRE-CURE TREE** — the row's own cut before the
cures, which is the tree they were written against. **Two of the four are RED**, verbatim:

```
 ❯ tests/styles/route-motion.test.ts (17 tests | 1 failed) 70ms
     × rides an UNMATCHED window on the root pair's own curve and clock, per class 5ms
 ❯ tests/composables/useRouteTransition.test.ts (10 tests | 1 failed) 19ms
     × declines to name the destination when the source resolved nothing 4ms

AssertionError: expected 'gl-route-window' to be ''            [the mechanism half]
AssertionError: zoom/old: no :only-child fork: expected +0 to be 1      [the CSS half]
```

The other two are GREEN at birth **by construction, and both are stated rather than counted**:

- *"restates no constant and no `--route-*` token anywhere else in `src/`"* — GREEN because the tree
  has no third site. A census cannot be born red on a clean tree, so it was **planted instead**:
  `--route-inhale-scale: 1.57; --route-parallax: 0.125` added to `tokens/scheme-motion.css` — the
  exact plant that stayed green under the arm this one replaces — and it **BIT**, naming the file:
  `expected [3] to deeply equal [2] · + "src/styles/tokens/scheme-motion.css"`. Restored byte-exact
  (`sha256 e62d48dd…` identical pre and post).
- *"keeps the captured source named when the destination resolves nothing"* — GREEN because that
  direction's mechanism behaviour is UNCHANGED by the cure, and deliberately: a captured name cannot
  be un-named, so the mirror is the sheet's to conserve. The arm pins the seam the `:only-child`
  forks stand on (the source stays named, `target()` is still asked, nothing is fabricated on the new
  side, the cleanup still restores) — and the arm that IS born red for that direction is the CSS one
  above.

**SIXTEEN MUTATIONS PLANTED, SIXTEEN BITE**, each restored byte-exact (`sha256` identical pre and
post on all three files): mirror drift · a spring on an alpha leg · a non-complementary pair · a
split root clock · the cut moved off the last tenth · the inhale scale drifted off the codex · a
spatial channel in an alpha keyframe · a spring on the exit · the sweep removed · the destination
named after the snapshot · a world clock faster than its foreground · a group rule losing its type
fork · a dock name in the grammar · the cut's twin unconserved · the clip removed · the chrome class
losing its handover clock.

**THAT BATTERY WAS MEASURED ON THE PRE-CURE TREE, AND IS NOT RE-CLAIMED WHOLE.** The cure round
edited two of the three files it was planted in, so three of the sixteen — the ones that touch those
files — were **re-planted on the CURED tree** and all three still bite, each restored byte-exact
(`sha256` identical to baseline on both files):

| mutation | arm that caught it |
|---|---|
| `gl-route-cut-in`'s hold moved off the last tenth (90% → 50%) | *sums every composited pair to 1 at every t* |
| the window group's `overflow: clip` → `isolation: isolate` | *clips the window group* |
| `sweepStaleNames()` commented out | *sweeps a leaked name before it writes* |

The other thirteen stand as the pre-cure measurement they were, and are labelled as such rather than
re-asserted against a tree they were never run on.

---

## 7 · DEVIATIONS AND REFUSALS, EACH WITH GROUNDS

**DEVIATION-1 — "world at 1.7–2×" is not our figure to set, and is reported rather than hit.**
Measured off the generated settles: **zoom 1.267× · lateral 2.714× · collapse 2.000×**. The MULTIPLES
are unchanged by C-6, but the absolute figures behind the collapse cell are not: the arm's old loose
read answered `0.12` for `calc(clamp(0.12s, --spring-panel-settle × 0.6, 0.25s) × --motion-tempo)`
and so measured a 0.12s foreground against a 0.24s world. Reading only a BARE `Ns` as a figure sends
the clamped token through the same arithmetic the generator emits — `min(0.25, max(0.12, 0.45 ×
0.6 = 0.27)) = 0.25` — so the cell now **re-measures at the shipped clock: foreground 0.25s, world
0.25 + 0.25 = 0.50s, the ratio still exactly 2.000×**, and the exit re-derivation is no longer dead
code. This is the figure `routeGrammar.ts:47-48` always claimed; now the arm reads it. One class
lands inside the codex's band; the other two bracket it. The band is a measurement of Apple's
clocks; ours are table-fixed by #26 and no row may own a second job, so reaching it in all three
would take either a route-only clock literal or a job steal — both forbidden. What the band
expresses — the world is strictly slower and finishes LAST, in both directions — holds in every
class and is what the arm asserts. The multiples are printed by the arm, never asserted as a band.

**DEVIATION-2 — the +15% mid-flight corner swell is REFUSED.** I4 measures it; §9 item 4 rules that
we do not have continuous corners in CSS and **must not fake them**, and that *"continuity is the
load-bearing half of the effect; the superellipse is the garnish."* Radius CONTINUITY is adopted
(one role at both ends, #23's spine); the swell is not built.

**REFUSED — the 130ms backdrop lag is expressed as an ORDER, not a literal.** I4 measures the
backdrop un-blurring 130ms after the card is gone. There is no beat quantum on disk (MOTION-CANON
§2's `--motion-beat` was never minted, and minting a global motion token for one consumer is not
this row's act), so the recovery is delayed by the window's own exit clock: it starts when the card
is gone, which is the sentence the measurement is evidence for. Measured live: `animation-delay`
**250ms**, `fill: backwards`, holding `blur(20px) brightness(0.55)` through the delay.

**FINDING, ROUTED — MOTION-CANON §1's panel peak position is falsified by the shipped generator.**
The table predicts *"+4.2% at t=0.238s (53% of clock)"*; the emitted `--spring-panel` puts its
1.04211 stop at **63.265%**, and the live group reproduces the peak at 63.3%. The magnitude is
right, the position is not. That figure is #26's/#65's, not this row's — **RT-29B → #65**, with the
derivation above. This record does not restate the 53%.

**CONSUMER GAP, STATED — browser Back does not route through the grammar.** Vue Router handles
popstate outside `pushRoute`, and wrapping it correctly is router-integration work, not route-motion
work. This is a PRE-EXISTING boundary (HEAD gives popstate no transition at all), not a regression.
What this cut adds is the in-app return leg: without it the `collapse` class was reachable only from
the 404 page — an unbuilt constant behind a green gate, which is exactly the class #28 was cured
for — so `StoryPage` now carries a section back-link, and a reader who arrived by tapping a cell can
leave the way they came. **RT-29C → the router seam, unclaimed.**

**RATCHET, MEASURED AND ROUTED, NEVER REBOUND — AND THE RELEASE PATH IS LEFT FAILING.** Tarball
**906,900** bytes against the datum 903,382. ⊕²¹ already recorded 903,623 as pre-existing
candidate drift (+241, rebind deferred to #66 per ⊕²⁰(d)), so this row's own contribution is
**+3,277** — the grammar module pair plus the CSS block, of which the cure round is +166 over the pre-cure 906,734 — and **+3,518** over the datum in total. Per the RATCHET PROTOCOL the datum
rebinds only at an owner-worded component addition in a commit that names the delta; this is neither,
so it is stated and left. **Stated plainly rather than softened:** `npm run verify:package` is
therefore hard-RED on `G-BUNDLE-RATCHET` — thrown, not warned — so the release path stands failing
until #66 rebinds the datum. That is the 4.0.0 close-lesson's own class (*run `--run release`, not
just `--run local`*), and it is disclosed here so the next publish hinge meets it knowingly.

**PUBLIC SURFACE — the 63 is the ROOT BARREL's, and the subpath delta is stated beside it.** Root
entries unchanged at **63** (`src/index.ts` named-re-exports `useViewTransition` alone, so nothing
new reaches the root) and `public-surface` is green. What DID change is the `/motion-core` subpath:
`src/composables/motion/core/index.ts` re-exports both new route modules, adding **15 names** —
12 values (`ROUTE_GRAMMAR` · `ROUTE_CONSTANTS` · `routeNav` · `foregroundCurveToken` ·
`foregroundClockToken` · `worldClockToken` · `ROUTE_WINDOW_NAME` · `ROUTE_LABEL_NAME` ·
`ROUTE_WINDOW_ATTR` · `ROUTE_LABEL_ATTR` · `ROUTE_DIRECTION_PROP` · `routeTransition`) and 3 types
(`RouteNavClass` · `RouteNavRow` · `RouteTransitionOptions`). It was 16 before the cure round;
`RouteChannel` was deleted with the field it typed.

---

## 8 · FILES

**Library**
- `src/composables/motion/route/routeGrammar.ts` — NEW. The table: four classes, the four measured
  constants, the token-name accessors. Mints no spring figure. Carries no field neither the
  mechanism nor the mirror reads (the `window` flag and the `channels`/`RouteChannel` union are gone).
- `src/composables/motion/route/useRouteTransition.ts` — NEW. The mechanism, which now declines to
  name a destination whose source named nothing.
- `src/composables/motion/core/index.ts` — both shipped on `/motion-core` (15 names).
- `src/styles/tokens/motion-registers.css` — the fourth register family + the constants + the
  RECEDE/parallax channels.
- `src/styles/view-transition.css` — the grammar block, the clip, the chrome class, the channel
  keyframes, and the four `:only-child` forks that conserve an unmatched window.

**Demo (the consumer)**
- `demo/chassis/routeTransition.ts` — the classifier (depth decides) + the window key (the deeper
  path, both directions) + the sign from the flat manifest order; `windowFor()` CONSUMES the
  library's `ROUTE_WINDOW_ATTR` rather than restating the attribute beside it.
- `demo/chassis/page/StoryPage.vue` — `data-route-window`, `data-route-label`, the return leg.
- `demo/chassis/landing/{SectionLanding,SectionPreviewCard}.vue` — the window keys.
  `CatalogLanding.vue` declares none: `/` can never be the deeper path, so a key there is
  unreachable by enumeration over `planNav`.
- `demo/shell/AppShell.vue` — persistent chrome named + classed.

**Arms**
- `tests/styles/route-motion.test.ts` — NEW, 17 arms.
- `tests/composables/useRouteTransition.test.ts` — NEW, 10 arms.

**Cells** — `cells/pi-zoom-t035.jpeg` (defect 1) · `pi-zoom-t035-cured.jpeg` ·
`pi-zoom-t035-chrome-lifted.jpeg` · `pi-collapse-t060-dark.jpeg` (defect 2) ·
`pi-collapse-t060-dark-cured.jpeg` · `pi-zoom-t035-dark.jpeg` (X-E's mode assertion) ·
`pi-collapse-unmatched-t150-dark.jpeg` + `pi-collapse-unmatched-t150-dark-cured.jpeg` (C-1's
delta pair, held at 60% of the shipped 0.25s collapse clock: rect sum **1.6** → **1.000000**).

---

## 9 · VERIFY, VERBATIM

**THE GLOB NOW COVERS THE MECHANISM HALF.** The cut's first battery ran
`tests/styles tests/components tests/gates`, which is 17 of the 27 arms —
`tests/composables/useRouteTransition.test.ts` sits outside it, and the other 10 arms rode only on
the full suite. The stated battery now names the fourth glob, so the row's own gate line exercises
what the row's own gate depends on.

```
npx vue-tsc --noEmit                                                    → clean (exit 0)
npx vitest run tests/styles tests/components tests/gates tests/composables
   Test Files  194 passed (194)
        Tests  1421 passed | 3 expected fail (1424)          [two consecutive clean runs]
npx vitest run                                                          (full suite)
   Test Files  213 passed (213)
        Tests  1599 passed | 3 expected fail (1602)
node scripts/gate-register.mjs
   seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2
   unbound:50 drift:1 rosterSha256:dc05df91 violations:0        [byte-identical, pre and post]
```

`npm run build` then `npm run demo:dist:build` ran **LAST-before-verify**, per ⊕⁴²'s standing
condition — the mutation battery bumps `src/` mtimes even on byte-exact restores, and `boot-graph`'s
freshness arm RED'd for exactly that reason mid-pass and was right.

**ONE INTERMITTENT, DISCLOSED RATHER THAN RE-RUN AWAY.** The four-glob battery's FIRST run failed
`tests/components/dropdown-menu.contract.test.ts > keeps the click branch to one portaled menu and
restores focus on execute` on a `setTimeout(…, 30)` focus assertion. It is load-sensitive, not
route-motion: 3/3 clean in isolation, 3/3 clean in isolation on a pristine `git archive HEAD` tree,
and the two full four-glob runs quoted above are clean. Stated because a flake that is only ever
re-run is a flake nobody has to explain.

**Seats +0.** `G-NO-FLASH` is a seated MOTION-family name; the **27** arms file as close-battery rows
against it and the formal register BIND routes to #65 (**RT-29A**), so the receipt does not move —
the #23 precedent (⊕³⁷, `G-RADIUS-ROLE` → #65).

---

## 10 · Φ5 PROCESSION

#29 unblocks nothing by itself — the DAG has no row deping #29. #30 W-DISSOLVE is live (dep #26,
banked ⊕⁴¹) and is the next unstarted in TR order; #25 keeps its gate; #21 stays gated on #17;
#33/#34/#35 stay behind #22's `G-FROST-TRANSMISSION`; #22 is IN-FLIGHT at its cure cut and never
selectable. **The procession still opens on a re-scout, never on an assumed next.**

Routed out of this row: **RT-29A** the G-NO-FLASH register bind → #65 · **RT-29B** MOTION-CANON §1's
falsified panel peak position → #65 · **RT-29C** the popstate/router seam → unclaimed · the ratchet
delta → #66.
