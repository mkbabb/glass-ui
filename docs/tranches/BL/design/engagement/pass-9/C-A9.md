# D5 · pass 9 · C-A9: critic of the candidate A+E (HEAD + P-E9.patch, in place under every modality)

| field | value |
|---|---|
| seat | C-A9, one of pass 9's two fresh critics (`§P8-8.3` wave 3). I authored no D5 seat in passes 2-9 and was not a critic in passes 3-8 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| verdict | **ADVANCE, not converged, not clean. 22 of 27 rows closed (81 %).** Open: CK-01, 17, 19 and 25, each held only by D2 or D3, and **CK-20, on one counterexample D5 can build away: the loupe changes sides in one frame** (101.8 px against its track, both engines; §0 item 2). Every pass-8 counterexample I replayed is gone on the candidate in both engines, and every cell H9 added passes. CK-22 closes on my reading. **This is not the fixed point, by one cell** |
| candidate | HEAD `186424059` (docs only past P-E9's base `32668853e`; HEAD moved to `94db4bee5` and then `59bd52157` during the seat, docs only) + `pass-9/P-E9.patch`. `git diff --stat v10.1.0 HEAD -- src` is empty. `release/10.1.1`, `10.1.2` and `10.1.3` are not ancestors of HEAD (`git merge-base --is-ancestor`, exit 1). sha1s checked: `P-E9.patch` `0cbe2b6d…`, `P-E9-probe.patch` `4c735aa7…`, `pass-8/P-E8.patch` `5dc4d930…`, `P-E8-inplace-loupe.patch` `fdccd7f4…`, `E8/probe-loop-variant.patch` `a6060049…`, `pass-7/P-A7.patch` `e6e42ba3…`. `git apply --check` clean; the candidate's src tree hash `82c3f35a7110` equals P-E9's |
| rulings | INBOUND re-read at start and at close (mtime 2026-10-29 21:07 both times). It ends at O-113; the last D5 ruling is **O-103f**: Q-3′ ruled (i), in place under every modality, the loupe alone promoted; F-5 ruled (a). So the in-place construction is the candidate and the promoted one (c) is the probe. O-103f's conditions (1) the idle cost re-measured by a non-builder and (3) the loop stopping at release are read here (§2). FORMATION-PROGRESS read to its 2026-10-29 "D5 p9 H9 banked" line and the later cursor lines. Nothing arrived mid-pass |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5 (playwright 1.61.1), headless shell, imported from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row |
| harness | H9's, unedited: hash `c2ce48c39f82…` recomputed at my start; the harness's own scene app `scenes/App.vue` `9e34ffa5714e`. My own cells are one file, `C-A9/scripts/ca9-probe.mjs`, on the harness's lib and its own app. I also ran other seats' instruments unchanged: `pass-8/E8/probe/e8-probe.mjs` (tip), `pass-9/E9/probe/e9-probe.mjs` (loop), `pass-6/C-A6/probe/ca6-probe.mjs` (idle), `pass-8/C-A8/probe/ca8-probe.mjs` (crest) |
| builds | in my worktree `.claude/worktrees/bl/D5/p9/C-A9/wt` (removed, §6): `cand9`; my own plants on it, each one edit (`scripts/plants.py`): `noread`, `ancscale`, `nobelow`, `loop`, `glidepx`, `crest`, `prmY`; `probe9` = HEAD + `P-E9-probe.patch`. Each plant reverted to the candidate's tree hash before the next (`logs/builds.log`) |
| WebKit | **One** `guarded --exclusive webkit --timeout 90` acquisition. Queued 22:55:15, admitted 23:02:48 (a 7.5-minute wait), 33 stages, released 23:57:37, exit 0 (`logs/wk-queue.log`). Every queued stage ran to its end; no stage was skipped. The acquisition did not hold the lock idle: on admission it paused my Chromium chain between stages and waited 65 s for the one Chromium stage already running, so the seat never ran two heavy runs at once. WebKit retired its browser at 60 navigations 8 times; no log prints an engine close, a crash or a HARNESS ERROR |
| load | Chromium 22:56-23:03 and 23:58-00:42 at 1-minute loads 8.4-24.1 (other seats' runs); WebKit 23:02-23:57 at 7.4-17.8. Every stage log opens and closes with its 1/5/15-minute load, and every cell line carries its own. No cell differed between a loaded and an unloaded read, so nothing below rests on a NOT-REPRODUCED reading |
| records | `C-A9/`: `scripts/` (builds, plants, runner, Chromium chain, WebKit queue and its stage list, the probe, my consumer greps), `logs/` (one per stage and engine), `json/`, `frames/` (`cap/{cand9,probe9}/` CAP sheets and frames, both engines; `loupe/{cand9,probe9}/` E-13 stills; `ca9/` the stack, flip and zoom stills; `smoke/` the first probe run). No video kept |

## 0 · In brief, A's rows first

1. **A's rows close on my reads, both engines.**
   - **CK-12.** The crest paints the register's rows. The Button peaks at ×1.0600 (Chromium) and ×1.0599 (WebKit) against `--scale-engage` 1.0600; the selectable Chip at ×1.0400 / ×1.0399 against 2 − `--scale-press` 1.0400 (`logs/cand9-crest-*.log`). My `crest` plant (the pass-6 literals 1.02 and 1.05) reads ×1.0200 on both faces and **fails 2/2 per engine** (`logs/crest-crest-*.log`).
   - **CK-10 and the reduce legs.** E-9 85/0 per engine. H7's PRM plant fails 32 cells per engine (`cand9-prmplant`). My `prmY` plant (the reduce mechanism's `transition-duration: 0s` removed) fails 28 per engine (`prmY-E-9`). E-4's slider, sortable and tabs PRM cells settle with 0.00 px overshoot. Under reduce the loupe keeps only its placement transform (`slider/styles.css`); the grow is `none`.
   - **CK-02** E-2 164/0 per engine with `--commit-arms i,ii`. **CK-03, CK-04** E-3 22/0 per engine. **CK-09** E-8 19/0. **CK-11, CK-13, CK-14** E-12 102/0 Chromium, 101/0/1 WebKit (the WebKit rest-layout counter, O-103d (4)'s engine fact); forced-colours cells inside E-12 in both engines.
   - **CK-01** stays open on D2's `dock` latch (54/55, both engines), D3's ambient amplitude (WebKit 1.71 levels against 1.24 at rest) and A's ambient reduce leg (0.00, waiting on D3's lane). Chromium's ambient cell is the engine limit (`css` substrate).
2. **CK-20 stays open on one new counterexample: the loupe changes sides in one frame.** P-E9's viewport cure hangs the lens below its track when its top would leave the viewport. The side is decided per frame and switches instantly. I held a slider with a fine pointer, loupe shown, and scrolled the page 3 px per frame (`ca9-probe flip`). On the frame the track's top crossed about 80 px, the lens moved **101.8 px against its own track in one frame**, from above to below, in both engines (Chromium 101.8, WebKit 101.7). Under `scale: 0.8` it moved 81.4 px in both. The lens was flush on its track on every frame before and after (gap 0.0 px), and it moved 0.0 px against the track on every other frame. So the jump is the side swap itself, with no travel. Stills on each side, 6 px of scroll apart: `frames/ca9/cand9-{chromium,webkit}-flipstill-track-at-84.png` (above) and `…-at-78.png` (below). D-1 asks that all motion carry inertia, and CK-20 takes new instances. The path is narrow: a held lens whose track crosses the threshold while held, through a wheel during a mouse hold, a programmatic scroll, or a re-render moving the track. A hold that starts near the top places the lens below from its first frame, with no flip. The cure is D5's and small: the side change travels, for example by springing the correction across rather than resetting it. The probe carries the same lens code and flips the same way, both engines (`logs/probe9-ca9-*.log`), so this has no bearing on Q-3′.
3. **The in-place candidate meets the invariant on H9's whole family, both engines, by construction; the probe fails it where pass 8's critics did.** I reproduced P-E9's figures to the decimal on every graded cell, and the probe's reds within 0.1:
   - ancestor opacity: 1.009 / 1.032 Chromium keyboard / touch, 1.001 / 0.989 WebKit; the probe ×1.960 / 1.940 and ×1.984 / 1.965.
   - `clip-path`: 1.003 / 1.024, 1.010 / 0.980; the probe ×1.406 and ×1.400.
   - rotation (graded on Chromium keyboard and WebKit touch and fine): 1.028; 1.074 / 1.064. The probe ×1.877 (Chromium keyboard) and the WebKit touch cell red.
   - filter on Chromium keyboard: 1.041; the probe ×0.227.
   - the Dialog dismissed under a keyboard-engaged Slider: the root's largest one-frame step equals the plate's own, 0.103 / 0.105 Chromium and 0.115 / 0.114 WebKit, promoted on 0 frames. The probe steps 0.815 / 0.927 and 0.719 / 0.908.
   - the Chromium place film: 0 px worst in all nine engaged films; the probe 4 px.
   - the glide under `scale: 0.8`: 0.48 px (Chromium) and 0.80 px (WebKit), against the unscaled 0.58 / 0.83 px. The probe 5.34 / 5.42 px.
   - the feather, two-sided: 0.999 / 1.005 and 0.991 / 1.004; the probe's WebKit keyboard cell ×0.584.
   - E-10 totals: **72/0 Chromium and 69/0 WebKit**; the probe 60/12 and 60/9.
4. **Both loupe cures land, and hold off H9's cells.** E-13 16/16 per engine. Under `scale: 0.8` the band reads ×1.600 with the lens 0.0 px from the track's painted top, fine and coarse, and at the viewport's top 81 of 81 rows paint. My plants red them: `ancscale` (the lens's scale walk stopped at the host) reads ×2.000 on both pointers, 2 FAIL per engine; `nobelow` reads 7 / 9 of 81 rows, 2 FAIL per engine. Off H9's cells, under an ancestor **`zoom: 0.8`** (not a transform, so not in `paintedScale`'s walk), the lens still reads ×1.600, 0.0 px from the track and 0.0 px off centre in both engines (`ca9-probe zoom`).
5. **O-103f's conditions (1) and (3), re-measured by a non-builder: both hold.**
   - **Idle cost:** keyboard-engaged idle is 119.9 rAF + 119.9 RO callbacks per s in Chromium, with 0.0 layouts and 0.0 recalcs per s, and 98.4 + 98.4 in WebKit (`ca9-probe idle`). C-A6's instrument reads 120.0 / 120.3 off-screen and 98.3 / 98.0. The bar is the pass-8 candidate, which the probe carries unchanged: 98.0 + 98.0 WebKit in the same run, 120.3 in pass 8. That is one callback per frame per counter in both builds, so the cost sits at the bar. Rest is 0.0.
   - **The loop stops at release:** I counted page-wide with rAF and ResizeObserver wrapped before any page script, over five releases (Escape, Tab out, a click away, a fine-pointer mouse-up, and a Tab hand-off then Tab out). Every window from the release on reads 0.0 + 0.0 per s, the first 150 ms included, in both engines: **5/5 PASS per engine**. My `loop` plant (the stop at release removed) reads 98.9-106.7 rAF per s in the 0-150 ms window: 5/5 FAIL per engine. The probe, pass 8's loop, reads 85.5-86.1 + 85.5-86.1 there and fails the same 5.
6. **CK-22 closes.** P-E9's §6 is one table, C-1..C-30, carried from pass 1 on. I checked each pass-1 source by name: `P-A.md` §7 M-A1..M-A8, `P-B.md` §7 M-B1..M-B11 (there is no M-B6 in the source), `P-E.md` §7 rows 1-6, and `F5.md`'s seven Migration lines. Each is carried or retired in §6.2. C-2 and C-9 state what the bytes paint. My own frame confirms C-2's stacking sentence (§1, CK-22). My own greps, written independently with `grep -e`, reproduce every consumer count in the table at the pass-9 HEAD (`logs/ck22-greps.txt`).
7. **The stacking difference, read in a frame as `§P8-8.3` asks.** A later absolutely positioned sibling (a red bar across the thumb) stays over the engaged control on the candidate: red fraction 0.900 at rest and 0.900 keyboard-engaged, both engines. On the probe the keyboard-promoted control paints over it (0.900 → **0.000**). On a fine hold both builds are in place (0.900). Frames: `frames/ca9/{cand9,probe9}-*-stack-keyboard-{rest,engaged}.png`. This is the one thing the in-place answer gives up. It holds at rest as well, and C-2 says so.

## 1 · Per row, the candidate (both engines; logs under `C-A9/logs/`)

| CK | status | Chromium (load at stage start) | WebKit (load) | plant, red | reading |
|---|---|---|---|---|---|
| 01 | **OPEN ◇** | E-1 93/1/2 (11.2): `dock` latch 54/55; ambient UNMEASURED (engine limit, `css` substrate) | E-1 93/3/0 (8.8): `dock` 54/55; ambient 1.71 against 1.24 at rest; ambient PRM 0.00 | — | D2's latch; D3's amplitude; A's reduce leg waits on D3's lane. Closed by: D2's dock adoption (or a dock scene with its leave) and D3's lane in D5's base with A's reduce write on it |
| 02 | closed | E-2 164/0 (11.0) | E-2 164/0 (9.2) | H7's PRM plant (within E-9) | arm (ii) per O-103d (1) |
| 03 | closed | E-3 22/0 (11.1) | E-3 22/0 (9.2) | — | mount and async arrival |
| 04 | closed | E-3 22/0 | E-3 22/0 | — | keyboard ×1.03+ in place; PRM ×1.000 |
| 05 | closed | E-4 18/0 (10.2): slider carry 12.05-12.38 px at 996-1051 px/s; tabs 38.32 px at 1103 px/s; Sheet 250 px; sortable 23.55 px | E-4 15/0/4 (7.4; at end 13.7): slider 13.53-13.71 px at 1311-1356 px/s; tabs 42.03; Sheet 250; sortable 30.17; Carousel UNMEASURED (no touch scrolling, O-103d (4)) | — | F-5 (a): margin ≥ 8.05 px; velocity printed beside every read, never gated (O-103f) |
| 06 | closed | E-5 56/0 (10.3) | E-5 56/0 (13.7) | — | — |
| 07 | closed | E-6 4/2/8: `s6 present` FAIL light and dark | E-6 2/2/8, the same | — | S6 RETIRED (O-103d (2)) |
| 08 | closed | E-7 6/1/0: `data-held` writers `GlassDock.vue` and `useEngage.ts` | E-7 6/1/0 (re-read with `--wt`, §5) | — | D2's named clause |
| 09 | closed | E-8 19/0 | E-8 19/0 | — | — |
| 10 | closed | E-9 85/0 (22.0) | E-9 85/0 (10.4) | H7's PRM plant 32 FAIL per engine; my `prmY` 28 FAIL per engine | both reduce mechanisms graded |
| 11 | closed | E-12 102/0 (11.6) | E-12 101/0/1 (9.9) | — | — |
| 12 | closed | crest Button ×1.0600, Chip ×1.0400 | ×1.0599, ×1.0399 | `crest` ×1.0200, 2/2 FAIL per engine | §0 item 1 |
| 13 | closed | forced-colours cells in E-12 | the same; PRT the engine's limit | — | as passes 6-8 |
| 14 | closed | E-12 coarse cells | the same | — | — |
| 15 | closed | E-10 hand-off and singleton inside 72/0 | inside 69/0 | — | — |
| 16 | closed | rest 0; engaged idle 119.9 + 119.9 per s, 0 layouts, 0 recalcs; off-screen 120.3; stops at release | rest 0; 98.4 + 98.4; stops at release | `loop` 5/5 FAIL per engine | O-103f (1) and (3), §0 item 5 |
| 17 | **OPEN ◇** | — | — | — | D2: the dock's `:active` presses name no `touchstart` listener. Real Safari UNMEASURED |
| 18 | closed | E-4's four surfaces on the one rule (slider, sortable, Sheet, tabs) | the same | — | — |
| 19 | **OPEN ◇** | — | ambient 1.71 against 1.24 at rest, not ≥ 2× | — | D3: the amplitude and the lean's own scalar |
| 20 | **OPEN** | E-10 72/0 (11.1); the flip 101.8 px / 81.4 px under scale | E-10 69/0 (11.5); the flip 101.7 / 81.4 | `noread` 14 FAIL per engine (the 21 stale-place cells; the two pointer·reveal cells and five controls pass, as P-E9 §8 item 4 says); `glidepx` FAIL 1/1 per engine (7.16 px WebKit); the probe red on every H9 cell P-E9 names | **every H9 cell and every pass-8 counterexample closes; one new instance opens it** (§0 item 2) |
| 21 | closed | E-11 11/0/5 | E-11 11/0/5 | (E-11's plants inside the witness) | the five UNMEASURED: tokens not read on that control's commit path |
| 22 | closed | §0 item 6 | — | — | §1.1 below |
| 23 | closed | `git apply --numstat`: **198 files +5072/−1648; src 153 files +3088/−1359**; the probe 198 / +5445/−1647, src +3450/−1358 | — | — | reproduced to the line |
| 24 | closed | E-1's `static` cells within 93 pass | the same | — | — |
| 25 | **OPEN ◇** | E-13 16/0 (11.2); tip 4/0; zoom 3/3; CAP 18/0 | E-13 16/0 (12.7); tip 4/0; zoom 3/3; CAP 18/0 | `ancscale`, `nobelow` 2/2 FAIL each per engine | D5's lens items close. Held by D3 alone: the ambient exemplar is static. The flip is seen in frames and counted once, under CK-20 (P-3) |
| 26 | closed | the lens change is a placement transform; no lighting layer, no blur token, no radius (bytes) | — | — | O-87 |
| 27 | closed | every P-E9 item and H9 cell has a plant red in both engines: `cand8`/`probe9` (anc, dlg, trail Chromium, glide, WebKit feather), `noread`, `glidepx`, `ancscale`, `nobelow`, `loop`, `crest`, `prmY`, H7's PRM plant | the same | — | P-E9 §8 item 3 stands: the two-sided feather has no library plant red in Chromium (H9's fixture plants are its red) |

### 1.1 CK-22, what I checked

- **The consumer counts.** `scripts/ck22-greps.sh` → `logs/ck22-greps.txt`, at glass-ui HEAD `94db4bee5`. Each sibling's HEAD is printed; value.js was read by grep only. Self-check: `--veil-x/y` counts 22 in glass-ui's own `src`. Counting `.vue` sites, as P-E9's table does, every count matches:
  - `<Slider>`: atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier 5, sci-report 5.
  - `<NumberField>`: keyframes 1, speedtest 6, value.js 1, fourier 1.
  - `tap-squish`: chicago 3, speedtest 4 live and 1 comment, keyframes `EasingField.vue:40`.
  - `--veil-x/y` in atlas: 2 writes and 2 comments.
  - `data-held` readers: value.js `ComponentSliders.vue:428,430`.
  - `glass-loupe`, `--lens-*`, `--held-scale-*`, `--stage-*`, stage attributes, `anchor-name` on `.slider-track`, `useDockHold`, the register names: 0 everywhere.

  My larger raw counts are a `.ts` comment each in keyframes.js and value.js, and sci-report's `dist-ob11/` build output (one minified CSS line matches `tap-squish`, `interactive-item`, `data-held` and `data-press`). Neither is a consumer site.
- **The bytes behind C-2.** The stage writes `data-engage-stage`, `data-engaged`, `--stage-room` and `--stage-w` on the host, and nothing else inline (`stage.ts` `writeGeometry`, `engageStage`). The glide is a WAAPI `translate` (composite add), not an inline write. The grow is the `scale` property (`engage.css:174-175`). The stacking sentence holds in my frame (§0 item 7).
- **The bytes behind C-9.** The lens is shown on fine and touch holds only (`grasping` needs the hand). Its transform is `translate(--lens-dx, --lens-dy) scale(--lens-sx, --lens-sy)` about its pinned edge. It hangs below where its top would leave the viewport, and is level under rotation. C-9's consumer sentence ("turns under the track at the top of the viewport") is true. It does not say that the turn is instant, and §0 item 2 is that turn.
- **C-27 and C-29.** `useHold`, `useEngage`, `engageStage` and `useEngageStage` are not exported (`composables/motion/index.ts` exports the envelopes, the ladder and the declaration; `motion/core` exports `usePressMark`). The table states this.
- **A records defect, not a row's:** P-E9 §4's E-4 row puts the two engines' slider figures in each other's columns. Its §4.1 is right: Chromium 12.17-12.46 px at 1019-1068 px/s and WebKit 12.77-13.69 px at 1290-1356 px/s (`E9/logs/cand9-E-4-*.log`). Mine agree.

## 2 · The probe (c) beside the candidate, for Q-3′ (read, not scored)

| cell | probe · Chromium | probe · WebKit | candidate · Chromium / WebKit |
|---|---|---|---|
| E-10 whole | 60/12 (8.7) | 60/9 (7.9) | 72/0 / 69/0 |
| anc opacity · keyboard \| touch | ×1.960 \| ×1.940 FAIL | ×1.984 \| ×1.965 FAIL | 1.009 \| 1.032 / 1.001 \| 0.989 |
| anc `clip-path` · keyboard \| touch | ×1.406 \| ×1.162 FAIL | ×1.400 \| touch FAIL | 1.003 \| 1.024 / 1.010 \| 0.980 |
| anc rotate · graded mode | ×1.877 FAIL (keyboard) | touch FAIL | 1.028 / 1.074, 1.064 |
| anc filter · keyboard | ×0.227 FAIL | ×0.222 REPORT | 1.041 / REPORT 1.102 |
| dlg esc2 \| scrim, root step / plate step | 0.815 / 0.157 \| 0.927 / 0.256 FAIL | 0.719 / 0.113 \| 0.908 / 0.115 FAIL | equal to the plate's, 0 frames promoted |
| trail, engaged worst | 4 px FAIL | REPORT 0 px | 0 px / REPORT 0 |
| glidescale · scale | 5.34 px FAIL | 5.42 px FAIL | 0.48 / 0.80 px |
| feather · keyboard | 1.022 | **×0.584 FAIL** | 0.999 / 0.991 |
| E-13 | 16/0 | 16/0 | 16/0 / 16/0 |
| the flip | 101.8 / 81.4 px | 101.7 / 81.4 px | the same: shared lens code |
| stacking, keyboard | the control over a later positioned sibling (red 0.000) | the same | the sibling over the control (0.900) |
| loop after release, 0-150 ms | 85.5-86.1 + 85.5-86.1 per s, FAIL 5/5 | the same | 0.0 / 0.0 |
| idle, engaged | 120 + 120 | 98.0 + 98.0 | at the bar |

The record agrees with O-103f's grounds. On every cell that separates the two constructions, the in-place build holds and the promoted one does not. The promoted one buys exactly the stacking fact, which no row asks for. The shared lens behaves the same under both.

## 3 · The gestalt, from my own frames (CK-25), against iOS 27 and O-87

Read from the CAP sheets of both engines, fine and coarse (`frames/cap/cand9/cand9-{chromium,webkit}-{fine,coarse}.png`), my lens stills (`frames/ca9/`) and E-13's (`frames/loupe/cand9/`):
- **At grade.** The committed Button reads ×1.059-1.060, the Switch ×1.054-1.059 with its thumb's travel, and the accordion ×1.039. The held slider sits at ×1.060 in place, and the sortable lift is quiet. The set reads flat and coherent, with no lighting layer and no bloom. That is what O-87 asks: refined, deft, a little less blur. The lens reads as a lens: a square cut at the window's centre, ends that dissolve, and the housing's own hairline. Under a scaled or zoomed card it is the same ruler at the same magnification, sitting on the track (`cand9-*-zoom-{scale,zoom}-held.png`). At the viewport's top it hangs whole below the track (`…-flipstill-track-at-78.png`).
- **Below grade, D5's, counted under CK-20:** the side swap. On one frame the lens stands over the track; 6 px of scroll later it is under it, with nothing between (`…-at-84.png` against `…-at-78.png`). An iOS 27 lens would carry that change.
- **Not D5's:** the ambient exemplar is static (D3). The dark housing barely separates from a dark track, and the Button's warm halo is still there; both read as W-0.1's token wave, as both pass-8 critics said. In the CAP sheets the held slider's lens is trimmed at the top by the scene's capture crop, not by the page (P-E9 §7 says the same).

## 4 · Next-pass defect classes (no row added)

1. **A placement decided per frame with no travel between its states.** The lens's side is a boolean on the track's position. Crossing it moves the visible lens 80-100 px in one frame. Any future fallback (`position-try` included) has the same shape. Placed: CK-20's counterexample; the cure is P-E10's. A witness for H10: a held lens filmed across the threshold, graded on its largest one-frame move against its track. Its plant is the candidate as it stands.
2. **No cell reads the lens on its exit clock.** After release the loop stops at once (as O-103f (3) requires). The lens stays visible for about 150-450 ms while it fades, and it is no longer laid on its track (`e9-probe`: loupe 1→1 in 0-150 ms, 1→0 by 450 ms). Under a scaled card with a scroll inside that window, its correction is stale. No reading shows it; I record it as unmeasured.
3. **Editing a runner while it runs.** I edited `run-ca9.sh` twice while an instance was in flight. Each in-flight instance printed `parse error` on its summary line, after its stage had ended and written its log (`logs/wk-queue.log`, after `probe9-E-10` and `cand9-E-11`; H9 §2.2 saw the same class). No result was lost, and no stage ran twice except the E-7 re-read below.
4. **A witness argument the runner left out.** My first E-7 run (WebKit) had no `--wt`, so its four static writer cells read UNMEASURED. I queued a re-read with `--wt` inside the same acquisition: 6/1/0, which is the score of record. Chromium E-7 and both engines' E-12 ran with `--wt`.

## 5 · Process

- **Machine law.** Every build and browser run went through `~/.claude/guard/guarded`, and none used `--light`. Builds and Chromium ran one stage per guarded call. WebKit ran in the one `--exclusive webkit` acquisition (23:02:48-23:57:37), plus one Chromium probe stage afterwards (`cand9-flipstill`, 00:41:31-00:41:35, load 24.0), and one smoke run of my probe before the chain (22:55-22:56, Chromium, `logs/smoke-chromium.log`). One heavy run at a time: the run markers (`logs/c-stage-running`, `logs/wk-running`) kept Chromium and WebKit from overlapping. One browser per run, a fresh context per cell, everything closed in `finally` (the harness's lib and my probe). No GPU arguments. No vitest or build gates were re-run; P-E9 §2's gates are its own, and I name them unreplayed. No guard refusal; the kernel zone never gated a run.
- **Fences.** No tracked file in the checkout was edited, and no git write was made in the checkout beyond `git worktree add` and `remove`. Checkout writes: `pass-9/C-A9.md` and `pass-9/C-A9/`. Siblings were read by grep only. Nothing under `~/.claude` was read; `guarded` was only executed.
- **Cleanup.** The worktree was removed (`git worktree remove --force`, exit 0, absent from `git worktree list`), along with its build output and the empty `.claude/worktrees/bl/D5/p9/C-A9/` and `p9/` directories. The run markers were deleted. No C-A9 process is left running. `git status` shows no tracked change.
- Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.
