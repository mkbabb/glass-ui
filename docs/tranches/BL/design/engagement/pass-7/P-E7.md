# D5 · pass 7 · P-E7: route E's part on P-A7, one arm (REGISTRY §P6-8.1)

| field | value |
|---|---|
| seat | P-E7, the second prototype seat of D5 pass 7 (`§P6-8.3` wave 2→), on P-A7's patch |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | `master`. Seat start `2db234357`; at return `914450889`. Every commit between them is docs-only (`git diff --stat 2db234357 HEAD -- src tests` is empty). `release/10.1.x` is not merged and H7 found no Sheet split at equal velocity, so F5‴ carries unchanged (§P6-8.2) |
| rulings | INBOUND re-read at seat start and at return (mtime 2026-10-27 22:58 both times; last D5 row O-103d). FORMATION-PROGRESS read to its "P-A7 banked" line. Nothing newer than O-103d binds D5. No ruling arrived mid-pass |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**, read against this seat's guarded WebKit run (O-103d (3)) |
| worktree | `.claude/worktrees/bl/D5/p7/E7/wt`, detached at `2db234357`, `node_modules` symlinked; removed with `git worktree remove --force` at return, and the seat directory with it |
| records | `E7/`: runners (`run.sh`, `gates.sh`, `builds.sh`, `plants.py`, `stages.sh`, `chain-webkit.sh`, `all.sh`, `mkpatch.sh`, `static.sh`, `ck22-greps.sh`), the probe `probe/e7-probe.mjs`, `logs/` (every log opens and closes with the 1/5/15-minute load), `json/`, `glance/` (the owner-glance set), `plants/loupe/` (the loupe plant's frames), `numstat-*.txt`, `E7-own.diff.txt` |

## 1 · The patch

| file | sha1 (`shasum`) | applies |
|---|---|---|
| `pass-7/P-E7.patch` | `a6c82db16c770ffcbc504a41a1cd8e321f216931` | `git apply --check` clean on an archived HEAD tree (`2db234357`; src and tests unchanged at `914450889`). Re-cut from the worktree at return: the same sha1 |
| contains `pass-7/P-A7.patch` | `e6e42ba3cf37c47a67811aa7dec1fc1216448816` | in full (F5‴ `24cec509…` + P-A6 `2464bf18…` + A7). P-A7 applied to the worktree with `git apply`, then E's part on top |
| E's pass-6 part, carried | from `pass-6/P-E6-noveil-coarse.patch` (`8f952538…`) | E's 23 files over P-A6 (`diff -ruN` of an A6 tree against an E6 tree), applied onto P-A7 with `patch -p1`: all 23 applied, no reject. `scale-paper.css` and `engage.css`, the two files both parts touch, merged with no conflict |

One patch, one build, one arm. `STAGE_VEIL` and `POINTER_STAGE` are gone, not set.

### What E7 changes on top of the pass-6 composition (A7 + E6's part)

`E7/E7-own.diff.txt`, `E7/numstat-E7-own.txt`: **10 files, +353/−328; src 7 files, +173/−236.**

1. **The deletion (O-103d (5), §P6-8 "one build, not four").**
   - `stage.ts`: `STAGE_VEIL`, `POINTER_STAGE`, the veil element (`stageVeil`), `setVeil`, `settleVeil`, the veil's centre writes and the hand-off's veil microtask are deleted. `engageStage(host, promoted)` and `useEngageStage(host, engaged, enabled, promote)` lose their veil argument.
   - `useEngage.ts`: the `"every"` branch is gone. A fine pointer grows in place; the keyboard and a touch promote (Q-3 (c)).
   - `focus-veil.css`: the `.glass-focus-veil[data-engaged]` reader, the discrete `visibility` arm and the veil's hand-off transition are deleted. The class's one reader is the Dialog's overlay (`[data-state="open"] > .glass-focus-veil`), as the floor made it.
   - `engage-stage.css`: the `[popover].glass-focus-veil` base rules are deleted.
   - No alias, no dead constant. Tests that branched on the constants now assert one construction (`engage-stage.test.ts`, `focus-veil.test.ts`).
2. **CK-20 · a promoted control stays inside its place's clip** (`stage.ts` `clipBox`/`writeClip`, `engage-stage.css`).
   - On every frame the stage reads (the resize step of its existing loop), a promoted host is clipped to the box that clips its footprint: the intersection of the padding boxes of the footprint's ancestors that clip (an `overflow` other than `visible` on an axis, or paint containment).
   - The clip is the host's own `clip-path: inset(…)`, mapped through the painted box into the host's untransformed frame, so the grow and any glide in flight are accounted for. An inset can be negative, so the loupe and the shadow still paint anywhere inside the card. An axis nothing clips is unbounded.
   - The clip is written only when it changes. It leaves with the promotion.
   - `position-visibility: always` turns off the UA's one-step drop (`anchors-visible`, the initial value). The clip is the one mechanism.
3. **CK-05 · one carry, on the body.** `flingStage` is deleted (it was never exported). The release carry rides the range (`carry`, F5‴'s F-13 construction) on the stage or off it. Its cause is in §3 CK-05.
4. **CK-25 · the loupe** (`slider/styles.css`, `Slider.vue`).
   - The 2 px value mark (`.glass-loupe-mark`) is deleted. The magnified fill's own tip, at the window's centre, is the value point.
   - The window's two ends dissolve the band over one band's length with a `mask-image` gradient. This adds no paint, no lighting layer and no blur change (O-87). The magnified track now runs out of the lens on both sides instead of ending on the window's pill ends.
5. **Tests.**
   - `engage-stage.test.ts`: no veil element on any path; a new describe block for the clip (the card's top edge mapped into the host's frame through a ×1.06 grow, other sides unbounded, removed on release; a non-clipping card leaves the host unclipped; the stylesheet's `position-visibility: always`).
   - `release-carry.test.ts`: a mouse hold (in place) and a touch hold (promoted) both carry on the body, never on the host.
   - `focus-veil.test.ts`: one library composer of the class, and no engagement composes it.

### Cost (CK-23)

| scope | files | lines | src | record |
|---|---:|---|---|---|
| whole patch (F5‴ + P-A6 + A7 + E) | 198 | +5180/−1598 | 153 files, +3243/−1318 | `E7/numstat-e7-whole.txt` |
| E over P-A7 (E's whole line on this base) | 24 | +1793/−342 | 16 files, +953/−269 | `E7/numstat-e7-over-a7.txt` |
| E7's own change over the pass-6 composition | 10 | +353/−328 | 7 files, +173/−236 | `E7/numstat-E7-own.txt` |

For comparison, E's line over P-A6 in pass 6 was 23 files, +1745/−319, with src 16 files, +1004/−257 (P-E6 §1). E's src is now **51 lines smaller** (+953 against +1004), and that is after adding the clip. The deletion and `flingStage` took out more source than the clip and the loupe fade put in: src +173/−236 net.

## 2 · Gates (worktree, through `guarded`, one heavy run at a time)

| gate | result | load at end |
|---|---|---|
| build (`E7/logs/gate-build.log`) | exit 0, generation `2e5f5c78…` | 16.4 (5-min) |
| typecheck, vue-tsc ×2 (`gate-typecheck.log`, `--light`) | exit 0 | 13.8 |
| harness scene app `e7` (`build-e7.log`) | exit 0 · 55 component directories · scene app `9e68012e9522` (the harness's own) | 14.6 |
| demo dist (`gate-demo-dist.log`) | exit 0 | 15.3 |
| vitest `--maxWorkers=2` (`gate-vitest.log`) | **247 files; 2426 passed, 10 expected fail, 1 skipped; exit 0** | 20.4 |

Plant builds (`E7/logs/builds.log`, `build-plant-*.log`): each plant was applied, built and reverted. After every revert the tree hash read back as the candidate's (`983dedf6c046`).

## 3 · E's must-prove list (§P6-8.1), each witness green and its plant red

Load is the 1-minute load at stage start unless a range is given.

| item | witness | candidate e7: Chromium · WebKit | plant | plant: Chromium · WebKit |
|---|---|---|---|---|
| **the deletion** | `E7/static.sh` (`logs/static-deletion.txt`): added src lines naming `STAGE_VEIL`/`POINTER_STAGE`, `"every"`, the stage veil element, its CSS, `flingStage` | **0 / 0 / 0 / 0 / 0, DELETED**; units: no `.glass-focus-veil` element on any engagement path (`engage-stage.test.ts`, `focus-veil.test.ts`, 68/68 in the focused run) | the pass-6 candidate's patch | 17 / 6 / 12 / 4 / 6, **PRESENT** |
| **CK-20** clip-vanish, keyboard (H7's E-10 cell) | px² painted outside the card per 1 px step, hidden 14..22 | **0 ×9, largest step 0** (7.0) · **0 ×9, largest step 0** (52.3); E-10 45/0 in each engine | `clip6`: no clip, the UA's `anchors-visible` | **FAIL** 3191…3976 → 0, step 3976 against 1074 (38.2) · **FAIL** 2810…3589 → 0, step 3589 (37.1), the pass-6 figures reproduced to the px² |
| **CK-20** clip-vanish, touch (`e7-probe cliptouch`; two bounds: painted outside ≤ 1074 px² and adjacent steps ≤ 1074) | touch hold, promoted on every step | **0 ×9** (37.1, re-read with the two-bound cell) · **0 ×9** (36.4) | `clip6` | **FAIL**: 3518…3772 px² outside the card on every step (34.5) · **FAIL**: 3240…3483 px² (36.9). The touch-promoted control does not even vanish: it paints over the card with its place fully hidden |
| **CK-05** the carry's cause | `e7-probe carry`, 10 reads, velocity printed (§3 CK-05) | Chromium min 0.00 · q1 6.58 · median 7.16 · q3 7.32 · max 8.46 px at median 501 px/s (47.3) · WebKit min 6.48 · q1 10.38 · median 11.16 · q3 11.61 · max 12.65 px at median 936 px/s (34.1) | `fling6`: pass 6's `flingStage` route | Chromium **FAIL** min 0.00 · median 4.20 · max 6.42 px at median 487 px/s (33.2) · WebKit median 6.03 px (min 4.61, max 6.88) at median 881 px/s (36.9), every read ≥ 4 px, so the 4 px bound does not fail; the halving is read by comparison (below) |
| **CK-25** the loupe at k max (`e7-probe loupe`) | seam ≤ 6 levels, line ≤ 6, runs on ≤ 0.35, band = k max ± 5 %, tip ≤ 2 px from centre | **4/4 PASS** per engine: seam 0.0-0.1, line 0.0, runs on 0.11-0.13, band ×1.600, tip 0.00 px (Chromium 35.4, WebKit 46.1) | `loupe6`: the 2 px mark, no end fade | **4/4 FAIL** per engine: seam 26.4-45.2, line 46.7-52.9, runs on 1.00 (Chromium 32.1, WebKit 34.6) |
| **the idle loop** | `ca6-probe idle` (C-A6's cell, unedited) | stated, not bounded: Chromium 123 rAF and 123 ResizeObserver callbacks/s engaged idle, the same off-screen (−2904 px), **0.0 layouts/s and 0.0 style recalcs/s**, 0 at rest and after Escape (35.1). WebKit 98/s on- and off-screen, 0 at rest and after Escape, no layout counter (36.4) | — | — |

### CK-05 · the WebKit carry's halving, read to its cause and restored

**The cause.** In pass 6, E's merge sent a host on the stage through `flingStage`. A fine-pointer hold grows in place, so the host is a holder, and every slider release took that branch. `flingStage` stretched the whole host with its trailing edge held, soft-limited (tanh) to the grow's reach. The value point E-4 reads is the range's leading edge, at its value's fraction of the host's width, so it carried only that fraction of the stretch. That is about half at the scene's mid value. The floor's body carry (`carry`, F5‴ F-13) moves the leading edge the whole displacement. `flingStage` also animated `transform` with `composite: "add"`, the form F-13 cured on the fill.

**The read.** The two builds differ only in that route (`fling6` puts it back). At matched release velocities:

| engine | e7 (the body carry) | fling6 (the stage stretch) | ratio |
|---|---|---|---|
| Chromium | 7.26 px at 509, 7.05 at 493, 7.33 at 514, 8.46 at 602 px/s | 4.31 px at 503, 4.09 at 472, 4.01 at 460, 5.08 at 602 px/s | 0.55-0.60 |
| WebKit | median 11.16 px at median 936 px/s (10.26-12.65 at 899-1096 px/s) | median 6.03 px at median 881 px/s (5.92-6.88 at 920-1067 px/s) | 0.54 |

**The restored figure on the H7 battery** (E-4, 5 reads each, every read must pass):
- Chromium carry 11.95 / 12.00 / 12.21 / 12.23 / 12.66 px at load 12.4;
- WebKit 7.10 / 7.13 / 9.51 / 10.40 / 11.05 px at load 34.8.

Against the pass-6 candidate's WebKit 4.35-7.44 px (C-A6) and 6.68-7.44 px (P-E6, C-E6), and the floor alone's 13.65 px (F5ppp), the carry is back at the floor's order.

**Reads per engine, the standing figure for F-5.** The cell's bound counts only reads whose fling the rule measured at ≥ 100 px/s.
- Chromium: 15 reads (E-4 5 + probe 10). Carry 0.00-12.66 px; 14 of 15 at ≥ 5.95 px.
- WebKit: 15 reads (E-4 5 + probe 10). Carry 6.48-12.65 px; no read under 6.48.

**The one 0.00 read** (Chromium probe read 8, load 47.3) printed a release velocity of **0 px/s**: the lift reached the page more than 100 ms after the last move, so the release rule's window was empty. That is the drive under load, not the carry. The fling6 plant shows the same, at 0 px/s.

**Carry tracks the delivered velocity.** At load 47 the drive delivered 414-602 px/s and carried 5.95-8.46 px. At load 12, E-4's drive carried about 12 px. In WebKit, the two reads at 471 and 506 px/s carried 6.92 and 6.48 px, and the reads at 899-1096 px/s carried 10.26-12.65 px.

**What P-A7's Chromium E-4 fails were.** P-A7 read 0.00-3.25 px (§4, gap 2) on a build with no stage, so its carry was already the body's. They are consistent with this reading: low delivered velocity under load (P-A7 ran at 17-36). The H7 E-4 cell prints no velocity, so P-A7 could not see this. The probe's velocity column is what tells the drive from the carry. This is H8's to fold into E-4 if it wants the slider row to print velocity.

## 4 · The H7 battery on the candidate, both engines (harness `7bf3ce6f`, build `e7`, the harness's own app)

Chromium ran stage by stage, one `guarded` call each (16:02-16:41). **WebKit ran in one `guarded --exclusive webkit --timeout 90` acquisition**: queued 16:41:58, admitted 16:41:59 (no wait), released 17:23:01, guarded exit 0 (`E7/logs/all.log`). No WebKit stage was skipped, and no page closed outside the harness's NAV_CAP relaunch.

After the acquisition, two Chromium re-reads ran: the touch clip cell with its second bound added (`logs/cliptouch2-*.log`). The WebKit phase had already run that cell with both bounds. The machine-wide WebKit dock crash recorded at 12:37 (FORMATION-PROGRESS, 10.1.3) did not touch these scenes. Loads ran 6.5-64.3 (other seats).

| witness | Chromium P/F/U · load | WebKit P/F/U · load | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 21.2 | 93/3/0 · 29.6 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (the `css` substrate, engine limit); WebKit FAIL 1.84 levels against 1.25 at rest (not ≥ 2×, D3's amplitude) and the PRM leg 0.00 (A's reduce leg, P-A7 gap 1) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 20.9 | **164/0/0** · 42.7 | — |
| E-3 | **22/0/0** · 16.3 | **22/0/0** · 38.3 | — (P-A7's two phone touch-held fails were E's promotion, absent there; present here) |
| E-4 | **18/0/0** · 12.4 | 15/0/4 · 34.8 | WebKit's 4 UNMEASURED: the Carousel's engine fact (O-103d (4)). Sheet repeat landing PASS in both |
| E-5 | **56/0/0** · 6.5 | **56/0/0** · 36.1 | — |
| E-6 | 4/2/8 · 7.5 | 2/2/8 · 47.1 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 · 7.5 | 6/1/0 · 55.7 | `data-held` in `GlassDock.vue` (D2's named clause) |
| E-8 | **19/0/0** · 7.1 | **19/0/0** · 60.0 | — |
| E-9 | **85/0/0** · 9.2 | **85/0/0** · 64.3 | — |
| E-9 `--prm-plant` | 40/32 · 26.0 (`PLANT reach` 14 stateful faces fail, tabs included) | 40/32 · 43.5 (the same 14) | H7's plant, red as it must be |
| E-10 | **45/0/0** · 7.0 | **45/0/0** · 52.3 | — |
| E-11 | 7/0/1 · 13.1 | 7/0/1 · 30.1 | UNMEASURED: `--scale-commit-pop=1` is not read on the Switch path (A's, as P-A7) |
| E-12 | **102/0/0** · 17.2 | **101/0/1** · 38.1 | WebKit `rest layouts`: the engine fact (O-103d (4)). The preset chip answers, and the select press passes, in both engines |
| CAP | 18/0 · 28.7 | 18/0 · 37.4 | sheets `E7/glance/e7-{chromium,webkit}-{fine,coarse}.png` |

## 5 · Per CK row, this part (each engine, with load)

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| **05** | E-4 slider 5/5 at 11.95-12.66 px (12.4); probe 10 reads, §3; Sheet repeat landing PASS | E-4 slider 5/5 at 7.10-11.05 px (34.8); probe 10 reads at 6.48-12.65 px (34.1); Carousel the engine fact | **E's item built.** The halving is read to its cause (`flingStage`) and restored by deleting that route: one carry, the body's. The distribution is printed per engine (§3), so F-5 can be asked on a standing figure. The Sheet's landing is not E's (H7: no split at equal velocity) |
| **20** | E-10 45/0: clip-vanish 0 px² every step; pointer-in-scroller 6/6; hand-off 0.0081 / 0.0064 against 0.0076 + 0.002; Escape 0.0070 (7.0). Touch clip 0 px² (37.1) | E-10 45/0: clip-vanish 0 every step; pointer 6/6; hand-off 0.0094 / 0.0083 against 0.0150 + 0.002; Escape 0.0123 (52.3). Touch clip 0 px² (36.4) | **Built.** A promoted control never paints outside the box that clips its place and leaves it row by row, keyboard and touch. The plant (the pass-6 construction) is red in both engines on both drives (§3). A's +60 reverse slope is recorded, not scored (§P6-7 item 12) |
| **25** | loupe 4/4 PASS (35.4); the glance set | loupe 4/4 PASS (46.1); the glance set | **Built for E's loupe item**: no mark harder than the fill's own edge (no mark), the band dissolving at both window ends, band ×1.600 = k max, the tip on the centre. No lighting layer, no blur token touched. Frames: `E7/glance/loupe/e7-{chromium,webkit}-{fine,coarse}-{light,dark}-loupe-sustained.png` against the plant's `E7/plants/loupe/plant-loupe6-*`. **The gestalt is the critics'** (CK-25: read by a seat that did not build the route). My own reading of the frames: the magnified fill and run now read as a strip seen through glass, not as a split pill. The fill still ends on its pill cap at the centre, and the dark housing is still the near-black plate (the token wave's, O-87 10.2.0) |
| **16** | rest 0 rAF/s; engaged idle 123/s on- and off-screen, 0.0 layouts/s, 0.0 style recalcs/s (35.1) | rest 0; engaged idle 98/s on- and off-screen (36.4) | Holds by its letter (engaged is not rest). The idle loop's cost is stated, not bounded (gap 2). The clip adds no recalc while nothing moves |
| **23** | §1 | — | measured |
| **26** | no lighting layer added; the loupe's change is a mask and a deletion; no veil element exists | same | holds |
| **27** | every new cell has a plant that fails it (§3); the deletion's static cell fails on the pass-6 patch | same | holds for E's cells. The `fling6` plant fails the 4 px bound in Chromium only; in WebKit it is a cause read by comparison, not a red cell (gap 3) |
| **14, 15, 04** | E-3 22/0, E-12 coarse cells PASS, singleton cells PASS on every hand-off | same | no regression |
| **22** | E's pass-7 MIGRATION rows, §6 | — | built for E's pass-7 changes (§6) |
| **01, 17, 19** | D2's latch, D2's `:active`, D3's amplitude, A's reduce leg | same | not E's; unchanged |
| others | unchanged from P-A7's readings (E-2, E-5, E-8, E-9, E-11, E-12, CAP) | same | no regression in either engine |

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 6 · CK-22 · E's MIGRATION rows (consumer greps re-run at this HEAD)

`E7/ck22-greps.sh` → `E7/logs/ck22-greps.txt`. The greps are read-only over nine siblings, with node_modules, dist, worktrees, .claude, docs and bench excluded. Nothing was built or run in any sibling.

| # | consumer-visible change | consumer sites | row |
|---|---|---|---|
| M-23 | No engagement veils the world. The stage creates no veil element, and the focus veil's `[data-engaged]` reader is deleted (its writer left with the floor's veil split). `.glass-focus-veil` stays, read by the Dialog overlay's open state | `glass-focus-veil` in consumer source: 0 in every sibling; `data-engaged` on a veil: 0 | "An engaged control no longer frosts the page. A `.glass-focus-veil` of yours rises under an open `data-state` parent, not under `data-engaged`." |
| M-24 | A promoted control (keyboard or touch) is clipped to the box that clips its place, through an inline `clip-path` while it is on the stage, and it is never dropped whole by the UA (`position-visibility: always`) | `<Slider>`: atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier-analysis 5, sci-report 5; `clip-path`/`position-visibility` restyles on a slider: 0 | "A slider engaged by the keyboard or a touch stays inside the scroller or card it sits in, as it does at rest. Do not set `clip-path` on a slider root: the stage writes it while the slider is engaged." |
| M-25 | The loupe's value mark (`.glass-loupe-mark`) is deleted; the loupe's window dissolves the magnified track at both ends | `glass-loupe` in consumer source: 0 | "The loupe shows the value as the magnified fill's tip; there is no mark element to restyle." |
| M-26 | The release carry rides the range on and off the stage (the whole-host stretch is gone; it was never exported) | `flingStage`/`useEngageStage`/`STAGE_VEIL`/`POINTER_STAGE`: 0 | "A flung slider's fill runs on with the fling and settles; the control itself does not stretch." |

## 7 · Open gaps

1. **CK-25 is the critics' frame call.** The loupe cells are mine. The critics should read `E7/glance/loupe/` against `E7/plants/loupe/`.
   - The fill still ends on a pill cap at the centre. A lens-thumb in place, as iOS's slider lens does it, is a larger construction and is not built.
   - The glance sheets crop the raised loupe at the slider cell's top. Use `glance/loupe/`.
2. **The idle frame loop is not bounded.** The invariant needs the resize step every frame while anything is on the stage. Its cost is stated (§3). It runs off-screen too, and every construction I considered that pauses it (an off-screen pause, a scroll-only read) loses a move made while paused. 0 layouts and 0 style recalcs per second while idle in Chromium.
3. **The `fling6` plant is red in Chromium (3.76 px at 426 px/s) and not in WebKit** (every read ≥ 4.61 px). In WebKit the cause is read by the matched-velocity ratio (0.54), not by a failing cell. The 4 px bound sits under the stage stretch's WebKit figure, which is the F-5 question itself.
4. **The touch clip cell is a probe cell, not an E-10 cell.** H7's E-10 drives the keyboard's clip-vanish only. H8 may adopt `e7-probe cliptouch` (both bounds).
5. **The clip reads ancestors' `overflow` and paint containment only.**
   - An ancestor `clip-path` or `mask` is not mapped, and neither is a transformed or rotated scroller. No scene has one.
   - In Chromium the anchor's scroll adjustment may land a frame apart from the resize-step clip during a fast scroll. The stills read 0 px² at every step, but no film read the clip edge during a scroll.
6. **E's earlier MIGRATION rows were not re-audited here.** These are the promotion's effect on `:first-child`/`+`/`~`, the Escape spent inside a Dialog, and the keyboard and script-focus engagement (P-E.md §7, C-E r23). §6 adds pass 7's rows only. CK-22 is scored on the composition by the critics.
7. **One composer of `.glass-focus-veil`.** The Slider was its second composer, and the class keeps one library composer (the Dialog). It is a public CSS class, not an engagement surface, so this is recorded and not scored.
8. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 8 · Process

- **Machine law.**
  - Every build, test and browser run went through `~/.claude/guard/guarded`. `--light` was used only on the typecheck and the focused unit runs.
  - WebKit ran only under `--exclusive webkit`, in one acquisition (no wait, 41 min held, exit 0).
  - One heavy run at a time. vitest ran at `--maxWorkers=2`. One browser per run with a context per cell (the harness's own). No GPU arguments, and films took no screenshot.
  - The kernel zone never gated a run.
- **Fences.**
  - No edit to tracked source in the checkout, and no git write in the checkout beyond `git worktree add`/`remove`.
  - Inside my own worktree, one `git checkout HEAD -- src/styles/glass/focus-veil.css` reset that file before re-applying P-A7's hunk for it. It was a worktree-only write, recorded here because the fence names `checkout`.
  - Checkout writes are only `pass-7/P-E7.patch`, `pass-7/P-E7.md` and `pass-7/E7/`. Siblings were read by grep only. Nothing under `~/.claude` was read beyond executing `guarded`.
- **Slips, mine.**
  - `patch -p1` left one `engage.css.orig` backup in the worktree. It was deleted before the gates, and the patch carries no `.orig`.
  - The touch clip cell first gated only the adjacent-step bound, and the clip6 plant passed it while painting 3518-3772 px² over the card. A second bound was added (painted outside ≤ 1074 px², the row's first clause) before the WebKit phase ran it. Chromium was re-read on both builds after the acquisition (`logs/cliptouch2-*.log`); the first Chromium reads stay in `logs/probe-e7-chromium.log` and `logs/plant-clip6-chromium-probe.log`.
  - The probe's runs-on cell first measured luma; the light theme's fill and glass differ little in luma. It now reads RGB colour distance, changed before the battery.
- **Cleanup.**
  - The worktree was removed with `git worktree remove --force`, and `.claude/worktrees/bl/D5/p7/E7/` is gone. The scratch trees are removed.
  - No P-E7 process is left running. The harness builds went with the worktree, so a re-read rebuilds from the patch.
