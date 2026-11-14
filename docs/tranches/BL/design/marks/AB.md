# Marks: the measured A/B (control, A, B, C)

The measurer (claude-opus-5-5), 2026-11-12, for INBOUND O-251 with O-183, O-190, O-206, O-230 and
O-265. I wrote none of the proposals and judge no design. This file says what each candidate
passes and fails under one harness.

**Candidates.** Each runs in its own scratch worktree under `.claude/worktrees/bl/marks/`, all cut
from master `79f01addb`. Each worktree has release/11.1.0's `src/components/handmark/` and
`src/composables/motion/core/motionTempo.ts` checked out over master, so the control is 11.1.0's
mark on today's base.

| | what | how it got into the worktree |
| --- | --- | --- |
| **control** | 11.1.0 `HandMark`, `trigger="in-view"` | the overlay above |
| **A** | `Mark`: a CSS text decoration, drawn in by a clipped copy | `proposal-A/prototype.patch` (`git apply --check` passed) |
| **B** | `TextMark`: an SVG stroke measured from the glyph ink | `proposal-B/prototype.patch` (`git apply --check` passed) |
| **C** | atlas's proposal 3: `HandMark` as a measured rule and a flat band | `src/components/handmark/` of `u/ow-glass-type-mark` @ `a44ef3598`, copied verbatim (read-only source) |

**Harness.** `AB/harness/` holds one page, `rows.ts`, and a four-line `adapter-*.ts` per candidate.
Every row is set in Plus Jakarta Sans, loaded with `font-display: block` and checked:
- "4,485 visits" as an `h1` at 16, 48, 85 and 112 px, weight 800, −0.045em tracking, leading 1.04 (Gregg's values).
- "Wake County" and "Google" in a 16 px body sentence.
- A 22 px run that wraps to four lines.
- atlas's need: "doubled again" in a long 700-weight title that wraps, at 21 and 42 px, in a route ink `oklch(0.55 0.13 175)`.
- "by program" at 28 px (O-265, atlas's known limit).
- An Arabic RTL run over two lines.
- The plain class with no component.

Engines and runs:
- Engines: Playwright Chromium headless shell and Playwright WebKit 2287, at 390 and 1440, light and dark, 2x.
- Every run went through `guarded`, and WebKit through `--exclusive webkit`. None was refused.
- The stall runs used `--cpu-cores 0`. Run order and exit codes are in `AB/data/log-queue.txt`.
- To rerun: `guarded [--exclusive webkit] -- AB/harness/run.sh probe.mjs|stall.mjs|scroll.mjs <engine> <out>`, then `python3 -I AB/harness/sheets.py AB`.

**How each column is read.**
- *Extent.* Two renders, the marked words alone and the mark alone, are compared per line box against the glyph **ink** (not the advance box). Resolution is 0.5 px, and positive means past the text.
- *Crossing.* Device pixels at 2x holding both glyph ink and mark ink.
- *Clearance.* The nearest glyph-ink pixel to any mark pixel, in CSS px.
- *Weight.* The median column coverage over the middle 40 % of the mark.
- *Seat.* The mark's rows against a zero-size inline-block set on the baseline.
- *Reads.* Every layout, style and canvas read any script makes, wrapped at the platform and tagged with the task it ran in.

Cells read *Chromium · WebKit* where the engines differ, and give one value where they agree.

## The table

| measure | control (11.1.0) | A | B | C (atlas) |
| --- | --- | --- | --- | --- |
| **Underline extent**, worst line, px past glyph ink, start / end | 7.5 / 9.5 · 7.5 / 10 | 3.5 / 1.5 · 3.5 / 2 | 0.5 / 0.5 | 3.5 / 1.5 · 3.5 / 2 |
| **Highlight extent**, same | 7.5 / 6 · 7.5 / 7 | 3.5 / 1.5 · 3.5 / 2 | 16.5 / 16 · 16.5 / 16.5 (a designed bleed of one hyphen) | 12.5 / 9 · 12.5 / 9.5 (a designed 0.08em shoulder) |
| **Underline crossing descender ink**, device px at 2x: h16 / h48 / h85 / h112 / "Wake County" / "Google" | 11 / 63 / 206 / 311 / 15 / 14 · 13 / 67 / 207 / 319 / 16 / 14 | **0** in every cell | **0** in every cell | **0** in every cell |
| **Clearance** at h16 / h85 / Wake / Google, CSS px (Chromium 1440; WebKit within 0.5) | 0 (touches) | 1 / > 4 / 1 / 1 | 1.1 / 3.5 / 1.5 / 1.6 | 1 / 2.5 / 1.5 / 1.3 (WebKit h16: 0.6) |
| **How it meets a descender** | crosses it | the engine's skip-ink: a gap. After the y of "County", Chromium keeps a 2.5 px stub; WebKit ends 10 px short | stops and restarts with half a stroke of clearance; ends 9.5 px short of a final y | its own canvas scan cuts a gap; ends 9.5 px short of a final y |
| **"by program"**, 28 px (O-265): pieces, shortest | 1 piece; crosses 221 · 204 px | 4 pieces, 10 px | 4 pieces, 11.5 · 11 px | 4 pieces, 11.5 px. Its proposed rule for this case (one unbroken rule below the descenders) is written in the proposal but not built on `a44ef3598` |
| **Weight** at 16 / 48 / 85 / 112 px, px (em) | 1.63 / 3.63 / 5.63 / 6.88 (0.102 → 0.061, falls with size) | 2 / 3 · 3.5 / 6 / 8 (0.125 → 0.071) | 1.39 / 3.52 / 6.39 / 8.82 (0.087 → 0.079) | 2 / 3.5 / 5 / 5 (0.125 → 0.045, capped at 5 px) |
| **Underline seat**, top edge below baseline at 85 px | 0.082 · 0.072em | 0.088 · 0.078em | 0.106 · 0.095em | 0.147 · 0.136em |
| **Highlight band** at 85 px, top above / bottom below baseline (x-height is 0.529em) | 0.583 / 0.070em | 0.618 / 0.088em (x-height + 0.08em) | 0.671 / 0.153em | 0.294 / 0.123em (the lower ~55 % of the x-height) |
| **Wrap**: one mark per line box, none bridging | 4 / 4 lines; atlas 21 px at 390: 2 / 2 | the same | the same | the same |
| **RTL**: where the draw starts on the Arabic run; ink crossing glyph ink | **left** (against the reading direction); 302 + 111 · 412 px over the two lines | right; 0 | right; 0 | **left** (against the reading direction); 12 + 5 · 3 + 7 px |
| **atlas's need**: 42 px title, extent start / end; route ink painted (underline, both themes) | 7 / 9.5 · 7 / 10; ink exact | 1.5 / 1.5 · 1.5 / 2; exact | 0 / 0; exact | 1.5 / 1.5 · 1.5 / 2; exact |
| **Highlight in the route ink**, light / dark (OKLCH L C) | 0.859 0.16 / 0.471 0.099 (a hue number, `color="175"`) | 0.859 0.16 / 0.471 0.099 | the same | 0.859 0.040 / 0.299 0.053 (a 28 % / 34 % mix) |
| **What animates** (every running animation on a mark, both engines) | `transform` ×2 **and `opacity`** (`hm-settle`) | `transform` ×2 | `transform` ×2 | `transform` ×2 |
| **Clock**: computed duration and timing function against `--spring-present` | 200 ms, equal, in both engines (the curve is `linear()`, rising monotonically and never past 1) | equal | equal | equal |
| **Stall, Chromium**, 4x CPU and a 50 ms task, per cell (h85 underline / h85 highlight / atlas42 underline): screencast frames inside the task; control square moved | 4 / 4 / 4; yes | 4 / 4 / 4; yes | 3 / 4 / 4; yes | 4 / 4 / 3; yes |
| **Stall, Chromium trace**: display frames inside the task; worst frame gap over the draw; `Layout` events during the draw | 6 / 6 / 6; 10.0 to 10.3 ms; 0 | 5 / 6 / 6; 9.9 to 17.8 ms; 0 | 6 / 5 / 5; 10.2 to 14.3 ms; 0 | 6 / 6 / 5; 9.9 to 10.3 ms; 0 |
| **Stall, WebKit** | no frame inside the task in 3 / 3 cells: unmeasurable | 2 / 3 unmeasurable; in the third (h85 highlight), 1 frame inside the task: the control moved while the ink rose 0.003. One frame, nothing concluded | 3 / 3 unmeasurable | 3 / 3 unmeasurable |
| **Layout and style reads in the mount task** (11-mark sheet; underline / highlight) | 182 / 182 (one-mark stall scene: 16) | **0** / 0 | **0** / 0 | **693** / 204, with 33 `measureText` and 45 `getImageData` (one-mark scene: 18 to 57) |
| **Reads during the draw; reads inside the 50 ms task** | 0; 0 | 0; 0 | 0; 0 | 0; 0 |
| **Scroll stop** (O-230 (3)): transitions running 100 ms after a wheel stop, besides draws of marks entering view | **15 `translate` transitions** · present | 0 | 0 | 0 |
| **In view** (O-190): a mark 2 viewports down | not drawn after 1 s; 1 draw on arrival | the same | the same | the same |
| **Reduced motion; print** | 0 running at frame 0, `drawn` 11 / 11, coverage at frame 0 equal to rest | the same | the same (coverage 0.98 to 1.03) | the same |
| **Forced colours** (both engines emulate it) | underline: a dark rule. Highlight: **keeps the author band** (orange; teal on the route row), no system colour | underline: real. Highlight: `Mark` (255, 255, 0) | underline: real. Highlight: `Mark` (255, 255, 0) | underline: a dark rule. Highlight: **a grey band** (192, 192, 192), no `Mark`; faint at 16 px |
| **No script** (scripts disabled; the server's markup with the page's own CSS; mark-pixel coverage against rest) | SSR **throws** (`ReferenceError: document is not defined`, from a `watch` in setup). The mounted DOM minus the mark paints **no mark** (0) | **1.00** in every row, screen and print, both engines | **0.62 to 1.84**: a native underline and a box background, not the stroke's geometry | SSR succeeds; it paints **no mark** (0): the proposal has no class to fall back to |
| **Bytes**, the entry built alone (vite lib, vue external, lightningcss): raw / gzip; change from control | 19,960 / 7,301 | 7,370 / 2,854 (−12,590 / −4,447) | 13,443 / 5,427 (−6,517 / −1,874) | 19,462 / 7,294 (−498 / −7) |

The readings behind every cell:
- `AB/data/sheet-{chromium,webkit}.json`: extent, crossing, clearance, pieces, weight, seat, ink, direction, reads, still states, in view.
- `stall-*.json`: the stall cells and the Chromium trace counts.
- `scroll-*.json`: the scroll stop and the computed clock.
- `bytes-*.json`: entry sizes.
- `summary.txt`: the condensed print-out.

## What each passes and fails

**Control (11.1.0 HandMark).** The reports stand as filed.
- It runs past the text by up to 10 px.
- It crosses every descender measured: 311 device px at 112 px, the Arabic run, and "by program".
- Its weight falls from 0.10em to 0.06em as the type grows.
- It animates `opacity` beside `transform`, and it leaves 15 `translate` transitions running after a scroll stop.
- It reads layout 182 times in the mount task.
- It draws RTL from the left.
- It keeps author colours on the highlight under forced colours.
- It throws under SSR and has no no-script mark.
- It passes in view, the preset clock, the Chromium stall, reduced motion, print and one mark per line box.

**A.** It passes every hard constraint the harness can witness.
- 0 crossings, 0 mount reads, `transform` alone.
- It survives the Chromium stall, and WebKit is unmeasurable.
- One mark per line box; RTL draws from the right.
- Forced colours show `Mark`, and the no-script mark equals rest in both engines.
- It adds the fewest bytes: 4,447 gzip fewer than the control.

It fails or falls short on these:
- Its ends follow the advance box, not the glyph ink, so it runs up to 3.5 px past the ink of "4" at 112 px.
- Its descender handling belongs to the engine: Chromium leaves a 2.5 px stub after the y of "County", and WebKit drops it.
- "by program" breaks into 4 pieces, the shortest 10 px.
- Its own 64-position sweep (in `proposal-A.md`, not rerun here) found Chromium leaving descenders uncut at offsets of 0.10em and over. The 0.08em default used here cut every descender measured.

**B.** It passes every hard constraint the harness can witness, with the tightest extent: 0.5 px from the glyph ink at both ends, in both engines.
- 0 crossings, 0 mount reads, `transform` alone.
- It survives the Chromium stall, and WebKit is unmeasurable.
- One mark per line box; RTL draws from the right.
- Forced colours show `Mark`.

It falls short on these:
- The highlight bleeds 16.5 px past the text at 112 px, by design.
- The underline is 1.39 px at 16 px, below the 2 px floor A and C keep.
- "by program" breaks into 4 pieces, the shortest 11 px.
- Its no-script fallback is a native decoration whose geometry differs from the stroke (0.62 to 1.84 of the rest coverage), so the mark changes shape on hydration.
- It adds 1,874 gzip bytes fewer than the control, which is 2,573 more than A.

**C (atlas).**
- It passes:
  - Zero crossings on every Latin row in both engines.
  - Extent at the line rect, which is the advance box: 1.5 to 3.5 px past the glyph ink.
  - One mark per line box, the preset clock, `transform` alone, and the Chromium stall.
  - 0 reads during the draw.
  - No transition at a scroll stop.
  - In view, reduced motion, print, and SSR without a throw.
- It fails hard constraint **(c)**: 693 layout and canvas reads in the mount task (`onMounted` calls `measure()` synchronously, and `slotGlyphs` takes a range rect per grapheme).
- It fails hard constraint **(f)**: with no script there is no mark.
- On RTL, the draw starts from the left, and the rule crosses Arabic glyph ink (12 + 5 px in Chromium, 3 + 7 px in WebKit).
- Under forced colours the highlight is a grey band, not `Mark`.
- The rule is capped at 5 px, which is 0.045em at 112 px, the thinnest of the four relative to the type at headline size.
- The band sits 0.30em above the baseline, under the x-height (0.53em), not on it.
- It adds about the control's bytes (−7 gzip).
- Its fix for "by program" is proposed but not built, so the 4 pieces stand.

## What atlas's proposal gets right

- **The diagnosis of "by program" is correct, and it is not C's alone.** A, B and C all cut that phrase into 4 pieces of 10 to 11.5 px at 28 px. The descender skip that cures O-230 produces O-265 in every candidate. Of the three, only C says what to do about it (one unbroken rule below the descenders when a piece would fall under a minimum), and that rule has not been built yet.
- **Zero overrun, measured.** C's ends sit at the line rect, 1.5 px from the glyph ink on atlas's 42 px title, so the rule never reaches a 16 px phone gutter. This matches A, and is a pixel looser than B.
- **No ground-colour halo.** Its descender gaps are real gaps, read from the canvas at device resolution: 0 crossings, 1 to 2.5 px of clearance, and nothing painted in the paper colour. That is the property atlas needs on translucent plates.
- **The rule lands on whole device pixel rows.** Its thickness is floored to device pixels, and its top is snapped to the device grid.
- **It holds still.** There is no scroll listener and no re-ink. 0 transitions follow a scroll stop, against the control's 15.
- **One focal ink, with a route override** (`--hm-ink`). The route ink painted exactly in both themes.
- **It renders on the server**, where the control throws.

## Instrument notes and limits

- **Two harness faults were found and cured during the run.**
  - Chromium's CSSOM writes a `text-decoration` shorthand holding `var()` out as empty longhands, so the first no-script page lost A's and B's rules. The page CSS is now captured as raw `<style>` text.
  - The no-script witness span sat in flow and shifted the page 10 px, which moved small underlines out of the read window. It is now `position: fixed`.
  - After both fixes the still cells were rerun in both engines. The table quotes the rerun.
- **WebKit hung partway through the sheet run.** After about 1440 C, every `page.goto` timed out, which matches the known WebKit `goto` hang after many navigations in one browser. The lost cells (1440 C, the still cells, in view) were rerun in three small guarded runs, each with its own browser, and merged in (`log-rerun-webkit-*.txt`). No error remains in either record.
- **WebKit's stall is unmeasurable by this method** (as in lane L7 and both proposals): its screencast shows no frame inside a blocked task. WebKit witnesses the property, the clock, the reads and the states, not the stall.
- **The table measures against the glyph ink box.** A and C place their ends from the advance box, which is why they read 3.5 px past the ink of "4" at 112 px while their own records read 0.
- **Not run:**
  - Real Safari.
  - Firefox.
  - atlas's other faces (C's measured-baseline argument is about faces other than Plus Jakarta Sans; only Plus Jakarta Sans was set here, so that claim is not tested).
  - Vertical writing modes.
  - A reflow during the draw.
  - Gregg's live pages (O-230's frames).
- **The full-page single captures are not kept**, because the sheets carry them. `AB/data/png/` holds only the stall strips, and the harness regenerates the singles.

## Captures, side by side (`AB/sheets/`, control | A | B | C)

- Rest state: `{chromium,webkit}-{390,1440}-{underline,highlight}-{light,dark}.png`
- Mid-draw at 50 % of the clock: `…-mid50.png`
- The mark alone, at 30 % of the draw (direction): `…-mid30-markpass.png`
- The mark alone at rest: `…-pass-mark.png`
- Close-ups at 1440: `closeup-{engine}-{h85,h112,body,wrap,atlas42,byprog,rtl}-{underline,highlight}-{light,dark,pass-mark}.png`
- Still states at 1440: `{engine}-1440-{shape}-{reduced,print,forced,noscript-screen,noscript-print}.png`
- Stall strips (Chromium): `AB/data/png/stall-chromium-<cand>-<row>-<shape>-<k>.png`
