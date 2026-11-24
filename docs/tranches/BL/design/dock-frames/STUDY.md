# The dock's first and last frames: a study of every dock

Written 2026-11-23 for the owner and the sites, from this folder's record (`RECORD.md`), its roots and cures (`ROOT.md`), the critique of both (`critique.md`) and its fold (`fold.md`). Every number names its engine. **Chromium** is Playwright's headless shell; **WebKit** is Playwright's WebKit build, which is not Safari. Neither draws backdrop blur here, and no number below depends on it.

The owner, on fourier.babb.dev's top dock, at a desk, in light:

> the dock needs a bit of refinement in animations at the begin and end--it should not shift around in flow of the page horizontally in animation, too; hovering the darkmode toggle or toggling it should not shift it around; the last few frames of the collapse animation shift and are buggy--communicate this with all docks in a design study, too

His frame: the dock open; from the left the wordmark, Visualize, three icon seats, Log in, an info seat and the theme seat at the right end, hovered; its tooltip "Switch to dark mode" drawn at the far left edge of the screen.

The standing law the cures answer to: nothing changes instantly; motion has weight and inertia; a dock is anchored and grows in place; a fault is cured at its root, with no workaround and no fallback that hides it.

## The five items

### 1. The first and last frames of an open and a close are rough

**What it is.** Four things, all at the ends of the motion.

- In the open's first frame the Log in seat stands at full strength while every other seat is clear, then the rest snap in over about 55 ms.
- The face that leaves fades over the whole motion, so for most of it both faces show at once: in the frame where the new face reaches 0.6 the old one still stands at 0.7.
- The first step is a fixed distance whatever the frame's length, so at 120 Hz there is no ease-in.
- A long frame often comes at a motion's start, and the plate then covers a large part of its travel in one step.

**The numbers** (11.1.1 as it ships, the fourier repro):

| | Chromium | WebKit |
| --- | --- | --- |
| Log in seat in the open's first frame | 1 (every other seat 0) | 1 (every other seat 0) |
| the new face, clear to full | 53 to 60 ms, steps up to 0.58 | 55 to 76 ms, steps up to 0.51 |
| both faces at once, the weaker of the two at its highest | 0.63 to 1 | 0.57 to 1 |
| morphs with a long frame at their start (record) | 16 % on the second frame | 27 % on the first frame |
| steps that long frames carry (record) | 47 to 213 px | up to 363 px |

**The cause.**

- glass fades each seat the host put directly in the dock, one by one. A seat inside a wrapper that draws no box (fourier's Log in sits in `<div class="contents">`) gets nothing, so it shows from the first frame. The old face fades on the motion's whole length rather than its first part (`src/components/dock/styles/layers.css:202-204`, `:277-376`).
- keyframes.js takes its first step as a fixed 16.7 ms (`src/animation/physics/playback.ts:242`).
- The long frame is the dock's own work at the moment it arms the motion. In a Chromium timeline under a 4x CPU throttle it is 24 to 86 ms against 8 to 15 ms for the frames after it, and most of it is several full style recalculations of the dock's 66 to 72 elements (two or three on an open), forced in one task by the measurements the motion takes as it starts. The spring runs on the clock, so after a long frame it paints where it should be by then: one large step. Without the throttle it is 10 to 27 ms, and 56 ms on a page's first motion after it loads, against about 7 ms for the frames after it.

**The cure.**

- glass 11.1.2: the two faces trade on one window, out then in. The old face is gone by 55 % of the travel (about 80 ms); the new face starts at 45 % and fills in over about 180 ms. Each is at 0.09 at the middle, so they never show at strength together. The fade is on the face as a whole, so every seat in it fades together, wrapper or not. This is the window the dock's redesign uses.
- keyframes.js: the first painted frame is the spring's start, and the clock runs from there (a first step of 0), as the redesign's own loop does. That bounds the step after a long first frame.
- The arm's cost is not a patch-sized change: it is the shape of the measurement and of a value that restyles the whole dock every frame. It is a requirement on the redesign in 11.2.0: the arm costs one frame's work.

**Read with the cure** (Chromium): no seat shows in the first frame; the new face fills in over 174 to 185 ms in steps of at most 0.22 between frames 17 ms apart; the old face leaves in 74 to 77 ms in steps of at most 0.27; both at once peak at 0.07 to 0.09. WebKit reads the same: the new face over 171 to 201 ms in steps of at most 0.35, the old one gone in 78 to 98 ms in steps of at most 0.33, both at once at most 0.09. Where a long frame comes second, a step still jumps (0.45 to 0.91 on the fourier repro's first hover open after the page loads at 1440, after a 25 to 66 ms frame); that one is the arm's and keyframes.js's.

**The release.** glass 11.1.2 (the fade); keyframes.js's next release (the first step); glass 11.2.0 (the arm).

### 2. The dock drifts sideways while it moves

**What it is.** The plate itself holds its centre on glass's own docks. What moves sideways is what is inside it, and, on a page where something sits beside the dock, the page around it.

**The numbers.**

| | how far | engine |
| --- | --- | --- |
| the seats and the mark on the fourier repro, every open and close (11.1.1) | 3.8 to 6.6 px (Chromium), 3.8 to 9.9 px (WebKit) | both (witness) |
| color's tool group | 31.6 px | both (record) |
| glass's bottom dock at 390 | 49.6 px | both (record) |
| fourier's three page seats | 8.5 to 9.9 px | both (record) |
| daraksha's whole plate | 58.95 px at both widths | both (record) |
| the dock's width in the page's flow | the open width from the first frame, the closed width only at the end, in one frame | both |

**The cause.**

- glass grows the dock's inner padding from 8 to 12 px along the motion, but the dock's visible size is a scale over a box already at the open width, so the padding only slides the content inside it (`morph.css:119-123`, `:150-154`).
- The per-seat fade (item 1) also grew each wrapper from 82 % to full size about its own centre, so the seats at a wrapper's ends slid outward (`layers.css:315`).
- daraksha's own: its theme seat is a second dock beside the main one, and daraksha slides the whole pair, main dock included, by half the seat's width as it pulls out (daraksha `src/shell/SiteDock.vue:476-488`). glass has no part in that 58.95 px.
- The width in the page's flow is glass's way of measuring the motion: the box takes the open width at once and drops it at the end.

**The cure.**

- glass 11.1.2: the padding takes each posture's value at once, with no slide; the per-wrapper growth goes with the per-seat fade. Read, in both engines: every seat and the mark travel 0 to 0.02 px while they show, against 3.8 to 15.6 px; in WebKit the grouped page's mark still steps 0.49 px at a close's end (item 4). A seat kept in the dock in both postures (a persistent seat) still rides the plate's moving edge, smoothly, as it does today, and now lands on its rest, where it stepped about 1 px at the end; the ride itself is the redesign's (11.2.0).
- daraksha: centre the pair at rest and hold it while the dock moves.
- The width in the page's flow cannot be eased: it has to stop changing. That is the redesign's (11.2.0), whose box stays put while nothing is written per frame. atlas's figure docks, which wrap a row at 390 when that width comes back, are its witness.

**The release.** glass 11.1.2; daraksha now; glass 11.2.0 for the box.

### 3. Hovering or pressing the theme seat moves the dock

**What it is.** Hover moves nothing anywhere. A press on fourier's theme seat moves every seat 4 px left in one frame, about 75 to 134 ms after the press, and the seats stay there. A key that moves to the seat does the same.

**The numbers.** 4 px at 1440 and 12 to 14 px at 390, in one frame, Chromium and WebKit, on fourier and on the repro; the theme seat on keyframes, daraksha and glass's sidebar moves at most 0.9 px.

**The cause.** The row of seats is a scroller, and a seat that is reached is brought into full view with room for its focus ring.

- glass counted the ring's room for a press, which draws no ring.
- fourier's row fits, but the room glass keeps for rings at its ends leaves it 4 px wider than its window, so even a key's reach scrolled it.
- The glide that should carry the row wrote into a scroller that snaps every position it is given, so the whole move landed in one frame.

**The cure** (glass 11.1.2).

- A press reaches only for the seat's own box; the ring's room counts only for a key.
- A row whose seats all fit is not a scroller (horizontal docks), so nothing reached in it moves.
- The glide holds the snapping off while it runs and hands it back where it lands.

Read (Chromium): at 1440 a press and a key move no seat; at 390, where the row does not fit, both glide 14 px over 14 frames of at most 1 px. WebKit reads the same at 1440; at 390 its glide took 8 to 10 frames of at most 3 px, on a loaded machine. On 11.1.1 a press at 1440 already moves nothing in WebKit; a key there moves the row 4 px in one frame, as in Chromium.

**The release.** glass 11.1.2. The redesign's 390 case (16 px in one frame) is a requirement on 11.2.0.

### 4. The collapse's last frames jump

**What it is.** The close looks finished, then nothing moves for 280 to 300 ms, then one frame moves the mark and drops the dock's width.

**The numbers.** fourier at 1440: the mark steps 2.52 px (Chromium) and 4.01 px (WebKit) in that frame, 483 to 571 ms after the close began; the harness dock 4.9 px; glass's bottom dock 0.24 px. The redesign has no pause but ends with a 0.5 to 0.66 px snap backwards.

**The cause.**

- The spring is judged settled only when it has stopped to a thousandth, about 290 ms after it is seen to land; the motion's end waits for that (`useDockSpring.ts:95-104`).
- The dock's two sizes are read rounded to whole pixels, so the end lands up to half a pixel off, and the mark's shift, a percentage of a rounded size, misses by more (`dockMorphMeasure.ts:7-11`).
- The padding slide (item 2) adds its own step.

**The cure** (glass 11.1.2). The motion ends on the frame the spring first reaches its end, which is where everything it drives has stopped; sizes are read to the fraction; the padding no longer slides. Read (Chromium): an open or a close ends at 258 to 267 ms instead of 550 to 558 ms, the mark lands 0 px off, and the last step into the end is the smallest of the last five. WebKit: 268 to 300 ms on a loaded machine (554 to 592 ms before), the fourier repro's mark 0 px off, and the last step the smallest in every cell. On the study's grouped page the mark still steps 0.49 px at a close's end at 1440 (1.31 px before), under one device pixel at the witness's 2x scale; that is not rooted here, and the redesign carries it as a requirement.

**The release.** glass 11.1.2. The redesign's end snap is a requirement on 11.2.0.

### 5. The theme seat's tooltip shows at the screen's left edge

**What it is.** On fourier, "Switch to dark mode" is the browser's own tooltip, from the seat's `title` attribute (fourier `web/src/components/layout/DarkModeToggle.vue:35`). Neither engine here draws such tooltips, and a browser places one at the pointer, so the owner's frame is not explained. It is not rooted.

**What is owed.** The owner's reading: which browser and version, the page's zoom, and which display the window was on.

**A related fault in glass, cured.** A tooltip opened from the closed dock's seal stays open after the dock opens and follows the now hidden seal along the dock: 142 to 145 px on keyframes (WebKit), 112 px on the study's own page (Chromium). glass closed what a seat opened when the dock closed, but nothing when the dock opened, and its tooltip took no part at all (`src/components/_shared/overlay/participation.ts:124-130`). In 11.1.2 anything opened from either face closes on the change that hides its trigger, tooltips included. Read: the tooltip closes as the dock opens, 57 to 60 ms after it appeared in Chromium and 59 to 61 ms in WebKit, and does not move; before, it stayed open and travelled 112 px in both.

**The release.** glass 11.1.2 for the related fault; fourier's reading first.

## Every dock

### fourier (fourier.babb.dev, glass 11.1.0)

**What glass changes.** All of items 1 to 4 reach fourier's top dock at the bump: the Log in seat fades with the rest, the two faces trade without overlapping, the page seats and the mark stand still while the plate opens and closes, the theme seat's press and a key's reach move nothing at desktop width (and glide on a phone), and the close ends where it is seen to end, about 260 ms in, with the mark on its rest. The animation controls dock's seat kept in both postures (`web/src/components/visualization/AnimationControls.vue`) lands on its rest at the end of a motion.

**What fourier changes.** Nothing at the bump. The tooltip at the screen's edge waits for the owner's reading. Giving the theme seat glass's tooltip instead of `title` is recommended: glass's tooltips sit on their seats on keyframes and daraksha.

### colour (color.babb.dev, value.js, glass 11.1.0)

**What glass changes.** The dock's tool group (`demo/shell/dock/Dock.vue:306`, a 460 px group of six seats) no longer grows from 82 % about its centre, so its end seats no longer slide 31.6 px outward on each open; the rest of items 1, 2 and 4 too. Its dock never folds at 390, so phones see none of it.

**What colour changes.** Nothing.

### keyframes (keyframes.babb.dev, keyframes.js, glass 11.1.0)

**What glass changes.** Items 1 to 4, and the closed seal's tooltip (`demo/app/dock/ChromeDock.vue:688-697`) now closes when the dock opens instead of following the hidden seal 142 to 145 px. The transport dock's seat kept in both postures (`demo/components/instrument/transport/TransportDock.vue`) lands on its rest at the end of a motion.

**What keyframes changes.** keyframes.js, the library: the first frame of a managed spring is its start, and the clock runs from there (`src/animation/physics/playback.ts:242`). Every site that uses glass's dock gets it when its lockfile moves to that release. The chrome dock itself needs nothing.

### daraksha (daraksha.babb.dev, glass 11.0.2)

**What glass changes.** daraksha is two releases behind; at 11.1.2 it takes items 1, 3 and 4 and glass's share of item 2. Its own record: a 550 ms motion, seats sliding 52 to 72 px.

**What daraksha changes.**

- The 58.95 px sideways drift of its whole dock is its own: the fission row's centring slides the main dock by half the theme seat's width as the seat pulls out (`src/shell/SiteDock.vue:476-488`). Centre the pair at rest and hold it still while the dock moves.
- Its page's controls in the dock shrink toward the dock's leading end as they fold (`.site-dock :global(.glass-dock #dock-page > *)`, from 60 % about the left edge), which slides them sideways too. At 11.1.2 glass fades the whole face out, then in, so read whether that rule is still needed; if not, it goes.
- The fission seat moves into glass at 11.2.0, as daraksha's own note says, and glass carries "the main plate holds while the seat leaves" as a requirement.

### glass's demo (glass.babb.dev)

**What glass changes.** The bottom dock at 390 holds a ten-seat group in a wrapper with no box; it fades with the face, and its seats no longer slide 49.6 px. The sidebar takes items 1, 2 and 4.

**What the demo changes.** Nothing; it deploys with the release.

### atlas (glass 10.1.2, its own film)

**What glass changes.** These cures are on the 11 line; atlas has them when it moves to 11.1.2. Then its rail's and figure docks' motions end when they are seen to end, about 280 ms sooner, and the faces trade without overlapping. atlas's two faults that are glass's are requirements on 11.2.0: the dock's width in the row (a closing figure dock gives its row the open tray's width until glass's motion ends, which at 390 wraps the row and drops the figure 64 px for about half a second), and an end-anchored figure dock's resting seats riding the moving edge 88 to 104 px.

**What atlas changes now.**

- Keep a closing figure dock out of its row's flow until glass's motion has ended, not only while it is open (`charts/frame/PlateDock.vue:343`, `charts/frame/ChartFrame.css:441-473`, `editorial/StoryCard.vue:351-357`). That takes away the wrap and the 64 px drop on any glass version.
- The rail's crest slides 14 px right and 14 px down as the rail opens, because the open rail pads its crest and the closed disc does not (`platform/chrome/dock/Dock.css:52-71`): give both the same inset.
- A press on the closed disc follows the home link, because the pointer's arrival has already opened the rail (`platform/chrome/dock/components/DockCrest.vue:36-48`).
- A pick that closes the tray and mounts a surface in the same moment puts a 40 to 177 ms frame inside the close (`charts/frame/PlateDock.vue:250-256`): mount the surface after the close's first frames.

### gaggle (the studentsafety report dock, glass 11.1.0)

**What glass changes.** Its dock never folds, so items 1, 2 and 4 do not reach it. Its one sideways jump, at 390, was its own row overflowing by 7 px, now fixed on its side. At 320 px its row still overflows by 37 px; there, from 11.1.2, a pressed seat's row glides instead of jumping.

**What gaggle changes.** Nothing for this study.

### Home Assistant (glass cards, glass 11.1.0)

**What glass changes.** Its dock never folds (`collapse: false`), so the folding cures do not reach it; the press and fitting-row cures of item 3 do. Its `--dock-collapsed-padding` (`frontend/src/styles/scale.css:60`) is read only by a dock that folds, so it changes nothing.

**What Home Assistant changes.** Nothing.

## What is not read

- The owner's tooltip (item 5) in a real browser; the machine's rules allow no headed browser and no Safari driver here.
- How a frosted seat inside a fading face looks while it fades: the face is the frost's backdrop until the fade ends. 11.1.1's closing face does the same today. It needs the GPU lane or Safari.
- The live sites with the cure: they are read-only, so the cure was read on the study's own pages (a seat-for-seat copy of fourier's dock, glass's harness dock, a grouped dock and a closed seal with a tooltip).
