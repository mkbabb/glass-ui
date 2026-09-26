# D1 pass 5 · B-S11 + B-S16 split rows, tests-visual zone

Seat: SPLIT-AUTHOR, route D1-B, zone `tests-visual`. Model claude-opus-5-5, asserted from the seat's own identity. Every number below comes from a command this seat ran on 2026-09-26. The commands and their filtered output are in `pass-5/B-kit/authored/splits/tests-visual/results.txt`. This seat authors rows. It landed nothing in the chain and edited no tracked file in the checkout.

Two arms:

- **Arm C** is the route's tree: 5e278aa7 plus the pass-4 chain, replayed by `pass-4/B-kit/replay.mjs` (digest `6618df1f…8685c`).
- **Arm F** is HEAD 7cd975eb plus the P5 floor rows.

## 1 · Result

- **Carve.** B-S16 carves the flat `tests-visual/` into 21 named modules. One spec moves into its unit's `__tests__/` slot as `*.visual.ts`, and one dead file is deleted.
- **Splits.** B-S11 splits all 8 files of the zone over 500 lines into named parts. No file needed a counterexample.
- **Program first.** The Playwright program is edited before any spec moves, so the runner collects the same 1,989 tests throughout.

| reading | before | after |
|---|---|---|
| `playwright test --list`, arm C | 1,989 tests in 167 files | 1,989 tests in 168 files; (project, title) diff **0** |
| same, arm F | 1,989 in 167 | 1,989 in 168; diff 0 |
| browser seat, the 7 split or slotted specs, arm C | 36 tests: 18 passed, 16 failed, 2 skipped | 36: 18 / 16 / 2; per-title status changes **0** |
| `bounds.mjs`, tests-visual dirs over 12 / files over 500 (arm C) | 1 / 8 | **0 / 0** |
| seal on arm C, with `gate.json` | B0 444 · B2 67 · B6 62 | B0 444 · **B2 59 · B6 53** · B16 0 |
| same, without `gate.json` | — | B0 445 · B2 59 · B6 53 · **B16 1** (§5.2) |
| F-1 graph, arm C | 7,976 edges, 0 violations | 7,994 edges, 0 violations |
| engine image (move.mjs), arm C / arm F | 7,976 / 7,605 | 7,976 / 7,605; 0 lost, 0 gained, 135 move-only, SCC growth 0 |
| rebase row image, arm C / arm F | 7,976 / 7,605 | same; 0 lost, 0 gained, 36 move-only, 0 unclassified |
| `conserve.mjs` (every source line lands in an output) | — | 8/8 arm C, 6/6 arm F |
| `vue-tsc` app and test programs | — | exit 0, both arms |
| build (dist sha256 list) | 890 files (C), 834 (F) | byte-identical on both |
| `verify:package` | 2,930,810 B (C), 2,913,546 B (F) | same: 0 B (the known pass-4 ratchet reds on both arms) |
| vitest, arm C | 2,331 tests, 6 failed (boot-graph ×3, seal B0/B2/B6) | the same 6, plus one load timeout (§6) |
| vitest, arm F | 2,313 tests, 3 failed (boot-graph) | the same 3, plus `gl-excise` (§5.4) and 3 load flakes (§6) |
| plant battery | — | 13/13 as expected (3 controls clean, 10 plants caught) |

The seal's B6 drops 9 on arm C. Every tests-visual line leaves B6, and 1 of the 9 is the directory bound. B2 drops 8, the blob spec's dynamic `/src/components/blob/…` imports, which now read inside their unit.

## 2 · What this seat wrote

Everything is under `docs/tranches/BL/design/structure/pass-5/`.

In `B-kit/authored/splits/tests-visual/`:

- `carve.json`: the authored carve. It holds:
  - `stay`: 7 root files (the config, package.json, `pi-manifest.ts`, `served-app-sentinel.ts`, `pi-gate-verify.mjs`, `substrate-paints-color.spec.ts`, `.gitignore`);
  - `delete`: `pi-runner-manifest.mjs` (R-8);
  - `slots`: 1 slotted spec;
  - `modules`: 21 named modules with a why each;
  - `rowMoves`: 7 moves the engine respells wrong;
  - `inbound`: the `test:dock` script token;
  - `walkers`: `wgsl-splice-contract` skips `__tests__`;
  - `citations` and `citationsAfter`: the comments that cite a carved path.
- `carve.mjs`: checks the carve and derives the **program row** and the move list. Its checks:
  - coverage: 177 direct files, each named once;
  - names: no placeholder names and no name that repeats its parent;
  - bounds: at most 12 files per directory after the splits, and slots are `__tests__/*.visual.ts`.

  The program row carries:
  - the config's `testDir`/`testMatch`;
  - the WebKit project's anchored `testMatch`;
  - the `tsconfig` excludes, derived from each file's shape;
  - the slotted spec, moved byte for byte;
  - the R-8 deletion, the walker skip and the one citation.
- `rebase.mjs` has three modes:
  - `--split` separates the engine's moves from the moves that need a row: residue edges the engine cannot respell, plus `rowMoves`.
  - `--row` derives that row as exact text, re-basing file-relative `new URL(…, import.meta.url)` literals.
  - `--check` reads the row's image against a mirror of the tree and classifies it.
- `split.mjs`: the Playwright-aware split tool.
  - Kind `spec` takes a header part, the parts by describe/test title prefix, the helpers by declaration name, and an optional `within` describe.
  - Kind `module` takes named declarations.
  - Every output is at most 500 lines, parses (the floor's `lib/syntax.mjs`), conserves the test count, and imports only what it reads.
  - It refuses a block no part names, a declaration no output owns, re-exports of moved names, and import cycles.
- `splits.json`: the 8 authored splits.
- `conserve.mjs`: checks that every non-import line and every import binding of a source lands in its outputs.
- `cite.mjs`: finds comments that cite a carved file by its old path, by text. Shipped sites go into their own row (P4-R3).
- `gate.json`: the seal-gate row this seat proposes to the route (§5.2).
- `verify.sh`: the whole chain in landing order, on a linked worktree.
- `plants.mjs`: the plant battery.
- `results.txt`: the commands and their filtered output.

The report is `splits/tests-visual.md`.

**Why derive tools, not frozen rows.** The route edits these files before B-S11 and B-S16 land, and the move engine rewrites their specifiers. Every row is re-derived where it lands, from names (module files, block titles, declaration names) that the route's rows do not change.

On the fresh arm C run, the derived rows have these sha256 values:

| row | sha256 prefix |
|---|---|
| program | `a5a16735…` |
| engine list | `5c19f466…` |
| row list | `27f11b79…` |
| rebase row | `10e7f7f7…` |
| split | `1e11918a…` |
| cite | `df367fa6…` |
| cite-shipped | `0c11943f…` |

The two move lists are byte-identical on arm F.

## 3 · The carve (B-S16)

**Subject census** (LAW §9, a test's subject is the sealed files it reads), over the 167 specs:

- 161 read no `src/` file;
- 5 read `src/` and a consumer zone: `aurora-swraster`, `aurora-vibrancy`, `blob-page`, `blob-pause-seam` and `webgpu-everywhere`;
- 1 reads `src/` only, all of it in one unit: `blob-painted-component.spec.ts`, with 8 dynamic `/src/components/blob/…` imports.

That one spec is the only slot: it moves to `src/components/blob/__tests__/blob-painted-component.visual.ts`, and the slot then holds 3 files. The others stay in the workspace, in modules named by the surface they read back.

| module | files | module | files |
|---|---:|---|---:|
| `aurora/` | 11 | `redress/` | 4 |
| `aurora/probes/` | 6 | `color/` | 7 |
| `blob/` | 8 (+1 split helper) | `typography/` | 7 |
| `goo/` | 4 | `storybook/` | 12 |
| `constellation/` | 5 | `storybook/configurator/` | 7 |
| `viz/` (incl. `safari-webgl`) | 8 | `captures/` | 8 |
| `dock/` | 11 | `components/controls/` | 11 |
| `dock/morph/` | 4 | `components/surfaces/` | 12 |
| `glass/` | 12 | `components/collections/` | 5 |
| `glass/contrast/` | 5 (+1) | `substrate/` | 9 (+1) |
| `motion/` | 12 | | |

`redress/` gains 3 files from the splits. The existing `paint/` and `fixtures/` directories keep their files, and `paint/` gains 2 from the module splits. The root keeps its 7 stay files plus 2 from the `substrate-paints-color` split.

**The program row lands first.** The config changes from `testDir: "."`, `testMatch: "*.spec.ts"` to the following:

```ts
testDir: "..",
testMatch: ["tests-visual/**/*.spec.ts", "src/**/__tests__/*.visual.ts"],
```

Playwright 1.61 reads a pattern containing `/` relative to `testDir`, and one without `/` at any depth. The WebKit project's bare names (`safari-webgl.spec.ts`, `aurora-swraster.spec.ts`) are therefore anchored as `tests-visual/**/…`, because F-1's scanner refuses a pattern whose base is missing. The config stays at the workspace root, so its `use`, `webServer` and `outputDir` paths do not change.

**Why the engine does not move everything.** The engine plans 133 moves, and the rebase row carries 35.

- 40 residue edges in 35 files are nested `new URL("..", import.meta.url)` roots and helper-call writes, which the engine cannot respell. The row re-bases 33 literals.
- 7 files the engine respells wrong: `desktop-fluid-type`, `dock-morph-family`, `dock-morph-insitu`, `nested-backdrop-budget`, `shell-config`, `shell-identity` and `dock-animation-live`. Concatenated write paths, the dock `ground` directories and `.cache` paths go out of place, and `package.json`'s `test:dock` token comes out as `dock/…`, a form F-1's command scanner does not read. The row writes the token as `playwright test tests-visual/dock/dock-animation-live.spec.ts`, which overrides the engine's edit.

The row's image check reads 0 lost and 0 gained. FD-5 alone leaves these files unclassified, because literals cannot be masked. A second classifier reads each file-relative literal as its resolved path, and all 36 files read move-only.

**Other edits in the program row:**

- `pi-runner-manifest.mjs` is deleted (R-8/E-7). Nothing reads it, and its flat `readdirSync` would enrol 1 spec where the program holds 167.
- `coherence-congruence.spec.ts` drops its citation of that file.
- `wgsl-splice-contract.test.ts`'s `walk()` skips `__tests__`, because the slot is not WGSL.
- The `tsconfig` exclude `src/**/__tests__/*.visual.ts` goes into each root type program that takes `src/` without already excluding `src/**/__tests__`. On arm C that is `tsconfig.test.json` only; tsconfig.json already excludes the slots via S14. On arm F it is both files.

## 4 · The splits (B-S11)

Line counts are for arm C. Each spec keeps its name for the part that holds the header, and each helper is `<spec>-<role>.ts` next to it.

| source (lines) | outputs (lines) | tests |
|---|---|---:|
| `substrate-paints-color.spec.ts` (776) | spec 301 · `-plants.ts` 126 · `-readback.ts` 379 | 3 |
| `substrate/substrate-cohesion.spec.ts` (510) | spec 287 · `-readback.ts` 242 | 3 |
| `glass/contrast/adaptive-glass.spec.ts` (555) | spec 358 · `-readback.ts` 209 | 5 |
| `blob/blob-render.spec.ts` (742) | spec 421 · `-readback.ts` 352 (`GRADIENT_MIN_DELTA` stays, unread) | 3 |
| `redress/w2-blur-redress.spec.ts` (595) | spec 339 · `-probes.ts` 278 | 5 |
| `redress/w1-radius-redress.spec.ts` (784) | spec 380 (tabs, search, skeleton, infinite-scroll, atoms) · `-inputs.spec.ts` 378 (tags-input, field census, sortable-list, command, the coarse describe) · `-ledger.ts` 85 | 11 |
| `paint/paint-arm.mjs` (579) | `paint-arm.mjs` 348 · `apca.mjs` 236 | module |
| `paint/reflect-capture-verify.mjs` (582) | `reflect-capture-verify.mjs` 157 · `png-region.mjs` 432 | module |

w1's ledger was shared across its describes before the split and is shared through `-ledger.ts` after it. It is one instance per worker, which is the same semantics as before, since Playwright runs files in separate workers.

## 5 · Notes for the route seat

1. **Glob-literal double read.** F-1's glob-literal scanner reads the new `testMatch` literal as a glob. If the slot is empty when the program row lands, it reports an empty-glob violation. That is why the slotted spec moves inside the program row and not in the engine list.
2. **The gate row (`gate.json`) is the route's call.** Without it, the seal reads two new lines:
   - B16 +1: its `TEST_FILE` does not know R-3's `*.visual.ts` form, so it reads the slotted spec as a slot helper.
   - B0 +1: it reads the program's `testMatch` as a walk.

   The row widens `TEST_FILE` to `/\.(test|spec|test-d)\.(ts|tsx|mts)$|\.visual\.ts$/` and skips B0 walks read from a Playwright config (`PLAYWRIGHT_PROGRAM`). With it, B0 stays 444 and B16 stays 0. Plant G1 below shows B16 still catches a visual spec slotted in a unit it does not read.
3. **The module splits land on the route's tree only.** At HEAD, `paint-arm.mjs` re-exports the hue helpers, a relay the route's S9 removes. `split.mjs` refuses to move a name something re-exports, by design (P4-R2 re-points, and a relay is a surface decision). Arm F therefore verified the 6 spec splits (`splits-F-specs.json`), and arm C verified all 8.
4. **The `gl-excise` walker on arm F.** At HEAD, `gl-excise.test.ts`'s walker reads the blob `__tests__/` slot, and the `.visual.ts` there fails it. Pass-4 S16 already adds the `__tests__` skip on the route's tree, so arm C is green. On arm F the same edit makes it pass (4 passed, 1 expected fail).
5. **Possible dead exports (E-7).** Most of `paint-arm`'s APCA block and `reflect-capture-verify`'s PNG and hue exports have no reader outside `paint/`. The split conserves them, and deleting them is a separate row.
6. **P4-R3.** The shipped citation (`no-gray`, in `src/styles/tokens/color-radius.css`) lands in its own row (`cite-shipped`). It moved `verify:package` by 0 B and the dist by 0 files.
7. **P4-R5.** `dock/__tests__` is untouched: the zone's only slot goes to blob.

## 6 · Verification

`verify.sh <tree> <mirror> <out> [--gate]` runs these steps in order, and each step stops the script on a miss:

1. carve;
2. program row, then graph;
3. rebase split;
4. engine `move.mjs` (image and FD-5);
5. rebase row and its check;
6. split and conserve;
7. cite rows;
8. gate row (with `--gate`);
9. graph again;
10. `playwright --list`;
11. the rows' sha256.

Both arms exit 0.

**Browser seat.** `browser.mjs` ran the 7 split or slotted specs on the arm C base, then after the chain, under the machine lock. The comparison is keyed by title, because spec paths change with the carve.

- Both runs hold the same 36 titles, with no status changes.
- The base's 16 failures (w2 scrims, cohesion ink and shadow, adaptive-glass buckets, w1 infinite-scroll, and so on) are reds of the route's pass-4 tree. The split carries them unchanged.

**Plants** (`plants.mjs`; 3 controls clean, 10 plants caught):

- T0 control: the carve as authored is clean.
- T1: a `utils` module is refused as a placeholder name.
- T2: `glass/` at 14 files is refused as over 12.
- T3: a file named by no module is refused.
- T4: a w1 block no part names is refused.
- T5: adaptive-glass with its helper removed is refused at 556 lines, over 500.
- T6c control: the split row as derived is conserved (6/6, arm F).
- T6: that row with one line of an output dropped reads `MISSING … 117: const EDGE_RING_W`.
- G0 control: the seal on the final tree shows no B6/B15/B16 line in the zone.
- G1: `css-critical` slotted into `chip/__tests__` raises B16 from 0 to 1.
- G2: a split helper named `helpers.ts` raises B15 from 0 to 1.
- G3: `glass/` at 13 files raises B6 from 53 to 54.
- G4: `blob-render.spec.ts` at 775 lines raises B6 from 53 to 54.

**Vitest.** Each flake below passes in isolation:

- arm C: aurora `atoms.test.ts` timed out at load, with 28 files in flight, and passed 24/24 twice in isolation;
- arm F: `slider.size-tokens` and `GlassDock.stagger` hit 10 s hook timeouts, and `menu/contract` failed 1 test; the three files passed 24/24 in isolation.

A bug fixed during verification: `carve.mjs`'s `include` match missed the one-line `include` when a key followed it (a trailing comma), so arm C's `tsconfig.test.json` got no exclude and `vue-tsc -p tsconfig.test.json` exited 2 on the slot's `/src/…` URLs. The fix is in, and the fresh arm C run exits 0.

## 7 · Open

- The engine's residue (40 edges) and its 7 mis-respells, plus the command scanner's package-relative blind spot, are floor findings. The rebase row works around them, and F-2/F-1 could absorb them.
- No tsc program type-checks the workspace's visual specs, and none checks the slotted one. That was true at HEAD and still is.
- Plants not run: a slot moved without the program row (should read LOST in the engine), and a tampered literal in the rebase row (should read LOST/GAINED). The check's LOST/GAINED path did fire once, by accident, on a mirror without `node_modules`, before that mirror was linked.
- Fence note: this seat ran one `git -C <scratch mirror worktree> checkout --detach 5e278aa7` inside its own scratch worktree. It failed (the worktree stayed at `7e62c447`), touched nothing in the checkout, and the mirror is overwritten by `rsync` in every run.
