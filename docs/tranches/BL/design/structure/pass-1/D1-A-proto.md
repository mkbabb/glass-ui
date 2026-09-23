# D1 · pass 1 · D1-A-proto: the LCA placement law on the whole tree

| field | value |
|---|---|
| seat | D1 pass-1 prototype seat for family D1-A (graph-derived home) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `2b188e72`; the worktrees came up at `7362b3bf`. `git diff --stat 2b188e72 7362b3bf -- src demo tests tests-visual scripts package.json package-lock.json 'vite*.ts' vitest.config.ts 'tsconfig*.json'` is empty |
| inputs | `SPECS.md` (§D1-A, lines 1-307, and the shared facts, 1513-1649), `D1-A.md`, the research instruments under `$D1/D1-A/` (read, not reused) |
| instruments | `$P` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-A-proto`. Two worktrees at HEAD: `wt-head` (clean) and `wt` (migrated), each with `node_modules` symlinked from the repo. `$P/gate/` is the gate (landed in `wt` as `scripts/structure/`), `$P/tools/` the migration (`pipeline.sh` rebuilds `wt` from HEAD), `$P/out/` every measurement cited here. Both worktrees were removed before return |
| load | load average 42-53 at the close (`uptime`), from other sessions |
| status | **RUNS, not to GREEN.** Every build, typecheck, `regen-exports` and pack is green on the migrated tree, and the published surface is unchanged. The gate goes 472 → 65: P0, P4, P5, P6 are 0; P1 1 (a ruling), P2 10 dirs and P3 54 files need authored names or hand carving. vitest: 116 tests in 38 files fail. All but one pin a path, a dir or a file's text that the moves changed; the other is the demo's eager-graph ceiling, 68 modulepreloads against 67 (§5) |

## 0 · Result in brief

- The law ran on `src/`, `demo/`, `tests/`, `tests-visual/` and `scripts/` by script: barrel dissolution, placement to fixpoint, the depth half, the CSS arm (moves and splits), the test mirror and a lexical bounds carve. 549 files moved, 4 deleted, 31 stylesheets split into 109 pieces. Two hand fixes (§6), 6 lines in total.
- Every stage kept the library build and the demo build green (`check-s2` … `check-s9`: `build=0 demo=0`).
- Surface: 68 export keys and 62 `typesVersions` byte-identical; 63 doors carry the same 1,279 exported names; the flattened `styles/index.css` cascade matches rule for rule (7,740 leaf rules), as do `dist/glass-ui.css` (1,304) and the flattened `dist/component-styles.css` (1,386); `playwright test --list` is identical (1,989 tests). dist gains 55 files (837 → 892), pack gains 55 entries and 3,220 packed bytes.
- Gate: RED 472 at HEAD (exit 1), RED 65 on the migrated tree (exit 1). Each of 11 planted violations adds exactly its own clause. The 12th, a cross-zone relative deep import (`demo/main.ts` → `src/components/dock/composables/useDockState.ts`), adds nothing: D1-A has no clause for it.
- The CSS arm and the bounds carve, which the spec counted but did not prototype (A.6), both ran. The CSS arm is also the largest source of test breaks: 25 files fail first at that stage, all content assertions on stylesheets that were split or moved.

---

## 1 · The law as run

`tools/pipeline.sh`, from a fresh worktree at HEAD. Gate counts after each stage are from the landed executable (`out/pipeline.log`); moves and rewrites from each stage's JSON (`out/final/*.json`).

| # | stage (script) | moves · deletes | rewrites | gate after (P0 P1 P2 P3 P4 P5 P6 = total) |
|---|---|---|---|---|
| 0 | HEAD | | | 0 141 18 57 211 2 43 = 472 |
| 1 | dissolve non-door barrels (`dissolve.mjs`) | 12 barrels dissolved | 37 declarations → 51, 31 files; 1 `vi.mock` retargeted by factory keys | 0 129 17 57 211 2 38 = 454 |
| 2 | placement to fixpoint (`run.mjs law`), 4 rounds | 60 · 3 | 255 (value 193, type 46, literal 6, style 5, glob 2, location 2, mock 1) + 7 partial-path strings | 0 74 20 57 212 **0** 39 = 402 |
| 3 | depth half (`run.mjs depth`), 7 rounds | 122 · 0 | 368 (value 221, literal 72, type 36, style 27, dynamic 8, url 4) + 54 partial-path strings | 0 3 21 57 213 0 39 = 333 |
| 4a | CSS home moves (`cssstage.mjs moves`) | 8 | 22 | 0 3 21 57 213 0 31 = 325 |
| 4b | MIXED splits (`cssstage.mjs splits`) | 31 files → 109 pieces | 32 importer references expanded in order | 0 3 21 54 214 0 **0** = 292 |
| 5 | settle: law, depth, mirror, tests law, tests depth | 217 (all `tests/`) · 1 | 32 + 30 partial-path strings | 0 1 17 54 **0** 0 0 = 72 |
| 7 | lexical carve (`carve.mjs`), two passes | 267 + 2 | 380 + 38 partial-path strings | 0 1 10 54 0 0 0 = 65 |
| 9 | land the gate + `gate:home` script; settle again | 0 | 0 | 0 1 10 54 0 0 0 = 65 |

Net: 549 original files moved (src 160, demo 60, tests 217, tests-visual 110, scripts 2); files on disk in the five zones 1,298 → 1,365.

**Deletes (no reader, E-7):** `demo/chassis/code/Code.vue`, `scripts/lib/canon-doc.mjs`, `scripts/safari-probe.mjs`, `tests-visual/pi-runner-manifest.mjs`. The last one is not in the spec's list; nothing in the tree imports it, and its own header says it serves "the verifier's evidence plan". Whether that reader still exists is a ruling.

**Cross-zone moves (rule 8):** `scripts/lib/paint-arm.mjs` → `tests-visual/`, `src/composables/motion/scroll/useScrollScene.ts` → `demo/stories/motion/`, and `scripts/reflect-capture-verify.mjs` → `tests-visual/reflect/`. The spec (A.5) sends the last one to `scripts/lib/`; that holds only before `paint-arm.mjs` leaves. At the fixpoint its one importer sits in `tests-visual`, so it follows.

**Rewrite mechanics.** Specifiers are rewritten from the AST extraction, not by regex: relative, `@glass/`, `/src/`, the package self-name, `vi.mock` strings, globs (re-based, with gained and lost matches reported), `new URL(…, import.meta.url)`, and literal repo paths. `@glass/` is kept only for a `src` target and `/src/` only for a `src` or `demo` target; a file moved out of `src` gets a relative specifier. Location-derived roots (`"../.."` climbing to the repo) are recomputed from the new depth. A second pass (`pathstrings.mjs`) rewrites strings that name a moved file by a suffix of its old path (`"styles/tokens/glass.css"` joined onto a constant) and template tails (`` `${LIBRARY_ROOT}demo/stories/manifest.ts` ``), using every intermediate path a file held. 132 such strings were rewritten, 0 ambiguous. Every planner refuses to run while P0 is red.

**Bounds carve.** A dir over 12 direct files hands each group of ≥ 2 files sharing a stem token to a subdir named by that token, largest first. Each group is trialled on the remapped graph and kept only if P1 + P4 + P6 does not grow. 84 groups kept, 7 refused (for example `src/components/menu` by `dropdown`, 14 files: the carve would put an LCA into a slot and raise P1 + P4 + P6 from 1 to 2; `demo` by `app`: 1 → 8). Route SFCs (`demo/stories/*/*.vue`) and pinned files do not move.

## 2 · The gate

`node scripts/structure/home.mjs [root] [--json]`, exit 1 on any violation. 698 lines in five modules: `graph.mjs` 185, `place.mjs` 253, `css.mjs` 125, `scc.mjs` 42, `home.mjs` 93. It runs in 1.1 s at HEAD and 1.5 s on the migrated tree.

| clause | as implemented |
|---|---|
| P0 | every local specifier resolves (relative, `@glass/`, `/src/`, `@mkbabb/glass-ui[/sub]`, `vi.mock` strings, `import.meta.glob` patterns, file-like `new URL` targets), and every file parses. The extraction walks the TypeScript AST, so imports inside comments and fixture strings do not count; SFC `<script>` tags are matched attribute-aware (`generic="T extends Record<string, any>"`) |
| P1 | law half: no file outside its LCA subtree, no orphan, no non-door barrel, no door conflict; a cross-zone orphan names its target zone. Depth half: below its home only through kind slots or lexical dirs. Pins: the entry map from `scripts/lib/subpath-policy.mjs`, the CSS entries, route SFCs, `demo/main.ts`, config files, `tests-visual` specs, ambient `.d.ts`, html `<script src>`, config literal paths, and a CLI signal (a `package.json` script or a main guard) outside `src` |
| P2, P3 | ≤ 12 direct files per dir, ≤ 500 lines per file, over the five zones |
| P4 | a test sits at `mirror(LCA(home(subjects)))`, or below it in a slot or lexical dir. `.test-d.ts` files and `.fixture.vue` count as tests |
| P5 | value and dynamic edges inside `src`, Tarjan at module grain |
| P6 | a stylesheet's home is the LCA of its selectors' emitters; co-selectors do not vote. MIXED, off-home, and a GLOBAL register outside `src/styles` are each a violation. `src` CSS with a P6 home is judged by P6, not P1 |

**Deltas from the spec's contract:**

- P0 is added, as the spec's delta list asks, and made real: `vi.mock` strings and globs are resolved, not just counted.
- `tests/` and `tests-visual/` are zones with the law applied to their helpers; the spec's numbers covered tests only through P4.
- P6 also flags a GLOBAL register outside `src/styles` (the spec lists 3 such files under step 7, but not as a clause).
- The relative-path bypass claim (A.3, "does not arise") holds for same-zone edges only. A cross-zone importer does not vote in `home()`, so a demo file reaching into `src/components/dock/composables/` by a relative path moves no LCA and closes no cycle. Mutation X below shows it passes.

### 2.1 · RED at HEAD

`node scripts/structure/home.mjs <wt-head>`: `G-HOME RED: 472 violation(s) in 1.1 s`, exit 1 (`out/gate-head.json`).

| clause | this gate | spec (research) | why they differ |
|---|---:|---:|---|
| P0 | 0 | not a clause | |
| P1 | 141 | 113 | classless `src` CSS judged by placement, plus `tests` and `tests-visual` helpers |
| P2 | 18 | 18 | |
| P3 | 57 | 57 | |
| P4 | 211 | 198 | `.test-d.ts` files and fixtures counted as tests |
| P5 | 2 | 2 | the same two SCCs: M02 (`overlay/participation.ts → dock/composables/dockContext.ts`, a 7-module SCC) and M03 (dialog ↔ sheet) |
| P6 | 43 | 40 | GLOBAL registers outside `src/styles` |
| total | 472 | 428 | |

### 2.2 · On the migrated tree

`G-HOME RED: 65 violation(s) in 1.5 s`, exit 1 (`out/gate-final.json`): P0 0, P1 1, P2 10, P3 54, P4 0, P5 0, P6 0.

- P1: `src/composables/motion/spring/springProjection.ts`, read from tests, demo and backend and from no `src` file. The spec lists it as an owner ruling (A.6); the law cannot place it.
- P2: `demo/` 25, `demo/stories/containers/` 14, `demo/stories/foundations/` 14, `demo/stories/substrates/` 27, `src/components/_shared/` 18, `src/components/dock/` 13, `src/components/sortable-list/` 13, `src/styles/` 40, `tests-visual/` 67, `tests/invariants/` 45. No further stem group keeps the law; the rest need names a person writes. The three story dirs are route SFCs and cannot be carved without changing the route convention.
- P3: 54 files (tests 19, src 14, demo 8, tests-visual 8, scripts 5), led by `tests/invariants/contrast-computed.test.ts` 1,260 lines, `glass-subtlety.test.ts` 1,099, `demo/composables/manifest.ts` 1,098 and `scripts/verify-export-types.mjs` 1,079. Splitting a file by content is not a placement act, so the law has nothing to say. The 3 files it did shrink below 500 were MIXED splits.

### 2.3 · Mutations

`tools/mutate.mjs` plants each violation on the migrated tree, runs the landed executable, records the violations not present in the base run, and restores the tree; the base counts matched after every restore (`out/mutations.json`).

| id | planted | caught | new violation named |
|---|---|---|---|
| P0-a | `Chip.vue` imports `./missing-helper` | P0 +1 | `value "./missing-helper" names no file` |
| P0-b | a `vi.mock("@glass/components/chip/useChipGone")` naming no file | P0 +1 | `mock "…/useChipGone" names no file` |
| P1-law (M-A3, relative deep import) | `GlassDock.vue` adds `import … from "./../slider/composables/useDockHold"` | P1 +1 (P4 +1 follows) | `slider/composables/useDockHold.ts → src/composables (shared slot)` |
| P1-orphan | a new file nothing reads | P1 +1 | `no reader anywhere: delete` |
| P1-barrel | a non-door pure barrel `Chip.vue` imports through | P1 +1 | `non-door barrel: dissolve` |
| P1-depth | `chip/odd/helper.ts` imported by `Chip.vue` | P1 +1 | `below its home in src/components/chip/odd/, neither a kind slot nor a lexical dir` |
| P2 | a 13th file in `fourier-field/` | P2 +1 | `holds 13 direct files` |
| P3 | `useConstellation.ts` 497 → 502 lines | P3 +1 | `502 lines` |
| P4 | a chip test copied into `tests/components/dock/` | P4 +1 | `→ tests/components/chip/` |
| P5 | `_shared/motion.ts` value-imports `dialog/DialogContent.vue` | P5 +1 | `SCC src/components/_shared · src/components/dialog` |
| P6 | `.glass-dock { … }` appended to `src/styles/control.css` | P6 +1 | `MIXED (GLOBAL \| src/components/dock): split` |
| X | `demo/main.ts` imports `../src/components/dock/composables/useDockState` | **nothing** | none: a cross-zone importer does not vote |

M-A1 (P5: M02 and M03 at HEAD, 0 after placement) is measured in §1, stage 2. M-A2 (a churn commit's importer delta without its move) was not replayed.

## 3 · Surface diff (HEAD → migrated)

| surface | HEAD | migrated | how measured |
|---|---|---|---|
| `exports` (68 keys) + `typesVersions` (62) | | byte-identical | `cmp out/head/exports.json out/final-verify/exports.json` |
| exported names per door | 63 doors, 1,279 names | 0 doors differ | `tools/doornames.mjs` on each tree |
| `styles/index.css` flattened | 7,740 leaf rules | identical sequence | `tools/flatten-css.mjs` + `tools/cascade-seq.mjs` |
| `fonts.css`, `theme.css` flattened | | byte-identical | `cmp` |
| `dist/glass-ui.css` | 1,304 rules | identical sequence (bytes differ: comments) | `cascade-seq.mjs` |
| `dist/component-styles.css` | 4 `@import`s, 1,386 rules flattened | one import path changes (`./styles/track-well.css` → `./styles/track/track-well.css`); flattened sequence identical | `cascade-seq.mjs` |
| dist file list | 837 | 892 | `out/*/dist-files.txt` |
| `npm pack --dry-run` | 841 entries, 1,023,942 B | 896 entries, 1,027,162 B (+3,220) | `out/*/pack.log` |
| `playwright test --list` | 1,989 | identical | `tools/pwlist.mjs` |

The dist delta is internal: `exports` publishes `./styles.css` and `./fonts/*`, and no stylesheet copy under `dist/styles` or `dist/components` is reachable through it. The changed JS entries are hashed chunk names. The +55 files are the split pieces and `dist/composables/**` (12 files), which exists only because of hand fix H2.

## 4 · Verification battery

`tools/verify.sh` on each tree (`out/head/steps.txt`, `out/final-verify/steps.txt`).

| step | HEAD | migrated |
|---|---|---|
| `vite build` (library) | 0 | 0 (63 declaration entries) |
| `vue-tsc --noEmit` (src) | 0 | 0 |
| `vue-tsc --noEmit -p tsconfig.test.json` | 0 | 0 |
| `regen-exports --json` (fail-closed) | 0 | 0, `failClosed.pass: true`, 0 unclassified |
| `npm pack --dry-run` | 0 | 0 |
| demo build (`demo/vite.demo-dist.config.ts`) | 0 | 0 |
| vitest | 239 files, 2,324 tests: 2,323 pass, 0 fail, 1 skipped | 239 files, 2,203 tests: 2,086 pass, **116 fail in 38 files** (5 fail to load), 1 skipped |

The demo build runs before vitest so `boot-graph` has its `dist-demo`. The first verify run read 117 in 40 files; the two extra files (`token-hygiene`, `feedback-motion`) passed on the rerun and at stage 9, so they are load noise. Not run: a paint check and a Playwright execution (only `--list`).

## 5 · Breaks

By the stage where each test first fails (`out/final/vt-s2 … vt-s9.json`; failing files 3 → 8 → 33 → 34 → 38).

| stage | failing test (final path) | tests | class | cause |
|---|---|---:|---|---|
| 2 law | `tests/demo/story-lazy.test.ts` | 1 | fixture convention | the fixture builds its own glob keys `./${cat}/${id}.vue`; H1 fixed the source, not the fixture |
| 2 | `tests/invariants/css/orphan-css-partial.test.ts` | 2 | helper-built path | its self-test uses `join(SRC, "composables", "motion", "scroll", "useScrollScene.ts")` as a present-but-unreachable `src` module; rule 8 moved that file to `demo/stories/motion/` because nothing in `src` reads it |
| 2 | `tests/invariants/picker-lane.test.ts` G1 | 1 (+4 at stage 4) | tool scope | the law homes `color.glsl.ts` and `color.wgsl.ts` in `src/components/_shared/` (their LCA), which the demo's Tailwind `@source "../src/components/_shared/**/*.ts"` scans; G1 pins that no shader module sits there, because the extractor trips on shader template literals. G3/G4 read `src/styles/glass/overlay-plate.css`, split at stage 4 |
| 3 depth | `tests/demo/router-field-ownership.test.ts` | 1 | dir scan | `readdirSync("demo/shell")`: depth flattening dissolved `demo/shell` |
| 3 | `tests/demo/boot-graph.test.ts` | 4 | helper path + ceiling | 3 read `demo/shell/AppShell.vue`; 1 is the eager graph at 68 modulepreloads against a ceiling of 67 |
| 3 | `register/proportion-register.test.ts` | 3 | dir scan | `cssFiles("src/styles/tokens")`: the depth half flattened `src/styles/tokens` into `src/styles` |
| 3 | `dock/dock-name-canon.test.ts` | 1 | dir scan | `walk("src/styles/tokens")` finds no token file, so `--dock-hairline` is declared 0 times |
| 3 | `motion/spring/spring-authority.test.ts` | 1 | helper-built path | the exempt emission file is `join("src", "styles", "tokens", "scheme-spring.css")`; at `src/styles/scheme-spring.css` it is no longer exempt, so its spring figures are reported |
| 4 CSS | 25 files: `badge.contract`, `select.contract`, `contrast-computed`, `glass-subtlety`, `focus-veil`, `typography`, `prm-no-resurrection`, `radius-role-canon`, `radius-dialog-bind`, `overlay-plate-available-height`, `dissolve`, `binary-triad`, `Button`, `focus-visible`, `dialog-close-contrast`, `dialog-dismiss`, `dialog-room`, `sheet-graded-edge`, `sheet-reach`, `reka-binding-idiom`, `GlassDock.stagger`, `g-dock-lattice`, `Surface`, `plate-register`, `feedback-tint-seam` | 79 | content assertion | each reads a stylesheet by path and asserts a rule inside it; after the split the rule sits in another piece, or the file no longer exists (4 load failures: ENOENT on `dissolve.css`, `overlay-plate.css`, `squircle.css`) |
| 5 mirror | `tests/scripts/gate-register.test.ts` | 6 (+3 at stage 7) | closed roster in docs | the roster `scripts/gate-register.mjs` reads (`docs/tranches/BJ/addenda/…/GATE-SEMANTIC-ROSTER-C20.json`, pinned by `PINNED_ROSTER_SHA256`) names test paths such as `tests/public-surface.spec.ts`. Docs are outside the rewrite zones, and a rewrite would break the sha pin |
| 7 carve | `tests/demo/story-preview-card.test.ts` | load | basename helper | `code("CatalogLanding.vue")` joins a basename onto `demo/`; the file moved to `demo/landing/` |
| 7 | `motion/route-motion.test.ts` | load | basename helper | `readCss("motion-registers.css")` under `src/styles/`; moved to `src/styles/motion/` |
| 7 | `dock/g-dock-lattice.test.ts` | +7 | template path | `` `${STYLES}/run.css` ``; moved to `dock/styles/run/`. Template joins are not rewritten |
| 7 | `seam/forms-seam`, `seam/typed-track-seam`, `focus/focus-veil` | 3 | aggregator text | assert literal `@import "./glass/control-edge.css"` lines, or `./styles/track-well.css` in the typed seam list; the carve changed those paths |

Other breaks, not test failures:

- **H1, glob keys.** `import.meta.glob` keys are importer-relative. When `demo/stories/manifest.ts` moved to `demo/composables/`, the keys built by hand in `lazy.ts:20` and `manifest.ts:162` pointed nowhere. The second one fails silently. The codemod reports the key shift but cannot rewrite a hand-built key.
- **H2, dist style copier.** A split piece landed in `src/composables/dark/`. `copyStyleAssets` in `vite.style-fold.ts` copies only `src/styles` and `src/components`, so the build failed with `styles/accessibility.css: unresolved CSS import ../composables/dark/a11y-overrides.css`.
- **The route glob gains helpers.** Moves put 5 (stage 2) and 16 (stage 3) helper SFCs directly under `demo/stories/<category>/`, where `../stories/*/*.vue` matches them. The demo build and the Playwright list are unaffected (the manifest looks up by story id), but the route pin pattern now also pins those helpers, so the carve cannot move them.
- **Depth flattening removes feature dirs.** 19 files left `demo/shell`, 19 left `src/styles/tokens`, 16 left `demo/stories/substrates/aurora`, 10 left `demo/shell/configurator`. The law sees no import-based reason for these dirs, so it flattens them. The lexical carve then rebuilds dirs by stem token, and those are not the same dirs.
- **Split-piece names.** Pieces take the source stem plus `-2`, `-3` (`_shared/deep-2.css`, `_shared/ladder-2.css`); the carve then groups them as `deep/`, `ladder/`. These names are mechanical, not authored.
- **Graph-invisible couplings** found here and not in the spec's A.3 list: directory scans (`readdirSync`, `walk(dir)`), `join(...)` segment paths and basename helpers joined onto a dir constant, template-literal path joins, docs rosters that name test paths, and aggregator import lines asserted as text. The partial-path pass rewrites a string that holds a whole path suffix; it cannot rewrite a path split across `join` arguments.

## 6 · Hand fixes

`out/final/handfixes.md`, applied by `pipeline.sh`:

- **H1** (2 lines): `demo/stories/manifest/lazy.ts:20` `` `./${category}/${id}.vue` `` → `` `../stories/${category}/${id}.vue` ``; `demo/composables/manifest.ts:162` tile key likewise.
- **H2** (+2 lines, `vite.style-fold.ts` `copyStyleAssets`):

  ```ts
  const srcComposables = resolve(root, "src/composables");
  cpSync(srcComposables, resolve(outputRoot, "composables"), { recursive: true, filter: copyFilter(srcComposables) });
  ```

## 7 · Where it stopped and why

- **P1, 1 file.** `springProjection.ts` is a ruling the law defers to the owner.
- **P2, 10 dirs; P3, 54 files.** The lexical carve exhausts every stem group that keeps P1 + P4 + P6 from growing. Anything more needs authored names (P2) or a hand split of file content (P3). The spec already marks both as counted, not prototyped. The prototype narrows P2 from 21 to 10 and leaves P3 where it was, apart from the 3 files the CSS splits shrank.
- **116 failing tests were not repaired.** 115 pin a path, a dir or stylesheet text; repairing them means rewriting what each test asserts, which a placement script cannot decide. The boot-graph ceiling needs a look at the demo chunking or a ruling on the ceiling. §5 lists them by class.
- **Not run:** a paint check, a Playwright execution, M-A2, and the sibling-backend carry.

## 8 · Reproduce

```sh
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-A-proto
CHECK=1 bash $P/tools/pipeline.sh                  # fresh wt at HEAD → migrated tree, checks per stage
bash $P/tools/verify.sh $P/wt $P/out/final-verify  # build, both typechecks, regen-exports, pack, demo build, vitest
node $P/wt/scripts/structure/home.mjs $P/wt        # the gate (or: npm run gate:home in wt)
node $P/tools/mutate.mjs $P/wt                     # the 12 mutations, tree restored after each
```
