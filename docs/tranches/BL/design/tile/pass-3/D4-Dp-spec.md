# D4 · pass 3 · D4-D′ · spec: the declared cell, on floor v2

| field | value |
|---|---|
| seat | D4-D′ spec, pass 3. Answers the route's open rows from REGISTRY §P2-3.1 with probes on HEAD + floor v2 under H3, and specifies the route against the fixed 40-row checklist (§P2-6.3). Read no other route's pass-3 file. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | The task names `8d911018`. The seat built at `00f191d8` in a clean detached worktree (`.claude/worktrees/bl/D4/p3/D4-Dp-spec/wt`, now removed). `git diff --stat 8d911018 00f191d8 -- src package.json tests MIGRATION.md` is empty. `floor-v2.patch` (sha1 `b04a83be…`) was applied first, then `D4-Dp-spec/route.patch` |
| patch | `D4-Dp-spec/route.patch`, relative to HEAD + floor v2, sha1 `e7645ff2…`. It touches 12 files: 10 changed and 2 added (+342 / −25 by `git apply --numstat`). It is built by `probes/make-patch.sh`, which diffs each file against HEAD's copy with floor v2 applied in a scratch tree, so the patch never reaches into the checkout |
| harness | H3 `9fd4983bc6b9`, printed in every run log and JSON. Harness files unedited |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** (`run/dp-src/T-8-both.json`: "You must enable 'Allow remote automation'") |
| sittings | The seat ran twice. **Sitting 1** (2026-10-08 21:0x-22:4x) built the patch and ran the whole H3 battery: `run/dp-src/`, `logs/battery-dp-src.log`. **Sitting 2** (2026-10-09 11:2x-12:0x, after the session restart) found two open cells and fixed them: H3-7 (containment) and R-10 (one spelling). It then re-ran every witness and probe those fixes could touch, plus the cells sitting 1 lost to hung processes: `run/p3b-src/`, `logs/p3b-*.log`, driver `run-p3b.sh`. The nesting change leaves `dist/glass-ui.css` byte-identical to the flat inset-0 build (`logs/p3b-nesting-css-identity.log`), so sitting 2's T-3 run reads the shipped CSS |
| machine | Shared. Sitting 1 ran at load 15-140, peaking at 532-713 at its end. Sitting 2 ran at load 223-698. Every log's first and last lines carry the 1-min / 5-min / 15-min load average. Sitting 1 had three runs hang at load 488-713 and killed them itself (T-5 `dist` Chromium and Playwright WebKit, one T-3 variant), recorded in their logs; sitting 2 re-ran each to completion. The T-6 timings come from sitting 1's battery at load 26-69: no janky frame, no re-read (Chromium median frame 8.30 ms, Playwright WebKit 10-12 ms). Sitting 2's runs are static reads (paint, geometry, computed style, AX, console), except the R-3 plant (§2, R-3) |
| records | Every number below cites a file under `pass-3/D4-Dp-spec/`: `route.patch`; `route/` (`route.json`; `migrated.mjs`, six migrated sites: preset, specimen, strip, f1, v2, c1); `run/dp-src/*.json` (sitting 1, all witnesses); `run/p3b-src/T-3-*.json`; `logs/`; `probes/` (`make-patch.sh`; `unit-plants.sh`; `unit-bites.sh`; `ocm-support.mjs`; `corner-refusal.mjs`; `states.mjs` and `crit.mjs`, the pass-2 shared instruments copied unchanged); `pair/{preset,specimen}/` (the H3-13 glance pair, 16 frames and `pair.json`). Builds and captures stayed in scratch |

Tallies: `node ../harness/tally.mjs D4-Dp-spec/run/dp-src [--scenes] [--fails]`. Rendered as `logs/tally-dp-src.md` and `logs/tally-dp-src-scenes.md`.

---

## 0 · In brief

1. **On floor v2 the route is small.** It needs one prop, one nested CSS block and three fixes the floor left open:
   - `shape: "pill" | "cell"`, refused through the floor's `refuseUnknown` when unknown;
   - the nested block sets the tile fact (`--selection-tile: flush`) and the tile's corner, column, pad pair and leading;
   - the engine's attributes now win over a consumer `role` / `tabindex` (H3-12, FV2-2);
   - FadingScroll is a tab stop only while its content holds none (pass 2's T-5 row, TF-6);
   - the selected perimeter sits inside the padding box, so paint containment no longer halves it (H3-7).

   Everything else follows from the floor's tile fact: the pill's one-row law, the plate, the perimeter, the names, the Q-9 exemption and the kick.
2. **Migrated arm, every gating cell, both engines:**

   | witness | Chromium | Playwright WebKit |
   |---|---|---|
   | T-1 | 15/15 | 18/18 |
   | T-2 | 40/40 | 40/40 |
   | T-3 | 40/43 | 40/43 |
   | T-4 | 24/24 | 24/24 |
   | T-5 | 38/38 (`dist` 38/38) | 38/38 (`dist` 38/38) |
   | T-6 | 33/33 | 33/33 |
   | T-7 | 24/24 | 24/24 |
   | T-8 (one run) | 27/27 | (same run) |
   | W-D | 8/8 | 8/8 |
   | CANON | 3/3 | 3/3 |

   The three T-3 misses are C1, a one-line pill row that Q-10's default (b) leaves without a perimeter.
3. **Pass 2's twelve open rows, as this seat measured them on HEAD + floor v2 + route:**
   - **Closed on measurement:** T-5 (the FadingScroll stop), T-6 (F1 hover), T-8 (H3-2 reads the migrated arms), X-5, X-7 (24/24), item 8 (unit and CANON plants A, S, H fail), item 9's CX-1 half (T-2 H3-3 and H3-6, 40/40), MIGRATION / E-11 (the corner is refused in paint on `dist`, 8/8 cells).
   - **Open, each waiting on an owner ruling:** T-3 / E-2 (C1, Q-10), R-1 and R-8 (Q-5), E-4 (Safari), and the gestalt (Q-2, Q-3).
4. **Projected checklist: 34 / 40.** Every row the route can move is met. The six open rows each wait on the owner.
5. **Bundle:** 2,933,655 B unpacked: +4,133 B over floor v2 (2,929,522) and +14,598 B over the datum 2,919,057. Its ruling is the owner's (Q-14).

---

## 1 · The mechanism

Line numbers are in the patched tree, HEAD + floor v2 + `route.patch`.

| # | where | what |
|---|---|---|
| M-1 | `src/components/toggle-group/shape.ts:1-7` (new) | `TOGGLE_GROUP_SHAPES = ["pill", "cell"] as const` and `type ToggleGroupShape`. One list, read by the prop type and the guard (P-3) |
| M-2 | `toggle-group/ToggleGroup.vue:11-12, 50, 59, 62, 166`; `toggle-group/index.ts`; `src/index.ts:374` | Prop `shape?: ToggleGroupShape`, default `"pill"`; `:data-shape` on the root. `watchEffect(() => refuseUnknown("ToggleGroup", "shape", props.shape, TOGGLE_GROUP_SHAPES))`: an unknown value throws `TypeError: [ToggleGroup] shape="…" is not one of pill, cell.` in production and development, and the group renders as pills (FV-10's one policy). The type is exported from both barrels (E-7) |
| M-3 | `toggle-group/styles.css:258-287` | **The tile, spelled once.** `.toggle-group[data-shape="cell"] { --selection-tile: flush; & .toggle-group__item { flex-direction: column; align-items: stretch; justify-content: flex-start; gap: var(--space-residue); padding: var(--space-atom) var(--space-body); text-align: start; line-height: var(--type-leading-body); border-radius: var(--radius-field) !important } &[data-size="sm"] .toggle-group__item { padding: var(--space-residue) var(--space-atom) } }`. The build flattens it to three rules, `dist` byte-identical to the flat form (`logs/p3b-nesting-css-identity.log`). The tile carries no group layout (CX-5 stays closed): the consumer keeps its grid, columns and gap |
| M-4 | same rule, `!important` | **The corner is refused in paint.** A layered `!important` outranks every consumer rule: utilities, unlayered rules of any specificity, unlayered `!important`, and a normal inline style. Only an inline `!important` beats it (§2, E-3) |
| M-5 | `toggle-group/styles.css:150-160` (the floor's perimeter `::before`) | **`inset: 0`, was `-1px`.** Paint containment clips at the padding box. A 2 px edge that started 1 px outside it lost its outer pixel under `content-visibility: auto` (T-3 H3-7, Chromium 1.00 px on specimen, strip and F1). The same clip comes from the pill's own `overflow: clip`. `overflow-clip-margin` would cure Chromium only: Playwright WebKit reports `CSS.supports` false and still cuts to 1 px (`logs/ocm-support.log`), so under E-2 it is not used. This is the floor's geometry, so the change belongs in floor v3 for both routes (§4 R-3) |
| M-6 | `toggle-group/ToggleGroupItem.vue:32, 161` | `inheritAttrs: false`, and `v-bind="{ ...$attrs, ...group?.itemAttrs(props.value) }"` first on the `<button>`, before the item's own `:tabindex`, `data-state` and handlers. Vue applied fall-through attributes after a component's own bindings, so a consumer `role="option"` / `tabindex="0"` replaced the engine's (H3-12: four stops, `option` in a `radiogroup`). Consumer classes, data attributes and listeners still reach the button (`item-attrs.test.ts`: `data-x` kept) |
| M-7 | `ToggleGroupItem.vue:105, 132-136` | Development name, under the floor's `process.env.NODE_ENV` gate (Q-5 (d) by its intent): a consumer `role`, `tabindex`, `aria-checked` or `aria-pressed` on an item is named once (`sets role, tabindex: the group's engine owns …`). The floor's two names (second row; interactive descendant) are untouched |
| M-8 | `fading-scroll/FadingScroll.vue:55-79, 93` | `:tabindex="holdsStop ? undefined : 0"`. `holdsStop` reads `rootRef.querySelector(FOCUSABLE)` at mount and on every child, subtree, `tabindex`, `disabled`, `href` or `contenteditable` change (one `MutationObserver`). A port of plain content stays scrollable by keyboard. A port that holds a stop is scrolled by focus moving through that content, so it adds no empty stop in front of it |
| M-9 | tests | `radius-role-canon.test.ts:566-689`: the parsed-selector canon unit over 48 twins (sm/md/lg × orientation × none/label/rows/media × on/off), nesting and `:is()` / `:where()` / `:not()` resolved, an unparseable selector a FAIL. `ToggleGroup.test.ts`: the barrel lists `ToggleGroupShape`; a `shape` stamp and refusal case; G-TOGGLE-WRAP's "the group may not paint" now reads the **parsed** sheet's own declarations per group rule (postcss), so a nested item rule is not read as group paint. `item-attrs.test.ts` (new; its own file, because inside `ToggleGroup.test.ts` it made the floor's late-name case flaky in happy-dom, `logs/wt-devname-flake.log`). `fading-scroll.contract.test.ts`: the stop rule and its re-read |
| M-10 | `MIGRATION.md` (the floor's Unreleased section) | Three rows plus edits to two floor rows (§3) |

Not in the route, on purpose:
- no grid on `cell` (CX-5);
- no `#title`, `#meta` or `#mark`: anatomy is F's centre, and D′ taking it makes it F (B-crit re-trigger (c));
- no flood and no travel (the floor's kick carries H-4; a travelling body is G's, blocked);
- no `development` export condition (floor FV2-4: `process.env.NODE_ENV` carries the names to `dist-dev`).

---

## 2 · The checklist (REGISTRY §P2-6.3), row by row

"Witness" names the H3 witness or shared probe that shows the row, and the file holding its reading. Rows are scored on the migrated arm, the gating unmigrated arm and the library scenes that are not consumer transcriptions. Under D′ a library transcription arm (`preset`, `specimen`, `strip`, `f1`, `v2`, `c1`, `preset-*`) is the consumer markup with its paint dropped, which is an **undeclared** group, so a pill. Its cells belong to R-1. Library residue outside the route is named once here and not repeated:
- `card` and `chipcell` are bindings the floor retired (TF-5, Q-8 (a));
- `wrap`'s pill Chip and coarse Button are Q-1's A1 sub-choice;
- `f1`, `v2` and `c1` library arms are not ToggleGroup compositions.

### 2.1 · T-1..T-8

| row | how it is met | witness and reading | status |
|---|---|---|---|
| T-1 | M-3's corner on every declared tile, at fine, coarse and `--ui-scale 1.25` | T-1 migrated 15/15 · 18/18: preset 204×63.58, specimen 205×86.16, strip 44×44 at 16.00 px flat (`run/dp-src/T-1-*.json`). Library transcriptions read UNMEASURED "never past its rung" (held pills, R-1) | met |
| T-2 | floor FV-2's one-row law, on pills only (the tile fact turns it off for tiles) | T-2 40/40 · 40/40, including H3-3's `<br>`, block-child and appended-`div` cases, run ≥ 1.1 s after mount (H3-6) | met |
| T-3 | the floor perimeter switched on by the tile fact, inside the padding box (M-5) | T-3 migrated 40/43 · 40/43 (`run/p3b-src/T-3-*.json`, load 471-545). Preset light 997.00 px² against a 267 bar; specimen 1086.00 / 1097.00 / 1093.00 against 291 (light / dark / PRT). All nine H-3 state scenes `-migrated` 4/4, H3-11. The H3-7 containment cells now read 2.00 px on every side, uncontained and contained, on specimen, strip, F1 and the state scenes in both engines (sitting 1: 1.00 px in Chromium). **Open:** `c1-migrated` 22.50 px² against 224 in every mode in both engines (Q-10). The gating shipped `preset-verbatim` reads 0.00 / 233.00 / 0.00 px² against 248 in Chromium (Playwright WebKit 0.00 / 217.00 / 0.00): the shipped K1 is undeclared, so it is a pill and carries the consumer's dashed outline (R-1, Q-5) | **open: owner Q-10, Q-5** |
| T-4 | the floor's ring reach; the tile does not pad the group | T-4 migrated 24/24 · 24/24, including H3-8's forced-colours reach on specimen and preset (`run/dp-src/T-4-*.json`) | met |
| T-5 | the engine (floor), M-6 (consumer ARIA) and M-8 (port stop) | T-5 migrated 38/38 · 38/38 on `src` (`run/dp-src/T-5-*.json`) and on `dist` (`logs/p3b-t5-dist-*.log`, load 444-468). specimen and strip `-migrated`: 1 stop, all four arrows move and check. `preset-consumer-aria`: `radiogroup` / `radio`, 1 stop (pass 2: 4 stops, `option`). `tabs-retired` refused on `dist` | met |
| T-6 | the floor's kick (FV-3) and hover rung (FV-8), on tiles | T-6 migrated 33/33 · 33/33 (load 26-69). Preset: keyboard peak 1.03 at 85 ms, programmatic 1.03 at 85 ms, calm observer 1.03 at 82 ms, pointer 1.04 at 112 ms, each with a trough and a settle; Tab entry 0.00. Hover ΔE 0.0947 (rest and PRM), 0.0332 under PRT. F1 hover ΔE 0.0929 Chromium, 0.0924 Playwright WebKit, against the 0.02 bar (pass 2: 0.52 %, H2's count) | met |
| T-7 | the six migrations delete every item paint class | T-7 migrated 24/24 · 24/24 | met |
| T-8 | H3-2 reads the migrated arms | T-8 migrated 27/27 in one run over both engines (`run/dp-src/T-8-both.json`). The library 0/12 are the held transcription pills (R-1). Real Safari is E-4's row | met |

### 2.2 · X-1..X-7

| row | witness and reading | status |
|---|---|---|
| X-1 sibling state | T-3 `preset-sibling-migrated` 4/4 · 4/4; `states.mjs --part states` 108/108 (`logs/p3b-states-states.log`, load 425-488) | met |
| X-2 selected ink reaches the media | floor `--selection-ink`. The K2 and V1 strokes follow it (`logs/p3b-states-ink.log`): specimen 2.66:1 light / 1.56:1 dark, strip 3.23 / 2.06. K1 has no stroke, and its readout keeps the consumer's `text-muted-foreground` by migration choice (the name line takes the ink) | met; dark stroke under R-5 |
| X-3 state paint never re-renders the slot | `crit.mjs --part x3` 4/4 (`logs/crit-x3.log`) | met |
| X-4 multi-select arm, same anatomy | V2 `type="multiple" shape="cell"`: T-1 3/3, T-3 4/4 · 4/4 | met |
| X-5 interactive descendant named | floor FV-7: `preset-input`'s `<input>` named once on `src-dev` and `dist-dev`, silent on `src` and `dist`, both engines (`logs/probe-names-*.log`, 12/12). Production keeps a typed key for the descendant (T-5 `preset-input` 1/1) | met |
| X-6 deselectable single | `crit.mjs --part x6` 2/2 (`logs/crit-x6.log`) | met |
| X-7 tone on edge, tint, ink | the shared tone probe, `crit.mjs --part tone`: **24/24** (`logs/crit-tone.log`); edge, ink and painted tint all move (pass 2: 0/24) | met |

### 2.3 · FV-1..FV-10, read under the route

| row | reading under D′ | status |
|---|---|---|
| FV-1 floor items 1-5 | T-5 and T-6 as above; no Playwright WebKit pointer hang in T-6 or T-7 | met |
| FV-2 the pill's one row | T-2 40/40 · 40/40. The pass-2 critic's `tworow` probe now reads 0/8 on `dist` (`logs/p3b-crit-tworow.log`). It fails any appended `div` that is not cut, and the `div` now runs inline on the pill's single row ("text rows in the label 1"), so the second row it tests for does not exist. That probe is superseded by H3-3 and is reported, not scored | met |
| FV-3 one kick, calm law | T-6 calm-observer cells 1.03 at 78-82 ms, both engines | met |
| FV-4 X-7 whole | X-7 24/24 | met |
| FV-5 Q-9 (a) exemption | `states.mjs --part a11y` 9/9 (`logs/p3b-states-a11y.log`): under `prefers-contrast: more` and forced colours the tile's box moves 0.00 px, its border stays 1 px, and the perimeter paints 2 px | met |
| FV-6 row-clustering walk | T-5 arrows on every migrated grid, `dist` included | met |
| FV-7 names and late re-check | X-5's 12/12; the late `<br>` named on `src-dev` and `dist-dev` | met |
| FV-8 hover rung | T-6 PRT hover ΔE 0.0332 Chromium / 0.0309 Playwright WebKit on preset; F1 0.0929 / 0.0924 | met |
| FV-9 flush beside plated | M-3 sets `flush` (Q-2's default (b)). The `plated` twin is the same build with that one word changed (`logs/p3b-build-dp-plated-src.log`, restored after). Filmed as H3-13's pair, `pair/` | met (the look is G's) |
| FV-10 one guard policy | M-2's `refuseUnknown`; unit `shape="card"` throws the named `TypeError` (`logs/p3b-unit-canon.log`, the ToggleGroup suite); plant "the guard deleted" fails (`logs/unit-bites.log`). `tabs-retired` refused on `dist` | met |

### 2.4 · R-1..R-10

| row | how it is met, or why it is not | witness and reading | status |
|---|---|---|---|
| R-1 the unmigrated consumer | Q-5's default, (b) + (d), is built. Shipped K1 (`preset-verbatim`) on `dist` reads 208×40, one row, nothing cut, so it is legible, but it is a pill with no selected carrier in light or PRT (T-3 above). Shipped K2 (`specimen-verbatim`) is cut: 4 boxes up to 24.64 px (Chromium) and 24.86 px (Playwright WebKit), silent on `dist` (`logs/probe-unmigrated-dist.log`). The fault is named in a consumer's development build (`dist-dev`, `logs/probe-names-dist-dev.log`) and in production it is refused structurally | as cited | **open: owner Q-5** |
| R-2 the H-2 pair | an undeclared group stays pills at h/2; declared, tiles | W-D 8/8 · 8/8; T-2 40/40 | met |
| R-3 the commit, plant-checked | the floor's kick on tiles | T-6 commit cells above. Plant on the route's own build, the kick's animation removed (`logs/p3b-build-dp-pop0-src.log`, `logs/p3b-t6-pop0-*.log`): see §2.7 | met (§2.7) |
| R-4 hover against selected | hover on the plate layer, selection on the perimeter | `states.mjs --part hover` 18/18 and F1 6/6 (`logs/p3b-states-hover*.log`): the selected tile clears T-3's bar against a **hovered** sibling in light, dark and PRT, in both engines. Hover light, T-6: ΔE 0.0947 / 0.0332 (PRT) | met |
| R-5 X-2 media ink, dark stroke reported | `--selection-ink` | K2 stroke 2.66:1 light / **1.56:1 dark**; V1 3.23 / 2.06 (`logs/p3b-states-ink.log`). The stroke is decoration, because the perimeter carries T-3 | met, reported |
| R-6 the comfort axis | the field rung at every rung; pills at h/2 | T-1 migrated coarse and `--ui-scale 1.25` cells 16.00 px; T-2 40/40 | met |
| R-7 canon fails plants A, S, H | M-9's unit; H3's CANON on the build | unit: clean passes. A, S, H, V (orientation arm), W (`:where` on state), P (`:not([data-shape="pill"])`) and I (the corner without `!important`) each fail (`logs/p3b-unit-plants.log`, load 573-617, on the nested block). CANON clean 3/3 · 3/3; plants A, S, H 2/3 each, failing their own cell (`logs/p3b-canon-*.log`) | met |
| R-8 refusal per Q-5 on `dist`, CX-1 class, late content | Q-5's default: a structural refusal in production (FV-2; M-4 for the corner), named in development builds | T-2 H3-3 and H3-6 40/40 (nothing cut, nothing stacked, after mount). Names on `dist-dev` 4/4 and silent on `dist` 4/4. W-E on `dist` 1/6 · 1/6 (`logs/battery-dp-dist-we-one-line-*.log`): W-E counts only an error or a throw in production, which Q-5 (b) does not give | **open: owner Q-5** |
| R-9 the bundle datum | stated as a ruled row (§3) | `logs/p3b-bundle.log` | met (stated); the rebind is Q-14 |
| R-10 "is a tile" spelled once | M-3: one nested block is the only `[data-shape="cell"]` in the source. Every other reader derives from `--selection-tile` (the pill law, flush plate, perimeter, names, Q-9 exemption) or is pinned by the canon unit and CANON (exactly one rule reaches a tile) | `grep -c 'data-shape="cell"' src/components/toggle-group/styles.css` = 1 selector block; unit and CANON above; G-TOGGLE-WRAP plants G1 (paint on the group's own rule) and G2 (a group pad that cuts the ring) fail, clean passes (`logs/p3b-unit-plants.log`) | met |

### 2.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 every cell readable in both engines | Sitting 1's battery read every witness in both engines with no stall (H3-1's retirement holds). The three runs that hung at load 488-713 were re-run in sitting 2 and read in full (T-5 `dist` both engines, T-3 both engines) | met |
| E-2 the H-10 scenes | F1 (T-6 hover now passes), V2, the sibling state, the interactive descendant in production, the keyed reorder (T-5), the deselectable single (X-6): green. **C1:** T-3 0/3 in both engines | **open: owner Q-10** |
| E-3 MIGRATION rows, E-11 guards, falsifiable claims | §3. Each claim was measured. "A corner on a tile is refused in paint": `probes/corner-refusal.mjs`, 8/8 tile cells plus 2 control cells, on `src` and `dist`, both engines (`logs/p3b-corner-refusal-*.log`). `rounded-pill rounded-full`, an unlayered scoped rule, an unlayered `!important` rule and an inline style each leave the tile at 16px (used 16.00 on 204×63.58). The control (the scoped rule on an undeclared pill) does move it. An inline `!important` wins (9999px, used 31.79), printed as INFO, and the row says "class or rule", not "anything". The `shape` refusal, the consumer-ARIA name and the port stop are each pinned by a unit test that fails when planted (`logs/unit-bites.log`) | met |
| E-4 real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell | **open: owner** |

### 2.6 · G, the gestalt

Frames: `pair/preset/` and `pair/specimen/`, light and dark × fine and coarse × Chromium and Playwright WebKit. Rows are `plated | flush` and columns are `selected | focused-selected`. Every frame passed film.mjs's label check (load 443-604, `logs/p3b-film-pair-*.log`). My reads are for the critic to test:
- **card-like:** yes. Four and eight 16 px cards, at fine and coarse. Fine and coarse frames are byte-identical in Chromium: on K1 and K2 the tile is not on the pointer rung.
- **selection without colour:** yes, on tiles. A 2 px edge in near-foreground ink plus a darker fill (fill 1.27-1.30:1, the edge carries).
- **apart from the ring:** **no.** Focused-selected shows the selected edge and the focus ring as two concentric outlines (`preset-*-pair.jpg`, right column). It is pass 2's finding, unchanged, because the register's look is Q-3's.
- **uncluttered:** flush reads as options on one surface. Each tile keeps its 1 px rim at rest, so the group reads as eight outlined cards rather than slabs. Plated reads heavier. The choice is Q-2's.
- **iOS-27 grade under O-87:** the route adds no lighting layer. The commit is the floor's +3 % pop with a bounce. Nothing travels and nothing floods, and a travelling body is G's route, which is blocked.

**Status: open, owner Q-2 and Q-3.**

### 2.7 · R-3's plant

The kick planted to `animation: none` on the route's own build, `dp-pop0-src` (`logs/p3b-build-dp-pop0-src.log`, the sheet restored and `cmp`-checked after). T-6 on it reads migrated **21/33 in both engines**, against 33/33 clean. The 12 cells that fail are exactly the commit cells: keyboard, programmatic, calm-observer and pointer, on preset, specimen and F1. Each reads `pop peak 1.00 … (amplitude < 0.015, no bounce)`. The pointer cells read 1.01 flat, so the clean pointer pass is the kick, not the press release. Every hover, press and Tab-entry cell still passes (`logs/p3b-t6-pop0-chromium.log`, load 595→638; `logs/p3b-t6-pop0-webkit.log`, load 631→392). These are timed reads at high load, so a timing artefact would show as a failure in the clean cells, and none failed. The commit bar is not vacuous on this route.

### 2.8 · Projection

| block | met | open (owner) |
|---|---:|---|
| T (8) | 7 | T-3 (Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 8 | R-1, R-8 (Q-5) |
| E (4) | 2 | E-2 (Q-10), E-4 (checkbox) |
| G (1) | 0 | G (Q-2, Q-3) |
| **total** | **34** | **6**, each waiting on an owner ruling or action |

Under the defaults no route-owned row is left. What would close each open row:
- **Q-10 (a)** closes T-3's C1 half and E-2.
- **Q-5 (a)** closes R-8 and R-1's naming half. Its cost: an error in production for every undeclared multi-row option.
- R-1's legibility half needs either the consumer migrations (E-6) or a production signal.
- **Q-2 / Q-3** decide G.
- **The checkbox** decides E-4.

---

## 3 · MIGRATION rows (in `route.patch`, under the floor's "Unreleased" section)

1. **_A set whose options hold more than one row declares `<ToggleGroup shape="cell">`_.** The tile's corner, column, pad pair, leading, flush plate and perimeter are listed, and the group's layout stays the consumer's. The row lists the utilities to delete and states that a corner class on a tile has no effect (measured, E-3). An unknown `shape` throws, and the group still renders as pills. Detectors: the development error `asks for a second row`, and `rg 'ToggleGroupItem[^>]*(flex-col|rounded-)'`.
2. **_A `role` or `tabindex` on a `ToggleGroupItem` no longer replaces the group's_.** Detector: the development name `sets role, tabindex …`.
3. **_`<FadingScroll>` is a tab stop only while its content holds none_.** Nothing for a consumer to change.
4. Edits to two floor rows. Chip's detector narrows to `<Chip[^>]*shape="cell"`, so `ToggleGroup`'s new `shape="cell"` is not a false hit. The `--selection-tile` row now says `flush` on a `shape="cell"` group.

**Ruled row R-9 (the bundle datum).**
- Unpacked: 2,933,655 B over 844 files. That is +4,133 B over floor v2 (2,929,522) and +14,598 B over the `.bundle-ratchet` datum 2,919,057.
- `dist`: 2,543,179 B in 840 files.
- JS gzip-9: 330,398 B, +457 over floor v2.
- Source: `logs/p3b-bundle.log`, measured by the floor's `bundle.sh` (npm `unpackedSize`, G-BUNDLE-RATCHET's measure).

Landing D′ re-binds the datum at the cut, together with the floor's +10,465. That is a deliberate rebind under G-BUNDLE-RATCHET, not excused growth, and it is the owner's to rule (Q-14).

**Consumer edits** (E-6: each lands in its consumer's own tranche; transcribed in `route/migrated.mjs`):
- K1 `SpringPhysicsFacet.vue`: `shape="cell"` on the group. Delete the group reset, the item utilities, `rounded-pill`, the name's `text-foreground` pin and the dashed selection paint.
- K2 `EasingCatalogue.vue`: `shape="cell" size="sm"`. Delete the item utilities, the group reset with its `padding: 2px 2px 1rem` (FL-5), the corner, the outline selection, and the `[data-state="on"]` stroke and ink rules (→ `var(--selection-ink)`).
- V1 `EasingSpecimenStrip.vue`: Chips in a `group` become one `ToggleGroup type="single" shape="cell" size="sm"`.
- F1 and V2: `shape="cell"` (V2 `type="multiple"`).
- C1: a vertical pill group.
- fourier-analysis `EquationModeToggle.vue:62`: `semantics="radio"` (FL-3).

---

## 4 · Risks

| id | risk | measured | what would close it |
|---|---|---|---|
| R-1 | The unmigrated consumer pays for the one-row law. Shipped K2 is cut, silently in production. Shipped K1 is legible but carries no selection in light and PRT | §2.4 R-1 | Q-5; the consumer migrations (E-6) |
| R-2 | C1 has no passing answer under Q-10 (b) | T-3 0/3 | Q-10 (a), or C1 declares `cell` (a 16 px corner on a 40 px one-line row, which T-2's pill law would then not cover) |
| R-3 | M-5 changes the floor's perimeter geometry, which F and pills also read. The edge now sits inside the item's 1-1.5 px border, so the rim shows outside it, and its `border-radius: inherit` is not concentric with the padding box: 16 px on a box inset by the border, where concentric would be 14.5-15 px. Geometry gives a gap of about 0.6 px at 45° on each corner. That gap is not measured | T-3 H3-7 2.00 px every side, both engines; `pair/` frames | land M-5 in floor v3 so both routes carry it. If the corner gap reads at the critic's glance, `border-radius: calc(var(--radius-field) - <border>)` on the tile only (a second tile reader, R-10) |
| R-4 | The selected edge and the focus ring read as two concentric outlines when focused (G) | `pair/*` right column | Q-3 |
| R-5 | The `!important` corner beats every consumer class or rule. That is the intent (M-4), but no escape hatch exists short of inline `!important` | `logs/p3b-corner-refusal-*.log` | none needed under E-1 |
| R-6 | `inheritAttrs: false` reorders attribute binding on every ToggleGroupItem. A consumer attribute the engine also writes (`role`, `tabindex`, `aria-checked`, `aria-pressed`, `data-state`) now loses | `item-attrs.test.ts`; T-5 `preset-consumer-aria` | the MIGRATION row and the development name |
| R-7 | FadingScroll's stop rule re-queries the port on every attribute and child mutation inside it. K2's port holds 28 tiles, and its commits do not mutate `tabindex` or `disabled` (the filter) | T-6 medians unchanged from sitting 1 | none at this cost |
| R-8 | Load. Sitting 2 ran at load 223-698. Its timed cells are the R-3 plant's only; every other sitting-2 read is static | log headers | re-run the plant's T-6 at low load if a cell flips |

**For pass 4's record** (REGISTRY §P2-6.3 forbids new rows now):
- the pill's own `overflow: clip` also halved the perimeter that contrast-more and forced colours turn on for pills. M-5 cures it, and no witness reads it;
- `crit.mjs --part tworow`'s premise (a second row inside the rung) no longer occurs under FV-2. Retire it or re-point it to H3-3;
- the floor's late-name unit case is flaky in happy-dom when another mount runs before it in the same file (`logs/wt-devname-flake.log`: floor alone 8/10).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

---

## 5 · Instrument notes

- **Sitting 1's T-3 Chromium** read 37/43 migrated. The six misses were C1 ×3 and H3-7 ×3, which the cure moved to 40/43. Its Playwright WebKit read 40/43 there already, because the WebKit harness cell drew the contained edge at 2.00 px while the bare probe (`ocm-support.mjs`) cut it to 1 px. The engines disagree on that cell, and M-5 removes the case from both.
- **R-3 plant (§2.7):** migrated T-6 33/33 → 21/33 in Chromium and in Playwright WebKit. All 12 failures are commit cells, and no other cell moved.
- **Sitting 2's dist-gated T-5** re-ran the two runs sitting 1 killed. Each read in full at load 444-468.
