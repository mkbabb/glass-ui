# D4 · pass 6 · FLOOR v5: the content-ink sentence, the strip reset, and what an inline `!important` does

| field | value |
|---|---|
| seat | D4 pass 6, FLOOR-V5 seat. It builds REGISTRY §P5-6.2 FV5-1..FV5-3 once, on `../pass-5/floor-v4.patch` (sha1 `2d56cc5a`), rebases both routes onto it, and measures HEAD + floor v5 and both rebased routes on H6's cells and on H5's FACT, CANON, ATTACK, CORNER, T-2, T-3 and REPORT, in both engines. No paint value, no primitive, no checklist row, no route pick |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `bdd0a12ba` (H6's commit). `git diff --stat a5334672c HEAD -- src package.json tests MIGRATION.md demo vite.config.ts` is empty, so the library source is the one passes 5 and 6 measured. The worktree `.claude/worktrees/bl/D4/p6/floor5/wt` was detached at `bdd0a12ba` |
| owner | no ruling on Q-2, Q-3, Q-5, Q-10, Q-11, Q-13, Q-14, Q-15 or the checkbox in `audit/INBOUND.md` or `FORMATION-PROGRESS.md` (the last D4 line is pass 6's launch, 2026-10-18). Both routes were rebased and read |
| harness | **H6 `e2360106ad0d`**, unedited. Every witness line, every UNIT line and XSCRIPT print it |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Every WebKit number here is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | every stage ran through `~/.claude/guard/guarded --rss-gb 8`. Browser runs never took `--light`; only the typechecks did. Every Playwright WebKit run sat inside one of two `--exclusive webkit` holds, and neither wait was cancelled. Hold A (`logs/wk-A.log`: probe and reads) queued 47 min (00:31:11 → 01:18:27) and ran to 02:06:47. Hold B (`logs/wk-B.log`: the batteries) queued 72 min (02:06:47 → 03:19:17) and ran to 03:43:08. Neither wait passed 90 min. One heavy run at a time. The 1-min load sits on every log's first and last line and beside every stage in `logs/chain.log`. It ran from 12.3 to 42.5 |
| records | `floor-v5.patch`, `D4-Dp.patch` and `D4-F.patch` (this directory). In `floor-v5/`: `run-fv5.sh` (every stage), `chain.sh` and `chain-wk.sh` (the order run), `mkpatch.py` (writes a patch from the worktree without a git write), `fv4-to-fv5.diff` (the five files floor v5 changes over floor v4), `probes/scope-bound.mjs` (pass 5's probe plus floor v5's form and the strip cells) and `logs/` (every log cited). The worktree was removed with `git worktree remove --force`. Builds, run JSON and the rebase snapshots stay as scratch beside it in `.claude/worktrees/bl/D4/p6/floor5/` (15 MB, untracked), and nothing here depends on them |
| fences | no tracked source edited in the checkout. The only git writes were `git worktree add` and `remove` of `floor5/wt`. `git apply` touched only that worktree, and the patches were written by `git diff` / `git diff --no-index` (read-only). The only checkout writes are under `docs/tranches/BL/design/tile/pass-6/`. Sibling repos were read with `grep` only (§1.2) |

Short citations as in REGISTRY §P5: `FV4`, `H5`, `H6`, `D′c5`, `Fc5`.

---

## 0 · In brief

**FV5-2 closes H6-3.** On both rebased routes, in both flavours (`src`, `src-dev`), in Chromium and in Playwright WebKit, H6's tile-strip cell `td` passes light and dark. The tab holds 1 row, and the strip is **40.94 px against the reference 40.94** (floor v4 read 54.69, with the tab on 2 rows; `H6` §3). **FACT reads 72/72 on every route, flavour and engine.** This is the 68/68 the task names plus H6's four new cells (`td`, `pd`, light and dark). The 68 that floor v4 read stay passing.

1. **The patch.** Floor v5 is floor v4 plus 26 lines in five files: 39 files, +1401 / −272, sha1 **`de018966`** (floor v4: 38 files, +1375 / −272). The added file is `src/components/tabs/styles/segmented.css`, for the strip's one declaration. `fv4-to-fv5.diff` holds the delta (§1).
2. **FV5-1.** One MIGRATION sentence, beside the `--selection-ink` row: a rest colour on an option's content is deleted. REPORT `name-ink` passes on both routes, in both engines, light and dark. The selected name is its item's ink, sRGB 28, 25, 23 light and 233, 230, 226 dark, at **2.66:1** and **1.56:1** against the unselected name.
3. **FV5-2.** The strip writes `--selection-tile: none` (`segmented.css:64`), and the pin's limit is now `to (.toggle-group, .segmented-tabs)` (`toggle-group/styles.css:62`). Every hold the task names holds, in both engines:
   - **scope-bound 17/17** on floor v5's form, plus **9/9 strip cells**; floor v4's form fails the strip cells as the plant, 4/9;
   - FACT 72/72;
   - **T-2 52/52**, with SegmentedTabs' own 9 `tabs` cells passing;
   - **T-5 migrated 38/38**, with SegmentedTabs' own 6 `tabs` cells passing.

   The harness has **no SegmentedTabs scene on T-6** (`scenes.mjs:66` gates `tabs` on T-2 and T-5 only), so "SegmentedTabs' own T-6 cells" are none; T-6 reads its H6 tally (§3.4).
4. **No strip in this repository, the demo or any sibling's `src` is a tile holder** (§1.2). A consumer that writes a tile value on a strip still lands it, since the reset is a layered default, as the group's is. The probe measures this as info. The reset breaks nothing that exists, and nothing is worked around.
5. **FV5-3.** The inline-`!important` clause now states what the write does: it outranks the pin and splits the option, so it is not an opt-out. H6-4 reads `info-pass` (the stated split) on both routes, in both engines and both flavours.
6. **Build, typecheck, unit.** The library builds on all three states. vue-tsc reports 0 errors on the app and test projects for all three. The suite ran **2,349 / 2,352 / 2,351** cases (floor v5 / + D′ / + F), and only HEAD's 3 `gate:boot-graph — build arm` cases fail, as under floor v4. The sheet case fails under each of 4 plants, including the two FV5-2 plants (§2).
7. **Both routes rebase with no content change.** Each rebased patch carries pass 5's added and removed lines exactly (D′ 300, F 285; `logs/rebase-*.log`). D′ is 8 files, +291 / −9; F is 5 files, +281 / −4. `git apply --check` is clean on HEAD + floor v5 for each, and floor v5 checks clean on HEAD (`logs/check.log`). `src` is unchanged, and so is every test (§3.1).
8. **The two routes read the same on every cell** in both engines (§3). Q-13 still separates nothing.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell. Floor v5 adds one item to Safari's list: `@scope` with a selector-list lower boundary.

---

## 1 · The patch, row by row

Line numbers are in the patched tree (HEAD + floor v5). Floor v5 changes five files over floor v4 (`floor-v5/fv4-to-fv5.diff`, 112 lines).

### FV5-1 · One MIGRATION sentence on content ink (M-16)

`MIGRATION.md:118-120`, inside the `--selection-ink` bullet, after "…drop their own `[data-state="on"]` rules.":

> A rest colour on an option's content is deleted: the item's ink is already muted at rest, and content that sets its own colour does not take the selected ink.

It is prose only, with no library rule (§P5-2, *not a cure*). The harness side, the migrated K2 with no rest colour, is H6-1's and already landed. The witness is REPORT `name-ink` (§3.3).

### FV5-2 · SegmentedTabs resets the fact (M-18)

- `src/components/tabs/styles/segmented.css:60-64`, in `.segmented-tabs`, inside the sheet's `@layer components`:

  ```css
  /* A STRIP IS A ROW OF PILLS WHEREVER IT SITS. It resets the tile fact as a
     group does (utilities/base.css), so its tabs keep the one-row law inside a
     tile option too; the ToggleGroup option's pin stops at the strip
     (toggle-group/styles.css). */
  --selection-tile: none;
  ```
- `src/components/toggle-group/styles.css:62`: `@scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) {`. The comment above it (`:59-61`) gains one sentence: the scope stops at a strip too, which resets the fact for its tabs. The lower boundary excludes the strip itself, so the pin's `!important` does not outrank the strip's reset. That was the reason M-18 named both halves.
- `src/styles/utilities/base.css:55-57`: the registration's comment says "Every group, and every SegmentedTabs strip, resets it to `none` … and a strip's tabs are always pills". Without that change, the sentence "every group resets it" would no longer list every reset.
- `MIGRATION.md:103-104`: the row's last sentence becomes "A `ToggleGroup` nested inside a tile is pills again (every group resets the value), and so is a `SegmentedTabs` strip inside one (every strip resets it too)." That is the consumer-facing half of FV5-2.
- `tests/components/ui/toggle-group/ToggleGroup.test.ts:584-593, 603-607`: floor v4's sheet case now reads `segmented.css` and expects the strip's reset to be `none`. The pin assertion names the new limit.

#### 1.1 · The engine question, measured (`probes/scope-bound.mjs`)

The probe is pass 5's (`../pass-5/floor-v4/probes/scope-bound.mjs`, left unedited) with pass 5's 17 cells and five forms byte for byte. It adds:
- **form `scope5`**, floor v5's reset and pin;
- **9 strip cells**: a strip in a tile option (the option's own content, the strip, its tab, the tab's content), in a pill option, under a non-group ancestor that writes `flush`, and alone;
- **5 info cells**: a consumer rule that writes `flush` *on* a strip.

The logs are `logs/probe-scope-bound-chromium.log` (load 27.29 → 28.28) and `logs/probe-scope-bound-webkit.log` (12.27, inside hold A).

| form | 17 cells, Chromium · Playwright WebKit | strip cells, Chromium · Playwright WebKit | judged |
|---|---|---|---|
| **`scope5`** (floor v5) | **17/17 · 17/17** | **9/9 · 9/9** | clean, both PASS |
| `scope` (floor v4) | 17/17 · 17/17 | **4/9 · 4/9** | strip cells: the plant, FAIL as expected. The strip in a tile option reads `flush`, and so does its tab and the tab's content. A strip under a `flush` ancestor reads `flush` |
| `unbounded` | 12/17 · 12/17 | 4/9 · 4/9 (info) | 17 cells FAIL as expected |
| `option` | 15/17 · 15/17 | 4/9 · 4/9 (info) | FAIL as expected |
| `crit` | 17/17 · 17/17 | 4/9 · 4/9 (info) | PASS as expected |
| `none` | 11/17 · 11/17 | 4/9 · 4/9 (info) | FAIL as expected |

**`@scope` with a selector-list lower boundary bounds a custom-property subject in both engines.** The tile option's own content still reads `flush` (it stays pinned), while the strip inside it, its tab and the tab's content read `none`.

#### 1.2 · Can a strip itself be a tile holder somewhere the reset would break?

- **In code, nowhere.**
  - `grep` for `selection-tile` over `glass-ui/src` and `glass-ui/demo` finds only the floor's own files: `utilities/base.css`, `glass/control-surfaces.css`, `toggle-group/styles.css`, `ToggleGroupItem.vue`, and after floor v5 `segmented.css`.
  - The same `grep` over every sibling under `~/Programming/*/src` finds nothing.
  - No `.vue` file in `glass-ui/src`, `glass-ui/demo` or a sibling's `src` holds both `SegmentedTabs` and `ToggleGroupItem` except `ToggleGroup.vue`, which names SegmentedTabs only in comments.
  - Neither route's writer targets a strip: D′ writes `.toggle-group[data-shape="cell"]`, and F writes through a `:has()` on the group.
  - A strip's tabs are its direct children (`SegmentedTabs.vue:309-337`), so no element sits between a strip and its tabs to hold a value.
- **Measured (info, both engines, `scope5`).**
  - A consumer rule that writes `flush` on a strip still lands: the strip, its tab and the tab's content read `flush` (#i1), and so does a strip inside a tile option (#i2s, #i2t).
  - The reset is a layered default, as the group's is, so a consumer's unlayered write wins, exactly as it would on floor v4.
  - Such a write takes the tabs off the one-row law. It gives them no card geometry, because the tile geometry is written on `.toggle-group__item` only.
  - That state is unchanged by floor v5, and no site writes it.
  - **The reset breaks nothing, and nothing was worked around.**

### FV5-3 · The inline-`!important` clause states what the write does

`MIGRATION.md:90-94` replaces floor v4's "…and only an inline `--selection-tile: … !important` outranks that" with:

> An inline `--selection-tile: … !important` on an option outranks that, and it does not opt the option out: it splits it. The option keeps the corner and the column of the value above it, which read the value on the option's parent, while its clip and the one-row law, which read the option's own value, follow the inline write.

The sentence names only what H6-4 reads:
- the geometry follows the group: the field corner, 16 px, and a column;
- the option's own readers take the write: its rows and its clipped children.

It does not name the pad or the development names, which H6-4 does not read. The sheet comment at `toggle-group/styles.css:58` ("an inline `!important` is the one thing above it") is true and is unchanged.

### Nothing else

There is no paint value (O-87), no primitive and no row. Neither route's `src` or tests changed (§3.1).

---

## 2 · Build, typecheck, unit

`logs/chain.log` has every stage with its load.

| state | library build | vue-tsc app · test | suite (H6 `unit.mjs`, `vitest.wt.config.ts` `f70c44e4`, maxWorkers 2) |
|---|---|---|---|
| HEAD + floor v5 | exit 0 (`libbuild-fv5.log`, `libbuild-fv5-2.log`) | **0 · 0** (`tsc-fv5-2.log`) | **2,349 ran, 2,346 passed, 3 failed** (`unit-fv5.log`): HEAD's three `gate:boot-graph — build arm` cases |
| + D′ (`D4-Dp.patch`) | exit 0 (`libbuild-dp.log`) | 0 · 0 (`tsc-dp.log`) | **2,352 ran, 2,349 passed, the same 3** (`unit-dp.log`) |
| + F (`D4-F.patch`) | exit 0 (`libbuild-f.log`) | 0 · 0 (`tsc-f.log`) | **2,351 ran, 2,348 passed, the same 3** (`unit-f.log`) |

These are floor v4's counts case for case (`FV4` §2). Floor v5 adds assertions, not cases. `tsc-fv5.log` (exit 2, two TS2307 on `@mkbabb/glass-ui/fourier-math`) ran before any library build. It is the test project's self-reference that `FV4` §2 recorded, and it is superseded by `tsc-fv5-2.log`, run after `libbuild-fv5-2`.

**Unit plants** on the sheet case (`logs/unit-plant-*.log`, H6's `unit.mjs --sub`, restore checked by the driver):

| plant | the sheet case |
|---|---|
| clean | PASS (1 ran) |
| `strip-reset-gone`: the strip's `--selection-tile: none` struck | FAIL |
| `limit-group-only`: the limit back to `to (.toggle-group)` (floor v4) | FAIL |
| `pin-unbounded`: the scope loses its limit | FAIL |
| `pin-gone`: the pin's declaration struck | FAIL |

---

## 3 · The rebased routes

### 3.1 · The patches

| patch | sha1 | numstat | source | what changed in the rebase |
|---|---|---|---|---|
| `floor-v5.patch` | **`de018966`** | 39 files, +1401 / −272 | `../pass-5/floor-v4.patch` `2d56cc5a` | FV5-1..FV5-3 (§1). The other 34 file blocks are byte-identical to floor v4's |
| `D4-Dp.patch` | **`0046d3a6`** | 8 files, +291 / −9 | `../pass-5/D4-Dp.patch` `b09d15e4` | **nothing but line offsets.** The same 300 added and removed lines (`logs/rebase-dp.log`). `src` and tests unchanged. D′'s amended canon unit reads `@scope (<root>) to (<limit>)` with `up.matches(limit)`, which takes the selector list as written, and it passes in the suite |
| `D4-F.patch` | **`f931fada`** | 5 files, +281 / −4 | `../pass-5/D4-F.patch` `c7072d6e` | **nothing but line offsets.** The same 285 lines (`logs/rebase-f.log`) |

How each rebase was made (`run-fv5.sh rebase`):
1. From the floor v5 tree, the files the pass-5 patch touches were snapshotted.
2. The pass-5 patch was applied (clean; F's hunks at offsets of 1 and 12 lines).
3. The rebased patch was written by `git diff --no-index` from the snapshot.
4. The rebased patch was reverse-applied, and the tree's `git diff HEAD` hash read back the floor v5 tree's (`5b6380a55152`, "equal").

`logs/check.log` reverses floor v5 to an empty `git diff HEAD`, then checks `floor-v5.patch` on HEAD (clean), applies it, and checks each rebased route on HEAD + floor v5 (clean).

### 3.2 · H6's cells and H5's witnesses, both routes, both engines

The builds:
- HEAD + floor v5 with no writer (`fv5-src`, `fv5-atk-src`, `fv5-atk-src-dev`);
- each route with pass 6's route dir (`../H6/routes/D4-Dp`, `…/D4-F`) and the attack route at `src` and `src-dev`.

The logs:
- Chromium: `logs/reads-{fv5,dp,f}-chromium.log` and `logs/battery-{dp,f}-chromium.log`;
- Playwright WebKit: `logs/reads-{fv5,dp,f}-webkit.log` (hold A) and `logs/battery-{dp,f}-webkit.log` (hold B).

Cells read Chromium · Playwright WebKit.

| witness | HEAD + floor v5 (no writer) | D′ on floor v5 | F on floor v5 | the same routes on floor v4 (`H6` §3) |
|---|---|---|---|---|
| **FACT** `src` | 49/72 · 49/72 | **72/72 · 72/72** | **72/72 · 72/72** | 70/72 each (`td` FAIL) |
| **FACT** `src-dev` | 49/72 · 49/72 | **72/72 · 72/72** | **72/72 · 72/72** | 70/72 each |
| H6-3 `td` (tile strip), light and dark | FAIL: no tile, so the option is a pill and the strip runs inline, 30.31 against 40.94 | **PASS: strip 40.94 against 40.94; tab 99.45×32.94 · 99.47×32.94, 1 row, 0 cut, tab fact `none`** | **PASS, the same numbers** | FAIL: 2 rows, strip 54.69 |
| H6-3 `pd` (pill strip), light and dark | PASS | PASS: option 452.00×40.00 against the pill `pa` 40.00, tab 1 row | PASS, the same | PASS |
| H6-4 `none!` at option (info) | info-fail: no tile, so there is nothing to split | **info-pass**: 211.92×45.50 · 211.94×45.50, 16 px used, column, 1 row, content 1 row, 1 clipped child; reference 211.92×54.69, 2 rows, 0 clipped | **info-pass**: 211.92×77.23 · 211.94×77.25, 16 px, column, 2 rows, content 1 row, 2 clipped; reference 211.92×81.86, 3 rows, 0 clipped | info-pass, the same numbers |
| **CANON** clean · `a` · `s` · `h` · `layer` · `foreign` · `unlayered` · `cq` · `lowlayer` · `cqoff` | not read | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | **4 · 3 · 3 · 2 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines (`h` 2/4: F's spelling) | the same per-plant table (`H6` §2.2, `FV4` §3.2) |
| **ATTACK** `src-dev` | 5/5 · 5/5 | **5/5 · 5/5** | **5/5 · 5/5** | 5/5 |
| **CORNER** | 1/5 · 1/5 (no tile) | **5/5 · 5/5** | **5/5 · 5/5** | 5/5 |
| **T-2** | 52/52 · 52/52 | **52/52 · 52/52** (SegmentedTabs `tabs`: 9/9 · 9/9) | **52/52 · 52/52** (`tabs` 9/9 · 9/9) | 52/52 |
| **T-3** migrated | (no migrated arm) | **40/43 · 40/43** (C1 ×3 at 0.00 px², Q-10) | **40/43 · 40/43** | 40/43 |
| T-3 library · unmigrated (info) | 2/39 · 2/39; 12/48 · 9/48 | the same | the same | the same |
| **REPORT `name-ink`** (X-2) | not read (no route) | **PASS light and dark**: 2.66:1 · 2.66:1 light, 1.56:1 · 1.56:1 dark | **PASS**, the same | PASS (`H6` §3) |
| REPORT kick (H4-6) | — | FAIL 0.17 · 0.13 px (want ≤ 0.05) | FAIL 0.17 · 0.09 px | FAIL 0.17 · 0.14 / 0.16 · 0.13 |
| REPORT mark, V2 dark | — | UNMEASURED (no mark; Q-3) | PASS 10.70 · 10.73:1 | the same |
| XSCRIPT, pass 6's route dirs (engine-free, `logs/xscript.log`) | — | **19/19** (one pair) | (the same pair) | 19/19 |

Reading the table:
- **Floor alone has no tile.** It ships no writer, so every cell that wants a tile fails: FACT 49/72, CORNER 1/5. That is `FV4` §3.2's shape (47/68 on floor v4). The two cells the floor gains are `pd`, light and dark.
- **H6-3 is closed by the floor, on both routes.** H6's harness-only stub read 72/72 (`H6` §3); floor v5's own spelling reads the same, cell for cell (strip 40.94 against 40.94).
- **The 68 H5 cells** (the wrapper, `item-*`, `content-*`, nested-group and nested-option cells) pass on both routes in both flavours and both engines. Widening the limit did not move them.
- **REPORT kick** is H4-6's reported cell, and floor v5 does not touch it. In Playwright WebKit it reads 0.13 (D′) and 0.09 (F), against 0.14 and 0.13 in `H6`, at loads 16.7-21.4. Both fail, so the verdict does not move. The values differ by a few hundredths with frame timing under load: 48-49 frames in Playwright WebKit against 96-97 in Chromium.

### 3.3 · X-2: FV5-1's witness

REPORT `name-ink` on `specimen-migrated` (`reads-{dp,f}-{chromium,webkit}.log`, lines `name-ink`). In light, the selected name is `oklch(0.216 0.006 56.0)` = its item's ink, sRGB 28, 25, 23. In dark, it is `oklch(0.926 0.006 75.1)`, sRGB 233, 230, 226. The unselected name is `rgb(112, 89, 66)` light and `rgb(195, 185, 172)` dark, and equals its item. Selected against unselected reads **2.66:1** light and **1.56:1** dark, on both routes in both engines. That is `crit-name-lift`'s reading (REGISTRY §P5-2). 1.56:1 in dark is the stroke's own contrast, which R-5 reports and does not gate; the perimeter carries the selected state in dark (T-3 migrated).

### 3.4 · The battery's migrated arm, and SegmentedTabs' own cells

`battery-{dp,f}-{chromium,webkit}.log`, on `<route>-src`:

| witness (migrated arm gates) | D′ Chromium · Playwright WebKit | F Chromium · Playwright WebKit | `H6` §3 |
|---|---|---|---|
| T-1 | 15/15 · 18/18 (K2 #6 is measured in Playwright WebKit) | 15/15 · 18/18 | the same |
| T-4 | 24/24 · 24/24 | 24/24 · 24/24 | the same |
| T-5 | 38/38 · 38/38 | 38/38 · 38/38 | the same |
| T-6 | 33/33 · 33/33 | 33/33 · 33/33 | the same |
| T-7 | 24/24 · 24/24 (unmigrated info 4/35) | 24/24 · 24/24 (4/35) | the same |
| library arm (info): W-B, W-E, T-1, T-4, T-5, T-6 | 9/25, 1/3, 5/27, 12/30, 49/78, 31/55, both engines | the same | the same |

Chromium ran D′ 23:54:56 → 00:19:21 (load 19.58 → 16.07) and F → 00:30:18 (22.98). Playwright WebKit ran in hold B, D′ 03:19:17 → 03:31:13 (15.08 → 18.16) and F → 03:43:04 (18.66). Every tally reads the same in both engines except T-1, as in `H6`. There were no janky cells and no NOT-REPRODUCED lines.

- **SegmentedTabs' own cells.** T-2 `tabs` (`scenes.mjs:66`, 4 options, `semantics="radio"`) has 9 cells: 4 stadium boxes at 32.94 px, 1 row, plus 5 one-row-law cells. They read 9/9 on both routes in both engines. T-5 `tabs` reads 6/6: the radiogroup's ARIA, 1 tab stop, and the four arrows moving and checking. `tabs-retired` reads `info-pass` (refused on a `src` build).
- **T-6:** the harness has no SegmentedTabs scene. `scenes.mjs:66` gates `tabs` on T-2 and T-5, and `tabs-retired` on T-5. T-6's tally is H6's: migrated 33/33, library 31/55. SegmentedTabs' own engagement units (`segmented-tabs.test.ts`, `tabs-seam.test.ts`) pass inside the suite (§2). No T-6 cell was added: floor v5 adds no witness (§P5-6.3).

---

## 4 · For the critics

- **Build on:** `floor-v5.patch` `de018966`, then `D4-Dp.patch` `0046d3a6` or `D4-F.patch` `f931fada` (this directory), with pass 6's route dirs `H6/routes/D4-Dp` and `…/D4-F` and the attack route `../harness/attack-route`, under H6 `e2360106ad0d`. The driver is `floor-v5/run-fv5.sh` (`state`, `build`, `reads`, `battery`).
- **What floor v5 now closes on both routes** (critics score them, citing these cells):
  - **R-2 / FV-2** on H6-3's `td`: FACT 72/72, both flavours, both engines;
  - **X-2** on REPORT `name-ink`: 2.66:1 and 1.56:1, both engines, with FV5-1's sentence as the floor's half;
  - **E-3**'s reported cell, H6-4: FV5-3's sentence now states the split that H6-4 reads.
- **Open on both routes, owner rows only:**
  - T-3 and E-2 (C1 40/43, Q-10);
  - R-1 and R-8 (Q-5, Q-15);
  - G (Q-2, Q-3);
  - E-4 (the checkbox).

  This seat ran no `dist` read. R-1 and R-8 rest on pass 5's `dist` cells, which floor v5 does not touch: it changes one declaration, one selector list and prose.
- **Safari's list** gains `@scope` with a selector-list lower boundary (FV5-2). It sits beside FV4-1's `@scope` row.
- **Reported, not scored:** a consumer write of a tile value on a strip still lands, as on floor v4 (§1.2). It takes the tabs off the one-row law with no card geometry, and no site writes it.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
