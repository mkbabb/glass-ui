# Glass UI import-DAG adjudication

**Date:** 2026-07-28  
**Seat:** GPT Sol xhigh, final adjudicator  
**Binding substrate:** `IMPORT-DAG-V2.json`, receipt
`1f8124e4c3e1a87a5bcc79c8b6ce89b0c8862a044017d63ce6197057ee1581ed`

Prospective architecture, design, challenge, and adjudication roles are **GPT Sol
xhigh**. Bounded inventory, codemod, move, manifest, test-tree, and written-cut
application roles are **GPT Luna xhigh**. Historical **Fable** and **Opus**
labels remain literal historical facts; this adjudication does not rename them.

## Verdict summary

**Both challenges are sustained against the recorded 112-directory partition,
but neither challenge ledger is adopted wholesale.** The 112 buckets exhaust
the measured inventory; they are not a terminal ownership model. The terminal
cut is feature-first, colocated, acyclic, and breaking.

The corrected v2 graph supersedes Pass 1's measurements:

| Measure | Pass 1, historical | Binding v2 |
| --- | ---: | ---: |
| Nodes | 890 | **890** |
| Internal edges | 2,182 | **2,308** |
| External edges | 623 | **623** |
| Repository-boundary edges | 1 | **1** |
| Unresolved imports / globs | 0 / not measured | **0 / 0** |
| Recorded leaf modules | 112 | **112** |
| File SCC cycles | 9 | **10** |
| Cross-module edge pairs | not measured | **518** |
| Module SCC cycles | two reconstructed by Challenger A | **3 measured** |
| Isolated nodes | 47 | **34** |
| Prefix candidates | 146 | **146** |

V2 adds exactly the 19 live Vue external-block style edges and 107 literal
`import.meta.glob` expansion edges that Pass 1 omitted. The latter exposes a
105-file demo SCC and a 15-module demo SCC. Pass 1's original nine cycles remain
real and map without loss to v2 C02-C10.

The architectural ruling is:

1. Replace directory-depth `leafModule()` ownership with explicit feature
   owners and layer laws.
2. Break all 10 file SCCs and all three measured module SCCs. Type-erased and
   lazy edges are lower runtime risk, not acceptable ownership inversions.
3. Keep semantic products such as DataTable, Deck, Carousel, InstrumentChassis,
   Avatar, Separator, Easing, Constellation, Fourier, and WatercolorSwatch.
   Their contracts establish value; consumer counts establish migration cost.
4. Delete or absorb generic utilities, mirror anatomy, class-recipe dialects,
   native-element wrappers, retired stories, and the demo's second composition
   language.
5. Drop the root runtime barrel. Give every public symbol one canonical
   feature/loading path and derive package exports, declaration entries, build
   entries, and public tests from one manifest.
6. Execute each owner cut atomically: new owner, all in-repo and coordinated
   consumer imports, tests, demo, CSS, package metadata, and deletion of the old
   path land together. There are no aliases, forwarding SFCs, old-path barrels,
   route redirects, dual exports, or fallback shims.

## Proof table: graph and measurement claims

| Contested issue | Proof | Ruling |
| --- | --- | --- |
| Pass 1 reproducibility | Its stored JSON hashes to its recorded `a607…f90` receipt when serialized by its generator. | **Proved, but historical.** Reproducibility did not make its parser complete. |
| V2 binding receipt | Replacing `observedAt` with the generator's receipt sentinel hashes the complete v2 object to `1f812…81ed`. | **Proved and binding.** |
| Vue `<style src>` omission | The live tree contains 19 occurrences resolving to 13 unique CSS targets. All 13 were among Pass 1's 47 isolated nodes. V2 records all 19 as `vue-block-src`, reducing isolation to 34. | **Challenger A proved; Pass 1 superseded.** |
| Vite glob omission | `demo/stories/manifest.ts` has two globs. `./*/*.vue` expands to 103 files; `./*/*.tile.vue` adds four loader occurrences. V2 records 107 edges. | **Challenger A proved; Pass 1 superseded.** |
| Hidden demo file cycle | The glob loader reaches story SFCs; 97 story pages reach `StoryPage`; `StoryPage` reaches `useStoryNavigation`; navigation reaches the manifest. Landing tile resolution adds the remaining loop members. | **Proved as v2 C01: 105 files.** It is lazy-load safe in the narrow runtime sense, but an ownership cycle. |
| Hidden style cycle | Adding the 19 style-block edges to Pass 1 created no extra SCC. CSS targets do not import their Vue owners. | **Refuted for the present tree.** Style reach changed isolation and module counts, not SCC count. |
| Original nine cycle classes | Live imports show C07/C08 are eager barrel cycles; C02-C06 and C10 close through type-only edges; C09 closes through a dynamic import plus a type-only reverse edge. | **Challenger A proved.** V2 still labels all of these `ecmascript`, so syntax class remains a generator defect. |
| Product module knot | V2 M02 measures `_shared`, Dock, Dropdown, Search, Select, Tabs, Tooltip, glass, and motion in one nine-module SCC. The edges include Motion importing a Tabs helper and generic controls importing Dock context. | **Proved.** The partition is not a module DAG. |
| Demo root knot | `demo/App.vue` imports shell while `demo/shell/AppShell.vue` imports `demo/router.ts`. | **Proved as M03.** Root mounts shell; shell must consume lower route contracts rather than root assembly. |
| Demo 15-module knot | V2 M01 contains `stories`, ten story categories, chassis/page/landing, and compositions. Its forward half is glob expansion and its reverse half is page/chassis navigation. | **Proved.** Split catalog data, loaders, and page UI; pages never import the loader registry. |
| “Zero unresolved” meaning | V2 resolves all constructs it recognizes, including the two literal globs. It still does not parse import edge type, nonliteral globs, template assets, workers, package exports, generators, or out-of-scope roots. | **Narrowly true, not global completeness.** |
| CSS/assets completeness | V2 regexes record 113 CSS imports and 13 CSS URL references, but do not retain media/layer semantics or distinguish source CSS from binary asset metrics. | **Useful reach evidence, incomplete semantic evidence.** |
| Repository-boundary edge | The single measured edge is `demo/vite.demo-dist.config.ts -> vite.targets.ts`. The target is not a graph node, so no return path can be traversed. Root Vite files and scripts demonstrably read `src/styles`, `src/fonts`, component CSS, and motion token sources. | **The count is correct only for scoped outgoing edges.** It is not a repository build graph. |
| Tests and package surface | V2 intentionally scopes `src/` and `demo/`; `tests/`, `tests-visual/`, scripts, `package.json#exports`, `typesVersions`, and Vite entry generation are absent. The live package has 72 export keys: 67 JS/type entries and five assets. | **Both challengers proved the scope limitation.** |
| LOC comparability | Node lines include source, Markdown, licenses, and UTF-8-decoded WOFF2 bytes. | **Refuted as a value measure.** Executable LOC, documentation lines, generated lines, and binary bytes must be separate fields. |
| 112 buckets as ownership | The same heuristic calls Aurora 9,242 lines, Badge 89 lines, a 1,118-line manifest, and a README-only font directory equivalent “leaf modules.” | **Refuted.** The buckets are an exhaustive review partition only. |
| Consumer count as retention proof | High fan-in can be caused by convenience barrels or a global class helper; low fan-in can describe a distinct public renderer or external-only contract. | **Rejected as a decision rule.** Counts inform relay size after semantic ownership is established. |
| Prefix candidates | V2 reproduces 146 candidates, but misses exact-name roots such as `drawer/Drawer.vue` and includes files in modules that will disappear. | **Candidate list accepted, blind rename rejected.** Apply the generalized rule only to the terminal tree. |

### Required graph-generator amendments

V2 is the binding audit substrate, not the final instrument. Its generator must
be amended before release proof:

1. Parse Vue with `@vue/compiler-sfc`; parse both script blocks with the
   TypeScript AST; retain `<style|script|template src>` block kind and style
   attributes such as `scoped`, `module`, and `lang`.
2. Parse `import.meta.glob` from the AST, including literal arrays, negative
   patterns, and `eager`, `import`, and query options. Label lazy loader edges
   separately from eager imports.
3. Classify imports as eager runtime, type-only, export-from, literal dynamic,
   glob-lazy, glob-eager, CSS import, Vue block, asset URL, worker, and
   `new URL(..., import.meta.url)`. Compute SCC projections separately for eager
   runtime, build/load reach, and ownership reach.
4. Parse CSS with a CSS parser rather than regex. Preserve `@import` media,
   supports, and layer clauses; record URLs as asset edges rather than source
   imports.
5. Record template-local assets and SFC inline-style dependencies. A missing or
   nonliteral local reference must be reported, not silently ignored.
6. Add typed nodes for source, style, declaration, generated source,
   documentation, license, and binary assets. Binary nodes have bytes and hash,
   not LOC; generated nodes record their generator.
7. Build separate but joinable graphs for product (`src`), demo, tests,
   visual tests, scripts/generators, build configuration, and package surface.
   Repository-boundary targets must be nodes in the repository graph.
8. Model `package.json#exports`, `typesVersions`, Vite/Rollup entries,
   `sideEffects`, CSS/font copy inputs, and generator read/write relationships.
9. Replace `leafModule()` with a checked owner manifest. Every file has exactly
   one owner; every public entry maps to one owner; cross-owner dependencies
   obey the layer law below.
10. Emit file SCCs and owner SCCs for each edge projection, plus a
    symbol-level public reach report. Preserve Pass 1 and v2 receipts; issue a
    new schema/receipt rather than rewriting history.

## Proof table: every A/B disposition contest

`A / B` records the challengers' literal dispositions. “Final” uses the ledger
legend below. Every one of the 73 disposition disagreements, including the
root `src` bucket omitted by their numbered-table regex shape, appears exactly
once here.

| Recorded module | A / B | Final | Proof and adjudication |
| --- | --- | --- | --- |
| `src/components/constellation` | INVESTIGATE / SPLIT | **SPLIT** | Field model, interaction physics, Canvas renderer, and Vue adapter change independently; atlas/slides use establishes a real decorative-field job, not the split itself. |
| `src/components/fourier-field` | INVESTIGATE / SPLIT | **SPLIT** | Pure Fourier math, renderer adapters, shaders, and Vue presentation are separate; Aurora-budget imports are an inversion. The public visualizer survives. |
| `src/components/handmark` | KEEP / MERGE | **KEEP** | Geometry, brush, ink, texture, and mark adapter form one stroke domain. Collapse forwarding sand internally; do not dissolve the owner. |
| `src/components/timeline` | MERGE / SPLIT | **SPLIT** | Scrubber is an interactive normalized slider; segmented/continuous are phase-progress displays. Move scrubber behavior to forms/navigation and keep one phase Timeline owner. |
| `src/components/drawer` | MERGE / REGROUP | **REGROUP** | Gesture, detents, live-behind mode, and scene staging are not Dialog behavior. Share an overlay substrate; reserve Drawer for direct manipulation and Dialog for modal placement. |
| `src/components/configurator` | KEEP / SPLIT | **SPLIT** | Preset/state model and instrument presentation have independent change reasons under one Configurator public cut. |
| `src/components/typewriter` | REGROUP / MERGE | **MERGE** | Typewriter and AnimatedDigit share one accessible changing-text/motion owner; their distinct renderers remain private roles. |
| `src/components/pager-dots` | KEEP / MERGE | **MERGE** | Window/worm behavior is Pagination machinery shared by Carousel and Deck; export it, if public, from `./navigation`, not a peer package. |
| `src/components/data-table` | INVESTIGATE / KEEP | **KEEP** | Responsive table/card projection, row identity, sorting, roving focus, loading/error state, and grid ARIA are a coherent data-view contract beyond native Table. |
| `src/components/completion-seal` | KEEP / MERGE | **REGROUP** | The one-shot accessible completion mark is distinct, but its owner is `feedback/completion`, not a top-level package. |
| `src/components/watercolor-dot` | INVESTIGATE / MERGE | **KEEP** | Deterministic organic silhouette, namespaced cached SVG filter, ghost outline, and PRM behavior define an authored swatch; it is neither value.js color math nor Blob's GPU field. Rename to WatercolorSwatch. |
| `src/components/carousel` | DELETE / REGROUP | **REGROUP** | Embla item scrolling is not Deck's full-viewport headless paging or Pagination's indicator. Keep the task, remove part-mirror API. |
| `src/components/card` | REGROUP / MERGE | **REGROUP** | Card adds selection/grid/cartoon semantics and a behavior-bearing shrinking header over Surface. Delete Action/Content/Description/Footer/Title forwarding SFCs; retain Card and Header. |
| `src/components/metric` | MERGE / KEEP | **KEEP** | Compact value, row, cell, and stack form a data-readout grammar used across different products. Reduce class-only parts without deleting the owner. |
| `src/components/chip` | REGROUP / KEEP | **REGROUP** | Static/selectable/action/removable modes are one authored compact-control job; move to foundations and absorb Badge's noninteractive status mode. |
| `src/components/toggle-group` | REGROUP / MERGE | **REGROUP** | A multi-choice group remains a distinct authored form control, while selection/roving contracts move below it and item wrappers become private. |
| `src/components/progress` | KEEP / MERGE | **REGROUP** | Determinate/indeterminate, marks, orientation, and lifecycle states are real behavior; move the owner under feedback rather than flattening it to a recipe. |
| `src/components/accordion` | KEEP / MERGE | **MERGE** | Group disclosure and single disclosure use one lower state/region/anatomy owner. Preserve group behavior as an authored mode, not an Accordion package topology. |
| `src/components/deck` | KEEP / INVESTIGATE | **REGROUP** | Index/progress/live announcements and focus-guarded paging define presentation navigation distinct from Carousel; move under navigation. |
| `src/components/status-dot` | KEEP / MERGE | **REGROUP** | Labelled/decorative identity, finite states, liveness, PRM, and forced colors define a real feedback mark; it belongs inside feedback. |
| `src/components/instrument-chassis` | DELETE / INVESTIGATE | **KEEP** | Stage/inspector/action boundaries, reserve and state contracts form a reusable instrument-layout job. Current external use spans unrelated instrument applications; count corroborates migration reach only. |
| `src/components/avatar` | KEEP / INVESTIGATE | **KEEP** | The discriminated labelled/decorative identity contract and status slot are authored semantics beyond an image wrapper. Keep one cohesive component; parts become private. |
| `src/components/radio-group` | KEEP / REGROUP | **REGROUP** | Single-choice semantics survive under forms/choice; the standalone upstream-shaped package does not. |
| `src/components/table` | REGROUP / DELETE | **DELETE** | Eight of nine SFCs are native-element class mirrors. DataTable keeps earned data behavior; other consumers author semantic HTML plus documented CSS. |
| `src/components/infinite-scroll` | KEEP / REGROUP | **REGROUP** | Observation, loading, and announcement behavior survive under data/loading; remove the exceptional top-level path. |
| `src/components/collapsible` | KEEP / MERGE | **MERGE** | It is the single-region mode of the disclosure owner, not a separate visual/API catalogue. |
| `src/components/dark-mode-toggle` | KEEP / MERGE | **MERGE** | The control operates only the dark state owner; state, installer, sync script, and optional switch belong to one `theme/dark` cut. |
| `src/components/switch` | KEEP / REGROUP | **REGROUP** | Binary-control semantics survive in forms/choice; Reka is private and the individual subpath leaves. |
| `src/components/separator` | KEEP / DELETE | **KEEP** | Orientation, labelled rule composition, decorative mode, and correct ARIA form one small honest primitive. Rewrite native-first and remove Reka/pass-through residue. |
| `src/components/header-ribbon` | KEEP / REGROUP | **REGROUP** | The header/action boundary survives as navigation chrome, not a foundation peer. |
| `src/components/checkbox` | KEEP / REGROUP | **REGROUP** | Tri-state behavior survives under forms/choice; remove the standalone shadcn package shape. |
| `src/components/alert` | REGROUP / MERGE | **REGROUP** | Announcement mode and tone form a feedback message contract. Title/Description wrappers and variant-string recipes disappear. |
| `src/components/animated-digit` | KEEP / MERGE | **MERGE** | Accessible numeric reel behavior becomes the number renderer inside text-motion, not a parallel package. |
| `src/components/skeleton` | KEEP / MERGE | **REGROUP** | PRM-aware loading-placeholder behavior survives under feedback/loading; it does not need a top-level entry. |
| `src/components/label` | KEEP / MERGE | **MERGE** | Label association is one part of the Field owner. Keep semantics, delete the standalone package path. |
| `src/components/badge` | REGROUP / MERGE | **MERGE** | Its noninteractive status capsule is Chip static/status mode. C08 disappears with the duplicate name and class-recipe export. |
| `src/components/input` | KEEP / REGROUP | **REGROUP** | The native control remains authored within forms/field; `/input` is not an additional canonical path. |
| `src/components/textarea` | KEEP / REGROUP | **REGROUP** | Same ruling as Input, with resize behavior local to its role. |
| `src/components/paper-backdrop` | KEEP / MERGE | **MERGE** | The component is a class-bearing decorative div. Move `paper-underpaint` into theme/Surface decoration and delete the wrapper API. |
| `src/composables/dom` | REGROUP / SPLIT | **SPLIT** | Clipboard belongs demo/code, token color belongs theme/rendering, invalid state belongs forms, drag/touch belongs interaction, and observers belong their kernels. |
| `src/composables/color` | REGROUP / KEEP | **REGROUP** | The compact color boundary survives under theme/color; isolate solve contracts and keep the value.js payload dynamic. |
| `src/composables/dark` | KEEP / REGROUP | **REGROUP** | State, install, sync, and toggle become `theme/dark`; `/dark` is replaced by that one canonical owner path. |
| `src/composables/keyboard` | KEEP / INVESTIGATE | **DELETE** | After ExpandableContainer folds into Dialog, no product feature requires the generic global shortcut registry. Demo/app and external apps migrate to app ownership or a utility dependency. |
| `src/composables/reactive` | KEEP / DELETE | **DELETE** | Scope-aware timeout/interval are generic Vue utilities. Feature clocks stay with owners or use the already selected utility runtime. |
| `src/composables/context` | KEEP / MERGE | **MERGE** | The two-file DI factory becomes private `internal/context.ts`; there is no public context package or barrel. |
| `demo/stories/substrates` | REGROUP / SPLIT | **SPLIT** | Aurora, Blob, Constellation, Fourier, and material pages follow their renderer owners; GlassPanel retires into Surface guidance. |
| `demo/stories/containers` | REGROUP / SPLIT | **SPLIT** | Overlay and disclosure stories have different owners; HoverCard/HoverPopover, Sheet, and other retired names merge into surviving pages. |
| `demo/stories/data` | REGROUP / SPLIT | **SPLIT** | DataTable, metrics, instruments, search, sorting, loading, and timeline are independent teaching jobs with colocated fixtures. |
| `demo/stories/dock` | REGROUP / MERGE | **MERGE** | Ten mechanism-axis routes become a small authored Dock narrative: overview, composition, and interaction/stress. |
| `demo/stories/motion` | REGROUP / SPLIT | **SPLIT** | Shared motion, text motion, Easing, Handmark, Deck, and scroll guidance follow their owners; Tempo is a Springs section. |
| `demo/stories/foundations` | REGROUP / SPLIT | **SPLIT** | Theme, type, radii, material, and color are separate authored concepts; registry files do not automatically earn routes. |
| `demo/shell` | REGROUP / SPLIT | **SPLIT** | App frame, catalog navigation, and Dock projection have separate change reasons. M03 is broken by lower route contracts. |
| `demo/stories/forms` | REGROUP / SPLIT | **SPLIT** | Recut around Field, Choice, Number, Select, Slider, and Tags tasks rather than one inherited package per page. |
| `demo/shell/configurator` | KEEP / REGROUP | **REGROUP** | It is coherent demo application state/editor UI under `demo/app/configurator`, never evidence for the library Configurator API. |
| `demo/stories/compositions` | DELETE / SPLIT | **SPLIT** | Auth shell, settings, validation, empty state, and gate are real integration guidance; rehome them to owning guides. Delete the chassis self-demo. |
| `demo/stories` | MERGE / SPLIT | **SPLIT** | V2 C01 proves manifest data, route loaders, background policy, tile loading, and navigation cannot remain one 1,118-line owner. |
| `demo/stories/feedback` | REGROUP / SPLIT | **SPLIT** | Recut by messages, notices, progress/loading, and marks. ConfirmDialog folds into Dialog; Toaster into Toast. |
| `demo/stories/display` | REGROUP / SPLIT | **SPLIT** | Surface/Card, Chip, Button, identity, and status guidance follow surviving owners; retired names lose routes. |
| `demo/chassis/hero` | REGROUP / MERGE | **MERGE** | Hero, page header, and background resolution are page-layout responsibilities, not a reusable chassis product. |
| `demo/stories/navigation` | REGROUP / SPLIT | **SPLIT** | Tabs, Pagination/Carousel/Deck, and chrome are independent user tasks; ToC tracking belongs app navigation. |
| `demo/composables/virtual` | REGROUP / MERGE | **MERGE** | Move the windowing/layout code beside demo app navigation or the one data specimen; delete the implementation-kind bucket. |
| `demo/chassis/body` | MERGE / DELETE | **DELETE** | The data-driven StoryBody registry is a second Vue composition language. Author ordinary Vue pages. |
| `demo/capture` | KEEP / REGROUP | **REGROUP** | Capture CSS and engine badge are visual-harness support, not demo runtime architecture. |
| `demo/chassis` | REGROUP / SPLIT | **SPLIT** | Router transitions, catalog navigation, and demo UI primitives belong to app/router, app/catalog, and demo/ui respectively; delete the aggregate barrel. |
| `demo/chassis/showcase` | MERGE / SPLIT | **SPLIT** | ShowcaseFrame is generic specimen UI; TokenLadder belongs the token guide. |
| `demo/chassis/family` | MERGE / DELETE | **DELETE** | Delete nested-page suppression and async family indirection. A page authors sections directly. |
| `demo/examples` | DELETE / MERGE | **MERGE** | Preserve useful raw examples beside their pages; delete the global examples bucket. |
| `demo/chassis/section` | MERGE / KEEP | **KEEP** | A section with heading/blurb/slot semantics is one honest demo UI primitive; its job, not 87 importers, justifies it. |
| `src/styles/tokens` | REGROUP / SPLIT | **SPLIT** | Stable foundations, material values, motion registers, and generated property registrations have different owners/cadences. |
| `src/styles/glass` | REGROUP / SPLIT | **SPLIT** | Material ladder/optics are theme; control tracks/values and component recipes move to feature owners. |
| `src/styles/_root` | SPLIT / REGROUP | **SPLIT** | Root assembly remains tiny; animation, paper, scroll, visualization, fonts, and component sheets move to semantic owners. |
| `src/styles/typography` | KEEP / MERGE | **MERGE** | Type scale, roles, and deliberate utilities become `theme/type`, not a second style hierarchy. |
| `src` | REGROUP / SPLIT | **SPLIT** | Public entry policy, forms aggregation, and global HTML augmentation are separate. Drop the runtime root and put augmentation in explicit types. |

## Disposition legend

- **KEEP** — one semantic owner survives; implementation and public path may
  still receive the terminal naming/export cut.
- **REGROUP** — the capability survives under a different feature family or
  canonical entry.
- **SPLIT** — the recorded bucket contains independently changing owners.
- **MERGE** — useful behavior folds into a named owner and the recorded boundary
  disappears.
- **DELETE** — the concept/API/story is removed; no compatibility path remains.
- **INVESTIGATE** — reserved for a genuinely unresolved owner decision. The
  final 112 ledger has none; remaining experiments concern implementation or
  release evidence, not whether a recorded bucket is accounted.

## Final module ledger — 112/112

### Components — 64/64

| # | Recorded module | Final | Terminal owner and reason |
| ---: | --- | --- | --- |
| 1 | `src/components/aurora` | **SPLIT** | `rendering/aurora`: presentation, config/simulation, renderer runtime, and shaders; shared lifecycle/budget to rendering/core. |
| 2 | `src/components/dock` | **SPLIT** | `dock`: shell/layer model, search, morph/interaction, and CSS responsibilities; generic controls never import Dock. |
| 3 | `src/components/blob` | **SPLIT** | `rendering/blob`: Vue surface, simulation/satellites, renderer bridge, and shaders under one public renderer cut. |
| 4 | `src/components/constellation` | **SPLIT** | `rendering/constellation`: model, physics, Canvas renderer, Vue adapter; break C03. |
| 5 | `src/components/fourier-field` | **SPLIT** | `rendering/fourier`: math/geometry, renderer, shader, Vue adapter; budget moves to core. |
| 6 | `src/components/handmark` | **KEEP** | `rendering/handmark`: one stroke/ink domain; collapse forwarding helpers, keep algorithms private. |
| 7 | `src/components/timeline` | **SPLIT** | Phase Timeline to data; scrubber behavior to the form/navigation range owner. |
| 8 | `src/components/drawer` | **REGROUP** | `overlays/drawer`: direct-manipulation/detent overlay over shared overlay core; break C02. |
| 9 | `src/components/tabs` | **REGROUP** | `navigation/tabs`: local types, lower selection contract, explicit Select/Tooltip composition; break C05/M02. |
| 10 | `src/components/configurator` | **SPLIT** | `configurator/model` and `configurator/view`, one public Configurator cut. |
| 11 | `src/components/_shared` | **SPLIT** | Field, selection, overlay, Surface, motion, class join, and context move to actual owners; no `_shared` barrel. |
| 12 | `src/components/typewriter` | **MERGE** | `motion/text`: accessible text renderer beside AnimatedDigit. |
| 13 | `src/components/sortable-list` | **KEEP** | `data/sortable`: cohesive drag/drop controller and accessible surface; internals private. |
| 14 | `src/components/easing` | **REGROUP** | `motion/easing`: public curve-authoring tool, not a foundation component or demo-only widget. |
| 15 | `src/components/dialog` | **REGROUP** | `overlays/dialog`: modal/focus/dismissal/placement owner; absorbs fullscreen ExpandableContainer. |
| 16 | `src/components/dropdown-menu` | **REGROUP** | `overlays/menu`: task API over private accessible parts; no Dock reach. |
| 17 | `src/components/pager-dots` | **MERGE** | `navigation/pagination`: one window/worm engine used by Carousel and Deck. |
| 18 | `src/components/data-table` | **KEEP** | `data/table`: earned responsive, sorting, identity, focus, state, and ARIA behavior. |
| 19 | `src/components/completion-seal` | **REGROUP** | `feedback/completion`: distinctive one-shot accessible mark. |
| 20 | `src/components/slider` | **REGROUP** | `forms/slider`: coherent value control; Dock hold replaced by lower interaction lease. |
| 21 | `src/components/select` | **REGROUP** | `forms/select`: task API and private collection parts; no Dock dependency. |
| 22 | `src/components/search` | **KEEP** | `data/search`: search field plus replaceable/private fuzzy index. |
| 23 | `src/components/toast` | **REGROUP** | `feedback/toast`: one queue and notice contract; minimal authored action parts. |
| 24 | `src/components/watercolor-dot` | **KEEP** | `foundation/watercolor-swatch`: rename; keep deterministic organic swatch and cached filter. |
| 25 | `src/components/carousel` | **REGROUP** | `navigation/carousel`: Embla scroller distinct from Deck; private item anatomy. |
| 26 | `src/components/command` | **REGROUP** | `overlays/command`: searchable command task with only consumer-authored parts. |
| 27 | `src/components/labeled-field` | **MERGE** | `forms/field`: one label/description/error/control contract; delete per-control forwarding wrappers. |
| 28 | `src/components/card` | **REGROUP** | `foundation/surface/card`: keep Card and behavior-bearing Header; delete markup-only anatomy. |
| 29 | `src/components/metric` | **KEEP** | `data/metric`: compact readout grammar; collapse only class-only parts. |
| 30 | `src/components/fading-scroll` | **KEEP** | `navigation/fading-scroll`: one overflow affordance with local observation. |
| 31 | `src/components/popover` | **REGROUP** | `overlays/popover`: click/hover trigger modes, shared overlay contracts, no Dock reach. |
| 32 | `src/components/chip` | **REGROUP** | `foundation/chip`: authored static/selectable/action/removable primitive; absorbs Badge. |
| 33 | `src/components/toggle-group` | **REGROUP** | `forms/choice/group`: group semantics over lower selection; private item role. |
| 34 | `src/components/tags-input` | **REGROUP** | `forms/tags`: composite tagging task; private text/delete anatomy. |
| 35 | `src/components/expandable-container` | **MERGE** | Fullscreen modal behavior folds into Dialog; delete parallel focus/body-lock/Escape stack. |
| 36 | `src/components/progress` | **REGROUP** | `feedback/progress`: determinate/indeterminate meter and marks. |
| 37 | `src/components/button` | **KEEP** | `foundation/button`: native-first Glass command with deliberate axes only. |
| 38 | `src/components/accordion` | **MERGE** | `disclosure`: group mode over one disclosure model/anatomy. |
| 39 | `src/components/deck` | **REGROUP** | `navigation/deck`: full-viewport headless paging, announcements, and keyboard behavior. |
| 40 | `src/components/status-dot` | **REGROUP** | `feedback/status-mark`: finite state, identity, liveness, PRM, forced colors. |
| 41 | `src/components/instrument-chassis` | **KEEP** | `data/instrument`: stage/inspector/action layout and state contract. |
| 42 | `src/components/scroll-progress-rim` | **MERGE** | Fold the rim presentation into navigation/progress; delete the top-level package. |
| 43 | `src/components/number-field` | **REGROUP** | `forms/number`: one numeric-entry task with private increment/decrement roles. |
| 44 | `src/components/avatar` | **KEEP** | `foundation/avatar`: one labelled/decorative identity surface with fallback/status roles private. |
| 45 | `src/components/radio-group` | **REGROUP** | `forms/choice/radio`: single-choice behavior over lower selection. |
| 46 | `src/components/tooltip` | **REGROUP** | `overlays/tooltip`: terse description and one provider policy; private anatomy. |
| 47 | `src/components/table` | **DELETE** | Native-element wrappers leave; DataTable owns earned behavior and styling. |
| 48 | `src/components/infinite-scroll` | **REGROUP** | `data/loading`: observation and announcement behavior. |
| 49 | `src/components/collapsible` | **MERGE** | Single-region mode of `disclosure`; no standalone package. |
| 50 | `src/components/dark-mode-toggle` | **MERGE** | Optional control inside `theme/dark`. |
| 51 | `src/components/switch` | **REGROUP** | `forms/choice/switch`: binary control, one forms path. |
| 52 | `src/components/separator` | **KEEP** | `foundation/surface/separator`: native-first labelled/decorative/oriented rule. |
| 53 | `src/components/header-ribbon` | **REGROUP** | `navigation/header`: Surface-based page chrome. |
| 54 | `src/components/checkbox` | **REGROUP** | `forms/choice/checkbox`: tri-state authored control. |
| 55 | `src/components/_root` | **DELETE** | Delete unused `components/index.ts`; move durable procedural docs to renderer owners. |
| 56 | `src/components/alert` | **REGROUP** | `feedback/message`: tone plus opt-in announcement; delete wrapper anatomy. |
| 57 | `src/components/animated-digit` | **MERGE** | Numeric renderer inside `motion/text`. |
| 58 | `src/components/surface` | **KEEP** | `foundation/surface`: one material-bearing plate owner. |
| 59 | `src/components/skeleton` | **REGROUP** | `feedback/loading`: PRM/forced-color loading placeholder. |
| 60 | `src/components/label` | **MERGE** | Role inside `forms/field`; no standalone export. |
| 61 | `src/components/badge` | **MERGE** | Noninteractive/status Chip mode; break C08 and delete Badge path. |
| 62 | `src/components/input` | **REGROUP** | Native input role inside `forms/field`; no individual public path. |
| 63 | `src/components/textarea` | **REGROUP** | Native multiline role inside `forms/field`; no individual public path. |
| 64 | `src/components/paper-backdrop` | **MERGE** | Theme/Surface paper decoration; delete wrapper component. |

### Composables — 9/9

| # | Recorded module | Final | Terminal owner and reason |
| ---: | --- | --- | --- |
| 65 | `src/composables/motion` | **SPLIT** | Scheduler/PRM, physics, scroll, morph, pointer, number/text, and feature-private adapters; only proven kernels remain shared. |
| 66 | `src/composables/glass` | **SPLIT** | Canvas lifecycle/backend contracts to rendering/core; material tracking to Surface; feature sampling to consumers; break C10. |
| 67 | `src/composables/dom` | **SPLIT** | Rehome clipboard, token color, invalid state, drag/touch, and observers; remove `/dom`. |
| 68 | `src/composables/sidebar` | **REGROUP** | Demo/app document navigation; drop `/sidebar` and migrate application consumers. |
| 69 | `src/composables/color` | **REGROUP** | `theme/color`: value boundary and dynamic accent solver with a lower shared contract; break C09. |
| 70 | `src/composables/dark` | **REGROUP** | `theme/dark`: installer, reactive state, sync script, and optional toggle. |
| 71 | `src/composables/keyboard` | **DELETE** | Generic app shortcut registry leaves Glass UI; no surviving product owner requires it. |
| 72 | `src/composables/reactive` | **DELETE** | Generic timer/interval leave the design system. |
| 73 | `src/composables/context` | **MERGE** | Private `internal/context.ts`; component-free, no public barrel. |

### Demo — 28/28

| # | Recorded module | Final | Terminal owner and reason |
| ---: | --- | --- | --- |
| 74 | `demo/stories/substrates` | **SPLIT** | One colocated page unit per renderer/material owner; retired GlassPanel route deletes. |
| 75 | `demo/stories/containers` | **SPLIT** | Recut by Dialog, Drawer, Menu, Popover, Tooltip, Disclosure; retired-name routes delete. |
| 76 | `demo/stories/data` | **SPLIT** | Recut by surviving data concepts with local fixtures. |
| 77 | `demo/stories/dock` | **MERGE** | Small authored Dock narrative, not ten mechanism URLs. |
| 78 | `demo/stories/motion` | **SPLIT** | Recut by motion, Easing, text motion, Handmark, Deck, and scroll; Tempo joins Springs. |
| 79 | `demo/stories/foundations` | **SPLIT** | Theme/material/type/color authored guides; registries do not automatically get pages. |
| 80 | `demo/shell` | **SPLIT** | App shell, catalog navigation, and Dock projection owners; break M03. |
| 81 | `demo/stories/forms` | **SPLIT** | Task-family guides, not inherited component-catalog parity. |
| 82 | `demo/shell/configurator` | **REGROUP** | `demo/app/configurator`; demo-only state/editor. |
| 83 | `demo/stories/compositions` | **SPLIT** | Rehome useful integration guides; delete the chassis self-demo. |
| 84 | `demo/stories` | **SPLIT** | Pure descriptors, loader registry, and layout policy separate; break C01/M01. |
| 85 | `demo/stories/feedback` | **SPLIT** | Recut by messages, toast, progress/loading, and marks; retired routes merge. |
| 86 | `demo/stories/display` | **SPLIT** | Recut by Surface, Button, Chip, identity, and status owners. |
| 87 | `demo/chassis/hero` | **MERGE** | Page-layout/header/background owner. |
| 88 | `demo/stories/navigation` | **SPLIT** | Tabs, pagination/carousel/deck, and chrome guides; ToC belongs app navigation. |
| 89 | `demo/chassis/landing` | **REGROUP** | `demo/app/catalog`; only authored-thesis landings are routable. |
| 90 | `demo/composables/virtual` | **MERGE** | Demo app navigation or the owning data story; no implementation bucket. |
| 91 | `demo/chassis/code` | **KEEP** | `demo/ui/code`: coherent block/inline/highlight authoring utility with its own class join. |
| 92 | `demo/chassis/body` | **DELETE** | Delete StoryBody DSL/renderer; pages are Vue. |
| 93 | `demo/capture` | **REGROUP** | `tests-visual/support` or explicit capture harness. |
| 94 | `demo/chassis` | **SPLIT** | App router, app catalog, and demo UI; delete aggregate barrel. |
| 95 | `demo/chassis/showcase` | **SPLIT** | Specimen frame to demo/ui; TokenLadder to the token guide. |
| 96 | `demo/chassis/page` | **MERGE** | Page root inside demo/ui/page-layout; navigation supplied from above. |
| 97 | `demo/chassis/family` | **DELETE** | Delete nested page suppression and async family tabs. |
| 98 | `demo/examples` | **MERGE** | Colocate raw examples with consuming pages. |
| 99 | `demo/chassis/play` | **MERGE** | Move play control to the motion guide that owns it. |
| 100 | `demo/chassis/section` | **KEEP** | `demo/ui/section`: one semantic authored-section primitive. |
| 101 | `demo/stories/manifest` | **MERGE** | Fold `lazy.ts` into the new loader registry; it is not a leaf owner. |

### Styles — 6/6

| # | Recorded module | Final | Terminal owner and reason |
| ---: | --- | --- | --- |
| 102 | `src/styles/tokens` | **SPLIT** | Theme foundations, material, motion, and generated registrations. |
| 103 | `src/styles/glass` | **SPLIT** | Theme material/optics versus component-private tracks, values, and recipes. |
| 104 | `src/styles/_root` | **SPLIT** | Tiny outward assembly; semantic files move to owners. |
| 105 | `src/styles/utilities` | **DELETE** | Delete generic button/component/metal/misc dialect; move only proven base/a11y rules. |
| 106 | `src/styles/theme` | **MERGE** | Fold bridges, dark, literals, and radius into the corresponding theme foundations. |
| 107 | `src/styles/typography` | **MERGE** | `theme/type`; utilities survive only as deliberate type contracts. |

### Root and build — 5/5

| # | Recorded module | Final | Terminal owner and reason |
| ---: | --- | --- | --- |
| 108 | `demo` | **REGROUP** | `demo/app` owns main/root/router/demo CSS; build config moves to repository build ownership. |
| 109 | `src` | **SPLIT** | Delete root runtime barrel; owner entries derive from one manifest; HTML augmentation moves to explicit types. |
| 110 | `src/fonts/fira-code` | **KEEP** | Cohesive licensed family; files become `latin.woff2` and `latin-ext.woff2`. |
| 111 | `src/fonts/plus-jakarta-sans` | **KEEP** | Same family/role naming ruling. |
| 112 | `src/fonts` | **MERGE** | Move README truth to theme/font docs; no README-only runtime module. |

**Coverage proof:** components 64 + composables 9 + demo 28 + styles 6 +
root/build 5 = **112/112**, with no duplicate recorded module.

## File-cycle rulings — v2 10/10

| V2 cycle | Runtime class and proof | Required terminal break |
| --- | --- | --- |
| C01 — demo manifest/page/story SCC, 105 files | `import.meta.glob` edges are lazy by default, while story pages eagerly import `StoryPage`, which imports navigation reading the manifest. Landing tile types/navigation close the remaining path. | Separate pure catalog descriptors from loader registry. Router/shell resolves current/next/previous and provides it downward; `demo/ui/page` and pages never import registry/loaders. Co-locate pages and delete nested Family/Body mechanisms. |
| C02 — Drawer, 7 files (Pass 1 C01) | Runtime implementation imports constants/context; type-only imports reach `index.ts`; the barrel eagerly exports components. | `types.ts` owns Drawer contracts. Implementation imports leaves/types directly; outbound entry is never imported internally. Then regroup under overlays/drawer. |
| C03 — Constellation, 4 files (Pass 1 C02) | Constants and Well type-import Field; Field imports constants/interaction; interaction has runtime calls plus type reverse edges. | `model.ts` owns plain types; constants depend on model; physics/Well depend on model/constants; adapter assembles one-way. No field-as-type-barrel or re-export hop. |
| C04 — Aurora GL, 3 files (Pass 1 C03) | Setup eagerly constructs frame loop/bridge; both type-import setup contracts; frame loop also type-imports bridge cursor types. | Put GL handles, uniform locations, and cursor payloads in a backend contract leaf. Setup assembles factories; factories depend on contracts, never setup. |
| C05 — Tabs, 3 files (Pass 1 C04) | SFC eagerly imports drag/responsive helpers; both type-import option/prop types from the SFC. | Move option/responsive/drag contracts to local `types.ts`; move reusable selection only when two independent owners prove it; no SFC type source. |
| C06 — interaction/selection, 2 files (Pass 1 C05) | Reciprocal type-only imports: generic outside events versus selection defaults. | Generic interaction contracts cannot default to `SelectionValue`; selection may import the lower event contract one-way. |
| C07 — Alert/barrel, 2 files (Pass 1 C06) | Eager runtime cycle: `Alert.vue` imports `alertVariants` from `"./"` while `index.ts` exports Alert. | Move finite tone styling into component CSS/local leaf; entry outward-only. Delete Title/Description forwarding anatomy. |
| C08 — Badge/barrel, 2 files (Pass 1 C07) | Same eager barrel-recursion pattern. | Badge folds into Chip; Chip styling is local/semantic and implementation never imports its entry. |
| C09 — accent solver, 2 files (Pass 1 C08) | Shell dynamically imports heavy solver; solver type-imports shell options. | Keep the lazy payload boundary. Put serializable options/results in `types.ts`; both halves depend inward. |
| C10 — canvas lifecycle/visibility, 2 files (Pass 1 C09) | Lifecycle eagerly constructs visibility; visibility type-imports suspend reason from lifecycle. | `lifecycle-contract.ts` owns reasons and ports. Observer/scheduler/backend implementations depend inward; lifecycle composes outward. |

No SCC is “fixed” by a new barrel, type alias back to the old owner,
dependency injection whose only purpose is hiding the edge, or an old-path
facade.

## Module-cycle rulings — 3/3

| Module SCC | Ruling and cut |
| --- | --- |
| M01 — 15-member demo/story/chassis knot | C01's split is controlling. `demo/app/catalog` owns pure metadata; `demo/app/router/loaders.ts` owns lazy loading; `demo/ui` owns page/section/code; `demo/catalog/<owner>/<story>` owns page content. Catalog/router may depend on descriptors and loaders; pages depend only on public package cuts and demo UI. No page imports catalog or router. |
| M02 — nine-member product knot | Abolish `_shared`; move selection/interaction/context/class contracts to L1; move renderer lifecycle to L2; Motion cannot import Tabs; generic controls cannot import Dock; Dock may compose Search/Menu but they never reach back. Tabs' optional responsive composition stays an L3 outward adapter. |
| M03 — `demo` ↔ `demo/shell` | `demo/app/main.ts` mounts `app/root.vue`; router contracts/instance live below root; shell receives router/catalog services from app assembly and never imports root files. |

## Goldilocks target: directory and ownership plan

A terminal owner has one user-recognizable job, one accountable change reason,
one test/demo home, and a dependency boundary that can be stated without fan-in
counts. Large algorithms may remain large when cohesive; tiny wrappers disappear
when they add no semantic job.

```text
src/
  internal/
    class-values.ts
    context.ts
    interaction/
      lease.ts
      selection.ts
      overlay.ts
  theme/
    color/
    type/
    space/
    radius/
    motion/
    material/
    dark/
    index.css
  foundation/
    button/
    surface/
      card/
      separator/
    chip/
    avatar/
    watercolor-swatch/
  forms/
    field/
    choice/
    number/
    slider/
    select/
    tags/
  disclosure/
  overlays/
    core/
    dialog/
    drawer/
    menu/
    command/
    popover/
    tooltip/
  feedback/
    message/
    toast/
    progress/
    loading/
    status-mark/
    completion/
  data/
    table/
    metric/
    instrument/
    timeline/
    search/
    sortable/
  navigation/
    tabs/
    pagination/
    carousel/
    deck/
    header/
    fading-scroll/
  motion/
    scheduler/
    spring/
    scroll/
    morph/
    text/
    easing/
  rendering/
    core/
    aurora/
    blob/
    constellation/
    fourier/
    handmark/
  configurator/
  dock/

demo/
  app/
    main.ts
    root.vue
    router/
    catalog/
    configurator/
  ui/
    page/
    section/
    code/
    specimen/
  catalog/
    <public-owner>/
      <story-id>/
        page.vue
        fixture.ts
        example.ts
```

Dependency levels are mandatory:

| Level | Owners | Import law |
| --- | --- | --- |
| L0 | Platform, Vue, private Reka, value.js, keyframes.js | No Glass import |
| L1 | Plain contracts: class values, context, axes, selection, interaction lease, overlay events, lifecycle ports | No component, renderer implementation, or demo import |
| L2 | Theme/color math, motion kernels, rendering core, material contracts | L0-L1 only; never Tabs, Dock, or another feature |
| L3 | Feature owners, component families, procedural renderers | L0-L2; sibling composition is explicit and acyclic |
| L4 | Public entries, CSS assembly, demo app/catalog/pages | May compose inward; product never imports demo |

CSS, local composables, types, shaders, fixtures, and owner documentation remain
inside the owner. Shared promotion requires two semantically independent owners,
not two call sites in one feature.

### Module-relative naming

The directory supplies the module name. Apply this after regrouping, never as an
intermediate churn wave:

- roots are `root.vue`; authored parts use roles:
  `dialog/content.vue`, `toast/action.vue`, `avatar/fallback.vue`;
- implementation leaves are `constellation/field.ts`,
  `interaction.ts`, `render.ts`, `types.ts`, not
  `constellationField.ts`;
- CSS is `field/control.css`, `surface/scroll.css`, `material/atom.css`;
- demo units have `page.vue`, `stage.vue`, `fixture.ts`, and `example.ts` under
  a story ID, avoiding ambiguous `data/table.vue`;
- font files are `<family>/latin.woff2` and `latin-ext.woff2`;
- shader files retain stage/backend information needed to distinguish their
  job, but drop the owner prefix;
- public Vue symbol names remain readable compound names where retained;
  DevTools identity belongs in `defineOptions`, not repeated filenames.

The 146 v2 candidates are inputs. Surviving candidates obey this generalized
rule; candidates in deleted/merged owners disappear.

## Public export law

The current 72-key map is replaced by one generated owner manifest. There is no
runtime `"."` export because no unique root-only install contract exists.
Re-exporting subpath symbols from root is rejected.

The prospective canonical surface is:

```text
./button
./surface                 # Surface, Card, behavior-bearing CardHeader, Separator
./chip
./avatar
./watercolor-swatch
./forms
./disclosure
./dialog
./drawer
./menu
./command
./popover
./tooltip
./feedback
./data
./search
./sortable-list
./navigation
./carousel                # separate loading boundary for Embla
./dock
./configurator
./motion
./motion/easing
./motion/text
./renderers/aurora
./renderers/blob
./renderers/constellation
./renderers/fourier
./handmark
./theme
./styles
./fonts/*
```

This is an ownership/loading plan, not permission to create matching barrels
before their cuts. Each symbol appears at exactly one path. In particular:

- no root/subpath duplication;
- no `./axes`, `./blob-config`, `./canvas`, `./color`, `./dom`,
  `./fourier-math`, `./keyboard`, `./motion-core`, `./reactive`,
  `./sidebar`, individual form-control paths, or individual feedback paths;
- no deep public `_shared`, Dock context, renderer adapter, shader, or
  implementation import;
- public types/constants live with their one owner;
- package exports, `typesVersions`, Vite entry names, declaration entry points,
  and public-surface tests are generated from the same fail-closed manifest;
- an implementation never imports its own outward entry.

`./forms` exposes a compact authored set of Field, native-backed controls, and
choice controls. Field is not a meta-component that makes native inputs
impossible; native escape hatches are documented. Individual control subpaths
do not coexist.

Style loading defaults to one `./styles` entry plus raw `./fonts/*`. Separate
theme/font/component CSS entries are permitted only if the byte-loading
experiment below proves an independently useful loading job; no two entries may
silently duplicate the same cascade.

### Provider and motion laws

`TooltipProvider` is the one surviving public provider component. It is
exported only from `./tooltip`, owns only dwell and sibling skip-delay policy,
and is mounted once around the nearest real group of tooltip-bearing controls.
It is not repeated per trigger, promoted to an application-wide Glass provider,
or allowed to carry Dock policy. All other provide/inject mechanisms are
owner-private context or explicit configuration contracts; they do not earn
provider components or public subpaths.

Reduced motion has one live lower-level authority in `motion/core`; features do
not issue independent media-query reads. Under reduction, correctness and input
remain while interpolation leaves: springs and scrub ramps settle
synchronously, gestures still complete, GPU surfaces paint one deterministic
rest frame and park, and non-motion legibility cues remain visible. Motion
kernels may depend only on L0-L1 contracts and never import Tabs, Dock, or any
other product feature. Feature adapters stay with their owner. There is no
`./motion-core` public path, and the reveal helpers survive only under the
symbol-level experiment recorded below.

## Test, demo, and consumer migration law

### Isomorphic separate tests

Tests remain outside product roots and mirror the terminal ownership tree:

```text
src/rendering/aurora/runtime/frame-loop.ts
tests/rendering/aurora/runtime/frame-loop.test.ts

src/overlays/dialog/root.vue
tests/overlays/dialog/focus-return.test.ts

demo/catalog/dock/overview/page.vue
tests/demo/catalog/dock/overview/page.test.ts
tests-visual/catalog/dock/overview/*.spec.ts
```

Rules:

1. Delete `tests/components/custom`, `tests/components/ui`, and the flat
   component taxonomy by moving each test with its owner in the same cut.
2. Behavior tests use owner-relative source paths. Packed public tests import
   the installed package and declarations. `@glass` is not a fallback for a
   missing export.
3. Public type/export tests live at
   `tests/public/<canonical-entry>/`; deliberate cross-owner a11y/gate suites
   live under `tests/gates/`.
4. Tests are named for behavior (`focus-return`, `detents`, `row-identity`),
   not historical wave/component prefixes.
5. Demo tests mirror `tests/demo/...`; visual specs mirror stable route IDs.
   Capture tooling belongs `tests-visual/support`.
6. Delete tests that assert Reka binding shape, class-recipe strings, old paths,
   or tombstones. Replace them with task behavior, keyboard/focus/ARIA, public
   emitted contracts, packed installs, and visual identity.

### Demo law

- `demo/app/catalog` contains pure descriptors. `demo/app/router/loaders.ts`
  owns the only glob/load registry. Page content never imports either.
- Router/app assembly injects page navigation; `demo/ui/page` is a passive
  layout primitive.
- Pages are ordinary Vue, not StoryBody data. `FamilyTabs` nesting and automatic
  every-category heroes are deleted.
- A route teaches one surviving public concept or one realistic composition.
  Retired names merge without redirects:
  HoverCard/HoverPopover -> Popover; Sheet/ConfirmDialog ->
  Dialog; Badge -> Chip; GlassPanel -> Surface; Table ->
  DataTable/native HTML; Toaster -> Toast.
- Raw examples, fixtures, local helpers, copy, and page tests remain together.
- At least one normal demo verification mode consumes the packed canonical
  package. Demo-private internals may use local paths; source aliases may not
  impersonate public reach.

This applies the frontend-design law that structure must encode real
information. A category, hero, number, or route exists because it helps someone
understand the subject, not because a manifest can synthesize it.

### Consumer migration

The existing consumer-constellation evidence is a baseline, not a deletion
oracle. Every breaking owner cut begins with a refreshed symbol/CSS/route
ledger at pinned revisions across the authoritative repository set. Import
counts determine coordination effort; semantic contracts determine retention.

For each cut:

1. Freeze the new symbol/prop/event/CSS/route contract.
2. Update the owner and mirrored tests.
3. Update all source, demo, test, CSS, docs example, build entry, declaration,
   and package-manifest consumers.
4. Update known external consumers on coordinated branches and run them against
   the packed candidate.
5. Delete old files, exports, routes, tests, CSS selectors, and comments in the
   same cut.
6. Require grep zero for old paths/names and verify graph, type surface, packed
   install, behavior, a11y, and visual evidence.

Root consumers, old individual form/feedback paths, `keyboard`, `reactive`,
`sidebar`, Table anatomy, Badge, and wrapper-part templates all require explicit
migrations. Raw class recipes, old tokens, and `data-slot` selectors receive
semantic replacements, not string aliases. Reka pass-through props/events cease
to be accidental API. Demo URL changes receive no redirects.

## Full shadcn abrogation

Reka may remain as a private accessibility engine where focus, collection,
keyboard, dismissal, and ARIA behavior is smaller and better tested than a
native rewrite. It does not define the product topology.

Abrogation is complete only when all four planes pass:

| Plane | Terminal evidence |
| --- | --- |
| Topology | No one-directory-per-shadcn catalogue and no one-SFC-per-upstream-part mirror without a consumer-authored composition need. |
| Public API | No root/subpath duplication, CVA/class-recipe export, habitual `asChild`/pass-through surface, Dock reach from a generic control, or retired name. |
| Visual grammar | No generic shadcn plate/radius/utility defaults. Each surviving foundation has an intentional Glass material, typography, density, and state contract. |
| Verification | Task behavior, a11y, packed public API, and visual identity replace binding-shape, utility-string, and tombstone tests. |

Family consequences are explicit:

- Alert loses title/description packages and variant-string recipe.
- Badge disappears into Chip and C08 disappears.
- Toast becomes one queue/notice owner with only earned action parts.
- Dialog and Drawer share overlay core but retain modal-placement versus
  direct-manipulation jobs; ExpandableContainer disappears.
- Table wrappers disappear; DataTable uses native semantics.
- Select, Command, and Menu keep distinct tasks over lower selection/menu
  contracts; stock part mirrors and Dock knowledge disappear.
- Card keeps its authored root and shrinking Header; markup-only anatomy
  disappears into HTML/slots.
- the 226-line partial utility-conflict engine is replaced by a small
  class-value join; demo/code owns its own join if needed.
- `data-*` survives only as an intentional state/part/test/style contract, not
  catalogue compatibility.
- `package.json#description`, docs, demos, and tests stop describing the
  product as a catalogue of “reka-ui primitives.”

## No-shim breaking cut order

“Phased” means dependency-ordered atomic cuts, not a deprecation window.

1. **Truth instrument.** Land graph schema v3 with typed edges, explicit owner
   manifest, repository/package/build/test projections, and deterministic
   receipts. Preserve Pass 1 and v2.
2. **Consumer and contract freeze.** Refresh the authoritative symbol/CSS/route
   ledger; select canonical entries; create coordinated consumer branches. Do
   not add new paths yet.
3. **Break graph inversions.** Move plain L1 contracts, interaction lease,
   lifecycle ports, and class join; break C02-C10 and M02. These moves update
   every internal/test import atomically and create no public alias.
4. **Break demo loading ownership.** Split catalog descriptors, loaders, router
   services, and passive demo UI; eliminate C01, M01, and M03; delete Body and
   Family mechanisms.
5. **Execute feature-family cuts from low to high.** Theme/internal first, then
   forms/disclosure/overlays/feedback/data/navigation, then Dock/Configurator.
   Each cut flips package entries and all known consumers while deleting the old
   owner in the same coordinated merge.
6. **Abrogate shadcn topology.** Within those family cuts, delete mirror parts,
   class recipes, generic utility CSS, compatibility props, and binding tests;
   preserve verified behavior behind private Reka only where earned.
7. **Execute semantic folds/deletions.** Badge -> Chip,
   AnimatedDigit/Typewriter -> text motion, Table deletion,
   ExpandableContainer -> Dialog, field wrapper collapse, disclosure merge,
   paper decoration merge, generic keyboard/reactive deletion, and retired demo
   routes. No tombstone phase.
8. **Renderer cuts.** Extract rendering/core, break renderer contract cycles,
   perform the backend experiment, then delete rejected adapters/shaders and
   any silent fallback in the same owner cut.
9. **Style/name/export close.** Apply terminal prefix stripping, font renames,
   style consolidation, generated declaration/entry map, and root-barrel
   removal. Every external consumer branch updates concurrently.
10. **Release proof.** Require zero eager-runtime and ownership SCCs; no
    unclassified owner or unresolved edge; packed type/build/style tests;
    isomorphic unit/a11y tests; browser/visual receipts; consumer builds; and
    grep zero for retired paths before the breaking major publishes.

## Remaining genuinely unproven items and exact experiments

The module ledger is complete; these items affect implementation selection or
release readiness, not whether a recorded module is accounted.

| Unproven item | Why the DAG cannot decide it | Exact experiment / decision gate |
| --- | --- | --- |
| Aurora, Blob, and Fourier canonical backend | Imports show duplicate adapters and fallback topology, not browser reach, paint fidelity, stability, or energy cost. Existing tests deliberately force WebGL2 while other receipts exercise WebGPU; that is evidence of both, not proof to delete either. | Build packed isolated pages that force each adapter with fallback disabled. Run real Chromium, Firefox, WebKit/macOS, and supported iOS hardware. Record ready/error status, cold-arm time, p95 frame time, memory/context count, context-loss recovery, power/thermal sample, and pixel/statistical parity for every public mode. Choose the smallest backend clearing the supported matrix; delete every other adapter/shader. If different explicit backends are product requirements, expose selection/status explicitly—never silent fallback. |
| Authoritative consumer closure and release window | The local constellation ledger is substantial, but repository authority, dirty/untracked sites, deployed older majors, and coordinated merge timing are external state. | Refresh `CONSUMER-LEDGER.json` at recorded SHAs using AST import/export/dynamic/CSS scanning. Classify runtime source versus docs/snapshots. Build and test every authoritative consumer against one packed prerelease and record owner approval plus merge order. No export deletion publishes until all required branches are green. |
| Exact motion reveal retention | In-repo reach shows `useScrollPin` is demo-only and `vReveal` is a trivial public/barrel hook, while `useLiquidReveal`, `useStagger`, and `useScrollScene` have plausible semantic kernels. File fan-in does not prove external symbol use. | Add symbol-level extraction to the consumer refresh. Terminal default: move `useScrollPin` demo-local, delete `vReveal`, merge `useLiquidReveal` into morph, keep `useStagger`/`useScrollScene` only if a packed consumer or surviving feature test exercises their task contract. No compatibility exports. |
| Separate style byte entries | Current exports show separate style/theme/font/component entries, but the DAG has no network/cache/coverage data. | Build representative packed consumers with one `./styles` entry and with proposed splits. Measure transferred/gzip bytes, duplicate rules, CSS coverage, cache reuse, FOUC, and dark/font startup across cold/warm loads. A split survives only if it is independently loadable and produces a material saving without duplicate cascade. |
| Authored category landings | Route generation proves existence, not whether a landing has a subject-specific thesis useful to a reader. | Inventory every proposed landing with title, single job, unique authored content, screenshot, and navigation task. GPT Sol xhigh editorial review keeps only pages with a concrete thesis that is not duplicated by the catalog index; all others lose the route. |
| Native versus private Reka per surviving control | The DAG proves dependency topology, not focus/keyboard/ARIA parity or implementation size. | For each owner, run the same behavior/a11y suite against the current private-Reka adapter and a bounded native prototype. Replace Reka only when the native version is smaller, clears keyboard/focus/dismissal/AT parity, and does not expand the public contract. This is never a reason to preserve shadcn topology. |

Until these experiments close, implementation must preserve explicit failure
and current proven behavior. It may not preserve duplicate public paths,
automatic renderer fallback, or compatibility anatomy “just in case.”
