# W-B.16: the text mark (underline and highlight, from the type)

The source is INBOUND O-251, the owner on atlas, 2026-11-11, verbatim: "underline and highlighting within glass-ui needs to be re-designed from first principles." His screenshot shows the hand-drawn underline as a thin stroke that wobbles and runs past the text. The wave also answers O-183 and O-190 (focal ink, the preset clock, draw in view), O-206 (the draw must not stall under load), O-230 (an underline crosses descenders; draw-ins off the glass clock; a settle at every scroll stop) and O-265 (a descender-dense phrase breaks into dashes).

Three seats wrote this text, all claude-fable-5-2, 2026-11-12.
- The spec seat ran nothing. Its numbers are quoted from the measured A/B (`../design/marks/AB.md`, the measurer's record, four candidates under one harness in Chromium headless shell and Playwright WebKit 2287) or, where marked, from proposal A's own record (`../design/marks/proposal-A.md`).
- The challenge (`../design/marks/challenge.md`) broke nine things on the winning prototype in paint. Its numbers are marked *challenge*.
- The fold seat amended the prototype for each of the nine and measured the amendments in both engines (`../design/marks/fold.md`; Chromium headless shell 149.0.7827.55, Playwright WebKit 2287). Its numbers are marked *fold*.

The three designs are `../design/marks/proposal-A.md`, `proposal-B.md` and `inbound/atlas-proposal-3-2026-11-11.md` (C).

Release, for `INDEX.md`'s column: **it splits.** The new mark is additive and ships in **11.2.0** beside HandMark, with HandMark and its default untouched. HandMark, `./handmark`, the strike and the ring are removed in **12.0.0**, because removing a shape and a published subpath is a major. O-230 (3), the scroll-stop settle on HandMark, stays where INBOUND placed it (11.1.1).

## What a mark is for

A mark tells a reader which words carry the weight, at a glance, without competing with the type. That is a typographic job, and type already has two marks for it: the underline and the highlight. The browser already knows where both go: the run's extent on each line box, the baseline, where a descender crosses, the x-height. So the mark is a CSS text decoration, and the component only draws it in.

## Rulings

- **R-1: proposal A is the design.** It is the only candidate that passes every hard constraint the A/B harness can witness and paints the same mark with no script. The challenge then found nine cells that harness did not have; each is folded into the rulings, the mechanism and the gates below.
  - A: 0 descender crossings in every cell, 0 layout reads in the mount task, `transform` alone, one mark per line box, RTL drawn from the right, `Mark` under forced colours, and a no-script mark equal to rest (coverage 1.00 in every row, screen and print, both engines).
  - B passes the same constraints with tighter ends (0.5 px from the glyph ink), but its no-script fallback is a different shape from its stroke (0.62 to 1.84 of the rest coverage, so the mark changes on hydration), its highlight runs 16.5 px past the text at 112 px by design, and it costs 2,573 gzip bytes more than A.
  - C fails hard constraint (c) (693 layout and canvas reads in the mount task) and (f) (no mark with no script), draws RTL from the left and crosses Arabic glyph ink, and paints a grey band under forced colours.
  - The control (11.1.0) stands as reported: up to 10 px past the text, 311 device px of descender crossing at 112 px, 182 mount reads, `opacity` animated beside `transform`, 15 `translate` transitions after a scroll stop, and a throw under SSR.
- **R-2: "hand-drawn" means one thing.** The ink is laid down once, along the line, in the reading direction. That is the draw. The rule itself is straight, square-ended and constant in weight. The seed, the sag, the bow, the shear, the lift-off hook, the taper, the overrun, the re-ink on hover, press and focus, the scroll ink-lag and the frame-rank stagger are all cut (`restraint.md`: a cure removes; "Motion has a job"). B's residual hand (round caps, a bow of up to 0.02em, a taper to 0.8) is not taken: it is tuned ornament, and under 0.5 px at body size by B's own account.
- **R-3: the family is two shapes.** Underline and highlight, the two the owner named and the two Gregg's `Section.vue:18` types. Strike goes: it means retraction, which is `<del>` or `<s>` with the font's own line-through. Ring goes: it leaves the text by construction, reserves `padding-inline` (it shifts the line), cannot draw per line box, and is the one shape lane L7 left on `stroke-dashoffset`. Both proposers' greps found no mount of either in Gregg, atlas, sci-report or slides; atlas's own wrapper accepts any shape, so atlas confirms before the 12.0.0 cut. The spec seat's own grep confirms Gregg (underline at `HeroSection.vue:147`, underline or highlight at `Section.vue:106`) and finds no HandMark in daraksha's `src/`.
- **R-4: extent is the run's advance box per line, as the engine sets any underline.**
  - Against the glyph ink the worst line is 3.5 px at the start (the 4 at 112 px, 0.031em) and 1.5 px (Chromium) or 2 px (WebKit) at the end, and atlas's 42 px title reads 1.5 px. That is the side bearing of the first and last glyph, against the control's designed overrun of up to 7.5 and 10 px.
  - The side bearing is the face's and grows with the glyph: an "H" at 85 px in weight 800 starts 5.5 px before its ink (challenge F7).
  - On positively tracked type the advance box holds one letter-space after the last glyph, and the mark covers it: "Open" at 85 px with 0.05em ends 7.5 px past the ink against 3.5 px untracked, and a 13 px caps label 2 to 3 px (challenge F7). A decoration cannot be trimmed there: `text-decoration-inset` is unsupported in both engines (fold). The README says so.
  - B's ink-tight ends cannot be grafted onto a CSS decoration without B's canvas measure, so they are not taken.
- **R-5: descenders are skipped by the engine at a 0.08em seat.** `text-decoration-skip-ink: auto` with the rule's top edge 0.08em under the baseline: 0 crossings in every measured cell, and in proposal A's 64-position sub-pixel sweep 0 rows crossed in all 44 cells (13 to 112 px, 1x and 2x) in both engines, with Chromium cutting a gap at 64 of 64 positions. The challenge held this in five more faces (one Plus Jakarta Sans cell in Chromium read 2 device px at one position of eight). Seats of 0.10 to 0.16em are **not supported**: A's sweep found Chromium leaving a descender uncut at 2 or 3 of 64 positions at 0.10 to 0.14em, and WebKit crossing at 30 of 64 at 0.14 and 0.16em at 1x.
- **R-6: the clear seat answers O-265, chosen by the author: one unbroken rule 0.26em under the baseline, with nothing skipped.**
  - A, B and C all cut "by program" at 28 px into 4 pieces of 10 to 11.5 px; the skip that cures O-230 produces O-265 in every candidate. atlas's proposal names the cure (one unbroken rule below the descenders) and has not built it.
  - This spec's first form of that cure (0.2em, the engine's skip left on) did not hold. The descenders of "by program" reach 0.22 to 0.23em, the rule met them and the engine cut it: 3 and 4 pieces in the gate's own cell (challenge F1).
  - The folded seat is `text-underline-offset: 0.26em` with `text-decoration-skip-ink: none`. The rule cannot break, and it sits below every descender measured: 1 piece and 0 crossings in all 96 rows in each engine, with the top edge at 0.254 to 0.265em at 85 px in both (fold: "by program" in six faces at 16 to 85 px, "population", "typography", "4,485" and "Qjgy(p)", four sub-pixel positions each).
  - `text-underline-position: under`, the font's own descent, was measured and not taken. Chromium centres the rule on the descent line (564 device px of crossing on Plus Jakarta Sans at 85 px) and WebKit sets it wholly below, so at any one offset the engines sit 0.08 to 0.10em apart (fold).
  - 0.26em is a constant, not a font metric. A face whose descenders run deeper takes a deeper `--mark-offset` on the mark.
  - Choosing between the seats automatically needs a per-run measurement that no candidate has built or measured, so it is not in this wave (OQ-2).
- **R-7: weight is `max(0.07em, 2px)`.** Measured 2, 3 (WebKit 3.5), 6 and 8 px at 16, 48, 85 and 112 px, against the control's 1.63 to 6.88 px, which falls from 0.10em to 0.06em as the type grows.
- **R-8: the highlight sits on the x-height band.** The same decoration, `calc(1ex + 0.16em)` thick and lifted by `calc(-1ex - 0.08em)`: measured 0.618em above the baseline and 0.088em below at 85 px, where the face's x-height is 0.529em. `ex` is the face's own x-height, so no face constant is written. Square ends at the advance box; no bleed, no radius.
- **R-9: ink is one token.** `--mark-ink`, default `var(--primary)`; a route sets it on an ancestor (atlas's `--hm-ink`, renamed).
  - The band derives from it by the law 11.1.0 ships, the ink's hue at L 0.86 light and 0.44 dark, overridable as `--mark-band`. On atlas's route ink the underline painted the ink exactly in both themes, and the band read OKLCH 0.859 0.16 light and 0.471 0.099 dark.
  - The band's chroma is `min(0.16, c × 40)` of the ink's own, so an ink with no hue gives a band with none. The fixed 0.16 painted pink from `#000` and `#1a1a1a` (challenge F9); now `#000` computes chroma 0 in both engines, and glass's own inks and atlas's route ink still compute 0.16 (fold).
  - C's 28 % and 34 % mixes are not taken: on glass's default light ink they paint a grey band (`AB/sheets/closeup-chromium-h112-highlight-light.png`), and `restraint.md` rules out grey.
  - In glass's light theme `--primary` is the text colour, so the default underline is a text-coloured rule, which is what a link looks like (challenge F9). Gregg and atlas set their own ink. Whether glass's own default should differ is the owner's (OQ-6); the README says not to set a mark inside a link.
- **R-10: the draw.**
  - One property, `transform`, twice per line (a clip window and a counter-slide that cancel, so the ink holds still and the window's edge travels). The clock is `springPreset("present")` through `--spring-present` and `--spring-present-duration`: ζ 1, no overshoot, no literal. Line *i* waits *i* durations.
  - The draw runs when any part of the run is in view; there is no other trigger. The first form waited for half of the run's box, so a run that an ancestor clips past half (a two-line clamp, an ellipsis, a horizontal scroller) waited for ever with its decoration held transparent, and showed no mark where the plain class showed one (challenge F3).
  - The draw is for an inline host. A host its parent has made a block (a flex item, a grid item, `inline-block`) has no line fragments to read, and the first form drew one misplaced line on it (challenge F4). Such a host stands drawn from its first observation, and a dev build says so once in the console.
  - If a face is still loading when a draw starts, the draw lands when the page's fonts are ready. The copies were laid out under the old face, and the first form left them stale until landing (challenge F8).
  - Reduced motion, print, forced colours and no script show the mark whole from the first frame, because the rule that hides it exists only under `screen and (prefers-reduced-motion: no-preference) and (scripting: enabled) and (forced-colors: none)`.
- **R-11: the name is `TextMark`, subpath `./text-mark`.** A's `Mark` collides with the HTML `<mark>` element in kebab-case and in-DOM templates. The name is B's; nothing else of B's is taken.
- **R-12: `retrigger` stays, `play()` goes.** O-183 asked for retrigger in view, and A measured it. No consumer calls `play()` (Gregg's two files do not), and an imperative replay has no state change behind it.
- **R-13: a selected highlight fills its line with the band.** Chromium repaints a selected run's decoration in the text colour, so the 0.69em band became a solid bar over its own words (challenge F2). `.mark-highlight::selection` therefore carries the same decoration, which paints over the repainted one, and the band as its ground. The ground is needed because WebKit drops its own selection tint under any author selection rule, and the system `Highlight` reads lighter than Chromium's own tint in dark (fold). The words read the same selected as unselected in both engines, light and dark. The underline needs nothing.

## Scope

**The mark with no script** (11.2.0). Three `@utility` recipes in `src/styles/typography/utilities.css` (`design-idioms.md` §3), so they ship in the stylesheet with no component import:

```html
<span class="mark-underline">4,485</span>
<mark class="mark-highlight">Wake County</mark>
<span class="mark-underline mark-clear">by program</span>
```

| token | default | what it is |
| --- | --- | --- |
| `--mark-ink` | `var(--primary)` | the underline's colour, and the hue the band takes |
| `--mark-band` | the ink's hue at L 0.86 light, 0.44 dark, chroma `min(0.16, c × 40)` | the highlight's colour, and its ground when selected |
| `--mark-weight` | `max(0.07em, 2px)` | the underline's thickness |
| `--mark-offset` | `0.08em`; `0.26em` under `.mark-clear` | baseline to the underline's top edge. The skip seat supports 0.08em only (R-5); the clear seat goes deeper for a face whose descenders pass 0.26em (R-6) |

`.mark-clear` also sets `text-decoration-skip-ink: none`. The highlight resolves its band once, as `--mark-band-paint`, and its selection reads the same value, so the band's law is written once.

Under `forced-colors: active` the highlight and its selection drop the decoration and the highlight becomes `background: Mark; color: MarkText`. The underline is already a real underline.

**The draw** (11.2.0). `src/components/text-mark/` (`TextMark.vue`, `text-mark.css` for the draw's rules, `index.ts`), built from `proposal-A/prototype.patch` with `../design/marks/fold/prototype/amendments.patch` over it:

| prop, event | |
| --- | --- |
| `shape` | `"underline"` (default) or `"highlight"`; the highlight renders `<mark>` |
| `seat` | `"skip"` (default) or `"clear"`; underline only; adds `.mark-clear` |
| `draw` | default `true`; `false` stands drawn |
| `retrigger` | undraw on leaving the viewport, draw on each entry |
| `@drawn` | once per draw, one frame after the last line lands; at mount when nothing will move; at the first observation for a host that is not inline |

Mechanism, as measured:
- `setup` and `onMounted` read nothing and touch no `document`. The component renders the host with its class, `data-ink="wait"`, the slot, and after it one empty layer (`aria-hidden`, `inert`).
- One shared `IntersectionObserver` at threshold 0. In its callback, after layout, each mark reads once: its computed `display`, then its line fragments (`getClientRects()` on the host; a wrapped run is walked once by character). Every mark in the batch reads before any writes. The 11-mark sheet cost 129 reads there (Chromium, 390) and 0 in the mount task, 0 during the draw and 0 inside the injected task; the `display` read adds one per mark (by the source line, not recounted).
- Per line, a clipped window at the line's box holds a copy of that line's text, glyphs transparent, behind the real text. The window is the box and one pixel a side.
  - The copy is a new element of the host's tag carrying the host's `class` and inline `style` and nothing else, so it takes the same decoration from the same painter and a consumer's `data-*` selector does not match it. Markup inside the slot is cloned as it stands.
  - Inside the copy every `line-height` is 0, so the window's strut alone sets the line. A larger child grew the copy's line box and set the copy 5 CSS px low (challenge F5); with the strut alone a 1.6em and a 2.2em child land on rest exactly (fold).
  - The layer is `inert`, so a link inside the mark has no focusable twin, and a selection across the host reads the slot's text once (fold). The first form's `user-select` goes: WebKit never applied it, and with it off in Chromium no reading changed.
- The host's `textContent` holds the copies too while a mark draws ("4,4854,485", challenge F6). That is the cost of a copy inside the host, and the gates say so.
- On the last line's `animationend` the layer is removed and `data-ink` becomes `rest` in the same frame; `drawn` fires one frame later. `position: relative` is scoped to `wait` and `draw`, so the rest state is the class and nothing more (A's §9 note, carried as a build item).
- If `document.fonts.status` is `"loading"` when a draw starts, the draw lands when `document.fonts.ready` resolves. This is coarse on purpose: any face landing lands every draw in flight.
- A text change, a resize or a late font after the draw needs no code: the decoration is the browser's and follows the text.

**The README says** (guidance, not enforced):
- The mark sits inside the heading's text as an inline box. A mark that is itself a flex or grid item, or `inline-block`, stands drawn with no draw.
- Not inside a link: a link's underline is the same device, and in WebKit the highlight's copy paints over it until landing (challenge: 753 px).
- The clear seat wants leading of 1.15 or more on a run that wraps (OQ-5).
- On letter-spaced type the mark runs one letter-space past the last glyph.
- An ink with no hue gives a neutral band; set `--mark-band` for a coloured one.
- atlas's own usage rule (at most one mark per section; an underline on one to three words of a heading).

**Kept from HandMark:** the two shapes, `draw`, `retrigger`, `drawn`, the `<mark>` host for the highlight, the focal ink default, the band's lightness law, the clip-window reveal of lane L7, an in-view trigger (lane L5's, at any part in view).

**Renamed:** `HandMark` to `TextMark`; `./handmark` to `./text-mark`; `--hm-band` to `--mark-band`; `color` to the token `--mark-ink`; `weight` to the token `--mark-weight`.

**Deleted in 12.0.0:** `src/components/handmark/` (`HandMark.vue`, `stroke.ts`, the barrel and its exports `SHAPES`, `handBand`, `handLine`, `handRing`, `markDuration`, `minJerk`, `serialize`, `strokeRibbon` and the types), the `./handmark` export, the strike and the ring, `trigger`, `seed`, `play()`, the hue-number form of `color`, the re-ink, the ink-lag and `.hm-mark--settling`, the frame-rank lead, `tests/components/handmark/`, `tests/components/custom/handmark/`, `tests-visual/handmark.spec.ts`, the `handmark` rows of `scripts/lib/subpath-policy.mjs` and `scripts/lib/canon-doc.mjs` (the latter points at `src/components/handmark/README.md`, which does not exist on `release/11.1.0`). The demo route `/motion/handmark` is re-authored on the A/B harness's rows. In 11.2.0 HandMark is untouched; the CHANGELOG names its successor.

**Not in this wave.**
- An automatic choice of seat (OQ-2).
- A draw for a host that is not inline (R-10).
- Ink-tight ends, and trimming the trailing letter-space of tracked type (R-4).
- Vertical writing modes (the wipe is `translateX`), a scaled ancestor during the draw, and a line that bidi reordering splits into several fragments: none was measured by any candidate.
- A face that begins to load after a draw has begun, and a child more than 2.2 times the mark's size: neither was measured.
- HandMark's own in-view rule, which waits for the same half (`HandMark.vue:463` on `release/11.1.0`); the clipped rows were not run against it.
- O-230 (3) on HandMark itself (11.1.1).

## Gates

Each gate is read once RED and once GREEN, with its bite read once. For 11.2.0 the RED reading is the control column of `../design/marks/AB.md` or, for the vitest gates, HandMark on `release/11.1.0`. A gate runs in a browser only where paint is the claim, and in WebKit only where the engines can differ. Browser cells reuse the measurer's harness (`../design/marks/AB/harness/`, moved to `tests-visual/marks/`) with the fold seat's rows added (`../design/marks/fold/harness/`), Plus Jakarta Sans with `font-display: block`, one browser per run, a new context per cell, every run through `guarded` and every WebKit run through `guarded --exclusive webkit`. A dark cell sets the context's colour scheme to dark as well as the class: on the fold's page the root carried an inline `color-scheme` that followed the emulated preference (`useGlobalDark.ts:171` writes one), and a light context under the dark class read the light arm of every `light-dark()` (fold).

**Static.**

- **G-CLOCK.** `git grep -nE '[0-9.]+m?s\b|cubic-bezier|linear\(' -- src/components/text-mark` prints nothing; the draw's duration, delay and timing read `--spring-present-duration` and `--spring-present` only. Bite: one `200ms` literal.
- **G-BYTES.** The `./text-mark` entry built alone (vite lib, vue external, lightningcss) is at most 3,200 bytes gzip (A measured 2,854; with the fold's amendments 2,978; the control is 7,301). Bite: importing `stroke.ts`.
- **G-CUT (12.0.0 only).** `git grep -nE 'HandMark|handmark|hm-(mark|reveal|settle|ink|band)' -- src package.json scripts/lib tests tests-visual` prints nothing, and `package.json` has no `./handmark` export.

**In vitest** (`tests/components/text-mark/`, the DOM shimmed, no browser):

- **G-MOUNT.** With `getBoundingClientRect`, `getClientRects` (element and `Range`), `getComputedStyle` and the `offset*`, `client*` and `scroll*` getters wrapped, mounting eleven marks records 0 reads until the mocked observer's callback runs, and 0 between the first draw frame and `drawn`. RED: HandMark reads in the mount task (182 on the measured sheet). Bite: one `getClientRects()` in `onMounted`.
- **G-SSR.** `renderToString` of both shapes does not throw, and emits the host with its class, `data-ink="wait"`, the slot's text and, after it, one empty layer and nothing else: `<span class="mark-underline" data-ink="wait"><!--[-->4,485<!--]--><span class="mark-layer" aria-hidden="true" inert></span></span>` (fold). RED: HandMark throws `ReferenceError: document is not defined`. Bite: a `document` read in `setup`.
- **G-DRAWN.** `drawn` fires once per draw, one animation frame after the last line's `animationend`; at mount when `draw` is `false` or the draw's media condition does not match; at the first observation when the host's computed `display` is not `inline`; again after each `retrigger` cycle. Bite: emitting inside the `animationend` handler.
- **G-TEXT.**
  - Before the observer's callback and at rest the host's `textContent` is the slot's text. At rest the layer is gone and the host has no element the slot did not give it.
  - While a mark draws, every copy sits under the one layer, the layer is `aria-hidden` and `inert`, and each copy's root has no attribute but `class` (and `style` when the host has an inline style).
  - Bites: leaving the layer in place at rest; cloning the host for the copy (a host's `data-*` attribute then matches one extra element per line: 3 on a three-line run, fold).
- **G-API.** A type test: `shape` admits only the two shapes, `seat` only the two seats, and `seed`, `weight`, `color`, `trigger` and `shape="circle"` fail `vue-tsc`. Bite: widening `shape` to `string`.

**In a browser.**

- **G-INK, Chromium and WebKit** (1440, light, 2x; the engines' skip-ink differs).
  - Underline crossing glyph ink is 0 device px on "4,485" at 16, 48, 85 and 112 px, on "Wake County" and on "Google".
  - No mark ends more than 0.5 px past its line's advance box, on every row including the Arabic run and two tracked rows ("Open" at 85 px with 0.05em, a 13 px caps label with 0.14em).
  - Against the glyph ink, the rows the reports named (the "4,485" headlines, "Wake County", "Google", atlas's title) end within 4 px. That bound is those rows' side bearings: a pin on the reported phrases, not a law of the mechanism (R-4). On the two tracked rows the end past the ink, less one letter-space, is within 4 px (challenge: 7.5 px less 4.25, and 2 px less 1.8).
  - One mark per line box and none bridging: 4 of 4 on the 22 px wrapping run, and 2 of 2 on atlas's 21 px title at 390.
  - Chromium also at dark: with `--mark-ink: oklch(0.55 0.13 175)` on an ancestor the underline paints that ink in both themes, and the band reads the R-9 law.
  - With `--mark-ink: #000` the band's computed chroma is at most 0.01, in both themes.
  - Bites: `text-decoration-skip-ink: none` on `.mark-underline` crosses the comma; the fixed chroma of 0.16 computes `oklch(0.86 0.16 0)` from `#000`, a pink (fold).
- **G-SEAT, Chromium and WebKit** (1440, light). Against a zero-size inline-block set on the baseline, at 85 px: the underline's top edge is 0.08em ± 0.02em below it; its thickness is 6 px ± 0.5; the band's top is the face's x-height plus 0.08em ± 0.02em above it and its bottom 0.08em ± 0.02em below. Read in Plus Jakarta Sans and in IBM Plex Sans (the preset 11.1.0 ships); the challenge read Plex inside the tolerance in both engines. Bite: dropping `text-underline-offset` moves the seat to the engine's default.
- **G-CLEAR, Chromium and WebKit** (1440, light). "by program" with `seat="clear"` at 16, 28, 42 and 85 px, in Plus Jakarta Sans 700 and in IBM Plex Sans 600, at four sub-pixel line positions each: 1 piece and 0 crossings in every cell, and at 85 px the top edge at 0.26em ± 0.02em. The same phrase at the default seat is recorded (4 pieces at 28 px) and gates nothing. Bite: a clear seat of 0.2em crosses the descenders at 85 px (fold: 154 device px in Chromium, 155 to 249 in WebKit).
- **G-SELECT, Chromium and WebKit** (1440, light and dark; Chromium also under forced colours, since WebKit's emulation matches the query and leaves the page's colours unforced, fold). With the sentence around a `mark-highlight` selected, inside the marked run's box:
  - The pixels within 48 of the text colour number the same as unselected, ± 5 % (fold: 4,631 against 4,631 light and 5,103 against 5,100 dark in Chromium; 4,664 against 4,664 and 4,778 against 4,775 in WebKit).
  - The commonest colour is neither the page's ground nor the text colour.
  - Under forced colours the run's ink share is within 0.02 of an unmarked selected run's (fold: 0.225 against 0.226).
  - Bites: without the selection's decoration Chromium paints 14,709 text-coloured pixels there, the bar; without the selection's ground the page's ground shows under the selected words in both engines; without the forced-colours reset the ink share is 0.414, a bar again (fold).
- **G-DRAW, Chromium and WebKit** (1440, light).
  - While a mark draws, its running animations are exactly two per line and their only property is `transform`; each duration and timing function equals the computed `--spring-present-duration` and `--spring-present`.
  - The mark-only render at 30 % of the clock shows the Arabic run inked from its right end and the Latin rows from their left.
  - After `drawn` no copy remains. Captured with the copies landed, each of these rows differs from rest by 0 pixels (a channel delta over 48 of 255): the harness's rows, a 1.6em and a 2.2em figure inside a 22 px mark, "by program" at the clear seat, and a mark with a link inside it (fold: 0 in all, both shapes, both engines). Recorded and gating nothing: a highlight with `<em>` and `<strong>` inside it (fold: 25 px in both engines; proposal A read 15 and 16 on its own such row), and a mark inside a link (the README's line).
  - A flex item, a grid item and an `inline-block` host: `rest` at the first observation with no copy built, `drawn` fired, one console warning each in a dev build.
  - With the draw held and a stylesheet face (`font-display: swap`) held 4 s on the network: once the face lands the mark is at `rest` with no copy, `drawn` has fired once, and the row differs from its rest capture by 0 pixels.
  - While a mark draws, a selection across its host reads the slot's text once, and `focus()` on the copy of a link inside it does not take focus.
  - Bites: an `opacity` keyframe beside the transform. And four the fold seat read in both engines (Chromium's underline figures): without the copy's zero `line-height` the 1.6em row differs by 3,312 px; without the `display` read the flex item differs by 5,278 px; without the font landing the held row differs by 8,195 px after the face; without `inert` the cloned link takes focus. No variant the fold ran doubled the selection, so that reading has no bite on file.
- **G-SEEN, Chromium and WebKit** (1440, light). A marked run under a two-line clamp, one truncated with an ellipsis and one in a horizontal scroller (intersection ratios 0.245, 0.277 and 0.314 on the fold's rows), both shapes: each reaches `rest` within 3 s and fires `drawn` once, and the clamp and ellipsis rows paint the mark's pixels within 2 % of their plain-class twins (fold: 1,232 against 1,232 and 1,856 against 1,864 for the underline in Chromium). Bite: a threshold of half the run leaves all three at `wait` with 0 mark pixels and no `drawn`.
- **G-STALL, Chromium only** (4x CPU throttle, a 50 ms task 40 ms into the draw, `guarded --cpu-cores 0`; lane L7's instrument). On the 85 px underline, the 85 px highlight and atlas's 42 px underline: at least 3 screencast frames land inside the task with the control square moving and the ink's progress rising; the trace shows 0 `Layout` events during the draw. WebKit's screencast takes no frame inside a blocked task on any tree, so WebKit is recorded as unmeasurable and gates nothing; real Safari is one owner glance at the close. Bite: a draw on `background-size` holds the ink still across the task.
- **G-STILL, Chromium and WebKit** (1440, light; both engines emulate forced colours on this harness).
  - Reduced motion, and print: 0 running animations at frame 0, `drawn` fired by every mark, mark-pixel coverage at frame 0 equal to rest.
  - Forced colours: the underline computes `text-decoration-line: underline`; the highlight computes the system `Mark` background (255, 255, 0 on this harness) and no decoration.
  - No script: the server's markup with scripts disabled paints every row's mark at 1.00 ± 0.02 of its rest coverage, on screen and in print.
  - Bite: moving the hide rule out of the `(scripting: enabled)` query paints 0 with no script.
- **G-SCROLL, Chromium only** (1440, light; the engines agreed on every candidate). 100 ms after a wheel stop, no transition or animation runs on any mark except the draw of a mark entering view; a mark two viewports down is undrawn after 1 s and draws once on arrival. RED: the control's 15 `translate` transitions. Bite: an observer threshold of 0 with a full-page root margin draws the far mark at mount.

That is three static gates (one of them 12.0.0's), five in vitest, and nine browser cells, seven of them in both engines.

## Consumer half

The mark is glass's; each consumer changes at its own repin, in its own tranche. glass tells atlas of every default here at booking and at publish.

- **Gregg** (on glass 11.0.1).
  - `HeroSection.vue:3,147` and `Section.vue:4,106`: `<HandMark shape color weight>` becomes `<TextMark :shape>`.
  - `--mark-ink: var(--focal-ink)` is set once at the root, replacing `color="var(--focal-ink)"` at both sites.
  - `markWeight` and its derivation (`Section.vue:22`) go; the weight is the type's.
  - The workarounds for HandMark's faults go with it: the allowance for the overrun (`style.css:243`), the one-line hold on the marked phrase (`Section.vue:119`), the band notes (`Section.vue:131`, `WhereSection.vue:25`) and the descender note (`figures/where/where.ts:152`).
  - The hero keeps waiting on `drawn`.
  - With no component, a heading may carry `class="mark-underline"` and prints as it reads.
- **atlas** (side line `u/ow-glass-type-mark`).
  - It retires its provisional HandMark and adopts `TextMark`, one version (O-251).
  - A route's ink is `--mark-ink` on the route root, in place of `--hm-ink`.
  - "by program" on /usf and "population" on /demand take `seat="clear"`. Both read 1 piece and 0 crossings at that seat in Plus Jakarta Sans and in IBM Plex Sans, the face atlas is moving to (fold).
  - `seed` and `clock="scroll"` come off its call sites (proposal B found them at `StoryBeat.vue:55`).
  - Before 12.0.0, its chart ink (`charts/glyph/InkStroke.vue`, and by proposal B's grep `AnimatedRule.vue` and `PaperCallout.vue`) takes `stroke.ts` into atlas, since those files import `handLine`, `handRing` and `strokeRibbon`. These call sites are the proposers' greps of atlas's live line; the build seat re-reads them there, because the `sci-report` checkout the spec seat could read is pinned to glass 7.0.0.
- **daraksha** (on glass 10.1.4). No HandMark in its `src/`; nothing to change. The classes are there when it wants a mark.

## Open questions

- **OQ-1 (owner, by capture; `../design/marks/OWNER-READ.md` question 1).** A plain rule, or B's round-ended stroke. Default: the plain rule (R-2).
- **OQ-2 (design loop, then atlas).** Whether the seat should choose itself when a skipped run would break into short pieces. No candidate built or measured it, and it needs a per-run glyph measure the chosen design does not have. Default: the author sets `seat="clear"`; G-CLEAR's recorded piece count at the default seat is the evidence a later wave would start from.
- **OQ-3 (build seat, by measurement).** After a final descender Chromium keeps a stub of the rule (2.5 px after the y of "County" at 16 px) and WebKit ends the rule before the descender. Default: accepted as the engines' own underline; the build records both in G-INK's readings and changes nothing.
- **OQ-4 (build seat, by hand).** Whether find-in-page matches the copy while a mark draws. The layer is `inert`, which by the HTML standard takes it out of find-in-page, and no headless run can witness that. Default: the build reads it once by hand in Chromium and in Safari and records it.
- **OQ-5 (arithmetic, not measured).** The clear seat on a run that wraps at tight leading. The rule fills 0.26 to 0.33em under the baseline (to 0.39em where the 2 px floor holds, at 16 px). At leading 1.05 the next line's cap tops sit about 0.30em under the baseline (1.05 less a cap height of about 0.745em, B's figure), so they meet; at 1.15 they sit about 0.40em under it. Default: the README says the clear seat wants leading of 1.15 or more on a wrapped run; G-CLEAR reads a single line.
- **OQ-6 (owner; `OWNER-READ.md` question 4).** In glass's own light theme the default ink is the text colour, so an unstyled underline reads as a link (R-9). Default: keep the focal ink, which 11.1.0 ships at the owner's order of 2026-11-06 (O-183); consumers set `--mark-ink`.
- **OQ-7 (build seat, by measurement).** The font landing is one signal for the page: any face that lands ends every draw in flight, and a face that starts to load after a draw has begun is not caught (R-10). Default: accepted; the build reads the second case once and records it.
