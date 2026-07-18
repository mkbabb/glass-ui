<!-- SALVAGE provenance: wf_14cac4b8-0a9 seat redo:cg-research-infer (RU-19) — un-journaled write from a seat killed at WALL #8 (session limit, reset 7:10am ET 2026-07-18); preserved per the user salvage edict 2026-07-18; the resumed seat re-runs ANEW — this copy is UNION-time context only -->

# REFABLE-RU-19 — Component-graph RESEARCH + INFER redo (the inference layer)

- **Unit:** RU-19
- **Edict:** Re-derive the inference layer from `component-graph.json` + component sources with own
  thresholds/method (RF-7 hardening routings honored); then scrutinize the opus PROCESS.md +
  INFERENCE.md (+ role-census.md, duplication-candidates.md) assume-incorrect; UNION.
- **Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
  claude-fable-5"). Prior INFER seat: opus.
- **Step-2 boundary:** 2026-07-18 06:43:02 EDT — everything in the ANEW column below (weight
  recovery, hardened re-score, guard design, source verdicts, role re-inference) was derived from
  component-graph.json + src/ + the Fable artifacts (RF-7, RU-09) before any opus inference artifact
  was opened. PROCESS.md §3a.6/§3b/§3d, INFERENCE.md, role-census.md, duplication-candidates.md were
  read only after the boundary.
- **Artifacts rewritten:** `../component-graph/INFERENCE.md` REWRITTEN IN PLACE as the corrected
  inference canon; `../component-graph/PROCESS.md` gains an appended §5 amendments block (7 items,
  method-wrong only — narrative untouched).

## The stakes, settled

The opus INFER's zero-merges verdict ("the library is already well-factored"; "0.85 was correct")
fenced the user's duplication claims. It does not survive: the gate was structurally unreachable
(max attainable ≈0.86 without a shared-spring anim term that exists on 2 edges graph-wide; max ever
emitted 0.765), the layer was blind exactly where the library duplicates (compound families,
intra-family variants, CSS registers), and the individual CLEARs of the top pairs rested on false
facts. Honestly inferred, the same graph yields ≥4 owed consolidations + 1 new factoring lane —
concordant with RU-09's independent source adjudication.

## Verdict table

### OPUS-WRONG

| # | claim (INFERENCE.md / role-census.md) | correction | evidence |
|---|---|---|---|
| W1 | §1a pulse↔status-dot CLEAR — "DISJOINT semantic domains (liveness vs presence)"; "pulse adds `motion`; neither is a true superset"; "merging would collapse two distinct semantic slots" | The enums share `warning` and `_shared/feedback.ts:9` ALREADY unions them (`FeedbackMarkState`); Pulse has no `motion` prop (hardcoded on the mark, Pulse.vue template) so `b⊇a` is a true name-superset; both are trivial skins over the mark that owns 100% of the paint — the argument FOR the merge. Verdict flips to MERGE-INTO status-dot | feedback.ts:3-9; Pulse.vue; StatusDot.vue:14-26 |
| W2 | §1c metric trio "CLEAR as duplicates … No one member 'should not exist'", fenced by A1 SHARED-KEEP | The trio is the ONLY cluster surviving every hardening guard (0.49-0.51 on real trees, true api supersets, 8 shared tokens, shared `coalesceMetric` + `metric__reading`) — the graph's strongest duplication signal, CLEARed against its own evidence; and A1's protecting census is phantom (RU-09 F18: pinned consumers import symbols absent at 7.0.0) | hardened re-score; JSON api edges (0.85/0.73/0.65) |
| W3 | Q3/Q5.2 combobox↔command "CLEARED (composition edge) … command wraps combobox … Verified command→combobox+dialog on disk" | ZERO composition edges exist between command and combobox in the artifact (0 of 689); on disk command imports combobox TYPES only and re-implements 7 parallel shells over the same reka primitives. The clearing rule cited a nonexistent edge; the wrapper claim is false (CommandDialog→Dialog is the only real composition) | edge scan; command/*.vue imports |
| W4 | Headline + Q4 "ZERO new factorings … the most reassuring result … every repeated ≥3-site sub-template is ALREADY a primitive" | Sustained only by the dead gate + a ≥3-family criterion that structurally exempts 2-family duplication (the dialog/drawer staging seam it FOUND then fenced) + template-grain-only vision (CSS registers invisible — RU-09 F23's two unfactored track registers). RU-09's same-library tally: 6 COLLAPSE-FAMILY / 3 MERGE / 1 DELETE | INFERENCE §3.3/§5 (rewritten); RU-09 |
| W5 | Generalization #1 "0.85 was correct … natural gap between the register band (0.49-0.77) and the noise floor (0.15-0.47) … add a register-band annotation 0.45-0.80" | The gate is unreachable (reachability arithmetic §1.2) and the banding does not exist: sorted composites run 0.5052, 0.4962, 0.4941, 0.4710, 0.4550, 0.4462, 0.4458, 0.4400, 0.4250, 0.4000 — dense through the claimed boundary; the proposed band sweeps in confirmed noise (fourier-field↔liquid-grid 0.471) | composite distribution from JSON |
| W6 | role-census.md "role:null rows are the INFER seat's to assign" — and the opus INFER never assigned configurator (absent from INFERENCE.md); census reproduces the three laundered labels as spec-derived | The seat's one mandatory role duty was skipped; configurator now assigned (chrome) with evidence; the laundered trio corrected (expandable-container=overlay, instrument-chassis=container, dark-mode-toggle=control-by-honest-rule); the 3 contaminated role_synonymy edges (all instrument-chassis↔metric*) are void | role-census.md:3; INFERENCE §4; RF-7 W3 |
| W7 | V10 "deck≡carousel — CONFIRM ASK C1 (deck-as-headless-engine, atlas useDeck)" | Missed the graph's OWN evidence: `component:deck` = DeckPager.vue = a 1-node `shape_string:"PagerDots"` + composition edge → `sfc:pager-dots/PagerDots.vue`. The library-side deck is a zero-logic alias (C1's engine is the atlas artifact); the graph corroborates RU-09 F33's retirement, not the as-is keep | JSON deck node + edges |

### FABLE-NEW

| # | finding | evidence |
|---|---|---|
| N1 | **The hardened re-score.** Weights recovered exactly (0.30/0.30/0.15/0.10/0.15, lstsq err 5e-5); guards = tree≥4 with named-child exemption (generic `Primitive(slot)` excluded), style support ≥2 tokens, untrusted-role zeroing. Result: the 310-row table holds ~5 rows of real signal (metric trio, pulse↔status-dot, input↔textarea, dropdown-menu↔popover), 33 rows fall to exactly 0, and 274/287 dom-positive rows rested on sub-4-node trees | INFERENCE §1-2 (rewritten) |
| N2 | **Command/combobox behavioral drift.** CommandItem.vue guards disabled select (`preventDefault` — reka emits before checking disabled); ComboboxItem.vue forwards the raw emit. The twin shells already behave differently for the same interaction — dedup or the fork widens. New BAND-REDUCTION row | CommandItem.vue:17-29 vs ComboboxItem.vue |
| N3 | **Intra-family blindness by construction.** The candidates table is component↔component; timeline's three parallel implementations (350/293/414 loc, dispatched by GlassTimeline — the dispatcher is IN the node's shape_string) emit zero rows and zero dom edges. §3d-Q3 names "the 5 timeline variants" as expected candidates of a layer that cannot emit them | JSON timeline nodes; edge scan |
| N4 | **Noise-hub accounting.** Five ≤3-node-shell components dominate the table: alert 29 rows, carousel 28, badge 27, metric-stack 26, fading-scroll 25. The opus "~40 iso-1.0 pairs" matches neither the table (17 rows, all trivial) nor the layer (194/198 trivial) | row/hub census |
| N5 | **The ALREADY-FACTORED disposition lane.** The graph's true positives with existing owners must stop reading as owed merges: input↔textarea (`_shared/field-control.css`), accordion↔collapsible (`disclosure.css`), the labeled-field TED-0.8 trio (`LabeledField.vue` base — never adjudicated by opus), dropdown-menu Checkbox/RadioItem (reka idiom) | source reads |
| N6 | **Role re-inference from source.** expandable-container→overlay (Teleport + trapped FocusScope + role="dialog" + aria-modal + scroll lock); instrument-chassis→container (pure slot-frame); dark-mode-toggle→control by honest evidence (button + @click + aria-pressed + useLiquidPress) needing the amended rule; configurator→chrome (studio furniture). Census deltas: overlay 5→6, data-display 9→8, chrome 5→6, null 1→0; total 69 unchanged | component sources; INFERENCE §4 |
| N7 | **Cross-unit tension named (consistency duty).** RU-09 ASK A3 offers the user "ratify the mechanical ≥0.85 composite floor as binding and the [PULSE-DOT] merge reverts" — but the floor is a dead instrument (W5): ratifying it as binding would mechanically fence EVERY future merge, not just this one. A3 must be re-worded to a design-judgment ask, not a gate ask | RU-09 A3; INFERENCE §1.2 |

### RATIFIED (re-proven, never presumed)

| # | claim | re-proof |
|---|---|---|
| R1 | Q2a — the overlay `*Content` divergence is JUSTIFIED; `role:overlay` splits into floating (anchored, `_shared/floating.ts`, 8 consumers) vs modal (scrimmed) sub-registers; the label-sensitive hash was right to refuse the cluster | floating.ts consumer set + per-Content reka wrappers; concordant with RF-7 R11 |
| R2 | Q1b — dialog/drawer CORES are distinct (snap/detent/drag engine real; api 0.36 honest; the raw 0.632 vacuous) — the wrongness was the no-factoring ROUTE (W4), not the core-distinctness | Drawer.vue snap wiring; RU-09 ratified the same half |
| R3 | Q5.5 — checkbox↔radio-group/switch/number-field cleared: shared reka prop names inflate api Jaccard; distinct primitives | hardened scores ≤0.17 |
| R4 | Q5.6 — header-ribbon `null` external ≠ zero, KEEP | RF-7 W4 strengthens census to 9 |
| R5 | Q2b — trivial `div>slot` twins DO-NOT-FACTOR (overfit rule correctly applied) | formalized as the tree guard |
| R6 | Generalization #2/#4 direction — dom=1.00 the noisiest component-grain feature; keep labels in the shape hash; superset over type-compatible props | magnitudes corrected (N4) |
| R7 | Q3 — input↔textarea and accordion↔collapsible cleared as registers over owned substrates | field-control.css + disclosure.css verified on disk |
| R8 | Q5.3 — liquid-grid iso-1.0s corroborate the standing DELETE, never re-opened; fence honored throughout the opus doc (no DECIDED row re-decided) | disposition scan (12 DELETE rows all ADJUDICATION-1 R1) |

## Counts

- **opusWrong: 7** (W1-W7)
- **fableNew: 7** (N1-N7)
- **ratified: 8** (R1-R8)

## Consistency duty — RU-19 vs RU-09, stated for the lead

- **No directional conflict** on the four shared pairs: PULSE-DOT (both MERGE-INTO status-dot),
  DIALOG-DRAWER (both cores-distinct + seam collapse), F18-metric (concordant, see degree note),
  F33-deck (RU-19's graph evidence corroborates the alias retirement).
- **Degree note, F18:** RU-19's graph-grounded floor is COLLAPSE-the-trio-to-one; RU-09's DELETE of
  both families rests on its consumer census. If the F18 ask is refused, the collapse floor still
  stands — record both, they are nested, not competing.
- **Named tension (N7):** RU-09 A3's revert lever leans on the ≥0.85 floor that RF-7 + RU-19 prove
  dead. Re-word A3 before it reaches the user; do not let a dead instrument become binding by
  ratification.

## ROUTING — proposed only (nothing outside INFERENCE.md, PROCESS.md §5, and this file was written)

| # | destination | routing |
|---|---|---|
| RT1 | BAND-REDUCTION | **NEW row (command/combobox):** factor the 7 twin shells (Empty/Group/Item/Input/List/Separator/Root) onto shared internals over the reka Combobox primitives; heal the disabled-select drift in ONE place (CommandItem's guard becomes the shared behavior or is explicitly dropped); both public idioms KEEP |
| RT2 | BAND-REDUCTION | **Metric trio floor:** if RU-09 R1/A1 (family DELETE) is granted, subsumed; if refused, the trio still collapses to ONE component with `variant: inline\|cell\|row` + MetricStack container — bind the fallback so refusal of the ask cannot restore the status quo |
| RT3 | BAND-REDUCTION (RU-09 R3 amendment) | PULSE-DOT merge stands per RU-09 R3; amend RU-09 A3's wording — the revert lever must be design judgment, never "ratify the ≥0.85 floor as binding" (the floor is dead; ratification would fence all future merges) |
| RT4 | BAND-REDUCTION (RU-09 R7 corroboration) | Dialog/drawer seam per RU-09 R7 unchanged; RU-19 adds the graph's SFC-grain proof (hash-equal Title/Description/Root twins) to the deliverable's evidence base |
| RT5 | BAND-REDUCTION (graph-method v1.1, extends RF-7 routing 5) | Adopt PROCESS §5 amendments 1-5+7 in any re-run: gate retired for rank+judge, support floors (tree≥4 + named-child exemption, style ≥2 tokens), intra-family sibling pass + dispatcher detection, family-union vectors for compound families, clearing rules cite edge ids, emit-all-scores seed |
| RT6 | REGISTRY/census truth-up | Adopt INFERENCE §4 corrected roles (expandable-container=overlay, instrument-chassis=container, configurator=chrome, dark-mode-toggle=control via the amended honest rule); void the 3 instrument-chassis↔metric* role_synonymy edges; regenerate role-census.md from the corrected labels |
| RT7 | RU-09 R2 corroboration | deck: the graph's own composition edge (DeckPager → PagerDots, 1-node alias) is direct evidence for the F33 retirement — attach to that row's evidence, C1's engine framing stays intact for the atlas artifact |

*End — RU-19, `claude-fable-5`.*
