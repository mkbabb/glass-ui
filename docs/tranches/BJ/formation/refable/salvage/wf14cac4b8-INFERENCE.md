<!-- SALVAGE provenance: wf_14cac4b8-0a9 seat redo:cg-research-infer (RU-19) — in-place INFERENCE.md rewrite — un-journaled write from a seat killed at WALL #8 (session limit, reset 7:10am ET 2026-07-18); preserved per the user salvage edict 2026-07-18; the resumed seat re-runs ANEW — this copy is UNION-time context only -->

# INFERENCE — the corrected inference canon over the component-and-library graph

**Seat:** REFABLE RU-19 (the INFER redo). **Verified model:** `claude-fable-5` (system-context line
read verbatim: "The exact model ID is claude-fable-5"). The prior artifact at this path was the opus
INFER seat's; this rewrite supersedes it in place per the REFABLE protocol — derived ANEW from
`component-graph.json` (`schemaVersion 1.0.0`, commit `c12beecb50d491c77e77cd8db393bdeb001ee2cb`,
354 nodes / 975 edges / 310 candidate rows) + component sources on disk, with the opus artifact
unread until the recorded scrutiny boundary (2026-07-18 06:43:02 EDT). Verdict deltas are itemized
in `../refable/REFABLE-RU-19.md`. RF-7's CONSTRUCT corrections and RU-09's pair adjudications are
honored throughout; conflicts are named, never silently harmonized.

**Headline.** The opus headline — zero merges, "the library is already well-factored," "0.85 was
correct" — does not survive. The Q1 composite gate (`≥ 0.85`) is structurally unreachable on this
corpus (see §1.2), so an empty Q1 set was a property of the instrument, not of the library. Honestly
inferred, the graph + sources yield at least four owed consolidations (metric trio, pulse→status-dot,
the dialog/drawer modal seam, timeline's intra-family triplication) plus one new factoring lane
(command/combobox twin shells, with live behavioral drift) — consistent with RU-09's independent
adjudication (6 COLLAPSE-FAMILY / 3 MERGE-INTO / 1 DELETE / 1 KEEP over the named pairs).

---

## 1. The hardened evidence base — what this graph can and cannot say

### 1.1 Recovered scoring model

The composite weights reproduce exactly from the emitted rows by least squares:
`S = 0.30·api + 0.30·dom + 0.15·style + 0.10·anim + 0.15·role_syn` (max |err| 5.4e-5) — the §3b
proposal was implemented as specced.

### 1.2 The Q1 gate is dead, not discerning

- **Reachability.** With dom, style, role saturated (1.0 / 0.75 / 1.0) and anim 0 — the realistic
  ceiling for a non-animation pair — even `api = 1.0` yields 0.86. Crossing 0.85 requires saturated
  style AND a shared-spring anim term; the whole graph has TWO animation_kinship edges. Nothing real
  can clear the gate; nothing ever did (max emitted composite: 0.765).
- **No natural banding.** The claimed gap between a "register band" (0.49-0.77) and a "noise floor"
  (0.15-0.47) does not exist: the sorted composites run 0.5052, 0.4962, 0.4941, 0.4710, 0.4550,
  0.4462, 0.4458, 0.4400, 0.4250, 0.4000 … — dense straight through the claimed boundary. Any band
  drawn at 0.45-0.80 sweeps in confirmed noise (fourier-field↔liquid-grid 0.471, a 2-node-shell
  isomorph) and excludes real kin just under it.
- **Replacement:** no absolute gate. Rank-order + per-pair source adjudication under the §1.3
  guards is what functions (this is also RF-7's routing 5d).

### 1.3 Guards applied in this canon (the hardened re-score)

1. **Minimum-tree guard:** the dom term counts only when BOTH root trees have `node_count ≥ 4`.
   In the raw table, 274 of 287 dom-positive rows rest on a sub-4-node tree; all 17 dom=1.0 rows do.
2. **Named-child exemption:** a sub-4 hash-equal pair still counts when the shared shape wraps the
   SAME named library child (e.g. `span(FeedbackMark)`) — that isomorphism measures a shared
   authority, which is exactly the merge-relevant signal. Generic wrappers (`Primitive(slot)`,
   `div(slot)`, `X(slot)` over reka forwarders) stay excluded.
3. **Style-support guard:** the style term counts only when the shared token set has ≥ 2 members.
   32 rows carried style ≥ 0.5 on a single shared token (dialog↔drawer's style=1.00 rests entirely
   on the singleton `{data-slot}`).
4. **Role-trust guard:** role labels for `instrument-chassis`, `expandable-container`,
   `dark-mode-toggle` were seeded by undisclosed name-list extensions (RF-7 W3) — their role terms
   and the 3 contaminated role_synonymy edges (all instrument-chassis↔metric*) are zeroed pending
   the §4 re-inference.

Under these guards the 310-row table collapses: **1 cluster ≥ 0.49 (the metric trio), ~5 rows of
real signal total, 33 rows at exactly 0.** The table's information content was ~5 rows; the rest is
shell-shape noise concentrated in hubs (alert 29 rows, carousel 28, badge 27, metric-stack 26,
fading-scroll 25 — each a ≤3-node shell paired against everything).

### 1.4 Structural blind spots (why low scores exonerate nothing)

- **Component-grain vectors are root-SFC-only** (RF-7 N2): compound families (dialog, drawer,
  select, command, combobox, dock, table…) carry near-empty vectors. Their high scores are vacuous
  (dialog↔drawer 0.632 = trivial shell + singleton token) AND their low scores are blind. The
  vector layer cannot adjudicate compound families in either direction — they get a source lane
  (§3) as a matter of method, not charity.
- **Intra-family duplication is out of scope by construction.** The candidates table is
  component↔component; the library's worst duplication — timeline's three parallel implementations
  (ContinuousTimeline 350 loc / SegmentedTimeline 293 / ScrubberTimeline 414, dispatched by
  GlassTimeline — the dispatcher is right there in the node's own `shape_string`) — produces ZERO
  rows and zero dom edges (sibling TED < 0.8). §3d-Q3 even names "the 5 timeline variants" as
  expected candidates of a layer that cannot emit them.
- **Style/composable-grain registers are invisible** to template topology (the track-well /
  value-marks CSS twins RU-09 F23 found live below this graph's floor).
- **Sub-threshold scores were discarded** (RF-7 W5): re-thresholding downward requires a re-run;
  this canon therefore never treats absence of a row as evidence of absence.

---

## 2. The hardened ranking — everything that survives, and its verdict

| rank | pair | hardened S | raw S | surviving evidence | verdict (§3) |
|---|---|---|---|---|---|
| 1 | metric-cell ↔ metric-row | 0.505 | 0.505 | api 0.73 a⊇b, real trees (12/11), 8 shared style tokens | consolidation owed — §3.1 |
| 2 | metric ↔ metric-row | 0.496 | 0.496 | api 0.85 a⊇b | §3.1 |
| 3 | metric ↔ metric-cell | 0.494 | 0.494 | api 0.65, dom 0.71 | §3.1 |
| 4 | pulse ↔ status-dot | 0.465* | 0.765 | api 0.675 b⊇a, `span(FeedbackMark)` both (named-child exemption), same trusted role | MERGE — §3.2 |
| 5 | input ↔ textarea | 0.446 | 0.446 | api 0.54, 9 shared style tokens, same role | ALREADY-FACTORED — §3.5 |
| 6 | dropdown-menu ↔ popover | 0.268 | 0.343 | api 0.39, dom 0.5 at trees ≥ 4 | kinship, owned by `floating.ts` — §3.6 |

*pulse↔status-dot's dom term is retained via the named-child exemption; the drop from 0.765 reflects
the style/role saturation coming off, not doubt about the pair.

SFC-grain edges surviving the tree guard (all four): dropdown-menu Checkbox/RadioItem (reka idiom,
keep), and the labeled-field trio LabeledInput/LabeledSlider/LabeledSwitch (already factored over
`LabeledField.vue` — the wrappers are ~50-line typed bindings; keep). SFC-grain hash-equal pairs
surviving the named-child exemption: the combobox/command twins (§3.4), the dialog/drawer
Title/Description/Root twins (§3.3), pulse/status-dot (§3.2).

---

## 3. Verdicts

### 3.1 The metric trio — the graph's strongest true signal; consolidation owed

The ONLY cluster surviving every guard: real trees, genuine api superset relations
(`metric ⊇ metric-row`, `metric-cell ⊇ metric-row`), 8 shared style tokens, all three importing
`coalesceMetric` and rendering the same `metric__reading` sub-template. At graph grain: one
component expressed thrice — a `variant: inline | cell | row` collapse at minimum. The opus CLEAR
("no one member should not exist", fenced by A1 SHARED-KEEP) inverted the graph's own strongest
evidence, and A1's protecting census is phantom — RU-09 F18 verified the pinned consumers import
symbols that do not exist at 7.0.0. **Disposition: RU-09 F18 governs (DELETE both metric +
instrument-chassis families, consumers inline app-local replacements); this canon's independent
floor is COLLAPSE-to-one regardless of that ask's outcome.**

### 3.2 pulse ↔ status-dot — MERGE-INTO status-dot

The opus CLEAR rested on "DISJOINT semantic domains" — factually wrong: `PulseState`
{active,idle,success,warning} and `StatusDotState` {online,warning,error,unknown} share `warning`,
and `_shared/feedback.ts:9` ALREADY defines the union (`FeedbackMarkState = PulseState |
StatusDotState`). Also wrong at prop grain: pulse has no `motion` prop (Pulse.vue hardcodes
`motion` on the mark), so `b⊇a` is a true name-superset, not an artifact. Both are thin skins over
`_shared/FeedbackMark.vue`, which owns 100% of the paint — the argument FOR the merge, not against
it. **Verdict: MERGE-INTO status-dot (state union, motion as an opt-down axis) — concurs with
RU-09 PULSE-DOT; routing R3 there.** Note for the lead: RU-09's ASK A3 offers ratifying "the
mechanical ≥0.85 floor as binding" as the revert lever — that lever is a dead instrument per §1.2
and must be re-worded (named conflict, REFABLE-RU-19 §consistency).

### 3.3 dialog ↔ drawer — cores distinct (ratified); the modal seam is owed factoring

Ratified anew: drawer's snap/detent/drag engine is real substance dialog lacks; api 0.36 is honest;
the raw 0.632 was vacuous (trivial `DialogRoot(span,slot)` shell + singleton style token). But the
opus route — "truth-up note, NOT a factoring," fenced by the ≥3-site rule — does not survive: the
staging/scrim substrate duplication it itself found (`--stage-t`, the four-value `stage` enum,
`[data-stage-wrapper]`, twin scrims) is joined at SFC grain by hash-equal DrawerTitle≅DialogTitle,
DrawerDescription≅DialogDescription and the shared root shell. A rule that requires ≥3 families
structurally exempts every 2-family duplication — method overfit, amended in PROCESS §5.
**Verdict: COLLAPSE-FAMILY at the seam (shared staging + scrim registration in `_shared`, delete
the twin Title/Description, narrow the gestureless arms) — RU-09 DIALOG-DRAWER / routing R7
governs the deliverable shape.**

### 3.4 combobox ↔ command — parallel twin shells with live drift (NEW; not previously adjudicated)

The opus cleared this pair by "composition edge present → wrapper, not duplicate," citing
"command wraps combobox." **The graph contains zero composition edges between command and
combobox** (verified over all 689), and on disk command imports only combobox TYPES
(`../combobox/types`) while re-implementing seven parallel shells over the same reka Combobox
primitives (CommandEmpty/Group/Item/Input/List/Separator/Root ≅ Combobox*; Empty differs only in
name + data-slot + class string). The clearing rule was applied to an edge that does not exist.
Worse, the fork has already drifted behaviorally: `CommandItem.vue` guards disabled items
(`handleSelect` + `preventDefault` — reka emits `select` before checking `disabled`) while
`ComboboxItem.vue` forwards the raw emit — the same interaction behaves differently across the
twins today. **Verdict: KEEP both public idioms (palette vs field autocomplete); FACTOR the twin
shells onto shared internals and heal the disabled-select drift in ONE place. New BAND-REDUCTION
row (REFABLE-RU-19 routing).** CommandDialog→Dialog composition is real and unaffected.

### 3.5 The already-factored lane (real kinship, zero owed work)

An explicit disposition this layer lacked — these are the graph's true positives whose factoring
already exists; they must stop surfacing as owed merges:

| pair/cluster | shared authority on disk |
|---|---|
| input ↔ textarea | `_shared/field-control.css` + identical shell minus the element delta |
| accordion ↔ collapsible | `_shared/disclosure.css`, distinct reka primitives |
| labeled-field trio (SFC TED 0.8 ×3) | `LabeledField.vue` base; wrappers are typed bindings |
| dropdown-menu Checkbox/RadioItem | reka item idiom; intra-family, intended |
| pulse ↔ status-dot's mark | `_shared/FeedbackMark.vue` — but here BOTH skins are trivial, which flips it to §3.2's merge |

### 3.6 Overlay ring — ratified structure, one correction

The opus Q2a analysis holds and is ratified anew: the `*Content` panels' divergence is earned (each
wraps a distinct reka primitive with a distinct a11y/positioning contract); the anchored contract is
already owned by `_shared/floating.ts` (8 consumers); `role:overlay` genuinely splits into floating
(anchored) vs modal (scrimmed) sub-registers; the label-sensitive shape hash was right to refuse the
cluster. The correction: the MODAL half of that split is not "no action" — it is §3.3's seam.
dropdown-menu↔popover kinship (the one cross-family row with real trees) is floating.ts-owned.

### 3.7 deck — the graph corroborates the alias retirement

The opus V10 confirmed ASK C1 ("deck-as-headless-engine") without reading the graph's own evidence:
`component:deck` = `DeckPager.vue` = a 1-node `shape_string: "PagerDots"` with a composition edge
straight to `sfc:pager-dots/PagerDots.vue`. The library-side deck is a zero-logic alias — exactly
RU-09 F33's finding (the headless engine C1 protects is the atlas `useDeck`, a different artifact).
**Verdict: corroborate RU-09 R2 (retire DeckPager onto `PagerDots pattern="group"`).**

### 3.8 Noise, cleared with the guard that clears it

- All 17 dom=1.0 candidate rows + every carousel/alert/badge/metric-stack/fading-scroll hub row:
  cleared by the minimum-tree guard (the opus counted "~40 iso-1.0 pairs"; the true figures are 17
  table rows, 194 of 198 layer edges).
- checkbox↔radio-group/switch/number-field: ratified clearing — shared reka prop names inflate api;
  distinct primitives (hardened scores ≤ 0.17).
- header-ribbon rows: ratified KEEP (`null` external ≠ zero; RF-7 W4 strengthens the census to 9).
- liquid-grid rows: standing DELETE corroborated, never re-opened.
- fourier-field/constellation/aurora role-1.0 pairs: distinct procedural media over the already-
  owned `glass/procedural` host; the iso-1.0s among them are 2-node canvas shells (guard-cleared).

---

## 4. Role census — corrected

The seeded census carried three laundered labels (RF-7 W3) and one unassigned null the opus seat
never assigned despite `role-census.md` marking it "the INFER seat's to assign." Corrections, each
from source:

| component | seeded (rule) | corrected | evidence |
|---|---|---|---|
| expandable-container | container (vi, laundered) | **overlay** | Teleport-to-body + trapped FocusScope + `role="dialog"` + `aria-modal` + scrim class + body scroll lock when open — behaviorally a modal expander |
| instrument-chassis | data-display (ix, laundered) | **container** | pure slot-frame (stage/inspector/action), renders no data itself; `aria-busy` passthrough |
| dark-mode-toggle | control (iii-aff, laundered) | **control (label stands; derivation repaired)** | `<button>` + `@click` toggle + `aria-pressed` + `useLiquidPress` — control by honest evidence; needs the §5 amended rule to be derivable, not a hardcode |
| configurator | null (unassigned by opus) | **chrome** | studio furniture: stage + controls aside + preset gallery, provides sizing context; an inspector frame, not a field/container |

Census deltas: overlay 5→6, container 7 (chassis in, expandable-container out), data-display 9→8,
chrome 5→6, null 1→0, control 9 unchanged. Total 69 unchanged. The 3 contaminated role_synonymy
edges (instrument-chassis↔metric/metric-cell/metric-row) are void — under the corrected labels no
replacement edge fires (container vs data-display). All other role_synonymy edges stand.

---

## 5. The zero-merges verdict, retired

The opus chain was: dead gate → empty Q1 → "the library has no duplicates" → every near-miss
individually CLEARed → "zero factorings" celebrated as the reassuring result. Each link fails:
the gate was unreachable (§1.2); the near-miss clearings relied on false facts (disjoint enums
§3.2; a nonexistent composition edge §3.4) or on rules that structurally exempt the finding
(≥3-site §3.3); and the layer is blind precisely where the library's real duplication lives
(§1.4). What survives of the opus artifact is real and is ratified above: the overlay-divergence
analysis (§3.6), the four owned substrates (floating.ts, field-control, coalesce-metric,
glass/procedural), the api-inflation and null≠zero clearings, and the labeled-hash design call.
The "substructure already factored" audit idea also survives — as ONE lane (§3.5), not as the
headline; its universal claim was false the day it was written (the §3.3 seam and RU-09 F23's CSS
registers were unfactored).

## 6. Generalization — corrected transferable lessons

1. Absolute composite gates over heterogeneous feature vectors do not find duplicates in a
   ~65-component library; rank-order + guarded evidence + per-pair source adjudication does.
   Retire 0.85; do not replace it with another constant.
2. Structural-similarity terms need SUPPORT floors, not just score floors: minimum tree size with
   a named-child exemption; minimum shared-token count for style. A similarity of 1.0 over 2 nodes
   or 1 token is a statement about the shell vocabulary, not the components.
3. Score the grain the duplication lives at: component-grain root-SFC vectors cannot see compound
   families or intra-family variants — the two places component libraries actually duplicate.
   A v1.1 needs family-union vectors AND an intra-family sibling pass (RF-7 routing 5c + this).
4. A clearing rule must cite an edge that exists; "composition edge → wrapper" is only as good as
   the edge census backing it, and type-only imports must never mint composition.
5. Ratified from the opus seat: keep labels in the shape hash; composition/role_synonymy/style
   earned their keep as layers; compute api superset over type-compatible props, not names.
6. The emit-everything contract (§3b) must be honored in implementation — a judge that cannot
   re-threshold is captive to the constructor's floors (RF-7 W5).

---

**Standing-ruling check.** No DECIDED row re-opened: liquid-grid DELETE corroborated; header-ribbon
KEEP confirmed; deck's C1 is corroborated at the engine grain and corrected only at the alias grain
(the graph's own composition edge); metric A1 is not re-decided here — §3.1 records that RU-09 F18's
ask supersedes its census and routes through ASK, per the fence. Routings live in
`../refable/REFABLE-RU-19.md` and are PROPOSED only.
