# O-95 critique, round 3: GAP (amend 3) against its own files

Seat: REF2/crit3, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 00:30–01:05 EDT. I wrote nothing else under `apple-homeview/`.

**What I read.** `GAP.md` (A3, committed at `c97302260` with all 31 `amend3/` files), `CRITIQUE-2.md`, `STUDY.md` §2.2–§4, and `REMEASURE.md`'s R-rows. I also read the cited wave lines:
- `W-F.3.md` §3 cure 4, §5 F3-G3 and appendix G3
- `W-F.1.md:93`, §5 and appendix A rows G2 and G4
- `W-L.2.md:22,80,102`, `W-K.6.md:24,96,139`, `W-E.12.md:39,55`, `W-F.2.md:69,93`

I read this source at HEAD:
- `useDeckSnap.ts:90-190`
- the `useLeadTrail.ts` constants (`:56,59,67,176,207`)
- `scheme-spring.css:62`, the `--spring-*` `linear()` tokens

`git diff --stat d2cff0456 c97302260 -- src demo` is empty.

**Method.** No browser, no build and no worktree. I re-derived every number from the committed raw samples with readers of my own. Where a witness needed a counterfactual, I ran the amend's own integrator or witness code: I executed only the part of its file above the `OUT = {` line, which copies no code and rewrites none of its outputs.

| Tool (`critique3/tools/`) | Output (`critique3/data/`) | What it does |
|---|---|---|
| `rederive3.py` | `rederive3.json` | independent readers over `amend3/data/{gui,apple}`, `amend2/data/gui/fps-*` and `gap/data/*`; also the M-08 clamp counterfactual on `worm_sim.py`'s integrator |
| `retarget_midflight.py` | `retarget-midflight.json` | R-02's A3 witness and W-F.3 cure 4's readings, with the retarget issued 40, 80, 120 and 250 ms into the hop, on the measured clocks of `gap/data/retarget-r1/r2` |
| `entrance_linear.py` | `entrance-linear.json` | CR-03's A3 witness (`entrance3.py`'s `witness`) on CSS `linear()` tweens sampled from a spring row |

All three ran under `guarded --light --rss-gb 2 --timeout 5|10`. The 1-min load was 22.2–24.8 (`uptime`, 00:33–00:37). None of my numbers is a timing measurement. Every time below comes from a sample whose load is in its file's `meta`, and I give that load beside it. To re-run, from `apple-homeview/`: `python3 -I -B critique3/tools/rederive3.py && python3 -I -B critique3/tools/retarget_midflight.py && python3 -I -B critique3/tools/entrance_linear.py`.

**Short verdict: AMEND.** Every A3 number I re-derived reproduces, and most round-2 items are cured from committed samples. Four rows do not stand, and three properties are missing:
- **R-02.** The addendum names the wrong reading of cure 4, and the witness cannot see the fault. The addendum resets the origin at every drive. On a retarget issued while the worm is moving, that reading collapses the worm's length in one frame: the trailing body leaps forward 16–30 px. The witness passes it, because its retarget lands at +250 ms, when the worm is 0.8 px long and moving at 11 px/s.
- **CR-03.** E1's stated limit is false. A CSS `linear()` easing sampled from the row passes E0–E4 at ζ 0.41, 0.45 and 0.71. The half routed to W-F.1's F1-G1 and F1-G2 lands on greps for six named literals, which cannot see an entrance's curve.
- **M-08.** The new runtime arm passes a clamp that is renamed and raised to 60 ms.
- **P-21a.** The witness, `deck.go(4)` lands on 4, passes with the echo intact, because a library move arms the guard that drops the echo's commits.

## 1 · Critique-2 items: cured from samples?

| Critique-2 item | Cured? | What I checked |
|---|---|---|
| §2 CR-03: a tween with an overshoot curve, a stagger and one shape passed | **partly** | `entrance3.json` reproduces: case A fails (E1 9.38 %, one shape), A with two shapes fails on E1, the tuned bézier fails at 1.57 %, and Apple passes at 0.10 / 0.46 / 0.24 %. But a `linear()` tween of the row passes, and the fence that is meant to carry the rest does not reach it (§2, CR-03) |
| §2 R-02: F3-G3 has no retarget leg | **partly** | Cause established: `worm-sim.json` reproduces the launch step (−9.14 px, measured −9.14) and both retargets. The retarget leg was added. But the addendum's reading breaks the worm's length on a real in-flight retarget (§2, R-02) |
| §2 P-21: evidence misread | yes | `flight-r1/r2`: 5052 / 5060 → 123 / 119 px/s across the same-direction call; 5125 / 5000 → −119 / −106 across the reversal; both land at 405 (member 1). `flight-lib`: 2970 / 2989 / 3034 / 3049 → 0 / 122 / 123 / 114 px/s. Load 17.2–20.2 |
| §2 P-23: "3–4 zero frames" | yes | `pager-next` r1: zero frames at 142.3, 267.6, 438.4 and 454.4 ms, with 298 / 156 / 2 / 1 px left to the target. r2: 135.1, 427.6 and 443.3 ms, with 299 / 2 / 1 px left. Load 7.7–9.9 |
| §2 M-02: the wheel cannot show easing | yes | `sticky-smooth-r1/r2`: the law (c 120, d 436) holds to 0.000 px over 756 frames, with 210 contiguous stuck frames and 522 px of container travel; page speed 299.9 px/s. Stick: −220.5 → 0. Release: 0 → −212.7 / −169.6 px/s; mean −300.6 / −303.0 over frames 2–30. Load 11.6–12.5. Wording note: the frames after the release read −250 / −361 and −291 / −380 px/s, so "at the page's speed from the next" holds for the mean, not frame by frame |
| §2 M-08: magnitude and quantisation | **partly** | The magnitude reproduces: lag growth +10.8 / +10.7 / +10.9 ms (stall) and −0.2 / +0.6 / −0.5 ms (60 Hz) in my reader. But the new witness passes a raised clamp (§2, M-08) |
| §2 / §3 momentum wording | yes | — |
| §4 item 2: the stale index swallows the next move | yes | `cr09-r1..r3`: after `to0` the strip rests 458–462 ms after the mark with `aria-current` 2, stale 2041.5–2044.1 ms. Then `to3` peaks at `scrollLeft` 3 / 2 / 6, the library's `scrollTo(0)` follows at 8.5 / 16.8 / 19.4 ms, and `scrollend` fires at 0 at 57.6 / 57.5 / 76.7 ms. The cause (`commit` returns at `:99` while `programmatic > 0`) matches `useDeckSnap.ts:98-99,145-162` |
| P-21a's cause (the echo, not `scroll-snap-stop`) | cause yes, witness **no** | `jump-noecho-r1/r2`: lands at 1594 with `scrollend` at 675.7 / 676.6 ms (load 19.0–20.9). The witness is refuted (§2, P-21a) |
| §2 P-18: the 52 px witness had nowhere to land | yes | The addendum to E12-G1 keeps W-E.12's guard by pinning the painted pip to the token's px value (`W-E.12.md:39,55`) |
| §2 P-03: "the rim is not a stack" | yes | marked as this report's reading, for D3 or the owner |
| §2 M-07: `useGestureEnd` maps `pointerup` to commit | yes | recorded as G12's runtime arm. Note: the cure itself changes too, not only the gate: a release off the pip must reach `onCancel` (`W-F.2.md:69`) |
| §3 goo: the midpoint is not both bodies | yes | `fps-r1-1440`: midpoint within 0.5 px at 273.1 / 281.3 / 281.6 ms, both bodies at 290.1 / 289.4 / 371.6 ms, spans 47.69 / 87.56 / 109.59 px against 18.0 at rest, necks 429.53 / 1056 / 1408 px on a 208 px ring, stretch 1.158–1.200. Load 16.7–17.2 |
| §4 item 1: reduced motion (M-12, clause R) | yes | — |
| §4 item 3: the width-sum law (Q-CR-3) | yes, M-05 amended | §2 |
| §4 item 4: hidden time (M-11, clause H) | yes | Apple `hidden-r1/r2`: advances 545.0 / 529.2 ms into the hidden window. The fill runs 8.967 / 8.970 px/s before and 8.977 / 8.976 after, with no step across the show (40.0156 → 40.0938 → 40.1719). The demo advances at 5177.5, 9378.6 and 13578.6 ms, while hidden. Load 12.1–17.8 |
| §4 item 5: hygiene | yes | the A3 data and tools are committed at `c97302260`. `tools/__pycache__/` (2 `.pyc`) and `samples/source/` stay untracked. I ran every Python with `-B` and wrote no `__pycache__` |
| (A3's own) CR-08 → W-K.6 item 13; CR-01 inbound → W-L.2 item 9 | yes | `W-K.6.md:24,96` own the `behavior` default, and K6-S (`:139`) greps `ScrollBehavior = "smooth"`, which a `?? "smooth"` fallback passes. `W-L.2.md:80` routes a model write through `deck.go`. Both routings hold |

## 2 · Rows re-derived, and the four that do not stand

MATCH and EXCEED rows first, then the owner words, then the refuted rows.

| Row | GAP | Re-derived (`rederive3.json`) | Holds? |
|---|---|---|---|
| **P-35** MATCH, **R-05** EXCEED | re-snap in one frame (796 / 872 / 799); worm re-seats in the same frame 5–9 ms after each resize | `resize-r1/r2`: 804 → 796, 796 → 872, 872 → 799 on the first changed frame, 5.2–8.8 ms after each resize. The worm moves on the same frame every time; no other `scrollLeft` value appears in the next 60 frames; `aria-current` 2 throughout. Load 7.3–8.5 | **yes** |
| **P-25** EXCEED | member scale 0.965–1.000, neighbours at 0.7 | `smooth-r1/r2`: scale 0.965–1.0; neighbour opacity floor 0.7 | **yes** |
| **P-26** EXCEED in kind / SHORT at rest | residues 0.09–2.73 % | `smooth`: the members' `--member-lag` at the end of each completed move reads 2.73, 1.62, −0.66, −1.02 % (r1) and 1.75, 1.01, −1, −1.01 % (r2). (The 2.89 % in r2 is a move cut off at 252 ms by the next call, not a rest.) Load 8.0–9.9 | **yes** |
| **P-30** EXCEED | alpha and scale in 188–192 ms; release 115–121 ms | `hover-r1/r2`: scale reaches 1.14 at 118.6 / 119.7 ms and alpha 0.72 at 201.7 / 196.4 ms. GAP's 188–192 is the last frame not yet at the end state, one frame earlier. Press 0.97; release back to 1.14 at 123.8 / 127.1 ms (first frame at 1.14). Load 9.9–10.9 | **yes** (one-frame definitional offset) |
| **P-37** EXCEED | dark arm: fill /0.22, rim 0.08, drop 0.30 | `dark-r1/r2` anatomy: the same; blur 20 px, P-03's SHORT | **yes** |
| **P-32** MATCH (snap-back) | 172–193 ms against Apple's 185–198 | `drag-snapback`: settled within 0.5 px at 197.3 / 194.7 / 190.0 / 196.0 ms; the 62 % release advances in 225.8 / 236.4 ms. Load 15.7–16.8. My settle criterion is stricter than GAP's segmenter and lands inside Apple's band | **yes** |
| **P-22** strip MATCH | Next → first strip motion 34.3–34.9 ms | 34.3 / 34.9 ms. Note: in r1 the first moving frame follows a 14.7 ms sample gap, so that run's latency carries more sampling error than the ±10 ms tolerance it is judged by. Load 7.7–9.9 | **yes** |
| **R-08**, **P-33** MATCH (of absence) | shell dock constant; overpull moves nothing | `dock-scroll`: one rect, 676.81 × 56 at y 832, while `<main>` runs 0 → 738 at peaks of 14 035 / 11 940 px/s. `overscroll`: `scrollLeft` 0 throughout and member 0 at x 32 | **yes** |
| **M-11** / **M-12** | §1 | §1 | **yes** |
| **CR-09** | §1 | §1 | **yes** |
| **M-02** | §1 | §1 | **yes**, wording note |
| **P-21**, **P-23** | §1 | §1 | **yes** |
| **Goo: SHORT** | §3 | the numbers in §1 reproduce. The verdict stands. Its routing for the retarget inherits R-02's fault below | **yes**, with R-02's correction |
| **Breath** | engaged EXCEED, paused MATCH, default rest ABSENT, entrance ABSENT | the fill runs 8.967–8.977 px/s (M-11); hover ×1.14 (P-30); the stuck press stands on round 2's re-derivation | **yes** |
| **Momentum** | SHORT on the listed mechanisms | the numbers reproduce. Two of its routings fail: "W-F.3, with the A3 addendum" (R-02) and "W-F.1, with a runtime arm" (M-08) | **amend** (the labels hold; the routings follow the R-02 and M-08 corrections) |
| **M-05** | "its painted span covers each intermediate dot's centre on some frame, in order" | A worm that paints a bar across the whole span on its first frame, as HEAD's neck does (1408 px on a 208 px ring), covers every intermediate centre on the same frame. "In order" with ties allowed passes it. That is not Apple's sweep, where dots 2 and 3 each grow and shrink in turn | **amend**: each intermediate centre is first covered on a later frame than the one before it, in the hop's direction |

### R-02: refuted (the addendum's reading, and a witness that cannot see it)

The addendum asks that cure 4's origin be the lead at the latest drive. Under that reading, a retarget sets `bound = |lead − origin| ≈ 0` on its first frame, so `trail = lead`, and the worm's whole elongation vanishes in one frame. GAP's witness never meets this: its retarget fires at +250 ms, when the worm is nearly landed (`retarget-midflight.json`: lead 11.5 / 11.2 px/s, length 0.82 / 0.79 px).

The same witness and the same measured clocks, with the retarget issued while the worm is moving, run on `worm_sim.py`'s integrator (`retarget-midflight.json`; sample loads 10.2–11.3):

| Retarget at | Lead speed | Length before | HEAD | Cure 4 by the chain origin | **Cure 4 by the latest drive (the addendum)** | Chain origin + a trail that never moves against the travel |
|---|---|---|---|---|---|---|
| 46 / 43 ms | 470 px/s | 18.6 / 18.2 px | FAIL | PASS | PASS; trailing body **+18.6 / +18.2 px in one frame**, length −12.9 / −13.9 px | PASS; trail step 0, length change ≤ 6.9 px (the lead's own acceleration) |
| 82 / 88 ms | 386 / 350 px/s | 29.7 / 27.0 px | FAIL | FAIL (trail back 3.9 / 8.3 px) | PASS; trailing body **+29.7 / +27.0 px**, length −24.6 / −23.3 px | PASS; trail step 3.0 / 0 px, length change ≤ 5.5 px |
| 120 / 125 ms | 239 / 211 px/s | 17.8 / 16.0 px | FAIL | FAIL | PASS; trailing body **+17.8 / +16.0 px**, length −14.5 / −13.6 px | PASS; trail step 0, length change ≤ 5.1 px |
| 254 / 255 ms (GAP's leg) | 11.5 / 11.2 px/s | 0.8 px | FAIL | FAIL | PASS (+0.8 px) | PASS |

So the addendum trades the back-step for a snap. In every mid-flight case, the worm drops 13–25 px of its 16–30 px length in one frame, which is the opposite of the goo the owner named. The continuous candidate already in `worm_sim.py` (`chain_origin_monotone`: bound by the chain origin, with a trailing edge that never moves against the travel) passes every case without the snap.

Amend:
- **The addendum.** Cure 4's bound is measured from the chain's origin, and the trailing edge never moves against the travel. Do not reset the origin at the latest drive. W-F.3 cure 4 remains the owner.
- **The witness.** It gains a retarget at about 80 ms (lead ≥ 300 px/s) and a continuity clause: the worm's length changes by no more than the lead's own one-frame displacement plus 1 px. The +250 ms leg can stay as a near-rest case.

### CR-03: refuted (the E1 limit and the fence it leans on)

- **The limit statement is false.** GAP says that against the Apple row, or a (b) row with ζ near 0.41–0.45, E1 alone separates a governed spring from a tween. `entrance-linear.json` runs `entrance3.py`'s own `witness` on a CSS `linear()` easing sampled from the row, with two overlapping shapes and a 20 ms stagger. These pass E0–E4 outright:
  - Apple row (ζ 0.414): 24 stops over 1.2 / 1.6 s (nRMS 0.42 / 0.71 %); 40 stops over 1.2–2.0 s (0.17–0.39 %); 16 stops over 1.2 s (0.94 %)
  - a (b) candidate (0.5 s, ζ 0.45): 24 stops (0.52 / 0.89 %); 40 stops (0.18–0.50 %)
  - `panel`: 24 stops (0.54 / 0.88 %); 40 stops (0.20–0.52 %)

  A `linear()` easing is the form the library's own spring tokens take (`scheme-spring.css:62`, `--spring-panel: linear(…)`), so the shape of a curve cannot tell a row's token from a hand-pasted copy of it, or from a copy fitted to an off-table spring.
- **The routing is wrong.** For answer (a), GAP routes the source half to W-F.1's F1-G1 and F1-G2. Neither can see an entrance's curve:
  - F1-G1 greps `-omega*omega`.
  - F1-G2 greps four named constants and two option defaults: `PULSE_OMEGA|PULSE_ZETA|WARP_RESPONSE|WARP_ZETA`, `attractorResponse ?? N`, `damping ?? 0.N` (`W-F.1.md:168`).

  A new entrance with a literal `linear(…)` or `cubic-bezier(…)`, or a hand-rolled integrator that does not spell `-omega*omega`, passes both.
- **Amend.** E1 is necessary, not sufficient, under either answer. CR-03 needs a source clause that its placement seat owns: the entrance's geometric channels read `var(--spring-<row>)` with `var(--spring-<row>-duration)`, or step `springStepper(row)`, with the row named by Q-CR-1, and no literal `linear(` or `cubic-bezier(` in the entrance's files. Strike "E1 alone separates them" and the routing of this half to F1-G1 and F1-G2.

### M-08: refuted (the runtime arm passes a raised clamp)

The A3 witness reads lag growth between the 0.1–0.3 and 0.7–0.9 progress bins under a stall of 45 ms on every 6th frame. The stall run's largest frame interval is 50.9 ms (`fps-r1-1440-rafstall`, 63 intervals over 40 ms; load 17.2–17.8). Any clamp at or above 51 ms therefore never fires in this run.

I ran `worm_sim.py`'s integrator on the measured 120 Hz and stall clocks (`rederive3.json` → `M-08:simulated-clamp-counterfactual`). With `MAX_DT_MS` 40, it reproduces the measured fault: growth 11.0 / 9.6 / 10.7 ms against the measured 10.8 / 10.7 / 10.9. With the clamp renamed and set to 60 ms, growth is 1.1 / 1.4 / 1.5 ms, which passes the ≤ 3 ms bound, identical to no clamp at all. F1-G4's grep (`MAX_DT_MS|WARP_DT_CLAMP|…`) passes the rename too. So a tree that keeps a clamp passes both the static gate and its runtime arm.

Amend: run the witness at two or more stall lengths, one well above any plausible clamp (for example 45 ms and 150 ms blocks), and require the lag growth to stay ≤ 3 ms at each.

### P-21a: refuted (the witness passes with the echo intact)

The row's witness is "`deck.go(4)` from 0 lands at 4·pitch ± 1 px and `aria-current` = 4". The path it drives cannot show the echo. `deck.go` → `watch(deck.index)` → `scrollTo(4)`, which sets `programmatic += 1` (`useDeckSnap.ts:148`). Every observer or `scrollsnapchange` commit during that move then returns at `:99`, and the guard holds until `scrollend` or 900 ms. A four-member smooth move ends at 676 ms (`jump-noecho`), inside that window. GAP's CR-09 cause and `flight-lib` both show this: a library Next issued in flight lands on its own target (290, 580). So a multi-member `deck.go` lands at HEAD, and GAP's sentence "latent today only because nothing issues a multi-member `deck.go`" does not follow from the source.

The echo truncates only moves the library did not issue. Examples: a consumer's own `scrollTo` on the strip (the case GAP measured), or a native keyboard or `scrollIntoView` scroll of the strip.

Amend: the witness drives an unguarded move. For example, `strip.scrollTo({left: 4·pitch, behavior: "smooth"})` from 0 lands at 4·pitch ± 1 px with `aria-current` 4. CR-01's A3 clause, "a `scrollTo` issued in flight lands on its own target", already uses that path. Strike the "latent" sentence or re-ground it on the unguarded path.

## 3 · The owner's three words

- **Goo: SHORT, upheld.** Every number reproduces (§1). One correction follows from R-02: the cure GAP routes for the retarget back-step would replace it with a one-frame collapse of the worm's length. The goo verdict's routing should read "W-F.3 cure 4, by the chain origin, with a trail that never moves against the travel".
- **Breath: upheld.** Engaged EXCEED (stuck press SHORT), paused MATCH, default rest ABSENT, entrance ABSENT.
- **Momentum: amend.** The SHORT labels hold. Two of its routings fail: the worm retarget (R-02) and the frame-drop runtime arm (M-08).

## 4 · Missing

1. **R-04, and the entrance channels CR-03's witness never reads.** REMEASURE R-04 is "one spring tempo, three dampings". The rise, blob, pill and button sizes share ω₀ 10.3–10.5 at ζ about 0.41 / 0.52 / 1, while the capsule opening and the dot slide run at ω₀ 14.4–15.8 and ζ 0.75–0.80. No GAP row carries R-04; §4 cites it only for the overshoot. CR-03's E1–E4 also never read P-12 (the capsule opens 8 → 48.8 → 48), P-13 (the glyph fades and scales in) or P-14 (the material frosts in, blur 14 → 7 and fill 1 → 0.72). So an entrance that springs the rise and the dots and skips the capsule, the glyph and the frosting passes the witness, though the rows route all three to CR-03. Add a clause per channel: each moves, on its own row, in the reference's order (P-08 width after the rise, P-12 after the dots' onset, P-14 last). Where the choreography shares a tempo, say so in Q-CR-1's ruling.
2. **E0 and "never replays" are computed by no tool.** `entrance3.py` names E0 and the no-replay clause in its docstring, but `witness()` returns E1–E4 only. For Apple, E0 rests on REMEASURE P-04. For glass-ui, no run checks either. Both are prose until a tool computes them on a wheel run, a jump run and an out-and-back run.
3. **A worm-length continuity clause.** No row bounds how fast the indicator's length may change outside a launch, so a cure can trade a back-step for a snap (R-02). The clause belongs with P-18 and R-02: the length changes by no more than the lead's one-frame displacement plus 1 px on every frame of a hop or retarget.

Not material: Apple suspends snapping while its tween runs (`scroll-snap-type: none`, STUDY §2.4). If CR-01's cure authors a JS-driven move, its seat needs that note. A horizontal mouse wheel does nothing on Apple's strip, while glass-ui pages with it, and no row records that difference.

## 5 · Files

- `critique3/tools/rederive3.py` → `critique3/data/rederive3.json`: every re-derived number in §1–§3. Keys: `P-21:*`, `P-22:*`, `P-23:*`, `M-02:*`, `M-08:*` (measured and the clamp counterfactual), `CR-09:*`, `P-21a:*`, `M-11:*`, `P-35/R-05:*`, `P-25/P-26:*`, `P-30:*`, `P-37:*`, `R-08:*`, `P-33:*`, `P-32:*`, `goo:*`
- `critique3/tools/retarget_midflight.py` → `critique3/data/retarget-midflight.json`: R-02's witness and cure 4's readings on in-flight retargets
- `critique3/tools/entrance_linear.py` → `critique3/data/entrance-linear.json`: CR-03's witness on `linear()` tweens of three rows
- No browser ran. No frames were added, and no Apple code or media is stored
