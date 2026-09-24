# D4 · pass 1 · D4-D · the tile shape on ToggleGroup (a declared shape axis)

| field | value |
|---|---|
| seat | D4-D pass-1 research. Develops D4-D alone from `PORTFOLIO.md` §0-§2, its own §4 section, §6 D4-D and §7, with `pass-1/W.md`, `pass-1/X.md` and `harness/HARNESS.md` as background |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`; the checkout and the worktree read `47dce8ad`. `git diff --stat 91dbcbd8 47dce8ad -- src vite.targets.ts package.json` is empty, so every `src/` cite below holds for both |
| worktree | `…/scratchpad/D4/p1/D4-D-research/wt` at `47dce8ad`, `node_modules` and `tests-visual/node_modules` symlinked from the checkout. All source edits and builds ran there and in `…/D4-D-research/out`. The probe diff is kept at `…/D4-D-research/d4d-probe.diff` (366 lines). One slip: I ran `git add -N` on the new `cell.css` inside the worktree to include it in `git diff --stat`. That wrote to the worktree's own index, not the checkout's, and it went when the worktree was removed |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, both from `glass-ui/node_modules/playwright` 1.61.1, headless, 1000×900 at DSF 2. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| harness | Two harnesses ran against the same worktree. (1) The **canonical** battery, unchanged, from `docs/tranches/BL/design/tile/harness/`. Its `preset`/`specimen`/`strip` scenes still carry the consumer's item utilities on a pill group, so they show what D does for a consumer that has **not** migrated. (2) A **migrated copy** at `…/D4-D-research/harness/`, with only two changes: `lib.mjs` reads `REPO` from `TILE_REPO`, and `scenes.mjs` transcribes `preset`, `specimen` and `strip` as their D migrations: `shape="cell"` at the group, no item radius, layout or selection utilities, and the consumer's tile paint deleted. The copy also adds W-D to those scenes' gates and three probe-only scenes (`d-wrap`, `d-size`, `d-radio`) that no witness reads |
| load | load average 19.8 / 22.6 / 20.8 at the worktree add and 46.0 / 37.5 / 32.0 at the final battery. Other seats were building. Every number below is a settled static read or a real input event. None is a wall-clock timing |

## 0 · In brief

1. **The mechanism works on the real source and turns D's witness green.** `<ToggleGroup shape="cell">` gives 16 px on `--radius-field`, a column, and body leading (22.95 px md, 20.19 px sm) on all three consumer tiles with no item utilities. W-D: **22/22** in Chromium and **22/22** in Playwright WebKit on the migrated scenes, and 4/4 in both on the canonical `family-d` scene. HEAD was 0/4.
2. **The corner alone does not fix the tile.** The probe had to specify four more things:
   - **A selected carrier the content cannot erase.** The item's own border goes to full `--foreground`. `--ink-perimeter` (0.48) measured **0 px²** of ≥3:1 edge in light, because the sibling's resting edge is already 14 % ink.
   - **Geometric grid arrows in the one engine.**
   - **Ring clearance on the cell grid**, 4 px of group padding.
   - **A hover light channel** on the same edge, rest 0.14 → hover 0.48 → selected 1.0.
   
   With all four, the migrated preset, specimen and strip tiles pass T-1, T-3 (light, dark, PRT), T-4, T-5, T-7 and T-8 in Chromium. Every WebKit cell that ran passes too. The exception is T-6: it passes in Chromium, and Playwright WebKit crashes on hover (item 7).
3. **Q1, vocabulary.** Share Chip's name, `shape="cell"`, and use **one declaration** (`styles/glass/cell.css`) that both atoms read. Chip's cell moves from `--radius-card` to `--radius-field` (16 px either way; the role table puts multi-line holders on the field rung). Chip's `shape="cell"` has **zero consumer sites** in value.js, keyframes.js, fourier-analysis and chicago (grep, §1.1). Only a static demo chip uses it.
4. **Q2, scope.** The cell owns the corner (shared), the column, stretch alignment, start text, the pad pair (`--space-atom` / `--space-body`), body leading, the `repeat(auto-fill, minmax(min(var(--toggle-group-cell-min), 100%), 1fr))` grid and the ring clearance. The consumer keeps content typography, content ink and any column override.
5. **Q3, the wrap hole.** The pill gains a no-wrap law with an overflow policy. It takes at most the row width, starts its content when it overflows (`safe center`), clips at the plate, and ellipsizes each label element. A DEV-only refusal covers what `nowrap` cannot stop: a hard break. Both engines agree. **Two holes stay:** a bare-text label clips without an ellipsis, and a hard two-line label that fits inside the rung is neither caught nor ballooned.
6. **Q4, size.** `size` composes with cell without a new register. It retunes the pad pair (sm 8/8, md 8/12, lg 12/20), the rung floor (36/40/44) and bare-text type. On the measured tiles the content's own type fixed the height, and sm and md both measured 63.58 px. Under §13 this is threading the existing register, not a contrived axis.
7. **Q5, RadioGroup.** Ruled out, measured.
   - The library's `RadioGroupItem` renders **no content**: item text was empty on all four items.
   - Its reka roving leaves the cross axis dead in a 2×2 grid, and it walks by DOM order.
   - It is a second roving machine, which the one-engine gate cannot see.
   
   The engine change here gives the grid arrows reka does not.
8. **The one blocker outside D's reach.** Playwright WebKit crashes on hover over any ToggleGroupItem. The trigger is painting `--control-surface-bg-hover`, a `color-mix()` of two `--glass-plate-*` tokens that are themselves relative-colour mixes. Removing `.control-surface` alone clears it. This is library-wide (`.control-surface` has other readers) and not D's to fix. D keeps ToggleGroupItem, so it inherits a red Playwright WebKit T-6 cell.

## 1 · The research questions

Paths are relative to `S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-D-research` and `H=docs/tranches/BL/design/tile/harness`. `TILE_REPO=/Users/mkbabb/Programming/glass-ui` is set on every run of the migrated copy.

### 1.1 Vocabulary: `shape="cell"` shared with Chip, one declaration or two readers?

**Ruling: the same name, one declaration.** Measurements:

- `grep -rn 'radius-field\|glass-chip--cell\|shape="cell"' src tests demo`: at HEAD, Chip's cell reads `--radius-card` (`glass-chip.css:59-62`). The only live `var(--radius-field)` reader is `_shared/field/control.css:184`. Chip `shape="cell"` appears in the demo only (`demo/stories/forms/chip.vue:50`, a static chip).
- `grep -rn --include=*.vue --include=*.ts -e 'shape="cell"' -e 'shape: "cell"'` over value.js, keyframes.js, fourier-analysis and chicago (`src`, `demo`, `web/src`): **no hits.** value.js records that it left the cell for a circle at 7.0.0 because "the `cell` shape resolved to a capsule" (X §1.1 V1).
- The probe moves the corner into a new partial, `styles/glass/cell.css`, which `glass.css` imports right after `glass-chip.css`:
  ```css
  .glass-chip--cell, .glass-chip--cell.glass-capsule,
  .toggle-group[data-shape="cell"] .toggle-group__item { border-radius: var(--radius-field); }
  ```
  Chip's rule is deleted from `glass-chip.css`. T-1 on `chipcell` still passes (16 px flat, named `--radius-field`, `out/runs/d-canon5/T-1-chromium.json`), and T-1 passes on every migrated ToggleGroup tile (§3).
- **Why one declaration and not two readers of one token.** Two readers would each state the same fact (a multi-line selectable option is on the field rung), which P-3 forbids. The shared rule is the one place that fact is stated. The group arm is (0,3,0), so it outranks the item's `.toggle-group__item { border-radius: var(--radius-pill) }` by specificity in whatever order the SFC sheet and the global sheet land. The chip pair keeps its doubled class to outrank `.glass-capsule`.
- **The name clash to keep in view.** `radius-role-canon.test.ts:354` calls a *radius role* "`cell` (0) ... the absence of a silhouette". The component axis `shape="cell"` means 16 px. Two meanings of one word in one codebase is a real cost. It is the same cost Chip already pays. The role spine's `cell` is prose in a test, while the prop is public API, so if one of them yields it is the test's word.
- **Anatomy is not shared (§1.2).** Chip's cell anatomy lives in utility strings in `chipVariants.ts:15` (`flex-col gap-1.5 px-2 py-2.5 text-micro`). The migrated harness build emitted **no** `.py-2\.5` rule (`grep -c` on the bundle: 0, against 1 in the canonical build, whose scene markup happens to contain the string). As a result the Chip cell in the migrated build lost its padding: 41.52×28.59 against 41.52×48.59 canonical. D's cell anatomy is in the sheet and does not depend on what Tailwind scans. If the shared declaration grew to cover anatomy, Chip's cell would have to move its utilities into CSS.

### 1.2 Scope: what the cell owns beyond the corner

The three consumer tiles mount with `shape="cell"` and **no item utilities** (migrated copy `scenes.mjs`: preset has no class on the group or the items; specimen has `size="sm"` and the group token `--toggle-group-cell-min: 150px`; strip is one `ToggleGroup size="sm"` around the family wrappers).

`TILE_REPO=… node $S/harness/wd-declared-cell.mjs --build $S/out/builds/d-mig5 --out $S/out`, from the battery run (`logs/d-mig5-run.log`, `W-D chromium exit 0 · W-D PASS · 22/22`):

```
preset #0..#3    corner 16px→16.00 (--radius-field 16.00) · column · line-height 22.95 vs body 22.95 · rows 2
specimen #0..#7  corner 16px→16.00 (--radius-field 16.00) · column · line-height 20.19 vs body 20.19 · rows 2
strip #0..#5     corner 16px→16.00 (--radius-field 16.00) · column · line-height 20.19 vs body 20.19 · rows 2
family-d #0..#3  corner 16px→16.00 (--radius-field 16.00) · column · line-height 22.95 vs body 22.95 · rows 2
```

Playwright WebKit: `W-D webkit exit 0 · W-D PASS · 22/22`. Canonical harness (`logs/d-canon5-run.log`): `W-D PASS · 4/4` in both engines.

| the cell owns | declaration (probe) | why the group owns it |
|---|---|---|
| corner | `cell.css`, `--radius-field` | the role table (§1.1) |
| column, stretch, start text | `flex-direction: column; align-items: stretch; justify-content: flex-start; text-align: start` | K1 and K2 each wrote it by hand (`flex-col items-start`, `align-items: stretch`) |
| pad pair | `padding: var(--space-atom) var(--space-body)`; sm `var(--space-atom)`; lg `var(--space-body) var(--space-family)` | Card's own pad rungs (`card/styles.css:36,44`); the narrow-width token step comes free |
| leading | `line-height: var(--type-leading-body)` | K1 wrote `leading-normal` |
| rhythm | `gap: var(--space-residue)` | K1 `gap-0.5`, K2 `gap-1.5` |
| grid | `display: grid; grid-template-columns: repeat(auto-fill, minmax(min(var(--toggle-group-cell-min), 100%), 1fr)); inline-size: auto` with `--toggle-group-cell-min: 10rem` | K2's `minmax(150px, 1fr)`, and K1's two columns fall out at its width: 2 columns in the 460 px host, measured |
| ring clearance | `padding: calc(var(--focus-ring-width) + 2px)` on the group | K2's grid padded 2 px against a 4 px ring (T-4 cut). T-4 migrated: **20/20** in both engines |

The consumer keeps: content typography (K1's `text-small`, K2's `text-mono-caption`); content ink, including K2's portrait stroke and name tone and V1's glyph stroke (T-7 reports these as content ink, not tile paint); and layout overrides. V1 keeps its family row with `.toggle-group.strip-row { display: inline-flex }`, since a group's items register through context and the family wrappers are allowed. A consumer can retune the grid minimum with the token (§13, a magnitude token beats a prop), and K1 can keep `grid-cols-2` as layout.

Captures: `cap/d-{preset,specimen,strip}-{light,dark}.png` (`node shots.mjs out/builds/d-mig5`).

### 1.3 The wrap hole: a no-wrap law for pill, or accept the balloon?

**Ruling: the pill gains a no-wrap law with an overflow policy, plus a DEV refusal for the hard break.** The probe scene `d-wrap` puts four pill items in a 130 px host: a bare text label, a `<span>` label, icon plus span, and a 45-character hyphenated token. `node probe-wrap.mjs out/builds/<label>` (`logs/probe-wrap2.log`, `probe-wrap4.log`):

| law | Chromium | Playwright WebKit |
|---|---|---|
| HEAD, item unconstrained | items 199.61-356.05 px wide in a 130 px host: they overflow the host instead of wrapping, because `flex: none` sizes to max-content | 199.69-356.19, the same |
| HEAD, item capped at `max-inline-size: 100%` (what K1's `w-full` does) | 130×47.89, used corner **23.95** (÷h/2 1.00), 3 lines: the balloon | 130×47.88, 23.94, 3 lines |
| **D pill law** (`max-inline-size: 100%; justify-content: safe center; white-space: nowrap; overflow: clip`; children `min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; padding-block: 0.15em`) | all four 130×40.00, used **20.00** (÷h/2 1.00), 1 line. Span, icon+span and token labels ellipsize; the bare text node is clipped at the plate | the same geometry; the same clip |

Two engine facts decided the law's details, both from captures:

- **A bare text node gets no ellipsis in either engine.** A flex container's text is an anonymous flex item, and `text-overflow` cannot reach it. Before `safe` and `overflow: clip`, that text was centred and clipped on both sides ("tically damped spr") and bled past the plate (`cap/wrap-*-nowrap-te.png`, `cap/wrap3-*-law.png`). With the final law it starts at the plate and clips at the right (`cap/wrap4-*-law.png`).
- **Playwright WebKit shears descenders at the clip edge.** The item carries `line-height: 1`, so without `padding-block: 0.15em` on the label the clip cut the descenders (`cap/wrap-webkit-nowrap.png`).

`nowrap` stops soft wraps only. A hard break, as the T-1 witness appends it (`<br>` plus a span), still grows a declared pill. The canonical T-1 `wrap` cell reads 20.00 → 26.23 → 41.52 (FAIL) in both engines, and that scene also sets `white-space: normal` unlayered on the item. So the strongest form adds a DEV-only refusal. `ToggleGroupItem` gets a `ResizeObserver` that logs one `console.error` when a pill item grows past its `min-block-size` (after Button's retired-prop voice, `Button.vue:125-146`). `node probe-refusal.mjs out/builds/d-dev` (`--dev` build, `logs/probe-refusal.log`):

```
Chromium / Playwright WebKit  single, vertical, preset (cell), specimen (cell), strip (cell): errors at mount 0
Chromium / Playwright WebKit  wrap: after a line is added to item 0: 1 ["[glass-ui] <ToggleGroupItem value="a"> holds more than one line in a pill group; declare `shape="cell"` …"]
Chromium / Playwright WebKit  single (sm): after a line is added to item 0: 0
```

The last row is a named hole (§6 C-2). A two-line label at `line-height: 1` measures 30.94 px and fits inside the 36 px rung, so nothing grows and nothing fires.

R7-02-04 records that a 200-character unbroken label in a ToggleGroup pans the page to 3,219 px. The law's `max-inline-size: 100%` plus clip is the overflow policy that row asks for, and the canonical T-2 stays **12/12** in both engines under it.

### 1.4 Does `size` compose with `cell` under §13's no-contrivance fence?

`node probe-wrap.mjs out/builds/d-mig2` (the `d-size` scene: three cell groups, sm, md and lg, around the preset content; `logs/probe-wrap.log`):

```
Chromium          size=sm: item 222.00×63.58 radius 16px pad 8px/8px  font 13.46px lh 20.19px min-block 36px
Chromium          size=md: item 222.00×63.58 radius 16px pad 8px/12px font 15.3px  lh 22.95px min-block 40px
Chromium          size=lg: item 222.00×71.58 radius 16px pad 12px/20px font 15.3px lh 22.95px min-block 44px
Playwright WebKit identical (lh 20.190001 / 22.950001)
```

**Ruling: it composes, and it adds no axis.** `size` already exists on the group (`ToggleGroup.vue:45`) and reads the `--control-h-*` cohort. On a cell it threads that same register onto the pad pair and the rung floor, which is §13's "thread the EXISTING register, ZERO new register". The corner does not move with size (16 px at every rung), and it should not: the field rung is a role, not a magnitude. What the fence does catch is small. On these tiles the content's own type sets the height (sm and md both 63.58 px), so size mostly moves inline padding. lg's font does not step up because the pill's lg rule sets no font. `size` is still a real hierarchy choice for bare-text cells and for density (K2 chose sm), so it stays. A separate `density` or `pad` prop on the cell would be the contrivance.

### 1.5 RadioGroup as the host

The probe scene `d-radio` mounts the library's `RadioGroup` in a 2×2 grid, with preset content in each item. `node probe-radio.mjs out/builds/d-radio` (Chromium, real clicks and keys, `logs/probe-radio.log`):

```
orientation=vertical   · radiogroup · radio · 1 tab stop · item text: (empty) | (empty) | (empty) | (empty)
  ArrowRight from #0 → focus #0 (dead) · ArrowDown from #0 → focus #1 (the right-hand neighbour: DOM order) · ArrowUp from #2 → focus #1
orientation=horizontal · radiogroup · radio · 1 tab stop · item text: (empty) ×4
  ArrowRight from #0 → #1 · ArrowDown from #0 → #0 (dead) · ArrowUp from #2 → #2 (dead)
```

**Ruled out, on three grounds.**

1. **It cannot hold a tile.** `RadioGroupItem.vue:36-49` renders reka's item on the 44 px `control-bit` seat with a dot and no default slot, so every item's text measured empty.
2. **Its keys are worse than the engine's.** Reka's roving (`getFocusIntent`, W §1 and §3.3) leaves the cross axis dead once `orientation` is set, and walks by DOM order on the main axis. That is the same shape T-5 convicts. The probe's engine change (§2.2) gives geometric Up/Down.
3. **It is a second roving machine.** The one-engine gate cannot see it (`overfit-structure.test.ts:415-462` looks for imports of `useTabRovingFocus` and `useSelectionIndicator`; reka's machine never names either). Giving RadioGroup a card shape would put the tile outside `useSelectionGroup`.

RadioGroup keeps its job (the dot rows at value.js `SearchFilterBar.vue:21-42` and `FlagReportDialog.vue:16-27`, X §1.3), and D does not touch it.

## 2 · The strongest form (what D must specify to work)

### 2.1 The declaration

- `ToggleGroupProps.shape?: ToggleGroupShape`, with `export type ToggleGroupShape = "pill" | "cell"` and `pill` the default. The group stamps `data-shape`, and the context publishes `shape` to the items.
- **pill**: one line, by law (§1.3). The stadium on `--radius-pill`, `nowrap`, the row-width cap, `safe center`, clip at the plate, and an ellipsis on each label element. DEV refusal when an item grows past its rung.
- **cell**: the anatomy in §1.2. The corner is the one shared rule in `styles/glass/cell.css`, which Chip reads too. The only new token is `--toggle-group-cell-min` (10rem), a magnitude. The ring clearance on the group is `calc(var(--focus-ring-width) + 2px)`. The literal 2 px copies the ring offset from `base.css:144-151`. The ring should publish its reach as a token so this is not a second statement of it.

### 2.2 The engine: grid arrows

`useTabRovingFocus` gains `grid?: ComputedRef<boolean>`, and `useSelectionGroup` forwards it. With `grid` on, the cross-axis arrows walk by geometry: to the nearest enabled item on the adjacent line, closest in the other coordinate (the react-aria `layout="grid"` model, W §3.3). No column count is needed, so it survives auto-fill and resize. ToggleGroup always passes it, because a wrapping pill row and a cell grid are both two-dimensional. In a single line the walk finds no neighbour and does nothing. SegmentedTabs and the dock pass nothing and stay unchanged: canonical T-5 `tabs` still moves Right and Left and still carries its separate `group`/`aria-pressed` failure. The probe spent 43 lines on this in the roving file and 3 in the engine.

In a production build, the same `grid: computed(() => true)` line would be a plain boolean option. The probe kept the file's `ComputedRef` convention.

### 2.3 The selected, hover, focus and press states

| state | carrier | channel | measured |
|---|---|---|---|
| rest | the register's hairline, `--control-surface-border` (computed 14 % ink) | `border-color` | none; the baseline |
| hover (fine pointer) | `--ink-perimeter` (0.48) | `border-color`, behind `@media (hover: hover)` | T-6 light channel **3.84 %** preset, **2.91 %** specimen, **7.47 %** strip (was 0.88 % at `--ink-edge` 0.16 and 0.00-0.02 % at HEAD); PRM identical; coarse 0.00 % latch |
| selected | full `--foreground` | `border-color` | T-3 ≥3:1 edge: preset **318 / 335 / 326 px²** (light / dark / PRT) against a 267 px² bar; specimen 560 / 577 / 568 against 299; strip 143 / 153 / 144 against 94 |
| focus | `.focus-ring` unchanged, 2 px outline at a 2 px offset | `outline` | T-4 **20/20** in both engines, including selected-and-focused |
| press | `.glass-capsule-hover` / `.tap-squish`, unchanged | `scale` | 0.97×0.97 |
| commit | the existing 180 ms colour transition, which now includes the edge | `background-color`, `border-*-color`, `color` | T-6 commit PASS; §6 C-9 on the D-2 bar |

The fill (`color-mix(fg 12 %)`) stays as an assist. It still paints under the `.control-surface` background-image plate (`probe-rules.mjs`: `.glass-defined, .input-pill, .control-surface { background-color: transparent; background-image: linear-gradient(var(--glass-veil) …) }`). So it separates 1.20:1 in light and **1.00:1 under PRT**, where the plate turns opaque. The edge carries PRT alone, and does so in both engines.

**Why full ink and not `--ink-perimeter`.** The first probe build (`d-mig`) put the selected edge at 0.48. T-3 in light read **0.00 px²** of ≥3:1 edge on preset, specimen and strip. Dark passed at 298.5-538 px². PRT failed at 0.00 px² as well. The token's comment says "3.0:1", but that is against the page. Against the unselected sibling's own 14 % edge, on a quiet plate, it is about 2:1 in light. Full ink needs no new token.

### 2.4 Tests the family re-points

| test | today | D's change |
|---|---|---|
| `ToggleGroup.test.ts` G-TOGGLE-WRAP (`:302-326`) | forbids `nowrap` anywhere in the sheet and `padding` on any group-ending rule | fails on the pill law (`nowrap`) and on the cell ring clearance (`padding`). The row still wraps and the group still paints no plate. The gate's intent holds, and its text does not |
| `ToggleGroup.test.ts` barrel list (`:348`) | four exports | fails: adds `ToggleGroupShape` |
| `radius-role-canon.test.ts:555-568` | the item keeps `border-radius: var(--radius-pill)` | **still passes**, since the pill arm keeps the stadium. It gains a cell-arm case against `cell.css` |
| `public-surface.spec.ts` Row 8 | dist-dependent | not run: `dist/` is absent in the worktree, so 4 fail on "dist/ is absent" whatever the change. `.published-roster` gains a type row |

Command: `npx vitest run tests/components/ui/toggle-group tests/styles/radius-role-canon.test.ts tests/gates/overfit-structure.test.ts tests/composables` → `2 failed | 353 passed | 1 expected fail (356)`, the two G-TOGGLE-WRAP cases above. `npx vue-tsc --noEmit --project tsconfig.src.json`: no errors.

## 3 · The probe on the real source: the battery

**The probe diff** (`d4d-probe.diff`): 10 files, 177 insertions and 7 deletions.

- `toggle-group/styles.css` +74: the pill law, the cell arm, the selected and hover edge.
- `useTabRovingFocus.ts` +43: the geometric cross axis.
- `ToggleGroupItem.vue` +24/−2: the DEV refusal.
- `ToggleGroup.vue` +11: the prop, `data-shape`, `grid`, and `shape` in the context.
- `cell.css` +15, new.
- `glass-chip.css` −5: its cell corner moves to `cell.css`.
- `index.ts` +6/−2: the type export.
- `context.ts` +2, `useSelectionGroup.ts` +3, `glass.css` +1.

**The builds.** `node $H/build.mjs $S/wt --label d-canon5 --out $S/out` (canonical scenes) and `TILE_REPO=… node $S/harness/build.mjs $S/wt --label d-mig5 --out $S/out` (migrated scenes), both from the final CSS.

**The runs.** `TILE_REPO=… node $S/harness/run.mjs --build $S/out/builds/d-mig5 --out $S/out --webkit` and `node $H/run.mjs --build $S/out/builds/d-canon5 --out $S/out --webkit`. Printed lines are in `logs/d-mig5-run.log` and `logs/d-canon5-run.log`, and every cell is in `out/runs/{d-mig5,d-canon5}/*.json`.

The `d-mig5` bundle was built before the DEV refusal was added. The refusal is stripped from production, so `d-mig5` is the shipped behaviour. `d-dev` carries the refusal.

| witness | migrated (the D consumer), Chromium | migrated, Playwright WebKit | canonical (unmigrated consumer), Chromium | HEAD (HARNESS §4) |
|---|---|---|---|---|
| T-1 | 7/10. **PASS** on preset 16.00 flat (204×63.58 → 103.92), specimen 16.00 flat (205×94.16 → 130.47), strip 16.00 flat (40×54.80 → 90×76.39), card, chipcell. FAIL: `wrap` (pill ToggleGroupItem 20.00 → 26.23 → 41.52 on a hard break; pill Chip; Button) | 7/10, the same | 3/8: preset 35.09 → 55.26, specimen 51.09 → 69.24 (the pill, still a stadium) | 3/8 |
| T-2 | **12/12** | **12/12** | 12/12 | 12/12 |
| T-3 | 10/15. **PASS** preset, specimen, strip in light, dark and PRT (areas in §2.3). FAIL: card ×3 (Card's arm), chipcell light and PRT (Chip's flood, 1.49 / 1.13) | 10/15, the same rows; PRT on the forced level-0 path | 8/15: preset and specimen pass on the edge even unmigrated; the strip (still Chip) fails | 2/15 |
| T-4 | **20/20** (specimen whole at 2.00 px on every side) | **20/20** | 8/20: the specimen ring cut to 1.00 px (the consumer's 2 px grid padding); preset-verbatim's dashed outline replaces the ring | 8/20 |
| T-5 | 27/38. **PASS** every ToggleGroup scene: preset and specimen grids move and check on all four arrows (Down 0 → 2, Up 2 → 0); strip `radiogroup`, 1 stop. FAIL: tabs ARIA (SegmentedTabs), card ×6, chipcell ×4 | Chromium only (CDP) | 23/38: preset and specimen grids pass all four arrows unmigrated; the strip (Chip) fails | 19/38 |
| T-6 | 27/30. **PASS** every cell on preset, specimen, strip. FAIL: card hover scale 1.00, chipcell light channel 0.00 % (PRM too) | 9/15. **FAIL** preset, specimen, strip: "no answer within 120 s (hung)" (§5) | 21/24 | 17/24 |
| T-7 | **12/12**: no tile paint in any state. Content ink reported: K2's name tone and V1's label ink | Chromium only | 4/12: the consumer's 16 px and dashed outline | 4/12 |
| T-8 | **16/16**, real Safari UNMEASURED | (in T-8) | 12/16 | 0/16 |
| **W-D** | **22/22** | **22/22** | 4/4 (`family-d`) | 0/4 |

**What D turns green, per mode, on the three consumer tiles as migrated.**

| witness | light | dark | PRT | engines |
|---|---|---|---|---|
| T-1 | green | green | green | Chromium and Playwright WebKit |
| T-2 | green | green | green | both |
| T-3 | green | green | green | both; in Playwright WebKit the PRT cell is the forced level-0 path |
| T-4 | green | green | not run (the witness has no PRT cell) | both |
| T-5 | green | green | green | Chromium only |
| T-6 | green | green | green (the PRM hover keeps its channel) | Chromium green; **Playwright WebKit red** (hover hangs) |
| T-7 | green | green | green | Chromium only |
| T-8 | green | green | green | Chromium and Playwright WebKit; real Safari UNMEASURED |
| W-D | green | green | green | both |

Real Safari is UNMEASURED (owner's safaridriver checkbox) in every cell.

**The cost.** For the tile, 177 source lines. Four gate texts re-point (§2.4). One new public prop, one new type and one new magnitude token. One engine option with a DOM rect walk that runs on cross-axis keypresses only; the probe measured no timing. For a DEV page, one `ResizeObserver` per ToggleGroup item. Nothing new at runtime in production.

**What the unmigrated consumer gets.** The canonical column shows it: the edge (T-3) and the grid arrows (T-5), with no corner (T-1) until the consumer declares `cell`. The pill law's label padding also grew the unmigrated preset tile from 61.58 to 70.17 px tall.

## 4 · Public API and consumer impact

**`/toggle-group`.**
- Adds `shape?: "pill" | "cell"` and `ToggleGroupShape`, plus the `data-shape` attribute and the `--toggle-group-cell-min` token.
- The pill becomes one line by law. The DEV refusal names `shape="cell"`.
- Selected and hover paint move to the border (full ink / 0.48). A consumer that hand-painted `border-color` on an item at equal or higher specificity now competes with the selected carrier.

**`/chip`.** The `cell` corner re-points to `--radius-field`, with no change in pixels.

**The engine.** A `grid` option; SegmentedTabs and the dock are unaffected.

Sites below are from X.md at the consumer HEADs it names. Each consumer migrates in its own tranche (E-6).

| site | migration | deletes | keeps or gains |
|---|---|---|---|
| keyframes.js K1 `SpringPhysicsFacet.vue:72-89` (glass-ui `10.0.1`) | `<ToggleGroup type="single" shape="cell">` | the group reset `:74` (`rounded-none bg-transparent p-0 shadow-none backdrop-filter-none`); the item utilities `:84` (`flex-col items-start gap-0.5 px-3 py-2 … leading-normal bg-background`); the scoped paint `:197-215` (its own `--radius-field`, the dashed outline that took over the ring's property, the washes) | keeps the content type `:86-87`; may keep `grid-cols-2` as layout; gains 16 px, the full-ink edge, a whole ring with `NO_PRESET`, and all four arrows. The stale "aria-pressed" comment `:71` is corrected |
| keyframes.js K2 `EasingTarget.vue:115-158` | `shape="cell"` on the existing `size="sm"` group, `style="--toggle-group-cell-min: 150px"` | the item layout `:130`; `EasingTarget.css:100-106` (grid template, 2 px padding); `:115-116` (its radius); `EasingTarget.vue:410-416` (the dead group reset) | keeps the portrait and name ink `EasingTarget.css:197-204` (content ink: X-2, not met by D), `content-visibility: auto` and the ball's direct writes (X-3; the state paint is attribute-driven, with no slot re-render) |
| value.js V1 `EasingSpecimenStrip.vue:86-122` (glass-ui `^7.0.0`) | Chip `shape="icon"` × N in `role="group"` → one `<ToggleGroup type="single" size="sm" shape="cell">` around the family wrappers | the hand exclusivity `:33-35`; the fixed 44 px circle `:172-183` | gains `radiogroup` with 1 tab stop (from 6) and a 16 px card; keeps its row layout as an override of the group's display, and its glyph ink. The adopt crosses three majors (X §5 item 4) |
| value.js V2 `MixSourceSelector.vue:293-341` (N-of-M thumbnails) | `type="multiple" shape="cell"` (`group` / `aria-pressed`, correct for N-of-M) | `ring-2 ring-primary …` and `opacity-75` (`:304-308`), the ring-on-ring collision with focus `:305`, `rounded-card` | the arm exists (`type="multiple"`), and X-4 holds: the same anatomy for both cardinalities. Not probed |
| value.js V3 ConsoleRail | **none**: it is a `tablist` over panels, not a one-of-N value | — | out of D; a ToggleGroup would announce `radiogroup` for tab navigation. F-30a owns the rail's corner |
| fourier-analysis F1 `HarmonicLevelGrid.vue:28-57` | `type="single" shape="cell"` | the Button host, its `border-color` / `box-shadow` selection `:221-270`, the label tone `:292-295` | gains a state announcement it never had (`radio`), 1 stop (from 12) and arrows. **Collision:** its `is-bound` second state paints `border-color` too (`:256-264`), the channel D spends on selection (§6 C-6) |
| fourier-analysis F3/F6 `FunctionInput.vue:194-210`, `NotationPills.vue:15-35` | pill ToggleGroup `type="single"` | the hand `aria-pressed`, radius and paint | F3's recorded refusal of `radiogroup` ("the tree does not implement" the keys, `:294-299`) no longer holds |
| fourier-analysis F5 `GallerySearchBar.vue:172-186` | no clean home: its single choice is deselectable (X-6) | — | ToggleGroup `single` re-selects rather than clearing |
| fourier-analysis F2 GalleryCard | out of scope: interactive descendants (X-5) | — | — |
| chicago C1 `TempApp.vue:316-330` | vertical pill `ToggleGroup type="single"`; the check mark can ride the `#indicator` slot or give way to the edge | the hand `role="radio"` markup with every radio a tab stop | gains roving and arrows |

## 5 · Chrome and Playwright WebKit

- **Geometry, T-1 / T-2 / W-D.** Identical to 0.01 px: d-size line height 20.190001 against 20.19.
- **Selected paint, T-3.** Areas differ by up to 30 % between the engines. Playwright WebKit gives preset 414.5 / 424 / 418 px² against Chromium's 318 / 335 / 326. Both clear the bar.
- **Ring, T-4.** 20/20 in both.
- **Overflow (§1.3).** The same geometry. Playwright WebKit alone showed the descender shear that led to `padding-block`.
- **The hover crash.** It is Playwright WebKit only and blocks T-6 there. `node probe-wkhover.mjs out/builds/d-mig5 single` (`logs/probe-wkhover.log`):
  - Stripping one class at a time, `mouse.move` hangs longer than 15 s with every class kept except `control-surface`. Removing `control-surface` alone, or all classes, returns.
  - With the hover background forced to a plain colour it returns. Killing transitions or backdrop-filter still hangs.
  - `node probe-wktoken.mjs` paints one div per declaration, with no hover. `var(--glass-plate-quiet)`, `var(--glass-plate-resting)` and `color-mix(in oklab, var(--glass-plate-quiet) 65%, transparent)` resolve. `var(--control-surface-bg-hover)` closes the target. So do `color-mix(in srgb, <quiet>, <resting> 35%)` and `color-mix(in oklab, <quiet>, <quiet> 35%)`.
  - **The trigger is a `color-mix()` whose two operands are both `--glass-plate-*` tokens** (each a `color-mix` over `oklch(from …)`, `tokens/glass.css:166-167`). One such operand is fine.
  - This is not D's code. D keeps ToggleGroupItem and therefore `.control-surface`, so it inherits the red cell until the register's owner (the token is W-FIELD's, `tokens/glass.css:257`) flattens the hover mix.
- **Real Safari.** UNMEASURED (owner's safaridriver checkbox). Playwright WebKit and Safari have disagreed on this library before, so the crash may or may not reproduce there.

## 6 · Weaknesses, as named counterexamples

- **C-1, the declared-wrong pill with a hard break.** `wrap` T-1: ToggleGroupItem 20.00 → 26.23 → 41.52 px in both engines. D is correct by declaration, not by construction. In production the balloon is silent; only DEV speaks (§1.3).
- **C-2, two lines inside the rung.** A `sm` pill whose label holds a `<br>` stays 36 px tall (slot 30.94 px at `line-height: 1`). No balloon and no refusal: a two-line stadium passes T-1, T-2 and the DEV guard. Only a line-count guard (`Range.getClientRects`) would catch it.
- **C-3, the bare text label.** In a narrow pill a text node is clipped at the plate with no ellipsis, in both engines (`cap/wrap4-*-law.png`). Only element labels ellipsize. The library would need a label wrapper, which would break the direct `> svg` icon-and-gap composition.
- **C-4, the field rung on a tiny cell.** The migrated V1 tile is 40×54.80 px, so the 16 px corner is 0.80 of half its width and the tile reads close to a stadium (`cap/d-strip-light.png`). The cell rung is right for K1 (204 px) and K2 (205 px), and weak at a 40 px width.
- **C-5, the ring clearance moves the grid.** The 4 px group padding insets the cell grid from its host: preset items are 204 px wide migrated against 208 unmigrated. It also collides with G-TOGGLE-WRAP's "no padding on the group" text. Putting the clearance in scroll hosts (FadingScroll) would serve every focusable child, but that is outside D.
- **C-6, one border channel carrying two states.** fourier-analysis F1's `is-bound` paints `border-color`, and GalleryCard's tier rules override selection at equal specificity (X-1). D puts selection on the item's border, so a consumer's second state on the border can erase it, and D has no second channel to offer.
- **C-7, the selected state never reaches the media.** K2's sparkline and V1's glyph still re-ink themselves on `[data-state="on"]` (T-7 reports content-ink deltas on both). D publishes no selected-ink token for a stage, so X-2 is unmet.
- **C-8, the fill dies under PRT.** 1.00:1 in both engines. The edge carries PRT alone. R3-02-08's under-plate fill is not cured by D.
- **C-9, the commit is a colour change.** T-6's commit cell passes on a 180 ms colour and border transition. The iOS-27 commit (a flood, a pop, a glide; D-2) is not there: Chip's flood (`glass-chip.css:27-57`) stays Chip's, and nothing here measures a commit beyond "it transitions".
- **C-10, the unmigrated consumer.** Until a site declares `cell`, D changes its corner by nothing (canonical T-1: 35.09 and 51.09 px, still 1.00 of h/2). The pill law's label padding makes the unmigrated preset tile taller (61.58 → 70.17 px), and the DEV refusal will speak on K1 and K2 until they migrate.
- **C-11, a vocabulary word with two meanings.** `cell` is 16 px on the component axis and 0 px in the role spine's prose (`radius-role-canon.test.ts:354`).
- **C-12, Chip cell and ToggleGroup cell share a corner, not a state.** After the shared rule, `chipcell` still fails T-3 in light and PRT (1.49 / 1.13) and T-6's light channel (0.00 %). The shared declaration makes them look alike at rest, not when selected. Whether Chip's `cell` keeps a reason to exist once V1 leaves it (zero consumer sites, §1.1) is open.

## 7 · Open gaps

1. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox), and the Playwright WebKit hover crash may or may not reproduce there.
2. T-6 in Playwright WebKit is red on every ToggleGroup scene until `--control-surface-bg-hover` stops mixing two plate tokens. That is outside D.
3. The iOS-27 commit (C-9): no witness cell measures a flood or pop, and the probe added none.
4. The media reach of the selected state (C-7) and the second-state collision on the border (C-6): no carrier specified.
5. The hard-break pill in production (C-1) and the two-lines-in-the-rung pill (C-2): refused only in DEV, or not at all.
6. The label-wrapper question for bare-text pills (C-3).
7. The ring's reach as a token, so the cell's clearance stops restating the 2 px offset.
8. `public-surface.spec.ts` and the `.published-roster` row were not run (no `dist/` in the worktree). V2's `type="multiple"` cell and chicago C1 were not mounted.
9. Hovered-unselected (0.48 edge) against selected (full ink): the difference between those two states was not measured.

## 8 · Artefacts

All under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-D-research/`:

- `d4d-probe.diff`: the source change, 366 lines. The worktree `wt/` was removed after the run.
- `harness/`: the migrated copy (`scenes.mjs` and `lib.mjs` differ from the checkout).
- `out/builds/{d-canon5, d-mig5, d-mig2, d-mig3, d-mig4, d-probe, d-dev, d-radio}/`, and the obsolete `d-mig` and `d-canon`, which carry the first 0.48-edge build.
- `out/runs/{d-mig5, d-canon5, d-mig, d-mig2}/*.json`.
- `logs/`: `d-mig5-run.log`, `d-canon5-run.log`, `probe-wrap*.log`, `probe-refusal.log`, `probe-radio.log`, `probe-wkhover.log`, `probe-wktoken.log`.
- Probe scripts: `probe-style.mjs`, `probe-rules.mjs`, `probe-wrap.mjs`, `probe-refusal.mjs`, `probe-single.mjs`, `probe-radio.mjs`, `probe-wkhover.mjs`, `probe-wktoken.mjs`, `shots.mjs`.
- `cap/`: `d-{preset,specimen,strip}-{light,dark}.png` and `wrap*-{chromium,webkit}-*.png`.
- The first battery run, on the 0.48-edge build (`logs/d-mig-run.log`), was stopped during T-6 Playwright WebKit. Its T-1..T-5 cells are the source of the 0.48 figures in §2.3.
