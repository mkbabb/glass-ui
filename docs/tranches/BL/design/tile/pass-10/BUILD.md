# D4 · pass 10 · BUILD: D′ v9 and H9

| field | value |
|---|---|
| seat | D4 pass 10, BUILD seat (REGISTRY §P9-6). This seat resumed a copy interrupted by a session restart (2026-10-27): it read that copy's records, re-verified every number it keeps (§1), and ran what was left (the three Playwright WebKit holds) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `fdea480e7` + `pass-7/floor-v6.patch` sha1 `09e742439213dc15b4b05aba5de4508caba34427` |
| **D′ v9** | **`D4-Dp10.patch` sha1 `538b034c754bce9263019b2ac1f4fba1852bd11a`**, 8 files, +495 / -81, one whole patch in `../pass-8/D4-Dp8.patch`'s (`b5f4ae22`) place. `git apply --check` on HEAD + floor v6: **clean** |
| post-apply | **`git diff HEAD --binary \| shasum` = `80ab066d67f89cca14b2eaeb901ac7871cb8f75d`**; new files **`shape.ts` `9455d07303dc65badf401dc88b9c3ddcc75c6cf0`**, **`_shared/guard.ts` `53c233af2d7a6c5c2e04088ff2c4b09fc79bdf02`** (`logs/patch-check.log`). The same three at `ca54e4bf8` (the first copy) and at `fdea480e7` (this seat) |
| harness | **H9 `932637d53662`, 45 files**, printed on every log line (`H9.md`) |
| engines | Chromium 149.0.7827.55, Playwright's default headless shell, no GPU args. Playwright WebKit, every run inside `guarded --exclusive webkit`. Playwright WebKit is not Safari. **Real Safari: UNMEASURED (owner's safaridriver checkbox)** |
| machine | every build, unit run and browser run under `~/.claude/guard/guarded --rss-gb 8`; `--light` only for engine-free reads (SHEET, XSCRIPT, vue-tsc, bundle); serial, one heavy run at a time. The load is printed on every log line and beside every stage in `logs/chain.log` |
| records | driver `run-b10.sh`, chain `chain-b10.sh`, `logs/` (the first copy's interrupted WebKit hold in `logs/run1/`, cited by nothing), route `routes/D4-Dp10/`, probe `probes/pill-width.mjs`, frames `frames/`, harness diff `harness-h8-to-h9.diff` |

## 1 · The resume, and what this seat re-verified

The first copy ran the whole order in one chain (`logs/chain.log`, from 18:37:14): state, patch, SHEET self-test, libbuild, vue-tsc, the builds, SHEET on the clean builds, plant builds, units, unit plants, bundle and XSCRIPT (Phase 1, done 19:01:55), then the Chromium battery, the reads and the film (done 19:57:20). Its first WebKit hold (`webkit-a`) was admitted at 20:21:57 and was cut by the restart during T-6.

What this seat kept, and why it may:
- **The harness is the same bytes.** `HARNESS` reads `H9 932637d53662 (45 files)` now, as on every log line of the first copy. `harness-h8-to-h9.diff` equals a fresh `diff -ruN` of HEAD's H8 harness against the harness on disk.
- **The source is the same bytes.** This seat ran `git worktree remove --force` on the stale worktree, re-created it at `fdea480e7`, and applied floor v6 and D4-Dp10. The `state` and `patch` stages re-run (21:41:04-21:41:09): the patch reverses to a tree equal to HEAD + floor v6 in `src`, `tests`, `demo` and `MIGRATION.md`, re-applies clean, and the three hashes above are unchanged.
- **The builds are the same bytes.** Stage `rebuild-verify` (`logs/rebuild-verify.log`, 21:42:05, load 22.36) rebuilt `dp10-src`, `dp10-dist` and `dp10-atk-src` at `fdea480e7` under fresh labels. All three are **EQUAL** to the builds the first copy read. CSS is equal byte for byte (`2c7676a18aae`, `82f6945de7f4`, `d50f7209d95c`), JS is equal once the build label is stripped (it appears only in two `//#region <build dir>` comments, and so in the chunk's hashed filename), and `app/` is equal.
- Every kept log carries its command (in `run-b10.sh`), its admission time and load, and the harness hash.

What this seat re-ran or added: `state`, `patch`, `rebuild-verify`, `sheet-lane-plants` (H9.md §4), and all three WebKit holds from the start (§6). The interrupted hold's logs are kept in `logs/run1/` and are not cited.

## 2 · What D′ v9 changes over D′ v8, and why

**L-5: the cure, O-103e's preferred one.** `font-weight: 600` is deleted from `.toggle-group__item[data-state="on"]`, for every shape. The lane sheet's one `font-weight` is the item's rest 500 (`styles.css:132`, `logs/state.log`). There is no shape-conditional rule, no alias, and no opt-in to the old weight (E-1). A heavier label is wider, so at a wrap boundary it takes a second line. The cure removes the cause rather than reserving space (REGISTRY §P9-2: the hidden-twin fallback cannot cure a cell).

**The records that change with it** (E-3, P-3):
- `styles.css`: the on-state comment now reads "THE ON-STATE CARRIES ON INK, AND ASSISTS WITH FILL", and "the 0.12 is licensed only because the ink co-carries (a tile's perimeter too)". A new paragraph: "SELECTION CHANGES NO WEIGHT. A heavier label is wider, and a label at a wrap boundary would take a second line when selected (O-103e), so the option keeps its rest weight."
- The floor's tile comment: "a pill's carriers (the on-state, below) hold on a bare label; a tile's content brings its own ink, so the perimeter carries" (was "ink and weight").
- `MIGRATION.md`, `--selection-paint` bullet: "their selected ink" (was "ink and weight"). The breaking note, one clause under "Unreleased — the selectable tile's floor": "A selected `ToggleGroup` item keeps its rest weight (it was 600), and …".
- The `--selection-paint` registration comment and the L-3 unit's header drop "weight" from what a `bare` opt-out keeps.

**A unit for L-5.** `ToggleGroup.test.ts` (W-TOGGLE-ROW), "selection changes no weight: the item's rest weight is the sheet's only one": every `font-weight` in the lane sheet, by postcss, equals `[".toggle-group__item { font-weight: 500 }"]`.

**L-1a + L-1b: the unit twin** (`ToggleGroup.test.ts`, R-10): "no script in src writes the tile fact or holds its name". It reads `.vue` and `.ts` only. The value reader is kept (L-1), and the held-name reader is added: a quoted `"--selection-tile"` that is not `getPropertyValue`'s first argument and not in a writing position (L-1a). **The CSS arm is dropped.** Its comment names SHEET on the built stylesheet as the one CSS reader of record (§P9-4: "or the twin drops its CSS arm and cites SHEET").

## 3 · Engine-free and build stages (Phase 1)

| stage | result | log (admitted · load) |
|---|---|---|
| libbuild | done in 9.0 s (this seat's re-run; the first copy's: `logs/libbuild.log`, exit 0) | `logs/rebuild-verify.log` · 21:41:09 · 18.68 |
| **vue-tsc** | **app: 0 errors · test: 0 errors** | `logs/tsc.log` · 18:37:55 · 26.24 |
| builds | `dp10-src`, `-src-dev`, `-dist`, `-dist-dev`; attack `-atk-src`, `-atk-src-dev`, `-atk-dist`; each exit 0 | `logs/build-*.log` · 18:41 · 21.1 |
| **SHEET** self-test | **14/14 OK** (H9.md §2) | `logs/sheet-selftest.log` · 18:37:21 · 26.11 |
| **SHEET** on D′ v9 | **PASS 2/2** on `dp10-src` and on `dp10-atk-src`: one write, the route's rule `.toggle-group[data-shape=cell]` 1×; `wrap`: `MIGRATION.md:94-116`, 23 lines filled at 88 columns | `logs/sheet-dp10-*.log` · 18:41:51 · 20.61 |
| SHEET on plants | `foreign`, `var`, `esc`, `apply`, `static`, `ts`, `const` **FAIL 1/2**; `concat`, `unpinned` PASS 2/2; `crit-lg-plated`, `crit-strip-flush`, `fv6-second-lane-writer` **FAIL 1/2** | `logs/plant-builds.log`, `logs/sheet-lane-plants.log` |
| **units**, the route's files | **68/68** clean (pass 9: 67; +1 the weight case) | `logs/unit-plant-clean.log` |
| units, whole suite (`--maxWorkers=2`) | **2,357 ran: 2,354 passed, 3 failed, 1 skipped**. The 3 are HEAD's `gate:boot-graph` build-arm cases (the built demo has no `dist-demo` to measure), as in pass 9 (2,356 ran, the same 3) | `logs/unit-all.log` · 18:57:15 · 17.62 |
| unit plants | 37 runs, no `-t` filter. Every verdict as H9.md §4 tabulates | `logs/unit-plant-*.log` |
| **bundle** (unpacked) | **2,935,947 B**, 844 files; dist 2,542,341 B in 840 files; js-gz9 329,772 B. D′ v8: 2,935,932 B, so **+15 B** (comment text). Ratchet datum 2,919,057 (Q-14, rebound at the release cut) | `logs/bundle.log` · 19:01:39 · 16.22 |
| **XSCRIPT** | self **19/19**; pair with pass 8's route **19/19**; pair with pass 7's **19/19** | `logs/xscript-*.log` |

## 4 · The battery on D′ v9, Chromium

`logs/battery-src-chromium.log` (19:01:55-19:19:09, loads 12.09-17.80), `logs/reads-hold-chromium.log`, `logs/dist-*`, `logs/distdev-*`. The gating arms are `migrated` and the library cells the witness gates on. `unmigrated` is the consumer's HEAD composition, reported.

| witness | D′ v9 (pass 10) | D′ v8 (pass 9 critic) |
|---|---|---|
| T-1 migrated | 15/15 | 15/15 |
| T-2 `src` · `dist` · `dist-dev` | 52/52 · 52/52 · 52/52 | 52/52 each |
| T-3 migrated | **43/43** (C1 now from `sites.mjs`, L-4) | 43/43 |
| **T-4** migrated, `src` · `dist` | **42/42 · 42/42** (24 + the 18 L-5 cells) | 24/24 (no L-5 cell) |
| T-5 migrated, `src` · `dist` | 38/38 · 38/38 | 38/38 |
| T-6 migrated | 33/33 | 33/33 |
| T-7 migrated | 24/24 (unmigrated, reported, 4/33) | 24/24 (unmigrated 4/35) |
| W-A · W-B · W-C · W-D · W-E (library, reported per family) | 5/9 · 9/25 · 0/8 · 8/8 · 1/3 (`dist`, `dist-dev` W-E 1/6) | the same |
| **FACT** `src` · `src-dev` · `dist` | **92/92 each** (80 + the 12 `paint-*` cells) | 80/80 each |
| FACT plants `foreign` · `var` · `esc` · `apply` · **`concat`** · `unpinned` · `--l3 on-item` | 88/92 · 88/92 · 88/92 · 88/92 · **88/92** · 90/92 · 88/92 | 76/80 on the first four; `concat` not reached |
| CANON clean · `a` `s` `h` `layer` `foreign` `unlayered` `cq` `lowlayer` `cqoff` | 4/4 · 3/4, 3/4, 3/4, 2/4, 3/4, 3/4, 3/4, 4/4, 4/4 | the same, plant for plant |
| ATTACK `src-dev` · `dist` | 5/5 · 3/3 | the same |
| CORNER `src` · `dist` | 5/5 · 5/5 | the same |
| REPORT | 3/4, 1 unmeasured (the V2 mark, Q-3). The **kick** (B-5, reported, floor-owned): **0.17 px** at two 300 px columns, 4 px gap, want ≤ 0.05; peak scale 1.0278 | 3/4; kick 0.17 |
| **C1BOX** `src` · `dist` | **6/6 · 6/6**. C1 a cell in all 6 states (none, then each of 5 selected), 16 px corner, column; options at rest 184.00×40.94, 184.00×67.88 (×4), group 192.00×352.44; rest vs selected **0.00 · 0.00** | 6/6 |
| **CRIT-C1** `src` · `dist` | **24/24 · 24/24** | 24/24 |
| T-4 / FACT fixture self-test | 20 runs OK (H9.md §2) | — |

## 5 · The re-reads the cure owes, Chromium

**(a) G on a pill row** (`frames/single-{light,dark}-{fine,coarse}-chromium-pair.jpg`; rows `d9` = D′ v9, `w600` = the planted 600; columns selected, focused-selected). On D′ v9 the selected pill «Power» is carried by the tint (a darker fill) and the ink. In light, the ink is near-black (`oklch(0.216 …)`) against the muted brown `rgb(124, 102, 80)`. In dark, it is near-white (`oklch(0.926 …)`) against `rgb(172, 160, 145)`. The 600 row reads bolder on the same tint and ink. Whether D′ v9's pill is unmistakable without colour is the **critic's** ruling. This seat records the frames and makes no ruling. Preset and C1 frames on D′ v9: `frames/{preset,c1}-{light,dark}-fine-chromium-pair.jpg`.

**(b) A pill's width at rest and selected** (`probes/pill-width.mjs`; info only, every cell non-gating). The run prints "PILL-WIDTH FAIL · 0/0" because `lib.mjs` `verdict` needs one gating cell to pass. That is not a reading. The reading is the info lines:

| scene (light = dark in every row) | D′ v9: own width selected − rest · largest move in the row | planted 600 |
|---|---|---|
| `single` (4 pills, sm) | **0.00 · 0.00 px**, weight 500 → 500 | **+1.20 px** («Elastic» 60.03 → 61.23) · 1.20 px |
| `pill-icon` (3) | 0.00 · 0.00 | +1.00 («Board» 92.27 → 93.27) · 1.00 |
| `pill-badge` (3) | 0.00 · 0.00 | +1.27 («Drafts6» 100.80 → 102.06) · 1.27 |
| `vertical` (4) | 0.00 · 0.00 | 0.00 · 0.00 (fixed 56.00 width) |

So in Chromium the 600 cost a pill up to 1.27 px of its own width, and the row the same, since the pills after it move. D′ v9 costs 0.00 (`logs/pill-width-*-chromium.log`, 19:55:29-19:56:15, load 21.48-22.84).

**(c) T-3 and E-2's C1 cells unchanged.** T-3 migrated 43/43, as in pass 9, with C1's declaration now read from `sites.mjs` (L-4). C1BOX 6/6 and CRIT-C1 24/24 on `src` and `dist`. The perimeter never read the weight.

**(d) X-2's `name-ink` and X-7's tone.** X-2: `name-ink` PASS, light and dark, on `specimen-migrated`. The selected name is its item's ink, `oklch(0.216114 …)` light and `oklch(0.926146 …)` dark (`logs/h-report-chromium.log`). X-7 (`carried-crit-tone`): **12/12**. Both edge and ink move with the tone on `preset`, `specimen` and `strip`, light and dark (for example red `rgb(210 30 30)`: → `oklch(0.42 0.211 27.8)` light, 2.11:1; → `oklch(0.8 0.211 27.8)` dark, 2.02:1). The carried ink probe: selected ink against unselected, `preset` 2.66:1 light and **1.56:1 dark** (R-5, reported; the perimeter carries on tiles), and `strip` 3.23:1 light, 2.06:1 dark (`logs/carried-states-ink-chromium.log`).

**(e) T-7's non-gating content-ink cells.** 9 cells, all on the `unmigrated` arm (pass 9: 11). The two `preset-verbatim` cells (on, focus) are gone, because the library side no longer reads 600 there. On `specimen-verbatim` the library side reads 500 where it read 600. The weights of 600 that remain are the consumers' own verbatim content classes (`strip-verbatim` on, `specimen-verbatim` on and focus, `f1-verbatim` on). They gate nothing.

## 6 · Playwright WebKit

Three holds, each `guarded --rss-gb 8 --exclusive webkit --timeout 90`, queued on the one machine-wide lock and never cancelled (`logs/webkit-{a,b,c}.log`, `logs/chain.log`):

| hold | queued | admitted (wait, load) | done (load) | contents |
|---|---|---|---|---|
| `webkit-a` | 21:42:21 | 21:53:48 (11 min 27 s, 32.19) | 22:21:43 (13.57) | T-1..T-7, W-A..W-E on `src`; T-8; T-2, T-4, T-5, W-E on `dist`; T-2, W-E on `dist-dev` |
| `webkit-b` | 22:21:43 | 22:32:18 (10 min 35 s, 30.79) | 22:57:43 (14.52) | CANON clean + 9 plants; FACT `src` `src-dev` `dist` + 6 plants + `--l3 on-item`; ATTACK; CORNER; REPORT; the T-4/FACT self-test |
| `webkit-c` | 22:57:43 | 23:00:12 (2 min 29 s, 16.22) | 23:08:36 (11.68) | C1BOX, CRIT-C1, the L-5 plant, pill width, the carried tone and ink probes, the film |

No wait reached 90 min. Loads ran 8.81-32.19. Each of T-1, T-3, T-4 and T-6 printed H3-1's routine browser recycle at the 60-navigation cap (1× or 2×). No disconnect, no stall, and no cell that needed a re-run.

| witness | Playwright WebKit, D′ v9 | Chromium (§4) |
|---|---|---|
| T-1 migrated | **18/18** (pass 9: 18/18) | 15/15 |
| T-2 `src` · `dist` · `dist-dev` | 52/52 each | 52/52 each |
| T-3 migrated | **43/43** | 43/43 |
| **T-4** migrated `src` · `dist` | **42/42 · 42/42** | 42/42 · 42/42 |
| T-5 migrated `src` · `dist` | 38/38 · 38/38 | 38/38 |
| T-6 migrated | 33/33 | 33/33 |
| T-7 migrated | 24/24 (unmigrated 4/33; 9 content-ink cells, the same 9 as Chromium) | 24/24 |
| **T-8** (one run, both engines) | **migrated 27/27** (pass 9: 27/27); 13 unmeasured: 6 Chromium and 6 Playwright WebKit T-1 cells on library pills (`preset`, `specimen`, each at three rungs: the `(tile)` rung on a 9999px stadium), and the real-Safari cell, **UNMEASURED (owner's safaridriver checkbox)**, where safaridriver refused the session because "Allow remote automation" is off | — |
| W-A..W-E | 5/9 · 9/25 · 0/8 · 8/8 · 1/3 (`dist`, `dist-dev` W-E 1/6) | the same |
| FACT `src` · `src-dev` · `dist` | **92/92 each** | 92/92 |
| FACT plants `foreign` `var` `esc` `apply` `concat` · `unpinned` · `on-item` | 88/92 each · 90/92 · 88/92 | the same |
| CANON clean · 9 plants | 4/4 · 3, 3, 3, 2, 3, 3, 3, 4, 4 of 4 | the same |
| ATTACK · CORNER | 5/5, 3/3 · 5/5, 5/5 | the same |
| REPORT | 3/4, 1 unmeasured; kick **0.13 px** (pass 9: 0.13-0.14) | kick 0.17 |
| C1BOX `src` · `dist` | **6/6 · 6/6** | 6/6 |
| CRIT-C1 `src` · `dist` | **18/18, 6 UNMEASURED** each (as the pass-9 critic read WebKit with the fixed probe) | 24/24 |
| T-4/FACT self-test | 20 runs OK | 20 runs OK |

**The re-reads, Playwright WebKit:**
- **(a)** `frames/single-{light,dark}-{fine,coarse}-webkit-pair.jpg`, plus `preset` and `c1`. These read as Chromium's: on D′ v9 the selected pill is carried by the tint and the ink, and the 600 row is bolder on the same tint and ink. The ruling is the critic's.
- **(b)** D′ v9: **0.00 · 0.00 px** in every scene, light and dark. Planted 600: `single` +1.20 («Elastic» 60.05 → 61.25), `pill-icon` +1.00 (92.28 → 93.28), `pill-badge` **+1.28** (100.91 → 102.19), `vertical` 0.00. Each is the row's largest move too (`logs/pill-width-*-webkit.log`).
- **(c)** T-3 43/43, C1BOX 6/6, CRIT-C1 18/18.
- **(d)** `name-ink` PASS light and dark; tone **12/12**; carried ink `preset` dark 1.56:1 (R-5).
- **(e)** T-7: 9 content-ink cells, all `unmigrated`.

## 6.1 · What the next seat inherits

- **The pill question** (§P9-5) can now be asked on a number. Both engines measure 0.00 px on D′ v9, against the planted 600's +1.00 to +1.28 px of own width and of row shift. G on a pill row (re-read (a)) is the critic's to rule. If it rules the weight step load-bearing on pills, that does not reopen the cell cure (§P9-6).
- **PILL-WIDTH's banner.** It prints "FAIL · 0/0" and exits 1 because it has no gating cell (`lib.mjs` `verdict`). The probe is unhashed and info-only, and its lines are the reading.
- **No row** was added, struck or renamed. L-5 is a cell in T-4's fold. This seat scores nothing: the 40-row checklist is the critic's.

## 7 · Witness pairs (summary; detail in H9.md §3)

| pair | fixture PASS | planted FAIL | engines |
|---|---|---|---|
| L-5 | T-4 migrated 42/42, ladder 0.00 px, lines unchanged | `weight-step`: 30/42, the 12 cells at 390 (light, dark, PRT; click and keys), +21.00 px, «Awaiting a reply from the» 1 → 2 lines, 184×56 → 184×77 | Chromium ✓ · Playwright WebKit ✓ (30/42, the same 12 cells, +21.00 px) |
| L-1a | `ctl-reads` 68/68, `sh-reads` PASS | `const`: SHEET FAIL, twin FAIL | engine-free |
| L-1b | SHEET PASS on the clean builds | `esc`, `apply`: SHEET FAIL on the built sheet; `concat` reached: FACT 88/92 | engine-free; FACT Chromium ✓ · Playwright WebKit ✓ |
| the fold | FACT 92/92 `src` `src-dev` `dist` | `on-item` 88/92, `unpinned` 90/92 | Chromium ✓ · Playwright WebKit ✓ |
| L-4 | XSCRIPT 19/19 ×3; T-3 43/43 | — | engine-free; T-3 Chromium ✓ · Playwright WebKit ✓ |

## 8 · Scratch

- The worktree is removed: `git worktree remove --force …/p10/build10/wt` at 23:10, and `git worktree list` no longer shows it.
- **The scratch directory `.claude/worktrees/bl/D4/p10/build10/` (72 MB) remains.** It holds the builds, run JSONs, film scratch, `base-fv6`, `h8-snapshot` and a copy of the patch. This seat's `rm -rf` of it was refused by the permission system, as pass 9's critic's was for `p9/crit9/`. Nothing durable is in it, and every number above rests on a file under `docs/tranches/BL/design/tile/`. **Housekeeping for the owner:** delete `.claude/worktrees/bl/D4/p10/build10/`, together with the directories REGISTRY §P9-5 lists.
- Nothing this seat started is still running. The chain ended `CHAIN-DONE` at 23:08:36. The headless browsers left on the machine at 23:09 belong to other seats (the value.js session's Playwright worker, and the D5 `e10-continuity` and D2 `D2-Bp-probes` runs).
- The writes in the checkout: `harness/` (H9, as the first copy left it, byte-identical to its recorded diff) and `pass-10/`. That covers `D4-Dp10.patch`, `run-b10.sh` (this seat added the `rebuild-verify` and `sheet-lane-plants` stages), `chain-b10.sh`, `H9.md`, `BUILD.md`, `logs/`, `frames/`, `probes/`, `routes/` and `harness-h8-to-h9.diff`.
