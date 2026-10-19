# D4 · pass 6 · D4-D′ · critique: the declared cell, on floor v5 and H6

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 6 (REGISTRY §P5-6.2 item 3). Authored no D4 seat. Re-runs every number on HEAD + floor v5 + `D4-Dp.patch`: the battery T-1..T-8, the shared attack set, H6's cells and H5's FACT matrix, CANON and REPORT on **both** routes, the route's units with every plant. Attacks the route and floor v5. Scores on the 40-row checklist only (§P2-6.3, unchanged by §P5-6.3). Adds no row, picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `cb6715dc3`, detached worktree `.claude/worktrees/bl/D4/p6/D4-Dp-crit/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v5.patch` sha1 `de018966`, then `D4-Dp.patch` `0046d3a6` (`logs/state-dp.log`: `git diff HEAD` `90fe6bea3132`, 27 dirty `src` paths). F's state (`D4-F.patch` `f931fada`) was applied only to build F's route and attack builds, then reverted (`logs/state-f.log`, `logs/chain.log`). `git diff --stat` of `src`, `tests`, `MIGRATION.md` between pass 6's floor seat (`bdd0a12ba`) and `cb6715dc3` is docs-only, so this is the library the floor seat measured |
| owner | no ruling on Q-2, Q-3, Q-5, Q-10, Q-11, Q-13, Q-14, Q-15 or the checkbox in `audit/INBOUND.md` or `FORMATION-PROGRESS.md` (read 2026-10-19 03:45; the last D4 line is floor v5's bank). Both routes' cells were read; every owner row is scored at its §P5-5 default |
| harness | H6 **`e2360106ad0d`** on every witness, unit and XSCRIPT line. No harness file edited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`, no GPU launch args. Every WebKit number here is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | every stage through `~/.claude/guard/guarded --rss-gb 8`; browser runs never `--light` (only the typecheck, the unit-plant runs, the bundle read and XSCRIPT took it); every run that could start Playwright WebKit inside `--exclusive webkit`. One heavy run at a time. WebKit lock waits: hold A **7 min 8 s** (04:31:18 → 04:38:26, ran to 04:59:39), hold B **13 min 25 s** (04:59:39 → 05:13:04, ran to 05:30:25). Neither passed 90 min; neither was cancelled. Kernel zone 9.51M at start (below the 13M refusal). 1-min load at stage starts: 9.2-40.1 (`logs/chain.log`, each log's first and last line). No janky cell, no stall, no NOT-REPRODUCED line; the one cell that differs between runs (REPORT kick) is a reported cell and moves no verdict |
| records | under `pass-6/D4-Dp-crit/`: `run-crit.sh` (every stage), `chain1.sh`, `chain2.sh` (the order run), `crit-route/` (this seat's strip compositions, a route dir for `build.mjs`), `probes/crit-p6.mjs` (this seat's probe), `logs/` (every log cited), `run-json.tgz` (the run JSON this document quotes). Builds stay as scratch under `.claude/worktrees/bl/D4/p6/D4-Dp-crit/out/`; nothing here depends on them |
| fences | no tracked source edited in the checkout; `git apply` and the R-3 plant's `sed` touched only the seat worktree; the only git writes were `git worktree add` / `remove --force` of `D4-Dp-crit/wt`; the only checkout writes are this file and `pass-6/D4-Dp-crit/`. Sibling repos were not read. One slip, reported: a `cat` of the pass-5 critique overflowed to a tool-result file under `~/.claude/projects/…`; that file was not opened, and the critique was re-read in parts from the checkout |

Citations: `H6` is `H6.md`; `FV5` is `FLOOR-V5.md`; `D′c5` is `../pass-5/D4-Dp-critique.md`; `crit/` is `pass-6/D4-Dp-crit/`.

---

## 0 · In brief

1. **Every pass-6 number reproduced, in both engines.** Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run), W-D 8/8 · 8/8. H6 and H5 cells on **D′**: FACT **72/72** on `src`, `src-dev` **and `dist`** in both engines (`dist` is new: no pass-6 seat had read it); CANON clean 4/4, every plant failing and both controls passing; ATTACK 5/5 (`dist` 3/3); CORNER 5/5 (`dist` 5/5). On **F**: FACT 72/72 on `src` and `src-dev`, CANON 4/4 (plant `h` 2/4, F's spelling), ATTACK 5/5, CORNER 5/5, REPORT `name-ink` PASS, `mark` 10.70 · 10.73:1. XSCRIPT 19/19 on pass 6's pair (9/19 on pass 5's, as H6 says). Units: clean 63/63; all 17 route and floor plants fail; whole suite 2,352 ran with HEAD's 3 `boot-graph` failures. Bundle 2,937,360 B.
2. **X-2, pass 5's one non-owner row, is closed on my own measurement.** REPORT `name-ink` PASSES on the D′ build, light and dark, in both engines: the selected name is its item's ink, sRGB 28, 25, 23 light and 233, 230, 226 dark, against unselected 112, 89, 66 and 195, 185, 172 (2.66:1 and 1.56:1). `crit-ink` now reads 2/2 in Chromium (it read 0/2 in pass 5). The pass-5 lift probe now reads the same "as built" as "lifted": nothing is left to lift.
3. **R-2 holds on H6-3's new cell, and on the strips H6-3 does not build.** `td` (a strip in a tile option): strip 40.94 against 40.94, the tab 1 row, tab fact `none`, on `src`, `src-dev` and `dist`, light and dark, both engines. This seat's `crit-p6` adds a **vertical** strip and an **underline** strip in a tile option: every tab 1 row, nothing cut, at the reference height (32.94 px and 42.53 px · 42.52 px), 6/6 gating on `src` and `dist` in both engines.
4. **Score: 34 / 40 (85 %). The route is at its owner-gated fixed point.** Six rows stay open, all the owner's, at their defaults: T-3 and E-2 (Q-10), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). No non-owner row is open. **By §P5-6.4's stop rule the loop stops for D′.**
5. **Verdict: ADVANCE (owner-gated).** Three classes no H6 or H5 cell reads go to the owner's sheet and the execution backlog (§4), and change no score. The sharpest: a second writer of the tile fact in another sheet passes every unit (`crit-foreign-writer`, 63/63), because D′'s R-10 case reads only the lane sheet and the canon twins sit under no other ancestor.

---

## 1 · Re-run

The order is in `logs/chain.log`. Chain 1 (03:49 → 03:57): state, library build, typecheck, scene builds (route `src`, `src-dev`, `dist`, `dist-dev`; attack `src`, `src-dev`, `dist`; this seat's route `src`, `dist`), whole suite, unit plants, bundle, R-3 plant build, XSCRIPT, then F's builds. Chain 2 (03:57 → 05:30): the Chromium battery, the Chromium reads, WebKit hold A (the battery), hold B (the H cells and probes). "A · B" is Chromium · Playwright WebKit.

### 1.1 · The battery, `dp-src` (and `dp-dist` where named)

| witness | unmigrated · A · B | migrated · A · B | whole · A · B | load at start · A · B |
|---|---|---|---|---|
| T-1 | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 20.38 · 32.09 |
| T-2 `src` · `dist` | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 22.27 · 22.55 |
| T-3 | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured; library 2/39) | 17.85 · 18.63 |
| T-4 | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 | 22.10 · 22.77 |
| T-5 `src` · `dist` | 20/37 · 20/37 | **38/38 · 38/38** (both builds) | 87/116 · 87/116; `dist` 88/117 · 88/117 | 15.83 · 16.86 |
| T-6 | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 | 14.82 · 18.55 |
| T-7 | 4/35 · 4/35 | **24/24 · 24/24** | 24/24 · 24/24 | 16.73 · 17.57 |
| T-8, one run | — | **27/27** | 27/39 (+13 unmeasured: library 0/12, real Safari 1) | 17.09 |
| W-A · W-B · W-C · W-E | — | — | 5/9 · 9/25 · 0/8 · 1/3, both engines | 16.7-19.2 · 17.8-19.8 |
| **W-D** | — | — | **8/8 · 8/8** | 18.71 · 18.64 |
| W-E `dist` | — | — | 1/6 · 1/6 | — · 18.94 |

Every tally equals `H6` §3 and `FV5` §3.4 cell for cell (logs `battery-src-chromium.log`, `src-*-webkit.log`, `dist-*`).

- **T-3's three misses are C1, and they moved.** `c1-migrated` now reads **0.00 px²** in light, dark and PRT against the 224 px² bar (fill 1.18 / 1.22 / 1.00:1), in both engines. Pass 5 read 22.50 / 23.00 / 22.50 px² on D′: that carrier was the consumer's check mark bound to the model, which H6-2's one transcription struck as consumer selection paint. So D′'s C1 now reads what F's did: no carrier in any mode. Still Q-10's (§4.3).
- **T-6 `preset-migrated`** (Chromium, `run-json.tgz` `dp-src/T-6-chromium.json`): keyboard pop 1.03 at 88 ms, programmatic 1.03 at 88 ms, calm observer 1.03 at 81 ms, pointer 1.04 at 127 ms, each with a trough and a settle; body travel 0.00 px; Tab entry moves 0.00; hover ΔE 0.0946 (the same under PRM) and **0.0332 under PRT** against 0.02; coarse taps latch nothing.

### 1.2 · H6's and H5's cells, both routes

Chromium: `logs/h-{dp,f}-*-chromium.log` (04:15 → 04:20, load 14.6-21.9). Playwright WebKit: hold B, `logs/h-{dp,f}-*-webkit.log` (05:13 → 05:30, load 9.2-24.5).

| cell | D′ (`dp-*`) | F (`f-*`) | `H6` / `FV5` |
|---|---|---|---|
| **FACT** `src` · `src-dev` · `dist` | **72/72 · 72/72 · 72/72**, both engines | **72/72 · 72/72** (no `dist` build), both engines | 72/72 (`FV5` §3.2; no `dist` read there) |
| H6-3 `td`, light and dark | PASS: strip **40.94** against 40.94; tab 99.45×32.94 · 99.47×32.94, 1 row, 0 cut, tab fact `none`; the same on `dist` | PASS, the same | the same |
| H6-3 `pd`, light and dark | PASS: option 452.00×40.00 against `pa` 40.00; tab 61.56×25.75, 1 row | PASS | the same |
| H6-4 `none!` at option (info) | **info-pass**: 211.92×45.50 · 211.94×45.50, 16 px (0.70×h/2), column, 1 row, content 1 row, 1 clipped child; reference 54.69, 2 rows, 0 clipped; `dist` the same | info-pass | the same |
| **CANON** clean · `a` · `s` · `h` · `layer` · `foreign` · `unlayered` · `cq` · `lowlayer` · `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | **4 · 3 · 3 · 2 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` | **5/5** · 3/3, both engines | **5/5**, both engines | 5/5 |
| **CORNER** `src` · `dist` | **5/5 · 5/5**, both engines | **5/5**, both engines | 5/5 |
| **REPORT `name-ink`** (X-2) | **PASS light and dark**, both engines: 28, 25, 23 and 233, 230, 226, its item's ink | **PASS**, the same | PASS |
| REPORT kick (H4-6, reported) | FAIL 0.16 · 0.11 px (want ≤ 0.05) | FAIL 0.17 · 0.11 px | 0.17 · 0.13 / 0.17 · 0.09 |
| REPORT mark, V2 dark | UNMEASURED (no mark; Q-3) | PASS 10.70 · 10.73:1 | the same |
| REPORT on an attack build | exit 2, naming the route build, both engines | — | exit 2 |
| **XSCRIPT** (engine-free) | **19/19** on pass 6's pair; 9/19 on pass 5's pair, as `H6` §3 | (the same pair) | 19/19 · 9/19 |

### 1.3 · The route's units and the plants

H6's `unit.mjs` (config `vitest.wt.config.ts` `f70c44e4`), one driver at a time; no plant left a restore mismatch (`logs/unit-plant-*.log`, 03:52 → 03:56, load 20.3-38.4).

| plant | what it plants | result |
|---|---|---|
| clean | — | **PASS, 63/63** |
| `canon-a`, `canon-s`, `canon-h`, `canon-i`, `no-writer` | A, S, H; the corner's `!important` struck; the writer writes `none` | each **FAIL** 1 (the canon case) |
| `split` | a second tile corner inside the writer | **FAIL** 2 (canon and R-10) |
| `guard-gone`, `stamp-gone` | the refusal struck; the stamp struck | each **FAIL** 1 (the shape case) |
| `pin-unbounded`, `pin-option-only`, `pin-gone` | floor v4's three, on floor v5's limit | each **FAIL** 1 (the sheet case) |
| `strip-reset-gone`, `limit-group-only` | FV5-2's two, on the route state | each **FAIL** 1 (the sheet case) |
| `crit-sm-none`, `crit-lg-plated` (`D′c5`'s) | a second fact writer on a size | **FAIL** 2 · **FAIL** 1 |
| **`crit-strip-flush`** (this seat) | the strip writes `flush` instead of resetting | **FAIL** 1 (the sheet case) |
| **`crit-limit-strip-only`** (this seat) | the limit keeps the strip and loses the group | **FAIL** 1 (the sheet case) |
| **`crit-foreign-writer`** (this seat) | `.card > .toggle-group { --selection-tile: flush }`, unlayered, in `base.css`: a second spelling of "is a tile" outside the lane sheet. Both test files that name `--selection-tile` run (an `rg` over `tests/` finds only these two) | **PASS 63/63: no unit sees it** (§4.1) |

Whole suite (`logs/unit-all.log`): **2,352 ran, 2,349 passed, 3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own), 1 skipped. `vue-tsc --noEmit` 0 errors on both projects (`logs/tsc.log`). Library build exit 0 (`logs/libbuild.log`).

### 1.4 · Probes and carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as before? |
|---|---|---|
| `crit-level.mjs` on `dp-src`, `dp-src-dev`, `dp-dist` | 12/12 each, both engines | same |
| `crit-p5.mjs` on `dp-atk-src`, `dp-atk-src-dev` | 12/12 each, both engines | same |
| `fact-write.mjs` | 12/12 · 12/12 | same |
| `corner-gap.mjs` | 10/10 · 10/10 | same |
| `tile-geometry.mjs` | 30/30 · 30/30 | same |
| `pill-row.mjs` | 27/27 · 27/27 | same |
| `scope-bound.mjs` (`FV5`'s) | `scope5` 17/17 + strip 9/9; floor v4's `scope` 17/17 + strip **4/9** (the plant); `unbounded` 12/17, `option` 15/17, `crit` 17/17, `none` 11/17; "every form read as expected", both engines | same as `FV5` §1.1 |
| `unmigrated.mjs` on `dist` | shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 · 24.86 px**; shipped K1 1 row, nothing cut | same |
| `states.mjs` states / hover / hover-f1 / a11y | 54/54; 9/9; 3/3; 6/6 · 54/54; 9/9; 3/3; 3/3 (WebKit a11y: contrast only) | same |
| `states.mjs` ink (reported) | K2 stroke and label 2.66:1 light, 1.56:1 dark, 2.66:1 PRT; strip glyph and label 3.23 / 2.06 / 3.23:1, both engines. The strip now strokes by `currentColor` (H6-2), and the reading equals pass 5's `var(--selection-ink)` one | same numbers |
| `crit.mjs` x3 / x6 / tone / desc | 2/2; 1/1; 12/12; 1/1, both engines | same |
| `crit-ink.mjs` | **2/2 in Chromium** (pass 5: 0/2): name and stroke take the ink. Playwright WebKit 1/2: the dark cell passes; the light verdict reads "does NOT take" because its 1 px canvas parses the raw `oklch(from light-dark(…))` as rgb(0, 0, 0). The same line prints name and stroke rgb(28, 25, 23), 2.66:1. That is `D′c5`'s documented instrument artefact; REPORT `name-ink`, the row's cell, passes in that engine | improved |
| `crit-name-lift.mjs` (info only; "0/0 gating" is its shape) | "as built" now equals "lifted": 2.66:1 light, 1.56:1 dark, both engines | the cure landed |
| **`crit-p6.mjs`** (this seat, §3) on `dp-crit-src`, `dp-crit-dist` | **6/6 gating each, both engines** | new |
| R-3 plant (`pop0`: the kick deleted, rebuilt, restored and `cmp`-checked) | T-6 64/88 → **44/88**, migrated 33/33 → **21/33**, both engines | same |

**Bundle** (`logs/bundle.log`): 2,937,360 B unpacked, 844 files; `dist/` 2,544,020 B in 840 files; JS gzip-9 330,651 B. **+18,303 over the ratchet datum** (2,919,057), +545 over pass 5's D′: floor v5's reset, its comments and the widened limit.

---

## 2 · X-2, closed

`D′c5` §2 traced the name to the harness's unlayered `.tile-name { color: var(--muted-foreground) }`. H6-1 moved that colour under `[data-arm="verbatim"]`; FV5-1 says the consumer deletes such a colour (`MIGRATION.md`, the `--selection-ink` bullet, read in the worktree). Measured here on the D′ build:

| reading | Chromium | Playwright WebKit |
|---|---|---|
| REPORT `name-ink` light | PASS: selected name `oklch(0.216 0.006 56.0)` = its item's ink (28, 25, 23); unselected 112, 89, 66 | PASS, the same |
| REPORT `name-ink` dark | PASS: `oklch(0.926 0.006 75.1)` (233, 230, 226); unselected 195, 185, 172 | PASS, the same |
| `crit-ink` stroke and name | 2.66:1 light, 1.56:1 dark, no state rule | the same |
| XSCRIPT `shared ink` | PASS: no rule outside `verbatim` sets ink on content (48 content classes) | engine-free |

The media half (`currentColor`) and the folded name half both hold, and no consumer rule carries the state. **X-2 is met.** The dark 1.56:1 is R-5's, reported: the perimeter carries the selected state in dark (T-3 migrated passes).

---

## 3 · The attacks this seat added

**`crit-p6`: FV5-2 on the strips H6-3 does not build** (`crit-route/migrated.mjs`, `probes/crit-p6.mjs`). H6-3 reads one horizontal pill strip. The reset sits on `.segmented-tabs`, and the limit names `.segmented-tabs`, so every strip variant should behave alike. Each composition is a tile option of a `<ToggleGroup shape="cell">` holding a strip whose tabs carry two block rows, read against the same strip outside any group, light and dark:

| cell | Chromium `src` · `dist` | Playwright WebKit `src` · `dist` |
|---|---|---|
| `vt`, a vertical pill strip | PASS: 4 tabs, 32.94 px each, 1 row, 0 cut, tab fact `none`; strip 369.56×139.75 (reference 520.00×139.75) | PASS, the same |
| `ut`, an underline strip (`semantics="tabs"`) | PASS: 4 tabs at 42.53 px, 1 row | PASS, 42.52 px |
| `sw`, a pill strip (no write) | PASS: strip 40.94, 4 tabs 1 row | PASS |
| `ct` (info), a strip whose first tab holds a `shape="cell"` group | the inner options ARE tiles: fact `flush`, 16.00 px, 2 rows, column. The tab grows to 68.69 px; the inner group runs `inline` under the tab's one-row law | the same |
| `sw` (info), an unlayered consumer `--selection-tile: flush` ON the strip | **the tabs leave the one-row law**: 4 tabs at 46.69 px, 2 rows each, fact `flush`; strip 54.69 px | the same |

The six gating cells pass in both engines and both flavours, so FV5-2's reset ships in `dist` and reaches every strip variant. The two info cells are §4.2 and §4.4.

**`crit-strip-flush`, `crit-limit-strip-only`, `crit-foreign-writer`** test whether the units pin FV5-2 and R-10 from the other side (§1.3). The first two fail as they should. The third does not (§4.1).

---

## 4 · For the owner's sheet and the execution backlog (no H6 or H5 cell reads these; no score changes)

### 4.1 · The tile fact can be written a second time outside the lane sheet, and no unit sees it

`crit-foreign-writer` adds `.card > .toggle-group { --selection-tile: flush; }` to `base.css`. Every group inside a card becomes a tile without `shape="cell"`, which is a second spelling of "is a tile" (R-10's P-3 sense). Both unit files that name the fact pass 63/63:

- D′'s R-10 case ("the declaration writes the tile fact and nothing else") walks `LANE_SHEET` only;
- the canon case's `factOf` walks every sheet, but its 48 twins sit under a bare `div`, so a writer scoped to another ancestor never matches them;
- the floor's sheet case reads `toggle-group/styles.css` and `segmented.css` only.

FACT, CANON and CORNER run on fixed compositions with no such ancestor, so no H6 or H5 cell reads it either. **R-10 stays met**: no such writer exists in `src` (an `rg` over `src` for `--selection-tile` finds only the floor's and D′'s declarations). This is a coverage gap. **Backlog:** a sheet-wide unit (every `--selection-tile` declaration in `src` whose value is `flush` or `plated` is D′'s one rule). It is one assertion and route-neutral: F's writer would need the same pin.

### 4.2 · A write on a strip splits its tabs, and a floor comment overstates the reset

The `sw` info cell confirms `FV5` §1.2: an unlayered consumer `flush` on a strip lands, and the tabs leave the one-row law (2 rows, 46.69 px each) with no card geometry, in both engines. `FV5` reported this as a state no site writes. Two words of the floor's own prose do not survive it:

- `base.css:55-57` says "…and a strip's tabs are always pills". Measured, they are not when a consumer writes on the strip.
- MIGRATION says a write "on the group element itself … writes over either" for groups, and for strips only "every strip resets it too". The consumer-facing consequence of a write on a strip is unstated.

MIGRATION's claims as written are true (E-3 holds). **Owner's sheet / backlog:** either the comment says "pills unless a rule of yours writes on the strip", or the strip pins its tabs as the option does. That second form is a floor declaration and an E-1 question, so it is the owner's call, not this seat's.

### 4.3 · C1's input to Q-10 changed under H6-2

The §P5-5 sheet row 2 says "C1 22.50 / 23.00 / 22.50 px² against 224 on D′". After H6-2 struck the consumer's model-bound check, D′'s C1 reads **0.00 px² in every mode, both engines** (§1.1), the reading F had. Under Q-10 (b), C1 is RED on both routes unless it declares `shape="cell"` (D′ only). **For the agglomerator:** refresh the sheet row; the two routes no longer differ on C1's default reading.

### 4.4 · Smaller notes

- **`ct`**: a declared group inside a strip's tab gets tiles. The tab grows to two rows because a group is inside it, which X-5 already names as an interactive descendant. Reported only.
- **The responsive strip** (code reading, not measured): below its breakpoint, `SegmentedTabs responsive` renders `.segmented-tabs__mobile` with a `SelectTrigger`, and neither class matches the reset or the limit. Inside a tile option, the pin would then reach the trigger's `.control-surface[data-state]`, which would paint flush, with no plate. A Select in an option is an interactive descendant (X-5), so this is not a new class, and it is not built here.
- **MIGRATION's reflow.** The composed `--selection-tile` bullet has ragged line breaks where D′'s and floor v5's hunks meet ("…or on an element between the / group and its options", "…an option is a / card, whatever wrote the value:"). This is prose only, and the cut's editor should rewrap it.
- **REPORT kick** reads 0.16 · 0.11 px (D′) and 0.17 · 0.11 px (F), with 96 and 48 frames. Both fail, and the verdict does not move (H4-6, reported).

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes, on this seat's runs.

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18; 16.00 px at fine, coarse and `--ui-scale 1.25` (`tile-geometry` 30/30) | met |
| T-2 | 52/52 · 52/52 on `src` and `dist` | met |
| T-3 | migrated 40/43 · 40/43; C1 0.00 px² against 224 in every mode (§4.3); shipped K1 has no carrier | **open: owner** (Q-10; Q-5 for K1) |
| T-4 | migrated 24/24 · 24/24 | met |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | migrated 33/33 · 33/33 | met |
| T-7 | migrated 24/24 · 24/24; XSCRIPT 19/19 (`site equal`, `site paint`, `shared ink`) | met |
| T-8 | migrated 27/27, one run over both engines; real Safari UNMEASURED (E-4's) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| **X-2** | REPORT `name-ink` PASS light and dark, both engines; stroke 2.66 · 1.56:1 by `currentColor`; XSCRIPT `shared ink` PASS (§2) | **met** (was open in pass 5) |
| X-3 | x3 2/2 · 2/2 | met |
| X-4 | V2 `type="multiple" shape="cell"` green on T-1 and T-3 migrated | met |
| X-5 | ATTACK `x5` 5/5 on `src-dev` in both engines (`dist` 3/3); desc 1/1 · 1/1 | met |
| X-6 | x6 1/1 · 1/1 | met |
| X-7 | tone 12/12 · 12/12 | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 52/52 on `src` and `dist`; `pill-row` 27/27; FACT `td`/`pd` on `src`, `src-dev`, `dist`; `crit-p6` 6/6, all both engines | met |
| FV-3 | calm-observer commit 1.03 at 81 ms; T-6 migrated 33/33 · 33/33 | met |
| FV-4 | X-7 tone 12/12 | met |
| FV-5 | a11y 6/6 · 3/3 (WebKit contrast only) | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK `src-dev` 5/5 · 5/5 | met |
| FV-8 | PRT hover ΔE 0.0332 against 0.02 | met |
| FV-9 | `flush` by declaration, `plated` by a group utility: `fact-write` 12/12, `crit-p5` group-utility-plated | met (the look is G's) |
| FV-10 | `guard-gone` and `stamp-gone` each fail the shape case | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | shipped K2 on `dist`: 3 rows in a 36 px pill, 4 boxes cut up to 24.64 · 24.86 px, silent | **open: owner** (Q-5, Q-15) |
| R-2 | FACT 72/72 on `src`, `src-dev`, `dist`, both engines, including H6-3's `td` and `pd`; W-D 8/8 · 8/8; `crit-level` flips 2/2; `crit-p6` vertical and underline strips 6/6 | met |
| R-3 | commit cells green; the kick plant takes migrated 33/33 → 21/33 · 21/33 | met |
| R-4 | hover 9/9 · 9/9, F1 3/3 · 3/3 | met |
| R-5 | K2 stroke 2.66:1 light, **1.56:1 dark** (reported); the perimeter carries T-3 | met, reported |
| R-6 | 16.00 px at coarse and `--ui-scale 1.25`; pills at h/2 | met |
| R-7 | CANON clean 4/4 on both routes; A, S, H, `layer`, `foreign`, `unlayered`, `cq` each fail; controls 4/4; both engines. The route's canon unit fails A, S, H, I | met |
| R-8 | T-2 52/52 and CORNER 5/5 on `dist`; W-E `dist` 1/6 · 1/6 | **open: owner** (Q-5) |
| R-9 | 2,937,360 B, +18,303 over the datum | met (stated); the rebind is Q-14's |
| R-10 | FACT 72/72 on every flavour (the `item-*`, `content-*`, nested cells); `crit-level` 12/12 per flavour; the R-10 unit fails both second-writer plants. The foreign-sheet writer is §4.1's coverage gap, not a writer in `src` | met |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines | met |
| E-2 | F1, V2, the sibling state, the interactive descendant, the keyed reorder and the deselectable single are green; C1 T-3 0/3 · 0/3 | **open: owner** (Q-10) |
| E-3 | each MIGRATION claim was re-measured: the declaration (T-2, T-1, W-D); "a rule of yours on the group … writes over either" (`crit-p5`); the write rows (FACT 72/72); a nested group is pills (`pill-in-option`), and so is a strip (`td`, `crit-p6`); the refusal (shape plants); CORNER 5/5. FV5-1's sentence is witnessed by REPORT `name-ink`. FV5-3's sentence states exactly the split H6-4 reads (`none!` info-pass, 16 px, a column, 1 row, a clipped child, on every flavour in both engines). §4.2 is an unstated consequence of an unclaimed write, not a false claim | met |
| E-4 | **UNMEASURED (owner's safaridriver checkbox)**. Safari's list carries `@scope` with a selector-list lower boundary (FV5-2) | **open: owner** |

### 5.6 · G, the gestalt

Not re-filmed. Floor v5 adds one reset and prose and no paint value, and D′ adds none, so the pass-3/4 frames stand: two concentric outlines on focused-selected (Q-3), and plated barely separating from flush in dark (Q-2). O-87 holds: no lighting layer. **Status: open, owner Q-2 and Q-3.**

### 5.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (owner: Q-10, Q-5) |
| X (7) | **7** | — |
| FV (10) | 10 | — |
| R (10) | 8 | R-1 (owner: Q-5, Q-15), R-8 (owner: Q-5) |
| E (4) | 2 | E-2 (owner: Q-10), E-4 (owner: checkbox) |
| G (1) | 0 | G (owner: Q-2, Q-3) |
| **total** | **34 / 40 (85 %)** | 6, all owner-blocked |

Against pass 5 (`D′c5` §5.7, 33/40), X-2 is now met and nothing reopened. That is §P5-6.4's expectation: **34/40, at the owner-gated fixed point.** No non-owner row is open, so no H6 or H5 cell is named against one. The §4 classes go to the owner's sheet and the backlog. Under the stop rule they open no pass 7.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** Every guard, browser and server this seat started exited with its stage. `logs/chain.log` ends `CHAIN2-DONE`, and both holds exited 0. The seat worktree was removed with `git worktree remove --force` before return. The builds stay as scratch under `.claude/worktrees/bl/D4/p6/D4-Dp-crit/out/`, and the run JSON this document quotes is banked in `crit/run-json.tgz`.
