# Depth and parallax: the fold

Seat: fold (claude-fable-5-2, 2026-11-15). It read `BRIEF.md`, the precepts, `W-B.17.md`, `challenge.md`, `W-B.19.md` and `PROTOTYPE.md`, then the strips and the source on `bl/depth/proto`. It rewrote `../../waves/W-B.19.md` in place, amended the prototype on its own branch, took the readings below there, and brought `OWNER-READ.md` and `PRECEPTS-ADDENDUM.md` into line. It touched no other file, staged nothing in the main checkout, and loosened no gate.

Every finding of the challenge is folded. None was dropped; two are folded as a ruling and an owner's question, because no headless run can read them (C-11, and the look of C-10). Where the challenge was wrong in a detail, that is said under the finding.

## What was built and read

Commit on `bl/depth/proto`, read from `git log`: `e4275ac40` proto(W-B.19): the fold.

| file | change |
|---|---|
| `src/styles/depth.css` | three ruled placements (`data-depth-scene`); the travel's room under a figure that trails whole; half travel in a title; each title run a block as wide as its word |
| `demo/depth/DepthHarness.vue` | the three compositions on the placements, with no geometry inside a scene; the stage's instrument given a face; the value as `p` with its space and `abbr`; the caption's plate opaque; the Blob flat, and quiet in dark; `?card=1`, `?fill=1`, `?fill=bare`, `?surface=`, `?shadow=1`, `?t1=&t2=` |
| `tests/styles/depth.test.ts` | three cases added (placements, half travel, room). 10 cases, green |

Scripts added under `proto/scripts/`: `fold.mjs` (the readings), `fold-compose.py` (its strips), `fold-table.mjs`, `fold-batch.sh`. Data: `proto/data/fold-*.json`, `*-fold.json` (the prototype's own `measure.mjs` and `cost.mjs`, run again on the amended build). Strips: `proto/strips/fold-*.png` and `*-fold.png`. The prototype's earlier data and strips are untouched and describe the first spec.

How `fold.mjs` reads: each scene is centred in the viewport and its trailing figure is held at −*T*, 0 and +*T*. At each, four frames per run (figure hidden or shown, run inked or clear) give the run's ink, the share of it the figure covers, the share that has the figure's paint under it, and the contrast at every solid ink pixel. The same is read inside each letter's own box. Runs: Chromium at 360, 390, 768, 1024, 1440 and 1920, light, and 360, 390, 1440 and 1920 dark; Playwright WebKit (Safari 26.5) at 360, 390, 1440 and 1920, light. The WebKit run waited 49 minutes for the machine's one WebKit lock and then ran in two.

Every run went through `guarded`; the WebKit run through `guarded --exclusive webkit`. One browser per node process, a new context per cell. The dev server ran as a light guarded run with a timeout and was stopped by PID.

## Dispositions

| | finding | disposition | where in W-B.19 |
|---|---|---|---|
| C-1 | the stage reads as a collision | folded, rebuilt, read | R-3, composition 3, G-COVER |
| C-2 | text in front is hardly shown | folded, rebuilt, read | R-5a, R-15, G-COVER |
| C-3 | a plate does not carry text over a picture | folded as a ruling, read | R-5, composition 2, G-READ |
| C-4 | the hero loses a whole letter | folded, rebuilt, read | R-4, R-15, G-COVER |
| C-5 | the amount is mislabelled | folded; the question goes to the owner in motion | R-8, OQ-3 |
| C-6 | the dial's lag breaks the spec | folded, read | R-4, R-7, R-8, G-COVER, G-READ |
| C-7 | a figure that fills its scene changes rate | folded as a mechanism, read | R-7, G-ENDS |
| C-8 | "generalized" is three rungs | folded, rebuilt, read; three named figures still unbuilt | R-15, R-2, G-RESTRAINT |
| C-9 | the front run's box takes the figure's pointer | folded as a ruling, read | R-3, G-RESTRAINT |
| C-10 | the Blob's shadow falls on the words | folded with a default, read; the look is the owner's | R-3, OQ-7 |
| C-11 | nothing reads the layer against the page inside a frame | folded as an owner's look and a ruled fallback; unreadable headless | limits, R-12, OQ-4 |
| C-12 | "412Mbps", and `output` is a live region | folded, read | composition 3, G-NAME |
| | the three small corrections | folded; one corrected in turn | Scope, R-8, R-15 |

### C-1. The stage

The challenge is right, and the strip shows it. R-3 now says the figure is opaque where it meets a `behind` run. The harness's instrument has a face (a disc of `--card` inside the ring).

- Read: "download" loses 0.14 to 0.16 of its ink, worst letter "n" at 0.44, at every width and in both themes. The first stage read 0.22 to 0.23 with the word showing through the hole.
- The instrument's margin was moved from 10.5 to 11.5 % of the scene after "n" read 0.503 at the first.
- G-COVER gains a body clause (the figure paints across the middle quarter of its box) and a bite (the face removed). **Both are written and unread.** The gate script does not have them yet.

### C-2. Text in front

Right. The spec had no rule that either depth be shown, only that the rungs stack. R-5a is that rule, and the three compositions were redrawn to meet it.

| run in front | share of its ink that stands on the figure | was |
|---|---|---|
| "glass" on the Blob | 0.22 to 0.26 | the tops of two letters |
| "UI" on the Blob | 0.58 to 0.66 | not built |
| "412 Mbps" on the dial's face | 1 | 0 (it sat in the ring's hole) |
| the caption on its plate | the plate laps the frame by 1.5rem and its text is on the picture's side | 0 (hung below the frame) |

R-5a's bound is a tenth, under the least read. The caption's lap is by construction; no number was read for it beyond its contrast.

### C-3. The plate over a picture

Right, and larger than a caption's margin, as the challenge says. Glass has three plate decorations, so all three were read under the caption in the spec's geometry (text on the picture):

| plate | worst point, light | dark |
|---|---|---|
| `glass` (quiet) | 2.9 | 2.48 |
| `veil` | 2.9 (4.0 at 390) | 2.51 |
| `opaque` | 16.2 | 11.21 |

R-5 now names two cures with what each carries: the figure's tone where the author owns it, an opaque plate where he does not. The frosted caption is on the cut list. It is not put to the owner as a question, because it was measured and has one answer; OWNER-READ tells him so.

The tone cure was also re-read at the travel's ends, and it had a hole. With the dark stops PROTOTYPE.md D-2 wrote, "glass" read 4.82 at the drawn place and 3.65 at the lower end at 390: light ink over the Blob's highlight. Deeper stops alone read 4.15 to 4.71. The floor is the Blob's highlight and warm rim, not its body: with `specStrength` 0.04 and `rimStrength` 0.06 in dark, the worst point is 6.84. The stock Blob in dark reads 1.99 and loses a whole letter of the front word.

### C-4. The letter

Right. R-4 gains the letter (no more than half), and the figure moved from the seam of the title to the end of its lines.

- Read, per letter, at −*T*, 0 and +*T*: "Liquid" worst "d" 0.36; "Glass" worst "s" 0.45. Line cover 0 to 0.086.
- The first placement tried put the figure higher and read "s" at 0.57 at the upper end; the figure's margin went from 14 to 16.5 % of the scene.
- At the drawn place the line behind loses 0.02 to 0.03 and its last letter 0.08 to 0.13. That is the size of Aupale's cover at 390 (0.03). It is small, and it is where the bound and the travel leave it; at the lower end the figure covers none of the first line.

### C-5. The amount

Right in every number. "An eighth" is struck from R-8, the owner's read and the precept text; R-8 now gives the rate and the lag per 100 beside Oura's, as read on the amended build:

| | 1440 | 390 |
|---|---|---|
| title | 4.0 | 1.44 |
| picture in its window | 6.16 | 4.02 |
| Oura | 13.5 | 9.8 |

The title's lag is lower than the 6.25 and 2.89 the challenge read, because of C-6 (the half travel). The spec does not hide that: glass trails by less than the reference everywhere, and by least in the title. OQ-3 asks the owner in motion, with these numbers, and says where more is on offer (the window) and where it is not (the title). The challenge's point that the strips cannot show the amount is taken: OQ-3 is no longer "by capture".

### C-6. The lag against the composition

Right, and it reaches past the dial.

- The dial sentence is struck; R-7 says a stage's instrument does not trail, and G-RESTRAINT fails a lag in a stage scene.
- R-4 and R-5 now hold at both ends of the travel, and the gates read there.
- Reading the title at both ends showed the first spec's travel cannot be kept in a title. With the figure at the end of the lines and the full travel, "d" read 0.74 covered at the upper end at 1440 (a tuning run; its file was not kept). The x-height is 8.8 % of the scene's width and the full travel is up to 6.25 %. So a title scene's travel is half: `min(50lvb, 25cqi)`. With it the worst letter is 0.45.
- R-4 says a scene off the viewport's centre rests off its drawn place, and R-11 says the still picture is the drawn place; both are inside what G-COVER reads.

### C-7. The figure that fills its scene

Right as derived, and now read. The fold took the challenge's rule (the travel's room inside the scene) and made the sheet give it, so no consumer has to know it: a scene whose figure carries `data-depth-lag` is padded by `--depth-lag × 50lvb`, which is never less than the travel.

| a figure 360 tall that is its scene's whole content | rate while any of it is on screen | outside its scene |
|---|---|---|
| with the room (ten cells) | one value at every step (95.63 at 1440; 96.58 at 390) | 0 px |
| the room removed (`?fill=bare`, 1440) | 95.24 to 100 | 30 px |

The table row the challenge named is now that reading. G-ENDS gains the clause and the bite. The room is there under reduced motion too, so the scene's height does not change with the setting (read: the same heights in the reduced and masked cells).

### C-8. Generalized

Right on every bullet. What the fold did with each:

- **Placement is local CSS.** R-15: three placements in the sheet, one per allowed site, sized in the scene's width. The harness now writes no geometry inside a scene; its own rules are where the scene sits, how wide it is, and the type's face.
- **An image cannot be marked directly.** Still true, and said: the frame is the figure, and the `caption` placement gives it its shape (`--depth-aspect`).
- **No gate for a consumer.** The placements carry the reading. A scene with no placement is the bare cell and its cover is the consumer's to read; the spec says so.
- **R-2's silent trap.** A stylesheet cannot warn. R-2 names the wrappers that do it, the placements leave no room for one, and the consumer note says it in one line. No mechanism was added; a script that warns would be the listener the wave forbids.
- **A scene cannot take its width from its content.** Said in R-15 and the consumer note. Not changed: the container is what sizes the picture.
- **One of the five named figures was built.** A glass Card is now read as a title's figure: the ink behind it is 0.21 to 0.43 as sharp as with the Card hidden (Chromium, ten cells), so the blur clause of G-COVER has a reading and a bound. Text behind a frosted plate was looked at (`fold-chromium-1440-light.png`, last frame): it reads as a letter under frost and is lost as a letter, so "counts as covered" stands. **Aurora, HandMark and the dock's plate are still unbuilt as figures.**

One thing the fold found while doing this: `min-content` on the heading, the obvious way to put one word on a line, breaks where a base rule lets words break anywhere. An `h2` in the harness stacked its letters. The placement makes each run its own block instead.

### C-9. The pointer

Right. The fold measured it instead of deriving it: over a disc at the figure's centre, the topmost element is a run or the heading at 0.53 to 0.59 of the points in the title and 0.59 to 0.66 in the stage. Since C-2 asks the front run to stand on the figure, shrinking the run's box cannot free the figure; the box is now the word's width (it was the heading's), which frees the paper beside it and nothing more. So R-3 rules it: a figure that a run crosses is not a control. G-RESTRAINT and `affordance-map.md` carry the line.

### C-10. The Blob's shadow

Right that it is the Blob's and that the scene is where it first falls on type. Read: with the shadow on, the figure's paint lies under 0.126 of "Liquid" at most, against 0.086 flat; the extra is shadow on letters. R-3 rules the Blob flat in a scene, by its own four shadow tokens, written by the page. The sheet does not reach into the Blob. Whether flat is right to the eye is OQ-7, with `fold-chromium-1440-light-shadow.png` beside the flat strip.

### C-11. Step with the page inside a frame

Right, and not readable here. A headless run reads positions on the main thread after the frame settles; it cannot see a compositor a frame behind. The fold did not pretend to: it is the third limit at the head of W-B.19, OQ-4 now says what to look for on a device, and R-12 says what ships if the look fails (the still picture, in Safari). Dark in WebKit is still unread for the reason PROTOTYPE.md gives.

### C-12. The readout

Right. The value is `412 <abbr title="megabits per second">Mbps</abbr>` in a `p`. Read: the tree gives `paragraph: 412 Mbps` and select-all gives "download 412 Mbps", in every cell. The consumer note and G-NAME say a running value is not a live region.

### The small corrections

- **"A scene that ends a document leaves the travel as padding below it."** Struck, with its bite. The challenge's reason is not the right one, though: a figure's overflow from a scene does count as scrollable overflow. Read: the title's figure pushed past the end edge takes `scrollWidth` to 619 against 390, and 1973 against 1440. The old bite did not bite because at the document's end the scene is still on screen and the figure is in the upper part of its travel, not below the scene. G-FLOW's bite is now the sideways push, which is RED in every cell.
- **"An eighth of half the viewport's height" is the travel, not the rate.** R-8 says both.
- **At 1920 the figure and stage scenes are small islands.** Their width is the page's (`max-inline-size` in the harness), not the sheet's; R-15 says the page writes how wide a scene is. The fold found the opposite fault in the title: the Blob's box is twice its body, so a Blob title scene is 62.5 % of its width tall, 1335 px at 1920. The harness caps that scene at 72rem and the spec says why.

## Found by the fold's own WebKit run, and open

**The title's two lines touch in WebKit's face at 360.** Chromium and Playwright WebKit load different faces on the demo (`fold-webkit-360-light.png` beside `fold-chromium-390-light.png`). In WebKit's, at a line height of 0.9, the descender of "q" meets the ascender of the "l" below it. `fold.mjs` reads the front run "glass" at 1.28 there at 360 (7.21 at 1440 and 1920, 5.08 at 390). It is ink on ink between two lines of one heading, not the figure, but G-READ as written is RED on it, and it is a real touch the eye can see in the strip. The cure is a line height of 1 in the `title` placement. That moves the figure against both lines, so every number in the title's row has to be found and read again in both engines. The fold did not do it: the WebKit lock cost 49 minutes for one run. W-B.19 carries it as open under R-15, and the gate table shows the RED.

**The Card's blur is unread in WebKit.** In WebKit's narrower face the Card does not reach "Frosted" (cover 0), so there was no ink under it to read. Chromium's ten cells stand. It also shows the placement's cover depends on the face: the numbers are for the faces read.

**A frosted caption misreads in WebKit.** With `surface=glass` WebKit reads the caption 0.52 "covered": the plate's backdrop changes when the text is cleared, so the four-frame method is unsound over a live blur there. Its contrast, 2.84, fails either way.

## Regression on the amended build

The prototype's own `measure.mjs` and `cost.mjs`, run again (`*-fold.json`):

| | Chromium | WebKit, light |
|---|---|---|
| rates | title 96.00 (1440) and 98.56 (390); picture 93.84 and 95.98; each equal to the derived rate. Text and scenes 100.00 | the same to the hundredth |
| ends | largest step 6.16 px (allowed 7.25) and 4.02 (5.02); −44 below, +44 above; hero at scroll 0: 0.00 | the same |
| still | reduced at 1440 and 390, masked at 1440: 0 animations, offset 0, picture the size of its window, same page height | reduced and masked at 1440: the same |
| name, selection | "Liquid glass"; drag "Liquid glass"; triple click "Liquid"; "download 412 Mbps" | the same |
| cost, 4× CPU | 1440: 2.67 ms per step against 2.44 still (0.24 more). 390: 3.15 against 2.19 in one run (0.96 more) and 3.70 against 4.29 in a second (0.59 less); the first build read 0.19 more. On this machine tonight the run-to-run noise at 390 is the size of the bound. 1 layout, at the document; 0 style writes; 0 listeners. Bite: 24 layouts | not re-read |
| elements per scene | 5, 3 and 7 (the stage gained the face and traded `small` for `abbr`) | |

`analyze.mjs` marks the title's rate as failed in these cells. It derives the rate from the first spec's travel (56 px); against the title's half travel the reading matches to the hundredth. The script was not changed.

## What is unread after the fold

- G-COVER's body clause, and three new bites (the face removed, the plate made `glass` as a bite of the gate script, the room removed as a bite of `measure.mjs`). The readings exist in `fold.mjs`; the gate script does not hold them.
- G-RESTRAINT's new clauses as gates (no control under a run, no geometry outside the sheet, no shadow on a run).
- The bites of the first build that name old selectors (`blob-2x`, `caption-off-plate`, `last-scene`) were not re-run.
- The title at a line height of 1 (the open RED above), in both engines.
- WebKit in dark; a WebKit trace; the Card's blur in WebKit; Safari itself; a touch drag.
- Aurora, HandMark and the dock's plate as figures. The landing page and the "Depth" story.
- G-COST's 1 ms clause at 390 on a quiet machine: two runs here read 0.96 more and 0.59 less, which is noise, not a reading. The counts (layouts, writes, listeners) are steady.
