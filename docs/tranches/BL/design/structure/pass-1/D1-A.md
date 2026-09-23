# D1 · pass 1—D1-A, graph-derived home (the LCA placement law)

| field | value |
|---|---|
| seat | D1 pass-1 research, family D1-A only. Inputs: `PORTFOLIO.md` §0-3, §4 D1-A, §6, §7 (D1-A questions); `pass-1/W.md`, `pass-1/X.md`; `audit/round-1/L12.md`, `L13.md`, `L14.md`. No other family's section was read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `b7099ea6`; measured at `6433284a`. `git diff b7099ea6 6433284a -- src demo tests tests-visual scripts package.json 'vite*' 'tsconfig*'` is empty (docs-only commits) |
| instruments | scratch root `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-A/`. `lib/graph.mjs` (TS-AST typed-edge graph), `lib/home.mjs` (home(f), anchors, slots), `lib/fixpoint.mjs`, `lib/floor.mjs`, `lib/dissolve.mjs`; one script per question (`q1-grid.mjs` … `q6-e7.mjs`); `gate/home-gate.mjs` (the gate sketch); `proto/*.mjs` (plan, codemods); `backend-probe.mjs` (siblings, read-only from git objects). Outputs in `S/out/` |
| prototype | a detached worktree at `6433284a` under `S/wt`, `node_modules` symlinked; removed before return. All build/test output kept in `S/out/proto/` |
| deliverable | answers to the six D1-A questions with commands and outputs; the family's strongest form; a prototype probe; a gate that fails at HEAD; cost; surface; the backend analogue; weaknesses with named counterexamples. No winner-talk |

## 0 · In brief

- **The anchor rule is the family.** The same law over the same graph moves 41 to 91 files (45 to 89 under the edict slot) depending on how a door pins what it re-exports (§2, grid). The charter's literal reading ("a file re-exported by a door stays beside that door") leaves a 6-member value SCC after placement. The reading developed here—a door counts as one importer located at its own directory—is pure, leaves 0 module SCCs, and moves 56 files (value edges) or 58 (value + type).
- **The born-RED set is not the one the charter lists.** Under that reading only 12 of the 33 OWNED composables move; 18 are already home because their door sits in `src/composables`. The charter's "32 OWNED" is approached only by the sfc reading, which pins published SFCs and nothing else: 31 of 33 under the charter slot, 28 under the edict slot. That reading displaces 10 (charter) or 4 (edict: `useRAFLoop`, `useYieldToMain`, `useClipboard`, `useResolveTokenColor`) sibling-consumed module APIs into single components.
- **Prototype: the tree survives the law.** 55 moves + 12 barrel dissolutions in a worktree: `vue-tsc` 0 errors (src and tests), `vite build` green, `regen-exports` EXACT, 68/68 export keys unchanged, 63 doors × 1,277 exported names identical, `glass-ui.css` byte-length identical. Tests: 2,316 of 2,324 pass; the 8 others are 3 environmental (no `dist-demo` in a fresh worktree), 2 load timeouts, 1 skip, and **2 real breaks the import graph cannot see** (a glob-key convention test and a Tailwind `@source` scope). On the way, four more graph-invisible couplings broke and were fixed by hand: two `import.meta.glob` key sites (one silent) and two `vi.mock` strings.
- **P5 goes green by placement.** M02 (7 members) and M03 (2) dissolve once barrels are dissolved: `dockContext` floats to the LCA (the neutral-key move the portfolio asked for, made by relocation), and `ModalOverlay.vue` + `sheet/motion.ts` go to `_shared`. The price is a downward cascade: `dock/constants.ts` leaves the dock for `src/composables/constants.ts`.
- **The graph places files; it does not name or group them.** The connected-components carve returns one giant component per unit (dock 40, aurora 35, sortable-list 11). A lexical carve (shared file-stem tokens) recovers 5 of L12-06's 7 dock features and 2 of menu's 3; neither recovers aurora's two renderer backends or sortable-list's drag engine.
- **Churn is real but small.** Over the last 200 `src` commits, 18 (9%) would have moved a home; 34 home changes over 29 files; `motion/core/constants.ts` oscillated 3 times.
- **CSS:** of 1,121 class-bearing blocks, 707 have one owner, 251 are global, and 4 context co-selectors + 29 list co-registrations have no stable home. 5 whole files have a single component home; 35 are MIXED.
- **E-7 reopening:** 946 public symbols; 447 have 0 `src` readers and 0 sibling import statements; 24 non-SFC files are placed only by their publication.
- **Backends:** the law is hostile to composition roots. On value.js `api/src` (115 `.ts`) it puts 28 files outside their home because `app.ts`, `platform/http/inject-services.ts` and `platform/db/collections.ts` import every module's routes, repositories and models to wire them. Excluding those three leaves 12 outside and 17 orphans. speedtest `server/src` (73) repeats the pattern (28 outside/6 orphans; 19/21).
- **Gate:** `gate/home-gate.mjs` exits 1 at HEAD with 428 violations (P1 113, P2 18, P3 57, P4 198, P5 2, P6 40) in 2.9 s. On the prototype tree it reports 365 with P5 GREEN and P1's law half at 6.

## 1 · Instruments and definitions

**Graph** (`lib/graph.mjs`). TypeScript's parser over every tracked and untracked-not-ignored file in `src demo scripts tests tests-visual` and the 9 root build files: 1,267 files (src 628, demo 184, scripts 16, tests 256, tests-visual 174, root 9), 3,419 edges. Kinds: value 1,808; type 339; value re-export 367; type re-export 96; literal repo paths 516; CSS `@import` 122; `import.meta.glob` 98; dynamic `import()` 56; SFC `<style src>` 17; plus `new URL("./x", import.meta.url)` (1 site in src/demo). `verbatimModuleSyntax` is on, so "type" is syntactic. One precision note: `import { type X } from "m"` is kept as `import {} from "m"` (a module load) under that flag; HEAD has 4 such declarations (src 3, demo 1) against 549 `import type {…}`.

**Resolution.** `@glass/`, `/src/`, relative, `@mkbabb/glass-ui[/sub]` through the authored entry map (`subpath-policy.mjs` `libraryEntryMap`, 63 entries).

**Attribution.** Through pure barrels, per imported name, to the declaring file. A non-door pure barrel is transparent and is dissolved (P1 fails on it).

**home(f).** `unit(d)` strips the kind slots `composables styles constants utils` (the gate adds `shaders`). `home(f) = LCA(unit(dir(importer)))` over f's importers in the same zone (zones: `src`, `demo`, backend = `scripts` + root files). An LCA at a zone root (`src`, `src/components`, `src/composables`, `src/styles`; `demo`, `demo/stories`; `.`) resolves to a shared slot. Two slot policies were measured:
- *charter*: LCA `src/components` → `src/components/_shared/`; LCA `src` → `src/composables/`.
- *edict*: as charter, but any hook (a file exporting `use*`/`v*`) whose LCA is a zone root goes to `src/composables/` (the owner's "only truly module-level or global composables … live in a `composables/` dir").

A hook placed inside a component unit lands in `<home>/composables/`. Placement iterates to a fixpoint on a virtual tree (`lib/fixpoint.mjs`).

**Anchor readings** (how a door holds what it re-exports):
- *hard*—every non-root door pins its whole re-export closure (the charter's literal sentence).
- *owner*—a door pins only members of its own subtree; cross-subtree re-exports count as soft importers.
- *module*—non-component doors pin; component doors pin their SFCs only.
- *sfc*—published SFCs are pinned; everything else is placed by readers, with the door as a fallback when there are none.
- *soft*—every door is only an importer at `dir(door)`.
- *door* (developed here)—published SFCs pin to their door; every other re-exported file sees the door as one importer located at `dir(door)`. It is pure: home(f) is a function of the graph and the entry list only.

**Pins.** 63 entry doors + 6 implicit root sub-doors (index files the root barrel re-exports directly: accordion, alert, avatar, skeleton, table, composables/glass) + 3 CSS entries; route SFCs `demo/stories/*/*.vue`; `demo/main.ts`; the root configs (`vite.config.ts`, `vitest.config.ts`, `vite.iter.config.ts`, `demo/vite.demo-dist.config.ts`); CLI files carrying a CLI signal (npm script, shebang or main guard: comment-census, gate-register, import-dag, regen-exports, regen-spring-tokens, verify-export-types, profile-bundle, release.sh).

**The floor** (§2.2) is simulated on the graph (`lib/floor.mjs`) before placement: drop the three dual-door re-exports, delete `src/components/index.ts` and `_shared/index.ts`, move `useScrollScene` to demo.

## 2 · Q1—home(f) at HEAD, value vs value + type

Command: `node q1-grid.mjs` (floor applied, fixpoint) → `out/q1-grid.txt`, `out/q1-grid.json`.

| slot / reading | moves value · v+t | src moves | → `_shared` | → `src/composables` | OWNED moved /33 | module APIs displaced into one component |
|---|---|---|---|---|---|---|
| charter / hard | 53 · 53 | 40 | 8 | 17 | 18 | 0 |
| charter / owner | 41 · 43 | 28 | 8 | 7 | 13 | 0 |
| charter / module | 62 · 64 | 49 | 25 | 6 | 18 | 2 (`useSelectionGroup`, `supportsCssTimeline`) |
| charter / sfc | 91 · 89 | 78 | 48 | 6 | 31 · 27 | 10 |
| charter / soft | 83 · 85 | 70 | 51 | 7 | 13 | 0 |
| charter / door | 52 · 54 | 39 | 19 | 7 | 13 | 0 |
| edict / hard | 57 · 57 | 44 | 7 | 22 | 17 | 0 |
| edict / owner | 45 · 47 | 32 | 7 | 12 | 12 | 0 |
| edict / module | 60 · 62 | 47 | 12 | 17 | 16 | 0 |
| edict / sfc | 77 · 75 | 64 | 22 | 18 | 28 · 24 | 4 (`useClipboard`, `useResolveTokenColor`, `useRAFLoop`, `useYieldToMain`) |
| edict / soft | 87 · 89 | 74 | 40 | 22 | 12 | 0 |
| **edict / door** | **56 · 58** | **43** | **11** | **19** | **12** | **0** |

Every reading converges in 4-5 rounds (edict/door value: 49→7→2→0; v+t: 50→8→2→0). A single pass undercounts: moving a file changes its importers' importers.

**Headline (edict / door / value, after the floor):** 56 moves (src 43, demo 12, scripts 1), 10 non-door barrels to dissolve, 5 orphans, 59 files below their home (the depth question, §8 rule 7).

```
→ src/composables (19)   _shared/disclosure/disclosure-context.ts · _shared/field/control.ts · _shared/overlay/participation.ts
                         _shared/overlay/shortcuts.ts · _shared/useMotionAxis.ts · deck/composables/useDeck.ts · useDeckSnap.ts
                         deck/slideContext.ts · deck/types.ts → composables/types.ts · dock/composables/dockContext.ts
                         dock/constants.ts → composables/constants.ts · tabs/composables/useTabRovingFocus.ts → motion/morph/
                         context/createContext.ts → root · dom/useDocumentVisibility.ts → motion/core/
                         motion/{dissolve/dissolveGrammar, reveal/useStagger, reveal/vReveal, route/routeGrammar,
                         route/useRouteTransition}.ts → motion/core/
→ a component (13)       _shared/overlay/isTeleportedTarget.ts → dock/ · dock/composables/useDockHold.ts → slider/composables/
                         fourier-field/shaders/{compute,render}.wgsl.ts → fourier-field/renderer/
                         glass/{backdropLuminanceSample, backdropSampleMath}.ts → dock/ · glass/useGlassBackdropLuminance.ts → dock/composables/
                         glass/webgl/shaders/flow.{glsl,wgsl}.ts → aurora/constants/shaders/ (flow.glsl collides: flow-2.glsl.ts)
                         motion/morph/useDockCtaReceive.ts → dock/composables/ · search/{match,types}.ts → dock/ · search/useFuzzySearch.ts → dock/composables/
→ src/components/_shared (11)  aurora/constants/budget.ts · deck/window.ts · dialog/ModalOverlay.vue · sheet/motion.ts
                         input/types.ts, slider/types.ts, tabs/types.ts (→ types-2/3/4.ts: basename collisions)
                         glass/procedural/{color.glsl, color.wgsl, prng}.ts · glass/webgl/compile.ts
demo (12)                chassis/body/StoryBodyRenderer.vue → chassis/page/ · chassis/hero/warm-field.ts → shell/
                         chassis/play/StoryPlayButton.vue → stories/motion/ · chassis/showcase/TokenLadder.vue → stories/foundations/
                         examples/{Card,Configurator,Toaster}Example.vue → their story categories · stories/manifest.ts, manifest/lazy.ts → demo/composables/
                         substrates/aurora/{OklchStopRow.vue, config/ColorSwatch.vue, config/usePaletteStops.ts} → aurora/sections/
scripts (1)              reflect-capture-verify.mjs → scripts/lib/ (its one importer is lib/paint-arm.mjs)
```

**Value vs value + type:** 3 rows differ under edict/door. `tabs/composables/useTabRovingFocus.ts` goes to `motion/morph/` (value) or the `src/composables` root (v+t). `_shared/interaction.ts` and `_shared/selection.ts` stay (value) or go to `src/composables` (v+t), because type-only readers in `src/composables` pull the LCA to `src`. Across all 24 cells the gap is 0-2 moves. (An earlier count of 11 rows came from a fallback bug in this seat's instrument: the type-only names inside mixed declarations were not seen as type readers. Fixed; `placement.ts` was one casualty.)

**Orphans (5):** `demo/chassis/code/Code.vue` (0 references anywhere), `scripts/lib/canon-doc.mjs` (0), `scripts/safari-probe.mjs` (0, no CLI signal), `scripts/lib/paint-arm.mjs` (8 importers, all in `tests-visual`), `src/composables/motion/spring/springProjection.ts` (readers in demo, scripts and tests; none in src). `demo/shell/configurator/presets/neutral.css` was an orphan until the extractor learned `new URL(…, import.meta.url)`.

**Why only 12 of 33 OWNED move.** L13's OWNED set is "one consuming component". Under the door reading, 18 of the 21 that stay are already home: they sit under a door in `src/composables` (`./canvas`, `./webgl`, `./webgpu`, `./pointer`, `./scroll`, `./color`, `./dom`, `./motion`), so the LCA of {the consumer, the door} is `src` and the slot is `src/composables`. Of the other 3, 2 webgl files (`backingSize.ts`, `createCanvasLifecycle.ts`) sit below their home and 1 is a barrel (`search/index.ts`). Colocating those 18 needs an authored act the law does not make: moving the door (a re-keyed entry map allows `name → path`, §2.1) or unpublishing.

## 3 · Q2—churn over the last 200 src commits

Command: `ANCHOR=door node q2-churn.mjs`, `ANCHOR=hard node q2-churn.mjs` → `out/q2-{door,hard}.{txt,json}`. Span `4bf29831..3f9ea884` (2026-07-15 → 2026-09-22), 2,879 src file-touches. For each commit, home() over every src file at the commit and at its first parent; a change counts only for a file present at both paths. The per-commit entry map is HEAD's entries that exist then plus every dir-named `index.ts` (an approximation of the fail-closed derivation).

| reading | commits that change a home | home changes | importer-driven | distinct files | commits by changes (0 / 1 / 2 / 4 / 5+) |
|---|---|---|---|---|---|
| door | 18 (9%) | 34 | 23 | 29 | 182 / 12 / 4 / 0 / 2 |
| hard | 10 (5%) | 22 | 17 | 20 | 190 / 6 / 2 / 1 / 1 |

Flip-flops (door):
- `motion/core/constants.ts`: `motion → global` at `40d7b08f`, back at `85c322dd`, out again at `5a69ed9f`. One outside importer came, went and came back.
- `glass/supportsBackdropRefract.ts`: `glass → global` at `f0d32d69`, reversed at `b5e70155`.
- `flow.glsl.ts` / `flow.wgsl.ts`: 2 each.

The two largest commits:
- `bda718ac` (7 changes: `FeedbackMark.vue` → status-dot, `menuRowClass.ts` → select, the three `wave/` files orphaned, flow shaders → aurora).
- `490cc46e` (7).

Under the law each of those commits would also have carried its moves. Hard churns less because pins absorb importer changes.

## 4 · Q3—value SCCs after placement

Command: `node q3.mjs`, then again with `KEYS=…door…,…hard…,…owner…` → `out/q3.txt`, `out/q3-all.txt`. Module grain as in `scripts/import-dag.mjs` (component dir, or the first segment under `src/composables`), value edges, after the floor and barrel dissolution.

| tree | module SCCs |
|---|---|
| HEAD, HEAD + floor, HEAD + floor + dissolve | M02 (7: `_shared` dock menu select tabs composables/glass composables/motion), M03 (dialog ↔ sheet) |
| **edict/door, value** | **0** |
| charter/door, value; charter/door, v+t | 0 |
| edict/door, v+t | 1 (2): `composables/_root ↔ motion` via `useMotionAxis → useReducedMotion` and `useSelectionGroup → useTabRovingFocus` (type readers placed the latter at the root). No inversion needed: value-first placement (rule 1) puts `useTabRovingFocus` in `motion/morph/`, and the SCC is gone (the value row above) |
| edict/owner, value | 1 (3): dock · menu · composables root. `participation.ts → dockContext` (dockContext pinned in dock by its own door), `DockTrigger.vue → DropdownMenuTrigger.vue`. Inversion: the neutral injection key (dockContext at the LCA), and menu exporting its trigger through `./menu` or a shared trigger primitive |
| edict/hard, value | 1 (6): command · dialog · dock · menu · sheet · composables root. Adds `CommandDialog → dialog/Dialog.vue`, `DropdownMenuRadioGroup → command/selection.ts` (hard pins drag `selection.ts` into command), `DialogContent → sheet/motion.ts` |
| edict/module, value | 2: (7) aurora · constellation · dock · menu · composables root · glass · motion; (3) carousel · deck · pager-dots. Pins that hold module files beside their doors create them |
| edict/sfc, value | 2: (16) and the same carousel · deck · pager-dots (3) |

**File grain** survives every placement: `Alert.vue ↔ alert/index.ts` and `Badge.vue ↔ badge/index.ts`. The inversion is to move the variant recipes out of the barrels (`badge/index.ts:43-84`, `alert/index.ts:55-92`; L12-10) into `badge/variants.ts` and `alert/variants.ts`.

**How M02 dissolves under the door reading.** `dockContext.ts` has value readers in `_shared/overlay/participation.ts` and in dock. Its door (`./dock`) is one more reader at `dock/`, so its LCA is `src/components` and its hook slot is `src/composables`. The overlays now import a neutral module; the dock imports the same one. This is the portfolio's "neutral injection key at the LCA", produced by relocation rather than by a new design. `dock/constants.ts` follows it out of the dock (dockContext reads it), which is the cascade weakness in §14. The portfolio's risk 2 ("M02 survives any placement") holds under the hard and owner readings (the 6- and 3-member residues above), not under the door reading.

**Measured on the real tree.** The prototype (§9) checks this. After placement alone the gate still sees 2 SCCs, both through surviving barrels. One runs through `_shared/overlay/index.ts`, `dock/composables/index.ts` and `search/index.ts`, which re-export files the law moved into dock and slider (`isTeleportedTarget`, `useDockHold`, `useFuzzySearch`). The other runs through `context/index.ts`, which re-exports the moved `createContext`. After textual barrel dissolution: **P5 GREEN, 0 SCCs**, without the floor's re-export drops.

## 5 · Q4—the CSS ownership graph

Command: `node q4-css.mjs` → `out/q4.txt`, `out/q4.json`. A class maps to the files that emit it (SFC templates and `class`-bearing attributes, `cn()`/recipe string literals, `data-slot` exact matches). A block's home is the LCA of the homes of its **subject** classes' emitters (the last compound); classes in ancestor compounds are context. Selector lists are split paren-aware, with `:is()`/`:where()` expanded.

| quantity | count |
|---|---|
| CSS files in `src` | 133 |
| rule blocks with a class or slot | 1,121: owned 707 · global 251 · no emitter 144 · runtime-built only 15 · context co-selector 4 |
| files whose blocks all share one component home, elsewhere | 5: `glass/dissolve.css` → toast (17 owned), `glass/glass-chip.css` → chip (17), `glass/glass-atom.css` → badge, `glass/liquid-enter.css` → alert, `glass/surface-axis.css` → tabs |
| MIXED files (≥2 homes) | 35 (examples: `sheet/styles.css` sheet · dialog · global; `glass/overlay-plate.css` `_shared/overlay` · menu · select; `utilities/btn.css` global · dialog · table) |
| global registers sitting in a component dir | 3: `_shared/field/control.css`, `_shared/menu/menu.css`, `checkbox/styles.css` |
| custom properties declared in `src/styles` | 879; 96 have a one-component consumer set (dock 33, constellation 18, slider 8, configurator 8, tabs 4, …); 323 have no src consumer |

**Blocks with no stable home:**
1. **Context co-selectors (4).** `.glass-dock .dark-mode-toggle-button[data-size="dock"]` (subject dark-mode-toggle, context dock) in `dark-mode-toggle.css`; the `:where(.glass-dock, .dock-layer-tab, .dock-icon-button, .dark-mode-toggle-button, …)` list in `dock/styles/index.css`; `:where(.badge-atom, .feedback-mark)` ×2 in `glass/mark.css`. Moving the block to either owner leaves the other owner's rule in a stranger's file.
2. **List co-registrations (29 blocks in 12 files).** One selector list registers the same declarations for several owners: `material.css` 7, `mark.css` 5, `ladder.css` 4, `a11y-fallback.css` 3, `dock/styles/run.css` 2, `glass-specular-track.css` 2, … Splitting them duplicates declarations (P-3); keeping them makes the file MIXED.
3. **Bare-word subjects (91).** Unhyphenated classes (`.button`, `.vertical`, `.label`) whose emitter set is a string-token guess.
4. **Runtime-built (15)** and **no-emitter (144).** The public registers (`transitions.css` 16, `metal.css` 13, `typography/*` 30, `paper.css` 5) have no emitter in `src` by design: consumers emit them.

`.glass-dock .dock-icon-button` (`glass/glass-capsule.css`), the example in the question, is **stable**. Subject and context share the dock owner, so the block belongs to dock and only the file is misplaced. The unstable cases are the cross-owner ones above.

## 6 · Q5—the connected-components carve

Commands: `node q5-carve.mjs` (HEAD) and `PLACED=1 node q5-carve.mjs` (after edict/door placement) → `out/q5-{head,placed}.txt`; `node q5-lexical.mjs` → `out/q5-lexical.txt`. Nodes are a unit's files (kind slots folded in). Edges: internal imports (value, type, style, block, dynamic), class-emission edges (CSS file ↔ the unit file that emits a class it owns) and, for `styles/glass`, custom-property edges. Hub policy P1 removes `index.ts`/`index.css`; P2 also removes the unit's root SFC. The auto-namer takes the longest stem token shared by at least half a cluster.

| unit | files | CC carve (P1 → P2) | dominator carve | lexical carve (shared stem token) | L12-06 features |
|---|---|---|---|---|---|
| dock (placed) | 47 | one component of 40 → 35 + `[backdrop]` 3 + `[?]` 3 (the search engine) | 3 clusters cover 7: `[backdrop]` trio, DockLayerGroup + DockCrossfade, DockBackgroundToggle + DockControl | crossfade, layer, morph, run, search, shell, root, index | 7 (crossfade, switcher/layers, morph, run, search, cta, controls); lexical recovers 5; cta arrives by placement; controls is not recovered (`DockTrigger` shares no token) |
| aurora | 35-36 | one component of 35 → 34 | a 24-file runtime subtree mixing both backends; `[atoms]` 2 | root, image, uniform, atoms, mediums | "two renderer backends": no carve separates `glSetup/uniformBridge/textureUpload` from `wgpuSetup/uniformBridgeWGPU*` |
| menu | 16 | `[dropdown]` 14 | 0 clusters | sub (3), radio (2) | sub-menu trio + checkbox/radio items: 2 of 3 |
| sortable-list | 12 | one of 11 → 10 | `[?]` 5: `useSortable drag ghost motion resolve` (the drag engine, unnamed) | 0 groups | the drag engine (BJ 2e): found by dominators only, unnamed |
| styles/glass | 28 | 22 + 6 singletons | n/a | n/a | n/a |

**Answer.** The graph does not carry the feature seams. Inside a unit everything is one component, because the root SFC and the style aggregator touch everything, and removing them does not help much. The dominator tree finds one real engine (sortable-list) and one real trio (backdrop luminance). The names carry the features: the lexical carve recovers most of what L12-06 names, and it works because people named the files. **Who names the clusters: the file stems' authors, or a human when a cluster has no shared token** (the aurora backends, the sortable drag engine, dock controls).

## 7 · Q6—the E-7 reopening

Command: `node q6-e7.mjs` → `out/q6.txt`, `out/q6.json`; sibling scan `node siblings.mjs` → `out/siblings.json` (`git grep` / `git show` only; 1,356 import bindings of `@mkbabb/glass-ui/*` across value.js 269, fourier-analysis 220, speedtest 243, keyframes.js 204, muster 140, atlas 124, bbnf-lang 65, sci-report 56, slides 35).

| quantity | count |
|---|---|
| anchor set | 69 doors (63 entries + 6 implicit root sub-doors) + 3 CSS entries |
| public symbols (declaring file, declared name) | 946 |
| 0 `src` readers and 0 sibling import statements | **447**: 205 types/classes, 120 SFC-level, 58 constants, 44 functions/values, 20 hooks |
| … of which 0 readers anywhere (not demo, not tests) | 31 (13 constants, 12 types, 3 functions, 3 SFC-level), e.g. `_shared/axes.ts` `SURFACES SIZES ORIENTATIONS MOTIONS TONES PLACEMENTS TRIGGERS BACKDROPS`, `pager-dots/worm.ts` `DEFAULT_DOT_PX DEFAULT_PITCH_PX DEFAULT_MAX_STRETCH elongationCeil`, `styles/tokens.ts` `minWidthInputSm motionStagger` |
| … tests-only readers · demo readers | 367 · 49 |
| non-SFC files placed only by publication (no `src` reader, no sibling reader of any symbol) | **24**: `useConfiguratorState`, `useInterval`, `useUserInvalidAria`, `resolveCanvasColor`, `vReveal`, `tokens/manifest`, `darkModeSyncScript`, `useLiquidReveal`, `engageLadder`, `useRouteTransition`, `dissolveGrammar`, the 4 sidebar hooks, `blob/presets`, `useCursorInteraction`, `useDeckHashSync`, `useDeckSwipe`, `useEdgeZones`, `useDeckCapture`, `useDockCtaReceive`, `useDockSearch`, `midiAdapter` |

The sibling count is a lower bound: 231 of the 1,356 bindings name a symbol HEAD no longer exports (historical pins 3.x-8.x). The rule's escape hatch is real and bounded: 24 files, 447 symbols. Under the door reading those 24 gather beside their door. 3 of them (`vReveal`, `useRouteTransition`, `dissolveGrammar`) are among the 6 files `motion/core/` receives (§14.4).

## 8 · The strongest form

Stated as rules. Rules 1-6 are the law; 7-14 are what it takes to hold the edict's other clauses. Rules marked (M) were measured in this pass.

1. **Edges (M).** Value edges place: value imports, dynamic `import()`, `import.meta.glob`, `<style src>`, CSS `@import`, `new URL(…, import.meta.url)`. Type-only edges place a file only when it has no value reader (value-first). Attribution goes through pure barrels, per name, to the declaring file. Measured gap vs value + type: 3 rows.
2. **Anchors (M).** The door reading. Published SFCs are pinned to their door. Every other re-exported file counts its door as one importer at `dir(door)`. Route SFCs, `demo/main.ts`, root configs and CLI files are pinned; a CLI file is one that carries a CLI signal (npm script, shebang or main guard).
3. **Home.** `home(f) = LCA(unit(dir(u)) for u in importers(f) ∪ doors(f))`, with kind slots folded into their unit.
4. **Global (M).** An LCA at a zone root resolves to that zone's shared slot:
   - `src`: hooks (`use*`, `v*`) go to `src/composables/`; everything else goes to `src/components/_shared/`.
   - `demo`: `demo/composables/` or `demo/chassis/`.
   - backend: `scripts/lib/`, or `scripts/` for a file whose LCA is the repo root.
5. **Slot.** A hook placed inside a component unit goes to `<home>/composables/`; a stylesheet to `<home>/styles/` or `<home>/styles.css`; an SFC to the unit root.
6. **Fixpoint (M).** Placement iterates until stable (4 rounds at HEAD). Barrel dissolution runs **before** placement is realized (§9: placing without dissolving creates 2 SCCs through the surviving barrels).
7. **Depth (M).** A file may sit below its home only in a kind slot, or in a *lexical feature dir*: a dir whose name is a stem token every member shares. HEAD has 47 files that fail this (§14.7). The honest alternative is a declared feature dir, a single authored fact per dir.
8. **Cross-zone and orphan files (M).**
   - A file whose importers all sit in one other zone moves to that zone's LCA (`paint-arm.mjs` → `tests-visual/`).
   - A file with no reader anywhere is deleted under E-7 (`Code.vue`, `canon-doc.mjs`).
   - A file read from several zones and from no in-zone file is a ruling (`springProjection.ts`).
9. **Tests (M).** A test lives at `mirror(LCA(home(subjects)))`. Subjects are the src/demo/scripts/root files it imports or reads by literal path. The mirror needs its own cross-cutting slot (`tests/invariants/`): 35 tests would otherwise land in the `tests/` root and 12 in `tests/components/`.
10. **Bounds.** A dir holds ≤ 12 direct files and a file ≤ 500 lines. A dir over the bound is carved by lexical groups first, then by dominator clusters. Every cluster needs a name, and names are authored (§6).
11. **Acyclicity (M).** 0 value SCCs at module grain is a gate row. The law cannot invert a dependency, so an SCC it cannot dissolve by placement is reported with its edges, and the fix is a design act.
12. **CSS (M).**
    - A block's home is the LCA of its subject classes' emitters' homes.
    - A file whose blocks share one home moves there; a MIXED file splits.
    - Context co-selectors and list co-registrations are the one declared fact: they are marked global and stay in `src/styles/`.
    - Runtime-built classes are registered by the recipe file that builds them (`chipVariants.ts`, the badge recipes), which then counts as an emitter.
13. **Tokens (M).** A custom property whose consumer set is one component moves into that component's `tokens.css` (96 at HEAD).
14. **Orders of operation.** Floor, then barrel dissolution, then placement to fixpoint, then depth, then the bounds carve (with names), then CSS, then the test mirror.

## 9 · The prototype probe

Worktree `S/wt` at `6433284a`. Baseline in that worktree:
- `vue-tsc --noEmit`: 0 errors.
- `vue-tsc -p tsconfig.test.json`: 0 after a build (the `@mkbabb/glass-ui/fourier-math` self-reference needs `dist`).
- `vite build`: exit 0, 837 files in `dist`.
- `regen-exports`: EXACT REPRODUCTION.
- `vitest run`: 2,324 tests: 2,320 pass, 3 fail, 1 skipped. The 3 are `boot-graph` build-arm tests; `dist-demo/index.html` is absent in a fresh worktree.

**Stage 1: placement.** `proto/plan.mjs` computes edict/door/value to fixpoint without the floor, because the prototype makes no API edits. The result is 55 moves; collisions got dir-qualified names (`input-types.ts`, `slider-types.ts`, `shaders-flow.glsl.ts`). `proto/codemod.mjs` rewrites every specifier the resolved graph ties to a moved file (relative, `@glass/`, `/src/`, glob, style, block, literal paths; package specifiers untouched) and then renames the files: 213 rewrites (159 value, 40 type, 14 literal) in 134 files, 0 conflicts.

| check | result |
|---|---|
| `vue-tsc` src · tests | 0 · 0 errors |
| `vite build` | exit 0, 837 files |
| `regen-exports` | EXACT REPRODUCTION, exportKeys 68/68, 0 drops/adds/mismatches |
| `vitest run` | **7 suites fail to load** (`Missing story module: foundations/intro`): `tests/demo/{landing,route-transition,router-field-ownership,router,springs-story,story-preview-card}.test.ts`, `tests/composables/search/search-contracts.test.ts`. 2,231 tests collected, 2,223 pass, 7 fail |

What broke, by cause:
- **Glob keys are importer-relative data.** `demo/stories/manifest.ts` moved to `demo/composables/`. Its `import.meta.glob("./*/*.vue")` specifier was rewritten to `../stories/*/*.vue`, but the keys it yields changed with it, and two lookups build keys by hand: `lazy.ts:20` (`./${category}/${id}.vue`) throws, and `manifest.ts:162` (`./${cat}/${id}.tile.vue`) **silently** returns `undefined`, so every landing tile would fall through to its frozen still. No test catches the second one. Fixed by hand at both sites.
- **`vi.mock` strings are not import edges.** `GlassDock.backdrop-mode.test.ts` mocks `@glass/composables/glass/useGlassBackdropLuminance`; the module moved to `dock/composables/`, the mock stopped intercepting, and "called once" failed with 0 calls. 1 of the 13 `vi.mock`-family strings in the tree named a moved file (`proto/mockscan.mjs`). Fixed by hand.
- **Tooling scope.** `picker-lane.test.ts` G1 asserts that no `*.glsl.ts`/`*.wgsl.ts` sits under `src/components/_shared/`, because `demo/demo.css` scans `@source "../src/components/_shared/**/*.ts"` and a shader template literal trips Tailwind's class extractor. The law put `color.glsl.ts` and `color.wgsl.ts` in `_shared`. **Not fixed**: it needs a `shaders/` slot excluded from `@source`, or a different global slot for shaders. That is a placement rule the import graph cannot derive.
- **`comment-ratio` ×2: load, not structure.** `census("src")` took 28 s inside the full suite (411 ms at baseline) but 304 ms standalone on the moved tree, and `comment-ratio` passes when `tests/gates` runs alone (116 pass, 1 expected fail, and only the 3 environmental boot-graph failures). The machine's load average was 54-65 on 18 cores from other sessions.

**Stage 2: barrel dissolution.** `proto/dissolve-codemod.mjs` rewrites every import or export-from that names a non-door pure barrel into imports of the nearest non-barrel file per name, expands `export *` through the barrel's own re-exports, and deletes the barrel. 12 barrels (8 src, 4 demo): 37 declarations become 51, in 30 files; 0 namespace imports, 0 side-effect imports, 0 unresolved names.
- `vue-tsc` 0 · 0; build exit 0, **829** files (the 8 barrel `.d.ts` are gone); regen EXACT; **63 doors × 1,277 exported names identical** to HEAD (`proto/doornames.mjs`).
- New breaks: `Constellation.palette-lifecycle.test.ts` ×3 (`ctx.setTransform is not a function`). The test mocks the dissolved barrel `@glass/composables/glass/canvas2d`; the component now imports the origin file, so the mock no longer applies. Fixed by pointing the mock at `…/canvas2d/useCanvas2D`. 0 other mocks name a barrel (`proto/mockscan2.mjs`).
- `menu/contract.test.ts` failed once under load and passes 12/12 alone.

**Stage 3: fixpoint correction.** Regenerating the plan after the instrument fix (§2) changes 2 rows: `placement.ts` stays in `_shared/overlay/`, and `tabs/types.ts` goes to `_shared/tabs-types.ts`. Applied with the same codemod (2 moves, 10 rewrites). 8 `import { type X }` declarations in edited files (mostly stage-2 output) were normalized to `import type`.

| check (final tree) | result |
|---|---|
| `vue-tsc` src · tests | 0 · 0 |
| `vite build` | exit 0 · 829 files (837 − 8 barrel `.d.ts`) |
| `regen-exports` | EXACT REPRODUCTION; 68/68 keys, 0 changed |
| doors × names | 63 × 1,277, 0 differing |
| `dist` diff | 78 base-only (42 relocated `.d.ts`, 8 deleted barrel `.d.ts`, 28 content-hashed chunk renames) · 70 new (42 `.d.ts` + 28 chunks) · 62 same-name content diffs (29 entry `.js` naming new chunks, 32 `.d.ts` with re-relativized paths, `glass-ui.css`) · 63 entry `.js` files present |
| `glass-ui.css` | 42,374 bytes both sides; 3 rules differ, all `.fourier-field*` with a new `data-v` id: Vue hashes path + source in production, and the codemod edited `FourierField.vue`'s import specifiers |
| `vitest run` | 2,324 tests: **2,316 pass**, 7 fail, 1 skipped. 3 environmental (boot-graph), 2 `comment-ratio` load timeouts, **2 move-caused**: `story-lazy.test.ts` (its fixture hard-codes the `./x/y.vue` key convention) and `picker-lane` G1 (above) |
| gate | 365 violations; **P5 GREEN**; P1 law half 6 (the 5 orphans + `useScrollScene`, which the floor moves) |

**Footprint vs HEAD:** 55 net moves, 12 deletions, 132 files edited in place (+216 / −234 lines), 26 moved files with edited specifiers (43 lines). Hand fixes: 4 sites (2 glob keys, 2 mocks). Unresolved: 2 (above).

## 10 · The gate, and that it fails at HEAD

`gate/home-gate.mjs` (to land as `scripts/structure/home.mjs`). It rebuilds the graph and the entry map, recomputes home() under the strongest form, and fails on:
- P1 placement (law half: outside, orphan, non-door barrel · depth half: below home without a slot or lexical dir)
- P2 dir > 12 direct files (src, demo, scripts, tests, tests-visual)
- P3 file > 500 lines
- P4 test off its mirror
- P5 value SCC at module grain
- P6 a stylesheet off its CSS home or MIXED

P1 and P5 are the family's invariant; P2 and P3 are the portfolio's shared bounds; P4 and P6 are the mirror and CSS arms. Runtime 2.9 s.

```
$ node gate/home-gate.mjs            # HEAD 6433284a
P1 split: law (outside + orphan + non-door barrel) 66 · depth arm (below home, no slot / lexical dir) 47
RED   P1 placement: 113
       demo/capture/capture.css → demo (sits below its home in 'capture', no lexical feature dir)
       demo/chassis/body/StoryBodyRenderer.vue → demo/chassis/page
       demo/chassis/code/Code.vue → no importer in zone demo
       …
RED   P2 dir > 12: 18
       src/components/aurora/composables/ 16 direct files · src/components/dock/styles/ 15 · src/components/menu/ 16 · tests-visual/ 177 …
RED   P3 file > 500 lines: 57
       demo/stories/manifest.ts 1098 lines · scripts/verify-export-types.mjs 1079 · tests/styles/contrast-computed.test.ts 1260 …
RED   P4 test mirror: 198
       tests/components/accordion.contract.test.ts → tests/components/accordion/ · tests/components/a11y/key-scope.test.ts → tests/components/sortable-list/ …
RED   P5 value SCC: 2
       SCC src/components/_shared · dock · menu · select · tabs · composables/glass · composables/motion :: …/overlay/participation.ts -> …/dock/composables/dockContext.ts ; …
       SCC src/components/dialog · src/components/sheet :: DialogContent.vue -> sheet/motion.ts ; SheetContent.vue -> dialog/ModalOverlay.vue
RED   P6 css home: 40
       src/components/_shared/disclosure/disclosure.css → MIXED (GLOBAL | src/components/accordion) split …

G-HOME RED — 428 violation(s)          (exit 1)
```

On the prototype tree: `P1 51 (law 6 · depth 45) · P2 20 · P3 57 · P4 201 · P5 GREEN · P6 36 → 365`. P2 rose from 18 to 20: `_shared/` now holds 18 direct files, `dock/` 15, `motion/core/` 16. P4 rose by 3 (tests of moved subjects). P6 fell by 4.

**To green,** in rule-14 order:
- the floor rows;
- 5 orphan rulings;
- 45-47 depth decisions (flatten, or rename members so the dir name is a shared stem, or declare the dir);
- carving 20 dirs;
- 57 long files by hand;
- 188-201 test moves plus the cross-cutting test slot;
- 36-40 stylesheet moves or splits, plus 96 token moves.

## 11 · Migration cost (the full law, not only the prototype)

| work | count | measured how |
|---|---|---|
| src/demo/scripts file moves (the law, after the floor) | 56 (src 43, demo 12, scripts 1) | `q1-grid` edict/door/value |
| non-door barrels dissolved | 10 after the floor (12 without); 37 declarations → 51 | prototype stage 2 |
| specifier rewrites for moves + barrels | ≈ 275 (213 + 51 + 10), plus 8 type-import normalizations | prototype stages 1-3 |
| graph-invisible fixes | 2 glob-key sites, 2 `vi.mock` strings, 1 key-convention fixture, 1 `@source` scope rule | prototype |
| orphan rulings | 5 (+ `useScrollScene` via the floor) | gate P1 |
| depth decisions | 45-47 files in ~20 dirs (flatten, rename or declare) | gate P1 depth half |
| dir carves | 18 at HEAD → 20 after placement; each cluster named by a person | gate P2 |
| long-file carves | 57 (src 17, tests 19, demo 8, scripts 7, tests-visual 6) | gate P3 |
| test moves | 188 of 239 off the mirror (+3 for moved subjects); 46 relative specifiers + 17 `../` literal paths to rewrite; 350 alias specifiers survive; 0 inbound relative imports | `p4-cost.mjs` |
| stylesheets | 5 whole-file moves, 35 MIXED splits, 3 global registers out of component dirs, 29 co-registration blocks and 4 co-selectors declared global | `q4-css.mjs` |
| tokens | 96 custom properties to component `tokens.css`, with their dark arms | `q4-css.mjs` |
| entry map | 0 source paths change: doors never move under the door reading | prototype, `regen-exports` EXACT |

The portfolio's estimate was 600-700 rewrites. The measured placement + barrel + test part is ≈ 340 (275 + 63). The carve, CSS and token halves were measured as counts but not prototyped.

## 12 · Consumer surface

- **Exports map:** 0 keys added, removed or changed (68/68); `typesVersions` unchanged. Measured, not estimated: `regen-exports` reproduces `package.json` exactly on the moved tree.
- **Public names:** 63 doors × 1,277 exported names identical before and after (`proto/doornames.mjs`).
- **Sibling code:** all 1,356 sibling bindings go through `@mkbabb/glass-ui/*` subpaths, so no sibling breaks.
- **dist layout:** 42 `.d.ts` files move inside `dist` and 8 disappear. The exports map blocks deep imports, so only a consumer resolving `dist/**/*.d.ts` by path would notice.
- **CSS:** byte-identical length; scoped-style ids rehash for SFCs whose source text the codemod edited (1 SFC here).
- **Beyond the prototype:** the floor's re-export drops change `./motion` and `./aurora` (§2.2, shared by every family). Moving a published single-consumer composable to its consumer means moving its door, which is a surface choice, not a consequence (§2.1).

## 13 · The backend analogue

**glass-ui's own backend** (`scripts/` + the 9 root build files). Under the same law:
- **1 move.** `reflect-capture-verify.mjs` → `scripts/lib/`: its only importer is `lib/paint-arm.mjs`, and it carries no CLI signal although X §3.1 lists it as a CLI.
- **Root-level helpers.** 3 build helpers imported only by root configs (`gen-component-styles`, `flatten-subpath-types`, `lib/minify-css`) have the repo root as their LCA. Rule 4 makes `scripts/` the backend's shared slot so they stay.
- **Cross-zone.** `paint-arm.mjs` (586 lines, 8 `tests-visual` importers) moves to `tests-visual/` under rule 8.
- **Deletions.** `canon-doc.mjs` and `safari-probe.mjs` have no reader and no CLI signal.
- **CLI pins.** `gate-register` and `comment-census` have one importer each, in `tests/gates/`, and are CLIs by main guard. They stay pinned in `scripts/`. X §3.1's reading ("these three leave `scripts/`") holds only if a CLI file with a test importer is not a pin. That is a pin-set choice the graph cannot make.
- **Bounds.** 7 scripts exceed 500 lines.

**Carrying it to a sibling backend (measured, read-only).** `node backend-probe.mjs <repo> HEAD <zone> <modules> <shared> <pins>` reads the tree with `git ls-tree`/`git cat-file`; nothing is built or run in the sibling.

| backend | files | outside · orphan (wiring counted) | outside · orphan (wiring excluded) | what drives it |
|---|---|---|---|---|
| value.js `api/src` @ `ace3a5d7` | 115 `.ts` (85 non-test) | 28 · 1 | 12 · 17 | `app.ts` mounts every module's routes; `platform/http/inject-services.ts` imports every repository; `platform/db/collections.ts` imports every model. Counted as importers, they pull routes, repositories and models into `platform/`. Excluded, those files have no importer left |
| speedtest `server/src` @ `7212e733` | 73 `.ts` | 28 · 6 | 19 · 21 | `index.ts`, `middleware/index.ts`, `middleware/wire-services.ts` (the same composition-root shape) |

What carries over:
- **Doors.** `index.ts`, `__init__.py` and `mod.rs` re-exports play the door's part, with the same door reading.
- **The shared slot.** It is `platform/` (Hono), the lowest covering package (Python), or the crate root (Rust).
- **Tests.** They follow the language (pytest globs, Cargo `tests/`, `#[cfg(test)]`).

What does not carry over:
- **Composition roots.** A backend needs a second anchor class beside doors, *wiring files*, whose edges neither place nor pin. With that class, the wired files (routes, repositories) have no placing reader and need a declared home.
- **Domain vs infrastructure.** The law moves `palette/model.ts`, `session/model.ts`, `palette/schema.ts` and `types.ts` into `platform/` because another module reads them. It moves `platform/http/rate-limit.ts` into `session/` and `platform/text/regex.ts` into `admin/` because one module reads them. value.js's convention (X §6.2: `platform/` = db, http, cache, migrations, logging) is a kind grouping, and the law is kind-blind by design.
- **Kind-bucketed layouts.** speedtest's `routes/ validation/ middleware/ services/ utils/`: if those dirs fold as kind slots, the whole server is one unit and the law says nothing. If they don't, 28 files move. Neither answer is the edict's domain-module shape.
- **Fixed-path layers.** Cloudflare `functions/` (X §6.4) is a fixed-path leaf layer: route files are pinned by the router, and only helpers are placed.

## 14 · Weaknesses, with named counterexamples

1. **The anchor rule decides the answer, and the law cannot choose it.**
   - Across the six readings, src moves range from 28 to 78 and OWNED moves from 12 to 31 (§2).
   - The literal charter reading (hard) leaves a 6-member SCC: `participation.ts → dockContext`, `DropdownMenuRadioGroup → command/selection.ts` (hard pins drag `selection.ts` into command), `DialogContent → sheet/motion.ts`.
   - The owner reading is not a pure function (its result depends on where a file already sits), and the sfc reading displaces `useRAFLoop` into a single component.
   - The door reading is pure and SCC-free, but it is still a pick.
2. **Churn with oscillation.** `motion/core/constants.ts` flips between `motion` and the global slot 3 times in 200 commits (`40d7b08f`, `85c322dd`, `5a69ed9f`). `supportsBackdropRefract.ts` moves at `f0d32d69` and back at `b5e70155`. Each flip is a move plus its rewrites in an otherwise unrelated commit.
3. **Borrowing exports a component's engine.** `useDeck.ts`, `useDeckSnap.ts`, `slideContext.ts` and `deck/types.ts` leave the deck for the `src/composables` root because a second component reads them. `useDockHold.ts` moves into `slider/composables/`, and its name still says dock.
4. **Doors become heaps.** Published-only files gather beside their door, and their helpers follow them: `motion/core/` gains `vReveal`, `useStagger`, `routeGrammar`, `useRouteTransition`, `dissolveGrammar` and `useDocumentVisibility` (16 direct files, P2 RED), and `reveal/`, `route/`, `dissolve/` empty out. `useDocumentVisibility`, a DOM hook, now lives under motion because its readers do.
5. **The global slots are dumping grounds, with collisions.** After placement:
   - `_shared/` has 18 direct files.
   - Four `types.ts` meet in `_shared` (`types-2/3/4.ts`, or dir-qualified names).
   - `dock/constants.ts` becomes `src/composables/constants.ts`, `sheet/motion.ts` becomes `_shared/motion.ts`, and `flow.glsl.ts` becomes `flow-2.glsl.ts`.

   Every one needs a rename, and renames are authored.
6. **The graph carries no feature seams (§6).** Features come from names; aurora's two backends and sortable-list's drag engine have no shared token.
7. **The depth arm is brittle.**
   - `motion/morph/` is a lexical dir until the law files `useTabRovingFocus.ts` in it, which un-justifies every member.
   - `fourier-field/renderer/`, `sheet/detents/`, `glass/webgl/`, `glass/canvas2d/`, `styles/tokens/` and `demo/chassis/hero/` are author-named feature dirs the stem rule cannot justify. `StoryHeader.vue` shares no token with `hero/`.
   - 47 files fail at HEAD.
8. **Placement changes behaviour the graph does not see:**
   - `import.meta.glob` keys (7 suites plus a silent tile loader),
   - `vi.mock` strings (2 seams, one silent until an assertion counts calls),
   - Tailwind `@source` scopes (`picker-lane` G1),
   - `new URL(…, import.meta.url)` (`neutral.css`),
   - Vue scoped-style ids (hash of path + source).

   Each needs an extractor, a lint, or a fixture that does not bake in a path convention (`story-lazy.test.ts` hard-codes `./x/y.vue`).
9. **E-7 reopens.** 24 files are placed only by being published, and 447 public symbols have no `src` or sibling reader (§7). The door reading turns "exported" into "sits beside the door", which puts E-7's escape hatch in the tree's shape.
10. **Blind to external consumers.** Placement counts only in-zone readers. The 1,356 sibling bindings never place anything, and 231 of them no longer resolve.
11. **The CSS half is heuristic.** 91 bare-word blocks, 29 list co-registrations, 4 cross-owner co-selectors, 15 runtime-built and 144 no-emitter blocks. `sheet/styles.css` mixes sheet, dialog and global blocks, and the split duplicates or scatters them.
12. **tests-visual has no import subject.** Its 167 specs drive URLs, not modules, so P4 does not apply. Its 177-file root can only be carved lexically.
13. **The mirror needs its own global slot.** 35 tests map to the `tests/` root, 12 to `tests/components/`, and 28 to `tests/build/`. Cross-cutting sweeps (the a11y tests) have no single subject.
14. **Cross-zone files have no answer.** `springProjection.ts` is read by `demo/stories/motion/springs.vue`, `scripts/regen-spring-tokens.mjs` and tests, and by no `src` file. The law cannot place the spring math that the token generator and the demo share.
15. **Backends: composition roots and kind groupings (§13).** value.js's `inject-services.ts` and speedtest's `wire-services.ts` either pull every wired file into `platform/` or orphan it. The law also moves domain models into infrastructure.
16. **The CLI pin set is a judgment.** Of the files X §3.1 lists as CLI-only, `reflect-capture-verify.mjs` and `safari-probe.mjs` carry no CLI signal, while `gate-register.mjs` does. "Pinned because it is run by hand" is not in the graph.

## 15 · Open gaps

- The CSS arm (P6: 36-40 files, 96 tokens) and the bounds carve (P2 20 dirs, P3 57 files) were counted, not prototyped. The cluster names they need were not proposed.
- The floor was simulated on the graph, not applied in the worktree. `useDockCtaReceive`'s move into `dock/composables/` depends on it (1 of the 56).
- Not run: `demo:dist:build` (so the `boot-graph` arm stays environmental), `tests-visual` / Playwright, and a paint check. The prototype shows the library and unit suite survive, not that the demo renders.
- Churn used HEAD's entry names per commit plus dir-named `index.ts` files, which approximates the fail-closed derivation of each era.
- The sibling reader count is a lower bound (231 unmatched bindings; chicago is not a git repo and was not scanned).
- Owner rulings the law cannot make:
  - the 5 orphans;
  - the cross-zone rule for `springProjection.ts`;
  - whether a CLI with a test importer is a pin;
  - the `shaders/` slot versus Tailwind `@source`.
- The depth rule is a sketch. The alternatives (declared feature dirs, or "a dir whose eponymous file is its root") were not measured.
- The backend probes use a hand-named aggregator list. A structural definition (for example, a file importing ≥ k siblings' modules and exporting a composition) was not tested.
- The gate is a scratch script. It has no E-8 registry row, and its P4/P6 arms reuse the Q4 heuristics.

## Appendix · reproduce

```
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-A
cd $S
node q1-grid.mjs                      # Q1 grid (floor, fixpoint)          → out/q1-grid.{txt,json}
ANCHOR=door node q2-churn.mjs         # Q2 churn (also ANCHOR=hard)         → out/q2-door.{txt,json}
KEYS=edict/door/value,edict/door/value+type,charter/door/value,edict/hard/value,edict/owner/value node q3.mjs
node q4-css.mjs                       # Q4                                  → out/q4.{txt,json}
node q5-carve.mjs; PLACED=1 node q5-carve.mjs; node q5-lexical.mjs
node siblings.mjs; node q6-e7.mjs     # Q6                                  → out/q6.{txt,json}
node gate/home-gate.mjs [root]        # the gate, exit 1 on any violation
node p4-cost.mjs                      # test-mirror rewrite bill
node backend-probe.mjs /Users/mkbabb/Programming/value.js HEAD api/src api/src/modules api/src/platform api/src/main.ts,api/src/cron.ts
# prototype (in a fresh worktree WT under $S/wt):
node proto/plan.mjs && node proto/codemod.mjs $S/wt proto/moves.json
node proto/dissolve-codemod.mjs $S/wt && node proto/normalize-type-imports.mjs $S/wt
node proto/codemod.mjs $S/wt proto/moves.delta.json
# then in WT: npx vue-tsc --noEmit; npx vite build; npx vue-tsc --noEmit -p tsconfig.test.json;
#             node scripts/regen-exports.mjs; npx vitest run --reporter=json
```
