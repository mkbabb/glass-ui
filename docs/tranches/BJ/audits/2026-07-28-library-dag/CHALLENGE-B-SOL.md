# Challenge B — import-DAG architecture audit

**Seat:** Challenger B, prospective **GPT Sol xhigh** judgment/architecture role  
**Observed tree:** `d844bef6` plus the live dirty worktree, 2026-07-28  
**Graph evidence:** `IMPORT-DAG.json`, receipt
`a607e1ae7e82cc41ec497e81d6888f99292c95bdbc8ffc95b7fbc9617dc61f90`

Historical Fable/Opus receipts remain historical facts. They are not renamed, and their conclusions
are not treated as current model receipts. New architecture, synthesis, design, challenge, and
adjudication seats are **GPT Sol xhigh**; bounded inventory, codemod, move, manifest, and test-tree
work is **GPT Luna xhigh**.

## Verdict

**CHALLENGE SUSTAINED.** The 112 recorded “leaf modules” are exhaustive graph partitions, not a
credible terminal architecture. The graph mixes three incompatible meanings of module:

1. a whole product engine (`aurora`, 37 files / 9,242 lines);
2. a shadcn-shaped public wrapper (`badge`, 2 files / 89 lines); and
3. a mechanical directory bucket (`demo/stories`, one 1,118-line manifest).

Goldilocks granularity is therefore absent at both ends. Large renderer, Dock, motion, and style
buckets hide independently changing kernels. At the other end, the generic primitive catalogue
turns upstream part names into public packages without proving a Glass-specific job. The correct
cut is feature-first: colocate a public concept with its Vue surface, state, CSS, types, tests, and
demo; extract only genuinely shared kernels; do not organize primary ownership by implementation
kind (`components/` versus `composables/`) or by an inherited catalogue.

The target is a major-version clean break. No old-path re-export, alias, forwarding component,
compatibility prop, dual root/subpath export, route redirect, or source-resolution fallback may
mask it.

## Facts and inferences

### Facts observed

- `IMPORT-DAG.json` accounts for 890 `src/` + `demo/` nodes, 2,182 internal edges, 623 external
  edges, 112 leaf buckets, 47 isolated nodes, 146 module-prefix candidates, zero unresolved
  internal edges, and nine strongly connected cycles.
- The mechanical buckets are 64 component, nine composable, 28 demo, six style, and five
  root/build modules. The largest six range from 4,766 to 9,242 lines; the smallest six range
  from 26 to 112 lines. Evidence: `IMPORT-DAG-SUMMARY.md` and `.modules` in `IMPORT-DAG.json`.
- `package.json` publishes 72 export keys: 67 JavaScript/type entry objects and five CSS/font
  assets. `src/index.ts` duplicates many symbols also published through subpaths; the root file
  contains a long dependency-exclusion policy rather than one coherent product boundary.
- `scripts/lib/subpath-policy.mjs` explicitly calls 21 packages “the shadcn-shaped set.”
  `package.json` still describes the product as “reka-ui primitives.” Eighty-eight source files
  in 28 component directories mention `reka-ui`; 87 Vue files contain `data-slot`.
  Reka use is not itself the defect, but the one-wrapper-per-upstream-part topology is.
- The graph reports zero tests under product roots because tests are outside its scope. The live
  `tests/` tree contains 217 files: 137 under `tests/components`, split among 50 flat files,
  59 `custom/`, 25 `ui/`, two `_shared/`, and one `a11y/`. Those taxonomies do not mirror the
  current source tree. `tests-visual/` is another large flat namespace.
- `demo/router.ts` synthesizes a landing route for every category and a route for every manifest
  row. `demo/stories/manifest.ts` is 1,118 lines and also owns category identity, backgrounds,
  depth, lazy lookup, tile lookup, and route metadata. `demo/chassis/family/FamilyTabs.vue`
  suppresses nested `StoryPage` chrome through injection, and
  `demo/chassis/body/StoryBodyRenderer.vue` implements a second, data-driven Vue composition
  language.
- Retired names still own pages: `containers/hover-card.vue`,
  `containers/hover-popover.vue`, `containers/sheet.vue`,
  `feedback/confirm-dialog.vue`, and `substrates/glass-panel.vue` explicitly say the named
  component has been folded or removed. These are migration exhibits, not durable product stories.
- The demo and tests predominantly reach source through `@glass/*`; the repository contains only
  a small number of `@mkbabb/glass-ui` self-imports there. This can make an unpublished or wrongly
  cut package surface look healthy.
- Cross-owner edges expose misplaced ownership: Fourier imports Aurora’s
  `constants/budget.ts`; Slider imports Dock context and hold logic; Select, Popover, and
  Dropdown content import Dock context; the renderers import the generic `composables/glass`
  bucket. Evidence:
  `src/components/fourier-field/composables/{useFourierField,fourierFieldGLSetup,fourierFieldWGPUSetup}.ts`,
  `src/components/slider/Slider.vue`, and the overlay content files.

### Architectural inferences

- A directory is Goldilocks-sized when it has one user-recognizable job, one owner, a coherent
  change cadence, and a public/private boundary that can be stated without consumer counts.
  File count and fan-in are corroboration, never the decision rule.
- Renderer lifecycle/backends, renderer-specific simulation, and renderer presentation are
  different modules even when one public component composes them. Conversely, a two-file wrapper
  is not a module merely because shadcn assigned it a component name.
- Shared code must be promoted from an owner only after at least two semantically independent
  owners need the same contract. A cross-import into Aurora or Dock is not sharing; it is ownership
  inversion.
- Full shadcn abrogation means removing catalogue topology, default visual grammar, public
  pass-through APIs, file-name grammar, and tests that enforce upstream binding shape. It does
  **not** require deleting Reka when Reka is the smallest correct internal accessibility engine.
- A demo route earns existence by teaching one surviving public concept or a realistic
  composition. A retired symbol, implementation helper, token knob, or automatically generated
  category hero does not earn a URL.

## Target topology

The physical tree should be feature-first. This is a shape contract, not a demand for these exact
folder labels:

```text
src/
  foundation/
    button/                 # root.vue, styles.css, types.ts, index.ts
    chip/
    surface/
  forms/                    # one public form vocabulary, cohesive internal controls
  disclosure/               # single/group disclosure mechanisms
  overlays/
    command/
    dialog/
    drawer/
    menu/
    popover/
    tooltip/
  feedback/
  data/
  navigation/
  motion/                   # shared clocks/physics only; feature-private motion stays private
  rendering/
    core/                   # lifecycle, budget, backend contracts
    aurora/
    blob/
    constellation/
    fourier/
  dock/
  theme/
  internal/                 # tiny proven cross-feature contracts, no public barrel
```

Inside an owner, CSS, local composables, shaders, types, fixtures, and documentation stay with that
owner. A type-only file may break a cycle; it must not become a dumping ground or public discovery
barrel. Global CSS is limited to theme foundations and honest package entries. Component-private
CSS remains beside the component and is assembled at the public style entry without moving
ownership back to `src/styles`.

## Complete 112-module disposition ledger

`KEEP` means the concept is the right-sized owner, not that its current implementation survives
unchanged. `REGROUP` moves a valid concept into a feature-first family. `SPLIT` means the recorded
bucket contains multiple owners. `MERGE` dissolves the boundary into the named owner while
preserving only useful behavior. `DELETE` removes the concept/API/story, not merely its directory.
`INVESTIGATE` is a bounded owner decision; it is not permission to retain compatibility paths.

### Components — 64/64

| # | Recorded module | Disposition | Terminal cut / reason |
| ---: | --- | --- | --- |
| 1 | `src/components/aurora` | **SPLIT** | Public Aurora presentation + Aurora simulation/config/shaders; shared canvas lifecycle/budget moves to `rendering/core`. A 9,242-line “component” is an engine suite. |
| 2 | `src/components/dock` | **SPLIT** | Keep one Dock product owner, but separate shell, layer/rail model, search, morph/interaction, and style sheets internally. Move generic portal/hold contracts out only after neutralization; no primitive may import Dock. |
| 3 | `src/components/blob` | **SPLIT** | Public Blob surface, simulation/satellites, backend bridges, and shaders are distinct internal units under `rendering/blob`; retain one public cut. |
| 4 | `src/components/constellation` | **SPLIT** | Separate field model, interaction physics, renderer, and Vue adapter under one renderer owner. Remove field-as-type-barrel and break C02. |
| 5 | `src/components/fourier-field` | **SPLIT** | Separate math/geometry, backend adapters, shaders, and Vue adapter. Promote `resolveBudgetDpr` to `rendering/core`; Fourier must not depend on Aurora. |
| 6 | `src/components/handmark` | **MERGE** | Collapse loose `brush/freehand/geometry/ink/noise/texture/constants/types/useHandMark` into a small stroke engine plus `root.vue`; the existing 12-file spread overstates one drawing primitive. |
| 7 | `src/components/timeline` | **SPLIT** | One public timeline cut with a shared model/geometry core and explicit continuous/segmented/scrubber renderers; do not let five sibling SFCs become five public modules. |
| 8 | `src/components/drawer` | **REGROUP** | Own under `overlays/drawer`; retain detent physics as its distinction from Dialog, remove barrel-derived types, and break C01. |
| 9 | `src/components/tabs` | **REGROUP** | Move to `navigation/tabs`; move option/responsive types to `types.ts`, and keep selection indicator/roving focus local unless independently shared. |
| 10 | `src/components/configurator` | **SPLIT** | Separate headless preset/state model from the Configurator presentation within one public cut; `useConfiguratorState` should not make the Vue layout the owner of generic state. |
| 11 | `src/components/_shared` | **SPLIT** | Abolish the catch-all. Field contracts → forms; selection contracts → forms/command; floating/dismissable contracts → overlays; surface resolution → surface; motion axis → motion; only tiny `internal/cn`/context leaves may remain shared. |
| 12 | `src/components/typewriter` | **MERGE** | Join AnimatedDigit in one `text-motion` family; collapse local timing helpers. It remains a public behavior only if the family has a coherent accessibility contract. |
| 13 | `src/components/sortable-list` | **KEEP** | A real interaction feature with controller, drop resolution, ghost, touch, transition, and accessible Vue parts. Rename local files and align tests; do not export its internals. |
| 14 | `src/components/easing` | **REGROUP** | Move into `motion/tools`; picker/configurator are authoring instruments over the motion vocabulary, not a peer of Button or Dialog. |
| 15 | `src/components/dialog` | **REGROUP** | Own under `overlays/dialog`, preserving focus/modal/placement behavior. Fold “sheet” presentation into documented placement sections, not a second route or API. |
| 16 | `src/components/dropdown-menu` | **REGROUP** | Rename public concept to `menu` and rewrite behind a Glass task API. The 17-file upstream-part mirror is not a terminal module boundary. |
| 17 | `src/components/pager-dots` | **MERGE** | Move pager window/worm into `navigation/pagination`, used by Carousel and Deck. Export only if it remains independently useful as a navigation pattern. |
| 18 | `src/components/data-table` | **KEEP** | Responsive row identity and table behavior form a coherent feature. It becomes the owner of any useful native table styling after `table` deletion. |
| 19 | `src/components/completion-seal` | **MERGE** | Place in `feedback/completion`; keep the distinctive completion motion but do not make every feedback mark a top-level package. |
| 20 | `src/components/slider` | **REGROUP** | Move to forms and rewrite as a Glass control. Dock hold becomes a neutral interaction capability supplied by the host, never a Slider → Dock import. |
| 21 | `src/components/select` | **REGROUP** | Move into the form family and replace the ten-part public wrapper mirror with an opinionated selection API plus private accessible parts. |
| 22 | `src/components/search` | **KEEP** | Search bar + fuzzy index is a coherent user job. Keep the index replaceable/private and colocate its tests and demo. |
| 23 | `src/components/toast` | **REGROUP** | Move to feedback; keep one queue/viewport contract. Abrogate shadcn part naming and `use-toast.ts`; use role filenames and one canonical public path. |
| 24 | `src/components/watercolor-dot` | **MERGE** | Fold the four-file decorative blob implementation into Blob/visual marks; a PRNG-backed decorative dot does not justify a top-level package. |
| 25 | `src/components/carousel` | **REGROUP** | Move to navigation, preserving Embla ownership and pager composition. Rename `interface.ts` to the contract it contains; do not export raw engine seams. |
| 26 | `src/components/command` | **REGROUP** | Keep the searchable command job under overlays, but replace the 13-file shadcn part catalogue with task-level input/list/item/group parts only where consumers author them. |
| 27 | `src/components/labeled-field` | **MERGE** | Fold wrappers and shared types into `forms/field`; label/control/description/error is one form-field contract, not a parallel component family. |
| 28 | `src/components/card` | **MERGE** | Card is a semantic Surface composition. Keep one opinionated content-card recipe inside Surface; eliminate Header/Title/Description/Content/Footer/Action pass-through SFCs where semantic HTML/slots suffice. |
| 29 | `src/components/metric` | **KEEP** | Metric, row, cell, and stack express a domain display grammar not supplied by upstream primitives. Reduce redundant part files if they remain class-only. |
| 30 | `src/components/fading-scroll` | **KEEP** | One focused overflow affordance with its own observer/constants. Keep it feature-local and publish only the component contract. |
| 31 | `src/components/popover` | **REGROUP** | Own under overlays; one Popover includes click/hover modes. Delete HoverCard/HoverPopover names and stories rather than retaining migration aliases. |
| 32 | `src/components/chip` | **KEEP** | This is the opinionated compact-selection/status primitive. It absorbs Badge and owns accent tone styling; one explicit mode axis, not two overlapping packages. |
| 33 | `src/components/toggle-group` | **MERGE** | Fold into the forms selection family with shared roving/selection logic. Public parts should describe choices, not mirror Reka names. |
| 34 | `src/components/tags-input` | **REGROUP** | Keep the feature under forms, but collapse the Item/Text/Delete wrapper topology into a task API and private parts. |
| 35 | `src/components/expandable-container` | **MERGE** | Fold into disclosure; expansion is the same state/region contract with a different Surface recipe. |
| 36 | `src/components/progress` | **MERGE** | Move to feedback/progress. Keep determinate/indeterminate semantics, not an independent upstream-shaped package. |
| 37 | `src/components/button` | **KEEP** | Foundational Glass command primitive. Rewrite native-first; keep only deliberate emphasis/tone/size/icon axes and remove upstream pass-through residue. |
| 38 | `src/components/accordion` | **MERGE** | Join Collapsible and ExpandableContainer in disclosure. Group semantics may remain a public mode; root/item/trigger/content file mirroring does not. |
| 39 | `src/components/deck` | **INVESTIGATE** | It is a headless presentation navigator, not a component. Adjudicate whether real non-demo consumers need it; then move to navigation or delete the public cut. Do not decide from its five importer edges. |
| 40 | `src/components/status-dot` | **MERGE** | Move status grammar into feedback marks; retain accessible labelled/decorative behavior and the distinctive liveness motion. |
| 41 | `src/components/instrument-chassis` | **INVESTIGATE** | It is internally cohesive, but its product boundary may be demo-specific. Keep under data/instruments only if a task-level non-demo job survives adjudication; otherwise move the layout to the demo. |
| 42 | `src/components/scroll-progress-rim` | **MERGE** | Fold into navigation/progress as one display mode; it should not be a top-level package beside general Progress. |
| 43 | `src/components/number-field` | **REGROUP** | Move to forms and collapse eight wrapper files around one numeric-entry task. Keep increment/decrement semantics private unless authored slots require them. |
| 44 | `src/components/avatar` | **INVESTIGATE** | The status slot and explicit labelled/decorative identity may justify a Glass identity primitive, but the current Root/Image/Fallback shape is inherited. Either rewrite one cohesive component or delete it; no wrapper-compatible middle state. |
| 45 | `src/components/radio-group` | **REGROUP** | Move to forms/selection and share one choice model with Checkbox/Switch/ToggleGroup where semantics actually overlap. |
| 46 | `src/components/tooltip` | **REGROUP** | Move to overlays; keep terse-description semantics and one provider policy. Trigger/content/provider wrappers are private unless consumer composition requires them. |
| 47 | `src/components/table` | **DELETE** | Nine SFCs / 186 lines is a class-bearing native-element mirror. Move useful styling/empty-state behavior into DataTable or documented CSS; consumers author semantic table markup directly. |
| 48 | `src/components/infinite-scroll` | **REGROUP** | Move to data/loading. Keep observation and announcement behavior together; remove the special curated export path. |
| 49 | `src/components/collapsible` | **MERGE** | Fold into disclosure; it is the single-region mode of the same owner as Accordion. |
| 50 | `src/components/dark-mode-toggle` | **MERGE** | Move the control beside theme state in `theme/dark`; one public theme cut owns state, install behavior, and its optional switch. |
| 51 | `src/components/switch` | **REGROUP** | Move to forms; native/Reka mechanics are internal. One public form path, no parallel `/switch` path. |
| 52 | `src/components/separator` | **DELETE** | A labelled rule can be a small semantic/CSS recipe. The generic separator wrapper and Reka pass-through do not justify a package. |
| 53 | `src/components/header-ribbon` | **REGROUP** | Move to navigation/chrome; it is a Surface toolbar composition, not a foundational component peer. |
| 54 | `src/components/checkbox` | **REGROUP** | Move to forms/selection; keep mixed-state accessibility, remove shadcn package topology. |
| 55 | `src/components/_root` | **DELETE** | `components/index.ts` is a second aggregate discovery surface. Terminal entrypoints import canonical owners directly; `PROCEDURAL-SUITE.md` moves to renderer docs. |
| 56 | `src/components/alert` | **MERGE** | Move into feedback/messages. Break C06, absorb title/description into a semantic slot contract, and remove root-barrel recursion. |
| 57 | `src/components/animated-digit` | **MERGE** | Join Typewriter in text-motion/number. The accessible value-change behavior survives; the top-level package does not. |
| 58 | `src/components/surface` | **KEEP** | This is the material-bearing foundation Card and showcase frames already compose. Remove Reka `Primitive` if native polymorphism is sufficient; keep one deliberate material/tier/decorations contract. |
| 59 | `src/components/skeleton` | **MERGE** | Move to feedback/loading; a 97-line loading placeholder is a recipe within that family, not its own package. |
| 60 | `src/components/label` | **MERGE** | Fold into forms/field. Native label semantics and control association remain; the standalone wrapper path does not. |
| 61 | `src/components/badge` | **MERGE** | Absorb into Chip as a non-interactive/status mode. Break C07 and delete the duplicated public name cleanly. |
| 62 | `src/components/input` | **REGROUP** | Move to forms/field; keep validity and control-size integration, remove the dedicated package/export. |
| 63 | `src/components/textarea` | **REGROUP** | Move to forms/field beside Input; shared control CSS and validity behavior belong to the family. |
| 64 | `src/components/paper-backdrop` | **MERGE** | The component is a 34-line `paper-underpaint` div. Move the recipe to Surface/theme and delete the wrapper API. |

### Composables — 9/9

| # | Recorded module | Disposition | Terminal cut / reason |
| ---: | --- | --- | --- |
| 65 | `src/composables/motion` | **SPLIT** | Shared scheduler/PRM/view-transition, physics, scroll, and morph are separate kernels. Move feature-private leaves (`useDockCtaReceive`, selection indicator, renderer pointer mappings) to their owners; expose one curated `/motion` path only. |
| 66 | `src/composables/glass` | **SPLIT** | Canvas lifecycle/backends/procedural color → `rendering/core`; backdrop/specular behavior → Surface/material owners; Canvas2D/WebGL/WebGPU implementation leaves become private. Break C09. |
| 67 | `src/composables/dom` | **SPLIT** | Clipboard may serve demo/code; token color belongs theme/rendering; drag velocity belongs its feature; invalid ARIA belongs forms; observers belong their consuming kernels. “DOM” is an implementation taxonomy, not ownership. |
| 68 | `src/composables/sidebar` | **REGROUP** | Move document navigation/virtualization to the demo shell or a separately named navigation product. It is not a Glass material primitive; `/sidebar` is dropped regardless of importer count. |
| 69 | `src/composables/color` | **KEEP** | A compact color-value boundary with a deliberate dynamic heavy solve. Move under theme/color, isolate public types, and break C08 without losing the quarantine. |
| 70 | `src/composables/dark` | **REGROUP** | Merge with DarkModeToggle into theme/dark. The installer/state/control share one product job and one canonical export. |
| 71 | `src/composables/keyboard` | **INVESTIGATE** | Generic shortcut registration is broader than the design system. Keep only if a non-demo Glass interaction contract requires it; otherwise move to the app/consumer and drop `/keyboard`. |
| 72 | `src/composables/reactive` | **DELETE** | `useInterval` and `useTimer` are generic Vue utilities, not Glass UI. Feature owners can own their clocks or use the runtime dependency already chosen for that feature. |
| 73 | `src/composables/context` | **MERGE** | Move the two-file context factory to `internal/context.ts`; no barrel and no public module. |

### Demo — 28/28

| # | Recorded module | Disposition | Terminal cut / reason |
| ---: | --- | --- | --- |
| 74 | `demo/stories/substrates` | **SPLIT** | Colocate Aurora, Blob, Constellation, Fourier, and material pages with their own helpers. Delete the retired GlassPanel route; make material behavior a Surface page section. |
| 75 | `demo/stories/containers` | **SPLIT** | Recut by surviving overlay/disclosure concepts. Merge hover-card + hover-popover into Popover; sheet into Dialog; context mode into Menu. No retired-name routes. |
| 76 | `demo/stories/data` | **SPLIT** | One story unit per surviving data concept with local fixtures/helpers. Delete the native Table page after Table deletion; merge virtual/infinite loading where the user job is the same. |
| 77 | `demo/stories/dock` | **MERGE** | Ten implementation-axis pages become a small authored Dock narrative (overview, composition, stress/interaction). `_frame/DockStage.vue` stays with that feature. |
| 78 | `demo/stories/motion` | **SPLIT** | Recut into user-recognizable motion, text-motion, handmark, and scroll stories. Internal tempo/preset mechanics are sections, not automatically URLs. |
| 79 | `demo/stories/foundations` | **SPLIT** | Colocate each authored foundation page and its data. Retain routes only for durable theme/material concepts, not every token register. |
| 80 | `demo/shell` | **SPLIT** | App shell, navigation, and Dock-specific projection are different owners. Keep shell routing simple and move document-navigation composables here if retained. |
| 81 | `demo/stories/forms` | **SPLIT** | Rebuild as one coherent Forms page or a few task families, not one route per inherited control package. Co-locate specimens and examples. |
| 82 | `demo/shell/configurator` | **REGROUP** | This is demo application state/editor UI; place under `demo/app/configurator`, not as a peer story or library Configurator proof. |
| 83 | `demo/stories/compositions` | **SPLIT** | Each realistic scene is an authored feature unit. Remove “gate-pattern” if it exists only to demonstrate internal governance rather than a user composition. |
| 84 | `demo/stories` | **SPLIT** | Break the 1,118-line manifest into small per-category catalog descriptors plus one schema/registry. Background and depth policy move to page/layout owners. |
| 85 | `demo/stories/feedback` | **SPLIT** | Organize by feedback user jobs. Merge confirm-dialog into Dialog guidance and Toaster into Toast; delete retired-symbol URLs. |
| 86 | `demo/stories/display` | **SPLIT** | Recut by surviving foundation concepts. Badge folds into Chip; Card into Surface; Separator disappears. Tile helpers live with their page. |
| 87 | `demo/chassis/hero` | **MERGE** | Hero/page/header/background resolution form one page-layout owner. Seven files and multiple background factories should not be a separate reusable “chassis” layer. |
| 88 | `demo/stories/navigation` | **SPLIT** | Group Carousel/Pagination, Tabs, and chrome stories by task. ToC tracking moves with demo/document navigation, not the component catalog. |
| 89 | `demo/chassis/landing` | **REGROUP** | Move to `demo/app/catalog`. Only authored category landings get routes; generated bento metadata is app navigation, not story content. |
| 90 | `demo/composables/virtual` | **MERGE** | Move virtual section layout/windowing beside the one data story or into demo shell navigation if genuinely shared. Remove the implementation-kind bucket. |
| 91 | `demo/chassis/code` | **KEEP** | Inline and block code form one demo-private authoring feature. Rename to role files (`inline.vue`, `block.vue`, `highlight.ts`) and colocate its test. |
| 92 | `demo/chassis/body` | **DELETE** | Delete the 442-line secondary component DSL and author Vue stories directly. It hides content structure and makes story metadata another renderer API. |
| 93 | `demo/capture` | **REGROUP** | Move capture CSS/engine badge to `tests-visual/support` or an explicit visual-harness entry; it is tooling, not demo runtime architecture. |
| 94 | `demo/chassis` | **SPLIT** | Route transition links, transition policy, and story navigation move to `demo/app/router` and `demo/app/catalog`; delete the aggregate barrel. |
| 95 | `demo/chassis/showcase` | **SPLIT** | Showcase frame is a specimen layout; TokenLadder is a foundation-specific table. Move each to its real consumers rather than sharing a two-file directory. |
| 96 | `demo/chassis/page` | **MERGE** | Merge `StoryPage.vue` with the hero/page-layout owner; a 97-importer single-file module signals a missing coherent demo UI package, not a perfect leaf. |
| 97 | `demo/chassis/family` | **DELETE** | Remove nested-StoryPage suppression and async family indirection. Author one family page with ordinary sections or keep genuinely distinct routes. |
| 98 | `demo/examples` | **MERGE** | Move each raw-code example beside its consuming story (`card`, `configurator`, `toast`). A global examples drawer breaks supreme colocation. |
| 99 | `demo/chassis/play` | **MERGE** | `StoryPlayButton.vue` belongs to the motion stories that use it; one 67-line helper does not need a chassis module. |
| 100 | `demo/chassis/section` | **KEEP** | A single semantic story-section primitive is a valid demo UI owner. Rename it `section/root.vue` or `demo/ui/section.vue` and colocate tests/styles. |
| 101 | `demo/stories/manifest` | **MERGE** | `makeLazy` is a one-consumer lookup helper. Merge into the small catalog registry after manifest split; do not preserve a one-file submodule. |

### Styles — 6/6

| # | Recorded module | Disposition | Terminal cut / reason |
| ---: | --- | --- | --- |
| 102 | `src/styles/tokens` | **SPLIT** | Separate stable theme foundations (color/type/space/radius), material tokens, and motion registers. Generated property registrations get an explicit generated owner. Twenty files / 4,551 lines is not one token module. |
| 103 | `src/styles/glass` | **SPLIT** | Recut into material ladder, optical effects, interaction/reveal, and component-private recipes. Move chip/capsule/track/value styles to component owners when not truly cross-feature. |
| 104 | `src/styles/_root` | **REGROUP** | Replace 20 root forwarding/assembly files with one canonical `theme/index.css`, one component assembly entry, and colocated feature imports. Root filenames such as `glass.css`, `tokens.css`, and `typography.css` currently obscure ownership. |
| 105 | `src/styles/utilities` | **DELETE** | Remove generic `.btn`, “components,” metal, and misc utility catalogues as part of shadcn/default-grammar abrogation. Move only proven a11y/base rules to theme foundations. |
| 106 | `src/styles/theme` | **MERGE** | Fold bridges/dark/literals/radius into the corresponding theme foundation owners; “theme” must not be a second token hierarchy. |
| 107 | `src/styles/typography` | **MERGE** | Typography scale/semantic rules belong to theme/type. Utility selectors survive only when they are a deliberate public CSS contract. |

### Root and build — 5/5

| # | Recorded module | Disposition | Terminal cut / reason |
| ---: | --- | --- | --- |
| 108 | `demo` | **REGROUP** | Keep `main.ts`, app root, router, and demo CSS under `demo/app`; move `vite.demo-dist.config.ts` to repository build config. Runtime app and build configuration are not one leaf. |
| 109 | `src` | **SPLIT** | Replace the giant curated `index.ts` and special `forms.ts` with canonical owner entrypoints generated from one export-cut manifest; keep HTML attribute augmentation in an explicit types owner. |
| 110 | `src/fonts/fira-code` | **KEEP** | A font asset family plus its license is cohesive. Rename assets to `latin.woff2` / `latin-ext.woff2`; the directory already supplies `fira-code`. |
| 111 | `src/fonts/plus-jakarta-sans` | **KEEP** | Same ruling: cohesive licensed asset family; rename files to role basenames without the directory prefix. |
| 112 | `src/fonts` | **MERGE** | Fold the isolated README into theme/font documentation or the repository docs. It is not a runtime/build module. |

**Coverage:** 64 + 9 + 28 + 6 + 5 = **112/112** recorded modules.

## Nine-cycle rulings

All nine cycles are defects even where TypeScript erases an `import type`. Type erasure makes a
runtime cycle less dangerous; it does not repair ownership or tooling topology.

| Cycle | Ruling | Required break |
| --- | --- | --- |
| C01 — Drawer seven-member SCC | **BREAK / REGROUP.** `Drawer.vue`, context, and constants import public types from `index.ts`, while the barrel exports the components. | Create drawer-local `types.ts`; implementation imports types/leaves directly; `index.ts` is outbound-only and no implementation imports it. `content.vue` owns overlay composition without barrel reach-back. |
| C02 — Constellation constants/field/interaction/well | **BREAK / SPLIT.** `constants.ts` imports field-exported types; field imports constants + interaction; interaction re-exports Well; Well imports the field type. | Put model/config types in `model.ts`; constants import only model; field imports interaction directly; interaction imports Well directly without re-export indirection; Well imports model, never field. |
| C03 — Aurora frameLoop/glSetup/uniformBridge | **BREAK / SPLIT.** `glSetup.ts` constructs frame/bridge, whose type imports point back to `glSetup`. | Extract backend-neutral GL handle/uniform contracts into `gl-types.ts`; setup depends on factories, factories depend on contracts, never setup. |
| C04 — SegmentedTabs/drag/responsive | **BREAK / REGROUP.** Both composables import option/config types from the parent SFC that imports them. | Move public options/responsive/drag contracts to `types.ts`; SFC and helpers depend on it. Keep responsive Select adaptation in Tabs, not a reverse component import. |
| C05 — `_shared/interaction` ↔ `_shared/selection` | **BREAK / SPLIT.** Selection events and selection contracts mutually import types. | Put dismissable overlay events under overlays and selection events under forms/selection; if one listbox contract truly needs both, define it once in `selection/contracts.ts`. No reciprocal “shared” files. |
| C06 — Alert ↔ barrel | **BREAK / MERGE.** `Alert.vue` imports variants from `"./"` while `index.ts` exports Alert. | Move recipe to `styles.ts` or inline it in `root.vue`; outbound barrel only. The feedback merge removes title/description wrapper recursion. |
| C07 — Badge ↔ barrel | **BREAK / MERGE.** Same barrel-recursion pattern. | Badge is deleted into Chip; Chip recipe lives beside Chip and implementation never imports its barrel. |
| C08 — accent solve ↔ `useAccentTone` | **BREAK / KEEP.** The dynamically loaded solver imports options from its caller. | Put serializable solve options/results in `types.ts`; both leaves import types. Preserve dynamic heavy-value boundary without a reverse dependency. |
| C09 — canvas lifecycle ↔ visibility | **BREAK / SPLIT.** Visibility imports `CanvasSuspendReason` from lifecycle while lifecycle constructs visibility. | Put suspend reasons and observer/scheduler ports in `lifecycle-contract.ts`; scheduler and observer implementations both depend inward on the contract. |

No cycle is resolved with a new barrel, re-export hop, type alias to the old file, or dependency
injection whose sole purpose is to hide the edge.

## Naming cut

The directory supplies the module name. Apply the rule to the terminal tree, not as a churn-heavy
intermediate rename inside directories that will be deleted or merged.

- Package root SFCs use `root.vue`; authored parts use role names:
  `accordion/content.vue`, `dialog/title.vue`, `toast/action.vue`, not
  `AccordionContent.vue`, `DialogTitle.vue`, or `ToastAction.vue`.
- Implementation leaves use role names:
  `constellation/field.ts`, `interaction.ts`, `render.ts`, `types.ts`;
  `spring/presets.ts`; `pointer/field-mappings.ts`; `dark/mode-sync-script.ts`.
- CSS follows the same rule:
  `_shared/field/control.css`, `card/scroll.css`, `glass/atom.css`.
- Demo units get their own directory and role files:
  `catalog/data/data-table/page.vue`, `catalog/dock/search/page.vue`,
  `catalog/substrates/aurora/stage.vue`. This avoids the mechanical false ambiguity where
  `demo/stories/data/data-table.vue` would otherwise become `data/table.vue`.
- Font assets become `<family>/latin.woff2` and `<family>/latin-ext.woff2`.
- Shader basenames retain backend/stage information but drop the owner prefix:
  `aurora/shaders/image.frag.ts`, `fourier/shaders/render.wgsl.ts`.
- Exported Vue symbol names may remain user-readable compound names where the public API retains
  them; the filesystem does not repeat the namespace. `defineOptions({ name })` owns DevTools
  identity.

The 146 mechanical candidates are therefore an input set, not 146 blind `mv`s. Every surviving
candidate follows the rule after regrouping. Candidates in deleted modules disappear, and
category false ambiguities are resolved by giving the story its own owner directory.

## Test-tree cut

The terminal test tree mirrors the terminal source and demo tree exactly after the top-level
`src/`/`tests/` distinction:

```text
src/rendering/aurora/runtime/frame-loop.ts
tests/rendering/aurora/runtime/frame-loop.test.ts

src/overlays/dialog/root.vue
tests/overlays/dialog/root.test.ts

demo/catalog/dock/overview/page.vue
tests/demo/catalog/dock/overview/page.test.ts
tests-visual/catalog/dock/overview/*.spec.ts
```

Rules:

1. Delete `tests/components/custom` and `tests/components/ui` as taxonomies by moving each test to
   its owner; delete the flat component-test layer. No compatibility directories or import aliases.
2. Keep behavior tests beside their mirrored owner; keep public type/export tests under
   `tests/public/<canonical-subpath>/`. Cross-cutting a11y suites may remain cross-cutting only when
   they enumerate multiple owners intentionally.
3. Name tests after the behavior (`focus-return.test.ts`, `detents.test.ts`), not after a historical
   wave or a component prefix.
4. Move demo tests to the corresponding `tests/demo/...` path and visual specs to a route-ID
   directory. The current flat `tests-visual` wave/debug names are receipts or tooling, not the
   durable product suite.
5. Public-install tests import the packed package and its declarations. Source unit tests may use
   relative owner paths. Neither uses `@glass` as a fallback for a missing export.
6. Delete tests that only assert Reka/shadcn binding shape (`reka-binding-idiom`) and replace them
   with task behavior, accessibility, emitted public API, and visual identity tests.

## Demo and route cut

- Use `demo/app` for shell/router/catalog infrastructure, `demo/ui` for the very small reusable
  page/section/code specimen kit, and `demo/catalog/<public-concept>/<story>` for authored pages.
- Split the manifest into per-family descriptors consumed by one registry. The descriptor names a
  route and loader; page content remains Vue, not a `StoryBody` data DSL.
- A category landing is routable only when it has an authored subject-specific thesis. Delete the
  automatic “every category gets a D1 hero” rule; a catalog heading is sufficient for un-authored
  categories.
- Merge retired-name pages into the surviving concept:
  HoverCard/HoverPopover → Popover; Sheet/ConfirmDialog → Dialog; Badge → Chip; GlassPanel/Card →
  Surface; Table → DataTable/native HTML; Toaster → Toast.
- Do not keep redirects from retired story URLs. The demo is documentation, so redirects would
  falsely preserve the removed ontology.
- Delete the nested `FamilyTabs`/`STORY_NESTED_KEY` mechanism. A family page directly authors
  sections; truly independent concepts get independent pages.
- Move `demo/examples/*` beside their pages so raw-code imports, specimens, tests, and copy stay
  together.
- Make the demo consume the packed canonical public paths in at least one normal dev/test mode.
  Source-relative imports are allowed only for explicitly demo-private internals. Remove `@glass`
  as a way to bypass package exports.

This follows the frontend-design principle that structure must encode real information: category,
hero, numbered depth, and a route exist only when they help a person understand or navigate the
subject, not because the framework can synthesize them.

## Public export cuts and consumer migration

The current 67 JavaScript entry objects are too many, and the same symbol is often available from
both `.` and a subpath. The proposed canonical surface has no duplicated symbol paths:

```text
./button
./chip
./surface
./forms
./disclosure
./command
./dialog
./drawer
./menu
./popover
./tooltip
./feedback
./data
./search
./sortable-list
./navigation
./timeline
./configurator
./motion
./text-motion
./fading-scroll
./dock
./handmark
./renderers/aurora
./renderers/blob
./renderers/constellation
./renderers/fourier
./theme
./styles
./fonts/*
```

This is a prospective 30-cut surface. `.` should be dropped unless the owner defines a unique
root-only install contract; it must not re-export subpath symbols. The following current discovery
or implementation seams leave the public map: `./axes`, `./blob-config`, `./canvas`, `./color`,
`./dom`, `./fourier-math`, `./keyboard`, `./motion-core`, `./reactive`, `./sidebar`, individual
form-control paths, individual feedback paths, and all retired/merged component paths. Public
types/constants move to their one owning canonical subpath. `./styles.css`, `./styles/theme`, and
`./styles/fonts` fold into the one documented style/theme contract unless the bytes serve a proven
independent loading job; font files remain on `./fonts/*`.

Consumer count is not the retention test. Each cut must answer:

- Is the concept recognizable and useful without knowledge of this repository?
- Does it have behavior, semantics, or visual identity beyond a dependency wrapper?
- Can its contract be versioned without exposing a backend or implementation taxonomy?
- Is it the single canonical path for every symbol it owns?

### Expected blast radius

This is intentionally a high-blast-radius major migration:

- JavaScript and type imports change for every root-barrel consumer and every merged/dropped
  subpath.
- Compound-part templates change where shadcn-shaped parts collapse into task APIs.
- CSS imports consolidate; consumers of raw class recipes, `data-slot`, or old token names need
  semantic replacements, not string aliases.
- Reka pass-through props/events cease to be accidental public API. Focus, keyboard, dismissal,
  and ARIA behavior must remain, but compatibility prop shapes do not.
- Demo URLs change with the concept cuts and receive no redirect table.
- Build entries, `typesVersions`, declarations, package verification, README examples, and
  external consumers must land in the same major cut.

Before implementation, GPT Luna xhigh should produce a symbol-level consumer ledger from known
repositories and packed-package fixtures. GPT Sol xhigh then adjudicates each semantic move.
Absence of an in-repo importer never proves deletion safety, and presence of many importers never
proves architectural fitness.

Migration lands atomically per cut:

1. author the new owner and its mirrored tests;
2. move every in-repo source/demo/test/CSS consumer;
3. replace package exports and declarations in the same commit/wave;
4. update known external consumers in coordinated clean-break commits;
5. delete old files, old exports, old routes, and old tests immediately;
6. verify source graph, packed install, type surface, behavior, browser/visual receipts, and grep
   zero for old paths.

There is no deprecation window, alias package, forwarding SFC, dual CSS entry, wildcard fallback,
or resolver condition that maps an old path to a new owner.

## Full shadcn-abrogation acceptance

The abrogation is complete only when all four planes are clear:

| Plane | Required terminal evidence |
| --- | --- |
| Topology | No one-directory-per-shadcn-component catalogue and no one-SFC-per-upstream-part mirror without an authored consumer-composition need. |
| Public API | No root/subpath duplication, dependency pass-through contract, generic `asChild`/variant surface copied by habit, or retired component name. |
| Visual grammar | No generic shadcn default plate/radius/token/utility recipe; each surviving foundation has an intentional Glass material, typography, state, and density contract. |
| Verification | Task behavior + accessibility + visual identity tests replace string/tombstone and Reka-binding tests; demo pages teach surviving concepts only. |

Reka may remain behind an owner where it supplies robust accessible behavior more parsimoniously
than a rewrite. It is an internal engine, not the product taxonomy or the package description.

## Explicit adjudication questions

1. **Root export:** approve dropping `@mkbabb/glass-ui` runtime exports entirely, or name one
   unique root-only install contract. Re-exporting subpath symbols from root is rejected.
2. **Form public shape:** should `./forms` expose a compact set of authored controls, or one
   higher-level Field + Selection API with native input escape hatches? Either choice must avoid
   individual dual subpaths.
3. **Avatar:** does the labelled/decorative/status identity behavior merit a greenfield Glass
   Avatar, or should the package delete Avatar and document native image/fallback composition?
4. **Deck:** is the headless presentation navigator a real library product or demo/application
   logic? Provide a task-level external use, not an importer count.
5. **Keyboard:** is shortcut registration part of a surviving Glass interaction contract, or does
   it move to consumers?
6. **Pager:** should Pagination remain independently public, or be private shared navigation
   machinery for Carousel/Deck?
7. **Instrument chassis:** is this a generally named public instrument layout or a demo-specific
   composition? If public, name its target user job and at least one non-demo scenario.
8. **Category landings:** which categories have an authored thesis strong enough to earn a route?
   All synthesized landings are otherwise deleted.
9. **Style loading:** does a measured consumer require separate theme/fonts/component CSS bytes?
   If not, approve one canonical `./styles` entry plus raw `./fonts/*`.
10. **Reka boundary:** approve Reka as a private accessibility engine after the catalogue rewrite,
    or require its removal from selected foundations where native Vue/HTML is demonstrably smaller.
11. **External coordination:** identify the authoritative consumer repository set and release
    window for the major clean break. The DAG cannot answer this.
12. **Execution order:** approve renderer-core extraction before renderer splits, then cycle breaks,
    feature regrouping, test/demo isomorphism, export replacement, shadcn deletion, and final
    packed-consumer verification. This order avoids inventing compatibility scaffolding.

Until these questions are adjudicated, `INVESTIGATE` rows remain blocked from implementation.
They do not block the unambiguous cycle breaks, naming rule, test-tree correction, demo
de-contrivance, or deletion of compatibility mechanisms.
