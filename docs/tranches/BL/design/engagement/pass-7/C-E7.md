# D5 · pass 7 · C-E7: the fresh adversarial critic of the candidate A+E

| field | value |
|---|---|
| seat | C-E7, one of the two pass-7 critics (`REGISTRY.md` §P6-8.3 wave 3). I authored no D5 seat in passes 2-7 and was no critic in passes 3-6 |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **ADVANCE, not converged, not clean. 20 of 27 rows closed (74 %).** Open: CK-01, 05, 17, 19, 20, 22, 25. CK-20 holds four new counterexamples that building can remove, so **this is not the fixed point** |
| candidate | HEAD `71a668bbf` (docs-only past P-E7's base: `git diff --stat 2db234357 HEAD -- src tests` empty) + `pass-7/P-E7.patch`. sha1s checked: `P-E7.patch` `a6c82db1…`, `P-A7.patch` `e6e42ba3…`, `F5ppp.patch` `24cec509…`, `P-A6.patch` `2464bf18…`. Containment: P-A7 applied alone to an archive of HEAD differs from my candidate tree in exactly 24 files (16 src, 8 tests), E's line over A7 as P-E7 §1 states |
| rulings | INBOUND re-read at start (mtime 2026-10-27 22:58; last D5 row O-103d; O-108/109/103e/110 not D5's). FORMATION-PROGRESS read to "P-E7 banked; critics C-A7 + C-E7 running". Nothing arrived mid-pass |
| engines | Chromium 149 headless shell and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row; Safari cells are read against my guarded WebKit run |
| harness | H7's harness (`harness/`, unedited), the harness's own scene app `9e68012e9522`, build `ce7` from my worktree. My own probe (`C-E7/probe/ce7-probe.mjs`) drives the harness's own `clipstale` scene and restyles its scroller by a style write, as the harness's own drives do. No fork |
| records | `C-E7/`: runners (`run.sh`, `builds.sh`, `plants.py`, `stages.sh`, `chain-webkit.sh`, `all.sh`), probes (`probe/ce7-probe.mjs`, `probe/film-reread.py`), `logs/` (every stage log opens and closes with the 1/5/15-min load), `json/`, `glance/` (CAP sheets and frames, `glance/clip/`, `glance/loupe/`, `glance/ce7-chromium-ck25-pairs.png`), `plants/`, `film/` (the recorded videos) |
| WebKit | **one** `guarded --exclusive webkit --timeout 90` acquisition: queued 20:02:33, admitted 20:22:33 (20 min wait), released 21:12:25, guarded exit 0, 27 stages, none skipped (`logs/all.log`). No page closed outside the harness's NAV_CAP relaunch |
| load | 29-58 throughout (other seats). Every cell below carries its load in its log |

## 0 · In brief

1. **E's part holds on every path P-E7 drove, reproduced to the px².** Clip-vanish on the keyboard (E-10) and on touch (`e7-probe cliptouch`) reads 0 px² on all 9 steps in both engines; `clip6` puts back 3191…3976 → 0 (Chromium) and 2810…3589 → 0 (WebKit), the pass-6 figures exactly. The deletion is complete in source (`STAGE_VEIL`, `POINTER_STAGE`, `"every"`, `stageVeil/setVeil/settleVeil`, `flingStage`: 0 hits in `src/`). The WebKit carry's cause reproduces: at matched release velocity the body carry reads 10.6-11.6 px against `fling6`'s 6.3-6.7 px (ratio about 0.6) in WebKit, 10.7-11.3 against 6.4-6.8 in Chromium. The loupe cells pass 4/4 per engine; `loupe6` fails 4/4 per engine.
2. **CK-20 is open on four paths no pass-7 cell drives (P-E7 §7 gap 5 named the class unread).** The clip is a rectangle built from ancestors' `overflow` boxes. Every other clip the library itself paints is lost the moment a control is promoted:
   - **A feathered scroller (the library's own `.fading-scroll`, i.e. `FadingScroll`, the Configurator's controls column).** In flow the control fades into the feather. Promoted, it paints at full strength: visibility ×1.46 (Chromium) and ×1.39 (WebKit) of the in-flow read against ×1.05 and ×1.00 with the feather off. Frames `glance/clip/ce7-chromium-mask-on-{released,promoted}.png`. This is a consumer path: fourier-analysis renders `SliderControl` (a glass `<Slider>`) in `ConfiguratorLayer`s inside `<Configurator scroll-mode="auto">` (`VisualizationView.vue:459`, `EquationView.vue:495`).
   - **A rounded scroller.** At a 40 px radius the promoted control paints 221 px² (Chromium) and 201 px² (WebKit) in the corners outside the rounded padding box, the 1.5 px antialias band already excluded. Frames `glance/clip/ce7-chromium-radius-{engaged,released}.png`.
   - **A scaled ancestor.** Under `scale: 0.8` on the scroller the promotion jumps the control 52.2 px (Chromium) and 28.7 px (WebKit) in its first frame and paints it at ×0.848 of its in-flow width. A `translate` keeps its place in both engines (0.0 px). Frame `glance/clip/ce7-chromium-scale-place-engaged.png`.
   - **A scroll in Chromium.** Recorded films (Playwright video, decoded) of twelve wheel ticks under a keyboard engagement show one frame of unclipped paint above the card: 730 px², against `clip6`'s 731-866 px² and 36-37 px² for every released film. Chromium shows it in 5 of 9 engaged films over four runs at more than 400 px², and in a sixth at 203 px²; no released film shows it. WebKit is clean (40 px² in 3/3; its `clip6` plant reads 734-920, so the film can see it).
3. **CK-05: every candidate failure carries the drive's signature, but one WebKit cell is unread by me.** The velocity-printing cells pass in both engines: `e7-probe carry` 10/10 per engine (Chromium min 6.32 px at 435 px/s; WebKit min 7.21 px at 476 px/s); the Sheet's repeat landing is ordered by velocity in both, and runs at 0 px/s land a detent short, as H7 found. E-4's tabs fling failed at load 34.6 (Chromium) and 44.9 (WebKit), with the *still* release carrying 29.76 and 31.73 px. The Chromium re-reads pass 2/2 (difference 28.53 and 28.55 px, still 1.2 px: NOT-REPRODUCED). The WebKit re-read needs a second acquisition, which this seat's budget does not allow, so that cell stays unread and the row stays open.
4. **A's items reproduce.** E-2 164/0 and E-9 85/0 per engine. The preset chip answers in both engines; `chipmute` fails. The Button's committed still reads ×1.051-1.061 in all 8 cells; `crest` reads ×1.017-1.021, 8/8 FAIL. The coarse dark Switch press reads ΔL 0.0873 (Chromium) and 0.0862 (WebKit), above the pass-6 light references 0.0782 and 0.0773; `thumb` drops to 0.0774 and 0.0763 and fails. `prmY` (the one reduce mechanism removed) fails 28 cells per engine.
5. **CK-22 reopens on E's side.** A retired P-A5 row 4 and P-A4 M-9 (the pass-7 plan's ask). E retired none of its own: P-E2 §4 rows 1-2 ("escapes ancestor clipping"; "`veil` arm: the world frosts"), E-M7's `"every"` branch and E-M8's `true` branch still describe deleted bytes (P-E7 §7 gap 6). M-24 also promises consumers that a promoted slider "stays inside the scroller or card it sits in, as it does at rest", which item 2 shows false on a feathered, rounded or scaled card.

## 1 · Gates and builds

| what | result | log |
|---|---|---|
| candidate harness build `ce7` | exit 0 · 55 directories · scene app `9e68012e9522` | `logs/build-ce7.log` |
| 9 plant builds | exit 0 each; after every revert the tree hash read back as the candidate's (`e3a14518b835`) | `logs/builds.log`, `logs/build-plant-*.log` |
| CK-23 numstat (`git apply --numstat` outside the repo) | **P-E7: 198 files +5180/−1598, src 153 +3243/−1318**; P-A7: 187 +3497/−1366, src 146 +2398/−1157. Both seats' figures reproduce to the line | (command in §6) |
| deletion, static (`E7/static.sh` re-run) | candidate 0/0/0/0/0 DELETED; pass-6 patch 17/6/12/4/6 PRESENT | `logs/static-deletion.txt` |
| deletion, in source | `grep -rnE "STAGE_VEIL\|POINTER_STAGE\|flingStage\|stageVeil\|setVeil\|\"every\"" src`: no hit | — |

I did not re-run vitest, typecheck or `demo:dist:build`: both seats ran them green, and this seat's budget went to replaying the browser cells. That is stated, not scored.

## 2 · Battery of record on the candidate, both engines

Chromium ran stage by stage, one `guarded` call each (18:09-20:02). WebKit ran in the one acquisition (20:22-21:12).

| witness | Chromium P/F/U · load at start | WebKit P/F/U · load at start | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 30.5 | 93/3/0 · 56.0 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (the SwiftShader `css` substrate); WebKit 1.80 levels against 1.26 at rest (not ≥ 2×, D3) and PRM 0.00 (A's reduce leg, gated on D3's lane) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 30.4 | **164/0/0** · 58.3 | — |
| E-3 | **22/0/0** · 28.0 | **22/0/0** · 56.2 | — |
| E-4 | 17/1/0 · 34.2 | 13/2/4 · 46.1 | the tabs fling at both loads; WebKit slider 3/5 (reads 0.28 and 0.00 px); 4 Carousel cells are the engine fact. §3 CK-05 |
| E-4 `sheet --repeat 10 --repeat-gaps 16,40` | 4/0/0 · 34.1 | 4/0/0 · 51.5 | — |
| E-5 | **56/0/0** · 30.6 | **56/0/0** · 55.7 | — |
| E-6 | 4/2/8 | 2/2/8 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 | 6/1/0 | `data-held` in `GlassDock.vue` (D2's named clause) |
| E-8 | **19/0/0** | **19/0/0** | — |
| E-9 | **85/0/0** · 35.8 | **85/0/0** · 43.9 | — |
| E-9 `--prm-plant` | 40/32 · `PLANT reach` 14 faces fail (tabs included), NOT REACHED 0 | 40/32, the same 14 | H7's plant, red as it must be |
| E-10 | **45/0/0** · 34.7 | **45/0/0** · 45.4 | — |
| E-11 | 7/0/1 · 32.7 | 7/0/1 | UNMEASURED: `--scale-commit-pop` is not read on the Switch path |
| E-12 | **102/0/0** · 35.9 | **101/0/1** · 35.9 | WebKit `rest layouts`: the engine fact |
| CAP | 18/0 | 18/0 | sheets `glance/ce7-{chromium,webkit}-{fine,coarse}.png` |
| `e7-probe` (carry, loupe ×4, cliptouch) | **6/0** · 31.7 | **6/0** · 36.1 | — |
| `ca6-probe idle` | REPORT: rest 0; engaged idle 128.3 rAF and RO callbacks/s, off-screen 129.3/s; **0.0 layouts/s, 0.0 style recalcs/s**; after Escape 0 | REPORT: rest 0; engaged 98.0/s on- and off-screen; after Escape 0 | the cost P-E7 stated, reproduced (§P6-7 item 11) |
| `ce7-probe` (mine) | 4 FAIL (radius, mask, scale place, one film) of 8 gating · 31.6 | 3 FAIL (radius, mask, scale place) of 8 · 32.8 | §3 CK-20 |

### Plants, each read in both engines

| plant | row | witness | Chromium | WebKit |
|---|---|---|---|---|
| `clip6` (the pass-6 construction) | CK-20 | E-10 clip-vanish | **FAIL**, step 3976 px² | **FAIL**, step 3589 px² |
| `clip6` | CK-20 | my film (re-read, §3) | **727-866 px² unclipped frames, 3/3** | **734-920 px², 3/3** |
| `clipOnly` (mine: the clip removed, `position-visibility: always` kept) | CK-20, CK-27 | E-10 · `e7-probe cliptouch` | E-10 **PASS 13/13** · cliptouch **FAIL** 3518…3772 px² outside the card | E-10 **PASS** · cliptouch **FAIL** |
| `pvOnly` (mine: `position-visibility: always` removed, the clip kept) | CK-20, P-1 | E-10 · cliptouch | **PASS · PASS** | **PASS · PASS** |
| `fling6` | CK-05 | `e7-probe carry` | 4.23-6.75 px at 477-962 px/s: passes the 4 px bound; the ratio is read by comparison | **FAIL** (3.87 px at 494 px/s); 6.24-7.00 px at 833-1081 px/s |
| `loupe6` | CK-25 | `e7-probe loupe` | **FAIL 4/4** (seam 33.5-45.2, line 46.7-52.0 levels) | **FAIL 4/4** |
| `chipmute` | CK-27, CK-25 | E-12 `preset chip answers` | **FAIL** light and dark, NO ANSWER | **FAIL** light and dark |
| `prmY` | P-1, CK-02, CK-10 | E-9 | **28 FAIL** (switch 0.0600 excursion, 50 frames in flight) | **28 FAIL** |
| `crest` | CK-12, CK-25 | `a7-glance` button committed | **FAIL 4/4**, ×1.0196-1.0206 | **FAIL 4/4**, ×1.0167-1.0206 |
| `thumb` | CK-25 | `a7-glance` coarse dark press | **FAIL**, 0.0774 against 0.0782 | **FAIL**, 0.0763 against 0.0773 |

`a7-glance` was run on my frames against C-E6's pass-6 frames as the reference (`logs/glance-*.txt`): candidate 12/0.

## 3 · Per row (E's part first)

### CK-20 · OPEN, with four counterexamples

**What holds, both engines.** E-10 45/0: the hand-off drop is 0.0085 against 0.0070 + 0.002 (Chromium) and 0.0102 against 0.0099 + 0.002 (WebKit). Escape is 0.0070 and 0.0099. The pointer in the scroller passes 6/6 in both. Clip-vanish on the keyboard and on touch reads 0 px² on every step. A translated scroller keeps its place (0.0 px). The reduction under `translate` matters because a Sheet carries its content that way.

**Counterexample 1: the library's feather (`.fading-scroll`).** `ce7-probe` puts `fading-scroll fading-scroll--y[data-fade-start][data-fade-end]` on the scroller (`--fade-start` reads 16px) and places the control 4 px inside the top edge. It then reads the control's visibility in the box's top 28 px (Σ|luma − the empty feathered box|) promoted and released after Escape; focus is kept, so the focus ring is in both:
- Chromium: in flow 172021, promoted 250508 = **×1.46**; feather off: ×1.05 (237546 → 250508). Bound ×1.32. **FAIL**.
- WebKit: in flow 166849, promoted 231379 = **×1.39**; feather off ×1.00. Bound ×1.25. **FAIL**.

The frames show it directly: in flow the control's top edge dissolves into the feather, and promoted the whole outline is crisp over it. Since the promotion is a `showPopover()`, the change is also a one-frame step at engagement and at the landing (D-1).

**Counterexample 2: a rounded scroller.** At `border-radius: 40px` with the row unpadded and the control 6 px past the top edge, the corner regions outside the rounded padding box differ from the released still on **221 px² (Chromium) and 201 px² (WebKit)** of 562 read. The bound is 16 px², since the 1.5 px antialias band is excluded. `writeClip` writes `inset(6.23px 11.26px -97.55px)` with no `round`. Every glass card is rounded.

**Counterexample 3: a scaled ancestor.** Under `scale: 0.8` (origin top left) on the scroller, keyboard promotion moves the control's centre **52.2 px (Chromium) and 28.7 px (WebKit)** in the frame it promotes, and paints it at **×0.848** of its in-flow width. Under `translate: 0 30px` and with no transform: 0.0 px and ×1.060. The pin (`left/top: anchor()`, `anchor-size()`) and `clipBox` (`box.left + el.clientLeft` mixed with the unscaled `clientWidth`) both read untransformed layout boxes. The bound is ≤ 2 px. A library Dialog scales its plate on entrance, and a consumer card with a scale has the same effect.

**Counterexample 4: the clip lags a scroll in Chromium.** `ce7-probe film` records the page (Playwright `recordVideo`, 700×500, 1:1). The control is keyboard-engaged 30 px inside the box, then twelve 8 px wheel ticks run over the box's own area, then a smooth `scrollBy(90)`. The same drives are filmed after Escape as the control. `film-reread.py` decodes the 24 px strip above the box against the per-pixel median of the page frames (the first frame is blank in WebKit's video, which made the in-probe first-frame reference read 9600 px² everywhere there; `logs/film-reread.txt` supersedes those in-probe WebKit lines).
- Chromium candidate: **one frame of 730 px²** (frame 46, during the wheel ticks) in the record run's 2nd of 3 engaged films. The earlier Chromium runs of the same probe read 734, 405-735 (3/3) and 203 px² at the same point. That is more than 400 px² in 5 of 9 engaged films over four runs (203 px² in a sixth) at loads 29-37; released films 0 of 9 (≤ 42 px²). `clip6` reads 731-866 px² at the same frames, so the candidate's frame is the unclipped control. Frame `glance/clip/ce7-chromium-film-worst-*.png`.
- WebKit candidate: ≤ 40 px² in 3/3 engaged and released films; `clip6` 734-920 px².

The clip is written in the resize step of the main-thread frame, while Chromium's wheel scroll moves the scroller (and the anchored control with it) ahead of that write. P-E7 §7 gap 5 named this unread ("no film read the clip edge during a scroll").

**Gate notes (not counted as counterexamples):**
- `clipOnly` passes E-10 13/13 in both engines. H7's keyboard clip-vanish cell gates only the step clause, so the keyboard path's "never paints outside" clause has no gating cell. Only P-E7's touch probe cell catches it (P-E7 §7 gap 4).
- `pvOnly` passes every cell in both engines. `position-visibility: always` is a second declaration that no reading distinguishes: the clip has hidden the whole control before the UA would drop it (§6, a P-1 class).

### CK-05 · OPEN (one WebKit cell unread by me)

| surface | Chromium | WebKit |
|---|---|---|
| slider, velocity printed (`e7-probe carry`, 10 reads) | min 6.32 · q1 7.43 · median 8.37 · q3 10.84 · max 11.27 px at 435-889 px/s · PASS (31.7) | min 7.21 · q1 10.09 · median 10.78 · q3 11.48 · max 12.16 px at 476-1013 px/s · PASS (36.1) |
| the halving's cause (`fling6` at matched velocity) | candidate 10.74-11.27 px at 828-889 px/s vs `fling6` 6.40-6.75 at 854-962 → about 0.6 | candidate 10.58-11.60 at 808-930 vs `fling6` 6.24-6.74 at 833-1026 → about 0.6 |
| slider E-4 (no velocity printed) | 5/5 at 6.32-10.64 (33.0); re-reads 5/5 (6.54-11.99) and 4/5 (one 0.00, load 34.7) | 3/5 (0.28, 0.00 at 46.5) |
| tabs drag E-4 | FAIL at 34.6 (still carried 29.76 px); **re-reads PASS 2/2** (28.53, 28.55 px; still 1.2 px) at 36-40: NOT-REPRODUCED | FAIL at 44.9 (still carried 31.73 px); **not re-read** |
| Sheet repeat landing | PASS ×2: ordered by velocity (≤ 886 px/s → −160, 922 → −35); every 0 px/s run lands −285 | PASS ×2 (941, 909, 930 px/s → −35; 476-800 → −160) |
| sortable, Carousel | PASS | sortable PASS; Carousel the engine fact |

Reading:
- Each E-4 slider failure is a 0.00-0.28 px read, which `e7-probe` shows is a fling the event clock measured at 0 px/s (P-E7 §3).
- Each tabs failure has a still release that carried as far as the fling, so the still drive moved under load.
- The Chromium tabs cell is NOT-REPRODUCED 2/2. The WebKit tabs cell is a load-only failure that I could not re-read twice inside one acquisition, and E-4's slider cell prints no velocity. So the row is not closed by my read in WebKit.
- The halving's cause is read and its cure reproduces in both engines. F-5 can be asked on these figures.

### CK-25 · OPEN (the gestalt, from my frames)

- **The loupe** (`glance/loupe/ce7-{chromium,webkit}-{fine,coarse}-{light,dark}-loupe-sustained.png`). The 2 px mark is gone, the band dissolves at both window ends, and the band is ×1.600 = k max. No lighting layer and no blur change, so it honours O-87. It now reads as a window onto a magnified strip, not a split pill. But the fill still ends in its own round pill cap at the window's centre, and that cap reads as a knob. The housing has no lens edge, so the read is "a pill seen in a pill" rather than a lens. In dark the housing is a near-black slab with a dim amber run. **Better than pass 6, not yet a lens.**
- **The promoted control over a feathered or rounded card** (`glance/clip/ce7-chromium-mask-on-promoted.png` against `…-released.png`; `…radius-engaged.png`). In the Configurator's own column it pops crisp over the feather and over the corners. This is the clearest below-grade frame in the set.
- **The ambient exemplar is static** across all six columns (`glance/ce7-chromium-fine.png`; D3's amplitude).
- **A's items read** in the pairs (`glance/ce7-chromium-ck25-pairs.png`). The committed Button is visibly the larger, ×1.060 against rest. The dark coarse Switch press lightens the thumb, faint but present (ΔL 0.087). The Switch commit, the disclosure ladder and the sortable lift read well.
- **Faint, but in the library's hover rung:** the preset chip's hover paints `background-image` with 0.0 % of its pixels moving ≥ 16 levels in both engines. The press is legible (46.5-48.0 %).
- **The dark Button's warm halo** is HEAD's (the 10.2.0 token wave), not D5's.

### CK-22 · OPEN

- **Reproduced.** I re-ran A7's and E7's grep scripts at HEAD (`logs/ck22-greps-{A,E}.txt`, sibling HEADs printed): slides 54, fourier-analysis 22, value.js 3 material-class lines, `M1c` (an `:active` on a material class) 0 in source (sci-report's 1 is `dist-ob11` build output, as P-A7 noted). `usePressMark` is exported on `/motion-core`. The Aurora's one-writer handoff holds for both consumers: keyframes.js's Aurora root is `pointer-events-none fixed inset-0` (`HeroAurora.vue:27`), so the root leg never fires there.
- **Counterexample (a): E's stale rows.** The plan asked that stale rows be retired (P-A5 row 4 and P-A4 M-9 were, by A). E's own stale rows were not:
  - P-E2 §4 row 1: "This covers the hand, Tab, and an acting key … It escapes ancestor clipping, stacking and `overflow`."
  - P-E2 §4 row 2: "**`veil` arm:** the world frosts."
  - E-M7: the `"every"` text.
  - E-M8: the `true` branch.

  M-23 and M-24 add the new rows but retire none of these (P-E7 §7 gap 6).
- **Counterexample (b): M-24 promises more than the bytes hold.** It says a promoted slider "stays inside the scroller or card it sits in, as it does at rest". §3 CK-20 shows it does not inside a `FadingScroll`, a rounded card or a scaled ancestor. The Configurator-in-fourier path is a live consumer of the first.

### The other rows

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| 01 | latch 54/55; ambient UNMEASURED (engine limit) | latch 54/55; ambient 1.80 vs 1.26, PRM 0.00 | **OPEN** ◇ D2 (`dock`), ◇ D3 (amplitude; the lean's own lane before A's reduce write) |
| 02 | E-2 164/0; E-9 21 commit-instant pass | same | **CLOSED** |
| 03 | E-2's mount and arrival cells pass | same | **CLOSED** |
| 04 | E-3 22/0 | 22/0 | **CLOSED** |
| 06 | E-5 56/0 | 56/0 | **CLOSED** |
| 07 | S6 RETIRED (O-103d (2)); `s6 present` reads 0, as ruled | same | **CLOSED** |
| 08 | E-7: only `GlassDock.vue`'s `data-held` (D2's named clause) | same | **CLOSED** |
| 09 | E-8 19/0 | 19/0 | **CLOSED** |
| 10 | E-9 85/0; `prmY` 28 FAIL | same | **CLOSED** |
| 11 | E-12 102/0; select press driven, closed → closed, ×1.0000 | 101/0/1 (engine fact) | **CLOSED** |
| 12 | crest plant 4/4 FAIL; candidate committed ×1.0600-1.0606 | 4/4 FAIL; ×1.0512-1.0606 | **CLOSED.** In source both crests are rows with design reasons: `--scale-commit-pop: calc(2 - var(--scale-press))`, the press mirrored, and `--scale-engage` for a command and the 20 px bit (`scale-paper.css:35-46`, `engage.css:241-244`). P-A7 §6 item 3's clause cites the 0.8 px legible floor that `control-bit.css` states as the library's own design statement. The witness adopted that floor; it is not the witness's sampler. I read the clause as admissible. The owner may still rule otherwise (§P6-6). No new literal is minted in E7's diff (`FAR = 1e5` is an infinity sentinel) |
| 13 | E-12 forced-colours and slop cells pass | pass; PRT the engine's limit | **CLOSED** |
| 14 | E-3, E-12 coarse cells pass | same | **CLOSED** |
| 15 | E-10 one engaged root through every hand-off | same | **CLOSED** |
| 16 | E-12 rest 0 layouts/s; idle loop 128/s stated | engine fact; 98/s | **CLOSED** (by its letter; the idle cost is §P6-7 item 11's) |
| 17 | — | — | **OPEN** ◇ D2 (the dock's `:active` presses) |
| 18 | `RELEASE_RULE` read by `release.ts`/`useEngage.ts`, `sortable-list/drag.ts`, `sheet/detents/use.ts`, `morph/useDragMorph.ts`; velocity-ordered landings | same | **CLOSED** |
| 19 | ambient UNMEASURED | 1.80 vs 1.26 | **OPEN** ◇ D3 |
| 21 | E-11 7/0/1 | 7/0/1 | **CLOSED** (the crest token's loud read is a unit cell; no browser path reads it, E-11's one UNMEASURED) |
| 23 | 198 +5180/−1598 reproduced; deletion DELETED | — | **CLOSED** |
| 24 | E-1 `static` cells pass | pass | **CLOSED** |
| 26 | no lighting layer: E7's paint change is a `mask-image` and a deletion; no veil element; no blur token touched | same | **CLOSED** |
| 27 | every A7 and E7 plant red in both engines (`fling6` by ratio in Chromium); the chip answers through `engage-chosen`; the tabs face reached by the PRM plant | same | **CLOSED.** Not counted against the row: `clipOnly` passing E-10 and `pvOnly` passing everything (§6 items 2-3) |

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 4 · Score

| | rows |
|---|---|
| **closed (20)** | CK-02, 03, 04, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 18, 21, 23, 24, 26, 27 |
| **open, D5 can build (4)** | **CK-20** (feather, radius, scale, the Chromium scroll lag); **CK-22** (E's stale rows; M-24's claim); **CK-25** (the loupe's knob cap; the promoted control over its card); **CK-05** (one WebKit tabs cell unread, load-only) |
| **open, held elsewhere (3)** | CK-01 (D2 `dock` latch; D3 lane + A's reduce write), CK-17 (D2), CK-19 (D3). What closes each: D2's adoption or a dock scene with D2's leave and its presses' listener; D3's amplitude and a lean lane separate from the swirl |

**20/27 = 74 %. Not a clean pass; the clean-pass count stays 0.** Not the fixed point: CK-20, 22 and 25 hold counterexamples that D5 can remove by building.

## 5 · What would close the buildable rows (for the agglomeration, not a spec)

- **CK-20.** The promoted control must take every clip its place takes, not only overflow rectangles, and keep its place under any ancestor transform. Either the clip is read from the painted world (rounded radii as `inset(… round …)`, masks carried, transformed boxes mapped), or the construction stops leaving the clip when a clipping, masking or transformed ancestor exists (grow in place there, as the fine pointer does). The Chromium scroll lag needs the clip to move with the scroller rather than after it.
- **CK-22.** Retire P-E2 rows 1-2, E-M7's `"every"` text and E-M8's `true` branch by name, and state M-24 as the bytes hold.
- **CK-25.** The loupe's centre should not read as a knob. The promoted control over a feathered or rounded card is CK-20's cure.
- **CK-05.** A WebKit re-read of the tabs fling twice, at whatever load; E-4's slider cell printing velocity (H8).

## 6 · Next-pass defect classes (recorded; no row added; the score does not change)

1. **A construction that reads only one kind of clip.** `clipBox` reads `overflow` and paint containment. Radius, mask, `clip-path` and transforms are the library's own clips (`FadingScroll`, every rounded card, a Dialog's entrance). Scored here under CK-20; the class is "a promotion that leaves the world's paint rules".
2. **A row clause with no gating cell.** The keyboard path's "never paints outside" clause is caught by no E-10 cell: `clipOnly` passes E-10 13/13 in both engines. → H8: make the touch probe's two-bound cell an E-10 cell, on keyboard and touch.
3. **A declaration no reading distinguishes.** `position-visibility: always` (`engage-stage.css:51`): `pvOnly` passes every cell in both engines. It is either the second mechanism of one guarantee (P-1, as §P6-7 item 5) or it needs a cell that shows the path it serves. → E's part.
4. **A registration whose reason is deleted.** `@property --veil-x/--veil-y` (`tokens/property-regs.css`, HEAD's) is registered "so a veil following a moving control would not step". The only writer (`Slider.vue`'s `writeVeilCentre`) is deleted, and the one reader left (the Dialog overlay) sits at 50 %. → E's part (E-1/P-1 residue of the deletion).
5. **A film reference that is not the page.** WebKit's recorded video opens on blank frames. A first-frame reference reads every later frame as changed. Cured in `film-reread.py` (median of page frames). → anyone filming via `recordVideo`.
6. **Load-only fails that need a second WebKit acquisition to re-read.** The one-acquisition budget and the "re-run twice" law collide when a WebKit cell fails under load late in the chain. → process: queue the re-read stages inside the acquisition when a Chromium cell of the same witness failed under load.
7. **The hover rung's legibility.** The preset chip's hover answers a property change with 0.0 % of pixels moving ≥ 16 levels. It is the library's `--fill-hover`, so this is the 10.2.0 token wave's question, not D5's.

## 7 · Process

- **Machine law.**
  - Every build and browser run went through `~/.claude/guard/guarded`, never `--light` for a browser. WebKit ran only under `--exclusive webkit`, in one acquisition. One heavy run at a time: the battery was one serial chain, and the Chromium tabs re-reads ran after the acquisition was released.
  - One browser per run with a context per cell (the harness's Engine; my film opens its own contexts on the same browser and closes each).
  - No GPU arguments. ffmpeg decoded the videos after the browser run.
  - The kernel zone never gated a run. Guarded waited for headroom repeatedly (loads 36-58).
- **Fences.**
  - No edit to tracked source in the checkout. No git write in the checkout beyond `git worktree add`/`remove`. The worktree was `.claude/worktrees/bl/D5/p7/C-E7/wt` with `node_modules` symlinked.
  - The P-A7 containment check ran on a `git archive` tree in the session scratchpad, since removed.
  - Checkout writes are only `pass-7/C-E7.md` and `pass-7/C-E7/`. Siblings were read by grep only.
  - Nothing under `~/.claude` was read; one tool result was saved there by the harness and not opened.
- **Slips, mine.**
  - `ce7-probe` went through four Chromium smoke runs before the battery: the feather cell first lacked the `data-fade-*` attributes (NOT DRIVEN), its first metric confounded the keyboard focus ring, the scale cell's bottom-edge drive had a sign error, and the first film bound was the strip's area alone. Those runs are superseded by the battery of record (`logs/ce7probe-ce7-chromium.log` at 18:09-18:12). Their film figures are cited above only as repeat counts.
  - The in-probe WebKit film lines use a first-frame reference that is wrong for WebKit (§6 item 5). `logs/film-reread.txt` is the read of record for every film.
  - Several of my `until` wait loops were killed by the shell (exit 143/144). The battery itself ran to its end (`logs/all.log`, "all done 21:12:25").
- **Cleanup.** `git worktree remove --force` on my worktree, its `.claude/worktrees/bl/D5/p7/C-E7/` parent removed, the scratch tree removed, no process left running.
