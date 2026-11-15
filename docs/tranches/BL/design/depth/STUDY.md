# Depth and parallax: the study

Seat: study and spec (claude-fable-5-2, 2026-11-14). This seat launched no browser. Everything here is read from `record/RECORD.md`, its 31 strips, and the drill data under `record/data/` (the cover counts and box sizes below were printed from the drill JSON; no page was loaded again).

A number is **measured** when it is in the record or its data, **read from a strip** when it is an eye reading of a frame, and **glass's own** when the record does not give it and this study sets it.

The corpus was gone over twice. The first pass wrote what each source does. The second pass went back with the numbers; what it struck is listed at the end, and nothing struck is used above it.

## 1. Depth by occlusion

### What the measured cases do

| Case | What covers what | How much of the text is covered | Text size (1440 / 390) | How it stays readable |
|---|---|---|---|---|
| Aupale, section 2 | two cards over the ends of a three-line heading | measured: 9 of 81 sampled points under a card (0.11) for 22 steps; the italic word 3 of 27 (0.11). At 390, 18 points in 21 steps of 27 (0.03) | 90 px line / 33 px line | the cover is a few letters at a line's end, never a whole word; the heading is held still while the cards drift |
| Stripe hero | the wave crosses the right end of each heading line | not measured (the scan's 100 % is the second copy of the heading over the first). Read from the strip: the last one to three words of each line | 221 px for four lines / smaller | nothing is hidden: the copy on top takes the wave's colour by blend, so every letter stays whole |
| iPhone 18 Pro | the phone passes through the letters "PRO" | not measured (it is one video). Read from the strip: a band through the middle of three very large letters | the letters fill about a third of a 1440 frame | three letters, each with its top and its foot showing. The real text sits below, cover 0 of 15 steps at both widths |
| SMWS Outturn | the title in front of a window that grows behind it | 0 of 27 points until the next section's sheet arrives; then 27 of 27 (the sheet, on purpose) | 95 px / 58 px | it does not stay readable throughout: the title reads grey over the brightest frames of the open window |
| Vision Pro | text on a frosted sheet in front of a pinned figure | 0 by the figure. The local nav covers a line for 2 of 23 steps as it passes | 156 px for three lines / 128 px | the sheet blurs the figure under the words |
| AirPods Pro, Max | headline in front of a full-bleed video | 0 | 136 px for two lines / 108 px; Max 84 / 36 | one blur layer under the text, eased in by a mask |
| Rivian R2 | lettering beside a window of video | 0: the letters flank the window | canvas lettering | nothing overlaps |

### The grammar

1. **Live text that a figure covers is display type, and little of it is covered.** The one measured figure-over-text case hides a ninth of the heading's sampled points, at line ends. Every other live-text case covers nothing and puts the text in front.
2. **Text in front of a figure is the common case, and it is plain stacking order.** Five of the seven cases are an ordinary z-order: cards over a heading, a title over a window, a sheet over a pinned image, a headline over a video, a headline in the quiet band of a film. Rivian overlaps nothing. Only Stripe needs a second copy, and only because it wants the same letters to look both behind and in front.
3. **It reads as depth, not as a mistake, when four things hold.**
   - The covering thing has a silhouette the eye already knows: a bottle, a phone, a card with round corners, a window.
   - The cover is partial and lands where the eye can finish the word: a line's end (Aupale, Stripe) or a band through large letters (iPhone). No word is lost.
   - A second cue agrees with it. Aupale's hero puts its title in front of the bottle and its next heading behind the cards; the Vision Pro sheet arrives with the text on it.
   - The words are the still point. Where anything moves, the figure moves and the heading holds (Aupale's held line; Oura's copy beside the card; Apple's text at the page's own rate).
4. **Legibility in front of a figure is bought one of three ways:** a quiet band of the picture (iPhone: the text sits where the video is dark and empty), a single blur under the words (AirPods, Vision Pro), or nothing, at a cost (SMWS's title greys).
5. **Narrow keeps the structure and shrinks the overlap.** Aupale's cover falls from 0.11 to 0.03 of the points at 390. Stripe's wave re-centres and still crosses the copy. Vision Pro's copy wraps to five lines on the same sheet.

### What glass takes from it

- Occlusion is by whole runs of text at two depths, in stacking order, with the figure between them. No letter is drawn twice.
- A run that a figure covers is display type: 40 px or more (glass's own floor; the record's scan only looked at text of 40 px and up at 1440, and Aupale's 33 px line at 390 is the one covered line below it, at 0.03).
- The bound on cover is glass's own, set just above what was measured: **no line loses more than a quarter of its ink to a figure, and no word more than half.** The record's only figure is 0.11 of a heading's points; it gives no per-line number.
- Text in front of a figure is whole and reads at 4.5:1 against what is under it. Where the figure cannot give that, the text rides a glass plate, which is glass's own frosted sheet and the one blur already allowed. No new scrim is built.
- A live value (a readout that is being read) is never behind anything.

## 2. Parallax

### What the measured cases do

Rates are per 100 px scrolled: 100 is the page's own rate, 0 is pinned.

| Source | Layers at another rate | Rate | Driven by | Where it stops |
|---|---|---|---|---|
| Oura | 1: the picture inside a clipped card | 86.4 to 86.5 at 1440 (a lag of 13.5); 90.2 at 390 (a lag of 9.8) | script, per frame | steady for 14 steps, then 94.9, then 100 as it reaches its end |
| Vision Pro | 1: the pinned hero | 0 for 900 px, then 56, then 100 | `position: sticky` | when the 1,800 px section ends |
| SMWS Outturn | 1: the stage is pinned and a window scales 0.5 to 0.99 | 0 | sticky, and script for the scale | when the next sheet covers it |
| Apple section entrances | each heading for one step | about 129 for one 100 px step at 1440 (a 30 px rise); five steps at 390 | script | at rest, once |
| design.google grid | every column | 135, 115, 114, 118, 106, 103, 102, then 100 | script, 4,022 writes | when the column reaches its place |
| Rivian R2 | the hero, for one step | 170, then 100 | script and a wheel snap | after the snap |
| Aupale | 4 | 113, 68, 77, 62 on approach; then 1, 10, -5 held | script under a smoothed wheel | never under reduced motion: it ignores it |
| iPhone 18 Pro, AirPods, Pixel, Stripe, Material 3 | 0 | all 100 | nothing | |

### The grammar

1. **The deft range is narrow: one layer, trailing the page by about a tenth.** Oura's lag is 13.5 per 100 at 1440 and 9.8 at 390. Glass already rules the same ratio for the route push: `--route-parallax: 0.125`, the world trailing the content at one eighth. The measured site and the house token agree to within a point.
2. **One layer per scene.** Oura moves one. Apple moves none, or pins one. The case with four rates in one view is the case the record calls atmosphere.
3. **What trails is the picture, not the words.** In every case the record calls deft, the text moves at the page's rate or is the still point. No deft case moves text at another rate. (Apple's 30 px entrance is an arrival, not a layer; design.google's is the fade-up `restraint.md` already bans.)
4. **The window holds still and the picture moves inside it.** Oura's card runs at 100 and only the image in it lags, so the card's edge never moves against the copy beside it. That is why its depth reads as a window.
5. **Scroll drives it, and nothing else.** The pointer probe moved nothing on the Apple, Google, Stripe, Rivian, Oura or Linear heroes.
6. **It stops by reaching its end.** Oura eases to 100 over a step. A pin stops when its section ends, and costs the scroll length it holds (900 px on Vision Pro in which only the sheet moves).
7. **Reduced motion stops the travel and keeps the cover.** Vision Pro keeps the pin and the frost and skips the ramp; SMWS keeps the sheet and stops the scale. Aupale ignores the setting.
8. **Nobody drives it from CSS.** No case uses `animation-timeline`; every moving layer is a sticky pin or a script writing transforms each frame (Aupale: 895 layouts and 920 ms of style in 26 steps; Oura: 7 layouts, 335 style updates, 102 frame callbacks in 16 steps). The record itself says of Oura and of the Vision Pro ramp that a scroll-driven animation would do the same work.

### What glass takes from it

- One layer per scene may trail the page. It is the figure, or the picture inside the figure's window. Text never moves at another rate.
- The lag is one token, one eighth at most. A scene may lower it and never raise it.
- Scroll is the only driver. No pointer, no tilt, no pin, no smoothed wheel, no snap.
- The travel runs across the scene's whole pass through the viewport, so both of its ends are off screen and there is no stop to see.
- It is a CSS view timeline or it is nothing. Glass already ships that substrate (`styles/scroll-driven.css`, `styles/scroll-choreography.css`) under the same two gates.

## 3. The mechanisms, ranked by cost

### For text behind and in front

| # | Mechanism | Seen in | Added nodes | Read by a screen reader | Selection | Safari | Frame cost | On or near glass |
|---|---|---|---|---|---|---|---|---|
| 1 | **Stacking order of whole runs** (text, figure, text in one stacking context) | Aupale, SMWS, Vision Pro, AirPods, the iPhone page's live text | 0; one span per run only where one heading is split | once | once | every version | none | safe: z-order forms no backdrop root |
| 2 | A blur scrim under front text | AirPods, Vision Pro | 1, with a backdrop filter and a mask | once | once | Playwright WebKit drew the Vision Pro sheet much sharper than Chromium; unread in Safari | none at rest | a blur inside a blur if under a plate; `mask` is a backdrop-root former by spec (unmeasured here) |
| 3 | The text written twice, one copy blended | Stripe | 1 heading | once (the copy is `aria-hidden`) | twice: the hidden copy is selectable | every version | none | `mix-blend-mode` is measured to kill a descendant's blur; the blend needs a second colour pair for dark |
| 4 | A silhouette mask or clip on the text or the figure | none as occlusion (Rivian and Lando Norris use `clip-path` for windows and reveals) | 0 to 1 | once | once | every version | paint, if it moves | `clip-path` is measured to kill a descendant's blur; only the Blob's disc and a box's radius are known to CSS |
| 5 | The figure split into a back and a front | none | 1 per figure, and the figure drawn twice | once | once | every version | double for a canvas figure | a Blob would run two WebGL canvases |
| 6 | Lettering on a canvas with a hidden heading | Rivian | 2 | once | none: it is not text | every version | none | not text |
| 7 | The picture made by a film crew | iPhone 18 Pro | 1 video | the letters are not read | none | every version | none | not a component |

**Chosen: 1.** It is what five of the seven live-text cases do, it adds nothing, the string exists once so it is read once and selected once, it needs no Safari version, and it is the only row that cannot blind a glass plate. Its limit is stated: the weave is by run, not by pixel. One word can be behind the figure and the next in front; one letter cannot be both. Rows 3 to 5 buy that last step, and each costs a second copy, a dead blur or a second canvas.

### For parallax

| # | Mechanism | Seen in | Script | Layout per frame | Safari | Reduced motion |
|---|---|---|---|---|---|---|
| 1 | **A CSS view timeline on `translate`** | none in the record; glass's own scroll register | none | none by design; unread until the prototype traces it | 26 and later (documented, not in the record); earlier versions get no travel | a media gate: the animation never binds |
| 2 | `position: sticky` (a pin) | Vision Pro, SMWS | none | none | every version | stays |
| 3 | Script writing a transform each frame | Oura, Aupale, design.google, Apple's entrances | a listener and a frame loop | 7 to 895 layouts per scroll in the record | every version | only if the author writes the branch |

**Chosen: 1.** Row 3 is what `restraint.md`'s ceiling forbids (listeners: 0) and what the record faults on every site that uses it. Row 2 is free but spends scroll length on a hold in which nothing else happens, and a pinned figure cannot keep its cover of moving text inside a bound. Row 1's cost is that Safari 17.5 to 18 get the still picture. That is the reduced-motion form, which is already a whole composition, so the fallback is not a cut and needs no script.

## 4. Where it means something, and where it is forbidden

**Depth by occlusion means: these two things are one subject, and this one is nearer.** It is spent where that is true and said once.

| Allowed | What the depth says |
|---|---|
| a hero figure and its title | the words are about this thing |
| a stage and its readout | the instrument sits in the space and the value is nearest the reader |
| a figure and its caption | the caption belongs to this picture |

**Forbidden:** body text; any control (button, field, tab, toggle, slider); lists, tables and menus; navigation and chrome (the dock, a header, a sidebar); dialogs, popovers and toasts; a second scene in a view that already has a hero or a stage; and any use whose two layers are not one subject.

**Parallax means: this picture is farther away than the words.** It is one layer per scene, the figure or its picture, trailing the page by an eighth at most.

**Forbidden:** text at another rate; a second rate in one view; more than one moving layer in a scene; pointer or tilt parallax; a pin; a smoothed or snapped wheel; an entrance on every section; anything that moves under reduced motion.

The exact replacement for `restraint.md`'s line, and the lines for `motion-canon.md`, are in `PRECEPTS-ADDENDUM.md`. The primitive is specified in `../../waves/W-B.19.md`.

## Struck on the second pass

Each of these was written on the first pass and removed because the record does not support it.

1. *A covered fraction for Stripe.* The scan's 216 of 216 is the foreground copy over the background copy. How much of the heading the wave crosses was never counted; the table above gives a strip reading and says so.
2. *A covered fraction for the iPhone letters.* It is a video. Strip reading only.
3. *A per-line cover number from Aupale.* The data counts 9 of 81 points across three lines. How they fall per line is not in it, so the quarter-line bound is glass's own.
4. *"Covered text is always 40 px or more."* Aupale's line is 33 px at 390. The 40 px floor is glass's own.
5. *"The best sites drive depth with scroll timelines."* None does.
6. *"Apple parallaxes its heroes."* Every Apple hero layer ran at 100 or was pinned at 0.
7. *"A little pointer parallax is the deft touch."* No hero in the record moves with the pointer.
8. *"Apple's entrance follows scroll position."* The samples fit a timed entrance as well.
9. *"The narrow lag is smaller by design."* Oura's 9.8 against 13.5 is measured; why is not.
10. *"SMWS keeps its title readable."* The strip shows it grey over the open window.
11. *"A masked blur scrim is safe in Safari."* Playwright WebKit drew the Vision Pro sheet nearly clear; Safari itself is unread.
12. *"Opacity, filter and mask blind a glass plate."* The spec says so; glass measured only `clip-path` and `mix-blend-mode`.
13. *"Stripe's blend carries to dark."* Unmeasured; the record reasons that it needs a second pair.
14. *"Oura stops under reduced motion."* A popup blocked that run.
15. *"A view timeline costs nothing per frame."* No recorded site uses one, so there is no trace. The prototype reads it (W-B.19, G-COST).
16. *"Splitting the figure into a back and a front is how the best do it."* No recorded case does it.
