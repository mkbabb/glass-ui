# D4 · pass 4 · D4-D′ · prototype: the declared cell, on floor v3

| field | value |
|---|---|
| seat | D4-D′ prototype, pass 4. Implements `D4-Dp-spec.md` on HEAD + floor v3, re-measures every number it scores on in its own worktree, and scores the route on the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged by §P3-6.3). Adds no row, picks no winner. Did not read the other route's pass-4 files |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | The task names `9219651e`. The checkout's HEAD moved to `362a733e9` (the D′ spec's own commit) before the worktree was made, so the worktree (`.claude/worktrees/bl/D4/p4/D4-Dp-proto/wt`, detached) sits at `362a733e9`. `git diff --stat 9219651e HEAD -- src tests MIGRATION.md package.json demo vite.config.ts` is empty. `floor-v3.patch` (sha1 `f8f57677…`) applied clean first, then the route. The worktree was removed with `git worktree remove --force` before return |
| patch | **`D4-Dp-proto.patch`**, relative to HEAD + floor v3, sha1 `2473107b43f77b7da330501864088b10a00b1a37`. 8 files (7 changed, 1 added), **+283 / −11** by `git apply --numstat`: source +27 / −1, MIGRATION +26 / −7, tests +230 / −3. `git apply --check` is clean on a fresh worktree at `362a733e9` + `floor-v3.patch`, and applying it there reproduces the prototype's files byte for byte (`cmp`, all 8). Made by `D4-Dp-proto/run-proto.sh patch`, which diffs each file against its HEAD + floor v3 copy kept beside the worktree |
| harness | H4 **`a26206b6a740`** (39 files) on all 65 run JSONs and every unit line. One hash for the whole sitting: no harness file changed during it. Harness files unedited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | Every build, unit run, probe and browser run went through `~/.claude/guard/guarded --light --rss-gb 8` (the light path every pass-4 seat took); every Playwright WebKit read ran inside ONE `--exclusive webkit` hold (`logs/webkit-all.log`, 17:02:53 → 17:35:17, no lock queue). One heavy run at a time, serial (`logs/chain.log`). The guard clamped the 240-min WebKit stage to 90 min; it took 32 min. 1-min load: unit and builds 21.3-29.4, Chromium battery 12.8-25.8, Chromium dist/probes/carried 12.5-19.9, Playwright WebKit 7.4-32.5. Every log's first and last line carry the 1 / 5 / 15-min load |
| records | Everything under `pass-4/D4-Dp-proto/`: `run-proto.sh` (the driver; the spec's `run-dp4.sh` re-pointed, plus three stages: `carried`, `pop0`, and the WebKit reads of both inside `webkit-inner`), `logs/` (every log cited), `run-json.tgz` (the 65 run JSONs every cell line below is quoted from, 89 KB). The route compositions (`../D4-Dp-spec/route/`) and the spec's two probes (`../D4-Dp-spec/probes/`) are read in place, unchanged. Builds stay in `.claude/worktrees/bl/D4/p4/D4-Dp-proto/out/` |
| fences | No tracked source edited in the checkout. Git writes: `git worktree add` / `remove` of `D4-Dp-proto/wt` and of a second check worktree `D4-Dp-proto/chkwt` (the apply check), and `git worktree prune`. Checkout writes: only `D4-Dp-proto.patch`, `D4-Dp-proto.md` and `D4-Dp-proto/` under `docs/tranches/BL/design/tile/pass-4/` |

Citations: `D′s` is `D4-Dp-spec.md` (pass 4); `D′p3` / `D′c3` are the pass-3 prototype and critique; `FV3` is `FLOOR-V3.md`; `H4` is `H4.md`.

---

## 0 · In brief

1. **The route is the spec's, unchanged in code.** One prop and one rule over floor v3:
   - `shape: "pill" | "cell"` on `<ToggleGroup>` (default `pill`), stamped as `data-shape`, refused through the floor's `refuseUnknown` when unknown;
   - `.toggle-group[data-shape="cell"] { --selection-tile: flush }`. The floor's geometry reads the fact; the route writes nothing else.

   The one change from `D′s`'s `route.patch` is in `MIGRATION.md`: its `--selection-tile` bullet carried one 120-column line, and the prototype re-wraps that bullet to the file's 88 columns. Same words, same byte count (§4); source and tests are byte-identical to `route.patch`.
2. **Every number `D′s` scores on reproduced, cell for cell, in both engines**, on `src`, `dist`, `src-dev` and the shared attack builds (§3). Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run), W-D 8/8 · 8/8, FACT 12/12 · 12/12 (`dist` the same), ATTACK 3/3 · 3/3 (`dist` the same; `src-dev` 4/4 · 4/4), CORNER 5/5 · 5/5 (`dist` the same). Units 63/63 clean, every plant fails (9/9). Whole suite 2,352 ran, 2,349 passed, 3 failed (HEAD's `gate:boot-graph`). Bundle 2,936,340 B, to the byte.
3. **What the spec carried, this seat measured on the route's build.** The rows `D′s` scored "met (carried)" on pass-3 readings of floor code (X-1, X-3, X-5, X-6, X-7, FV-5, R-3's plant, R-4, R-5) are re-read here with the pass-3 shared instruments (`../pass-3/D4-Dp-spec/probes/states.mjs`, `crit.mjs`) and with R-3's plant rebuilt on this tree (§3.4). All green in both engines; the kick plant takes T-6's migrated arm from 33/33 to 21/33 in both.
4. **Score: 34 / 40, the owner-gated fixed point (REGISTRY §P3-6.3).** The six open rows are §P3-6.4's six, each built at its default and none claimed by ruling: T-3 and E-2 (Q-10, with Q-5 for shipped K1), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). R-7 is met on the route's unit; the harness's CANON still reads 1/3 · 1/3 because `canon.mjs` does not evaluate `@container` (F3-1, H5's).
5. **No stall, no hang, no janky cell.** Playwright WebKit retired its browser at H3-1's 60-navigation cap 2× in each of T-3, T-6 and the kick plant's T-6 (loads 14.3-24.4), as designed. No cell needed a re-run, and no NOT-REPRODUCED.

---

## 1 · What was built

Line numbers are in the patched tree (HEAD + floor v3 + `D4-Dp-proto.patch`). This is `D′s` §1, implemented as specified.

| # | where | what |
|---|---|---|
| M-1 | `src/components/toggle-group/shape.ts` (new, 7 lines) | `TOGGLE_GROUP_SHAPES = ["pill", "cell"] as const`, `type ToggleGroupShape`. One list for the prop type and the guard (P-3) |
| M-2 | `toggle-group/ToggleGroup.vue` (+9 / −1) | `shape?: ToggleGroupShape`, default `"pill"`; `:data-shape="props.shape"` on the root; `watchEffect(() => refuseUnknown("ToggleGroup", "shape", props.shape, TOGGLE_GROUP_SHAPES))`, which throws `TypeError: [ToggleGroup] shape="card" is not one of pill, cell.` in production as in development, through the app's error handler, while the group renders as pills (FV-10's policy, `_shared/guard.ts`) |
| M-3 | `toggle-group/index.ts`, `src/index.ts` (+1 each) | `type ToggleGroupShape` in both barrels |
| M-4 | `toggle-group/styles.css` (+9) | `.toggle-group[data-shape="cell"] { --selection-tile: flush; }` in `@layer components`, (0,2,0) over the floor's per-group reset `.toggle-group { --selection-tile: none }` (0,1,0). No `!important`, so a consumer rule on the group can write `plated` (Q-2's other arm) or `none` |
| M-5 | `MIGRATION.md` (+26 / −7) | the new `shape="cell"` row; Chip's detector narrowed to `<Chip[^>]*shape="cell"`; the `--selection-tile` bullet now says `flush` on `shape="cell"` and states what a consumer write does on the group and on an ancestor (re-wrapped to 88 columns, §0 item 1); header "Four bindings leave and one arrives." |
| M-6 | `tests/components/ui/toggle-group/ToggleGroup.test.ts` (+38) | the barrel lists `ToggleGroupShape`; `shape stamps data-shape, defaults to pill, and refuses an unknown value`; `the declaration writes the tile fact and nothing else (R-10: one spelling)` |
| M-7 | `tests/styles/radius-role-canon.test.ts` (+192 / −3) | the container-aware canon case (`D′s` M-7): 48 twins, the parsed-selector law, and a rule under `@container [not] style(--selection-tile: V)` reaches a twin only when the twin's fact (the cascade winner among the sheet's `--selection-tile` declarations on the item's group) satisfies it; any other container condition FAILS; every twin's fact must read `flush`/`none` |

Not in the route, as `D′s` §1 lists: no geometry, corner, pad, perimeter, plate or name of its own (floor v3's); no grid on `cell` (CX-5); no anatomy slots; no mark (FV3-6 waits on Q-3 (b)).

---

## 2 · The checklist, row by row (REGISTRY §P2-6.3)

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes. Under D′ a library transcription arm (`preset`, `specimen`, `strip`, `f1`, `v2`, `c1`) is undeclared markup, so pills; its cells are R-1's. Library residue outside the route is floor v3's and unchanged (`FV3` §4.1). "A · B" is Chromium · Playwright WebKit. Every cell cites a log under `D4-Dp-proto/logs/` and its JSON in `run-json.tgz`.

### 2.1 · T-1..T-8

| row | witness and reading (this seat's run) | status |
|---|---|---|
| T-1 | `battery-src-chromium.log`, `src-T-1-webkit.log`: migrated **15/15 · 18/18** (preset, specimen, strip at 16.00 px at fine, coarse and `--ui-scale 1.25`). Library 5/27 · 5/27 with 12 UNMEASURED (held pills, R-1). Unmigrated 3/6 · 3/6 | met |
| T-2 | **52/52 · 52/52** on `src` and on `dist` (`dist-t2-one-line-stadium-*.log`), H4-2's 12 late cells included | met |
| T-3 | migrated **40/43 · 40/43**. Open: `c1-migrated` carrier 22.50 · 22.50 px² light, 23.00 · 22.50 dark, 22.50 · 22.50 PRT against 224 (perimeter band 0.00; fill 1.19 / 1.24 / 1.01 · 1.21 / 1.21 / 1.01:1). Shipped K1 `preset-verbatim`: 0.00 / 238.00 / 0.00 · 0.00 / 217.00 / 0.00 px² against 248. Unmigrated 12/48 · 9/48 | **open: owner Q-10 (C1), Q-5 (shipped K1)** |
| T-4 | migrated **24/24 · 24/24**; unmigrated 3/24 · 3/24 | met |
| T-5 | migrated **38/38 · 38/38** on `src` and `dist`; unmigrated 20/37 · 20/37 | met |
| T-6 | migrated **33/33 · 33/33**. `preset-migrated` pop: keyboard 1.03 at 84 · 81 ms, programmatic 1.03 at 90 · 76 ms, calm observer 1.03 at 85 · 83 ms, pointer 1.04 at 123 · 109 ms, each with a trough and a settle; body travel 0.00 px. Tab entry 0.00. Hover ΔE 0.0946 · 0.0953 (PRM the same), PRT 0.0332 · 0.0309 (Playwright WebKit's PRT is the forced level-0 path) against 0.02. Coarse taps latch nothing. Median frames 7.5-7.9 ms (Chromium). No janky cell | met |
| T-7 | migrated **24/24 · 24/24**; unmigrated 4/32 · 4/32 | met |
| T-8 | `src-T-8-both.log`: migrated **27/27** in one run over both engines. Library 0/12 (held transcription pills, R-1). The 13th unmeasured cell is real Safari: `safaridriver: Could not create a session: You must enable 'Allow remote automation' in the Developer section of Safari Settings` (E-4's) | met |

### 2.2 · X-1..X-7

Re-read on this build, not carried (§3.4).

| row | witness and reading | status |
|---|---|---|
| X-1 sibling state | `carried-states-states-*.log` **54/54 · 54/54**: the selected tile's T-3 separation under valid, invalid, a sibling's full-ink border, the shipped consumer reset and both tones, on the migrated preset, specimen and strip, light, dark, PRT | met |
| X-2 selected ink reaches the media | `carried-states-ink-*.log`: K2's stage stroke and label take `var(--selection-ink)` when selected (light 2.66:1 against the unselected stroke, both engines); T-3 and T-7 migrated green with no `[data-state="on"]` rule. Dark stroke 1.56:1 is R-5's report | met |
| X-3 state paint never re-renders the slot | `carried-crit-x3-*.log` **2/2 · 2/2**: K2 under `content-visibility: auto`, programmatic and pointer commits, readout `DIRECT-WRITE-42` kept, slot mutations 0 | met |
| X-4 multi-select, same anatomy | V2 `type="multiple" shape="cell"`: T-1 and T-3 migrated green | met |
| X-5 interactive descendant named | `carried-crit-desc-*.log` on `src-dev` **1/1 · 1/1**: `[ToggleGroupItem] value="smooth" holds an interactive descendant …`; ATTACK on `src-dev` 4/4 · 4/4 | met |
| X-6 deselectable single | `carried-crit-x6-*.log` **1/1 · 1/1**: `sel=none` → 0/4 checked, no perimeter, Tab lands on item 0, select(2) and back | met |
| X-7 tone on edge, tint, ink | `carried-crit-tone-*.log` **12/12 · 12/12**: edge, tint and ink each move; T-3 `preset-tone-*-migrated` green | met |

### 2.3 · FV-1..FV-10, read under the route

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 **52/52 · 52/52** on `src` and `dist`, including the inline-style and utility `display: block` cells on all six gating pill scenes. Floor v3's `pill-row.mjs` on this build **27/27 · 27/27** | met |
| FV-3 | T-6 calm-observer commit 1.03 at 85 · 83 ms | met |
| FV-4 | X-7 above | met |
| FV-5 | `carried-states-a11y-*.log` **6/6 · 3/3** (Playwright WebKit takes `prefers-contrast` only, no forced-colours emulation): the selected tile's box does not move under contrast-more and forced colours | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK `src-dev` **4/4 · 4/4**: `sup` pills 0 console errors over 6 one-row pills; X-5's name fires | met |
| FV-8 | PRT hover ΔE 0.0332 · 0.0309 on `preset-migrated` | met |
| FV-9 | `flush` from the declaration; `plated` by a consumer rule on the group: FACT-WRITE `declared-plated-rule` fact `plated`, 16.00 px, column, light and dark (§2.5 E-3) | met (the look is G's) |
| FV-10 | the `shape` guard; `unit-plant-guard-gone.log` and `unit-plant-stamp-gone.log` each `1 failed` on `shape stamps data-shape, defaults to pill, and refuses an unknown value` | met |

### 2.4 · R-1..R-10

| row | witness and reading | status |
|---|---|---|
| R-1 the unmigrated consumer | `probe-unmigrated-dist-*.log` (production `dist`): shipped K1 `preset-verbatim` 208.00×40.00, 1 row, nothing cut, with no selected carrier in light or PRT (T-3 row); shipped K2 `specimen-verbatim` 207.00×36.00, 3 rows, **CUT 4 boxes, up to 24.64 · 24.86 px**, silent. W-E `dist` 1/6 · 1/6 (`preset refusal (flavor dist) · a line added to item 0 → no refusal`) | **open: owner Q-5, Q-15** |
| R-2 the H-2 pair | W-D **8/8 · 8/8**; T-2 52/52 · 52/52; FACT `pill-in-tile` (92.78 · 92.81×40.00, used 20.00 = h/2, one row), `pill-beside-tile`, `tile-in-pill` (63.05×40.00, h/2) green, light and dark, `src` and `dist` | met |
| R-3 the commit, plant-checked | T-6 commit cells above. **Plant on this build** (`pop0` stage: `animation: toggle-group-commit 450ms` → `animation: none 450ms`, rebuilt, restored and checked by `cmp`): `t6-pop0-*.log` T-6 **44/88 · 44/88**, migrated **21/33 · 21/33**: the 12 lost cells are the commit cells | met |
| R-4 hover against selected | `carried-states-hover-*.log` **9/9 · 9/9** (the selected tile against a hovered sibling clears T-3's bar; hover against rest ≥ 2 %), `…-hover-f1-*` **3/3 · 3/3**; T-6 hover ΔE above | met |
| R-5 X-2 media ink, dark stroke reported | K2 stroke 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT, identical in both engines (`carried-states-ink-*.log`); the perimeter carries T-3 | met, reported |
| R-6 the comfort axis | T-1 migrated coarse and `--ui-scale 1.25` 16.00 px; floor `tile-geometry.mjs` on this build **30/30 · 30/30** (sm / md / lg × light, dark × five consumer-corner forms; pad `8px 12px` at every size); pills at h/2 (T-2) | met |
| R-7 the canon unit fails plants A, S, H | `unit-plant-clean.log` **63/63**. `unit-plant-canon-{a,s,h,i}.log`, `-no-writer`, each `1 failed` on `the tile corner is one declaration on the field rung; the pill keeps the stadium`; `-split` `2 failed` (that case and the R-10 pin). Probe `canon-fact.mjs`: clean **4/4 · 4/4**, plants A, S, H each **3/4 · 3/4** on their own cell (`probe-canon-fact-plant-*-*.log`). Harness CANON **1/3 · 1/3** (F3-1: `canon.mjs` ignores the `@container` condition) | **met on the unit**; CANON's 1/3 is H5's |
| R-8 refusal per Q-5 on `dist` | T-2 52/52 · 52/52 on `dist`; CORNER 5/5 · 5/5 on `dist`; W-E `dist` 1/6 · 1/6 (W-E counts only an error or a throw in production, which Q-5 (b) does not give) | **open: owner Q-5** |
| R-9 the bundle datum | §5 | met (stated); the rebind is Q-14 |
| R-10 "is a tile" spelled once | FACT **12/12 · 12/12** on `src` and `dist`: `declared` 16.00 px; `fact-plated` and `fact-flush` on the undeclared preset agree (a tile on the field corner, 204.00×61.58 at 16.00 px, 0.52×h/2); nesting cells pills. Unit R-10 pin green, and the `split` plant fails it | met |

### 2.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 every cell readable in both engines | every witness, probe and carried instrument gave a verdict in both engines in one sitting; no stall, hang or engine failure (`grep -iE 'hung|engine failure|stall|BROKEN'` over `logs/` finds only H3-1's designed browser retirements) | met |
| E-2 the H-10 scenes | F1, V2, the sibling state, the interactive descendant on `src-dev`, the keyed reorder and the deselectable single green on the migrated arms (T-3, T-5, T-6, X-5, X-6). **C1:** T-3 0/3 · 0/3 | **open: owner Q-10** |
| E-3 MIGRATION rows, falsifiable claims only | (1) "a corner on a tile has no effect": CORNER **5/5 · 5/5** on `src` and `dist` (utility, scoped, unlayered `!important`, inline all 16.00 px on 204.00×40.00; the scoped control reaches the undeclared pill at 7px), and `tile-geometry` 30/30 · 30/30 (inline `!important` printed INFO, 9999px → 28.07, as the row states). (2) "`shape="cell"` sets `--selection-tile: flush` … and that is all it sets": the unit R-10 pin and FACT `declared`. (3) "a value other than `pill` or `cell` throws …; the group still renders, as pills": the unit case, plant-checked. (4) The `--selection-tile` sentence: `probe-fact-write-*.log` **FACT-WRITE 12/12 · 12/12** (declared + `none` inline or by rule: pill at h/2, one row; declared + `plated` by rule: fact `plated`, 16.00 px; `plated` on the declared group's ancestor: fact stays `flush`; `flush` on an undeclared group's ancestor: fact `none`, 20.00 = h/2). (5) The pill clause: floor v3's row, T-2 52/52 · 52/52 on `dist` | met |
| E-4 real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell | **open: owner** |

### 2.6 · G, the gestalt

D′ paints exactly what floor v3 paints under `flush`; the route adds no paint value and no lighting layer, so O-87 holds trivially. The open findings stand: focused-selected shows two concentric outlines (Q-3); plated against flush barely separates in dark (Q-2). This seat filmed no new pair: the row is owner-blocked, the route adds no paint, and the machine law asks for only the screenshots a reading needs. The critic re-films H3-13's pair if it scores G's frames. **Status: open, owner Q-2 and Q-3.**

### 2.7 · Score

| block | met | open (owner) |
|---|---:|---|
| T (8) | 7 | T-3 (Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 8 | R-1 (Q-5, Q-15), R-8 (Q-5) |
| E (4) | 2 | E-2 (Q-10), E-4 (checkbox) |
| G (1) | 0 | G (Q-2, Q-3) |
| **total** | **34** | **6**, each built at its default |

**34 / 40, at the owner-gated fixed point**: 0 open rows outside the owner's. Not CONVERGED (§P3-6.3, §P3-6.4).

---

## 3 · Readings in full

### 3.1 · Typecheck, unit, build

| check | result | log (load) |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0 | `tsc-app.log` (27.4) |
| `vue-tsc --noEmit -p tsconfig.test.json` | before the library build: exit 2 on the two `@mkbabb/glass-ui/fourier-math` self-imports only (`tsc-test-prebuild.log`, as `FV3` §3); after it: **exit 0, 0 errors** | `tsc-test.log` (21.3-22.6) |
| route unit files, clean | **63/63** (`ToggleGroup.test.ts`, `radius-role-canon.test.ts`) | `unit-plant-clean.log` |
| plants, each must fail | **9/9 fail**: `canon-a`, `canon-s`, `canon-h`, `canon-i`, `no-writer` (1 failed each, the canon case), `split` (2 failed: canon + R-10 pin), `guard-gone`, `stamp-gone` (1 failed each, the shape case). Every plant restored by `unit.mjs`'s `finally` | `unit-plant-*.log` (22.5-24.4) |
| the whole suite | **2,352 ran: 2,349 passed, 3 failed, 1 skipped**; the 3 are `gate:boot-graph` (no `dist-demo`, HEAD's own) | `unit-all.log` (to 29.4) |
| library and scene builds | exit 0: lib; `dp-src`, `dp-src-dev`, `dp-dist`, `dp-dist-dev` (`--route ../D4-Dp-spec/route`); `dp-atk-src`, `dp-atk-src-dev`, `dp-atk-dist` (`--route harness/attack-route`); `dp-pop0-src` (R-3's plant) | `libbuild.log`, `build-dp-*.log` (21.3-23.9) |

### 3.2 · H4, unmigrated and migrated side by side

Chromium: `battery-src-chromium.log` (16:33 → 16:49), `dist-*-chromium.log`, `atk*-chromium.log`. Playwright WebKit: `src-*-webkit.log`, `dist-*-webkit.log`, `atk*-webkit.log`, `src-T-8-both.log`, one lock hold (17:02 → 17:35). Gating cells passed / measured.

| witness | build | unmigrated consumer (shipped K1/K2 markup) · A · B | migrated consumer (`shape="cell"`) · A · B | whole witness · A · B | 1-min load at start · A · B |
|---|---|---|---|---|---|
| T-1 | src | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27 · 5/27) | 24.90 · 18.04 |
| T-2 | src · dist | — | — | **52/52 · 52/52** · **52/52 · 52/52** (library) | 25.83 · 24.28 |
| T-3 | src | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured; library 2/39) | 22.27 · 32.47 |
| T-4 | src | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 (library 12/30) | 23.94 · 19.22 |
| T-5 | src | 20/37 · 20/37 | **38/38 · 38/38** | 87/116 · 87/116 (library 49/78) | 22.52 · 20.07 |
| T-5 | dist | 20/37 · 20/37 | **38/38 · 38/38** | 88/117 · 88/117 (library 50/79) | 9.45 · 10.68 |
| T-6 | src | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 (library 31/55) | 16.54 · 17.36 |
| T-7 | src | 4/32 · 4/32 | **24/24 · 24/24** | 24/24 · 24/24 | 19.86 · 16.29 |
| T-8 | src, one run | — | **27/27** | 27/39 (+13 unmeasured; library 0/12) | 11.21 |
| W-A · W-B · W-C | src | — | — | 5/9 · 9/25 · 0/8, both engines (library, as `FV3` §4) | 14.49-16.35 · 15.52-20.55 |
| W-D | src | — | — | **8/8 · 8/8** | 14.21 · 14.90 |
| W-E | src · dist | — | — | 1/3 · 1/3 · 1/6 · 1/6 | 13.63 · 14.91 |
| CANON | src | — | — | **1/3 · 1/3** (F3-1) | 12.94 · 14.03 |
| REPORT | src · attack src | — | `kick` push **0.17 px** (Chromium, `preset-migrated` 300.00×63.58, peak 1.0278) · **0.14 px** (Playwright WebKit, attack `preset` 300.00×40.00, peak 1.0276) against a 4 px gap, want ≤ 0.05; 0.00 px at the scenes' own 204 px. `mark` UNMEASURED (no FV3-6) | reported, not gating | 12.76 · 12.61 |

**The shared attack set (H4-1)**, on the attack builds. Each cell is one consumer: the migrated (declared) consumer, or the unmigrated (undeclared) one writing or not writing the fact.

| witness · cell | consumer | src · A · B | dist · A · B | src-dev · A · B |
|---|---|---|---|---|
| FACT `declared` (light, dark) | migrated: `shape="cell"` | 16.00 px on 95.94 · 95.97×40.00, column | the same | — |
| FACT `pill-in-tile`, `tile-in-pill` | a pill group nested in a declared tile group, and a one-item tile group inside a pill group | pills at h/2, one row | the same | — |
| FACT `pill-beside-tile` | unmigrated, beside the tile | pill at h/2 | the same | — |
| FACT `fact-plated`, `fact-flush` | unmigrated preset, the consumer writes the fact on the group | a tile on the field corner, 204.00×61.58, 16.00 px, 2 rows, column (the pass-3 lozenge, 30.79 px, gone) | the same | — |
| **FACT total** | | **12/12 · 12/12** | **12/12 · 12/12** | — |
| ATTACK `empty` | migrated C1 (no declaration, anatomy `v-if` false) | pill, fact none, 184.00×40.00, used 20.00 = h/2 | the same | |
| ATTACK `attrs` | migrated preset with consumer class, style, `data-*`, `aria-label`, `role="option"`, `tabindex="0"`, `@click` | handler 1×, checked, role `radio`, one tab stop, consumer attributes land | the same | |
| ATTACK `sup` | migrated strip, `m<sup>2</sup>` labels | reported | reported | **0 console errors over 6 one-row pills** |
| **ATTACK total** | | **3/3 · 3/3** | **3/3 · 3/3** | **4/4 · 4/4** |
| CORNER `utility`, `scoped`, `important`, `inline` | migrated preset, consumer re-rounds the tile | 16px, used 16.00 on 204.00×40.00, each | the same | — |
| CORNER `scoped-control` | unmigrated `family-d-undeclared` | computes 7px (the selector reaches an item) | the same | — |
| **CORNER total** | | **5/5 · 5/5** | **5/5 · 5/5** | — |
| R-1 (`probe-unmigrated-dist`) | unmigrated shipped K1 / K2 on `dist` | — | K1 208.00×40.00, 1 row, nothing cut; K2 207.00×36.00, 3 rows, CUT 4 boxes up to 24.64 · 24.86 px | — |

### 3.3 · The route's and floor's probes, on this build

| probe | A · B | log |
|---|---|---|
| `canon-fact.mjs` clean | **4/4 · 4/4**: one tile rule, `.toggle-group__item @container not style(--selection-tile: none) → var(--radius-field)`, 48/48 twins, facts `flush/none` | `probe-canon-fact-*.log` |
| `canon-fact.mjs` plants A, S, H | **3/4 · 3/4** each, failing `tile corner` (A, S) and `pill corner` (H) | `probe-canon-fact-plant-*-*.log` |
| `fact-write.mjs` | **12/12 · 12/12** | `probe-fact-write-*.log` |
| `corner-gap.mjs` (`D′p3`'s) | **10/10 · 10/10**: `::before` inset 0, radius 16px, side band 2.00 css px, diagonal 2.12; edge inset Δ at 45° 0.03-0.25 · 0.05-0.18 css px | `probe-corner-gap-*.log` |
| `tile-geometry.mjs` (floor's) | **30/30 · 30/30** | `probe-tile-geometry-*.log` |
| `pill-row.mjs` (floor's) | **27/27 · 27/27** | `probe-pill-row-*.log` |
| `unmigrated.mjs` on `dist` | R-1 above | `probe-unmigrated-dist-*.log` |

### 3.4 · What the spec carried, re-read here

The pass-3 shared instruments, unchanged, read in place from `../pass-3/D4-Dp-spec/probes/` (`run-proto.sh carried`; the Playwright WebKit half inside the one lock hold). Chromium 16:55 → 16:57 (load 12.9-19.7), Playwright WebKit 17:27 → 17:30 (load 7.4-8.2).

| instrument | rows | A · B |
|---|---|---|
| `states.mjs --part states` | X-1, X-7 (tones), T-3 states | **54/54 · 54/54** |
| `states.mjs --part hover` (+ `--sites f1-migrated`) | R-4 | **9/9 · 9/9**, f1 **3/3 · 3/3** |
| `states.mjs --part ink` (reported) | X-2, R-5 | K2 stroke 2.66 / 1.56 / 2.66:1 light / dark / PRT, both engines; strip 3.23 / 2.06:1 |
| `states.mjs --part a11y` | FV-5 | **6/6 · 3/3** (Playwright WebKit: contrast only) |
| `crit.mjs --part x3` | X-3 | **2/2 · 2/2** |
| `crit.mjs --part x6` | X-6 | **1/1 · 1/1** |
| `crit.mjs --part tone` | X-7 | **12/12 · 12/12** |
| `crit.mjs --part desc` on `src-dev` | X-5 | **1/1 · 1/1** |
| R-3 kick plant (`pop0`) | R-3 | T-6 64/88 → **44/88 · 44/88**; migrated 33/33 → **21/33 · 21/33** |

### 3.5 · Against the spec

Every tally in `D′s` §3.2, §3.4, §3.5 and §4 reproduced exactly. The only readings that moved are reported, non-gating and within the instrument's frame-to-frame scatter: REPORT `kick` 0.17 against the spec's 0.16 px (Chromium) and 0.14 against 0.13 px (Playwright WebKit); T-6 pop-peak times within ±6 ms of the spec's (same peaks, troughs and settles). Chromium ran on the default headless shell throughout (the spec's battery straddled the `10c89b18c` change, `D′s` §3.3); its tallies equal the spec's, so the browser build moved no cell here either.

---

## 4 · MIGRATION rows (in `D4-Dp-proto.patch`, under floor v3's Unreleased section)

As `D′s` §5, with one presentational change: the `--selection-tile` bullet (`MIGRATION.md:100-113`) is re-wrapped to 88 columns. `route.patch` left one 120-column line in it. The words are unchanged; the bullet keeps its line count, so the file's byte count, and the bundle, are unchanged (§5).

1. **New:** _A set whose options hold more than one row declares `<ToggleGroup shape="cell">`_ (`:41-54`).
2. **Edited:** Chip's detector, `rg '<Chip[^>]*shape="cell"'` (`:26-28`).
3. **Edited:** the `--selection-tile` bullet: `flush` on `shape="cell"`, and the write-over sentence FACT-WRITE measures.
4. **Header:** "Four bindings leave and one arrives."

Consumer edits (E-6, each in its consumer's own tranche): K1 `SpringPhysicsFacet.vue`, K2 `EasingCatalogue.vue`, V1 `EasingSpecimenStrip.vue`, F1, V2, C1 and fourier-analysis `EquationModeToggle.vue:62`, as `D′s` §5 lists them and as `../D4-Dp-spec/route/migrated.mjs` transcribes them.

---

## 5 · The bundle datum (R-9)

`../pass-3/floor-v2/probes/bundle.sh` (npm `unpackedSize`, G-BUNDLE-RATCHET's measure), `logs/bundle.log` (17:35, load 14.7-16.3):

| build | unpacked (packed files) | vs datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD + floor v3 (`FV3` §6) | 2,934,126 B (843) | +15,069 | 2,543,198 B | 330,571 B |
| **HEAD + floor v3 + D′ (this patch)** | **2,936,340 B (844)** | **+17,283** | 2,543,882 B, 840 files | 330,651 B |

The route over floor v3: **+2,214 B** unpacked (`dist/` +684 B, JS gzip-9 +80 B, the rest `MIGRATION.md`), equal to the spec's to the byte. Landing D′ rebinds the datum with the floor's +15,069: G-BUNDLE-RATCHET's rebind is the owner's (Q-14).

---

## 6 · Risks and notes for the critic

| id | note | measured |
|---|---|---|
| N-1 | **CANON reads 1/3 · 1/3 on this route and on any floor-v3 route.** R-7 is scored on the route's unit (what the row names) and corroborated by `canon-fact.mjs`. A critic scoring R-7 on CANON alone would fail it on F3-1, an instrument blind spot. Cure: H5 evaluates `style(--selection-tile: …)` in `canon.mjs` | §2.4 R-7 |
| N-2 | **The canon unit's fact evaluator ranks by specificity and order, not by cascade layer.** Every `--selection-tile` writer in `src/` today sits in `@layer components` (the floor's reset and the route's rule), so the evaluator matches the engine (`canon-fact.mjs` reads the engine's computed fact and agrees: `flush/none` on 48/48). A future writer in another layer, or unlayered, could be mis-ranked by the unit; the engine-side probe would still read it right | `unit-plant-clean.log`, `probe-canon-fact-*.log` |
| N-3 | **The fact is a public input**: `shape="cell"` plus a consumer `none` on the group is a declared group that paints pills, with no name. Paint cannot disagree with the fact (FACT 12/12, FACT-WRITE 12/12); the declaration yields to the consumer on purpose, so `plated` stays reachable before Q-2 rules | FACT-WRITE `declared-none-*` |
| N-4 | **A floor comment is false** (`D′s` §2.5): `src/styles/utilities/base.css:54-55` (floor v3) says a tile route sets the fact "on the group (or any ancestor of its options)". The per-group reset makes the parenthesis false, and FACT-WRITE's ancestor cells measure that. It is the floor's file, not this route's, so the patch leaves it; the next floor revision should strike the parenthesis (P-3) | FACT-WRITE `ancestor-*` |
| N-5 | The kick pushes 0.17 · 0.14 px into a 4 px neighbour gap on 300 px tiles (REPORT, floor-owned, not gating) | §3.2 |
| N-6 | C1 has no passing answer under Q-10 (b). On D′ it could declare `shape="cell"`: a 16 px corner on a 40 px one-row option (0.80×h/2, the FACT `declared` geometry) | T-3, FACT |

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** Nothing this seat started is left running: every guard, server and browser exited with its run (`chain.log` ends `bundle-done`, and every stage log ends with `exit`). The worktrees `D4-Dp-proto/wt` and `D4-Dp-proto/chkwt` were removed with `git worktree remove --force`, then `git worktree prune`. Builds and run JSON stay in `.claude/worktrees/bl/D4/p4/D4-Dp-proto/out/`, and the JSON every number here rests on is banked in `D4-Dp-proto/run-json.tgz`.
