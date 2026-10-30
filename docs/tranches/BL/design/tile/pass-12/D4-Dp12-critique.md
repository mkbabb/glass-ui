# D4 · pass 12 · D4-D′ v9 · critique: the second confirmation, read fresh

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 12 (REGISTRY §P11-5 (2)). It authored no D4 seat in any pass and was no earlier D4 critic. It scores the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged), adds no row and picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree at HEAD `8acb7e0b0`. `git diff --stat fdea480e7 HEAD -- . ':!docs'` is empty at the start and at the end. By the end the checkout's HEAD was `7f0bc572d`, other seats' docs commits (`D4-Dp12-crit/logs/final-state.log`). So this seat measured the library that BUILD, the pass-10 critic, both pass-11 seats and the pass-12 re-measure measured. The worktree is detached at `.claude/worktrees/bl/D4/p12/crit12/wt`, with `node_modules` symlinked |
| hashes, checked before any measure, after every plant and at the end | `floor-v6.patch` **`09e742439213…`**; `D4-Dp10.patch` **`538b034c754b…`**, `git apply --check` clean on HEAD + floor v6. Post-apply **`git diff HEAD --binary \| shasum` = `80ab066d67f89cca14b2eaeb901ac7871cb8f75d`**; `shape.ts` **`9455d073…`**; `_shared/guard.ts` **`53c233af…`**. The `patch` stage reversed D′ v9 to a tree equal to HEAD + floor v6 in `src`, `tests`, `demo` and `MIGRATION.md`, then re-applied it (`logs/patch-check.log`). `plants.mjs state` read `80ab066d67f8 · status 9a89e9747069 · guard.ts 53c233af, shape.ts 9455d073` before and after every plant (`plant-builds.log`, `sheet-lane-plants.log`, the unit restores) and at the end (`final-state.log`, 22:55:45) |
| harness | **H9 `932637d53662`, 45 files, unedited.** It is printed on every log line, and `git status -- …/tile/harness` is empty at the end |
| owner | O-103c (Q-10 (i): C1 declares `shape="cell"`, is a cell in both states, and selection changes no geometry) and **O-103e** (the condition binds any content C1 can hold; L-5 is a cell in T-4's fold; the preferred cure is no weight change; §P9-2: no hidden twin on cells). Every other ruling stands as O-102b/O-103 record it. **Q-11 (a) is a DEFAULT, and D4-G stays BLOCK.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. E-4 is read against this seat's Playwright WebKit run (O-103) |
| engines | Chromium, Playwright's default headless shell, no GPU arguments. **Playwright WebKit** 26.5, headless. Every WebKit number below is Playwright WebKit, which is not Safari |
| machine | Every build, unit run and browser run went through `guarded --rss-gb 8`. `--light` was used only for engine-free reads. Every Playwright WebKit read sat inside a `guarded --exclusive webkit` hold, queued on the one machine-wide lock and never cancelled. Serial: one heavy run at a time. Loads at stage boundaries ran 4.70-26.41 (`logs/chain.log`). Hold waits: A 57 min 54 s, B 61 min 11 s, C 7 min 1 s, D 6 min 13 s, **E 1 h 45 min 7 s** (past 90 min; waited out, not cancelled), F 39 min 50 s, G 1 h 2 min 43 s |
| records | `D4-Dp12-crit/`: `run-crit12.sh` (every stage; derived from pass 11's driver, with the changes listed in its header), `chain.sh` (the order run); `probes/crit12-states.mjs` (the named attack); `logs/` (`logs/smoke/` holds the two pre-chain smoke runs of the named probe, cited only in §2.2's teeth note); `frames/` (24 frames + `pair.json`); `run-json.tgz` (224 run JSONs). The carried probes `crit11-geom.mjs` and `crit11-c1.mjs` and route `A11` are read in place from `../pass-11/D4-Dp11-crit/`, unchanged |

Citations: `D′c11` is `../pass-11/D4-Dp11-critique.md`, `RM12` is `REMEASURE.md`. Paths under `logs/` are `D4-Dp12-crit/logs/`. "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every pass-11 number reproduced in both engines, on the gating arms, with no difference to re-run.**
   - T-1 15/15 · 18/18; T-2 52/52 on `src`, `dist` and `dist-dev`; **T-3 43/43 · 43/43**.
   - **T-4 42/42 · 42/42 on `src` and on `dist`, the 18 L-5 cells 18/18 in each of the four.**
   - T-5 38/38 on both builds; T-6 33/33 · 33/33; T-7 24/24 · 24/24; T-8 27/27.
   - FACT 92/92 on `src`, `src-dev` and `dist`; CANON 4/4 with every plant at its tally; ATTACK 5/5 and 3/3; CORNER 5/5 and 5/5; C1BOX 6/6; CRIT-C1 24/24 · 18/18 + 6 UNMEASURED.
   - XSCRIPT 19/19 ×3; SHEET self-test 14/14; `states` 54/54 · 9/9 · 6/6 and 54/54 · 9/9 · 3/3; units `clean` 68/68 and all 37 plants at RM12's counts; bundle **2,935,947 B**.
2. **No reading differed from pass 11's at any load, so nothing was re-run** (§1.4). Unit stages ran at load 11.0-14.4, below 20. The L-8 timeout did not occur.
3. **The scroll-fixed re-reads hold.** The CRIT11-GEOM sweep reads **192/192 · 192/192**. In WebKit it finished inside one hold in 28 min 1 s with `--deadline 4800`, at load 7.8-12.1, so the watchdog was not touched. `dist` reads 112/112 · 112/112, and the `weight-step` plant 20/112 · 20/112. CRIT11-C1 reads 96/96 · 78/78 + 18 UNMEASURED. K2 reads rest at 205.00×84.42 / 205.00×87.41 with 0 `info-fail` lines, and `crit10-k2-diag` still reads 114.00 before the first scroll.
4. **The carried attacks, plus this seat's new one, find nothing on the cure or on O-103c / O-103e** (§2.1):
   - A11 `--attack` reads 126/126 · 126/126 on `src` and, new here, **126/126 · 126/126 on `dist`**.
   - A11's C1 compositions read 150/150 · 120/120 + 30 UNMEASURED; the media read 216/216 · 216/216, with 0 UNMEASURED.
   - Every plant keeps its teeth: `weight-step` 0/78 · 0/78; `a11y-unexempt` 0/72 · 0/72 (2.00 px).
5. **The named attack** (§2.2) is the `states` forced-colours arm through `matchMedia`, in this seat's copy of the probe, with a plant that removes the selected rule's forced pair.
   - **The geometry arm:** Playwright WebKit applies forced colours (`matchMedia` true in every cell). The arm reads **8/8 · 8/8** on D′ v9: C1 and the three sites hold their box at 0.00 px under forced colours and under contrast-more.
   - **The forced pair cell:** **4/4 · 4/4** on D′ v9 and **0/4 · 0/4** on the plant.
   - **The fill cell, which this seat set as gating before the run:** **4/4 · 0/4.** Playwright WebKit's emulated `Highlight` is `rgba(128, 188, 254, 0.6)`, which paints 1.53-1.55:1 on white `Canvas`.
   - **T-3's own forced verdict** (the carrier at ≥ 3:1 or the fill) PASSes in both engines on every site: C1 376.00 px² against the bar 251.00 in Playwright WebKit.
   - **Ruling (§2.2):** the fill cell reads no row. No row asks the fill alone to carry under a user palette, and the instrument of record calls the fill alone "decoration". So **no row opens.** Two items go to the landing list: L-9's witness as written cannot fail on its plant, and no H9 cell reads the forced pair (§4).
6. **Re-read (a): G on a pill row holds on this seat's frames** (§3), fine and coarse, light and dark, in both engines.
7. **Score: 40 / 40. No row opened, added, struck or renamed. Pass 12 is clean: 2 of 2.** Under §P11-5 that makes **D4 CONVERGED on D′ v9.** The convergence record is the agglomeration's to write.

---

## 1 · Re-run

`logs/chain.log` holds the order and the load at every boundary:
- **Phase 1** ran 10:00:21-10:07:21: state, patch, crit-scan, SHEET, libbuild, vue-tsc, builds, SHEET on clean builds, plant builds, lane plants, units, unit plants, bundle and XSCRIPT.
- **Phase 2** ran 10:08:11-22:55:27. First the Chromium battery, reads, film, attack, `states` and `forced`. Then seven Playwright WebKit holds:
  - A: the battery.
  - B: the H reads.
  - C: the probes, film and `states`.
  - D: the sweep.
  - E: CRIT11-C1, carrier, PRT and K2.
  - F: A11 and the media read.
  - G: the named attack and A11 on `dist`.
- `CHAIN-DONE` at 22:55:27. Every hold exited 0.

The builds ran through `build.mjs`, as in RM12, in seconds each: 11 clean builds, 10 plant builds, the three `weight-step` builds, `a11y-unexempt`, `forced-pair` and the three lane plants. Every `build.mjs` line names its route and flavour, and `a11-src` / `a11-dist` carry `migration D4-A11-crit [… c1rtl, c1sm, c1lg, c1rich, c1multi]`.

### 1.1 · The battery (`dp10-src`; `dist` and `dist-dev` where named)

| witness | migrated A · B | whole A · B | pass 11 |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 20/42 · 23/45 | the same |
| T-2 `src` · `dist` · `dist-dev` | — | **52/52** each, both engines | the same |
| **T-3** | **43/43 · 43/43** | 45/85 · 45/85 | the same |
| **T-4** `src` · `dist` | **42/42 · 42/42** each | 54/72 | the same |
| T-5 `src` · `dist` | **38/38** each, both engines | 87/116 · `dist` 88/117 | the same |
| T-6 | **33/33 · 33/33** | **64/88 · 64/88** | 63 → 64 (A), 64 (B) |
| T-7 | **24/24 · 24/24** | unmigrated 4/33 | the same |
| T-8, one run | **27/27** | 27/39, 13 unmeasured, among them the real-Safari cell: "You must enable 'Allow remote automation'…" (`src-T-8-both.log`) | the same |
| W-A · W-B · W-C · W-D · W-E | — | 5/9 · 9/25 · 0/8 · **8/8** · 1/3, both engines; W-E `dist`, `dist-dev` 1/6 | the same |

**T-4's L-5 cells** (run JSON `T-4-{chromium,webkit}.json` on `dp10-src` and `dp10-dist`) read **18/18 in each of the four**. The falsifier «Awaiting a reply from the» (25 characters) reads 1 line at rest, 184.00×56.00, weight 500, and is unchanged when selected. The `weight-step` plant reads **30/42 · 30/42** (`t4-weight-step-*.log`). Its 12 FAIL lines are the 390×844 `c1-ladder-migrated` cells, light, dark and PRT, by click and by keys, and each reads `max 21.00 px (group 192.00×1129.00 → 192.00×1150.00, option 11 selected) · RE-WRAP 1: option 11 «Awaiting a reply from the» 1 → 2 lines`. The 1440 cells PASS on the plant, as in every reference.

**C1 under T-3** (run JSON): Chromium 933.50 / 946.50 / 937.75 px² and Playwright WebKit 932.00 / 942.25 / 934.50 px², light / dark / PRT, against the bar 251.00. These are pass 11's numbers to the hundredth. The forced cell reads 11,821.75 px² in Chromium and **376.00 px² in Playwright WebKit**: above the bar, carried by the perimeter band (368.00 of 376.00). See §2.2.

### 1.2 · H9's, H8's and earlier cells

| cell | Chromium · Playwright WebKit | pass 11 |
|---|---|---|
| **SHEET** self-test | **14/14 OK** | the same |
| SHEET on `dp10-src` · `dp10-atk-src` | **PASS 2/2** each | the same |
| SHEET plants `foreign` `var` `esc` `apply` `static` `ts` `const` · `concat` `unpinned` · the 3 lane plants | **FAIL 1/2** ×7 · PASS 2/2 ×2 (by design) · **FAIL 1/2** ×3, each restore `equal` | the same |
| **FACT** `src` · `src-dev` · `dist` | **92/92** each, both engines | the same |
| FACT plants `foreign` `var` `esc` `apply` `concat` · `unpinned` · `--l3 on-item` | **88/92** each · **90/92** · **88/92**, both engines | the same |
| **CANON** clean · `a` `s` `h` `layer` `foreign` `unlayered` `cq` `lowlayer` `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` · **CORNER** `src` · `dist` | **5/5 · 3/3 · 5/5 · 5/5**, both engines | the same |
| **REPORT** | 3/4 + 1 unmeasured (the mark, Q-3); `name-ink` PASS light and dark; `kick-spring` PASS; both engines | the same |
| REPORT kick (B-5, reported, floor-owned) | **0.14 px · 0.14 px** (105 frames A), want ≤ 0.05 | 0.16 · 0.15 |
| T-4 / FACT fixture self-test | **20 OK**, both engines | the same |
| **C1BOX** `src` · `dist` | **6/6 · 6/6**, both engines | the same |
| **CRIT-C1** `src` · `dist` | **24/24** each · **18/18 + 6 UNMEASURED** each | the same |
| **XSCRIPT** self · pair p8 · pair p7 | **19/19 · 19/19 · 19/19** | the same |
| `states` states · hover · a11y (X-1, R-4) | **54/54 · 9/9 · 6/6** · **54/54 · 9/9 · 3/3** | the same |
| X-7 tone | **12/12 · 12/12** | the same |
| carried ink (R-5, reported) | `preset` 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT; `strip` 3.23:1 light, 2.06:1 dark; both engines | the same |
| PILL-WIDTH (re-read (b), info) | D′ v9 0.00 px in every scene; planted 600 +1.20 / +1.00 / +1.27 · +1.20 / +1.00 / +1.28, `vertical` 0.00 | the same, value for value |
| CRIT10-CARRIER, `single` fine | fill 1.20:1 · 1.22:1 light, 1.21:1 · 1.19:1 dark; ink 3.23:1 light, 2.06:1 dark; PRT fill 1.00:1 | the same |

### 1.3 · Units, types, bundle (engine-free)

- **vue-tsc**: app 0, test 0. **libbuild**: exit 0. **bundle**: 2,935,947 B unpacked, 844 files; `dist` 2,542,341 B in 840 files; JS gzip-9 329,772 B; +16,890 over the ratchet datum 2,919,057 (Q-14).
- **Units**: the whole suite ran at load 12.52 → 11.46: 2,357 ran, 2,354 passed, **3 failed** (HEAD's `gate:boot-graph` build arm), 1 skipped (`unit-all.log`). The 37 plants ran in a hold at load 11.02 → 14.35: **`clean` 68/68**. Every plant's `passed, failed` pair equals RM12's (`logs/unit-plant-*.log` against `../logs/unit-plant-*.log`, scripted diff: 0 differences).
- **This seat's source scan** (`crit-scan.log`): every lane-sheet rule keyed on a selected state writes only these:
  - `::before`'s `opacity` and `transition-duration`
  - `--selection-ink`
  - `background-color` (12 % and 16 % on hover)
  - the forced-colours `border-color` / `background` / `color`
  - the kick's `animation`
  
  The two `accessibility.css` arms that write `border-width: 2px !important` on selected states exempt the item (`:not(.toggle-group__item)`, lines 21 and 42). No selected-state font, spacing, padding, margin, border-width, gap or size write reaches `.toggle-group__item`.

### 1.4 · What moved under load

Nothing scored moved. Every reading above equals pass 11's re-run or reference value, so the load discipline's re-run clause had no reading to act on.
- **Chromium T-6 whole** read 64/88 at load 10.11. Pass 11's chain read 63/88, which pass 11 already re-ran to 64/88.
- **The kick** reads 0.14 · 0.14 px against pass 11's 0.16 · 0.15. This is non-gating drift inside the 0.13-0.17 band every pass has read; B-5's want of ≤ 0.05 fails in every pass.
- **L-8** was not exercised. No stage that runs the canon case started above load 14.4.
- The highest load of the day, **32.03**, fell inside the Chromium attack hold, during CRIT11-C1 on A11 (12:49-13:17). That read gave 150/150, pass 11's value.

---

## 2 · Attacks

### 2.1 · The scroll-fixed re-reads and the carried attacks

| read | Chromium | Playwright WebKit | pass 11 |
|---|---|---|---|
| CRIT11-GEOM sweep, `a10-src` (47 labels, 192 and 256 px, 12 viewports, click and keys, 53 layout properties), `--deadline 4800` | **192/192** (26 min 9 s) | **192/192** (28 min 1 s, load 7.8-12.1) | 192 · 192 (WebKit on re-run) |
| `pseudo` cells (info) | 96/96 none differ | 96/96 none differ | the same |
| CRIT11-GEOM `--quick`, `a10-dist` | **112/112** | **112/112** | the same |
| CRIT11-GEOM `--quick`, `weight-step` (`a10-ws-src`) | 20/112 | 20/112 | the same |
| CRIT11-C1, `a10-src` | **96/96** | **78/78 + 18 UNMEASURED** (no Layout Instability API) | the same |
| A11 `--attack`, `a11-src` | **126/126** | **126/126** | the same |
| A11 `--attack`, `weight-step` (`a11-ws-src`) | 0/78 | 0/78 | the same |
| **A11 `--attack`, `a11-dist` (this seat, new)** | **126/126** | **126/126** | not read |
| CRIT11-C1 `--scenes` A11's five compositions | **150/150** | **120/120 + 30 UNMEASURED** | the same |
| media read (forced colours, contrast light and dark, reduced motion, coarse, `--ui-scale` 1.5) | **216/216** | **216/216**, 0 UNMEASURED | the same |
| media read on `a11y-unexempt`, contrast conditions | 0/72 | 0/72, max 2.00 px | the same |

K2 in Playwright WebKit (`crit11-c1-a10-src-webkit.log`, `specimen-migrated`) reads rest options at 205.00×84.42 (390) and 205.00×87.41 (1440), with 0 `info-fail` lines. `crit10-k2-diag-webkit.log` reads option 6 at 114.00 at t0 and t1, and 84.42 once it is scrolled into view. So the placeholder is K2's consumer CSS before a first scroll, not selection, as pass 11 found.

**The new attack on `dist`.** O-103e's condition binds any content C1 can hold, and the shipped artifact is `dist`. A11's five compositions (`rtl`, `sm`, `lg`, rich content, `type="multiple"`) had only been read on `src`. On `dist` they read **126/126 · 126/126**, cell for cell with `src`. The cure holds in the production flavour under every composition this seat could reach.

### 2.2 · The named attack: the `states` forced-colours arm through `matchMedia`

**The instrument.** `probes/crit12-states.mjs` is this seat's copy of the carried probe (`pass-3/D4-Dp-spec/probes/states.mjs`). It does not edit H9, and it replaces no H9 or carried reading. It has two parts:
- **`--part a11y`**: the carried arm, except that both engines get the same media list (contrast-more and forced colours). Each cell asks `matchMedia` after `emulateMedia`. A condition the engine did not apply would read UNMEASURED, not PASS, and would not be dropped. The gate is unchanged: the selected tile's box and content move < 0.5 px.
- **`--part forced`**: in a context opened with `forcedColors: "active"`, verified by `matchMedia`. It has two gating cells and one info cell, declared in the probe's header before the run:
  - **pair**: the selected item's computed `background-color` and `color` equal the engine's resolved `Highlight` / `HighlightText` (resolved on a probe element in the same page), and an unselected sibling's background does not equal `Highlight`.
  - **fill**: the selected plate's interior against the unselected sibling's at ≥ 3:1, by T-3's crops (`measure.mjs` `selectedSeparation`, ink hidden, scale pinned).
  - **info**: T-3's own verdict, `judgeT3`.

**The plant `forced-pair`.** `background: Highlight; color: HighlightText` are deleted from `.toggle-group__item[data-state="on"]` in the lane sheet's `@media (forced-colors: active)` arm, and `border-color: Highlight` is kept. It is built on the route, restored, and checked `equal` (`plant-builds.log`).

The sites are `preset-migrated`, `specimen-migrated`, `strip-migrated` and `c1-migrated`.

| read | D′ v9, A · B | `forced-pair` plant, A · B |
|---|---|---|
| a11y, contrast-more (geometry) | **4/4 · 4/4**, `matchMedia` true | 4/4 · 4/4 |
| a11y, **forced colours** (geometry) | **4/4 · 4/4**, `matchMedia` true in Playwright WebKit (the H9-carried arm reads WebKit contrast only, 3/3) | 4/4 · 4/4 |
| forced **pair** | **4/4 · 4/4**: selected bg = `Highlight` (A `rgba(5, 0, 73, 0.8)`, B `rgba(128, 188, 254, 0.6)`), ink = `HighlightText` | **0/4 · 0/4**: selected bg `oklab(… / 0.12)` (the rest tint), ink the selection ink |
| forced **fill** (gating as declared) | **4/4 · 0/4**: A 11.31:1; **B 1.53-1.55:1** (`#b2d3f6` vs `#ffffff`) | 0/4 · 0/4: A 1.00:1, B 1.34-1.39:1 |
| T-3's verdict under forced colours (info) | 4/4 · 4/4: A 12,333.75 / … / 11,821.75 px²; **B 396.75 / 444.00 / 113.00 / 376.00 px²** against bars 267 / 291 / 86 / 251, carried by the perimeter band | **4/4 · 4/4**: A 987.75 / … / 923.50; B 400.00 / 446.50 / 114.00 / 378.00 |

Logs: `crit12-states-{a11y,forced}-{dp10-src,plant-forced-pair}-{chromium,webkit}.log`. The pre-chain Chromium smoke runs (`logs/smoke/`, two sites) read the same.

**What the cells show.**
- **Geometry (O-103c's condition) holds under forced colours in both engines**, through `matchMedia`, on C1 and the three sites. This is the reading L-9 asked for: WebKit's forced arm reads **4/4**, where the carried probe skips it by engine name.
- **The library's forced pair paints in both engines.** The selected tile's computed background and ink are the engine's own `Highlight` / `HighlightText`, and the plant breaks that in both engines.
- **The fill cell fails on D′ v9 in Playwright WebKit by assertion, and not by load.** It reads the same at load 12.3-13.5 on four sites, so it is no NOT-REPRODUCED reading. The cause is the engine's emulated palette, not library paint. Playwright WebKit resolves `Highlight` to `rgba(128, 188, 254, 0.6)`, a 60 % light blue, and `Canvas` to white. The selected plate therefore paints exactly what the user's palette says, and that palette separates the plate from `Canvas` at 1.55:1. Chromium's emulated palette (`rgba(5, 0, 73, 0.8)` on white) gives 11.31:1. The emulation also forces no author colours: the unselected ink stays `rgb(112, 89, 66)` in Playwright WebKit, against `rgb(0, 0, 0)` in Chromium. So the emulation is a media flag over author paint, not a forced palette.

**Ruling: the failing cell reads no row, and no row opens.** The fill cell asks the selected plate's fill alone to separate at ≥ 3:1 under forced colours. No row on §P2-6.3's list asks that:
- **T-3** asks "≥ 3:1 on painted pixels, **or** a second carrier the item's own content cannot override, in light, dark and PRT". Forced colours are not among T-3's conditions. H9 reads them anyway, by T-3's own rule, and in both engines the carrier holds: Playwright WebKit's perimeter band carries 368.00 of C1's 376.00 px² against 251.00, and this seat's own `judgeT3` cells read 4/4 · 4/4. The instrument of record prints the fill alone as "decoration, reported apart from the edge" (`measure.mjs:109-118`).
- **R-4's and Q-9's forced half** is geometry, and it reads 4/4 · 4/4.
- **§2.5's floor** names forced colours as the pattern (`styles.css`'s forced arm). The pattern is present and paints the system pair, as the pair cell proves.

So the fill gate was this seat's over-specification. By §P2-6.3 a critic may not rule a row PASS against its own instrument, and the converse applies: a critic may not open a row on a threshold no row holds. **This seat records the 0/4 in full rather than re-labelling the cell after the run.** It does not count the cell against any row. The agglomeration may weigh it. If it reads the cell against T-3, T-3's own rule still reads 4/4 · 4/4 on this seat's cells, and 43/43 · 43/43 on H9's. What the cell does show goes to the landing list and to the owner (§4).

---

## 3 · Re-read (a): G on a pill row, and the gestalt

**Frames** (`D4-Dp12-crit/frames/`): `single-{light,dark}-{fine,coarse}-{chromium,webkit}`, `pill-badge-{light,dark,prt}-fine-*`, `single-prt-fine-*`, `c1-{light,dark}-fine-*` and `preset-{light,dark}-fine-*`. In each pair the top row is D′ v9 and the bottom row the planted 600. The columns are selected and focused-selected.
- **Light** (`single-light-fine-chromium`, `single-light-coarse-webkit`): «Power» sits on the one darker plate in near-black ink, among brown labels. It reads at a glance without the weight, fine and coarse, in both engines. The carrier: fill 1.20 · 1.22:1, ink 3.23:1 (`crit10-carrier-a10-src-*.log`).
- **Dark** (`single-dark-coarse-chromium`, `single-dark-fine-webkit`): the selected pill is the one lighter plate with the one near-white label (fill 1.21 · 1.19:1, ink 2.06:1). On `pill-badge-dark-fine-chromium`, «Sent» is singled out by its plate and its brightest label.
- **Focused-selected:** the ring stands a gap outside the plate in every frame.
- **The 600 row** is louder, but the D′ v9 row is not ambiguous. **G, re-read (a): met.** The weight step is not shown load-bearing on pills.
- **Tiles** (`c1-dark-fine-chromium`, `preset-light-fine-webkit`): 16 px cards, flush at rest. «Messaged · 12» and «Snappy · 0.35 s · ζ 0.78» carry a 2 px perimeter and the darker plate, with the ring a gap outside. That is card-like, as N-9 asks, and uncluttered.
- **PRT** (outside G): the selected pill's plate equals its neighbours' (1.00:1, `crit10-carrier`), and ink alone carries at 3.23:1. This is the floor-owned PRT-tint item, unchanged.

---

## 4 · For the registry (no row opened; no score changes)

| id | class | found by | placement | cure and witness |
|---|---|---|---|---|
| **L-9, witness correction** | L-9's witness as §P11-3 writes it ("a forced-colours plant (the selected rule's `Highlight` pair removed) FAILs it in both engines") **cannot fail**. The `states` a11y arm reads geometry, and removing the pair moves nothing: 4/4 · 4/4 on the plant. The probe change itself (ask `matchMedia`, not the engine name) is sound: WebKit's forced geometry reads 4/4 | §2.2, this seat | landing (H10), with L-9 | Keep L-9's `matchMedia` change. Pair it with a **paint** cell on the forced arm: the selected item's computed background and ink equal the resolved `Highlight` / `HighlightText` (this seat's `pair` cell). Witness: D′ v9 4/4 · 4/4; the `forced-pair` plant 0/4 · 0/4 |
| **coverage (forced pair)** | **No H9 cell reads the library's forced pair.** With the pair deleted, T-3's forced cells still PASS in both engines on the perimeter band (A 923.50-987.75 px², B 114.00-446.50 px² against bars 86-291), FACT and CORNER do not read the forced arm, and the `states` a11y arm reads geometry. A regression that drops `background: Highlight; color: HighlightText` would ship green. It is no failing cell on D′ v9: the pair paints in both engines (4/4 · 4/4) | §2.2 | landing (H10), the same cell as above | the same witness pair. One cell closes both items (P-3) |
| info, for the owner | Under Playwright WebKit's emulated forced palette (`Highlight` `rgba(128, 188, 254, 0.6)` on white), the selected tile's **plate** separates at 1.53-1.55:1, and the perimeter carries (C1 376.00 px² against 251). The library paints the system pair as the user's palette defines it, and `accessibility.css` yields to that palette by design. This is a fact about the palette, as R-5 is a fact about the dark ink. It is reported, not a row | §2.2 | reported | none owed by the library |
| info | Playwright WebKit's `forcedColors: "active"` sets the media query but forces no author colour (unselected ink `rgb(112, 89, 66)`, against Chromium's `rgb(0, 0, 0)`). A WebKit forced cell therefore reads the library's own forced rules over un-forced author paint, which is not a forced palette | §2.2 | HARNESS.md note at landing | — |
| reported | R-5: dark selected ink 1.56:1 on K2; the perimeter carries | every pass | — | — |
| reported | B-5: the kick, 0.14 · 0.14 px (want ≤ 0.05) | floor | — | — |
| reported | PRT-tint (pill fill 1.00:1 under PRT; ink carries 3.23:1) | pass 10, unchanged | owner | — |

None of these names an H9 cell that fails on D′ v9, and none is a row. L-6, L-6b, L-7, L-8, the MIGRATION sentence and Q-14 stand as §P11-3 routes them. This seat found nothing that changes them.

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

| row | reading (Chromium · Playwright WebKit) | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18 | met |
| T-2 | 52/52 on `src`, `dist`, `dist-dev`, both engines | met |
| T-3 | migrated 43/43 · 43/43; C1 933.50 / 946.50 / 937.75 · 932.00 / 942.25 / 934.50 px² against 251; forced (H9, info) 11,821.75 · 376.00 | met |
| **T-4** | migrated **42/42 · 42/42** on `src` and `dist`, the 18 L-5 cells 18/18 in each of the four; falsifier 1 → 1 line, 184.00×56.00, weight 500 → 500; `weight-step` 30/42 · 30/42 (+21.00 px, 1 → 2 lines). This seat's probes add to it: CRIT11-GEOM 192/192 · 192/192, `dist` 112/112 · 112/112; CRIT11-C1 96/96 · 78/78; A11 126/126 · 126/126 on `src` **and `dist`**; 150/150 · 120/120; media 216/216 · 216/216; forced a11y (`matchMedia`) 8/8 · 8/8; C1BOX 6/6; CRIT-C1 24/24 · 18/18 | met |
| T-5 | 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | 33/33 · 33/33 (whole 64/88 · 64/88) | met |
| T-7 | 24/24 · 24/24; XSCRIPT 19/19 ×3 | met |
| T-8 | 27/27; real Safari UNMEASURED (owner's safaridriver checkbox) | met |
| X-1 | `states` 54/54 · 54/54; FACT's `paint-state` (1 tab stop, `aria-checked`, weight 500 = 500), both engines | met |
| X-2 | REPORT `name-ink` PASS light and dark, both engines | met |
| X-3 · X-4 · X-6 | T-1 and T-3 green on the migrated V2; CANON 4/4 and CORNER 5/5 | met |
| X-5 | ATTACK `src-dev` 5/5, `dist` 3/3, both engines | met |
| X-7 | tone 12/12 · 12/12 | met |
| FV-1 · FV-3 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 52/52 ×3; FACT 92/92 ×3 with the fold's 12 `paint-*` cells; `on-item` 88/92, `unpinned` 90/92 | met |
| FV-4 · FV-5 · FV-6 · FV-7 | tone 12/12; T-5 arrows; ATTACK 5/5 and 3/3; both engines | met |
| FV-8 | T-6 migrated PRT hover cells green | met |
| FV-9 | FACT 92/92 per flavour | met |
| FV-10 | `guard-gone`, `stamp-gone` FAIL (67/68 each, at load ≤ 14.4) | met |
| R-1 | K2 on `dist` legible; T-2 52/52; CORNER 5/5; W-E `dist-dev` 1/6 = `dist` | met (O-103) |
| R-2 | FACT 92/92 per flavour; W-D 8/8 · 8/8 | met |
| R-3 | T-6 33/33 · 33/33, `kick-spring` PASS; `pop0` last read in pass 9 (21/33): D′ v9 does not touch the commit | met |
| R-4 · R-6 · R-7 | hover 9/9 · 9/9, a11y 6/6 · 3/3 (and through `matchMedia` 8/8 · 8/8, §2.2); 16 px tiles, pills at h/2 (CORNER, T-1); CANON 4/4 with every plant failing; the canon unit fails A, S, H, I by assertion (load ≤ 14.4) | met |
| R-5 | K2 2.66:1 light, 1.56:1 dark (reported) | met, reported |
| R-8 | T-2 52/52 on `dist`, `dist-dev`; CORNER 5/5; ATTACK 3/3; FACT 92/92 `dist` | met (O-103) |
| R-9 | 2,935,947 B, +16,890 | met (the rebind is Q-14's) |
| R-10 | SHEET PASS 2/2 clean; FAILs `foreign`, `var`, `esc`, `apply`, `static`, `ts`, `const` and the three lane plants; FACT 88/92 on `foreign`, `var`, `esc`, `apply`, `concat`, both engines; the twin FAILs `const`, `static`, `ts`; `src` holds no second writer (L-6, L-6b routed) | met |
| E-1 | every witness and probe gave a verdict in both engines; WebKit's absent Layout Instability API reads UNMEASURED; no watchdog stop | met |
| E-2 | F1, V2, the sibling state, the interactive descendant (ATTACK `dist` 3/3), the keyed reorder, the deselectable single green; C1 T-3 cells 3/3 · 3/3 | met |
| E-3 | SHEET's MIGRATION-wrap cell PASS; the breaking note one clause, no alias; the a11y-exemption claim (MIGRATION.md:143-145) holds under the media read and fails its plant | met |
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

**Clean, by §P11-5:**
- The score is 40/40 on this seat's own instrument, with T-4 including the L-5 cell.
- No row was opened, added, struck or renamed.
- No row was ruled PASS against its own instrument. T-4 rests on H9's own 42/42 in both engines, and every probe of this seat only adds cells.
- The named attack's failing `fill` cell is recorded in full and ruled, in §2.2, to read no row's requirement.
- The new coverage and record items are routed in §4, as §P11-3 routes its own.

**Pass 12 is clean: 2 of 2. D4 CONVERGED on D′ v9**, subject to the agglomeration's reading of §2.2. **Verdict: ADVANCE.**

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

---

## 6 · Run hygiene

- `logs/chain.log` ends `CHAIN-DONE` twice: Phase 1 at 10:07:21 and Phase 2 at 22:55:27. Every Chromium hold and every Playwright WebKit hold exited 0. None was cancelled. Hold E queued 1 h 45 min 7 s behind other seats' WebKit runs and was waited out.
- **The driver** `run-crit12.sh` is pass 11's `run-crit11.sh` with these changes, each listed in its header:
  - re-pointed to this seat's worktree, logs and frames;
  - the carried probes and A11 read in place from pass 11;
  - `--deadline 4800` on the sweep and on CRIT11-C1;
  - the duplicate A11 `--attack` read dropped from `attack-geom-inner` (`attack-media-inner` reads it);
  - added: `a11-dist`, the `forced-pair` plant, and stages `forced-inner`, `forced-chromium` and `webkit-g`.
  
  No driver was edited while a chain read it.
- **Fences:**
  - No tracked source was edited, and the harness is unedited.
  - The only git writes were `worktree add` and `worktree remove`.
  - Checkout writes are `pass-12/D4-Dp12-critique.md` and `pass-12/D4-Dp12-crit/` only.
  - Nothing under `~/.claude` was read; `guarded` was only invoked.
  - Every browser was Playwright's default headless shell with no GPU arguments, one browser per run, with a fresh context per cell, each closed in a `finally`.
- **Scratch:** the worktree is removed with `git worktree remove --force`, and `.claude/worktrees/bl/D4/p12/crit12/` is deleted (§7).

## 7 · Scratch removal

At 22:55:45 the worktree read `git diff HEAD` `80ab066d67f8` (`final-state.log`). The removal of `…/p12/crit12/wt` and `…/p12/crit12/` is recorded in `logs/teardown.log`.
