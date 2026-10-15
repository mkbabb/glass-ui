# O-95 reference study: apple.com/apple-homeview, the media dock and its carousel

Seat: REF-study, model claude-opus-5-5. Page filmed 2026-10-15 19:17–19:23 EDT, Chromium 149.0.7827.55 headless (Playwright 1.61.1), one browser per run, under `guarded`. Load average during the film run: 9.6–12.3 (1-min), stated per scenario in `samples/<scenario>.json` (`load`). The rAF sampler ran at 120 Hz (median frame interval 8.3 ms, p95 ≤ 10.9 ms, every scenario: `samples/analysis.json` → `frames`).

The owner's element (`owner/2026-10-15-dock-frame.png`) is `#aap-highlights`, Apple's **all-access-pass (AAP)** control for the "Get the highlights." media-card gallery (`#highlights-gallery`). It holds a frosted pill of 7 timed dots (the active one a 48 px capsule with a progress fill) and a separate 56 px round play/pause button.

## How this was measured

Three instruments; every number below comes from one of them.

1. **Shipped source, read.** `main.built.js` and `overview.built.css` were fetched and hashed (`samples/source/bundles.json`). The excerpts that drive the dock are in `samples/source/`:
   - the AAP base with the intro choreography: `kLl-AllAccessPass-base.js`
   - the bubble and dot springs: `ym6t-MediaCardGalleryControl.js`
   - the spring integrator: `oDN9-SpringLayer.js`
   - the capsule driver: `EFSM-autoplay-progress.js`
   - autoplay: `Wqf-MediaCardGallery-autoplay.js`
   - the slide tween: `gallery-animateToItem.js`
   - durations: `MediaCardGallery-config.js`
   - all dock and dotnav CSS: `overview-aap-dotnav.css`
2. **Live per-frame sampling.** `tools/film.mjs` installs a rAF sampler at document start. Each frame it records `getBoundingClientRect` and `getComputedStyle` of:
   - the AAP and its intro blob, both bubbles and both backgrounds, and the button
   - all 7 dots, including the `::after` fill width
   - the scroller's `scrollLeft` and `--autoplay-progress`
   - every slide's x, and every caption's opacity and transform

   Sixteen scenarios (`samples/<scenario>.json`). Each row reads the styles the previous frame committed, so a series lags the page by at most one frame. The residual fits allow for this with a free lag.
3. **Source model against measurement.** `tools/model.py` re-simulates the intro with the page's own integrator (semi-implicit Euler, mass 1, fixed dt = 1/60 s, schedule from source), using each run's measured rest bounds. `tools/analyze.py` fits every curve (blind damped-spring fits, cubic-bézier fits, easeInOutQuad fits) and compares measured against model (`samples/analysis.json`, `samples/timeline-*.csv`, `samples/model-intro-*.json`).

Frames come from a CDP screencast taken alongside sampling. Raw JPEGs stayed in scratch. `tools/frames.py` cropped the cited frames into contact sheets under `frames/`, each tile labelled with its offset from the anchor event. The frames are illustrations; the numbers come from the samples.

Driver: `tools/run.sh` (census, then film; one guarded heavy run). Re-run: `sh tools/run.sh`, then `python3 -I tools/analyze.py samples`, then `python3 -I tools/frames.py <raw> samples frames`.

---

## 1. Census

`tools/census.mjs` loaded the page at 1440×900 and 390×844 (touch), each with reduced motion off and on, plus a `colorScheme: dark` load. Output is in `samples/census-*.json`; the network list, with sha256, is `samples/network-1440.json` (124 responses: 46 JPEG 7.4 MB, 8 MP4 2.1 MB with range responses noted, 12+1 JS 3.0 MB, 6 CSS 1.9 MB, 10 PNG 3.1 MB, 6 woff2 0.8 MB). The bundles are hashed in `samples/source/bundles.json`. Apple's media are not stored; URLs, byte counts, `content-range` and sha256 of the bytes fetched are recorded.

**Light and dark.** The page has **no `prefers-color-scheme` rules** (0 in the CSS). The dark-scheme census is identical to light (704 transitions, 28 animations in both). The dock's palette tokens switch only under a `.theme-dark` ancestor, and the dock sits outside the slides. The dot colour stayed `rgba(0,0,0,0.42)` across dark and light slides (`samples/autoplay.json`).

**Mechanisms in use.** There are no scroll-driven animations (`animation-timeline` count 0 in every variant) and no canvas or WebGL. Motion comes from five sources:
- JS spring layers (`oDN9`) driven by Apple's `anim` system, with scroll keyframes (`data-aap-kf`, `data-anim-*`)
- the `anim` time-group tweens (easeInOutQuad)
- CSS transitions
- one CSS animation of interest (`aap-animate-progress`)
- `<video>` (12 elements)

| Element (selector) | Mechanism | Trigger | Notes |
|---|---|---|---|
| **Media dock** `#aap-highlights` (pill `.aap-media-card-gallery__timed-dotnav`, button `.play-pause-button-wrapper`, blob `.all-access-pass__intro-element`) | JS springs (`oDN9`) + `anim` time-group tweens + CSS transitions; `position: sticky; bottom: 32px` | Scroll keyframe enter, fires once: `start: a0t - 100vh + 60a0h`, `end: a1b - 75vh` | The study's subject; §2 |
| Timed dots `.dotnav-link` (×7), capsule fill `.dotnav-link.current::after` | CSS `min-width` computed from `--autoplay-progress` (JS sets it from `scrollLeft` on every scroll event); fill = CSS animation `aap-animate-progress` 6.15 s linear | Scroll of the gallery (autoplay tween, drag, fling); `.playing` runs the fill | §2.2 |
| Play/pause `.play-pause-button` | CSS `background-color` transitions; glyph = `display` toggle of three SVGs (play/pause/replay) | click; `.playing/.paused/.ended` | §2.3 |
| Highlights gallery `#highlights-gallery .scroll-container` (7 slides) | Native `overflow-x: scroll; scroll-snap-type: x mandatory`; programmatic moves = `anim` time-group tween of `scrollLeft`, 1 s easeInOutQuad; `scroll-snap-type` set to `none` during the tween | autoplay (6.15 s), dot click, ArrowRight, replay; touch drag / fling (native) | §2.4 |
| Slide captions `.caption-animation-container` | JS-set `transform` (translateX parallax, 162 px per slide) + `opacity`, functions of scroll progress | gallery scroll | §2.4 |
| Slide media (videos `#media-block-gallery-item-2/3/7`, `highlights-*/large.mp4`) | `<video>` play/reset per slide (`InlineMedia*`) | becomes current | Not measured from pixels (out of the dock's scope) |
| Product viewer `.product-viewer-component` (+ its own AAP `.all-access-pass--product-viewer`, `.controls` sticky at 390) | JS springs (`35y8`: `tourMorphBounce .42`, `cardMorphBounce .16`, `duration .5`), glide with 0.975 per-frame decay | tap, wheel, swipe | Second dock-like control; **not filmed** (gap G-5) |
| Explore / incentive galleries `#explore-gallery`, `#incentive-gallery` | native scroll-snap + `paddlenav` glass buttons (`backdrop-filter: blur(20px)`, `rgba(232,232,237,.72)`) | click paddles, swipe | Not filmed (G-5) |
| `FadeGallery` (Siri section), `HardwareZoom`, `VideoScrub` (`#entertainment-video-scrub`, blob-URL video scrubbed by scroll) | `anim` scroll keyframes, video `currentTime` scrub | scroll | Census only |
| `StaggeredFadeIn` (24 groups) | CSS `opacity, transform` transitions 0.16–0.32 s | scroll threshold | Census only |
| Global nav / local nav | CSS animations `link-in` 0.32 s ease (×21), `globalnav-search-fade-and-slide` 0.32 s (0.4,0,0.6,1) | load, hover | Not part of the reference |
| Modals `.ric-modal` | `backdrop-filter` scrim blur | click | Census only |

**Reduced motion** (`reducedMotion: 'reduce'`): `<html>` becomes `reduced-motion no-enhanced no-animation-enhanced`. Two things are kept:
- the dock is still sticky glass (blur 7 px, fill 0.72)
- the fill animation still runs, at the same rate, once the user presses play

Everything else is dropped:
- the intro (the AAP stays `.inactive`; pill and button show statically at full opacity)
- the slide tween (`scrollTo({behavior:'instant'})`, one frame)
- the continuous capsule morph (`--autoplay-progress` = integer index)
- autoplay on entry (paused until pressed)
- `link-in`, and 61 transitions (643 vs 704)

Sources: `samples/reduced.json`, `samples/timeline-reduced.csv`, `samples/census-1440-reduced.json`.

---

## 2. The dock, frame by frame

### 2.0 Geometry at rest

| | 1440×900 | 390×844 |
|---|---|---|
| Pill (bubble 0) | 240 × 56 px, radius 28 px | 216 × 56 px |
| Button (bubble 1) | 56 × 56 px, radius 28 px (bg), 32 px (button) | 56 × 56 |
| Gap | 16 px | 12 px (measured; the CSS token `--aap-bubble-gap` is 16 px; cause not traced) |
| Group | 312 px, centred (x 564–876) | 284 px (x 53–337) |
| Dots | 7; inactive 8 × 8 px, spacing 24 px (8 + 2×8 margin); capsule 48 px | capsule 32 px |
| Material | `backdrop-filter: blur(7px)`, `rgba(232,232,237,0.72)`, no border, no shadow | same |
| Bottom offset | sticky `bottom: 32px` (rest top y = 812) | `bottom: 20px` |

Sources: `samples/analysis.json` (`rest_bounds`, `gap_px`); `samples/census-1440-motion.json` (`backdrop`); `samples/source/overview-aap-dotnav.css` (`--aap-min-height:56px`, `--aap-blur:7px`, `--aap-background-color-alpha:0.28`, `--progress-bar-active-width:48px|32px`).

### 2.1 The init animation

**Trigger.** It fires once, on a threshold. The scroll keyframe's `onEnter` calls `playIntroAnimation()`, guarded by `hasEntered`.

| Scenario | Scroll | Enter at scrollY | Measured threshold |
|---|---|---|---|
| Slow, from above | 300 px/s | 599 | 598.0, i.e. +1.0 px |
| Fast, from above | 6000 px/s | 656 | +58 px (one 60 Hz scroll step at 6000 px/s is 100 px) |
| From below | 1500 px/s upward | 1267 | `end` = 1273.8 |

It does not scrub: from the enter frame on, the timeline is identical whatever the scroll speed or direction. Across the slow, fast, from-below and 390 px runs, every intro quantity agrees within 0.4 px (table P-04). It does **not replay**: scrolling out above and back in, then out below and back in, kept the AAP `.activated` with the blob `display:none`, and no spring restarted (`samples/replay.json`).

**What moves** (all from source, all confirmed live):
- The whole AAP rises from `translateY(180px)` (spring k100 c8).
- A single solid blob (`rgb(232,232,237)`, opaque) appears at the viewport centre at 30 × 80 px, scale 1.3. It squashes to 56 × 56 (k100 c8) while shrinking to scale 0.8 (critically damped, response 0.5 s).
- At 0.50 s the **pill background** takes over at the same centre, from width 40 and scale 1.3, then grows to 240 (k100 c10). The blob is hidden at 0.52 s.
- At 0.54 s the **button background** scales from 0 (critical, response 0.65 s). Its element slides from the viewport centre to its slot (x −128 → 0, k100 c20): the button buds out from behind the pill's right edge.
- At 0.70 s both heights grow 36 → 56.
- At 0.74 s + 20 ms·i each dot slides 36 → 0 px (k200 c20). All dots fade in together (opacity 100 ms ease-in) while the capsule opens 8 → 48 (`--progress-intro`, k200 c20).
- At 0.94 s the button glyph fades in (100 ms) and scales 0.5 → 1 (200 ms ease-out).
- From 1.0 s the material **frosts in**: `--alpha` 0 → 1 (critical), taking `blur(14px)` → `blur(7px)` and fill alpha 1.0 → 0.72. The dock is opaque during the entrance and becomes glass as it settles.

**Is it goo?** Partly. One blob becomes the pill, and the button separates out of the pill. There is no metaball neck: no SVG or CSS goo filter, and the census shows no `filter` on the dock. The shapes are separate spans of the same colour. The hand-off reads as continuous because the blob (about 50–62 px at 0.52 s) and the pill's first frame (40 × 1.3 = 52 px wide, 36 × 1.3 = 46.8 px tall, centred) match in colour and centre. Order of appearance: blob → pill → button → dots (all at once, x-staggered 20 ms) → glyph → material.

**Per-frame timeline** (1440, slow scroll; ms from the enter event; 50 ms rows shown, every frame in `samples/timeline-init-slow.csv`, 120 Hz):

| ms | aap y | blob w×h, scale, op | pill bg w×h, `--scale`, blur, fill α | pill x | btn bg w, `--scale` | btn x | glyph op, scale | dot0 x / dot6 x, dot op | capsule w |
|---|---|---|---|---|---|---|---|---|---|
| 0 | 180.0 | 30×80, 1.30, 0 | 40×36, 1.30, 14, 1.0 | 36.0 | 80, 0.00 | −128 | 0, .50 | 36/36, 0 | 8 |
| 56 | 178.4 | 30×80, 1.19, 1 | 40×36, 1.30 | 36.0 | 80, 0 | −128 | 0 | 36/36 | 8 |
| 106 | 148.8 | 32.6×80, 1.08 | " | " | " | " | " | " | 8 |
| 156 | 97.0 | 39.4×80, 0.99 | " | " | " | " | " | " | 8 |
| 206 | 43.6 | 47.2×77.6, 0.92 | " | " | " | " | " | " | 8 |
| 256 | −1.4 | 54.3×71.4, 0.88 | " | " | " | " | " | " | 8 |
| 306 | −30.1 | 59.2×64.1, 0.85 | 40×36, 1.25 | " | " | " | " | " | 8 |
| 355 | −42.3 | 61.8×57.6, 0.83 | 40×36, 1.14 | " | " | " | " | " | 8 |
| 406 | −41.2 | 62.2×53.0, 0.82 | 40×36, 1.07 | " | " | " | " | " | 8 |
| 506 | −18.7 | 59.3×50.3, 0.81 | 40×36, 1.04 | 36.0 | 80, 0 | −128 | " | " | 8 |
| 556 | −6.2 | hidden | 48.8×36, 1.02 | 34.5 | 80, 0.00 | −128 | " | " | 8 |
| 606 | 3.2 | — | 90.8×36, 1.01 | 28.4 | 80, 0.09 | −116.3 | " | " | 8 |
| 656 | 8.7 | — | 145.9×36 | 21.7 | 80, 0.26 | −92.8 | " | " | 8 |
| 706 | 10.4 | — | 197.0×36 | 16.0 | 80, 0.44 | −70.0 | " | " | 8 |
| 756 | 9.3 | — | 235.6×36.9 | 11.6 | 79.0, 0.58 | −51.1 | 0 | 36/36, 0.02 | 8 |
| 805 | 6.6 | — | 258.9×41.1 | 8.2 | 73.9, 0.70 | −36.7 | 0 | 29.6/36, 0.41 | 15.2 |
| 855 | 3.4 | — | 268.4×46.5 | 5.9 | 67.4, 0.78 | −26.2 | 0 | 17.8/36, 1 | 28.2 |
| 905 | 0.6 | — | 268.1×51.7 | 4.1 | 61.2, 0.84 | −18.5 | 0 | 8.2/33.0 | 38.8 |
| 956 | −1.3 | — | 262.1×55.6 | 2.9 | 56.5, 0.89 | −13.1 | .02, .54 | 2.7/21.6 | 45.0 |
| 1006 | −2.3 | — | 254.1×57.9, blur 14.0 | 2.1 | 53.7 | −9.2 | .43, .72 | 0.1/11.0 | 47.9 |
| 1055 | −2.5 | — | 246.5×58.8, 13.7, .99 | 1.4 | 52.6 | −6.5 | 1, .87 | −0.7/4.1 | 48.75 |
| 1106 | −2.0 | — | 240.8×58.8, 12.5, .94 | 1.0 | 52.6 | −4.6 | 1, .97 | −0.7/0.7 | 48.75 |
| 1206 | −0.6 | — | 235.9×57.4, 10.1, .85 | 0.5 | 54.3 | −2.3 | 1, 1 | −0.2/−0.7 | 48.3 |
| 1306 | 0.4 | — | 236.7×56.1, 8.6, .78 | 0.25 | 55.9 | −1.1 | 1 | 0/−0.3 | 48.0 |
| 1406 | 0.6 | — | 239.0×55.6, 7.8, .75 | 0.12 | 56.5 | −0.6 | 1 | 0/0 | 48 |
| 1506 | 0.25 | — | 240.4×55.7, 7.4, .74 | 0.06 | 56.4 | −0.3 | 1 | 0/0 | 48 |
| 1655 | −0.12 | — | 240.5×56.0, 7.14, .725 | 0.02 | 56.0 | −0.09 | 1 | 0/0 | 48 |

(aap y is the spring translateY; the first pixel crosses the viewport's bottom edge at **172.7 ms**. Blob x tracks −15 → −28 px, k100 c8, until it is destroyed. Pill and button "x" are the bubbles' element translateX.)

**Fitted curves, intro** (`samples/analysis.json`; the same in all four entry runs to ≤ 0.4 px):

| Quantity | Source spring | Blind fit (measured) | Residual measured vs source model (RMS) | Overshoot | Settle to 0.5 px |
|---|---|---|---|---|---|
| AAP rise y 180 → 0 | k100 c8 (ζ 0.40, ω₀ 10 rad/s, response 0.628 s) | ζ 0.414, ω₀ 10.37, k 107.5, c 8.59, rms 0.21 px | 0.25 px (lag 34 ms) | −43.16 px = 24.0 % | 1439 ms after enter |
| Pill bg width 40 → 240 | k100 c10 (ζ 0.50) | ζ 0.524, ω₀ 10.42, k 108.6, c 10.9, rms 0.31 px | 0.34 px | 269.2 px peak = 14.6 % | 1655 ms after enter |
| Pill bg height 36 → 56 | k100 c10 | — | 0.04 px | 58.92 px peak (+2.9) | — |
| Button bg width 80 → 56 | k100 c10 | — | 0.05 px | 52.49 px min (−3.5) | — |
| Pill / button x | k100 c20 (critical) | — | 0.04 / 0.11 px | 0 | — |
| Blob w / h | k100 c8 | — | 0.07 / 0.05 px | w 62.23 peak (24.7 %) | hidden 548 ms |
| Dots x 36 → 0 | k200 c20 (ζ 0.707) | — | 0.06 px (dot0), 0.04 px (dot6) | −0.73 px = 2.0 % | — |
| Capsule `--progress-intro` 0 → 1 | k200 c20 | — | 0.002 | 48.75 px (1.9 %) | ≈1400 ms |
| `--alpha` (material) 0 → 1 | k100 c20 (critical) | — | 0.001 | 0 | blur 7.14 px at 1655 ms |

The blind fits land within 4–8 % of the source k and c. The residual comes from the integrator: semi-implicit Euler at 60 Hz with render interpolation, sampled at 120 Hz. The source model, run with that integrator, reproduces the live curves to ≤ 0.35 px. (`intro.x` shows 23.8 px RMS in the residual table only because the page clears the blob's inline style when it hides it at 0.52 s; before the hide it matches.)

**Contact sheets:**
- `frames/intro-1440-sheet.webp`: 30 tiles, −50 … +2000 ms, dock region 580 × 300.
- `frames/intro-1440-goo-split.webp`: 12 tiles, 450 … 750 ms, the blob-to-pill hand-off.
- `frames/intro-390-sheet.webp`: 10 tiles, phone.

### 2.2 The active capsule

The capsule is a dot link whose `min-width = 8 + 40 · max(0, 1 − |i − p|)` px (1440). Here `p = --autoplay-progress = scrollLeft / itemOffset[1]` is set on every scroll event (`samples/source/EFSM-autoplay-progress.js`, `overview-aap-dotnav.css`). The capsule geometry is therefore a **pure function of the gallery's scroll position**. It has no timing of its own; it inherits the slide tween's easeInOutQuad, and under a finger it is scrubbed directly.

**Length.** 48 px capsule against an 8 px dot (6×) at 1440; 32 px against 8 px at 390. The pill content width is constant: the sum of dot widths stays at 96.00–96.01 px (1440) and 79.98–80.00 px (390) through every move measured, so the pill never stretches while the active dot changes.

**Fill.** `::after`, black `#29292a`, round-capped (radius 10 px). Its width animates 0 → 115 % of the link, linear over 6.15 s, starting at `margin-inline-start: -15%` with `min-width: 15%`.
- Measured rate: **18.70 %/s** (RMS 0.01 %) over three full slides, so 0 → 115 % takes **6.150 s**.
- The visible fill begins at **0.80 s**, when the hidden 15 % nub clears, and reaches the right edge at 6.15 s.
- The fill rate is fixed in % of the link, so while the link is still widening during a transition, the fill's pixel speed rises with it.

Sources: `samples/analysis.json` → `autoplay.fill`, `ended.fill`.

**Hand-off between slides.** Not a worm: no state ever spans two dots.
1. At the 6.15 s boundary `.current` moves to the next dot. The outgoing capsule's fill vanishes at once, leaving an empty grey 48 px track (`rgba(0,0,0,0.42)`). The incoming dot's fill animation starts immediately.
2. About 25 ms later the scroll tween starts. The outgoing capsule shrinks 48 → 8 while the incoming dot grows 8 → 48, linearly in `p`, so on screen they follow easeInOutQuad. At most two dots are wider than 8 px at any instant.
3. At ±0.5 the two are equal (about 28 px each).

A multi-slide jump (dot 1 → 4, 3840 px) sweeps the enlargement through each intermediate dot in turn: dots 2 and 3 each grow and shrink as `p` passes. That is the closest thing to travel. Replay sweeps it through all seven dots in 1 s.

Per-frame (autoplay, `samples/timeline-autoplay.csv`; t = ms from entry):

| t ms | scrollLeft | p | w0 | w1 | fill on current (px) |
|---|---|---|---|---|---|
| 6128 | 0 | 0 | 48 | 8 | 54.98 (on dot 0) |
| 6162 | 0 | 0 | 48 (empty) | 8 | 1.19 (on dot 1) |
| 6195 | 1 | .001 | 47.97 | 8.03 | 1.20 |
| 6327 | 65 | .051 | 45.97 | 10.03 | 1.50 |
| 6487 | 257 | .201 | 39.97 | 16.03 | 2.39 |
| 6645 | 580 | .453 | 29.88 | 26.13 | 3.91 |
| 6687 | 683 | .534 | 26.66 | 29.34 | 4.39 |
| 6845 | 1011 | .790 | 16.41 | 39.59 | 5.94 |
| 7003 | 1209 | .945 | 10.22 | 45.78 | 7.27 |
| 7162 | 1280 | 1.0 | 8 | 48 | 9.05 |

Contact sheet: `frames/advance-capsule-sheet.webp` (14 tiles, −200 … +1100 ms).

### 2.3 Play/pause

The glyph does not morph. Three SVGs (play, pause, replay) swap by `display` under `.paused/.playing/.ended` in one frame (source CSS).

The button never scales: `transform` stayed `matrix(1,0,0,1,0,0)` through hover, press and toggle. Its responses are background-colour fades (`samples/playpause.json`; `frames/playpause-sheet.webp`):
- **hover:** transparent → `rgba(223,223,227,0.698)` in **92 ms**, linear (CSS `background-color linear 100ms`)
- **press (`:active`):** → `rgba(193,193,198,0.655)` in **91 ms**
- **release:** back to the hover colour in 96 ms, and the state toggles to paused
- **leave:** back to transparent in 99 ms

The fill pauses in place (`animation-play-state: paused`).

Inactive dots on hover darken `rgba(0,0,0,.42)` → `.54` in **241 ms**, linear (`samples/hoverdot.json`). A press and drag-off produced no press state.

### 2.4 Every way the carousel moves

All programmatic moves use one tween: `anim` time-group keyframe on `scrollLeft`, `duration = --shared-media-gallery-transition-duration = 1s`, `easeInOutQuad`, `scroll-snap-type: none` while it runs (`samples/source/gallery-animateToItem.js`). Slides are flat: no scale, opacity, blur, clip, corner-radius or z-order changes; they translate as one strip (spacing 1280 px at 1440). The captions carry the only per-slide motion:
- **parallax:** each caption's translateX = 162 px × (index − p), so captions lead the strip by 12.7 %
- **cross-fade:** outgoing caption opacity 1 → 0.51 at p = 0.20, 0.10 at p = 0.53, 0.025 at p = 0.70; incoming 0 → 0.15 at p = 0.53, 0.51 at p = 0.80, 1 at p = 1

The dock's glass does not change during any move: fill alpha stays 0.72 and blur 7 px (`samples/autoplay.json`).

| Gesture | Latency to first motion | Move | Fit: cubic-bézier (RMS, normalised) | easeInOutQuad T (RMS) | Overshoot | Peak velocity | Source |
|---|---|---|---|---|---|---|---|
| Autoplay advance 1 | 25 ms after `.current` switch | 0 → 1280 px | (0.476, 0.067, 0.521, 0.949) 0.0022 | 970 ms (0.0062) | 0 | 4063 px/s | `autoplay` |
| Autoplay advance 2 | — | 1280 → 2560 | (0.477, 0.054, 0.519, 0.944) 0.0034 | 983 ms (0.0045) | 0 | 4857 px/s | `autoplay` |
| Dot click, 3 slides | see note | 0 → 3840 | (0.478, 0.048, 0.522, 0.947) 0.0023 | 990 ms (0.0025) | 0 | 8784 px/s | `dotclick` |
| Dot click, adjacent | 50.6 ms | 3840 → 2560 | (0.479, 0.057, 0.524, 0.936) 0.0021 | 979 ms (0.0041) | 0 | — | `dotclick` |
| Dot click, 5 slides | 55.1 ms | 0 → 6400 | (0.477, 0.045, 0.524, 0.953) 0.0024 | 994 ms (0.0025) | 0 | 16061 px/s | `retarget` |
| ArrowRight | 28.6 ms | 0 → 1280 | (0.476, 0.054, 0.522, 0.952) 0.0022 | 983 ms (0.0038) | 0 | — | `keyboard` |
| Replay at end (6 → 0) | 39.9 ms | 7680 → 0 | (0.480, 0.045, 0.525, 0.958) 0.0045 | 997 ms (0.0043) | 0 | — | `ended` |
| Click during a move (dot 2 at +360 ms into a dot-6 move) | — | **ignored**: the move lands on dot 6 and the second click is dropped | — | — | — | — | `retarget` |
| Resize 1440 → 1000 → 600 → 1440 | 1 frame | instant re-snap (2560 → 1790 → 840 → 2560) | — | — | 0 | — | `resize` |
| Touch, slow drag 120 px / 1.2 s, release at rest (390) | after ~15 px slop | follows finger (0 → 105 px), then snaps back 105 → 0 in 185 ms | (0.409, 0.06, 0.596, 0.932) 0.0029 | — | 0 | 928 px/s | `touch` |
| Touch, fling 160 px in 100 ms (390) | — | 0 → 683 px (**two slides**: release velocity sets the landing), settle 1618 ms | (1.0, 0.782, 0.463, 0.867) 0.031 | — | 0 | 10000 px/s | `touch` |
| Touch, drag −150 then reverse +200, release moving | — | lands one slide back (683 → 341), 1426 ms | poor fit (0.032) | — | 0 | — | `touch` |
| Horizontal mouse-wheel (synthesised) | — | no movement | — | — | — | — | `wheel-x` |
| ArrowRight then End / Home / ArrowLeft | — | only ArrowRight moved; End, Home and ArrowLeft did not (G-3) | — | — | — | — | `keyboard` |

All tween fits sit at bézier ≈ (0.477, 0.054, 0.522, 0.948), about Penner's easeInOutQuad (0.455, 0.03, 0.515, 0.955). The fitted easeInOutQuad durations of 970–997 ms fall short of the source's 1000 ms because the 0.5 px start and settle thresholds cut the flat ends.

**Autoplay cadence.** One slide every **6.65 s**: advances began at 6.19 s and 12.84 s after entry. That is the 6.15 s dwell plus the 1 s move, minus the 0.5 s by which the time group jumps to `index × 6.15` at the move's midpoint. On the last slide the fill completes, the state becomes `.ended` and the replay glyph shows. There is **no wrap-around**: replay tweens back through all seven slides in 1 s.

**Dot-click note.** The first dot click in `dotclick` started 871 ms after the click. Playwright's pre-click scroll-into-view moved the page (scrollY 984 → 1797 → 905), and the AAP keyframe toggled pause and play on exit and enter. This is a harness artifact; the latency of an in-place click is the 50–55 ms of the other two clicks.

**Momentum.** Every programmatic move is a fixed 1 s ease. It carries no velocity and has no spring at landing (0 overshoot in all seven tween fits). Momentum lives only in the native scroller: a fling's release velocity chose a landing two slides away, and a slow release snapped back. Those curves belong to Chromium's scroll-snap and fling implementation, not to Apple's code. Safari's will differ (G-2).

**Contact sheet:** `frames/advance-gallery-sheet.webp` (6 tiles, whole viewport at 30 %).

---

## 3. Breath and momentum

- **Idle motion.** The only motion at rest is the **progress fill**: 18.70 %/s while playing, frozen when paused. It carries state (time left on the slide). There is no shimmer, glow or breathing on the pill, button or dots. When paused, the dock is completely still.
- **Rubber-band.** The page has no JS rubber-band. At slide 0, a 200 px rightward touch drag produced no `scrollLeft` change in Chromium (it clamps at 0, and headless Chromium shows no elastic overscroll). Any rubber-band on iOS Safari is native WebKit behaviour; it could not be measured here (G-2).
- **Press.** The button does not compress (scale stays 1). Press is a background-colour step in 91 ms. Dots have hover colour only.
- **Springiness lives in the entrance.** Of all dock motion, only the intro is spring-driven:
  - 24 % overshoot on the rise
  - 14.6 % on the pill width
  - a 4.6 px height bounce
  - 2 % on the dots

  Every state change after that (capsule hand-off, slide move, hover, press) is linear or easeInOutQuad, with no overshoot.
- **Reduced motion** keeps the sticky glass dock and the fill animation. It drops the intro, the springs, the tween and the continuous capsule. The capsule jumps whole, and autoplay waits for a press (§1).

---

## 4. Named properties

| ID | Property | Value | Rests on |
|---|---|---|---|
| P-01 | Dock geometry at rest (1440) | pill 240×56, button 56×56, gap 16, radius 28, group centred 564–876, sticky bottom 32 | `samples/analysis.json` (`init-slow.rest_bounds`), `samples/source/overview-aap-dotnav.css` |
| P-02 | Dock geometry at rest (390) | pill 216×56, button 56×56, gap 12, capsule 32 | `samples/analysis.json` (`mobile`) |
| P-03 | Dock material at rest | `backdrop-filter: blur(7px)`, fill `rgba(232,232,237,0.72)`, no border or shadow | `samples/census-1440-motion.json`, `samples/timeline-init-slow.csv` |
| P-04 | Intro trigger | one-shot threshold at `galleryTop − 100vh + 0.6·galleryH` (enter within +1.0 px at 300 px/s); identical timeline at any scroll speed or direction; no replay | `samples/analysis.json` (`enter_vs_start_px`), `samples/replay.json` |
| P-05 | Intro rise | translateY 180 → 0, spring k100 c8 (ζ 0.40); peak −43.16 px (24.0 %); settle 1439 ms; blind fit ζ 0.414 ω₀ 10.37 (rms 0.21 px) | `samples/timeline-init-slow.csv`, `samples/analysis.json` |
| P-06 | First visible pixel | 172.7 ms after enter | `samples/init-slow.json` (via `analyze`) |
| P-07 | Origin blob | single opaque `rgb(232,232,237)` blob, 30×80 → peak 62.2 w / 50.3 min h, scale 1.3 → 0.81, hidden at 548 ms | `samples/timeline-init-slow.csv`, `frames/intro-1440-goo-split.webp` |
| P-08 | Blob → pill hand-off | pill starts at 0.50 s, centred, 40×36 at scale 1.3; width spring k100 c10 → peak 269.2 (14.6 %), settle 1655 ms; blind fit ζ 0.524 (rms 0.31 px) | `samples/analysis.json`, `frames/intro-1440-goo-split.webp` |
| P-09 | Button buds from the pill | from 0.54 s: bg scale 0 → 1 (critical, 0.65 s) while sliding x −128 → 0 (k100 c20); bg width 80 → 52.5 min → 56 | `samples/timeline-init-slow.csv`, `frames/intro-1440-sheet.webp` |
| P-10 | No metaball goo | separate same-colour spans; no `filter` on the dock; continuity from matched colour, size and centre at the swap | `samples/census-1440-motion.json`, `samples/source/kLl-AllAccessPass-base.js` |
| P-11 | Dot entrance | x 36 → 0 (k200 c20, overshoot −0.73 px = 2 %), staggered 20 ms per dot from 0.74 s; opacity of all dots together at 756 ms (100 ms ease-in) | `samples/timeline-init-slow.csv`, `samples/source/ym6t-MediaCardGalleryControl.js` |
| P-12 | Capsule opens | `--progress-intro` 0 → 1 (k200 c20): capsule 8 → 48.75 peak (1.9 %) → 48 | `samples/timeline-init-slow.csv` |
| P-13 | Glyph entrance | opacity at 956 ms (100 ms), scale 0.5 → 1 by 1139 ms (200 ms ease-out) | `samples/analysis.json` (`btn_visible_ms`, `btn_scale_rest_ms`) |
| P-14 | Material frosts in | from 1.0 s: blur 14 → 7 px, fill alpha 1.0 → 0.72 (critical, k100 c20); 7.14 px at 1655 ms | `samples/timeline-init-slow.csv` |
| P-15 | Source model fidelity | page integrator re-simulated: ≤ 0.35 px RMS on every intro spring, in 4 runs | `samples/analysis.json` (`residual_vs_source_model`), `samples/model-intro-*.json`, `tools/model.py` |
| P-16 | Capsule length | 48 px vs 8 px dot (6×) at 1440; 32 vs 8 at 390 | `samples/timeline-autoplay.csv`, `samples/timeline-touch.csv` |
| P-17 | Capsule is slaved to scroll | width = 8 + 40·max(0, 1 − abs(i − p)), p = scrollLeft / 1280; pill content constant (dot sum 96.00–96.01 px) | `samples/source/EFSM-autoplay-progress.js`, `samples/analysis.json` (`dotsum_range`) |
| P-18 | Hand-off shape | linear width trade between two adjacent dots, at most 2 enlarged at once, no worm span; multi-slide jumps sweep through each intermediate dot | `samples/timeline-autoplay.csv`, `samples/timeline-dotclick.csv`, `frames/advance-capsule-sheet.webp` |
| P-19 | Old capsule empties at switch | outgoing fill vanishes in one frame at `.current` change; incoming fill starts at once | `samples/timeline-autoplay.csv` (6128 → 6162 ms) |
| P-20 | Fill rate | 18.70 %/s of the link (RMS 0.01 %), 0 → 115 % = 6.150 s, visible from 0.80 s, linear, round cap | `samples/analysis.json` (`autoplay.fill`) |
| P-21 | Slide tween | 1 s easeInOutQuad on `scrollLeft`; bézier fit ≈ (0.477, 0.054, 0.522, 0.948), RMS ≤ 0.0045; 0 overshoot; snap disabled while running | `samples/analysis.json` (7 segments), `samples/source/gallery-animateToItem.js` |
| P-22 | Input latency | click 50–55 ms, ArrowRight 29 ms, replay 40 ms, `.current` → motion 25 ms | `samples/analysis.json` (`mark_to_start_ms`) |
| P-23 | Retarget | a click during a move is dropped; the move finishes at its first target | `samples/retarget.json` (final cur 5, sl 6400) |
| P-24 | Autoplay cadence | one slide per 6.65 s (6.15 s dwell + 1 s move − 0.5 s); no wrap; `.ended` → replay rewinds 7680 → 0 px in 1 s | `samples/analysis.json` (`autoplay`, `ended`) |
| P-25 | Slides are flat | translate only (pitch 1280 px); no scale, opacity, blur or radius change | `samples/autoplay.json` (`slides`) |
| P-26 | Caption parallax and fade | translateX 162 px per slide (leads the strip by 12.7 %); out 0.51 at p 0.20; in 0.51 at p 0.80 | `samples/autoplay.json` (`caps`) |
| P-27 | Dock glass is static in moves | fill 0.72 and blur 7 px, unchanged by slide moves or slide theme | `samples/autoplay.json` |
| P-28 | Button hover / press | bg fade 92 ms linear to `rgba(223,223,227,.698)`; press 91 ms to `rgba(193,193,198,.655)`; no scale | `samples/playpause.json` |
| P-29 | Glyph swap | `display` toggle in one frame, no morph | `samples/source/overview-aap-dotnav.css`, `frames/playpause-sheet.webp` |
| P-30 | Dot hover | `rgba(0,0,0,.42)` → `.54`, 241 ms linear | `samples/hoverdot.json` |
| P-31 | Touch drag | 1:1 tracking after ~15 px slop; capsule scrubbed continuously (dot sum 80 px held) | `samples/timeline-touch.csv` |
| P-32 | Release velocity sets the landing (native) | fling 1600 px/s → two slides (683 px, 1.62 s); slow release snaps back in 185 ms; reversed drag lands one slide back | `samples/analysis.json` (`touch`) |
| P-33 | No JS rubber-band | overscroll at slide 0 moved nothing (Chromium) | `samples/timeline-touch.csv` (after 10166 ms) |
| P-34 | Idle | only the state-bearing fill moves; paused dock is static; no shimmer, glow or breathing | `samples/playpause.json`, `samples/autoplay.json` |
| P-35 | Resize | instant re-snap to the current slide, no animation | `samples/analysis.json` (`resize`) |
| P-36 | Reduced motion | no intro (static dock), instant slide change, integer capsule, no autoplay until pressed; fill still runs at 18.7 %/s | `samples/timeline-reduced.csv`, `samples/census-1440-reduced.json` |
| P-37 | No dark scheme | 0 `prefers-color-scheme` rules; dark load = light load | `samples/census-1440-dark.json` |

## 5. Gaps

- **G-1.** All timing is Chromium headless at 120 Hz with the 1-min load at 9.6–12.3. The spring integrator runs fixed 1/60 s steps with interpolation, so its curves are rate-independent. The CSS transitions and the 1 s tween use wall time and would match on other engines, but this was not verified in WebKit (Chromium-only run per the machine law).
- **G-2.** Native scroll physics come from Chromium, not Apple: fling decay, snap curve, rubber-band, and horizontal trackpad scrolling (synthesised wheel produced no movement). Safari's are not measured.
- **G-3.** Keyboard: only the first ArrowRight moved. End, Home and ArrowLeft did not, probably because focus moved after the first move (roaming tabindex). Not resolved.
- **G-4.** The intro sheets come from a screencast in wall time. Tile labels give requested vs actual frame offsets (≤ 12 ms apart). The frames illustrate; the samples are the measurement.
- **G-5.** Census only, not filmed: the product viewer's own sticky controls (spring tour morph, bounce 0.42), the paddlenav galleries (`#explore-gallery`, `#incentive-gallery`), `FadeGallery`, `HardwareZoom`, `VideoScrub`. Slide videos were not measured from pixels.
- **G-6.** The first dot-click measurement is a harness artifact (Playwright scroll-into-view, §2.4). The in-place click latency rests on the other two clicks.
