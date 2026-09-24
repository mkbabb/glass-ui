# D4 · round 0 · the selectable multi-line tile portfolio

| field | value |
|---|---|
| seat | D4 round-zero portfolio. Design loop D4 covers the selectable multi-line tile: which primitive owns it, how its corner follows its content, its selected, hover, focus and press states, and its engagement (O-58, N-9, REGISTRY F-30b) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | measured at `94adda14`. The tree moved to `d41b974f` during the run through two docs-only commits (`FORMATION-PROGRESS.md`, `audit/round-5/R5-01.md`). `src/` is byte-identical to `v10.0.1`: `git diff --stat v10.0.1 HEAD -- src` is empty |
| inputs | `CHARTER.md` (the design-loop section). `audit/PROMPT-RECAP-SEED.md` (E-1..E-13, D-1..D-4, P-1..P-8, N-9). `audit/REGISTRY.md` F-30 (both rows) and the families it touches: F-21 (R3-02-08, the on-state fill under the plate), F-24 (the state-channel invariant), F-39, F-40, F-28, F-19, F-70 (UIA-F-43), F-68. `audit/INBOUND-MAP.md` area 1 (19 radius rows, 18 on F-30b) and O-58. `audit/round-2/R2-03.md` §R2-03-09. `BK/coordination/valuejs-outbound-2026-09-23-o58-preset-tile-shape-relay.md` and `…-ui-audit-relay.md` row UIA-KF-046. `DESIGN.md:357-435` (the radius role table). `docs/design/design-idioms.md` (§9 twin primitives, §13 customization fences). `src/styles/theme/radius.css` (whole). `src/components/toggle-group/` (whole), `card/`, `surface/`, `chip/`, `radio-group/`, `tabs/types.ts`, `tabs/styles/segmented.css:80-110`, `button/styles.css`, `styles/glass/glass-chip.css`, `styles/glass/glass-capsule.css:88-139`, `styles/utilities/base.css:130-151`, `styles/tokens/color-radius.css:135-157`, `composables/motion/morph/useSelectionGroup.ts` (whole). `tests/styles/radius-role-canon.test.ts:330-580` and `tests/gates/overfit-structure.test.ts:27-40,415-462`. `docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md:60-70`. Consumer sites, read-only: keyframes.js `demo/scenes/spring/SpringPhysicsFacet.vue`, `demo/scenes/easing/EasingTarget.vue` and `EasingTarget.css`; value.js `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue`, `demo/palettes/browser/dialog/MigratePalettesDialog.vue`; fourier-analysis `web/src/components/equation/FunctionInput.vue`, `web/src/components/visualization/gallery/GalleryCard.vue` |
| instruments | A scratch Vite 8.1.5 harness mounts `src/` through the `@glass` alias (`D4/harness/`, port 5471, `--strictPort`, cache in scratch). One page, ten scenes: S1 the keyframes.js preset tiles (`SpringPhysicsFacet.vue:15,81-107`, transcribed, `v=bare` drops the consumer's `rounded-pill` and scoped paint, `v=verbatim` keeps both), S2 the specimen tiles in a FadingScroll (`EasingTarget.vue:115-156`, `EasingTarget.css:100-116`), S3 a single-line ToggleGroup, S4 a vertical four-item ToggleGroup (the ConsoleRail analogue), S5 Card's selectable arm wired as `demo/stories/display/card.vue:121-137` wires it, S6 selectable Chip `shape="cell"`, S7 the value.js strip (`EasingSpecimenStrip.vue:100-120`), S8 a Button whose label wraps, S9 SegmentedTabs of the four names, S10 a wrapped pill Chip and a wrapped ToggleGroupItem label. Probes: `D4/probe.mjs` (geometry, used corner by the CSS Backgrounds §5.5 overlap rule, painted fill by screenshot with ink hidden, label ink by computed colour composited on the sampled fill, the keyboard ring reached by Tab, arrow keys, hover and press), `ring-noselect.mjs`, `keys.mjs`, `shapes.mjs`, `supports.mjs`, `wrap.mjs`, `tabs.mjs`, `wk.mjs`. Playwright 1.61.1 from `glass-ui/node_modules`, headless Chromium 149.0.7827.55 (`channel: "chromium"`), and Playwright WebKit 26.5 for the geometry and fill cells. Light and dark (`.dark` on `html`). Load average 20.4 / 25.8 / 32.3 at the first probe and 16.8 / 23.2 / 30.6 at the re-run (other seats building); every number below is a settled static read, none is a wall-clock timing. Captures in `D4/cap/`. Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/` |
| tools | the charter's frontend design plugin (DesignSync) syncs claude.ai design-system projects and makes no designs, and the owner withholds Fable (2026-09-23), so this seat is Opus and the verdict comes from the codebase, prototypes and critiques |
| deliverable | Five orthogonal families (D4-A..D4-E) and four routes considered and not minted. Each family gets its charter; a code sketch of the load-bearing mechanism; its answer on shape, selected state, keyboard and ARIA, and engagement; the HEAD reading of its center; its public API delta and consumer migration; known risks; pass-1 questions; and the born-RED witness it must turn green. This document picks no winner |

## 0 · The problem

The owner, on the keyframes.js Spring scene (N-9, relayed as O-58): "this entire UI is god awful, not glass-ui idiomatic, cluttered, and too rounded in some pills ... The smooth and bouncy pills, for example are too rounded and should be more card like". The Smooth / Snappy / Bouncy / Gentle tiles hold a name, a readout and a live track, and paint as stadiums because `.toggle-group__item { border-radius: var(--radius-pill) }` (`toggle-group/styles.css:67-70`) applies whatever the content.

The shape half is already ruled. The radius canon keeps the stadium for single-line controls (`--radius-control`, `--radius-tab`, `--radius-badge`) and names `--radius-field`, the 16 px card rung, for multi-line holders (`DESIGN.md:385-391`; `radius.css:21`: "a box is not a stadium"). Four questions are open:

1. **Owner.** Which primitive owns a selectable tile that holds more than one line: ToggleGroup, Chip, Card, Surface, RadioGroup, or a new one.
2. **Corner.** How the corner follows the content, so a holder is correct by construction rather than by a per-site class.
3. **States.** Selected, hover, focus and press, each on its own channel, each visible in light, dark and the preference arms.
4. **Engagement.** D-2: every component shows engagement, in the iOS-27 register (the commit flood, the scale pop, the glide).

**Siblings on the same mechanism** (INBOUND-MAP area 1, all F-30b): UIA-KF-046 (the preset tiles, the easing specimen tiles, the Curve preset strip), UIA-V-60 (value.js ConsoleRail, a vertical four-item column on the stadium), UIA-V-180 (a tag chip that wraps to two lines), UIA-KF-047 (matrix cells as circles), UIA-F-85 and UIA-F-141 (the one-of-N radius re-rank), UIA-F-100 (the full-width disclosure trigger), UIA-V-332 (full-width stacked choice rows), UIA-KF-111 (the stepper). UIA-V-152 and UIA-V-377 are cured at HEAD (`glass-chip.css:59-62`, `:36`) and ride F-68's repin.

**Interfaces only, out of D4's scope:** the off-role 12 px rung (F-30a; `--radius-strip` is where a vertical enclosure like ConsoleRail's would land); the glass material and the plate veil (design loop D3; F-23, F-31); the dock (design loop D2); file placement (D1, N-1). Paths below are today's.

**Standing law every family is held to:** E-1 clean breaks, no aliases; E-2 no masking fallback; E-6 consumer dependence never preserves an obsolete API (each consumer updates in its own tranche); E-7 two sites or exported; E-11 bindings verified in e2e; P-1 KISS; D-1 liquid weight; D-2 engagement; D-4 Chrome and Safari; the WAI-ARIA contract (a one-of-N set is a `radiogroup` with one tab stop and arrow keys; N independent toggles are `aria-pressed`); the one selection engine (`useSelectionGroup`; `overfit-structure.test.ts:415-462` forbids a second assembly).

## 1 · Baseline at HEAD (measured here)

### 1.1 The witness battery

Every family must turn these green or name the row it leaves RED and why.

| id | property that must hold | HEAD reading | probe |
|---|---|---|---|
| T-1 | Curvature does not track content: past its control rung, a holder's used corner stops growing and equals a named role rung | **RED.** ToggleGroupItem: 25.02 px on 208×50 (1.25 rungs), 49.57 px on 150×99.1 (2.75 rungs), 29.08 px on a wrapped label at 110×58.2. Chip pill wrapped: 36.23 px on 96×72.5. Used corner over half-height is 1.00 in every case: a stadium at every size. Playwright WebKit: 9999px on 208×48.9 and 150×99.1 | `probe.mjs`, `wrap.mjs`, `wk.mjs` |
| T-2 | A one-line item stays a stadium | GREEN. 20 px on 76.4×40 and on the 64×40 vertical item | `probe.mjs` S3, S4 |
| T-3 | The selected state separates: selected vs unselected ≥ 3:1 on painted pixels, or a second carrier the item's own content cannot override, in light, dark and PRT (F-24's invariant) | **RED.** Preset tile fill 1.20:1 light, 1.23 dark (Playwright WebKit 1.21 / 1.21). Specimen 1.20 / 1.21. R3-02-08 reads 1.00 under PRT. In the preset composition the label's own `text-small text-foreground` pins ink `rgb(28,25,23)` and weight 400 in both states, so the fill is the only carrier. The library's ink and weight co-carriers (4.26:1 → 11.42:1, 500 → 600) survive only on bare labels | `probe.mjs` S1, S2 |
| T-4 | Focus paints whole and apart from selection: the 4 px ring (2 px outline + 2 px offset, `base.css:144-151`) follows the corner, is not cut by its host, and is not replaced by selection paint | Mixed. GREEN in the Card host (`contain: paint` clearance holds). **RED** in the specimen drawer: cut 2 px on the left by the FadingScroll port (grid pad 2 px, `EasingTarget.css:106`, against a 4 px reach). **RED** in the keyframes.js composition: the consumer's `outline: 1px dashed transparent` (`SpringPhysicsFacet.vue:293-296`) replaces the ring, so with no preset matching the live params (`NO_PRESET`, `:204`) the focused tile paints no focus at all (`cap/ring-nopreset-verbatim.png`) | `probe.mjs`, `ring-noselect.mjs` |
| T-5 | One-of-N ARIA and keys: `radiogroup` / `radio` / `aria-checked`, one tab stop, and in a grid every arrow moves and checks | ToggleGroup PARTIAL: `radiogroup`, one tab stop, but in a horizontal group laid out as a grid ArrowUp and ArrowDown do nothing (preset grid `0010 → 0010`, specimen grid the same) and in a vertical group ArrowRight does nothing. Card's arm **RED**: `role="option"`, four tab stops, arrows move nothing. Chip sets **RED**: `aria-pressed`, one stop per chip, arrows move nothing. SegmentedTabs `semantics="toggle"` announces `role="group"` with `aria-pressed` buttons for an exclusive choice | `probe.mjs`, `keys.mjs`, `tabs.mjs` |
| T-6 | Engagement: hover answers in a light channel as well as scale (R3-02-12, PRM), press squishes, a commit transitions, coarse taps do not latch hover (F-77) | PARTIAL. ToggleGroupItem: hover `scale: 1.015` plus the capsule gleam, press 0.97; the commit is a colour change. Card arm: hover `scale: 1` with a 0.05 fill, press 0.97. Chip: a commit flood (`scale` 1.074 and a `plus-lighter` wash, `glass-chip.css:27-57`) | `probe.mjs` |
| T-7 | No consumer paint: no consumer site sets the tile's radius, selection paint or focus outline | **RED.** `SpringPhysicsFacet.vue:93` (`rounded-pill`), `:293-309` (dashed selection outline and washes); `EasingTarget.vue:409-415` (a scoped reset of a track the group no longer paints, `toggle-group/styles.css:1-24`); `ConsoleRail.vue:228-231,264` (a hand-rolled stadium rail and items) | read-only census |
| T-8 | Both engines (D-4) | Chromium and Playwright WebKit banked for T-1 geometry and T-3 fill. Real Safari was not run by this seat | `wk.mjs` |

### 1.2 The measurements

Chromium 149 unless marked. Fill ratios are painted selected vs unselected with ink hidden; label ratios are the label's computed ink composited on its sampled fill.

| scene | box (w×h) | computed / used corner | used ÷ h/2 | fill sel:unsel, light / dark | label ink on fill, sel / unsel | ring | keys | hover / press |
|---|---|---|---|---|---|---|---|---|
| S1 preset tiles, bare | 208×50 | 9999px / 25.02 | 1.00 | 1.20 / 1.23 | 8.44 / 10.12, weight 400 both | whole | 1 stop; Right moves, Up/Down dead | 1.015 / 0.97 |
| S1 verbatim (the consumer's paint) | 208×50 | 9999px / 25.02 | 1.00 | 1.09 / 1.02; the carrier is a 1 px dashed violet outline at 0.65, 2.54:1 on the selected fill | 15.14 / 13.85 | replaced by the consumer outline | as bare | 1.015 / 0.97 |
| S2 specimen tiles | 150×99.1 | 9999px / 49.57 | 1.00 | 1.20 / 1.21 (Playwright WebKit 1.22 / 1.20) | 11.42 (600) / 4.26 (500); dark 12.69 / 7.48 | cut 2 px left | 1 stop; Down dead | 1.015 / 0.97 |
| S3 single line | 76.4×40 | 9999px / 20 | 1.00 | 1.20 / 1.21 | 11.42 (600) / 4.26 (500) | whole | 1 stop | 1.015 / 0.97 |
| S4 vertical column | 64×40 | 9999px / 20 | 1.00 | 1.20 / 1.21 | as S3 | whole | Down moves, Right dead | 1.015 / 0.97 |
| S5 Card `selected` | 226×53.2 | 16px / 16 | 0.60 | 1.29 / 1.32 (Playwright WebKit 1.27 / 1.31) | 9.90 / 12.78, 400 both | whole | 4 stops; arrows move nothing; `role="option"` | 1 / 0.97 |
| S6 Chip `cell`, selectable | 55.8×53.5; 62×57.5 when on (scale 1.074) | 16px / 16 | 0.56-0.60 | 1.49 / 3.30 | light 8.86 / 5.93; on the dark flood 3.62 | whole | 4 stops; `aria-pressed` | 1.015 / 0.97 |
| S7 value.js strip (Chip `icon`) | 44×44; 47.3 when on | 9999px / 22 | 1.00 | 1.50 / 3.33 | on the dark flood 3.56 | whole | 3 stops; `aria-pressed` | 1.015 / 0.97 |
| S8 Button, three-line label | 96×65.4 | 20px / 20 | 0.61 | n/a | n/a | whole | n/a | 1.015 / squash 1.03 × 0.93 |
| S9 SegmentedTabs | track 302.3×39.6; tabs 73.6×31.6 | track 10003px, tabs 9999px | 1.00 | n/a | n/a | n/a | `role="group"` + `aria-pressed`, 1 stop | n/a |

Shape candidates on the two consumer tiles, rendered by overriding the item corner in the harness (`shapes.mjs`, `cap/shape-{light,dark}-{stadium,rungHalf,field,panel12}.png`): the rung-half bound gives 20 px on the 208×50 preset tile (md rung 40) and 18 px on the 150×99.1 specimen (sm rung 36); `--radius-field` gives 16 on both; `--radius-panel` gives 12 (F-30a's rung, calibration only). At both tile sizes 16 and 20 read as cards; the stadium reads as a lozenge on the preset tile and as an oval on the specimen.

### 1.3 Corrections and candidate rows

1. **The pins moved.** keyframes.js pins `@mkbabb/glass-ui` `10.0.1` (`package.json:78`) and fourier-analysis pins `10.0.1` (`web/package.json:19`); value.js keeps `^7.0.0` (`package.json:89`). R2-03-11 recorded keyframes.js on `7.0.0`. The tile defect is live on keyframes.js's installed version.
2. **The canon holds two content-following laws that disagree.** Button's bound (`radius.css:49-57`, `button/styles.css:74`: the corner is half the control rung, so a wrapped label keeps single-line curvature) measures 20 px on a three-line md button. The field row (`radius.css:21`, `DESIGN.md:386`) gives a multi-line holder 16 px. A wrapped md control gets 20 by one law and 16 by the other.
3. **A canon test pins the defect.** `radius-role-canon.test.ts:555-568` asserts that `.toggle-group__item` contains `border-radius: var(--radius-pill)`. It is an ordinary `it`, not the F-30a latch at `:457-462`. Every family re-points it.
4. **Grid arrows are dead** (candidate row; no REGISTRY hit for it at HEAD). ToggleGroup takes the engine's axis-derived arrows (`useSelectionGroup.ts:241-250` over `useTabRovingFocus`), which is the tablist model. A one-of-N set laid out as a grid (both keyframes.js grids) moves on Left/Right only; the APG radio group moves on all four arrows.
5. **The consumer spent the focus channel on selection** (candidate row, consumer-side). Because the library's selected state separates at 1.20:1, keyframes.js painted its own selection on `outline` (`SpringPhysicsFacet.vue:293-309`), which is the ring's property. The result is a focused tile with no visible focus (T-4). The producer half is T-3.
6. **Card's `selected` arm has no consumer.** No caller in value.js, keyframes.js, fourier-analysis or chicago. Its one caller is `demo/stories/display/card.vue:121-137`, which hand-wires `role="listbox"` and per-card Enter and Space handlers: four tab stops, no arrow keys, `role="option"` outside any listbox the component knows about. `Card.vue:66-68` binds `role` and `tabindex` after `$attrs`, which is UIA-F-43 (F-70).
7. **Two ARIA answers for one control class.** ToggleGroup `type="single"` is a `radiogroup`; SegmentedTabs `semantics="toggle"` is a `group` of `aria-pressed` buttons (`SegmentedTabs.vue:320`). Both are one-of-N choosers.

### 1.4 The code in play

- `toggle-group/styles.css:51-86` (the item: geometry and type only; `:67-70` the stadium), `:116-124` (the on-state, a `background-color` the `.control-surface` background-image layers paint over, R3-02-08), `:143-156` (forced colors).
- `toggle-group/ToggleGroupItem.vue:78-96`: a fixed `<button>` composing `control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring`; an `#indicator` slot; no `as` or `asChild`.
- `toggle-group/ToggleGroup.vue:42-48` (props: `type`, `orientation`, `size`, `class`), `:87-118` (the engine, indicator declined).
- `card/Card.vue:32-68` (`selected` presence makes an option), `card/styles.css:138-199` (the selectable arm: registered `--card-fill`, 0.05 hover and 0.12 selected fills on a gradient layer, outline ring, press 0.97, no hover lift).
- `chip/types.ts:9`, `chipVariants.ts:13-17` (`shape: pill | cell | icon`), `styles/glass/glass-chip.css:27-62` (the flood and the cell corner).
- `radio-group/RadioGroupItem.vue:36-49`: reka's `RadioGroupItem` on the 44 px `control-bit` seat, a dot, no content slot. Its roving is reka's, outside the one engine.
- `tabs/styles/segmented.css:80-110`: the vertical strip re-binds its corner to `--radius-strip` (radius.css:149-155, "Law 2, capsule-vs-card") by orientation, the one place the capsule-vs-card law is applied.
- `styles/tokens/color-radius.css:145-157`: `--ink-perimeter` 0.48 ("a control's own edge · the focus ring · the selection indicator — 3.0:1"), `--fill-selected` 0.12, and the rule "where the fill is the SOLE carrier ... ≥3:1 against the unselected sibling, or it is a lie".

### 1.5 Consumer census (read-only)

| repo | site | what it is | HEAD reading |
|---|---|---|---|
| keyframes.js | `demo/scenes/spring/SpringPhysicsFacet.vue:81-107`, `:285-309` | the four preset tiles: ToggleGroup `type="single"`, a two-column grid; each item carries a name row and a live track; item classes `flex-col items-start … rounded-pill bg-background … leading-normal` (`:93`); a scoped dashed selection outline | 208×50, 9999px; T-3, T-4, T-7 RED |
| keyframes.js | `demo/scenes/easing/EasingTarget.vue:115-156`, `EasingTarget.css:100-116,192-213`, `EasingTarget.vue:403-415` | the easing specimen tiles: ToggleGroup `size="sm"`, auto-fill `minmax(150px, 1fr)`, a 3.25 rem stage and a name, `data-surface="opaque"`, inside FadingScroll | 150×99.1, 9999px; ring cut 2 px |
| keyframes.js | `EasingTarget.vue:54-68` | the family filter, single-line ToggleGroup `size="sm"` | a legal stadium |
| value.js | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:88-122,172-189` | specimen strip: `role="group"` of selectable Chips, `shape="icon"` circles holding a glyph and a label | 44×44 circles; `aria-pressed` for an exclusive choice |
| value.js | `demo/picker/controls/ComponentSliders/ConsoleRail.vue:12-35,228-231,264` | a hand-rolled vertical `tablist` of four channel letters in a stadium rail (UIA-V-60) | single-line items; the enclosure is the F-30a `--radius-strip` question |
| value.js | `demo/palettes/browser/dialog/MigratePalettesDialog.vue:13-35` | stacked full-width action Buttons with `rounded-full` (UIA-V-332) | actions, not a selection set; single line |
| fourier-analysis | `web/src/components/equation/FunctionInput.vue:196-209,290-305` | preset pills: Buttons with `aria-pressed` in a `flex-wrap` row, with a recorded refusal of `role="radiogroup"` | single line; no primitive under a one-of-N set |
| fourier-analysis | `web/src/components/visualization/gallery/GalleryCard.vue:27,73-97` | a gallery card with its own batch checkbox, like and admin controls | multi-select with interactive descendants; not a tile of this kind |
| glass-ui | `demo/stories/display/card.vue:117-137` | Card's selectable arm, hand-wired listbox | 4 tab stops, no arrows |

The "Curve preset strip" named in UIA-KF-046 did not resolve to a site at the consumer's HEAD by grep; the curve preset control inside glass-ui's EasingPicker is a Select (`easing/EasingPicker.vue:519-533`).

## 2 · Facts every family inherits

### 2.1 CSS cannot read a box's own block size into its corner

Measured in Chromium 149 and Playwright WebKit 26.5 (`supports.mjs`):

- `container-type: size` on an auto-height item collapses it to its padding (8 px). An element cannot query its own block size without losing it.
- `anchor-size()` is invalid in `border-radius` in both engines.
- `if()` parses in Chromium and not in Playwright WebKit, and it reads style, not size. Typed `attr()` parses in Chromium only.
- A percentage radius resolves per axis (`calc(10% + 8px)` stays a percentage), so it paints an elliptical corner on any non-square box: the lens F-18 already convicts on the dock.
- A pseudo-element can query its originating element as a container in both engines, on the inline axis only.

So a content-derived corner has two honest forms: bound to the control rung (continuous, pure CSS, the Button law) or measured (discrete, script). There is no third.

### 2.2 The selected state needs a channel the content cannot erase

The on-state fill paints under the plate (R3-02-08) and separates 1.20:1. The library licenses it on ink and weight (`toggle-group/styles.css:93-114`), and a tile's content brings its own typography, which overrides both (S1: weight 400 and full ink in both states). A tile's selected state therefore needs a carrier outside the content's reach: the plate's own fill layer, the perimeter edge at `--ink-perimeter`, a mark, or a flood. `outline` is the ring's and `box-shadow` is the ring's and the rim's (`toggle-group/styles.css:93-101`); selection spends neither.

### 2.3 The ring

`.focus-ring:focus-visible` paints a 2 px outline at `--ink-perimeter`, offset 2 px (`base.css:144-151`). It follows the corner in Chromium and Safari, reaches 4 px, and any host with a scroll port or `contain: paint` must leave 4 px of clearance. The specimen grid leaves 2.

### 2.4 One engine, one keyboard

Every family takes roving focus, role-per-mode ARIA and the commit from `useSelectionGroup`. Any grid-arrow answer (§1.3 item 4) is an engine change that the dock run and SegmentedTabs must survive unchanged.

### 2.5 The common floor (not a differentiator)

Forced colors (`toggle-group/styles.css:143-156` is the pattern), the dark arm, PRM (the hover keeps a light channel; R3-02-12), coarse pointers (no hover latch; F-77), the 44 px touch floor, and a Safari cell for every visual claim.

## 3 · Axes, and where each family sits

| family | who owns the shape | who owns the semantics | correct by | public API delta | reach beyond the tile |
|---|---|---|---|---|---|
| D4-A the corner reads the box | a role rule in the radius canon | unchanged | construction (content) | none, or one token | every stadium holder that can wrap (29 CSS declarations and 9 utility sites on the stadium roles) |
| D4-B the choice card | a new component | the new component, through the engine | construction (the component) | a new compound | O-59 tile rows only |
| D4-C selection as a behaviour | whatever container the consumer renders | a headless group | composition | a headless group; Card loses `selected` | every surface can become an option |
| D4-D the tile shape on ToggleGroup | ToggleGroup, by a declared axis | ToggleGroup | declaration | one prop | ToggleGroup and Chip share one shape vocabulary |
| D4-E no multi-line selectable | the canon (a stadium, always) | ToggleGroup or SegmentedTabs | removal of the idiom | none, or a DEV guard | consumer information design |

## 4 · The families

### D4-A · The corner reads the box (a content-derived role rule)

**Charter.** The corner stops being a per-component choice. One role rule, stated once in the radius canon, maps a holder's extent to its corner: at its control rung it is a stadium; past its rung it keeps a fixed, named corner. Every holder that composes the rule is correct whatever its content: ToggleGroupItem, the pill Chip that wraps (UIA-V-180), the disclosure trigger (UIA-F-100), the stepper (UIA-KF-111). No prop. Button already obeys one form of the rule, so the family generalizes a law the canon holds in one place.

**Mechanism.** Two arms; pass 1 picks one. They share the family because both derive the corner from the box.

A1, closed form (CSS). Button's bound becomes the control role:

```css
/* theme/radius.css — the role, stated once */
@theme static {
  --radius-control: calc(var(--control-rung) / 2); /* was var(--radius-pill) */
}
/* every holder names its rung; nothing else */
.button             { --control-rung: var(--button-size); }            /* button/styles.css:74 folds in */
.toggle-group__item { --control-rung: var(--toggle-group-item-size);
                      border-radius: var(--radius-control); }          /* :67-70 */
.glass-chip         { --control-rung: var(--chip-size); }              /* a rung the chip does not yet name */
```

One line is exactly the stadium (the box equals the rung). More lines keep the single-line curvature: 20 px at md, 18 at sm, 22 at lg, measured 20 on the 96×65.4 button.

A2, measured (script). A shared extent stamp compares the border-box block size with the rung and writes `data-extent="line" | "block"`; the canon rule reads the attribute:

```ts
// _shared/extent/vExtent.ts — one ResizeObserver per document, one stamp per holder
const ro = new ResizeObserver((entries) => {
  for (const e of entries) {
    const el = e.target as HTMLElement;
    const rung = parseFloat(getComputedStyle(el).getPropertyValue("--control-rung")); // @property <length>
    el.dataset.extent = e.borderBoxSize[0].blockSize > rung + 0.5 ? "block" : "line";
  }
});
```

```css
[data-extent="block"] { border-radius: var(--radius-field); } /* exactly the 16 px row */
```

**Shape.** A1: rung/2 past the rung. A2: `--radius-field` past the rung. Both keep the one-line stadium.

**Selected state.** Unchanged ownership (ToggleGroup's on-state), so A inherits §2.2 and has to fix it as a floor: the fill moves onto the plate's own layer and a perimeter edge at `--ink-perimeter` co-carries. A contributes nothing new here.

**Keyboard and ARIA.** Unchanged; §1.3 item 4 stays open unless the engine answers it.

**Engagement.** Unchanged: the capsule hover (1.015 and the gleam) and the 0.97 press. On a 208×50 tile the lift moves each edge about 1.6 px.

**HEAD reading of the center.** The law is live in one component. Button: 20 px at 40 and at 65.4 (ratio 1.00, then 0.61). ToggleGroupItem: 25.02, 49.57 and 29.08 px as the box grows (ratio 1.00 throughout). Chip pill: 36.23 px on a wrapped 72.5 px box.

**Public API and consumer migration.** No prop. A2 adds a shared directive or composable (internal). The token meaning of `--radius-control` changes, which is a clean break for any consumer reading it as the stadium (census owed). keyframes.js deletes `rounded-pill` from `SpringPhysicsFacet.vue:93` (a utility beats the component layer and would re-impose the stadium) and the selection paint at `:293-309`; `EasingTarget.vue` needs nothing for the shape. value.js: the strip's `shape="icon"` is a declared circle, which A does not touch; ConsoleRail gains nothing unless it composes a library holder. fourier-analysis: nothing (single-line pills).

**Known risks.**
- A1's multi-line corner is 18-22 px, not the 16 px the field row names: the canon must choose between its two laws (§1.3 item 2), and the owner asked for "more card like".
- A2 puts shape in script: without script the holder is a stadium, which is the defect returning silently (E-2). The first-paint timing needs measuring.
- Blast radius: every stadium reader that composes the rule changes when its content wraps. The census of which of the 29 declarations should compose it is owed.
- A consumer utility (`rounded-pill`, `rounded-full`) still overrides the rule. Nothing in the library can stop it without `!important`.
- A answers the corner only; it leaves the owner question (ToggleGroup keeps the tile) and the states to the floor.

**Born-RED witness.** *Curvature never tracks content.* For every library holder on the control role, adding a line leaves its used corner unchanged and a one-line box stays at h/2. HEAD: RED on ToggleGroupItem (25.02 → 49.57 px) and the pill Chip (36.23 px at 72.5); GREEN on Button.

### D4-B · The choice card (a dedicated selectable-card primitive)

**Charter.** A new compound owns the idiom end to end: `ChoiceGroup` and `ChoiceCard` (names open). A choice card is a card that is a radio. It has card anatomy (a title, a meta line, a body slot for live content, an optional trailing mark), the card corner (`--radius-card`), the card pad pair (12 / 8, r : pad = 16 : 12), its own selected register and its own engagement. The group owns the grid (auto-fill columns) and the keyboard. ToggleGroup goes back to single-line pills, where the stadium is right.

**Mechanism.**

```vue
<ChoiceGroup v-model="preset" aria-label="Spring presets" min-column="12rem">
  <ChoiceCard v-for="(t, i) in demo.tracks" :key="t.preset.name" :value="t.preset.name">
    <template #title>{{ t.preset.name }}</template>
    <template #meta>{{ t.preset.response }} / {{ t.preset.dampingFraction }}</template>
    <PresetTrack :index="i" />
  </ChoiceCard>
</ChoiceGroup>
```

```css
.choice-card {
  display: grid; grid-template-areas: "title meta" "body body";
  border-radius: var(--radius-card); padding: var(--space-atom) var(--space-body);
  background-image: linear-gradient(var(--choice-fill), var(--choice-fill)); /* on the plate's own layer */
  border-color: oklch(from var(--foreground) l c h / var(--ink-seam));
}
.choice-card[data-state="on"] {
  --choice-fill: oklch(from var(--foreground) l c h / var(--fill-selected));
  border-color: oklch(from var(--foreground) l c h / var(--ink-perimeter)); /* the 3:1 co-carrier */
  --choice-flood-t: 1;                                                     /* the commit flood */
}
```

`ChoiceCard` renders a `<button role="radio">` whose attributes, roving tabindex and commit come from `useSelectionGroup` through the group's registry (the ToggleGroup `context.ts` shape).

**Shape.** 16 px by construction; the component never wears the stadium.

**Selected state.** Fill on the plate layer (0.12), the perimeter edge at 0.48 (3:1 by the register's own definition), an optional check mark in the trailing slot. The Chip flood is the candidate commit channel, but on the dark flood the Chip's own label measures 3.62:1 (S6), so the flood needs an ink answer before it is borrowed.

**Keyboard and ARIA.** `radiogroup`, `radio`, `aria-checked`, one tab stop. The group is a grid, so B needs the grid-arrow answer (§1.3 item 4) as an engine extension.

**Engagement.** Hover lifts one elevation rung (Card's resting → floating cast, `card/styles.css:116-119`) with a light channel; press 0.97 on the spatial spring; the commit flood trails the spatial leg (the IOS27-REFERENCE commit bar, `:67-68`); PRM keeps the light channel and drops scale.

**HEAD reading of the center.** No such primitive. The nearest composites: Card's arm at 16 px with fill 1.29 / 1.32, no lift, four tab stops, `role="option"`; Chip `cell` at 16 px with the flood at 1.49 / 3.30, `aria-pressed`, one stop per chip.

**Public API and consumer migration.** A new subpath (for example `@mkbabb/glass-ui/choice`) with the two components and their types. E-7: three sites in two repos (keyframes.js twice, value.js once). Clean breaks that follow: Card's `selected` arm is deleted (no consumer, §1.3 item 6; `card/styles.css:121-199` and `Card.vue:36-37,52,65-68` go), and Chip's README steers exclusive sets to the group. keyframes.js: `SpringPhysicsFacet.vue:81-107` and `EasingTarget.vue:115-156` compose `ChoiceGroup`; `:285-309` and `:403-415` delete. value.js: `EasingSpecimenStrip.vue:88-122` composes a compact `ChoiceGroup` (a `radiogroup` replaces the `aria-pressed` chips). ConsoleRail and fourier's pills are single-line: ToggleGroup, in their own addenda.

**Known risks.**
- A near-twin of ToggleGroup: design-idioms §9 requires a recorded divergence, and if the only difference is the corner and a grid, B collapses into D.
- New surface area (the §13 customization census, a story, tests, D1 placement).
- Two selected registers (ChoiceCard and ToggleGroup) unless one register is shared.
- The grid keyboard is new engine work.
- P-1: the largest implementation of the five.

**Born-RED witness.** *Every multi-line one-of-N site composes the choice card.* No consumer site puts more than one line into a ToggleGroupItem or a selectable Chip, and the choice card's contract holds (16 px, `radio`, one tab stop, selected ≥ 3:1 painted in light, dark and PRT). HEAD: RED; three sites (`SpringPhysicsFacet.vue:88-106`, `EasingTarget.vue:124-155`, `EasingSpecimenStrip.vue:101-120`) and no primitive.

### D4-C · Selection as a behaviour (the container owns the shape, the group owns the semantics)

**Charter.** Separate the two jobs. Selection becomes a behaviour any surface can take: a headless group on `useSelectionGroup` stamps radio semantics, the roving tabindex, `data-state`, click and keys onto whatever element the consumer renders, whether a Card, a Surface or a Chip. The shape is the container's role (a Card is 16 px because it is a card). One selected register keys on `[data-state="on"]` and composes onto any plate. ToggleGroup becomes the pill-shaped preset of the same behaviour.

**Mechanism.** Scoped-slot form (a directive or `asChild` are the alternatives pass 1 weighs):

```vue
<SelectionGroup v-model="preset" type="single" aria-label="Spring presets" class="grid grid-cols-2 gap-2">
  <SelectionItem v-for="t in demo.tracks" :key="t.preset.name" :value="t.preset.name" v-slot="{ itemProps }">
    <Card v-bind="itemProps" size="sm" tier="quiet"> … </Card>
  </SelectionItem>
</SelectionGroup>
```

```css
/* one state register, composed by any plate that carries the stamp */
[data-selection-item] { background-image: linear-gradient(var(--selection-fill), var(--selection-fill)); }
[data-selection-item][data-state="on"] {
  --selection-fill: oklch(from var(--foreground) l c h / var(--fill-selected));
  border-color: oklch(from var(--foreground) l c h / var(--ink-perimeter));
}
```

`ToggleGroupItem` becomes `SelectionItem` plus the control chassis; Card's own `role`, `tabindex` and `aria-selected` bindings are deleted, and its engagement rules re-key from `[role="option"]` to the stamp.

**Shape.** The container's: Card 16, Chip `cell` 16, a ToggleGroup pill the stadium. A Surface has no corner of its own ("a plate is paint, not a box", `DESIGN.md:523`), so a Surface item needs a stated rule.

**Selected state.** One register over any plate: the fill on the plate's own layer and the perimeter edge. Card's `--card-fill` gradient (`card/styles.css:4-15,138-167`) is the precedent to generalize.

**Keyboard and ARIA.** `radiogroup` / `radio` / `aria-checked`, one tab stop, from the engine. A radio's children are presentational, so an item with an interactive descendant (a Button, a link, fourier's GalleryCard controls) cannot be an item; C needs a guard.

**Engagement.** The container's own engagement arm plus the register's commit transition. Card's arm today has no hover lift (S5), so C inherits that gap unless the Card arm gains one.

**HEAD reading of the center.** The container half exists: Card's arm paints 16 px, a 0.12 fill on its own layer (1.29 / 1.32), press 0.97. The semantics half cannot reach a Card: `ToggleGroupItem.vue:78` renders a fixed `<button>`, and Card stamps `role="option"` and `tabindex="0"` on every card itself (`Card.vue:66-68`: four tab stops, arrows move nothing).

**Public API and consumer migration.** New `SelectionGroup` and `SelectionItem` (on `/toggle-group` or a new subpath); Card's `selected` prop deleted (E-1; the demo story re-points). keyframes.js: both grids become `SelectionGroup` over `Card size="sm"` (the specimen tiles can keep KF-ET-21's "contents do not float" ruling with `surface="opaque"`); `:285-309` and `:403-415` delete. value.js: the strip becomes `SelectionGroup` over Chip `cell`; ConsoleRail could become `SelectionGroup` with `role="tablist"` if it controls a panel. fourier-analysis: `FunctionInput.vue:196-209` becomes a `SelectionGroup` over its Buttons, or a ToggleGroup.

**Known risks.**
- The elegant-reduction trap: "the container owns the shape" leaves the shape rule unsolved for any container without a role corner (Surface), and for Card-in-Card nesting (the preset tiles sit inside a quiet Card at 16 with a 16 px pad).
- Attribute delivery through a slot, a directive or `asChild` is exactly where stale bindings no-op silently (E-11, UIA-F-43); only e2e catches it.
- Every consumer composes two components where it composed one (P-1).
- One register across three plate recipes (the Card gradient, `.control-surface`, the Chip flood) may need an arm per plate.

**Born-RED witness.** *Selection is a behaviour, not a component.* A Card and a Surface inside `SelectionGroup` read `role="radio"` and `aria-checked` with exactly one tab stop, arrows move and check, and `Card.vue` declares no `role` or `tabindex` of its own. HEAD: RED; `Card.vue:66-68` stamps `role="option"` and `tabindex="0"` on each card (four stops measured, arrows inert), and `ToggleGroupItem.vue:78` cannot render as anything but a button.

### D4-D · The tile shape on ToggleGroup (a declared shape axis)

**Charter.** ToggleGroup keeps the whole idiom and gains one geometry axis at the group, in the vocabulary Chip already uses: `shape: "pill" | "cell"`, `pill` the default. `cell` sets the item corner to the field rung, its layout to a start-aligned column, its padding to the card pad pair and its leading to body leading, and gives the group an auto-fill grid. The consumer states the shape once at the group. One primitive, one prop.

**Mechanism.**

```ts
// ToggleGroup.vue
export type ToggleGroupShape = "pill" | "cell";
export interface ToggleGroupProps extends ControlProps { type: SelectionMode; orientation?: Orientation;
  size?: ControlSize; shape?: ToggleGroupShape; class?: HTMLAttributes["class"] }
// template: :data-shape="props.shape"
```

```css
.toggle-group[data-shape="cell"] {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(var(--toggle-group-cell-min, 10rem), 1fr));
}
.toggle-group[data-shape="cell"] .toggle-group__item {
  flex-direction: column; align-items: stretch; justify-content: flex-start; text-align: start;
  gap: var(--space-residue); padding: var(--space-atom) var(--space-body);
  line-height: var(--type-leading-body); border-radius: var(--radius-field);
}
```

The `cell` corner is one declaration shared with Chip's `cell` (`glass-chip.css:59-62`), so the two selection atoms carry one shape vocabulary.

**Shape.** `--radius-field` (16 px) in `cell`; the stadium in `pill`.

**Selected state.** ToggleGroup's on-state, fixed per §2.2: the fill onto the plate layer and a perimeter co-carrier. The `cell` arm cannot rely on the ink and weight co-carriers, because cell content brings its own typography.

**Keyboard and ARIA.** Unchanged engine; `cell` is usually a grid, so D needs the grid-arrow answer as well.

**Engagement.** The capsule hover and press as today; whether `cell` also takes Chip's commit flood is a pass-1 question.

**HEAD reading of the center.** No axis: `ToggleGroupProps` has `type`, `orientation`, `size` and `class` (`ToggleGroup.vue:42-48`). Consumers author the cell per item (`SpringPhysicsFacet.vue:93`; `EasingTarget.vue:129` `flex-col gap-1.5 px-2 py-2.5`) and reset a group plate that no longer exists (`SpringPhysicsFacet.vue:83` `rounded-none bg-transparent p-0 shadow-none backdrop-filter-none`; `EasingTarget.vue:409-415`).

**Public API and consumer migration.** One prop and one type on `/toggle-group`. `radius-role-canon.test.ts:555-568` re-points to two arms (pill keeps the stadium, cell reads the field rung). keyframes.js: `<ToggleGroup shape="cell">` at `SpringPhysicsFacet.vue:81`, the item utilities at `:93` and the paint at `:285-309` delete, the group reset at `:83` deletes; `EasingTarget.vue:116` gains `shape="cell"`, `:129` and `:403-415` delete. value.js: the strip moves from Chip circles in a `group` to `<ToggleGroup shape="cell" size="sm">` (a `radiogroup`); ConsoleRail to a vertical pill ToggleGroup in its addendum. fourier-analysis: `FunctionInput.vue:196-209` to a pill ToggleGroup.

**Known risks.**
- A declared shape can be wrong: a `pill` item whose label wraps still balloons (29.08 px at 58.2 px, S10). D is not correct by construction.
- Two `cell` readers (Chip and ToggleGroup) drift unless they share one declaration.
- Variant creep: §13's fence adds an axis only where the hierarchy choice is real; pass 1 must show it is.
- The registry's other host, a card shape on RadioGroup, would carry reka's second roving machine outside the one engine; D keeps it on ToggleGroup.

**Born-RED witness.** *The tile is declared once, at the group.* `<ToggleGroup shape="cell">` items compute `border-radius: 16px`, a column layout and body leading, and the keyframes.js preset and specimen tiles mount with no radius, layout or selection utilities on their items. HEAD: RED; no `shape` prop, and the two-line item computes 9999px (used 25.02 on 208×50).

### D4-E · No multi-line selectable (a segmented control plus a detail panel)

**Charter.** Remove the idiom instead of shaping it. A selectable item is one line: a label, a glyph, or both side by side. Anything more is detail, and detail belongs to the selection, not to each option. The Spring presets become a single-line one-of-N control whose stadium is canon-correct; the selected preset's response, damping and live track move to one detail row (the heatmap already plots the parameter space and could mark the four presets as points; the sliders already show the values). The specimen grid becomes figures: the plate holds one thing (the portrait), and the name is a caption outside the plate, or the selected name is promoted to the header EasingTarget already has (`EasingTarget.vue:16-31`). The owner's "cluttered" is answered with fewer boxes.

**Mechanism.** Mostly consumer information design, with one library rule:

```vue
<ToggleGroup v-model="preset" type="single" aria-label="Spring presets">
  <ToggleGroupItem v-for="p in presets" :key="p.name" :value="p.name">{{ p.name }}</ToggleGroupItem>
</ToggleGroup>
<PresetDetail :preset="active" :tracks="demo.tracks" />   <!-- one row: readout + the four-track race -->
```

```ts
// library, DEV only: a selection item that exceeds its rung is refused loudly
if (import.meta.env.DEV && el.getBoundingClientRect().height > rung + 0.5)
  console.error("[ToggleGroupItem] an option holds more than one line; move the detail out of the option");
```

**Shape.** The stadium, always, and correct because every option is one line.

**Selected state.** For the segmented form, SegmentedTabs' travelling indicator (the plate that glides and squishes between options) carries selection as a body, not a fill tint; for ToggleGroup pills, the floor in §2.2.

**Keyboard and ARIA.** A linear row: Left and Right suffice, so the grid-arrow question disappears. SegmentedTabs' toggle semantics would need to become a `radiogroup` for an exclusive set (§1.3 item 7).

**Engagement.** The strongest in the library for this shape: SegmentedTabs' glide and squish indicator, which IOS27-REFERENCE rates at 100% of the reference (`:65,68`), plus drag-to-select.

**HEAD reading of the center.** The single-line cases pass: 76.4×40 at 20 px (ratio 1.00), the vertical column the same, SegmentedTabs tabs at h/2. The multi-line sites are 1.25 rungs (208×50) and 2.75 rungs (150×99.1) tall, and value.js puts a glyph and a label into a 44 px circle.

**Public API and consumer migration.** No library API, or the DEV guard only. The migration is a redesign in each consumer's tranche: keyframes.js rebuilds the Spring facet as a control plus a detail row (keeping or relocating the four-track race, SPF-3) and the specimen grid as figures; value.js drops the in-circle label (it already carries `aria-label`); ConsoleRail is already one line, so UIA-V-60 reduces to its enclosure (the F-30a `--radius-strip` interface); fourier-analysis is already one line.

**Known risks.**
- It removes information density the consumers designed for (the four tracks racing side by side is the point of SPF-3; 28 portraits without names may not be recognizable).
- N-9 asks for a fix "at the root". E ships a guard and a ruling, and the visual result lands only in consumer tranches.
- It leaves F-30b's other rows (UIA-V-180 wrapped chips, UIA-KF-047 matrix cells, UIA-F-100 the disclosure trigger) to another family.
- The guard is a DEV-only runtime check; whether it counts as failing loud (E-2) or as process (P-1) is open.

**Born-RED witness.** *Every one-of-N option is one line.* Every selection item mounted on the consumers' routes has a block size equal to its control rung (±0.5 px), and the library refuses one that does not. HEAD: RED; 208×50 (1.25 rungs), 150×99.1 (2.75 rungs), and a 44 px circle holding a glyph and a label.

## 5 · Considered and not minted

| route | why not minted |
|---|---|
| The concentric relay derives the tile corner (`max(floor, ctx − inset)`) | Inside a 16 px Card with a 16 px pad it gives the 4 px floor, squarer than F-30a's "too square" 12 px. The nesting law (`radius.css:59-73`) exempts strictly inset discrete children from boundary sharing, so the relay is the wrong instrument for a tile |
| Keep the stadium and square it with `corner-shape: superellipse()` | Chromium only (`CSS.supports` false in Playwright WebKit 26.5); the canon keeps the shape axis off the contract (`radius.css:206-214`); a squircle stadium is still a stadium |
| A percentage radius that scales with the box | Elliptical corners on any non-square box (§2.1), the lens F-18 convicts |
| A card shape on RadioGroup | Shares D's mechanism (a shape axis on an existing selection primitive) and adds reka's roving, a second machine outside `useSelectionGroup`. Folded into D as the rejected host, pass-1 question D-5 |

## 6 · Pass-1 research questions

### D4-A
1. A1 or A2. Does the canon accept rung/2 (18 / 20 / 22 px) as the multi-line corner and amend `DESIGN.md:386`, or must the multi-line corner be exactly `--radius-field`, which forces A2? Render both on the three consumer tiles in both modes and put the pair to an owner glance.
2. A2 timing: does a ResizeObserver stamp land before the first paint on mount, on content change and on font swap, in Chromium and Safari, with no stadium frame? Per-frame capture from mount.
3. Census: which of the 29 stadium declarations and 9 utility sites hold content that can wrap, and which should compose the rule (Badge, the disclosure trigger, the stepper, dock controls)?
4. What stops a consumer's `rounded-pill` or `rounded-full` from re-imposing the stadium: a consumer lint, a DEV warning, or nothing?
5. F-29: the rung moves under `--ui-scale` and the coarse floor. Verify the corner follows the rung at the 44 px coarse cell.

### D4-B
1. Anatomy: do title, meta, body and a trailing mark cover all three consumer tiles and UIA-KF-047's matrix cell without per-site overrides? Prototype all three on one component.
2. Grid keyboard: should Up and Down move by row in an auto-fill grid, or linearly as the APG radio group does? Either way, what is the engine change, and do the dock run and SegmentedTabs keep their behaviour?
3. Divergence: what does ChoiceCard carry that `ToggleGroup shape="cell"` cannot? If nothing, B folds into D (design-idioms §9).
4. Which combination of fill, perimeter, mark and flood clears ≥ 3:1 on painted pixels in light, dark and PRT while the tile holds live consumer content (the kf ball and rail), and what ink does the flood need in dark (S6: 3.62:1)?
5. Does Card's `selected` arm retire, and does Chip's `mode="selectable"` narrow to independent toggles?

### D4-C
1. Slot, directive or `asChild`: which delivers `role`, `aria-checked`, `tabindex`, `data-state`, click and keys onto a Card or Surface with no silent attribute loss? Prove it in e2e (E-11, UIA-F-43).
2. What corner does a Surface item paint, given that a Surface has no corner of its own?
3. Content model: what happens when an item holds a Button or a link? A DEV guard, a split, or a documented refusal?
4. Can one `[data-state="on"]` register paint the Card gradient, `.control-surface` and the Chip flood, or does each plate need an arm?
5. Nesting: do 16 px tiles inside a 16 px quiet Card with a 16 px pad read as options or as sub-cards? Try a flush tier for the items.

### D4-D
1. Vocabulary: `shape="cell"` shared with Chip, or a distinct name? One CSS declaration for both atoms, or two readers of one token?
2. Scope: what does `cell` own beyond the corner (column layout, alignment, pad pair, leading, the grid template)? Mount the three consumer tiles with `shape="cell"` and no item utilities.
3. The wrap hole: does `pill` gain a no-wrap law with an overflow policy (R4-02-15 raised the same question for SegmentedTabs), or does D accept a ballooning wrapped pill?
4. Does `size` compose with `cell` under §13's no-contrivance fence?
5. RadioGroup as the host: rule it out on the one-engine arm, or show a reason to take reka's roving.

### D4-E
1. What does each consumer lose? Prototype the Spring facet as a control plus a detail row that keeps the four-track race, and the specimen grid as figures with captions outside the plate. Owner glance against the HEAD capture.
2. Is "an option is one line" enforceable at the root (a DEV refusal plus an invariant test), or only guidance? If only guidance, N-9's "at the root" is unmet.
3. Recognition: can 28 easing portraits be picked without their names? Research prior art in platform and design-tool easing pickers.
4. Which F-30b rows survive E (UIA-V-180, UIA-KF-047, UIA-V-332, UIA-F-100), and which family takes them?
5. Four long labels on a 390 px phone: the overflow policy (R4-02-15) and SegmentedTabs' responsive Select collapse.

## 7 · The approach-family registry and the born-RED witnesses

| id | family | mechanism | center | round-0 status |
|---|---|---|---|---|
| D4-A | the corner reads the box | one role rule derives the corner from the box: rung-bound in CSS (A1) or measured and stamped (A2) | the radius canon | minted |
| D4-B | the choice card | a new compound (`ChoiceGroup`, `ChoiceCard`): a card that is a radio, with its own anatomy, selected register and engagement | a new component | minted |
| D4-C | selection as a behaviour | a headless group stamps radio semantics onto any container; the container's role sets the corner; one state register | decomposition by responsibility | minted |
| D4-D | the tile shape on ToggleGroup | a declared group axis `shape: pill \| cell`, shared with Chip's vocabulary | a declared variant | minted |
| D4-E | no multi-line selectable | options are one line; detail moves to one panel; a DEV refusal guards the rule | information design | minted |
| D4-X1 | the concentric relay | `max(floor, ctx − inset)` for the tile | the nesting relay | not minted: 4 px floor; the nesting law exempts inset children |
| D4-X2 | the squircle stadium | `corner-shape` on the stadium | the shape axis | not minted: Chromium only; not the contract |
| D4-X3 | the percentage radius | `border-radius` in % | the box | not minted: elliptical corners |
| D4-X4 | RadioGroup card | a card shape on RadioGroup | a declared variant | folded into D4-D as a rejected host |

**The shared battery.** Every family must turn T-1..T-8 green (§1.1) or name the row it leaves RED. The open cells as minted:
- D4-A: T-3 and T-5 ride the floor, not the family; T-7 depends on the consumer deleting `rounded-pill`.
- D4-B and D4-D: T-5's grid arrows need the engine change.
- D4-C: T-1 for Surface items and Card-in-Card nesting.
- D4-E: T-1 by removal, not by rule; T-6 depends on SegmentedTabs becoming the host.

**Each family's own born-RED witness**, which proves its center rather than the symptoms:

| family | witness | HEAD reading |
|---|---|---|
| D4-A | **Curvature never tracks content.** For every library holder on the control role, adding a line leaves the used corner unchanged, and a one-line box stays at h/2 | RED: ToggleGroupItem 25.02 → 49.57 px as the box grows from 50 to 99.1 px; wrapped pill Chip 36.23 px at 72.5 px. GREEN: Button 20 px at 40 and at 65.4 px |
| D4-B | **Every multi-line one-of-N site composes the choice card**, and the card's contract holds (16 px, `radio`, one tab stop, selected ≥ 3:1 painted in light, dark, PRT) | RED: three sites compose ToggleGroupItem or a selectable Chip; no primitive exists |
| D4-C | **Selection is a behaviour.** A Card or Surface inside `SelectionGroup` is a `radio` with one tab stop and working arrows, and Card declares no `role` or `tabindex` of its own | RED: `Card.vue:66-68` stamps `role="option"` and `tabindex="0"` on each card (four stops, arrows inert); `ToggleGroupItem.vue:78` renders only a button |
| D4-D | **The tile is declared once, at the group.** `shape="cell"` items compute 16 px, a column layout and body leading, and the keyframes.js tiles mount with no item utilities | RED: no `shape` prop (`ToggleGroup.vue:42-48`); the two-line item computes 9999px (used 25.02 px) |
| D4-E | **Every one-of-N option is one line**, and the library refuses one that is not | RED: 208×50 (1.25 rungs), 150×99.1 (2.75 rungs), a 44 px circle holding a glyph and a label |

Common to every family, re-pointed rather than latched: `radius-role-canon.test.ts:555-568` (it asserts the stadium on `.toggle-group__item`) and the F-24 invariant row for the tile (selected vs unselected ≥ 3:1 on painted pixels in light, dark and PRT; HEAD 1.20 / 1.23 / 1.00).

## 8 · Scratch artefacts

All under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/`:
- `harness/` (`App.vue`, `h.css`, `main.ts`, `vite.config.mjs`), port 5471.
- `probe.mjs` → `cap/head.json`, `cap/head-{light,dark}-{bare,verbatim}.png`.
- `ring-noselect.mjs` → `cap/ring-nopreset-{bare,verbatim}.png` (T-4: the ring whole in bare, absent in the consumer's composition).
- `keys.mjs` (grid arrows, the kf outline contrast), `shapes.mjs` → `cap/shape-{light,dark}-{stadium,rungHalf,field,panel12}.png`, `supports.mjs` (§2.1, Chromium and Playwright WebKit), `wrap.mjs` → `cap/wrap.png`, `tabs.mjs`, `wk.mjs` (Playwright WebKit geometry and fill).
- One console 404 on the first page load of the first run, not reproduced on reload; no page errors in any run.
