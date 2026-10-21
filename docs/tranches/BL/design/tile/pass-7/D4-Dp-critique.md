# D4 · pass 7 · D4-D′ · critique: the declared cell, on floor v6 and H7, under O-103

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 7. Authored no D4 seat in any pass. Re-runs every number on HEAD + `floor-v6.patch` + `D4-Dp.patch` in both engines: the battery T-1..T-8, the shared attack set, H7's and H6's cells, H5's FACT matrix, CANON and REPORT, and the route's units with every plant (pass 6's `crit-foreign-writer` included). Scores on the 40-row checklist (REGISTRY §P2-6.3, unchanged). Adds no row and picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `00ebb0d03`. `git diff --stat 8799da564 HEAD -- src package.json MIGRATION.md tests demo vite.config.ts` is empty, so this is the library the floor-v6 seat measured. Detached worktree `.claude/worktrees/bl/D4/p7/D4-Dp-crit/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v6.patch` sha1 **`09e74243`** (39 files, +1452 / −272), then `D4-Dp.patch` **`714cd3c0`** (8 files, +306 / −25), both `apply --check` clean; `git diff HEAD` `df9f391ec4dd`, 27 dirty `src` paths (`logs/state.log`). The same hash was read after every plant and before removal |
| owner | **INBOUND O-103 is a ruling** (the delegate accepted in O-102b), and it overrides every default: Q-13 **D′**, Q-10 **(b)**, Q-5 **(b) only**, Q-15 **(a)**, Q-2 **(b)**, Q-3 **(a)**, O-1 **(a)**; the safaridriver checkbox **not granted**, so E-4 reads the darwin headless `guarded --exclusive webkit` run of record and Safari-only facts are reported, not gated. INBOUND (O-103b is the last row) and FORMATION-PROGRESS (last D4 line: H7's bank) hold nothing later on D4. So **no row here sits on a DEFAULT**: each owner row is scored against its ruled bar, by this seat's own measurement |
| harness | **H7 `6d6184295110`**, unedited; every witness, SHEET, UNIT and XSCRIPT line prints it |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell, no `channel`, no GPU args) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Every WebKit number is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; T-8's driver answered "You must enable 'Allow remote automation'" (`logs/src-T-8-both.log`) |
| machine | Every stage through `~/.claude/guard/guarded --rss-gb 8`; browser runs never `--light` (only SHEET, the typecheck, the bundle read and XSCRIPT took it). One heavy run at a time (`chain.sh`, serial). The guard's per-call admission waited 3-7 min at load 14-29 (`build-*.log`), so after the four route builds the driver was re-spelled to put each group (unit plants, Chromium battery, Chromium reads, film) in **one** guarded hold. The new file went in by `mv` onto a fresh inode, so the running stage kept its own copy. **WebKit holds**, each `--exclusive webkit`: A admitted at once (00:03:28) and ran to 00:25:42; **B waited 50 min 45 s** (00:25:42 → 01:16:27) behind other seats and ran to 01:41:12. Neither wait was cancelled. Loads at stage starts: 6.8-43.8 (`logs/chain.log`, each log's first and last line). No janky cell, no stall, no NOT-REPRODUCED line. Every cell read the same at every load it was taken, except the reported kick (0.17 · 0.12 px against pass 7's 0.16 · 0.13) |
| records | `D4-Dp-crit/`: `run-crit.sh` (every stage), `chain.sh` (the order run), `crit-route/` (Q-10 (b)'s one D′ answer, §3.2), `logs/` (every log cited), `frames/` (G's glance pair, 16 stills + `pair.json`), `run-json.tgz` (the 129 run JSON files this document quotes) |
| fences | No tracked source edited in the checkout. `git apply`, the plants and the restores touched only the seat worktree. The only git writes were `git worktree add` and `git worktree remove --force`, and `.claude/worktrees/bl/D4/p7/D4-Dp-crit/` (18 MB of builds) was deleted before return. The only checkout writes are this file and `D4-Dp-crit/`. No sibling repo was read. **Slips, reported:** (1) the seat's first command read the last line of `~/.claude/guard/log/zone.log` (zone count `inuse=297097`), and a later progress check ran `ls ~/.claude/guard/` with its output discarded. Both were reads against the `~/.claude` fence. (2) A `ps` listing printed guard command lines that name `~/.claude/shell-snapshots/` paths, which were not opened. No measurement rests on any of them |

Citations: `FV6` is `FLOOR-V6.md`; `H7` is `H7.md`; `D′c6` is `../pass-6/D4-Dp-critique.md`; `crit/` is `D4-Dp-crit/`. "A · B" is Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every pass-7 number reproduced, in both engines.**
   - Migrated arm: T-1 15/15 · 18/18; T-2 52/52 · 52/52 (also on `dist` and `dist-dev`); T-3 40/43 · 40/43; T-4 24/24 · 24/24; T-5 38/38 · 38/38 (also on `dist`); T-6 **33/33 · 33/33** (the hover-light cells that caught run 1); T-7 24/24 · 24/24; T-8 27/27; W-D 8/8 · 8/8.
   - **FACT 80/80 on `src`, `src-dev` and, new, `dist`**, in both engines. H7-1, H7-2 and H7-3 all pass.
   - SHEET 2/2. CANON clean 4/4, every plant at FV6's tallies. ATTACK 5/5 (`dist` 3/3). CORNER 5/5 (`dist` 5/5). REPORT `name-ink` and `kick-spring` PASS. XSCRIPT 19/19.
   - Units: clean 65/65; the whole suite ran 2,354 cases with HEAD's 3 `boot-graph` failures.
2. **`crit-foreign-writer` now fails** (FV6-1 case 1, 64/65), as do all 25 pass-6 and FV6 plants. B-1's cure lands in both halves: SHEET names the writer, and FACT `foreign-ancestor` drops to 76/80 in both engines.
3. **Under O-103's rulings, four owner rows close on this seat's measurement: R-1, R-8, G and E-4.** T-3 and E-2 stay open on **one** cell, T-3 `c1-migrated` (light, dark, PRT, both engines): the selected C1 pill has no carrier at 3:1 (0.00 px² against 224).
   - Q-10 (b) is ruled, but the sheet's own reading of (b) leaves two cures, and neither is built: C1 declares `shape="cell"` (measured here: T-3 migrated **43/43** in both engines, and C1 becomes a 184×67 two-row card), or T-3 reads (b)'s pill co-carriers.
   - Nothing on this checklist is open on a default any more.
4. **Score: 38 / 40 (95 %).** Open: T-3 and E-2, on the same cell. **Verdict: ADVANCE**, not CONVERGED.
5. **Three more spellings of a second tile writer pass SHEET and FV6-1** (§4.1): `--selection-tile: var(--card-tile, flush)` in a sheet, a static `style="--selection-tile: plated"` in a `.vue` template, and a `setProperty("--selection-tile", on ? "flush" : "none")` in `.ts`. FACT's paint half catches the first (76/80); nothing reads the other two. None exists in `src`, so R-10 stays met. They go to the backlog.

---

## 1 · Re-run

`logs/chain.log` holds the order: state, SHEET, the SHEET plants, libbuild, tsc, the builds, the plant builds, the suite, the unit plants, the bundle, the R-3 plant, XSCRIPT, the Chromium battery, reads and film, then WebKit holds A and B.

### 1.1 · The battery (`dp-src`; `dp-dist` and `dp-dist-dev` where named)

| witness | migrated A · B | whole A · B | logs |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 20/42 · 23/45 (library 5/27) | `battery-src-chromium.log`, `src-T-1-webkit.log` |
| T-2 `src` · `dist` · `dist-dev` | — | **52/52** on each, both engines | `battery-*`, `dist-t2-*`, `distdev-t2-*` |
| T-3 | **40/43 · 40/43** (C1 ×3) | 42/85 · 42/85 (library 2/39) | `src-T-3-webkit.log` |
| T-4 | **24/24 · 24/24** | 36/54 · 36/54 | |
| T-5 `src` · `dist` | **38/38** on each, both engines | 87/116; `dist` 88/117 | `dist-t5-*` |
| T-6 | **33/33 · 33/33** | 64/88 · 64/88 | |
| T-7 | **24/24 · 24/24** | 24/24 | |
| T-8, one run | **27/27** | 27/39 (+13 unmeasured: library 0/12; real Safari 1) | `src-T-8-both.log` |
| W-A · W-B · W-C · W-D | — | 5/9 · 9/25 · 0/8 · **8/8**, both engines | |
| W-E `src` · `dist` · `dist-dev` | — | 1/3 · 1/6 · 1/6, both engines | §2.2 |

Every tally equals `FV6` §3 and `D′c6` §1.1 cell for cell. T-6's migrated arm is whole in both engines, including the nine `hover light channel` cells that FV6's run-1 spelling lost.

**C1 under T-3** (`src-T-3-webkit.log`): the selected pill, 184×40, has a carrier ≥ 3:1 of **0.00 px²** against 224 in light, dark and PRT. Its fill reads 1.21 · 1.20 · 1.00:1 (the PRT level-0 path paints no fill difference). Under forced colours, info-pass, it reads 391 px².

### 1.2 · H7's, H6's and H5's cells

Chromium is `logs/h-*-chromium.log` (one hold, 23:40 → 00:03, load 13.7-33.9). Playwright WebKit is hold B, `logs/h-*-webkit.log`.

| cell | Chromium · Playwright WebKit | `FV6` |
|---|---|---|
| **SHEET** `writers` · `wrap` (engine-free) | **PASS** (the route's rule 1×) · **PASS** `MIGRATION.md:94-116` | the same |
| **FACT** `src` · `src-dev` · `dist` | **80/80 · 80/80 · 80/80**, both engines | 80/80 (no `dist` read) |
| H7-1 `foreign-ancestor` ×4 | PASS: `ca` 89.63×40.00, `cb` 106.17×40.00, 20 px used (h/2) | the same |
| H7-2 `strip-write` ×4 (gating) | PASS: the floor's sentence reads "pills unless a rule of yours writes the fact on the strip", and the write lands | the same |
| H7-3 `mobile-in-tile` ×4 | PASS: root 40.00 against 40.00, one row, the reference trigger's plate | the same |
| H7's probe `b3-mobile` (info) | the trigger's children = the reference's, light and dark: label @13.00,9.30 17.86×21.41 (`flow-root` · `-webkit-box`), chevron `block` @51.00,12.00 | the same |
| **CANON** clean · `a` · `s` · `h` · `layer` · `foreign` · `unlayered` · `cq` · `lowlayer` · `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` | **5/5 · 3/3**, both engines | 5/5 |
| **CORNER** `src` · `dist` | **5/5 · 5/5**, both engines | 5/5 |
| **REPORT** `name-ink` | **PASS** light and dark, both engines: 28, 25, 23 and 233, 230, 226, the item's ink | PASS |
| REPORT `kick-spring` (H7-5) | **PASS**: `toggle-group-commit` 450 ms `linear(…)`. Chromium peak +0.0278 at 74.60 ms, dip −0.0045 at 303.20 ms. Playwright WebKit peak +0.0274 at 84.00 ms, dip −0.0045 at 306.00 ms. ζ ≈ 0.50 in both | the same |
| REPORT kick (B-5, reported) | FAIL **0.17 px** (104 frames) · **0.12 px** (79 frames), want ≤ 0.05 | 0.16 · 0.13 |
| REPORT `mark` | UNMEASURED (no mark; Q-3 (a) builds none) | the same |
| REPORT on an attack build | exit 2, naming the route build (by design) | — |
| **XSCRIPT** (engine-free) | **19/19** on the route against itself and against pass 6's F dir (`xscript-self.log`, `xscript-pair.log`) | 19/19 |

### 1.3 · Units and plants

H6's `unit.mjs`, config `vitest.wt.config.ts` `f70c44e4`. All plants ran in one guarded hold (23:17 → 23:19, load 29.3-38.5), and no plant left a restore mismatch.

| plant | result |
|---|---|
| clean (both files) | **PASS 65/65** |
| `canon-a`, `canon-s`, `canon-h`, `canon-i`, `no-writer` | each **FAIL** 1 (the canon case) |
| `split` | **FAIL** 2 (canon, R-10) |
| `guard-gone`, `stamp-gone` | each **FAIL** 1 (the shape case) |
| `pin-unbounded`, `pin-option-only`, `pin-gone`, `strip-reset-gone`, `limit-group-only` | each **FAIL** 1 (the sheet case) |
| `crit-sm-none` · `crit-lg-plated` | **FAIL** 2 · **FAIL** 1 |
| `crit-strip-flush` | **FAIL** 2: the sheet case and FV6-1 case 1 (the strip's `flush` is a second writer now) |
| `crit-limit-strip-only` | **FAIL** 1 |
| **`crit-foreign-writer`** (pass 6, verbatim: unlayered, before `@property`) | **FAIL 1: "every --selection-tile: flush \| plated in src is the lane sheet's one rule"**. It passed 63/63 in pass 6 |
| FV6's `foreign-writer`, `markup-writer`, `second-lane-writer` | each **FAIL** FV6-1 case 1 |
| FV6's `flush-rule-wide` | **FAIL** FV6-1 case 2 |
| **`crit-var-writer`** (this seat): `.card > .toggle-group { --selection-tile: var(--card-tile, flush) }` | **PASS 65/65** (§4.1) |
| **`crit-static-style`** (this seat): `style="--selection-tile: plated"` on ToggleGroup's root | **PASS 65/65** (§4.1) |
| **`crit-ts-ternary`** (this seat): `el.style.setProperty("--selection-tile", on ? "flush" : "none")` in `shape.ts` | **PASS 65/65** (§4.1) |

- **Whole suite** (`unit-all.log`): **2,354 ran, 2,351 passed, 3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own), 1 skipped.
- **vue-tsc**: 0 errors on both projects (`tsc.log`).
- **Library build**: exit 0.
- **Bundle** (`bundle.log`): **2,934,850 B** unpacked, 844 files; `dist` 2,542,071 B in 840 files; JS gzip-9 329,772 B. That is **+15,793** over the datum (2,919,057), and 2,510 B under pass 6's D′ (2,937,360), because Q-5 (b) drops the development names from what a consumer installs.

### 1.4 · Carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as before? |
|---|---|---|
| `fact-write` · `corner-gap` · `tile-geometry` · `pill-row` | 12/12 · 10/10 · 30/30 · 27/27, both engines | same |
| `scope-bound` | every form reads as expected, both engines (`none` 11/17, strip 4/9 on floor v4's form) | same |
| `states` states · hover · hover-f1 · a11y | 54/54 · 9/9 · 3/3 · 6/6, and 54/54 · 9/9 · 3/3 · 3/3 (WebKit a11y is contrast only) | same |
| `states` ink (reported) | K2 stroke and label 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT | same |
| `crit` x3 · x6 · tone · desc | 2/2 · 1/1 · 12/12 · 1/1, both engines | same |
| `crit-level` on `dp-src`, `dp-src-dev`, `dp-dist` | 12/12 each, both engines | same |
| `crit-p5` | 12/12 · 12/12 | same |
| `crit-ink` | 2/2 in Chromium. In Playwright WebKit 1/2: the light cell's 1 px canvas parses `--selection-ink` as rgb(0, 0, 0), while the same line prints name and stroke at rgb(28, 25, 23). This is `D′c5`'s documented artefact, and REPORT `name-ink` passes in that engine | same |
| `unmigrated` on `dist` | shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 · 24.86 px**; K1 one row, nothing cut | same |
| **R-3 plant** (`pop0`: the kick deleted, rebuilt, restored, `cmp`-checked) | T-6 64/88 → **44/88**, migrated 33/33 → **21/33**, both engines | same |

---

## 2 · The owner rows, scored on O-103's rulings

Each row below was open in pass 6 only because its input was unruled. O-103 ruled every input. Each is scored against the ruled bar, on this seat's runs. A row closes only where the row's own instrument reads what the ruling asks for.

### 2.1 · R-1 (Q-5 (b), Q-15 (a)): **met**

Q-15 (a) strikes R-1's legibility half. What remains is "its fault is named under the Q-5 ruling on `dist`". Under (b), that means refused by structure in production and named in the library's development build.
- **Refused by structure on `dist`.** Shipped K2 holds its 36.00 px rung: 3 content rows clipped, the pill one row tall (`probe-unmigrated-dist-*`). T-2 reads 52/52 on `dist` and on `dist-dev`. CORNER `dist` 5/5.
- **Named in development.** ATTACK `src-dev` 5/5 (X-5 named before ready) and FACT `src-dev` 80/80 (no cell names a pill a second row except where it should), both engines.
- **The installed library names nothing.** W-E `dist-dev` 1/6 reads "no refusal (no console error, no throw)", the same as `dist` (§2.2). The `import.meta.env.DEV` gate is dropped by the library build. That is (b) "only … not (d)", as ruled.

### 2.2 · R-8 (Q-5 (b)): **met**

"The refusal per Q-5 on `dist`, including the CX-1 class and late content." Under (b), the refusal is structural:
- T-2 52/52 on `dist` and `dist-dev`, including the late-content cells T-2's plants pin (`t2-mountonly`, `t2-cut` in H7's self-test);
- CORNER `dist` 5/5;
- ATTACK `dist` 3/3 (the CX-1 interactive-descendant class);
- FACT `dist` 80/80;

all in both engines.

W-E's three failing refusal cells on `dist` are its console-error bar ("a line added to item 0 → no refusal (no console error, no throw)"), which is Q-5 (a)'s refusal. Its other two failing cells are the unmigrated K2 and strip library scenes, which hold 3 and 2 content rows inside one rung. Under (b), W-E reads exactly what the ruling predicts. W-E is D4-E's witness (RETIRE), and it is library-arm and reported in every pass. Its reading moves no ruled bar.

### 2.3 · G (Q-2 (b), Q-3 (a)): **met**

`frames/`: `film.mjs --pair`, preset and specimen, light and dark, fine and coarse, both engines (16 stills; `pair.json`).

Read on the frames: tiles with 16 px corners on one card, so card-like (O-58's "more card like"). Unselected tiles are flush (no slab on the host's plate; Q-2 (b)). The selected tile carries a full-ink 1 px edge, a fill and weighted ink, so it is unmistakable without colour: the edge and the weight carry it, and T-3 migrated passes in PRT. On focus, the ring sits apart, a separate lighter outline a gap outside the edge. That is the two-outline look Q-3 (a) was asked about and the owner ruled. There is no lighting layer (O-87).

The commit carries state with weight and bounce: REPORT `kick-spring`, ζ ≈ 0.50, and the R-3 plant takes T-6 migrated to 21/33. T-1 (16 px at every rung, fine, coarse and `--ui-scale 1.25`) and T-4 (the ring whole) are green at every size.

The stills are md only, and no `sm` still was taken. The size half rests on T-1 and T-4.

### 2.4 · E-4 (the checkbox not granted): **met under the ruling**

O-103: "E-4 and every Safari cell are read against the darwin headless `guarded --exclusive webkit` run of record". Every witness, cell, probe and plant above gave a verdict in Playwright WebKit, and it equals Chromium's wherever the engines are compared (§1). The one difference is the reported kick, 0.17 · 0.12 px.

Real Safari stays **UNMEASURED (owner's safaridriver checkbox)**. Safari-only engine facts are reported, not gated:
- the pseudo-element style query re-match;
- `@container style()` on a registered property;
- `@scope` with a selector-list lower boundary;
- floor v6's `:where()` in a style-query rule, which is long baseline.

### 2.5 · T-3 and E-2 (Q-10 (b)): **open, on one cell: T-3 `c1-migrated` (light, dark, PRT; both engines)**

Q-10 (b) is "tiles only; pills keep ink and weight as co-carriers". The route's transcription keeps C1 a pill (`harness/sites.mjs` c1: "no declaration on either route (Q-10 (b))"). T-3 then reads 0.00 px² ≥ 3:1 against 224, with fill 1.21 · 1.20 · 1.00:1 (§1.1). E-2 lists C1 among its H-10 scenes and reads the same three cells.

The registry's own reading of (b), §P2-5 and §P5-5 row 2, is that it "leaves C1 RED, or C1 declares a tile". The ruling chose (b) and did not choose between those two.

- **The declaration, measured** (`crit-route/`: the same transcription with C1's group given `shape="cell"`). T-3 migrated reads **43/43 · 43/43**; C1 reads 933.50 · 946.50 · 937.75 px² against 251 (Chromium). T-4 24/24, T-5 38/38 and T-7 24/24 hold in both engines (`c1cell-*`).
  - The cost: C1's options become **184×67 two-row cards**, with the count below the label, from 184×40 one-row pills.
  - That turns a one-line status filter into a tile, against the role table's one-line → stadium row.
- **The other cure** is T-3 reading Q-10 (b)'s co-carriers (ink and weight) on a selected pill instead of the tile perimeter. That is a harness change, under a new hash.

Neither is built. So by this seat's own instrument T-3 and E-2 are open, and the cell that reads them is T-3 `c1-migrated` (H3/H5 battery, run here under H7). Choosing between the two cures is the agglomerate's placement, and the owner's if it is read as Q-10's remainder (§4.4).

---

## 3 · The attacks this seat added

### 3.1 · Three more spellings of a second writer (`crit-var-writer`, `crit-static-style`, `crit-ts-ternary`)

Each is a write the engine honours. Each is checked against both of B-1's static halves (SHEET, FV6-1) and, where a fixed composition reaches it, the paint half (`logs/sheet-plants.log`, `unit-plant-crit-*.log`, `h-fact-plant-var-*.log`):

| plant | SHEET `writers` | FV6-1 case 1 | FACT `foreign-ancestor` |
|---|---|---|---|
| FV6's foreign writer (control) | **FAIL** (1 OTHER, `base.css`) | **FAIL** | **FAIL**, 76/80 both engines (71.25×54.69, 16 px, 2 rows) |
| `var(--card-tile, flush)` on `.card > .toggle-group` | PASS (misses it) | PASS (misses it) | **FAIL**, 76/80 both engines, the same numbers |
| static `style="--selection-tile: plated"` in `ToggleGroup.vue` | PASS (misses it) | PASS (misses it) | no fixed composition |
| `setProperty("--selection-tile", on ? "flush" : "none")` in `.ts` | PASS (misses it) | PASS (misses it) | no fixed composition |

The cause is one regex in both instruments, `sheet.mjs:61` and FV6-1's twin:
- a sheet write counts only when its value is exactly `flush` or `plated`;
- a markup or script write counts only when a quote sits right before the value.

### 3.2 · Q-10 (b)'s one D′ answer

See §2.5. `crit-route/migrated.mjs` is one string change on the route's own transcription. It throws if the change does not land.

---

## 4 · For the owner's sheet and the execution backlog (no H7, H6 or H5 cell reads these; no score changes)

### 4.1 · B-1's static halves read two literal spellings

§3.1: an indirect sheet write (`var(…, flush)`), a static style attribute and a computed `setProperty` each pass SHEET and FV6-1. FACT catches the first, and only under a `.card` ancestor. No such writer exists in `src`: `rg` over the state finds only `styles.css:59`'s route rule (`logs/state.log`). **R-10 stays met.**

**Backlog, route-neutral:** SHEET and FV6-1 treat any `--selection-tile` declaration or write outside the lane sheet as a writer unless its value is `none` or `inherit`, rather than matching the two literal tile values. That one change catches all three.

### 4.2 · D′'s own sheet comment states the nesting rule a second time, and leaves out its exception

`toggle-group/styles.css:53-57`: "… and a group nested inside stays pills (every group resets the fact)." MIGRATION carries O-2's clause, "pills again unless it declares `shape="cell"`". A nested `shape="cell"` group is a tile (pass 6's `ct` read it), so the `src` sentence is incomplete. It is also a second statement of the one fact (P-3).

**Backlog, the route's:** drop the clause from the comment, or give it O-2's words. `FV6` §1.6 reported this and did not edit it. No cell reads comments in `src` except H7-2's `floorText`, which reads `base.css`.

### 4.3 · The mobile root in a tile option takes the tile's leading (info)

H7's probe (`probe-b3-*`) prints the mobile root in option `te` at font 15.3 px / line 22.95 px, against the reference root's 17.42 / 26.13. The root and trigger still measure 80.00×40.00, and the trigger's children sit exactly where the reference's do. Nothing visible differs, so this is reported only.

### 4.4 · Q-10 (b)'s remainder: C1

§2.5. The ruling picks "tiles only", and C1 is a one-line pill under it. The checklist still asks its selected state for a 3:1 carrier that (b) does not paint. **Owner's sheet** (or the agglomerate, if it reads this as harness work):
- (i) C1 declares `shape="cell"`. Measured: T-3 43/43 in both engines, at the cost of a 67 px two-row card.
- (ii) T-3 reads (b)'s pill co-carriers on C1, under a new harness hash.

This is the only input left between D′ and CONVERGED.

### 4.5 · Reported, unchanged

- **B-5:** kick 0.17 · 0.12 px against ≤ 0.05; the spring is named, ζ ≈ 0.50.
- **R-5:** the dark selected ink reads 1.56:1 against unselected; the perimeter carries the state.

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18; `tile-geometry` 30/30 (16.00 px at fine, coarse, `--ui-scale 1.25`) | met |
| T-2 | 52/52 · 52/52 on `src`, `dist`, `dist-dev` | met |
| T-3 | migrated 40/43 · 40/43; C1 0.00 px² against 224 in light, dark and PRT | **open: T-3 `c1-migrated`** (Q-10 (b) ruled; §2.5) |
| T-4 | 24/24 · 24/24 | met |
| T-5 | 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | 33/33 · 33/33 | met |
| T-7 | 24/24 · 24/24; XSCRIPT 19/19 | met |
| T-8 | 27/27, one run over both engines; real Safari UNMEASURED (E-4's, read under O-103) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| X-2 | REPORT `name-ink` PASS light and dark, both engines; XSCRIPT `shared ink` PASS | met |
| X-3 · X-4 · X-6 · X-7 | x3 2/2; V2 `type="multiple" shape="cell"` green on T-1, T-3; x6 1/1; tone 12/12; both engines | met |
| X-5 | ATTACK `src-dev` 5/5, `dist` 3/3; desc 1/1, both engines | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 · FV-3 | T-5, T-6 migrated green; the calm-observer commit in T-6 | met |
| **FV-2** | T-2 52/52 (`src`, `dist`, `dist-dev`); `pill-row` 27/27; FACT 80/80 on `src`, `src-dev`, `dist` including **H7-2 `strip-write` (gating) and H7-3 `mobile-in-tile`**, light and dark; the probe reads the trigger's layout as the reference's; both engines | met |
| FV-4 · FV-5 · FV-6 · FV-7 | tone 12/12; a11y 6/6 · 3/3; T-5 arrows on every migrated grid; ATTACK 5/5 · 5/5 | met |
| FV-8 | T-6 migrated PRT hover cells green (33/33) | met |
| FV-9 | `fact-write` 12/12; `crit-p5` 12/12 (`plated` one value away) | met |
| FV-10 | `guard-gone`, `stamp-gone` each fail the shape case | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | Q-15 (a) strikes legibility; refused by structure on `dist` (K2 one rung, T-2 52/52, CORNER 5/5); named in the library's development build (ATTACK `src-dev` 5/5); the installed library names nothing (W-E `dist-dev` = `dist`) | **met** (O-103; §2.1) |
| R-2 | FACT 80/80 on every flavour, H7-2 and H7-3 included; W-D 8/8 · 8/8; `crit-level` 12/12 per flavour | met |
| R-3 | the kick plant takes migrated 33/33 → 21/33 · 21/33 | met |
| R-4 · R-6 · R-7 | hover 9/9 · 9/9, F1 3/3; 16 px at coarse and 1.25, pills at h/2; CANON clean 4/4 with every plant failing, and the canon unit failing A, S, H, I | met |
| R-5 | K2 stroke 2.66:1 light, 1.56:1 dark (reported) | met, reported |
| R-8 | T-2 52/52 on `dist` and `dist-dev`, CORNER 5/5, ATTACK 3/3 (CX-1), FACT 80/80 on `dist`, both engines; W-E reads (b)'s prediction | **met** (O-103; §2.2) |
| R-9 | 2,934,850 B, +15,793 over the datum | met (the rebind is Q-14's) |
| **R-10** | SHEET `writers` PASS (the route's rule 1×); FV6-1 case 1 PASS clean and FAILS `crit-foreign-writer` and FV6's three writer plants; FACT `foreign-ancestor` fails both CSS plants, 76/80 both engines | met (§4.1's holes are coverage, not a writer in `src`) |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines | met |
| E-2 | F1, V2, the sibling state, the interactive descendant in production (ATTACK `dist` 3/3), the keyed reorder and the deselectable single are green; **C1** T-3 0/3 · 0/3 | **open: T-3 `c1-migrated`** (§2.5) |
| E-3 | SHEET `wrap` PASS at `MIGRATION.md:94-116`. Re-measured: the declaration (T-1, T-2, W-D), the write rows (FACT 80/80), O-2's nesting clause (FACT `nest` cells), the strip sentence (H7-2), the refusal (shape plants), CORNER 5/5. Q-5 (b)'s "the library you install logs nothing" is true (W-E `dist-dev` = `dist`). The MIGRATION detectors that remain are `rg` only | met |
| E-4 | read under O-103 against the Playwright WebKit run of record: every cell read; real Safari UNMEASURED (owner's safaridriver checkbox) | **met** (O-103; §2.4) |

### 5.6 · G

Frames in `frames/` (§2.3). **Met** on Q-2 (b) and Q-3 (a) as ruled.

### 5.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (cell T-3 `c1-migrated`) |
| X (7) | 7 | — |
| FV (10) | 10 | — |
| R (10) | **10** | — |
| E (4) | **3** | E-2 (cell T-3 `c1-migrated`) |
| G (1) | **1** | — |
| **total** | **38 / 40 (95 %)** | 2, one cell |

Against pass 6 (34/40), R-1, R-8, G and E-4 close on O-103's rulings and this seat's measurements. Nothing reopened. No row was added, struck or renamed. No row is scored PASS against its own instrument: C1's own T-3 cell is why T-3 and E-2 stay open.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** `logs/chain.log` ends `CHAIN-DONE`; both WebKit holds exited 0. Every plant's restore was checked (`git diff HEAD` `df9f391ec4dd` before and after). The worktree was removed with `git worktree remove --force`, and the seat's scratch directory was deleted. No browser, server or guard was left running.
