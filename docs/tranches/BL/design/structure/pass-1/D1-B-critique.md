# D1 · pass 1 · D1-B-critique: sealed family modules

| field | value |
|---|---|
| seat | adversarial critic for family D1-B, D1 pass 1. Did not author the research, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4652670d`. `git diff --stat 7362b3bf 4652670d -- src demo tests tests-visual scripts package.json package-lock.json 'vite*.ts' vitest.config.ts 'tsconfig*.json'` is empty, so the prototype's tree is the tree judged here |
| inputs, read in full | `CHARTER.md` (last four paragraphs), `SPECS.md` §0, §D1-B, "Shared facts"; `D1-B.md`; `D1-B-proto.md`; the prototype's `gate/door-gate.mjs` (138 lines), `gate/trace.mjs` (211), `gate/mutate.mjs`, `migrate/plan.mjs`, `place.mjs`, `families.mjs`, `doorify.mjs` |
| instruments | `$K = …/scratchpad/D1/p1/D1-B-crit/`: the prototype's `gate/` and `migrate/` copied unchanged; `staged.sh` (the 12-stage replay with the gate after each stage); `crit-mutate.mjs` (16 plants plus C-1b); `edict-census.mjs` and `edict-census2.mjs` (placement against the edict, with door re-exports followed to the origin file by name); `doors.mjs` (door importers, door-to-door re-exports). Logs in `$K/logs/` |
| fences kept | one worktree `$K/wt` at HEAD (`node_modules` symlinked; the repo has no `tests-visual/node_modules`), removed with `git worktree remove --force` before return. A read-only `git archive HEAD src scripts package.json tsconfig.json` extract in `$K/headtree` for the surface diff. The main checkout's existing `dist/styles/index.css` was read, not built. The sibling repos were grepped read-only. No browser seat (the chrome-devtools and playwright MCP servers failed to connect). No repo edit besides this file |
| load | load averages about 42 (`uptime`) |

**Verdict: ADVANCE. Convergence 40%.**

What stands:
- The migration is deterministic. My own trace of HEAD regenerates `plan.json` byte-equal: 500 moves, 2 deletes, 16 creates.
- The 12-stage replay reproduces the prototype's gate table row for row: 805 → 7.
- The exports map stays byte-identical, and build, typecheck and pack pass.
- The gate judges the resolved file, so a relative path, the `@glass` alias and the `/src/` URL form are one case. It caught 13 of 13 of the prototype's plants and all 3 of my controls.
- R0 closes the silent-unresolved hole that shared fact 2 names.

What does not stand yet:
- **The gate checks door discipline, not placement.** 14 of 17 plants aimed at a rule's stated intent pass. On the migrated tree, 4 doors re-export a sibling's door, and 7 single-consumer files sit at the wrong level.
- **R1 and R2 reach 0 by widening doors.** The codemod grows a door for every crossing edge.
- **R6 reaches its count by a lexical cut.** Placeholder names and re-export shims result.
- **The carve trips a masked fallback** that already exists in `vite.style-fold.ts`, and the accessibility cascade regression reaches dist.

Each gap is an additive rule on the existing tracer or authoring common to every family. None needs a new primitive, so the route is worth a second pass.

---

## 1 · The key claims, re-run

| claim | command | result | matches the prototype |
|---|---|---|---|
| RED at HEAD | `node gate/door-gate.mjs wt` on the clean worktree | exit 1 · `files=1265 edges=3032 modules=69 published-doors=66: FAIL (805 violations)` · R0 0, R1 382, R2 371, R3 16, R4 2, R5 2, R6 32 | yes |
| the plan is derived, not hand-edited | `node gate/trace.mjs wt head.graph.json`; `node migrate/plan.mjs head.graph.json wt plan.json`; JSON compare against the prototype's `plan.json` | moves, deletes and creates all equal (500 / 2 / 16). My graph has 3,032 edges to the prototype's 3,030, and the edge sets are identical; the 2 extra are the `@source` duplicates its comment fix exposed | yes |
| staged replay | `bash $K/staged.sh` → `logs/staged-gate.txt` | `0 HEAD 805` → stages 1-2 exit 2 (9 unclassified dirs) → `3 config` 612 → `8 door reroute` R6=31 only → `9 file carve` 14 → `10 dir carve` R1=5 R6=7 → `12 door reroute` **R6=7**, exit 1 | yes, row for row |
| migrated gate | `node gate/door-gate.mjs wt --verbose` | exit 1 · `files=1316 edges=3284 modules=91` · R0-R5 0 · R6 7 (the same 7 files) · 2.56 s wall | yes |
| build | `npm run build` | exit 0 in 14 s · `projected 63 public entries` · 848 dist files, 0 of them test files | yes (848) |
| typecheck | `npm run typecheck` | exit 0 in 21 s | yes |
| vitest | `npx vitest run` | 111 failed, 2163 passed, 10 expected-fail, 1 skipped (2285); 32 files, of which 2 fail to collect (`route-motion`, `dissolve`) | yes, within noise: 109 in the prototype. The difference is `boot-graph` (5 here, 3 there); neither tree built `dist-demo` (shared fact 19) |
| the prototype's 13 plants | `node gate/mutate.mjs wt` → `logs/proto-mutations.txt` | 13/13 CAUGHT; restored to R6=7 | yes |
| surface | `node migrate/surface.mjs headtree wt`; `surface2.mjs` | name-slots 1277 → 1339, +106 (80 runtime), −44 (17 runtime), 12 subpaths changed; 19 names on no subpath; 25 moved; **97 newly public** | yes |

The prototype's numbers hold. The problems are in what they mean.

---

## 2 · Planted violations aimed at each rule's intent

`node $K/crit-mutate.mjs wt` plants each violation, runs the gate at `--max-lines 725`, and restores. At that bound the baseline exits 0, so a catch means exit 1 and nothing else. `git status --porcelain` is byte-identical before and after (`logs/status-before.txt` = `status-after.txt`).

**14 of 17 pass. The 3 caught are the controls plus C-1, which R4 catches only because the plant closes a cycle.**

| id | plant | gate | what it violates |
|---|---|---|---|
| C-1 | `composables/keyboard/useKeyboardShortcuts.ts` value-imports the `metric` door | CAUGHT, R4 0→1 | S7. Caught only because `metric → _shared → _shared/overlay/shortcuts.ts → keyboard` closes a cycle |
| **C-1b** | `composables/sidebar/useSidebarState.ts` value-imports the `metric` door (nothing reaches back) | **PASS** | S7, "the kernel imports no family" (B.1 Global). No rule states it; R4 finds it only when a cycle closes |
| C-2 | `composables/color/index.ts` does `export type { DockState } from "../../components/dock"` | PASS | S7 (a type-only kernel → family edge) |
| C-3 | `metric/index.ts` does `export { GlassDock } from "../dock"` | PASS | S2, "no door re-exports a sibling's door". Only the own-door half of S2 is coded (`door-gate.mjs:66`) |
| C-4 | new `composables/dom/useZzDockOnly.ts`, put on `./dom`'s door and used only by dock | PASS | edict clause 2: a single-owner composable in the global `composables/` |
| C-5 | new `_shared/ZzDockPip.vue` on the `_shared` door, used only by `DockSeparator.vue` | PASS | edict clause 1: a sub-component outside its parent |
| C-6 | door-less `components/zz-pip/` with a private file, deep-imported by dock | PASS, and the classifier is silent | the seal. A dir without `index.ts` is no module (`door-gate.mjs:45-46`), and `dirsWithIndex` (`subpath-policy.mjs:247-252`) never sees it. Leaving out the door makes a dir unsealed |
| C-7 | a 900-line `chip/zzBig.ts` whose first line is `// @generated` | PASS | R6. Any file within the first 600 bytes can opt out (`door-gate.mjs:120`) |
| C-8 | `` demo/zz-plant.ts: import(`../src/components/dock/composables/${n}.ts`) `` | PASS | R2. `trace.mjs:168` reads string literals only, and nothing records a non-literal import |
| C-9 | a test does `readFileSync(new URL("../src/components/dock/composables/useDockState.ts", import.meta.url))` and `readFileSync("src/components/overlay/sheet/styles.part1.css")` | PASS | R2. `url` edges are `pathOnly` and skipped (`door-gate.mjs:56`), and fs path strings are not traced. This is the coupling class behind 56 of the prototype's 109 failures |
| C-10 | `chip/chipVariants.ts` does `import "../../../demo/router"` | PASS | layering: library code importing the demo. `door-gate.mjs:61` drops every edge whose target zone is not `src` or `scripts` |
| C-11 | `chip/styles.css` `@import`s `../../styles/glass/mark.css` (already loaded by `glass-group/glass.css`) | PASS | S4. `src/styles/glass` has no door, so it is no module, and R3 never finds an `M` |
| C-12 | 30 flat files in `demo/zz-flat/` | PASS | edict clause 3. R6 walks `src` and `scripts` only (`door-gate.mjs:125`) |
| C-13 | 20 `*.test.ts` added to `chip/`, giving 29 direct files | PASS | edict clause 3. Tests are excluded from the file count (`door-gate.mjs:119`) |
| C-14 | `_shared/class-names.ts` does `import type { DockState } from "../dock"` | PASS; it appears only as an info line | S7. A type-only kernel ↔ family cycle is listed, not failed |
| C-15 | control: dock `?raw`-reads `overlay/modal/ModalOverlay.vue` | CAUGHT, R1 | — |
| C-16 | control: a test does `vi.mock("../src/components/dock/composables/useDockState")` | CAUGHT, R2 | — |

The prototype's 13 plants each target a rule's exact trigger. These 17 target what the spec says the rules are for. The seal on static string imports is real. The spec's other guarantees have no rule behind them: S2 one-door-per-symbol, S7 kernel direction, and the edict's placement clauses.

---

## 3 · The checklist

**Vacuous convergence: yes, in three rules.**

- **R1 and R2 reach 0 by door growth.** `doorify.mjs:6-7`: "every crossing edge is rerouted to a legal door, and the door grows the names it lacks". Stage 8 took R1 364 → 0 and R2 165 → 0 in one pass. For consumer zones the door that grows is a published one:
  - 97 names became public, including the blob shader constants and `useMetaballRenderer`, which reached `./blob` because `tests-visual` imports them;
  - 19 names left every subpath (`logs/surface2.txt`).

  Any tree can be driven to R1 = R2 = 0 this way, so the zero says only that imports name an `index.ts`. No gate pins door or surface growth. The `public-surface` test is the one independent oracle, and it is red (5 failures).
- **R6 reaches 7 by a lexical cut.**
  - 23 `.partN` files and 21 carved dirs (`carve-dirs.log`).
  - 19 of the 21 carved dirs have no door, so they are not modules and are not encapsulated.
  - Their names come from filename prefixes: `src/styles/glass/glass/`, `src/styles/glass/part-1/`, `src/styles/part-1/`, `src/styles/glass-group/`, `procedural/aurora/constants/shaders/aurora/`.
- **R4 = 0 partly because door-less dirs are "loose".** The value cycle through `src/composables/motion/{morph,scroll,route,reveal}` prints as info. Leaving out a door removes a dir from R1 and from R4 at once (C-6).

**Spec cites itself: yes, twice.**

- **The gate's oracle is written by the migration it judges.** R2's allowed set is `libraryEntryMap()` plus door contents. `NESTED_COMPONENTS` and the door growth both come from the codemod, so R2 passes against doors the codemod widened.
- **The family table is written three times**: `families.mjs` `CORROBORATED`, `NESTED_COMPONENTS` (33 rows, `subpath-policy.mjs:258-292`) and the classifier's INTERNAL list (`subpath-policy.mjs:89`). Nothing checks that they agree.

A third instance is B.1's measured claim that "20 of `_shared`'s 26 units stay [in the kernel] because two or more families import them". It is measured through barrels:

- `place.mjs` `famsOf` walks file importers.
- At HEAD, the only importer of `_shared/overlay/shortcuts.ts` and `placement.ts` is the `_shared/overlay/index.ts` barrel.
- Dock imports that barrel for other names, so dock is counted as a user.

Followed by name, those files serve overlay alone (§5).

**Gates that cannot fail:** S2 sibling doors, S7 direction, edict clauses 1-3, door-less dirs, `@generated`, non-literal imports, text reads, `src → demo`, and CSS into door-less kernel dirs. The evidence is §2, C-1b through C-14.

**Elegant-reduction trap: partly.** The script does the mechanical 90%. The load-bearing remainder is authoring, and it is stated honestly:

- 7 files over 500 lines. Both mechanical SFC routes fail: `<style src>` breaks the style-fold closure, and `<template src>` switches off template type-checking. `drag.ts` is one 523-line closure, and the metaball shaders are single literals.
- 44 placeholder names: 21 dirs and 23 parts.
- A surface review of the 97 added and 19 dropped names.
- A leaf-door design for code splitting (G12).

None is a missing primitive as hard as the problem. G12 is the one design question that is not just naming.

**Legacy aliases and dual paths: yes, smuggled in by the carve.**

- **12 re-export lines in 9 carved files keep the old paths alive** (`logs`; see the command in §8). Examples:
  - `src/index.ts:80` `export * from "./index.part1"`;
  - `procedural/aurora/composables/runtime.ts:35-36` re-exports the names it moved to `runtime.part1.ts`;
  - `scripts/census/gate-register.mjs`, `scripts/paint/paint-arm.mjs` and `scripts/publish/verify-export-types.mjs` do the same.

  Apart from the one in `verify-export-types.mjs`, 0 files import a part directly. These are re-export shims under another name, and `dist/index.part1.d.ts` ships.
- **`scripts/css/index.d.mts` is a byte copy of `scripts/css/index.mjs`** (`cmp`: equal). It is a second copy of the door's surface, and nothing checks the two stay in sync.
- **Two in-repo doors for one symbol, 4 times** (`logs/doors-wt.txt`):
  - `fields/input/index.ts → _shared` (`ControlSize`);
  - `overlay/command/index.ts → _shared`;
  - `procedural/aurora/index.ts → composables/color`;
  - `surfaces/surface/index.ts → _shared/axes` (`SurfaceTier`).

  At HEAD, input re-exported from the file `_shared/control`. The reroute turned it into a door-to-door re-export. The gate passes all four.

**Masked fallbacks: one, which already exists at HEAD, and the migration trips it.**

- **The fallback.** `vite.style-fold.ts:89-92` `terminalImportIndex` looks for `@import "./accessibility.css"`. If the anchor misses, it falls back to the `@source` offset, and failing that to -1, which the caller appends at EOF. Nothing throws.
- **How the migration trips it.** The dir carve moved the file to `src/styles/part-1/accessibility.css`.
- **The result in dist.** In the migrated `dist/styles/index.css`, `./part-1/accessibility.css` now comes *before* `../glass-ui.css` and `./components.css`. In the main checkout's existing `dist/styles/index.css`, built today from unchanged code, they come in the order `glass-ui.css`, `components.css`, `accessibility.css`. The terminal reduced-transparency, contrast and motion block now loses to component CSS.
- **Who notices.** The gate is blind to it, and no test catches it. The standing law forbids the fallback. D1-B's plan does not name the fix: a declared anchor that throws on a miss.

**Unverified gestalt: walked, and it reads as grouped, not colocated.** Three components as a newcomer finds them:

1. **Dock.** Its root dir holds 27 files, 15 of them tests.
   - `useDockCtaReceive.ts` is one file three dirs down, at `dock/composables/motion/morph/`. `useScrollChrome.ts` sits at `dock/composables/motion/scroll/`.
   - The CSS door is a four-level relay chain: `dock/styles.css → styles/index.css → styles/run/run.css → run.part1.css`.
   - The header of `dock/styles/index.css` still names `src/styles/dock/…` paths.
   - `GlassDock.vue` is still 546 lines.
2. **`overlay/menu`.** This is the best case: `radio/` and `sub/` sub-modules with doors, and tests beside source. But:
   - the family's one composable sits at `overlay/composables/motion/spring/useSpringMount.ts`, one file four dirs down;
   - `_shared/menu` became `overlay/shared-menu/`;
   - the family door is `export {};` plus that one composable.
3. **`procedural/aurora`.**
   - Aurora's shaders reach 4 levels up into `procedural/composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts`, while aurora keeps its own `aurora/constants/shaders/flow.glsl.ts`, the same filename in one family.
   - Carved names read `aurora/constants/shaders/aurora/`, `aurora/composables/{atoms,uniform}/` and `runtime.ts` + `runtime.part1.ts`.
   - The family door re-exports 26 names from `./composables/glass/…` and `./composables/motion/…`.

**The kernel's taxonomy is copied into the families.** `place.mjs:46` puts an owned composable at `<family>/composables/<its whole kernel path>`. That gives 19 dirs and 32 non-test files under `components/**/composables/{color,dom,glass,motion}/…`. A newcomer finds two `composables/glass/webgl/` trees, one global and one under `procedural`.

**Consumer-less substrate: yes.** Four family doors hold nothing but `export {};` and have 0 importers: `binary`, `fields`, `pager` and `surfaces` (`logs/doors-wt.txt`). Their only job is to make the dir a module so that R1 seals the members. A 5th, `overlay`, has 2 names and 1 test importer. The `index.d.mts` mirror has no consumer beyond making `vite.style-fold.ts` type-check.

---

## 4 · Edict fidelity

| clause | fidelity | evidence on this tree |
|---|---|---|
| components colocated with their sub-components, composables, skeletons, constants and styles, recursively | **partial** | Component files move into their families, and tests go beside source (170). But placement stops at family grain. 3 aurora-only files sit at the family level (`procedural/composables/glass/webgl/shaders/flow.glsl.ts`, `flow.wgsl.ts`, `procedural/composables/motion/scroll/useScrollProgress.ts`; the only importers are aurora files, verified by grep). The roving inversion moves a tabs-only composable, `useTabRovingFocus`, *into* the kernel to break a cycle. The recursion in B.1 is the seal's recursion, not colocation's |
| only truly module-level or global composables in `composables/` | **partial, and ungated** | On the migrated tree, 4 kernel files serve one owner (`edict-census2.mjs`, which follows door re-exports by name, then a grep): `_shared/overlay/content.ts`, `placement.ts` and `shortcuts.ts` serve overlay only, and `_shared/overlay/isTeleportedTarget.ts` serves dock only. C-4 and C-5 show the gate accepts new ones |
| long-running dirs broken into common modules and encapsulated | **no** | 19 of 21 carved dirs are door-less, so they are not encapsulated. The names are placeholders. The bound skips `demo`, `tests` and `tests-visual`: `tests-visual/` holds 177 direct files and `tests/styles/` 19. Colocated tests are not counted, so 11 `src` dirs exceed 12 files |
| the same for backend files, befitting their languages | **partial** | `scripts/` gets 6 domain doors and the same R-rules. But: 4 prefix splits with relays; `paint-arm` (8 `tests-visual` importers, no package-script use) is doored in `scripts/paint/` rather than placed beside its only consumer (4 of 6 families put it there; shared fact 18); `release.sh` stays loose. The value.js port (81 born-RED edges), import-linter and `pub(super)` are citations, not prototypes |

---

## 5 · Named counterexamples

1. `src/components/fields/input/index.ts` → `src/components/_shared/index.ts` re-exports `ControlSize`. One symbol, two in-repo doors (S2), and the gate passes.
2. `src/components/_shared/overlay/shortcuts.ts` is used by `dialog`, `popover`, `menu` and `sheet` only (all overlay) and stays in the kernel. `place.mjs` counted dock through the `_shared/overlay` barrel.
3. `src/components/_shared/overlay/isTeleportedTarget.ts` is used by `dock/composables/useDockState.ts` only, and sits in the kernel.
4. `src/components/procedural/composables/glass/webgl/shaders/flow.wgsl.ts` is imported only by `procedural/aurora/constants/shaders/aurora/aurora.wgsl.ts`, through `../../../../`.
5. `src/components/dock/composables/motion/morph/useDockCtaReceive.ts`: one file, three dirs deep, on a copied kernel path.
6. `src/components/procedural/aurora/composables/runtime.ts:35-36` re-exports what it moved to `runtime.part1.ts`, a shim that keeps the old path alive.
7. The published `dist/styles/index.css` `@import`s `./part-1/accessibility.css`, `./part-1/animations.css` and `./glass-group/glass.css`. Placeholder names reach the consumer's CSS graph, and the accessibility block now precedes component CSS.
8. `demo/shell/AppShell.vue:66`. At HEAD it read `import("@glass/components/aurora/Aurora.vue")`; migrated, it reads `import("@glass/components/procedural/aurora")`, a 128-line barrel. The eager boot graph grows by 207,621 B (prototype-measured; `boot-graph` red here too).
9. `src/composables/sidebar/useSidebarState.ts` importing the `metric` family door passes the gate (C-1b).
10. The door-less `src/components/zz-pip/` passes both the gate and the classifier (C-6).
11. `tests-visual/`: 177 direct files, never bounded.

The 19 names that left every subpath break no current consumer. A read-only grep of every sibling that depends on `@mkbabb/glass-ui` finds only local atlas symbols of the same names and a comment in keyframes.js.

---

## 6 · Convergence and open gaps

**40%.** The door seal on static string imports is sound and tested, and the whole-tree migration is real, deterministic and green on build and typecheck. The gaps below are the rest.

| # | gap | kind |
|---|---|---|
| G1 | S2 one-door-per-symbol is not coded: 4 door-to-door re-exports on the migrated tree; C-3 passes | gate rule |
| G2 | S7 (the kernel imports no family) holds only when a value cycle closes: C-1b, C-2 and C-14 pass | gate rule |
| G3 | The edict's placement clauses have no gate (C-4, C-5). The placement law measures file importers through barrels, which leaves 4 single-owner kernel files and 3 aurora-only family-level files | gate rule + placement input |
| G4 | The seal is opt-in: a door-less dir is no module, and the classifier's fail-closed check sees only dirs that hold an `index.ts` (C-6) | gate rule |
| G5 | R6 skips `demo`, `tests` and `tests-visual` (177 flat files) and does not count tests (dock root 27 files) | gate rule |
| G6 | R6 can be switched off by a `@generated` comment (C-7) | gate rule |
| G7 | The tracer does not read non-literal `import()` (C-8), fs or `new URL` text reads (C-9), `src → demo/tests` (C-10), or CSS into door-less `src/styles` dirs (C-11) | tracer |
| G8 | R1 and R2 converge by door growth. There is no pin on door or published surface growth (+106/−44 name-slots, 97 newly public, 19 dropped), and no reviewed-decision mechanism | gate rule + ruling |
| G9 | The long-dir carve is lexical: 23 parts, 21 placeholder dirs (19 door-less), and names that ship in dist | authoring |
| G10 | 12 re-export shim lines in 9 carved files; `scripts/css/index.d.mts` is a byte copy of the door | standing-law breach |
| G11 | The `vite.style-fold.ts:89-92` fallback chain masks an anchor miss. The migration trips it, and the accessibility block moves ahead of component CSS in dist | masked fallback |
| G12 | Door-only routing forbids the leaf import that code splitting needs (+207,621 B eager). No leaf-door or lazy-door construction is specified | design |
| G13 | 111 failing tests in 32 files (2 uncollected), including 56 CSS-text readers and the `gate-register` closed-record ruling | migration |
| G14 | 7 files over 500 lines need authored carves; both mechanical SFC routes fail | authoring |
| G15 | The family table is written three times with no agreement check; `forms` against `fields` + `binary` is unruled | duplicated data + ruling |
| G16 | The kernel taxonomy is copied into the families: 19 dirs and 32 files at `<family>/composables/<kernel-domain>/…` | placement |
| G17 | 4 family doors are `export {};` with 0 importers | consumer-less substrate |
| G18 | Backend: `paint-arm` is not placed with its only consumer; 4 script splits carry relays; value.js is unprototyped; no ruling on the loose-dir and type-only cycles (info lines) | backend |
| G19 | No reorder is paint-verified: 76 rules in the research seal, plus the accessibility block | π owed |

## 7 · What a second pass needs

1. **Gate rules for G1, G2, G4-G7.** Each is a few lines on the existing tracer:
   - door → non-descendant door re-export fails;
   - any kernel → family edge fails, type-only included;
   - every dir under `src/components/*` and `src/composables/*` that holds code must be a module or a kind slot;
   - R6 walks every zone and counts tests;
   - no comment opt-out;
   - a non-literal `import()` or a read of a `src` path string fails R0.
2. **A symbol-level ownership measure for placement (G3).** Follow door re-exports by name, as `edict-census2.mjs` does in 70 lines, and gate on it: a non-test file whose users sit in one module lives in that module.
3. **A door-surface pin (G8).** Snapshot every door's names, internal ones included, so that growth is a reviewed diff rather than a codemod side effect.
4. **The carve without shims (G10).** Rewrite importers onto the part, and delete the relay lines. Make the style-fold anchor a declared cascade layer that throws on a miss (G11).
5. **A leaf-door construction (G12).** For example, a per-member published leaf entry for the async component. Then the seal and code splitting can coexist.

## 8 · Commands

```sh
K=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-B-crit
node $K/gate/door-gate.mjs $K/wt                      # at HEAD: 805, exit 1
node $K/gate/trace.mjs $K/wt $K/head.graph.json && node $K/migrate/plan.mjs $K/head.graph.json $K/wt $K/plan.json
bash $K/staged.sh                                     # 12 stages → logs/staged-gate.txt; ends R6=7
node $K/gate/door-gate.mjs $K/wt --verbose            # 7 (R6), exit 1
node $K/gate/mutate.mjs $K/wt                         # the prototype's 13: 13 caught
node $K/crit-mutate.mjs $K/wt                         # 16 plants: 13 pass, 3 caught → logs/crit-mutations.txt (C-1b run by hand: exit 0)
node $K/edict-census2.mjs $K/wt                       # placement against the edict → logs/edict-census2-wt.txt
node $K/doors.mjs $K/wt                               # consumer-less doors, door→door re-exports
node $K/migrate/surface.mjs $K/headtree $K/wt; node $K/migrate/surface2.mjs $K/headtree $K/wt
cd $K/wt && npm run build && npm run typecheck && npx vitest run
cd $K/wt; for p in $(find src scripts -type f | grep -E '\.part[0-9]+\.(ts|mjs)$'); do b=$(basename $p); s=${b%%.part*}; o=$(dirname $p)/$s.${b##*.}; echo "$o $(grep -cE "^export .* from \"\./$s\.part[0-9]+" $o)"; done   # re-export relays per carved file
```
