# D1 · pass 1 · D1-E: unit manifests, generated wiring

| field | value |
|---|---|
| seat | pass-1 research seat for family D1-E ("declaration is the source of record"), design loop D1 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `6433284a`. The brief names `b7099ea6`; `git diff --stat b7099ea6 6433284a -- src scripts package.json vite.config.ts vite.library.ts demo tests tests-visual` is empty, so the tree is the brief's tree |
| inputs | `PORTFOLIO.md` §0–3 and §4 "D1-E" (plus its §7 question list), `pass-1/W.md`, `pass-1/X.md`, `audit/round-1/L12.md`, `L13.md`, `L14.md`; `BI/STRUCTURE-ADDENDA.md`, the DP ruling line at `eafc0a69` (`BI/EXECUTION-PROGRESS.md`), `BI/FORMATION/waves/BI.W-P057.md`; `scripts/lib/subpath-policy.mjs`, `scripts/regen-exports.mjs`, `vite.library.ts`, `vite.style-fold.ts`, `scripts/gen-component-styles.mjs`, `src/styles/index.css`, `src/styles/glass.css`, `demo/stories/manifest.ts` |
| instruments | scratch scripts, all read-only on the repo: `cssorder.mjs` (static cascade-order analysis, postcss), `rungs.mjs`, `unitgraph.mjs`, `nested.mjs`, `scope.mjs`, `scope2.mjs` (symbol level, reusing L13's tracer output, `src/` unchanged since `a97a9ddd`), `rows.mjs` (TS AST over the route rows), `seed.mjs`, `loc.mjs`, and the prototype gate `units.mjs` (snapshot `units.mjs.snapshot`). The D1 regex graph `../graph.mjs` re-run as `graph-head.json` (1,265 files, 2,858 edges, 57 unresolved) |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-E/`, called `E/` below. The prototype's full diff is `E/proto.patch` (2,131 lines) plus `E/proto-untracked.txt`; its generated files are in `E/proto-files/` |
| fences kept | no repo edit besides this file. Builds, typechecks and tests ran only in the worktree `E/wt` (node_modules symlinked; no `tests-visual/node_modules` exists to link), removed with `git worktree remove --force` before this file was written. Sibling repos were grepped read-only (import census only) |

Citations are `file:line` at HEAD, a scratch script with its output, or a URL.

---

## 0 · The answer in brief

1. **Of the four charter fields, only one survives the derivability test.** The entry table (a public name → a source file) is not derivable. Visibility is carried by position (nested component dirs private, everything else library-wide) and needs no field in the target state. The cascade rung is derivable: a static analysis of all 1,336 rules finds that every component stylesheet fits ONE slot, after `utilities.css` and before `accessibility.css`. Scope is location plus a measured consumer count. What remains to declare is 63 entry rows, 5 asset keys and one intra-unit style order (dock).
2. **The exports map regenerates exactly**, key set and targets: 68/68 keys, 0 target mismatches, 62/62 `typesVersions`. The one difference is key order, a one-time reorder of 99 lines of `package.json`.
3. **The generated cascade keeps every strong order dependency.** Of 60 order-dependent file pairs at HEAD, 58 keep their direction in the generated order. The 2 that invert are weak pairs whose selectors cannot match one element. The demo route rows do not generate: 80 rows, 553 lines, all authored apart from the `cat`/`id` pair.
4. **The prototype ran.** 75 manifests, a 390-line generator/gate, `subpath-policy.mjs` and `regen-exports.mjs` deleted, the dual CSS channel collapsed, one module carved. vue-tsc passed on both projects, the build passed, 236/239 test files passed, and the 3 failures are named. The gate fails at HEAD in 0.5 s, and it fails on real findings, not only on missing manifests.
5. **DP-D does not forbid this family.** It kept a generator as the subpath authority and forbade machinery for the root barrel only. The ruling this family does collide with is the owner ruling in `BI.W-P057`, against generated route manifests. Its reasons still hold at HEAD.

---

## 1 · Research questions

### Q1 · Which manifest fields can code derive?

**Entry name.** Keep it (entries plus assets).

```
$ node -e '…libraryEntryMap(); name vs leaf…'       (E/, inline; output verbatim)
entries 63 name == leaf 59 differ 4 index<-src/index.ts motion-core<-src/composables/motion/core/index.ts blob-config<-src/components/blob/config.ts fourier-math<-src/components/fourier-field/math.ts
component dirs with index.ts not published as subpath: 8 _shared,accordion,alert,avatar,carousel,infinite-scroll,skeleton,table
composable dirs INTERNAL: context,glass,search
```

- The name follows from the path in 59 of 63 cases.
- Whether a unit is published at all has no code signal. `accordion/index.ts` (root barrel only) and `button/index.ts` (a subpath) look the same.
- The labels also mislead. `carousel` and `infinite-scroll` are classed INTERNAL, yet both ship through CURATED (L12-11).
- So the fact to hold is "name → source file", and once `subpath-policy.mjs` is deleted nothing else states it.
- The name is written explicitly even where it equals the leaf. That keeps it an API decision rather than a side effect of placement.
- **Assets.** The 5 non-JS keys (`./styles`, `./styles/fonts`, `./styles/theme`, `./styles.css`, `./fonts/*`) name dist artifacts, and nothing in code derives them.

**Visibility.** Drop it as a field. The default by position carries it.

```
$ node unitgraph.mjs graph-head.json unitgraph.json            (E/unitgraph.txt)
units 75; external src importer units: 0 -> 16, 1 -> 29, >=2 -> 30
$ node nested.mjs graph-head.json          (every nested component dir private to its unit root)
edges into a nested dir from outside its unit root: {"src":108,"demo":26,"tests":115,"tests-visual":16,"scripts":2}
components: nested dirs reached from outside = 14; with src importers = 6
composables: nested dirs reached from outside = 14; with src importers = 10
```

- **Component zone.** The 6 component nested dirs with src importers split in two:
  - 3 are CSS `@import` edges from `styles/index.css`, which the generator owns.
  - 3 are the four real breaches L12-03 names: `aurora/constants ← blob`, `dock/composables ← _shared/overlay/participation.ts, slider/Slider.vue`, `tabs/composables ← composables/motion/morph/useSelectionGroup.ts`.
- **Composables zone.** 10 nested dirs are reached across units. The zone is library-wide by definition, so the rule is position, not a declaration.
- Once the colocation-floor moves land, no manifest needs to widen anything. The field would only ever hold exceptions, and an exception list is the shape Packwerk's retrospective reports as rotting (W §8.3).
- The prototype supports `visibility: "library"` as an escape hatch and seeded it zero times.

**Rung.** Drop it. It is derivable: one slot.

`cssorder.mjs` walks the `index.css` import closure in cascade order, plus the 12 `<style src>` files and 16 inline SFC `<style>` blocks. For every pair of rules in different files it records an order dependency when four things hold:

- same layer and same importance
- equal specificity
- an overlapping property (with a shorthand map)
- a subject that can match one element

Two rules count as able to match one element in two cases:

- **STRONG:** one side's required class set is a subset of the other's.
- **COOCCUR:** the two class sets appear together in one literal class string in a `.vue`/`.ts` line.

```
$ node cssorder.mjs /Users/mkbabb/Programming/glass-ui --json cssorder.json      (E/cssorder.txt)
closure files (index.css imports 120 + SFC src 12) = 132; inline SFC <style> blocks 16 (unscoped 0); rules 1336
layer|important -> rule count: {"UNLAYERED|false":87,"components|false":1220,"components|true":29}
order-dependent file pairs: all: 60 (STRONG=shared subject class 42, WEAK-only 18)
$ node rungs.mjs cssorder.json
global stylesheets in cascade order: 78; component stylesheets: 54
component files pinned by a cross-zone dependency: 13
  chip/accent-tone.css: … before glass/glass-chip.css
  dark-mode-toggle/dark-mode-toggle.css / dock/styles/index.css / _shared/field/control.css: before utilities/a11y-overrides.css
  dock/styles/controls/{icon-button,tab-button}.css, configurator/styles.css: after glass/glass-capsule.css
  dock/styles/controls/touch-floor.css: after glass/material.css
  card/styles.css: after glass/ladder.css
  _shared/menu/menu.css, button/styles.css: after utilities/base.css
  data-table/styles.css: after glass/ladder.css; before glass/a11y-fallback.css
  toggle-group/styles.css: after glass/{control-surfaces,control-edge,glass-capsule,defined}.css
component<->component cross-unit STRONG/COOCCUR constraints: 0
single component rung feasible: false (needs a slot after global #67 src/styles/utilities/base.css and before #42 src/styles/glass/glass-chip.css)
```

- The only conflict is `accent-tone.css → glass-chip.css`, a COOCCUR pair on `--accent-band-strength`. `glass-chip.css` is chip-owned (L12-04, L13-04). Once it moves into `chip/`, the pair is intra-unit.
- After that move, every component stylesheet fits between `utilities/base.css` (#67) and `glass/a11y-fallback.css` (#73). That is HEAD's "late" band.
- HEAD uses four positions today (after `paper.css`, after `scroll-choreography.css`, after `utilities.css`, and inside `glass.css`). None of the early positions is required by any dependency the analysis finds.
- The one residual declared order is dock's two cascade roots, `styles/index.css → styles/controls.css`: four STRONG pairs into `controls/icon-button.css`. That is one manifest line.
- **Validation.** Only the co-occurrence pass finds `utilities/base.css → _shared/menu/menu.css` (`.interactive-item` vs `.glass-menu-row`, `transition`), and it is the one cross-file order constraint `index.css:226-235` documents in prose. A class-subset test alone misses it, because the conflict exists only on elements that carry both classes (`menu/DropdownMenuItem.vue:43`, `_shared/menu/rowClass.ts:28`).

**Scope.** Drop the field. Location is the claim, and the gate measures the consumers.

```
$ node scope2.mjs                              (symbol level, through barrels, L13 tracer data)
composable origin files: 96
rule A  <2 consumer units (publicity ignored): 51 (0 units 33, 1 unit 18)
rule B  <2 consumer units AND on no entry: 11
exactly 1 consumer unit (any publicity): 18; of those public: 9
exactly 1 consumer FAMILY (L13 clustering): 34
```

- A file under `src/composables/` is claiming global scope by where it sits, so a separate `scope: global` would restate the path.
- What the gate needs is a counting rule, and the three rules measure 11, 34 and 51.
- The charter's "32 owned composables" is L13's family clustering: 34 = 32 OWNED + `useScrollScene` + `springProjection`.
- Counting by units passes 7 of those as global, for example `useSpringMount` (dialog + sheet) and `useLeadTrail` (carousel + pager-dots).
- Reaching 32 needs a declared family grouping (see Q6, Nx tags), which the charter does not include.
- Public composables whose only consumers live in sibling repos cannot be judged from this repository.

### Q2 · Generate the exports map from manifests and diff it

`seed.mjs` writes one manifest per required unit root:

- every child of `src/components`, `_shared` and `src/composables`
- `src`, `src/styles` and `src/fonts`

Entries come from `libraryEntryMap()` and assets from `CSS_FONT_EXPORTS`. Then `node scripts/units.mjs write` regenerates `package.json`:

```
manifests written: 75; with at least one field: 61; empty: 14
keys HEAD 68 gen 68 same set: true
per-key target diffs: 0
typesVersions keys 62 62 diffs 0 same set true
byte-equal exports: false
first 16 keys HEAD: . ./tokens ./dark ./keyboard ./carousel ./motion ./motion-core ./sidebar ./infinite-scroll ./axes ./blob-config ./color ./dom ./reactive ./fourier-math ./aurora
first 16 keys gen:  . ./aurora ./axes ./badge ./blob ./blob-config ./button ./card ./carousel ./checkbox ./chip ./collapsible ./color ./command ./configurator ./constellation
$ git diff --stat -- package.json   →   1 file changed, 99 insertions(+), 99 deletions(-)
```

It reproduces exactly in content. HEAD's key order is CURATED insertion order (`subpath-policy.mjs:165-190`). A generator that walks directories needs a canonical order, and sorted is the only one that does not restate a list. Plain subpath keys carry no order semantics in Node, so this is a byte change with no behaviour change.

### Q3 · Generate the component band and the route rows, and diff against HEAD

**Component band.**

- The generated region (`E/proto-files/index.css`) holds 34 imports. They are HEAD's 20 `index.css` component imports, `glass.css:68` (accent-tone), the 12 distinct `<style src>` files (17 SFCs) and `glass-chip.css` after its move.
- Each unit's cascade roots are derived as the CSS files no other CSS file imports. Units are ordered by path, and dock alone carries a `styles` list.
- The prototype tree was then re-analysed (`E/cssorder-wt.txt`) and compared with HEAD:

```
HEAD dependency pairs: 60 kept in the same direction: 58
  INVERTED/LOST [weak] src/components/dock/styles/layer-group.css => src/components/command/styles.css
  INVERTED/LOST [weak] src/components/sheet/styles.css => src/components/dialog/styles.css
pairs only in the generated order: 0
```

The two inverted pairs are weak, and neither can match one element:

- **layer-group → command:** `… .dock-layer-switcher .dock-layer… > svg` against `.command-dialog__content .command__item > svg`. Both subjects are a bare `svg` under unrelated owners.
- **sheet → dialog:** `:where([data-slot="sheet-content"][data-detents] > … > [data-slot="dialog-header"])` against `:where([data-slot="dialog-content"]:has(…)) :where([data-slot="dialog-header"])`. The two need different content slots as ancestors.

**Order dependencies the generation must keep (measured).** Global register order stays authored above the slot.

| kind | pairs (first → second) |
|---|---|
| global → component (satisfied by a slot after the registers) | `glass/material.css → dock controls/touch-floor.css` (position); `glass/ladder.css → card, configurator, data-table` (COOCCUR); `glass/glass-capsule.css → dock icon-button, tab-button, configurator, toggle-group, chip/glass-chip`; `glass/{control-surfaces,control-edge,defined}.css → toggle-group`; `utilities/base.css → _shared/menu/menu.css, button` (the documented `.interactive-item` trap) |
| component → terminal (satisfied by a slot before accessibility) | `dark-mode-toggle, dock/styles/index, _shared/field/control → utilities/a11y-overrides.css`; `data-table → glass/a11y-fallback.css` |
| intra-unit (the unit's own `@import` order, or its `styles` list) | dock `shell → morph → adaptive-legibility`, `morph → layers → crossfade`, `shell-regions → morph`, `index → controls/icon-button → tab-button, touch-floor`; deck `stage → turn, capture`; chip `accent-tone → glass-chip` |
| component ↔ component across units | none (STRONG/COOCCUR = 0) |

**UNLAYERED rules.**

- 87 unlayered rules sit in 26 files: the tokens `:root` blocks, `paper.css` (7), `dock/styles/density.css` (1), `scroll-choreography.css`, `scroll-chrome.css`, `utilities/btn.css`, `configurator/styles.css` (`:root`), `slider/styles.css` (47) and `glass/a11y-fallback.css` (3).
- Unlayered normal declarations beat every layered one, whatever the order. So a file's slot matters only against other unlayered rules, and no unlayered/unlayered pair touches a component file.
- `slider/styles.css` is the one component stylesheet that is unlayered on purpose (`index.css:256-258`). It keeps that property in any slot.
- **Caveats.** Conditions (`@media`, `@supports`) are ignored, which makes the analysis conservative. Co-occurrence reads literal class strings only, so it misses dynamic `:class` bindings and `cn()` calls split across lines. The `var()` cascade is not modelled. This is a lower bound, and a paint check is owed (§8).

**A cascade divergence the dual channel causes today.**

- `utilities/a11y-overrides.css:133` restores the `.field-control:focus-visible` outline under `@media (forced-colors: active)`, and it relies on loading after `_shared/field/control.css:221`.
- In dist, the SFC bundle folds in before `accessibility.css` (`vite.style-fold.ts:429-445`), so the restore wins.
- In the demo's dev server, `demo/demo.css:129` loads the cascade statically, while `control.css` is injected when `Input.vue` loads. It lands after the restore and cancels it.
- One generated channel removes that dev/dist split.

**Demo route rows.** Do not generate them.

```
$ node rows.mjs /Users/mkbabb/Programming/glass-ui
manifest.ts lines 1099; CATEGORIES block lines 363-1053 (691); s() rows 80 spanning 553 lines; categories 11
per-row fields: cat+id (path-derivable) 80/80; title 80; blurb 80; opts keys {"background":22,"hero":8,"displayTitle":1,"heroScale":7}
row whose cat matches the SFC dir: 80/80 (missing SFC 0)
title string also present in its story SFC: 34; blurb also present: 0
order is load-bearing: first row per category is the D2 main (assignDepths); category array order = nav order
```

- The 34 title hits are incidental words. Story SFCs do not restate their titles: `demo/chassis/page/StoryPage.vue:30` reads `story.title` from the manifest-backed navigation, and only 2 story files carry a `title=`.
- Code derives only `cat` and `id`. That is 160 short string arguments, which the path would replace.
- Everything else is authored and single-sourced today, including order (the first row of each category is the D2 main, `manifest.ts:338-362`).
- Generating the rows would move 553 lines into 80 per-story declarations plus an order field. It would also break two readers of the file's text: `tests-visual/pi-manifest.ts:20,37` and `tests/demo/story-preview-card.test.ts:597`.

**Test and story globs.** There is nothing to generate. The globs total 8 lines:

- `vitest.config.ts:31-35` (3)
- `tests-visual/playwright.config.ts:48-49,131` (2, plus 1 two-name list)
- `demo/stories/manifest.ts:147,158` (2)

The one real hand-list is the webkit `testMatch` pair. That is L14-02's routing bug, a runner concern rather than a manifest one.

### Q4 · Does BI's DP-D rejection still hold at HEAD?

What DP-D said:

- The ruling as recorded at `eafc0a69` (`BI/EXECUTION-PROGRESS.md`): "**DP-D** the F4 generator stays the subpath authority, NO wildcard exports, root barrel stays hand-curated".
- `STRUCTURE-ADDENDA.md:66`: "`index.ts` # HAND-AUTHORED curated root barrel (DP-D; no manifest machinery)".
- `:70-73`: "the root barrel stays hand-authored".

So DP-D did not reject a generated exports map. It kept one (`regen-exports.mjs`). It rejected machinery for `src/index.ts` only.

- D1-E keeps `src/index.ts` hand-authored (584 lines, 41 `export` statements).
- It keeps no wildcard beyond the existing `./fonts/*`.
- It keeps a generator as the subpath authority.
- So D1-E is compatible with DP-D. The portfolio's "re-opens DP-D" overstates the conflict.

The ruling D1-E does collide with is the owner ruling in `BI.W-P057`:

> Keep one typed, hand-authored manifest as the route and navigation authority. The proposed generated public-concept bijection and catalogue-wide orchestration are superseded: they add machinery without improving the rendered product.

`STRUCTURE-ADDENDA.md:309` backs it: "manifest.ts NO MOVE (hoist rejected — glob anchor + 25 gate pins + BG.W-MANIFEST-COLOCATE)". Checked at HEAD:

| reason | HEAD | holds? |
|---|---|---|
| glob anchor | `manifest.ts:147` `import.meta.glob("./*/*.vue")`, `:158` `"./*/*.tile.vue"` | yes |
| 25 gate pins | `git grep -c "stories/manifest" -- tests tests-visual scripts` → 7 occurrences (5 importing tests, `pi-manifest.ts` ×2), plus 7 demo importers | weakened (25 → 7) |
| adds machinery, no rendered benefit | Q3: 0 derivable fields beyond `cat`/`id`; generation relocates 553 authored lines | yes |

The route arm is dropped from this family. The exports and cascade arms stand.

### Q5 · Lines of machinery added against hand-kept lists deleted

```
$ node loc.mjs HEAD:scripts/lib/subpath-policy.mjs HEAD:scripts/regen-exports.mjs HEAD:src/styles/index.css wt/scripts/units.mjs wt/src/styles/index.css
  388 total    45 code  HEAD:scripts/lib/subpath-policy.mjs
  210 total   144 code  HEAD:scripts/regen-exports.mjs
  313 total    38 code  HEAD:src/styles/index.css
  390 total   323 code  wt/scripts/units.mjs
  330 total    52 code  wt/src/styles/index.css
$ find wt/src -name unit.ts | xargs cat | wc -l   →  332   (75 files)
```

| | lines |
|---|---:|
| added: `scripts/units.mjs` (generator + gate) | +390 |
| added: 75 `unit.ts` | +332 |
| added: generated region in `index.css` (34 imports + 2 markers) | +36 |
| deleted: `subpath-policy.mjs` | −388 |
| deleted: `regen-exports.mjs` | −210 |
| deleted: component `@import`s in `index.css` / `glass.css` | −22 |
| deleted: SFC `<style src>` lines | −17 |
| **net** | **+121** |
| net, code lines only (comments and blanks excluded) | +655 / −189 = **+466** |

- The charter's "about 600 lines of hand-lists" is mostly comments and machinery.
- The classification lists in `subpath-policy.mjs` are 45 code lines. `regen-exports.mjs` is a 144-code-line generator, not a list.
- The route rows (553 lines) cannot be deleted, only moved (Q3).
- About 115 lines of reason narration beside the old `@import`s lose their anchor: `index.css:84-123` (40), `:167-191` (25), inline `:207-276` (42), and `glass.css:60-67` (8). They must move into the stylesheets' own headers or be deleted. That is risk 5, now counted.

### Q6 · Prior art

- **Bazel `visibility`** ([bazel.build/concepts/visibility](https://bazel.build/concepts/visibility)):
  - The default is "just `["//visibility:private"]`".
  - "A target will fail to build during the analysis phase if it violates the visibility of one of its dependencies".
  - "Avoid setting `default_visibility` to public … the risk of inadvertently creating public targets increases as the codebase grows".
  - `__pkg__` does not include subpackages; `__subpackages__` does.
  - Bearing: D1-E takes the private default without BUILD files. It makes position (a nested component dir) the target boundary, and it restates no `deps` (W §2.4 measured Angular Material restating them in 376 BUILD files with a public default).
- **Nx `project.json` tags** ([nx.dev enforce-module-boundaries](https://nx.dev/docs/features/enforce-module-boundaries)):
  - Tags are hand-declared (`"tags": ["scope:shared"]`) and checked by `depConstraints` (`sourceTag` → `onlyDependOnLibsWithTags`).
  - "Projects without any tags cannot depend on any other projects".
  - Bearing: a tag is a declared grouping, which is what Q1's scope arm lacks. L13's PROC / OVERLAY / PAGER families are Nx `scope:*` tags in all but name. Counting consumers by tag gives 34, counting by unit gives 11.
- **Storybook CSF indexers** ([main-config-indexers](https://storybook.js.org/docs/api/main-config/main-config-indexers), [sidebar-and-urls](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls)):
  - An indexer is `{ test, createIndex(fileName, { makeTitle }) }`, returning entries with `type`, `exportName`, `importPath`, `title`, `name` and `tags`.
  - `title` is "auto-derived from file path via `makeTitle()` unless specified". You "can omit the `title` … and allow Storybook automatically infer it based on the file's physical location".
  - Bearing: the index derives the id from the path and leaves every other field authored in the story file's meta. That is the same split `rows.mjs` measured. A CSF-style indexer for the demo would move the rows into the stories, not remove them.

---

## 2 · The family in its strongest form

What it has to specify so that it works, with every field that failed Q1 removed.

**2.1 The unit.** A unit is a directory.

- **Unit roots:** each child of `src/components`, of `src/components/_shared` and of `src/composables`, plus `src`, `src/styles` and `src/fonts`. That is 75 at HEAD.
- **Files:** every file belongs to its nearest unit directory.
- **Nested directories** under a component root are units by position and need no manifest.

**2.2 The manifest.** `unit.ts` is a literal, `export default { … }`, with no imports and no expressions. Vite, Vitest and Node read it synchronously through one loader (`units.mjs:40-47`), so the gate needs no toolchain. It has four keys, and an unknown key is an error:

| field | holds | occupants at HEAD |
|---|---|---:|
| `entries` | public name → file in the unit | 57 units, 63 names |
| `assets` | non-JS export key → dist target, verbatim | 2 units, 5 keys |
| `styles` | ordered cascade roots, only when a unit has 2+ roots with a dependency | 1 (dock) |
| `visibility` | `"library"`, only to widen a nested component dir | 0 in the target state |

**2.3 Derived, never declared.**

- the vite entry map, `exports` and `typesVersions` (sorted keys)
- the cascade slot in `src/styles/index.css` between `/* units:cascade … */` and `/* units:end */`:
  - one slot, after `utilities.css`, before `accessibility.css`
  - ordered by unit path, then the unit's `styles` list or file path
- a unit's cascade roots: its CSS files that no other CSS file imports
- visibility:
  - an entry makes a unit public
  - roots and the composables zone are library-wide
  - nested component dirs are private to their root
  - tests are exempt (they are the unit's witnesses); demo is held to the rule
- scope: the global zone is `src/composables/`, judged by measured consumers

**2.4 The gate** is `node scripts/units.mjs check`, with 6 rules, one executable and exit 1 on any violation:

1. **unclaimed:** a unit root without `unit.ts`
2. **drift:** `package.json` exports or `typesVersions`, or the `index.css` region, differ from the generated copy
3. **dual-channel:** any SFC `<style src>`, any component `@import` outside the region, any `src/styles` file importing from `src/components`
4. **visibility:** an edge into a private nested dir from outside its unit root (src and demo)
5. **multi-door:** an origin declaration exposed by 2+ non-root entries. This uses a symbol tracer through re-export chains and reproduces L13's 40 exactly (§4)
6. **global-zone:** a `src/composables` file with <2 consumer units (counted by symbol, through barrels) and on no entry

**2.5 Still undecided within the family** (these need rulings, not mechanism):

- the consumer-counting unit for rule 6 (units vs declared families)
- what the 29 deliberate multi-door symbols become
- what `./styles.css` contains after the collapse
- whether demo may import unit-private files

---

## 3 · Prototype probe

All in the worktree `E/wt`, patch at `E/proto.patch`.

| step | what ran | outcome |
|---|---|---|
| baseline | `vite build`, `npm run typecheck`, `vitest run` at HEAD | build EXIT 0 (837 dist files, 63 declaration entries); typecheck EXIT 0; vitest 7 files / 13 tests failed, 232 passed. The failures: 10 timeouts (atoms fuzz 15 s, glass-subtlety, use-accent-tone, menu contract, aurora-stage), `comment-ratio` (lane state) and `boot-graph` (no `dist-demo`), with the machine shared by parallel seats |
| seed | `node seed.mjs $PWD/wt` | 75 manifests, 332 lines; 61 carry a field, 14 are `{}` |
| rewire | `vite.library.ts:1`, `vite.style-fold.ts:15,214,357`, `vite.style-assets.ts:65`, `flatten-subpath-types.mjs:13,112`, `tests/gates/{orphan-css-partial,overfit-structure}.test.ts` import line, `tsconfig.build.json` exclude `src/**/unit.ts`; `rm scripts/lib/subpath-policy.mjs scripts/regen-exports.mjs` | 10 lines edited in 8 files |
| cascade | 20 component `@import`s cut from `index.css`, 2 from `glass.css`; `glass-chip.css` → `chip/`; `<style src>` removed from 17 SFCs; `units.mjs write` | region of 34 imports; 58/60 dependency pairs kept (Q3) |
| typecheck | `vue-tsc --noEmit` + `-p tsconfig.test.json` | EXIT 0 |
| build | `vite build` | EXIT 0, 63 declaration entries (same as HEAD) |
| dist diff | per-file sha256 vs baseline, JS normalized for chunk hashes | 153 JS files in both. The JS differences are minifier renames caused by the reordered chunk-hash imports; JS bytes 916,289 → 916,096 (−193, the dropped SFC CSS side-effect imports). `glass-ui.css` 42,374 → 22,424 bytes. `styles/index.css` and `styles/glass.css` change as intended. 13 component CSS files newly copied under `dist/components/**` |
| tests | `vitest run` | 236/239 files, 2,308 passed, 5 failed. `boot-graph` ×3 fails as it does at baseline. `sortable-list/battery.test.ts:736` asserts `<style src="./styles.css">`. `orphan-css-partial.test.ts` fails its channel-2 self-test, whose exemplar is `_shared/field/control.css`, reached only through `<style src>` (`:451`). Both pin the channel the charter abolishes. The 10 baseline timeouts passed on this run |
| carve | `src/composables/search/*` → `src/components/dock/composables/search/` (its `unit.ts` dropped, private by position); 1 src + 3 demo + 7 test specifiers rewritten | gate: `global-zone 11 → 8`, `visibility 11 → 14` (3 demo edges into dock-private); exports drift 0 (the engine has no entry); build EXIT 0; vue-tsc ×2 EXIT 0; 21 targeted test files, 20 pass (the failure is the channel-2 self-test above). Dist: `dock.js` region comments and 1 relative path in `useDockSearch.d.ts`; 4 `.d.ts` mirror files move path |

**What broke:**

- 2 tests that pin the retired `<style src>` channel.
- The `./styles.css` payload (§6).
- Nothing in typecheck, build or the export surface.

---

## 4 · The gate, RED at HEAD

```
$ node scripts/units.mjs check          # HEAD, no manifests (E/gate-head-nomanifest.txt)
unclaimed     src has no unit.ts        … ×75
drift         package.json exports drop 68 [.,./tokens,./dark,./keyboard,./carousel,./motion] add 0 [] changed 0
drift         src/styles/index.css has no generated cascade region
dual-channel  src/components/accordion/Accordion.vue <style src="../_shared/disclosure/disclosure.css">   … ×17
dual-channel  src/styles/glass.css imports ../components/chip/accent-tone.css
visibility    src/components/_shared/overlay/participation.ts -> src/components/dock/composables/dockContext.ts (private to src/components/dock)
visibility    src/components/blob/composables/useMetaballRenderer.ts -> src/components/aurora/constants/budget.ts (private to src/components/aurora)
visibility    src/components/slider/Slider.vue -> src/components/dock/composables/useDockHold.ts (private to src/components/dock)
visibility    src/composables/motion/morph/useSelectionGroup.ts -> src/components/tabs/composables/useTabRovingFocus.ts (private to src/components/tabs)
visibility    demo/… ×7 (aurora/constants/presets ×2, aurora/composables/auroraFallbackGround ×3, aurora/composables/runtime, dock/composables/useDockState)
global-zone   … ×51
units check: FAIL — unclaimed 75 · drift 3 · dual-channel 18 · visibility 11 · global-zone 51      (real 0.50 s)
```

- The unclaimed and drift rows are the vacuous part.
- Dual-channel and visibility bite with no manifests at all, because they read position.
- Global-zone reads 51 only because no entry exists yet.

**The born-RED with manifests planted and nothing moved** (a copy of HEAD's `src`, `demo` and `package.json`, plus `seed.mjs`, in `E/gate-head-seeded.txt`):

```
drift         package.json exports differ in key ORDER only
dual-channel  … ×18
visibility    … ×11   (4 src, 7 demo)
multi-door    src/composables/motion/morph/useDockCtaReceive.ts#useDockCtaReceive on dock + motion       (dock+motion 4)
multi-door    src/composables/color/index.ts#cssToOklch on aurora + color                                 (aurora+color 4)
multi-door    src/composables/motion/core/constants.ts#DAMPING on motion + motion-core                    (motion+motion-core 3)
multi-door    src/components/blob/types.ts#BlobConfig on blob + blob-config                               (blob+blob-config 20)
multi-door    src/components/fourier-field/math.ts#positionsAt on fourier-field + fourier-math            (fourier-field+fourier-math 8)
multi-door    src/components/_shared/axes.ts#SurfaceTier on axes + surface                                (1)
global-zone   src/composables/{glass/useGlassBackdropLuminance,glass/backdropLuminanceSample,glass/backdropSampleMath,search/match,search/types,search/useFuzzySearch}.ts → dock; glass/webgl/shaders/flow.{glsl,wgsl}.ts → aurora; color/accent-tone-solve.ts → chip; motion/scroll/useScrollScene.ts, motion/spring/springProjection.ts → 0
units check: FAIL — drift 3 · dual-channel 18 · visibility 11 · multi-door 40 · global-zone 11
```

**Measured against the charter's planted list:**

- multi-door is 40 (confirmed, and equal to L13's `dup.mjs` re-run: `symbols reachable from >1 non-root subpath: 40`)
- the participation → dock breach, plus 3 more src breaches and 7 demo breaches
- dual channel 18
- owned composables 11, not 32. See Q1 scope.

**How it goes GREEN:**

1. `units.mjs write` clears drift. The channel collapse and the `glass-chip.css` move clear dual-channel. The prototype reached `visibility 11 · multi-door 40 · global-zone 11`.
2. **Common-floor rows** (PORTFOLIO §2.2):
   - one door for `useDockCtaReceive`, the aurora colour primitives and the three motion constants clears 11 multi-door
   - `useScrollScene` → demo, 1 global-zone
3. **Moves:**
   - the dock backdrop trio, the search engine (probed), the flow shaders to aurora and `accent-tone-solve` (with `useAccentTone`) to chip clear 9 global-zone
   - the four contracts named in L12-03 clear 4 src visibility
4. **Decisions:**
   - `springProjection` (module tooling)
   - the 7 demo edges: route them through entries, or give those files entries
   - the 29 deliberate multi-door symbols (§8, item 4)

---

## 5 · Migration cost (measured)

| item | count |
|---|---|
| manifests | 75 files, 332 lines (74 after the carve). 60 of them carry only an entry |
| generator/gate | `scripts/units.mjs`, 390 lines (323 code). It replaces `regen-exports.mjs`, and its CSS rules make the channel-2 half of `orphan-css-partial.test.ts` dead code |
| deletions | `subpath-policy.mjs` 388, `regen-exports.mjs` 210 |
| wiring edits | 10 lines in 8 files (§3) |
| cascade | 22 imports cut, a 36-line region, 17 `<style src>` lines, 1 file move (`glass-chip.css`, 143 lines), about 115 narration lines to relocate |
| tests re-seated | 2 (`sortable-list/battery.test.ts:736`, the `orphan-css-partial` channel-2 self-test) |
| `package.json` | exports and `typesVersions` reordered once (99 lines) |
| per carve (the search sample) | 4 files, 11 specifiers (1 src, 3 demo, 7 tests), 0 surface edits. The test mirror dir `tests/composables/search/` stays mis-mirrored until the tests ruling (L13-11) |
| colocation floor (all families) | about 100 files and 500 specifiers (PORTFOLIO §4 D1-E), not re-measured here beyond the carve sample |
| gate wiring | a test or CI step that runs `check()`. Not built here, and it counts against E-8 |
| runtime | gate 0.5 s; build 25 s; typecheck 96 s; vitest 65–68 s (unchanged) |

---

## 6 · Consumer surface

- **Export keys:** 0 added, 0 dropped, 0 retargeted (68/68). `typesVersions` 62/62, 0 changed. The only change is byte order in `package.json`.
- **`./styles`:** carries the same rule set. The 12 former `<style src>` stylesheets now arrive through the slot instead of through the folded `glass-ui.css`.
- **`./styles.css` (a payload change, not a key change):**
  - It is `dist/component-styles.css`, which imports the track registers and `glass-ui.css`.
  - The collapse moves 19,950 bytes of rules (checkbox, switch, radio-group, toggle-group, field control, disclosure, avatar, command, data-table, expandable-container, number-field and sortable-list) out of `glass-ui.css`. A consumer of `./styles.css` alone loses them.
  - A read-only sibling census found no such consumer. value.js imports both `./styles` and `./styles.css` (`demo/styles/foundation.css:62-63`); everyone else imports `./styles`.
  - Keeping the payload needs `gen-component-styles.mjs:48` (track partials plus `./glass-ui.css`) to take the slot's former SFC files as well. That membership is historical and cannot be derived.
- **Deep `dist/components/**.d.ts` paths** move with carves. They are not export-reachable.
- **The multi-door cure, if taken on the 29 deliberate symbols**, is a content break. value.js imports `BLOB_CONFIG_KEY` from both `./blob` (`demo/picker/visual/HeroBlob.vue:34`) and `./blob-config` (`demo/color-picker/composables/boot/useAtmosphere.ts:36`).

---

## 7 · The backend analogue

**glass-ui `scripts/`** (17 files):

- The manifest fields have nothing to hold here:
  - a CLI's `bin` intent is already in code, as a shebang on 6 files (`comment-census`, `import-dag`, `regen-exports`, `regen-spring-tokens`, `release.sh`, `verify-export-types`)
  - npm names are in `package.json` `scripts` (3 of 18 point into `scripts/`)
  - tools publish no entries
- A tool manifest would restate the shebang, which P-3 forbids. So the family's backend treatment is the gate without manifests:
  - **unclaimed** becomes: a file with no importer, no shebang and no npm script. Measured, this flags `lib/canon-doc.mjs` and `safari-probe.mjs`, the two X §3.1 names as dead.
  - **visibility by position** applies to the family dirs X §6.1 proposes (`scripts/<family>/`, with a shared `lib/`).
  - **global-zone** becomes "a `scripts/lib/` helper with <2 consumer families". It flags `paint-arm.mjs` (8 importers, all in `tests-visual`), `gate-register.mjs` and `comment-census.mjs`, per X §3.1.

**A sibling's backend** (value.js `api/src/modules/<domain>`, fourier's FastAPI `api/`):

- The published surface there is HTTP routes, declared in code by the router. Python's in-code manifest is `__init__.py` plus `__all__` (PEP 8, W §8.1).
- The rule that would carry over is Bazel's private default by position. Modules may import `platform/`, not each other's repository layer. The declared exceptions are import-linter `protected`/`layers` contracts (W §8.1). Its default of erroring on a stale ignore is the guard against the exception list rotting.
- The manifest adds nothing a router or `__all__` does not already say.

---

## 8 · Weaknesses (named on this tree)

1. **The manifest is a 63-row table cut into 60 files.**
   - After Q1, the only non-derivable fact is name → source. 13–14 manifests are empty `{}` and exist only to satisfy "unclaimed". Of those with fields, all but three hold only entries: `src/styles` and `src/fonts` also hold assets, and dock holds a `styles` list.
   - One central `name → path` map (PORTFOLIO §2.2 row 6; atlas `vite.lib.config.mts:32-51`, X §2.6) holds the same fact in about 70 lines. On a move, a colocated `unit.ts` travels with its directory, while a central map edits one line.
   - That placement choice is the family's whole remaining content.
2. **Visibility has no field left.** Position does the work, which is D1-B's door rule by another name. The escape hatch (`visibility: "library"`) is the exception list that Packwerk removed after it rotted (Shopify/packwerk#219).
3. **Scope counting is unresolved.**
   - Units give 11, declared families give 34, publicity-blind counting gives 51.
   - The 32 in the charter needs an Nx-style family tag that the schema does not have.
   - Public composables whose consumers are in sibling repos (`useRAFLoop`, `useYieldToMain` → speedtest, value.js per L13 §A) cannot be judged in-repo.
4. **The one-door rule hits 29 deliberate symbols.**
   - `blob+blob-config` (20), `fourier-field+fourier-math` (8) and `axes+surface` (1) are weight leaves that BI kept on purpose (`subpath-policy.mjs:183-189`).
   - At least one door pair is used live across a sibling (value.js, §6). Passing needs either a `leaf-of` field (new intent, an exemption) or a consumer break.
5. **The collapse changes `./styles.css`** (−19,950 bytes) and re-seats 2 tests. It fixes the forced-colors dev/dist divergence on `.field-control` (Q3).
6. **About 115 lines of cascade reasoning lose their anchor** (risk 5, measured). Once the order is generated, "why after `utilities.css`" (`index.css:226-235`) has to live in `menu.css`'s header or nowhere.
7. **The single-slot result is static and bounded below.**
   - The first two analysis passes missed the documented menu trap. The co-occurrence pass found it, which means template knowledge decides CSS order.
   - Dynamic `:class`, media contexts and the custom-property cascade are unmodelled.
   - Moving dock, card, dark-mode-toggle and the feedback registers from the early bands to the late slot needs a paint delta before it is trusted.
8. **The demo-route arm collides with a standing owner ruling** (P057) whose reasons hold. Its data is 97% authored, and two tests parse `manifest.ts` as text.
9. **Machinery weight.**
   - +466 code lines net.
   - Six rules in one executable. Whether E-8 counts that as 1 gate or 6 is a ruling.
   - The symbol tracer is new code. It reproduces L13's 40 and follows dynamic `import()`, but not re-exports built at runtime.
10. **"Typed" is nominal.** Manifests are evaluated literals (`Function()` in `units.mjs:44`), not type-checked. Keeping them out of `dist/` needs a new `tsconfig.build.json` exclusion (W failure mode 10).
11. **Composables-zone nested dirs cannot be private.** `motion/{core,spring,morph,…}` are reached by 16, 12 and 7 component files (`nested.mjs`). So the global zone has no internal privacy at all; the whole of `motion/` (44 files) is one flat visibility scope.

---

## 9 · Convergence and open gaps

**As chartered:**

- The four fields, the route rows and the globs are not a working spec.
- Three fields fail the derivability test, the route arm hits an owner ruling, and the globs are 8 lines.

**As developed here:**

- entries plus assets, derived wiring, and a six-rule gate
- executable on this tree
- typecheck and build green, 236/239 test files, and an exact export-key regeneration

The open items are rulings, not mechanism:

1. The consumer-counting unit for the global-zone rule: units (11) or declared families (34). If families, where the family tag lives.
2. The 29 deliberate multi-door symbols: a `leaf-of` field, or cut one door with a value.js addendum.
3. What `./styles.css` contains after the channel collapse. Either it keeps the ex-SFC set (not derivable) or it is redefined.
4. Whether demo is held to visibility. There are 7 edges at HEAD and 3 more after the search carve.
5. Where the entry table lives: per-unit manifests or one central map. This is the family's only remaining difference from the §2.2 re-key.
6. A paint check (π) for the single cascade slot, covering the four moved early bands and the two weak inversions.
7. How the gate is wired (vitest or CI) and how it counts against E-8.
8. The tests slot (L13-11). The prototype exempts tests from visibility; a colocated `tests/` per unit would need its own rule.
