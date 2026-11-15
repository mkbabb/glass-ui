# The last ten percent: inventory

Measuring seat, claude-opus-5-5, 2026-11-15. Read-only; nothing in `src` changed.

## Count

| Item | Enumerated | Exercised | Not exercised, and why |
|---|---|---|---|
| 1. Frame budget at a 4x CPU throttle, phone sizes | 15 open/close pairs at 390x844 and 360x780 (60 motions), 2 drags, 37 demo-shell transitions | 56 of 60 motions, both drags, all 37 transitions | the Carousel open/close (no dot hit; see item 2) at both sizes (4) |
| 2. Interruption and reversal | 16 components x 6 reversal points (25/50/75 % of the open, of the close) | 15 components at 1440 (90 cells); 13 at 390 touch (50 % only under throttle); WebKit: see the last section | the dock's layer change: a tap on a switcher tab does not switch (O-312, still on 11.1.0), so there is no travel to reverse |
| 3. Phone and tablet viewports | 20 pages x 4 viewports (360x780, 430x932, 844x390, 820x1180), touch | 80 cells in Chromium on 11.1.0; 40 on 11.0.2 (360x780, 844x390) | the Toaster's stacking cell (the story has one trigger, `toaster-1` does not exist), 4 cells |
| 4. Scroll and pan | 6 surfaces for scroll lock; 7 inner scrollers; the progress rim; Slider and Tabs out of bounds and on pointercancel; input response on 10 controls | lock on 5 of 6; 3 of 7 scrollers; rim; all four drag cells; 10 of 10 latency cells | Popover lock (the gesture point fell outside the viewport, a probe error); Select list, Sheet body, Dialog body (the stories' content fits, nothing scrolls); DataTable (no inner scroller at any width: the page scrolls); the rim (see item 4 below) |
| 5. Inside the demo shell | 92 routes, back x4, forward x4, a double navigation, theme x2, resize or rotate x2, per cell (1440, 390 touch, 4x 390) | 390 touch: all 105 transitions; 4x 390: 24 routes and all 13 others | 1440: all (the browser closed on the second route, see item 5); 4x 390: 68 routes (cut to fit the guard's slot) |
| 6. Release tips | `release/11.1.0` @ `acd8db1eb`, `release/11.0.2` @ `b11a018e5` | 11.1.0 everywhere; 11.0.2 for the motion and drag sets and the viewport subset | see item 6 |
| 7. Timing table | every interaction above | `TIMINGS.tsv` | |

How the denominator was built: `tools/census.mjs` loaded every audit page (60 names in the harness registry, plus `dock-full` from the dock record) and every demo route the router lists (`$router.getRoutes()`, 92 without parameters); all 60 pages and the shell mounted with no error. The component list for item 2 is the brief's.

## Method notes that change how to read the numbers

- The first audit's builds tree-shook the demo entry: the package declares `"sideEffects": ["*.css"]`, so the wrapper's bare `import("./main.demo")` became a 71-byte chunk and no demo route mounted. `tools/build-tree-lt.sh` gives `main.demo.ts` one export and reads it; the demo shell (dock and aurora live) now serves at every route. The harness's own `build-tree.sh` still has the fault.
- Every story page in the harness is 12 to 20 px wider than the viewport at phone and tablet widths (13 px at 360 and 430, 20 px at 844 and 820), and the hand pages (`dock`, `slider`, `tabs`, `dock-full`) more, from their fixed-width cells. The real demo routes have no horizontal overflow at 390 or 844 (`logs/shell/`). So the overflow is the harness and story frame, not glass, and the overlay gutters read on story pages at phone widths are off by that much (a Sheet's box reads `r = -13`). No finding is filed from them.
- Headless Chromium renders at about 120 Hz here. "Dropped at 60" counts the 60 Hz frames a gap would lose (a 50 ms gap is 2). The 4x throttle is `Emulation.setCPUThrottlingRate`; it slows script and style, not the GPU, so CSS-only motions keep a 10 ms frame under it and the cost shows where script runs.
- A reversal "jumps" when one frame's change is more than three times its neighbours' and more than 6 % of the travel. "Speed flips" means the position turns where it is but the velocity changes sign in one frame (a CSS transition retargeting).

## 1. Frame budget, 4x throttle (390x844 and 360x780, touch)

Right (no frame over 16.7 ms that drops a 60 Hz frame, at both sizes): Accordion open and close; Collapsible open and close; Tabs indicator glide; Switch; Pager hop; Slider drag past its end (one 18 ms frame); Tabs drag and release outside (one 17 ms frame); the theme change in the shell (25 ms, 0 dropped).

Not right, filed: every overlay's first frame (LT-6), the demo shell's route changes (LT-7). Numbers per motion are in `TIMINGS.tsv`.

## 2. Reversal

The table is in FINDINGS ("Reversal: what glass guarantees today"). Right:
- Dialog: reverses from where it is at 25, 50 and 75 % of its open (spring in script).
- Sheet, side and detented: the open reversed at 75 % (side) and at every point (detented) turns where it is.
- Tabs indicator and Switch: turn where they are at every point; the speed flips at 50 and 75 % (O-334 d, already booked).
- Dock: a fold reversed at 50 and 75 % turns where it is, after a wait (LT-4).

## 3. Viewports (Chromium 11.1.0; logs/viewport/)

Right, at every one of the four viewports:
- Select becomes the bottom sheet at 360 and 430 and stays the anchored popover at 844x390 and 820x1180; at 844x390 its list scrolls inside a 175 px plate that keeps 16 px from the bottom.
- Menu, Popover and Dialog fit inside the viewport with a gutter of at least 7 px at every size; at 844x390 the Menu and Popover plates are 179 px tall and scroll inside.
- The detented Sheet at 844x390 opens at 196 px from the top, 205 px tall, and scrolls inside.
- No text input, textarea or number field is under 16 px on a coarse pointer (no iOS zoom on focus) on any page.
- Command fits at every width (383 px plate, scrolls inside).
- Deck fits at every width.
- Small tap targets on a coarse pointer: filed as LT-18.

## 4. Scroll and pan

- Body scroll lock (Dialog, Sheet side, Sheet detented), 1440 mouse and 390 touch: the page does not move under the scrim or through the surface, the position is kept on close, the page scrolls again after, and the layout width does not change. Right.
- Menu and Select do not hold the page: filed as LT-15.
- FadingScroll's story scroller (`overscroll-behavior: contain`): reaches its end and the page does not move. Right at 1440; at 390 touch see LT-11.
- InfiniteScroll story scroller: the page moves 828 to 842 px after the list's end at 390 touch. The scroller is the story's own `div.max-h-[28rem] overflow-y-auto`, not the component's, so it is not filed.
- Command list chains to the page: LT-14.
- The sticky `.scroll-progress` bar in the scroll story holds its y (365.88 px every frame of the scroll). Right. Its scale lags its scroller on 31 of 479 frames under touch scroll (part of LT-11).
- The ScrollProgressRim lives on the Progress story, where no scroller drives it on this tree; the rim was not exercised.
- Slider dragged 200 px past its end, 120 px off the track and back, mouse and touch: the thumb clamps 8 px inside the track's end, trails the pointer by a median 0.8 to 0.9 px (2.2 px at most), never moves against it, resumes 1:1 when the pointer comes back over the track, and releases with no step. Right.
- Slider pointercancel (touch): the value stays where the finger left it (40 to 13), the hold clears, no lens or veil remains. Consistent and right.
- Tabs out of bounds and pointercancel: LT-2, LT-3.
- Input response, pointerdown to the first changed frame (1440 mouse): Button 2 frames (19.7 ms), Switch 2 (24.5 ms), Checkbox 2 (22 ms), Slider track press 0 (7.5 ms), Select open 0 (1 ms), Menu open 2 (21.9 ms), Dialog open 2 (17.1 ms), dock seat 0 (1.1 ms). Right. Tabs (142 ms) and Accordion (130 ms) answer on release, not on press: LT-17.

## 5. Demo shell (logs/shell/)

- The dock is the same node across all 92 routes, back, forward, the double navigation, the theme change and the rotation (no remount). Right.
- No horizontal overflow on any route at 390 or after the 844x390 rotation. Right.
- Layout shift: total CLS per transition at most 0.036 (the first route, the shell dock settling), 0.033 on `/data/infinite-scroll`, 0.013 on `/motion/text-motion`; every other transition 0 to 0.002. Right (under the 0.05 a visitor would see).
- Back and forward at 390: every transition with a 10 ms longest frame. Right.
- The theme change: 10 ms longest frame at 390, 25 ms at 4x. The cut itself is O-333.
- No view transition animation was seen on any SPA push (the router was driven directly, as a link click does; `useRouteTransition` did not engage). Route-change motion therefore was not read; frame cost was.
- Errors: one runtime error, on `/dock/dock-search` (LT-1).
- 1440: not exercised. Headless Chromium closed the whole browser on the second push (`/foundations/intro` to `/foundations/colors`) in three of three runs, on both tips, at 1440x900, 2x DPR; never at 390. Not attributed to glass (likely the headless GPU process). Logs: `shell-11.1.0-d1440.log`, `shell-11.0.2-d1440.log`.

## 6. The two tips

See FINDINGS, "11.0.2 against 11.1.0".

## 7. Timing

`TIMINGS.tsv`, one row per animation that ran in each interaction, with the token the curve matches.
