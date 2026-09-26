# D4 · pass 2 · D4-D′ · spec: the declared cell, on the floor register

| field | value |
|---|---|
| seat | D4-D′ research + spec. Answers §7.3's D′ items 1-10 and "Every route" with probes on HEAD+floor, and specifies the route. Picks no winner. Read no other route's pass-2 file (REGISTRY §7.4) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | `04929544` in a clean detached worktree, `floor.patch` applied first (sha1 `f1476eba…`, `git apply --check` clean). The checkout reads `55e35700`; `git diff --stat 04929544 55e35700 -- src` touches only the Configurator (5 files), no tile file |
| probe sketch | `D4-Dp-spec/sketch.patch`: the mechanism below, as a diff against HEAD+floor (5 files, +117 / −6 lines). It is the probe instrument, not the prototype. The prototype seat re-derives from this spec and re-measures |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | shared. Load 29-65 across every run; each log line and JSON carries its own. No T-6 cell ran on janky frames (Chromium medians 8.3-8.4 ms, Playwright WebKit 10-11 ms), so no re-read fired |
| records (P-3: each number below cites one of these) | `D4-Dp-spec/runs/dp-src/*.json` (the H2 battery on the sketch with this route's migrations), `D4-Dp-spec/logs/*.log`, `D4-Dp-spec/route/` (`route.json`, `migrated.mjs`: six migrated sites), `D4-Dp-spec/probes/` (`states.mjs`, `refusal.mjs`, `tile-corner-canon.test.ts`, `load-scene.mjs`, `t3-seq.mjs`, `capture.mjs`), `D4-Dp-spec/captures/*.png`, `D4-Dp-spec/runs/dp-src-3site/` (the aborted first run, cited once in §5) |

Tallies are read with `node ../harness/tally.mjs D4-Dp-spec/runs/dp-src [--scenes] [--fails]`.

---

## 0 · In brief

1. **The mechanism is five small moves on the floor.** One prop (`shape: "pill" | "cell"`) stamps `data-shape`. One CSS rule turns a declared item into a tile: the field corner, a column, the pad pair, body leading, and the floor's perimeter switched on. The pill gets a structural one-row law (`block-size` at the rung). The item commits on a model change with a pop on `transform`. One token, `--selection-ink`, carries the selected ink to the label and to the media. The tile rule carries **no group layout**, which closes CX-5.
2. **On the migrated consumer the sketch is green on every D′ cell except C1** (§3). T-1 12/12 · 15/15, T-4 16/16 · 16/16, T-7 24/24 · 24/24, W-D 8/8 · 8/8 and T-2 22/22 · 22/22 (Chromium · Playwright WebKit). The T-6 commit bar is green on keyboard, programmatic and pointer commits, with Tab entry still, on all four migrated one-of-N scenes in both engines. T-3 is 15/18 in Chromium; the three misses are C1, a one-line pill row that Q-10 (b) leaves on ink.
3. **Item 1 (CX-1) is closed on the floor register.** The perimeter holds under the invalid group, a sibling border, the shipped consumer border and both tone faults: 108/108 cells (3 sites × 6 conditions × light, dark, PRT × 2 engines). The invalid preset tile reads 820.00 px² of ≥ 3:1 against a 267 bar in Chromium light. In pass 1 it read 0.00.
4. **Two parts of item 9 are only partly met, and one harness defect blocks a WebKit tally.** The pill's structural refusal holds against a column utility, but a consumer `height: auto` outranks it: unmigrated K2 still balloons, 102.17 → 120.33 px, on `dist`. The DEV name catches that case at mount (8 errors, `src-dev`). It is absent from `dist`, as Q-5 (b) expects. T-3 in Playwright WebKit dies with a `page.goto` timeout partway through the longer scene list (§5 HF-2). The WebKit T-3 cells for the tiles come from `states.mjs`, which uses T-3's own measurement.
5. **Bundle: D′ adds 1,968 B unpacked on top of the floor** (2,921,764 against 2,919,796; JS gzip-9 +267 B). The floor is already 3,667 B over the ratchet datum 2,916,129, so D′ lands 5,635 B over it (§4 item 10).

---

## 1 · The mechanism (file:line in the patched tree; `sketch.patch` is the diff)

| # | where | what |
|---|---|---|
| M-1 | `src/components/toggle-group/ToggleGroup.vue:43-49, 60, 165` | `export type ToggleGroupShape = "pill" \| "cell"`; the prop `shape?: ToggleGroupShape`, default `"pill"`; `:data-shape="props.shape"` on the root. The context is untouched, so the pass-1 `context.ts` union restatement does not recur (P-3). `index.ts` re-exports the type |
| M-2 | `toggle-group/styles.css:188-211` | **The one corner declaration.** `.toggle-group[data-shape="cell"] .toggle-group__item`: `flex-direction: column; align-items: stretch; justify-content: flex-start; gap: var(--space-residue); padding: var(--space-atom) var(--space-body); text-align: start; line-height: var(--type-leading-body); white-space: normal; overflow: visible; block-size: auto; border-radius: var(--radius-field); --selection-perimeter: 1`. `sm` takes `var(--space-residue) var(--space-atom)`. The label rule is lifted (`overflow: visible; text-overflow: clip; padding-block: 0`). `overflow: visible` lets the perimeter's −1 px inset paint all 2 px; the pill's `clip` would cut one. **No `display: grid` and no `--toggle-group-cell-min`: the group's layout is the consumer's** (CX-5) |
| M-3 | `styles.css:83-88` | **The pill holds one row, structurally** (Q-5 (b)): `block-size: var(--toggle-group-item-size)` on every item, released to `auto` by M-2. A second row forced by a column utility or a hard break is clipped at the pill's edge in production |
| M-4 | `styles.css:1-15, 100-103, 236-238` | Two registered inputs, `@property --selection-pop` (`<number>`) and `--selection-pop-duration` (`<time>`). On the item: `--selection-pop: calc(0.06 * var(--motion-weight))` (PRM zeroes it with every other overshoot) and `--selection-pop-duration: var(--spring-panel-duration)`. **`--selection-ink`**: the item's rest ink (`--muted-foreground`) and, on `[data-state="on"]`, `var(--selection-edge)`, the floor's tone-aware floored edge ink. The item's `color` reads it, replacing the floor's `color: var(--foreground)` on-state, so X-7's tone reaches the ink |
| M-5 | `ToggleGroupItem.vue:75-100` | **The commit, keyed on the model:** `watch(selected, on => …)`. It runs on a pointer, a key or a programmatic write, and never on mount, Tab entry or a keyed move (the component instance survives). It reads the two tokens and `--ease-cartoon-punch` from the item's computed style, then `node.animate([scale(1), scale(1 + pop) @ 0.4, scale(1)], { duration, easing })` on **`transform`**. `transform` is a channel the hover lift and press squish (`scale`) never write, so the two compose instead of racing, and a CSS transition on `scale` cannot mask the pop. This follows SegmentedTabs' `animatePress` WAAPI precedent (`SegmentedTabs.vue:180-205`). A zero amplitude (PRM) runs nothing |
| M-6 | `ToggleGroupItem.vue:102-125` | **The DEV name** (`import.meta.env.DEV`, stripped from `dist`, per Q-5 (b)): a `ResizeObserver` on the item and its children fires once, `console.error("[ToggleGroupItem] "<v>" holds more than one row in a pill group … Declare <ToggleGroup shape="cell">.")`. It fires when a pill has grown past its rung, when a child's box runs past the item's, or when a label element is squeezed (its own `scrollHeight > clientHeight`) |
| M-7 | `src/styles/accessibility.css:18, 39` | Q-9 (a): both `[data-state="on"]` arms (`prefers-contrast: more`, `forced-colors`) gain `:not(.toggle-group[data-shape="cell"] .toggle-group__item)`, so the tile's own perimeter is the carrier and the 2 px `!important` border no longer moves layout |
| M-8 | tests | `ToggleGroup.test.ts:362` G-TOGGLE-WRAP barrel list gains `ToggleGroupShape` (the one unit the sketch fails: 494 passed, 1 failed, `logs/unit-sketch-final.log`). `radius-role-canon.test.ts:555-568` is re-pointed to the parsed-selector case (§2 item 8). `vue-tsc --noEmit` exit 0 (`logs/typecheck-sketch.log`) |

Not in the mechanism, on purpose: no `cell.css`, since the floor deleted Chip `cell` (Q-8 (a)) and the corner has one reader; no flood (B's normal-blend flood stays banked, §3.3, because the pop clears H-4 on its own); no `#title` / `#meta` / `#mark` (that is D4-F's question, and D′ taking it would make it B, per B-crit re-trigger (c)).

---

## 2 · §7.3 D′ items, how each is met, and the witness

| # | item | answer | evidence (H2 witness or probe on HEAD+floor+sketch) |
|---|---|---|---|
| 1 | CX-1 closed on the floor register | **Met.** The perimeter layer is its own paint (the item's `::before`), so the invalid grammar's `border-color` cannot reach it | `probes/states.mjs --part states`: **108/108**. Chromium light, invalid, ≥ 3:1 area / bar: preset 820.00 / 267, strip 281.00 / 88. Invalid dark is the lowest margin: preset 519.00 / 267 (Chromium), 518.00 (Playwright WebKit). The fill stays 1.20-1.23:1, and 1.00:1 under PRT: the edge carries (`logs/states.log`) |
| 2 | H-2's pair green; T-2 fails an item off its rung | **Met.** An undeclared group is a pill at h/2 and is held at its rung (M-3) | W-D **8/8 · 8/8** (`runs/dp-src/W-D-*.json`), both halves including `family-d-undeclared`; T-2 **22/22 · 22/22** |
| 3 | The commit arm on H-4 for keyboard, pointer and programmatic commits | **Met** in both engines on every migrated one-of-N scene (preset, specimen, f1, strip). Tab entry: largest scale motion 0.00 | `runs/dp-src/T-6-*.json`. Chromium preset: keyboard peak 1.04 at 198 ms, trough 0.99, settle 1.00; programmatic 1.04 at 191 ms; pointer 1.05 at 217 ms, settle 1.01 (the hover lift). Playwright WebKit preset: 1.04 at 190 / 183 ms; pointer 1.05 at 196 ms. One WebKit programmatic read peaked at 492 ms (specimen, load 49-54) and still passed |
| 4 | Hover on the plate layer, measured against the selected state | **Met in light and dark.** The floor's TF-8 hover writes the plate, and the selected state sits on the perimeter, a different channel | `probes/states.mjs --part hover`: selected against a *hovered* sibling clears the bar by 1.87-3.44× in all 18 cells. Hover against rest: 5.30-98.82 % of pixels moved in light and dark. **Under PRT the hover moves 0.00 %** in 6/6 cells (§5 HF-4, a floor defect) |
| 5 | CX-5: does the grid belong to `cell` | **`cell` stops carrying the grid.** V1 mounts in its own inline strip with no override. K1 keeps its `grid grid-cols-2`, K2 its `.specimen-grid` | T-1 `strip-migrated` 44.00×44.00 in its family rows; T-5 migrated 30/32 (the 2 misses are FadingScroll's own tab stop, TF-6's owner's); `captures/strip-migrated-*.png` |
| 6 | X-2: a selected-ink token the stage's stroke reads | **Met: `--selection-ink`.** K2 and V1 migrate to one stateless rule each (`stroke: var(--selection-ink)`), and their `[data-state="on"] path` rules delete | `probes/states.mjs --part ink`: the selected stroke is the edge ink in both engines. Selected against unselected stroke on the ground: K2 2.66:1 light, **1.56:1 dark**; V1 3.23:1 light, 2.06:1 dark (`logs/ink.log`). The stroke is decoration here, since the perimeter carries T-3; the dark ratio is recorded as a risk |
| 7 | C-4: V1's 40 px tile at 16 px, against Q-1 | **Under Q-1 (a) it is 16 px, and it reads as a rounded square, not a stadium.** 16.00 on 44.00×44.00 is 0.73 of h/2 at every rung. The 44 px size is V1's own layout (`.vj-tile` 2.75 rem) | T-1 `strip-migrated` (info), `captures/strip-migrated-{light,dark}-*.png`. The owner's glance is Q-1's |
| 8 | Canon test on the parsed selector; unit re-points pin paint, not text | **Met.** `probes/tile-corner-canon.test.ts` parses every `src/**/*.css` with postcss and matches each corner-declaring selector against a live `cell` item and a live `pill` item (happy-dom `Element.matches`). Exactly one rule may reach the cell and not the pill, in `toggle-group/styles.css`, on `var(--radius-field)`. Paint pins stay in the H2 witnesses (T-1, T-2, W-D), which read computed paint in both engines | clean **PASS**. Plant (`TILE_CANON_PLANT=1`, pass 1's unquoted `.toggle-group:is([data-shape=cell]) .toggle-group__item`) **FAILS** with 2 hits (`logs/unit-canon-probe.log`). It replaces the text case at `radius-role-canon.test.ts:555-568` |
| 9 | DEV refusal per Q-5, production arm on `dist` (H-9) | **Partly met.** Production (M-3): K1's column pills are held at 40.00 px on `dist` in both engines. A consumer size outranks the layer, so unmigrated K2 grows 102.17 → 120.33 on `dist` with 0 errors. DEV (M-6): `src-dev` names K1 (4 errors at mount) and K2 (8), with 0 false positives on `single`, `vertical`, `pill-icon`, `pill-badge`, `c1-migrated` and the undeclared pair. `dist`: 0 errors, as Q-5 (b) expects. Q-5 (d) is still unbuilt (floor FL-1), so a consumer's dev server does not get the name either | `probes/refusal.mjs` → `logs/refusal-{dist,src-dev,src-dev-pills}.log`. Unnamed case: a DOM mutation that changes no box (a line appended inside a clipped label in a row pill) is held in paint but not named |
| 10 | The bundle datum, as its own ruled row | **+1,968 B unpacked over HEAD+floor**; the floor is +3,667 B over the datum. Landing D′ needs the datum re-bound to the measured unpacked total at the cut (ruled row R-1, §4) | `logs/bundle-datum.log`: unpacked (`npm pack --ignore-scripts`, `tar -xOzf \| wc -c`) floor 2,919,796, D′ 2,921,764; `dist` 837 files, 2,534,300 → 2,536,268 B; JS gzip-9 280,540 → 280,807 |

### 2.1 · "Every route"

| obligation | answer | evidence |
|---|---|---|
| every cell in both engines under H2, unmigrated beside migrated | the battery ran on `dp-src` with six migrated sites (`route/migrated.mjs`). Per witness `[migrated · unmigrated]`, Chromium / Playwright WebKit: T-1 12/12 · 6/9 / 15/15 · 9/12; T-3 15/18 · 12/48 / **harness error** (HF-2; the tile cells are in item 1's probe); T-4 16/16 · 3/24 / 16/16 · 3/24; T-5 30/32 · 19/37 / the same; T-6 25/27 · 32/40 / 27/27 · 32/40; T-7 24/24 · 4/32 / 24/24 · 4/32. T-8 reads library arms only: 0/21 (HF-3). W-D 8/8 · 8/8 | `runs/dp-src/*.json`, `logs/battery-dp-src.log` |
| H-10 scenes: F1, V2 (Q-7), C1, the sibling state, the interactive descendant in production | F1 migrates to `ToggleGroup type="single" shape="cell" size="sm"`: T-1 3/3, T-3 3/3, T-4 4/4, T-6 commit green; its hover light is **0.52 % in Chromium** (fails; Playwright WebKit passes). V2 migrates to `type="multiple" shape="cell"` on the `<button>` host (X-4): T-1 3/3, T-3 3/3. C1 migrates to a vertical **pill** group: T-4 4/4, **T-3 0/3** (§5 risk R-2). Sibling state: item 1's "sibling" condition 18/18. Interactive descendant: the floor's Q-5 (b) walk (T-5 `preset-input` 1/1 at floor) is untouched by D′ | tallies above; `logs/states.log` |
| gestalt inputs for the critic (light, dark, fine, coarse) | captures of every migrated arm beside its unmigrated arm, both modes, both engines | `captures/*.png` (32 files). My own read, for the critic to test: K1 and K2 read as four and eight option cards; the selected card is the one with a dark (light mode) or pale (dark mode) 2 px edge, legible without colour; on V1 in dark the selected rounded square's pale ring reads close to a focus ring (Q-3) |
| MIGRATION.md rows | §4 | |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell | none |

---

## 3 · What the migrations delete (the consumer side, E-6: each lands in its own tranche)

| site | the migrated group | deleted |
|---|---|---|
| K1 `SpringPhysicsFacet.vue` | `<ToggleGroup type="single" shape="cell" class="… grid grid-cols-2 gap-2">` | the group reset `rounded-none bg-transparent p-0 shadow-none backdrop-filter-none` (its `p-0` cut the ring's reach); the item's `flex-col items-start gap-0.5 bg-background px-3 py-2 font-medium leading-normal`; the name's `text-foreground` pin; the scoped dashed-outline paint at `:197-215` |
| K2 `EasingCatalogue.vue` | `shape="cell" size="sm"`; the group keeps its column layout with a bottom pad only | the item's `flex-col gap-1.5 px-2 py-2.5`; the group reset and its `padding: 2px 2px 1rem` (FL-5: its 2 px cut the ring); the corner; the outline selection; the selected stroke and ink rules, replaced by `stroke: var(--selection-ink)` and `color: var(--selection-ink)` |
| V1 `EasingSpecimenStrip.vue` | one `ToggleGroup type="single" shape="cell" size="sm"` over the family rows (a `radiogroup`, one stop) instead of Chips in a `group` (`aria-pressed`, 3 stops) | the Chip binding; the selected glyph and label rules, replaced by `var(--selection-ink)` |
| F1, V2, C1 | as in §2.1 | every item paint class; F1's `is-bound` border (a sibling-state carrier, which F1 re-expresses as content in its own tranche) |

T-7 reads the result: migrated **24/24** in both engines.

---

## 4 · MIGRATION.md rows (under the floor's "Unreleased" section)

_`<ToggleGroup>` gains `shape`; a multi-row option must declare it_

A `ToggleGroup` item is a one-row pill: its block is the control rung, and a second row forced by markup (a column utility, a hard break, a nested column) is cut at the pill's edge. A set whose options hold more than one row declares `<ToggleGroup shape="cell">`. The items then take the field corner (16 px), a column, the pad pair and body leading, and paint the selected perimeter. The group's layout (grid, columns, gap) stays yours. In development a pill holding a second row logs `[ToggleGroupItem] "<value>" holds more than one row in a pill group`. Detector: that console error; `rg -n 'ToggleGroupItem[^>]*flex-col'`.

_Selected ink is a token_

The item's ink is `--selection-ink`: the muted foreground at rest and the selection edge's ink when selected, following `--selection-tone`. A tile's media reads it (`stroke: var(--selection-ink)`), so `[data-state="on"] path` and `[data-state="on"] .label` rules delete. Detector: `rg -n 'data-state="on"\]' -g '*.{vue,css}'` in consumer trees.

_A committed option pops_

Selecting a `ToggleGroup` item, by pointer, key or a write to the model, pops it on `transform` (≈ +3.7 % at the default weight, the punch curve, `--spring-panel-duration`). Reduced motion runs nothing. A consumer `transform` on the item is overwritten while the pop runs. Detector: `rg -n 'transform' ` on item classes.

_Behaviour and paint, nothing to change_

- A `shape="cell"` item keeps its box under `prefers-contrast: more` and forced colours: the 2 px `!important` selected border no longer applies to it. Its own perimeter carries the state (`Highlight` in forced colours).
- **E-11 guard for the silent binding:** a consumer corner utility (`rounded-*`) on a `cell` item overrides the field corner with no signal. The guard the prototype adds is the same DEV observer (M-6): a `cell` item whose computed corner differs from the root's `--radius-field` names itself. Built by the prototype and measured there; this seat did not build it.

**Ruled row R-1 (the bundle datum):** D′ grows the unpacked package by 1,968 B over HEAD+floor (2,921,764 against 2,919,796). With the floor's own +3,667 B, the cut re-binds `.bundle-ratchet` from 2,916,129 to the measured total at the tag. This is a deliberate rebind under G-BUNDLE-RATCHET, not an excused growth, and it is the owner's to rule with the floor's.

---

## 5 · Risks and open items

| id | risk | measured | what would close it |
|---|---|---|---|
| R-1 | The unmigrated consumer pays for M-3. The shipped K1 composition (`flex-col` pills) is cut to 208×40 with its readout clipped (T-1 `preset-verbatim` 208.00×40.00; `captures/preset-verbatim-*.png`). Shipped K2 is not refused at all (`height: auto`, 102.17 → 120.33 on `dist`) | `logs/refusal-dist.log` | the consumer migrations (§3), in their own tranches (E-6); the DEV name tells them. K2's hole is a consumer size outranking a layer, which no layered rule can refuse without `!important` |
| R-2 | **C1 fails T-3 0/3** as a one-line pill row: Q-10 (b) keeps the perimeter off pills, T-3 hides the ink, and the check mark is 22.50 px² against a 224 bar | `runs/dp-src/T-3-chromium.json` | an owner ruling on Q-10: (a) switches the perimeter on for pills, or C1 declares `cell` and accepts a 16 px corner on a 40 px one-line row (T-2 would then have to exempt it) |
| R-3 | The selected perimeter can read as the focus ring on small square tiles in dark (V1 capture) | `captures/strip-migrated-dark-*.png` | Q-3; D4-G measures option (c) |
| R-4 | X-2's dark stroke contrast is low: K2 1.56:1 | `logs/ink.log` | the rest ink is `--muted-foreground`. A consumer can mix it down (`color-mix(in oklab, var(--selection-ink) 40%, transparent)`) but not up; decoration only |
| R-5 | F1's hover light moves 0.52 % in Chromium (fails T-6), 2 of 27 migrated cells | `runs/dp-src/T-6-chromium.json` | the floor's hover rung on a thumbnail-dominated tile; not D′'s mechanism. Re-read by the prototype with ink hidden |
| R-6 | The pop is a script write per commit (one `getComputedStyle` and one WAAPI animation). A consumer `transform` on the item is overwritten while it runs | T-6 medians unchanged (8.3 / 10 ms) | none needed at this cost; the MIGRATION row names the transform collision |
| R-7 | A DOM mutation that changes no box is held in paint but not named | `logs/refusal-src-dev.log` (`family-d-undeclared` 0 errors after an appended line) | a `MutationObserver` in the DEV arm, if the prototype finds a consumer that mutates content that way |

**Harness findings (for the next pass's checklist; REGISTRY §7.5 forbids minting them into this one):**
- **HF-1.** A route that migrates only some sites gets empty `-migrated` scenes for the rest. They FAIL with "0 items" instead of reading UNMEASURED, because `lib.mjs` `scenesFor` pushes `-migrated` for every `arms` site once any migration exists. The first run, with 3 of 6 sites migrated, read T-3 migrated 9/18 for that reason (`runs/dp-src-3site/`, `logs/battery-dp-src-3site-aborted.log`).
- **HF-2.** T-3 in Playwright WebKit ends in `HARNESS ERROR page.goto: Timeout 30000ms exceeded` at `preset-contents`, after the migrated arms lengthen the page sequence. It happened in 3/3 whole-witness runs (`logs/battery-dp-src.log`, `logs/T-3-webkit-rerun{,2}.log`, loads 28-63). The same scene loads in 0.1 s alone (`logs/load-scene-webkit.log`), and T-3's own cells for it and its predecessor run clean in sequence (`logs/t3-seq-webkit.log`). The fault is the witness's browser endurance, not a scene. This is not proven by a floor-only run of the longer list.
- **HF-3.** T-8 reads library arms only, so it cannot see a declared route (0/21). D′'s per-engine corner and separation evidence is T-1 and T-3 run in each engine.
- **HF-4 (a floor defect, not D′'s).** Under PRT the hover light moves 0.00 % on every migrated tile in both engines. At `--glass-level` 0 the floor's `--control-surface-bg-hover` mixes fully to `--card`, which is the rest plate (`logs/hover.log`).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
