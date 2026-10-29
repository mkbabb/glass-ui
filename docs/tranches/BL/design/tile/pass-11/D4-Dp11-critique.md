# D4 · pass 11 · D4-D′ v9 · critique: the first confirmation, read fresh

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 11 (REGISTRY §P10-6 (2)). It authored no D4 seat in any pass and was no earlier D4 critic. It scores the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged), adds no row and picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `978a01b36`. `git diff --stat fdea480e7 HEAD -- . ':!docs'` is empty, so this seat measured the library BUILD (`fdea480e7`), the pass-10 critic (`ecd4232b8`) and the pass-11 re-measure seat (`7910eb836`) measured. Detached worktree `.claude/worktrees/bl/D4/p11/crit11/wt`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`) |
| hashes, checked before any measure and at the end | `floor-v6.patch` **`09e742439213…`**; `D4-Dp10.patch` **`538b034c754b…`**, `git apply --check` clean on HEAD + floor v6; post-apply **`git diff HEAD --binary \| shasum` = `80ab066d67f89cca14b2eaeb901ac7871cb8f75d`**; `shape.ts` **`9455d073…`**; `_shared/guard.ts` **`53c233af…`**. The `patch` stage reversed D′ v9 to a tree equal to HEAD + floor v6 in `src`, `tests`, `demo` and `MIGRATION.md`, then re-applied it (`D4-Dp11-crit/logs/patch-check.log`). `plants.mjs state` read equal before and after every plant (`plant-builds.log`, `sheet-lane-plants.log`, `rebuild-a11.log`, the unit restores) and at the end (`final-state.log`, 07:26:58 on 10-29) |
| harness | **H9 `932637d53662`, 45 files, unedited.** It is printed on every log line, and `git status` shows no change under `harness/` |
| owner | O-103c (Q-10 (i): C1 is a cell in both states, and selection changes no geometry) and **O-103e** (the condition binds any content C1 can hold; L-5 is a cell in T-4's fold; the preferred cure is no weight change). Every other ruling stands as O-102b/O-103 record it. **Q-11 (a) is a DEFAULT, and D4-G stays BLOCK.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; E-4 is read against this seat's Playwright WebKit run (O-103) |
| engines | Chromium 149.0.7827.55, Playwright's default headless shell, no GPU arguments. Playwright WebKit 26.5 (headless; Playwright 1.61.1). Every WebKit number below is **Playwright WebKit**, which is not Safari |
| machine | Every build, unit run and browser run went through `guarded --rss-gb 8`; `--light` only for engine-free reads. Every Playwright WebKit read sat inside a `guarded --exclusive webkit` hold, queued on the one machine-wide lock and never cancelled. Serial: one heavy run at a time. Loads at stage boundaries ran 7.82-55.92 (`logs/chain.log`). Hold waits: A 15 min 36 s, B 18 min 24 s, C 22 min 8 s, D 9 min 13 s, **E 88 min 14 s**, F 28 min 9 s, the sweep re-run 86 min 29 s. No wait passed 90 min |
| records | `D4-Dp11-crit/`: `run-crit11.sh` (every stage), `chain.sh` (the order), `rebuild-a11.sh`, `rerun.sh`, `run-crit11-unitrerun.sh` and `run-crit11-unitrerun2.sh` (copies used only for their unit stages, with their own log dirs), `smoke.sh`; `probes/crit11-geom.mjs`, `probes/crit11-c1.mjs`; `routes/A11/`; `logs/` (`logs/smoke/`, `logs/unit-rerun/`, `logs/unit-rerun2/`); `frames/`; `run-json.tgz` (229 run JSONs) |

Citations: `B10` is `../pass-10/BUILD.md`, `H9` is `../pass-10/H9.md`, `D′c10` is `../pass-10/D4-Dp10-critique.md`, `RM11` is `REMEASURE.md`. Paths under `logs/` are `D4-Dp11-crit/logs/`. "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every pass-10 number reproduced, in both engines, on the gating arms.** T-1 15/15 · 18/18, T-2 52/52 on `src`, `dist` and `dist-dev`, **T-3 43/43 · 43/43**, **T-4 42/42 · 42/42 on `src` and on `dist`, the 18 L-5 cells included**, T-5 38/38 on both builds, T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27. FACT is 92/92 on `src`, `src-dev` and `dist`, CANON 4/4 with every plant at its tally, ATTACK 5/5 and 3/3, CORNER 5/5 and 5/5, C1BOX 6/6, CRIT-C1 24/24 · 18/18 + 6 UNMEASURED, XSCRIPT 19/19 ×3, SHEET self-test 14/14, `states` 54/54 · 9/9 · 6/6 and 54/54 · 9/9 · 3/3. The bundle is **2,935,947 B**.
2. **Three differences, each under load, each re-run, none reproduced** (§1.4):
   - The route's canon case («the tile corner is one declaration on the field rung») **timed out at vitest's 5,000 ms** at loads 31-48. It failed `clean` and added one failure to 12 plants in the chain, and one to 25 of 37 in a first re-run at load 38-48. This seat captured the text the harness drops: `Error: Test timed out in 5000ms` (7 of 8 direct runs at load 31-41). Alone, the case takes about 2 s. At load 11-12, all 37 plants match the pass-10 critic's counts plant for plant, and the whole suite reads 2,354 passed and 3 failed (HEAD's `boot-graph`).
   - Chromium T-6's whole count was 63/88 against 64/88. The one flip is a **library**-arm specimen keyboard-commit cell («the input committed nothing», load 41.54). Re-run twice, it read **64/88 and 64/88**. Migrated stays 33/33.
   - In Playwright WebKit, the CRIT11-GEOM sweep hit the harness's own 1,800 s verdict watchdog (`lib.mjs:792`). No engine hung. Re-run with `--deadline 4800` at load 8-12, it read **192/192** in 27 min 43 s.
3. **The scroll-fixed re-reads (§P10-6 (2)) close K2's placeholder.** CRIT11-GEOM, which reads rest after a first scroll, gives **192/192 · 192/192** on `a10-src` (pass 10: 192 · **188**) and 112/112 · **112/112** on `a10-dist` (pass 10: 108). The `weight-step` plant reads 20/112 · **20/112** (pass 10: 20 · 18). CRIT11-C1 reads 96/96 · 78/78 + 18 UNMEASURED. Its K2 cells now read rest at 205.00×84.42, not the 114 px placeholder, with 0 info-fails. `crit10-k2-diag` still reads 114 before any scroll in WebKit, so the first scroll is what removes the 4 cells.
4. **This seat's attacks on the cure and on O-103c / O-103e found nothing** (§2). It added five C1 compositions (`rtl`, `sm`, `lg`, rich content with media and a wrapping block line, `type="multiple"`). It added six conditions: forced colours, contrast in light and dark, reduced motion, a coarse pointer and `--ui-scale` 1.5. It also added a `::before` / `::after` layout diff. D′ v9 reads 126/126 · 126/126, 150/150 · 120/120 (+30 UNMEASURED) and **216/216 · 216/216**. Each read has teeth: the weight-step plant fails A11 0/78 · 0/78, and a plant that drops the item's exemption from `accessibility.css`'s contrast arm fails the media read **0/72 · 0/72** (border 1 → 2 px, 2.00 px of shift).
5. **Re-read (a), G on a pill row, holds on this seat's frames** (§3), fine and coarse, light and dark, in both engines.
6. **Score: 40 / 40. No row opened, added, struck or renamed.** Four new record items are routed to the landing list (§4). None names an H9 cell that fails on D′ v9. **Pass 11 is clean: 1 of 2.**

---

## 1 · Re-run

`logs/chain.log` holds the order: Phase 1 (16:33:08-17:03:42, 10-28), then the Chromium battery, reads, film, attack and `states` (17:39:43-21:49:51), then six Playwright WebKit holds (A-F, 21:49:51-05:01:05, 10-29), `CHAIN-DONE` at 05:01:05. Re-runs follow in `rerun.sh`, `run-crit11-unitrerun{,2}.sh` (§1.4).

**One build fault of this seat's, found and fixed before any read of it.** `routes/A11/` first had no `route.json`, so build.mjs built `a11-src`, `a11-ws-src` and `a11-ax-src` with "migration none". `rebuild-a11.sh` (17:04:01-17:04:25, a new file, not an edit of the running driver) rebuilt all three with the route (`migration D4-A11-crit [… c1rtl, c1sm, c1lg, c1rich, c1multi]`), with each plant restored and checked equal. No read of the first builds is cited.

### 1.1 · The battery (`dp10-src`; `dist`, `dist-dev` where named)

| witness | migrated A · B | whole A · B | pass 10 |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 20/42 · 23/45 | the same |
| T-2 `src` · `dist` · `dist-dev` | — | **52/52** each, both engines | the same |
| **T-3** | **43/43 · 43/43** | 45/85 · 45/85 | the same |
| **T-4** `src` · `dist` | **42/42 · 42/42** each | 54/72 | the same |
| T-5 `src` · `dist` | **38/38** each, both engines | 87/116 · `dist` 88/117 | the same |
| T-6 | **33/33 · 33/33** | 63/88 → re-run 64/88, 64/88 (§1.4) · 64/88 | 64/88 |
| T-7 | **24/24 · 24/24** | 24/24 (unmigrated 4/33) | the same |
| T-8, one run | **27/27** | 27/39, 13 unmeasured, among them the real-Safari cell: "You must enable 'Allow remote automation'…" (`src-T-8-both.log`) | the same |
| W-A · W-B · W-C · W-D · W-E | — | 5/9 · 9/25 · 0/8 · **8/8** · 1/3, both engines; W-E `dist`, `dist-dev` 1/6 | the same |

**T-4's L-5 cells** (run JSON, `T-4-{chromium,webkit}.json` on `dp10-src` and `dp10-dist`): **18/18 in each of the four**. The falsifier «Awaiting a reply from the» reads 1 line, 184.00×56.00, weight 500 → 1 line, 184.00×56.00, weight 500, `on`. The `weight-step` plant reads **30/42 · 30/42**. Its 12 failing cells are exactly the `c1-ladder-migrated` cells at 390×844, light, dark and PRT, by click and keys. Each reads max 21.00 px, group 192.00×1129.00 → 192.00×1150.00, and the falsifier 1 → 2 lines, 184.00×56.00 → 184.00×77.00, weight 500 → 600 (`t4-weight-step-*.log`). So the falsifier keeps its edge in both engines.

**C1, T-3** (`T-3-*.json`): Chromium 933.50 / 946.50 / 937.75 px² and Playwright WebKit 932.00 / 942.25 / 934.50 px² (light / dark / PRT), against the bar 251.00. Those are pass 10's numbers to the hundredth. The forced-colours cell reads 11,821.75 px² in Chromium and 376.00 px² in Playwright WebKit (reported, above the bar).

### 1.2 · H9's, H8's and earlier cells

| cell | Chromium · Playwright WebKit | pass 10 |
|---|---|---|
| **SHEET** self-test | **14/14 OK** | the same |
| SHEET on `dp10-src` · `dp10-atk-src` | **PASS 2/2** each: 1 write, the route's rule | the same |
| SHEET plants `foreign` `var` `esc` `apply` `static` `ts` `const` · `concat` `unpinned` · the 3 lane plants | **FAIL 1/2** ×7 · PASS 2/2 ×2 (by design) · **FAIL 1/2** ×3 | the same |
| **FACT** `src` · `src-dev` · `dist` | **92/92** each, both engines; state cell `b` checked, `on`, weight 500, `a` unchecked, weight 500, 1 tab stop | the same |
| FACT plants `foreign` `var` `esc` `apply` `concat` · `unpinned` · `--l3 on-item` | **88/92** each · **90/92** · **88/92**, both engines | the same |
| **CANON** clean · `a` `s` `h` `layer` `foreign` `unlayered` `cq` `lowlayer` `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` · **CORNER** `src` · `dist` | **5/5 · 3/3 · 5/5 · 5/5**, both engines | the same |
| **REPORT** | 3/4 + 1 unmeasured (the mark, Q-3); `name-ink` PASS light and dark; `kick-spring` PASS; both engines | the same |
| REPORT kick (B-5, reported, floor-owned) | **0.16 px · 0.15 px**, want ≤ 0.05 | 0.16 · 0.14 |
| T-4 / FACT fixture self-test | **20 runs OK**, both engines | the same |
| **C1BOX** `src` · `dist` | **6/6 · 6/6**, both engines | the same |
| **CRIT-C1** `src` · `dist` | **24/24** each · **18/18 + 6 UNMEASURED** each | the same |
| **XSCRIPT** self · pair p8 · pair p7 | **19/19 · 19/19 · 19/19** | the same |
| `states` states · hover · a11y (X-1, R-4) | **54/54 · 9/9 · 6/6** · **54/54 · 9/9 · 3/3** | the same |
| X-7 tone | **12/12 · 12/12** | the same |
| carried ink (R-5, reported) | `preset` 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT; `strip` 3.23:1 light; both engines | the same |
| PILL-WIDTH (re-read (b), info) | D′ v9 0.00 px in every scene; planted 600 +1.20 / +1.00 / +1.27 · +1.20 / +1.00 / +1.28, `vertical` 0.00 | the same, value for value |

### 1.3 · Units, types, bundle (engine-free)

- **vue-tsc**: app 0, test 0. **libbuild**: exit 0. **bundle**: 2,935,947 B unpacked, 844 files; `dist` 2,542,341 B in 840 files; JS gzip-9 329,772 B; +16,890 over 2,919,057 (Q-14).
- **State** (`state.log`): the lane sheet's one `font-weight` is `styles.css:132` (500); no `@apply` of the fact, no escaped or built name; C1's `shape` at `sites.mjs:77`.
- **This seat's source scan** (`crit-scan.log`): every rule in the lane sheet keyed on `data-state`, `aria-checked` or `data-commit` writes only `opacity`/`transition-duration` on `::before`, `--selection-ink`, `background-color`, the forced-colours `border-color`/`background`/`color`, and the kick's `animation`. No selected-state rule in `src` that writes a font, spacing, padding, margin, border width, gap or size reaches `.toggle-group__item`: the two `accessibility.css` arms that do write `border-width: 2px` exempt it (`:not(.toggle-group__item)`, lines 21 and 42).
- **Units** (§1.4 for the load story): at load 11-12, `clean` 68/68 and every one of the 37 plants at the pass-10 critic's count (`logs/unit-rerun2/`); the whole suite 2,357 ran, 2,354 passed, **3 failed** (HEAD's `gate:boot-graph` build arm), 1 skipped (`logs/unit-rerun2/unit-all.log`).

### 1.4 · What moved under load, and the re-runs

| read | chain | re-run | verdict |
|---|---|---|---|
| unit `clean` | 67/68 at load 30.57-35.00 (`unit-plant-clean.log`) | 68/68 · 68/68 at load 26.16 and 25.61 (`unit-plant-clean-rerun{1,2}.log`) | **NOT-REPRODUCED** |
| unit plants | 12 plants at pass 10's count + 1, the +1 always case 7 | first re-run (load 24-48, `logs/unit-rerun/`): 25 of 37 carry case 7; **second (load 10.9-11.9, `logs/unit-rerun2/`): all 37 at pass 10's counts** | **NOT-REPRODUCED** |
| unit whole suite | 5 failed: `boot-graph` ×3, case 7, and «DropdownMenu contract keeps the click branch…» (load 34.96 → 31.74) | 3 failed, `boot-graph` ×3 (load 12.84) | **NOT-REPRODUCED** |
| why case 7 fails under load | the harness deletes vitest's report, so no reason is kept (RM11 §2.1) | this seat ran the pair by vitest directly: **`Error: Test timed out in 5000ms`** at `radius-role-canon.test.ts:583`, 7 of 8 runs at load 31-41 (`crit-case7-diag-loop.log`, `-named.log`). Alone at load 25, the case passes in 1.91-2.12 s (`crit-case7-diag-{1,2}.log`) | a timing budget, not a reading |
| Chromium T-6 whole | 63/88: library `specimen` keyboard commit «committed nothing» at load 41.54 | 64/88 · 64/88 (`rerun-T-6-chromium-{1,2}.log`, loads 12.39 and 8.79), the cell «pop peak 1.03 at 81 ms» / «89 ms» | **NOT-REPRODUCED**; migrated 33/33 throughout |
| Playwright WebKit CRIT11-GEOM sweep | `HARNESS ERROR: no verdict within 1800 s` (00:21:56-00:51:57, load 17.87-21.25) | **192/192**, 06:55:39-07:23:22, `--deadline 4800`, load 8.16-12.03 (`rerun-crit11-geom-a10-src-webkit.log`) | the probe's own watchdog; no hang |

---

## 2 · Attacks

### 2.1 · The scroll-fixed re-reads (§P10-6 (2))

`probes/crit11-geom.mjs` and `probes/crit11-c1.mjs` are pass 10's probes. Each copies the original with **one** change to the read: before rest, every option is scrolled into view in turn, two frames each, and every scroller in the scene and the window then go back to 0. crit11-geom also gains a `pseudo` cell, info in the sweep. It is listed below.

| read | Chromium | Playwright WebKit | pass 10 |
|---|---|---|---|
| CRIT11-GEOM sweep, `a10-src` (47 labels at 192 and 256 px, 12 viewports, click and keys, 53 layout properties) | **192/192** | **192/192** (re-run, §1.4) | 192 · **188** |
| `pseudo` cells (info, 96) | 96/96 none differ | 96/96 none differ (the re-run) | not read |
| CRIT11-GEOM `--quick`, `a10-dist` | **112/112** | **112/112** | 112 · **108** |
| CRIT11-GEOM `--quick`, the `weight-step` plant (`a10-ws-src`) | 20/112 | **20/112** | 20 · 18 |
| CRIT11-C1, `a10-src` (16 kinds of state; box, content, ResizeObserver, layout-shift) | **96/96** | **78/78 + 18 UNMEASURED** (no Layout Instability API) | the same |

K2 in Playwright WebKit (`crit11-c1-a10-src-webkit.log`, `specimen-migrated`): rest option sizes 205.00×84.42 at 390 and 205.00×87.41 at 1440. Box and content max deviation is 0.000 px, ResizeObserver reads 0, and there are 0 `info-fail` lines. `crit10-k2-diag-webkit.log`, run unchanged in the same hold, still reads option 6 at **114.00** before any scroll. So the first scroll is what removes the placeholder, and pass 10's 4 cells were K2's consumer CSS, not selection. The weight-step plant's two extra WebKit passes (18 → 20) are the same two K2 cells.

### 2.2 · This seat's own attacks on the cure and on O-103c / O-103e

**Route A11** (`routes/A11/migrated.mjs`) is A10 imported unchanged, plus five C1 compositions. Each keeps C1's own anatomy with `shape="cell"` and moves one variable: `c1rtl` (the 47-label ladder under `dir="rtl"`), `c1sm` and `c1lg` (the ladder at `size="sm"` / `"lg"`), `c1rich` (12 options holding a 16 px `currentColor` glyph, a label, a count and a wrapping block-level note) and `c1multi` (`type="multiple"`, cumulative selection).

| read | D′ v9, A · B | planted, A · B (teeth) |
|---|---|---|
| CRIT11-GEOM `--attack`: geom, layout-property and **pseudo** cells gating; `c1rtl`, `c1sm`, `c1lg`, `c1rich` at 320, 390, 768 and 1440 (+ dark and PRT at 390 for `rtl` and `rich`); `c1multi` at 390 and 1440 by click | **126/126 · 126/126** | `weight-step`: **0/78 · 0/78** (e.g. `c1rtl` 390 +21.00 px, «Awaiting a reply from the87» 2 → 3 lines; `c1sm` 390 +19.00 px; `c1rich` 390 +21.00 px) |
| CRIT11-C1 `--scenes` the five A11 compositions, 390 and 1440, light, dark and PRT | **150/150 · 120/120 + 30 UNMEASURED** | — |
| CRIT11-GEOM `--media`: `c1` (390, 1440), `c1long`, `c1rich`, `preset`, `specimen` (390) under **forced colours, contrast (light), contrast (dark), reduced motion, coarse pointer, `--ui-scale` 1.5**; each condition verified by `matchMedia` or the computed `--ui-scale`, else UNMEASURED | **216/216 · 216/216**, every condition applied (0 UNMEASURED in either engine) | `a11y-unexempt` (the `:not(.toggle-group__item)` removed from `accessibility.css`'s contrast arm only), on the two contrast conditions: **0/72 · 0/72**: `border-*-width: 1px → 2px`, `::before` 182×38 → 180×36, max 2.00 px (`c1` 1440: group 192.00×367.48 → 192.00×369.48) |

So selection changes no geometry for C1 under every content variable and accessibility condition this seat could reach, in either engine. Each read fails a plant built to break it.
- `c1lg` reads the same geometry as the default size. The tile pad outranks the `lg` pill pad, so the `lg` trap that `styles.css:114-122` names stays shut.
- `c1multi` holds its geometry with up to 47 options on at once.

**Cure attack, by reading.** No selected-state weight, alias or opt-in is in `src`, `tests`, `demo` or `MIGRATION.md` (§1.3 scan). MIGRATION.md:136-142 still carries the pass-10 wording item ("Unset, every value is what it was" reads across the weight clause), already routed (§P10-4). MIGRATION.md:143-145 states the a11y exemption that the media plant falsifies, and the claim holds (E-3).

---

## 3 · Re-read (a): G on a pill row, and the gestalt

**Frames** (`D4-Dp11-crit/frames/`): `single-{light,dark}-{fine,coarse}-{chromium,webkit}`, `pill-badge-{light,dark,prt}-fine-*`, `single-prt-fine-*`, `c1-*`, `preset-*`. In each pair the top row is D′ v9 and the bottom the planted 600; the columns are selected and focused-selected.
- **Light:** «Power» sits on the one darker plate, in near-black ink among brown labels. That reads without the weight, fine and coarse, in both engines (carrier: fill 1.20:1 · 1.22:1, ink 3.23:1, `crit10-carrier-a10-src-*.log`).
- **Dark:** the selected pill is the one lighter plate with the one near-white label (fill 1.21 · 1.19:1, ink 2.06:1; c3 0.00 · 3.50 px², as pass 10 read). On `pill-badge` dark the ink step is 1.55-1.56:1, and the plate and the brightest label still single out «Sent». It reads at a glance among three or four, fine and coarse.
- **Focused-selected:** the ring stands a gap outside the plate in every frame.
- **The 600 row** is louder, but the D′ v9 row is not ambiguous. **G, re-read (a): met.** The weight step is not shown load-bearing on pills.
- **Tiles** (`c1-*`, `preset-*`): 16 px cards with a 2 px perimeter on the selected card in light and dark, the ring a gap outside it, flush at rest. That is card-like, as N-9 asks, and uncluttered.
- **PRT** (`single-prt-fine-*`, outside G): the selected pill's plate equals its neighbours' (1.00:1, `crit10-prt-tint-*`), and the ink alone carries at 3.23:1. That is the floor-owned PRT-tint item, reported in pass 10 and unchanged.

---

## 4 · For the registry (no row opened; no score changes)

| id | class | found by | placement | cure |
|---|---|---|---|---|
| **L-8** | **the route's own canon case times out under load.** «the tile corner is one declaration on the field rung; the pill keeps the stadium» (`radius-role-canon.test.ts:583`, added by `D4-Dp10.patch`) runs ~2 s alone and exceeds vitest's 5,000 ms default at load ≳ 30 (`Error: Test timed out in 5000ms`, 7/8 runs at 31-41). It failed `clean` once in RM11 and once here, and up to 25 plants in a loaded re-run. At load 11 it passes everywhere. The canon plants still FAIL it by assertion, so R-7's teeth stand | §1.4, this seat | landing, with L-6b's test edit (the landed patch's sha1 already moves there) | give the case an explicit timeout sized to its work (or reduce the work), so the unit verdict does not depend on machine load. Witness: the pair passes under `stress` at load 40, and the `canon-*` plants still fail it. With it, RM11's note: `unit.mjs` keeps each failure's message in the run JSON |
| L-9 (info) | **Playwright WebKit now emulates forced colours.** Playwright 1.61.1's WebKit applies `forcedColors: "active"`: `matchMedia("(forced-colors: active)")` is true in every forced cell of this seat's media read, and T-3's `c1-migrated forced` cell already reads 376.00 px² there. The carried `states` probe still skips the forced arm in WebKit by engine name (`pass-3/D4-Dp-spec/probes/states.mjs:79`), so R-4 / Q-9's forced cell reads Chromium only (a11y 6/6 · 3/3) | §2.2 | landing, optional | the probe asks `matchMedia` rather than the engine name. This seat's media read already covers C1's forced geometry in both engines (216/216) |
| info | the probe deadline: a sweep that reads rest after a first scroll, plus the pseudo cells, runs past `cli`'s default 1,800 s watchdog in Playwright WebKit at load ~20 | §1.4 | none (the probe's own; pass a `--deadline`) | — |
| reported | R-5: dark selected ink 1.56:1 on K2; the perimeter carries | every pass | — | — |
| reported | B-5: the kick, 0.16 · 0.15 px (want ≤ 0.05) | floor | — | — |
| reported | PRT-tint (pill fill 1.00:1 under PRT; ink carries 3.23:1) | pass 10, unchanged | owner | — |

None of these names an H9 cell that fails on D′ v9, and none is a row. L-8 is a timing budget on a unit case that passes at every load where the chain does not starve it. Its plants still fail the case by assertion. Under the seat's rule, the failure seen only under load is **NOT-REPRODUCED**.

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

| row | reading (Chromium · Playwright WebKit) | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18 | met |
| T-2 | 52/52 on `src`, `dist`, `dist-dev`, both engines | met |
| T-3 | migrated 43/43 · 43/43; C1 933.50 / 946.50 / 937.75 · 932.00 / 942.25 / 934.50 px² against 251 | met |
| **T-4** | migrated **42/42 · 42/42** on `src` and `dist`, the 18 L-5 cells 18/18 in each; falsifier 1 → 1 line, 184×56 unchanged; `weight-step` 30/42 · 30/42; CRIT11-GEOM 192/192 · 192/192, `dist` 112/112 · 112/112; CRIT11-C1 96/96 · 78/78; A11 126/126 · 126/126, 150/150 · 120/120; media 216/216 · 216/216; C1BOX 6/6; CRIT-C1 24/24 · 18/18 | met |
| T-5 | 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | 33/33 · 33/33 (the whole-count flip a library cell, NOT-REPRODUCED ×2) | met |
| T-7 | 24/24 · 24/24; XSCRIPT 19/19 ×3 | met |
| T-8 | 27/27; real Safari UNMEASURED (owner's safaridriver checkbox) | met |
| X-1 | `states` 54/54 · 54/54; FACT's `paint-state` (1 tab stop, `aria-checked`), both engines | met |
| X-2 | REPORT `name-ink` PASS light and dark, both engines | met |
| X-3 · X-4 · X-6 | T-1 and T-3 green on the migrated V2; CANON and CORNER green | met |
| X-5 | ATTACK `src-dev` 5/5, `dist` 3/3, both engines | met |
| X-7 | tone 12/12 · 12/12 | met |
| FV-1 · FV-3 | T-5, T-6 migrated green | met |
| FV-2 | T-2 52/52 ×3; FACT 92/92 ×3 with the fold's 12 `paint-*` cells; `on-item` 88/92, `unpinned` 90/92 | met |
| FV-4 · FV-5 · FV-6 · FV-7 | tone 12/12; T-5 arrows; ATTACK 5/5, 3/3; both engines | met |
| FV-8 | T-6 migrated PRT hover cells green | met |
| FV-9 | FACT 92/92 per flavour | met |
| FV-10 | `guard-gone`, `stamp-gone` FAIL (1 each at load 11, `unit-rerun2`) | met |
| R-1 | K2 on `dist` legible; T-2 52/52; CORNER 5/5; W-E `dist-dev` 1/6 = `dist` | met (O-103) |
| R-2 | FACT 92/92 per flavour; W-D 8/8 · 8/8 | met |
| R-3 | T-6 33/33 · 33/33, `kick-spring` PASS; `pop0` last read in pass 9 (21/33), not re-run: D′ v9 does not touch the commit | met |
| R-4 · R-6 · R-7 | hover 9/9 · 9/9, a11y 6/6 · 3/3; 16 px tiles, pills at h/2 (CORNER, T-1); CANON 4/4 with every plant failing; the canon unit fails A, S, H, I (at load 11, by assertion) | met |
| R-5 | K2 2.66:1 light, 1.56:1 dark (reported) | met, reported |
| R-8 | T-2 52/52 on `dist`, `dist-dev`; CORNER 5/5; ATTACK 3/3; FACT 92/92 `dist` | met (O-103) |
| R-9 | 2,935,947 B, +16,890 | met (the rebind is Q-14's) |
| R-10 | SHEET PASS 2/2 clean; FAILs `foreign`, `var`, `esc`, `apply`, `static`, `ts`, `const` and the three lane plants; FACT 88/92 on `foreign`, `var`, `esc`, `apply`, `concat`, both engines; the twin FAILs `const`, `static`, `ts`; `src` holds no second writer (L-6, L-6b routed in pass 10) | met |
| E-1 | every witness and probe gave a verdict in both engines; WebKit's absent Layout Instability API reads UNMEASURED; the one watchdog stop was re-run to a verdict | met |
| E-2 | F1, V2, the sibling state, the interactive descendant (ATTACK `dist` 3/3), the keyed reorder, the deselectable single green; C1 T-3 cells 3/3 · 3/3 | met |
| E-3 | SHEET `wrap` PASS at `MIGRATION.md:94-116`; the breaking note one clause, no alias; the a11y-exemption claim (MIGRATION.md:143-145) holds under the media read and fails its plant | met |
| E-4 | read under O-103 against this seat's Playwright WebKit run; real Safari UNMEASURED (owner's safaridriver checkbox) | met (O-103) |
| G | §3: card-like tiles; the selected pill unmistakable in light and dark, fine and coarse, both engines, without the weight; the ring a gap outside; flush at rest; no lighting layer; the commit carries state | met |

| block | met | not met |
|---|---:|---|
| T (8) | 8 | — |
| X (7) | 7 | — |
| FV (10) | 10 | — |
| R (10) | 10 | — |
| E (4) | 4 | — |
| G (1) | 1 | — |
| **total** | **40 / 40 (100 %)** | 0 |

**Clean, by §P10-6:**
- The score is 40/40 on this seat's own instrument, with T-4 including the L-5 cell.
- No row was opened, added, struck or renamed, and none was ruled PASS against its own instrument. T-4 rests on H9's own 42/42 in both engines; this seat's probes only add to it.
- The new items are routed to §4.
- Every difference from pass 10 was seen only under load and did not reproduce on re-run.

**Pass 11 is clean: 1 of 2.** Pass 12 runs the same way on `538b034c` / `80ab066d` and H9 `932637d53662`. **Verdict: ADVANCE.**

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

---

## 6 · Run hygiene

- `logs/chain.log` ends `CHAIN-DONE` twice: Phase 1 at 17:03:42 on 10-28, and Phase 2 at 05:01:05 on 10-29. Every Playwright WebKit hold exited 0, and none was cancelled. Hold E queued 88 min 14 s and the sweep re-run 86 min 29 s, both behind other seats' WebKit runs; both were waited out.
- Phase-1 order in `chain.sh`: state, patch, crit-scan, SHEET, libbuild, vue-tsc, builds, SHEET on the clean builds, plant builds, lane plants, units, unit plants, bundle, XSCRIPT. Phase 2: the Chromium battery, reads, film, attack and `states`, then WebKit A (battery), B (H reads), C (probes, film, `states`), D (the sweep), E (CRIT11-C1, carrier, PRT, K2) and F (A11 and media).
- No driver was edited while a chain read it. `rebuild-a11.sh`, `rerun.sh` and the two unit-rerun copies are new files, each with its own log directory.
- The smoke runs (`logs/smoke/`, `smoke.sh`: Chromium media and A11 C1 reads before phase 2) checked that the new probe paths ran and had teeth. No number above rests on them. The transient vitest config `vitest.crit.config.ts` lived only in this seat's worktree and was removed before the final state read.
- Fences: no tracked source edited; the only git writes were `worktree add` and `worktree remove`; checkout writes are `pass-11/D4-Dp11-critique.md` and `pass-11/D4-Dp11-crit/` only. Nothing under `~/.claude` was read.
- Scratch: the worktree is removed with `git worktree remove --force`, and the seat's directory `.claude/worktrees/bl/D4/p11/crit11/` is then deleted (§7).

## 7 · Scratch removal

At 07:29:40 on 10-29 the worktree read `git diff HEAD` `80ab066d67f8`. `git worktree remove --force …/p11/crit11/wt` then exited rc 0, `git worktree list` no longer showed it, and `rm -rf .claude/worktrees/bl/D4/p11/crit11/` exited rc 0 (`logs/final-state.log`). Nothing this seat started is still running. The headless runs on the machine at that time belong to other seats (`release-10.1.3`'s WebKit chain and another seat's `chain.sh`). The re-measure seat's `p11/remeasure11/` remains; it is not this seat's to remove.
