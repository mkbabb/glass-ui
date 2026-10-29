# D5 · pass 8 · C-E8: the fresh adversarial critic of the candidate A+E (P-E8), with the `inplace-loupe` probe read beside it

| field | value |
|---|---|
| seat | C-E8, critic of D5 pass 8 (`§P7-8.3` wave 3). I authored no D5 seat in passes 2-8 and was not a critic in passes 3-7 |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | `master` at `a94880c90` at seat start; HEAD moved to `10f5a67e5` during the seat (docs only: `git diff --stat a94880c90 HEAD -- src tests` is empty). `release/10.1.x` not in it, so F5‴ carries |
| rulings | INBOUND re-read at start (mtime 2026-10-29 11:46, last row O-112, W-G's); FORMATION-PROGRESS read to "D5 p8 H8 banked" and the 10.1.3 fix-7 line. Nothing binds D5 after O-103d. Q-1 (c), Q-4 (b) defaults; F-5 on (a) |
| candidate | HEAD + `pass-8/P-E8.patch`, sha1 `5dc4d9308191275113ffff375f886a91b441b45b` (matches P-E8 §1). Also checked: `P-E8-inplace-loupe.patch` `fdccd7f4…`, `E8/probe-loop-variant.patch` `a6060049…`, `pass-7/P-A7.patch` `e6e42ba3…`, `pass-7/P-E7.patch` `a6c82db1…`, all as P-E8 §1 states |
| builds | in my worktree `.claude/worktrees/bl/D5/p8/C-E8/wt` (removed at return): `cand8`, `probe` (cand8 + the probe patch), `plant-cand7` (HEAD + P-E7.patch, the pass-7 construction). The `src` diff hash read back as cand8's (`92f38f424df2`) after each revert (`C-E8/logs/builds.log`). The harness's own app (`scenes/App.vue` `310d45686fce`), harness `fb6f3cda` unedited |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU arguments. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; Safari cells are read against my guarded WebKit run below (O-103d (3)) |
| runs | Chromium: one `guarded` call per stage, 12:09-13:12 (`C-E8/logs/chain-chromium.log`), load 6.7-36.7. WebKit acquisition 1: `guarded --exclusive webkit --timeout 90`, queued 13:12:56, admitted 13:12:57, released 14:19:03, exit 0, every stage ran (`C-E8/logs/chain-webkit-w1.log`), load 5.5-34.8. WebKit acquisition 2: only the E-10 film re-read, which the machine law requires before a load-only fail is called (§3 CK-20; `C-E8/logs/chain-webkit-w2.log`) |
| my own cells | `C-E8/probe/ce8-probe.mjs` on the harness's lib (the header defines every cell): `anc` (the invariant, two-sided, on six ancestor kinds), `trail` (whether the promoted body moves in the frame its place moves), `loupe place` (the lens over its track under an ancestor transform), `loupe viewport` (the lens at the root scroller's top edge) |
| records | `C-E8/`: `builds.sh`, `stages.sh`, `chain-chromium.sh`, `chain-webkit.sh`, `wk-reread.sh`, `ck22-greps.sh`, `probe/`, `logs/` (every stage log opens and closes with the 1/5/15-min load; every cell line carries its load), `json/`, `glance/` |

## 0 · In brief

**Score on the candidate: 21 of 27 closed** (CK-02..16, 18, 21, 23, 24, 26, 27). **Open: CK-01, 17, 19** (held by D2 and D3, as pass 7 left them) **and CK-20, 22, 25**, each with a counterexample I reproduced in both engines unless marked. **Verdict ADVANCE, not clean.**

1. **P-E8 meets every cell H8 wrote, in both engines, and the pass-7 construction fails them.** I reproduce: E-10 58/0/0 Chromium (load 12.6) and 57/1/0 WebKit (the one fail is §3 CK-20's film, re-read below); `plant-cand7` E-10 clip cells 7 of 14 red in Chromium, 6 of 14 in WebKit; E-13 8/0 both engines, `plant-cand7` 4/4 red per engine (edge 3 and 5 of 81 rows, mid 48 of 81); `e8-probe tip` spread 0.00 px 4/4 both engines against the pass-7 cap's 3.60-3.87 px.
2. **The invariant does not hold on ancestor kinds H8 did not build.** The stage reproduces its place's paint by enumerating kinds (overflow box, radius, mask, scale, translate), so every kind it does not enumerate escapes. On the same card, keyboard and touch, ratio of ratios (an in-place body reads 1; the probe reads 0.99-1.03 on the same cells):
   - the card at `opacity: 0.5`: **×1.96 Chromium, ×1.98 WebKit** (the promoted body paints at full strength in a half-faded card);
   - the card with `clip-path: inset(0 45% 0 0)`: **×1.41 / ×1.16 Chromium, ×1.40 / ×1.15 WebKit** (the body paints across the clipped half);
   - the card at `rotate: 3deg`, keyboard: **×1.88 Chromium, ×2.16 WebKit** (the body paints unrotated and about twice its height: `paintedScale` reads a rotated footprint's bounding box as a scale);
   - the card with `filter: invert(1)`: ×0.23 / ×0.12 Chromium, ×0.22 / ×0.11 WebKit.
   The invariant names "every clip ... and transform", so `clip-path` and `rotate` are inside its own text. P-E8 §8 gap 2 named these kinds as not carried and unread; they now have a cell, and it is red.
3. **The body trails its place by a frame on a wheel scroll in Chromium.** With the spacer above the control painted red, a film reads the distance from the spacer's end to the control's top per frame. Released, it holds within 0 px on every film. Promoted (keyboard): **4 px off its median in 1-2 frames of 5 of 6 films** (wheel away from the control 3/3, wheel over the control 2/3). The rAF-driven scroll reads 0 px. H8's film cell cannot see this, because it reads the strip above the scroller and the clip moves with the body. The probe (in place) reads 0 px on every drive. WebKit's 25 fps film reads 0 px and is not a one-frame witness (H8 §5).
4. **WebKit, keyboard, feathered card: the promoted body loses its rim.** My two-sided feather cell over the whole card reads **×0.566** (Chromium ×1.018; the probe ×0.986 in WebKit), reproducing P-E8's ×0.58. The frame (`glance/ce8/ce8-feather-keyboard-sheet.png`, top row) shows why: the engaged track's border and shadow are gone, and its pill ends are cut flat. H8's feather bound is upper-only (≤ 1.10), so an under-paint passes it.
5. **The loupe regressed under a scaled ancestor, and it is cut at the viewport's top.** Under a card at `scale: 0.8`, the lens no longer carries the ancestor's scale. It magnifies the painted track **×2.000, not k max ×1.600, in both engines and both pointers**. In Chromium, the fine-pointer lens also floats **39.4 px above its track**. The pass-7 construction reads ×1.600 and 0.0 px on the same 6 cells per engine. At the root scroller's top edge (the card at the viewport's top, the rest box 4 px below the card's edge), **90-92 % of the lens lies above the viewport, unpainted**, in both engines and pointers. That holds in all three builds: there is no `position-try` fallback.
6. **CK-22**: the one consolidated table exists, retires every row §P7-8.1 named, and its consumer counts reproduce at this HEAD. But C-2 ("keeps the look of its place: a scroller or card that clips, rounds, fades or scales it") and C-9 ("paints whole above any scroller or card") overclaim against findings 2, 4 and 5, the same form as pass 7's M-24. Also, P-E8's grep script prints its `--veil-x/y` and `--held-scale` counts as 0 whatever the tree holds (§3 CK-22).
7. **The probe** (`inplace-loupe`, not scored) meets the invariant on every ancestor kind I built, in both engines, by construction. Its cost is the 16 stale-place cells (E-10 42/16 per engine) and an idle loop of 0/s against the candidate's 120 (Chromium) and 98 (WebKit). Its loupe is the candidate's and carries finding 5 unchanged (§5).

## 1 · The battery on the candidate, both engines

| witness | Chromium P/F/U · load at start | WebKit P/F/U · load at start | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 17.8 | 93/3/0 · 8.3 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (the `css` substrate, engine limit); WebKit 1.71 levels against 1.28 at rest, not ≥ 2× (D3), and the reduce leg 0.00 (A's, gated on D3's lane) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 19.4 | **164/0/0** · 6.5 | — |
| E-3 | **22/0/0** · 17.6 | **22/0/0** · 8.4 | — |
| E-4 | **18/0/0** · 18.9 | 15/0/4 · 11.9 | WebKit's 4: the Carousel's engine fact (no touch scrolling). Velocity in §3 CK-05 |
| E-5 | **56/0/0** · 16.3 | **56/0/0** · 8.2 | — |
| E-6 | 4/2/8 · 27.9 | 2/2/8 · 5.5 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 · 25.9 | 6/1/0 · 6.1 | `data-held` writers include `GlassDock.vue` (D2's named clause) |
| E-8 | **19/0/0** · 31.0 | **19/0/0** · 6.1 | — |
| E-9 | **85/0/0** · 26.1 | **85/0/0** · 7.6 | — |
| E-9 `--prm-plant` | 40/32 · 30.6 | 40/32 · 9.4 | the plant, red as it must be |
| E-10 | **58/0/0** · 12.6 | 57/1/0 · 24.2 | WebKit `clip film · wheel` 1 of 3 engaged films at load 16.8: NOT-REPRODUCED, 2 of 2 re-reads PASS (§3 CK-20) |
| E-11 | 11/0/5 · 33.3 | 11/0/5 · 7.9 | 5 UNMEASURED: tokens not read on that control's commit path (H8 §5), A's shape |
| E-12 | **102/0/0** · 35.2 | 101/0/1 · 7.7 | WebKit `rest layouts`: the engine fact. Chip answers 50.8 / 46.5 % (Chromium) and 50.9 / 47.0 % (WebKit) of pixels ≥ 4 levels |
| E-13 | **8/0/0** · 8.5 | **8/0/0** · 26.1 | k max ×1.600, tip 0.00 px, seam 0.0-0.1 levels |
| CAP | 18/0 · 27.8 | 18/0 · 9.2 | the glance set, §4 |
| `e8-probe tip` | 4/0 · 7.7 | 4/0 · 26.2 | spread 0.00 px |
| `ca6-probe idle` | REPORT: engaged idle **120.3** rAF and RO callbacks/s, off-screen 120.0, 0.0 layouts/s, 0.0 recalcs/s; 0 at rest and after Escape (12.4) | REPORT: 98.3 / 98.0 per s, 0 at rest and after Escape (11.4) | stated, not bounded |
| `ce8-probe` | 11/15 · 7.7 | 9/14 (+ trail REPORT) · 27.2 | §3 CK-20, CK-25 |
| plant `cand7`: E-10 clip / E-13 / tip | 7 of 14 FAIL / 4 of 8 FAIL / 4 of 4 FAIL | 6 of 14 FAIL / 4 of 8 FAIL / 4 of 4 FAIL | the pass-7 construction, red where §P7-8.1 requires |

No cell failed in Chromium under load that a re-read needed. Loads ran up to 36.7 there (other seats); every cell line carries its own load.

## 2 · Score, CK-01..CK-27 (the candidate only)

A row closes only on my own replay in both engines. Real Safari is UNMEASURED on every row.

| CK | status | evidence (mine) |
|---|---|---|
| 01 | **OPEN** (D2, D3) | `dock` latch 54/55 both engines (D2's adoption or a dock scene with its leave closes it); ambient WebKit 1.71 against 1.28, not ≥ 2× (D3's amplitude); the reduce leg 0.00 (D3's lean lane, then A's write) |
| 02 | CLOSED | E-2 164/0 per engine |
| 03 | CLOSED | E-2's mount and async cells inside 164/0, per engine |
| 04 | CLOSED | E-3 22/0 per engine |
| 05 | CLOSED | E-4 with velocity printed: slider 5/5 per engine, Chromium 12.14-12.37 px at 1018-1054 px/s under load 18.9, WebKit 11.81-13.64 px at 1290-1429 px/s (load 11.9); sortable 24.62 px at 1102 px/s / 30.91 px at 1379 px/s; tabs 37.51 px at 1017 px/s; Sheet 250 px at 969 px/s. No `ZERO-CARRY FLING`, no UNGRADED read. F-5 on (a): the carry clears 4 px by ≥ 7.8 px |
| 06 | CLOSED | E-5 56/0 per engine |
| 07 | CLOSED | S6 RETIRED (O-103d (2)); E-6's `s6 present` reads its retirement |
| 08 | CLOSED | E-7 6/1 per engine; the one fail is `GlassDock.vue`'s `data-held`, D2's named clause |
| 09 | CLOSED | E-8 19/0 per engine |
| 10 | CLOSED | E-9 85/0 per engine; `--prm-plant` 32 FAIL per engine |
| 11 | CLOSED | E-12 102/0 Chromium, 101/0/1 WebKit |
| 12 | CLOSED | A's bytes unchanged (P-A7); E-11's crest cells loud on the paths that read them, 11/0/5 per engine |
| 13 | CLOSED | E-12's forced-colors and PRT cells inside 102/0 and 101/0/1 (WebKit PRT the engine's limit, as recorded) |
| 14 | CLOSED | E-12 coarse cells; E-3 phone cells; no hover latch |
| 15 | CLOSED | E-10 singleton fwd and rev, max 1 engaged (121-122 frames Chromium, 89 WebKit) |
| 16 | CLOSED by its letter | rest 0 rAF/RO/layouts; the engaged idle loop is 120 / 98 per s, stated, not bounded |
| 17 | **OPEN** (D2) | the dock's `:active` presses name no `touchstart` listener; every Safari cell UNMEASURED |
| 18 | CLOSED | E-4: slider, sortable, Sheet and tabs on the release rule, velocity printed |
| 19 | **OPEN** (D3) | the Aurora's pointer amplitude (WebKit 1.71 / 1.28) and the lean's own scalar |
| 20 | **OPEN** | §3 CK-20: ancestor `clip-path`, `rotate`, `opacity` and `filter` (both engines); the Chromium wheel trail (4 px, 5 of 6 films); the WebKit keyboard feather (×0.566, the rim lost) |
| 21 | CLOSED | E-11 11/0/5 per engine |
| 22 | **OPEN** | §3 CK-22: C-2 and C-9 overclaim against what the bytes paint |
| 23 | CLOSED | `git diff --numstat HEAD` with the new files counted: **198 files +5375/−1644, `src` 153 files +3380/−1355**, to the line as P-E8 §2. E8's own change and the probe's (3 files +59/−481) taken from P-E8's numstat files, consistent with the totals |
| 24 | CLOSED | E-1 runtime census, `static` stamped and read (93 pass per engine) |
| 25 | **OPEN** | §3 CK-25: the lens cut at the viewport's top, the lens over a scaled card, the promoted body over a faded, clipped or rotated card; ambient static (D3) |
| 26 | CLOSED | the loupe's paint changes are a deleted radius, the floating rung's hairline and a popover; no lighting layer; no blur token touched (read in the patch) |
| 27 | CLOSED, with a class | every H8 cell has a plant red in both engines (`plant-cand7`, `prm-plant`); but H8's feather bound is one-sided, so the WebKit under-paint passes it (§6 class 5), as `§P7-4` placed `clipOnly` and `chipfaint` |

## 3 · E's rows in detail

### CK-20 · the invariant on every ancestor kind I could build

**H8's family, reproduced.** Every value matches P-E8's to the figure:

| cell | Chromium | WebKit |
|---|---|---|
| clip-vanish, keyboard and touch | 0 px² on every step | the same |
| feather, ratio of ratios, keyboard / touch | 1.02 / 0.95 | **0.58** / 0.98 |
| radius | 0 / 0 px² | 0 / 0 |
| place, scale / translate / none | 0.0 px, ×1.060 | the same |
| film · wheel / smooth | 0 px² | 1 of 3 engaged wheel films FAIL at load 16.8, NOT-REPRODUCED 0 of 2 (below) / 0 px² |

The pass-7 plant is red on the feather, radius and scale cells (both engines) and on the wheel film (Chromium), as H8 found.

**WebKit film fail, acquisition 1** (load 16.8): one of three engaged films kept 37 of 65 frames, with 244, 244, 4,028 and 9,592 px² in its last four frames. The other two engaged films read 5 and 0 px². By the machine law this is a load-seen fail, re-read twice in acquisition 2: see the re-read note at the end of this section.

**What I added**, the `anc` cells, two-sided over the whole card. The probe build is the in-place reference on the same cells:

| card | mode | candidate Chromium | candidate WebKit | probe Chromium | probe WebKit |
|---|---|---|---|---|---|
| opacity 0.5 | keyboard / touch | **1.960 / 1.940** | **1.984 / 1.965** | 1.009 / 1.032 | 1.001 / 0.989 |
| clip-path inset(0 45% 0 0) | keyboard / touch | **1.406 / 1.162** | **1.400 / 1.150** | 1.003 / 1.024 | 1.010 / 0.980 |
| rotate 3deg | keyboard | **1.877** | **2.156** | 1.028 | 1.112 |
| filter invert(1) | keyboard / touch | **0.227 / 0.119** | **0.222 / 0.109** | 1.041 / 1.017 | 1.102 / 1.261 |
| the feather | keyboard / touch | 1.018 / 0.966 | **0.566** / 0.978 | 0.999 / 1.009 | 0.986 / 1.002 |
| any kind | fine (in place in both builds) | opacity 1.05, clip-path 1.04, feather 1.03, filter 1.04 | 0.99, 0.97, 1.00, *1.38* | the same reads | the same reads |

Two notes on this instrument:
- The `rotate` arm with a pointer (touch, fine) reads 0.79-0.81 on in-place bodies in Chromium. The pointer is aimed at the rotated thumb's bounding-box centre, so I read only the keyboard arm of `rotate` as a counterexample. The touch arm reads 1.566 / 1.987 on the candidate, against 0.790 / 1.074 on the probe.
- The `filter` arm reads 1.10-1.38 on in-place bodies in WebKit, so in WebKit it says only that the candidate is far from the probe (0.11-0.22 against 1.10-1.38).

The frames are the plainer witness: `glance/ce8/ce8-chromium-anc-sheet.png`, released then engaged, rows rotate (keyboard), clip-path (keyboard), opacity (touch).

**The trail** (`trail`, Chromium; my film, finding 3). Per film: frames read, the spacer moving in 4-5 of them, the distance's median 1 px.
- Engaged, wheel-away: worst 4 / 4 / 4 px off (frames 6, 6-7, ...).
- Engaged, wheel-over: worst 0 / 4 / 4 px.
- Engaged, raf: 0 / 0 / 0 px.
- Released: 0 px on every film of every drive.
- A dev run at load 11-14 (`logs/dev3-ce8-trail-chromium.log`) read the same: wheel-away 3 of 3 and wheel-over 3 of 3 at 4 px, raf 0. That is two runs below load 15, so this is no load-only read.
- The probe: 0 px on every film of every drive.
- In WebKit every film reads 0 px, but at 25 fps that is no one-frame witness.

The cause, read in `stage.ts`: place, clip and masks are written in the frame's resize step after a main-thread layout. A wheel scroll that Chromium runs (or animates) off the main thread moves the place first. Even the wheel over the control, which the stage's own non-passive listener turns into `scrollBy({behavior: "instant"})`, trails in 2 of 3 films.

**The WebKit feather** (finding 4): `glance/ce8/ce8-feather-keyboard-sheet.png`, top row WebKit released then engaged, bottom row Chromium. The engaged WebKit body loses the track's rim and shadow, and its ends are cut flat. The probe reads 0.986 there. P-E8 named `mask-clip: no-clip` as a hypothesis. The frame is consistent with the mask clipping to the border box, but I did not isolate the property.

**Ruling for the row: OPEN.** Two of the counterexamples are inside the invariant's own words ("every clip ... and transform": `clip-path`, `rotate`) and inside H8's family (the scroll film, the feather), in at least one engine each. The opacity and filter cards are inside "exactly what its place would paint".

**WebKit film re-read (acquisition 2):** queued 14:19:22, admitted about 15:47 (a wait of about 88 min, under the 90-min mark), two reads at load 7.9 and 29.6: **PASS and PASS**, 0 px² in every frame of all six engaged films. The acquisition-1 fail is **NOT-REPRODUCED (0 of 2)**, the class of the navigation's or the film's end, not the body. It does not count against CK-20.

### CK-25 · the loupe, the lens and the gestalt

| cell (mine) | candidate Chromium | candidate WebKit | pass-7 construction (both) | probe (both) |
|---|---|---|---|---|
| loupe place · none / translate, fine and coarse | PASS: lens centred 0.0 px, bottom 0.0 px, ×1.600 | PASS | PASS | PASS |
| loupe place · scale 0.8, fine | **FAIL: bottom 39.4 px above the track, band ×2.000** | **FAIL: ×2.000** (offset 0.0) | PASS ×1.600, 0.0 px | FAIL as the candidate |
| loupe place · scale 0.8, coarse | **FAIL: ×2.000** | **FAIL: ×2.000** | PASS ×1.600 | FAIL |
| loupe viewport (the root scroller's top edge), fine / coarse | **FAIL: 74.2 / 72.2 of 80.6 px above the viewport (92 / 90 %)** | **FAIL, the same** | FAIL, the same | FAIL, the same |

The scale cells are a regression from pass 7. The pass-7 lens was the host's child and scaled with it; the P-E8 lens is a top-layer popover that carries the host's grow (`--held-scale-*`) but not its ancestors' scale. In Chromium the anchor also places it against the track's untransformed box (frame `glance/ce8/ce8-chromium-loupe-scale-sheet.png`: top untransformed, bottom under `scale: 0.8`). The viewport cell has been red in every construction. The lens has no `position-try` and is hung `bottom: anchor(top)` with no fallback. The row asks the loupe to "paint whole at a scroller's top edge", and the viewport is the root scroller.

**Held in my replay, both engines:** E-13 `loupe whole` at the card's edge and mid-box, 81 of 81 rows, 4/4 per engine; E-13 `k max` ×1.600, tip 0.00 px; `e8-probe tip` spread 0.00 px (the pass-7 cap 3.60-3.87 px).

**The gestalt, from my frames** (`glance/cand8/cand8-{chromium,webkit}-{fine,coarse}.png`, `glance/loupe-sheet-chromium.png`, `glance/ce8/`):
- **The lens no longer reads as a knob.** The fill ends on a straight cut at the window's centre, a point on a ruler seen through glass. The band dissolves at both ends.
- **The housing's edge** is the floating rung's hairline. It reads in light as a fine grey edge and in dark as a faint ring on the near-black plate (the dark plate is the 10.2.0 token wave's).
- **The lens is a flat window, not a lens with refraction.** Under O-87 ("flatter, more refined, deft") I read this as admissible and better than pass 7.
- **The capture rows read as pass 7 left them:** the committed Button ×1.059, the dark coarse Switch, the accordion's pop and the sortable lift.
- **Below grade, from my frames:**
  - the promoted control over a rotated card (unrotated and about twice its height), over a clipped card (across the clip) and over a half-faded card (full strength): `glance/ce8/ce8-chromium-anc-sheet.png`;
  - the WebKit keyboard body under the feather, rim lost;
  - the lens over a scaled card (over-magnified, and in Chromium floating free of its track);
  - the lens cut away at the viewport's top;
  - the ambient exemplar static across the six columns (D3).

**Ruling for the row: OPEN.**

### CK-05 · velocity printed, under load

See §2. Chromium ran E-4 at load 18.9 and WebKit at 11.9. Every slider read printed its release velocity (1018-1429 px/s) and carried 11.81-13.64 px. No read was re-driven or ungraded. The Chromium phase reached load 36.7 on later stages, and no E-4 read fell in that window, so I have no high-load E-4 read to report.

### CK-22 · the consolidated MIGRATION table

- **Holds.** P-E8 §6 is one table, C-1..C-28. It retires by name P-E2 §4 rows 1, 2 and 4, E-M7's `"every"` clause, E-M8's `true` arm and M-24 as written, and restates M-20 on the `<Aurora>` mounts.
- **Counts reproduce.** My corrected greps (`C-E8/ck22-greps.sh` → `logs/ck22-greps.txt`, siblings read-only, at glass-ui `10f5a67e5`) match its counts:
  - `<Slider>`: atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier-analysis 5, sci-report 5;
  - `<NumberField>`: keyframes.js 1, speedtest 6, value.js 1, fourier-analysis 1;
  - `--veil-x/y`: atlas `useAuroraVeil.ts:116-117` (writes) and comments, no reader;
  - `<Aurora>` mounts: atlas `Aurora.vue:150` (from `Atmosphere.vue:137`), speedtest `App.vue:48`, keyframes.js `HeroAurora.vue:25`; sci-report a comment; value.js none;
  - `glass-loupe`, the stage attributes and the held/stage variables: 0 everywhere.
- **Counterexamples:**
  1. C-2's consumer text, "keeps the look of its place: a scroller or card that clips, rounds, fades or scales it at rest does the same while it is engaged", is false for a card with `opacity`, `clip-path`, `rotate` or `filter` (both engines), and for the feathered card on the WebKit keyboard path (§3 CK-20).
  2. C-9's "It paints whole above any scroller or card" and "The loupe floats over its slider wherever the slider sits" are false under a scaled card (×2.000; 39.4 px off in Chromium) and at the viewport's top (90-92 % unpainted).
  3. A record defect in P-E8's script: in `E8/ck22-greps.sh`, `n -- '--veil-[xy]' $r` passes `--` as the pattern and drops the repository path, so its summary line prints 0 for `VX` and `HS` whatever the tree holds. The table's figures came from its full-line section, which is correct, and my re-run agrees with them.
- No consumer source wraps a `<Slider>`/`<NumberField>` in an opacity, filter, clip-path or transform within 20 lines (grep, `logs/ck22-greps.txt` and the seat's transcript). So the overclaim is a promise to every consumer, not a break in a named one.

**Ruling for the row: OPEN.**

### CK-23 · cost

The candidate is 198 files, +5375/−1644; `src` 153 files, +3380/−1355, reproduced. The cost of the place-paint construction is P-E8's own figure, `src` +137 over pass 7. The probe would remove 422 lines of E's `src`.

## 4 · The owner-glance set

`capture.mjs` ran for the candidate, both engines, CAP 18/0 each: `glance/cand8/frames/`, sheets `glance/cand8/cand8-{chromium,webkit}-{fine,coarse}.png`. My probe frames are in `glance/ce8/{cand8,probe,cand7}/`, with the sheets `glance/ce8/ce8-chromium-anc-sheet.png`, `ce8-chromium-loupe-scale-sheet.png` and `ce8-feather-keyboard-sheet.png`. The loupe frames are in `glance/loupe/{cand8,plant-cand7,probe}/`, with the sheet `glance/loupe-sheet-chromium.png` (candidate light, candidate dark, the pass-7 cap). The gestalt read is §3 CK-25.

## 5 · The `inplace-loupe` probe, beside the candidate (for Q-3′; not scored)

| cell | probe Chromium | probe WebKit | candidate Chromium / WebKit |
|---|---|---|---|
| E-10 | 42/16/0 (the 16 stale-place cells: restale ×6, clipstale ×10, as P-E8 §7) | 42/16/0 | 58/0 / 57/1 |
| E-10 clip family (feather 0.99 / 1.00, radius, place, film) | all PASS | all PASS | all PASS, WebKit keyboard feather 0.58 |
| `anc`, the cards H8 did not build | opacity, clip-path, feather, rotate (keyboard) within 0.97-1.03 | the same within 0.98-1.11 (filter arm noisy, above) | FAIL on opacity, clip-path, rotate, filter |
| `trail` | 0 px every drive | 0 px | 4 px wheel-away 3/3, wheel-over 2/3 / 0 px (25 fps) |
| E-13 | 8/0 | 8/0 | 8/0 / 8/0 |
| E-3 | 22/0 | 22/0 | 22/0 / 22/0 |
| idle, engaged | **0.0/s** | **0.0/s** | 120 / 98 per s |
| loupe place · scale, loupe viewport | FAIL, as the candidate (same loupe) | FAIL | FAIL / FAIL |

**Read for the owner.** In my cells, the in-place body meets the invariant on every ancestor kind I could build, in both engines and with no script. It shares the candidate's loupe, so it shares finding 5. What it lacks is the 16 stale-place cells, where a re-render glides from a stale place. P-E8 §7.1 shows those turn green with the per-frame read kept (`probe-loop-variant.patch`); I did not re-run that variant. The candidate's construction has now met an ancestor-paint counterexample in six consecutive passes. On the kinds I added, the only construction that is not red is the one that does not leave its place.

## 6 · Next-pass defect classes (no row added)

| # | class | where read | row it serves | owner of the cure |
|---|---|---|---|---|
| 1 | **A paint copy that enumerates kinds**: the stage re-derives its place's paint for overflow, radius, mask, scale and translate, so `opacity`, `filter`, `clip-path`, a rotation (and any kind added later) escape | §3 CK-20 `anc` | CK-20, CK-25, CK-22 | E's part, or Q-3′ |
| 2 | **A scale read from a bounding box**: `paintedScale` divides a rotated footprint's bounding box by its layout box and writes that as `scale()` (the body about twice its height under 3°) | §3 CK-20, frame | CK-20 | E's part |
| 3 | **A lens that leaves its place without its place's transform**: the popover loupe carries the grow but not the ancestors' scale (×2.000), and Chromium's anchor reads the untransformed box (39.4 px) | §3 CK-25 | CK-25 | E's part |
| 4 | **A lens with no fallback at the root scroller's edge** (90-92 % above the viewport, every construction) | §3 CK-25 | CK-25 | E's part (a `position-try` that keeps the lens whole, read by a cell at the viewport's top) |
| 5 | **A one-sided bound on an "exactly" invariant**: H8's feather cell grades engaged/released ≤ 1.10 × the unfeathered ratio, so an under-paint (WebKit ×0.58, the rim lost) passes | §3 CK-20 | CK-20's witness, CK-27 | H9: the cell two-sided, with a plant that under-paints |
| 6 | **A film that cannot see a body trailing inside its clip**: H8's film reads the strip above the scroller, and the clip moves with the body | §3 CK-20 `trail` | CK-20's witness | H9: a place-to-content distance per film frame, as `trail` reads it |
| 7 | **A census line that cannot count**: P-E8's `ck22-greps.sh` summary passes `--` as the pattern for two columns | §3 CK-22 | CK-22 records | any census script: `grep -e` |
| 8 | **Process**: a WebKit fail seen under load in acquisition 1 needed a second acquisition to re-read, because the stage list was fixed at the lock's start (`§P7-7` item 6 recurs) | §7 | records | every seat |

## 7 · Process

- **Machine law.**
  - Every build and browser run went through `~/.claude/guard/guarded`, never `--light` for a browser run.
  - Chromium ran one stage per call; WebKit ran under `--exclusive webkit`.
  - One heavy run at a time.
  - One browser per run, with a context per cell (the harness's own; my probe follows the same lib).
  - No GPU arguments. No guard refusal; the kernel zone gated nothing.
- **WebKit acquisition 2** was taken only for the film re-read the machine law requires. Its stage list: `wk-reread.sh`, two E-10 film reads. Queued 14:19:22, admitted about 15:47 (the lock was held by other seats; the wait stayed under 90 min), released 15:48:34, exit 0; both re-reads PASS (`logs/chain-webkit-w2.log`, `logs/reread{1,2}-cand8-webkit-E-10-film.log`).
- **Dev runs, superseded and kept:** `logs/dev-ce8-trail-loupe-chromium.log` (first trail instrument: ffmpeg's crop width 1 was refused); `dev2-*` (the control scrolled out of the card; root top undetected); `dev3-*` (the instrument of record's first read, at load 11-14). My first `ce8` stage log was removed when the stage was re-run under the chain (its `anc` figures were identical to the chain's). The first chain launch passed its stage list as one word and ran nothing; its one log was removed.
- **Fences.** No tracked file in the checkout was edited, and there was no git write in the checkout beyond `git worktree add`/`remove`. In my own worktree I ran `git add -N` once, to count new files for CK-23, then `git reset -q`. The checkout writes are `pass-8/C-E8.md` and `pass-8/C-E8/`. Siblings were read by grep only. Nothing under `~/.claude` was read.
- **Cleanup.** `git worktree remove --force` on my worktree at return; nothing left running.
