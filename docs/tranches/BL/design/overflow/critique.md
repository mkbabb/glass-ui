# Horizontal bounding: critique of SWEEP.md and cure.patch

Written 2026-11-23 by claude-opus-5-5, an adversarial reading of `SWEEP.md` and `cure.patch` against `release/11.1.1` (4f1fa667e). Each blocking item was judged twice: once from the source, once from a measurement.

Engines. My own readings are **Chromium**: Playwright 1.61.1's Chromium headless shell 149.0.7827.55, at 390×844 with `hasTouch`, `isMobile` and scale 2 (`390t`), and at 1440×900, light, `reducedMotion: no-preference`. **WebKit was not read.** My WebKit run queued for the machine-wide WebKit slot, which another seat held with a 90-minute job, and I stopped it before it was admitted. **Safari was not run.** Every number below that does not name the sweep's record is mine, from Chromium.

How I read. I took a `git archive` of release/11.1.1 without `docs/` into `trees/critic` (its own git root, `npm ci --ignore-scripts`) and built it twice: `dist-base`, then `dist-cure` after `git apply cure.patch`, which applied cleanly. Both builds carry one extra page with seven cells:

- eight SegmentedTabs options in a 267 px box;
- a full-width selected Chip in a 300 px `overflow-y: auto` box, once without and once with 16 px of inline padding;
- a glass Table (three columns; Chip and small Button cells) in a 300 px box;
- four Buttons in a 240 px flex row;
- a three-segment Timeline in a 300 px box;
- a three-seat GlassDock;
- atlas's Filters drawer as atlas builds it: a non-modal right `SheetContent`, atlas's `.cp-drawer__body` CSS verbatim, and three `LabeledField` rows holding a ToggleGroup, a Select and a Switch.

One browser per run and a context per cell, closed in `finally`; preview servers on 5395 and 5396 as children of the guarded call. The tree is deleted; the numbers are kept here.

## Blocking

### B1. The line law's `overflow-wrap: anywhere` splits short words in any squeezed control, and it ends the Table's designed scroll

Where: `cure.patch`, `src/styles/typography/semantic.css`, the second rule (`.glass-menu-row, .disclosure-trigger, .toggle-group__item, .button, .glass-chip, .label, [data-slot="select-trigger"]`).

Source. `anywhere` puts a break opportunity between every pair of characters into the min-content size (CSS Text 3). The sweep says so (§1.3), but it weighs the cost only against a 55-character token. Three cases follow from it:

- A Button already has `min-inline-size: 0` (`button/styles.css:47`), so a Button that is short of room in a flex row now wraps its label a glyph or two a line, where before the word ran into the padding.
- In an auto-layout table the column minimum is the cell's min-content. A column of Buttons or Chips can now squeeze to a glyph, so the table no longer overflows and its container no longer scrolls.
- This library has ruled on this before. `src/components/badge/index.ts:22-24`: "`wrap-anywhere` is GONE. It applied to 39/39 badges and it breaks a word at any character — "Paid" rendering as P/ai/d in a narrow cel." The sweep cites that ruling only to leave Badge out (§1.3).

Measurement (Chromium; the two builds differ only by `cure.patch`; two runs gave the same numbers):

| cell | case | base | cure |
|---|---|---|---|
| 390t | Table in a 300 px box | container 374/300, scrolls; "Download" Button 1 line; "Active", "Pending" Chips 1 line | container 300/300, nothing to scroll; Button 62.8 px wide, **7 lines** (107.5 px tall); Chips **3 and 4 lines** |
| 1440 | the same | container 383/300; 1 line each | 300/300; Button 44.2 px, **7 lines**; Chips 3 lines |
| 390t | four Buttons in a 240 px flex row | lines 1, 2, 1, 1 ("Cancel" 2 px into its padding) | lines **6, 8, 6, 6** |
| 1440 | the same | lines 1, 2, 1, 1 | lines **5, 4, 4, 4** |

The sweep's checks read overflow, so a label stacked a letter a line reads clean, and §2's before-and-after table cannot show this. §3 names the Table a designed strip ("its container scrolls, as designed, in a bounded parent"). After the cure a Table whose cells hold Buttons or Chips stops scrolling, and its cells stack their words.

Second judgment: the mechanism is the spec's min-content rule; the library's own Badge record names the same failure; both cells and both runs agree. **Stands.**

What would meet the law without the cost:

- `break-word` changes no intrinsic size. It would serve the free-standing Buttons, Chips and Labels, which keep their words, so a table scrolls as designed.
- `anywhere`, or `min-inline-size: 0` on the label, belongs only where the control is a full-width row of a bounded plate: menu rows, Command rows, a disclosure trigger in a plate, the Select trigger's value.
- The F3 Button, Chip and Label readings that motivated `anywhere` come from the stress token in a 156 to 240 px stage. They should be weighed against "Cancel" on six lines.

### B2. SegmentedTabs: the touch floor the cure relies on does not exist, so an overfull strip becomes unreadable tabs under the 44 px target

Where: `cure.patch`, `segmented.css`. The strip takes `grid-auto-columns: minmax(0, 1fr)` and `max-inline-size: 100%`; the tab takes `overflow: hidden` and `text-overflow: ellipsis`. Its comment says "the coarse touch floor (`[data-control-target]`) still holds every tab at the target width". SWEEP §1.1 says "The coarse touch floor (`[data-control-target]`, 44 px) still holds every tab … A strip of more than (box width ÷ 44) tabs on a phone therefore still overflows".

Source (release/11.1.1):

- `.segmented-tab` declares only `min-block-size: var(--control-floor)` (`segmented.css:189`).
- The tab `<button>` (`SegmentedTabs.vue:244-269`) carries no `data-control-target`. The only one in that file is on the mobile Select trigger (`:163`).
- Nothing gives a tab an inline floor. v2 took the tab's `min-inline-size: 0` back out "because it beat the coarse touch floor", but that changed nothing: the tab's own `overflow: hidden` already sets its automatic minimum to 0.

Measurement (Chromium; `matchMedia("(pointer: coarse)")` is true at 390t). Eight options (Enrollment, Expenditure, Attendance, Graduation, Teachers, Transportation, Nutrition, Facilities) in a 267 px box:

- Base: tabs 67.6 to 101.9 px wide, the strip 654 px, the page 670 px wide.
- Cure: **every tab 32.6 px** (32.4 at 1440), computed `min-width: auto`. Each label is 81 to 88 px of text in a 33 px box with 20 px of padding, so each shows about 13 px: an ellipsis and at most a letter.

The cure trades the overflow for a strip nobody can read, and for tabs 11 px under the library's 44 px coarse target (`--control-floor`, `tokens/light-dark.css:20`). An ellipsis is a fair cure for one long label in a right-sized share. For a strip with more tabs than fit, it hides the strip's content. That is the masking case the owner's law names: the boxes are wrong and the clip hides it.

Second judgment: the source at release/11.1.1 and the live computed style agree. The patch would write the false sentence into source. **Stands.**

What it needs:

- Drop the claim, and give the tab an inline floor (`min-inline-size: var(--control-floor)`, plus enough to show a label).
- Then decide what a strip does when n × floor passes its box. It can collapse to the Select the component already has (`useTabResponsive.ts`, keyed today to the viewport, not the box), or it can be a declared horizontal strip that pans by a horizontal gesture only.

## Major

### M1. The headline fault is not in atlas's Filters view; atlas's fault is the ToggleGroup item, and it needs no long word

SWEEP titles its F1 rows "SegmentedTabs in the Filters sheet (atlas's Filters view)". §4 says the stress page "stands in for atlas's drawer (the same Sheet, the same `overflow-y: auto` body, the same parts)".

Atlas's filter UI on `glass-10.1` (069708a) imports no SegmentedTabs, GlassDock or Chip (`git grep` of its glass imports under `src/filter`). The drawer's body is `UnifiedFilterPanel`, which holds three parts:

- `VizOptionsBand.vue:56-120`: rows of `LabeledField`, each holding a glass `ToggleGroup` (`flex flex-wrap gap-1`, items `min-h-[44px]`), a `Select` (trigger `inline-size: 100%`) or a `Switch`;
- `SelectionSetPane` (Card, Collapsible, ToggleGroup);
- `YearScrubber` (Button).

Measurement (Chromium, the drawer alone, atlas's body CSS, three toggle items with atlas-length labels: "Per-pupil expenditure by source", "Share of statewide enrollment", "Change from the year before"):

| cell | base | cure |
|---|---|---|
| 390t | body **279/267**; the first item 263 px in a 235 px field (group 263/235); a 150 px horizontal swipe panned the body **12 px** | body 267/267; items 234.5 px on two lines; the swipe panned 0 |
| 1440 | body 342/342 (items fit) | 342/342 |

So the cure does fix the composition atlas uses, through the ToggleGroup item's `max-inline-size: 100%`, in Chromium. The record should say so:

- The owner's example is F3's ToggleGroup item, not F1.
- Its cause is `flex: none` with no inline cap (`toggle-group/styles.css:55`), holding a multi-word label at ordinary length in a phone drawer.
- §1's "Every other fault in §1 needed a longer label or word than the demo carries" is wrong for this one.
- §5's note to atlas should name the ToggleGroup in `VizOptionsBand`, not "SegmentedTabs where used".

### M2. A selected Chip's flood is a `scale`, which pans an unpadded scroller; the sweep files it as designed paint

`glass-chip.css:27-28` scales a selected interactive Chip by 1.074. A transformed box counts toward its scroll container's scrollable overflow; a glow painted inside the chip would not. `tools/families.mjs` files every glass-chip breaker whose ratio is at most 1.08 under "designed-paint". The sweep's chip readings were in stages that do not scroll, so no swipe tested one.

Measurement (Chromium, both builds, both cells): a full-width selected Chip in a 300 px `overflow-y: auto` box with no inline padding reads **311/300**. At 390t a 150 px horizontal swipe panned that box **11 px**, in the cure build and again in the base build of the second run. With 16 px of inline padding the box reads 300/300, because the padding absorbs the overhang; that is why atlas's 1rem-padded body would not show it.

§2 records this reading rising after the cure ("full-width Chips now fit their parent"), so the cure makes the case more common. It is a (b) fault in a box that is not meant to pan, caused at `glass-chip.css:27-28`, and it belongs in §1, not under "designed".

### M3. A dock run that hides nothing keeps a sideways range; the sweep files it as designed and does not answer value.js item 1

`families.mjs` puts every horizontal pan of a dock run, and the full layer's excess up to 4 px, under "designed-dock" (422 readings after the cure in Chromium at 1440). The horizontal swipe skips designed strips, so a run that fits is never judged. `run.css:386-395` accepts that "a run whose seats show but leave less than a ring's room at each end scrolls at most twice the ring's reach".

Measurement (Chromium, 390t, base build; the cure does not touch `run.css`): a three-seat GlassDock with `data-run-fits` reads run 189/185. In one of two runs a 150 px horizontal swipe left the run at **scrollLeft 4**. The other base run's swipe ended at 0. In the cure run the dock lay below the viewport and the swipe did not reach it. This is one reading, not a settled rate.

The owner's law lets a long dock run pan; a run that hides nothing is not long. §5 answers value.js items 2 and 4 and says nothing on item 1, which disagrees with the designed bucket. It needs a ruling. If it is a fault, its cause is the reserve boxes at `run.css:426-432`.

### M4. Three interactive parts were never mounted: EasingPicker, CarouselPager, DockLayerGroup

§0 says each of the 55 component directories is mounted; `tools/coverage.mjs` counts a directory as mounted when any demo file imports from it.

- **EasingPicker**: the demo imports only `EasingCurve` from `easing` (`demo/stories/motion/springs.stage.vue:7`).
- **CarouselPager** and **DockLayerGroup**: exported, and mounted by no demo file and no library part. `DockLayer.vue` and `DockSeparator.vue` mention DockLayerGroup in comments only.

All three are interactive, and DockLayerGroup is a switcher strip like SegmentedTabs. value.js measured a fault in one of them: `EasingPicker.vue:553-569`, where the Steps row floors at 216 px under a 160 px minimum (the jump-term trigger is `w-36 shrink-0`), 13 px past its column at 1440 in Chromium. O-424 gives that item to a later seat, but the coverage claim is wrong as written, and the owner asked for every interactive element. In the record, `/motion/springs` also ran only the base and stress passes, with no opens and no variants.

## Minor

- **m1. The Timeline cure shortens every track by one target.** Chromium: the track goes from 300 to **256 px** at 390t (−14.7 %) and from 300 to 276 px at 1440. It is now inset from the plate's edges by an amount that changes with the pointer. The marks list still reads 278/256: its seats still pass their own list, inside the new padding. What the cure removes is mostly the transparent hit target; the visible disc overhangs by half the disc. No reading showed it panning anything. The dock trigger's coarse `::after` slop is the same kind of overhang, and §3 counts that as designed. The sweep should state this cost and say why the two are treated differently.
- **m2. The new Sheet comment overclaims.** "a narrow side rung reflows its rows to the rung's width …, it does not clip them": `contain: layout paint` stays (`sheet/styles.css:91`) and still clips any row with a fixed minimum. The sweep's own 288 px `.select-stage` and a `flex: none` dock are two such rows.
- **m3. The touch-axis mechanism goes past the evidence.** "Chromium locks a touch scroll to its first axis" (§1.7, §4) is a mechanism read from three drift angles, up to 48 px over 240 px (about 11°). The claim should say what was measured.
- **m4. The tab's ellipsis reaches only text set directly in the button.** A consumer's `#option` slot (`SegmentedTabs.vue:271`) holding an inline-flex icon and label is an atomic inline: past the edge it is hidden whole, not ellipsized. A slotted count badge set past the tab's edge is now cut. No demo uses the slot; I did not read it.

## What holds

- **Routes.** `demo/router.ts` builds `/`, 11 section pages and 66 story routes from the manifest: 78. With the 404 and `/ovf.html` that is 80, and `probe.mjs` reads the same manifest. No route is missing.
- **Causes at file and line**, checked at release/11.1.1. All match:
  - `segmented.css:61-63, :184`
  - `sheet/styles.css:86-94, :123-127`
  - `dialog/styles.css:21-24`
  - `Toaster.vue:113`
  - `overlay-plate.css:63-69, :136-147`
  - `SelectTrigger.vue:63`
  - `toggle-group/styles.css:55`
  - `Timeline.vue:400-405, :441-449, :547-550, :566-568`
  - `PagerDots.vue:46`
  - `LabeledField.vue:121-133`
  - `button/styles.css:47`
  - `glass-chip.css:27-28`
  - `badge/index.ts:22-24`
- **Root cures.**
  - The single-column floors (Sheet region, detented Sheet, Dialog plate, Toast body) add no clip. Tailwind 4's `grid-cols-1` is `repeat(1, minmax(0, 1fr))`.
  - The tooltip's inline cap.
  - The ToggleGroup item's `max-inline-size: 100%`, which also cures atlas's real composition (M1).
- **Things the cure does not break.**
  - No sticky header is touched.
  - The tab's `overflow: hidden` does not clip its focus ring, which is an outline on the tab itself.
  - `run.css` is untouched, and O-263's one-axis containment stands. DockTrigger's select arm does match `[data-slot="select-trigger"]`, but horizontal dock layers are `white-space: nowrap` (`layers.css:263-264`), so the line law changes nothing in a horizontal dock run.
- **value.js item 4** (`overflow-x: hidden` beside every `overflow-y: auto`) is refused, rightly, as a mask.
- **The sweep's WebKit, Safari, dark-mode and 1440-opens gaps** are each stated in §4.

## Round 2's last critic (2026-11-24, on v6): holds after fixes, three items blocking

Chromium is Playwright's headless shell 149; WebKit is Playwright's WebKit 26.5, not Safari.

1. **A strip that scrolls lifts its ancestors' touch-action.** v6 gives `.segmented-tabs` `overflow-x: auto`. Pointer Events stop collecting touch-action at the nearest scroll container, and both engines decide that from style alone, so a strip with nothing to scroll does it too. A detented Sheet header (`touch-action: none`, `sheet/styles.css:108-113`) drags from anywhere in it (`sheet/detents/use.ts:82`, `:256-258`).
   - **The Sheet drag** (Chromium, 390 touch), a slow 70 px drag from a tab:
     - base: 30 moves, no cancel, the sheet follows 56 px;
     - v6: 7 moves, then a pointercancel, and the sheet moves 0;
     - v6, a fast 220 px swipe from the tab: cancelled after one move, and the sheet flings shut on that one move's speed.
   - **Isolated cells**, a strip that fits:
     - in a `touch-action: none` box: on v6 the page scrolls about 280 px, where the base scrolled 0;
     - in a `pan-x` run: the same.
   - keyframes' controls pane (`pan-y`) loses its restriction too.
   - **Cure options:** make the strip a scroller only while it overflows, or give a strip in a detented header the drag axis's restriction.
2. **A scroll container's automatic minimum size is 0,** so the v6 strip shrinks wherever a flex sibling must also give, and its clip then hides tabs the base showed whole. Read the same in both engines:
   - a 358 px row with a heading: the strip is 121 px holding 160;
   - a 240 px column over a list: the strip is 14.3 px tall holding 50;
   - a vertical strip beside a paragraph: 31 px holding 81.

   No site's composition hits this today. **Proposed cure:** `flex-shrink: 0` on `.segmented-tabs`, so `max-inline-size: 100%` still bounds it; a grid `auto` track would still squeeze it, and the comment should say so.
3. **SITES.md points value.js at a glass file.** `ConfiguratorLayer.vue:198` (`min-h-0 overflow-hidden`) is glass's, inside the 0fr/1fr region (`:195-197`); the clip is how a closed layer hides its body. **The cure is glass's:** clip the block axis only (`overflow-y: clip`, the inline axis visible). Take the paragraph out of value.js's note.

**Notes the next seat also answers.**
- The line law's `overflow-wrap: anywhere` on `.glass-menu-row` splits a Chip or a Button inside a menu, Command, Accordion or Select row (a Chip on 3 lines and a Button on 4, at 260 px). The comment in `semantic.css` says the opposite.
- Choice 7 is worse than 11.1.1 in WebKit, and SITES.md should say so.
- SITES.md's claim that the ring shows whole in WebKit overstates: SWEEP §7.1 records a faint cut at 390.
- SITES.md says "the owner" in letters signed by Mike.
- `check-overflow.mjs`'s `put()` should restore with `scrollTo({ behavior: "instant" })`, since v6's strip glides.
- WebKit read F2 and F4a only on v2.
