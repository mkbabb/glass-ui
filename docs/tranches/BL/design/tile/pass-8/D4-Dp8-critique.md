# D4 · pass 8 · D4-D′ v8 · critique: the declared cell under O-103c, on floor v6 and H8

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 8. Authored no D4 seat in any pass. Re-runs every number on HEAD + `floor-v6.patch` + `D4-Dp8.patch` in both engines. That covers the battery T-1..T-8 (T-3..T-7 in each engine), the shared attack set, H8's, H7's and H6's cells, H5's FACT matrix, SHEET, CANON, REPORT, the carried instruments, and the units with every plant. Attacks O-103c's condition and L-3. Scores the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged). Adds no row and picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `35951fc05`. `git diff --stat 78fc8f3b8 HEAD -- src package.json MIGRATION.md tests demo vite.config.ts` is empty, so this is the library the BUILD seat measured. Detached worktree `.claude/worktrees/bl/D4/p8/crit8/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v6.patch` sha1 **`09e74243`** (39 files, +1452 / −272), then `D4-Dp8.patch` **`b5f4ae22`** (8 files, +461 / −52), both `apply --check` clean. `git diff HEAD` read **`5d08df87ebbe`**, the BUILD seat's hash, with 27 dirty `src` paths (`D4-Dp8-crit/logs/state.log`). It read the same after every plant and before removal |
| owner | **INBOUND O-103c**, the delegate per O-102b: Q-10's remainder ruled **(i)**, "C1 declares shape=\"cell\"". The condition is that C1 is a cell in both states and selection changes no geometry. Every other ruling stands as O-102b/O-103 record it: Q-13 D′ (F struck); Q-10 (b)+(i); Q-5 (b) only; Q-15 (a); Q-2 (b); Q-3 (a); O-1 (a). **Q-11 (a) is a DEFAULT**; G (D4-G) stays BLOCK. The safaridriver checkbox is not granted, so E-4 is read against this seat's Playwright WebKit run (O-103) |
| harness | **H8 `4159e027cdcf`** (43 files, `rev` H8), unedited. Every witness, SHEET, UNIT and XSCRIPT line prints it |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell, no `channel`, no GPU arguments) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright` (1.61.1). Every WebKit number below is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. T-8's driver answered "You must enable 'Allow remote automation'" (`logs/src-T-8-both.log`) |
| machine | Every stage ran through `~/.claude/guard/guarded --rss-gb 8`. Only engine-free runs (SHEET, the typecheck, the bundle read, XSCRIPT) took `--light`; no browser run did. One heavy run at a time: `chain.sh` is serial. The `plant-builds` stage queued 31 min for guard admission (03:20 → 03:51, load 6.5-11). **Both Playwright WebKit holds ran under `--exclusive webkit`**: hold A waited **48 min 54 s** (04:36:32 → 05:25:26) and ran to 05:46:40; hold B waited **39 min 12 s** (05:46:40 → 06:25:52) and ran to 06:47:56. Neither wait was cancelled. Loads at stage starts and ends were 5.25-20.99 (`logs/chain.log`, and the first and last line of each log). No janky cell, no stall, no NOT-REPRODUCED line. Every tally read the same as the BUILD seat's at every load. The only numbers that moved are the reported kick and C1's size by viewport (§1.3) |
| records | `D4-Dp8-crit/`: `run-crit8.sh` (every stage), `chain.sh` (the order run), `probes/crit-c1-states.mjs` and `probes/crit-l3.mjs` (this seat's two attacks), `logs/` (every log cited, including `smoke-chromium.log`), `frames/` (G's glance pair on D′ v8: C1 and the preset, light and dark, both engines, 8 stills + `pair.json`), `run-json.tgz` (every run JSON quoted here) |
| fences | No tracked source in the checkout was edited. The patches, plants and restores touched only the seat worktree. The only git writes were `git worktree add` and `git worktree remove --force`. Checkout writes: this file and `pass-8/D4-Dp8-crit/`. No sibling repo was read. **Slip, reported:** one progress check ran `ls ~/.claude/guard/runs | wc -l`, a read against the `~/.claude` fence (it printed a count, 12). No measurement rests on it |

Citations: `BUILD` is `BUILD.md`; `H8` is `H8.md`; `D′c7` is `../pass-7/D4-Dp-critique.md`; `crit/` is `D4-Dp8-crit/`. "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every BUILD number reproduced in both engines.**
   - Migrated arm: T-1 15/15 · 18/18. T-2 52/52 on `src`, `dist` and `dist-dev`. **T-3 43/43 · 43/43**. T-4 24/24 · 24/24. T-5 38/38 · 38/38 (also on `dist`). T-6 33/33 · 33/33. T-7 24/24 · 24/24. T-8 27/27. W-D 8/8 · 8/8.
   - FACT 80/80 on `src`, `src-dev` and `dist`, both engines; 76/80 on each B-1 plant. CANON 4/4, with every plant at its tally. ATTACK 5/5 and 3/3. CORNER 5/5 and 5/5. REPORT `name-ink` and `kick-spring` PASS. XSCRIPT 19/19.
   - Units clean 67/67. The whole suite ran 2,356 cases with HEAD's 3 `boot-graph` failures. vue-tsc 0 · 0. Bundle **2,935,932 B**, the same byte count as `BUILD` §2.5.
2. **O-103c's condition holds under attack, in both engines.** C1 is a 16 px column cell in all 16 states this seat drove at 390×844 and at 1440×900, in light, dark and PRT. The states are real clicks on every option, hover on a rest and on the selected option, a held press, Tab focus-visible, and ArrowDown through every option.
   - The layout box of every option and of the group moves **0.00 px** in every state, against a 0.50 bar.
   - A ResizeObserver on all six boxes sees **0** size changes.
   - Chromium's Layout Instability API records **0** `layout-shift` entries.
   - Read on `src` and `dist`: CRIT-C1 18/18 measured cells per engine and build. Playwright WebKit's 6 layout-shift cells are UNMEASURED (§3.1).
   - The ring is whole on C1 at rest and selected (T-4: 2.00 px on every side).
3. **L-3 removes only the selected fill and the pill corner, and keeps every 3:1 carrier the library painted.** The check diffs every computed property of the rest option, the selected option and each one's `::before` (bare against reference), at rest, under hover and under focus. It ran in light, dark, PRT and `prefers-contrast: more` (forced colours info), on `src` and `dist`. The only differences are the four corner longhands (pill) and the selected `background-color`.
   - A `bare` tile keeps its 3:1 perimeter, 474-483 px² against a 138 px² bar.
   - A `bare` pill keeps the 3:1 perimeter wherever the library painted one (`prefers-contrast: more`: 364 px² against 99).
   - In normal contrast a pill has no 3:1 carrier with or without `bare` (0.00 px², fill 1.21:1 against 1.00:1), so `bare` removes none.
   - No alias exists: no other name, attribute or prop in `src` (`logs/state.log`).
   - The planted composition (the write on the option) fails, 20/32. Two alias and third-rule plants fail the L-3 unit.
4. **One coverage hole in L-1's widening (§3.3).** With the property name held in a constant, the write passes both of B-1's static readers. The plant is `export const TILE_FACT = "--selection-tile"; el.style.setProperty(TILE_FACT, "flush")`: SHEET PASS 2/2, the unit 67/67. No such writer exists in `src` (`state.log`: the route's rule and one `getPropertyValue` read), so **R-10 stays met**. It goes to the landing list as L-1a.
5. **Score: 40 / 40.** T-3 and E-2, pass 7's two open rows, close on this seat's own T-3 `c1-migrated` cell (943 px² · 942 px² against 251 in light, dark and PRT, both engines) under O-103c's ruling. O-103c's condition is read inside T-3/T-4 as the registry folds it. **Verdict: ADVANCE**, CONVERGED on the fixed list: 0 open rows, owner or otherwise. What stays owed is not a row (§4).

---

## 1 · Re-run

`logs/chain.log` holds the order. Phase 1 ran state, SHEET, the SHEET plants, libbuild, tsc, the builds (one hold), the plant builds, the suite, the unit plants, the bundle and XSCRIPT. Phase 2 ran the Chromium battery, the Chromium reads and probes, the Chromium glance pair, then WebKit holds A (battery) and B (reads, probes, glance pair).

### 1.1 · The battery (`dp8-src`; `dp8-dist` and `dp8-dist-dev` where named)

| witness | migrated A · B | whole A · B | `BUILD` |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 20/42 · 23/45 | the same |
| T-2 `src` · `dist` · `dist-dev` | — | **52/52** on each, both engines | the same |
| **T-3** | **43/43 · 43/43** | 45/85 · 45/85 | the same |
| T-4 | **24/24 · 24/24** | 36/54 · 36/54 | the same |
| T-5 `src` · `dist` | **38/38** on each, both engines | 87/116; `dist` 88/117 | the same |
| T-6 | **33/33 · 33/33** | 64/88 · 64/88 | the same |
| T-7 | **24/24 · 24/24** | 24/24 | the same |
| T-8, one run | **27/27** | 27/39 (library 0/12; real Safari UNMEASURED) | the same |
| W-A · W-B · W-C · W-D · W-E | — | 5/9 · 9/25 · 0/8 · **8/8** · 1/3, both engines; W-E `dist` · `dist-dev` 1/6 · 1/6 | the same |

Logs: `battery-src-chromium.log`, `src-*-webkit.log`, `src-T-8-both.log`, `dist-*`, `distdev-*`. Chromium loads were 7.63-19.45; Playwright WebKit hold A was admitted at 9.10.

**C1, cell by cell** (run JSON `T-3/T-4/T-5/T-7-{chromium,webkit}.json`, `run-json.tgz`):

| cell | Chromium | Playwright WebKit |
|---|---|---|
| T-3 light | 933.50 px² (band 873.75) vs 251.00 · fill 1.28:1 | 932.00 px² (871.00) · 1.28:1 |
| T-3 dark | 946.50 px² (883.50) · 1.30:1 | 942.25 px² (879.75) · 1.30:1 |
| T-3 PRT | 937.75 px² (877.25) · 1.28:1 | 934.50 px² (873.50), forced level-0 path · 1.28:1 |
| T-3 forced (info) | 11,821.75 px² · 11.31:1 | — |
| T-4 light, dark, forced; `sel=none` and `sel=1` | outline solid 2px, offset 2px; 2.00 px painted on every side, ×6 | the same, ×6 (Option+Tab) |
| T-5 | `radiogroup`/`radio`; 1 tab stop; ArrowRight, ArrowLeft, ArrowDown, ArrowUp each move and check | the same |
| T-7 | rest, on, focus, hover: no consumer paint against the stripped twin | the same |

The selected option is 184×67 at the harness's 1000×900 viewport. Its fill alone is 1.28-1.30:1 (reported, not gating). The edge carries the state.

### 1.2 · H8's, H7's, H6's and H5's cells

Chromium ran in one hold (04:15:43 → 04:36:21, load 5.85-20.99). Playwright WebKit ran in hold B.

| cell | Chromium · Playwright WebKit | `BUILD` |
|---|---|---|
| **SHEET** self-test (engine-free) | **10/10 OK**, including `sh-var`, `sh-static`, `sh-ternary` FAIL and the `sh-reads` control PASS | the same |
| **SHEET** on D′ v8 | **PASS 2/2**: `writers` (the route's rule 1×, no other writer); `wrap` `MIGRATION.md:94-116` | the same |
| SHEET plants `foreign` · `var` · `static` · `ts` | **FAIL 1/2** each, naming the OTHER writer (`sheet-plants.log`) | the same |
| SHEET plant **`const`** (this seat) | **PASS 2/2: misses it** (§3.3) | — |
| **FACT** `src` · `src-dev` · `dist` | **80/80 · 80/80 · 80/80**, both engines | the same |
| FACT plants `foreign` · `var` | **76/80** each, both engines (`foreign-ancestor` ×4: 71.25×54.69, 16 px) | the same |
| **CANON** clean · `a` · `s` · `h` · `layer` · `foreign` · `unlayered` · `cq` · `lowlayer` · `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` | **5/5 · 3/3**, both engines | the same |
| **CORNER** `src` · `dist` | **5/5 · 5/5**, both engines | the same |
| **REPORT** `name-ink` | PASS light and dark, both engines (28, 25, 23 and 233, 230, 226) | the same |
| REPORT `kick-spring` | PASS, both engines | the same |
| REPORT kick (B-5, reported) | FAIL **0.16 px** (102 frames) · **0.13 px** (79 frames), want ≤ 0.05 | 0.14 · 0.14 |
| REPORT `mark` | UNMEASURED (Q-3 (a): no mark) | the same |
| H7's probe `b3-mobile` (info) | the trigger's children are the reference's, light and dark, both engines. It prints `B3PROBE FAIL · 0/0` because it has no gating cell, and every cell reads info-pass | the same |
| **XSCRIPT** self · pair with pass 7's D′ | **19/19 · 19/19** | the same |
| BUILD's `c1-box` on `dp8-src` · `dp8-dist` | **6/6 · 6/6**, both engines | the same |
| BUILD's `l3-bare` on `l3-src` · `l3-dist` · `l3-plant-on-item-src` · `l3-unpinned-src` | **12/12 · 12/12 · 8/12 · 10/12**, both engines | the same |

### 1.3 · Carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as `D′c7`? |
|---|---|---|
| `fact-write` · `corner-gap` · `tile-geometry` · `pill-row` | 12/12 · 10/10 · 30/30 · 27/27, both engines | same |
| `scope-bound` | every form as expected, both engines (`option` 15/17 FAIL as expected, `crit` 17/17, `none` 11/17 as expected; strip 4/9 info) | same |
| `states` states · hover · hover-f1 · a11y | 54/54 · 9/9 · 3/3 · 6/6, and 54/54 · 9/9 · 3/3 · 3/3 (WebKit a11y is contrast only) | same |
| `states` ink (R-5, reported) | K2 stroke and label 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT; the strip 3.23 · 2.06 · 3.23 | same |
| `crit` x3 · x6 · tone · desc | 2/2 · 1/1 · 12/12 · 1/1, both engines | same |
| `crit-level` on `dp8-src`, `dp8-src-dev`, `dp8-dist` | 12/12 each, both engines | same |
| `crit-p5` · `crit-ink` | 12/12 · 12/12; 2/2 Chromium (WebKit: `D′c5`'s documented 1 px canvas artefact on the light cell; REPORT `name-ink` passes) | same |
| `unmigrated` on `dist` | shipped K2 207.00×36.00, 3 rows, CUT 4 boxes up to 24.64 · 24.86 px; K1 one row | same |
| **R-3 plant** (`pop0`: the kick deleted, rebuilt, restored; `plant-builds.log` restore equal) | T-6 64/88 → **44/88**, migrated 33/33 → **21/33**, both engines | same |

### 1.4 · Units, types, bundle

All plants ran without a `-t` filter, so each runs both route files whole (67 cases). Every plant's restore was checked by `unit.mjs`, and every run reads `git diff HEAD` `5d08df87ebbe` after.

| plant | result |
|---|---|
| clean | **PASS 67/67** |
| `canon-a`, `canon-s`, `canon-i` · `canon-h` | FAIL 2 each · FAIL 1 |
| `split` · `no-writer` | FAIL 4 · FAIL 2 |
| `guard-gone`, `stamp-gone` | FAIL 1 each (the shape case) |
| `pin-unbounded` · `pin-option-only` · `pin-gone` · `strip-reset-gone` · `limit-group-only` | FAIL 3 · 2 · 1 · 1 · 2 |
| `crit-sm-none` · `crit-lg-plated` · `crit-strip-flush` · `crit-limit-strip-only` | FAIL 2 · 3 · 2 · 2 |
| FV6's `foreign-writer` · `markup-writer` · `second-lane-writer` · `flush-rule-wide` | FAIL 1 · 1 · 2 · 1 |
| **L-1:** `crit-foreign-writer` · `crit-var-writer` · `crit-static-style` · `crit-ts-ternary` | **FAIL 1 each**: "every --selection-tile write other than none \| inherit in src is the lane sheet's one rule" |
| control `ctl-reads` | **PASS 67/67** |
| **`crit-const-name`** (this seat) | **PASS 67/67: misses it** (§3.3) |
| **L-3:** `l3-pin-gone` · `l3-reset-gone` · `l3-tint-loose` · `l3-library-writer` | FAIL 2 · 2 · 1 · 1 |
| **`crit-l3-alias`** (this seat): a second opt-out spelled `@container style(--toggle-group-bare: 1) { [data-state="on"] { background-color: transparent; border-radius: 0 } }` | **FAIL 2** (the canon case and the L-3 sheet case) |
| **`crit-l3-third-rule`** (this seat): a third rule under `not style(--selection-paint: bare)` | **FAIL 1** (the L-3 sheet case) |

- **Whole suite** (`unit-all.log`): 2,356 ran: 2,353 passed, **3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own; no `dist-demo` in a worktree), 1 skipped.
- **vue-tsc**: 0 · 0 (`tsc.log`).
- **Library build**: exit 0.
- **Bundle** (`bundle.log`): **2,935,932 B** unpacked, 844 files; `dist` 2,542,357 B in 840 files; JS gzip-9 329,772 B. That is +16,875 over the datum (2,919,057).

---

## 2 · The two rows pass 7 left open: T-3 and E-2, under O-103c

### 2.1 · The ruling, and where it is built

O-103c rules Q-10's remainder (i): C1's `<ToggleGroup>` declares `shape="cell"`. D′ v8 builds it as the consumer-site declaration, in the pass-8 route's transcription (`routes/D4-Dp8/migrated.mjs`). That is the same one-string change `D′c7`'s `crit-route/` measured. The library is untouched by it, and XSCRIPT reads it as a declaration only (pair 19/19).

### 2.2 · T-3 `c1-migrated`, on this seat's own instrument

C1's selected option carries ≥ 3:1 pixels of 933.50 · 932.00 px² (light), 946.50 · 942.25 (dark) and 937.75 · 934.50 (PRT), against a 251.00 px² bar, Chromium · Playwright WebKit (§1.1). In pass 7 these cells read 0.00 px². **T-3 migrated reads 43/43 · 43/43.** E-2 lists C1 among its H-10 scenes and reads the same three cells. **T-3 and E-2 are met.**

### 2.3 · O-103c's condition, folded into T-3/T-4, attacked (`crit-c1-states.mjs`)

The condition: "C1 is a cell in BOTH states; selection must not change its geometry (no layout shift)". The registry folds it into T-3/T-4 as "C1's box identical rest vs selected, ±0.5 px, both engines".

`BUILD` §2.1 read it on model writes only, at the one 1000×900 viewport. This seat drove C1 by real input, at the viewports the task names, on `dp8-src` and `dp8-dist`:
- 16 states per run: rest; a real click on each of the 5 options; hover on a rest and on the selected option; a held press on a rest option; then the press released; Tab focus-visible on the selected option; and ArrowDown through every option;
- 390×844 and 1440×900, each in light, dark and PRT.

| cell | Chromium `src` · `dist` | Playwright WebKit `src` · `dist` |
|---|---|---|
| cell-every-state (16 px, `column`, every option, every state) | **6/6 · 6/6** | **6/6 · 6/6** |
| no-shift (max layout deviation, every option and the group, every state) | **0.00 px** ×6 · ×6 | **0.00 px** ×6 · ×6 |
| resize-observer (size changes after the initial entries) | **0** ×6 · ×6 | **0** ×6 · ×6 |
| layout-shift (entries, sum, input-driven included) | **0 entries, 0.00000** ×6 · ×6 | **UNMEASURED**: no Layout Instability API (§3.1) |

- C1's boxes depend on the viewport, because the type is fluid, and selection does not change them. At 390×844 the options are 184×40 ("Any status", one row) and 184×56 ×4, in a 192×288 group. At 1440×900 they are 184×43 and 184×71 ×4, in a 192×367 group. At the harness's 1000×900 they are 184×40.94 and 184×67.88 (`BUILD`).
- T-4 reads the ring whole on C1 at rest and selected, 2.00 px on every side, in light, dark and forced colours, both engines (§1.1).
- `BUILD`'s own `c1-box` reads 6/6 on `src` and `dist`, both engines (0.00 px).

**The condition holds.** C1 is a cell at rest and selected, and no interaction moves a box.

### 2.4 · What (i) costs, read on the frames

`frames/c1-{light,dark}-fine-{chromium,webkit}-pair.jpg`: C1 is a column of 16 px cards with the count under the label. The selected card carries a full-ink 2 px perimeter, a fill and weighted ink. The focused-selected frame puts the ring a gap outside the perimeter. "Any status" holds one row, so its card is shorter than the four two-row cards. That is the ruled cost: (i) turns a one-line filter into cards, as `D′c7` §2.5 measured and O-103c accepted.

---

## 3 · The attacks this seat added

### 3.1 · O-103c by real input (`crit-c1-states.mjs`), and a slip in this seat's own probe

§2.3 gives the readings. **Slip:** the first run counted Playwright WebKit's `layout-shift` cell as PASS on 0 entries. WebKit has no Layout Instability API, and `PerformanceObserver.observe({ type: "layout-shift" })` does not throw there, so the 0 was vacuous. The probe now asks `PerformanceObserver.supportedEntryTypes` first and reads UNMEASURED in that case. The file under `crit/probes/` carries the fix. The WebKit cells were not re-run, because the fix changes no reading, only the label. This document reports those 6 cells as UNMEASURED. WebKit's shift evidence is the layout-box read (0.00 px) and the ResizeObserver (0), both of which measure.

### 3.2 · L-3: only the fill and the corner; the carrier kept (`crit-l3.mjs`)

`BUILD`'s `l3-bare` reads the inner fill and the corner, light and dark. This seat asked the task's three questions on the same compositions (`routes/L3`), on `l3-src` and `l3-dist`.

**(1) It removes only the item's selected fill and pill radius.** For pill and tile, `bare` was compared against the reference group: every computed property of the rest option `a`, the selected option `b`, and each one's `::before` (the perimeter layer). This was done at rest, with the pointer on `b`, with the pointer on `a`, and with keyboard focus on `b`.

| cell | light · dark · PRT · contrast-more, both engines, `src` and `dist` |
|---|---|
| only-fill-radius-pill | PASS ×4 ×2 ×2: only the four corner longhands (9999px → 0px) and `b`'s `background-color` differ. A `bare` `b` paints the same as `a` (`rgba(0, 0, 0, 0)`) |
| only-fill-radius-tile | PASS ×4 ×2 ×2: only `b`'s `background-color` differs. The corner stays 16px |
| hover-{pill,tile} | PASS: the selected hover tint (16 %) goes, and so does nothing else. The rest hover is the reference's |
| focus-{pill,tile} | PASS: focus-visible on both; the ring (solid 2px, offset 2px, the same colour and shadow) is the reference's. A `bare` pill's ring follows its 0px corner |

**(2) The 3:1 selection carrier stays where the library painted one.** This is T-3's own read (`measure.compare`, ≥ 3:1 pixels against half the perimeter) on `b` against `a`, content hidden:

| mode | pill ref · bare (bar 99 px²) | tile ref · bare (bar 138 px²) |
|---|---|---|
| light | 0.00 · 0.00 px² (fill 1.21 · 1.00:1): neither carries | 486.00 · 474.25 px² (Playwright WebKit 483.75 · 478.25) |
| dark | 0.00 · 0.00 (1.22 · 1.00:1) | 494.50 · 483.25 |
| PRT | 0.00 · 0.00 (1.00 · 1.00:1) | 486.00 · 474.25 |
| `prefers-contrast: more` | 290.00 · **364.00** px² (the perimeter switches on for pills) | 486.00 · 474.25 |
| forced (info) | 1,945 · 2,204 px², fill 11.45 · 11.31:1 (Chromium; Playwright WebKit 128.50 · 156.00 px²) | 4,337.50 · 4,261.50 |

- A tile keeps its perimeter under `bare`, in every mode and both engines.
- A pill carries a 3:1 edge only where the floor paints one (`prefers-contrast: more`, forced colours), and `bare` keeps it there.
- In normal contrast a pill has no 3:1 carrier with or without `bare`. That is Q-10 (b)'s ruled pill, whose carriers are ink and weight, and `bare` keeps both (`l3-bare` state cell: weight 600, `--selection-ink` unchanged).
- So `bare` removes no carrier the library painted, and E-2's "no masking fallback" is not touched.
- Nothing fails loud when a consumer writes `bare` and paints nothing on a pill. That consumer gets exactly Q-10 (b)'s pill without its 1.2:1 tint, which was never a carrier. O-94a's consumer (keyframes' catalogue tiles) paints its own ink and ring.

**(3) No alias.**
- `state.log`: `src` holds no second name, attribute or prop for the paint fact. The four `bare` hits are other components' unrelated props (`MusicStaff`, `EasingPicker`).
- `ToggleGroup`'s only new prop is `shape`.
- The L-3 unit fails a planted second opt-out (`crit-l3-alias`, FAIL 2) and a third rule under the query (`crit-l3-third-rule`, FAIL 1).

**The planted composition** (`l3-plant-on-item-src`, the write moved to each option) fails CRIT-L3 at **20/32** in both engines: every `only-fill-radius` and `hover` cell names the tint and the stadium that stayed.

The unpinned library (`l3-unpinned-src`) passes CRIT-L3 32/32. That is expected, because CRIT-L3 reads no item-write case. `l3-bare`'s `item-write` is the cell that fails it (10/12).

**Reported, not L-3's:** in forced colours, Chromium, hovering the selected option of an `auto` group computes the 16 % tint over the forced `Highlight` background. `b` reads `rgba(255, 255, 255, 0.16)` under the pointer against `rgba(5, 0, 73, 0.8)` at rest, because the tint's `:hover` rule outranks the forced-colours `background: Highlight`. The perimeter still carries the state (forced T-3 is 11,821 px² on C1). It is the floor's, pre-dates L-3, and the forced arm is reported, not gated (PORTFOLIO §2.5). A `bare` group keeps `Highlight` on hover.

### 3.3 · L-1a: a fifth writer spelling passes both static readers (`crit-const-name`)

```ts
export const TILE_FACT = "--selection-tile";
export const writeTile = (el: HTMLElement) => el.style.setProperty(TILE_FACT, "flush");
```

This is a write the engine honours, and the property name sits in a constant, as a later wave might spell it. **SHEET PASS 2/2** (`sheet-plants.log`, "1 write(s) found … no other writer"). **The unit twin PASSES 67/67** (`unit-plant-crit-const-name.log`). FACT reaches it only if a composition calls the helper, and none does.

- **Why both miss it:** both regexes require `:` or `,` right after the name (`harness/sheet.mjs:77`; `ToggleGroup.test.ts:704` in the patched tree), and here the name is followed by `";`.
- **R-10 stays met.** `src` holds no such writer: `rg` finds the route's rule and `ToggleGroupItem.vue:148`'s `getPropertyValue("--selection-tile")` read, nothing else (`state.log`). This is a coverage hole of the same class `D′c7` §4.1 routed, not a writer.
- **Cure (landing, route-neutral, one change in each reader):** in `.ts`/`.vue` code, outside the lane sheet, count every string literal `"--selection-tile"` that is not the first argument of `getPropertyValue(`. A name held anywhere else is a writer candidate. Witness pair: `crit-const-name` must FAIL, and `ctl-reads` must still PASS.

### 3.4 · The transcription of record still says C1 has no declaration

`harness/sites.mjs:19` (H8, hashed) reads "c1 … one-row pills, no declaration on either route (Q-10 (b))". The ruled declaration lives only in `pass-8/routes/D4-Dp8/migrated.mjs`, so two records state C1's site, and they disagree (P-3).
- No cell moves: XSCRIPT reads the pair as a declaration only (19/19), and every C1 cell above ran on the ruled route.
- `BUILD` §1.1 and `H8` §5 name the cure, one line in `sites.mjs` under a new hash, and leave it to the critic. **This seat routes it to the landing** with L-1a's reader change, as one H9.

---

## 4 · For the registry (no H8, H7, H6 or H5 cell reads these; no score changes)

| id | class | placement | cure |
|---|---|---|---|
| **L-1a** | B-1's static readers miss a write whose property name is held in a constant (§3.3) | landing, route-neutral (R-10 holds: no such writer in `src`) | count every `"--selection-tile"` string literal outside the lane sheet that is not a `getPropertyValue` argument; witness `crit-const-name` FAIL, `ctl-reads` PASS |
| **L-4** | `sites.mjs` c1 contradicts O-103c (§3.4) | landing, with L-1a as one H9 | C1's `<ToggleGroup>` gains `shape="cell"` in the transcription; the pass-8 route dir then drops its override |
| info | L-3's paint witness is a pass-8 probe, not a FACT cell (`BUILD` §3): `l3-bare` 12/12, plants 8/12 and 10/12; CRIT-L3 32/32, plant 20/32; both engines | with the H9 above, if the registry wants it hashed | fold `l3-bare`'s six cells into FACT |
| info | forced colours: the `auto` selected-hover tint covers `Highlight` (§3.2) | floor, reported (§2.5's forced arm) | none required; the perimeter carries |
| info | C1's box size follows the viewport (184×56 at 390, 184×67.88 at 1000, 184×71 at 1440); selection moves none of them | reported | — |
| reported | R-5: dark selected ink 1.56:1 against unselected on K2; the perimeter carries | every pass | — |
| reported | B-5: the kick, 0.16 · 0.13 px (want ≤ 0.05); the spring is named, ζ ≈ 0.50 | floor-owned | — |
| owed, not a row | Q-14: the bundle datum rebind (2,935,932 B, +16,875) | release, the owner's | — |
| owed, not a row | Q-11 (a) DEFAULT; D4-G BLOCK | the owner's | — |
| owed, not a row | real Safari: UNMEASURED (owner's safaridriver checkbox) | E-4 met under O-103 | the owner runs it whenever they choose |

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18; `tile-geometry` 30/30 · 30/30 | met |
| T-2 | 52/52 on `src`, `dist`, `dist-dev`, both engines | met |
| **T-3** | migrated **43/43 · 43/43**; C1 933.50 / 946.50 / 937.75 px² (Chromium) and 932.00 / 942.25 / 934.50 (Playwright WebKit) against 251; the no-shift condition 0.00 px in every state and viewport, both engines (§2.3) | **met** (O-103c (i); was open in pass 7) |
| T-4 | 24/24 · 24/24; C1 ring 2.00 px every side at rest and selected; C1's box identical rest vs selected, 0.00 px | met |
| T-5 | 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | 33/33 · 33/33 | met |
| T-7 | 24/24 · 24/24; XSCRIPT 19/19 | met |
| T-8 | 27/27, one run over both engines; real Safari UNMEASURED (E-4's, under O-103) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| X-2 | REPORT `name-ink` PASS light and dark, both engines; XSCRIPT shared ink PASS | met |
| X-3 · X-4 · X-6 · X-7 | x3 2/2; T-1 and T-3 green on V2 (`type="multiple" shape="cell"`); x6 1/1; tone 12/12; both engines | met |
| X-5 | ATTACK `src-dev` 5/5, `dist` 3/3; desc 1/1; both engines | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 · FV-3 | T-5, T-6 migrated green | met |
| **FV-2** | T-2 52/52 (three flavours); `pill-row` 27/27; FACT 80/80 on `src`, `src-dev`, `dist` (H7-2, H7-3 included); **L-3** (folds here): CRIT-L3 32/32 on `src` and `dist` and `l3-bare` 12/12, both engines, with the item-write plant failing (20/32, 8/12) and the unpinned library failing `item-write` (10/12) | met |
| FV-4 · FV-5 · FV-6 · FV-7 | tone 12/12; a11y 6/6 · 3/3; T-5 arrows on every migrated grid; ATTACK 5/5 · 5/5 | met |
| FV-8 | T-6 migrated PRT hover cells green (33/33) | met |
| FV-9 | `fact-write` 12/12; `crit-p5` 12/12 | met |
| FV-10 | `guard-gone`, `stamp-gone` each fail the shape case | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | refused by structure on `dist` (K2 one rung, CUT 4 boxes; T-2 52/52; CORNER 5/5); named in development (ATTACK `src-dev` 5/5); W-E `dist-dev` 1/6 = `dist` | met (O-103) |
| **R-2** | FACT 80/80 per flavour; W-D 8/8 · 8/8; `crit-level` 12/12 per flavour; **L-3** (folds here): the paint fact is the group's (reset by every group, pinned on the option); an ancestor and an option write have no effect (`l3-bare` `ancestor`, `item-write`) | met |
| R-3 | the kick plant takes migrated 33/33 → 21/33 · 21/33 | met |
| R-4 · R-6 · R-7 | hover 9/9 · 9/9, F1 3/3; 16 px at coarse and 1.25, pills at h/2; CANON 4/4 clean with every plant failing; the canon unit fails A, S, H, I | met |
| R-5 | K2 stroke 2.66:1 light, 1.56:1 dark (reported) | met, reported |
| R-8 | T-2 52/52 on `dist`/`dist-dev`, CORNER 5/5, ATTACK 3/3, FACT 80/80 on `dist`, both engines | met (O-103) |
| R-9 | 2,935,932 B, +16,875 over the datum | met (the rebind is Q-14's) |
| **R-10** | SHEET `writers` PASS (the route's rule 1×); **L-1** (folds here): SHEET and the unit twin each FAIL `crit-foreign-writer`, `crit-var-writer`, `crit-static-style`, `crit-ts-ternary`, and PASS `ctl-reads`; FACT fails both CSS plants 76/80, both engines. `crit-const-name` passes both readers (§3.3), but `src` holds no such writer | met (L-1a is coverage, not a writer in `src`) |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines. The one engine-absent API (Layout Instability, Playwright WebKit) is labelled UNMEASURED, and the same property is read there by layout box and ResizeObserver | met |
| **E-2** | F1, V2, the sibling state, the interactive descendant in production (ATTACK `dist` 3/3), the keyed reorder and the deselectable single are green; **C1** T-3 3/3 · 3/3 | **met** (O-103c; was open in pass 7) |
| E-3 | SHEET `wrap` PASS at `MIGRATION.md:94-116`. Every claim in the `--selection-paint` bullet is read: `auto` on every group; `bare` turns off the tint and the stadium and nothing else (CRIT-L3 `only-fill-radius`); state, keys, roving, ink, weight (`l3-bare` state); a tile's corner and perimeter (CRIT-L3 `carrier-tile`); an ancestor or an option has no effect (`l3-bare`). O-2's clause is now the one statement of the nesting rule (L-2; `state.log`: `styles.css:84` names the mechanism, not the outcome) | met |
| E-4 | read under O-103 against this seat's Playwright WebKit run: every cell read; real Safari UNMEASURED (owner's safaridriver checkbox) | met (O-103) |

### 5.6 · G

`frames/` (§2.4; preset and C1, light and dark, fine, both engines; `D′c7`'s 16 stills cover coarse and the specimen):
- card-like: 16 px cards, C1 included;
- unselected tiles flush (Q-2 (b));
- the selection is unmistakable without colour (the perimeter and the weight; T-3 passes in PRT);
- the ring sits apart from the perimeter on focus (Q-3 (a));
- no lighting layer;
- the commit carries state with weight and bounce (`kick-spring` ζ ≈ 0.50; R-3's plant).

**Met.**

### 5.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | **8** | — |
| X (7) | 7 | — |
| FV (10) | 10 | — |
| R (10) | 10 | — |
| E (4) | **4** | — |
| G (1) | 1 | — |
| **total** | **40 / 40 (100 %)** | 0 |

Against pass 7 (38/40), T-3 and E-2 close on O-103c's ruling and this seat's own T-3 `c1-migrated` cell, with the condition read inside T-3/T-4. Nothing reopened. No row was added, struck or renamed. No row was scored PASS against its own instrument's reading. The L-1a hole and the `sites.mjs` record are coverage and record items, and neither is a writer or a cell that fails.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.**
- `logs/chain.log` ends `CHAIN-DONE` (06:47:56), and both WebKit holds exited 0.
- Every plant's restore was checked: `git diff HEAD` read `5d08df87ebbe` before and after, in `sheet-plants.log`, `plant-builds.log` and every unit log.
- The worktree was removed with `git worktree remove --force`, and `.claude/worktrees/bl/D4/p8/crit8/` (builds and run JSON) was deleted. The run JSON is kept as `crit/run-json.tgz`.
- No browser, server or guard was left running.
