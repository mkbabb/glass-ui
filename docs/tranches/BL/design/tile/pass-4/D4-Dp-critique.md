# D4 · pass 4 · D4-D′ · critique: the declared cell, on floor v3

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 4. Did not author the route. Re-runs every number the prototype scores on (both routes' shared attacks included, H4-1), attacks the route's claims, and scores it on the fixed 40-row checklist only (REGISTRY §P2-6.3, unchanged by §P3-6.3). Adds no row, picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `c0359b94d` (the prototype's commit), in a detached worktree at `.claude/worktrees/bl/D4/p4/D4-Dp-crit/wt` (node_modules and tests-visual/node_modules symlinked). `git diff --stat 9219651e HEAD -- src tests MIGRATION.md package.json demo vite.config.ts` is empty. `floor-v3.patch` (sha1 `f8f57677…`) applied clean, then `D4-Dp-proto.patch` (sha1 `2473107b…`). A second worktree `pristine-wt` (the same two patches) served as the reference copy after the plant accident in §5.1. Both were removed with `git worktree remove --force` before return |
| harness | H4 **`a26206b6a740`** (39 files) on every run JSON and unit line. Harness files unedited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** (`logs/src-T-8-both.log`: "You must enable 'Allow remote automation' in the Developer section of Safari Settings") |
| machine | Every build, unit run, probe and browser run went through `~/.claude/guard/guarded --light --rss-gb 8`; every Playwright WebKit read ran inside ONE `--exclusive webkit` hold (`logs/webkit-all.log`). The lock queued the stage 18:24 → 18:58 (34 min, other seats' WebKit runs), then it ran 18:58 → 19:32. One heavy run at a time, except one concurrency accident of this seat's own (§5.1). 1-min load: builds and units 12.3-21.2, Chromium chain 9.1-19.1 (17:52 → 18:23), Playwright WebKit 6.5-34.0. No cell failed on janky frames, and none needed a re-run |
| records | Everything under `pass-4/D4-Dp-crit/`: `run-crit.sh` (the prototype's driver re-pointed, its patch stage removed, plus `crit-units` and `crit-level`), `logs/` (every log cited; `logs/void/` holds the 16 logs voided in §5.1), `probes/crit-level.mjs` and `probes/crit-level-diag.mjs` (this seat's probes), `run-json.tgz` (every run JSON this document quotes, 88 KB). Builds stay in `.claude/worktrees/bl/D4/p4/D4-Dp-crit/out/` |
| fences | No tracked source edited in the checkout. Git writes: `git worktree add` / `remove` of `wt` and `pristine-wt`. Checkout writes: only this file and `pass-4/D4-Dp-crit/` |

Citations: `D′s` / `D′p` are `D4-Dp-spec.md` / `D4-Dp-proto.md` (pass 4); `FV3` is `FLOOR-V3.md`; `H4` is `H4.md`; `crit/` is `pass-4/D4-Dp-crit/`.

---

## 0 · In brief

1. **Every number the prototype scores on reproduced, cell for cell, in both engines.** Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run), W-D 8/8 · 8/8. The H4-1 shared attack set, which carries both routes' declarations on one composition: FACT 12/12 · 12/12, ATTACK 3/3 · 3/3 (`src-dev` 4/4 · 4/4), CORNER 5/5 · 5/5, each on `src` and `dist`. Also reproduced: the units (clean 63/63, 9/9 plants fail, whole suite 2,352 ran with HEAD's 3 `boot-graph` failures), the carried rows (states 54/54, hover 9/9 + F1 3/3, x3 2/2, x6 1/1, tone 12/12, desc 1/1, a11y 6/6 · 3/3), R-3's kick plant (33/33 → 21/33 in both engines), every probe (canon-fact, fact-write, corner-gap, tile-geometry, pill-row, unmigrated), and the bundle (2,936,340 B to the byte).
2. **One row the prototype scored met does not pass: R-10.** The tile fact is still read at two elements, and a consumer write on the item splits them (§2):
   - the item's geometry rules are style queries on the item, so they read the **group's** value;
   - the pill law's label rule `.toggle-group__item > :not(svg)`, the content row law (`.pill-row *`) and the development name all read the **item's** value.

   `--selection-tile: none` written inline on item 0 of a declared `shape="cell"` group gives a 16 px column tile with its perimeter on, but the pill's label clip (`overflow: hidden`, ellipsis, `padding-block: 0.15em`) lands on both of the tile's rows. The tile grows 63.58 → 72.17 px. On `src-dev` the tile is named `asks for a second row: a pill shows its content on one row`. That is 6/6 cells per engine (`src`, `src-dev`, `dist` × light, dark), identical in Chromium and Playwright WebKit. The code is the floor's, so F carries it too; the cure is a floor move (§4).
3. **What held under new attack.** The declaration flipped after mount, `cell` → `pill` and `pill` → `cell`, by the group's `data-shape` (what the prop stamps): 4/4 per flavour in both engines, the perimeter and the plate following, 0 false names. Playwright WebKit re-matches the item's style query on the flip.
4. **Score: 33 / 40 (82.5 %).** The seven rows that do not pass are the six owner rows built at their defaults (T-3 and E-2 on Q-10, with Q-5 for shipped K1; R-1 on Q-5 and Q-15; R-8 on Q-5; G on Q-2 and Q-3; E-4 on the checkbox) and R-10, which is not the owner's. **The route is not at its owner-gated fixed point.**
5. **Verdict: ADVANCE.** The one open row outside the owner's has a one-declaration floor cure, and the route needs no change for it. Two plants outside A, S and H pass the route's container-aware canon unit, which matters for pass 5's R-7 instrument (§5).

---

## 1 · Re-run: what reproduced

Chromium: `logs/battery-src-chromium.log` (17:52 → 18:08, load 9.2-19.1 at witness starts), then `dist-*`, `atkdist-*`, `atkdev-*`, `probe-*`, `carried-*`, `t6-pop0-*`, `crit-level-*` to 18:23. Playwright WebKit: one lock hold, `src-*-webkit.log`, `src-T-8-both.log`, `dist-*-webkit.log`, `atk*-webkit.log`, `probe-*-webkit.log`, `carried-*-webkit.log`, `t6-pop0-webkit.log`, `crit-level*-webkit.log` (18:58 → 19:32). "A · B" is Chromium · Playwright WebKit; the load is the 1-min load at the witness's start.

| witness | build | unmigrated · A · B | migrated · A · B | whole · A · B | load · A · B |
|---|---|---|---|---|---|
| T-1 | src | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 14.59 · 9.11 |
| T-2 | src · dist | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 15.44 · 6.48 |
| T-3 | src | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured) | 16.09 · 9.82 |
| T-4 | src | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 | 19.14 · 11.58 |
| T-5 | src · dist | 20/37 · 20/37 | **38/38 · 38/38** (both builds) | 87/116 · 87/116; dist 88/117 · 88/117 | 12.12 · 19.07 |
| T-6 | src | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 | 10.47 · 22.16 |
| T-7 | src | 4/32 · 4/32 | **24/24 · 24/24** | 24/24 · 24/24 | 9.17 · 34.03 |
| T-8 | src, one run | — | **27/27** | 27/39 (+13 unmeasured; library 0/12, real Safari 1) | 19.94 |
| W-A · W-B · W-C · W-E | src | — | — | 5/9 · 9/25 · 0/8 · 1/3, both engines | 9.3-9.96 · 25.8-27.0 |
| W-D | src | — | — | **8/8 · 8/8** | 9.29 · 26.93 |
| W-E | dist | — | — | 1/6 · 1/6 | — · 17.35 |
| CANON | src | — | — | **1/3 · 1/3** (F3-1) | 9.43 · 24.38 |
| FACT | attack src · dist | — | — | **12/12 · 12/12** · **12/12 · 12/12** | 9.23 · 24.43 |
| ATTACK | attack src · dist · src-dev | — | — | **3/3 · 3/3** · 3/3 · 3/3 · **4/4 · 4/4** | 9.69 · 22.55 |
| CORNER | attack src · dist | — | — | **5/5 · 5/5** · **5/5 · 5/5** | 10.44 · 21.61 |
| REPORT | src · attack src | — | `kick` push **0.15 px** (Chromium, `preset-migrated` 300.00×63.58, peak 1.0277) · **0.14 px** (Playwright WebKit, attack `preset` 300.00×40.00, peak 1.0276), want ≤ 0.05; 0.00 px at the scenes' own 204 px. `mark` UNMEASURED | reported, not gating | 10.00 · 20.36 |

**T-3's three misses** are C1 (`run-json.tgz`, `dp-src/T-3-*.json`): carrier 22.50 · 22.50 px² light, 23.00 · 22.50 dark, 22.50 · 22.50 PRT, against the 224 px² bar, with the perimeter band at 0.00. Fill 1.19 / 1.24 / 1.01:1 · 1.22 / 1.21 / 1.01:1.

**T-6, `preset-migrated` (Chromium):** keyboard pop 1.03 at 78 ms, programmatic 1.03 at 89 ms, calm observer 1.03 at 82 ms, pointer 1.04 at 121 ms, each with a trough and a settle. Body travel 0.00 px. Tab entry moves 0.00. Hover ΔE 0.0946, the same under PRM, and 0.0332 under PRT, against 0.02. Coarse taps latch nothing. Every tally equals `D′p` §3.2. The peak times sit within ±8 ms of the prototype's.

**Probes and carried instruments**, Chromium · Playwright WebKit:

| instrument | reading | `D′p` |
|---|---|---|
| `canon-fact.mjs` clean; plants A, S, H | 4/4 · 4/4; 3/4 · 3/4 each | same |
| `fact-write.mjs` | 12/12 · 12/12 | same |
| `corner-gap.mjs` | 10/10 · 10/10 | same |
| `tile-geometry.mjs` | 30/30 · 30/30 | same |
| `pill-row.mjs` | 27/27 · 27/27 | same |
| `unmigrated.mjs` on `dist` | shipped K1 208.00×40.00, 1 row, nothing cut; shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 · 24.86 px** | same |
| `states.mjs` states / hover / hover-f1 / a11y | 54/54 · 54/54; 9/9 · 9/9; 3/3 · 3/3; 6/6 · 3/3 (Playwright WebKit: contrast only) | same |
| `states.mjs` ink (reported) | K2 stroke 2.66:1 light, **1.56:1 dark**, both engines | same |
| `crit.mjs` x3 / x6 / tone / desc (`src-dev`) | 2/2 · 2/2; 1/1 · 1/1; 12/12 · 12/12; 1/1 · 1/1 | same |
| R-3 plant (`pop0`: the kick deleted, rebuilt, restored by `cmp`) | T-6 64/88 → **44/88 · 44/88**, migrated 33/33 → **21/33 · 21/33** | same |

**Units** (H4-3's `unit.mjs`, config `f70c44e4`; the valid serial run, §5.1): clean **63/63**. Plants `canon-a`, `canon-s`, `canon-h`, `canon-i` and `no-writer` each fail 1 (the canon case). `split` fails 2 (canon and the R-10 pin). `guard-gone` and `stamp-gone` each fail 1 (the shape case). The sheet was byte-identical to the pristine apply after the run. Whole suite: **2,352 ran, 2,349 passed, 3 failed** (`gate:boot-graph`, HEAD's own), 1 skipped (`logs/unit-all.log`). `vue-tsc --noEmit` exits 0 on both projects (`logs/tsc-*.log`).

**Bundle** (`logs/bundle.log`): 2,936,340 B unpacked, 844 files; `dist/` 2,543,882 B in 840 files; JS gzip-9 330,651 B. That is +17,283 over the ratchet datum (Q-14's).

**Engines and stalls.** No hang, no engine failure, no NOT-REPRODUCED in either engine. Playwright WebKit retired its browser at H3-1's 60-navigation cap 1-2× in T-1, T-3, T-4, T-6 and the plant's T-6, as designed.

---

## 2 · The counterexample: the fact is read at two elements

Floor v3 made the item's geometry read the fact, which closed pass 3's `fact-split` (FACT 12/12). It did not make every reader read the fact **at the same element**. A style query's container is the subject's parent:

| reader | rule | subject | so it reads the fact of |
|---|---|---|---|
| tile geometry, perimeter switch | `@container not style(--selection-tile: none) { .toggle-group__item {…} }` (`toggle-group/styles.css:206-219`) | the item | the **group** |
| pill clamp, row, clip | `@container style(--selection-tile: none) { .toggle-group__item {…} }` (`:141-149`) | the item | the **group** |
| flush plate | `@container style(--selection-tile: flush) { .control-surface[data-state] {…} }` (`control-surfaces.css:100-106`) | the item | the **group** |
| **pill label clip** | the same block, `.toggle-group__item > :not(svg) { overflow: hidden; text-overflow: ellipsis; padding-block: 0.15em }` (`:151-156`) | the item's child | the **item** |
| **content row law** | `@container style(--selection-tile: none) { :where(.pill-row *…) { display: inline !important } }` (`utilities/base.css:88-103`) | the item's descendants | the **item**, or a deeper ancestor |
| **development name** | `getComputedStyle(item).getPropertyValue("--selection-tile")` (`ToggleGroupItem.vue:148`) | — | the **item** |

Nothing pins the item's value to its group's. The group resets the fact, and the item only inherits it. A consumer's `style` on a `ToggleGroupItem` lands (ATTACK `attrs`, FV3-2), so the item's value is a writable input of its own.

`crit/probes/crit-level.mjs`. Item 0 is read with FACT's reader and its "agree" judge. Six cells × light and dark, on `dp-src`, `dp-src-dev` and `dp-dist`, both engines (`logs/crit-level-*.log`):

| cell | what is written | reading, identical in Chromium and Playwright WebKit, every flavour | verdict |
|---|---|---|---|
| control-tile | nothing, `preset-migrated` | tile, 204.00×63.58, 16 px, 2 rows, perimeter 1 | PASS |
| control-pill | nothing, `preset` (undeclared) | pill, 204.00×40.00, 20.00 = h/2, 1 row | PASS |
| **item-none-in-tile** | `--selection-tile: none` inline on item 0 of the declared group | item fact `none`, group fact `flush`; **204.00×72.17**, 16 px, column, 2 rows, perimeter 1; `src-dev` logs `[ToggleGroupItem] value="smooth" asks for a second row: a pill shows its content on one row…` | **FAIL, 6/6 cells per engine** |
| item-flush-in-pill | `flush` inline on item 0 of the undeclared `preset` | item fact `flush`, group fact `none`; a correct pill (204.00×40.00, h/2, 1 row, nothing past the box), no name | judge FAIL, **paint correct** (see below) |
| flip-cell-to-pill | the declared group's `data-shape` set to `pill` after mount | pill at h/2, 1 row, perimeter off, 0 errors | PASS 2/2 |
| flip-pill-to-cell | the undeclared group's `data-shape` set to `cell` after mount | tile at 16 px, 2 rows, perimeter 1, 0 errors | PASS 2/2 |

**What the item-level write does inside the tile** (`crit/probes/crit-level-diag.mjs`, `logs/crit-level-diag-*.log`, both engines identical). Both rows of the tile's content changed:

- the name `<span class="text-small capitalize">` goes from 178.00×21.41 to 178.00×25.97;
- the readout `<span class="text-mono-caption …">` goes from 178.00×20.17 at y 111.41 to 178.00×24.20 at y 115.97.

That is the pill label rule's `padding-block: 0.15em` on each row (+4.56 and +4.03 px), with `overflow: hidden` and an ellipsis on content that is no longer a pill's. The option is a tile by its corner, column and perimeter, and a pill by its content's clip and by its development name. That is the R-10 class ("is a tile" spelled once, with every other reader derived from or pinned to it), and it is silent on `dist`.

**Why this is scored and not sent to pass 5.** §P3-6.3 folds the `fact-split` class into R-10: a fact written without a declaration, where the tile's readers disagree. This is that class, at the one element FACT and FACT-WRITE do not write (the group, its ancestor, a nested group: all covered). The input is not exotic. REGISTRY §P3-5 records O-94 R-2 (an opt-out of the selected fill on a bare item) as "a value of `--selection-tile` or a sibling fact", which is an item-level write. MIGRATION documents `--selection-tile` as a consumer input and says nothing about the item.

**The `item-flush-in-pill` cell is not a paint defect.** FACT's judge reads the item's own fact, which is `flush`, but the pill paints correctly on this content (text spans only). The same write switches off the content row law and the development name for that item, so a block child set there would stack under the pill's clamp without a name. This seat did not build that content, so it is not claimed.

**Not route-owned.** Every rule in the table is floor v3's, and `D4-Dp-proto.patch` writes only the group's value. F's writer (`FV3` §1, the F stub) writes the same group value under the same floor, so the same cells apply to F unchanged. The floor fix that closes this row on D′ would close it on F too.

---

## 3 · The checklist (REGISTRY §P2-6.3), row by row

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes, on this seat's runs. A transcription arm under D′ is undeclared markup, so its pills are R-1's.

### 3.1 · T-1..T-8

| row | reading (this seat) | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18, 16.00 px at fine, coarse and `--ui-scale 1.25` | met |
| T-2 | 52/52 · 52/52 on `src` and `dist`, H4-2's late cells included | met |
| T-3 | migrated 40/43 · 40/43; C1 22.50 px² against 224 in every mode (§1); shipped K1 has no carrier in light or PRT | **open: owner** (Q-10; Q-5 for K1) |
| T-4 | migrated 24/24 · 24/24 | met |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | migrated 33/33 · 33/33 (§1) | met |
| T-7 | migrated 24/24 · 24/24 | met |
| T-8 | migrated 27/27 in one run over both engines; the 13th unmeasured cell is real Safari (E-4's) | met |

### 3.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| X-2 | K2 stroke and label take `var(--selection-ink)`, 2.66:1 light; T-3 and T-7 migrated green with no `[data-state="on"]` rule | met |
| X-3 | x3 2/2 · 2/2 | met |
| X-4 | V2 `type="multiple" shape="cell"` green on T-1 and T-3 | met |
| X-5 | desc 1/1 · 1/1 on `src-dev`; ATTACK `src-dev` 4/4 · 4/4 | met |
| X-6 | x6 1/1 · 1/1 | met |
| X-7 | tone 12/12 · 12/12 | met |

### 3.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 52/52 · 52/52 on `dist`; `pill-row` 27/27 · 27/27 | met |
| FV-3 | calm-observer commit 1.03 at 82 ms (Chromium) | met |
| FV-4 | X-7 | met |
| FV-5 | a11y 6/6 · 3/3 | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK `src-dev` 4/4 · 4/4 | met |
| FV-8 | PRT hover ΔE 0.0332 (Chromium) against 0.02 | met |
| FV-9 | `flush` by declaration; `plated` by a rule on the group: FACT-WRITE 12/12 · 12/12 | met (the look is G's) |
| FV-10 | `guard-gone` and `stamp-gone` each fail the shape case | met |

### 3.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | shipped K2 on `dist`: 3 rows in a 36 px pill, 4 boxes cut up to 24.64 · 24.86 px, silent; shipped K1 has no carrier in light or PRT | **open: owner** (Q-5, Q-15) |
| R-2 | W-D 8/8 · 8/8; FACT `pill-in-tile`, `pill-beside-tile`, `tile-in-pill` green; the declaration flipped either way after mount reads the right shape (§2) | met |
| R-3 | commit cells green; the kick plant takes migrated 33/33 → 21/33 in both engines | met |
| R-4 | hover 9/9 · 9/9, F1 3/3 · 3/3 | met |
| R-5 | K2 stroke 2.66:1 light, **1.56:1 dark** (reported); the perimeter carries T-3 | met, reported |
| R-6 | 16.00 px at coarse and `--ui-scale 1.25`; `tile-geometry` 30/30 · 30/30; pills at h/2 | met |
| R-7 | the canon unit fails plants A, S and H (and I, `no-writer`, `split`), run through the shared `unit.mjs` on a clean sheet; the engine-side `canon-fact.mjs` agrees (A, S, H 3/4 · 3/4). CANON reads 1/3 · 1/3 on clean, the F3-1 blind spot the floor seat recorded before any route existed. The row names the unit, and the unit discriminates the three plants | met on the unit. The unit's evaluator has two blind spots outside A, S and H (§5.2) |
| R-8 | T-2 52/52 and CORNER 5/5 on `dist`; W-E `dist` 1/6 · 1/6 (no production signal under Q-5 (b)) | **open: owner** (Q-5) |
| R-9 | 2,936,340 B, +17,283 over the datum (§1) | met (stated); the rebind is Q-14's |
| **R-10** | FACT 12/12 · 12/12 and the unit R-10 pin hold at the group. **The item-level cell fails:** `item-none-in-tile` 6/6 per engine. The tile's geometry reads the group's value; its label clip, content row law and development name read the item's; a 16 px tile carries the pill's clip on both rows (+8.59 px) and is named a pill on `src-dev` (§2) | **open, not owner-blocked** (floor-owned; cure in §4) |

### 3.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines in one sitting each | met |
| E-2 | F1, V2, the sibling state, the interactive descendant, the keyed reorder and the deselectable single are green; C1 T-3 0/3 · 0/3 | **open: owner** (Q-10) |
| E-3 | Each route claim was re-measured: CORNER 5/5 · 5/5 (`src`, `dist`); "sets the fact and that is all": the R-10 pin and FACT `declared`; the unknown-shape refusal: the unit plant; the write-over sentence: FACT-WRITE 12/12 · 12/12; the pill clause: T-2 52/52 on `dist`. §2's split falsifies no sentence: MIGRATION states nothing about a write on the item, and "under either tile value an option is a card … not held to one row" still holds (2 rows, 16 px) | met |
| E-4 | **UNMEASURED (owner's safaridriver checkbox)** | **open: owner** |

### 3.6 · G, the gestalt

Not re-filmed. The row is owner-blocked (Q-2, Q-3), and the route adds no paint value or lighting layer to floor v3's `flush` register, so O-87 holds trivially. The machine law asks for only the screenshots a reading needs. Pass 3's frames (`../pass-3/D4-Dp-crit/pair/`) stand for the register: two concentric outlines on focused-selected (Q-3), and plated against flush barely separating in dark (Q-2). §2 adds no frame to G: the item-level write is a consumer input, not the register. **Status: open, owner Q-2 and Q-3.**

### 3.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (owner: Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 7 | R-1 (owner: Q-5, Q-15), R-8 (owner: Q-5), **R-10 (floor, not owner)** |
| E (4) | 2 | E-2 (owner: Q-10), E-4 (owner: checkbox) |
| G (1) | 0 | G (owner: Q-2, Q-3) |
| **total** | **33 / 40 (82.5 %)** | 7: six owner-blocked, one not |

The prototype claimed 34. The difference is R-10. **Not converged, and not at the owner-gated fixed point**: one row outside the owner's is open.

---

## 4 · What would close the open row outside the owner's

- **R-10: pin the item's fact to its group, in the floor.** Two forms. Neither was built or measured here.
  - One declaration in `toggle-group/styles.css`, `.toggle-group__item { --selection-tile: inherit !important; }` in `@layer components`. A layered `!important` outranks a consumer's unlayered rule and an inline normal declaration, so the item always carries its group's value, and every reader in §2's table reads one value. Only an inline `!important` would still split, which is the spelling floor v3 already concedes for the corner.
  - Or move the three item-level readers onto the item's own query: the label rule, the `.pill-row *` law and the name read the item's parent. That is more code and three places to keep in step, so the pin is the KISS form.
  - Either form also closes `item-flush-in-pill`'s unexercised half: the row law and the name switched off on a pill's content.
  - **Witness:** promote `crit/probes/crit-level.mjs`'s `item-none-in-tile` and `item-flush-in-pill` cells into FACT (H5), with a fixture PASS and a plant (the pin removed). The `item-flush-in-pill` judge must read paint, not the item's own fact: the item can hold a pinned value that FACT's reader would print as agreement.
  - The cure lives in floor code that both routes share, so it closes R-10 on D′ and on F at once. D′'s own patch needs no change.

After that cure the route reads 34/40, the six owner rows.

---

## 5 · For pass 5's record (new classes; not scored)

### 5.1 · Run hygiene: a concurrency accident in this seat, and what it says about `unit.mjs`

- **What happened.** The first `unit-plants` stage ran in the background. This seat edited `run-crit.sh` while zsh was still reading it (the trap `H4` §5.2 records), and the shell printed a parse error. It did not stop the stage, so a second, foreground `unit-plants` ran on the same worktree beside it from about 17:45 to 17:47.
- **The damage.** `unit.mjs` restores each plant to the text it read at start, so each run's restore wrote the other's plant back. Plants A, S, H and I ended up stacked in `styles.css`. The critic's two `crit-units` plants then ran on that sheet, and a verbose unit run showed it: the received tile list held plants A, S and I.
- **The repair.** The 16 logs from 17:45 to 17:48 are void (`logs/void/`). The sheet was restored from a pristine apply of the same two patches and checked by `cmp`, and every plant re-ran serially on a clean sheet (`logs/unit-plant-*.log`, `logs/crit-unit-*.log`, 17:49 → 17:51), with the sheet `cmp`-clean after each stage. The scene builds (17:43-17:44) predate the first plant and were never touched. Every number in this document comes from the serial re-run.
- **For H5.** `unit.mjs` could take a per-worktree lock, and restore from a copy taken before its first `--sub`, checked against `git diff`. A second driver would then fail loud instead of stacking plants.

### 5.2 · The route's canon unit: two plants outside A, S and H pass it

`run-crit.sh crit-units`, clean sheet. Each plant is read by the unit, then built into a scene app and read in the engine:

| plant | unit (`unit.mjs`) | engine | why the unit misses it |
|---|---|---|---|
| **layer**: an unlayered `.toggle-group { --selection-tile: none }` appended after the sheet's `@layer components` block (lower specificity than the declaration) | **PASS** (`logs/crit-unit-layer.log`) | `canon-fact.mjs`: twin facts **`none/none`**, `0 rule(s): no rule declares the tile` (`logs/crit-canonfact-layer.log`): no tile anywhere | the fact evaluator ranks by specificity and order, not by cascade layer. This is `D′p` N-2, now measured as a false PASS |
| **foreign**: `.pill-row.control-surface { border-radius: 12px }` inside the layer | **PASS** (`logs/crit-unit-foreign.log`) | `canon-fact.mjs` **4/4 PASS** too (`logs/crit-canonfact-foreign.log`). **T-2** reads every pill at **12px → 12.00 (0.60-0.67 of h/2)** (`logs/crit-foreign-T-2-chromium.log`) | both laws check only "group-scoped" corners, selectors that name `toggle-group`. A pill corner from any other selector the item carries goes unread. T-2 catches it in paint |

Neither is plant A, S or H, so R-7 stands met (§3.4). R-7's instrument is still weaker than its name, though: the unit is route-authored, and the shared CANON is blind to `@container` (F3-1). H5 should cure CANON with both of these as plants, which would make CANON the one R-7 instrument again (P-3).

### 5.3 · Smaller notes

- **The flip is clean.** A `shape` change after mount moves the geometry, the perimeter and the plate in both engines (§2). The development name's observer does not hear the group's attribute, but on these cells nothing needed naming. A flip to `pill` over content that asks for a second row is unmeasured.
- **The floor comment `D′s` and `D′p` flagged** (`utilities/base.css:54-55`, "or any ancestor of its options") is still in floor v3. §2 adds a second falsehood to the same comment: "every reader derives from it" holds at the group, not at the item.
- **REPORT `kick`** reads 0.15 · 0.14 px at 300 px against a 4 px gap. That is floor-owned and reported (H4-6).
- **CANON 1/3 · 1/3** stays the harness's (F3-1, H5).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** Nothing this seat started is left running. Every guard, browser and server exited with its stage (`logs/chain.log` ends `webkit-all-done`; `logs/webkit-all.log` ends `exit 0`). Both worktrees were removed with `git worktree remove --force`, and `git worktree list` shows none of this seat's. Builds and run JSON stay in `.claude/worktrees/bl/D4/p4/D4-Dp-crit/out/`, and the JSON every number here rests on is banked in `crit/run-json.tgz`.
