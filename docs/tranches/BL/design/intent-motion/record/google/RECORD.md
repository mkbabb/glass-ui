# Google: the motion record (O-278, recorder 1)

Recorded 2026-11-12 by an Opus seat (claude-opus-5-5). Every number below was read from the running page. Most come from `document.getAnimations()` (keyframes, duration, easing, delay, fill, composite) and from the computed `transition-*` of each element that changed. The rest come from a per-frame loop on `requestAnimationFrame` that diffs computed styles while the pointer moves. The scripts that produced them live in `scripts/`, and the raw readings in `data/` (`chat-mech.json`, `chat-mech2.json`, `probe-m3.json`, `witness-*.json`).

**How the strips were taken.** Each strip uses the same clock. The control was triggered, then every running animation (CSS animations, CSS transitions and Web Animations, pseudo-elements included) was paused and seeked to t = 0, step, 2 x step and so on, with one element screenshot per seek. So the frames are evenly spaced in animation time and independent of capture cost. Where a change is a cut there is nothing to seek. For those the strip is a pair: the frame before and the frame two `requestAnimationFrame` ticks after. Each strip file name gives its step.

**Privacy.** Chat was driven in its own tab on the shared signed-in Chrome (CDP attach, `guarded --light`). The tab was closed afterwards; no other tab was touched and no sign-in page was met. The only things captured are the header icon bar, its tooltip and the panel header that replaces the bar on selection. The tooltip crop has everything outside the tooltip and button rectangles blanked. No message, name, avatar or conversation text was read, stored or captured. Button labels ("Shared", "Thread", "Board", "Start a video call") are the controls' own `aria-label`s. Opening the Board panel in that tab did not persist: a fresh load shows every panel closed (`scripts/chat-state.mjs`).

**Safari column.** "WebKit: same" means the technique was rebuilt in a bare page and run in Playwright's WebKit build (`scripts/engine-witness.mjs`, under `guarded --exclusive webkit`). The test is whether an animation object exists and the mid-travel value lies strictly between the ends. Playwright WebKit is not shipping Safari (see the memory note on the two giving opposite results once). Shipping Safari is unmeasured here, and the version noted is the documented support floor.

## 1. Google Chat: the header icon bar (the owner's frame)

### Anatomy at rest

The bar is two grey plates.

- **Left plate.** The video-call button, 48 x 48, with `border-radius: 16px 0 0 16px` and background `--gm3-sys-color-surface-container` (#f0f4f9).
- **Right plate.** `.sYBKHd`, 128 x 48, with `border-radius: 4px 16px 16px 4px`, holding three 40 x 40 icon buttons: Shared (`folder`), Thread (`spool`) and Board (`keep`, the pin).

Each of the three is **12 DOM nodes**: wrapper, two hover-scope divs, span, button, focus ring span, state-layer span, icon box, glyph, touch target, offscreen a11y label and the plate. The bar is 58 nodes, and the video button 13.

**The glyph.** A ligature in the variable font "Google Symbols Subset", 20 px. At rest it is `font-variation-settings: "FILL" 0`, weight 400, `#444746`. The pin is set `rotate: 45deg` at rest and on hover; it never turns.

**The plate behind each icon.** `.GVOJ8d` is an absolutely placed 40 x 40 div, `z-index: 0`, with a `clip-path: path()` that is the button's own shape. It is always in the DOM, transparent at rest. Each side-panel app has its own shape and its own pair of colours, set as custom properties on the wrapper class:

| button | shape (clip-path) | plate (light / dark) | glyph on hover |
|---|---|---|---|
| Shared | four-lobed clover, `path("M 4.62159 10.7336 C 3.37899 2.39525 12.9911 -3.15429 19.591 2.091 L 20.6822 2.95825 …")` | #eedcfe / #5629a4 | #5629a4 |
| Thread | slanted capsule (a 45 degree pill), `path("M 5.30941 35.2599 C -1.38959 28.5609 … Z")` | #c2e7ff / #004e5d | #004a77 |
| Board | rounded pentagon, 36 x 34 inside the 40 box and offset (2, 2), `path("M 13.199 1.60193 C 16.0438 -0.532407 19.9562 -0.532409 22.801 1.60193 L 27.4046 5.05573 …")` | #ffdcc3 / #753403 | #753403 |
| (others in the sheet) | rounded square `path("M 12 0 H 28 C 34.627 0 40 5.373 40 12 V 28 …")`, a 12-scallop "sunny" star, a green variant of the clover | pinks #ffd8ef, blue #d3e3fd, green #beefbb | |

The full paths are in `data/chat-mech.json` (`rest`, nodes 28, 42, 54).

Strip `strips/chat-bar-states.png` shows rest, hover on Board, and the panel header that replaces the bar once Board is selected.

### The motions

| # | name | trigger | what changes | properties | in: duration, easing | out: duration, easing | delay | DOM nodes added | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | plate grows in | pointer enters (or `:focus-within`) | the shaped plate takes its colour and turns up from small | `scale` 0.8 to 1, `transform: rotate(-45deg)` to 0, `opacity` 0.75 to 1, `background-color` transparent to the button's colour | 500 ms CSS `@keyframes scale-and-rotate-right`, `ease` per segment. Keyframes: 0% {scale .8, opacity .75, rotate -45deg}, 66% {scale 1, opacity 1}, 100% {rotate 0}. Scale and opacity land at 330 ms; the turn runs to 500 ms. | **cut**: background to transparent in one frame, no animation | 0 | 0 (the plate is always there) | keyframes on compositor channels over a `clip-path: path()` node; colour by custom property per button; `@media (prefers-reduced-motion: reduce)` sets `animation: none` | same: CSSAnimation, mid value between the ends (W1) |
| C2 | glyph fills | same | outline to filled, heavier, coloured | `font-variation-settings` "FILL" 0 to 1, `font-weight` 400 to 500, `color` #444746 to the plate's detail colour | **cut** (no transition on `.aljsS`) | **cut** | 0 | 0 | variable icon font axis flip | not applicable (a cut); the tween form is W3 |
| C3 | video state layer | pointer enters the video button | a faint layer over the grey plate | `::before` `opacity` 0 to 0.08 | 75 ms `linear` | 75 ms `linear` | 0 | 0 (pseudo-element) | CSS transition on a pseudo-element | not measured (plain opacity transition) |
| C4 | press ripple | pointer down on Shared | a soft disc grows from the press point over the plate | `::after` `transform` scale 1 to about 11.4 (translate 16, 16 to the press point), `opacity` 0 to 0.1 | scale: 450 ms Web Animation, `cubic-bezier(0.2, 0, 0, 1)`, fill forwards. Opacity: 105 ms `linear` transition. | release: opacity 250 ms `linear`; scale holds | 0 | 0 | `element.animate(…, {pseudoElement: '::after'})` on a `radial-gradient(closest-side, c max(100% - 70px, 65%), transparent 100%)` layer, plus an opacity transition; `@starting-style` keeps the layer at 0 opacity on first paint | same: WAAPI on `::after`, mid value between (W9) |
| C5 | keyboard focus ring | Tab onto Shared | a ring swells to 8 px, then settles to 3 px | `box-shadow: 0 0 0 Npx` on `.XjoK4b` (display none to block) | `gm3-focus-ring-outward-grows` 150 ms, then `…-shrinks` 450 ms (delay 150), both `cubic-bezier(0.2, 0, 0, 1)` | **cut** (display none) | 0 | 0 | keyframed `box-shadow` spread (paint, not compositor); PRM sets `animation: none` | not measured |
| C6 | tooltip | pointer rests on Board | a dark 4 px-radius label above the button | inner `.ne2Ple-z59Tgd`: `opacity` 0 to 1, `transform: scale(0.8)` to `scale(1)` | **300 ms show delay** (`data-tooltip-show-delay-ms="300"`), then 150 ms `cubic-bezier(0, 0, 0.2, 1)` on both | 75 ms `opacity`, `cubic-bezier(0.4, 0, 1, 1)`, no scale; hide delay 0; node removed after | 300 in, 0 out | 3 (root, body, text), built on each show | CSS transitions on a `position: fixed` node | same: CSSTransition on transform, mid value between (W5) |
| C7 | select Board | click | the bar gives way to the panel header; the pin's plate becomes a tonal pill | ICON button `display: none`; plate `clip-path` path to `circle()`; right plate background to transparent; video button `border-radius` 16 0 0 16 to 16 on all corners; the bar moves about 450 px left | radius: 350 ms `cubic-bezier(0.27, 1.06, 0.18, 1)` (a 6 % overshoot). Everything else: **cut**, including the bar's move, which is layout. | (reverse not captured; the icon button is hidden once open) | 0 | the panel header (tonal "Board" pill, expand, close) | M3 icon-button shape tokens (`--gm3-icon-button-standard-*-container-shape-*`) on `border-radius` transitions; `clip-path` swap between unlike shapes is discrete | path to `circle()`: discrete in both engines (W8) |

Strips:

- `chat-hover-shared.png`, `chat-hover-thread.png`, `chat-hover-board.png`: C1 and C2, 0 to 500 ms by 50 ms.
- `chat-out-shared.png`, `chat-out-board.png`: the hover-out cut, held then the next frame.
- `chat-hover-video.png`: C3, 0 to 75 ms by 15 ms.
- `chat-press-shared.png`: C4, 0 to 450 ms by 45 ms.
- `chat-focus-shared.png`: C5, 0 to 600 ms by 50 ms.
- `chat-tooltip-enter.png`: C6, 0 to 150 ms by 18.75 ms, outside blanked.
- `chat-select-board.png`: C7, the panel header 0 to 400 ms by 80 ms.

### What each one says, and why it feels light

- **C1.** "This opens a thing of its own": the shape and colour are the app's identity, so hover names the destination before the click. It feels light because one node does it, and the plate starts at 75 % opacity and 80 % size. It is already nearly there on the first frame and only settles, so it never reads as a delay.
- **C2.** "Engaged": fill and colour confirm the hover. It feels light because nothing moves, but it is a cut both ways.
- **C3.** "Pressable": an 8 % veil. It feels light because it is barely there and over in 75 ms.
- **C4.** "Received, here": the disc grows from the finger. It feels light because only opacity 0.1 and a scale move, and the curve front-loads the travel: 90 % of the scale is spent by about 110 ms.
- **C5.** "You are here": the ring swells, then relaxes to its resting width. It feels light because the swell is 150 ms and the settle carries the weight.
- **C6.** "This is called Board": it waits 300 ms so a passing pointer never raises it, grows from 0.8 as it fades, and leaves in half the time. It feels light because the exit is faster than the entrance and drops the scale.
- **C7.** "Board is now open": the neighbour's corner rounds off with a small overshoot as the group separates. It feels heavy where it is not tweened: the bar jumps by layout, the plate cuts to a circle, and the group's grey cuts away.

### What the owner's frame shows, read against the mechanism

The frame is C1 at rest after 500 ms: the peach pentagon, the filled brown pin.

The "grow and morph" he saw is the plate: it scales from 0.8 and turns 45 degrees into place. The pentagon's point swings up from the left. The glyph does not grow or morph; it flips FILL and weight in one frame.

On leave, **nothing animates**. Plate colour, fill and colour all cut back in one frame, on every button. Measured three times: `chat-mech.json` timelines, and the `tooltipOut` and `pressRelease` runs in `chat-mech2.json`. By the law of `motion-canon.md` P0 (an exit is an animation too, never a cut), Google's own bar fails on the way out. So this study takes the enter and supplies the exit.

## 2. m3.material.io: the site's own navigation rail and controls

The Expressive pages (`/styles/motion/overview`, `/styles/shape/overview-principles`, `/components/buttons`, `/components/icon-buttons`) carry their shape morphs and springs as **videos**. The probe found no live morphing component on those pages: the only animating controls were the site's own chrome. So that chrome is what is recorded here, and the videos' content is not claimed as mechanism. The site's chrome is the same on all four pages (`data/probe-m3.json`).

Rail item anatomy: an `<a>` (80 x 60) holding a `span.google-symbols` (the icon box, 56 x 32, which also paints the hover plate) and a `div.label`. **3 DOM nodes**, plus one `::before` for the active pill.

| # | name | trigger | what changes | properties | in | out | delay | DOM nodes added | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| M1 | rail glyph thickens | pointer enters a rail item | the icon gets heavier, the label gets bolder without widening | icon `font-variation-settings` "wght" 400 to 600 ("opsz" 24 kept); label "GRAD" 0 to 50; text colour #4d4256 to #1c1b1d | 200 ms `cubic-bezier(0.2, 0, 0, 1)` on both axes | 200 ms, same curve | 0 | 0 | CSS transition of `font-variation-settings` with **the same axis list at both ends**, so it interpolates; GRAD changes weight without changing advance width, so the label never reflows | same: interpolates when the lists match (W3); cuts when they differ (W4) |
| M2 | rail hover plate | same | a grey stadium behind the icon | `background` on the 56 x 32 icon box | **cut** (no transition on background) | **cut** | 0 | 0 | plain `:hover` background | not applicable |
| M3 | colour | same | text and icon darken | `color` | **cut** (`transition: all 0s` on the link) | **cut** | 0 | 0 | | not applicable |
| M4 | active pill grows | click a rail item (route change) | a lavender stadium spreads out from the centre over the grey plate | `::before` `transform: scaleX(0.32)` to `scaleX(1)`, `opacity` 0 to 1; 56 x 32, `border-radius: 100px`, #dcdaf5 | 200 ms `linear` on both | 200 ms `linear` (the item it leaves) | 0 | 0 (pseudo-element, always present at opacity 0) | horizontal scale from 0.32 on a pseudo-element, the M3 navigation "active indicator"; compositor only | same: CSSTransition on transform, mid 0.66 (W10) |
| M5 | active glyph fills | same | the icon becomes filled | "FILL" added: `"wght" 600, "opsz" 24` to `"FILL" 1, "wght" 600, "opsz" 24` | **cut** in practice. The transition is declared, but the axis lists differ, so the engine flips it (the running CSSTransition's keyframes read `normal` to `normal`) | | 0 | 0 | | W4: cuts in both engines |
| M6 | section-link anchor | hover a heading | a link icon fades in beside it | `opacity` 0 to 1 | 200 ms `cubic-bezier(0.2, 0, 0, 1)` | 200 ms, same | 0 | 0 | opacity transition | not measured |
| M7 | resource menu state layer | hover the "Resources" select | the M3 state layer | `::before` `opacity` | 150 ms `cubic-bezier(0.4, 0, 0.2, 1)` | 150 ms, same | 0 | 0 | | not measured |

Strips:

- `m3-rail-hover.png`: M1 on "Develop", 0 to 200 ms by 40 ms. The plate is already there at frame 0, which is M2's cut; the glyph's weight rises across the frames.
- `m3-rail-select.png`: M4 on "Components", 0 to 200 ms by 40 ms.
- `m3-rail-states.png`: rest, hover, active.

### What each one says, and why it feels light

- **M1.** "This one is under you": the glyph and label gain weight in place. It feels light because nothing moves or resizes. A variable axis is the cheapest possible tween: no new node, no layout, since GRAD keeps the width.
- **M2 and M3.** Hover by colour only, cut. They are the counter-example to the law inside the same component.
- **M4.** "You are here now": the pill widens from a third of its width at its own centre. It feels light because the travel is short (scaleX from 0.32, not 0) and it is one layer that was already there. The linear curve is the one weakness: there is no settle.
- **M5.** "Selected": a fill that should tween and does not, because the rest state omits the FILL axis.

## 3. fonts.google.com/icons

The page's rail repeats the m3 rail (M1 and M4): `::before` opacity, and icon `font-variation-settings` 200 ms `cubic-bezier(0.2, 0, 0, 1)` in and out.

Its "Fill" chip (a 52 x 32 toggle, **14 DOM nodes**) is a Material Web control. The state layer on hover is `::after` `background-color` 75 ms `cubic-bezier(0.4, 0, 0.2, 1)`, plus a second `::after` with `opacity` 75 ms `cubic-bezier(0, 0, 0.2, 1)`. Out takes the same 75 ms. The category filter chips and expansion headers in the side panel have no hover motion at all.

(The icon grid itself and the Fill, Weight, Grade and Optical-size controls' effect on it: see 3a, below.)

## 4. Two product pages: store.google.com and google.com/chrome

Raw readings are in `data/probe-public.json`, and the detail strips in section 4a.

| # | name | where | trigger | what changes | properties | in | out | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 | header icon tint | store, Search / cart icons (24 x 24 svg, 5 to 9 nodes) | hover | grey icon turns Google blue | `color` and `fill` #444749 to #0b57d0 | 200 ms `cubic-bezier(0.4, 0, 0.2, 1)` | **80 ms `ease-out`** | 0 | 0 | colour transition on the svg and its paths | not measured (colour transition) |
| S2 | "Find a Store" | store header link (85 x 48, 6 nodes) | hover | a veil behind the label; icon and text tint blue | state layer `background-color` to rgba(25, 28, 29, 0.08): **cut**; `fill` 200 ms `cubic-bezier(0.4, 0, 0.2, 1)`; `outline-width` the same | as listed | 80 ms `ease-out` | 0 | 0 | mixed: the plate cuts in, the tint tweens | not measured |
| S3 | apps grid button | store, "Google apps" (40 x 40, 4 nodes) | hover | circular state layer | `::before` `opacity` 0 to 0.08 | 300 ms `ease-out` | 300 ms `ease-out` | 0 | 0 | pseudo-element opacity | not measured |
| S4 | "Sign in" | store header (85 x 40, 2 nodes) | hover | the button lifts: a two-layer shadow appears, plus a veil | `box-shadow` none to `0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)`: **cut**; `::before` `opacity` 500 ms `ease-out` | as listed | 500 ms `ease-out` (veil); shadow cut | 0 | 0 | | not measured |
| K1 | top nav pills | google.com/chrome ("AI innovations", "safety" and so on; 1 to 3 nodes) | hover | a pale stadium fills in behind the label, text darkens | `background-color` transparent to #f8f9fa, `color` | 300 ms `ease` | 300 ms `ease` (symmetric) | 0 | 0 | colour transitions on the link itself | not measured |
| K2 | carousel arrows | google.com/chrome (56 x 56 svg buttons) | hover | nothing | | | | | 3 | | |

### What each one says, and why it feels light

- **S1.** "Go": the icon takes the brand blue. It feels light because the leave (80 ms) is less than half the arrival (200 ms), so the page lets go at once. This is the asymmetry the Chat tooltip also uses (150 in, 75 out).
- **S2 and S4.** "Pressable" and "raised". These are heavier than they should be because their plate and shadow cut in while the tint tweens beside them: two clocks on one control.
- **S3.** "Pressable": an 8 % veil over 300 ms.
- **K1.** "Here": the plate fades in and out on one symmetric 300 ms ease. It is the plainest complete tween in the set: one node, one property pair, in and out.

## 5. Engine witness: does Safari's engine run the same technique?

`scripts/engine-witness.mjs` rebuilds each measured technique in a bare page. It triggers each one, pauses the resulting animations, seeks to mid-travel and reads the computed value.

- Chromium: headless shell 149.0.7827.55.
- WebKit: Playwright WebKit 26.5, under `guarded --exclusive webkit`.

Raw readings: `data/witness-chromium.json`, `data/witness-webkit.json`. Both engines gave the same numbers to the sixth decimal on every case.

| W | technique (from) | mid-travel reading | Chromium | WebKit | shipping Safari floor (documented, not measured) |
|---|---|---|---|---|---|
| W1 | keyframes on individual `scale` plus `transform: rotate()` plus `opacity` over a `clip-path: path()` node (C1) | scale 0.960 at 165 ms | tweens | tweens | `scale` property 14.1, `clip-path: path()` 13.1 |
| W2 | `clip-path: path()` holds while its node animates (C1) | path unchanged | holds | holds | 13.1 |
| W3 | `font-variation-settings` transition, same axis list at both ends: `"FILL" 0, "wght" 400` to `"FILL" 1, "wght" 600` (M1, the tween C2 lacks) | `"FILL" 0.878, "wght" 575.6` at 100 ms | tweens | tweens | 11 |
| W4 | the same transition with unlike lists: `"wght" 400, "opsz" 24` to `"FILL" 1, "wght" 600, "opsz" 24` (M5) | end value at once | **cut** | **cut** | |
| W5 | tooltip `opacity` plus `transform: scale(0.8)` transition (C6) | scale 0.968 at 75 ms | tweens | tweens | all |
| W6 | `border-radius` transition on the overshooting `cubic-bezier(0.27, 1.06, 0.18, 1)` (C7) | 15.82 px of 16 at 175 ms | tweens | tweens | all |
| W7 | `clip-path` path to path with **the same command list** (a rounded square to a near-circle) | intermediate control points | **morphs** | **morphs** | 13.1 |
| W8 | `clip-path` path to `circle()` (C7) | end value at once | **cut** | **cut** | |
| W9 | `element.animate(…, {pseudoElement: '::after'})` scale (C4) | scale 9.78 at 225 ms | tweens | tweens | 16.4 (WAAPI `pseudoElement`) |
| W10 | `::before` `scaleX(0.32)` to 1 plus `opacity` transition (M4) | scaleX 0.66 at 100 ms | tweens | tweens | all |
| W11 | `@starting-style` entry fade | opacity transition on first frame | yes | yes | 17.5 |
| W12 | `CSS.supports`: `corner-shape: squircle` | | yes | **no** | not in Safari |
| W13 | `CSS.supports`: `d: path()` (CSS property for an SVG path) | | yes | **no** | not in Safari; animate the `clip-path` or the SMIL/attribute instead |
| W14 | `linear()` easing | | yes | yes | 17.2 |

Three things follow for glass-ui:

- **A glyph tween is free in both engines** when the rest and active `font-variation-settings` name the same axes in the same order (W3). Declaring `"FILL" 0` at rest is the whole cure for M5's cut and for the cut that C2 would become if we copied it.
- **A plate morph is free in both engines** when the two `path()` shapes share one command list (W7). Google's own selected state (C7) cuts because it swaps to `circle()` (W8). The pentagon at rest and a circle when selected can morph, if the circle is written as a path with the pentagon's command count.
- `corner-shape` and the `d` property are Chromium-only (W12, W13). A shaped plate that must run in Safari is a `clip-path: path()`, as Google ships it.

## 3a. fonts.google.com/icons: the icon grid

Each grid cell is a `<button>`, 112 x 126 and **4 DOM nodes**, with a 48 px glyph that has no transition (`transition: all 0s`). At rest the glyph is `font-variation-settings: "FILL" 0, "GRAD" 0, "opsz" 24, "wght" 400`, so the cell names all four axes even at rest, which is the W3 precondition.

| # | name | trigger | what changes | properties | in | out | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | grid cell plate | hover a cell | an 8 px-radius grey plate behind glyph and name | `background-color` white to `color(srgb 0.12 0.12 0.12 / 0.08)` | **cut** (no animation found; the change lands within one frame, 4 ms to 29 ms) | **cut** | 0 | 0 | plain `:hover` | not applicable |
| F2 | glyph on hover | same | nothing: no axis moves on hover | | | | | | | |

Strip `fonts-cell-cut.png`: rest, then hover.

Not recorded: the side panel's Fill, Weight, Grade and Optical-size controls. The script looked for a "Fill" button and a `[role=slider]`, found neither under those names, and recorded nothing (`data/fonts-icons.json`, `fillFound: 0`). So how a grid glyph responds when an axis control changes is **unmeasured**. The site's own rail (section 3) is the measured case of a glyph-axis tween on this site.

## 4a. Product-page strips

- `store-apps-hover.png`: S3, 0 to 300 ms by 60 ms.
- `store-findstore-hover.png`: the in-page "Find a Store" link (152 x 48, 2 nodes), whose `color` transitions 200 ms `cubic-bezier(0.4, 0, 0.2, 1)` in and 200 ms out. Unlike the header icon in S1, this one is symmetric. The strip runs 0 to 200 ms by 40 ms.
- `chrome-nav-hover.png`: K1, 0 to 360 ms by 120 ms. That page also runs ambient keyframes on its hero heading pills, unrelated to hover: `labelSlideOut` 300 ms after a 2000 ms delay, and `green/blue/red/greyColorChange` at 500 ms `linear`. These were seen in `getAnimations()` during the hover and are left out of the table.

## 6. Reading the record for glass-ui (for the analyse seat; this recorder proposes nothing beyond it)

Across the four surfaces, the motions Google gives intent with are few, and each is one property family on one existing node:

1. **A shaped plate that grows in.** The plate is a node that is always present (C1), colour by custom property, with a 500 ms keyframe of scale 0.8 to 1, rotate -45 to 0 degrees and opacity 0.75 to 1. Chat's shape is the app's identity.
2. **A glyph that gains weight or fill.** This is a variable-axis tween (M1 in both engines, W3), 200 ms `cubic-bezier(0.2, 0, 0, 1)`, no node added, no layout.
3. **An indicator that widens from its centre.** `scaleX(0.32)` to 1 on a pseudo-element (M4), 200 ms.
4. **A tooltip that waits, grows from 0.8 and leaves faster.** 300 ms show delay, 150 ms in, 75 ms out (C6).
5. **Faster out than in** where Google bothers to tween the out: C6, S1 (200 in, 80 out).

Where Google fails the owner's law, it fails the same way each time: **the leave is a cut** (C1 and C2 on every Chat icon; M2, M3 and M5; F1; S2's plate and S4's shadow), and **a selection swaps unlike shapes or relocates by layout** (C7). The cures are already shown to work in both engines:

- give the exit its own transition (C6 shows the shape of one);
- keep the rest and active axis lists identical so FILL tweens (W3 against W4);
- write the selected shape as a `path()` with the same command list so it morphs (W7 against W8).

Costs as measured:

- **DOM.** Every motion above adds 0 nodes at interaction time, except the tooltip, which builds 3.
- **Compositor.** The plate keyframe, the ripple, the pill and the tooltip run on compositor channels (transform, scale, opacity).
- **Paint.** The glyph-axis tween is a text re-raster per frame, the focus ring's `box-shadow` spread is paint, and the colour fades are paint. None of these is layout.
- **Frame time.** No frame-time reading was taken: this seat recorded mechanism, not performance.

On restraint: Google's bar does not stack shading. There is one flat plate per control, no shadow on hover except the store's Sign in button, no gradient except the ripple's own radial falloff, and nothing moving at rest except the Chrome page's hero.

## Scripts

All scripts are in `scripts/`, and every run went through `~/.claude/guard/guarded`:

| script | what it does | run as |
|---|---|---|
| `chat-explore.mjs`, `chat-explore2.mjs` | locate the bar | CDP attach to :9223, `--light` |
| `chat-mech.mjs`, `chat-mech2.mjs` | structure, rules, per-frame timelines for hover, press, focus, select and tooltip | CDP attach to :9223, `--light` |
| `chat-tooltip.mjs`, `chat-tooltip2.mjs` | find the visible tooltip and its enter strip | CDP attach to :9223, `--light` |
| `chat-strips.mjs` | seeked frames | CDP attach to :9223, `--light` |
| `chat-state.mjs` | panel state read; `--restore` undoes it | CDP attach to :9223, `--light` |
| `probe-hover.mjs` | generic per-frame hover probe | headless shell |
| `probe-detail.mjs` | rest against hover diff plus seeked strip | headless shell |
| `m3-select.mjs` | the m3 active-pill strip | headless shell |
| `fonts-icons.mjs` | the icon grid | headless shell |
| `engine-witness.mjs` | the W table | Chromium headless shell, and WebKit under `--exclusive webkit` |
| `compose.py` | builds the film strips | |

Frames were staged in the session scratchpad. Only the composed strips are kept here.

