# The last ten percent: findings

Measuring seat, claude-opus-5-5, 2026-11-15. Read-only. Trees: release/11.1.0 @ acd8db1eb (all cells), release/11.0.2 @ b11a018e5 (motion, drag, viewport subset), built by tools/build-tree-lt.sh, served on 5411/5412. Source lines are 11.1.0's. Chromium = Playwright headless shell, about 120 Hz; WebKit = Playwright's build, not Safari.

23 findings: 6 broken, 9 jitter, 4 inconsistent, 4 polish. 12 new; 11 add numbers to booked rows. Evidence paths are under logs/ unless they start with films/. Rows files hold [frame, ms, value, mark]. The release column is the seat's proposal; the orchestrator's placement is INBOUND O-354.

Counts. Enumerated: 16 components × 6 reversal points; 15 open/close pairs at 4x for 390 and 360; 20 pages × 4 viewports; 6 scroll-lock surfaces; 7 inner scrollers; 4 drag cells; 10 latency cells; 92 demo routes plus 13 shell transitions per cell; 2 tips. Exercised (Chromium, 11.1.0): reversal 15 of 16 components at 1440 (90 cells), 13 at 390 touch; 4x budget 56 of 60 motions; viewports 80 of 80; scroll lock 5 of 6 surfaces; inner scrollers 3 of 7; drag 4 of 4; latency 10 of 10; shell at 390 105 of 105 transitions; shell at 4x 37. 11.0.2: motion, drag and the viewport subset (360×780 and 844×390).

## Findings

| id | component | cause (11.1.0) | tree | viewport / engine | what happens | should | severity | evidence | row / release |
|---|---|---|---|---|---|---|---|---|---|
| LT-1 | GlassDock, /dock/dock-search | useDockState.ts:403-415, the rootEl watcher calls root.addEventListener on a non-element | 11.1.0 (11.0.2 not reached) | 390 touch, Chromium | every visit throws "TypeError: e.addEventListener is not a function" at mount; the press listeners are never attached | no error | broken | shell/11.1.0.chromium.p390.json | new; next patch |
| LT-2 | SegmentedTabs | useDragMorph.ts:375-389, :400, pointercancel handled as pointerup | both | 390 touch, Chromium | a 70 px drag then a cancel: selection Grid to Kanban, a 27.6 px step, then a 135.7 px jump | cancel returns to the starting tab | broken | drag/11.1.0.chromium.touch390.json tabsCancel; same for 11.0.2 | new; next patch with O-312 |
| LT-3 | SegmentedTabs | useDragMorph.ts:349-372, unbounded follow; release is O-312 | both | 1440 mouse, 390 touch | pill right edge 553.5 against a strip ending at 361.6 (1440), 459 against 277.3 (390, off-screen); on release it settles, rests 300 ms, then jumps 265.2 px (203.5 at 390) and glides again | stays in its track, rubber-bands a few px, settles once | broken | drag/tabs-oob.11.1.0.chromium.fine.json f103-f204 | O-312 (the jump); out of bounds is new; 11.1.1 |
| LT-4 | GlassDock | useDockState.ts:505-529, 60 ms intent dwell during a fold | both | 1440, Chromium | re-hover at 25 % of the fold: no reopen, folds to 56 px; at 50/75 %: folds 83 ms more (115 to 65 px), then turns | reopens from where it is within 1-2 frames | broken | motion/rows/dock-collapse.*.rev-close-{25,50,75}.json | O-330(c); the 25 % case is new; W-I.8 |
| LT-5 | Dialog, Sheet (side, detented), Select | ModalScrim.vue:24 pointer-events auto during the exit; Select's close guard | both | 1440, 390, Chromium | a trigger click during the close is ignored at 25/50/75 %: Dialog fades to 0, side Sheet runs to 1436 px and unmounts. Menu and Popover do reopen | reopen from where it is | broken | logs/revtable-11.1.0-chromium-fine.txt | O-321(a) extends; 11.1.1 |
| LT-6 | overlay first frame (Menu, Select, Popover, Dialog, Sheets, Toast) | mount work (Vue runtime-dom, 34-181 ms of script) in the motion's first frame | 11.1.0 | 4x 390/360; 1x 1440 | longest frame at 4x, 390/360: Menu 224.9/135.1 (13/7 frames lost), Sheet side 108.6/75, detented 108.4/83.4, Select 92.4/75.7, Dialog 84.9/83, Popover 84.1/75.1, Toast 50.9/31.8; the rest of each motion 8-10 ms. At 1x: Dialog 41.6, Menu 34.3, Popover 33.4 | first frame within budget | jitter | motion/11.1.0.chromium.t4x390.json, t4x360.json | O-321(b) for the Dialog; rest new; cure 11.2.0 |
| LT-7 | demo shell route change (canvas and heavy pages) | canvas mount and first frame (createCanvasLifecycle.ts) in the route's first frame | 11.1.0 | 390, 1x and 4x | 1x: shadows 400 ms, overlays-scrims 310, fourier-field 292 (42 frames lost), blob 250, dock/controls 218, aurora 191; median 10.3 over 92 routes. 4x: aurora 1126 ms (70 lost), fourier 460, music-staff 341; median 84 over 24 | route paints first, canvas fades in after | jitter | shell/11.1.0.chromium.p390.json, t4x390.json | new; 11.2.0 |
| LT-8 | DropdownMenu, Select clip-grow | animations.css:191-255 fixed-start keyframes swapped by reveal.css:277-291 | 11.1.0 (11.0.2 the same via the scale reveal) | 1440, 390, Chromium | open reversed at 25 %: Menu 201 to 594 px in one frame (71 %, 6.2x neighbours), Select 169 to 405 (64 %); reopen during close restarts 393 to 40 (64 %) | clip turns from its current edge | jitter | films/lt-menu-reverse.*.reverse-open.png, *.reverse-close.png; motion/rows/dropdown-menu.11.1.0.chromium.fine.rev-open-25.json f23 | O-313 rule E; 11.1.1 |
| LT-9 | Popover, Tooltip, Toast | animations.css:157-162 (reveal-out starts at 1); reveal.css:141 Tooltip enter keyed on data-state; Toast.vue:131, animations.css:431-507 vaporize from full opacity | both | 1440, 390 | Popover reversed 0.29 to 1.00 in one frame; reopened mid-close 0.21 to 1.00 (28.7x); Tooltip 0 to 1 in 8 ms; Toast dismissed mid-enter 0.51 to 1.00, opaque for a frame, then vaporizes | turn from the current opacity; Tooltip fades in | jitter | motion/rows/popover.*.rev-close-75.json; films/lt-toast-dismiss-mid-enter.*.reverse-dismiss.png f24-f25 | O-313(a)(b); Toast number new; 11.1.1 |
| LT-10 | Accordion, Collapsible | disclosure.css:7-27, two fixed-end keyframes | both | 1440, 390 | reversed at 25 %: Collapsible 25.9 to 80.9 px in one frame (68 %, 13x neighbours); Accordion 59.8 to 0; still 22 % at 75 % | height turns where it is | jitter | films/lt-collapsible-reverse.*.reverse-open.png | O-319(a); 11.1.1 |
| LT-11 | scroll story: .scroll-progress and [data-scroll-reveal] | scroll-driven.css view() per child plus scroll() bar | 11.1.0 | 390 touch, Chromium | touch scroll and fling: longest frame 291.5 ms (16 lost, 422 px step), a second run 90.5 ms; bar stale on 31 of 479 frames; 1440 wheel holds 10 ms | compositor-only, no frame over 16.7 ms | jitter | scroll/11.1.0.chromium.touch390.json inner[0] | new; next patch after a WebKit read |
| LT-12 | PagerDots reversed | PagerDots.vue:480-481, stagger under a retarget | both | 1440 | reversed at 25 %: worm steps 16.4 px forward (42 %, 8.4x), then turns | turns where it is | jitter | motion/rows/pager.*.rev-open-25.json | O-328(i); 11.1.1 |
| LT-13 | Carousel | native scroll-snap with snap-stop always, CarouselContent.vue:10-13 | 11.1.0 | 390 CDP touch | a second drag 25 % into the snap: 27.5 px step, runs on to the next card (-365.6), then returns | finger catches the strip | jitter | motion/rows/carousel-drag.11.1.0.chromium.touch390.0.25.json f71 | new; not in WebKit; next patch after a device read |
| LT-14 | Command list | command/styles.css:80-90, no overscroll-behavior | both | 390, 1440 | chains to the page: 2,473 px at 390, 1,389 at 1440; Select viewport and FadingScroll contain | inner lists contain | inconsistent | scroll/11.1.0.chromium.{touch390,fine}.json | new; next patch |
| LT-15 | DropdownMenu, Select (popover form) | no lock, no close-on-scroll for non-modal surfaces | 11.1.0 | 1440, 390 | page scrolls 600 px under an open Menu (575 at 390), Menu stays open; Select the same at 1440; Dialog and Sheet hold at 0 | one behaviour (hold, or close on scroll) | inconsistent | scroll/*.json lock | new; 11.2.0 |
| LT-16 | overlay timing set | motion-registers.css:70-107 and the script springs | both | 1440 | open/close ms: Dialog 150/308, detented Sheet 358/460, side Sheet 800/200, Popover 275/251, Menu 274/124, Select 259/125, Toast 300 (0.95 at 476, 1 at 600)/250, Tooltip 8/124 | exits shorter than entrances; panels in one band | inconsistent | TIMINGS.tsv | O-313(d), O-321(c), O-264; set new; 11.2.0 |
| LT-17 | SegmentedTabs, Accordion trigger | act on click, no press state | both | 1440, 390 | pointerdown to first change: Tabs 142 ms, Accordion 130 (release only); Button, Switch, Checkbox, Menu 17-25 ms; Slider and dock seat 0 frames | press state within a frame | inconsistent | drag/*.fine.json latency | new; 11.2.0 (W-B.17) |
| LT-18 | coarse tap targets | 44 px floor not applied | 11.1.0 | 360x780, 844x390 | dock layer tabs 28x28; run buttons 28 px tall; DataTable sort headers 21 px tall; Carousel dots 32x32 | 44 px, as Tabs got in 95c3c22f2 | polish | viewport/11.1.0.chromium.json smallExamples | O-298; dots new (next patch) |
| LT-19 | DockLayerGroup switcher | DockLayerGroup.vue:60-66 | 11.1.0 | 1440 | tap on the third tab does nothing; the active indicator fades to 0 | switches | broken (booked) | films/lt-dock-layers.*.tap3.png | O-312; 11.1.1 |
| LT-20 | chevrons | btn.css:82-84 --ease-cartoon-punch | 11.1.0 | 1440 | rotate 200 ms, dips to -0.038, peaks 1.22 | no overshoot on a control | polish (booked) | TIMINGS.tsv | O-319(b); 11.1.1 |
| LT-21 | CSS spring tokens | scheme-spring.css:59-64 | 11.1.0 | all | unchanged: --spring-dock last stop 0.97317 (tabs, switch, 210 ms), --spring-bloom 0.9944 (menu grow, 370 ms) | reaches 1 without a step | polish (booked) | TIMINGS.tsv | O-311; 11.1.1 |
| LT-22 | Dialog at 390 | full-viewport veil and scrim at 3x | 11.1.0 | 390 1x | one run of three: frames of 121 and 312 ms with no script (24 lost); throttled runs 85 and 83 ms | | jitter (unconfirmed) | motion/11.1.0.chromium.touch390.json loaf | O-321(b) at most; repeat on a quiet machine |
| LT-23 | Tooltip timing | as LT-9 | both | 1440 | the only floating surface with no enter animation; exit 120 ms | | polish | TIMINGS.tsv | O-313(b) |

## Reversal: what glass guarantees today

Chromium 1440; the two tips read the same.

| Component | Guarantee |
|---|---|
| Select | none (open jumps to full; reopen during close ignored) |
| DropdownMenu | none (jumps; reopen restarts from the strip) |
| Popover | none (jumps to opacity 1 both ways) |
| Tooltip | none on enter (appears whole) |
| Dialog | reverses on open only (reopen during close ignored) |
| Sheet, side | partial (reverses from 75 % of the open; reopen during close ignored) |
| Sheet, detented | reverses on open only |
| Accordion | none (restarts from the far end) |
| Collapsible | none (restarts) |
| Dock collapse | partial (fold reversed at 50 and 75 % turns after 83 ms; at 25 % no reopen) |
| Dock layer change | not measurable (a tap does not switch, O-312) |
| Tabs indicator | position yes, speed flips at 50 and 75 % |
| Switch | position yes, speed flips |
| Toast | none (dismissed mid-enter jumps to opacity 1) |
| Carousel | none (a touch catch mid-snap is not taken; 27.5 px step) |
| PagerDots | none (worm jumps forward up to 42 % of travel) |

WebKit, 390 touch: the same verdicts for Select, Popover, Collapsible, Toast, Pager, Dialog, both Sheets, Tabs and Switch. The Menu turns in place at 50 % in WebKit instead of jumping. Tooltip enters in 85 ms and still jumps when reversed. In the WebKit scroll-lock run, Dialog and both Sheets hold the page, keep the position and keep the width.

In one line: glass reverses from position where a script spring or a CSS transition owns the motion (Dialog and detented Sheet opens, Tabs, Switch, the dock plate), and restarts or jumps wherever keyframes own it (menus, popover, tooltip, toast, disclosure). No modal surface can be reopened while it closes.

## 11.0.2 against 11.1.0

- Reversal: identical on every component.
- Drag: identical. Slider clamps at 450 against 452, lag 0.8-0.9 px. LT-2 and LT-3 the same on both.
- Latency: identical, except Select's touch open: 147 ms on 11.0.2, immediate on 11.1.0 (b6393d385).
- Viewport subset: no difference that changes a finding.
- Dock re-hover: LT-4 on both.

## What did not run

- Demo shell at 1440, both tips: headless Chromium closed the whole browser on the second route push in 3 of 3 runs; never at 390. Not attributed to glass.
- 4x shell: 24 of 92 routes.
- Dock layer reversal: a tap does not switch the layer (O-312).
- Carousel open and close by click (clicks landed on the dot bed); the touch drag was measured instead.
- Inner scrollers: the Select list, Sheet body and Dialog body fit their content in the stories; DataTable has none; the ScrollProgressRim is undriven on its story.
- Popover scroll lock (a probe error); Toaster stacking (one trigger in the story).
- WebKit: in the motion run Accordion (touch) and dock-collapse (fine) lost their page; the scroll step hung after the lock cells; the drag step was stopped with its out-of-bounds rows saved but unread; no viewport or shell run.
- LT-1 on 11.0.2 was not reached. LT-22 rests on one run; LT-13 on CDP touch only.
- No view transition engaged on router pushes, so route motion was not read, only its frame cost.

The harness's own `audit/animation/harness/build-tree.sh` still tree-shakes the demo entry, so no demo route mounts; `tools/build-tree-lt.sh` has the fix.
