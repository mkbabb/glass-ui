# Ambient family: the animation record

Recorder: claude-opus-5-5. Tree: the published v11.0.1 (`e42bc2705b0e0ff13d62464c419c51e1f5495d13`), served from `harness/tree-v11.0.1` on this recorder's own port (5405, stopped at the end). Components: aurora, blob, constellation, fourier-field, music-staff, handmark, easing (EasingPicker and EasingCurve).

## How it was read

Two instruments, both one headless browser per run, a new context per cell, everything closed in `finally`.

- **DOM motions** (music-staff, handmark, easing, the blob's hover shadow) ran through `harness/probe.mjs` with the scenarios in `scenarios/`, and `harness/faults.mjs` read the rows. Rows, analyser output and the per-frame reader are in `rows/` (`*.rows.json`, `*.faults.txt`) and `tools/rd.mjs`.
- **Canvas fields** (aurora, blob, constellation, fourier-field) cannot be read from DOM boxes, so `tools/amb.mjs` reads three other things:
  1. Every rendered frame, from document start. It logs the frame's time and the draw calls since the previous frame. It counts them by wrapping `GPUQueue.submit`, the WebGL draw calls and a few 2D calls on their prototypes. It never calls `getContext`, so it takes no context away from the page.
  2. Per frame, the computed opacity and filter of the canvas, its cross-fade layer and the aurora ground.
  3. The screen. CDP screencast frames are cropped to the component and differenced frame to frame in a second, blank context. **d** is the mean absolute RGB difference from the previous frame (0 to 255), and **L** is the mean luma.

  A visible jump is a spike in d against the idle baseline. A cut stop is d falling to 0 in one frame. A `*n` next to a value means the screencast skipped about n ms, so that one d covers several page frames. Outputs are in `rows/amb/`, `rows/amb2/` (the pause, poke, click and preset reruns), `rows/rep/` (mount repeats), `rows/webkit/` and `rows/trace/`. `tools/sum.mjs` prints any of them.
- **Engine and cells.**
  - Chromium 149 headless shell with GPU compositing (`--use-angle=metal --enable-gpu-rasterization`, plus `--enable-unsafe-webgpu` for amb), rendering at a median 8.3 ms a frame.
  - Cells: 1440 fine light, 390 coarse light (CDP touch), and 1440 reduced motion. 1440 dark ran once, for the music-staff strike, the one place in this family where colour runs in a loop.
  - WebKit (Playwright build, rows only, `guarded --exclusive webkit`) confirmed the faults ranked first, as noted in each block. It renders at about 60 Hz.
- **Strips.** Every strip is in `strips/`. amb strips are labelled with ms from the trigger and the d of each frame. probe strips use the harness's labels.
- **Layout in frames.** A traced run counted layout per frame for three DOM motions (`rows/trace/`): the playhead glide, the seal and the easing preview. The canvas fields run no layout per frame.

What every canvas field shares (`src/composables/glass/webgl/createCanvasLifecycle.ts`, `visibility.ts`, `src/styles/viz-reveal.css`):

- the reveal bloom on first sight (`substrate-reveal-bloom`, 1100 ms, `--ease-out`, opacity 0 to 1 with a brightness lift to 1.08 at 55 %), which aurora opts out of;
- parking when the tab is hidden or the field is off screen, and when paused;
- one static frame under reduced motion.

Several faults below come from that shared code and show up in more than one field. They are filed once each, in the ranking at the end.

## Aurora

`src/components/aurora/`. The story's stage runs on the WebGL2 substrate (`data-aurora-substrate=webgl`) in this build of Chromium.

| Animation | Trigger | What moves | Clock and easing (computed) | In / out |
|---|---|---|---|---|
| Ground to live field | mount, once armed | `.aurora-canvas-layer` opacity 0 to 1 over the palette ground | `transition: opacity var(--duration-slow)` = 450 ms, `--ease-standard` (Aurora.vue:375-378) | in 450 ms (layer at 1.000 by 795 ms after starting at 362 ms); there is no out |
| Ground change | config or preset change | the new `.aurora-placeholder` fades in over the old one | `aurora-ground-in`, `--duration-fast` 200 ms, `--ease-standard` (Aurora.vue:363-371) | in 200 ms, measured f57 to f82; it runs under an opaque canvas |
| Live palette change | preset click | the canvas field's colours | none: the uniforms change on the next frame | lands in one frame |
| Drift | idle | the field | rAF, one GPU draw per frame | continuous |
| Cursor field | pointer in the stage | the field bends toward the cursor | pointer field tick per frame | d rises from 0.40 to 0.47 under the pointer, with no step at enter or leave |
| Light orbit | `interactivity.light` | light direction | renderTime × 0.25 | not reached: off in the story |
| Nucleus drag | story overlay | demo nuclei | demo only | not reached (not the component) |
| Park and resume | tab hidden, scrolled away, paused | the loop | `suspend` / `resume` | stops within one frame; resume jumps (see A-2) |
| Reduced motion | reduce | one static frame | layer `transition-duration: 1ms` (Aurora.vue:392-399) | a cut (see A-3) |

Idle pacing over 5 s (1440 fine): 603 frames, median 8.3 ms, p99 9.3, max 16.1, 0 dropped, a GPU draw on 603 of 603 frames. 390 coarse: 683 frames, 0 dropped. Hidden or off screen: no draws for the whole 1.5 s (gap 1508 ms). Resize at 1440 to 1200: one re-layout frame (d 31), then the field at its new size on the next frame, with no blank or stretched frame.

### A-1. Aurora · preset change · FIRST-FRAME JUMP (lands whole)
- **Measured:** clicking the "Sky" preset with "Setting Sun" showing: d 0.36 → **90.9** in one frame (+63 ms), then 0.37. Back to "Setting Sun": d **91.0** in one frame. The 200 ms ground fade does run (ground#1 opacity 0 → 1 over f57 to f82), but under the opaque canvas layer, so it is never seen. There was a 41.6 ms dropped frame at the click (f58, both clicks). Rows: `rows/amb2/aurora.chromium.1440-fine-light.amb.json` (phase `preset`).
- **Strip:** `strips/aurora.chromium.1440-fine-light.preset.presetA.png`. Tile #3 is warm and tile #4 is blue: the whole stage changes in one frame.
- **Cause:** the palette and config uniforms are written straight from the config on the next frame. The only tween, the ground fade, is under the canvas (Aurora.vue:363; runtime.ts config apply).
- **Smallest cure:** cross-fade the canvas layer itself. Hold the previous frame, or drop the layer to the new ground and fade back in over `--duration-slow`. Better, interpolate the palette uniforms over 300 to 450 ms in the shader loop the drift already runs. The cure is a patch, with no API change.
- **WebKit:** not run. The cause is engine-independent (a uniform write), and WebKit rows cannot see canvas pixels.

### A-2. Aurora (shared lifecycle; also blob) · resume after hidden, off screen or pause · FIRST-FRAME JUMP
- **Measured:** after 1.5 s hidden, the first frame on return is d **3.6** against a baseline of 0.41 (8.8×), +15 ms after `visibilitychange`. Scrolled back after 1.5 s away, the first steady frame is d **3.63** against 0.38. The blob does the same: hidden d **2.13** against 0.14 (15×), and play after pause d **1.41** against about 0.1 (`rows/amb2/blob…`, phase `pause`).
- **Strip:** `strips/aurora.chromium.1440-fine-light.hidden.show.png` (tile #2) and `strips/blob.chromium.1440-fine-light.pause.play.png`.
- **Cause:** `createCanvasLifecycle.ts:272`, `startTime = performance.now() - 1000` in `resume()`. Every resume restarts the field's clock at t = 1 s, so the field jumps from wherever it paused to its one-second pose. The fourier field and the constellation keep their own clocks and do not jump (d 0.043 and 0.087 on return).
- **Smallest cure:** keep the elapsed time across a park. Store `elapsed` at `suspend()` and set `startTime = performance.now() - elapsed` at `resume()`. The cure is a patch.

### A-3. Aurora · reduced motion · CUT (the ground-to-field handover)
- **Measured:** under reduce, the layer goes 0 → 1 between f21 and f24 (303 → 328 ms) with no frames between. On screen, d **17.2** and L 164 → 183 in one frame (+340 ms). P6 asks that reduced motion keep a shortened fade.
- **Rows:** `rows/amb/aurora.chromium.1440-rm.amb.json`. **Strip:** `strips/aurora.chromium.1440-rm.mount.png`, last tile.
- **Cause:** Aurora.vue:392-395 (`transition-duration: 1ms`). The library's universal reduced-motion rule also sets `transition-duration: 0s !important` (`src/styles/utilities/a11y-overrides.css:46-53`), which is the same gap as O-308.
- **Smallest cure:** keep an opacity-only fade of about 150 ms under reduce (the P6 fade). It needs the O-308 carve to let opacity through.

### A-4. Aurora · mount · observation (no fault in the tween)
The cross-fade is monotone and eased (layer opacity 0 → 1.000 from 362 to 795 ms, no step over 0.051). The live field is lighter than the palette ground beneath it, though: L goes from 163.8 to 181.1 across the fade. So every mount reads as a 10 % brightening rather than a quiet handover. The ground's colour samples do not match the field's first frame. Low.

## Blob

`src/components/blob/`. WebGPU in Chromium; WebGL2 in WebKit.

| Animation | Trigger | What moves | Clock and easing | In / out |
|---|---|---|---|---|
| Reveal bloom | first visible | canvas opacity 0→1, brightness 1→1.08→1 | `substrate-reveal-bloom` 1100 ms `--ease-out` | in 1100 ms (see B-1) |
| Idle breath and drift | idle | the body and satellites | shader time, one GPU draw per frame | continuous |
| Pointer lean | hover | the body leans toward the pointer | two critically damped springs, response 0.18 s (useBlobPointer.ts:55-60) | after a fast leave: about 1 s of large wobble (d 2 to 10), with the body swelling past its wrapper (B-3) |
| Click impulse | click or Enter | squash and recoil | spring impulse | biggest step in the first frame (d 11.6, then 3.4, 2.9, 2.0), as an impulse should be; settles in about 250 ms |
| Poke | story button | the same impulse | the same | d 2.3 to 4.0 for about 150 ms, no single-frame spike |
| Hover shadow | hover the hit disc | wrapper `filter` (two drop shadows) | `filter var(--duration-slow)` 450 ms `--ease-standard` (Blob.vue:356) | in 333 ms, out 333 ms (2 % band); clean |
| Mood / preset | preset row | the shape morph, and the palette | shape: `TRANSITION_MS[mood]`; palette: none | the palette lands in one frame (B-2) |
| Pause / play | `v-model:paused` (DockBackgroundToggle) | the whole loop | `suspend("manual")` | stops in one frame, starts at full speed with a jump (B-4, A-2) |
| Park | hidden or off screen | loop | as aurora | stops within one frame; resume jumps (A-2) |
| Reduced motion | reduce | one static frame | no bloom, no filter transition (Blob.vue:412-419) | appears whole: d 9.95 in one frame at 2906 ms |

Idle (1440 fine): 677 frames, median 8.3, max 16.6, 0 dropped, a draw on every frame. 390 coarse: 603 frames, 0 dropped. Resize: one re-layout frame (d 12.4), no blank frame.

### B-1. Blob and fourier field (shared) · mount · FIRST-FRAME JUMP: a full-strength flash before the bloom
- **Measured (Chromium, every run):**
  - The first GPU frame is presented with the canvas at opacity 1. One frame later `data-substrate-reveal` lands and the canvas drops to 0, then fades in.
  - Blob 1440: first draw f228 at 1986.8 ms, op 1; reveal f229 at 1995.3 ms, op 1 → 0; the fade starts at f230 (0.032).
  - On screen, the blob appears whole (d **9.95**, tile #3 at 2003 ms), vanishes (d **9.95**, #4 at 2009 ms) and then fades in.
  - Fourier 1440: first draw f22 at 249.4 ms, reveal f23 at 257.7 ms (tiles #4 and #5).
  - The same happens at 390 coarse (blob 255.3 / 263.6 ms; fourier 314.3 / 322.7 ms) and in all 8 mount repeats (`rows/rep/`, blob and fourier ×4): the first draw is always at op 1, with the reveal 7.8 to 15.3 ms later.
- **WebKit:** the first draw and the reveal land on the same frame (f18, 610 ms), but after a 240 ms and a 101 ms frame. The opacity is already **0.287** on the first visible frame, so the fade starts at 29 % (`rows/webkit/blob.webkit.1440-fine-light.amb.json`). That is the same fault seen at 60 Hz: the bloom's beginning is not on screen.
- **Strips:** `strips/blob.chromium.1440-fine-light.mount.png` (#3, #4) and `strips/fourier-field.chromium.1440-fine-light.mount.png` (#4, #5).
- **Cause:** `visibility.ts:256-269`. The reveal attribute is written from a one-shot IntersectionObserver callback, which runs after the first frame has painted. Until then the canvas has no opacity rule, and the first draw is already on it.
- **Smallest cure:** when a reveal is armed, start the canvas at `opacity: 0`, for example `canvas[data-substrate-reveal-armed] { opacity: 0 }` set at arm. Set the reveal attribute in the same frame as the first draw, or have the keyframes' `from` hold through `animation-fill-mode: backwards` from arm. The cure is a patch.

### B-2. Blob · mood/preset change · FIRST-FRAME JUMP (the palette lands whole)
- **Measured:** "Serene" clicked over "Calm": d 0.13 → **32.9** in one frame (+24 ms), then 0.11 to 0.46 while the shape morphs. Cream turns to cyan between two frames. Rows: `rows/amb2/blob.chromium.1440-fine-light.amb.json`, phase `preset`.
- **Strip:** `strips/blob.chromium.1440-fine-light.preset.presetA.png`, tiles #3 and #4.
- **Cause:** the palette is fed live to the shader as the new stops (`useMetaballRenderer.ts:251-253` repaints on a colour change). The mood transition (`useBlobMood.ts:107-113`) tweens the shape targets only.
- **Smallest cure:** lerp the palette in OKLab over the mood transition's own `TRANSITION_MS`, on the clock the shape already uses. The cure is a patch.

### B-3. Blob · lean and settle · the body is clipped flat by its own wrapper
- **Measured:**
  - After a fast leave, the body swells wider than its 496 px wrapper. Frames #4 to #6 of the leave strip (+21 to +73 ms) show both sides cut off in straight vertical lines.
  - The wrapper computes `content-visibility: auto` with `contain: layout style`. `content-visibility: auto` always applies paint containment, and paint containment clips to the box. The comment at Blob.vue:333-340 assumes it does so only while the element is skipped.
  - Control run, the same path with `content-visibility: visible` set on the wrapper: no flat edges. The body swells to fill and overflow the whole 512 px crop for about 200 ms (+203 to +404 ms), then wobbles for about 1 s (d 2 to 10) before settling.
- **Strips:** `strips/blob.chromium.1440-fine-light.pointer.leave.png` (clipped) and `strips/blob.chromium.1440-fine-light.cvvis.pointer.leave.png` (control).
- **Cause:** Blob.vue:341-342 (`contain: layout style; content-visibility: auto`). The size of the overshoot after a fast leave is a second, separate read. Overshoot is ruled for the blob (P2), but here it fills the frame.
- **Smallest cure:** move `content-visibility: auto` from the wrapper to an outer host that is at least the canvas's 160 % box, or drop it and rely on the IntersectionObserver park the lifecycle already composes. Separately, clamp the velocity squash so the body stays inside its 160 % canvas. The cure is a patch.

### B-4. Blob and fourier field (shared) · pause / play · LAST-FRAME SNAP (cut stop) and FIRST-FRAME JUMP (cut start)
- **Measured:**
  - Fourier, from the transport toggle: moving at baseline d 0.074 at +75 ms, then **0** from +86 ms. It stops dead in one frame. Play: d 0.061 at +73 ms against a baseline of 0.068, so it is at full speed on its first frame (`rows/amb/fourier-field…1440-fine-light`, phase `pause`; repeated in `rows/amb2/`).
  - Blob, from the story's DockBackgroundToggle: d 0.164 at +12 ms, then 0 from +21 ms. Play: d **1.41** at +26 ms (A-2's time reset), then 0.095.
- **Strips:** `strips/fourier-field.chromium.1440-fine-light.pause.pause.png` (#8 → #9) and `…pause.play.png`, plus `strips/blob.chromium.1440-fine-light.pause.pause.png` and `…pause.play.png`.
- **Cause:** pause is `suspend("manual")`, which cancels the rAF (`createCanvasLifecycle.ts:259-266`; `useFourierField.ts:217-218`). Nothing slows the field first.
- **Smallest cure:** ramp a rate multiplier on the field's own clock to 0 over `--spring-world-duration` before parking, and back from 0 on play. The fourier clock already takes `speed` per step (clock.ts `step({speed})`), and the shared lifecycle can expose a `rate` for aurora and the blob. The cure is a patch; WCAG 2.2.2 needs a pause, not an instant one.

## Constellation

`src/components/constellation/`. Canvas 2D (CPU raster): four live canvases above the fold, each with 95 to 150 2D calls per frame.

| Animation | Trigger | What moves | Clock and easing | Reading |
|---|---|---|---|---|
| Mount | first paint | the field | no entrance (the Canvas 2D path does not arm the bloom) | arrives with its card on the page's first paint (d 8.3); no separate snap |
| Drift | idle | nodes and links | rAF, Canvas 2D every frame | clean |
| Steer and lens | pointer | nodes lean toward the cursor; stacked rings trail the pointer | per-frame | large but continuous (d 1.3 to 2.5), no single-frame spike that is not a screencast gap |
| Warp | click (warp host) | focal node to the nearest node | warp spring (constants.ts:44-61) | d 0.11 → 0.41 → 0.09 over 230 ms, no first-frame spike; clean |
| Gravity well | hold, then release | the lattice pulls in, then lets go | 140 ms hold, then a ramp of 8/s; brisk release | one frame of d 0.27 at press (+9 ms) against 0.10, then a smooth ramp; clean |
| Wander | cadence (refit host) | the focal drifts | warp spring, 1.4 s ± 0.6 s cadence | runs; not separately read |
| Pinned drift / recession | story cards | — | easeInOutQuad 2600 ms legs | not reached: below the fold, parked |
| Park | hidden or off screen | loop | as the shared lifecycle | stops within one frame; **no jump on resume** (d 0.087 against 0.06) |
| Resize | viewport 1440 → 1200 | re-fit | one frame | d 3.9 to 4.9 in one frame, then baseline; no blank frame |
| Reduced motion | reduce | one static frame | — | arrives with the card; the pointer causes no draws (2 draws in 5 s) |

Idle (1440 fine): 661 frames, median 8.3, max 9.5, 0 dropped, Canvas 2D on every frame. 390 coarse: 606 frames, 0 dropped. No faults filed. The lens's ring trail is large on screen, but it reads as one continuous gesture.

## Fourier field

`src/components/fourier-field/`. WebGPU in Chromium.

| Animation | Trigger | What moves | Clock and easing | Reading |
|---|---|---|---|---|
| Reveal bloom | first visible | canvas opacity and filter | 1100 ms `--ease-out` | B-1, and a stall (F-3) |
| Epicycle drawing | idle | the figure | its own clock: `headT += rate·dt` (clock.ts) | continuous, 0 drops |
| Scrub | pointer moving right | the drawing speeds up | `rate += velocity × gain` | continuous |
| Hold | pointer moving left | the drawing stops (it may never run backward) | rate floored at 0 | eases to rest over about 130 ms (d 0.06 → 0.02 → 0); clean |
| Pointer enter / leave | the pointer crosses the host | the clock | velocity field | F-2 |
| Flick | fast move | one impulse on the world spring | ζ ≥ 0.82, no backward frames | not separately triggered |
| Pause / play | transport toggle or Space | the loop | `suspend("manual")` | B-4 |
| Park and resume | hidden or off screen | loop | own clock: dt clamped ≥ 0 | stops in one frame; no jump on resume (d 0.043) |
| Resize | viewport | canvas | one frame | d 6.1 then 1.9 then baseline; widening once cost a 50 ms frame (LoAF 62 ms, no script) |
| Reduced motion | reduce | one static frame | — | appears whole (d 0.97). The pointer still causes 123 GPU submits over the pass, each drawing the same frame (F-4). |

Idle (1440 fine): 599 frames, median 8.3, p99 10.6, max 12.0, 0 dropped, a draw on every frame. 390 coarse: 602 frames, 0 dropped.

### F-2. Fourier · pointer enter and leave · FIRST-FRAME JUMP / cut start
- **Measured (1440 fine):**
  - Entering the host from above, the drawing stops for 3 to 4 frames: d **0** at +34, +40, +49 and +56 ms against a baseline of 0.07. It resumes with d 0.018 at +64 ms, then a 1.6× step (0.115) at +81 ms. The earlier run read the same: 4 frames at 0 at +6 to +31 ms after the first move in.
  - After the leftward hold (drawing at rest), leaving the host restarts the drawing at full rate in one frame: d 0 → 1.20 (the pointer glow leaving) → 0.093 → 0.061 (+2477 to +2502 ms after the leave mark).
- **Strips:** `strips/fourier-field.chromium.1440-fine-light.pointer.enter.png` and `…pointer.leave.png`.
- **Cause:** `useFourierField.ts:111-118`. `engaged` switches the scrub term on and off in a single frame, and the first pointer sample's velocity holds the rate at the floor for a few frames.
- **Smallest cure:** blend the scrub term in and out over the velocity field's own smoothing, ramping engagement over about 100 ms, so that the clock's rate never changes by more than its eased step. The cure is a patch.

### F-3. Fourier · mount · DROPPED FRAMES inside the bloom (lands 63 % in one step)
- **Measured:** in 2 of 6 mounts at 1440, the bloom lost its first 300 ms to one long frame.
  - Rep 1: opacity 0.032 → **0.667** in one step across a **341.5 ms** gap (f29 → f30). The long animation frame was 370 + 344 ms, with no script attributed.
  - Trial run: 0.027 → **0.596** across 282.2 ms (LoAF 323 + 290 ms, no script).
  - The other four were clean (largest step 0.040). The blob never stalled in 6 runs.
- **Rows:** `rows/rep/fourier-field.chromium.1440-fine-light.rep1.amb.json`.
- **Cause:** a long frame with no script in it, right after the first WebGPU frames, which is consistent with pipeline compilation on the first draw. The bloom's CSS clock runs on through it.
- **Smallest cure:** start the reveal after the second presented frame, not the first; or create the pipelines with `createRenderPipelineAsync` before arming. The cure is a patch.

### F-4. Fourier · reduced motion · wasted draws (no visible fault)
Under reduce, each pointer event wakes the field: 123 GPU submits over the 5.8 s pointer pass, every one of them the same frame (d 0). Low. Cure: in `onMove`, skip `wake()` when the clock is frozen.

## Music staff

`src/components/music-staff/` (styles.css:150-375).

| Animation | Trigger | What moves | Clock and easing (computed) | In / out |
|---|---|---|---|---|
| Rule draw | mount | `.music-staff__line` clip-path inset right 100 % → 0 | 520 ms `--ease-out-expo`, delay 28 ms × rule index | in 520 ms |
| Barline draw | mount | clip-path bottom 100 % → 0 | 520 ms expo, delay 120 ms | in |
| Clef | mount | clip wipe, then scale 0.96 → 1 | wipe 520 ms expo; settle 200 ms `--spring-present`, delay 300 ms | in |
| Note land | mount (score) | translateY(−0.9) scale(0.86) → none | 450 ms `--spring-panel`, per-note delay | in; panel overshoot to 1.0011 is designed |
| Heads, accidentals, ledgers, dots, flags | mount | opacity 0 → 1 | 120 ms `--ease-standard`, per-note delay | in |
| Stems, beams | mount | scaleY / scaleX 0 → 1 | 210 ms `--spring-dock` | M-1 at the end |
| Score breath | after the draw | rule opacity 0.49 ↔ 0.61 | 5.2 s `--ease-standard` alternate, delay 260 ms × index, no fill | M-5 at the start |
| Bead | loop | playhead circle 0.7 → 0.9 opacity, scale 1 → 1.06 | 5.2 s alternate | clean |
| Reel | loading | translateX by one period | 8 s (11 s in the second story staff) linear | clean (linear by design) |
| Strike | loading | note scale 1 → 1.08 and colour to accent, in loop stops | linear loop, rise in 1.2 % (96 ms) | clean in light and dark: no faults in 3 s |
| Playhead and blue-pencil edge | score progress | translateX | 210 ms `--spring-dock` | M-1 at the end |
| Progress ink | loading progress | `inline-size: calc(progress × 100%)` | none | M-2 |
| Seal | loading progress reaches 1 | reel paused, notes stop, transport settles, final barline wipes in | settle 450 ms `--spring-panel` from translateX(−0.5); wipe 520 ms expo | M-3 |
| Unseal | progress back below 1 | the reverse | none | M-3 |
| Replay | story button | the story's `fade` 200 ms out, then remount and draw | — | fade out clean (eop 1 → 0 over f9 to f33) |
| Reduced motion | reduce | — | the universal rule kills every animation | M-4 |

Interruption: the score playhead was sent to End and then Home 110 ms into the glide, about 55 % of the way. It turns from where it is (712.8 → 707.8 → 696.5, no jump), so there is no INTERRUPTION fault. The 30 % and 80 % reversals were not run. Layout: on the music-staff page, the traced runs lay out on every frame (439 layouts in 436 frames during the progress run; 517 in 516 during the seal), about 0.13 ms a frame. The staffs' running SVG animations keep layout dirty even at rest. Low.

### M-1. Music staff (library-wide token) · every `--spring-dock` / `--spring-present` motion · LAST-FRAME SNAP
- **Measured:**
  - Playhead after the mid-glide reversal (306 px of travel): steps 4.03, 3.38, 2.77, then **7.75**, then 1.92 to rest (f277 → f281, `rows/ms-progress…1440-fine-light.rows.json`).
  - WebKit: the last step is **9.71 px after 7.73** (5 % of travel), and on the PageUp step 1.25 after 0.90 (`rows/webkit/ms-progress…faults.txt`).
  - Stems: scaleY 0.970 → 1.000 in the last frame, 1.15 px after 0.38 (f80 → f81, `rows/ms-replay…`). The clef settle and the beams end the same way.
- **Strip:** `strips/ms-progress.tree-v11.0.1.chromium.1440-fine-light.seg4.end.png`.
- **Cause:** `src/styles/tokens/scheme-spring.css:61`. The `--spring-dock` `linear()` ends `… 0.97317 97.959%, 1`, so the last 2 % of the clock carries 2.7 % of the travel, and with a reversed transition more. `--spring-present` ends `0.9755 97.959%, 1`. The curve stops at the 2 % band and then steps to 1. That is how `scripts/regen-spring-tokens.mjs` cuts the stops.
- **Smallest cure:** generate the stops until |1 − x| < 0.002, and let the duration token include that tail, or ease the last stop onto 1 (for example 0.985 at 96 %, 0.995 at 98.5 %). The cure is a patch (a token regen) and it touches every consumer of these springs. Rank it library-wide.

### M-2. Music staff · loading progress · FIRST-FRAME JUMP (lands whole)
- **Measured:** each PageUp (+10 %) widens the ink by **183.9 px in one frame** (f7, `ms-seal…1440-fine-light`). The seal step (20 % → 100 %) widens it by 1471.6 px in one frame (f178 → f179), and unsealing drops it 1839.5 → 0 in one frame (f348 → f349). In score mode, by contrast, the playhead and its edge glide on the dock spring.
- **Strip:** `strips/ms-seal.tree-v11.0.1.chromium.1440-fine-light.p1.png`.
- **Cause:** styles.css:159-163. `inline-size: calc(var(--_music-staff-progress) * 100%)` has no transition, and it is a layout property.
- **Smallest cure:** draw the ink at full width and scale it, `transform: scaleX(var(--_music-staff-progress))` with `transform-origin: left`, on the playhead's `--spring-dock` transition. That also removes a layout per change. The cure is a patch.

### M-3. Music staff · seal and unseal · FIRST-FRAME JUMP, LAST-FRAME SNAP, CUT
- **Measured (seal at f178 → f179, 1440 fine):**
  - The transport jumps **−4.36 px** in one frame (its settle keyframe's `from: translateX(−0.5)` lands at once), then springs back over about 450 ms. The reel had been moving 0.33 px a frame and stops dead on the same frame.
  - A note caught mid-strike snaps from its accent colour and scale 1.034 to ink and 1.000 in one frame (note#10: oklab L −0.155, scale −0.034).
  - The traced run reads the same at f177.
- **Measured (unseal at f348 → f349):** the ink drops from 1839 px to 0 in one frame, the final barline is removed at opacity 1 (CUT), and the strike starts again mid-phase.
- **Strips:** `strips/ms-seal.tree-v11.0.1.chromium.1440-fine-light.seal.png` and `…unseal.png`.
- **Cause:** styles.css:281-293. `animation-play-state: paused` on the reel, `animation: none` on the notes, and a settle that begins away from rest. In MusicStaff.vue:386 the seal is a `v-if` with no leave.
- **Smallest cure:**
  - Start the settle from rest with velocity (keyframes `0%: none, 30%: translateX(−0.5), 100%: none`).
  - End the strike by letting the current iteration finish (`animation-iteration-count` set to the current iteration) instead of `none`.
  - Wrap the seal in a Transition that wipes it out the way it wiped in.
  - These are patches.

### M-4. Music staff · reduced motion · the loading surface stops signalling busy
- **Measured:** under reduce, the loading staff is static. No animation runs and rule opacity holds at 0.55 for 3 s (`ms-strike…1440-rm`: no changes at all). The style sheet means the rules to breathe as the busy cue under reduce (styles.css:297-301), but the universal rule sets `animation-duration: 0.01ms !important; animation-iteration-count: 1 !important` (a11y-overrides.css:46-53).
- **Cause and cure:** the same carve as O-308. Exempt the breath (an opacity-only loop) from the universal rule, with `data-allow-motion` on the loading figure or an opacity-only carve. The cure belongs to O-308's wave.

### M-5. Music staff · score breath start · FIRST-FRAME JUMP (small)
- **Measured:** 260 ms and 520 ms after the draw, four of the five rules step **0.55 → 0.49** in one frame: rules 1 and 3 at f65, rules 0 and 4 at f96 (`ms-replay…1440-fine-light`). The same happens at mount (f177 and f208 in `rows/amb/music-staff…1440-fine-light`). Rule 2 has no delay and starts at 0.49 with the draw.
- **Cause:** styles.css:212-216. The breath has a delay and no `backwards` fill, so the rule rests at its base 0.55 and then jumps to the keyframe's 0.49.
- **Smallest cure:** add `backwards` to the breath leg. The rule then waits at 0.49, hidden under its own wipe for the first frames. The cure is a patch. Low.

## HandMark

`src/components/handmark/HandMark.vue`.

| Animation | Trigger | What moves | Clock and easing | Reading |
|---|---|---|---|---|
| Draw on | mount | `.hm-guide` stroke-dashoffset total → 0 (a mask) | WAAPI; minimum-jerk; duration from the mark's length; a delay of four frames per line (HandMark.vue:229-285) | H-2 at the start; otherwise clean |
| Ink settle | mount | `.hm-ink` opacity 0.85 → 1 | 200 ms `--spring-present` | clean (it ends on the M-1 tail, by 0.004 opacity: invisible) |
| Re-ink | pointerenter, pointerdown, focusin | stroke redrawn from 35 %; nib swells 4 % | 220 ms `--spring-press`; the swell is reset by a 220 ms `setTimeout` | H-1 |
| Replay | `play()` | redraw from undrawn | as the mount | H-3 |
| Ink-lag | scroll | the mark trails its word by ≤ 1.5 px, then settles | `--spring-world` after 90 ms of quiet | the lag lands with the scroll frame, as designed; the settle is monotone (1.5 → 0.05 px over 420 ms, all sub-pixel); clean |
| Shape change | prop | geometry | none | census row (HandMark.vue:395-397), rare; not re-run |
| Reduced motion | reduce | — | no draw; the mark appears whole with the text | appears with the page (no separate snap) |

Idle: no loop (there is nothing to pace). 390 coarse: the replay tap did not reach the button (no change in 3 s), so that is not reached at 390.

### H-1. HandMark · re-ink on hover · FIRST-FRAME JUMP (lands whole) and the swell snapping both ways
- **Measured (`hm-reink…1440-fine-light`):** on pointer enter (f6 → f7), the dash offset goes 0 → **243.0 px** in one frame. 65 % of the stroke vanishes at once. In the same frame the stroke width jumps 4.113 → 4.278 and the path geometry is re-measured. The redraw then runs 243 → 5.5 over f8 to f33. At f33 → f34 the last step is 5.50 after 3.15, and the width snaps back 4.278 → 4.113 with a second re-measure. The second hover (f165) reads the same. At 390 coarse the same happens on tap.
- **Strip:** `strips/hm-reink-strip.tree-v11.0.1.chromium.1440-fine-light.after-enter.png` (a crop-only rerun, `scenarios/hm-reink-strip.json`; the first frame, f8, shows the ring already cut back to its first third).
- **Cause:** HandMark.vue:290-298. `run(0.35)` starts its animation at `total × 0.65`, and `swell` is a prop swap that remeasures the geometry, set to 1.04 and then back after `setTimeout(220)`.
- **Smallest cure:** keep the stroke drawn and answer the hover with the swell alone, tweened as a `transform: scale(1.04)` on `.hm-mark` on `--spring-press` and back. If a redraw is wanted, start it from the current offset rather than from a cut. The cure is a patch.

### H-2. HandMark · mount · REVERSAL (the draw starts twice)
- **Measured:** the guide starts drawing (169.98 → 169.82 → 169.27 px at f97 to f98) and then jumps back to 169.98 at f99, 885 ms (`rows/amb/handmark…1440-fine-light`, mount). Here only 0.7 px is lost. Where fonts resolve later, a visibly drawn mark would un-draw and redraw.
- **Cause:** HandMark.vue:357-366. `run(0)` is called in `nextTick` and again on `document.fonts.ready`. Each call adds a new WAAPI animation from undrawn.
- **Smallest cure:** run the draw once, after fonts are ready, and only re-measure in `nextTick`. Or skip `run(0)` when an animation is already playing on the guide. The cure is a patch. Low.

### H-3. HandMark · replay · CUT (the out)
- **Measured:** Replay un-draws the whole mark in one frame (dash offset +146.6 px at f7, `hm-replay…1440-fine-light`) and redraws it over about 270 ms. Replay is an explicit request to redraw, so this ranks low. The out is still a cut.
- **Strip:** `strips/hm-replay-strip.tree-v11.0.1.chromium.1440-fine-light.after-replay.png` (crop-only rerun).
- **Smallest cure:** fade the old ink out over about 120 ms (the "out is shorter" pattern), then draw. The cure is a patch.

## Easing (EasingPicker, EasingCurve)

`src/components/easing/`.

| Animation | Trigger | What moves | Clock and easing (computed) | Reading |
|---|---|---|---|---|
| Draw-on sweep | preset, mode, step or term change | stroke clip-path right inset 104 % → −2 % | out: `duration-0`; in: 450 ms `--ease-out-expo` (EasingCurve.vue:89-90; EasingPicker.vue:261-282) | E-1 |
| Travelling dot | Preview | dot along the curve | rAF, 1200 ms, progress linear through the curve | moves clean; its arrival and leave are E-2 |
| Transport | Preview / Cancel / Replay | icon and label swap | `v-if` | E-2 (census item 12) |
| Handle press | pointer down on a handle | handle scale to `--scale-press` | 120 ms `--spring-press` | clean |
| Handle drag | drag | handle and curve follow the pointer | per event | clean: 158 held frames, lag from the grip median 0.05 px, max 0.19, never against the pointer; no sweep under the finger; nothing moves after release. 390 touch: median 0.07, max 0.15 |
| Copy | copy chip | icon swap | `v-if` | census item 12; not re-run |
| Reduced motion | reduce | — | no sweep; dot at its end | the curve changes in one frame (by design, README); the dot appears at its end |

The sweep's tail is not a fault. The visible part of the wipe ends at about 310 ms. The last 225 ms move the clip inside the −2 % margin, where nothing is drawn.

### E-1. Easing · sweep · CUT (the out) on an edit
- **Measured:**
  - The first keyboard nudge of a handle (ArrowUp) un-draws the whole curve in one frame: clip-path right inset −2 % → **104 %** at f7. The curve is gone for two frames (f7 and f8) and then wipes in over 450 ms (f9 →).
  - The second nudge changes nothing, because the preset is already `custom`.
  - Switching to Steps (f153) and back cuts and wipes the same way.
- **Strip:** `strips/ez-sweep.tree-v11.0.1.chromium.1440-fine-light.after-nudge1.png`.
- **Cause:** EasingPicker.vue:286-290. The watch on `[mode, preset, steps, term]` guards drags but not keys, and the first keyboard edit writes `preset = custom`. The un-drawn state is applied on `duration-0` (EasingCurve.vue:90).
- **Smallest cure:**
  - Treat a keyboard nudge as an edit: guard it as drags are, or skip the sweep when the preset moves to `custom`.
  - For real arrivals, fade the old stroke out over about 120 ms instead of cutting it, then wipe.
  - The cure is a patch.

### E-2. Easing · transport · APPEARS, REVERSAL (teleport), CUT, layout shift
- **Measured (`ez-play…1440-fine-light`):**
  - Preview mounts the dot whole (opacity 1, full size) at f7.
  - Replay sends the dot from the end of the curve back to its start in one frame: **356.7 px** in y at f200.
  - Cancel removes the dot at opacity 1 (f259 → f260).
  - The label change moves the status text 127 px and the button 323 px in one frame at f7, as the label rewraps the controls row.
  - The traced run lays out on 146 of the 147 preview frames (SVG `cx` and `cy` writes).
- **Strips:** `strips/ez-play.tree-v11.0.1.chromium.1440-fine-light.after-play.png`, `…after-replay.png` and `…after-stop.png`.
- **Cause:** EasingCurve.vue:177 (`v-if` on the travel dot); usePicker.ts:407-418 (`progress = 0` on replay and cancel); EasingPicker.vue:582-588 (icon and label `v-if`).
- **Smallest cure:**
  - Fade the dot in and out with the P3 coupled fade and a 0.8 scale over about 150 ms.
  - On Replay, fade the dot out at the end and back in at the start instead of jumping.
  - Reserve the button's width for its longest label.
  - Move the dot with `transform` rather than `cx` and `cy`.
  - These are patches.

## The family's faults, ranked by how visible they are

1. **A-1** Aurora: a preset or palette change is a one-frame cut of the whole stage (d 90.9). The ground fade runs unseen under the canvas.
2. **B-1** Blob and fourier (shared lifecycle): the first frame of every field flashes at full strength, vanishes, then fades in (Chromium 10 of 10; WebKit starts the fade at 29 %).
3. **B-2** Blob: a mood or preset change cuts the palette in one frame (d 32.9) while the shape morphs.
4. **M-1** `--spring-dock` / `--spring-present` tokens: every spring motion ends with a step of about 2.7 % of its travel, more after a reversal (7.75 px, and 9.71 px in WebKit). This is library-wide.
5. **B-3** Blob: the body is clipped flat by its own wrapper's paint containment when it leans. After a fast leave it overflows even its canvas.
6. **B-4** Fourier and blob: pause stops dead in one frame and play starts at full speed.
7. **A-2** Aurora and blob (shared lifecycle): every resume (tab return, scroll back, play) restarts the clock at t = 1 s, so the field jumps (8.8× and 15× baseline).
8. **M-3** Music staff: the seal jolts (−4.4 px in one frame), stops mid-strike notes in one frame, and unseal cuts the ink and the barline.
9. **M-2** Music staff: loading progress ink lands whole (183.9 px per 10 % step).
10. **E-2** Easing: the preview dot appears, teleports and is cut; the label change shifts the row.
11. **H-1** HandMark: re-ink on hover cuts 65 % of the stroke and snaps the nib swell both ways.
12. **E-1** Easing: the first keyboard nudge (and every mode switch) cuts the curve away before the wipe.
13. **F-2** Fourier: entering freezes the drawing for 3 to 4 frames; leaving restarts it at full rate in one frame.
14. **F-3** Fourier: 2 in 6 mounts lose the bloom's first 300 ms to a long frame with no script in it (opacity 0.03 → 0.67 in one step).
15. **A-3 / M-4** Reduced motion: aurora's handover is a cut (d 17.2); the loading staff shows no busy cue. Both come from the same universal rule as O-308.
16. **M-5** Music staff: the breath starts with a −0.06 opacity step on four rules.
17. **H-3** HandMark: replay cuts the old ink.
18. **H-2** HandMark: the mount draw starts twice (0.7 px here; worse with late fonts).
19. **A-4** Aurora: the ground is darker than the live field, so every mount brightens by L +17 (the tween itself is clean).
20. **F-4** Fourier: under reduced motion the pointer still causes redundant draws (not visible).

## Motions read and found clean

- **Aurora**
  - Idle drift: 0 dropped in 5 s at 1440 and 390, one draw per frame.
  - Cursor field: no step at enter, pause or leave.
  - Mount cross-fade: monotone, 450 ms `--ease-standard`.
  - Resize: one re-layout frame, no blank frame.
  - Parking: it stops drawing within one frame of hide or scroll away.
- **Blob**
  - Hover shadow: in 333 ms, out 333 ms, same curve, no DISCRETE.
  - Idle: 0 dropped.
  - Click impulse: biggest step first, settles in about 250 ms; read as one gesture.
  - Poke, resize and parking.
- **Constellation**
  - Idle, four Canvas 2D fields at 120 Hz with 0 dropped.
  - Warp, gravity well press and release, and resize re-fit.
  - Parking and resume with no jump.
  - Reduced motion: still, and the pointer causes no draws.
- **Fourier field**
  - Idle: 0 dropped.
  - Backward-hold decay: about 130 ms, eased.
  - Hidden and off-screen resume with no jump.
- **Music staff**
  - Rule, barline and clef draw; note land (designed panel overshoot); ink-in.
  - Reel and strike loop in light and dark (no faults in 3 s).
  - Bead.
  - The playhead turns from where it is when reversed at about 55 % (no INTERRUPTION).
  - Replay's fade out.
- **HandMark**
  - The mount draw clock (minimum-jerk, apart from the double start).
  - Ink settle.
  - Ink-lag scroll settle.
- **Easing**
  - Sweep wipe-in.
  - Handle press squish.
  - Handle drag: lag median 0.05 px, never against the pointer, no sweep under the finger, nothing after release, at 1440 and 390 touch.
  - The dot's travel while playing (its overshoot is the preset's own `ease-out-back`).

## Not reached

- Aurora's light orbit (off in the story) and nucleus drag (a demo overlay).
- Constellation recession and pinned-drift cards (below the fold, parked); wander was not read on its own.
- The fourier flick (not triggered on its own).
- HandMark shape change, and replay at 390 (the tap missed the button).
- Easing copy-icon swap (census item 12, not re-run).
- Interruption at 30 % and 80 % of the playhead glide; only about 55 % was run.

## Tools and logs

- **Tools:**
  - `tools/amb.mjs`: the canvas instrument.
  - `tools/sum.mjs`: the reader for amb output.
  - `tools/rd.mjs`: the per-frame reader for probe rows.
  - `tools/run-probe.sh` and `tools/run-amb.sh`: the runners.
  - `tools/batch2.sh` to `tools/batch4.sh`: the batches as run, each under one guard slot.
- **Logs:** `logs/`.
- **Scenarios:** `scenarios/`.
- **Known gap:** the screencast delivers about 60 frames a second against 120 rendered. Every d is checked against the frame gap; values marked `*` span skipped frames and are not read as jumps.
- **Strip housekeeping:** 51 probe strips over 3 MB were deleted, because their crops spanned whole cards or pages, up to 58 874 px tall. The two handmark strips this record cites were re-made with the crop held to the ink: `hm-reink-strip`, `hm-replay-strip`. Rows from the first runs are kept and are the ones cited.
