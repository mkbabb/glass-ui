# Depth and parallax: the record

What the best current sites do when (a) text passes behind or in front of a figure and (b) layers move at different rates under scroll or pointer. Read on 2026-11-14 in headless Chromium and Playwright WebKit, every run under `guarded`. Each section reads the mechanism first, then the numbers, the engines, and what is deft about it and what is not.

## How it was read

- **Recon.** `scripts/scan.mjs` loaded each candidate at 1440 x 900 and scrolled it by mouse wheel in 100 px steps. It read four things. First, every text node of 40 px or more and whether something else is topmost at a 7 x 3 grid of points inside its line boxes, which is how covered text was found. Second, a census of every element's `animation-timeline`, view and scroll timelines, `mask-image`, `clip-path`, `mix-blend-mode`, sticky, `preserve-3d` and `perspective`. Third, the CSS text fetched over the network. Fourth, the rate of each large layer under scroll. The raw scans are `data/recon-*.json`.
- **Drill.** `scripts/drill.mjs` took one case at a time from a spec in `scripts/specs/`. It dumped the section's layer tree with stacking facts, sampled the named layers at every 100 px step, and checked which named text was covered and by what. Each step it also counted inline `style` writes per element, which shows script-driven motion, and took a Chromium `devtools.timeline` trace across the scroll. It ran three modes: 1440 wide, 1440 under `prefers-reduced-motion: reduce`, and 390 x 844. The output is `data/drill-<case>-<engine>.json`, and `scripts/readdrill.py` prints it.
- **Rate.** "Rate 100" means the layer moved 100 px for 100 px scrolled, the same as the page. "0" means pinned. "86.5" means it lagged 13.5 px per 100. Rates are measured from `getBoundingClientRect().top` between steps, so they include any transform.
- **Pointer.** `scripts/pointer.mjs` moved the pointer through five stops across each hero and recorded every element whose transform changed (`data/pointer-chromium.json`).
- **Strips.** `strips/<case>-scroll-chromium.png` holds five to nine frames through the scroll at 1440. `strips/<case>-rest.png` holds the rest state, a reduced-motion frame and three frames at 390. WebKit strips are named `-webkit`.
- **Gates.** Age, cookie and region prompts were dismissed by `scripts/gate.js`, or by a pointer click where a page ignored a scripted one (SMWS).

## How the sites were chosen

The Apple and Google targets came from the brief. For the rest, a web search for text-behind-subject sites returned tutorials and trend pieces, not sites, so I took candidates from two other sources: the Awwwards `parallax` inspiration tag, and product and studio sites known for layered heroes. Twenty of them went through the recon scan. A site stayed only if the scan measured real occlusion of text by a figure, or a layer moving at a rate other than 100.

Eight of the twenty showed real depth and were read: Stripe, Rivian R2, SMWS Outturn, Aupale, Oura, 2025.unseen.co, landonorris.com and torii.studio. The last three are dropped below as heavy-handed, with the measurements that say so. The first five are drilled in full. Aupale is kept though it is not deft, because it is the one case that does both halves at once (text behind figures, and several layers at several rates) and so shows the cost.

Dropped, with the reason:

| Site | Why it was dropped |
|---|---|
| 2025.unseen.co | Heavy-handed. A full-viewport WebGL canvas, 250 px year words at `z-index: -1` with `mix-blend-mode: difference`, `perspective: 200px` on 25 nodes, 353 nodes moving with the pointer and 1,224 style writes in a 24-step scroll. Depth is everywhere, so it carries no meaning anywhere. |
| landonorris.com | Heavy-handed for this purpose. Six canvases, including a WebGL helmet, Lenis smooth scroll, and type revealed by `clip-path: inset()` per line. No text passes behind a figure in the DOM; what depth there is lives inside the canvas. |
| torii.studio | Two full-viewport canvases paint over the hero headline, so the scan finds the text 100 % covered by `canvas`. It is a WebGL orb, not a layer a CSS library can compose, and its pointer motion is a custom cursor follower plus a spinning badge. |
| linear.app | No depth under scroll. Every tracked layer ran at exactly 100. Its 3D look is a static `perspective: 1000px` on one later section. |
| framer.com | No occlusion and no parallax. 1,834 style writes in the scroll came from video and card reveals. |
| github.com | Word-by-word reveal with 1,093 writes on `span.word`, 571 layouts and 204 ms of layout in a 24-step scroll. The mascot sits above a rule, which is not text behind a figure. |
| nothing.tech | Plain text over a photograph. No layer at another rate (its 95 to 105 wobble is Lenis smoothing, not a layer). |
| samsung.com Galaxy Z Fold7 | A black scrub reveal ("Ultra Unfolds") whose one moving text runs at 143 to 150 for two steps. Nothing passes behind anything. |
| teenage.engineering | No depth: every layer ran at 100, nothing covered any text, no mask, blend or sticky stage. |
| polestar.com Polestar 4 | No depth: every layer ran at 100; the only covered text was under the cookie dialog. |
| consumer.huawei.com Watch GT5 Pro | Navigation menus account for the only coverage. No hero depth. |
| eclettica.bulgari.com, bang-olufsen.com, electronics.sony.com, dji.com/osmo-360 | Did not render to a headless browser (blank 900 px document, or a 404). |

The Google targets are recorded below; m3.material.io and the Pixel 10 Pro page have no depth to record, and that is stated in their sections.

## Across the record, in one table

| Case | Text and figure | Mechanism | What drives it | Layer rates (per 100 px) | Reduced motion | Layout per frame |
|---|---|---|---|---|---|---|
| Apple iPhone 18 Pro hero | the phone passes through chrome "PRO" letters | baked into one video; real text sits beside it, never across | none at rest | all 100 | video box static; entrance rise absent | none from the hero |
| Apple Vision Pro hero | text in front of the figure | figure pinned by `position: sticky`; the next section, a frosted sheet, scrolls over it | sticky plus script writing two custom properties | hero 0 for 900 px, sheet 100 | pin and sheet stay, ramp skipped | 24 layouts / 1.9 ms in 22 steps |
| Apple AirPods Pro and Max heroes | text in front of the figure | one `backdrop-filter: blur(20px)` layer under a gradient `mask-image`, behind the headline | none, static | all 100 | identical | none from the hero |
| Apple section entrances | text rises into place | `translateY(30px)` to 0 with opacity 0 to 1, per element | script, per frame | about 129 for one step | absent | inline transform and opacity writes |
| design.google "Recent" grid | none | columns start 130 to 174 px low and catch up | script, per frame (4,022 writes) | 115 to 135 | absent | 123 layouts / 7 ms |
| Stripe hero | text behind AND in front of the wave | the h1 rendered twice: one copy under the wave, one aria-hidden copy over it in `mix-blend-mode: hard-light` | static | all 100 | identical | none from the hero |
| Rivian R2 hero | the type line holds the figure | aria-hidden canvas lettering "R 2" beside a pill window (`clip-path: inset(0 round 999px)`) of video | script; wheel snaps 213 to 800 px | 170 then 100 | no snap | 25 layouts / 1.9 ms |
| SMWS Outturn hero | text in front of a growing figure, then a sheet over the text | sticky stage; a video window scales 0.5 to 0.99; the next section's black sheet, with a masked leading edge, covers the title | script (Framer + Lenis) | stage 0, window scale only | scale absent | 11 layouts / 0.6 ms |
| Aupale | text behind moving cards; four layers at four rates | per-layer translate written by script under Lenis | script, per frame | 113, 68, 77, 62 (then 1, 10, -5) | ignored: identical | 895 layouts / 35 ms, 920 ms style |
| Oura | none | image inside a clipped card lags the card | script (Framer Motion), per frame | card 100, image 86.5 | unmeasured (popup) | 7 layouts / 0.6 ms |

Three facts hold across every case:

- **No site drives hero depth with `animation-timeline`.** The census found `animation-timeline` on Stripe (one nav element, `scroll(self inline)`, used to detect overflow) and in GitHub's CSS (overflow detection on dialogs and tab bars). In every case above, the motion comes from a sticky pin, a script writing transforms per frame, or nothing at all.
- **Apple's heroes do not parallax.** Every hero layer on four Apple pages moved at exactly 100, or was pinned at 0. Their depth comes from the picture itself, a pin with a sheet over it, or a blur scrim behind text.
- **No site layers depth by pointer.** The pointer probe moved nothing on the Apple, Google, Stripe, Rivian, Oura or Linear heroes. Where nodes did move with the pointer, they were custom cursors (Torii's follower) or loops that run on a clock regardless (Aupale's grain layer, Stripe's logo marquee, Unseen's balloons).

---

## Apple

### iPhone 18 Pro: the product through the letters

**Source:** https://www.apple.com/iphone-18-pro/ · strips `a-iphone18pro-scroll-chromium.png`, `a-iphone18pro-rest.png`

**Mechanism.** The hero picture, where the phone passes through the chrome letters of "PRO", is not built from layers. It is one video (`video#media-hero-video`), stacked with a start-frame and an end-frame `picture` at `z-index` 4 and 3 that fade by `opacity 0.2s`. The real HTML is `div.marquee` at `z-index: 1`. Its `h1` eyebrow ("iPhone 18 Pro"), its `p.marquee-headline` ("Pro further.") and the price platter all sit in the lower band of the frame, where the video is dark and empty. The text never crosses the product. Coverage of both text nodes was 0 of 15 steps, at 1440 and at 390.

**Numbers.** Every hero layer moved at 100. The media box carries `transform: translateX(-720px)`, which centres it at width 0; it does not move with scroll. Below the hero, "Get the highlights." enters from `translateY(30px)` with `opacity: 0` and arrives within one 100 px step at 1440 (30, then 29.1, then 0.29 px; opacity 0.02, then 0.85). At 390 it arrives across five steps (28.8, 24.2, 15.7, 6.6, 0 px). Script writes each frame inline: 196 writes on the heading in the 390 run. The trace shows 191 layouts (23 ms) in 14 steps, and a 3.3 s style-recalculation total that the record did not attribute to any one element.

**Reduced motion.** The hero video element reads rate 0 under `reduce` and at 390, meaning its box stays put while the page scrolls past it. The record did not establish why (a poster frame takes its place in the strip). The entrance rise is absent: the heading sits at rate 100 with no writes.

**Deft.** The interleave costs the page nothing at runtime, and no text is ever unreadable, because no text is ever covered. The only words on the picture are the ones designed into it.

**Not deft, for a library.** It is a picture. The letters cannot be selected, translated or restyled, and it needs a film crew. It shows the bar the eye expects from text and figure woven together, not a method a component can reuse.

### Vision Pro: a pinned figure, and text on a frosted sheet over it

**Source:** https://www.apple.com/apple-vision-pro/ · strips `a-visionpro-scroll-chromium.png`, `a-visionpro-rest.png`

**Mechanism.** `section.section-hero` is 1,800 px tall. Inside it, `div.sticky-container` is `position: sticky; top: 52px; z-index: 0`, holding the hero image (`img.hero-img`, 933 x 933) and a white gradient (`linear-gradient(0deg, rgba(255,255,255,.65), rgba(255,255,255,.3) 50%, …)`) over its lower 382 px. The next sibling, `section.section-foundation`, carries the copy container at `z-index: 2`. As it scrolls up over the pinned hero, script writes two custom properties onto it, `--css-blur-intensity: 30` and `--css-scrim-opacity: 1` (16 writes across the scroll). Those drive two pseudo-elements of the section, read in the WebKit pass. `::before` is `position: absolute`, 900 px tall, with `backdrop-filter: blur(20px)`. `::after` is a fill of `rgb(251,251,253)` whose opacity follows `--css-scrim-opacity`. Together they make the area under the copy a frosted sheet. The hero shows through blurred, and the three headline lines read in front of it.

The strip shows it plainly. The figure stays put, a sheet of frost rises to meet it, and the text arrives on the sheet.

**Numbers.** The hero layers ran at 0 for nine steps (900 px), then 56 and 100. The sheet and its text ran at 100 throughout. The text is never covered by the figure, only by the local nav bar as it passes the top (2 of 23 steps). The trace counted 24 layouts (1.9 ms), 364 style updates (19 ms) and 776 paints (33 ms) in 22 steps, with 337 animation-frame callbacks. The foundation section is marked `will-change`.

**Reduced motion.** The pin and the frost both remain, with the sheet fully frosted; only the scripted ramp is skipped. The custom properties are never written, and the strip's reduced-motion frame shows the sheet already blurred. Depth by occlusion survives; the motion does not. That is the split the brief asks for.

**At 390.** Same structure. The pin holds for eight steps, and the copy wraps to five lines and stays legible on the frost.

**Deft.** One pin and one sheet, so depth is read from a single cover. The figure never moves, so nothing competes with the words. The legibility comes from the blur, not from darkening the image.

**Not deft.** The frost ramp is written by script on scroll, where a scroll-driven animation on the sheet would do. The pin also costs 900 px of scroll in which nothing but the sheet happens.

### AirPods Pro and AirPods Max: the progressive blur scrim

**Source:** https://www.apple.com/airpods-pro/ and https://www.apple.com/airpods-max/ · strips `a-airpodspro-*`, `a-airpodsmax-*`

**Mechanism.** The headline sits over the lower part of a full-bleed hero video. Between them is `div.marquee-scrim`, `position: absolute`, covering the headline band (414 px on Pro, 218 px on Max), with:

- `backdrop-filter: blur(20px) saturate(1)` and a translucent white fill (`rgba(255,255,255,.56)` on Max);
- `mask-image: linear-gradient(rgba(…,0), rgba(…,.035) 6.25%, rgba(…,.08) 12.5%, …)` on Pro, a many-stop ramp that eases the blur in from nothing at the top edge; `linear-gradient(transparent, black)` on Max.

On Pro the scrim is `z-index: -1` inside the `z-index: 1` marquee, so it sits behind the text and in front of the video. One element and one backdrop filter give a blur that grows down the frame, so the figure stays sharp above the text and softens only where the words sit.

**Numbers.** All hero layers moved at 100: no parallax. At 390 the Pro scrim's blur rises to `blur(37px)`, a separate breakpoint value. The Max video box rests at `scale(1.055)` at 390 and does not change with scroll. The trace counted 282 layouts (26 ms) in 14 steps on Pro and 257 (15 ms) on Max, almost all from the gallery below the hero (1,092 and 1,893 writes on `all-access-pass__background`).

**Reduced motion.** Identical. The scrim is static.

**Deft.** It is the smallest correct answer to "text in front of a figure, readable". One layer, one filter, one mask, no script and no motion. The words stay crisp while the figure behind them stays whole.

**Not deft.** Nothing in the hero. Lower on the page, the sticky gallery control writes inline styles over 1,000 times in a 14-step scroll.

### The section entrance, on every Apple page

Every Apple page above brings section headings, copy and gallery cards in from `translateY(30px)` and `opacity: 0`, with `will-change: opacity, transform` declared at rest. Script writes the transform and opacity each frame. At 1440 the travel is done within about one 100 px step, so the layer reads at a rate of about 129 for that step. At 390 it is spread over five steps. These samples cannot separate a time-based entrance started at a threshold from one mapped to scroll position. Under reduced motion it is absent. It is the only place Apple moves a layer at a rate other than the page's.

---

## Google

### design.google: the staggered grid

**Source:** https://design.google/ · strips `g-design-scroll-chromium.png`, `g-design-rest.png`

**Mechanism.** The hero has two columns, title and video, that both move at 100. There is no pin and no parallax; the recon's apparent title swap was the next row arriving. The depth sits in the "Recent" grid. Each column starts below its place (`translateY(130.8px)`, `174.4px`, and so on, with `opacity: 0`) and closes the gap as it enters. Script writes each frame: 4,022 writes on `div.col-xs-12.col-md-4` in 20 steps.

**Numbers.** The first card's image jumped 2,336 px in one step (a layout jump as the grid above it loaded), then ran at 135, 115, 114, 118, 106, 103, 102 and 100. Trace: 123 layouts (7 ms), 519 style updates (192 ms) and 1,187 animation frames in 20 steps. A custom cursor element, `mix-blend-mode: exclusion`, follows the pointer.

**Reduced motion.** The grid is static (rate 100, no writes).

**At 390.** The columns stack to one, and a later card still enters from 76 px below.

**Deft.** The stagger tells the reader the grid is a set and not a list.

**Not deft.** It is a fade-up on every card, written by script at a cost of 192 ms of style in 20 steps. It adds nothing a reader would miss.

### Google Store, Pixel 10 Pro

**Source:** https://store.google.com/us/product/pixel_10_pro?hl=en-US · strips `g-pixel-*`

No depth to record. The hero headline ("Meet the new status pro.") sits beside the product photograph, never on it (coverage 0 of 17 steps), and every layer runs at 100. One video reads 90 for one step as a sticky sub-nav attaches. Trace: 10 layouts in 16 steps; the page writes almost nothing on scroll. Reduced motion changes nothing. The store home (https://store.google.com/us/) recon showed the same: no sticky stage, no mask, no blend, no timeline.

### Material 3 home

**Source:** https://m3.material.io/ · strips `g-m3-*`

No depth to record. At 1440 the page scrolls an inner container, not the document, so the wheel drill measured nothing. At 390 the document scrolls, and every layer runs at 100. The census found no mask, blend, sticky stage or timeline. Material's own motion guidance lives in its documentation, not in a layered page.

---

## Studio and product sites

### Stripe: one headline, written twice, around the wave

**Source:** https://stripe.com/ · strips `s-stripe-scroll-chromium.png`, `s-stripe-rest.png`

**Mechanism.** This is the third option the brief names: the text rendered twice, with one copy layered differently. The hero holds, in order:

1. `h1.hero-section__title--background`, `position: relative`, `z-index: auto`. Its colour is not fixed: it read `rgb(129,184,26)` in Chromium and `rgb(221,214,0)` in WebKit, while its `em` stayed `rgb(6,27,49)`. It paints under the wave.
2. `div.hero-section__background`, `position: absolute; z-index: 1; aria-hidden="true"`, holding the wave. In headless Chromium this was a static WebP (`wave-fallback-desktop-1x.webp`), because no canvas mounted. In WebKit it was a live WebGL canvas, with the WebP faded to `opacity: 0`.
3. `h1.hero-section__title--foreground`, `position: relative; z-index: 2; mix-blend-mode: hard-light; aria-hidden="true"`, coloured `rgba(0,14,255,.5)` (its `em` is `rgb(45,37,100)`).

Hard light at half alpha leaves the type dark over the white page and lets it take the wave's colour where it crosses it. In the strip, "revenue." turns violet over the wave and stays near-black elsewhere. The eyebrow above it uses `mix-blend-mode: multiply` with a `mask-image` gradient on its rolling counter, and two full-bleed rules use `multiply`.

**Accessibility.** The foreground copy is `aria-hidden`, so a screen reader reads the heading once. It is not unselectable, though (`user-select: auto`), so a drag-select over the heading selects both copies.

**Numbers.** Static: every layer ran at 100, and no transform changed. Coverage was total by design: at every sampled point, the topmost element over the background copy is the foreground copy. Trace: 73 layouts (8 ms) in 8 steps, mostly from the logo marquee below (291 writes).

**Reduced motion and 390.** Identical structure. At 390 the wave image re-centres (`translate(-312px, -487.5px)`), and the copy still crosses it.

**Deft.** It is static, costs two text nodes, and reads once to assistive tech. The colour shift is the depth cue: the text looks to be inside the wave's light, not printed on it.

**Not deft.** The two copies must stay identical by hand. The hidden one is selectable. The blend depends on the colours under it, so a dark mode needs its own pair.

### Rivian R2: the figure sits in the type line

**Source:** https://rivian.com/r2 · strips `s-rivian-scroll-chromium.png`, `s-rivian-rest.png`

**Mechanism.** The visible "R 2" is not text. It is a `canvas` (1,259 x 462) inside an `aria-hidden` layer at `z-index: 20`. The real heading is an `h1.sr-only` reading "Rivian R2". Between the letters, a pill-shaped window (`clip-path: inset(0 round 999px)`, `z-index: 10`, `transform-gpu`) shows a video. A second, smaller pill of the next clip grows inside it to change scenes. The letters flank the window and do not overlap it.

**Numbers.** At 1440 the first wheel step moved the page 213 px and the second jumped it to 800: the hero snaps to the next section. The pill and lettering read 170 for that step, then 100. Trace: 25 layouts (1.9 ms), 701 style updates (66 ms) and 1,136 animation frames in 12 steps.

**Reduced motion.** No snap: 100 px steps throughout. The pill holds still.

**At 390.** The lettering canvas shrinks to 397 x 405 and its layer gains `translate: -50%`. The pill reads 0, a separate fixed treatment.

**Deft.** The picture takes the place of a glyph, so the figure belongs to the headline rather than sitting behind it. The real heading is one sr-only node.

**Not deft.** The type is painted to a canvas, so it cannot be selected or zoomed as text. The scroll snap takes the wheel away from the reader.

### SMWS Outturn: a growing window behind the title, then a sheet over it

**Source:** https://outturn.smwsa.com/ · strips `s-smws-scroll-chromium.png`, `s-smws-rest.png`

**Mechanism.** `div#hero` is `position: sticky; top: 0`, with an inner sticky stage. In the stage, a 720 x 450 video window (`div.framer-12zv8vk`, `will-change: transform`) starts at `scale(0.5)` behind the title "SCOTCH & SMOKE", which sits at `z-index: 1` in front of it. At rest the window shows only as a narrow vertical slit, because two black panels (`div.framer-n5ywki` and `div.framer-h8bp7o`, 288 x 455, `will-change: transform`) cover its sides. As scroll scales the window to 0.99, the panels slide apart. The title crosses the slit at rest, and the full frame once it opens. As the window fills the viewport, the title's contrast falls (it reads grey over the brightest frames in the strip): the figure growing behind the words costs them legibility. Then `div#txtintro`, at `z-index: 2` with a black fill, scrolls up over the pinned title. Its leading edge is `div.framer-121ep87`, 750 px tall at `z-index: 3`, with `mask-image: linear-gradient(transparent, black)`, so the sheet arrives as a feathered dark rather than a hard edge. The fixed header carries a progressive blur built from eight stacked layers, each with its own `backdrop-filter` (0.08 px up to 10 px) and a banded `mask-image`: eight backdrop filters where Apple uses one.

**Numbers.** The stage reads 0 for the whole 2,000 px. Window scale against scroll at 1440: 0.50, 0.51, 0.62, 0.75, 0.76, 0.86, 0.86, 0.92, then easing toward 0.99. The steps are uneven because Lenis smooths the wheel. The title is covered from about 846 px by the intro sheet. Trace: 11 layouts (0.6 ms) and 296 ms of script in 20 steps, with 1,544 writes on one Framer node.

**Reduced motion.** The window does not scale (it stays at 0.5), and the sheet still covers the title. The occlusion survives and the motion stops.

**At 390.** The window grows faster (0.58, 0.74, 0.84, 0.91, 0.94, 0.99 across six steps), and the title stays in front of it.

**Deft.** Text in front of a figure that grows behind it reads as the camera moving in. The feathered sheet edge hands the title over without a cut.

**Not deft.** Eight backdrop filters for one header blur. Smoothed scrolling decouples the stage from the wheel. The window's scale is written by script every frame.

### Aupale: text behind moving cards, four rates at once

**Source:** https://www.aupalevodka.com/en/ · strips `s-aupale-scroll-chromium.png`, `s-aupale-rest.png`

**Mechanism.** Lenis smooth scroll, with each layer translated by script per frame. In the hero, "Born From The Untouched Wilderness." rises faster than the page. In the second section, "We go back to basics, only real ingredients." is held almost still while two image cards (`picture.c-image_inner`, each holding a `mux-video` or an `img` at `scale(1.1)`) and a topographic map (`svg#west`) move at their own rates around and over it. The cards pass over the headline: its line is covered in 26 of 27 steps, by its own duplicate `p` and by the card's `mux-video`. Words in `em` are doubled, with one copy `aria-hidden`. Where a card overlaps the headline, the letters under it are hidden; the strip shows the cards over the ends of "basics" and "real". The line stays readable because the overlap is a few letters at the edge, never a whole word. At 390 the line was covered at every one of 21 steps, by the narrow layout's labels as well as the cards.

**Numbers (1440).**

| Layer | Rate per 100 px, approaching | Then |
|---|---|---|
| hero line | 113.3 | 100 |
| section-2 headline | 67.8 | 1.1 (held) |
| map | 77.2 | 10.5 |
| image card 1 | 62.0 | -4.8 (moves against the scroll) |
| image card 2 | 64.8 | -1.9 |
| image card 3 | 100 | 100 |

At 390 the same layers ran at 112.6, 65.4, 74.9 and 63.2. Trace: 895 layouts (35 ms), 1,660 style updates (920 ms) and 3,691 paints (124 ms) in 26 steps. The map alone took 7,949 writes on its `path` elements, and the card images 1,955.

**Reduced motion.** Ignored. Every rate is the same under `reduce` (113.4, 67.7, 77.0, 61.8).

**Deft.** The held headline with cards drifting over it makes the words the still point, which is the right figure and ground.

**Not deft.** Four rates in one view, a map repainted per frame, and no reduced-motion arm. It is parallax as atmosphere, the smell the restraint precept names.

### Oura: the image lags inside its card

**Source:** https://ouraring.com/ · strips `s-oura-scroll-chromium.png`, `s-oura-rest.png`

**Mechanism.** Each card in the "Get the best sleep of your life" row is a clipped box (`overflow: hidden`). Inside it, `div.motionComponent` (`absolute inset-0 overflow-hidden`) is translated per frame by script, and the image within it (`position: absolute; height: 100%`) fills the box. The card moves with the page and the picture moves less, so it seems to sit behind the card's opening.

**Numbers.** Card and title: 100. Image: 86.4 to 86.5 at 1440, a lag of 13.5 px per 100 px, held steady for 14 steps, then 94.9 and 100 as it reaches its end. At 390: 90.2, a lag of 9.8. Trace: 7 layouts (0.6 ms), 335 style updates (71 ms) and 102 animation frames in 16 steps.

**Reduced motion.** Unmeasured. A marketing iframe (`#attentive_creative`) covered the page and the wheel did not scroll it.

**Deft.** One layer, one ratio, inside a frame that clips it, so the depth reads as a window and the copy beside it never moves.

**Not deft.** The lag is written per frame by script, where a `view()` timeline on the image would do the same on the compositor.

---

## Engines

WebKit results are in `data/drill-<case>-webkit.json` and the `-scroll-webkit` strips. Seven cases ran in Playwright WebKit (wide and 390) under `guarded --exclusive webkit`: Vision Pro, iPhone 18 Pro, AirPods Pro, AirPods Max, Stripe, Aupale and Oura.

**Rates are the same in both engines.** Every layer rate in WebKit matched Chromium to within 0.5. The figures were: Vision Pro pinned for nine steps, then 56 and 100. The Apple entrance at 129.3 against 128.8. Aupale at 113.3, 67.7, 77.1 and 61.9. Oura's image lagging at 90.2 at 390. The pins, the per-frame script writes and the Lenis-driven layers behave alike.

**What differs:**

- **Vision Pro's frosted sheet.** WebKit's `after` read shows the sheet is two pseudo-elements on `section.section-foundation`. `::before` is `position: absolute`, 900 px tall, with `backdrop-filter: blur(20px)`. `::after` is a fill of `rgb(251,251,253)` whose opacity follows `--css-scrim-opacity`: 1 at 1440 with the property written, 0.8 at 390 where it was not. In the WebKit strip the hero shows through the sheet much more sharply than in Chromium. The "Vision Pro" logo and the buttons read as a pale ghost, where Chromium's frames show them blurred away. Either the blur on the pseudo-element reaches less of the backdrop in this WebKit build, or it is not drawn at the frame captured. This build is Playwright's WebKit, not shipping Safari, and the two have disagreed before (see the memory note `feedback_playwright_webkit_not_safari`). It needs a Safari reading before any spec leans on a backdrop blur over a pinned figure.
- **Stripe's wave.** WebKit mounted the live WebGL wave (`canvas` 1392 x 761; 390 x 560 at 390) and faded the static fallback to `opacity: 0`. Chromium headless mounted no canvas and kept the image. The two-copy text structure, `hard-light` and `z-index` values were identical. The background copy's colour differed between the runs (`rgb(129,184,26)` in Chromium, `rgb(221,214,0)` in WebKit), so it is not a fixed colour. It is animated or set by script, presumably to track the wave.
- **Oura at 1440.** The WebKit run did not scroll at all, the same block as Chromium under reduced motion (a marketing popup). At 390 it scrolled, and its rate matched.
- **Apple's hero video at 390.** It reads rate 0 in both engines, so this is the page's treatment and not an engine fault.

Nothing in the record depended on `animation-timeline`, so the record shows no difference between engines in scroll-driven animations; no case used them.

## What glass-ui has today

Read from `src/` only.

**Figures**, things a heading could pass behind or in front of:

| Piece | What it paints | Silhouette available to CSS | Notes for depth |
|---|---|---|---|
| `Blob` (`components/blob/Blob.vue`) | a WebGL canvas at 160 % of its wrapper, so satellites overflow | partly: `.goo-blob-hit` is clipped to `circle(var(--blob-hit-radius))`, a disc matching the body, already used for paint and hit-testing | wrapper is `z-index: var(--z-content)`, `contain: layout style`, `content-visibility: auto`; two chained `drop-shadow()` filters follow the true silhouette. The disc is the only CSS-readable shape; the satellites are canvas-only |
| `Aurora` (`components/aurora/Aurora.vue`) | a full-field canvas over two palette grounds | none (a field, not a figure) | grounds at `z-index` 1, canvas layer at 2 with `isolation: isolate`; a ground for text, not a subject |
| `Constellation` (`components/constellation/`) | a canvas | none | a field; optionally interactive |
| `FourierField` (`components/fourier-field/`) | a canvas | none | a field; optionally a slider |
| `HandMark` (`components/handmark/HandMark.vue`) | an `aria-hidden` SVG mark over the word, or behind it for the highlight (`z-index: -1` inside an `isolation: isolate` host) | yes: its own SVG paths, measured per line from `Range.getClientRects()` | already layers a figure with real, selectable text at both depths. It also has the one existing scroll-linked motion of its kind: an ink lag of at most 1.5 px against the word's own viewport motion, from a passive capture-phase scroll listener that runs only while the mark is in view, settling on `--spring-world` |
| `Surface` / `Card` (`components/surface/`, `components/card/`) | the glass plate, on five tiers (wash, quiet, resting, floating, overlay) and three surfaces (glass, veil, opaque) | the plate's own box and radius | the tier axis is the existing ladder of prominence; `.card-scroll-host` already writes a trailing-edge `mask-image` feather that must never sit on the plate itself |
| the dock plate (`components/dock/`) | the floating glass bar | its box | `--z-dock: 40` |

**Layers and ordering.** `src/styles/tokens/scheme-motion.css:197-213` defines the z ladder: `--z-behind: -10`, `--z-background: 0`, `--z-content: 10`, `--z-controls: 20`, `--z-bar: 30`, `--z-header: 35`, `--z-dock: 40`, `--z-panel: 45`, `--z-overlay: 50`, then tooltip, popover, modal and fullscreen. Nothing sits between a figure and the text over it.

**Scroll-linked motion that exists.**

- `styles/scroll-driven.css`: `.scroll-progress` on `animation-timeline: scroll(nearest block)`, and `[data-scroll-reveal] > *` on `view(block)` (a 6 px fade and rise), both inside `@media (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: …)`.
- `styles/scroll-choreography.css`: `.scroll-cascade > *` on `view(block)`, with `animation-range: entry 0% entry 45%`, a 1.25 rem rise on `--ease-scroll-spring` (`--spring-world`), under the same two gates. The file states its rule: transform, translate, scale, opacity and clip-path only.
- `styles/scroll-chrome.css` and `styles/utilities/base-misc.css`: `scroll(self block)` and `scroll(self inline)` for chrome collapse and edge fades.
- `composables/motion/scroll/supportsCssTimeline.ts`: `supportsScrollTimeline()` and `supportsViewTimeline()`, which reject a garbage value as well as accept a valid one, so a test runner that only parses the property reads false. `useScrollProgress` and `useScrollTrigger` fall back to script only where the native timeline is missing.
- The one parallax ratio already ruled: `--route-parallax: 0.125` (`styles/tokens/motion-registers.css:119`), used by `styles/view-transition.css` for the route push ("the world trails the content at the parallax ratio", 1:8, travel `calc(var(--route-parallax) * 100lvb)`).

**Not present.** No sticky stage component, no backdrop scrim with a mask, no duplicated-text primitive and no pointer or tilt parallax. `mix-blend-mode` appears in `src/` only on paper grain (`styles/paper.css`), glass highlights (`styles/glass/material.css`, `glass-chip.css`, `track-flow.css`) and the dock plate's grain (`components/dock/styles/dock.css:174-178`), never on text.

**A constraint already measured here that bears on every mechanism above.** `styles/glass/grasp.css:86-98` and `components/dock/styles/dock.css:138-150` record, from Chrome 148 captures, that `clip-path` on a host and a `mix-blend-mode` pseudo-element each form a backdrop root. Either one alone makes a descendant `backdrop-filter` blur nothing, at full opacity, with no error. `contain: paint` is a former by spec. So three of the record's techniques would silently kill the glass under them if put on or around a glass plate: a silhouette `clip-path` or `mask-image` on a figure, a blended second copy of text (Stripe), and a masked blur scrim (Apple) placed inside a plate that already blurs. `opacity` below 1, `filter` and `mask` are also backdrop-root formers in the Filter Effects spec; the record did not measure those three here.

## Not measured

- Oura under reduced motion (a popup iframe blocked the scroll).
- Material 3 at 1440 (an inner scroller; the wheel drill reads the document).
- Stripe's live wave: no canvas mounted headless, so the record reads the static fallback image, which the page ships for that case.
- Whether Apple's section entrance follows time or scroll position: the samples fit either.
- Real Safari: WebKit here is Playwright's engine build, which can differ from the shipping app.
