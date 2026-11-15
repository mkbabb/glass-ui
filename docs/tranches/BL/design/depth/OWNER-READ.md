# Depth and parallax: the owner's read

You asked for "elements of parallax, and depth--like having text behind and in front of figures and areas--deftly. Generalized." This page is what the study found, what was built and looked at, what a second reader faulted, what changed because of it, and six questions. It is built on a scratch branch only; nothing is in a release. The study is `STUDY.md`, the spec is `../../waves/W-B.19.md`, the first build is `PROTOTYPE.md`, the faults are `challenge.md`, and what was done with each is `fold.md`.

## What the best sites do

Twenty were read; eight had real depth. Three things held across all of them.

- **Apple does not parallax its heroes.** Every layer on four Apple pages moves with the page or is pinned. Its depth is a picture, a pin with a frosted sheet rising over it, or one blur under the words.
- **Where a layer does trail the page, the deft sites move one, and it is the picture.** Oura's image lags its card by 13.5 px for every 100 scrolled on a desktop and 9.8 on a phone. The words never move.
- **Text behind a figure is large, and little of it is hidden.** The one measured case covers a ninth of the heading, at the ends of lines. The site with four layers at four rates is the one that reads as machine-made.

## What the first build got wrong

It was built as first specified and every gate passed. A fresh reader then looked at the pictures, and the pictures were weaker than the gates said.

- You asked for text behind *and in front of* figures. Of three compositions, one showed text in front, by a quarter of two letters.
- The hero hid a whole letter in the middle of "Liquid".
- The stage's word did not read as behind the dial. The dial was a ring, and a word under a ring reads as a word with a line through it.
- The caption could not be read on the picture through a frosted plate, so it had been moved off the picture.
- "Generalized" was three stacking rungs and sixty lines of hand placement per page.
- The amount was called an eighth. Nothing trailed by an eighth.

Each of those is changed below, and each change was read again on the build.

## What you will see now

Strips are under `proto/strips/`; the ones to open are named.

- **A title** (`fold-chromium-1440-light.png`; its first three frames are the Blob at the upper end of its travel, at its drawn place and at the lower end. `fold-chromium-390-dark.png` is the phone, dark). "Liquid" and "glass" end together, and the Blob sits at their end. The foot of the "d" tucks behind it and "ss" stands on it. It is one heading, written once. As you scroll, the Blob slides a little down from under the first word.
- **A figure in a window** (fourth frame). The picture trails inside its frame; the frame and the caption hold still. The caption is a solid card lapping the picture's lower corner, with its words on the picture.
- **A stage** (fifth frame). The dial has a face. The feet of "download" pass behind it and "412 Mbps" stands on it, whole, always. Nothing on a stage trails.
- **On glass.babb.dev,** the landing page opens on the title: "Glass" behind the Blob, "UI" in front (`fold-chromium-1440-light-glassui.png`). A "Depth" story holds all three with a still twin of each.
- **With reduced motion, and on Safari before 26,** the same pictures, still. Nothing is missing from them.

What a consumer writes: a class, a placement name (`title`, `caption` or `stage`) and one attribute on each layer. No geometry. The three placements are sized in the scene's own width, so the picture is the same at 360 and at 1920, and how much of each word is hidden was read once, here.

What it costs: one stylesheet. No component, no script, no listener, no added node, no shadow, no blur, no gradient. One thing moves per scene.

What it will not do: move text, follow the pointer, pin the page, smooth or snap the wheel, fade things up as they arrive, or appear on body text, controls, lists or the dock.

## How much it moves, in true numbers

| | desktop, 1440 | phone, 390 | Oura, for scale |
|---|---|---|---|
| the title's Blob, each way | 36 px | 12 px | |
| its lag for every 100 px scrolled | 4.0 px | 1.4 px | 13.5 and 9.8 |
| the picture in its window, each way | 44 px | 22 px | |
| its lag for every 100 px scrolled | 6.2 px | 4.0 px | 13.5 and 9.8 |

That is a third to a half of the one site measured, and less in the title. The title is small on purpose: the Blob crosses letters, and when it moved farther it swallowed the last one. It moves the same share of the picture at every width, 3 % of the scene.

A still frame cannot show you this. The first build's strips at two amounts differ by about two hundred pixels in a quarter of a million.

## Six questions

Each has the default the spec takes if you say nothing.

1. **Is a weave by word enough?** One word can be behind the figure and the next in front. One letter cannot be half behind it, the way the iPhone slides through "PRO"; that takes a second copy of the text or a mask, and either one breaks selection, a screen reader or the glass under it. *Default: by word.*
2. **Does the landing page take the Blob title?** It adds a figure to a page that has none today and removes nothing. *Default: yes; the capture is named above.*
3. **Is the amount right?** Please judge this one by scrolling, not from a strip. On the scratch branch, `/demo/depth/index.html` is the amount as specified, `?lag=0.0625` is half, and `?still=1` is none. If you want more, the picture in its window can take more, up to about the reference. The title cannot without losing a letter. *Default: as specified.*
4. **Will you look at it in Safari on an iPhone at the close?** Every reading is Playwright's WebKit, which has disagreed with Safari before, and no run can tell whether the Blob keeps step with the page inside a frame. Flick fast and watch the Blob's edge against the letters. If it shivers, Safari ships the still picture until it does not. *Default: you look once, on Safari 26, before it ships.*
5. **Does the Blob rest flat in a scene?** Its own soft shadow falls on the letters beside it and reads as a shadow added to sell the layer. `fold-chromium-1440-light-shadow.png` keeps it, for comparison. *Default: flat.*
6. **Is the dark Blob right?** For light letters to cross it in dark it has to be a deep, quiet bead: its highlight and rim are turned down (`fold-chromium-390-dark.png`). The stock Blob in dark loses a whole letter of the word in front. *Default: the quiet bead.*

One thing is decided and not asked, because it was measured and has no second answer: a caption on a photograph or a chart rides a solid card, not a frosted one. Frosted glass over a picture reads at 2.5 to 2.9 against the 4.5 that text needs, at every tier.

## What changes in the precepts

`restraint.md` loses "no parallax" and gains one line that says where depth and parallax are allowed (a title and its figure, a figure and its caption, a stage and its readout), that the figure needs a body, that both depths are shown, what may move (one layer per scene, the figure or its picture, by scroll alone) and where both stay forbidden. It gains one line on captions over pictures. The ceiling table gains one row: one moving layer in a depth scene. `affordance-map.md` gains one line: a figure that text crosses is not a button. The exact text is `PRECEPTS-ADDENDUM.md`.

## Known fault, not yet cured

- In the typeface Playwright's WebKit loads, the tail of the "q" in "Liquid" touches the "l" of "glass" below it on a 360 px phone (`proto/strips/fold-webkit-360-light.png`). The two lines want a little more room between them, which means placing the Blob again and reading both browsers again. It is carried as open in the spec.

## Still not looked at

- Safari itself, and any WebKit in dark (Playwright's WebKit crashes on the demo's dark pages; that is not this work's fault, and dark was read in Chromium).
- The landing page and the "Depth" story are not built; the three compositions live on a test page.
- Aurora, HandMark and the dock's plate as figures. The Blob, a picture, a dial and a glass Card were.
