# Dock cluster · pass 2 fold, round 2

| field | value |
|---|---|
| seat | the PASS-2 FOLD seat, round 2. I wrote none of pass 2's build, its challenges or W-I.8 |
| model | `claude-opus-5-5`, asserted from own system identity |
| subject | the four findings and one note of `pass2-challenge-2.md`, folded into the mechanism, the prototype and W-I.8's gates |
| base | master `8c2d7768c`. Scratch worktree `.claude/worktrees/bl/cluster/pass2-fold-2`: `pass2/prototype.patch` (fold 1's one-clock build), then this fold. The whole build replaces `pass2/prototype.patch` (against master; it applies clean). Fold 1's patch is kept as `pass2-fold-2/prototype-fold1.patch`. The worktree was removed after this record was written |
| W-I.8 | the amendments are `pass2-fold-2/W-I.8.patch`, against `waves/W-I.8.md` **with `pass2-fold-1/W-I.8-resume.patch` applied first** (the resume patch is still pending on disk; both apply in that order, checked). This seat writes only under `design/dock-cluster/`, so the orchestrator applies them |
| harness | `pass2-fold-2/tools/probe.mjs` is challenge 2's probe plus: `clickhold`'s Tab cells (Tab 1 s after the pointer leaves), the `interrupt2` page-change-then-collapse cells at 17 and 83 ms with the 11.0.0 control at 83 ms, and per-frame reads of what the cluster last painted (`pb`) and each member's computed `scale`, `translate`, origin and margin (`tf`). `tools/continuity.py` adds the episode arm (frames k − 1 to the end) and reads an 11.0.0 control from its plates. `tools/summ.py` and `tools/seams.py` summarise. The fixture is challenge 2's |
| engines | headless Chromium 149 (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run, a new context per cell; WebKit under `--exclusive webkit`. The typecheck, the unit test and the builds under `guarded --light`, vitest `--maxWorkers=2` |
| records | `pass2-fold-2/data/`, `logs/`, `png/`. Runner `tools/run-f2.sh` (stages `f2a`, `f2int`, `f2reg`, `f2rest`, each engine), plus `smoke*` (the attribution runs) and WebKit `f2mseam` (a re-run, §W) |

## Verdict

All four findings are cured in the mechanism and measured in the challenger's own cells, in both engines. Chromium and WebKit agree to 0.01 px on every one-dock motion arm, and within 0.03 px on the swap arms. **D1:** after a click and a leave, the cluster collapses 3.5–4.0 s later, like 11.0.0, where round 1 never collapsed. A Tab inside the cluster still holds it open. **D2:** the 59.5 px repaint at the collapse's settle is gone, and the largest step in the cell is 5.07 px of 73.5 (6.9 %). Attributing a residue the new episode arm read exposed a second defect under D2. The whole-px grid read a morphing member's scaled width and wobbled the next member's gap by up to 0.91 px every frame of every collapse. It is cured too, and it is the likely cause of WebKit's "ResizeObserver loop" warnings (17 in fold 1's comparable stage, 0 in every stage here). **D3:** a second collapsible member throws on mount, naming both, and paints no lens. **D4:** the fused plate paints no gleam: 0 gradients, 0 member shadows, one kernel and one tone. No gate was weakened. I8-G17 gains the one-dock reversals and the glide-then-collapse cells, read against the 11.0.0 control. I8-G18's interrupt arm reads the whole episode, I8-G19 gains the click-and-leave arm, and I8-G21 (restraint in the fused plate) is new. One cell reads RED by 0.02 px, recorded with its cause in §6: the whole-px shift re-seats the row 0.5 px in the frame a page change lands during an expand.

## Dispositions

| # | finding | disposition | where in W-I.8 | measured (both engines, identical unless noted) |
|---|---|---|---|---|
| D1 | after any click in the cluster the dock never collapses | **Mechanism amended: R-13.** "In" follows the lone dock's rule. The pointer holds while it is inside the cluster, and focus holds from a `focusin` until the pointer leaves or focus leaves. On release each member runs its own leave, so the collapse keeps the lone dock's delay. **Gate sharpened: I8-G19** gains the click-and-leave arm and a Tab arm | R-13, I8-G19 | click, leave, sample every 500 ms for 8 s: collapses at 3.5–4.0 s in 8 of 8 cluster cells per engine (11.0.0: 3.5–4.0 s). Tab 1 s after the leave: expanded through 8 s, focus in the cluster, 4 of 4 per engine. Round 1: never, 24 of 24 |
| D2 | a collapse during a live glide drops the glide and repaints it stale at the settle | **Mechanism amended: R-7, R-12, R-3.** A morph takes a live glide over: the anchors ride the morph's rect, the offsets re-seat and spring to 0 on the same springs, and at the settle they return to the layout box the same way. A member's scale is read from its computed `scale`/`transform`, and the grid's margin from the layout width. **Gate sharpened: I8-G18's arm reads the whole episode**, and I8-G17 gains the cells | R-3, R-7, R-12, I8-G17, I8-G18 | page change, then collapse at 42 ms: largest step 5.07 px (6.9 %), no settle step; episode arm +0.71 (L) / +0.70 (R), all at the act frame, against 11.0.0's +1.15 at the same frame. At 17 and 83 ms: 5.10 / 4.78 px, +0.93 / +0.58. Round 1: +15.55 / −13.74 px at the act and −59.5 / +59.5 at the settle, the episode arm +59.49 |
| D3 | R-8's at-most-one-collapsible assertion is absent | **Mechanism added: R-8's check.** Each member registers `collapsible()`. The cluster asserts on every registration, membership change and ResizeObserver pass, before it paints | R-8, I8-G17 | twocol: `DockCluster: "Site" and "Theme" both collapse; at most one member of a cluster may carry its own collapse (W-I.8 R-8)`, 2 app errors (the member's register and the cluster's mount), 0 lenses. Round 1: 0 errors, the theme's share bare (231–232 on a 232 field) |
| D4 | the active seat's specular gleam paints inside the fused plate | **Mechanism amended: R-1.** `content: none` on the control families' `::before` inside a cluster. **Gate added: I8-G21** | R-1, I8-G21 | `shade`, collapsed and expanded, light and dark: 0 gradients, 0 shadow layers, `blur(16px)` plus the one tone. Round 1: the active seat's `radial-gradient` at 0.16 / 0.12. 11.0.0 lone dock: 5 gleam layers, 4 shadow layers, two blur values |
| N | GlassDock's own morph breaks momentum on a reversal | **Gate sharpened, not a cluster cure.** I8-G17 now runs the reversals, gated on the 11.0.0 control's own excess + 0.5 px, so a cluster that adds to the break is caught while GlassDock's own break stays visible in the record | I8-G17 | the cluster reads the control to 0.01 px: +2.60 (expand, collapse at 42 ms), +1.64 (expand, collapse at 83; collapse, expand at 83). Expand, then page change at 83 ms: +8.19 against +7.67 (§6) |

## D1 · The hold follows the reader

Round 1's hold counted focus anywhere in the cluster as "in". A click seats focus on the control it hits (GlassDock's run focuses on press, `useDockRun.ts:322`), so the hold outlived the pointer. A lone GlassDock's `onMouseLeave` schedules its collapse with focus still inside. The cluster now does the same:

- `pointerenter` sets `pointerIn`, and `pointerleave` clears both `pointerIn` and `focusIn`.
- `focusin` sets `focusIn`, and a `focusout` whose `relatedTarget` is outside the root clears it.
- A keyboard move inside the cluster fires a fresh `focusin`, so a reader who Tabs is held again.
- On release each member runs `release()` then its own leave, `onMouseLeave()` registered through `dockClusterContext`. Without the leave, release's 800 ms grace runs first and the collapse delay after it.

The registration is two fields more in `GlassDock.vue` (`leave`, `collapsible`).

| cell (bind=1, real clock, real pointer; pointer reaches, clicks, leaves) | Chromium: collapsed after the leave | WebKit | focus after the click (Chromium / WebKit) |
|---|---|---|---|
| cluster, stage, theme | 3.5 s (1440), 3.5 s (390) | 4.0 s, 4.0 s | "Dark theme" / "Dark theme" |
| cluster, stage, "Colour" | 4.0 s, 3.5 s | 4.0 s, 4.0 s | a dock element / a dock element |
| cluster, `.site-dock`, theme / "Colour" | 4.0 / 4.0 s (1440), 4.0 / 4.0 s (390) | 4.0 / 3.5 s, 4.0 / 4.0 s | as above |
| 11.0.0 (theme in `#persistent`) | 3.5–4.0 s | 3.5–4.0 s | "Dark theme" / body |
| cluster, "Colour", then Tab at 1 s | expanded at 8 s, focus "Pages" | expanded at 8 s, focus "Dark theme" | – |
| 11.0.0, "Colour", then Tab at 1 s | expanded at 8 s (focus in the dock) | 5.0 s (Tab leaves for body) | – |
| round 1 (challenge-2 D1), every click cell | never (8 s) | never (8 s) | – |

The samples are 500 ms apart, so 3.5 and 4.0 s are one reading. I8-G19's earlier arms are unchanged: the pointer resting on the theme keeps "Dark theme" under it in 12 of 12 samples with the dock expanded, in the stage and in `.site-dock`, at 390 and 1440, and the focus walk rests on the theme with the dock expanded, both engines (`f2reg`). Accessibility (`partA11y`): the census and the ARIA snapshot are equal fused and split, collapsed and expanded, and focus is kept through a fission, at both widths, both engines.

## D2 · A morph takes a glide over

Round 1's `paint()` skipped a morphing member's glide and read the member from its scaled rect. The glide's springs kept stepping toward the expanded page face's box. When `data-morphing` cleared, the stale glide painted again.

The cure keeps one structure. A glide gains an `onMorph` flag:

- **At the morph's first paint**, `reanchor` moves each anchor onto the morph's painted rect. It re-seats each offset so that the painted edge stays where the glide had it in that frame, and springs it to 0 with `playTo`, which on a live spring carries its velocity. While the morph runs, the anchors follow its rect every frame.
- **At the morph's settle**, the anchors return to the layout box with the same re-seat.
- A non-anchor morphing member's translate subtracts the offset, as a glide's does.
- The controls clip stands down under a morph, whose rect is scaled.

Fold 2 adds no spring site: `reanchor` re-plays the glide's own two host-clocked springs, so I8-G5 is unchanged. Its test is clean on this build, 1 of 1 (`logs/g5-f2.log`).

| cell, 1440, "post" order, virtual clock | largest step of the outer ends | at the act (L / R) | episode arm worst (L / R) |
|---|---|---|---|
| page change, collapse at 17 ms | 5.10 px of 73.5 (6.9 %) | +3.15 / −3.13 | +0.93 / +0.91, at the act |
| page change, collapse at 42 ms | 5.07 (6.9 %) | +3.82 / −3.75 | +0.71 / +0.70, at the act |
| page change, collapse at 83 ms | 4.78 (6.5 %) | +3.86 / −3.80 | +0.58 / +0.60, at the act |
| 11.0.0 control, the same at 42 and 83 ms | 13.5 (18.5 %, its face-swap step at frame 0) | +2.96 / −2.96 | +1.15 / +1.15, at the act |
| round 1 (challenge 2), at 42 ms | 59.5 (81 %, frame 70) | +15.55 / −13.74 | +59.49 / +59.48, at frame 70 |

The act frame's residue is GlassDock's own morph starting from rest: the 11.0.0 control reads +1.15 at the same frame with no cluster in it, and the cluster rides that start with the glide's own velocity added (0.71 px/frame). Overlap 0, 0 `%` and 0 elliptical radii, 0 `%` in the cluster's own clips, and 0 px of a control outside its glass at opacity > 0.25, in every frame of every cell, both engines.

### A second defect under D2: the grid read a scaled width

The first D2 build still read +0.93 on the right end at frame 32, against a bound of 0.13: a sub-pixel kick late in the collapse. I traced it through the probe's new per-frame reads (`data/chromium-smoke3.json` to `smoke5`):

- What the cluster painted and the DOM agreed, so the paint was not stale.
- The theme's chained gap, its left minus the dock's painted right, read 10.07, 10.81, 10.43, 10.90, 10.29 … px from frame to frame.
- The dock's computed `margin-inline-end` read 0.074, 0.821, 0.427, 0.913, 0.300 px in the same frames, while its layout width held at 175 px.

`regrid` wrote `ceil(w) − w` from `getBoundingClientRect().width`. Under a scale morph that rect is the scaled one, so each ResizeObserver pass wrote a fresh margin anywhere in [0, 1) and moved the theme's layout. Challenge 2's data shows the same 10.0–10.97 px gap through the plain collapse cell on round 1's build, so the defect was there all along, and the old ±3-frame window never read it. The cure reads the layout width, `W(pureBox(d))`. Then the gap holds and the late kick is gone: every one-dock cell's episode worst sits at the act frame.

The same read showed that R-12's `k = rect.width / offsetWidth` rests on a whole-number `offsetWidth`. `scaleOf` now reads `k` from the computed `scale` and `transform`, and the unscaled width is `rect.width / k`.

After this cure WebKit logs no "ResizeObserver loop completed with undelivered notifications" in any stage: `f2a`, `f2int`, `f2reg` and `f2rest` show 0, against 17 in fold 1's `c3` and 1 in challenge 2's `c2a`. Margin writes during a morph are the likely source of pass 2 §8's open item. I did not isolate it with a plant, so it is recorded as an observation, not a cure.

## D3 · Two collapsible members fail loud

`DockClusterMember` gains `collapsible()` (`collapse` is not `false`). `assertOneCollapsible()` runs:

- in `register` (each member's mount);
- in `observe` (the cluster's mount and every membership change);
- in the ResizeObserver callback.

It runs beside `assertLayout`, before any paint, so a throw leaves every lens on its empty clip. On the twocol cell (the theme `collapse="closed"`), both engines read `DockCluster: "Site" and "Theme" both collapse; at most one member of a cluster may carry its own collapse (W-I.8 R-8)` twice: once from the second member's registration, once from the cluster's mount. Lenses painted: 0. The capture `png/chromium-f2a-twocol-both-expand-t83.png` shows the failure painting as two bare square plates, which is loud, and not as a capsule half inked.

## D4 · No gleam in the fused plate

`cluster.css` sets `content: none` on the `::before` of `.glass-specular-track`, `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger` and `.dock-dropdown-trigger` inside a cluster member. In `material.css` that pseudo carries the gleam and nothing else; the reduced-transparency bracket already drops it.

The first build used `display: none`, and the shade read still listed the gradient (`smoke`): the read counts any generated pseudo that carries a gradient, and `display: none` leaves the pseudo generated. `content: none` generates none, and the read gives 0 (`smoke2`).

| cell, 1440 | round 2, both engines | round 1 (challenge 2) | 11.0.0 lone dock |
|---|---|---|---|
| collapsed, light / dark | 0 gradients, 0 shadows, `blur(16px)` + one tone | the theme's gleam | – |
| expanded pages, light / dark | 0 gradients, 0 shadows, `blur(16px)` + one tone | active seat gleam at 0.16 / 0.12 | 5 gleams, `glass-dock` 4 shadow layers, two blur values |

I8-G8 is unchanged: a page change hits no backdrop-filtered element in 0 of 60 frames on both faces in the cluster, against 60 of 60 for the 11.0.0 lone dock. The restraint read is the same: one kernel value and one tone, 0 gradients, 0 multi-shadows. Hover and press feedback inside the cluster is now the seat's own capsule and its colour, with no lit layer. O-203 still owes the lone dock's strike, and the press indent is not touched here.

## Regressions read on the fold-2 build

| read | Chromium | WebKit | against |
|---|---|---|---|
| I8-G18 interrupts, "post" (in/out at 42, 83; out/in at 42; `toolrun=0`) | GREEN, window and episode worst +0.13 | GREEN, +0.10 / +0.10 | fold 1: 72/72 and 40/40 GREEN, worst +0.23 |
| swap reversed twice (42, 84 ms) | GREEN, +0.16 | GREEN, +0.14 | challenge 2: +0.16 / +0.14 |
| I8-G17 one dock | theme first frame 3.63 px, largest step 5.07 (5.98 at the cut), overlap 0 | the same | fold 1: 4.36, 5.11 (5.95 at the cut) |
| I8-G18 swap | outer ends ≤ 10 px per frame at 1440, overlap 0, controls outside 0 px at op > 0.25 | the same | fold 1: the same |
| I8-G1 rest (DSF 1.25, 2.2, 2.625; 36 cells) | line ≤ 1.5, tone ≤ 0.1, r = h/2 in 36/36 | 0 / 0, 36/36 | challenge 2: the same |
| I8-G1 motion seam (neck rows) | 72 cuts, ≤ 1.4, 0 over 1.5 | 72 cuts, 0, 0 over 1.5 (`f2mseam`, §W) | fold 1: ≤ 1.5 |
| I8-G6 PRM | 2 geometry states per episode; plant 4; last opacity 268–283 ms | 2; plant 4; 250–256 ms | the L5 arm, RED as before |
| I8-G20 `.site-dock` | left 16 px, centre 0, 0 errors, 4/4 | the same | fold 1 |
| I8-G5 unit test | 1 passed | – | fold 1 |

## §W · WebKit

Every WebKit stage ran on the final build. `f2a`, `f2int` and `f2reg` match Chromium as tabulated; the only differences are the D1 sample times (one 500 ms sample) and where Tab lands. In `f2rest` the rest seam read 0 / 0 in 36 of 36 cells. The motion seam stopped after 54 of 72 cells on a `page.goto` timeout (30 s, `mseam-error` in `data/webkit-f2rest.json`); the 70 contacted cuts it had logged read 0. The re-run, `f2mseam` (`data/webkit-f2mseam.json`, after about 40 minutes waiting on another session's webkit lock), read all 72 contacted cuts at 0 on the neck rows and 0 on the member rows, so I8-G1's motion arm is GREEN in WebKit.

## §6 · Open

- **I8-G17's expand-then-page-change cell reads +8.19 against the control's +7.67, RED by 0.02 px (left end, both engines).** In the frame the page change lands the ends move +5.78 / −4.78 against the control's ±5.28: the same total, and the centre moves 0.5 px. That is the C4 whole-px `shift`, the first member's sub-pixel remainder, re-seating the row in the one frame the layout changes (R-3). A cure eases the shift on the dock spring instead of writing it; that is a sixth spring site, so it needs I8-G5's plant for it. I did not build it in this fold.
- **GlassDock's own reversal break (N)** belongs to the dock's morph, not to W-I.8. I8-G17 now shows it in every run, at +1.64 to +2.60 in both the cluster and the control.
- **WebKit's ResizeObserver warnings:** 0 here, likely from the R-3 cure; not isolated (§D2).
- From fold 1, still open: the survivor offset re-played on a later membership change (its G15 cell is booked), and R-12's morph frame hook (the prototype still paints on a MutationObserver of `--dock-morph-t`).
- Not re-run: O-198's ≤ 144 ms arm (RED until L5), I8-G2, G3, G10, G11 and G12, and the reader row (I8-G20's reader arm). The page faces did not change, and the D2 cure touches only a member under its own morph.

## Process

The guard held the first diagnostic run for headroom (load 51 against 36) and WebKit's rest stage for the webkit lock, about 16 minutes. Every browser run went through `guarded`, WebKit's under `--exclusive webkit`, and no process outside this seat's own was touched.
