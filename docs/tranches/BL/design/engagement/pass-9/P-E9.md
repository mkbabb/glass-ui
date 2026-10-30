# D5 · pass 9 · P-E9: the in-place construction made whole (Q-3′ (i)), the shared loupe items, the promoted construction as the probe

| field | value |
|---|---|
| seat | P-E9, the prototype seat of D5 pass 9 (`§P8-8.3` wave 2), after H9's self-test |
| model | `claude-opus-5-5`, asserted from own system identity |
| **Q-3′ built under** | **(i), in place under every modality, the loupe alone promoted.** `../../../audit/INBOUND.md` (mtime 2026-10-29 15:58:49 at this seat's start; re-read at return, mtime 21:07:37: one new row, O-113, the atlas U/B7 relay, which FORMATION-PROGRESS places partly with D5 "press and motion" as relay rows, not a ruling on Q-3′ or F-5; it is not folded inside this seat, per `§P8-8`'s seat-boundary rule, and is the agglomeration's to place) ends at **O-103f**: the owner's delegate (`value-js-f3`, per O-102b) rules Q-3′ (i), superseding O-103d (5)'s promote arm, and F-5 (a). `../../../FORMATION-PROGRESS.md` records it as rowed before P-E9. So per `§P8-8.1` the candidate is the probe with the per-frame read kept (`P-E8.patch` + `P-E8-inplace-loupe.patch` + `E8/probe-loop-variant.patch`), made whole; the promoted construction (c) is the probe. O-103f's conditions (1)-(3) are must-prove items here (§3); its condition (1)'s re-measure of the idle cost belongs to a critic (§3 states this seat's own reading only); (4) holds: every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| F-5 | (a): the slider carry's bound is fling minus still ≥ 4 px; release velocity printed beside each read, never gated (O-103f) |
| base | `master` at `32668853e` (H9's docs commit over `773ae0c45`); at return HEAD is `7c7cae3fa`, docs only (`git diff --stat 32668853e HEAD -- src tests` empty). `git diff --stat v10.1.0 HEAD -- src` is empty; `release/10.1.1`, `10.1.2`, `10.1.3` are not ancestors of HEAD (`git merge-base --is-ancestor`, exit 1), so F5‴ carries (no floor seat, `§P8-8.2`); no P-A9 (D3's lane has not reached the base) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5 (playwright 1.61.1), headless shell, imported from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H9's, unedited: hash `c2ce48c39f828572ef4bec3667c169ac77cfce5e` (recomputed at this seat's start, H9's after), the harness's own scene app (`scenes/App.vue` `9e34ffa5714e`). My own cells are one file, `E9/probe/e9-probe.mjs` (the loop cells, O-103f (3)), on the harness's lib |
| worktree | `.claude/worktrees/bl/D5/p9/E9/wt`, detached at `32668853e`, `node_modules` and `tests-visual/node_modules` symlinked; removed at return (§9) |
| records | `E9/`: runners (`builds.sh`, `gates.sh`, `run-e9.sh`, `chain.sh`, `wk-queue.sh` + `wk-w1.txt`, `mkpatch.sh`, `plants.py`, `probe-port.py`, `ck22-greps.sh`, `sum.py`), `probe/e9-probe.mjs`, `logs/` (one log per stage and engine; each opens and closes with the 1/5/15-minute load, every cell line carries its own), `json/`, `glance/`, `numstat-E9-over-PE8.txt` |

## 0 · In brief

1. **The in-place candidate meets the invariant on H9's whole family, in both engines, by construction.** E-10 on the candidate: **72/0 Chromium (load 8.9), 69/0 WebKit (load 7.0)**. Every H9 cell the pass-8 candidate fails passes: the ancestor kinds (opacity, `clip-path`, rotation on the keyboard, filter on the keyboard) read 1.003-1.052 against cand8's 1.162-1.960 and 0.227; the Dialog dismissal steps 0.112 / 0.104 against the plate's own 0.112 / 0.104 (cand8 0.779 / 0.927); the Chromium trail reads 0 px in all nine engaged films (cand8 4-5 px); the glide under `scale: 0.8` starts 0.63 px out against its unscaled 0.56 (cand8 5.25); the feather is two-sided at 0.999 / 1.005. The 21 stale-place cells pass with the per-frame read; deleting the read (`plant-noread`) reds 14 of them. No ancestor kind or path H9 drives is left red, so there is no cell to put to the owner as "no construction meets the invariant" (§5).
2. **Both loupe cures land, under either construction.** The lens is laid every engaged frame on its track as painted: the anchor carries it on a scroll, and the stage writes the correction the anchor leaves (`--lens-dx/-dy`) and the track's painted scale (`--lens-sx/-sy`: its ancestors' `transform`/`scale` and the host's grow). Where its top would leave the viewport it hangs below the track. E-13 **16/16 Chromium (9.6), 16/0 WebKit (5.7)**: under `scale: 0.8` the band reads **×1.600** (k max) with the lens 0.0 px from the track's painted top, fine and coarse (pass 8, every build: ×2.000, 39.4 px off in Chromium); at the viewport's top **81 of 81** lens rows paint (pass 8: 7-9 of 81). The plant `plant-nolens` (the lens never laid) reds 12 of 16 in Chromium. The probe carries the same lens code and reads E-13 16/16 too.
3. **The frame loop runs only while engaged and stops at release (O-103f (3)), measured.** `e9-probe loop`: keyboard-engaged idle 120.2 rAF + 120.2 RO callbacks/s, 0 layouts, 0 recalcs (Chromium); from the release on, 0.0/s in every window, including the first 150 ms, while the host is still on its exit clock. The plant that keeps the loop to the exit clock's end (`plant-loop`, pass 8's shape) reads 105.3 / 104.4 per s in that window: FAIL. WebKit reads the same: 97.9 + 97.9 per s engaged, 0.0 from the release on; the plant 85.5 per s. The engaged idle cost equals the pass-8 candidate's (C-A6 `idle`: Chromium 120.3 rAF and 120.3 RO per s, 0 layouts, 0 recalcs; WebKit 98.0 + 98.0; pass 8 cand8 120.3 / 98.0-98.3), the bar O-103f (1) sets; its re-measure by a non-builder is the critics'.
4. **CK-22: one MIGRATION table from pass 1** (§6), 30 rows superseding every per-pass row from `pass-1/P-A.md` §7 on, with pass 1's rows (M-A1..M-A8, M-B1..M-B11, P-E rows 1-6) and the pass-2 floor's list each carried or retired by name. C-2 and C-9 state only what the bytes paint (C-9 names the one transform the lens does not carry: rotation). The census script passes every pattern with `grep -e` and prints a self-check that it counts.
5. **Cost.** The candidate is 198 files **+5072/−1648**, `src` 153 files **+3088/−1359**; E's own change over the pass-8 candidate is `src` 12 files **+225/−521** (stage.ts +161/−407). The promotion, the footprint, `writePaint`/`worldOf`, the wheel chain, the `byTouch` export and `--held-scale-*` are deleted. The probe (c + the loupe items) is `src` +3450/−1358.
6. **The probe (c) is red where pass 8's critics read it red, unchanged by the loupe items:** E-10 60/12 Chromium (opacity ×1.960 / 1.940, `clip-path` ×1.406 / 1.162, rotate ×1.877, filter ×0.227, trail 4 px, glide 5.23 px, Dialog 0.772 / 0.930) and 60/9 WebKit (opacity ×1.984 / 1.965, `clip-path` ×1.400 / 1.150, rotate touch ×1.987, glide 5.24 px, Dialog 0.767 / 0.905, keyboard feather ×0.584), the same cells red as cand8 in this seat's runs, the ratios within 0.01 and the steps within 0.04 (glide 5.23 / 5.24 px against cand8's 5.25 / 5.42). Its E-13 is 16/16 in both engines.

## 1 · The patches

| file | sha1 (`shasum`) | applies |
|---|---|---|
| `pass-9/P-E9.patch` (the candidate) | **`0cbe2b6de1184f4ba35cb03ce43d8c4ab7f246d0`** | `git apply --check` clean on a `git archive` of HEAD `32668853e` (`E9/logs/apply-check.txt`) |
| `pass-9/P-E9-probe.patch` (the probe: (c) + the shared loupe items; a measured probe, not a candidate) | **`4c735aa724bf6bc43a5db68dc8216fa1ef26d312`** | cut from the worktree at HEAD + `P-E8.patch` + `E9/probe-port.py`, reverse-applied clean back to HEAD in the same run (`E9/logs/builds.log`); `git apply --check` clean on a `git archive` of HEAD (§9) |
| contains `pass-7/P-A7.patch` | `e6e42ba3cf37c47a67811aa7dec1fc1216448816` | A's bytes unchanged: of P-A7's 187 files, 16 differ in HEAD + P-E9, all E-owned (stage, hold, door, slider, loupe, veil, carry, sortable `drag`/`motion`, `useDockHold`), **the same 16 that differ in HEAD + P-E8** (`E9/logs/contains-PA7.txt`) |
| inputs | `P-E8.patch` `5dc4d930…`, `P-E8-inplace-loupe.patch` `fdccd7f4…`, `E8/probe-loop-variant.patch` `a6060049…` | each shasum as `§P8-0` |

Builds (`E9/builds.sh`, `E9/logs/builds.log`, each exit 0): `cand9` (src tree `82c3f35a7110`), `plant-noread`, `plant-nolens`, `plant-loop` (each one edit, `E9/plants.py`), `cand8` (HEAD + `P-E8.patch`, src tree `92f38f424df2`, the hash C-E8 recorded), `probe9`. The tree read back as the candidate's (`82c3f35a7110`) after the last revert.

### 1.1 What the candidate is (E's part over the in-place probe with the frame read)

1. **`stage.ts`, made whole as the candidate.** In place under every modality; its header states what it is and the stacking fact. The probe-loop variant's frame read (`hear`/`heard`: each frame re-observes the engaged host, so the frame's resize step re-reads its flow box after layout and before paint) is kept and named.
   - **The loop runs only while a control is engaged** (O-103f (3)): `startFrames` on an engagement, `stopFrames` the moment no holder is engaged (in `leave`), so a released control on its exit clock is re-read on a scroll, a resize and a re-render, never per frame. `hear`/`heard` visit engaged holders only.
   - **The glide composes outside the grow:** `glide()` animates the `translate` property (composite add), which the transform order applies outside the host's `scale`, so a flow offset in the parent's units is travelled exactly as painted under any ancestor scale (pass 8's `transform: translate()` was drawn inside the grow, ×1.06 long).
   - **THE LENS:** `placeLens` lays a host's `[data-engage-lens]` child on its `[data-engage-lens-subject]` each engaged frame, in the resize step: `paintedScale` multiplies the subject's own and every ancestor's computed `transform` (column lengths of the matrix) and `scale`, stopping at the first top-layer box; the lens's painted bottom centre (or its top centre when below) is moved onto the subject's painted top (bottom) centre by the correction it reads from its own painted box, exact in one frame because the lens scales about that pinned point; below when the subject's top minus the lens's painted height is above the viewport. It writes only on a change (a string compare), so a still hold recalcs nothing (§3: 0 recalcs/s with the loupe shown).
2. **The loupe (`Slider.vue`, `slider/styles.css`).** The lens carries `data-engage-lens`, the track `data-engage-lens-subject`; the lens's `transform` is `translate(var(--lens-dx), var(--lens-dy)) scale(var(--lens-sx), var(--lens-sy))` about its bottom centre; `[data-engage-lens-below]` hangs it from `top: anchor(bottom)` about its top centre; under reduce the placement transform stays (the grow is already none there, so `--lens-s*` is the ancestors' scale alone). The clone is laid out at the track's layout width (`offsetWidth`), since the lens now scales to the painted size. No lighting layer, no blur token, no new radius (O-87, CK-26).
3. **`utilities/engage.css`.** `--held-scale-x/-y` are deleted (their other reader was the lens); the grow is `scale: calc(…) calc(…)` again, in place.
4. **`hold.ts`.** `byTouch` leaves `useHold`'s return (its one reader was the promote predicate); the internal flag stays for the touch long-press `contextmenu` rule.
5. **Comments made true** in `useEngage.ts`, `engageLadder.ts` (the engaged rung's comment), `engage-stage.css`, `glass.css`, `focus-veil.css`, `scale-paper.css`, `NumberFieldInput.vue`, `Slider.vue`: none says "promote", "top layer" or "probe" of the body.
6. **Tests rewritten to the in-place bytes** (`engage-stage.test.ts`, `focus-veil.test.ts`, `release-carry.test.ts`): the 17 promotion tests are rewritten (touch and keyboard engage in place; the hand-off's two controls carry no popover, anchor, place, clip or mask; the re-render seats nothing; the frame-read cases drive the host's own flow box) or deleted with their behaviour (the five clip and mask writes, the wheel chain's take-and-forward and its plant: no wheel is taken). New: **the frame read stops at release while the released control is still on its exit clock, and restarts on a new engagement** (O-103f (3)); **the lens** laid at its subject's painted scale and top centre, its plant (an untransformed card leaves the scale 1), and hung below at the viewport's top.

### 1.2 The probe (`P-E9-probe.patch` = HEAD + `P-E8.patch` + `E9/probe-port.py`)

Pass 8's candidate bytes, the promotion and `writePaint` untouched, plus the shared loupe items ported byte for byte from the candidate: the same `slider/styles.css`, `Slider.vue` and `engage.css` hunks, and in `stage.ts` the candidate's `Lens`, `paintedScale` (as `lensScale`, since cand8 has its own `paintedScale`) and `placeLens`, called for engaged holders in cand8's own resize step (its loop is pass 8's: it runs while anything is on the stage). Under the promotion the walk stops at the promoted host, whose inline `transform` already carries its ancestors' scale.

## 2 · Cost (CK-23) and gates

| scope | files | lines | src | record |
|---|---:|---|---|---|
| the candidate (F5‴ + P-A6 + A7 + E) | 198 | **+5072/−1648** | 153 files, **+3088/−1359** | `git apply --numstat` |
| pass 8's candidate, for comparison | 198 | +5375/−1644 | 153 files, +3380/−1355 | `§P8-2` |
| E's own change over pass 8's candidate | — | — | 12 files, **+225/−521** (stage.ts +161/−407; tests 3 files +200/−211) | `E9/numstat-E9-over-PE8.txt` |
| the probe ((c) + the loupe items) | 198 | +5445/−1647 | 153 files, +3450/−1358 | `git apply --numstat` |

Gates in the worktree on the candidate, through `guarded`, one heavy run at a time (`E9/logs/gate-*-cand9.log`):

| gate | result | load at end |
|---|---|---|
| build | exit 0 | 5.8 |
| typecheck (vue-tsc ×2, `--light`) | exit 0 | 6.5 |
| `demo:dist:build` | exit 0 (re-run on the candidate; pass 8's probe failed `boot-graph` on a stale `dist-demo`) | 6.1 |
| vitest `--maxWorkers=2` | **247 files passed; 2427 passed, 10 expected fail, 1 skipped; exit 0** | 10.9 |

The probe was built for the battery only; its gates were not run (it is not a candidate).

## 3 · E's must-prove list (§P8-8.1, O-103f): each witness green, its plant red, both engines

Every figure from a stage log under `E9/logs/` (`<stage>-chromium.log`, `<stage>-webkit.log`); the load is the 1-minute load printed on the cell's own line or the stage's start.

| item | witness | candidate · Chromium (load) | candidate · WebKit (load) | plant | plant · Chromium | plant · WebKit |
|---|---|---|---|---|---|---|
| CK-20 ancestor opacity | E-10 `clipstale anc opacity · keyboard\|touch\|fine` | PASS 1.009 / 1.032 / 1.052 (7.5-6.6) | PASS 1.001 / 0.989 / 0.987 (7.8-6.6) | `cand8` | FAIL 1.960 / 1.940 (fine is in place in cand8 too: 1.052 PASS) | FAIL 1.984 / 1.965 (fine 0.987 PASS) |
| CK-20 ancestor `clip-path` | `anc clippath` | PASS 1.003 / 1.024 / 1.044 | PASS 1.010 / 0.980 / 0.965 | `cand8` | FAIL 1.406 / 1.162 | FAIL 1.400 / 1.150 |
| CK-20 ancestor rotation | `anc rotate` (graded keyboard in Chromium; touch and fine in WebKit, H9 §2.1) | PASS keyboard 1.028; touch 0.790, fine 0.805 REPORT (H9's held-fill paint) | PASS touch 1.074, fine 1.064; keyboard 1.112 REPORT | `cand8` | FAIL keyboard 1.877 | FAIL touch 1.987 (keyboard 2.156 REPORT) |
| CK-20 ancestor filter | `anc filter` (graded keyboard in Chromium; WebKit REPORT on every mode, H9 §2.1) | PASS keyboard 1.041; touch 1.017, fine 1.037 REPORT | REPORT 1.102 / 1.261 / 1.378 (an in-place body's scatter, H9 §2.1) | `cand8` | FAIL keyboard 0.227 | REPORT 0.222 / 0.109 |
| CK-20 the Dialog dismissed under a keyboard-engaged Slider | E-10 `presented dlg · esc2\|scrim` (root step ≤ the plate's + 0.05) | PASS 0.112 vs 0.112 / 0.104 vs 0.104; promoted on 0 frames (7.1) | PASS 0.116 vs 0.116 / 0.114 vs 0.114 (7.1) | `cand8` | FAIL 0.779 vs 0.090 / 0.927 vs 0.093 | FAIL 0.767 vs 0.114 / 0.910 vs 0.115 |
| CK-20 the place film | E-10 `clipstale trail · wheel-over\|wheel-away\|page · engaged` (worst ≤ released worst + 1 px; Chromium graded, WebKit REPORT) | PASS 0,0,0 / 0,0,0 / 0,0,0 px (6.1-5.5) | REPORT 0,0,0 / 0,0,0 / 0,0,0 px | `cand8` | FAIL 4,5,4 / 4,4,4 / 4,4,4 px | REPORT (H9: 25 fps resolves no one-frame trail) |
| CK-20 the glide under scale | E-10 `clipstale glidescale · scale` (≤ the unscaled + 1 px) | PASS 0.63 px against 0.56 (5.4) | PASS 0.66 px (7.1) | `cand8` | FAIL 5.25 px against 1.79 | FAIL 5.42 px |
| CK-20 the feather, two-sided | E-10 `clipstale clip feather · keyboard\|touch` (0.90..1.10) | PASS 0.999 / 1.005 (9.3) | PASS 0.991 / 1.004 (7.8) | `cand8` (WebKit's keyboard under-paint) | PASS 1.022 / 0.952 (Chromium is not where cand8 fails) | **FAIL keyboard 0.584** / touch 0.978 |
| CK-20 the 16 (H9: 21) stale-place cells: a re-render glides from the place last painted | E-10 `restale stale place …`, `clipstale clipped stale place …` | **21/21 PASS** (E-10 72/0) | **21/21 PASS** (E-10 69/0) | `plant-noread` (the frame read deleted) | **14 FAIL** (E-10 58/14, 5.2): restale ×6, clipstale keyboard ×4, pointer conceal/control ×4; the two pointer·reveal cells and the controls pass | **14 FAIL** (E-10 55/14, 6.7): the same 14 cells |
| CK-20 the rest of E-10 (vanish, radius, place ×3, film, hand-off, singleton, Escape, landing) | E-10 | PASS: hand-off drop 0.0069 against own release 0.0079, singleton fwd 109 frames max 1 engaged | PASS: hand-off drop 0.0082 against own release 0.0098, singleton fwd 89 frames max 1 engaged | — | — | — |
| CK-25 the loupe under scale | E-13 `clipstale loupe place · scale · fine\|coarse` (k ±5 %, Δ ≤ 2 px) | PASS ×1.600 / ×1.600, bottom 0.0 px (11.9 / 10.6) | PASS ×1.600 / ×1.600, bottom 0.0 px (5.6 / 12.3) | `plant-nolens` | FAIL ×1.887, bottom −39.4 px (fine and coarse) | FAIL ×1.887 (bottom 0.0 px, as C-E8 read WebKit's offset in pass 8) |
| CK-25 the loupe at the viewport's top | E-13 `clipstale loupe viewport · fine\|coarse` (≥ ref − 5 %) | PASS 81 / 81 of 81 rows (11.8 / 11.1) | PASS 81 / 81 of 81 rows (5.4 / 12.0) | `plant-nolens` | FAIL 7 / 9 of 76 | FAIL 7 / 9 of 76 |
| CK-25 the loupe untransformed and translated, k max, whole at the scroller's edge and mid-box | E-13 (the other 12 cells) | PASS ×1.600, 0.0 px; 81/81 rows | PASS ×1.600, 0.0 px; 81/81 rows | `plant-nolens` | FAIL k max ×4 and place none/translate ×4 at ×1.509 (the lens no longer carries the grow); whole ×4 PASS | FAIL the same 8 at ×1.509; whole ×4 PASS |
| CK-25 no pill cap at the window's centre | `e8-probe tip` | PASS 4/4, spread 0.00 px (8.4) | PASS 4/4, spread 0.00 px (10.0) | (pass 8's `plant-cand7`, read by P-E8 and both critics) | — | — |
| O-103f (3) the loop stops at release | `e9-probe loop · keyboard\|fine-hold · stops at release` (after release every window ≤ 2/s; engaged > 30/s) | **PASS / PASS**: engaged 240.4 / 359.6 per s (rAF + RO), after release 0.0 / 0.0 / 0.0 per s in 0-150 ms, 150-450 ms, 1.5-4.5 s (4.5) | **PASS / PASS**: engaged 195.8 / 293.9 per s, after release 0.0 / 0.0 / 0.0 per s (10.4) | `plant-loop` (the loop kept to the exit clock's end) | **FAIL / FAIL**: 105.3 / 104.4 per s in 0-150 ms (4.5) | **FAIL / FAIL**: 85.5 / 85.5 per s in 0-150 ms (10.0) |
| O-103f (1) the idle cost (this seat's reading; the counting re-measure is a critic's) | `ca6-probe idle` | engaged idle 120.3 rAF + 120.3 RO per s, off-screen 120.3 / 120.0, **0.0 layouts, 0.0 recalcs**; 0 at rest and after Escape (8.3). Bar: pass 8's candidate 120.3 (C-A8, C-E8) | engaged idle 98.0 rAF + 98.0 RO per s, off-screen 98.0 / 98.0; 0 at rest and after Escape; no layout counter (10.0). Bar: pass 8's 98.0-98.3 (pass 8 bar 98.0-98.3) | — | — | — |
| the lens laid each frame costs no recalc when still | `e9-probe loop · fine-hold · held still, loupe shown` | REPORT: 239.7 rAF/s (the Slider's own velocity writer and the stage's frame), 119.9 RO/s, **0.0 layouts/s, 0.0 recalcs/s** | REPORT: 195.9 rAF/s, 98.0 RO/s (no layout counter) | — | — | — |
| P-1 the promotion's bytes gone | `grep` in the candidate's `src` | `.engage-footprint`, `popover` on a host, `writePaint`, `worldOf`, the wheel chain, `--held-scale-*`, `byTouch` in `useHold`'s return: 0 | — | pass 8's candidate | present | — |

The cand8 rows of the WebKit column are this seat's own WebKit reads of the pass-8 candidate (`cand8-E-10new-webkit.log`), queued inside the one acquisition.

## 4 · The battery on the candidate, both engines (harness `c2ce48c3`, build `cand9`, the harness's own app)

Chromium ran one stage per `guarded` call, 18:58-19:50 (`logs/chain-chromium.log`), then the loop cells' re-read 19:50-20:12 (`logs/chain-chromium-2.log`, §8). WebKit ran in **one** `guarded --exclusive webkit --timeout 90` acquisition: queued 19:16:59, **admitted 21:37:22 (a wait of 140 min, past the 90-minute mark: the lock was held by other seats' runs, and this seat was the oldest waiter from about 20:45; the cells stayed open and queued, never skipped)**, all 27 stages 21:37-22:31, released 22:31:32, exit 0, inside the 90-minute cap (`logs/wk-queue.log`).

| witness | Chromium P/F/U · load at start | WebKit P/F/U · load | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 5.3 | 93/3/0 · 7.5 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (the `css` substrate, engine limit); WebKit the amplitude (D3) and the reduce leg (A's, gated on D3's lane) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 5.6 | **164/0/0** · 7.7 | — |
| E-3 | **22/0/0** · 6.7 | **22/0/0** · 10.8 | — |
| E-4 | **18/0/0** · 7.4 | 15/0/4 · 10.6 (the Carousel's engine fact, O-103d (4)); slider carry 12.77-13.69 px at 1290-1356 px/s; tabs 41.71 px; Sheet 250 px; sortable 29.07 px | slider carry 12.17-12.46 px at 1020-1068 px/s (F-5 (a): ≥ 4 px, margin ≥ 8.17 px); tabs 37.64 px; Sheet 250 px; sortable 21.54 px |
| E-5 | **56/0/0** · 6.1 | **56/0/0** · 7.8 | — |
| E-6 | 4/2/8 · 5.8 | 2/2/8 · 7.1 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 · 5.8 | 6/1/0 · 6.8 | `data-held` writers `GlassDock.vue` (D2's named clause) and `useEngage.ts` |
| E-8 | **19/0/0** · 5.7 | **19/0/0** · 6.6 | — |
| E-9 | **85/0/0** · 6.7 | **85/0/0** · 7.7 | — |
| E-9 `--prm-plant` | 40/32 · 6.7 | 40/32 · 13.7 | H7's plant, red as it must be |
| E-10 | **72/0/0** · 8.9 | 69/0 WebKit (load 7.0) | — |
| E-11 | 11/0/5 · 5.6 | 11/0/5 · 13.5 | the five UNMEASURED: tokens not read on that control's commit path (H8 §5), A's shape |
| E-12 | **102/0/0** · 11.4 | 101/0/1 · 6.1 (WebKit `rest layouts`: the engine fact) | — |
| E-13 | **16/0/0** · 9.6 | **16/0/0** · 5.7 | — |
| CAP | 18/0 · 10.2 | 18/0 · 7.1 | the glance set, §7 |
| `e8-probe tip` | **4/0** · 8.4 | **4/0** · 10.0 | — |
| `e9-probe loop` | **2/0** · 4.5 | **2/0** · 10.4 | — |
| `ca6-probe idle` | REPORT (§3) | REPORT: 98.0 + 98.0 per s | stated, at the pass-8 bar |

### 4.1 Per CK row, the candidate (each engine, with load)

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| **20** | E-10 72/0 (8.9): every H9 cell; stale place 21/21 | E-10 69/0 (7.0): every graded H9 cell; stale place 21/21 | **The invariant holds on every ancestor kind and path H9 drives, by construction.** The REPORT cells (Chromium rotate and filter on a pointer; WebKit filter; WebKit keyboard rotation) read an in-place body, so they say what an in-place body paints, which is what the invariant asks |
| **25** | E-13 16/0 (9.6), tip 4/0; glance (§7) | E-13 16/0 (5.7), tip 4/0 | **Both loupe cures land**: k max ×1.600 under scale, flush on the track, whole at the viewport's top. The gestalt from frames is the critics' (§7). ◇ The ambient exemplar stays D3's |
| **22** | §6 | — | one table from pass 1; C-2, C-9 to the bytes; `grep -e` |
| **16** | rest 0; engaged idle 120.3 + 120.3 per s, 0 layouts, 0 recalcs; the loop stops at release | rest 0; engaged idle 98.0 + 98.0 per s; stops at release | holds by its letter; the idle cost is pass 8's bar, the loop now bounded to the engagement |
| **05** | E-4 slider 5/5, 12.17-12.46 px at 1020-1068 px/s (7.4) | E-4 slider 5/5, 12.77-13.69 px at 1290-1356 px/s (10.6) | (a), velocity printed |
| **23** | §2 | — | measured |
| **26** | the loupe's change is a placement transform (no paint), an attribute arm; no light layer, no blur token, no radius | same | holds |
| **27** | every §3 item has a plant red: `cand8`, `plant-noread`, `plant-nolens`, `plant-loop`, H7's PRM plant | the same plants red (the feather's `cand8` red here: ×0.584) | holds, with the feather's Chromium plant not red (§8 gap 3) |
| **04, 14, 15** | E-3 22/0; E-12 coarse; hand-off and singleton | E-3 22/0; E-12 101/0/1; hand-off and singleton | no regression |
| **01, 17, 19** | D2's latch and `:active`, D3's amplitude and lane, A's reduce leg | same | not E's; unchanged |
| others | E-2, E-5, E-8, E-9, E-11, E-12, CAP as pass 8 | E-2 164/0, E-5 56/0, E-8 19/0, E-9 85/0, E-11 11/0/5, E-12 101/0/1, CAP 18/0 | no regression |

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 5 · The probe (c), read on H9's whole family beside the candidate (not scored)

| cell | probe · Chromium | probe · WebKit | candidate · Chromium / WebKit |
|---|---|---|---|
| E-10 whole | **60/12** (9.1) | **60/9** (9.4) | 72/0 / 69/0 WebKit (load 7.0) |
| `anc` opacity · keyboard \| touch | **FAIL 1.960 \| 1.940** | **FAIL 1.984 \| 1.965** | 1.009 \| 1.032 |
| `anc` clip-path · keyboard \| touch | **FAIL 1.406 \| 1.162** | **FAIL 1.400 \| 1.150** | 1.003 \| 1.024 |
| `anc` rotate · keyboard | **FAIL 1.877** | 2.156 REPORT; touch **FAIL 1.987** | 1.028 |
| `anc` filter · keyboard | **FAIL 0.227** | 0.222 REPORT | 1.041 |
| trail (worst px, engaged) | **FAIL 4,0,4 / 4,4,4 / 4,4,4** | REPORT 0 px (25 fps) | 0 / REPORT |
| glidescale · scale | **FAIL 5.23 px** | **FAIL 5.24 px** | 0.63 |
| dlg esc2 \| scrim | **FAIL 0.772 / 0.094 \| 0.930 / 0.117** | **FAIL 0.767 / 0.104 \| 0.905 / 0.105** | 0.112 / 0.112 \| 0.104 / 0.104 |
| feather · keyboard \| touch | 1.022 \| 0.952 PASS | **FAIL keyboard 0.584** \| 0.978 | 0.999 \| 1.005 |
| E-13 (incl. loupe place · scale, loupe viewport) | **16/0**: ×1.600, 0.0 px; 81/81 rows (5.2) | **16/0** (6.9) | 16/0 / 16/0 WebKit (5.7) |
| `e8-probe tip` | 4/0 | 4/0 | 4/0 |
| idle, engaged | 120.3 rAF + 120.3 RO per s (scrolled off 120.0), 0 layouts, 0 recalcs; 0 after Escape (5.7) | 98.0 + 98.0 per s; 0 after Escape | 120.3 + 120.3 |

**What this says for the record.** The shared loupe items land under either construction (the probe reads E-13 16/16 with the same code). The probe's E-10 reds are pass 8's, to the decimal: carrying the loupe changed none of them. No ancestor kind or path on H9's family is red on both constructions, so there is no cell to put to the owner beside Q-3′. Under O-103f the in-place construction is the candidate, and it is green on every one of them.

## 6 · CK-22 · THE MIGRATION table for the candidate (one table, from pass 1; P-3)

This table is the candidate's one MIGRATION record. It supersedes every per-pass row from pass 1 on: `pass-1/P-A.md` §7 (M-A1..M-A8), `pass-1/P-B.md` §7 (M-B1..M-B11), `pass-1/P-E.md` §7 rows 1-6, `pass-2/F5.md` "Migration", `pass-2/P-A2.md` §4, `pass-2/P-E2.md` §4 rows 1-9, `pass-3/P-A3.md` §4 (M-1..M-7), `pass-3/P-E3.md` §4 (E-M1..E-M5), `pass-4/P-A4.md` §4 (M-8..M-11), `pass-4/P-E4.md` §4 (E-M1 restated, E-M6, E-M7), `pass-5/P-A5.md` rows 1-4, `pass-5/P-E5.md` §4.1 (E-M8..E-M10), `pass-7/P-A7.md` §5 (M-12..M-22), `pass-7/P-E7.md` §6 (M-23..M-26) and `pass-8/P-E8.md` §6 (C-1..C-28). Each source row is carried into one row below (the "from" column) or retired by name in §6.2. Every row states only what the candidate's bytes do. Consumer counts: `E9/ck22-greps.sh` → `E9/logs/ck22-greps.txt`, run at glass-ui HEAD `32668853e` with every pattern passed as `grep -e` (the script prints a self-check: `--veil-x/y` counts 22 in glass-ui's own `src`, so a leading-dash pattern counts), siblings read-only (value.js by grep only). The material-class census (C-19) and the Dialog/Sheet counts (C-17) are P-A7's (`pass-7/A7/logs/`): A's bytes are unchanged.

### 6.1 The rows

| # | consumer-visible change | from | consumer sites at the pass-9 HEAD | row (for `MIGRATION.md` at the cut) |
|---|---|---|---|---|
| C-1 | `.tap-squish` and `.interactive-item` are deleted, no alias | M-A8 (built since pass 2), P-A2 §4, P-B M-B8 and M-A1 (the bits' clause) | `tap-squish`: chicago 3 (`TempApp.vue:298,310,336`, on `DockControl`), speedtest 4 live (`PhaseTimeline.vue:34`, `AdminDataSourceToggle.vue:110`, `SurveyResultDock.vue:113`, `AddressAutocomplete.vue:74`) and 1 comment (`AdminDashboardLayout.vue:72`), keyframes.js 1 (`EasingField.vue:40`); `interactive-item`: keyframes.js 1 comment (`MbabbMenu.vue:45`), fourier-analysis 1 test (`f-w14v-c3.spec.ts:156`) | "`.tap-squish` and `.interactive-item` are gone. Use the member's own engage class, or `glass-menu-row focus-ring` on a menu row." (chicago's three are on D2's dock; `EasingField.vue:40` waits on D2's `glass-capsule-hover` retirement) |
| C-2 | **An engaged Slider or scrubbing NumberField grows where it stands, under every modality** (a fine pointer's hold, a touch's hold, a keyboard engagement): it stays in flow, in its own DOM place, a child of every ancestor it has at rest. It carries `data-engage-stage` and `data-engaged`, and inline only `--stage-room` and `--stage-w` (the reach). Nothing else is written on it: no `popover`, no footprint sibling, no `left`/`top`/size, no `transform`, `clip-path` or `mask-*`. Its grow is the `scale` property (×`--scale-engage` on the block axis, the reach inline) **inside its own stacking context: a later positioned sibling can paint over an engaged control** | P-E row 3 (rewritten), P-E2 rows 1 and 5, E-M7, M-24, C-2 (pass 8), replaces E-M1 | `<Slider>`: atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier-analysis 5, sci-report 5. `<NumberField>`: keyframes.js 1, speedtest 6, value.js 1, fourier-analysis 1. `position-anchor`/`clip-path`/`mask-image`/`transform`/`anchor-name` on a slider, number-field or slider-track rule: 0. `.engage-footprint`/`data-engage-stage`/`data-engaged`: 0. A `<Slider>`/`<NumberField>` within 20 lines of an ancestor-paint declaration: 0 (one grep hit, sci-report `EcfFilter.vue:307`, is `data-testid="filter-…"`) | "An engaged Slider or NumberField grows where it stands, whatever engaged it. It is drawn by its own scroller and card exactly as at rest (their clip, corners, mask, opacity, filter and transform), because it never leaves them. It grows in its own stacking context: a positioned element after it in the same stacking context paints over it, as it did at rest. The library writes only `--stage-room` and `--stage-w` on it." |
| C-3 | A consumer's own inline `position-anchor` on the host is never touched | E-M1 (restated), C-3 (pass 8) | 0 | "The stage writes no anchor name; a `position-anchor` of yours on a Slider or NumberField host stays as you set it." |
| C-4 | No engagement veils the world. `.glass-focus-veil` is a public class whose one library reader is the Dialog's overlay (`[data-state="open"] > .glass-focus-veil`), centred on the viewport | P-E row 1's veil clause, P-E2 row 2's `noveil` arm, E-M4's veil clause, E-M8's `false` arm, M-23, M-A6 and M-B2 (the modal veil keys on `[data-state="open"]`), F5 "The veil selector is split" | `glass-focus-veil`: 0 | "An engaged control never frosts the page. A `.glass-focus-veil` of yours rises under an open `data-state` parent, at the viewport's centre." |
| C-5 | `@property --veil-x` and `--veil-y` are deleted; the veil reads the viewport's centre | C-5 (pass 8) | atlas 2 writes (`useAuroraVeil.ts:116-117`) and 2 comments; no reader | "glass-ui no longer registers `--veil-x`/`--veil-y`. A value you write under those names is your own custom property. atlas writes both and reads neither, so nothing paints differently." |
| C-6 | `data-engaged` is present-empty, written by the stage alone, on the control; the door's `engagedOn` option is deleted, with no alias | P-E row 1, M-B1, P-E2 row 4's control clause, C-6 | 0 | "`data-engaged` (present, empty) marks an engaged control; the library writes it, only on the control." |
| C-7 | Keyboard engagement (Tab into a slider, or an arrow, Page, Home or End key on it) engages and grows ×1.06 **in place**; a script `focus()` and a printable key's script focus engage nothing | P-E2 row 2's keyboard clause, F5 "The slider gains keyboard `data-engaged`", C-7; replaces M-A5's keyboard clause | — | "Tab, or an arrow, Page, Home or End key, engages a slider where it stands; a script focus does not." |
| C-8 | Escape inside a Dialog: the first Escape on an engaged slider releases it and is spent (`preventDefault`); the Dialog closes on the next | P-E2 row 3, C-8 | Dialog sites as C-17 | "The first Escape on an engaged control releases it; a `window` Escape listener sees `defaultPrevented` on that one." |
| C-9 | **The loupe** (a held horizontal scrubber's lens; fine and touch holds; a keyboard engagement shows none) is the Slider host's DOM child and its own top-layer `popover="manual"` carrying `data-engage-lens`, hung by anchor from its own track (inline `anchor-name: --glass-slider-track-<id>` on `.slider-track`, which also carries `data-engage-lens-subject`; inline `position-anchor` on the lens). While its slider is engaged the stage lays it on the track as painted, every frame: inline `--lens-dx`/`--lens-dy` (the correction the anchor leaves) and `--lens-sx`/`--lens-sy` (the track's painted scale: its ancestors' and the grow). Its bottom centre sits on the track's painted top centre; where its top would leave the viewport it hangs below the track (`data-engage-lens-below`). The magnified band is k max ×1.6 of the track as painted. The fill ends square at the window's centre; the housing draws its own hairline; no value mark; the window's ends dissolve the band; the clone sits in `.glass-loupe-window`. Not laid on a rotated track's angle: under a rotated ancestor the lens is level, at the track's scale | P-E row 4, P-E2 row 5's loupe clause, E-M10, M-25, C-9 (pass 8, which overclaimed) | `glass-loupe`: 0; `--lens-*`, `--held-scale-*`, `--stage-*`: 0; `anchor-name` on a slider-track rule: 0 | "The loupe floats over its slider as the slider is drawn (at its scale, flush on its track), a popover of its own, and turns under the track at the top of the viewport. It does not tilt with a rotated card. There is no mark element; `.glass-loupe > .glass-loupe-clone` does not match. Do not set `anchor-name` on `.slider-track`, or the `--lens-*` properties on the loupe." |
| C-10 | The held grow is the `scale` property on the host, computed in place from `--stage-reach`, `--scale-engage` and `--rung-grow`. **`--held-scale-x`/`--held-scale-y` (pass 8) are deleted**, no alias: their one other reader was the loupe, which now reads its track's painted scale | C-10 (pass 8), retired | 0 | "glass-ui no longer publishes `--held-scale-x`/`--held-scale-y`." |
| C-11 | NumberField scrub: a press that starts on the input and travels scrubs one step per `--scrub-pitch` (`1ch`), loud on an unreadable pitch; a press on a step button is the button's; the input sets `touch-action: pan-y`; dragging inside the field no longer selects text | P-E2 row 6 (as superseded by E-M3), E-M2, E-M3, E-M4's touch clause | `<NumberField>` as C-2 | E-M2 and E-M3 as written; E-M4: "The input sets `touch-action: pan-y`: a horizontal touch drag scrubs, a vertical one scrolls; a consumer `touch-action` on the input overrides it." |
| C-12 | `ACTIVATION_SLOP_PX` is `HOLD_SLOP_PX` | P-E2 row 7 | 0 (internal) | none needed |
| C-13 | `--scale-engage` mirrors the ladder's engaged row (1.06) | P-E row 5's token clause, P-E2 row 8, M-A7's `--scale-engage` | `--scale-engage`: 0 | "Override `--scale-engage` together with the ladder's engaged row." |
| C-14 | **A wheel over an engaged control is the platform's**: the stage neither takes nor forwards it (the control is in its scroller) | E-M6, C-14 (pass 8), retired as a behaviour | — | "A wheel over an engaged Slider scrolls what it scrolled at rest." |
| C-15 | The Slider's press reads `[data-held]`, not `:active`; `data-held` is present-empty and means the hand only | E-M9, M-B7 as superseded by P-E row 2, F5 "`data-held` is present-empty" | `.glass-slider…:active`: 0. `[data-held]` readers: value.js 2 (`ComponentSliders.vue:428,430`, `cursor: grabbing` on a held channel slider: correct under hand-only) | E-M9 as written; "`data-held` (present, empty) is the hand on the control; a keyboard engagement is `[data-engaged]`." |
| C-16 | The release carry rides the range, on every modality | M-26, M-B3 (`useDragVelocity` `onRelease`, additive) | `flingStage`/`useEngageStage`/`STAGE_VEIL`/`POINTER_STAGE`: 0 (atlas's two `releaseStageMorph` hits are its own chart code) | M-26 as written |
| C-17 | DialogContent's presented plate fades under reduced motion (opacity only) | M-18 | (P-A7's count) atlas 7, chicago 2, keyframes.js 12, slides 2, speedtest 13, value.js 23, fourier-analysis 14 | M-18 as written |
| C-18 | A committing member's press keys on `data-press`, not `:active`; Enter presses a disclosure trigger as Space does | M-8 | `:active` on a member: 0; `data-commit`/`data-press`: 0 | M-8 as written |
| C-19 | The material classes, the sortable row and handle, and the dialog and sheet close buttons press on `[data-press]::before`; `usePressMark`/`UsePressMarkOptions` are exported on `/motion-core` | M-12, M-19, M-21 | (P-A7's census) one pressable material site, slides `DeckSettings.vue:149` | M-12 as written |
| C-20 | `--glass-btn-press-t` is `--press-t`, no alias | M-3, M-13, F5 "`--glass-btn-press-t` becomes `--press-t`" | `--glass-btn-press-t`/`--press-t`: 0 | M-13 as written |
| C-21 | The commit pop on eight members, on the root's `transform`; under reduce an instant state change. The Button binds no template handlers or `:style`; the door writes its press natively | M-14, M-B9, F5 "Button binds no template handlers or `:style`", M-A3's `transition` clause | 0 | M-14 as written; "The Button writes its press on itself; do not set `scale` or `transform` on a `.button` inline." |
| C-22 | The crest rows (`--scale-commit-pop = 2 − --scale-press`; `--scale-commit-pop-bit` deleted; a command and the bit pop on `--scale-engage`) | M-15, M-B10 and M-A7's `--scale-commit-pop` (the 1.02 figure is superseded) | `--scale-commit-pop`: 0 | M-15 as written |
| C-23 | The commit light is retired | M-16 | 0 | M-16 as written |
| C-24 | `ConfiguratorPresetChip`, a `chosen` member, is the default preset chip | M-17 | `<Configurator>`: fourier-analysis 2 | M-17 as written |
| C-25 | The Switch thumb's press ink is the both rung | M-22 | 0 | M-22 as written |
| C-26 | Disclosure triggers: hover is a foreground wash (`--fill-hover`), press its ink ×2; the selectable Card and the Button's quiet and text emphases press on `data-press`; Button and Chip lose the capsule's hover lift; a selected Chip rests unscaled | P-A5 rows 1-3, M-10, M-B11, M-A2, M-A4 | `disclosure-trigger`: value.js 1 (a comment) | P-A5 rows 1-3 as written; "Buttons and Chips no longer lift on hover." |
| C-27 | `PopoverTrigger as-child` gives the child `engage-disclosed`; state members arm one frame after mount (`data-engage-arming`); Timeline's root is `static`, its marks `pressed`; the engage recipes own their host's `transition` list; the register's public surface (`ENGAGE_DECLARATION`, `--rung-class`, `--rung-commit`, `--rung-grow`, the `engage-*` utilities) | M-2, M-4, M-5, M-6, M-A7 | `ENGAGE_DECLARATION`/`--rung-*`: 0 | M-2, M-4, M-5, M-6 as written; M-A7's names as additive surface |
| C-28 | The Aurora root's pointer leg: the root writes the cursor from a pointer over it until a consumer calls `setCursor`/`clearCursor`, which owns it for the mount's life | M-20, restated on the `<Aurora>` mounts | `<Aurora>` mounts: atlas `Aurora.vue:150` (`<GlassAurora>`, from `Atmosphere.vue:137`; `pointer-events: none` at `Aurora.vue:170`, `Atmosphere.vue:166,179,188`), speedtest `App.vue:48` (`pointer-events-none` `:51`), keyframes.js `HeroAurora.vue:25` (`:27`). sci-report `DashboardView.vue:196` is a comment; value.js mounts none. `setCursor`/`clearCursor` callers: keyframes.js `HeroAurora.vue:223,227`, value.js `useAtmosphere.ts:315,320` | "An `<Aurora>` answers a pointer over its root by itself; `setCursor`/`clearCursor` takes the cursor over. Every `<Aurora>` mount in the siblings is `pointer-events: none`, so nothing changes for any of them." |
| C-29 | `useDockHold` and its dock export are removed, with no public replacement: the hand is the register's internal `useHold` (motion/engage, not exported), which no longer reports which hand (pass 7's `byTouch` is deleted with the promotion it fed) | F5 "`useDockHold` … removed", new (P-1) | `useDockHold`: 0 | "`useDockHold` is gone; a held glass control reports its hand as `[data-held]`." |
| C-30 | `useDragMorph` no longer uses keyframes' `Draggable` | F5 "`useDragMorph` no longer uses keyframes Draggable" | (the floor's row; no consumer imports `Draggable` through glass-ui) | "`useDragMorph` drives its own pointer drag." |

### 6.2 Retired by name

| source row | why |
|---|---|
| **P-E §7 row 3** (pass 1: "An engaged Slider is in the top layer, including on keyboard focus … recedes the world behind the veil … escapes ancestor clipping, stacking and `overflow` … an `.engage-footprint` previous sibling … its `transition` is the stage's") | false on the candidate: nothing enters the top layer but the loupe, no veil, no escape, no footprint. C-2 and C-7 state the bytes |
| **P-E §7 row 5** (pass 1: "`/motion` gains `engageStage`, `flingStage`, `releaseStage`, `useEngageStage`; `useEngage` returns `isEngaged`; `drag` gains `carry` … the inline `--stage-room`/`--stage-w` on a promoted host") | none of `engageStage`, `flingStage`, `releaseStage`, `useEngageStage` is exported (the stage is internal to motion/engage); `flingStage` and `carry: "stage"` are deleted (M-26). The token clause is C-13, the reach clause C-2 |
| P-E §7 row 1 | its two halves are C-6 and C-4 (no stage veil exists) |
| P-E §7 row 2 | C-15 (and it superseded M-B7) |
| P-E §7 row 4 ("the loupe is the root's child"; `--loupe-left/-top` gone; no `data-focus-veil`, no inline `z-index`) | the first half is C-9; `data-focus-veil` and `--loupe-left/-top` have 0 readers in every sibling (`FV` 0) and nothing to migrate |
| P-E §7 row 6 (the orphan-CSS gate's exception) | a repository gate, no consumer surface (as P-E2 row 9) |
| **M-A5** (pass 1: the slider grows "only while `[data-held]` on a fine pointer, no longer on `:active` or keyboard focus") | contradicts C-7: every modality grows it, the keyboard included |
| M-A1, M-B8 | C-1 (the bits do not compose `.tap-squish`; the class is deleted) |
| M-A2, M-A4 | C-26 |
| M-A3 | the `data-commit="a"\|"b"` attribute is gone: `data-commit`/`data-press` count 0 in every sibling, and the commit arms are the register's (C-21, C-22); the `transition` clause is C-21 |
| M-A6, M-B2 | C-4 |
| M-A7 | C-13, C-22, C-27 |
| M-A8 ("not built") | built since pass 2: C-1 |
| M-B1 | C-6 |
| M-B3, M-B4 | C-16; `VelocitySampler`'s move is internal |
| M-B5 ("not built: `useEngage` replacing `useLiquidPress`") | not built in any pass: `useLiquidPress` stays a public leaf (keyframes.js 3, speedtest 9, value.js 5 hits), `useEngage` is not exported. Nothing to migrate |
| M-B7 (`data-held="key"`) | superseded in pass 1 by P-E row 2: C-15 |
| M-B9, M-B10, M-B11 | C-21, C-22, C-26 |
| `pass-2/F5.md` "Migration", all seven lines | `data-held` present-empty: C-15; `--press-t`: C-20; `useDockHold`: C-29; the Button: C-21; keyboard `data-engaged`: C-7; `useDragMorph`: C-30; the veil selector split: C-4 |
| **P-E8 C-2** ("a touch's hold and a keyboard engagement promote it into the top layer … `popover="manual"` … `.engage-footprint` … `left`, `top`, `inline-size`, `block-size`, `transform`, `clip-path` and `mask-*`"; "keeps the look of its place: a scroller or card that clips, rounds, fades or scales it") | the promotion is deleted (Q-3′ (i)); the overclaim C-A8 and C-E8 found does not arise: the body is its place. C-2 states the bytes |
| **P-E8 C-9** ("paints whole above any scroller or card"; "floats over its slider wherever the slider sits") | it overclaimed (×2.000 under a scaled card, 90-92 % cut at the viewport's top). C-9 now names the transform it carries (scale, translation), the one it does not (rotation), and the viewport fallback |
| **P-E8 C-10** (`--held-scale-x/-y`) | deleted: C-10 |
| **P-E8 C-14** (the wheel over a promoted control scrolls the footprint's scroller) | no promotion, no wheel chain: C-14 |
| P-E8 C-16's "on and off the stage" | there is no off-stage carry path to distinguish: C-16 |
| the earlier retirements of P-E8 §6.2 (P-E2 rows 1, 2, 4, 5's loupe clause, 6, 9; E-M1, E-M4's veil clause, E-M5, E-M7, E-M8's `true` arm, M-24, M-23, M-25, M-1, M-7, M-9, P-A5 row 4, M-11, M-20 as P-A7 wrote it) | stand as P-E8 §6.2 gives their reasons; this table carries their successors |

## 7 · The owner-glance set (CK-25)

`capture.mjs` on the harness's own app, the candidate and the probe, both engines: nine class exemplars × rest, pressed, held, engaged, committed, released × light and dark × fine and coarse (216 frames per build and engine); CAP 18/0 on each run (Chromium 10.2 / 6.2; WebKit 7.1 / 9.5).

| what | path (under `pass-9/E9/glance/`) |
|---|---|
| candidate frames, sheets | `cand9/frames/cand9-{chromium,webkit}-{fine,coarse}-{light,dark}-<scene>-<state>.png`; sheets `cand9/cand9-{chromium,webkit}-{fine,coarse}.png` |
| probe frames, sheets | `probe9/frames/…`; sheets `probe9/probe9-{chromium,webkit}-{fine,coarse}.png` |
| **the lens under `scale: 0.8`, flush on its track** (CK-25's first cure) | `loupe/cand9/e13-{chromium,webkit}-clipstale-place-scale-{fine,coarse}-loupe.png` against `loupe/plant-nolens/…-place-scale-…` (×1.887, 39.4 px off in Chromium); untransformed and translated beside: `…-place-{none,translate}-…` |
| **the lens at the viewport's top, hung below its track** (CK-25's second cure) | `loupe/cand9/e13-{chromium,webkit}-clipstale-viewport-{fine,coarse}-loupe.png` against `loupe/plant-nolens/…-viewport-…` (7-9 of 76 rows) |
| the same two cells on the probe | `loupe/probe9/e13-{chromium,webkit}-clipstale-{place-scale,viewport}-…` |
| the lens at k max, light and dark; whole at the scroller's edge and mid-box; the tip | `loupe/cand9/e13-*-slider-*-loupe.png`, `…-clipstale-{edge,mid}-*-loupe-whole.png`, `e8-*-tip*.png` |

My reading of the frames (the gestalt is the critics'): under the scaled card the lens now sits on the track at the track's own size, the band reading as the same ruler at the same magnification it shows untransformed; at the viewport's top it turns under the track whole, rising from the track's lower edge, with nothing cut. In the CAP sheets the held slider's lens stands above the track and the capture frame (the scene's crop, not the page) trims its top, as in pass 8's sheets. The candidate's CAP rows otherwise read as pass 8's: committed Button ×1.059, Switch ×1.056, accordion ×1.039, held slider ×1.060, the sortable lift. The engaged control in place sits under a later positioned sibling, which no frame here composes (the stacking fact, for the critics' frame, `§P8-8.3`).

## 8 · Open gaps

1. **The idle cost's re-measure by a seat other than its builder** (O-103f (1)) is the critics'; this seat's own read is §3 (at the pass-8 bar, 0 layouts and recalcs).
2. **What no cell reads, either build:** the stacking difference (an engaged control under a later positioned sibling; the critics are asked to read it in a frame); a lens under a **rotated** ancestor (the lens is laid level at the track's scale, by design, and C-9 says so; no cell grades its angle); a lens trailing its track on a compositor scroll (the anchor carries it; the correction is scroll-invariant for an unscaled place, re-read the next frame under a scaled one, no film reads it); a touch film (macOS WebKit has no touch scrolling); WebKit's filter on any mode, Chromium's rotation on a pointer (H9 §2.1: REPORT).
3. **The two-sided feather has no library plant red in Chromium** (`cand8` reads 1.022 / 0.952 there; its under-paint is WebKit's). H9's fixture plants (`e10-featherunder`, `e10-rectclip-feather`) are the cell's red in both engines (H9 §2).
4. **`plant-noread` reds 14 of the 21 stale-place cells, not all**: the two `clipstale … pointer · reveal` cells and the five controls pass without the frame read. Pass 8 counted 16 red on its probe; the cause of the two reveal cells' pass on this plant was not read.
5. **The `e9-probe loop` gate's first form** excluded the 0-150 ms window after release, so `plant-loop` passed it (`logs/loop-plant-chromium.log`, 19:15: the exit clock ends inside that window). The gate now includes every window from the release on; the read of record is `logs/cand9-loop-chromium-*.log` / `loop-plant-chromium-*.log` (20:07-20:12) and the WebKit acquisition's.
6. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 9 · Process

- **Machine law.** Every build, test and browser run went through `~/.claude/guard/guarded`; `--light` only on the typecheck and the focused unit runs. Chromium ran one stage per guarded call; WebKit in **one** `--exclusive webkit --timeout 90` acquisition after the Chromium phase (its runner held the lock idle until `logs/chromium-done`), queued 19:16:59, admitted 21:37:22 (140 min: the 90-minute mark passed at about 20:47 with this seat still queued, and it kept waiting), 27 stages, released 22:31:32, exit 0.. One heavy run at a time; vitest `--maxWorkers=2`; one browser per run with a context per cell (the harness's lib); no GPU arguments; no guard refusal; the kernel zone never gated a run. Loads 4.4-13.7 across the seat (1-minute); no cell failed under load that passed on a re-read, or the reverse, so no NOT-REPRODUCED reading is needed.
- **Fences.** No tracked file in the checkout was edited; no git write in the checkout beyond `git worktree add` and `remove`. Checkout writes: `pass-9/P-E9.patch`, `pass-9/P-E9-probe.patch`, `pass-9/P-E9.md`, `pass-9/E9/`. Siblings were read by grep only (value.js by grep only). Nothing under `~/.claude` was read; `guarded` was executed.
- **Cleanup.** The worktree was removed (`git worktree remove --force`, exit 0, absent from `git worktree list`), with the empty `.claude/worktrees/bl/D5/p9/E9/` and `p9/` directories this seat created; the seat's scratch copies (archive trees for the apply checks) were deleted. The run markers (`logs/chromium-done`) were removed after the WebKit acquisition ended. No P-E9 process is left running (`pgrep` on the seat's runners: none); `git status` in the checkout shows no tracked change. WebKit retired its browser at 60 navigations nine times across the acquisition (`note webkit browser retired after 60 navigations (AppSSO wall, tile H3-1), relaunched`); no log prints an engine close, crash or HARNESS ERROR.
