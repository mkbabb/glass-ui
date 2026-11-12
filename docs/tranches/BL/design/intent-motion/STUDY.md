# Intent-first motion: the study (O-278, analyst)

Written 2026-11-12 by the analyst seat (claude-fable-5-2). No browser was launched. Everything here is read from the three records, their strips, the census and glass-ui's source on master at `a7e0337c5`.

Sources, and how they are cited:

- **G** = `record/google/RECORD.md` (rows C1 to C7, M1 to M7, S1 to S4, K1, F1, and the engine table W1 to W14).
- **A** = `record/apple/RECORD.md` (rows G1 to G8, L1 to L3, B1, S1, S2, K1 to K5, and sections 6 to 10). Apple and Google both have rows named K1, S1 and so on, so each citation carries its letter: "A K1" is Apple's store card, "G K1" is Chrome's nav pill.
- **R** = `record/refs/RECORD.md` (rows E1 to E9, R1, F1 to F7, K1 to K5 for keyframes, and section 7 for the authors' words).
- **CENSUS** = `CENSUS.md`. Its verdicts are readings of source at `4b130555c`, not frames.
- Source lines are `src/…:line` in glass-ui.

"Design class websites" is read, as R §2 reads it, as emilkowal.ski, rauno.me, family.co with benji.org/family-values, m3.material.io and Apple's HIG. No other candidate in the records has a stronger claim; joshwcomeau.com is the most cited technique author and was not recorded.

Three limits hold for every number below:

1. **Shipping Safari is unmeasured.** Each record ran Playwright's WebKit build, which is not Safari. Version floors are the documented ones.
2. **No frame time was taken** for any technique (G §6 says so; R took none). The only cost readings are Apple's Chromium layout and style counts (A §1, §4, §5). Every frame-time budget in section 5 is a target for the prototype seat to measure, not a finding.
3. **iOS 27 and macOS 27 themselves were not recorded.** What stands in for "the newest glass" is apple.com as served and the HIG text. The HIG has no iOS 27 or macOS 27 page; its Materials and Motion pages were last changed 9 September 2025 (A §6).

## 0. The second pass: what was struck

The first pass wrote what each source does. The second went back with the numbers. These claims did not survive, and the sections below are written without them.

| Claim | Where it was made | What the numbers say |
|---|---|---|
| The Chat icons are SVGs that grow and morph. | the owner's first reading of the frame | The plate is a `div` with a `clip-path: path()`; the glyph is a ligature in a variable icon font (G §1). The plate grows (scale 0.8 to 1) and turns 45 degrees; its shape never changes. The glyph does not grow or morph: its fill and weight cut in one frame (G C2). In all three hover strips the glyph is already filled in the first frame. What reads as a morph is a non-round shape turning as it grows. |
| The Chat hover animates "in and out". | the owner's message | In only. On leave the plate, fill and colour cut back in one frame on every button, measured three times (G §1, strips `chat-out-board.png`, `chat-out-shared.png`). |
| The neighbour's corner rounds off "with a 6 % overshoot" on select. | G C7 | The curve is `cubic-bezier(0.27, 1.06, 0.18, 1)`. Its peak is 1.0006, an overshoot of 0.06 %, which nobody can see. G's own mid-travel reading (15.82 of 16 px at 175 ms, W6) agrees with the curve. The strip `chat-select-board.png` does not show the corner at all; it shows the panel header, where the only change is a grey disc arriving behind the close button. |
| The ripple spends "90 % of the scale by about 110 ms". | G C4, "why it feels light" | On `cubic-bezier(0.2, 0, 0, 1)` over 450 ms the curve is at 60 % at 110 ms and reaches 90 % at about 243 ms. G's own reading (scale 9.78 of 11.4 at 225 ms, W9) is 84 %. The ripple is front-loaded, but by half as much as stated. |
| "Faster out than in" is Google's habit. | G §6, item 5 | Two cases: the tooltip (150 in, 75 out, C6) and the store's header icon (200 in, 80 out, S1). Six of Google's tweened hovers leave on the same clock they came in on (C3 75/75, M1 200/200, M4 200/200, S3 300/300, G K1 300/300, the in-page store link 200/200). The rest of Google's leaves are cuts. |
| "Exit faster than entry" is the references' rule. | R §8, item 1 | It holds for things that appear: E6 (150 in, 100 out), E2's text (300 in, 50 out), R1 (no motion in, 100 out), keyframes' menu (200 in, 120 out, R K2). It does not hold for hover fills: every Family hover is symmetric at 100 ms (R F1 to F4). The drawer is slower out than in (200 in, 250 out, R E5). E2's shape takes 450 ms both ways. |
| "Nothing enters from 0." | R §8, item 2 | True of the references. Apple's floating pill enters from scale 0.007 (A S1). It is a one-time arrival of a 56 px drop, not a response to a hover. |
| "Hover and colour: 100 to 200 ms." | R §8, item 3 | True of the references. Apple's hovers run 300 to 320 ms (A G1, K1), Chrome's nav 300 ms (G K1), and Google's store veils 300 and 500 ms (G S3, S4). `restraint.md`'s 200 ms ceiling is tighter than Apple's own practice. |
| Apple's card strip shows "a sharpening of the shadow". | A §5 | At strip scale the nine frames of `store-card-hover.png` are indistinguishable. The numbers stand (1 % scale, one shadow layer from 8 % to 16 % alpha, 300 ms); the strip shows only that the change is below notice, which is the point. `gn-link-hover.png` likewise shows no legible change. |
| keyframes' Play button squashes "about 1.03 × 0.92". | BRIEF, from keyframes' round (O-285) | R K4 measured 0.990 × 0.936 on release. Both readings say non-uniform; the amounts disagree, and neither strip resolves it at 56 px. The fact that stands is "non-uniform, with a brightness dip to 0.96". |
| The census's "snaps (likely)" rows are snaps. | CENSUS | Two rows are marked "likely" (the dock's corner at arm and settle; the slider's loupe). They stay marked. The only census rows a frame confirms are the dock's width and corner (R K1, `inbound/GLASS-DOCK-JUMPS.md`) and the Play and Pause swap (R K4). |

One fact bears on everything in section 5: **glass-ui's icons are Lucide SVGs** (16 imports of `@lucide/vue` under `src/components`; no `font-variation-settings` anywhere in `src/styles` or `src/components`). Google's glyph motion is a variable-font axis. That technique does not transfer. What transfers is its restraint: one property, the glyph's own node, 200 ms.

## 1. The grammar of an intent-carrying motion

Each row gives what changes, by how much, how long in and out, the easing, and its source. Where a source cuts, the row says so.

### What changes, and by how much

| Intent | What moves | Amount | Sources |
|---|---|---|---|
| "Pressable" (hover, effect only) | a fill or a veil over the control | 8 % veil (G C3, S3); 2 % of the blue (A B1, a cut); 5 grey levels (R F2); text from 80 % to full ink (A G1); a pale fill behind a label (G K1) | G, A, R |
| "This opens something of its own" (hover, with growth) | a plate behind the icon | scale 0.8 to 1 with opacity 0.75 to 1 and a 45 degree turn (G C1); glass's own close button grows a plate 1 to 1.08 (`src/components/dialog/styles.css:115-133`) | G, CENSUS |
| "You can open this" (hover on a large element) | the element and its one shadow | scale 1 to 1.01, shadow alpha 8 % to 16 % (A K1); scale 1 to 1.02 (R F3); one shadow layer deepens (R F4) | A, R |
| "This one is under you" (glyph) | the glyph's own weight | weight 400 to 600, label grade 0 to 50, no change in width (G M1) | G |
| "Menu, now close" (glyph state) | the glyph's own strokes | two lines meet, then cross (A G7); a chevron slides in 4 px and leaves by shrinking to 0.8 (A G8, CSS read) | A |
| "You are here now" (selection) | one indicator | a pill widens from 0.32 of its width at its own centre (G M4); a pill travels and the label waits for it (A K2, CSS read); one clip moves and the text colour moves with it (R E7) | G, A, R |
| "This belongs to that" (something appears) | the surface, from its trigger | from scale 0.8 (G C6), 0.9 (R E6), 0.96 (R F1), or 8 px and 9 % (R K2); content inside moves 4 px (A G2) | G, A, R |
| "Same object, new size" | the box | one layout write, then a transform with the corners corrected each frame (R E1); a height tween on one contained box (A G2 to G4, R E4) | A, R |
| "Received" (press) | colour, or a small scale | a 2 % colour step (A B1, L2); a disc from the finger at 10 % opacity (G C4); the hover lift ending, 1.02 back to 1 (R F3) | A, G, R |
| "Alive", "working" (idle, progress) | one loop | a spinner at 0.85 to 2.5 s (R E8); a skeleton breathing between opacity 1 and 0.5 over 2 s (R E9); a dot that fills with time (A K5, CSS read) | R, A |

The amounts are small everywhere. On a hover, no source moves a control more than 2 % in scale; the Chat plate is the largest hover travel recorded (a fifth of its size, which is 36 % of its area), and it is a plate behind the control, not the control.

### How long, and on which curve

| Kind | In | Out | Easing | Sources |
|---|---|---|---|---|
| Hover fill or tint | 75 to 320 ms | the same, or shorter | `linear` at 75 ms (G C3); `ease` (G K1, R F1 to F4); `cubic-bezier(0.4, 0, 0.2, 1)` (G S1, R §3 chrome); `cubic-bezier(.4, 0, .6, 1)` (A G1); `ease-out` (G S3) | G, A, R |
| Hover growth | 100 ms (R F3); 300 ms (A K1); 330 ms for the scale inside a 500 ms keyframe (G C1) | 100 ms; 300 ms; a cut | `ease` (R, G C1); `cubic-bezier(0, 0, .5, 1)` (A K1) | G, A, R |
| Glyph | 200 ms (G M1); 240 ms in two legs (A G7) | the same | `cubic-bezier(0.2, 0, 0, 1)` (G M1); ease-in then ease-out (A G7) | G, A |
| Selection indicator | 200 ms (G M4); 250 ms (R E7); 320 ms with the label 160 ms after a 160 ms wait (A K2) | the same clock on the item it leaves | `linear` (G M4); `ease` (R E7); `ease-out` (A K2) | G, A, R |
| A surface appears | 100 to 200 ms (R F1, E6, E5, K2; G C6 after a 300 ms wait) | 75 to 250 ms | `ease-out` and stronger (R E5, E6); `cubic-bezier(0, 0, 0.2, 1)` in and `cubic-bezier(0.4, 0, 1, 1)` out (G C6) | G, R |
| A box resizes | 120 ms for a correction (A G3); 254 ms to open (A G2); 400 to 450 ms for a whole panel or card (R E2, E4) | 240 ms after a 120 ms wait (A G4); 450 ms (R E2) | `cubic-bezier(.4, 0, .6, 1)` (A); a spring that arrives near 170 ms and settles near 815 ms (R E1) | A, R |
| Press | 100 ms (R F3); 105 ms for the ripple's opacity (G C4) | 100 ms (R F3); 250 ms (G C4) | `ease`; `linear` | G, R |

### How the out differs from the in

Five patterns are in the records, and they sort by what the motion is.

1. **A hover fill leaves the way it came.** Same clock, same curve: G C3, M1, M4, S3, G K1; A G1, K1; R F1 to F4. One declaration serves both ways (A K1).
2. **A thing that appeared leaves in less time.** The out runs at 0.4 to 0.75 of the in: 75 of 150 ms (G C6), 80 of 200 (G S1), 100 of 150 (R E6), 120 of 200 (R K2), 160 to 240 of 320 (A G4). Text inside a closing card leaves in 50 ms (R E2).
3. **The out carries less motion.** The tooltip grows in and only fades out (G C6). The radial menu appears with none and fades out with a 4 % shrink (R R1).
4. **The out reverses the order.** Apple's flyout arrives surface first, then content; it leaves content first, last item first, and the panel waits 120 ms before folding (A G2, G4).
5. **The out is a different small shape.** Apple's chevron slides in and leaves by shrinking to 0.8 (A G8).

The one slower exit is a sheet (200 in, 250 out, R E5). The cuts are section 6's business.

### Weight

Three readings show weight without ornament. The surface moves before its content (panel 254 ms, links 320 ms starting 80 to 440 ms later, A G2). Colour waits for shape (the label turns 160 ms after the pill starts, A K2). A change between two open states is a correction, not a replay (120 ms and no stagger, A G3). Only one recorded spring overshoots: the Dynamic Island, 3.5 % growing and 8.5 % shrinking (R E1). Every curve Apple puts on a control is a decelerating or standard ease (A §10).

## 2. Google's icon and shape motion, taken apart

### What exactly grows

The plate, and only the plate. Each Chat icon has a 40 × 40 `div` behind it, always in the DOM, transparent at rest (G §1). On hover one keyframe runs for 500 ms: scale 0.8 to 1 and opacity 0.75 to 1, both landed by 330 ms, and a turn from −45 degrees to 0 that runs the full 500 ms, with `ease` on each segment (G C1). At 165 ms the scale reads 0.960 (W1). The plate's colour is a custom property on the button, flat, with a light and a dark value (G §1 table). Because it starts at four fifths of its size and three quarters of its opacity, it is nearly there on the first frame; strip `chat-hover-board.png` shows a pale, small pentagon in frame one and a settled one by frame seven.

### What morphs

Nothing morphs on hover. The pentagon, the clover and the slanted capsule are fixed `clip-path: path()` shapes (G §1 table); the path holds while the node animates (W2). The appearance of a morph comes from a non-round shape turning as it grows: the pentagon's point swings up from the left. On a round or square plate the same keyframe would read as a plain grow.

The glyph changes outline to filled, weight 400 to 500 and grey to the plate's dark colour, all in one frame (G C2). Material's own site does tween a glyph: weight 400 to 600 over 200 ms on `cubic-bezier(0.2, 0, 0, 1)`, in and out (G M1). It tweens because the rest and hover states name the same font axes; where they differ the engine flips the value (G M5, W3 against W4).

### How the plate changes shape

It changes shape once, on selection, and badly. The plate's `clip-path` swaps from the pentagon path to `circle()`, which both engines treat as a cut (G C7, W8). The bar relocates about 450 px by layout in one frame and its grey backing cuts away (G C7). The technique that would have worked is in G's witness table: a path to another path with the same command list interpolates in both engines (W7).

The other shape motion on Google's surfaces is the navigation pill: a pseudo-element, always present at opacity 0, that widens from `scaleX(0.32)` to 1 with its opacity over 200 ms `linear` (G M4, strip `m3-rail-select.png`). It is the cleanest piece Google ships: no node, two compositor properties, short travel. Its `linear` curve is its one weakness; it has no settle.

Material's Expressive shape morphs and springs were not recorded as mechanism. The pages carry them as videos, and the probe found no live morphing component (G §2).

### The technique, and its Safari status

| Piece | Technique | Engines (G §5) | Safari floor (documented) |
|---|---|---|---|
| Plate grow and turn | `@keyframes` on `scale`, `transform: rotate()` and `opacity` over a `clip-path: path()` node | tweens in both (W1, W2) | individual `scale` 14.1; `clip-path: path()` 13.1 |
| Glyph weight or fill | `font-variation-settings` transition, same axis list both ends | tweens in both (W3); cuts when the lists differ (W4) | 11 |
| Shape to shape | `clip-path` path to path, same command list | morphs in both (W7); path to `circle()` cuts in both (W8) | 13.1 |
| Indicator | `scaleX` and `opacity` on a pseudo-element | tweens in both (W10) | all |
| Tooltip | `opacity` and `transform: scale(0.8)` | tweens in both (W5) | all |
| Ripple | Web Animation on `::after`, over a radial gradient | tweens in both (W9) | 16.4 |
| Entry fade | `@starting-style` | both (W11) | 17.5 |
| Spring curve | `linear()` easing | both (W14) | 17.2 |
| `corner-shape`, CSS `d: path()` | | Chromium only (W12, W13) | not in Safari |

Cost as recorded: 0 nodes added at interaction time for every motion but the tooltip, which builds 3 (G §6). The plate, pill, tooltip and ripple run on transform, scale and opacity. The glyph-axis tween re-rasters text each frame, and the focus ring animates a `box-shadow` spread; both are paint (G §6).

### What it costs in markup

Google's motion is light; its markup is not. Each Chat icon button is 12 DOM nodes and the bar is 58 (G §1). The "Fill" chip on fonts.google.com is 14 nodes with two `::after` state layers (G §3). Apple's button is one node (A B1). The plate idea needs none of those 12 nodes; it needs one layer that is already there.

## 3. Apple's touch, taken apart

### How few layers, properties and nodes

| Surface | Nodes | What paints it | What moves |
|---|---|---|---|
| Global nav bar | the bar itself | one fill at 80 % and one `backdrop-filter: saturate(180%) blur(20px)`; no border, shadow, gradient or pseudo-element (A §1, §7) | nothing at rest |
| Nav link | 1 | text colour | `color`, 80 % to full ink, 320 ms (A G1) |
| Pill button | 1 (the anchor; no span, no pseudo-element) | one fill, `border-radius: 980px` | three custom properties swap on `:hover` and `:active`; a cut (A B1) |
| Store card | the card | one shadow layer at 8 % | `transform` and that one shadow, 300 ms (A K1) |
| Segmented pill | 0 extra (the list's `::before`) | one fill | position and width from four custom properties, 320 ms; label colour after it (A K2, 11 rules in all, A §7) |
| Flyout | 0 added (all present at rest) | the bar's colour | panel `height`; links `opacity` and 4 px (A G2) |
| Floating pill | one `span` for the background | fill at 72 %, `blur(7px)`, no shadow, no border | `transform: scale()` then the fill thinning (A S1) |
| Menu icon | 4 `<animate>` elements inside the existing SVG | two strokes | the strokes' own points, 240 ms (A G7) |

Per interaction Apple moves one or two properties on a node that already exists. The largest count is the flyout: a height, a colour, and opacity with a 4 px translate on the links.

Measured cost in Chromium: the link hover is 0 to 1 layouts and 10 style recalcs; the card hover 1 layout; the whole flyout opening 18 layouts in 2 ms, because the box that resizes is absolutely placed with `overflow: hidden` and pushes nothing (A §1, §5).

### What is absent

Counted in the stylesheets A read (A §7, §10):

- **On glass:** no `box-shadow`, no border or rim, no inner glow, no gradient, no specular, no text shadow. The global header file has 0 of each across 170 KB.
- **Stacked blur:** never. When a flyout opens, the bar drops its filter; the panel carries the blur only while it animates; at rest the panel is opaque and one curtain blurs the page (A G2b).
- **On controls:** no overshoot, no `linear()` spring, no ripple, no lift on the primary button, no corner radius that animates, no wrapper added for motion.
- **On hover:** no icon morph. The only glyph that changes shape is the small-screen menu icon, on tap (A G7).
- **On change between open states:** no replayed entrance (A G3).
- **On exit:** nothing slower than its entrance (A G4, G5).
- **Features:** no `@starting-style`, `linear()`, `interpolate-size`, view transitions, scroll timelines, `corner-shape`, or transition on `clip-path`; no Web Animation object on any page driven (A §8).

### The newest glass, as Apple states it

From the HIG as read on 2026-11-12 (A §6). The guidance in force is the 26-cycle Liquid Glass text; the 27 cycle added design principles, UI kits and touch on Mac, not a new material page.

- Glass is "a distinct functional layer for controls and navigation elements" above content, and never in the content layer. A slider or toggle takes the glass look only "when a person activates it": glass as a state, not a rest look.
- "Use Liquid Glass effects sparingly ... Limit these effects to the most important functional elements." Two variants only, regular and clear.
- "By default, Liquid Glass has no inherent color." To mark a primary action, colour the background, not the symbol.
- Pointer feedback has three forms, chosen by the control. **Highlight** is one glass shape that moves between the members of a group (bar buttons, tabs, segmented controls). **Lift** is scale up with a shadow and "a soft specular highlight", for a control that stands alone. **Hover** is a custom scale, tint or shadow for a large element.
- "For an element that has little space around it, consider using a hover effect that includes tint, but not scale and shadow." "It doesn't work well to use shadow without including scale."
- "Create contiguous hit regions" so the highlight does not vanish between buttons.
- "Avoid creating gratuitous pointer and content effects." "Don't add motion for the sake of adding motion." "Generally avoid adding motion to UI interactions that occur frequently."
- "Always include a press state for a custom button." No shape of press is prescribed.
- Glass "responds to direct touch interaction with greater emphasis" and gives "a more subdued effect" to a trackpad.

Two things to hold against each other. The HIG's lift names a specular highlight on a standalone control; apple.com ships none, and the owner ruled it out ("Remove, do not tune", `restraint.md`). The ruling is newer and wins. And Apple on the web cuts where the owner's law forbids it: the button's hover and press, the picker and the swatch (A B1, L2, K3, K4).

### Press, in the sources

Apple's web press is a 2 % colour step, cut; its one shrink is a video control at `scale(.9)` with no transition (A §9). Google's press is a ripple (G C4). Family's press is the hover lift ending: 1.02 back to 1 in 100 ms, uniform (R F3). Rauno's guideline is words, not a measurement: "Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so" (R §7). keyframes, which is glass, squashes non-uniformly and dims (R K4). No source shows a uniform shrink below 1 with an eased start and return. If glass ships one, it is glass's own.

## 4. Where glass-ui stands against both

### What glass already does as well as the sources

Top-layer surfaces enter and leave by a tween (CENSUS, "What holds", 1). The pager dot and the dialog's close button already grow a mark on hover (CENSUS, 5). The tab indicator and the dock's switcher are single travelling plates. The checkbox and radio marks are force-mounted and tween in scale and opacity (`src/styles/glass/control-bit.css:343-372`). keyframes' live scene glyph is the one icon in any record that carries identity by motion and stops when its scene stops (R K5).

### The twenty worst snaps

From CENSUS, in its order (how often a user meets them). "Frame" marks the rows a record confirms; the rest are source readings. The last column names the piece in section 5 that cures the row.

| # | Snap | Where | Frame | Piece |
|---|---|---|---|---|
| 1 | The dock re-fits at once when a live layer's content changes | `src/components/dock/composables/dockMorphMeasure.ts:186-230` | `inbound/GLASS-DOCK-JUMPS.md` §3 | P4 |
| 2 | The focus ring appears and leaves in one frame | `src/styles/utilities/base.css:144-151` | | owner ruling (OWNER-READ, question 3) |
| 3 | A field's error or description line mounts and pushes the form down | `src/components/labeled-field/LabeledField.vue:50, 64-71` | | P3 |
| 4 | The command list and its dialog resize on each keystroke | `src/components/command/CommandList.vue`, `src/components/dialog/styles.css:21-30` | | P4 |
| 5 | The Button's loading ring widens the button at once and leaves by a cut | `src/components/button/Button.vue:192-198` | | P3 |
| 6 | An auto-width select trigger jumps to the new value's width | `src/components/select/SelectValue.vue:35`, `src/components/tabs/SegmentedTabs.vue:162-170` | | P4 |
| 7 | The dock's active highlight does not travel; border and backdrop switch on at once | `src/components/dock/DockControl.vue:96-97`, `src/components/dock/styles/controls/icon-button.css:188-232`, `tab-button.css:96-99` | | P1 |
| 8 | Menu and select check and radio marks pop | `src/components/menu/DropdownMenuCheckboxItem.vue:50-53`, `DropdownMenuRadioItem.vue:46-49`, `src/components/select/SelectItem.vue:76-84` | | P3 |
| 9 | The other toasts jump when one arrives or leaves | `src/components/toast/Toaster.vue:107-122` | | P4 |
| 10 | DataTable state and row changes cut | `src/components/data-table/DataTable.vue:285-480` | | P3 |
| 11 | Reduced motion cuts everything | `src/styles/utilities/a11y-overrides.css:46-53`; `src/components/dock/composables/useDockSpring.ts:103`; `src/components/dock/DockCrossfade.vue:218-221` | | P6 |
| 12 | Icon swaps by `v-if`: Play and Pause, copy and check, Minus and Check, the sort glyph | `src/components/dock/DockBackgroundToggle.vue:72-73`, `src/components/easing/EasingPicker.vue:577-588`, `src/components/checkbox/Checkbox.vue:48-49`, `src/components/data-table/DataTable.vue:401` | R K4, `kf-play-click-step50ms.png` | P2 |
| 13 | The dock's `#persistent`, `#persistent-end` and `#search` regions mount with no size tween | `src/components/dock/GlassDock.vue:483, 576, 592` | `inbound/GLASS-DOCK-JUMPS.md` §3 | P4 |
| 14 | The slider's loupe pops in and may be cut on release | `src/components/slider/Slider.vue:333-346`, `src/components/slider/styles.css:477-537` | marked "likely" | P3 |
| 15 | Popovers and tooltips flip sides and resize in one frame | `src/components/popover/PopoverContent.vue:61`, `src/components/tooltip/TooltipContent.vue:40` | | P4 |
| 16 | The theme flip re-tints the page in one frame | `src/composables/dark/useGlobalDark.ts:92-111` | | none here (see below) |
| 17 | Avatar images and Metric values arrive by a cut | `src/components/avatar/AvatarImage.vue`, `src/components/metric/Metric.vue:64-65` | | P3 |
| 18 | Timeline marks snap on hover and on state; the detail pane's old content is cut | `src/components/timeline/Timeline.vue:373, 578-676` | | P1, P3 |
| 19 | Pager dots: the leaving pip is cut and the edge pip shrinks at once | `src/components/pager-dots/PagerDots.vue:353-370, 500-504` | | P3 |
| 20 | ExpandableContainer's exit cuts and the page reflows; the condensing card header jumps | `src/components/expandable-container/styles.css:6-16`, `src/components/card/scroll.css:100-106` | | P4 |

Row 16 has no piece. Rauno's guideline says a theme switch "should not trigger transitions and animations on elements" (R §7); the owner's law says nothing changes in one frame. A whole-page cross-fade is one candidate, and R K4 shows what a whole-surface cross-fade does to a glyph (two ghosted copies). It goes to the spec seat as an open row, not to a piece.

The dock's width and corner are the best-evidenced snap in the corpus. As keyframes consumes it, the capsule's width goes 56 to 269 px in one frame and its radius 50 % to 16 px in one frame, under a 250 ms scale, with the radius uncorrected, and one leg (`inline-size`) is layout per frame (R K1; strip `kf-chrome-dock-hover-step75ms.png`, where frame three already shows the full row clipped mid-word). On daraksha the plate's height changes 56 to 60 px in one frame both ways and the corners flip from [30, 4, 4, 30] to round in one frame (`inbound/GLASS-DOCK-JUMPS.md` §2).

atlas's census adds 13 rows that are glass's, the most visible being that closing an enlarged plate is a cut (BRIEF; `inbound/ATLAS-SNAP-CENSUS.md`). The spec seat takes them into its census section.

Hover, from CENSUS: of 31 graded controls, 17 pass, 4 are weak and 10 fail. None of the 17 passing fills grows or changes shape. The ten that fail are the text Button, the Collapsible trigger, both SegmentedTabs variants, the DarkModeToggle, the ExpandableContainer trigger, the data-table sort header, the sortable handle, the Timeline mark and the toast close.

### Where glass over-does it

Each row is something glass ships that neither Apple nor Google ships on the same kind of control. Counts across `src/styles` and `src/components` (`.css` and `.vue`): 92 `box-shadow` declarations, 34 `backdrop-filter`, 36 `filter`, 9 `mix-blend-mode`, 12 infinite animations. Apple's global header has 0 `box-shadow`, 0 gradients and 0 `text-shadow` in 170 KB, and filters the page through one translucent layer at a time (A §7, G2b).

| # | What glass does | Where | What the sources do |
|---|---|---|---|
| 1 | A pointer-tracked specular disc on every glass rung and every dock control: a radial gradient, a radial mask and a `plus-lighter` blend on `::before` | `src/styles/glass/material.css:128-143` (the selector group), `:225`, `:235`, `:247`; the Button arms it with `v-specular` (`src/components/button/Button.vue:166`) | Apple: no gradient or specular on any control (A §10). Measured on keyframes: opacity 0 to 0.14 over 300 ms plus a moving `--specular-y` (R K3). Already ruled out (`restraint.md`, C-2). |
| 2 | The capsule's whole hover is that gleam | `src/styles/glass/glass-capsule.css:93-116` | A hover is a fill (G K1, R F2) or a plate (G C1). Once the gleam goes these controls have no hover (CENSUS, 6). |
| 3 | Five shadow layers and a backdrop blur on one capsule: a top rim, two bottom rim insets, a drop shadow and a 0.5 px ring | `src/styles/glass/glass-capsule.css:57, 66-69`; `src/styles/tokens/glass-fx.css:100-106, 183-184` | Apple: no shadow, border or rim on glass; one layer on an opaque card (A §10). `restraint.md`: at most one shadow per surface. |
| 4 | The selected dock seat changes five properties, none of which travels, and gains its own backdrop filter | `src/components/dock/styles/controls/icon-button.css:188-194, 215-228` | One shape that moves between members (A §6 highlight, A K2, G M4). |
| 5 | The Button's press: a JS spring fed by eight listeners, a gleam coupled to it, and six transition legs | `src/components/button/Button.vue:183-190`; `src/components/button/styles.css:99-105, 282-296` | Apple: three custom properties on one node (A B1). Measured on keyframes: a non-uniform squash to 0.990 × 0.936 and a brightness dip to 0.96 (R K4, O-285). |
| 6 | A blur on the surface's own pixels while it opens: 6 px on dialogs and popovers, 2 px on menus | `src/styles/glass/reveal.css:139, 159, 179`; `src/styles/tokens/motion-registers.css:73, 80` | Opacity and a small scale, nothing else (G C6, R E6, R F1). R K2 reads it as "a second effect layered on the fade". It also animates a filter over a glass surface each frame (CENSUS, Dialog row). |
| 7 | Three radial gradients behind every Select menu, with a second set for dark | `src/styles/glass/overlay-plate.css:383-408, 412-428`; `src/components/select/SelectContent.vue:132` | No gradient behind a menu in any record. `restraint.md`: no gradient except data or identity. |
| 8 | The selected Chip grows up to 12 % (times the motion weight) on an overshooting curve and lights a radial `plus-lighter` flood; its base fill is a gradient layer | `src/styles/glass/glass-chip.css:12-15, 28-31, 43-57` | No overshoot on a control (A §10, `motion-canon.md` P2). The light Chip also stacks border, fill and shadow (O-287). |
| 9 | Menu rows carry six transition legs, lift 1 px on the dock spring and scale on press | `src/components/_shared/menu/menu.css:11, 30-36, 69` | A state layer's opacity, 150 ms (G M7). "Hovering trivial buttons" and menus are on Rauno's list of things to keep plain (R §7). |
| 10 | Gradient sweeps on `background-position`, infinite: the indeterminate track, the skeleton shimmer, the configurator's preset shimmer | `src/styles/glass/track-flow.css:44-53`; `src/components/skeleton/Skeleton.vue:221`; `src/components/configurator/styles.css:490` | The same class as Family's loading shimmer, which repaints every frame (R F6). Emil's skeleton is one opacity loop (R E9). |
| 11 | A pulse loop on a small status mark | `src/components/status-dot/StatusDot.vue:269` | `restraint.md`: zero infinite animations on controls. |
| 12 | Text shadows as utilities: the depth stamp and the engraved text | `src/styles/utilities/base-misc.css:24`; `src/styles/typography/utilities.css:180`; `src/styles/theme/literals.css:78-104` | 0 `text-shadow` in every Apple file read (A §10). `restraint.md` checks for zero. |
| 13 | Reduced motion is written control by control as `transition: none` beside the universal zeroing (27 `transition: none` declarations in all; this seat did not sort which sit in a reduced-motion block) | `src/styles/utilities/a11y-overrides.css:46-53` and the local rows in CENSUS, "What holds", 4 | One rule in one place. Emil: "animates opacity only when the user prefers reduced motion" (R §7). |

Two rows are reported by consumers and not located in source by this seat. The ToggleGroup item's "radial hover glow" (O-286): `src/components/toggle-group/styles.css` has no gradient, and the purple glow under the pointer in `owner/keyframes-easing-cards-2026-11-12.png` matches row 1's disc; that is an inference to confirm with a frame. The dock page icons' shading (owner, 17:05) is a consumer's glyph art, outside glass's source.

The gold shimmer utilities (`src/styles/utilities/metal.css:252`, `base-misc.css:221`) are not on this list. Gold where a surface earns it is an owner ruling.

## 5. The small pieces worth making

Seven, and no more. Each is one motion for one intent, on a node or pseudo-element that already exists. The byte, node and frame budgets are targets; none has been measured, and the prototype seat owes each a reading in Chromium and in WebKit.

A budget common to all: 0 DOM nodes added; transform, scale, opacity or `clip-path` only, unless stated; no observer at rest; no listener where a selector will do; a reduced-motion arm through P6.

### P1. The plate

- **Intent:** "this is pressable, and here is where you are". A flat plate grows from the control on hover and on keyboard focus, and leaves the same way. In a group, the selected plate is one shape that travels between members.
- **Learns from:** G C1 (start at scale 0.8 and opacity 0.75, never from nothing); G M4 (a pseudo-element that is always there, two properties); A K2 and the HIG's highlight (one shape for a group, the label after the shape); glass's own close button (`src/components/dialog/styles.css:115-133`). It supplies what Google lacks: the leave.
- **Shape of it:** scale 0.8 to 1 with opacity, in within 200 ms on a decelerating ease, out on the same or a shorter clock; a flat fill from one custom property. No turn by default (question 2 in OWNER-READ).
- **Cost budget:** one pseudo-element per control, the seat the specular disc holds today, so the net is zero; two properties, both compositor; under 1 KB of CSS; no script. Safari: all versions for scale and opacity; a shaped plate would be `clip-path: path()`, 13.1 (G W1, W7).
- **Lets glass delete:** the pointer-tracked disc and its wiring (over-do rows 1 and 2), the per-control hover fills in the dock (`icon-button.css:126-131`, `tab-button.css:67-72`, `triggers.css:72-77`), the five-property selected seat (row 4), and the menu row's lift (row 9). It cures the ten failing hovers and snap 7.

### P2. The icon that answers

- **Intent:** the glyph says what the control does, by one small motion of its own strokes on hover, and by a tween between its two states.
- **Learns from:** G M1 (one property, the glyph's own node, 200 ms in and out on `cubic-bezier(0.2, 0, 0, 1)`); A G7 (the glyph's own two strokes become the X, 240 ms, nothing added); A G8 (a 4 px slide in, a shrink to 0.8 out); the drawn-on underline at benji.org (R §5); the checkbox mark already in glass.
- **Shape of it:** a class or directive on the `svg` itself. Hover verbs, one per icon: nudge (2 px in the arrow's direction), turn, draw (`stroke-dashoffset`), fill (`fill-opacity`). A state pair (Play and Pause, copy and check) is both glyphs in one box, the old one shrinking to 0.8 and fading as the new one grows from 0.8. It serves a glyph in a trigger and in a menu item, and may run on click as well as hover (BRIEF, the keyframes asks). Flat fills (owner, 17:05).
- **Cost budget:** 0 nodes for a hover verb; one extra `svg` kept mounted per state pair, which is the piece's only added node and must be argued for at each site. One or two properties on at most two paths. It repaints a 16 to 24 px box; it is paint, not compositor, and the reading must say so. No path morph in CSS: `d: path()` is not in Safari (G W13). A true stroke morph is Apple's SMIL route (A G7), unmeasured in WebKit.
- **Lets glass delete:** the DarkModeToggle's private icon spring and its opt-out attribute (`src/components/dark-mode-toggle/dark-mode-toggle.css:77-83`), the three separate chevron rules (`triggers.css:152-157`, `disclosure.css:96-98`, the SelectTrigger class), and the whole-dock view transition that keyframes uses to hide a glyph swap (R K4). It cures snap 12 and gives O-279 its hover.

### P3. Presence

- **Intent:** "this arrived" and "this left". Anything mounted or removed by `v-if` enters with a fade and 4 px of travel and leaves the same way, in less time; the box it sits in follows by P4.
- **Learns from:** A G2 and G4 (4 px per item; out in half the time; content before container); R E6 (from 0.9, 150 in, 100 out); G C6 (the out drops the scale); atlas's finding that one presence piece would cure about a third of its list (BRIEF).
- **Shape of it:** one named transition, not four. Enter by `@starting-style` where the node stays; Vue's `<Transition>`, which renders no element, where it does not.
- **Cost budget:** 0 nodes; opacity and translate; `@starting-style` needs Safari 17.5 (G W11), so the piece states that floor.
- **Lets glass delete:** `pane-swap`, `metric-swap`, `fade` and `tab-fade` in `src/styles/transitions.css`, which no component uses (CENSUS, "What holds", 3). It cures snaps 3, 5, 8, 10, 14, 17, 18 and 19.

### P4. The box that follows its content

- **Intent:** "same object, new size". A surface whose content changed reaches its new size by a tween, with round corners on every frame.
- **Learns from:** R E1 (one layout write, then travel, corners kept true); A G3 (a 120 ms correction between two measured sizes, no replay); A G2 (if a height must animate, do it on one contained box that pushes nothing: 18 layouts, 2 ms); the dock's own morph, which already scales over a reserved box behind a clip (`src/components/dock/composables/useDockMorph.ts:79-104`).
- **Shape of it:** measure once when the component knows its content changed (a value, a route, a mount), settle the box, and reveal it through a `clip-path: inset(… round r)` that tweens from the old rectangle. The clip keeps the corners round with no per-frame script, which Emil's version needs (R E1). No overshoot outside the dock (`motion-canon.md` P2).
- **Cost budget:** 0 nodes; one read and one write per change; one property per frame. A `clip-path` inset transition runs in both engines (R E7); whether each engine composites it is unmeasured and is the first thing the prototype must read. A size observer may run only while a change is in flight.
- **Lets glass delete:** the corner rule swap at arm and settle (`src/components/dock/styles/morph.css:176-191`), the crossfade's running-max reserve (`src/components/dock/DockCrossfade.vue:89-105`), the `width` and `height` legs on the tab indicator (`src/components/tabs/styles/segmented.css:159-166`), and the configurator's private row reveal (`src/components/configurator/ConfiguratorLayer.vue:236-247`). It cures snaps 1, 4, 6, 9, 13, 15 and 20.

### P5. One press (a proposal for the owner)

- **Intent:** "received".
- **Learns from:** the HIG ("Always include a press state"); R F3 (uniform, 100 ms, no overshoot); Rauno's words (about 0.96); Apple's colour step (A B1). No source ships it whole (section 3).
- **Shape of it:** a uniform scale to `--scale-press-sm` (0.97, `src/styles/tokens/scale-paper.css:26`) with the tone a step deeper, eased down in about 100 ms and back in about 150 ms, on `:active` alone. A control nested in a trigger takes it too (O-284). No bounce, no inset shadow, no brightness filter, no gleam.
- **Cost budget:** 0 nodes, 0 listeners, one property and one colour.
- **Lets glass delete:** the press spring and its eight listeners on the Button, the press-coupled gleam, and the non-uniform squash (over-do row 5).
- **Status:** the owner retired a press indent in July and asked for a press shrink in November (BRIEF, point 1). This is one state to show him as a strip, not a ruling.

### P6. The reduced-motion fade

- **Intent:** the same statement without travel.
- **Learns from:** Emil ("animates opacity only", R §7). Apple and Google cut here (`transition: none` 18 times in Apple's store sheets, A §10; `animation: none`, G C1), which the owner's law does not allow.
- **Shape of it:** one token pair and one carve: under reduced motion, travel is dropped and opacity and colour keep a short fade.
- **Cost budget:** one rule; it must be exported so atlas can read it (BRIEF).
- **Lets glass delete:** the universal zeroing (`src/styles/utilities/a11y-overrides.css:46-53`) and the local `transition: none` rows CENSUS lists. It cures snap 11 and brings the code back to `motion-canon.md` P6.

### P7. The no-snap check

- **Intent:** none on screen. It is the gate `motion-canon.md` P0 already describes: sample each state change in and out; no step larger than the eased step allows; first and last frames equal the rest states.
- **Learns from:** the recorders' own method (pause, seek evenly, compare; G and A headers) and daraksha's targets (largest step at most 12 % of travel, first at most 4 %, last at most 2 %, `inbound/GLASS-DOCK-JUMPS.md`).
- **Cost budget:** test code only, shipped as an exported helper a consumer can run against its own pages (atlas's ask, BRIEF); nothing in the runtime bundle.
- **Lets glass delete:** nothing in `src`. It replaces per-wave hand probes.

### What is not a piece

Idle, progress and done states for large elements need no new piece. A skeleton that breathes on opacity (R E9), the existing Progress fill, and P3 for the hand-off between them cover the gaps CENSUS lists. The gradient sweeps in over-do row 10 are what to remove on the way.

## 6. What not to copy, and why

**From Google**

- The leave. Every Chat icon cuts on the way out, and so do the rail's plate and colour, the icon grid and the store's plate and shadow (G §6). It fails `motion-canon.md` P0.
- The selection. A path swapped for `circle()` and a bar moved 450 px by layout are both cuts (G C7).
- The markup. Twelve nodes for an icon button (G §1).
- The ripple. A radial gradient layer and a scripted animation for a press (G C4); it is a gradient on a control and a second motion.
- The focus ring that swells to 8 px and settles over 600 ms (G C5). It animates a shadow spread, and `restraint.md` asks for no motion on keyboard actions.
- The 500 ms hover (G C1), which is past glass's 200 ms ceiling for frequent feedback. The grow is worth keeping; the length is not.
- Two clocks on one control: a plate that cuts while its tint tweens (G S2, S4).
- The glyph technique itself. It needs a variable icon font; glass's icons are SVG.
- The `linear` curve on the pill (G M4). It has no settle.

**From Apple**

- The cuts on the button, the picker and the swatch (A B1, L2, K3, K4).
- A transition on `backdrop-filter` and a blur rewritten every frame (A L1, S1). The brief forbids re-filtering per frame.
- Layout properties on the pill (`inset-inline-start`, `width`, A §7). Glass's indicator can travel by transform.
- Scroll motion by script writing inline styles: 390 layouts in 60 wheel steps (A §4).
- `transition: all` (A §10), and a global header with no reduced-motion rule.
- The lift's "soft specular highlight" from the HIG (A §6). Ruled out.

**From the design references**

- The duplicated tab row, 24 extra nodes for one clip (R E7). The idea (one shape carries both meanings) is sound; the copy of the row is the cost.
- Overshoot on a control. The island's 3.5 % and 8.5 % belong to a morph (R E1); in glass that is the dock, the blob and the card shuffle only.
- A radius rewritten by script on every frame (R E1).
- The content blur during a cross-fade (R E1), for the same reason as over-do row 6.
- Shimmer on `background-position` (R F6) and a marquee that never stops (R F5).
- "No motion in" for a frequent menu (R R1 and Rauno's words). His reason, frequency, is right and argues for small and fast; the owner's law still asks for a start.
- A whole-surface cross-fade to hide a small change (R K4). Benji Taylor's words fit it: "A pet peeve of mine is when a component already visible on the screen unnecessarily duplicates itself during an animation" (R §7). The strip `kf-play-click-step50ms.png` shows two ghosted glyphs and a doubled label for three frames.

**What to take from all three, in one line each**

- Google: a plate that is already there and starts most of the way in.
- Apple: one node, one or two properties, and nothing on glass but its fill and its blur.
- The references: small amplitudes, things that appear leave faster, and motion saved for what is not seen a hundred times a day.
