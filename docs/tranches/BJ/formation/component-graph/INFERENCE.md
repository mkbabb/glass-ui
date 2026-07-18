# INFERENCE — the Fable judge over the component-and-library graph (family C · A05 · A14)

**Mode:** TRANCHE-DEVELOPMENT. This is the INFER seat's only artifact; no `src/` touch, no commit.
It executes `PROCESS.md` §3d over `component-graph.json` (`schemaVersion 1.0.0`, commit
`c12beecb50d491c77e77cd8db393bdeb001ee2cb`, 354 vertices / 975 edges) + the four rendered views +
`VALIDATION.md`, under the standing-ruling fence (`CHRONIC-ADJUDICATION`, `ADJUDICATION-1`,
`ASSEMBLY-CROSSWALK`, `FABLE-DAG-REDUCTION`, the band adoption blocks). Every verdict cites node ids +
`file:line`; every route is checked against the fence before it is written. The graph proposes, the
code disposes — every flagged pair below was read on disk before ruling.

**Headline.** Zero pairs reach the Q1 duplicate threshold (`composite ≥ 0.85`); the ranked table tops
out at `0.765`. The library is already well-factored at the substructure grain: every repeated
sub-template that spans ≥3 sites is ALREADY a primitive (`_shared/floating.ts` 8×, `field-control` +
`_shared/fieldControl`, `metric/coalesce-metric.ts`, `composables/glass/procedural` 7×). So the honest
finding is not "delete a duplicate" but "the metrics scores measure register-variation over shared
substrates that the library already owns." One 2-family substructure (dialog/drawer scene-staging) is
genuinely duplicated but lands on a deferred row → truth-up note, not a factoring.

---

## Q1 — Outright duplicative components (Type 1/2)

**Formal criterion (§3d-Q1):** `composite ≥ 0.85` AND equal `role` AND NO `composition` edge between
them. **Result over the artifact: ZERO pairs qualify.** The ranked table's maximum composite is `0.765`
(`pulse ↔ status-dot`); nothing clears `0.85`. I nonetheless adjudicate the top of the ranked list —
the three the charter names plus the style-1.0 pairs — because a high composite that the criterion just
misses is exactly where a false merge would be tempting.

### 1a. `pulse ↔ status-dot` — composite 0.765 — CLEAR (register split; substructure already factored)

- **Artifact evidence.** `component:pulse ↔ component:status-dot`: api 0.68, dom **1.00** (`isomorphic`),
  style 0.75, role_syn 1.00 (both `feedback`, rule vii), superset `b⊇a`. Top-ranked candidate; the
  mechanical hint reads "Type-3 wrapper/superset."
- **Code read.** Both are ~15-line wrappers over the SAME primitive `_shared/FeedbackMark.vue`:
  `pulse/Pulse.vue:3` and `status-dot/StatusDot.vue:3` both `import FeedbackMark`. The isomorphism is
  `<span … ><FeedbackMark/></span>` in both — real, but it is the shape of *two skins of one primitive*.
  Their state enums are DISJOINT semantic domains (`_shared/feedback.ts:3,6`): `PulseState =
  {active,idle,success,warning}` (a liveness mark, `motion` on — `Pulse.vue:35` passes `motion`) vs
  `StatusDotState = {online,warning,error,unknown}` (a presence dot, no motion, `size` axis sm/md —
  `StatusDot.vue:47-56`). The `b⊇a` superset is an api-NAME artifact (`status-dot` adds `size`, `pulse`
  adds `motion`); neither is a true superset of the other.
- **Verdict.** CLEAR. Distinguishing feature: **disjoint state domains (liveness vs presence) + motion**.
  This is a Type-4 register pair, not a Type-1/2 duplicate — the shared substructure `FeedbackMark`
  is already the primitive (the A3 "adopt the existing authority" pattern). Merging would collapse two
  distinct semantic slots and gain nothing (the primitive is already shared).
- **Route.** SHARPEN CHRONIC-ADJUDICATION R12 (pulse is inside the metrics-relocate ≥2-census) —
  the graph confirms pulse is a thin `FeedbackMark` register, so its relocate-vs-keep turns only on
  consumer count, not on redundancy. Not user-gated; not a delete.

### 1b. `dialog ↔ drawer` — composite 0.632 — CLEAR (drawer = dialog-substrate + a snap engine)

- **Artifact evidence.** api 0.36, dom **1.00** (`isomorphic` at root SFC), style 1.00, role_syn 0.50.
  Hint "Type-4 role-synonym (needs judge)." No `composition` edge.
- **Code read.** The root isomorphism is a REKA-forwarder coincidence: both root SFCs are
  `<DialogRoot …><span hidden/><slot/></DialogRoot>` (`dialog/Dialog.vue:45-48`,
  `drawer/Drawer.vue` template) — `drawer/Drawer.vue:2` explicitly wraps reka `DialogRoot`. But the
  substance diverges hard: `Dialog.vue` is a 4-prop modal (`open/defaultOpen/modal/unmountOnHide`),
  while `Drawer.vue` carries a full detent/drag engine — `mode` (modal | live-behind), `snapPoints`,
  `activeSnapPoint`, `direction`, `stage`, wired to `drawerSnapContext` + `resolveDefaultSnapPoints` +
  `useDrawerSnap`. api 0.36 is the honest score; dom 1.00 measures only the thin root shell.
- **Verdict.** CLEAR. Distinguishing feature: **drawer's snap/detent/drag physics + the modal|
  live-behind mode axis**, which dialog structurally lacks. Dialog is the centered/side modal; drawer is
  the edge-anchored draggable sheet. The dom=1.00 is a root-forwarder artifact — a calibration lesson
  (see Q5 + Generalization).
- **Route.** CONFIRM the FABLE-DAG-REDUCTION "DialogContent stage KEEP/defer" posture. A real
  shared-substructure sits underneath (scene-staging) — recorded at Q4/§dialog-drawer-staging as a
  truth-up note to BAND-MATERIAL W3, NOT a merge.

### 1c. metric reader trio (`metric ↔ metric-cell ↔ metric-row`) — composite 0.49-0.51 — CLEAR (isomorphic family, not duplicates)

- **Artifact evidence.** `metric-cell↔metric-row` 0.505 (api 0.73, dom 0.64, `a⊇b`); `metric↔metric-row`
  0.496 (api **0.85**); `metric↔metric-cell` 0.494. All `data-display`, family `metric`.
- **Code read.** The three readers all `import { coalesceMetric } from "./coalesce-metric"`
  (`Metric.vue:4`, `MetricCell.vue:4`, `MetricRow.vue:4`) and all render the SAME sub-template
  `metric__reading > metric__value + metric__unit`, plus `metric__label`/`metric__context`. They differ
  only in the wrapper: `Metric` is a `<span>` atom (orientation/size), `MetricCell` is a `<div>` with an
  icon heading (`MetricCell.vue` `metric-cell__heading` + iconSize/iconStrokeWidth), `MetricRow` is a
  `<div>` dt/dd row (`metric-row__term`). `MetricStack` (0-shared) is the layout container (`<div><slot/>`).
- **Verdict.** CLEAR as duplicates. This is a deliberate Type-3 isomorph FAMILY (atom + two
  presentational variants + a container) over an already-factored substrate (`coalesce-metric.ts` +
  the `metric__*` classes in `metric/styles.css`). No one member "should not exist."
- **Route.** SHARPEN CHRONIC R12 / BAND-REDUCTION Wave-4 non-goal ("metric-family dir-merge — Q051 R12
  four-dir→one is a separate consolidation"): the graph gives that consolidation concrete grounds — the
  three readers are a variant-family that a future R12 pass could collapse to ONE component with a
  `variant: inline | cell | row` axis + `MetricStack` as container. Does NOT touch the A1 SHARED-KEEP
  ruling (which is about the public surface / consumer count, user-gated); the shape-consolidation is
  R12's, and it is sharpened, not re-decided.

**Q1 net: 0 merges. 3 CLEARs (all register/family variation over shared substrates).**

---

## Q2 — Isomorphic pairs/families (Type 2/3, same structure different skin)

**Criterion (§3d-Q2):** `dom_topology_similarity` `isomorphic:true` OR `≥0.80`, AND `style_kinship <
0.50`. I engage the CONSTRUCT contradiction note (VALIDATION §10) head-on.

### 2a. The overlay `*Content` divergence — the CONSTRUCT contradiction, adjudicated

VALIDATION §10 recorded a contradiction of PROCESS §3d-Q2's assumed exemplar: the overlay `*Content`
panels do NOT form a tight isomorph cluster — on disk `PopoverContent` (n=8, multi-portal),
`DialogContent` (n=11), `DrawerContent` (n=7), `TooltipContent` (n=3), `DropdownMenuContent` (n=3) have
DIVERGED to distinct sizes and reka wrapper tags, so no `dom_topology_similarity` edge links them.

**Ruling: the divergence is JUSTIFIED variation, not drift wanting re-convergence.** The code shows why:

1. **The divergence is driven by which reka primitive each wraps**, and that choice is load-bearing.
   `DialogContent.vue` wraps `RekaDialogContent` + `ModalOverlay` (modal: portal + scrim + focus-trap +
   center/side placement branch + close + scroll region). `DrawerContent.vue` wraps `RekaDialogContent`
   + a `role="slider"` detent grip (the drag engine). `PopoverContent.vue` is a three-way branch over
   `RekaHoverCardContent | RekaPopoverContent | plain` (the R13 hover-card fold). `TooltipContent.vue` is
   the minimal `RekaTooltipPortal > RekaTooltipContent`. `DropdownMenuContent.vue` uses dynamic
   `PortalComp/ContentComp` for sub-menu portalling. Each shape is EARNED from a distinct a11y +
   positioning contract; collapsing them would erase those contracts.

2. **The genuinely-shared part is ALREADY factored** into `_shared/floating.ts` (verified 8 consumers:
   `ComboboxList`, `CommandList`, `DropdownMenuContent`, `DropdownMenuSubContent`, `PopoverContent`,
   `SelectContent`, `TooltipContent` + `combobox/types.ts`). The common contract — `side/sideOffset/
   align/alignOffset` placement + `data-surface` + `data-material="overlay"` + `data-reveal` + the four
   `@escape-key-down/@pointer-down-outside/@focus-outside/@interact-outside` handlers — lives there. The
   per-`*Content` residue is the legitimate skin.

3. **A principled sub-family split falls out of the graph.** `floating.ts`'s 8 consumers are exactly the
   ANCHORED overlays (popover/tooltip/dropdown/select/combobox/command). `DialogContent` and
   `DrawerContent` are ABSENT from that list — because they are MODAL overlays (portal + scrim + focus
   trap, no trigger-anchored positioning). So `role:overlay` is really two sub-registers: **floating**
   (positioned, `floating.ts`) and **modal** (scrimmed, `DialogRoot` + staging). This is real structure,
   not redundancy — and it is why the style-1.0 dialog/drawer/tooltip/popover cross-scores in the
   `overlay` heatmap (`similarity-matrix.md:183-187`) are a shared MATERIAL (`data-material="overlay"`),
   not a shared TEMPLATE.

- **Route.** Truth-up note to the lead (CONFIRMS + extends VALIDATION §10): PROCESS §3d-Q2's assumed
  `*Content` isomorph cluster does not exist and SHOULD not — the labeled-topology method correctly
  deferred to this judge, and the shared part is already owned by `floating.ts`. No factoring; no
  re-decision. Recorded as corroboration-of-evidence per the fence.

### 2b. The two REAL cross-family isomorph pairs (VALIDATION §10) — cleared as trivial shape

- `sfc:card/CardContent.vue ≅ sfc:number-field/NumberFieldContent.vue` (shape_hash equal). Read: both
  are `<div :class="cn('X-content', props.class)"><slot/></div>` (`CardContent.vue:11-13`,
  `NumberFieldContent.vue` template). Different skin (`card-content` vs `number-field__content`).
  **CLEAR — trivial universal shape.** A 3-node `div>slot` wrapper is not a shared substructure worth a
  `<ContentSlot>` primitive; factoring it FAILS the overfit rule (over-abstraction of a one-line pattern
  that recurs everywhere by coincidence, not by shared meaning).
- `sfc:dropdown-menu/DropdownMenuContent.vue ≅ .../DropdownMenuSubContent.vue` (shape_hash equal).
  Same family, both draw `floating.ts` + `resolveSurfaceClass('floating')`. **CLEAR — intra-family; the
  sub-content IS the same content shape at a submenu tier.** Already correctly one family, one partial.

### 2c. The legitimate isomorph families (skin difference is legitimate variation)

Named, with shared shape + the already-owned substrate:

| family | members | shared shape | shared substrate (already factored) | verdict |
|---|---|---|---|---|
| floating-overlay | popover, tooltip, dropdown-menu, select, combobox, command | `Portal > RekaXContent[data-material=overlay,data-reveal] + 4 outside-handlers` | `_shared/floating.ts` (8×) | KEEP — per-primitive skin |
| modal-overlay | dialog, drawer | `DialogRoot > (span hidden) > slot` + scrim + `--stage-t` staging | `DialogRoot` (reka) + staging (see Q4) | KEEP — drawer adds snap engine |
| disclosure | accordion, collapsible | `RekaXRoot[data-disclosure] :class=cn('disclosure') > slot` | `disclosure` partial (style 1.00) + BAND-COLOCATION Carve E `disclosure/` | KEEP — different reka primitive |
| metric-reader | metric, metric-cell, metric-row | `wrapper > metric__reading(value+unit) + label + context` | `coalesce-metric.ts` + `metric__*` | KEEP-family — R12 may consolidate (Q1c) |
| procedural-substrate | aurora, blob, constellation, fourier-field, liquid-grid, watercolor-dot, paper-backdrop | canvas/surface host over a WebGL/WebGPU medium | `composables/glass/procedural` (7×) | KEEP registers; liquid-grid DELETE (fence) |

`accordion↔collapsible` (style_kinship **1.00**, `similarity-matrix.md:135`) is the clean Type-2/3
isomorph: both `<RekaXRoot data-disclosure … :class="cn('disclosure')"><slot/></RekaXRoot>`
(`Accordion.vue`, `Collapsible.vue` templates), sharing the `disclosure` partial, differing in the reka
primitive (Accordion = multi-item `type` axis; Collapsible = single open boolean). Distinguishing
feature named; substrate already shared; NOT a merge.

**Q2 net:** 0 factorings warranted. The overlay contradiction is JUSTIFIED divergence (truth-up note).
5 legitimate isomorph families named, each over an already-owned substrate.

---

## Q3 — Synonym roles (Type 4, different components / same purpose slot)

Read over the 35 `role_synonymy` edges + `role-census.md`. Every synonym set is either a legitimate
register or a wrapper edge that the fence already routes.

- **`combobox ↔ command` (role_syn 1.00, dom 0.67) — CLEARED (composition edge).** `command` wraps
  `combobox`: `command/*.vue` import `../combobox/types` across 8 files (`Command.vue:4`, `CommandInput
  .vue:10`, `CommandList.vue:6`, …) and `CommandDialog.vue:4` imports `Dialog/DialogContent`. Command is
  the palette built ON combobox + dialog, not a duplicate. Rule: `composition` edge → wrapper, not
  synonym. Route: negative-cleared (Q5).
- **`input ↔ textarea` (role_syn 1.00, style 0.90) — legitimate register.** Both render `<input|textarea
  v-model :class="cn('field-control glass-defined')" data-kind data-size data-state aria-invalid>`
  (`Input.vue`, `Textarea.vue` templates). The shared `field-control` substructure is already the
  primitive; input = single-line native, textarea = multi-line native — two registers of one text-entry
  slot, NOT redundancy. Route: CONFIRM (no action); the `field-control` DRY is BAND-MATERIAL's track.
- **`combobox ↔ select` (role_syn 0.50), `command ↔ select` (0.50) — legitimate registers.** combobox =
  typeahead-filter field; select = fixed-option field; command = command palette. Distinct interaction
  contracts over the same `field` slot. Route: CONFIRM.
- **deck ≡ carousel (`chrome`) — CLEARED per ASK C1.** The graph places deck+carousel in `chrome` with a
  weak coincidental dom (`alert↔carousel` etc.), but the atlas `useDeck` fact (ASK-REDUCTION C1;
  FABLE-DAG §2 C1) governs: deck is a headless engine, carousel a visual component. Route: CONFIRM the
  standing C1 recommendation (keep deck-as-engine); the graph corroborates they are not a template
  duplicate.
- **substrate synonyms — `aurora/blob/fourier-field/constellation/liquid-grid/watercolor-dot/
  paper-backdrop` (many role_syn 1.00, dom 1.00 among constellation/fourier/liquid-grid).** All share
  the `glass/procedural` host (already factored, 7×); each is a distinct procedural medium. liquid-grid
  is DELETE-ruled (ADJUDICATION-1 R1) — the graph's `constellation≅fourier-field≅liquid-grid` iso 1.00
  CORROBORATES that liquid-grid is a redundant procedural substrate (confirm the delete). The rest are
  A14-umbrella registers, keep/relocate per ASK B2/B3/B5. Route: CONFIRM (liquid-grid) + SHARPEN (B2/B3
  — the iso-1.0 confirms fourier-field/constellation are the same host, differing only in medium, which
  is the "opinionated-default viz vs demo-only" question, not a merge).
- **feedback synonyms — `pulse ≡ status-dot`** — adjudicated at Q1a (register split).
- **`instrument-chassis ↔ metric*` (role_syn 1.00, low dom/api) — CLEARED.** Same `data-display` role,
  but instrument-chassis is a gauge/instrument chassis and metric a numeric reader; role-label equality
  with low affordance/dom is coincidental co-membership, not a synonym. The A1 SHARED-KEEP census
  governs their fate. Route: CONFIRM A1.

**Q3 net:** every synonym set is a legitimate register or a fence-routed wrapper. 0 new ASK rows; 1
CLEARED-by-composition (combobox/command); confirms of C1, A1, liquid-grid.

---

## Q4 — Shared-substructure factoring

**Criterion (§3d-Q4):** an `sfc`-grain cluster (≥3 SFCs mutually isomorphic or ≥0.80) spanning ≥2
families sharing affordance/style → a candidate primitive; **clearing rule: check it is not ALREADY a
primitive.** Applying the rule, every qualifying ≥3-site substructure is already owned:

| repeated substructure | sites (≥3) | families | already-a-primitive? | verdict |
|---|---|---|---|---|
| floating-panel contract (placement + surface + 4 outside-handlers) | 8 | popover, tooltip, dropdown-menu, select, combobox, command | **YES — `_shared/floating.ts`** | ADOPT-EXISTING (no mint) |
| field-control (`field-control glass-defined` + `data-kind/size/state` + aria-invalid) | input, textarea, number-field, … | field family | **YES — `field-control` partial + `_shared/fieldControl`** | ADOPT-EXISTING |
| metric reading (`metric__reading` + `coalesceMetric`) | 3 | metric (intra-family) | **YES — `coalesce-metric.ts`** | ADOPT-EXISTING (R12 may consolidate wrappers) |
| procedural canvas host | 7 | aurora/blob/fourier/constellation/liquid-grid/… | **YES — `composables/glass/procedural`** | ADOPT-EXISTING |
| bare content wrapper (`div>slot`) | many | card, number-field, … | trivial universal shape | DO-NOT-FACTOR (overfit rule) |

**The one genuinely-novel shared substructure: dialog/drawer scene-staging.** `DrawerStage = "none" |
"dim" | "scale" | "immersive"` (`drawer/index.ts:28`) is the LITERAL twin of `DialogContent`'s stage
axis; BOTH ride the single `--stage-t` scalar + `[data-stage-wrapper]` marker + a scrim overlay
(`dialog/ModalOverlay.vue`, `drawer/DrawerOverlay.vue`) + a provide-context (`dialogStageContext.ts`,
`drawer/composables/drawerSnapContext`). Verified `data-stage-wrapper`/`--stage-t`/`data-stage-scrim`
appear across `dialog/{Dialog,DialogContent,ModalOverlay}.vue` + `drawer/{Drawer,DrawerOverlay,
index,styles.css,composables/useDrawerSnap}.ts`. This is a real 2-family duplication.

- **Why it is NOT a factoring proposal:** (1) it spans only 2 families → fails the ≥3-site rule; (2) the
  `stage` axis is a DECIDED/deferred row — coupled to GRADED-BACKDROP → BAND-MATERIAL W3
  (CHRONIC-ADJUDICATION GRADED-BACKDROP; FABLE-DAG "DialogContent stage KEEP/defer"). Re-homing the
  staging substrate now would pre-empt the W3 adopt/retire ruling.
- **Route.** Truth-up note to BAND-MATERIAL W3: the graph independently surfaces that dialog + drawer
  carry a duplicated staging/scrim substrate (`--stage-t` + the four-value `stage` enum + wrapper
  marker); when W3 rules on the `--glass-halo-*`/graded cohort, the honest scope is BOTH consumers, and
  a shared `stageContext` is the principled home IF W3 adopts. Corroboration, not a re-decision.

**Q4 net: ZERO new factorings.** The library is already factored at the substructure grain; the one
novel 2-family overlap is deferred. This is the most reassuring result in the run — the deterministic
metrics found no un-owned repeated primitive.

---

## Q5 — Negative findings (metrics flag, judgment clears)

Each with the clearing rule (these calibrate thresholds for a v1.1 run):

1. **`pulse ↔ status-dot` 0.765, `dialog ↔ drawer` 0.632** — CLEARED. Rule: **dom=1.00 over a thin
   wrapper/forwarder shell measures a shared PRIMITIVE or a shared reka substrate, not identity.** Read
   the substance (state enums / snap engine), not the shell.
2. **`combobox ↔ command`, `command → dialog`, `card → surface`, `labeled-field → input/…`, `search →
   popover/dialog`, `data-table → table`** — CLEARED. Rule: **`composition` edge present → wrapper, not
   duplicate** (A⊇B via import). Verified command→combobox+dialog on disk.
3. **`fourier-field ↔ liquid-grid` (dom 1.00), `constellation ↔ liquid-grid` (1.00), `aurora/blob/…↔
   liquid-grid`** — CONFIRM the standing DELETE (ADJUDICATION-1 R1), NOT re-open. Rule: **a finding on a
   decided row corroborates the evidence** — the iso-1.0 shows liquid-grid is a redundant procedural
   host, which supports (never re-litigates) the delete.
4. **`alert ↔ badge` (dom 1.00), `paper-backdrop ↔ skeleton` (1.00), `alert ↔ metric-stack` (1.00),
   `badge ↔ carousel`, `button ↔ surface`, … (all the ~0.33-0.44 iso-1.0 pairs)** — CLEARED. Rule:
   **topology alone is not identity** — two lozenge/panel spans share a 1-2-node shape by coincidence
   across different roles + low affordance Jaccard. dom-iso with role/affordance mismatch is noise.
5. **`checkbox ↔ radio-group` (api 0.52), `checkbox ↔ switch` (0.51), `checkbox ↔ number-field` (0.50),
   `checkbox ↔ select` (0.32)** — CLEARED. Rule: **shared reka-form-primitive prop names inflate api
   Jaccard**; each wraps a DISTINCT reka primitive with distinct semantics (a checkbox is not a switch).
6. **`header-ribbon ↔ table` etc. (header-ribbon low in_repo, `external_sibling_consumers:null`)** —
   CLEARED as a delete signal. Rule: **`null` external ≠ zero** (the header-ribbon lesson — keyframes.js
   `EditorShell.vue:116` is the undeclared consumer; FABLE-DAG KEEP). Confirm KEEP.
7. **`accordion ↔ collapsible` style 1.00, `input ↔ textarea` style 0.90, `dialog/drawer/popover/
   tooltip` style 1.00** — CLEARED. Rule: **shared style partial / `data-material` is shared SKIN, not
   shared TEMPLATE**; register variation over a common material is intended.
8. **`easing-picker ↔ easing-configurator` (api 0.56, disposition ASK)** — CLEARED to the existing ASK
   B4 (both are the `./easing` demo-privatize candidates). Rule: a decided/ASK-routed pair is not
   re-adjudicated here.
9. **`card ↔ surface` (api 0.50, `a⊇b`)** — CLEARED. Rule: `composition` edge (`card → surface`,
   FABLE-DAG L4) → wrapper; Card composes the Surface axis authority.

---

## VERDICT ROUTING TABLE

Every verdict → its destination. No verdict re-opens a DECIDED row; ASK rows are sharpened, never
re-decided. **New ASK rows minted: 0** (everything routes to existing structure — the clean result).

| # | finding | clone-type | verdict | route (appendable form) |
|---|---|---|---|---|
| V1 | pulse ↔ status-dot | T4 register | CLEAR | SHARPEN CHRONIC R12: "graph confirms pulse is a thin `FeedbackMark` register (`Pulse.vue:3`); relocate-vs-keep turns on consumer count, not redundancy." |
| V2 | dialog ↔ drawer | T3/T4 | CLEAR | CONFIRM FABLE-DAG "DialogContent stage KEEP/defer"; staging overlap → V8. |
| V3 | metric reader trio | T3 iso-family | CLEAR | SHARPEN BAND-REDUCTION W4 non-goal / CHRONIC R12: "the 3 readers (Metric/Cell/Row) share `coalesceMetric` + `metric__reading`; the R12 four-dir→one consolidation can target ONE component with `variant: inline\|cell\|row` + MetricStack container. Does not alter A1 SHARED-KEEP (surface/consumer count, user-gated)." |
| V4 | overlay `*Content` divergence | (contradiction) | JUSTIFIED variation | TRUTH-UP NOTE to lead (confirms VALIDATION §10): "§3d-Q2's `*Content` isomorph cluster does not/should not exist; each wraps a distinct reka primitive; shared contract already in `_shared/floating.ts` (8×); `role:overlay` splits into floating (floating.ts) vs modal (DialogRoot)." |
| V5 | floating-panel contract | T3 substructure | ADOPT-EXISTING | CONFIRM `_shared/floating.ts` authority (8 consumers). No mint. |
| V6 | field-control substructure | T3 substructure | ADOPT-EXISTING | CONFIRM `field-control` + `_shared/fieldControl`; input/textarea are registers (single vs multi-line). |
| V7 | procedural canvas host | T3 substructure | ADOPT-EXISTING | CONFIRM `composables/glass/procedural` (7×); liquid-grid iso-1.0 CORROBORATES ADJUDICATION-1 R1 DELETE. |
| V8 | dialog/drawer scene-staging | T3 substructure (2-family, deferred) | NO factoring | TRUTH-UP NOTE to BAND-MATERIAL W3: "dialog + drawer duplicate the staging substrate (`--stage-t` + `stage:{none\|dim\|scale\|immersive}` + `[data-stage-wrapper]` + scrim); W3's graded-cohort scope is BOTH consumers; a shared `stageContext` is the principled home IF W3 adopts." |
| V9 | combobox ↔ command | T4 (wrapper) | CLEAR | CONFIRM ASK C1-adjacent; `composition` edge command→combobox+dialog. |
| V10 | deck ≡ carousel | T4 synonym | CLEAR | CONFIRM ASK-REDUCTION C1 (deck-as-headless-engine, atlas `useDeck`). |
| V11 | fourier-field / constellation registers | T4 synonym | CLEAR | SHARPEN ASK B2/B3: "iso-1.0 confirms they share the `glass/procedural` host, differing only in medium — the keep-with-opinionated-default vs demo-only call, not a merge." |
| V12 | header-ribbon low-consumer | (delete false-positive) | CLEAR-KEEP | CONFIRM FABLE-DAG KEEP (`null` external ≠ zero). |
| V13 | ~40 iso-1.0 coincidental-shape pairs | (noise) | CLEAR | Negative-cleared (Q5.4) — topology-alone-is-not-identity; threshold calibration input for v1.1. |

**Routing counts:** CONFIRM standing rulings **6** (V5, V6, V7, V9, V10, V12) · SHARPEN existing ASK/BAND
**4** (V1→R12, V3→R12/W4, V11→B2/B3, and the R12 metric consolidation) · TRUTH-UP notes to lead **2**
(V4 overlay-assumption, V8 dialog/drawer staging→MATERIAL W3) · NEW ASK rows **0** · BAND-REDUCTION
merge amendments **0** (no outright duplicate exists to merge). Fence integrity: no DECIDED row
re-opened; the two truth-up notes are corroborations, one (V8) contradicting only PROCESS's own
assumption, not a ruling.

---

## GENERALIZATION postscript (what this instantiation taught the process)

1. **Threshold calibration — the composite score bands cleanly, and 0.85 was correct.** The whole
   ranked table lives below 0.765; there is a natural gap between the register/family cluster (0.49-0.77,
   shared-substrate variation) and the coincidental-shape noise floor (0.15-0.47). No pair sat in a
   "genuine duplicate" band because the library has none — the metric did its job by producing an EMPTY
   Q1 set rather than a forced merge. A v1.1 run should keep `0.85` for Q1 but add a **"register band"
   annotation for 0.45-0.80** so the judge is cued that these are shared-substrate variants to CLEAR,
   not merge.
2. **`dom_topology_similarity = 1.00` is the highest-noise feature at component grain.** It fired on
   thin reka-forwarder shells (`dialog↔drawer`), on shared primitives (`pulse↔status-dot` both wrap
   FeedbackMark), and on ~40 coincidental 1-2-node lozenge/panel shapes. Every dom-1.0 pair required a
   code read to clear. **Recommendation:** at component grain, weight root-SFC dom DOWN (it over-rewards
   wrapper shells) and compute dom over the *deepest non-forwarder* SFC, or gate dom-iso on an
   affordance-Jaccard floor. The `sfc`-grain dom (which correctly found the 2 real iso pairs + the
   already-factored clusters) earned its keep; the component-grain root-SFC dom did not.
3. **The feature groups that earned their keep:** `composition` (cleared every wrapper synonym
   instantly — command/combobox, card/surface, labeled-field), `role_synonymy` (surfaced the real Q3
   register questions), and `style_kinship` (correctly read shared SKIN, letting the judge separate
   material-sharing from template-sharing — the accordion/collapsible and overlay-material 1.0s). The
   `superset` flag was weak: `b⊇a` on pulse/status-dot was an api-name artifact, not a real superset —
   compute superset over TYPE-compatible props, not names.
4. **The deterministic-then-judge split validated exactly as designed.** The one place PROCESS's own
   authoring guessed wrong (the `*Content` isomorph cluster, §3d-Q2) was caught by the DETERMINISTIC
   labeled-topology extractor (VALIDATION §10), which refused to draw an edge — and the judge confirmed
   the divergence is justified. The labeled (tag-sensitive) shape-hash was the right call: had it been
   tag-insensitive it would have forced a false overlay cluster. **Keep labels in the hash.**
5. **The most transferable lesson:** at ~65 components the highest-value output is not a merge list but a
   **"substructure already factored" audit** — proving that every repeated ≥3-site primitive already has
   an owner (`floating.ts`, `fieldControl`, `coalesce-metric`, `glass/procedural`) is a stronger
   modularization signal than any single delete. A v1.1 run should make that audit a FIRST-CLASS Q
   (Q4-prime: "for each ≥3-site substructure, name its owning primitive or flag it un-owned"), because
   the un-owned case is the only one that warrants new code.

---

**Standing-ruling check.** No amendment above re-decides a DECIDED row. liquid-grid DELETE
(ADJUDICATION-1 R1), metric SHARED-KEEP (A1), deck-as-engine (C1), completion-seal (A2), the
GRADED-BACKDROP→MATERIAL W3 staging deferral, and header-ribbon KEEP are all CONFIRMED or SHARPENED,
never re-opened. The two truth-up notes (V4, V8) are corroborations of evidence routed to the lead per
the §-top fence.
