# BJ — the component-and-library graph PROCESS (family C · A05 · A14)

**Mode:** TRANCHE-DEVELOPMENT. This doc is the RESEARCH seat's only artifact. It touches no `src/`,
mints no commit. It is the spec two downstream seats execute literally — CONSTRUCT (builds the graph
artifact from the deterministic extraction here) and INFER (a Fable judge running the inference
protocol here over the built artifact). Write once, read twice; both seats must be able to run without
asking a question.

**What this graph is.** A GENERALIZED COMPONENT-AND-LIBRARY GRAPH: nodes are whole components carrying
metadata (API, DOM topology, style/material, animation, affordance, role, size, export surface), plus the
substrate/composable authorities they reach. Edges carry both the literal dependency (imports) and five
computed similarity relations. The analysis hunts, over that graph: **synonyms** (different components
filling the same purpose slot), **isomorphisms** (same structure, different skin), **redundancies of
structure shared between whole components**, **shared substructure OF whole components** (a sub-template
repeated across families that wants to be a primitive), and **outright duplicative components**.

**Relation to the existing DAG.** `../perfection/FABLE-DAG-REDUCTION.md` drew the import-dependency layer
(L0-L6, the hubs, the `dock ⇄ dropdown-menu` cycle, the `dockContext` 4-family fan-in). **This graph
SUBSUMES that doc as exactly ONE of its six edge types (`composition`) and one node attribute (`layer`).**
The other five edge types and the ten feature groups are new. The DAG's findings become validation seeds
(§3c.6): if the constructed graph does not reproduce them, the extraction is buggy.

**Standing-ruling fence (binding on INFER).** The graph *informs* merges/deletes; it never re-opens a
decided row. `ADJUDICATION-1` (liquid-grid DELETE; ./sidebar drop window CLOSED to 8.0.0; type-codemod
owner), `CHRONIC-ADJUDICATION` (R13 hover-popover→Popover `trigger="hover"`; R14 completion-seal ASK; R16
metric-badge both-deleted-confirmed; GRADED-BACKDROP→MATERIAL W3), and the `ASSEMBLY-CROSSWALK` dispositions
are terminal. A graph finding that lands on a decided row is recorded as *corroboration or contradiction of
the evidence*, and if it contradicts, it routes to the lead as a truth-up note — it does NOT re-decide.

---

## 1. SOTA brainstorm — what transfers, what does not

Surveyed: code-clone detection (Type 1-4), program-dependence/graph-similarity (graph edit distance,
Weisfeiler-Leman kernels), AST fingerprinting (Deckard-style LSH feature vectors), embedding/BERT semantic
code similarity, and design-system audit tooling (component-usage analytics, token-drift/lineage). Sources
at the end of this section.

### 1.1 The clone-type taxonomy is the transferable backbone

The Type 1-4 clone taxonomy re-expresses cleanly at COMPONENT granularity, and it is the spine of the whole
process:

| clone type | function-level meaning | our component-level analog | detector |
|---|---|---|---|
| **Type 1** | identical but whitespace/comments | byte-identical component (same template, same props) | exact template-shape-hash + api-Jaccard = 1.0 |
| **Type 2** | + renamed identifiers | same structure, renamed props / different tokens — **"isomorphic, different skin"** | shape-hash equal, style-kinship LOW |
| **Type 3** | + insertions/deletions/reorder | same structure with a superset/subset of props or an extra wrapper element | dom-topology-sim 0.8-0.99; api superset relation |
| **Type 4** | same computation, different implementation | same PURPOSE, different implementation — **"synonym role"** (toast≡dialog feedback) | role-synonymy; **structural methods provably miss this** |

Everything else in the survey is a *technique for computing one of these four relations at scale*. At our
scale (≈65 first-party components), the scale-solutions are unnecessary and less interpretable than exact
methods.

### 1.2 What transfers to component-level analysis of this library

- **PDG / graph-similarity → the whole-library DAG + composition edges.** The dependency-graph idea is
  exactly the DAG doc's import graph, generalized here to a typed multigraph. Weisfeiler-Leman kernels apply
  in principle to both the template-DOM tree and the composition graph, but (a) WL provably handles only
  Type-1/2 (per Panchal 2026 / CCgraph), which our **exact shape-hash already nails**, and (b) at 65 nodes
  the pairwise budget is ≈65²≈4.2k comparisons — trivial — so an approximate kernel buys nothing.
- **AST fingerprinting (Deckard/LSH) → the template-shape-hash + the composite feature vector.** We keep the
  *feature-vector* idea and drop LSH: locality-sensitive hashing is a millions-of-LOC scalability trick;
  pairwise exact comparison is both feasible and interpretable here.
- **Tree edit distance (Zhang-Shasha) → the dom-topology similarity metric** for Type-3 (near-isomorphic
  templates with insertions). This is the one classical algorithm we actually run, on tag-only trees.
- **Embedding/BERT semantic similarity → the Fable INFER seat.** The survey is explicit that fingerprint and
  kernel methods fail at Type-4 (semantics, not syntax). Rather than train a code-embedding model over 65
  components (a corpus that small will not learn), the LLM judge IS the interpretable substitute for the
  semantic-clone detector — and it carries design judgment (purpose, iOS-27 idiom) no embedding has. **This is
  exactly the deterministic-then-inference split the user ordered:** determinism produces candidates for
  Types 1-3 and role-synonymy seeds; the judge adjudicates Type-4 and clears false positives.
- **Design-system audit tooling → vocabulary and framing only.** "Token drift, unused variants, duplicate
  components, tie the audit to the graph" is the right vocabulary and the family-C/token-canon goal. But those
  tools operate on the *design* artifact (Figma) or *runtime usage*; ours is source-derived and static, which
  is stronger for a code library (it sees dead props the runtime never exercises — the 73%-≤1-setter census).

### 1.3 What does NOT transfer (with reasons)

- **Function-level CFG/PDG Type-4 detectors.** A component is not a function; its "computation" is a render
  tree plus a reactive-binding surface, not a control-flow graph. There is no CFG to align. The faithful analog
  is the template-DOM tree + the props/emits/model reactive surface — which we fingerprint directly.
- **Deep-learning clone models (SSCD/BERT-nn).** Need a trained embedding, a large corpus, and GPUs;
  disproportionate for 65 first-party components and non-interpretable. The judge substitutes.
- **LSH/MinHash whole-repo scanners.** Solve a scale problem we do not have; they trade recall for speed and
  obscure *why* two nodes matched. Exact pairwise + a cited composite score is the better instrument here.
- **Figma/runtime design-audit plugins.** Wrong input surface (design tool / live DOM), and they cannot see
  the never-set prop that only static source reveals.

**SOTA verdict (one line).** The clone-type-1-4 taxonomy is the transferable backbone; deterministic
exact-shape-hash + Zhang-Shasha TED + feature-Jaccard covers Types 1-3 at library scale (WL-kernels, LSH, and
learned embeddings are scale-solutions we do not need and that are less interpretable), and the Fable judge is
the interpretable substitute for the embedding-based Type-4 semantic-clone detector that structural methods
provably miss.

**Sources.** Panchal 2026, *Metrics-First, Language-Aware Clone Type Recognition* (Wiley JSEP); *SEED:
Semantic Graph based Deep detection for type-4 clone* (arXiv 2109.12079); *DSFM: Enhancing Functional Code
Clone Detection* (ACM 3639215); Ahmed 2024, *Nearest-neighbor BERT-based scalable clone detection* (Wiley
SPE); Tony Ward, *A New Way to Audit Design System Usage*; Figma community *Design System Auditor* +
*Component audit and linting*.

---

## 2. Node universe — delineation and demarcation

The graph has four vertex classes. Two are **analyzed** (duplication-scored); two are **reference-only**
(edge targets, not scored for duplication — their owning bands already govern them).

| class | granularity | count (delineated) | analyzed? | why |
|---|---|---|---|---|
| **`component`** | one whole-component family per `src/components/*/` dir shipping a root `.vue`, unioned with each entry `src/index.ts` re-exports as a component | **≈65 families → ≈72 export-units** (metric splits to 4, easing to 2, timeline to 5; CONSTRUCT resolves the exact split from the barrels) | YES | the user's node = whole component |
| **`sfc`** | one per `.vue` file, `parent` = its `component` node | **188** | YES (topology + substructure only) | shared substructure OF whole components lives at the sub-SFC grain (every `*Content.vue`, every `*Trigger.vue`) |
| **`composable`** | one per composable submodule that is an import target under `src/composables/*` | **≈12** (color, context, dark, dom, glass{procedural,webgl,webgpu,wave,specular}, keyboard, motion{spring,morph,scroll,reveal,pointer}, reactive, sidebar) | partial — edge target for `composition`; `component_like:true` where it has a public subpath (sidebar — the demote candidate) | the user allows composable nodes "where warranted"; they are the composition-edge sinks |
| **`style`** | one per CSS partial under `src/styles/glass/*`, `src/styles/tokens/*`, `src/styles/*.css` | **≈60** | NO (`analyze:false`) — edge target for `style_kinship` only | material/token band owns their reduction; here they are the styling-hook resolution targets |

**Delineated node universe:** ≈72 `component` + 188 `sfc` + ≈12 `composable` = **≈272 analyzed nodes**, plus
≈60 `style` reference nodes = **≈332 vertices total**. CONSTRUCT emits the exact counts in `meta`.

**Demarcation rules (exact, so the boundary is not a judgment call):**
1. `_shared/` is NOT a `component` — its members are `composable`-class leaves (`primitive.ts`, `selection.ts`,
   `class-names.ts`, `axes.ts`, …) or `style` partials (`menu.css`, `feedback-tone.css`). They are hub edge
   targets, not duplication-analyzed as components.
2. A directory with multiple root exports (metric, easing) yields one `component` node per export-unit; the
   family relationship is recorded as `family_id` on each so per-family views group them.
3. Sub-SFCs that are pure reka forwarders with no template of their own (a `defineExpose` shim) still get an
   `sfc` node, flagged `template_empty:true`, and are excluded from topology similarity (nothing to compare).
4. `demo/**` is OUT of the node universe entirely — this is a *library* graph. A component's `export_surface`
   records whether its only consumer is `demo/` (the demo-privatize signal), but demo pages are not nodes.
5. The dead-in-dist partials `glass/glass-atom.css` + `glass/glass-chip.css` ARE `style` nodes, flagged
   `imported_by_root:false` — so the graph reproduces the orphan finding structurally (validation seed §3c.6).

---

## 3. The codified process

### 3a. Node schema — features per node, each with its exact deterministic source

Every `component` and `sfc` node carries ten feature groups. Each field names the EXACT extraction source so
CONSTRUCT parses, never guesses. Primary parser: **`@vue/compiler-sfc`** (`parse()` → `descriptor`;
`compileScript()` → setup bindings; `descriptor.template.ast` → topology) — confirmed present at
`node_modules/@vue/compiler-sfc`. TS interface/barrel resolution: **`typescript`** (`ts.createSourceFile`) —
confirmed present (v6.0.3).

1. **`api_signature`** — `{ props:[{name,type,default,required}], emits:[name], slots:[name], model:[name],
   exposes:[name] }`.
   Source: `compileScript()` bindings + AST walk of `defineProps`/`withDefaults`/`defineEmits`/`defineSlots`/
   `defineModel`/`defineExpose`. For typed props (`defineProps<ButtonProps>()`), resolve the interface: read
   the SFC's own `export interface`, then follow `extends` (`ButtonProps extends PrimitiveProps`) into
   `_shared/primitive.ts` and `types.ts`, and resolve axis unions from `_shared/axes.ts` — with `typescript`.
   Slot names also come from `<slot :name>` tags and `data-slot` attrs in the template. Defaults come from the
   `withDefaults` object literal (e.g. Button `emphasis:"secondary"`, Card `metal:"gold"`, `grain:true`).
2. **`dom_topology`** — `{ shape_tree, node_count, max_depth, shape_string, shape_hash }`.
   Source: `descriptor.template.ast`. Walk element nodes (type 1) depth-first; record the ordered tree of tag
   names (element tags + component tags, PascalCase preserved). `shape_string` = tag-only pre-order
   serialization with depth markers, attrs/text/directives STRIPPED. `shape_hash` = sha1 of `shape_string`.
   This is the isomorphism and shared-substructure carrier; it runs at `sfc` grain.
3. **`style_consumption`** — `{ utility_classes:[…], custom_props_read:[…], custom_props_written:[…],
   resolved_partials:[…], data_hooks:[…], scoped_selectors:[…] }`.
   Source: (a) literal class strings passed to `cn(...)` and static `class="…"`/`:class` in template/script
   (e.g. `glass-wash`, `glass-capsule`, `glass-capsule-hover`, `tap-squish`, `focus-ring`); (b) `--*` names in
   `<style>`, inline `:style`, and directive/composable args (`useLiquidPress({pressVar:"--glass-btn-press-t"})`);
   (c) `resolved_partials` = map each `.glass-*`/utility class to the partial that DEFINES it, via a
   `class→partial` table CONSTRUCT builds once by grepping `src/styles/**` for each selector; (d) `data_hooks`
   = the `data-*` attrs the template emits (`data-emphasis`, `data-tone`, `data-size` — these are the CSS
   styling hooks the partials key off); (e) `<style scoped>` selector list.
4. **`animation_register`** — `{ spring_presets:[…], motion_composables:[…], keyframes:[…], transitions:[…],
   directives:[…], raf:bool }`.
   Source: string scan for `springPreset("x")` / `SPRING_PRESETS` (preset vocabulary: `smooth, snappy, bouncy,
   gentle, dock, press, transient`); import scan for `useLiquidPress`/`useSpring`/`motion/morph`/`motion/reveal`/
   `motion/scroll`; `<style>` grep for `transition:`/`animation:` properties + referenced `@keyframes` names
   (resolve against `src/styles/animations.css`'s 15 keyframes + local blocks); template directive scan
   (`v-specular`, reveal directives); `raf` = does any imported composable call `requestAnimationFrame` (one-hop).
5. **`affordance_register`** — `{ handlers:[…], aria:[…], role, tabindex, data_state:bool, focus_ring:bool,
   tap_squish:bool, reka_primitive:[…], drag:bool }`.
   Source: template `@`-handler scan (`@click`, `@pointerdown/up/enter/leave/cancel`, `@keydown/up`, `@focus`,
   `@blur`, `@drag*`); `aria-*` + `role` + `tabindex` attr scan; presence of `focus-ring`/`tap-squish` classes;
   the wrapped reka primitive from imports (`Primitive`, `Toggle`, `SliderRoot`, `DialogRoot`, …).
6. **`role`** — one controlled-taxonomy label. Taxonomy (fixed):
   `control · field · container · overlay · feedback · nav · data-display · substrate · motion-primitive ·
   typography · chrome · demo-device`.
   Deterministic SEED rules (first match wins; ties + no-match → `role:null`, INFER assigns):
   (i) imports `composables/glass/procedural|webgl|webgpu|wave` → `substrate`;
   (ii) wraps a reka overlay primitive (Dialog/Popover/Tooltip/DropdownMenu/HoverCard) → `overlay`;
   (iii) wraps a reka form primitive (Slider/Switch/Checkbox/RadioGroup/Toggle/NumberField) OR affordance =
   {click + toggle/press} → `control`;
   (iv) wraps a reka input/text primitive OR name ∈ {input,textarea,select,combobox,search,tags-input,
   number-field,labeled-*} → `field`;
   (v) name ∈ {aurora,blob,fourier-field,constellation,liquid-grid,watercolor-dot,paper-backdrop,handmark} →
   `substrate` (redundant with (i), kept as a name-anchor);
   (vi) reka collapsible/accordion/tabs/card/surface/separator → `container`;
   (vii) alert/toast/progress/pulse/skeleton/status-dot/badge/completion-seal → `feedback`;
   (viii) dock/header-ribbon/pager-dots/carousel/deck/scroll-progress-rim/sidebar → `nav`/`chrome`
   (dock/sidebar = `nav`; the rest = `chrome`);
   (ix) metric*/data-table/table/timeline/avatar → `data-display`; label → `typography`;
   (x) animated-digit/typewriter/easing/fading-scroll/infinite-scroll/sortable-list → `motion-primitive`;
   (xi) `export_surface.demo_only` → also tag `demo-device` (orthogonal flag, not a replacement).
   CONSTRUCT records BOTH the seed label and the rule id that fired, so INFER can audit the seeding.
7. **`size_metrics`** — `{ loc:{script,template,style,total}, prop_count, emit_count, slot_count,
   template_node_count, template_depth, sfc_count }`. Source: line counts per `descriptor` block; counts from
   groups 1-2; `sfc_count` = number of `.vue` in the family dir.
8. **`export_surface`** — `{ root_barrel:bool, subpath:string|null, types_file:bool, demo_only:bool }`.
   Source: parse `src/index.ts` (root barrel `export *`/named), `package.json` `exports` + `typesVersions`
   (subpath), presence of `types.ts`, and `demo_only` = in-repo consumers are all under `demo/` (from the
   `composition` in-edges).
9. **`composition`** — the outgoing import edges (materialized as edges §3b.1, mirrored here for locality):
   `{ imports_components:[…], imports_composables:[…], imports_partials:[…] }`. Source: import-statement scan.
10. **`consumer_census`** — `{ in_repo_consumers:int, external_sibling_consumers:int|null, layer:"L0..L6" }`.
    `in_repo_consumers` = component `composition` in-degree (deterministic here). `external_sibling_consumers`
    is NOT re-derived — it is JOINED from the family-B census (`../round-2/adversarial-verification…md`); where
    family-B has no row, the field is `null` (unknown), never `0` (the header-ribbon lesson: absence of an
    in-repo probe is not proof of zero siblings). `layer` = the L0-L6 assignment from the DAG doc.

### 3b. Edge types — deterministic computation, metric, threshold

Six edge types. `composition` is directed; the five similarity edges are undirected and weighted `[0,1]`.
Thresholds below are PROPOSALS for the two-challenge pass to tune; CONSTRUCT emits the raw score on every
edge so INFER can re-threshold without a re-run.

1. **`composition`** (directed) — A imports B. *Compute:* import-statement scan (subsumes the DAG doc).
   *Metric:* edge exists + `weight` = fan-in count of B (the hub weight: `cn`=133, `primitive`=50, `axes`=27,
   `selection`=20). *Threshold:* n/a (literal). Cycles preserved (`dock ⇄ dropdown-menu`).
2. **`api_similarity`** (undirected) — *Compute:* weighted Jaccard over the union of prop-name, emit-name, and
   slot-name signatures; a type-compatible prop pair scores 1.0, a name-only match 0.7. `J = Σmatch / |A∪B|`.
   *Threshold:* ≥0.60 = candidate; ≥0.85 = near-duplicate API. Superset relation recorded separately
   (`api_superset: A⊇B`) — the Type-3 wrapper signal.
3. **`dom_topology_similarity`** (undirected, `sfc` grain) — *Compute:* (a) `shape_hash` equality →
   `isomorphic:true`, weight 1.0; else (b) `1 - TED/max(|A|,|B|)` where TED = Zhang-Shasha tree edit distance
   over tag-only trees. *Threshold:* hash-equal OR sim ≥0.80. This is the isomorphism + shared-substructure
   detector.
4. **`style_kinship`** (undirected) — *Compute:* Jaccard over the union of `{utility_classes ∪ custom_props ∪
   resolved_partials ∪ data_hooks}`. *Threshold:* ≥0.50 = same material family. LOW style_kinship on a
   hash-equal topology edge = the Type-2 "same structure, different skin" isomorph.
5. **`animation_kinship`** (undirected) — *Compute:* Jaccard over `{spring_presets ∪ motion_composables ∪
   keyframes ∪ transition-properties}`. *Threshold:* ≥0.50.
6. **`role_synonymy`** (undirected) — *Compute:* equal `role` label AND `affordance_register` Jaccard ≥0.50
   AND NOT connected by a `composition` edge (a wrapper is not a synonym). *Threshold:* the conjunction above.
   This is the Type-4 seed (toast≡dialog, deck≡carousel candidates) for INFER.

**Composite duplication score** (for the ranked candidates table, `component`↔`component` pairs):
`S = 0.30·api + 0.30·dom + 0.15·style + 0.10·anim + 0.15·role_syn`, where `dom` at component grain =
best `dom_topology_similarity` over the two families' root SFCs. Emitted on every scored pair; the table sorts
`S` descending. Weights are a PROPOSAL — CONSTRUCT stores the components so INFER can reweight.

### 3c. Deterministic pipeline spec — for the CONSTRUCT seat

**Where the script lives:** `docs/tranches/BJ/formation/component-graph/extract/` — an ES-module
`build-graph.mjs` plus helper modules (`parse-sfc.mjs`, `resolve-types.mjs`, `class-partial-map.mjs`,
`similarity.mjs`, `render-views.mjs`). Run with the repo node. **Promotion of the script to `scripts/` is a BJ
wave decision, not CONSTRUCT's** — it stays under `extract/` for the formation.

**Pipeline stages (exact):**
1. **Enumerate** the node universe per §2 (glob `src/components/*/`, `src/components/**/*.vue`,
   `src/composables/*`, `src/styles/**/*.css`; union with `src/index.ts` + `package.json` exports).
2. **Build the `class→partial` map** once: grep `src/styles/**/*.css` for every `.glass-*`/utility selector →
   `{class: partial-path}`. Cache to `extract/class-partial-map.json`.
3. **Parse each SFC** with `@vue/compiler-sfc`; extract feature groups 1-8 + 9's import lists. Resolve typed
   props/interfaces with `typescript` following `extends` chains into `_shared` + `types.ts` + `axes.ts`.
4. **Materialize `composition` edges** from the import lists; compute in-degrees (hub weights, layers).
5. **JOIN `consumer_census`** external counts from `../round-2/adversarial-verification…md` (parse its break
   table); leave `null` where absent.
6. **Compute the five similarity edge types** pairwise (≈272 analyzed nodes → the component×component matrix is
   ≈2.6k pairs, the sfc topology matrix ≈17.6k pairs — both trivial). Emit every score.
7. **Emit `component-graph.json`** (schema below).
8. **Render the views** (§ Rendered views).

**Output artifact — `component-graph.json` (versioned):**
```json
{
  "schemaVersion": "1.0.0",
  "generatedAt": "<iso>",
  "commit": "<git HEAD sha>",
  "meta": { "componentNodes": 0, "sfcNodes": 0, "composableNodes": 0, "styleNodes": 0,
            "edgeCounts": { "composition": 0, "api_similarity": 0, "dom_topology_similarity": 0,
                            "style_kinship": 0, "animation_kinship": 0, "role_synonymy": 0 } },
  "nodes": [
    { "id": "component:button", "class": "component", "family_id": "button", "parent": null,
      "layer": "L3", "role": "control", "role_rule": "iii",
      "api_signature": { "props": [], "emits": [], "slots": [], "model": [], "exposes": [] },
      "dom_topology": { "node_count": 0, "max_depth": 0, "shape_string": "", "shape_hash": "" },
      "style_consumption": { "utility_classes": [], "custom_props_read": [], "custom_props_written": [],
                             "resolved_partials": [], "data_hooks": [], "scoped_selectors": [] },
      "animation_register": { "spring_presets": [], "motion_composables": [], "keyframes": [],
                              "transitions": [], "directives": [], "raf": false },
      "affordance_register": { "handlers": [], "aria": [], "role": null, "tabindex": null,
                               "data_state": false, "focus_ring": false, "tap_squish": false,
                               "reka_primitive": [], "drag": false },
      "size_metrics": { "loc": {}, "prop_count": 0, "emit_count": 0, "slot_count": 0,
                        "template_node_count": 0, "template_depth": 0, "sfc_count": 0 },
      "export_surface": { "root_barrel": true, "subpath": "./button", "types_file": false, "demo_only": false },
      "composition": { "imports_components": [], "imports_composables": [], "imports_partials": [] },
      "consumer_census": { "in_repo_consumers": 0, "external_sibling_consumers": null, "layer": "L3" } }
  ],
  "edges": [
    { "type": "composition", "from": "component:button", "to": "composable:motion/spring", "weight": 13 },
    { "type": "api_similarity", "a": "component:popover", "b": "component:tooltip", "score": 0.0,
      "api_superset": null },
    { "type": "dom_topology_similarity", "a": "sfc:popover/PopoverContent.vue",
      "b": "sfc:tooltip/TooltipContent.vue", "score": 0.0, "isomorphic": false },
    { "type": "role_synonymy", "a": "component:toast", "b": "component:dialog", "score": 0.0 }
  ],
  "families": [ { "family_id": "metric", "members": ["component:metric","component:metric-cell",
                  "component:metric-row","component:metric-stack"] } ],
  "duplication_candidates": [
    { "a": "component:x", "b": "component:y", "composite": 0.0,
      "sub": { "api": 0, "dom": 0, "style": 0, "anim": 0, "role_syn": 0 },
      "current_disposition": "KEEP|DELETE|ASK|none", "disposition_source": "BAND-REDUCTION W2 | ADJUDICATION-1 R1 | none" }
  ]
}
```
`schemaVersion` is bumped on any field change; INFER pins the version it read.

**Rendered views (CONSTRUCT emits, all land in `docs/tranches/BJ/formation/component-graph/`):**
- `similarity-matrix.md` — per-`role`-family heatmap tables (api / dom / style / anim), so within-family
  redundancy reads at a glance (all `overlay`, all `control`, all `substrate`, …).
- `overview.mmd` (+ an embedded mermaid block) — the whole graph by layer L0-L6 (subsumes the DAG doc's
  mermaid) with `composition` edges solid and similarity edges dashed, colored by type. The `dock ⇄
  dropdown-menu` cycle and the dead orphan partials render as in the DAG doc.
- `duplication-candidates.md` — the ranked table, columns: `pair · api · dom · style · anim · role · composite
  · current_disposition · suggested-finding`. Sorted by `composite` desc. **This is INFER's primary input.**
- `role-census.md` — nodes grouped by `role` (seed label + rule id), the synonym-scan input.

**Correctness — validation seeds (CONSTRUCT asserts these before emitting; a miss = buggy extraction):**
1. `composition` contains the cycle `dock/DockTrigger.vue → dropdown-menu/DropdownMenuTrigger.vue` and
   `dropdown-menu/DropdownMenuContent.vue → dock/composables/dockContext`.
2. `dockContext` has ≥4 distinct-family `composition` in-edges (slider, select, popover, dropdown-menu).
3. Hub weights reproduce: `cn`≈133, `primitive`≈50, `axes`≈27, `selection`≈20 (±1 from parser drift is fine).
4. `timeline` family has 5 `sfc` members (ContinuousRail/ContinuousTimeline/GlassTimeline/ScrubberTimeline/
   SegmentedTimeline); `metric` family has 4 export-units.
5. `glass/glass-atom.css` + `glass/glass-chip.css` `style` nodes carry `imported_by_root:false`.
6. `Card.vue` `api_signature` shows defaults `metal:"gold"`, `grain:true`; `Button.vue` shows
   `emphasis:"secondary"`. (Pins the F04 shape before any paint gate.)

**CONSTRUCT builds FIRST:** stages 1-4 + the six validation seeds + `component-graph.json` with only
`composition` edges populated (the DAG-subsuming skeleton). Prove the skeleton reproduces the DAG doc's known
truths, THEN layer in the five similarity edge types and the rendered views. Do not compute similarity over an
unvalidated node set.

### 3d. Inference protocol — for the Fable INFER seat

INFER reads `component-graph.json` + `duplication-candidates.md` + `role-census.md` and answers five questions
IN ORDER. Every answer cites node ids + edge scores from the artifact (no free assertion). Every verdict routes
to exactly one of: a **BAND-REDUCTION amendment**, an **ASK-REDUCTION sharpening**, or a **new ASK row** — and
is checked against the standing-ruling fence (§ top) before it is written.

**Q1 — Outright duplicative components (Type 1/2).** Candidates: `composite ≥ 0.85` AND equal `role` AND NO
`composition` edge between them. For each, cite `api`, `dom`, `style` sub-scores. *Clearing rule that must be
applied first:* if a `composition` edge exists (A imports B), they are wrapper+inner, NOT duplicates → moves to
the negative findings. Verdict routes: merge/delete → BAND-REDUCTION amendment if the disposition is already
DECIDED-compatible; new ASK row if it is a public-surface merge the user has not ruled.

**Q2 — Isomorphic pairs/families (Type 2/3, same structure different skin).** Criterion (stated over the
features): a `dom_topology_similarity` edge with `isomorphic:true` (shape_hash equal) OR `score ≥ 0.80`, AND
`style_kinship < 0.50` (different material) — regardless of api/animation. Run at `sfc` grain; the exemplars to
expect are the `*Content.vue` floating-panel cluster (Popover/Tooltip/DropdownMenu/Dialog content) and the
`*Trigger.vue` cluster. Cite the shape_hash + the topology score. Verdict routes: shared-substructure factoring
(Q4) if the isomorph repeats ≥3×; else a note that the skin difference is legitimate variation.

**Q3 — Synonym roles (Type 4, different components / same purpose slot).** Read `role_synonymy` edges +
`role-census.md`. Expected candidates: toast≡dialog (feedback — the visual-family-9 finding), deck≡carousel,
the 5 timeline variants, chip≡toggle-group control overlap. Cite the equal `role` + affordance Jaccard. *For
each, apply the standing fence:* deck-vs-carousel is ASK C1 (headless engine vs visual — the atlas `useDeck`
fact CLEARS a blind merge); timeline is F16 ground-up (BAND-REDUCTION W5) — a synonym finding SHARPENS the
redesign scope, it does not re-decide. Verdict routes: ASK-REDUCTION sharpening where a §B/§C row already exists;
new ASK row only for a genuinely un-routed synonym.

**Q4 — Shared-substructure factoring.** A `sfc`-grain `dom_topology_similarity` cluster (≥3 SFCs mutually
`isomorphic` or ≥0.80) whose members span ≥2 distinct component families AND share affordance/style clusters →
a candidate primitive. *Clearing rule:* check the substructure is not ALREADY a primitive — `_shared/floating.ts`
(8 consumers), `_shared/primitive.ts` (50), `_shared/selection.ts` (20) may already own it; if so, the finding
is "adopt the existing authority," not "mint a new one" (the DAG doc's A3 pattern). Verdict routes: a
BAND-COLOCATION/REDUCTION amendment naming the primitive + the ≥3 sites, with the existing-authority check
resolved.

**Q5 — Negative findings (metrics flag, judgment clears).** Enumerate every pair the metrics surfaced that
judgment clears, EACH with the clearing rule that clears it:
- `composition`-edge present → wrapper not duplicate (labeled-field→input; card→surface). Rule: A⊇B via import.
- deck≡carousel high role_synonymy → CLEARED per ASK C1 (distinct API at the atlas consumes; keep deck-as-engine).
- high `dom` but different `role` + low `affordance` Jaccard → coincidental shape (badge vs chip both a lozenge
  span). Rule: topology alone is not identity.
- header-ribbon low `in_repo_consumers` but `external_sibling_consumers:null` → NOT a delete signal (keyframes.js
  undeclared consumer; round-2 refuted the prime-delete). Rule: `null` external ≠ zero.
- any finding landing on a decided row (liquid-grid, sidebar-drop, metric-badge, completion-seal) → corroborate
  or contradict the *evidence*, never re-decide; contradiction routes to the lead as a truth-up note.

**Output of INFER:** a findings doc (its own artifact, not this one) whose every row is `{finding, node/edge
evidence, clone-type, verdict, route (BAND-REDUCTION-amendment | ASK-sharpen | new-ASK | negative-cleared),
standing-ruling-check}`.

### 3e. Generalization note (library-agnostic, ≤1 page)

The process is not glass-ui-specific; the library-specific parts are four pluggable vocabularies. Any component
library instantiates it by supplying:

1. **A component parser** producing, per component, the ten feature groups — for Vue that is
   `@vue/compiler-sfc` + `typescript`; for React/JSX a Babel/TS AST walk (props from the type signature, DOM
   topology from the JSX element tree, style from className/styled/css-prop, animation from the motion library's
   call sites); for Web Components the class + template. The schema (§3a) is unchanged.
2. **A style-token vocabulary map** — the `class→partial` (or `token→source`) resolution table, so
   `style_kinship` is computed over resolved design tokens, not raw strings. This is where design-token lineage
   (the DS-audit-tool idea) plugs in.
3. **An animation-primitive vocabulary** — the set of spring/motion/keyframe primitives whose co-use defines
   `animation_kinship` (here: the `SPRING_PRESETS` names + the `motion/*` composables).
4. **A role taxonomy + deterministic seed rules** — the controlled label set and the first-match rule table
   (§3a.6). The taxonomy is the only genuinely domain-shaped input; everything downstream is mechanical.

Given those four, the **pipeline** (enumerate → parse → composition edges → pairwise similarity → composite
rank → rendered views + validation seeds) and the **inference protocol** (the five ordered questions with
explicit clearing rules, deterministic candidates adjudicated by a judgment layer that cites the graph) are
invariant. The load-bearing generalizable ideas: (a) node = whole component with a fixed multi-feature vector;
(b) six edge types = one literal dependency + five computed similarities; (c) the clone-type-1-4 taxonomy as the
finding backbone; (d) determinism produces candidates for Types 1-3, an LLM/human judge adjudicates Type-4 and
applies clearing rules; (e) every verdict cites graph evidence and routes to an existing decision structure
under a standing-ruling fence. That five-part invariant is the reusable "component-and-library graph" method.

---

## 4. Seat handoff

- **CONSTRUCT** implements §3c: the `extract/` script, `component-graph.json` (schema §3c), the four rendered
  views, and the six validation seeds. Builds the `composition`-only skeleton first (proves it reproduces the
  DAG doc), then the five similarity edge types. Writes only under `docs/tranches/BJ/formation/component-graph/`
  + `extract/`; no `src/` touch.
- **INFER** implements §3d: reads the artifact, answers Q1-Q5 with cited evidence and clone-type labels, routes
  every verdict to a BAND-REDUCTION amendment / ASK-REDUCTION sharpening / new ASK row under the §-top
  standing-ruling fence, and emits its own findings doc. It does not re-decide any DECIDED row.

---

## 5. RU-19 AMENDMENTS — where the method itself was wrong (2026-07-18, `claude-fable-5`)

Amendments to the spec, not the implementation (implementation defects are RF-7's ledger). Each was proven
against the corpus in the corrected `INFERENCE.md`; a v1.1 run applies them before re-scoring.

1. **§3b composite — three channel defects.** (a) `dom` at component grain = "best over root SFCs" saturates on
   trivial forwarder shells (dialog↔drawer ranked #2 on two 3-node `DialogRoot(span,slot)` roots) — compute dom
   over FAMILY-UNION shape sets with a **minimum tree size of 4 nodes**, null when neither family qualifies;
   (b) `role_syn` does not belong in the composite — the seed labels are judge inputs, not measurements, and a
   label error propagates arithmetically (three labels were extended undisclosed; RF-7 W3). Role is a LENS;
   (c) the composite lacks the single most informative kinship signal in this corpus: shared `_shared/*`
   substrate consumption. Corrected weights, null-renormalized:
   `S = .35api + .20style + .15dom + .15substrate + .10afford + .05anim`, all set-channels at family-union grain.
2. **§3d-Q1 — the ≥0.85 gate is RETIRED, not re-tuned.** Its reachable ceiling under the §3b weights sits at
   ~0.90 only when every non-anim channel saturates; for any realistic pair the gate is unreachable
   (dead-by-construction — RF-7 N3), so an empty Q1 set is an arithmetic artifact, never evidence of health.
   Replacement: NO accept gate — rank + judge, with a two-band annotation (merge band ≥ ~0.55, kinship band
   0.30–0.55 under the corrected channels) and a small-set caveat (any pair whose dominant channels rest on
   |union| < 4 is adjudicated, never gated).
3. **§3d-Q1/Q5 clearing rule — composition edges must be VALUE-grain.** "A imports B → wrapper, not duplicate"
   holds only for rendered/value imports. Type-only imports are contract kinship — evidence FOR a shared-shape
   factoring, not a clearing (the combobox/command misclear: all eight `command/*.vue` → `../combobox/types`
   imports are `import type`; Command renders reka primitives directly). Schema: split
   `composition.imports_components` into `value` and `type` arrays; only `value` clears.
4. **§3d-Q4 — the ≥3-site rule is a presumption, not an exclusion.** A substantive 2-family twin register (the
   dialog/drawer staging substrate + byte-identical Title/Description) is a factoring finding; ≥3 sites raises
   confidence, it does not define eligibility. Weigh 2-family candidates by absolute shared mass (see 5).
5. **§3b/§3d — add the FACTOR lens.** Jaccard similarity answers only the merge question. Factoring candidates
   have the opposite signature — high ABSOLUTE shared token mass at low Jaccard — and need a second ranking:
   IDF-weighted shared style-token mass (token weight `log(N/df)`). On this corpus it independently surfaced
   dialog×drawer (50.7), combobox×select, slider×timeline, progress×slider — none rankable by the composite.
6. **§3a extraction hardening.** (a) `utility_classes` must be sourced from template class attributes/bindings
   ONLY — comment/JSDoc prose leaked into five nodes' sets (`a/in/is/its/keeps/the/floor` on
   configurator/toast/select), polluting every style measure that touches them; (b) `style_kinship` needs a
   singleton floor (|union| ≥ 4) — five of its 1.0 edges are near-empty root-set saturation; (c) `data-slot`
   is universal and excluded from all style sets.
7. **§3d output contract addition.** INFER must state the UNIVERSE LIMIT on every CLEAR that external evidence
   could overturn: `demo/` skins and external consumers are outside the node universe (the deck/carousel and
   chassis/metric classes), so a graph CLEAR is a within-universe statement only. And INFER must discharge the
   `role:null` assignment duty explicitly (the prior run left configurator unassigned).
