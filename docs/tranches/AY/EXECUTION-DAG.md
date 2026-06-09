# AY + L — the execution DAG (the single hardened roadmap)

The one sequencing artefact for the AY (glass-ui) + L (slides) engagement. It replaces the two
5-line prose "ordering" paragraphs (`AY.md §3`, `L.md §3`) that were the entire scheduling apparatus
for a ~34-wave, two-repo, cross-published engagement. Authored by AY.W-DAG, grounded in the 30-lane
hardening synthesis (`audit/hardening/H-execution-dag.md`, `H-wave-completeness.md`, `H-gaps-master.md`).

**HEAD:** glass-ui `at-dock-convergence` (v3.9.0 + CI-fix commits; `master` is the merge-base
`c6244e2`, docs-only). slides `main` (`3765d52`, NOT deployed — held for review).

**Numbering:** ONE scheme — the `W-*` named system (130 sibling-lane refs use it). The dual
`AY-DRAFT.md` W0-W8 positional scheme is RETIRED; its three unique waves fold back as W-DELTA0
(owed-DELTA, ex-W0), W-CONSUMER (consumer-staleness, ex-W5), W-TRIAGE (residual, ex-W8).

---

## §0 — the two user-domain hinges (the only manual gates)

Everything else is agent-dispatchable. Agents are READ-ONLY on git. The two irreversible legs the
agents NEVER execute:

- **[HINGE 1] W-PUB1** — master-merge the AY line + push the `v3.10.0` (or next minor) tag →
  `release.yml` does the gated provenance publish (per MEMORY `project_glassui_340_published`: push
  the `v*` tag, release.yml publishes from master with npm provenance). The orchestrator/user pushes.
- **[HINGE 2] L.W5** — the CF-Pages deploy + the post-push live-200 probe. Held until the deck is
  reviewed. The agent captures the live DELTA AFTER the user-domain push.

---

## §1 — the cross-repo publish→re-pin→adopt→deploy chain (the load-bearing edge)

The engagement's headline — "slides consume perfected glass-ui, no bespoke copies" — requires this
EXACT ordered chain. Today it is two words ("gated on AY") across two repos, and the pin is a CARET
(`^3.9.0`) that would silently auto-resolve. The chain, version arithmetic explicit:

```
1. AY perfects constellation: W-CON1 (refitField + auto-drift + alpha-tune) →
   W-CON2 (warp-VERIFY + decided-scope eggs) → W-CON3 (?freeze seam + anomaly/resolved props).
   [The lib LACKS the re-fit + the freeze seam the slides copy has — adopting as-is REGRESSES both.
    These are glass-ui PRE-REQS, not slides work.]
2. AY perfects every other shared visual (aurora, blob, fourier, dock, slider, scale, glass, motion)
   — each closing on its OWN captured DELTA (the cardinal lesson).
3. AY closes: W-CARRY (register=deferral-set) → W-CLOSE1 (FINAL + proof:ay-final + overfitting audit
   + budget rebaseline).
4. [HINGE 1] W-PUB1 — master-merge + push v3.10.0 tag → release.yml gated provenance publish (USER).
5. slides RE-PIN: package.json "@mkbabb/glass-ui": "3.10.0" (replace the caret "^3.9.0" with the
   EXACT AY-published pin; contract-v2 invariant 30). `npm ci` resolves the new pin from the registry.
6. L.W-ADOPT — DELETE slides/src/decks/til-briefing/constellation.ts; consume
   @mkbabb/glass-ui/constellation across SlideTitle/SlideHandoff/SlideAsk; port the integration model
   (imperative DOM-scan controller → N declarative <Constellation> + a captured frame-budget DELTA
   proving no perf regression); re-author drawAnomaly as a drawOverlay; the warp + eggs + alpha tune
   come for free. proof:no-bespoke-constellation goes RED→GREEN (deletion + import proof).
7. [HINGE 2] L.W5 — forward-cut → merge-to-main → CF-Pages deploy (USER) → post-push live-200 probe
   + paired before/after DELTA capture (agent captures AFTER the user push).
```

Steps 1-3 are parallelizable AY work. Steps 5-6 CANNOT begin until step 4 lands. The prior plan had
step 6 (L.W-ADOPT) as a phantom row "gated on AY" with no step 4/5 between them — the re-pin was
missing entirely and the publish version was stale. This is the edge that slipped slides H→I→K→L (4
tranches): the swap is gated on a publish that keeps not happening, and nobody sequenced the publish
INTO the adoption wave.

L.W5's deploy gate must DECOMPOSE (the "pptx-200 in CI" + "e2e CI green" it cites do NOT exist —
slides `ci.yml` runs only `vue-tsc --noEmit` + `vite build`): (a) local build/conformance/capture
green [agent]; (b) the user-domain CF push [HINGE 2]; (c) the post-push live-200 + DELTA [agent]. The
fictional CI gates are removed or BUILT, not cited.

---

## §2 — the dependency edges (the real graph)

| # | edge (blocker → dependent) | why load-bearing |
|---|---|---|
| E1 | **W0-REGROUND → ALL Band A** | every impl wave inherits the stale ledger if it doesn't run first; ~7 waves would re-build green code |
| E2 | **W-DAG (spec-author) → ALL dispatch** | 0 AY specs, 3 phantom L specs; nothing is dispatchable until authored |
| E3 | **W-CARDINAL-INFRA → every visual wave's CLOSE** | the DELTA edge gates ~15 waves; unenforced prose today |
| E4 | **W-CON1 (refitField transpose-UP) → L.W-ADOPT** | adopting the lib REGRESSES resize re-fit unless the engine grows it FIRST (the lib LACKS what the bespoke copy has) |
| E5 | **W-CON3 (?freeze seam + anomaly props) → L.W-ADOPT** | the deploy pptx/shoot pipeline DEPENDS on `?freeze`; the lib has no such seam → deploy regresses |
| E6 | **W-CON3 + proof:no-bespoke-constellation (homed in SLIDES) → L.W-ADOPT** | the gate that closes the swap inspects SLIDES src, must live there |
| E7 | **W-PUB1 (publish, USER) → slides re-pin → L.W-ADOPT** | the caret `^3.9.0` must become the EXACT AY-published pin; the version arithmetic is stale before it ships |
| E8 | **W-CON1 (`--constellation-alpha` tune) ↔ L.W-ADOPT (engine swap)** | the deck won't READ the lib token until it swaps the engine; translucency falls in the repo gap a 3rd time if unsequenced |
| E9 | **W-DOCK3 progress-bar clause → L (NOT glass-ui)** | the "progress bar off the dock" half has NO glass-ui edit-site; a slides page-element concern mis-folded into an AY wave |
| E10 | **research-consume (W-AUR1/W-BLOB1/W-FF1) → their impl waves** | the research briefs are ALREADY authored (H-research-*); these are CONSUME-and-rank, not from-zero 32-agent re-runs |
| E11 | **W-GLASS / W-MOTION / W-A11Y-PERF → W-CLOSE1** | a "perfected library" cannot close with an opaque Drawer, a RED motion gate, dormant W55 |
| E12 | **W-CARRY (register=deferral-set) → W-CLOSE1** | the FINAL's "zero chronic-defer carry" claim is gate-FALSE (3 of ~25 rows) unless reconciled before close |
| E13 | **W-CON/W-BLOB content → W-GOD1** | the carve targets move when W-CON1 adds refitField + W-BLOB2 edits drawFrame; W-GOD1 carves AFTER (or it carves a moving target) |
| E14 | **L.W1 (settled copy) → L.W2/W3 → L.W4 (conformance sweep + cardinal-gate port)** | L.W4 also ports the cardinal gate (E3 twin) + resolves the OQs |
| E15 | **W-PUB1 ← W-CLOSE1 ← (ALL AY waves green)** | publish is the terminal AY node; cannot precede the close, which cannot precede every gate green |
| E16 | **(W-CON1/2/3 + W-BLOB2/3 + W-FF2-RG3 + W-DOCK2-RG1 + W-GOD1) → W-COHERE → W-CLOSE1** | the set-cohesion convergence (B2-gestalt) edits the CARVED blob+constellation SFCs and binds the FF light floor + the dock capture into a both-mode set DELTA; it runs LAST in the substrate band (after the carve) and BEFORE the close (the FINAL/overfitting audit reads the converged set, not four mismatched surfaces) |

---

## §3 — the 8 batches (HEAD → convergence)

Each batch is a barrier: every wave in batch N closes (gates green + DELTA where visual) before
batch N+1 dispatches. Within a batch, waves run in parallel (≤6-agent ceiling) — disjoint file
bounds. `[X-REPO]` = cross-repo edge; `[HINGE]` = user-domain manual gate.

### BATCH 0 — RE-GROUND + DAG-AUTHOR + INFRASTRUCTURE (blocks EVERYTHING; zero source risk)
| node | does | gate |
|---|---|---|
| **W0-REGROUND** | re-derive every AUDIT-LEDGER row vs AX PROGRESS + named gate + HEAD file:line; correct the ≥6 stale-shipped rows | re-grounded ledger; ZERO row marks undone what ships live-verified |
| **W-DAG** | author this DAG + every `waves/AY.W#-*.md` + the 3 phantom `L/waves/L.W-{ADOPT,MOB,CHR}.md`; reconcile the numbering | `proof:wave-inventory-coherent` (every §2 id has a spec; every spec id in §2; L set reconciled) |
| **W-CARDINAL-INFRA** | mint `AY/PROGRESS.md` + `AY/audit/visual/`; tranche-parameterize `proof:live-verified-ledger` (cover `complete`, match-filename, depth-header); PORT to `slides/scripts/` | born-RED against the 6 AX `complete`-exempt rows; reads BOTH tranche paths; slides port green |

Rationale: the prerequisite EVERY synthesis lane demands. Zero source risk (docs + gate scripts), so
it parallelizes cleanly and unblocks correct dispatch of all else.

### BATCH 1 — RESEARCH-CONSUME + COHESION-BLOCKER FIX
| node | does | gate |
|---|---|---|
| **W-AUR1** | consume `H-research-aurora`'s falsifiable bar; produce `aurora/RESEARCH.md` + the NUMERIC arresting metric | RESEARCH.md + N-bound gate (not `≥N` placeholder) |
| **W-BLOB1** | TARGETED audit of the OPEN blob items (NOT a settled-question re-sweep); consume `H-research-blob` | ranked path; default-identity decision recorded |
| **W-FF1** | rebase the born-RED AX.W43 spec to HEAD (the path-forward exists TWICE) | the rebased spec + the cross-repo math-duplication decision |
| **W-DOCK1** | VERIFY-OR-FALSIFY the items-lag (capture the live collapse) | the lag captured or falsified |
| **W-GLASS** (net-new BLOCKER) | re-author `.glass-drawer` onto `glass-floating`; route Slider onto `--glass-level`; opt-in specular; `proof:glass-cohesion` | every glass surface flattens at level:0 (π readback incl. Drawer+Slider) |
| **W-MOTION** (net-new) | re-point off-doctrine survivors; widen `proof:animation-coherence` + register-assignment; CI-promote green | gate GREEN + CI-tagged + register-asserting |

### BATCH 2 — COMPONENT PERFECTION IMPL (each closes on a captured DELTA; names `proof:live-verified-ledger`)
| node | does | DELTA gate |
|---|---|---|
| **W-CON1** | `refitField` transpose-UP (E4); auto-drift target-source; `--constellation-alpha` both-mode tune | RO re-fit bbox-coverage π; auto-drift cadence; alpha both modes |
| **W-CON2** | warp VERIFY (capture, don't re-build — AX.W17); decided-scope eggs (gravity-well engine; supernova demo-only; konami CUT); ω-derivation reconcile | warp DELTA + `proof:constellation-egg-live` |
| **W-CON3** | `?freeze` seam + anomaly/resolved props (E5); export-ready VERIFY; the slides-side gate spec | `?freeze` deterministic capture; props/drawOverlay recipe |
| **W-AUR2** | strike the done OKLAB/atoms; the derive-color PROP sliver only | doc reconciliation; existing gates cited |
| **W-AUR-PAINTERLY** | tune the painterly mediums to MEET the arresting metric; capture the DELTA (NONE exists) | the metric ≥ threshold on REAL-GPU + per-medium DELTA light+dark |
| **W-AUR-WEBGPU-DECIDE** | retire the medium-less WGSL twin OR resurrect with a named consumer | deletion proof OR named-consumer Kuwahara capture |
| **W-BLOB2** | light OKLCh default base (the default is a DARK coffee-bean); simplify to atoms | default-warmth π born-RED→GREEN; goo-blob/blob-mood DELTA |
| **W-BLOB3** | interaction + frame-budget; bind consumer #2 OR book demo-only + strip the DI | hover-flick + dome-luma BAND DELTA |
| **W-FF2** | LAND the W43 intensity model; `intensity` prop; 3-substrate parity; delete `evalFourier` | `final` preset reads (not a corner stub); 3-substrate DELTA |
| **W-DOCK2** | real entering-child onset gate (retire the tautology); stagger reconcile; ONE DOCK_SPRING; rail | the LAST entering child onset ≤ budget; lockstep DELTA |
| **W-DOCK3** | author the missing dock-with-slider story; capture the drag; progress-bar RE-HOMED to L (E9) | dock+slider captured; progress-bar clause moved to L |
| **W-SLD1** | reconcile the rounded-knob-vs-cylinder CONTRADICTION (user-judged capture); spectrum fidelity | user-judged design DELTA |
| **W-SLD2** | consumer-boundary gate clause | the fifth clause REDs on `variant="rounded"` |

### BATCH 3 — LIBRARY SYSTEMS + STORYBOOK + DOCS + A11Y/PERF + CONVERGE
| node | does | gate |
|---|---|---|
| **W-SCALE1/2** | EXTEND `--ui-scale` to form-atom hit-area + desktop-fluid ladder; REAL axe target-size harness (`proof:touch-target` is PHANTOM) | axe target-size pass on coarse; fluid ladder grew |
| **W-A11Y-PERF** | engage W55 by default (DORMANT); webkit prefix in dist; rAF-coalesce specular; frame-budget gate; glass-aware contrast oracle | π contrast over the ACTUAL shipping glass-over-bright ≥4.5:1 |
| **W-SB1/2/3** | per-route KEEP/FIX/RETIRE; orphan component-retire (route-prune ≠ component-retire); native-top-layer FOLD; real language gate | extended `proof:no-orphan-demo-route` + orphan-retire proofs |
| **W-DOC1** | quality-uplift the 4 EXISTING READMEs (NOT a from-zero write); strip provenance meta | each README cites its `RESEARCH.md` |
| **W-IC1** | the instrument-chassis scope decision (UNDER-EXAMINED) | decision recorded |
| **W-CONVERGE** (net-new) | per-major-component glass-ui↔slides FIT audit (feeds L.W-ADOPT inventory) | per-component keep/extend/fix dispositions |

### BATCH 4 — STRUCTURE + LEGACY + CARRY + OWED-DELTA (pre-publish)
| node | does | gate |
|---|---|---|
| **W-GOD1** + **W-COLOCATE** | carve the 4 god-modules <500 (return-shape byte-identity — WIRE the orphan `proof:composable-return-types`); the sub-component-dir colocation restructure (the BIG reading) | `proof:no-god-module` CI green + .css-aware; return shapes machine-proven |
| **W-CSS1** | CSS monolith carves cascade-order-safe; the .css-aware gate; the var-in-arbitrary rule | gate green; bundle byte-equivalent |
| **W-LEG1** | author the legacy gates (AX W27a/b NEVER written — ~690 survivors); the commentary disposition | no-retired-survivor + tag-parity (0 orphans) + var-in-arbitrary green |
| **W-DELTA0** (ex-DRAFT W0) | owed-DELTA backfill (W56 squircle + the 6 AX visual `complete`-exempt rows) | each owed row carries an own-surface DELTA |
| **W-CONSUMER** (ex-DRAFT W5) | the consumer-staleness ledger (`proof:consumer-staleness` born-RED on 12 stale imports) | green after the consumer re-pins land |
| **W-CARRY** (net-new) | onboard the full AT BOOK backlog; encode G-4/G-5/G-6; a register-completeness clause | register-row-count = ledger-BOOK-count |
| **W-LIVE1** | the local-only live-gate CI decision; the cardinal-gate `complete`-coverage hardening | decision + (Branch B) lane green |
| **W-COHERE** (net-new; E16) | the four substrates as ONE set (B2-gestalt): blob mood→warm-register + ambient shadow (off the cartoon stamp), constellation `opacityCeiling` recession envelope (the 3-of-4 parity gap), the set-level `proof:substrate-cohesion` gate + a both-mode set DELTA. Runs LAST in the substrate band (edits the W-GOD1-carved SFCs); binds W-FF2-RG3 (FF light floor) + W-DOCK2-RG1 (dock capture) into G4 | `proof:substrate-cohesion` born-RED→GREEN (ONE accent / ONE recession / ONE shadow) + the four-substrate both-mode set DELTA |

### BATCH 5 — AY TERMINAL CLOSE → PUBLISH [HINGE 1]
| node | does | gate |
|---|---|---|
| **W-CLOSE1** | overfitting audit (orphan-scan: `evalFourier` + the library-orphans); FINAL.md; AUTHOR `proof:ay-final` (its clauses specified); budget rebaseline; squircle panel-membership reconcile | `proof:ay-final` green (requires the AY-pathed cardinal gate + W-CARRY green); FINAL written |
| **W-TRIAGE** (ex-DRAFT W8) | the residual-planned umbrella (W20/W21/W28-32/W35/W39/W41-43/W49); the W-DECK deck-chassis lift decision | each residual disposed; W-DECK decision recorded |
| **W-NDA** | the native-drawer WATCH row — trigger re-eval | trigger re-eval green (un-MET → stays booked) |
| **[HINGE 1] W-PUB1** | master-merge + push the `v3.10.0` tag → release.yml gated provenance publish (USER) | tag + npm provenance; the published version is the slides re-pin target (E7) |

### BATCH 6 — SLIDES CONTENT (PARALLEL with AY batches 1-5; the L Track A body, NOT gated on AY)
This batch consumes the ALREADY-shipped 3.9.0 — it is content/copy/mobile/chrome work, INDEPENDENT
of the AY publish. Only L.W-ADOPT is AY-gated; the rest of L is not (the parallel-slack insight the
prose ordering misses).
| node | does | gate |
|---|---|---|
| **L.W0-REGROUND** | reconcile `L.md`↔`L-DRAFT.md`↔`waves/`; re-verify the stale 11-slide mobile verdicts vs the live 7-slide manifest | the L set reconciled (twin of W0-REGROUND) |
| **L.W1** | the 5/6/7 ground-up rebuild WITH the xray-redolent token/composition spec (UNDER-SPECCED today); the resolved-bookend fix (on TWO slides; gate greps the WRONG attr) | machine gates per H-slides-567 (not eyeball); single-close=1 |
| **L.W2** | the P0s with the ~$5M facts pulled FORWARD (§F constrains them — break the circular dep) | the 3 P0s resolved; captured DELTA |
| **L.W3** | P1 redundancy with a DELETION-PROOF gate (grep-count can't see paraphrase) | redundancy gone (deletion proof) |
| **L.W4** | conformance-gate re-arch (inline-wrapper-collapse + em-dash-pre-scan KISS fix); the cardinal-gate slides-port (E3 twin); OQ decisions table (OQ25 RESOLVED-superseded @ 3765d52) | extended gate green + the slides cardinal gate green |
| **L.W-MOB** (AUTHOR) | a manifest↔position contract gate + per-slide portrait captures vs the CURRENT 7-slide manifest (stale 11-slide verdicts); the occlusion gate REAL (bbox-disjoint, not min-height; axe stood up or re-stated) | per-slide portrait DELTA; real occlusion gate; depends on L.W1 (slide count) |
| **L.W-CHR** (AUTHOR, re-scoped) | the ONE live defect: the at-rest locked-blur INVERSION (modal + pptx popover ALREADY shipped — verify, don't re-build); the 11→7 stale-count sweep | locked-blur captured; stale-count sweep |

L Track B (L.W6/L.W7) can run anytime after L.W0 (independent of Track A). Placed here for
close-batching convenience; no AY edge.
| node | does | gate |
|---|---|---|
| **L.W6** | feedback-coder honesty: the 0.72 is L2 macro-F1 NOT "balanced accuracy" — correct the name; the retracted "two humans also land at 0.72" floor is STILL live (cite + decide); the 1,845 forms-vs-recall reframe; the S5 sourced beats; research audience default + policymaker user-gate | corrected-metric grep gate; the 3 retracted-floor sites cited + decided; captured S4/S5 DELTA |
| **L.W7** | J-docs: `git log deck/feedback-coder ^main` = 2 doc commits, 0 code (J is an UNEXECUTED plan) — KILL option-B phantom-fold; A-clean (path-scoped cherry-pick of `docs/tranches/J/**`, marked unexecuted) OR delete the branch | J docs on main with the unexecuted-marker OR branch gone; decision recorded |

### BATCH 7 — SLIDES ADOPT + DEPLOY [HINGE 2] (gated on BATCH 5 HINGE 1)
| node | does | gate |
|---|---|---|
| **slides re-pin** (E7) | replace `"^3.9.0"` with the EXACT AY-published `"3.10.0"`; `npm ci` resolves from registry | the pin is exact (not a caret); build resolves the new lib |
| **L.W-ADOPT** (AUTHOR) | DELETE bespoke `constellation.ts`; consume `/constellation` (warp+eggs+alpha free); port the integration model (DOM-scan → N SFCs + frame-budget DELTA); re-author drawAnomaly as drawOverlay; the befitting-component inventory (the deck-CHASSIS is the W-DECK elephant); `proof:no-bespoke-constellation` RED→GREEN | deletion proof + import resolves + frame-budget DELTA (no perf regression) + `?freeze` static captures render identically |
| **[HINGE 2] L.W5** | forward-cut → merge-to-main → CF-Pages deploy (USER); the gate DECOMPOSED (local green [agent] → user push [HINGE] → post-push live-200 + paired DELTA [agent]); the fictional pptx-200-in-CI clause removed or BUILT; HARD BOUNDARIES preserved | `slides.friday.institute/til-briefing` 200 + paired before/after DELTA |

---

## §4 — the critical path (the longest dependency chain HEAD → convergence)

```
HEAD (at-dock-convergence)
 └─ W0-REGROUND + W-DAG + W-CARDINAL-INFRA          [BATCH 0]
     └─ W-CON1 (refitField transpose-UP)            [BATCH 2 — E4]
         └─ W-CON2 (warp verify + eggs)             [BATCH 2]
             └─ W-CON3 (?freeze seam + anomaly props)[BATCH 2 — E5]
                 └─ W-CARRY + W-CLOSE1 (AY close)    [BATCH 4/5 — E12]
                     └─ [HINGE 1] W-PUB1 (publish v3.10) [BATCH 5 — USER]
                         └─ slides re-pin (^3.9 → 3.10)  [BATCH 7 — E7]
                             └─ L.W-ADOPT (delete bespoke, consume) [BATCH 7 — E6]
                                 └─ [HINGE 2] L.W5 (deploy + DELTA)  [BATCH 7 — USER]
                                     └─ CONVERGENCE
```

The critical path is the CONSTELLATION CONVERGENCE chain — the engagement's headline "exemplar to
KILL." Every other AY band (aurora/blob/fourier/dock/slider/scale/glass/motion/a11y/storybook/structure)
is PARALLEL slack off this spine, as is the entire L Track A content body (Batch 6). The two
user-domain hinges sit ON this critical path; they are the only nodes the agents cannot self-close.
Front-loading the constellation chain (W-CON1/2/3 in the FIRST impl batch) is what unblocks the
slides headline soonest.

---

## §5 — the cardinal-lesson DELTA discipline (the close-edge on ~15 waves)

Every VISUAL-load-bearing wave (every Band-A node, W-GLASS, W-A11Y-PERF, W-SB3, the L visual waves,
L.W5) NAMES `proof:live-verified-ledger` as a close-edge — NOT prose "capture." Each wave's DELTA
references ≥1 PNG OF ITS OWN SURFACE at ≥2 viewports × {light,dark}. W-CARDINAL-INFRA mints the
AY-path + slides-port; W-LIVE1 hardens the `complete`-coverage + filename-match + depth-header. A
green source gate over a still-broken live render is NOT done — the STOP bar is "all gates green AND
every visual-load-bearing row has a fresh on-disk PNG DELTA."

The founding chronic the gate forbids: 7 AX waves were marked `live-verified` with 0 captured PNG.
The gate is AX-hardcoded + `complete`-exempt today; AY/slides are entirely unguarded. Batch 0's
W-CARDINAL-INFRA closes that — it is the prerequisite that makes every downstream visual wave's close
ENFORCED rather than prose.
