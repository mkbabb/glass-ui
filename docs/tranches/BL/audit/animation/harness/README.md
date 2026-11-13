# The animation audit harness

Everything a recorder needs to read one glass motion frame by frame: two built trees, one page per component, a frame sampler with strips, and a fault analyser. The three proof motions are in `proof/` (see the end).

All paths below are relative to this directory:
`/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/`.

## The two trees

| Tree | Source | sha | Port |
|---|---|---|---|
| `tree-v11.0.1/` | `git archive v11.0.1` (the published release) | `e42bc2705b0e0ff13d62464c419c51e1f5495d13` (`V11.0.1-SHA.txt`) | 5391 |
| `tree-11.0.2-tip/` | `git archive release/11.0.2` | `648d70e591f2545fa46c5777b04a5651c3ad281f` (`TIP-SHA.txt`) | 5392 |

`docs/` is left out of both archives: it is about 6 GB of images, and the build never reads it. Everything else is the tag's bytes. The trees, their `node_modules` and the server PID files are ignored by `.gitignore`. Each tree has its own `node_modules` (`npm ci`), and its library is built in `dist/` (the package's `prepare` script runs during `npm ci`).

`build-tree.sh` copies `app/` into `<tree>/demo/__anim/` and wraps the tree's demo entry. The original entry moves to `demo/main.demo.ts`, unchanged, and the new `demo/main.ts` boots the audit page when `?c=` is present and the demo otherwise. It then builds the demo into `<tree>/dist-demo/`. Library source (`src/`) is never touched.

Rebuild (only after editing `app/`, or after `npm ci`):

```sh
~/.claude/guard/guarded --timeout 20 -- ./build-tree.sh tree-v11.0.1
~/.claude/guard/guarded --timeout 20 -- ./build-tree.sh tree-11.0.2-tip
```

From scratch, before that: `cd tree-<x> && ~/.claude/guard/guarded --timeout 30 -- npm ci --no-audit --no-fund`.

## Serving

One preview server per tree, each in the background, each under the guard:

```sh
~/.claude/guard/guarded --light --timeout 90 -- ./serve.sh tree-v11.0.1 5391 > proof/serve-5391.log 2>&1 &
~/.claude/guard/guarded --light --timeout 90 -- ./serve.sh tree-11.0.2-tip 5392 > proof/serve-5392.log 2>&1 &
```

`serve.sh` exec's vite in place, so the PID it writes to `.serve-<port>.pid` is the server itself.

Stop them (by PID, then anything vite still listening on the port):

```sh
./stop.sh 5391 5392
```

The 90-minute guard timeout is the backstop. Stop your server when you are done, and before you return.

## The pages

- `http://127.0.0.1:<port>/?c=<name>` shows one component on a static coloured field, light. Add `&scheme=dark` for dark.
- `window.__animReady` turns true once the page has mounted, fonts are loaded and two frames have passed.
- `window.__animInfo` lists the page's test ids.
- Each page's root is `main.anim-root[data-testid=anim-root]`.
- The demo itself still serves at its own routes (`/forms/slider`, `/dock/overview`, ...). `/?capture=<route>&motion=1` mounts a demo story inside the full demo shell with its clocks live; that is the demo's own capture path.

There are two kinds of page, listed in `app/registry.ts`:

- **Hand-written** (`app/mounts/<name>.vue`): `dock`, `slider`, `tabs`. Each mounts the component in its documented states, one cell per state, with a stable `data-testid` on each.
- **Story**: every other component. The page mounts the component's demo story (`demo/stories/<category>/<id>.vue`) bare, without the demo shell or its dock, under a memory router. It then stamps `data-testid="<name>-<n>"` on every element that matches the row's `root` selector, in DOM order. If a story needs something the bare mount does not give it, write a hand mount: add `app/mounts/<name>.vue`, set the row to `{ mount: "hand" }`, and rebuild.

Names: accordion, alert, aurora, avatar, badge, blob, button, card, carousel, checkbox, chip, collapsible, command, configurator, constellation, context-menu, countup, dark-mode-toggle, data-table, deck, dialog, dock, easing, expandable-container, fading-scroll, fourier-field, handmark, hover-popover, infinite-scroll, input, label, labeled-field, menu, metric, music-staff, number-field, pager-dots, popover, progress, radio-group, scroll-progress-rim, select, separator, sheet, skeleton, slider, sortable-list, springs, status-dot, surface, switch, table, tabs, textarea, timeline, toast, toaster, toggle-group, tooltip, typewriter.

To see what is on a page and pick selectors (one headless browser; prints the test ids, console errors, and an outline of classes, data attributes and boxes):

```sh
~/.claude/guard/guarded --timeout 5 -- node inspect.mjs v11.0.1 slider --sel '[data-testid=slider-md]' --depth 6 [--png out.png]
```

## Selectors per component

Selectors for the hand-written pages. For a story page, run `inspect.mjs`.

**dock** (`?c=dock`). Cells:

- `dock-h-closed`: pill, starts collapsed, persistent Home.
- `dock-h-open`: pill, starts open, collapsible. It arms the 3600 ms idle window at mount.
- `dock-h-rounded`: rounded, starts collapsed, no persistent region.
- `dock-transport`: always expanded. Its Play/Pause seat is `dock-transport-play`.
- `dock-v-closed`: vertical, starts collapsed.
- `dock-toggle-persistent`: a plain button that mounts and unmounts `dock-h-open`'s persistent region.

Inside a dock:

- root `.glass-dock`: classes `.expanded`/`.collapsed`, `[data-morphing]` while it morphs.
- `.dock-plate`: the lens, which carries `--dock-t`.
- `.dock-persistent`.
- `.dock-layers`.
- `.dock-layer--full`: the run, which carries `.is-active`.
- `.dock-layer--summary`: the collapsed face.
- seats: `[data-glass-dock-seat]` (`button.dock-icon-button`).
- `.dock-separator`.
- `.dock-controls` has no box of its own (0×0), so do not track it.

Collapse paths: pointer leave plus the idle window (`DOCK_COLLAPSE_DELAY_MS = 3600` in both trees), Escape, `collapse()`.

**slider** (`?c=slider`). Cells:

- `slider-md`: scrubber, 0..100 step 1, 460 px. Its value prints in `slider-md-value`.
- `slider-sm` and `slider-lg`.
- `slider-range`: two thumbs.
- `slider-marks`: step 10, marks.
- `slider-spectrum`.
- `slider-rtl`.
- `slider-disabled`.
- `slider-vertical`.
- `slider-vertical-inverted`: spectrum.

Inside a cell:

- `.glass-slider`: the root; `[data-held]`, `[data-focus-veil]`.
- `.slider-track`.
- `.slider-range`: the fill; `.glass-liquid-fill`.
- `.slider-thumb`.
- `.glass-grasp-carrier` (two, while grasped).
- `.glass-value-mark`.

Teleported to `body` while grasped: `.glass-loupe` (`[data-engaged]`; its `.glass-loupe-clone` and `.glass-loupe-fill` inside it) and `.glass-focus-veil`.

**tabs** (`?c=tabs`). Cells:

- `tabs-pill`: motion full, which is the drag default. Its value prints in `tabs-pill-value`.
- `tabs-pill-reduced`: `motion="reduced"`, click only.
- `tabs-pill-uneven`: labels of different widths.
- `tabs-vertical`.
- `tabs-underline`.
- `tabs-underline-vertical`.
- `tabs-panel`: `semantics="tabs"` plus a text panel `tabs-panel-body` whose height changes per tab.

Inside a cell:

- `.segmented-tabs`.
- `.segmented-indicator`: the one moving pill or ink mark. While dragged it carries `.glass-drag-lift`.
- `.segmented-tab`: the buttons, in order. Use `:nth-of-type(k)`; `[data-active]` marks the selected one.

## The sampler: `probe.mjs`

```sh
~/.claude/guard/guarded --timeout 10 -- node probe.mjs <tree> <component> <scenario.json> [--cell <tag>] [--out <dir>] [--trace] [--hook ro|raf] [--no-strip] [--frames 12] [--format jpeg|png] [--dpr n] [--software] [--browser-arg <flag>]
# WebKit, only for the faults you rank first, short runs:
~/.claude/guard/guarded --exclusive webkit --timeout 10 -- node probe.mjs v11.0.1 tabs scenarios/tabs-indicator.json --engine webkit --cell 1440-fine-light --out <dir>
```

`<tree>` is `v11.0.1` or `tip` (or a tree directory with `--port`). The preview server for that tree must be up. The probe launches one headless browser. Chromium is Playwright's default headless shell; the probe never uses headed Chrome. It opens a new context per cell and closes the browser in `finally`. For each cell it writes, to `--out`:

- `<scenario>.<tree>.<engine>.<cell>.rows.json`: the rows and everything else below.
- `....start.png` and `....end.png`: strips of the first and last N compositor frames of the motion. When the recording holds several motion segments (runs of change separated by at least 250 ms of stillness), each segment gets its own pair: `seg1.start.png`, `seg1.end.png`, `seg2.start.png`, and so on.

stdout gets one JSON line per cell, with the screencast coverage.

**One row per rendered frame.** For every tracked selector a row holds:

- the box `x y w h`;
- computed `opacity`, plus `eop`, the effective opacity times every ancestor's, when `chain: true`;
- `transform` (the matrix);
- the individual `translate`, `scale` and `rotate` properties. Glass moves things with these, not only with `transform`.
- the four corner radii and `clip-path`;
- the colour properties (default `color`, `background-color`, `border-top-color`, `box-shadow`);
- any custom properties, attributes and other styles you name;
- `vis`.

Each row also carries:

- the frame's time `t` (the rAF timestamp) and the sample time `now`, in ms from the start;
- the last pointer position;
- `changed: 1` when any tracked value differs from the previous frame;
- any marks set in that frame.

The file also holds:

- the marks, each with a snapshot of the tracked values;
- the pointer log (every pointer event with its page time);
- long tasks and long animation frames (PerformanceObserver, Chromium);
- every animation and transition that ran (`document.getAnimations()`: property, target, duration, delay, easing, keyframe easings), which gives "clock and easing as computed";
- under `--trace`, layout, style and paint counts per frame.

**Where a row is read.** `--hook ro` is the default. A ResizeObserver on a 1 px fixed probe, whose width the sampler's rAF loop toggles each frame, fires after every requestAnimationFrame callback and after layout, in the same rendering update. A row therefore holds what that frame paints, including keyframes.js springs that tick in their own rAF callback. `--hook raf` reads inside the sampler's own rAF callback instead. That can run before a library's callback in the same frame and read its value one frame late. `--trace` forces `raf`, because the `ro` probe adds one tiny layout per frame.

**Frame rate.** On this machine the headless shell renders at about 120 Hz (rows about 8.3 ms apart; see the proof output). A row is a real rendered frame. DROPPED FRAMES is a gap over 25 ms either way. The pointer is driven at 60 Hz, so during a drag every other frame has no new pointer event; that is input cadence, not a fault.

**Strips.** Chromium uses CDP `Page.startScreencast`. It delivers one image per compositor frame that changed, each with its own timestamp, so a static period gives no frames. The probe matches each image to the last row sampled at or before it and labels the tile `f<row> <ms> +<ms since the previous tile>`. Accuracy:

- The time on each tile is the compositor's, to about 1 ms.
- The screencast delivers about 60 images a second, while the page renders at about 120 Hz, so a strip shows roughly every other rendered frame. The run reports `framesInMotion/rowsInMotion` as its coverage; the tabs proof had 52 of 114, the same in JPEG q92 (the default) and PNG.
- A gap in the tile labels (f10, f12) is a frame the screencast skipped, not a frame the page dropped. The rows are the frame record, and the strip illustrates them.
- The crop is the union of the tracked boxes over the recording (or `cropAs` / `crop`), plus `cropPad`.
- Tiles are laid out left to right, top to bottom, inside 1200 px.

WebKit has no screencast, so the probe writes rows only there. Confirm a WebKit fault from its rows.

**Compositing.** Chromium runs the headless shell with `--use-angle=metal --enable-gpu-rasterization`, so it composites on the GPU. Without those flags the shell composites in software, and the Slider's full-viewport focus veil (a backdrop blur) cost a median 55 ms a frame at 1440 while held, against 8.3 ms with them (`proof/slider/diag/`). Every frame of every glass grasp would then read as dropped. `--software` drops the flags. `meta.browserArgs` records which mode ran, and `--browser-arg <flag>` adds a flag (repeatable). WebKit runs with no extra flags.

**Pointer.** `fine` cells drive a mouse. `coarse` cells (Chromium) drive touch through CDP `Input.dispatchTouchEvent`, so press, move and release are real touch input. Hover steps always move the mouse.

## Scenario files

JSON. See `scenarios/` for the three proofs.

```jsonc
{
  "name": "slider-drag",                  // file-name stem
  "about": "...",
  "url": "/?c=slider",                    // optional; default /?c=<component> (+ &scheme=dark on dark cells)
  "cells": [                              // default: one 1440-fine-light cell
    { "tag": "1440-fine-light", "w": 1440, "h": 900, "pointer": "fine", "scheme": "light" },
    { "tag": "390-coarse-light", "w": 390, "h": 844, "pointer": "coarse", "scheme": "light" },
    { "tag": "1440-fine-dark", "w": 1440, "h": 900, "scheme": "dark" },
    { "tag": "1440-rm", "w": 1440, "h": 900, "reducedMotion": true }
  ],                                      // "dpr" per cell optional (default 2; coarse 3)
  "ready": "[data-testid=slider-md] .slider-thumb",   // wait for this before anything
  "warmMs": 400,
  "track": [                              // what each row records
    { "as": "thumb", "sel": "[data-testid=slider-md] .slider-thumb" },
    { "as": "seat", "sel": "... [data-glass-dock-seat]", "all": true },   // every match: seat#0, seat#1, ...
    { "as": "run", "sel": "...", "chain": true },                          // + effective opacity (eop)
    { "as": "plate", "sel": "...", "props": ["--dock-t"], "attrs": ["data-morphing"], "styles": ["filter"],
      "colors": ["color", "background-color"] }                            // colors default: color, background-color, border-top-color, box-shadow
  ],
  "cropAs": ["track", "thumb", "loupe"],  // which tracked boxes make the strip crop (default: all)
  "crop": "[data-testid=slider-md]",      // or an extra selector to include
  "cropPad": 16,
  "gapMs": 250,                           // stillness that splits motion segments
  "before": [ /* steps run before recording starts */ ],
  "steps":  [ /* steps run while recording */ ],
  "strips": [ { "name": "after-up", "fromMark": "up", "n": 12 } ],   // extra strips from a mark
  "analysis": { /* read by faults.mjs, below */ }
}
```

A **point** is `[x, y]` (CSS px in the viewport), `{ "sel": "...", "at": [fx, fy] }` (a fraction of the element's box, default the centre, plus optional `dx`/`dy`), or `{ "rel": [dx, dy] }` (from where the drag started).

**Steps** (`do`):

| Step | Fields | What it does |
|---|---|---|
| `mark` | `name` | stamps a mark on the next row and snapshots the tracked values |
| `wait` | `ms` | |
| `settle` | `quietMs` (300), `maxMs` (4000), `afterChange` (true) | waits until a tracked value has changed (unless `afterChange: false`) and then nothing has changed for `quietMs` |
| `waitChange` | `maxMs` (6000) | waits until any tracked value changes, e.g. the dock's idle window running out |
| `hover` | `sel`, `at`, `ms`, `hz` | moves the mouse to the point, at once or along a straight path over `ms` at `hz` |
| `move` | `to`, `ms`, `hz` | the same for any point |
| `leave` | `to` (default `[4, 4]`), `ms` | moves the pointer away |
| `down` / `up` | `sel`+`at`, or `to` | presses or releases (touch on coarse cells) |
| `click` | `sel`, `at` | a click (a tap on coarse cells) |
| `key` / `keydown` / `keyup` | `key` | Playwright key names (`ArrowRight`, `Escape`, `Tab`) |
| `focus` | `sel` | `element.focus()` |
| `drag` | `from`, `path`, `hz` (60), `markDown`, `markUp`, `release` (true) | presses at `from`, then follows `path`: `{ "to": point, "ms": 300 }` moves along a straight segment at `hz` on an absolute clock, `{ "pause": ms }` holds still, `{ "mark": "name" }` marks. Then it releases. |
| `waitFraction` | `as`, `ch`, `to`, `fraction`, `from`, `maxMs` | waits until tracked element `as`, channel `ch` (`x y w h cx cy op` or a `p:--prop`), has gone `fraction` of the way from its value now (or `from`) to `to`. `to` is a number or a point with `ch`, such as a target tab's centre. Use it to reverse a motion at 30, 50 or 80 %. |
| `scroll` | `dx`, `dy` | a mouse wheel |
| `eval` | `js` | a script string in the page |

Name a reversal mark `reverse-...` (or list it in `analysis.interrupts`) so the analyser checks the frames after it.

## The analyser: `faults.mjs`

```sh
node faults.mjs <rows.json> [--json faults.json] [--strict] [--gap 250] [--only as1,as2]
```

No browser, so it needs no guard. It splits the recording into motion segments, turns each tracked value into numeric channels, and applies the brief's rules per channel and per segment. It prints each fault with its frame numbers (row indices) and values, then the clocks (each moving channel's 2 %-band start and end, and its half-way time), out against in, the drag table, and the animations that ran with their computed duration and easing. The channels:

- the box: `x y w h cx cy`;
- opacity: `op`, and `eop` where tracked;
- from the matrix: `tx ty sx sy rot`;
- the individual properties: `trX trY scX scY ro`;
- the corners: `r0..r3` (top left, top right, bottom right, bottom left);
- `clip0..` for each number in `clip-path`;
- the colour components: `c:<prop>/0..3`, which is oklab L a b and alpha;
- custom properties.

Colours are converted to oklab before differencing. The computed colour changes format mid-transition (`rgb()` at rest, `oklab()` while it interpolates), which would otherwise read as a jump.

| Kind | Rule |
|---|---|
| FIRST-FRAME JUMP | the first moving step is more than 1.5 times the mean of the next three (`--strict`: more than the mean, the brief's literal rule); or one step covers at least 90 % of the travel (LANDS WHOLE) |
| LAST-FRAME SNAP | the last moving step is larger than the one before it and above the creep size, or covers at least 25 % of the travel |
| CREEP | more than 150 ms of steps under 0.5 px (1 % of the travel for non-pixel channels). It says whether the motion then rests or ends in a larger step. |
| REVERSAL | a step against the net direction, with the overshoot past the end value as an amount and a percentage. Whether the spring preset designs it is the reader's call; for the dock see `DOCK_SPRING`, and for others motion-canon P2. |
| JITTER | two or more consecutive sign alternations of the step |
| DROPPED FRAMES | a gap over 25 ms between rows, with the long task or long animation frame that overlaps it. A gap at rest is listed separately. |
| DISCRETE | a value whose string changes but cannot be interpolated (its number list changes length, e.g. `box-shadow: none` to a shadow, or `clip-path` path to inset) |
| APPEARS / CUT | an element mounts already above 0.5 opacity, or is removed while above 0.1 |
| LAYOUT IN FRAMES | under `--trace`, the frames of each segment that ran layout, with counts and ms |
| MISMATCH | for each pair in `analysis.groups` (e.g. `["plate.w", "run.eop"]`): the 2 %-band start differs by more than two frames, or the end by more than 50 ms. The clocks table shows every channel either way. |
| INTERRUPTION | after a `reverse-*` mark, any step in the next six frames larger than three times the median step before the mark |
| OUT AGAINST IN | only when the scenario names its segments, `analysis.inOut: {in: 0, out: 1}` (0-based segment indices): in against out per element, flagging a cut (one frame or none) or a ratio outside 0.4 to 1.6. Record the in and the out in one run, with the `gapMs` stillness between them. |
| DRAG | `analysis.drag: {as, ch, ptr}` (e.g. `{"as": "thumb", "ch": "cx", "ptr": "x"}`): per-frame lag of the element behind the pointer (from the grip offset at the first held frame), frames where the element moves against the pointer, and the release settle (first and last frames, duration, first and last steps) |

The rules flag; they do not judge intent. Read every flag against its strip and the rows. `proof/synthetic/` holds a hand-made series with a known first-frame jump, creep, last-frame snap and jitter. Its `synthetic.faults.txt` shows all four flagged at the right frames.

## The proof

All three motions ran on 2026-11-12 through `proof/run-proof.sh` under one guard slot (`~/.claude/guard/guarded --timeout 25 -- ./proof/run-proof.sh`, log `proof/run-proof.log`). They used headless Chromium 149 with GPU compositing, and every cell rendered at a median of 8.3 ms a frame. Each run left its rows, its strips and its analyser output (`.faults.txt` for reading, `.faults.json` for tools) in the folder below. The readings that follow show the tools catch real faults; they are not the audit's ranking.

**Dock collapse** (`proof/dock/`, `scenarios/dock-collapse.json`, `dock-h-open`):
- Ran on v11.0.1 in the 1440 fine, 390 coarse and 1440 reduced-motion cells, and on the 11.0.2 tip in the 1440 fine cell. A traced v11.0.1 run is in `proof/dock/trace/`.
- The pointer leaves at f7. The fold starts at f440, 3.62 s later (the 3600 ms idle window), and the motion lasts to f505, about 535 ms. Screencast coverage is 53/103.
- On the settle frame (f504 to f505; f505 to f506 in the traced run) all four corners jump from 115.5 to 28 px, and the run, the persistent region and the seats jump 63 px. The corner swap at settle is the census row marked "snaps (likely)"; it is now a frame reading.
- About 300 ms after rest (f542), the run goes from visible to hidden in one frame.
- The box shadow changes its shape in one frame at the start (DISCRETE).
- The traced run counts 246 layouts over 67 frames (`meta.trace`).
- Under reduced motion the fold is a single frame (FIRST-FRAME JUMP, lands whole, 36 channels), which confirms census item 11.
- The tip reads the same as v11.0.1 here. Its sha is the revert of O-271.
- Strips: `seg1.start.png` shows the fold frame by frame; `seg1.end.png` shows the settle frame's shadow change.

**Slider drag** (`proof/slider/`, `scenarios/slider-drag.json`, `slider-md`):
- Ran on v11.0.1 in the 1440 fine and 390 coarse (touch) cells, and on the tip at 1440. Coverage is 209/261.
- The drag has 224 held frames. The thumb trails the pointer's grip point by a median of 1.05 px, 2.2 px at most, and never moves against it.
- The loupe and one grasp carrier mount at opacity 1 and scale 1 in the press frame (APPEARS whole), which is census item 14 as a frame reading. The loupe clone and a carrier are removed at opacity 1 on release (CUT, f257 to f258).
- The track's box shadow changes shape on press (DISCRETE).
- While held, the fill moves in steps of one value (4.6 px), with stillness between the 60 Hz pointer events (JUMP while held).
- The loupe clone's position alternates direction frame to frame (JITTER, most of the 114).
- The INTERRUPTION lines at `reverse-50px` are the pointer starting again after a 200 ms pause, not a reversed tween. For a drag, name a mark `reverse-*` only where the gesture really turns mid-motion.
- `proof/slider/diag/` holds the software-against-GPU comparison: held frames ran at a median 55 ms with no GPU flags, both without the screencast and at dpr 1, and at 8.3 ms with them.

**Tabs indicator** (`proof/tabs/`, `scenarios/tabs-indicator.json`, `tabs-pill`):
- Ran on v11.0.1 in the 1440 fine and 390 coarse cells. Coverage is 50/112.
- The click from Grid to Kanban moves the indicator 177 px. Its `translate` transition lasts 210 ms on a spring `linear()` curve, and its 2 %-band motion runs from f9 to f31, 183 ms. The label colours tween 200 ms on `cubic-bezier(0.4, 0, 0.2, 1)`.
- At the click on Timeline, reversed at 50 % (f93), the indicator turns from where it is: there is no INTERRUPTION jump.
- On the reversed move, the Kanban label finishes its colour 117 ms before the pill arrives (MISMATCH).
- The REVERSAL lines are the designed turn.
- In an earlier run of the same scenario, the indicator's last steps went −1.79, −5.48, −1.80 px before rest. This run does not show it, so it is a candidate for the tabs recorder to repeat, not a finding.

**Tabs drag** (`proof/tabs/tabs-drag...`, `scenarios/tabs-drag.json`; the drag recorder's starting point):
- The pill is grabbed at Grid, carried towards Kanban, pulled back, and released at f134 between List and Kanban.
- The release frame itself jumps 14 px (f134).
- The pill then settles onto List by about f180 and rests there 230 ms. At f207 its drag transform is dropped as `data-active` moves to List, the box teleports 88 px back to Grid (x 92.4 to 4.0), and it glides to List a second time (f207 to f233). `after-up.png` shows it.
- That is the error the owner names in "tabs toggle with drag".

**Synthetic** (`proof/synthetic/`): a hand-made series with a known first-frame jump at f2, 184 ms of creep (f13 to f24), a last-frame snap at f25, and jitter (f3 to f7). All four are flagged at those frames.

## Machine notes

- One heavy run at a time per seat. The browser pool is shared machine-wide (six slots), and a run can wait minutes for admission, so batch the cells and scenarios into one script under one guard call, as `proof/run-proof.sh` does.
- WebKit: `guarded --exclusive webkit --timeout 10` or less, one scenario, one cell. It has no screencast.
- Stop both servers when done: `./stop.sh 5391 5392`.
