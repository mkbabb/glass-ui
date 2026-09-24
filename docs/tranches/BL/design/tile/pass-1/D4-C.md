# D4 · pass 1 · D4-C · selection as a behaviour (research)

| field | value |
|---|---|
| seat | D4 pass 1, research seat for family D4-C. It answers the five questions in PORTFOLIO §6, builds the family in a worktree against the real source, and runs the battery on it |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | The task named `91dbcbd8`. The worktree seeded at `504ff421`, and the checkout read `4b589018` at close. `git diff --stat 91dbcbd8 504ff421 -- src vite.targets.ts package.json` is empty, so the probe starts from the portfolio's `src/` |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless, DSF 2. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| worktree | `…/scratchpad/D4/p1/D4-C-research/wt`, node_modules symlinked, built only there (vite cache and dist in scratch), removed with `git worktree remove --force` before return. The full probe diff is kept at `…/D4-C-research/d4c-probe.diff` (22 files, +460 −388) |
| instruments | The battery (`docs/tranches/BL/design/tile/harness/`), run from the worktree's copy. The worktree's `scenes.mjs` adds a family arm: when `src/components/selection/` exists, the preset, specimen, strip, card and chipcell scenes render as `SelectionGroup` compositions, and a `surface` scene joins the card board under W-C. A separate probe page (`…/D4-C-research/probe/`) runs the question scripts `q1.mjs`, `q1c.mjs`, `q2.mjs`, `q3.mjs`, `q5.mjs`, `plates.mjs` and `shots.mjs`. Logs are in `…/D4-C-research/logs/` and captures in `…/D4-C-research/cap/` |
| load | Load average 18.4 / 21.8 / 20.9 at the start and 12.4 / 13.7 / 16.2 mid-run. Every number is a settled static read or a real input event; none is a wall-clock timing |

## 0 · In brief

1. **All three delivery forms lose attributes silently at HEAD, and none of them is safe without a readback.** The scoped slot and `asChild` both lose `role` and `tabindex` on a Card, because `Card.vue` binds `role`, `tabindex` and `aria-selected` after `v-bind="$attrs"` and an `undefined` there wins (UIA-F-43). On a Chip they lose `role`, `tabindex`, `data-state` and the click handler, because Chip's `staticAttrs` filter strips them on purpose. Both forms land 9/9 once Card's bindings are deleted and Chip admits the stamp. The directive lands 9/9 even at HEAD, because it writes the DOM after Vue has rendered. That also means it defeats Chip's deliberate refusal, and it silently overwrites a consumer's own `data-state`. The answer is the scoped slot as the primitive, `asChild` as sugar over it, and a DEV readback guard that names every stamp key that did not land. The guard caught all 60 lost-key events on HEAD Card and Chip (§1.1).
2. **A Surface already has a corner: `--radius-ctx`, a relay, not a role.** The ladder rungs declare `border-radius: var(--radius-ctx)` (`glass/ladder.css:64`), so a plain Surface paints 16 at the root, 12 inside a panel context and 24 inside a dock-card context. A stamped item publishes `--radius-ctx: var(--radius-field)` on itself, and it then paints 16 in all three hosts, in both engines (§1.2). DESIGN.md:523 describes the `glass-plate` utility, not the tier classes Surface emits.
3. **An option that holds a Button or a link is broken in production.** The inner button is its own tab stop (`item:a → button → link → after`). One click on it both selects the option and runs its own handler, and ArrowRight from it moves the selection. Chromium still exposes `button:"Like"` and `link:"open"` inside `radio:"b Like open"`. A DEV guard throws on mount with a message that names the element. The family's content model is a documented refusal, enforced by that DEV guard (§1.3).
4. **One register cannot paint every plate. It needs one arm per plate recipe, and there are five.** Writing `background-image` from the register erased `.control-surface`'s two image layers (the plate and the floor). Written at zero specificity, it lost to the veil plate and to the opaque decoration, both of which use the `background:` shorthand. The Chip has no border, so it had no edge channel at all. The working form: the state fill is a registered `--selection-fill` (`inherits: false`, in `tokens/property-regs.css`), and each plate recipe lists `linear-gradient(var(--selection-fill), …)` in its own image list. That is five one-line arms: `glass-plate` (veil.css), `.glass-defined`/`.control-surface` (defined.css plus its hover shorthand), `.glass-chip`, and `[data-surface="opaque"]`. The edge rides `border-color` and needs the full tone: `--ink-perimeter` (0.48) separated 0 px² at ≥ 3:1 from the unselected sibling in light (§1.4).
5. **A Card inside a Card reads as a sub-card. A bare option reads as an option.** Card items inside the quiet host Card paint a second veil, 1.32–1.38:1 against the host's pad in light. A bare element item has no plate at rest (1.00:1) and a seam edge (1.16:1), with the fill and edge arriving only on selection. In light captures the bare grid reads as one card holding four options, and the Card grid reads as four cards in a card (§1.5).
6. **With the register and its arms in place, the battery goes GREEN on T-2, T-3, T-5, T-6, T-8 and W-C.** T-1, T-4 and T-7 are left RED, each by a named cause outside the tile (§3). The cost is 357 new lines in `src/components/selection/`, a 33-line engine change, and nine small edits.

## 1 · The five research questions

### 1.1 Slot, directive or `asChild`

**Probe.** One page (`scene=q1`) with nine groups: {scoped slot, `asChild`, `v-selection-item`} × {Card `size="sm"`, Surface `tier="quiet"`, Chip `shape="cell"` static}, three items each. `q1.mjs` reads the stamp keys from the DOM, reads the AX role over CDP (Chromium), clicks item 1 for real, then presses a real ArrowRight. A row passes when the group is `radiogroup`, every item is `radio` with `aria-checked` and `data-state`, there is one tab stop, the click commits and the arrow moves and checks.

`node q1.mjs s1 chromium` (stage 1: the selection module added, Card and Chip as at HEAD; `logs/q1-s1-chromium.log`):

| form · container | role | tabindex | data-state | AX | click → model | ArrowRight | verdict |
|---|---|---|---|---|---|---|---|
| slot · Card | `,,` (lost) | `,,` (lost) | on,off,off | generic ×3 | b | focus nowhere, model b | FAIL |
| slot · Surface | radio ×3 | 0,−1,−1 | on,off,off | radio=true/false | b | → #2, c | PASS |
| slot · Chip | lost | lost | lost | generic ×3 | **a** (click filtered) | focus nowhere | FAIL |
| asChild · Card | lost | lost | on,off,off | generic ×3 | b | nowhere | FAIL |
| asChild · Surface | radio ×3 | 0,−1,−1 | on,off,off | radio | b | → #2, c | PASS |
| asChild · Chip | lost | lost | lost | generic ×3 | a | nowhere | FAIL |
| directive · Card | radio ×3 | 0,−1,−1 | on,off,off | radio | b | → #2, c | PASS |
| directive · Surface | radio ×3 | 0,−1,−1 | on,off,off | radio | b | → #2, c | PASS |
| directive · Chip | radio ×3 | 0,−1,−1 | on,off,off | radio | b | → #2, c | PASS |

Playwright WebKit gives the same nine verdicts (`logs/q1-s1-webkit.log`). Console: 0 errors and 0 warnings. Every loss is silent.

Why each form fails:
- **Card** binds `:role`, `:tabindex` and `:aria-selected` after `v-bind="$attrs"` (`Card.vue:66-68` at HEAD). Vue's `mergeProps` lets a later `undefined` overwrite an earlier value, so whatever the stamp brought in is replaced by nothing. `aria-checked` and `data-state` survive only because Card does not bind them. The result is an element with `aria-checked` and no role, and no tab stop.
- **Chip** (static mode) filters `role`, `tabindex`, `data-state` and every `on*` key (`Chip.vue` `staticAttrs`). This is a deliberate refusal: a static chip is not a control.
- **The directive** calls `setAttribute` after mount, in a `watchEffect`, outside Vue's props. It "passes" on HEAD Card only because Card's `undefined` binding never changes and so is never re-patched. It passes on Chip by getting around the refusal, not by satisfying it.

**Two writers, one key** (`node q1c.mjs s2`, `logs/q1c.log`): the consumer binds its own `:data-state="picked|idle"` on the item's element.

| form | data-state after mount → click #1 → click #2 | what wins |
|---|---|---|
| directive | `on,off,off → off,on,off → off,off,on` | the stamp: the consumer's binding is silently erased |
| slot | `picked,idle,idle → idle,picked,idle → idle,idle,picked` | the consumer: the register's `[data-state="on"]` never matches, so selection paints nothing, silently |

In `asChild`, reka's `Slot` merges `mergeProps(attrs, child.props)`, so the child's own props win. It also deletes the child's `ref` (`reka-ui/dist/Primitive/Slot.js`, `delete firstNonCommentChildren.props?.ref`), which is another silent loss.

**Stage 2** (Card's `selected` prop and its three bindings deleted, Chip's static filter admitting a stamped element; `node q1.mjs s2 chromium|webkit`): **9/9 PASS in Chromium and 9/9 in Playwright WebKit**, 0 console errors.

**The readback guard.** `SelectionItem` reads the rendered element back against the stamp it was rendered with, on `nextTick` after mount and on every `onUpdated`. It throws in DEV, naming each lost key. It runs over the HEAD Card and HEAD Chip (`node build-probe.mjs g1-dev --dev`, then `node q1.mjs g1-dev chromium`; `logs/q1-g1dev-guard.log`):

```
24× stamp did not land on <div>: role="radio" (found null), tabindex=-1 (found null)
12× stamp did not land on <div>: role="radio" (found null), tabindex=0 (found null)
16× stamp did not land on <span>: role="radio" (found null), tabindex=-1 (found null), data-state="off" (found null)
 8× stamp did not land on <span>: role="radio" (found null), tabindex=0 (found null), data-state="on" (found null)
```

On the two-writer slot case it reports `data-state="on" (found "picked")` (`logs/q1c-dev.log`). On the cured build it is silent (`q1.mjs s2-dev`: 0 errors).

An earlier draft of the guard compared against a stamp computed after registration, not the one rendered. It raised a false `tabindex=-1 (found "0")` on correct Surfaces. The final form compares against the rendered stamp.

**Verdict.**
- **The scoped slot is the primitive** (`v-slot="{ itemProps }"`, `v-bind="itemProps"` written last). It is typed, visible to Vue and SSR, and every key is inspectable.
- **`asChild` is sugar** for a single component child. It inherits reka's two losses: child props beat the stamp, and the child's `ref` is dropped.
- **The directive is rejected.** It wins by writing behind Vue, it defeats Chip's refusal, it erases consumer bindings, and it has no SSR path.
- **None of the three is correct by construction.** The DEV readback guard plus the W-C e2e are what make a loss loud (E-11).

Two more mechanics the family must own:
- A scoped slot renders as a Fragment, so `$el` is the Fragment's empty start anchor. The item finds its element by walking `nextSibling`. The first build missed this and lost the roving focus: `slot-surface` ArrowRight left focus on #1.
- A `SelectionItem` must forward its own attributes into `itemProps` through `mergeProps` (handlers chained, stamp last). Otherwise a wrapper such as `ToggleGroupItem` drops `data-item`, `title` and `data-surface`.

### 1.2 The corner of a Surface item

`node q2.mjs s3 chromium|webkit` (`logs/q2.log`): a plain Surface and a stamped Surface, `tier="quiet"`, 150×72, in three hosts.

| host (`--radius-ctx`) | plain Surface | stamped Surface |
|---|---|---|
| root (`--radius-card`, 16) | 16 px | 16 px |
| panel (`--radius-panel`, 12) | 12 px | 16 px |
| dock card (`--radius-dock-card`, 24) | 24 px | 16 px |

Chromium and Playwright WebKit give the same numbers.

A Surface paints the relay. The stated rule is: **an option publishes `--radius-ctx: var(--radius-field)` on itself**, so any ladder plate composing it paints the field rung whatever its host publishes. In the register, `:where([data-selection-item]) { border-radius: var(--radius-ctx) }` extends the same fact to a bare element item (§1.5). The field rung is stated once. At zero specificity every role corner wins over it: `.card` 16, Chip cell 16, and the ToggleGroup pill's `--radius-pill`.

T-1 reads it as a role. Surface scene: `224×77.13 → 98.13 → 119.13`, used 16.00 flat, named `--radius-card|--radius-ctx|--radius-dialog|--radius-field` (Chromium and Playwright WebKit, run `c5`).

Side effect: descendants of an option see `--radius-ctx` = 16, so a plate nested inside an option relays from the option's corner. That is the concentric law working as written.

### 1.3 Content model: an option holding a Button or a link

`scene=q3`: three Card options; option b holds a glass `Button` ("Like") and an `<a href>` ("open"), the fourier GalleryCard shape. On the cured build (`logs/q3-s2-prod.log`, `logs/q3-s2-prod-webkit.log`, `logs/q3-s2-dev.log`):

| read | Chromium, production | Playwright WebKit, production |
|---|---|---|
| AX | `radio:"b Like open"` with children `button:"Like"`, `link:"open"` still exposed | (no AX over CDP) |
| Tab from `before` | `item:a → button → link → after`: three stops where the pattern allows one | `item:a → BODY …` (Playwright WebKit skips buttons and links on Tab by default, so this row cannot be read) |
| click on "Like" | model a → **b**, and the Like handler ran 1×: one press, two owners | the same |
| ArrowRight with focus on "Like" | model → c, focus → c (the key bubbles to the group) | the same |
| Space on "Like" | model → b, handler 2× | the same |
| DEV build | `[SelectionItem] an option cannot hold interactive content (ARIA: a radio's children are presentational). Found <button> inside the item. Split the action out of the option.`, thrown from the mounted and updated hooks | |

There is no split form. An option cannot own a second control without becoming a grid or a listbox with actions. The family states a **refusal**: a DEV guard (`guard.ts`, which matches `a[href]`, `button`, `input`, `select`, `textarea`, `summary`, `contenteditable`, a focusable `[tabindex]`, and the `button`, `link`, `checkbox` and `switch` roles) plus documentation that GalleryCard-class sets use another pattern. The guard is DEV-only, as the library's other guards are (`Button.vue:131`), so a production build ships the broken behaviour above without a sound. That is the E-2 residue named in §5.

### 1.4 One `[data-state="on"]` register across three plate recipes

`node plates.mjs <build> <scenes>` reads the computed background colour, background layers and border of item 0 (off) and item 1 (on).

**Register v1** (`[data-selection-item] { background-image: linear-gradient(var(--selection-fill) …) }` at (0,1,0); build `c1`, `logs` inline):

| plate | at HEAD | under v1 |
|---|---|---|
| Card (`glass-plate` veil) | `bg-color` veil, image = HEAD's own `--card-fill` gradient on the option arm | layer present, 1 px border: works |
| ToggleGroupItem (`.control-surface` over `.glass-defined`) | `bg-image` = two layers, the plate `color(srgb … / 0.1)` and the floor | **both layers erased**, replaced by one transparent gradient: the pill lost its material |
| Chip cell | `bg-image` = the `--glass-fill-tinted` gradient; `border 0px` | tint layer replaced (invisible untoned, a loss with `tone`); **no border, so no edge channel**. T-3 chipcell 0 px² at ≥ 3:1 |

**Register v2** (the fill default at zero specificity; build `c2`): Card and Surface read `bg-image none`. The veil plate's `background:` shorthand (`veil.css:81`) and the opaque decoration's shorthand (`surface-axis.css`) both beat `:where()`.

**Working form** (builds `c5`, `c5bare`):
- `--selection-fill` is registered once in `tokens/property-regs.css` (`<color>`, `inherits: false`, `initial-value: transparent`). If it were registered in the component sheet, a page without a `SelectionGroup` would have an unregistered `var()` in every arm's image list. That would invalidate the whole declaration and strip every control plate.
- Each plate recipe lists the state layer first in its own image list:

| arm | file | lines |
|---|---|---|
| veil plate (Card, Surface, every tier) | `styles/glass/veil.css`, `@utility glass-plate` | +2 |
| control chassis | `styles/glass/defined.css` image list, plus `control-surfaces.css` hover (its `background:` shorthand clears every image layer on hover) | +2, +2 |
| Chip | `styles/glass/glass-chip.css` | +3 −4 |
| opaque decoration | `styles/glass/surface-axis.css` `[data-surface="opaque"]` | +2 |

- The edge rides `border-color: var(--selection-tone)` at (0,2,0). A plate with no border gets a 1 px seam at zero specificity: `:where([data-selection-item]) { border: 1px solid seam }`.

Readback on `c5`: every plate carries `linear-gradient(<fill>)` as its first layer, with its own layers after it (`.control-surface`: the state layer, then the plate `/0.1` and the floor). The chip has a 1 px border.

**The edge value is not the canon's.** With `--ink-perimeter` (0.48, "the selection indicator — 3.0:1", `color-radius.css:147`), `node t3-selected-separates.mjs --build c4` gave **11/18**:
- 0.00 px² at ≥ 3:1 on preset light, card light and PRT, specimen light and PRT.
- 25.25 px² on strip light and 38.25 px² on chipcell light, below their 88 px² and 93 px² bars.

The token's 3:1 is against the plate, not against the unselected sibling's own edge. With the full tone, `border-color: var(--selection-tone)` (default `--foreground`), T-3 is 18/18 (§2).

**Verdict:** one register for the values and the edge, plus **one arm per plate recipe, five recipes**. The register cannot write the fill layer itself at any specificity without erasing a plate it outranks, or losing to a plate that outranks it.

### 1.5 Nesting: 16 px tiles in a 16 px quiet Card with a 16 px pad

`node q5.mjs s4` (`logs/q5.log`; captures `cap/q5-{quiet,wash,flush,surface,bare}-{light,dark}.png`, sheets `cap/q5-sheet-{light,dark}.png`, `cap/q5-sheet2-{light,dark}.png`). The preset grid sits inside `Card tier="quiet"` with `CardContent px-4 py-3`. Readings are item 0 at rest, in Chromium.

| item | tile rest fill vs the host's pad, light / dark | rest edge vs host, light / dark | own cast |
|---|---|---|---|
| Card `tier="quiet"` | 1.38 / 1.02 | 1.88 / 1.41 | 1 leg, blur(14px) |
| Card `tier="wash"` | 1.32 / 1.00 | 1.78 / 1.46 | 1 leg, blur(10px) |
| Card wash, `:shadow="false"` ("flush" Card) | 1.32 / 1.00 | 1.54 / 1.15 | 1 leg (the rim), blur(10px) |
| Surface `tier="wash"` | 1.32 / 1.00 | 1.42 / 1.06 | 1 leg |
| **bare element** (no plate) | **1.00 / 1.00** | **1.16 / 1.16** (the seam) | none |

In light, every plated variant stacks a second veil on the host's, so each tile reads as a grey card inside a card. The bare variant reads as one card holding four options: seam cells at rest, with the selected cell taking the fill and the tone edge (`cap/q5-sheet2-light.png`, `cap/sheet-preset-light.png`, where the rows are HEAD, then Card items, then bare items). In dark the plated tiles separate less (1.00–1.02 on fill), so the difference is smaller.

The **flush tier is the bare item**: a `div` (or any element) stamped by the group. The register supplies its corner (`--radius-ctx` = field), seam, fill and edge. That bends the family's thesis. The best-reading nested option has no container, so the register owns its shape (§4, counterexample 1).

The bare arm is as green as the Card arm on the battery (run `c5bare`, Chromium and Playwright WebKit):
- T-1: preset 16.00 flat at 61.58 → 81.75 → 101.92; specimen 16.00 flat.
- T-3: 18/18. Preset 328 / 341 / 328 px² against the 269 bar (light, dark, PRT); specimen 586 / 599 / 586 against 307.
- T-6: 30/30. Preset hover light channel 75.29 %, specimen 3.93 %.
- W-C: 13/13.

## 2 · The strongest form, and what it must specify

**API.** A new subpath `@mkbabb/glass-ui/selection`:

```vue
<SelectionGroup v-model="preset" type="single" orientation="horizontal" aria-label="Spring presets" class="grid grid-cols-2 gap-2">
  <SelectionItem v-for="p in presets" :key="p.name" :value="p.name" v-slot="{ itemProps, selected }">
    <div v-bind="itemProps" class="flex flex-col items-start gap-0.5 px-3 py-2">…</div>   <!-- flush option -->
    <!-- or <Card v-bind="itemProps" size="sm">…</Card>, <Surface …>, <Chip shape="cell" …> -->
  </SelectionItem>
</SelectionGroup>
```

- `SelectionGroup` props: `type: "single" | "multiple"`, `orientation`, `disabled`, `as`, `class`, and `v-model`. It renders one element carrying `role` (`radiogroup` or `group`), `aria-orientation` and the keydown handler. It paints nothing.
- `SelectionItem` props: `value`, `disabled`, `asChild`. It renders no element of its own. It exposes `itemProps` (role-per-mode ARIA, roving `tabindex`, `data-state`, `data-selection-item`, `data-disabled`/`aria-disabled`, `onClick`, and its own attrs merged underneath) plus `selected`.
- `type="multiple"` stamps `aria-pressed` with no role, which covers the V2 N-of-M thumbnails (X-4). A deselectable single ("none of these", X-6) is not specified; see §5.

**The contract, precisely.**

1. **One stamp, verified.** The item's element must carry every stamp key exactly. DEV reads it back after mount and on every update, and throws naming each lost key (§1.1). Any library component meant to host an item must bind no stamp key after `$attrs`: Card's `role`, `tabindex`, `aria-selected`, `data-selected` and its `selected` prop are deleted (E-1), and Chip's static filter admits a stamped element. The e2e witness is W-C, plus Q1's nine-cell matrix, which the pass-2 harness should adopt.
2. **One element.** An item renders exactly one element, found through the Fragment anchor. DEV errors otherwise.
3. **Presentational content.** The DEV refusal of interactive descendants (§1.3).
4. **One engine, grid keys.** `useTabRovingFocus` gains a geometric cross-axis walk (+33 lines): Up/Down in a horizontal set, Right/Left in a vertical one, moving to the nearest item in the next row by centre distance, react-aria style. A one-row strip has no item across it, so the dock and SegmentedTabs are unchanged there. T-2 is 12/12 on `single`, `vertical` and `tabs`, and T-5 is 44/44. `ToggleGroup` becomes `SelectionGroup` plus the row class, and `ToggleGroupItem` becomes `SelectionItem` plus `<button class="toggle-group__item control-surface …">`. `toggle-group/context.ts` (53 lines) is deleted.
5. **One register** (`selection/styles.css`, 112 lines, keyed on `[data-selection-item]`):
   - rest: seam edge and corner `--radius-ctx` at zero specificity; `--radius-ctx: var(--radius-field)` on the item.
   - selected: `--selection-fill` at `--fill-selected` of `--selection-tone`, and `border-color: var(--selection-tone)`.
   - hover, bracketed by `(hover: hover)`: `--fill-hover` plus the edge lifted to `--ink-edge` plus `scale: 1.015`.
   - press: `--scale-press-sm`.
   - commit: `--selection-fill` and `border-color` on the 180 ms engage clock, plus a spring settle `selection-commit` (scale 1 → 1.025 → 1) keyed on `[data-state="on"]:focus`, so a page that loads with a choice made does not pop.
   - PRM: scales zeroed, light channel kept.
   - ring: `outline` 2 px at `--ink-perimeter`, offset 2 px.
   - forced colours: `Highlight` edge and fill.
   - per-item tone: `--selection-tone` (X-7).
6. **Five plate arms** (§1.4) and the global `@property --selection-fill`.
7. **One ARIA answer for one-of-N.** SegmentedTabs `semantics="toggle"` moves from `group` + `aria-pressed` to `radiogroup` + `radio` + `aria-checked` (4 lines). That takes T-5's `tabs` cell from FAIL to PASS (§1.3 item 7 of the portfolio).

## 3 · The battery on the probe

Build `c5`: tiles are Card `size="sm"`, `tier="wash"`, `:shadow="false"` (the charter's Card composition). Build `c5bare`: tiles are the flush bare option, run as `--only T-1,T-3,T-4,T-6,T-7,T-8,W-C`. Both are production builds, `node run.mjs --build … --out … --webkit` (`logs/c5-run.log`, `logs/c5bare-run.log`). The HEAD reference is re-run on this seat's HEAD build for Chromium (`logs/head-run.log`) and agrees with HARNESS.md §4 row for row: T-1 3/8, T-3 2/15, T-4 8/20, T-5 19/38, T-6 17/24.

| witness | HEAD | D4-C `c5` (Card tiles) | D4-C `c5bare` (flush tiles) | light / dark / PRT and engines |
|---|---|---|---|---|
| T-1 | FAIL 3/8 | **FAIL 6/9**: preset, specimen, card, surface, chipcell ×2 PASS (16.00 flat, a named role); the three `wrap` holders FAIL as at HEAD (ToggleGroupItem 20 → 23.95 → 39.24, pill Chip 10.70 → 32.11, Button 20 with no role) | FAIL 6/9, the same cells | Chromium and Playwright WebKit identical |
| T-2 | PASS 12/12 | **PASS 12/12** (the refactored ToggleGroup and SegmentedTabs keep the stadium) | not run | both engines |
| T-3 | FAIL 2/15 | **PASS 18/18**. At ≥ 3:1, light / dark / PRT: preset 324.5 / 341 / 328 px² against the 269 bar; specimen 586 / 592 / 586 against 307; strip 141 / 159.5 / 148.25 against 88; card 552 / 567 / 560 against 294; surface 574 / 588 / 576 against 301; chipcell 134.5 / 153.75 / 142 against 93. The fill stays 1.26–1.42:1; the edge carries | **PASS 18/18** | Chromium; Playwright WebKit 18/18 (PRT through the forced level-0 path) |
| T-4 | FAIL 8/20 | **FAIL 12/24**: preset, card, surface whole at 2.00 px on every side, selected or not. FAIL on `preset-verbatim` (the consumer's `outline: 1px dashed` at offset −1 replaces the ring, 0.00 px) and on `specimen` / `specimen-verbatim` (the FadingScroll port's 2 px grid padding cuts the ring to 1.00 px) | FAIL 12/24, the same causes | both engines |
| T-5 | FAIL 19/38 | **PASS 44/44**: `radiogroup`/`radio` everywhere including `tabs`; one stop; all four arrows move and check on the preset, specimen, card and surface grids (e.g. preset Down 0 → 2, Up 2 → 0) | (W-C 13/13) | Chromium (CDP) |
| T-6 | FAIL 17/24 | **PASS 30/30**. Hover light channel: preset 6.44 %, specimen 71.69 %, card 4.27 %, surface 72.19 %, chipcell 7.05 % (PRM the same). Hover 1.015, press 0.97 × 0.97, the commit runs `--selection-fill` and `border-color` 180 ms, coarse no latch | **PASS 30/30** | Chromium 30/30; Playwright WebKit 30/30. The ToggleGroupItem `single` info cell still hangs in Playwright WebKit (`no answer within 120 s`); Card, Surface and Chip items do not |
| T-7 | FAIL 4/12 | **FAIL 8/12**: `preset-verbatim` in all four states (the consumer's dashed outline, `bg-background`, washes). `specimen-verbatim` and `strip-verbatim` pass, with content-ink differences reported | FAIL 8/12, the same | Chromium |
| T-8 | FAIL 0/16 | **PASS 16/16** (T-1 and T-3 on the T-8 scenes, both engines); real Safari UNMEASURED (owner's safaridriver checkbox) | **PASS 16/16** | |
| W-C | FAIL 0/7 | **PASS 13/13**: exports present; card and surface boards `radiogroup`/`radio`, 1 stop, Right/Left/Down/Up all move and check, items group-stamped | **PASS 13/13** | Chromium |

**What turns green, and why:**
- T-3: the tone edge, through the five arms.
- T-5: the geometric cross-axis walk and SegmentedTabs' ARIA.
- T-6: the edge light channel on hover. The 0.05 fill alone moved 0.12 % on specimen and 0.00 % on chipcell (`c2`).
- T-8: T-1 and T-3 hold in both engines.
- W-C: the stamp.

**What stays RED, and the cause:**
- **T-1 `wrap`**: the control-role holders (ToggleGroupItem, pill Chip, Button) still follow their content or name no role. The family never touches the stadium rung.
- **T-4 `specimen`**: the consumer's 2 px grid padding inside FadingScroll, against the ring's 4 px reach. The ring is correct; the port does not clear it.
- **T-4 and T-7 on `preset-verbatim`**: consumer paint. keyframes.js keeps its dashed outline until it deletes `SpringPhysicsFacet.vue:197-215`. The family removes the reason for it (T-3), not the rule.
- **T-7 `specimen-verbatim` passes only because the values coincide.** The consumer's `border-radius: var(--radius-field)` (`EasingTarget.css:116`) computes to Card's own 16, so a computed-style witness cannot see the redundant source rule.

## 4 · Real weaknesses, as counterexamples

1. **The best nested option has no container.** "The container owns the shape" is the thesis, but the reading that works inside a plate (§1.5) is a bare element whose corner, seam, fill and edge all come from the register. For Card-in-Card, the register is a declared tile shape.
2. **Five arms, a registered property, and a plate contract nobody enforces.** Every future plate recipe that writes `background:` or its own `background-image` must list the state layer, or selection vanishes on that plate with no error. The `.control-surface:hover` shorthand shows the trap: it clears the image list on hover, so without its arm a hovered selected pill loses its fill. A new gate would be needed (every `[data-selection-item]` plate paints `--selection-fill`), and the gate-abrogation mandate cuts against minting it.
3. **The DEV guards are DEV.** A production build of the q3 GalleryCard shape ships three tab stops and a press with two owners, and a consumer binding written after `v-bind="itemProps"` silently cancels the selected paint (`q1c`). E-2 asks that the primary fail loud; here it fails loud only in DEV.
4. **The Chip loses its flood.** The HEAD strip commits with the accent flood (a `scale` pop and a `plus-lighter` wash, `glass-chip.css:27-57`). A stamped chip commits with the register's flat fill, tone edge and 1.025 settle (`cap/sheet-strip-card-light.png`, rows 1-2). That is a D-2 regression for V1 unless the flood re-keys onto `[data-selection-item][data-state="on"]`, which would give the Chip a second selected paint beside the register.
5. **A full-tone edge is heavy in light.** The only measured passing edge is ≥ 0.9 of the tone (§1.4), and in `--foreground` it draws a near-black line around a 16 px card (`cap/sheet-preset-light.png`). A consumer tone softens it but becomes a per-site input.
6. **Two components where there was one** (P-1). Every site writes `SelectionGroup` → `SelectionItem` → `v-slot` → `v-bind`. That is four lines of plumbing per set before any content, and the order rule (stamp last) is invisible until the guard throws.
7. **The WebKit hover hang is not solved, only avoided.** The `single` scene (ToggleGroupItem over `.glass-capsule-hover`) still hangs Playwright WebKit on hover. The pill preset keeps it; the Card, Surface, Chip and bare items do not show it.
8. **`useAttrs()` is not reactive in the item's `computed`.** A consumer attribute that changes after mount does not reach the element through `itemProps` until the stamp itself recomputes. The probe did not exercise this.

## 5 · Public API and consumer impact

**glass-ui.**
- Added: `SelectionGroup`, `SelectionItem`, the register, the five arms, the `@property`, the grid walk, and SegmentedTabs `toggle` → `radiogroup`.
- Deleted: Card's `selected` prop and its three bindings, its selectable arm CSS (`.card[role="option"]`, 60+ lines), `@property --card-fill`, and `toggle-group/context.ts`.
- Changed: `ToggleGroup` and `ToggleGroupItem` rebuilt on the behaviour; the pill's on-state fill moves to the register (it keeps its ink and weight).
- `vue-tsc --noEmit --project tsconfig.src.json` on the worktree: exit 0 (`logs/vue-tsc-src.log`). The test typecheck was not run.
- Re-points: `demo/stories/display/card.vue:117-137`, `radius-role-canon.test.ts:555-568`, and the engine-consumer arm in `overfit-structure.test.ts:415-462`. The consumer count stays three: the dock, SegmentedTabs, and `SelectionGroup` (with ToggleGroup composing it).

**Consumers** (read-only census, sites per X.md; counts by `grep` over `*.vue` excluding node_modules):
- **keyframes.js** (10.0.1; 2 ToggleGroup files, 1 selectable Chip). K1 and K2 become `SelectionGroup` over flush options or Card `size="sm"`. They delete `SpringPhysicsFacet.vue:197-215` and `EasingTarget.css:116`, and `EasingTarget.vue:410-416` (the dead group reset). The portrait-ink rules (`EasingTarget.css:197-204`) can read `--selection-tone`. The family filter keeps ToggleGroup.
- **value.js** (^7.0.0; 2 selectable Chip sites). V1 becomes `SelectionGroup` over Chip `shape="cell"`: it deletes the hand exclusivity (`EasingSpecimenStrip.vue:33-35`) and loses the flood (§4.4). V2 (Mix palettes) can take `type="multiple"`, deleting `ring-*` and `opacity-75`. The migration crosses three majors (7 → 10+), carried in value.js's own tranche (E-6).
- **fourier-analysis** (10.0.1; 3 `semantics="toggle"` sites). They change ARIA from `aria-pressed` to `radio` with no markup change. F3, F5 and F6 can wrap their Buttons in `SelectionGroup`: Button is a `<button>`, and the guard reads it back. F1 gains `radio` and arrows, and `is-bound` stays on a channel the register does not use. F2 (GalleryCard) is refused by the content guard.
- **chicago** (^10.0.1). C1 (the status filter radios with no arrows) can wrap its `<button role="radio">` elements. Nothing else changes.

## 6 · Open gaps

- Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).
- The production behaviour of the content refusal (§4.3). Should it be a production `console.error`, a render-time refusal, or DEV-only as the library does elsewhere?
- The edge weight (§4.5): whether a full-tone 1 px edge meets the owner's "more card like" in light, or a 2 px edge at a lighter tone should be measured instead.
- The Chip flood under the stamp (§4.4).
- A deselectable single (X-6: keyframes.js `NO_PRESET`, fourier F5) is unspecified. The engine's `single` model cannot clear itself.
- T-4 `specimen`: port clearance belongs to the consumer's layout. The family has no lever on it.
- The two-writer rule for `asChild` (child props beat the stamp) is caught only by the DEV readback.
- The plate-contract gate (§4.2) is unminted.
- The ToggleGroupItem hover hang in Playwright WebKit is not understood.
- The test typecheck and the unit suites were not run on the probe.

## 7 · Artefacts

Under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-C-research/`:
- `d4c-probe.diff`: the whole probe against `504ff421`, including the worktree's `scenes.mjs` family arm.
- `out/builds/{head,c1,c2,c4,c5,c5bare}/` and `out/runs/<label>/*.json`.
- `probe/`: the question page, its build script and the scripts.
- `probe/builds/{s1,s1-dev,s2,s2-dev,g1-dev,s3,s4}/`: stage 1 has HEAD Card and HEAD Chip; `g1-dev` has HEAD Card and Chip with the guard.
- `logs/`.
- `cap/`: `q5-*`, `sheet-preset-*`, `sheet-specimen-*`, `sheet-strip-card-*`.

The worktree was removed with `git worktree remove --force`, and no worktree remains for this seat.
