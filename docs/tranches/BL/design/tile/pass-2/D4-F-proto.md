# D4 · pass 2 · D4-F prototype: the anatomy declares the tile

| field | value |
|---|---|
| seat | D4 pass 2, PROTOTYPE seat for route D4-F. It builds `D4-F-spec.md` on the real source on top of `floor.patch`, closes the spec's open risks where it can, and runs every H2 witness in both engines on the route, the unmigrated and the migrated consumer side by side. It reads no other route's pass-2 files (REGISTRY §7.4) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | checkout HEAD `b67b056d` (the task named `04929544`; `git diff --stat 04929544 b67b056d -- src` touches only the 10.1.0 Configurator, `src/components/configurator/*` and `src/index.ts`, and `git diff ad94e27f b67b056d -- src package.json vite.config.ts` is empty, so the spec's HEAD+floor datum is this base's too). `floor.patch` (sha1 `f1476eba`) applied clean in a detached worktree. The route patch is `D4-F-proto.patch` (8 files, +419 / −21, sha1 `8b219cf6`). It is a diff against HEAD+floor, and `git apply --check` is clean on a HEAD+floor snapshot; applying it reproduces the worktree byte for byte (`cmp`, 8/8 files) |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**. T-8's Safari attempt in this run got a new answer from the driver: "You must enable 'Allow remote automation' in the Developer section of Safari Settings" (`logs/T-8-f-src-chromium.log`). H2 got a session timeout instead |
| records | everything is under `pass-2/D4-F-proto/`: the route (`route/route.json`, `route/migrated.mjs`); the tools (`probe.mjs`, `glance.mjs`, `hover-f1.mjs`, `build-chain.sh`, `witness-chain.sh`, `run-chain.sh`, `run-chain-2.sh`, `run-chain-3.sh`); the probe JSON and every witness JSON (`runs/`, `runs/battery-f-src/`, `runs/battery-f-dist/`, `runs/builds/`); every log (`logs/`); 36 frames (`glance/`). The worktree, the scene builds and the library `dist` lived in scratch, and the worktree is removed |
| machine | badly overloaded for most of the seat: load averages ran from 23 to 765. Every log line carries its load. The first probe ran at 300-765. The H2 battery started at 283 (T-3 Chromium) and fell to 23-135 for most of the run. Each frame-timed cell prints its median frame interval. Two cells failed at load and were re-run: the programmatic commit landed late, and the double commit missed a kick. Both are NOT-REPRODUCED on re-run (§5). The unit suite timed out four tests at load 370. Those did not reproduce either (§3) |

---

## 0 · In brief

1. **The spec's mechanism is built as specified, plus three cures.**
   - The anatomy decides the shape. `#media` and `#meta` are library-marked rows, read by a group-level and an item-level `:has()`. There is no prop.
   - **R-1, the row-lock, is in source.** The pill becomes one row with `!important` on `flex-direction` and `flex-wrap`. That is the refusal itself: a consumer utility in a later layer would otherwise win.
   - **R-6:** the kick's stamp clears only on the kick's own `animationend`.
   - **R-7, Q-9 (a):** `accessibility.css` exempts a tile from its 2 px selected border under contrast-more and forced colours.
   - **R-2b:** F1's bound endpoint moves into `#meta` as a word, so the migration paints nothing.
2. **The migrated consumer is green on every gating cell of T-1..T-7, in both engines, except two named cells.** The exceptions are C1's one-row pills on T-3 (Q-10 (b), 3 cells per engine) and FadingScroll's own tab stop on T-5 (2 cells per engine, TF-6, not the tile's).
   - Migrated arm, Chromium · Playwright WebKit: T-1 12/12 · 15/15. T-3 15/18 · 15/18. T-4 16/16 · 16/16. T-5 30/32 · 30/32. T-6 25/27 · 27/27. T-7 24/24 · 24/24.
   - The two Chromium T-6 misses are f1-migrated's hover light, 0.70 % of pixels. Playwright WebKit moves 73.62 % with identical computed values, and the floor's hover rung sits at the witness threshold (§6.4).
3. **The unmigrated consumer is now a legible one-row pill, except K2.**
   - K1's two rows read as one ("Smooth 0.5 s · ζ 1", "Sna… 0.35 s · ζ 0…") in both engines, with no shear and no lozenge.
   - **K2's 52 px stage is cut by the 36 px plate on 8/8 items, in both engines** (`glance/chromium-specimen-light.png`). This is new defect R-1b, the one structural FAIL the prototype leaves open.
   - The unmigrated arm carries no selected perimeter (Q-10 (b)), so T-3 reads 0 px² on it, as it must for a pill.
4. **Every §7.3 obligation is met on its witness, and item 10 is measured.**
   - Item 3, the commit: 12/12 commit-bar cells per engine on the probe, and every migrated commit cell in the battery's T-6.
   - Item 4, the hover: separates from the selected state at 2-3.6× the bar.
   - Item 6, the state ink and the tone: 6/6 per engine.
   - Item 9, the refusal: structural in production on `src` and `dist`, named in DEV. Q-5 (d) is not built.
   - Item 10, the datum: `dist` +4,196 B, JS gzip-9 +259 B, against HEAD+floor.
5. **Typecheck, unit and build are green against HEAD+floor's own failures.**
   - `vue-tsc` is clean on both projects.
   - The whole unit suite fails only `boot-graph`'s 3 cases (no built demo), the same 3 as HEAD+floor.
   - The 3 new D4-F unit cases each fail on a planted mutation.
6. **The seat fixed two harness defects in place: F1-3 and F1-4** (`../harness/lib.mjs`, `measure.mjs`, `t3-selected-separates.mjs`; HARNESS §1.2). The T-3 and T-7 self-tests pass in both engines after the change: 14 runs, 0 BROKEN.

---

## 1 · What was built (`D4-F-proto.patch`, line numbers in the patched tree)

| file | change |
|---|---|
| `src/components/toggle-group/ToggleGroupItem.vue` | The spec's sketch: `#media` and `#meta` slots, each in a library-marked wrapper that renders only when used; `data-commit`, stamped when `selected` turns false → true. **R-6:** `onAnimationEnd` clears the stamp only when `animationName === "toggle-group-commit"`, so another animation on the button cannot cut the kick short. **The DEV name moves to what the row-lock leaves visible:** "clips its content: a pill is one row …" fires when a non-tile item's content is clipped, inline (a child or the row wider than its box) or block-wise (a child taller than the plate). The interactive-descendant name is unchanged |
| `src/components/toggle-group/styles.css` | The spec's sketch: the pill's `max-block-size` clamp; the tile rule (group `:has()` plus item `:has()`); media ink `--selection-ink`; meta ink lift; the mark on `::after` at `md`/`lg`; the impulse-response kick; tone on the tint. **R-1, the row-lock:** `.toggle-group__item:not(.toggle-group:has(.toggle-group__media, .toggle-group__meta) *, :has(> .toggle-group__media, > .toggle-group__meta)) { flex-direction: row !important; flex-wrap: nowrap !important }` |
| `src/styles/accessibility.css` | **R-7, Q-9 (a):** both selection arms (contrast-more and forced colours) gain `:not(<the tile selector>)`, so a tile keeps its own 2 px perimeter layer and its 1 px border |
| `src/components/tabs/composables/useTabRovingFocus.ts` | the spec's row-clustering fix to `rowNeighbour` (F1-2), unchanged |
| `tests/components/ui/toggle-group/ToggleGroup.test.ts` | Three D4-F cases. (1) The rows render only when filled; one item, two content models: same classes, same role. (2) The commit stamp is keyed on the model: mount stamps nothing, focus stamps nothing, a programmatic write stamps, a foreign `animationend` does not clear it, the kick's own does, and back-then-forth stamps again. (3) The sheet is read through `postcss`, so selectors are matched as parsed: one tile declaration shared by the group and item forms, the pill clamp, the row-lock with `!important`, the kick on the stamp. G-TOGGLE-WRAP's pin is amended to admit the row-lock's `nowrap` |
| `tests/components/custom/tabs/roving-grid.test.ts` | the spec's unequal-heights case |
| `demo/stories/forms/toggle.vue` | a "Tiles" section: four presets whose readout is `#meta` |
| `MIGRATION.md` | the route's rows under the floor's "Unreleased" section (§8) |

What does not change: the engine, the ARIA contract, the chassis classes, the floor's perimeter, ring and hover.

**The route** (`D4-F-proto/route/migrated.mjs`) is the spec's route with one site changed. F1's `is-bound` endpoint is now `<template v-if="lv.bound" #meta>…bound…</template>`, content and not a consumer `border-color` (R-2b). K1 puts its readout in `#meta`. K2, V1 and F1 put the stage or glyph in `#media`. V2 is `type="multiple"` with thumbnail, name and count. C1 is vertical one-row pills.

**P-3 cost, recorded.** The tile reading ("a group holding a row, or an item holding one") is spelled in four places: the tile rule, the row-lock's negation, the mark rule, and `accessibility.css`'s exemption. The DEV check spells it a fifth time in script. CSS has no way to select on `--selection-perimeter`, so one source of record would need a stamped attribute, which needs script. The parsed-selector unit case pins that the tile rule's two forms are one declaration. It does not pin the other three.

---

## 2 · Typecheck, unit, build, datum

| check | HEAD+floor+F | log, load |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0, three times: after the sketch, re-run with the exit captured directly, and on the final source | `logs/tsc.log`; 197 → 192, 189 → 204, `logs/unit-final.log` 419 → 350 |
| `vue-tsc --noEmit -p tsconfig.test.json` | first run exit 2, one error: `.get(...).exists()` in the new test (`logs/tsc-test.raw`). Fixed to `.find`. Re-run exit 0, 0 errors | `logs/unit.log`, `logs/tsc.log` (06:46 → 07:17, load 332 → 388) |
| the three lane suites (toggle-group, roving-grid, radius-role-canon) | 68 passed, 1 expected fail; again on the final source | `logs/unit-final.log`, load 454 |
| whole `vitest run`, `dist/` built | 8 failed / 2179 passed in 5 files at load 372-387 (`logs/unit.log`): `boot-graph` ×3 (no built demo), plus 4 tests that timed out at 120 s or 30 s and the menu contract's two focus assertions | `logs/unit-full.raw` |
| control: the 5 failing files on HEAD+floor (route reversed in the worktree) | only `boot-graph` ×3 fail | `logs/unit-control.log`, load 370 |
| the route, the same files alone | `boot-graph` ×3 plus two **different** cases timing out at 120 s (`glass-subtlety` "engage ink a 0ms step", `menu/contract` "checkbox/radio roles") | `logs/unit-route5.log`, load 330 → 325 |
| the route, the four non-boot files a third time | **92/92 pass** | `logs/unit-route-rerun.log`, load 370 → 357 |
| mutation plants on the new cases | the row-lock deleted → the sheet case fails; the end filter removed → the commit case fails; a stamp on focus added → the commit case fails | `logs/unit-plants.log`, load 370-376 |
| library build (`libbuild.mjs` in the worktree) | exit 0, 1,060.8 s at load 204-227 | `logs/tsc.log` |

Every non-`boot-graph` failure is NOT-REPRODUCED. Each was a different test on each run, each a timeout or the menu contract's known fixed-sleep focus race, and all four files pass when re-run. The route's unit result is therefore HEAD+floor's: `boot-graph` ×3.

**The bundle datum (§7.3 item 10, its own ruled row)**, measured as FLOOR.md measures it (`logs/datum.log`, load 360):

| build | `dist` files | bytes | JS gzip-9 (sorted concatenation) | CSS bytes |
|---|---|---|---|---|
| HEAD+floor (`D4-F-spec/logs/unit-tsc-datum.log`, the same `src`) | 837 | 2,537,228 | 276,900 | 460,038 |
| HEAD+floor+F (prototype) | 837 | **2,541,424 (+4,196)** | **277,159 (+259)** | 463,179 (+3,141) |

Against the spec's sketch (+3,661 / +245 / +2,667), the prototype adds the row-lock, the exemption and the end filter. The DEV-only code is stripped from `dist`. G-BUNDLE-RATCHET reads the packed tarball against `.bundle-ratchet` and was not run. Landing F moves the datum by about these numbers, and the owner rules that row.

---

## 3 · The H2 battery under `--route` (both engines, the unmigrated and migrated arms side by side)

Build `f-src` (HEAD+floor+F, flavour `src`, `--route D4-F-proto/route`; `runs/builds/build-f-src.json`), `witness-chain.sh` with a 3,600 s deadline. Each witness ran alone under the harness lock. Gating cells passed / measured; the arm tallies are the witness's own. JSON: `runs/battery-f-src/`. Comparison: HEAD+floor's battery (`FLOOR.md` §3.1, no route).

| witness | Chromium [arms] | Playwright WebKit [arms] | load at start (C; W) | HEAD+floor (C) |
|---|---|---|---|---|
| T-1 | 17/39 + 12 UNMEASURED [**migrated 12/12** · library 5/27 · unmigrated 3/6] | 20/42 + 12 UNMEASURED [**migrated 15/15** · library 5/27 · unmigrated 3/6] | 64.5; 50.7 | 5/39 |
| T-2 | **22/22** | **22/22** | 35.3; 30.8 | 22/22 |
| T-3 | 17/60 [library 2/39 · unmigrated 12/48 · **migrated 15/18**] | first run: HARNESS ERROR, a page-load stall (`waitForFunction` 30 s, F1-3). Re-run: 17/60 [library 2/39 · unmigrated 9/48 · **migrated 15/18**] | 283.1; 165.8, re-run 48.8 | 2/42 |
| T-4 | 24/36 [library 8/20 · unmigrated 3/24 · **migrated 16/16**] | the same | 26.1; 36.5 | 8/20 |
| T-5 | 72/104 [library 42/72 · unmigrated 19/37 · **migrated 30/32**] | the same | 28.8; 40.6 | 42/72 |
| T-6 | 52/72 [library 27/45 · unmigrated 32/40 · **migrated 25/27**] | 54/72 [library 27/45 · unmigrated 32/40 · **migrated 27/27**] | 71.0; 31.1 | 21/45 |
| T-7 | **24/24** [unmigrated 4/28 · migrated 24/24] | first run 20/21 (f1-migrated's four-state read hung 90 s at load 148). Re-run **24/24** [unmigrated 4/32 · migrated 24/24] | 214.2; 147.6, re-run 29.9 | 6 UNMEASURED |
| T-8 | 0/12 + 13 UNMEASURED (both engines in one run); Safari UNMEASURED | | 134.0 | 0/27 |
| W-A | 5/9 | 5/9 | 98.6; 114.3 | 2/9 |
| W-B | 9/25 | 9/25 | 113.2; 98.1 | 9/25 |
| W-C | 0/8 | 0/8 | 97.6; 93.1 | 0/8 |
| W-D | 4/8 | 4/8 | 108.0; 104.2 | 4/8 |
| W-E (`src`) | 1/3 | 1/3 | 100.8; 107.7 | 0/3 |
| W-E (`dist`, `f-dist`) | 1/6 | 1/6 | 87.8; 89.5 | 0/6 |
| T-5 (`dist`) | 72/104, the same arms as `src`; `preset-input` PASS: ArrowRight typed in the `<input>` keeps focus and the selection | the same | 86.2; 63.5 | 42/72 |

`runs/battery-f-src/T-3-webkit.json` and `T-7-webkit.json` are the re-runs (each overwrote its first run's JSON). The first runs are in `logs/T-3-f-src-webkit.log` and `logs/T-7-f-src-webkit.log`.

### 3.1 · Reading the rows

- **The migrated consumer** fails exactly these gating cells:
  - T-3 `c1-migrated` ×3 per engine: one-row radio pills carry state on ink and weight, Q-10 (b), spec R-2.
  - T-5 `specimen-migrated` and `strip-migrated` tab stops, both engines: FadingScroll's own `div.fading-scroll` stop, TF-6, FadingScroll's owner.
  - T-6 `f1-migrated` hover light and its PRM arm, Chromium only (§6.4).
- **The library arm** is the consumer's markup with its paint stripped, which for K1 and K2 is the unmigrated two-row default slot. Under F those items are pills by construction. So the library arm's T-1 cells read "never past its rung", 12 UNMEASURED (the row-lock holds them at 40 and 36 px with two lines appended). Its T-3 cells read 0 px², because the perimeter is dormant on a pill. The H-3 gating scenes (`preset-invalid`, `-sibling`, `-tone-*`, `-contents`) transcribe that markup, so they read 0 as well. **The same five states on the migrated markup pass in all three modes in both engines** (§4, question 4). This is the route's thesis applied: a shape the anatomy does not declare does not exist. It is not a carrier failure.
- **T-8** runs only the library arm of its scenes, so it measures the unmigrated K1 and K2 (pills, 0). The T-1 and T-3 cells on the migrated arms in both engines are §4's questions 4 and 5.
- **W-D** is D′'s witness. Its declared half (`<ToggleGroup shape="cell">`) fails because F has no `shape`. Its undeclared half (H-2's pair) passes 4/4. **W-E** is E's retired witness and reads the unmigrated K2 and V1 as "2 rows inside the rung" (R-1b). Its `dist` refusal cells read "no refusal". F's production answer is structural, not a thrown error (Q-5 (b)). W-A, W-B and W-C read families that are not F.
- **Every other library change against HEAD+floor** is the kick reaching every ToggleGroupItem (T-6 library 21/45 → 27/45). The unmigrated `preset-verbatim` and `specimen-verbatim` arms clear the commit bar too (keyboard 1.03, programmatic 1.03, pointer 1.04 with a bounce, both engines).

---

## 4 · REGISTRY §6.1 questions 2-5, re-measured on the prototype

`probe.mjs` (the spec's probe with the prototype's cells added), `logs/probe-f-src.log`, both engines, load 504 → 349. 212/226 gating cells; the 14 FAILs are read in §5. Chromium and Playwright WebKit agree on every geometry and key cell.

| question | cells | Chromium · Playwright WebKit |
|---|---|---|
| 2 · the mixed grid | K1 with `#meta` removed from items 1 and 3: cell 4/4 at 70.58 px (Playwright WebKit 70.59); the mixed 2×2 walk, 16/16 moves as Q-4 (b); the same row centred by the consumer (70.6 / 43.4 px): 1D→3, 3U→1, 0D→2, 2U→0; `single`, `vertical`, `pill-icon`, `pill-badge`, `family-d-undeclared` all pill at h/2; the live flip 36 → 66.3 px at 16px and back | PASS 9/9 · PASS 9/9 |
| 3 · the paired witness | five migrated sites: rows present → cell; rows removed → pill at h/2 on the rung; group and item attributes identical. f1-migrated is now 74×118.42 (the `#meta` word adds a row) → 50.86×40 | PASS 5/5 · PASS 5/5 |
| 4 · the unmigrated consumer | **row-lock:** `preset`, `preset-contents`, `preset-invalid`: pill, `flex-direction: row`, one content row, nothing cut by the plate, 3/4 ellipsized inline. `preset-verbatim`: one row, nothing cut, but the consumer's own `rounded` class paints 16 px, so the probe's "pill" class reads "other" (a criterion that does not fit a consumer-painted arm, not a library defect). **`specimen` and `specimen-verbatim`: one row, but the 52 px stage is cut by the 36 px plate on 8/8 items (R-1b).** T-3 migrated: 5 sites × 3 modes PASS, light 891.00 / 573.00 / 317.00 / 735.75 / 1781.75 px² (Chromium) against bars of 274 / 303 / 98 / 192 / 558; the H-3 states (invalid, sibling, translucent tone, unresolvable tone) on `preset-migrated`, 12/12; fill 1.00-1.23:1 throughout. Unmigrated T-3: 0 px² on `preset` and `specimen`; `specimen-verbatim` passes on the consumer's own outline (456.00) | 27/27 T-3 gating · 27/27; row-lock 3/6 · 3/6 |
| 5 · the comfort axis | T-1's `cornerStory` / `judgeT1` on 5 migrated sites at fine, coarse and `--ui-scale 1.25`: 16.00 px past the rung in every step (preset coarse 204×81.83 → 150.67, ÷h/2 0.39 → 0.21); pills at h/2 on both axes (8/8) | 23/23 · 23/23 |

---

## 5 · §7.3 D4-F items: D′ 3, 4, 6, 9, 10, and the spec's risks

| item | status | evidence |
|---|---|---|
| **3 · the commit arm (H-4)** | **MET** | Probe re-run (`logs/probe-f-src-rerun.log`, load 249-370): Playwright WebKit 13/13 commit cells, peak 1.02-1.04 at 82-168 ms with a bounce under the settle, median frame 17-18 ms; Tab entry 0.00 motion on all three scenes; reduced motion 0.0000 range. Chromium 9/9 read, peak 1.03-1.04 at 82-260 ms, median 8.3 ms. Chromium's `single` keyboard cell hit the sampler's 20 s `waitForFunction` in both probe runs and was not read there. The battery's T-6 reads it: `single` keyboard 1.03 at 82 ms with a bounce, programmatic 1.03, pointer 1.04 (`logs/T-6-f-src-chromium.log`, load 71). The first probe's FAIL (Chromium `preset-migrated` programmatic: the select landed at 536 ms, so the bounce fell outside the 800 ms window, at load 670) is NOT-REPRODUCED: the re-run read 1.03 at 88 ms with a bounce, and T-6 read 1.03 at 81 ms. In the battery's T-6, every migrated commit cell passes in both engines (preset, specimen, f1; strip reported) |
| R-6 · a double commit on one item | **CLOSED** | `double` (re-run, with the time each select landed): `preset-migrated` and `single`, both engines, 2 kicks on the re-committed item (for example Playwright WebKit 1.027 at 122 ms and 1.028 at 434 ms, selects landed 1228 / 1394 / 1553 ms). The first run's single-kick reads (Chromium `single`, Playwright WebKit `preset-migrated`, load 311-400) are NOT-REPRODUCED. The unit case pins the attribute cycle |
| **4 · hover on the plate layer, against the selected state** | **MET**, with one engine note | Selected against a **hovered** unselected sibling: Chromium 881.75 / 892.50 px² (preset light / dark, bar 274), 567.00 / 568.00 (specimen, bar 303); Playwright WebKit 977.00 / 981.00 and 567.00 / 568.00. Hover light 8.67-90.28 % Chromium and 77.52-90.15 % Playwright WebKit on preset and specimen; f1-migrated in Chromium is §6.4 |
| **6 · X-2 and X-7: the state ink and the tone** | **MET** | 6/6 per engine: the media stroke on specimen, strip and f1 is `oklch(0.216 0.006 56)`, equal to the edge, against `rgb(112 89 66)` off. With `--selection-tone: oklch(0.62 0.2 300)` the stroke and the edge are `oklch(0.42 0.2 300)` and the tint is the tone at 12 %. The migrated arms hold 0 consumer `[data-state]` rules |
| **9 · the refusal (Q-5 (b) + (d))** | **(b) MET with one open cell; (d) NOT BUILT** | Production (`src`, `dist`): 0 names in every scene (`logs/probe-f-dist-guard.log`, load 389-404). The structure refuses: every unmigrated item is a one-row pill at its rung, and the floor's editable-descendant rule keeps ArrowRight in the `<input>` on `dist` (T-5 `preset-input`, both engines). DEV (`src-dev`, rebuilt after the block-wise clip was added, `logs/probe-f-src-dev-guard2.log`, load 81-86): `preset` names 3 of 4 items (the "Smooth 0.5 s · ζ 1" item fits its row unclipped, so nothing names it), `specimen` 8/8, `preset-input` 4 clip + 1 interactive descendant, every migrated and pill scene 0. The gating FAIL in every flavour is `specimen`: the probe requires the structural refusal to cut nothing, and K2's stage is cut (R-1b). Q-5 (d), a `development` export condition: not built (FL-1 stands; `developmentConditions` 0 in `runs/builds/build-f-dist.json`) |
| **10 · the bundle datum** | **MEASURED** | §2: +4,196 B, +259 B JS gzip-9, +3,141 B CSS |
| R-1 · the unmigrated shear | **CLOSED for K1; R-1b open for K2** | §4 question 4; frames `glance/chromium-preset-light.png` (one row, labels ellipsized) and `glance/chromium-specimen-light.png` (the stage sliced to the plate) |
| R-2 · C1 under Q-10 (b) | **OPEN, the owner's Q-10** | T-3 `c1-migrated` 0 px² against 224 in light, dark and PRT, both engines (battery and probe). Building Q-10 (a) is one line and would put the edge on every selected pill in the library |
| R-2b · F1's sibling state as consumer paint | **CLOSED** | T-7 `f1-migrated` 4/4 states in both engines (Chromium first run; Playwright WebKit re-run, `logs/T-7-f-src-webkit-rerun.log`). The bound endpoint reads as a `#meta` word (`glance/chromium-f1-migrated-light.png`) |
| R-3 · no mark at `sm` | **OPEN, for the gestalt critic** | unchanged from the spec. `glance/webkit-specimen-migrated-dark.png` shows the `sm` selection carried by the edge and the plate alone |
| R-4 · `:has()` cost | **REPORTED** | Chromium, 200 tiles, 40 forced passes × 9 rounds: `:has()` min 39.5 / median 42.9 ms against class-keyed 40.4 / 43.1 ms, ratio of minima 0.98 at load 490. Playwright WebKit's timer reads 0.0 ms in both arms, so that cell is UNMEASURED |
| R-7 · Q-9 (a) | **CLOSED** | `contrast`: under contrast-more and forced colours the selected tile keeps its 1 px border and its content stays at +13,+11 (preset) and +9,+11 (specimen), level with the unselected tile, perimeter opacity 1: 4/4 per engine. The selected pill keeps the 2 px border, which is its contrast carrier (reported). Plant (`--plant a11y`: the rule without the exemption): 0/4, selected border 2px, content at +14,+12 (`logs/probe-f-src-plant-a11y.log`) |
| R-8 · real Safari | UNMEASURED (owner's safaridriver checkbox) | |

### 5.1 · The first probe's 14 FAILs, read

| FAIL | engines | reading |
|---|---|---|
| row-lock `specimen`, `specimen-verbatim` | 2 + 2 | R-1b, the open defect |
| row-lock `preset-verbatim` | 1 + 1 | the probe's class criterion meets the consumer's hand-set 16 px corner. The lock holds (one row, nothing cut) |
| guard `pill-icon`, `pill-badge` | 2 + 2 | a probe defect: "rows" counted distinct child tops, and an icon beside a label has two. Fixed to "nothing cut by the plate". Both pass in the re-run and in the DEV and `dist` guard runs |
| commit `preset-migrated` programmatic, and a sampler timeout | 2 (Chromium) | load 670, NOT-REPRODUCED (item 3) |
| double | 1 + 1 | load 311-400, NOT-REPRODUCED (R-6) |

---

## 6 · Harness changes (in place under `../harness/`) and findings

### 6.1 · F1-4: an absent migrated arm is UNMEASURED

`t3-selected-separates.mjs`: a migrated arm that renders 0 items (no migration for that site) yields `pass: null`, "no migration for this site (0 items): UNMEASURED". `measure.mjs` `selectedSeparation` now returns the item count with its error. This route migrates all six sites, so the branch does not fire in this battery. A route that migrates fewer sites gets UNMEASURED instead of FAIL, as HARNESS §1.4 already said.

### 6.2 · F1-3: the routed page-load stall

The first routed Playwright WebKit T-3 died in `openPage` (`waitForFunction` on `__tile.ready`, 30 s) at load 166-214, with no scene named. That is F1-3's class in a new spot.

Fix (`lib.mjs` `openPage`): a stalled load is re-opened once on a fresh context. A stall that does not reproduce is printed as a note, NOT-REPRODUCED, with its scene, mode and load. One that reproduces throws with the scene named. `goto` now has a 60 s timeout, and the stalled context is closed. It is a recovery path like H2's engine-closed relaunch, not a check, and HARNESS §1.2 records it.

The T-3 re-run at load 49 finished in 2.4 min with no stall note, so the path did not fire. F1-3's cause is still not known; this run gives no evidence beyond load.

### 6.3 · Self-test after the changes

`selftest.mjs --only T-3,T-7`, both engines (`logs/selftest-T-3-T-7.log`, load 81 at start):
- T-3: clean 60/60; `t3` 0/60, `t3-border` 51/60, `t3-alpha` 57/60, `t3-unres` 57/60, each failing on its planted cell.
- T-7: clean 24/24; `t7` 0/24.

14 runs, every one OK, in Chromium and Playwright WebKit.

### 6.4 · Findings for other owners

- **The floor's hover rung sits at the witness threshold** (TF-8, floor item 1). `hover-f1.mjs` (`logs/hover-f1.log`, load 93-114) shows rest and hover computing the same layers in both engines: a foreground layer at α 0.10 → 0.15 over the card layer. Painted, Chromium moves 0.70 % of f1-migrated's pixels and 8.67 % of specimen-migrated's, while Playwright WebKit moves 73.62 % and 77.52 %. T-6 counts a pixel as moving above 10 levels, and the light-mode hover delta is close to that, so the engines' blending lands on either side. It is the floor token owner's, not F's. On the preset tiles, over a host Card, Chromium moves 83.28 %.
- **Unit suite under load:** `menu/contract`'s focus assertions and three other tests time out or race at load 330-387 and pass on re-run (§2). This is consistent with the recorded CI fixed-sleep flake.
- **FadingScroll's own tab stop** stays (TF-6).

---

## 7 · "Every route" (REGISTRY §7.3)

- **Every cell in both engines under H2, unmigrated and migrated side by side:** §3. T-3 and T-7 Playwright WebKit gate on their re-runs, and the first runs' stall and hang are NOT-REPRODUCED.
- **H-10's scenes:**
  - F1 migrated: T-1, T-3, T-4, T-6 (Playwright WebKit) and T-7 all PASS.
  - V2 migrated (N-of-M, Q-7 (a)): T-1, T-3 and T-7 PASS; T-5 PASS (`multi` cell).
  - C1: T-3 FAIL under Q-10 (b).
  - The sibling state: H-3 `sibling` on the migrated markup, 553-557 px² against 274, all modes and engines.
  - The interactive descendant in production: T-5 `preset-input` PASS on `dist` in both engines.
  - The keyed reorder and the deselectable single: T-5 PASS on `preset` and `preset-verbatim`.
- **The gestalt read** (frames in `glance/`, 36 PNG; for the critic, not a verdict here):
  - Migrated K1 reads as four quiet 16 px cards with a darker plate, a dark 2 px edge and a check on the chosen one (`chromium-preset-migrated-light-focus-selected.png`). Focused and selected shows the grey ring 2 px outside the dark edge: a doubled boundary.
  - K2 migrated reads as a gallery of cards, with the selection a light edge in dark (`webkit-specimen-migrated-dark.png`).
  - F1 migrated: the check overlaps the n=2 rose's upper right, and the `#meta` word sits start-aligned under a centred label (the migration's CSS targets the inner span, not the row).
  - The unmigrated K1 is a tidy one-row pill set. The unmigrated K2 is visibly broken (R-1b).
  - O-87: the patch adds no lighting layer, glow, shadow or bevel. The kick is motion that carries state. The purple ball's halo in K2 is the consumer's.
- **MIGRATION.md:** §8. No binding is retired, so no E-11 guard is owed.
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox).

---

## 8 · MIGRATION.md rows (in the patch)

- Under "Unreleased", after the floor's three retired bindings: "`<ToggleGroupItem>` gains `#media` and `#meta`; a pill is one row", with the detectors `rg '<ToggleGroupItem[^>]*class="[^"]*(flex-col|rounded-)'` and `rg '\[data-state="on"\][^{]*(path|svg)'`, and the two keyframes.js sites.
- "Behaviour and paint" gains four rows: the commit pop on a model change, never on focus, zeroed by reduced motion; Up and Down across unequal heights; the tint follows `--selection-tone`; a selected tile keeps its border width under contrast-more and forced colours.

---

## 9 · Open, in one list

| id | what | owner |
|---|---|---|
| R-1b | **the unmigrated K2 stage (52 px) is cut by the 36 px pill on 8/8 items, both engines; DEV names all 8, production is silent but visibly broken.** The library cannot shrink the consumer's stage without overriding its size. The cure is the migration (stage → `#media`) | the route critic; keyframes.js's own tranche (E-6) |
| R-2 | C1's one-row pills fail T-3 under Q-10 (b) | owner, Q-10 |
| R-3 | no mark at `sm` | gestalt critic |
| R-9 | the DEV name misses a two-row default slot whose content happens to fit one row (K1 "Smooth", 1 of 4) | the route critic: whether "clips" or "has a second row" is the name's job |
| R-10 | the tile reading is spelled in four CSS places plus the DEV script (§1, P-3) | the route critic |
| F-hover | the floor's hover rung at the witness threshold in Chromium (§6.4) | the floor token owner |
| F1-3 | the routed WebKit stall's cause; now re-opened and labelled | H2 harness owner |
| Q-5 (d) | not built (FL-1) | owner, Q-5 |
| Safari | every cell UNMEASURED (owner's safaridriver checkbox); the driver now asks for "Allow remote automation" | owner |
