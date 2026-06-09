# AY / slides-L — the recap ledger (every standing prompt × status × fold-target)

**RE-GROUNDED to HEAD (`at-dock-convergence`) per AY.W0-REGROUND.** The original ledger was
authored when the 32-agent audit hit the session limit and was NEVER re-synced to AX HEAD — it
marked ≥6 shipped+gated features UNADDRESSED/DEFERRED/CHRONIC, which would have dispatched agents to
RE-BUILD green code. This pass re-verifies every row against AX `PROGRESS.md` + the named proof gate
+ live source file:line (the AT W0-L4 format), per the 30-lane hardening synthesis
(`hardening/H-convergence.md`, `H-precept-drift.md`, `H-past-conversation.md`, `H-chronic-defer.md`,
`H-overfitting.md` — six lanes independently caught the same mis-marked rows).

Status ∈ DONE-VERIFY (shipped+gated; AY captures the owed DELTA, does NOT re-build) · PARTIAL (the
narrow residue named) · OPEN (genuine remaining work) · DEBT (cardinal-lesson carry) · NET-NEW.
Keyed to `PROMPT-CORPUS.md`.

## §A — governing precepts (standing; applied per-wave, not "done")
| precept | status | note |
|---|---|---|
| no quick/workaround/legacy/fallback; idiomatic gestalt | STANDING | enforce per wave; W-LEG1 hardens the gate |
| no god-modules (>500) / nested imports / tests-in-src; DRY/KISS; colocation | PARTIAL | 4 god-modules remain (W-GOD1/W-CSS1/W-COLOCATE); `proof:no-god-module` is local + .css-blind (CI-promote at W-GOD1) |
| idiomatic Tailwind / colocated idioms / no fragile CSS | PARTIAL | W-CSS1 carve + W-COLOCATE design-idiom home (the un-addressed localized-idiom axis) |
| triumvirate research→plan→harden→synthesize loop | DONE (this phase) | the 30-lane hardening pass + this re-ground IS the synthesize leg |
| language: Signs-of-AI-writing; unspaced em dashes; keep levity; value-prop align | PARTIAL | slides deck arm clean (proof:deck-copy-conformance); gate blind to rule-8/rule-2 (L.W4); src/ provenance survivors (W-LEG1 decides) |
| cardinal lesson: complete ONLY on a captured live DELTA | DEBT | the gate is AX-hardcoded + `complete`-exempt; AY/slides unguarded → W-CARDINAL-INFRA + W-LIVE1 |
| the plan is the defect; re-ground before dispatch | DONE (W0-REGROUND) | this ledger IS the re-ground; W-DAG authors the specs + DAG |

## §B — glass-ui root-cause (the AY tranche)
| # | item | status | HEAD evidence | fold |
|---|---|---|---|---|
| 1 | Constellation → first-class glass-ui, slides consumes it | **DONE-VERIFY (lib) · OPEN (consume)** | EXPORTED `/constellation` `package.json:323`; api types `api/index.ts:209-221`; landed `45cfb79` (AX.W17). Slides still ships bespoke `constellation.ts` (547 lines) — NOT consuming | W-CON3 (export VERIFY + ?freeze seam + anomaly props) → L.W-ADOPT (delete bespoke) |
| 2 | click WARPS anomaly/found dot → nearest cursor point + easter eggs | **DONE-VERIFY (warp) · OPEN (eggs)** | warp SHIPPED AX.W17 (`45cfb79`; `Constellation.vue:246-279`, `constellationField.ts:337-355`, 27 refs); `proof:constellation-warp-live` green. Was MIS-MARKED "UNADDRESSED" | W-CON2 (capture warp DELTA; decided-scope eggs — gravity-well engine, supernova demo, konami CUT) |
| 3 | constellation more translucent (light+dark) | **DONE-VERIFY (token) · OPEN (re-fit)** | `--constellation-alpha` per-mode `tokens.css:495-512`/`:2058-2071` (0.80/0.88). The BLOCKER residue: the RO resize re-fit lives ONLY in the slides bespoke copy — adopting the lib REGRESSES it | W-CON1 (transpose-UP `refitField` + auto-drift source + both-mode tune) |
| 4 | touch-target + font-size GENERAL increase (mobile+desktop) | **DONE-VERIFY (system) · PARTIAL (residue)** | `--ui-scale` master scalar + `--control-floor`/WCAG-44 clamp + coarse 1.5× SHIPPED AX.W51 (`7952cd1`; `tokens.css:1172,1184-1205,1785-1788`, 37 refs); `proof:ui-scale` green. Was MIS-MARKED "DEFERRED — no system." Residue: form-atoms off the axis (Switch/Checkbox/Radio/Slider/MultiSelect) + the desktop-fluid BODY ladder (only φ-display is fluid) + the phantom `proof:touch-target` | W-SCALE1 (EXTEND, desktop-fluid) + W-SCALE2 (form-atom hit-area utility + REAL axe gate) — NOT re-build |
| 5 | dock ios-springy shell↔items LOCKSTEP; layering/rail; dock-with-slider | **DONE-VERIFY (one-scalar) · OPEN (entering-child gate)** | ONE `--dock-morph-t` scalar morph SHIPPED (`dockMorphContext.ts:121-239`); `proof:dock-animation-live` green BUT TAUTOLOGICAL (box-vs-its-own-scalar; samples LEAVING child only). The user's lag is the entering-child stagger (0.4 window ≈ 150ms), never asserted. Was MIS-MARKED "CHRONIC — unsolved" | W-DOCK1 (VERIFY-OR-FALSIFY) + W-DOCK2 (REAL entering-child onset gate; retire the tautology) |
| 6 | aurora SOTA (OKLAB/OKLCH, WebGPU, van-Gogh oil-pastel, derive-color, simplify) | **DONE-VERIFY (migration/atoms · derive-color prop RETIRED) · OPEN (artistic bar)** | FULL OKLAB/OKLCH in-shader + atoms-door + derive-color composable LANDED AX W07-W14 (`composition.glsl.ts:21`, `atoms.ts:89-127`, `aurora.frag.ts:308`, `color.ts:169`); gates `proof:aurora-oklch-interp`/`-space-gamma`/`-atoms-roundtrip` green. W-AUR2 STRUCK these as done (doc reconciliation) and RETIRED the `<Aurora derive-color>` prop: zero named consumer at HEAD; the `deriveAurora` composable + the atoms COLOR door already serve every known route, so a prop is substrate-without-consumer (L inv 8). The named `mood` atom folded into `colorEnergy`/`temperatureShift` (`atoms.ts:154`) — no live `mood` atom. The "stunning van-Gogh" bar UNMET — `proof:aurora-painterly-statistics` wrote `status:fail` (born-RED, never passed live). WebGPU twin is medium-less (excised AX.W14) | W-AUR2 DONE (doc strike + prop RETIRE); W-AUR1 (the falsifiable arresting metric) + W-AUR-PAINTERLY (born-RED bar) + W-AUR-WEBGPU-DECIDE |
| 7 | blob SOTA (visual/animation/interaction; perf) | **PARTIAL (dark default defect)** | shader at SOTA per AX synthesis ("no algorithm changes needed"). The DEFAULT renders a DARK coffee-bean (`color=var(--primary)`+`rimColor=var(--foreground)`, both near-black), not the "warm-cream bead" every doc claims (the README↔reality lie). 50-knob sprawl unsimplified; NO consumer #2 (the value.js DI seam built for a consumer that never arrived) | W-BLOB1 (TARGETED audit) + W-BLOB2 (light default + atoms) + W-BLOB3 (consumer-#2 decision) |
| 8 | fourier-field SOTA fold (AX W43) | **DONE-VERIFY (element) · OPEN (W43 intensity NEVER landed)** | element EXISTS + exported `/fourier-field` (`package.json:299`; element pre-AX, no landed-SHA — W43 spec born-RED, unbuilt) + LIVE-consumed (fourier-analysis + feedback-coder). Was MIS-MARKED "DEFERRED — research-only." BUT W43 NEVER landed: `OUTLINE_PEAK_ALPHA=0.24` survives (5 refs), quadratic decay, the `final` preset is a corner stub (VISIBLY BROKEN). The ≥2nd consumer is LIVE (fourier-analysis carries a byte-equivalent math copy) | W-FF1 (rebase the born-RED W43 spec) + W-FF2 (LAND the intensity model + 3-substrate parity + cross-repo math decision; delete dead `evalFourier`) |
| 9 | slider zoo → glass-scrubber(rounded iOS knob)+spectrum; migrate consumers | **DONE** | zoo COLLAPSED to EXACTLY `standard`+`spectrum` AX.W59 (`a730782`; `slider/index.ts:42-45`); `proof:slider-two-only` CI green. The design contradiction is RESOLVED AY.W-SLD1 via resolution (b) revert+invert-gate (user-directed per PROMPT-CORPUS:51 standing preference): the standard thumb is now the FULLY ROUNDED iOS knob (`Slider.vue` `border-radius: 50%` over `aspect-ratio: 1`, riding the continuous glass fill); `proof:slider-two-only`'s shape clause INVERTED to REQUIRE the 50% circle (was REDDENing it). D2 spectrum round-fallback lifted off bare `--radius-lg` to a proportional squircle-adjacent radius. Captured `W-SLD1-DELTA.md` (live `/forms/slider` light+dark). speedtest already on the two-only API | DONE — W-SLD1 closed; W-SLD2 (consumer-boundary gate) follows |
| 10 | dock-with-slider broken | **DONE-VERIFY (contract) · OPEN (DELTA + story)** | `keepDockOpen` contract wired (`Slider.vue:30`, `useDockHold`, `morph.css:165`); `proof:dock-hold-contract` green. NO captured live DELTA; CLAUDE.md cites `demo/stories/compositions/dock-with-slider.vue` which DOES NOT EXIST | W-DOCK3 (author the story + capture the drag; progress-bar-off-dock re-homed to L) |
| 11 | storybook prune + restructure (the "wtf is X" routes) + consistent languages | **DONE-VERIFY (IA) · OPEN (per-route + orphans)** | IA restructure + disco-glyph/glyph-face excise + blob consolidate + speedtest boundary SHIPPED AX.W18/W19; gates green. Half the named routes don't exist. Residue: orphan COMPONENTS (header-ribbon/glass-panel/useTokenColor — route-prune ≠ component-retire) + native-top-layer FOLD + scattered-dock triage + metric co-locate | W-SB1 (per-route verdict + component-retire) + W-SB2 (restructure) + W-SB3 (real language gate) |
| 12 | instrument-chassis removal (slides) / retention (glass-ui) | **OPEN (under-examined)** | scope unconfirmed; NO focused hardening lane challenged it | W-IC1 (the scope decision) |
| 13 | encapsulation/DI/boundaries; no legacy codepaths | **DONE-VERIFY (DI) · PARTIAL (god-modules/legacy)** | createStrictContext DI CLOSED (AV.W14, `proof:di-consistency` CI green) — do NOT re-litigate. Residue: 4 god-modules + the unwritten legacy gates | W-GOD1/W-CSS1/W-LEG1/W-COLOCATE |
| 14 | storybook perfected + every component; research-backed READMEs (dock/constellation/aurora/blob) | **DONE-VERIFY (READMEs exist) · OPEN (quality-uplift)** | all 4 READMEs EXIST (aurora 702, blob 422, dock 299, constellation 381 lines). Was MIS-MARKED "DEFERRED." Residue: research-backed quality-uplift + strip the provenance meta-language | W-DOC1 (quality-uplift, NOT from-zero write) + the W-*1 research |

## §B.1 — net-new glass-ui obligations (no owning wave in the original plan)
| item | status | source | fold |
|---|---|---|---|
| TOTAL glass cohesion — `.glass-drawer` is OPAQUE (BLOCKER); Slider off `--glass-level`; Notification off-ladder; always-wired specular (keyframes-I.W6); no inventory-complete gate | **NET-NEW (BLOCKER)** | H-glass-cohesion F1-F6 | W-GLASS |
| ONE motion doctrine — `--dock-press-spring` off-doctrine; cartoon-surface violates §6; `proof:animation-coherence` RED + NOT in CI + too-narrow; Toast on tw-animate-css | **NET-NEW** | H-motion-cohesion F1-F9 | W-MOTION |
| a11y/perf/Safari — W55 DORMANT (0 opt-in); unprefixed backdrop-filter Safari trap; specular layout-thrash; maximal-glass cost ungated; stale dark-contrast oracle | **NET-NEW** | H-a11y-perf H-1..H-6 | W-A11Y-PERF |
| per-component frontend-design convergence (glass-ui↔slides FIT) | **NET-NEW** | H-past-conversation §a | W-CONVERGE |
| colocation / sub-component-dir / localized design-idiom | **NET-NEW** | H-past-conversation §b/§c | W-COLOCATE (+ W-GOD1/W-CSS1 widen) |
| carry-closure register completeness (3 of ~25 booked; G-4/G-5/G-6 promised-never-encoded) | **NET-NEW** | H-chronic-defer §1-§6 | W-CARRY |
| cardinal-gate AY-path + slides-port + `complete`-coverage | **DEBT → NET-NEW** | H-cardinal Holes #1-#4 | W-CARDINAL-INFRA + W-LIVE1 |
| the 7 AX `dev-landed · live-pending (DELTA owed)` carriers (W19/W45/W52/W53/W56/W57/W59) + the 6 visual `complete`-exempt (W05/W08/W15/W16/W17/W23) | **DEBT** | H-convergence E3, H-cardinal §6 | W-DELTA0 (+ every visual wave names the gate) |

## §C — slides til-briefing (the L tranche)
| # | item | status | HEAD evidence | fold |
|---|---|---|---|---|
| 15 | 5/6/7 ground-up cohesive rebuild | PARTIAL | K.W1 single-close landed; still incohesive → full rebuild (xray-redolent UNDER-SPECCED, no tokens) | L.W1 |
| 16 | xray slide redolent of real site + two-column + show-more + real links; de-dup URL | PARTIAL | de-dup DONE-IN-K; redolence UNDER-SPECCED. The headline string is WRONG in every doc (real site: "Nutrition facts for the models you rely on", not "for LLMs"); the blue is a KNOCKOUT BLOCK, not ink | L.W1 |
| 17 | nutrition-label claim UNTRUE → reword true | OPEN | `SlideAsk.vue:75` "will publish" still a universal-future claim about zero-existent feeds | L.W1 |
| 18 | ~$5M cut off (slide 2) | DONE (session) | `SlideProblem` safe-center @ 3765d52 — verify in capture | L.W2 verify |
| 19 | slide renames to position/function | DONE | SlideTitle/Problem/Loop/Monitoring/Handoff/Xray/Ask @ 3765d52 | — |
| 20 | don't name Pitt → "a county" + hypothetical framing | PARTIAL | G.W4 reframed to "a county"; the what-if framing not applied | L.W3 |
| 21 | "People and AI" caption overlap under headline | OPEN | SlideLoop layout | L.W3 |
| 22 | ~$5M arithmetic honest (what it covers) | OPEN | the deck's most-probable on-stage failure; `PROMPT-CORPUS §F` already constrains it (break the circular dep) | L.W2 |
| 23 | constellation on every befitting slide (7 missing); translucency | PARTIAL | `data-anomaly-label="resolved"` on BOTH Handoff AND Ask (the bookend the K restructure claimed to move); translucency falls in the repo gap until L.W-ADOPT swaps the engine | L.W1 + W-CON1 |
| 24 | mobile: squish/negative-space/xray-full-height/remove Open-AI-XRAY-btn/graph-aspect/no-occlusion | **DONE-VERIFY (most) · OPEN (occlusion)** | Open-AI-XRAY-btn / xray-full-height / AI-does-list overlap ALL DONE on the renamed slides. Verdicts were against a STALE 11-slide set (deck winnowed 11→7). Real OPEN: graph aspect + occlusion on the renamed/rebuilt complex slides; a manifest↔position contract gate | L.W-MOB (AUTHOR; depends on L.W1 slide count) |
| 25 | access-key modal glass-styled; locked slides blurred + lock symbol | **DONE-VERIFY (modal) · OPEN (locked-blur inversion)** | `DeckGate.vue` ALREADY glass-ui-styled. Was MIS-MARKED "DEFERRED — not done." The ONE live defect: the locked-blur is INVERTED (blurs on hover, not at rest) | L.W-CHR (AUTHOR, re-scoped to the inversion) |
| 26 | pptx download icon + light/dark popover | **DONE-VERIFY** | `DeckSettings.vue:53-72` complete gear popover + light/dark submenu. Was MIS-MARKED "DEFERRED — not built" | L.W-CHR (verify-survive) |
| 27 | named language rewrites | PARTIAL | most landed K.W3; "Let's work together" is itself rule-8 (glyph-fragmented `<em>work<svg/></em>`) | L.W2/L.W4 |
| 28 | slides consume glass-ui for every befitting component; converge library optimum | PARTIAL | uses many; constellation bespoke (the exemplar). The deck-CHASSIS (`src/deck/` marked "consumer #1 of the eventual /deck") is the unaddressed elephant; the feedback-coder Fourier arm is a 2nd bespoke-copy CLASS | L.W-ADOPT + W-CONVERGE + W-TRIAGE (W-DECK decision) |

## §D — slides feedback-coder (the L tranche)
| # | item | status | HEAD evidence | fold |
|---|---|---|---|---|
| 29 | feedback-coder honesty pass + J-docs un-strand | OPEN | 0.72 is L2 macro-F1 (`REPORT.md:28,77`), the deck calls it "balanced" (reads as balanced-accuracy, a DIFFERENT statistic); the RETRACTED "two humans also land at 0.72" floor is STILL live (`BRIEF.md:66-67`, `PRESENTATION.md:42-43,67-69` — flagged I, marked-LANDED I, still-live); J = 2 doc commits, 0 code (UNEXECUTED plan) | L.W6 (corrected-metric gate) + L.W7 (A-clean or delete; KILL option-B) |

## §E — process
| # | item | status | fold |
|---|---|---|---|
| 30 | recap all prompts; augment-not-replace; delineate chronic; 30+ waves; multi-agent loops; modern-web-guidance | DONE (this re-ground) | this re-grounded ledger + the 30-lane hardening + the AY/L rewrite + the EXECUTION-DAG |

## Chronically-deferred (carried ≥2 tranches — the corrected register)
- **Cardinal-lesson captured DELTA** (the #1 meta-chronic) — keyframes.js→AX→AY (3+). Gate is AX-hardcoded + `complete`-exempt; AY/slides unguarded. → W-CARDINAL-INFRA + W-LIVE1 + every visual wave's gate.
- **Constellation-as-consumed-glass-ui** (+bespoke kill) — slides H→I→K→L; gated on a publish that keeps not happening. The re-fit lives ONLY in the bespoke copy (transpose UP first). → W-CON1/2/3 → L.W-ADOPT.
- **Aurora/Blob "stunning" artistic bar** — AS→AT→AU→AW→AX→AY (5+). Core unblocked, the bar never operationalized; no captured painterly DELTA; born-RED gate. → W-AUR-PAINTERLY + W-BLOB2.
- **Dock items-lag perceptual lockstep** — code landed, the gate is tautological, the perceptual DELTA never captured. → W-DOCK1/W-DOCK2.
- **Fourier W43 intensity model** — the path-forward exists TWICE; re-producing a doc instead of LANDING the fix. → W-FF2.
- **Slider design-intent (rounded knob)** — re-stated each tranche's corpus, never reconciled against the shipped cap. → W-SLD1.
- **keyframes-I.W6 specular non-cohesion** — misdiagnosed (folded to the wrong W54 axis), then dropped from AY entirely. → W-GLASS.
- **Slides mobile polish** — F→H→AX→L (4). Real fixes land, declared done vs a stale capture, re-reported. → L.W-MOB (manifest-bound).
- **feedback-coder retracted-floor + J-strand** — I→J(branch)→L. → L.W6 + L.W7.
- **The BOOK backlog gate-invisible** (3 of ~25) + G-4/G-5/G-6 promised-never-encoded. → W-CARRY.

## Executive read (corrected)
The library code is in genuinely good shape. The PLAN was the defect. Genuinely DONE (verify-only,
do-NOT-rebuild — see AY.md §0.1): constellation warp + export + tokens, `--ui-scale` system, slider
two-only collapse, fourier export, aurora OKLCh/atoms migration, the 4 READMEs, the dock one-scalar
morph, DI/boundaries, the IA restructure, the access modal + pptx popover. The GENUINE OPEN set is:
the constellation re-fit/drift/eggs + adoption, the aurora artistic bar (born-RED), the blob
dark-default, the fourier W43 intensity model, the dock entering-child lockstep gate, the slider
design-intent contradiction, the slides 5/6/7 rebuild + mobile occlusion + chrome locked-blur, the
feedback-coder metric honesty — PLUS the net-new cohesion BLOCKERS (the opaque Drawer, the RED motion
gate, dormant W55), the colocation/convergence directives, the carry-closure completeness, the
cardinal-gate infrastructure, and the AX close (god-modules, legacy, FINAL, publish). These define AY
(~34 waves, 6 bands) + L (~12 waves). The execution DAG is `../EXECUTION-DAG.md`.
