# VALIDATION — CONSTRUCT seat (component-graph)

The deterministic build of `component-graph.json` per `PROCESS.md` §3c. This seat is the
deterministic arm: no design judgment, no verdicts. It builds the artifact and asserts the six
validation seeds; INFER (the Fable judge) consumes the output. Nothing under `src/` was touched.

## How to re-run

```
node docs/tranches/BJ/formation/component-graph/extract/build-graph.mjs
```

Run from the repo root with the repo's own node + `node_modules` (`@vue/compiler-sfc` 3.5.40,
`typescript` 6.0.3). One entry point; it enumerates → parses → builds composition edges → runs the
six seeds → (on all-pass) layers in the five similarity edge types → emits `component-graph.json` +
the four rendered views. Re-runs at the same HEAD are **byte-identical** (verified by diffing two
consecutive runs): every node/edge list is canonically sorted, floats are rounded to 4 dp, and there
is no timestamp in the artifact — `generatedAt: null`, the git `commit` field dates it.

Built at HEAD recorded in `component-graph.json.commit`. The DAG doc this graph subsumes was written
at `55f5170d`; some soft counts drift across that span (see seed 3).

## Node / edge census (emitted in `meta`)

| class | count | analyzed? |
|---|---|---|
| `component` | 69 | yes |
| `sfc` | 188 | yes (topology + substructure) |
| `composable` | 38 | edge target (partial) |
| `style` | 59 | no (`analyze:false`, edge target) |
| **total vertices** | **354** | 295 analyzed + 59 reference |

Edges: `composition` 689 · `api_similarity` 4 · `dom_topology_similarity` 198 · `style_kinship` 47 ·
`animation_kinship` 2 · `role_synonymy` 35.

## Validation seeds (§3c.6) — build order: skeleton + seeds FIRST, then similarity

All six assert on the **composition-only skeleton** before any similarity edge is computed (per the
charter's "prove the skeleton reproduces the DAG doc, THEN layer similarity"). If any had failed, the
build writes the skeleton and exits non-zero without computing similarity.

| # | seed | result | measured |
|---|---|---|---|
| 1 | dock⇄dropdown-menu cycle | **PASS** | `sfc:dock/DockTrigger.vue → sfc:dropdown-menu/DropdownMenuTrigger.vue` = true; `sfc:dropdown-menu/DropdownMenuContent.vue → composable:dock/dockContext` = true |
| 2 | dockContext 4-family fan-in | **PASS** | 4 distinct non-dock families: dropdown-menu, popover, select, slider |
| 3 | hub weights | **PASS** | cn=**133** (DAG 133 ✓), primitive=**50** (DAG 50 ✓), axes=**31**, selection=**16**; rank cn>prim>axes>sel ✓ — see note below |
| 4 | timeline-5 sfc / metric-4 units | **PASS** | timeline SFC members = 5/5 (ContinuousRail/ContinuousTimeline/GlassTimeline/ScrubberTimeline/SegmentedTimeline); metric export-units = 4/4 |
| 5 | glass-atom + glass-chip orphans | **PASS** | `glass/glass-atom.css`.imported_by_root=false; `glass/glass-chip.css`.imported_by_root=false |
| 6 | Card/Button defaults | **PASS** | Card.metal=`"gold"`, Card.grain=`true`, Button.emphasis=`"secondary"` |

Machine-readable copy: `extract/seed-results.json`.

### Seed 3 note — the axes/selection divergence is a MORE-complete extractor, not a bug

The DAG doc's two **bolded** hubs reproduce EXACTLY — `cn` (133, "THE hub") and `primitive` (50). The
seed-3 predicate is therefore `cn===133 ∧ primitive===50 ∧ rank(cn>prim>axes>sel)`, all of which hold.

`axes` and `selection` diverge numerically from the DAG's `27`/`20`, and this was traced to disk:

- **axes = 31 (DAG 27).** The extractor resolves relative imports fully, so it counts the four
  intra-`_shared` `from "./axes"` importers the DAG's `_shared/axes`-string grep missed:
  `useMotionAxis.ts`, `feedback.ts`, `resolveSurfaceClass.ts`, `floating.ts`. 31 is the complete
  import-edge fan-in.
- **selection = 16 (DAG 20).** Disk at this HEAD has 15 `_shared/selection` importers + 1 intra-`_shared`
  (`interaction.ts` `from "./selection"`) = 16. The DAG's 20 was at `55f5170d`; it does not reproduce at
  the current HEAD.

Per the charter ("the truth is on disk"), the extractor emits the true fan-in; the seed asserts the
DAG's reproducible structural claim (the two headline weights + the hub ranking), which holds. This is
recorded as a corroboration-with-variance, not a forced number.

## Construction notes (ambiguity resolutions, per the charter)

1. **Export-unit split.** One `component` node per family (65 dirs), EXCEPT the two families §2 names as
   splitting: `metric` → 4 (`component:metric`,`metric-cell`,`metric-row`,`metric-stack`) and `easing`
   → 2 (`easing-picker`,`easing-configurator`) = **69 component nodes**. `timeline` stays ONE component
   node (`GlassTimeline`, the sole barrel export); seed 4 pins timeline's "5" as SFC *members*, not
   export-units. Compound families (card/dialog/dock/select/combobox/command/table…) stay one component
   node — their sub-parts are `sfc` nodes, not peer components. The split set is taken verbatim from §2;
   no universal "peer vs sub-part" rule distinguishes metric from card deterministically, so the spec's
   explicit enumeration governs.
2. **Composable node grain.** `composables/*` submodules (glass/motion split to their known subdirs) +
   every `_shared/*.ts` leaf (demarcation rule 1) + only the **cross-family** `<fam>/composables/*`
   authorities: `dock/dockContext` (5 families), `dock/useDockHold` (2), `tabs/useTabRovingFocus` (2).
   Single-family engine helpers (`aurora/*`, `blob/*`, `sortable-list/*`, …) are demoted into their
   owning component (§2 "where warranted"). = 38 composable nodes.
3. **Style node set.** §2's three explicit globs — `glass/*`, `tokens/*`, top-level `styles/*.css` = 59
   nodes. Chosen over §3c stage-1's `styles/**/*.css` (73, which would add the `theme/`/`typography/`/
   `utilities/` subdirs) because §2 is the node-universe demarcation authority and yields the stated
   ≈60. `imported_by_root` is a transitive `@import` BFS rooted at `styles/index.css`.
4. **Hub weight** = distinct importing-**module (file)** fan-in via full relative-import resolution,
   stamped on every composition edge into the target. (See seed-3 note.)
5. **Role seeding** keys on `family_id` (not the export-name kebab) because the §3a.6 rules are
   family-concept-based — `GlassDock`→dock (nav), `HandMark`→handmark (substrate), `GlassTimeline`→
   timeline (data-display) would all mis-miss on the export kebab. Rule (iii) is split: its
   reka-form-primitive arm keeps its §3a.6 position (`iii`); its **generic click+press affordance arm is
   a last-resort fallback** (`iii-aff`) applied AFTER the name-anchored rules iv–x, so an explicitly-named
   nav/chrome whose trigger carries press handlers (dock, deck) is not mis-seeded `control`. Both the
   seed label and the fired rule id are recorded per node for INFER's audit. `configurator` is the one
   `role:null` (no rule matches → INFER assigns, exactly as §3a.6 intends).
6. **Layer** = structural depth only (L3 leaf / L4 composite / L5 substrate). The DAG's **L6 is not
   assigned** — the DAG doc itself calls it "the reduction targets, **not a real layer**" (a
   reduction-band judgment overlay). The reduction evidence rides `demo_only` + `consumer_census`
   instead. Histogram: L3=48, L4=13, L5=8.
7. **`demo_only`** = `in_repo_consumers==0 ∧ has-a-demo-consumer` — the faithful §3a.8 reading
   ("in-repo consumers all under `demo/`"; in-repo includes `demo/`, which is not itself a node). It is
   a signal, not a verdict; the external evidence is the separate `external_sibling_consumers`.
8. **`external_sibling_consumers`** = distinct external-repo count JOINED from `../round-2/adversarial-
   verification-of-round-1-...md` (transcribed into `extract/external-census.mjs`; the doc is prose, not
   machine-parseable, so a curated constant table with per-row provenance is the simplest faithful JOIN).
   Folded/removed subpaths are attributed to their 7.0.0 successor family (e.g. `/metric-badge`→metric).
   `null` where the doc has no probe row (the header-ribbon lesson: absence of a probe ≠ zero); `0` only
   for `liquid-grid` (the one explicit "grep = 0 across all repos" probe).
9. **`generatedAt: null`** (charter: no timestamp; the git commit dates it). `commit` = build-time HEAD.
10. **dom similarity is label-sensitive** per §3a.2 (tags preserved in `shape_string`/`shape_hash`).
    **Finding recorded (contradiction of an assumed exemplar):** the overlay `*Content` panels do NOT
    form the tight isomorph cluster §3d-Q2 anticipates — on disk they have diverged to distinct sizes
    and reka wrapper tags (PopoverContent n=8 multi-portal, DialogContent n=11, DrawerContent n=7,
    TooltipContent n=3, DropdownMenuContent n=3), so no `dom_topology_similarity` edge links them. Only 2
    isomorphic SFC pairs exist among content components (`card/CardContent ≅ number-field/
    NumberFieldContent`; `dropdown-menu/DropdownMenuContent ≅ .../DropdownMenuSubContent`). Their
    `shape_string`s are in the JSON for INFER's semantic Q2 (the Type-4/skin judgment the deterministic
    labeled method is designed to defer). Routed as a note, not a re-decision, per the standing-ruling
    fence.
11. **Zhang-Shasha TED** (labeled, tag-only trees) is pruned to size-compatible pairs (max node-count
    ≤140, size ratio ≤3) to bound cost; every hash-equal pair is `isomorphic:true` weight 1.0 regardless.
    At 188 SFCs the pairwise budget is trivial; the prune only skips pairs that could not clear the 0.80
    threshold anyway.

## Rendered views (§3c "Rendered views")

- `similarity-matrix.md` — per-`role`-family heatmaps (api / style / anim / dom root-sfc).
- `overview.mmd` (+ `overview.md` with the embedded mermaid block) — whole graph by layer L0–L5,
  composition solid (component→component) and dashed (component→hub), the dock⇄dropdown-menu cycle and
  orphan partials reproduced.
- `duplication-candidates.md` — the ranked component↔component table (310 rows, composite ≥0.15 desc),
  `current_disposition` from the standing rulings, a **mechanical** `suggested-finding` clone-type hint
  (NOT a verdict). **INFER's primary input.**
- `role-census.md` — components grouped by seeded `role` + fired rule id.

## Top-5 duplication candidates (composite, no verdicts — INFER adjudicates)

| # | pair | composite | api · dom · style · role |
|---|---|---|---|
| 1 | `pulse ↔ status-dot` | 0.765 | 0.68 · 1.00 · 0.75 · 1.00 |
| 2 | `dialog ↔ drawer` | 0.632 | 0.36 · 1.00 · 1.00 · 0.50 |
| 3 | `metric-cell ↔ metric-row` | 0.505 | 0.73 · 0.64 · 0.62 · — |
| 4 | `metric ↔ metric-row` | 0.496 | 0.85 · 0.50 · 0.62 · — |
| 5 | `metric ↔ metric-cell` | 0.494 | 0.65 · 0.71 · 0.57 · — |
