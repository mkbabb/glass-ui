# Marks · Proposal A · the typographic mark

Proposer A (claude-fable-5-2), 2026-11-11, for INBOUND O-251. Built and measured on a scratch
worktree of `release/11.1.0` at `5a27994f3`. Engines: Chromium headless shell 149.0.7827.55 and
Playwright WebKit build 2287 (reports 26.5), every run under `guarded`, the WebKit runs under
`--exclusive webkit`. I have not read the other proposal.

- Prototype: `proposal-A/prototype.patch` (applies to `release/11.1.0`; `git apply --check` passes).
- Paint and readings: `proposal-A/captures/` (214 PNGs in `png/`, four JSON files, four overview sheets).

## The proposal in brief

**The mark is a CSS text decoration. The component only draws it in.**

- An underline is `text-decoration: underline` with skip-ink. A highlight is the same decoration
  grown to the font's x-height and pulled up behind the glyphs. Neither uses SVG, a measured rect or
  a font constant.
- The browser places both from the glyph run and the font: per line box, in either direction, never
  past the text. Measured ink is never more than 0.24 px past the run's box, on all 14 lines per shape, in both engines.
- The draw is one property, `transform`, on the `present` clock (200 ms per line). It kept painting
  through a 50 ms task at a 4x throttle in Chromium, with zero layout reads and zero `Layout` events
  during the draw.
- At rest, under reduced motion, in print, in forced colours and with no script, the mark is the
  stylesheet alone.
- The family is two shapes. Strike and ring go, and so do the seed, the wobble, the overrun, the
  re-ink and the scroll lag.

**Three things the measurement turned up that a reader should know before choosing this:**

1. **Chromium's skip-ink is not unconditional.** With the underline's top 0.10 to 0.14em under the
   baseline, Chromium left the y of "County" and the g of "Google" uncut at 2 or 3 of every 64
   sub-pixel line positions (16 px text). At 0.08em it cut at all 64 at every size tried (13 to
   112 px), and at 0.04 and 0.06em at 16 px. The default is therefore 0.08em. The mark's cure for O-230 rests on the engine's
   skip-ink, and this is its one known soft spot.
2. **WebKit's stall reading is unmeasurable**, as lane L7 found: its screencast saw no compositor
   frame inside the task on any cell. WebKit witnesses the property (`transform`), the clock, the
   states and the paint, not the stall.
3. **The draw copies the text for 200 ms per line.** A reflow inside that window (a late font,
   a resize) leaves the copies where they were measured until they land. The rest state is never affected.

## 1 · The argument

A mark tells a reader which words carry the weight, at a glance, without competing with the type.
That is a typographic job, and type already has two marks for it: the underline and the highlight.
The browser already knows where both go. It knows the run's extent on each line, the baseline, where
a descender crosses, and the x-height (`ex`).

Today's HandMark re-derives all of that in script, then departs from it on purpose. Each report is
one of those departures (`src/components/handmark/` on `release/11.1.0`):

| what the owner and Gregg saw | where it comes from |
| --- | --- |
| runs past the text | `stroke.ts:128-129`: a lead of 0.5 to 2 % and an exit of 1.2 to 3.5 % of the run, by design; the band overruns 1 to 2 % a side (`:210`) |
| wobbles | `stroke.ts:130-133`: a seeded sag, bow, shear and lift-off hook |
| thin | `stroke.ts:72`: `0.2 · fs^0.75`, which is 6.3 px at 100 px beside an 800-weight stem |
| crosses descenders | `stroke.ts:44`: a fixed seat 0.1em under a baseline estimated from one face's constants (`:32-34`, Plus Jakarta Sans 400), with nothing that knows where a glyph is |
| settles at every scroll stop | `HandMark.vue:406` and `:652`: a scroll listener and a `world` transition per mark |

`captures/before-gregg-live-1440-light.png` is the frame: the stroke passes through the comma's
tail and overruns both ends.

So the mark starts from the text. Its extent is the glyph run. Its seat comes from the font. Its
weight comes from the font size. Its ink is the focal colour. All four are things CSS text
decoration computes, so none of them is written twice.

**What "hand-drawn" means under restraint: one thing.** The ink is laid down once, along the line,
in the reading direction. That is the only quality the mark has that a typeset rule does not, and it
is also the draw. Everything else that read as a hand (wobble, taper, overrun, hook, a seed per
instance, a re-ink on hover, ink that lags the scroll) is ornament on a mark whose job is to stay
out of the type's way (`restraint.md`, Motion: "Motion has a job"; Text and markup: "Markup is the
exception").

**The family: underline and highlight.**

- **Underline** stays. It is the default and the shape consumers mount: a one-line grep finds 17
  `<HandMark>` tags in atlas, none with a `shape`, and Gregg passes `mark-shape="underline"` at
  both `Section` sites it finds.
- **Highlight** stays. Gregg's `Section` types it as the second shape, and it is the one mark that
  carries a block of words rather than a word.
- **Strike** goes. It says the words are retracted, which is the opposite job. `<del>` and `<s>`
  already draw it from the font. The same grep finds no mount of it in gregg, atlas, sci-report
  or slides.
- **Ring** goes. It leaves the text by construction (its semi-axis is `∛2 · (w/2 + 0.06em)`), it
  reserves `padding-inline` and so shifts the line, it has no CSS form, and its draw is
  `stroke-dashoffset`, which lane L7 recorded as still stalling (rise 0 to 0.002). The grep finds
  no mount of it either, but atlas's own `HandMark.vue` wrapper accepts any `HandShape` and its
  `InkStroke.vue` imports `handRing`, so atlas should confirm before the cut.

## 2 · The API

**The mark, with no script** (SSR, print, a page that never loads the component):

```html
<span class="mark-underline">4,485</span>
<mark class="mark-highlight">Wake County</mark>
```

Tokens, set on `:root` or any ancestor (a magnitude is a token, not a prop: `design-idioms.md` §13):

| token | default | what it is |
| --- | --- | --- |
| `--mark-ink` | `var(--primary)` | the underline's colour, and the hue the band is tinted from |
| `--mark-band` | the focal hue at L 0.86 light, 0.44 dark, C 0.16 | the highlight's colour (the law 11.1.0 already ships) |
| `--mark-weight` | `max(0.07em, 2px)` | the underline's thickness |
| `--mark-offset` | `0.08em` | baseline to the underline's top edge |

**The draw:**

```vue
<Mark>4,485</Mark>
<Mark shape="highlight" retrigger @drawn="next">Wake County</Mark>
```

| prop, event, method | |
| --- | --- |
| `shape` | `"underline"` (default) or `"highlight"` |
| `draw` | default `true`; `false` stands drawn |
| `retrigger` | undraw on leaving the viewport, draw on each entry |
| `@drawn` | once per draw, one frame after the last line lands; at mount when nothing will move |
| `play()` | draw again from nothing |

**Against today's HandMark:**

| today | proposal | why |
| --- | --- | --- |
| `HandMark`, `./handmark` | `Mark`, `./mark` | nothing about it is a hand |
| `shape`: underline, strike, circle, highlight | underline, highlight | §1 |
| `draw`, `retrigger`, `@drawn`, `play()` | kept, same meaning | |
| highlight renders `<mark>` | kept | |
| focal ink by default (`--primary`) | kept | |
| `color` (a colour, or a hue number for the band) | `--mark-ink`, `--mark-band` | a token; one meaning each |
| `weight` | `--mark-weight` | a token |
| none | `--mark-offset` | O-230 (1) asked for it |
| `trigger: "mount" \| "in-view"` | deleted; always in view | a draw nobody sees is not a draw (O-190). A mark on screen at mount still draws on the first frame |
| `seed` | deleted | there is nothing to seed |
| re-ink on `pointerenter`, `pointerdown`, `focusin` | deleted | the mark is decoration, not a control |
| ink-lag on scroll, `.hm-mark--settling` | deleted | O-230 (3) |
| the frame-rank lead between marks | deleted | each mark draws when it is seen |
| `stroke.ts` and its exports (`handLine`, `handRing`, `handBand`, `strokeRibbon`, `serialize`, `markDuration`, `minJerk`, `SHAPES`, the types) | deleted from glass | the mark no longer uses a pen. atlas's `charts/glyph/InkStroke.vue` is the one importer (`handLine`, `handRing`, `strokeRibbon`); it is chart ink, and the 290 lines move to atlas |

The source goes from 1,064 lines (`HandMark.vue` 754, `stroke.ts` 290, barrel 20) to 345
(`Mark.vue` 215, `mark.css` 129, barrel 1).

## 3 · The mechanism

**At rest: CSS only** (`mark.css` in the patch).

```css
.mark-underline {
    text-decoration: underline solid var(--mark-ink, var(--primary));
    text-decoration-thickness: var(--mark-weight, max(0.07em, 2px));
    text-underline-offset: var(--mark-offset, 0.08em);
    text-decoration-skip-ink: auto;
}
.mark-highlight {
    background: none; color: inherit;                 /* the <mark> UA style */
    text-decoration: underline solid var(--mark-band, …);
    text-decoration-thickness: calc(1ex + 0.16em);    /* the x-height and 0.08em a side */
    text-underline-offset: calc(-1ex - 0.08em);       /* its top edge that far above the baseline */
    text-decoration-skip-ink: none;
}
```

The highlight is the part worth a second look. An underline paints under its own text, and both
engines measure the offset to the line's top edge, so a negative offset of one x-height lifts the
line into a band behind the lowercase. `ex` is the font's own x-height, so the band fits any face.
There is no `box-decoration-break` and no prefix, the browser breaks the band per line as it breaks
any underline, and it prints (a background does not, by default).

**The draw** (`Mark.vue`). Text decoration paints in the same layer as its glyphs, so nothing can
animate the one without the other. The draw therefore runs on a copy:

1. The component renders `data-ink="wait"`. The stylesheet hides the run's decoration
   (`text-decoration-color: transparent`) only on a screen, with motion allowed, script on and
   author colours.
2. One shared `IntersectionObserver` reports when half the run is in view. In that callback, which
   runs after layout, the component reads the run's line fragments (`getClientRects()` on the host)
   and the layer's origin. A run that wraps is walked once, a character at a time, to learn which
   text sits on which line. Every mark in the batch reads before any mark writes.
3. For each line it builds a clipped window at the line's box holding a copy of that line's text:
   the same element and class (so the same decoration, from the same painter), glyphs transparent,
   `aria-hidden`, unselectable, behind the real text.
4. Two animations run per line, both `transform` alone:

   | element | property | keyframes | duration | easing | delay |
   | --- | --- | --- | --- | --- | --- |
   | `.mark-line` (the window) | `transform` | `mark-window`: `translateX(-100% - 1px)` to `0` | `--spring-present-duration` | `--spring-present` | line index × that duration |
   | `.mark-slide` (the copy) | `transform` | `mark-slide`: `translateX(width + 1px)` to `0` | same | same | same |

   The two cancel at every frame, so the ink holds still and the window's edge travels along the
   line. `:dir(rtl)` flips both signs. `present` is the `SPRING_PRESETS` row (response 0.22, ζ 1.0,
   `springPresets.ts:73-76`), read through its two generated tokens, so there is no literal and no
   overshoot. Nothing else animates: no opacity settle, no colour.
5. On the last line's `animationend` the copies are removed and `data-ink` becomes `rest`, in the
   same frame. `drawn` fires one frame later.

Reduced motion, print, forced colours and no script never enter step 1: the media query does not
match, the mark is drawn from the first frame, and `drawn` fires at mount. An engine that does not
know `(scripting: enabled)` should fail the query the same way and show the mark with no draw; that
is by construction, not run.

**Forced colours.** A decoration is repainted in the text's colour there, which would bury the
words under the band. The highlight switches to `background: Mark; color: MarkText`. The underline
is a real underline already.

## 4 · The prototype

In `prototype.patch`:

| file | |
| --- | --- |
| `src/components/mark/mark.css` | the two classes, the tokens, the draw's rules |
| `src/components/mark/Mark.vue`, `index.ts` | the draw |
| `scripts/lib/subpath-policy.mjs` | one word, so vite's config admits the new directory |
| `proto/marks-a/index.html`, `fixture.ts`, `fixture.css` | the fixture page |
| `proto/marks-a/static.html` | the mark with no script at all |
| `proto/marks-a/probe.mjs`, `skip.mjs`, `skip.html`, `run.sh` | the probes and the guarded runner |

The fixture's rows (`?scene=sheet&shape=underline|highlight&theme=light|dark`): "4,485 visits" as an
`h1` in Plus Jakarta Sans 800 at 48, 85 and 112 px (the face loaded and checked: `face.display: true`
in every sheet cell); the 85 px headline again with `--mark-offset: 0.2em`; "Wake County" and
"Google" at 16 px; a run that wraps to three lines; an Arabic run that wraps to two; a three-line
run with `<em>` and `<strong>` inside; and the two classes with no component.

To run it: apply the patch, symlink `node_modules`, then
`~/.claude/guard/guarded -- proto/marks-a/run.sh 7941 chromium <out-dir>` (WebKit: add
`--exclusive webkit`).

`Mark.vue` passes `vue-tsc --noEmit -p tsconfig.src.json`. It has no unit tests yet.

## 5 · Paint

Start with the four overview sheets (rest state, light beside dark):
`captures/overview-{chromium,webkit}-{underline,highlight}.png`.

Per row, in `captures/png/`:

| file | what it shows |
| --- | --- |
| `{engine}-{light,dark}-{underline,highlight}-{row}.png` | four panels, top to bottom: the draw at 25, 50 and 75 % of its clock, then at rest. Rows: `h48`, `h85`, `h112`, `clear`, `body`, `wrap`, `rtl`, `nested` |
| `{engine}-…-{row}-rest.png` | the rest panel alone |
| `{engine}-…-plain-rest.png` | the two classes with no component |
| `{engine}-measure-{shape}-{mark}.png` | the mark painted magenta, which the seat and extent were read from |
| `{engine}-stall-{theme}-{shape}.png` | the strip across the 50 ms task |
| `{engine}-{reduced-motion,print}-{shape}.png`, `chromium-forced-colors-{shape}.png` | the still states |
| `{engine}-noscript-{theme}.png`, `{engine}-noscript-print-{theme}.png` | `static.html`, script off |
| `{engine}-skip-*.png` | the first eight rows of six skip-ink sweeps |

Mid-draw frames are taken by pausing the draw's own CSS animations and seeking them, so both engines
show the same three instants. A wrapped run's clock is its line count × 200 ms, so its three frames
catch line one, two and three in turn.

What the frames show, checked against the files:

- **The comma headline** (`chromium-light-underline-h85.png`, `webkit-dark-underline-h112.png`):
  one rule under "4", a gap around the comma's tail, one rule under "485". It ends where "5" ends.
- **`clear`** (`chromium-light-underline-clear.png`): at `--mark-offset: 0.2em` the rule runs
  unbroken under the comma. It also sits visibly away from the digits, which is why it is the token
  and not the default.
- **Body size** (`…-underline-body.png`): a 2 px rule; a gap at the g of "Google". For "Wake County",
  Chromium leaves a gap at the y and a short stub after it; WebKit ends the rule before the y.
- **Wrap, RTL, nested** (`…-wrap.png`, `…-rtl.png`, `…-nested.png`): one mark per line box; the
  Arabic run draws from the right; the band keeps one height through the italic and the bold.
- **Dark**: the ink is purple because glass's dark `--primary` is `oklch(0.739 0.134 318.1)`. That is
  the token's value, not a choice made here.

## 6 · Measurements

Readings are in `captures/{engine}-sheet+measure+reads+still+cycle+stall.json` and
`captures/{engine}-skip.json`. Both probe runs and both sweep runs exited 0.

**Extent** (`measure-*` cells; 9 marks, 14 lines per shape; the ink's edges read off magenta paint
against the text's own range rects, at 2x):

| | Chromium | WebKit |
| --- | --- | --- |
| ink past the run's start, worst line | 0 px | 0.19 px |
| ink past the run's end, worst line | 0.17 px | 0.24 px |

Those are device-pixel snapping. One line falls short: WebKit's "Wake County" underline ends 8.94 px
before the run does, because WebKit drops the stub after the y.

**Seat and weight**, the headline rows (the baseline read from a zero-size inline-block; at body
size that reading is only good to half a pixel, so the headline rows are the ones to trust):

| | font size | thickness | top edge under the baseline | x-height (canvas) |
| --- | --- | --- | --- | --- |
| underline, Chromium | 48 / 85 / 112 px | 3 / 6 / 8 px | 0.083 / 0.078 / 0.084em | |
| underline, WebKit | 48 / 85 / 112 px | 3.5 / 6 / 8 px | 0.076 / 0.081 / 0.078em | |
| underline at 16 and 22 px, both | | 2 px (the floor) | | |
| highlight, Chromium | 48 / 85 / 112 px | 33 / 59 / 77 px | top 0.604 / 0.616 / 0.604em above; bottom 0.083 / 0.078 / 0.084em below | 0.529em |
| highlight, WebKit | 48 / 85 / 112 px | 33.5 / 59 / 77.5 px | top 0.611 / 0.607 / 0.610em above; bottom 0.087 / 0.087 / 0.082em below | 0.529em |

So both engines put the offset at the line's top edge, and the band is the x-height plus 0.08em a
side in both, as written. The comma's tail reaches 0.15em under the baseline and the y and g reach
0.185em, so at the default the underline (0.08 to 0.15em) meets them and the engine's skip-ink is
what opens the gap: 12, 23 and 30.5 px wide at 48, 85 and 112 px in Chromium.

**Skip-ink across sub-pixel positions** (`skip.mjs`; 64 rows per case, each 1/64 px lower than the
last, at 1x and 2x; a row is "crossed" when a column holds both line ink and glyph ink):

| case, inside glass's stylesheet | Chromium | WebKit |
| --- | --- | --- |
| default offset, 22 cases × 2 densities: "Wake County" and "Google" mid-line at 13, 14, 15, 16, 18, 20, 24, 32 px; "Wake County" at a line's start; "rose through" at 22 px; "4,485" at 16 px 800 and as an `h1` at 48, 85, 112 px | a gap in 64 of 64 rows in all 44 cells; 0 rows crossed | 0 rows crossed in all 44 cells (a gap, or the rule ending before a final descender) |
| offset 0.04, 0.06, 0.08em at 16 px | 64 of 64, 0 crossed | 0 crossed |
| offset 0.10, 0.12, 0.14em at 16 px | **3 of 64 rows uncut and crossed** ("Wake County"), **2 of 64** ("Google"), at 1x and 2x | 0 crossed at 0.10 and 0.12em; **30 of 64 rows crossed at 0.14em at 1x** |
| offset 0.16em at 16 px | no gap, 0 crossed | **30 of 64 rows crossed at 1x** |
| offset 0.20em at 16 px | no gap, 0 crossed (the rule clears the y and g) | the same |

`captures/chromium-offset-0.10em-descender-uncut.png` is one of the uncut rows as it painted in the
fixture: the y's tail runs into the rule. This is why the default moved from 0.10em to 0.08em during
the work.

Three limits on that table. The crossing count is unreliable at 0.22em and over, where a row's rule
reaches the next row's slice, so I do not cite it there. On a bare page with no glass stylesheet,
Chromium cut all 64 rows at 0.08em (the kept file; one row of "Wake County" at 2x flags a single
crossed column beside its gap) and, in an earlier run whose file was overwritten, at 0.10em too. I
did not find what in glass's page makes those three positions differ from the bare page. And
the bare-page rows did not paint in WebKit (the routed `file://` page came back empty), so WebKit's
figures are the glass-sheet rows only.

**The swap** (`sheet-*` cells, `swapLandedVsRest`): each row captured with the copies landed and
still in place, then again at rest. A pixel differs when a channel moves by more than 48 of 255.

| | Chromium | WebKit |
| --- | --- | --- |
| underline, 8 rows × 2 themes | 0 pixels, largest channel delta 0 | the same |
| highlight, 7 of 8 rows × 2 themes | 0 pixels, largest channel delta 0 | the same |
| highlight, the nested row | 15 and 16 pixels | 7 and 7 pixels |

The nested row's difference sits at the overhang of the italic "r" and the bold "l", where two
inline boxes meet (`…-highlight-nested-landed.png` beside `-rest.png`).

The window is the line's box and one pixel a side. Without that pixel Chromium clipped one device
column off each line's end (4 to 154 differing pixels a row, in an earlier run whose file was
overwritten), because it snaps the decoration a fraction past the box.

**What animates, and the clock** (`sheet-*` cells, `clock`; all 8 cells, both engines): 28
animations (14 lines × 2), named `mark-window` and `mark-slide`; the only animated property is
`transform`; every duration is 200 ms; the delays are 0, 200 and 400 ms; the easing equals
`--spring-present` as computed on a probe element.

**The stall** (`stall-*` cells; Chromium at a 4x CPU throttle; lane L7's instrument: a corner marker
places frames, and a control square proves the screencast sees compositor frames). The page mounts
one 85 px mark, waits 40 ms into the draw, then blocks the main thread for 50 ms. It does nothing
else, so the trace holds the draw and the task.

| Chromium, 4 cells (light and dark × underline and highlight) | |
| --- | --- |
| task length, and where it landed in the draw | 50.0 to 50.8 ms, starting 43 to 51 ms in |
| screencast frames inside the task, control moving | 5, 4, 3, 4 |
| ink progress across the task | rises 0.355, 0.262, 0.234, 0.269 (e.g. light underline 0.360 → 0.444, 0.528, 0.598, 0.659, 0.715) |
| screencast frames across the whole draw | 20, 19, 19, 19; longest gap 18.7, 22.8, 25.6, 17.7 ms |
| compositor `DrawFrame` events in the draw (trace) | 23, 24, 23, 23 over 191 to 201 ms |
| main-thread frames in the draw (trace) | 8 or 9 |
| `Layout` events in the draw (trace) | **0** in all four |
| main-thread cost of the draw, whole draw, throttled | style 1.3 to 2.6 ms over 8 or 9 updates; pre-paint 0.3 to 1.7 ms; paint 0.05 to 0.07 ms in three cells and 3.6 ms in one; layerize under 0.7 ms |
| the rest is the injected task | 50.0 to 51.7 ms in `TimerFire` |
| last line landed to `drawn` | 2.1 to 2.5 ms; `drawn` once per cell |

WebKit, the same four cells with no throttle: 0 frames inside the task and the control still, so the
cell is unmeasurable, not passed. It produced 5 frames across each draw about 45 ms apart, on both
sides of the task alike, which is the screencast's own rate in that engine.

**Layout reads** (every geometry call any script makes is counted at the platform: `fixture.ts`
wraps `getBoundingClientRect`, `getClientRects` on elements and ranges, `getComputedStyle`, and the
`offset*`, `client*` and `scroll*` getters):

| | Chromium | WebKit |
| --- | --- | --- |
| in the mount task (sheet, 9 marks) | 0 | 0 |
| between the first draw frame and the last line landing (about 600 ms, 14 lines) | 0 | 0 |
| between landing and `drawn` | 0 | 0 |
| before the first draw frame, in the observer's callback | 9 `getBoundingClientRect`, 9 `getClientRects`, 141 range `getClientRects` | the same |
| stall cells: in the mount task / during the draw | 0 / 0 | 0 / 0 |

The 141 range reads are the character walk for the three wrapped runs (64, 30 and 47 characters).
A run on one line costs two reads.

**The still states** (`still-*` cells; all 9 marks): under reduced motion and in print, both
engines, every mark is `rest` at frame 0 with 0 copies and 0 running animations, and `drawn` has
fired 9 times. Forced colours (Chromium only; Playwright does not emulate it in WebKit): the same,
the underline is an underline and the highlight computes `background: rgb(255, 255, 0)` with
`text-decoration-line: none` (`chromium-forced-colors-highlight.png`). `static.html` with script
off paints both marks, including a run marked up as the server would send it (`data-ink="wait"`).

**In view, retrigger, play** (`cycle-*` cells, both shapes, both engines, identical): a mark two
viewports down is still `wait` with 0 draws after 700 ms and draws once when scrolled to. A
`retrigger` mark draws, returns to `wait` when scrolled away, draws again on return (2), and
`play()` draws it a third time. No copies remain after any of them.

## 7 · Against the reports

| report | answer | witness |
| --- | --- | --- |
| O-183 focal ink, preset clock, in view, print, wrapping | ink is `--primary`; the clock is `present`; the draw waits for the viewport; print is the stylesheet; one mark per line box | `clock`, `cycle-*`, `still-print-*`, the `wrap` rows |
| O-190 marks off screen never draw | there is no other trigger | `cycle-*`: `wait` below the fold, one draw on arrival |
| O-206 the draw stalls under load | `transform` alone | Chromium stall cells; WebKit unmeasurable |
| O-230 (1) descenders | the engine's skip-ink at a 0.08em offset; `--mark-offset` to clear instead | the sweep; the soft spot is stated in the brief above |
| O-230 (2) clocks | 200 ms per line on `--spring-present`, no literal | `clock` |
| O-230 (3) a settle at every scroll stop | the scroll listener and the transition do not exist | `mark.css`, `Mark.vue` |
| O-251 thin, wobbles, runs past the text | `max(0.07em, 2px)`; a straight rule; ink within 0.24 px of the run | the measure cells |

## 8 · Against the hard constraints

| | | |
| --- | --- | --- |
| (a) paints in Chromium and WebKit or fails loud | holds | both engines, all rows. There is no fallback path: the mark is the decoration |
| (b) compositor-only, survives 4x and a 50 ms task | holds in Chromium; **unmeasurable in WebKit** | §6 |
| (c) no layout read per frame, none in the mount task | holds | §6 |
| (d) a wrapping run draws per line box | holds | `wrap`, `rtl`, `nested` rows |
| (e) decoration; text untouched and selectable; forced colours | holds, with one caveat | the real text is never altered. For 200 ms per line a transparent, `aria-hidden`, unselectable copy of it exists in the DOM. Find-in-page could match it in that window; I did not test that |
| (f) a plain fallback with no script | holds | the two classes are the mark; `noscript-*` |

## 9 · What does not hold, and what I did not test

- **Skip-ink is the engine's.** §6. Its gap width, and whether a short stub after a final descender
  is kept, differ between Chromium and WebKit. Firefox was not run.
- **A reflow during the draw** leaves the copies stale until they land. Not measured.
- **The highlight has square ends and stops at the glyphs' advance box.** There is no inline bleed
  and no radius, because a decoration has neither. On the Arabic run the band is the fallback face's
  `ex`, which is a Latin measure.
- **At rest the host keeps `position: relative`**, from `[data-ink]`. It should be scoped to `wait`
  and `draw` so the rest state is the class and nothing more. The captures were taken with it as
  patched; I did not rerun for a change that should not move a pixel.
- **A scaled ancestor.** The copies are placed from viewport rects, so a `transform: scale()` above
  the mark would misplace them for the length of the draw. Today's component has the same limit.
- **Not tested:** vertical writing modes (the wipe is `translateX`); a line that bidi reordering
  splits into several fragments (the code assigns characters to fragments, unwitnessed); a run
  taller than two viewports (the half-in-view rule would never fire); a mark inside an `<a>` or
  beside another decoration; real Safari (Playwright WebKit only); a 390 px viewport (the 48 px row
  stands in for Gregg's mobile headline).
- **One instrument note.** Playwright's `fullPage` capture in Chromium re-laid the page out and came
  back with a different Arabic fallback face than the page was read in. Every capture here is
  clipped inside a tall viewport instead.
- **A whitespace-only reindent** of one block in `Mark.vue` was made after the last capture run and
  before the patch was cut. `vue-tsc` passed after it.

## 10 · Landing

`Mark` and the two classes share nothing with HandMark, so they can ship beside it in 11.2.0 and
HandMark can go in 12.0.0. If the owner's read is that the default marks are replaced, it is one
12.0.0 change: `./handmark` is removed, Gregg's two sites and atlas's `HandMark.vue` wrapper move to
`<Mark>`, and atlas takes `stroke.ts` for `InkStroke.vue`. In glass the two classes belong in
`typography.css` as `@utility` recipes (`design-idioms.md` §3), not in a component sheet.
