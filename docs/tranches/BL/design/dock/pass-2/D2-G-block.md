# D2 · pass 2 · D2-G block test: the lens and the compositor claim

| field | value |
|---|---|
| seat | D2 pass 2, D2-G BLOCK-TEST. Answers REGISTRY §6 question 1 (the lens) and, because the lens lives, question 2 in its cheap form (the extent under a 1.2 s main-thread block). Questions 3-5 are the route's, not this seat's |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **PROCEED** |
| HEAD | the task named `04929544`; the checkout and the worktree were at `8f4d2dbe`. `git diff 04929544 8f4d2dbe -- src/components/dock src/styles` is empty (0 lines) |
| floor | `floor.patch` (sha256 `de432032f18918a1…`) applied clean in the worktree (`git apply --check`, then 34 files, +1139 / −1436). The probe takes one value from the patched tree: the plate's light-arm filter `blur(16px) saturate(1.2)` (`src/components/dock/styles/shell.css:54-57`, `--glass-blur-resting-radius: 16px` at `src/styles/tokens/glass.css:71`, `--glass-level` 1). Nothing was built: the probe is a static page |
| tool | `D2-G-lens-probe.mjs` (this directory, sha256 `93350d4f74218551…`). `node D2-G-lens-probe.mjs <outDir> q1` and `… q2 3` |
| records (source of record) | `D2-G-records/d2g-q1.json` (every Q1 cell with its load), `D2-G-records/d2g-q2.json` (every Q2 cell, per-frame widths, load before and after). Videos and decoded frames stayed in scratch (`…/scratchpad/D2/p2/bt-G/out/video/`) |
| engines | Chromium 149.0.7827.55 headless. **Playwright WebKit** 26.5 headless (the Playwright 1.61.1 build). The probe has no harness and no `webkitShim`, so every WebKit cell is the **unshimmed** result, and there is no shimmed one. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load average beside every cell in the records: 34.5-62.4 across all runs (other seats ran headless browsers throughout). No cell needed a janky-cell rerun: the three Q2 reps agree within 40-80 ms of freeze and 12 px of travel |
| worktree | `git worktree add` at scratch `…/D2/p2/bt-G/wt`, `node_modules` symlinked, removed with `git worktree remove --force` before return |

---

## 0 · In brief

- **The lens lives in Chromium.** Inside two nested, translating `overflow: clip; border-radius: 28px` doors, the plate's `backdrop-filter` blurs at rest (sharpness 23-27, against 191 unblurred), paused mid-flight (23), in flight on a running WAAPI transform (23-24), and on the dock spring as `linear()` (23-24). A backdrop recolour mid-flight moves the plate's interior (b − r) from −54 to +43, so the filter samples live, not from a snapshot. S-28's ancestor `clip-path` control kills it on the same page (191). So a rounded `overflow: clip` ancestor with a transform is not a backdrop root in Chromium.
- **The window is a stadium at every frame.** The boundary sits within 0.33-0.6 px of the cross/2 arc at rest, paused and running, in both engines, with 0 px² of leak and 0 px² of hole. Three planted defects fail it: a square door (19.73 px, 533 px² leak), a per-axis `50%` lens (≈90.9 px, 5,419 px² hole) and a 6 px counter-translation desync (6.17 px, 121.5 px² leak).
- **The extent keeps moving under a 1.2 s main-thread block in both engines.** The aperture's extent travels 156-160 px through the block window (a live linear run covers about 158 px there) with a longest stall of 0-80 ms. The `transform` control reads the same: 154-162 px and 0-80 ms. The `width` control freezes for 1,160-1,200 ms with 0-1 px of travel. The blur stays live through the block (screencast sharpness 0-6, against 190-198 for a no-filter plant).
- **Playwright WebKit paints the lens in its screencast frames, though not in `page.screenshot()`.** S-3 read "no headless WebKit blur" from screenshots. The video frames show the same aperture blurred at both rests and mid-flight (0-3), with the no-filter plant at 193-197. That is Playwright WebKit evidence that a WebKit compositor keeps the lens inside the doors. It is not a Safari reading. This is recorded as an instrument fact for the next checklist, not minted into this pass's (§7.5).
- **What this does not show.** Velocity handoff (Q3), the edge and shadow (Q4), hit testing (Q5), seat choreography and cost on the real dock are the route's. This probe clips a plate with no border, shadow or seats.

---

## 1 · The probe

One plate at the reserved footprint (480 × 56 at (60, 122), CSS px) carries `backdrop-filter: blur(16px) saturate(1.2)` and a probe tint `rgba(255, 40, 40, 0.25)`. The tint is not the dock veil. It exists so that a pixel can say "plate here" (r − g > 30) over a neutral backdrop, where r = g. The backdrop is a vertical black and white stripe, 4 px bars (8 px bars in the video pages).

```
.fp (footprint, static)
└─ .door.L   overflow: clip; border-radius: 28px; width 2W; translateX(dL)     ← leading edge
   └─ .ctr   translateX(−dL)
      └─ .door.R   overflow: clip; border-radius: 28px; width 2W; left −W; translateX(−dR)   ← trailing edge
         └─ .ctr   translateX(dR)
            └─ .plate   the one backdrop-filter, at the footprint in page coordinates
```

With anchor a = ½, dL = dR = (W − E)/2, so both doors move and the visible window is [(W − E)/2, (W + E)/2], a stadium with an exact 28 px corner at every E, including E = 56 (a circle). There is no scale anywhere. Motion is four WAAPI `transform` animations on one timeline (doors and counter-contents).

Pixel reads, all from screenshots at DPR 2, reported in CSS px:
- **E**: first to last plated column on the centre row.
- **arcErr**: the worst distance between each cap row's plated boundary and the stadium arc fitted to the measured centre-row edges, r = 28.
- **leak / hole**: plated area more than 1 px outside the fitted stadium, and unplated area more than 1 px inside it, in px².
- **sharp**: peak-to-peak of the green channel over the window interior. 191 is the unblurred stripe under the tint; near 0 is blurred.
- **b − r**: the interior's mean blue minus red, which follows a backdrop recolour only if the filter samples live.

---

## 2 · Question 1 · the lens

### 2.1 · Chromium 149 (headless), final run 2026-09-25 21:44 UTC, load 51.4

| cell | what | E (expected) | arcErr | leak / hole | sharp | reading |
|---|---|---|---:|---|---:|---|
| `ctl-nofilter` | plate, no filter | 480 (480) | 0.34 | 0 / 0 | **191** | the unblurred baseline |
| `ctl-plate` | plate alone, own radius, filter | 480 (480) | 0.34 | 0 / 0 | **27** | the live lens |
| `ctl-ancestor-clippath` | ancestor `clip-path: inset(0 round 28px)` | 480 (480) | 0.34 | 0 / 0 | **191** | dead: S-28 reproduced |
| `ctl-ancestor-ovh` | ancestor `overflow: hidden` + radius, static | 480 (480) | 0.77 | 0 / 0 | 27 | live |
| `rest-E56` | aperture at rest, circle | 56 (56) | 0.34 | 0 / 0 | 23 | live, round |
| `rest-E200` | aperture at rest | 200 (200) | 0.34 | 0 / 0 | 23 | live, round |
| `rest-E480` | aperture at rest, doors at 0 | 480 (480) | 0.34 | 0 / 0 | 27 | live, round |
| `rest-E56-wc` | same, `will-change: transform` | 56 (56) | 0.34 | 0 / 0 | 23 | live, round |
| `rest-E200-wc` | same | 200 (200) | 0.34 | 0 / 0 | 23 | live, round |
| `rest-E480-wc` | same | 480 (480) | 0.34 | 0 / 0 | 27 | live, round |
| `rest-E300-live-before` | at rest, white/black | 300 (300) | 0.34 | 0 / 0 | 23 | b − r −54 |
| `rest-E300-live-after` | backdrop recoloured white/blue | 300 (300) | 0.34 | 0 / 0 | 24 | b − r **+43**: samples live |
| `paused-f0.25` | WAAPI paused mid-flight | 162 (162) | 0.34 | 0 / 0 | 23 | live, round |
| `paused-f0.5` | same | 268 (268) | 0.34 | 0 / 0 | 23 | live, round |
| `paused-f0.75` | same | 374 (374) | 0.34 | 0 / 0 | 23 | live, round |
| `running-300` | running linear 1,600 ms, shot in flight | 149 (133.2-157.7) | 0.50 | 0 / 0 | 23 | live, round, in window |
| `running-700` | same | 248 (243.6-254.6) | 0.34 | 0 / 0 | 23 | live, round, in window |
| `running-1100` | same | 354 (349.5-360.6) | 0.35 | 0 / 0 | 23 | live, round, in window |
| `spring-running-before` | dock spring (ζ 0.88, 0.30 s) as `linear()`, slowed ×4 to 2,400 ms, in flight | 239 | 0.35 | 0 / 0 | 23 | b − r −54 |
| `spring-running-after` | same run, backdrop recoloured mid-flight | 367 | 0.52 | 0 / 0 | 24 | b − r **+43**: samples live in flight |
| `plant-square` | doors radius 0 | 200 (200) | **19.73** | **533** / 0 | 23 | caught |
| `plant-lens` | doors radius `50%` (per axis) | 200 (200) | **90.94** | 0 / **5,419.3** | 210 | caught |
| `plant-desync` | door R's counter-translation off by 6 px | **474** (480) | **6.17** | **121.5** / 0 | 26 | caught |

"Expected" for running cells is the linear extent at `currentTime` read just before and just after the screenshot. The earlier run (21:43 UTC, load 34.5, without the plants) read the same values at every rest and paused cell, and 140 / 248 / 361 in flight, each inside its window (console output only; the records hold the final run).

### 2.2 · Playwright WebKit 26.5 (headless, unshimmed), same run

| cell | E (expected) | arcErr | leak / hole | sharp | b − r |
|---|---|---:|---|---:|---:|
| `ctl-nofilter` | 480 (480) | 0.30 | 0 / 0 | 191 | −54 |
| `ctl-plate` | 480 (480) | 0.30 | 0 / 0 | 191 | −54 |
| `ctl-ancestor-clippath` | 480 (480) | 0.30 | 0 / 0 | 191 | −54 |
| `ctl-ancestor-ovh` | 480 (480) | 0.30 | 0 / 0 | 191 | −54 |
| `rest-E56` / `-wc` | 56 (56) | 0.30 | 0 / 0 | 191 | −54 |
| `rest-E200` / `-wc` | 200 (200) | 0.30 | 0 / 0 | 191 | −54 |
| `rest-E480` / `-wc` | 480 (480) | 0.30 | 0 / 0 | 191 | −54 |
| `rest-E300-live-after` | 300 (300) | 0.30 | 0 / 0 | 191 | +41.3 |
| `paused-f0.25 / 0.5 / 0.75` | 162 / 268 / 374 (exact) | 0.30 | 0 / 0 | 191 | −54.1 |
| `running-300 / 700 / 1100` | 150 / 248 / 354 (141.6-174.2 / 246.5-254.5 / 351.5-369.2) | 0.45 / 0.27 / 0.41 | 0 / 0 | 191 | −54.1 |
| `spring-running-before / after` | 235 / 346 | 0.45 / 0.52 | 0 / 0 | 191 | −54.1 / +41.3 |
| `plant-square` | 200 | **19.73** | **533** / 0 | 191 | −54 |
| `plant-lens` | 200 | **90.44** | 0 / **5,419** | 255 | −53.8 |
| `plant-desync` | **474** | **6.18** | **123** / 0 | 191 | −54 |

Playwright WebKit's `page.screenshot()` paints no backdrop blur for any plate, the bare control included (191 everywhere), as S-3 records. So these screenshot cells answer the geometry (the window is a stadium at rest, paused and in flight, and all three plants are caught) and say nothing about the lens. The b − r shift here is the unblurred stripe changing colour, not a filter reading. Playwright WebKit also completed no WAAPI transform on screenshot: each running cell's E falls inside its `currentTime` window, so PF-1 does not reach this carrier.

The WebKit lens is read from the screencast in §3.2.

### 2.3 · Real Safari

UNMEASURED (owner's safaridriver checkbox): the lens at rest, in flight, the geometry, and the plants.

---

## 3 · Question 2 · the compositor claim (cheap form)

### 3.1 · Method

The method is D2-D Q2's, which calibrated S-17. Each case animates the extent 56 → 480 over 3,000 ms, linear. At 800 ms the page busy-blocks its main thread for 1,200 ms. Playwright `recordVideo` (600 × 300, DPR 1) captures the frames, ffmpeg decodes them at 25 fps, and each frame's painted extent is read on the centre row.
- **freeze**: the longest run of identical (±2 px) mid-flight frames, × 40 ms. Mid-flight runs from the first frame off the resting footprint to the last frame short of 477 px.
- **travel**: the extent change between frames first+21 and first+49, which both lie strictly inside the block. A live linear run covers about 158 px there.
- **sharp**: screencast stripe sharpness (8 px bars) inside the window, over the block frames and at both rests.

Cases:
- `aperture`: §1's doors.
- `plant-aperture-nofilter`: the same with the filter off, a planted dead lens for the screencast sharpness read.
- `ctl-transform`: a `scaleX` box, which must move.
- `ctl-width`: a `width` box, a planted freeze.

Each case's page clock read 3,601-3,626 ms from start to the read (`pageMs`). The block itself is shown by the `width` control's freeze.

### 3.2 · Results: three reps per engine, final run 2026-09-25 21:52-21:54 UTC

| engine | case | freeze ms (r1 / r2 / r3) | travel in block, px | sharp in block | sharp at rest (before / after) | load (1-min) |
|---|---|---|---|---|---|---|
| Chromium | `aperture` | **0 / 0 / 0** | **157 / 156 / 160** | 2 / 6 / 4 | 1 / 2, 1 / 6, 1 / 2 | 60.5 / 61.4 / 56.7 |
| Chromium | `plant-aperture-nofilter` | 0 / 0 / 40 | 156 / 160 / 156 | **192 / 192 / 190** | 190 / 192, 190 / 192, 190 / 190 | 61.3 / 62.4 / 54.3 |
| Chromium | `ctl-transform` | 0 / 0 / 0 | 160 / 156 / 158 | — | — | 58.7 / 63.8 / 53.8 |
| Chromium | `ctl-width` | **1,160 / 1,160 / 1,200** | **0 / 0 / 0** | — | — | 57.2 / 64.8 / 56.0 |
| Playwright WebKit | `aperture` | **80 / 40 / 40** | **160 / 160 / 160** | 3 / 3 / 2 | 0 / 3, 0 / 3, 0 / 2 | 56.4 / 60.0 / 54.9 |
| Playwright WebKit | `plant-aperture-nofilter` | 40 / 40 / 40 | 156 / 160 / 160 | **197 / 193-197 / 194** | 196 / 196, 196 / 195, 196 / 194 | 55.6 / 60.6 / 56.0 |
| Playwright WebKit | `ctl-transform` | 80 / 80 / 40 | 162 / 154 / 162 | — | — | 57.1 / 58.1 / 57.8 |
| Playwright WebKit | `ctl-width` | **1,200 / 1,200 / 1,160** | 1 / 0 / 171 † | — | — | 60.1 / 57.9 / 57.8 |

† WebKit `ctl-width` r3: the freeze is 1,160 ms, but the video's first mid-flight frame came one frame late, so frame first+49 fell after the release. The freeze column is the reading. The same offset showed once in the earlier run.

Two earlier Q2 runs agree with these numbers. The 17:46 EDT (21:46 UTC) run (load 40-56) read aperture travel 156-160 px and freeze 0-120 ms in both engines, with `ctl-width` at 1,120-1,200 ms. The 17:49 EDT (21:49 UTC) run (load 39.5-62.3) read aperture travel 152-160 px, freeze 0-80 ms, and `ctl-width` at 1,160-1,200 ms. A first run, whose analyser counted the pre-animation rest as a freeze, was discarded and its analyser fixed. Only the final run is in the records; the earlier runs rest on this seat's console output alone and are context, not evidence.

Reading:
- The aperture moves through the block exactly like the `transform` control, and unlike the `width` control, in both engines.
- WebKit's 40-80 ms stalls match its own `transform` control: its screencast repeats frames.
- The lens stays live through the block, and at both rests, in both engines' compositor frames, and each dead-lens plant reads 190-198.

**Compositor-frame geometry (recorded, not ruled).** `readShot` at 1× on VP8 frames reads arcErr 3.0-7.0 px and hole 0-32 px² for every aperture frame, mid-block and landed rest alike, in both engines. It also reads 5.04-7.04 px on Chromium's landed rest, which the screenshot read puts at 0.34 px. So at 1× VP8 the read sits at its instrument floor: chroma subsampling softens the tint edge. It shows no difference between mid-block and rest, but no planted square was run through the video path, so it is not a geometry ruling. §2's screenshots are the geometry record.

### 3.3 · Real Safari

UNMEASURED (owner's safaridriver checkbox): whether the extent moves under the block and whether the lens stays live.

---

## 4 · Verdict

**PROCEED.**
- Question 1: the lens lives in Chromium inside two nested, translating, rounded `overflow: clip` doors, at rest, paused and in flight. It samples live, and the window is a cross/2 stadium within 0.6 px at every frame read. The BLOCK condition ("the lens dies in Chromium") did not occur, so the named missing primitive is not needed.
- Question 2, cheap form: the extent keeps moving under a 1.2 s main-thread block in Chromium and in Playwright WebKit (156-160 px of travel against the `width` control's 0), and the lens stays live while it does.

What D2-G owes next, in REGISTRY §6's order:
- **Q3, the velocity handoff:** a mid-flight retarget that solves the spring from (x, v) and hands WAAPI a new `linear()`, measured on H-3c's reversal row.
- **Q4, the edge and the shadow on the moving silhouette.** This probe's plate has neither, and the named seam risk (two doors on the cross axis) is untested. The desync plant shows the aperture tolerates counter-translation error except where the window meets a footprint end.
- **Q5, hit testing through the rounded clip.**
- Then §7.3 items 2-5 on the floor patch, under H2, with a reviewed adapter.

---

## 5 · Instrument notes for the next checklist (recorded, not minted)

- **Playwright WebKit screencast ≠ screenshot, for backdrop blur.** `page.screenshot()` paints no blur (S-3). `recordVideo` frames do: 0-3 with the filter against 193-197 without, 3 reps. A WebKit lens reading can come from the screencast, labelled as Playwright WebKit. It is still not Safari.
- **The video geometry read needs a planted square before it rules** (§3.2): at 1× VP8 its floor is about 7 px.
