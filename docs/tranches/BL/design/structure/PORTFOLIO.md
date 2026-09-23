# D1 · round 0 — the structure portfolio

| field | value |
|---|---|
| seat | D1 round-zero portfolio. Design loop D1 covers structure: the colocation edict N-1 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `ddf6385a`. `src/` is byte-identical to 10.0.1 |
| inputs | `CHARTER.md` (the last four paragraphs), `audit/PROMPT-RECAP-SEED.md` (E-1..E-13, N-1, N-2, P-1, P-3), `audit/round-1/L12.md`, `L13.md`, `L14.md`, `audit/REGISTRY.md` band H (F-55..F-61) plus F-03, F-10, F-58, F-66, `BI/STRUCTURE-ADDENDA.md`, `BJ/addenda/2026-07-24-refinement/{STRUCTURE-ZONES,DIRECTORY-SHAPE}.md`, `docs/design/design-idioms.md` §7, `scripts/lib/subpath-policy.mjs`, `vite.library.ts`, `package.json` |
| instruments | scratch `D1/graph.mjs` is a read-only regex import resolver over `src demo tests tests-visual scripts` and the root `vite*.ts` files (1,265 files, 2,858 edges; the 57 unresolved are `?raw` imports or string-built specifiers). Also `measure.mjs`, `fam.mjs`, `reach.mjs` and `owned.mjs`, plus `node scripts/import-dag.mjs` run read-only with its output sent to scratch. Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/` |
| deliverable | Six orthogonal families. Each one gets a charter, a tree sketch, an enforcement mechanism, a measured cost, the consumer impact, its known risks and its pass-1 questions. This document picks no winner |

## 0 · The problem

The owner's edict (`CHARTER.md`, last four paragraphs; N-1): components are COLOCATED with their sub-components, composables, skeletons, constants, styles and the rest, recursively for nested components. Only truly module-level or global composables, and other dirs of that nature, live in a `composables/` dir therein. Long-running dirs are always broken into common modules and encapsulated. The same treatment applies to backend files, adapted to their language.

glass-ui has no server. Its backend analogue is the Node tooling: `scripts/` (17 files, 6,855 lines), the root build modules (`vite.*.ts` and `vitest.config.ts`, 9 files, 1,330 lines) and `.github/workflows` (2 files).

Standing law that constrains every family:

- E-1: clean breaks. No aliases, no shims, no dual doors.
- E-7: every `src/` artefact has at least 2 sites, or is exported, or is a private demo helper.
- E-8: invariant gates, 40-60 in total. Test rows are not gates.
- P-1: KISS.
- P-3: one source of record per fact.
- N-2: colocation is a disease row. BJ decided it, it rode two closes and stayed OPEN at BK (#62). Deciding it is a wave of its own (F-55).

## 1 · Baseline at HEAD (measured here)

| quantity | HEAD | source |
|---|---:|---|
| `src/components` files / dirs / lines | 459 / 84 / 59,249 | `find`, `wc` |
| `src/composables` files / dirs / lines | 109 / 26 / 17,501 | same |
| `src/styles` files / lines | 81 / 14,550 | same |
| component dirs (excluding `_shared`) · SFCs · `index.ts` in `src` | 56 · 147 · 73 | same |
| component dirs holding a `composables/` · `styles/` · `styles.css` · `constants.ts` | 10 · 3 · 20 · 7 | same |
| single-owner modules in `src/composables` (OWNED) | 32 files, about 40% of composable lines | L13 §A (symbol-level tracer) |
| specifiers into those 32 plus the demo-only `useScrollScene` and `search/index.ts` barrel (34 files) | 117 from outside the set (src 69, demo 14, tests 34), 38 within it | `owned.mjs` |
| specifiers leaving a component dir | 424 | `fam.mjs` |
| specifiers entering a component dir from outside it | 1,043 (other components and `_shared` 295, root barrels 61, `styles/*.css` 21, demo 323, tests 322, tests-visual 18) | `fam.mjs` |
| specifiers into `src/composables` from outside it | 289 (components 129, root 10, demo 43, tests 104, scripts and vite 3). Of those from `src`: 100 deep, 39 through a subtree `index.ts` | `measure.mjs`, `reach.mjs` |
| private reaches into another component's internals, from `src` | 268 edges: 257 into `_shared/*` (no real door), 11 into component privates | `reach.mjs` |
| sideways component→component pairs (excluding `_shared`) | 25 | `reach.mjs` |
| value module SCCs | M02 (7 members: `_shared`, dock, menu, select, tabs, composables/glass, composables/motion), M03 (dialog ↔ sheet), M01 (demo manifest) | `import-dag.mjs` |
| `@glass/` specifiers | demo 367, tests 423; `src` 0 | `measure.mjs` |
| literal `composables/…` path strings in tests, tests-visual and scripts | 218 | `grep` |
| test files (`tests/`) · visual specs · story SFCs | 249 · 167 · 110. 96 stories import `demo/chassis` | `find`, `grep` |
| dirs with 10 or more direct files | src 15, tests 9, demo 4, scripts 1, plus `tests-visual/` itself at 177 flat | `find` |
| files over 500 lines | src 17, tests 19, demo 8, scripts 7, tests-visual 6 | `wc` |
| export keys · JS subpaths · `typesVersions` | 68 · 62 · 62 | `package.json` |
| npm workspaces | already in use: `"workspaces": ["tests-visual"]`, npm 11.12.1 | `package.json` |

## 2 · Two facts every family inherits

### 2.1 Placement is already decoupled from the public surface

`vite.library.ts:3-7` states the design: "Public entry names remain stable while their sources live only at their component/composable owners." The entry map is `name → source path`. It already maps names to nested, non-matching paths: `blob-config → src/components/blob/config.ts` and `fourier-math → src/components/fourier-field/math.ts` (`subpath-policy.mjs:165-205`). The one coupling left is `buildEntrySet`, which derives component keys from directory names: `entries[d] = src/components/${d}/index.ts` (`subpath-policy.mjs:306-321`; L13-09).

Re-key that to an explicit `name → path` map and no placement change needs to touch a public subpath. So BI's USER-FLAG #2 premise ("You cannot colocate a published entry into a consumer without deleting the public surface", `BI/STRUCTURE-ADDENDA.md:20-26`) does not hold at HEAD. In every family below, consumer impact is a choice, not a consequence of the moves.

### 2.2 The common floor (not a differentiator)

Every family must land these rows. They are listed once here and left out of each family's cost:

1. **One door per symbol (E-1, F-58):**
   - `useDockCtaReceive` on `./dock` and `./motion` (`dock/index.ts:76-86`, `motion/index.ts:55`)
   - four colour primitives on `./aurora` and `./color` (`aurora/index.ts:87-90`)
   - three constants on `./motion` and `./motion-core`
   - `blob-config` and `fourier-math` each get a recorded decision (L13-03)
2. **Dead doors:** `src/components/index.ts` (0 importers) and `_shared/index.ts` (1 demo importer) (L12-10).
3. **`useScrollScene` → demo.** The orphan-CSS gate's fixture is re-seated on a synthetic module (L12-12, L13-08, F-03).
4. **`./tokens`:** the consumer preset retires (E-5; L13-13). The manifest stays.
5. **`./sidebar`:** 0 `src` importers. BJ COLO-2 demoted it and the demotion never landed (L13-01). A decided row.
6. **Re-key the entry map** from directory names to `name → path` (§2.1). D1-C and D1-E replace the mechanism outright.
7. **Rewrite `design-idioms.md` §7** to match whichever tree wins (L12-05 canon drift).

## 3 · Axes, and where each family sits

| axis | D1-A graph home | D1-B sealed modules | D1-C workspaces | D1-D strata | D1-E manifests | D1-F capsules |
|---|---|---|---|---|---|---|
| unit of colocation | the file, placed by its importers | the module (family, then recursive sub-modules) | the package | the unit inside a stratum | the unit that declares a manifest | the subject's whole lifecycle |
| how "global" is decided | measured: the LCA of importers is the zone root | declared domain membership, plus a kernel admitted by ruling | declared package dependencies | declared stratum charter | declared scope claim, checked against measured consumers | nearest common capsule |
| where the API boundary lives | authored entry list; files pinned to their doors | `index.ts` door of every module, recursively | `package.json` `exports`, enforced by the resolver | per-unit `index.ts`, plus the stratum rank | generated from manifests | capsule `index.ts` |
| tests relative to source | mirrored at `mirror(home(subject))` | inside the module, beside source | a `test/` dir per package | mirrored per stratum | a `tests/` slot claimed by the unit | inside the capsule with stories and visual specs; the zones dissolve |
| what "encapsulated module" means for a long dir | graph-cluster carve past a bound | sub-module with its own door | a new package | stratum plus unit bound | sub-unit manifest | nested capsule |
| enforcement substrate | a placement gate that recomputes home(f) | a door gate with no deep reach | module resolution plus TS project references | a rank gate | the generator, fail-closed | a capsule gate plus dist purity |
| backend (scripts, build) | the same LCA law over `scripts/` | `scripts/<domain>/index.mjs` doors | tooling packages with `bin` | lib → domain → bin ranks | tool manifests | a capsule per tool |

Rows on which two families agree are sub-choices, not shared mechanisms. D1-A and D1-D both mirror tests, but one places by a computed function and the other by a declared rank. D1-A and D1-F share a nearest-common-ancestor sub-rule for global code, but D1-F's mechanism is the capsule boundary. Pass 1 may cross-pollinate these, but only after each family is developed on its own (charter, portfolio management).

---

## 4 · The families

### D1-A · Graph-derived home (the LCA placement law)

**Charter.** A file's directory is a pure function of the import graph.

- For every unanchored file f, home(f) is the lowest common ancestor directory of f's importers in the same zone. Importers from `demo/` and `tests/` do not count toward `src` placement.
- The file lands in that directory's slot for its kind: `composables/` for hooks and their helpers, a sibling `.css` or `styles/` for stylesheets, and no slot for SFCs.
- An LCA at a zone root (`src`, `src/components`) means "global" and resolves to the zone's shared slot: `src/composables/`, `src/styles/` or `src/components/_shared/`.
- **Anchors:** a file re-exported by a published entry's door stays beside that door. Entry doors, route SFCs and CLI entry files are pinned.
- **Recursion comes free:** a helper used only by `dock/morph/` lives in `dock/morph/`.
- **Long dirs:** a directory above the bound (proposal: 12 direct files) is carved by the connected components of its internal import graph, and each component becomes a subdir. A file over 500 lines is carved by hand along the same seams.
- **CSS:** ownership is a graph too. Classes map to the files that emit them, and custom properties to the files that consume them. A rule block's home is the LCA of its emitters, and a register emitted by two or more unrelated components stays in `src/styles/`.

**Center:** the placement function. **Optimizes:** no judgment calls and no taxonomy to argue. The rule is its own gate. Drift is impossible because the tree is recomputed, not remembered.

**Tree sketch.**

```
src/components/
  _shared/                          the component zone's shared slot (LCA = src/components)
    overlay/  ModalOverlay.vue      ← dialog/ (not on ./dialog; importers dialog + sheet)
              participation.ts placement.ts content.ts shortcuts.ts
    hold.ts                         ← dock/composables/useDockHold.ts (importers dock + slider)
    gpu/  webgl/ webgpu/ canvas2d/  ← src/composables/glass/{webgl,webgpu,canvas2d} (PROC family, L13 §A)
    …                               (family-shared clusters reappear here as _shared/<cluster>/)
  dock/
    GlassDock.vue index.ts constants.ts README.md
    dockContext.ts                  anchored: on ./dock (dock/index.ts:67)
    dock.css tokens.css             ← styles/{index,dock}.css; 35 --dock-* tokens from styles/tokens/sizing.css
    state/     useDockState.ts useDockShellProps.ts useDockClickIntegrity.ts
    morph/     useDockMorph.ts dockMorphMeasure.ts useDockSpring.ts morph.css shape.css
    run/       useDockRun.ts run.css                            (run.css 599 → carved)
    layers/    DockLayer.vue DockLayerGroup.vue dockSwitcherContext.ts layers.css layer-group.css
    crossfade/ DockCrossfade.vue dockCrossfadeContext.ts crossfade.css
    controls/  DockControl.vue DockTrigger.vue DockSeparator.vue DockBackgroundToggle.vue
               controls.css icon-button.css tab-button.css triggers.css touch-floor.css
    search/    useDockSearch.ts search.css
      engine/  match.ts types.ts useFuzzySearch.ts               ← src/composables/search/
    cta/       useDockCtaReceive.ts cta-seat.css                ← src/composables/motion/morph/
    luminance/ useBackdropLuminance.ts sample.ts sampleMath.ts adaptive-legibility.css
                                                                ← src/composables/glass/
    scroll/    useScrollChrome.ts                               ← src/composables/motion/scroll/
    shell/     shell.css shell-regions.css density.css          (shell.css 527 → carved)
  sheet/
    SheetContent.vue index.ts motion.ts (anchored: on ./sheet) sheet.css (578 → carved)
    detents/ use.ts projection.ts
  button/
    Button.vue index.ts button.css
src/composables/                    only files whose importer LCA is the zone root
  context/ dom/ color/ dark/ keyboard/ reactive/
  motion/{core,spring,morph,scroll,reveal,route,number}/        minus the owned leaves
  specular/ vSpecular.ts useSpecularTracking.ts                 (button + dock → zone root)
src/styles/                         registers with ≥2 unrelated emitters; tokens with no single owner
  tokens/ theme/ typography/ glass/{material,ladder,veil,rim,surfaces,…} utilities/
tests/                              mirror(home(subject)), e.g. tests/components/dock/morph/useDockMorph.test.ts
scripts/                            the same law: lib/paint-arm.mjs (tests-visual only) → tests-visual/_support/
```

**Enforcement.** `scripts/structure/home.mjs` recomputes home(f) for every file in `src`, `demo` and `scripts`, and `mirror(home(subject))` for every test. The gate fails on:

- any file whose path differs from its home
- any dir over the bound
- any file over 500 lines

This is one invariant, shaped for E-8.

Born RED at HEAD. The measured lower bound:

- the 32 OWNED composables, plus `useScrollScene` (L13 §A)
- 4 private contracts: `dialog/ModalOverlay.vue`, `dock/composables/useDockHold.ts`, `aurora/constants/budget.ts`, `tabs/composables/useTabRovingFocus.ts`
- 2 whole-file owned stylesheets (`glass/glass-chip.css`, `glass/dissolve.css`)
- 10 family stylesheets with no family home (L13 §B)
- 86 mirror-broken test files (L14-07)
- 17 files over 500 lines
- 15 src dirs over the bound

Pass 1 computes the exact count.

**Migration cost.**

- **Moves:**
  - about 34 composables
  - about 45 files regrouped inside dock, aurora, blob, menu and sortable-list
  - about 20 CSS files or sections
  - about 100 component-named token declarations, redistributed into about 12 `tokens.css`
  - about 130 test files: the 86 mirror-broken ones plus the tests of moved subjects
- **Specifier rewrites:**
  - 117 + 38 for the owned set
  - about 250 for the in-component regroup
  - 218 literal path strings

  That is roughly 600-700 in total.
- **Export map:** 0 keys change. About 6 entry-map source paths change.

**Consumer impact.** None beyond the floor (§2.2).

**Known risks.**
1. **Churn.** home(f) moves when importers change: one new sibling import relocates a file. The law turns every borrowing into a move.
2. **Public cycles survive placement.** `dockContext` is on `./dock` (`dock/index.ts:67`), so `_shared/overlay/participation.ts:11-14 → dock` stays and M02 survives any placement. The law moves files. It does not invert dependencies. Breaking M02 needs a neutral injection key at the LCA (the dock provides it, the overlays inject it), and that is a design act the law cannot make. M03 does dissolve: `ModalOverlay.vue` is not on `./dialog`, so it floats to `_shared/overlay/`, and `sheet/motion.ts` is anchored on `./sheet`.
3. **The shared slot absorbs every family.** With no family directories, all family-shared code (overlay, track, field, gpu, pager) lands in `src/components/_shared/`. That is the laundering layer L12-09 describes. The bound then carves it into `_shared/<cluster>/`, and somebody has to name the clusters.
4. **"Anchored because exported" is E-7's escape hatch in a new place.** Publishing a helper pins it anywhere (L13-14 lists public modules with 0 readers).
5. **Type-only edges.** If they count, one shared type drags its file to the zone root. If they do not, a shared contract type sits inside one consumer.
6. **The CSS half is heuristic.** It needs a class-emission graph, and classes built at runtime (`cn()`, the variant recipes in `badge/index.ts:43-84`, `chipVariants.ts`) resist it.
7. **The connected-components carve can yield unnamed clusters.** Naming is the one judgment the law cannot remove.

**Pass-1 research questions:** see §7, D1-A.

---

### D1-B · Sealed family modules (vertical slices, one door each)

**Charter.** The unit of encapsulation is a module: a directory with an `index.ts` door.

- Everything inside a module is private to it. A specifier from outside may resolve only to the door.
- Modules nest: sub-components are sub-modules with their own doors, recursively.
- **First-level modules are families, declared by domain, not measured.** Draft partition, which pass 1 validates:
  - overlay: dialog, sheet, popover, menu, tooltip, command
  - dock
  - controls: button, chip, tabs, toggle-group
  - binary: checkbox, radio-group, switch
  - fields: input, textarea, number-field, label, labeled-field, select
  - track: progress, slider, timeline, scroll-progress-rim
  - pager: carousel, pager-dots, deck
  - disclosure: accordion, collapsible, expandable-container
  - feedback: toast, alert, badge, status-dot, skeleton
  - surfaces: card, surface, separator, avatar
  - data: table, data-table, metric, sortable-list, infinite-scroll, fading-scroll
  - procedural: aurora, blob, fourier-field, constellation, plus the GPU substrate
  - expressive: typewriter, handmark, music-staff, easing, configurator, dark-mode-toggle
- Each family keeps its module-level hooks in `<family>/composables/`, with family CSS beside them. That is the edict's own grammar ("composables that are truly module-level … within a composables/ dir therein").
- The global kernel is `src/composables/` and `src/styles/`, admitted by ruling.
- Long dirs: a module past the bound splits into sub-modules.

**Center:** the encapsulation boundary. **Optimizes:** private reaches become impossible (dialog ↔ sheet, slider → `useDockHold`, blob → `aurora/constants/budget`), reasoning stays local, and family-shared code gets a family home instead of a zone-wide `_shared`.

**Tree sketch.**

```
src/components/
  overlay/                      index.ts (family door)
    composables/  useSpringMount.ts          ← src/composables/motion/spring/ (dialog + sheet)
                  useParticipation.ts        (key inverted: dock provides, overlays inject)
    placement.ts content.ts shortcuts.ts interaction.ts
    overlay.css                              ← styles/glass/overlay-plate.css :24-126
    modal/   index.ts ModalOverlay.vue focus-veil.css
    dialog/  index.ts Dialog.vue DialogContent.vue DialogHeader.vue DialogTitle.vue
             DialogDescription.vue DialogFooter.vue dialog.css
             dialog.test.ts …                (tests beside source; same-module importers are exempt)
    sheet/   index.ts SheetContent.vue motion.ts sheet.css sheet.test.ts
             detents/ index.ts use.ts projection.ts detents.test.ts
    menu/    index.ts DropdownMenu*.vue menu.css (← styles/glass/overlay-plate.css :127-268)
             sub/ index.ts DropdownMenuSub*.vue      items/ index.ts Checkbox/Radio items
    popover/ tooltip/ command/
  dock/                         index.ts; features are sub-modules, each with its own door
    state/ morph/ run/ layers/ crossfade/ controls/ search/(engine/) cta/ luminance/ scroll/ shell/
  controls/                     index.ts
    composables/ useLiquidPress.ts useSpringPress.ts      (button, dark-mode-toggle, dock, timeline → a kernel-vs-family ruling)
    specular/    index.ts vSpecular.ts useSpecularTracking.ts
    button/      index.ts Button.vue button.css Button.test.ts
    chip/ tabs/ toggle-group/
  procedural/   gpu/(webgl webgpu canvas2d shaders) aurora/ blob/ fourier-field/ constellation/
  fields/ binary/ track/ pager/ disclosure/ feedback/ surfaces/ data/ expressive/
src/composables/   kernel modules, each behind a door: context/ dom/ motion/ color/ dark/ keyboard/ reactive/
src/styles/        kernel registers and tokens
scripts/           <domain>/index.mjs doors: exports/ graph/ styles/ release/ paint/ + kernel/ (root, walk, lexers)
build/             the root vite.*.ts modules as one module with a door
```

`./sheet` keeps its key and points at `src/components/overlay/sheet/index.ts`. The demo imports doors only, through an alias generated from `libraryEntryMap()`, which makes the demo a consumer of the published surface.

**Enforcement.** A door gate. For every specifier whose resolved file sits inside module M while the importer sits outside M, the resolved file must be M's `index.ts`. Door-level acyclicity is checked too: door cycles are still cycles. The size bound forces sub-modules.

Born RED at HEAD:

- 268 `src` edges reach past a door:
  - 257 into `_shared`, which has no real door
  - 11 into component privates: `aurora/constants/budget.ts`, `dialog/{Dialog,DialogContent,ModalOverlay}.vue`, `dock/composables/{dockContext,useDockHold}.ts`, `menu/DropdownMenuTrigger.vue`, `sheet/motion.ts`, `surface/Surface.vue`, `tabs/composables/useTabRovingFocus.ts`
- 100 deep reaches from `src` into composables subtrees
- if demo and tests are held to doors as well: demo 51 + 28, tests 155 + 77

**Migration cost.**

- **Moves:** every component dir moves one level down into its family, about 459 files.
- **Specifiers:** 424 leave a component and 1,043 enter one. About 1,400 change depth or become door imports.
- **Door growth:** every symbol reached privately today goes onto a door or moves. Pass 1 counts this bill.
- **Tests:** 249 test files move into modules.
- **Export map:** 0 keys change if per-component entries point at the nested doors (about 50 entry-map paths change).
- **Variant B′:** one subpath per family (`./overlay`, `./fields`). This breaks about 45 keys and needs consumer addenda (E-6).

**Consumer impact.** None under B. Under B′, every sibling that imports a component subpath changes.

**Known risks.**
1. **Taxonomy is judgment.** Is select overlay or fields? Command overlay or data? Dark-mode-toggle dock or controls? Tabs controls or navigation? A misfiled component leaks through its door permanently.
2. **Door bloat.** Sealing pushes whatever siblings need onto doors, so a door export that exists only for a sibling looks public and trips E-7. Two door grades (module door and published entry) risk turning into dual doors (E-1).
3. **Barrel weight.** Door-only imports can pull a whole family into a chunk. The `motion`/`motion-core` split exists because barrels carry the keyframes weight (`motion/index.ts:1-17`). `profile-bundle` is already RED (L14-09), so this has to be measured.
4. **Door cycles.** Overlay ↔ dock still cycles through doors: the dock uses menu's trigger, and the overlays read dock participation.
5. **The demo on doors.** Demo stories that show internals (`DockStage`, the luminance probes, `glass-material.vue`) need privates. Those stories would have to move into their modules or lose access.
6. **SFC doors at depth.** Re-exporting SFCs from nested doors, and the `.vue` declaration flattening (`flatten-subpath-types.mjs`), both have to work several levels down.

**Pass-1 research questions:** see §7, D1-B.

---

### D1-C · Workspace packages (the resolver enforces privacy)

**Charter.** The unit is an npm workspace package.

- Each encapsulated module becomes a private workspace package with its own `package.json` `exports`, its own TypeScript project reference, its own tests and its own README.
- **The resolver enforces privacy.** A subpath not listed in `exports` does not resolve, in Vite, vitest, vue-tsc and Node alike.
- **Dependencies are declared.** A package imports only packages listed in its `package.json`, and TS project references refuse cycles.
- The published `@mkbabb/glass-ui` becomes an aggregate package. It bundles the private packages into the same `dist` behind the same 68 keys.
- The tooling (`scripts/` and the root vite plugins) becomes real Node packages with `bin` entries. This is the literal backend treatment.
- The repo already runs npm workspaces (`"workspaces": ["tests-visual"]`).

**Center:** the substrate (module resolution). **Optimizes:** enforcement with no custom gate, explicit dependency manifests, independent typecheck and test scopes, and the option to publish sub-packages later.

**Tree sketch.**

```
packages/
  tokens/     package.json {exports: {"./css": …, "./manifest": …}}  src/{tokens,theme,typography,registers}/
  kernel/     src/ class-names primitive axes selection focus interaction context/
  platform/   src/ dom/ color/ dark/ keyboard/ reactive/
  motion/     src/ core/ spring/ scroll/ morph/ reveal/ route/ number/    (feeds ./motion and ./motion-core)
  gpu/        src/ webgl/ webgpu/ canvas2d/ procedural/
  overlay/    package.json {name: "@glass-ui/overlay", private: true, exports: {".": "./src/index.ts"}}
              src/ modal/ dialog/ sheet/{SheetContent.vue motion.ts sheet.css detents/} popover/ menu/ tooltip/ command/
              test/ sheet.test.ts dialog.test.ts …
  dock/       src/ GlassDock.vue index.ts state/ morph/ run/ layers/ crossfade/ controls/ search/ cta/ luminance/ scroll/ shell/
              test/ …   deps: kernel motion overlay platform
  controls/   src/ button/{Button.vue index.ts button.css} chip/ tabs/ toggle-group/ specular/   test/ Button.test.ts
  fields/ binary/ track/ pager/ disclosure/ feedback/ surfaces/ data/ procedural/ expressive/
  glass-ui/   the published aggregate: package.json (68 keys), src/entries/<name>.ts re-exporting workspace packages
tooling/
  exports/ graph/ styles/ release/ paint/      each private, with bin entries and its own tests
  build/                                       the root vite.*.ts plugins
apps/
  demo/       depends on "@mkbabb/glass-ui": "workspace:*"
  visual/     today's tests-visual workspace
```

**Enforcement.** Three layers:

- module resolution
- TS `references`, acyclic by construction
- a declared-dependency check: every import's package must be listed in `dependencies`

Born RED: the first build of the split fails at every undeclared or cyclic reach. M02 and M03 have to be broken before the project references compile.

**Migration cost.**

- **Moves:**
  - every `src` file, about 650
  - `scripts/` (17 files) and the root build modules (9 files, 1,330 lines)
- **New config:** 15-20 new `package.json` and `tsconfig.json` pairs.
- **Specifiers:**
  - every cross-package specifier in `src` becomes a package specifier, on the order of 700 (424 leaving components plus 289 into composables, minus those that stay within one package)
  - 790 `@glass/` deep specifiers in demo and tests are rewritten
  - the `@glass` alias, declared 4 times, retires
- **Pipelines:** the library build is re-pointed at the aggregate, and CI install and workflows change.
- **Export map:** the aggregate keeps all 68 keys. Variant C′ publishes sub-packages under new names and needs consumer addenda.

**Consumer impact.** None with the aggregate. Under C′, every sibling import changes.

**Known risks.**
1. **Source exports.** Private packages would expose TypeScript source through `exports`, with no build step. That is one resolution path, since they never publish, but it has to be checked against the fleet-wide abrogation of the `development` condition (`vite.config.ts:38-51`) so it does not become a condition-based dual path.
2. **Types.** vue-tsc has to run composite project references over SFCs, and the aggregate needs declaration emit (`flatten-subpath-types.mjs`).
3. **CSS order across packages.** The `@layer theme, base, components, utilities` order (`styles/index.css:1`) and the component rung ladder have to be reassembled in the aggregate. The style-fold copy follows the `@import` closure (`vite.style-fold.ts:383-398`); does it follow package specifiers?
4. **Hoisting.** vue and reka-ui peers can duplicate. The sibling `file:` links interact with the CI monorepo layout.
5. **Granularity.** Package boundaries inherit D1-B's taxonomy problem. One package per component (56) is too many.
6. **KISS (P-1).** About 40 new config files is a lot of machinery for a library of about 650 source files.
7. **Placement inside a package.** The substrate says nothing about where files go within a package, so D1-C must pair with a rule from A, B or F.

**Pass-1 research questions:** see §7, D1-C.

---

### D1-D · Declared strata (direction first)

**Charter.** Organize by dependency direction, not by ownership or domain. The source tree is a short, fixed stack of strata, and each stratum imports only from the ones below it:

1. **foundation:** tokens, theme, typography, CSS registers, fonts
2. **primitives:** global hooks (context, dom, color, dark, keyboard, reactive, motion)
3. **substrate:** GPU and canvas lifecycle, the pointer field
4. **patterns:** family-shared contracts (overlay, track, field, control-bit, pager, disclosure, selection, hold)
5. **components:** atoms, which never import each other
6. **compositions:** components that compose other components (dock, command, easing, labeled-field, data-table, configurator, carousel, number-field, card)

Membership of strata 2-4 is declared in one charter, one row per module with its reason. The charter is the source of record for what is global. Global is never measured: a module leaves its owner only through a charter row.

Inside a component or composition, colocation is full and recursive: sub-components, composables, constants, skeleton and styles. Every stratum and every unit carries the size bound.

**Center:** acyclic direction (rank). **Optimizes:** cycles are impossible by construction because rank strictly decreases along every edge. Sideways coupling shows up as an explicit promotion, and "why is this global?" is answered by a row. **Prior art:** Feature-Sliced Design's layer import rule, the atom/molecule/organism ranks of Atomic Design, and the dependency rule of Clean Architecture.

**Tree sketch.**

```
src/
  foundation/    tokens/ theme/ typography/ registers/(material ladder veil rim surfaces reveal …) fonts/ index.css   rank 0
  primitives/    context/ dom/ color/ dark/ keyboard/ reactive/ motion/(core spring morph scroll reveal route number)  rank 1
                 specular/ (vSpecular, useSpecularTracking: charter row "button + dock")
  substrate/     gpu/(webgl webgpu canvas2d procedural) pointer-field/                                                 rank 2
  patterns/      overlay/ ModalOverlay.vue participation.ts placement.ts spring-mount.ts sheet-motion.ts            rank 3
                 hold/ useHold.ts (← dock/composables/useDockHold.ts)   track/ field/ control-bit/ pager/ selection/
  components/    button/ Button.vue index.ts button.css                                                             rank 4
                 sheet/  SheetContent.vue index.ts sheet.css detents/{use.ts projection.ts}
                         (./sheet re-exports patterns/overlay/sheet-motion: one door; dialog reads the pattern, not the sheet)
                 dialog/ … chip/ slider/ tabs/ …
  compositions/  dock/ GlassDock.vue index.ts state/ morph/ run/ layers/ crossfade/ controls/ search/ cta/ luminance/ scroll/ shell/
                 command/ easing/ labeled-field/ data-table/ configurator/ carousel/ number-field/ card/            rank 5
  strata.ts      the charter: module → reason (consumers are computed, never listed)
tests/           mirrors the strata
scripts/         lib/ (fs, lexers, color, png) → domain/ (exports policy, graph, styles) → bin/ (CLIs), same rank gate
build/           the root vite.*.ts modules; rank above scripts/domain
```

**Enforcement.** A rank gate, applied to every value and type edge:

- rank(from) must exceed rank(to), except within one unit
- components may not import components
- a charter row whose module has fewer than two consumer units fails (the E-7 cross-check)
- a module in strata 2-4 with no charter row fails

Born RED at HEAD:

- 25 sideways component pairs: blob→aurora, card→surface, carousel→{button,deck}, command→dialog, configurator→{expandable-container,fading-scroll,label}, data-table→{skeleton,table}, dialog↔sheet, dock→menu, easing→{button,select,slider,tabs}, labeled-field→{input,label,slider,switch}, number-field→button, pager-dots→deck, slider→dock, tabs→select
- the upward edges `useSelectionGroup → tabs/composables/useTabRovingFocus` and `_shared/overlay/participation.ts → dock`
- the 32 owned composables, which sit in a lower stratum without a charter reason

**Migration cost.**

- **Moves:**
  - composables (109) into primitives, substrate or patterns
  - styles (81) into foundation
  - `_shared` (27) into patterns
  - about 10 dirs into compositions
  - 34 owned composables into their owners
- **Specifiers:** 289 into composables, about 257 into `_shared`, 21 `@import`s, about 200 into the moved compositions, plus the demo and tests `@glass/` specifiers for the renamed zones. On the order of 1,000.
- **Export map:** 0 keys change. The `dist` CSS layout (`./styles`, `./styles/theme`, `./styles/fonts`, `./styles.css`) must be pinned when `src/styles` becomes `foundation/`, because the style-fold roots at `src/styles`.
- **Variant D′** keeps today's directory names and adds only the rank table and the charter. It must be costed next to D.

**Consumer impact.** None if the dist CSS layout is pinned.

**Known risks.**
1. **Promotion de-colocates.** Promotion pushes shared code away from its consumers: `ModalOverlay` leaves dialog for `patterns/overlay/`. The edict's "otherwise they're to be COLOCATED" may reject that, and `patterns/` can turn back into `_shared` (L12-09).
2. **The component/composition line moves.** The moment a component starts using another component, it moves: carousel becomes a composition because it uses Button. That is churn by composition.
3. **Governance weight.** The charter is a governance artefact (P-1, E-8). It must hold reasons only; listing consumers would duplicate the graph (P-3).
4. **Renaming cost.** Renaming the top-level zones costs about 1,000 specifiers for a benefit (direction) that D′ may get at half the churn.
5. **Compositions composing compositions.** Dock uses menu's trigger; if menu is a composition, compositions need a sub-rank or a ban.

**Pass-1 research questions:** see §7, D1-D.

---

### D1-E · Unit manifests, generated wiring (declaration is the source of record)

**Charter.** Every unit carries one typed manifest, `unit.ts`, holding only what code cannot say:

- its public entry name, if it has one
- its visibility: who may import it (its parent, its family or everyone), in the sense of Bazel's `visibility`
- the cascade rung of its stylesheets
- its scope claim (owned or global)

Anything code can already say (imports, exports) is read from code and never restated.

Generators derive the wiring that is hand-kept today:

- the entry map and exports map, replacing the dir-keyed classes and hand path lists in `subpath-policy.mjs` (388 lines)
- the ordered `styles/index.css`, replacing the 21 hand-written component `@import`s and the second channel of SFC `<style src>` (L12-05)
- the demo route rows in `demo/stories/manifest.ts` (1,098 lines)
- the test and story globs

**The generator is the gate.** It fails on:

- an unclaimed file
- an import that the importee's visibility forbids
- a symbol reachable from two published entries (E-1)
- a global claim with fewer than two consumer units
- generated output that differs from the committed copy

**Center:** declaration, with generated wiring. **Optimizes:** P-3 (one source per fact), moves that edit one manifest path, and an explicit statement of intent that the facts are checked against.

**Tree sketch.**

```
src/components/dock/
  unit.ts        defineUnit({ entry: "dock", visibility: "public",
                              styles: [{ file: "dock.css", rung: "component" }], tokens: "tokens.css" })
  GlassDock.vue index.ts dock.css tokens.css README.md
  morph/   unit.ts { visibility: "parent" }   useDockMorph.ts dockMorphMeasure.ts morph.css
  search/  unit.ts { visibility: "parent" }   useDockSearch.ts search.css
    engine/ unit.ts { visibility: "parent" }  match.ts types.ts useFuzzySearch.ts
  cta/ luminance/ layers/ crossfade/ controls/ run/ state/ scroll/ shell/   (each with a unit.ts)
  tests/         unit tests, claimed by the unit
src/components/sheet/
  unit.ts        { entry: "sheet", styles: [{ file: "sheet.css", rung: "component" }] }
  SheetContent.vue index.ts motion.ts sheet.css detents/ tests/
src/components/_shared/overlay/
  unit.ts        { visibility: "family:overlay" }   ModalOverlay.vue participation.ts …
src/components/button/
  unit.ts        { entry: "button", styles: [{ file: "button.css", rung: "component" }] }
  Button.vue index.ts button.css tests/
src/composables/motion/
  unit.ts        { entry: ["motion", "motion-core"], scope: "global" }   (a symbol on both entries fails)
src/styles/
  unit.ts        { rungs: [...] }  the ordered register ladder; registers beside it
scripts/<tool>/unit.ts   { bin: "regen-exports" }   (package.json scripts derived from tool units)
```

**Enforcement.** The generator runs as `units check`.

At HEAD no manifests exist, so the gate is RED only because its input is missing. That is vacuous (the charter's failure list names "gates that cannot fail"). The honest born-RED list, planted after the manifests exist and before any file moves:

- the 40 multi-door symbols (L13-03)
- the 32 owned composables, each carrying a global claim with one consumer
- `participation.ts → dock`, which dock's visibility forbids
- the dual CSS channel

**Migration cost.**

- **New files:** 70-80 manifests (56 components plus their sub-units, about 10 composable modules, styles and tools).
- **Generators replace:** `subpath-policy.mjs` (388 lines), `regen-exports.mjs` (210), the component band of `index.css` and the route rows of `manifest.ts`.
- **File moves:** the colocation floor, about 100 files and about 500 specifiers.
- **Export map:** 0 keys change. The regeneration must reproduce the current map exactly.

**Consumer impact.** None.

**Known risks.**
1. **It re-opens a decided ruling.** BI ruled "HAND-AUTHORED curated root barrel (DP-D; no manifest machinery)" (`BI/STRUCTURE-ADDENDA.md` §1). This family needs the owner's explicit sanction.
2. **Duplication (P-3).** Any manifest field that code can derive becomes a second source. The schema has to be minimal, and pass 1 must prove each field cannot be derived.
3. **Committed vs build-time output.** Committed generated files need a drift check. Build-time generation adds a step in front of vitest, vue-tsc and the demo.
4. **Machinery weight (P-1, E-8).** The generator becomes the largest gate in the repo.
5. **The cascade.** Some rules are UNLAYERED on purpose (the `index.css` comments near `:190` and `:257`). Generating the order can lose the reason that sits next to the `@import` today.
6. **Door bloat in another form.** Visibility grades can bring back D1-B's door-bloat problem.

**Pass-1 research questions:** see §7, D1-E.

---

### D1-F · Lifecycle capsules (the zone split dissolves)

**Charter.** The unit is a capsule that holds every artifact of its subject across its life: source, sub-components (as nested capsules), composables, constants, skeleton, styles, tokens, unit and type tests, stories, visual specs and a README.

- **The zones dissolve.** The top-level `tests/` and `tests-visual/`, and most of `demo/stories/`, move into capsules. What stays at the top level is harness: the demo shell app and router, the runners' configs and support code, and the cross-cutting invariant suites that have no single subject.
- **Discovery by suffix.** Tools find artifacts by `*.test.ts`, `*.test-d.ts`, `*.story.vue`, `*.tile.vue` and `*.visual.ts`.
- **Dist purity.** The library build ships only what the entry map reaches, so nothing with those suffixes enters `dist`.
- **Global code.** A composable used by one capsule lives in it. One used by two or more capsules gets its own capsule (with its own tests and story) at their nearest common ancestor, and that capsule is the edict's `composables/`.
- **Deletion is total.** Deleting a capsule deletes every artifact of its subject.

**Center:** the subject's lifecycle. **Optimizes:**

- the scatter defect (L14-07: motion's 34 tests sit in 11 dirs, dialog's 18 in 8, `_shared`'s 17 in 11)
- relocation, which becomes one `git mv`
- orphans: deleted subjects leave no tests or stories behind (the tombstone tests in L14-07)
- the edict's "ALL file directories", read literally

**Tree sketch.**

```
src/components/sheet/
  SheetContent.vue index.ts motion.ts sheet.css README.md
  detents/  use.ts projection.ts detents.test.ts
  sheet.test.ts           ← tests/components/sheet/*.test.ts (6 files)
  sheet.story.vue         ← demo/stories/containers/sheet.vue
  sheet.visual.ts         ← tests-visual/{sheet-inset,sheet-radius,config-in-sheet}.spec.ts
src/components/button/
  Button.vue index.ts button.css Button.test.ts
  button.story.vue button.tile.vue     ← demo/stories/display/buttons{,.tile}.vue
  button.visual.ts                     ← tests-visual/button-glass.spec.ts
src/components/dock/
  GlassDock.vue index.ts dock.css tokens.css README.md dock.test.ts dock.story.vue dock.visual.ts
  morph/    useDockMorph.ts dockMorphMeasure.ts morph.css morph.test.ts morph.visual.ts
  layers/   DockLayer.vue DockLayerGroup.vue … layers.story.vue layers.test.ts
  search/   useDockSearch.ts search.css search.story.vue
    engine/ match.ts types.ts useFuzzySearch.ts engine.test.ts     ← src/composables/search + tests/composables/search
  cta/ luminance/ controls/ crossfade/ run/ state/ scroll/ shell/  (each with its tests, stories, visual specs)
  stage/    DockStage.vue                ← demo/stories/dock/_frame/ (story frame, capsule-private)
src/composables/motion/spring/  useSpring.ts … spring.test.ts spring.story.vue
src/styles/glass/material/      material.css material.visual.ts
demo/          shell only: main.ts router.ts (routes = glob src/**/*.story.vue plus category metadata) shell/ chassis/
tests/         invariants/ (token hygiene, comment ratio, public surface, boot graph)  _support/
tests-visual/  playwright.config.ts _support/ invariants/ (the pixel floors)
scripts/<tool>/  tool.mjs tool.test.mjs README.md      scripts/lib/ only for code shared by ≥2 tools
```

**Enforcement.** A capsule gate with three clauses:

1. Every suffixed artifact sits in the capsule of its subject: the capsule its imports and its route resolve into.
2. No capsule-private file is imported from outside the capsule except through its `index.ts`.
3. Dist purity: `npm pack` contains no suffixed artifact and no story-only dependency.

Born RED at HEAD: 249 test files, 167 visual specs and 110 story SFCs sit outside capsules. The cross-cutting ones are subtracted in pass 1.

**Migration cost.**

- **Moves:** about 526 artifacts, plus the colocation floor (about 100 files).
- **Specifiers:**
  - the 430 test → `src` specifiers become short relative paths
  - about 300 story `@glass/` specifiers become relative paths
  - visual specs are route-driven, so their route literals move to the scene resolver (which L14-04 asks for anyway)
- **Config:**
  - vitest `include`
  - Playwright `testDir` and `testMatch`, which also fixes the WebKit routing (L14-02)
  - the demo glob changes from `./*/*.vue` to `src/**/*.story.vue`
  - the tsconfig includes and the build excludes
- **Export map:** 0 keys change.

**Consumer impact.** None, provided dist purity holds.

**Known risks.**
1. **Stories depend on the demo chassis.** 96 of 110 stories import `demo/chassis` (`StoryPage.vue` 87, `StorySection.vue` 73, `ShowcaseFrame.vue` 27). A story inside `src/` that imports `demo/chassis` is a `src → demo` edge. This needs a rule: an alias the library build cannot see, or the chassis as its own stage package.
2. **Visual specs are route-driven, not import-driven.** Assigning them to capsules needs a route → story → capsule map.
3. **Dist purity without exclusion lists.** Purity must hold without adding exclusion lists (E-2 masking). Declaration emit over `src/**` could pick up `.story.vue` files.
4. **Capsule size.** A capsule adds 5-10 files per unit, so the long-dir bound bites sooner and forces nesting.
5. **Runner environments.** Environments differ per suffix (DOM emulation vs a real browser), and two vitest files launch Chromium today (L14-07).
6. **Shared sub-rule.** The global rule shares D1-A's nearest-common-ancestor sub-rule. D1-F's own mechanism is the capsule boundary, so this is a cross-pollination point, not a merge.

**Pass-1 research questions:** see §7, D1-F.

---

## 5 · Formulations considered and not minted

| formulation | why it is not a family |
|---|---|
| Naming law: flat dirs with dotted stems (`dock.morph.use.ts`, `dock.morph.css`) | It fails "recursively for nested components", because directories are what the owner asked for. It renames the long-dir problem instead of breaking it into modules. |
| The BJ STRUCTURE-ZONES target tree (`BJ/addenda/2026-07-24-refinement/STRUCTURE-ZONES.md` §1) | A single point design: a flattened `_shared`, one admissible `composables/` in dock, and contracts promoted to `_shared`. It is closest to D1-A's output with D1-D's promotions. Pass 1 uses it as prior art. It is not a mechanism. |
| Status quo plus a gate | Its own history is the counterexample: #62 rode BJ and BK with its G-COLOCATED seat bound to `none` (`SEAT-BINDING.json:129-133`) while the tree moved away from the settlement. |
| BI's "`composables/` survives whole as the published-hooks grouping" | Its premise, that subpaths bind placement, is false at HEAD (§2.1). Keeping one published module whole is a per-module answer inside any family, not a family of its own. |
| One npm package per component | This is D1-C at 56 packages: a granularity setting of D1-C. |

## 6 · Questions every family answers in pass 1

1. **Tests:** beside source, inside the unit, mirrored, or in a package `test/` dir (L13-11, L14-07). Each family proposes one. Pass 1 measures the cost and names the defect classes each choice removes.
2. **CSS ownership in mixed registers:** the class-emission graph over the MIXED stylesheets (L13 §B rows 2, 4, 14, 15, 23, 24, 26-28, 30, 73-75, 77). Which blocks are irreducibly global?
3. **Tokens:** about 100 component-named declarations (dock 35, constellation 18, configurator 14, blob 11, slider 7, table 5, card 3, chip 2, timeline 1, pager 1, select 1) and their dark arms. Do they go to a component `tokens.css`, or stay central?
4. **One CSS channel:** the `@import` from `index.css`, or the SFC `<style src>` (L12-05).
5. **Skeletons:** none exist (`design-idioms.md:226` prescribes `<dir>/skeleton/`). Where would the first one go?
6. **The bounds:** how many direct files per dir (10? 12?), and is 500 lines per file right? Do the bounds apply to demo, tests and scripts too?
7. **The demo:** does it consume doors (the published surface) or internals?
8. **M02:** which inversion dissolves the dock ↔ overlay participation knot? A neutral injection key at the LCA is the candidate. Every family needs this answer.

## 7 · Approach-family registry

| id | family | mechanism | center | tests | global rule | API boundary | enforcement | state |
|---|---|---|---|---|---|---|---|---|
| D1-A | Graph-derived home | home(f) = LCA of importers, placed in that dir's kind slot; anchors pinned to doors; long dirs carved by graph clusters | the placement function | mirrored at mirror(home) | measured (LCA at the zone root) | authored entry list | placement gate recomputes home(f) | OPEN |
| D1-B | Sealed family modules | every dir with `index.ts` is a module; outside importers may resolve only to its door; families declared by domain | the encapsulation boundary | inside the module | declared (family or kernel ruling) | recursive doors | door gate plus door-level acyclicity | OPEN |
| D1-C | Workspace packages | private npm workspace packages with `exports` and TS project references; a published aggregate | module resolution (substrate) | a `test/` dir per package | declared package dependencies | `package.json` `exports` | resolver plus TS references plus declared-dependency check | OPEN |
| D1-D | Declared strata | fixed ranked strata (foundation → primitives → substrate → patterns → components → compositions); imports go down only; a charter holds the reasons | acyclic direction | mirrored per stratum | declared (charter row) | per-unit door plus rank | rank gate plus charter check | OPEN |
| D1-E | Unit manifests | a typed `unit.ts` holds only non-derivable facts (entry, visibility, rung, scope); generators derive the exports map, CSS order, routes and globs | declaration as the source of record | a `tests/` slot claimed by the unit | declared, checked against measured consumers | generated | fail-closed generator plus drift check | OPEN |
| D1-F | Lifecycle capsules | the unit holds every artifact kind (source, styles, tokens, tests, stories, visual specs); discovery by suffix; the top-level zones dissolve into harnesses | the subject's lifecycle | inside the capsule | nearest common capsule | capsule door | capsule gate plus dist purity | OPEN |

### Pass-1 research questions, by family

**D1-A: graph-derived home**
1. Compute home(f) for every file in `src`, `demo` and `scripts` at HEAD, once with value edges and once with value plus type edges. List and count the mismatches.
2. Replay the last 200 `src` commits: how often would home() have moved a file? This measures churn.
3. Place every file at its home, then list the value SCCs that remain on the graph. Name the inversion each one needs. M02 is expected to survive (`dockContext` is public).
4. Build the CSS ownership graph (class emitters, custom-property consumers). Which blocks have no stable home, such as co-selectors like `.glass-dock .dock-icon-button`?
5. Run the connected-components carve on `dock/`, `aurora/`, `menu/`, `sortable-list/` and `styles/glass/`. Do the clusters match the features L12-06 names, and who names them?
6. Fix the anchor set, then count the published symbols with 0 readers that the rule would pin. That count is the E-7 reopening.

**D1-B: sealed family modules**
1. Derive the family partition two ways: community detection on the component graph, and a domain reading of L13's declared families. List every disagreement.
2. Count the symbols reached past each module's door at HEAD. That is the door-growth bill.
3. Seal `overlay` in a scratch copy and measure gzip per subpath before and after with `profile-bundle`, plus tree-shaking.
4. After sealing, compute the door-level SCCs. Which ones need an inversion?
5. Can the demo compile against doors only, through an alias generated from `libraryEntryMap()`? Count the demo imports that need privates.
6. Read the prior art: Nx `enforce-module-boundaries`, `eslint-plugin-boundaries`, dependency-cruiser no-deep-import, Go `internal/`, and Angular `public_api`.

**D1-C: workspace packages**
1. Carve `overlay` (or `dock`) as a private workspace package in a scratch copy. Run dev, vitest, vue-tsc and the library build, and record every failure and the build-time delta.
2. Can the aggregate reproduce `regen-exports` exactly (68 keys, 62 `typesVersions`) and the same `dist` file set?
3. Does a CSS `@import` across package specifiers keep the `@layer` order, the rung ladder and the style-fold copy?
4. Find minimum-cut graph partitions at 8, 12 and 16 packages. Count the cross-package edges and check that each partition is acyclic.
5. Check peer and hoisting behaviour with vue and reka-ui, and the interaction with sibling consumers' `file:` links.
6. Count the new config files and lines, against the machinery they delete (`subpath-policy.mjs` and the `@glass` alias declared 4 times).

**D1-D: declared strata**
1. Compute a longest-path layering of the value graph. List the sideways and upward edges, and the minimal promotion set that makes the graph rank-consistent.
2. Enumerate the component/composition split and measure its stability over the last six months of history.
3. Draft the charter for primitives, substrate and patterns. How many rows have fewer than two consumers and would go back to an owner?
4. Cost D′ (a rank table over today's dirs) against D (renamed strata) in files moved and specifiers rewritten.
5. Can the style-fold emit `dist/styles/*` unchanged from a `foundation/` source?
6. Read the prior art: Feature-Sliced Design (layers, slices, segments, public API), Atomic Design, the Clean Architecture dependency rule, and ArchUnit-style layer checks.

**D1-E: unit manifests**
1. For each candidate manifest field (entry name, visibility, rung, scope), show that code cannot derive it. Drop every field it can.
2. Generate the exports map from manifests in scratch and diff it against `package.json`.
3. Generate the component band of `index.css` and the demo route rows, then diff against HEAD. List every order dependency the generation has to keep, including the UNLAYERED rules.
4. Read BI DP-D's rejection of manifest machinery and check whether its reasons still hold at HEAD.
5. Count lines of machinery added against lines of hand-kept lists deleted (`subpath-policy.mjs`, `regen-exports.mjs`, the `index.css` band, the `manifest.ts` rows).
6. Read the prior art: Bazel BUILD `visibility`, Nx `project.json` tags, and Storybook CSF indexers.

**D1-F: lifecycle capsules**
1. Assign every test, visual spec and story at HEAD to a capsule (by imports for tests, by route → story → component for visual specs). Count single-capsule against cross-cutting.
2. Prototype the button capsule in scratch with its story, test and visual spec inside. Confirm that the build, declaration emit and `npm pack` exclude them with no new exclusion list.
3. Map the story → `demo/chassis` edges (96 stories). Design the rule that keeps `src` from depending on `demo`.
4. Generate the router from `src/**/*.story.vue` plus category metadata. Keep the 80 routes, or map them in `resolveScene`.
5. Measure vitest and Playwright discovery and CI time with suffix globs, including the two vitest files that launch Chromium.
6. Read the prior art: Angular spec-beside, Storybook CSF colocation, Go `_test.go`, and Rust's unit vs integration test split.
