# D1 · pass 2 · D1-G research: eponymous closures

| field | value |
|---|---|
| seat | D1-G RESEARCH, pass 2 (G's first full pass). Answers REGISTRY §5 counterexamples 1-4 first, then §6.3 G questions 1-8, with measurements at HEAD |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `519b0f27`. `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines, so this measures the same code as pass 1 |
| inputs read | REGISTRY §3.1, §5, §6.3 (G); RULINGS R-1..R-10; CHARTER (last four paragraphs); L12 (L12-06 and its table); L13 (L13-02, §A OWNED rows); D1-A §3 and §6 (for A's churn method and lexical carve, the comparison baseline); A's `out/q5-lexical.txt` |
| instruments | scratch scripts under `scratchpad/D1/p2/G-research/` (986 lines), run against a fresh worktree of HEAD. Sibling repos read with `find`/`readFileSync` only; nothing built or run there |
| fences | no source edit, no git write except worktree add/remove, no build. The worktree is removed |

---

## 0 · In brief

| # | counterexample / question | verdict | the number that decides it |
|---|---|---|---|
| CE1 | aurora's backends share a dominator | **ANSWERED** | `runtime.ts`'s subtree is 23 files with both backends, as A found. One level down, `glSetup.ts` heads 12 files, all WebGL, and `wgpuSetup.ts` heads 6, all WebGPU. 20 of 21 backend-specific files are in their backend's subtree. The one outside, `uniformBridge.ts`, is imported by the WebGPU bridge too. The result is the same in all four edge arms |
| CE2 | peer sets | **CONCEDED, with a named hand-off** | after nesting, 19 G dirs are over 12. None splits by dominance: they are peers, the shared set, or declared entries. G also has no root for 5 compound families (accordion, alert, avatar, table, skeleton): their SFCs flatten into `src/` |
| CE3 | roots not named for their dir | **ANSWERED in glass-ui, CONCEDED on layered backends** | glass-ui: 3 roots must be renamed or the authored name is lost, and 10 sit beside their eponymous dir (the `foo.rs` + `foo/` form). value.js: 0 of 5 module dirs hold an eponymous root, and two `routes/index.ts` roots merge into one 39-file `routes` dir |
| CE4 | composition roots | **ANSWERED for registrars, CONCEDED for DI containers** | a wiring file is a file with ≥ 3 registration edges (defined in §8). It flags `app.ts` plus 2 route indexes in value.js, `index.ts` plus 2 route indexes in speedtest, and 0 files in glass-ui `src/` or `demo/`. `inject-services.ts` still dominates 7 repositories across 4 modules, because injection leaves no import edge |
| CE5 | churn | measured: **worse than A** | 29 of 200 commits (14.5%) change a G dir, against A's 18 (9%). At unit grain it is 19 commits (9.5%). 10 files flip-flop, against A's 4 |
| CE6 | CSS under its aggregator | **CONCEDED to F-4** | 44 of 54 component sheets are held only by CSS aggregators. With class-emission edges, 18 of them land in their own component. For the other 26, G needs the SFC to import its own sheet |
| Q1 | features and authored dirs vs A's lexical carve | complementary, not "no better" | on the same 15 rows, A's lexical carve groups 7. G separates 5 and colocates 3 under a named root. G wins on engines and backends (aurora 2/2, sortable, detents) and loses on token-named dock and menu features (dock: 1 separated + 2 colocated vs A's 5; menu 0 vs 2). The union covers 12 of 15 |
| Q5 | shared set vs L13's 32 OWNED | R-2 as ruled matters | door-not-reader: G colocates 15 of 32, every one into the component L13 names: 15 of L13's 16 component-owned files and 0 of its 16 family-owned. Door-counts-as-reader: 8 |
| new | R-2 hazard | found | with door edges weak, 12 door-published component files that carry their own dir's name are pulled into their single consumer. Examples: `Dialog.vue` → command; `Table*` and `Skeleton.vue` → data-table; `Surface.vue` → card |

**Convergence estimate.** G standalone: **30%**. As a rule below declared units (the D′ + G pairing REGISTRY §6.5 names): **40%**. Section 13 has the reasoning. G has no prototype and no critique yet.

---

## 1 · Instrument

**Graph.** Built with the full TypeScript AST (TS 6.0.3) and `@vue/compiler-sfc` blocks, plus a CSS at-rule scan. It is not F-1, but it covers the S-4 kinds the task names:

- static import and export-from, type-only, `import type()`;
- dynamic `import()` with a literal (1 non-literal is counted and left unresolved);
- `import.meta.glob` (expanded), `new URL(lit, import.meta.url)`, `require`, `vi.mock`;
- `<style src>`, `@import` (including inside `<style>`), `@reference` (0 at HEAD), `url()`;
- `@source` (recorded, not resolved);
- path literals that name a repo file (recorded, excluded from dominance).

Resolution covers relative paths, `.js`→`.ts`, the `@glass/*` alias, the package self-name through the entry map, and `/`-rooted Vite paths.

HEAD: 1,267 code files and 3,309 edges:

| kind | edges |
|---|---:|
| import | 2,175 |
| path | 386 |
| type | 440 |
| css-import | 122 |
| glob | 98 |
| dyn | 46 |
| style-src | 17 |
| mock | 15 |
| url | 6 |
| css-url | 4 |

152 are unresolved:

| kind | unresolved | what they are |
|---|---:|---|
| `new URL` | 109 | directory URLs |
| path | 33 | literals naming `dist/` |
| `@source` | 5 | |
| font `url()` | 4 | |
| non-literal `import()` | 1 | |

**Entry sets per zone.**

| zone | entries |
|---|---|
| src | the 63 entries from `libraryEntryMap`, the 3 CSS entries (`styles/index.css`, `fonts.css`, `theme.css`) and `html-attributes.d.ts`: 67 |
| demo | `main.ts`, the demo-dist config, and the route targets of the manifest globs and `router.ts`: 99 |
| tests | every vitest root (`*.test`, `*.spec`, `*.test-d`), fixtures, ambient `.d.ts` and `setup.ts`: 252 |
| tests-visual | the specs, the Playwright config and the `.mjs` CLIs: 171 |
| scripts | top-level CLIs, plus files a root config imports: 13 |

**Edge arms.** A super-root ⊤ reaches every entry, and dominators are computed with Cooper-Harvey-Kennedy.

| arm | what it is |
|---|---|
| VT | file-level value and type edges; doors strong |
| V | value edges only |
| **RVT** (primary) | the reader graph. Edges resolve **by symbol through re-exports**. Pure non-entry barrels become transparent: 17 of the 75 barrels, all unreached as readers. **Door edges are weak (R-2)**: a door keeps an edge only to a file with no other reachable reader. Door-to-door edges stay unresolved |
| RSVT | the reader graph with strong doors, which is R-2's other arm |
| X | one cross-zone graph over every zone's entries |

**G's placement, as run.**

- **Roots**: every SFC, every entry, and every file that is the immediate dominator of ≥ 2 files (`rootMin` 2; 1 and 3 are measured as variants).
- **Owner** of a file: its nearest root ancestor in the dominator tree. A file whose chain reaches ⊤ without meeting a root is **shared**.
- **Dirs**:
  - an `index.*` entry names its own dir;
  - any other entry stays where it is declared and holds its closure in a sibling dir named for it;
  - a non-entry root with a closure heads a dir named `rootName(file)`, nested in its owner's dir. `rootName` is the stem in kebab case, with a `use` prefix dropped and `index` read as its dir's name. The dir collapses into its owner's dir when the names are equal.

---

## 2 · Counterexamples 1-4

### CE1 · Aurora's renderer backends: ANSWERED

`aurora.mjs`, every arm:

```
RVT: runtime subtree 23; glSetup subtree 12 (webgl 12/12), wgpuSetup subtree 6 (webgpu 6/6); backend-specific aurora files 21, outside both subtrees: uniformBridge.ts→runtime.ts
RV : runtime subtree 24; glSetup 12 (12/12), wgpuSetup 6 (6/6); outside: uniformBridge.ts
VT : runtime subtree 23; glSetup 12 (12/12), wgpuSetup 6 (6/6); outside: uniformBridge.ts
V  : runtime subtree 24; glSetup 12 (12/12), wgpuSetup 6 (6/6); outside: uniformBridge.ts
```

A's "24-file runtime subtree mixing both backends" is `runtime.ts`'s subtree read as one cluster. G recurses: `runtime.ts` → {`glSetup.ts` → `aurora.frag.ts` → `mediums.glsl.ts` → …, `wgpuSetup.ts` → `aurora.wgsl.ts` → …}.

`uniformBridge.ts` is the one backend-named file outside both subtrees. It is not WebGL-only: `uniformBridgeWGPU.ts:import` and `uniformBridgeWGPUImage.ts:type` read it. The graph shows L12-06's WebGL list is wrong on that row. The same holds for `textureUpload.ts`, whose readers are `wgpuSetup.ts` and `auroraImageSource.ts`. The two cross-owned flow shaders (`composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts`) land in their backend's subtree.

Proposed shape:

```
aurora/runtime/gl-setup/…
aurora/runtime/wgpu-setup/…
```

Blob gets the same split: `metaball-renderer/wgpu-setup` and `metaball-renderer/build-metaball-program`.

### CE2 · Peer sets: CONCEDED, scope measured

After nesting (`bounds.mjs`, RVT), 19 G dirs are over 12 files. At HEAD, 11 non-kind dirs are over 12. None of the 19 splits by dominance:

| G dir | files | why it does not split |
|---|---:|---|
| `tests-visual` | 171 | declared entries; no import subject |
| `⊤src` | 69 | the shared set: no dominator by definition |
| `src/styles` | 50 | the `./styles` entry dominates the component sheets it `@import`s (CE6) |
| `tests/components` | 43 | declared entries |
| `src/styles/glass` | 29 | 28 registers under `glass.css`, all leaves |
| `tests/styles` | 28 | declared entries |
| `⊤demo` | 24 | demo's shared set (chassis) |
| `src/styles/tokens` | 21 | peers under `tokens.css` |
| `tests/demo`, `tests/components/custom/{dock,aurora}`, `tests/composables` | 17, 16, 14, 14 | declared entries |
| `(unreached)src` | 15 | 11 pure barrels, 2 dead barrels, `useScrollScene.ts`, `springProjection.ts` |
| `src` | 14 | compound families with no subpath door, flattened (below) |
| `src/components/menu` | 14 | 13 SFC peers under the door |
| `src/components/data-table` | 14 | the table family and `Skeleton.vue` pulled in (§7) |
| `src/components/aurora` | 13 | aurora's non-runtime leaves |
| `demo/stories/{foundations,containers}` | 13, 13 | route SFCs, declared by the manifest glob `./*/*.vue`; the category is part of the glob key |

**Compound families have no dominator.** A reka-style family is composed in the consumer's template, so no family member imports another.

- **menu**: the 13 SFCs are peers. G recovers 0 of L12-06's 3 menu features, where A's lexical carve got 2.
- **accordion, avatar, skeleton, table**: each `index.ts` is a pure barrel, and none has a subpath door. **alert**'s `index.ts` holds only a variant recipe. G owns their SFCs by `src/index.ts` and flattens them into `src/`: 12 files, and the dirs `accordion/`, `alert/`, `avatar/`, `skeleton/`, `table/` dissolve.

**The hand-off, per peer set.**

| peer set | what places it |
|---|---|
| compound families | a declared unit: B's door, or D′'s charter row |
| `styles/glass` | 28 → 23 after emission edges move 5 registers to their components (CE6). Still over the bound, so R-5 and authored sub-dirs (L13-10: material / controls / motion-recipe) |
| `styles/tokens` | R-5 |
| `tests-visual` | R-3 moves 9 specs, or 11 with one-dir-no-root (§10); the rest are harness under R-5 |
| story category dirs | the manifest (R-10); R-5 would have to change the IA or the glob |
| `⊤src` | F-7 / R-4 (`src/composables/`). G is silent on the grouping inside it (§3) |

G states its limit here, as the charter says it would.

### CE3 · Roots not named for their dir: ANSWERED in glass-ui, CONCEDED on layered backends

**`sheet/detents/use.ts`.** `SheetContent.vue` is the only reader of `use.ts`, which is the only reader of `projection.ts`. With `rootMin` 2, `use.ts` (1 child) is not a root: both files go into `SheetContent.vue`'s group, which becomes the dir `sheet/sheet-content/`. With `rootMin` 1 they become `sheet/sheet-content/use/`, a generic name. `detents/` survives only if `use.ts` is renamed `useDetents.ts` and roots with any private closure count. Answer: **rename the root**. Keyframes R2 made case-insensitive cannot keep a name no file carries.

**`fourier-field/renderer/`.** `wgpu.ts` heads {`uniforms.ts`, `shaders/compute.wgsl.ts`, `shaders/render.wgsl.ts`}. `mint.ts` is read by `FourierField.vue` and moves up. G creates `fourier-field/wgpu/` and dissolves both `renderer/` and the `shaders/` kind dir. Renaming `wgpu.ts` → `renderer.ts` keeps `renderer/`, now with its shaders in it. `mint.ts` leaves either way.

**`styles/tokens/`.** `tokens.css` sits beside `tokens/` and dominates 19 of its 20 files. It is sibling-eponymous, the Rust 2018 `foo.rs` + `foo/` form. G keeps the dir (Jaccard 0.95).

**Census** (`eponymy.mjs`, §4): of 90 non-door roots with a private closure,

| outcome | roots |
|---|---:|
| already head an eponymous dir | 29 |
| sit beside or below the dir that holds their closure, name equal | 10 |
| must be renamed or lose an authored name | 3 (`useDockSearch.ts` heads `search/`, `SheetContent.vue` heads `detents/`, `AuroraConfigDock.vue` heads `aurora/config/`) |
| collapse into an eponymous parent | 8 |
| need a new dir | 40 |

**Where the naming law breaks:**

- **Names repeat an ancestor segment** in 5 G dirs, because normalisation strips `.frag` and `.wgsl`:
  - `aurora/runtime/gl-setup/aurora`
  - `aurora/runtime/wgpu-setup/aurora`
  - `typewriter/typewriter-text/typewriter`
  - `command/command-dialog/command`
  - `demo/main/demo`
- **value.js `api/src/modules/*` (read-only).** 0 of 5 module dirs (palette, admin, session, color, meta) hold an eponymous root. Their files are role-named (`model.ts`, `schema.ts`, `routes/`, `service/`, `repository/`). Without the registrar rule of CE4, the `palette/routes/index.ts` and `admin/routes/index.ts` roots are both named `routes` and merge into one `routes` dir of 39 files. On a layered backend, module identity is the directory, and no file carries it. **CONCEDED**: there G needs a declared unit.

### CE4 · Composition roots: ANSWERED for registrars, CONCEDED for DI containers

Both definitions were tested read-only on value.js `api/src` (entry `main.ts`) and speedtest `server/src` (entry `index.ts`), and on glass-ui `src`/`demo` for false positives.

**Trunk rule** (a non-entry file dominating ≥ 50% of its zone, with ≥ 2 root children):

- value.js: flags only `app.ts`, which dominates 59 of 84 reached files.
- speedtest: flags nothing. The composition root there is the entry itself: its 28 leaves (`routes/*.ts`, `utils/*`, `config`, `db`, …) flatten into `src/`, dissolving `routes/`, `utils/`, `trie/`, `logging/`, `cache/` and `events/`.

The trunk rule is too weak.

**Registrar rule** (§8), with k ≥ 3:

| repo | files flagged | registration edges | registered-only targets |
|---|---|---:|---:|
| value.js | `app.ts`, `modules/admin/routes/index.ts`, `modules/palette/routes/index.ts` | 24 | 21 |
| speedtest | `index.ts`, `routes/admin/index.ts`, `routes/dashboard/index.ts` | 22 | 18 |
| glass-ui `src` | none | | |
| glass-ui `demo` | none | | |

- **value.js**: the registered-only targets become declared units at their authored places (`modules/admin/routes` 9, `modules/palette/routes` 6, `modules/color/routes` 3). The shared set is 27.
- **speedtest**: `routes/admin` 7, `routes/dashboard` 5, `routes` 6. The shared set is 22.
- **glass-ui**: at k = 1 there are 20 edges in `src` and 5 in `demo`. They are mostly shader sources passed to `compile()` and constants passed as arguments, and would wrongly un-nest aurora's shaders. The k ≥ 3 threshold excludes all of them.

**DI containers are not caught.** value.js `platform/http/inject-services.ts` still dominates 7 repositories across 4 modules plus `collections.ts`. Services reach repositories through the injected context, not through an import, so the graph cannot see the reader (S-5). Placing those files needs a declared fact.

**glass-ui's own composition chain.** `demo/main.ts` → `App.vue` → `AppShell.vue` nests the shell as `demo/main/app/app-shell/`. `App.vue`'s entire closure is `AppShell.vue`'s subtree. A chain-compression rule would remove that level; it is proposed, not run (§14). In `src`, 23 doors have a closure that is exactly one root: 18 collapse by eponymy, and 5 add a level (`typewriter-text`, `easing-picker`, `segmented-tabs`, `sheet-content`, `hand-mark`).

---

## 3 · Q1 · Dominator trees per zone, dir verdicts, and the L12-06 score

**Per zone (RVT):**

| zone | files | reached | roots (SFC / entry / idom≥2) | roots with a closure | G dirs | shared |
|---|---:|---:|---|---:|---:|---:|
| src | 628 | 613 | 244 (147 / 67 / 30) | 129 | 105 | 70 |
| demo | 184 | 179 | 139 (135 / 99 / 2) | 18 | 33 | 26 |
| tests | 256 | 256 | 252 entries | 1 | 59 | 3 |
| tests-visual | 174 | 174 | 171 entries | 0 | 2 | 3 |
| scripts | 16 | 13 | 13 entries | 0 | 2 | 0 |

- **Unreached in src (15)**: 11 pure barrels and 2 dead ones (`components/index.ts`, `_shared/index.ts`), plus `useScrollScene.ts` and `springProjection.ts`.
- **Cross-zone arm**: `useScrollScene.ts` is dominated by `demo/stories/motion/scroll.vue`, which agrees with L12-12.
- **Variants**:

| rootMin | src G dirs |
|---:|---:|
| 1 | 125 |
| 2 | 105 |
| 3 | 95 |

  HEAD has 116 src code dirs, max depth 5. G's max depth is 7.

**src authored dirs versus G** (exact path, then content Jaccard ≥ 0.5; `q1.mjs`): of 116 authored dirs,

| outcome | dirs |
|---|---:|
| kept at the same path | 66 |
| content kept under another name | 8 |
| dissolved | 42 (16 of them kind slots) |
| new G paths | 31 |

Content kept, renamed (the 10 Jaccard matches; `easing` and `handmark` also keep a G dir at their own path, holding the door, so the path tally counts them as kept):

| authored | G |
|---|---|
| `blob/shaders` | `metaball-renderer/build-metaball-program/metaball` |
| `easing` | `easing/easing-picker` |
| `fourier-field/shaders` | `fourier-field/wgpu` |
| `handmark` | `handmark/hand-mark` |
| `sheet/detents` | `sheet/sheet-content` |
| `toast` | `toast/toaster` |
| `typewriter/utils` | `…/typewriter-text/typewriter` |
| `composables/glass/webgpu` | `⊤/gpu-substrate` |
| `composables/motion/route` | `motion/core/route-transition` |
| `composables/search` | `dock/dock-search` |

Dissolved, non-kind (26):
- 19 are shared-zone dirs, whose files are shared, so G proposes no grouping:
  - `_shared/{disclosure,feedback,field,menu,overlay,surface}`
  - `composables/{context,glass,glass/canvas2d,glass/procedural,glass/webgl}`
  - `composables/motion/{dissolve,engage,morph,number,pointer,reveal,scroll,spring}`
- 5 are the no-door compound families.
- 1 is `fourier-field/renderer`.
- 1 is the dead `src/components`.

New dirs G creates, besides the aurora and blob backends above:

- `sortable-list/sortable/` and `sortable/drag/`
- `dock/glass-dock/` and `glass-dock/glass-backdrop-luminance/` (the backdrop trio plus `useRAFLoop` and `useYieldToMain`)
- `dock/dock-search/` (the hook, the search engine and `useScrollChrome`)
- `dock/dock-layer-group/`, `dock/dock-trigger/`, `dock/dock-background-toggle/`
- `tabs/segmented-tabs/`, `typewriter/typewriter-text/`, `command/command-dialog/`, `deck/deck-stage/`, `carousel/carousel-content/`, `select/select-content/`, `styles/accessibility/`

**demo**: of 38 authored dirs, 16 are kept at the same path, and 5 are kept under another name. The 16 are the 11 story categories, `substrates/aurora`, `substrates/fourier-field`, `chassis/landing`, the `demo` root, and `shell`, which now holds only `NotFound.vue`. 17 dissolve. The dissolved ones are the chassis and shell sub-dirs, whose files are shared by many stories and go to `⊤demo`. `demo/shell` survives as `AppShell.vue`'s closure (Jaccard 0.73), renamed and nested (CE4).

**The 15-row score against A's lexical carve** (`features.mjs`, RVT; the SEPARATED/COLOCATED/SPLIT rule is in the script):

| feature / dir | G (RVT) | A lexical |
|---|---|---|
| dock · crossfade | SPLIT: `DockCrossfade.vue` sits under `DockLayerGroup.vue`; the context is read by 3 SFCs and goes to the dock door | ✓ |
| dock · switcher/layers | SPLIT: the context is read by `DockLayer` and `DockLayerGroup` and goes to the door | ✓ (group lacks the context) |
| dock · morph | COLOCATED under `GlassDock.vue` (2 of its 12-file subtree) | ✓ |
| dock · run | PLACED under `GlassDock.vue` | ✓ |
| dock · search | **SEPARATED**: the `useDockSearch.ts` subtree, 4 of 5 files (hook, `useFuzzySearch`, `match`, `types`, plus `useScrollChrome`), named `dock-search` | ✓ (hook + css, not the engine) |
| dock · cta | SPLIT: `useDockCtaReceive` has no src reader; two doors make it shared | ✗ |
| dock · controls | SPLIT: `DockControl.vue` sits under `DockBackgroundToggle.vue`; `DockTrigger.vue` is separate | ✗ |
| menu · sub / checkbox / radio | 0 of 3 (peers under the door) | 2 of 3 |
| aurora · WebGL | **SEPARATED** (12/12) | ✗ |
| aurora · WebGPU | **SEPARATED** (6/6) | ✗ |
| sortable · drag engine | **SEPARATED**, 5/5, named `sortable` by `useSortable.ts`, with `drag/` nested | ✗ (A found it by dominators, unnamed) |
| `sheet/detents` | **SEPARATED** as `SheetContent.vue`'s closure, named `sheet-content` | ✗ |
| `fourier-field/renderer` | COLOCATED: `wgpu.ts` heads 2 of the 3 files | ✗ |

A: 7 of 15. G: 5 separated and 3 colocated. The two overlap only on search, morph and run, so the union covers 12 of 15. Neither covers cta, controls or checkbox.

Robustness: aurora and sortable hold in all four arms. Search holds in VT (as `search`, through its barrel). Detents holds only in the reader arms.

**Verdict on the §5 refutation test.** G is not "no better" than A's lexical carve: it recovers the structure A could not, the engines and backends that nobody named with a shared token. It is worse on the dock's token-named features. There, the graph says the feature boundary L12-06 draws is not an ownership boundary: the crossfade and switcher contexts are read by 3 and 2 sibling SFCs. G and the lexical carve fail in different places.

---

## 4 · Q2 · Eponymy census

`eponymy.mjs`, all zones, authored dirs holding code (209):

| zone | dirs | strict eponymous root | door only (`index.*`) | affix only | none | kind slots |
|---|---:|---:|---:|---:|---:|---:|
| src | 115 | 50 | 23 | 12 | 10 | 20 |
| demo | 37 | 2 | 3 | 12 | 20 | 0 |
| tests | 56 | 16 | 0 | 11 | 26 | 3 |
| scripts | 1 | 0 | 0 | 0 | 1 | 0 |
| **all** | **209** | **68** | **26** | **35** | **57** | **23** |

Normalisation: case-insensitive, kebab ↔ Pascal, `use` prefix dropped. `HandMark.vue` against `handmark/` fails on the hyphen; a hyphen-insensitive compare would pass it.

The 10 src dirs with no eponymous root: `_shared/field`, `_shared/surface`, `dock/styles/controls`, `fourier-field/renderer`, `sheet/detents`, `composables/glass/procedural`, `composables/glass/webgl`, `styles/theme`, `styles/typography`, `styles/utilities`. Four of them (`theme`, `typography`, `utilities`, `dock/styles/controls`) have an eponymous aggregator beside them.

Roots: §2 CE3 has the breakdown (29 / 10 / 3 / 8 / 40). The files that would need a new dir are the 40. The ones that must be renamed to keep an authored name are 3.

---

## 5 · Q3 / CE5 · Churn replay

`churn.mjs`: the same 200 src commits A used (`4bf29831..3f9ea884`), with A's per-commit entry approximation (HEAD's entries present at the commit, plus every `components/*/index.ts` and `composables/*/index.ts`, plus the CSS entries). A dir change counts for a file present at both the commit and its parent.

| arm | commits changing a G dir | dir changes | importer-driven | distinct files | flip-flop files | unit-crossing commits | nesting-only commits | changes from an ancestor cascade |
|---|---|---:|---:|---:|---:|---|---:|---:|
| RVT | **29 (14.5%)** | 100 | 50 | 90 | 10 | 19 (9.5%), 46 changes | 17, 54 changes | 36 |
| VT | 21 (10.5%) | 71 | 32 | 62 | 9 | 12 (6.0%), 30 changes | 12, 41 changes | 27 |
| A (door) | 18 (9%) | 34 | 23 | 29 | 4 | — | — | — |

Largest commits (RVT): `490cc46e` 20, `2d804ce6` 13, `bda718ac` 11, `62305f4a` 6, `85089b3b` 5.

Flip-flops (RVT):
- `useTouchGate.ts` and `useTimer.ts` between dock and `dom`;
- `useDockShellProps.ts` between `dock` and `dock/glass-dock`;
- `EasingPicker.vue` and `useClipboard.ts` across the easing nesting;
- `SelectItem.vue` between `select` and `select/select-item`;
- `motion/core/constants.ts`, the same file A flagged;
- `usePagerWorm.ts` and `pager-dots/constants.ts` in and out of `deck/deck-pager/…`;
- `flow.wgsl.ts`.

**Reading.** At unit grain G churns like A: 9.5% against 9%. The extra five points are within-unit nesting. Two things cause it:
- a root gaining or losing a second dominated child flips the `rootMin` threshold;
- a dir path is a chain of root names, so one ancestor change moves every descendant (36 of the 100).

A stabiliser was not tested (§14).

---

## 6 · Q4 · Peer sets over the bound after nesting

Section 2's CE2 table is the answer: 19 G dirs are over 12, against 11 non-kind HEAD dirs. Kind slots over 12 at HEAD are `dock/composables` 13, `dock/styles` 15 and `aurora/composables` 16. **G dissolves all three.**

Every G dir over 12 is a peer set, a shared set or a declared-entry set, so none is split by G. The ones inside `src` that are not tests or shared:

| dir | files | fix |
|---|---:|---|
| `src/styles` | 50 | needs F-4 (CE6) |
| `styles/glass` | 29 | R-5 |
| `styles/tokens` | 21 | R-5 |
| `src` | 14 | needs declared doors for the compound families |
| `menu` | 14 | compound family |
| `data-table` | 14 | the R-2 hazard in §7 |
| `aurora` | 13 | the door, `Aurora.vue`, 10 non-runtime leaves and `useScrollProgress.ts` |

---

## 7 · Q5 · The shared set and L13's 32 OWNED, both R-2 arms

`shared.mjs`:

| arm | shared set (non-entry, owner ⊤) | of L13's 32 OWNED, colocated into a component | into L13's named component | shared |
|---|---|---:|---:|---:|
| **RVT (door not a reader, as ruled)** | 70 (42 composables, 28 components) | **15** | 15 of 15 | 17 |
| RSVT (door counts as a reader) | 95 (55, 40) | 8 | 8 of 8 | 24 |
| VT (file level) | 91 (57, 34) | 8 | 8 of 8 | 24 |

L13's 32 OWNED split into 16 component-owned (dock 8, chip 2, slider 1, constellation 2, aurora 3) and 16 family-owned (PROC 14, pager 1, overlay 1).

- **Component-owned**: under RVT, G colocates 15 of the 16, each into the component L13 names. The miss is `useDockCtaReceive.ts`: it has no src reader and two doors publish it, so it is shared.
- **Family-owned**: none is colocated. R-2 rules declared families out as a placement unit, and G has no family construct, so the 16 stay in the shared set for F-7/R-4. The 19 PROC files L13 lists are 14 shared here plus 5 colocated (`useCanvas2D` and `useRoutePointer` to constellation; `flow.{glsl,wgsl}` and `useScrollProgress` to aurora).

**The R-2 hazard.** Weak door edges plus dominance pull publicly exported component parts into their single in-tree consumer (`moves.mjs`). Under RVT, 98 files change unit into another unit:

| category | files |
|---|---:|
| CSS pulled to a styles aggregator (CE6) | 42 |
| composables colocated into a component (the wanted effect) | 19 |
| component parts moved into another component | 14 |
| flattened into `src/` (no door below the root barrel) | 12 |
| styles partials moving into their eponymous dir | 8 |
| other | 3 |

The 14 component parts:
- `Dialog.vue` → command, and `DialogContent.vue` → `command/command-dialog`;
- `Table*` (7) and `Skeleton.vue` → data-table;
- `Surface.vue` → card;
- `useDockHold.ts` → slider;
- `DropdownMenuTrigger.vue` and `isTeleportedTarget.ts` → dock.

12 of the 14 carry their own dir's name, strictly or by affix. An **eponymy pin** (a door-published file eponymous to its door's dir stays with its door) would keep those 12. It would let the 2 that F-7 would move anyway go. The pin variant was not run.

This hazard is not G's alone. F-7 under R-2 moves the same files once the unit set is derived rather than declared. R-9, which makes `Skeleton` its own unit, already conflicts with it.

---

## 8 · Q6 · A structural definition of a wiring file

- **Registration edge.** An import edge W→X is a registration edge when every value reference in W to the bindings it imports from X is:
  - an argument of a call or `new`, or
  - a value in an object or array literal.

  W hands X on and never calls it, reads a member of it or extends it (`lib/registration.mjs`, TS AST).
- **Wiring file.** A file with ≥ 3 registration edges.
- **In dominance.** Registration edges are weak, like door edges. A target reached only by registration becomes a declared unit at its authored place.

Measured results are in CE4:
- 3 files each in value.js and speedtest;
- 0 in glass-ui `src` and `demo`;
- the k = 1 edges in glass-ui are shader sources and constants, excluded by the threshold.

What it does not catch:
- DI containers, where construction is a call on the imported class: `inject-services.ts`, `wire-services.ts`;
- an entry that is itself the composition root and also imports utilities, such as speedtest `index.ts`'s 22-file shared remainder.

A §15's alternative ("a file importing ≥ k siblings' modules and exporting a composition") was not needed. The registration signature separates `app.ts` from `GlassDock.vue`, which both dominate several independent subtrees; import count alone does not.

---

## 9 · CE6 · CSS under its aggregator: CONCEDED to F-4

`cssem.mjs`. Of 54 component sheets:
- **10** sit under a code dominator (an SFC `<style src>` or a TS import);
- **44** are held only by CSS aggregators.

Under import dominance the 44 move to `src/styles` (42 counted as cross-unit moves in §7). Dock's 17 sheets reach `dock/styles/index.css`, which `src/styles/index.css` imports.

**Class-emission edges.** A sheet's reader is taken to be any code file containing one of the sheet's classes or data-attribute values, counting only tokens unique to that sheet. Of the 44 aggregator-held sheets:

| emitters | sheets | examples |
|---|---:|---|
| dominator inside the sheet's own component | 18 | `morph.css`, `run.css`, `search.css`, `layers.css`, `adaptive-legibility.css` → `GlassDock.vue`; `triggers.css` → `DockTrigger.vue`; `turn.css` → `DeckSlide.vue` |
| no unique-class emitter | 11 | `controls.css`, `shape.css`, `shell.css`, `dock.css` style shared classes |
| spread emitters (the door, ⊤ or another unit) | 15 | |

In the styles zone, 6 of 79 sheets get a single component emitter. They match the audit:

| sheet | component |
|---|---|
| `glass/dissolve.css` | toast |
| `glass/glass-chip.css` | chip |
| `glass/glass-atom.css` | badge |
| `glass/squircle.css` | `ModalOverlay` |
| `glass/surface-axis.css` | `SegmentedTabs` |
| `typography/utilities.css` | `CarouselPager` |

G places CSS correctly only when the SFC imports its own sheet. That is the F-4/R-7 channel collapse. G cannot build it.

---

## 10 · Q7 · Tests and stories under G, given R-3

`subjects.mjs`. A file's subject is the named dominator (src, RVT) of everything the file and its private test-zone closure import from src (import, type, dyn, mock).

**Tests (252 roots):**

| subject | tests | where they go |
|---|---:|---|
| one subject at a door | 84 | `<unit>/__tests__/` |
| one subject at a nested root | 38 | a nested slot such as `dock/glass-dock/__tests__/`. Depth below the unit: 1 → 25, deeper → 3 |
| multi-unit | 40 | harness |
| targets in one authored dir with no G root | 29 | R-3 has a unit (the component dir); G does not |
| no import subject | 61 | whole-library scanners and gates: harness per R-3 |

17 single-subject tests also read src by path literal. R-3 says a scanning suite reads the resolved graph, so those reads need rewriting. 93 single-subject tests already name their subject unit in their current path.

**Answer:** tests follow F's subject law over G's roots, which is R-3 at G's grain. The slot is `__tests__/` at whichever root is the subject. The 29 one-dir-no-root tests are where G and R-3 part: R-3 keeps them with their component dir, and G has no root there.

**Stories (94 route SFCs):** 18 have one subject (a door), 62 are multi-unit and 10 have no src import. Stories stay declared by the manifest (R-10); a subject law does not place them.

**Visual specs (167):**

| literal route count | specs |
|---|---:|
| 0 | 54 |
| 1 | 62 |
| 2 | 16 |
| 3 | 12 |
| 4+ | 23 |

- 9 have one route and one subject root. Under R-3 they move beside it as `*.visual.ts`; 2 more are one-dir-no-root.
- 101 have multi-unit subjects.
- 158 stay in the harness, still one flat dir of peers (CE2).

---

## 11 · Q8 · Prior art

- **Cimitile and Visaggio**, "Software salvaging and the call dominance tree", *JSS* 28 (1995) 117-127. Uses dominance in the call graph as the candidate criterion for reusable modules. G's root rule is the same idea on the import graph.
- **Burd and Munro**, "Evaluating the use of dominance trees for C and COBOL", ICSM 1999. Asks whether dominance candidates improve structure. That is our Q1 question, and they report it as a mixed result, as ours is.
- **Falke, Klein, Koschke and Quante**, "The Dominance Tree in Visualizing Software Dependencies", VISSOFT 2005. Dominance as the nesting structure of a dependency graph.
- **Tzerpos and Holt**, ACDC, WCRE 2000. Clusters with a *subgraph dominator* pattern, with a *support library* pattern (our shared set), a *central dispatcher* pattern (our wiring file, excluded from dominance) and a *directory structure* pattern (our declared units). Files left over go to the subsystem that depends on them most (orphan adoption, like F-7). ACDC reached the same three-way split this report measures.
- **Rollup / rolldown code splitting** colours each module with the set of entries that reach it and groups modules by that set. G's ⊤ set is the modules whose colour has more than one entry and no common named dominator.
- **Rust 2018**: `foo.rs` beside `foo/` replaces `foo/mod.rs`. This is the sibling-eponymous form 10 roots here already use (`glass.css` + `glass/`, `tokens.css` + `tokens/`, `aurora.vue` + `aurora/`).
- In-house, **keyframes R2** (case-sensitive eponymy gate), per REGISTRY §5.

Sources:
- [Cimitile & Visaggio 1995](https://www.sciencedirect.com/science/article/abs/pii/016412129400049S)
- [Burd & Munro 1999](https://www.semanticscholar.org/paper/Evaluating-the-use-of-dominance-trees-for-C-and-Burd-Munro/4c9b3651a77d287a75fc3a03e3b3455dc46f459b)
- [Falke et al. 2005](https://ieeexplore.ieee.org/document/1684311/)
- [ACDC](https://dl.acm.org/doi/10.5555/832307.837118)
- [rolldown code-splitting](https://github.com/rolldown/rolldown/blob/main/internal-docs/code-splitting/implementation.md)
- [Rust 2018 path changes](https://doc.rust-lang.org/edition-guide/rust-2018/path-changes.html)

---

## 12 · What G is, as measured

1. **Below a single-owner root, dominance finds structure people did not name.** It finds the aurora and blob backends, the sortable drag engine, the dock search engine with its scroll chrome, the backdrop-luminance trio, and 15 of L13's 16 component-owned composables. No pass-1 carve found these with names; G names them from roots people wrote.
2. **G cannot declare units that have no dominator.** Three cases:
   - compound families (5 flattened, menu 0 of 3);
   - the shared zone (70 src and 26 demo files, 19 src dirs dissolved with no replacement);
   - layered backend modules (0 of 5 eponymous).

   This is the primitive A lacked: a declared module boundary. G does not lack it inside a single-owner closure; it lacks it everywhere else.
3. **G and the lexical carve fail in different places.** A's lexical carve recovers the token-named dock and menu features; G recovers the engines. On the same 15 rows the union is 12.
4. **G inherits three floor dependencies:**
   - F-4, for CSS (CE6);
   - an eponymy pin, against the R-2 hazard (§7);
   - a naming normalisation (hyphens, suffix repeats, affix collapse).

---

## 13 · Convergence

- **G standalone: 30%.**
  - CE1 is answered decisively, and CE4 is answered for registrars with a definition that has 0 false positives here.
  - CE2 is conceded and CE3 half-conceded, both at the same missing primitive: a declared unit for peers and for layered modules.
  - It churns 14.5% against A's 9%.
  - No prototype, critique or F-9 battery exists.
- **G as the rule below declared units (D′ + G, REGISTRY §6.5): 40%.**
  - Inside a declared unit, the measured failures shrink to three open items: the eponymy pin, the naming normalisation and the churn stabiliser.
  - Everything else G concedes is handed to a declared layer: D′'s charter row, or B's door for compound families.
  - This pairing is not earned in pass 2, because G has no critique yet.

---

## 14 · Open gaps

1. The graph is a scratch builder, not F-1. `@source` is recorded but not resolved. Path-literal detection is a regex over string literals. CSS emission is a text-token heuristic: 11 aggregator-held sheets have no unique-class emitter.
2. The churn entry map is A's approximation, not each commit's own `libraryEntryMap`.
3. Four variants are proposed but not run:
   - **eponymy pin**: a published file eponymous to its door's dir stays (§7; 12 of 14 expected kept);
   - **chain compression**: a root whose whole closure is one root collapses (§2 CE4: `demo/main/app/app-shell`, and 5 src levels);
   - **affix and hyphen-insensitive naming**: 35 affix-only dirs, `handmark`;
   - **a churn stabiliser**: `rootMin` hysteresis, or a dir name chain not built from every ancestor root.
4. DI containers (value.js `inject-services.ts`, speedtest `wire-services.ts`) are not placed by any structural rule found. They need a declared fact.
5. The shared zone's internal grouping (the 19 src dirs under `composables/` and `_shared/`) is outside G. Something else must declare it, or it keeps its authored names unverified.
6. Compound families with no subpath door (accordion, alert, avatar, skeleton, table) need a declared unit. Menu needs one for its sub-features.
7. Q7's 29 one-dir-no-root tests: R-3's unit and G's roots disagree there. Unmeasured beyond the count.
8. R-9 conflicts with R-2 plus F-7 (`Skeleton.vue` → data-table). This is a driver-ruling question.
9. glass-ui's own `scripts/` zone: all 13 files are entries, so G gives it no structure.
10. Not done: prototype, migration, toolchain (build, vue-tsc, tests), π, Playwright, and an independent critic battery (F-9). REGISTRY §6.4 bars the prototype until CE1-4 are answered. CE2 and part of CE3 are conceded, so the prototype would have to run as the below-unit rule under a declared layer.

---

## Appendix · reproduce

```
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/G-research
# a worktree at HEAD must exist at $S/wt (node_modules symlinked) for build/cssem/subjects/reg-glass
cd $S
node build.mjs                  # graph + per-zone dominators, arms VT V RVT RV RSVT X → out/head.json
node q1.mjs src; node q1.mjs demo   # G dir set vs authored dirs (V=1 lists) → out/q1-*.json
node aurora.mjs                 # CE1
node cssem.mjs                  # CE6 (emission) → out/cssem-RVT.json
node features.mjs               # Q1 15-row score, arms RVT RV VT
node eponymy.mjs                # Q2 census (V=1 lists NEEDS-DIR)
ARM=RVT node churn.mjs; ARM=VT node churn.mjs   # Q3 → out/churn-*.json
node bounds.mjs                 # Q4
node shared.mjs; node moves.mjs # Q5 + the R-2 hazard
node backend.mjs /Users/mkbabb/Programming/value.js/api src src/main.ts          # CE4 trunk rule
K=3 node backend2.mjs /Users/mkbabb/Programming/value.js/api src src/main.ts     # CE4 registrar rule
K=3 AT=src/ node backend2.mjs /Users/mkbabb/Programming/speedtest/server src src/index.ts
node reg-glass.mjs              # registrar false positives in glass-ui
node subjects.mjs               # Q7
```
