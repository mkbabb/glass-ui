# Depth and parallax: the challenge

Seat: fresh adversarial challenger (claude-fable-5-2, 2026-11-15). This seat wrote nothing else in this directory and launched no browser. It read `BRIEF.md`, the precepts, `W-B.17.md`, `W-B.19.md`, `STUDY.md`, `record/RECORD.md` by way of the study, `PROTOTYPE.md`, the strips under `proto/strips/`, the readings under `proto/data/`, and the source on `bl/depth/proto` (`src/styles/depth.css`, `demo/depth/DepthHarness.vue`, `src/components/blob/Blob.vue`).

Each finding was judged twice: written from the first read, then read back against the strip, the data file or the source line named beside it. What did not survive is listed at the end. A finding is **seen** (in a strip), **measured** (in `proto/data/`), **read** (from source) or **derived** (arithmetic or the CSS specification, not run).

The short verdict: the mechanism is sound and cheap, and the hero holds from 360 to 1920. The design is weaker than its gates say on the half the owner named first. Of three compositions, one shows text in front of a figure, one shows a word struck through by a ring, and one shows a caption that could not be put on the picture at all. Nothing here is more than Apple would use; the misses are on the side of depth that does not read, not ornament.

## Kept findings

### C-1. The stage reads as a collision, not as depth (seen; high)

`stage-chromium-1440-light.png`, `stage-chromium-390-light.png`, `stage-chromium-1440-dark.png`, every frame. The dial is a 7-unit ring with an empty middle. Its upper arc crosses "download" through the feet of "wnlo" and the word shows whole through the ring's hole above and beside it. The eye does not see a word behind an instrument. It sees a word with a line through it.

The study's own grammar says why (STUDY §1, item 3): the covering thing needs a silhouette the eye knows, and the cover lands at a line's end or as a band through very large letters. A hollow ring has an outline and no body. In light the track is tan over a brown word, so the two also sit close in tone.

The gate passes it: cover is 0.22 to 0.23 against a bound of 0.25 at every width (`chromium-*.json`, scene 2). A bound on the share of ink does not tell a body from a stroke.

What it asks of the spec: R-3 says "any element is the figure". It should say a figure is opaque where it meets a `behind` run. A ring, a line chart, an axis, a transparent canvas are not figures for text to pass behind; the word stands clear of them.

### C-2. Text in front of a figure is shown once, by a quarter of two letters (seen and measured; high)

The owner's words are "text behind and in front of figures and areas".

- Hero: "glass" crosses the Blob's lower edge with the tops of "a" and "s", about a quarter of the x-height (`hero-chromium-1440-light.png`, frame 1; the Blob's body ends near y 548 and the line's box starts at 450).
- Figure: the caption's text is not in front of the picture at any pixel. D-3 moved it off, and the strip shows a chip hanging under the frame by a 10 px lap (`figure-chromium-1440-light.png`, `figure-chromium-390-dark.png`). PROTOTYPE.md says the same: it "reads more as a tab than as a sheet".
- Stage: "412 Mbps" sits in the ring's hole and touches no ink of the dial. Its cover of 0 and contrast of 16.77 are the page ground, read through nothing.

So `front` is proven as a stacking rung and hardly shown as a picture. Two of the three compositions would look the same with the attribute removed.

### C-3. The plate does not buy legibility over a picture, so R-5 has one working cure, not two (measured; high)

R-5 allows two cures for front text: the figure's tone, or a glass plate. PROTOTYPE.md D-3 measured the plate over the picture at every tier: worst points 2.22 to 3.51 against 4.5. The cure taken was to move the text off the figure.

That leaves text in front of a photograph, a chart with colour, an Aurora or any figure whose tone the author does not own with no legal form. Only display type over a figure tuned per theme passes (the Blob, after D-2 rewrote its palette stops for each theme; the stock Blob reads 1.99 in dark).

This is the case the brief names ("a photograph's subject, a glass plate") and it is the common consumer case (atlas, Gregg's figures, daraksha). The spec needs a ruled answer: a plate tier or tint that is measured to carry text over a picture, or a plain statement that captions sit beside figures and never on them. D-3 already calls it the owner's question; it is larger than a caption's margin.

### C-4. The hero loses a whole letter in the middle of the word (seen; medium)

`hero-chromium-1440-light.png` frame 1 and both dark and light crops at 390: the Blob hides nearly all of "q" and the left stem of "u". The word still reads, by its shape and because everyone knows it. The study's rule is that cover lands where the eye can finish the word, at a line's end or as a band through letters whose tops and feet still show. Here it is the middle, and one letter goes whole.

R-4 bounds a line at a quarter and a word at a half. "Liquid" at 0.18 passes both with a letter gone. A less familiar word of the same shape ("Lipuid", a product name, a surname) would not be read. The bound wants a per-letter clause (no letter of a `behind` run wholly covered) or the hero wants the figure at the line's end.

### C-5. The amount is mislabelled, and the stills cannot show it (derived and measured; medium)

`--depth-lag: 0.125` is called "an eighth" in OWNER-READ, in the precept text and in OQ-3. Nothing trails by an eighth. The rate is `lag × min(S, W) / (S + H)`, so 0.125 is a ceiling reached only by a scene of no height.

| scene | lag per 100 px scrolled (measured) | Oura, the calibrating case |
|---|---|---|
| hero, 1440 | 6.25 | 13.5 |
| hero, 390 | 2.89 | 9.8 |
| picture in its window, 390 | 4.02 | 9.8 |

So glass is at half the reference on a desktop and under a third on a phone, and it narrows more steeply than the reference does (46 % against 73 %). OWNER-READ's line "Glass already rules the same ratio" is not what was built.

While "Liquid" is whole in view the Blob moves 12.5 px at 1440 against 245 px type (three 100 px steps, cover 0.181 to 0.162) and about 8.7 px at 390 against 66 px type. That may be right; deft is the owner's call. But he is asked to choose between "an eighth" and "a sixteenth" when the real pair is a sixteenth and a thirty-second, and the strips cannot help him: `hero-chromium-1440-light.png` and `-lag16.png` differ by 87 to 210 pixels per frame out of about 223,000, and the still twin by under 600. OQ-3 needs a look in motion, with the true numbers beside it.

### C-6. The lag the spec offers for the dial breaks the spec (measured; medium)

W-B.19, composition 3: "On a page that scrolls, the dial may take `data-depth-lag`." The prototype did exactly that as the G-FLOW bite. `chromium-1440x900-bite-last-scene.json`, scene 2: "download" cover 0.308, 0.303, 0.295, 0.277, 0.304 (bound 0.25), and at the last step the value "412Mbps" reads 0.085 covered: the ring has moved under the digits. That is R-4 and R-6 both, from a sentence the spec itself wrote.

The general form: a composition is tuned at one offset, and the lag then moves the figure by up to T each way. Compositions 1 and 3 sit at 0.18 and 0.22 against 0.25, so there is little room. A scene not centred in the viewport at rest also rests at a non-zero offset (a hero shorter than the viewport at the top of a page; a slide), so the picture as drawn under reduced motion and the picture at rest with motion differ. The spec should strike the dial sentence and say the cover is composed with the figure at both ends of its travel.

### C-7. A figure that fills its scene leaves it at both ends, and its rate changes while it is still on screen (derived; medium)

The timeline is the scene's box (`view-timeline: --depth block`, `animation-range: cover`, fill `both`). A whole-figure lag translates the figure by −T before the scene's top edge reaches the foot of the viewport and holds +T after its foot has left the top. If the figure reaches within T of its scene's edge, part of it is on screen outside the range, moving at 100, and then changes to its lag rate: a kink the eye can see, and up to T of figure laid over whatever sits above the scene.

The spec's own table lists "a figure 480 wide and 360 tall" with T = 30 px, which is this case if that figure is its scene. G-ENDS did not read it: the hero is as tall as the viewport with the Blob centred, and composition 2 uses `within`, which is clipped. Not a cut, since position is continuous, but P0's "start to stop" is about velocity too. Rule: a whole-figure lag needs T of clear room inside its scene above and below, or the scene uses `within`.

### C-8. "Generalized" is three z-index rungs; every placement is local CSS (read; medium)

The question set for this seat: can a consumer make a chart, an image or a Card the figure with the API as written and no local CSS? No.

- With no local CSS every child stretches over the one cell (`depth.css:35-38`), so a `behind` run is fully under the figure.
- An image with `within` is `position: absolute` (`depth.css:60-66`), so its frame has no height until the author writes an aspect ratio. An image cannot be marked directly as a trailing picture.
- The harness needs about 60 lines for three scenes (`DepthHarness.vue:154-251`), and the one hard number, cover under a quarter from 360 to 1920, is found by hand and guarded only by glass's own gate. A consumer has no gate and no warning.
- R-2's trap is silent. A wrapper between the scene and a run that forms a stacking context (a `Transition` with opacity, a `view-transition-name`, a container, a transform) drops both runs to one side. The bite shows it happens; nothing tells the author.
- `container-type: inline-size` on the scene means it cannot take its width from its content. A `.depth` in a flex row or a shrink-to-fit column has no width.
- Of the five figures the brief names to test first (Blob, Aurora, HandMark, the dock's plate, a Card), one was built. The Card-as-figure clause of G-COVER is unread, and text behind a frosted plate has never been looked at.

What would make it general without a component: two or three ruled placements written in the sheet (figure on the seam of a two-line title; figure at a line's end; caption on the lower edge), sized in `cqi`, each with its cover already measured, so a consumer picks one and writes no geometry.

### C-9. The front run's box lies over the lower half of the figure's hit surface (read and measured; medium, conditional)

`.hero-title > span { display: block }` plus `[data-depth="front"]` at `z-index: 11` puts a box of 656 × 220 px over y 450 to 670 at 1440. The Blob's box runs y 205 to 695. A pressable Blob's only interactive surface is `.goo-blob-hit`, a disc centred in that box (`Blob.vue:303-313`, `386-395`). Its lower half is under the span, which takes the pointer, between the letters as well as on them.

The harness Blob has no press handler, so nothing fails there. On the landing page, or for any consumer whose figure is a control, half the control is dead and the hover lift (`Blob.vue:360`) fires only from above the seam. W-B.19 worried about the reverse (the disc blocking selection). The precept addendum says a figure that is a control "keeps its own row"; with a front run across it, it does not. Either a figure under a front run is not a control, or the run's box is shrunk to its ink (inline, not block).

### C-10. The figure brings its own shadow onto the words (seen and read; low to medium)

The sheet adds no shadow, and "a shadow under the figure to lift it" is on the cut list. The Blob carries two chained `drop-shadow()` filters and a third pair on hover (`Blob.vue:355-360`). In the enlarged hero frames there is a soft haze around the Blob on the paper at lower left and across the stem of "u"; at 390 it is a visible smudge beside a 60 px ball.

It is the Blob's, not depth's. But the scene is where it first falls on type, and an eye reads it as a shadow put there to sell the layer. The owner should see it named: keep the Blob's grounded shadow in a scene, or rest it flat when it is a figure over text.

### C-11. No reading of the trailing layer against the page during a scroll (read; medium, open)

`measure.mjs:112-138` settles two frames after each 100 px step and then reads. `cost.mjs:110-119` reads `requestAnimationFrame` intervals. Neither reads whether the lagging layer and the scrolled text are in step within a frame. That is the fault that makes parallax look machine-made on a phone: the page scrolls on the compositor and the layer catches up a frame late, so the figure shivers against the words during a flick.

Chromium runs a `translate` view-timeline animation on the compositor. Whether shipping Safari 26 does is not known to this seat and is not in the record. OQ-4 should say what to look for: a fast flick on an iPhone, eye on the Blob's edge against "Liquid". If it shivers, the Safari arm is the still picture until it does not.

Also still open, as PROTOTYPE.md says: every dark cell crashes Playwright WebKit on the demo, so dark is unread in any WebKit, and no WebKit trace exists.

### C-12. The readout is read as "412Mbps", and `output` is a live region (measured and read; low)

`chromium-1440x900.json`, `name[2]`: `status: 412Mbps`; select-all gives "download 412Mbps". D-4 records it and leaves it. The spec's markup should carry the space, and the unit a spoken form. An `output` announces each change; a value that changes many times a second during a test (speedtest) will flood a screen reader. The consumer note should say the live value is announced when it settles.

## Small corrections to the text

- W-B.19, Scope: "A scene that ends a document leaves the travel as padding below it." It does not, and G-FLOW's bite could not bite. `container-type: inline-size` gives the scene layout containment, and overflow from a contained box is ink, not scrollable overflow (derived). The sentence and the bite can go.
- W-B.19 R-8 and the precept row say the travel is "an eighth of half the viewport's height". True of T; the rate that follows is in C-5.
- At 1440 and 1920 the figure and stage scenes are fixed at 704 and 576 px wide, with a 15 px caption. They hold, but at 1920 they are small islands, and only the hero scales.

## Read back and dropped

- *The caption is read twice.* The tree shows the caption as the figure's name and as its text. That is how `figure` and `figcaption` work everywhere; not this design's.
- *`isolation: isolate` blinds a plate inside the scene.* Isolation is not a backdrop root. Dropped.
- *The hero falls apart at 360 or 390.* It does not: "Liquid" 0.12 to 0.18, "glass" 0, the same picture at every width. It is small on a phone (the title is 178 of 390 px wide), which is taste.
- *A cut at an end of travel.* None found in the hero or the window: offsets are continuous and both ends are off screen. C-7 is a rate change in a case that was not built.
- *More than Apple would use.* Nothing found. One layer, no pointer, no pin, no entrance, no blur, no blend. The cost reading (0.3 ms per step, one animation on `translate`, no listener) stands.
- *Reduced motion.* The still form is whole and equal to the masked-support form in every cell read.
