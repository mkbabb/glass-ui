# O-95 critique, round 2: GAP (amend 2) against its own files

Seat: REF2/crit2, model `claude-opus-5-5` (asserted from own system identity). 2026-10-15/16, about 23:55–00:40 EDT. I wrote nothing else under `apple-homeview/`.

**Method.** No browser, no build, no worktree. Every number below comes from the raw samples on disk, read by two tools of mine:
- `critique2/tools/rederive2.py` reads `amend2/data/{gui,apple}/*.json.gz`, `gap/data/{idle,pager-next,deck}-*.json.gz` and the study's `samples/timeline-{ended,playpause}.csv`, and writes `critique2/data/rederive2.json`.
- `critique2/tools/plant_witness.py` imports `entrance_witness` from `amend2/tools/analyze.py` (imported, not copied) and runs it on synthetic per-frame rows. It writes `critique2/data/plant-witness.json`.

Both ran under `guarded --light --rss-gb 2 --timeout 5`. Re-run from `apple-homeview/`: `python3 -I critique2/tools/rederive2.py && python3 -I critique2/tools/plant_witness.py`. The 1-min load was 28.0–31.0 while they ran. That does not touch any number here: none of mine is a timing measurement. Every timing comes from the seats' samples, whose loads are in each file's `meta` (amend runs 16.3–32.9; for example `fps-r1-1440` 16.7 → 17.2, `interrupt-r1` 19.4 → 18.7, Apple `sticky-r2` 29.5 → 26.4).

I also read the routed wave specs at the lines GAP cites (`W-E.12` §2 and §5, `W-F.1` §3 item 1 and F1-G4, `W-F.2` cure 4 and G12, `W-F.3` §3 and appendix A G3, `W-F.5` §3 item 4, `W-0.11` §1 and §3, `W-H.1` §3, `W-A.6` step 0, engagement `REGISTRY.md` CK-08) and the cited source: `worm.ts:125-140,205-245`, `PagerDots.vue:255-265,355-410`, `useDeckSnap.ts:143-175`, `carousel/styles.css:35-45,68-75`, `surfaces-pager.css:40-50`, `tokens/glass.css:69-73`, `demo/stories/navigation/carousel.vue:50-100`. `git diff --stat ba7c38cec HEAD -- src demo` prints nothing, so the source is the build the amend measured.

**Short verdict: AMEND.** The amendment cured most of round 1 from samples, and its reference readings all reproduce. Three rows do not stand:
- **CR-03's new witness passes an unfinished entrance.** A 1 s CSS tween on an overshooting bézier, with a CSS `transition-delay` stagger and a single shape, passes `entrance_witness` (pass: true). E4, the goo hand-off, is not in the conjunction.
- **R-02 binds F3-G3 for "the launch and the retarget alike".** F3-G3 drives one hop from rest. It has no retarget leg.
- **P-21's evidence is misread.** It says the strip restarts from 0 px/s "even when the strip was moving 119–244 px/s the frame before". At every one of the 14 marks in `interrupt-r1/r2` the frame before reads 0 px/s. No `interrupt` sample issues a move into a moving strip. The staircase does exist, but only in GAP's `pager-next` runs.

Four rows need amending: P-23, M-02, M-08 and the momentum verdict. CR-04/M-05's width-sum clause rules against the goo edict without a ruling (§4 item 3). Four properties are missing, plus one hygiene note.

## 1 · Round-1 items: cured from samples?

| Critique item | Cured? | What I re-derived |
|---|---|---|
| §1a R-03 hold before the first switch | yes | rests on `critique/data/rederive-ref.json`; not re-derived again |
| §1a P-07 "single blob" | yes | blob hidden 533.4 / 540.8 / 529.7 / 504 ms (120 Hz, 60 Hz, stall, WebKit); `apple:intro-*` |
| §1b neck duration (95 ms) | yes | wider than the 208 px ring for 108.4 / 167.6 / 176.0 ms, first to last frame. GAP's 116.7 / 175.9 / 184.3 adds one frame (+8.3 ms) by its definition |
| §1b strip `scrollLeft` 0 on dot click (CR-01) | yes | `reduced-pager`, `keyboard`: `sl` 0 in every frame; `wk-cells`: `aria-current` disagrees with the slide for 1524.2 ms after click3 (GAP: 1517) |
| §1b / §2 P-36 worm under reduce unsupported | yes | `reduced-pager-r1/r2`: 1 moving frame per click, 0 neck frames, `--stretch` "1.0000", first move 22.5 / 6.5 / 23.1 / 5.6 ms. 0 `aria-current` changes in 8997 / 8998 ms after pointer-out. The demo gates its timer on the media query (`carousel.vue:58-64`) |
| §1b / §2 P-27 material unsampled | yes | one material tuple and one ring size (152 × 32) on 897 / 898 frames, 175 worm-moving frames (0.01 px threshold; GAP 173–174 at 0.05) and 68 strip-moving frames |
| §2 P-10 continuity | yes | first midpoint step −6.54 / −19.59 / +26.12 px against +40 / +120 / −160 hops; body outside [origin, lead] by 18.29 / 53.16 / 70.88 px; neck 429.53 / 1056 / 1408 px; identical at 60 Hz |
| §2 R-02 EXCEED | **partly** | withdrawn correctly. But the new binding (F3-G3) misses the retarget (§2, R-02) |
| §2 P-21 MATCH | **partly** | verdict re-stated correctly. Its evidence citation is wrong (§2, P-21) |
| §2 P-22, P-23, deck → CR-10 | yes, with P-23 amended | §2 |
| §2 P-18 | yes | numbers hold. The 52 px witness is stricter than E12-G1's 76, and W-E.12 chose 76 on purpose ("a pass cannot come from a smaller pip alone", `W-E.12.md:39`). GAP recommends the change, but no addendum to W-E.12 records it, so the stricter bound has nowhere to land |
| §2 P-03 rim / literal shadow | yes | the ring reads `var(--glass-blur-floating)` (`surfaces-pager.css:44`) on the 20 px radius (`glass.css:72`), which W-0.11 item 1 lowers. Note: W-0.11's own census calls any token of ≥ 2 layers STACKED (`W-0.11.md:120,136`). GAP's "rim is not a stack" is a reading of O-87 that W-0.11 does not make. It is admissible, but it is the owner's or D3's to confirm |
| §2 CR-05, CR-07, CR-08 routing | yes | `W-F.3` §3 has no `PagerDots` ↔ `position` cure; `W-B.15` and `W-F.5` have no carousel snap-stop or reduced-motion clause |
| §2 R-05 free EXCEED | yes | resize clause added to CR-05 |
| §2 owner words | yes, momentum amended | §3 |
| §3 P-33, R-08 of absence | yes | marked |
| §4 CR-03 witness | **no** | the replacement is still passed by unfinished work (§2, CR-03) |
| §4 P-01 / CR-02 witness | yes | with GAP's constants (c 120, d 436, not refitted): Apple max error 0.00 px over 920 frames, 229 stuck frames, 480.0 px of container travel. glass-ui HEAD: 0 of 1095 frames at H − 32; the ring's bottom equals the carousel's bottom on every frame. Fixed plant: 1094 of 1094 at H − 32, never released. Sticky plant: 0 at H − 32 |
| §4 CR-06 pause rules | yes | M-01, M-04, M-05, M-09 clauses added. A reduced-motion clause is missing (§4) |
| §4 CR-04 fixed pill | yes, but see §2 | the second clause works, but it bans the goo |
| §4 R-02 / W-F.3 | **no** | §2 |
| §4 CR-09 | yes | stale 2032.4 / 2034.1 ms; the consequence is under-recorded (§4) |
| §5.1–5.10 | yes, M-02 and M-08 amended | §2 |

## 2 · Rows re-derived (MATCH and EXCEED rows first, then the new rows)

| Row | GAP (amend 2) | Re-derived | Holds? |
|---|---|---|---|
| **P-27** MATCH | one size and one material over 897 / 898 frames | the same; ring opacity 1 throughout | **yes** |
| **P-36** MATCH (worm, demo autoplay) / SHORT (strip) | worm seats in one frame; 0 ticks in 9.0 s | §1. The demo-autoplay MATCH is a demo's, not the library's (the library has none, P-20). It says nothing about CR-06 (§4 item 1) | **yes** |
| **P-34** paused MATCH / default rest ABSENT | no pager animation in 19 s; 4 s idle constant | `visibility-r1`: 0 running animations on the ring subtree over 19 008 ms. `idle-r1/r2`: 1 distinct value for `sl`, both bodies, neck, stretch, pips, ring and members over 3999.6 / 3991.2 ms | **yes** |
| **M-06** focus EXCEED / slide ABSENT / wrap DIFFERS | roving focus; worm 9.0–21.0 ms; strip never moves; ArrowLeft 0 → 4 | `keyboard-r1/r2`: cur and focus move together on every key, worm first move 7.0–21.0 ms, `sl` 0 in every frame, ArrowLeft 0 → 4 in both runs | **yes** |
| **M-07** touch MATCH / mouse SHORT | press stuck 242 / 241 frames; touch cancel 73 ms after drag | `data-press` set 4.2 / 6.1 ms after down and present on every one of 242 / 241 frames after up, pip scale "0.97". Touch: set 7.8 ms, cleared 383.1 ms after down, 73.2 ms after the drag mark, 0 pressed frames after up, no commit | **yes**. Routing note: W-F.2's `useGestureEnd` maps `pointerup` to `onCommit`. For a pip released off its button the right end is a cancel. M-07's witness catches this, but W-F.2's G12 is a static census and would not |
| **M-08** "both clock-true at 60 Hz; under a stall glass-ui +34 to +67 ms (12–24 %)" | landing by midpoint | 60 Hz: matched-progress lag −6.8 to +12.1 ms (holds). Stall: the landing frame of hops 2 and 3 follows a 41.8 / 41.5 ms sample gap, and hop 1's next frame is a 41.6 ms gap. So the landing times carry up to 42 ms of sampling. By interpolated time at matched progress, the stall lag at 99 % is **36.8 / 28.9 / 39.3 ms**, 10–14 % of a 273–282 ms hop (`m08-lag:*`) | **amend**: the time loss is real (W-F.1 owns the clamp, `useLeadTrail.ts:67,207`), but the magnitude is 29–39 ms. The witness ("lands within 17 ms of its 120 Hz landing") is tighter than its own run's 42 ms sample gap, so a cured tree can fail it by quantisation. It should read lag at matched progress, interpolated |
| **P-01 / M-02** sticky law | Apple PASS 0.00; HEAD and plants FAIL | §1 | **yes** (P-01). **M-02 amend**: Apple's "0 → page speed in one frame, no easing at the release" is the wheel's own step. The container moves 0 → 4082 px/s → 0 around the release frame (`sticky:apple-release`), as it does on every 40 px tick. Stepped input cannot show easing or its absence. Measure it with a smooth (rAF-driven) scroll, or drop the claim and the "would EXCEED" sentence |
| **P-10** MATCH (no filter) / SHORT (continuity) | §1 | §1 | **yes** |
| **P-21** DIFFERS / SHORT against the edict | "every call starts from rest: 0 px/s, then 98–124, then 119–253 px/s, even when the strip was moving 119–244 px/s the frame before (`interrupt-r*`)" | At all 14 marks of `interrupt-r1/r2` the frame before reads **0 px/s**. Where 119–244 px/s appears, it is two or three frames earlier: the strip had landed (`to4` rests at 243.0 / 243.8 ms, before the +250 ms mark). The planned in-flight leg (`to3`, then `to1` at +250 ms) never ran in flight: `to3` was swallowed (§4 item 2). `wk-cells` `to3` lands at 405 by about 290 ms, also before its +253 ms `to1` | **refuted as cited**. The SHORT stands on `gap/data/pager-next-r1/r2`: in a Next × 3 at 125 ms spacing the strip falls to 0 px/s at 142 ms (r1) and 135 ms (r2), then re-accelerates to 3134 / 3049 px/s. That is a restart, not a carried velocity. Cite those runs instead |
| **P-23** strip staircase | "3–4 zero-velocity frames in flight" | `pager-next`: mid-chain zero frames at 142 and 268 ms (r1) and at 135 ms (r2). The rest (438 / 454 ms, 428 / 443 ms) fall in the settle tail, where `scrollLeft` is an integer and a move below 1 px per 8.3 ms frame reads 0 | **amend**: 1–2 in flight, plus tail quantisation. The CR-01 witness "no zero-velocity frame in flight" must exclude the sub-pixel tail (for example, frames whose 3-frame mean speed is below 120 px/s). Otherwise a continuous cure fails it in its last 40 ms |
| **R-02** worm continuity SHORT → W-F.3 F3-G3 "catches the launch and the retarget alike" | | `W-F.3.md:126-141`: G3 clicks dot 0, waits 1 s, clicks dot 1 and samples one hop from rest. There is no second click in flight | **refuted (binding)**. A tree that bounds the trail by distance travelled (cure 4) passes G3, whether or not the same-direction retarget still steps back −9.2 px over three frames. GAP has not shown that the retarget step comes from `trailOffset` (round 1's cause was the span re-read, `worm.ts:239` `span = c - worm.lead.value`). The witness needs a retarget leg (2 → 4 at +250 ms, span [origin, final target]), and the cause needs establishing before the row is routed to W-F.3 alone |
| **CR-03** E1–E4 | "stated so the obvious unfinished version fails it" | `plant_witness.py`, case A: a 1 s `cubic-bezier(0.34, 1.56, 0.64, 1)` scale with a 20 ms CSS stagger on the pips and one shape gives E1 0.098, E2 0.622, E3 onsets 8.3–83.3 ms, E4 "N/A (one shape)", **pass: true**. Control C (GAP's linear scale) fails, as GAP says | **refuted**. The witness cannot tell a tween with an overshooting curve from a governed spring, and it passes with no hand-off. Add: (a) the rise or width fits a damped oscillator whose ζ and response are a `springPresets` row (the Q-CR-1 row) within a stated tolerance, as P-15 fits Apple's; (b) E4 is part of the conjunction: two shapes overlap at the start and their union holds, so a one-shape entrance fails |
| **CR-09** | stale 2032 / 2034 ms | 2032.4 / 2034.1 ms; the strip rests 465.6 / 464.2 ms after the `to0` mark, at member 0 with `aria-current` 2 | **yes** (numbers). The momentum verdict calls it "an interrupted move". It is a move issued 9–10 ms after the strip landed, before `scrollend` (GAP's own CR-09 row says so). Fix the wording in §3 |
| **M-01** | pause 9.0 / 11.8 ms, resume 4.7 / 6.7 ms, fill frozen | the same; frozen 45.2344 → 45.2344 and 25.9375 → 25.9375; resume rate 9.010 / 9.008 px/s (GAP 9.02 / 9.04, a different window) | **yes** |
| **M-03** | Apple 2.52–4.19:1 over media, < 3 on 5 of 7; glass-ui 3.07 / 9.94 / 1.40 | 2.524–4.186, 5 of 7 below 3; 3.066 / 9.939 / 1.401 | **yes** |
| **M-05** | 7680 → 0 in 991.8 ms; ≤ 2 enlarged; peaks 48 … 47.97 | the same, from `samples/timeline-ended.csv` | **yes** |
| **M-09** | freeze 31.938 → 32.0; resume 32.0 → 32.078; 8.987 / 8.966 px/s | the same, from `samples/timeline-playpause.csv` | **yes** |
| **M-10** | glass-ui carousel route crashes Playwright WebKit | `amend2/data/wk-cells-webkit.log`: "page.goto: Page crashed" | **yes** |
| **P-07 / R-01, M-08 (Apple)** | rise −43.16 at 359.4, settle 1424.8, pill 269.29; 60 Hz −43.13 / 1424.1; WebKit −43.15 / 1412; stall 447.6 / 1817.1 | identical to 0.1 ms | **yes** |

Not re-derived here (round 1 re-derived them from `gap/data`, and nothing in amend 2 changed them): P-16, P-17, P-22, P-24, P-25, P-26, P-30, P-31, P-32, P-33, P-35, P-37, R-05, R-06, R-08, M-04.

## 3 · The owner's three words

- **Goo: SHORT, upheld.** Every number GAP gives reproduces, at 120 and 60 Hz. One amendment: "lands with 0 overshoot in 273–282 ms" is the bodies' *midpoint* within 0.5 px. Both bodies sit within 0.5 px of the target only at 290.1 / 289.4 / 371.6 ms. On the −160 px hop the trailing body is still 90 ms out when the midpoint has landed.
- **Breath: upheld.** Engaged EXCEED (stuck press SHORT), paused MATCH, default rest ABSENT, entrance ABSENT, all from samples.
- **Momentum: amend.**
  - "Frame-drop timing SHORT" holds, but the size is 29–39 ms (10–14 %), not 12–24 % (M-08 above).
  - "An interrupted move strands `aria-current`" should read "a move issued between rest and `scrollend`".
  - The programmatic-move SHORT rests on `pager-next`, not `interrupt` (P-21 above).

## 4 · Missing

1. **CR-06 has no reduced-motion clause.** Apple, under reduce: no autoplay until pressed, and an integer capsule (P-36's reference). CR-06's clauses (P-20, R-03, M-01, M-04, M-05, M-09) never mention reduce, so a library autoplay that runs under `prefers-reduced-motion` passes them. The demo's own gate (`carousel.vue:58-64`) shows the intent. Add: under reduce, a playing carousel does not advance until the play control is pressed, and the indicator changes in one frame.
2. **A stale index swallows the next programmatic move.** In `interrupt-r1/r2`, `to3` (a smooth `scrollTo(3·pitch)` from member 0, issued while `aria-current` was still stale at 2) moves the strip 0 → 2 → 5 and back to 0 within 55 ms, while `aria-current` flips 2 → 0 at 30 ms. In `wk-cells`, the same call from a clean 0 lands at 405. No row records it. It belongs with CR-09 (the same commit path), and CR-09's witness should add: a programmatic move issued after a stale commit reaches its target.
3. **The width-sum law against the goo edict.** CR-04 ("the sum of painted widths across the rail stays constant ± 0.5 px through every hop") and M-05 (the same, during the rewind) adopt Apple's linear trade. Elongation by velocity, the goo the owner named and the liquid-weight edict asks of pager dots, breaks a constant width sum by construction. §4 of GAP has no row for this conflict. It needs a ruling: either the sum law applies only at rest and under a held scrub, or the worm gives way to a position-slaved capsule and the goo moves to the capsule's ends.
4. **Hidden-tab time.** W-F.1 rules that "hidden time is not elapsed time" (`W-F.1.md:93`). CR-06's fill is a clock, and no clause or Apple cell covers `visibilitychange` to hidden: does the fill freeze, and does it resume from the frozen width? M-01 covers scroll-out only.
5. **Commit hygiene.** The amendment is committed at `39cdd9590` (`GAP.md` and all 63 `amend2/` files), so every A2 cell rests on a committed sample. `tools/__pycache__/` and `samples/source/` are untracked inside the reference tree and should stay out of any commit. My own import of `analyze.py` wrote an `amend2/tools/__pycache__/`, which I removed.

## 5 · Files

- `critique2/tools/rederive2.py` → `critique2/data/rederive2.json`: every number in §1–§3. Keys: `goo:*`, `m08-lag:*`, `material:*`, `reduced-pager:*`, `breath:*`, `interrupt:*`, `press:*`, `keyboard:*`, `sticky:*`, `enter:*`, `apple:*`, `cr01:*`, `contrast:*`, `m05:*`, `m09:*`. `pager-next:*` holds the Next × 3 chain behind P-21 and P-23 (from `gap/data/pager-next-r1/r2-1440.json.gz`; velocity is Δ`scrollLeft` / Δt between adjacent rAF samples): zero-velocity frames at 142, 268, 438 and 454 ms (r1) and at 135, 428 and 443 ms (r2), and a re-acceleration to 2963 / 3134 / 3100 and 2899 / 3049 / 3043 px/s after each press. Load 9.7 and 7.9 at those runs' start
- `critique2/tools/plant_witness.py` → `critique2/data/plant-witness.json`: CR-03's witness on the three synthetic entrances
- No browser ran, no frames were added, and no Apple code or media is stored
