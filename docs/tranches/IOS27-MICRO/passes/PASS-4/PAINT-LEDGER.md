# PASS-4 PAINT-LEDGER — the serialized browser arm (IOS27-MICRO)

verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat
p4:PAINT-ARM, 2026-07-19 — the ONLY browser-owning seat this pass (singleton honored;
every session below serialized, one browser at a time).

Engines of record: repo-local Playwright 1.61.1 — WebKit webkit-2311 (the pass-2/3 engine
of record) + bundled Chromium; headed, macOS, DPR 1, viewport == video size. Display
~100Hz (frame p50 ≈ 10ms). WebKit MATERIAL verdicts ride the VIDEO path (25fps VP8;
Playwright-WebKit screenshots are backdrop-filter-blind) — EXCEPT canvas-painted textures
(v-thinkfield fields), which WebKit screenshots capture honestly and are used as such.
Chromium screenshots are lossless and paint-honest. Traces and cost rows ride `?hud=0`
NO-VIDEO arms (the R2 contention lesson, now protocol); cell-reading arms run HUD-ON where
the page's own cells are the chartered decider (morphdock `say()`, constellation `setCell`
are HUD-gated — discovered and honored this session). Frame-gap statistics only. No
`@supports` gate consulted anywhere — every verdict is a runtime paint observation.

Captures: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/scratchpad/paint/captures/p4/`
(cited as `CAP4/`). Runners beside them (`p4-*.mjs`); per-page JSON logs carry every raw
series, rect, and phase clock quoted below. Node batteries re-verified green by THIS seat
before any browser was driven: spine 86/86 · assembly 189/189 · morphdock 58/58 ·
thinkfield 66/66 (all exit 0).

Work order: (1) the pass-4 cure paint-halves (kernel/assembly/coverage QUEUED-PAINT);
(2) the pass-3 FAIL-class rows post-cure; (3) the 3 BLOCKED + 7 DEFER rows where now
evaluable. Verdict vocabulary per CHARTER §O-3 as amended (PASS · PASS-B · FAIL · DEFER ·
BLOCKED · PAGE-DEFER · DEVICE-DEFER · RERUN-OWED = OPEN).

---

## Order 1 — SPINE-CONDUCTOR: the D5-unblocked drain + the kernel batch's WebKit halves

Logs `CAP4/spine-conductor/log-{webkit,chromium}.json`, clean arm `log2-webkit.json`;
WebKit video `page@6b930b9….webm`. Protocol: cold battery REPORTED, warm battery is the
gate (§4.12); R1/R2/PRM on the NO-VIDEO clean arm.

| row | verdict | evidence |
|---|---|---|
| 1 full CC battery, internal | **PASS both engines** | WebKit **cold 18/18 AND warm 18/18**; Chromium cold+warm 18/18. The §4.12 cold-start seam did NOT reproduce on WebKit (cold was green); the warm-run protocol was honored regardless. The pass-3 BLOCKED row drains green — B-1's evidence half is now engine-pair-CLOSED |
| 2 paint-side sampling (G9) | **PASS both engines** | 18/18 in PAINT-SIDE mode on both (WebKit summary line banked; the var→CSS binding certified now on BOTH engines, not Chrome-only) |
| 3 union interrupt arms | **PASS both engines** | `v-im/v-is/v-i2` = PASS[ok] ×3 on both engines (cells UNBLOCKED post-D5 and green); dip arm re-run beside it (v-dm/v-df ok); the held/dip choreography rides the banked WebKit video |
| 4 sub-sat held scrub | **PASS** (cells) | the battery's `v-i2` (sub-sat catch medium = g/sat) green in all four battery runs; manual pairing rode to t 0.1294 → scrim 1.0 (clamp arm only — the sub-0.12 three-decimal pairing is pass-3's, which stands) |
| 5 light channel | **PASS both engines** | per-rAF `--sc-light` series: fires at open; **`[P4-AGG 2026-07-19, CRIT-KERNEL minor 6 — the 127/162ms figures did not derive from the banked series; restated with NAMED anchors]** first ≥0.995 at 96ms (CHR) / 130ms (WK) of series start; peak 1.00 held from +174ms (CHR) / +182ms (WK) after the fire point; cools <0.1 by ~1.7s, **tail exactly 0** (zero idle light); battery clock cells (ll/lh/lc) green inside the 18/18 |
| 6 Maps battery incl. the D2 still-hold cell | **PASS-B both engines `[P4-AGG restated — CRIT-KERNEL M-A]`** | **LIVE figures, not the sim echo**: pin covered LIVE **94% (WK — OUTSIDE the printed 75–92%, displayed [ok] by the then lo-only gate; most plausibly a sampling-late v83 artifact under video contention) / 85% (CHR, in-band)**; pin settle live 120–121ms; sim column 81%/115ms. The lo-only live gates were the A1 unfailable-gate class on the family's gate-honesty reference — **CURED [P4-AGG]: both live pin cells now gate two-sided against the printed bands (+20ms settle sampler allowance, printed in the band cell); the WK pin-coverage cell is RERUN-OWED at the next live window**. The rest hold live: overpull 0.6–0.8%/192–227ms · flung **0.023s**/179–181ms · catch dwell 172–182ms, landed 631–640ms (sim ±40) · breathe 3.73% · **still-hold \|v\| 0.0053–0.0054/s, peak−1 0.0004–0.0007** — the MARKS C1 law green in paint on both engines |
| 7 PRM regression | **PASS both engines** | clean arm: `--sc-t` seats in ONE poll (+120ms) and holds: WK ccOpen 0→1→1, mapsOpen 0→1→1, mapsClose 1→0→0; CHR ccClose 1→0→0, mapsClose 1→0→0; prmParkRaf 0 ×2. (Main-run probe read open-on-open — instrument artifact, cured in the clean arm) |
| 8 R1 + R2 | **PASS both engines, CLEAN** | NO-VIDEO arms: R1 natural AND forced **0 dropped >24ms on BOTH engines** (WK avg gap 10.21ms); R2 **GREEN ×2 consecutive on BOTH** (WK max jump 0.5→ clean-arm 0.183–0.200-class; CHR 0.183/0.175). Under video recording WebKit reads RED (0.5–0.6) — the chartered contention caveat, reproduced and bounded, never banked as the verdict |
| 9 park honesty | **PASS both engines** | rAF parked at every settle (parkRaf 0 over 2.5s ×2 engines), badge "regime: parked", **zero pageerrors + zero console messages** across boot + 3 batteries + all cells + ladder + PRM on BOTH engines — the pass-3 conditional row RESOLVES green |
| 10 Maps release-velocity ladder | **PASS both engines (MEASURED)** | real-pointer rungs, `--sc-t` per rAF: **still-hold** (drag → 800ms dead hold → release): relV prints 0.00/s, overshoot **0.0000 (WK) / 0.0001 (CHR)** — a still finger's velocity is zero, in paint; **slow** 0.33–0.40/s: overpull release settles clean; **flick** 9.20/s (WK) → overshoot 0.1803 ⇒ k = **0.0196s**; 7.76/s (CHR) → 0.1471 ⇒ k = **0.0190s** — inside the C2 k·v band [0.015, 0.030] on both engines. The M-1 live obligation is closed beyond the still-hold point |

**Body tally `[P4-AGG restated — CRIT-KERNEL M-A/M-B]`: 9 PASS + 1 PASS-B (row 6 — the WK
pin-coverage escape is named, its cell RERUN-OWED post-gate-cure; the R2 contention note is
protocol now, not a bound).** The ARBITRATION §3.2-SC obligation (i) is engine-pair
satisfied; PROBE-NOTES §5's CARRY stamps are all redeemed **EXCEPT the bottom-edge
sub-pixel geometry protocol — never run in any pass-4 row; the pass-3 coarse "bottom edge
immobile ×2 engines" observation stands as the only evidence, and the protocol-grade run
passes to the lead adjudication BY NAME (the A8 roll-up class, caught by CRIT-KERNEL M-B)**.

## Order 2 — PROTO-ASSEMBLY: the D6/D7/D8 re-runs + QP rows

Logs `CAP4/proto-assembly/log-{webkit,chromium}.json`, `log-kv-*.json`, `log-prm-*.json`;
WebKit video `page@41f2e99….webm`; Chromium lossless `chromium-d7-{rest,live,post}.png`,
`chromium-row11-drawer.png`, `qp12-straddle-crop.png`, `qp13-g*.png`.

### The three defect re-runs (the pass-3 FAIL rows on this page)

| defect | verdict | evidence |
|---|---|---|
| **D7 world dim (row 1)** | **PASS — the ±2% law HOLDS; pass-3 FAIL cleared; the page exonerated** | Chromium LOSSLESS, rest/live/post, probes strictly outside the battery's PRINTED clamped extent (x∉[457.2, 802.8] = cx630±172.8, the SESSION-grown 1.12× width; y-band probes in the 26px world strips x422–450/x810–838, y430–630, plus wide probes above y196): **Δlive = 0.00% on EVERY fence-honored probe; Δpost = 0.00%** (`p4-asm.mjs` d7 block + the L3/R3 supplement). THE AUTOPSY OF PASS-3'S −13/−30%: the session dock GROWS to 330px wide (rect [465, 361, 330×320] live — probed this session); pass-3's right probe x755 sat INSIDE the live extent and its left probe rode the edge on the VP8 path. THIS SEAT REPRODUCED THE TRAP first (a rest-rect-derived fence read −22.3/−29.5% from probes overlapping the live dock body) and then honored the printed fence — the misread and its correction are both banked. No scrim exists; the "scrimless by construction" comments stand EXONERATED; no compositor hunt is owed |
| **D6 handoff beat (row 7)** | **PASS both engines — sign, band, AND seed-invariance** | instrumented anchors (painted content-out = max(body, ghost-c, ghost-m) computed opacity < VIS_EPS 0.06 → medium's first fall, 8ms sampler): **zero-seed 120ms (WK) / 112ms (CHR); hot-seed 109ms (WK) / 113ms (CHR)** — inside [80,140], |Δseed| ≤ 11ms ≈ sampler quantization. The d0/v-aware stamp printed live: 287.1ms zero-seed / 233.1ms hot-seed (`--vap-medium-delay-ms`). The pass-3 256–397ms class is gone; the A5 gen-guard + A7 re-anchor cure lands in paint |
| **D8 sim/paint overshoot gap (row 4)** | **PASS both engines — CLOSED at the certified number, base PRINTED** | dock bottom edge, 8ms sampler: rest 407.6 → settle 681.6, **travel = 274.0px (the g-travel base, printed and confirmed in paint)**, peak 692.9–693.0 ⇒ overshoot 11.34px = **4.14% of travel on BOTH engines** (4.14% WK / 4.14% CHR; 3.54% on the 320px height base — printed both). Certified 4.15%; the substepped integrator paints it. computed `--asm-g` peak 1.0366–1.0414 pairs. D8's dominant-term adjudication (integrator dt) is CONFIRMED in paint |

### The QP rows

| row | verdict | evidence |
|---|---|---|
| 2 non-modal truth | **PASS ×2** | world-tap 0→1 during the live session, both engines |
| 3 meniscus autonomy | **pass-3 PASS-B STANDS** | not re-adjudicated (fresh 8s rest window banked on video; the pass-3 bound — 16px band dilution — is unchanged by any pass-4 cure) |
| 4 fired-deploy ladder | **PASS (D8 half)** · text-condense half: pass-3 mechanism-confirmed STANDS | overshoot row cured+measured above; the born-blurred condense read was not re-run (no cure touched it) |
| 5 gesture-arrival k·v | **mechanism AND band PASS `[P4-AGG re-judged — CRIT-ASSEMBLY A1 SUSTAINED: the divisor was wrong, not the page]`** | the painted numbers stand exactly as measured: still-hold@0.70 (500ms) → overshoot **0.37–0.42%** (near-dead, no false fling — the D2-class half GREEN both engines); v 2.1–2.8/s → 0.41–0.45%; v 4.9/s → 0.86% (CHR), v 7.4/s → **2.87%** (WK), monotone in v. THE RE-CLASS: the chartered k≈0.023s is defined at the CROSSING (the corpus fits release at/beyond target; the page's own kvLaw seeds AT x=1); this ladder released at g≈0.70 with 0.30 of travel left, where ζ0.82 lawfully dissipates most of the seed. Re-derived on the page's own register (crit-kv.mjs, re-run by the agglomeration seat): the measured overshoots match the register's lawful output at every rung, and **k at the crossing = 0.0231–0.0233s — dead inside [0.016, 0.030]**. Nothing damps or re-seeds; D10 re-classes to an INSTRUMENT-DEFINITION note (the ladder must measure v at the crossing — the SC Maps rungs do, which is why they read 0.019). The A4 catch: pointerdown mid-flight seizes with no teleport step (max 8ms step 0.073–0.118 = flight-speed class, smooth distribution, no discontinuity) |
| 6 standing sea | **pass-3 PASS-B STANDS** | fresh session video banked; the 60fps-class cut bound is unchanged |
| 7 handoff beat | **PASS** — see D6 above (the pass-3 band-FAIL clears) |
| 8 one-writer witness | **PASS ×2** | `data-writer="asm-conductor"` the ONLY writer across every 8ms sample of every phase incl. both handoffs, both engines |
| 9 drift direction | **computed PASS · paint sub-read DEFER (60fps-class)** | the A9 stamps lock both ghost axes to `drift.magPx` on the corner ray (battery-gated); the 25fps granular field still cannot resolve painted direction — the sub-read keeps its named 60fps re-entry |
| 10 condense bell | **pass-3 PASS-B STANDS** (bell interior beyond 25fps, unchanged) |
| 11 grow + hue conservation | **PASS-B (the DEFER part DRAINED)** | 30°-bin hue histograms, Chromium lossless: sea crest band 85% in the 30–60° gold bin; drawer islands **95% in the SAME bin** + trace plum (54/7/4 px in 270–360°) — island glow rides the crest hue class. BOUND: per-island exact pairing (vs class-level) would need per-island rects — class-level is what the row's paint half can honestly claim |
| 12 transferred v-perch row 4 | **RUN → the m9 ban LIFTS** | the composed organ ran end-to-end again on both engines with the witness green — and rows 1 + 7 now re-run GREEN, which is the ban's own lift clause (pass-3 row 12, verbatim). "Proven together" language is now EARNED for this page |
| 13 both engines | **PASS-B** | full sessions on both: WK 3 gaps >24ms (max 45ms, one 34+; reset-scoped class); CHR 2 >24ms (max 40.8ms at reset). Zero errors both. The QP-4-note filter keyframes produced no long-frame class in any organ window |
| 14 PRM sweep | **PASS ×2** | deploy posture "session" at +120ms with sea `display:none`; perch commit removes the card (`display:none`), both engines |
| QP-12 corner-shape straddle | **PASS (Chromium)** | computed `corner-shape: squircle` on `.vcard` (authored, painting); the magnified crop (`qp12-straddle-crop.png`) shows the perch dot astride the squircle corner arc — upper-left on world, lower-right on glass. The A3 per-engine honesty holds: WebKit drops the declaration and honestly seats n=2 (battery-verified, not re-painted here) |
| QP-13 mask tiling read (n2) | **PASS-B (MEASURED)** | WebKit video mid-erosion ×3 frames: horizontal mean-abs-diff DIPS at the 48px lag **12–25% below the 40/56/72/88px neighbor baseline** (0.120/0.249/0.226); the 64px lag is inconsistent (0.5–17.5%) and 96px anti-correlates. The 48px tile's repetition is statistically detectable, visually faint at 25fps — MARKS-E §4.8 judged; the cure dial stays "larger single tile" if the FINAL wave set wants it below detection |

**Body tally `[P4-AGG restated — CRIT-ASSEMBLY A1 + CRIT-COVERAGE minor 2]`: 13 PASS-class
this session (rows 1, 2, 4-D8, 5 whole at the crossing anchor, 7, 8, 11, 12, 13, 14,
QP-12, QP-13) · 3 pass-3-stands (3, 6, 10) · 1 sub-read DEFER (row 9, 60fps) · 1
instrument-definition finding (row 5's divisor → D10, re-classed at the agglomeration —
never a page FAIL; the original tally's "0 new FAIL rows" clause outran its own D10 mint,
the cardinal-lesson class at its smallest scale, and is retired by this restatement). The
page's two pass-3 FAIL bands are BOTH cleared; m9 lifts.**

## Order 3 — V-MORPHDOCK (the MAJOR-1 build; 9 QP rows)

Logs `CAP4/v-morphdock/log-{webkit,chromium}.json`, `log-trace-*.json`, `log-prm-*.json`;
WebKit video `page@c8b87de….webm`; Chromium lossless `chromium-halo-{idle,peak}.png`,
`chromium-register-night.png`; WebKit video frames `wk-halo-{idle,peak}.png`. Viewport
2100×1150 (the three-arena duel needs it; at 1280 the docks clip — instrument note).

| row | verdict | evidence |
|---|---|---|
| QP-1 **THE DUEL DECIDER** | **VERDICT STANDS (arm 3) · EVIDENCE HALF RERUN-OWED `[P4-AGG — CRIT-ASSEMBLY B-1: the banked run's re-engage leg was a NO-OP on arms 1–2 (local settles promoted engaged despite the interrupt — reparents 3 is the no-op parity, not the scripted 4) and arm 3's seam carried an uncancelled second writer (16.9px banked ≙ two-writer double-step; ≈14.0px clean); the by-construction census/reparent verdict survives, the interrupt-seam bound and the re-engage claim do NOT. Gen-guard cure LANDED in code at the agglomeration (battery 73/73); the full duel re-run passes to the lead by name]`** | one script, three arms, the page's own cells: **arm 3 (morph): census 1 · reparents 0 · seam 16.9px (CHR) / 21.2px (WK)**; arm 1 (FLIP foil): census 2 · **reparents 3** · seam 75.1/62.7px; arm 2 (growth foil): census 2 · reparents 0 · maxStep 0 (continuity by clone crossfade — the dual-image class, on the banked video). Arm 3 keeps ONE painted backdrop body and the SAME label node through engage → interrupt(+120ms) → re-engage → dismiss; the foils each pay their predicted price. N1's question is decided; feed #7's dependency can consume this. BOUND (honest): arm 3's interrupt seam step (16.9–21.2px in one ~10ms frame) is 3–4× under the FLIP seam but is NOT "≈0" — the retarget velocity spike at the interrupt is real; whether the roster's "seam ≈0" text re-words or the spring catch gains a velocity clamp is the LEAD's call (filed as observation O-2) |
| QP-2 nucleate-and-sweep | **PASS-B** | growth rides on video as one body (census 1 throughout; no crossfade frame); the ~1-frame right-edge landing and +0.7%/150ms absorption are node-gated and beyond 25fps — the pass-3 resolution law applied |
| QP-3 evaporation dismissal | **PASS-B** | exit visibly front-loaded on video, label flies home, fill dies fast; the ≤2-frames-at-60fps figure is beyond 25fps — bounded, node profile green |
| QP-4 halo annulus | **PASS both engines** | Chromium lossless: ring-band stripe energy 1.153 → **0.858** at peak (blur paints, locally) while the far band is **byte-identical (1.945 → 1.945)**; luminance LOCKED (near ratio 0.999, far 1.000 — no dim term). WebKit VIDEO path: ring 1.600 → **1.026**, far 2.341 → 2.072 (VP8 noise class), luminance 1.004/0.999 — the backdrop material paints on WebKit too. One channel, one clock (`--md-t` rides both halo opacity and morph — engage series banked) |
| QP-5 detent grammar | **PASS both engines** | scrub: labels snap High→Medium→Low at crossings while the fill tracks the finger (label series banked ×2 engines); **D2 still-hold row: drag → 350ms dead hold → release lands NEAREST (no false fling)**; a real fling releases moving and projects High — law 7c + the age-out, in paint |
| QP-6 engagement light | **PASS both engines** | per-rAF pairs: light crosses 0.1 at **58ms (WK) / 60ms (CHR)**, geometry at 99/113ms — light leads ~41–52ms (the ~50ms law); zero idle light (idle HUD + rAF 0) |
| QP-7 cost + park | **RERUN-OWED `[P4-AGG — CRIT-ASSEMBLY B-1: the fixed-dt orphan model deadlocks (rAF immortal, --md-t pinned 1.0) while this row banked park 0 ×2 — the two stories cannot both hold as stated; real variable-dt may have escaped through a lucky \|v\|<2 frame, and the post-cure re-run adjudicates which story held. The gap figures (CHR 0 >24ms n=1175; WK 1 boot-class) stand as cost evidence]`** | NO-VIDEO hud=0 trace arms through the whole duel; idle rAF 0 ×2. The cells-arm WK gap figures under video recording are contention-class and not banked |
| QP-8 PRM sweep | **PASS-B both engines** | engage lands SINGLE-STEP: t and light at 1.0000 by +90ms and held ×2 engines. BOUND: the dismiss probe read 1.0000 at +90ms — consistent with the second synthetic click not registering (instrument), not adjudicated as a page defect; re-probe rides any future arm |
| QP-9 register read | **PASS-B** | day arm: warm cream frosted capsule, dots ghosting through, no gloss (shots + video); night arm: warm charcoal — dock region R−B **+10.4** (rgb 40/35/30, never blue-black; the cross-page (d) law green here). Formal referent-paired judgment vs proto-frosted-cure remains the FINAL wave set's — class-level canon read is green |

**Body tally `[P4-AGG restated — B-1]`: 7 PASS-class (5 with stated bounds) · 2 RERUN-OWED
(QP-1 evidence half, QP-7 park truth) · 0 FAIL. The duel VERDICT (arm 3) stands
by-construction; the MAJOR-1 stamp's paint half is redeemed for the verdict and OPEN for
the interrupt evidence — the D11 cure re-run is the redemption's tail.**

## Order 4 — V-THINKFIELD (the MAJOR-2 build; 8 QP rows) — one page defect FOUND

Logs `CAP4/v-thinkfield/log-{webkit,chromium}.json`, `log-prm-*.json`; shot series
`{engine}-idle-00..11.png`, `{engine}-think-00..09.png`, `{engine}-night.png`; WebKit video
`page@1609722….webm`. Canvas textures read honestly on both engines' screenshots (no
backdrop-filter in the judged surfaces).

| row | verdict | evidence |
|---|---|---|
| QP-1 texture tells state | **PASS** | blind pulls are unmistakable on the banked shots, both engines: idle = intimate size-graded halftone mound around the composer, scalloped, dead well inside ~400px; thinking = full-bleed laminar ridge field stage-wide. CAVEAT: both textures co-paint mid-think (the D9 defect below) — the swap still reads because the ridges are full-bleed, but the claim's "swap" is dirtied by D9 |
| QP-2 hue-sweep-as-progress | **PASS-B both engines (the paired-π read)** | `--tf-hue` publishes 85→340.7° over 4.62s = **55.3°/s (CHR)** / 85→334.1° = **55.0°/s (WK)**, monotone, zero backward steps (10-sample series ×2). PAINTED half: the moving field band tracks it — at var 114.5° the field paints a 38.7k-px yellow-green band (45–60° sRGB); by var 256.6° that band collapses to 8k and the cyan-blue-violet bins (180–300°) appear (1.4k+1.3k+0.9k+0.7k+0.9k+1.1k+1.9k px) — direction correct, no backward step across the series. BOUNDS: (i) the ridges are FAINT over cream (sat 0.045–0.14; the mid-blue phase reads as a whisper — sRGB gamut compression, a design-register note for the lead); (ii) a naive full-field hue mean is pinned by the static plum world mass — the instrument must gate saturation AND exclude static pools (method banked) |
| QP-3 idle floor breathes IN PAINT | **PASS both engines — the D3 gate applied and passed** | composer-band dot-mass fraction over 12 shots @700ms with **rAF delta 0 for the whole window**: CHR 0.0386→0.0522 (**±15.0% relative swing**), WK 0.0416→0.0566 (±15.3%) — the ±19% token undersampled at 700ms cadence lands ~15% observed; far above capture noise (the v-wave D3 corpse read 0.00002 lum; this is a mass signal, not a luminance whisper). The refused Gemini freeze stays refused ON PIXELS. Drift (~7.6px/s) not separately certified — the mass phase movement is visible across shots; sub-read available to a future arm if the lead wants the number |
| QP-4 send bloom + the yield | **bloom PASS-B · yield-half FAIL → D9** | bloom: at +600ms the think texture is fully arrived (38.7k saturated moving px vs ~0 at idle in those bins — the arrival is visible and fast); the ~1.55× chroma RATIO is not cleanly separable from the ground mix at 8-bit — bounded. **The yield half FAILS: the idle halftone NEVER yields the stage** — see D9 |
| QP-5 the affordance rides the field | **PASS-B** | the chip arms mid-think floating IN the field (shots); its ring consumes `--tf-hue` (computed box-shadow carries the oklch var chain); press → answer path ran with park after. The ~50ms light-first press lead was not separately clocked here — bounded (the law-20 envelope is node-gated on this page; the SC/morphdock rows carry the law's paint precedent this pass) |
| QP-6 cost + park | **PASS both engines** | think window gaps: CHR 0 >24ms (n=504); WK 1 (max 26ms); answer → park 0 rAF/3s ×2; idle 8.4s window rAF 0 ×2 (the QP-3 series doubles as the ≥10s-class idle watch with the CSS breath live) |
| QP-7 PRM sweep | **PASS both engines** | think lands as a STILL-STEP: hue snaps to **90.00 = 3×30° quantum** at +150ms and is IDENTICAL at +1650ms; rAF delta 0; hud prints the parked still-step, both engines |
| QP-8 night arm warm read | **PASS both engines** | night ground R−B **+24.7 (CHR) / +25.2 (WK)**, center composite +7.3 — warm, never dead black; the cross-page (d) check applied at build time as ordered |

**Body tally: 7 PASS-class (4 bounded) · 1 half-FAIL (QP-4 yield → D9). The MAJOR-2
stamp's paint half is redeemed with one real defect found and filed.**

## Order 5 — the pass-3 FAIL-class register, re-judged post-cure

| defect | pass-4 state | evidence |
|---|---|---|
| D1 v-perch seat (perch row 3) | **CODE HALF CURED `[P4-AGG]` — the paint re-verify passes to the lead** | the pass-4 pin stood as filed (`SQUIRCLE_K: 1` + the k·r·(1−1/√2) seat); CURED at the agglomeration per the R-9 re-ruled text verbatim: seat = `R·(1−2^(−1/n))` (n=2 → 8.20px round paint / n=4 → 4.46px squircle paint), the plate AUTHORS `corner-shape: squircle`, the page stamps `--perch-seat` from the PAINTED shape per engine, the magic knob deleted; battery 43/43 with both apex derivations + the authorship lock gated. The geometric ≤0.5px paint gate + the [0.55, 0.63] telltale read are the lead's named re-run |
| D2 v-vapor stale release velocity | **CODE HALF CURED `[P4-AGG]` — the live re-run passes to the lead** | the pass-4 reproduction stands banked: drag to d = **0.3462**, hold DEAD STILL 500ms, release → **glides 0.3462 → 1.0000** (false COMMIT from a still hold), byte-same on WK and CHR (`CAP4/misc/log-vapor-*.json`). **`[P4-AGG correction — CRIT-ASSEMBLY A2]`: the "UNIQUE to this page" clause was FALSE on disk when written — proto-assembly's BOTH organ releases carried the same prune-in-move-only class (Organ B's consequence the same destructive false commit; its still-rung read the zero-seed intrinsic, certifying nothing about flick-then-freeze). The class is "present wherever prune-in-move-only ships." CURES LANDED at the agglomeration: v-vapor release ages the boxcar by wall clock (STILL_HOLD_MS 120, battery-gated) AND both assembly organs age theirs (ASM.dock.stillHoldMs, 2 wiring gates). Flick-then-freeze paint rungs on all three surfaces are the lead's named re-run** |
| D3 v-wave breath paint-dead | **FAIL STANDS — cure NOT landed** | the sea re-skin never landed (`v-wave/index.html:68-84` unchanged, `.breath` 1px hairline organ intact). Not re-driven. The D3 LESSON is meanwhile proven live: thinkfield's build-time painted-delta gate passed (order 4 QP-3) |
| D4 constellation re-home | **FAIL STANDS — REPRODUCED fresh, both engines** | `aRehomeL` = **"1.00px [no]"** on WK AND CHR (`CAP4/misc/log-const-*.json`; HUD-ON arm — setCell is HUD-gated). The constellation continuation never ran; the FLIP-exact/live-1.00px gap is stable and waiting |
| D5 SC battery crash | **CLEARED** | order 1 rows 1–3/9: both engines green, zero errors |
| D6 beat anchor | **CLEARED** | order 2: 109–120ms, seed-invariant, both engines |
| D7 world dim | **CLEARED — law holds, page exonerated** | order 2: 0.00% at every printed-fence probe |
| D8 overshoot gap | **CLEARED** | order 2: 4.14% on the printed 274.0px base, both engines |

## Order 6 — the BLOCKED + DEFER drain

**3 BLOCKED (SC rows 1–3, D5):** DRAINED GREEN both engines (order 1). The 1 conditional
(SC row 9) resolves green with them.

**The DEFER-class drain — 7 pass-3 DEFER rows + the not-evaluable carousel queue item
`[P4-AGG header corrected — CRIT-COVERAGE minor 1: the table below has 8 rows; the eighth
(feed #20 carousel) is a §6.1-3 queue item, never a pass-3 DEFER row; the 2-drained +
5-stand arithmetic is unchanged]`:**

| row | state | why |
|---|---|---|
| frosted QP-6 micro-demo referent | **PAGE-DEFER STANDS** | referent still absent: no micro route under `demo/` (checked on disk this session); re-entry unchanged — FINAL wave-set demo integration |
| v-vapor (c) ghost-park cost | **PAGE-DEFER STANDS** | the fired re-band never landed on the page (ATTENTION-EXIT seat did not run); the re-entry rides the same commit |
| v-wave row 3 organ read | **PAGE-DEFER STANDS** | the sea re-skin never landed; the register facts + the composite warm-read finding from pass 3 are unchanged |
| v-wave row 1 mic session | **DEVICE-DEFER STANDS → LEAD** | the device-lane campaign decision (pass-3 §O-4) now belongs to the lead adjudication under the terminal-pass ruling — this row rides it |
| assembly row 5 k·v ladder | **DRAINED** | run this session — mechanism PASS, band FAIL → **D10** (order 2) |
| assembly row 11 hue-conservation part | **DRAINED** | PASS-B, class-level pairing (order 2 row 11) |
| assembly row 9 direction sub-read | **DEFER STANDS (60fps-class capture)** | 25fps vs granular field, unchanged; the computed half is now stamp-locked (A9) |
| feed #20 carousel τ≈130ms check | **NOT-EVALUABLE — no surface** | no carousel prototype exists on disk; the check cannot ride any current page — routes to the lead with feed #20's residuals |

**RERUN-OWED register rows** (frosted-cure + constellation registers vs the pass-3 canon
repaint): the canon repaint never landed in pass 4 — these rows REMAIN OPEN per §O-3, not
re-run (re-running against the unchanged register would mint spent evidence). They pass to
the lead adjudication by name. Cross-page (e)'s oklab arm stays armed-idle (no
library-token page entered the queue).

## The defect register — pass-4 state

| # | state | note |
|---|---|---|
| D1 | **CODE CURED `[P4-AGG]` — paint re-verify owed (lead)** | v-perch seat geometry: the R-9 apex formula `R·(1−2^(−1/n))` landed on the page (n from the AUTHORED corner shape per engine; SQUIRCLE_K deleted), battery re-gated |
| D2 | **CODE CURED `[P4-AGG]` — live re-run owed (lead)** | v-vapor still-hold false commit: wall-clock age-out landed (+ the same class cured on BOTH assembly organs — the "unique" claim corrected, CRIT-ASSEMBLY A2) |
| D3 | **OPEN** (cure unlanded; lesson proven elsewhere) | v-wave paint-dead breath |
| D4 | **OPEN** (REPRODUCED ×2 engines this pass) | constellation re-home 1.00px |
| D5 | **CLOSED** (both engines green, zero errors) | |
| D6 | **CLOSED** (109–120ms, seed-invariant, ×2) | |
| D7 | **CLOSED** (0.00% at printed fence; page exonerated; the pass-3 read was probe-inside-the-GROWN-extent + VP8 edge class) | |
| D8 | **CLOSED** (4.14% == certified, base printed, ×2) | |
| **D9 (minted, this arm)** | **CODE CURED `[P4-AGG]` — paint re-run owed (lead)** | `v-thinkfield/index.html` — the idle halftone NEVER yields during think: the child's `opacity: 0` was defeated by the PAUSED breath animation's animated opacity (computed 0.996 at +2.5s, probed live). CURED through BOTH facts the critics named (CRIT-ASSEMBLY minor 6): the yield + its 420ms transition now live on the UN-opacity-animated `.halftone-wrap`; the dead `#fieldIdle` transition is deleted; 2 battery gates lock the shape. The QP-4 yield half re-runs at the lead's paint window |
| **D10 → RE-CLASSED `[P4-AGG]`: instrument definition, NOT a page defect** | **CLOSED as minted; the note stands** | CRIT-ASSEMBLY A1 re-derived on the page's own register (crit-kv.mjs, independently re-run at the agglomeration): the ladder divided painted overshoot by the RELEASE velocity, but the chartered k≈0.023s is CROSSING-defined — at the crossing this page reads **k 0.0231–0.0233s, dead in-band**, and every painted overshoot equals the register's lawful output. Nothing damps, nothing re-seeds; row 5 re-judged PASS whole. THE STANDING NOTE: k·v ladders must measure v at the crossing (or seed at the target, as the SC Maps rungs do) — instrument law for every future arm |
| **D11 (minted at the agglomeration — CRIT-ASSEMBLY B-1)** | **CODE CURED `[P4-AGG]` — QP-1/QP-7 re-runs owed (lead)** | `v-morphdock/index.html` — orphan engage writers survive dismissal on ALL THREE arms: no dismiss cancels the engage drives; settle branches promote `engaged` ungated (the banked duel's re-engage leg was a no-op — reparents 3 = the no-op parity); the morph arm's orphan pair deadlocks at fixed dt (label locked ~−3px, `--md-t` pinned 1.0 on a dismissed dock, rAF immortal) with a latent `st.stop()`-on-null TypeError that kills the page-wide conductor. CURED: per-arm generation guards on all 11 writer callbacks (the assembly A5 pattern), intent wrappers bump, foil dismissals clear `morphing`, the mid-morph catch continues the seized flight (A3 — the 140px first-scrub teleport deleted), value-truth on re-engage + keyboard (A4 — `void targetR` deleted), PRM detent release single-steps (A6). Battery 58 → **73/73** incl. the orphan-foil deadlock as the negative control |
| **D12 (minted at the agglomeration — CRIT-ASSEMBLY A5/A6)** | **CODE CURED `[P4-AGG]` — held-press light row owed (lead)** | `v-thinkfield/index.html` — the chip was light-as-EVENT with commit-on-pointerdown (auto-release while held; `answer()` at +50ms of DOWN; a lost pointer committed; under PRM the press still ran a ~1s rAF arc). CURED: the assembly `makeHoldLight` pattern verbatim (attack on down, SUSTAIN while held, release on up/cancel on the envelope's clock; commit on UP inside, never before the ~50ms light lead; PRM instant-set, zero drives), light element-scoped on the pressed control (+ send's own press light — CRIT minor 2). Battery 66 → **78/78** |

**Observations (not defects):** O-1 morphdock duel needs ≥~1900px viewport (docks clip at
1280 — a harness note for every future arm). O-2 arm-3 interrupt seam 16.9–21.2px vs the
roster's "seam ≈0" wording (order 3 QP-1) — `[P4-AGG re-framed per CRIT-ASSEMBLY B-1]`: the
banked 16.9px carries an uncancelled second writer's double-step (sim-reproduced EXACTLY at
16.9px; the clean single-writer trajectory reads ≈14.0px) — the physics half of the spike
(~14px stiff retarget) is real and the roster wording still needs honesty, but the lead's
wording-or-clamp decision consumes the POST-cure seam number, never the banked one. O-3 SC PRM main-run probe artifact (open-probe
on an open surface; clean arm authoritative). O-4 the D7 fence trap self-demonstrated: a
rest-rect-derived fence put probes inside the session-grown dock and read a false −22/−30%
"world dim" — the battery's PRINTED extent is the only honest fence; this is now method
law for this campaign. O-5 thinkfield's static plum world-mass pins naive hue means — hue
instruments must gate sat AND subtract static pools. O-6 WebKit R2/cost rows are RED under
video recording (reproduced ×2) — cost rows ride NO-VIDEO arms, chartered in the header.

## Roll-up `[P4-AGG restated 2026-07-19 — the pass-4 critiques adjudicated; this section wins over the per-order originals where they differ]`

- **Order 1 (SC):** 9 PASS + 1 PASS-B — the kernel batch's WebKit halves + ladder CLOSED;
  the WK pin-coverage escape named + gate-cured (M-A), the bottom-edge sub-pixel protocol
  UN-RUN and named to the lead (M-B).
- **Order 2 (assembly):** 13 PASS-class · 3 pass-3-stands · 1 60fps sub-read DEFER —
  **both pass-3 FAIL bands cleared; row 5 PASS whole at the crossing anchor (D10
  re-classed to instrument law); m9 lifts by its own clause.**
- **Order 3 (morphdock):** 7 PASS-class · 2 RERUN-OWED (QP-1 evidence half, QP-7 park) —
  the duel VERDICT (arm 3) stands by construction; the interrupt evidence rides the D11
  post-cure re-run.
- **Order 4 (thinkfield):** 7 PASS-class · 1 half-FAIL — **D9 found, filed, and
  code-cured at the agglomeration (re-run owed).**
- **Order 5 (FAIL register):** D5/D6/D7/D8 CLEARED · D1/D2 CODE-CURED at the
  agglomeration (paint/live re-runs to the lead) · D3/D4 STAND (D3 build unlanded, D4
  reproduced fresh) · D9/D10 minted, then D9 code-cured + D10 re-classed · D11/D12 minted
  at the agglomeration, code-cured, re-runs owed.
- **Order 6 (drain):** 3 BLOCKED + 1 conditional drained green · 2 DEFERs drained · 5
  stand with named reasons · 1 not-evaluable (no surface) · RERUN-OWED register rows stay
  OPEN awaiting the canon repaint (lead).

## Honesty line

Every number above was measured THIS session by this seat on captures this seat drove;
logs, videos, shots, and runners are all banked under `CAP4/`. What this ledger does NOT
claim: 60fps-class interior reads (bells, cut widths, drift direction — bounded exactly as
pass 3 bounded them); the v-wave/vapor/perch/constellation cure verdicts (their cures never
landed — their FAILs are reproduced or pin-verified, never silently re-graded); the
morphdock PRM dismiss half and thinkfield press-light lead (instrument-bounded, said so in
their rows); per-island exact hue pairing (class-level only). The D7 story is told whole —
including this seat's own wrong fence and what corrected it — because the trap IS the
finding. Two engines everywhere a row demanded it; video-path WebKit for every
backdrop-filter material claim; zero `@supports` consulted. The tree gains exactly one
file (this ledger); the commit is the user's gate.
