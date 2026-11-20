# W-B.19: depth (text behind and in front of a figure, and one layer that trails the page)

The source is the owner on 2026-11-14 22:22, verbatim (`../design/depth/BRIEF.md` holds it with what it contradicts):

> "let's study and implement elements of parallax, and depth--like having text behind and in front of figures and areas--deftly. Generalized."

It is newer than `restraint.md`'s "no parallax" and wins. `restraint.md`'s ceiling of 2026-11-12 still binds everything else: "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple."

**How this text was made.** Four seats, in order.

- The record seat read twenty sites in headless Chromium and Playwright WebKit and kept the cases with real depth (`../design/depth/record/RECORD.md`).
- The study seat read the record twice and wrote `../design/depth/STUDY.md` and the first spec.
- The prototype seat built that spec on the scratch branch `bl/depth/proto` and read its gates (`../design/depth/PROTOTYPE.md`).
- A fresh challenger read all of it against the strips and the data (`../design/depth/challenge.md`). The fold seat (claude-fable-5-2, 2026-11-15) took each finding its evidence shows, re-read it on the prototype where it needed a number, and rewrote this text as one. `../design/depth/fold.md` lists each finding and what became of it.

A number here is *measured* (the record), *read* (the prototype, in `../design/depth/proto/data/`), *derived* (arithmetic from the tokens) or *unread* (a clause no run has read yet). Fold readings are the files named `fold-*` and `*-fold.json`; the prototype's earlier files stand beside them and describe the first spec.

Three limits bind every claim.

- Shipping Safari is unmeasured. Every WebKit reading is Playwright's build, which reports Safari 26.5 and has view timelines.
- Playwright WebKit crashes on every dark cell of the demo (it is glass's dark arm, not this sheet). Dark is read in Chromium only.
- No reading says whether the trailing layer keeps step with the page inside one frame during a fast scroll (OQ-4). A headless run reads positions after the frame settles.

Release, for `INDEX.md`'s column: **11.2.0, additive.** One stylesheet, three attributes, four custom properties. No component, no composable, no prop on any existing component, no default changed.

## What depth is

A scene is one picture made of three things in stacking order: text behind, a figure, text in front. The eye reads which is nearer from which covers which. Nothing is drawn twice and nothing is masked: each run of text exists once, on one side of the figure.

Both depths are shown, not only stacked. The figure hides part of the run behind it, and the run in front stands on the figure's body. A scene in which either could be removed without changing the picture has no depth (R-5a).

One thing in the scene may trail the page as it scrolls: the figure, or the picture inside the figure's window. The words never do. In every case the record calls deft, the text is the still point (STUDY §2, item 3).

## Rulings

- **R-1: the mechanism is stacking order, of whole runs.**
  - A scene is one stacking context. A run of text marked `behind` paints under the figure and a run marked `front` paints over it. That is all of it.
  - It is what five of the seven live-text cases in the record do (STUDY §3). It is the only mechanism that cannot blind a glass plate: `z-index` and `contain: layout style` are measured clean, `clip-path` and `mix-blend-mode` are measured to leave a descendant's blur sampling nothing (`src/styles/glass/grasp.css:84-98`).
  - **Its limit is stated: the weave is by run, not by pixel.** One word can be behind the figure and the next in front. One letter cannot be both. A second copy of the text (Stripe), a mask on the figure's silhouette and a figure split into a back and a front each buy that step, and each is refused: a string read or selected twice, a dead blur, or a second canvas.
- **R-2: the string is written once, in reading order.**
  - Depth is CSS on elements that stay where the reader's order puts them. No run is moved in the DOM to change its depth, none is duplicated, none is `aria-hidden`.
  - One heading may hold runs at both depths: the heading carries no depth of its own, and its spans do. Its accessible name is its text, once. A drag across it selects its text, once.
  - Nothing between the scene and a marked run may form a stacking context (a transform, an opacity under 1, a filter, a `z-index`, `contain: layout`, a container, a `view-transition-name`, a `Transition` that fades). Such a wrapper traps its runs on one side of the figure, and nothing warns the author: a stylesheet cannot. The three placements leave no room for such a wrapper (a run is a child of the scene or of its heading), and G-COVER reads the side each run lands on. A consumer who composes by hand reads the same thing by eye: the word that should pass behind does not.
- **R-3: any element with a body is the figure, by one attribute.**
  - `data-depth="figure"` on a Blob, an image's frame, a Card, an instrument. It falls through a Vue component to its root, so no wrapper is added. A scene has one figure.
  - **The figure is opaque where it meets a `behind` run.** The eye reads a word as behind a thing only when the thing has a body there. A ring, a line chart, an axis and a clear canvas have an outline and no body: a word under one reads as a word with a line through it (*read*: the first stage, `stage-chromium-1440-light.png`). Such a figure is given a body (a face, a ground), or the word stands clear of it.
  - A frosted plate is a body. Text behind it is blurred by the plate's own blur, and counts as covered.
  - A figure that a run's box overlaps is not a control. The run's box takes the pointer over the figure's body (*read*: 0.53 to 0.59 of the title's figure and 0.59 to 0.66 of the stage's). A Blob in a scene takes no press handler; a pressable figure keeps clear of both runs.
  - A figure brings no shadow of its own onto the words. The Blob's grounded shadow falls on the type beside it and reads as a shadow put there to sell the layer (*read*: with it on, the figure's paint lies under 0.126 of the word behind it, against 0.086 without). In a scene the Blob rests flat, by its own shadow tokens. OQ-7 puts that to the owner.
- **R-4: cover is bounded, per line, per word and per letter, at every place the figure can be.**
  - No line of a `behind` run loses more than a quarter of its ink to the figure, no word more than half, and **no letter more than half**. A letter is the smallest word: the first hero passed the line and the word at 0.18 with "q" gone whole (*read*, `hero-chromium-1440-light.png`). *Glass's own bounds:* the record's one measured figure is 0.11 of a heading's sampled points (Aupale), at the ends of lines.
  - The cover lands where the eye can finish the word: at a line's end, or as a band through letters whose tops still show. Never on a letter in the middle of a word.
  - A `behind` run that the figure touches is display type: 40 px or more, computed. A run smaller than that stands clear of the figure.
  - **The bound holds with the trailing figure at both ends of its travel and at its drawn place**, not only at the scroll positions one page happens to give. A scene can sit anywhere on a page, and a short scene crosses nearly its whole travel while its lines are in view. A scene that is not centred in the viewport also rests off its drawn place, so the still picture and the picture at rest differ by up to the travel; both are inside what was composed.
  - Cover is ink, not boxes: of the pixels a line paints with the figure hidden, the share that change when the figure is shown. A Blob's canvas is larger than its body and mostly clear, so a box test would lie.
- **R-5: text in front is whole and reads, at every place the figure can be.** A `front` run is never covered by anything in its scene. It reads at 4.5:1 against what is under it, at every sampled point, in light and dark, with the trailing figure at both ends of its travel. There are two cures and no third, and each is stated with what it was read to carry.
  - **The figure's tone,** where the author owns it. A Blob written for each theme carries display type: 7.2 or more in light and 6.8 or more in dark, at every width and both ends (*read*). The stock Blob does not in dark: 1.99, with a whole letter lost against its body. The tone is the Blob's palette stops, and in dark its highlight and rim as well, which are light patches on a deep body (3.6 to 4.5 with only the stops written).
  - **An opaque plate,** where the author does not own the tone: a photograph, a chart with colour, an Aurora. `surface="opaque"` on the Card reads 16.2 in light and 11.2 in dark over the test picture. A frosted plate does not carry text over a picture: `glass` reads 2.48 to 2.9 at its worst point and `veil` 2.51 to 2.9, and every glass tier fails the same way (PROTOTYPE.md, D-3). A solid card lapping a picture is the plainest cover there is; the frost adds nothing to the depth and takes the legibility.
  - No scrim, gradient or text shadow is added (`restraint.md`, Shading).
- **R-5a: each depth is shown.** In a scene with a `behind` run, the figure covers some of that run's ink at its drawn place. In a scene with a `front` run, at least a tenth of that run's ink stands on the figure at every place the figure can be; a plate that holds a `front` run laps the figure's box. The first spec's three compositions showed text in front once, by a quarter of two letters; these are read at 0.22 or more (R-15).
- **R-6: a value being read is never behind.** A readout, a count, a live numeral is `front`. What may sit behind an instrument is its name.
- **R-7: one layer per scene trails the page, and it is never text.**
  - `data-depth-lag` on the figure moves the whole figure. `data-depth-lag="within"` on the picture inside the figure's window moves the picture and leaves the window still, which is Oura's form (*measured*: card 100, image 86.5).
  - The gate fails a scene with two lagging elements, and fails `data-depth-lag` on a text run or on an element that holds one.
  - **A stage's instrument does not trail.** Its name and its value are composed against one position of it. The first spec offered the dial the lag; the prototype took it and read the name at 0.31 covered and the ring under the value's digits (`chromium-1440x900-bite-last-scene.json`).
  - **A figure that trails whole keeps its travel's room inside its scene,** above and below. The sheet gives it: a scene whose figure carries `data-depth-lag` is padded by the travel. Without it a figure as tall as its scene leaves the scene's box, so part of it is on screen outside the timeline's range, moving at the page's rate, and then changes to its own (*read*: 95.2 to 100 through one pass and 30 px outside the scene; with the room, 95.6 at every step and 0 px outside).
- **R-8: the lag is one token, the travel is bounded twice, and the amount is stated as what it is.**
  - `--depth-lag: 0.125` is the travel's share of half the viewport. It is not the rate. The name and the number are the route push's (`--route-parallax`, 1:8); it is a new name because `--route-*` is fenced to its two sites (`src/styles/tokens/motion-registers.css:110-116`).
  - The travel each way is `--depth-travel: calc(var(--depth-lag) * min(50lvb, 50cqi))`: an eighth of half the viewport's height, or of half the scene's width, whichever is less. It is declared on the scene, so a scene's lower lag reaches it.
  - **In a title scene the travel is half that:** `min(50lvb, 25cqi)`, so at most 3.125 % of the scene's width, which is 0.18 of the type's size. A figure that crosses letters cannot move far: the x-height is 8.8 % of the scene's width, and a travel of 6.25 % sweeps most of it (*derived*). With the half travel the last letter loses 0.45 at most at the upper end (*read*).
  - The travel is spread across the scene's whole pass through the viewport (`animation-range: cover`), linear. So the rate is steady wherever the scene can be seen, and both ends of the travel fall where the scene is off screen. There is no stop to see and no ease to tune.
  - The rate is `100 × (1 − 2T / (S + H))` for a travel *T*, a scrollport of height *S* and a scene of height *H*. The lag per 100 px scrolled is what is left.

    | scene (*read*) | *T* each way | rate | lag per 100 px | Oura, the measured case |
    |---|---|---|---|---|
    | title, 1440 × 900, scene 1152 wide and 900 tall | 36 px | 96.0 | 4.0 | 13.5 |
    | title, 390 × 844, scene 844 tall | 12 px | 98.6 | 1.4 | 9.8 |
    | picture in its window, 1440 × 900, scene 704 wide | 44 px | 93.8 | 6.2 | 13.5 |
    | picture in its window, 390 × 844 | 22 px | 96.0 | 4.0 | 9.8 |
    | a figure 480 wide that fills its scene, 1440 × 900 | 30 px | 95.6 | 4.4 | |

  - So glass trails by a third to a half of the reference where a picture moves in its window, and by less where a figure crosses letters. What stays the same from 360 to 1920 is the picture: the travel is a fixed share of the scene's width, so the figure moves the same distance against the type at every width. Whether that is felt is the owner's to say, in motion (OQ-3); a still frame cannot show it.
  - A scene may lower `--depth-lag`. It may not raise it, and it may not set `--depth-travel`.
- **R-9: scroll is the only driver, on the compositor, with no script.** The scene is a named view timeline and the lagging element animates `translate` on it. No listener, observer or frame loop is added, at rest or in motion. No pointer or tilt parallax (*measured*: no hero in the record moves with the pointer). No pin, no scroll snap, no smoothed wheel.
- **R-10: there is no clock.** The only timeline is the scroll position. The wave reads no `--spring-*` and no `--duration-*` and adds neither.
- **R-11: reduced motion is the composition as drawn.** Under `prefers-reduced-motion: reduce` the animation never binds (the discipline of `styles/scroll-driven.css` and `styles/scroll-choreography.css`). Every layer rests at zero offset, and the scene keeps the same height, room included. Nothing changes state, so nothing can cut. That is the split the record found on Vision Pro and SMWS: the cover stays and the travel stops.
- **R-12: an engine without view timelines gets the same still picture, and no script.**

  | Safari | what it shows |
  |---|---|
  | 26 and later | the whole wave (*documented floor for* `animation-timeline: view()`; read in Playwright's build, unread in Safari) |
  | 17.5 to 18 | occlusion whole; no travel. The reduced-motion form |

  - The still form is a finished composition, so the fallback is not a cut and not a lesser page.
  - `useScrollProgress` could drive the travel by script on those versions. It is not used: a listener writing a transform each frame is what the record faults on every site that does it, and `restraint.md`'s ceiling allows no listener.
  - Everything else the sheet uses is under glass's floor of 17.5: grid, `isolation`, `:has()`, the individual `translate`, `lvb`, container query units, `overflow: clip`, `fit-content`.
  - If Safari 26 shows the trailing layer out of step with the page during a fast scroll (OQ-4), the Safari arm is the still picture until it does not.
- **R-13: no entrance.** A scene does not fade, rise or build as it enters the view. It is there.
- **R-14: where it is allowed.** A title and its figure; a figure and its caption; a stage and its readout. Not on body text, a control, a list, a table, a menu, chrome, a dialog or a popover. A view has at most one title or stage scene. Caption scenes may repeat as a set of at most three in one viewport, all at one lag (Oura's row shows three, *read from the strip*).
- **R-15: the three allowed sites are three ruled placements, and a scene writes no geometry.**
  - `data-depth-scene="title"`, `"caption"` or `"stage"` on the scene. The sheet places and sizes each layer in the scene's own width, so the picture is the same picture from 360 to 1920 and its cover is read once, here, not found by hand in each consumer. The first spec was three z-index rungs and about sixty lines of local CSS per page, with the one hard number guarded only by glass's own gate.
  - The page writes where the scene sits, how wide it is, and its type's face. It writes nothing inside the scene but `--depth-figure` (the title figure's size) and `--depth-aspect` (the caption frame's shape).

    | placement | what it draws | read, 360 to 1920, light and dark |
    |---|---|---|
    | `title` | each run of the heading on its own line, set to the end edge. The figure's centre sits on that edge, below the first line: it takes the foot of the last letter above, and the last letters of the line below stand on its body | line behind: 0 to 0.086. Worst letter: 0.36 ("d"), 0.45 ("s" of "Glass"). Front ink on the figure: 0.22 to 0.26 ("glass"), 0.58 to 0.66 ("UI"). Front contrast: 7.2 light, 6.8 dark |
    | `caption` | the figure's frame at `--depth-aspect` (4:3); the caption's plate inside the lower start corner, lapping the frame's lower edge by 1.5rem | plate opaque: 16.2 light, 11.2 dark. Plate `glass` or `veil`: 2.5 to 2.9, fails |
    | `stage` | the name in display type across the top; the instrument below it, its upper edge over the feet of the name's middle letters; the value centred on the instrument | name: 0.14 to 0.16, worst letter 0.44 ("n"). Value: all of its ink on the instrument's face, 16.2 light, 11.2 dark, cover 0 |

  - A title's last line must reach the figure, which is why its lines are set to the end edge: "UI" under "Glass" stands on the figure only because both end together.
  - **Open: the title's line height.** The placement sets the two lines at 0.9. The two engines load different faces on the demo, and in WebKit's the descender of "q" touches the ascender of "l" below it at 360, so the front run reads 1.28 at those pixels: ink on ink, between two lines of one heading. A line height of 1 would clear it and moves every number in the title's row, so it is a re-tune and a re-read, not a patch. The numbers in this table are for the faces read; a consumer's display face with long descenders meets the same thing.
  - A scene is given its width by its parent (a block, a stretched grid or flex item). It is a container, so it cannot take its width from its content: a `.depth` in a shrink-to-fit column has none.
  - The placements are zero-specificity where a consumer may need to differ (the type's size, the figure's size). A scene with no `data-depth-scene` is the bare cell, for a composition glass has not ruled; its cover is then the consumer's to read, by G-COVER's method.

**Counted.**

| | |
|---|---|
| nodes added per scene | 0. One span per run where one heading is split across the figure, and that span is content |
| pseudo-elements | 0 |
| animations per scene | 1, on one property (`translate`) |
| compositor layers kept | 1 per scene, the lagging element (*derived*; a scroll-driven animation is always live) |
| listeners, observers, frame loops | 0 (*read*) |
| layout per frame | 0 (*read*: 1 layout in the whole scroll, at the document, in the still twin too) |
| shadows, gradients, blurs, masks, blends, filters added | 0 |
| clocks | 0 |

## Scope

### The sheet (11.2.0)

`src/styles/depth.css`, beside `scroll-driven.css` and `scroll-choreography.css` and imported after them. It is the whole family. Its custom properties are declared in it, beside their only reader. No file is added under `src/components/` or `src/composables/`: there is nothing for a component to hold and nothing for a composable to compute.

| write | on | meaning |
|---|---|---|
| `class="depth"` | the scene: a `header`, a `figure`, a `section` that is already there | one picture; its children share one cell |
| `data-depth-scene="title"`, `"caption"`, `"stage"` | the scene | the ruled placement (R-15) |
| `data-depth="behind"` | a run of text | it passes behind the figure |
| `data-depth="figure"` | any one element with a body | it is the figure |
| `data-depth="front"` | a run of text, or a plate that holds one | it sits in front of the figure |
| `data-depth-lag` | the figure | the figure trails the page, and its scene keeps the travel's room |
| `data-depth-lag="within"` | the picture inside the figure | the picture trails; the figure's window is still |
| `--depth-lag` | the scene, to lower it | default 0.125 |
| `--depth-figure` | a title's figure | its width. Default `20cqi`; a figure whose box is larger than its body (the Blob) names a larger one |
| `--depth-aspect` | a caption's figure | the frame's shape. Default `4 / 3` |

The sheet as built and read is `src/styles/depth.css` on `bl/depth/proto` at `e4275ac40`. Its rules, in order:

```css
:root {
    /* The travel's share of half the viewport. A scene may lower it. */
    --depth-lag: 0.125;
}

@layer components {
    .depth {
        /* Each way. On the scene, not the root: an unregistered property resolves its
           var() where it is declared, so a root declaration never sees a lower lag. */
        --depth-travel: calc(var(--depth-lag) * min(50lvb, 50cqi));
        display: grid;
        isolation: isolate;
        container-type: inline-size;
        view-timeline: --depth block;
    }

    /* A figure that trails whole keeps its travel's room inside its scene. The
       viewport term alone: it is never less than the travel. */
    .depth:has(> [data-depth-lag]:not([data-depth-lag="within"])) {
        padding-block: calc(var(--depth-lag) * 50lvb);
    }

    /* One cell. */
    :where(.depth) > * {
        grid-area: 1 / 1;
        min-inline-size: 0;
    }

    /* A run inside a heading is not a grid item, so it is positioned to take a z-index. */
    :where([data-depth]) {
        position: relative;
    }

    [data-depth="behind"] { z-index: var(--z-background); }
    [data-depth="figure"] { z-index: var(--z-content); }
    [data-depth="front"]  { z-index: calc(var(--z-content) + 1); }

    /* The window of a picture that trails. */
    [data-depth="figure"]:has(> [data-depth-lag="within"]) {
        overflow: clip;
    }
    [data-depth-lag="within"] {
        position: absolute;
        inset: 0;
        inline-size: 100%;
        block-size: 100%;
        object-fit: cover;
    }

    /* Placement 1: a title, the figure at the end of its lines. */
    .depth[data-depth-scene="title"] {
        /* A figure that crosses letters travels half as far: a letter is small. */
        --depth-travel: calc(var(--depth-lag) * min(50lvb, 25cqi));
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
    }
    :where(.depth[data-depth-scene="title"]) > :where(h1, h2, h3) {
        grid-column: 2;
        margin: 0;
        font-size: 17cqi;
        line-height: 0.9;
    }
    /* Each run is a line, as wide as its word and no wider. */
    :where(.depth[data-depth-scene="title"]) > :where(h1, h2, h3) > [data-depth] {
        display: block;
        inline-size: fit-content;
        margin-inline-start: auto;
        white-space: nowrap;
    }
    :where(.depth[data-depth-scene="title"]) > [data-depth="figure"] {
        grid-column: 3;
        justify-self: start;
        inline-size: var(--depth-figure, 20cqi);
        margin-inline-start: calc(-0.5 * var(--depth-figure, 20cqi) - 1cqi);
        margin-block-start: 16.5cqi;
    }

    /* Placement 2: a figure, its caption on the lower edge. */
    :where(.depth[data-depth-scene="caption"]) > [data-depth="figure"] {
        aspect-ratio: var(--depth-aspect, 4 / 3);
    }
    :where(.depth[data-depth-scene="caption"]) > [data-depth="front"] {
        place-self: end start;
        margin: 0 0 -1.5rem 1rem;
        max-inline-size: 70%;
    }

    /* Placement 3: a stage, its name behind the instrument, its value on it. */
    .depth[data-depth-scene="stage"] {
        justify-items: center;
    }
    :where(.depth[data-depth-scene="stage"]) > [data-depth="behind"] {
        align-self: start;
        margin: 0;
        font-size: 19cqi;
        line-height: 1;
    }
    :where(.depth[data-depth-scene="stage"]) > [data-depth="figure"] {
        inline-size: 78cqi;
        margin-block-start: 11.5cqi;
    }
    :where(.depth[data-depth-scene="stage"]) > [data-depth="front"] {
        align-self: center;
        margin-block: 11.5cqi 0;
        font-size: 14cqi;
        line-height: 1;
    }

    @media (prefers-reduced-motion: no-preference) {
        @supports ((animation-timeline: view()) and (animation-range: cover)) {
            .depth [data-depth-lag] {
                animation: depth-lag linear both;
                animation-timeline: --depth;
                animation-range: cover;
            }
            /* The picture is taller than its window by the travel, each way. */
            .depth [data-depth-lag="within"] {
                inset-block: calc(-1 * var(--depth-travel));
                block-size: calc(100% + 2 * var(--depth-travel));
            }
        }
    }

    /* A far layer moves up less than the page, so it falls behind it. */
    @keyframes depth-lag {
        from { translate: 0 calc(-1 * var(--depth-travel)); }
        to   { translate: 0 var(--depth-travel); }
    }
}
```

- The three rungs are local to the scene (`isolation`), so they meet no other z-index on the page. The figure's rung is `--z-content` because that is what the Blob's wrapper already sets (`src/components/blob/Blob.vue:324`); the two agree instead of competing.
- A run in a title is a block as wide as its word. It was a block as wide as the heading, which laid a 656 by 220 px box over the figure and the paper beside it. It is not `min-content` on the heading: a base rule that lets words break anywhere makes that one letter wide (*read*: an `h2` stacked its letters).
- The scene is not clipped. A figure may bleed past it (the Blob's satellites do), and `restraint.md` says nothing clips. A figure pushed past the scene's end edge does widen the page (*read*: `scrollWidth` 619 against 390); the placements keep the figure inside, and G-FLOW's bite is that push.
- The title's figure is offset by a margin, not by `top`, so the scene's box knows where the figure is and the room of R-7 is true. The cost: a title scene is as tall as the figure's box plus 16.5 % of its width. The Blob's box is about twice its body, so a Blob title is 62.5 % of the scene's width tall, plus the room. A page caps that scene's width to keep it inside one viewport (the harness: 72rem).
- A scene is not a glass surface and must not be made one: a plate is `contain: paint`, which would clip a figure that bleeds. A plate goes in a scene as the figure or as a `front` layer.
- `src/html-attributes.d.ts` already admits every `data-*` attribute on every element and component, so the template needs no typing.
- The sheet's static test (`tests/styles/depth.test.ts`, 10 cases) reads the bans, the token, the two travel formulas, the room rule, the one animated property, the media and support gates, the three rungs and the three placements.

### Three compositions on glass's own pieces

Each is a story in the demo and a cell in the gates. Each is the harness on `bl/depth/proto` (`demo/depth/DepthHarness.vue`), as read. None writes geometry inside its scene.

**1. A title behind and in front of a Blob.**

```vue
<header class="depth hero" data-depth-scene="title">
    <h1><span data-depth="behind">Liquid</span> <span data-depth="front">glass</span></h1>
    <Blob data-depth="figure" data-depth-lag class="hero-blob" :config="blobConfig" />
</header>
```

```css
.hero      { max-inline-size: 72rem; min-block-size: 100svh; margin-inline: auto; }
.hero-blob { --depth-figure: 46cqi; }
```

- Two lines, ending together. The Blob sits at their end: the foot of "d" tucks behind it and "ss" stands on its body. The eye gets both cues from one figure, at the place it finishes each word.
- The two spans are written on one line with the space between them. Vue drops whitespace between elements on separate lines, which made the heading's string "Liquidglass". Its name is "Liquid glass", once; a drag across it selects that, once; a triple click on "Liquid" selects "Liquid" (*read*, both engines).
- The Blob's tone is its config, per theme (R-5): palette stops, and in dark a quiet highlight and rim. Its `color` prop does not tint its body. It rests flat (R-3) and takes no press handler.
- The Blob trails the page: as the hero leaves, it slides down from under the first word. 36 px each way at 1440 and 12 px at 390; the same 3.1 % of the scene at both.

**2. A figure with its caption on a plate.**

```vue
<figure class="depth" data-depth-scene="caption">
    <div data-depth="figure" class="frame">
        <img data-depth-lag="within" src="…" alt="…" />
    </div>
    <Card as="figcaption" data-depth="front" surface="opaque" class="caption">…</Card>
</figure>
```

- The frame is a window and the picture trails inside it. The frame's edge never moves against the caption, so the cover is the same at every scroll position.
- The caption's plate laps the frame's lower edge from inside it, and its text is on the picture's side of that edge. The plate is opaque (R-5). The first spec's frosted plate could not carry the text there, and the cure the prototype took, hanging the plate below the frame by a 10 px lap, put no text in front of the picture at all.
- An image is not marked as the figure itself: the frame is, and the placement gives it its shape. A chart in place of the image takes `data-depth="figure"` on its own root and no lag: a chart is read, and a reading does not drift. A line chart on a clear ground is not a body (R-3), so its caption laps its ground or its Card, not its lines.
- `Card` renders as `figcaption` through `as` (*read*).

**3. A stage: its name behind the instrument, its value on it.**

```vue
<section class="depth" data-depth-scene="stage" aria-labelledby="stage-word">
    <h2 id="stage-word" data-depth="behind">download</h2>
    <Dial data-depth="figure" :value="mbps" />
    <p data-depth="front">{{ mbps }} <abbr title="megabits per second">Mbps</abbr></p>
</section>
```

- The instrument has a face: a disc of the card's tone inside its ring. The name's middle letters lose their feet behind it, and the value stands on it, whole, at every moment (R-6). With a bare ring the name showed through the hole and the value touched nothing.
- The value's markup carries its space and its unit's spoken form: it is read and selected as "412 Mbps" (*read*; it was "412Mbps"). It is a `p`, not an `output`. An `output` is a live region, and a value that changes many times a second would flood a screen reader; a consumer announces the value when it settles, in its own live region.
- Nothing trails (R-7). The instrument's own sweep is the motion.
- `Dial` stands for the consumer's instrument (speedtest's). Glass ships none in this wave.

**Also read, not a composition: a glass Card as a title's figure** (`?card=1`). The word behind it is frosted by the Card's own blur: the sharpness of its ink under the Card falls to 0.21 to 0.43 of what it is with the Card hidden (*read*, Chromium, six widths, light and dark). It reads as a letter under frosted glass, and the letter is lost as a letter, so it counts as covered and R-4 binds it.

### glass.babb.dev

- **The landing page** (`demo/chassis/landing/CatalogLanding.vue`) opens on composition 1. Today its hero is the title "Glass UI" and a blurb on a paper ground. It becomes one title scene: "Glass" behind the Blob, "UI" in front of it, the Blob trailing the page as the catalog rises under it. That string is read: "s" loses 0.45 at most, and 0.58 to 0.66 of "UI" stands on the Blob. The blurb is body text and sits below the scene, plain. The preview cards are links in a grid and take no depth and no lag.
- **What that removes:** nothing is deleted from the page; one figure is added to it. `restraint.md` asks that an addition state its removal, and this one has none. It ships on the owner's word for this page (OWNER-READ, question 2).
- **A story, "Depth"**, under compositions, holds the three compositions with a still twin of each (the reduced-motion form), so the two can be compared without a system setting, and the three amounts of OQ-3 as links.
- **Section landings** (`SectionLanding.vue`) are not changed in this wave. One title scene per view is the rule, and whether each section earns one is a design pass of its own.

## Gates

Read on the prototype, each once RED where a RED exists and once GREEN, with its bite read once. Cells: the three compositions, in Chromium and Playwright WebKit, at 390 × 844 and 1440 × 900, light and dark; G-COVER, G-READ and G-FLOW also at 360, 768, 1024 and 1920 wide. One browser per run, a new context per cell, every run through `guarded`, every WebKit run through `guarded --exclusive webkit`. A scroll is the record's: 100 px wheel steps from the top to the scene's exit, reading `getBoundingClientRect()` at each. "At every place" means that scroll, and also the trailing figure held at −*T*, 0 and +*T* with the scene centred in the viewport.

WebKit cells first read `CSS.supports("animation-timeline", "view()")` with the garbage probe of `supportsCssTimeline.ts`. Where it is false, G-RATE and G-ENDS read the still arm (every layer at 100) and the cell is recorded as the still arm, not as a pass of the travel.

- **G-COVER: occlusion is right at every width and every place.**
  - Each `behind` run paints under the figure and each `front` run over it (a point inside the overlap reads the expected topmost layer by pixel).
  - Ink cover per line of every `behind` run is at most 0.25, per word at most 0.5 and per letter at most 0.5.
  - Ink cover of every `front` run is 0.
  - Each depth is shown (R-5a): a `behind` run's cover is above 0 at the drawn place; at least 0.1 of a `front` run's ink has the figure's paint under it at every place; a plate that holds a `front` run overlaps the figure's box.
  - Every `behind` run with cover above 0 computes a font size of 40 px or more.
  - The figure is a body (R-3): it paints at every point of a grid over the middle quarter of its box. *Unread*: the fold wrote this clause and no run has read it.
  - A glass Card as the figure still blurs: the ink of a run behind it is under half as sharp with the Card shown as with it hidden.
  - Bites: a `transform` on the heading (its runs land on one side); the Blob at twice its size; the stage's instrument with its face removed.
- **G-READ: uncovered text reads, at every place.** At a grid of points on the ink of every run, the run's colour against the pixels under it (the same frame with the run's colour made transparent) is 4.5:1 or more, for `front` runs everywhere and for `behind` runs wherever they are not covered. Bites: the caption taken off its plate; the caption's plate made `glass`; the stock Blob in dark.
- **G-RATE: each layer moves at its rate.** Through the sampled scroll, every text run and every scene reads 100 within 0.5. The lagging element reads `100 × (1 − 2T / (S + H))` within 1, with *T*, *S* and *H* read from the cell, and never under 87.5. With `within`, the window reads 100 and the picture the lag. Bite: `--depth-travel` set by hand to `20lvb`.
- **G-COST: no storm, at 4× CPU.** In a Chromium trace across the scroll: 0 `Layout` events rooted in a scene after the first frame; at most one style recalculation per frame, touching no element but the lagging one; no `Paint` event for a scene's text after the first frame; 0 inline style writes on any node in it (the record's write counter); 0 scroll, wheel, pointer or resize listeners and 0 observers added by the sheet. The same scroll with the lag removed is traced beside it, and the lag adds no more than 1 ms of main-thread time per 100 px step. In WebKit: frame pacing through the same scroll, and `document.getAnimations()` shows one animation per scene, on `translate`. Bite: the lag written as `top`, which the layout and paint counts catch (its main-thread time alone does not).
- **G-ENDS: no cut and no change of rate at either end of the travel.**
  - The lagging element's offset is continuous through the scroll: no step's change exceeds the lag times the step, within 1 px. With the scene wholly below the viewport the offset is −*T*, and wholly above it +*T*, each within 1 px. A scene at the top of a page rests at the offset the formula gives for scroll 0.
  - A figure that trails whole stays inside its scene's box at −*T* and at +*T* (0 px outside), and reads one rate at every step in which any of it is on screen.
  - Bites: `animation-range: contain`; the scene's room removed under a figure as tall as its scene.
- **G-STILL: reduced motion.** Under `prefers-reduced-motion: reduce`: `document.getAnimations()` is empty for the scene; every layer reads 100; the offset is 0; the picture in a window is its window's size; the scene's height is its height with motion; G-COVER and G-READ give the same numbers as at the drawn place without the setting. The same holds with `animation-timeline` support masked off. Bite: the animation declared outside the media gate.
- **G-NAME: the accessible name is read once.** The accessibility tree gives each heading its text once, in reading order, with the split heading as one name ("Liquid glass") and the stage's value with its space ("412 Mbps"). No node in a scene is `aria-hidden` to hide a copy; no two nodes in a scene hold the same string; no node in a scene whose text changes with a running value is a live region. Bite: a second copy of the heading.
- **G-SELECT: selection is sane.** Select-all inside the scene yields each string once, in DOM order. A drag from the first character of the split heading to its last selects the heading's text, once. A triple click on a `behind` run selects that run. Bite: a second copy of the heading, not `user-select: none`.
- **G-FLOW: no horizontal scroll, and the page's height holds.** At every width and every scroll step, `scrollWidth` equals `clientWidth` on the document, and `scrollHeight` does not change through the scroll. Bite: the title's figure pushed past the scene's end edge.
- **G-RESTRAINT: the count.**
  - At most one element with `data-depth-lag` per scene; none is a text run or holds one; none in a stage scene; at most three scenes with a moving layer in any one viewport, and all of them at one `--depth-lag`.
  - At most one title or stage scene in a view.
  - No `.depth` and no `[data-depth]` inside a `p`, a list, a table, a `nav`, a `button`, a field, a dialog or a popover, on the demo's pages.
  - No button, link or element with a press handler inside a figure that a run's box overlaps.
  - The published sheet contains no `mix-blend-mode`, `mask`, `clip-path`, `filter`, `backdrop-filter`, `box-shadow`, gradient, `will-change`, `position: sticky` or `scroll-snap`, and no placement sized in `px`, `vw` or `vi`.
  - Each scene on the demo's pages names a placement, and no rule outside the sheet sets a margin, an inset, a `place-self`, a grid line, a `translate` or a size on a scene's child, other than `--depth-figure` and `--depth-aspect`.
  - A figure in a scene computes no `drop-shadow` and no `box-shadow` that falls on a run.
  - The node count of each composition equals its markup above.
  - With the lag removed, each composition still reads as depth (its still twin passes G-COVER). A layer whose travel changes no pixel of cover or of picture across the scroll is a motion nobody can see, and fails.
  - Bite: a second `data-depth-lag` in one scene.

That is ten gates.

**What has been read after the fold** (`../design/depth/fold.md` has the cells):

| gate | Chromium | WebKit, light |
|---|---|---|
| G-COVER | lines, words, letters, front on the figure, at −*T*, 0 and +*T*: ten cells from 360 to 1920, light and dark, and "Glass UI" at two. The Card's blur at ten. The body clause and the new bites: unread | 1440, 390, 360 and 1920, and "Glass UI" at 1440: line behind 0 to 0.084, worst letter 0.34 ("d") and 0.46 ("s"); front on the figure 0.21 to 0.26 and 0.59 to 0.67; the stage 0.13 to 0.14, worst letter 0.44. The Card's blur is unread: in the face WebKit loads, the Card does not reach the word |
| G-READ | the same cells, at −*T*, 0 and +*T*; `glass`, `veil` and the stock Blob read RED | 7.21 at 1440 and 1920, 5.08 at 390. **RED at 360: 1.28**, and not from the figure: in the face WebKit loads, the descender of "q" touches the "l" of the line below (R-15, open). Caption opaque 16.2; `glass` 2.84, RED |
| G-RATE, G-ENDS | 1440 and 390: title 96.00 and 98.56, picture 93.84 and 95.98, each equal to the derived rate; text 100. The filled scene at ten cells, and its bite RED | the same to the hundredth: 96.00 and 98.56, 93.84 and 95.98; text 100. The filled scene one rate and 0 px outside at four widths; its bite RED |
| G-COST | 1440: 0.24 ms per step over the still twin. 390: 0.96 more in one run and 0.59 less in the next, which is the machine's noise and wants a quiet run. 1 layout, at the document. 0 writes, 0 listeners. Bite: 24 layouts, RED | not re-read (pacing only, as before) |
| G-STILL | reduced at 1440 and 390, masked at 1440: 0 animations, offset 0, same height | reduced and masked at 1440: the same |
| G-NAME, G-SELECT | "Liquid glass", "412 Mbps", drag and triple click, every cell | the same strings, every cell |
| G-FLOW | every cell equal; the bite RED at every width | every cell equal; the bite RED |
| G-RESTRAINT | the counts as built: elements 5, 3 and 7. The new clauses are written and unread as gates | |

## Consumer half

Nothing changes for a consumer that does not write the class. Glass tells atlas of the new sheet at booking and at publish; no default it consumes moves.

- **speedtest:** its stage is the `stage` placement with its own dial as the figure. The dial needs a face where the name passes behind it. Its value stays in front, is not a live region while a test runs, and is announced when it settles. Nothing in its stage trails.
- **slides:** a title slide is a `title` scene. A deck does not scroll, so its scenes are still; the cover is the whole effect.
- **color, fourier, keyframes, daraksha:** each has one figure that earns a title scene (the picker's gamut, the epicycle field, the curve, the vine). Each is that repo's design pass at its own repin, not a patch from here. A figure that is lines on a clear ground is given a ground first (R-3).
- **atlas and Gregg's figures:** the `caption` placement, with an opaque plate. A chart is a figure with no lag.
- **Any consumer:** pick a placement and write no geometry. Give the scene its width. Put nothing between the scene and its runs that fades, transforms or names a view transition. A figure under a run is not a button.

## Open questions

All are the owner's, and `../design/depth/OWNER-READ.md` puts them to him.

- **OQ-1.** The weave is by word, not by letter (R-1). Default: ship it so. A letter both behind and in front of one figure needs a second copy of the text or a mask, and each costs what R-1 lists.
- **OQ-2 (by capture).** The landing page takes the Blob title. Default: yes, as composition 1, with "Glass" behind and "UI" in front.
- **OQ-3 (in motion, not by capture).** The amount. Default: the token as it stands, which is 4.0 px of lag per 100 scrolled for the title on a desktop and 1.4 on a phone, and 6.2 and 4.0 for a picture in its window. Beside it: half of that, and none. More than that in a title is not on offer without giving up R-4's letter. More in a window is: the picture has no letters to cross, and the reference is twice as much.
- **OQ-4 (one look at the close, on a device).** Safari itself, 26 and one earlier version if a device is at hand. The travel runs on 26; the earlier one shows the still picture and nothing is missing from it. And one thing to look for on an iPhone: a fast flick, eye on the Blob's edge against the letters. If the Blob shivers against the words, the layer is a frame behind the page, and Safari ships the still picture.
- **OQ-7.** The Blob rests flat in a scene. Default: yes. `fold-chromium-1440-light-shadow.png` is the same title with the Blob's own shadow kept.
- **OQ-8.** The dark Blob in a title is a deep, quiet bead: its highlight and rim are turned down so light ink can cross it. Default: yes. The other cure is to keep the lit Blob and let no `front` run cross it in dark, which is no depth in dark.

Closed by the prototype: Playwright WebKit has view timelines (it was OQ-5); the stock Blob carries a `front` run in light and not in dark, and the cure is its config (it was OQ-6).

## Cut on the last pass

Read once more as the owner would, these were in the design and are out, because none of them says which thing is nearer: a second copy of the heading blended over the first; a mask on the Blob's silhouette; a blur scrim under front text; a frosted plate under a caption on a picture; a pinned stage; text that trails the page; a near layer that leads it; a second rate; a lag on a stage's instrument; pointer and tilt parallax; a `<Depth>` component and a `useDepth` composable; a script fallback for older Safari; an entrance for the scene; a shadow under the figure to lift it, and the Blob's own; a `--depth-travel` a consumer can raise.
