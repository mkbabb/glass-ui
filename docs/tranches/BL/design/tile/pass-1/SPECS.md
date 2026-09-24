# D4 · pass 1 · SPECS · one spec per family

| field | value |
|---|---|
| seat | D4 pass 1, synthesis seat. Each family (D4-A..D4-E) gets one spec, stated so that an implementer can write it with no further design. The routes are still incompatible and are not merged. Nothing here is ranked |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`; the checkout reads `1f2dbb5a`. `git diff --stat 91dbcbd8 HEAD -- src vite.targets.ts package.json` is empty, so every `src/` cite in the inputs still holds |
| inputs, read in full | `PORTFOLIO.md`, `harness/HARNESS.md`, `pass-1/W.md` (prior art), `pass-1/X.md` (constellation census), `pass-1/D4-A.md` .. `D4-E.md` (the five research seats) |
| instruments | none. This seat measured nothing. Every number below comes from the seat named beside it, and each seat's instruments, loads and scratch paths are in its own file |
| Safari | every real-Safari cell in every input is UNMEASURED (owner's safaridriver checkbox). "WebKit" below always means Playwright WebKit 26.5, which is not Safari |
| law held to | E-1 clean breaks, no aliases or shims; E-2 no masking fallback, so the primary works in paint or fails loud; D-1 inertia, weight and bounce on all motion; D-2 and D-3 engagement that bests iOS 27; P-1 KISS; P-3 one source of record per fact |

**How to read a spec.** §1 is the mechanism: the primitive and its API, the corner rule, the four state registers with their numbers, keyboard and ARIA, a composition for every surveyed consumer site (X §1), and the common-floor rows the spec lands (PORTFOLIO §2.5, X §4.4). §2 is the public API delta and the migration it implies. §3 lists the battery cells the research seat turned green, with its measured evidence, and the cells it left RED, with the cause. §4 is Chrome and WebKit behaviour. §5 carries the seat's open gaps verbatim. Facts that every family inherits are stated once, in **SHARED FACTS** at the end, and the specs cite them as SF-n instead of restating them (P-3).

**Site keys** (X §1): K1 keyframes.js Spring presets; K2 keyframes.js easing specimens; K3 keyframes.js family filter (single-line ToggleGroup, X §1.3); V1 value.js easing strip; V2 value.js Mix palettes (N-of-M thumbnails); V3 value.js ConsoleRail; F1 fourier-analysis HarmonicLevelGrid; F2 fourier-analysis GalleryCard; F3 FunctionInput presets; F4 BasisSelector (N-of-M); F5 GallerySearchBar basis filter (deselectable one-of-N); F6 NotationPills; F7 fourier-analysis `EquationModeToggle.vue` (SegmentedTabs `semantics="toggle"`, X §1.3); C1 chicago status filter; G glass-ui demo stories (`display/card.vue`, `data/search.vue`, `forms/chip.vue`); KF-047 keyframes.js MatrixEditor cells.

**Floor keys** (PORTFOLIO §2.5 and X §4.4): FL-forced (forced colours), FL-dark, FL-PRM (hover keeps a light channel), FL-coarse (no hover latch, F-77), FL-44 (the 44 px touch floor), FL-Safari (a Safari cell for every visual claim), and X-1..X-7 as X §4.4 states them.

---

## D4-A · the corner reads the box

### A.1 Mechanism

**Primitive.** None new. The fix is one role rule in the radius canon, which each holder composes by publishing its rung. There are two arms, and they differ in one number and in whether the rule needs a script. The research seat did not choose between them. The choice is the owner's ruling on `DESIGN.md:385-386` (A §3.1, and §5 below). Both arms are specified in full so that either one can be built.

**The rule, arm A1 (closed form, pure CSS).** A1 is the working form, not the portfolio sketch. The sketch paints `0px` squares in both engines (SF-2).

```css
/* theme/radius.css */
@theme static {
    --radius-control: calc(var(--control-rung) / 2);   /* was var(--radius-pill); keeps the rounded-control utility */
}
:root { --control-rung: calc(var(--radius-pill) * 2); } /* no rung = the stadium limit, so a rung-less reader is unchanged */
@layer base {
    :where(*) { --radius-control: calc(var(--control-rung) / 2); } /* resolve against the element's OWN rung */
}
```

**The rule, arm A2 (measured, one ResizeObserver per document).**

```ts
// _shared/extent/extent.ts
function stampOne(el: HTMLElement, blockSize: number) {
    const rung = parseFloat(getComputedStyle(el).getPropertyValue("--control-rung")); // @property <length>, inherits: false
    const next = blockSize > rung + 0.5 ? "block" : "line";
    if (el.dataset.extent !== next) el.dataset.extent = next;
}
```

```css
@property --control-rung { syntax: "<length>"; inherits: false; initial-value: 0px; }
@layer components { [data-extent="block"] { --radius-control: var(--radius-field); } }
```

A2 switches the token, not `border-radius`. A `[data-extent="block"] { border-radius: … }` rule ties `.toggle-group__item` at (0,1,0) and loses on source order: the stamp lands and the item still computes `9999px` (A §2.3).

**The holders.** These declarations are the same under both arms. The rung is the holder's one-line box, stated beside the geometry that produces it (P-3):

```css
.button             { --control-rung: var(--button-size);            border-radius: var(--radius-control); }
.toggle-group__item { --control-rung: var(--toggle-group-item-size); border-radius: var(--radius-control); }
.glass-chip         { --control-rung: calc(1lh + 2 * var(--chip-pad-block));
                      padding-block: var(--chip-pad-block);           border-radius: var(--radius-control); }
.glass-chip--md     { --chip-pad-block: 0.375rem; }   /* xs .125, sm .25, lg .5; chipVariants' py-* move here */
@media (pointer: coarse) {
    .glass-chip--interactive { --control-rung: max(calc(1lh + 2 * var(--chip-pad-block)), var(--touch-target)); }
}
.disclosure-group-trigger { --control-rung: max(2.75rem, calc(1lh + 2rem)); }
```

The census found exactly four composers: ToggleGroupItem, the pill Chip, `.disclosure-group-trigger`, and Button, which already obeys the rule. Badge, SelectTrigger, the dock controls, the stepper (an `iconOnly` Button) and every mark, dot, track and handle cannot wrap, so they keep the stadium. Any `--radius-control` reader that publishes no rung resolves to the stadium limit (A §3.3, form e). `--radius-badge` and `--radius-tab` stay on `--radius-pill`.

**The corner, as measured** (A §3.1, §3.5; Chromium and WebKit agree to 0.1 px):

| cell | A1 | A2 |
|---|---|---|
| one line at the rung | h/2 (20 md, 18 sm, 22 lg) | h/2 |
| past the rung, fine pointer | rung/2: 20 md, 18 sm, 22 lg | `--radius-field`, 16 |
| past the rung, coarse md | 30 (the rung is 60) | 16 |
| `:root { --ui-scale: 1.25 }` | 25 | 16 |
| K1 preset 208×61.6 / K2 specimen 150.5×100.2 | 20 / 18 | 16 / 16 |
| a step at the rung | none | 20 → 16 at 40.5 px; 30 → 16 at 60.5 px on coarse |

**The selected register.** A does not own state (A §0 item 7). ToggleGroup's on-state stays as it is, and A lands only if the floor lands with it. The floor as A's seat measured it is one declaration, `.toggle-group__item[data-state="on"] { border-color: var(--foreground) }` (`a1f.patch`). That declaration took every ToggleGroupItem T-3 cell green in light, dark and PRT in both engines. The 0.12 fill stays as an assist: 1.21 / 1.22 / 1.00 (A §4.2).

**Focus register.** Unchanged: `.focus-ring`, a 2 px outline at `--ink-perimeter` with a 2 px offset (SF-6).

**Hover and press registers.** Unchanged: the capsule hover at scale 1.015 with the gleam, press 0.97, and a 180 ms colour transition on commit. The hover light channel moves 0.00 % of pixels (SF-9).

**Keyboard and ARIA.** Unchanged: ToggleGroup `radiogroup` / `radio`, one tab stop, axis arrows only. The cross axis stays dead in a grid (SF-11).

**Consumer composition, per surveyed site** (A §5, X §4.3):

| site | composition under A |
|---|---|
| K1 | keeps ToggleGroup and deletes `.preset-cell { border-radius: var(--radius-field) }` (`SpringPhysicsFacet.vue:197-198`). That is a zero-pixel change under A2 (16 → 16) and a visible one under A1 (16 → 20). The dashed outline, the washes, the type pins and the focus override stay, because A does not touch state |
| K2 | deletes `EasingTarget.css:115-116`: 16 → 16 under A2, 16 → 18 under A1. The portrait-ink rules and the 2 px port pad stay |
| K3 | none (one line, legal stadium) |
| V1 | none: `shape="icon"` is a declared circle, 22 px under both arms |
| V2 | X §4.3 reads "deletes `rounded-card`; the ring-on-ring collision stays". The D4-A seat did not address V2, and V2 is a native `<button>` that composes none of the four holders, so under the rule as specified its corner stays the consumer's |
| V3 | none: it composes no library holder |
| F1 | a two-line Button tile. 20 px under A1, as today. 16 px under A2 "if Button composes the stamp" (A §5) |
| F2 | none: the corner is the consumer's `rounded-xl` either way |
| F3 | `.preset-pill { border-radius: var(--radius-control) }` resolves against the Button's own rung: 20 px on one line, unchanged |
| F4, F5, F6 | none (single-line Buttons) |
| F7 | none |
| C1 | none (single-line) |
| G | none |
| KF-047 | none (not a holder A composes) |
| value.js UIA-V-180 | gains the rule only once value.js reaches a Chip that composes it, three majors away |

**Floor rows landed.** FL-coarse for the corner (the corner follows the coarse rung, and FL-44 holds: `max(calc(2.5rem × 0.8), 2.75rem)` = 44, A §3.5). FL-dark for geometry (dark geometry is the same as light). FL-forced, FL-PRM, and X-1 through X-7 are not touched.

### A.2 Public API delta and migration

- No prop and no component. `--radius-control` changes meaning from "the stadium" to "half the control rung", and `--control-rung` becomes an input that holders publish. `--radius-control` is not in `tokens/manifest.ts`, so this is not a public-token break, but a consumer that sets `:root { --radius-control }` is overridden per element (A §2.1).
- A2 adds an internal `_shared/extent/` module, a registered `@property --control-rung`, and a `data-extent` attribute on holders. That attribute is new public DOM.
- The Chip's `py-*` utilities leave `chipVariants.ts` and become size classes in `glass-chip.css`.
- Tests re-pointed under A1 (vitest in the worktree: 5 failed, 77 passed, 1 expected-fail), all source-text pins:
  - `radius-role-canon.test.ts` "collapses the pill role onto exactly 9999px"
  - "Button resolves its stadium against the control rung"
  - `:555-568`
  - `Button.test.ts` §5 RUNG
  - `chip.contract.test.ts` "carries an xs rung"
- Consumers delete their own corner rules (K1 `:197-198`, K2 `EasingTarget.css:115-116`) in their own tranches (E-6). Nothing in the library stops `rounded-pill` or `rounded-full` from re-imposing the stadium, which measured 30.79 px under both arms in both engines with no console output. `rounded-control` composes (A §3.4). The seat's strongest counter is a consumer lint that flags `rounded-(pill|full)` on ToggleGroupItem, pill Chip, Button, AccordionTrigger and CollapsibleTrigger.

### A.3 Battery

`run.mjs --webkit` on builds `a1` and `a1f` (A1 plus the floor edge), and `t1-corner-stops.mjs` on `a2` (A §4.2). Cells read Chromium · WebKit.

| witness | HEAD | A1 | A1 + floor edge | A2 |
|---|---|---|---|---|
| T-1 | 3/8 · 3/8 | **8/8 · 8/8** | 8/8 · 8/8 | 5/8 (Chromium): `wrap` fails on the synchronous read |
| T-2 | 12/12 · 12/12 | 12/12 · 12/12 | 12/12 · 12/12 | not run |
| T-3 | 2/15 · 2/15 | 2/15 · 2/15 | **8/15 · 8/15** | not run |
| T-4 | 8/20 · 8/20 | 8/20 · 8/20 | 8/20 · 8/20 | not run |
| T-5 | 19/38 | 19/38 | — | — |
| T-6 | 17/24 · 9/14 | 17/24 · 9/14 | — | — |
| T-7 | 4/12 | 4/12 | — | — |
| T-8 | 0/16 | 4/16 | **16/16**, Safari UNMEASURED | — |
| W-A | 1/3 · 1/3 | 2/3 · 2/3 on the banked harness; **3/3 · 3/3** once the harness emits the chip's size utilities (SF-20) | 2/3 · 2/3 | FAIL on the synchronous read, flat 16 one frame later |
| W-B..W-E | 1/13, 0/7, 0/4, 0/6 | unchanged | — | — |

**Evidence for the green cells.** Under A1, T-1 reads preset `rung 40 · 208×61.58 20px→20 | 81.75→20 | 101.92→20 · named --radius-control`, specimen 18 flat, and in `wrap` ToggleGroupItem 20, pill Chip 16.70 and Button 20, all flat and all named `--radius-control`. That closes the T-1-against-W-A split on Button which HARNESS §6 flags. Under A1 + floor, T-3 bands at ≥ 3:1 (light / dark / PRT) are preset 322.5 / 338 / 322.5 px² against a 269 px² bar, and specimen 389 / 406.75 / 389 against 250. All six cells pass in both engines.

**Left RED, and why.**

| cells | cause |
|---|---|
| T-3 strip, chipcell and card | Chip's flood and Card's arm, which A does not change |
| T-4 specimen | the FadingScroll port cut, 1.00 px (SF-6) |
| T-4 preset-verbatim | the consumer's dashed outline, 0.00 px |
| T-5 | the dead cross axis (SF-11), plus the strip, card and chipcell ARIA |
| T-6 | the ToggleGroupItem hover light channel at 0.00 % (SF-9), and the WebKit hover hang (SF-8) |
| T-7 | consumer paint, because A leaves state paint to the consumer |
| W-B..W-E | other families' centres |

### A.4 Chrome and WebKit

- Geometry agrees to 0.03 px on every T-1 cell and to 0.1 px under F-29 (A §3.5).
- A1's universal rule costs +1.3 ms per full style recalc of 12 000 elements in Chromium: 4.50 → 5.80 ms, +29 %. WebKit read 11.00 → 11.00 ms at 1 ms timer resolution. These are wall-clock numbers under load and indicative only (A §2.2).
- A2's stamp lands before paint in both engines on mount, content change and font swap, with 0 unstamped tall boxes seen by the auditor. A synchronous reader in the same task still sees the stadium, in both engines (A §3.2; SF-15).
- WebKit fired no `loadingdone` event on the font swap, but the swap was visible in the height.

### A.5 Open gaps, verbatim (D4-A §7, plus the counterexamples it names)

- The owner's ruling on §3.1: amend `DESIGN.md:385-386` (A1), or keep the 16 px row (A2 forced). A coarse-cell owner glance (30 against 16) is not banked.
- Real Safari for every cell: UNMEASURED (owner's safaridriver checkbox).
- The DEV warning for consumer utilities (§3.4 option 2): not built.
- Button's coarse rung/floor split (C-4) needs one declaration; it is Button's and F-29's to settle.
- The harness `@source` widening (§4.3); until it lands, chip rows at every label measure an unpadded chip.
- T-1's content-change read is synchronous. If A2 is chosen, the battery needs a framed read, or A2 is judged by §3.2 instead.
- A CollapsibleTrigger rung, or a ruling that a bare trigger is not a holder (C-3).
- Named counterexamples (D4-A §6) that stay open: C-2 "A1 rounds up on touch"; C-6 "A2 steps"; C-7 "the consumer utility"; C-8 "A cures the corner and nothing else"; C-10 "the nesting inversion. A 20 px tile inside the 16 px host card is rounder than its container".

---

## D4-B · the choice card

### B.1 Mechanism

**Primitive.** A new compound, `ChoiceGroup` + `ChoiceCard`, in `src/components/choice/`, published as `@mkbabb/glass-ui/choice`. `scripts/lib/subpath-policy.mjs` classifies `choice: "PUBLISH"`, because `overfit-structure.test.ts:320` throws on an unclassified dir (B §2).

**`ChoiceGroup`.**
- Props: `type: "single" | "multiple"` (default `single`); `size: "sm" | "md"`; `minColumn` (default `12rem`); `disabled`; `v-model`, which takes a `SelectionValue` or an array of them.
- Root: the engine supplies `role`, which is `radiogroup` for `single` and `group` for `multiple`. It lays out with `display: grid; grid-template-columns: repeat(auto-fill, minmax(min(var(--choice-column), 100%), 1fr)); gap: var(--space-atom)`.
- Ring clearance is `padding: var(--space-residue)` (4 px, the ring's 2 px outline plus its 2 px offset). A consumer class may replace the layout, as V1's inline-flex row does, but it may not replace the padding.
- Keyboard: `useSelectionGroup` with `arrows: "grid"`. Activation is `automatic` for `single` and `manual` for `multiple`.
- Commit pop: `data-live` is set one frame after mount, so the pop plays on a committed change and never on first paint.

**`ChoiceCard`.**
- Props: `value`, `disabled`, `tone` (a complete colour).
- Slots: the default slot (body and live content), `#title`, `#meta`, and `#mark({ selected })`. The default mark is a 16 px disc holding a check, shown at `md` only. The head row, holding the title and the mark, renders only when a title or a mark is present.
- Host: a `<button>` carrying the engine's `itemAttrs` and roving tabindex. It throws outside a group, and in DEV it logs `console.error` when a descendant is focusable. Rows are built from phrasing elements (SF-10).
- Geometry: `--radius-card`, pad `--space-atom` / `--space-body` (sm: `--space-residue` / `--space-atom`), `min-block-size` at the control rung, flex column.

**Corner rule.** 16 px by construction. The component never wears the stadium. ToggleGroup goes back to single-line pills, so `radius-role-canon.test.ts:555-568` stays true as written (B §2).

**The register**, in one file, `components/choice/styles.css` (251 lines in the probe):

| state | carrier and numbers |
|---|---|
| rest | the unselected edge at `--ink-edge`; `--choice-fill` transparent |
| selected (the carrier) | a `::before` layer inset −1 px with a **2 px border in the floored tone**: `oklch(from tone min(l, 0.42) c h)` in light and `max(l, 0.80)` under `.dark`. Its opacity `--choice-edge-t` goes 0 → 1. It spends neither `outline` nor `box-shadow` (SF-5), and the layout never shifts |
| selected (co-carriers) | `--choice-fill`, the tone at `--fill-selected` on the plate's image layer; an `::after` flood as a normal-blend wash from 8 % to 3 % of the tone, under the content (`z-index: -1` in the isolated card); the mark; the meta ink, which is `--muted-foreground-strong` at rest and `--foreground` when selected |
| hover, inside `(hover: hover)` | fill to `--fill-hover`, border to `--ink-perimeter`, cast to `--glass-shadow-floating`, and scale 1.015 on the press spring |
| press | 0.97 on the spring |
| commit | four non-scale motions: `--choice-fill` 60 ms, `--choice-edge-t` 60 ms, the flood's opacity 300 ms after a 60 ms delay, and the `choice-commit` pop (1 → 1.025 → 1) over `--spring-press-duration`, measured at 120 ms |
| focus | `.focus-ring` on the host, unchanged (SF-6) |
| PRM | drops the scale and the pop and keeps the light channel: 10.47 % of pixels moved on the preset |
| coarse | no latch, 0.00 % |
| forced colours | the perimeter and the mark in `Highlight`; the bands separate at 1210.5 px² on the preset and 1113 px² on the specimen (reported) |

Registered properties: `--choice-fill` (does not inherit), plus `--choice-edge-t` and `--choice-flood-t`, which are numbers that do inherit because the pseudo-elements and the mark read them.

**Keyboard and ARIA.**
- `radiogroup` / `radio` / `aria-checked`, one tab stop.
- The engine gains a second arrow model, `RovingArrows = "axis" | "grid"`, with `axis` the default (+56 lines in `useTabRovingFocus.ts`, +4 in `useSelectionGroup.ts`). Only `ChoiceGroup` passes `grid`.
- Under `grid`, `rowNeighbour(from, dir)` reads the button rects at key time. Among enabled items whose top clears the current item's centre line in that direction, it picks the nearest row, then the nearest inline centre. With no row that way it falls back to `focusEnabled(from, ±1)`, which wraps. RTL flips Left and Right only. Home and End go to the ends.
- Measured (B Q2): preset 2×2 from 0: Down→2, Right→3, Up→1, Left→0. Specimen 2×4: Down 0→2→4→6→7. A ragged 3-column grid from 4: Down→7. In a single-row strip, Down steps like Right.
- `type="multiple"` reads `group` / `button` with `aria-pressed`, one tab stop, ArrowRight moves focus without toggling, and Space toggles (`multi-b.mjs`).

**Consumer composition, per surveyed site** (B §4, B Q1):

| site | composition under B |
|---|---|
| K1 | `<ChoiceGroup min-column="10rem">`, name in `#title`, `{response} s · ζ {damping}` in `#meta`, the mark by default. No per-site CSS on the item |
| K2 | `<ChoiceGroup size="sm" min-column="150px">`, the stage in the body, the curve name in `#meta`, `tone="var(--ball-tone)"`. `.specimen-tile` keeps `content-visibility: auto; contain-intrinsic-size`, and the ball painter keeps its direct `style.transform` writes, because state paints through attributes and the slot never re-renders (X-3) |
| K3 | not B's (a single-line ToggleGroup) |
| V1 | `<ChoiceGroup size="sm">` across both families, with the glyph in the body and the label in `#meta`. The registry sorts by DOM order through the family wrappers. `radiogroup` replaces `role="group"` + `aria-pressed`. The group takes the consumer's inline-flex row as a layout class |
| V2 | `<ChoiceGroup type="multiple">`, the strip thumbnail in the body, `#title` / `#meta` |
| V3 | not B's (single line) |
| F1 | `<ChoiceGroup>` in its scrolling row; it gains `radiogroup` (HEAD announces no state and has 12 stops). `is-bound` needs a second channel that the card does not have |
| F2 | refused (a nested Checkbox and Buttons) |
| F3, F4, F5, F6, F7 | single line, not B's |
| C1 | a candidate, not claimed: "a menu list in a Popover; a 16 px card per row may be the wrong shape there" |
| G | `display/card.vue` → the group; `data/search.vue:582` → a listbox option; `forms/chip.vue:50` deletes `shape="cell"` |
| KF-047 | refused. An `<input>` inside the `<button role="radio">` fires the DEV refusal once per card, and in production ArrowRight inside the Input moves focus and the selection to card 3 (B Q1) |

**Floor rows landed.**
- FL-dark and FL-PRM: T-3 and T-6 pass in both modes.
- FL-coarse: no latch.
- FL-forced: reported, bands above.
- X-2: the meta slot's ink changes, and `tone` reaches the edge, fill and flood.
- X-3: attribute-driven paint.
- X-4: the `multiple` arm shares the anatomy, probed once and not run through the battery.
- X-5: DEV only.
- X-7: `tone`.
- Not landed: X-1 (one state channel, B §6 item 1) and X-6 (no deselectable single is specified).

### B.2 Public API delta and migration

- Added: the `/choice` subpath (`package.json` exports and `typesVersions`), root re-exports of `ChoiceGroup`, `ChoiceCard` and their props, and one engine type, `RovingArrows`, exported through the tabs composable.
- Deleted (E-1):
  - Card's `selected` arm: `Card.vue` −15 lines, `card/styles.css` −92 lines including `@property --card-fill`, and `Card.test.ts:75-90`. `vue-tsc` then reports exactly two errors, `display/card.vue(125,22)` and `data/search.vue(582,22)`, and `paper.css:190-200` has a stale comment.
  - Chip `shape="cell"`: `chipVariants.ts` −1, `glass-chip.css` −5.
- Chip `mode="selectable"` stays as the exported independent-toggle chip. After V1 moves, it has no consumer.
- This is a major.
- Consumer deletions (X §4.2):
  - K1: the `:74` group reset, the `:84` item utilities, `:197-215` (radius, outline, washes and focus override), and the `:86` content type pins.
  - K2: `EasingTarget.css:100-106` (the grid and its 2 px pad), `:115-116`, `:197-204` (state ink, now read by `tone`), and `EasingTarget.vue:410-416`.
  - V1: `onTileToggle` (`:33-35`), the icon-shape choice and fixed box (`:165-183`), and the state ink at `:217-227`.
  - V2: `ring-primary`, `opacity-75`, the `box-shadow` focus ring (`:304-308`) and `rounded-card`.
  - F1: `:221-270` and `:292-295`.
- E-7: five sites in three repos. value.js cannot adopt before it crosses three majors (SF-22).

### B.3 Battery

Final probe build `b4`, `run.mjs --webkit` on a worktree copy of the harness whose `scenes.mjs` composes the choice card at K1, K2 and V1 (B §3):

| witness | HEAD | `b4` Chromium | `b4` WebKit | still RED, and whose |
|---|---|---|---|---|
| T-1 | 3/8 | 4/7 | 4/7 | `wrap`: ToggleGroupItem 20.00 → 39.24, pill Chip 10.70 → 32.11, Button 20 flat but unnamed. B does not own these holders. Every choice-card holder reads 16.00 flat: 65.11, 85.28 and 105.45 px tall on the preset, 86.17-126.52 on the specimen |
| T-2 | 12/12 | 12/12 | 12/12 | none |
| T-3 | 2/15 | **15/15** | **15/15** | none. Bands (light / dark / PRT): preset 1198.5 / 1215.5 / 1207.5 px² against 269; specimen 534 / 552.75 / 543 against 291; strip 325.5 / 333 / 326 against 96 |
| T-4 | 8/20 | 16/20 | 16/20 | preset-verbatim only: the consumer's dashed outline, re-targeted onto the card, paints 0.00 px. The specimen is now whole at 2.00 px on every side (HEAD: 1.00) |
| T-5 | 19/38 | 37/38 | n/a (CDP) | `tabs`: SegmentedTabs `semantics="toggle"` still announces `group` + `aria-pressed` |
| T-6 | 17/24 (WebKit 9/14, hang) | **24/24** | **24/24** | none gating. The `single` info cell (a ToggleGroupItem) still hangs in WebKit |
| T-7 | 4/12 | 8/12 | n/a | preset-verbatim, all four states: consumer paint. specimen-verbatim passes only because the consumer's 16 px equals the card's |
| T-8 | 0/16 | **16/16** + Safari UNMEASURED | (both) | the Safari cell |
| W-B | 1/13 | **13/13** | n/a | none. Cells read `preset · 4 multi-line items · slots [choice-card] · roles [radio] · used corner 16.00 · tab stops 1`, and the same on the specimen (8 items) and the strip (6) |

**Carrier evidence** (B Q4). The 2 px floored perimeter is the only single carrier that passes all six cells (preset and specimen × light, dark and PRT). The alternatives fail:

| variant | failing cells |
|---|---|
| fill alone | all six |
| 1 px border at `--ink-perimeter` | light and PRT |
| 2 px layer at `--ink-perimeter` | the violet specimen in light, 266 px² against a 291 px² bar |
| mark alone | all six; it covers 185.5 of the 269 px² needed |
| flood alone | all six (1.05-1.11) |

**Ink evidence** (B Q4). The flood as shipped keeps the title at 10.50 / 7.05 and lifts the selected meta from 2.48:1 to 7.11:1 in light. A Chip-style plus-lighter flood drops the title to 3.82:1 in dark.

**Cost.**
- Library `src`: `choice/` +443 new lines, engine +60, Card −107, Chip −6, index +6.
- Minified: `choice.js` 4506 B (gzip 1882 B), `choice.css` 5165 B (gzip 1562 B).
- Unit suites: tabs, dock, toggle-group, the ONE-SELECTION arm, gates, motion and styles all pass. The five failures are the retired Card arm's own test, three `boot-graph` cases that need `dist-demo`, and one dist-bytes arm.

### B.4 Chrome and WebKit

- Choice-card geometry is identical to 0.03 px.
- T-3 bands are within 3 % between engines.
- T-4 is whole at 2.00 px in both.
- T-6 is 24/24 in both. The ChoiceCard hover does not hang WebKit; its preset light channel moved 65.90 % of pixels in WebKit and 10.46 % in Chromium.
- The ToggleGroupItem hang reproduces at `b4` and is isolated to `.control-surface:hover`'s background (SF-8). B's divergence record rests on this: its plate does not compose `.control-surface` (B Q3).
- WebKit's PRT cells take the forced level-0 path.

### B.5 Open gaps, verbatim (D4-B §7, plus §2 "owed")

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
- §2: "the item registry is now written twice, `choice/context.ts` (26 lines) and `toggle-group/context.ts`. P-3 wants one registry beside the engine that both groups compose. That was not prototyped."
- Named counterexamples (D4-B §6) that stay open: item 1 "A second state on the same tile"; item 4 "The neutral tone is heavy"; item 5 "V1's squares become ragged"; item 6 "The fill is decorative"; item 9 "Retired bindings no-op silently"; item 12 "Surface area. A new subpath, a story, tests and a §13 customization census are owed. `choice` is a new top-level directory that D1's placement has to rule on."

---

## D4-C · selection as a behaviour

### C.1 Mechanism

**Primitive.** A headless pair in `src/components/selection/`, published as `@mkbabb/glass-ui/selection`. The group owns the semantics and the container owns the plate.

```vue
<SelectionGroup v-model="preset" type="single" orientation="horizontal" aria-label="Spring presets" class="grid grid-cols-2 gap-2">
  <SelectionItem v-for="p in presets" :key="p.name" :value="p.name" v-slot="{ itemProps, selected }">
    <div v-bind="itemProps" class="flex flex-col items-start gap-0.5 px-3 py-2">…</div>   <!-- flush option -->
    <!-- or <Card v-bind="itemProps" size="sm">…</Card>, <Surface …>, <Chip shape="cell" …> -->
  </SelectionItem>
</SelectionGroup>
```

- **`SelectionGroup`.**
  - Props: `type: "single" | "multiple"`, `orientation`, `disabled`, `as`, `class`, `v-model`.
  - It renders one element carrying `role` (`radiogroup` or `group`), `aria-orientation` and the keydown handler. It paints nothing.
- **`SelectionItem`.**
  - Props: `value`, `disabled`, `asChild`.
  - It renders no element of its own. It exposes `itemProps` and `selected`. `itemProps` carries role-per-mode ARIA, the roving `tabindex`, `data-state`, `data-selection-item`, `data-disabled` / `aria-disabled` and `onClick`, with the item's own attrs merged underneath through `mergeProps` (handlers chained, stamp last).
  - The item finds its element by walking `nextSibling` from the Fragment's start anchor, because a scoped slot renders as a Fragment.
- **Delivery.**
  - The scoped slot is the primitive, with `v-bind="itemProps"` written last.
  - `asChild` is sugar for a single component child, and it inherits reka's two losses: the child's props beat the stamp, and the child's `ref` is dropped.
  - The directive form is rejected. It writes behind Vue, defeats Chip's static refusal, erases a consumer's `data-state`, and has no SSR path (C §1.1).
- **The contract, verified.**
  - DEV readback: `SelectionItem` compares the rendered element with the stamp it rendered with, on `nextTick` after mount and on every `onUpdated`, and throws naming each lost key. It caught all 60 lost-key events on HEAD Card and Chip.
  - DEV one-element check: an item that renders more than one element errors.
  - DEV interactive-content refusal (`guard.ts`). It matches `a[href]`, `button`, `input`, `select`, `textarea`, `summary`, `contenteditable`, a focusable `[tabindex]`, and the `button`, `link`, `checkbox` and `switch` roles, and throws from the mounted and updated hooks: "an option cannot hold interactive content … Split the action out of the option."
- **Host components must admit the stamp.** Card's `selected` prop and its `role`, `tabindex`, `aria-selected` and `data-selected` bindings are deleted (E-1; they are the UIA-F-43 after-`$attrs` bindings, SF-17). Chip's static `staticAttrs` filter admits a stamped element. `ToggleGroup` becomes `SelectionGroup` plus the row class. `ToggleGroupItem` becomes `SelectionItem` plus `<button class="toggle-group__item control-surface …">`. `toggle-group/context.ts` (53 lines) is deleted.

**Corner rule.**
- The container's role corner wins: `.card` 16, Chip cell 16, the ToggleGroup pill `--radius-pill`.
- The register adds one fact at zero specificity: an option publishes `--radius-ctx: var(--radius-field)` on itself, and `:where([data-selection-item]) { border-radius: var(--radius-ctx) }`.
- A stamped Surface therefore paints 16 px in a root, a panel or a dock-card host, where a plain Surface paints the relay (16 / 12 / 24). This holds in both engines (C §1.2, SF-18).
- A bare element item takes the same corner.
- Descendants of an option see `--radius-ctx` = 16, so a nested plate relays from the option's corner.

**The register** (`selection/styles.css`, 112 lines in the probe, keyed on `[data-selection-item]`):

| state | carrier and numbers |
|---|---|
| rest | a seam edge (`:where([data-selection-item]) { border: 1px solid seam }` for a plate with no border) and the corner above |
| selected | `--selection-fill` at `--fill-selected` of `--selection-tone`, plus `border-color: var(--selection-tone)` at (0,2,0). The default tone is `--foreground`, **the full tone** (SF-4) |
| hover, inside `(hover: hover)` | `--fill-hover`, the edge lifted to `--ink-edge`, and `scale: 1.015` |
| press | `--scale-press-sm`, measured 0.97 × 0.97 |
| commit | `--selection-fill` and `border-color` on the 180 ms engage clock, plus a spring settle `selection-commit` (scale 1 → 1.025 → 1) keyed on `[data-state="on"]:focus`, so a page that loads with a choice already made does not pop |
| focus | `outline` 2 px at `--ink-perimeter`, offset 2 px |
| PRM | scales zeroed, light channel kept |
| forced colours | `Highlight` edge and fill |
| per-item tone | `--selection-tone` (X-7) |

**The five plate arms.** One register cannot write the fill layer itself. At (0,1,0) it erased `.control-surface`'s two image layers. At zero specificity it lost to the veil plate's and the opaque decoration's `background:` shorthands (C §1.4). The state fill is therefore a registered `--selection-fill` (`<color>`, `inherits: false`, `initial-value: transparent`), declared in `tokens/property-regs.css` and not in the component sheet. If it were declared in the component sheet, a page with no SelectionGroup would carry an unregistered `var()` in every arm's image list and lose every control plate. Each plate recipe lists `linear-gradient(var(--selection-fill), …)` first in its own image list:

| arm | file | lines |
|---|---|---|
| veil plate (Card, Surface, every tier) | `styles/glass/veil.css`, `@utility glass-plate` | +2 |
| control chassis | `styles/glass/defined.css` image list, plus the `control-surfaces.css` hover shorthand | +2, +2 |
| Chip | `styles/glass/glass-chip.css` | +3 −4 |
| opaque decoration | `styles/glass/surface-axis.css` `[data-surface="opaque"]` | +2 |

**Keyboard and ARIA.**
- `radiogroup` / `radio` / `aria-checked`, one tab stop, from the engine.
- `useTabRovingFocus` gains a geometric cross-axis walk (+33 lines). In a horizontal set, Up and Down move to the nearest item in the next row by centre distance, react-aria style; in a vertical set, Right and Left do. A one-row strip has nothing across it, so the dock and SegmentedTabs are unchanged there.
- `type="multiple"` stamps `aria-pressed` with no role.
- SegmentedTabs `semantics="toggle"` moves from `group` + `aria-pressed` to `radiogroup` + `radio` + `aria-checked` (4 lines).

**Consumer composition, per surveyed site** (C §5, X §4.3):

| site | composition under C |
|---|---|
| K1 | `SelectionGroup` over flush options (a stamped `div`) or over Card `size="sm"`. The flush option is the reading that holds inside the host quiet Card (C §1.5) |
| K2 | the same, with the stage as the option's own child. The portrait-ink rules (`EasingTarget.css:197-204`) can read `--selection-tone` |
| K3 | keeps ToggleGroup (now composing SelectionGroup) |
| V1 | `SelectionGroup` over Chip `shape="cell"`. It deletes the hand exclusivity (`:33-35`) and loses the Chip flood (§C.5) |
| V2 | `type="multiple"` over the buttons, which deletes `ring-*` and `opacity-75` |
| V3 | "could become `SelectionGroup` with `role="tablist"` if it controls a panel" (PORTFOLIO §4 D4-C); not probed |
| F1 | wraps its Buttons and gains `radio` and arrows. `is-bound` stays on a channel the register does not use |
| F2 | refused by the content guard |
| F3, F5, F6 | wrap their Buttons in `SelectionGroup`. Button is a `<button>`, and the guard reads it back |
| F4 | not addressed by the seat (single-line N-of-M on `aria-pressed`) |
| F7 | ARIA changes from `aria-pressed` to `radio` with no markup change |
| C1 | wraps its `<button role="radio">` elements and gains the arrows it lacks |
| G | `demo/stories/display/card.vue:117-137` re-points |
| KF-047 | refused (interactive descendant) |

**Floor rows landed.**
- FL-dark and FL-PRM: T-3 and T-6 in both.
- FL-coarse: no latch.
- FL-forced: `Highlight`, reported.
- X-2: through `--selection-tone`, which the stage can read.
- X-3: attribute-driven paint.
- X-4: `type="multiple"` carries the same anatomy.
- X-5: DEV only.
- X-7.
- X-1 is partial: F1's `is-bound` stays off the register's channel only if the consumer keeps it there.
- X-6 is not landed: "A deselectable single ('none of these', X-6) is not specified".

### C.2 Public API delta and migration

- Added: `SelectionGroup`, `SelectionItem`, the register, the five arms, the global `@property --selection-fill`, the grid walk, and SegmentedTabs `toggle` → `radiogroup`.
- Deleted (E-1): Card's `selected` prop and its three bindings, its selectable-arm CSS (`.card[role="option"]`, 60+ lines), `@property --card-fill`, and `toggle-group/context.ts`.
- Changed: `ToggleGroup` and `ToggleGroupItem` are rebuilt on the behaviour. The pill's on-state fill moves to the register, and the pill keeps its ink and weight.
- Re-points: `demo/stories/display/card.vue:117-137`, `radius-role-canon.test.ts:555-568`, and the engine-consumer arm of `overfit-structure.test.ts:415-462`. The engine consumer count stays three: the dock, SegmentedTabs and SelectionGroup.
- `vue-tsc --noEmit --project tsconfig.src.json` exits 0. The test typecheck and the unit suites were not run.
- Consumer deletions, each in its own tranche (E-6): K1 `SpringPhysicsFacet.vue:197-215`; K2 `EasingTarget.css:116` and `EasingTarget.vue:410-416`; V1 `:33-35`; V2 `ring-*` and `opacity-75`. value.js crosses three majors first (SF-22).
- The probe's size: 357 new lines in `src/components/selection/`, a 33-line engine change and nine small edits. The whole probe diff is 22 files, +460 −388.

### C.3 Battery

Build `c5` (the tiles are Card `size="sm"`, `tier="wash"`, `:shadow="false"`) and build `c5bare` (flush bare options), both production, `run.mjs --webkit` (C §3):

| witness | HEAD | `c5` | `c5bare` | engines |
|---|---|---|---|---|
| T-1 | 3/8 | 6/9: preset, specimen, card, surface, chipcell ×2 PASS at 16.00 flat, named. Surface `224×77.13 → 98.13 → 119.13` | 6/9, the same cells; preset 16.00 flat at 61.58 → 81.75 → 101.92 | Chromium and WebKit identical |
| T-2 | 12/12 | **12/12** | not run | both |
| T-3 | 2/15 | **18/18**. At ≥ 3:1 (light / dark / PRT): preset 324.5 / 341 / 328 px² against 269; specimen 586 / 592 / 586 against 307; strip 141 / 159.5 / 148.25 against 88; card 552 / 567 / 560 against 294; surface 574 / 588 / 576 against 301; chipcell 134.5 / 153.75 / 142 against 93. The fill stays at 1.26-1.42:1 and the edge carries | **18/18**: preset 328 / 341 / 328, specimen 586 / 599 / 586 | Chromium; WebKit 18/18 (PRT on the forced level-0 path) |
| T-4 | 8/20 | 12/24: preset, card and surface whole at 2.00 px, selected or not | 12/24 | both |
| T-5 | 19/38 | **44/44**, including `tabs`; preset Down 0 → 2, Up 2 → 0 | (W-C 13/13) | Chromium (CDP) |
| T-6 | 17/24 | **30/30**. Hover light: preset 6.44 %, specimen 71.69 %, card 4.27 %, surface 72.19 %, chipcell 7.05 % (PRM the same). Hover 1.015, press 0.97 × 0.97, commit 180 ms, coarse no latch | **30/30**; preset hover light 75.29 %, specimen 3.93 % | Chromium 30/30; WebKit 30/30 |
| T-7 | 4/12 | 8/12 | 8/12 | Chromium |
| T-8 | 0/16 | **16/16**, Safari UNMEASURED | **16/16** | |
| W-C | 0/7 | **13/13**: exports present; the card and surface boards read `radiogroup`/`radio`, 1 stop, all four arrows move and check, items group-stamped | **13/13** | Chromium |

**What turned each cell green** (C §3):

| witness | cause |
|---|---|
| T-3 | the tone edge, through the five arms |
| T-5 | the geometric walk and SegmentedTabs' ARIA |
| T-6 | the edge's light channel on hover. The 0.05 fill alone moved 0.12 % on the specimen and 0.00 % on chipcell (`c2`) |
| T-8 | T-1 and T-3 hold in both engines |
| W-C | the stamp |

**Left RED, and why.**

| cells | cause |
|---|---|
| T-1 `wrap` | the control-role holders, which C never touches |
| T-4 `specimen` and `specimen-verbatim` | the consumer's 2 px grid padding inside FadingScroll, 1.00 px (SF-6) |
| T-4 and T-7 `preset-verbatim` | consumer paint, until keyframes.js deletes `:197-215` |
| T-7 `specimen-verbatim` | passes only because the values coincide (the consumer's 16 equals Card's 16) |

**Delivery evidence** (C §1.1). At HEAD the scoped slot and `asChild` both lose `role` and `tabindex` on a Card, and lose `role`, `tabindex`, `data-state` and the click handler on a Chip, with 0 console output. Once the stage-2 cures landed (the Card bindings deleted, Chip admitting the stamp), all nine form × container cells pass in Chromium and in WebKit.

### C.4 Chrome and WebKit

- T-1 is identical in both engines.
- T-3 is 18/18 in both.
- T-4 fails for the same causes in both.
- T-6 is 30/30 in both. The ToggleGroupItem `single` info cell still hangs WebKit (`no answer within 120 s`, SF-8), and the Card, Surface, Chip and bare items do not.
- The Q1 delivery matrix gives the same nine verdicts in both engines.
- In the Q3 interactive-content probe, WebKit skips buttons and links on Tab by default, so its Tab row cannot be read.

### C.5 Open gaps, verbatim (D4-C §6, plus named counterexamples)

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
- Named counterexamples (D4-C §4) that stay open: 1 "The best nested option has no container"; 2 "Five arms, a registered property, and a plate contract nobody enforces"; 3 "The DEV guards are DEV"; 6 "Two components where there was one (P-1)"; 8 "`useAttrs()` is not reactive in the item's `computed` … The probe did not exercise this."

---

## D4-D · the tile shape on ToggleGroup

### D.1 Mechanism

**Primitive.** ToggleGroup keeps the whole idiom and gains one declared axis at the group: `ToggleGroupProps.shape?: ToggleGroupShape`, where `export type ToggleGroupShape = "pill" | "cell"` and `pill` is the default. The group stamps `data-shape`, and the context publishes `shape` to the items.

**Corner rule.** One shared declaration, in a new partial `styles/glass/cell.css` that `glass.css` imports right after `glass-chip.css`. Chip's cell rule is deleted from `glass-chip.css`, and Chip's cell moves from `--radius-card` to `--radius-field` (16 px either way):

```css
.glass-chip--cell, .glass-chip--cell.glass-capsule,
.toggle-group[data-shape="cell"] .toggle-group__item { border-radius: var(--radius-field); }
```

The group arm is (0,3,0), so it outranks `.toggle-group__item { border-radius: var(--radius-pill) }` whatever order the sheets land in. The chip pair keeps its doubled class so that it outranks `.glass-capsule` (D §1.1).

**`cell` anatomy** (D §1.2). The group owns:

| owns | declaration |
|---|---|
| column, stretch, start text | `flex-direction: column; align-items: stretch; justify-content: flex-start; text-align: start` |
| pad pair | `padding: var(--space-atom) var(--space-body)`; sm `var(--space-atom)`; lg `var(--space-body) var(--space-family)` |
| leading | `line-height: var(--type-leading-body)` (22.95 px md, 20.19 px sm, measured) |
| rhythm | `gap: var(--space-residue)` |
| grid | `display: grid; grid-template-columns: repeat(auto-fill, minmax(min(var(--toggle-group-cell-min), 100%), 1fr)); inline-size: auto`, with `--toggle-group-cell-min: 10rem`, the only new token |
| ring clearance | `padding: calc(var(--focus-ring-width) + 2px)` on the group. The literal 2 px restates the ring offset, and the ring should publish its reach as a token (§D.5) |

`size` composes with `cell` and adds no axis. It retunes the pad pair (sm 8/8, md 8/12, lg 12/20), the rung floor (36/40/44) and bare-text type. The corner does not move with size (D §1.4). The consumer keeps content typography, content ink and any column override.

**`pill` law** (D §1.3). A pill is one line by law:
- `max-inline-size: 100%; justify-content: safe center; white-space: nowrap; overflow: clip`
- label children get `min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; padding-block: 0.15em`. The block padding stops the WebKit descender shear.

A DEV-only `ResizeObserver` on `ToggleGroupItem` logs one `console.error` when a pill item grows past its `min-block-size`: "[glass-ui] `<ToggleGroupItem value="a">` holds more than one line in a pill group; declare `shape="cell"` …". It follows Button's retired-prop voice, `Button.vue:125-146`. It is stripped from production.

**The state registers** (D §2.3). All of them ride the item's border:

| state | carrier | channel | measured |
|---|---|---|---|
| rest | `--control-surface-border` (computed 14 % ink) | `border-color` | the baseline |
| hover, fine pointer | `--ink-perimeter` (0.48), behind `@media (hover: hover)` | `border-color` | T-6 light channel 3.84 % preset, 2.91 % specimen, 7.47 % strip (HEAD 0.00-0.02 %); PRM identical; coarse latch 0.00 % |
| selected | **full `--foreground`** | `border-color` | T-3 ≥ 3:1 edge (light / dark / PRT): preset 318 / 335 / 326 px² against 267; specimen 560 / 577 / 568 against 299; strip 143 / 153 / 144 against 94 |
| focus | `.focus-ring`, unchanged, a 2 px outline at a 2 px offset | `outline` | T-4 20/20 in both engines, including selected-and-focused |
| press | `.glass-capsule-hover` / `.tap-squish`, unchanged | `scale` | 0.97 × 0.97 |
| commit | the existing 180 ms colour transition, now including the edge | `background-color`, `border-*-color`, `color` | T-6 commit PASS |

The fill (`color-mix(fg 12 %)`) stays as an assist. It paints under the `.control-surface` background-image plate, so it separates 1.20:1 in light and 1.00:1 under PRT, and the edge carries PRT alone (SF-3).

**Keyboard and ARIA.**
- `radiogroup` / `radio`, one tab stop, from the engine.
- `useTabRovingFocus` gains `grid?: ComputedRef<boolean>` (+43 lines), and `useSelectionGroup` forwards it (+3). With `grid` on, the cross-axis arrows walk by geometry to the nearest enabled item on the adjacent line, closest in the other coordinate (the react-aria `layout="grid"` model, SF-11). ToggleGroup always passes it. In a single line the walk finds no neighbour and does nothing. SegmentedTabs and the dock pass nothing and do not change.
- Measured: the preset and specimen grids move and check on all four arrows (Down 0 → 2, Up 2 → 0).
- `type="multiple"` keeps ToggleGroup's `group` / `aria-pressed`.
- RadioGroup is ruled out as a host. Its item renders no content, its reka roving leaves the cross axis dead and walks by DOM order, and it is a second roving machine that the one-engine gate cannot see (D §1.5; SF-21).

**Consumer composition, per surveyed site** (D §4):

| site | composition under D |
|---|---|
| K1 | `<ToggleGroup type="single" shape="cell">`. Deletes the `:74` group reset, the `:84` item utilities and the `:197-215` scoped paint. Keeps the content type `:86-87` and may keep `grid-cols-2` as layout. Gains a whole ring under `NO_PRESET` |
| K2 | `shape="cell"` on the existing `size="sm"` group with `style="--toggle-group-cell-min: 150px"`. Deletes the `:130` item layout, `EasingTarget.css:100-106`, `:115-116` and `EasingTarget.vue:410-416`. Keeps the portrait and name ink (`EasingTarget.css:197-204`, content ink), `content-visibility: auto` and the ball's direct writes |
| K3 | none (a pill; the pill law applies) |
| V1 | Chip `shape="icon"` × N in `role="group"` → one `<ToggleGroup type="single" size="sm" shape="cell">` around the family wrappers, with `.toggle-group.strip-row { display: inline-flex }` as a layout override. Deletes `:33-35` and the fixed 44 px circle `:172-183`. Tab stops go from 6 to 1 |
| V2 | `type="multiple" shape="cell"` (`group` / `aria-pressed`). Deletes `ring-2 ring-primary …`, `opacity-75`, the `:305` ring-on-ring collision and `rounded-card`. Not probed |
| V3 | none: a `tablist` over panels. F-30a owns the rail |
| F1 | `type="single" shape="cell"`. Deletes the Button host, `:221-270` and `:292-295`. Gains `radio`, 1 stop (from 12) and arrows. It collides with `is-bound` on `border-color` (C-6) |
| F2 | out of scope (interactive descendants, X-5) |
| F3, F6 | pill ToggleGroup `type="single"`. Deletes the hand `aria-pressed`, radius and paint. F3's recorded refusal of `radiogroup` no longer holds |
| F4 | not addressed by the seat (single-line N-of-M on `aria-pressed`, X §1.2) |
| F5 | no clean home: its single choice is deselectable (X-6) |
| F7 | untouched (a SegmentedTabs site; D leaves SegmentedTabs `toggle` as it is) |
| C1 | vertical pill `ToggleGroup type="single"`. The check mark can ride the `#indicator` slot or give way to the edge. Deletes the hand `role="radio"` markup |
| G | `demo/stories/forms/chip.vue:50` keeps working (Chip cell reads `cell.css`) |
| KF-047 | not D's (a field shape) |

**Floor rows landed.**
- FL-dark and FL-PRM: T-3 PRT and the PRM hover in both.
- FL-coarse: no latch.
- FL-44: via the size rung floor, 44 at lg.
- FL-forced: not reported by the seat.
- X-3: attribute-driven.
- X-4: via `type="multiple"`, not probed.
- Not landed: X-1 (C-6), X-2 (C-7), X-5 (the DEV refusal covers one-line pills, not interactive content), X-6 (F5) and X-7 (no tone input specified).

### D.2 Public API delta and migration

- `/toggle-group`:
  - Adds `shape?: "pill" | "cell"`, `ToggleGroupShape`, the `data-shape` attribute and `--toggle-group-cell-min`.
  - The pill becomes one line by law, and the DEV refusal names `shape="cell"`.
  - Selected and hover paint move to the border (full ink / 0.48). A consumer that hand-paints `border-color` on an item at equal or higher specificity now competes with the carrier.
- `/chip`: the `cell` corner re-points to `--radius-field`, with no pixel change. Chip `shape="cell"` has zero consumer sites (SF-19).
- The engine gains a `grid` option. SegmentedTabs and the dock are unaffected.
- Tests re-pointed (vitest: `2 failed | 353 passed | 1 expected fail`):
  - `ToggleGroup.test.ts` G-TOGGLE-WRAP `:302-326` fails on `nowrap` and on the group padding.
  - The barrel list at `:348` gains `ToggleGroupShape`.
  - `radius-role-canon.test.ts:555-568` still passes and gains a cell-arm case.
  - `public-surface.spec.ts` Row 8 was not run (no `dist/`).
- `vue-tsc --noEmit --project tsconfig.src.json`: no errors.
- The probe diff: 10 files, +177 −7.
- An unmigrated consumer gets the edge (T-3) and the grid arrows (T-5), but its corner does not change until it declares `cell`. The pill law's label padding makes an unmigrated preset tile taller (61.58 → 70.17 px), and the DEV refusal speaks on K1 and K2 until they migrate.

### D.3 Battery

Two harnesses on one worktree (D §3). The canonical battery shows an unmigrated consumer. A migrated copy transcribes K1, K2 and V1 as their D migrations and adds W-D to their gates.

| witness | migrated, Chromium | migrated, WebKit | canonical (unmigrated), Chromium | HEAD |
|---|---|---|---|---|
| T-1 | 7/10. PASS: preset 16.00 flat (204×63.58 → 103.92), specimen 16.00 flat (205×94.16 → 130.47), strip 16.00 flat (40×54.80 → 90×76.39), card, chipcell. FAIL: `wrap` | 7/10 | 3/8 (preset 35.09 → 55.26) | 3/8 |
| T-2 | **12/12** | **12/12** | 12/12 | 12/12 |
| T-3 | 10/15. PASS: preset, specimen and strip in light, dark and PRT. FAIL: card ×3, chipcell light and PRT (1.49 / 1.13) | 10/15 | 8/15 | 2/15 |
| T-4 | **20/20** (specimen whole at 2.00 px) | **20/20** | 8/20 | 8/20 |
| T-5 | 27/38. PASS: every ToggleGroup scene, all four arrows on the grids. FAIL: tabs ARIA, card ×6, chipcell ×4 | Chromium only | 23/38 | 19/38 |
| T-6 | 27/30. PASS: every cell on preset, specimen and strip. FAIL: card hover scale 1.00, chipcell light channel 0.00 % | 9/15: preset, specimen and strip "no answer within 120 s (hung)" | 21/24 | 17/24 |
| T-7 | **12/12** (content ink reported: K2's name tone, V1's label ink) | Chromium only | 4/12 | 4/12 |
| T-8 | **16/16**, Safari UNMEASURED | (in T-8) | 12/16 | 0/16 |
| W-D | **22/22**: preset, specimen, strip and family-d, all `16px→16.00 (--radius-field 16.00) · column · line-height = body · rows 2` | **22/22** | 4/4 (`family-d`) | 0/4 |

**Left RED, and why.**

| cells | cause |
|---|---|
| T-1 `wrap` | a hard break (`<br>`) grows a declared pill (20.00 → 26.23 → 41.52), and the scene sets `white-space: normal` unlayered. D is correct by declaration, not by construction (C-1) |
| T-3 and T-6 card and chipcell | Card's arm and Chip's flood, which D does not change (C-12) |
| T-5 tabs | SegmentedTabs `group` / `aria-pressed`, untouched |
| T-6 WebKit | the ToggleGroupItem hover crash (SF-8) |

**Edge evidence.** The first build, `d-mig`, set the selected edge at `--ink-perimeter` 0.48 and measured 0.00 px² of ≥ 3:1 edge in light and PRT on preset, specimen and strip. Dark passed at 298.5-538 px² (D §2.3; SF-4).

### D.4 Chrome and WebKit

- Geometry (T-1, T-2, W-D) is identical to 0.01 px.
- T-3 areas differ by up to 30 %: WebKit reads preset 414.5 / 424 / 418 px² against Chromium's 318 / 335 / 326. Both clear the bar.
- T-4 is 20/20 in both.
- Overflow geometry is the same in both. WebKit alone sheared descenders at the clip edge, which is why `padding-block: 0.15em` is in the law.
- The WebKit hover crash blocks T-6 on every ToggleGroup scene. D's seat isolated its trigger to a `color-mix()` whose two operands are both `--glass-plate-*` tokens (SF-8).

### D.5 Open gaps, verbatim (D4-D §7)

1. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox), and the Playwright WebKit hover crash may or may not reproduce there.
2. T-6 in Playwright WebKit is red on every ToggleGroup scene until `--control-surface-bg-hover` stops mixing two plate tokens. That is outside D.
3. The iOS-27 commit (C-9): no witness cell measures a flood or pop, and the probe added none.
4. The media reach of the selected state (C-7) and the second-state collision on the border (C-6): no carrier specified.
5. The hard-break pill in production (C-1) and the two-lines-in-the-rung pill (C-2): refused only in DEV, or not at all.
6. The label-wrapper question for bare-text pills (C-3).
7. The ring's reach as a token, so the cell's clearance stops restating the 2 px offset.
8. `public-surface.spec.ts` and the `.published-roster` row were not run (no `dist/` in the worktree). V2's `type="multiple"` cell and chicago C1 were not mounted.
9. Hovered-unselected (0.48 edge) against selected (full ink): the difference between those two states was not measured.

Named counterexamples (D4-D §6) that stay open: C-4 "the field rung on a tiny cell. The migrated V1 tile is 40×54.80 px, so the 16 px corner is 0.80 of half its width and the tile reads close to a stadium"; C-5 "the ring clearance moves the grid … It also collides with G-TOGGLE-WRAP's 'no padding on the group' text"; C-8 "the fill dies under PRT"; C-10 "the unmigrated consumer"; C-11 "a vocabulary word with two meanings. `cell` is 16 px on the component axis and 0 px in the role spine's prose (`radius-role-canon.test.ts:354`)"; C-12 "Chip cell and ToggleGroup cell share a corner, not a state … Whether Chip's `cell` keeps a reason to exist once V1 leaves it (zero consumer sites, §1.1) is open."

---

## D4-E · no multi-line selectable

### E.1 Mechanism

**The law.** A one-of-N option is one row: a label, a glyph, or both side by side. Its block size is its control rung. Detail belongs to the selection: a single readout or detail row, a caption outside the plate, or the scene's own header. It never belongs to each option (E §2 item 1).

**Primitive.** None new. The library's two one-of-N hosts, ToggleGroup and SegmentedTabs, are locked to one row.

**Construction (the corner rule).** The corner stays `--radius-pill`, and it is correct because the box cannot grow. `radius-role-canon.test.ts:555-568` keeps passing as written.

```css
.toggle-group__item { block-size: var(--toggle-group-item-size); white-space: nowrap; }
.segmented-tab      { box-sizing: content-box; block-size: 1lh; }
```

**The refusal.** `_shared/one-line.ts` is private (not exported), 96 lines, and DEV only. It is wired into both hosts: +4 lines in `ToggleGroupItem.vue`, and in `SegmentedTabs.vue`. It runs a ResizeObserver plus a MutationObserver. It checks on mount, on resize and on content mutation, and names the host, the option and the row count. It refuses when an option holds more than one row, or when a rung-bearing option grows past its rung. Its row test splits at the vertical midpoint of the current row (E §2 item 3). In production an unmigrated multi-line tile is crushed to the rung, which is loud in paint and does not clip (E §1.2).

**The state registers** (E §2 items 4-8):

| state | ToggleGroupItem | SegmentedTabs |
|---|---|---|
| selected | `border-color: var(--foreground)` on `[data-state="on"]` (full ink; SF-4) | a 1.5 px `var(--foreground)` border on the pill indicator, so the edge rides the glide and the squish |
| hover, inside `(hover: hover)` | a light plate on the unselected option, an 8 % foreground mix. The library's `--fill-hover` 0.05 moved 0.00 % of pixels on the preset tabs; 8 % moved 73.52 %. Scale 1.015 | the same 8 % plate |
| press | 0.97 | 0.97 (a 220 ms WAAPI press on the item) |
| commit | a 180 ms colour transition; E has no flood or pop of its own on ToggleGroup | the indicator's glide, squish and eyeglass wake, plus a 200 ms colour transition. No witness measures the glide (HARNESS §6) |
| focus | `.focus-ring`, unchanged | tabs now compose `.focus-ring`. At HEAD they painted the UA `outline: auto 1px`, which measured 1.00 px per side in dark |

All of these sit on `border`, which is neither the ring's channel (`outline`) nor the rim's (`box-shadow`) (SF-5).

**Overflow** (E §1.5). A SegmentedTabs strip whose options do not fit one line collapses to its Select. The trigger is measured overflow, `scrollWidth > clientWidth` on the track or the sum of the tabs' min-content widths exceeding the track, not a fixed viewport breakpoint. A ToggleGroup row wraps, and each option stays one line. A Select is one line by construction.

**Keyboard and ARIA.**
- Linear rows: Left and Right move and check, so the grid-arrow question does not arise.
- `SegmentedTabsSemantics` becomes `"radio" | "tabs"`. The default pill is `radiogroup` / `radio` / `aria-checked` through the engine's `groupRole` and `itemAttrs` (`SegmentedTabs.vue` +17 −10, `tabs/types.ts` `"toggle"` → `"radio"`).
- ToggleGroup keeps `radiogroup` / `radio`.

**Retirements, proposed and not probed.**
- Card's `selected` arm is deleted rather than cured.
- A `selectable` Chip stays for N-of-M toggles, which are correctly `aria-pressed`, and one-of-N sets leave Chip for ToggleGroup.

**Consumer composition, per surveyed site** (E §1.1, §4):

| site | composition under E |
|---|---|
| K1 | a SegmentedTabs of four names plus one readout row (name, `0.35 s · ζ 0.78`, blurb). The four-preset race already lives on the stage derby, and the presets are already heatmap pips, so the detail row is the readout only (P-3). Measured: tabs 104×32.94, used corner 16.47, 1 row. Deletes `:74`, `:84` and `:197-215`. `NO_PRESET` (`:140`) needs a SegmentedTabs model that can hold "none" (open) |
| K2 | a filmstrip: ToggleGroup `size="lg"` of portrait plates (sparkline, rail and ball), the name as a caption outside the plate, and the selected name promoted to the header. Plate 122×44, stage 88×28, used corner 22. Variant `specimen-st` is a SegmentedTabs strip with a 72×17 stage. Or it stays a non-selectable gallery with a separate one-line chooser, which lists the 28 twice. The consumer pads its port 6 px. Deletes `EasingTarget.css:116` and `EasingTarget.vue:410-416` |
| K3 | none (already one line) |
| V1 | ToggleGroup `type="single"` with glyph-only items (named by `aria-label`) and the family eyebrow outside. 40×40, used corner 20. Deletes `:33-35` and the fixed box `:179-181`. It crosses three majors first |
| V2 | "MixSourceSelector (N-of-M thumbnails) has no E answer" |
| V3 | untouched (single line; the enclosure is the F-30a interface) |
| F1 | "HarmonicLevelGrid has no E answer short of dropping its thumbnails" |
| F2 | out of scope |
| F3, F6 | can move to ToggleGroup `type="single"` |
| F4 | not addressed by the seat (single-line N-of-M on `aria-pressed`) |
| F5 | can move to ToggleGroup, but "GallerySearchBar's deselect needs a 'none' arm" |
| F7 | `semantics="toggle"` → `"radio"` at `EquationModeToggle.vue:62`, the one such site in the four consumers |
| C1 | untouched; the one chicago SegmentedTabs mount (`App.vue:91-96`) becomes a radiogroup with no edit |
| G | the Card arm deletion re-points `display/card.vue` (proposed) |
| KF-047 | untouched (UIA-KF-047 survives E; canon) |

**Floor rows landed.**
- FL-dark and FL-PRM: every E cell of T-3 in all three modes; the PRM hover on tabs.
- FL-coarse: no latch.
- FL-44 via the rung.
- FL-forced: not reported.
- X-3: consumers keep their direct writes.
- X-5 is moot: options are one line.
- Not landed: X-1, X-2, X-4 (N-of-M has no E form), X-6 (`NO_PRESET`, F5) and X-7.

### E.2 Public API delta and migration

| change | kind |
|---|---|
| `SegmentedTabsSemantics = "radio" \| "tabs"`; the pill default announces `radiogroup` | clean break (E-1) |
| ToggleGroupItem and SegmentedTabs tab: the block size is the rung, `nowrap` | behaviour; multi-line content is crushed in paint and refused in DEV |
| a full-ink selected edge on ToggleGroupItem and the pill indicator; `focus-ring` on tabs; the hover light plate | paint, library-wide |
| `_shared/one-line.ts` | private; two sites (E-7) |
| Card `selected` arm deleted; one-of-N off Chip | proposed |

- The probe patch: 6 files, +158 −14, with no new component and no new prop.
- Unit re-points (77 pass, 3 fail): `tests/gates/tabs-seam.test.ts` (two cells assert `aria-pressed` and the old template) and `ToggleGroup.test.ts` G-TOGGLE-WRAP (it forbids the string `nowrap`).
- Adoption is a hard break. An unmigrated keyframes.js paints crushed tiles, 208×40 and 150.5×36, on first install (E §6 item 5). The redesign lands in each consumer's own tranche.

### E.3 Battery

The E compositions run on the unmodified library (`e-head`, the consumer migration alone) and on the patched library (`e-lib4` production, `e-lib4-dev`, and `e-lib5` with `--fill-hover` 0.05 plus `specimen-st`), using a private harness copy (E §3):

| witness | `e-head` Chromium · WebKit | `e-lib4` Chromium · WebKit | the E-hosted cells on `e-lib4` |
|---|---|---|---|
| T-1 | 6/10 · 6/10 | 3/5, 6 unmeasured · the same | every E holder "never past its rung": tab 32.94 flat, item 40.00 flat, at +0, +1 and +2 lines. RED: wrap pill Chip 10.70 → 32.11; Button 20 flat but no named role |
| T-2 | 20/20 · 20/20 | **20/20 · 20/20** | tab 16.47 on 32.94; item 20.00 on 40; plate 22.00 on 44 |
| T-3 | 1/18 · 1/18 | 13/18 · 13/18 | **12/12 PASS in both engines.** Chromium p95 (light / dark / PRT): preset 3.57 / 5.11 / 3.46; preset-tg 5.82 / 8.36 / 8.10; specimen 4.16 / 5.82 / 4.60; strip 7.18 / 8.61 / 8.11. RED: card ×3 and chipcell light and PRT, which E retires |
| T-4 | 20/24 · 24/24 | **24/24 · 24/24** | tabs `outline solid 2px offset 2px`, 2.00 px every side; specimen ring whole inside a 6 px port pad |
| T-5 | 26/38 | 28/38 | **16/16 PASS**: preset, preset-tg, specimen and strip are `radiogroup` / `radio`, 1 stop, Right and Left move and check. RED: card (6 cells) and chipcell (4) |
| T-6 | 21/30 · 13/20 | 23/30 · 21/30 | the preset (SegmentedTabs) 6/6 in both engines: hover light 73.52 % · 74.10 %, PRM the same, scale 1.015, press 0.97, commit 200 ms colour + 220 ms press, coarse no latch. ToggleGroupItem (preset-tg, specimen): hover light 0.00 % in both engines, and WebKit "Page crashed" |
| T-7 | 12/12 | **12/12** | no tile paint in four states |
| T-8 | 6/26 | **18/18**, 11 unmeasured, Safari UNMEASURED | |
| W-E | 4/8 (production) | production 4/8 · 4/8; DEV 6/8 · 6/8 | every item one row at its rung; the refusal passes on preset and preset-tg; specimen and strip get no refusal (§E.5) |
| `specimen-st` (`e-lib5`) | | T-3 3/3 · 3/3 (p95 3.93 / 5.54 / 4.08); T-4 4/4; T-5 4/4; T-6 6/6 · 6/6 (hover light 43.76 % · 2.73 %, marginal in WebKit at the 0.05 rung) | a filmstrip of SegmentedTabs is green end to end |

**Refusal evidence** (E §1.2). HEAD compositions on the patched DEV build produce 4 of 4 refusals on the preset tiles and 8 of 8 on the specimen tiles, the same in both engines. Single, tabs and wrap produce 0, so there are no false positives.

**What the consumer migration alone buys** (`e-head`): T-2, T-4 in WebKit, T-7, and the one-line half of W-E. Everything else needs the library half.

**Left RED, and why.**

| cells | cause |
|---|---|
| card and chipcell | retired rather than cured |
| T-6 on ToggleGroupItem | the gleam and the fill cancel (SF-9), and the WebKit crash (SF-8) |
| T-1 wrap pill Chip and Button | E locks only its two hosts |
| W-E specimen and strip | a line inside a graphic's band reads as one row; a line beside a glyph is legal under E's law, so that witness cell is too strict |

### E.4 Chrome and WebKit

- Geometry, the lock, T-2, T-3, T-4, T-7 and T-8 agree to 0.1 px or 0.2:1 on every E cell.
- The indicator's p95 separation is higher in WebKit: preset 11.57 / 15.78 against 3.57 / 5.11.
- ToggleGroupItem hover hangs WebKit (`e-head`, 120 s) or crashes it (`e-lib4`). SegmentedTabs hover does not. The E patch neither causes nor cures this.
- On the 390 px phone, the overflow, the collapse and the wrap are identical in both engines. Without `responsive`, a SegmentedTabs strip of four long labels pans the page 183 px (573 against 390). `:responsive="true"` collapses it to a 155.5×40 Select at the fixed 640 px breakpoint. A ToggleGroup row wraps to three rows, 342×128, with no pan. There are 0 DEV refusals (E §1.5).

### E.5 Open gaps, verbatim (from D4-E; it has no single "open" section, so each is quoted where it stands)

- §1.2 invariant test: "not written; the harness W-E is its prototype".
- §1.2: "The information design is still the consumer's to change. The refusal also misses three cases: a line that lands in a graphic's band, sets hand-rolled outside the library (8 of X.md's 11), and Chip."
- §1.2 verdict: "N-9's 'fixed at the root' is met for the corner. It is not met for the owner's picture: the Spring and specimen scenes change only when keyframes.js rebuilds them."
- §4 keyframes.js: "The `NO_PRESET` case (`:140`) needs a SegmentedTabs model that can hold 'none' (open gap)."
- §2 item 9: "Retirements. Card's `selected` arm … is deleted rather than cured. A Chip `selectable` stays for N-of-M toggles … Proposed, not probed."
- §1.4: "E closes none of the four [UIA-V-180, UIA-KF-047, UIA-V-332, UIA-F-100]. It also has no answer for three census sites X.md §4.3 lists: V2 …, F1 … and F2."
- §6 item 8: "The hover rung is too faint. `--fill-hover` 0.05 fails the witness on the tabs (0.00 %). E needs 0.08, which is either a new literal or a re-tuned token, and the token has other readers (`control-bit.css:299`)."
- §6 item 4: "ToggleGroupItem cannot carry E's engagement today. Hover light is 0.00 % in both engines … Playwright WebKit crashes on its hover. Two of the three E sites (the specimens, the strip) sit on it."
- §6 items 1-2: "K2, the owner-approved gallery. OD-7 ruled the 28 racing specimens to be the scene …"; "The caption still makes a second row … E moved the second row out of the button, not off the page."
- §6 harness defects: "`__th.rows()` clusters on edge overlap … W-E's 'one line' cell can pass a two-row item"; "T-1 on `e-head` preset-tg matched 23.95 px to `--radius-dock-card` and called the stadium 'named, flat' (a coincidental match)"; "The W-E refusal cell on the strip demands a refusal where the added line lands beside the glyph, which the law allows."
- Safari: "every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)".

---

## SHARED FACTS

Every family inherits these measured facts. Each is stated once, with its source.

**SF-1 · CSS cannot read a box's own block size into its corner.** `container-type: size` collapses an auto-height item. `anchor-size()` is invalid in `border-radius` in both engines. `if()` and typed `attr()` parse in Chromium only, and `if()` reads style, not size. A percentage radius paints elliptical corners (PORTFOLIO §2.1; W §7 with BCD 8.1.3). There are three honest forms:
- rung-bound (pure CSS; Spectrum 2's `self(height)` pill is its shipping twin, W §4)
- measured (a ResizeObserver stamp)
- structural: `:has(> * + *)` works in both engines, reads anatomy, and cannot see a wrapped single label (W §7)

**SF-2 · A custom property resolves its `var()` where it is declared.** `:root { --radius-control: calc(var(--control-rung) / 2) }` computes once at the root, and every holder inherits `0px`, a square, in both engines. The formula must be re-declared on each element that publishes the rung, either per holder or through `:where(*)` (D4-A §2.1, `trap.mjs`).

**SF-3 · A fill never carries the selected state.** Measured selected-against-unselected fill:
- glass-ui HEAD: 1.20 / 1.23 / 1.00 (light / dark / PRT; HARNESS §4)
- the B probe: 1.18-1.55
- the C probe: 1.26-1.42
- the D probe: 1.20 light, 1.00 under PRT
- prior art: 1.12-1.22 (Fluent 1.19; shadcn 1.12 / 1.22)

Under PRT the plate turns opaque and a fill that paints under it reads 1.00:1 (R3-02-08, reproduced by A, B and D). Every shipping system that clears 3:1 does it with an edge at least 1 px wide or with a mark (W §0 item 2, §2). Every consumer that paints its own selection pairs the fill with another carrier (X §4.2).

**SF-4 · `--ink-perimeter` (0.48) does not separate a selected item from its unselected sibling in light.** Its "3.0:1" (`color-radius.css:147`) is measured against the plate. T-3 compares against the sibling's own resting edge, which sits at 14-16 % ink. Four seats measured this independently:

| seat | edge at 0.48 | passing edge |
|---|---|---|
| D4-B Q4 | a 1 px border fails light and PRT; a 2 px layer fails the violet specimen in light, 266 against 291 px² | 2 px in the tone, lightness floored to ≤ 0.42 in light and ≥ 0.80 in dark |
| D4-C §1.4 | 0.00 px² in light and PRT on preset, card and specimen | 1 px at the full tone |
| D4-D §2.3 | 0.00 px² in light and PRT | 1 px at full `--foreground` |
| D4-E §0 item 5 | fails light and PRT (p95 ≈ 2.0); on the tabs indicator at 1 px, fails PRT (p95 1.81) | full ink |

A full-ink edge reads heavy in light (B §6 item 4, C §4 item 5, E §1.1).

**SF-5 · Channel ownership.** `outline` belongs to the focus ring. `box-shadow` belongs to the ring and the rim. The selected carrier uses the plate's `border` or a layer, a mark, or a flood (PORTFOLIO §2.2). Prior art bears this out: Radix paints focus and selection on one `::after` outline and focus recolours it, which is the collision; Fluent splits focus onto `outline` and selection onto border and fill (W §0 item 3). Five consumers spent a reserved channel on selection: K1 on `outline`; V2, F1 and F2 on `box-shadow` / `ring`; F2 on `--ring` as the selection colour (X §0 item 3). The K1 spend leaves a focused tile with no visible focus (HARNESS T-4, 0.00 px).

**SF-6 · The ring's reach is 4 px.** `.focus-ring:focus-visible` paints a 2 px outline at `--ink-perimeter` with a 2 px offset (`base.css:144-151`), and it follows the corner. Any scroll port or `contain: paint` host needs 4 px of clearance. The K2 grid pads 2 px inside FadingScroll and cuts the ring to 1.00 px on top and left (HARNESS §4 T-4). F1 already pads 0.375 rem for this reason (X §4.1 P). B's group pads `--space-residue` and D's pads `calc(var(--focus-ring-width) + 2px)`; each makes the specimen whole at 2.00 px. The ring does not publish its reach as a token (D4-D §7 item 7).

**SF-7 · The WAI-ARIA and HTML content model.** `radio`, `option`, `tab`, `button` and `checkbox` have presentational children; `gridcell` does not (ARIA 1.2 Rec and the 1.3 ED, W §3.1). `<button>` allows phrasing content only, with no interactive descendant and no descendant carrying `tabindex` (WHATWG, W §3.1). Measured in production (C §1.3, B Q1): an option holding a Button and a link has three tab stops, one click runs two owners, an arrow key inside a child moves the selection, and an `<input>` inside a radio loses ArrowRight to the group. Two surveyed sets hold interactive content, F2 and KF-047, and neither is a radio tile (X §0 item 5).

**SF-8 · Playwright WebKit hangs or crashes on ToggleGroupItem hover.**
- `mouse.move` does not return within 15 s, and the next call reports `Target crashed` (HARNESS §4; `wk6b.mjs`).
- Isolated by two seats: pinning `.control-surface:hover`'s background to its rest value returns (D4-B Q3), and removing `.control-surface` alone returns (D4-D §5).
- D4-D narrowed the trigger to painting `--control-surface-bg-hover` (`tokens/glass.css:257`), which is a `color-mix()` whose two operands are both `--glass-plate-*` tokens (each a `color-mix` over `oklch(from …)`, `tokens/glass.css:166-167`). One such operand is fine.
- Card, Chip, Surface, bare-element, ChoiceCard and SegmentedTabs hovers do not hang.
- The fix belongs to the owner of that token, not to any tile family. Real Safari: UNMEASURED. Playwright WebKit and Safari have given opposite results on this library before.

**SF-9 · The ToggleGroupItem hover light channel is 0.00 %.** The capsule gleam lightens while the fill darkens, and the two cancel: R 194.1 → 195.7 at rest → hover (E §6 item 4). At HEAD, p95 is 1.09:1 on the preset and no pixel moves by more than 10 levels (HARNESS §4, §6). `--fill-hover` 0.05 moved 0.00 % on the tabs, while 8 % moved 73.52 % (E §2 item 6). A border lift from 0.14 to 0.48 moved 2.91-7.47 % (D §2.3).

**SF-10 · Every seat's T-6 commit cell passes on a colour transition.** No witness measures the iOS-27 commit (a flood, a pop, a glide; D-2), and T-6 passes a 180 ms colour transition (HARNESS §6). B and C add a 1 → 1.025 → 1 settle; E relies on the SegmentedTabs glide, which no witness reads.

**SF-11 · Grid arrow keys.**
- The platform is linear on all four arrows. The APG radio group, native `<input type=radio>` (measured in a 2×2 grid, the same in both engines: from item 1, Down → 2, Up → 0, Home and End do nothing), reka with `orientation` unset, and Radix all behave this way (W §3.2).
- react-aria's `layout="grid"` walks by geometry, stepping to the same `x` (W §3.3).
- glass-ui at HEAD has a dead cross axis: in the preset and specimen grids, Down and Up do not move (HARNESS §4 T-5).
- The gap already cost a consumer its layout: fourier-analysis EasingPicker collapsed its three-column grid because "ArrowDown mean[t] 'one to the right'" (X §0 item 6).
- Reka's `getFocusIntent` with `orientation` set leaves the cross axis dead in the same way (W §1; D §1.5).
- B, C and D each wrote a geometric walk into `useTabRovingFocus`, behind different switches. The dock and SegmentedTabs unit suites passed under B's; T-2 and the tabs cells stayed unchanged under C's and D's.

**SF-12 · The radius role table matches every system read.** Radix RadioCards stay on 6/8 px × factor even under `radius="full"`. M3 cards are 12 dp and filter chips 8 dp. Spectrum 2 SelectBox is 10 px. Fluent cards are 2/4/6 px. Apple keeps the capsule for touch controls and standout actions (W §0 item 1). No shipping system puts a multi-line option on the stadium.

**SF-13 · HEAD baselines** (HARNESS §4, reproduced row for row by A, B and C):

| witness | HEAD |
|---|---|
| T-1 | 3/8 |
| T-2 | 12/12 |
| T-3 | 2/15 |
| T-4 | 8/20 |
| T-5 | 19/38 |
| T-6 | 17/24 (WebKit 9/14) |
| T-7 | 4/12 |
| T-8 | 0/16 |
| W-A | 1/3 |
| W-B | 1/13 |
| W-C | 0/7 |
| W-D | 0/4 |
| W-E | 0/6 |

The preset tile is 208×61.58 with a `9999px` corner used at 30.79 px, and the specimen is 150.53×100.16 used at 50.08 px. Both are 1.00 of h/2.

**SF-14 · Consumer drift.** keyframes.js `9262899b` removed the live track and `rounded-pill` from K1 and now sets `border-radius: var(--radius-field)` itself at `SpringPhysicsFacet.vue:197-198`, and K2 does the same at `EasingTarget.css:115-116`. T-1 therefore reads 16 px on the shipped composition and the stadium on the library, and T-7 stays RED because the consumer paints the card rung itself (X §0 item 1, §2). The harness scenes transcribe the current consumer, keyframes.js `dd7eae52` (HARNESS header, §6). X §5 item 1 asks each pass-2 reading to say whether it measured the library or the shipped composition.

**SF-15 · A ResizeObserver stamp lands before paint, and a synchronous reader still sees the old corner.** HTML's "update the rendering" loop delivers resize observations after layout and before paint (W §7). A2 measured 0 unstamped tall boxes on mount, content change and font swap in both engines, and a synchronous read in the same task sees the stadium (D4-A §3.2). No consumer server-renders Vue today (D4-A §3.2).

**SF-16 · The one engine.** Every family takes roving focus, role-per-mode ARIA and the commit from `useSelectionGroup`. `overfit-structure.test.ts:415-462` forbids a second assembly (PORTFOLIO §0, §2.4). Two ARIA answers exist for one-of-N today: ToggleGroup `type="single"` is `radiogroup`, and SegmentedTabs `semantics="toggle"` is a `group` of `aria-pressed` buttons (PORTFOLIO §1.3 item 7). C and E each re-point SegmentedTabs to a radiogroup in about four lines, and it then passes T-5 `tabs`.

**SF-17 · Card binds `role`, `tabindex` and `aria-selected` after `v-bind="$attrs"`** (`Card.vue:66-68`, UIA-F-43). A later `undefined` wins, so any role or tabindex delivered to a Card is lost silently (C §1.1). Card's `selected` arm has no consumer in the four repos. Its callers are two glass-ui demo stories, `display/card.vue` and `data/search.vue:575-584`, and deleting it gives exactly two `vue-tsc` errors (B Q5).

**SF-18 · A Surface's corner is `--radius-ctx`, a relay.** A plain Surface paints 16 / 12 / 24 px in root, panel and dock-card hosts (`glass/ladder.css:64`). `DESIGN.md:523` describes the `glass-plate` utility, not the tier classes Surface emits (C §1.2).

**SF-19 · Chip `shape="cell"` has zero consumer sites** in value.js, keyframes.js, fourier-analysis and chicago. Its one site is the static demo chip `demo/stories/forms/chip.vue:50` (D §1.1; B Q5). value.js left it at 7.0.0 because "the `cell` shape resolved to a capsule" (X §1.1 V1). `vue-tsc` does not flag `<Chip shape="cell">` once the shape is deleted from the union, which is the E-11 silent-binding class (B Q5).

**SF-20 · Harness defects found by the family seats.** None was edited in the checkout.
- `scenes.mjs:282-284` does not `@source` `chipVariants.ts`. Every harness pill Chip, strip and chipcell row therefore measures an unpadded chip: 25.9×21.4 against the library's 53.9×33.4. The fix is to add `@source "${wt}/src/components/**/*Variants.ts"` (D4-A §4.3; D4-D §1.1 saw the same with `.py-2\.5`).
- T-1 and W-A read synchronously after a mutation (D4-A §3.2).
- `__th.rows()` clusters on edge overlap, so two stacked lines at `line-height: 1` read as one row (D4-E §6).
- T-1 matched a 23.95 px stadium to `--radius-dock-card` by coincidence (D4-E §6).
- The W-E strip cell demands a refusal for a line that sits beside a glyph (D4-E §6).
- `build.mjs`'s `FAMILY_DIRS` names `choice/` and `selection/`, which are the sketch names (HARNESS §6).
- T-7 is a computed-style witness, so it cannot see a redundant consumer rule whose value equals the library's (D4-C §3, D4-B §3).

**SF-21 · RadioGroup cannot host a tile.** `RadioGroupItem.vue:36-49` renders no content, and its item text measured empty on all four items. Its reka roving leaves the cross axis dead in a 2×2 grid. It is a second roving machine that the one-engine gate cannot see (D §1.5). Its two consumers are value.js dot rows, which no family touches (X §1.3).

**SF-22 · Consumer pins.** keyframes.js and fourier-analysis are on `10.0.1` and chicago on `^10.0.1`. value.js is on `^7.0.0`, so any value.js migration crosses three majors first and carries that addendum in its own tranche under E-6 (X header, §5 item 4).

**SF-23 · The census.** Eleven selection sets in four repos hold more than one line, a thumbnail, a live readout or an interactive child. Three are on a glass selection primitive (K1, K2, V1). Eight are hand-rolled, and six of those put an exclusive or multi choice on `aria-pressed` or on nothing (X §0 item 2). Of the 18 F-30b rows, D4 closes 5 plus O-58, and 12 ride F-30b's canon row whatever the family (X §3). The constraints X-1..X-7 (X §4.4) are the census's additions to the battery, and no family lands all seven.

**SF-24 · Recognition.** Among the 28 easing specimens, 8 of 378 pairs differ by less than 1.5 px everywhere on a 28 px or 33 px plot. No portrait size separates them, so every specimen composition keeps its names (D4-E §1.3). Prior-art pickers show curve glyphs for 4-5 items and switch to names past that (W §6).

**SF-25 · Nesting.** Inside the 16 px quiet host Card, a plated tile stacks a second veil, 1.32-1.38:1 against the host's pad in light, and reads as a sub-card. A bare item has no plate at rest (1.00:1) and reads as an option (D4-C §1.5). A 20 px tile inside the 16 px host is rounder than its container (D4-A C-10).

**SF-26 · Safari.** Every real-Safari cell in every input is UNMEASURED (owner's safaridriver checkbox). Every WebKit figure above is Playwright WebKit 26.5.
