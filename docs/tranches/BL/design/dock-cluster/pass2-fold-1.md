# Dock cluster · pass 2 fold, round 1

| field | value |
|---|---|
| seat | the PASS-2 FOLD seat, round 1. I wrote none of pass 2's build, its challenge or W-I.8 |
| model | `claude-opus-5-5`, asserted from own system identity |
| subject | the seven findings and two notes of `pass2-challenge-1.md`, folded into the mechanism, the prototype and W-I.8's gates |
| base | master `09fa848bf`. Scratch worktree `.claude/worktrees/bl/cluster/pass2-fold-1`: `pass2/prototype.patch` (pass 2), then this fold. The whole build replaces `pass2/prototype.patch` (against master; it applies clean); pass 2's patch is kept as `pass2-fold-1/prototype-pass2.patch`. The worktree was removed after this record was written |
| W-I.8 | the amendments are `pass2-fold-1/W-I.8.patch`, against `waves/W-I.8.md` as it stands. This seat writes only under `design/dock-cluster/`, so the orchestrator applies it |
| harness | `pass2-fold-1/tools/probe.mjs` is the challenge-1 probe plus: the cluster's own `%`-clip count by selector with no exemption, the silhouette's outer ends and each member's controls by label, the controls clip read through `.dock-controls`' boxes and the engine's `inset()` shorthand, the trigger in daraksha's `.site-dock` placement and a focus-hold cell, the reader at the breakpoint widths and with `narrowAt`. `tools/continuity.py` is I8-G18's interrupt arm. `tools/seat-check.mjs` reads the active seat's computed backdrop. The fixture is challenge-1's plus `narrowAt` |
| engines | headless Chromium (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run, a new context per cell; WebKit under `--exclusive webkit`. The unit test and builds under `guarded --light`, vitest `--maxWorkers=2` |
| records | `pass2-fold-1/data/`, `logs/`, `png/`. Runners `tools/run-chromium.sh` (f1), `tools/run-final.sh` (f2 and WebKit) |
| resume | 2026-11-10, after the reboot, a second seat (`claude-opus-5-5`). Scratch worktree `.claude/worktrees/bl/cluster/pass2-fold-1-resume` on master `9b71327e1` with `pass2/prototype.patch`, removed after this record was written. Runners `tools/run-resume.sh` (the refused stages, and Chromium's interrupt ×3) and `tools/run-cure.sh` (the one-clock build, both engines). The cure is §R; `prototype.patch` now carries it, and the round-1 build's patch is kept as `pass2-fold-1/prototype-fold1-ownclock.patch`. W-I.8's amendments for it are `pass2-fold-1/W-I.8-resume.patch` |

## Verdict

All seven findings are cured in the mechanism, and each cure is measured in the cell the challenger used, in both engines (§W). After the reboot the refused WebKit stages ran, and WebKit's I8-G1 after C4 is GREEN: 0 / 0 in all 84 cells (§R). The one late read was not a harness artefact. In the browser's own step order the round-1 build is RED in every interrupt cell with a membership change, in both engines, so the fold adds a cure, R-14, one clock (§R). On the one-clock build every interrupt arm is GREEN in three step orders in both engines, and I8-G1's new motion arm is GREEN in both engines with its bite RED in 72 of 72 cuts. The fold is complete. The two notes are folded into the gates. I8-G18's last RED arm from pass 2 (an arriver's controls outside its droplet) closes as a consequence of C6. No gate was weakened: I8-G4, G5, G8 and G18 are rewritten or sharpened, G16 gains an arm, and I8-G19 (the reach holds) and I8-G20 (the consumer's placement and row) are new. Two items stay open, both recorded: one late read in seven Chromium runs of an interrupt cell, and a survivor offset that is still re-played (§6).

## Dispositions

| # | finding | disposition | where in W-I.8 | measured (round-1 build, Chromium; WebKit in §W) |
|---|---|---|---|---|
| C1 | the §5 trigger moves the theme out from under a resting pointer | **Mechanism added: R-13.** The cluster takes GlassDock's own posture hold (`keepOpen`) on every member while the pointer or focus is anywhere in it, through `dockClusterContext` registration, and releases it when both have left. **Gate added: I8-G19** | R-13, §5 trigger, I8-G19 | bind=1, real pointer resting on "Dark theme": theme at 806 (1440) / 281 (390), "Dark theme" under the pointer in 12 of 12 samples through 4.8 s, dock expanded, in the stage and in `.site-dock` (root `pointer-events: none`). Focus walk Name → … → "Dark theme", then 4.8 s: theme still, dock expanded. Pass 2: collapse at about 3.2 s, theme 806 → 733 |
| C2 | an interrupted swap jumps the silhouette's end 104.9 px | **Mechanism amended.** An arriver and a phantom are one run, a px span on one spring; handovers are retargets; live phantoms outlive membership changes | R-7, R-11 | out then in at 42 ms, right end: −8.56, −9.36, −10.54, −7.78, −4.43 px/frame (pass 2: −9.36, **−104.88**, +7.18). Continuity arm GREEN, worst −0.30 of the bound |
| C3 | an interrupted glide drops its momentum | **Mechanism amended.** A glide is two px springs per member, anchored where it began, and a layout change retargets them. A live join is retargeted too | R-7, R-11 | `toolrun=0` reversal, left end: −4.72, −4.37, −2.92, −0.82, +0.76, +1.89 (pass 2: −4.72, −4.37, 0, +6.17). With the run: −8.41, −7.79, −5.21, −1.45, +1.35 (pass 2: −8.41, 0, +9.99) |
| C4 | `regrid`'s `style.left` overrides daraksha's gutter | **Mechanism amended.** The sub-pixel remainder is a `translate` on the members; the root is never written; a member's `margin: 0 auto` stands down; overflow is measured against the box the row lays out in. **Gate added: I8-G20**; G16 arm | R-3, R-10, §5 placement, I8-G16, G20 | `.site-dock`: computed left 16 px, row centre − viewport centre 0 in all four cells (1440 / 390, collapsed / expanded), 0 errors. Pass 2: −0.67 px, −8.34, a false error |
| C5 | the real reader row overflows 612–660 | **Consumer half amended (§5), measured.** The theme member's 26–28 px is the fission's own shape (plate padding plus the gap it splits to), so ReaderDock's `narrow` moves from 38.2 rem to 41.25 rem. **Gate: I8-G20's reader arm** | §5, I8-G20 | at 38.2 rem the full row overflows at 612 / 640 / 656 (626 / 580, 627 / 608, 628 / 624 px) and fits from 660 (628 / 628); at 41.25 rem: 0 errors at 360, 390, 612, 640, 656, 660, 664, 700, 1440 |
| C6 | I8-G8 RED over a page change, from the glide clip over the active seat's blur | **Mechanism amended (restraint): no member descendant carries a `backdrop-filter` in a cluster.** The glide's and the arriver's controls clip then sit over no blur. **Gate sharpened: I8-G8** gains that arm, and its ancestor arms are ruled to the cluster's subtree; master's lone-dock half stays O-203's | R-1, R-7, I8-G8, §6 | page change, fixture face and real reader row, 60 frames each: 0 hits (pass 2: 60 / 60). The fused plate: one blur value, `blur(16px)` on the lenses, the tone, no seat blur (pass 2: two). 11.0.0's lone dock: 60 / 60, unchanged |
| C7 | the I8-G5 unit test cannot bite on three sites | **Gate rewritten.** The test drives a width glide, a pure leave and an arrival, requires each stage to mint its site's springs, and stops the frame clock | R-11, I8-G5 | clean 10 / 10. Fails on the identity arm with a literal at each of the five sites and with a spread (six plants). Pass 2's test: green with the plant at three sites |
| N1 | G18 on shares reads RED on an uninterrupted swap | **Gate rewritten.** G18 reads the silhouette's outer ends and each member's controls by label, never the internal cuts, plus the interrupt arm | I8-G18 | outer ends ≤ 10.0 px per frame over 145 px (6.9 %) in every swap cell; the cut at a membership change still moves into the phantom, unread |
| N2 | G4's clip arm and the probe's `inset(50%)` exemption disagree | **Mechanism amended, gate sharpened.** One tone element; every unpainted cluster layer clips to `path("M0 0")`; the arm reads the cluster's own elements by selector with no exemption | R-2 (one tone), I8-G4 | 0 `%` in the cluster's own clip strings in every frame of every one-dock, swap and interrupt cell. The rest are master's: the G12 face inset, and `.dock-run-status`'s `inset(50%)`, which the old exemption also hid |
| R | the late read (round 1 §6): one read in seven a frame ahead | **Real, and cured: R-14, one clock (§R).** In the browser's step order the round-1 build reads −17.39, then 0, at every membership interrupt, 3 of 3. Each spring ran its own rAF after the cluster's paint, and a fresh loop's first step was 16.7 ms. Now the cluster's frame loop steps every spring it owns, then paints. **Gates sharpened:** I8-G18's interrupt arm is read in three pinned orders ("post" binding), I8-G5 requires every spring host-clocked, and I8-G1 gains a motion arm read inside the glass, with a plant | R-14, I8-G1, G5, G18, §6 | one clock: 72 / 72 Chromium and 40 / 40 WebKit interrupt arms GREEN (worst +0.23); round 1 in "post": RED +6.24 to +11.18. Motion seam: 0 of 72 cuts over 1.5 in either engine; the plant RED 72 / 72 in both |

## C1 · The reach holds

GlassDock already publishes a ref-counted posture hold, `keepOpen` / `release`, which its own popovers use, and `scheduleCollapse` and the click-away both honour it. The cluster provides `dockClusterContext`; each GlassDock registers `{ el, keepOpen, release }` on mount (four lines in `GlassDock.vue`). The cluster root's `pointerenter` / `pointerleave` and `focusin` / `focusout` (with `relatedTarget` inside the root counted as still in) set two flags, and while either is set every member holds one token. Leaving the cluster releases them, and GlassDock's own grace (`min(collapseDelay, 800)`) and collapse delay run unchanged.

Two things follow without more code. A tap on the theme no longer collapses the dock through the click-away, because the hold blocks it. And daraksha's `.site-dock` root is `pointer-events: none`, so crossing the 10 px gap between plates leaves the root for a moment; the dock's leave schedules its 3.6 s collapse, and entering the theme takes the hold, which clears that timer.

| cell (bind=1, real clock) | theme button left: rested on | under the pointer, every 400 ms to 4.8 s | dock |
|---|---|---|---|
| stage, 1440 | 806 → 806 | "Dark theme" ×12 | expanded |
| `.site-dock`, 1440 | 806 → 806 | "Dark theme" ×12 | expanded |
| stage, 390 | 281 → 281 | "Dark theme" ×12 | expanded |
| `.site-dock`, 390 | 281 → 281 | "Dark theme" ×12 | expanded |
| focus: Name, Colour, Motion, Qur'an, Tab to the theme, rest 4.8 s, 1440 / 390 | 794 / 269 still | focus on "Dark theme" throughout | expanded |
| pass 2 (challenge-1), stage 1440 | 806 → 733 at about 3.2 s | "Dark theme" to 2.8 s, then `dock-cluster`, `stage` | collapsed |

Accessibility: the hold changes no role, name, tab order or inert state. `partA11y` reads the census and the ARIA snapshot equal fused and split, collapsed and expanded, and focus kept through a fission, at both widths.

## C2, C3 · Momentum through an interrupt

Two causes, one shape. Pass 2 re-based every interrupted motion by re-creating it: a glide restarted at `p = 0` from its painted extent, a phantom was disposed on any membership change, and an arriver started from 0. A re-created spring also loses a frame: `RAFPlayback.drive` gives a fresh loop's first tick a nominal 16.7 ms, two 120 Hz frames, and `playTo` disposes the live spring first.

The cure keeps every live spring and retargets it (`useDockSpring.retarget`, which re-seats `SpringProgress` from its own value and velocity):

- **A glide** is two px offsets, one per edge, from anchors fixed where the glide began. Painted edge = anchor + offset; each offset springs toward (layout edge − anchor). A later layout change retargets both. Velocity is in px from the start, so a reversed span inherits it unscaled.
- **A run** is a span in px. An arriver paints `o = span / (W + g)` of its width and of one gap (its left gap, or its right when it is first); a phantom adds its span where it stood. The two hold the same span at the same `o`, so a handover in either direction is a retarget of the same spring, and the span and its velocity carry. A live phantom's place is its surviving left neighbour, re-read on every membership change.
- **A live join** whose target changes is retargeted too.

Interrupt cells, virtual clock, 1440 light, the silhouette's outer ends read from the lens shares by label, velocity in px per 8.33 ms frame around the interrupt (k − 2 … k + 3):

| cell | pass 2 (challenge-1), left / right end | round 1, left end | round 1, right end | continuity arm, worst (\|Δv\| − bound) |
|---|---|---|---|---|
| in, then out at 83 ms | −8.41, **0, +9.99** / +9.07, +5.22, −4.68 | −8.96, −8.41, −7.79, −5.21, −1.45, +1.35 | +9.02, +8.46, +8.66, +5.24, +1.46, −1.36 | −0.46 (pass 2 +7.62) |
| in, then out at 42 ms | −9.31, **0, +4.84** | −8.51, −9.31, −9.65, −7.74, −4.40, −1.83 | mirror | −0.30 (pass 2 +6.95) |
| out, then in at 42 ms | right **−104.88** | +8.51, +9.31, +9.65, +7.74, +4.40, +1.83 | −8.56, −9.36, −10.54, −7.78, −4.43, −1.84 | −0.30 (pass 2 **+91.69**) |
| `toolrun=0`, reversal at 83 ms | −4.37, **0, +6.17** | −4.72, −4.37, −2.92, −0.82, +0.76, +1.89 | mirror | +0.22 (pass 2 +5.32) |

The bound is the dock spring's own largest change of velocity in one frame at that state, `(ω²|D| + 2ζω|V|)·dt²` with ω = 2π/0.30 and ζ = 0.88 (`springPreset("dock")`), D the end's distance to where it settles and V its velocity, plus 0.5 px. RED is above it. Pass 2 is RED in every interrupt cell in both engines (challenge-1 data run through the same script), and round 1 is GREEN in every cell in 6 of 7 Chromium runs. Share overlap is 0 and 0 `%` / 0 elliptical radii in every frame.

## C4 · The consumer's placement

`regrid` kept its margins (whole-px members, F6) and moved the remainder. Every member's `translate` now carries `shift`, the first member's sub-pixel remainder, beside the chain's own translate; the root is never written. Building the cure exposed a second defect under the first: GlassDock's own `margin: 0 auto` (`shell.css`) spread the members across a root that the consumer sizes. The challenger's fixture could not show it while the root's `left` was broken, and the first round-1 build painted a 130 px collapsed row from x 336 to 1105 at 1440 (`data/chromium-smoke.json`). `cluster.css` sets `margin-inline: 0` on members.

The overflow report now asks the box the row lays out in. A root sized by its content (a flex item) overflows its parent, or the viewport when fixed. A root the consumer sizes overflows itself when a member's layout box leaves it.

| `.site-dock` on the cluster root | root computed left | row | row centre − viewport centre | console |
|---|---|---|---|---|
| 1440 collapsed / expanded | 16px / 16px | 655 … 785 / 582 … 858 | 0 / 0 | – |
| 390 collapsed / expanded | 16px / 16px | 130 … 260 / 57 … 333 | 0 / 0 | – |
| pass 2, 1440 collapsed | −0.671875px | – | −8.34 | false R-10 error |

The rest seam was re-read after the move (I8-G1, `data/chromium-f1rest.json`): 84 cells at DSF 1, 1.25, 1.5, 2, 2.2, 2.625 and 3, line ≤ 1.5 and tone ≤ 0.1, the corner r = h/2 in all 84. Pass 2 read the same.

## C5 · The reader row

The theme member's cost is its own plate padding plus the gap it fissions to. Both are the fission's shape, so the cure is the consumer's breakpoint, not a smaller gap. Cell `reader`, the dock expanded on daraksha's real reader face:

| width | 11.0.0 (theme in `#persistent`): row / container | round 1 at 38.2 rem | round 1 at 41.25 rem |
|---|---|---|---|
| 360, 390 | 260.8 / 328, 358 | 289 (narrow row) | 289 (narrow row) |
| 612 | 580 / 580 | **626 / 580, R-10 error** | 291 (narrow row) |
| 640 | 598.8 / 608 | **627 / 608, error** | 291 |
| 656 | 599.4 / 624 | **628 / 624, error** | 292 |
| 660 | 599.5 / 628 | 628 / 628 | 292 (narrow at ≤ 41.25 rem) |
| 664, 700, 1440 | fits | fits | fits (628 / 632, 629 / 668, 654 / 1408) |

§5 now tells daraksha to move ReaderDock's `narrow` query to `max-width: 41.25rem`. R-10's error is the cluster telling the host, as designed: the fold changed nothing in the cluster for C5.

## C6 · No blur inside the plate

The restraint precept already asks for one blur value and no blur inside a blur. Inside a cluster the lenses blur the backdrop, and the active seat's `.glass-capsule` blurred it again at `blur(20px) saturate(1.5)` over the dock's own ink. The cluster now stands down every member descendant's `backdrop-filter` (`.dock-cluster > .glass-dock * { backdrop-filter: none }`). Three things follow:

- I8-G8 holds through a page change: no backdrop-filtered element has the glide clip or the face cross-fade's opacity above it. 0 of 60 frames on the fixture's page face and on the real reader row, against pass 2's 60 of 60. 11.0.0's lone dock still reads 60 of 60 from DockCrossfade's face opacity over the seat. That is master's, so I8-G8's ancestor arms are ruled to the cluster's subtree, and O-203 strikes the nested blur in GlassDock (12.0.0).
- The stand-down paints nothing different. `tools/seat-shot.mjs`, the expanded dock at 1440, the active seat's inner 60 %: with the seat's blur forced back inside the cluster it reads L 123.5, sd 57.31 in light and L 91.3, sd 81.57 in dark, and stood down it reads the same to the decimal. The seat's own blur re-blurred an already blurred plate (`png/chromium-seat-{f1,f1-seatblur,v1100}-{light,dark}.png`).
- The fused plate carries one blur value. The restraint read went from `blur(16px)` plus the seat's `blur(20px) saturate(1.5)` to `blur(16px)` and the one tone, in both themes, on the pages face and the reader face.
- The arriver's controls can be clipped to their droplet, which pass 2 held back on this ground. `.dock-controls` is `display: contents`, so the clip is written on each of its boxes, against the member's painted extent. The swap's "in" reads 0 px of a control outside its glass at any opacity above 0.25 (pass 2: 21.5 px at 0.37), at 390 and 1440, light and dark.

One build trap is recorded in R-1: written as the hand pair `backdrop-filter: none; -webkit-backdrop-filter: none`, the declaration came out of the bundle as the prefixed one alone, and Chromium kept the seat's blur. That build is I8-G8's bite: 60 of 60, in `data/chromium-f1.json`.

## C7 · The spring test bites at every site

The test stubs each member's box from a `data-w` attribute, stops `requestAnimationFrame`, mounts the cluster on three members and drives four stages. Each stage waits up to 3 s for the springs its site owns, then counts them:

| stage | site | minimum minted |
|---|---|---|
| mount | joins | 2 |
| member 0's width 100 → 160 | the glide's two edges | 2 |
| member 1 leaves | a join, the phantom's run, a survivor offset | 3 |
| a member arrives last | joins, the arriver's run | 3 |

The frame clock is stopped because happy-dom delivers a MutationObserver as a task, and a paint landing between a DOM change and its delivery lost the survivor offset in about one run in six. A browser delivers it as a microtask. With the clock stopped: clean 10 of 10 (`logs/g5-clean-*.log`). Plants (`data/g5-plants.diff`), each failing on the identity arm: a literal at the join, a glide edge, the survivor offset, the phantom run and the arriver run, and `{ ...DOCK_SPRING }` at a glide edge.

## N1, N2 · The gate notes

N1: I8-G18 reads the silhouette's outer ends and each member's controls by label. The cut between two shares is not read: one ink and equal kernels make it invisible, and at a membership change it moves into the closing phantom. N2: there is one tone element, and every unpainted layer clips to the empty `path("M0 0")`. The probe counts the cluster's own elements by selector with no exemption, and reads 0 in every frame. The whole-subtree count is all master's: the G12 inset on `.dock-face-content` while morphing, and GlassDock's visually hidden `.dock-run-status` (`inset(50%)`), which the pass-2 exemption also hid.

## §W · WebKit

Playwright WebKit 26.5, `--exclusive webkit`, one run on the final build (`data/webkit-f2.json`, 23:44–23:48 ET after an 80-minute wait for the lock). Every cell matched Chromium:

| cell | WebKit |
|---|---|
| C1 trigger: pointer, stage and `.site-dock`, 1440 and 390; focus walk | theme still (806 / 281; focus 794 / 269), "Dark theme" in 12 of 12 samples, dock expanded, in all six cells |
| C2, C3 interrupts | continuity GREEN in all four cells, worst −0.25 to −0.46 of the bound; out then in at 42 ms, right end −8.57, −9.36, −10.50, −7.78, −4.43; `toolrun=0` left end −4.72, −4.37, −3.99, −2.55, −0.44, +1.12 |
| C4 `.site-dock` | computed left 16 px and row centre 0 in all four cells, 0 errors |
| C5 reader | the same widths as Chromium to 0.1 px: 38.2 rem overflows at 612 / 640 / 656, 41.25 rem fits everywhere |
| C6 I8-G8, restraint | page change 0 / 60 on both faces (11.0.0's lone dock 60 / 60); one blur value in the fused plate, both themes, both faces |
| G18 swap | outer ends ≤ 10.0 px per frame, overlap 0, controls outside their glass 0 px at opacity > 0.25 |
| G17 one dock | theme's first frame 4.0 / 4.36 (expand), largest step 5.93 px, bridge at j ≥ 0.45 reads 0, overlap 0, 0 `%` / elliptical, 0 `%` in the cluster's own clips |
| G6 PRM | 2 geometry states in every episode; WAAPI plant 4 states, RED; last opacity frame 249–255 ms (the L5 arm, as in pass 2) |
| a11y | census and ARIA snapshot equal fused and split, focus kept, both widths |

WebKit still logs "ResizeObserver loop completed with undelivered notifications" in the one-dock cells (17 lines in the run), the open item of pass 2 §8. The fold did not touch it.

**Refused on 2026-11-09, run on 2026-11-10 (§R).** After `webkit-f2`, `guarded` refused the three remaining WebKit stages: `REFUSED: kernel zone data.kalloc.1024 at 8.79M … reboot the Mac` (rc 75). After the reboot they ran (`tools/run-resume.sh`): the interrupt repeat on the round-1 build, and I8-G1's rest seam and the motion seam on the one-clock build. §R has the reads.

## Not re-read on the round-1 build, and why

- Chromium rest (I8-G1) and the motion seam (`mseam`) were read on the first round-1 build (`f1rest`, `f1mseam`). The two changes after it touch only member descendants' `backdrop-filter` and the controls clip. Neither paints in a flat cell, where the fixture hides every control. WebKit read both on the final build.
- The motion seam: 72 contacted cuts, line ≤ 1.5 in 71. The 72nd is 2.4 (DSF 1.25 light, fuse at 100 ms, j = 0.714; pass 2 read 0.3 there). Its capture (`png/chromium-f1mseam-mseam-fuse-dpr1.25-light-t100.png`) shows the neck at the cut spanning top + 6.4 … top + 50.4 CSS px, so the read row at top + 8 lies 1.6 px inside the neck's anti-aliased rim, and the mid row reads 0.1. That is the rim's curvature, the same reading the challenger set aside for its 6.5 cell, and not a seam. The grid's new sub-pixel shift moved the rim against the read row.
- I8-G6 (PRM): geometry is 2 states in every episode and the WAAPI plant bites (4 states). The ≤ 144 ms arm is RED at 287–330 ms, as in pass 2: it waits on 11.1.0 L5's token.
- I8-G2, G3, G10, G11, G12 were not run, as in pass 2.

## §6 · Open

- ~~**WebKit I8-G1 after C4, unmeasured.**~~ Read after the reboot: 0 / 0 in all 84 cells (§R).
- ~~**One late read in seven.**~~ Real, attributed and cured by R-14 (§R).
- **The `toolrun=0` reversal reads two trajectories in the harness's order** (§R). Both are GREEN, and the binding "post" order is deterministic.
- **WebKit's member-row seam read varies between captures** (3.4, then 0, in the same cell on the same build). The neck rows, which are the gate, read 0 in both (§R).
- **A survivor offset is still re-played** (`playTo`) on a later membership change, where a glide and a run retarget. No cell interrupts a pure leave with another membership change. W-I.8 §6 books a G15 cell for it.
- **The morph frame hook.** The prototype still paints on a MutationObserver of `--dock-morph-t` (R-12). The context hook from the morph's `onFrame` is the wave's.

## §R · Resume after the reboot (2026-11-10)

The seat rebuilt round 1's site from `pass2/prototype.patch` on master `9b71327e1` (`logs/build-resume.log`, the same code that was measured). It ran what `guarded` had refused, then re-ran Chromium's interrupt cells to attribute the late read.

### The refused WebKit stages

| stage | build | read |
|---|---|---|
| `f2rep2`, the interrupt repeat | round 1 | GREEN in all four cells in the harness's order, matching Chromium's f2 to 0.01 px (`data/webkit-f2rep2.json`) |
| `f2rest`, I8-G1 at DSF 1, 1.25, 1.5, 2, 2.2, 2.625, 3 | one clock | **0 / 0 (line / tone) and the corner r = h/2 in all 84 cells.** In WebKit, C4's sub-pixel remainder on the members' `translate` anti-aliases no differently from the root's `left`. Chromium on the same build reads ≤ 1.5 / ≤ 0.1 in all 84 (`chromium-c3rest`), as on round 1 |
| `f2mseam`, the motion seam | one clock | 71 of 72 cuts ≤ 1.5 on the member rows, one at 3.4 (DSF 1.25 dark, fuse at 100 ms). Re-read with the neck rows below: 0 in all 72, and in that rerun the member rows read 0 too |

The rest and the motion seam ran on the one-clock build because the cure below was built before WebKit's lock came free. Rest is a settled frame, and the clock changes nothing in it.

### Attributing the late read: it is real

`chromium-smoke2` ran on an earlier round-1 build (built 21:41, before `build-final`). Its frame 5 equals the normal frame 6 to 0.01 px, frame 6 moves 0, and frame 7 is back in step. So the trajectory was unchanged, and one paint showed the next frame's state. The three repeats asked for (`r1`–`r3`, round-1 build, the harness's order) read the normal path: in-then-out@42 left end −9.31, −9.65, −7.74, −4.40, −1.83 in 3 of 3, every arm GREEN. On round 1's final build the normal path held in all nine runs before this read (f1, f1rep2, f1rep3, f2, f2rep2, r1–r3, WebKit f2).

The harness's interrupt step runs the act, then waits on two macrotasks before it steps the virtual clock. A rendering update may or may not fall inside those waits, so the cluster's ResizeObserver lands before or after the frame by real-clock luck. `probe.mjs --order` pins it:

- **pre:** a rendering update delivers the ResizeObserver before the frame.
- **post:** the browser's own order. The act and its microtasks (the MutationObserver), then the frame, then layout and the ResizeObserver.

| round-1 build, Chromium | in then out @83 | in then out @42 | out then in @42 | `toolrun=0` |
|---|---|---|---|---|
| pre ×3 (`ord-pre-*`) | GREEN, 3 / 3 | GREEN: −9.31, −9.65, −7.74, −4.40 | GREEN | GREEN |
| **post ×3** (`ord-post-*`) | **RED +6.24 / +6.84**: −8.41, **−13.00, 0**, −1.45 | **RED +10.55 / +11.18**: −9.31, **−17.39, 0**, −4.40 | **RED +10.55 / +11.18**: +9.31, **+17.39, 0** | GREEN |

So the late read is what a browser paints, 3 of 3, at every interrupt with a membership change. Two causes add up, and both are in the mechanism:

1. **Paint before tick.** Each `useDockSpring` drove its own `SpringProgress.play` rAF loop, and the cluster painted from a separate rAF `tick`. rAF callbacks run in registration order. A spring minted or re-played at a membership change (a run, a phantom, a join) registered after the cluster's tick for that frame, so the frame's paint showed the spring's previous value.
2. **A fresh loop's first step is two frames.** keyframes' `RAFPlayback.drive` steps a new loop by `this._lastFrameT ? n − this._lastFrameT : 16.667` (`dist/sequence-*.js`), and 16.667 ms is two frames at 120 Hz.

In the harness's lucky order the lag and the jump cancel. In "post" order the ResizeObserver's `paint()` lands after the frame and shows the jump (−17.39 = −9.65 + −7.74), then the next tick paints the stale value (0).

### The cure: R-14, one clock

- `useDockSpring(config, { clock: "host" })` arms a spring without a loop. `step(dt)` advances it by `tickDt(dt)` and emits its frame and its settle, which disposes it as before. The reduced-motion snap that `play` performs is kept: under PRM a host spring jumps to its target and settles in one call. The default stays `"own"`, so GlassDock's morph, DockCrossfade and `useDockRun` are unchanged.
- Every cluster spring site passes `HOST`: the joins, the two glide edges, the phantom run, the survivor offset and the arriver run. I8-G5's five plant sites stay where they were.
- The cluster's `tick(t)` steps every live spring it owns (joins, glides, slots, phantoms and offsets, each once) by `t − last`, then paints. A loop woken from rest steps 0, the way a CSS transition's first frame shows zero progress, so the first painted frame is the state at the act.
- One intermediate build (`data/cure-a/`, `logs/cure-a/`) stepped a woken loop by `t − performance.now()` at the wake. It was GREEN, but its reads moved 0.3 px from run to run, because the probe's virtual rAF clock and the real `performance.now()` disagree. Stepping 0 is deterministic and needs no wall clock.

On the one-clock build (`data/{chromium,webkit}-c{def,pre,post}*.json`):

| engine | runs | arms GREEN | worst \|Δv\| − bound | membership cells across runs and orders |
|---|---|---|---|---|
| Chromium | harness ×3, pre ×3, post ×3 | 72 / 72 | +0.23 | identical to 0.01 px |
| WebKit | post ×3, harness ×1, pre ×1 | 40 / 40 | +0.20 | identical to 0.01 px, and to Chromium |

Left end, in then out at 42 ms: −8.51, −7.40, −4.66, −2.52, −0.88, +0.35. Right end, out then in at 42 ms: −8.56, −8.27, −4.68, −2.54, −0.88. In then out at 83 ms reverses through zero velocity: −2.79, 0.00, +2.07.

`toolrun=0` has no membership change, and its width retarget reaches the cluster only through the ResizeObserver. So in the harness's order it does not read the same every time: 2 of 3 runs take the pre path (−5.03, −3.65, −1.57) and 1 of 3 a third path (−5.03, −4.72, −3.30). Pinned, each order reads the same in every run: pre −5.03, −3.65, −1.57, and post the same path one frame later (−5.27, −5.03, −3.65, −1.57). All three are GREEN. "Post" is the browser's own latency, and it is the binding read.

I8-G5 (`tests/components/dock/dock-cluster-spring.spec.ts`) gains an arm: every spring the cluster mints is host-clocked, and the mock now forwards the second argument. Clean: 1 passed (`logs/g5-clean-resume.log`). The plant, the phantom site left on its own loop (`data/g5-plant-own-clock.diff`), fails on that arm with `spring 5: the cluster's clock: expected undefined to be 'host'` (`logs/g5-plant-own-clock-phantom.log`). vue-tsc exits 0 (`logs/typecheck-resume.log`).

### The motion seam, read inside the glass

On the one-clock build the motion starts a frame later, so for the first time the 100 ms read samples a neck still forming: j = 0.617. The old sampling read only j = 0.714, 0.975 and 1.001, because the 16.7 ms first step pushed every 100 ms read past 0.7. On the old member rows (member top + 8, the middle, member bottom − 8), Chromium then read 9 of 72 cuts over 1.5, up to 16 (`chromium-c3mseam`). The captures (`png/chromium-c3mseam-mseam-*-t100.png`) show one material: one rim, one shadow, no line at the cut. There the neck's own top lies 7.2–9.5 px below the member top, so the member row at + 8 runs along the neck's rim and reads the rim's curve as a line.

The probe now reads three rows inside the painted glass at the cut: the neck's own top + 8, its middle and its bottom − 8. The neck comes from the tone's own `path()`, sampled where it crosses x = cut, with one middle row when the neck is under 20 px. The member rows stay in the record as `memberLine`. The bite, `--plant seam`, draws a 1 px line in the cluster's rim colour (`--glass-border-dock`) down the neck at each contacted cut, reshoots, and reads the same rows.

| engine (one clock) | contacted cuts | neck rows, line max | over 1.5 | the plant | member rows (record only) |
|---|---|---|---|---|---|
| Chromium (`c3mseamN`, `c3mseamPlant`) | 72 | 1.5 | 0 | 8.9–16.2, RED 72 / 72 | up to 21.4 |
| WebKit (`c3mseamPlant`) | 72 | 0 | 0 | 6.9–16.1, RED 72 / 72 | 0 |

`W-I.8-resume.patch` gives I8-G1 this read as its motion arm.

### The rest of the battery on the one-clock build (`c3`, both engines)

- **Identical to round 1's reads, line for line:** trigger (I8-G19), sitedock and reader (I8-G20), g8glide (I8-G8), restraint and a11y. Each was compared against f2, and Chromium's reader against f1.
- **The same shape, one frame later:**
  - The onedock reads (I8-G17): theme first frame 4.36 px, largest step 5.11 px, overlap 0 and 0 `%` / elliptical. The bridge at j ≥ 0.45 reads ≤ 0.3 in both engines, and below 0.45 it reads the bare field, as before.
  - The swap reads (I8-G18): outer ends ≤ 10 px per frame, overlap 0, and 0 px of a control outside its glass at opacity > 0.25. The last member's step peak moves from 50 to 58.3 ms.
- **PRM (I8-G6):** 2 geometry states in every episode, and the WAAPI plant reads 4. The opacity arm is still RED at 250–283 ms, the known L5 wait (pass 2 and round 1 read 249–330 ms).
- WebKit still logs 17 "ResizeObserver loop completed with undelivered notifications" lines, as round 1 did (pass 2 §8).

### Process

After the reboot the machine was busy, and the WebKit stages waited on another session's webkit lock for about 25 minutes. This seat stopped two of its own queued runner shells by PID and restarted them. One was stopped because its idle check matched its own queued `guarded` wrapper, the other so the site could be rebuilt with the zero first step. No other process was touched. Every run went through `guarded`, and WebKit's ran under `--exclusive webkit`.
