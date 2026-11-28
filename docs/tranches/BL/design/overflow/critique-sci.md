# Critique of v7: round 3's answers and atlas's GL-16

Written 2026-11-27 by claude-opus-5-5, an adversarial reading of `cure.patch` (v7), `STUDY.md`, `SWEEP.md` §8, `SITES.md` and `check-overflow.mjs` against release/11.1.1.

## Verdict: holds after fixes

The three blocking items of the third critique and atlas's GL-16 are cured at the root. Each witness I read bites on the base and holds on v7 in Chromium by touch, and Playwright's WebKit computes the same styles and sizes. One item blocks: three sentences the patch writes into source say things my readings contradict. Two findings are major: the strip's inline cap takes a vertical strip's pill out from under its labels, and a strip that scrolls hides its selected tab at rest.

## How I read

- **Tree.** `trees/critic-sci-c`: a `git archive` of release/11.1.1 at 871be44bc, without `docs/` and `tests-visual/`, its own git root, `node_modules` a link to the main checkout. Its `src`, `tests` and `demo` match 4f1fa667e. `git apply --check cure.patch` is clean. I built `dist-base`, applied the patch and built `dist-cure`, both with one witness page of my own (`/sci.html`). The tree is deleted. The readings are in `record/inspect/critic-sci3.{chromium,webkit}.json` and `critic-sci3-b.{chromium,webkit}.json`; the page, the probes and the check's two readings (`check-base.chromium.json`, `check-v7.chromium.json`) are in `record/inspect/critic-sci3/`.
- **Engines.** Chromium is Playwright 1.61.1's headless shell 149.0.7827.55, at 390×844 with touch, `isMobile` and scale 2, and at 1440×900. WebKit is Playwright's WebKit 26.5, not Safari, read under the WebKit lock for computed styles and sizes only, since it takes no touch input. Safari and an iPhone were not run.
- **Gestures.** CDP touch events in Chromium's 390 cell, 12 moves 16 ms apart, the Sheet's drag 30 moves. A strip gesture starts on a tab that is not selected, as SWEEP §8 does. One browser per run, a context per cell and build, closed in `finally`; the previews were children of each guarded call.
- **The cells.**
  - In-flow GlassDocks: three seats that fit; three seats in a host 2, 4, 8 and 12 px narrower than the dock asks; eight seats.
  - Three 200 px `overflow-y: auto` columns, each with one ConfiguratorLayer: an open layer holding a full-width selected Chip, an open layer holding a 491 px `nowrap` line of CSS, and a closed layer holding a 300 px box.
  - Strips: three tabs in a 358 px `touch-action: none` box; eight tabs in a 267 px `none` box; eight tabs in a plain 267 px box; a vertical strip of eight in a 100 px box; eight tabs in 267 px with the last one selected at load.
  - A bottom detented Sheet (rungs 0.4, 0.7 and 1) whose DialogHeader holds a three-tab and an eight-tab strip.
- **Also run.**
  - `check-overflow.mjs` on 12 demo routes, base then v7, Chromium, 390 touch and 1440 light: the configurator, sheet, tabs, springs, labeled-field, toggle, timeline, nav, rail and chrome dock, aurora and blob pages.
  - vitest with two workers on 21 files: every gate and component test that names a file the patch touches, `overfit-structure`, `comment-ratio`, `type-hygiene` and `tabs-seam` among them. 236 passed and 2 expected fails.
  - `vue-tsc --noEmit -p tsconfig.src.json` on the patched tree: clean.

## Blocking

### S1. Three source comments state what the readings contradict

1. **`run.css`, the GL-16 rule.** The comment says "on a run whose seats all show (`data-run-fits`) there is nothing to pan". A run flagged as fitting keeps a range of its overrun.
   - Chromium, a host 2, 4 and 8 px narrower than the dock asks: v7 reads 196/194, 196/192 and 196/188 at 390 touch, and 213/211, 213/209 and 213/205 at 1440, each with `data-run-fits` set.
   - WebKit, the 8 px squeeze: 196/188 and 213/205, flag set.
   - The same file says so at `:386-395`: a run whose seats show "scrolls at most twice the ring's reach".
   - STUDY's GL-16 row repeats the claim: "A run that hides nothing has no range, so nothing is lost".
   - The behaviour holds (below). The sentence should say that a flagged run can keep up to the two reserves' range, which a horizontal swipe still pans.
2. **`useStripOverflow.ts`.** The comment says "A tab is never narrower than its label (`nowrap`, and no clip on the tab), so the tabs' span is the content's". That is false on the vertical arm, where a stretched tab takes the capped strip's width (M1).
3. **`segmented.css`, the `[data-overflow]` comment.** It says "a selected tab scrolls itself into view (`useSelectionGroup`)". `useSelectionGroup.ts:200` scrolls a tab into view when it is pressed or keyed. At load and after a resize the selected tab stays out of view (M2).

The fix is wording, unless M1 or M2 is taken, which would change what the second and third sentences describe.

## Major

### M1. The strip's inline cap takes a vertical strip's pill out from under its labels

`segmented.css` gives every `.segmented-tabs` `max-inline-size: 100%` and `min-inline-size: 0`, the vertical arm included. A vertical strip is a flex column whose tabs stretch to its width. So in a box narrower than its widest label, the capped strip narrows its tabs below their labels, and the labels run out of the pill.

Chromium, a 100 px box, the eight measure labels, vertical:

| | 390 touch | 1440 |
|---|---|---|
| base | strip 107.9 px, every label inside it | strip 142.3 px (42 px past the box), every label inside it; text 26.3 px past the box |
| v7 | strip 100 px, tabs 94 px, "Transportation" 81.9 px of text: fits | strip 100 px, tabs 92 px, "Transportation" 110.3 px of text, **26.3 px past its tab and the pill**; no `data-overflow`, no scroller |

The text runs past the box by the same 26.3 px on both builds. v7 bounds the pill and leaves the label outside it. This is a new failure shape, not a new overflow.

No site sets a vertical strip this narrow. atlas's `PlateDial` turns to the vertical strip only when the horizontal row passes its seat's cap of `min(28rem, 100vw - 2rem)`. value.js, keyframes, fourier and daraksha set no vertical SegmentedTabs.

Two forms would read clean:
- keep the cap and the zero minimum on the horizontal strip only (`:not(.segmented-tabs--vertical)`), where F1 lives;
- or let a vertical tab wrap its label between words.

Either way, comment 2 in S1 needs to change. WebKit reads the same: at 1440 the base strip is 142.4 px with every label inside it, and v7's is 100 px with 92 px tabs and "Transportation" (110.4 px) 26.4 px past its tab; at 390 the label fits on both builds.

### M2. A strip that scrolls hides its selected tab at rest

Eight tabs in a 267 px box, the last selected at load (Chromium; WebKit reads the same offsets, 582 and 763 px, and the same 0 % on v7 at load and after the resize):

| | 390 touch | 1440 |
|---|---|---|
| base | strip 654 px, the tab 582 px in: past the box and off the 390 viewport | strip 858 px, the tab 763 px in: past the box, on screen |
| v7 at load | flag set, `scrollLeft` 0, **the selected tab 0 % inside the strip**, the indicator with it | the same |
| v7, box widened to 1200 px and back to 267 | flag cleared, then set; `scrollLeft` 0; the tab 0 % inside | the same |

For atlas this is no regression. In its drawer the base's tab ran past the sheet, where paint containment cut it, and on v7 a sideways pan reaches it. But the strip is the cure's new scroller, and the dock run it is modelled on brings its open seat into view at rest (`useDockRun`'s reach). The letters say "A selected tab glides into view".

atlas's VizOptionsBand and YearScrubber strips hold labels from data, and the choice is kept in the URL. On a phone such a strip can open with its choice out of view. The cure would reveal the active tab when the flag rises and at mount: without motion at mount, gliding after.

## Notes

- **N1. R4-3 exposes consumer rows, as intended.**
  - The nowrap line in an open layer: the base reads 200/200 and cuts it. v7 reads 491/200, and a 150 px sideways swipe pans the column 217 px (Chromium 390). At 1440 it reads 564/200. WebKit reads the same sizes and computes `visible`/`clip`.
  - The selected Chip reads 200/200 on both builds: the body's inline padding holds its scale.
  - The closed layer adds nothing to the column on v7 (200/200).
  - Glass's own Configurator pages read the same on both builds in the check: /containers/configurator, /motion/springs, /substrates/aurora and /substrates/blob.
  - Consumer layers were not read on 11.1.2: seven in keyframes, among them KeyframeTimeline, whose toolbar row holds `shrink-0 whitespace-nowrap` labels, and six in fourier. The value.js letter names the change and asks for the check. atlas has no ConfiguratorLayer.
- **N2. R4-2's residual stands.** The brief's form leaves the eight-tab strip beside a one-word heading at 446/358, where the base read 743/358. I found no site composition that meets it:
  - atlas's FilterRow is a flex column;
  - its VizOptionsBand strip sits in a LabeledField grid;
  - EasingPicker's switch is already `shrink-0` in a wrapping row.
- **N3. An overflowing strip in a `none` box still lifts it.** In Chromium a 240 px swipe up from a tab scrolls the page 378 px on v7, against 0 on the base. STUDY says so. No site sets `touch-action` in a file that holds a SegmentedTabs; I searched value.js, keyframes, fourier, daraksha and atlas.
- **N4. The check reports glass parts on glass's own pages, at v7 as at the base.** On the 12 demo routes it gives 20 readings, the same on both builds box for box, and each names a glass part:
  - the Timeline's marks list, `ul.tl__marks`: 278/256 at 390 and 924/912 at 1440. The F4a reserve moved the plate, not the list; SWEEP §1.4 says the list still spills.
  - the layers box of the demo's sidebar dock (+4) on every 1440 route, and the layers box of /dock/chrome's dock at both widths. In each, the summary layer reads 12 px past and the run's handed-back reserve 4 to 4.5 px past.
  - two dock triggers on /dock/chrome at 390;
  - the Blob canvas bleed, which STUDY lists as meant.

  The letters ask the sites to send any reading that names `dock-` or a glass class. They will get these from glass's Timelines and docks. Either the check passes a spill held inside an ancestor's padding, and a summary layer at rest, or the letters say these readings are known.
- **N5. The atlas letter.** "A dock whose seats all show has no sideways scroll." In Chromium a dock 2 to 8 px narrower than it asks keeps that range while every seat shows. The value.js letter says so; the atlas letter's first sentence does not.
- **N6. The letters carry internal paths** (`docs/tranches/BL/…/check-overflow.mjs`). The sites need the path, so this is a nit.

## What holds

- **R4-1, the strip's touch-action** (Chromium 390 touch, from a tab that is not selected).
  - Three tabs in a `none` box, 240 px up: base 0 with 12 moves and no cancel; v7 0 with 12 moves.
  - The detented Sheet, a slow 70 px drag down from the three-tab header strip: the sheet follows 70 px in 30 moves on both builds.
  - The eight-tab header strip, which scrolls on v7 (`data-overflow`, `overflow-x: auto`, 654/364): the sheet follows 70 px in 30 moves with no cancel on both builds.
  - Computed `touch-action`, the same in WebKit: `pan-x` on both header strips and their tabs, `none` on the header. In both engines the flag is set at 390 and absent at 1440, where the sheet holds the tabs.
- **GL-16, a vertical swipe on an in-flow dock** (Chromium 390 touch, from the second seat, 240 px up).
  - Three seats that fit: base 0, with 12 moves and no cancel, for 0, 16 and 48 px of drift. v7 scrolls the page 373, 365 and 366 px, a cancel after 1 move each time, and the run moves 0 px sideways.
  - Squeezed by 2, 4 and 8 px, where the flag stays set and the run keeps a range: base 0 in all nine gestures; v7 scrolls the page 346 to 390 px, and the run moves 0 px sideways with 16 and 48 px of drift. My concern was that `pan-x pan-y` on a run with a range would let a drifting vertical swipe pan it. It did not.
  - Squeezed by 12 px, a long run with no flag: `pan-x` stays and the page 0 on both builds.
  - WebKit computes `pan-x pan-y` on every flagged run and `pan-x` on the long one.
  - F8 stands: three seats read 196/192 → 196/196 (390) and 213/209 → 213/213 (1440) in both engines.
  - WebKit's squeeze band is choice 7 as STUDY states it: 2 and 4 px read 194/194 and 192/192 on v7, against 196/190 and 196/188 on the base.
- **R4-3.** The wrapper computes `visible`/`clip` in both engines (base `hidden`/`hidden`). A closed layer hides its body and adds no width.
- **R4-4.** Not read again; the record's both-engine readings stand. The rule's selectors exist at 11.1.1: `.disclosure-group-trigger` (`AccordionTrigger.vue:48`), `.glass-menu-row` (the menu and Command rows), `[data-slot="select-trigger"]`.
- **The third critique's notes.**
  - Choice 7 in WebKit is called worse than 11.1.1 in STUDY and in both letters.
  - The WebKit ring sentence matches SWEEP §7.1 and §8.6.
  - "The owner" is gone from the letters.
  - `put()` restores with `behavior: "instant"` (`check-overflow.mjs:227`, `:229`).
- **The owner's laws.**
  - Nothing in v7 changes instantly: the strip glides, and its flag flips only when the scroll range is already 0.
  - No clip is added, and one is removed.
  - Each item is cured where it starts.
  - The new scroller is the strip whose tabs run past it.
- **Consumers.**
  - atlas (`.u-build/lv-atlas`) puts no strip in a detented header. FilterPanel's header holds the title and Clear. EntityDetail's holds a mark and text. GlossaryDialog's holds an Input, which the header rule leaves at `none` (`pan-x` meets the header's `none`).
  - atlas's strips sit in the drawer body (VizOptionsBand in a LabeledField; YearScrubber in FilterRow, a flex column) and in PlateDial's popover, which sets its own `max-inline-size: 100%`.
  - No dock in value.js, keyframes, fourier, daraksha or atlas sits inside a `touch-action: none` box. keyframes' cube and orbit stages are `none` and hold no dock.
- **Writing law.**
  - The register lint finds nothing in STUDY.md, SWEEP.md, SITES.md or this file.
  - The patch's added comments carry no ids.
  - Both letters are signed "Thanks,\nMike".

## Not read

- Safari and an iPhone. WebKit by touch.
- R4-2, R4-4 and the side sheet. The record's readings stand: both engines for R4-2 and R4-4, Chromium for the side sheet.
- Consumer pages on 11.1.2.
- The build targets' scrollbars (`::-webkit-scrollbar`).

---

# Critique of v8: the fourth critique's answers

Written 2026-11-27 by claude-opus-5-5, an adversarial reading of `cure.patch` (v8), STUDY.md ("v8: the fourth critique"), SWEEP.md §9, SITES.md and `check-overflow.mjs` against release/11.1.1.

## Verdict: holds after fixes

v8 answers the fourth critique as STUDY says:
- The vertical strip is as on 11.1.1.
- A strip that scrolls opens at its selected tab.
- The three source comments now match the readings.

One item blocks, and it is older than v8. R4-3's wrapper (`min-h-0 overflow-y-clip`) gives up two things the old `overflow-hidden` gave: the inline clip, as meant, and the zero minimum width of a grid item that is a scroll container, which no reading looked for. Every ConfiguratorLayer now floors at its body's min-content. Rows that fit the layer at 11.1.1 by shrinking now hold it open, and the column around it pans sideways:
- glass's own ConfiguratorRow, with its truncated label, sub-label and token name;
- a truncated label;
- a value that `break-word` breaks;
- a SegmentedTabs strip.

One class fixes it, and I read the fix in both engines.

## How I read

- **Tree.** `trees/critic-sci-d`: a `git archive` of release/11.1.1 at 871be44bc without `docs/` and `tests-visual/`, its own git root, `node_modules` a link to the main checkout. `git apply --check cure.patch` is clean. Three builds, each with my witness page `/sci4.html`:
  - `dist-base`;
  - `dist-v8`, after `git apply cure.patch`;
  - `dist-alt`, which is v8 with `min-w-0` added to the layer's wrapper (`min-h-0 min-w-0 overflow-y-clip`) and nothing else.

  The base build waited in the heavy queue. v8 and alt were built in one `guarded --light` call, since each build took 6 s and 0.8 GB. The tree is deleted.
- **Engines.** Chromium is Playwright's headless shell 149.0.7827.55, at 390×844 with touch, `isMobile` and scale 2, and at 1440×900. WebKit is Playwright's WebKit 26.5, read under `guarded --exclusive webkit` for sizes, computed styles, offsets and frames; it takes no touch input. Safari and an iPhone were not run. One browser per run, a context per cell and build, closed in `finally`; the previews were children of each guarded call.
- **Gestures.** In Chromium's 390 cell, a 150 px sideways CDP touch swipe on each layer's column, 12 moves 16 ms apart.
- **The cells.**
  - Five 200 px `overflow-y: auto` columns, each holding one open ConfiguratorLayer: a ConfiguratorRow (label "Specular intensity", sub "the catch-light", name `--glass-specular-intensity-hover`); a flex row with a `min-width: 0` truncated label and a button; a `dt`/`dd` pair whose `dd` holds a 46-character CSS value under `overflow-wrap: break-word`, as keyframes sets its stop summary; the eight-tab strip; and the 300 px box of the earlier rounds.
  - The eight-tab strip, last tab chosen: inline in a 267 px block box, widened to 1200 px and back; right to left; in a box whose width animates from 267 to 200 px over 400 ms.
  - The eight-tab strip, first tab chosen: panned to 300 px by script, then the sixth tab's label changed.
  - The vertical strip in a 100 px box.
  - The three-seat dock.
- **Record.** `record/inspect/critic-sci4/`: `Sci4.vue`, `probe-sci4.mjs`, `build.sh`, `run.sh`, `sci4.{chromium,webkit}.json` and the run logs.

## Blocking

### B1. ConfiguratorLayer floors at its body's min-content (R4-3)

**Source.**
- The region is a grid with one implicit `auto` column (`ConfiguratorLayer.vue:189-198` at 11.1.1), and the wrapper is its only grid item.
- At 11.1.1 the wrapper's `overflow: hidden` made it a scroll container, and a scroll container's automatic minimum size is 0. So the column took the layer's width, and the body laid out at that width.
- `overflow-y: clip` beside a visible inline axis is not a scroll container. The wrapper's automatic minimum is then its content's min-content, and the `auto` column floors there.
- Min-content does not shrink a truncated label, a word `break-word` breaks, or a strip whose `max-inline-size: 100%` is a cyclic percentage in its contribution. It counts each of them at full width. This is the grid blowout that `min-width: 0` exists for.
- SWEEP §8.3 read only a fixed 300 px box, which has no smaller min-content, so the readings could not show it.

**Measurement.** Each 200 px column holds one open layer. The column is read as `scrollWidth`/`clientWidth`, and the pan is from a 150 px sideways swipe (Chromium 390 touch). Chromium and WebKit agree to 1 px in every cell.

| the layer holds | base | v8 | v8 + `min-w-0` |
|---|---|---|---|
| a ConfiguratorRow | 200/200; label, sub and name truncated (39, 31 and 72 px of 118, 91 and 217 px); pans 0 | **483/200** (501 at 1440); nothing truncated, the row 442 px wide; **pans 208 px** | as the base |
| a truncated label beside a button | 200/200; 121 of 386 px shown | **464/200** (532); the label whole; **pans 208** | as the base |
| `dt` + a `break-word` `dd` | 200/200; the `dd` 62 px wide on 6 lines | **426/200** (488); 289 px on 2 lines; **pans 215** | as the base |
| the eight-tab strip | 200/200; the strip 654 px, cut at the layer's edge (F1, hidden by the clip) | **695/200** (899); the strip 654 px, not flagged, no scroller; **pans 208** | 200/200; the strip 158 px, flagged, scrolling its 654 px of tabs |
| the 300 px box | 200/200; 121 px cut | 341/200; pans 141, to the box's end | 321/200; pans 121, to the box's end |

**Why it blocks.**
- Each of the first four rows fit at 11.1.1 and makes a 200 px column pan about 210 px sideways on v8. That is the fault the owner asked to cure, now in content that had none.
- The ConfiguratorRow cell is glass's own composition: the row is built to truncate inside a layer.
- Inside every layer, F1's cure does not hold: the strip is not bounded and does not scroll. The layer runs as wide as the tabs, and the column pans instead.

**Consumers, from source.** atlas has no ConfiguratorLayer. keyframes sets one in 7 source files and fourier in 5. keyframes has rows of these kinds inside a layer:
- KeyframeTimeline's stop summary (`timeline-stop-summary`: `dd.min-w-0` under `break-words`, holding CSS values) sits in its Timeline layer.
- ChannelOptions' layer entry is a Button with a truncated value.
- EasingSidebar's Easing layer holds EasingPicker.
- The value.js letter names a 120 px column in keyframes' Controls sheet.

I did not read fourier's layers for such rows.

Whether a given row is wider than its layer depends on the page. I did not load the sites. glass's own demo routes read the same on the base and v8 in the record's check (STUDY, "The check and the tests on v8"), because the demo's rows fit at the widths the check reads.

**The fix.** `min-w-0` on the wrapper: `<div class="min-h-0 min-w-0 overflow-y-clip">`.
- The column takes the layer's width again, as at 11.1.1, and the body lays out at it.
- Truncation, `break-word` and the strip's bound all hold.
- The strip pans its own tabs.
- A row with a fixed width wider than the layer still shows past the layer's edge, and the column pans to its end. That is the behaviour R4-3 is for, and I read it on alt in both engines.
- The closed layer is unchanged, since the block axis still clips.
- The source comment should say why the wrapper keeps a zero minimum width. The STUDY row and SWEEP §8.3 should carry a row that shrinks as well as the fixed box.
- The value.js letter's Configurator paragraph is true once the fix is in, and understates v8 without it.

## Notes

- **N1. The atlas letter's panned strip.** "A strip you've panned by hand stays where you left it until one of those happens" (a change of choice, or of the strip's width). A change to another tab's size brings it back too.
  - Read in both engines at both widths: the first tab chosen, the strip panned to 300 px, then the sixth tab's label changed. The strip glides back to 0, and the chosen tab is whole again.
  - The source comment says this ("or it or one of its tabs resizes"); the letter does not.
  - Either the letter says it, or the reveal runs only on the strip's own resize and on a change of choice. A font landing after mount also resizes every tab.
- **N2. "The items beside it give way."** Both letters say that a strip with no room in a row takes the row's width "and the items beside it give way". R4-2's own reading says an item that cannot shrink does not: a one-word heading and the gap run 88 px past the row (446/358). The letters should say that such an item runs past the row.
- **N3. Two owners scroll a strip on a press.**
  - `useSelectionGroup`'s `scrollIntoView` (`useSelectionGroup.ts:200`), which also scrolls every outer scroller. atlas's GL-18 is about this call, and 11.1.2 takes GL-18 as its own row.
  - v8's watch on the choice.
  
  Both glide to the same place today, and the readings show one curve. GL-18's cure should leave one of them. `segmented.css` names "a press's `scrollIntoView`", so that comment changes with GL-18.
- **N4. The header rule's `pan-x` on every box.** A box in a detented Sheet's header that scrolls vertically (a textarea, a list) loses its vertical touch scroll. No site sets one; the comment says "every box", so this is a note.
- **N5. Nit.** In `segmented.css`'s `[data-overflow]` comment, the line "from a tab. A scroller clips at its padding box. The pill's trim holds a focused tab's ring," runs past the file's wrap width.

## What holds

Read in both engines at both widths unless named.

- **R5-M1.** The vertical strip in a 100 px box reads as on the base: 107.9 and 142.3 px in Chromium, 108 and 142.4 in WebKit. Its `max-width` is `none`, "Transportation" ends 10 and 12 px inside its tab, and no flag is set.
- **R5-M2.**
  - The last tab chosen in a strip set inline in a 267 px block box: `scrollLeft` 387 and 591 (WebKit 388 and 591), the whole tab in view. Widened to 1200 px, the flag clears; back at 267 px, the same.
  - **Right to left** (not read before): `scrollLeft` −387 and −590 (WebKit −388 and −591), the whole tab in view. The reveal's arithmetic holds with a negative scroll origin.
  - **A box whose width animates** from 267 to 200 px over 400 ms (STUDY: "not read"): the chosen tab stays at least 99 % inside the strip in every frame. `scrollLeft` moves at most 2 px a frame in Chromium (3 to 4 in WebKit) and reaches 454 and 658. It glides with the box and never jumps.
  - The flag flipping changes no height: the inline strip's box is 50 px at 390 and 42.6 px at 1440 with and without the flag, so a strip in a line box does not move what follows it.
- **R5-S1.** The three comments now say what the readings show. `run.css`'s GL-16 comment matches the dock: 196/196 and 213/213 flagged, `pan-x pan-y`. The base reads 196/192 and 213/209 with `pan-x`. GL-16's touch cells were not driven again; two critics drove them on v7, and v8 does not change the rule.
- **The patch** applies to the 871be44bc archive, and its added lines carry no ids. `check-overflow.mjs` restores with `behavior: "instant"`.
- **Writing law.** The register lint finds nothing in STUDY.md, SWEEP.md, SITES.md or this file. Both letters are signed "Thanks,\nMike".

## Not read

- Safari and an iPhone, and WebKit by touch.
- Consumer pages on 11.1.2; the consumer rows in B1 are from source.
- The record's vitest and `vue-tsc` runs were read from their logs, not rerun.
- R4-1, R4-2, R4-4 and the side sheet; the record's readings and the fourth critique's stand.
