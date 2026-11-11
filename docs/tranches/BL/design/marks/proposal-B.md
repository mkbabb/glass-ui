# Marks, proposal B: the drawn stroke, disciplined

Proposer B (claude-fable-5-2), 2026-11-11, for INBOUND O-251 with O-183, O-190, O-206 and O-230.
Prototype cut from `release/11.1.0` at `5a27994f3`. Everything below was measured in paint in
Playwright's Chromium headless shell and Playwright WebKit build 2287, every run under `guarded`
(WebKit under `--exclusive webkit`); none was refused.

- Prototype: `proposal-B/prototype.patch` (`git apply --check` passes on `release/11.1.0`; 17 files,
  1,525 lines added).
- Captures: `proposal-B/captures/{chromium,webkit}/png/` (cropped per specimen) and
  `proposal-B/captures/sheets/` (the same crops stacked, one file per question).
- Readings: `proposal-B/captures/<engine>/paint-<engine>.json`, `stall-<engine>.json`,
  `diag-<engine>.json`.

**The result in one paragraph.** One stroke per line, every dimension read from the text. In
both engines the underline's ends land within 0.5 px of the marked glyphs' ink (1 px on the
RTL run in WebKit; 11.1.0 runs past
by up to 7.5 px at the start and 17.5 px at the end), no stroke pixel touches a glyph pixel
(11.1.0 overlaps by up to 82 px²), and its weight is the face's own hyphen times 1/φ (9 px under
a 112 px Jakarta 800 figure, where 11.1.0's nib is 6.9 px). The draw animates `transform` alone
on the `present` spring; in Chromium at 4× CPU it paints 4 to 5 frames inside a 50 ms main-thread
task, with zero layout events and zero layout reads from mount to `drawn` other than one measure
in an observer task. Two things are not proven: WebKit's draw under a blocked main thread could
not be read by this method (same as lane L7), and real Safari was not run.

## 1. The argument

A mark tells a reader which words carry the weight, at a glance, without competing with the
type. So the mark answers to the type, and every dimension it has should be the text's own.

**What 11.1.0's stroke gets wrong, in paint** (`sheets/chromium-before-after-underline.png`):

| specimen | 11.1.0 start / end past the ink (px) | 11.1.0 stroke-on-glyph overlap (px²) |
| --- | --- | --- |
| "4,485", 112 px | −7.5 / +9 | 72.8 |
| "4,485", 85 px | −5.5 / +7 | 48.3 |
| "4,485", 48 px | −3 / +4 | 15.8 |
| "Wake County", 18 px | −1 / +2 | 4 |
| "Google", 18 px | −1.5 / +2 | 3.3 |
| three-line run, 24 px (worst of each over its lines) | −6.5 / +10 | 24.3 |
| RTL run, 28 px | −4.5 / +17.5 | 1.8 |

(Chromium; WebKit agrees within 0.5 px on the Latin rows and reads 81.8 px² overlap on the RTL
row. A negative start is left of the ink.) The cause is in `stroke.ts`: the stroke is built from
the advance box, not the ink, then lengthened by a random 0.5 to 2 % lead and 1.2 to 3.5 % exit;
its seat is `baseline + 0.1em` from constants for Plus Jakarta Sans 400 whatever the face; and
its nib is `0.2 · fs^0.75`, which thins relative to the letters as they grow.

**Why it reads machine-made.** It stacks six seeded randoms on one line (a sag, a second bow
mode, a shear tilt, a lift-off hook, and an overrun at each end) over a taper at both ends, and
re-seeds them for every line. A confident hand does the opposite. A fast stroke is straight, because wobble is what
slowness looks like; it starts where the word starts and stops where it stops; it has one arc,
the wrist's; and it thins once, as the pen lifts. Variation that the eye can name as variation
is noise.

**So the hand is two seeded numbers and nothing else:**

- one bow: the stroke sags by 0.3 to 0.55 % of its length, never more than 0.02em (2.2 px at
  112 px, 0.4 px at 18 px), level at both ends. No tilt: the baseline is a hard reference and a
  1° tilt on a 500 px stroke is a 9 px error.
- where the bow is deepest (the two control heights skewed by up to ±25 %).

The underline also thins from full weight at its start to 0.8 at its end. That is not seeded:
it is the same on every stroke, and it gives the stroke a direction, which the draw then follows.
At body size all of this is under half a pixel, so a body underline is a plain rule with round
ends. The hand shows only where there is room for it.

**Each dimension, and where it comes from:**

| dimension | source | value on Jakarta 800 at 112 px |
| --- | --- | --- |
| extent | the ink box of the line's glyphs (first glyph's ink start to last glyph's ink end), per line box | 0 to 0.5 px from the ink |
| baseline | the line's `Range` rect and the font's ascent and descent | |
| weight | the ink thickness of the face's own hyphen × 1/φ, floor 1.25 px | hyphen 14.6 px → stroke 9 px |
| underline seat | hangs its own thickness below the baseline, never closer than 0.06em + 1 px | 9 px below |
| descenders | the stroke stops and starts again where glyph ink enters its seat, keeping half a stroke of clearance | gap at the comma |
| highlight band | x-height to baseline, bled by one hyphen thickness above, below and at each end | 95 px tall |
| ink | `--mark-ink`, default `--primary`; the band derives from it | |

The hyphen is the face's own answer to "how heavy is a free horizontal stroke here", and it
follows weight and size together: 0.13em at Jakarta 800, 0.07em at 400. Multiplying by 1/φ keeps
the stroke under the letters' own weight. The owner's "thin" is the allometric nib; this one is
proportional.

**Skip, not clear.** An underline that clears a 112 px comma sits 0.2em below the baseline and
reads as a rule belonging to the next line (Gregg's leading is 1.04). Breaking the stroke around
descenders is what signwriters do and what every browser's `text-decoration-skip-ink` now does,
so the no-script fallback and the stroke agree. A consumer who wants clear sets
`--mark-offset: 0.2em`; past the descender depth no glyph enters the seat and the stroke runs
whole (O-230's additive offset).

**The family.** Two shapes survive, the two the owner named.

- **underline, highlight: keep.** Gregg mounts only these (`Section.vue:17`); atlas mounts the
  default underline.
- **circle: cut.** It cannot draw per line box, it reserves `padding-inline` (it shifts layout),
  it is the one shape lane L7 left on `stroke-dashoffset` (it still stalls: rise 0 to 0.002 in
  L7's own reading), and an overswept, creeping ring is the family's most ornamental member. No
  consumer mounts it.
- **strike: cut.** Its job is deletion, which is `<del>` or `<s>` with a native line-through. A
  drawn stroke across letterforms competes with the type by design, and no consumer mounts it.

**The draw.** One stroke drawn once, from the inline start, when the reader reaches it. Cut with
it: the 0.85 → 1 opacity settle, the scroll ink-lag and its 570 ms settle at every scroll stop
(O-230 (3)), the hover, press and focus re-ink, the frame-rank stagger between marks, `retrigger`,
and `play()`. Each is a second motion with no change of state behind it.

## 2. The API

```vue
<TextMark>4,485</TextMark>                       <!-- underline, focal ink, draws in view -->
<TextMark shape="highlight">Wake County</TextMark>
<TextMark color="var(--focal-ink)" draw="mount" @drawn="next()">4,485</TextMark>
```

| | 11.1.0 `HandMark` | proposal |
| --- | --- | --- |
| component, subpath | `HandMark`, `./handmark` | **renamed** `TextMark`, `./text-mark` (it promises text, not a hand; no alias) |
| `shape` | underline, strike, circle, highlight | **kept**; underline, highlight |
| `color` | a colour, but a hue number for the highlight | **kept**; any CSS colour for both shapes; also the token `--mark-ink` |
| `draw` + `trigger` | `draw: boolean`, `trigger: "mount" \| "in-view"` | **merged** into `draw: "in-view" \| "mount" \| "none"`; default `in-view` (was mount) |
| `retrigger` | redraw on each entry | **deleted** |
| `weight` | nib multiple | **deleted**; the weight is the face's |
| `seed` | per-instance seed | **deleted**; seeded from the marked text, plus the line index |
| `drawn` | once per draw | **kept**; fires after the last line's last frame, or after the first measure when nothing moves |
| `play()` | replay | **deleted** |
| host element | `<span>` wrapping `<del>` / `<mark>` | `<span>` for underline, `<mark>` for highlight; no wrapper |
| offset | none | **new** token `--mark-offset` (em, added to the underline's drop) |
| pure exports | `handLine`, `handRing`, `handBand`, `strokeRibbon`, `serialize`, `markDuration`, `minJerk`, `SHAPES` | `markStroke(shape, line, face, seed)`, `seatOf`, `SHAPES` and their types. atlas's `InkStroke.vue`, `AnimatedRule.vue` and `PaperCallout.vue` import `handLine` + `strokeRibbon`; they move to `markStroke` with a `Line` of their own, in atlas's tranche |

It replaces the default marks and renames the subpath, so it lands in **12.0.0**.

**The plain-CSS fallback** (no script, SSR before hydration, a consumer who wants no component):

```html
<span class="tm">4,485</span>      <mark class="tm">Wake County</mark>
```

```css
.tm      { text-decoration: underline; text-decoration-color: var(--mark-ink, var(--primary));
           text-decoration-thickness: 0.07em; text-underline-offset: 0.09em;
           text-decoration-skip-ink: auto; }
mark.tm  { text-decoration: none; color: inherit; background: <the band>;
           box-decoration-break: clone; }
```

The component renders exactly this element and class. On mount it sets `data-live`, which turns
the decoration off (outside forced colours) and hands the job to the stroke. In the prototype
the rules sit in the SFC's style block; in the library they belong in `src/styles/` so the class
works without importing the component. Capture: `sheets/chromium-still.png`, last four frames
(`still-*-no-script-*`).

## 3. The mechanism

**Measure** (`measure.ts`), once, where layout is already clean:

1. `onMounted` reads nothing. It sets `data-live` and registers one `IntersectionObserver`.
2. The observer's first report arrives in its own task after the first layout. There the mark
   walks its text nodes, takes a `Range` rect per character to split each node by line, and
   gets one piece per text node per line. Nested markup and negative margins are layout's
   business and arrive already resolved (the `nest` specimen is Gregg's own markup, the comma
   tucked in a span).
3. Each piece is drawn once into a small canvas in its own computed font (with its
   `letter-spacing`, `word-spacing`, kerning and direction) and read back: the ink's first and
   last column give the ink box; the columns with ink in the underline's rows give the skips.
   The face's x-height and hyphen thickness are read the same way from an `x` and a `-`, once
   per font.
4. A `ResizeObserver` on the nearest block ancestor measures again when the run can re-wrap,
   and a late font re-arms it.

**Geometry** (`geometry.ts`, pure): the centreline is one cubic with x linear in its parameter,
so the top and bottom edges are exact cubics too, and each piece between skips is one closed
path: two cubics and four arcs. No polyline. Underline ends are full rounds; band corners are
0.14 of its height.

**Draw.** Per line: `span.tm-window` (`overflow: hidden`, the stroke's bounds in px) holding one
`svg.tm-frame`.

| animates | on | from → to | clock |
| --- | --- | --- | --- |
| `transform` | `.tm-window` | `translateX(∓100%)` → `translateX(0)` | `--spring-present-duration` on `--spring-present` |
| `transform` | `.tm-frame` | `translateX(±window width)` → `translateX(0)` | the same |

Nothing else animates. The two transforms cancel at every frame, so the ink holds still and the
window's edge travels along the line (lane L7's reveal, kept). The sign follows the line's
direction, so an RTL stroke draws from the right. Line `i` waits `i × --spring-present-duration`.
The clock is `springPreset("present")`'s CSS row: ζ = 1, settle 0.2 s, read as tokens, no
literal. `present` is the row whose job is a thing born from its anchor with a dead landing. A
row with ζ < 1 would carry the window past its end and clip the stroke's start; `world` is also
ζ = 1 but its job is under-layer travel and it takes 0.57 s.

Mid-draw, the stroke's leading edge is the window's straight cut, not a round cap. It is on
screen for under 200 ms per line (`sheets/chromium-draw-underline-h112.png`).

**States.**

- Reduced motion and print: the draw and the undrawn wait exist only under
  `@media screen and (prefers-reduced-motion: no-preference)`, so elsewhere the stroke stands
  whole with nothing to undo. Read: 0 running animations, window transform `none`, and `drawn`
  from all 7 marks that listen for it, both engines.
- Forced colours: `.tm-window { display: none }` and the element keeps its decoration: a real
  underline, and `Mark` / `MarkText` on the band. Read in both engines: window `display: none`,
  `text-decoration-line: underline`, band `rgb(255, 255, 0)`.
- The stroke is `aria-hidden`, takes no pointer events and is not selectable; the words are the
  element's own text.

## 4. The prototype

`prototype.patch` adds `src/components/text-mark/` (`TextMark.vue`, `geometry.ts`, `measure.ts`,
`index.ts`), one line in `scripts/lib/subpath-policy.mjs` (vite refuses an unclassified
component directory), and the fixture at
`docs/tranches/BL/design/marks/proposal-B/fixture/`. `vue-tsc --noEmit -p tsconfig.src.json`
exits 0. There are no unit tests in the patch.

The fixture (`fixture.ts`, served by the repo's vite) has one sheet scene with seven specimens:
the comma headline at 48, 85 and 112 px (Plus Jakarta Sans 800, `letter-spacing: -0.045em`,
`line-height: 1.04`, Gregg's values; the face is the repo's own woff2 declared
`font-display: block` so it is certain to be used); the same figure in Gregg's nested markup;
"Wake County" and "Google" at 18 px; a three-line run at 24 px; an Arabic RTL run at 28 px.
Query flags choose the shape, the theme, the implementation (`new`, `old` = 11.1.0's HandMark,
`css` = the bare fallback), the draw, and ink-only renderings for measurement.

Run it: `fixture/all.sh <chromium|webkit> <out-dir>` (each probe in its own guarded run; `diag.mjs`
and `inview.mjs` run the same way through `run.sh`), then
`python3 fixture/sheets.py <captures-dir> <engine>`.

## 5. Paint

Sheets (each is the cropped per-specimen PNGs stacked; the singles are in
`captures/<engine>/png/`):

| question | Chromium | WebKit |
| --- | --- | --- |
| every specimen at rest, underline, light / dark | `sheets/chromium-rest-underline-{light,dark}.png` | `sheets/webkit-rest-underline-{light,dark}.png` |
| every specimen at rest, highlight, light / dark | `sheets/chromium-rest-highlight-{light,dark}.png` | `sheets/webkit-rest-highlight-{light,dark}.png` |
| three mid-draw frames then rest: headline, body, three-line, RTL | `sheets/chromium-draw-{underline,highlight}-{h112,body,wrap,rtl}.png`, `…-h112-dark.png` | `sheets/webkit-draw-…` |
| 11.1.0 above, proposal below | `sheets/chromium-before-after-{underline,highlight}.png` | `sheets/webkit-before-after-…` |
| reduced motion, print, forced colours, no script | `sheets/chromium-still.png` | `sheets/webkit-still.png` |

The mid-draw frames are the animations paused and sought to 10 %, 25 % and 50 % of each mark's
own clock (lines × 200 ms); the first line's window is then 11.3 %, 41.8 % and 77.8 % open (the
spring is front-loaded). The highlight's body sheet holds the rest frame only.

**Fit, measured in paint** (`fit` in `paint-<engine>.json`). Two ink-only renderings at 2×, the
marked words alone and the strokes alone, are compared per line. Deltas are stroke minus glyph
ink in CSS px, resolution 0.5 px; a negative start or a positive end is past the text.

| underline | Chromium start / end | WebKit start / end | overlap px² (both) |
| --- | --- | --- | --- |
| "4,485" 48 px | 0 / +0.5 | 0 / 0 | 0 |
| "4,485" 85 px | 0 / 0 | 0 / 0 | 0 |
| "4,485" 112 px | −0.5 / 0 | −0.5 / +0.5 | 0 |
| "4,485" nested markup, 85 px | 0 / −0.5 | 0 / −0.5 | 0 |
| "Wake County" | 0 / −10.5 | 0 / −10.5 | 0 |
| "Google" | 0 / 0 | 0 / +0.5 | 0 |
| three-line run, lines 1 to 3 | 0 / 0 each | 0 / 0 each | 0 |
| RTL run (left / right) | +9 / −0.5 | +12.5 / +1 | 0 |

- The −10.5 on "Wake County" and the +9 / +12.5 on the RTL run are skips: the run ends in a
  descender (the y; an Arabic tail), so the stroke stops short of it.
- The worst overrun is 0.5 px, and 1 px at the RTL run's right end in WebKit.
- The highlight bleeds by one hyphen thickness, as designed: ±16.5 px at 112 px, ±11.5 at
  85 px, ±6.5 at 48 px, ±2 at 18 px, ±3 at 24 px (11.1.0's band: −7.5 / +4 at 112 px, and
  +17.5 at the RTL run's right in Chromium).
- A highlight under lining figures leaves their tops above the band: cap height is 0.745em and
  the band reaches 0.546 + 0.13 = 0.676em.

**In view** (`inview-<engine>.json`, both engines, both shapes). In a 420 px viewport the RTL
mark sits 1,245 px down: after 1.5 s it reads `data-ink="wait"` with its window translated a
full width away, and the page's `drawn` count is 2 (the two marks in view). Scrolled to, it reads
`draw` with the window home and the count is 6. Scrolled away and back, it still reads `draw`
and the count stays 6: a mark draws once.

**Re-wrap.** Narrowing the viewport to 340 px re-wraps the three-line run into four lines. The
proposal redraws four strokes on four lines. 11.1.0 keeps three strokes, the worst 208.9 px
from its line, in both engines (`resize` in the JSON; `png/resize-<engine>-{new,old}-340.png`).
The likely cause, read from source and not traced: its `ResizeObserver` observes the inline
host (`HandMark.vue:500-501`), and an inline box reports no size. This is a defect in 11.1.0 as
shipped, separate from this proposal.

**A hard-constraint failure found and cured on the way.** The first build read ink from
`TextMetrics`. WebKit 2287 returns the advance box there: for "4,485" at 112 px
`actualBoundingBoxLeft` is 0 and `actualBoundingBoxRight` equals `width` (305.98), where
Chromium returns −3.58 and 305.65; and a hyphen's ascent plus descent reads 37.84 px there
where Chromium reads 14.56, as if its negative descent were clamped to 0 (`diag-<engine>.json`). In paint that build's WebKit
stroke started 3.5 px left of the figure and was 5.5 px tall against Chromium's 10
(`captures/webkit-textmetrics/`). Reading the canvas pixels instead brought WebKit to the table
above. Any design that takes ink bounds from `measureText` has this failure in WebKit.

## 6. The draw under load, and the reads

`stall.mjs`, lane L7's method: mount one mark, wait until the draw is 40 ms in, block the main
thread for 50 ms; read paint from the page's screencast; place frames by a corner marker, not a
clock; a control square on a plain transform proves the screencast sees compositor frames inside
the task. Chromium runs at a 4× CPU throttle.

**Chromium** (`stall-chromium.json`; strips in `png/stall-chromium-*`):

| cell | frames inside the 50 ms task | stroke progress at task start → inside → first frame after |
| --- | --- | --- |
| headline 112 px, underline | 5 | 0.28 → 0.37, 0.56, 0.62, 0.68, 0.74 → 0.83 |
| headline 112 px, highlight | 4 | 0.38 → 0.55, 0.63, 0.66, 0.73 → 0.80 |
| three lines, underline | 5 | 0.07 → 0.09, 0.11, 0.12, 0.13, 0.14 → 0.15 |
| three lines, highlight | 5 | 0.06 → 0.08, 0.10, 0.12, 0.13, 0.13 → 0.15 |
| body 18 px, underline | 4 | 0.48 → 0.57, 0.65, 0.71, 0.84 → 0.88 |

In every cell the control moved, the animated property set is `["transform"]`, every animation's
duration equals `--spring-present-duration` (200 ms) with the `present` easing, `drawn` fired
once, and the stroke is whole (≥ 99 % of final ink) from `drawn` on. The three-line cells rise
slowly in share because the task lands in the first of three 200 ms lines.

**Frame cost** (the traced pass, same throttle and task):

| | headline underline | three-line highlight |
| --- | --- | --- |
| draw start → `drawn` | 202.4 ms | 593.1 ms |
| display frames drawn and swapped in that window | 24 | 71 |
| worst gap between two frames | 10.2 ms | 10.1 ms |
| main thread `Layout` events in that window | 0 | 0 |
| main thread style recalcs in that window | 13, 1.41 ms in all | 25, 6.64 ms in all |
| main thread `Paint` events | 4, 0.83 ms | 4, 1.17 ms |
| mount → draw start | 52.8 ms | 58.8 ms |

The worst frame gap stays at 10 ms across a 50 ms blocked task (the headless shell presents at
about 8.3 ms). The style recalcs are the main thread's own animation ticks, and include the
fixture's control square. Mount to draw start is one observer task plus one measure, at 4× CPU;
it was not measured at 1×.

**No layout read per frame, none in the mount task.** The fixture wraps every layout and style
read (`getBoundingClientRect`, `getClientRects`, `Range` rects, `getComputedStyle`, the offset,
client and scroll getters) and the canvas reads, and logs each with the phase it ran in. The
mount phase is `__mount()` plus Vue's flush and the microtasks after it.

| phase | reads (headline underline; three-line underline) |
| --- | --- |
| mount task | 0; 0 |
| the observer task after it (the one measure) | 4 `getComputedStyle`, 1 element rect, 6 `Range` rects, 4 `measureText`, 3 `getImageData`; and 4, 1, 65, 8, 5 |
| draw start → `drawn` | 0; 0 |
| inside the 50 ms task | 0; 0 |

Both engines, all five cells (`reads` in `stall-<engine>.json`; the `probe` rows there are the
probe's own reads).

**WebKit: not measurable by this method.** In all five cells the screencast delivered 0 frames
inside the task and the control square did not move, so the cells are recorded as unmeasurable,
not as passes (lane L7 found the same on 11.1.0). What WebKit does show: `transform` alone on
the `present` clock, 0 reads in the mount task and in the draw, `drawn` once, and the stroke
whole from `drawn` on.

## The hard constraints

| | holds? | evidence |
| --- | --- | --- |
| (a) works in paint in both engines or fails loud | yes | §5; no canvas or no `IntersectionObserver` throws |
| (b) compositor-only draw, survives 4× CPU + 50 ms task | Chromium yes; WebKit unmeasured | §6 |
| (c) no layout read per frame, none in the mount task | yes, both engines | §6 ledger; 0 `Layout` events in the draw (Chromium trace) |
| (d) a wrapping run draws per line box | yes | three strokes on three lines, four after re-wrap; lines draw in turn |
| (e) decoration only; text untouched; forced colours real | yes | §3 states; `sheets/*-still.png` |
| (f) plain `text-decoration` fallback with no script | yes | §2; `still-*-no-script-*` |

## What is not done, and what is mine to be argued with

- **WebKit under a blocked main thread is unproven**, and real Safari was not run.
- **Fonts the canvas cannot reproduce.** `font-feature-settings` and variation axes other than
  weight do not reach a canvas font. The prototype scales the canvas onto layout's width when
  the two are within 8 % and otherwise uses it unscaled, silently. That should warn in dev and
  keep the native decoration. No specimen here exercises it.
- **Slot text that changes without resizing the block is not re-measured** (the prototype has
  no `onUpdated` hook), and neither is a reflow that moves lines inside a block of constant
  size. 11.1.0 has the second limit too.
- **Mixed-direction text inside one text node on one line** is measured as one piece in the
  paragraph's direction. Vertical writing modes are not handled.
- **The mark appears one observer task after mount.** With `draw="none"` the words paint
  first and the stroke follows. An SSR page shows the native decoration, then the stroke draws
  on hydration; whether a hydrated mark should draw at all is open.
- **The weight (hyphen × 1/φ, floor 1.25 px), the seat and the 0.8 taper are my eye on these
  captures.** The offset has a token; the weight does not yet.
- **`in-view` waits for half the mark**, as 11.1.0 does. A mark taller than two viewports never
  reaches it.
- **Piece rules.** A piece between two skips shorter than three stroke thicknesses is dropped,
  so a run of adjacent descenders gets a longer gap. An underline whose run ends in a descender
  stops short of it.
- **`retrigger`, `seed` and `play()` are deleted on argument, not on a consumer census** beyond
  a grep of Gregg's and atlas's `src/`. O-183 asked for retrigger in view, and atlas's
  `StoryBeat.vue:55` passes `seed` (and a `clock="scroll"` that 11.1.0 does not declare).
- The last source edits (a type cast in `measure.ts`, two `const`s in `geometry.ts`) were made
  after the captures; `vue-tsc` passed after them and they change no behaviour.
