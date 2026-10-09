# D4 · pass 3 · D4-D′ · prototype: the declared cell, on floor v2

| field | value |
|---|---|
| seat | D4-D′ prototype, pass 3. Implements `D4-Dp-spec.md` on the real source in a worktree on HEAD + floor v2, measures it under H3 in both engines in one sitting, and scores it on the fixed 40-row checklist (REGISTRY §P2-6.3). Read no other route's pass-3 file. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | The task names `8d911018`. The checkout's HEAD was `89d2a01a` when the worktree was made (`.claude/worktrees/bl/D4/p3/D4-Dp-proto/wt`, detached, node_modules symlinked, now removed). `git diff --stat 8d911018 89d2a01a -- src package.json tests MIGRATION.md vite.config.ts` is empty. `floor-v2.patch` (sha1 `b04a83be…`) applied first, then the route |
| patch | **`D4-Dp-proto.patch`**, relative to HEAD + floor v2, sha1 `e7645ff266c47aa7738f6a5efd43d9675a2dabfd`: 12 files, +342 / −25. It is **byte-identical to the spec's `D4-Dp-spec/route.patch`** (`cmp` clean): the spec's mechanism held under every witness, so the prototype changed nothing in it (§1). `git apply --check` is clean on a `git archive` export of HEAD with `floor-v2.patch` applied (`D4-Dp-proto/logs/apply-check.log`). The patch was regenerated after every plant and pair build and compared again: unchanged |
| harness | H3 `9fd4983bc6b9`, printed in every run JSON and in `logs/tally-dp-src.md` (no MIXED flag). Harness files unedited |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| sitting | One sitting, 2026-10-09 12:16 → 14:10. Load (1-min) ran 497 at the library build, 154-500 across the battery, 95-245 across the probes. Every log's first and last line carry the 1 / 5 / 15-min load average. No T-6 cell read a janky frame (Chromium median frame 7.70-8.80 ms, Playwright WebKit 10-11 ms), no witness printed NOT-REPRODUCED, no stall: Playwright WebKit retired its browser under H3-1's cap 1× in T-1 and T-4 and 2× in T-3 and T-6 |
| records | Everything under `pass-3/D4-Dp-proto/`: `run-proto.sh` (the driver: every step below), `route/` (`route.json`, `migrated.mjs`: the spec's six migrations, byte-identical in markup), `run/dp-src/` (the battery JSON, both engines), `run/dp-dist/` (T-5 and W-E on `dist`), `run/plant-pop0/` (R-3's plant), `logs/` (every log cited), `probes/` (`corner-gap.mjs`, `consumer-aria-name.mjs`, `cells.mjs`), `pair/{preset,specimen}/` (the H3-13 frames). The shared instruments this seat ran unchanged live in place: `../harness/`, `floor-v2/probes/` (`tile-fact.mjs`, `unmigrated.mjs`, `bundle.sh`), `D4-Dp-spec/probes/` (`states.mjs`, `crit.mjs`, `corner-refusal.mjs`, `unit-plants.sh`, `unit-bites.sh`, `make-patch.sh`). Builds and captures stayed in scratch and are removed |

Tallies: `node ../harness/tally.mjs D4-Dp-proto/run/dp-src [--scenes] [--fails]`, rendered as `logs/tally-dp-src.md`, `-scenes.md`, `-fails.md`. A witness's cells by pattern: `node D4-Dp-proto/probes/cells.mjs D4-Dp-proto/run/dp-src <witness> <regex> [--fails]`.

---

## 0 · In brief

1. **The spec's patch is the prototype.** Applied to HEAD + floor v2, it typechecks, passes the unit suite (except HEAD's own three `boot-graph` cases), builds, and reproduces the spec's battery cell for cell on the migrated arm in both engines. Every new unit case bites its plant.
2. **Migrated arm, both engines:**

   | witness | Chromium | Playwright WebKit |
   |---|---|---|
   | T-1 | 15/15 | 18/18 |
   | T-2 (library pills, H3-3 / H3-6) | 40/40 | 40/40 |
   | T-3 | 40/43 | 40/43 |
   | T-4 | 24/24 | 24/24 |
   | T-5 `src` · `dist` | 38/38 · 38/38 | 38/38 · 38/38 |
   | T-6 | 33/33 | 33/33 |
   | T-7 | 24/24 | 24/24 |
   | T-8 (one run, both engines) | 27/27 | (same run) |
   | W-D | 8/8 | 8/8 |
   | CANON | 3/3 | 3/3 |

   The three T-3 misses are `c1-migrated` (light, dark, PRT): a one-line pill row, which Q-10's default (b) leaves without a perimeter.
3. **The spec's risk R-3 is measured and closed.** The perimeter sits inside the padding box with `border-radius: inherit`, so it is not concentric with the border in theory. `probes/corner-gap.mjs` reads the painted edge's inset from the outline on the side and at 45°: Δ 0.05-0.36 css px on all 20 cells (5 tile scenes × light, dark × both engines), no seam, against a 0.5 px bar. The planted non-concentric edge fails 17/20 (§3.1).
4. **Checklist: 34 / 40 met.** The six open rows each wait on an owner ruling or action, and each is built at its default: T-3 and E-2 (Q-10), R-1 and R-8 (Q-5), E-4 (the safaridriver checkbox), G (Q-2, Q-3).
5. **Bundle datum:** 2,933,655 B unpacked, 844 files: +4,133 B over floor v2 (2,929,522) and +14,598 B over the `.bundle-ratchet` datum 2,919,057. `dist` 2,543,179 B in 840 files, JS gzip-9 330,398 B (`logs/bundle.log`). The rebind is the owner's (Q-14).

---

## 1 · What was built

`D4-Dp-proto.patch` is `D4-Dp-spec.md` §1, M-1..M-10, unchanged. In short:

| # | where (in the patched tree) | what |
|---|---|---|
| M-1 | `toggle-group/shape.ts` (new) | `TOGGLE_GROUP_SHAPES = ["pill", "cell"]` and `ToggleGroupShape`, one list read by the prop type and the guard |
| M-2 | `ToggleGroup.vue`, `toggle-group/index.ts`, `src/index.ts` | `shape?: ToggleGroupShape` (default `pill`), `:data-shape` on the root, `refuseUnknown("ToggleGroup", "shape", …)` in a `watchEffect` (FV-10's one policy), the type in both barrels |
| M-3, M-4 | `toggle-group/styles.css` | the one nested block `.toggle-group[data-shape="cell"] { --selection-tile: flush; & .toggle-group__item { column, stretch, the pad pair, leading, border-radius: var(--radius-field) !important } &[data-size="sm"] … }`. The corner is refused in paint by the layered `!important` |
| M-5 | the floor's perimeter `::before` | `inset: 0` (was `-1px`), so `content-visibility: auto` and the pill's `overflow: clip` do not halve the edge (H3-7) |
| M-6, M-7 | `ToggleGroupItem.vue` | `inheritAttrs: false`; the consumer's attributes bind first, the engine's after them (H3-12). A development name for a consumer `role` / `tabindex` / `aria-checked` / `aria-pressed` under the floor's `process.env.NODE_ENV` gate |
| M-8 | `fading-scroll/FadingScroll.vue` | `:tabindex="holdsStop ? undefined : 0"`, re-read by one `MutationObserver` |
| M-9 | tests | the parsed-selector canon unit over 48 twins; shape stamp and refusal; `item-attrs.test.ts`; the FadingScroll stop rule |
| M-10 | `MIGRATION.md` | three rows and two floor-row edits (`D4-Dp-spec.md` §3) |

**Why nothing changed.** The prototype seat's work list was the route's open rows. Every route-owned row read met on this sitting's own measurements (§2), and the one geometric risk the spec left open (R-3, the corner) reads concentric to the device pixel (§3.1). Changing the source further would have spent a second tile reader (spec R-10) to cure a defect the pixels do not show.

---

## 2 · Typecheck, unit, build

| check | result | log, load |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0 | `logs/wt-tsc-app.log`, 497 → 483 |
| `vue-tsc --noEmit -p tsconfig.test.json` (with `dist/`) | exit 0 | `logs/wt-tsc-test.log`, 483 → 491 |
| `vitest run` (whole suite, caches in the worktree) | 10 failed / 2328 passed / 10 expected-fail / 1 skipped, 241 files | `logs/wt-vitest.log`, 368 → 255 |
| the 7 non-`boot-graph` failures, re-run | on a plain re-run of their four files at load 178, `comment-ratio` and `aurora-stage-affordance` pass and 5 cases (`glass-subtlety` ×4, `aurora/atoms` ×1) read `Test timed out in 5000ms` (`logs/wt-vitest-rerun.log`); with `--testTimeout 60000` those two files pass 60/60 (`logs/wt-vitest-rerun-timeout60.log`, load 166-173). **Load artefacts, NOT-REPRODUCED** | as cited |
| what stays red | `boot-graph` ×3 (no `dist-demo`), HEAD's own (FLOOR-V2 §3) | |
| unit plants on the canon case | clean passes; plants A, S, H, V, W, P and I (the corner without `!important`) each fail; the whole canon file passes after restore (45 + 1 expected-fail); G-TOGGLE-WRAP plants G1 (paint on the group's own rule) and G2 (a group pad that cuts the ring) fail, clean passes | `logs/unit-plants.out` (driver `logs/unit-plants.log`), load 105-125 |
| unit bites | the guard deleted; `data-shape` not stamped; `inheritAttrs` back on; the port always a stop; the port re-read deleted: each fails its test and passes restored | `logs/unit-bites.out`, load 125-167 |
| library build (`harness/libbuild.mjs`) | exit 0, 83.7 s | `logs/libbuild.log`, load 497 |
| scene builds `src`, `src-dev`, `dist`, `dist-dev` | exit 0 each, migration `D4-Dp-proto [preset,specimen,strip,f1,v2,c1]` | `logs/build-dp-*.log` |

---

## 3 · H3 under the route, unmigrated and migrated side by side

`logs/battery-dp-src.log` (12:37 → 13:30), then `dist` cells to 13:36. Gating cells passed / measured, per arm. The `library` arm on the six consumer sites is the consumer markup with its paint dropped: an undeclared group, so pills (spec §2 preamble).

| witness | engine | unmigrated (shipped) | migrated | library | load at start |
|---|---|---|---|---|---|
| T-1 | Chromium | 3/6 | **15/15** | 5/27, 12 UNMEASURED | 194 |
| | Playwright WebKit | 3/6 | **18/18** | 5/27, 12 UNMEASURED | 181 |
| T-2 | both | — | — | **40/40** · **40/40** | 210 · 251 |
| T-3 | Chromium | 12/48 | **40/43** | 2/39, 12 UNMEASURED | 275 |
| | Playwright WebKit | 9/48 | **40/43** | 2/39, 12 UNMEASURED | 356 |
| T-4 | both | 3/24 · 3/24 | **24/24** · **24/24** | 12/30 · 12/30 | 322 · 500 |
| T-5 `src` | both | 20/37 · 20/37 | **38/38** · **38/38** | 49/78 · 49/78 | 478 · 269 |
| T-5 `dist` | both | 20/37 · 20/37 | **38/38** · **38/38** | 50/79 · 50/79 | `logs/battery-dp-dist-t5-*.log` |
| T-6 | both | 34/48 · 34/48 | **33/33** · **33/33** | 31/55 · 31/55 | 262 · 279 |
| T-7 | both | 4/32 · 4/32 | **24/24** · **24/24** | — | 343 · 281 |
| T-8 | one run | — | **27/27** | 0/12, 13 UNMEASURED (12 held pills, 1 real Safari) | 265 |
| W-A · W-B · W-C | both | — | — | 5/9 · 9/25 · 0/8, identical | 251-174 |
| W-D | both | — | — | **8/8** · **8/8** | 175 · 169 |
| W-E `src` · `dist` | both | — | — | 1/3 · 1/6, identical | 165 · `logs/battery-dp-dist-we-*.log` |
| CANON | both | — | — | **3/3** · **3/3** | 155 · 154 |

**The H3 rows, read under the route** (both engines unless split):

| H3 | cell | reading |
|---|---|---|
| H3-2 | T-8 reads the migrated arms | migrated 27/27; the library 0/12 are held pills (R-1) |
| H3-3, H3-6 | a `<br>`, a block child and an appended `div`, ≥ 1.1 s after mount | T-2 40/40: `single #0 … <br> inside the label, after mount · 36.00 px at rung 36.00 · nothing cut; one row` |
| H3-4 | CANON on the build | clean 3/3; plant A 2/3 (tile cell), S 2/3 (tile cell), H 2/3 (pill cell), each failing its own cell (`logs/canon-{a,s,h}-*.log`) |
| H3-5 | hover ΔE | `preset-migrated` 0.0947 Chromium / 0.0953 Playwright WebKit (PRM the same); `f1-migrated` 0.0929 Chromium, against 0.02 |
| H3-7 | paint containment | every migrated tile scene 2.00 px every side, uncontained and under `content-visibility: auto`, both engines |
| H3-8 | forced-colours ring reach | `preset-`, `specimen-`, `f1-migrated` 2.00 px every side, selected and not |
| H3-9 | calm-observer programmatic commit | pop peak 1.03 at 79-86 ms, trough 1.00, settle 1.00 (`preset-`, `f1-migrated`) |
| H3-10 | `tabs-retired` on `dist` | refused: `TypeError: [SegmentedTabs] semantics="toggle" is not one of radio, tabs.` |
| H3-11 | H-3 states on the migrated markup | `preset-{invalid,sibling,tone-translucent,tone-unresolvable,contents}-migrated` pass T-3 in light, dark and PRT, both engines |
| H3-12 | consumer `role` / `tabindex` | `preset-consumer-aria`: `radiogroup` / `radio`, 1 tab stop, all four arrows move and check, on `src` and `dist` |
| H3-13 | film pair | 16 frames, every frame passed its label check (`logs/film-pair-*.log`, load 167-190) |

**Unmigrated against migrated, the shipped consumer:**
- K1 shipped (`preset-verbatim`) on `dist`: 208×40, one row, nothing cut (`logs/probe-unmigrated-dist.log`). T-3 0.00 / 233.00 / 0.00 px² against 248 in Chromium (Playwright WebKit 0.00 / 217.00 / 0.00): the consumer's dashed outline is its only carrier. Migrated: 997 / 1007 / 1001 px² against 267 (Playwright WebKit 993 / 1005 / 997).
- K2 shipped (`specimen-verbatim`) on `dist`: 207×36, 3 rows clipped, 4 boxes cut up to 24.64 px (Chromium) and 24.86 px (Playwright WebKit), with no production signal. Migrated: 205×86.16 at 16.00 px, T-3 1086 / 1097 / 1093 px² against 291.

### 3.1 · The corner (spec risk R-3), measured

`probes/corner-gap.mjs` hides the ink on the selected item 0 and reads the painted pixels on two lines: down through the middle of the top edge, and inward along the 45° diagonal from the box's corner. It finds where the edge starts (the sub-pixel crossing of 3:1 against the interior) and compares the edge's inset from the item's outline on the side with its inset at 45° (where the outline lies r(√2 − 1) from the corner). PASS: no seam in the diagonal band, band width within 0.75 px of the side's, inset Δ within 0.5 px.

| arm | reading | log, load |
|---|---|---|
| clean | **20/20**. Side band 2.00 px, diagonal 2.12 px (radial), no seam. Inset side / 45°: `preset-migrated` 0.59 / 0.78 (Δ 0.19) light and 0.57 / 0.64 (Δ 0.06) dark in Chromium; the widest Δ is `strip-migrated` light in Chromium, 0.36 | `logs/corner-gap.log`, 222 → 260 |
| plant (perimeter `inset: 2px`, corner 12 px) | **3/20 pass, 17 fail**: Δ −0.56 to −0.67. The three that pass sit at Δ −0.42 and −0.47 (Chromium `strip` and `specimen` light), at the instrument's resolution | `logs/corner-gap-plant.log`, 194 → 219 |

The geometric gap (about 0.41 css px at 45°) lands under one device pixel at DSF 2 and is absorbed by antialiasing. The rim beside the edge reads 1.1:1 against the interior, so it does not read as a second line either. `logs/superseded-corner-gap-arith.log` is the first run, whose diagonal step was scaled wrong (÷√2 instead of ×√2); it is kept and not cited.

### 3.2 · The consumer-ARIA name (M-7), read in the console

`probes/consumer-aria-name.mjs` opens `preset-consumer-aria` and reads the harness's own console capture (from page creation). **8/8** (`logs/consumer-aria-name-*.log`, load 141-213): on `src` and `dist` 0 names; on `src-dev` and `dist-dev` 4 names, one per item, `[ToggleGroupItem] value="smooth" sets role, tabindex: the group's engine owns …`. In every flavour the items read `radio`, tab stops `-1 0 -1 -1`. The first run attached its own listener after mount and missed the mount-time names; it is kept as `logs/superseded-consumer-aria-name-*-late-listener.log`.

---

## 4 · The checklist (REGISTRY §P2-6.3), row by row

Scored on the migrated arm, the gating unmigrated arm and the library scenes that are not consumer transcriptions. Every reading is from this sitting.

### 4.1 · T-1..T-8

| row | evidence | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18; `preset-migrated` 204×63.58 → 103.92 at 16.00 px flat, `specimen-migrated` 205×86.16 → 122.47 at 16.00, at fine, coarse and `--ui-scale 1.25`, both engines | met |
| T-2 | 40/40 · 40/40, H3-3's three cases after mount (H3-6) | met |
| T-3 | migrated 40/43 · 40/43; preset, specimen, strip, F1, V2 and the five H-3 state scenes pass light, dark and PRT, and H3-7 holds 2.00 px. **Open:** `c1-migrated` 22.50 px² against 224 in every mode in both engines; the gating shipped `preset-verbatim` 0.00 / 233.00 / 0.00 against 248 | **open: owner Q-10, Q-5** |
| T-4 | migrated 24/24 · 24/24, H3-8 2.00 px every side | met |
| T-5 | migrated 38/38 · 38/38 on `src` and on `dist`; `specimen-` and `strip-migrated` 1 tab stop; `preset-consumer-aria` `radio`, 1 stop | met |
| T-6 | migrated 33/33 · 33/33. Keyboard, programmatic, calm-observer and pointer commits each peak 1.03-1.04 at 79-138 ms with a trough and a settle; Tab entry 0.00; hover ΔE 0.0947 / 0.0953, PRT 0.0332 / 0.0309; coarse taps latch nothing | met |
| T-7 | migrated 24/24 · 24/24 | met |
| T-8 | migrated 27/27 in one run over both engines. Real Safari is E-4's row | met |

### 4.2 · X-1..X-7

| row | evidence | status |
|---|---|---|
| X-1 | T-3 `preset-sibling-migrated` light, dark, PRT both engines; `states.mjs --part states` **108/108** (`logs/states-states.log`, load 143) | met |
| X-2 | `--selection-ink` reaches the K2 and V1 strokes: specimen 2.66:1 light / 1.56:1 dark, strip 3.23 / 2.06, identical in both engines (`logs/states-ink.log`) | met; dark stroke under R-5 |
| X-3 | `crit.mjs --part x3` **4/4** (`logs/crit-x3.log`) | met |
| X-4 | V2 `type="multiple" shape="cell"`: T-1 met, T-3 545.50 / 555.00 / 546.00 px² (light / dark / PRT) against 154 (Chromium), 556.50 / 563.75 / 556.50 against 156 (Playwright WebKit) | met |
| X-5 | `preset-input`'s `<input>` named once on `src-dev` and `dist-dev`, silent on `src` and `dist`, both engines (`logs/probe-names-*.log`, 16/16 with the late `<br>`); T-5 `preset-input` keeps the typed key | met |
| X-6 | `crit.mjs --part x6` **2/2** (`logs/crit-x6.log`) | met |
| X-7 | shared tone probe `crit.mjs --part tone` **24/24**: edge, tint and ink move (`logs/crit-tone.log`, load 97) | met |

### 4.3 · FV-1..FV-10, read under the route

| row | evidence | status |
|---|---|---|
| FV-1 | T-5 and T-6 green on the migrated arms; no Playwright WebKit pointer hang in T-6 or T-7 | met |
| FV-2 | T-2 40/40 · 40/40; `probe-tile-fact-mech` 26/26 (`logs/probe-tile-fact-mech.log`) | met |
| FV-3 | T-6 calm-observer commits 1.03 at 79-86 ms, both engines | met |
| FV-4 | X-7 24/24 | met |
| FV-5 | `states.mjs --part a11y` **9/9** (`logs/states-a11y.log`) | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | X-5's 16/16, late `<br>` included | met |
| FV-8 | PRT hover ΔE 0.0332 Chromium / 0.0309 Playwright WebKit on preset; `states.mjs --part hover` 18/18 and F1 6/6 | met |
| FV-9 | M-3 sets `flush`; the `plated` twin is the same build with that one word changed (`logs/build-dp-plated-src.log`: built, `restored flush`), filmed in `pair/` | met (the look is G's) |
| FV-10 | `refuseUnknown` on `shape`; unit "the guard deleted" bites (`logs/unit-bites.out`); `tabs-retired` refused on `dist` | met |

### 4.4 · R-1..R-10

| row | evidence | status |
|---|---|---|
| R-1 | Q-5's default (b) + (d) built. Shipped K1 legible (208×40, one row, nothing cut) but no selected carrier in light or PRT; shipped K2 cut 4 boxes up to 24.64 / 24.86 px, silent on `dist`. The fault is named on `dist-dev` (X-5, §3.2) and refused structurally on `dist` | **open: owner Q-5** |
| R-2 | W-D 8/8 · 8/8; T-2 40/40 | met |
| R-3 | commit cells above; plant (the kick's `animation: none` on the route's own build, `logs/build-dp-pop0-src.log`, `restored kick`): T-6 migrated **33/33 → 21/33 in both engines**. The 12 that fail are exactly the commit cells on preset, specimen and F1: `pop peak 1.00 … amplitude < 0.015, no bounce`; the pointer cells read 1.01 flat. Every hover, press and Tab-entry cell still passes (`run/plant-pop0/`, `logs/t6-pop0-*.log`, load 163-180) | met |
| R-4 | `states.mjs --part hover` **18/18**, F1 **6/6**: the selected tile clears T-3's bar against a hovered sibling in light, dark and PRT (`logs/states-hover*.log`) | met |
| R-5 | K2 stroke 2.66:1 light / **1.56:1 dark**; V1 3.23 / 2.06. The stroke is decoration; the perimeter carries T-3 | met, reported |
| R-6 | 16.00 px at fine, coarse and `--ui-scale 1.25` (T-1); pills at h/2 (T-2, W-D) | met |
| R-7 | unit plants A, S, H (and V, W, P, I) fail; CANON plants A, S, H 2/3 each on their own cell | met |
| R-8 | Q-5's default: structural refusal in production (FV-2; M-4 for the corner), named on `dist-dev`. W-E `dist` 1/6 · 1/6: W-E counts only an error or a throw in production, which (b) does not give | **open: owner Q-5** |
| R-9 | §0 item 5, `logs/bundle.log` | met (stated); the rebind is Q-14 |
| R-10 | one nested block is the only `[data-shape="cell"]` selector in the sheet; every other reader derives from `--selection-tile`; the canon unit and CANON pin "exactly one rule reaches a tile"; G1 and G2 plants fail | met |

### 4.5 · E-1..E-4

| row | evidence | status |
|---|---|---|
| E-1 | every witness read every cell in both engines in one sitting at load 154-500; no hang, no stall, no NOT-REPRODUCED | met |
| E-2 | F1, V2, the sibling state, the interactive descendant in production, the keyed reorder, the deselectable single: green. **C1** T-3 0/3 in both engines | **open: owner Q-10** |
| E-3 | MIGRATION rows as in the patch. "A corner on a tile is refused in paint": `corner-refusal.mjs` **10/10** on `src` and **10/10** on `dist`, both engines (`logs/corner-refusal-*.log`): utilities, an unlayered scoped rule, an unlayered `!important` and an inline style leave the tile at 16.00 px; the control (the scoped rule on an undeclared pill) moves it; inline `!important` wins and is printed as INFO. The consumer-ARIA row's detector reads 8/8 (§3.2). The `shape` refusal, the attribute order and the port stop are pinned by unit cases that bite | met |
| E-4 | real Safari | **UNMEASURED (owner's safaridriver checkbox)** — **open: owner** |

### 4.6 · G, the gestalt

Frames: `pair/preset/` and `pair/specimen/`, light and dark × fine and coarse × Chromium and Playwright WebKit; rows `plated | flush`, columns `selected | focused-selected`. Reads for the critic to test:
- **card-like:** yes, 16 px cards at fine and coarse; the K1 tiles read as four cards, not stadiums.
- **selection without colour:** yes, a 2 px near-foreground edge, the fill 1.28-1.32:1 beside it.
- **apart from the ring:** **no.** Focused-selected paints the selected edge and the focus ring as two concentric outlines (`preset-light-fine-chromium-pair.jpg`, `specimen-dark-fine-webkit-pair.jpg`, right column). That is the register's look, Q-3's.
- **uncluttered:** flush reads as options on one surface, each tile keeping its 1 px rim; plated reads as slabs in a slab. Q-2's.
- **O-87:** no lighting layer is added; the commit is the floor's +3 % pop with a bounce.

**Status: open, owner Q-2 and Q-3.**

### 4.7 · Tally

| block | met | open (owner) |
|---|---:|---|
| T (8) | 7 | T-3 (Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 8 | R-1, R-8 (Q-5) |
| E (4) | 2 | E-2 (Q-10), E-4 (checkbox) |
| G (1) | 0 | G (Q-2, Q-3) |
| **total** | **34** | **6**, each built at its default and waiting on the owner |

No row is claimed by ruling. What would close each: Q-10 (a) closes T-3's C1 half and E-2; Q-5 (a) closes R-8 and R-1's naming half (at the cost of a production error for every undeclared multi-row option); R-1's legibility half needs the consumer migrations (E-6) or a production signal; Q-2 / Q-3 decide G; the checkbox decides E-4.

---

## 5 · For pass 4's record (no new rows now)

- The spec's three notes stand, re-seen here: the pill's `overflow: clip` halved the contrast-more and forced-colours perimeter before M-5 (no witness reads it); `crit.mjs --part tworow` is superseded by H3-3; the floor's late-name unit case is order-sensitive in happy-dom.
- **The unit suite under load.** At load 368-470 seven cases in four files failed the full run; five of them (`glass-subtlety`, `aurora/atoms`) exceed vitest's 5000 ms default on re-run and pass with a 60 s timeout, the other two pass on a plain re-run. A route close run under load should read them with `--testTimeout` or at a lower load before it calls a regression.
- **Console probes must read from page creation.** A listener attached after `openPage` misses mount-time development names (§3.2's superseded run). `P.logs` is the harness's capture from page creation.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
