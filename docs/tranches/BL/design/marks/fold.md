# Marks: the fold of the challenge into W-B.16

The fold seat (claude-fable-5-2), 2026-11-12. I read `challenge.md`, its captures and readings, `W-B.16.md`, `AB.md`, proposal A and its patch, the three precepts and the INBOUND rows. I then amended the winning prototype for each finding, measured the amendments in both engines, and rewrote `../../waves/W-B.16.md` in place.

**All nine findings stand and all nine are folded.** Seven changed the mechanism, one (F7) is a stated limit with its gate reworded, and one (F9) is half cured and half the owner's. No gate was loosened: G-CLEAR is rewritten around a seat that holds, G-INK's ink bound is said to be what it always was (a pin on the named rows), and two gates are new (G-SELECT, G-SEEN).

**How it was run.**
- A scratch worktree of `release/11.1.0` (`9b339a599`) with `proposal-A/prototype.patch` applied and the challenger's harness copied in and extended. The worktree is removed.
- Chromium headless shell 149.0.7827.55 and Playwright WebKit 2287 (reports 26.5), 2x, a 1000 px viewport. Every run went through `guarded`, the WebKit runs under `--exclusive webkit`. None was refused.
- Each amendment has a switch in the scratch component that turns it off, so each gate's bite was read from the same tree (`prototype/measured/`). `prototype/clean/` is the same source with the switches out and the layer's `user-select` removed; it was built for bytes and typechecked, not run in a browser.
- Readings: `fold/data/`. `chromium-final.json` and `webkit-final.json` are the amended build; `*-bite.json` has six amendments switched off; `*-bite2.json` has `user-select` off and `inert` on. `trail/` holds the candidates that were measured and not taken. `log-queue.txt` is the run order.
- Captures: `fold/evidence/`. Component strips read top to bottom: the draw at 50 %, the copies landed, rest.
- Static rows are measured as `AB.md` and the challenge measure: a glyph-only render and a mark-only render, a pixel counted when at least half covered, four sub-pixel line positions per case.

## Dispositions

| finding | disposition | what changed in W-B.16 |
| --- | --- | --- |
| F1 clear seat | mechanism amended | R-6, the token table, G-CLEAR, OQ-5, atlas's line |
| F2 selected highlight | mechanism amended | new R-13, new G-SELECT, the forced-colours line |
| F3 clipped mark never draws | mechanism amended | R-10, the mechanism, new G-SEEN |
| F4 blockified host | mechanism amended (the draw is for an inline host; others stand drawn, loudly) | R-10, the mechanism, G-DRAW, G-DRAWN, the README list |
| F5 larger child | mechanism amended | the mechanism, G-DRAW |
| F6 G-TEXT and G-SSR red | gates rewritten to the mechanism; the copy and the layer amended | the mechanism, G-TEXT, G-SSR, G-DRAW, OQ-4 |
| F7 tracked type | stated as a limit; gate reworded, not loosened | R-4, G-INK, the README list |
| F8 late face | mechanism amended | R-10, the mechanism, G-DRAW, OQ-7 |
| F9 default ink | band law amended; the default ink goes to the owner | R-9, G-INK, OQ-6, `OWNER-READ.md` question 4 |

## F1. The clear seat

**Amended.** `.mark-clear` is `--mark-offset: 0.26em` with `text-decoration-skip-ink: none`. The spec's 0.2em relied on the engine's skip to stay out of the way; the rule met the descenders and the skip cut it. With nothing skipped the rule cannot break, and at 0.26em it sits below every descender measured.

| "by program", four positions each | Chromium | WebKit |
| --- | --- | --- |
| Plus Jakarta Sans 700 at 16, 21, 28, 42, 85 px; 400 and 800 at 28 px | 1 piece, 0 crossings, every row | the same |
| IBM Plex Sans 600 at 16, 28, 42, 85 px; 400 at 16 px | 1 piece, 0 crossings | the same |
| Georgia 16 and 28 px, the system face 16 and 28 px, Helvetica Neue 28 px, Times 28 px | 1 piece, 0 crossings | the same |
| "population" (both faces), "typography" (Plex), "4,485" at 85 px, "Qjgy(p)" at 48 px (both faces) | 1 piece, 0 crossings | the same |
| all clear rows | 96 of 96 | 96 of 96 |
| top edge at 85 px, Plus Jakarta Sans / Plex | 0.254 to 0.263em / 0.257 to 0.265em | 0.260 to 0.264em / 0.256 to 0.260em |
| the component's draw at this seat, landed against rest | 0 px, both shapes | 0 px |

The deepest glyph bottom read at 28 px and over was 0.232em. At 16 px one device pixel is 0.031em, so the 0.25em the challenge read there is that resolution.

**Bites.**
- The old seat with nothing skipped (0.2em) crosses at 85 px: 154 device px at every position in Chromium; 249, 155, 249, 155 in WebKit.
- The old seat with the skip on is the challenge's reading again: 3 pieces in Chromium, 4 in WebKit, at 85 px.
- The default seat at 28 px: 4 pieces at every position in both.

**Measured and not taken: `text-underline-position: under`** (the font's own descent, which is what first principles asks for; `trail/under-*.json`).
- Chromium centres the rule on the descent line. With the offset at `auto` its top is 0.172 to 0.181em at 85 px in Plus Jakarta Sans, above the descenders: 564 device px of crossing at every position, 55 at 28 px.
- WebKit sets the rule wholly below the descent: top 0.254 to 0.258em, 0 crossings.
- At 0.08em the engines sit apart by a rule's thickness and more: 0.254 to 0.263em against 0.336 to 0.341em (Plus Jakarta Sans), 0.293 to 0.300em against 0.391 to 0.396em (Plex), where WebKit's rule ends 0.466em under the baseline.
- A fixed 0.26em reads the same in both engines and sits closer to the words. `evidence/F1-under-against-fixed.png` has the two side by side (Chromium then WebKit; `under` above, 0.26em below).

So 0.26em is a constant and the wave says so: a face whose descenders run deeper sets a deeper `--mark-offset`.

Captures: `evidence/F1-clear-seat.png` (eight strips: the default seat; the clear seat at 28 px, at 85 px and in Plex at 42 px, two strips each; last, the 0.2em bite at 85 px), `evidence/clear-draw.png`.

## F2. A selected highlight

**Amended.** `.mark-highlight::selection` repeats the highlight's decoration and takes the band as its ground. Chromium still repaints the run's own decoration in the text colour; the selection's own line paints over it. The band is resolved once on the element (`--mark-band-paint`) so the selection reads the same value.

Pixels within 48 of the text colour inside the marked run's box, unselected then selected:

| | Chromium | WebKit |
| --- | --- | --- |
| light | 4,631 then 4,631 | 4,664 then 4,664 |
| dark | 5,100 then 5,103 | 4,775 then 4,778 |
| route ink on an ancestor, light | 4,680 then 4,691 | 4,678 then 4,681 |
| commonest colour in the box when selected, light / dark | the band (248, 176, 88) / (112, 40, 136) | (248, 176, 88) / (96, 32, 112) |
| forced colours: ink share, marked run against an unmarked one, both selected | 0.225 against 0.226 | not forced by this emulation |

**Bites.**
- Without the selection's decoration, Chromium: 14,709 text-coloured pixels light and 14,755 dark. That is the challenge's bar.
- Without the selection's ground, both engines: the page's ground under the selected words, so they look unselected.
- Without the forced-colours reset, Chromium: ink share 0.414 and a white bar over the words. The reset (`.mark-highlight::selection { text-decoration: none }` inside the forced-colours block) is therefore part of the rule.

**Measured and not taken** (`trail/`).
- No ground at all: Chromium keeps its own tint, but WebKit drops its tint under any author selection rule, so the words look unselected there (`first-webkit-partial.json`).
- `background-color: Highlight`: WebKit paints its own tint in both themes, but in dark Chromium paints (144, 168, 200) beside its own (48, 80, 112) (`highlight-ground-*.json`).
- Two forms that set the selection's `color` and `-webkit-text-fill-color` painted the words in the selection's colour in Chromium. That reading was taken in my first run and its file was not kept, so it is not in the wave.

Captures: `evidence/F2-selection-chromium.png` (the bite; light; route ink; dark; forced colours; the forced-colours bite), `evidence/F2-selection-webkit.png` (the no-ground bite; light; route ink; dark).

## F3. A clipped mark

**Amended by a deletion.** The observer's second threshold and the half-of-the-run test are gone: a mark draws when any part of it is in view.

| row (intersection ratio) | Chromium, underline / highlight | WebKit |
| --- | --- | --- |
| two-line clamp (0.245; WebKit 0.24): state after 3 s; mark pixels, component against plain class | `rest`; 1,856 against 1,864 / 8,613 against 8,613 | `rest`; 1,860 against 1,860 / 8,369 against 8,331 |
| ellipsis (0.277) | `rest`; 1,232 against 1,232 / 5,309 against 5,309 | `rest`; 1,224 against 1,224 / 5,570 against 5,570 |
| horizontal scroller (0.314) | `rest`; 1,088 / 4,954 | `rest`; 1,084 / 4,868 |
| `drawn` | fired for all three | fired for all three |
| a mark two viewports down | `wait` at load and after 1 s; draws on arrival; landed against rest 0 px | the same |

**Bite.** With the half rule back: `wait`, 0 mark pixels, no `drawn`, in every cell.

What this costs: a mark entering from below starts its draw when its first pixel row shows, half a line box earlier than before. I did not measure how much of the draw a reader then sees.

HandMark on `release/11.1.0` has the same half rule (`HandMark.vue:463`). I did not run the clipped rows against it.

Captures: `evidence/F3-clipped-chromium-underline.png` (each component row above its plain-class twin, then the scroller, then two bite rows), `evidence/F3-clipped-webkit-highlight.png`.

## F4. A host that is not inline

**Amended: the draw is for an inline host.** In the observer's callback the mark reads its computed `display`; anything but `inline` goes straight to `rest`, fires `drawn`, and warns once in a dev build. The mark still paints, because the mark is the class.

| host | Chromium | WebKit |
| --- | --- | --- |
| flex item, grid item, `inline-block` | `rest` at the first observation, no copy built, `drawn` fired, one warning each; landed against rest 0 px | the same |
| bite, landed against rest, underline / highlight: flex | 5,278 / 19,361 px | 3,052 / 17,670 px |
| grid | 3,056 / 17,068 px | 3,052 / 17,685 px |
| `inline-block` | 5,278 / 19,361 px | 3,052 / 17,670 px |

The bite figures are the challenge's, reproduced.

I chose this over making such a host draw. A blockified host has no line fragments of its own, so a draw there needs either a second way to find lines or an inner element the slot did not give. The hard constraint is "inline with wrapping text", and Gregg's one-line hold is `white-space: nowrap` on a wrapper (`Section.vue:105`), which leaves the mark inline. The cost is one `getComputedStyle` per mark in the callback, by the source line; I did not recount the reads.

Capture: `evidence/F4-host-flex-highlight.png` (amended above, bite below).

## F5. A larger child

**Amended.** Inside the copy every `line-height` is 0. The window's own strut (the line's box) then sets the line alone, and a larger child cannot push the copy's baseline down.

| row, landed against rest, underline / highlight | Chromium | WebKit |
| --- | --- | --- |
| a 1.6em figure in a 22 px mark | 0 / 0 px | 0 / 0 px |
| a 2.2em figure in a 22 px mark | 0 / 0 px | 0 / 0 px |
| bite, 1.6em | 3,312 / 7,438 px | 3,304 / 7,548 px |
| bite, 2.2em | 3,792 / 16,479 px | 3,776 / 16,984 px |

Nothing larger than 2.2em was run. A consumer class that sets `line-height` on the mark itself would override the rule; not run.

Capture: `evidence/F5-larger-child-highlight.png` (the 1.6em row amended, its bite, then the 2.2em row in WebKit).

## F6. G-TEXT and G-SSR against the mechanism

**The gates now say what the mechanism does, and the mechanism is tightened where the finding showed a fault.**

- The layer stays inside the host. Moving it out would change the component's root, and the copy needs the host's inherited font.
- G-SSR asserts the true markup: `<span class="mark-underline" data-ink="wait"><!--[-->4,485<!--]--><span class="mark-layer" aria-hidden="true" inert></span></span>` (Chromium's reading in all three runs of the last round, and WebKit's in its `bite2` run; in WebKit's `final` run the import of the server renderer failed, an instrument fault).
- G-TEXT asserts `textContent` before the draw and at rest, and the layer's contract during it. While a mark draws the host's `textContent` is still the slot's text followed by each line's copy (the challenge's "4,4854,485"; on my three-line row, the sentence and then its three lines). That is inherent to a copy inside the host and the wave says so.
- **The copy** is now a new element with the host's `class` and inline `style` only. The bite (cloning the host) put the host's `data-probe` on every copy: 3 extra matches on the three-line run, the challenge's reading. No row had an inline style on an inline host, so the `style` half is by the source line.
- **The layer is `inert`**, and the `user-select` declarations go: WebKit never applied them, and with them off in Chromium no reading changed (`*-bite2.json`).

| while a mark draws | Chromium | WebKit |
| --- | --- | --- |
| a selection across the host (the three-line row; the row with a link inside) | the slot's text once, with a trailing line break on the three-line row | the slot's text once |
| the same with `user-select` off and `inert` on, and with `inert` off | the same | the same |
| `focus()` on the copy of a link inside the mark | does not take focus | does not take focus |
| the same without `inert` | takes focus | takes focus |

The last row is a fault the challenge did not list: with a link inside the mark, the first form put a second, focusable link in the page for the length of the draw. `inert` cures it. The selection read the slot's text once in every variant I ran, with `inert` off included, so that reading in G-DRAW has no bite on file.

Find-in-page is not measured; a headless run cannot witness it (OQ-4).

## F7. Tracked type

**Stated as a limit; the gate is reworded, not loosened.** The trailing letter-space belongs to the last glyph's advance, and both engines draw a decoration across it. `CSS.supports("text-decoration-inset", "1px")` is false in both, so nothing in CSS trims it. I took no other measurement; the figures in the wave are the challenge's.

- R-4 now says what the advance box holds: the side bearings, and on positively tracked type one letter-space.
- G-INK keeps "0.5 px past the advance box" on every row and adds two tracked rows to it. The 4 px bound against the glyph ink is named as a pin on the rows the reports named. On the tracked rows the bound is the same 4 px after one letter-space is taken off (7.5 less 4.25, and 2 less 1.8, on the challenge's readings).
- An "H" at 85 px starts 5.5 px before its ink. That row is not in the gate and the wave does not claim a bound for it.

This can recur as "runs past the text" on a positively tracked headline. Gregg's headlines track negatively (−0.045em) and read 3.5 px.

## F8. A face that lands under the draw

**Amended.** If `document.fonts.status` is `"loading"` when a draw starts, the draw lands when `document.fonts.ready` resolves.

The cell: the row's face is a stylesheet face with `font-display: swap`, held 4 s on the network by the probe, with the draw held.

| | Chromium, underline / highlight | WebKit |
| --- | --- | --- |
| before the face | `draw`, 2 lines, fonts loading | the same |
| after the face | `rest`, no copy, `drawn` fired once | the same |
| after the face against rest | 0 / 0 px | 0 / 0 px |
| bite: after the face against rest | 8,195 / 31,953 px | 7,528 / 31,154 px |
| bite: landed against rest | 11,863 / 29,279 px | 10,296 / 27,520 px |

The last row is the challenge's reading, reproduced.

The signal is the page's, not the mark's: any face landing ends every draw in flight. I saw this when the late row sat on the full sheet and every mark landed with it (the round at 09:08, not kept). A face that starts to load after a draw has begun is not caught; not run (OQ-7).

**Measured and not taken:** a `loadingdone` listener. In WebKit a face added by script fired no `loadingdone` and the draw stayed stale (`trail/under-webkit.json`, the late cell: 7,528 px). In the first WebKit round the page closed during that cell, with a style-injected face and the listener in place (`trail/first-webkit-partial.json`); I did not find the cause, and it did not recur once the cure was `fonts.ready` and the face came from the stylesheet.

Capture: `evidence/F8-late-face-highlight.png` (amended in Chromium, the bite, amended in WebKit; each strip reads: before the face, after it, landed, rest).

## F9. The default ink

**The band: amended.** Its chroma is `min(0.16, c × 40)` of the ink's own.

| ink | Chromium, light | WebKit, light |
| --- | --- | --- |
| `#000` | `oklch(0.86 0 0)`; before, `oklch(0.86 0.16 0)` | the same |
| `#1a1a1a` | chroma 0.0004 | 0 |
| `#fff` | chroma 0.002 | 0 |
| glass's light ink, `hsl(24 10% 10%)` | `oklch(0.86 0.16 55.98)`, unchanged | `oklch(0.86 0.16 56.04)` |
| a tinted near-black, `hsl(220 8% 12%)` | 0.16 at hue 264.5 | 0.16 at hue 264.4 |
| atlas's route ink | `oklch(0.86 0.16 175)`, unchanged | the same |

Dark reads the same chroma at L 0.44. The factor 40 means an ink takes the full 0.16 from a chroma of 0.004 up; by my arithmetic glass's light ink has a chroma of about 0.006.

A neutral ink now gives a neutral band (L 0.86 on a ground near L 0.98). `restraint.md` rules out grey surfaces; I judged a neutral band from a neutral ink truer than a pink one from nowhere, and the README tells such a consumer to set `--mark-band`.

**The underline that reads as a link: the owner's.** In glass's light theme the focal ink is the text colour. That default is 11.1.0's, shipped at the owner's order (O-183), and Gregg and atlas set their own ink, so I did not change it. It is `OWNER-READ.md` question 4 and OQ-6, and the README says not to set a mark inside a link.

Capture: `evidence/F9-band.png` (`#000` before and after, `#1a1a1a` before and after, the default, the route ink, then `#000` and the default in dark).

## What else was read

- **The amendments left the rows that held alone.** Landed against rest, both shapes: the inline wrapped run, the tracked label, the `vw` heading and the Arabic run read 0 px in both engines. The mark inside a link reads 8 px (underline, Chromium) and 753 px (highlight, WebKit), as the challenge read. A row with `<em>` and `<strong>` inside reads 25 px for the highlight in both engines and 0 for the underline; proposal A read 15 and 16 px (Chromium) and 7 and 7 (WebKit) on its own such row. It is recorded in G-DRAW and gates nothing.
- **Bytes.** The entry built as `AB/harness/bytes.mjs` builds it: A's source 2,855 gzip on this tree (AB read 2,854), the clean amended source 2,978. G-BYTES's bound of 3,200 is not moved.
- **Types.** `vue-tsc --noEmit -p tsconfig.src.json` exits 0 with both sources in the tree.

## Instrument notes

- **Dark cells.** The challenger's probe opens every context in the light scheme. On this page the root carried an inline `color-scheme` that followed the emulated preference (`useGlobalDark.ts:171` writes one), so under the dark class with a light context every `light-dark()` read its light arm, and my first dark band was the light one. The probe now sets the context's scheme with the theme. The wave's gate preamble says the same.
- **The static clip.** A rule at the clear seat fell below the row's clip at small sizes and read as 0 pieces. The clip for those rows is 8 px taller; rows are at least 10 px apart.
- **Forced colours in WebKit.** The emulation matched the media query (the highlight took `Mark`), but the page kept its own text colour and ground, so the forced-colours selection reading is Chromium's only.
- **One WebKit run was stopped by PID** while it ran, to change the selection rule; the note I wrote at the time said it was still waiting on the lock. The log in `data/` is corrected, and its partial reading is in `trail/`. One other queued run was stopped while it waited.
- **Exit codes** in `log-queue.txt` are `guarded`'s. The first WebKit round logged 0 with an error in its JSON.

## Not run

Real Safari and Firefox. The stall gate and the clock, in-view scroll-stop and still-state cells of `AB.md` on the amended build: the amendments do not touch the keyframes, the animated property or the media condition, by the diff (`prototype/amendments.patch`). The read count. Find-in-page. A wrapped run at the clear seat (OQ-5 is arithmetic). Vertical writing. The clean source in a browser.

## For the orchestrator

- `W-B.16.md` is rewritten in place. `OWNER-READ.md` gains question 4, a line on letter-spaced type, and a capture of the clear seat; `SPEC-SUMMARY.md` is trued to the folded text.
- HandMark's half-in-view rule (`HandMark.vue:463`, 11.1.0) is the same rule F3 broke here. I did not run it. If it reproduces, it is an 11.1.1 defect on a shipping component.
- The focusable copy of a link (F6) is a tenth fault, found while folding. It is cured and gated in G-DRAW.
