# D1 · pass 1 · D1-E-critique: unit manifests, generated wiring

| field | value |
|---|---|
| seat | adversarial critic for family D1-E, D1 pass 1. Did not author the research, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7362b3bf` (the prototype's HEAD; later commits touch only `docs/`) |
| inputs, read in full | `CHARTER.md` (last four paragraphs), `SPECS.md` §0, §D1-E, "Shared facts"; `D1-E.md`; `D1-E-proto.md`; the prototype's `units.mjs` (614 lines) and `mig/*.mjs` |
| instruments | the prototype's own `units.mjs` and `mig/phase{1..5}*.mjs`, re-run unchanged in my worktree; my scripts under `$K = …/scratchpad/D1/p1/D1-E-crit/`: `crit-mutate.mjs` (19 plants), `verify-plants.mjs`, `edict-census.mjs`, `converse.mjs`, `rule6-blind.mjs`, `shared-loose.mjs`; logs in `$K/logs/` |
| fences kept | one worktree `$K/wt` at HEAD (node_modules symlinked; no `tests-visual/node_modules` exists), removed with `git worktree remove --force` before return. A read-only `git archive HEAD src scripts package.json` extract in `$K/headtree` for the HEAD fail-closed probe. No repo edit besides this file; no sibling touched; no browser seat (the chrome-devtools and playwright MCP servers failed to connect) |

**Verdict: BANK. Convergence 35%.**

What stands:
- The exports and `typesVersions` regenerate exactly.
- The manifests are parsed as literals.
- The TS lexer and resolver judge resolved files across all five zones.
- The move engine ran 24 moves with 0 failures.

The family's distinctive placement law does not stand:

- Its visibility rule converges without removing a single breach edge.
- Its global-zone rule passes 40 files on an exemption.
- 19 of 19 new plants pass the gate.
- The one declared fact left, the name → file entry table, is the common floor's central map (§2.2 row 6) cut into 75 files.

---

## 1 · The key claims, re-run

Every row ran in `$K/wt`, with the prototype's scripts unchanged.

| claim | command | result | matches the prototype |
|---|---|---|---|
| RED at HEAD, no manifests | `node $S/units.mjs check --root $K/wt` | exit 1 · `unclaimed 75 · drift 3 · dual-channel 38 · visibility 16 · global-zone 51 · B-test-helper 2 · B-unclaimed 2 · B-lib-scope 1` (1.03 s) | yes |
| RED, manifests seeded | `phase1-seed-rewire.mjs`, then `check` | exit 1 · `drift 3 · dual-channel 38 · visibility 16 · multi-door 40 · global-zone 11 · …` (1.26 s) | yes |
| migration | phases 2–5, `units write` | 22 `@import`s cut, 17 `<style src>` removed, 40 names cut from 6 barrels, 20 files placed in 5 rounds, 2 deleted and 3 moved in the backend | yes |
| GREEN | `node scripts/units.mjs check` | exit 0 · `PASS — 0 violations` (2.53 s at load 35–60) | yes |
| build | `npx vite build` | exit 0 (8 s), `projected 63 public entries`, 846 dist files, `glass-ui.css` 22,424 B | yes |
| typecheck | `npm run typecheck` | exit 0 (16 s) | yes |
| vitest | `npx vitest run` | 5 of 239 files failed; 10 tests failed, 2,303 passed. The prototype's 7 structural failures plus `boot-graph` ×3 (no `dist-demo` was built here; shared fact 19) | yes |
| the prototype's mutations | `node $S/mig/mutate.mjs $K/wt` | 22/22 RED; tree GREEN after restore | yes |

The prototype's numbers hold. The problems are in what those numbers mean.

---

## 2 · Planted violations the gate should catch

`node $K/crit-mutate.mjs $K/wt` plants each violation, runs `units check` in a fresh process, and restores. Rows marked "after write" run `units write` first, which is the author's normal loop. `node $K/verify-plants.mjs` re-applies eight of the plants and reads the gate's own `graph()`/`tracer()` to show each planted edge exists. After all 19, `git status` is byte-identical to its pre-plant state and the tree is `PASS`.

**19 of 19 PASS.** The gate is blind to every one.

| id | plant | gate | the edge the gate itself reads | what it violates |
|---|---|---|---|---|
| C-1 | `import "./styles.css"` in `Switch.vue`'s script | PASS | `import@2 → switch/styles.css` | rule 3's "one CSS channel". The same file also sits in the region |
| C-2 | `<style>@import "./styles.css";</style>` in `Switch.vue` | PASS | `css-import@59 → switch/styles.css` | rule 3 (only `<style src>` is banned) |
| C-3 | orphan `button/zz-dead.css`, imported by nothing (after write) | PASS | region gains `@import "../components/button/zz-dead.css";` | dead CSS ships. HEAD's `orphan-css-partial.test.ts` is also blind after write: 2 failed / 7 passed before and after, `zz-dead` named 0 times |
| C-4 | dock `styles` list reversed (after write) | PASS | region: `controls.css` before `index.css` | inverts the 4 STRONG `index → controls/icon-button` pairs (D1-E Q1). The declared order is never checked |
| C-5 | `glass-chip.css` `@import "../button/styles.css"` (after write) | PASS | `button/styles.css` leaves the region | a cross-unit stylesheet edge moves a sheet out of the slot |
| C-6 | `visibility: "library"` on `aurora/composables/`, plus a demo deep import | PASS | — | the escape hatch silences a real breach |
| C-6b | the same widening on `tabs/composables/`, with no outside consumer | PASS | — | a stale exception. E.5 cites import-linter's stale-ignore error as the guard; it is not built |
| C-7 | `` import(`@glass/components/aurora/composables/${n}`) `` in demo | PASS | `nonliteral@154` (collected, never judged) | "every edge kind" and rule 0 |
| C-8 | a dead `scripts/zz-dead2.mjs` that carries a shebang | PASS | — | B-unclaimed. A shebang is the whole claim |
| C-9 | new `src/components/zz-new/` with `unit.ts` = `export default {};` | PASS | — | rule 1 is satisfied by presence |
| C-10 | sub-component unit `zz-sub/` with one consumer (button), left top-level | PASS | — | edict clause 1; there is no rule |
| C-11 | `_shared/zz-one/` with one consumer (chip) | PASS | — | edict clause 2; `_shared` is exempt from rule 6 |
| C-12 | an 81-file flat dir inside dock | PASS | — | edict clause 3; there is no size rule |
| C-12b | dead `button/zzDead.ts`, no importer | PASS | — | no dead-file rule outside `src/composables` |
| C-13 | `composables/dom/index.ts` re-exports `components/dock/useDockHold` | PASS | `reexport@51 → dock/useDockHold.ts` | a global → component (upward) edge; there is no rule |
| C-14 | `export * as zzColor from "../../composables/color"` in `badge/index.ts` | PASS | the tracer records one origin, `badge/index.ts#zzColor`; the 14 `./color` origins stay single-door | rule 5 does not trace namespace re-exports |
| C-15 | root relay `dock/zzRelay.ts` = `export * from "./composables/useDockSpring"`, reached from slider | PASS | relay edge `→ dock/composables/useDockSpring.ts` is inside dock and not judged | privacy is per file by position. One root line re-exports any private file |
| C-16 | `demo/demo.css` `@import "../src/components/card/styles.css"` | PASS | `css-import@135 → card/styles.css` | re-opens the dev/dist double load that E.2 counts as fixed |
| C-17 | `composables/dom/index.ts` `import "../../components/card/styles.css"` | PASS | `import@51 → card/styles.css` | rule 3 |

The prototype's 22 mutations each target a rule's exact trigger. These 19 target each rule's stated intent, and none of them fires.

---

## 3 · The checklist

### 3.1 Vacuous convergence. Yes, on three rules.

**Visibility, 16 → 0, with every breach edge still in place.** The phase-4 cure (`phase4-place.mjs:99-113`) lifts the private target to its unit root, or widens its dir. The root is library-wide by position. Nothing checks whether any reaching edge went away. `node $K/edict-census.mjs` and the lifted-file census on the migrated tree:

| the breach the spec counts | on the migrated tree |
|---|---|
| `participation.ts → dock/…/dockContext.ts` (M02's cut edge, shared fact 8) | `_shared/overlay/participation.ts:14 import → dock/dockContext.ts` |
| `useMetaballRenderer.ts → aurora/…/budget.ts` | `blob/composables/useMetaballRenderer.ts:8 → aurora/budget.ts` |
| `Slider.vue → dock/…/useDockHold.ts` | `slider/Slider.vue:20 → dock/useDockHold.ts` |
| `useSelectionGroup.ts → tabs/…/useTabRovingFocus.ts` | `composables/motion/morph/useSelectionGroup.ts:20 → tabs/useTabRovingFocus.ts` |
| the 7 demo breaches | all 7 present: `aurora-hero.ts:18,19 → aurora/presets.ts`; `AppShell.vue:37`, `slider.vue:13` and `tabs.vue:12 → aurora/auroraFallbackGround.ts`; `dock-search.vue:21 → dock/useDockState.ts`; `AuroraStage.vue:5 → aurora/runtime.ts` |

- **11 of 11 cross-unit edges survive.** The spec's plan (E.4 step 6) said "the four L12-03 contracts clear 4 `src` visibility". The prototype built no contract; it moved the target.
- `import-dag.mjs` still reports M02 (7 members).
- A fixed point is guaranteed by construction: any breach can be lifted, or widened when the name is taken. So GREEN says nothing about structure.

**Global zone: 40 of 85 files pass only on the "on an entry" clause.** `node $K/rule6-blind.mjs` replays rule 6 exactly (`units.mjs:521-540`) on the migrated tree:

```
composables-zone files: 85; < 2 consumer units: 40; passing ONLY because published: 40; by count: 0 units 31, 1 unit 9
```

The 9 single-unit files:

| file | its one consumer unit |
|---|---|
| `useAccentTone` | chip |
| `useClipboard` | easing |
| `useDragVelocity` | slider |
| `useCanvas2D` | constellation |
| `useRAFLoop` | dock |
| `useYieldToMain` | dock |
| `useRoutePointer` | constellation |
| `useScrollChrome` | dock |
| `useScrollProgress` | aurora |

- Where the exemption acted, it did harm. `accent-tone-solve.ts` sank into `chip/` while `useAccentTone` stayed in `composables/color/`, which added 2 upward edges (`useAccentTone.ts:64` type and `:73` dynamic → `chip/accent-tone-solve.ts`).
- It also added a value cycle: `import-dag.mjs` lists `M03 (2 members) src/components/chip · src/composables/color`.
- The gate has no cycle rule.

**Dual channel, 38 → 0, while a second channel remains.**

- `grep -rhoE '<style[^>]*>' --include='*.vue' src` gives 16 `<style scoped>` blocks. They ship through the JS channel into `dist/glass-ui.css` (22,424 B, 16 `data-v-*` scope ids).
- `vite.style-fold.ts` (586 lines) still folds that bundle in before `accessibility.css` (`:418-438`).
- C-1, C-2, C-16 and C-17 open further channels, and the gate passes each.

### 3.2 Spec-cites-itself circularity. Yes, in four places.

1. **The surface guarantee is a round trip.**
   - Phase 1 seeds the manifests from HEAD's `subpath-policy.libraryEntryMap`, and rule 2 compares `package.json` with what `write` generated from them. "68/68, 0 diffs" follows by construction.
   - The guarantee is also keyed on export keys, not names. The one independent witness, `tests/public-surface.spec.ts`, went RED ×3 on the 40 cut names (`'motion'` lost `DAMPING` and `SNAP_THRESHOLD`; the exact `'dock'` surface changed).
2. **Rule 6 consults the file the author edits.** Adding an `entries` row publishes a file and exempts it. The claim to be global certifies itself.
3. **Visibility defines privacy by position and cures by changing position.** Its convergence proof is the fixer rewriting the facts the gate reads (§3.1).
4. **Rule 1 requires manifests, and 14 of 75 hold only `{}`.** Their only consumer is rule 1. C-9 shows `{}` satisfies it for a new dir.

### 3.3 Gates that cannot fail. 19 plants in §2, plus two structural ones.

- **B-visibility has no subject.** `ls scripts` after migration shows 10 flat files and `lib/` (2 files, `minify-css.mjs` and its `.d.mts`). No `scripts/<family>/` dir exists, so the rule guards nothing outside a planted fixture.
- **The gate is wired to nothing, and the build lost its fail-closed guard.**
  - The prototype built no npm script, CI step or test that calls `check()` (E.4 step 8).
  - HEAD's `libraryEntryMap` throws on an unclassified dir (`subpath-policy.mjs:324-335`), and `vite.library.ts:1` imports it.
  - Probe on the read-only HEAD extract with `src/components/zz-new/index.ts` planted: `HEAD libraryEntryMap THROWS: subpath-policy: 1 unclassified dir(s) — components/zz-new`.
  - The same plant in the migrated tree: `migrated libraryEntryMap: no throw, 63 entries`, and `npx vite build` exits 0. Only the unwired `units check` reports `unclaimed 1`.
  - So the migration swaps a build-time fail-closed guard for a gate nothing runs.

### 3.4 The elegant-reduction trap. Yes, on three load-bearing steps.

- **Cascade safety.**
  - "Units ordered by path" is safe only by a one-time static analysis (`cssorder.mjs`, not in the gate) and a paint check that never ran (gap 6; no browser seat, here or in the prototype).
  - Cascade order is now a function of directory names. A rename, a reversed `styles` list (C-4) or a cross-unit `@import` (C-5) changes it, and the gate still passes.
- **Long dirs.** The edict's third clause is answered with "a long dir is carved into a nested dir". But the spec states no bound, the gate has no size rule, and shared fact 11 says every carve needs authored names. That step is exactly "and then the hard part".
- **Tests.** "Tests are exempt" (gap 8), and the tests tree still mirrors the old layout (R13).

### 3.5 Legacy aliases or dual paths smuggled in. Four, none of them a re-export shim.

1. **`./styles.css` stays as a key whose payload silently shrinks.** `dist/component-styles.css` now imports only the track registers and `glass-ui.css`, which is the 16 scoped blocks. A consumer of that key loses 19,950 B of rules for 12 components with no error (gap 3).
2. **`visibility: "library"` is an exception list, and the prototype uses it once.** `dock/composables/search/unit.ts` makes the search engine both dock-private by position and library-wide by manifest. There is no bound and no stale check (C-6, C-6b).
3. **The SFC-bundle fold machinery stays** (`vite.style-fold.ts:418-445`) for the second channel (§3.1).
4. **14 stylesheet headers now open with migration prose.**
   - The line reads `/* [cascade note, formerly beside this file's @import in src/styles/index.css] */` (`grep -rn "formerly beside" src --include='*.css' | wc -l` → 14).
   - `aurora/constants/shaders/glass/` names where the flow shaders came from, not what they are.
   - Both are history kept in the tree.

No path alias was added and no dev-condition export was added. `libraryEntryMap` keeps its old name as a thin wrapper over `entrySet`. It has four callers, so it is an API rather than a shim.

### 3.6 Masked fallbacks. Three.

1. **Orphan CSS is promoted to live CSS.** `cascadeSlot` (`units.mjs:151-170`) ships every component stylesheet that no stylesheet imports. A dead file cannot be flagged, because it is shipped (C-3). HEAD's orphan gate is defeated as well (§2).
2. **`./styles.css` still resolves** with 19,950 B less CSS (§3.5).
3. **`makeResolver` swallows manifest errors.** `units.mjs:266` does `try { return libraryEntryMap(root); } catch { return {}; }`, so self-name specifiers degrade to `external`. `check` still crashes later in rule 2, so the gate stays loud; `graph` does not.

### 3.7 Unverified gestalt. Walked on the migrated tree: dock, aurora, chip.

**dock** (`find src/components/dock -type f`): root files went from 11 at HEAD (`git ls-tree HEAD src/components/dock/`) to 18.

- Two `use*` composables lifted to the root (`useDockHold`, `useDockState`), and `useGlassBackdropLuminance` sank there from `src/composables/glass`. Nine more composable files stay in `composables/` (`useDockMorph`, `useDockSpring`, `useDockRun`, `useDockSearch`, `useDockShellProps`, `useDockClickIntegrity`, and three context/measure files).
- The contexts split too: `dockContext.ts` sits at the root, while `dockCrossfadeContext.ts` and `dockSwitcherContext.ts` sit in `composables/`.
- The split criterion is "reached from outside the unit", which no file states. A newcomer cannot predict where a dock composable lives.
- `composables/search/` is a generic fuzzy-search engine, marked private by position and public by `unit.ts`.

**aurora**: root files went from 4 to 9.

- `presets.ts` and `budget.ts` sit at the root, while `renderMode.ts` stays in `constants/`.
- `runtime.ts` and `auroraFallbackGround.ts` sit at the root, while 14 composables stay in `composables/`.
- `constants/shaders/flow.glsl.ts` and `constants/shaders/glass/flow.glsl.ts` are two different files with one name, and the second dir is named after its old home.

**chip**: `accent-tone-solve.ts` now lives here. Its only caller, `useAccentTone`, lives in `src/composables/color/` and reaches down into chip, so the unit reads as a solver owned by something outside it.

The tree does not read as colocated. Each unit is split across its kind dirs and its root by a criterion the reader cannot see.

### 3.8 Consumer-less substrate

| substrate | consumer |
|---|---|
| `units.mjs check` | none in the repo (not wired) |
| `units.mjs graph` | only the scratch migration scripts |
| B-visibility | 0 family dirs |
| 14 `{}` manifests | rule 1 only |
| `styles` field | 1 occupant (dock), never checked (C-4) |
| `visibility` field | 1 occupant, used as the escape hatch |

---

## 4 · Edict fidelity

| clause | D1-E on this tree | evidence |
|---|---|---|
| **1. Colocate components with sub-components, composables, skeletons, constants, styles, recursively** | Partial. It moves 10 single-consumer composables and 1 stylesheet into their consumers. There is no component-to-component rule (C-10); `_shared` is exempt (C-11); dead component files pass (C-12b). The lifts de-colocate by splitting each unit's `composables/` and `constants/` dirs (§3.7). Recursion is only "nested dirs are private", and C-15 bypasses that | §2, §3.7 |
| **2. Only truly global composables in `composables/`** | One direction only. Files leave `composables/` when they have fewer than 2 consumer units, unless published (40/85 exempt). Nothing brings a global composable into `composables/`. `node $K/converse.mjs` finds 3 composables under component roots, each reached by another unit: `_shared/useMotionAxis.ts` (5 outside units), `dock/useDockHold.ts` (slider) and `tabs/useTabRovingFocus.ts` (composables/motion). The last two were placed there by this migration. So placement depends on starting position | `converse.mjs` output |
| **3. Long dirs broken into encapsulated common modules** | Absent. No size rule (C-12). The composables zone has no internal privacy: 139 src and demo edges reach past a composables unit's barrel, against 49 through it (`motion` 76, `glass` 39, `dom` 14; `motion` holds 44 files). The flattest dirs are untouched: `tests-visual` 178 direct files, `tests/components` 43, `src/styles/glass` 27. The migration made dock's root 18 files and aurora's 9 | `edict-census.mjs` (e) |
| **4. Backend treated befittingly** | Weak. See the list below | `wc -l`; `grep` on the move residue |

Clause 4 in detail:

- **Deletion by syntax.** `safari-probe.mjs` is a hand-run CLI: it reads `process.argv[2]` as a WebDriver session. It was deleted because it lacks a shebang, while its fate is a live owner question (L05b-07, R2-01-02).
- **Runtime code in the tooling dir.** `springProjection.ts` moved to `scripts/`, so the deployed demo imports tooling: `demo/stories/motion/springs.vue:14 → ../../../scripts/springProjection`. Its test stays at `tests/composables/motion/`.
- **No carve into modules.** `scripts/` is not carved. After migration, 5 files exceed 500 lines: `verify-export-types` 1,079, `profile-bundle` 938, `comment-census` 725, `import-dag` 628, and the new `units.mjs` 614.
- **Helper duplication grows.** `units.mjs` adds a fifth repo-root definition (`units.mjs:30`, beside `gen-component-styles:9`, `flatten-subpath-types:15`, `import-dag:55` and `reflect-capture-verify:19`) and another walker, where X §3.1 asked for consolidation.
- **The flattest dir gets longer.** Two backend modules land in `tests-visual/`.

---

## 5 · Open gaps (exact list)

1. **Visibility is vacuous under relocation.** 11 of 11 breach edges survive, 8 lifted and 1 widened. A lift or widen must not count as a cure, and privacy has to be judged per symbol or per door, not per file position (§3.1, C-15).
2. **The escape hatch is unbounded, with no stale-exception error** (C-6, C-6b).
3. **Rule 6's publication exemption covers 40 of 85 files** (31 with zero in-repo consumer units). The counting unit is still unruled (spec gap 1). The exemption produced value SCC M03, `chip ↔ composables/color`.
4. **Rule 6 has no converse.** 3 composables reached by 2+ units sit under component roots, 2 of them placed there by the migration.
5. **No cycle rule and no upward-edge rule.** There are 5 `composables → components` edges, 2 of them new (C-13).
6. **"One CSS channel" is false.** 16 scoped SFC blocks ship through JS, with the fold machinery kept. Rule 3 misses JS CSS imports, inline `<style>@import`, demo CSS `@import` and TS-zone CSS imports (C-1, C-2, C-16, C-17).
7. **Cascade order is path-derived and unchecked.** The `styles` list is never validated (C-4). A cross-unit `@import` pulls a sheet out of the slot (C-5). No paint check has run (spec gap 6).
8. **Orphan stylesheets ship silently** (C-3). HEAD's orphan gate is defeated too.
9. **Fail-closed regression.** HEAD's build throws on an unclassified dir and the migrated build exits 0. The gate is unwired (spec gap 7), and `{}` satisfies rule 1 (C-9).
10. **`./styles.css` silently loses 19,950 B** (spec gap 3).
11. **Rule 5 misses `export * as`** (C-14).
12. **Non-literal dynamic `import()` is collected but never judged** (C-7; 1 at HEAD, `tests-visual/webgpu-everywhere.spec.ts:178`).
13. **Backend: syntax stands in for judgement and nothing is carved.** B-unclaimed is satisfied by a shebang (C-8); B-visibility has no subject; `scripts/` is not carved into modules (5 files over 500 lines); helper duplication grows; `safari-probe.mjs` is deleted under an open owner question; the demo now imports `scripts/springProjection`.
14. **No size bound; no encapsulation in the composables zone.** 139 deep reaches against 49 through a barrel (C-12).
15. **No rule for sub-components or `_shared`; no dead-file rule outside composables** (C-10, C-11, C-12b).
16. **Gestalt: units are split across kind dirs and roots by an unstated criterion.** Provenance survives as dir names and header prose (14 headers, `shaders/glass/`).
17. **Tests and stories are not colocated or re-mirrored** (spec gap 8; R13; `tests/components/{custom,ui}` with 63 files, shared fact 17).
18. **Owed rulings and authored re-seats.**
    - R1: 40 names cut; 7 declarations in 4 live siblings owe addenda, per the consumer-updates ruling.
    - R2: the closed-record binding of `gate-register`.
    - R3–R5: three authored test re-seats.
19. **The manifest reduces to the common floor's central entry map** (spec gap 5). 14 of 75 manifests are empty, and the one field beyond entries and assets that is used (`styles`) is never checked.

---

## 6 · Convergence and verdict

**Convergence: 35%.**

| sound (measured) | unsound (measured) |
|---|---|
| exports and `typesVersions` regenerate 68/68 | visibility (gap 1) |
| literal-only manifest parsing (M-S1, M-S2) | the global-zone exemption (gap 3) |
| TS lexer and resolver over five zones, with rule 0 (except gap 12) | the CSS channel and order claims (gaps 6–8) |
| rule 5 for named and star re-exports | the build's fail-closed guard (gap 9) |
| the move engine: 24 moves, 165 specifiers, 0 failures | the backend treatment (gap 13) |
| typecheck and build green | edict clauses 1–3 (gaps 14–17) |

**Verdict: BANK.** The route is sound as infrastructure and dominated as a placement route.

**Why not ADVANCE.** Its own research names its remaining content as "where the entry table lives" (D1-E weakness 1). The common floor already re-keys that table centrally. What D1-E adds on top is a placement law of position plus consumer count, and this critique finds it the weakest in kind: its visibility cure relocates targets instead of removing edges.

**Why not RETIRE.** Four parts are worth harvesting into whichever route advances:
- the lexer and resolver: all edge kinds, the specifier-node line, rule 0 in every zone;
- the move engine;
- the single-slot cascade analysis, once π runs;
- the derived one-door rule.

**Re-trigger.** Reopen D1-E if the gap-1 ruling picks declared families as the counting unit, or if a pass needs a per-unit declared fact beyond the entry name (a family tag, `leaf-of`, a story binding). A per-unit manifest is then the natural home.

**Reproduce.**
```
K=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-E-crit
S=…/scratchpad/D1/p1/D1-E-proto
git worktree add --detach $K/wt HEAD; ln -s <repo>/node_modules $K/wt/node_modules
node $S/units.mjs check --root $K/wt                                   # RED at HEAD
for ph in phase1-seed-rewire phase2-cascade phase3-doors phase4-place phase5-backend; do node $S/mig/$ph.mjs $K/wt; done
(cd $K/wt && node scripts/units.mjs write && node scripts/units.mjs check)   # PASS
node $S/mig/mutate.mjs $K/wt        # 22/22 RED
node $K/crit-mutate.mjs $K/wt       # 19/19 PASS (gate blind)
node $K/verify-plants.mjs $K/wt     # each planted edge is in the gate's own graph
node $K/edict-census.mjs $K/wt; node $K/converse.mjs $K/wt; node $K/rule6-blind.mjs $K/wt
```
