# W-L.1 · the API asks: each one cured, answered or declined, with a gate on the ones that ship · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `78922b26` in a scratch worktree (docs-only since `f3ad78d0`; `git diff --stat v10.1.0 HEAD -- src package.json tests scripts .github` prints nothing, so every reading measures the published 10.1.0 bytes). `dist/` built there (`npm run build`, exit 0, "projected 63 public entries"). A minimal consumer app (Vite 8 + `@tailwindcss/vite`, `@mkbabb/glass-ui` linked to the worktree's package) served on :6391 for the Chromium probes (appendix B) |
| ships in | 11.0.0 |
| families | F-71, the API-ask cures split (`audit/REGISTRY.md:1511-1526`). The intake, the reply letter and every other F-71 row are W-B.2's; the badge seat (O-67 R-3) is W-I.1's |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| engines | Chromium (Playwright's bundled build) is the gate engine for the paint rows. Playwright WebKit rows are labelled so. Real-Safari cells are UNMEASURED until W-A.6's step 0 (OW-3) |

## 1 · What it closes

The decision rule is W-B.2's (`waves/W-B.2.md:41-46`): an ask that removes glass behaviour duplicated in two or more consumers, or that a consumer cannot express without restyling library internals, is CURED here; an ask one consumer can compose from shipped parts is DECLINED with the recipe (E-5); a row with no producer mechanism is ANSWERED with a measurement.

| row | ask | terminal | § |
|---|---|---|---|
| O-65 P-1 | a detached Configurator pane inset from the viewport edge | ANSWERED: `layout="detached"` shipped in 10.1.0; the inset is the page gutter (row O-74 §7) | 3.1 |
| O-65 P-2 | an edge drawer that slides under a content surface | DECLINED with a recipe | 3.2 |
| A2-VA-L3-2 | a CardHeader `#actions` seat | CURE | 3.3 |
| A2-VA-L1-2 (veil) | the scroll veil under a condensed header | CURE | 3.3 |
| O-61 R-2, N-11b, GAP-C2 | the Slider `spectrum` range has no fill hook | CURE (the API half; the value mark is W-H.1's) | 3.4 |
| O-61 R-3, N-11c, UIA-V-254, A2-KE-L2-13, UIA-F-130, B-5 | the theme toggle as one menu row; a glyph slot; a decorative seat | CURE | 3.5 |
| #76, UIA-V-34 | the canvas-anchored overlay's moving anchor, on W-0.10's declared `reference` (the declaration and O-82 are W-0.10's) | CURE | 3.6 |
| R9-02-15, A2-FO-L3-1 | SelectTrigger's `w-full` takes a whole toolbar row | CURE (a break) | 3.7 |
| O-74 §5, A2-FO-L1-17, A2-VA-L1-7 | a presentation-only slug identity / dock attribution menu | DECLINED with a recipe | 3.8 |
| O-74 §7, A2-FO-L3-6 | a page-gutter token | ANSWERED: the page gutter is `--space-section` | 3.9 |
| O-74 §13, A2-FO-L1-4 | a `./search` subpath | DECLINED; the search field is Input's adornment seats (next row) | 3.10 |
| UIA-F-106, O-51 | Input adornment slots; the search cancel glyph | CURE | 3.10 |
| UIA-V-97 | DropdownMenuItem `tone` | CURE | 3.11 |
| UIA-KF-136, A2-KE-L1-25, KFW12-4 | one menu-row slot grammar: `#leading`, `#description`, the indicator seat | CURE | 3.11 |
| UIA-F-133 | a loading Button shows two leading glyphs | CURE | 3.12 |
| UIA-V-151, UIA-KF-167 | EasingPicker repeats the preset row | CURE | 3.13 |
| E-3 (O-74 erratum), KFW12-2 | the EasingCurve marker off the stroke; one named-curve catalogue | CURE (a break) | 3.13 |
| UIA-KF-201, UIA-F-139, A2-KE-L1-8 | a Badge soft tone | CURE | 3.14 |
| UIA-V-639, A2-FO-L1-27 | Pagination | CURE | 3.15 |
| A2-FO-L3-5 | a ConfiguratorLayer flush arm | CURE | 3.16 |
| O-47, KFW12-3, KFW12-5, A2-FO-L1-15 (value field) | field seams: optional label, a trailing seat, a readout seat | CURE | 3.17 |
| A2-FO-L1-14 | a single-component tooltip | CURE | 3.18 |
| O-74 §4, A2-VA-L1-6, A2-FO-L1-9 | `useConfirm` (ruled BUILD in W-B.4) | CURE | 3.19 |
| O-86 | a transport on Timeline | DECLINED with a recipe | 3.20 |

O-86 TIMELINE-TRANSPORT (INBOUND O-86; CUR:80, "shape ruled in its wave against the Slider-marks split") had no owning wave; this wave owns it (§3.20).

## 2 · The defect at HEAD

Source reads at `78922b26`:

- `card/CardHeader.vue:86` renders `<slot />` only; there is no actions seat. The condensed state exists (`:20-67`, CURED@HEAD per W-B.2 §3.7) and paints no veil beneath the header.
- `slider/styles.css:246-252`: the spectrum range is transparent and carries no fill class (`Slider.vue:344` binds `glass-liquid-fill` only when `v !== 'spectrum'`), so `--slider-range-bg`, which the default variant reads (`styles.css:141`), does nothing on a spectrum slider.
- `dark-mode-toggle/DarkModeToggle.vue:11-15`: the props are `size` and `disableTransitions`; the root is always a `<button>`; there is no menu-row form, no glyph slot and no display-only glyph.
- `popover/PopoverContent.vue` declares no `reference` prop and `popover/index.ts` exports no anchor part; reka's `PopperContent` takes `reference` (`reka-ui/dist/Popper/PopperContent.js:108`).
- `select/SelectTrigger.vue:59`: the recipe carries `w-full`.
- `input/Input.vue` has no `<slot>` at all.
- `menu/DropdownMenuItem.vue:46` renders `<slot />` only; no `tone`, `#leading` or `#description`.
- `button/Button.vue:193-194`: `<DotRing v-if="loading" class="button-mark" />` then `<slot />`; a consumer's leading glyph sits in the default slot, so a loading button shows two marks.
- `easing/EasingPicker.vue:517-523`: the preset `Select` renders unconditionally in bezier mode.
- `easing/EasingCurve.vue:177-179`: the marker is drawn at `(progress, travel)`, where `travel` is a separate consumer prop, so the dot can leave the stroke. `easing/index.ts` exports no curve catalogue.
- `badge/*.ts:45-49`: `VARIANT` is `default | secondary | outline`; no soft tone.
- `src/components/pagination/` does not exist.
- `labeled-field/types.ts:10` `label: string` (required); `LabeledField.vue` slots are `default` and `error` (`:55`, `:70`).
- `tooltip/index.ts` exports the four parts only; `Tooltip.vue` has no `content` prop.
- `dialog/index.ts` exports no `useConfirm`.
- `timeline/Timeline.vue:17-20` records the ruling that a playhead with ticks is `<Slider :marks>`.

The HEAD probes (appendix A for the unit probe, appendix B for the Chromium probes):

| probe | reading at HEAD |
|---|---|
| A1 CardHeader `#actions` | **fail**: `#act` not rendered |
| A2 Button `#leading` at rest, replaced by the loading mark | **fail**: `{"restGlyph":false,"busyGlyph":false,"busyMark":true}` (the slot is dropped) |
| A3 Input `#leading` and `#trailing` | **fail**: neither rendered |
| A4 EasingPicker `:presets="false"` | **fail**: `[aria-label="Easing preset"]` present |
| A5 `EASING_CURVES` exported | **fail**: `undefined` |
| A6 EasingCurve marker without `travel` | **fail**: marker absent (it renders only with `travel`) |
| A7 `DarkModeMenuItem`, `DarkModeGlyph` exported | **fail**: `["DarkModeToggle"]` only |
| A8 `useConfirm` exported | **fail** |
| A9 `badgeVariants({ variant: "soft" })` | **fail**: no `badge-atom--soft` class |
| A10 `src/components/pagination/index.ts` | **fail**: absent |
| A11 `<Tooltip content="Hint">` | **fail**: tooltip content text absent |
| A12 LabeledField `#trailing`, `#readout` | **fail** |
| A13 menu row `tone`, `#leading`, `#description`, unchecked indicator seat | **fail**: `{"tone":null,"leading":false,"description":false,"uncheckedSeat":false}` |
| B1 spectrum range with `--slider-range-bg: rgb(255 0 0)` | **fail**: `rgba(0, 0, 0, 0) \| none` |
| B2 a 600 px `flex-wrap` toolbar: Button, SelectTrigger, Button | **fail**: 3 rows; the trigger is 600 px wide |
| B3 PopoverContent with a virtual `reference` at (700, 400) | **passes at HEAD**: content top 414, centre x 705. The attribute falls through to reka's `PopperContent` untyped. The static paint half of #76 is met; the declaration is W-0.10's (its G1, the probe below) |
| B4 the same virtual `reference` object moved in place: its rect goes from (700, 400) to (900, 600) with no swap, scroll or resize, read 600 ms later (fix-5, FD-01; `formation-audit/fix-5.md` appendix R, Chromium, at `c42aee9d`) | **fail**: content top 414, centre x 705, unchanged. A swap to a new object at (300, 200) re-seats (top 214, cx 305), so only the in-place move is the defect: reka's `autoUpdate` runs on scroll, resize and element resize, and a virtual rect moving on a canvas fires none of them |
| C1 strictTemplates: `<PopoverContent :reference>` and `<TooltipContent :reference>` | **fail**: `TS2353 … 'reference' does not exist` on both (appendix C). This row is W-0.10's G1, which lands the declaration in 10.2.0 |

## 3 · The cure

### 3.1 O-65 P-1: ANSWERED

10.1.0 ships `layout="detached"` (`configurator/Configurator.vue:58-64`, `:205-214`; `configurator/styles.css:328-329`): no shell plate, each region its own floating card, separated by `--configurator-detached-gap`. fourier (`239845f`) and keyframes.js (`9fa56c26`) adopted it (INBOUND O-77 receipt). The inset from the viewport edge is the page gutter (§3.9), which the consumer's page grid applies; no Configurator prop is added. Reply: "ANSWERED at 10.1.0: `layout="detached"`; inset the Configurator by `--space-section`".

### 3.2 O-65 P-2: DECLINED with a recipe

One consumer (fourier's paper table of contents) and a composition from shipped parts: a `Collapsible` whose content sits in a grid track behind the paper, below the paper's stacking level, with its inline size driven by the disclosure's spring register (`_shared/disclosure/disclosure.css`). It is non-modal, so it has no focus trap and no scrim; `Sheet` stays the modal edge surface. The recipe goes into `collapsible/README.md` as a compiled example (W-C.3's README-example invariant compiles it).

### 3.3 CardHeader: `#actions` and the condensed veil

- The header becomes a row: the title block (default slot, `min-inline-size: 0`) and a `data-slot="card-header-actions"` sibling holding `#actions`, which never shrinks. The row keeps `--space-body` between them. It is the Card twin of ConfiguratorLayer's 10.1.0 `#actions` (O-68).
- While condensed, the header paints the scroll veil: the header's own band takes `.glass-veil` at the `--glass-veil-wash` rung (W-H.2's ladder), so content scrolling under it stays below readable ink. At rest (not condensed) the band is clear. No second surface: the veil is the header's background, keyed on the existing condensed state.

### 3.4 The spectrum fill hook

The spectrum range reads `--slider-range-bg` like every other variant, default `transparent`. With the variable unset, today's paint holds (the ramp is the fill). A consumer that wants the scrub's travelled part filled sets the variable. The visible thumb and value mark are W-H.1's (G12). One hook, one name: no spectrum-specific variable.

### 3.5 The theme row: one glyph, three placements

- `DarkModeGlyph` (exported from `./dark-mode-toggle`): the sun and moon mark, `aria-hidden`, reading `useGlobalDark().isDark`. It is the one drawing of the glyph and the decorative form B-5 asked for (a display seat renders the glyph, never a button).
- `DarkModeToggle` renders `DarkModeGlyph` through a `#glyph` slot (UIA-F-130), default the glyph.
- `DarkModeMenuItem` (exported from `./dark-mode-toggle`): a `DropdownMenuCheckboxItem` with `aria-checked` bound to `isDark`, the glyph in the row's `#leading` seat (§3.11), the label in the default slot (default "Dark mode"). One actuation (Enter, Space or click) toggles, and the menu stays open so the state change is visible. N-11c's "one keyboard-actuatable row".

### 3.6 The moving anchor

W-0.10 declares `reference` on PopoverContent and TooltipContent in 10.2.0 (O-82). This wave builds #76's canvas case on it: a canvas anchor is one reference object whose rect changes frame to frame, and the content follows it through reka's own update path, with no hand positioning and no reference swap. A swap already re-seats at HEAD (§2 B3, B4), so the swap is not the case. Whatever the wave forwards to reka for this (reka's `PopperContent` runs `autoUpdate` with `animationFrame` under its `updatePositionStrategy: "always"`, `reka-ui/dist/Popper/PopperContent.js:212-214`) is a declared prop, as W-0.10 declared `reference`, never an untyped fallthrough. G-L1-7 is its gate (fix-5, FD-01).

### 3.7 SelectTrigger sizes to its content

`w-full` leaves the trigger recipe. The trigger is `inline-flex` with `max-inline-size: 100%` and the house control floor; it fills only when its container stretches it (LabeledField's control track stretches its child, so a labelled select still fills its field). A consumer that wants a full-width trigger elsewhere sets `class="w-full"`. This is a break: MIGRATION row §7.

### 3.8 Slug identity: DECLINED with a recipe

The identity block (avatar, name, handle) is a menu row composed with §3.11's grammar: `Avatar` in `#leading`, the name as the label, the handle in `#description`. The recipe goes into `menu/README.md` and covers the dock attribution menu (A2-VA-L1-7). A `SlugIdentity` component would be a second row grammar.

### 3.9 The page gutter: ANSWERED

The space series already names it: `--space-section` is "section frame · page gutter" (`styles/tokens/sizing.css:105`), 2rem (`:124`), 1.25rem under the narrow rule (`:336`). A `--page-gutter` token would alias it. The README's layout section states it; A2-KE-L2-16's dock cap reads `--space-section` in W-I.1.

### 3.10 Input adornments; no `./search`

`Input` gains `#leading` and `#trailing` seats inside `.field-control`, each a `data-slot` span that does not take focus, with the input's inline padding following the seats' measured size through the control's own grid. With `type="search"` and a value, the trailing seat shows the cancel glyph (O-51) as a `Button` `icon-only` `emphasis="quiet"` that clears and refocuses. A search field is `Input type="search"` with a leading glyph; paper search's index and results are consumer-owned. No `./search` subpath (the D1 door rule, one door per symbol).

### 3.11 One menu-row grammar

`DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem` and `SelectItem` share one row: `#leading` (a fixed-width column), the label (default slot), `#description` (a second line in `--type-caption`), and `#shortcut`. The checkbox and radio items put their indicator in the leading column and reserve it when unchecked (`data-slot="menu-item-indicator"`, an empty ring), so an unchecked row does not read inert (UIA-KF-136). `DropdownMenuItem` takes Button's `tone` axis (`neutral | destructive`), written as `data-tone` and read by the row's ink.

### 3.12 Button's leading seat

`Button` gains `#leading`. When `loading`, the DotRing renders in the leading seat and the slot's content does not; at rest, the slot renders. The default slot never receives the mark.

### 3.13 Easing: one catalogue, the marker on the stroke, presets optional

- `EASING_CURVES` (exported from `./easing`): the named-curve catalogue, one record per curve (id, label, bezier or step form). `EasingPicker`'s preset `Select` and the specimen strip both read it (KFW12-2's `DEFAULT_BEZIER_PRESET` is its first entry's id, exported with it).
- `EasingPicker` takes `presets?: boolean` (default `true`); `false` omits the preset `Select` (UIA-V-151, UIA-KF-167).
- `EasingCurve`'s marker is sampled from the drawn stroke at `progress`: `cy = SVG_FLIP(ease(progress))` from the first stroke's own easing. The `travel` prop is deleted (a break: MIGRATION §7).

### 3.14 Badge soft

`variant="soft"`: the plate is the tone's ink mixed into the surface (`color-mix(in oklch, <tone ink> 14%, transparent)`), ink the tone's ink, no border. It crosses `tone` like the other variants. The 14 % rung is checked by W-H.1's ink-on-composite invariant in both themes (G-L1-13).

### 3.15 Pagination

`./pagination` binds reka's `Pagination*` primitives (`PaginationRoot`, `PaginationList`, `PaginationListItem`, `PaginationPrev`, `PaginationNext`, `PaginationEllipsis`), with each item a `Button` (`emphasis="quiet"`, `aria-current="page"` on the selected one) at the house control sizes. Two consumers hand-roll it (value.js Audit and Flagged, fourier), per W-B.2.

### 3.16 ConfiguratorLayer flush

`flush?: boolean` removes the layer's own card rim and inset when the layer already sits inside a surface (A2-FO-L3-5's double rim); the README states when to use it.

### 3.17 Field seams

`LabeledField`: `label` becomes optional (an unlabeled field must then pass `aria-label` or `aria-labelledby`, enforced by W-K.6's naming predicate); `#trailing` (a label-row action seat, KFW12-5); `#readout` (a value readout in the label row, an `<output>` bound to the control by `for`, KFW12-3 and A2-FO-L1-15's value field). The readout seam is what O-47 asked for.

### 3.18 Tooltip `content`

`Tooltip` takes `content?: string`. With it, the default slot is the trigger (rendered as-child) and the content part renders the string. The four parts stay the composition for rich content. The string form does not open a second code path: it renders the same `TooltipTrigger` and `TooltipContent`.

### 3.19 `useConfirm`

Exported from `./dialog`: `useConfirm()` returns `confirm({ title, description, action, tone })`, a promise over the existing `Dialog` at `dismissal="deliberate"`, resolving `true` on the action and `false` on Escape, Cancel or an outside press. No `Confirm*` component symbol is minted, so the rule at `dialog/DialogContent.vue:21-28` holds (W-B.4 row O-74 §4).

### 3.20 O-86: DECLINED with a recipe

Timeline reports (`role="progressbar"`); the commanding surface for a playhead with ticks is `<Slider :marks>` (`Timeline.vue:17-20`). A transport (play/pause, scrub, speed) is a composition: a `Button icon-only` for play/pause, `<Slider :marks>` as the scrubber, a `Select` for the rate, laid out in a row; keyframes.js's `TransportDock` is the same composition in a dock. The recipe goes into `slider/README.md` as a compiled example. The Slider-marks split stays: no second coordinate system on Timeline.

## 4 · Files it touches

- New: `src/components/pagination/` (the parts, `index.ts`, `README.md`), `src/components/dark-mode-toggle/DarkModeGlyph.vue`, `DarkModeMenuItem.vue`, `src/components/dialog/useConfirm.ts`, `src/components/easing/curves.ts` (the catalogue), `tests/components/api-asks.test.ts` (appendix A promoted), `tests-visual/api-asks.spec.ts` (appendix B promoted).
- Edited: `card/CardHeader.vue` and `card/styles.css`; `slider/Slider.vue`, `slider/styles.css`; `dark-mode-toggle/DarkModeToggle.vue`, `index.ts`; `popover/PopoverContent.vue`, `tooltip/TooltipContent.vue`, `tooltip/Tooltip.vue`; `select/SelectTrigger.vue`, `select/SelectItem.vue`; `input/Input.vue`, `_shared/field/control.css`; `menu/DropdownMenuItem.vue`, `DropdownMenuCheckboxItem.vue`, `DropdownMenuRadioItem.vue`, `_shared/menu/menu.css`; `button/Button.vue`; `easing/EasingPicker.vue`, `EasingCurve.vue`, `index.ts`; `badge/*.ts` and its CSS; `configurator/ConfiguratorLayer.vue`; `labeled-field/LabeledField.vue`, `types.ts`; `dialog/index.ts`; `package.json` (`./pagination`); the READMEs named in §3.2, §3.8, §3.9, §3.20; `MIGRATION.md`, `CHANGELOG.md`.

## 5 · Acceptance gates

Each gate's exit code is read on its own. The unit gates run `npx vitest run tests/components/api-asks.test.ts -t <id>`; at HEAD the same assertions ran as appendix A.

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L1-1 · CardHeader actions | A1 | `#act` rendered inside `[data-slot=card-header-actions]` | **fail** |
| G-L1-2 · the condensed veil | Chromium: a `.card-scroll-host` scrolled 200 px under `<CardHeader shrink>`; the header's computed `background-image` or `backdrop-filter` is non-`none` while `data-condensed`, and `none` at rest | both | **fail** (probe `?p=card`, appendix B): rest `{bgImage:none, bgColor:rgba(0,0,0,0), backdrop:none}`, scrolled 200 px the same. The rest arm holds at HEAD; the condensed arm fails |
| G-L1-3 · the spectrum fill hook | B1 | the range computes `rgb(255, 0, 0)` | **fail**: `rgba(0, 0, 0, 0)` |
| G-L1-4 · the theme row | A7, plus: mount `DarkModeMenuItem` in an open menu, press Enter on it; `isDark` flips, `aria-checked` follows, the menu stays open | all | **fail**: A7 (the parts do not exist) |
| G-L1-5 · the glyph is one drawing | `test "$(grep -rl '<svg' src/components/dark-mode-toggle \| wc -l)" -eq 1` | exit 0: only `DarkModeGlyph.vue` draws | hold line: 1 at HEAD (`DarkModeToggle.vue`), exit 0 at `958ca517` on macOS (fix-6; the `= 1` string form exited 1 there, BSD `wc -l` pads the count); bite, a second `.vue` with an `<svg>` in the directory, exits 1 (fix-6). It bites if the menu item re-draws the glyph |
| G-L1-7 · the canvas case | B4: `node gate.mjs` (`formation-audit/fix-5.md` appendix R; lands in `tests-visual/wired/` under W-A.3). One virtual `reference` object at (700, 400); its rect moves in place to (900, 600) with no swap, scroll or resize; read 600 ms later | exit 0: content top in [610, 650] and centre x within 40 px of 905 | **exit 1** at `c42aee9d` (fix-5): `moved_in_place` top 414, cx 705. Bite, the other way: the same scene with reka's frame-driven arm planted as an untyped attribute (`update-position-strategy="always"`) exits 0 (top 614, cx 905) |
| G-L1-8 · SelectTrigger inline | B2 | one toolbar row; trigger width < 600 | **fail**: 3 rows, 600 px |
| G-L1-9 · Input seats | A3, plus: `type="search"` with a value shows a trailing clear `Button`; clicking it empties the model and focuses the input | both | **fail**: A3 |
| G-L1-10 · the menu-row grammar | A13 | `{"tone":"destructive","leading":true,"description":true,"uncheckedSeat":true}` | **fail**: all four false or null |
| G-L1-11 · Button leading | A2 | `{"restGlyph":true,"busyGlyph":false,"busyMark":true}` | **fail**: `restGlyph` false |
| G-L1-12 · easing | A4, A5, A6; A6 asserts `cy` equals `SVG_FLIP(0.25)` for `ease = t²` at `progress = 0.5` within 1e-6 | all | **fail**: all three |
| G-L1-13 · Badge soft | A9, plus W-H.1's ink-on-composite reader over the Badge soft specimen in light and dark: every tone ≥ 4.5:1 | both | **fail**: A9 |
| G-L1-14 · Pagination | A10, plus: a `Pagination` with 10 pages, click "Next" twice; `aria-current="page"` sits on page 3 | both | **fail**: A10 |
| G-L1-15 · Configurator flush | `<ConfiguratorLayer flush>` computes `border-top-width: 0px` and zero inline padding on its root | exit 0 | **fail** (probe `?p=card`): `borderTop 1px`; `flush` lands as a DOM attribute (`attrs: data-v-…,data-slot,class,data-state,flush`) |
| G-L1-16 · field seams | A12, plus: `<LabeledField>` without `label` and without `aria-label` fails W-K.6's naming predicate | both | **fail**: A12 |
| G-L1-17 · Tooltip content | A11 | the content text contains "Hint" | **fail** |
| G-L1-18 · useConfirm | A8, plus W-B.4's born-RED: `confirm()` resolves `true` on the action and `false` on Escape | both | **fail**: A8 |
| G-L1-19 · the recipes compile | W-C.3's README-example invariant over `collapsible/README.md` (§3.2), `menu/README.md` (§3.8), `slider/README.md` (§3.20) | each example block compiles | **fail**: none of the three blocks exists |

A2 as first written passed at HEAD vacuously (it asserted "mark present and glyph absent" while the slot was dropped). It was rewritten to require the glyph at rest; the rewritten form fails at HEAD. G-L1-5 is a hold line, not counted as born RED. G-L1-7 was first written as a `reference` swap, which re-seats at HEAD; it now reads the in-place move and is born RED (fix-5, FD-01).

## 6 · π and DELTA obligations

Each row's before capture is taken on the wave's base commit, the after on its last commit, with the probe's JSON readout beside each PNG, under `.cache/evidence/W-L.1/` (the one scratch root, F-61), sha256 cited in the wave record.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| CardHeader with `#actions`, rest and condensed over a scrolled list | light, dark | Chromium; Playwright WebKit labelled | the band-L fixture's `card` page at 1440 and 390 | G-L1-1, G-L1-2 readouts |
| the spectrum scrubber with the fill set and unset | light, dark | Chromium; WebKit labelled | fixture `fields` page (appendix B) | G-L1-3 readout; the unset capture equals the HEAD capture (sha256) |
| the toolbar with a SelectTrigger | light | Chromium; WebKit labelled | fixture `fields` page; before at HEAD: `fields-head.png` (sha256 `764138fd25a5a0b8…`, re-taken by the wave on its base) | G-L1-8 readout |
| the theme row in an open account menu; the menu rows with leading, description and an unchecked checkbox item; a destructive row | light, dark | Chromium; WebKit labelled | fixture `menu` page | G-L1-4, G-L1-10 readouts |
| Badge soft × two tones | light, dark | Chromium | fixture `badge` page | G-L1-13's contrast readout |
| Input with a leading search glyph and the clear seat | light, dark | Chromium; WebKit labelled | fixture `fields` page | G-L1-9 readout |
| Pagination, EasingCurve marker at three `progress` values, the loading Button with a leading glyph | light | Chromium | fixture pages | G-L1-11, G-L1-12, G-L1-14 readouts |
| a Popover on one virtual `reference` whose rect moves in place (the canvas case) | light, dark | Chromium; Playwright WebKit labelled | fix-5 appendix R's scene: a frame at rest and a frame 600 ms after the move, at the base and at the wave | G-L1-7 readout (HEAD: top 414, cx 705 after the move) |

Real-Safari cells are UNMEASURED until OW-3.

## 7 · MIGRATION rows (11.0.0)

| removed or changed | successor |
|---|---|
| `SelectTrigger` fills its container (`w-full`) | the trigger sizes to its content; add `class="w-full"` where a full-width trigger is intended (a `LabeledField` still fills) |
| `EasingCurve` prop `travel` | removed; the marker is sampled on the stroke at `progress` |
| a leading glyph in `Button`'s default slot beside `loading` | move the glyph into `#leading`; the loading mark replaces it |

The rest of this wave is additive (CHANGELOG lines only).

## 8 · Ledger rows

Closes, each with its terminal from §1: O-65 P-1 and P-2, A2-VA-L3-2, A2-VA-L1-2 (veil), O-61 R-2's API half, O-61 R-3, N-11b, N-11c, GAP-C2, UIA-V-254, A2-KE-L2-13, UIA-F-130, B-5 (L11-05's #64 promise), #76's API-ask half (`ledger/census-register-b.md:62`), UIA-V-34, R9-02-15, A2-FO-L3-1, O-74 §5, §7, §13, A2-FO-L1-17, A2-VA-L1-7, UIA-F-106, O-51, UIA-V-97, UIA-KF-136, A2-KE-L1-25, KFW12-2, KFW12-3, KFW12-4, KFW12-5, O-47, UIA-F-133, UIA-V-151, UIA-KF-167, E-3, UIA-KF-201, UIA-F-139, A2-KE-L1-8, UIA-V-639, A2-FO-L1-27, A2-FO-L3-5, A2-FO-L1-15 (value field), A2-FO-L1-14, O-74 §4, O-86. W-B.2's reply letter states each terminal with "11.0.0"; the three DECLINE recipes are quoted in it.

## Appendix A · the unit probe (ran at HEAD with `npx vitest run`)

`tests/_bandL/api-asks.test.ts` in the scratch worktree; 13 cases A1-A13. Each mounts the named component with `@vue/test-utils` (teleport stubbed for the overlays) and asserts the new seat or export. Condensed:

```ts
it("A1", () => expect(mount(CardHeader, { slots: { default: "T", actions: '<button id="act"/>' } }).find("#act").exists()).toBe(true));
it("A2", () => { const m = (loading) => mount(Button, { props: { loading }, slots: { leading: '<svg class="lead-glyph"/>', default: "Save" } });
  const rest = m(false), busy = m(true);
  expect({ restGlyph: rest.find(".lead-glyph").exists(), busyGlyph: busy.find(".lead-glyph").exists(), busyMark: busy.find(".button-mark").exists() })
    .toEqual({ restGlyph: true, busyGlyph: false, busyMark: true }); });
it("A5", () => expect((Easing as any).EASING_CURVES).toBeTypeOf("object"));
it("A7", () => expect(Object.keys(DarkMode)).toEqual(expect.arrayContaining(["DarkModeMenuItem", "DarkModeGlyph"])));
it("A9", () => expect(badgeVariants({ variant: "soft" as any, tone: "destructive" })).toMatch(/badge-atom--soft/));
it("A13", async () => { /* <DropdownMenu default-open> … <DropdownMenuItem tone="destructive"> with #leading and #description,
  and <DropdownMenuCheckboxItem :model-value="false"> */
  expect({ tone, leading, description, uncheckedSeat }).toEqual({ tone: "destructive", leading: true, description: true, uncheckedSeat: true }); });
```

Result at HEAD: 12 failed, 1 passed (A2 in its first form); A2 rewritten as above fails.

## Appendix B · the Chromium probes (ran at HEAD)

A Vite app whose `src/app.css` is the README recipe (`@import "tailwindcss"; @import "tw-animate-css"; @import "@mkbabb/glass-ui/styles";`), `@mkbabb/glass-ui` resolving to the worktree's built package. Page `?p=fields`: a 400 px wrapper with `--slider-range-bg: rgb(255 0 0)` around `<Slider variant="spectrum" :model-value="[40]">`; a `display:flex; flex-wrap:wrap; gap:8px; width:600px` toolbar holding `Button`, `Select`+`SelectTrigger`, `Button`. Page `?p=card`: a Card with a 300 px `.card-scroll-host` holding `<CardHeader shrink>` over 60 rows, read at rest and after `scrollTop = 200`; a `<ConfiguratorLayer label="Layer" flush>` read for `border-top-width`. Page `?p=anchor`: `<Popover :default-open="true">` with `<PopoverContent :reference="{ getBoundingClientRect: () => ({ x:700, y:400, width:10, height:10, … }) }" placement="bottom">`. Readouts: `getComputedStyle(.slider-range).backgroundColor`, the set of distinct child `top`s in the toolbar, the trigger's width, the content box's top and centre.

Output at HEAD: `{"rest":{…"bgImage":"none","bgColor":"rgba(0, 0, 0, 0)","backdrop":"none"},"scrolled":{…same…},"flush":{"borderTop":"1px",…}}` (exit 1); `{"spectrumRangeBg":"rgba(0, 0, 0, 0) | none","toolbarRows":3,"triggerWidth":600}` (exit 1); `{"virtualAnchor":{"x":705,"bottom":410},"content":{"top":414,"cx":705}}` (exit 0).

## Appendix C · the anchor declaration probe (W-0.10's G1; kept as the record of this seat's reading)

`vue-tsc --noEmit` with `vueCompilerOptions.strictTemplates: true`, `@mkbabb/glass-ui` resolved to the built package, over:

```vue
<Popover><PopoverTrigger>t</PopoverTrigger><PopoverContent :reference="reference">p</PopoverContent></Popover>
<TooltipProvider><Tooltip><TooltipTrigger>t</TooltipTrigger><TooltipContent :reference="reference">h</TooltipContent></Tooltip></TooltipProvider>
```

At HEAD: exit 2, `(7,63) TS2353 … 'reference' does not exist`, `(8,80) TS2353 … 'reference' does not exist`.
