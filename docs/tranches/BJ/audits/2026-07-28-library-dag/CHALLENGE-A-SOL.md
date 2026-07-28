# Import-DAG challenge A — the 112 sectors are not yet a library DAG

**Date:** 2026-07-28  
**Seat:** GPT Sol xhigh, challenger A  
**Posture:** architecture audit only; no source, test, package, or sibling-document mutation  
**Input:** `IMPORT-DAG-SUMMARY.md`, `IMPORT-DAG.json`, the live `src/` + `demo/`
tree, and the extractor that produced the receipt

Prospective work follows the current model law: **GPT Sol xhigh** owns design,
judgment, audit, challenge, and adjudication; **GPT Luna xhigh** owns bounded
mechanical extraction, codemods, test moves, manifests, and application of a
written cut contract. Historical Fable/Opus receipts keep the labels that
actually ran. This document does not relabel them and claims no GPT Luna xhigh
receipt.

## Verdict

Do not accept the recorded 112-sector structure as the library architecture.
The JSON is a reproducible output of its extractor, but the extractor is not a
complete Vue/Vite import graph and its directory-depth `leafModule()` heuristic
is not an ownership model.

The decisive findings are:

1. The live replay has the same 890 nodes, 2,182 recorded internal edges, 623
   external edges, 112 recorded leaf modules, and nine recorded file SCCs.
   Removing `observedAt` and `graphSha256` from both JSON values produces the
   same SHA-256, `e6d515be2c610def0d8a9da35d96dc1be32e019a3ab13123497c0f1fd93b9b50`.
   The receipt is mechanically reproducible.
2. It omits all 19 live Vue `<style src>` occurrences. Thirteen of their CSS
   targets are consequently reported as isolated even though Vue loads them.
   Examples: `src/components/accordion/Accordion.vue:109`,
   `src/components/data-table/DataTable.vue:457`, and
   `src/components/tags-input/TagsInput.vue:64-65`.
3. It omits both `import.meta.glob` expressions in
   `demo/stories/manifest.ts:147,158`. The main glob reaches 103 direct story
   SFCs; the tile glob adds four tile-loader occurrences. This is why whole live
   route sectors such as `demo/stories/containers` and
   `demo/stories/navigation` show zero incoming edges.
4. The omission is structural. `extractSpecifiers()` gives standalone CSS a
   regex parser and passes every other extension, including `.vue`, to
   `ts.preProcessFile`; it has no Vue SFC parse and no Vite-glob expansion
   (`build-import-dag.mjs:53-70`). Therefore “zero unresolved edges” means only
   “zero unresolved edges among constructs the extractor noticed.”
5. The nine reported cycles are not nine equivalent runtime cycles. Only C06
   and C07 are eager runtime barrel cycles. C01-C05 and C09 close through
   type-only back-edges; C08 closes through a dynamic-import forward edge plus a
   type-only back-edge. The JSON records no syntactic edge class with which to
   distinguish them.
6. Mapping every recorded edge endpoint through its recorded `node.module` and
   recomputing SCCs yields a **nine-module product SCC**:
   `_shared → motion → tabs → select → dock → dropdown-menu → _shared`, with
   `search`, `tooltip`, and `glass` also in the same component. It also yields a
   two-module demo SCC, `demo ↔ demo/shell`. A partition whose “leaf modules”
   form these SCCs is not a DAG.
7. The graph deliberately excludes `tests/`, `scripts/`, package exports, and
   most build configuration. It cannot prove public-surface reach, generator
   reach, or external-consumer value. Its `root-and-build` batch is therefore a
   label, not a build graph.
8. The node and line totals mix source, Markdown, licenses, and binary WOFF2
   data. Splitting arbitrary decoded font bytes on newlines gives meaningless
   “LOC” for the font sectors. README bulk similarly makes procedural module
   size look like executable size.

The corrected architectural result is not “throw away the evidence.” It is:
use the file graph as one input, repair its missing edge forms, and replace the
112-sector directory heuristic with explicit ownership and dependency laws.

## Facts versus inferences

### Reproduced facts

- `src/components/_shared/class-names.ts` has 160 recorded source files. Thirty
  four are under `demo/`; demo tooling is reaching through a product-private
  directory instead of owning its own trivial class join.
- `src/components/dropdown-menu/DropdownMenuContent.vue:11`,
  `src/components/popover/Popover.vue:8`,
  `src/components/select/SelectContent.vue:32`, and
  `src/components/slider/Slider.vue:12-13` import Dock internals. Generic
  controls therefore depend upward on one consuming chassis.
- `src/composables/motion/morph/useSelectionGroup.ts:10-13` imports a Tabs
  composable. A supposedly lower, published `/motion-core` engine depends on a
  component family.
- `src/components/_shared/useMotionAxis.ts` imports Motion, so `_shared` is not
  one layer: it combines lower contracts, CSS, class machinery, and an
  upper/lateral motion adapter.
- `src/components/index.ts` has zero recorded incoming edges and 31 outgoing
  barrel edges. The package root deliberately does not use it.
  `src/components/PROCEDURAL-SUITE.md` is isolated. The `_root` sector is
  convenience residue, not a module.
- `scripts/lib/subpath-policy.mjs:49` itself names 21 published components “the
  shadcn-shaped set.” The current public map still treats that catalogue as a
  first-class ontology.
- The live tests are outside `src/`, which is correct, but the tree is not
  isomorphic. Product tests are split among `tests/components/custom/*`,
  `tests/components/ui/*`, and flat `tests/components/*.contract.test.ts`
  instead of mirroring `src/components/<module>/...`.
- The extractor reports 146 mechanical prefix candidates. The finding is
  broader than those candidates: exact module-name files such as
  `drawer/Drawer.vue` also repeat the directory concept even though the
  candidate algorithm only recognizes `<dir>-...` prefixes.

### Architectural inferences and rulings

- The class helper's 160 consumers do not prove that a 226-line partial
  Tailwind conflict engine is valuable. They prove that a global convenience
  was easy to import. Full shadcn abrogation removes variant/utility-string
  ontology; the surviving need is a small class-value join, owned below product
  and separately by demo if demo needs it.
- Dock-awareness is an interaction lease, not a reason for every overlay or
  field control to know Dock. Move the minimal “interaction began/ended”
  contract below both; Dock observes it. No `useOptionalDockContext()` import
  remains in a generic component.
- Roving focus is selection behavior, not Tabs behavior and not animation.
  Its home is a lower selection/interaction core. Motion may animate a caller's
  selection indicator; it must not own selection semantics or import Tabs.
- A component family may retain tested Reka focus, keyboard, collection, and
  ARIA behavior while deleting shadcn's default recipe, wrapper topology,
  catalogue names, raw variant dialect, and compatibility surface.
- A large cohesive algorithm is not automatically a god module, and a
  five-line wrapper is not automatically modular. Split by independent change
  reason; merge forwarding sand when the wrapper has no semantic job.
- Consumer count is evidence of migration cost, never proof of architectural
  value. A keep needs a distinct semantic job and an honest owner; a delete
  needs a generated full-manifest relay, including older-major consumers.

## Required dependency direction

| Level | Owners | Import law |
| --- | --- | --- |
| L0 | platform, Vue, Reka, value.js, keyframes.js | No Glass import |
| L1 | plain contracts: axes, context, selection, interaction lease, lifecycle, class join | No component or demo import |
| L2 | motion engines, renderer primitives, color math, material/token contracts | May import L0-L1 only; never Tabs, Dock, or another feature |
| L3 | component families and procedural features | May import L0-L2; sibling composition is explicit and acyclic |
| L4 | public entries, CSS entry assembly, demo chassis, stories | May compose L0-L3; product never imports demo |

The cut is clean. Renames, moves, deletions, and export changes update every
import and test atomically. There are no aliases, re-export shims, old/new dual
paths, compatibility facades, or silent fallback renderers.

## Cycle rulings — all nine recorded SCCs

| Cycle | Edge class and cause | Ruling |
| --- | --- | --- |
| C01 · Drawer (7 files) | Mostly type-only back-edges from `constants.ts`, `Drawer.vue`, and `drawerSnapContext.ts` into the public `index.ts`; the barrel re-exports the components. | **Break immediately.** Public barrels are outward-only. Put Drawer contracts in a non-barrel contract leaf, then execute the Drawer→Dialog detent merge. Do not preserve `/drawer` through a shim. |
| C02 · Constellation (4 files) | `constants.ts` type-imports field types while field/interaction import constants; `constellationInteraction.ts` type-imports field and field imports interaction. | **Regroup.** `types.ts` owns data only; constants import types; field imports types/constants; interaction operates on types and may call `well`, but field does not become a type barrel. This also applies the prefix cut from `constellationTypes/Field/Interaction/Well` to `types/field/interaction/well`. |
| C03 · Aurora GL (3 files) | `glSetup.ts` runtime-imports frame/bridge; frame and bridge type-import setup contracts; bridge and setup also cross. Runtime is one-way, type graph is not. | **Split contract from assembly.** One small GL contract leaf owns `UniformLocations`/dependency shapes; `setup` assembles `frame-loop` and `uniform-bridge`. Then choose one renderer path; the other backend and any masking fallback delete. |
| C04 · Tabs (3 files) | `SegmentedTabs.vue` imports drag/responsive composables; both type-import the SFC for option/prop types. | **Move types down and remove the component inversion.** `types.ts` owns tab contracts; roving focus moves to L1 selection; responsive and drag logic import contracts, never the SFC. |
| C05 · `_shared` interaction/selection | Two type-only imports: interaction wants `SelectionValue`; selection wants outside-event types. | **Make interaction generic and one-way.** `interaction.ts` must not default through `SelectionValue`; selection may import generic interaction event contracts. Do not mint a third barrel. |
| C06 · Alert/barrel | `Alert.vue` runtime-imports `alertVariants` from `./`; the barrel runtime-re-exports `Alert.vue`. | **Real eager cycle: delete it.** The component owns its recipe or, preferably, explicit component CSS. Merge title/description forwarding sand and remove shadcn variant-string compatibility. |
| C07 · Badge/barrel | `Badge.vue` runtime-imports `badgeVariants` from `./`; the barrel runtime-re-exports `Badge.vue`. | **Real eager cycle: delete it.** Colocate the small recipe with Badge, replace raw utility-string variants with explicit state/part CSS, and keep the barrel outward-only. |
| C08 · accent tone (2 files) | `useAccentTone.ts` dynamically imports the value.js solve; the solve type-imports options from the shell. It is not an eager runtime cycle, but the type ownership is reversed. | **Keep the dynamic payload boundary, move the option contract.** `types.ts` is justified by two independently loaded halves. No synchronous fallback solver and no duplicated color math. |
| C09 · WebGL lifecycle/visibility | Lifecycle runtime-imports visibility; visibility type-imports `CanvasSuspendReason` from lifecycle. | **Move the suspend contract down.** Visibility owns or imports a plain lifecycle contract; lifecycle composes visibility. No reverse type edge and no alternate lifecycle path. |

The additional module SCCs are cut by the same moves:

- `_shared → motion → tabs` ends when roving focus and reduced-motion contracts
  move down;
- `dock ↔ dropdown-menu` ends when `DockTrigger` stops importing a menu part
  and the menu stops importing Dock context;
- `select/popover/slider → dock` ends at the interaction-lease boundary;
- `demo ↔ demo/shell` ends when router declarations live below the shell and
  the root entry only mounts the shell.

## Full shadcn-abrogation ledger

“Full” applies independently to recipe, anatomy, token dialect, and API. A
family is not cleared because a comment changed or because `data-slot` was
renamed. Reka behavior is kept where earned; shadcn ontology is not.

| Family | Current residue | Required clean result |
| --- | --- | --- |
| Alert | `AlertTitle`/`AlertDescription` anatomy, utility-string `alertVariants`, self-barrel cycle | One feedback surface with semantic tone and announcement behavior; ordinary heading/body slots; explicit Glass CSS; no stock compatibility parts |
| Badge | utility matrices in `index.ts`, `data-slot`, self-barrel cycle | One compact status/label mark with a finite Glass state contract; no exported class recipe dialect |
| Toast | seven-part wrapper family plus `use-toast.ts`; shadcn close/action anatomy | One queue owner and one rendered notice contract; Reka timing/focus behavior retained; parts exist only for distinct actions, not catalogue parity |
| Dialog + Drawer | shadcn forwarder anatomy, separate Drawer root/overlay/content family, two overlay mechanisms | One overlay/focus/escape substrate; Dialog placement handles sides; detents are an explicit Dialog mode if adjudicated; Drawer name and subpath delete cleanly |
| Table + DataTable | nine tiny Table wrappers plus a 458-line DataTable surface | Native table semantics remain native; keep one styled table boundary and one earned data-view composition only if adjudicated; no shadcn row/cell wrapper requirement |
| Select + Command + menu rows | 11 Select files, 13 Command files, 17 Dropdown files; repeated fixed-host/class/row wrappers; Dock imports | Reka collection/focus behavior beneath a Glass selection/menu contract; one row recipe; no Dock knowledge; distinct Select, command palette, and menu jobs only where semantics differ |
| Card + Surface | seven 15-line Card anatomy wrappers over Surface; stock title/content/footer ontology | Surface owns material. Card owns semantic containment only. Delete action/content/description/footer/title forwarding sand; consumers use HTML/slots. Card remains distinct from Surface only for the value-grain job. |
| Mirror/forwarder shells + class dialect | 21 directories are explicitly classified “shadcn-shaped”; `class-names.ts` reimplements utility conflict buckets | Audit every forwarder for behavior. Keep only behavior-bearing Reka adapters; delete mirror-only shells, raw CVA-like variant exports, stock defaults, and public compatibility promises. Retain `data-*` only when it is a real state/part hook. |

## Disposition legend

- **KEEP** — the module has one distinct owner and a defensible semantic job;
  it still receives prefix stripping and surface cleanup.
- **REGROUP** — keep the capability, but move/flatten files or change ownership.
- **SPLIT** — the recorded leaf contains multiple independent owners.
- **MERGE** — fold forwarding/duplicate capability into the named owner.
- **DELETE** — remove the module/public entry after the named relay or
  adjudication; no compatibility path.
- **INVESTIGATE** — a user/adjudicator choice materially changes the result.

`N/LOC` reproduces the receipt only to prove complete accounting. It is not a
value score.

## Per-leaf-module disposition — components (64/64)

| Recorded leaf | N/LOC | Disposition | Compact ruling |
| --- | ---: | --- | --- |
| `src/components/aurora` | 37/9242 | SPLIT | Public field/config, renderer, shaders, and authored static ground have independent change reasons. Choose one live backend; delete fallback masking. `composables/*` and `constants/shaders/*` are not one component layer. |
| `src/components/dock` | 45/8091 | SPLIT | L4 hub, not primitive leaf. Keep rail/layer/chrome identity, but separate assembly from lower interaction; collapse 21 style partials by responsibility; private search stays colocated. |
| `src/components/blob` | 28/6056 | SPLIT | Keep the Blob identity; separate config/simulation from renderer assembly, then execute the already-grounded one-backend cut. GLSL/WGSL twins may not survive as fallback paths. |
| `src/components/constellation` | 11/3004 | INVESTIGATE | ASK-10 still controls public keep versus demo relocation. Either way, break C02, use `types.ts`, strip repeated prefixes, and keep one explicit Canvas path. |
| `src/components/fourier-field` | 13/2963 | INVESTIGATE | ASK-9 controls public keep/cut. A keep chooses one renderer and deletes dead knobs/presets; GL/WGPU fallback twins are forbidden. |
| `src/components/handmark` | 12/2318 | KEEP | Cohesive geometry/brush/ink domain with earned algorithmic files. Keep the public mark; regroup only helpers that change together and apply short in-module names. |
| `src/components/timeline` | 10/2280 | MERGE | Collapse continuous/scrubber/segmented dispatch to the adjudicated one Timeline; delete duplicate rails, popover detail, and variant aliases. ASK-7 is the final shape ruling. |
| `src/components/drawer` | 12/1625 | MERGE | Fold detents into Dialog's overlay substrate; side placement is Dialog. Break C01 first only as necessary for the atomic merge; delete `/drawer`, no shim. ASK-33 controls top/bottom detent scope. |
| `src/components/tabs` | 9/1551 | REGROUP | Keep one SegmentedTabs family. Move roving selection down, types out of the SFC, and responsive Select/Tooltip composition behind explicit adapters; break C04 and the macro SCC. |
| `src/components/configurator` | 7/1534 | KEEP | Distinct consumer-facing instrument layout/state family. Keep after stripping `Configurator*` filenames and ensuring demo preset policy stays out. |
| `src/components/_shared` | 19/1421 | SPLIT | A junk drawer, not one layer: contracts, CSS, class engine, fields, menus, selection, and motion adapter. Form explicit L1 homes; demo loses private imports; delete the 226-line utility conflict engine with shadcn dialect. |
| `src/components/typewriter` | 9/1418 | REGROUP | Keep the distinct text engine, but flatten utility sand around one state machine; `TypewriterText.vue` becomes `Text.vue` or another role name, not a repeated prefix. |
| `src/components/sortable-list` | 13/1168 | KEEP | Drag/drop domain is cohesive and behavior-bearing. Keep private controller/resolver types internal; no new public micro-subpaths. |
| `src/components/easing` | 6/1090 | REGROUP | Recommended demo-privatize under ASK-11; if user keeps it public, picker/configurator remain one family rather than two APIs. No compatibility export on relocation. |
| `src/components/dialog` | 13/1072 | REGROUP | Becomes the one overlay/focus/escape/placement owner and absorbs Drawer/ExpandableContainer behavior as ruled. Delete stock anatomy wrappers without semantic work. |
| `src/components/dropdown-menu` | 17/1030 | REGROUP | Keep menu semantics, Reka focus, and context invocation; merge row sand, remove Dock import, share only the lower menu-row contract, and abrogate stock topology. |
| `src/components/pager-dots` | 6/926 | KEEP | Distinct paging indicator with its own window/worm logic. Keep; do not clone it in Deck or Carousel. |
| `src/components/data-table` | 6/794 | INVESTIGATE | ASK-8 controls thin public DataTable versus demo-private. A keep must name its data-view semantics; it cannot justify itself by wrapping the Table catalogue. |
| `src/components/completion-seal` | 6/660 | KEEP | Distinct completion mark with multiple external owners and build integration. Keep and colocate the direct keyframe; consumer count supports migration truth, not the semantic ruling by itself. |
| `src/components/slider` | 3/652 | REGROUP | A 622-line SFC is large but cohesive. Keep one control; move Dock hold to L1 interaction lease, retain shared value-domain, and remove stock prop/variant residue rather than file-sanding it. |
| `src/components/select` | 11/611 | REGROUP | Keep one selection control over Reka. Remove Dock knowledge, merge mechanical row/scroll wrappers where no separate job exists, and share the menu row below features. |
| `src/components/search` | 7/569 | KEEP | SearchBar and the fuzzy index have two real consumers and one semantic domain. Keep one `/search` owner; do not split merely to create a second export. |
| `src/components/toast` | 8/568 | REGROUP | Separate queue ownership from rendered notice, then collapse stock title/description/action/close sand to the minimal semantic parts. |
| `src/components/watercolor-dot` | 4/513 | INVESTIGATE | ASK-12 controls public keep versus relocation to value.js. Preserve only if an organic swatch is a Glass-native job; one consumer is migration evidence, not value proof. |
| `src/components/carousel` | 8/498 | DELETE | Recommended clean delete under ASK-6: Deck + PagerDots own the paging register; relay the partially stale words consumer and remove Embla peers atomically. |
| `src/components/command` | 13/490 | REGROUP | Keep the command-palette semantic job, not 9 stock wrappers. Own shared selection types below Command, share menu rows, and keep Dialog composition outward. |
| `src/components/labeled-field` | 8/447 | MERGE | Keep one LabeledField behavior/slot boundary; fold `LabeledInput/Select/Slider/Switch` forwarders into consumer composition. No per-control wrapper aliases. |
| `src/components/card` | 10/418 | REGROUP | Keep Card's value-grain distinction over Surface, but delete shadcn anatomy sand and raw class recipes. Card → Surface direction remains one-way. |
| `src/components/metric` | 9/417 | MERGE | If ASK-1 keeps it, collapse to one Metric plus only a defensible stack/layout owner; fold `Cell/Row/Stack` wrapper sand. Otherwise delete with relay. |
| `src/components/fading-scroll` | 5/396 | KEEP | One scroll-edge affordance with colocated reader; distinct from generic overflow CSS. |
| `src/components/popover` | 5/344 | REGROUP | Keep hover/click union only if it remains one explicit trigger contract; remove Dock imports and let the lower interaction lease carry hold semantics. |
| `src/components/chip` | 6/333 | REGROUP | Keep one explicit Chip family, but pull variant utility strings into component states/CSS and do not export a class-dialect recipe. |
| `src/components/toggle-group` | 5/328 | REGROUP | Keep group semantics; consume lower selection/roving focus instead of a parallel Reka-shaped topology. Merge item sand where slots can express it. |
| `src/components/tags-input` | 8/316 | REGROUP | Keep composite tagging behavior; collapse item/text/delete shell sand, preserve field semantics, and abrogate stock part compatibility. |
| `src/components/expandable-container` | 4/309 | MERGE | It duplicates full-screen Dialog focus trap, Escape, body lock, and teleport. Fold its explicit full-screen presentation into Dialog; delete the subpath. |
| `src/components/progress` | 3/309 | KEEP | One meter with shared value-domain and marks. Keep; shed dead Reka passthroughs and keep its semantic states explicit. |
| `src/components/button` | 3/296 | KEEP | Small, behavior-bearing Glass control. Keep Reka primitive composition; no shadcn default recipe or exported CVA dialect. |
| `src/components/accordion` | 5/294 | KEEP | Multiple-disclosure semantics are distinct. Keep over one lower disclosure contract; strip `Accordion*` filenames and stock paint. |
| `src/components/deck` | 5/282 | KEEP | Headless keyboard-paged presentation engine is distinct; PagerDots is composed directly and no visual alias returns. |
| `src/components/status-dot` | 4/281 | KEEP | One status-mark owner after Pulse absorption. Keep a finite semantic state vocabulary. |
| `src/components/instrument-chassis` | 5/262 | DELETE | ASK-1 recommendation stands: parallel Surface plate, incompatible old-major usage, no unique mechanism. Relay speedtest/muster; no replacement alias. |
| `src/components/scroll-progress-rim` | 4/252 | MERGE | A visual Progress/scroll presentation, not a separate foundation. Fold the rim mode into its sole semantic owner or consumer; remove the subpath. |
| `src/components/number-field` | 8/250 | REGROUP | Keep number stepping/input semantics; collapse content/increment/decrement wrapper sand around explicit actions and shared field control. |
| `src/components/avatar` | 5/236 | KEEP | Image/fallback/status semantics are coherent and Reka-backed. Keep, strip stock default recipe and repeated filenames. |
| `src/components/radio-group` | 4/228 | KEEP | Distinct single-choice semantics. Consume L1 selection contracts; no shadcn wrapper compatibility promise. |
| `src/components/tooltip` | 5/194 | REGROUP | Keep delay/provider semantics, but remove Dock reach and stock provider/trigger/content topology where a direct contract suffices. |
| `src/components/table` | 9/186 | REGROUP | Nine files are wrapper sand. Keep one styled native-table boundary; consumers author native `thead/tbody/tr/th/td` semantics unless a part has real behavior. |
| `src/components/infinite-scroll` | 5/183 | KEEP | Small, behavior-bearing loading/announcement family. Keep one explicit public entry and colocated composable. |
| `src/components/collapsible` | 4/176 | KEEP | Single-disclosure semantics differ from Accordion. Keep over the same lower disclosure contract, not a cloned visual recipe. |
| `src/components/dark-mode-toggle` | 4/172 | KEEP | Concrete control over the dark-mode owner; small and honest. |
| `src/components/switch` | 3/164 | KEEP | Distinct binary control. Keep Reka behavior; move only generic field contracts down and remove stock recipe/API residue. |
| `src/components/separator` | 2/156 | KEEP | Orientation/decorative semantics justify the single component; no further split. |
| `src/components/header-ribbon` | 5/136 | KEEP | Distinct header/action boundary with a live external owner. Keep, but remove fixed-host compatibility fields that have no semantic use. |
| `src/components/checkbox` | 3/120 | KEEP | Distinct tri-state form control. Keep tested Reka semantics and replace stock paint/topology only. |
| `src/components/_root` | 2/119 | DELETE | `components/index.ts` is an unused second barrel and `PROCEDURAL-SUITE.md` is isolated. Delete the barrel; move durable design truth to its owners. |
| `src/components/alert` | 4/115 | REGROUP | Full abrogation family: break C06, collapse title/description sand, keep only semantic feedback/announcement behavior. |
| `src/components/animated-digit` | 3/114 | KEEP | Distinct numeric reel with live use. Keep opinionated defaults and remove dead tuning surface; do not merge it into Metric. |
| `src/components/surface` | 2/112 | KEEP | The one material plate owner. Keep thin; other containers depend on it, never the reverse. |
| `src/components/skeleton` | 2/97 | KEEP | A single loading placeholder remains a valid semantic state if its motion/PRM behavior is Glass-owned; no stock animation default. |
| `src/components/label` | 2/94 | KEEP | Native label association plus Reka composition is a real form job; keep thin. |
| `src/components/badge` | 2/89 | REGROUP | Break C07 and replace the stock variant matrix with one Glass mark state contract. |
| `src/components/input` | 3/85 | KEEP | One native input boundary with field-control semantics. Keep; `/forms` is the only heavy-peer entry, not a duplicate root path. |
| `src/components/textarea` | 3/85 | KEEP | Same ruling as Input; content-resize behavior remains local. |
| `src/components/paper-backdrop` | 3/34 | KEEP | Tiny but semantically honest decorative material with two external owners. Keep as one component; do not grow an API around its consumer count. |

## Per-leaf-module disposition — composables (9/9)

| Recorded leaf | N/LOC | Disposition | Compact ruling |
| --- | ---: | --- | --- |
| `src/composables/motion` | 41/7226 | SPLIT | Core lifecycle, scroll, spring, morph, pointer, number, and engagement are multiple owners. Keep a thin engine-free L2 core, move selection semantics to L1, rehome Dock CTA to Dock, and demo-localize scroll-scene leaves as already ruled. |
| `src/composables/glass` | 26/4766 | SPLIT | Material tracking, Canvas2D, WebGL, WebGPU, and Dock-only luminance sampling are not one leaf. Rehome the Dock trio, keep explicit renderer APIs, and delete automatic fallback cascades. |
| `src/composables/dom` | 12/1590 | REGROUP | Keep public DOM utilities with actual cross-consumer meaning; rehome drag velocity to interaction/motion and user-invalid to fields/forms. Do not keep a grab-bag solely because `/dom` exists. |
| `src/composables/sidebar` | 9/1152 | REGROUP | Execute the already-routed clean demotion to demo ownership and drop `/sidebar`; update the named consumer in the release relay. No successor shim. |
| `src/composables/color` | 4/604 | REGROUP | Keep one value.js color authority and dynamic accent solve; move the shared options contract to break C08 and stop using the 356-line `index.ts` as both implementation and barrel. |
| `src/composables/dark` | 4/338 | KEEP | One dark-mode family: sync script, installer, and reactive owner. Keep the explicit heavy-peer subpath. |
| `src/composables/keyboard` | 2/295 | KEEP | One scoped shortcut registry is cohesive. Generic overlay components should prefer their owning Reka behavior rather than adding keyboard-specific dependencies. |
| `src/composables/reactive` | 3/154 | KEEP | Timer and interval are small distinct scope-aware utilities; one barrel is sufficient. |
| `src/composables/context` | 2/94 | KEEP | Plain typed context factory belongs at L1 and must remain component-free. |

## Per-leaf-module disposition — demo (28/28)

| Recorded leaf | N/LOC | Disposition | Compact ruling |
| --- | ---: | --- | --- |
| `demo/stories/substrates` | 27/5803 | REGROUP | Keep story ownership, but split giant story-local authoring by actual specimen (`aurora`, `blob`, `fourier`, etc.); no library export follows demo controls or presets. |
| `demo/stories/containers` | 14/2905 | REGROUP | Keep only stories for surviving overlay/container families; delete retired hover-card, sheet, duplicate hover-popover, and other compatibility narratives with their APIs. |
| `demo/stories/data` | 13/2864 | REGROUP | Keep truthful specimens; follow Table/DataTable/Metric/Timeline adjudications and colocate nested timeline bodies under the surviving story. |
| `demo/stories/dock` | 10/2505 | REGROUP | Keep one active specimen first; merge encyclopedic mechanism pages after unique behaviors are covered. Demo stage helpers stay demo-local. |
| `demo/stories/motion` | 14/2407 | REGROUP | Fold Tempo into Springs, colocate scroll-only physics here, and remove duplicate countup/reveal narratives after the underlying family cut. |
| `demo/stories/foundations` | 13/1806 | REGROUP | Foundations remain evidence, but consolidate token/color/paper pages around authored laws rather than one page per registry file. |
| `demo/shell` | 9/1601 | REGROUP | Break `demo ↔ shell`: router data lives below shell; shell imports route contracts, root mounts shell. Reduce `AppShell`/dock navigation god assembly without making more public modules. |
| `demo/stories/forms` | 11/1350 | REGROUP | Keep one field/control workbench and focused exceptional stories; full shadcn abrogation deletes catalogue-parity pages. |
| `demo/shell/configurator` | 12/1315 | KEEP | Demo-only preset editor is a coherent feature. Keep its persistence/store/CSS writers out of the library. |
| `demo/stories/compositions` | 6/1169 | DELETE | ASK-13 recommendation: remove the contrived category and rehome only unique validation/dialog fixtures. Do not mint an empty `scene` sector. |
| `demo/stories` | 1/1118 | MERGE | The 1,118-line `manifest.ts` and the separately classified 26-line `manifest/lazy.ts` are one manifest owner. Keep data + resolver together or split by change reason under one module, not the depth heuristic. |
| `demo/stories/feedback` | 8/1107 | REGROUP | Delete duplicate confirm-dialog story; keep specimens for surviving Alert/Toast/Progress/Skeleton/Seal contracts. |
| `demo/stories/display` | 10/1047 | REGROUP | Keep display workbench only for surviving primitives; Card/Surface and Badge stories must demonstrate the abrogated Glass contracts, not stock catalogues. |
| `demo/chassis/hero` | 7/930 | REGROUP | Hero belongs to workbench chassis. Keep one warm-field/subject identity path; avoid a second procedural configuration system. |
| `demo/stories/navigation` | 5/911 | REGROUP | Delete Carousel story with Carousel; keep Tabs/Pager/Toc/Header specimens only where distinct. Zero recorded incoming edges are a missing-glob artifact, not death evidence. |
| `demo/chassis/landing` | 5/596 | REGROUP | Keep catalogue/section navigation, but delete identity-only preview duplication and require a truthful still or live property. |
| `demo/composables/virtual` | 3/543 | REGROUP | Absorb demoted Sidebar behavior into one demo navigation/windowing owner. Do not create a public “virtual” sector from demo mechanics. |
| `demo/chassis/code` | 4/506 | KEEP | Code rendering/highlighting is a coherent demo concern. It must own its class join instead of importing product `_shared`. |
| `demo/chassis/body` | 2/442 | MERGE | Story body registry/renderer is chassis core; merge into `demo/chassis`, not a leaf module. |
| `demo/capture` | 2/264 | KEEP | Capture CSS and engine badge are a coherent evidence utility, intentionally demo-only. |
| `demo/chassis` | 4/166 | REGROUP | Becomes the explicit workbench module and absorbs the artificial body/page/section/showcase/family/play sectors; keep internal files by job. |
| `demo/chassis/showcase` | 2/152 | MERGE | Merge into chassis workbench; two presentation components do not justify a module boundary. |
| `demo/chassis/page` | 1/108 | MERGE | `StoryPage.vue` is chassis anatomy with 97 recorded consumers, not an independent module. |
| `demo/chassis/family` | 2/94 | MERGE | Family tabs/nesting are chassis navigation, not a leaf. |
| `demo/examples` | 3/75 | DELETE | Three generic example wrappers are contrived indirection. Colocate unique fixtures with their stories and delete the sector. |
| `demo/chassis/play` | 1/67 | MERGE | Play control is chassis behavior; merge into chassis. |
| `demo/chassis/section` | 1/64 | MERGE | `StorySection.vue` is chassis anatomy with 87 recorded consumers; merge into chassis. |
| `demo/stories/manifest` | 1/26 | MERGE | Artificial depth split. Merge `lazy.ts` into the manifest owner or keep it as an internal file without calling it a leaf module. |

## Per-leaf-module disposition — root and build (5/5)

| Recorded leaf | N/LOC | Disposition | Compact ruling |
| --- | ---: | --- | --- |
| `demo` | 5/492 | REGROUP | Entry, router, and demo CSS are assembly. Break the shell cycle and include Vite glob/style edges in future graph truth. `vite.demo-dist.config.ts` is the only recorded repository-boundary edge, not a complete build sector. |
| `src` | 3/375 | REGROUP | Root public entry, `/forms`, and global type augmentation are three build/API concerns. Keep one generated exact export map; correct stale root/forms commentary; no convenience barrel or duplicate symbol path. |
| `src/fonts/fira-code` | 3/297 | KEEP | Asset family plus license. Rename binaries to module-relative roles (`latin.woff2`, `latin-ext.woff2`) in the same breaking export move; LOC is nonsemantic. |
| `src/fonts/plus-jakarta-sans` | 3/285 | KEEP | Same asset ruling; prefix-strip filenames and update CSS/font export paths atomically. |
| `src/fonts` | 1/121 | MERGE | README-only artificial sector. Move durable licensing/usage truth beside the font entry or root documentation; it is not a runtime leaf. |

## Per-leaf-module disposition — styles (6/6)

| Recorded leaf | N/LOC | Disposition | Compact ruling |
| --- | ---: | --- | --- |
| `src/styles/tokens` | 20/4551 | REGROUP | Keep one token authority, but collapse overlapping sizing/config, scheme/motion/spring, property-register, and mode-arm files by semantic registry. Do not treat file count as modularity. |
| `src/styles/glass` | 22/3358 | REGROUP | One material ladder has too many recipe shards. Consolidate by material role/state; strip `glass-` filename prefixes inside `styles/glass/`; retain distinct track/value structures only where consumers differ. |
| `src/styles/_root` | 20/2409 | SPLIT | `index.css` is entry assembly; top-level animation, paper, scroll, view-transition, font, and viz files belong to their semantic owners. Keep one outward CSS entry, not a 20-file pseudo-module. |
| `src/styles/utilities` | 7/1260 | DELETE | Generic `btn.css`, `components.css`, `metal.css`, and base utility dialect is shadcn/Tailwind residue as architecture. Move only earned semantic rules to owners, then delete the utility sector. |
| `src/styles/theme` | 4/693 | MERGE | Bridges, dark, literals, and radius resolve the token/theme contract; merge into `styles/tokens` by role instead of a parallel authority. |
| `src/styles/typography` | 3/608 | KEEP | Scale, semantic roles, and opt-in utilities are a coherent type system. Keep, provided utility names express typography rather than generic Tailwind compatibility. |

All 112 recorded leaves are dispositioned: 64 components + 9 composables + 28
demo + 5 root/build + 6 styles.

## Prefix, barrel, export, and test laws

### Module-relative names

Inside a module, filenames name the remaining role, never the directory again:

- `drawer/DrawerContent.vue` → `drawer/Content.vue`;
- `constellation/constellationInteraction.ts` → `constellation/interaction.ts`;
- `dialog/dialogStageContext.ts` → `dialog/stage-context.ts`;
- `typewriter/TypewriterText.vue` → `typewriter/Text.vue`;
- `styles/glass/glass-capsule.css` → `styles/glass/capsule.css`;
- font assets become `fira-code/latin.woff2` and
  `plus-jakarta-sans/latin.woff2`.

Exact-name roots also receive a role name when needed (`Drawer.vue` does not get
to evade the law merely because the mechanical candidate finder only detects
hyphenated prefixes). Public symbol names may remain domain names; internal
file paths do not repeat them. Every move is atomic and breaking: no old path,
alias, proxy file, or dual export remains.

### Barrels and exports

1. A module barrel exports outward and is never imported from inside its own
   module.
2. Delete `src/components/index.ts`; it is an unused second aggregation path.
3. `src/index.ts`, package `exports`, Vite entry names, declarations, and tests
   derive from one exact policy. The current fail-closed policy is a useful
   mechanism, but “PUBLISH (21) — the shadcn-shaped set” is not an acceptable
   ontology after abrogation.
4. Root versus subpath placement follows dependency weight and semantic
   discovery, not compatibility. Every symbol has exactly one public import
   path: choose root or a subpath, never both.
5. No deep public imports of `_shared`, Dock contexts, or component
   implementation files.

### Isomorphic tests

Keep tests outside product source and mirror ownership:

- `src/components/dock/...` ↔ `tests/components/dock/...`;
- `src/components/dialog/...` ↔ `tests/components/dialog/...`;
- `src/composables/motion/...` ↔ `tests/composables/motion/...`;
- `demo/chassis/...` ↔ `tests/demo/chassis/...`.

Delete the `custom/` and `ui/` taxonomy; those are historical catalogues, not
source ownership. Move each test in the same cut as its source. Do not retain
the old test path, a forwarding test import, or duplicate suites during a
transition. Cross-cut gates live under `tests/gates/`; public-surface tests live
under `tests/public/`; neither is placed under `src/`.

## Phased clean-cut order

1. **Truth instrument.** Under a GPT Luna xhigh mechanical contract, regenerate
   the graph with Vue SFC parsing, `<style src>`, `import.meta.glob` expansion,
   edge classes (runtime/type/dynamic/CSS/build), package/build/test reach, and
   a source-only LOC measure. Preserve the old receipt as historical evidence;
   do not overwrite history to make it look correct.
2. **Break dependency inversions.** Move L1 contracts, roving focus, interaction
   lease, lifecycle types, and the class join. Eliminate all nine file SCCs, the
   nine-module product SCC, and `demo ↔ shell`. Move tests isomorphically with
   each owner.
3. **Abrogate shadcn completely.** Execute the eight-family ledger: recipes,
   anatomy, token dialect, and public API all clear independently. Keep earned
   Reka behavior. Delete the unused component barrel and generic utility style
   sector.
4. **Execute clean family folds.** Drawer→Dialog,
   ExpandableContainer→Dialog, Timeline→one Timeline, Labeled wrappers→one
   LabeledField, ScrollProgressRim→Progress/consumer, Metric collapse if kept,
   Table anatomy collapse, and demo chassis sector merges.
5. **Resolve and execute deletions/relocations.** Carousel,
   InstrumentChassis, Compositions, Sidebar, Easing, DataTable,
   Constellation, FourierField, WatercolorDot, and any conditional family move
   only after the named adjudication and generated external relay. Deletion and
   export removal are one commit-sized ownership cut, never a tombstone phase.
6. **Procedural one-path cuts.** For Aurora, Blob, FourierField, and shared
   renderer infrastructure, choose the canonical backend per product reach;
   delete alternate/masking fallbacks and shader twins, then split internal
   ownership without inventing public micro-packages.
7. **Style and name close.** Apply every module-prefix strip, consolidate token
   and material ownership, update font paths, declarations, CSS entries,
   package exports, and all consumers atomically. No dual file paths.
8. **Release proof.** Re-run the corrected graph, require zero runtime and
   module SCCs, run the isomorphic tests/build/type/public-surface gates, capture
   required browser/a11y/paint evidence, execute consumer migrations, and only
   then publish the breaking major.

## Items requiring explicit adjudication

These are not silently decided by the import graph:

| Item | Decision needed | Challenger-A recommendation |
| --- | --- | --- |
| ASK-1 · Metric + InstrumentChassis | Delete/collapse boundary | Delete InstrumentChassis; collapse Metric to one component if the current-contract consumer is judged sufficient, otherwise delete with relay |
| ASK-2 · CompletionSeal | Public keep versus retire-with-relay | Keep the distinct completion mark; colocate its keyframe and do not infer value from count alone |
| ASK-3 · confirm-dialog story | Whether the already-folded component needs a duplicate page | Fold its unique fixtures into the Dialog story and delete the duplicate route |
| ASK-4 · reveal/scroll | Exact keep, relocate, and delete set | Keep the real engine leaves, move `useScrollPin`/conditional scene behavior demo-local, and delete the dead reveal pair; no compatibility exports |
| ASK-5 · Tempo page | Standalone route versus Springs section | Fold the page into Springs while retaining the one-clock token authority |
| ASK-6 · Carousel | Whether the partially stale words consumer vetoes deletion | It does not; delete with named relay |
| ASK-7 · Timeline | Final one-component contract | One continuous Timeline; no scrubber/segmented variants |
| ASK-8 · DataTable | Public thin component versus demo-private | Demo-private unless a semantic data-view contract beyond Table is named |
| ASK-9 · FourierField | Public feature versus demo substrate; canonical backend | Keep only with a named product job and one backend; otherwise relocate/delete |
| ASK-10 · Constellation | Public feature versus StoryHero/demo substrate | Relocate unless a second distinct product job is named |
| ASK-11 · Easing | Public editor versus demo tool | Demo-privatize despite consumer count unless editing easing is a Glass product job |
| ASK-12 · WatercolorDot | Glass primitive versus value.js-owned swatch | Relocate to the semantic owner |
| ASK-13 · Compositions | Keep any legitimate scene | Prune all six; rehome unique fixtures |
| ASK-33 · Drawer | Whether top/bottom detents survive inside Dialog | Keep detents only if captured use proves the mode; side Drawer placements do not survive |
| Aurora backend | WebGPU, WebGL, or an explicit non-rendering terminal | Choose one; a second backend may not silently mask failure |
| Blob backend | Confirm the grounded one-backend cut | WebGPU only; explicit unsupported terminal, no WebGL fallback |
| Root/subpath canon | Which families live on root and which live on subpaths after shadcn purge | One canonical path per symbol; light foundations may choose root, but then the duplicate subpath does not exist |
| Card anatomy | Whether any named Card subpart has behavior beyond markup | Keep Card + at most a behavior-bearing Header; delete the rest |
| Table anatomy | Whether wrapper components are part of the desired authoring language | Prefer native elements under one Table boundary; no catalogue-parity wrappers |

Silence is not adjudication. Until these rows are marked, their ledger
dispositions are recommendations, not authorization to mutate source.
