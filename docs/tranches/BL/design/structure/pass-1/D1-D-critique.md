# D1 · pass 1 · D1-D-critique: declared strata

| field | value |
|---|---|
| seat | adversarial critic for family D1-D, D1 pass 1. Did not author the research, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7362b3bf` (the prototype's HEAD) |
| inputs, read in full | `CHARTER.md` (last four paragraphs); `SPECS.md` §0, `## D1-D`, "Shared facts"; `D1-D.md`; `D1-D-proto.md`; the prototype's `migrate.mjs`, `placement.mjs`, `placement-d-research.mjs`, `patches.mjs` (P1-P2), `plant.mjs`, and every gate module (`graph.mjs` 152, `origins.mjs` 30, `gate.mjs` 182, `gate-strata.mjs` 20, `cascade.mjs` 46, `cascade-identity.mjs` 22, `src/strata.ts` 36) |
| instruments | the prototype's scripts copied unchanged into `$C = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-D-crit/`, so its `Q/out` evidence was not overwritten. My own: `crit-plant.mjs` (27 plants), `anchor-absorb.mjs`, `foundation-owners.mjs`, `doors.mjs`, `checks.sh`. Logs in `$C/out/` |
| fences | one worktree `$C/wt` at HEAD (`node_modules` symlinked; the repo has no `tests-visual/node_modules`), removed with `git worktree remove --force` before return. HEAD baseline built from a read-only `git archive HEAD` extract in `$C/head`, not a second worktree. **One fence slip, disclosed:** a command I composed carried `git -C $C/wt add -N .`, which wrote intent-to-add and deletion entries into the worktree's own index (`.git/worktrees/wt4/index`; 558 ` A`, 552 `D `). The main repo's index and working tree were untouched (`git status` showed only the pre-existing untracked docs). No reset or restore was run; the worktree removal deletes that admin dir. vitest updated one untracked cache file through the symlink (`node_modules/.vite/vitest/…/results.json`). No other repo write besides this file; no sibling read or run; no browser seat |

**Verdict: ADVANCE. Convergence 45%.**

**What stands** (re-run here, byte for byte):
- The migration is reproducible. My run of the prototype's codemod gives the same tree as its saved `mig-tree`: `diff -rq` prints 0 lines in all six zones.
- The public surface is placement-independent.
- The rank rule over TS, Vue and CSS `@import` edges catches the 22 planted kinds, and 4 more coverage plants of mine.
- The cascade-identity idea catches what the unit suite cannot.

**What does not stand:**
- **The gate passes for reasons other than the rule.** Three exemption classes carry part of the 0: position-anchors, the root row and kind skips.
- **It misses whole edge forms.** The package self-name passes the gate, vue-tsc and the build. So do globs, `new URL`, `@source` and template imports.
- **The edict is only partly met.** D's placement law is direction between units. Colocation below the unit, the long-dir clause and the backend helper cure have no mechanism.

---

## 1 · The key claims, re-run

| claim (D1-D-proto) | my command | result |
|---|---|---|
| RED at HEAD, 301 | `node gate/scripts/bin/gate-strata.mjs $C/wt` (same gate bytes, sha256 prefixes `b5f2b196`, `334a4916`, `ee2c1b7b`, `8761eda1`) | `FAIL: 301`, exit 1: `unzoned` 183, `sideways(component)` 101, `scripts-unzoned` 11, `lib-<2-units` 4, `charter-unreadable` 1, `entry-map-unreadable` 1 |
| codemod: 550 moved, 2 deleted, 940 specifiers, 480 literals, 590 files, 20 patches | `node migrate.mjs $C/wt --apply` | identical: 1,307 files, 550 / 2, 940 (value 748, type 154, css 17, cssurl 4, url 3, mock 7, dynamic 7), 480, 590, 20 patches; residue 3 lines (two `@source` supersets, one segment run) |
| GREEN on the migrated tree | `node scripts/bin/gate-strata.mjs` | `PASS: 0`, exit 0; 1,272 files, 2,905 edges, 7 cascade roots, 11 doors |
| `--strict` gives 11 | `… --strict` | `FAIL: 11`, all `charter-owned(1 unit)` and all published |
| builds and types | `$C/checks.sh $C/wt mig` | `vite build`, demo build, `vue-tsc` (src and tests), `regen-exports` all exit 0. The demo build emits 4 `woff2` |
| exports | `regen-exports --json` | `EXACT_REPRODUCTION: true`, 68/68, fidelity 63/63; `stale: components/_shared, composables/glass, composables/motion, composables/search` |
| 22/22 plants | `node plant.mjs $C/wt` | 22 caught; `BASE` and `AFTER` both exit 0 |
| cascade identity | `node scripts/bin/cascade-identity.mjs $C/head/dist` (my own HEAD build) | `PASS: 4 cascades identical` (`./styles` 122 files and `./styles.css` modulo scope ids; `./styles/fonts`, `./styles/theme` byte-identical) |
| vitest: 10 red in `gate-register` | `npx vitest run` | 2,301 passed, 12 failed, 10 expected-fail, 1 skipped, 2,324 in all. Of the 12: 10 are `gate-register` (B1, reproduced); 1 is `boot-graph` (`dist-demo` stale because my plants touched sources after the demo build: my artifact); 1 is the `menu/contract` timing flake (B14) |
| B13: not idempotent | `node migrate.mjs $C/wt` (dry run on the migrated tree) | exit 2. Proposes 5 moves (all test-mirror, e.g. `tests/foundation/focus-veil.test.ts → tests/components/slider/`), and 5 patches still match once (P2a, P2b, P2e, P5a, P8a). Re-applying P2e would declare `SRC_OF_DIST` twice |
| B10: the size bound fails | `LIST=1 node bounds.mjs` on both trees | migrated: 15 dirs over 12 code files, 58 files over 500 lines. HEAD: 17 and 57 |
| `import-dag` shows no motion knot | `node scripts/bin/import-dag.mjs` | value module SCCs 2: M01 (demo) and `compositions/dock ↔ dock/composables`. Full SCCs 4, all intra-unit (data-table, dock, tabs). Labels stale (`data-table … #21 — library root`), as in B9 |

---

## 2 · Planted violations the prototype did not try

`node $C/crit-plant.mjs $C/wt` applies each plant alone, runs the in-tree gate with `--json`, and restores. The tree hash is `06f90ed177868d84` before and after, and the gate reads `{}` on both sides.

| id | planted | wanted | gate |
|---|---|---|---|
| C01 | `primitives/reactive/useTimer.ts` → `import type { SliderProps } from "@mkbabb/glass-ui/slider"` | `upward` | **MISSED** |
| C02 | the same file → `import.meta.glob("../../components/slider/*.ts", { eager: true })` | `upward` | **MISSED** |
| C03 | `demo/stories/manifest.ts` story glob re-pointed at `./nowhere/*/*.vue` (0 matches) | `unresolved` | **MISSED** |
| C04 | `new URL("./missing.wasm", import.meta.url)` in a primitive | `unresolved` | **MISSED** |
| C05 | `new URL("../../components/slider/Slider.vue", import.meta.url)` in a primitive | `upward` | **MISSED** |
| C06 | `@source "../src/components-gone/**/*.vue"` in `demo/demo.css` | `unresolved` | **MISSED** |
| C07 | a dead `src/leftover.ts` (an anchor by position) | `charter-0-unpublished` | **MISSED** |
| C08 | `src/motion.ts` ↔ `src/motion-core.ts` import cycle | `stratum-cycle` | **MISSED** |
| C09 | a new `src/patterns/dock-bits/hold.ts` with no charter row, imported by button and slider | `charter-row-missing` | **MISSED** (the `src/patterns/` root row absorbs it; M07 was caught only because substrate has no root row) |
| C10 | `src/patterns/feedback/button-only.css`, `@import`ed only by button | `charter-owned(1 unit)` | **MISSED** (the consumer rule reads `.ts`/`.vue` only, `gate.mjs:172`) |
| C11 | `src/foundation/slider-only.ts`, imported only by slider | `charter-owned(1 unit)` | **MISSED** (foundation is one unit outside the charter) |
| C12 | an implementation appended to `patterns/overlay/index.ts` (not a door), used only by button | `charter-owned(1 unit)` | **MISSED** (`index.ts` is skipped, `gate.mjs:172`) |
| C13 | `components/button/styles/index.css` (`@import "../styles.css"`) loaded by `Button.vue` `<style src>` | none: it is legitimate colocation | **FALSE POSITIVE**: `upward src/components/button/ -> anchor:src/components/button/styles/index.css` |
| C14 | deck's cascade root `components/deck/styles/index.css` → `@import "../../slider/styles.css"` | `sideways(component)` | **MISSED** (the source is an anchor) |
| C15 | `type X = import("../../components/slider/types").SliderProps` in a primitive | `upward` | caught |
| C16 | `export * from "../../components/slider/types"` in `primitives/reactive/index.ts` | `upward` | caught |
| C17 | ``import(`../../components/${n}/index.ts`)`` in a primitive | `upward` | **MISSED** |
| C18 | `import "/src/components/slider/types"` in a primitive | `upward` | caught |
| C19 | CSS `@import` cycle `compositions/card/styles.css` ↔ `compositions/dock/styles/dock.css` | `stratum-cycle` | **MISSED** (CSS edges are excluded from acyclicity, `gate.mjs:91`) |
| C20 | `scripts/bin/import-dag.mjs` imports `./profile-bundle.mjs` | any (thin bin) | **MISSED** (no rule) |
| C21 | `src/compositions/zzz/thing.ts`, which composes nothing | any | **MISSED** (no rule) |
| C22 | a 700-line module in `components/button/` | any (the bound) | **MISSED** (no rule; D.1 clause 9 unbuilt) |
| C23 | `src/composables/useGlobalThing.ts` (the edict's named global dir) | — | `unzoned`: the gate forbids the edict's own name |
| C24 | the `reactive` row's reason reduced to `"x"` | `charter-row-shape` | **MISSED** |
| C25 | `import meta from "./meta.json"` in button, with the file present | none: it is legitimate | **FALSE POSITIVE**: `unresolved` (the graph lists no `.json`) |
| C26 | `patterns/feedback/ButtonOnly.vue` used only by button | `charter-owned(1 unit)` | caught |
| C27 | `tests/misc/slider.planted.test.ts`, outside the strata mirror | any | **MISSED** (the mirror is not gated) |

**Tally.**

| outcome | count |
|---|---:|
| caught (coverage) | 4 |
| false positives | 2 |
| the edict-name probe (C23) | 1 |
| missed | 20 |

Of the 20 misses:

| kind | count | plants |
|---|---:|---|
| a rule the gate states and does not apply | 8 | C01, C09, C10, C11, C12, C14, C17, C19 |
| edge kinds the spec's D.3 list omits | 5 | C02-C06 |
| the positional anchor rule | 2 | C07, C08 |
| no rule claimed | 5 | C20, C21, C22, C24, C27 |

**C01 end to end.** With a value import (`import { Slider } from "@mkbabb/glass-ui/slider"` in `useTimer.ts`):

- the gate prints `PASS: 0`;
- `vue-tsc --noEmit` exits 0;
- `vite build` exits 0.

The build resolved the self-name through the package's own `exports` to the previous `dist/`. It then bundled that stale output into the `./reactive` chunk: `dist/useTimer-C01ejf7D.js` opens `//#region dist/useReducedMotion-D8A4vYlX.js`.

The gate's own header says "every rule judges the RESOLVED file". For this form nothing is judged, because `graph.mjs:46` returns `null` for any bare specifier. SPECS §0 lists `@mkbabb/glass-ui[/sub]` among the specifier forms. The source was restored and dist rebuilt; `cascade-identity` read `PASS: 4` again.

---

## 3 · The checklist

### 3.1 Vacuous convergence. Yes, in part.

The 0 is real for the rank direction over TS, Vue and CSS `@import` edges between units: M01-M06, M18, M20, M21 and C15, C16, C18 all bite. The rest of the 0 comes from exemptions.

- **Cascade-root anchors.** `node $C/anchor-absorb.mjs $C/wt` ranks each `@import`-only stylesheet as a member of its own dir. That makes 21 more rank violations. 20 come from `foundation/index.css`, the published `./styles` entry, which is a legitimate door. **One is a real inverted dependency:** `foundation/glass.css:68 → components/chip/accent-tone.css`. The research seat's §9 says this edge was reported "until cascade roots became anchors". So the rule was widened to pass this edge; the dependency was not cured. M-D2 shows why it is load-bearing: moving the `@import` drops chip band strength from 22% to 18%.
- **The root row.** SPECS D.1 clause 2 gives each lower stratum "one root row". `rowOf()` is a prefix match, so a root row covers every file in its stratum, and `charter-row-missing` can then never fire. The prototype has a root row only for `patterns/`, and C09 passes there. M07 was caught only in `substrate/`, which has none.
- **Kind and position skips in the consumer rule:** CSS (C10), all of `foundation/` (C11), `index.ts` barrels (C12), and every file directly under `src/` (C07). The edict names styles. As a proxy, `node $C/foundation-owners.mjs $C/wt` finds 45 of 79 foundation stylesheets that define classes. Of those, 6 have classes only one unit's `.vue`/`.ts` text mentions. Three of the six are in component or composition units: `glass/dissolve.css` → toast, `glass/surface-axis.css` → tabs, `paper.css` → card. The rule never evaluates them. This is a class-name text search, not a proof of ownership.
- **The owner ruling.** `--strict` reads 11 on the migrated tree: dock 4, chip 2, constellation 2, easing 1, slider 1, aurora 1. The 0 holds only if a public door counts as a consumer unit (D.6 gap 1).

### 3.2 Spec-cites-itself circularity. Yes, in three places.

1. **The spec describes D′'s choice as D's.** D.1 says "`pager-dots` is declared a composition rather than promoting deck's five-file core", and that "the minimal promotion set is 9 files". Full D does the opposite. `COMPOSITIONS_D` leaves pager-dots a component, and `mapD` promotes deck's five-file core to `patterns/pager/`. Counted from `migrate-report.json`, full D moves 11 files out of component or composition dirs, and 18 into lower strata in all.
2. **The gate was calibrated to the tree it judges.** Each exemption in 3.1 entered while making the authored placement pass: the cascade-root anchor, the root row, and the `index.ts` skip. The placement is itself an authored table: 28 `PROMOTE_DPRIME` entries plus zone regexes in the research seat's `mapD`, which the prototype imports verbatim. The gate then certifies it.
3. **"Published" is keyed on the classification tables the migration carried over.** `libraryEntryMap()` still classifies `primitives/` as tier `composable` and keeps 4 stale rows. The gate reads its doors from that map. My re-run reproduces the numbers, so this is not fabrication. It does mean the judge and the judged share one lineage.

### 3.3 Gates that cannot fail

**By construction:**

| rule or check | why it cannot fail as specified |
|---|---|
| `charter-row-missing` | cannot fire under the spec's root-row clause (3.1) |
| `charter-row-shape` | checks only that the reason is non-empty; `"x"` passes (C24) |
| the size bound | not a rule (C22) |
| composition class | nothing requires a `compositions/` unit to compose (C21) |
| the test mirror | not gated (C27) |
| thin `bin/` | not gated (C20) |

**The opposite case, the cascade arm.** It fails on any intended CSS change, not just on the moves it was built for. I appended one rule (`.planted-legit { outline-offset: 1px; }`) to `components/button/styles.css`, rebuilt, and ran it against the HEAD dist: `FAIL: 1 cascade(s) differ`. Restored and rebuilt: `PASS: 4`.

- As a "release arm compared with the previous build" (D.2), it is red on every release that touches CSS.
- The spec does not say where the baseline comes from in a release: the last tarball, or a committed snapshot.
- It is sound as a check on move-only diffs, and nowhere else.

### 3.4 The elegant-reduction trap. Yes, on the edict's two core clauses.

- **Recursion below the unit.** D.1 says "inside a unit, colocation is full and recursive" and "intra-unit edges and cycles are free". The gate treats a unit as a bag, and nothing places a nested component with its parts. Dock keeps each nested component's parts in kind dirs: `DockCrossfade.vue` sits at the dock root, `composables/dockCrossfadeContext.ts` in `composables/`, and `styles/crossfade.css` in `styles/`. `DockControl.vue` and `styles/controls/` are split the same way.
- **Long dirs.** Clause 9 carves "into sub-dirs inside itself", and §9 of the prototype says that needs authored names (Shared fact 11). Nothing was carved, and the bound is not a rule.

Both clauses rest on "and then the hard part". The stem match in 3.7 (dock: `Crossfade` pairs `DockCrossfade.vue`, `dockCrossfadeContext.ts` and `crossfade.css`) suggests a cheap first cut exists. D has not proposed it.

### 3.5 Legacy aliases or dual paths. Five, none of them a re-export shim.

No re-export shim or dev-condition export was found. The `isTeleportedTarget` re-export was dropped, and `exports` is unchanged by JSON equality.

1. **`SRC_OF_DIST` keeps the retired names in `dist/`.** The src stratum `foundation/` ships as `dist/styles/` (80 files) and `dist/fonts/`, and also as `dist/foundation/` (2 `.d.ts`). One stratum, two dist names. The export keys would not change if the targets pointed at `dist/foundation/`. The dist names were kept only to keep the targets byte-identical.
2. **`subpath-policy.mjs` still speaks the old vocabulary.** It names tier `composable` for `src/primitives`, and keeps 4 stale class rows (`_shared`, `glass`, `motion`, `search`) that `regen-exports` reports as `stale`.
3. **The test tree runs two layouts at once.** 19 files sit in 7 legacy namespaces beside the strata mirror: `tests/styles` 10, `tests/composables` 2, `tests/components/{a11y 2, control-bit 1, custom 1, field 1, ui 2}`.
4. **Two import-graph builders.** `scripts/domain/strata/graph.mjs` sits beside `scripts/bin/import-dag.mjs` (628 lines). The latter's `OWNER_MANIFEST` is keyed on HEAD dir names, and its labels are now stale.
5. **Three specifier forms into `src`.** Relative, `@glass/` and `/src/` are kept by design ("keeping its form"). This was not introduced by D, and D does not reduce it.

### 3.6 Masked fallbacks. Two.

- **Silent drops in `graph.mjs`.** It drops every bare specifier (`graph.mjs:46`), including the package's own name (C01). It records `url` and `glob` edges but never fails on them (C03, C04). A stale glob or a broken `new URL` passes silently, which is the same class as the `demo.css` font break the prototype found (B2) and cured only for `url()` in CSS.
- **The literal-path pass rewrote prose into false statements.**
  - 46 lines in 26 `src`, `scripts` and `build` files still name the old layout. Among them are the numbered load-order comments of `foundation/index.css`, the manifest a reader uses to learn the cascade.
  - One rewrite turned a true comment false. `subpath-policy.mjs:140` now says `src/compositions/dock/search/index.ts` "puts the dir into `dirsWithIndex()`". But `dirsWithIndex()` scans top-level dirs only (`:266-270`), so it yields `dock`.
  - `Surface.test.ts:281` is a vacuous negative (B8).

### 3.7 Unverified gestalt. Walked on the migrated tree: dock, dialog and sheet, deck and aurora.

- **dock (`compositions/dock/`, 49 files).**
  - The owner returns read well: `search/` and `luminance/` are feature subdirs, and `composables/isTeleportedTarget.ts` came home.
  - Dock's own context and hold do not live in dock. `dockContext.ts` and `useDockHold.ts` sit in `patterns/overlay/`. Six dock files import them through `../../patterns/overlay/…`, and so does `slider/Slider.vue`.
  - The overlay charter reason names "the dock context key". An inner stratum names an outer entity, which is the Clean Architecture rule the research seat itself cites.
  - Nested components are not colocated with their parts (3.4).
  - A reader must know dock composes other components to find it under `compositions/`.
- **dialog and sheet.**
  - `ModalOverlay.vue` and `sheet-motion.ts` sit in `patterns/overlay/`. Dialog imports `scrimOpacity` from a file named after sheet.
  - 4 of 6 sheet tests land in `tests/components/dialog/` (B7).
- **deck, pager and aurora.**
  - Deck keeps `DeckSlide.vue`, `DeckStage.vue` and `styles/`, while its core sits in `patterns/pager/` under deck's names: `useDeck.ts`, `useDeckSnap.ts`, `slideContext.ts`.
  - Aurora's `budget.ts` sits in `substrate/gpu/webgl/`.
  - `aurora/constants/shaders/` grows from 14 to 16 files, with the returned `flow-field.glsl.ts` beside aurora's own `flow.glsl.ts`.

**Reading.** The tree reads as a layered library: six strata and a root. It does not read as colocated components. 11 files leave component or composition dirs, and 10 return to one (9 from `composables/`, plus `isTeleportedTarget`).

### 3.8 Consumer-less substrate

- **Nothing invokes the gate or the arm.** `gate-strata.mjs` and `cascade-identity.mjs` have 0 invokers: `grep` over `package.json`, `scripts/bin/release.sh`, `.github` and every `.ts`/`.mjs`/`.sh`/`.json`/`.yml` outside `node_modules` finds only the two files themselves.
- **`scripts/lib/` is an empty tier.** It exists as a rule (`lib-<2-units`) with 0 files.
- **`src/strata.ts`** is library-less source inside `src/`. Its consumers are the gate and one test fixture that now depends on it staying unimported (P7). It is excluded from declaration emit (P6).

---

## 4 · Edict fidelity

| edict clause | on this tree | counterexample |
|---|---|---|
| components colocated with sub-components, composables, skeletons, constants, styles, **recursively** | **partial.** Unit-level only. 10 owner returns improve it; 11 promotions reverse it; nothing below the unit | `compositions/dock`: `DockCrossfade.vue` / `composables/dockCrossfadeContext.ts` / `styles/crossfade.css`; `patterns/overlay/dockContext.ts`; `patterns/pager/useDeck.ts` |
| only truly module-level or global composables in a `composables/` dir; otherwise colocated | **mostly, renamed.** 10 `composables/` dirs, all inside units. The 59 global hooks live in `primitives/`, `substrate/` and `patterns/`, none named `composables/`, and the gate flags the edict's `src/composables/` as `unzoned` (C23). 9 unit hooks sit outside their unit's `composables/` (`carousel/useCarousel.ts`, `toast/use-toast.ts`, `sheet/detents/use.ts`, …). 11 single-owner hooks stay global on the door-counting ruling | C23; the `--strict` 11 |
| long-running dirs broken into encapsulated common modules | **not done, not gated** | 15 dirs over 12 files, 58 files over 500 lines. The migration grows three: `tests/compositions/dock` 22 (was 16 at `tests/components/custom/dock`), `tests/primitives/motion` 21, `aurora/constants/shaders` 16. `src/foundation/glass` holds 28 files in one dir |
| the same for backend files, befitting their languages | **half.** The tiers exist (`lib/domain/build/bin`), and `paint-arm`, `canon-doc` and `minify-css` are placed. The helpers are not shared. The CLIs are not thin | `scripts/lib/` 0 files; sha256 in 5 files, `readdirSync` walkers in 9, location-derived roots in 9 (the new gate adds a walker and a root of its own). CLIs over 500 lines: `profile-bundle` 938, `gate-register` 739, `comment-census` 725, `import-dag` 628, `reflect-capture-verify` 583, and `verify-export-types` 1,079 inside `domain/`. The sibling-backend carry (value.js `api/`, import-linter, Rust) is prose with no probe |

**Full D against D′.**
- The edict names `composables/` as the global home. D′ keeps `src/composables/` and costs 19 moves (D1-D §8.1). Full D renames it away and costs 550 moves.
- The 37 component ↔ composition flips in history cost one row each under D′, and a directory move each under D.
- On the edict's own wording, D′ is the more faithful variant, and the prototype did not build it.

---

## 5 · Open gaps (exact list)

1. **The self-name bypass (C01).** Resolve `@mkbabb/glass-ui[/sub]` through `libraryEntryMap()` (name → src path), and fail closed on an unknown subpath.
2. **Edge kinds that are not fail-closed:**
   - `import.meta.glob` (C02, C03);
   - `new URL(…, import.meta.url)` (C04, C05);
   - Tailwind `@source` (C06);
   - template-literal `import()` (C17).

   D.3's edge list omits all four.
3. **The anchor rule is positional and syntactic.** It admits dead code (C07) and anchor cycles (C08), exempts cross-component CSS (C14), and flags a colocated style manifest (C13). The cure: anchors are exactly the entry-map files plus the CSS export entries.
4. **`foundation/glass.css:68 → components/chip/accent-tone.css`** is exempted, not cured. It needs `@layer` ordering or the rule moved, and a paint check.
5. **`charter-row-missing` cannot fail** under the spec's root-row clause. It misses in the prototype's `patterns/` (C09).
6. **The consumer rule skips** lower-strata CSS (C10), all of `foundation/` (C11) and `index.ts` barrels (C12).
7. **Stratum acyclicity ignores CSS edges** (C19).
8. **PASS 0 is conditional on the door ruling** (D.6 gap 1): `--strict` reads 11.
9. **No mechanism or gate for recursive colocation below the unit.**
10. **No size-bound rule** (C22). 15 dirs and 58 files over the bound, and the migration grows three dirs.
11. **Promotion de-colocates 11 files and names patterns after components.** The DIP neutral key (D.6 gap 3) is not built.
12. **Composition class is not gated** (C21).
13. **The test mirror:**
    - it is not gated (C27);
    - it is not a fixed point (5 moves on a re-run);
    - it leaves 19 files in 7 legacy namespaces;
    - it misplaces 4 sheet tests.
14. **The migrated tree is not green.** 10 `gate-register` tests fail on a sealed BK roster (B1), and one negative is vacuous (B8).
15. **The cascade arm fails on every intended CSS change,** and its release baseline is unspecified. Restate it as a move-only check.
16. **The gate and the arm are wired to nothing,** and their place in the E-8 budget is undecided (D.6 gap 6).
17. **Dual naming kept:**
    - `SRC_OF_DIST` (`dist/styles` and `dist/fonts` beside `dist/foundation`);
    - tier `composable` → `primitives`;
    - 4 stale class rows.
18. **Two import-graph builders** (`graph.mjs` and `import-dag.mjs`).
19. **The backend cure is half-built:**
    - empty `lib/`;
    - duplicated sha256 (5), walkers (9) and roots (9);
    - 6 CLIs over 500 lines;
    - a bin → bin import passes (C20);
    - the sibling carry is unprobed.
20. **The literal pass leaves stale prose** (46 lines in 26 files) and one false comment (`subpath-policy.mjs:140`).
21. **The spec contradicts the built D:** pager-dots and deck's core, "9 files" against 11 out of component dirs.
22. **The edict names `composables/`,** and full D bans it (C23). This needs an owner ruling, or D′.
23. **A false positive on legitimate `.json` imports** (C25).
24. **Charter reasons are unchecked prose** (C24).
25. **Owner rulings still open from D.6:**
    - compositions of compositions (gap 2);
    - `springProjection` under `scripts/domain/spring/`, now imported by the demo lab and a test, so the demo reaches into the backend tier (gap 7);
    - the demo reaching below the public doors (gap 9: 145 specifiers rewritten, unranked).

---

## 6 · Convergence and verdict

**Convergence 45%.**

What is closed:
- a reproducible whole-tree migration;
- an exact public surface;
- builds and types green;
- a rank gate that bites on its core edge kinds;
- a cascade check that sees what 2,301 tests do not;
- D.6 gap 4, the doors as anchors (with gap 3 above as its caveat).

What is open: 25 gaps.
- Gaps 1-7 are gate integrity. They are mechanical, and each has a stated cure.
- Gaps 9, 10 and 19 are the edict's recursion, long-dir and backend clauses. D's mechanism does not reach them.

**Verdict: ADVANCE**, with a directed second pass. The route is not refuted. Nothing it needs is as hard as the original problem, and its distinct contributions no other spec claims:
- declared direction with fail-closed resolution;
- the flattened-cascade check;
- the one dist↔src map.

Pass 2 must:
1. close gaps 1-7 and re-plant C01-C19;
2. build and measure D′ with the repaired gate, since it keeps the edict's `composables/` and avoids the rename churn;
3. propose a mechanism for colocation below the unit, or declare D the enforcement arm of a colocation-first family.

If pass 2 cannot answer point 3, BANK D as that arm.

---

## 7 · Reproduction

```
C=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-D-crit
git worktree add $C/wt HEAD && ln -s <repo>/node_modules $C/wt/node_modules
node $C/gate/scripts/bin/gate-strata.mjs $C/wt                 # FAIL: 301
node $C/migrate.mjs $C/wt --apply                              # 550 / 2 / 940 / 480 / 590 / 20
cp $C/gate/scripts/bin/cascade-identity.mjs $C/wt/scripts/bin/ && cp $C/gate/scripts/domain/exports/cascade.mjs $C/wt/scripts/domain/exports/
node $C/wt/scripts/bin/gate-strata.mjs [--strict]              # PASS: 0  /  FAIL: 11
REGEN=scripts/domain/exports/regen-exports.mjs $C/checks.sh $C/wt mig
node $C/plant.mjs $C/wt && node $C/crit-plant.mjs $C/wt        # 22/22; 20 of 27 missed
git archive HEAD | tar -x -C $C/head && (cd $C/head && npx vite build)
node $C/wt/scripts/bin/cascade-identity.mjs $C/head/dist       # PASS: 4
node $C/anchor-absorb.mjs $C/wt; node $C/foundation-owners.mjs $C/wt; LIST=1 node $C/bounds.mjs $C/wt
```

Logs are in `$C/out/`: `gate-head.txt`, `gate-mig*.txt`, `migrate-apply.txt`, `mig-*.txt`, `plant-repro.txt`, `crit-plant.txt`, `c01-*.txt`, `cascade-head-vs-mig.txt`, `bounds-*.txt`, `migrate-report-dry2.json`, `import-dag-mig.txt`.
