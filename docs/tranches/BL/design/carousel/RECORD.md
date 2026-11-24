# Carousel jitter: the record (O-421)

> **Corrections (the fold, 2026-11-23; ROOT.md §9 and fold.md).** Read these before the sections they name.
> - **§2.1:** the commit at 345 to 375 ms into a swipe comes from the IntersectionObserver at 55 %, not from `scrollsnapchange`. Chromium fires `scrollsnapchange` together with `scrollend`, at rest (717 ms at 1440 in v11.1.0's hero swipe).
> - **§2.2 and §6:** WebKit drops a trackpad wheel because *any* per-scroll restyle of the scrolled content makes it snap back after each event, not because the scale moves the snap point. The snap-point shift is Chromium's 18 px and 7 px rest offset.
> - **Reversal counts (§1, §2, §6):** the detector skipped a backward step framed by still rows. With still rows skipped (`tools/analyze.mjs`, `record/tables.md` regenerated), v11.1.0's counts rise: hero none 1440 swipe 4 (19) → 7 (34) and flick 4 (21) → 7 (51); 390 swipe 4 (8) → 7 (13) and flick 6 (10) → 9 (26); demo 1440 swipe 2 → 4, 390 swipe 4 → 6 and flick 3 → 5; atlas 1440 swipe 20 → 29 and flick 22 → 27, 390 swipe 9 → 13 and flick 11 → 15. Bare, flat and daraksha are unchanged at 0 and at their jumps, so no finding changes.

Recorded 2026-11-23 by claude-opus-5-5. The owner, about 10:57 on atlas's home deck (the /usf slide, the pager dock under it): "the scrolling of the preview pages in the slides is jittery and not smooth". Glass's share is the jitter between slides by swipe, trackpad and pager press, and a way for a Carousel member to hold heavy live content without stutter. The rings and the live figures are atlas's.

Every reading below names its engine. **Chromium** means Playwright's Chromium headless shell 149.0.7827.55 on the harness's GPU lane (`--use-angle=metal --enable-gpu-rasterization`), sampled every animation frame (rows at an 8.3 ms median, so 120 Hz). It is not a phone. Frame-rate claims come only from those rows. **WebKit** means Playwright's WebKit build. It is not Safari. Its section is §6.

Sources:

| id | what | build |
|---|---|---|
| atlas | the live home deck, https://a5eecbdb.atlas-dg2.pages.dev/ | atlas's own glass line. Its page turn (instant seat plus a `translate` spring, snap suspended) is the one on glass `u/sp-integ-glass` 8b4d8f82b, not v11.1.0. HeroStage read at sci-report `u/o18-sci` 83e3ab52 (the home deck is not on `master` bbcbd503) |
| demo | glass's demo carousel (`?c=carousel`) | v11.1.0 (d19e12559), built from `git archive` into `trees/` |
| hero | a test page on the same v11.1.0 build: HeroStage's shape (Carousel `projection="travel"`, 2rem gutter, a static pill GlassDock with previous, PagerDots, next) with 8 members | `tools/app-extra/mounts/carousel-hero.vue` |
| hero variants | `none` (a flat card), `webp` (one 2880×1800 WebP per slide, lazy after the first), `svg` (a live SVG per slide: 360 circles moved by `setAttribute` every frame), `canvas` (a live canvas per slide: 2400 arcs every frame). `-active` runs a figure only while its slide is active and still, with `contain: paint`. Two controls on `none`: **bare** (the same strip and member classes with no Carousel at all, which is the platform's scroll-snap alone) and **flat** (the Carousel with `projection="none"`) | |
| daraksha | the reference: https://daraksha.babb.dev/portraits (glide.ts, read at daraksha `origin/master` 61b36f0) | live |

Inputs: a **touch** swipe of one slide (78 % to 22 % of the strip in 320 ms), a **flick** (130 px in 80 ms), and a **carry** (80 % of the strip in 700 ms, then held 200 ms before letting go). These are CDP touch events with `hasTouch` and `isMobile` at 390 (dpr 3). At 1440 (dpr 2, no touch) the swipe uses the same CDP touch stream. A **wheel**: the engine's own phased trackpad gesture (`Input.synthesizeScrollGesture`, mouse source, 60 % of the strip). **wheelraw**: bare wheel events in small steps with no phase. A **pager** press: next, previous, then a dot two ahead. At 390 the chevrons are hidden, so next and previous are the neighbouring dots. All runs are light, with `reducedMotion: no-preference`.

## 1. The numbers

All rows are Chromium (GPU lane). The **picture** is the landing slide's content box, transforms included. A **reversal** is a frame whose step runs against the frame before it, so a backward jump counts twice: once going back and once resuming. Reversals are the jitter's signature. Each cell gives the count per gesture and the largest such step in px. **Rest** is the time from the finger lifting (or the press) to the last frame that moves. **Off snap** is where the strip comes to rest against the member's laid-out snap position (index × pitch).

| source | gesture | 1440: reversals (largest px) | 1440: rest ms | 390: reversals (largest px) | 390: rest ms | off snap 1440 / 390 px | frames > 25 ms |
|---|---|---|---|---|---|---|---|
| **bare** (the platform alone) | swipe | 0 | 691 | 0 | 549 | 0 / 0 | 0 |
| bare | flick | 0 | 824 | 0 | 615 | 0 / 0 | 0 |
| bare | wheel | 0 | 68 | 0 | 116 | 0 / 0 | 0 |
| **flat** (v11.1.0, no projection) | swipe | 0 | 344 | 0 | 235 | 0 / 0 | 0 |
| flat | flick | 0 | 459 | 0 | 292 | 0 / 0 | 0 |
| flat | wheel | 0 | 299 | 0 | 207 | 0 / 0 | 0 |
| **hero none** (v11.1.0, `travel`) | swipe | 4 (19) | 493 | 4 (8) | 301 | 18 / 7 | 0 |
| hero none | flick | 4 (21) | 601 | 6 (10) | 293 | 18 / 7 | 0 |
| hero none | wheel | 6 (14) | 298 | 2 (8) | 209 | 18 / 7 | 0 |
| hero none | next / prev | 6 / 3 (20 / 14) | 540 / 543 | the strip does not move (§2.7) | | | 0 |
| demo (v11.1.0) | swipe / flick | 2 / 4 (8 / 9) | 200 / 234 | 4 / 3 (10 / 8) | 208 / 258 | 5 / 6 | 0 |
| **atlas** (live) | swipe | 20 (316) | 850 | 9 (153) | 750 | 2 / 1 | 0 |
| atlas | flick | 22 (317) | 967 | 11 (149) | 792 | 2 / 1 | 0 |
| atlas | wheel | 1 (352) | 183 | 1 (156) | 226 | 7 / 3 | 0 |
| atlas | next / prev / dot | 0 / 0 / 0 | 244 / 222 / 219 | 0 / 0 / 0 | 276 / 276 / 276 | 0–1 | 0 (one 26 ms frame at the first press, traced; §2.3) |
| **daraksha** (glide) | swipe / flick / carry | the incoming drawing jumps 189 / 122 / 273 px in one frame at the hand-over | 690–790 | 175 / 122 / 253 px | 680–700 | n/a | 2 (367 and 182 ms) in one run at 1440, 0 in the traced repeat (§3) |

The carry: a slow stroke past the commit point, then the finger held still for 200 ms before it lifts. Each cell gives the finger's travel → the picture's travel at the lift (their ratio):

| source | 1440: finger → picture px | 390: finger → picture px |
|---|---|---|
| bare | −803 → −798 (0.99) | −312 → −301 (0.96) |
| flat, hero none (v11.1.0) | −803 → −1036 (1.29) | −312 → −422 (1.35) |
| atlas | −621 → −810 (1.30), with a 134 px jump back while the finger is still down | −286 → −390 (1.36) |
| daraksha | −281 → −273 (0.97) | −261 → −253 (0.97) |

What the two controls settle:

- **The platform's own scroll-snap is smooth.** Bare runs 0 reversals, 0 abrupt speed changes, and 0 frames over 25 ms in every touch and wheel cell at both widths. A held finger keeps the picture 1:1.
- Every reversal in v11.1.0 comes from the projection. Flat (projection off) has 0 reversals.
- The 3–18 px rest offset also comes from the projection. Flat rests at 0.
- The commit's scroll call is what pulls the strip out from under a held finger. It does this in flat as well as in travel.
- Atlas's 150–350 px jumps come from its page turn running into the platform's own snap animation (§2.1).
- value.js's reading, that "a hand-carried glide like this one would replace snap-scroll's jitter" (HOME-DECK-REFS.md), is not borne out on this lane. The snap alone does not jitter, and the glide has a one-frame jump of its own at every hand-over (§3).

## 2. Each source of unevenness

### 2.1 Snap settling and the commit echo: shows, the largest source

The strip commits its index when the platform reports a snap change. In Chromium, `scrollsnapchange` fires at 345–375 ms into a 320 ms swipe, as the finger lifts and the platform picks its target. The index watcher then scrolls the strip to that index while the platform's own snap animation is still running.

- **Atlas (live).** Its scroll call is an instant seat plus a member `translate` spring, with snap set to none. For the swipe at 1440:
  - At 344.5 ms `scrollTo({left: 808, behavior: "instant"})` runs with the strip at 475 px. The strip shows 820, and the members carry +333 px of translate.
  - At 369 ms the platform's snap animation, which was already in flight, writes its own offset back: the strip goes from 838 to 518 px. The picture jumps **+315.7 px backwards in one frame**.
  - The translate spring and the restarted native scroll then add together for about 200 ms.
  - At 576 ms `land()` seats the strip again (instant 808, with the strip at 726). The picture steps −91.5 px.
  - At 594 ms the platform rewrites it once more (815 → 736): **+79 px backwards**.
  - Rest comes at 1193 ms. The gesture has 20 reversals and 12 abrupt speed changes.
  - At 390 the same sequence gives a +153 px jump at the first seat, then +35 px at `land()`.
  - The strip's own scrollLeft runs backwards 4 times per gesture (largest 320 px at 1440, 155 px at 390).
- **Atlas, phased wheel.** Commit at 427 ms, with an instant seat at strip 460 → 817. With the snap suspended, the wheel's remaining momentum carries the strip on to 1170 px (half way to slide 3) while the translate eases out. At 652 ms `land()` seats it at 815: the picture jumps **+351.6 px backwards in one frame** (+156 px at 390).
- **Atlas, carry.** At 575 ms the commit seats the strip from 2084 to 2425 px while the finger is still down, and the translate carries the difference. The picture runs ahead of the hand (ratio 1.30). At 811 ms, still under the finger, the strip is re-seated from 2573 to 2428 and the picture jumps 134 px back. The finger lifts at 962 ms.
- **v11.1.0 (demo, hero, flat).** The watcher calls `scrollTo({behavior: "smooth"})` mid-snap, for example at 347 ms with the strip at 612 of 1036 px. In Chromium the smooth scroll replaces the platform's snap curve without a reversal: flat has 0 reversals and 0–1 abrupt changes. It also shortens the settle: flat rests 344 ms after release against the platform's own 691 ms at 1440. That is a different curve, not a jolt.
- **v11.1.0 carry.** The same smooth call runs while the finger is down. The commit lands at 527–545 ms. The finger stops at 700 ms and lifts at 939 ms. Meanwhile the strip glides from 2657 to 3126 px on its own, so the picture travels 233 px further than the hand at 1440 and 110 px at 390. Bare keeps it within 11 px.
- Code: v11.1.0 `src/components/deck/composables/useDeckSnap.ts` 143–170 (`scrollTo`, `watch(deck.index)`). Atlas line `u/sp-integ-glass` useDeckSnap.ts 192–248 (`travel`, `land`, `seat`) and 281–319 (`scrollTo`).

### 2.2 Scroll-driven writes (the projection): shows, all of v11.1.0's reversals and its rest offset

`projection="travel"` writes `--member-scale` (scale 1 − 0.035 per member of distance) and `--member-lag` (the content's lag, `calc(lag * 100%)`, ceiling 0.08) on every member on every scroll event. That is 198–538 member style writes per touch gesture.

- **The lag collapses at the commit.** Through a drag the content sits at the lag ceiling, 8 % of the member width: 30 px behind its housing at 390, 78 px at 1440. In the frame after the commit's scroll call the velocity estimate resets, the lag drops from 8 % to 0.85 %, and then it rebuilds over 2–3 frames.
  - At 390 the picture lurches 28.5 px forward in one frame, then steps 7.8 and 9.2 px backwards.
  - At 1440 the lurch is 77 px, with backward steps of 19–21 px.
  - The lag swings its full 8 % in a single frame in 24 of the 44 v11.1.0 travel touch and wheel gestures.
  - Flat, the same Carousel without these writes, has 0 reversals.
- **The scale moves the platform's snap point.** Chromium measures a snap area on the transformed box. Atlas's own line notes the same: "a snap area is measured on the TRANSFORMED box", at useDeckSnap.ts 175–178.
  - At 0.965 scale, a `start`-aligned member's edge moves (1 − 0.965)/2 of its width: 17.6 px at 1440 and 6.8 px at 390.
  - The library's scroll targets index × pitch (3108 px). The platform then snaps the strip on to 3126. The none, canvas and both -active cells rest **18 px (1440) / 7 px (390) off** the laid-out snap position after every touch and wheel gesture. Webp rests 5–7 / 3 px off after touch and 18 / 7 after the wheel. The landing slide sits 17.5 px left of where flat puts it.
  - The last 7–18 px arrive as a slow creep after the smooth scroll has ended, for example 422 → 429 px between 532 and 590 ms at 390.
  - Flat and bare rest at 0. Atlas's line re-seats the strip at the end of every turn. It rests within 1–2 px after touch and 3–7 px after the wheel.
- **The lag never returns to zero at rest.** The lag is written from `deck.velocity`. That velocity is fed only by scroll events (useDeckSnap.ts 103–111), and nothing zeroes it once the strip stops. The content therefore rests off its housing by whatever the last scroll event measured.
  - Chromium: up to 2.4 % in the demo, about 9 px. The hero svg wheel stays at the full 8 %, about 80 px at 1440.
  - WebKit: −6.1 to −6.5 % after every pager turn at 1440, about 61–65 px. It arrives in one 65 px jump, 16 ms after the strip stops (§6).
  - Atlas's line zeroes the velocity 150 ms after the last scroll (`REST_IDLE_MS`), and its content rests at 0.
- **In WebKit the scale also kills a trackpad scroll in progress** (§6).
- Atlas's live deck runs the same projection. Its lag channel reaches the same 8 % ceiling on touch, but the 150–350 px seat jumps of §2.1 swamp it.
- Code: v11.1.0 `src/components/carousel/styles.css` 43 and 55–56, `projection.ts` 34–40, `CarouselContent.vue` 50–72.

### 2.3 inert and aria-hidden flips: shows as a small main-thread cost at the commit, no dropped frame

Each turn flips `inert` and `aria-hidden` on two members (CarouselItem.vue 50–56).

- **v11.1.0:** 2 inert and 2 aria-hidden writes per turn.
- **Atlas:** 4 inert and 2 aria-hidden. Each preview anchor `a[dashboard-preview]` is flipped too.
- **Cost, traced, in the two frames at the flip:**
  - v11.1.0 (none, flat, webp): 2–4 style recalcs (1.2–1.9 ms), 2–3 layouts (0.7–1.6 ms) and 2.3–4.4 ms of script.
  - Atlas: 12–21 style recalcs (2.0–3.3 ms), 2–5 layouts (1.1–1.5 ms) and 2.2–4.4 ms of script.
- **Frames:** no touch cell has a frame over 25 ms at the flip. The flip frames run 6.7–16.7 ms.
- **The one long frame** at a flip is atlas's first pager press: 26.1 ms, traced, where the click handler, the flip and the turn's setup share a frame. In the trial run it was a 41.7 ms frame inside a 51.8 ms long animation frame (onclick 11.1 ms).

### 2.4 Image decode: shows only as lazy loading on atlas; decode itself stays off the main thread

- **Atlas (live).** Its previews are `loading="lazy"`. On the first swipe at 390, slide 2's picture was on screen unloaded for 9 frames (7 in the traced repeat), then loaded but unpainted for 4 more. It painted at 184–208 ms into the swipe. At 1440 it had loaded before the gesture (0 frames).
- **Decode cost.** The decode itself ran on a raster thread: ImageDecodeTask 5.8 ms (atlas, 390). The picture was absent for 11–13 frames, but no frame was slow.
- **hero webp (2880×1800 per slide).** Each picture had loaded before the gesture, so no visible frame was unloaded.
  - Decodes ran off the main thread: 28.4 ms at 234 ms and 32.8 ms at 436 ms into the swipe at 390, 34.0 ms in the flick, and 28.3 ms in the carry.
  - No frame was over 10.4 ms.
  - Reversals are the same as `none` (2–9, up to 21 px). On this lane the large picture costs nothing the record can see.

### 2.5 The pager re-rendering: shows as writes, not as dropped frames

PagerDots writes about 205 times per turn (PagerDots.vue, worm.ts). That is 76 `goo-body` and 76 `goo-neck` style writes, 36 on the worm layer, 8 on dots, plus 2 `data-active` and 2 `aria-current`, all between 365 and 652 ms of a swipe. Atlas's pager writes 192–203 per turn, the same.

- **v11.1.0.** From the commit to about 920 ms, every frame in v11.1.0 runs 1 style recalc and 1 layout: 67 consecutive frames at about 0.8 ms each. Flat shows the same, so the projection does not cause it. Bare shows 0. Atlas's live deck lays out in 5–6 frames per gesture. The source within v11.1.0 (the pager's worm, the dock, or the Carousel's own state) was not isolated. It costs under 1 ms a frame and drops no frame on this lane.
- **Pager presses on atlas.** Next, previous and a dot two ahead move on the translate spring with 0 reversals: 218–244 ms at 1440, 276 ms at 390. This is the smoothest motion atlas's deck has. A dot two ahead travels 1617 px in 219 ms.

### 2.6 The content itself: shows strongly for a live SVG on every slide; not for WebP or canvas; gone once only the still, active slide runs

| variant (v11.1.0, Chromium) | rows median / p95 ms | frames > 25 ms per touch gesture | commit after the swipe starts |
|---|---|---|---|
| none | 8.3 / 9.8 | 0 | 356 ms (1440), 374 ms (390) |
| webp | 8.3 / 9.8 | 0 | 357, 372 |
| canvas, all 8 live | 8.3 / 13–16.6 | 0 (max 18.5 ms) | 375, 408 |
| canvas, active only | 8.3 / 9.7–11.4 | 0 (max 10.4) | 373, 399 |
| svg, all 8 live | 19.8–22.7 / 31 | 13–32 (max 41.7 ms) | **1168 ms (1440), 950 ms (390)** |
| svg, active only | 8.3 / 15.8–16.4 | 0 (max 24.9) | 375, 400 |

- **svg, all live.** A live SVG on each of 8 slides (2880 circles moved per frame) costs about 9.7 ms of layout every frame. That is 1010 ms of layout and 1476 ms of script in one traced swipe at 390. The figures' own JavaScript is only 0.35–0.62 ms per figure-frame. The rows run at a 19.8–22.7 ms median (44–50 Hz) throughout, not only while the strip moves. The commit arrives 580–810 ms late, so the turn starts late, and at 1440 one step is 324 px.
- **svg, active only.** Running only the active slide's figure, only while the strip is still (daraksha's rule, with `contain: paint`), removes all of it.
- **canvas, all live.** Eight live canvases cost 333 ms of script per swipe but stay within 18.5 ms frames.

### 2.7 Found on the way (glass, v11.1.0)

- **A pager dot does not move the strip.** The Carousel takes `v-model:active` (Carousel.vue 24) but does not watch it inbound. In the hero test page, at 1440 a dot press, and at 390 every press (the chevrons are hidden there), moves the dots' active mark within 6–7 ms (1440) or 63–66 ms (390). The strip has 0 commits and 0 scroll calls, so it stays on the old slide. The page's caption reads the same `active`, so it would follow the dots; the caption was not tracked. This holds in all variants: none, webp, svg, canvas and both -active. Atlas's line added the watcher (`watch(active, i => deck.go(i))`).
- **A press can be undone by an earlier press's timer.** `scrollTo` releases its guard twice: once on `scrollend` and once on a 900 ms timer (useDeckSnap.ts 157–163). A previous turn's timer can therefore drop the guard of a turn still in flight. The observer installed by `watch(deck.total)` (171–174, in every engine) then commits the member that is leaving.
  - Seen in two of three runs of `demo.pager.1440`, each with previous pressed 0.88–0.9 s after next.
  - Chromium trial: commit 1 → 0 at 10.5 ms, commit 0 → 1 at 37.7 ms, then `scrollTo(121, smooth)`. Raw series: `record/trial/demo.pager.1440.chromium.json`.
  - WebKit: commit 1 → 0 at 23 ms, commit 0 → 1 at 54 ms. Next's 900 ms timer fell 9 ms after previous's scroll call.
  - In both, net travel was 0: the press did nothing. The recorded Chromium run did not race.
- **Unphased wheel steps never turn a page in Chromium.** This holds for atlas and v11.1.0 alike, with 0 scroll calls. Between events the platform's mandatory snap pulls the strip back: 47–49 reversals per gesture, up to 57 px. Real trackpads send phases (the phased gesture turns a page in every source), and a mouse wheel sends large steps. This is an input artifact, not a carousel fault.

## 3. The reference: daraksha's glide (Chromium)

- **Tracking.** The frames stand still and the pictures follow the hand at 0.94–0.97 of its travel, touch or mouse.
- **The hand-over jump.** At every hand-over, the incoming drawing jumps in one frame by exactly the distance it had followed the hand.
  - 1440: 189 px (a 197 px swipe), 122 px (flick), 273 px (carry).
  - 390: 175, 122 and 253 px.
  - This happens in every touch and drag run.
- **Settle.** After release the outgoing picture moves from 65–175 ms to 680–790 ms after the lift, with a largest step of 25 px at 1440 and 14 px at 390. The arrival runs 590 px at 1440.
- **Long frames.** In one run, the first swipe at 1440 had a 373 ms long animation frame with no script attributed (one 367 ms frame), and the flick a 192 ms one. The trial run had 408 and 250 ms. The traced repeat and the 390 runs had none. Each run opens a fresh context, so a cold one.
- **Keys and dots.** The picture slides 68 px (1440) or 18 px (390) and fades. The outgoing picture moves for 100–160 ms. The incoming one starts 264–425 ms after the key and ends at 384–557 ms.
- **Wheel and trackpad.** A horizontal trackpad gesture does nothing.

The parts worth taking: still frames, transform and opacity only, figures paused while their slide moves or is off screen, `contain: paint`, and decoding ahead. The glide itself is not smoother than the platform's snap on this lane.

## 4. Beside the Apple Home View study

STUDY.md (Chromium):

- **P-21:** a pager or autoplay move is one 1 s easeInOutQuad tween on `scrollLeft`, with snap disabled while it runs.
- **P-23:** a click during a move is dropped.
- **P-25:** the slides are flat, translate only, with no scale or opacity.
- **P-31:** touch tracks 1:1 after about 15 px of slop.
- **P-32:** release velocity sets the landing, natively.

Apple writes nothing on touch, so its swipe is the bare control. It has no scale, so there is no snap-point shift and no lag lurch.

## 5. Cells not run, and why

- **Atlas in WebKit, all four cells (wheel and pager at 1440 and 390).** The page crashed in Playwright WebKit on load: "Page crashed" at `goto`, or the target closed before the carousel showed. This is the Playwright build, not Safari.
- **WebKit touch, flick and carry.** Playwright's WebKit can tap but cannot send a moving touch. CDP `Input.dispatchTouchEvent` is Chromium's.
- **WebKit phased wheel.** No phased-gesture input exists. WebKit wheel cells use the unphased steps.
- **WebKit traces, long-animation-frame, element timing.** These are Chromium-only. In WebKit, long tasks and frame rows are what can be read.
- **WebKit at 390.** Runs with `hasTouch` but without `isMobile`.
- **Mouse drag on the snap strips.** A mouse drag does not scroll a native strip in either engine, so drag ran only on daraksha, which carries its pictures by pointer.
- **Safari and real phones.** These are outside this seat's law: no safaridriver, no headed browser, no device. Headless Chromium on a Mac's GPU lane is not a phone's compositor.
- **The atlas line as a local build.** Atlas was read live only. Its page-turn code was read from `u/sp-integ-glass`, but the line was not built here.
- **Dark mode.** Not asked; light only.
- **WebKit svg and the -active variants.** Not run in WebKit. Canvas ran at 1440 only. The content question was settled on Chromium's GPU lane, where frame rates can be read.
- **Repeats.** Each cell ran once. Nine also ran a traced repeat (atlas touch 390 and pager 1440, hero none, flat, bare, webp, svg and canvas touch 390, daraksha touch 1440), and eleven ran in the earlier trial (`record/trial/`). The traced repeats agree with the untraced runs within a few px. The demo race (§2.7) appeared in two of three runs. Daraksha's cold long frames (§3) appeared in two of three.
- **daraksha carry at 390.** The pictures turned, but no index change landed inside the gesture's window.
- **hero svg wheel.** Its rest figures are unreliable: the settle detector stopped at 53–121 ms because frames were 25–40 ms apart. Its frame rows stand.

## 6. WebKit (Playwright WebKit 26.5, not Safari)

Rows run at a 17 ms median (60 Hz) on the hero and demo pages. Frame-rate readings here are not GPU-lane claims. WebKit has no `scrollsnapchange`, so v11.1.0 commits from its IntersectionObserver at 0.55. The wheel is the unphased steps (60 % of the strip over about 550 ms), which in WebKit do scroll the strip.

| cell (wheel) | strip offset when the last wheel event lands | snap-backs (`scrollend`) during the wheel | the strip first passes 20 px | ends on |
|---|---|---|---|---|
| bare 1440 / 390 | 601 / 233 px | 0 / 0 | 65 / 98 ms | slide 2 (1036 / 422) after 1.3–1.5 s |
| flat 1440 / 390 | 950 / 233 px | 0 / 0 | 65 / 97 ms | **slide 3** at 1440 (2072); slide 2 at 390 |
| hero none, webp, canvas (travel) 1440 / 390 | **0–6 / 0–3 px** | 18–30 / 27 | **700 / 666 ms**, 100–120 ms after the wheel ended | slide 2 |
| demo (travel) 1440 / 390 | 0–2 / 0–3 px | 28 / 29 | 651 / 666 ms | slide 2 |

- **Travel swallows the trackpad.** With the projection writing scale on every scroll, WebKit snaps the strip back after each wheel event: 18–30 `scrollend` events at 0–6 px. The picture does not follow the hand at all. About 100–120 ms after the hand stops, the strip leaves on its own and turns one slide. Bare and flat follow the wheel. This is the snap-point effect of §2.2, in WebKit's form.
- **Flat overshoots.** At 1440 the observer committed slide 2 at 485 ms with the wheel still going (strip at 586 px). The smooth scroll to 1036 then added to the remaining wheel deltas, the observer committed slide 3 at 900 ms, and a 60 % scroll turned two slides. This is the same commit-during-input fault as the carry in §2.1.
- **Pager turns (v11.1.0, 1440).** Next and previous run WebKit's smooth scroll: 1036 px in about 220 ms, with a largest step of 184–260 px between 17 ms rows.
  - The none page overshot by 17 px (1053 → 1036) and snapped back in one frame.
  - The content's stuck lag (§2.2) then jumped it 51–65 px (none, webp) once the strip stopped.
  - The canvas page ended without that jump.
  - Dots at 1440, and every press at 390, do not move the strip (§2.7), as in Chromium.
- **The race reproduced** in `demo.pager.1440`: previous undone (§2.7).
- **daraksha.**
  - The hand-over jump reproduces: 188.6 / 121.2 / 272.6 px at 1440 and 175 / 122 / 253 px at 390. The hand ratio is again 0.94–0.97.
  - Its rows run at 33 ms (30 Hz) in every WebKit cell, idle wheel cells included. The exception is the first two drag gestures at 1440 (17 ms). No long task was reported.
  - A horizontal wheel does nothing.

## 7. Method

- **Sampler.** The harness's per-frame sampler (`audit/animation/harness/sampler.js`) records each member's box and transform, the strip's scrollLeft, an image-loaded flag on each picture, the pager dots' boxes and classes, and long tasks with long-animation-frames. Untraced cells use its ResizeObserver hook; traced cells use its rAF hook.
- **Recorder.** `tools/recorder.js` is an init script. It logs:
  - every scroll call on an element, with the strip's offset at the call and a stack
  - every attribute write on the strip's and pager's subtrees through a MutationObserver (filtered to the attributes a carousel, pager or glide writes, so a live figure's own writes do not flood it)
  - the strip's scroll, scrollend, scrollsnapchange and input events
  - each picture's load, fetch and first paint
- **Traces.** These are Chromium devtools.timeline traces. Style, layout, paint and script are counted per frame on the main thread, and image decodes on every thread.
- **Tools.** The probe is `tools/carousel-probe.mjs` and the analysis `tools/analyze.mjs`. `tools/tables.py` prints `record/tables.md`, every gesture of every cell.

Run: `tools/build-tree.sh <tree>`, `tools/serve.sh <tree> 5381`, then `node tools/carousel-probe.mjs --engine chromium|webkit --cells all --trace <ids>` under `guarded`, then `node tools/analyze.mjs record`.

## 8. Files

- `record/<cell>.<engine>.json`: one per cell, holding the per-frame series in columns, the marks, the scroll calls, the attribute writes, the strip's events, long tasks, long-animation-frames and image timing. Traced repeats are `<cell>.chromium.trace.json`.
- `record/summary.json`: per gesture, the motion, reversals, hand ratio, commits, writes, trace sums and decodes.
- `record/tables.md`: one row per gesture.
- `record/trial/`: the trial runs (an earlier probe revision, the same format).
- `record/run-*.log`: the probe's own log lines. The first Chromium batch was killed at 16 GB in its first live-SVG cell: the recorder then logged every circle's attribute write. The attribute filter fixed it, and those cells re-ran in `run-chromium-2.log`.
