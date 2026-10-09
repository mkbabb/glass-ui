# D4 · pass 3 · D4-D′ · critique: the declared cell, on floor v2

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 3. Did not author the route. Re-runs every number the prototype scores on, attacks the route's claims, and scores it on the fixed 40-row checklist (REGISTRY §P2-6.3) only. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `df9b9ef5`, in a detached worktree at `.claude/worktrees/bl/D4/p3/D4-Dp-crit/wt` (node_modules symlinked; removed before return). `floor-v2.patch` (sha1 `b04a83be…`) applied, then `D4-Dp-proto.patch` (sha1 `e7645ff2…`, byte-identical to `D4-Dp-spec/route.patch`: both hash the same). 36 files, +1110 / −276 over HEAD |
| harness | H3 `9fd4983bc6b9` in all 27 run JSONs (`run/dp-src/`), no MIXED flag (`logs/tally-crit-src.md`). Harness files unedited |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** (`run/dp-src/T-8-both.json`: "You must enable 'Allow remote automation' in the Developer section of Safari…") |
| sitting | One sitting, 2026-10-09 14:15 → 16:24. 1-min load 98 at the battery's start, 89-269 across the battery, peaking at 542 during the probes, 113-225 at the unit plants. Every log's first and last lines carry the 1 / 5 / 15-min load. No stall, no NOT-REPRODUCED, no engine failure; Playwright WebKit retired its browser 2× under H3-1's cap. Slowest timed cell: Playwright WebKit `preset-migrated` press, median frame 17.00 ms at load 157, a PASS; every commit cell passed, so no cell needed the janky-cell re-run |
| records | `pass-3/D4-Dp-crit/`: `run-crit.sh` (the prototype's driver, logs redirected here, `route/` read from `D4-Dp-proto/route/` unchanged, the `corner` step re-pointed at the prototype's probe); `run/dp-src/` (battery JSON), `run/dp-dist/`, `run/plant-pop0/`; `logs/`; `pair/` (H3-13 frames, re-filmed); `probes/fact-split.mjs` (this seat's one new probe), `probes/vitest.wt.config.mjs` and `probes/vitest.d4.config.mts` (the two vitest configs the spec's unit drivers assume beside the worktree and that no seat had banked); `shots/fact-split-{src,dist}/` |

Citations: `D′s` / `D′p` are `D4-Dp-spec.md` / `D4-Dp-proto.md`; `crit/` is `pass-3/D4-Dp-crit/`.

---

## 0 · In brief

1. **Every number the prototype scores on reproduced, cell for cell, at a heavier load.** Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 40/40 · 40/40, T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` 38/38 · 38/38), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run), W-D 8/8 · 8/8, CANON 3/3 · 3/3. The probes too: states 108/108, a11y 9/9, hover 18/18 + F1 6/6, tone 24/24, x3 4/4, x6 2/2, corner-refusal 10/10 on `src` and `dist`, corner-gap 20/20, names 4/4 per flavour, tile-fact mechanics 26/26, CANON plants A/S/H 2/3 each, unit plants A/S/H/V/W/P/I and G1/G2 each fail, 5/5 unit bites bite, R-3's kick plant 33/33 → 21/33 in both engines, bundle 2,933,655 B.
2. **One row the prototype scored met does not pass: R-10.** D′ spells "is a tile" twice, and the two spellings can disagree in paint:
   - `[data-shape="cell"]` owns the corner, column, pad and leading through a **descendant** selector;
   - the floor's tile fact `--selection-tile` owns everything else (the one-row law, the plate, the perimeter, the names). It is inherited, reset to `none` on every `.toggle-group`, and documented to consumers in MIGRATION.

   `probes/fact-split.mjs`: 8/20 cells agree on `src` and 8/20 on `dist`, in both engines (§2). A consumer who writes the documented `--selection-tile: plated` (or `flush`) on an undeclared group gets the **lozenge** N-9 names: 204×61.58, two rows, perimeter on, corner `9999px` → used 30.79 = 1.00×h/2. That is silent in production. And an undeclared pill group inside a `shape="cell"` group is a pill by its fact but wears the tile corner: 92.78×40, one row, 16 px = 0.80×h/2.
3. **Score: 33 / 40 (82.5 %).** The seven rows that do not pass are T-3, E-2 (Q-10), R-1, R-8 (Q-5), E-4 (checkbox), G (Q-2, Q-3), and R-10 (route-owned, with a cure inside the route).
   - R-1 is not owner-gated alone. Its legibility half fails on the route's measurements whatever Q-5 rules: shipped K2 is cut, 4 boxes up to 24.64 px (Chromium) and 24.86 px (Playwright WebKit), silent on `dist`.
4. **Verdict: ADVANCE.** One route-owned row is left, and it has a small in-route cure (§4). Every other open row is built at its owner default.

---

## 1 · Re-run: what reproduced

`crit/logs/battery-dp-src.log` (14:24 → 15:30), then `dist`, CANON plants, probes, plant, film, bundle and unit drivers to 16:24. The unmigrated and library columns match `D′p` §3 too.

| witness | engine | unmigrated | migrated | library | load at start |
|---|---|---|---|---|---|
| T-1 | Chromium · Playwright WebKit | 3/6 · 3/6 | **15/15 · 18/18** | 5/27 · 5/27, 12 UNMEASURED | 98.71 · 98.98 |
| T-2 | both | — | — | **40/40 · 40/40** | 92.91 · 89.25 |
| T-3 | both | 12/48 · 9/48 | **40/43 · 40/43** | 2/39 · 2/39, 12 UNMEASURED | 106.08 · 112.83 |
| T-4 | both | 3/24 · 3/24 | **24/24 · 24/24** | 12/30 · 12/30 | 124.69 · 147.14 |
| T-5 `src` | both | 20/37 · 20/37 | **38/38 · 38/38** | 49/78 · 49/78 | 149.82 · 162.36 |
| T-5 `dist` | both | 20/37 · 20/37 | **38/38 · 38/38** | 50/79 · 50/79 | `logs/battery-dp-dist-t5-*.log` |
| T-6 | both | 34/48 · 34/48 | **33/33 · 33/33** | 31/55 · 31/55 | 141.35 · 174.61 |
| T-7 | both | 4/32 · 4/32 | **24/24 · 24/24** | — | 185.85 · 141.79 |
| T-8 | one run | — | **27/27** | 0/12, 13 UNMEASURED | 154.77 |
| W-A · W-B · W-C · W-E | both | — | — | 5/9 · 9/25 · 0/8 · 1/3, identical | 85-269 |
| W-E `dist` | both | — | — | 1/6 · 1/6 | `logs/battery-dp-dist-we-*.log` |
| W-D | both | — | — | **8/8 · 8/8** | 166.36 · 235.67 |
| CANON | both | — | — | **3/3 · 3/3** | 257.45 · 249.53 |

Cells the score rests on, read from `crit/run/dp-src/`:
- **T-3, the misses:**
  - `c1-migrated` reads 22.50 px² (perimeter band 0.00) against 224 in light, dark and PRT, in both engines.
  - `preset-verbatim` (shipped K1, gating unmigrated) reads 0.00 / 233.00 / 0.00 px² against 248 in Chromium, and 0.00 / 217.00 / 0.00 in Playwright WebKit.
- **T-6, the commit:**
  - keyboard: peak 1.03 at 86 ms (Chromium) and 1.02 at 117 ms (Playwright WebKit);
  - calm-observer programmatic: 1.03 at 81 ms in both engines;
  - pointer: 1.04 at 120 / 93 ms;
  - each with a trough and a settle.
- **T-6, hover ΔE:** `preset-migrated` 0.0947 (PRM 0.0947, PRT 0.0332); `specimen-migrated` 0.0930 (PRT 0.0332); `f1-migrated` 0.0929. Bar 0.02.
- **R-3's plant** (`logs/build-dp-pop0-src.log`, `restored kick`): T-6 migrated 33/33 → **21/33 in both engines** (`logs/t6-pop0-*.log`, load 348-175). Every hover, press and Tab-entry cell still passes.
- **Unmigrated on `dist`** (`logs/probe-unmigrated-dist.log`, load 471): `preset-verbatim` 208.00×40.00, 1 row, nothing cut; `specimen-verbatim` 207.00×36.00, 3 rows, **CUT 4 boxes, up to 24.64 px**.
- **X-2 / R-5** (`logs/states-ink.log`): K2 stroke 2.66:1 light / 1.56:1 dark. K1's readout line stays the consumer's `rgb(112, 89, 66)` on and off (1.00:1); the name line carries the ink.
- **Bundle** (`logs/bundle.log`): unpacked 2,933,655 B, 844 files; `dist` 2,543,179 B in 840 files; JS gzip-9 330,398 B; datum 2,919,057.
- **Units** (`logs/unit-plants.out`, `logs/unit-bites.out`, load 113-225):
  - clean canon case 1 passed;
  - plants A, S, H, V, W, P and I each `1 failed`;
  - whole canon file after restore: 45 passed + 1 expected fail;
  - G1 and G2 each `1 failed`, clean `1 passed`;
  - each of the five bites `1 failed` planted and `1 passed` restored.

  The first attempt read nothing: the spec's `unit-plants.sh` calls `--config ../vitest.wt.config.mjs`, a file outside the worktree that no seat had banked. Both configs are now banked under `crit/probes/` (pass 4, §5).
- **Corner-gap**, the prototype's probe, unchanged (`logs/corner-gap.log`, load 123): 20/20; side band 2.00 css px, diagonal band 2.12 css px.

---

## 2 · The counterexample: "is a tile" has two spellings that disagree

**The claim tested.** `D′p` §4.4 R-10 says: "one nested block is the only `[data-shape="cell"]` selector in the sheet; every other reader derives from `--selection-tile`". Base.css says: "a tile route sets one of them, once, on the group (or any ancestor of its options), and nothing else declares that an option is a tile." The patched MIGRATION documents the fact to consumers: "`--selection-tile` (`none` | `flush` | `plated`, inherited) says whether a set of options are tiles … under either tile value it is not held to one row and paints its selected perimeter."

**The mechanism.** M-3 puts the corner, column, pad and leading under `.toggle-group[data-shape="cell"] .toggle-group__item`, which is a descendant combinator. The fact is a separate, writable, inherited property. So:
- the fact can be a tile value with no declaration, which gives no corner;
- a declaration can reach an item whose fact is `none`, which gives a tile corner on a pill.

**The probe.** `crit/probes/fact-split.mjs` changes no library code. It writes the documented token, or places a raw pill group built from the library classes. Results are in `logs/fact-split-{src,dist}.log`, at load 163-201, both engines, light and dark. Shots are in `shots/`.

| cell | what it is | reading, identical in both engines and on `src` and `dist` | agrees |
|---|---|---|---|
| `declared` | `preset-migrated` item 0 | fact `flush`, 204×63.58, corner 16 px (0.50×h/2), 2 rows, perimeter 1 | yes |
| `nested-control` | undeclared pill group beside the cell group | fact `none`, 92.78×40, `9999px` → 20.00 = 1.00×h/2, 1 row | yes |
| **`nested`** | the same pill group **inside** the `shape="cell"` group root | fact `none` (a pill: one-row law on, perimeter 0) but corner **16 px = 0.80×h/2** (92.81×40 in Playwright WebKit) | **no** |
| **`fact-plated`** | the library `preset` arm (undeclared, K1's two-row options) with `--selection-tile: plated` written on the group | fact `plated`: unheld, `flex-direction: column`, **2 rows, 61.58 px**, perimeter on, corner **`9999px` → 30.79 = 1.00×h/2: a lozenge** | **no** |
| **`fact-flush`** | the same with `flush` | the same lozenge, flush plate | **no** |

**Tally: 8/20 cells agree per flavour (12 FAIL), Chromium and Playwright WebKit alike, on `src` and on `dist`.** Production is silent: the development name checks only for a second row on a non-tile fact, and here the fact says tile. `shots/fact-split-src/fact-flush-chromium.png` shows the stadium-cornered two-row option with its 2 px selected edge, the "too rounded" shape the owner ruled out (N-9 via O-58).

**Why it scores on R-10, not as a new row.** R-10 is "'is a tile' spelled once, with every other reader derived from or pinned to it". The corner reader is neither derived from the fact nor pinned to it. CANON and the canon unit pin a rule over the *selector*, and their fixtures neither nest a group nor write the fact. Both cells fall inside the row's own wording, so this is a counterexample to an existing row, not a new class. R-2's witness (W-D 8/8) and T-1's scenes are not moved, so neither row is re-scored. The nested cell is R-2's H-2 claim broken outside its witness, recorded under R-10 so it is counted once.

**How plausible.** `plated` is Q-2's other arm. On this route a consumer reaches it only by writing the token (`D′p` built its `plated` twin by editing the source). A pill sub-group inside a tile group's slot is legal markup, and nothing names it. Neither case needs a consumer to touch a private name.

---

## 3 · The checklist (REGISTRY §P2-6.3), row by row

Each verdict cites this seat's own reading on the shared instrument.

### 3.1 · T-1..T-8

| row | reading (crit) | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18 | met |
| T-2 | 40/40 · 40/40 (H3-3 and H3-6's cases) | met |
| T-3 | migrated 40/43 · 40/43. `c1-migrated` 22.50 px² against 224 in every mode in both engines; gating shipped `preset-verbatim` 0.00 / 233.00 / 0.00 against 248 (Playwright WebKit 0.00 / 217.00 / 0.00) | **open**: Q-10 (C1), Q-5 (shipped K1) |
| T-4 | 24/24 · 24/24 | met |
| T-5 | 38/38 · 38/38 on `src` and `dist`; `preset-consumer-aria` on `dist`: `radiogroup` / `radio`, 1 stop, arrows move and check | met |
| T-6 | 33/33 · 33/33; commit, hover and PRT cells as in §1 | met |
| T-7 | 24/24 · 24/24 | met |
| T-8 | migrated 27/27, one run | met |

### 3.2 · X-1..X-7

| row | reading (crit) | status |
|---|---|---|
| X-1 | `states` 108/108 (`logs/states-states.log`, load 436) | met |
| X-2 | K2 stroke and V1 follow `--selection-ink`: 2.66 / 1.56, 3.23 / 2.06 | met |
| X-3 | 4/4 | met |
| X-4 | V2 `type="multiple" shape="cell"` in T-1 and T-3 migrated, green | met |
| X-5 | names 4/4 per flavour: the `<input>` named on `src-dev` and `dist-dev`, silent on `src` and `dist` | met |
| X-6 | 2/2 | met |
| X-7 | shared tone probe 24/24 (`logs/crit-tone.log`, load 353) | met |

### 3.3 · FV-1..FV-10

| row | reading (crit) | status |
|---|---|---|
| FV-1 | T-5, T-6 green; no Playwright WebKit pointer hang in T-6 or T-7 | met |
| FV-2 | T-2 40/40 · 40/40; mechanics 26/26 | met |
| FV-3 | calm-observer commit 1.03 at 81 ms, both engines | met |
| FV-4 | tone 24/24 | met |
| FV-5 | a11y 9/9 | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | names 16/16 across four flavours, the late `<br>` included | met |
| FV-8 | PRT hover ΔE 0.0332; hover 18/18, F1 6/6 | met |
| FV-9 | `plated` twin built (`logs/build-dp-plated-src.log`, `restored flush`) and filmed (`crit/pair/`). The arm exists, and the row asks no more. Its public surface is the token §2 breaks | met (see R-10) |
| FV-10 | the guard bite fails planted; `tabs-retired` refused on `dist` | met |

### 3.4 · R-1..R-10

| row | reading (crit) | status |
|---|---|---|
| R-1 | Shipped K1 is legible (208×40, nothing cut) but carries no selection in light or PRT (T-3 above). **Shipped K2 is not legible: 4 boxes cut, up to 24.64 / 24.86 px, silent on `dist`.** The fault is named only on `dist-dev`. The legibility half fails whatever Q-5 rules | **open**: route (K2 cut) and Q-5 (naming) |
| R-2 | W-D 8/8 · 8/8; T-2 40/40 | met (the nested-group break is recorded under R-10) |
| R-3 | commit cells green; plant 33/33 → 21/33 in both engines, only commit cells fail | met |
| R-4 | hover 18/18, F1 6/6 | met |
| R-5 | dark stroke 1.56:1 reported | met, reported |
| R-6 | 16.00 px at fine, coarse, `--ui-scale 1.25` (T-1); pills at h/2 (T-2, W-D) | met |
| R-7 | unit plants A, S, H (and V, W, P, I) fail; CANON plants 2/3 each on their own cell | met |
| R-8 | names on `dist-dev`, silent on `dist`; W-E `dist` 1/6 · 1/6 | **open**: Q-5 |
| R-9 | 2,933,655 B, +14,598 over the datum | met (stated); the rebind is Q-14 |
| R-10 | **`fact-split` 8/20 agree** (§2): the lozenge on an undeclared group carrying the documented fact; the tile corner on a pill nested in a tile group. Both engines, `src` and `dist`, silent in production | **FAIL**: route |

### 3.5 · E-1..E-4

| row | reading (crit) | status |
|---|---|---|
| E-1 | every witness read every cell in both engines in one sitting at load 85-542; 0 stalls | met |
| E-2 | F1, V2, sibling, interactive descendant, keyed reorder and deselectable single are green. C1 T-3 0/3 in both engines | **open**: Q-10 |
| E-3 | corner-refusal 10/10 on `src` and `dist`; the three MIGRATION rows' detectors and bites hold. The `--selection-tile` row's own wording ("not held to one row and paints its selected perimeter") holds under §2; it promises no corner, so it is not falsified | met |
| E-4 | real Safari | **UNMEASURED (owner's safaridriver checkbox)**: open |

### 3.6 · G, the gestalt

These are this seat's re-filmed frames, `crit/pair/{preset,specimen}/`: 16 frames, every frame passed its label check, load 172 → 152.
- **Card-like:** yes. K1 reads as four 16 px cards and K2 as eight.
- **Selection without colour:** yes, a 2 px near-foreground edge.
- **Apart from the ring when focused:** **no.** Focused-selected paints two concentric outlines in every frame (`preset-dark-fine-webkit-pair.jpg`, right column).
- **Uncluttered (plated against flush):** in light, plated reads as slabs. In dark the two rows are hard to tell apart. Q-2's call.
- **O-87:** the route adds no lighting layer. The commit is a +3 % pop with a bounce, with no travel.

**Status: open** (Q-2, Q-3).

### 3.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 7 | R-1 (route + Q-5), R-8 (Q-5), **R-10 (route)** |
| E (4) | 2 | E-2 (Q-10), E-4 (checkbox) |
| G (1) | 0 | G (Q-2, Q-3) |
| **total** | **33 / 40 (82.5 %)** | 7 |

The prototype claimed 34. The difference is R-10.

---

## 4 · What would close the route-owned rows

- **R-10.** Make the fact the one spelling every tile rule reads. `[data-shape="cell"]` writes only `--selection-tile: flush`. The corner, column, pad and leading move under `@container not style(--selection-tile: none)`, the form the floor already uses to switch the perimeter.
  - That cures both cells: a nested pill has fact `none` and gets nothing, and a consumer-written `plated` gets the 16 px corner.
  - Watch specificity: a bare `.toggle-group__item` inside the query loses `padding-inline` to `.toggle-group[data-size="lg"] .toggle-group__item` (0,3,0).
  - Re-point CANON's `canon` spelling in `route.json`, and gate on `fact-split.mjs`.
  - Not built here: the critic edits no route source.
- **R-1's legibility half.** No in-route cure under Q-5 (b). The consumer migrations (E-6) or a production signal (Q-5 (a)) close it.

---

## 5 · For pass 4's record (new classes; not scored)

- **Fact-split as a witness.** H3 has no cell that writes the tile fact without the declaration, or nests a group inside a tile. `crit/probes/fact-split.mjs` is a candidate H4 witness (fixture PASS and planted FAIL still owed).
- **Consumer `role` on a `type="multiple"` item.** Read from code, unmeasured: `itemAttrs` returns only `aria-pressed` for the `group` role (`useSelectionGroup.ts:258-268`), so a consumer `role="option"` stands under M-6's reordering. It is named in development only. H3-12 covers the single radio only.
- **The kick on wide tiles.** By arithmetic, unmeasured: at 2.8 % a tile wider than about 286 px overlaps a 4 px neighbour gap (the ≤ 768 px group gap) while it peaks. The consumer owns its grid gap.
- **The unit drivers' configs.** `D4-Dp-spec/probes/unit-plants.sh` and `unit-bites.sh` need `../vitest.wt.config.mjs` and `vitest.d4.config.mts`, which no seat banked. Without them every case prints nothing and the log still exits 0, which is a vacuous run. Both are banked now in `crit/probes/`.
- **Dark plated against flush.** The frames barely separate. Q-2's glance should be shown light-first.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
