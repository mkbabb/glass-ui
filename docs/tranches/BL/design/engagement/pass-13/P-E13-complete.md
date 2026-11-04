# D5 pass 13 · P-E13-complete: cand13 measured as built (REGISTRY §P13-8.2, wave c2)

| field | value |
|---|---|
| status | **COMPLETE.** Every stage of `E13/c1.txt` and `E13/wk-w1.txt` ran to its end on cand13 in both engines. So did every plant on its cells, the cost cell and the per-record cost beside cand12, cand11 and cand8, the two predicted paints and the glance set. No candidate byte was changed. **Two defects on cand13 are reported, not cured:** a Chromium-only clamp-scroller cut on CK-20 (§2.1), and the WebKit exit-side regression from cand11, now read on ca11 as well (§2.2). One harness-invocation defect was found and its cells re-read: E-2 ran without the ruled commit arms (§3). Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| model | `claude-opus-5-5`, asserted from own system identity. Two holders: the first started the seat at 03:00 and died at about 03:00-04:00 on a login expiry with no report. Its runners, list and builds survive, and its `all.sh` (PID 19798) ran on orphaned under `guarded`. The resumed holder (05:28) started no second run: it read `E13c/NOTES.txt`, the runners and the logs, waited on PID 19798 (gone at 08:21:39), read what it produced, and ran only the harness-reason re-reads and controls named in §3 |
| candidate | `P-E13.patch` shasum **`ffa64fc4054bf5368000f29bd3930b47743f115f`** (this seat, 05:28 and at the start, `NOTES.txt` 03:00). Src tree **`30f51077c3ec`** = REGISTRY §P13-2's. Comparison builds: cand12 `61f7b80ac552`, cand11 `6317ad295579`, cand8 `92f38f424df2`. Plants on cand13 (`E13/plants.py`, unchanged): level `c2695a446247`, child `78b8012b6d4f`, stale `4c718c3e2542`, noown `b53b2aece8d1`, typedom `2a88db2387df`, reachzero `cf805029101d`, each equal to `E13/logs/plants.txt`. After the builds: `da39a3ee5e6b` (HEAD). All built in ONE guarded call (`E13c/builds.sh`, `logs/builds.log`, 03:00-03:49, admission waited 49 min at load 11-21) in the worktree `.claude/worktrees/bl/D5/p13c/E13c/wt` at HEAD `ad509c105` (docs only past `d94e413dd`: `git diff --stat d94e413dd HEAD -- src tests demo` prints nothing) |
| harness | **`f2cc94e3fa86…`** (H13-complete's) in every stage log (88 header and footer lines). Scene app `9e34ffa5714e` |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5 (playwright 1.61.1), headless shell, no GPU arguments. Playwright WebKit is not Safari |
| rulings | INBOUND re-read at both holders' starts: mtime 2026-11-04 02:10, last rows **O-129** and **O-130** (value.js served-app review; aurora plate rung). Neither names a D5 cell or a CK row (`grep` of both rows for D5, CK-, engage: nothing). FORMATION-PROGRESS re-read to its 05:3x RESUME line. In force: O-103d (1)-(4), O-103f, Q-1 (c), Q-4 (b), O-118 (3), O-87. **O-103d (1) (Q-5 = arm (ii)) bears on how E-2 is invoked** (§3) |
| records | `pass-13/E13c/`: `NOTES.txt` (process, in order), runners `builds.sh`, `run-e13c.sh`, `c-run.sh`, `c-queue.sh`, `wk-run.sh`, `wk-queue.sh`, `all.sh`, lists `c1.txt`, `c1b.txt`, `wk.txt`, additions `rec13.mjs`, `paint13.mjs`; `logs/` (one log per stage, engine and argument hash; `c1.log`, `wk-queue.log`, `all.log`, `builds.log`), `json/`, `glance/` (24 PNG; `glance/rr/` empty, the exit-side probe wrote no frames) |

## 0 · In brief

1. **CK-21 holds on every cell c2's lists drive, in both engines.** E-11 reads 214/0 on its new parts and 261/0/5 whole in both engines. The 5 UNMEASURED are the standing "token not read on this path" set. **The default-token census is 31/31 in both engines.** Pass 12's false `--spring-panel-duration` error (19 of 31 scenes in WebKit on cand12, H13-complete §4) is gone. The `typedom` plant brings it back: 23 of 31 in WebKit, 4 of 31 in Chromium. That does not close CK-21. §P13-2 rows 9-12 (the `calc()` fragments, F7's transition on the read element, `--motion-tempo` ≤ 0, the context-relative gutter) are not among c2's cells and stay open for c3.
2. **CK-20: cand13 passes every H13 member but one in Chromium, and every member in WebKit.** E-10 `hg13` reads 89/1 in Chromium and 90/0 in WebKit; whole it reads 217/1 and 213/0. The one Chromium fail is `scroll · clamp scroller · remove below · none`: **21.85 px on the act's frame, 4 of 4 reads, two of them at a 1-minute load of 8.6 and 9.4** (§2.1). cand12 reads 40.00 px there (H13-complete §4), and WebKit reads 0.00. **WebKit's three anchor-insert cells pass on cand13 (0.00 px)**, where the clean fixture fails them (H13-complete §3.2). cand13 anchors on the act's frame, as HEAD does there.
3. **CK-20 in paint: both predicted paints of §P13-5 are real on the built candidate, in both engines.** First, the loupe under `rotate: 10deg` paints 147.6 × 331.1 px over a 140 × 76 layout box: `--lens-sy` **×4.3571** against cand12's ×1.0600 (§P13-2 row 2; on this scene's track, not C-A13's 300 × 6). Second, the held slider under a card whose inline `translate` a page loop writes every frame **comes apart from its card**: up to **36.79 px** in Chromium (median 19.91, 139 of 145 frames over 2 px) and **38.69 px** in WebKit (median 18.69, 69 of 73). cand12 reads 0.00 px in both (§P13-2 row 1). Both are regressions from cand12, now in paint (§4).
4. **The WebKit exit-side regression from cand11 reproduces again, below load 8** (§2.2): `ce11` fails in each of two rounds (zoom125 21.9 px, then `none` 20.9 px), and **`ca11` now fails once on cand13** (zoom125 100.5 px against 18.6 + 4). H13-complete read `ca11` 3 of 3 clean on cand13.
5. **CPU per frame (CK-23): cand13 costs less than cand12 and cand11 held still, and 0.01-0.02 ms a frame above cand8.** The per-record cost of the observer and the token read is below the instruments' floor (§5).
6. **E-2 (CK-02, CK-03) reads 164/0 in both engines under the ruled arms.** E13's list invoked it without `--commit-arms i,ii`, which O-103d (1) and pass 12's runners use. Run that way, both cand13 and cand12 read the same 75 fails in WebKit, which is a harness reason (§3).

## 1 · What ran

**Chromium**, named guarded batches (`c-queue.sh`, `c-run.sh`; batching under §P12-7 item 11, since the builds waited 49 min for admission). The whole of `c1.txt` ran: E13/c1.txt's 15 stages in order and unchanged, then `rec` and `paint` (the seat's additions for §P13-7 item 10 and §P13-5), then two re-reads of the E-10 clamp cell (load rule).
- **C-1** queued 03:49:58, admitted 03:56:54 (load 16.9), ran 5 stages; stopped by the 50-min rule at 04:50:24.
- **C-2** 04:50:29-05:11:32 (load 8.3-9.4), ran 14 stages.
- **C-3** 08:21:52-08:28:19 (`c1b.txt`, load 8.9-11.5): E-2 under the ruled arms, cand13 then cand12 (§3).

**WebKit**, one lock planned as named acquisitions before the start (`wk-queue.sh`, `wk-run.sh`; no stage starts after 80 min). `wk.txt` is E13/wk-w1.txt's 18 stages in order and unchanged, plus `rec`, `paint` and three E-2 lines added in flight by atomic rename (`NOTES.txt` 05:3x, 06:3x, 08:1x).
- **WK-1** admitted 05:11:37 with no wait. It ran 19 stages to 06:32:01 and stopped by the 80-min rule with 2 left.
- **WK-2** queued 06:32:05 and admitted 08:06:47: **a 94.7-min lock wait, past 90 min, recorded at 08:04 and waited out.** No cell was returned UNMEASURED for the lock. It ran 4 stages; guard exit 0 at 08:21:39.
- The browser retired at 60 navigations six times (H3-1). No log prints an engine close.

`cost webkit` prints no cell: C-E11's cost cell is CDP, Chromium only (recorded in `wk.txt`'s header). WebKit's cost is the in-page `rec` cells (§5).

## 2 · Per CK row, cand13, as read here

"Read here" means a stage of c2's lists. Rows c2's lists do not drive are marked **not read by c2**; they are c3's replay (§P13-8.2). Loads are 1-minute loads at the stage's start and end.

| row | witness | Chromium (load) | WebKit (load) | reading |
|---|---|---|---|---|
| CK-01, 17, 19, 25's ambient clause | — | not read by c2 | not read by c2 | ◇ D2, D3 (§P13-6) |
| **CK-02** commit by one arm | E-2 under `--commit-arms i,ii` (O-103d (1)) | **164/0** (8.9-10.3); cand12 164/0 (8.9-11.5) | **164/0** (10.7-9.6) | holds on cand13. Under the default arms (i,iii) the light arm (iii) fails both builds identically (§3) |
| **CK-03** mount and arrival | E-2's `mount`, `arrival·pre/own/ownflush/late` cells | inside the 164/0 | inside the 164/0 | holds |
| **CK-04** the held slider | E-3 | **22/0** (8.3-8.4) | **22/0** (15.8-16.6) | holds |
| CK-04 / CK-25 the loupe | E-13 | **36/0** (8.4-8.3) | **36/0** (16.6-17.5) | holds on E-13's cells. The loupe under a rotated card is §4's paint, outside E-13's cells |
| CK-05..14, 16, 18, 24, 26 | — | not read by c2 | not read by c2 | unscored on cand13 (§P13-2). CK-26 stands on the bytes (three private `@property` registrations, P-E13 §6), not re-read |
| CK-15 the hand-off | inside E-10 whole | inside 217/1 | inside 213/0 | no hand-off cell fails |
| **CK-20** D-1 on every path | E-10 `hg13` | **89/1** (16.9-14.3) | **90/0** (6.8-10.2) | **OPEN.** Chromium: the clamp-scroller cut (§2.1). Both engines: the two paints of §4. WebKit: the exit-side regression (§2.2). WebKit anchoring passes on cand13 (§2.1) |
| CK-20 | E-10 whole | **217/1** (14.3-15.2), the same cell | **213/0** (6.6-9.8) | as above |
| CK-20 | exit-side re-reads | — | ce11 ✗ ✗, ca11 ✗ (all admitted below load 8) | §2.2 |
| **CK-21** no silent degradation | E-11 `forms,tokens,census,reachin` | **214/0** (15.2-13.2) | **214/0** (9.2-6.8) | holds on these cells. Census **31/31** both engines; reach input 4/4 both engines |
| CK-21 | E-11 whole | **261/0/5** (13.5-10.2) | **261/0/5** (9.8-16.7) | the 5 UNMEASURED are "the token is not read on this path" (`--scale-commit-pop`, `--scale-press` ×3, `--scale-engage` on the commit). REPORT: `calc(infinity * 1s)` and `1e-3s` NOT TAKEN, the stated non-counterexamples (§P12-2). **Still OPEN** on §P13-2 rows 9-12, which c2's cells do not drive |
| CK-22 MIGRATION | — | — | — | no measurement row. Bearing on it: C-2's "under every transform between the control and the page" is false in paint under `rotate` (§4, the loupe). "An insert the browser anchors paints still" holds in both engines. "A scroll offset a removal clamps is glided" is false in Chromium for the inner scroller (§2.1) |
| **CK-23** cost | cost, rec | §5 | §5 (rec only) | CPU per frame measured. numstat as P-E13 §2 (not re-read) |
| **CK-27** gates fail on plants | the six plants | all red on their cells (§6) | all red on their cells (§6) | holds for c2's plants |

### 2.1 · CK-20, the Chromium clamp-scroller cut (cand13 defect, reported)

`E-10 slider scroll · clamp scroller · remove below · none · overflow-anchor none`. A 40 px block below the held slider is removed inside a scroller whose `scrollTop` the removal clamps (408 → 368). The root's paint moves 40.0 px in all; the glide runs (210 ms). The fail:
- On the act's frame the root is **21.85 px** from where it was painted (bound ≤ 0.5).
- Path from the frame before: `[0.0, 21.9, 22.1, 22.8, 23.7]`. The largest move over any 16.7 ms is 22.0 px (bound 6.5) in three reads; in the whole-witness read it is 2.6 px, after the same 21.85 px first frame.

| read | log | load (start/end) |
|---|---|---|
| `--part hg13` | `cand13-E-10-chromium-da1764.log` | 16.9 / 14.3 |
| whole | `cand13-E-10-chromium.log` | 14.3 / 15.2 |
| `--hg13 scroll --rr 1` | `-b7a2e4.log` | **8.6 / 9.4** |
| `--hg13 scroll --rr 2` | `-245b86.log` | **9.4 / 8.9** |

It is reproduced, not a load effect. The same reads pass `clamp page · remove below` (scrollY 688 → 648, 0.00 px on the act's frame). WebKit passes the scroller cell at 0.00 px on both of its reads. The clean fixture passes both clamps in Chromium (H13-complete §3). cand12 reads 40.00 px here (H13-complete §4), so cand13 cures about half of the move, in Chromium only. CK-20, P-E14's.

**WebKit anchoring, read against H13-complete §3.2.** On cand13 in WebKit, `anchor page · insert above · none`, `· scale 0.8`, `anchor scroller · insert above` and both `remove above` read 0.00 px, with the root's paint unmoved, in both `hg13` and whole. So the fixture's open WebKit defect is not the candidate's: cand13 behaves as HEAD does there (anchoring on the act's frame). The glance agrees (`cand13-webkit-anchor-page-insert-act.png`, 0.00 px). The harness item stays with H14 (H13-complete §8 item 3).

### 2.2 · CK-20, the WebKit exit-side cell on cand13 (regression from cand11, reported)

`wk-w1.txt`'s three re-reads, each held by its own load gate until the 1-minute load was below 8:

| read | waited | `none` (bound 15.1) | `zoom125` (bound 18.6) | load |
|---|---|---|---|---|
| ce11 round 1 (`rr-cand13-ce11-webkit-0fae8f.log`) | 120 s | 10.9 ✓ | **21.9 ✗** | 8.0 → 7.5 |
| ce11 round 2 (`-453e55.log`) | 0 s | **20.9 ✗** | 14.2 ✓ | 7.5 → 7.2 |
| ca11 round 1 (`rr-cand13-ca11-webkit-095c20.log`) | 0 s | 17.8 ✓ (bound 15.1 + 4) | **100.5 ✗** (18.6 + 4) | 7.2 → 6.6 |

With H13-complete §5 (cand13 ce11 fails in each of 3 rounds; cand11 6 of 6 clean), the ce11 regression is read **5 of 5 rounds** on cand13. The ca11 zoom125 fail (100.5 px) is new against H13-complete's 3 clean ca11 rounds on cand13. A step that large has been read once before, on cand12 at pass 12 (104.7 px at load 11.1, C-A12). This one was read below load 8, once. Reported under CK-20, P-E14's.

## 3 · The harness-invocation defect: E-2's arms (found and re-read)

`E13/c1.txt`'s `cand13-E-2 chromium` read **98/66** (load 10.2 → 8.5) and `wk-w1.txt`'s `cand13-E-2 webkit` read **89/75** (16.7 → 14.5). Every fail is `arm none of [i,iii]`: arm (iii)'s light rise is 0.0000-0.0056 against ≥ 0.01. Arm (ii), printed beside it, is 1.20-2.64 px against > 0.8 on every failing cell.

- **The control:** `cand12-E-2 webkit` (08:07, load 10.8 → 8.8) read **89/75, the same fail set cell for cell** (`diff` of the two sorted fail lists: empty). A cand13 re-read at 8.8-10.7 (`--rr 1`) read 89/75 again.
- **The cause is the invocation.** `harness/e2-commit.mjs:11-12` defaults to arms i,iii and prints "arm ii printed, not admitted: Q-5 unruled". Q-5 is ruled: **O-103d (1), "Q-5 = arm (ii), the geometric pop"** (REGISTRY §P6). Pass 12's critics passed `--commit-arms i,ii` (`pass-12/C-A12/scripts/run.sh:37`, `pass-12/C-E12/scripts/run.sh:63`; C-A12's cand12 E-2 log reads "admitted commit arms: i,ii", 164/0 both engines). `E13/c1.txt` and `wk-w1.txt` name E-2 with no arms, and this seat's runner (H13c's form) adds none.
- **Re-read under the ruled arms** (a harness reason, so a permitted re-run):
  - `cand13-E-2 webkit --commit-arms i,ii`: **164/0** (load 10.7 → 9.6), in WK-2. It replaced the not-yet-started `--rr 2` by atomic rename, `NOTES.txt` 08:1x.
  - `cand13-E-2 chromium --commit-arms i,ii`: **164/0** (10.3 → 8.9), in C-3.
  - `cand12-E-2 chromium --commit-arms i,ii`: **164/0** (8.9 → 11.5), in C-3.
- **For H14 (the harness's owner), not cured here:** `e2-commit.mjs`'s default and its "Q-5 unruled" line are stale against O-103d (1). Any list that names E-2 without the flag reads the light arm as the commit's arm. **REPORT:** on cand13 and cand12 alike, arm (iii) does not carry the commit in either engine (light rise ≤ 0.0056).

## 4 · The glance set and the two predicted paints (CK-25 frames, REPORT)

`E13c/glance/`: 24 PNG. They are REPORT stills for c3 to grade; they are not scored here.

**H13's three still members** (`glance-cand13`, `e10-continuity.mjs --part hg13still`; the mutation's frame with the glide paused where it stood):

| still | Chromium (load 9.0) | WebKit (load 15.7) | frames |
|---|---|---|---|
| rotate10-outside | 0.00 px | 0.00 px | `cand13-{chromium,webkit}-rotate10-outside-{before,act}.png` |
| anchor-page-insert | 0.00 px | 0.00 px | `cand13-*-anchor-page-insert-*.png` |
| dialog-insert | 0.00 px | 0.00 px | `cand13-*-dialog-insert-*.png` |

These reproduce H13-complete §6's cand13 column in both engines.

**§P13-5's two predicted paints** (`paint13.mjs`, the E-13 slider scene, its card the slider's parent; cand12 beside cand13 in the same run):

| paint | cand12 Chromium | cand13 Chromium | cand12 WebKit | cand13 WebKit | frames |
|---|---|---|---|---|---|
| lens · none | 148.4 × 80.6 over 140 × 76 (×1.0600, ×1.0600) | the same | the same | the same | `*-lens-none.png` |
| **lens · rotate 10deg** | ×1.0600, ×1.0600 | **147.6 × 331.1 (×1.0541, ×4.3571)**, `--lens-sy "4.3571"` | ×1.0600, ×1.0600 | **×1.0541, ×4.3571** | `*-lens-rotate10.png` |
| carry · still (no loop) | 0.00 px | 0.00 px | 0.00 px | 0.00 px | — |
| **carry · script** (inline `translate`, 30 px sine, 600 ms) | 0.00 px | **max 36.79, median 19.91; 139 of 145 frames over 2 px** | 0.00 px | **max 38.69, median 18.69; 69 of 73 frames over 2 px** | `*-carry-script.png` |

Loads: Chromium 8.4-8.8, WebKit 9.8-11.4.

In the frames (cand13 Chromium, read by this seat):
- `cand13-chromium-lens-rotate10.png`: the loupe stands upright under the tilted track as a tall pill about four times its height, its readout cropped in a column. The track it magnifies is tilted. That is a broken object, not a refinement (O-87).
- `cand13-chromium-carry-script.png`: the held loupe floats above the track, apart from the card that holds it. This is C-E13's "a held object coming apart from what holds it", now a frame.

Both are regressions from cand12 (§P13-2 rows 1 and 2), now in paint in both engines. The lens figure is ×4.36 on this scene's track; C-A13's ×9.67 was on a 300 × 6 track, and the ratio depends on the track's aspect, as row 2 says.

## 5 · Cost (CK-23; §P13-7 item 10)

**CPU per frame, C-E11's cost cell, Chromium (CDP), two rounds per build, interleaved, load 7.0-9.4** (`logs/cost-chromium.log`). The figure is script ms a frame held still (task ms a frame in brackets), each over about 361 frames; 0 layouts/s and 0 recalcs/s in every window.

| build | none | zoom125 | deep | rest (all paths) |
|---|---|---|---|---|
| cand8 | 0.050 / 0.043 (0.107 / 0.103) | 0.052 / 0.044 (0.113 / 0.104) | 0.048 / 0.045 (0.110 / 0.106) | 0.012-0.013 |
| cand11 | 0.074 / 0.078 (0.136 / 0.143) | 0.072 / 0.070 (0.129 / 0.127) | 0.125 / 0.106 (0.197 / 0.168) | 0.013-0.014 |
| cand12 | 0.082 / 0.077 (0.149 / 0.143) | 0.085 / 0.074 (0.151 / 0.133) | 0.113 / 0.119 (0.181 / 0.188) | 0.013-0.025 |
| **cand13** | **0.064 / 0.053** (0.125 / 0.103) | **0.060 / 0.058** (0.114 / 0.113) | **0.066 / 0.063** (0.122 / 0.118) | 0.012-0.014 |

Held still, cand13 is below cand12 and cand11 on every path. The gap is largest on `deep` (0.063-0.066 against 0.106-0.125), where P-E13 removed the per-frame ancestor walk (P-E13 §5). cand13 sits 0.01-0.02 ms a frame above cand8. At rest every build is the same (0.012-0.025).

**The per-record cost** (`rec13.mjs`, REPORT, cand8 / cand11 / cand12 / cand13 twice each, interleaved; Chromium load 7.6-9.5, WebKit 12.9-15.9):

- **In-page batch, 200 attribute or 200 text records in one task outside the held control, 15 rounds, rest against held.**
  - Chromium: every build reads a held − rest median of −0.50 to +0.50 µs a record. That is the instrument floor: `performance.now()` resolves 0.1 ms here, and 0.1 ms over 200 records is 0.5 µs.
  - WebKit: every build reads 0.00 µs a record, except one cand11 and one cand12 text round at −5.00 µs. WebKit resolves 1 ms, so the floor is 5 µs a record.
  - **So the observer's per-record cost is below 0.5 µs in Chromium and below 5 µs in WebKit, on every build.** cand13 hears attribute and text records, and cand12 heard child lists only, but the cost does not separate at this resolution.
- **A page writer during a hold** (Chromium CDP, 10 attribute records a frame on an outside element, 3 s): held still with the writer, minus held still alone, is
  - cand13 +0.007 / +0.003 ms a frame (0.062 → 0.069, 0.058 → 0.061), so about 0.3-0.7 µs a record;
  - cand12 0.000 / −0.002; cand11 +0.002 / −0.001; cand8 −0.001 / +0.006.
  cand13's addition sits inside the spread the other builds show.
- **The arming** (press to +400 ms, every `style` record in the document):
  - Token reads (a removal whose old value carried `--engage-read-`): **1 per press on cand13** in both engines (at +1.5 to +3 ms, on `span.glass-slider`), 0 on the others. C-E13 CK-23's "about 10 per arming frame" is not read on this scene.
  - Style records: cand13 75 / 82 against cand12 79 / 77, cand11 80 / 78, cand8 7 (Chromium); 44 / 45 against 37 / 44, 45 / 45 and 7 (WebKit).
  - **Residue:** elements that had no `style` attribute before the press and carry one 800 ms after the release: **0 on every build, both engines.** Whether the read host had a `style` attribute before the press is not printed (§7 item 4).

## 6 · The plants, each on its cells (CK-27)

| plant (`E13/plants.py`) | cells | Chromium (load) | WebKit (load) | red where it must be |
|---|---|---|---|---|
| level (axis lengths) | E-10 `hg13 xf` | 46 / **12** (8.3-7.6) | 46 / **12** (14.7-11.8) | the 12 rotate and matrix cells (outside, inside, nested × rotate, rotate centre, rotate + scale, matrix) |
| child (child list only) | E-10 `hg13 kind` | 6 / **12** (7.6-7.7) | 6 / **12** (12.0-12.3) | style, class, hidden, text × none, scale 0.8, rotate 10deg |
| stale (painted read only on events) | E-10 `hg13 anim` | 0 / **3** (7.7) | 0 / **3** (12.3-11.5) | css-transition scale, WAAPI rotate, WAAPI translate (0.31-0.80 px across the mutation) |
| noown (the stage hears itself) | E-10 `hg13 reentry` | 1 / **1** (7.5-7.7) | 1 / **1** (11.5-11.0) | `reentry`: records delivered that the harness did not make |
| typedom (Typed OM read) | E-11 `forms,census` | 100 / **13** (7.7-8.6): census 4 of 31, `round()`/`abs()` NOT TAKEN 6, clean travel 3 | 57 / **56** (10.2-14.7): **census 23 of 31** (`--spring-panel-duration is unreadable on the host`), math forms NOT TAKEN 30, clean travel 3 | pass 12's WebKit regression and the math forms |
| reachzero (refused reach writes 0) | E-11 `reachin` | 3 / **1** (8.5-7.8) | 3 / **1** (14.7) | `--space-section nonsense`: THE PAINT CONTRADICTS THE MESSAGE |

Each plant is red on its own cells, and the clean candidate passes those cells (§2).

## 7 · Open gaps

1. **CK-20, CK-21 and CK-22 stay OPEN on cand13.** CK-20: §2.1, §2.2 and §4's two paints, plus §P13-2 rows 3-8, which c2's cells do not drive. CK-21: §P13-2 rows 9-12. CK-22: the sentences §2 names. c2 grades none of them closed; c3 scores.
2. **The rows c2's lists do not drive** (CK-05..14, 16, 18, 24, 26) are unscored on cand13 and owe c3's replay in both engines.
3. **The E-2 default (§3)** belongs to the harness's owner (H14): a stale "Q-5 unruled" default makes any list that omits `--commit-arms i,ii` read the light arm.
4. **The residue cell (§5)** reads 0 on this scene but does not print whether the read host carried a `style` attribute before the press. A host with no `style` attribute is c3's to drive for §P13-7 item 10's `style=""` member.
5. **The clean fixture's WebKit anchor-insert cells** stay open with H14 (H13-complete §3.2). cand13 passes them (§2.1).
6. **The `ca11 exit-side · zoom125` 100.5 px** was read once below load 8. A second read is c3's (it drives every exit-side path pass 12's critics found).
7. **WebKit CPU per frame** has no instrument (CDP is Chromium only). WebKit's cost here is the in-page `rec` cells, at 1 ms resolution.
8. **JSON overwrite:** a later read of the same stage and engine overwrites the earlier JSON (`json/cand13-E-2-*`, `json/cand13-E-11-webkit` now hold the last read). The logs are distinct per argument hash and are the record.
9. **Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row.

## 8 · Process

- **Machine law.** Every build and browser run went through `~/.claude/guard/guarded`. Chromium ran in named batches C-1..C-3 with `--timeout 90` or `60`, never `--light`. WebKit ran in two `--exclusive webkit --timeout 90` acquisitions, planned as named before the start. One heavy run at a time: C-3 started after `all.sh` ended. Headless shell, no GPU arguments, no browser MCP. One browser per battery with a context per cell (the harness's `witness()`/`openPage()`; `rec13.mjs` and `paint13.mjs` close every page and context in a `finally`).
- **The zone flag.** `guarded` printed "the kernel zone leak is ARMED (… inuse=30389 …)" at every admission and never refused a run. Per the owner's 2026-11-03 order it did not hold this seat.
- **Fences.** Nothing under `~/.claude` was read by the resumed holder; the guard was only executed. The first holder recorded one slip (`NOTES.txt` 03:2x: `ls ~/.claude/guard/runs | wc -l`, a count, no content). There was no source edit and no git write in the checkout. The writes are this file and `pass-13/E13c/` (logs, JSON, stills, `NOTES.txt`, `c1b.txt`, and `wk.txt` by atomic rename). No sibling repo was touched. Waiters used `kill -0` on PID 19798 and read the done files; no `pgrep -f`.
- **Cleanup.** At 08:29 the worktree was removed by `git worktree remove --force`, and its empty parents `p13c/E13c` and `p13c` by `rmdir`. `git worktree list` shows no E13c entry, and no process of this seat is running.
- **Reading.** REGISTRY.md was read in chunks: the pass-13 part (3223-3430) and the pass-12 part (2969-3221) in full, §P1-6 (283-330) and O-87 (127-139). Round 0 and passes 1-11 beyond those were left unread, and nothing here rests on them. Also read: H13-complete.md in full; P-E13.md §1.5 and §4-§9 and its header; `E13/c1.txt`, `wk-w1.txt` and `plants.py`; every E13c runner; `rec13.mjs` and `paint13.mjs` headers; `e2-commit.mjs`'s arm lines; pass 12's runner lines for `--commit-arms`; INBOUND rows O-120..O-130; the FORMATION-PROGRESS tail. Not read: CHARTER.md's design-loop section, C-A13.md, C-E13.md and `held-battery.txt` in full (c2 measures and grades nothing against them; §P13-2 and §P13-4 carry their findings).
- **Records** are untracked or modified under `pass-13/E13c/` (`git status`). The orchestrator commits them.
