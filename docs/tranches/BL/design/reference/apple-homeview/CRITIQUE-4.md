# O-95 critique, round 4: GAP (amend 4) against the frozen checklist K-1..K-10

Seat: REF2/crit4, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 01:40–02:00 EDT. I wrote nothing under `apple-homeview/` before this report. My only writes are this file and `critique4/`.

**What I read.** First `GAP.md` §9, the A4 change log (working tree; A4 and `amend4/` are not yet committed). Then GAP §0 (the A4 instruments), the cells A4 touched (P-04, P-12, P-13, P-14, R-04, R-02, P-18, P-21a, P-23, M-05, M-08), §3, §5 and §6. I also read `CRITIQUE-3.md`, REMEASURE R-04 and the A4 tools: `entrance4.py`, `worm4.py` and `misc4.py` in full, plus the `g4probe.mjs` and `a4probe.mjs` headers. In the waves I read `W-F.3.md` §1–§5 and appendix G3, and `W-F.1.md` §1, §3 items 1–2, §5 and appendix A, rows G1, G2 and G4 (`:166-186`).

**Method.** No browser, no build and no worktree. Each check reads the committed and the A4 raw runs with code I wrote. Where a check needs a counterfactual on the worm, it runs `amend3/tools/worm_sim.py`'s `simulate` (the part above `OUT = {`). The frame-drop counterfactuals use an integrator and a closed-form stepper written in `critique4/tools/`.

| Tool (`critique4/tools/`) | Output (`critique4/data/`) | What it does |
|---|---|---|
| `rederive4.py` | `rederive4.json` | runs one reader per K-row: R-02's W1–W3 on the measured legs and the simulated cures, M-08's blocks, F1-G4's regex read from `W-F.1.md`, P-21a's jumps, Apple's entrance channels with my own damped-oscillator fits, E0, NR and T on the plants, M-05's sweep order, and the K-8 spot rows |
| `clamp_sweep.py` | `clamp-sweep.json` | M-08's block arm against W-F.1's closed-form stepper with a kept clamp of 20–401 ms |

Every Python ran under `guarded --light --rss-gb 2 --timeout 5|10` with `-I -B`, and no `__pycache__` was written. The 1-min load was 26.6–38.4 (`uptime`, 01:43–01:49). None of my numbers is a timing measurement. Every time below comes from a sample whose load is in its file's `meta`, given beside it. For K-8 I also re-ran `critique3/tools/rederive3.py` in a scratch root that symlinks the committed data. Its output is identical to the committed `critique3/data/rederive3.json` (36 of 36 keys). To re-run, from `apple-homeview/`: `python3 -I -B critique4/tools/rederive4.py && python3 -I -B critique4/tools/clamp_sweep.py`.

**Verdict: AMEND.** Nine of the ten K-rows pass. K-3 fails. M-08's A4 block arm passes W-F.1's closed-form stepper when it keeps a renamed clamp of 200 ms or more. GAP says only a clamp above 400 ms escapes, and it sends that residual to F1-G4, a grep for four literals that GAP's own §5 says a renamed clamp passes.

## K-rows

| K | Row | PASS / FAIL | Decided by |
|---|---|---|---|
| K-1 | R-02: addendum withdrawn, in-flight retarget legs, continuity clause | **PASS** | `amend4/data/gui/retarget-mf-r1/r2-1440` (load 23.5–40.9), see §1 |
| K-2 | CR-03: the E1 limit and the F1-G1/G2 routing struck; a pasted `linear()` fails | **PASS** | `enter3-*-h500-plant-{linear,token,rafspring}`, `enter3-below-*-k2-plant-*` (1-min load 7.4–11.1), see §2 |
| K-3 | M-08: the runtime arm must fail a renamed, raised clamp | **FAIL** | `block-r1-1440-b{0,45,150,400}` (load 41.9–56.5), `critique4/data/clamp-sweep.json`, `W-F.1.md:185`, see §3 |
| K-4 | P-21a: an unguarded witness that fails HEAD | **PASS** | `jump4-r1/r2-1440` (1-min load 20.7–26.0), `amend3/data/gui/jump-noecho-r1`, see §4 |
| K-5 | R-04, with P-12/P-13/P-14 read by the entrance witness | **PASS** | `amend4/data/apple/intro-*` (5 runs, 1-min load 13.2–19.4), see §5 |
| K-6 | E0 and never-replays computed by a tool | **PASS** | `entrance4.py` E0 and NR on the wheel, jump and out-and-back runs, see §5 |
| K-7 | a worm-length continuity clause | **PASS** | W3 in R-02 and P-18; `retarget-mf`; `samples/timeline-ended.csv`, see §1 and §6 |
| K-8 | every MATCH or EXCEED row re-derives from committed samples | **PASS** | verdict-column diff `c97302260` → working tree; `rederive3.py` re-run identical; spot rows, see §7 |
| K-9 | goo, breath and momentum follow from the samples | **PASS** | §3 of GAP against the files in §1–§7 |
| K-10 | every SHORT or ABSENT routing names an owning wave or loop | **PASS** | `W-F.3.md:46`, `W-F.1.md:85-93`, CR-01 and CR-03 placements, `grep -l entrance waves/*.md` = W-0.4, W-K.7, W-L.2 |

### 1 · K-1 (R-02) and K-7 (continuity): PASS

My witness code (`rederive4.json` → `K-1/K-7 R-02`) runs on each leg's measured clock. Its results:

| Leg (retarget after launch) | Lead at retarget | Length | HEAD measured | Latest drive (A3) | Chain origin | Chain origin + monotone trail |
|---|---|---|---|---|---|---|
| r1 51 ms | 621 px/s | 30.8 px | FAIL (W1 24.6, W2 trail 21.47, W3 +20.47) | FAIL W3 +16.88 (length −21.7 in a frame) | PASS | PASS |
| r1 86 ms | 294 | 25.9 | FAIL | FAIL W3 +19.61 (−22.8) | FAIL W2 6.46 | PASS |
| r1 126 ms | 137 | 14.0 | FAIL | FAIL W3 +9.01 (−11.9) | FAIL W2 9.41 | PASS |
| r1 251 ms | 8.7 | 0.69 | FAIL | PASS | FAIL W2 13.47 | PASS |
| r2 46 ms | 403 | 30.8 | FAIL | FAIL W3 +12.36 (−18.4) | FAIL W3 +0.04 | FAIL W3 +0.04 |
| r2 81 ms | 306 | 26.2 | FAIL | FAIL W3 +19.95 (−23.7) | FAIL W2 7.14 | PASS |
| r2 120 ms | 124 | 16.0 | FAIL | FAIL W3 +10.08 (−13.2) | FAIL W2 9.26 | PASS |
| r2 251 ms | 8.9 | 0.68 | FAIL | PASS | FAIL W2 12.72 | PASS |

HEAD's integrator reproduces the measured bodies, with median errors of 0.18–0.59 px. The launch frame steps the length 24.66 px against a 3.19 px lead step on all eight legs. Each of GAP's numbers follows:
- 621/403, 294/306, 137/124 and 9 px/s
- the collapse of 11.9–24.0 px
- 7 of 8 legs for the candidate, which misses by 0.04 px
- 24.7 against 3.2 px

The A3 addendum is withdrawn. The witness carries legs at 46–51 and 81–86 ms with the lead at 294–621 px/s, and its W3 fails the reading CRITIQUE-3 refuted. So the witness now sees the snap, and the routing names cure 4's `trailOffset` bound. K-7: W3 is stated in R-02 and bound on P-18. Apple's reference reproduces from `samples/timeline-ended.csv`: a dot's width changes by up to 9.53 px in one frame, while the summed excess changes by 0.01 px per frame.

### 2 · K-2 (CR-03 E1 and the routing): PASS

- The A3 limit sentence and the F1-G1/G2 routing are struck in P-04 and in §5.
- My fit of the `linear` plant's rise to the Apple row gives 0.24 % (jump), 0.19 % (wheel) and 0.20 % (carousel 2 from below). `entrance4.json` reads 0.21–0.24 %, and E1–E4 PASS, so a pasted `linear()` does pass E1.
- **T, my reader.** The `linear` plant's only geometric Animation is `__plantRise`: a `DocumentTimeline`, 1600 ms, with an easing equal to no `--spring-*` token, so it FAILs. The `token` plant's easing equals `--spring-panel` stop for stop, and its 450 ms equals `--spring-panel-duration`, so it PASSes. Its rise fits `panel` at 0.04–0.05 %. The `cascade` plant runs on a `ViewTimeline` and FAILs.
- The source clause, which covers T's script-driven branch and a script that interpolates pasted stops, is owned by CR-03's placement seat. So a pasted curve fails T at runtime or the source clause in its files.

### 3 · K-3 (M-08): FAIL

**What reproduces.** The block lengths are 45.2–45.4, 150.2–150.5 and 400.2–400.3 ms. HEAD's lead against the block-free run, at equal time:
- the 45 ms block passes at every post-block frame within the 8.4 ms shift
- after the 150 ms block it is off by 8.54 / 35.67 / 40.73 px
- after the 400 ms block it is off by 12.78 / 32.48 / 57.69 px

My own 8-substep Euler gives:
- 150 ms block: clamp 40 misses by 8.70 / 33.33 / 41.87 px, clamp 60 by 5.75 / 22.37 / 28.17, and clamp 200 or no clamp by 1.03 / 3.40 / 4.64
- 400 ms block: the unclamped Euler diverges, missing by 59.8 / 126.8 / 310.6 px

These match GAP.

**Why it fails.** The tree the arm must catch is W-F.1's cure, the closed-form `springStepper`, with a clamp kept under a new name. GAP's A4 simulations clamp HEAD's Euler instead. With 150 ms and the clamp at 200, that Euler misses by 1.03 px against a 1.0 px tolerance, and the miss is the Euler's own truncation, not the clamp: the no-clamp Euler misses by the same 1.03 px. On the closed form (`clamp-sweep.json`):

| Block | Hop progress at block start → end | Smallest kept clamp that passes all three hops |
|---|---|---|
| 45 ms (one-shot) | 0.14–0.20 → 0.51–0.56 | 50 ms |
| 150 ms | 0.14–0.19 → 0.94–0.95 | 140 ms |
| 400 ms | 0.15–0.20 → **1.0006–1.0007** | 200 ms |

The 400 ms block outlasts the hop. The `dock` row settles in about 300 ms, so a clamp that loses the end of the block loses time only after the worm has landed:

| Closed form, clamp kept | 400 ms block: miss | Measured witness bound | Simulation tolerance |
|---|---|---|---|
| 200 ms | 0.115 / 0.342 / 0.485 px | 0.5 px at zero shift: passes | 1 / 1.2 / 1.6 px: passes |
| 300 ms | 0.073 / 0.191 / 0.307 px | passes | passes |

A clamp of 200 ms or more never fires under the 150 ms block or the 45 ms stall. So `springStepper(...).tickDt(Math.min(dt, STEP_CAP_MS))` with `STEP_CAP_MS = 200` passes all three parts of the A4 arm.

**The residual's gate.** F1-G4's regex, read from `W-F.1.md:185`, is `\bMAX_DT_MS\b|\bWARP_DT_CLAMP\b|Math\.min\(dtMs, 50\)|Math\.min\(Math\.max\(input\.dt, 0\), 0\.05\)`. It does not match `const STEP_CAP_MS = 500; … Math.min(now - last, STEP_CAP_MS)`, nor `tickDt(Math.min(dt, 0.5))` (`rederive4.json` → `F1-G4 regex`). GAP §5 says the same thing ("F1-G4 greps four literals; a renamed clamp passes it"). Yet M-08's cell, §6 and the §9 line K-3 say "F1-G4's source clause carries that tree". W-F.1 item 2 ("no stability clamp is kept anywhere") is cure text, not a gate. So the M-08 witness passes work that W-F.1 calls unfinished, and two of its sentences do not follow from their files:
- "A clamp above 400 ms … is the one tree it cannot see": the true bound is 200 ms on the closed form.
- "Every clamp up to 200 ms fails it": true of the Euler only.

**Amend.**
1. Restate the residual: the block arm sees a kept clamp only while the hop is still moving after the block. On the `dock` row that limit is about 140–200 ms. No longer block on this row can see more.
2. Give the residual to a gate that can see a renamed clamp: an addendum to F1-G4, placed by W-F.1's seat. In the stepper files, the dt that reaches `springStepper`/`tickDt` is the loop's dt, with no `Math.min`, `Math.max`, clamp helper or ternary bound applied to it. Strike "F1-G4's source clause carries that tree" until that addendum exists.
3. Re-score the clamp counterfactuals on the closed form, the stepper W-F.1 ships, not on HEAD's Euler.

### 4 · K-4 (P-21a): PASS

`jump4`, 4 legs, all against the target `scrollLeft` 1596:

| Leg | Library echo `scrollTo(399)` | `scrollLeft` at the echo | `scrollend` | Lands | `aria-current` at `scrollend` and the next frame |
|---|---|---|---|---|---|
| r1 a | 122.0 ms | 234 | 333.2 ms | 405 | 1, 1 |
| r1 b | 122.5 ms | 232 | 325.9 ms | 405 | 1, 1 |
| r2 a | 136.1 ms | 274 | 299.5 ms | 405 | 1, 1 |
| r2 b | 125.4 ms | 281 | 287.6 ms | 405 | 1, 1 |

All four legs FAIL. The echo-dropped run, `jump-noecho-r1`, lands at 1594, but `aria-current` reads 1 at its `scrollend`. So a cure that keeps the guard swallowing the commit also fails. The witness drives an unguarded path, and the "latent" sentence is struck.

### 5 · K-5 (R-04 and the channels) and K-6 (E0, NR): PASS

Free damped-oscillator fits with my own code (scipy `least_squares`), on 5 Apple intro runs:

| Channel | Fit | nRMS | Onset |
|---|---|---|---|
| rise | ω₀ 10.36–10.38, ζ 0.413–0.414 | 0.15–0.21 % | first change 45–59 ms |
| width, from its turning point | ω₀ 10.47–10.49, ζ 0.52 | 0.15–0.22 % | box change 321–333 ms |
| dots | ω₀ 15.65–15.72, ζ 0.778–0.779 | 0.12–0.15 % | 754–764 ms |
| `--progress-intro` (capsule) | ω₀ 15.65–15.72, ζ 0.778–0.779 | 0.12–0.15 % | 754–764 ms, the same frame as the dots |
| glyph opacity | no spring fit (a CSS transition) | — | 945–955 ms |
| blur (material) | ω₀ 9.72–9.74, ζ 1.0 | 0.33–0.34 % | 1018–1030 ms |

The R-04 row and the C order (rise, width, dots = capsule, glyph, material) follow from these.

Clause C: the `token`, `linear` and `rafspring` plants move no width (0.00 px) and no blur (0.00), so they fail C on channels the instrument reads, not only on the glyph.

E0, aligned at each run's fitted rise onset:

| Run | Rise shift | Width shift | Width diff at equal time |
|---|---|---|---|
| r1 | 2.75 ms | 20.0 ms | 21.19 px |
| r2 | 2.75 ms | 20.5 ms | 21.47 px |

`entrance4.json` reads 20.0 / 20.25 ms. Both are inside the 25 ms bound.

NR, on `intro-outback-r1`: rise, width, `--progress-intro` and blur change by 0.000 over 1055 frames, and the blob never shows again. The `replay` plant's rise moves 180 px again on re-entry. `entrance4.py` computes E0 and NR on the wheel, jump and out-and-back runs, as CRITIQUE-3 asked.

### 6 · M-05 order clause (checked with K-7)

`timeline-ended.csv`, the 6 → 0 rewind, first reaches dots 5, 4, 3, 2 and 1 at 33.4, 290.2, 408.5, 510.5 and 590.3 ms. `timeline-dotclick.csv`, a 0 → 3 click, reaches dot 1 at 44.7 ms and dot 2 at 411.7 ms. On `fps-r1-1440`, glass-ui covers dots 2 and 3 at 13.5 ms and dots 3, 2 and 1 at 13.9 ms, each set on one frame. GAP's numbers follow.

### 7 · K-8 (MATCH and EXCEED): PASS

The verdict column of §2 differs between `c97302260` and the working tree in one row only: the new R-04, which is ABSENT. No MATCH or EXCEED verdict was added or changed. `rederive3.py` (CRITIQUE-3's readers over the committed samples) re-runs identically.

Spot re-derivations of rows CRITIQUE-3 §2 did not list:

| Row | Re-derived | Holds? |
|---|---|---|
| P-27 | one (ring size, material tuple) over 897 / 898 frames | yes |
| P-36 | the worm seats in one moving frame, 5.6–23.1 ms after the click, with 0 neck frames and stretch 1.0 | yes |
| M-06 | focus and `aria-current` move together on ArrowRight, ArrowRight, End, Home and ArrowLeft (wrap 0 → 4), with `scrollLeft` 0 throughout | yes |
| M-07, touch | the press clears 63 ms after the drag-off mark and `aria-current` stays 0 | yes |

### K-9 and K-10: PASS

**K-9.** GAP §3's A4 numbers reproduce above:
- the length step: 24.7 against 3.2 px
- Apple's summed excess: 0.01 px per frame
- the sweep: 33–590 against 13.5–13.9 ms
- the lead after a block: 8.5–40.7 and 12.8–57.7 px

The verdicts follow: goo SHORT; breath engaged EXCEED, paused MATCH, rest ABSENT, entrance ABSENT; momentum SHORT except release MATCH and reversal EXCEED. K-3's fault touches a witness and a routing sentence, not a momentum label.

**K-10.** R-02 routes to W-F.3 cure 4's `trailOffset` bound (`W-F.3.md:46`), and M-08 to W-F.1 items 1–2 (`:85-93`), whose mechanism owns the frame drop. K-3's fault is in the gate GAP names for the residual, not in that ownership. P-21a routes to CR-01, and R-04 and the source clause to CR-03's placement seat. `grep -l entrance waves/*.md` returns W-0.4, W-K.7 and W-L.2, as stated.

## Notes (outside the checklist; they do not change the verdict)

1. **A worm with no trail passes R-02's witness.** With trail = lead on every leg: W1 0.10–0.19 px, W2 ≤ 0.19 px, W3 −1.0 px, so it PASSes all 8 (`sim:no-trail`). W1–W3 bound continuity, not the elongation the goo rests on. No witness here asks the cured worm to keep its stretch, for example a `--stretch` or length floor mid-hop. F3-G3's planted bite pins the stretch ceiling up, not down.
2. **The routed cure fails its own witness on one leg.** The candidate (chain origin with a monotone trail) misses W3 by 0.04 px on r2's 46 ms leg in my run too. GAP holds the built cure to the clause as written, so W-F.3's seat should expect that leg to decide.
3. **A stale sentence in §6.** The A3 bullet "under Q-CR-1 (a) the source fence carries that half (§5)" is not struck, though §5 withdrew that routing.
4. **Tempo wording.** R-04's reference cell reads "one tempo, three dampings", and its last sentence says "whether they share one tempo, as Apple's do". Breath says "five channels on three springs". The fits give four (ω₀, ζ) pairs on three tempos (9.7, 10.4–10.5 and 15.7 rad/s). REMEASURE's "one tempo" covers the rise, blob, pill and button only.
5. **C's capsule channel on glass-ui.** It reads the demo's autoplay hop, `aria-current` 0 → 1 at about 1.54 s after entry, as 20.7 px of capsule travel on HEAD and on every plant. C still fails those runs, because the span returns to rest and gets no spring fit. A later run should bound C's channels to the entrance window.
6. **C on glass-ui fills in two channels.** It sets the glyph and `--alpha` to 0, because neither exists until CR-02. Those two channels fail by construction on any glass-ui tree today.
7. **Hygiene.** `GAP.md` (A4) and `amend4/` are uncommitted. `tools/__pycache__/` and `samples/source/` stay untracked; `samples/source/` must stay out of git. `amend4/data/apple/*` holds computed styles and rects, not Apple code or media.
8. **Small reader differences, all inside their bounds.** Linear-plant E1 on the wheel: 0.19 % mine against 0.21 % in GAP. Apple's E0 width shift on r2: 20.5 ms mine against 20.25 ms in GAP.
