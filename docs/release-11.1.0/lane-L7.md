# glass-ui 11.1.0 · lane L7 (HandMark compositor draw)

The build seat for lane L7 on `release/11.1.0`, run by claude-opus-5-5. Before building, it read
`lane-L1.md` through `lane-L6.md`, `orchestrator-note-daraksha.md` (its O-206 section is the spec:
O-206 has no INBOUND row of its own) and `lane-L5.md`, whose CSS `hm-draw` on `stroke-dashoffset`
this lane replaces.

**Complete, with one gap: WebKit's stall reading could not be taken.** Every item is built and
witnessed. The stall gate is GREEN on the branch and RED on v11.0.0 in Chromium. In Playwright
WebKit it could not be read: that engine's screencast takes no frame while the main thread is
blocked, on either tree, even over a 400 ms task. The probe proves this with a control animation
and does not count it as a pass (see "WebKit" below). `guarded` admitted every run; none was
refused. WebKit runs waited for the machine-wide `webkit` lock, which other releases held, and
were not refused.

Commits (read from `git log`):
- `f72c82eb5`: the compositor draw, `drawn`, the unit tests and the CHANGELOG lines.
- `d4d30bc71`: the reduced-motion and print fix that this lane's own witness caught (below).
- The records commit carries this file, `lane-L7/` and the ratchet rebind.

## O-206 · HandMark's draw no longer stalls under main-thread work

**What changed** (`src/components/handmark/HandMark.vue`):

1. **The draw rides `transform`.**
   - **Structure.** Each line's SVG frame now sits inside a clip window, `span.hm-reveal`
     (`overflow: hidden`). The window is the mark's existing `maskWindow` in px (`left`, `top`,
     `width` and `height` inline), so the extent law is unchanged: real units, never `%`.
   - **The reveal.** The window slides in from `translateX(-100%)`. The frame inside slides
     back from `translateX(var(--hm-wipe))`, where `--hm-wipe` is the window's own width. Both
     run on one clock (`--spring-present-duration`, `--spring-present`, and the existing
     per-line delay `--hm-lead + i × duration`), so the two transforms cancel at every frame.
     The ink holds still while the window's edge travels along the stroke.
   - **Why that look matches.** The window's front is a straight cut. The old dash front was
     a round cap of radius 0.8 nib over a ribbon of at most 1 nib, so the two fronts differ by
     under 0.2 nib. The taper lives in the ribbon geometry, which is unchanged.
   - **Why the origin read holds.** The frame keeps the `ref` that `measure()` reads its
     origin from, and the two transforms sum to zero, so that read is exact at every frame.
   - **Ink-lag.** It moves from `transform` to `translate` so it composes with the
     counter-slide. Its PRM and print pins follow.
2. **The ring keeps `stroke-dashoffset`.** A ring winds about 390° round on itself, and no
   straight edge follows it. The note allows this ("keep dashoffset for that shape alone"). The
   ring alone keeps its centreline mask (`hm-guide`, `pathLength="1"`), now animated by the
   `hm-draw` rule only for `data-shape="circle"`. The other three shapes emit no mask, because
   at rest it was a no-op: the guide's 1.6-nib stroke always contains the 1-nib ribbon.
3. **Re-ink** (the 4 % swell, with the last 35 % pulled shut on `--spring-press`) rides the same
   channel: WAAPI `transform` on the window and the frame for the three shapes, and dashoffset
   for the ring.
4. **`drawn`** (`defineEmits<{ drawn: [] }>()`):
   - **When it fires.** It fires once per draw. Each line's `animationend` (`hm-reveal`, or
     `hm-draw` for the ring) is counted by `data-i`. When every line has ended, `drawn` fires
     one `requestAnimationFrame` later. `animationend` runs inside the frame that renders the
     last line's end state, before that frame is swapped. The first build fired there and
     landed 1 to 9 ms before the final painted frame (trial, `out/trial/`). The extra frame puts
     it after.
   - **Still marks.** At mount, `drawn` fires at once when the mark will not move: `draw`
     off, reduced motion, or print. A media change into reduced motion or print fires it too.
   - **Cycles.** A `retrigger` mark that undraws starts a new cycle, and so does `play()`.
     Under reduced motion or print the mark has been complete all along, so it fires once only.
5. **Reduced motion and print** (`d4d30bc71`). This lane's first witness found a real defect.
   - **The defect.** The draw's `animation-name` rules (specificity 0,4,0) outranked the
     reduced-motion reset (0,3,0). Under reduced motion, Chromium still ran the two window
     transforms (2 running at frame 0, `out/run1/green-chromium.json`). The wait state's
     transforms outranked it the same way, so a waiting in-view mark would have stayed hidden.
   - **The cure.** The draw and the undrawn wait now live under one
     `@media screen and (prefers-reduced-motion: no-preference)`, so reduced motion and print
     have nothing to undo. The script's `still()` reads that same condition (`MOTION`), so the
     style and the event agree from one source.

The draw keeps the preset clock (`springPreset("present")`'s CSS row, no literal), keeps the
frame-rank lead, and adds no ornament. `markDuration` / `minJerk` stay exported and unused, as
L5 recorded.

**Files.**
- `src/components/handmark/HandMark.vue`.
- `tests/components/custom/handmark/g-hm-mark.test.ts`: the centreline is read off the painted
  ribbon (the midpoint of sample `i` and its partner), since the three shapes no longer emit a
  guide.
- `tests/components/custom/handmark/g-hm-layer.test.ts`: the window is read off `.hm-reveal`
  for every shape, plus a mask for the ring alone over the same window.
- `tests/components/custom/handmark/g-hm-drawn.test.ts` (new):
  - `drawn` fires once after the last line, one frame later.
  - It ignores the frame's counter-slide.
  - It fires at mount under reduced motion, and never again for that mark.
  - It fires at mount with `draw` off, and not for a waiting in-view mark.
- `CHANGELOG.md`.

### Witness

**The harness.** `lane-L7/harness/` is a vite-served page that imports HandMark by relative
source path, so the same page runs on the branch and on v11.0.0. The v11.0.0 tree is the cached
`git archive v11.0.0` at `.cache/l5-v1100`, whose `HandMark.vue` is byte-identical to the tag
(checked with `diff` against `git show v11.0.0:…`). The page has two scenes:
- `draw`: one 48 px mark per shape, mounted on demand by `__mount()`. With `trigger=in-view&fold=1`,
  the mark sits two viewports down.
- `rest`: all four shapes at rest, with a fixed colour (`#c2410c`, and hue 78 for the band), so
  the trees differ only in how the mark is drawn.

**The probe.** `lane-L7/probe.mjs` launches one browser per run, opens a new context per cell,
and closes both in `finally`: Chromium's headless shell, and WebKit build 2287 under `guarded
--exclusive webkit`. Cells are 390 and 1440, light and dark. The runners are `chain.sh` →
`witness.sh` → `runprobe.sh`, then `compare.mjs`. Exit codes are in `out/chain.log`.

**How paint is read.** The probe reads paint from the page's own screencast
(`page.screencast.start({ onFrame })`). In Chromium those frames come from the compositor, so
they keep coming while the main thread is blocked.
- **Placing frames.** Frames are placed by a paint marker in the page corner, not by any clock
  (WebKit stamps its frames on a monotonic clock of its own). Marker A paints in the last
  frame before the task. The task then runs as the next task. It sets marker B first, which can
  only paint after it ends, then busy-waits 50 ms. So every frame that still shows A after A's
  first frame was produced during the task. `drawn` sets marker C.
- **The control.** A plain composited `transform` square runs throughout. If it does not move
  inside the task, the screencast saw no compositor frame there, and the cell is recorded as
  unmeasurable, never as a pass.
- **Progress.** Progress is the share of the mark's final ink pixels present in a frame,
  cropped to the mark.

**The stall cell.** Chromium runs at a 4× CPU throttle (`Emulation.setCPUThrottlingRate`). The
mark mounts. Once the lead draw animation reads `currentTime ≥ 40 ms`, the 50 ms task runs.

**Branch readings (exit 0 in both engines; Chromium 80/80, WebKit 80/80):**

| claim | Chromium headless shell | WebKit 2287 |
| --- | --- | --- |
| stall: paint advances through a 50 ms task (underline, strike, highlight × 4 cells) | 12/12: 3–4 frames inside each task, control moving; progress rises 0.288–0.434 (e.g. 390 light underline 0.353 → 0.441, 0.539, 0.602, 0.727). The main thread's `currentTime` stays frozen at about 41 ms through the task. | unmeasurable, 12/12: 0 frames inside the task, control still (see below) |
| the draw animates `transform` alone, at `--spring-present-duration` (200 ms) on `--spring-present` | 12/12 | 12/12 |
| the ring animates `strokeDashoffset` on the same clock | 4/4 | 4/4 |
| `drawn` fires once, with no draw animation running and every window, frame and dash at its final value, and the stroke whole (≥ 99 % of final ink) in its first frame and every frame after | 16/16 | 16/16 |
| reduced motion: final at frame 0 (0 running, windows home, dash closed) and `drawn` already fired, for underline and ring, mounted and off-screen in-view | 16/16 (`drawn` 3.5–5.8 ms after mount) | 16/16 (4–8 ms) |
| print: the same | 16/16 | 16/16 |
| ring under the stall (recorded, not gated) | rise 0–0.002 while the control moves: the ring still stalls, as it keeps dashoffset | 0 frames |

**v11.0.0 readings (RED; Chromium exit 1, WebKit exit 1):**

| claim | Chromium | WebKit 2287 | what v11.0.0 reads |
| --- | --- | --- | --- |
| stall: paint advances through the task | 0/12 | unmeasurable | Chromium: 2–4 frames inside each task with the control moving, but stroke progress flat (rise ≤ 0.002, e.g. 390 light underline 0.020, 0.020, 0.020) |
| compositor property | 0/12 | 0/12 | `strokeDashoffset`, durations by length (e.g. 289.9 ms) |
| `drawn` | 0/4 | 0/4 | no event |
| reduced motion | 0/16 | 0/16 | final, but no `drawn` |
| print | 0/16 | 0/16 | no `drawn`; 2 draw animations running and the dash open at frame 0 |

The probe's summary line counts the recorded-not-gated rows as not failing, which is why v11.0.0
reads 4/64 in Chromium and 16/64 in WebKit. Not one gated claim passes on v11.0.0 in either engine.

**The look at rest matches v11.0.0** (`compare.mjs`, `out/compare.json`, 32/32 hold, exit 0).
Each crop is compared per engine, width, theme and shape. A pixel differs when a channel moves
by more than 48 of 255.
- Chromium: 0 differing pixels in 16 crops (largest channel delta 12).
- WebKit: 4 differing pixels in 16 crops, at most 0.018 % of a crop (largest delta 54, in
  antialias).

Paint, all in `out/png/`:
- `{green,red}-{engine}-rest-*-{shape}.png`: the four shapes at rest, per tree.
- `green-chromium-stall-*-{0..n}.png`: the strip across the task, from A's frame through each
  in-task frame to the first frame after it. For example,
  `green-chromium-stall-1440-dark-highlight-3.png` shows the band wiped to "sea" behind the
  letters mid-task. The `red-chromium-stall-*` strips hold still.
- `green-*-{reduced-motion,print}-*.png`: the final mark at frame 0, including the off-screen
  in-view mark scrolled to.

### WebKit: why the stall reading is unmeasurable

On both trees, Playwright WebKit's screencast produced no frame between markers A and B in any
cell. A diagnostic with a 400 ms task (`diag-webkit.sh`, `out/trial/diag400*-webkit.json`) also
produced none on either tree. The first frame after the task already showed the draw finished on
both trees (v11.0.0 catches up by time on the next main-thread frame). The control square, a
plain composited transform animation, never moved inside a task. So this screencast captures
through the web process's main thread and cannot see compositor frames while that thread is
blocked. That is a limit of the instrument, and it cannot tell a stalled draw from a running one.
What WebKit does witness:
- the draw animates `transform` alone, a property WebKit accelerates, where v11.0.0 animates
  `strokeDashoffset`, which it does not;
- `drawn`;
- reduced motion and print;
- the look at rest.

## Gates

`lane-L7/gates.sh` ran on the committed tree at `d4d30bc71`, as one guarded heavy run. Logs are
in `lane-L7/gates/`, with exit codes in `gates/chain.log`.

| run | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` (first) | 277 files; 1 failed (`GlassDock.persistent-face.test.ts` › "a fine press on a #persistent-end seat inside the hover dwell never expands the dock": `onClick` called 0 times), 2559 passed | 1 |
| that file alone, 3 runs (guarded `--light`) | 12/12, 11/12 (the same test), 12/12 | — |
| `vitest run --maxWorkers=2` (second, guarded) | 277 files; 2561 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` (first) | ratchet increase forbidden: 3014587 > 3011926 | 1 |
| ratchet rebind, then `verify:package` again | `terminal: CLEAN` | 0 |
| HandMark units (`tests/components/custom/handmark`, `tests/components/handmark`) | 4 files, 71 passed | 0 |

**Ratchet rebind: `.bundle-ratchet` 3011926 → 3014587 (+2,661 B).** The datum 3011926 is lane
L6's committed-tree measure. `git diff --stat 187f83dc1 HEAD -- src` names one file,
`HandMark.vue`. The bytes are the window wrapper and its inline geometry, the window and frame
keyframes and their media-gated rules, the re-ink branch for the two channels, and the `drawn`
cycle (the per-line end count, the one-frame defer, the motion-media listener). The removed
per-shape mask partly offsets them. The rebind is deliberate, and this is its record.

**e2e** (`lane-L7/e2e.sh`, `handmark.spec.ts`, guarded; WebKit under `--exclusive webkit`):
10 passed in each of the four runs, exit 0 each (`gates/chain.log`, `gates/e2e-*.{log,json}`):

| tree | Chromium headless shell | WebKit 2287 |
| --- | --- | --- |
| branch (`d4d30bc71`) | 10 passed | 10 passed |
| v11.0.0 | 10 passed | 10 passed |

The spec guards the hand voice's existing paint: no viewBox on `svg.hm-mark`, the band under the
letterforms, the ring's reserved room, one ink path per line rect, and the mark whole at rest. It
passes on both trees, so the branch keeps every existing paint claim, and the RED/GREEN split
lives in the witness above. The spec's captures were moved to `lane-L7/gates/png/`, and the
tracked `docs/tranches/BK/audit/visual` files were restored and not changed.

## CHANGELOG

The 11.1.0 "HandMark" section gains two bullets in consumer prose:
- the draw stays smooth while the page is busy, the finished mark looks the same, and a ring
  still draws round its own path;
- `drawn`, with when it fires (after the last line; at mount under reduced motion, in print or
  with `:draw="false"`; again after each `retrigger` redraw) and a short `@drawn` example.

## Open gaps

- **WebKit's stall reading is unmeasurable in Playwright WebKit 2287** (above). Real Safari,
  where Core Animation runs accelerated transform animations outside the web process, is not
  measured. A Safari-side reading of paint through a long task is owed to whoever holds a
  Safari instrument that sees compositor frames.
- **The ring keeps the main-thread dashoffset draw** and still stalls under a long task
  (Chromium, rise ≤ 0.002 while the control moves). No compositor property follows a closed
  curve of about 390° while keeping the stroke's look. Captures: the ring rows in
  `out/png/*-rest-*-circle.png` and `*-stall-*-circle-*.png`.
- **The `GlassDock.persistent-face.test.ts` flake** (lane L6's test, `72f2d5ec5`): it failed once
  in the full suite and once in three isolated runs, and passed otherwise. It mounts no HandMark,
  and L7 changed no dock file. Recorded for the dock's owner.
- **`markDuration` / `minJerk`** stay exported and unused (L5's gap; removing them is a major).
