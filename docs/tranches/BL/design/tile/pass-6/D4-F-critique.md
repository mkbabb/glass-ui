# D4 · pass 6 · D4-F · critique: the anatomy declares the tile, on floor v5 and H6

| field | value |
|---|---|
| seat | D4-F adversarial critic, pass 6 (REGISTRY §P5-6.2 item 3). Authored no D4 seat in any pass. Re-runs every number on HEAD + floor v5 + `D4-F.patch`: the battery T-1..T-8, the shared attack set, H6's cells and H5's FACT matrix, CANON and REPORT on **both** routes, the route's units with every plant, and the carried probes. Attacks the route and floor v5. Scores on the 40-row checklist only (§P2-6.3, unchanged by §P5-6.3). Adds no row, picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `ddc068122`. `git diff --stat bdd0a12ba HEAD -- src package.json tests MIGRATION.md demo vite.config.ts docs/tranches/BL/design/tile/harness` is empty, so this is the library and harness the floor seat and the D′ critic measured. Detached worktree `.claude/worktrees/bl/D4/p6/D4-F-crit/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v5.patch` sha1 `de018966`, then `D4-F.patch` `f931fada` (`logs/state-f.log`: `git diff HEAD` **`45fa40dcc191`**, 24 dirty `src` paths). D′'s state (`D4-Dp.patch` `0046d3a6`) was applied only to build D′'s route and attack builds, then reverted (`logs/state-dp.log`, `logs/chain.log`) |
| owner | no ruling on Q-2, Q-3, Q-5, Q-10, Q-11, Q-13, Q-14, Q-15 or the checkbox in `audit/INBOUND.md` or `FORMATION-PROGRESS.md` (read 2026-10-19 05:35; the last D4 line is the D′ critic's bank). Both routes' cells were read; every owner row is scored at its §P5-5 default |
| harness | H6 **`e2360106ad0d`** on every witness, unit and XSCRIPT line (165 log lines print it; no other hash appears). No harness file edited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`, no GPU launch args. Every WebKit number here is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** (`logs/src-T-8-both.log`: "You must enable 'Allow remote automation'") |
| machine | every stage through `~/.claude/guard/guarded --rss-gb 8`. Browser runs never took `--light`; only the typecheck, the unit-plant runs, the bundle read and XSCRIPT did. Every run that could start Playwright WebKit sat inside one of two `--exclusive webkit` holds, both admitted with **0 s** of lock wait: hold A 06:21:24 → 06:41:38, hold B 06:41:38 → 07:02:35. One heavy run at a time. 1-min load at stage starts 7.0-16.5 (`logs/chain.log`, each log's first and last line). No janky cell, no stall, no NOT-REPRODUCED line, no re-run needed. The one cell that moves between runs is REPORT's reported kick |
| records | under `pass-6/D4-F-crit/`: `run-crit.sh` (every stage), `chain1.sh`, `chain2.sh` (the order), `crit-route/` (this seat's compositions, a route dir for `build.mjs`), `probes/crit-f6.mjs` (this seat's probe), `logs/` (every log cited), `run-json.tgz` (the 134 run JSONs this document quotes). Builds were scratch under `.claude/worktrees/bl/D4/p6/D4-F-crit/out/` (31 MB) and were removed with the worktree |
| fences | no tracked source edited in the checkout; `git apply` and the measurement variants touched only the seat worktree; the only git writes were `git worktree add` / `remove --force` of `D4-F-crit/wt`; the only checkout writes are this file and `pass-6/D4-F-crit/`. Sibling repos were not read. One driver slip, reported: `chain2.sh`'s first sitting passed its stage list as one word and exited 2 at 05:44:11 without running anything (`logs/chain.log`); it was fixed and re-run at 05:44:22 |

Citations: `H6` is `H6.md`; `FV5` is `FLOOR-V5.md`; `D′c6` is `D4-Dp-critique.md`; `Fc5` is `../pass-5/D4-F-critique.md`; `crit/` is `pass-6/D4-F-crit/`.

---

## 0 · In brief

1. **Every pass-6 number reproduced, in both engines.** Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run). H6 and H5 cells on **F**: FACT **72/72** on `src`, `src-dev` **and `dist`** in both engines (no pass-6 seat had read F on `dist`); CANON clean 4/4, every plant failing and both controls passing (`h` 2/4 on F's spelling); ATTACK 5/5 (`dist` 3/3); CORNER 5/5 (`dist` 5/5); REPORT `name-ink` PASS light and dark; `mark` 10.70 · 10.73:1. On **D′**: FACT 72/72 on `src` and `src-dev`, CANON 4/4 (`h` 3/4), ATTACK 5/5, CORNER 5/5, REPORT `name-ink` PASS. XSCRIPT 19/19 on pass 6's pair (9/19 on pass 5's, as `H6` says). Units: clean 62/62; every route, floor and critic plant that should fail does; the whole suite runs 2,351 cases with HEAD's 3 `boot-graph` failures. Bundle 2,939,229 B.
2. **X-2, pass 5's one non-owner row, is closed on my own measurement.** REPORT `name-ink` passes on the F build in both engines: the selected name is its item's ink, sRGB 28, 25, 23 light and 233, 230, 226 dark, 2.66:1 and 1.56:1 against unselected. This seat's `crit-f6 ink` widens the read from K2's name to **every text holder and every painted shape in all six migrated sites**: each paints its item's ink, 12/12 per build on `src` and `dist` (and on D′'s `src`), both engines.
3. **R-2 holds on H6-3's cell and on the strip placements F invites.** `td`: strip 40.94 against 40.94, tab 1 row, tab fact `none`, on `src`, `src-dev` and `dist`, both engines. `Fc5`'s own failing cell (ST, a strip in `#meta`) now passes 10/10 with `L3`. `crit-f6 strip` adds a vertical strip and an underline strip in `#meta` and a strip in `#media`, every tab 1 row at the reference height, and F's nearest-group rule across a strip (the outer pill group stays pills, the inner anatomy group is tiles): 12/12 on `src` and `dist` in both engines. With the strip reset struck, the three strip cells fail (6/12): the probe reaches the defect.
4. **Score: 34 / 40 (85 %). F is at its owner-gated fixed point.** Six rows stay open, all the owner's, at their defaults: T-3 and E-2 (Q-10), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). No non-owner row is open. **By §P5-6.4's stop rule the loop stops for F.** Both routes now read 34/40 on the same six rows; Q-13 still separates nothing measured.
5. **Verdict: ADVANCE (owner-gated).** Five classes no H6 or H5 cell reads go to the owner's sheet and the backlog (§4), and change no score. Two are route-neutral confirmations of `D′c6` on F (the foreign-sheet writer escapes F's units too; the strip comment). One is F's own and carried from pass 5 (the mark's room gate still has no unit). Two are new: the composed MIGRATION states the nesting rule twice in two ways on F, and an anatomy group nested in a pill option is taller than the pill that clips it.

---

## 1 · Re-run

The order is in `logs/chain.log`. Chain 1 (05:37 → 05:44): state, library build, typecheck, scene builds (route `src`, `src-dev`, `dist`, `dist-dev`; attack `src`, `src-dev`, `dist`; the pass-4 spec's route, the pass-4 critic's, the pass-5 critic's and this seat's), two measurement variants, whole suite, unit plants, bundle, XSCRIPT, then D′'s builds on a state switch and back. Chain 2 (05:44 → 07:02): the Chromium battery, the Chromium reads, WebKit hold A (the battery), hold B (the H cells and probes). "A · B" is Chromium · Playwright WebKit.

### 1.1 · The battery, `f-src` (and `f-dist` where named)

| witness | unmigrated · A · B | migrated · A · B | whole · A · B | load at start · A · B |
|---|---|---|---|---|
| T-1 | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 10.95 · 10.09 |
| T-2 `src` · `dist` | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 9.93 · 8.65 |
| T-3 | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured; library 2/39) | 10.34 · 9.33 |
| T-4 | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 | 9.12 · 10.57 |
| T-5 `src` · `dist` | 20/37 · 20/37 | **38/38 · 38/38** (both builds) | 87/116 · 87/116; `dist` 88/117 · 88/117 | 10.83 · 7.52 |
| T-6 | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 | 10.24 · 13.85 |
| T-7 | 4/35 · 4/35 | **24/24 · 24/24** | 24/24 · 24/24 | 9.43 · 8.27 |
| T-8, one run | — | **27/27** | 27/39 (+13 unmeasured: library 12, real Safari 1) | 7.70 |
| W-A · W-B · W-C · W-D · W-E | — | — | 5/9 · 9/25 · 0/8 · 4/8 · 1/3, both engines | 8.5-9.4 · 8.2-9.2 |
| W-E `dist` | — | — | 1/6 · 1/6 | — · 7.03 |

Every tally equals `H6` §3, `FV5` §3.4 and `D′c6` §1.1 cell for cell, except W-D, which is D′'s declared half (4/8 on F, as in every pass). T-3's three misses are C1 (Q-10): no carrier in any mode, as `D′c6` §4.3 now reads on D′ too.

### 1.2 · H6's and H5's cells, both routes

Chromium: `logs/h-{f,dp}-*-chromium.log` (06:02 →, load 9-14). Playwright WebKit: hold B, `logs/h-{f,dp}-*-webkit.log` (06:41 →, load 7-11).

| cell | F (`f-*`) | D′ (`dp-*`) | `H6` / `FV5` / `D′c6` |
|---|---|---|---|
| **FACT** `src` · `src-dev` · `dist` | **72/72 · 72/72 · 72/72**, both engines | **72/72 · 72/72**, both engines | 72/72 |
| H6-3 `td`, light and dark | PASS: strip **40.94** against 40.94; tab 99.45×32.94, 1 row, 0 cut, tab fact `none`; the same on `dist` | PASS, the same | the same |
| H6-3 `pd`, light and dark | PASS: option 452.00×40.00 against `pa` 40.00; tab 61.56×25.75, 1 row | PASS | the same |
| H6-4 `none!` at option (info) | **info-pass**: 211.92×77.23 · 211.94×77.25, 16 px, column, 2 rows, content 1 row, 2 clipped; reference 81.86 · 81.88, 3 rows, 0 clipped; `dist` the same | info-pass | the same |
| **CANON** clean · `a` · `s` · `h` · `layer` · `foreign` · `unlayered` · `cq` · `lowlayer` · `cqoff` | **4 · 3 · 3 · 2 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` | **5/5** · 3/3, both engines; X-5 names `tc` and `pc` before ready (5 console errors counted from navigation: H6-3's `td`/`pd` add two) | **5/5**, both engines | 5/5 |
| **CORNER** `src` · `dist` | **5/5 · 5/5**, both engines | **5/5**, both engines | 5/5 |
| **REPORT `name-ink`** (X-2) | **PASS light and dark**, both engines: `oklch(0.216 0.006 56.0)` = its item's ink (28, 25, 23); dark `oklch(0.926 0.006 75.1)` (233, 230, 226); unselected 112, 89, 66 and 195, 185, 172 | **PASS**, the same | PASS |
| REPORT kick (H4-6, reported) | FAIL 0.17 · 0.10 px (want ≤ 0.05), 97 · 48 frames | FAIL 0.17 · 0.11 px | 0.17 · 0.09-0.13 |
| REPORT mark, V2 dark | PASS **10.70 · 10.73:1** (light info 13.12 · 13.16:1) | UNMEASURED (no mark; Q-3) | the same |
| REPORT on an attack build | exit 2, naming the route build, both engines (H5-6) | — | exit 2 |
| **XSCRIPT** (engine-free) | **19/19** on pass 6's pair (`site equal` ×6, `site paint` ×12, `shared ink`); 9/19 on pass 5's pair | (the same pair) | 19/19 · 9/19 |

### 1.3 · The route's units and the plants

H6's `unit.mjs` (config `vitest.wt.config.ts` `f70c44e4`), one driver at a time, no restore mismatch (`logs/unit-plant-*.log`, 05:41 → 05:43, load 12.2-16.5).

| plant | what it plants | result |
|---|---|---|
| clean · clean-after | — | **PASS 62/62** · PASS 62/62 |
| `rows-on-slot-function`, `crit-blank-yields` | a row on the slot function; blank text yields | each **FAIL** 1 ("a row renders only when …") |
| `second-writer`, `mark-off-fact`, `crit-one-arm` | a second writer reading `#meta`; the mark off the fact; the writer's nesting arm struck | each **FAIL** 1 ("one rule writes the tile fact") |
| `canon-a`, `canon-s` | A, S on F's spelling | each **FAIL** 1 |
| `canon-h`, `layer`, `foreign` | H; `D′c4`'s two | **PASS 62/62** each, as in `Fc5`. Since M-14 CANON is R-7's instrument, and it fails all three in both engines (§1.2) |
| `pin-unbounded`, `pin-option-only`, `pin-gone` | floor v4's three, on floor v5's limit | each **FAIL** 1 (the sheet case) |
| `strip-reset-gone`, `limit-group-only` | FV5-2's two, on the F state | each **FAIL** 1 (the sheet case) |
| **`crit-strip-writer`** (this seat) | F's writer gains `.segmented-tabs:has(.toggle-group__meta)`, so a strip holding an anatomy row would write a tile value over its own reset | **FAIL** 1 ("one rule writes the tile fact") |
| `crit-room-off` (`Fc5`'s) | the mark's room gate struck | **PASS 62/62**: still no unit reads "at least 3.5 checks wide" (§4.3) |
| `crit-foreign-writer` (`D′c6`'s, re-read on F) | `.card > .toggle-group { --selection-tile: flush }`, unlayered, in `base.css` | **PASS 62/62**: no unit sees it on F either (§4.1) |
| `crit-cases` (`Fc4`'s three, copied in and removed) | rows after mount, both ways; a forwarding wrapper | PASS 3/3 |

Whole suite (`logs/unit-all.log`): **2,351 ran, 2,348 passed, 3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own), 1 skipped. That is `FV5` §2's F count. `vue-tsc --noEmit` 0 errors on both projects (`logs/tsc.log`). Library build exit 0 (`logs/libbuild.log`).

**Bundle** (`logs/bundle.log`): 2,939,229 B unpacked, 843 files; `dist/` 2,545,985 B in 839 files; JS gzip-9 330,782 B. **+20,172 over the ratchet datum** (2,919,057), +545 over pass 5's F: floor v5's reset, comments and widened limit, the same +545 `D′c6` read on D′. F stays +1,869 over D′ (2,937,360).

### 1.4 · Probes and carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as before? |
|---|---|---|
| `f4-attack.mjs` on `f-own-{src,src-dev,dist}` | 52/52 · 52/52, 54/54 · 54/54, 52/52 · 52/52 | same |
| `crit-f.mjs` (`Fc4`'s) on `f-crit-{src,src-dev,dist}` | 24/24 each, both engines (N3 a pill) | same |
| `crit-level.mjs` (`D′c4`'s) on `src`, `src-dev`, `dist` | 8/12 each, both engines; the 4 misses write `data-shape`, D′'s declaration, which F does not read | same |
| `anatomy-flip.mjs` on `src`, `src-dev`, `dist` | 10/10 each, both engines | same |
| `selector-forms.mjs` | route form 12/13 · 12/13 (miss `nest3`, by design); total 63/78 · 63/78 | same |
| `scope-bound.mjs` (`FV5`'s) | `scope5` 17/17 + strip **9/9**; floor v4's `scope` 17/17 + strip **4/9** (the plant); `unbounded` 12/17, `option` 15/17, `crit` 17/17, `none` 11/17; "every form read as expected", both engines | same as `FV5` §1.1 |
| `states.mjs` states / hover / hover-f1 / a11y | 54/54; 9/9; 3/3; 6/6 · 54/54; 9/9; 3/3; 3/3 (WebKit a11y: contrast only) | same |
| `states.mjs` ink (reported) | K2 stroke and label 2.66 / 1.56 / 2.66:1 (light, dark, PRT); strip glyph and label 3.23 / 2.06 / 3.23:1 | same |
| `crit.mjs` x3 / x6 / tone / desc | 2/2; 1/1; 12/12; 1/1, both engines | same |
| `tile-geometry` · `pill-row` · `corner-gap` | 30/30 · 27/27 · 10/10, both engines | same |
| `unmigrated.mjs` on `dist` | shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 · 24.86 px**; shipped K1 1 row, nothing cut | same |
| `p3.mjs` forced / cost | the mark under forced colours 19.04 · 10.54:1. Cost ratio of minima **0.99** in Chromium (8.4 against 8.5 ms); Playwright WebKit reads 0.0 ms on both arms (its timer does not resolve the pass), info | Chromium ratio in `Fc5`'s 0.97-1.11 band |
| `crit-p5.mjs` (`D′c5`'s) on `f-atk-src`, `f-atk-src-dev` | 12/12 each, both engines | same |
| `crit-ink.mjs` (`D′c5`'s) | **2/2 in Chromium**. Playwright WebKit 1/2: the light verdict reads `--selection-ink` as rgb(0, 0, 0) through its 1 px canvas, while the same line prints name and stroke at rgb(28, 25, 23); `D′c6` §1.4's documented instrument artefact. REPORT `name-ink`, the row's cell, passes there | Chromium was 0/2 in pass 5 |
| `crit-name-lift.mjs` (info) | "as built" equals "lifted": 2.66:1 light, 1.56:1 dark, both engines | the cure landed |
| `crit-f5.mjs` (`Fc5`'s) `nest` on `src`, `src-dev` | **10/10 each, both engines**: ST 1 row, tab 60.28×32.94, strip 40.94, tab parent's fact `none`; `L3` levels 1 and 2 tiles, level 3 a pill | **ST was 0/2 per flavour**: closed by FV5-2 |
| the same, strip reset struck (`f-noreset-crit5-src`) | **8/10**, both engines: ST 2 rows, tab 43.00×46.69, strip 54.69, fact `flush` | the plant reproduces `Fc5` §3.1 |
| `crit-f5.mjs` `mark` | **6/6 · 6/6**; mark cover §3.3 | same verdicts; strip cover moved |
| **`crit-f6.mjs`** (this seat) `strip` on `f-crit6-{src,dist}` | **12/12 each, both engines** (§3.1) | new |
| the same, strip reset struck (`f-noreset-crit6-src`) | **6/12**, both engines: `vt`, `ut`, `mt` fail light and dark | new (the plant) |
| **`crit-f6.mjs`** `ink` on `f-src`, `f-dist`, `dp-src` | **12/12 each, both engines** (§2) | new |
| R-3 plant (`pop0`, the kick deleted, cmp-restored) | T-6 64/88 → **44/88 · 44/88**, migrated 33/33 → **21/33 · 21/33** | same |

The retired pass-4 `canon-fact.mjs` forks were not run (REGISTRY §P5-4, `H6` §1.5).

---

## 2 · X-2, closed, and read on every site

`H6` §1 moved the shared K2 rest colour under `[data-arm="verbatim"]`; FV5-1 tells the consumer to delete such a colour (`MIGRATION.md`, the `--selection-ink` bullet, read in the worktree). On the F build:

| reading | Chromium | Playwright WebKit |
|---|---|---|
| REPORT `name-ink` light / dark | PASS / PASS: the selected name is its item's ink | PASS / PASS |
| `crit-name-lift` | nothing left to lift: as built = lifted | the same |
| XSCRIPT `shared ink` | PASS (48 content classes) | engine-free |
| **`crit-f6 ink`**, all six migrated sites | **12/12**: preset 8 text holders, specimen 16 + 8 strokes, strip 6 + 6, f1 8 + 6, v2 8, c1 9, every one at its item's computed ink, light and dark | **12/12**, the same counts |

`crit-f6 ink` reads more than REPORT does: every element that holds its own text and every SVG shape with a stroke or fill, in every option of every migrated site, against its item's computed colour. It passes on `f-src`, `f-dist` and `dp-src` in both engines. So FV5-1 holds across the transcription, not only on K2's name; F's `#meta` readouts (preset, V2) and `#media` strokes (K2, strip, F1) inherit the state. The selected-against-unselected ink it reports (R-5's, not gating): 2.66:1 light and 1.56:1 dark on preset, K2, F1 and C1; 3.23:1 and 2.06:1 on strip and V2.

**X-2 is met.** The dark 1.56:1 is R-5's, reported; the perimeter carries the selected state in dark (T-3 migrated).

---

## 3 · The attacks this seat added

### 3.1 · FV5-2 on the strip placements F invites (`crit-f6 strip`)

F names `#meta` as "a readout, a description" and `#media` as "a glyph, a thumbnail, a stage". A consumer puts a control in either. H6-3 builds one horizontal pill strip in `#meta`. `crit-route/migrated.mjs` builds the others, every tab carrying two block rows, each against the same strip outside any group:

| cell | Chromium `src` · `dist` | Playwright WebKit `src` · `dist` |
|---|---|---|
| `vt`, a vertical pill strip in `#meta` | PASS: 4 tabs at 32.94 px, 1 row, 0 cut, tab fact `none`; strip 96.47×139.75 (reference 520.00×139.75); option a tile, 16 px, column | PASS, the same |
| `ut`, an underline strip (`semantics="tabs"`) in `#meta` | PASS: 4 tabs at 42.53 px, 1 row | PASS |
| `mt`, a pill strip in **`#media`** | PASS: strip 40.94, 4 tabs at 32.94 px, 1 row | PASS |
| `ct`, a `#meta` strip whose first tab holds an anatomy group | PASS: the inner options are tiles (fact `flush`, 16.00 px, 2 rows, column) | PASS |
| `pg`, a **pill** group whose option holds a strip whose tab holds an anatomy group | PASS: the outer option stays a pill (fact `none`, 284.17×40.00, used 20.00 = h/2); the inner options are tiles | PASS |

All 12 gating cells pass in both flavours and both engines. F's `:has()` counts `.toggle-group` ancestors, so a strip between two groups does not change which group a row belongs to; that is MIGRATION's "an option belongs to its nearest group", measured across a strip. With the strip reset struck, `vt`, `ut` and `mt` fail light and dark (tabs 2 rows at 46.69 or 56.28 px, fact `flush`), so the cells reach the defect FV5-2 cures.

### 3.2 · F's writer cannot be widened to a strip unseen (`crit-strip-writer`)

A writer that also matched a strip holding an anatomy row would undo FV5-2 from the route side. Planted in F's rule, it fails F's one-writer case (§1.3). F's units pin the writer's subject list exactly.

### 3.3 · The mark over the media (reported, G)

`crit-f5 mark` on pass 6's one transcription, both engines alike:
- **K2:** the 14 px mark at (187, 4) covers the sparkline's end point (189.00, 14.36) on **8/8** specimen tiles; overlap with the path box 7.28 px² (13.92 on `ease-out-back`). Unchanged from `Fc5`.
- **strip:** the end point is now **clear** on both wide tiles (0.00 px²). `Fc5` read 43.88 and 47.25 px² covered. The cause is `H6` §1's one transcription, which centres the strip's column (`[data-item] { align-items: center }`), so the glyph moved away from the corner. F's code did not change.
- **F1:** the end point is clear on all six tiles; the mark's box overlaps the thumbnail path's box by 12.86-98.41 px². Reported for the glance, not a cover of the curve's end.

---

## 4 · For the owner's sheet and the execution backlog (no H6 or H5 cell reads these; no score changes)

### 4.1 · The foreign-sheet writer escapes F's units too (route-neutral, confirms `D′c6` §4.1)

`crit-foreign-writer` passes F's 62 cases. F's one-writer case walks `LANE_SHEET` only, and the floor's sheet case reads two named sheets. FACT, CANON and CORNER run on compositions with no `.card` ancestor. No such writer exists in `src` (`FV5` §1.2's `grep`), so R-10 stays met. **Backlog, one assertion for either route:** every `--selection-tile` declaration in `src` whose value is `flush` or `plated` is the route's one rule.

### 4.2 · The strip comment overstates the reset (confirms `D′c6` §4.2 on F)

`scope-bound` reads the info cells #i1 and #i2 as `FV5` §1.2 did: a consumer `flush` written on a strip lands on its tab and the tab's content, in both engines. `base.css`'s "a strip's tabs are always pills" is false under such a write. MIGRATION does not claim it. The owner's call, as `D′c6` says.

### 4.3 · F's mark room gate still has no unit (carried, `Fc5` §4.3)

`crit-room-off` passes 62/62 again. Only a paint read (`crit-f5 mark`, 6/6) checks MIGRATION's "at least 3.5 checks wide". It stays with Q-3 (b) (FV3-6): if the floor takes the mark, it takes a witness for the gate.

### 4.4 · The composed MIGRATION states the nesting rule twice, and the two read against each other on F (new)

The floor's `--selection-tile` bullet ends: "A `ToggleGroup` nested inside a tile is pills again (every group resets the value), and so is a `SegmentedTabs` strip inside one." F's own section says an option belongs to its nearest group, and a group whose own options fill `#media` or `#meta` is tiles, "for two levels of groups". Measured on F, a group nested in a tile that fills `#meta` **is tiles** (`L3` level 2, 16 px, column; `crit-f6` `ct`). A reader of the floor's sentence alone expects pills. Both sentences are true of what they describe: the floor's names the reset, and F's names the writer that runs after it. Together they state one rule two ways. No cell reads prose. **Owner's sheet:** on F, the floor sentence should read "…is pills again unless its own options fill `#media` or `#meta`". On D′ the same qualifier is "unless it declares `shape="cell"`". It is a one-clause edit for whichever route Q-13 picks.

### 4.5 · An anatomy group inside a pill option is taller than the pill (new; X-5's class)

In `pg` the outer pill option is 40.00 px tall, and the anatomy group inside its strip's tab lays out 67.88 px tiles. The pill's one-row clip then holds tiles taller than itself (a geometry read; no paint was read). It is an interactive descendant inside an option, which X-5 names on `src-dev` and ATTACK `x5` gates. On `src` it is silent. It is not a new failure class beyond X-5, but it shows F's nearest-group rule making tiles where the container cannot hold them. **Owner's sheet**, beside R-1's silent production clip (Q-5).

### 4.6 · Smaller notes

- **`crit-ink` in Playwright WebKit** reads its light cell FAIL through a 1 px canvas that parses `oklch(from light-dark(…))` as black. REPORT `name-ink` and `crit-f6 ink` both pass in that engine. It is `D′c5`'s documented instrument artefact and is not a row's instrument.
- **`p3` cost** reads 0.0 ms on both arms in Playwright WebKit (timer resolution). The Chromium ratio, 0.99, is the reading.
- **REPORT kick** reads 0.17 · 0.10 px on F (want ≤ 0.05). It is floor-owned and reported (H4-6).

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes, on this seat's runs.

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18; 16.00 px at fine, coarse and `--ui-scale 1.25` (`tile-geometry` 30/30) | met |
| T-2 | 52/52 · 52/52 on `src` and `dist` | met |
| T-3 | migrated 40/43 · 40/43; C1 has no carrier in any mode; shipped K1 has none in light or PRT | **open: owner** (Q-10; Q-5 for K1) |
| T-4 | migrated 24/24 · 24/24 | met |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | migrated 33/33 · 33/33 | met |
| T-7 | migrated 24/24 · 24/24; XSCRIPT 19/19 (`site equal`, `site paint`, `shared ink`) | met |
| T-8 | migrated 27/27, one run over both engines; real Safari UNMEASURED (E-4's) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| **X-2** | REPORT `name-ink` PASS light and dark, both engines; `crit-f6 ink` 12/12 on every migrated site, `src` and `dist`, both engines; XSCRIPT `shared ink` PASS (§2) | **met** (open in pass 5) |
| X-3 | x3 2/2 · 2/2 | met |
| X-4 | V2 `type="multiple"` green on T-1, T-3 and T-7 migrated | met |
| X-5 | ATTACK `x5` 5/5 on `src-dev`, named before ready, both engines; `dist` 3/3; desc 1/1 · 1/1 | met |
| X-6 | x6 1/1 · 1/1 | met |
| X-7 | tone 12/12 · 12/12 | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 52/52 on `src` and `dist`; `pill-row` 27/27; FACT `td`/`pd` on `src`, `src-dev`, `dist`; `crit-f5` ST; `crit-f6` `vt`/`ut`/`mt`; all both engines | met |
| FV-3 | T-6 migrated 33/33 · 33/33 (the calm observer) | met |
| FV-4 | X-7 tone 12/12 | met |
| FV-5 | a11y 6/6 · 3/3; the forced-colours mark 19.04 · 10.54:1 | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK 5/5 · 5/5; `f4-attack` 54/54 · 54/54 on `src-dev`; the reactive flip (`anatomy-flip` 10/10) | met |
| FV-8 | PRT hover inside T-6 33/33 | met |
| FV-9 | `flush` from the anatomy; `plated` by a consumer write (`crit-f` PL, `crit-p5` group-utility-plated) | met (the look is G's) |
| FV-10 | the route adds no value to guard; the floor's guards are in the suite | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | shipped K2 on `dist`: 3 rows in a 36 px pill, 4 boxes cut up to 24.64 · 24.86 px, silent; shipped K1 has no carrier in light or PRT | **open: owner** (Q-5, Q-15) |
| R-2 | FACT 72/72 on `src`, `src-dev`, `dist`, both engines, including H6-3's `td` and `pd`; `crit-f` N3 a pill 24/24; `L3` 8/8; `crit-f5` ST 1 row; `crit-f6` 12/12 | met |
| R-3 | commit cells green; the kick plant takes migrated 33/33 → 21/33 in both engines | met |
| R-4 | hover 9/9 · 9/9, F1 3/3 · 3/3 | met |
| R-5 | K2 stroke 2.66:1 light, **1.56:1 dark** (reported); every site's ink in §2; the perimeter and the mark carry T-3 | met, reported |
| R-6 | `tile-geometry` 30/30 · 30/30; T-1 16.00 px at fine, coarse and `--ui-scale 1.25`; pills at h/2 | met |
| R-7 | CANON clean 4/4 on both routes; A, S, H, `layer`, `foreign`, `unlayered`, `cq` each fail; `lowlayer` and `cqoff` 4/4; both engines | met |
| R-8 | T-2 52/52 and CORNER 5/5 on `dist`; W-E `dist` 1/6 · 1/6 | **open: owner** (Q-5) |
| R-9 | 2,939,229 B, +20,172 over the datum | met (stated); the rebind is Q-14's |
| R-10 | one rule writes the fact (`second-writer`, `canon-a`, `canon-s`, `crit-one-arm`, `crit-strip-writer` each fail the unit); FACT 72/72 including the `item-*`, `content-*` and nested cells; FV4-1's and FV5-2's plants fail the sheet case. The foreign-sheet writer is §4.1's coverage gap, not a writer in `src` | met |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines in one sitting each, no stall | met |
| E-2 | F1, V2, the sibling state, the interactive descendant, the keyed reorder and the deselectable single are green; C1 T-3 0/3 · 0/3 | **open: owner** (Q-10) |
| E-3 | each claim of F's MIGRATION section re-measured: "the other way round" (FACT `*-in-option`, N3); "two levels … three deep is pills" (`L3` 8/8); nearest group across a strip (`crit-f6` `ct`, `pg`); "at least 3.5 checks wide" (`mark` 6/6); the unfilled slot (ATTACK `empty`, the unit, `crit-blank-yields` fails it); the floor's write rows (FACT 72/72, `crit-p5`); FV5-1 witnessed by REPORT `name-ink` and `crit-f6 ink`; FV5-2's "so is a strip" (`td`, `crit-f6`); FV5-3's split (`none!` info-pass, 16 px, column, 2 clipped, both flavours, both engines). §4.4 is two true sentences stating one rule two ways, not a false claim | met |
| E-4 | **UNMEASURED (owner's safaridriver checkbox)**. Safari's list: `:has()` with a complex `:not()`, `@container style()` on a registered property, `mask-composite: exclude`, the percentage `min()` room gate, `@scope` with a lower boundary, now a selector list (FV5-2) | **open: owner** |

### 5.6 · G, the gestalt

Not re-filmed: floor v5 adds one reset and prose and no paint value, and F adds none since pass 4, so the `D4-F-proto/glance-pair/` frames stand. Focused-selected shows two concentric outlines (Q-3). Plated barely separates from flush in dark (Q-2). The check covers K2's curve end point on 8/8 specimen tiles; the strip's end point is now clear; F1's is clear (§3.3). O-87 holds: no lighting layer. **Status: open, owner Q-2 and Q-3.**

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

Against pass 5 (`Fc5` §5.7, 33/40), X-2 is met and nothing reopened. That is §P5-6.4's expectation: **34/40, at the owner-gated fixed point.** No non-owner row is open, so no H6 or H5 cell is named against one. The §4 classes go to the owner's sheet and the backlog, and under the stop rule they open no pass 7. **F and D′ read the same 34/40 on the same six open rows** (`D′c6` §5.7), and every H6, H5, battery and attack cell reads the same on both in both engines. What separates them is still Q-13: D′ is one prop and one rule at 1,869 B less; F makes tiles from the anatomy, bounds nesting by the nearest group (now measured across a strip), carries the mark, and adds three engine facts only Safari can settle.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** Every guard, browser and server this seat started exited with its stage (`logs/chain.log` ends `CHAIN2-DONE` at 07:02:35; both holds exited 0; `pgrep` found nothing of this seat's afterwards). The seat worktree was removed with `git worktree remove --force`, and the scratch builds beside it were deleted; the run JSON this document quotes is banked in `crit/run-json.tgz`.
