# D1-F prototype · lifecycle capsules on the whole tree

Seat D1-F-proto, model `claude-opus-5-5`. Measured on a worktree of HEAD. The worktree was rebuilt from scratch for each run. The F battery (`f4-*`) ran on `95068476`. The final HEAD gate, the P battery, the final floor and the F gate ran on `e11945a3`. The code is byte-identical to the named base `2b188e72`: `git diff 2b188e72 e11945a3 -- . ':!docs'` is empty. Every number below comes from a command in this seat. Logs are under `$P/logs/`, where `$P` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-F-proto`. The worktree was removed after the runs.

**Verdict: RUNS.** The whole tree was carved by script, with no hand moves. Two states were measured:

- **P, placement** (F.4 steps 1-3 and 5-8): every lifecycle artifact is suffixed and sits in its subject's capsule.
  - Build and demo build are green. `regen-exports` is exact, 68 → 68.
  - vitest has 0 failures. Playwright lists 1,995 tests.
  - The gate is RED 489. All of it is the C2 floor (485) plus 4 motion stories that bypass their door.
- **F, floor** (P plus F.4 step 12, mechanically): doors are minted and 446 reaches are routed through them. The gate is RED 44: 43 C2 and 1 story door.
  - Every other clause is GREEN on the whole tree.
  - The gate is GREEN in 60 of 73 src capsule scopes, and in `tests-visual/` and `build/`.
  - The 44 left need authored decisions (§6). A rewriter cannot produce them.

The gate caught all 13 planted violations, one or more per claimed clause, including a relative deep import.

## 1 · What ran

| tool (`$P/tools/`) | lines | job |
|---|---:|---|
| `capsule-gate.mjs` | 491 | the gate: C0, C1 (5 sub-clauses), C2 (2), R2, C3, C4, C5. Node, fail-closed, exit 1 on RED |
| `move-engine.mjs` | 148 | moves files and rewrites every reference: specifiers, `new URL(…, import.meta.url)`, `resolve(__dirname, …)`, boundary-matched literal repo paths, package-relative script tokens |
| `carve-a.mjs` | 37 | phase A: test support to `tests/_support/`; visual support to `tests-visual/_support/`; one capsule per tool; `vite.*.ts` → `build/<plugin>/`; 2 dead tools deleted |
| `carve-config.mjs` | 119 | steps 1-2, 3 and 8, and the router: entry-rooted declarations, `imports`, one typecheck program, suffix routing |
| `carve-b.mjs` | 85 | phase B: every artifact to the home the gate's own law names, iterated to a fixed point |
| `carve-c.mjs` | 226 | phase C cures: `ROOT_URL` re-roots, story index, the Chromium vitest → Playwright port, `isSource`, story-path sites, roster re-pin |
| `door-route.mjs` | 194 | step 12: route cross-capsule reaches through doors, minting nested doors where the closure allows |
| `floor.sh`, `repin.mjs` | 24 | floor pipeline: mint → phase B again (the new nested capsules own artifacts) → story doors → re-pin |
| `run-all.sh`, `checks.sh`, `scope-sweep.mjs`, `mutate.mjs` | 99 | fresh worktree + carve; the battery; the per-capsule gate; the mutation battery |

Replay: `./tools/run-all.sh carve-c.mjs` builds P, then `./tools/floor.sh` builds F.

## 2 · The gate

`node capsule-gate.mjs <root> [--pack <npm pack --json>] [--max-files N] [--scope <dir>] [--all] [--json <out>]`. It runs in 0.77 s at HEAD and 0.88 s on F.

**Input graph.**

- `ts.preProcessFile` over every code file in `src`, `demo`, `tests`, `tests-visual`, `scripts` and `build`. It sees imports, `export … from`, dynamic `import()` and `import("…")` type positions.
- Also: `vi.mock` / `vi.importActual`, `import.meta.glob`, `new URL(lit, import.meta.url)`, `resolve|join(<here>, lits…)`, CSS `@import` and `<style src>`.
- `#` specifiers resolve through `package.json` `imports` literally, with no probing.

**C2 judges the resolved target file.** A relative deep path is caught like an alias path.

**What counts as a door:**

- an entry source;
- any `src/components|composables/**/index.ts` (a nested capsule's door, as F.1 says);
- `src/index.ts`;
- `src/styles/index.css`;
- each styles sub-capsule's `<sub>.css` (§8, delta 1).

**RED at HEAD** (`logs/gate-head-final.log`, pristine worktree, `--pack logs/h-pack.json`): `capsule-gate: RED (1255 violations)`.

| clause | HEAD | P | F |
|---|---:|---:|---:|
| C0 unresolved | 0 | 0 | 0 |
| C1 unsuffixed | 260 | 0 | 0 |
| C1 misplaced | 419 | 0 | 0 |
| C1 cross-not-invariant | 91 | 0 | 0 |
| C1 story door | 0 | 4 | 1 |
| C1 foreign shape | 0 | 0 | 0 |
| C2 private reach | 479 | 485 | 43 |
| C2 escape | 0 | 0 | 0 |
| R2 entry closure | 0 | 0 | 0 |
| C3 pack | 4 | 0 | 0 |
| C5 routing | 2 | 0 | 0 |
| **total** | **1,255** | **489** | **44** |

Notes on the table:

- **C1 misplaced at HEAD, by kind and destination:** story → src 87, visual → src 112, visual → scripts 6, test → src 188, test → demo 17, test → scripts 7, test → build 2.
- **C3 at HEAD** is the 4 unreachable declarations: `components/_shared/index.d.ts`, `components/index.d.ts`, `useScrollScene.d.ts` and `springProjection.d.ts`.
- **C5 at HEAD** is the webkit project naming `safari-webgl.spec.ts` and `aurora-swraster.spec.ts`.
- **C2 goes from 479 to 485 under P.** The carve moves reaches between zones without routing any: src 372 → 415, demo 64 → 47, tests 38 → 18.

## 3 · The carve

| phase | measured (`logs/run-all-final.log`, `logs/floor-final.log`) |
|---|---|
| A | 41 planned (39 moved, 2 deleted); 118 specifier rewrites, 5 URL re-roots, 6 `__dirname` re-roots, 114 literal rewrites |
| config | `tsconfig.build.json` −2 keys; entry-rooted declaration project (+22 lines in `build/style-assets/style-assets.ts`); `imports` 4 keys; `tsconfig.test.json` deleted; vitest `include` 1 line; Playwright `testDir ".."` + 2 `testMatch` lines; router reads `*.story.vue` / `*.tile.vue` by id |
| B | 526 moves over 2 passes (pass 3 moved 0): story → src 83, story → demo 11, visual → src 130, visual → tests-visual 53, visual → tests 1, test → src 188, test → tests 35, test → demo 17, test → scripts 6, test → build 2. 387 specifier rewrites (302 to `#`), 111 URL re-roots, 12 `__dirname` re-roots, 175 literal rewrites, 0 escapes, 0 unresolved |
| C | 68 escaping `import.meta.url` re-roots + 6 `__dirname` re-roots in 70 files (to `ROOT_URL`/`ROOT` from `#test/_support/root.ts`); story index (5 family pages, 11 member loads through `loadStory(id)`); 21 scanner filters in 14 files through `tests/_support/source.ts`; 9 story-path sites; roster re-pin |
| floor | 446 reaches routed (442 cross-capsule, 4 story-own), 26 doors minted (23 created), 171 re-exports; 22 artifacts re-homed into the new nested capsules; roster re-pinned `b8cc954f → d5980f4f` |

The worktree after F: 551 paths gone, 449 new and 250 modified.

## 4 · Results

| check | HEAD | P | F |
|---|---|---|---|
| `npm run build` | exit 0 | exit 0 | exit 0 |
| `npm pack` entries | 841 | 837 | 840 |
| lifecycle files in the pack | 0 | 0 | 0 |
| dist files | 837 | 833 | 836 |
| exports map | 68 keys | 68, `JSON.stringify` equal | 68, equal |
| `regen-exports` | exact | exact | exact |
| demo build | exit 0, 276 JS chunks | exit 0, 276 | exit 0, 279 |
| typecheck | 2 programs, exit 0 / 0 | 1 program, 93 errors in 47 files | 93 |
| vitest | 239 files, 2,324 tests: 2,323 pass, 0 fail, 1 pending | 238 files, 2,321: 2,320 pass, **0 fail**, 1 pending | 238, 2,321: 2,319 pass, **1 fail**, 1 pending |
| `playwright --list` | 1,989 in 167 files (988 / 988 / 13 webkit) | 1,995 in 168 (991 / 991 / 13) | 1,995 in 168 |
| gate | RED 1,255 | RED 489 | RED 44 |

**Where the 168 visual files sit in F:** 94 in `src/components`, 15 in `src/styles`, 6 in `src/composables` and 53 in `tests-visual/invariants`. vitest is down 3 tests and 1 file, and Playwright is up 6 tests: `slider.size-tokens` moved to Playwright, 3 tests × 2 projects.

**Live sample** (`logs/live-pw.log`, F state, port 5287, chromium project): 11 passed in 10.6 s.

- 8 are from `src/components/button/button-glass.visual.ts`, run from its capsule.
- 3 are from `tests-visual/invariants/slider.size-tokens.visual.ts`, the vitest file ported to Playwright.
- The other 1,984 listed visual tests were not run.

**Dist against HEAD** (`logs/{h,p,f4}-dist.sha`):

- **P:**
  - The 4 unreachable `.d.ts` are dropped.
  - 7 files change:
    - `fourier-field.js`: +11 bytes. The WGSL source embeds a comment citing `tests/components/fourier-field/wgsl-splice-contract.test.ts`, and the literal rewrite moved it to `tests/invariants/…`.
    - 4 `.d.ts` whose JSDoc cites a moved path: `class-names`, `useDockHold`, `render.wgsl`, `useSelectionGroup`.
    - 2 reprints: `Textarea.vue.d.ts`, `MusicStaff.vue.d.ts`.
  - Every other JS, CSS and font byte is identical.
- **F:** 130 files change, 46 are removed and 45 are added. That is 43 → 29 content-hashed chunks, 16 new nested-door `.d.ts`, 41 entry JS files, 88 `.d.ts` and `glass-ui.css`. §7 break 3 has the details.

## 5 · Mutations

`mutate.mjs` works on F. It plants one violation, runs the gate and restores the saved bytes, with no git. Each delta is the per-clause change against the unplanted tree. After the battery, the restored tree gates identical to the base (`logs/mutations.json`).

| clause | planted | delta | first hit |
|---|---|---|---|
| C0 | `import "./__mutation_missing__"` in `badge.contract.test.ts` | C0 +1 | `…badge.contract.test.ts: import "./__mutation_missing__"` |
| C1 unsuffixed | `tests-visual/invariants/zz-mutation.spec.ts` | +1 | the file |
| C1 misplaced | a test of `@glass/components/button` placed in `badge/` | +1 | `→ src/components/button/` |
| C1 cross-not-invariant | a subject-less `tests/zz-mutation.test.ts` | +1 | `→ tests/invariants/` |
| C1 story door | `button/zz-mutation.story.vue` mounting `./Button.vue`, not the door | +1 | `(door src/components/button/index.ts)` |
| C1 foreign shape | `src/components/button/Button.spec.ts` | +1 | the file |
| **C2 relative deep import** | `import type { DockState } from "../dock/composables/useDockState"` in `Badge.vue` | C2 +1 | `Badge.vue -> src/components/dock/composables/useDockState.ts` |
| C2 escape | `import "../../../demo/stories/index.ts"` in `Button.test.ts` | +1 | the specifier |
| R2 (M-F3) | `import "#stage/hero/focal.ts"` in `Badge.vue` | R2 +3 | `# specifier in the entry closure …`, plus the 2 non-src files it pulls in |
| C3 | `package.json` `files` += `src/components/button/buttons.story.vue`, re-packed | +1 | `artifact in the pack: …buttons.story.vue` |
| C3 | HEAD's `useScrollScene.d.ts` dropped into `dist/`, re-packed | +1 | `declaration outside the entry closure: …` |
| C5 (M-F2 class) | the webkit project names `src/components/aurora/aurora-swraster.webkit.visual.ts` | +1 | `testMatch names a file` |
| C4 | `--max-files 20` (N is owner-ruled, so no plant) | +7 | `src/components/aurora: 32 direct files > 20` |

13 of 13 were caught.

The first battery run missed the C1-unsuffixed plant. `kindOf` only knew top-level `tests-visual/*.spec.ts`, and the foreign-shape clause only looked in `src`. Both were fixed:

- the closed suffix set now applies in every zone;
- a retired `*.spec.ts` anywhere under `tests-visual/` reads as an unsuffixed visual spec.

The re-run on the fixed gate is the table above.

**M-F1** on the migrated tree: HEAD's `src/`-wide declaration config was restored in place (`include: ["src/"]`) and the tree rebuilt (`logs/mf1-build.log`).

- The build **fails**: exit 1, 137 TS errors (63 TS6059, 33 TS7016, 16 TS2307, …).
- 0 artifact declarations reach `dist`, so the pack stays C3-clean.
- After the restore, the rebuild gives a dist identical to `logs/f4-dist.sha`.

Under the migration, the old config fails the build loudly instead of emitting declarations for artifacts. C3's own teeth are the two plants above.

## 6 · Where it stopped: the 44 in F

The per-scope sweep is `logs/f4-scope-sweep.json`:

- GREEN in 60 of 73 src capsules, `tests-visual` and `build`.
- RED in accordion, aurora, blob, collapsible, dialog, dock, input, number-field, sheet, sortable-list, textarea, `composables/motion`, `src/styles`, `demo`, `tests` and `scripts`.

| class | n | reaches | why a rewriter cannot cure it |
|---|---:|---|---|
| CSS into another capsule | 26 | `src/styles/index.css` → 18 component stylesheets (21 edges); `glass.css` → `chip/accent-tone.css`; `Accordion`/`Collapsible` → `_shared/disclosure/disclosure.css`; `Input`/`NumberFieldInput`/`Textarea` → `_shared/field/control.css` | F.1 defines no CSS door for a component capsule. The aggregator interleaves capsules (card at lines 210 and 220, with others between), so one `index.css` per capsule reorders the cascade. And `components/<x>/styles.css` ship by path in `dist` |
| private file beside a published entry door | 8 | `motion/core/motionTempo` ×3, `dom/useDocumentVisibility` ×2, `sidebar/types`, `color/value`, `dialog/ModalOverlay.vue` | The file sits at the root of a capsule whose door is an entry source. Exporting it widens the published surface; the alternative is carving a sub-capsule. Both are owner calls |
| a mock names the module it replaces | 5 | `vi.mock(…/useGpuSubstrate)` ×2, `vi.mock(…/useGlassBackdropLuminance)`, `import * as` + `vi.spyOn(…/useSpringMount)` ×2 | Routing the mock through a door would mock the whole door. The cure is a test rewrite or moving the test |
| a tool reads library source | 2 | `scripts/regen-spring-tokens` → `springPresets.ts`, `springProjection.ts` | `springProjection` is outside the entry closure. Minting it into the published `spring/` door would publish it |
| boot-graph pins a leaf | 1 | `demo/shell/AppShell.vue` → `import("@glass/components/aurora/Aurora.vue")` | `boot-graph.test.ts` asserts that exact literal (and swaps it in mutations) |
| type-position import | 1 | `Blob.vue` emit type `import("…/webgpu/rendererStatus").RendererStatus` | Routable. `door-route` rewrites import and export declarations only |
| story door | 1 | `motion/scroll/scroll.story.vue` | Its subject, `useScrollScene`, is outside the entry closure (the orphan-CSS test pins it as such). Minting it into the published `scroll/` door would emit `useScrollScene.d.ts` |

## 7 · Breaks

1. **GlassDock.stagger stays in vitest.** It mounts through `@vue/test-utils` under happy-dom before handing HTML to Chromium. Of F.1's "two Chromium vitest files become `.visual.ts`", one did (`slider.size-tokens`, ported to `@playwright/test` by `carve-c` C-3).
2. **The C2 floor and the boot-graph law collide** (F: 1 vitest failure).
   - `door-route` sends `AppShell`'s `auroraFallbackGround` import through the minted `aurora/composables/index.ts`, which also re-exports `createAurora` from `./runtime`.
   - The test `the shell field's frame-0 ground is EAGER, not inside the async chunk` asserts the leaf specifier and fails.
   - Keeping the frame-0 ground out of the async chunk needs its own leaf sub-capsule. That is authored.
3. **The C2 floor changes published bytes.**
   - Vue production scope ids hash path and source. Every SFC whose import line changes gets a new `data-v` id, and in `glass-ui.css` so do keyframe names that embed it (e.g. `hm-settle-<hash>`).
   - The rule count and size are unchanged, but the bytes are not.
   - Routing through doors also re-chunks: 43 → 29 hashed chunks.
   - F.2's byte-identical guarantee holds for the placement carve (P) only.
4. **A mint can publish.** Minting a file outside the entry closure into a door the closure reaches makes the declaration build emit it. The first floor run did this to `useScrollScene` through `scroll/index.ts`, and the orphan-CSS self-test caught it. `door-route` now routes closure importers first and refuses such mints (2 refused).
5. **One typecheck program is not green: 93 errors in 47 files.**
   - 80 are in 44 visual specs and 2 in `tests-visual` support/config. At HEAD these files were in neither program.
   - 11 are strict-mode `implicit any` in `gate-register.test.ts`.
   - 36 are TS7016 for `pngjs`.
   - `npm run typecheck` exits 2 in both P and F.
6. **`#` specifiers stop at the workspace boundary.** `tests-visual/` has its own `package.json`, so `#visual/*` does not resolve for files there, and Playwright listed 0 tests until the move engine kept `#` for `src` files only. `tests-visual` artifacts reach `_support` relatively.
7. **happy-dom breaks `new URL("../..", import.meta.url)`**: "The URL must be of scheme file". The re-root helper `tests/_support/root.ts` uses `node:path` + `pathToFileURL`.
8. **A sha-pinned doc record cites moved paths.**
   - `GATE-SEMANTIC-ROSTER-C20.json` (with `SEAT-BINDING.json` and `TERMINAL-ROSTER.md`) is rewritten by the carve.
   - `PINNED_ROSTER_SHA256` in `tests/_support/gate-register.mjs` is re-pinned after the last rewrite: `282d05cf → b8cc954f` (P), `→ d5980f4f` (F).
   - A real migration edits those docs records in the same commit.
9. **Story helpers are not LCA-placed.** All helpers stay in `demo/stories/` and are reached through `#demo/*`. F.1 places 14 of 23 into capsules.
10. **Family pages became a story index, not metadata.** `demo/stories/index.ts` exports `storyModules`, `tileModules` and `loadStory(id)`, and the 5 family pages load members by id. Not built:
    - `<story lang="json">` metadata and the `"family"` key (F.1 router, step 9);
    - the StoryPage frame inversion (R3, step 4).
11. **The subject law misfiles 22 stories without authored input.** `carve-b` declares 10 as harness (compositions and family pages). It places 12 token pages into the styles capsule whose tokens they read most, checked by use.
12. **Size pressure grows.** Dirs with ≥ 10 direct src files go 15 → 39, and dirs with ≥ 20 go 2 → 8: dock 51, styles/glass 38, styles 32, aurora 32, blob 29, styles/tokens 28, menu 22, sortable-list 20. C4 is built but off until N is ruled.
13. **Most of `tests-visual` never executed.** 11 of 1,995 ran (§4). The rest are listed, not run.

## 8 · Deltas against SPECS F

1. **Styles door.** A styles sub-capsule's door is its sibling `<sub>.css`, not `<sub>/index.css`. `./styles/theme` pins `dist/styles/theme.css`.
2. **Harness access.** `#` works only in the root package scope. The rule becomes: src artifacts reach the harness through `#`; `tests-visual` artifacts reach `tests-visual/_support` relatively.
3. **Nested doors.** The gate counts every nested `index.ts` as a door, per F.1's "a sub-directory with its own door is a nested capsule". The story-door check uses the innermost capsule's door. At HEAD this takes C2 from 494 (top-level doors only) to 479, measured on a pristine worktree.
4. **HEAD RED is 1,255, not 1,352.** The resolver is `preProcessFile` with literal `#` mapping, not the `IMPORT` regex. It also resolves `vi.mock`, `import.meta.glob` and `export … from`.
5. **C0 and R2 are built.** C0 covers url and here literals whose base is inside a zone. R2 walks the entry closure, including globs.
6. **Step 12 is not a byte-neutral step** (§7, break 3). Done mechanically, it routes 446 reaches and takes the gate from 489 to 44. The 44 left are the authored classes in §6.
7. **The foreign-shape clause is repo-wide.** The mutation battery found that the src-only form missed a `*.spec.ts` under `tests-visual/`.

## 9 · Logs (`$P/logs/`)

| file(s) | what |
|---|---|
| `gate-head-final.{log,json}` | HEAD gate |
| `p-*` | P battery: build, demo, regen, tc, vt, pwlist, gate, pack, dist.sha |
| `f4-*` | F battery |
| `gate-final.{log,json}` | F gate with pack |
| `f4-scope-sweep.json` | per-scope gate |
| `mutations.json` | mutation battery |
| `mf1-*` | M-F1 |
| `live-pw.log`, `live-pi.json` | live sample |
| `door-route-{mint,stories}.json` | routes and unroutables |
| `carve-b*.json`, `carve-a-report.json`, `run-all-final.log`, `floor-final.log` | carve records |
| `h-*` | HEAD battery |
