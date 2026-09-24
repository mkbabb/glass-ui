# D4 · pass 1 · D4-B · the choice card (research)

| field | value |
|---|---|
| seat | D4 pass 1, research seat for family D4-B: a new compound, `ChoiceGroup` + `ChoiceCard`, a card that is a radio. Read: `PORTFOLIO.md` §0-2, §4 D4-B, §6 D4-B, §7; background `pass-1/X.md`, `pass-1/W.md` (header only), `harness/HARNESS.md` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`; the checkout read `a54b64d6` at the start and `504ff421` at the end (docs-only commits from other seats). The worktree seeded at `329708ca`. `git diff --stat 91dbcbd8 329708ca -- src vite.targets.ts package.json` printed nothing, so the `src/` under test is the tree the portfolio names |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, Playwright 1.61.1 from `glass-ui/node_modules`, headless, DSF 2. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| instruments | the D4 battery (`harness/`, T-1..T-8 and W-B) run from a copy inside my worktree whose `scenes.mjs` composes the choice card at the three consumer sites; six scratch probes (`keys-b.mjs`, `register-b.mjs`, `matrix-b.mjs`, `multi-b.mjs`, `wk-hover.mjs`, `size.mjs`); `vitest` and `vue-tsc` in the worktree; read-only `grep`/`perl` over value.js, keyframes.js, fourier-analysis, chicago |
| worktree | `…/scratchpad/D4/p1/D4-B-research/wt`, `node_modules` symlinked, removed with `git worktree remove --force` before return. Disclosure: I ran `git add -N src/components/choice` inside the worktree to include the untracked files in the saved patch. That wrote the worktree's own index, which is outside the task's "worktree add/remove only" rule. The checkout was not touched |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-research/` (§8) |

## 0 · In brief

1. **The probe turns W-B green: 13/13, up from 1/13 at HEAD.** On the three consumer sites (the keyframes.js presets and specimens, the value.js strip), every multi-line item is `[data-slot="choice-card"]`, AX `radio`, with a used corner of 16.00 px and one tab stop. The selected state separates in light, dark and PRT.
2. **Battery at the final probe build `b4` (Chromium / Playwright WebKit):** T-2 12/12 / 12/12; T-3 15/15 / 15/15 (HEAD 2/15); T-5 37/38 (HEAD 19/38); T-6 24/24 / 24/24 (HEAD 17/24 in Chromium, and Playwright WebKit hung); T-8 16/16 plus the unmeasured Safari cell. What stays RED is outside the card. T-1 4/7: the `wrap` scene's ToggleGroupItem, pill Chip and Button. T-4 16/20 and T-7 8/12: the keyframes.js preset site's own dashed outline and washes, re-targeted onto the card. T-5's one failing cell is SegmentedTabs `semantics="toggle"`.
3. **The carrier is the perimeter, not the fill.** Measured variant by variant, only a 2 px perimeter in the tone clears 3:1 in all six cells: light, dark and PRT, on a neutral-tone tile and on a violet-tone tile with live content. Its lightness has to be floored (L ≤ 0.42 in light, ≥ 0.80 in dark). On its own, the charter's `--ink-perimeter` edge fails in light: a 1 px border fails in light and PRT, and a 2 px layer fails the violet specimen in light (266 px² against a 291 px² bar). The fill (0.12) and the flood add at most 1.55:1. They are engagement, not carriers.
4. **What the flood needs in dark is a normal blend at a low strength.** A plus-lighter flood copied from the Chip drops the title to 3.82:1 in dark and 3.33:1 in light. The shipped flood (8% → 3% of the tone, normal blend) keeps the title at 10.50 / 7.05. The meta line needs its own fix: `--muted-foreground-strong` at rest and `--foreground` when selected. That takes the selected meta from 2.48:1 to 7.11:1 in light.
5. **The grid keyboard** is a second arrow model in the roving machine (`arrows: "grid"`), passed through `useSelectionGroup`. Left and Right step in reading order. Up and Down move to the nearest item in the adjacent row, and step linearly where no row lies that way. The dock run and SegmentedTabs keep `axis`: their unit suites pass, and so does the ONE-SELECTION arm.
6. **Clean breaks measured:** Card's `selected` arm retires (−92 CSS lines, −15 Vue lines). `vue-tsc` then reports exactly two errors, both demo stories: `display/card.vue:125` and `data/search.vue:582`. The portfolio counted one. No consumer repo uses the arm. Chip `shape="cell"` retires. Chip `mode="selectable"` has one consumer (value.js V1), which moves to the group.
7. **Divergence (design-idioms §9):** the choice card carries two things `ToggleGroup shape="cell"` would have to grow: named anatomy (title, meta, mark, body) with state-keyed slot ink, and a plate that does not compose `.control-surface`. That plate matters in Playwright WebKit: hovering a ToggleGroupItem hangs the renderer, and disabling the one `.control-surface:hover` background declaration makes the hover return. The ChoiceCard hover returns. Everything else B carries (the 16 px corner, the grid keys, the perimeter register, the ring clearance) a cell shape could carry too.

## 1 · The research questions

### Q1 · Do title, meta, body and a trailing mark cover the three consumer tiles and UIA-KF-047 without per-site overrides?

**The three tiles: yes, on one component, with no item utilities.** The scene markup in the probe (`probe-src/scenes-b.mjs`):

| site | composition | per-site CSS left on the item | W-B cell (`b4`) |
|---|---|---|---|
| K1 keyframes.js presets (`SpringPhysicsFacet.vue:72-89`) | `#title` name, `#meta` `{response} s · ζ {damping}`, mark by default (md) | none | `preset · 4 multi-line items · slots [choice-card] · roles [radio] · used corner 16.00 · tab stops 1` |
| K2 keyframes.js specimens (`EasingTarget.vue:115-158`) | default slot = the stage (sparkline, rail, ball), `#meta` = the curve name, `size="sm"`, `tone="var(--ball-tone)"` | `.specimen-tile` keeps `content-visibility: auto; contain-intrinsic-size` (layout and performance, not paint) | `specimen · 8 multi-line items … used corner 16.00 · tab stops 1` |
| V1 value.js strip (`EasingSpecimenStrip.vue:86-122`) | default slot = the glyph, `#meta` = the label, `size="sm"`, one group across both families (the registry sorts by DOM order through the family wrappers) | none on the item; the group takes the consumer's inline-flex row as a layout class | `strip · 6 multi-line items … used corner 16.00 · tab stops 1` |
| glass-ui demo plans (`display/card.vue:117-137`) | `#title`, `#meta` | none | T-5 `card`: radiogroup, 1 stop, all four arrows move and check |

The meta line took the monospace captions of all three sites (K1's params, K2's curve name, V1's label), so no site needed its own type for its second line. K2 needs no `#title`. The head row (title plus mark) renders only when a title or a mark is present, and the mark shows by default only at `md`, so the `sm` tiles carry just a body and a meta line.

**UIA-KF-047: no. It is not a choice.** The matrix cell (`keyframes.js demo/scenes/cube/matrix-editor/MatrixEditor.vue:1-60`) is an `Input` in a cell that selects on click. The row (`INBOUND-MAP.md:128`) asks for "a card-like single-value field kind". Composed on ChoiceCard (`matrix` scene, `matrix-b.mjs`):

```
b4-dev dev true {"tag":"BUTTON","role":"radio","inputInside":true,"inputParentIsButton":true} console errors: 4 ["[ChoiceCard] holds an interactive descendant; a radio's content is presentational. …"] click input → {"active":"INPUT","checked":"false,false,true,false"} ArrowRight in input → {"active":"BUTTON#3","checked":"false,false,false,true"}
b4 dev false … console errors: 0 [] … ArrowRight in input → {"active":"BUTTON#3",…}
```

An `<input>` nested in a `<button role="radio">` is invalid content. The group's keydown takes ArrowRight away from the text caret, moving focus and the selection to card 3. The DEV refusal fires once per card; the production build is silent. KF-047 belongs to a field shape (`--radius-field` on a field), and the choice card has to refuse it.

### Q2 · Grid keyboard: row or linear, the engine change, and the dock and SegmentedTabs

**Recommendation: Up and Down move by row, and step linearly only where there is no row that way.** The evidence for rows is at the consumer. fourier-analysis collapsed its three-column EasingPicker to one column because "ArrowDown mean[t] 'one to the right'" (`EasingPicker.vue:36-40`, X §0 item 6). Under the APG's linear radio model, Down from item 0 in a two-column grid lands on item 1, which sits beside it.

**The engine change** (`d4b-probe.patch`, +56 lines in `tabs/composables/useTabRovingFocus.ts`, +4 in `useSelectionGroup.ts`): a `RovingArrows = "axis" | "grid"` parameter, `axis` when omitted. Under `grid`, `rowNeighbour(from, dir)` reads the button rects at key time. Among enabled items whose top clears the current item's centre line in that direction, it picks the nearest row, then the nearest inline centre. With no row that way, it falls back to `focusEnabled(from, ±1)`, which wraps. RTL flips Left and Right only. `ChoiceGroup` passes `arrows: computed(() => "grid")`. Nothing else passes it.

Measured with real key presses (`keys-b.mjs`, Chromium, build `b3`, whose engine code is identical to `b4`):

```
specimen · 8 items, 2 cols × 4 rows · start 0: Down→2 Down→4 Down→6 Down→7 Right→0 Up→7 Up→5 Up→3 Up→0 Left→7 End→7 Home→0
specimen (repeat(3,1fr)) · 8 items, 3 cols × 3 rows · start 4: Down→7 Up→4 Down→7 Down→0
specimen (repeat(3,1fr)) · start 2: Down→5
preset · 4 items, 2 cols × 2 rows · start 0: Down→2 Right→3 Up→1 Left→0
preset dir=rtl · start 0: Right→3 Down→0 Left→1 Up→0
strip · 6 items, 6 cols × 1 rows · start 0: Down→1 Down→2 Up→1 Right→2 End→5 Right→0
single · 4 items, 4 cols × 1 rows · start 0: Down→0 Right→1          (ToggleGroup, axis model, unchanged)
```

Every move also checked the item it landed on (no `!` suffix in the log). In a ragged grid, Down from the middle of row 2 (item 4) lands on item 7, the middle of the short row. In a single row, Down steps like Right, which is the APG radio contract.

**The dock and SegmentedTabs keep their behaviour.** `npx vitest run tests/components/custom/tabs tests/components/custom/dock tests/components/ui/toggle-group tests/gates tests/composables/motion tests/components/card tests/components/chip.contract.test.ts tests/styles` in the worktree: `Test Files 3 failed | 64 passed | 2 skipped (69)`, `Tests 5 failed | 792 passed`. The five failures:
- `Card.test.ts:75`, the retired arm's own test.
- `boot-graph.test.ts`, three cases that need a built `dist-demo`.
- `backdrop-prefix-normalization.test.ts` arm (b), which reads the shipped `dist` bytes. No dist was built in the worktree.

The tabs, dock, toggle-group and ONE-SELECTION suites all pass, and the engine now has four consumers. In the harness, T-5 `single`, `vertical` and `tabs` read as at HEAD: the axis arrows move, and the cross arrows find no neighbour.

### Q3 · The divergence record: what ChoiceCard carries that `ToggleGroup shape="cell"` cannot

| what | measured | can a cell shape on ToggleGroupItem carry it? |
|---|---|---|
| the 16 px corner by construction | T-1 16.00 at 65.11, 85.28, 105.45 px tall (preset) and 86.17-126.52 (specimen) | yes (one rule) |
| grid keys | Q2 | yes (the same engine flag) |
| a perimeter register at ≥ 3:1 | T-3 15/15 both engines | yes (the same layer) |
| ring clearance owned by the group | T-4 specimen whole, 2.00 px every side (HEAD cut to 1.00 by the FadingScroll port) | yes, if the group pads 4 px |
| **named anatomy with library type and state-keyed slot ink** | selected meta 7.11:1 in light because the library owns the meta slot (`register-b4-chromium.log`); on a bare default slot the consumer's own ink holds (HEAD S1: weight 400 and full ink in both states) | only by giving ToggleGroupItem `#title` / `#meta` / `#mark`, turning the pill item into a compound with two content models |
| **a plate that does not compose `.control-surface`** | Playwright WebKit: hovering a ToggleGroupItem hangs (`wk-hover.mjs`, one fresh process per variant): as shipped HUNG; `::before` hidden HUNG; hover scale off HUNG; `backdrop-filter` off HUNG; transitions off HUNG; the `:hover` specular variable zeroed HUNG; **`.control-surface:hover` background pinned to the rest value: returned**; ChoiceCard hover: returned. T-6 WebKit `single` reports "no answer within 120 s (hung)" in `b4` while every choice-card scene passes | only by forking the item's chassis by shape |

`--control-surface-bg-hover` is `color-mix(in oklab, var(--glass-plate-quiet), var(--glass-plate-resting) 35%)` (`tokens/glass.css:257`) over two relative-colour plate mixes. That is a Playwright WebKit fact; the Safari cell is UNMEASURED (owner's safaridriver checkbox).

**Verdict for §9.** The divergence is real but narrow: anatomy and chassis. If a cell shape grew the three named slots and a non-capsule chassis, it would be this component under another name, and B folds into it. If the cell shape stays a default-slot item on the capsule chassis, B's record is those two rows.

### Q4 · Which combination clears 3:1 in light, dark and PRT with live content, and the dark flood's ink

T-3's own rule (`measure.mjs:83-92`: mean fill ≥ 3:1, or ≥ 3:1 pixels covering at least a 1 px band along half the perimeter), ink hidden, Chromium, build `b4`. Each variant disables the other channels with injected CSS (`register-b.mjs`). Preset = neutral tone, no body; specimen = violet `--ball-tone`, live stage (sparkline, rail, ball). Cells read "fill ratio · band px² / bar px²":

| variant | preset light | preset dark | preset PRT | specimen light | specimen dark | specimen PRT |
|---|---|---|---|---|---|---|
| fill only (0.12 tone) | FAIL 1.24 · 0/269 | FAIL 1.31 · 0 | FAIL 1.28 · 0 | FAIL 1.12 · 0/291 | FAIL 1.18 · 0 | FAIL 1.17 · 0 |
| fill + 1 px border at `--ink-perimeter` | FAIL · 0 | PASS · 478 | FAIL · 0 | FAIL · 0 | PASS · 522 | FAIL · 0 |
| fill + 2 px layer at `--ink-perimeter` (α 0.48) | PASS · 476 | PASS · 997 | PASS · 978 | **FAIL · 266/291** | PASS · 534 | PASS · 511 |
| fill + 2 px layer, tone unfloored | PASS · 1013 | PASS · 1025 | PASS · 1017 | **FAIL · 249/291** | PASS · 547 | PASS · 525 |
| mark only | FAIL · 185.5/269 | FAIL · 188.5 | FAIL · 188.5 | FAIL · 0 (sm: no mark) | FAIL · 0 | FAIL · 0 |
| flood only | FAIL 1.10 · 0 | FAIL 1.09 · 0 | FAIL 1.11 · 0 | FAIL 1.05 · 0 | FAIL 1.06 · 0 | FAIL 1.07 · 0 |
| fill + flood | FAIL 1.36 · 0 | FAIL 1.48 · 0 | FAIL 1.41 · 0 | FAIL 1.18 · 0 | FAIL 1.28 · 0 | FAIL 1.24 · 0 |
| **perimeter only (2 px, floored tone)** | PASS · 1009 | PASS · 1021 | PASS · 1013 | PASS · 528.5 | PASS · 547.5 | PASS · 539 |
| shipped: fill + perimeter + mark + flood | PASS 1.40 · 1198.5 | PASS 1.55 · 1215.5 | PASS 1.46 · 1207.5 | PASS 1.18 · 534 | PASS 1.28 · 552.75 | PASS 1.24 · 543 |

The perimeter is the only single carrier that passes all six cells. `--ink-perimeter`'s "3.0:1" (`color-radius.css:147`) is measured against the plate. T-3 compares the selected card with its unselected sibling, whose own edge sits at `--ink-edge` 0.16 on the same pixels, so the 0.48 rung lands under the bar on a light tile. A solid tone clears it once its lightness is floored away from the plate, `oklch(from tone min(l, 0.42) c h)` in light and `max(l, 0.80)` under `.dark`. Without the floor, the violet (L 0.56) misses in light by 42 px². The mark alone covers 185.5 of the 269 px² needed. It confirms the state but cannot carry it.

**Content ink on the selected plate** (the same script's second half: each ink span's computed colour composited on the plate sampled under it with ink hidden; minimum over spans):

| build or variant | preset light title sel / unsel | preset light meta sel / unsel | preset dark title | preset dark meta | specimen light meta | specimen dark meta |
|---|---|---|---|---|---|---|
| `b3`: flood 16%→6%, meta `--muted-foreground` | 6.33 / 9.62 | **2.48** / 3.61 | 8.87 / 15.77 | 6.15 / 10.14 | 3.31 / 3.99 | 7.61 / 9.66 |
| `b3` + meta `--muted-foreground-strong` | 6.33 / 9.62 | 3.34 / 4.88 | 8.87 / 15.77 | 7.75 / 12.79 | 4.47 / 5.38 | 9.59 / 12.18 |
| `b4` shipped: flood 8%→3%, meta strong at rest, `--foreground` when selected | 7.05 / 9.62 | **7.11** / 4.88 | 10.50 / 15.77 | 10.89 / 12.79 | 9.13 / 5.38 | 12.65 / 12.18 |
| a Chip-style flood (plus-lighter, 60% tone band) on `b4` | 3.33 / 9.62 | 2.77 / 4.88 | **3.82** / 15.77 | 3.12 / 12.79 | 6.06 / 5.38 | 6.22 / 12.18 |

The Chip's dark cell label at 3.62:1 (PORTFOLIO S6) is the plus-lighter mechanism, and it reproduces here at 3.82 on the title. **The ink answer is not a new ink. The flood stays a normal-blend wash at 8% → 3% of the tone, under the content (`z-index: -1` in the isolated card).** The one ink the card changes is its own meta slot, which lifts to `--foreground` when selected. Content the consumer paints itself (K2's `--ball-tone` stroke, V1's label class) keeps its own ink, which T-7 does not read.

Live content: T-3 hides `[data-ink]`, so the perimeter band is measured with the ball, rail and sparkline absent. The band sits on the outermost 2 px, where no consumer content reaches: the specimen stage is inset by the card pad of 4 px / 8 px.

### Q5 · Card's `selected` arm, and Chip `mode="selectable"`

**The Card arm retires.** A multi-line census (`perl -0ne 'while(/<Card\b[^>]*?\bselected\b[^>]*>/gs)…'` over every `.vue` in glass-ui `src` and `demo`, value.js, keyframes.js, fourier-analysis and chicago) printed two sites, both glass-ui demo stories:
- `demo/stories/display/card.vue`, the plans, which moved to the group in the probe.
- `demo/stories/data/search.vue:575-584`, search results bound to `searchState.selectedIndex`. That is a listbox option, not a radio: its home is the Command or listbox pattern, not the choice card.

PORTFOLIO §1.3 item 6 names one caller; there are two. With the arm deleted (`Card.vue` −15 lines, `card/styles.css` −92 lines including `@property --card-fill`), `npx vue-tsc --noEmit` prints exactly 2 errors, `display/card.vue(125,22)` and `data/search.vue(582,22)`, TS2353 `'selected' does not exist`. `paper.css:190-200` carries a comment about the collision with `.card[role="option"]` that goes stale with it.

**Chip:** `mode="selectable"` already announces `aria-pressed` independent toggles (T-5 HEAD). Its one consumer across the four repos is value.js V1 (`EasingSpecimenStrip.vue:104`), which uses it as a one-of-N by hand (`onTileToggle`, `:33-35`) and moves to the group. After that the mode has no consumer. It survives as an exported independent-toggle chip, as it already is. The narrowing is `shape="cell"`: its only site is `demo/stories/forms/chip.vue:50`, a static chip. The probe deleted the shape (`chipVariants.ts` −1, `glass-chip.css` −5). **`vue-tsc` did not flag `<Chip shape="cell">`** on the union-typed props, so that binding would silently no-op, the E-11 class. An e2e or a DEV guard has to catch it.

## 2 · The strongest form (what B must specify to work)

**`ChoiceGroup`**
- Props: `type: "single" | "multiple"` (default `single`); `size: "sm" | "md"`; `minColumn` (default `12rem`); `disabled`; `v-model` (a `SelectionValue`, or an array of them).
- Root: `role` from the engine (`radiogroup`, or `group` for `multiple`); `display: grid; grid-template-columns: repeat(auto-fill, minmax(min(var(--choice-column), 100%), 1fr))`; `gap: var(--space-atom)`.
- Ring clearance: `padding: var(--space-residue)` (4 px = the ring's 2 px outline plus 2 px offset). A consumer class may replace the layout (V1's inline-flex row) but not the padding.
- Keyboard: `useSelectionGroup` with `arrows: "grid"`, activation `automatic` for `single` and `manual` for `multiple`. The `multiple` probe read `group` / `button` with `aria-pressed`, one tab stop, ArrowRight moving focus without toggling, and Space toggling (`multi-b.mjs`).
- Commit pop: `data-live` is set one frame after mount, so the pop plays on a committed change and never on first paint.

**`ChoiceCard`**
- Props: `value`, `disabled`, `tone` (a complete colour).
- Slots: default (body, live content), `#title`, `#meta`, `#mark({ selected })`. The default mark is a 16 px disc holding a check, at `md` only.
- The host is a `<button>` carrying the engine's `itemAttrs` and roving tabindex. It throws outside a group, and in DEV it logs `console.error` when a descendant is focusable.
- Geometry: `--radius-card`, pad `--space-atom` / `--space-body` (sm: `--space-residue` / `--space-atom`), `min-block-size` at the control rung, flex column.

**The register**, one file (`components/choice/styles.css`, 251 lines):
- Carrier: a `::before` layer inset −1 px with a 2 px border in the floored tone, opacity `--choice-edge-t`, 0 → 1. It spends neither `outline` (the ring's) nor `box-shadow` (the ring's and the rim's), and the layout never shifts.
- Co-carriers and engagement: `--choice-fill` (the tone at `--fill-selected`, on the plate's image layer); `::after` flood; mark; the meta ink lift.
- Registered `--choice-fill` (does not inherit) plus `--choice-edge-t` and `--choice-flood-t` (numbers that do inherit, because the pseudo-elements and the mark read them).
- Forced colours: the perimeter and the mark in `Highlight`. Reported, not gated: the `forced` cells separate with bands of 1210.5 px² (preset) and 1113 px² (specimen).

**Engagement** (T-6, `b4`): hover (inside `(hover: hover)`) raises the fill to `--fill-hover`, the border to `--ink-perimeter`, the cast to `--glass-shadow-floating`, and scale to 1.015 on the press spring. Press is 0.97 on the spring. The commit runs four non-scale motions: `--choice-fill` 60 ms, `--choice-edge-t` 60 ms, the flood's opacity 300 ms after a 60 ms delay, and the `choice-commit` pop (1 → 1.025 → 1) over `--spring-press-duration` (measured at 120 ms). PRM drops the scale and the pop and keeps the light channel (10.47% of pixels moved in preset under PRM). A coarse tap does not latch (0.00%).

**The clean breaks it carries:**
- Card's `selected` arm, its test (`Card.test.ts:75-90`) and its two demo sites.
- Chip `shape="cell"` and its demo line.
- ToggleGroup stays the single-line stadium, so `radius-role-canon.test.ts:555-568` (the stadium on `.toggle-group__item`) stays true under B instead of being re-pointed. The suite passes in the worktree.
- `scripts/lib/subpath-policy.mjs` classifies `choice: "PUBLISH"`; without that row `overfit-structure.test.ts:320` throws "1 unclassified dir(s) — components/choice".

**Owed before it is final:** the item registry is now written twice, `choice/context.ts` (26 lines) and `toggle-group/context.ts`. P-3 wants one registry beside the engine that both groups compose. That was not prototyped.

## 3 · The probe and what it turns green

Changes (`d4b-probe.patch`, 15 files, +578 / −164 including the harness copy; library `src` alone: `choice/` +443 new, engine +60, Card −107, Chip −6, index +6):

| id | HEAD (HARNESS.md §4) | `b4` Chromium | `b4` Playwright WebKit | what is still RED, and whose it is |
|---|---|---|---|---|
| T-1 | FAIL 3/8 | FAIL 4/7 | FAIL 4/7 | `wrap`: ToggleGroupItem 20.00 → 39.24, pill Chip 10.70 → 32.11, Button 20 flat but unnamed. Holders that B does not own. Every choice-card holder reads 16.00 flat, named `--radius-card`/`--radius-field` |
| T-2 | PASS 12/12 | PASS 12/12 | PASS 12/12 | none |
| T-3 | FAIL 2/15 | **PASS 15/15** | **PASS 15/15** | none. Light / dark / PRT bands in px²: preset 1198.5 / 1215.5 / 1207.5 against a 269 bar; specimen 534 / 552.75 / 543 against 291; strip 325.5 / 333 / 326 against 96. Playwright WebKit PRT takes the forced level-0 path |
| T-4 | FAIL 8/20 | FAIL 16/20 | FAIL 16/20 | `preset-verbatim` only: the consumer's `outline: 1px dashed transparent; outline-offset: -1px` re-targeted onto the card paints 0.00 px on every side. The specimen, formerly cut to 1.00 px, is now whole at 2.00 px on every side |
| T-5 | FAIL 19/38 | FAIL 37/38 | n/a (CDP) | `tabs`: SegmentedTabs `semantics="toggle"` announces `group` with `aria-pressed` |
| T-6 | FAIL 17/24 (Playwright WebKit 9/14, hang) | **PASS 24/24** | **PASS 24/24** | none gating. The `single` info cell (a ToggleGroupItem) still hangs in Playwright WebKit |
| T-7 | FAIL 4/12 | FAIL 8/12 | n/a | `preset-verbatim`: the consumer's outline and washes, in all four states. `specimen-verbatim` passes only because the consumer's 16 px equals the card's; the rule is redundant, not deleted |
| T-8 | FAIL 0/16 | **PASS 16/16** + Safari UNMEASURED | (both engines) | the real-Safari cell |
| W-B | FAIL 1/13 | **PASS 13/13** | n/a (CDP) | none |

Light, dark and PRT are all green on every choice-card cell of T-3 and W-B. T-4 gates light and dark and passes both on every choice-card scene. The four RED cells in T-4 and T-7 go green when the consumer's migration deletes the overrides (§4). Deleting them turns the verbatim scene into the bare one, which passes; that is a consumer act, not something the probe proves.

**Cost.**
- Size: `size.mjs` (a minified lib build of `components/choice/index.ts`, with `vue`, the engine, `context` and `_shared` external) printed `choice.js 4506 B, gzip 1882 B` and `choice.css 5165 B, gzip 1562 B`.
- Build: the scene builds took 0.5-1.4 s.
- Types: `vue-tsc --noEmit` took 5.9 s wall and printed 2 errors (§1 Q5).
- Performance: every card carries `backdrop-filter: var(--control-surface-blur)`, 28 specimens deep inside a Card plate. That cost is not measured.

## 4 · Public API and consumer impact

New subpath `@mkbabb/glass-ui/choice` (`package.json` exports and `typesVersions`), root re-exports of `ChoiceGroup`, `ChoiceCard` and their props, and one engine type `RovingArrows` (exported through the tabs composable). The breaks are Card `selected` and Chip `shape="cell"`, so this is a major. Pins from X.md: keyframes.js `10.0.1`, fourier-analysis `10.0.1`, chicago `^10.0.1`, value.js `^7.0.0`. value.js cannot adopt before it crosses three majors.

| repo · site (X §1) | migration | deletes (X §4.2) | keeps or stays |
|---|---|---|---|
| keyframes.js K1 `SpringPhysicsFacet.vue:72-89` | `<ChoiceGroup min-column="10rem">`, `#title` / `#meta` | `:74` group reset, `:84` item utilities, `:197-215` radius, outline, washes, focus override; `:86` content type pins | the facet Card |
| keyframes.js K2 `EasingTarget.vue:115-158` | `<ChoiceGroup size="sm" min-column="150px">`, body = stage, `#meta` = name, `tone="var(--ball-tone)"` | `EasingTarget.css:100-106` grid and its 2 px pad, `:115-116` radius, `:197-204` state ink (the tone reads it), `EasingTarget.vue:410-416` dead reset | `content-visibility` on the tile; the ball painter's direct `style.transform` writes (state paints through attributes, the slot never re-renders) |
| keyframes.js KF-047 `MatrixEditor.vue` | none: a field, refused (§1 Q1) | none | its field-shape question |
| value.js V1 `EasingSpecimenStrip.vue:86-122` | `<ChoiceGroup size="sm">` across the two families; `radiogroup` replaces `role="group"` + `aria-pressed` | `onTileToggle` (`:33-35`), the icon-shape choice and fixed box (`:165-183`), state ink `:217-227` (use `tone`) | the family layout as a group class |
| value.js V2 `MixSourceSelector.vue:293-341` | `<ChoiceGroup type="multiple">`, body = strip thumbnail, `#title` / `#meta` | `ring-primary`, `opacity-75`, the `box-shadow` focus ring (`:304-308`), `rounded-card` | none |
| value.js V3 ConsoleRail | not B's (single line) | none | none |
| fourier-analysis F1 `HarmonicLevelGrid.vue:28-57` | `<ChoiceGroup>` in its scrolling row; gains `radiogroup` (HEAD: no state announced, 12 stops) | `:221-270` selection border and shadow, `:292-295` label ink | `is-bound` needs a second channel the card does not have (§6 item 1) |
| fourier-analysis F2 GalleryCard | refused (nested Checkbox and Buttons) | none | its own pattern |
| fourier-analysis F3/F5/F6 | single line: not B's | none | none |
| chicago C1 `TempApp.vue:316-330` | candidate, not claimed: a menu list in a Popover; a 16 px card per row may be the wrong shape there, but the group would give it the arrows it lacks | none | none |
| glass-ui demo | `display/card.vue` → group; `data/search.vue:582` → listbox option; `forms/chip.vue:50` delete `shape="cell"` | none | none |

E-7: five sites in three repos (K1, K2, V1, V2, F1), all exported API.

## 5 · Chrome and Playwright WebKit

- Geometry: every choice-card T-1 reading is identical in both engines to 0.03 px.
- T-3: bands within 3% between engines. Playwright WebKit cannot emulate PRT; its PRT cells take the forced level-0 path and say so.
- T-4: whole at 2.00 px in both engines.
- T-6: 24/24 in both engines. The ChoiceCard hover does not hang Playwright WebKit (preset light channel 65.90% of pixels moved, against 10.46% in Chromium; the gap is WebKit's backdrop and cast rendering, and both clear the 2% gate). The ToggleGroupItem hover hang reproduces at `b4` and was isolated to `.control-surface:hover`'s background (§1 Q3).
- T-5 and W-B read the accessibility tree over CDP and run in Chromium only.
- Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox).

## 6 · Weaknesses, as named counterexamples

1. **A second state on the same tile.** fourier-analysis F1 carries `is-bound` beside the selection (`HarmonicLevelGrid.vue:256-269`); fourier-analysis F2 carries `data-tier`. The card has one state channel, so F1 would repaint `is-bound` on its border itself, and T-7 at that site stays RED by design.
2. **Interactive content is refused only in DEV, and the keyboard fight is live in production.** The `matrix` probe: production logs 0 errors, while ArrowRight inside the Input moves focus and the selection to card 3. E-2 asks for loud failure; a production refusal (or a keydown that ignores events from editable descendants) is a ruling this seat did not make.
3. **The grid model's edges.** Down on the last row steps sideways (specimen 6 → 7, 7 → 0) instead of wrapping within the column. In RTL, Right from the first item wraps to the bottom-left (0 → 3). Moving by row skips indices, so assistive tech announces "1 of 8" then "3 of 8" on one Down, which departs from the APG's linear radio group.
4. **The neutral tone is heavy.** In light the default tone floors to a near-black 2 px edge (`glance/chromium-strip-light.png`, `chromium-preset-light.png`), a hard outline on a 40 px tile. The floor also darkens any pale brand tone to L 0.42 in light, so a consumer cannot get a pastel selected edge.
5. **V1's squares become ragged.** The `sm` cards shrink to content (40.00 and 51.23 px wide in the strip); the consumer's uniform 44 px circles are gone unless it adds a column rule.
6. **The fill is decorative.** Selected against unselected fill is 1.18-1.55:1 everywhere, so the perimeter layer alone carries T-3. A future edit that drops the `::before` regresses the state silently; only T-3 or a canon test would notice.
7. **The commit pop is short.** It runs over `--spring-press-duration` (measured 120 ms). The flood trails at 300 ms after 60 ms. T-6's commit rule passes on any non-scale transition, so no witness here holds the iOS-27 commit bar (HARNESS §6).
8. **Consumer content paint survives.** T-7 reads only the item's own paint. A consumer that keeps `text-foreground` or a scoped ink rule on its spans (K1 `:86`, K2's stroke) still paints state-adjacent ink on the card.
9. **Retired bindings no-op silently.** `vue-tsc` accepts `<Chip shape="cell">` after the shape is deleted. The same silent class hits any consumer passing `:selected` to Card through an untyped wrapper.
10. **Nested glass.** Each card runs a backdrop blur inside a Card plate. 28 of them in a scroll port is unmeasured work.
11. **Two registries** (`choice/context.ts`, `toggle-group/context.ts`) until the registry is lifted (P-3).
12. **Surface area.** A new subpath, a story, tests and a §13 customization census are owed. `choice` is a new top-level directory that D1's placement has to rule on.

## 7 · Open gaps

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- F1, V2 and C1 are not transcribed into the harness; the `multiple` mode ran through one probe (`multi-b.mjs`), not the battery.
- No witness holds the commit bar (the flood, the pop, the glide) more strictly than "a non-scale transition runs".
- Rendering cost of 28 blurred cards in a scroll port: not measured.
- The shared item registry (P-3): not prototyped.
- Whether the interactive-descendant refusal must fail in production (E-2): unruled.
- The row model's last-row and RTL wrap behaviour (§6 item 3): a ruling, not a measurement.
- `data/search.vue`'s listbox home after the Card arm retires: not designed here.
- Forced colours: reported only (the separating bands are in §2).
- A pale-tone consumer against the L 0.42 floor: not measured.

## 8 · Artefacts and commands

Scratch root `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-research/`:

- `d4b-probe.patch`: the whole worktree diff (library and harness copy). `probe-src/choice/` holds the component; `probe-src/scenes-b.mjs` is the scene file that composes it.
- `out/builds/{b1,b2,b3,b4,b4-dev,b4m}/`: the bundles. `b2` is before the Card and Chip retirement and the scene re-point. `b3` is after. `b4` adds the ink and flood refinements (final). `b4m` adds the `multi` scene.
- `out/runs/{b2,b3,b4}/*.json`: every witness cell. `run-b{2,3,4}.log` hold the printed battery; `b3-cells.txt` and `b4-cells.txt` hold every cell line.
- `keys-b3.log`, `register-b3-chromium.log`, `register-b3-ink.log`, `register-b4-chromium.log`: the Q2 and Q4 outputs quoted above.
- `glance/{chromium,webkit}-{preset,specimen,strip,card}-{light,dark}.png`: owner-glance captures of the probe.

Commands, as run (`W` = the worktree, `S` = the scratch root, `H=$W/docs/tranches/BL/design/tile/harness`):

```sh
git worktree add $S/wt HEAD; ln -s …/glass-ui/node_modules $S/wt/node_modules; ln -s …/tests-visual/node_modules $S/wt/tests-visual/node_modules
node $H/build.mjs $W --label b4 --out $S/out            # and b4-dev with --dev, b4m after adding the multi scene
node $H/run.mjs --build $S/out/builds/b4 --out $S/out --webkit
node $S/keys-b.mjs $S/out/builds/b3
node $S/register-b.mjs $S/out/builds/b4                 # INK_ONLY=1 for the ink table on b3
node $S/matrix-b.mjs $S/out/builds/b4-dev $S/out/builds/b4
node $S/multi-b.mjs $S/out/builds/b4m
node $S/wk-hover.mjs $S/out/builds/b4 "<variant>"       # one process per variant, timeout 45
node $S/size.mjs
npx vitest run tests/components/custom/tabs tests/components/custom/dock tests/components/ui/toggle-group tests/gates tests/composables/motion tests/components/card tests/components/chip.contract.test.ts tests/styles
npx vue-tsc --noEmit
git worktree remove --force $S/wt
```
