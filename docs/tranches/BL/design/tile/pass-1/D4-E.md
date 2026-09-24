# D4 · pass 1 · D4-E · no multi-line selectable (research and first probe)

| field | value |
|---|---|
| seat | D4 pass 1, research seat for family D4-E: every one-of-N option is one line, detail moves to one panel for the selection, and the library refuses an option that is not one line |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`; the checkout read `4b589018` at the start and the probe worktree seeded at `9f0c31a9` (docs-only commits since). `git diff --stat 91dbcbd8 HEAD -- src` is empty, so every `src/` cite in PORTFOLIO.md holds |
| read | PORTFOLIO.md §0-2, the D4-E section, §6 D4-E, §7; `pass-1/X.md`; `harness/HARNESS.md` and the harness sources; `src/components/toggle-group/*`, `src/components/tabs/{SegmentedTabs.vue,types.ts,styles/segmented.css,composables/useTabResponsive.ts}`, `composables/motion/morph/useSelectionGroup.ts:151-278`, `styles/glass/{control-surfaces.css,glass-capsule.css}`, `styles/theme/radius.css:140-180`, `styles/tokens/{sizing.css:27-29,color-radius.css:145-157}`, `styles/utilities/base.css:125-151`, `button/Button.vue:125-145` (the DEV-guard idiom). Consumers, read-only: keyframes.js `a939e7d6` `demo/scenes/spring/SpringPhysicsFacet.vue` (whole), `SpringHeatmap.vue:81-82,260-264`, `SpringTarget.vue:170-196`, `demo/scenes/easing/EasingTarget.vue:1-160,195-235`, `demo/utils/reference-data/easingGroups.ts`; fourier-analysis `EquationModeToggle.vue:62` (grep); value.js and chicago by grep only. Nothing was built or run in any sibling repo |
| instruments | A worktree at `scratchpad/D4/p1/D4-E-research/wt` (node_modules symlinked from the checkout; vitest `cacheDir` pointed into scratch), removed with `git worktree remove --force` before return. A private copy of the D4 harness at `scratchpad/D4/p1/D4-E-research/harness/` (REPO repointed; `scenes.mjs` recomposes `preset`, `specimen`, `strip` and their verbatim pairs as D4-E consumers would ship them, and adds `preset-tg`, `specimen-st`, `phone`); the checkout's harness was only run read-only (`build.mjs` into scratch). Playwright 1.61.1 from `glass-ui/node_modules`, headless Chromium 149 and Playwright WebKit 26.5, 1000×900 at DSF 2 (the phone probe 390×844). Load average 51-152 during the runs (other seats); every number is a settled static read or a real input event |
| Safari | every real-Safari cell: UNMEASURED (owner's safaridriver checkbox) |
| deliverable | this file; the probe patch at `scratchpad/D4/p1/D4-E-research/e-probe.patch` (6 files, +158/−14) |

## 0 · In brief

1. **The Spring facet loses almost nothing; the specimen gallery loses its thesis.** keyframes.js already moved the four-preset race out of the tiles to the stage derby (`SpringPhysicsFacet.vue` header comment at the ToggleGroup: "the four presets' live race is the stage's derby, SpringTarget") and plots the presets as pips on the heatmap (`SpringHeatmap.vue:81-82,260-264`). So E's detail row needs only the readout; a second race there would duplicate the derby (P-3). The specimen drawer is the owner-approved scene ("THE SPECIMEN DRAWER IS THE SCENE ... The comparative read IS the pedagogy", `EasingTarget.vue:2-9`, OD-7). As one-line figures, the portrait shrinks from a 150×52 stage to 88×28 (ToggleGroup `lg`) or 72×17 (SegmentedTabs), and the host shows 3.3 plates at once where HEAD shows six (§1.1).
2. **"An option is one line" can be enforced at the root for the shape, and only for the shape.** The probe locks the block size of ToggleGroupItem and SegmentedTabs tabs to their rung. With that lock, T-1 never reaches past the rung in either engine, and T-8 is 18/18. The DEV refusal names the violation: 4 of 4 preset tiles and 8 of 8 specimen tiles on the HEAD compositions, in Chromium and Playwright WebKit. The information design is still the consumer's to change. The refusal also misses three cases: a line that lands in a graphic's band, sets hand-rolled outside the library (8 of X.md's 11), and Chip.
3. **The battery, as migrated E consumers on the patched library (Chromium / Playwright WebKit):** T-2 20/20 · 20/20; T-3 13/18 · 13/18, all 12 E cells pass; T-4 24/24 · 24/24; T-5 28/38, all 16 E cells pass; T-6 23/30 · 21/30; T-7 12/12; T-8 18/18; W-E 6/8 · 6/8 in the DEV build. The cells that stay RED are the Card arm and the Chip cell, which E retires rather than cures, plus the three T-6 weaknesses in item 4.
4. **SegmentedTabs is the host that passes both engines; ToggleGroupItem is not.** The SegmentedTabs preset is 6/6 on T-6 in both engines: hover light 73.52 % Chromium, 74.10 % Playwright WebKit. ToggleGroupItem fails in three ways. Its hover light channel moves 0.00 % of pixels, because the capsule gleam lightens while the fill darkens and the two cancel. Its Playwright WebKit renderer crashes under hover. And the library's `--fill-hover` rung (0.05) is too faint to pass the threshold even on tabs.
5. **The selected carrier needs full ink.** The 0.48 perimeter rung, whose token note says "3.0:1", separates 3:1 from the page but not from the unselected sibling's rim. On ToggleGroupItem it failed light and PRT (p95 about 2.0). On the SegmentedTabs indicator at 1 px it failed PRT (p95 1.81). A full-ink edge passes every E cell (p95 3.46-8.61).
6. **Q3: 28 portraits cannot all be told apart without their names at any size E allows, or at HEAD's.** 8 of the 378 pairs differ by less than 1.5 px anywhere on a 28 px or a 33 px plot. Prior art keeps the name next to a small preview, or shows one preview for the selection (§1.3). E keeps captions, so every specimen figure is still two rows. Only the plate is one line.

## 1 · Research answers

### 1.1 Q1 · what each consumer loses (prototype and owner glance)

Prototype (`harness/scenes.mjs`, the D4-E arms). The HEAD capture is the harness glance `D4/p1/harness/glance/{preset,specimen}-{light,dark}-consumer.png` (keyframes.js as it ships). The E capture is `cap/e-lib4/{preset,specimen,strip}-{light,dark}.png`. Side by side: **`cap/glance-sheet.png`**.

| site | E composition | measured | what is lost | what is gained |
|---|---|---|---|---|
| K1 Spring presets | SegmentedTabs of four names; one detail row: name, `0.35 s · ζ 0.78`, blurb; the prototype also drew a four-lane race, which the consumer already has on the stage derby, so the shipping form is the readout only | tabs 104×32.94, used 16.47 (÷h/2 1.00); 1 row each | the four params lines of the *unselected* presets (their values stay readable as the heatmap pips' positions; `title` keeps the blurb) | the grid of four boxes becomes one control plus one line, which answers "cluttered". T-3 3.57 / 5.11 / 3.46 p95 (light / dark / PRT), T-5 radiogroup, T-6 6/6 in both engines |
| K2 easing specimens | a filmstrip: ToggleGroup `size="lg"` of portrait plates (sparkline, rail and ball), the name a caption outside the plate, the selected name promoted to the header; variant `specimen-st` as a SegmentedTabs strip | plate 122×44, stage 88×28, used 22 (÷h/2 1.00); SegmentedTabs arm 96×32.94 with a 72×17 stage | the owner-approved gallery: at the 460 px host, 3.3 plates visible against six tiles at HEAD. Portrait area falls to 0.32× (lg) or 0.16× (tabs). The row has no 2-D layout, so Up and Down are gone | T-5 row keys pass; T-3 all cells pass; the ring clears once the consumer pads its port 6 px |
| V1 value.js strip | ToggleGroup `type="single"`, glyph-only items (`aria-label` names them), the family eyebrow outside | 40×40, used 20; 1 row | the 9 px in-circle label (the chip already carried `aria-label`) | `radiogroup`, one tab stop, arrows, where HEAD announced six `aria-pressed` stops |

**Owner glance (a reading of the sheet, not a measurement).** The preset row reads calmer than the four boxes: one line of choice, one line of answer. The specimen filmstrip reads as a strip of small pills. The comparative race, where all the balls leave together, is legible only for the three plates in view. That was the point of the scene, and E gives it up. The full-ink edge is visibly heavier than HEAD's 1.2:1 fill tint.

### 1.2 Q2 · enforceable at the root, or only guidance

Measured on three layers, each on the real source in the worktree:

| layer | mechanism | measured |
|---|---|---|
| construction (CSS) | `.toggle-group__item { block-size: var(--toggle-group-item-size); white-space: nowrap }`; `.segmented-tab { box-sizing: content-box; block-size: 1lh }` | T-1 on every E holder: "never past its rung". Tab 32.94 px at +0, +1 and +2 lines; ToggleGroupItem 40.00 at +0, +1, +2 (wrap scene 70.05 → 110.00 wide, 40.00 tall). Both engines. HEAD for comparison: the tab grew 32.94 → 55.88 → 78.81 px as a stadium, the item 40 → 47.89 → 78.48 |
| refusal (DEV) | `_shared/one-line.ts`: a ResizeObserver plus a MutationObserver; refuse when an option holds more than one row, or when a rung-bearing option grows past it | HEAD compositions mounted on the patched DEV build (`headviol.mjs`): preset 4 refusals, specimen 8, identical in Playwright WebKit; single, tabs and wrap 0 (no false positives). W-E on E scenes, DEV build: 6/8 in both engines (preset and preset-tg refused; specimen and strip not, see below). Production build: no refusal (stripped by design), W-E 4/8 |
| paint | the lock crushes an unmigrated multi-line tile to the rung: preset 208×40, specimen 150.5×36 (`cap/headscene-on-elib-{preset,specimen}.png`: the names overprint the params, the specimen name collapses into dots) | loud in paint in both engines; no clipping, no fallback |
| invariant test | happy-dom has no layout, so the row count reads 0 rects and a unit test cannot see a second line; the invariant needs a browser run (a Playwright pass over the library's stories that mount ToggleGroup and SegmentedTabs, gating zero `[glass-ui] … option` errors and every item at its rung) | not written; the harness W-E is its prototype |

What the refusal misses, each seen on a run:
- **A line that lands in a graphic's band.** In the specimen scene the witness appends a line into the 28 px stage. The text rect overlaps the sparkline vertically, so the geometry reads one row: no refusal, both engines.
- **Side-by-side growth.** In the strip the appended line lands inside an inline-flex glyph wrapper and sits beside the glyph (40 → 120 → 216 px wide, 40 tall). By E's own rule ("a glyph and a label side by side") that is legal. The W-E refusal cell demands a refusal regardless, so this cell is a witness strictness, not a defect.
- **Anything outside ToggleGroupItem and SegmentedTabs.** Chip is unguarded: 0 refusals on the HEAD strip, where two rows sit in a 44 px circle. So are the eight hand-rolled sets on Button and `<button>` (X.md §1.2).

Verdict: the root-level rule is real for the library's two one-of-N hosts. Their stadium cannot become a lozenge in either engine, and a violation fails loud in paint and in the DEV console. N-9's "fixed at the root" is met for the corner. It is not met for the owner's picture: the Spring and specimen scenes change only when keyframes.js rebuilds them.

### 1.3 Q3 · recognition without names

`recog.mjs` samples the 28 specimen curves (`easingGroups.ts`, the non-Custom groups: Standard 5, Sine 3, Quad 3, Cubic 4 with smooth-step-3, Expo 3, Circ 3, Back 3, ease-in-bounce, steps, step-start, step-end) at 201 points. For each pair it takes the largest vertical difference and scales it to the plot height. The ease-in-out-back formula is the mirrored in-back, an approximation.

| plot height | pairs < 1.5 px apart everywhere | pairs < 3 px | curves whose nearest neighbour is < 3 px away |
|---|---|---|---|
| 16 px | 17 | 43 | 24 |
| 22 px | 11 | 33 | 20 |
| 28 px (E ToggleGroup `lg` plate) | 8 | 22 | 16 |
| 33 px (HEAD sparkline, 52 × 0.64) | 8 | 17 | 14 |

The eight pairs that stay under 1.5 px at every size: ease-in ~ ease-in-sine (0.8 px at 33), ease-out ~ ease-out-sine (0.8), ease-in-out ~ ease-in-out-quad (0.4), smooth-step-3 ~ ease-in-out-sine (0.3), plus their mirrors in the nearest-neighbour table. No portrait size separates them, so the names stay whatever the plate shape.

Prior art (web search, 2026-09-24). Chrome DevTools' cubic-bezier editor offers presets as curve thumbnails without visible names and animates one ball for the selected curve only: one preview, in a detail area ([Using Cubic-Bezier Tool in Google Chrome Devtools](http://rempixels.blogspot.com/2015/04/cubic-bezier-chrome-devtools.html); [Chrome for Developers, linear() easing](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)). Figma's prototype easing is a named "Curve" menu, with the animation previewed in the interaction-details window ([Figma Learn, easing and spring animations](https://help.figma.com/hc/en-us/articles/360051748654-Prototype-easing-and-spring-animations)). Its spring presets are named, not drawn: Gentle, Quick, Bouncy, Slow ([Figma Learn, Prototype animations](https://help.figma.com/hc/en-us/articles/360040522373-Prototype-animations)). Both keep the choice small (names, or a dozen thumbnails) and put the one live preview in a panel for the selection. That is E's mechanism, and neither tries to show 28 live previews side by side, which is keyframes.js's scene.

### 1.4 Q4 · which F-30b rows survive E

Classification from X.md §3, re-read against E's probe:

| row | site | what E does | where it goes |
|---|---|---|---|
| UIA-V-180 | value.js `AdminTagsPanel.vue:124-146`, a static tag chip that wraps | nothing: it is not a selection option, and the lock is on ToggleGroupItem and tabs only. Extending "a pill is one line" to the pill Chip would truncate tags; the sibling tags already truncate at `max-w-[9ch]` | survives; the F-30b canon row for a multi-line holder on a stadium role (the wrapped pill Chip measured 10.70 → 21.41 → 32.11 px, ÷h/2 1.00, on the patched build too) |
| UIA-KF-047 | keyframes.js `MatrixEditor.vue:8-40`, cells wrapping an Input | nothing: the selection is an editing cursor and the cell holds an interactive child, so it cannot be a radio | survives; canon (the field corner) |
| UIA-V-332 | value.js `MigratePalettesDialog.vue:14-35`, stacked full-width action Buttons | nothing: single-line actions, a legal stadium | survives; canon ruling on stacked full-width actions |
| UIA-F-100 | glass-ui `_shared/disclosure/disclosure.css:40-42` | nothing: not selectable | survives; canon |

E closes none of the four. It also has no answer for three census sites X.md §4.3 lists: V2 (value.js Mix palettes, N-of-M thumbnail tiles), F1 (fourier-analysis HarmonicLevelGrid, a one-of-N thumbnail strip on Button whose thumbnails are the scene) and F2 (the gallery card with interactive children).

### 1.5 Q5 · four long labels on a 390 px phone

`phone.mjs`, scene `phone`, four German labels ("Kritisch gedämpft", "Schnell mit Überschwingen", "Deutlich federnd", "Langsam und weich"), patched build:

| control | Chromium | Playwright WebKit |
|---|---|---|
| SegmentedTabs strip (no `responsive`) | page `scrollWidth` 573 vs `clientWidth` 390: the page pans 183 px. The strip's scrollWidth is 549 inside its 342 px box; tab widths 122 / 175.5 / 115.5 / 133.3 (the `1fr` columns lose to `nowrap` min-content) | 574 vs 390; strip 550 in 342 |
| SegmentedTabs `:responsive="true"` | collapses to a Select trigger 155.5×40 (the fixed 640 px breakpoint) | the same |
| ToggleGroup row of the same labels | wraps to three rows, 342×128; every item is one line at 40 px; no pan | the same |
| DEV refusals | 0 (every option stays one line) | 0 |

The policy E has to specify (R4-02-15, UIA-F-41):
- **A strip whose options do not fit one line collapses.** The trigger is measured overflow (`scrollWidth > clientWidth` on the track, or the sum of min-content tab widths exceeding the track), not a fixed viewport breakpoint that a consumer must remember to opt into.
- **A ToggleGroup row wraps.** It already does, and wrapping keeps each option one line.
- A Select is one-line by construction, so the collapse keeps E's law.

**Toggle semantics become a radiogroup.** Probed: `SegmentedTabsSemantics` is `"radio" | "tabs"`, and the default pill is `radiogroup` / `radio` / `aria-checked` through the engine's `itemAttrs` (T-5 preset and tabs PASS where HEAD read `group` plus `aria-pressed`). Three unit cells re-point: `tests/gates/tabs-seam.test.ts` (two: they assert `aria-pressed` and the old template shape) and `tests/components/ui/toggle-group/ToggleGroup.test.ts` G-TOGGLE-WRAP (it forbids the string `nowrap` in the sheet; the lock's `white-space: nowrap` is on the item, not the row). The other 77 cells in those three files pass. The consumer edit is `semantics="toggle"` → `"radio"` at fourier-analysis `EquationModeToggle.vue:62`, the one site in the four consumers (grep).

## 2 · The strongest form (what E must specify to work)

1. **The law.** A one-of-N option is one row: a label, a glyph, or both side by side. Its block size is its control rung. Detail belongs to the selection: a single readout or detail row, a caption outside the plate, or the scene's own header. It never belongs to each option.
2. **The construction.** ToggleGroupItem: `block-size: var(--toggle-group-item-size); white-space: nowrap`. SegmentedTabs tab: `box-sizing: content-box; block-size: 1lh`. The corner stays `--radius-pill` and is correct because the box cannot grow (the canon test at `radius-role-canon.test.ts:555-568` keeps passing as written).
3. **The refusal.** `_shared/one-line.ts`, DEV only, on both hosts. It checks on mount, on resize and on content mutation, and names the host, the option and the row count. Its row test splits at the vertical midpoint of the current row. The harness test, which splits on edge overlap, merges two stacked lines at `line-height: 1` (§6).
4. **The selected carrier.** The option's own edge at full ink: `border-color: var(--foreground)` on ToggleGroupItem `[data-state="on"]`, and a 1.5 px `var(--foreground)` border on the SegmentedTabs pill indicator, so the edge rides the glide and the squish. It sits on `border`, a channel neither the ring (`outline`) nor the rim (`box-shadow`) uses.
5. **Focus.** SegmentedTabs tabs compose `.focus-ring`. At HEAD they had none and painted the UA `outline: auto 1px`, which measured 1.00 px per side in dark (T-4 FAIL, 4 cells).
6. **Hover light.** A light plate on the unselected option under `(hover: hover)`. The probe used an 8 % foreground mix: the library's `--fill-hover` 0.05 moved 0.00 % of pixels past the threshold on the preset tabs, and 8 % moved 73.52 %.
7. **Overflow.** A strip collapses to its Select on measured overflow; a row wraps.
8. **Engagement.** SegmentedTabs' glide, squish and eyeglass wake carry the commit (the harness counts a 200 ms colour transition and the 220 ms WAAPI press on the item; the glide is on the indicator and no witness measures it, HARNESS §6). ToggleGroup rows keep the item's press 0.97 and hover scale 1.015. E has no flood or pop of its own on ToggleGroup.
9. **Retirements.** Card's `selected` arm, which has no consumer (PORTFOLIO §1.3 item 6), is deleted rather than cured. A Chip `selectable` stays for N-of-M toggles, which are correctly `aria-pressed`, and one-of-N sets leave Chip for ToggleGroup. Proposed, not probed.

## 3 · The probe (worktree, real source) and the battery

Patch: `scratchpad/D4/p1/D4-E-research/e-probe.patch`. The files:

- `src/components/_shared/one-line.ts`: new, 96 lines.
- `toggle-group/ToggleGroupItem.vue`: +4 (the guard).
- `toggle-group/styles.css`: +19 (lock, edge, hover).
- `tabs/SegmentedTabs.vue`: +17 −10 (radiogroup through the engine's `groupRole` and `itemAttrs`, `focus-ring`, the guard).
- `tabs/styles/segmented.css`: +17 (lock, indicator edge, hover).
- `tabs/types.ts`: `"toggle"` → `"radio"`.

Builds: `e-head` is the E compositions on the unmodified library, i.e. what the consumer migration alone buys. `e-lib4` is the E compositions on the patched library, production compile, with the final CSS. `e-lib4-dev` is the same with `--dev`. `e-lib5` has `--fill-hover` 0.05 in place of 8 % and adds `specimen-st`. The logs are in `logs/`, the JSON in `out/runs/<label>/`.

| witness | `e-head` Chromium · Playwright WebKit | `e-lib4` Chromium · Playwright WebKit | the E-hosted cells on `e-lib4` |
|---|---|---|---|
| T-1 | FAIL 6/10 · 6/10 | FAIL 3/5, 6 unmeasured · the same | every E holder "never past its rung" (tab 32.94 flat, item 40.00 flat). RED: wrap pill Chip 10.70 → 32.11 px; Button 20 px flat but no named role (HARNESS §6) |
| T-2 | PASS 20/20 · 20/20 | PASS 20/20 · 20/20 | tab used 16.47 on 32.94; item 20.00 on 40; plate 22.00 on 44 |
| T-3 | FAIL 1/18 · 1/18 | FAIL 13/18 · 13/18 | 12/12 PASS in both engines. Chromium p95 light / dark / PRT: preset 3.57 / 5.11 / 3.46; preset-tg 5.82 / 8.36 / 8.10; specimen 4.16 / 5.82 / 4.60; strip 7.18 / 8.61 / 8.11. At `e-head` the same scenes read 1.44 / 1.09 / 1.05 (the glass indicator alone) and 1.20 / 1.23 / 1.00 (the item fill). RED: card ×3 and chipcell light and PRT, which E retires |
| T-4 | FAIL 20/24 · PASS 24/24 | PASS 24/24 · 24/24 | tabs: `outline solid 2px offset 2px`, 2.00 px every side, where `e-head` read `auto 1px` and 1.00 px in dark; specimen ring whole inside a 6 px port pad |
| T-5 | FAIL 26/38 | FAIL 28/38 | 16/16 PASS: preset, preset-tg, specimen and strip are `radiogroup` / `radio`, 1 stop, Right and Left move and check. RED: card (6 cells) and chipcell (4) |
| T-6 | FAIL 21/30 · 13/20 | FAIL 23/30 · 21/30 | preset (SegmentedTabs) 6/6 in both engines: hover light 73.52 % · 74.10 %, PRM the same, scale 1.015, press 0.97, commit 200 ms colour + 220 ms press, coarse no latch. ToggleGroupItem (preset-tg, specimen): hover light 0.00 % in both engines; Playwright WebKit "Page crashed" (at `e-head`, a 120 s hang) |
| T-7 | PASS 12/12 | PASS 12/12 | the migrated compositions carry no tile paint in four states (content ink on portraits and glyphs reported, not gated) |
| T-8 | FAIL 6/26 | PASS 18/18, 11 unmeasured (T-1 never past the rung; real Safari UNMEASURED) | |
| W-E | FAIL 4/8 · (production) | production FAIL 4/8 · 4/8; DEV FAIL 6/8 · 6/8 | every item one row at its rung; refusal PASS on preset and preset-tg; specimen and strip no refusal (§1.2) |
| `specimen-st` (`e-lib5`) | | T-3 3/3 · 3/3 (Chromium p95 3.93 / 5.54 / 4.08); T-4 4/4; T-5 4/4; T-6 6/6 · 6/6 (hover light 43.76 % · 2.73 %, marginal in Playwright WebKit at the 0.05 rung) | a filmstrip of SegmentedTabs is green end to end, with a 72×17 portrait |
| unit (vitest, worktree) | | 77 pass, 3 fail (the re-points in §1.5) | |

What the consumer migration alone buys (`e-head`): T-2, T-4 in Playwright WebKit, T-7, and the one-line half of W-E. Everything else needs the library half: T-3's edge, the T-4 ring on tabs, T-5's radiogroup on tabs, T-6's hover light on tabs, the T-1 lock, and the refusal.

**Cost.** 158 added lines, 14 removed, in six files, one of them new. There is no new component and no new prop. One exported type literal changes (`SegmentedTabsSemantics`). Two behaviours change for every mount. First, a ToggleGroupItem or tab can no longer grow in block size. Second, every selected ToggleGroupItem and every pill indicator gains a full-ink edge, so the pill's look changes library-wide.

## 4 · Public API and consumer impact

| change | kind |
|---|---|
| `SegmentedTabsSemantics = "radio" \| "tabs"`; the pill default announces `radiogroup` | clean break (E-1) |
| ToggleGroupItem and SegmentedTabs tab: the block size is the rung, `nowrap` | behaviour; multi-line content is crushed in paint and refused in DEV |
| selected edge at full ink on ToggleGroupItem and the pill indicator; `focus-ring` on tabs; the hover light plate | paint |
| `_shared/one-line.ts` | private (not exported); two sites (E-7) |
| Card `selected` arm deleted; one-of-N off Chip | proposed |

| consumer (installed glass-ui) | what E asks, in its own tranche (E-6) |
|---|---|
| keyframes.js (`10.0.1`) | `SpringPhysicsFacet.vue`: replace the preset ToggleGroup grid with a SegmentedTabs of four names and one readout line. This deletes the group reset (`:74` utilities), the item layout utilities (`:84`) and the scoped cell paint (`:197-215`, which includes the dashed outline on the ring's property). The `NO_PRESET` case (`:140`) needs a SegmentedTabs model that can hold "none" (open gap). `EasingTarget.vue:115-158`: the gallery becomes a filmstrip, or it stays a non-selectable figure gallery with a separate one-line chooser, which duplicates the list. Either way `EasingTarget.css:116` and `EasingTarget.vue:410-416` go. Until migrated, adopting crushes both tile sets (`cap/headscene-on-elib-*.png`) |
| value.js (`^7.0.0`) | `EasingSpecimenStrip.vue`: Chip icon set → ToggleGroup `type="single"`, glyph-only items; deletes the hand exclusivity (`:33-35`) and the fixed box (`:179-181`). It crosses three majors first. ConsoleRail is untouched (single-line; its enclosure is the F-30a interface). MixSourceSelector (N-of-M thumbnails) has no E answer |
| fourier-analysis (`10.0.1`) | `EquationModeToggle.vue:62` `semantics="toggle"` → `"radio"`. The single-line `aria-pressed` one-of-N pills (FunctionInput, GallerySearchBar, NotationPills) can move to ToggleGroup `type="single"`; GallerySearchBar's deselect needs a "none" arm. HarmonicLevelGrid has no E answer short of dropping its thumbnails |
| chicago (`^10.0.1`) | the one SegmentedTabs mount becomes a radiogroup with no edit; the status-filter radios (`TempApp.vue:316-330`) are untouched |

## 5 · Chrome and Playwright WebKit

- Geometry, the lock, T-2, T-3, T-4, T-7 and T-8 agree between the engines to 0.1 px or 0.2:1 on every E cell. The indicator's p95 separation is higher in Playwright WebKit (preset 11.57 / 15.78 against 3.57 / 5.11).
- **ToggleGroupItem hover:** it hangs (`e-head`, 120 s) or crashes (`e-lib4`, "Page crashed") the Playwright WebKit renderer on preset-tg and specimen. SegmentedTabs hover does not. PORTFOLIO's harness notes saw the same crash at HEAD; the E patch does not cause or cure it.
- **The hover light at the 0.05 rung:** `specimen-st` moved 43.76 % in Chromium and 2.73 % in Playwright WebKit, just over the 2 % threshold.
- **The phone:** the overflow, the collapse and the wrap are identical in both engines (§1.5).
- Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell.

## 6 · Weaknesses, as named counterexamples

1. **K2, the owner-approved gallery.** OD-7 ruled the 28 racing specimens to be the scene. E either shrinks them to a filmstrip showing 3.3 at a time with 0.16-0.32× the portrait area, or separates the gallery from the choosing and lists the 28 twice.
2. **The caption still makes a second row.** Eight pairs of curves differ by under 1.5 px (§1.3), so the names stay. Each specimen figure is still a plate over a caption; E moved the second row out of the button, not off the page. Its answer to "cluttered" is weaker here than on the presets.
3. **N-of-M thumbnails (V2) and the harmonic strip (F1) have no E form.** E is single-select and one-line; both sites are neither.
4. **ToggleGroupItem cannot carry E's engagement today.** Hover light is 0.00 % in both engines: the capsule gleam lightens and the fill darkens. Measured at rest → hover, R 194.1 → 195.7 with an 8 % foreground plate. Playwright WebKit crashes on its hover. Two of the three E sites (the specimens, the strip) sit on it.
5. **The lock is a hard break at adopt.** An unmigrated keyframes.js paints crushed tiles (208×40, 150.5×36) on the first install. That is loud (E-2), but it is a visible regression until the consumer's own tranche lands.
6. **The refusal has holes.** It misses a line inside a graphic's band (the specimen W-E cell), Chip (0 refusals on the HEAD strip), and every set built on Button or `<button>` (8 of 11 in X.md).
7. **The perimeter rung does not do its job here.** `--ink-perimeter` 0.48 is labelled "the selection indicator — 3.0:1" (`color-radius.css:147`), yet it failed light and PRT against the unselected rim. E needs full ink, which reads heavier than any selected state in the library today.
8. **The hover rung is too faint.** `--fill-hover` 0.05 fails the witness on the tabs (0.00 %). E needs 0.08, which is either a new literal or a re-tuned token, and the token has other readers (`control-bit.css:299`).
9. **`NO_PRESET`.** SegmentedTabs' model is required and single; the Spring facet's "no preset matches the live params" state has no home without a deselectable arm (X-6).

Harness defects found (in the checkout's harness; not edited, only this private copy was run):
- `__th.rows()` clusters on edge overlap. At `line-height: 1`, text rects are taller than the line box, so two stacked lines read as one row: the patched preset-tg item with an appended line read `rows 1` (`dbg.mjs`). W-E's "one line" cell can pass a two-row item.
- T-1 on `e-head` preset-tg matched 23.95 px to `--radius-dock-card` and called the stadium "named, flat" (a coincidental match).
- The W-E refusal cell on the strip demands a refusal where the added line lands beside the glyph, which the law allows.

## 7 · Artefacts

All under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-E-research/`:
- `e-probe.patch`: the library patch, applied at `9f0c31a9`.
- `harness/`: the private harness copy. `scenes.mjs` holds the E compositions; the probes are `shot.mjs`, `phone.mjs`, `headviol.mjs`, `hov*.mjs`, `dbg.mjs`, `sheet.mjs`.
- `recog.mjs`: the portrait distinguishability computation.
- `out/builds/{e-head,e-lib4,e-lib4-dev,e-lib5,headscenes-elib,headscenes-elib-dev}/`, with the per-witness JSON in `out/runs/<label>/`.
- `logs/{e-head,e-head-rest,e-lib4,e-lib5,we-dev-chromium,we-dev-webkit}.log`.
- `cap/glance-sheet.png` (HEAD against E), `cap/e-head/`, `cap/e-lib4/`, `cap/e-lib5/`, `cap/headscene-on-elib-*.png` (the crush), `cap/phone-{chromium,webkit}.png`.

Two process notes:
- The first two background battery runs were killed with exit 144 under load 129-152. They were re-run, and their JSON cells were kept.
- One `git add -N` ran inside the probe worktree, to include the new file in the saved diff. It is a git write beyond worktree add and remove, and it left with the worktree. The checkout was not touched apart from this file.
