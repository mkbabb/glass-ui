# INFERENCE — corrected canon (family C · A05 · A14 · REFABLE RU-19)

**Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
claude-fable-5"). This file was REWRITTEN IN PLACE 2026-07-18 by the RU-19 redo seat; the prior
version was the opus INFER seat's artifact (see `../refable/CENSUS-CLASSIFICATION.md`). Verdict
sidecar: `../refable/REFABLE-RU-19.md`. Boundary: every corrected verdict below was first derived
ANEW from `component-graph.json` + the component sources before the opus artifact was opened
(boundary 2026-07-18 07:28:43 EDT).

**Inputs:** `component-graph.json` (`schemaVersion 1.0.0`, commit `c12beecb…`), the component
sources at HEAD, RF-7 (CONSTRUCT redo — its five hardening routings are honored here), RU-09
(SUPERFLUITY redo — the named-pair adjudications). Standing-ruling fence unchanged.

**Headline — the zero-merges verdict is OVERTURNED.** The prior canon reported "zero pairs reach
Q1 (≥0.85)" and closed with 0 merges, 0 factorings, 0 new ASK rows. Both legs were artifacts of
the method, not facts about the library: the 0.85 gate is dead-by-construction (unreachable for
any pair without animation overlap — RF-7 N3), and the channels that fed it were saturated by
trivial-shell dom scores and singleton style sets while lacking the two signals that matter
(family-union features, shared-substrate consumption). Re-scored with corrected channels, the
library yields **one merge (pulse→status-dot), one family collapse (the metric reader trio), one
un-adjudicated twin family (combobox/command), and two bound factorings (dialog/drawer staging +
Title/Description twins; the track/value-marks registers)** — consistent with RU-09's independent
source-level adjudications. What survives from the prior canon, re-proven: the library's ≥3-site
substructures ARE already factored (`floating.ts`, `fieldControl`, `coalesce-metric`,
`glass/procedural`), the overlay `*Content` divergence is earned, and the noise floor is noise.

---

## 0. The corrected method

Six scored channels over **family-union feature vectors** (component node + all its SFC nodes —
the root-SFC-only grain of the prior run structurally blinded compound families, RF-7 N2):

| channel | weight | definition | guard |
|---|---|---|---|
| api | 0.35 | name Jaccard over props (.6) / emits (.2) / slots (.2), component-grain public contract | small-set caveat below |
| style | 0.20 | Jaccard over utility_classes ∪ data_hooks ∪ custom_props ∪ resolved_partials, family-union | `data-slot` excluded; prose-leak nodes flagged (§7) |
| dom | 0.15 | Jaccard over family shape-hash sets | **minimum tree size ≥ 4 nodes** (RF-7 routing 5a); channel null when neither family qualifies |
| substrate | 0.15 | Jaccard over `_shared/*` composable consumption | — |
| afford | 0.10 | Jaccard over handlers ∪ aria ∪ reka primitives ∪ flags, family-union | — |
| anim | 0.05 | Jaccard over the animation register, family-union | — |

Null channels drop out and weights renormalize. **`role_synonymy` is removed from the composite**
— three seed labels were undisclosed name-list extensions (RF-7 W3) and role equality was
saturating composites (it put dialog↔drawer at #2). Role is a lens for the judge, never a score.

**There is no accept gate.** The corpus ranks and the judge reads source — the 0.85 gate is
retired, not re-tuned (PROCESS amendment §5.2). Two adjudication bands fall out empirically:
a **merge band** (composite ≥ ~0.55 — the corrected table breaks at 0.566 vs 0.426) and a
**kinship band** (~0.30–0.55). Below that, noise.

**Two lenses, not one.** The Jaccard composite is the MERGE lens (near-identity). It is blind to
factoring candidates, whose signature is high *absolute* shared mass at low Jaccard. The FACTOR
lens ranks pairs by IDF-weighted shared style-token mass (tokens weighted by rarity across the 69
components). Both lenses ran; both report below.

**Corrected merge-lens top ten** (of 2,346 pairs; channels api/style/dom/anim/substrate/afford):

| # | pair | composite | driving channels |
|---|---|---|---|
| 1 | pulse ↔ status-dot | **0.828** | api .75, style .75, substrate 1.0, afford 1.0 |
| 2 | input ↔ textarea | **0.777** | style .89, substrate 1.0, afford 1.0 |
| 3 | metric ↔ metric-row | 0.700 | api .83, substrate 1.0, afford 1.0 |
| 4 | metric-cell ↔ metric-row | 0.607 | api .73, substrate 1.0 |
| 5 | metric ↔ metric-cell | 0.566 | api .64, substrate 1.0 |
| 6 | paper-backdrop ↔ skeleton | 0.426 | small-set phantom — see Q5 |
| 7 | number-field ↔ tags-input | 0.414 | fieldControl kinship |
| 8 | input ↔ tags-input | 0.391 | fieldControl kinship |
| 9 | tags-input ↔ textarea | 0.389 | fieldControl kinship |
| 10 | radio-group ↔ toggle-group | 0.370 | selection kinship |

dialog↔drawer, #2 at 0.632 in the prior table, scores ~0.25 here: its old score was dom 1.00 on
two trivial 3-node `DialogRoot(span,slot)` shells plus style 1.00 on a singleton shared set.

**Factor-lens top rows** (IDF-weighted shared style mass, prose-leak pairs excluded as polluted):
dialog×drawer **50.7** (`data-stage-scrim`, `--glass-level`, the twin Title/Description typography
`text-subheading tracking-tight leading-none text-center`), combobox×select 42.4 (`text-dropdown*`
menu tokens), slider×timeline 37.8 (track/duration/ease register), progress×slider 29.8
(`--value-mark-*`). Each is adjudicated below.

**The discriminator rule** (the inference rule the prior run lacked): a high-composite pair over a
shared `_shared` substrate splits by whether the residue OUTSIDE the substrate is unionable as
axes of one component, or is an intrinsic per-component contract. Unionable → merge
(pulse/status-dot). Intrinsic → the similarity is evidence of GOOD factoring, keep
(input/textarea). Composite magnitude alone cannot make this call — ranks 1 and 2 above land on
opposite verdicts.

---

## Q1 — Outright duplicative components

### 1a. `pulse ↔ status-dot` — corrected #1 (0.828) — **MERGE-INTO StatusDot**

Both are thin skins over `_shared/FeedbackMark.vue` (`Pulse.vue:3`, `StatusDot.vue:3`): a 47-line
and a 58-line file whose entire delta is default state, the `size` prop (sm|md), the `motion`
flag passed to the mark, and a vertical-align. The prior CLEAR rested on "disjoint semantic
domains (liveness vs presence)" — but the union type ALREADY exists as
`FeedbackMarkState = PulseState | StatusDotState` (`_shared/feedback.ts:9`) and FeedbackMark
renders all eight states through one register. Domains that the shared primitive already unions
are one component's state axis, not two identities. The shared-primitive fact is the argument FOR
the merge, not against it — 100% of the material lives in the authority; the two wrappers are the
residue, and the residue is unionable (size, motion, default — all axes).

Consistent with RU-09 PULSE-DOT (OPUS-WRONG there too; MERGE-INTO StatusDot with 7-state union,
`size sm|md|lg`, motion opt-down; the "breaks 7 sites" cost phantom — all sites pre-7.0.0-broken,
migration owed regardless). Route: BAND-REDUCTION per RU-09 R3; user check at RU-09 A3.

### 1b. `input ↔ textarea` — corrected #2 (0.777) — **KEEP-DISTINCT (well-factored)**

Near-identical wrapper choreography (`useFieldControlState` + `useVModel` + native-prop
forwarding + `field-control glass-defined` + `_shared/field-control.css` in both), but the
residue is the intrinsic native-element contract: `<input>` vs `<textarea>`, disjoint native
attribute sets (`type/pattern/inputmode` vs `rows/cols/wrap/resize`), distinct public types.
Merging behind an `as` switch would trade 30 duplicated lines for a conditional-type API. The
prior canon reached the same verdict; what it missed is the calibration lesson — this pair
UNDERRANKED in the old table (#9, 0.446) because the channels that reward good factoring
(substrate, family-union style) were absent. High similarity here is the substrate working.

### 1c. metric reader trio — corrected #3-#5 (0.57-0.70) — **COLLAPSE-FAMILY**

`Metric.vue`/`MetricCell.vue`/`MetricRow.vue` share the identical script skeleton
(`coalesceMetric` + the same computed, all three files lines 1-16) and the identical
`metric__reading > metric__value + metric__unit` block; they differ only in wrapper arrangement
(span atom / icon-heading div / dt-dd row). That is one component with a
`variant: inline|cell|row` axis plus `MetricStack` as container — the prior canon SAW this shape
and still verdicted "CLEAR as duplicates… no one member should not exist," deferring to a
hypothetical future R12 pass. The correction: the collapse is the verdict, not a footnote.

Disposition grain: RU-09 F18 rules **DELETE** (both metric + instrument-chassis leave the library
— the opus keep-census was phantom: muster/speedtest import symbols that do not exist at 7.0.0).
DELETE subsumes the collapse. The collapse-to-one is the standing fallback if the user overrules
at RU-09 A1.

**Q1 net: 1 MERGE + 1 COLLAPSE-FAMILY + 1 well-factored KEEP.** Not zero.

---

## Q2 — Isomorphic pairs/families

**Carried, re-proven (the strongest material of the prior run):**

- **The overlay `*Content` divergence is JUSTIFIED.** No dom edge links
  Popover/Dialog/Drawer/Tooltip/DropdownMenu content panels; each wraps a distinct reka primitive
  with a distinct a11y/positioning contract, and the genuinely shared contract already lives in
  `_shared/floating.ts` (8 consumers, verified). The `role:overlay` split into **floating**
  (anchored, floating.ts) vs **modal** (scrimmed, DialogRoot + staging) is real structure —
  ratified and adopted into the role lens (§6).
- The two real cross-family sfc isomorphs (CardContent≅NumberFieldContent,
  DropdownMenuContent≅SubContent) are trivial/intra-family — no factoring; the `div>slot` shape
  fails the overfit rule.
- The legitimate isomorph families table (floating-overlay, modal-overlay, disclosure,
  metric-reader, procedural-substrate) stands, with the Q1c and Q4 corrections applied to its
  metric-reader and modal-overlay rows.

**Corrected:** the Q2 criterion now carries the **minimum-tree-size ≥ 4 guard** as a spec rule,
not a judge instinct — 194 of the 198 dom edges are ≤3-node shells (186 are 2-node `X(slot)`;
RF-7 N1); under the guard the layer contributes 4 informative edges. At family-union grain, zero
cross-family shared shapes survive among the top pairs: **the dom layer detected no duplication
in this corpus that the other channels missed**. Its value was negative space (the *Content
divergence). Q2 net unchanged: 0 factorings from topology.

---

## Q3 — Synonym roles

- **`combobox ↔ command` — the prior clearing is OVERTURNED; this is an un-adjudicated twin
  family.** The old canon cleared it as "wrapper, not synonym" on a `composition` edge — but the
  edge is fabricated at the wrong grain: all eight `command/*.vue` imports from `../combobox` are
  `import type` (types only). At render grain Command does NOT compose Combobox; both families
  independently wrap the same reka primitives (`Command.vue:2` RekaComboboxRoot,
  `CommandInput.vue:4` RekaComboboxInput vs the combobox family's parallel set), duplicating the
  Item/Input/List/Empty/Group subfamily as parallel skins, with only `menuRowClass` +
  `_shared/selection` shared. A type-only import is a CONTRACT dependency — evidence the two
  families already share one shape. The factoring question the graph existed to catch was closed
  by a misclassified edge. Verdict: **JUDGE row for BAND-REDUCTION** — fold the twin subcomponent
  contracts onto a shared selection-list substrate (or ratify the palette identity as an earned
  register with the shared contract formalized in `_shared`). CommandDialog→Dialog is real
  composition and unaffected. Not covered by RU-09 — new row.
- `input ↔ textarea` — register over `field-control`; carried (Q1b).
- `combobox/command/select` interaction contracts distinct — carried, subject to the fold above.
- `deck ≡ carousel` — carried WITH a universe-limit caveat: the graph cleared the *primitives*
  (correct — RU-09 ratified core-distinctness), but the actual duplication RU-09 found (F33: the
  deck story's second goo engine, byte-identical clipPath) lives in `demo/`, which §2 excludes
  from the node universe. The graph could never see it. A within-universe CLEAR must not be read
  as a family-level CLEAR (§7, limits).
- substrate synonyms (aurora/blob/fourier/constellation/liquid-grid/…) — carried; liquid-grid
  iso-1.0 corroborates the standing DELETE.
- `instrument-chassis ↔ metric*` — the three role_synonymy edges here are VOID as evidence: they
  were seeded by an undisclosed name-list extension (`instrument-chassis` hardcoded into rule ix;
  RF-7 W3), not by the spec'd rules. The clearing survives on other grounds (api 0.05); the fate
  of both families is RU-09 F18 DELETE.

---

## Q4 — Shared-substructure factoring

**Carried, re-proven:** every ≥3-site repeated substructure already has an owner —
`_shared/floating.ts` (8×), `field-control` + `_shared/fieldControl` (4 field components),
`metric/coalesce-metric.ts` (3×), `composables/glass/procedural` (7×). The
"substructure-already-factored audit" remains the single most valuable output of the graph and is
promoted to a first-class question for any v1.1 run.

**Corrected — the dialog/drawer staging substrate is a BOUND FACTORING, not a truth-up note.**
The prior canon verified the duplication precisely (twin `stage` enum, `--stage-t`,
`[data-stage-wrapper]`, twin scrims/contexts) and then declined to act because "it spans only 2
families → fails the ≥3-site rule." The ≥3-site rule is a presumption strength, not an exclusion
— a substantive 2-family twin register is exactly a factoring (PROCESS amendment §5.4). It also
missed the second twin the factor lens surfaces and RU-09 confirmed byte-identical:
DialogTitle/DrawerTitle + Description (the shared
`text-subheading tracking-tight leading-none` row in the factor-lens evidence). Route: RU-09 R7
(shared staging seam in `_shared` — Stage enum + resolveStage + provideStageRoots +
useStageAnchor; one scrim-registration composable; DELETE DrawerTitle/DrawerDescription; narrow
DrawerDirection), superseding the V8-note-only disposition. Cores stay distinct — drawer's
snap/detent engine is load-bearing (ratified).

**Factor-lens corroborations** (routed, not re-decided): slider×timeline 37.8 → the
track-well/value-marks registers (RU-09 R4/F23, R5/F16); progress×slider 29.8 → the
`--value-mark-*` fold (F23's second register). The graph independently confirms both.

**Q4 net: 1 bound factoring (staging seam) + 1 new JUDGE row (selection-list twins) + 2
corroborations.** Not zero.

---

## Q5 — Negative findings (carried with corrections)

1. dom=1.00 over thin shells measures a shared primitive or reka substrate, not identity —
   carried, now enforced by the ≥4-node spec guard rather than judge vigilance.
2. `composition` edge → wrapper-not-duplicate — carried ONLY at value grain. The rule as
   implemented counted type-only imports (combobox/command, Q3) — the clearing rule must require
   a rendered/value import (PROCESS amendment §5.3). card→surface, labeled-field→input,
   command→dialog remain valid value-grain clears.
3. liquid-grid iso-1.0 corroborates the standing DELETE — carried.
4. The ~40 coincidental-shape pairs (alert↔badge, alert↔metric-stack, badge↔carousel, …) —
   carried; under the corrected channels they no longer rank. paper-backdrop↔skeleton (#6,
   0.426 corrected) is the residual exemplar: both prop lists are `["class"]` — tiny-set api
   saturation. **Small-set caveat:** composites whose dominant channels rest on |union| < ~4 are
   unreliable at ANY threshold; adjudication is mandatory, gates cannot help.
5. Shared reka-form prop names inflate api Jaccard (checkbox/switch/radio-group/…) — carried;
   these are distinct primitives over the shared `selection`/`primitive` substrate.
6. header-ribbon `null` external ≠ zero — carried (keyframes.js undeclared consumer; KEEP).
7. Shared style partial = shared SKIN not shared TEMPLATE — carried for
   accordion/collapsible and the overlay material; but 5 of the 9 select-touching
   style_kinship=1.0 edges (select~tooltip/dialog/drawer/paper-backdrop/popover) are
   singleton-set saturation at root grain, not material kinship — the layer needs the
   family-union + noise-filter repair before its 1.0s mean anything (§7).
8. easing pair → existing ASK B4 — carried.
9. card ↔ surface value-grain wrapper — carried.

---

## §6 — Role layer, corrected

The census is not "deterministic per §3a.6" as labeled: three labels are undisclosed name-list
extensions (RF-7 W3) and revert to `role:null` — corrected census: control 9→8
(dark-mode-toggle out), container 7→6 (expandable-container out), data-display 9→8
(instrument-chassis out), **null 1→4**. The three `instrument-chassis~metric*` role_synonymy
edges are void. The prior INFER seat also never discharged the null-assignment duty
(role-census.md line 3 assigns it to INFER; configurator was never assigned). Assignments now, by
affordance/dom/source read, as the judge's call under the spec taxonomy:

- `configurator` → **chrome** (demo-facing control chassis; composes rows/layers around other
  controls; no field contract of its own).
- `dark-mode-toggle` → **control** (the outcome the hardcode wanted; legitimate on the merits —
  a two-state pressed control; the defect was laundering, not the label).
- `expandable-container` → **container** (FocusScope wrapper with expand/collapse surface).
- `instrument-chassis` → **substrate** (a material/proportion chassis under instruments, not a
  data reader — `data-display` was the laundered label and is also WRONG on the merits; its
  props are `boundaries/proportion/reserve/state/tone`, zero reading semantics). Moot if F18
  DELETE executes; recorded for the census's integrity.

Role remains a lens. The one structural insight the labels earned — the overlay floating/modal
split — is adopted as sub-registers of `overlay`.

---

## §7 — Layer verdicts + extraction defects (v1.1 inputs)

| layer | verdict |
|---|---|
| composition | KEEP — cleared real wrappers; MUST split value-grain vs type-grain imports (the combobox/command misclassification) |
| api_similarity | KEEP — its 4 edges at ≥0.6 were exactly the two true clusters (metric triangle + pulse/status-dot); the strongest layer per edge |
| dom_topology | GUARD — ≥4-node minimum; at component grain root-SFC dom is retired from the composite entirely; keep sfc-grain for negative-space analysis |
| style_kinship | REPAIR — family-union + `data-slot` filter + singleton-set floor (|union| ≥ 4); **prose-token leak**: comment text scraped into `utility_classes` on 5 nodes (configurator, toast, select + their SFCs — `a/in/is/its/keeps/the/floor/s` from JSDoc lines, e.g. `ConfiguratorRow.vue:35`, `SelectContent.vue:113`); fix the extractor before any style number is re-trusted |
| animation_kinship | UNINFORMATIVE here — 2 edges, both tiny-set saturation (button~dark-mode-toggle@1.0); keep at 0.05 weight or drop |
| role_synonymy | LENS ONLY — out of the composite; 3 edges void per the laundered labels |
| composite | REPLACED — corrected weights + family-union grain + renormalization; **no accept gate**; two-band annotation (merge ≥ ~0.55, kinship 0.30–0.55) |
| candidates table | the mechanical hints were mostly honest (combobox↔command said "needs judge" — the judge is what failed); hint defect: metric↔metric-row api 0.85 labeled "weak — likely coincidental" |
| emit contract | RF-7 W5 stands — sub-threshold scores are discarded, so the INFER seat could never have re-thresholded downward from the artifact; the prior canon did not flag the missing capability it was told it had |

**Universe limits (epistemic ceiling, previously undisclosed):** `demo/` stories and external
consumers are outside the node universe. Duplication classes that live there — F33's second goo
engine, F18's phantom-consumer census — are structurally invisible; a graph CLEAR on such rows is
a within-universe statement only.

---

## VERDICT ROUTING TABLE (corrected)

| # | finding | verdict | route |
|---|---|---|---|
| V1 | pulse ↔ status-dot | **MERGE-INTO StatusDot** | BAND-REDUCTION per RU-09 R3; user ratification RU-09 A3 |
| V2 | dialog ↔ drawer cores | KEEP-DISTINCT (snap engine load-bearing) | — |
| V3 | metric reader trio | **COLLAPSE-FAMILY** (fallback under F18 DELETE) | RU-09 R1/A1; collapse-to-variant-axis if overruled |
| V4 | overlay `*Content` divergence | JUSTIFIED (ratified) | floating/modal sub-register split adopted |
| V5 | floating-panel contract | ADOPT-EXISTING `floating.ts` (ratified) | — |
| V6 | field-control substructure | ADOPT-EXISTING; input/textarea well-factored KEEP | — |
| V7 | procedural host | ADOPT-EXISTING; liquid-grid DELETE corroborated | — |
| V8 | dialog/drawer staging + Title/Description twins | **BOUND FACTORING** | RU-09 R7 (staging seam to `_shared`, scrim composable, twin deletes) — supersedes the note-only disposition |
| V9 | combobox ↔ command | **NEW JUDGE ROW** — twin subfamilies over RekaComboboxRoot; type-only imports ≠ composition | BAND-REDUCTION judge row (not in RU-09) |
| V10 | deck ≡ carousel | within-universe CLEAR + universe-limit caveat | F33 story-level collapse is RU-09 R2's, invisible to this graph |
| V11 | fourier/constellation registers | carried | ASK B2/B3 sharpening stands |
| V12 | header-ribbon | KEEP (ratified) | — |
| V13 | coincidental-shape noise | cleared (ratified); paper-backdrop↔skeleton the small-set exemplar | v1.1 calibration input |
| V14 | slider×timeline + progress×slider factor mass | CORROBORATE | RU-09 R4 (track-well + value-marks) + R5 (scrubber→Slider) |
| V15 | role census | 4 nulls; 3 void edges; assignments in §6 | role truth-up; moot rows die with F18 |

**Routing counts:** BAND-REDUCTION-bound 4 (V1, V3, V8, V9) · corroborations 2 (V14 + V7's
liquid-grid) · ratified carries 6 · role/method truth-ups 2 (V15, §7). New ASK rows: 1 (V9's
judge row — the prior run's 0 was an artifact of the phantom clearing).

---

## CONSISTENCY vs RU-09 (named, not harmonized)

- **Agreements:** pulse/status-dot MERGE; dialog/drawer cores-distinct + family-grade collapse;
  metric duplication real; deck/carousel primitives distinct; F23/F16 register folds corroborated
  by the factor lens.
- **Grain difference (not a conflict):** metric — this seat's graph-grain verdict is
  COLLAPSE-to-one; RU-09 F18 rules DELETE on external phantom-census evidence outside this
  graph's universe. DELETE subsumes; the collapse is the explicit fallback if A1 is overruled.
- **New beyond RU-09:** combobox/command (V9) — SUPERFLUITY's eleven rows did not include the
  pair; the lead should treat V9 as a fresh judge row, not an RU-09 ratification.
- **Prior-canon vs RU-09 conflicts resolved here, both in RU-09's favor:** V1 (opus CLEAR vs
  MERGE) and V8 (opus note-only vs bound factoring), each on independently re-derived evidence.

---

## GENERALIZATION (rewritten)

1. **A gate whose ceiling sits below its threshold returns a certainty it did not earn.** With
   `S = .30api+.30dom+.15style+.10anim+.15role` a pair with no animation overlap peaks at 0.90
   only if every other channel saturates; realistic api ceilings put Q1's 0.85 out of reach —
   the empty Q1 set was pre-decided by arithmetic, and the prior canon then read the emptiness as
   library health AND blessed the gate ("0.85 was correct"). Derive a gate's reachable ceiling
   under realistic channel maxima before trusting its empty set; better, rank and judge.
2. **Two lenses.** Jaccard finds merge candidates; only absolute (IDF-weighted) shared mass finds
   factoring candidates. One number cannot serve both questions.
3. **The discriminator rule:** shared substrate + high composite splits by whether the residue is
   unionable-as-axes (merge) or intrinsic-contract (keep). This, not the composite, is the
   verdict-bearing test.
4. **Composition edges must be value-grain.** Type-only imports are contract kinship — an
   argument FOR factoring, not a wrapper clearing.
5. **Labeled shape-hashing + the ≥4-node guard** — keep labels in the hash (ratified: it refused
   the false overlay cluster); add the size guard so 98% of the layer isn't shells.
6. **The substructure-already-factored audit is the first-class question** at this corpus size
   (ratified from the prior canon — its best idea, kept verbatim as Q4-prime).
7. **Disclose the universe.** Every CLEAR is bounded by the node universe; name what the graph
   cannot see (demo skins, external consumers) in the verdict itself.

**Standing-ruling check.** No DECIDED row re-opened: liquid-grid DELETE, deck-as-engine C1,
completion-seal A2, header-ribbon KEEP all confirmed. V1/V3/V8 land on rows RU-09 already routed
to BAND-REDUCTION/ASK with user gates; V9 is new and routes as a judge row, deciding nothing.

*End — corrected canon, RU-19, `claude-fable-5`.*
