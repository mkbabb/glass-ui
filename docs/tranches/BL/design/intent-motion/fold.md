# W-B.17: the fold

The fold seat (claude-fable-5-2, 2026-11-12) read BRIEF, the three precepts, `challenge.md`, `W-B.17.md` and PROTOTYPE, took each finding's cure into the prototype worktree, read it again, and rewrote `../../waves/W-B.17.md` in place. `OWNER-READ.md` and `PRECEPTS-ADDENDUM.md` were brought into line. This file gives each finding's disposition and the readings behind it.

No gate was loosened. Where a cure could not be shown to pass, the piece is held or the failure is listed in the wave's "Open against the gates".

## How the readings were taken

- The prototype worktree, `.claude/worktrees/bl/intent/proto`, was amended in place. The diff from the state the prototype seat returned is `fold/amendments.patch` (it applies on HEAD with `prototype/prototype.patch` applied first; checked with `git apply --check`).
- `fold/probe.mjs` serves the prototype's own harness (ports 5373 and 5374, the cache in the session scratchpad) and reads it at 1440 light, plus one 390 coarse context. One browser per run, a new context per reading, every run through `guarded`, WebKit through `guarded --exclusive webkit`.
- Wall-clock readings are one `getComputedStyle` (or one box) per animation frame. Seeked readings go through the prototype's `./no-snap` helper. Cost is a Chromium trace at 4x CPU.
- The numbers are `fold/data/chromium.json` and `fold/data/webkit.json`; `fold/summarize.py` and `fold/brief.py` print them. The strips are under `fold/strips/`, composed by `fold/compose.py`.
- Chromium was read four times as the amendments landed; the figures are the last run's unless a range is given. The machine was busy throughout (a load of 36 to 52 for the first three runs, 15 to 22 for the last), so layout times are upper readings.
- Shipping Safari is unmeasured. WebKit has no layout, style or paint counter.

## What changed in the prototype

| file | change |
|---|---|
| `src/styles/glass/plate.css` | the breath, its keyframe and the busy state out; `data-idle` as a resting state; the `:has()` exclusion on hover and press; the on list cut to controls with no other mark; the hover's growth on `--ease-out`; `--plate-edge`; the press leg as `:where(.plate)`, resting at `scale: 1`, with no shrink under reduced motion |
| `src/styles/glass/glyph.css` | four named verbs and no default; one `transform` and one leg, on `--ease-out`; the two numbers set only on a `.plate` and on a control that holds a glyph; the same `:has()` exclusion; the draw's gap as `--glyph-gap` (0.12) and its offset as the sum of the two numbers |
| `src/styles/glass/presence.css` | the leave rule holds `translate`; a pair of marks stacks in one seat with the arriving one waiting a quarter of the exit clock; `data-presence="reclaim"` |
| `src/composables/motion/presence/follow.ts` | the clock grows with the distance; `--ease-standard`; width only on a box that cannot wrap; a return plays the running tween backward; the margin is followed; `<Presence swap>`'s seat follows at the hand-over; no literal fallbacks |
| `src/composables/motion/presence/Presence.ts` | `reclaim` struck; one prop |
| `src/composables/motion/engage/press.ts` | new: `installPress()`, the one writer of `data-press` |
| `src/components/labeled-field/LabeledField.vue` | the error line stays mounted, `data-presence="reclaim"`, with one `follow()` |
| `src/testing/no-snap/index.ts` | the absolute step clause; `transform` read |
| `tests-visual/intent-motion/harness/` | cells for each reading; `breathe-candidate.ts`, the breath that failed, kept out of `src` |

Bytes after: the three partials 1260 B gzip (1151 B before); `./motion`'s growth 1560 B gzip with the press writer (941 B before). `vue-tsc` on the API probe and the server render of both `<Presence>` forms pass.

## The findings

"Taken" means the cure is in the patch and in the wave. Each reading is Chromium, then WebKit.

### The law

| finding | disposition | reading |
|---|---|---|
| **C-1** a breathing plate cuts under the pointer | **Taken, and both candidates read.** The breath is struck. Candidate one (one added Web Animation, finished and not removed) **fails**. Candidate two (idle as a resting plate) **passes** and is R-10. The busy plate is struck with it (R-15). | Candidate one, Chromium: idle on 0, 0, 0.001; idle off 0.286, 0.281, 0.274, reaching 0 after 430 ms with no animation left; **pointer on 0.335, 0.339, then 0.758; pointer off 0.832, then 0.415**; 132 style recalculations in 1.1 s. WebKit: on and off hold the same way (0.278, 0.270, 0.262); pointer on holds (0.331, 0.335, 0.339); **pointer off 0.832, then 0.416**. So it fails one edge in WebKit and two in Chromium. Candidate two, Chromium: on 0, 0.004, 0.028, 0.064; pointer on and off no change; press 0.417, 0.423, 0.448, 0.49; off 0.417, 0.412, 0.393; largest step 0.11. WebKit: on 0.004, 0.024, 0.083, 0.181; press 0.417, 0.425, 0.466, 0.532; off 0.417, 0.406, 0.372; largest step 0.16 at its 50 Hz. |
| **C-2** plain presence turned at 60 ms | **Taken in part.** The leave rule holds `translate`, so told to leave while it arrives the travel runs on under the fade. Told to return while it leaves, Vue still drops the node: no CSS cures that. The wave rules that anything reversible inside 120 ms is a node that stays, and the turned cells are in G-TWEEN. | In then out, Chromium: `translate` 1.479, 1.258, 1.108, 0.945, 0.775 px across the turn (it read `none` in one frame before). Out then in: opacity 0.289, 0.219, then 0. WebKit: the travel runs on the same way (0.95, 0.78 px after the turn); out then in, opacity 0.314, 0.214, then 0. |
| **C-3** reclaim turned at 60 ms | **Taken.** `<Presence reclaim>` is struck. The line is a node that stays and `follow()` tweens its block size. Built on the real `LabeledField`. | Chromium, the field below, largest move in one frame: in 3.0 px, out 3.0, in then out 3.2, out then in 2.5 (it jumped 9 px). Out then in, across the turn: 431.61, 429.53, 429.47, 430.22 px. WebKit: in 3.9 px, out 4.1, in then out 4.2, out then in 5.1 in a 14 ms frame (437.97, 435.02, 429.95, then 435.02, 436.61 px); no frame interval over 21 ms. |
| **C-4** a press on a nested control presses its trigger | **Taken**, in the files and not injected: the `:has()` exclusion is in the hover rule, the press rule and the glyph's `--intent`. | Both engines: over the inner button the outer plate is 0 and the outer chevron at rest, the inner plate 0.417; pressed, the inner box is 23.28 px (24 × 0.97, once) and the outer `scale` is 1; over the trigger elsewhere the outer plate is 0.417, the chevron 1.236 px, the inner plate 0; pressed there, the trigger shrinks and the inner plate stays 0. The ten values agree to the last digit, with and without the press writer. |
| **C-5** a quick click shows no press | **Taken.** `installPress()` holds `data-press` to the later of the release and the press clock. OWNER-READ question 1 says which press he is shown. | Chromium, no hold: without the writer `scale` 1 and plate 0.417; with it 0.97 and 1. A 60 ms hold: 0.985 and 0.78 without, 0.97 and 1 with. `scale` never above 1 on the way back. WebKit: no hold, 1 and 0.417 without, 0.971 and 0.999 with; 60 ms, 0.984 and 0.82 without, 0.97 and 1 with. |
| **C-6** the press rule replaces a control's transition list | **Taken, and the other half found.** The leg is `:where(.plate)`. Read on a control with its own list: with no `scale` leg in that list the press is a cut. So each 12.0.0 control writes the leg into its own list, and G-TWEEN's press cell runs on the real Button and SelectTrigger. | Chromium, a control with `transition: color, background-color`: `scale` 1, then 0.97 in one frame. The same with `scale` added to its list: 1, 0.999, 0.997, 0.994, 0.990. WebKit: the same (0.97 in one frame; 1, 0.999, 0.996, 0.992 with the leg). The real Button and SelectTrigger were not read. |
| **C-7** a swap is 320 ms with a blank seat | **Taken, with the wait measured three ways.** Icon pairs are two nodes that stay. The wait is a quarter of the exit clock, not the half the challenge proposed: at half the seat goes dim and a turn holds it dim. `<Presence swap>` stays for content of two sizes. | Chromium. Quarter: both never above 0.29, the brighter never under 0.31, whole by 130 ms; turned at 60 ms the seat dips to 0.21 for 7 ms. Half: both never above 0.12, the brighter down to 0.18; turned, under 0.3 for 59 ms. None: both at 0.49. Seeked through the helper, pair in and out pass. 0 layouts. WebKit. Quarter: both never above 0.25, the brighter never under 0.36, whole by 141 ms; turned, 0.16 for 12 ms. Half: the brighter down to 0.15; turned, under 0.3 for 84 ms. None: both at 0.44. Seeked, pair in and out pass. |
| **C-8** follow tweens the box and cuts what is in it | **Taken where a line of code could; the rest is held.** Built and read: the clock grows with the distance; `--ease-standard`; width only on a box that cannot wrap; a return plays backward. Not built: rows that fade, and a strip of wrapped text. The honest reading of the turn is in R-8: position is continuous and speed turns at full value. Follow is held (C-19). | Chromium, the 50-row panel: 288 px in 0.42 s; first steps 0.3, 0.7, 1.4 px; last frames 84.81, 84.34, 84.14, 84 px; largest step 18 px in an 8.3 ms frame. Sent back at 80 ms: 349.91, 342.13, then 348.77, 354.94 px. WebKit: last frames 84.72, 84.33, 84.06, 84 px; largest step 20 px in an 11 ms frame; sent back, 341.25, 327.70, then 339.22, 346.83 px. |
| **C-9** the draw breaks the curve and does not answer a click | **Taken in two parts, declined in one.** The gap is 0.12 by default and a property. The offset is the sum of the two numbers, so a click draws again. **The return leg stays:** without it a leave at 60 ms is a cut, and the law outranks the paint. | Chromium. A click on a hovered trigger: -1.12, -1.126, -1.144, -1.175, on to -2.24. With the return leg dropped (injected), a leave at 60 ms: -0.274, -0.396, then 0. With it: -0.495, -0.609, -0.597, -0.555, back to 0. WebKit: the click draws again (-1.12 to -2.24); with the return leg dropped a leave lands -0.502 to 0 in one frame. The strip is `fold/strips/draw-gap-chromium.png`. |
| **C-10** a flipped chevron nudges against its point | **Taken**: one `transform`, turn outermost. | Both engines: closed and hovered the glyph's top goes 298 to 299.236; open and hovered, 298 to 296.764. An inner group still turns about its own centre (256, 308 at rest, mid-turn and after). |
| **C-11** busy has no mark of its own | **Taken as a ruling (R-15), unbuilt.** The plate's busy state is out. The ring in the glyph's seat and its strip are owed by the build seat (OQ-3). | None. |

### Restraint

| finding | disposition | reading |
|---|---|---|
| **C-12** the plate is not the thing he liked | **Taken.** OWNER-READ question 2 has no default and carries one image. G-BARE is split into a strict rest clause and a floor for every state the plate paints. | `fold/strips/plate-vs-owner-chromium.png`, pixels from the file, plate against host: **a** as built 236, 230, 222 on 238, 236, 234 (12); **b** full strength in the seat's tone 235, 220, 206 (28); his frame 51. WebKit: 237, 229, 222 (12) and 235, 220, 206 (28). Dark, and the shape's paint cost, are unread. |
| **C-13** three animations for a hover that cannot be seen | **Taken.** No default grow; grow is a named verb at 0.13. A hover runs two animations. | `fold/strips/hover-two-forms-chromium.png`. Chromium, hover in: 14 to 15 recalculations, 0 layouts, 2 paints, for the plate alone, for a nudge and for a grow. |
| **C-14** "on" is marked twice | **Taken in the rule** (R-14): tabs and disclosure rows are out of the held list. The cells on a real tab strip and accordion are G-RESTRAINT's. | None on real components. |
| **C-15** four spellings and two numbers on every control | **Taken, the stricter option.** One spelling per verb, no bare form, no `none`. The two numbers are set on a `.plate` and on a control that holds a glyph. | Read through C-4's and C-10's cells, which use the narrowed rule. |
| **C-16** the plate's corner on a bordered control | **Taken**: `--plate-edge`, and gate G-CORNER. | `fold/strips/border-corner-chromium.png`, 4x: at `inset: 0` a sliver of host shows inside the border at the corner; with the edge set there is none. The real outline Button and SelectTrigger were not read. |

### Safari and cost

| finding | disposition | reading |
|---|---|---|
| **C-17** the glyph's leg on Chromium's main thread | **Taken**: one `transform`, one leg. The challenge's proposed cell, "10 or fewer recalcs in a hover", cannot be met by its own table (the plate alone is 14), so the cell is 16 or fewer against a RED of 25. | Chromium at 4x, 350 ms: 14 to 15 where it was 25. |
| **C-18** `linear()` on Safari's compositor is unread | **Taken, the second option.** The hover legs (plate growth, glyph) ride `--ease-out`; presence keeps the spring for its 4 px. One line for P1 is in the addendum. | Seeked: the plate's growth steps 0.264 of its travel in a frame, and passes. Safari's timeline is still unread, and no longer needed for hover. |
| **C-19** follow and reclaim are layout in every frame | **Taken.** Read on the real `LabeledField` on `glass-floating`: over budget. Follow, the line and the swap's seat are held behind four conditions, and G-PROOF is new. | Chromium at 4x, longest layout: the line in 1.17 to 1.22 ms, out 1.11 to 1.32; the panel 0.96 to 1.39; the select's seat 1.04 to 1.17. Medians 0.78, 0.60, 0.07, 0.19. Budget 1 ms. WebKit, frame pacing on the line: 23 to 25 frames in 260 ms, the longest interval 21 ms, none over 25 ms. |
| **C-20** a tap in Safari | **Taken**, by C-5's writer. The wave names it, where it is installed and by whom, and G-REST's grep covers it. | A tap at 390 coarse with the writer, Chromium: `scale` 0.97, plate 1, and no plate after. WebKit: `scale` 0.971, plate 0.999 (0.095, 0.690, 0.938, 0.998 on the way up), and no plate after. Without the writer WebKit painted nothing (PROTOTYPE). |
| **C-21** the check passes a cut given two frames | **Taken.** The absolute clause is in `judgeChange`. | Both engines: the 20 ms leg fails (0.834 of travel, 3 samples) and the 34 ms leg fails (0.490, 4 samples); the plate, the nudge, the grow, the draw and the pair pass. In WebKit the 20 ms leg is still caught as a cut with no animation, because the sampler misses an animation that short; the 34 ms leg is caught by the new clause. |

## PROTOTYPE's ten failures

The challenge let them stand. The wave now answers each.

| # | failure | disposition |
|---|---|---|
| 1 | leaving a breath | cured by striking the breath (C-1) |
| 2 | G-NEST | cured (C-4) |
| 3 | follow with a swap inside the box | cured in mechanism: `<Presence swap>`'s seat follows at the hand-over. Chromium: the trigger grows 102.9 to 192.3 px over 0.24 s and its neighbour never moves more than 8.2 px in a frame, where it jumped 89. WebKit: 102.95 to 192.45 px, largest move 10.2 px in a frame. Held with follow on cost |
| 4 | a tap in WebKit paints no press plate | cured by the writer (C-20) |
| 5 | a swap toggled back at 60 ms | cured for pairs (C-7). `<Presence swap>` still cannot turn round, and the wave keeps it for content that does not toggle |
| 6 | under reduced motion: the flip, the press, follow's content | the press is tone alone now. The flip and follow's content are **open** in the wave |
| 7 | G-COST's layout clause | cured for the press and the pair by a resting value (0 layouts read). **Open** for a node Vue inserts |
| 8 | Chromium keeps the hover legs on the main thread | 25 recalculations to 14 to 15 (C-17). Still not zero: the plate's two legs are 14 by the challenge's own table |
| 9 | the gates' own instruments | G-CLOCK's command is rewritten and read (it prints only the `0s` legs); G-BARE is split (C-12); the step clause has its absolute half (C-21) |
| 10 | the plate's strength | the owner's, with no default (C-12) |

## Not measured

- Shipping Safari, and WebKit's layout, style and paint.
- The real Button, SelectTrigger, tab strip, accordion, CommandDialog and every other census row. The one real component read is `LabeledField`.
- Rows that fade inside a followed list; a popover with wrapped text; the busy ring; the plate in dark at the three strengths; a shaped plate's paint.
- Reduced motion after the amendments. The reduced rows of the patch are unchanged from PROTOTYPE's reading, and the press's `scale: none` under reduce is unread.
- G-BYTES's boot-graph clause and G-EXPORT's consumer install, as before.

## What the orchestrator is asked to do

1. Put OWNER-READ's five questions to the owner. Question 2 has no default; the plate's sites wait on it.
2. Take a quiet machine's reading of the three size pieces on the real components before any of them is built into a release.
3. Rule on the two failures the wave lists as open and that no reading here cures: one layout at the end of a plain arrival, and the chevron's flip under reduced motion.
4. Amend W-R.1 §2.3 for the writer of `data-press`, and tell atlas, value.js, keyframes and speedtest what the consumer half now says.

Nothing listens on 5371 to 5376, and the worktree is left in place.
