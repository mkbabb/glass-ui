# D5 · pass 9 · C-E9: critic of the candidate A+E (HEAD + P-E9.patch, in place under every modality)

| field | value |
|---|---|
| seat | C-E9's completion seat. It ran the whole battery in both engines and replaces the first seat's partial report. I authored no D5 seat in passes 2-9 and was not a critic in passes 3-8 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| verdict | **ADVANCE, not converged, not clean. 22 of 27 rows closed (81 %), the same 22 as C-A9.** Open: CK-01, 17, 19 (held by D2 and D3), and **CK-20 and CK-25, each with counterexamples D5 can build away.** Every pass-8 counterexample is gone on the candidate in both engines. **This is not the fixed point** |
| candidate | HEAD `9efc5784a` + `pass-9/P-E9.patch`. HEAD moved to `72fe42ffe` during the seat, docs only (`git diff --stat 9efc5784a HEAD -- src tests` is empty). `git diff --stat v10.1.0 HEAD -- src` is empty. `release/10.1.1`, `10.1.2` and `10.1.3` are not ancestors of HEAD (exit 1), so the base did not move |
| hashes (recomputed) | `P-E9.patch` `0cbe2b6d…`, `P-E9-probe.patch` `4c735aa7…`, `P-E8.patch` `5dc4d930…`, `P-E8-inplace-loupe.patch` `fdccd7f4…`, `probe-loop-variant.patch` `a6060049…`, `P-A7.patch` `e6e42ba3…`. Harness `c2ce48c3…`, unedited. `App.vue` `9e34ffa5714e`. Src trees: cand9 `82c3f35a7110`, cand8 `92f38f424df2` (both as P-E9 recorded), probe9 `b04f59d8e344` (as the first seat read it) |
| rulings | INBOUND read at start (mtime 21:07:37) and close (14:16:10). The one change is O-110 (fourier, 10.1.3), which does not bind D5. The last D5 ruling is **O-103f**: Q-3′ (i), F-5 (a). So the in-place build is the candidate and construction (c) is the probe. O-103f (1) and (3) are re-measured here (§2) |
| engines | Chromium 149 and Playwright WebKit 26.5, headless shell, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row |
| WebKit | **One** `guarded --exclusive webkit --timeout 90` acquisition, queued 13:16:54 after the Chromium phase, admitted 13:42:40 (26 min), 34 stages, released 14:45:30, exit 0 (`c/logs/wk-queue.log`). 8 browser retirements at 60 navigations; no log prints an engine close, a crash or a HARNESS ERROR |
| load | Chromium 12:17-14:48, WebKit 13:42-14:45. 1-minute load at stage start 6.3-26.5 in Chromium and 12.4-22.1 in WebKit. Every stage log opens and closes with its load, and every cell line carries its own. No quiet window was available for the WebKit lens film (§1 item 2) |
| records | `pass-9/C-E9/c/`: `scripts/`, `probe/ce9c-probe.mjs`, `logs/` (one per stage and engine), `json/`, `frames/`, `wk-stages.txt` |

**The two earlier seats.** The first seat returned at 22:55 with no WebKit cell measured and scored nothing; its static readings are re-checked in §3. A second seat (`C-E9/b/`) finished Chromium and was lost at the restart, with no WebKit run and no report. I used its scripts and its amended `C-E9/probe/ce9-probe.mjs`. **No number below comes from either seat's logs.** All are from `c/logs/`.

**What I did not read.** The brief asks for the REGISTRY in full. I read §P1-6 (the checklist) and the whole pass-8 part (§P8-0..§P8-8), not the rest of passes 0-7. Row readings from those passes rest on §P8 and on C-A9's table.

## 1 · In brief

1. **The candidate holds on every H9 cell and every pass-8 counterexample, in both engines.** E-10 **72/0 Chromium, 69/0 WebKit**; E-13 **16/0 each**. The probe (c) is red where it should be: E-10 60/12 and 60/9.
2. **CK-20 stays open on three lens instances, all shared with the probe, so none bears on Q-3′.**
   - **The side flip (C-A9's item, reproduced).** A held lens crossing the threshold moves **101.8 px (Chromium) and 101.7 px (WebKit)** against its track in one frame. Under `scale: 0.8` WebKit moves 81.4 px. Chromium under scale also paints one frame with the pinned edge **50.4 px off** (sample 27, in all three runs), because the correction is zeroed on the flip frame (`stage.ts:123-125`).
   - **The flip has no hysteresis (new).** ±3 px about the threshold changes side **20 times in 41 samples** in both engines (`flipjitter`). The worst step is 101.8 px, and 131.8 px in Chromium under scale. The drive is adversarial, but any wobble at that line (a rubber-band scroll, a re-render) would do the same.
   - **The WebKit lens trails its track on a wheel scroll (new).** On a film, the lens-to-track distance jumps from 2 px to about 10 px on several frames, one 8 px tick, on an untransformed card (`lensfilm · none`, 3 films, stages `cand9-ce9c` and `cand9-filmctl`; probe the same). A blue block inside the scroller, in the lens's place, reads **0 px off in all 3 films** on the same drive (`lensfilm · marker`), so the capture is not the cause. The main-thread read says 0.00 px, so this is paint only. Chromium's film reads 0 px (none) and 1 px (scale).
     - **Weight of this reading:** H8 says WebKit's 25 fps film is no one-frame witness, and §P8-7 item 9 warns about WebKit paint instruments. The marker control is new, but no plant fails this cell. Every read was at load 14.3-21.6, with no quiet read. I score it as an instance and flag it for the agglomeration to weigh. CK-20 is open on the flip regardless.
3. **CK-25 reopens as D5-buildable (new, and this differs from C-A9).** Under a scaled card in **Chromium**, the lens is off its track on its raise and exit clocks. It is **up to 10.9 px off on the raise and up to 34.3 px off on the exit**, against §P8-8.1's "within 2 px of its track". Read 3 times on cand9 (loads 14.5-18.9). WebKit reads 0.0 px, and so does Chromium untransformed.
   - **Cause, proved by a plant.** The lens's `scale` property composes outside its `transform` (`slider/styles.css:459-461`), so the raise's own scale multiplies the correction `--lens-dx/-dy` (39.4 px × (1 − 0.13) = 34.3 px, the frozen reading). `plant-cause` moves the correction into the `translate` property and reads **0.0 px on every clock cell**, with the frozen exit at 0.0 px against 26.6 and 34.3 px.
   - **Why H9 misses it.** E-13's cell reads a hold sustained 1200 ms, after the raise has finished. C-A9 §4 item 2 named the exit clock and read nothing.
   - **What the frames show.** `c/frames/clock/cand9-chromium-lens-exit-frozen-scale-60ms.png` against `…-none-60ms.png`. The drift is 16.9 px at opacity 0.51, so it is visible.
4. **O-103f's conditions (1) and (3) hold on my re-measure** (§2).
5. **The stacking difference, read in a frame.** A later positioned sibling stays over the engaged control on the candidate, red 100.0 % at rest and engaged, both engines (`c/frames/ce9/cand9-webkit-stack-keyboard-engaged.png`). On the probe the keyboard-promoted body paints through it (`probe9-chromium-stack-keyboard-engaged.png`). C-2's sentence holds.

## 2 · O-103f, re-measured by a non-builder

| condition | Chromium | WebKit | plant |
|---|---|---|---|
| (1) idle cost, bar = the pass-8 construction, read in the same chain as the probe | engaged 120.3 rAF + 120.3 RO per s, 0 layouts, 0 recalcs; off-screen the same; rest and after Escape 0 (load 9.8). Probe 120.0 + 120.0 | **60.0 + 60.0 per s**; probe **60.0 + 60.0**, same run (load 17.2); off-screen the same; after Escape 0 | — |
| (3) the loop stops at release | `e9-probe`: 0.0/s in all three windows after release, keyboard and fine hold (load 9.6) | the same (load 17.5) | `loop-plant` FAIL 2/2: 105.1 / 98.2 per s (Chromium), 52.3 / 51.9 per s (WebKit) |
| (3) on the Dialog's unmount (my cell) | rAF after dismissal 71.9-77.9 per s at 0-150 ms, 0.0 at 1.5-3 s. **The control, the same Dialog with nothing engaged, reads 91.5**: those frames are the Dialog's own exit, not the stage's | 58.4-58.8 at 0-150 ms, 0.0 at 1.5-3 s; control 58.4 | the control |

**One discrepancy.** Earlier seats read WebKit at 98 per s; I read 60. Both builds read 60 in my session, so the cost is at the bar: one callback per frame per counter in each. I did not find why the frame rate differs.

## 3 · Per row, the candidate

| CK | status | Chromium (load at stage start) | WebKit (load) | plant, red | reading |
|---|---|---|---|---|---|
| 01 | **OPEN ◇** | E-1 93/1/2 (6.3): `dock` latch 54/55; ambient UNMEASURED (engine limit) | E-1 93/3/0 (22.1): `dock` 54/55; ambient 1.72 against 1.23 at rest; ambient PRM 0.00 | — | D2's latch; D3's amplitude; A's reduce leg waits on D3's lane |
| 02 | closed | E-2 164/0 (8.8) | E-2 164/0 (19.2) | H7's PRM plant, in E-9 | arm (ii), O-103d (1) |
| 03, 04 | closed | E-3 22/0 (8.5) | E-3 22/0 (14.9) | — | — |
| 05 | closed | E-4 18/0 (12.4): slider carry 10.98-12.28 px at 855-1040 px/s; tabs 38.50; Sheet 125.41; sortable 25.16; Carousel 491 | E-4 15/0/4 (17.7): slider 12.83-13.35 px at 1194-1311 px/s; tabs 41.39; Sheet 250; sortable 27.80; Carousel UNMEASURED (O-103d (4)) | — | F-5 (a): margin ≥ 6.98 px; velocity printed, never gated |
| 06 | closed | E-5 56/0 (9.6) | E-5 56/0 (15.3) | — | — |
| 07 | closed | E-6 4/2/8: `s6 present` | E-6 2/2/8, the same | — | S6 RETIRED, O-103d (2) |
| 08 | closed | E-7 6/1/0: `data-held` writers `GlassDock.vue` and `useEngage.ts` | E-7 6/1/0 | — | D2's named clause |
| 09 | closed | E-8 19/0 (10.5) | E-8 19/0 (14.5) | — | — |
| 10 | closed | E-9 85/0 (13.2) | E-9 85/0 (13.8) | PRM plant 40/32 per engine | — |
| 11 | closed | E-12 102/0 (22.0) | E-12 101/0/1 (12.6) | — | `tap-squish` and `interactive-item` in src: comments only (`c/logs/static-close.log`) |
| 12 | closed | crest Button ×1.0600, Chip ×1.0400 | ×1.0598, ×1.0399 | C-A9's `crest` plant; I built none | reads the register's rows |
| 13, 14 | closed | forced-colours and coarse cells in E-12 | the same; PRT the engine's limit | — | as passes 6-8 |
| 15 | closed | hand-off and singleton inside E-10 | hand-off drop 0.0139 against own release 0.0142; singleton max 1 | — | — |
| 16 | closed | §2 | §2 | `loop-plant` | O-103f (1), (3) |
| 17 | **OPEN ◇** | — | — | — | D2: the dock's `:active` presses name no `touchstart` listener. Real Safari UNMEASURED |
| 18 | closed | E-4's four surfaces on the one rule | the same | — | — |
| 19 | **OPEN ◇** | — | ambient 1.72 against 1.23, not ≥ 2× | — | D3's amplitude and the lean's scalar |
| 20 | **OPEN** | E-10 72/0 (13.6); flip 101.8 px, one frame 50.4 px off under scale; flipjitter 20 flips | E-10 69/0 (17.7); flip 101.7 / 81.4 px; flipjitter 20 flips; lens film one tick off | `noread` 58/14 and 55/14; `cand8` new cells 4/12 and 4/9; probe 60/12 and 60/9 | every H9 cell closes; §1 item 2 opens it. D5 can build |
| 21 | closed | E-11 11/0/5 (16.0) | E-11 11/0/5 (14.1) | E-11's own | the five are tokens not read on that commit path |
| 22 | closed | §4 | — | — | one table from pass 1; one wording note in §4 |
| 23 | closed | **198 files +5072/−1648; src 153 files +3088/−1359**. Probe +5445/−1647, src +3450/−1358. cand8 +5375/−1644, src +3380/−1355 | — | — | `git apply --numstat`, to the line |
| 24 | closed | E-1's `static` cells | the same | — | — |
| 25 | **OPEN** | E-13 16/0 (8.9); tip 4/0; CAP 18/0 (14.6); raise and exit off the track under scale | E-13 16/0 (15.2); tip 4/0; CAP 18/0 (14.0); the clock cells 0.0 px | `nolens` 4/12 per engine; `plant-cause` for the clock | **D5 can build: §1 item 3.** ◇ The ambient exemplar stays D3's |
| 26 | closed | no lighting layer, no blur token, no radius in the lens's change. `plus-lighter` in the chip: a comment recording its removal. `blur(20px)` in src: 4 hits, comments, unchanged from HEAD | — | — | O-87 |
| 27 | closed | every P-E9 item and H9 cell has a plant red in both engines, as above. The feather's Chromium plant is not red (P-E9 §8 gap 3); the WebKit plant is the probe's ×0.584 | the same | — | the raise-clock gap is H10's, not a failed gate |

**Where this differs from C-A9.** The count and the set of open rows are the same. C-A9 reads CK-25 as held by D3 alone; it drove no raise or exit clock. Under the plan's rule a counterexample one critic reproduced stands, so the agglomeration should rule it OPEN, D5-buildable, unless a measurement refutes it.

**CE8's own cells on the candidate** (`cand9-ce8`, 21/5 Chromium, 19/4 WebKit) are not counterexamples. The Chromium reds are three trail cells that say NOT DRIVEN because the cell expects a promoted body, plus rotate on touch and fine. The WebKit reds are filter and keyboard rotate. All of these are the in-place scatter H9 §2.1 made REPORT.

## 4 · CK-22, and the first seat's static findings re-checked

- **Reproduced:** the patch hashes, the src tree hashes, the costs (§3), and `engage-footprint`, `writePaint`, `worldOf`, `held-scale`, `position-visibility` and `--veil-x` at 0 in src. `byTouch` is 4 lines in `hold.ts` only. The two `anchor-name`/`position-anchor` hits in `.css` are the Sheet's (`sheet/styles.css:354,363`); the lens's name is written inline from `Slider.vue`. This corrects the first seat, which called those two hits the loupe's own.
- **Consumer greps** at glass-ui `9efc5784a`, with both `E9/ck22-greps.sh` and C-A9's independent script (`c/logs/ck22-greps-*.txt`). The self-check counts 22. At `.vue` sites: `<Slider>` atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier 5, sci-report 5. `<NumberField>` 1/6/1/1. `tap-squish` chicago 3, speedtest 4 live + 1 comment, keyframes 1. Every other count matches.
- **Pass 1's rows:** §6.1/§6.2 name M-A1..M-A8, M-B rows, P-E rows 1-6 and F5's seven lines, as C-A9 checked. I read the table, not each source file.
- **The DOM against C-2 and C-9** (`CE9 dom`, both engines): in place, same parent, no footprint, no popover on the host, lens on fine and touch only.
- **One wording note, not scored against the row.** C-2's row says "The library writes only `--stage-room` and `--stage-w` on it". A held Slider also carries inline `--atom-drag-v` and `--flex-vel`, written by the velocity writer that HEAD already has. "The stage writes" is the true sentence. It changes nothing a consumer sees. C-9's "flush on its track" is false during the raise under scale in Chromium, but the cure is the lens, so that counts once under CK-25 (P-3).

**The first seat's next-pass classes, now measured:**

| class | result |
|---|---|
| 1. the lens's scale ignores `zoom` | **Refuted.** Under `zoom: 0.8`, ×1.600, 0.0 px, fine and coarse, both engines. Also nested scale, `scale: 1.25`, and scale at the viewport's top: all PASS, both engines |
| 2. the side flip is one frame | **Confirmed**, §1 item 2 |
| 3. the lens on a compositor scroll under a scaled card | **Chromium holds** (film worst 1 px). WebKit: §1 item 2, on the untransformed card too |
| 4. the grow's reach ignores a clipping ancestor | **Measured, no row.** A slider filling its scroller's content box grows ×1.060 and is cut 11.9 / 11.9 px, both engines; its rounded ends read flat (`c/frames/ce9/cand9-chromium-narrow-keyboard-engaged.png`). This agrees with the invariant, since it paints what its place paints, and C-2 says so |

**Also read, all clean:** the glide under CSS `zoom` (Chromium 0.46 / 0.72 px against 0.57; WebKit 1.38 / 2.15 against 1.72; the probe 4.19-19.11 px); ancestor skew, mask, zoom and perspective inside 0.90..1.10 in both engines; `mix-blend-mode` inside in Chromium, 1.102 in WebKit, an in-place body's scatter; the lens over the Dialog (×1.600, topmost, both engines).

## 5 · The probe (c) beside the candidate (read, not scored)

| cell | probe · Chromium | probe · WebKit | candidate · Chromium / WebKit |
|---|---|---|---|
| E-10 | 60/12 (10.4) | 60/9 (14.4) | 72/0 / 69/0 |
| anc opacity · keyboard \| touch | ×1.960 \| ×1.940 FAIL | ×1.984 \| ×1.965 FAIL | 1.009 \| 1.032 / 1.001 \| 0.989 |
| anc `clip-path` · keyboard \| touch | ×1.406 \| ×1.162 FAIL | ×1.400 \| ×1.150 FAIL | 1.003 \| 1.024 / 1.010 \| 0.980 |
| anc rotate | keyboard ×1.877 FAIL | touch ×1.987 FAIL | 1.028 / 1.074 |
| anc filter · keyboard | ×0.227 FAIL | ×0.222 REPORT | 1.041 / 1.102 REPORT |
| dlg esc2 \| scrim, root's largest step | 0.778 \| 0.928 FAIL | 0.677 \| 0.896 FAIL | 0.135 \| 0.173 / 0.188 \| 0.174, each within the plate's + 0.05 |
| trail | FAIL | REPORT | PASS / REPORT |
| glidescale | 5.25 px FAIL | 6.15 px FAIL | 0.46 / 1.52 px |
| feather · keyboard | 1.022 | ×0.584 FAIL | 0.999 / 0.991 |
| E-13, tip | 16/0, 4/0 | 16/0, 4/0 | the same |
| flip, jitter, lens film, raise and exit under scale | the same as the candidate: shared lens code | the same | — |
| stacking, keyboard | the control over the sibling | the same | the sibling over the control |
| idle | 120.0 + 120.0 | 60.0 + 60.0 | at the bar |

The probe's Chromium clock cells were read at `probe9-ce9` and match in kind. On every cell that separates the two, the in-place build holds. All the new lens defects are shared, so **none of this bears on Q-3′**.

## 6 · The gestalt, from frames (CK-25), against iOS 27 and O-87

Read from `c/frames/cap-cand9/cand9-chromium-{fine,coarse}.png`, `cand9-webkit-fine.png` and the E-13 stills. I did not open `cand9-webkit-coarse.png` or the probe's CAP sheets; CAP reads 18/0 on all of them.

- **At grade.** The set reads flat, coherent and restrained, as O-87 asks. Button ×1.059-1.061, Switch ×1.056-1.060, accordion ×1.037-1.040, held slider ×1.060 in place. The lens reads as a ruler under glass, with a square cut and dissolved ends, and it sits flush under `scale: 0.8` and level under `rotate: 6deg`.
- **Below grade, D5's:** the lens coming apart from its track on the raise and exit under a scaled card (§1 item 3), and the side swap (counted under CK-20).
- **A reading, not a measurement, no row:** at the viewport's top on a coarse pointer, the lens hangs below the track, where a finger on the thumb would cover it. The CSS comment says the lens "rises above the finger". No cell can read a finger.
- **Not D5's:** the static ambient exemplar in Chromium (D3). The dark housing barely separates from a dark track, and the Button's warm halo remains (W-0.1).

## 7 · Next-pass defect classes (no row added)

1. **A placement correction composed inside its own animation.** The cure's shape is measured by `plant-cause`: the correction in `translate`, not `transform`. H10's witness: the lens's pinned edge per frame across the raise and exit, under scale, both engines, with the candidate as its plant.
2. **A side decided per frame, with no travel and no hysteresis.** H10's witnesses: the largest one-frame move across the threshold, and the flip count under a wobble.
3. **The lens's paint against its track on a scroll, in WebKit.** `lensfilm` and its marker control should become a cell, with a plant, read at a quiet load if one can be had.
4. **A witness that reads only the settled state.** E-13's 1200 ms hold is why item 1 passed every gate.
5. **A rate read as a fixed bar.** WebKit's idle read 98 per s in earlier seats and 60 here, in both builds. The bar should be read beside the candidate in the same run.

## 8 · Process

- **Machine law.** Every build and browser run went through `guarded`, never `--light`; one heavy run at a time. WebKit took the one acquisition. No guard refusal, and the kernel zone never gated a run. One browser per run, a context per cell, closed in `finally` (the harness's lib and my probe). No GPU arguments.
- **Instrument fixes, each kept in the probe file.** My `lensfilm` first read 0 frames because its column missed the lens; the first form's reads are superseded by `cand9-ce9c2`. I added the `marker` control and the Dialog control after the first reads. `run.sh` was replaced by an atomic rename during the acquisition, so no in-flight stage read a half-written file.
- **Fences.** No tracked file was edited. The one write outside the worktree is under `docs/tranches/BL/design/engagement/` (this file and `pass-9/C-E9/c/`). No git write beyond `git worktree add` and `remove`. Siblings were read by grep only. Nothing under `~/.claude` was read; `guarded` was only executed. `plant-cause` was built in the worktree and reverted (tree back to `82c3f35a7110`).
- **Cleanup.** The worktree is removed (exit 0, absent from `git worktree list`), and no seat process is left running. **`.claude/worktrees/bl/D5/p9/C-E9b/out-lost-seat/` remains.** The orchestrator kept it there at the restart (FORMATION-PROGRESS 2026-10-30), so I left it; it is the owner's or formation's to remove.
- Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.
