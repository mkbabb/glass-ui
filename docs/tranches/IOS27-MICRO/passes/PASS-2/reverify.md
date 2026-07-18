# PASS-2 RE-VERIFY — the queued paint checks, executed (IOS27-MICRO)

verified-model: claude-fable-5 (system-context model ID, returned verbatim). Seat: re-verify —
the single browser-owning seat this phase (browser-seat singleton honored; no MCP browser
touched, scripted Playwright only). Date: 2026-07-18.

Engines of record: **Chrome 150.0.7871.128** (repo-local Playwright 1.61.1, `channel:"chrome"`,
headed, display 120Hz — frame 8.3ms; the ±1-frame bound on this display is 8.3ms) and
**WebKit 26.5** (webkit-2311 — the safari-arm's engine of record, headed, 60Hz — 17ms). All
pages via `file://`, DPR 2. WebKit material verdicts ride the 25fps video path; µs meters are
unreadable there (1ms clock) — frame gaps are the cost readout (safari-arm §0 laws honored).
Sim references re-confirmed at run time: f1 `check.mjs` 38/38, f3 19/19, f4 13/13, f5
`lint-layer-contract.mjs --self-test` both `[OK]`.

Every row of `reverify-queue.md` was executed — none skipped, none BLOCKED. The named
TOOL-DEFER halves (F1 R1/R5 WebKit attribution, F5 U2 WebKit re-raster) remain TOOL-DEFER by
the queue's own text and are not counted as skips. Per-check rows live in each prototype's
PROBE-NOTES under "PASS-2 RE-VERIFY"; exhibits are stamped `f?-p2-*` (Chrome) / `f?-p2-wk-*`
(WebKit) beside each prototype; raw series/JSON/videos in the session scratchpad (`rev/`).

## Family verdicts

### F3 CHANNEL-CONDUCTOR — PASS (4/4 rows)
12/12 battery in PAINT-SIDE mode on BOTH engines (summary self-labels "PAINT-SIDE"); 12/12
internal; per-timing-row |paint−internal| ≤1ms Chrome / ≤11ms WebKit — the var→CSS binding
layer certified in paint (G9 closed). Stress ×3 with the +960 injected consumers: style-recalc
**0.312ms/frame avg** (bound ≤6 — 19× margin), max single 1.40ms, 0 frames >24ms, 120fps
held. Sub-sat Chrome exhibit: held g 0.081, scrim = scrubbed-g/sat exactly (0.671, Δ0.000);
thinned-veil PNG pair banked. Tempo-rebuild G13: Δg carries 0.84× across a mid-flight ×4
toggle on both engines, state stays "running", proceeds to 1.000 (+0.5% velocity-bought
overshoot) — the pre-cure arrest is dead.

### F1 SCALAR-SPINE — PASS (7/7 rows; the re-fit physics is live)
CC battery 12/12 live cells PASS both engines — medium 95% at 91–96ms and medium-gone at
622–630ms: the promised ~20/~60ms drift vs the pass-1 112/686 class is measured; the
stale-physics tripwire did not fire. Maps battery all-PASS both engines — overpull zero-seed
overshoot **1.3%/0.8%** (the 32–33% class DEAD), catch landed 581/597 vs sim 571 (±40 gate
held). PRM G7 regression: one-poll seats, engine rAF parked throughout, CC t/m/f jointly —
cured. Intent law live: 0 flips under the ±13.6px @6Hz dither from both latch states; exactly
1 flip on the slow cross at value 0.581/0.577; early commit at 0.353/0.294 < 0.5 on the fast
flick; releases glide to the LATCH's target. R1 Chrome attribution 0.289ms/frame (≤2). R5
Chrome residency GREEN — 0 card-region Paints across all six growth windows, 0 in-flight
frames >24ms → **SPEC-F1 §2-H1 stands; no revert**. Capture set re-stamped `f1-p2-*` with
paired-π samples (desync t 0.500/m 1.000/f 0.000/intent 0; beat frame inside the beat on both
engines). Queue-precondition correction: `maps`/`cc` are IIFE-scoped, NOT top-level bindings —
measured through the badge + fade-direction observables instead (both concur).

### F4 ENERGY-FIELD — PARTIAL (6 of 8 rows VERIFIED; 2 real findings)
G2 scroll cure CLOSED in paint both engines (peak E 0.88–0.96, debounce-primary edge, never
scrollend mid-gesture, writes 66–150/frame, counter-lag + depth grading + edge fade in
computed style + PNGs). G8 periphery CLOSED: echo lag best-fit 104ms with the rail matching
the law at the captured pair (0.774 vs expected 0.774); floor within 108/117ms of final zero;
the horizontal-fling strand dead. θ_g floor holds under the finger (pointer-phase peak
0.27290, glow 0 every pointer frame); flick/fling U7 pair passes numerically and reads blind.
N4 strain exact (0.399 = 0.5×0.798) and dead ≤520ms after release. Keyboard law and PRM pin
clean (one NOTE: the rAF parks ~160ms after the pin — pinZero's cleared delay line is
re-armed by `_quiet`'s τ+60 drain of zeros; cosmetic). The two findings:
1. **U-CONT-LIVE (G3) is velocity- and frame-rate-dependent.** Scripted fling: Chrome 0.0102
   PASS but WebKit 0.0346 FAIL on the SAME gesture (60Hz doubles the one-frame deceleration
   bite); fast manual releases pass (0.0018/0.0030 at seed ≥1280px/s) while moderate manual
   releases (vy 130–580px/s) breach 2–5× (0.045–0.172) on both engines. jump ≈ E′(v)·a·dt/0.35
   — the ≤0.032 C¹ bound holds only in the tanh-flat region. The gate is live and honest (red
   cell prints; values distinct); the LAW needs a deceleration budget or a first-frame damping
   treatment.
2. **The slow-place springback re-lights the field through the gauge.** The zero-seed release
   spring (gauge = vy/(0.35·vy) = 2.857 for any vy≠0) lifts E to 0.378/0.383 after a slow
   place → glow flashes 0.111/0.119 for a few frames; the page's own pDock cell prints 0.378
   while the gesture cell prints 0.273. "A slow place shows no fireworks" is violated
   post-release, cross-engine.
Also PARTIAL on row 1's Chrome cost clause: fan-out EMA 55.6µs median mid-burst (sampler-free
polls 12.7–78.5µs) vs the ≤50µs bound — every other row-1 clause green (120fps, 0>24ms).

### F5 OPTICAL-MEDIUM — PASS (7/7 rows; the SVG goo arm retires)
Chrome transient captures banked at ×20/ferry-off with in-frame state self-labels (charge
0.974, mid-travel barbell 47px gap over demat capsule 0.096, arrival scale 1.150 + bloom 0.9).
Sibling legibility: every sibling 15.1–15.5:1 at charge peak (under-lens 5.86; arrival-lens
2.36 — not siblings) — ≥4.5 with huge margin; the Chrome read sits outside the queue's
~4.2–5.5 analytic band → **the 4.7:1 model needs re-calibration** (safe direction; the WebKit
4.53–5.03 was the hot video burst). The goo duel: fence one-body CLEAN on WebKit; Chrome
clean at 1-slot, 6 thin-neck-at-wash frames at 4-slot max stretch (never a dark gap) — a
falloff-stop re-tune rider; the FILTER arm separates on BOTH engines and its Chrome worst
frame is 133.4ms vs fence 9.1ms; WebKit fence 18.0ms without video load (the pass-1 26ms class
was recording overhead) → **fence wins every axis; SVG arm RETIRES from SPEC-F5 §2-H3**.
N8/U8: opacity-0 parking CERTIFIED both engines (twin-on within 10%, worst ≤24ms) — U8
closed, no display:none mandate. PRM one-flip: exactly one capsule step within 1 frame of the
click, bloom {0, 0.35} with the 220ms clear as one discrete step, hold-wash {0,1} — G5 closed.
All four G6 harness regressions hold on both engines (cliff cell keeps 143/100ms through the
double-open; the stale-hold class dead at 1331/1325ms). U2 pair: identical backdrop-filter at
open and mid-relax (opacity-only decay), trace shows 0 medium-region paints; WebKit re-raster
stays TOOL-DEFER. `f5LintLayerContract()` pass:true on both engines + node self-test both [OK].

## Cross-cutting findings, ranked

1. **F4 G3 (live handoff jump) fails outside the tanh-flat region** — frame-rate- and
   velocity-dependent; WebKit 60Hz fails even the scripted fling by 0.003. Spec-F4 needs the
   deceleration budget stated or the seed treated at the first frame. (Both cure classes are
   small; the gate itself proved honest.)
2. **F4 θ_g springback breach via the constant 2.857 gauge on near-zero seeds** — the slow
   place flashes the glow after release on both engines; the gauge law needs a zero-seed
   clause (e.g. gauge=1 when the release velocity is sub-threshold).
3. **The SVG goo arm is retired by measurement** — separation frames on both engines + 14×
   worse Chrome cadence; the fence's gradient recipe takes a 4-slot falloff-stop re-tune
   rider (Chrome neck ≤ wash for ~240ms at max stretch).
4. **F4 Chrome fan-out misses its 50µs bound** (55.6µs median EMA at 66–150 writes/frame,
   120Hz) — a bound-vs-reality decision for the spec seat: the budget is exceeded ~11% while
   fps and long-frame budgets hold with margin.
5. **The F5 analytic contrast model under-predicts Chrome legibility ~3×** — recalibrate the
   model against per-engine paint (its floor gate held everywhere).
6. Everything else queued VERIFIED clean: F3 4/4, F1 7/7 including the R5 no-revert decision,
   F4 G2/G8/N4/keyboard/PRM, F5 G5/G6/U8/G8c.

## Harness laws discovered (recorded for future seats)

- **A clipped `page.screenshot()` during a held pointer STEALS pointer capture**
  (`lostpointercapture` fires; the real `pointerup` never reaches the captured handler) — the
  context-steal law's screenshot sibling. Screenshot first, then drive the release through the
  handler path synthetically, and say so.
- **The f1 `#fps` cell lags wake/park by up to 10 frames** — park-waits need hysteresis
  (settle + N consecutive reads), or gate-cell polling; the first battery read of this seat
  false-emptied on it.
- **Playwright input coordinates clamp near the real window bottom (~y812 here)** — deep
  drags below the fold need synthetic moves atop a real captured pointerdown.
- The queue's "top-level bindings `maps`, `cc`" precondition is false (IIFE-scoped); `F1`
  alone is global. The badge + follower-direction observables are sufficient substitutes.

Outcome summary: **F3 PASS · F1 PASS · F5 PASS (SVG arm retired; model recalibration flag) ·
F4 PARTIAL (G2/G8 closed; G3 jump law + θ_g springback + 50µs cost are real, precisely
quantified defects for the pass-3/spec seats).**
