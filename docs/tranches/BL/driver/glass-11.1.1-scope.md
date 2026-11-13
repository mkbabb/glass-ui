# glass-ui 11.1.1: scope

11.1.1 is the patch after 11.1.0. The release that cuts it reads this file. It carries five defect cures that the restraint audit found and that break nothing: no export or token is removed and no default a consumer chose is changed. They were booked to 12.0.0 with the deletions; holding them there would leave consumers on local overrides for five releases, which the precept forbids (C-16). The ruling is `review/fable-2026-11-10/plans.md` item 3.

## Rules

- **Cut:** `release/11.1.1` from master, after 11.1.0 has published and merged (11.1.0 itself does not tag until `v11.0.1` is merged into it).
- **The list is frozen at the five rows below.** No INBOUND row dated after this file joins it. A defect on the published line found later goes to the next patch; anything else goes to 11.2.0 or 12.0.0.
- **One commit per row,** source and tests only, so 11.2.0 and 12.0.0 pick each up by merge with no second writing.
- **One witness per row,** read RED on `v11.1.0` and GREEN on the branch, and named in the row's commit message. A witness is static (the built CSS, or vitest) unless paint or geometry is the claim; then it is one Chromium cell. A WebKit cell is added only where the row says the engines can differ.
- **No comment line added in `src` carries a row id, a round id or seat vocabulary.** The close seat runs the grep.
- **Critics gate on this list and nothing else.** A finding outside it goes in a "for INBOUND" section and does not count against a clean round. Two clean rounds close.

## Rows

1. **G2, Tooltip keeps a gutter from the viewport edge.** `TooltipContent` passes no collision padding (`src/components/tooltip/TooltipContent.vue:37-40`), so its box can touch the edge: value's "Add current color" tooltip spans x 1019 to 1440 at a 1440 viewport. The cure is the padding `PopoverContent` already passes, 16 px (`src/components/popover/PopoverContent.vue:62`), as a prop with that default.
   - Witness: one Chromium cell at 1440 and 390, a trigger 4 px from the inline-end edge: the tooltip's box lies at least 16 px inside the viewport on every side. The placement is the positioning library's arithmetic, the same in both engines, so there is no WebKit cell.

2. **G7, DropdownMenuItem has a gap between its glyph and its label, and shows `aria-current="page"`.** The row lays its glyph and label with 0 px between them, and a row marked current paints like its siblings (fourier's nav menu). The cure is a gap on the row from the spacing scale, and one rule for `[aria-current="page"]` on the shared menu row (`src/components/_shared/menu/menu.css`). The current state adds no weight, no caps and no second glyph.
   - Witness: static over the built CSS for the gap (the menu row's rule declares a non-zero `gap`), and one Chromium cell for the state, light and dark: the current row's fill or ink differs from an unmarked sibling at rest, and differs from the highlighted row.
   - Open question 1 decides what the current state paints.

3. **G8, Command opens with its selected item in view.** daraksha's surah finder opens at row 1 with row 93 selected. The audit asked this as a question, so the row's first act is to reproduce it on `v11.1.0`: a Command with 120 items and item 93 selected, opened. If item 93 is already in view, the row closes as answered, with the recipe in the README and no source change. If it is not, the cure scrolls the selected item to the nearest edge of the list on open, with no animation and no focus move.
   - Witness: vitest if the list's scroll offset can be read in the test DOM; otherwise one Chromium cell: after open, the selected item's box lies inside the list's scrollport. Keyboard and pointer opens both.

4. **K2, a seeded curve keeps its name.** An `EasingPicker` given `initial.points` that equal a catalogue curve's points shows "Custom" (`src/components/easing/usePicker.ts:232`, the seed). The cure matches the seed against the catalogue once, at the seed, and shows the matching curve's name.
   - Witness: vitest on `usePicker`: seeded with the points of three catalogue curves, the name is each curve's; seeded with points that match none, it is "Custom". No browser cell.

5. **O-225, every focus ring still painted through `--focus-ring-shadow` moves to the outline recipe.** The token paints a 30 % ring that the source itself measures at 1.91:1 (`src/styles/utilities/base.css:139-143`, `src/styles/tokens/scale-paper.css:40`), and critic 12 of 10.1.5 read 2.04 to 2.20:1 on the Slider and the SortableList handle in both engines (`release-10.1.5` worktree, `docs/release-10.1.5/critique-12.md` S3, witness c12e). The recipe that replaces it already ships: `.focus-ring:focus-visible`, a `--focus-ring-width` outline in the foreground at `--ink-perimeter`, offset 2 px (`base.css:144-151`).
   - **All readers move in one commit.** The list is the output of `git grep -n "var(--focus-ring-shadow" -- src` at the cut, comments excluded. On master today it is: the Slider's track and thumbs (`src/components/slider/styles.css:179`, `:237`, `:292`), the SortableList handle (`src/components/sortable-list/styles.css:193`), the Timeline (`src/components/timeline/Timeline.vue:574`), the data table (`src/components/data-table/styles.css:115`), `.popover-content:focus-visible` (`src/styles/utilities/base.css:89`), `.input-bar:focus-within` (`src/styles/utilities/components.css:41`), the dark-mode toggle (`src/components/dark-mode-toggle/dark-mode-toggle.css:31`) and the disclosure trigger (`src/components/_shared/disclosure/disclosure.css:47`, already cured on the 10.1.5 line and arriving through 11.0.1).
   - Where a reader's `box-shadow` lists the ring beside another layer (`slider/styles.css:237`, `:292`), the other layer stays and only the ring leaves the list.
   - **The token stays defined,** with its aliases `--dock-ring` and `--shadow-focus-ring`, so a consumer that reads any of them sees no change. 12.0.0 deletes them (`waves/W-R.1.md` §2.1).
   - Witness: c12e, re-run as it stands, in Chromium and WebKit (the ring is paint, and the two engines draw outlines on rounded boxes differently): every focusable atom's ring reads 3:1 or better against its ground in light and dark. And one static check: no declaration in `src` reads `var(--focus-ring-shadow`.
   - The CHANGELOG names the change in consumer prose: focus rings on these controls are darker and drawn as an outline.

## The close

The full release battery, the tag `v11.1.1`, the push and the CI publish under the dist-tag the publish step chooses. Then the notices: value-js-65 (value, keyframes, fourier, daraksha), sci-report-62 and sci-report-b4 (atlas), sci-report-58 (Gregg), gaggle-89. Master merges the branch before `release/11.2.0` is cut.

## Open questions

1. **(measurement, on a capture) What the current menu row paints.** The shared menu row has no selected or current state today. Default: the current row carries the row's hover fill at rest with full-foreground ink, and the highlighted row stays distinct from it by its own fill. The fix seat shows one capture in each theme before the commit; if the two states cannot be told apart at a glance, the current state becomes ink alone.
2. **(measurement) G8's first read.** Whether the selected item is already in view on `v11.1.0`. Default: it is not, and the cure is built.
3. **(measurement) `.input-bar:focus-within`.** It marks a container on `focus-within`, not a control on `focus-visible`, and its ring sits beside a border colour change. Default: the patch changes the paint and not the trigger, so the bar takes the outline on `:focus-within` as it takes the shadow today. Whether a pointer click should ring the bar at all is a default change and is not this patch's.

## Added before the cut (2026-11-11)

- **O-229:** every `:has()` rule carries a subject compound. Gate: the Chromium 4x trace of one insertion (no more than 0.2 ms over the rules-removed page) and the static check over built CSS.
- **O-230 (3):** a HandMark out of view does not run its settling transform at a scroll stop. Witness: no transform animation on an off-screen mark across a scroll stop.
- **O-234:** a `PopoverTrigger` nested inside a `Tooltip` keeps its popover's anchor. Confirm the cause first (the trigger's anchor registering with the nearest Popper root), then cure it in glass's popover context. Witness as on the row, both engines.
- **O-237 (b), (c):** a liquid reveal's episode runs on the row's settle clock, not 4× its response, and a reveal on a new trigger starts a fresh episode. Witness: Gregg's two-pick sequence, per-frame transform.
- **O-238:** the dock layer paints no outline when it holds programmatic focus (WebKit witness); DataTable's idle sort glyph adds no scroll width.
- **O-246:** `useSelectionIndicator` and `useSelectionGroup` measure layout boxes, so a pressed control's scale never reaches the mark. Witness: after a click the settled indicator equals the control's `offsetWidth` within 0.5 px.
- **O-247:** a `:collapse="false"` GlassDock does not run its pane measurer (no forced layout at mount, no dock script on a resize; Chromium trace at 4x). The selection indicator's first measure waits for the frame after paint.


## Added 2026-11-11 (Gregg pass 26; small non-breaking fixes, each one commit and one RED-then-GREEN witness)

- O-256: the dock's muted ink stays a muted step of the legible ink, not `contrast-color()` at full strength.
- O-257: dock control opacity on `--duration-fast`.
- O-258: no dock-cap scroll-timeline animation in the running state at idle in WebKit (`document.getAnimations()` witness, both engines).
- O-264: full-travel Sheet motion critically damped on the same response (no overshoot past rest; witness: sampled frames at 390 and 1440, both engines, max excursion past rest 0.5 px or less).

## Added 2026-11-12 (afternoon)

- O-284: a control nested in a select-style trigger takes the press state (read first whether it is glass's).
- O-285: Button's press is a non-uniform squash (about 1.03 × 0.92); remove the leftover or make it uniform, per the owner's answer on the press shrink.
- O-287: the light-theme Chip stacks border, fill and shadow; a token change only.
- O-288: a touched Slider folds with its dock (if 11.0.2 did not take it).
- O-293 (b), (c): the dock's backdrop sampler defers its first sample one frame; LabeledSwitch passes a plain-string label as aria-label. Each with a trace witness: no forced layout inside the mount task.
- O-280 and O-283: the Slider geometry cure from W-B.18, if it changes no API.
- O-299 (c): on a coarse pointer the dock folds when the window blurs (a tap into a cross-origin iframe), with a witness.
- O-298 (gaggle): a quiet Button paints a state for aria-pressed; DataTable sort headers get a hover statement and a 24 px minimum target; dock tab seats reach the coarse-pointer minimum. Read first: the `#search` slot drawing its Input under the pill at 1440 (gaggle's proofs.md), and cure if it is glass's.
- O-308 (6): `gl-dock-cap` scroll animations do not run at idle; the dock tabs' 300 ms sheen takes a token or goes.
- O-309: a pointer-opened Select's focused row paints under forced colors; `--corner-shape-thumb` is removed or read; the two test headers lose their row stamps.

## Added 2026-11-13: the animation audit (O-305)

Every row of `docs/tranches/BL/audit/animation/INBOUND-ROWS.md` whose release is 11.1.1 is in this patch (INBOUND O-311 to O-335; the evidence, cause and cure for each are in `audit/animation/AUDIT.md`). First, because one change cures many: the six spring curves are regenerated so they reach their end without a last-frame step (`src/styles/tokens/scheme-spring.css`, `src/composables/motion/spring/springProjection.ts`). Then the release hand-offs (the tabs drag, the sortable drop, the sheet's detents), the reveal reversed mid-open, the tooltip's entrance, the dock run's glide, the select's sheet on a phone. Each row's witness is its frame table from the audit's harness (`audit/animation/harness/`), RED on v11.1.0 and GREEN on the branch.
- O-336 (c): name what DropdownMenu's click-open waits on (it does not open under a paused clock); cure if it is a needless timer.
- O-337 (speedtest): the Timeline disc's hover is tweened; focus rings on the dock and form controls meet 3:1 against their ground; read why dock seats shift 4 px when a popover opens and cure it; the popover leaves on opacity and scale only, on its enter curve.
