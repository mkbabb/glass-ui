# REFABLE-RU-19 — Component-graph RESEARCH + INFER redo (the inference layer)

- **Unit:** RU-19
- **Edict:** Re-derive the inference layer from `component-graph.json` + the component sources
  (own thresholds/method, RF-7's hardening routings honored), then scrutinize the opus
  PROCESS.md/INFERENCE.md (+ role-census.md, duplication-candidates.md) assume-incorrect, then
  union. The stake: the opus INFER zero-merges verdict fenced the user's duplication claims.
- **Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
  claude-fable-5").
- **Step-2 boundary:** 2026-07-18 07:28:43 EDT — the corrected scoring method, the full corrected
  ranking, the factor lens, the role correction, and the source-level verdicts on
  pulse/status-dot, input/textarea, the metric trio, combobox/command, dialog/drawer, and
  alert/badge were all derived from `component-graph.json` + `src/` reads BEFORE any opus
  inference artifact (INFERENCE.md, PROCESS.md §3b/§3d, role-census.md,
  duplication-candidates.md) was opened. RF-7 and RU-09 (Fable artifacts, named inputs) were read
  pre-boundary; scoring scripts preserved in the session scratchpad (`ru19/{infer,detail,factor,factor2}.mjs`).
- **Union outputs:** `../component-graph/INFERENCE.md` REWRITTEN IN PLACE as the corrected canon;
  `../component-graph/PROCESS.md` §5 amendments (method-wrong items only); this sidecar.

## The ANEW layer (what my own method found, opus artifacts unread)

Corrected channels (api .35 / style .20 / dom .15 / substrate .15 / afford .10 / anim .05),
family-union grain, ≥4-node dom guard, `data-slot` filter, role out of the composite, no accept
gate, null-renormalized — plus a second IDF-weighted FACTOR lens for absolute shared mass.
Corrected ranking: pulse↔status-dot **0.828** #1, input↔textarea **0.777** #2, the metric
triangle 0.57–0.70 at #3–5, empirical merge-band break at ~0.55. Factor lens: dialog×drawer 50.7
(top non-generic), combobox×select 42.4, slider×timeline 37.8, progress×slider 29.8. Source
verdicts: pulse/status-dot MERGE; input/textarea KEEP (well-factored); metric COLLAPSE;
combobox/command twin-family JUDGE row; dialog/drawer cores distinct + staging/Title twins fold.

## Verdict table

### OPUS-WRONG

| # | claim (opus) | correction | evidence |
|---|---|---|---|
| W1 | Q1a: pulse↔status-dot CLEAR — "disjoint semantic domains… merging would gain nothing" | MERGE-INTO StatusDot. The domains already union (`FeedbackMarkState = PulseState \| StatusDotState`, `_shared/feedback.ts:9`); FeedbackMark renders all 8 states; the two skins' delta (default, size, motion, valign) is pure axes. The shared-primitive fact argues FOR the merge. Corrected rank #1 at 0.828 — in the merge band without rank-rescue | Pulse.vue/StatusDot.vue full reads; feedback.ts:9; agrees RU-09 PULSE-DOT |
| W2 | Generalization #1: "0.85 was correct… keep 0.85 for Q1" — the empty Q1 set read as library health | The gate is dead-by-construction: ceiling 0.90 only if api=dom=style=role all saturate; realistic pairs cannot reach it (RF-7 N3). The zero-merges headline was pre-decided by arithmetic, then the arithmetic was blessed | weight algebra; the 310-row max 0.765 |
| W3 | Q3/Q5.2: combobox↔command "CLEARED (composition edge)… command is the palette built ON combobox" | The edge is type-grain: all 8 `command/*.vue` → `../combobox` imports are `import type`; Command renders RekaComboboxRoot/RekaComboboxInput DIRECTLY — parallel twin subfamilies (Item/Input/List/Empty/Group) over one reka primitive. The factoring question was closed by a misclassified edge. NEW JUDGE row | grep of command/*.vue; Command.vue:2, CommandInput.vue:4; JSON `imports_components:["combobox"]` vs disk |
| W4 | Q4/V8: dialog/drawer staging = truth-up note only ("2 families → fails the ≥3-site rule") | A substantive 2-family twin register IS a factoring; the ≥3-site rule is presumption, not exclusion. Also missed the byte-identical Title/Description twins (visible in the factor lens: shared `text-subheading tracking-tight leading-none`). Route = RU-09 R7 bound deliverables | factor-lens 50.7; RU-09 DIALOG-DRAWER |
| W5 | Q1c: metric trio "CLEAR as duplicates… no one member should not exist" (collapse deferred to a hypothetical future R12 pass) | One script skeleton thrice (identical lines 1-16 + identical reading block); the collapse IS the verdict — variant axis `inline\|cell\|row`. RU-09 F18 DELETE subsumes; collapse is the A1-overrule fallback | Metric/MetricCell/MetricRow full reads; api_similarity 0.65-0.85 triangle |
| W6 | role-census.md: "Deterministic seed labels from PROCESS.md §3a.6", 1 null | Three labels are undisclosed name-list extensions (RF-7 W3) → 4 nulls (configurator + dark-mode-toggle + expandable-container + instrument-chassis); the 3 `instrument-chassis~metric*` role_synonymy edges are void; instrument-chassis's `data-display` is also wrong on the merits (substrate — zero reading semantics) | RF-7 W3; JSON affordance registers; InstrumentChassis props |
| W7 | The INFER seat's own spec duty: "role:null rows are the INFER seat's to assign" (role-census.md:3) | Never discharged — configurator appears nowhere in the opus INFERENCE.md. Assigned now in the corrected canon §6 | grep of prior INFERENCE.md |
| W8 | Generalization #3: style_kinship "earned its keep" | 5 of the 9 select-touching style_kinship=1.0 edges are singleton/near-empty root-set saturation (select~tooltip/dialog/drawer/paper-backdrop/popover @1.0); the layer needs family-union + a singleton floor before its 1.0s mean anything | JSON edge scan + root style sets |

### FABLE-NEW (absent from the opus layer AND from RF-7)

| # | finding | evidence |
|---|---|---|
| N1 | **Prose-token leak in `utility_classes`:** comment/JSDoc text scraped as classes on 5 nodes — configurator/toast/select carry `a, in, is, its, keeps, s, the, floor` (e.g. `ConfiguratorRow.vue:35` "the row keeps its…", `SelectContent.vue:113` "the floor in select.css") — polluting every style measure touching them (configurator×select tops raw shared-mass partly on prose) | JSON token scan; source greps |
| N2 | **The substrate channel + family-union grain produce a clean merge band.** Shared `_shared/*` consumption (fan-in: class-names 38, axes 11, primitive 11, selection 7, fieldControl 4, feedback 2) as a scored channel + family-union features → break at ~0.55 that isolates exactly the true positives; dialog↔drawer falls from #2 to ~0.25 with no hand-tuning | infer.mjs run outputs |
| N3 | **The two-lens split (MERGE vs FACTOR).** Jaccard cannot rank factoring candidates; IDF-weighted absolute shared mass independently surfaces dialog×drawer 50.7, combobox×select 42.4, slider×timeline 37.8, progress×slider 29.8 — the last two corroborating RU-09 F23/F16 from graph data alone | factor2.mjs |
| N4 | **The discriminator rule:** high composite + shared substrate splits by residue — unionable-as-axes → merge (pulse/status-dot); intrinsic native contract → well-factored keep (input/textarea, corrected #2 at 0.777, underranked #9/0.446 by opus). The composite alone is verdict-blind at the top of its own table | source reads both pairs |
| N5 | **Universe-limit disclosure owed on every CLEAR:** demo/ + external consumers are outside the graph; the F33 goo-twin and F18 phantom-census classes are structurally invisible, so the opus within-universe CLEARs on deck/carousel and chassis were epistemically overclaimed even where directionally right | §2 universe vs RU-09 F33/F18 |
| N6 | **style_kinship singleton saturation quantified at edge grain:** 5/47 edges are 1.0 on |union|<4 root sets (kin of RF-7 N2 but a distinct, countable defect class) | detail.mjs |
| N7 | **Mechanical-hint defect in duplication-candidates.md:** metric↔metric-row (api 0.85 — the table's highest api) labeled "weak — likely coincidental"; the hint keyed on iso/superset flags, not api | duplication-candidates.md:10 |

### RATIFIED (re-proven, never presumed)

| # | claim | re-proof |
|---|---|---|
| R1 | The overlay `*Content` divergence is justified; floating vs modal sub-registers of `overlay` | floating.ts consumer set = exactly the anchored six; Dialog/Drawer absent; per-Content reka contracts read |
| R2 | Q2b trivial-shape clears (CardContent≅NumberFieldContent etc.) — `div>slot` fails the overfit rule | matches my ≥4-node guard; both sources read |
| R3 | input↔textarea KEEP as registers of one text-entry slot | my independent verdict pre-boundary (with the underrank correction, N4) |
| R4 | Q5.5 checkbox/switch/radio-group clears — reka prop-name inflation | my kinship band 0.27-0.32; distinct primitives confirmed |
| R5 | Q5.4 coincidental-shape noise clears incl. paper-backdrop↔skeleton | re-derived as small-set phantom (both prop lists = `["class"]`) pre-boundary |
| R6 | liquid-grid iso-1.0 corroborates the standing DELETE | edge scan; fence check |
| R7 | header-ribbon KEEP — `null` external ≠ zero | carried; RF-7 R12 kin |
| R8 | card→surface, labeled-field→input, command→dialog wrapper clears | VALUE-grain imports verified (CommandDialog composes Dialog for real) |
| R9 | deck/carousel primitives distinct within the universe | api 0.13/empty style on deck; RU-09 core-ratification concurs; caveat N5 |
| R10 | Generalization #2 (dom highest-noise at component grain) + #4 (keep labels in the shape hash) | my guard formalizes #2; RF-7 R11 re-proved #4 |
| R11 | The Q4 substructure-already-factored audit — all four ≥3-site substrates already owned (floating.ts 8×, fieldControl, coalesce-metric, glass/procedural 7×) | fan-in census reproduced independently; the opus run's best material, kept as Q4-prime |
| R12 | accordion↔collapsible KEEP over the shared disclosure partial | substrate read; distinct reka contracts |

## Counts

- **opusWrong: 8** (W1–W8)
- **fableNew: 7** (N1–N7)
- **ratified: 12** (R1–R12)

The opus INFERENCE was not worthless — its negative-space analysis (R1, R11) is the strongest
material in the triumvirate and is carried into the corrected canon verbatim in substance. What
failed was every verdict the dead gate, the phantom composition edge, or the ≥3-site exclusion
touched — which happened to be all four action-bearing rows. The zero-merges headline does not
survive: corrected net = 1 MERGE + 1 COLLAPSE + 1 new JUDGE row + 1 bound factoring + 2
corroborations.

## CONSISTENCY vs RU-09 (named for the lead, not harmonized)

1. **metric (grain difference, not a conflict):** my graph-grain verdict is COLLAPSE-to-one;
   RU-09 F18 rules DELETE on external phantom-census evidence outside my universe. DELETE
   subsumes; collapse is the explicit A1-overrule fallback. If the lead wants one word: F18
   governs.
2. **combobox/command (RU-09 gap, new row):** SUPERFLUITY's eleven rows never adjudicated the
   pair; V9 is fresh, not an RU-09 ratification — it must not be reported as "consistent with
   RU-09," only as un-contradicted by it.
3. **pulse/status-dot, dialog/drawer:** full agreement, independently re-derived.

## ROUTING — proposed only

| # | routing |
|---|---|
| RT1 | **BAND-REDUCTION:** V1 pulse→status-dot merge amendment stands on the corrected graph evidence (rank #1, 0.828, merge band) — reinforces RU-09 R3/A3; the A3 user check should now also note the mechanical floor argument is dead (the 0.85 gate is retired, so "sits at 0.765 under the gate" is no longer a live objection shape) |
| RT2 | **BAND-REDUCTION:** V8 dialog/drawer staging seam is a bound factoring per RU-09 R7 (staging seam to `_shared`, one scrim composable, DELETE DrawerTitle/DrawerDescription) — the opus note-only disposition is superseded |
| RT3 | **BAND-REDUCTION (NEW judge row):** combobox×command twin subfamilies over RekaComboboxRoot — fold the shared Item/Input/List/Empty/Group contracts onto a `_shared` selection-list substrate (menuRowClass/selection.ts already own fragments) or ratify the palette as an earned register with the contract formalized; type-only imports are the shared-shape evidence |
| RT4 | **BAND-REDUCTION:** metric trio collapse-to-variant-axis recorded as the standing fallback under RU-09 A1; no separate wave while F18 DELETE is live |
| RT5 | **Graph v1.1 (the wave that owns the graph):** adopt PROCESS §5 — corrected composite (family-union, ≥4-node dom guard, substrate channel, role-as-lens, no gate, two-band annotation) + the FACTOR lens + value/type composition split + emit-all-scores (RF-7 5b) |
| RT6 | **Graph v1.1 extraction:** fix the prose-token leak (template-attribute-grain `utility_classes` only), the style_kinship singleton floor, the `data-slot` exclusion |
| RT7 | **Role truth-up:** census to 4 nulls; the 3 `instrument-chassis~metric*` edges void; §6 assignments (configurator→chrome, instrument-chassis→substrate-on-merits, moot under F18); INFER's null-assignment duty made explicit in §3d (PROCESS §5.7) |

*End — RU-19, `claude-fable-5`.*
