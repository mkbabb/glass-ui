# H-dock — adversarial hardening of the AY dock band (W-DOCK1..3)

**Lane** H-dock (hardening challenge) · **HEAD** `at-dock-convergence` (3.9.0 ancestor) ·
**Mode** read-only RED-TEAM, findings + wave-spec inputs only (no code) · **Date** 2026-06-09 ·
**Verdict** GAPS-FOUND (the lockstep hard gate is tautological; W-DOCK1/2/3 are un-authored
one-line rows that re-promise a CHRONIC the AX band already claimed-and-mis-gated).

Scope: `src/components/custom/dock/` (GlassDock 608, dockMorphContext 408, useLayerTransition 263,
useDockState 353, useDockHold 140, DockLayerGroup 236), `src/styles/dock/{shell,morph,layers,
layer-group,overflow,density}.css` + `dock-controls.css`, the dock proof set, and the AY.W-DOCK1/2/3
plan rows + their reused gates. Cross-read the prior AX hardening lanes (`DOCK-morph.md`,
`DOCK-layers-rail.md`) to separate net-new from already-flagged.

---

## THE HEADLINE — the "lockstep" hard gate is TAUTOLOGICAL; it cannot witness the user's defect

The user's standing complaint (PROMPT-CORPUS #5, AUDIT-LEDGER #5 marked **CHRONIC**): *"the
inner items must fade/morph in-and-out IN LOCKSTEP with the shell (today the shell shrinks
first, items lag a few ms)."* AY.W-DOCK2's hard gate is literally `proof:dock-animation-live`
*"shows lockstep (captured); no shell-first."*

`proof:dock-animation-live.mjs` and its π twin `tests-visual/dock-animation-live.spec.ts`
assert exactly ONE binding lockstep condition:

> the root **box-width onset** and the **`--dock-morph-t` scalar onset** co-occur within ≤1 frame
> (`proof-dock-animation-live.mjs:389-399`; `dock-animation-live.spec.ts:184-190`).

But the box width IS `--dock-morph-t` by construction — `layers.css:55-61`:
`inline-size: calc(--dock-morph-from + (--dock-morph-to − --dock-morph-from) * var(--dock-morph-t))`.
The box width is a pure `calc()` read of the scalar. **Asserting "the box onsets within 1 frame
of the scalar that defines the box" is a tautology** — it can never red, and it can NEVER witness
a box-leads-CONTENT desync (it only proves the box can't lead its own driver, which is impossible).

The CHILD content — the thing the user says lags — is sampled but **never asserted**:
- the gate samples only the **LEAVING `.dock-layer--summary`** opacity (`proof-…-live.mjs:132-139`),
  not the entering `.dock-layer--full` children;
- it records `childOpacityMovingFrames` as an explicitly **"best-effort … NOTE"**, with the
  comment "the load-bearing asserts are the two rising-frame counts + the single-clock onset above"
  (`proof-…-live.mjs:401-409`). It is a fact, not a violation. Nothing about the child onset binds.

So the gate AY.W-DOCK2 reuses is structurally blind to the exact desync AY.W-DOCK2 exists to fix.
A wave whose hard gate cannot fail on its own headline defect is UNDER-SPECCED.

## D1 — the items DO lag the box, BY DESIGN — and it's the entering-child STAGGER, not a clock desync

The entering `.dock-layer--full` children reveal via the per-child stagger ramp
(`layers.css:233-283`): `opacity = clamp(0, (expand-t − onset)/window, 1)`, `onset = step ×
(childIndex − 1)`, capped at the 6th child. The shipped defaults (`shell.css:51-53`):
`--dock-stagger-step: 0.08`, `--dock-stagger-window-size: 0.4`. So:
- child 1: onset 0, full opacity at `t=0.4`;
- child 6+: onset `0.08×5 = 0.4`, full opacity at `t=0.8`.

The box reaches its expanded size at `t≈1.0` (spring), but the LAST controls are still ramping
in from `t=0.4→0.8`. **This IS "the shell expands, items lag."** It is intentional staggered
reveal (the macOS-dock cascade), but the user is reading it AS the lag complaint. Two things follow:

1. The AX band's whole "DK7 one-clock, ONE scalar, every axis" narrative (`layers.css:118-130`,
   `morph.css`) is TRUE for the leaving-pane opacity and the box size, but the ENTERING children
   are deliberately phase-shifted by up to 0.4 of the morph. The "lockstep" the architecture
   advertises and the "lockstep" the user wants are different claims. Nobody has reconciled them.
2. The fix is a DESIGN decision the AY plan never states: either (a) collapse the stagger window so
   entering items track the box tightly (true lockstep — kill or shrink `--dock-stagger-step`), or
   (b) keep the cascade but make it READ as intentional choreography (front-load it, tighten the
   window) and DOCUMENT that the cascade is deliberate. AY.W-DOCK2 says neither; it just re-points
   at a gate that can't see either outcome.

**Falsifiable:** rAF-sample the LAST `.dock-layer--full > *` child's `opacity` against the box
width during a hover-expand on `/navigation/dock`. The child's opacity-onset trails the box-width
onset by `step × (n−1) × morph-duration` ≈ 0.4 × ~380ms ≈ 150ms for child 6 — the "few ms" the
user perceives, an order of magnitude larger than the "few ms" framing.

## D2 — TWO live morph spring constants; the sync gate reads the WRONG one (dead-witness, re-confirmed live)

`DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 }` is hard-typed TWICE:
- `dockMorphContext.ts:39` — the orchestrator that drives EVERY `<GlassDock>` morph (the real one);
- `useLayerTransition.ts:36` — the STANDALONE `<DockLayerGroup>` engine (the no-dock fallback,
  still live-consumed at `DockLayerGroup.vue:101`).

`proof:spring-tokens-synced` reads `DOCK_SPRING` ONLY out of `useLayerTransition.ts`
(`proof-spring-tokens-synced.mjs:27-30,62-64`). A dev retuning the ACTUAL shipped morph at
`dockMorphContext.ts:39` (e.g. to a bouncier ζ) changes the real overshoot while the gate stays
GREEN reading the OTHER, increasingly-vestigial copy. The AX `DOCK-morph.md` CHALLENGE 1 flagged
the CSS-token-vs-JS-const dead-witness; this is the SECOND head — JS-const-vs-JS-const, two live
copies, gate on the less-load-bearing one.

## D3 — useLayerTransition (263) and dockMorphContext (408) are TWO near-identical FLIP engines that have DRIFTED

Both implement the same measured-once FLIP-pin-rAF-`max-content`-measure-arm dance
(`useLayerTransition.ts:170-245` vs `dockMorphContext.ts:268-341`; the `max-content` force-measure
comment block is near-verbatim at both). They have already diverged load-bearingly: the
orchestrator re-bases SIBLING targets' `from` to current painted px before resetting the shared
scalar (`dockMorphContext.ts:296-303`); the standalone has NO sibling logic. So a standalone
`<DockLayerGroup>` and a nested one have DIFFERENT mid-flight retarget behaviour from the same
author intent. This is a DRY/KISS violation (PROMPT-CORPUS §A "no legacy codepaths") AND a
god-module-adjacent smell (`dockMorphContext.ts` 408 is the second-worst in the band). The AX
`DOCK-layers-rail.md` L4 flagged it; AY.md folds it NOWHERE (W-GOD1 targets >500-line files only —
both engines sit under threshold while being the worst duplication in the band).

## D4 — AY.W-DOCK3's "progress bar off the dock" hard gate has NO glass-ui edit-site (mis-folded; already done in slides H.W2)

PROMPT-CORPUS #5: *"the slides bottom progress bar must NOT be baked into the dock — it's a
page-bottom element."* AY.W-DOCK3 carries it as a glass-ui hard gate: *"progress bar off the dock."*

But: (a) `GlassDock` bakes NO progress bar — `grep -rin progress src/components/custom/dock/
src/styles/dock/` returns only morph-progress scalar comments, zero progress-bar chrome; and (b)
the slides progress bar was ALREADY de-docked at the slides **H.W2** tranche — `slides/src/styles/
deck.css:316` "DE-DOCKED PROGRESS BAR axes (H.W2)", and `slides/src/deck/DeckView.vue:107-112`
renders `.deck-progress` as a viewport-pinned page element with the comment *"the in-dock underline
was removed so there's no doubled bottom-edge red."* So this half of W-DOCK3 is a phantom gate:
no glass-ui defect, no glass-ui edit-site, already resolved in the consumer. It belongs in the L
tranche as a verify-row (confirm no regression after L.W-ADOPT), not as a glass-ui hard gate. The
AUDIT-LEDGER does not even note it's done — it lumps it under CHRONIC #5/#10.

## D5 — "dock-with-slider broken" (CHRONIC #10) has NO captured DELTA proving it broken OR fixed

The keepDockOpen mechanism is architecturally sound at HEAD (`useDockHold.ts` native host
listeners on the resolved reka `SliderRoot.$el`, immune to the forwarding-drop;
`proof:dock-hold-contract` is a deterministic jsdom MOUNT bite, born-RED-then-fixed at AX.W03).
The static gate proves `keepOpen()` fires. But the user's complaint is a LIVE/VISUAL one ("the
dock-with-a-slider is broken"), and:
- the CLAUDE.md-cited proof story `demo/stories/compositions/dock-with-slider.vue` **does not exist
  in the live tree** — it lives ONLY in `.claude/worktrees/*` (orphaned worktree copies). The
  canonical `demo/stories/compositions/` has no dock+slider story. So the "cross-substrate proof
  story" CLAUDE.md names is a dangling reference;
- there is ZERO captured DELTA (PNG or paired-π) of a slider dragged inside a live dock.

So AY cannot know whether #10 is still broken. The CHRONIC must be re-grounded with a LIVE capture
FIRST (the cardinal lesson: complete only on a captured DELTA), then folded — not re-promised as
"fix dock-with-slider" against an unverified premise.

## D6 — every "live-verified" dock DELTA is a STILL FRAME; the TEMPORAL desync was never captured

`docs/tranches/AX/audit/visual/W45-DELTA.md` + `W45-TUNE-DELTA.md` capture static screenshots
(desktop/mobile × light/dark) + a rest-vs-hover readback table. `grep -rln 'morph-t|rising
frame|frame series' docs/tranches/AX/audit/visual/*.md` = **0 hits**. The desync the user reports
is fundamentally TEMPORAL (the box leads content over frames); a still frame cannot show it. So
across W01→W45→W45-TUNE, every dock wave marked "live-verified" captured the wrong artefact class
for the one defect that matters. The AX `DOCK-morph.md` CHRONIC ("the owed live-DELTA capture,
deferred every wave") is unresolved at HEAD — and AY.W-DOCK2 reuses the same still-frame protocol
implicitly (its gate is the tautological onset check, no frame-series DELTA mandated).

## D7 — the rail indicator is on a SECOND clock; the switcher rail VANISHES on collapse (re-confirmed unfixed)

The AX `DOCK-layers-rail.md` L1/L2/L3 found: (L1) the rail double-renders indicators (the local
`TabsList` default `indicator:true` phantom + the dock indicator), never `:indicator="false"`;
(L2) `.dock-layer-tab-indicator` travels on `--dock-motion-resize` (a fixed linear() curve) while
the pane morphs on the live `--dock-morph-t` spring — DK7's killed second clock, alive on the rail;
(L3) the switcher rail lives inside the `:inert`/clipped `--full` pane, so it disappears on collapse
with no persistent way to switch layers. AY.md W-DOCK2 says "layering + rail cohesion" in ONE
clause with no edit-sites and no gate that touches the rail (the `proof:dock-*` set has no rail
double-indicator or rail-clock assertion). These are net-carried from AX with no fold.

## D8 — GlassDock.vue is 608 lines but its own header claims "421-line … DO-NOT-SPLIT"

`GlassDock.vue:2-6` carries a `DO-NOT-SPLIT (AW.W15 assay)` banner asserting the file is
"421-line … cohesive-at-boundary." The file is **608 lines** (`wc -l`). The banner is stale by
~190 lines — the assay graded a smaller file. AY.W-GOD1 names GlassDock 608 as a god-module to
carve, directly contradicting the in-file DO-NOT-SPLIT. W-DOCK2 will EDIT this same file. The
contradiction must resolve (either the banner is wrong and W-GOD1 carves, or W-GOD1 is wrong and
the banner stands) — both cannot hold. This is a coordination hazard between W-DOCK2 (edits) and
W-GOD1 (carves) on the same 608-line file with no stated sequencing.

---

## CHRONIC (slip history — carried ≥2 tranches/passes)

- **CHRONIC-1 — the lockstep claim mis-gated.** The "box-vs-its-own-scalar onset" tautology has
  shipped as the lockstep proof since AX.W01; the entering-child onset (the user's defect) was
  never asserted. The AUDIT-LEDGER marks #5 CHRONIC ("recurs across keyframes.js + AX … the
  shell-first/items-lag is the signature") yet AY re-promises it against the same blind gate.
- **CHRONIC-2 — the owed live frame-series DELTA, deferred every dock wave.** AX `DOCK-morph.md`
  named it (W01-DELTA "pixel evidence pending" → W45 → W45-TUNE all still-frame). Unresolved at HEAD.
- **CHRONIC-3 — the dead-witness spring gate.** AX `DOCK-morph.md` CHALLENGE 1 (CSS-token vs JS) +
  D2 here (JS-const vs JS-const, two live copies). The morph's real spring constant is gated by
  proxy, never directly.
- **CHRONIC-4 — capability-without-live-adoption, slider edition.** The dock-with-slider story is
  worktree-orphaned; no canonical demo, no captured DELTA — #10 has been CHRONIC since the
  keyframes.js era with no live ground-truth either way.

---

## CONVERGENCE CRITERIA (what "perfected" concretely means for this lane)

The dock band is perfected when ALL hold, each on a CAPTURED artefact (not a tautology):
1. **A real lockstep gate.** `proof:dock-animation-live` (or a successor) rAF-samples the LAST
   entering `.dock-layer--full` child's opacity AND the box width on ONE timeline and asserts the
   child-content onset trails the box onset by ≤ a stated bound (the DECIDED lockstep budget). The
   tautological box-vs-scalar check is RETIRED or demoted to a structural pre-check.
2. **The stagger reconciliation is DECIDED + recorded** — either entering items track the box
   within the lockstep budget (window/step retuned), or the cascade is kept and DOCUMENTED as
   deliberate choreography with a stated `--dock-stagger-*` rationale. No silent 0.4-window lag.
3. **ONE FLIP engine** — the standalone `useLayerTransition` folds onto the multi-target
   orchestrator primitive (D3); ONE `DOCK_SPRING` authority both the CSS token AND every JS driver
   resolve from, gated directly (D2).
4. **The owed frame-series DELTA exists** — a captured `--dock-morph-t` + box-width + last-child
   opacity timeline at ≥2 viewports × light/dark, for hover-expand, click-collapse, and a
   retarget-mid-flight (D6).
5. **dock-with-slider re-grounded** — a canonical `demo/stories/compositions/dock-with-slider.vue`
   on the live tree + a captured live drag DELTA proving the dock holds + the slider tracks (D5);
   the CLAUDE.md dangling reference fixed.
6. **The rail one-clock + persistence + single-indicator** land or are formally booked (D7).
7. **W-DOCK3's progress-bar half re-homed** to the L tranche as a verify-row; the glass-ui gate
   asserts only what glass-ui owns (D4).
8. **GlassDock's DO-NOT-SPLIT banner reconciled** with W-GOD1; W-DOCK2/W-GOD1 sequencing stated (D8).
