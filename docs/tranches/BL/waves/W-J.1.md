# W-J.1 · the selectable multi-line tile (loop D4) · 11.0.0

| field | value |
|---|---|
| seat | band-J wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7f92584c` in a scratch worktree (the task named `f3ad78d0`; every commit since is under `docs/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing, so every reading measures the published 10.1.0 bytes. The tile is the v10.0.1 tile (10.1.0 changed the Configurator only) |
| kind | LOOP WAVE, owned by design loop D4 (`design/tile/`). It lands only from D4's converged specification and never before D4 meets its gate (§3.1). It builds nothing the loop has not converged on |
| ships in | 11.0.0 |
| families | F-30b (whole) |
| depends on | the D4 gate (§3.1); W-E.6 (W-CHIP: the Chip's selected register and the per-instance tint rule the tile shares, `W-E.6.md:11,118`); W-E.8 (the role table the tile's corner reads, and the role invariant this wave extends, `W-E.8.md:11`); W-H.1 (ink on the painted composite, which the selected register and the meta ink read, `W-H.1.md:12`); W-A.3 (the wired visual suite the harness witnesses join); W-C.1 (the loop's tooling moves to `scripts/loops/tile/`, `W-C.1.md:43`) |
| dependants | W-J.2 (the engagement register composes the tile's commit and hover rungs); W-K.4 (the ring register reads the tile's ring clearance); W-K.5 (options take their focus model from the group); W-L.2 (the E-11 type guards for the retired bindings); W-L.7 (the consumer packets: keyframes.js, fourier-analysis, value.js) |
| instruments | the D4 harness `docs/tranches/BL/design/tile/harness/` (`$H`), at HEAD the pass-1 harness (H1); the loop's H2 revision is in progress and uncommitted (`pass-2/H2.md`, `git status` shows 21 modified harness files and 4 untracked), so every HEAD number below is H1's, and the landing gates run H2 as the loop commits it. Two band-J probes (appendix A) read what the harness does not: the two-line ToggleGroupItem's corner (the registry's own born-RED, `audit/REGISTRY.md:652`) and the layout shift of the contrast carrier (PF-3). They land under `scripts/probes/band-J/` with `npm run probe:band-J` |
| engines | Chromium 149.0.7827.55 headless. **Playwright WebKit** 26.5 headless (labelled so; it is not Safari). Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; the harness's T-8 prints the one Safari cell as unmeasured (§2.2) |
| machine | shared; load averages 37.71 / 42.91 / 46.42 at 18:36 and 41.68 / 39.97 / 43.63 at 18:41 local, printed beside the runs |

## 1 · What it closes

| id | what | source |
|---|---|---|
| F-30b members | L01a-23's multi-line half; R2-03-09 (O-58/N-9 in paint: `.toggle-group__item { border-radius: var(--radius-pill) }` pins two-line tiles to 9999px); R2-04-04's F-30b row | `audit/REGISTRY.md:640-652` |
| inbound | O-58 PRESET-TILE-SHAPE (value.js relay for keyframes.js) and the 17 UIA rows the map puts on F-30b: UIA-KF-046, UIA-V-60, UIA-V-92, UIA-V-136, UIA-V-180, UIA-KF-047, UIA-F-85, UIA-F-100, UIA-V-219, UIA-V-332, UIA-V-360, UIA-KF-111, UIA-KF-156, UIA-F-141, UIA-V-510, UIA-V-515, UIA-V-201 | `audit/INBOUND.md:21`; `audit/INBOUND-MAP.md:66,121-139,163,544` |
| ledger | #84 W-TOGGLE-ROW (its two-line-item half; P4's contrast is F-21's, W-E.2); N-9 (the owner's "too rounded ... should be more card like"); O-58 | `ledger/census-register-b.md:69`; `ledger/census-carries-recap.md:88`; `audit/PROMPT-RECAP-SEED.md:51`; PLAN §7 row J |
| loop floor | TF-1..TF-8 and floor items 1-5 as D4 settled them at pass 1 (`design/tile/REGISTRY.md:193-243`) | D4 REGISTRY §3 |

**The 17 UIA rows, each with its terminal here.** The Q-1 ruling (§3.3) decides most of them by content class.

| rows | what the consumer saw | terminal in this wave |
|---|---|---|
| UIA-KF-046, UIA-V-332, UIA-F-85, UIA-F-141 (tile half) | two-line or full-width one-of-N options on the stadium | CURED: the tile corner (§3.2 item 1), G1 and G9 |
| UIA-KF-111, UIA-KF-047 | the NumberField stepper and a single-value matrix cell paint the stadium where the role table names `--radius-field` (`DESIGN.md:386`) | CURED: the role invariant gains the stepper and field rows (§3.2 item 7, G13) |
| UIA-V-60 | a vertical one-of-N rail (ConsoleRail) on the stadium | CURED by the role table's `--radius-strip` row for a bounded vertical stack (`DESIGN.md:390`), read by the role invariant (G13); the consumer's hand-rolled rail re-points in its addendum (W-L.7) |
| UIA-V-180, UIA-F-100 | a wrapped pill Chip and a full-width disclosure trigger on the stadium | CURED under Q-1 (a): a control whose label wraps takes A1 (rung/2, `--chip-floor`), D4's banked sub-choice (`design/tile/REGISTRY.md:249`) |
| UIA-V-136, UIA-KF-156, UIA-F-141 (pill half), UIA-V-92, UIA-V-510, UIA-V-515 | single-line segmented strips, action pills and badges read as "too rounded" | ANSWERED under Q-10 (b) and the role table (`--radius-tab`, `--radius-badge` are the stadium, `DESIGN.md:391-392`): a one-line pill stays a stadium. The slug chips are consumer hand-rolls (E-6, W-L.7). The answer ships with the paired capture of §6 row 4, put to the owner in W-B.4's docket; the owner's word is quoted in the ledger row |
| UIA-V-219, UIA-V-360, UIA-V-201 | nested filled pills inside the dock | ANSWERED: the dock radii are on canon (the map's own reading); the nested read is the one-line pill rule above. The dock's plate is W-I.1's |

**Not closed here.** The off-role 12 px rung (F-30a) is W-E.8's. The engaged rung beyond the tile's own commit and hover (D-2 component-wide) is W-J.2's. The ring register (the six `--focus-ring-shadow` readers, the forced-colours ring) is W-K.4's; this wave publishes the ring clearance token it reads. FadingScroll's own tab stop (TF-6's note) is FadingScroll's owner's (W-K.5, one current-row channel).

## 2 · The defect at HEAD

### 2.1 · The mechanisms (read in the worktree)

- **The stadium.** `src/components/toggle-group/styles.css:67-70`: `border-radius: var(--radius-pill)` on every `.toggle-group__item`, whatever it holds. The role table puts a multi-line holder on the field rung (`DESIGN.md:385-386`: `--radius-control` is the pill, `--radius-field` is 16 px "multi-line field / stepper"). Both keyframes.js tile sites now hand-set `--radius-field` to escape it (`demo/components/EasingCatalogue/EasingCatalogue.vue:376`, `demo/scenes/spring/SpringPhysicsFacet.vue:91`, read-only at keyframes.js `7c1718a7`).
- **The selected register is a fill.** `styles.css:116-124`: `color-mix(in oklab, var(--foreground) 12%, transparent)` (16 % on hover), ink and weight. D4 measured that a fill does not carry T-3 and an edge does (TF-2, `design/tile/REGISTRY.md:195`). `--ink-perimeter` does not separate from the sibling (SF-4).
- **Three one-of-N paths and two item registries.** Card carries a `selected` option arm (`src/components/card/Card.vue:36-37,52,65,68`) used by one demo story (`demo/stories/display/card.vue:125`) and no consumer in four repositories (SF-17). Chip carries `shape: "cell"` (`src/components/chip/chipVariants.ts:13-15`), used by one demo story (`demo/stories/forms/chip.vue:50`) and no consumer (SF-19). SegmentedTabs `semantics="toggle"` announces `role="group"` with `aria-pressed` (`src/components/tabs/SegmentedTabs.vue:127,320`) where ToggleGroup's one-of-N announces `radiogroup`/`radio` (`ToggleGroup.vue:25-28`).
- **The contrast carrier moves layout.** `src/styles/accessibility.css:10-22` (`prefers-contrast: more`) and `:31-43` (`forced-colors: active`) set `border-width: 2px !important` on `[data-state="on"]`, so a selected tile's content moves (PF-3, §2.3).
- **The indicator is declined** for a field that wraps (`ToggleGroup.vue:30-35`). D4-G's body is the loop's question Q-11, not a defect.

### 2.2 · The harness at HEAD (H1, run here)

`node $H/build.mjs <wt> --label head --out <out>` (built `7f92584c`, src dirty files 0, production SFC compile), then `node $H/run.mjs --build <out>/builds/head --out <out> --only T-1,T-2,T-3,T-4,T-7,T-8 --webkit` and `--only T-5,T-6` (Chromium; T-6 in Playwright WebKit hangs on ToggleGroupItem hover, PF-1). Logs: `<out>/run-head-a.log`, `run-head-b.log`; JSON per witness under `<out>/runs/head/`.

| witness | Chromium | Playwright WebKit | Safari |
|---|---|---|---|
| T-1 corner stops | **3/8** exit 1 | **3/8** exit 1 | UNMEASURED |
| T-2 one-line stadium (hold line) | 12/12 exit 0 | 12/12 exit 0 | UNMEASURED |
| T-3 selected separates | **2/15** exit 1 | **2/15** exit 1 | UNMEASURED |
| T-4 ring whole | **8/20** exit 1 | **8/20** exit 1 | UNMEASURED |
| T-5 one-of-N keys | **19/38** exit 1 | not engine-generic | — |
| T-6 engagement | **17/24** exit 1 | not run: PF-1 hang (D4 pass 1 read 9/14) | UNMEASURED |
| T-7 no consumer paint | **4/12** exit 1 | not engine-generic | — |
| T-8 both engines | **0/16** exit 1, 1 unmeasured (Safari) | (T-8 drives both) | UNMEASURED (owner's safaridriver checkbox) |

These equal the pass-1 HEAD baseline SF-13 (`design/tile/REGISTRY.md:40`) cell for cell.

What fails (Chromium; WebKit agrees where it measures):

- **T-1.** `preset #0 toggle-group-item rung 40.0 · 208.00×61.58 9999px→30.79 (÷h/2 1.00) … 208.00×101.92 9999px→50.96`, named none; `specimen #0 … 150.53×136.47 9999px→68.23`; `wrap #0 ToggleGroupItem … 110.00×78.48 9999px→39.24`; `wrap #1 Chip pill … 97.31×64.22 9999px→32.11`; `wrap #2 Button … 110.00×86.06 20px→20.00 (÷h/2 0.46)` named none. Card and chipcell pass at 16 px. The two `-verbatim` rows pass as info only: that is keyframes.js's hand-set 16 px, consumer paint.
- **T-3.** Every library tile fails on fill contrast with a ≥ 3:1 area of 0.00 px²: `preset light · fill 1.20:1`, `preset dark 1.23:1`, `preset prt 1.00:1`, specimen 1.19 / 1.22 / 1.00, card 1.28 / 1.31 / 1.28, strip and chipcell light 1.49, PRT 1.13. Only strip and chipcell dark pass (3.21:1, the Chip's flood).
- **T-4, T-5, T-7** as SF-13: the ring is cut on the specimen and card scenes, the cross axis and the tablist model fail T-5, and the consumer's dashed outline replaces the ring (T-7).

The loop's H2 (in progress, uncommitted, not re-measured here) is stricter: its HEAD baseline reads T-1 10 of 32 library cells, T-3 2 of 39 with every H-3 cell RED, T-4 12 of 20, T-5 26 of 72, T-6 19 of 45, and no scene clears the commit bar (`pass-2/H2.md` §0 item 3). The landing gates run H2 as committed.

### 2.3 · Rows the harness does not read (band-J probe, run here)

`node scripts/probes/band-J/build.mjs <wt> head && node scripts/probes/band-J/tile.mjs <dist> <wt>` (appendix A): a `ToggleGroup type="single"` of four 208 px items, each a name span over a meta span, the first selected, at 600×400, in Chromium and Playwright WebKit, `prefers-contrast` no-preference and more.

| row | HEAD | can pass |
|---|---|---|
| `TILE/CORNER`: an item whose content holds two rows computes a corner ≤ 16 px (the registry's born-RED, `REGISTRY.md:652`) | **16/16 FAIL**: every item `9999px`, both engines, both contrast settings (Chromium 208×40 with both rows inside the 40 px rung; WebKit's selected item 208×52.89) | a planted `.toggle-group__item:has(> * + *) { border-radius: var(--radius-field) }` turns all 16 to PASS |
| `TILE/CONTRAST-SHIFT`: the selected item's content does not move under `prefers-contrast: more` | **FAIL**: Chromium (0, 0.3) px, Playwright WebKit (0, 1) px; the item's border computes 2px against 1px; the three unselected items (0, 0) PASS | the unselected cells pass on the same page; a planted unlayered `!important` override does not win against the layered rule, which is itself the cascade the cure must work with (§3.2 item 6) |

### 2.4 · Static readings (run here)

| read | HEAD |
|---|---|
| `git grep -n 'border-radius: var(--radius-pill)' -- src/components/toggle-group/styles.css` | `:70` |
| `git grep -n 'selected?: boolean' -- src/components/card` | `Card.vue:37` |
| `git grep -n 'cell:' -- src/components/chip/chipVariants.ts` | `:15` (`glass-chip--cell flex-col …`) |
| `git grep -n "'aria-pressed'" -- src/components/tabs/SegmentedTabs.vue` | `:320` (and `role … "group"` at `:127`) |
| `grep -n 'it.fails' tests/styles/radius-role-canon.test.ts` | `:458` (F-30a's latch, W-E.8's; not this wave's) |
| `git grep -n 'shape="cell"' -- demo src` | `demo/stories/forms/chip.vue:50` |

## 3 · The cure

D4 owns the design. This wave builds D4's converged specification: the floor every route shares and the route the loop converges on. It lands nothing D4 has not converged on.

### 3.1 · The entry gate

D4 meets the charter's convergence criterion (`CHARTER.md:82,86`): at least three full passes, zero enumerated open gaps, a fresh adversarial audit by seats that did not author the winning spec, and two consecutive clean passes. D4's own gate is its §7.5 checklist, fixed at pass 1 (`design/tile/REGISTRY.md:413-422`): T-1..T-8 under H2 in both engines; X-1..X-7; floor items 1-5; the winning route's §7.3 items; the gestalt read (card-like option, selection unmistakable without colour, apart from the ring, uncluttered, iOS-27 grade). Critics add no rows mid-pass.

**Not met at this seat.** Pass 1 closed at `04929544` (D′ ADVANCE 55 %, A and B BANK 55 %, C BANK 50 %, E RETIRE 30 %, D4-F and D4-G minted). Pass 2 (`wf_fa0d8421-43e`) is at its H2 seat, uncommitted; the floor patch, the F and G block tests, the D′/F/G routes and the agglomeration (which also rules the family-B critic split on measurements, `FORMATION-PROGRESS.md:44`) have not run. The earliest convergence is the pass-3 agglomeration, since the charter asks three full passes.

**Obligations from this seat to D4** (they enter the pass-3 checklist; the loop adopts them or states a stronger row):

1. The two band-J probe rows (§2.3) as checklist rows beside T-1 and PF-3, or D4 names the H2 cell that reads the same thing. H2's T-1 reads multi-line holders on the harness scenes; the probe reads the registry's literal born-RED on a bare two-row item with both rows inside the rung, which is TF-7's hole C-2.
2. The 17 UIA rows' terminals (§1) read against the converged Q-1 and Q-10 rulings. If the owner rules Q-10 (a) or (c), the "ANSWERED" rows change to CURED and G14 grows a pill cell.
3. The G-BUNDLE-RATCHET datum (PF-4: D′ measured +3,153 B) is stated as its own ruled row in the converged spec.

### 3.2 · What lands, whatever route converges (the floor)

D4 settled these at pass 1 (TF-1..TF-8, floor items 1-5, `design/tile/REGISTRY.md:193-243`). They are decided; the routes differ only where §3.3 says. Each is built once and measured under H2 in both engines.

1. **The corner by content class** (TF-1, Q-1 default (a)). A multi-line selectable tile is `--radius-field` (16 px) at every rung, fine, coarse and `--ui-scale`. A control whose label wraps (Button, pill Chip, disclosure trigger) takes A1, `calc(var(--control-rung) / 2)` with `--chip-floor` (D4's banked sub-choice). A one-line ToggleGroup pill stays the stadium and does not wrap (item 5).
2. **The selected carrier is an edge, not a fill** (TF-2, floor item 2). A `::before` layer inset −1 px paints a 2 px perimeter in `--selection-tone` (per item, X-7), lightness-floored with `/ 1` in both floors (L ≤ 0.42 light, ≥ 0.80 dark), keyed on the item's state, on the pill and on the tile. It leaves the tile's `border` to the invalid grammar, a sibling state and consumer paint. Its weight in light follows Q-3 as ruled. The fill becomes decoration (the normal-blend flood, 8 % → 3 %, `z-index: -1`).
3. **The grid walk** (TF-3, floor item 3, Q-4 default (b)). One geometric walk in the one engine: nearest item in the adjacent row, a linear step where no row lies that way, RTL flips Left and Right; `ordered` re-sorts on a keyed move; a unit test on stubbed rects. The dock and SegmentedTabs are unchanged (T-2 12/12).
4. **One ARIA answer for one-of-N** (TF-4). SegmentedTabs `semantics="toggle"` becomes `radiogroup` / `radio` / `aria-checked` through the engine's `groupRole` and `itemAttrs`; `stripValue` keeps HEAD's no-match branch; each tab composes `focus-ring`.
5. **The pill does not wrap** (TF-7): `max-inline-size: 100%`, `safe center`, `nowrap`, a clip, an ellipsis on each label element, `padding-block: 0.15em`. Its three holes (a hard break, two lines inside the rung, a bare text node) are closed by the route's shape rule or refused per Q-5.
6. **Hover on the plate layer** (TF-8): the hover writes the plate's own image layer on a channel the selected state does not use. **The contrast carrier stops moving layout** (Q-9 (a)): the `accessibility.css` rule exempts a component that carries its own perimeter layer, so under `prefers-contrast: more` and forced colours the selected layer takes `CanvasText`/`Highlight` without a border-width change (the probe row `TILE/CONTRAST-SHIFT`, G10).
7. **The group owns ring clearance** (TF-6): one published token, `--focus-ring-reach` (the ring width plus its offset), which the group's padding reads; W-K.4's ring register reads the same token. **The role invariant** replaces F-30b's absence of one: every multi-line selectable holder, stepper and single-value field computes `--radius-field`, every bounded vertical one-of-N stack `--radius-strip`, every one-line pill the stadium, read in paint by T-1 under H2 and by the probe's `TILE/CORNER` (G1, G9, G13).
8. **Deletions** (TF-5, Q-8 default (a)). Card's `selected` arm goes: the prop, `role="option"`, the tab stop, `aria-selected` and `data-selected` (`Card.vue:36-68`); `demo/stories/display/card.vue`'s plan picker moves to the tile. `demo/stories/data/search.vue`'s `aria-activedescendant` listbox keeps its own listbox paint (C-crit C-8), re-pointed off `.card[role="option"]`. Chip `shape="cell"` goes, and `mode="selectable"` narrows to N-of-M.
9. **The SF-8 fix** (floor item 1) is owed by the owner of `--control-surface-bg-hover` (the token that hangs Playwright WebKit on ToggleGroupItem hover, PF-1). It lands with W-H.1's control-surface ladder or in this wave's patch, whichever is first; G6's WebKit cells need it.

### 3.3 · What the converged route decides, and how it lands

Three routes enter pass 2 (`design/tile/REGISTRY.md:357-365`). D′ and F compete on who decides the tile; G is independent and composes with either.

| route | what this wave lands | what it adds to the public surface |
|---|---|---|
| D4-D′, the declared cell | `ToggleGroup shape: "pill" \| "cell"`; the cell is the 16 px corner, a column, body leading, the pad pair, the ring clearance; `cell` stops carrying the grid if §7.3 item 5 rules so | one prop (additive) |
| D4-F, the anatomy declares the tile | a structural rule (`:has()` over the item's direct children, adornments excluded) or library slots (`#meta`, `#media`) make an item a cell when it holds a second row; a group-level `:has()` makes siblings of a cell cells | none (reading 1) or two slots (reading 2) |
| D4-G, the selection is a body | one `[data-selection-body]` per single-select group on the selected tile's rect with the tile's corner, carrying the register and committing by travel on the spring (Q-11 (b) or (c) as the owner rules); `type="multiple"` keeps the per-tile register | one element per group (internal) |

Whichever converges, the landing is the converged spec's patch (floor plus route), with no second recipe, and these rows hold:

1. **The owner's "card-like" reads**: every multi-line option in the harness scenes, the demo and the unmigrated K1 and K2 compositions computes 16 px at every rung and on the comfort axis (T-1 under H2, H-1's coarse and `--ui-scale` cells).
2. **Selection separates without colour**: T-3 ≥ 3:1 over the carrier bar in light, dark and PRT, including the invalid group, the sibling state, the shipped consumer border and the translucent and unresolvable tones (H-3).
3. **The commit meets the bar** (D-1, D-2): a pop that peaks ≥ 0.015 above settle and bounces ≥ 0.002 below it, or a body that travels with overshoot; keyboard, pointer and programmatic commits; no pop on Tab entry (H-4). A linear fade fails.
4. **Keys**: T-5 under Q-4 as ruled, every tab stop counted, the keyed reorder, the interactive descendant on `dist` (H-5, H-9, H-10).
5. **Q-5 as ruled**: the default (b) plus (d) refuses structurally in production (an item ignores keys from editable descendants) and names it in DEV under a published `development` export condition. A DEV-only guard is not a gate (TF-9).
6. **Q-6 (a)**: a single group checks nothing when the model matches no value (`NO_PRESET`), and Tab lands on the first item.
7. **Q-7 (a)**: N-of-M tiles take the same anatomy with a `<button>` host only.

### 3.4 · The consumer half

keyframes.js drops its two hand-set `--radius-field` overrides and any `rounded-pill` on tile sites, and its dashed outline that replaces the ring (T-7), in its own addendum (E-6; O-58, N-9). fourier-analysis re-points `EquationModeToggle.vue:62` for TF-4. value.js carries O-58's relay reply. Each is named in W-L.7's packets. value.js's tree is read-only to glass seats.

## 4 · Files it touches

- `src/components/toggle-group/` (`ToggleGroup.vue`, `ToggleGroupItem.vue`, `styles.css`, `index.ts`); the selection engine's walk and `ordered` (`src/composables/selection/` or wherever W-D.1 places it); `src/styles/glass/cell.css` (new: the one corner declaration, D′ and F), `src/styles/accessibility.css:10-43`.
- `src/components/card/Card.vue` (the `selected` arm deleted), `src/components/chip/{Chip.vue,chipVariants.ts,types.ts}` (`cell` deleted), `src/components/tabs/SegmentedTabs.vue` (`:127`, `:320`) and its README's ARIA section.
- The token that hangs WebKit (`--control-surface-bg-hover`, `src/styles/glass/control-surfaces.css`), unless W-H.1 has landed it.
- `tests/components/ui/toggle-group/ToggleGroup.test.ts`, `tests/styles/radius-role-canon.test.ts` (the role rows, beside W-E.8's), `tests/public-surface.spec.ts`, a new walk unit suite.
- `demo/stories/forms/{toggle,chip}.vue`, `demo/stories/display/card.vue`, `demo/stories/data/search.vue:573`.
- `DESIGN.md:385-386` per Q-1 as ruled (the two content-following rows), and `MIGRATION.md` (§7).
- `scripts/loops/tile/` (the harness after W-C.1) and `scripts/probes/band-J/` (appendix A).

## 5 · Acceptance gates

Setup, in a scratch worktree carrying the candidate `src`:

```sh
H=scripts/loops/tile/harness   # docs/tranches/BL/design/tile/harness until W-C.1 lands
node $H/build.mjs <wt> --label j1 --out $OUT
node $H/run.mjs --build $OUT/builds/j1 --out $OUT --webkit
node scripts/probes/band-J/build.mjs <wt> j1 && node scripts/probes/band-J/tile.mjs <dist> <wt>
```

Every harness gate runs H2 as D4 commits it, both engines, the library arm gating and the unmigrated and migrated consumer arms reported beside it (H-7). The HEAD column is H1 (§2.2), the harness at this HEAD.

In the table cells below, `\|` is the Markdown escape for `|`: the command itself uses a bare `|`.

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · T-1 corner | `node $H/t1-corner-stops.mjs --build $OUT/builds/j1` and `--engine webkit` | exit 0, every gating cell, fine, coarse and `--ui-scale` (H-1) | **exit 1**: 3/8 Chromium, 3/8 WebKit (`preset` 9999px→30.79 … 50.96) |
| G2 · T-2 hold line | `node $H/t2-one-line-stadium.mjs …` both engines, with H-2's paired undeclared arm | exit 0 | 12/12 both engines at HEAD (a hold line, not born RED; H2's `t2` plant fails it 0/22, `pass-2/H2.md` §1) |
| G3 · T-3 selected separates | `node $H/t3-selected-separates.mjs …` both engines | exit 0, every H-3 cell | **exit 1**: 2/15 both engines (fill 1.00-1.49:1, ≥ 3:1 area 0.00 px²) |
| G4 · T-4 ring whole | `node $H/t4-ring-whole.mjs …` both engines | exit 0 | **exit 1**: 8/20 both engines |
| G5 · T-5 keys | `node $H/t5-one-of-n-keys.mjs …` | exit 0 | **exit 1**: 19/38 |
| G6 · T-6 commit bar | `node $H/t6-engagement.mjs …` both engines | exit 0, keyboard, pointer and programmatic commits, no pop on Tab entry (H-4) | **exit 1**: 17/24 Chromium; Playwright WebKit hangs on ToggleGroupItem hover (PF-1), so the WebKit cells need floor item 1 (§3.2 item 9) |
| G7 · T-7 no consumer paint | `node $H/t7-no-consumer-paint.mjs …` | exit 0, migrated arm against its stripped twin | **exit 1**: 4/12 |
| G8 · T-8 both engines | `node $H/t8-both-engines.mjs …` | exit 0; the Safari cell UNMEASURED until OW-3, then measured | **exit 1**: 0/16, 1 unmeasured |
| G9 · two-row corner (the registry's born-RED) | `tile.mjs`, rows `TILE/CORNER` | 16/16 PASS | **FAIL 16/16**: `9999px` on every two-row item, both engines |
| G10 · the contrast carrier moves nothing (Q-9 (a)) | `tile.mjs`, rows `TILE/CONTRAST-SHIFT` | (0, 0) px for every item, both engines | **FAIL**: selected item (0, 0.3) px Chromium, (0, 1) px WebKit; border 2px against 1px |
| G11 · Card is not an option (TF-5) | `! git grep -n 'selected?: boolean' -- src/components/card` | exit 0 | **exit 1**: `Card.vue:37` |
| G12 · no Chip cell (Q-8 (a)) | `! git grep -nE 'cell:\|"cell"' -- src/components/chip` | exit 0 | **exit 1**: `chipVariants.ts:15` |
| G13 · one ARIA answer (TF-4) | `! git grep -n "'aria-pressed'" -- src/components/tabs/SegmentedTabs.vue` and T-5's `tabs` scene | exit 0; `tabs` PASS | **exit 1**: `:320`; T-5 `tabs` RED |
| G14 · the role invariant | `npx vitest run tests/styles/radius-role-canon.test.ts` with the new tile, stepper, field and strip rows, each an `it` read from the role table, and G1's paint cells | passes; no role row is `it.fails` | the new rows do not exist; their paint twins G1 and G9 are RED |
| G15 · the gestalt read | the D4 critic's §7.3 gestalt questions on the §6 captures, recorded in the wave record | each question answered yes by a seat that did not author the route | not measurable at HEAD; SF-13's captures read "too rounded" (N-9) |
| G16 · the harness can fail | `node $H/selftest.mjs --out $OUT` | every fixture PASS, every plant FAIL, both engines | H2's self-test: every clean fixture passes and every plant fails on its planted cell (`pass-2/H2.md` §0 item 1; T-6's tally still being written by the live seat) |
| G17 · the bundle datum | `npm run build && node scripts/…ratchet` (W-A.5's payload invariant) | the datum moves by the converged spec's ruled row (§3.1 item 3), stated in the wave record | D′ measured +3,153 B at pass 1 (PF-4); re-measured at landing |

A gate whose HEAD reading is a hold line (G2) or not measurable (G15) is stated so; the others are RED at HEAD in the run cited.

## 6 · π and DELTA obligations

Before = the H1 run of `7f92584c` above (`<out>/runs/head/*.json` and its PNGs) and the probe's `bj-head` build; after = the same runs on the candidate plus H2's full battery. Captures under `.cache/evidence/W-J.1/`; the wave record inlines each PNG's path, sha256, command and the paired harness row, so a wiped scratch is re-derivable.

| surface | themes and modes | engines | paired capture | π |
|---|---|---|---|---|
| the preset and specimen tiles (K1 2×2, K2 auto-fill grid in FadingScroll), library, unmigrated and migrated arms | light, dark, PRT, forced colours; fine, coarse, `--ui-scale 1.25` | Chromium, Playwright WebKit | `glance.mjs` contact sheets, before (stadium) and after (16 px) | T-1 corner per cell, T-3 band area and fill |
| the selected tile under an invalid group, a sibling state, the consumer border, translucent and unresolvable tones | light, dark, PRT | Chromium, Playwright WebKit | T-3 crops before and after | T-3 ≥ 3:1 area per cell |
| the commit: keyboard walk across K2's grid, a pointer commit, a programmatic commit, a `NO_PRESET` round trip | light, dark | Chromium screenshots per frame; Playwright WebKit screencast | T-6 filmstrip before (the 180 ms colour change) and after | T-6 peak, trough, settle, travel, overshoot |
| one-line pills and segmented strips (the ANSWERED rows, §1) beside the tile | light, dark | Chromium | the pair on one page, for the owner's W-B.4 glance | T-2 per pill; the owner's quote |
| the focus ring on a focused-and-selected tile | light, dark, forced colours | Chromium, Playwright WebKit | T-4 crops | T-4 ring width per side |
| `prefers-contrast: more` selected tile | light | Chromium, Playwright WebKit | probe shots before and after | `TILE/CONTRAST-SHIFT` offset |
| the demo `/forms/toggle`, `/forms/chip`, `/display/card` at 1440 and 390 | light, dark | Chromium (the demo crashes Playwright WebKit on boot, PF-2; W-A.1's harness repair owns it) | route captures | T-1 and T-3 on the demo items |
| real Safari | both | — | UNMEASURED (owner's safaridriver checkbox, OW-3) | — |

## 7 · MIGRATION rows (clean break, no alias)

| removed or changed | successor | E-11 guard for a silent binding |
|---|---|---|
| `Card` prop `selected` and its option arm (`role="option"`, `tabindex`, `aria-selected`, `data-selected`) | a one-of-N set is a ToggleGroup of tiles; a Card is never an option | `<Card :selected>` falls through as a DOM attribute and does nothing: W-L.2's `strictTemplates` fixture fails on the unknown prop |
| `Chip shape="cell"` | a ToggleGroup tile; `mode="selectable"` is N-of-M only | `shape="cell"` is outside the `shape` union: the type check fails |
| SegmentedTabs `semantics="toggle"`: `role="group"`, `aria-pressed` | `role="radiogroup"`, `role="radio"`, `aria-checked`; state stays `[data-active]` | a consumer selector on `[aria-pressed]` matches nothing: named in the packet (fourier-analysis `EquationModeToggle.vue:62`) |
| a multi-line ToggleGroupItem on the stadium | the 16 px field corner by content class (and, under D′, `shape="cell"`) | none needed: paint changes; consumer overrides (`--radius-field`, `rounded-pill`) retire in each addendum |
| a one-line ToggleGroupItem label that wraps | no-wrap with an ellipsis per label element (TF-7) | — |
| the selected fill (`--foreground` 12 %/16 %) as the carrier | the perimeter layer in `--selection-tone`; the fill is decoration | a consumer `[data-state="on"]` background override no longer carries selection: named in the packet |
| `accessibility.css` 2 px `!important` border on a selected component that carries its own layer | the layer takes the contrast and forced-colours inks; no border-width change | — |
| ring clearance as per-site padding | `--focus-ring-reach`, read by the group | — (additive token) |
| (D′ only) `ToggleGroup` props | `shape` added | — (additive) |

## 8 · Dependencies and ledger rows

Depends on the D4 gate, W-E.6, W-E.8, W-H.1, W-A.3 and W-C.1. Closes F-30b; O-58; the 17 UIA rows per §1; #84's two-line-item half; N-9. The three gestalt passes (tranche fit, wave, feature, P-1) are recorded in the wave record before it closes.

## Appendix A · the band-J probe (shared with W-J.2)

Scratch source, reproduced so a seat can replay it after a scratch wipe. Built against any worktree's `src` through the `@glass` alias; served over a local HTTP server (module scripts do not load from `file://`). It exits 1 on any FAIL row. At HEAD: `VERDICT tile-probe: FAIL (18 failing cells)`; with the planted corner rule, 2 failing cells (the contrast rows). When it lands under `scripts/probes/band-J/`, the worktree argument becomes the repository.

`build.mjs <worktree> <label>`: the band-I probe's `build.mjs` (`W-I.1.md` appendix A) with the output folder `out/bj-<label>` and the stylesheet `@source`s `${wt}/src/components/**/*.vue` and `**/*.ts`.

`app/App.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Slider } from "@glass/components/slider";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
const v = ref([40]); const t = ref("smooth");
const scene = new URLSearchParams(location.search).get("scene") ?? "slider";
onMounted(() => { (window as any).__ready = true; });
</script>
<template>
  <main style="min-height:100vh;padding:64px;box-sizing:border-box">
    <template v-if="scene === 'slider'">
      <button data-t="before">before</button>
      <div style="width:360px;padding:24px 0"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" data-t="slider" /></div>
    </template>
    <template v-else>
      <ToggleGroup type="single" v-model="t" aria-label="Presets" style="display:grid;grid-template-columns:208px 208px;gap:8px">
        <ToggleGroupItem v-for="p in ['smooth','snappy','bouncy','gentle']" :key="p" :value="p" class="flex-col" style="inline-size:208px" :data-t="'tile-' + p">
          <span data-t="name">{{ p }}</span><span data-t="meta">stiffness 180 · damping 12</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </template>
  </main>
</template>
```

`tile.mjs <dist> <worktree>`:

```js
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const [,, dist, wt] = process.argv; const require = createRequire(path.join(wt, "package.json")); const pw = require("playwright");
const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" };
const srv = http.createServer((q, r) => { let p = path.join(dist, decodeURIComponent(q.url.split("?")[0])); if (p.endsWith("/")) p += "index.html"; if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(r); });
await new Promise((ok) => srv.listen(0, ok)); const url = `http://127.0.0.1:${srv.address().port}/?scene=tile`;
let bad = 0;
for (const engine of ["chromium", "webkit"]) {
  const b = await pw[engine].launch();
  for (const contrast of ["no-preference", "more"]) {
    const pg = await b.newPage({ viewport: { width: 600, height: 400 } });
    await pg.emulateMedia({ contrast }); await pg.goto(url); await pg.waitForFunction(() => window.__ready); await pg.waitForTimeout(300);
    const r = await pg.evaluate(() => [...document.querySelectorAll('[data-t^="tile-"]')].map((el) => { const b = el.getBoundingClientRect(); const n = el.querySelector('[data-t="name"]').getBoundingClientRect(); const m = el.querySelector('[data-t="meta"]').getBoundingClientRect(); return { id: el.dataset.t, state: el.dataset.state, radius: getComputedStyle(el).borderTopLeftRadius, h: +b.height.toFixed(2), w: +b.width.toFixed(2), rows: m.top >= n.bottom - 0.5 ? 2 : 1, nameX: +(n.left - b.left).toFixed(2), nameY: +(n.top - b.top).toFixed(2), bw: getComputedStyle(el).borderTopWidth }; }));
    for (const c of r) { const pass = c.rows === 2 ? parseFloat(c.radius) <= 16.01 : true; if (!pass) bad++;
      console.log(`${pass ? "PASS" : "FAIL"} ${engine} contrast=${contrast} ${c.id} ${c.state} ${c.w}×${c.h} rows ${c.rows} radius ${c.radius} · border ${c.bw} · name at (${c.nameX}, ${c.nameY})`); }
    globalThis[`${engine}-${contrast}`] = r; await pg.close();
  }
  const a = globalThis[`${engine}-no-preference`], m = globalThis[`${engine}-more`];
  for (let i = 0; i < a.length; i++) { const dx = +(m[i].nameX - a[i].nameX).toFixed(2), dy = +(m[i].nameY - a[i].nameY).toFixed(2); const pass = dx === 0 && dy === 0; if (!pass) bad++;
    console.log(`${pass ? "PASS" : "FAIL"} ${engine} contrast-shift ${a[i].id} ${a[i].state}: content moves (${dx}, ${dy}) px under prefers-contrast: more (bound 0, 0)`); }
  await b.close();
}
srv.close(); console.log(`VERDICT tile-probe: ${bad ? "FAIL" : "PASS"} (${bad} failing cells)`); process.exit(bad ? 1 : 0);
```

W-J.2's `slider.mjs` is in `W-J.2.md` appendix A.
