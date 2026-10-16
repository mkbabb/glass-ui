# O-95 critique: STUDY, REMEASURE and GAP against their own files

Seat: REF/crit, model `claude-opus-5-5` (asserted from own system identity). 2026-10-15, 21:20–21:40 EDT. I wrote none of the three reports.

**Method.** I ran no browser. Every number below is re-derived from the committed raw samples, not from the reports' prose and not from `gap/data/summary.json`. Two tools, both mine:
- `critique/tools/rederive.py` reads `gap/data/*.json.gz` and writes `critique/data/rederive.json`.
- `critique/tools/rederive_ref.py` reads `samples/timeline-*.csv` and writes `critique/data/rederive-ref.json`.

Both ran under `guarded --light`. Re-run: `python3 -I critique/tools/rederive.py && python3 -I critique/tools/rederive_ref.py`. The 1-min load was 7.3–9.2 while they ran. That does not matter here, because no number of mine is a timing measurement: all timing comes from the seats' samples, with the loads stated in their `meta`. I also read the routed wave specs (`waves/W-E.12.md`, `W-F.2.md`, `W-F.3.md`, `W-F.5.md`, `W-B.15.md`, `W-0.11.md`, `design/engagement/REGISTRY.md` CK-08) and the cited source (`useCarousel.ts`, `useDeckSnap.ts:143-175`, `styles/glass/surfaces-pager.css`). I looked at the owner's frame and at `gap/frames/worm-hop-1to5-sheet.webp` and `click-dot4-r1-1440.png`.

**Short verdict: AMEND.** The instruments are sound, and the reference reading holds: every reference number I re-derived reproduces. GAP's ABSENT and SHORT rows hold. Its MATCH and EXCEED rows do not hold as a set:
- seven are false or unsupported (P-10, P-21, P-22 worm, P-23, P-36, R-02, and the goo and momentum verdicts)
- two carry wrong supporting numbers (P-18, P-27)
- four routings name waves whose mechanism does not own the defect (P-03, P-23 deck, CR-07, CR-08)

## 1 · Re-derived numbers

### 1a · Reference (from `samples/timeline-*.csv`)

| Quantity | Report | Re-derived | Holds? |
|---|---|---|---|
| Rise peak (P-05) | −43.16 px, 24.0 % | −43.16 px, 23.98 %, at 351–356 ms, identical in slow, fast and from-below runs | yes |
| Rise settle to 0.5 px | 1439 ms (study, anchored at the enter event) / 1424–1438 (re-measure) | 1411–1418 ms from the first `activated` frame | yes; the anchor explains the 20–28 ms difference |
| Pill under the blob from frame 0 (P-07 vs R-01) | study: a "single blob", pill from 0.50 s; re-measure: pill opaque from 0 ms | the **study's own CSV**: `bg0_op = 1`, visible 52 × 46.8 from the first activated frame, all three entry runs | R-01 holds; the study's P-07 is contradicted by its own file |
| Blob hidden | 548 ms (P-07) / 527–542 (re-measure) | 526.4 / 529.3 / 541.5 ms | re-measure holds; the study's 548 does not follow from its CSV |
| Fill rate (P-20) | 18.70 %/s | 8.976 px/s on a 48 px link = 18.699 %/s | yes |
| Dot sum (P-17) | 96.00–96.01 | 96.00–96.01 | yes |
| Cadence (P-24) | 6.65 s | 6658.3 ms between switches | yes |
| Full-capsule hold (R-03) | 509.8 / 524.5 ms "before each switch" | 516.7 ms before the second switch; **8.5 ms before the first** | amend R-03: the hold precedes every switch except the first |
| Tween shape (P-21) | easeInOutQuad | progress at 25/50/75 % of the move = 0.134 / 0.501 / 0.867 (easeInOutQuad: 0.125 / 0.5 / 0.875) | yes |

### 1b · glass-ui (from `gap/data/*.json.gz`)

| Quantity | GAP | Re-derived | Holds? |
|---|---|---|---|
| Active indicator at rest (P-16) | 12 vs pip 12; 8 vs 8 | ratio 1.0 at 1440 and 390, rest r1 and r2 | yes |
| Ring size on entry (P-04) | one value over 487–493 frames | 152 × 32 over 487–493 frames | yes (ABSENT) |
| Neck rect width (P-18) | 300.3–300.6 / 739.2 / 985.6 | 300.41 / 300.58 / 739.2 / 985.6; 1056 on the 208 px hero-scale ring | yes |
| Neck wider than the ring | "first ~95 ms" | **102 ms** (1 hop), **162–167 ms** (3 hops), **178–182 ms** (4 hops) | no: 95 ms is the last still's request time, not the end of the condition |
| Worm first motion after a dot click (P-22) | 8–26 ms; `aria-current` 6–14 ms | 8.3–26.2 ms; `aria-current` 6.1–18.2 ms | numbers yes; verdict no (§2) |
| Strip `scrollLeft` on every dot click | — | **0 in every frame** of click r1/r2 and worm-hero r1/r2 | the strip never moves (CR-01) |
| Smooth `scrollTo`, one member (P-21) | 304–312 ms, bézier (0.38–0.42, 0–0.04, 0.01–0.02, 0.95) | 298–303 ms; progress at 25/50/75 % = 0.26–0.36 / 0.83 / 0.96 | numbers yes; the curve is not easeInOutQuad (§2) |
| Truncated jump (P-21a) | `scrollTo(4·pitch)` lands at member 2 | 405 → 804 / 802, `aria-current` 2; reduced `scrollTo(580)` lands 435 | yes |
| Next ×3 (P-23 strip) | lands 580; speed "dips to 337–417 px/s, never 0" | lands 580; **0 px moved** over 136→142 ms (r1) and 129→135 ms (r2); about 210 px/s averaged over 24 ms | no |
| Worm retarget step (R-02) | −724 / −862 px/s "for one frame (≈ −6 px)" | −724 / −862, then −349 / −297, then −20 / −32 px/s: **three frames, −9.2 px** | no |
| Worm launch from rest | not reported | the bodies' midpoint first steps **backward** on every hop: −4.6 px on +28 (1 hop), −13.7 px on +84, +18.3 px on −112, −19.6 px on the hero-scale 4-hop; first-frame speed −551 to −572 and +2575 to +2612 px/s | a defect GAP calls C1 |
| Member projection (P-25) | scale 0.965–1.000, neighbours at opacity 0.7 | 0.965–1.0; opacity 0.7–1 | yes |
| Lag at rest (P-26) | residues 0.09–2.73 % | −1.01 / −1.02 % (smooth tail), 0.35 / 1.67 % (fling tail) | yes |
| Drag tracking (P-31) | 117 → 103–107 | 117 → 103 / 105; 160 → 148–151 | yes |
| Snap-back (P-32) | 181–193 ms | 171.7–187.0 ms by my 0.5 px rule (4 legs) | yes, within the reference's 185–198 at the threshold difference |
| Fling landing (P-32) | always one member | every fling lands one 344 px stride; release speed 928–1140 px/s | yes |
| Commit after a half-stride drag (R-06) | 29–36 ms after release | 28.8 / 35.9 ms | yes |
| Worm during a drag (P-17) | 0 frames | 0 frames moved in all 12 legs | yes |
| Overscroll (P-33) | `scrollLeft` 0, member at x 32 | 0, x 32 | yes |
| Idle (P-34) | nothing changes over 4 s; 8 running animations | 1 distinct value for `sl`, worm, stretch, pips, ring and members over 3991–4000 ms; 8 running animations (dock caps and fading-scroll fades) | yes |
| Resize (P-35, R-05) | re-snap and worm re-seat in one frame, 5–9 ms | 5.2–8.8 ms after each resize, the same frame for both; `aria-current` 2 throughout | yes |
| Shell dock under scroll (R-08) | 676.8 × 56 at y 832, constant; peaks 11 940–14 035 px/s | one rect `[78.59, 832, 676.81, 56]`; peaks 14 035 / 11 940 | yes |
| Pip hover (P-30) | α .52 → .72 and scale ×1.14 in 188–192 ms; release in 115–121 ms | 188.3 / 191.5 ms; release 115.4 / 121.4 ms | yes |
| Deck reversal (P-23 deck) | −2516 → +1917 px/s in one frame | −2218 → +1917 (r1), −2787 → +1860 (r2) across one frame | yes (GAP quotes the frame two before the flip) |
| Dark arm (P-37) | fill /0.22, drop shadow at 0.30 | fill /0.22, drop shadow 0.3, both runs | yes |
| Filters (P-10) | 0 on the ring and bodies | `filter: none` on the ring and all three bodies | yes (but see §2) |
| Pager material (P-03) | `blur(20px) saturate(1.5)`, four shadow layers | same | yes (but see §2 on what the four layers are) |
| Reduced motion, worm (P-36) | "seats in one frame (7–14 ms, stretch 1.000, 0 neck frames)" | **no worm samples exist**: `reduced-r*` drive exhibit 1, which has no pager. Row keys are `sl, it, dk, ms, …` only | no |

## 2 · Refuted and amended rows

| Row | GAP says | Why it does not stand | What it should read |
|---|---|---|---|
| **P-10** MATCH | the worm is filterless too | The MATCH covers only the absence half. P-10's positive half is continuity of colour, size and centre at the hand-off. glass-ui breaks size in its own samples: the neck's rect is 300–986 px on a 152 px ring for 102–182 ms, and the bodies' midpoint steps backward at launch. | MATCH (no filter) / SHORT (continuity), riding W-E.12 and W-F.3 |
| **R-02** EXCEED "C1 by law, one-frame step at retarget" | elongation is velocity, closes at landing | The samples show the reference's own defect class, a velocity sign reversal at a hand-off, on **every hop launch** and not only at a retarget (§1b). It lasts three frames, not one. W-F.3's own spec has already measured it: R3-01-03, "the trailing body steps behind the origin at launch", 12.2–12.8 px. GAP's cause (`worm.ts:170-173`, the span re-read) and its witness (sign kept ≥ 3 frames after a same-direction retarget) both miss the launch. A tree that fixed only the retarget would pass that witness. Also, R-02's referent is Apple's entrance hand-off, and glass-ui has no entrance. | N/A against the entrance (ABSENT, CR-03). Worm continuity is SHORT and owned by W-F.3 R3-01-03 with its G3 witness ("every body centre within 0.5 px of [origin, lead] on every frame"), which covers both launch and retarget |
| **P-21** MATCH | "a tween, no overshoot; 3× faster" | The shape does not match. At half time Apple's move is 0.50 done and glass-ui's is 0.83 done: a front-loaded deceleration (x2 ≈ 0.01), not ease-in-out. The duration is a third, and the curve is Chromium's smooth-scroll, which no glass-ui code authors, so no glass-ui witness can hold it. "No overshoot" is the only shared property, and it is an absence. | DIFFERS (an engine curve; no verdict against Apple). Against the liquid-weight edict, both are SHORT: neither carries velocity into or out of a programmatic move |
| **P-22** EXCEED (worm) | dot click → worm first motion 8–26 ms against Apple's 30 ms | Not like for like. Apple's 30 ms is the slide moving. In every glass-ui click run the strip never moves (`scrollLeft` 0 in all frames), so the worm answers fast towards a slide that never arrives (CR-01, `click-dot4-r1-1440.png`). | worm latency recorded, no verdict while CR-01 stands. Strip (Pager Next) 34.3–34.9 ms MATCH; the reduced-run 46.0 ms exceeds the re-measure's ±10 ms latency tolerance |
| **P-23** EXCEED (worm, strip) | "lands on 4 with the live velocity carried"; strip "never to 0" | (1) The 2 → 4 retarget fires at +250 ms, when the 2-hop is already at 16–71 px/s, so it cannot show carried velocity. It shows the −9.2 px backward step instead. (2) The 4 → 0 → 1 reversal does glide through: −596 → −80 → +155 px/s, a real carried reversal, so that half holds. (3) The strip shows three chained ease-outs that each nearly stop (0 px over one frame, about 210 px/s over 24 ms), not one carried motion. (4) In `smooth`, a second `scrollTo(0)` issued while the 1 → 4 move is settling lands the strip on member 0 while `aria-current` stays **2 for ≥ 1.99 s**, in both runs: interrupted programmatic moves leave the committed index stale. | Worm: accepts retargets, reversal continuous (EXCEED), launch steps back (SHORT, W-F.3). Strip: accepts, but staircases (SHORT against the edict). Index commit stale after an interrupted move: a new defect row (CR-09, §4) |
| **P-23 deck** routing → W-F.2 | "W-F.2 already carries the restart-from-`from` class" | W-F.2's family F-78 (R4-01-01..06, R5-01-01, R10-01-01/03) does not list `deck/styles/turn.css`. Its cure moves surfaces *onto* CSS transitions that start from the current value, which is exactly what the deck turn already does. Its gate bounds a position step (`maxStep ≤ 0.25`), not a velocity step. The deck's break is zero carried velocity, which W-F.2's mechanism does not own. | the deck's velocity hand-off is unowned. It needs a spring-seeded turn (W-F.1's register) or an explicit owner placement |
| **P-36** MATCH (worm) | the worm seats in one frame under reduce | No samples support it (§1b). "The demo's autoplay does stop under reduce" also has no sample. | SHORT (strip) stands; the worm cell is UNMEASURED |
| **P-18** EXCEED in design / SHORT in paint | "a black bar wider than the ring for the hop's first 95 ms"; the neck "paints" 300–986 px | The duration is 102–182 ms by samples. "Paints" is a rect width: the still shows the bar clipped to the ring, spanning it end to end. The witness bound of 76 px is W-E.12's hit-cell bound (pip measured 24, hop 28). It admits a neck 2.7× the hop, and W-E.12 says itself that the 12 px dot gives 52. | SHORT in paint, 102–182 ms of a rail-spanning bar. Witness at 52 px (hop + 2 × painted pip) |
| **P-27** MATCH | "ring size and material constant through every move" | The sampler records `ring` as a rect only; no material channel (blur, fill, shadow) is sampled per frame (`probe.mjs` SAMPLER). | size MATCH; material UNMEASURED |
| **P-03** SHORT, routed to D3 / W-0.11 | four shadow layers; witness ≤ 1 layer | Three of the four layers are `var(--glass-material-rim)`, the 1 px material edge that O-87 explicitly keeps ("keeps the material, its edge and its motion"). The witness (≤ 1 layer) would force deleting the edge. W-0.11's census counts `--shadow-*` tokens only, while the pager's drop shadow is a literal in `surfaces-pager.css` (`0 2px 6px -2px color-mix(...)`), so the routed wave would not see it. | SHORT on blur (20 px against the W-0.11 ladder) and on the literal drop shadow. Witness: no soft or offset shadow beyond the rim; the rim stays. W-0.11's census must read computed `box-shadow` on the pager, or the row is unowned |
| **CR-07** → W-B.15 | velocity-chosen landing rides "decide scroll glide" | W-B.15 decides the dock run's glide and retires a scripted page scroller. Carousel `scroll-snap-stop` is not in it. | owner placement (Q-CR-2) with no riding wave named |
| **CR-08** → W-F.5 | reduced-motion programmatic scroll rides W-F.5 | W-F.5 is the RTL / logical-offset wave. It changes how `useDeckSnap` reads offsets, not the `behavior` default (`useDeckSnap.ts:143`). It has no reduced-motion clause. | unowned. The cure is a one-line `behavior` from the media query, and it belongs with CR-01's `useDeckSnap` edits |
| **CR-05** → W-F.3 | the indicator reads `deck.position` | W-F.3 bounds offsets by position. Coupling `PagerDots` to `deck.position` is not in its files or cures. | unowned (proposed); W-F.3 is an adjacent edit, not its owner |
| **R-05** EXCEED | the worm re-seats in the same frame as the re-snap | The numbers hold. But the EXCEED is free today: glass-ui has no position-derived length to go stale. Once CR-04 and CR-05 give the indicator a length from `position`, Apple's 276–296 ms desync becomes possible, and no witness guards it. | EXCEED, with a witness added to CR-05: after each resize the indicator's length and centre equal the law's within one frame |

### The owner-word verdicts

- **Goo** (GAP: design EXCEEDS, paint SHORT). The "design" half rests on "elongation is velocity, zero gap at landing, C1 by law". The samples refute C1 (backward launch step, R3-01-03), and the paint is a rail-spanning bar for 102–182 ms of every hop. Apple has no goo between dots, so "better than the reference" is true of the intent but not of anything the samples show working. **Goo is SHORT** until W-E.12 (neck) and W-F.3 (trail) land and the CR-04 capsule exists. The owner's frame is a capsule, and glass-ui shows a 12 px dot.
- **Breath of life** (GAP: engaged EXCEED, idle MATCH, state-bearing and entrance ABSENT). Engaged holds: pip hover ×1.14 in 188–192 ms, the 0.97 press, the projection. Idle MATCH holds only against Apple's paused state. Apple's default rest is playing: autoplay starts on entry, and the fill moves at 18.70 %/s. Against the default rest, and against the edict ("never dead at rest"), glass-ui's idle (0 changed values over 4 s) is **ABSENT**. **Amend**: engaged EXCEED, paused MATCH, default rest ABSENT, entrance ABSENT.
- **Momentum** (GAP: release MATCH, retarget EXCEED, indicator SHORT, bounce SHORT). Retarget EXCEED does not stand (P-23 above): the strip staircases, the worm steps back at launch, the deck reverses with zero carried velocity, and an interrupted programmatic move strands `aria-current`. **Amend**: release MATCH (snap-back), landing SHORT (one member per fling), retarget mixed (worm reversal EXCEED; strip and deck SHORT), indicator SHORT, bounce SHORT.

## 3 · Rows upheld

These follow from their files: P-01, P-02, P-04 (ABSENT), P-16, P-17, P-21a, P-24 (library has no `loop`, `useCarousel.ts:12-13`), P-25, P-26, P-30, P-31, P-32, P-33, P-34 (paused), P-35, P-37, R-05 (numbers; §2 adds a witness), R-06, R-08.

Two of the MATCH rows, P-33 and R-08, are matches of absence: no elastic overscroll in headless Chromium, and a `position: fixed` shell dock that cannot move under `<main>`'s scroll. They are true but carry no evidence of quality.

The reference rows (STUDY + REMEASURE) hold, with two corrections:
- P-07: REMEASURE's R-01 correction is proven by the study's own CSV.
- R-03: there is no hold before the first switch.

## 4 · Witnesses that could pass on unfinished work

- **CR-03 (entrance).** "Width, rise and material change over ≥ 1.0 s; identical at 300 and 6000 px/s; no replay." A 1 s linear CSS fade passes it. Add:
  - a blob-to-pill hand-off with no visible gap (union area ≥ the smaller shape on every frame)
  - the button emerging from behind the pill
  - a staggered dot entrance
  - an overshoot band ruled by Q-CR-1
- **P-01 / CR-02 (media dock).** "Δy ≤ 0.5 px while `<main>` scrolls 0 → 700." A `position: fixed` group passes it. Apple's dock is sticky within the gallery and leaves with it. Add: the group releases with the carousel's bottom edge.
- **CR-06 (timed state).** The witness checks the fill's linearity and its freeze when paused. It does not check "paused on any user motion" (R-06) or the reference's pause on scroll-out (below). Add both.
- **CR-04 (capsule).** "≥ 3×" is half the reference's 6×. That is acceptable as a floor only if CR-05's law makes length a function of `position`; otherwise a fixed 36 px pill passes.
- **R-02 / W-F.3.** GAP's witness tests the retarget only. W-F.3's G3, which covers every frame, is the one to bind.
- **New CR-09.** After `scrollTo` interrupts an in-flight programmatic move, `aria-current` equals the member under the snap within one frame of `scrollend`. Today it is stale for ≥ 1.99 s (`smooth` r1, r2). Owner: the CR-01 edit to `useDeckSnap`.

## 5 · Reference motion no row covers

1. **Autoplay follows visibility.** The AAP keyframe pauses on scroll-out and resumes on scroll-in (STUDY §2.4, dot-click note). No row in any of the three reports measures it, and CR-06 omits it.
2. **The sticky release.** The dock is sticky (`bottom: 32px`) only within the gallery section and leaves with it. How it leaves (no exit animation, no unstick easing) is unmeasured. R-08 covers only coupling while stuck.
3. **Glass over moving media.** The pill sits on playing video. Dot ink stays `rgba(0,0,0,.42)` over dark and light slides (STUDY §1), so legibility and contrast over a changing backdrop is unmeasured. glass-ui's `@container style(--glass-backdrop: light)` arm could exceed here, and no row tests it.
4. **Fill speed during the capsule's growth.** The fill is a percent of a widening link, so its pixel speed rises during the 1 s tween (STUDY §2.2). The 15 % hidden nub means the visible fill starts 0.84 s after each switch (`rederive-ref.json`). No row asks glass-ui's future fill to start visibly at the switch.
5. **The rewind sweep.** `.ended` → replay rewinds through all seven dots in 1 s, and the capsule sweeps each intermediate dot (P-18, P-24). CR-06 says nothing about rewind or end-state motion.
6. **Carousel keyboard.** ArrowRight moves the reference, and End, Home and ArrowLeft did not (G-3). GAP measured the deck's keyboard, not the carousel's. Roving focus on the dots and focus-follow are unmeasured.
7. **Press and drag-off cancel on dots.** The reference shows no press state on a press-and-drag-off (STUDY §2.3). glass-ui's 0.97 press squish has no cancel cell.
8. **Frame-rate independence.** Apple integrates at a fixed 1/60 s with interpolation. glass-ui's worm uses 8 substeps. Neither is measured at 60 Hz or under dropped frames; every run was at 120 Hz.
9. **The playing → paused transition of the fill.** The fill freezes in place (STUDY §2.3), and resuming continues from the frozen width. Unmeasured as a hand-off for glass-ui's future fill.
10. **WebKit and Safari.** Every GAP witness promises "both engines", and none was run. The cells are expectations only, which GAP states itself (§6).

## 6 · Files

- `critique/tools/rederive.py`, `critique/data/rederive.json`: the glass-ui numbers in §1b and §2
- `critique/tools/rederive_ref.py`, `critique/data/rederive-ref.json`: the reference numbers in §1a
- No frames added. The cited stills are GAP's: `gap/frames/worm-hop-1to5-sheet.webp`, `gap/frames/click-dot4-r1-1440.png`
