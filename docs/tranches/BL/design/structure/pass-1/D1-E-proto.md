# D1 · pass 1 · D1-E-proto: unit manifests, run on the whole tree

| field | value |
|---|---|
| seat | D1 pass-1 prototype seat for family D1-E (unit manifests, generated wiring) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `2b188e72`; run at `7362b3bf`. The commits between them touch only `docs/`, so the tree is the named tree |
| inputs | `SPECS.md` §0, §D1-E (E.1–E.6) and "Shared facts"; `D1-E.md` (the research seat's report and its snapshot `units.mjs.snapshot`, `seed.mjs`, `cssorder.mjs`); for the backend rule's family dirs, `X.md` §3.1 and §6.1; for the four contracts, `audit/round-1/L12.md` L12-03; for the floor rows, `PORTFOLIO.md` §2.2 |
| scratch | `$S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-E-proto/`. The gate is `$S/units.mjs`; the migration is `$S/mig/*.mjs` driven by `$S/run-all.sh`; the logs are `$S/logs/`. The migrated tree survives as `$S/proto.patch` (9,641 lines, tracked changes), `$S/proto-status.txt` and `$S/proto-untracked/` (100 new files) |
| fences kept | two worktrees, `$S/wt` (migrated) and `$S/wt-head` (clean HEAD), `node_modules` symlinked (no `tests-visual/node_modules` exists to link). Both removed with `git worktree remove --force` before return. Sibling repos: read-only grep only. No browser seat was used |

**Status: RUNS.**

- The whole tree migrates by script from a fresh HEAD worktree: `src`, `demo`, `tests`, `tests-visual`, `scripts` and the root build files. No file was moved by hand.
- The gate is a real executable. It is RED at clean HEAD and GREEN on the migrated tree. 22 of 22 planted violations turn it RED on exactly the rule they target.
- Typecheck, library build, demo build and pack all exit 0.
- vitest passes 235 of 239 files. The 7 failing tests are all structural breaks, each accounted for in §5.

---

## 1 · What ran

`run-all.sh` removes and re-adds `$S/wt` at HEAD, then runs five phases. Output: `$S/logs/run-all.txt`.

| phase | script (lines) | what it does | measured |
|---|---|---|---|
| 1 | `phase1-seed-rewire.mjs` (46) | seeds one `unit.ts` per unit root from HEAD's `subpath-policy.mjs`; rewires the 8 files that imported it; deletes `subpath-policy.mjs` (388) and `regen-exports.mjs` (210) | 75 manifests, 329 lines (61 with a field, 14 `{}`); 10 lines edited in 8 files |
| 2 | `phase2-cascade.mjs` (69) | moves `glass-chip.css` into `chip/` through the move engine; cuts every `src/styles` `@import` into `src/components`; removes every `<style src>`; plants the region before `accessibility.css`; `units write` | 22 `@import`s cut; 17 `<style src>` removed; 34 generated imports; 55 comment lines re-anchored into 14 stylesheet headers |
| 3 | `phase3-doors.mjs` (185) | one door per symbol, derived (§2.3); cuts the losing barrels at element grain; re-points every importer | 40 names cut from 6 barrels (8 statements, 11 comment lines with them); 10 import declarations split, 20 bindings re-pointed; each cut barrel lost exactly its cut names; root barrel lost 0 names, gained 0 |
| 4 | `phase4-place.mjs` (123) | the placement law as a fixed point: global-zone moves, then visibility cures | 5 rounds; 20 files moved; 149 specifiers rewritten; 7 quoted literals; 1 dir widened; 1 collision group; 1 decision |
| 5 | `phase5-backend.mjs` (24) | the backend rules as a fixed point: dead files deleted, test-only helpers moved to their tree | 3 rounds; 2 deleted; 3 moved; 15 specifiers; 7 literals |
| — | `move.mjs` (174) | the one move engine that phases 2, 4 and 5 call (§2.4) | — |

**Totals.**

| measure | value |
|---|---|
| files moved | 24 |
| files deleted | 4 |
| specifiers rewritten | 165: src 83, demo 14, tests 44, tests-visual 20, scripts 4 |
| quoted literal paths rewritten | 14 |
| edit failures | 0 |
| globs that lost a match | 0 |
| unresolved edges after | 0 |
| code lines over the five zones | 225,227 → 225,314 (+87) |

---

## 2 · The mechanism as built

### 2.1 The gate: `scripts/units.mjs` (614 lines, 513 code)

The same file serves as generator (`write`), gate (`check`) and edge census (`graph`). It takes `--root <dir>`, so one binary judges any tree.

**What changed from the snapshot**, closing the spec's two deltas (E.3) plus four more:

1. **Lexer.** The TS parser replaces the `SPEC` regex.
   - Edge kinds covered:
     - value and type import
     - value and type re-export
     - dynamic `import()`
     - `import("x")` type nodes
     - `import.meta.glob`
     - `new URL(…, import.meta.url)`
     - `vi.mock`, `vi.doMock`, `vi.unmock`, `vi.doUnmock`, `vi.importActual` and `vi.importMock`
     - `require()`
     - CSS `@import`
     - SFC `<style src>`
     - CSS `@import` inside SFC style blocks
   - `.vue` script blocks are lexed at their true line.
   - Each edge reports the line of its **specifier node**, not of the statement (defect E1, §5.1).
2. **Resolver.** It judges the resolved file, never the specifier form.
   - Forms handled: relative, `@glass/`, the `/src/` URL form, the package self-name (through `package.json` `exports`, as Node does), bare packages (through `node_modules`) and node builtins.
   - A `new URL` naming an existing directory is a location-derived root. It is recorded so moves can rewrite it, and is not treated as an edge.
3. **Rule 0 (unresolved) covers every zone**, not only src and demo. The contract said src and demo. Defect E2 (§5.1) is why it had to widen: a `vi.doUnmock` string naming a moved module is a silent edge in `tests`.
   - The one exemption is a `new URL` naming a directory that does not exist yet. That is a capture output target, not a module.
   - At HEAD, 6 such targets exist, all in `tests-visual`.
4. **Manifests are parsed, not evaluated.** The TS AST accepts only `export default { … }` built from string, array and object literals. An unknown key throws, and so does any expression (M-S1, M-S2). The snapshot's `Function()` evaluation is gone (D1-E weakness 10).
5. **Rule 3 checks the region by position.** A component `@import` in `src/styles` counts as inside the generated region only by its line offset. The snapshot skipped every edge from `index.css`.
6. **Backend rules B1–B4** follow E.5:

   | rule | fails on |
   |---|---|
   | `B-unclaimed` | no importer, no shebang, no npm script |
   | `B-test-helper` | no shebang, no npm script, and every importer in one test zone |
   | `B-lib-scope` | a `scripts/lib` file with fewer than 2 consumer families |
   | `B-visibility` | a reach into `scripts/<family>/` (other than `lib`) from outside the family |

### 2.2 RED at HEAD, GREEN migrated

| run | command | result |
|---|---|---|
| clean HEAD, no manifests | `node $S/units.mjs check --root $S/wt-head` | exit 1 · `FAIL — unclaimed 75 · drift 3 · dual-channel 38 · visibility 16 · global-zone 51 · B-test-helper 2 · B-unclaimed 2 · B-lib-scope 1` (1.71 s at load ≈ 40; 8.19 s re-run beside a vitest run) |
| HEAD, manifests seeded, nothing moved | phase 1 only, then `check` | exit 1 · `FAIL — drift 3 · dual-channel 38 · visibility 16 · multi-door 40 · global-zone 11 · B-test-helper 2 · B-unclaimed 2 · B-lib-scope 1` (1.72 s) |
| migrated | `node $S/wt/scripts/units.mjs check` | exit 0 · `PASS — 0 violations` (0.91–2.74 s at load 38–104) |

The HEAD figures differ from the spec's in two places. Both follow from reading edges more completely, not from a different rule:

- **dual-channel 38, not 18.** The 20 component `@import`s in `index.css` count once no region exists. The snapshot skipped that check when the region was absent.
- **visibility 16, not 11.** Five `index.css` edges into private `styles/` dirs are real breaches at HEAD: `dock/styles/{index,controls}`, `tabs/styles/{segmented,drag}` and `deck/styles/index`. The snapshot exempted every edge from `index.css`.

multi-door 40 and global-zone 11 match the spec exactly.

### 2.3 The door rule (phase 3), derived rather than listed

**Rule.**

1. An origin keeps the entry that lives in its own unit.
2. Among several such entries, it keeps the one whose file shares the longest path with the origin.
3. A remaining tie goes to the entry exposing fewer names, which is the leaf.

Applied to all 40:

| kept | cut | names |
|---|---|---:|
| `./blob-config` | `./blob` | 20 |
| `./fourier-math` | `./fourier-field` | 8 |
| `./color` | `./aurora` | 4 |
| `./motion` | `./dock` | 4 |
| `./motion-core` | `./motion` | 3 |
| `./axes` | `./surface` | 1 |

So the 11 floor rows and the 29 deliberate symbols (E.6 gap 2) take one rule; no `leaf-of` field was needed. That is a content break: see §5.2 R1.

### 2.4 The move engine (`move.mjs`)

**Batch rename.** One plan maps old paths to new ones.

**Rewrite, keyed on the resolved edge.**

- Every edge with either end in the plan is rewritten, in all five zones and the root build files.
- The new specifier keeps the importer's own form:
  - `@glass/` stays `@glass/`;
  - relative stays relative, except that a relative reach from `demo` or `tests` into `src` becomes `@glass/`, the repo's convention;
  - the tail keeps its original spelling (barrel directory, extension kept, `.js` standing for `.ts`, or no extension).
- `new URL` directory roots inside a moved file are rewritten.
- Quoted literal paths are rewritten in these forms:
  - `src/…`, with and without the extension;
  - `/src/…`;
  - `@glass/…` alias strings.
- A moved entry file carries its manifest row with it.

**After the batch.**

- Glob patterns are re-resolved and never rewritten. A glob that loses a match is reported (there were 0).
- A residue census lists old paths still spelled anywhere.

### 2.5 The placement law (phase 4) and the backend (phase 5)

The move targets below are this prototype's reading of "moves to its consumer". The spec gives the rule, not the slot.

| trigger | action | applied |
|---|---|---|
| global-zone, 1 consumer unit `r` | lowest common dir, inside `r`, of the file's importers that already sit in `r`. A file whose importers are themselves moving waits one round. With no importer in `r`, `r`'s root | `useGlassBackdropLuminance`, `backdropLuminanceSample` and `backdropSampleMath` → `dock/` (rounds 1–3); `flow.{glsl,wgsl}.ts` → `aurora/constants/shaders/glass/` (collision, below); `accent-tone-solve.ts` → `chip/` |
| a whole composables unit to one `r` | the dir moves whole to `<lca>/<unit name>/`; its `unit.ts` is dropped | `composables/search/` → `dock/composables/search/` |
| global-zone, 0 consumer units | the zone of its non-test importers | `useScrollScene.ts` → `demo/stories/motion/`; `springProjection.ts` → `scripts/` (consumed by demo and scripts; DECISION: scripts, since tooling produces the tokens and the demo only shows them) |
| basename collision | the moving group nests under `<target>/<source unit name>/` | `aurora/constants/shaders/flow.glsl.ts` already exists, so both flow shaders → `…/shaders/glass/` |
| visibility breach | lift the file to its unit root. If it is a barrel or the name is taken, widen its dir with `unit.ts { visibility: "library" }` | 8 lifts: `dock/{dockContext,useDockHold,useDockState}.ts`, `aurora/{budget,presets,auroraFallbackGround,runtime}.ts`, `tabs/useTabRovingFocus.ts`. 1 widening: `dock/composables/search/` |
| `B-unclaimed` | delete | `scripts/lib/canon-doc.mjs`, `scripts/safari-probe.mjs` |
| `B-test-helper` | move to the lowest common dir of its importers | `gate-register.mjs` → `tests/gates/`; `paint-arm.mjs` → `tests-visual/`; then `reflect-capture-verify.mjs` → `tests-visual/` (round 2; its only importer had moved) |

**The visibility cure lifts; it does not route through entries.** The demo's deep imports into `aurora/` are deliberate. `demo/chassis/hero/aurora-hero.ts:15-17` says a barrel import "would statically re-drag the component into the eager graph and undo the shell's async boundary". A lift keeps the leaf import. Routing through the entry would not.

**Demo is held to visibility**, and the manifests end with 1 widening, not the spec's 0 (§5.3).

---

## 3 · Toolchain, HEAD against migrated

HEAD ran on `$S/wt-head`; the migrated tree ran on `$S/wt`, both through `$S/baseline.sh`.

| step | HEAD | migrated (final run, `mig2`) |
|---|---|---|
| `vite build` | exit 0 (11 s); `declaration entries: projected 63 public entries` | exit 0 (16 s); 63 |
| demo build (`demo/vite.demo-dist.config.ts`) | exit 0; 345 assets | exit 0; 333 assets |
| `npm run typecheck` (`vue-tsc` × 2 projects) | exit 0 (24 s) | exit 0 (34 s; 106 s on the first run at load ≈ 100) |
| `npx vitest run` | 3 of 239 files failed, 6 tests, all timeouts (atoms fuzz 5 s, aurora-stage-affordance, glass-subtlety ×4); 2,307 passed (68.8 s) | 4 of 239 files failed, 7 tests, all structural (§5.2); 2,306 passed (32.0 s). HEAD's three timeout files passed in this run |
| `npm pack --ignore-scripts` | 841 files, 1,023,942 B (2,916,129 unpacked) | 850 files, 1,022,071 B (2,910,930 unpacked) |
| `node scripts/regen-exports.mjs` (check mode) | exit 0 · `exportKeys 68/68 … EXACT REPRODUCTION: YES` | deleted (spec step 2). Its role is rule 2 (drift), which passes |
| `node scripts/import-dag.mjs` | module SCCs full 3 · value 3 | module SCCs full 4 · value 4 (§5.2 R9) |
| static cascade order (`cssorder.mjs` from D1-E, both trees) | 60 order-dependent file pairs (42 strong) | 58 kept, 2 weak inverted (`dock/styles/layer-group → command`, `sheet → dialog`), 0 new pairs. Same as the spec |

**Exports and `typesVersions`.**

| check | result |
|---|---|
| exports | 68 keys, 68 keys; same set; 0 target differences |
| `typesVersions` | 62 and 62; 0 differences |
| key order | HEAD's curated insertion order becomes sorted: `package.json` 99 lines out, 99 in |

**`dist` file list** (`$S/logs/dist-files.diff`): 837 → 846 files.

| class | only at HEAD | only migrated | cause |
|---|---:|---:|---|
| flat JS chunks | 22 | 21 | 19 are hash renames of the same stem. The `presets-*` and `useDockCtaReceive-*` chunks and the `control.css_vue_type_style…` shim are gone; `control-*` and `types-*` are new. Flat JS count 153 → 152; bytes 916,289 → 915,180 |
| deep `.d.ts` mirrors | 20 | 18 | 18 moved with their files. `useScrollScene.d.ts` and `springProjection.d.ts` left `dist` because the files left `src`. No export path reaches any of them |
| CSS | 1 | 13 | `styles/glass/glass-chip.css` → `components/chip/glass-chip.css`, plus 12 former `<style src>` stylesheets now copied under `dist/components/**` |

**CSS payloads.**

| file | HEAD | migrated |
|---|---:|---:|
| `glass-ui.css` | 42,374 B | 22,424 B (−19,950, the spec's figure) |
| `styles/index.css` | 1,514 B | 2,176 B (the region) |
| `styles/components.css` | 23,678 B | unchanged |
| `component-styles.css` (`./styles.css`) | 187 B | 187 B, but it imports `glass-ui.css`, so the export loses the 19,950 bytes of rules |

---

## 4 · Mutations: RED on each claimed rule

`node $S/mig/mutate.mjs $S/wt`, output `$S/logs/mutations.txt`. Each mutation is planted, checked by a fresh `node scripts/units.mjs check`, and restored.

**22 of 22 RED.** Each fired only its targeted rule: exactly 1 violation, except M-4f, which fires 3.

**Tree after restore:** `PASS — 0 violations`.

| id | planted | fired |
|---|---|---|
| M-0 | `export … from "./does-not-exist"` in `badge/index.ts` | `unresolved 1` |
| M-0b | `vi.doUnmock("@glass/composables/color/accent-tone-solve")` in a test | `unresolved 1` (tests zone) |
| M-1 | `src/components/zz-new/` with no `unit.ts` | `unclaimed 1` |
| M-2a | `./badge` removed from `package.json` exports | `drift 1` |
| M-2b | a region line moved by hand | `drift 1` |
| M-3a | `<style src="./styles.css">` back in `Switch.vue` (M-E2) | `dual-channel 1` |
| M-3b | a component `@import` above the region in `index.css` | `dual-channel 1` |
| M-3c | `glass.css` imports `chip/accent-tone.css` | `dual-channel 1` |
| **M-4a** | **relative deep import** `import "../dock/composables/dockCrossfadeContext"` in `button/index.ts` | `visibility 1` |
| M-4b | the same as `import type` in `card/index.ts` | `visibility 1` |
| M-4c | a dynamic `import()` into `dock/composables/` from `composables/dom` | `visibility 1` |
| M-4d | `@glass/components/aurora/composables/atoms-fields` from `demo/main.ts` | `visibility 1` |
| M-4e | the same via the `/src/…ts` URL form | `visibility 1` |
| M-4f | the widening `unit.ts` removed (M-E1: the search engine dock-private again) | `visibility 3` (the demo edges) |
| M-5 | `export { useAccentTone } from "../../composables/color"` in `badge/index.ts` (M-E3) | `multi-door 1` |
| M-6 | a new `composables/dom` file used only by chip | `global-zone 1` |
| M-B1 | `scripts/zz-dead.mjs` | `B-unclaimed 1` |
| M-B2 | a `scripts/` helper imported only by a test | `B-test-helper 1` |
| M-B3 | a `scripts/lib` helper imported by one tool | `B-lib-scope 1` |
| M-B4 | `scripts/zzfam/a.mjs` imported from `scripts/import-dag.mjs` | `B-visibility 1` |
| M-S1 | `scope: "global"` in a manifest | throws `unknown field "scope"`, exit 1 |
| M-S2 | `"./index" + ".ts"` in a manifest | throws `a manifest holds only string, array and object literals`, exit 1 |

**The relative-path bypass does not arise.** M-4a, M-4b and M-4c reach the private file relatively, by type, and dynamically. Each fires because the rule reads the resolved file.

---

## 5 · Every break

### 5.1 Breaks the migration script caused, found and fixed during the run

Each was fixed in the script, and the whole pipeline re-ran from a fresh worktree.

| id | break | how it showed | fix |
|---|---|---|---|
| E1 | the lexer gave each edge the statement's line, so the specifier of a multi-line import was not on that line | 3 `unresolved` after round 1: `useDockSearch.ts:53`, `useGlassBackdropLuminance.ts:15`, `DockStage.vue:22`. The two backdrop helpers then looked like they had 0 consumers | report the specifier node's line; a quoted specifier that occurs exactly once in the file is a safe fallback |
| E2 | the lexer's `vi` pattern had `unmock` but not `doUnmock` | `use-accent-tone.test.ts:119` kept the old path, so the failing-solver mock stayed installed and 7 tests failed with "ink not yet resolved". The gate stayed GREEN because rule 0 held only src and demo | add `doUnmock`; **rule 0 now covers every zone** (M-0b pins it) |
| E3 | the literal rewriter knew `src/…` strings, not `@glass/…` strings | `boot-graph.test.ts:309` compares the literal `"@glass/components/aurora/composables/auroraFallbackGround"` (1 test failed) | rewrite `@glass/` and `/src/` string forms |
| E4 | door cuts re-rendered a partially cut export list, and deleted the comment block above a removed statement | `aurora/index.ts`'s 23-element list collapsed onto one line and lost 2 inner comments; `motion/index.ts` lost its 18-line file header | remove elements in place; a comment block that runs to the top of the file is the header and stays |
| E5 | two different files named `flow.glsl.ts` | `target exists src/components/aurora/constants/shaders/flow.glsl.ts` | the group-nesting collision rule (§2.5) |

### 5.2 Breaks that remain in the migrated tree

| id | break | evidence | nature |
|---|---|---|---|
| R1 | **One-door content break.** `./blob` loses 20 names, `./fourier-field` 8, `./aurora` 4, `./dock` 4, `./motion` 3 and `./surface` 1 | `public-surface.spec.ts` ×3: `'motion'` lost `DAMPING` and `SNAP_THRESHOLD`; the exact `'dock'` surface lost `useDockCtaReceive`. **Siblings** (read-only TS parse of 407 files importing these doors, `$S/logs/sibling-cut.txt`): 7 import declarations in 6 files across 4 live repos. value.js `demo/picker/visual/HeroBlob.vue` (`BLOB_CONFIG_KEY`, `BlobConfig` via `./blob`); speedtest `MeterColumn.vue`, `useMetricResult.ts` and `MetricGaugeCards.vue` (`DAMPING`, `SNAP_THRESHOLD` via `./motion`); atlas `useAuroraConfig.ts` and keyframes.js `HeroAurora.vue` (`OklchStop` via `./aurora`). Another 12 declarations sit in three value.js copy dirs (`value-css-totality-audit`, `value-js-x-w1-g7`, `value-xw1-demo-boot`) | intended by the rule. Each consumer owes an addendum; the test pins the old doors |
| R2 | `gate-register.mjs` moved to `tests/gates/`, but its seat is bound in closed tranche records | `gate-register.test.ts`: "seat G-GATE-BUDGET: bound to a missing file — scripts/gate-register.mjs". The binding lives in `docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json` and `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` | not curable by a script: rewriting closed records to follow a move rewrites history (shared fact 7, closed-record rosters) |
| R3 | the channel-2 self-test pins `_shared/field/control.css` as reachable only through `<style src>` | `orphan-css-partial.test.ts:469` | spec E.4 step 4 re-seat, not done: authored test content |
| R4 | the dead-SFC fixture is `join(SRC, "composables", "motion", "scroll", "useScrollScene.ts")` | `orphan-css-partial.test.ts:433`, "the referrer must genuinely exist on disk". A path built from segments is invisible to every rewriter | floor row 3 re-seat (PORTFOLIO §2.2), not done |
| R5 | `sortable-list/battery.test.ts:736` asserts `<style src="./styles.css">` | 1 test | spec E.4 step 4 re-seat, not done |
| R6 | `./styles.css` payload −19,950 B | §3 | open gap 3. value.js imports both `./styles` and `./styles.css` (D1-E §6) |
| R7 | **Demo first-paint CSS grows.** 12 lazily injected SFC CSS chunks are gone from `dist-demo` (Checkbox, Switch, ToggleGroupItem, data-table, command, number-field and others), and their rules load eagerly | demo entry CSS 355,287 → 377,489 B (+22,202); demo assets 345 → 333; total demo CSS 426,348 → 428,360 B | a consequence of the single channel that the spec does not name |
| R8 | cascade | 2 weak pairs inverted, as in the spec. `tabs/styles/drag.css` now precedes `segmented.css` (the path order); HEAD had it after, and its comment claims unique selectors, so it is not an order-dependent pair. No paint check (π) was run | open gap 6 stands |
| R9 | **A new value cycle, `chip ↔ composables/color`.** `accent-tone-solve.ts` sinks to `chip/` because `useAccentTone` stays on `./color`, which the counting rule reads as published | `import-dag.mjs`: module SCCs value 3 → 4. M02 (7 members) and dialog↔sheet persist | the law, as specified. The spec's plan ("with `useAccentTone`") keeps the cycle too, as long as `./color` exposes `useAccentTone`. D1-E's gate has no cycle rule |
| R10 | **the visibility escape hatch is used once** (spec target state: 0) | `dock/composables/search/unit.ts` holds `{ visibility: "library" }`. `demo/stories/data/search.vue` and `dock-search.vue` import the engine's barrel, and `dock/index.ts` already takes the name | open gap 4, measured: holding demo to visibility requires the field |
| R11 | **names the law had to invent** | `aurora/constants/shaders/glass/` (from the source unit's name). Unit roots gained 12 files: dock 6, aurora 4, tabs 1, chip 1 | shared fact 11: the graph does not name things |
| R12 | reason prose left orphaned | 55 lines were re-anchored into 14 stylesheet headers. One was misattributed: the `hover-popover.css deleted` note now heads `tabs/styles/segmented.css`. `index.css`'s 160-line header still lists the old component positions. `motion/index.ts`'s header still says constants ship on `./motion`. 11 comment lines in 11 files still name a moved or deleted path (0 in code) | prose work, not done |
| R13 | tests mirror moved sources from their old places | `tests/composables/search/*` tests `dock/composables/search`; `tests/composables/glass/backdropLuminanceSample.test.ts` tests `dock/`; `tests/composables/motion/springProjection.test.ts` tests `scripts/` | tests are exempt (open gap 8) |

### 5.3 Where the build departs from the spec

| # | the spec says | the build does |
|---|---|---|
| 1 | rule 0 covers src and demo | covers every zone (E2 is the reason). One exemption: a `new URL` directory that does not yet exist |
| 2 | visibility skips edges from `index.css` (the snapshot) | skips only edges inside the generated region. HEAD therefore reads visibility 16 |
| 3 | the visibility field holds "0 in the target state" | holds 1 (R10) |
| 4 | move `accent-tone-solve` "with `useAccentTone`" to `chip` | the law moves `accent-tone-solve` alone, to `chip/`'s root. `useAccentTone` is on an entry, so it stays (R9) |
| 5 | the backend global-zone rule flags `paint-arm`, `gate-register` and `comment-census` | `comment-census.mjs` has a shebang, so the rule as built treats it as a CLI and leaves it. `reflect-capture-verify.mjs` follows `paint-arm` into `tests-visual/` (round 2) |
| 6 | the spec's 11 floor multi-door and 29 deliberate symbols need a decision | one derived door rule settles all 40 (§2.3) |
| 7 | the prototype gate took 0.5 s | 0.9–2.9 s on the migrated tree at load 38–104; 1.7 s at HEAD. It lexes all five zones with the TS parser, 1,268 files at HEAD |
| 8 | `glass-chip.css` moves into `chip/` | done, as a spec-named move through the engine. No rule computes it |

---

## 6 · Where it stopped, and why

| stopped at | why |
|---|---|
| **paint (π)** | not run: the prototype had no browser seat. The two weak inversions, the late slot for dock, card and dark-mode-toggle, and R7's eager CSS all lack a paint delta |
| **Playwright visual suite** (`tests-visual`) | not run. Every `tests-visual` specifier resolves (rule 0 over every zone passes). The moved `paint-arm.mjs` and `reflect-capture-verify.mjs` load under Node 26 (20 and 18 exports) |
| **authored re-seats** (R3, R4, R5), the prose (R12), `design-idioms.md` §7 (floor row 7), and floor rows 2, 4 and 5 (dead doors, `./tokens` preset, `./sidebar`) | not attempted. They are authored content, not placement. D1-E needs none of them to reach GREEN |
| **tranche records** (R2) | the migration may not rewrite history |
| **gate wiring** into vitest or CI (E.4 step 8) | not built |

---

## 7 · Reproduce

```
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-E-proto
$S/run-all.sh                            # fresh worktree at HEAD → five phases → units write → units check (PASS)
$S/baseline.sh $S/wt mig2                # build, demo build, pack, typecheck, vitest → $S/logs/mig2-*
node $S/mig/mutate.mjs $S/wt             # 22 mutations, each RED, tree restored GREEN
node $S/units.mjs check --root <clean HEAD worktree>   # RED at HEAD
```
