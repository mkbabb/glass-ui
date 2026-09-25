# D4 · pass 1 · D4-E · prototype (no multi-line selectable)

| field | value |
|---|---|
| seat | D4 pass 1, prototype seat for family D4-E. Test-implements SPECS.md §D4-E on the real source in a worktree, then runs the battery, the family witness and a gestalt read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`. The worktree seeded at `3563ca05`; the checkout moved to `1dea8ac0` during the run. `git diff --stat 91dbcbd8 3563ca05 -- src demo tests vite.targets.ts package.json` and `git diff --stat 3563ca05 1dea8ac0 -- src demo tests vite.targets.ts package.json` are both empty |
| verdict | **RUNS.** typecheck exit 0, the affected unit suites green (one env-only gate aside), the library build exit 0, the battery and W-E run in Chromium and Playwright WebKit. Every E-hosted cell is GREEN except the ToggleGroupItem hover light channel and one spec composition (`specimen-st`) that the spec's own overflow rule collapses |
| patch | `docs/tranches/BL/design/tile/pass-1/D4-E-proto.patch`: 20 files, +357 −337 (`git apply --check` clean at HEAD). `git diff` in the worktree plus `git diff --no-index /dev/null` for the new file, copied byte-exact from scratch (`shasum` a5b42334…70e on both copies) |
| engines | Chromium 149 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-E-proto/` (below: `$S`). Worktrees `$S/wt` (patched) and `$S/wt-head` (HEAD, for the before builds), both removed with `git worktree remove --force` before return |

## 0 · In brief

1. **The law holds at the root on both hosts.** ToggleGroupItem is locked to its rung (40.00 px at +0, +1 and +2 lines) and a SegmentedTabs tab to one line box (32.94 px). Both engines agree. T-2 passes 20/20 in each engine, and T-8 passes 18/18.
2. **The selected carrier works everywhere E puts it.** A full-ink `border` separates on every E cell in light, dark and PRT, in both engines: T-3 p95 3.46-8.61 in Chromium and 4.42-16.20 in Playwright WebKit. The pill eyeglass now wears a visible 1.5 px ink ring. It reads heavier than HEAD's glass (§4).
3. **The measured-overflow collapse works, and it breaks one of the spec's own compositions.** A phone strip that panned the page 183 px now folds to a 155.5×40 Select, expands again at 1200 px and re-folds at 390, identically in both engines. But `specimen-st`, the spec's K2 variant ("a SegmentedTabs strip with a 72×17 stage"), is eight portrait tabs in a 414 px host. The rule collapses it to a name-only Select, and every portrait disappears. The spec's §E.1 Overflow and its K2 `specimen-st` cannot both stand (§5 B-1).
4. **ToggleGroupItem still cannot carry E's engagement in light.** The 8 % hover plate moves 0.00 % of pixels in both engines, with and without PRM. Playwright WebKit crashes under its hover ("Page crashed"). The SegmentedTabs preset passes all six T-6 cells in both engines (hover light 73.68 % Chromium, 74.10 % Playwright WebKit). Two of the three consumer sites (the specimens and the strip) sit on ToggleGroupItem.
5. **Card's `selected` arm is deleted, and the deletion also cures SF-17.** Card now binds no `role`, `tabindex` or `aria-selected`, so a consumer's own option attributes land untouched. The search route lost the 12 component-minted tab stops it carried (the residual `search-contracts.test.ts` had pinned). The demo's "Selectable cards" section becomes a one-line ToggleGroup plus one detail Card.
6. **Two harness defects found and fixed in the private copy** (§6): the previous seat's SF-20 `rows()` correction returned 0 for every element (NaN comparison), which made W-E's one-line cell unfalsifiable. W-E also threw a harness error on a scene with zero items.

## 1 · What the patch changes

`$S/wt` at `3563ca05`, starting from the research probe (`D4-E-research/e-probe.patch`, applied clean). Spec items added beyond the probe: the measured-overflow collapse, the Card deletion, the demo re-points and the unit re-points.

| file | change | spec |
|---|---|---|
| `src/components/_shared/one-line.ts` (new, 96) | the DEV refusal: ResizeObserver plus MutationObserver; checks on mount, resize and mutation; the row test splits at the vertical midpoint of the current row | §E.1 refusal |
| `toggle-group/ToggleGroupItem.vue` (+4) | wires the refusal | §E.1 |
| `toggle-group/styles.css` (+19) | `block-size: var(--toggle-group-item-size); white-space: nowrap`; `[data-state="on"] { border-color: var(--foreground) }`; `(hover: hover)` 8 % foreground plate on `[data-state="off"]` | §E.1 construction, state registers |
| `tabs/SegmentedTabs.vue` | the `radiogroup` role through `selection.groupRole` / `itemAttrs`; `focus-ring` on each tab; the refusal; `strip` / `collapsedRoot` / `vertical` into the collapse; `responsive: false` default removed | §E.1 keyboard and ARIA, focus, overflow |
| `tabs/styles/segmented.css` (+17) | `box-sizing: content-box; block-size: 1lh` on the tab; a 1.5 px `var(--foreground)` border on the pill indicator; the 8 % hover plate | §E.1 |
| `tabs/types.ts` | `SegmentedTabsSemantics = "radio" \| "tabs"`; `SegmentedTabsResponsive` loses `breakpoint`, and `desktopOptions` becomes `stripOptions`; `responsive?: SegmentedTabsResponsive<V>` (the boolean arm is gone because the collapse is no longer opt-in) | §E.2 clean break |
| `tabs/composables/useTabResponsive.ts` (rewritten) | collapse when the horizontal strip's `scrollWidth > clientWidth + 1` or its box outruns its host's content box; the needed width is kept, and the Select expands back when the host offers it; one ResizeObserver on the rendered branch and its parent; vertical strips never collapse | §E.1 overflow |
| `tabs/README.md` | radio semantics; the overflow collapse | P-3 |
| `card/Card.vue`, `card/styles.css` | the `selected` prop, `role` / `tabindex` / `aria-selected` / `data-selected` bindings, `@property --card-fill` and the whole `.card[role="option"]` register deleted (−101 CSS lines) | §E.1 retirements (proposed) |
| `styles/paper.css` | the comment about the paper-grid versus card-fill collision trimmed; the collision no longer exists | P-3 |
| `demo/stories/display/card.vue` | "Selectable cards" (a `listbox` of Card options) → "Choosing, then reading": a ToggleGroup `type="single"` of plan names plus one Card for the selection | §E.1 site G |
| `demo/stories/data/search.vue` | result rows: `role="option"` and `aria-selected` written by the route (they now land); a scoped full-ink `border-color` on the active row | SF-17 |
| `demo/stories/navigation/tabs.vue` | the collapse story's copy (no 640 px breakpoint) | |
| tests (6 files) | re-points: `tabs-seam` (`toggle` → `radio`, `aria-pressed` → `aria-checked`, the `focus-ring` class, the collapse carve), `segmented-tabs` (`radiogroup`, `stripOptions`, no matchMedia mock), `ToggleGroup.test` G-TOGGLE-WRAP (`nowrap` forbidden on the group rules, allowed on the item), `Card.test`, `primitive-display.public-contracts.test-d` (`Lacks<"selected">`), `search-contracts` (rows carry no `tabindex`) | §E.2 unit re-points |

Not implemented, because the spec leaves them open: a SegmentedTabs "none" arm (`NO_PRESET`, X-6); any Chip change (the chip story has no one-of-N Chip set to re-point); the browser-run invariant test (§E.5).

## 2 · Build, types, units

| step | command (in `$S/wt`) | result |
|---|---|---|
| typecheck, before the lib build | `npm run typecheck` | src arm exit 0. The test arm failed on the expected re-points plus `@mkbabb/glass-ui/fourier-math` not resolving (no `dist` in a fresh worktree) (`logs/p2-typecheck-1.log`) |
| library build | `npx vite build --config $S/cfg/lib.config.mts` (cacheDir in scratch) | exit 0, `glass-ui:ready` (`logs/p2-lib-build.log`) |
| typecheck | `npm run typecheck` | **exit 0** (`logs/p2-typecheck-2.log`) |
| units (logs: `$S/logs/p2-vitest-{1,2}.log`) | `npx vitest run --config $S/cfg/vitest.config.mts` on `tests/components/{button,card,custom/tabs,pager-dots,ui/toggle-group}`, the dock a11y, blob gl-excise, `useSelectionIndicator`, `tests/composables/search`, `configurator-recursion`, `tests/demo`, `tests/gates`, `public-surface`, `tests/styles` | first run 9 failed / 944 passed (the `role="group"` / `aria-pressed` / class-string re-points in `segmented-tabs.test.ts` and `tabs-seam.test.ts`, plus boot-graph). After the re-points: **69 files, 950 passed, 3 failed, 9 expected-fail** |
| the 3 failures | `tests/gates/boot-graph.test.ts` build arm: "the built demo has a dist-demo to measure" and its two dependants | environment only: the gate reads `dist-demo/` in the worktree, and the demo was built into scratch under the fence. Not caused by the patch |
| demo builds | `vite build` with `demo/vite.demo-dist.config.ts`, outDir and cacheDir in scratch, from `wt-head` and `wt` | both exit 0 |

## 3 · The battery (T-1..T-8, W-A..W-E)

Harness: the checkout's `harness/`, copied privately with the D4-E research edits (E compositions in `scenes.mjs`: `preset` = SegmentedTabs of four names plus one readout row, `preset-tg`, `specimen` = ToggleGroup `lg` filmstrip, `specimen-st`, `strip` = glyph-only ToggleGroup, `phone`) and the fixes in §6. Builds (`build.mjs` into `$S/out2/builds/`): `p2-e` (E scenes, patched library, production), `p2-e-dev` (`--dev`), `p2-e-head` (E scenes, HEAD library), `p2-headsc` (HEAD scenes, patched library: adopting without migrating), `p2-headsc-dev`, `p2-head` (HEAD scenes, HEAD library). Logs: `$S/logs2/run2-*.log`, cells: `$S/out2/runs/<label>/*.json`.

### 3.1 The E compositions on the patched library (`p2-e`)

| witness | Chromium | Playwright WebKit | the E-hosted cells | RED, and why |
|---|---|---|---|---|
| T-1 | FAIL 3/5, 6 unmeasured | FAIL 3/5, 6 unmeasured | every E holder "never past its rung": tab 32.94 flat, ToggleGroupItem 40.00 flat (wrap 70.05 → 110 wide, 40 tall), specimen plate 44.00 flat | wrap pill Chip 16.70 → 38.11 → 55.00 (E locks only its two hosts); Button 20 px flat but no named role |
| T-2 | **PASS 20/20** | **PASS 20/20** | tab 16.47 on 32.94; item 20.00 on 40; single 18 on 36; vertical 20 on 40 | |
| T-3 | FAIL 13/21 | FAIL 13/21 | **12/12 E cells PASS in both engines.** Chromium p95 light / dark / PRT: preset 3.57 / 5.11 / 3.46; preset-tg 5.82 / 8.36 / 8.10; specimen 4.16 / 5.82 / 4.60; strip 7.18 / 8.61 / 8.11. Playwright WebKit: preset 11.57 / 15.78 / 16.20; preset-tg 6.53 / 8.37 / 8.09; specimen 4.42 / 6.30 / 4.90; strip 7.90 / 8.97 / 8.90 (the PRT cell takes the forced level-0 path) | `specimen-st` ×3 (collapsed, 0 items); card ×3 (arm deleted, no selected item); chipcell light and PRT (1.49 / 1.13, Chip untouched) |
| T-4 | FAIL 20/28 | FAIL 20/28 | every E cell whole: tabs `outline solid 2px offset 2px`, 2.00 px every side, both selection states, light and dark; specimen ring whole inside the 6 px port pad | `specimen-st` ×4 (no items); card ×4 (the deleted arm has no tab stop) |
| T-5 | FAIL 28/42 | (Chromium only) | **preset, preset-tg, specimen, strip, single, vertical, tabs: `radiogroup` / `radio`, 1 stop, the axis arrows move and check** | `specimen-st` ×4; card ×6 (a `listbox` of generics, 0 stops); chipcell ×4 (`aria-pressed`, 4 stops, arrows inert) |
| T-6 | FAIL 19/31 | FAIL 17/31 | preset (SegmentedTabs) **6/6 in both engines**: hover light 73.68 % · 74.10 %, PRM 73.52 % · 74.10 %, scale 1.015, press 0.97, commit a 200 ms colour transition plus the 220 ms press, coarse no latch (0.61 % moved) | ToggleGroupItem (preset-tg, specimen): hover light **0.00 %** (p95 1.04 / 1.02), PRM 0.00 %, in both engines; Playwright WebKit "Page crashed" on both. `specimen-st` harness exception (no items). card 1/6 |
| T-7 | **PASS 12/12** | | the migrated compositions paint nothing on the tile in four states | |
| T-8 | **PASS 18/18**, 11 unmeasured | (runs both) | T-1 never past the rung, T-3 as above; real Safari UNMEASURED (owner's safaridriver checkbox) | |
| W-A | FAIL 2/3 | FAIL 2/3 | ToggleGroupItem Δ 0 (20.00 at 40 across two added lines); Button Δ 0 | pill Chip Δ 38.30 px |
| W-B, W-C, W-D | 9/13, 1/7, 0/4 | W-D 0/4 | other families' witnesses; RED by absence as at HEAD | |
| **W-E production** | FAIL 4/9 | FAIL 4/9 | preset, preset-tg, specimen, strip: every item one row at its rung (1 row by the fixed `rows()`) | the refusal is DEV-only, so production refuses nothing (by design); `specimen-st` 0 items |
| **W-E DEV** (`p2-e-dev`) | FAIL **6/9** | FAIL **6/9** | the refusal fires on preset (`<SegmentedTabs> option "smoothone more line" holds 2 rows`) and preset-tg (`<ToggleGroupItem> option "smooth" holds 2 rows (40.0px at a 40.0px rung)`) | specimen: the appended line lands inside the 28 px stage's band and reads as one row (no refusal); strip: the line lands beside the glyph, which E's law allows (a witness strictness, §E.5); `specimen-st` collapsed |

### 3.2 Before, and adoption without migration

| build | T-1 | T-2 | T-3 | T-4 | T-5 | T-6 | T-7 | T-8 | W-E |
|---|---|---|---|---|---|---|---|---|---|
| `p2-head` (HEAD scenes, HEAD lib; W-E only) | | | | | | | | | **0/6** Chromium: preset 61.58 at rung 40 (1.54 rungs, 2 rows), specimen 100.16 at 36 (2.78, 2 rows), strip 44 at 44 but 2 rows |
| `p2-e-head` (E scenes, HEAD lib; W-E only) | | | | | | | | | 5/10: every item one row (the consumer migration alone buys the one-line half); no refusal |
| `p2-headsc` (HEAD scenes, patched lib), Chromium · Playwright WebKit | 3/5 · 3/5 | 12/12 · 12/12 | 8/15 · 8/15 | 4/20 · 4/20 | 20/38 | 13/24 · 11/24 | 4/12 | 12/12, 5 unmeasured | 0/6 · 0/6 |

`p2-headsc` is what an unmigrated keyframes.js gets on first install. The tiles are crushed to the rung: preset 208×40 with 1.8 px of text spilling past the plate, specimen 150.5×36 (`$S/tiles/adopt-unmigrated/`). In the DEV build (`p2-headviol.mjs` on `p2-headsc-dev`), the refusal fires at mount on **4 of 4 preset tiles and 8 of 8 specimen tiles, in both engines**, and on 0 of strip (Chip is unguarded), single, tabs and wrap. That reproduces the research numbers row for row. The W-E refusal cell reads "no refusal" on this build only because the guard reports once per element and had already reported every tile at mount.

### 3.3 The phone (390×844, `p2-phone.mjs`, scene `phone`)

| build | strip without tuning | strip with `responsive` tuning | ToggleGroup row | page pan | console errors |
|---|---|---|---|---|---|
| `p2-e-head` (HEAD lib) | `group`, 342 wide, scrollWidth 549 / 550 | Select 155.5×40 (the 640 px breakpoint) | 342×128, items 40 | **183 px Chromium, 184 Playwright WebKit** | |
| `p2-e` (patched) | **Select 155.5×40** (measured) | Select 155.5×40 | 342×128, items 40 | **0 · 0** | 0 · 0 |
| `p2-e` at 1200 | `radiogroup` 883.3×41.7 (expanded back) | the same | 729.9×40 | 0 | |
| `p2-e` back at 390 | Select again | Select | | 0 | |

Chromium and Playwright WebKit agree to 0.3 px on every figure.

### 3.4 Demo-wide collapse census (`census.mjs`, Chromium, light)

Every story route (94, from `demo/stories/<cat>/<name>.vue`), at 1440 and 390, before (`wt-head` demo) and after (`wt` demo). Per page: collapsed Selects, strips still overflowing their own box, and page pan. **4 diffs out of 188 cells** (`$S/census.json`, `logs2/census.log`):

| width | route | before | after | reading |
|---|---|---|---|---|
| 1440 | navigation/tabs | "Project view" overflowing (421.4 in 406) | collapsed: "Project view" and the RTL strip (207 wide in a 121 px well) | both real overflows (B-3 for the first) |
| 1440 | substrates/aurora | "Flow pattern" overflowing | collapsed | real overflow |
| 390 | substrates/aurora | "Flow pattern" overflowing | collapsed | real overflow |
| 390 | display/atoms | not overflowing its own box | **collapsed** "Display atoms" | the FamilyTabs strip is 458 wide inside a 350 px `fading-scroll--x` host, a scroller by design (`probe-atoms.mjs`). The host check collapses it (B-11) |

No route pans after that did not pan before, and no route logged a `[glass-ui]` error (the demo is a production build, so the DEV refusal is stripped).

## 4 · Gestalt read (screenshots, described)

Scene captures: `$S/tiles/{before,after,adopt-unmigrated}/<scene>-{light,dark}.png` (Chromium, 1000 px, DSF 2). Demo captures: `$S/shots2/{before,after}-chromium-<route>-{1440,390}-{light,dark}.png` (full page, with per-page DOM facts in `shots2/facts.json`), and section crops in `$S/sect/`.

**The three consumer tiles.**
- *K1 Spring presets.* Before: a 2×2 grid of 208×61.6 lozenges (corner 30.8, h/2), each holding a name and a monospace params line; the selected tile only a shade darker. After: one pill strip of four names (104×32.94, corner 16.47), with the eyeglass behind "Snappy" ringed in dark ink, and under it one readout line, "Snappy 0.35 s · ζ 0.78 · quick, a touch of overshoot". The readout wraps to a second line at 460 px, which E allows because it is the selection's detail, not an option. It reads calmer. The comparison of all four parameter sets is gone from the tiles; it lives on the heatmap pips.
- *K2 specimens.* Before: six ovals visible (150.5×100.2, corner 50.1), sparkline above name. After (`specimen`, ToggleGroup `lg`): a filmstrip of 122×44 pills, three and a bit visible, each with a small sparkline and ball, the name as a small-caps caption under each plate, and the selected name promoted to a header line ("ease-in-quad"). The selected plate carries a dark ink edge. The portraits are small: the race reads for the three in view only. After (`specimen-st`): a single Select reading "ease-in-quad ⌄" under the header. **Every portrait is gone** (§5 B-1). Adoption without migration: the names collapse to dots and the curves flatten inside 36 px pills. That is loud, as E-2 wants, and ugly.
- *V1 value.js strip.* Before (dark): six 44 px circles, glyph over a 9 px label, the selected one flooded in the consumer's violet. After: six 40 px glyph-only circles under "quad" / "back" eyebrows, the selected one ringed in near-white ink. The in-circle labels are gone (the names stay in `aria-label`). The consumer's violet flood no longer carries the state.

**The demo stories (Chromium, 1440 and 390, light and dark).**
- *ToggleGroup, "One of N" and "The row wraps".* The only change is the selected item's full-ink hairline: dark in light, near-white in dark. The hover plate is invisible on the hovered light item and visible as a lighter disc on the hovered dark item, which matches T-6 (0.00 % in light). At 390 the wrap story holds five one-line pills across three rows. Item sizes are identical before and after (42×40, 94.9×40 …; `facts.json`).
- *Chip.* Unchanged. The patch does not touch Chip, and the story has no one-of-N Chip set.
- *Card.* Before: two tall option cards in a `listbox` ("Balanced" darker by fill only; the full-ink rim is absent, border `oklab(… / 0.16) 1px`). After: a two-pill ToggleGroup ("Balanced" ringed) and one detail card for the selection. The page has 1 radiogroup and 0 options where it had 2 options. At 390 the detail card fits its content. It reads as a chooser plus a panel, not as two buttons that look like cards.
- *SegmentedTabs.* Every pill strip's eyeglass now wears a 1.5 px ink ring (dark in light, near-white in dark). It reads more like an outlined chip than a lens, a visible change in the library's signature control. All pill strips announce `radiogroup` (4 per page) with 0 `aria-pressed`, where HEAD had 16 `aria-pressed`. At 1440 two strips now collapse that HEAD rendered as strips. One is the RTL "Overflow and direction" strip: at HEAD it spilled 86 px out of its 121 px well into the neighbouring card, and after it is a Select. The other is the "Project view" underline strip: at HEAD its last tab ended at 421.4 in a 406 px track, overhanging the rule by 15.4 px of trailing padding while all four labels stayed legible, and after it is a Select at 1440 as well. The "Scrollable history range" strip, whose host is `min-w-max` inside a scroller, keeps scrolling as its story says.
- *Search.* The active result row (after two ArrowDowns, "Button glass variant 3") is ringed in full ink. The rows are `option`s under the listbox and carry no tab stop.

## 5 · Breaks (every one recorded)

| # | break | evidence | who owns it |
|---|---|---|---|
| B-1 | **The spec contradicts itself on `specimen-st`.** §E.1 Overflow collapses any strip whose options do not fit one line; §E.1 K2 offers "Variant `specimen-st` … a SegmentedTabs strip with a 72×17 stage", which is eight options in a 414 px host. Under the implemented rule it is a Select with no portraits, and every `specimen-st` cell is RED (T-3 ×3, T-4 ×4, T-5 ×4, T-6, W-E) | `p2-collapse-probe.mjs`: `specimen-st {"collapsed":1 … "room":414}` both engines; `tiles/after/specimen-st-light.png` | the spec: either K2's SegmentedTabs arm is struck (the ToggleGroup filmstrip stays), or the collapse gains an opt-out for scrolling filmstrips, which is the breakpoint opt-in the law was meant to retire |
| B-2 | ToggleGroupItem hover light 0.00 % (light, both engines, with and without PRM) even with the 8 % plate; Playwright WebKit "Page crashed" under its hover | T-6 `p2-e` preset-tg and specimen | SF-8 / SF-9, the `--control-surface-bg-hover` owner. Two of three consumer sites sit on this host |
| B-3 | The collapse is strict: a 15.4 px trailing-padding overhang collapses a strip whose labels were all legible (demo "Project view" at 1440) | `probe-pv.mjs`: last tab right 421.4 in a 406 track | spec, if a tolerance is wanted; KISS argues for none |
| B-4 | Shrink-wrap hosts cannot be measured: a strip whose parent grows with it (`min-w-max`, `inline-flex w-fit`) never overflows its host and never collapses, and a Select inside such a host never expands back | demo "Scrollable history range" (host 658 = strip 658) | a limit of "measured against the host"; recorded, not cured |
| B-5 | Adoption crushes unmigrated tiles: preset 208×40 (1.8 px text spill), specimen 150.5×36 (names as dots) | `tiles/adopt-unmigrated/` | E-6: each consumer's own tranche; a hard break by design |
| B-6 | The refusal misses a line inside a graphic's band (specimen), Chip (strip, 0 refusals at mount) and every hand-rolled set | W-E DEV specimen / strip cells; `p2-headviol` strip 0 | §E.5 |
| B-7 | The pill eyeglass changes look library-wide: the 1.5 px full-ink ring reads as an outlined chip, heavier than any selected state at HEAD | `sect/after-navigation_tabs-Pill-*` | SF-4 names the weight; an owner ruling |
| B-8 | Collapsing a `tabs`-semantic (underline) strip turns a `tablist` into a combobox with no `aria-controls` link to the panel | demo "Project view" at 1440 | spec: whether panel tabs collapse at all |
| B-11 | **A designed scroller collapses too.** The demo's FamilyTabs switcher on `display/atoms` sits in a `fading-scroll--x` host (strip 458, host 350 at 390 px), and the host check folds it into a Select. It is the same class as B-1: the always-on rule cannot tell an intended scrolling strip from an overflow | §3.4 | spec, joined to B-1: one ruling covers both (strike the scrolling-strip compositions, or let a scroll host mark its strip exempt) |
| B-9 | `boot-graph` build arm fails in a fresh worktree (no `dist-demo/`) | vitest | environment, not the patch |
| B-10 | Unit re-points beyond the research's three: 5 cells in `segmented-tabs.test.ts` (`role="group"`, `aria-pressed`), the `tabs-seam` class-string count, `search-contracts`' tab-stop residual, `Card.test`, the type test | §2 | the patch carries them |

## 6 · Harness state (private copies only; nothing edited in the checkout)

The seat's private copies are `$S/harness/` (E scenes) and `$S/harness-head/` (HEAD scenes). They carry these edits:
- From the previous run of this seat (read and kept): REPO pinned to the checkout path; `@source "${wt}/src/components/**/*Variants.ts"` (SF-20 item 1); `preset` detail row is the readout only (P-3); the `tabs` scene uses default semantics (so it builds on both libraries); `phone` tuned strip uses the object form.
- **Fixed here: `__th.rows()` returned 0 for every element.** The previous run's SF-20 correction started with `top = bottom = -Infinity`, so `bottom - top` was NaN and `ov < 0.3 * NaN` was never true. W-E's one-line cell could not fail, and the previous run's W-E log reads "0 rows" on every item. Now the first rect opens a row. Checked: HEAD tiles read 2 rows, E tiles 1 (`shot.mjs` logs).
- **Fixed here: W-E threw `Cannot read properties of undefined (reading 'h')` on a scene with no items** (`specimen-st` collapsed). It now writes a FAIL cell naming the collapse.
- W-E's refusal cell cannot see a mount-time refusal (the guard reports once per element), so the HEAD-composition refusal evidence comes from `p2-headviol.mjs` instead.
- T-6 still throws inside the engagement script on a scene with no items (`specimen-st`). Recorded as a FAIL cell by the witness itself.

## 7 · Chrome and Playwright WebKit

- Geometry (T-1, T-2, W-A), T-4, T-7, the phone collapse and W-E agree to 0.3 px between the engines on every cell.
- The T-3 indicator p95 is higher in Playwright WebKit (preset 11.57 / 15.78 / 16.20 against 3.57 / 5.11 / 3.46). Both pass.
- ToggleGroupItem hover crashes the Playwright WebKit renderer; SegmentedTabs hover does not.
- Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell.

## 8 · Artefacts

Under `$S`: `D4-E-proto.patch` (the copy that went to the checkout), `logs/p2-*.log` (typecheck, lib build, vitest), `logs2/` (builds, `run2-p2-e.log`, `run2-p2-headsc.log`, W-E runs, demo builds, `census.log`), `out2/builds/*` and `out2/runs/{p2-e,p2-headsc}/*.json`, `tiles/`, `shots2/` plus `facts.json`, `sect/`, `cap2/` (phone and crush captures), `census.json`, and the probes `harness/p2-{collapse-probe,dom,tabwalk,phone}.mjs`, `harness-head/p2-headviol.mjs`, `probe-pv.mjs`, `demo2-shots.mjs`, `sect-shots.mjs`, `sect2.mjs`, `census.mjs`.
