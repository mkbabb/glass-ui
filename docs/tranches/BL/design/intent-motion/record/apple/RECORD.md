# Apple: the motion record (O-278, recorder 2)

Recorded 2026-11-12 by an Opus seat (claude-opus-5-5). Every number below was read from the running page or from the CSS file Apple serves. The live readings come from three instruments:

- `document.getAnimations()` on the page, read once per frame (keyframes, duration, easing, delay, fill, composite) so every transition and animation that starts is caught with its target;
- the computed style of each element that changes, read at rest, engaged and pressed;
- in Chromium, the CDP `Performance.getMetrics` counters `LayoutCount` and `RecalcStyleCount`, read before and after each motion. WebKit has no such counter, so its layout cost is unmeasured.

The scripts are in `scripts/` (`gn-flyout.mjs`, `sheet.mjs`, `control.mjs`, `scroll.mjs`, the batch files, `compose.py`), the raw readings in `data/` (`gn-flyout-*`, `sheet-search-*`, `scroll-*`, and `control-<name>-<engine>.json` for each hovered or pressed control).

**How the strips were taken.** Same clock as recorder 1: trigger the control, pause every running animation (CSS transitions, CSS animations, Web Animations), seek all of them to t = 0, step, 2 x step and so on, and take one clipped screenshot per seek. Frames are evenly spaced in animation time. A change with no animation is a cut, and its strip is a pair: the frame before and the frame two `requestAnimationFrame` ticks after. Strip file names are in each section. The floating pill (S1) is driven by script, not by an Animation object, so it cannot be seeked; it is recorded as numbers on a `requestAnimationFrame` clock instead, with no strip.

**Viewport and theme.** 1440 x 900, device scale 1, light system theme. apple.com's home page sets its own dark global nav; the store and product pages use the light one.

**Safari column.** "WebKit: same" means the motion was driven on the real page in Playwright's WebKit build under `guarded --exclusive webkit` and the same Animation objects started with the same timing. Playwright WebKit is not shipping Safari; shipping Safari is unmeasured. Where a technique is version-gated, the version given is the documented support floor, not a measurement.

**Load.** The machine's load average was 50 to 230 during the runs. Frame times in the per-frame samples are coarse (gaps of 8 to 60 ms). Durations and easings come from the Animation objects and are exact; frame-by-frame values are samples.

## 1. apple.com global nav and its flyouts

### Anatomy at rest

- `nav#globalnav`, 44 px tall, **913 DOM nodes** in all (every flyout's links are in the DOM at rest). The Mac item with its flyout is 88 nodes; the flyout alone 68.
- **The glass bar is one element with two declarations:** `background: rgba(250,250,252,.8)` (dark: `rgba(22,22,23,.8)`, home page measured `rgba(29,29,31,.8)`) and `backdrop-filter: saturate(180%) blur(20px)`. No border, no shadow, no gradient, no pseudo-element. Without `backdrop-filter` support the fill rises to `.92` (dark `.88`), set under `@supports (backdrop-filter: initial)`.
- Each flyout (`.globalnav-submenu`) is an absolutely placed, `overflow: hidden` box that rests at 44 px behind the bar, painted the bar's colour, with no backdrop filter of its own.
- `.globalnav-curtain` is one fixed full-viewport node: `background: rgba(232,232,237,.4)`, `backdrop-filter: blur(20px)`, `opacity: 0`, `visibility: hidden`.

Strips: `strips/gn-flyout-open.png` (G2, 0 to 760 ms by 95 ms, left 700 px of the nav), `strips/gn-flyout-close.png` (G4, 0 to 400 ms by 50 ms), `strips/gn-search-open.png` (G5, 0 to 620 ms by 77.5 ms), `strips/gn-link-hover.png` (G1, 0 to 320 ms by 40 ms).

### The motions

| # | name | trigger | what changes | properties | in: duration, easing | out: duration, easing | delay | DOM nodes added | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| G1 | nav link hover | pointer enters a top-level link | text from 80 % to full ink | `color` rgba(255,255,255,.8) to #fff (light: rgba(0,0,0,.8) to #000) | 320 ms `cubic-bezier(.4,0,.6,1)` | same, 320 ms | 0 | 0 | one CSS transition on `color` | same (`color` 320 ms, same curve) |
| G2 | flyout opens | pointer rests on Mac (about 160 ms of hover intent in both engines, then a class) | the panel grows down from the bar; the page behind dims and blurs; the links arrive | panel `height` 44 to 552 px; panel `background-color` bar colour to solid #161617; curtain `opacity` 0 to 1; each link `opacity` 0 to 1 and `transform: translateY(-4px)` to 0 | panel: 254 ms `cubic-bezier(.4,0,.6,1)` (the duration is set by script from the height). Curtain: 320 ms, same curve, delay 80 ms. Links: 320 ms `ease`, delay = 80 ms + group x 80 ms + item index x 20 ms; the last link starts at about 440 ms and lands at about 760 ms. | see G4 | panel 0, curtain 80 ms, links 80 to 440 ms | 0 (all present at rest) | CSS transitions switched by classes (`globalnav-with-flyout-open`, `globalnav-animating`); stagger by a custom property per item (`--r-globalnav-flyout-item-number`) inside `calc()` | same: 76 Animation objects, panel `height` 253.5 ms, curtain 320 ms after 80 ms; strip `gn-flyout-open-webkit.png` |
| G2b | blur hand-off during G2 | same | which element carries the one backdrop filter | bar `backdrop-filter` to `none`; panel gets `saturate(1.8) blur(20px)` only while `globalnav-animating`; at rest the panel is opaque and has none; the curtain's `blur(20px)` takes over the page | discrete, on the class change | discrete | 0 | 0 | class swap, so exactly one translucent layer filters the page at a time | same: bar `none` from the first animating frame, panel blurred only while animating, `none` at rest |
| G3 | flyout change, Mac to iPad | pointer slides to the next item | the panel resizes to the next menu; the content cross-fades with no stagger | panel `height` 552 to 490 px; outgoing links fade 160 to 240 ms; incoming content `opacity` 0 to 1 | height: `@keyframes globalnav-scrim-height-change` from the previous to the next height (custom properties), 120 ms `cubic-bezier(.4,0,.6,1)`; content: `globalnav-fade-in` 120 ms | n/a | 0 | 0 | a keyframe animation on `height` between two script-written custom properties; incoming links have `transition: none` | same: `globalnav-scrim-height-change` 120 ms, 551 to 489 px |
| G4 | flyout closes | pointer leaves into the curtain | the content leaves first, then the panel folds up, then the dim lifts | links `opacity` 1 to 0, `translateY(0)` to `-4px`; panel `height` 490 to 44; curtain `opacity` 1 to 0 | links: `min(.16s + 20 ms x (items left), .24s)`, `ease`, no delay, last item first; panel: 240 ms `cubic-bezier(.4,0,.6,1)` after a **120 ms delay** (`--r-globalnav-flyout-close-delay`); curtain 320 ms, delay 80 ms | | 0 / 120 / 80 | 0 | the same transitions with the closing class swapping in shorter durations and zero delays | same: 78 Animation objects, height reaches 44 px by about 460 ms |
| G5 | search sheet | click the search glyph | the bar becomes a search field; suggestions arrive one by one | panel `height` 44 to 388 (240 ms); field `opacity` and `translateY(-4px)` (`globalnav-search-input-intro`, 240 ms, delay 200 ms); five links (`globalnav-search-fade-and-slide`, 320 ms, delays 220 to 300 ms by 20); curtain as G2 | per keyframe: `cubic-bezier(.4,0,.6,1)` (the easing is written on the keyframe, the animation itself is `linear`) | Escape: field `globalnav-search-input-outro` 240 ms; links fade 60 to 160 ms, last first; panel 240 ms after 120 ms | 0 to 300 ms | 0 | CSS `@keyframes` started by class | same: 27 objects on open, panel 44 to 388 px |
| G7 | menu icon to close icon (below 834 px; read from markup, not driven) | tap the two-line menu glyph | the two lines meet in the middle, then cross into an X; the reverse on close | SVG `polyline` `points`: top `2 5, 16 5` to `2 9, 16 9` to `3.5 3.5, 15 15`; bottom `2 12, 16 12` to `2 9, 16 9` to `3.5 15, 15 3.5` | 240 ms SMIL `<animate>`, `keyTimes 0;.5;1`, `calcMode="spline"`, `keySplines` ease-in (`.42,0,1,1`) for the first half and ease-out (`0,0,.58,1`) for the second | 240 ms, the same two legs in reverse | 0 | 4 `<animate>` elements inside the existing SVG (two per line, open and close), with `begin="indefinite"`, so script starts them | SMIL on the glyph's own geometry: no extra path, no CSS | unmeasured (SMIL `points` animation is supported in Safari) |
| G8 | submenu chevron (below 834 px; CSS read) | hover a link that has a submenu | a chevron slides in beside the label | `opacity` 0 to 1, `translate(-4px)` to 0; on leave `opacity` 1 to 0 with `scale(1)` to `.8` | `globalnav-chevron-slide-in-hover` | `globalnav-chevron-hover-off` (a different, shrinking exit) | 0 | 0 | two `@keyframes`, in and out unlike | unmeasured |
| G6 | bag badge | an item is added (CSS read, not driven: the bag was empty) | the count slides in and the glyph steps aside | badge `transform: scaleX(0)` to none, glyph `translate(-6px)`, `width` | 300 ms `cubic-bezier(.25,.1,.3,1)` | same | 0 (unit glyph: 185 ms) | 0 | CSS transitions; one `transition: all` on removal | unmeasured |

Cost, Chromium (CDP counters, whole motion including the hover move):

| motion | layouts | style recalcs | layout time | properties that animate |
|---|---|---|---|---|
| G2 open | 18 | 109 to 121 | 2 ms | `height` (layout, one absolutely placed box), `background-color`, `opacity`, `transform` |
| G3 change | 7 | 53 | under 1 ms | `height`, `opacity` |
| G4 close | 9 | 68 | 1 ms | `height`, `opacity`, `transform` |
| G5 search | 22 | 123 | under 2 ms | `height`, `opacity`, `transform` |
| G1 link hover | 0 to 1 | 10 | 0 | `color` (paint) |

So Apple animates `height` on the flyout and pays layout on each of about 15 frames. It keeps that cheap by placing the panel absolutely with `overflow: hidden`: the box that resizes has no siblings to push, and the content inside (68 nodes) moves only by `opacity` and `transform`.

### What each one says, and why it feels light

- **G1.** "This is a door": the label simply gets darker. It feels light because nothing moves and the change is 20 % of ink over a third of a second.
- **G2.** "Here is what is behind Mac": the panel grows out of the bar it belongs to and the links fall into place 4 px, in reading order. It feels light because the travel is short (4 px per link, one curve for the panel), the panel is fast (254 ms) and the links, which carry the weight, take longer and arrive later: the surface first, then its content.
- **G2b.** "One sheet of glass": the page goes soft as the panel opens. It feels light because only one layer is ever translucent: the bar hands its blur to the growing panel, and once the panel is opaque the curtain alone blurs the page.
- **G3.** "Same place, next menu": only the height corrects, in 120 ms, and the words swap without a stagger. It feels light because a slide along the bar never replays the entrance.
- **G4.** "Going": the content leaves before its container, faster than it came (160 to 240 ms against 320 ms) and last item first, and the panel waits 120 ms before it folds. It feels light because the exit is shorter than the entrance and nothing is left hanging.
- **G7.** "Menu, now close": the glyph's own two strokes become the X. It feels light because nothing is added; two lines, two legs, a quarter second, the first leg accelerating and the second settling.
- **G5.** "Type here": the field arrives 200 ms after the sheet opens, then the suggestions one per 20 ms. It feels light because each piece moves 4 px and the stagger is short enough to read as one gesture.

## 2. The local nav on a product page (airpods-pro)

Measured on `/airpods-pro/` (`/iphone-17-pro/` now redirects to `/iphone/`, which has no local nav). `#ac-localnav`, 32 nodes, sticky.

| # | name | trigger | what changes | properties | in: duration, easing | out | delay | DOM nodes added | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| L1 | local nav sticks | scroll past the top | the white bar turns to glass | `.ac-ln-background` `backdrop-filter` none to `saturate(1.8) blur(20px)` (frames read: blur 0, 1.7, 3.9, 8.0, 9.4, 15.8, 16.5, 17.6, 18.5, 18.9, 19.9, 20 px); `background` to `rgba(250,250,252,.8)` | 240 ms `cubic-bezier(.28,.11,.32,1)` | the same transition back | 0 | 0 | a CSS transition **on `backdrop-filter` itself**, so the filter is recomputed on each of those frames (one 52 px bar, once per crossing) | same: `backdrop-filter` transition 240 ms; frames read blur 5.4, 13.1, 17.9, 19.7, 20 px |
| L2 | local nav Buy button hover and press | pointer | fill a shade lighter, then a shade darker | `background` rgb(0,113,227) to #0076DF; press #006EDB | **cut** (no `transition` on `.ac-ln-button`) | cut | 0 | 0 | three custom properties (`--sk-button-background`, `-hover`, `-active`) and `:hover`/`:active` | CSS read; the live probe could not reach the button once the bar collapsed on scroll |
| L3 | menu tray (below 834 px) | tap the chevron (CSS read) | the tray opens down; the links arrive top to bottom | tray `max-height` 0 to its natural height; curtain `opacity` and `backdrop-filter: blur(0)` to blur; each link `opacity` and `transform` | tray 320 ms `cubic-bezier(.4,0,.6,1)`, delay 240 ms; links 320 ms, delays 260 to 400 ms by 20 | links leave 400 ms down to 260 ms (last first, shorter), tray after 240 ms | | 0 | state held by a hidden checkbox (`#ac-ln-menustate:checked ~ …`), so it opens with no script | unmeasured |

- **L1.** "You are now inside the page": the bar frosts as content slides under it. It feels light because it happens once, at the crossing, in a quarter second; at rest the bar is plain white.
- **L2.** "Pressable": the blue barely moves. It feels light because it is almost nothing; it is a cut, though, both ways.

## 3. Buttons and links (home page)

| # | name | trigger | what changes | properties | in | out | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| B1 | pill button (`a.button`, "Learn more") | hover, press | the blue lifts a shade, then drops a shade | `background-color` rgb(0,113,227) to rgb(0,118,223) on hover, rgb(0,110,219) on press | **cut** (`transition: all` computed means none declared; 0 Animation objects in, out or on press) | cut | 0 | **1** (the anchor; no span, no pseudo-element) | `:hover` and `:active` swap three custom properties; `border-radius: 980px`; no shadow, no transform | same: the same two colours, 0 Animation objects |

Strip: `strips/home-button-hover-cut.png` (the pair). Chromium cost: 0 layouts, 10 style recalcs.

- **B1.** "This is the action": colour carries it, and at rest. The hover is a 2 % shift in the blue; the press is 2 % the other way. It feels light because there is nothing to watch. By the law of `motion-canon.md` P0 it is a cut, so this record takes its restraint (one node, one property, a tiny delta) and supplies a tween.

## 4. Product page scroll: the floating glass pill (iphone, airpods-pro)

The pill (`.all-access-pass`, the gallery's play/pause and dots control floating at the bottom of a media gallery) is the closest thing on apple.com to iOS 26/27 glass. 23 to 35 nodes. At rest its background (`.all-access-pass__background`, a `span`) is: `background-color: rgba(232,232,237,.72)`, `backdrop-filter: blur(7px)`, `border-radius: 28px`, no shadow, no border, sized by `transform: scale()` from a 56 px circle.

| # | name | trigger | what changes | properties | in: duration, easing | out | delay | DOM nodes added | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 | pill intro | the gallery scrolls into view (class `activated`) | a solid grey drop scales up from nothing, then thins into glass | background `transform: scale()` 0 to 1 (samples: 0.007, 0.039, 0.11, 0.23, 0.35, 0.51, 0.66, 0.79, 0.88, 0.94, 0.98, 0.994, 1.0 at 0, 17, 42, 75, 110, 158, 217, 293, 376, 475, 609, 809, 1376 ms from first motion); then `--alpha` 0 to 1, which drives `background-color` alpha 1.0 to .72 and `backdrop-filter: blur(calc(7px * (2 - var(--alpha))))` 14 px to 7 px | scale: about 400 ms to 90 %, a long eased tail to 1.0 at about 1.4 s, no overshoot; fill and blur: about 1 s, decelerating | not observed (stays) | dots: 740 ms; play button 940 ms | 0 | **script**: inline `style` written per frame (1,253 writes to the background in 660 frames), a `--alpha` and `--scale` custom property feeding `calc()` in the CSS; dots and button then enter by CSS transitions (`opacity` 100 ms `ease-in`, `transform: scale(.5)` to 1, 200 ms `ease-out`) | same: inline writes per frame (1,047 to the background), scale and blur track Chromium within a frame; blur reads 13.9, 12.9, 11.5, 10.4, 9.4 ... 7.0 px |
| S2 | scroll-linked sections | scrolling | section headers, cards and tiles fade and rise as they enter | inline `style` on each element (for example 198 writes each to section headlines and card containers over 60 scroll steps) | per scroll position, no clock | reverses with scroll | | 0 | script reads scroll and writes inline styles; no CSS `animation-timeline`, `view-timeline` or `scroll-timeline` in any stylesheet read | same technique (inline style writes per frame) |

Cost, Chromium, 60 wheel steps of 120 px over about 3 s: **390 layouts, 781 style recalcs, 22 ms of layout** on `/iphone/`; 407 layouts, 1,168 recalcs, 29 ms on `/airpods-pro/`, over about 655 frames. That is a layout about every second frame, cheap each time. The pill's blur is recomputed on every frame of its 1 s glass phase (a 56 px circle); the local nav's on every frame of its 240 ms crossing (L1).

- **S1.** "Controls for what you are watching": the control arrives as a drop and turns to glass. It feels light because the drop is small (56 px), the scale front-loads its travel (half the size in 160 ms) and the fill thinning happens after the shape has settled, so the eye reads one arrival, then a material.
- **S2.** "Keep going": copy rises into place as you read. It feels light because each element moves little and the motion is tied to the scroll, so it never runs ahead of the reader.

## 5. The store: cards, segmented tabs, pickers

| # | name | where | trigger | what changes | properties | in | out | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| K1 | card hover | `/store`, `.rf-ccard-content` | pointer enters (also `:focus-within`) | the card grows 1 % and its shadow deepens | `transform: scale3d(1.01,1.01,1.01)`; `box-shadow` `2px 4px 12px rgba(0,0,0,.08)` to `2px 4px 16px rgba(0,0,0,.16)` | 300 ms `cubic-bezier(0,0,.5,1)` on both | **the same 300 ms back** (one `transition` declaration serves both ways) | 0 | 35 (the card) | two-property CSS transition; scale and shadow together, as the HIG pointer page says (below); suppressed while the shelf scrolls (`:not([data-core-scroller-transition])`) and on touch (`html.no-touch`) | same: both transitions 300 ms, same curve, same end values; strip `store-card-hover-webkit.png` |
| K2 | segmented tab pill | store pages, `.tabnav-pill` (CSS read; no instance was found on the pages loaded) | select a tab | a dark pill slides to the tab; the label turns white as the pill arrives | `::before` `inset-inline-start` and `width`; label `color` | pill 320 ms `ease-out`; new label `color` 160 ms `ease-in` **after 160 ms**; old label `color` 120 ms `ease-out` | | label delay 160 ms | 0 (the pill is the list's `::before`) | two transitions on one pseudo-element whose position and width come from script-written custom properties (`--indicator-left`, `--indicator-width`); `@media (prefers-reduced-motion: reduce) { transition: none }` | unmeasured |
| K3 | configurator picker | `/shop/buy-iphone/iphone-18-pro`, `.form-selector-label` | hover; select | hover: border a shade lighter; select: border blue and 2 px | `border-color` rgb(134,134,139) to rgb(143,143,148); checked: `border-color: #0071e3`, `border-width` 1 to 2 px with `padding` 15 to 14 px so nothing moves | **cut** (0 Animation objects; no transition on the label) | cut | 0 | 37 | `:hover` and `:checked ~ label` on a hidden radio | same: the same border shift, 0 Animation objects |
| K4 | colour swatch | same page, `.colornav-link` (CSS read; the click changed no state on the page as loaded) | select | a 2 px blue ring around the swatch; the colour name appears below | `border-color`; the label's `clip-path` none and `clip: auto` | cut | cut | 0 | 21 for the row | `:checked ~ .colornav-link` | unmeasured |
| K5 | timed pager dots | product and store galleries, `.dotnav-timed` (CSS read) | the gallery advances | the current dot stretches into a track that fills with time; the last dot shrinks back | dot `width` 250 ms `linear`; fill `@keyframes dotnav-timed-animation`; previous `dotnav-timed-dot-shrink` 250 ms `ease-out` then `scale`; overflow dots `dotnav-become-visible` (`opacity` 0 and `scale` 0 to 1) | 250 ms | 250 ms | 160 ms before the end | 0 | CSS keyframes and transitions keyed by state classes; hover 120 ms `linear` | unmeasured |

Strips: `strips/store-card-hover.png` (K1, 0 to 300 ms by 37.5 ms; the 1 % growth is visible only as a sharpening of the shadow, which is the point), `strips/picker-hover-cut.png` (K3, the pair). Chromium cost of K1: 1 layout, 90 style recalcs.

- **K1.** "You can open this": the card comes 1 % closer and lifts. It feels light because 1 % is below what you notice as growth, and the curve is a decelerating ease with no overshoot, the same both ways.
- **K2.** "This one now": the pill travels, and the label waits for it before it changes colour. It feels light because colour never runs ahead of the shape.
- **K3, K4.** "Chosen": a border thickens without shifting a pixel (the padding gives back what the border takes). It feels exact rather than light; both are cuts.
- **K5.** "Next is coming": the current dot is a progress bar. It feels light because it is the only thing that moves and it moves at the speed of time.

## 6. Apple's design guidance as the site states it today

Read on 2026-11-12 from developer.apple.com/design (the HIG data behind each page). The HIG has no page called "iOS 27" or "macOS 27". The 27-cycle changes are dated in "What's new": 8 June 2026 (Design principles reintroduced; scroll edge effects, tab bars, sidebars, menus, search updated; SF Symbols 8, Icon Composer 2), 17 September 2026 (iOS, iPadOS and macOS 27 UI kits), 9 September 2026 (iPhone Duo), and 28 October 2026 (touch input on macOS, "revealing hidden controls with touch on Mac"). The Materials page was last changed 9 September 2025 and Motion 9 September 2025. So the Liquid Glass guidance in force is the 26-cycle text, refined.

**Hover, press, state change.**

- Buttons: "Always include a press state for a custom button. Without a press state, a button can feel unresponsive." (No shape of press is prescribed.)
- Pointing devices, three effects, chosen by the control: highlight, "a Liquid Glass shape between the pointer and the control ... The subtle highlighting and movement bring focus to the control without distracting people" (bar buttons, tab bars, segmented controls, edit menus); lift, "scaling the element up while adding a shadow below it and a soft specular highlight on top of it" (standalone glass controls, app icons); hover, custom "scale, tint, or shadow" for large elements.
- "Use highlight for a group of controls placed within a Liquid Glass container. Use lift for a standalone Liquid Glass control ... Use hover for large elements."
- "Reserve scaling for elements that can increase in size without crowding nearby elements ... For an element that has little space around it, consider using a hover effect that includes tint, but not scale and shadow. ... it doesn't work well to use shadow without including scale."
- "Create contiguous hit regions for custom bar buttons. If there's space between the hit regions ... the highlight shape briefly disappears as the pointer moves between buttons."
- "Avoid creating gratuitous pointer and content effects ... A purely decorative pointer effect can distract and even irritate people."
- Toolbars: "the system defines hover and selection state appearances automatically"; "Prefer system-provided symbols without borders."
- Motion: "Add motion purposefully ... Don't add motion for the sake of adding motion." "Aim for brevity and precision in feedback animations ... brief and precise ... feel lightweight and unobtrusive." "In apps, generally avoid adding motion to UI interactions that occur frequently." "Let people cancel motion." And from watchOS, true of the system: "All layout- and appearance-based animations automatically include built-in easing that plays at the start and end of the animation."
- Liquid Glass "responds to direct touch interaction with greater emphasis ... but produces a more subdued effect when a person interacts using a trackpad."

**How glass is layered.**

- "Liquid Glass forms a distinct functional layer for controls and navigation elements ... that floats above the content layer." "Don't use Liquid Glass in the content layer." One exception: a slider or toggle "takes on a Liquid Glass appearance to emphasize its interactivity when a person activates it". The glass is a state, not a rest look.
- "Use Liquid Glass effects sparingly ... overusing this material in multiple custom controls can provide a subpar user experience ... Limit these effects to the most important functional elements."
- Two variants only: regular (blurs and adjusts luminosity, for text-bearing surfaces) and clear (for media, with "a dark dimming layer of 35% opacity" when the content is bright).
- Colour: "By default, Liquid Glass has no inherent color ... Apply color sparingly ... To emphasize primary actions, apply color to the background rather than to symbols or text."
- Toolbars: "Reduce the use of toolbar backgrounds and tinted controls." Scroll edge effects "aren't decorative ... Apply one scroll edge effect per view."

**Restraint.** Design principles (8 June 2026): "Simplicity ... removes the unnecessary, with every element earning its place." "Include just what's necessary. Simplicity isn't minimalism." "Don't mistake delight for decoration." "Use natural animations to ease transitions." Pointing devices: "Avoid displaying instructional text with a pointer."

In short, the system draws one glass layer per control group, gives a group one highlight shape that moves between members, and adds lift (scale plus shadow plus a soft highlight) only to a control that stands alone.

## 7. The CSS Apple ships, read end to end

### One glass surface: the global nav bar

Everything that paints the bar, from `globalheader.css` (170 KB; comments stripped):

```css
#globalnav { position:absolute; top:0; right:0; left:0; z-index:9999; height:48px; max-height:44px;
             backdrop-filter: var(--globalnav-backdrop-filter) }
@media (min-width: 834px) { #globalnav { background: var(--globalnav-background) } }
.globalnav-scrim #globalnav { --globalnav-background: rgba(250,250,252,.92) }
@supports (backdrop-filter: initial) {
  .globalnav-scrim #globalnav { --globalnav-backdrop-filter: saturate(180%) blur(20px);
                                --globalnav-background: rgba(250,250,252,.8) } }
.globalheader-dark #globalnav.globalnav-scrim { --globalnav-background: rgba(22,22,23,.8) }
#globalnav.globalnav-with-flyout-open { background:none; backdrop-filter:none }
```

That is the whole material: one fill and one filter on one element. Counts across the whole file: `box-shadow` 0, `linear-gradient` 0, `radial-gradient` 0, `text-shadow` 0, `will-change` 1 (a progress spinner), `-webkit-backdrop-filter` 0 (the unprefixed property alone, which shipping Safari accepts from 18), `prefers-reduced-motion` 0. The same zeros for shadows and gradients hold in `ac-localnav.built.css` (81 KB) and the home page's `main.built.css` (128 KB, which also has 0 transitions and 0 backdrop filters).

### One animated control: the store's segmented tab pill

All of `.tabnav-pill` (11 rules; the base `.tabnav` supplies spacing tokens):

```css
.tabnav-pill .tabnav-items { position:relative; transition: transform .32s ease-out }
.tabnav-pill .tabnav-items:before { content:""; position:absolute; border-radius:999px; background:#1d1d1f;
  top:var(--indicator-top,0); inset-inline-start:var(--indicator-left,0);
  width:var(--indicator-width,0); height:var(--indicator-height,0);
  transition: inset-inline-start .32s ease-out, width .32s ease-out }
@media (prefers-reduced-motion: reduce) { .tabnav-pill .tabnav-items:before,
                                          .tabnav-pill .tabnav-items { transition:none } }
.tabnav-pill .tabnav-item { position:relative; z-index:1; padding:0; border-bottom:none }
.tabnav-pill .tabnav-item .tabnav-link { border-radius:99px; color:#1d1d1f; padding:0 16px; transition: color .12s ease-out }
.tabnav-pill .tabnav-item .tabnav-link.current { color:#fff; transition: color .16s ease-in .16s }
.tabnav-pill .tabnav-item .tabnav-link.current:focus-visible { box-shadow: inset 0 0 0 2px var(--tabnav-focus-color); outline:none }
```

One pseudo-element is the moving shape. Script writes four custom properties; CSS does the travel. The label's colour waits half the travel. There is no extra node, no shadow at rest, no gradient, no spring, and no hover state on the pill.

Note: the pill animates `inset-inline-start` and `width`, which are layout properties, on an absolutely placed pseudo-element with no children, so each frame lays out one empty box.

## 8. The two engines

Every motion driven in both engines started the same Animation objects with the same durations, delays and easings, and reached the same end values: G1 to G5, L1, B1, S1, S2, K1, K3. No motion on apple.com, as served on 2026-11-12, used a technique one engine runs and the other does not. The techniques Apple chose are all old and shared:

| technique | where | Safari floor (documented) |
|---|---|---|
| CSS transitions on `height`, `opacity`, `transform`, `color`, `background-color` | G1 to G4, K1, K2 | long-standing |
| CSS transition on `backdrop-filter` itself | L1 | unprefixed `backdrop-filter` from Safari 18; the local nav also writes `-webkit-backdrop-filter`, the global header does not |
| `@keyframes` between two script-written custom properties (`height: var(--previous)` to `var(--next)`) | G3 | long-standing (custom properties resolved at keyframe time) |
| stagger by `calc(var(--index) * 20ms)` in `transition-delay` | G2, G4, G5, L3 | long-standing |
| inline styles written by script per frame, feeding `calc()` | S1, S2 | any |
| `:checked ~` sibling state for a menu with no script | L3, K3, K4 | any |
| `@supports (backdrop-filter: initial)` to choose between a blurred .8 fill and a plain .92 fill | the bar | any |

What Apple does not use, in any of the eight files read: `linear()` easing, `@starting-style`, `transition-behavior: allow-discrete`, `interpolate-size` or `calc-size()`, `animation-timeline`, view transitions, `corner-shape`, `d: path()`, `container-type`, or a transition on `clip-path`; and no Web Animation object (`element.animate`) was observed on any page driven. The newer features it does use are `:has()` for state (172 times in the iPhone sheet, 91 in the store's), `@property` to make a mask's colour custom properties transition (the tab bar's and chapter nav's edge fades), and one guarded `@supports (width: calc(sibling-index() * 1px))`. Apple's height motion is the oldest one there is: measure in script, write the height to a custom property, let a CSS transition on `height` run.

Unmeasured in WebKit: layout cost (no CDP counter), G6 (not driven), L2, L3, K2, K4, K5 (CSS read only).

## 9. Press, in one place (for the press-shrink question in the brief)

- **The HIG** requires a press state ("Always include a press state for a custom button") and does not say what shape it takes. Its pointer effects (highlight, lift, hover) are hover states; lift scales up, and nothing in the guidance scales a control down on press.
- **apple.com and the store** press by colour only: the pill button and the local nav Buy button go 2 % darker (`--sk-button-background-active`), as a cut, with no transform (B1, L2). Links, the nav, cards and pickers have no `:active` change at all.
- **The one press shrink** in the files read is the store's video player: `.rc-videoplayer-controls-center:active .rc-videoplayer-button { transform: scale(.9) }`, with no transition declared, so it is a cut down and a cut back.

So on the web Apple's press is a colour step, and its only shrink is untweened. A press shrink with an eased start and return would be glass's own addition, not a copy.

## 10. What Apple does not do

Every item below was counted in the stylesheets read (global header, local nav, home page, iPhone overview, store home, store configurator) or observed live.

- **No shadow on glass.** The nav bar, the curtain, the local nav, the floating pill and the flyouts carry no `box-shadow`. The global header and local nav files have none at all. The shadows that exist are on opaque store cards (one layer each, `rgba(0,0,0,.08)`), and one hover deepens that single layer.
- **No border or rim on glass.** No inner glow, no 1 px light edge, no inset highlight on the bar, the flyout or the pill. The local nav's only line is a 1 px `::after` hairline at `rgba(0,0,0,.16)`.
- **No gradient on a control.** 0 `linear-gradient` and 0 `radial-gradient` in the header, local nav and home files. Gradients appear only as masks (a fade at a scroller's edge) and as the swatch ring's conic border, which is data.
- **No specular, no sheen, no text shadow.** 0 `text-shadow` everywhere read.
- **No stacked blur.** When a flyout opens the bar drops its filter; the growing panel carries the blur only while it animates; at rest the panel is opaque and the curtain alone blurs the page. One translucent layer at a time.
- **No transition on the primary button.** The blue pill button changes colour by 2 % on hover and press, as a cut. No scale, no lift, no shadow, no ripple, no press shrink. The one press scale found is `.rc-videoplayer-controls-center:active .rc-videoplayer-button { transform: scale(.9) }` on a video control, with no transition.
- **No shape morph on a resting control, and one icon morph in all.** Corner radii never animate (`980px` pills, `28px` cards, constant). The only glyph that changes shape is the small-screen menu icon (G7), and it does so by moving its two existing strokes.
- **No wrappers for motion.** The button is one node. The tab pill is a `::before`. The flyout's links move by their own `transform`. The bar's material is two declarations on the bar.
- **No overshoot on a control.** Every curve read on a control is a decelerating or standard ease: `cubic-bezier(.4,0,.6,1)`, `cubic-bezier(0,0,.5,1)`, `cubic-bezier(.28,.11,.32,1)`, `ease`, `ease-out`. No `linear()` springs. The floating pill's scripted scale settles without passing 1.
- **No long frequent feedback.** Link colour 320 ms, card 300 ms, tab pill 320 ms, local nav frost 240 ms. The 760 ms flyout is a whole menu arriving, and its panel alone takes 254 ms.
- **No entrance replay on change.** Sliding from Mac to iPad corrects only the height in 120 ms; the incoming links do not stagger.
- **No exit slower than its entrance.** Flyout content leaves in 160 to 240 ms against 320 ms in, last item first; the search links in 60 to 160 ms.
- **No CSS scroll timelines.** Scroll-linked motion is script writing inline styles; 0 `animation-timeline` in any file read.
- **No reduced-motion branch in the global header CSS.** 0 `prefers-reduced-motion` rules in `globalheader.css` (the store's sheets have 18, each setting `transition: none` on a tab pill, accordion or fade). Whether script switches the nav to its `globalnav-block-transitions` class under reduced motion was not tested.

Where Apple does what `restraint.md` forbids: `transition: all` appears three or four times in each store sheet and once in the global header (the bag badge's removal); and the flyout's panel and the tab pill animate layout properties (`height`; `inset-inline-start` and `width`), on boxes kept cheap by absolute placement.

Where Apple itself cuts, and the law of `motion-canon.md` P0 does not: the pill button's hover and press (B1, L2), and the picker and swatch selection (K3, K4). These are the places this study keeps Apple's economy and adds the tween Apple leaves out.
