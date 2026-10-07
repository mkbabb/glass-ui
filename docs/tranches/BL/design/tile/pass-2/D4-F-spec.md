# D4 · pass 2 · D4-F spec: the anatomy declares the tile

| field | value |
|---|---|
| seat | D4 pass 2, RESEARCH+SPEC seat for route D4-F. It answers REGISTRY §6.1 questions 2-5 with probes on HEAD+floor, then specs the route against §7.3 (D′ items 3, 4, 6, 9, 10, and "Every route"). It reads none of the other routes' pass-2 files (§7.4) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | checkout HEAD `ad94e27f` (the task named `04929544`; `git diff --stat 04929544 ad94e27f -- src` touches only `src/components/configurator/*` and `src/index.ts`, the 10.1.0 Configurator, no tile file). `pass-2/floor.patch` (sha1 `f1476eba`) applied clean in a detached scratch worktree. The route sketch is `D4-F-spec/D4-F-sketch.patch` (4 files, +210 / −16, sha1 `751c9d4e`), made on HEAD+floor and reverse-checked clean there |
| binding input | `D4-F-block.md`: verdict PROCEED with reading 2 (the library's `#media` and `#meta` rows decide the shape; 14/14 gating cells in both engines). This spec builds reading 2 and nothing of reading 1 |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | all under `pass-2/D4-F-spec/`: the patch; the route (`route/route.json`, `route/migrated.mjs`); the tools (`probe.mjs`, `glance.mjs`, `kick.mjs`, `build-chain.sh`, `witness-chain.sh`); the probe JSON (`runs/`); every log (`logs/`); the gestalt frames (`glance/`, 36 PNG). Builds and the worktree were in scratch only |
| machine | badly overloaded throughout: load averages 312 → 765 across the seat's runs (another session's simulator, test runners and several browser seats). Every log line carries its load. Every static cell (geometry, computed style, painted pixels, AX, keys) is a settled read and does not depend on frame timing. The commit cells are frame-timed: Chromium ran at a median frame interval of 8.3-8.4 ms and Playwright WebKit at 17-20 ms (one WebKit `single` keyboard cell at 39 ms, which passed), so no commit verdict rests on janky frames. The style-cost cell is a wall-clock timing at load 464 and is reported only |

---

## 0 · In brief

1. **Question 2, the mixed grid, is answered by a group-level `:has()`.** If any item fills `#media` or `#meta`, every item in that group is a tile, and the row stretches them to one height. K1 with `#meta` removed from items 1 and 3 paints 4/4 cells at 70.58 px in Chromium and 70.59 px in Playwright WebKit. Pill rows with no anatomy stay pills: `single`, `vertical`, `pill-icon`, `pill-badge` and `family-d-undeclared` all read 100 % pill in both engines. The block test's F1-2 misroute had a cause in the floor walk's row test. With the row-clustering fix in this patch, the mixed 2×2 walk gives the expected sequence in both engines (16/16 moves). It does so even when a consumer re-centres the row so the items have unequal heights (§2).
2. **Question 3, the paired witness, passes by construction.** On five migrated sites, removing the `#media` / `#meta` rows from live DOM turns every cell into a pill at h/2 on its rung. The attributes of the group and of every item are byte-identical before and after. 10/10 in both engines (§3).
3. **Question 4, the unmigrated consumer.** The floor's no-wrap law plus this patch's `max-block-size` clamp keep HEAD's K1 and K2 markup at the rung (204×40, 207×36 stadiums). The pass-1 lozenge is gone. With no anatomy, though, the consumer's own `flex-col` stacks two rows inside 40 px, and the frames show sheared, unreadable text (`glance/chromium-preset-light.png`). T-3 reads 0 px² on that arm in every mode, as it must for a pill (Q-10 b). The migrated arms clear T-3 in all 27 gating cells per engine: five sites plus four H-3 surgeries, in light, dark and PRT. The spec closes the shear with a production row-lock, measured by injection (§4.3, R-1).
4. **Question 5, the comfort axis.** Every migrated tile holds 16.00 px past its rung at fine, coarse and `--ui-scale 1.25`, in both engines: 15/15 per engine through T-1's own `cornerStory` / `judgeT1`. On the preset tile at coarse that is 0.39 of h/2 (204×81.81), where A1 painted 30 px at 0.97. Pills stay at h/2 on both axes (8/8 per engine) (§5).
5. **D′ items 3, 4, 6 and 9 are met on the probes, and item 10 is measured.**
   - The commit: a model-keyed impulse kick, peak 1.03-1.04 then a bounce under the settle, on keyboard, programmatic and pointer commits. Tab entry moves nothing. 12/12 per engine on H-4's own `commitBar`. Reduced motion zeroes the kick.
   - Hover: the hover moves 8-90 % of pixels. The selected tile still separates from a hovered sibling at 2-3.6× the bar.
   - Ink: the state ink reaches the media stroke, and `--selection-tone` reaches the edge, the tint and the media ink. There is no consumer `[data-state]` rule.
   - The refusal: DEV names 4 / 8 / 5 misuses exactly, and the production builds (`src`, `dist`) name nothing and refuse structurally.
   - The datum: `dist` grows +3,661 B (+245 B JS gzip-9).
   - Probe tallies: Chromium 75/76 gating (the one FAIL a screenshot timeout, re-run 27/27), Playwright WebKit 102/102, DEV guard 22/22, `dist` guard 22/22 (§6).
6. **The full H2 battery under `--route` is owed, not banked.** T-2 is 22/22 in both engines. T-7 Chromium is 22/24: F1's migration keeps a consumer border (R-2b). T-1, T-5 and T-7 WebKit each hit the 1,500 s deadline at load 334-733 without printing a verdict, and T-3, T-4 and T-6 were not reached (§7). §8 names the open defects. The main ones are the unmigrated shear (R-1), C1's one-row migration failing T-3 under Q-10 (b) (R-2), F1's sibling-state border (R-2b) and no mark at `sm` (R-3).

---

## 1 · The mechanism

Line numbers are in the patched tree (HEAD+floor+`D4-F-sketch.patch`).

### 1.1 · Anatomy, in `src/components/toggle-group/ToggleGroupItem.vue`

- `:36-44` `defineSlots` adds `media` (a row above the label: a glyph, a thumbnail, a stage) and `meta` (a row below it: a readout, a description).
- `:143` and `:145`: each slot renders only when used, in a library-marked wrapper, `<span class="toggle-group__media">` and `<span class="toggle-group__meta">`. The default slot stays the label. No prop. No `shape`.
- `:86-89`: `committed` is set when `selected` goes from `false` to `true`, never at mount. `:135` stamps `data-commit` on the item's own `<button>`, and `:140` clears it on `animationend.self`. The kick is therefore keyed on the model. It does not fire on focus or on pointer contact, so C-1 (a pop on Tab entry and none on a programmatic commit) cannot occur. No slot re-renders for it (X-3).
- `:94-120`: the DEV names, under `import.meta.env.DEV`, one frame after mount:
  - "holds a second row in its default slot" for a non-tile item laid out as a column, or with a child box outside the plate;
  - "holds an interactive descendant".

  Vite strips both from the library build: 0 of 837 `dist` files carry the text (`logs/unit-tsc-datum.log`).

### 1.2 · The shape and the register, in `src/components/toggle-group/styles.css`

- `:92-97` (the pill): the floor's one-line law plus `max-block-size: var(--toggle-group-item-size)`. A pill is one rung tall whatever its content or a consumer class asks for.
- `:126-157` (the tile): the group-level selector `.toggle-group:has(.toggle-group__media, .toggle-group__meta) .toggle-group__item` and the per-item selector `.toggle-group__item:has(> .toggle-group__media, > .toggle-group__meta)` (an item outside a group) set:
  - `--selection-perimeter: 1` (the floor's switch);
  - `border-radius: var(--radius-field)` (TF-1, Q-1 a);
  - a column with start alignment;
  - lifting the clamp and the no-wrap law: `max-block-size: none`, `white-space: normal`, `overflow: visible`;
  - body leading, `padding-block: 0.625rem` and `text-align: start`.

  `:134-136`: the same group selector sets `align-items: stretch`, so every tile in a flex row takes one height.
- `:159-166`: `.toggle-group__media` spans the tile (`align-self: stretch`), and its `color` is `var(--selection-ink)`. That is `currentColor` at rest (`:111`) and the edge ink when on (`:319`). A stroke of `currentColor` follows the state (X-2).
- `:168-177`: the meta row is muted at rest and `--foreground` when on (B's meta ink lift).
- `:179-205` (the mark): on `::after` (the perimeter holds `::before`), at `md` and `lg` only, a 1 rem check in `--selection-edge`, top-inline-end. It fades in and springs from 0.4 to 1 on `--spring-press`. It is the carrier that is neither a colour nor an outline (Q-3 b's mark), so a focused unselected tile and a selected one read apart (`glance/chromium-preset-migrated-light-focus-unselected.png`: grey offset ring against a dark edge, a tint and the check).
- `:207-249` (the kick): `.toggle-group__item[data-commit]` runs `toggle-group-commit`, 450 ms, on an inline `linear()`. The curve is a spring's impulse response at ζ 0.5 (`kick.mjs 0.5 24`): it leaves 0, peaks at 1 at 16.7 %, crosses 0 at 50 % and dips to −0.163 at 66.7 % before returning to 0. The keyframe is `to { transform: scale(calc(1 + 0.045 * var(--motion-weight, 0.618))) }`, so the item pops about 2.8 % above its rest, bounces about 0.45 % under it, and lands where it stood. It rides `transform`, so it composes with `.glass-capsule-hover`'s `scale` and `.tap-squish`'s `scale`. Reduced motion takes `--motion-weight` to 0, and the amplitude goes with it.
- `:311-328`: the on-state tint reads `var(--selection-tone, var(--foreground))` at 12 % (16 % on hover), so X-7's tone reaches the tint as well as the edge.
- Unchanged from the floor: the perimeter `::before` (`:251-275`), the invalid grammar on `border` (`:339-341`), the hover on the plate's own layer (`glass/control-surfaces.css`, TF-8).

### 1.3 · The walk, in `src/components/tabs/composables/useTabRovingFocus.ts`

`:156-193` `rowNeighbour`:
1. The candidates are the enabled items that start past the origin's centre line in the pressed direction (the floor's test, kept).
2. The adjacent row is the nearest candidate, together with every candidate whose block extent holds that one's centre line, or whose centre line it holds.
3. The nearest inline centre wins.

The floor's version took the strictly nearest gap first. In a centred row of unequal heights, a short item in the next row starts before a tall one, so Down skipped to the diagonal (F1-2). `tests/components/custom/tabs/roving-grid.test.ts` gains the case "a short item centred beside a tall one is still that row" (the four moves on stubbed rects). The suite and `ToggleGroup.test.ts` / `radius-role-canon.test.ts` run 65 passed plus 1 expected fail across the 3 files with `--testTimeout 120000` (`logs/unit-tsc-datum.log`, load 437-521). The first run at the default 5 s timed out one case, the keyed-reorder test, at load 312-362, and it passed on the re-run. That is a load timeout, NOT-REPRODUCED. `vue-tsc --noEmit` (src and demo) exits 0.

### 1.4 · What does not change

The engine (`useSelectionGroup`), the ARIA contract (`radiogroup` / `radio` / `aria-checked`, or `aria-pressed` for `multiple`), the chassis classes, the floor's perimeter, ring and hover. The block test's §9 reading holds: one item serves two content models, and only geometry and the switch differ.

---

## 2 · Question 2 · the mixed grid

`probe.mjs --only q2` (`logs/probe-f-src-{chromium,webkit}.log`; Chromium load 332, Playwright WebKit 437-513). All cells are static or real key presses.

| cell | Chromium | Playwright WebKit |
|---|---|---|
| K1 migrated, `#meta` removed from items 1 and 3 | **PASS** cell 4/4, heights 70.58 ×4, 16px→16, perimeter 1 on all | **PASS** 70.59 ×4 |
| mixed 2×2 walk, all 16 moves (Q-4 b) | **PASS** `0R→1 0L→3 0D→2 0U→3 1R→2 1L→0 1D→3 1U→0 2R→3 2L→1 2D→3 2U→0 3R→0 3L→2 3D→0 3U→1` | **PASS** identical |
| the same row centred by the consumer (heights 70.6 / 43.4) | **PASS** 1D→3, 3U→1, 0D→2, 2U→0 | **PASS** identical |
| `single`, `vertical`, `pill-icon`, `pill-badge`, `family-d-undeclared` (no anatomy) | **PASS** pill 4/4, 4/4, 3/3, 3/3, 4/4 at h/2, perimeter 0 | **PASS** identical |
| live flip: a `.toggle-group__meta` appended to `single` #0, then removed | **PASS** the whole group 36 → 66.3 px at 16px, then back to 36×36 at 9999px | **PASS** identical |

The group rule answers "a stadium beside a card" (W §7): the one-row option becomes a shorter card's worth of content at the card's corner and height. The centred-row cell exercises the walk fix. Without it, the floor's walk reproduces F1-2 on that geometry (the block test's `mixed-keys.mjs` read 1D→2, 3U→0 on the floor walk, `D4-F-block/logs/mixed-keys.log`).

## 3 · Question 3 · the paired witness

`probe.mjs --only q3`. One live page per site: read with rows, remove every `.toggle-group__media` / `.toggle-group__meta` wrapper, wait one frame, read again, and compare every attribute of the group and the items except `tabindex` and the harness's `data-th-idx`.

| site | rows present | rows removed | attributes | Chromium · Playwright WebKit |
|---|---|---|---|---|
| `preset-migrated` | cell 4/4, 204×70.58, 16px | pill 4/4, 204×40, 9999px→20 | identical | PASS · PASS |
| `specimen-migrated` | cell 8/8, 205×98.16 | pill 8/8, 205×36, →18 | identical | PASS · PASS |
| `strip-migrated` | cell 6/6, 40×58.8 | pill 6/6, 36×36, →18 | identical | PASS · PASS |
| `f1-migrated` | cell 6/6, 74×91.48 | pill 6/6, 50.86×40, →20 | identical | PASS · PASS |
| `v2-migrated` | cell 4/4, 452×106.34 | pill 4/4, 452×40, →20 | identical | PASS · PASS |

H-2's own pair (`family-d-undeclared`, two spans in the default slot, no declaration) stays a pill: T-2 22/22 in both engines under H2 (`logs/T-2-f-src-{chromium,webkit}.log`, load 338-344). F passes the pair by construction. The shape changes only when the anatomy changes.

## 4 · Question 4 · the unmigrated consumer

### 4.1 · Corner and T-3, unmigrated beside migrated

`probe.mjs --only q4`. In Chromium, the first run lost one cell to a 30 s screenshot timeout at load 410. The re-run with per-cell retries is `logs/probe-f-src-chromium-q4.log` (load 442 → 765, 27/27). The Playwright WebKit numbers are in `logs/probe-f-src-webkit.log` (load 513-544; PRT is the forced level-0 path). px² of ≥ 3:1 against the bar, light / dark / PRT.

| arm | corner (both engines) | T-3 Chromium | T-3 Playwright WebKit |
|---|---|---|---|
| `preset` (library, HEAD markup) | pill 4/4, 204×40, 9999px→20 | 0 / 0 / 0 vs 244 (fill 1.20 / 1.23 / 1.00) | 0 / 0 / 0 |
| `preset-verbatim` (shipped) | 208×40 at the consumer's 16px | 0 / 233.00 / 0 vs 248 | 0 / 217.00 / 0 |
| `specimen` | pill 8/8, 207×36 →18 | 0 / 0 / 0 vs 243 | 0 / 0 / 0 |
| `specimen-verbatim` | 207×36 at 16px | 456.00 / 466.00 / 458.00 (the consumer's outline) | 591.25 / 603.50 / 595.50 |
| **`preset-migrated`** | cell 4/4, 204×70.58 | **891.00 / 903.75 / 891.75** vs 274 | **981.50 / 991.50 / 981.25** |
| **`specimen-migrated`** | cell 8/8, 205×98.16 | **573.00 / 583.00 / 573.00** vs 303 | **572.00 / 583.00 / 571.00** |
| **`strip-migrated`** (V1 onto ToggleGroup) | cell 6/6, 40×58.8 | **317.00 / 329.00 / 317.00** vs 98 | **321.00 / 328.00 / 318.00** |
| **`f1-migrated`** (F1 onto ToggleGroup) | cell 6/6, 74×91.48 | **327.75 / 337.75 / 335.75** vs 165 | **335.00 / 338.00 / 335.50** |
| **`v2-migrated`** (N-of-M, Q-7 a) | cell 4/4, 452×106.34 | **1781.75 / 1791.25 / 1780.75** vs 558 | **1991.00 / 2000.50 / 1988.25** |
| H-3 on `preset-migrated`: invalid · sibling · translucent tone · unresolvable tone | — | **882.75 · 553.25 · 864.25 · 891.00** (light); dark 567.75 · 557.25 · 891.75 · 903.75; PRT 884.75 · 555.75 · 872.75 · 891.75 | light 974.00 · 553.50 · 966.00 · 981.50; dark 567.50 · 556.00 · 978.00 · 991.50; PRT 973.75 · 553.25 · 966.25 · 981.25 |
| `c1-migrated` (one-row pills) | pill 5/5, 184×40 | 0 / 0 / 0 vs 224 (reported here; see R-2) | 0 / 0 / 0 |

Gating cells: 27/27 in each engine. The fill stays 1.00-1.24:1 in every cell, and the perimeter band carries the state, as TF-2 says. Under the invalid group in dark the band falls to about 512 px² against 839 at rest, because the destructive `border` sits under the layer. It still clears at about 2.1× the bar.

### 4.2 · What the unmigrated consumer paints

The clamp holds HEAD's markup to the rung, so neither K1 nor K2 paints the pass-1 lozenge (61.58 / 100.16 px at h/2). That is not enough. The consumer's `flex-col` on the item stacks the name and the readout inside 40 px, and the frames show both lines sheared (`glance/chromium-preset-light.png`, `chromium-specimen-light.png`). It is visibly broken, so it is not a silent defect, but it is not a design either.

### 4.3 · The row-lock (measured by injection, carried as R-1)

`glance.mjs` injects one production rule: `.toggle-group:not(:has(.toggle-group__media, .toggle-group__meta)) .toggle-group__item { flex-direction: row; flex-wrap: nowrap }` (it uses `!important` only because the consumer's utility class sits in a later layer). The same scenes, `logs/glance.log`:

| scene | clamp alone | clamp + row-lock | both engines |
|---|---|---|---|
| `preset`, `preset-verbatim` | 2 rows inside 40 px, sheared | 1 row, items with two rows 4/4 → 0/4; labels ellipsize (`glance/chromium-preset-rowlock.png`: "Smooth 0.5 s · ζ 1", "Sna… 0.35 s · ζ 0…") | identical |
| `specimen`, `specimen-verbatim` | 2 rows, 8/8 | 1 row 8/8; the stage leaves the plate inline on 1 item | identical |
| `pill-icon`, `pill-badge`, `single`, `vertical`, `c1-migrated`, `preset-migrated`, `specimen-migrated` | unchanged | unchanged | identical |

The row-lock makes the unmigrated consumer a legible one-line pill that says "this content wants `#meta`". The DEV name says the same in words. The spec adopts it (§9 item 1). It is the pill law applied in full, a structural refusal under Q-5 (b), not a fallback: the tile is never faked. The rows were not rebuilt into the sketch at this load, so the patch carries the clamp only and R-1 stays open until the prototype measures the rule in its source position.

## 5 · Question 5 · the comfort axis

`probe.mjs --only q5`, T-1's own `cornerStory` (one and two appended lines, framed) and `judgeT1(…, "tile")` (the bound is the root's `--radius-field`).

| site | fine | coarse (rung) | `--ui-scale 1.25` (rung) | Chromium · Playwright WebKit |
|---|---|---|---|---|
| `preset-migrated` | 70.58 → 116.92 px, 16.00 throughout | 60: 81.83 → 150.67, 16.00 (÷h/2 0.39 → 0.21) | 50: 76.09 → 133.47, 16.00 | PASS · PASS |
| `specimen-migrated` | 98.16 → 134.47, 16.00 | 54: the same | 45: the same | PASS · PASS |
| `strip-migrated` | 58.80 → 80.39, 16.00 | 54 | 45 | PASS · PASS |
| `f1-migrated` | 91.48 → 126.45, 16.00 | 60 | 50 | PASS · PASS |
| `v2-migrated` | 106.34 → 152.22, 16.00 | 60: 117.83 → 186.67 | 50 | PASS · PASS |
| pills (`single`, `pill-icon`, `pill-badge`, `c1-migrated`) | — | 54×54 →27; 93.09×60 →30; 111.91×60 →30; 209.94×60 →30 | 45 →22.5; 50 →25 | 8/8 · 8/8 |

The block test's F1-5 (V1's 16 px on a 40 px-wide tile is 0.80 of w/2) still reads that way on `strip-migrated`'s first box, 40×58.80 (÷h/2 0.54, ÷w/2 0.80). That belongs to Q-1, and the number is the ruled `--radius-field`.

---

## 6 · §7.3: the D′ items F owes

### Item 3 · the commit arm (H-4)

`probe.mjs --only commit`. It uses H-4's own `sampleOver` and `commitBar`, re-runs a failing janky cell, and prints the median frame interval and the load.

| scene | Tab entry | keyboard (ArrowRight, pointer never moved) | programmatic (focus on the sentinel) | pointer (click) |
|---|---|---|---|---|
| `preset-migrated` | PASS 0.00 motion · PASS 0.00 | PASS peak 1.03 at 118 ms, trough 1.00 below settle 1.00 · PASS 1.03 at 80 ms | PASS 1.03 at 111 ms · PASS 1.03 at 88 ms | PASS 1.04 at 147 ms, settle 1.01 (the hover lift) · PASS 1.04 at 158 ms |
| `specimen-migrated` | PASS · PASS | PASS 1.03 at 81 ms · PASS 1.03 at 97 ms | PASS 1.03 at 102 ms · PASS 1.03 at 96 ms | PASS 1.04 at 194 ms · PASS 1.04 at 145 ms |
| `single` (a pill) | PASS · PASS | PASS 1.03 at 84 ms · PASS 1.03 at 103 ms (median 39 ms) | PASS · PASS 1.03 at 150 ms | PASS · PASS |
| reduced motion, `preset-migrated` programmatic | scale range 0.0000 · 0.0000: no pop; the perimeter and the mark carry it | | | |

Cells are Chromium · Playwright WebKit. Each commit line also prints the paint window: the perimeter and tint arrive at 7-85 ms and settle by 188-340 ms. The kick is shared by pills and tiles (one item, one register).

The witness, `commitBar`, cannot tell this from D-1's ideal and does not try. The gestalt read in §10 is where the commit is judged against iOS 27.

### Item 4 · hover on the plate layer, measured against the selected state

`probe.mjs --only hover`:
- The hover light cell (scale pinned), unselected #0: 83.28 / 89.30 % (`preset-migrated` light / dark) and 8.14 / 90.28 % (`specimen-migrated`) in Chromium; 87.55 / 88.63 % and 77.52 / 90.15 % in Playwright WebKit. The floor's TF-8 hover on `--glass-defined-plate` is untouched.
- Against the selected state: the selected tile against a **hovered** unselected sibling (`:hover` true, ink hidden). Its ≥ 3:1 area is 881.75 / 892.50 px² against a bar of 274 (`preset`) and 567.00 / 568.00 against 303 (`specimen`) in Chromium. In Playwright WebKit it is 977.00 / 981.00 and 567.00 / 568.00. Hover and selection are on separate channels (plate image layer against the perimeter layer and the mark), so the D′ 1.11× collision cannot recur.

### Item 6 · X-2 and X-7, the state ink and the tone

`probe.mjs --only ink`. The migrated `css` for K2, V1 and F1 sets the stroke to `currentColor` and holds no `[data-state]` rule. The probe counts such rules in the migrated arm: 0 on every site.

| site | media stroke, on / off | edge | tint | with `--selection-tone: oklch(0.62 0.2 300)` on the group |
|---|---|---|---|---|
| `specimen-migrated` | `oklch(0.216 0.006 56)` / `rgb(112 89 66)` | = the stroke | `oklab(0.216 … / 0.12)` | stroke = edge = `oklch(0.42 0.2 300)` (floored); tint `oklab(0.62 0.1 −0.17 / 0.12)` |
| `strip-migrated` | the same / `rgb(124 102 80)` | = | = | the same |
| `f1-migrated` | the same / `rgb(112 89 66)` | = | = | the same |

All 6/6 per engine. The tone reaches edge, tint and media ink (X-7). The label ink stays the foreground for legibility. A consumer that wants the label in the tone reads `--selection-ink`.

### Item 9 · the refusal per Q-5, its production arm measured on `dist` (H-9)

The pass-2 default is Q-5 (b) plus (d). `probe.mjs --only guard` reads every scene in three flavours:

| flavour | what names the misuse | what refuses it | cells, Chromium · Playwright WebKit |
|---|---|---|---|
| `src-dev` | `preset` 4 "second row", `specimen` 8, `preset-input` 4 + 1 "interactive descendant"; every migrated and pill scene 0 | the clamp: every unmigrated item is a pill at its rung | 11/11 · 11/11 |
| `src` | nothing | the same clamp; the floor's editable-descendant rule keeps ArrowRight in the `<input>` | 11/11 · 11/11 |
| `dist` (as a consumer installs it) | nothing; the DEV text is in 0 of 837 dist files | the same | 11/11 · 11/11 |

Q-5 (d), a `development` export condition so a consumer's dev server would see the names, is not built: the floor's FL-1 stands, and `developmentConditions` reads 0 on `f-dist` (`out/builds/f-dist/build.json`, reported in `logs/build.log`). Without (d), the names reach the library's own dev and test builds only. The production answer is structural, and with R-1's row-lock it is legible.

### Item 10 · the bundle datum (PF-4), as its own ruled row

`logs/unit-tsc-datum.log`, measured as FLOOR.md measured, in the one worktree at load 431-526:

| build | `dist` files | bytes | JS gzip-9 (concatenation) | CSS bytes | toggle-group JS / CSS |
|---|---|---|---|---|---|
| HEAD+floor (`ad94e27f`) | 837 | 2,537,228 | 276,900 | 460,038 | 3,892 / 43,267 |
| HEAD+floor+F | 837 | **2,540,889 (+3,661)** | **277,145 (+245)** | 462,705 (+2,667) | 4,392 (+500) / 45,934 (+2,667) |

The inline `linear()` (25 stops) and the mark's data-URI mask make up most of the CSS growth. G-BUNDLE-RATCHET reads the packed tarball's unpacked bytes against `.bundle-ratchet` (2,919,057) and was not run. The landing moves the datum by about these numbers, and that wants the owner's row.

---

## 7 · The H2 battery under `--route` (owed)

`witness-chain.sh` runs each witness alone, after the seat's probes leave the harness lock. The first attempt queued T-1 behind a 28-minute probe and died on the deadline without opening a page (`logs/aborted-battery-lock-wait.log`).

| witness | Chromium | Playwright WebKit | load |
|---|---|---|---|
| T-2 | **PASS 22/22** [library 22/22] | **PASS 22/22** | 344 · 338 |
| T-1 | HARNESS ERROR: no verdict within 1,500 s | the same | 733 → 460 · 460 → 378 |
| T-5 | HARNESS ERROR: no verdict within 1,500 s | the same | 338 → 408 · 408 → 369 |
| T-7 | **FAIL 22/24** [unmigrated 4/27 · migrated 22/24]. The two FAILs are `f1-migrated` rest and hover: the route's own migration keeps F1's `is-bound` sibling state as a consumer `border-color` (`route/migrated.mjs`, f1 css), and T-7 rightly reads that as consumer paint (`runs/T-7-chromium.json`) | HARNESS ERROR: no verdict within 1,500 s | 401 · 401 → 354 |
| T-3, T-4, T-6; W-E and T-5 on `f-dist` | not reached: the seat stopped the chain at close (02:0x, load 334-483) | | |

T-1 prints nothing until its verdict, so the stall cannot be placed. At these loads, a witness that walks every scene in three comfort cells did not finish inside the deadline. That is not a reading of the route. The probes cover T-1's own measure on the migrated arms (§5), T-3's own measure (§4.1), T-5's arrows (§2), T-6's commit bar (§6 item 3) and the guard (item 9). The route prototype owes the full battery, with both the unmigrated and the migrated arms tallied, on an unloaded machine.

---

## 8 · Risks and open defects

| id | risk | measured | the spec's answer |
|---|---|---|---|
| R-1 | The unmigrated consumer shears two rows inside the rung (§4.2) | frames; the row-lock fixes 4/4 and 8/8 by injection, in both engines (§4.3) | land the row-lock in `styles.css` beside the clamp; the prototype re-measures it in source |
| R-2 | **C1 migrated onto ToggleGroup is one-row pills, which carry state on ink and weight (Q-10 b); T-3 with ink hidden reads 0 px² against 224, in all three modes, in both engines.** C1 gates T-3 in H2, so this is a FAIL the route owns | §4.1, last row | C1 is a one-row radio list, not a tile. Two honest answers, for the owner's Q-10: (a) the perimeter on pills too, or (b) Q-10 (b) holds, and C1's gating T-3 cell reads the pill's ink-and-weight register. Building (a) is one line (`--selection-perimeter: 1` on the pill), and it puts the edge on every selected pill in the library, which is the reason Q-10's default is (b) |
| R-2b | F1's `is-bound` (a sibling state: the level's endpoints) stays a consumer border in the route's migration, so T-7 FAILs `f1-migrated` 2/24 in Chromium. It is X-1's case: the sibling state survives under the perimeter (H-3 `sibling` passes T-3), but nothing in the library expresses it | §7, `runs/T-7-chromium.json` | F1 moves its bound mark into `#meta` content (a glyph or a word), which is content, not paint; the prototype re-migrates and re-runs T-7 |
| R-3 | No mark at `sm` (`specimen-migrated` relies on the edge and tint alone, `glance/chromium-specimen-migrated-dark.png`). There the selected edge is closest to the ring's look (E-crit CX-11) | frames only | the gestalt critic rules whether `sm` needs the mark, at a smaller size |
| R-4 | Selector reach: one group `:has()` and one item `:has()` on every ToggleGroup | Chromium, 200 tiles, 40 forced style and layout passes per round, 9 rounds: min 9.9 / median 12.5 ms with `:has()` against 8.8 / 12.8 ms with the same rules keyed on a class, a 1.13 ratio of minima at load 464. Playwright WebKit read 0.0 ms in both arms (its timer resolution), so that cell is UNMEASURED | no cost the measurement can separate from load in Chromium; re-time on an idle machine |
| R-5 | A consumer `div` wrapper between the group and the items keeps the group rule (it is a descendant `:has()`) but loses the flex stretch | K2's family sections stretch through the consumer's own grid | the consumer's layout is the consumer's (X §4.1 G) |
| R-6 | `animationend.self` clears `data-commit`. An item unmounted mid-kick takes the attribute with it. A second commit within 450 ms on the same item does not re-trigger, because the attribute is already set | reasoned, not measured | the prototype reads a double commit on one item |
| R-7 | Q-9: `accessibility.css` still widens `[data-state="on"]` to a 2 px border under contrast-more and forced colours, which moves layout by 1 px (PF-3) | not re-measured | exempt the tile selector there, in the same `:has()` form (FL-2 names the route as the owner) |
| R-8 | Real Safari | UNMEASURED (owner's safaridriver checkbox) in every cell, including `:has()` invalidation on slot change and the inline `linear()` | owner |

---

## 9 · What the prototype builds, in order

1. `D4-F-sketch.patch` as it stands, plus R-1's row-lock in `styles.css` next to `:92-97`.
2. The route's migrations, as `route/migrated.mjs`:
   - K1: the readout goes to `#meta`;
   - K2: the stage goes to `#media`, and the stroke becomes `currentColor`;
   - V1 and F1 onto ToggleGroup: the glyph goes to `#media`;
   - V2 onto ToggleGroup `type="multiple"`: thumbnail, name and count;
   - C1 onto ToggleGroup vertical.

   Every item class that paints, and every `[data-state]` rule, is deleted.
3. The canon re-points:
   - `radius-role-canon.test.ts:568` keeps the pill's stadium;
   - a new paint-pinned row asserts the tile corner through the `:has()` form;
   - `ToggleGroup.test.ts` adds the slots' render, the `data-commit` lifecycle (mount stamps nothing, a model change stamps once), and the row-lock.
4. The full H2 battery with `--route`, both engines, plus `dist` for W-E and T-5's descendant cell (§7).
5. The demo story `demo/stories/forms/toggle.vue` gains a tile section built from the slots.

## 10 · Gestalt read (for the critic; frames in `glance/`)

From the 36 frames, with the owner's O-87 bar (flatter, refined, no lighting layers):
- **Card-like.** The K1 tiles read as four quiet 16 px cards on the host plate. K2's specimen grid reads as a gallery of cards, and its section heads stay outside the tiles.
- **The selection.** It is a darker plate, a dark 2 px edge and the check: three carriers. Without colour it is unmistakable by the check at `md`. At `sm` it is the edge and plate only (R-3).
- **Apart from the ring.** The focus ring sits 2 px off the plate, thin and grey, while the selection is inside the plate. Focused-and-unselected against selected reads apart in both modes. Selected-and-focused shows the ring outside the edge, a doubled boundary the critic should judge.
- **Uncluttered.** The patch adds one layer (the mark) and no lighting: no glow, no shadow, no bevel. The kick is motion that carries state.
- **iOS-27 grade.** The commit is a 3 % pop with a bounce. There is no glide (Q-11 (a) holds for this route). Whether a pop alone meets the bar is the owner's and the critic's call; the H-4 cell passes it.

## 11 · MIGRATION.md rows

Under "Unreleased", after the floor's rows:

_`<ToggleGroupItem>` gains `#media` and `#meta`, and a two-row default slot becomes one row_

A tile is an item with a row above or below its label. Put the row above the label in `#media` (a glyph, a thumbnail, a stage) and the row below it in `#meta` (a readout). The item is then a card-cornered tile with the selected perimeter and a check mark. Every item in the group takes that shape and one height. A default slot holding two rows stays a pill: it is one rung tall and lays its content out in one row, clipped with an ellipsis. In development the item names it with a console error. Delete the item classes that shaped the tile by hand (`flex-col`, `rounded-*`, `leading-*`, padding) and any `[data-state="on"]` rule on its media. A stroke of `currentColor` inside `#media` follows the state, and `--selection-tone` on the group or an item tints the edge, the plate and the media. Detector: `rg '<ToggleGroupItem[^>]*class="[^"]*(flex-col|rounded-)'` and `rg '\[data-state="on"\][^{]*(path|svg)'`. The consumer sites at their HEADs:
- keyframes.js `demo/scenes/spring/SpringPhysicsFacet.vue:106` (K1, readout to `#meta`) and `demo/components/EasingCatalogue/EasingCatalogue.vue:57` (K2, stage to `#media`);
- fourier-analysis `BasisSelector.vue:149,158`, `FunctionInput.vue:202,234`, `GallerySearchBar.vue:182`, `TierControl.vue:43` and `NotationPills.vue:32` (one-row pills; unchanged unless a label sits beside a glyph span in a second row);
- value.js `SearchFilterBar.vue:41` (one-row; unchanged).

V1, V2 and F1 are not ToggleGroup sites today: their move onto it is each consumer's own tranche (E-6).

_Behaviour and paint, nothing to change_
- A commit runs a short pop on the chosen item. It runs on a model change from any source, never on focus, and it is still under reduced motion.
- Up and Down in a row of unequal heights reach the item in the adjacent row, not the diagonal one.
- The selected tint follows `--selection-tone`.

No binding is retired, so no E-11 guard is owed. The `<Chip shape="cell">` and `<Card selected>` rows are the floor's.

## 12 · Durable records

- `D4-F-spec/D4-F-sketch.patch`
- `route/`
- `probe.mjs`, `glance.mjs`, `kick.mjs`, `build-chain.sh`, `witness-chain.sh`
- `runs/probe-f-src-{chromium,chromium-q4,webkit,dev-guard}.json`, `runs/probe-f-dist-guard.json`, `runs/T-2-{chromium,webkit}.json`, `runs/T-7-chromium.json`
- `logs/` (build, unit, typecheck and datum, probes, glance, witnesses)
- `glance/*.png`

The worktree, the scene builds and the library `dist` lived in scratch and were removed at close.
