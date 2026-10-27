# D4 · pass 9 · D4-D′ v8 · critique: the confirmation pass, on the same build and H8

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 9 (REGISTRY §P8-6 seat 2), the completion seat. The first pass-9 critic wrote the driver and returned at stage 3 of 16 with no browser cell run and no row scored; this seat re-created the worktree and ran the whole order to `CHAIN-DONE`. It authored no D4 seat in any pass. It scores the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged), adds no row and picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `c905a7919`. Every commit since pass 8's build commit `78fc8f3b8` touches `docs/` only. Detached worktree `.claude/worktrees/bl/D4/p9/crit9/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v6.patch` sha1 **`09e74243`** (39 files, +1452 / −272), then `D4-Dp8.patch` **`b5f4ae22`** (8 files, +461 / −52). `git diff HEAD` read **`5d08df87ebbe`** with 27 dirty `src` paths (`D4-Dp9-crit/logs/state.log`). It read the same after every plant stage (`sheet-plants.log`, `plant-builds.log`), and `unit.mjs` checked every unit plant's restore byte for byte (no exit 2) |
| owner | **INBOUND O-103c**, the delegate per O-102b: Q-10's remainder **(i)**, "C1 declares shape=\"cell\"", on the condition that C1 is a cell in both states and selection changes no geometry. Every other ruling stands as O-102b/O-103 record it: Q-13 D′ (F struck); Q-10 (b)+(i); Q-5 (b) only; Q-15 (a); Q-2 (b); Q-3 (a); O-1 (a). **Q-11 (a) is a DEFAULT**, and D4-G stays BLOCK. The safaridriver checkbox is not granted, so E-4 is read against this seat's Playwright WebKit run (O-103) |
| harness | **H8 `4159e027cdcf`** (43 files, `rev` H8), unedited. Every witness, SHEET, UNIT and XSCRIPT line prints it |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell, no `channel`, no GPU arguments) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Every WebKit number below is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. T-8's driver answered "You must enable 'Allow remote automation'" (`logs/src-T-8-both.log`) |
| machine | Every stage ran through `~/.claude/guard/guarded --rss-gb 8`; only engine-free runs (SHEET, vue-tsc, the bundle read, XSCRIPT) took `--light`. `chain.sh` is serial: one heavy run at a time. The build hold queued 7 min for admission (13:31:34 → 13:38:31). **Both Playwright WebKit holds ran under `--exclusive webkit`**: hold A waited **6 min 48 s** (15:31:17 → 15:38:05) and ran to 16:01:16; hold B waited **11 min 58 s** (16:01:16 → 16:13:14) and ran to 17:11:58. This seat's diagnostic queued on the same lock for **27 min 53 s** (17:15:10 → 17:43:03) and ran to 17:44:42 (§3.1). No wait was cancelled. Loads at stage boundaries ran 20.99-44.01 (`logs/chain.log`, and the first and last line of every log), two to four times pass 8's. No cell stalled or crashed, and no tally moved with load: every tally pass 8 printed reads the same here. The only numbers that moved are the reported kick (Chromium 0.17 px against pass 8's 0.16) |
| records | `D4-Dp9-crit/`: `run-crit9.sh` (every stage), `chain.sh` (the order run), `diag.sh` and `probes/crit9-c1-diag.mjs` (this seat's diagnostic, §3.1), `probes/crit9-c1.mjs` and `routes/A9` (the first seat's attack, run here), `logs/` (every log cited; the interrupted attempts in `logs/attempt1-3/`), `frames/` (G's glance pair on D′ v8: C1 and the preset, light and dark, both engines), `run-json.tgz` (every run JSON quoted here) |
| fences | No tracked source in the checkout was edited. Patches, plants and restores touched only the seat worktree. The only git writes were `git worktree add` and `git worktree remove --force`. Checkout writes: this file and `pass-9/D4-Dp9-crit/`. No sibling repo and nothing under `~/.claude` was read |

Citations: `D′c8` is `../pass-8/D4-Dp8-critique.md`; `R8` is REGISTRY's pass-8 part (§P8); `crit/` is `D4-Dp9-crit/`. "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every pass-8 number reproduced, in both engines, at two to four times pass 8's load.**
   - Migrated arm: T-1 15/15 · 18/18. T-2 52/52 on `src`, `dist`, `dist-dev`. **T-3 43/43 · 43/43**, C1 at 933.50 / 946.50 / 937.75 px² · 932.00 / 942.25 / 934.50 against 251, to the hundredth pass 8's. T-4 24/24 · 24/24. T-5 38/38 · 38/38 (also `dist`). T-6 33/33 · 33/33. T-7 24/24 · 24/24. T-8 27/27. W-D 8/8 · 8/8.
   - FACT 80/80 on `src`, `src-dev`, `dist`, both engines. CANON 4/4 with every plant at its tally. ATTACK 5/5, 3/3. CORNER 5/5, 5/5. REPORT `name-ink`, `kick-spring` PASS. XSCRIPT 19/19 · 19/19. C1BOX 6/6. `l3-bare` 12/12. CRIT-L3 32/32. CRIT-C1 24/24 · 18/18 + 6 UNMEASURED.
   - Units clean 67/67, with every pass-8 plant at its pass-8 count. The whole suite ran 2,356 cases with HEAD's 3 `boot-graph` failures. vue-tsc 0 · 0. Bundle **2,935,932 B**.
2. **O-103c's condition holds on C1, now read sub-pixel and inside the option.** `crit9-c1` reads every box with `getBoundingClientRect`, transforms neutralised, and every label and count span inside every option, by real click, hover, held press, Tab and ArrowDown, at 390×844 and 1440×900, light, dark and PRT, on `src` and `dist`. On C1 and on C1 under `--selection-paint: bare`: **0.000 px** for the group, the options and their children, label line counts unchanged, ResizeObserver 0, Layout Instability 0 entries (Chromium; UNMEASURED in Playwright WebKit). The bare C1 keeps its perimeter: 877-951 px² against a 240-255 bar, both engines.
3. **The condition holds on C1's strings, not by construction (§3.1).** C1's anatomy at its own 192 px, holding a label at a wrap boundary, re-wraps when selected: "Awaiting a reply from the" goes 1 → 2 lines at 390×844, the option 184×56 → 184×77 (+21 px, scroll-free), weight 500 → 600, by click and by ArrowDown, in both engines. Chromium's Layout Instability API records 4 entries (sum 0.00585); ResizeObserver records 12 changes in both engines. No consumer site and no library scene carries that content, so no checklist row reads it. **It goes to the owner and the landing list as L-5**, with the evidence.
4. **Three more writer spellings pass both static readers (§3.2).** A name built by concatenation in `.ts`, a CSS-escaped name (`--selection\-tile`), and a Tailwind `@apply [--selection-tile:flush]` each pass SHEET 2/2 and the unit twin 67/67. The CSS pipeline compiles both CSS spellings to a plain `--selection-tile: flush` in the built sheet, and **FACT catches both in paint: 76/80, both engines**, the same tally as `foreign` and `var`. The concatenation is caught by nothing, like pass 8's `const`. **L-1a's planned cure catches none of the three**: it reads `"--selection-tile"` string literals in `.ts`/`.vue`. `src` holds none of them (`state.log`), so R-10 stays met. They go to the landing list as **L-1b**.
5. **Two instrument faults, one this seat's own (§3.3).** `crit9-c1`'s position read counts the window scroll twice, so its `box-no-shift` and `content-no-shift` cells on `c1long` (413 px, 821 px) and the info scenes (72-94 px) are artefacts. This seat's diagnostic proves it (extra = `scrollY`, exactly) and re-reads the re-wrap scroll-free. The diagnostic's own first model-write pass was vacuous on `c1long`, and the click pass replaces it.
6. **Score: 40 / 40. No row opened, added, struck or renamed.** Pass 9 is **clean** by §P8-6's definition. With pass 8 that is two consecutive clean passes on one build: **CONVERGED** on the fixed list. L-5 sits close to the owner's condition. If the owner reads O-103c as "no layout shift by construction", L-5 becomes a row and the count restarts. §4 puts that question.

---

## 1 · Re-run

`logs/chain.log` holds the order: state, SHEET, SHEET plants, libbuild, vue-tsc, the builds (one hold), plant builds, the suite, unit plants, bundle, XSCRIPT; then the Chromium battery, the Chromium reads and probes, the Chromium glance pair, and Playwright WebKit holds A (battery) and B (reads, probes, glance pair). The chain ran 13:27:47 → 17:11:58 and ended `CHAIN-DONE`.

### 1.1 · The battery (`dp8-src`; `dp8-dist` and `dp8-dist-dev` where named)

| witness | migrated A · B | whole A · B | `D′c8` |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 20/42 · 23/45 | the same |
| T-2 `src` · `dist` · `dist-dev` | — | **52/52** each, both engines | the same |
| **T-3** | **43/43 · 43/43** | 45/85 · 45/85 | the same |
| T-4 | **24/24 · 24/24** | 36/54 · 36/54 | the same |
| T-5 `src` · `dist` | **38/38** each, both engines | 87/116; `dist` 88/117 | the same |
| T-6 | **33/33 · 33/33** | 64/88 · 64/88 | the same |
| T-7 | **24/24 · 24/24** | 24/24 | the same |
| T-8, one run | **27/27** | 27/39 (real Safari UNMEASURED) | the same |
| W-A · W-B · W-C · W-D · W-E | — | 5/9 · 9/25 · 0/8 · **8/8** · 1/3, both engines; W-E `dist` · `dist-dev` 1/6 · 1/6 | the same |

Logs: `battery-src-chromium.log`, `src-*-webkit.log`, `src-T-8-both.log`, `dist-*`, `distdev-*`. Chromium ran at load 30.25-42.18; hold A was admitted at 21.42.

**C1, T-3** (`T-3-{chromium,webkit}.json`): light 933.50 · 932.00 px² (band 873.75 · 871.00), dark 946.50 · 942.25, PRT 937.75 · 934.50 (WebKit on the forced level-0 path), against 251.00, fill 1.28-1.30:1. Forced (info) 11,821.75 px² Chromium. Every number is pass 8's.

### 1.2 · H8's, H7's, H6's and H5's cells

| cell | Chromium · Playwright WebKit | `D′c8` |
|---|---|---|
| **SHEET** self-test (engine-free) | **10/10 OK** | the same |
| **SHEET** on D′ v8 | **PASS 2/2**: `writers` (the route's rule 1×); `wrap` `MIGRATION.md:94-116` | the same |
| SHEET plants `foreign` · `var` · `static` · `ts` | **FAIL 1/2** each, naming the OTHER writer | the same |
| SHEET plant `const` (L-1a) | PASS 2/2: misses it | the same |
| SHEET plants **`concat` · `esc` · `apply`** (pass 9) | **PASS 2/2 each: misses all three** (§3.2) | — |
| **FACT** `src` · `src-dev` · `dist` | **80/80** each, both engines | the same |
| FACT plants `foreign` · `var` | **76/80** each, both engines (`foreign-ancestor` ×4: 71.25×54.69 and 69.31×54.69, 16 px) | the same |
| FACT plants **`esc` · `apply`** (pass 9) | **76/80** each, both engines, the same four `foreign-ancestor` cells | — |
| **CANON** clean · `a` · `s` · `h` · `layer` · `foreign` · `unlayered` · `cq` · `lowlayer` · `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` | **5/5 · 3/3**, both engines | the same |
| **CORNER** `src` · `dist` | **5/5 · 5/5**, both engines | the same |
| **REPORT** `name-ink` · `kick-spring` | PASS · PASS, both engines | the same |
| REPORT kick (B-5, reported) | FAIL **0.17 px** (96 frames) · **0.14 px** (79 frames), want ≤ 0.05 | 0.16 · 0.13 |
| REPORT `mark` | UNMEASURED (Q-3 (a): no mark) | the same |
| `b3-mobile` (info) | `B3PROBE FAIL · 0/0`: no gating cell, every cell info | the same |
| **XSCRIPT** self · pair with pass 7's D′ | **19/19 · 19/19** | the same |
| `c1-box` on `dp8-src` · `dp8-dist` | **6/6 · 6/6**, both engines | the same |
| `l3-bare` on `l3-src` · `l3-dist` · `l3-plant-on-item-src` · `l3-unpinned-src` | **12/12 · 12/12 · 8/12 · 10/12**, both engines | the same |

### 1.3 · Carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as `D′c8`? |
|---|---|---|
| `fact-write` · `corner-gap` · `tile-geometry` · `pill-row` | 12/12 · 10/10 · 30/30 · 27/27, both engines | same |
| `scope-bound` | every form as expected, both engines (`scope5` 17/17 and strip 9/9; `option` 15/17, `unbounded` 12/17, `none` 11/17 FAIL as expected; `crit` 17/17) | same |
| `states` states · hover · hover-f1 · a11y | 54/54 · 9/9 · 3/3 · 6/6, and 54/54 · 9/9 · 3/3 · 3/3 | same |
| `states` ink (R-5, reported) | K2 stroke and label 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT; the strip 3.23 · 2.06 · 3.23 | same |
| `crit` x3 · x6 · tone · desc | 2/2 · 1/1 · 12/12 · 1/1, both engines | same |
| `crit-level` on `dp8-src`, `dp8-src-dev`, `dp8-dist` | 12/12 each, both engines | same |
| `crit-p5` · `crit-ink` | 12/12 · 12/12; 2/2 Chromium, 1/2 WebKit (`D′c5`'s documented 1 px canvas artefact; REPORT `name-ink` passes) | same |
| `unmigrated` on `dist` | shipped K2 207.00×36.00, 3 rows, CUT 4 boxes up to 24.64 · 24.86 px; K1 one row | same |
| **R-3 plant** (`pop0`, restored equal) | T-6 64/88 → **44/88**, migrated 33/33 → **21/33**, both engines | same |

### 1.4 · Units, types, bundle

All plants ran without a `-t` filter (67 cases each). `unit.mjs` copies every touched file before a plant and compares bytes after the restore. No run exited 2.

| plant | result |
|---|---|
| clean · `ctl-reads` | **PASS 67/67** · PASS 67/67 |
| `canon-a`, `canon-s`, `canon-i` · `canon-h` | FAIL 2 each · FAIL 1 |
| `split` · `no-writer` | FAIL 4 · FAIL 2 |
| `guard-gone`, `stamp-gone` | FAIL 1 each |
| `pin-unbounded` · `pin-option-only` · `pin-gone` · `strip-reset-gone` · `limit-group-only` | FAIL 3 · 2 · 1 · 1 · 2 |
| `crit-sm-none` · `crit-lg-plated` · `crit-strip-flush` · `crit-limit-strip-only` | FAIL 2 · 3 · 2 · 2 |
| FV6's `foreign-writer` · `markup-writer` · `second-lane-writer` · `flush-rule-wide` | FAIL 1 · 1 · 2 · 1 |
| L-1: `crit-foreign-writer` · `crit-var-writer` · `crit-static-style` · `crit-ts-ternary` | FAIL 1 each |
| `crit-const-name` (L-1a) | PASS 67/67: misses it |
| **`crit9-concat` · `crit9-css-escape` · `crit9-apply`** (pass 9) | **PASS 67/67 each: misses all three** (§3.2) |
| L-3: `l3-pin-gone` · `l3-reset-gone` · `l3-tint-loose` · `l3-library-writer` | FAIL 2 · 2 · 1 · 1 |
| `crit-l3-alias` · `crit-l3-third-rule` | FAIL 2 · FAIL 1 |

- **Whole suite** (`unit-all.log`): 2,356 ran, 2,353 passed, **3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own: no `dist-demo` in a worktree), 1 skipped.
- **vue-tsc**: 0 · 0. **Library build**: exit 0, 8.5 s.
- **Bundle** (`bundle.log`): **2,935,932 B** unpacked, 844 files; `dist` 2,542,357 B in 840 files; JS gzip-9 329,772 B; +16,875 over the datum (2,919,057).

**A restore check the driver could not make.** `shape.ts` (and the floor's `_shared/guard.ts`) are new files that the patches add, and they are untracked in the worktree, so `git diff HEAD` cannot see a plant in them. The `ts`, `const` and `concat` SHEET plants print the clean hash while planted. This seat checked them by content: `shape.ts` hashes `9455d073` and `guard.ts` `53c233af`, equal to each patch's new-file text, after the SHEET plants and again before removal. The unit plants are covered by `unit.mjs`'s own byte check.

---

## 2 · O-103c's condition on C1, read past pass 8

### 2.1 · What pass 8 read, and what it could not see

Pass 8 read C1's box at rest and selected on model writes (`c1-box`, 1000×900) and by real input (`crit-c1-states`, 390×844 and 1440×900). Both re-ran here: 6/6 and 24/24 · 18/18. **The fixed `crit-c1` probe now prints Playwright WebKit's layout-shift cells UNMEASURED** (6 per build), so its log and its tally agree (`crit-c1-dp8-*-webkit.log`), closing `R8` §P8-4's info row.

`crit-c1-states` reads `offsetLeft/Top/Width/Height`, which are integers, and only the group and the options. A sub-pixel move, or a move inside an option (the label, the count), reads 0 there.

### 2.2 · `crit9-c1`: sub-pixel, inside the option, by real input

The first pass-9 seat's probe (`crit/probes/crit9-c1.mjs`, route `crit/routes/A9`) reads `getBoundingClientRect` with every transform, transition and animation neutralised for the instant of the read. It reads the group, every option and every child of every option, plus each label's line count. It drives 16 states (rest, a click on each option, hover on a rest and on the selected option, a held press and its release, Tab focus-visible, ArrowDown through every option), at 390×844 and 1440×900, light, dark and PRT, on `a9-src` and `a9-dist`.

| composition | Chromium `src` · `dist` | Playwright WebKit `src` · `dist` |
|---|---|---|
| `c1-migrated` (the route of record) | **30/30 · 30/30**: cell in every state; box 0.000 px; content 0.000 px, lines unchanged (11111); RO 0; layout-shift 0 entries | **24/24 · 24/24**, layout-shift UNMEASURED ×6 |
| `c1bare-migrated` (C1 with `--selection-paint: bare` on the group) | **36/36 · 36/36**, the same five reads plus the carrier: 881.50 / 891.50 / 883.00 px² at 390 and 939.50 / 950.75 / 941.50 at 1440, against 240 / 255, fill 1.00:1 | **30/30 · 30/30**: carrier 877.00 / 889.00 / 881.00 and 936.75 / 949.75 / 941.00 |
| `c1long-migrated` (C1's anatomy at 192 px, labels 14-30 characters) | 12/30 · 12/30 (§3.1) | 9/24 · 9/24 (§3.1) |

Tallies: CRIT9-C1 78/96 · 78/96 (Chromium), 63/78 + 18 UNMEASURED · 63/78 + 18 (Playwright WebKit). Every failing cell is `c1long`'s.

C1's boxes follow the viewport, not the selection: options 184×40 and 184×56 in a 192×288 group at 390; 184×42.61 and 184×71.22 in 192×367.48 at 1440 (Playwright WebKit 184×71.16).

**On C1 the condition holds, read sub-pixel and inside every option, in both engines, on both builds.** C1's label and count boxes read 0.000 px when the weight goes to 600, and no C1 label sits near a wrap boundary at either viewport.

---

## 3 · The attacks

### 3.1 · L-5: the selection weight re-wraps a cell's label at a wrap boundary (`c1long`, `crit9-c1-diag`)

`crit9-c1` read `c1long` FAIL with two kinds of evidence mixed together:
- deviations of 413 px (390×844) and 821 px (1440×900) on the group, with the child's x, width and height unchanged;
- at 390×844 only: "Awaiting a reply from the" 1 → 2 lines on click 11 and on ArrowDown 10, ResizeObserver 12, Layout Instability 4 entries (sum 0.00585, Chromium).

This seat wrote `crit/probes/crit9-c1-diag.mjs` (run by `crit/diag.sh`) to separate them. It reads every option's layout box by the `offsetTop` chain to the group, which no scroll moves, at rest and with each option selected, and it compares that against `crit9-c1`'s position sum after a click that scrolls the page.

| cell (light) | Chromium `a9-src` · `a9-dist` | Playwright WebKit `a9-src` · `a9-dist` |
|---|---|---|
| `c1long` 390×844 · rewrap by click | **opt 11 «Awaiting a reply from the» 1 → 2 lines, h 56 → 77, weight 500 → 600**, each build | the same, each build |
| `c1long` 390×844 · reflow by click (scroll-free) | **21.00 px** (opt 11 184×56 → 184×77) | **21.00 px**, the same |
| `c1long` 1440×900 · rewrap · reflow by click | none · 0.00 px | none · 0.00 px |
| `c1` 390×844 · `preset` 390×844 | none · 0.00 px, each | none · 0.00 px, each |
| scroll-2x, `c1long` 390 · 1440 | crit9-c1's sum − the document position = **413.00 · 821.00 px = `scrollY`** exactly | **413.00 · 819.00 px = `scrollY`** exactly |

**The re-wrap is real**, by click and by ArrowDown, in both engines: a cell whose label sits within a few pixels of the line end at rest takes a second line when weight 600 widens it. The option grows 21 px, and every option below it moves 21 px. At 1440×900 the same ladder does not re-wrap: the type there is larger (options 184×71 against 184×56), and no label in the ladder happens to sit within a weight's widening of a line end. The class depends on where the content falls, not on the viewport.

**Why no row reads it, and why it goes to the owner.** O-103c's condition names C1, and T-3/T-4 fold it as "C1's box identical rest vs selected, ±0.5 px, both engines" (`R8` §P8-0 item 2). C1, as every consumer site and library scene carries it, reads 0.000 px (§2.2). `c1long` is this pass's attack composition: no consumer writes it and no library scene renders it. Under §P2-6.3 rows are scored on the migrated arm, the gating unmigrated arm and the library scenes, so L-5 opens no row. It shows that "selection must not change its geometry" holds on C1's five strings, not by construction. A consumer with a longer status label, or a translated one, would see a 21 px jump on select.
- **F1** shows the same mechanism below the box: at 1440×900 its count «bound» widens 33.88 → 34.58 px and moves 0.36 px when selected (weight 500 → 600). F1's option box is unchanged, and that read is info (`crit9-c1`, both engines).
- **Cure (landing, not built here):** carry the selected state's weight without changing the label's advance width. Either keep the weight constant in a cell and let the perimeter and ink carry the state, or reserve the 600-weight width at rest. Witness pair: `c1long` reflow-by-click 0.00 px at 390×844 in both engines, and C1's T-3 carrier unchanged.

### 3.2 · L-1b: three more writer spellings pass both static readers

| plant | where | SHEET | unit twin | built sheet | FACT (paint), both engines |
|---|---|---|---|---|---|
| `concat`: `setProperty("--selection-" + "tile", "flush")` | `shape.ts` | **PASS 2/2: misses** | **PASS 67/67: misses** | — (script) | not reached: no composition calls the helper |
| `esc`: `--selection\-tile: flush` on `.card > .toggle-group` | `base.css`, in `@layer components` | **PASS 2/2: misses** | **PASS 67/67: misses** | `--selection-tile: flush;` | **76/80**: the four `foreign-ancestor` cells |
| `apply`: `@apply [--selection-tile:flush];` on `.card > .toggle-group` | `base.css`, unlayered | **PASS 2/2: misses** | **PASS 67/67: misses** | `--selection-tile: flush;` | **76/80**: the same four cells |

(`sheet-plants.log`, `unit-plant-crit9-*.log`, `plant-builds.log`, `h-fact-plant-{esc,apply}-*.log`; the built rule read from `out/builds/dp8-plant-*-atk-src/dist/assets/*.css`.)

- **Both CSS spellings are real writes**, and the pipeline normalises each to the plain declaration. Paint catches them wherever a `.card` holds a pill group, the same tally as `foreign` and `var`. **R-10 holds for CSS on the paint reader.**
- **L-1a's planned cure misses all three.** It counts `"--selection-tile"` string literals in `.ts`/`.vue`. `concat` has no such literal, and the other two live in `.css`. The spelling chase L-1 began does not end there.
- **What a cure would face, measured on `src`:** five `setProperty` calls with a non-literal name (`drag.ts:230`, `useRouteTransition.ts:76,117,147`, `useScrollScene.ts:175`), so a reader that refuses every non-literal name needs exemptions. The one `"--selection-` literal in code is `ToggleGroupItem.vue:148`'s `getPropertyValue` read.
- **Routed to the landing, as L-1b, with L-1a.** For CSS, read the built sheet instead of the source: the built sheet has one spelling, and the pipeline already resolved both plants to it. For script, no static reader can resolve a name built at run time. The paint reader is the backstop: FACT fails any write a composition reaches, and a write no composition reaches paints nothing. Witness pair: `esc`, `apply` and `const` FAIL the widened reader; `ctl-reads` and `sh-reads` PASS.
- **`src` holds none of them** (`state.log`: no `@apply` of the fact, no escaped name, no built name; the route's rule 1×). **R-10 stays met.**

### 3.3 · Instrument faults

1. **`crit9-c1` counts the window scroll twice.** Its `READ` adds `scrollX/scrollY` and then every ancestor's `scrollLeft/scrollTop`, and the walk reaches `<html>`, whose `scrollTop` is the window scroll. The diagnostic measures the excess as exactly `scrollY` (413.00 and 821.00 px in Chromium, 413.00 and 819.00 in Playwright WebKit). So `crit9-c1`'s `box-no-shift` and `content-no-shift` cells on `c1long`, and the 72-94 px reads on the preset, specimen and F1 info scenes at 390, are artefacts. The scroll-free reflow on the preset is 0.00 px. The preset's 72 px is the horizontal scroller's `scrollLeft` added where the rect did not move (document x 42.00 against the sum's 114.00). Its ResizeObserver, Layout Instability and line-count cells do not depend on scroll, and they stand. No C1 cell is affected, because C1 never scrolls the page (diagnostic: `scrollY` 0, extra 0.00). **Cure:** stop the ancestor walk before `document.scrollingElement`. It is a probe of this pass, so the cure belongs to whoever re-runs it.
2. **Slip, this seat's own:** the diagnostic's first pass selected by model write (`__tile.select(k)`), and on `c1long` that left every ladder option `off`. Its weight read 500 → 500, so its "no re-wrap" there was vacuous. The probe now prints each option's weight and state for both paths. Only the click pass is cited for `c1long`. On C1 and the preset both paths select (500 → 600, `on`), and they agree.
3. **The driver's restore check is blind to new files** (§1.4). It was checked by content instead.

---

## 4 · For the registry (no H8 cell reads these; no score changes)

| id | class | placement | cure |
|---|---|---|---|
| **L-5** | the selected weight (500 → 600) re-wraps a cell label that sits at a wrap boundary. The option grows 21 px and the options below it move, in both engines (§3.1). C1's own strings read 0.000 px | **owner first, then landing.** It bears on O-103c's condition by construction: does "selection must not change its geometry" mean for C1 as written (met) or for any content C1's anatomy can hold (not met)? On the first reading it is a landing item. On the second it is a row (T-4's fold), and the clean count restarts | carry the weight without changing the advance width (a constant weight in cells, or the 600 width reserved at rest); witness `c1long` reflow-by-click 0.00 px at 390, both engines |
| **L-1b** | three more writer spellings pass both static readers: concatenation (`.ts`), a CSS escape, `@apply` (§3.2). L-1a's cure misses all three; FACT catches the two CSS ones | landing, with L-1a and L-4 as one H9 | CSS: read the built sheet; script: the paint reader is the backstop; witness `esc`, `apply`, `const` FAIL, `ctl-reads`, `sh-reads` PASS |
| info | `crit9-c1` double-counts the window scroll (§3.3) | the probe's re-runner | stop the walk before `document.scrollingElement` |
| info | the driver's restore check cannot see untracked new files (`shape.ts`, `guard.ts`) | the next driver | hash the patches' new files before and after |
| carried | L-1a, L-4, the `l3-bare` fold into FACT | landing, H9 (`R8` §P8-4) | unchanged |
| closed | the `crit-c1` probe fix: its WebKit log now prints the 6 layout-shift cells UNMEASURED | — | — |
| info | forced colours, Chromium: an `auto` group's selected-hover tint over `Highlight` | floor, reported | none required |
| reported | R-5: dark selected ink 1.56:1 on K2; the perimeter carries | every pass | — |
| reported | B-5: the kick, 0.17 · 0.14 px (want ≤ 0.05); the spring is named | floor-owned | — |
| owed, not a row | Q-14: bundle rebind (2,935,932 B, +16,875) | release, the owner's | — |
| owed, not a row | Q-11 (a) DEFAULT; D4-G BLOCK | the owner's | — |
| owed, not a row | real Safari: UNMEASURED (owner's safaridriver checkbox) | E-4 met under O-103 | the owner runs it whenever they choose |

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18; `tile-geometry` 30/30 · 30/30 | met |
| T-2 | 52/52 on `src`, `dist`, `dist-dev`, both engines | met |
| T-3 | migrated **43/43 · 43/43**; C1 933.50 / 946.50 / 937.75 · 932.00 / 942.25 / 934.50 px² against 251; bare C1 877-951 px² against 240-255 | met |
| T-4 | 24/24 · 24/24; the O-103c fold: C1's box and every child 0.000 px across 16 real-input states, 390 and 1440, light, dark and PRT, `src` and `dist`, both engines; RO 0; CRIT-C1 24/24 · 18/18 + 6 UNMEASURED; C1BOX 6/6. L-5 is outside the fold (§3.1, §4) | met |
| T-5 | 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | 33/33 · 33/33; pop0 plant 21/33 | met |
| T-7 | 24/24 · 24/24; XSCRIPT 19/19 | met |
| T-8 | 27/27; real Safari UNMEASURED (E-4's, under O-103) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| X-2 | REPORT `name-ink` PASS light and dark, both engines; XSCRIPT 19/19 | met |
| X-3 · X-4 · X-6 · X-7 | x3 2/2; T-1, T-3 green on V2; x6 1/1; tone 12/12; both engines | met |
| X-5 | ATTACK `src-dev` 5/5, `dist` 3/3; desc 1/1; both engines | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 · FV-3 | T-5, T-6 migrated green | met |
| FV-2 | T-2 52/52 ×3; `pill-row` 27/27; FACT 80/80 ×3; L-3: CRIT-L3 32/32 on `src` and `dist`, `l3-bare` 12/12, plants 20/32, 8/12, 10/12; bare C1 a cell with its perimeter (§2.2); both engines | met |
| FV-4 · FV-5 · FV-6 · FV-7 | tone 12/12; a11y 6/6 · 3/3; T-5 arrows; ATTACK 5/5 · 5/5 | met |
| FV-8 | T-6 migrated PRT hover cells green | met |
| FV-9 | `fact-write` 12/12; `crit-p5` 12/12 | met |
| FV-10 | `guard-gone`, `stamp-gone` FAIL 1 each | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | K2 on `dist` 207×36, CUT 4; T-2 52/52; CORNER 5/5; ATTACK `src-dev` 5/5; W-E `dist-dev` 1/6 = `dist` | met (O-103) |
| R-2 | FACT 80/80 per flavour; W-D 8/8 · 8/8; `crit-level` 12/12 ×3; L-3 `l3-bare` `ancestor`, `item-write` | met |
| R-3 | pop0: migrated 33/33 → 21/33 · 21/33 | met |
| R-4 · R-6 · R-7 | hover 9/9 · 9/9, F1 3/3; 16 px tiles, pills at h/2; CANON 4/4 with every plant failing; the canon unit fails A, S, H, I | met |
| R-5 | K2 2.66:1 light, 1.56:1 dark (reported) | met, reported |
| R-8 | T-2 52/52 on `dist`/`dist-dev`, CORNER 5/5, ATTACK 3/3, FACT 80/80 `dist` | met (O-103) |
| R-9 | 2,935,932 B, +16,875 | met (the rebind is Q-14's) |
| R-10 | SHEET `writers` PASS; SHEET and the unit FAIL `foreign`, `var`, `static`, `ts`, PASS `ctl-reads`; FACT fails `foreign`, `var`, `esc`, `apply` at 76/80, both engines. `const` and `concat` pass every reader and `esc`/`apply` pass both static ones, but `src` holds none of them | met (L-1a, L-1b are coverage) |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines; Playwright WebKit's absent Layout Instability API reads UNMEASURED, and the box, child and ResizeObserver reads measure the same property there | met |
| E-2 | F1, V2, the sibling state, the interactive descendant (ATTACK `dist` 3/3), the keyed reorder, the deselectable single green; C1 T-3 3/3 · 3/3 | met |
| E-3 | SHEET `wrap` PASS at `MIGRATION.md:94-116`; the `--selection-paint` bullet's claims read by CRIT-L3 and `l3-bare` | met |
| E-4 | read under O-103 against this seat's Playwright WebKit run; real Safari UNMEASURED (owner's safaridriver checkbox) | met (O-103) |

### 5.6 · G

`frames/c1-{light,dark}-fine-{chromium,webkit}-pair.jpg` and `preset-*`: C1 is a column of 16 px cards with the count under the label. The selected card carries a full-ink 2 px perimeter, a fill and weighted ink. The focused-selected frame puts the ring a gap outside the perimeter. The preset's four tiles are flush at rest (Q-2 (b)), and the selected tile reads by perimeter and weight. There is no lighting layer, and the commit carries state (`kick-spring`, the pop0 plant). **Met.** L-5 is the one place the weight, a carrier here, costs geometry.

### 5.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 8 | — |
| X (7) | 7 | — |
| FV (10) | 10 | — |
| R (10) | 10 | — |
| E (4) | 4 | — |
| G (1) | 1 | — |
| **total** | **40 / 40 (100 %)** | 0 |

**Clean, by §P8-6:** 40/40 on this seat's own instrument; no row opened; none added, struck or renamed; the new items (L-5, L-1b, two instrument faults) are routed to §4. No row was scored PASS against its own instrument's reading. `crit9-c1`'s failing cells are all `c1long`'s, an attack composition outside every row's arms. Its scroll artefacts are proved as such. Its re-wrap is real and routed as L-5. **With pass 8, two consecutive clean passes on the same build and harness: CONVERGED on the fixed list. Verdict: ADVANCE.** The one condition on that verdict is the owner's reading of O-103c (§4, L-5).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.**
- `logs/chain.log` ends `CHAIN-DONE` (17:11:58), and both WebKit holds exited 0.
- `git diff HEAD` read `5d08df87ebbe` before and after every plant stage. `shape.ts` and `guard.ts` were hash-checked equal to the patches.
- The worktree read `5d08df87ebbe`, with `shape.ts` `9455d073` and `guard.ts` `53c233af`, just before it was removed with `git worktree remove --force` (rc 0; `git worktree list` no longer shows it). The run JSON is kept as `crit/run-json.tgz` (144,554 B).
- **Scratch left behind:** the permission system refused `rm -rf .claude/worktrees/bl/D4/p9/crit9/`. What remains is `crit9/out/` (26 MB of builds and run JSON), untracked, and nothing depends on it. It joins `R8` §P8-5's housekeeping list for the owner.
- No browser, server or guard was left running.
