# Critique (sci seat), 2026-11-27

Model: claude-opus-5-5. Read in full: `ROOT.md`, `NOTE-atlas.md`, `cure.patch`, `record/`,
`tools/witness.mjs`, `tools/judge.mjs`, `tools/harness/`, and the 2026-11-24 section of
`driver/glass-11.1.1-scope.md` (O-429).

**Verdict: holds after fixes.** One blocking item (GL-18 by keyboard, a regression in
WebKit). Five notes.

## How it was read

- A `git archive` of `release/11.1.1` at `e12ad9f02` (its `src` and `tests` equal
  `48ab5d94e`, the seat's base) in two plain trees, `trees/sc-base` and `trees/sc-cure`,
  with `node_modules` a symlink. `cure.patch` applies to `sc-cure` with `patch -p1`, no
  offset and no fuzz: 16 files, +303 −37, as stated. `vue-tsc --noEmit -p tsconfig.src.json`
  passes on the cured tree. Phone-scroll's `cure.patch`, `scrim.patch` and `detents.patch`
  apply over it with no offset or fuzz (their `src` hunks; my copy held `src` only).
- The witness page was built against each tree (the builder's `harness/`, plus six cells of
  my own) and read with the builder's `witness.mjs` and with my own probe. Every run went
  through the guard, WebKit under `--exclusive webkit`; one browser per run, a new context
  per cell, each closed in `finally`.

## The builder's witness, read again

- **Chromium 149.0.7827.55:** all 18 cells reproduce `record/verdicts-chromium.md`
  reading for reading (16 red on 11.1.1 and green on the cure; `dlg-pos` and `button`
  green on both).
- **Playwright WebKit 26.5:** all 18 verdicts reproduce `record/verdicts-webkit.md`, and
  every reading but one: on 11.1.1, `stack-expand` read focus on `body` during the top's
  exit, where the record has it in the lower surface. ROOT already says that reading is not
  steady on 11.1.1; the cell is red on other grounds, and the cure reads focus in the lower
  surface in both reads. `dlg-scroll` loaded within its limit on this run.

## Blocking

**B1. GL-18 by keyboard: the page and the outer scroller still move, and in WebKit the cure
moves the page further than 11.1.1 did.** The `selgroup` witness picks Option 7 with a
click. Picked with the keys instead (focus on Option 0, then ArrowRight, read after every
press), the first press moves the page and the outer scroller:

| | 11.1.1 | cure |
|---|---|---|
| Chromium | page 0 → 470, outer 0 → 20 | page 0 → 470, outer 0 → 20 |
| WebKit | page 0 → 87, outer 0 → 20 | page 0 → 470, outer 0 → 20 |

The cause is the roving focus, which `useSelectionGroup` composes:
`tabs/composables/useTabRovingFocus.ts:124` calls `buttonRefs.value[idx]?.focus()` with no
`preventScroll`, and the browser scrolls every ancestor to the focused item. On 11.1.1
WebKit's own reveal of the focused item came after `scrollIntoView` had already brought it
into view by the nearest distance (87 px), so it found nothing to do. With that call gone,
WebKit's reveal runs on its own and scrolls the page 470 px. The brief's outcome is
"scrolls only its own run to the chosen item, never an outer scroller or the page", and the
note tells atlas "Choosing an item scrolls only the control's own strip to it, never a
scroller around it or the page". In automatic activation an arrow key is a choice.

Cure: focus with `preventScroll: true` in `focusOption` and reveal the focused item in its
run there, since manual activation moves focus without a select, so the reveal belongs to
the focus move as well as to `select`. Add a keys arm to `selgroup`, red on 11.1.1 in
Chromium. The reads above are the witness for it. If the owner would rather keep the
browser's focus scroll for keyboard users, ROOT and the note have to say a pointer or touch
pick, and the WebKit regression still needs an answer.

## Notes (not blocking)

**N1. GL-6 in the dark scheme.** Under emulated print with `html.dark`, the card flattens
to a solid dark fill (rgb 53, 42, 34), the ink stays light (rgb 233, 230, 226) and the body
stays near black (rgb 11, 10, 9); `print-color-adjust` computes `economy`. Both engines
read the same. A browser printing with background graphics off (Chromium's default) drops
the fills and puts light ink on white paper. 11.1.1 is the same, and the brief names no
scheme, so this is not a regression. But the patch's comment and the note call the result
"paper", and for a reader in dark mode it is not. If the owner wants it in 11.1.2, the print
layer can force the light scheme (`color-scheme: light` on `:root` and `.dark`), provided
every dark token rides `light-dark()`; that has to be read, not assumed. Nothing was sent to
paper or a PDF here either.

**N2. GL-13: rungs inside the inset band collapse onto the full rung.** With detents
`[0.5, 0.9, 0.97, 1]` and a 47 px top inset (Chromium, CDP override), rung 0.97 and rung 1
both read top 47 and height 797 on the cure (11.1.1: top 25 and top 0). The cap is a
`max-block-size` over a size still computed against the full `100dvh`, and the drag maps
against `innerHeight` (`sheet/detents/use.ts:105`). So for the last 47 px of travel toward
the full rung, and the first 47 px away from it, the finger and the scrim move while the
plate stands still. Nothing jumps, but the plate stops following the finger. The brief's
case (`[1]`) passes. A root form takes the rung as a share of the safe height
(`100dvh − env(safe-area-inset-top)`) in `--_sheet-size` and in the drag's px.

**N3. GL-12: a second Escape during the top's exit is swallowed.** On the enlarged figure,
two Escapes 150 ms apart close the Dialog and leave the figure open; a third press collapses
it (both engines). A Dialog over a Dialog and a Dialog over a Sheet do the same on both
trees (Chromium; reka's layer stays mounted through the exit), so the figure now agrees
with them. The note's second ask ("press Escape once, then again") should say to let the
data view finish leaving first, or atlas may report a fault that is not one.

**N4. The sort button re-derives a token.** `min-block-size: max(2.25rem,
var(--control-floor))` restates `--control-h-sm` (`tokens/sizing.css:27`) without
`--ui-scale`. The readings are the same today (36 and 44 px), but a site that sets the scale
moves the small Button and not the sort target. `min-block-size: var(--control-h-sm)` is the
same rule from one source.

**N5. GL-11 reaches the plate only when the plate scrolls.** `overscroll-behavior` acts on a
scroll container, and the plate is one only under `scroll` (`DialogContent.vue:229`). A
body a site scrolls inside the plate still chains to the page under `:modal="false"` unless
it sets its own `contain`. atlas's own bodies already do (`GlossaryDialog.vue:264`,
`EntityDetail.vue:586`). The note's "A Dialog's scrolling body now holds its scroll" is true
of glass's scrolling plate; one clause would keep atlas from reading more into it.

## What held, beyond the witness

Both engines unless marked.

- **GL-6, more surfaces.** Under emulated print the cure hides the hover arm, an open
  DropdownMenu and an open Select list; 11.1.1 prints all three. Every atlas popover is on
  the hover arm (`Term.vue`, `FigureNote.vue`, `EasterEgg.vue`), which carries the same
  `popover-content` slot.
- **GL-12, painted.** reka's modal lock sets `pointer-events: none` on the lower plate, so
  the witness's `probe` hit test reads the lock, not the paint. With every element made
  hit-testable, a point on the lower Sheet and on the enlarged figure outside the top plate
  hits the top scrim on the cure (lower plate z 51, scrims 50 and 52) and the lower surface
  on 11.1.1 (z 140, scrims 50).
- **GL-17, frame by frame.** On the cure focus is on the trigger 19 ms after a keyed pick and
  27 to 43 ms after a pointer pick, and stays there through the leave, with the list inert
  and the page still at 1000. On 11.1.1 the row, then the list itself, hold focus for about
  210 ms until the unmount.
- **The broadened handoff** (`!active || active === document.body`) changes nothing for a
  `:modal="false"` Dialog closed by a press on plain page text: focus returns to the trigger
  and the next Tab reaches the control after the text on both trees (Chromium).
- **Laws.** Nothing changes instantly: the covered plate drops its rung under the top scrim
  as it fades in, and keeps its covered rung until that scrim has gone, so the swap is never
  seen. No masking fallback was added (`env(…, 0px)` is the spec's own default; the server
  branch of `useModalLayer` stacks nothing because nothing is open there). No change adds
  inline overflow. The cure sits at the root for every row but GL-18 (B1).
- **The roster gate.** `.published-roster` lists theme tokens and utilities only; the patch
  adds neither. `gen-component-styles.mjs` reads the layer statement with a regex that the
  longer statement still matches.

## Consumers (read only)

- **atlas** (`.u-build/lv-atlas`, glass 10.1.2): its popovers are all on the hover arm, which
  writes no `aria-controls` (reka's HoverCardTrigger) and which the patch leaves alone. So
  GL-8's change does not reach atlas's current triggers; the note could say so.
  `DataDialog.vue:123` holds its own Escape claim while open; with the cure it is redundant,
  not in conflict. Its print rules (`VizAppendixDock.vue:443`, `FootAnatomy.vue:174`) set
  nothing glass's print layer contradicts. `DockThemeToggle` passes its own name, which still
  wins (`...rest` follows the fixed name). Its SegmentedTabs (`PlateDial.vue:205`) sit in a
  popover; whether B1's page scroll reaches them there was not read.
- **Home Assistant** (`hassio-config/frontend`): ToggleGroup in eight places inside shadow
  roots. `revealInRun` walks `parentElement`, which stops at the shadow root, so a run outside
  a card's shadow root no longer scrolls and one inside it does. No print, Popover click arm
  or ExpandableContainer use.
- **fourier**: its own toggle already reads "Dark mode" with `aria-pressed`. **value.js,
  keyframes, daraksha, gaggle**: no click-arm PopoverTrigger, no ExpandableContainer, no print
  rules, no reference to the old toggle names.

## Not read

Real paper or PDF; Firefox; a device's safe area (WebKit has no inset override, so N2 is
Chromium only); three layers, and a Sheet over a Sheet (atlas's DataDialog over its place
sheet on a phone: the order arithmetic holds, the paint was not read); the combined 11.1.2
tree in a browser; the full unit suite.

My trees (`trees/sc-base`, `sc-cure`, `sc-probe`, `sc-out`) are deleted, and with them
`trees/sci-red` and `trees/sci-green`, an earlier run of this seat that held only the archive
and the archive with the patch applied.
