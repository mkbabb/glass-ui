# AX convergence — master plan (consolidated from the 32-lane inventory + pass-3)

The single convergent-optimum roadmap. Drives ONE batch at a time (concurrent 32-agent
workflows trip the throttle). Every wave closes on a captured LIVE chrome-devtools-mcp
DELTA at ≥2 viewports × light/dark — the cardinal lesson is the governing precept;
"complete" never collapses to headless-green.

## State (HEAD 88a2ec5 + the dock.vue soundness scrub)

63→70 wave rows. ~28 done/live-verified, the rest planned. **3.8.0 published.** The dock
band (W45 + DK1/2/4/5/7/8) just landed live-verified (the W01 one-clock re-opens applied —
DK7 second clock deleted). Soundness debt being discharged (story-language GREEN again).

## The DAG (batch order)

- **Batch 0 — soundness + foundational specs.** Reconcile PROGRESS↔JSON; the
  `proof:live-verified-ledger` close gate; the MCP re-verify sweep (capture the owed DELTAs
  as screenshots — the audit/visual/ discipline the inventory flags as missing). AUTHOR the
  missing foundational specs: **W54 glass-first-class** (the ROOT), **W51 --ui-scale**,
  **W55 adaptive-glass**, the **page-redesign umbrella** (net-new), the **dock-unify-root**
  W45 extension; amend W06; re-diagnose W42 (its 2nd-consumer hinge is stale post-W53).
- **Batch 1 — the glass ROOT.** W54 glass-first-class (RATIFY R3 first) ‖ the W43 fourier
  SOTA pull-up ‖ W42 liquid-morph substrate. These unblock the page-redesign.
- **Batch 2 — the live BLOCKERS.** W46 blob (floors→bands, lighting/hover down, mood latch),
  W48 glass-material demo reauthor, W44 dark-contrast, Q8 gate-pattern-locks-you-out.
- **Batch 3 — the dock finish (serial on shared dock files).** W45-TUNE (Q1 collapsed size,
  Q3/DK2 hover legibility, the DK3 ratify) → W06 carve+showcase → dock-unify-root.
- **Batch 4 — the page-redesign umbrella.** Every story in a glass card with paper/grid/
  aurora/constellation/fourier heros + proper hierarchy (Q4/Q7/Q9 + P8/P10). Blocked on W54.
- **Batch 5 — demo IA.** W18 IA → W40 shell → re-verify W57; Q5 motion-page union, Q2 aurora
  black-bar, Q6 broken-motion-section, the /composables/use-token-color demo removal.
- **Batch 6 — aurora ‖ sizing ‖ a11y.** (W38 configurator faster/springier / W47 van-Gogh
  preset / W14 webgpu) ‖ (W51→W50→reconcile --dock-scale onto ONE --ui-scale) ‖ (W55/W36).
- **Batch 7 — cross-repo + slides.** W41→W34→W21→W28→W29 (chassis RETIRE, confirmed) ‖ W35
  prune → W30-W32 re-ground + the **Tranche K re-seed** (the user-flagged 5/6/7 redesign,
  orphaned on a stale branch — re-seed onto deployed main).
- **Batch 8 — encapsulation.** W25a/b→W26 (incl. the SegmentedTabs 683-line spillover)→W27a/b
  (carves BEFORE the budget rebaseline).
- **Batch 9 — close.** W39 lighthouse → W33 terminal (π-in-CI split-tag, carry-closure gate,
  band READMEs, overfitting audit, FINAL) → provenance-clean master-merged publish (3.9.0) →
  consumer bumps (speedtest/slides/words/fourier) → slides deploy → prod-validate.

## Headline gaps the inventory surfaced (folded into this tranche)

- **glass-first-class (W54) is the single highest-leverage unaddressed headline** (pass-3 TOP).
- The **page-redesign / demo-IA-hierarchy umbrella** (Q4/Q7/Q9) — un-owned, MINT it.
- **W43 fourier SOTA** — pull up, execute now.
- Three live BLOCKERS un-owned-shipped: W46 blob, W48 glass-material, Q8 gate-pattern.
- **Q3 hover contradicts W52's "live-verified" mark** — a cardinal re-verify candidate.
- **Provenance**: 3.8.0 published from the branch-tip not master — the merge+re-tag is a hard
  predecessor of the slides close. (master IS now FF'd to the branch, so resolved going forward.)
- **No audit/visual/ captures** — institute the screenshot discipline for every live DELTA.

## NEEDS-USER-DECISION (the adjudication batch — surfaced before the owning waves drive)

| # | Decision | Recommended default | Gates |
|---|---|---|---|
| R3 | glass-first-class BOUNDARY — how far does "glass by default" go? | **USER-DECIDED: MAXIMAL — everything glass.** W54 makes glass the default for EVERY surface (containers, chrome, buttons, AND content panels) over the rich backgrounds; the `--glass-level` scalar + the explicit opaque escape remain for the rare solid need; **W55 adaptive-over-light carries the legibility** (the heavy-tint-where-needed). Glass-first is the root default, not an opt-in. | **W54 (the ROOT)** |
| R1 | squircle "and the like" membership — beyond big-docks, which surfaces get the iOS superellipse? | **USER-DECIDED: extend to dialogs + sheets + panels + glass hero cards + where befitting** (large-radius surfaces). Cards + pills STAY rounded (prior guidance). | W56 amend |
| PR | page-redesign relationship to W18/W40/W57/W58 | **USER-DECIDED: a thin NET-NEW container-layer wave (W60)** that wraps each story page in a glass card + a rich per-page background + proper hierarchy; W18/W40/W57/W58 stay as-is (layered on top). | W60 (net-new) |
| R2 | ColorSwatch primitive (aurora seed/palette) — mint vs keep native `<input type=color>` | keep native (zero new surface) | W38 |
| R5 | slider "spectrum" naming / glass-scrubber | accept the shipped standard+spectrum (W59 done) | — |
| P1 | use-token-color — the COMPOSABLE has a real 2nd consumer (constellation.vue, keep); the DEMO STORY removed + the vertical-dock icon → DarkModeToggle | remove the demo + fix the dock icon (the composable stays) | W18/W21 |
