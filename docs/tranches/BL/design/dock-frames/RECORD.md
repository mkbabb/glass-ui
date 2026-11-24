# Dock frames: the O-420 record

Recorded 2026-11-23 by a workflow seat (claude-opus-5-5). This file records the frames; it roots nothing. Rooting is the next seat.

The owner, 2026-11-23 10:42, on fourier.babb.dev's top dock (at a desk, light, the dock open, the theme seat at the right end hovered, its tooltip "Switch to dark mode" drawn at the far left of the screen):

> the dock needs a bit of refinement in animations at the begin and end--it should not shift around in flow of the page horizontally in animation, too; hovering the darkmode toggle or toggling it should not shift it around; the last few frames of the collapse animation shift and are buggy--communicate this with all docks in a design study, too

Every number names its engine. **Chromium** is Playwright's headless shell 149.0.7827.55, launched with `--use-angle=metal --enable-gpu-rasterization`. **WebKit** is Playwright 1.61.1's WebKit build 2311 (it reports 26.5), which is not Safari. Chromium ran its frames at a median of 8.3 ms, and WebKit at 17 ms. A box is `getBoundingClientRect` read once per rendered frame. Boxes do not depend on backdrop blur, which the headless shell does not draw off the GPU lane.

## What reproduces

Each row gives the verdict, where it shows and how much. "11.1.0" means glass at v11.1.0, which fourier, keyframes and color serve and glass.babb.dev's dock source matches. "wi8" means `bl/dock/wi8` at d48c19ec8.

| item | reproduces | where | how much | release |
| --- | --- | --- | --- | --- |
| 1. rough first and last frames | Yes, on every 11.1.0 dock. wi8 has a different fault. | Every 11.1.0 dock, both engines, both widths, both schemes, every route. | Open: the seats go from opacity 0 to 1 in frame 1. Close: the seal does the same. The first step is a fixed 32.8 px at 1440 (12.6 px at 390), whatever the frame's length. A long frame (25 to 82 ms) lands in the close's first three frames in 1 to 5 of every 2 to 4 closes at 1440, in both engines. Last steps are smooth (0.35 to 2.4 px). wi8 has no pop and eases in, but its last frame snaps 0.5 to 0.66 px against the direction of travel after a 2 px overshoot. | 11.1.2. wi8's end snap is a hard cell of the 11.2.0 measure. |
| 2. sideways drift | The plate: no on 11.1.0 and wi8; yes on daraksha (11.0.2). The content: yes. | All sites, both engines. | 11.1.0 plate centres hold to 0.01 to 0.23 px. daraksha's plate centre moves 58.95 px (left edge 180.1 px, right 62.2 px at 1440). On every 11.1.0 open and close the seats and seal slide 2.4 to 4 px; color's seats 31.6 px; glass's bottom dock 49.6 to 50.5 px. wi8's seats and seal slide 145 to 168 px at 1440. On every open the dock's layout box jumps to its open width in one frame. WebKit only: the start-aligned dock at wi8 jumps its left edge 15.3 px in the open's first frame. | 11.1.2 (the content drift and the one-frame layout box). daraksha's plate drift is at its 11.0.2 pin; no 11.1.0 dock shows it. wi8's seat slide and WebKit edge jump are hard cells of 11.2.0. |
| 3. the theme seat on hover and press | Hover: no. Press: yes. | fourier.babb.dev, both engines, both widths; the repro at v11.1.0 and wi8. | Hover: 0 px, no frame changed, in both engines on every site. Press: every seat on fourier moves 4 px left in one frame, 75 to 134 ms after the press, and stays there; the plate holds. Repro at v11.1.0: 4 px at 1440, 12 to 14 px at 390. wi8: 0 px at 1440, 16 px at 390. | 11.1.2. wi8's 390 jump is a hard cell of 11.2.0. |
| 4. the collapse's last frames jump | Yes, on 11.1.0. | fourier.babb.dev at 1440, the harness page, glass's bottom dock; both engines. | 280 to 300 ms after the close looks finished, one settle frame (483 to 571 ms after the close began) drops the dock's layout width and moves the visible seal: fourier at 1440 +2.52 px (Chromium) and +4.01 px (WebKit); the harness page −4.9 px. Through that pause `--dock-t` creeps from 1.002 back to 1.00002. wi8 has no settle frame, but it ends with a 0.53 to 0.66 px snap. | 11.1.2. wi8's snap is a hard cell of 11.2.0. |
| 5. the theme seat's tooltip at the screen's left edge | Not in the record. | fourier's theme seat has a native `title`, which no headless engine draws. No DOM tooltip came within 12 px of the left edge in any frame of any cell. | One related fault, WebKit only, on keyframes at 1440: the collapsed face's tooltip stays open through a hover open, then jumps 142 to 145 px left to the open dock's left end, where the hidden seal rests. | The theme seat's tooltip needs a reading in real Safari before it can be placed. keyframes' tooltip jump is 11.1.2. |


## The five items

### 1. Rough first and last frames of open and close

**11.1.0** covers fourier.babb.dev, the fourier repro, the harness dock page, glass.babb.dev, keyframes and color.

- **The first frame pops (Chromium, every cell, every route).**
  - The first frame of every open takes the run, which holds the seats, from opacity 0 to 1 in one frame.
  - The first frame of every close takes the seal from opacity 0 to 1 in one frame.
- **The width curve starts at full speed.**
  - fourier at 1440: the first step is 32.8 px in 8.3 ms, 0.7 to 0.9 times the median of the next three steps. There is no ease-in.
  - fourier at 390: 12.6 px.
- **A long frame often falls in a close's second or third frame** (Chromium, 1440). It lasts 25 to 75 ms and gives one step of 47 to 213 px of plate width.

  | where (1440) | closes hit, per scheme | the long frames and their steps |
  | --- | --- | --- |
  | fourier | 1 of 3 | 25 ms and 118 px (dark); 34 ms and 164 px (light) |
  | the repro at v11.1.0 | 3 of 4 | 25 to 42 ms; up to 213 px |
  | color | 2 of 3 | 25 and 33 ms; 77 and 106 px |
  | keyframes | 1 of 3 or 4 | 25 ms; 47 to 48 px |
  | daraksha | 2 of 2 (dark), 1 of 2 (light) | 75 ms and 137 px; 33 ms and 51 to 60 px |

  Opens hit it less often. keyframes at 1440 light hit it in 3 of 4 opens (41 to 42 ms frames, steps up to 86 px), and fourier at 1440 dark in 1 of 4 (25 ms, 118 px). At 390 it is rarer: fourier dark hit it in 1 of 2 closes (25 ms) and keyframes dark in 2 of 2 (27 and 42 ms). No other 390 close hit it.
- **The last steps are smooth.**
  - At 1440 the last step is about 0.9 px; at 390, about 0.35 px. Each is 0.5 to 0.6 times the median of the three steps before it.
  - A morph takes 258 to 292 ms; one keyframes close at 390 took 550 ms. daraksha (11.0.2) takes 550 ms.

**wi8** (bl/dock/wi8 at d48c19ec8, the repro and the harness page):

- **No opacity pop.** The run and the seal fade by at most 0.1 per frame.
- **An ease-in start.** The first step is 2 to 11 px, 0.2 to 0.4 times the median of the next three.
- **A long first frame after load.** The repro's first open at 1440 starts with a 50 ms frame and a 106.6 px step, in both schemes.
- **The last frame snaps against the direction of travel.**
  - In the repro, after a 2 px overshoot, the last frame snaps 0.5 to 0.53 px, 5 to 9 times the median of the three steps before it.
  - On the harness page the snap is 0.25 px, and the close's last step comes 100 ms after the frame before it.
- **Duration.** 441 ms at 1440 and 400 ms at 390.

**WebKit** shows the same faults, with more long frames.

- **The same pop.** On 11.1.0 the run (on open) and the seal (on close) go from opacity 0 to 1 in the first frame, in every cell.
- **The first step is a fixed distance in both engines, whatever the frame's length.**
  - On fourier at 1440 it is 32.8 to 32.9 px, whether the first frame took 8 ms (Chromium) or 16 to 32 ms (WebKit). At 390 it is 12.6 px.
  - In WebKit the next three steps each cover 17 ms, so the first step is 0.4 times their median.
- **More long frames at the close's start.**
  - fourier at 1440: 2 of 3 closes, with 26 to 32 ms frames.
  - The repro at 1440: 4 to 5 long frames over 4 closes, 26 to 50 ms. One 50 ms frame steps 258 px.
  - glass.babb.dev's sidebar: 6 to 7 long frames over 3 to 4 closes, 31 to 82 ms. One 82 ms frame steps 363 px. Its opens took up to 686 ms, one with an 88 ms first frame.
- **Last steps.** 0.06 to 2.4 px; on fourier at 1440 that is 2.2 px at WebKit's 17 ms frames. Each is 0.1 to 0.5 times the median of the three steps before it.
- **Durations.** 265 to 301 ms on 11.1.0, and 564 to 601 ms on daraksha.
- **wi8** (WebKit):
  - no pop;
  - the last frame snaps 0.5 to 0.66 px against the direction of travel, 2.4 to 4.7 times the median of the three steps before it;
  - durations of 415 to 501 ms;
  - the repro's first open after load at 1440 has a 47 to 58 ms frame.

### 2. The plate drifts sideways while it animates

**The plate holds its centre on 11.1.0 and wi8.**

- Over every open and close on every centred horizontal dock (fourier, the repro in both trees, keyframes, color, glass's bottom dock), the plate's centre moves 0.01 to 0.18 px (Chromium). The edges travel together: on fourier at 1440, the left edge moves 327.7 px and the right 327.6 px.

**The content does drift.**

- **11.1.0.** Every seat's centre and the seal's centre move 3.8 to 3.9 px sideways over every open and close: on fourier, the repro, keyframes and color.
  - color's seats move 31.6 px on open.
  - glass.babb.dev's bottom dock at 390 opens from a 269 px summary. Its seats move 49.6 px on open and 48.6 px on close, and its seal moves 4 px.
- **wi8.** The seats ride the plate's edge while they fade.
  - The seats move up to 166.9 px on open at 1440 and 76.5 px at 390.
  - The seal moves up to 168.4 px on close at 1440 and 76.6 px at 390.
- **daraksha (11.0.2).** The plate itself drifts.

  | | 1440 | 390 |
  | --- | --- | --- |
  | plate centre | 58.95 px | 58.95 px |
  | left edge | 180.1 px | 154.6 px |
  | right edge | 62.2 px | 36.7 px |
  | seats, open / close | 68.9 / 51.8 px | 71.5 / 57.6 px |
  | seal, close / open | 50 / 51.5 px | 55.6 / 57.3 px |

**The dock's layout box changes in one frame.** This is its computed width, read before the `scale`.

- It changes at the first frame of every open, on 11.1.0 and on wi8. On fourier at 1440 it goes from 56.69 to 712 px.
- On 11.1.0 the close keeps the open width through the whole motion and drops it in the settle frame (item 4). On wi8 it drops at the close's first frame. daraksha changes it over two frames.
- Anything beside the dock in the page's flow moves by that change in one frame. The record tracked only the dock.

**Docks anchored by design:**

- **glass.babb.dev's sidebar** (vertical, 1440). Its top edge is fixed and its bottom edge travels 595 px. Across the axis it moves 3 px in x as its width goes from 58 to 64 px, so it stays centred.
- **The harness dock page.** The dock sits start-aligned in its cell: the left edge is fixed and the right edge travels 175 px. At v11.1.0 the seal moves 13.8 px on open.

**WebKit** reads the same.

- **Plate centres.**
  - On the centred docks the plate's centre moves 0.01 to 0.23 px.
  - On daraksha it moves 58.95 px, with the same edge travel as in Chromium.
- **Content drift.**
  - 11.1.0: the seats move 2.4 to 4 px and the seal 3.7 to 3.9 px.
  - color's seats move 31.4 px on open.
  - glass's bottom dock: the seats move 50.5 px on open.
  - wi8: the seats move 144.6 to 161.2 px at 1440 and 68 to 72 px at 390.
- **One drift only WebKit shows.** On the harness page at wi8 the dock is start-aligned. In the open's first frame its plate's left edge jumps 15.3 px left, as the layout width jumps from 56 to 231 px. The edge then slides back over 14 frames (233 ms). In Chromium it does not move.

### 3. Hovering or pressing the theme seat moves the dock or the seat

**Hover.** In Chromium no frame changed, on hover in or out, on:

- fourier;
- the repro (both trees);
- keyframes;
- daraksha;
- glass's sidebar.

The theme seat's box, its glyph's box and the plate held still to 0 px.

**Press**, where the scheme toggles:

- **fourier.babb.dev** (Chromium). After the press:
  - every seat in the dock moves 4 px left in one frame, with the theme seat and its glyph;
  - it comes 75 ms after the press at 1440, and 117 to 125 ms after at 390;
  - the plate holds still.

  The seats stay 4 px left: pressing back moves them at most 0.21 px.
- **The repro at v11.1.0** reproduces it: 58 to 59 ms after the press at 1440, and 75 to 83 ms after at 390.

  | | 1440 | 390 |
  | --- | --- | --- |
  | the repro at v11.1.0 | 4 px | 14 px |
  | the repro at wi8 | 0 px | 16 px (117 ms after the press) |

- **The other sites:**

  | | 1440 | 390 |
  | --- | --- | --- |
  | keyframes | 0 px | at most 0.89 px |
  | daraksha | 0 px | at most 0.3 px |
  | glass's sidebar | 0 px | not reached |

The whole row moves in one frame while the plate holds. gaggle's report (`inbound/gaggle-report-dock-1123/README.md`, its row G1) measured the same one-frame jump on its own dock with the run's `scrollLeft`: the run's port overflows by 7 px, and the run scrolls by that much when a press moves focus. This sampler did not read `scrollLeft` or focus.

**WebKit.**

- **Hover.** No frame changed on any site.
- **Press, fourier.** Every seat moves 4 px left in one frame, 100 to 134 ms after the press. This holds at 1440 in both schemes and at 390 light. At 390 dark the tap moved nothing.
- **Press, the repro.**
  - At v11.1.0: 4 px at 1440 (100 to 132 ms after the press) and 12 px at 390 (74 to 84 ms).
  - At wi8: 0 px at 1440 and 16 px at 390.
- **Press, the other sites.** keyframes, daraksha and glass's sidebar move at most 0.26 px.

### 4. The collapse's last frames jump

**11.1.0.** The visible close ends smoothly.

- On fourier at 1440 the plate's last six widths are 65.64, 63.2, 60.85, 59.21, 58.04 and 57 px.
- Then nothing visible moves for 280 to 300 ms. Through that time the spring is past its target:
  - `--dock-t` ends the visible motion at 1.0020 to 1.0030;
  - it creeps back to 1.00002;
  - the dock keeps its open layout width (712 px on fourier) and its `scale` (0.08 on fourier at 1440).
- Then the morph ends in one settle frame, 483 to 571 ms after the close began (Chromium). In that frame:
  - `--dock-t` goes to 0;
  - the `scale` is removed;
  - the dock's layout width drops from the open width to the collapsed width;
  - the seal moves from where the morph drew it to its rest place.

| where | layout width in the settle frame | plate | seal (opacity 1, visible) | seats (opacity 0, unseen) |
| --- | --- | --- | --- | --- |
| fourier at 1440 | 712 to 56.69 px | x +0.16 px, width −0.31 px | +2.52 px | 320 px |
| the harness page | 231 to 56 px | – | −4.92 px | 1 px |
| glass.babb.dev's bottom dock at 390 | 382 to 269.38 px | x −0.19 px, width +0.38 px | −0.24 px | 2.6 px |
| glass.babb.dev's sidebar at 1440 | – (its cross-axis width went from 64 to 58 px during the close) | 0 | 0 | 12 px |
| the repro, keyframes, color, fourier at 390 | – | 0 | 0.02 px | 84 to 328 px |

Opens have a settle frame as well, 533 to 850 ms after the open began. On fourier at 1440 the plate's width grows 0.44 px (712 to 712.44 px) and the seats move −0.22 px. On color the width grows 0.19 px and the seats move −0.09 px. On the other docks the open's settle frame moves nothing visible.

**wi8** has no separate settle frame. The close undershoots and creeps back.

- In the repro at 1440, the last six widths are 55.03, 55.16, 55.25, 55.38 and 55.47 px, and then 56 px. The last frame is a 0.53 px snap.
- With that snap the seal's centre jumps 0.28 px (720.28 to 720). At 390 the width goes from 59.47 to 60 px and the seal from 195.26 to 195.

**daraksha (11.0.2)** has no settle frame. Its seal creeps 0.1 to 0.7 px a frame into place.

**WebKit** (11.1.0). The settle frame lands 501 to 541 ms after the close began (432 to 468 ms on glass's sidebar).

- **fourier at 1440:** the plate's x +0.16 px and width −0.31 px; the visible seal jumps **+4.01 px** (Chromium: +2.52 px).
- **The harness page:** the seal jumps −4.91 px at 1440 and −4.92 px at 390.
- **glass's bottom dock at 390:** the plate's x +0.24 px and width −0.48 px; the seal +0.24 px.
- **Elsewhere:** the seal does not move.

**wi8** (WebKit). The last frame snaps 0.62 to 0.66 px at 1440 (55.34 to 56 px), and the seal moves 0.32 px with it. At 390 the snap is 0.53 px (59.47 to 60 px), with the seal moving 0.26 px.

### 5. The theme seat's tooltip anchors at the screen's left edge

**On fourier it does not reproduce in the record.**

- fourier's theme seat has no DOM tooltip. Its tooltip is the browser's native `title`, "Switch to dark mode". Neither headless engine draws a native tooltip, so there is no box for it.
- No DOM tooltip appeared on fourier in any frame.

**Glass tooltips on the other sites sit on their seats.**

- **keyframes.** On its theme seat the glass tooltip is centred on the seat (−0.1 to −0.05 px off its centre), with a 4 px gap. It sits above the seat at 1440, and below at 390 touch, where the press opens it.
- **daraksha.** The theme seat's tooltip sits 0 px off centre with a 3.8 px gap.
- **glass's sidebar.** Seat tooltips stand 10 px to the side, −0.15 px off centre. The demo's theme seat has no tooltip.

**The edge scan** (`tools/edge-scan.mjs`) found no frame in any cell with a tooltip or popper box within 12 px of the screen's left edge. The scan covers every frame.

**WebKit.** fourier shows no DOM tooltip in WebKit either. One tooltip fault shows only in WebKit, on keyframes at 1440, in both schemes and in all three hover opens of each:

- The pointer rests on the collapsed dock, and the collapsed face's tooltip opens. It stays open after the dock opens.
- The open's settle frame comes 550 ms after the plate began to move, when `data-morphing` clears. In that frame the seal's box moves to its rest place at the open plate's left end (559, 43.3, 40, 40, at opacity 0).
- One frame later (17 ms) the tooltip follows it, jumping **142 to 145 px left and 8 px up**.
- It stays there through the theme press and the scroll route, 49.7 px off the first seat's centre.

It is not at the screen's edge. It is a visible tooltip anchored to an invisible element at the open dock's left end. Chromium never opened that tooltip.

**The other WebKit tooltips sit on their seats:**

- keyframes at 390, on taps: −0.1 to −0.39 px off centre, with a 3.9 px gap;
- daraksha's theme seat: 0 px off centre, with a 3.8 px gap;
- glass's sidebar seats: −0.16 px off centre, with a 10 px gap.

The edge scan found no WebKit frame with a tooltip within 12 px of the left edge.


## Tables, per cell, both engines

`node tools/tables.mjs` prints these tables from `record/items.json`. In every cell, Chromium's row comes before WebKit's.

How to read them:

- "@" gives the frame interval in ms; for example, "32.8@8.3" is a 32.8 px step over an 8.3 ms frame.
- "x" compares a step with the median of its three neighbours: the next three for a first step, the three before for a last step.
- A dash means the cell had no such motion.

### Item 1 table: first and last frames (px of plate width per step, @ the frame interval in ms)

| where | engine | cell | open: 1st step, 2nd step | open: run opacity in frame 1 | close: 1st step, 2nd step | close: seal opacity in frame 1 | long frames in the first 3 (open / close) | last step open / close (x the 3 before) | duration open / close ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fourier.babb.dev | Chromium | 390 touch dark | 12.6@8.1, 29.1@17; 12.6@8.3, 28.3@16.6; 12.6@8.3, 13.1@8.4 | 0 → 1 | -12.6@7.2, -45.8@25.2; -12.6@7.6, -29.9@17.4 | 0 → 1 | 0/3 / 1/2 (25 ms) | 0.35 (x0.5); 0.36 (x0.6) / -0.4 (x0.6); -0.31 (x0.5) | 258–258 / 258–265 |
| fourier.babb.dev | Chromium | 390 touch light | 12.6@8.4, 27@15.9; 12.6@8.4, 12.9@8.3; 12.6@8.3, 28.5@16.7 | 0 → 1 | -12.6@8.2, -28.7@16.8; -12.6@9.3, -28.1@16.5 | 0 → 1 | 0/3 / 0/2 | 0.35 (x0.6); 0.36 (x0.6) / -0.33 (x0.6); -0.35 (x0.6) | 258–258 / 258–259 |
| fourier.babb.dev | Chromium | 1440 dark | 32.8@8.4, 33.4@8.3; 32.8@8.2, 30.3@7.6; 32.8@25.1, 117.6@25 | 0 → 1 | -33@8.4, -73.9@16.7; -33@8.4, -117@24.9; -33@8.3, -118.1@25.1 | 0 → 1 | 1/4 (25 ms) / 1/3 (25 ms) | 0.91 (x0.5); 0.91 (x0.6) / -0.9 (x0.5); -0.9 (x0.6) | 258–275 / 258–267 |
| fourier.babb.dev | Chromium | 1440 light | 32.8@8.9, 29.9@7.5; 32.8@8.4, 33.4@8.3; 32.8@8.3, 73.4@16.6 | 0 → 1 | -33@8.5, -69.3@15.8; -33@8.3, -117.6@25; -33@8, -163.9@33.5 | 0 → 1 | 0/4 / 1/3 (34 ms) | 0.95 (x0.6); 0.97 (x0.6) / -1.04 (x0.6); -1 (x0.6) | 258–265 / 258–258 |
| fourier.babb.dev | WebKit | 390 touch dark | 12.6@18, 27.2@16; 12.6@18, 25.2@15 | 0 → 1 | -12.6@27, -14.1@9; -12.6@32, -14.1@9 | 0 → 1 | 0/3 / 2/2 (27, 32 ms) | 0.06 (x0); 0.92 (x0.4) / -0.44 (x0.2); -0.67 (x0.4) | 268–284 / 283–285 |
| fourier.babb.dev | WebKit | 390 touch light | 12.6@27, 21.4@13; 12.6@15, 31.1@18; 12.6@17, 29.1@17 | 0 → 1 | -12.6@31, -14.1@9; -12.6@22, -17.7@11 | 0 → 1 | 1/3 (27 ms) / 1/2 (31 ms) | 0.49 (x0.3); 0.8 (x0.3) / -0.67 (x0.3); -0.23 (x0.1) | 265–283 / 283–284 |
| fourier.babb.dev | WebKit | 1440 dark | 32.9@18, 75.5@17; 32.9@16, 75.5@17; 32.9@17, 75.5@17; 32.9@22, 50.7@12 | 0 → 1 | -32.8@31, -85.8@19; -32.8@26, -80.7@18; -32.8@23, -80.7@18 | 0 → 1 | 0/4 / 2/3 (31, 26 ms) | 2.39 (x0.4); 2.25 (x0.4) / -1.74 (x0.3); -0.86 (x0.2) | 267–284 / 282–284 |
| fourier.babb.dev | WebKit | 1440 light | 32.9@18, 75.5@17; 32.9@20, 60.4@14; 32.9@17, 75.5@17; 32.9@23, 50.7@12 | 0 → 1 | -32.8@32, -50.7@12; -32.8@29, -101.6@22; -32.8@19, -75.5@17 | 0 → 1 | 0/4 / 2/3 (32, 29 ms) | 2.21 (x0.3); 0.25 (x0.1) / -2.07 (x0.3); -1.14 (x0.2) | 267–284 / 282–283 |
| fourier repro v11.1.0 | Chromium | 390 touch dark | 15.4@8.3, 16@8.4; 15.4@8.3, 15.8@8.3; 15.4@8.4, 15.8@8.3 | 0 → 1 | -15.4@8.3, -33.5@16.1; -15.4@8.3, -16@8.4; -15.4@8.3, -15.8@8.3 | 0 → 1 | 0/3 / 0/3 | 0.41 (x0.6); 0.43 (x0.5) / -0.43 (x0.5); -0.42 (x0.6) | 258–267 / 258–258 |
| fourier repro v11.1.0 | Chromium | 390 touch light | 15.4@8.3, 15.8@8.3; 15.4@8.3, 16@8.4; 15.4@8.9, 15.6@8.2 | 0 → 1 | -15.4@8.4, -15.8@8.3; -15.4@8.3, -16@8.4; -15.4@8.3, -35@16.7 | 0 → 1 | 0/3 / 0/3 | 0.48 (x0.6); 0.43 (x0.5) / -0.43 (x0.5); -0.43 (x0.6) | 258–267 / 258–258 |
| fourier repro wi8 | Chromium | 390 touch dark | 4.3@8.3, 10.4@7.9; 4.9@9, 10.4@7.6; 4.2@8.2, 11@8.3 | 0 → 0 | -4.3@8.3, -11.1@8.3; -3.4@7.4, -11.4@8.9; -4.8@8.8, -11.2@8.2 | 0 → 0 | 0/3 / 0/3 | -0.5 (x8.3) against -0.5 / 0.53 (x8.8) against 0.53; 0.5 (x8.3) against 0.5 | 400–400 / 395–401 |
| fourier repro wi8 | Chromium | 390 touch light | 4.1@8.1, 10.8@8.2; 3.9@7.9, 11.4@8.7; 4.3@8.4, 10.3@7.8 | 0 → 0 | -4.3@8.4, -11.1@8.3; -4@8, -11.5@8.7; -4.5@8.6, -12.3@8.9 | 0 → 0 | 0/3 / 0/3 | -0.5 (x8.3) against -0.5 / 0.5 (x8.3) against 0.5 | 400–401 / 400–401 |
| fourier repro v11.1.0 | Chromium | 1440 dark | 33.3@8.3, 33.8@8.2; 33.3@8, 35.6@8.6 | 0 → 1 | -33.4@8.4, -75.2@16.6; -33.4@7.6, -124.3@25.7; -33.4@8.1, -122.1@25.3; -33.4@8.3, -213.2@41.6 | 0 → 1 | 0/4 / 3/4 (26, 25, 42 ms) | 0.94 (x0.6); 0.54 (x0.4) / -0.94 (x0.6); -0.81 (x0.5) | 258–260 / 258–262 |
| fourier repro v11.1.0 | Chromium | 1440 light | 33.3@8, 36.1@8.7; 33.3@8.2, 34.7@8.4; 33.3@8.3, 75.2@16.6; 33.3@8.3, 34.7@8.4 | 0 → 1 | -33.4@7.4, -171.9@34.2; -33.4@7.6, -123.7@25.6; -33.4@8.3, -34.7@8.4; -33.4@9.2, -213.2@41.6 | 0 → 1 | 0/4 / 3/4 (34, 26, 42 ms) | 0.88 (x0.5); 1.01 (x0.6) / -0.91 (x0.6); -0.88 (x0.5) | 257–258 / 258–267 |
| fourier repro wi8 | Chromium | 1440 dark | 106.6@50, 45@8.4; 8.7@8.1, 23.2@8.2; 9.1@8.3, 24.2@8.4; 8.1@7.8, 24.8@8.8 | 0 → 0 | -9.1@8.3, -23.8@8.3; -9.1@8.3, -21.4@7.6; -9.3@8.4, -24@8.3 | 0 → 0 | 1/4 (50 ms) / 0/4 | -0.53 (x5.3) against -0.53 / 0.53 (x5.9) against 0.53; 0.53 (x5.3) against 0.53 | 442–458 / 442–442 |
| fourier repro wi8 | Chromium | 1440 light | 106.6@49.7, 44.4@8.3; 10.2@8.8, 24.9@8.4; 11.1@9.2, 25.5@8.4; 11.1@9.2, 24@8 | 0 → 0 | -9.1@8.3, -27.5@9.3; -8.1@7.8, -24.5@8.7; -7.7@7.6, -25.6@9.1; -9.1@8.3, -23.1@8.1 | 0 → 0 | 1/4 (50 ms) / 0/4 | -0.53 (x5.9) against -0.53; -0.53 (x5.3) against -0.53 / 0.53 (x5.3) against 0.53; 0.53 (x5.9) against 0.53 | 441–459 / 441–443 |
| fourier repro v11.1.0 | WebKit | 390 touch dark | 15.4@21, 35.7@17; 15.4@17, 33.3@16; 15.4@16, 30.9@15 | 0 → 1 | -15.4@28, -43@20; -15.4@33, -23.9@12; -15.4@17, -78.9@34 | 0 → 1 | 0/3 / 3/3 (28, 33, 34 ms) | 0.23 (x0.1); 0.98 (x0.3) / -0.75 (x0.3); -0.98 (x0.3) | 267–283 / 268–284 |
| fourier repro v11.1.0 | WebKit | 390 touch light | 15.4@24, 38.1@18; 15.4@26, 30.9@15; 15.4@17, 35.7@17 | 0 → 1 | -15.4@27, -23.9@12; -15.4@25, -23.9@12; -15.4@16, -97@41 | 0 → 1 | 1/3 (26 ms) / 2/3 (27, 41 ms) | 0.47 (x0.2); 0.54 (x0.2) / -0.54 (x0.2); -0.41 (x0.2) | 267–283 / 281–284 |
| fourier repro wi8 | WebKit | 390 touch dark | 16@17, 33.5@16; 11.3@14, 33.5@17; 16@17, 35.9@17 | 0 → 0 | -9.8@13, -34.9@18; -16@17, -35.9@17; -14.3@16, -35.2@17 | 0 → 0 | 0/3 / 0/3 | -0.5 (x4.2) against -0.5; -0.53 (x4.4) against -0.53 / 0.53 (x4.4) against 0.53; 0.5 (x4.2) against 0.5 | 415–418 / 415–417 |
| fourier repro wi8 | WebKit | 390 touch light | 14.3@16, 32.8@16; 14.3@16, 35.2@17 | 0 → 0 | -7.2@11, -30.6@17; -16@17, -35.9@17; -14.3@16, -32.8@16 | 0 → 0 | 0/3 / 0/3 | -0.5 (x3.9) against -0.5; -0.5 (x4.2) against -0.5 / 0.53 (x4.4) against 0.53; 0.5 (x4.2) against 0.5 | 415–419 / 416–418 |
| fourier repro v11.1.0 | WebKit | 1440 dark | 33.2@27, 77@17; 33.2@20, 56.6@13; 33.2@18, 114.6@24; 33.2@17, 71.8@16 | 0 → 1 | -32.8@33, -125.6@26; -32.8@49, -92.9@20; -32.8@34, -87.5@19; -32.8@17, -258.1@50 | 0 → 1 | 1/4 (27 ms) / 5/4 (33, 26, 49, 34, 50 ms) | 1.16 (x0.2); 0.26 (x0.1) / -2.29 (x0.3); -1.61 (x0.2) | 267–284 / 283–299 |
| fourier repro v11.1.0 | WebKit | 1440 light | 33.2@17, 77@17; 33.2@21, 66.7@15; 33.2@16, 82.2@18; 33.2@24, 56.6@13 | 0 → 1 | -32.8@45, -103.7@22; -32.8@33, -71.8@16; -32.8@41, -87.5@19; -32.8@17, -247.5@48 | 0 → 1 | 0/4 / 4/4 (45, 33, 41, 48 ms) | 0.15 (x0); 0.62 (x0.1) / -1.31 (x0.3); -2.29 (x0.3) | 267–284 / 267–300 |
| fourier repro wi8 | WebKit | 1440 dark | 4.9@6, 37@13; 30.9@16, 81@18; 34.4@17, 77.5@17; 34.4@17, 72.3@16 | 0 → 0 | -34.4@17, -82.8@18; -34.4@17, -77.5@17; -30.9@16, -75.8@17 | 0 → 0 | 1/4 (47 ms) / 0/4 | -0.59 (x2.4) against -0.59; -0.62 (x2.5) against -0.62 / 0.66 (x2.6) against 0.66; 0.62 (x2.8) against 0.62 | 450–483 / 450–451 |
| fourier repro wi8 | WebKit | 1440 light | 10.7@9, 39.3@12; 30.9@16, 75.8@17; 34.4@17, 67.2@15 | 0 → 0 | -30.9@16, -75.8@17; -30.9@16, -70.7@16; -50@21, -51.6@11 | 0 → 0 | 1/4 (58 ms) / 0/4 | -0.53 (x2.5) against -0.32,-0.53; -0.65 (x2.6) against -0.65 / 0.62 (x2.5) against 0.62; 0.66 (x2.4) against 0.66 | 449–501 / 449–451 |
| harness dock page v11.1.0 | Chromium | 1440 dark | 8.7@9.2, 7@6.7; 8.7@8, 9.4@8.7; 8.7@8.4, 8.9@8.3 | 0 → 1 | -8.7@8.2, -9.1@8.4; -8.7@8.8, -8.9@8.3 | 0 → 1 | 0/3 / 0/2 | 0.25 (x0.5); 0.28 (x0.7) / -0.24 (x0.5); -0.25 (x0.5) | 258–259 / 258–259 |
| harness dock page v11.1.0 | Chromium | 1440 light | 8.7@8.9, 8.8@8.2; 8.7@7.7, 9.9@9.1; 8.7@8.3, 8.9@8.3 | 0 → 1 | -8.7@8.3, -7@6.7; -8.7@10, -8.8@8.2 | 0 → 1 | 0/3 / 0/2 | 0.22 (x0.5); 0.23 (x0.5) / -0.24 (x0.5); -0.25 (x0.6) | 258–267 / 260–267 |
| harness dock page wi8 | Chromium | 1440 dark | 2.4@8.3, 6.3@8.4; 2.5@8.4, 5.3@7.2; 2.4@8.3, 6.3@8.3 | 0 → 0 | -2.3@8.1, -5.2@7.2; -3@9.4, -7@8.7 | 0 → 0 | 0/3 / 0/2 | -0.25 (x5); -0.25 (x4.2) / 0.25 (x3.1); 0.25 (x2.5) | 408–408 / 409–410 |
| harness dock page wi8 | Chromium | 1440 light | 2@7.5, 6.8@9.3; 1.8@7.2, 6.3@8.8; 2.8@9.1, 6.7@8.4 | 0 → 0 | -2.5@8.4, -6.3@8.3; -3.3@9.8, -6.8@8.3 | 0 → 0 | 0/3 / 0/2 | -0.25 (x5); -0.25 (x3.6) / 0.25 (x2.3); 0.25 (x1.8) | 408–408 / 409–409 |
| harness dock page v11.1.0 | WebKit | 390 touch dark | 9.3@16, 21.5@17 | 0 → 1 | -9.3@17, -21.5@17 | 0 → 1 | 0/1 / 0/1 | 0.59 (x0.3) / -0.64 (x0.4) | 266–266 / 267–267 |
| harness dock page v11.1.0 | WebKit | 390 touch light | 9.3@16, 24.5@19 | 0 → 1 | -9.3@22, -14.4@12 | 0 → 1 | 0/1 / 0/1 | 0.59 (x0.3) / -0.14 (x0.1) | 266–266 / 284–284 |
| harness dock page v11.1.0 | WebKit | 1440 dark | 8.7@20, 17.4@15; 8.7@17, 18.8@16; 8.7@17, 20.1@17 | 0 → 1 | -8.7@17, -20.1@17; -8.7@23, -11@10 | 0 → 1 | 0/3 / 0/2 | 0.07 (x0.1); 0.59 (x0.3) / -0.55 (x0.4); -0.16 (x0.1) | 267–284 / 268–283 |
| harness dock page v11.1.0 | WebKit | 1440 light | 8.7@16, 20.1@17; 8.7@20, 14.8@13; 8.7@23, 12.3@11 | 0 → 1 | -8.7@28, -18.8@16; -8.7@17, -18.8@16 | 0 → 1 | 0/3 / 1/2 (28 ms) | 0.55 (x0.3); 0.1 (x0.1) / -0.34 (x0.2); -0.6 (x0.4) | 266–283 / 267–286 |
| harness dock page wi8 | WebKit | 1440 dark | 9@17, 20.3@17; 8.1@16, 18.5@16 | 0 → 0 | -9@17, -20.3@17; -7.2@15, -19.4@17 | 0 → 0 | 0/3 / 0/2 | -0.3 (x3.8) against -0.3; -0.28 (x4.7) / 0.28 (x4.7) | 416–418 / 416–417 |
| harness dock page wi8 | WebKit | 1440 light | 9@17, 20.3@17; 7.2@15, 18.1@16 | 0 → 0 | -10@18, -19.3@16; -8.1@16, -19.9@17 | 0 → 0 | 0/3 / 0/2 | -0.3 (x3.8) against -0.3; -0.28 (x3.5) / 0.28 (x4.7) | 415–417 / 416–416 |
| glass.babb.dev bottom dock | Chromium | 390 touch dark | 5.2@8.3, 12.8@16.7; 5.2@8.3, 5.7@8.2; 5.2@8.3, 5.8@8.3 | 0 → 1 | -5.6@8.4, -5.8@8.3; -5.6@8.3, -5.8@8.3 | 0 → 1 | 0/3 / 0/2 | 0.16 (x0.2); 0.16 (x0.6) / -0.16 (x0.6); -0.38 (x0.6) | 258–267 / 258–258 |
| glass.babb.dev bottom dock | Chromium | 390 touch light | 5.2@8.3, 12.8@16.7; 5.2@8, 5.7@8.2; 5.2@8.3, 5.2@7.6 | 0 → 1 | -5.6@8.2, -5.8@8.4; -5.6@8.1, -5.6@8.1 | 0 → 1 | 0/3 / 0/2 | 0.16 (x0.3); 0.13 (x0.5) / -0.07 (x0.3); -0.39 (x0.5) | 258–261 / 262–265 |
| glass.babb.dev sidebar | Chromium | 1440 dark | 29.6@8.5, 29.6@8.1; 29.6@8.6, 63.9@16; 29.6@9, 30@8.2 | 0 → 1 | -29.6@8.1, -31.6@8.6; -29.6@8.4, -29.6@8.1; -29.6@8.3, -66.2@16.5 | 0 → 1 | 0/3 / 0/3 | 0.82 (x0.5); 0.29 (x0.2) / -0.82 (x0.5); -0.93 (x0.6) | 259–266 / 258–265 |
| glass.babb.dev sidebar | Chromium | 1440 light | 29.6@8.3, 30.8@8.4; 29.6@7.7, 30.8@8.4; 29.6@8.2, 30.4@8.3 | 0 → 1 | -29.6@8.6, -32.4@8.8; -29.6@8.4, -28.8@7.9; -29.6@8.3, -30.8@8.4 | 0 → 1 | 0/3 / 0/3 | 0.81 (x0.5); 0.76 (x0.5) / -0.76 (x0.5); -0.83 (x0.5) | 258–258 / 258–259 |
| glass.babb.dev bottom dock | WebKit | 390 touch dark | 6.1@48, 23.3@28; 6.1@17, 13.1@17; 6.1@24, 8.8@12 | 0 → 1 | -5.7@38, -9.7@13; -5.7@43, -13.1@17 | 0 → 1 | 3/3 (48, 28, 30 ms) / 3/2 (38, 43, 33 ms) | 0.3 (x0.2); 0.38 (x0.5) / -0.36 (x0.4); -0.15 (x0.1) | 284–300 / 301–304 |
| glass.babb.dev bottom dock | WebKit | 390 touch light | 6.1@39, 20.5@25; 6.1@31, 37.5@43; 6.1@18, 11.4@15 | 0 → 1 | -5.7@47, -31.9@37; -5.7@37, -13.1@17 | 0 → 1 | 4/3 (39, 31, 43, 38 ms) / 5/2 (47, 37, 36, 42 ms) | 0.55 (x0.4); 0.3 (x0.3) / -0.28 (x0.1); -0.17 (x0.1) | 268–302 / 301–305 |
| glass.babb.dev sidebar | WebKit | 1440 dark | 29.6@88, 116.6@27; 29.6@21, 111.7@26; 29.6@13, 87.4@21 | 0 → 1 | -29.6@47, -363.1@82; -29.6@40, -101.9@24; -29.6@31, -317.6@70; -29.6@41, -292.7@64 | 0 → 1 | 3/3 (88, 27, 26 ms) / 7/4 (47, 82, 40, 31, 70, 41, 64 ms) | 2.91 (x0.5); 1.16 (x0.1) / -1.44 (x0.3); -0.23 (x0.1) | 272–686 / 284–301 |
| glass.babb.dev sidebar | WebKit | 1440 light | 29.6@18, 82.6@20; 29.6@75, 101.9@24; 29.6@72, 106.8@25 | 0 → 1 | -29.6@41, -266.5@58; -29.6@34, -73.2@18; -29.6@36, -111.7@26 | 0 → 1 | 2/3 (75, 72 ms) / 6/3 (41, 58, 34, 36, 26, 63 ms) | 1.44 (x0.1); 0.78 (x0.2) / -0.66 (x0.2); -2.16 (x0.5) | 269–677 / 299–300 |
| keyframes.babb.dev | Chromium | 390 touch dark | 9.1@7.7, 10@8.8; 9.1@9.8, 20.8@16.8; 9.1@9.2, 9.3@8.3 | 0 → 1 | -9.5@8.4, -58.3@41.7; -9.5@8.6, -35.6@26.8 | 0 → 1 | 0/3 / 2/2 (42, 27 ms) | 0.26 (x0.5); 0.22 (x0.5) / -0.14 (x0.3); -0.32 (x0.7) | 283–286 / 262–265 |
| keyframes.babb.dev | Chromium | 390 touch light | 9.1@8.3, 20.2@16.4; 9.1@9.2, 20.5@16.6; 9.1@8.5, 8.3@7.5 | 0 → 1 | -9.5@7.5, -30.6@23.5; -9.5@8.4, -31.8@24.3 | 0 → 1 | 0/3 / 0/2 | 0.11 (x0.2); 0.26 (x0.6) / -0.61 (x0.1); -0.26 (x0.6) | 279–290 / 258–550 |
| keyframes.babb.dev | Chromium | 1440 dark | 13@8.7, 27.2@15.6; 13@8.3, 30.7@17.3; 13@16.5, 30.1@17; 13@7.4, 32.7@18.3 | 0 → 1 | -12.9@16.6, -13.5@8.4; -12.9@17, -13.2@8.2; -12.9@8.9, -47.3@25.2 | 0 → 1 | 0/4 / 1/3 (25 ms) | 0.36 (x0.3); 0.36 (x0.6) / -0.35 (x0.3); -0.4 (x0.1) | 258–266 / 267–275 |
| keyframes.babb.dev | Chromium | 1440 light | 13.2@40.9, 86.3@42.4; 13.2@8.3, 30@16.7; 13.2@16.6, 47.7@25; 13.2@25, 84.5@41.6 | 0 → 1 | -13.3@8.3, -30@16.7; -13.3@16.7, -29.8@16.6; -13.3@8.3, -48@25.1; -13.3@8.4, -28.4@15.9 | 0 → 1 | 3/4 (41, 42 ms) / 1/4 (25 ms) | 0.33 (x0.1); 0.4 (x0.6) / -0.37 (x0.5); -1.49 (x0.6) | 258–292 / 258–275 |
| keyframes.babb.dev | WebKit | 390 touch dark | 9.2@30, 21.4@17; 9.2@13, 21.4@17; 9.2@23, 18.5@15 | 0 → 1 | -8.8@26, -10.4@9; -8.8@34, -14.4@12 | 0 → 1 | 1/3 (30 ms) / 2/2 (26, 34 ms) | 0.49 (x0.5); 0.59 (x0.3) / -0.32 (x0.3); -0.64 (x1.4) | 266–286 / 283–286 |
| keyframes.babb.dev | WebKit | 390 touch light | 9.2@22, 15.7@13; 9.2@16, 22.9@18; 9.2@16, 21.4@17 | 0 → 1 | -8.8@20, -15.7@13; -8.8@28, -11.7@10 | 0 → 1 | 0/3 / 1/2 (28 ms) | 0.17 (x0.2); 0.59 (x0.6) / -0.14 (x0.1); -0.41 (x0.3) | 267–284 / 283–283 |
| keyframes.babb.dev | WebKit | 1440 dark | 13.2@17, 43.4@23; 13.2@22, 28.6@16; 13.2@16, 34.8@19; 13.2@19, 30.6@17 | 0 → 1 | -13.3@25, -32.7@18; -13.3@17, -34.8@19; -13.3@26, -9.5@6; -13.3@18, -28.6@16 | 0 → 1 | 0/4 / 3/4 (27, 26 ms) | 0.91 (x0.3); 0.52 (x0.7) / -0.4 (x0.7); -0.91 (x0.5) | 268–301 / 267–287 |
| keyframes.babb.dev | WebKit | 1440 light | 13.2@16, 30.6@17; 13.2@16, 45.5@24; 13.2@16, 36.9@20; 13.2@25, 28.6@16 | 0 → 1 | -13.3@23, -18.6@11; -13.3@18, -28.6@16; -13.3@21, -18.6@11; -13.3@20, -43.4@23 | 0 → 1 | 0/4 / 0/4 | 0.84 (x0.3); 0.91 (x0.4) / -0.25 (x0.1); -0.06 (x0) | 267–278 / 282–295 |
| color.babb.dev | Chromium | 1440 dark | 21.3@8.4, 47.9@16.6; 21.3@8.3, 21.9@8.3 | 0 → 1 | -21.4@8.4, -76.5@24.9; -21.4@7.9, -49.9@17.2; -21.4@8.7, -106.4@33.3 | 0 → 1 | 0/3 / 2/3 (33, 25 ms) | 0.6 (x0.6); 0.59 (x0.5) / -0.6 (x0.6); -0.55 (x0.5) | 258–258 / 258–259 |
| color.babb.dev | Chromium | 1440 light | 21.3@8.3, 21.9@8.3; 21.3@7.6, 49.9@17.2; 21.3@8.4, 76.8@25 | 0 → 1 | -21.4@8.3, -106.4@33.3; -21.4@8.3, -76.8@25; -21.4@8.9, -74.3@24.3 | 0 → 1 | 0/3 / 2/3 (33, 25 ms) | 0.59 (x0.6); 0.56 (x0.3) / -0.59 (x0.5); -0.58 (x0.5) | 258–258 / 258–268 |
| color.babb.dev | WebKit | 1440 light | 21.3@18, 56@19; 21.3@20, 66.3@22; 21.3@19, 46@16 | 0 → 1 | -21.4@32, -59.4@20; -21.4@21, -42.7@15; -21.4@25, -49.3@17 | 0 → 1 | 0/3 / 2/3 (32, 27 ms) | 1.59 (x0.4); 0.09 (x0) / -1.35 (x1.1); -0.24 (x0.1) | 269–284 / 279–284 |
| daraksha.babb.dev | Chromium | 390 touch dark | 9.5@8.4, 34.3@25; 8.7@8.3, 19.9@16.7 | 0 → 1 | -8.7@9.2, -18.9@16 | 0 → 1 | 0/2 / 0/1 | 0.3 (x0.8); 0.24 (x0.6) / -0.23 (x0.6) | 550–550 / 551–551 |
| daraksha.babb.dev | Chromium | 390 touch light | 9.5@8.1, 34.6@25.2; 8.7@8.4, 31.6@25 | 0 → 1 | -8.7@8.4, -30.7@24.4 | 0 → 1 | 1/2 (25 ms) / 0/1 | 0.3 (x0.8); 0.24 (x0.5) / -0.27 (x0.6) | 550–550 / 550–550 |
| daraksha.babb.dev | Chromium | 1440 dark | 12@8.4, 77.1@41.7; 12@8.4, 60.2@33.3; 10.1@8.3, 49.7@32.7 | 0 → 1 | -12.3@8.4, -136.9@74.8; -10.1@8.3, -50.7@33.3 | 0 → 1 | 3/3 (42, 33 ms) / 2/2 (75, 33 ms) | 0.3 (x0.6); 0.3 (x0.3) / -0.86 (x0.7); -0.28 (x0.5) | 550–550 / 550–550 |
| daraksha.babb.dev | Chromium | 1440 light | 12@8.3, 43.4@25; 12@8.8, 43.4@25; 10.1@8.3, 22.2@16.2 | 0 → 1 | -12.3@8.8, -60.4@33.4; -10.1@8.3, -36.5@24.9 | 0 → 1 | 0/3 / 1/2 (33 ms) | 0.3 (x0.6); 0.28 (x0.5) / -0.32 (x0.5); -0.29 (x0.6) | 550–551 / 551–558 |
| daraksha.babb.dev | WebKit | 390 touch dark | 9.5@25, 48.6@34; 8.7@26, 36@28 | 0 → 1 | -8.7@35, -24.4@20 | 0 → 1 | 3/2 (34, 26, 28 ms) / 1/1 (35 ms) | 0.3 (x0.3); 0.23 (x0.2) / -0.2 (x0.1) | 582–584 / 584–584 |
| daraksha.babb.dev | WebKit | 390 touch light | 9.5@25, 34.3@25; 8.7@18, 27.3@22 | 0 → 1 | -8.7@44, -30.1@24 | 0 → 1 | 0/2 / 1/1 (44 ms) | 0.3 (x0.4); 0.66 (x0.4) / -0.13 (x0.1) | 564–583 / 600–600 |
| daraksha.babb.dev | WebKit | 1440 dark | 12@46, 53.5@30; 12@16, 51.5@29; 10.1@23, 48.5@32 | 0 → 1 | -12.3@40, -57.5@32; -10.1@36, -28.3@20 | 0 → 1 | 4/3 (46, 30, 29, 32 ms) / 3/2 (40, 32, 36 ms) | 0.3 (x0.3); 0.3 (x0.2) / -0.18 (x0.1); -0.82 (x0.4) | 564–601 / 583–585 |
| daraksha.babb.dev | WebKit | 1440 light | 12@25, 39.5@23; 12@26, 41.4@24; 10.1@26, 46.8@31 | 0 → 1 | -12.3@35, -53.5@30; -10.1@32, -26.7@19 | 0 → 1 | 3/3 (26, 31 ms) / 3/2 (35, 30, 32 ms) | 0.3 (x0.3); 0.31 (x0.2) / -0.85 (x0.4); -0.59 (x0.3) | 567–584 / 582–585 |

### Item 2 table: drift (px over one morph; the largest of every open or close in the cell)

| where | engine | cell | plate centre, open | plate centre, close | plate left / right edge travel | seats' centres (open / close) | the seal's centre (close / open) | plate top | the dock's layout width in the open / the close (frames that change it) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fourier.babb.dev | Chromium | 390 touch dark | 0.01 | 0.01 | 126.5 / 126.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 60 → 313 (1) / 313 → 313 (0) |
| fourier.babb.dev | Chromium | 390 touch light | 0.01 | 0.01 | 126.5 / 126.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 60 → 313 (1) / 313 → 313 (0) |
| fourier.babb.dev | Chromium | 1440 dark | 0.14 | 0.01 | 327.7 / 327.6 | 3.8 / 3.9 | 3.8 / 3.7 | 0 | 56.69 → 712 (1) / 712.44 → 712 (1) |
| fourier.babb.dev | Chromium | 1440 light | 0.15 | 0.01 | 327.7 / 327.6 | 3.8 / 3.9 | 3.8 / 3.7 | 0 | 56.69 → 712 (1) / 712.44 → 712 (1) |
| fourier.babb.dev | WebKit | 390 touch dark | 0.01 | 0.01 | 126.5 / 126.5 | 2.4 / 3.8 | 3.8 / 3.9 | 0 | 60 → 313 (1) / 313 → 313 (0) |
| fourier.babb.dev | WebKit | 390 touch light | 0.01 | 0.01 | 126.5 / 126.5 | 3.8 / 4 | 3.8 / 3.9 | 0 | 60 → 313 (1) / 313 → 313 (0) |
| fourier.babb.dev | WebKit | 1440 dark | 0.15 | 0.01 | 328.2 / 328.1 | 3.8 / 4 | 3.8 / 3.8 | 0 | 56.69 → 713 (1) / 713.23 → 713 (1) |
| fourier.babb.dev | WebKit | 1440 light | 0.15 | 0.01 | 328.2 / 328.1 | 3.8 / 4 | 3.8 / 3.8 | 0 | 56.69 → 713 (1) / 713.23 → 713 (1) |
| fourier repro v11.1.0 | Chromium | 390 touch dark | 0.01 | 0.01 | 155 / 155 | 3.8 / 8.3 | 3.8 / 3.9 | 0 | 60 → 370 (1) / 370 → 370 (0) |
| fourier repro v11.1.0 | Chromium | 390 touch light | 0.01 | 0.01 | 155 / 155 | 3.8 / 8.3 | 3.8 / 3.9 | 0 | 60 → 370 (1) / 370 → 370 (0) |
| fourier repro wi8 | Chromium | 390 touch dark | 0.01 | 0.01 | 155.4 / 155.5 | 76.5 / 0 | 76.6 / 0 | 0 | 60 → 370 (1) / 370 → 60 (1) |
| fourier repro wi8 | Chromium | 390 touch light | 0.01 | 0.01 | 155.4 / 155.5 | 76.3 / 0 | 76 / 0 | 0 | 60 → 370 (1) / 370 → 60 (1) |
| fourier repro v11.1.0 | Chromium | 1440 dark | 0.01 | 0.01 | 335.5 / 335.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 56 → 727 (1) / 727.03 → 727 (0) |
| fourier repro v11.1.0 | Chromium | 1440 light | 0.01 | 0.01 | 335.5 / 335.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 56 → 727 (1) / 727.03 → 727 (0) |
| fourier repro wi8 | Chromium | 1440 dark | 0.02 | 0.02 | 334.9 / 334.9 | 166.7 / 0 | 166.2 / 0 | 0 | 56 → 723.92 (1) / 723.92 → 56 (1) |
| fourier repro wi8 | Chromium | 1440 light | 0.02 | 0.02 | 334.9 / 334.9 | 166.9 / 0 | 168.4 / 0 | 0 | 56 → 723.92 (1) / 723.92 → 56 (1) |
| fourier repro v11.1.0 | WebKit | 390 touch dark | 0.01 | 0.01 | 155 / 155 | 3.8 / 8.2 | 3.8 / 3.9 | 0 | 60 → 370 (1) / 370 → 370 (0) |
| fourier repro v11.1.0 | WebKit | 390 touch light | 0.01 | 0.01 | 155 / 155 | 3.8 / 8.2 | 3.8 / 3.9 | 0 | 60 → 370 (1) / 370 → 370 (0) |
| fourier repro wi8 | WebKit | 390 touch dark | 0.01 | 0.01 | 155.4 / 155.5 | 71.5 / 0 | 70.4 / 0 | 0 | 60 → 370 (1) / 370 → 60 (1) |
| fourier repro wi8 | WebKit | 390 touch light | 0.01 | 0.01 | 155.4 / 155.5 | 68.2 / 0 | 72.6 / 0 | 0 | 60 → 370 (1) / 370 → 60 (1) |
| fourier repro v11.1.0 | WebKit | 1440 dark | 0.01 | 0.01 | 334.5 / 334.5 | 3.8 / 4 | 3.8 / 3.9 | 0 | 56 → 725 (1) / 724.55 → 725 (1) |
| fourier repro v11.1.0 | WebKit | 1440 light | 0.01 | 0.01 | 334.5 / 334.5 | 3.8 / 4 | 3.8 / 3.9 | 0 | 56 → 725 (1) / 724.55 → 725 (1) |
| fourier repro wi8 | WebKit | 1440 dark | 0.01 | 0.02 | 335.3 / 335.3 | 144.6 / 0 | 146.9 / 0 | 0 | 56 → 724.55 (1) / 724.55 → 56 (1) |
| fourier repro wi8 | WebKit | 1440 light | 0.01 | 0.02 | 335.3 / 335.3 | 161.2 / 0 | 151.6 / 0 | 0 | 56 → 724.55 (1) / 724.55 → 56 (1) |
| harness dock page v11.1.0 | Chromium | 1440 dark | 87.5 | 87.5 | 0 / 175 | 4 / 4.9 | 1.7 / 13.8 | 0 | 56 → 231 (1) / 231 → 231 (0) |
| harness dock page v11.1.0 | Chromium | 1440 light | 87.5 | 87.5 | 0 / 175 | 4 / 4.9 | 1.7 / 13.8 | 0 | 56 → 231 (1) / 231 → 231 (0) |
| harness dock page wi8 | Chromium | 1440 dark | 87.76 | 87.76 | 0 / 175.5 | 2 / 2 | 7 / 0 | 0 | 56 → 231 (1) / 231 → 56 (1) |
| harness dock page wi8 | Chromium | 1440 light | 87.76 | 87.76 | 0 / 175.5 | 2 / 2 | 7 / 0 | 0 | 56 → 231 (1) / 231 → 56 (1) |
| harness dock page v11.1.0 | WebKit | 390 touch dark | 93.5 | 93.5 | 0 / 187 | 4 / 4.9 | 1.7 / 13.7 | 0 | 60 → 247 (1) / 247 → 247 (0) |
| harness dock page v11.1.0 | WebKit | 390 touch light | 93.5 | 93.5 | 0 / 187 | 4 / 4.9 | 1.7 / 13.7 | 0 | 60 → 247 (1) / 247 → 247 (0) |
| harness dock page v11.1.0 | WebKit | 1440 dark | 87.5 | 87.5 | 0 / 175 | 4 / 4.9 | 1.7 / 13.8 | 0 | 56 → 231 (1) / 231 → 231 (0) |
| harness dock page v11.1.0 | WebKit | 1440 light | 87.5 | 87.5 | 0 / 175 | 4 / 4.9 | 1.7 / 13.8 | 0 | 56 → 231 (1) / 231 → 231 (0) |
| harness dock page wi8 | WebKit | 1440 dark | 103.05 | 87.76 | 15.3 / 190.8 | 8.5 / 1.7 | 6.2 / 0 | 0 | 56 → 231 (1) / 231 → 56 (1) |
| harness dock page wi8 | WebKit | 1440 light | 103.05 | 87.76 | 15.3 / 190.8 | 8.5 / 1.8 | 6.3 / 0 | 0 | 56 → 231 (1) / 231 → 56 (1) |
| glass.babb.dev bottom dock | Chromium | 390 touch dark | 0.17 | 0.01 | 56.3 / 56.3 | 49.7 / 48.4 | 4 / 4.1 | 0 | 269.38 → 382 (1) / 382 → 382 (0) |
| glass.babb.dev bottom dock | Chromium | 390 touch light | 0.18 | 0.01 | 56.3 / 56.3 | 49.6 / 48.6 | 4 / 4.2 | 0 | 269.38 → 382 (1) / 382 → 382 (0) |
| glass.babb.dev sidebar | Chromium | 1440 dark | 297.5 | 297.5 | 0 / 595 | 4.5 / 7.8 | 0.9 / 3.8 | 3 | 58 → 64 (1) / 64 → 58 (1) |
| glass.babb.dev sidebar | Chromium | 1440 light | 297.5 | 297.5 | 0 / 595 | 4.5 / 7.8 | 0.9 / 3.8 | 3 | 58 → 64 (1) / 64 → 58 (1) |
| glass.babb.dev bottom dock | WebKit | 390 touch dark | 0.23 | 0.01 | 57.2 / 57.3 | 50.5 / 48.5 | 4 / 3.7 | 0 | 267.52 → 382 (1) / 382 → 382 (0) |
| glass.babb.dev bottom dock | WebKit | 390 touch light | 0.23 | 0.01 | 57.2 / 57.3 | 50.5 / 48.9 | 4 / 3.7 | 0 | 267.52 → 382 (1) / 382 → 382 (0) |
| glass.babb.dev sidebar | WebKit | 1440 dark | 297.5 | 297.5 | 0 / 595 | 6.7 / 7.8 | 0.9 / 3.8 | 3 | 58 → 64 (1) / 64 → 58 (1) |
| glass.babb.dev sidebar | WebKit | 1440 light | 297.5 | 297.5 | 0 / 595 | 6.9 / 7.8 | 0.9 / 3.8 | 3 | 58 → 64 (1) / 64 → 58 (1) |
| keyframes.babb.dev | Chromium | 390 touch dark | 0.01 | 0.01 | 91.5 / 91.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 60 → 243 (1) / 243.39 → 243 (1) |
| keyframes.babb.dev | Chromium | 390 touch light | 0.01 | 0.01 | 91.5 / 91.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 60 → 243 (1) / 243.39 → 60 (2) |
| keyframes.babb.dev | Chromium | 1440 dark | 0.01 | 0.01 | 130.5 / 130.5 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 56 → 317 (1) / 316.98 → 317 (0) |
| keyframes.babb.dev | Chromium | 1440 light | 0.01 | 0.01 | 133 / 133 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 56 → 322 (1) / 322.06 → 322 (1) |
| keyframes.babb.dev | WebKit | 390 touch dark | 0.01 | 0.01 | 93 / 93 | 3.8 / 3.9 | 3.8 / 3.9 | 0 | 60 → 246 (1) / 245.56 → 246 (1) |
| keyframes.babb.dev | WebKit | 390 touch light | 0.01 | 0.01 | 93 / 93 | 3.8 / 4 | 3.8 / 3.9 | 0 | 60 → 246 (1) / 245.56 → 246 (1) |
| keyframes.babb.dev | WebKit | 1440 dark | 0.01 | 0.02 | 133 / 133 | 3.8 / 4 | 3.8 / 3.9 | 0 | 56 → 322 (1) / 322.08 → 322 (1) |
| keyframes.babb.dev | WebKit | 1440 light | 0.01 | 0.02 | 133 / 133 | 3.8 / 4 | 3.8 / 3.9 | 0 | 56 → 322 (1) / 322.08 → 322 (1) |
| color.babb.dev | Chromium | 1440 dark | 0.01 | 0.01 | 214 / 214 | 31.6 / 3.9 | 3.8 / 3.9 | 0 | 56 → 484 (1) / 484.19 → 484 (1) |
| color.babb.dev | Chromium | 1440 light | 0.01 | 0.01 | 214 / 214 | 31.6 / 3.9 | 3.8 / 3.9 | 0 | 56 → 484 (1) / 484.19 → 484 (1) |
| color.babb.dev | WebKit | 1440 light | 0.01 | 0.01 | 214 / 214 | 31.4 / 4 | 3.8 / 3.9 | 0 | 56 → 484 (1) / 484.19 → 484 (1) |
| daraksha.babb.dev | Chromium | 390 touch dark | 58.95 | 58.94 | 154.6 / 36.7 | 71.5 / 57.6 | 55.6 / 57.3 | 0 | 56 → 247.3 (2) / 232 → 56 (1) |
| daraksha.babb.dev | Chromium | 390 touch light | 58.95 | 58.94 | 154.6 / 36.7 | 71.5 / 57.6 | 55.6 / 57.3 | 0 | 56 → 247.3 (2) / 232 → 56 (1) |
| daraksha.babb.dev | Chromium | 1440 dark | 58.95 | 58.95 | 180.1 / 62.2 | 68.9 / 51.8 | 50 / 51.5 | 0 | 56 → 298.3 (2) / 298.3 → 56 (2) |
| daraksha.babb.dev | Chromium | 1440 light | 58.95 | 58.95 | 180.1 / 62.2 | 68.9 / 51.8 | 50 / 51.5 | 0 | 56 → 298.3 (2) / 298.3 → 56 (2) |
| daraksha.babb.dev | WebKit | 390 touch dark | 58.95 | 58.94 | 154.6 / 36.7 | 71.5 / 57.1 | 55.6 / 57.3 | 0 | 56 → 247.3 (2) / 232 → 56 (1) |
| daraksha.babb.dev | WebKit | 390 touch light | 58.95 | 58.94 | 154.6 / 36.7 | 71.5 / 57.4 | 55.6 / 57.3 | 0 | 56 → 247.3 (2) / 232 → 56 (1) |
| daraksha.babb.dev | WebKit | 1440 dark | 58.95 | 58.95 | 180.1 / 62.2 | 68.8 / 51.9 | 50 / 51.6 | 0 | 56 → 298.3 (2) / 298.3 → 56 (2) |
| daraksha.babb.dev | WebKit | 1440 light | 58.95 | 58.95 | 180.1 / 62.2 | 68.8 / 51.6 | 50 / 51.4 | 0 | 56 → 298.3 (2) / 298.3 → 56 (2) |

### Item 3 table: the theme seat on hover and on press (px, against the frame before)

| where | engine | cell | hover in: seat x / y / w, glyph centre | hover out | press: every seat moves (frames, ms after the press) | press: plate x / w | press back |
| --- | --- | --- | --- | --- | --- | --- | --- |
| fourier.babb.dev | Chromium | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 125 ms; stays -4 | 0 / 0 | ≤ 0.21 |
| fourier.babb.dev | Chromium | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 117 ms; stays -4 | 0 / 0 | ≤ 0.19 |
| fourier.babb.dev | Chromium | 1440 dark | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 76 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier.babb.dev | Chromium | 1440 light | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 75 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier.babb.dev | WebKit | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| fourier.babb.dev | WebKit | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 134 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier.babb.dev | WebKit | 1440 dark | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 100 ms; stays -4 | 0 / 0 | ≤ 0.11 |
| fourier.babb.dev | WebKit | 1440 light | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 113 ms; stays -4 | 0 / 0 | ≤ 0.1 |
| fourier repro v11.1.0 | Chromium | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 14 px in 1 frame(s), 75 ms; stays -14 | 0 / 0 | ≤ 0.07 |
| fourier repro v11.1.0 | Chromium | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 14 px in 1 frame(s), 83 ms; stays -14 | 0 / 0 | ≤ 0.07 |
| fourier repro wi8 | Chromium | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 16 px in 1 frame(s), 117 ms; stays -16 | 0 / 0 | ≤ 0.07 |
| fourier repro wi8 | Chromium | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 16 px in 1 frame(s), 118 ms; stays -16 | 0 / 0 | ≤ 0.07 |
| fourier repro v11.1.0 | Chromium | 1440 dark | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 58 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier repro v11.1.0 | Chromium | 1440 light | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 59 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier repro wi8 | Chromium | 1440 dark | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| fourier repro wi8 | Chromium | 1440 light | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| fourier repro v11.1.0 | WebKit | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 12 px in 1 frame(s), 74 ms; stays -12 | 0 / 0 | 0 (no frame changed) |
| fourier repro v11.1.0 | WebKit | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 12 px in 1 frame(s), 84 ms; stays -12 | 0 / 0 | 0 (no frame changed) |
| fourier repro wi8 | WebKit | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 16 px in 1 frame(s), 78 ms; stays -16 | 0 / 0 | 0 (no frame changed) |
| fourier repro wi8 | WebKit | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 16 px in 1 frame(s), 83 ms; stays -16 | 0 / 0 | 0 (no frame changed) |
| fourier repro v11.1.0 | WebKit | 1440 dark | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 132 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier repro v11.1.0 | WebKit | 1440 light | 0 (no frame changed) | 0 (no frame changed) | 4 px in 1 frame(s), 100 ms; stays -4 | 0 / 0 | 0 (no frame changed) |
| fourier repro wi8 | WebKit | 1440 dark | 0 (no frame changed) | 0 (no frame changed) | ≤ 0.11 | 0 / 0 | 0 (no frame changed) |
| fourier repro wi8 | WebKit | 1440 light | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev bottom dock | Chromium | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev bottom dock | Chromium | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev sidebar | Chromium | 1440 dark | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev sidebar | Chromium | 1440 light | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev bottom dock | WebKit | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev bottom dock | WebKit | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev sidebar | WebKit | 1440 dark | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0.26 | 0 / 0 | 0 (no frame changed) |
| glass.babb.dev sidebar | WebKit | 1440 light | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| keyframes.babb.dev | Chromium | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | ≤ 0.37 | 0 / 0 | ≤ 0.66 |
| keyframes.babb.dev | Chromium | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | ≤ 0.89 | 0 / 0 | ≤ 0.42 |
| keyframes.babb.dev | Chromium | 1440 dark | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| keyframes.babb.dev | Chromium | 1440 light | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| keyframes.babb.dev | WebKit | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| keyframes.babb.dev | WebKit | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | 0 (no frame changed) | 0 / 0 | 0 (no frame changed) |
| keyframes.babb.dev | WebKit | 1440 dark | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| keyframes.babb.dev | WebKit | 1440 light | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| daraksha.babb.dev | Chromium | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | ≤ 0.14 | 0 / 0 | ≤ 0.14 |
| daraksha.babb.dev | Chromium | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | ≤ 0.13 | 0 / 0 | ≤ 0.14 |
| daraksha.babb.dev | Chromium | 1440 dark | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| daraksha.babb.dev | Chromium | 1440 light | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |
| daraksha.babb.dev | WebKit | 390 touch dark | 0 (no frame changed) | 0 (no frame changed) | ≤ 0 | 0 / 0 | ≤ 0 |
| daraksha.babb.dev | WebKit | 390 touch light | 0 (no frame changed) | 0 (no frame changed) | ≤ 0 | 0 / 0 | ≤ 0 |
| daraksha.babb.dev | WebKit | 1440 dark | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0.11 | 0 / 0 | 0 (no frame changed) |
| daraksha.babb.dev | WebKit | 1440 light | 0 / 0 / 0, 0 | 0 / 0 / 0, 0 | ≤ 0 | 0 / 0 | 0 (no frame changed) |

### Item 4 table: the collapse's last frames (plate width in the last six frames of the motion, then the settle frame)

| where | engine | cell | last six plate widths (px) | settle frame after the close began (ms) | settle: plate x / w | settle: the seal's centre (its opacity) | settle: seats (run opacity) | settle: the dock's layout width |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fourier.babb.dev | Chromium | 390 touch dark | 62.49, 61.63, 60.93, 60.44, 60.04, 60 (seal centre 195.03, 195.02, 195, 195, 195, 194.98) | 541 | 0 / 0 | 0.02 (1) | 118.5 (0) | 313 → 60 |
| fourier.babb.dev | Chromium | 390 touch light | 63.31, 62.28, 61.47, 60.88, 60.33, 60 (seal centre 195.05, 195.03, 195.02, 195, 195, 194.98) | 549 | 0 / 0 | 0.02 (1) | 118.5 (0) | 313 → 60 |
| fourier.babb.dev | Chromium | 1440 dark | 65.64, 63, 60.85, 59.18, 57.9, 57 (seal centre 717.56, 717.54, 717.51, 717.5, 717.5, 717.49) | 483 | 0.16 / -0.31 | 2.52 (1) | 319.9 (0) | 712 → 56.69 |
| fourier.babb.dev | Chromium | 1440 light | 65.64, 63.2, 60.85, 59.21, 58.04, 57 (seal centre 717.56, 717.54, 717.51, 717.5, 717.5, 717.49) | 483 | 0.16 / -0.31 | 2.52 (1) | 319.9 (0) | 712 → 56.69 |
| fourier.babb.dev | WebKit | 390 touch dark | 70.81, 66.58, 63.53, 61.58, 60.44, 60 (seal centre 195.16, 195.15, 195.01, 195, 195, 195) | 540 | 0 / 0 | 0 (1) | 118.5 (0) | 313 → 60 |
| fourier.babb.dev | WebKit | 390 touch light | 72.47, 67.5, 64.3, 61.96, 60.67, 60 (seal centre 195.17, 195.15, 195.01, 195, 195, 195) | 536 | 0 / 0 | 0 (1) | 118.5 (0) | 313 → 60 |
| fourier.babb.dev | WebKit | 1440 dark | 89.34, 77.07, 68.15, 62.61, 58.74, 57 (seal centre 716.25, 716.01, 716, 716, 716, 716) | 501 | 0.16 / -0.31 | 4.01 (1) | 320.3 (0) | 713 → 56.69 |
| fourier.babb.dev | WebKit | 1440 light | 90.25, 77.71, 68.57, 62.61, 59.07, 57 (seal centre 716.25, 716.01, 716, 716, 716, 716) | 509 | 0.16 / -0.31 | 4.01 (1) | 320.3 (0) | 713 → 56.69 |
| fourier repro v11.1.0 | Chromium | 390 touch dark | 64.1, 62.84, 61.82, 61.03, 60.43, 60 (seal centre 195.05, 195.03, 195.02, 195, 195, 194.98) | 533 | 0 / 0 | 0.02 (1) | 149 (0) | 370 → 60 |
| fourier repro v11.1.0 | Chromium | 390 touch light | 64.1, 62.85, 61.83, 61.04, 60.43, 60 (seal centre 195.05, 195.03, 195.02, 195, 195, 194.98) | 533 | 0 / 0 | 0.02 (1) | 149 (0) | 370 → 60 |
| fourier repro wi8 | Chromium | 390 touch dark | 59.22, 59.28, 59.34, 59.41, 59.47, 60 (seal centre 195.39, 195.36, 195.33, 195.3, 195.26, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro wi8 | Chromium | 390 touch light | 59.25, 59.31, 59.38, 59.44, 59.5, 60 (seal centre 195.37, 195.34, 195.31, 195.28, 195, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro v11.1.0 | Chromium | 1440 dark | 64.92, 62.21, 59.97, 58.25, 56.94, 56 (seal centre 720.05, 720.03, 720.02, 720, 720, 719.98) | 492 | 0 / 0 | 0.02 (1) | 327.5 (0) | 727 → 56 |
| fourier repro v11.1.0 | Chromium | 1440 light | 64.49, 61.83, 59.74, 58.09, 56.91, 56 (seal centre 720.05, 720.03, 720.02, 720, 720, 719.98) | 492 | 0 / 0 | 0.02 (1) | 327.5 (0) | 727 → 56 |
| fourier repro wi8 | Chromium | 1440 dark | 55.03, 55.16, 55.25, 55.38, 55.47, 56 (seal centre 720.48, 720.43, 720.37, 720.32, 720.28, 720) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro wi8 | Chromium | 1440 light | 55.06, 55.16, 55.28, 55.38, 55.47, 56 (seal centre 720.48, 720.42, 720.36, 720.32, 720.27, 720) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro v11.1.0 | WebKit | 390 touch dark | 74.86, 68.89, 65.07, 62.4, 60.75, 60 (seal centre 195.17, 195.16, 195.01, 195, 195, 195) | 536 | 0 / 0 | 0 (1) | 147 (0) | 370 → 60 |
| fourier repro v11.1.0 | WebKit | 390 touch light | 73.63, 68.33, 64.51, 62.04, 60.54, 60 (seal centre 195.17, 195.15, 195.01, 195, 195, 195) | 539 | 0 / 0 | 0 (1) | 147 (0) | 370 → 60 |
| fourier repro wi8 | WebKit | 390 touch dark | 59.09, 59.13, 59.25, 59.34, 59.47, 60 (seal centre 195.45, 195.43, 195.38, 195.32, 195.26, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro wi8 | WebKit | 390 touch light | 59.09, 59.13, 59.22, 59.34, 59.47, 60 (seal centre 195.45, 195.44, 195.39, 195.33, 195.27, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro v11.1.0 | WebKit | 1440 dark | 90.87, 77.12, 68.71, 62.01, 58.29, 56 (seal centre 720.24, 720.01, 720.01, 720, 720, 720) | 508 | 0 / 0 | 0 (1) | 326.3 (0) | 725 → 56 |
| fourier repro v11.1.0 | WebKit | 1440 light | 86.28, 73.39, 66.12, 60.91, 57.31, 56 (seal centre 720.24, 720.01, 720, 720, 720, 720) | 518 | 0 / 0 | 0 (1) | 326.3 (0) | 725 → 56 |
| fourier repro wi8 | WebKit | 1440 dark | 54.34, 54.63, 54.91, 55.16, 55.34, 56 (seal centre 720.82, 720.69, 720.55, 720.43, 720.32, 720) | none (the motion's last frame is the settle) | – | – | – | – |
| fourier repro wi8 | WebKit | 1440 light | 54.38, 54.66, 54.91, 55.16, 55.38, 56 (seal centre 720.81, 720.68, 720.55, 720.42, 720.32, 720) | none (the motion's last frame is the settle) | – | – | – | – |
| harness dock page v11.1.0 | Chromium | 1440 dark | 58.35, 57.59, 57.09, 56.6, 56.24, 56 (seal centre 515.25, 515.27, 515.29, 515.31, 515.32, 515.33) | 518 | 0 / 0 | -4.92 (1) | 1 (0) | 231 → 56 |
| harness dock page v11.1.0 | Chromium | 1440 light | 58.32, 57.62, 57.13, 56.6, 56.24, 56 (seal centre 515.25, 515.27, 515.29, 515.31, 515.32, 515.32) | 527 | 0 / 0 | -4.92 (1) | 1 (0) | 231 → 56 |
| harness dock page wi8 | Chromium | 1440 dark | 55.61, 55.64, 55.67, 55.72, 55.75, 56 (seal centre 525.58, 525.58, 525.58, 525.58, 525.58, 525.58) | none (the motion's last frame is the settle) | – | – | – | – |
| harness dock page wi8 | Chromium | 1440 light | 55.61, 55.64, 55.69, 55.72, 55.75, 56 (seal centre 525.58, 525.58, 525.58, 525.58, 525.58, 525.58) | none (the motion's last frame is the settle) | – | – | – | – |
| harness dock page v11.1.0 | WebKit | 390 touch dark | 69.75, 66.09, 63.42, 61.68, 60.64, 60 (seal centre 56.65, 56.72, 56.85, 56.89, 56.91, 56.92) | 533 | 0 / 0 | -4.92 (1) | 1 (0) | 247 → 60 |
| harness dock page v11.1.0 | WebKit | 390 touch light | 66.89, 64.1, 62.11, 60.86, 60.14, 60 (seal centre 56.7, 56.84, 56.88, 56.9, 56.92, 56.92) | 528 | 0 / 0 | -4.92 (1) | 1 (0) | 247 → 60 |
| harness dock page v11.1.0 | WebKit | 1440 dark | 65.12, 61.52, 59.09, 57.57, 56.55, 56 (seal centre 530.37, 530.56, 530.61, 530.65, 530.67, 530.68) | 517 | 0 / 0 | -4.91 (1) | 1 (0) | 231 → 56 |
| harness dock page v11.1.0 | WebKit | 1440 light | 63.92, 60.7, 58.65, 57.22, 56.34, 56 (seal centre 530.4, 530.58, 530.62, 530.65, 530.67, 530.68) | 523 | 0 / 0 | -4.91 (1) | 1 (0) | 231 → 56 |
| harness dock page wi8 | WebKit | 1440 dark | 55.48, 55.52, 55.58, 55.66, 55.72, 56 (seal centre 525.77, 525.77, 525.77, 525.77, 525.77, 525.77) | none (the motion's last frame is the settle) | – | – | – | – |
| harness dock page wi8 | WebKit | 1440 light | 55.48, 55.52, 55.58, 55.66, 55.72, 56 (seal centre 525.77, 525.77, 525.77, 525.77, 525.77, 525.77) | none (the motion's last frame is the settle) | – | – | – | – |
| glass.babb.dev bottom dock | Chromium | 390 touch dark | 270.5, 270.04, 269.66, 269.4, 269.16, 269 (seal centre 179.81, 179.79, 179.77, 179.76, 179.76, 179.74) | 533 | -0.19 / 0.38 | -0.24 (1) | 2.6 (0) | 382 → 269.38 |
| glass.babb.dev bottom dock | Chromium | 390 touch light | 270.22, 269.84, 269.51, 269.26, 269.07, 269 (seal centre 179.79, 179.77, 179.77, 179.76, 179.75, 179.74) | 538 | -0.19 / 0.38 | -0.24 (1) | 2.6 (0) | 382 → 269.38 |
| glass.babb.dev sidebar | Chromium | 1440 dark | 65.91, 63.37, 61.46, 59.94, 58.82, 58 (seal centre 49.04, 49.03, 49.02, 49.01, 49, 49) | 518 | 0 / 0 | 0 (1) | -12 (0) | – |
| glass.babb.dev sidebar | Chromium | 1440 light | 65.72, 63.5, 61.56, 60.02, 58.76, 58 (seal centre 49.04, 49.03, 49.02, 49.01, 49, 49) | 507 | 0 / 0 | 0 (1) | -12 (0) | – |
| glass.babb.dev bottom dock | WebKit | 390 touch dark | 273.46, 270.01, 269.02, 268.39, 268.03, 268 (seal centre 179.46, 179.31, 179.29, 179.26, 179.26, 179.25) | 528 | 0.24 / -0.48 | 0.24 (1) | 3 (0) | 382 → 267.52 |
| glass.babb.dev bottom dock | WebKit | 390 touch light | 281.93, 274.11, 270.96, 269.13, 268.28, 268 (seal centre 179.8, 179.47, 179.39, 179.29, 179.26, 179.25) | 537 | 0.24 / -0.48 | 0.24 (1) | 3 (0) | 382 → 267.52 |
| glass.babb.dev sidebar | WebKit | 1440 dark | 87.33, 75.63, 67.73, 62.6, 59.44, 58 (seal centre 49.16, 49.1, 49.05, 49.03, 49.01, 49) | 432 | 0 / 0 | 0 (1) | -12 (0) | – |
| glass.babb.dev sidebar | WebKit | 1440 light | 82.69, 71.98, 65.65, 61.5, 58.66, 58 (seal centre 49.14, 49.08, 49.04, 49.02, 49, 49) | 468 | 0 / 0 | 0 (1) | -12 (0) | – |
| keyframes.babb.dev | Chromium | 390 touch dark | 62.1, 61.39, 60.87, 60.45, 60.14, 60 (seal centre 195.03, 195.02, 195.02, 195, 195, 194.98) | 545 | 0 / 0 | 0.02 (1) | 83.7 (0) | 243 → 60 |
| keyframes.babb.dev | Chromium | 390 touch light | 90.76, 81.27, 71.72, 67.35, 60.61, 60 (seal centre 195.67, 195.45, 195.25, 195.16, 195, 194.98) | 571 | 0 / 0 | 0.02 (1) | 83.7 (0) | 243 → 60 |
| keyframes.babb.dev | Chromium | 1440 dark | 62.41, 60.76, 59.44, 58.38, 56.36, 56.01 (seal centre 720.09, 720.06, 720.05, 720.03, 720, 720) | 508 | 0 / 0 | 0.02 (1) | 122.5 (0) | 317 → 56 |
| keyframes.babb.dev | Chromium | 1440 light | 59.51, 58.42, 57.56, 56.88, 56.37, 56 (seal centre 720.05, 720.03, 720.02, 720, 720, 719.98) | 383 | 0 / 0 | 0.02 (1) | 125 (0) | 322 → 56 |
| keyframes.babb.dev | WebKit | 390 touch dark | 67.95, 64.84, 62.29, 61.16, 60.32, 60 (seal centre 195.16, 195.15, 195.01, 195, 195, 195) | 541 | 0 / 0 | 0 (1) | 84.8 (0) | 246 → 60 |
| keyframes.babb.dev | WebKit | 390 touch light | 66.65, 63.8, 62.01, 60.8, 60.14, 60 (seal centre 195.16, 195.02, 195.01, 195, 195, 195) | 530 | 0 / 0 | 0 (1) | 84.8 (0) | 246 → 60 |
| keyframes.babb.dev | WebKit | 1440 dark | 64.14, 62.92, 57.39, 56.99, 56.4, 56 (seal centre 720.02, 720.02, 720, 720, 720, 720) | 521 | 0 / 0 | 0 (1) | 125 (0) | 322 → 56 |
| keyframes.babb.dev | WebKit | 1440 light | 66.1, 62.04, 59.28, 57.39, 56.25, 56 (seal centre 720.23, 720.02, 720.01, 720, 720, 720) | 500 | 0 / 0 | 0 (1) | 125 (0) | 322 → 56 |
| color.babb.dev | Chromium | 1440 dark | 61.67, 59.96, 58.52, 57.46, 56.6, 56 (seal centre 720.05, 720.03, 720.02, 720, 720, 719.98) | 483 | 0 / 0 | 0.02 (1) | 206.1 (0) | 484 → 56 |
| color.babb.dev | Chromium | 1440 light | 61.64, 59.9, 58.52, 57.43, 56.59, 56 (seal centre 720.05, 720.03, 720.02, 720, 720, 719.98) | 491 | 0 / 0 | 0.02 (1) | 206.1 (0) | 484 → 56 |
| color.babb.dev | WebKit | 1440 light | 69.09, 63.27, 59.48, 58.23, 57.35, 56 (seal centre 720.02, 720.01, 720, 720, 720, 720) | 515 | 0 / 0 | 0 (1) | 206.1 (0) | 484 → 56 |
| daraksha.babb.dev | Chromium | 390 touch dark | 58.32, 57.6, 57.03, 56.63, 56.24, 56.01 (seal centre 194.29, 194.51, 194.69, 194.81, 194.92, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | Chromium | 390 touch light | 58.34, 57.68, 57.04, 56.59, 56.27, 56 (seal centre 194.28, 194.48, 194.68, 194.82, 194.92, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | Chromium | 1440 dark | 63.81, 60.45, 59.2, 57.42, 56.86, 56 (seal centre 718.44, 719.12, 719.37, 719.71, 719.83, 719.98) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | Chromium | 1440 light | 59.32, 58.24, 57.42, 56.8, 56.33, 56.01 (seal centre 719.34, 719.55, 719.71, 719.84, 719.92, 720) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | WebKit | 390 touch dark | 65.43, 61.91, 59.47, 57.43, 56.2, 56 (seal centre 192.11, 193.19, 193.94, 194.56, 194.94, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | WebKit | 390 touch light | 63.97, 60.89, 58.56, 57.23, 56.13, 56 (seal centre 192.55, 193.5, 194.22, 194.62, 194.96, 195) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | WebKit | 1440 dark | 64.91, 61.31, 58.62, 57.11, 56.18, 56 (seal centre 718.26, 718.84, 719.43, 719.75, 719.96, 720) | none (the motion's last frame is the settle) | – | – | – | – |
| daraksha.babb.dev | WebKit | 1440 light | 64.13, 60.77, 58.5, 56.9, 56.05, 56 (seal centre 718.42, 718.96, 719.45, 719.8, 719.99, 720) | none (the motion's last frame is the settle) | – | – | – | – |

### Item 5 table: tooltips seen (the visible box is reka's popper wrapper; the anchor seat is the seat nearest along the dock's axis)

| where | engine | cell | route | tooltip box x, y, w, h | anchor seat box | anchor is the theme seat | centre offset along the dock (px) | gap (px) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| glass.babb.dev sidebar | Chromium | 1440 dark | open-hover | 70, 29.5, 103.5, 36.7 | 20, 28, 40, 40 | no | -0.15 | 10 |
| glass.babb.dev sidebar | Chromium | 1440 dark | theme-hover-in | 70, 317.5, 54.6, 36.7 | 20, 316, 40, 40 | no | -0.15 | 10 |
| glass.babb.dev sidebar | Chromium | 1440 light | open-hover | 70, 29.5, 103.5, 36.7 | 20, 28, 40, 40 | no | -0.15 | 10 |
| glass.babb.dev sidebar | Chromium | 1440 light | theme-hover-in | 70, 317.5, 54.6, 36.7 | 20, 316, 40, 40 | no | -0.15 | 10 |
| glass.babb.dev bottom dock | WebKit | 390 touch dark | close-scroll | 131, 736, 129.9, 33.8 | 174, 780, 44, 44 | no | -0.03 | 10.2 |
| glass.babb.dev bottom dock | WebKit | 390 touch light | close-scroll | 131, 736, 129.9, 33.8 | 174, 780, 44, 44 | no | -0.03 | 10.2 |
| glass.babb.dev sidebar | WebKit | 1440 dark | theme-hover-in | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | theme-hover-in | 70, 317.5, 52.4, 36.7 | 20, 316, 40, 40 | no | -0.15 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | open-hover-2 | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | theme-press | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | open-press | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | close-outside | 73, 25.5, 101.1, 36.7 | 23, 24, 40, 40 | no | -0.14 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | open-hover-3 | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 dark | close-scroll | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | theme-hover-in | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | theme-hover-in | 70, 317.5, 52.4, 36.7 | 20, 316, 40, 40 | no | -0.15 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | open-hover-2 | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | theme-press | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | open-press | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | close-outside | 73, 24.5, 101.1, 36.7 | 23, 22.9, 40, 40 | no | -0.02 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | open-hover-3 | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| glass.babb.dev sidebar | WebKit | 1440 light | close-scroll | 70, 29.5, 101.1, 36.7 | 20, 28, 40, 40 | no | -0.16 | 10 |
| keyframes.babb.dev | Chromium | 390 touch dark | theme-press | 242.3, 84.7, 80.5, 33.8 | 260.7, 36.7, 44, 44 | yes | -0.1 | 3.9 |
| keyframes.babb.dev | Chromium | 390 touch light | theme-press | 242.3, 84.7, 80.5, 33.8 | 260.7, 36.7, 44, 44 | yes | -0.1 | 3.9 |
| keyframes.babb.dev | Chromium | 1440 dark | theme-hover-in | 800.5, 10.5, 91.9, 36.7 | 826.5, 51.3, 40, 40 | yes | -0.05 | 4 |
| keyframes.babb.dev | Chromium | 1440 dark | theme-hover-out | 800.5, 10.5, 91.9, 36.7 | 826.5, 51.3, 40, 40 | yes | -0.05 | 4 |
| keyframes.babb.dev | Chromium | 1440 dark | theme-press | 800.5, 10.5, 91.9, 36.7 | 826.5, 51.3, 40, 40 | yes | -0.05 | 4 |
| keyframes.babb.dev | Chromium | 1440 light | theme-hover-in | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.1 | 4 |
| keyframes.babb.dev | Chromium | 1440 light | theme-hover-out | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.1 | 4 |
| keyframes.babb.dev | Chromium | 1440 light | theme-press | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.1 | 4 |
| keyframes.babb.dev | WebKit | 390 touch dark | close-outside | 167.3, 84.7, 55.1, 33.8 | 173, 36.7, 44, 44 | no | -0.1 | 3.9 |
| keyframes.babb.dev | WebKit | 390 touch dark | open-tap-3 | 170.3, 84.7, 55.1, 33.8 | 176.1, 36.7, 44, 44 | no | -0.22 | 3.9 |
| keyframes.babb.dev | WebKit | 390 touch light | close-outside | 167.3, 84.7, 55.1, 33.8 | 173, 36.7, 44, 44 | no | -0.1 | 3.9 |
| keyframes.babb.dev | WebKit | 390 touch light | open-tap-3 | 170.3, 84.7, 55.1, 33.8 | 176.3, 36.7, 44, 44 | no | -0.39 | 3.9 |
| keyframes.babb.dev | WebKit | 1440 dark | open-hover | 693, 10.5, 61.9, 36.7 | 704, 51.3, 40, 40 | no | -0.07 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | open-hover | 548, 2.5, 61.9, 36.7 | 559, 43.3, 40, 40 | no | -0.02 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | theme-hover-in | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.09 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | theme-hover-out | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.09 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | open-hover-2 | 693, 10.5, 61.9, 36.7 | 704, 51.3, 40, 40 | no | -0.07 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | open-hover-2 | 548, 2.5, 61.9, 36.7 | 559, 43.3, 40, 40 | no | -0.02 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | theme-press | 548, 2.5, 61.9, 36.7 | 571, 52, 115.3, 38.5 | no | -49.68 | 12.8 |
| keyframes.babb.dev | WebKit | 1440 dark | open-hover-3 | 693, 10.5, 61.9, 36.7 | 704, 51.3, 40, 40 | no | -0.07 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | open-hover-3 | 548, 2.5, 61.9, 36.7 | 559, 43.3, 40, 40 | no | -0.02 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 dark | close-scroll | 548, 2.5, 61.9, 36.7 | 571, 52, 115.3, 38.5 | no | -49.68 | 12.8 |
| keyframes.babb.dev | WebKit | 1440 light | open-hover | 693, 10.5, 61.9, 36.7 | 704, 51.3, 40, 40 | no | -0.07 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | open-hover | 548, 2.5, 61.9, 36.7 | 559, 43.3, 40, 40 | no | -0.02 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | theme-hover-in | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.09 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | theme-hover-out | 802.5, 10.5, 92.9, 36.7 | 829, 51.3, 40, 40 | yes | -0.09 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | open-hover-2 | 693, 10.5, 61.9, 36.7 | 704, 51.3, 40, 40 | no | -0.07 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | open-hover-2 | 548, 2.5, 61.9, 36.7 | 559, 43.3, 40, 40 | no | -0.02 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | theme-press | 548, 2.5, 61.9, 36.7 | 571, 52, 115.3, 38.5 | no | -49.68 | 12.8 |
| keyframes.babb.dev | WebKit | 1440 light | open-hover-3 | 693, 10.5, 61.9, 36.7 | 704, 51.3, 40, 40 | no | -0.07 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | open-hover-3 | 548, 2.5, 61.9, 36.7 | 559, 43.3, 40, 40 | no | -0.02 | 4.1 |
| keyframes.babb.dev | WebKit | 1440 light | close-scroll | 548, 2.5, 61.9, 36.7 | 571, 52, 115.3, 38.5 | no | -49.68 | 12.8 |
| daraksha.babb.dev | Chromium | 1440 dark | theme-hover-in | 853.5, 790, 92.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.9 |
| daraksha.babb.dev | Chromium | 1440 dark | theme-hover-out | 853.5, 790, 92.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.9 |
| daraksha.babb.dev | Chromium | 1440 light | theme-hover-in | 853.5, 790, 92.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.9 |
| daraksha.babb.dev | Chromium | 1440 light | theme-hover-out | 853.5, 790, 92.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.9 |
| daraksha.babb.dev | WebKit | 1440 dark | theme-hover-in | 854, 790, 91.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.8 |
| daraksha.babb.dev | WebKit | 1440 dark | theme-hover-out | 854, 790, 91.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.8 |
| daraksha.babb.dev | WebKit | 1440 light | theme-hover-in | 854, 790, 91.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.8 |
| daraksha.babb.dev | WebKit | 1440 light | theme-hover-out | 854, 790, 91.9, 36.7 | 877.9, 830.5, 44, 44 | yes | 0 | 3.8 |

## Cells not run, and why

- **Glass's demo shell from the archive builds (v11.1.0 and wi8), every cell, both engines.** Under `vite preview` the archive build's demo shell did not mount. After 8 s `#app` was still empty, with no page error, no console error, no failed request and two scripts loaded. This was inspected at v11.1.0's `/` and `/?capture=/dock/overview&motion=1`, and at wi8's `/dock/chrome`. The cause was not found. The audit wrapper's `?c=` path in the same builds mounts. Two pages stand in:
  - the deployed demo (glass.babb.dev, master 22c4ea976, whose dock source is the same as v11.1.0's);
  - the harness's GlassDock page, built from both trees.
- **The harness dock page at 390 touch.** The tap did not open the dock in three of the four tree and engine pairs:
  - Chromium at v11.1.0: each tap gave 284 ms of motion with no width change.
  - Chromium at wi8: the dock was 247 px wide from load and no frame changed.
  - WebKit at wi8: no frame changed.

  WebKit at v11.1.0 opened once (`open-tap`) and closed once (`close-outside`). The fourier repro covers 390.
- **Item 3 and item 5 where there is no theme seat to reach:**
  - the harness dock page (it has none);
  - glass.babb.dev at 390 (the theme seat is in the sidebar, which is hidden at 390);
  - color.babb.dev at both widths (its theme control is in a menu, not a dock seat).
- **color.babb.dev at 390.** The dock never collapses at 390 (`collapse=false`), so there is no open or close to record.
- **Routes:**
  - **Toggle close.** v11.1.0 has none: the seal is inert while the dock is expanded. The only toggle close in the record is on the harness page at wi8. There, a press meant to open the dock came after Escape had failed to close it, and the press closed it.
  - **Escape.** It closed fourier, the repro (both trees), glass, keyframes and color. It did not close daraksha (11.0.2) or the harness page (either tree).
  - **Scroll.** Only the repro folds on scroll (fourier's `FOLD_PX` on `<main>`). fourier.babb.dev/w does not scroll at either width, and glass's `GlassDock` has no scroll collapse, so the scroll route moved nothing on the live sites.
  - **Idle close at 390.** Touch has no hover dwell, so this route has no cells.
  - **First hover open.** color's dock and glass's sidebar start open on desktop, so their first hover open has no cell.
- **The native tooltip.** fourier's theme seat has no DOM tooltip. Its tooltip is the browser's native `title` (`DarkModeToggle.vue` at 266bd6728 binds `:title`, and `DockControl` at v11.1.0 renders none). Neither headless engine draws a native tooltip, and real Safari was out of bounds for this seat (no safaridriver, no headed browser). So the owner's frame for item 5 is not in the record.
- **color.babb.dev's dark cells in WebKit, both widths.** The WebKit page crashed (`page.evaluate: Target crashed`) once the light cell had finished. The light cells are recorded.
- **Real Safari and the GPU-lane Chromium.** Neither was run. The record holds boxes, not pixels.


## How it was recorded

- **Driver and sampler.** The animation harness's `sampler.js` (`docs/tranches/BL/audit/animation/harness/`) is used unchanged; it reads one row per rendered frame. `tools/probe.mjs` is a copy of the harness's `probe.mjs` with its changes marked `dock-frames:`. It reads the trees from `trees/`, takes an absolute URL for a live site, and taps through Playwright in WebKit, which has no CDP. It also adds `hoverIf` and `clickIf`, which skip with a note when the theme seat is not on the page. Each probe call launches one browser and opens a context per cell, closing both in `finally`. Chromium touch goes through CDP `Input.dispatchTouchEvent`.
- **Cells.** 1440×900 with a fine pointer, and 390×844 with touch (`hasTouch`, `isMobile`, tap). Each in light and dark, at device scale factor 2, in Chromium and WebKit.
- **Routes**, in this order:
  - At 1440:
    - hover open;
    - theme seat hover in, then out;
    - close on the idle timer;
    - hover open;
    - theme seat press, which toggles the scheme;
    - press back;
    - Escape with focus in the full layer;
    - press open;
    - press outside;
    - hover open;
    - wheel scroll of the page's scroller;
    - scroll back.
  - At 390, the same by tap: open, theme press and press back, Escape, open, tap outside, open, scroll, scroll back.
  - A route that moved nothing is listed as still in `record/summary.json`.
- **Stamping.** A `before` script stamps the elements:
  - `data-df=dock` on the dock, by a named selector per site, else the first collapsible `.glass-dock`.
  - `data-df=theme` on the theme seat.
  - A 2 px inert rest point for "press outside", found by `elementFromPoint`, off every control, dock and popper.
  - The page's scroller.
- **What each row holds.**
  - The boxes of the dock, the plate, the seal (the summary layer), the run, every seat, the theme seat and its glyph, every `[role=tooltip]`, and every reka popper wrapper. A reka tooltip's `[role=tooltip]` is a 1 px hidden copy, so the visible tooltip box is its popper wrapper.
  - The dock's computed width, class, `data-morphing`, `--dock-t` and `--dock-morph-t`.
  - The effective opacity chain of the seal and the run.
  - The theme seat's `aria-pressed` and `title`.
  - `html`'s class.
- **Segments** (`tools/analyse.mjs`). A segment is a run of changing frames, split at 250 ms of stillness. It takes the route mark at or before its 30th frame. A morph is a segment whose plate width travels more than 40 px. The short segment that follows a morph under the same route is its settle frame. For a vertical dock, the axis readings take y and height. Per segment the analysis records:
  - the plate's edge and centre ranges;
  - the first, second and last width steps against their neighbours;
  - long frames over 25 ms;
  - the largest one-frame opacity step of the seal and of the run;
  - the drift of the seat and seal centres while each is visible;
  - the settle frame's deltas;
  - the theme seat's box and glyph changes, and when they happen;
  - every visible tooltip against the seat nearest it along the dock's axis.
- **Trees.**
  - `v11.1.0` is `git archive v11.1.0` (d19e12559). `wi8` is `git archive bl/dock/wi8` (d48c19ec8). Both are built with the demo's dist config into `trees/<name>/dist-demo` and served by `vite preview`, v11.1.0 on 5371 and wi8 on 5372.
  - The fourier repro (`tools/mounts/fourier-dock.vue`, `?c=fourier-dock`) rebuilds fourier's `AppDock.vue` at fourier-analysis origin/master 266bd6728 seat for seat. It has a fixed full-page stage, a centred header and a `<main>` scroller that folds the dock after 48 px of scroll, as fourier's `FOLD_PX` does. The dock's seats, in order:
    - the wordmark;
    - the Visualize dropdown trigger;
    - a separator;
    - three page seats in glass tooltips;
    - a separator;
    - the Log in and About popovers;
    - the theme seat, a `DockControl` with `aria-pressed` and a native `title`.
  - The harness dock page is the harness's `app/mounts/dock.vue` (`?c=dock`), dock `dock-h-closed`.
- **Live sites, read only.** The glass-ui version each serves is read from the pin at the repo's main ref. The served bundle was not fingerprinted.

  | site | URL | dock | glass-ui |
  | --- | --- | --- | --- |
  | fourier | fourier.babb.dev/w | the header dock | 11.1.0 (`web/package.json`, fourier-analysis origin/master 266bd6728) |
  | keyframes | keyframes.babb.dev | the chrome dock | 11.1.0 (keyframes.js origin/master f37740c87) |
  | color | color.babb.dev | the site dock | 11.1.0 (value.js origin/master 243d0b364, whose `CNAME` is color.babb.dev) |
  | daraksha | daraksha.babb.dev | the site dock (`.site-dock`); the theme seat is `.theme-control` in the separate theme dock | 11.0.2 (daraksha origin/master 61b36f079) |
  | glass | glass.babb.dev/dock/chrome | the shell's collapsible docks: the sidebar at 1440, which holds the theme seat, and the bottom dock at 390 | master 22c4ea976; its dock source is the same as v11.1.0's |

- **Guard.** Every build, preview and browser run went through `~/.claude/guard/guarded`:
  - Chromium runs took a browser slot.
  - WebKit runs ran under `--exclusive webkit`.
  - The preview servers were started and stopped by PID inside the guarded run.
  - The sampled load average was 13–50 during the runs, so long-frame counts are load-sensitive; box drifts are not.

## Files

- `record/<scenario>.<tree>.<engine>.<cell>.json` holds one file per cell: its meta and every motion segment, with the per-frame series of every box, opacity, transform and attribute listed above. Frames where nothing moved are not stored; `stillRoutes` names the routes that moved nothing.
- `record/summary.json` holds every cell's segments without the series.
- `record/items.json` holds the five items per cell, which the tables print.
- `tools/` holds the code:
  - `scenarios.mjs` writes `tools/scenarios/*.json`.
  - `run.sh <engine> <targets>` runs the probe per target and cell.
  - `analyse.mjs`, `items.mjs` and `tables.mjs` turn rows into the record.
  - `report.mjs` prints one line per segment.
  - `edge-scan.mjs` scans every frame for a popper at the screen's left edge or a popper that jumps.
  - `inspect-docks.mjs` lists the docks on a page.
  - `mounts/fourier-dock.vue` is the fourier repro.
  - `build-tree.sh` builds a tree with the study's mounts.
- To rerun:
  1. Make `trees/` with a `.gitignore` of `*`. `git archive` each ref into `trees/<name>` (`v11.1.0`, `wi8`) and run `npm ci --ignore-scripts` there. The probe borrows `trees/v11.1.0`'s Playwright for the live sites.
  2. `~/.claude/guard/guarded --timeout 20 -- tools/build-tree.sh trees/<name>`.
  3. `~/.claude/guard/guarded --timeout 60 -- tools/run.sh chromium <targets>`, then `~/.claude/guard/guarded --exclusive webkit --timeout 40 -- tools/run.sh webkit <targets>` (all seven targets took 15 minutes).
  4. `node tools/analyse.mjs trees/raw/*.rows.json --out record && node tools/items.mjs && node tools/tables.mjs`.
- The raw rows (`trees/raw`, 3 to 12 MB per cell, every frame including the still ones) and the trees were deleted when the study finished.

