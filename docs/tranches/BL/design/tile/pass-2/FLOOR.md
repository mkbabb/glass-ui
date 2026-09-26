# D4 · pass 2 · FLOOR: the floor patch every pass-2 route applies

| field | value |
|---|---|
| seat | D4 pass 2, floor-patch seat. Builds REGISTRY §3.2 "The floor patch" items 1-5 once, on the real source, with §3.3's banked sub-choices where they apply and §5's pass-2 defaults. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | `04929544`. The patch is `floor.patch` (29 files, +513 / −277 lines, sha1 `f1476eba`). `git apply --check` is clean at `04929544` (a clean detached worktree) and on the checkout as it stood at the close (`6b75e0a7`; the tree moved while the seat ran, and the moves touch no file the patch touches) |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell reads **UNMEASURED (owner's safaridriver checkbox)** |
| records | `floor.patch`; `floor-run/` (the battery JSON on HEAD+floor, `floor-src/` and `floor-dist/`, and the two `build-*.json`); `logs/floor-*.log`; the probes in `floor-probes/` (`hover.mjs`, `perimeter.mjs`, `chip-guard.mjs`, `compare.mjs`). Per-scene deltas are read with `node floor-probes/compare.mjs baseline/head-src floor-run/floor-src --changed` |
| machine | shared. Load ran 8.9-42.6 across the seat's browser runs; each number below carries its load, and every log line does. No T-6 cell failed on janky frames and no re-read fired (`grep -c "NOT-REPRODUCED\|reproduced in" floor-run/floor-src/T-6-*.json` = 0, 0). No run hung |

## 0 · In brief

1. **Item 1, the SF-8 fix, is built and cures the Playwright WebKit hover hang.** It is one hunk in one file (`src/styles/tokens/glass.css`), the first hunk of the patch. Applied alone on `04929544`, the same probe that hangs HEAD on every ToggleGroupItem hover (6/6 cells "HUNG: no answer within 20 s") returns in 1.5 s on 6/6 (§2.1). Under the whole battery, Playwright WebKit T-6 now reads every cell Chromium reads: 21/45 in both engines, where the baseline read 14/35 with three pointer segments hung. PF-1 is not carried.
2. **Items 2-5 are built.** The selected perimeter (item 2) ships dormant on the pill (Q-10 (b)) behind one switch a route's tile rule sets. With the switch set as a tile rule would set it, T-3's own measurement passes 54/54 cells: preset, specimen, the invalid group, the sibling state, the translucent and unresolvable tones, `display: contents`, the shipped consumer composition and the single-line row, in light, dark and PRT, in both engines. As shipped (switch off) the same cells read 0/54 (§2.2).
3. **HEAD+floor against the H2 baseline:** T-5 26/72 → 42/72 in both engines; T-6 Chromium 20/45 → 21/45 and Playwright WebKit 14/35 → 21/45; W-B 5/25 → 9/25; T-2 22/22 held; T-3, T-7, T-8, W-A, W-C, W-D, W-E unchanged. Three scenes fall, all on bindings the floor retires: `card` (T-4 4/4 → 0/4, T-6 5/9 → 2/9) and `chipcell` (T-1 5/5 → 0/12). §3 has every changed row.
4. **Typecheck, unit and build are green against HEAD's own failures.** The unit suite fails the same 10 cases as HEAD with no `dist/` and the same 3 (`boot-graph`, which needs a built demo) with one; the floor adds 10 passing tests. `vue-tsc` is clean on both projects once `dist/` exists. The library builds; `dist/` grows 1,317 B (§4).
5. **Not built, and why:** Q-5 (d) (a `development` export condition, a second library build for every export), Q-9 (a) (the `accessibility.css` exemption has nothing to key on until a route declares a tile) and the fourier-analysis `semantics` edit (the consumer's, E-6). §5.

---

## 1 · The patch, item by item

Line numbers are in the patched tree.

### Item 1 · the SF-8 fix (hunk group 1: `src/styles/tokens/glass.css` only)

- `src/styles/tokens/glass.css:257-265`. `--control-surface-bg-hover` was `color-mix(in oklab, var(--glass-plate-quiet), var(--glass-plate-resting) 35%)`: a mix of two plates, each itself a `color-mix` over an `oklch(from …)` relative colour, so two relative-colour mixes nested in a third. Painting it hung Playwright WebKit (SF-8, isolated by D4-D to exactly this shape). It broke the plate law stated 100 lines above it ("one flat mix per rung, zero nested color-mix").
- It is now a plate like every rung on that ladder, ONE flat mix: `color-mix(in srgb, oklch(from var(--foreground) l c h / calc(var(--glass-veil-quiet) + var(--fill-hover))) calc(var(--glass-level) * 100%), var(--card))`. The foreground ink at the rest plate's alpha plus the register's hover rung (`--fill-hover`, 0.05), lerped to the solid `--card` on `--glass-level` like every plate, so under PRT (level 0) it is opaque.
- The value changed, not only the spelling. The old rung (35% of one step of the warm ink) moved 0.00% of pixels on ToggleGroupItem in both modes (HEAD, Chromium, `logs/floor-hover-head-chromium.log`); SF-9 records why (the capsule gleam cancels it). A same-colour flat respelling was built first and measured: it returns in Playwright WebKit and still moves 0.00% (the `floor-wip` build, not banked). The rung that moves is the foreground ink, which darkens the plate in light and lifts it in dark. It is shared: the Select trigger and the disclosure trigger read the same token, and their hover changes with it (MIGRATION row).

### Item 2 · TF-2's register (`src/components/toggle-group/styles.css`)

- `:84-105`: the item is `position: relative` (the layer's containing block) and declares the register's inputs. `--selection-edge` is `oklch(from var(--selection-tone, var(--foreground)) min(l, 0.42) c h / 1)`: the consumer's per-item or per-group tone (X-7), made solid by `/ 1` (the alpha clamp, B-crit §3.2) and lightness-floored away from the plate (B Q4). `:107-109`: the dark arm floors at `max(l, 0.8)`. `:104`: `--selection-perimeter: 0`.
- `:126-143`: the layer is the item's own `::before`, inset −1 px, a 2 px border in the edge ink, `border-radius: inherit`, opacity 0, and opacity `var(--selection-perimeter)` on `[data-state="on"]`. It spends neither `outline` (the ring's) nor `box-shadow` (the ring's and the rim's) nor the item's `border` (the invalid grammar's, a sibling state's, a consumer's), and never moves layout. The colour is a longhand, so an unresolvable tone leaves `currentColor` (the item's own selected ink) instead of dropping the whole border as a `border:` shorthand would. The layer carries its own `transition: opacity` (release `--engage-control-engage-release`, attack `--engage-control-engage-attack`), so the item's transition list, which `.glass-capsule-hover` owns, is untouched. ToggleGroupItem composes no material class that claims its `::before` (`glass/material.css:133-143` lists the members), so the pseudo is free.
- `:217-222`: forced colours paint the layer in `Highlight`.
- **The switch (Q-10 (b)).** A one-line pill carries its state on ink and weight, which hold on a bare label, so the floor ships `--selection-perimeter: 0`. A tile rule sets it to 1. D′ sets it in its `shape="cell"` rule and F in its structural rule; neither needs anything else from the floor. The weight is Q-3's pass-2 default (b), B's 2 px floored-tone perimeter; the check mark at `md` is anatomy (D4-F), not built here.

### Item 3 · TF-3's walk, the reorder fix, and a unit test

- `src/components/tabs/composables/useTabRovingFocus.ts:26-35`: `RovingArrows = "axis" | "grid"`. `:160-185` `rowNeighbour`: the enabled item in the adjacent visual row in the pressed direction whose inline centre is nearest the origin's, nearest row first (a row starts past the origin's centre line, so items of unequal height in one row stay one row). `:227-243`: under `grid`, Left and Right step in order (flipped under RTL), Up and Down take the row neighbour, and where no row lies that way they step in order, wrapping (Q-4 (b), B's model with C's centre-distance tie-break).
- `:203-206`, `:280-288`: Q-5 (b), structural and in production: a key whose target is an editable descendant of an item (input, textarea, select, contenteditable) is the descendant's.
- `src/composables/motion/morph/useSelectionGroup.ts:80-81, 253`: the engine forwards `arrows`.
- `src/components/toggle-group/ToggleGroup.vue:100-104`: ToggleGroup passes `grid`, in both modes and orientations (a wrapping row is two-dimensional; a column and a one-line row get the linear step on the cross pair).
- `ToggleGroup.vue:78-87`: the reorder fix. The slot renders inside ToggleGroup, so a keyed reorder of the consumer's list updates it; `onUpdated` re-sorts the registry when DOM order and registry order disagree.
- Tests: `tests/components/custom/tabs/roving-grid.test.ts` (new, 9 cases on stubbed rects: order step and wrap, row neighbour, the linear step on a missing row and on one line, nearest centre and nearest row, unequal heights, disabled skip, RTL, the `axis` model's inert pair, the editable descendant); `tests/components/ui/toggle-group/ToggleGroup.test.ts` "after a keyed reorder the arrows walk the new DOM order". Planted: with the `grid` branch disabled the walk test fails 6 of 9; with the `onUpdated` re-sort removed the reorder test fails (focus lands on the old neighbour).

### Item 4 · TF-4, TF-5, TF-6, TF-7, TF-8

- **TF-4.** `src/components/tabs/types.ts:29-32`: `SegmentedTabsSemantics = "radio" | "tabs"` (clean break from `"toggle"`). `SegmentedTabs.vue:126-131`: role `radiogroup` for `radio` and `arrows: "grid"`; `tablist` and `axis` for `tabs`. `:251`: the strip binds `selection.groupRole`; `:319`: each tab spreads `selection.itemAttrs(value)` (`radio` + `aria-checked`, or `tab` + `aria-selected`), so the engine is the one ARIA source. `:310`: each tab composes `focus-ring`. `useTabResponsive`'s `stripValue` is untouched (its no-match branch stays HEAD's, E-crit CX-2). README rewritten.
- **TF-5.** `src/components/card/Card.vue`: `selected`, its computed and its four stamped attributes deleted; the header says a card is content. `card/styles.css`: the `--card-fill` registration and the whole `.card[role="option"]` arm deleted. `demo/stories/display/card.vue`: the "Selectable cards" section deleted. `demo/stories/data/search.vue`: the listbox rows pass `role="option"` and `aria-selected` as attributes (which now reach the plate) and carry their active row on a scoped edge. Tests re-pointed: `Card.test.ts`, the public-contract type test (`Lacks<"selected">`), `search-contracts.test.ts` (no row is a tab stop).
- **TF-6.** `src/styles/tokens/scale-paper.css:60-65`: `--focus-ring-offset: 2px` and `--focus-ring-reach: calc(var(--focus-ring-width) + var(--focus-ring-offset))`, one token. `src/styles/utilities/base.css:151, 251`: both ring composers read the offset. `toggle-group/styles.css:28-32`: the row pads by `--focus-ring-reach`.
- **TF-7.** `toggle-group/styles.css:87-96`: the pill is one line (`max-inline-size: 100%`, `justify-content: safe center`, `white-space: nowrap`, `overflow: clip`); `:111-117`: each label element ellipsizes, with `padding-block: 0.15em` for descenders. A tile rule lifts all four.
- **TF-8.** `src/styles/glass/control-surfaces.css:83-92`: the `.control-surface` hover re-points `--glass-defined-plate`, the plate's own image layer (`glass/defined.css:69-74`), instead of writing `background`, which replaced both image layers and dropped the floor. It is bracketed in `(hover: hover)` (F-77). The selected state is on the perimeter layer, so hover and selected no longer share a channel.

### Item 5 · Chip `shape="cell"` per Q-8 (a)

- `src/components/chip/chipVariants.ts:13-21`: `cell` deleted; `isChipShape`. `src/styles/glass/glass-chip.css`: the `.glass-chip--cell` corner rule deleted.
- `src/components/chip/Chip.vue:83-92`: the E-11 guard. An unknown shape throws a `TypeError` naming the shapes, in the same `watchEffect` as the removable-label guard, with no DEV gate, so it is in what a consumer installs. Measured on the `chipcell` scene (the retired binding): 4 errors in both engines on `src` and on `dist`, each `TypeError: [Chip] shape="cell" is not a chip shape (pill, icon). A choice that holds more than one line is a ToggleGroup tile.`, reaching the app's error handler; the chips still render, at `9999px` (`logs/floor-chip-guard.log`, load 29.90 → 27.73).
- `selectable` is narrowed to N-of-M in the README (an independent toggle on Toggle and `aria-pressed`); its code is unchanged, and the flood stays the Chip's.
- The demo story and manifest drop the cell chip.

### MIGRATION.md

One "Unreleased" section: the three retired bindings (`<Card selected>`, `<Chip shape="cell">`, `<SegmentedTabs semantics="toggle">`), each with a detector, and the behaviour and paint rows (ring reach, arrows, reorder, editable descendants, the one-line pill, the hover rung and its readers).

---

## 2 · The floor's own reads

### 2.1 · Item 1 alone, and the hover channel

`floor-probes/hover.mjs` hovers the first unselected item and reads T-6's hover-light cell (scale pinned, ≥ 2% of pixels moving by > 10 levels). The item-1-only build is `04929544` plus the `glass.css` hunk and nothing else.

| build | engine | single light / dark | preset light / dark | specimen light / dark | log, load |
|---|---|---|---|---|---|
| HEAD `04929544` | Playwright WebKit | HUNG / HUNG | HUNG / HUNG | HUNG / HUNG | `floor-hover-webkit-head-probe.log`, 14.50 → 13.18 |
| HEAD + item 1 only | Playwright WebKit | 55.80 / 60.48 % | 82.23 / 83.10 % | 82.04 / 82.50 % | `floor-hover-webkit-item1-only.log`, 13.18 → 12.58 |
| HEAD `04929544` | Chromium | 0.00 / 0.00 % | 0.00 / 0.00 % | 0.00 / 0.00 % | `floor-hover-head-chromium.log`, 14.22 |
| HEAD + floor | Chromium | 52.98 / 60.59 % | 76.71 / 82.47 % | 24.21 / 82.49 % | `floor-hover-floor-src.log`, 13.13 → 14.22 |
| HEAD + floor | Playwright WebKit | 57.30 / 60.50 % | 80.88 / 82.56 % | 70.29 / 82.43 % | the same log |

Every HEAD+floor cell returned in 1.5-1.6 s. Item 1 alone returns because it removes the nested mix; the whole floor also keeps the floor layer under the hover (TF-8).

### 2.2 · Item 2, switched on

`floor-probes/perimeter.mjs` runs T-3's own `selectedSeparation` and `judgeT3` with `.toggle-group__item { --selection-perimeter: 1 }` injected, as a tile rule would set it. It is D′'s first check (TF-2: does the layer survive the invalid group) read on the floor.

| switch | cells | result | log, load |
|---|---|---|---|
| on | 9 scenes × light, dark, PRT × 2 engines | **54/54 PASS** | `floor-perimeter-on.log`, 32.91 → 42.55 |
| off (as shipped) | the same | 0/54 | `floor-perimeter-off.log`, 42.55 → 25.74 |

The scenes are `preset`, `specimen`, `preset-invalid`, `preset-sibling`, `preset-tone-translucent`, `preset-tone-unresolvable`, `preset-contents`, `preset-verbatim` (the shipped consumer composition, its transparent border and dashed outline) and `single`. Examples, Chromium: `preset-invalid` light 476.50 px² of ≥ 3:1 (369.75 in the perimeter band) against a 274 px² bar, dark 497.00, PRT 479.00; `preset-tone-translucent` light 447.75, dark 493.00, PRT 461.00. The fill stays 1.20 / 1.23 / 1.00:1 in every one: the edge carries, as TF-2 says. Playwright WebKit's PRT cell is the forced level-0 path.

The preset tile measures 204×70 at HEAD+floor, against 208×61.58 at HEAD (the pill law's `padding-block: 0.15em` on each label element, D-crit C-10's growth). It is still a stadium: no route has made it a tile yet.

---

## 3 · H2 on HEAD+floor against the H2 baseline

Built from the patched worktree: `floor-src` (flavour `src`) and `floor-dist` (flavour `dist`, after the library build). The battery is `run.mjs --build floor-src --webkit`, 02:20:50 → 02:44:47 (`logs/floor-battery-floor-src.log`, load 35.63 at start, 34.16 at end, 8.87 at its lowest). The baseline is `baseline/head-src` (H2.md §4, taken at load 40-259). Cells: T-1 and W-A fine, coarse and `--ui-scale 1.25`; T-3 light, dark, PRT; T-4 light, dark; T-6 fine and coarse (the coarse latch), PRM.

### 3.1 · Per witness and engine (gating cells passed / measured)

| witness | Chromium: baseline → floor | Playwright WebKit: baseline → floor | load at start, floor (Chromium; WebKit) |
|---|---|---|---|
| T-1 | 10/32 → 5/39 [unmigrated 9/12 → 9/12] | 10/35 → 5/42 [unmigrated 12/15 → 12/15] | 35.63; 30.65 |
| T-2 | 22/22 → **22/22** | 22/22 → **22/22** | 25.74; 25.20 |
| T-3 | 2/42 → 2/42 [unmigrated 12/48 → 12/48] | 2/42 → 2/42 [9/48 → 9/48] | 24.54; 20.52 |
| T-4 | 12/20 → 8/20 [3/24 → 3/24] | 12/20 → 8/20 [3/24 → 3/24] | 15.45; 16.80 |
| T-5 | 26/72 → **42/72** [11/37 → 19/37] | 26/72 → **42/72** [11/37 → 19/37] | 19.27; 14.31 |
| T-6 | 20/45 → **21/45** [24/40 → 26/40] | 14/35 → **21/45** [20/34 → 26/40] | 12.78; 8.87 |
| T-7 | 6 UNMEASURED · unmigrated 4/32 → 4/32 | 6 UNMEASURED · unmigrated 4/21 → 4/32 | 17.65; 21.12 |
| T-8 | 0/27 → 0/27 (both engines, one run); Safari UNMEASURED (owner's safaridriver checkbox) | | 31.59 |
| W-A | 2/9 → 2/9 | 2/9 → 2/9 | 18.23; 18.21 |
| W-B | 5/25 → **9/25** | 5/25 → **9/25** | 17.72; 17.03 |
| W-C | 0/8 → 0/8 | 0/8 → 0/8 | 17.83; 23.41 |
| W-D | 4/8 → 4/8 | 4/8 → 4/8 | 27.33; 29.14 |
| W-E (`src`) | 0/3 → 0/3 | 0/3 → 0/3 | 30.09; 33.39 |
| W-E (`dist`) | 0/6 → 0/6 | 0/6 → 0/6 | `logs/floor-extras-dist.log`, 33.61 |

### 3.2 · Every scene row that changed

From `compare.mjs --changed`. Chromium and Playwright WebKit agree on every row except where both are shown.

| witness | scene (arm) | baseline | floor | why |
|---|---|---|---|---|
| T-1 | `chipcell` | 5/5 | 0/12 | item 5: `shape="cell"` is retired, so the scene's chips are stadiums (and throw, §1). The rest of T-1 is unchanged: every ToggleGroupItem tile is still a stadium, because the corner is the routes' |
| T-4 | `card` | 4/4 | 0/4 | TF-5: the scene's `<Card :selected>` is retired, so the cards have no tab stop and Tab lands after the group |
| T-5 | `preset` | 5/9 | 9/9 | the grid walk (Up and Down), the keyed reorder, and the no-selection cell (Q-6 (a), HEAD's behaviour, kept) |
| T-5 | `preset-verbatim` (unmigrated) | 4/8 | 8/8 | the same, on the shipped markup |
| T-5 | `specimen` | 3/6 | 5/6 | the walk; the one fail is FadingScroll's own tab stop (TF-6 names it FadingScroll's owner's) |
| T-5 | `specimen-verbatim` (unmigrated) | 3/8 | 7/8 | the same |
| T-5 | `preset-contents` | 4/6 | 6/6 | the walk behind a `display: contents` host |
| T-5 | `preset-input` | 0/1 | 1/1 | Q-5 (b): ArrowRight typed in the `<input>` stays the input's (`focus inside:0 → inside:0`, selection unchanged); also on `dist`, both engines (`logs/floor-extras-dist.log`) |
| T-5 | `single`, `vertical` | 4/6 each | 6/6 each | the cross pair steps on one line and in a column |
| T-5 | `tabs` | 3/6 | 6/6 | TF-4: SegmentedTabs is a `radiogroup` of `radio`s with `aria-checked`, every arrow moves (the scene still spells `semantics="toggle"`, which is no longer a value and falls to the default pairing, `radio`) |
| T-6 | `preset`, `specimen` (Chromium) | 4/9 each | 6/9 each | the hover light channel and its PRM arm (items 1 and 4) |
| T-6 | `preset`, `specimen` (Playwright WebKit) | 1/4 each (pointer segment hung) | 6/9 each | item 1: the pointer segment runs. Hover light 80.88 / 70.29%, hover scale 1.015, press 0.97×0.97, coarse latch 0.00%, Tab entry quiet |
| T-6 | `specimen-verbatim` (unmigrated) | 5/10 · Playwright WebKit 1/4 | 7/10 · 7/10 | the same |
| T-6 | `card` | 5/9 | 2/9 | TF-5: no option arm, so no hover, press or keyboard commit |
| T-7 | `preset`, `specimen` (unmigrated, Playwright WebKit) | 0/1, 0/1 (hung) | 0/6, 0/7 | item 1: the four-state read runs; it reads the consumer's own paint, as Chromium does |
| W-B | the run's contract cells | 4/13 | 8/13 | the arrow cells W-B repeats from T-5 |

What stays RED on the ToggleGroupItem tiles, and is the routes' by the registry's own terms: the corner (T-1, W-A, W-D, T-8; TF-1 and Q-1 are ruled onto the tile holder a route declares); T-3 (the perimeter is dormant until a tile rule sets the switch, §2.2); the commit bar (T-6: keyboard and programmatic commits peak 1.00, the pointer commit settles at 1.01 with no bounce, in both engines; §7.3's commit arm); T-7's migrated arm (no route has migrated yet); W-E (both tiles still hold two rows). T-4's `specimen` cut (1.00 px on one side) stays: the K2 transcription pads its group `2px 2px 1rem` in unlayered CSS, which outranks the library's `@layer components` pad, so the clearance is a route migration's to reclaim by deleting that pad (B P7's failure mode). `f1` is a Button strip, outside the floor.

The `card` and `chipcell` regressions are the retired bindings measured honestly, not defects: the H2 scenes transcribe `demo/stories/display/card.vue` and Chip's `cell` arm as they stood at `04929544`, and the floor deletes both (TF-5, Q-8 (a)). The harness scenes were not edited. A route that wants those rows re-points them to its own tile.

### 3.3 · Real Safari

UNMEASURED (owner's safaridriver checkbox) in every cell. T-8's one Safari cell reads UNMEASURED in `floor-run/floor-src/T-8-both.json`. No Playwright WebKit number here stands in for Safari, including the SF-8 cure.

---

## 4 · Typecheck, unit, build

All in the patched worktree, node_modules symlinked from the checkout, the Vite and Vitest caches pinned inside the worktree.

| check | HEAD `04929544` | HEAD+floor | log |
|---|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0 | exit 0 | `floor-tsc-head.log`, `floor-tsc-floor-final.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 2, 2 errors (`@mkbabb/glass-ui/fourier-math` unresolved with no `dist/`) | exit 0 (with `dist/` built) | the same |
| `vitest run`, no `dist/` | 9 failed / 2267 passed, in 5 files: `public-surface` Row 8, `backdrop-prefix-normalization`, `FourierField.smoke`, `boot-graph`, `derive-color` | the same failing set, 2277 passed (the floor's run before `dist/` was built) | `floor-unit-head-nodist.log` |
| `vitest run`, with `dist/` | 3 failed / 2310 passed (`boot-graph`: no built demo) | 3 failed / **2320 passed** (the same 3) | `floor-unit-head-dist.log`, `floor-unit-floor-final.log` (02:48, load 22.24) |
| library build (`libbuild.mjs`, the worktree's `vite build`) | exit 0, 7.7 s | exit 0, 8.1 s | `floor-libbuild-*.log` |
| `dist/` | 837 files, 2,532,960 B; JS gzip-9 276,735 B | 837 files, **2,534,277 B (+1,317)**; JS gzip-9 277,151 B (+416) | measured with `find dist -type f` and `gzip -9` |

The ten added passing tests are the nine walk cases and the reorder case. Four existing test files were re-pointed to the new contracts (`segmented-tabs.test.ts` and `tabs-seam.test.ts` to `radio` / `aria-checked` and the `focus-ring` class; `ToggleGroup.test.ts` G-TOGGLE-WRAP, where `nowrap` and `safe center` may live on the item rule only and the group's one pad must be `var(--focus-ring-reach)`), plus the three Card tests under TF-5. The bundle datum (PF-4) moves by the numbers above; the G-BUNDLE-RATCHET gate reads a published datum and was not run here.

---

## 5 · Not built, carried

| id | what | why | owner |
|---|---|---|---|
| FL-1 | Q-5 (d), a `development` export condition | a second library build for every one of the package's exports, with its own gates; nothing in the floor needs it, because the floor's only guard (the Chip shape) ships in production. `developmentConditions` stays 0 (`floor-run/build-floor-dist.json`), so the `dist-dev` flavour still measures nothing new | a packaging wave, on the owner's ruling of Q-5 |
| FL-2 | Q-9 (a), exempting a perimeter-carrying component from `accessibility.css`'s `border-width: 2px !important` on `[data-state="on"]` | at the floor no item carries the perimeter (the switch is 0), and the exemption needs a selector for "is a tile", which is what D′ and F compete on | each route, in its tile selector |
| FL-3 | fourier-analysis `EquationModeToggle.vue:62` (`semantics="toggle"` → `"radio"`) | a consumer edit in its own tranche (E-6); sibling repositories are read-only here | fourier-analysis |
| FL-4 | the H2 `card`, `chipcell` and `tabs` scenes transcribe bindings the floor retires | the harness is H2's record and the baseline must stay comparable; the rows are read as retired (§3.2) | the route seats, per their migrations |
| FL-5 | K2's `padding: 2px 2px 1rem` on the group outranks the ring clearance | consumer CSS is unlayered; the library cannot out-rank it without `!important` | the K2 migration (every route) |
| FL-6 | real Safari | the owner's safaridriver checkbox | owner |

For the route seats: apply `floor.patch` at `04929544` (or on a later master; it applies clean at `6b75e0a7`). Turn the register on in your tile rule with `--selection-perimeter: 1`, and lift the pill law there (`white-space`, `overflow`, `justify-content`, and the label-element rule). Playwright WebKit T-6 and T-7 pointer cells on ToggleGroupItem are readable now; do not carry them as PF-1.
