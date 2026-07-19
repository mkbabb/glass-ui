# MARKS-D-POPOVER — V3, the pop-over animation (EXEMPLARS-2)

Seat: marks:V3-POPOVER. Verified-model: claude-fable-5 (read verbatim from this seat's system
context). Date: 2026-07-19.

Source: `/Users/mkbabb/Downloads/ScreenRecording_07-18-2026 15-12-32_1.MP4` — 10.068s, 1206x2622,
true 60fps CFR (packet intervals uniformly 16.7ms) with two pts anomalies: one dropped frame at
0.567→0.650 and jitter at 6.185–6.268. Neither falls inside a fitted window; the close60-1 tail
grazes the jitter zone and is flagged where it matters.

Scene: iOS 27 Photos, "Recently Saved" grid. Long-press context-menu popovers on a grid
thumbnail — the pressed thumbnail lifts into a preview card while the actions menu (Copy/
Duplicate/Hide + Share/Favorite/… /Ask Siri) materializes below it, the backdrop dims and blurs.
Two full open cycles, two dismissals, and one drag-the-stack momentum play.

## Burst inventory (frame N sits at t0+(N−1)/fps; all full 1206x2622; READMEs stamped on disk)

Frames at `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/scratchpad/exemplars2/V3-POPOVER/` — never in the repo.

| set | t0 | fps | frames | window |
|---|---|---|---|---|
| survey10 | 0.00 | 10 | 101 | whole video, half-scale survey |
| open60-1 | 2.20 | 60 | 78 | open #1: charge-hold → commit → settle |
| open60-2 | 7.00 | 60 | 60 | open #2 (the replay sample) |
| close60-1 | 5.75 | 60 | 42 | dismiss #1 |
| close60-2 | 9.45 | 60 | 36 | dismiss #2 |
| drag60-1 | 4.00 | 60 | 102 | the stack drag + release glide |

Method: (a) sub-pixel edge trackers — per-frame |∇| row/column profiles, backward locality
tracking seeded from the settled state (the MARKS anti-rank-flap discipline), parabolic sub-pixel
interpolation; (b) fixed-box channel traces — scrim luminance + horizontal-gradient energy (blur
proxy), menu-anchor luminance, white-pixel fraction (menu text materialize); (c) blend-regression
alpha for the closes (LSQ of each frame against open-state and rest-grid references); (d) damped-
oscillator grid fits, (ζ, f_d) grid × linear LSQ for phase, critical-damping alternative tested,
brackets at ≤1.15×RMS — the MARKS.md C2 method verbatim. Scripts: scratchpad `track.py`,
`stack.py`, `fit.py`.

## Scene index

| t (s) | event |
|---|---|
| 0.00–0.55 | video opens mid-popover (prior cycle) |
| 0.55–0.85 | dismissal #0 (contains the dropped frame — not measured) |
| ~1.9–2.15 | press-charge builds on the thumbnail |
| 2.15–2.40 | charged hold, bit-static |
| 2.4167–2.82 | OPEN #1 — the measured open |
| 4.13–5.70 | drag-the-stack: fling up, rubber-band absorb, springback, settle high |
| 5.93–6.18 | dismissal #1 (+ the one-frame glitch) |
| 7.2167–7.62 | OPEN #2 — sub-pixel replay of open #1 |
| 8.1–9.2 | drag play #2 (unburst — same family as #1) |
| 9.54–9.73 | dismissal #2 |

## 1. The press-charge (breath of life before anything moves)

MEASURED (survey-grade) + BOUNDED (60fps window starts mid-hold): from ~t=1.9 the pressed
thumbnail swells in place — change confined to the slot region, growing to a lifted card ~10%
larger than its cell with rounded corners and a soft shadow bleed (diff bbox runs ~70px past the
slot edge). The charge builds over ~250ms, then HOLDS: open60-1 frames 001–013 (2.200–2.400) are
bit-identical — a charged, swollen, waiting state, ≥200ms of stillness before the commit. The
component acknowledges the finger by swelling and then holds its breath. (The charge's own 60fps
curve predates the burst window — BOUNDED, not fitted.)

## 2. The open — channels, clocks, offsets (open #1; open #2 identical)

| channel | start | end | duration | shape |
|---|---|---|---|---|
| scrim dim+blur (luma 117→57, −51%; gradient −52%) | 2.4167 | ~2.61 | ~195ms | eased BOTH ends (first delta −2.5, peak −11, last −0.3) — a ramp, not the CC cliff |
| preview lift (thumbnail → card, bottom edge 820→1439) | 2.4167 | ~2.78 | ~360ms | spring; peak ~2700px/s |
| menu body birth (translucent, near-full width) | ~2.4833 | — | +67–83ms after commit | born at ≥0.75 scale under the preview's bottom corner |
| menu content fade (white-pixel fraction 0.023→0.038) | ~2.4967 | ~2.59 | ~85–100ms | text crisp from first visibility — opacity rides the transform, no text blur-up |
| menu geometry (right edge 619→810.3→797.3) | ~2.4833 | ~2.80 | ~320ms | THE spring, fitted below |

The offsets that make it read alive: scrim and preview move on the SAME first frame (commit);
the menu is born one beat (~70–85ms) later from under the preview's corner; its content is fully
present by the time its geometry crosses rest (~2.575); everything shares one settle at ~2.80.
Fade:geometry ≈ 100ms:320–360ms ≈ 1:3.3–1:4 — the same ~1:4 detune the CC open showed (MARKS §5),
now confirmed on a second surface class. Codex law 5's detuned-channel canon: CONFIRMED with
constants; law 18's "grow from an anchored seed, concurrent sharpen+opacity, nothing slides in
from an edge": CONFIRMED (the menu materializes in place; only its unfurl travels).

## 3. The spring, fitted (the mark's core ask)

Three independent bodies tracked at 60fps, each fitted with the damped-oscillator grid + critical
alternative (settled values from ≥40-frame dead tails; RMS ~0.2px):

| trace | window | ζ | bracket | f_d | bracket | f_n | RMS | crit rejected |
|---|---|---|---|---|---|---|---|---|
| menu right edge, open #1 | 2.533–2.95 | 0.80 | 0.77–0.82 | 1.95Hz | 1.85–2.10 | 3.25Hz | 0.24px | ×4.0 |
| menu divider row, open #1 | 2.517–2.95 | 0.85 | 0.83–0.87 | 1.70Hz | 1.60–1.80 | 3.23Hz | 0.20px | ×3.2 |
| preview bottom edge, open #1 | 2.583–2.95 | 0.81 | 0.73–0.88 | 1.95Hz | 1.65–2.20 | 3.33Hz | 0.13px | ×1.5 |
| menu right edge, open #2 | 7.333–7.75 | 0.80 | 0.77–0.82 | 1.95Hz | 1.85–2.05 | 3.25Hz | 0.25px | ×4.0 |
| menu divider row, open #2 | 7.317–7.75 | 0.84 | 0.82–0.85 | 1.75Hz | 1.70–1.85 | 3.23Hz | 0.21px | ×3.1 |

**The popover register, MEASURED: ζ = 0.82 (union bracket 0.77–0.88), f_d = 1.7–1.95Hz,
f_n = 3.12–3.33Hz (response = 1/f_n ≈ 0.30–0.32s), settle |x|<3px ≈ 180ms from rest-crossing
(menuR crosses 797.3 at ≈2.570, inside 3px by 2.750).** Overshoot: menuR +12.9px, divider
+11.1px, preview bottom +4.3px — all peaking on the SAME frame (2.6167), one body in phase.

Overshoot is velocity-bought, not intrinsic: menuR crosses rest at ~525px/s → gain 0.0246
px/(px/s); divider crosses at ~452px/s → 0.0246. MARKS.md C2 measured 0.02 on the dock landing;
codex law 14(b) carries 0.023 as the rubber-band penetration gain. **One arrival-gain constant,
g ≈ 0.023–0.025s, now attested across three iOS mechanisms.** No second excursion ≥1px anywhere
(largest counter-swing: 0.25px, sub-noise). Law 14(c) ("single overshoot, no second bounce,
ζ≈0.75–0.85"): CONFIRMED with tighter constants.

This register IS the dock register: MARKS.md C2's flung-collapse landing fitted ζ 0.77–0.88,
f_d 1.4–2.0Hz, settle ~180ms — the brackets coincide. iOS 27 runs ONE terminal-arrival register
across the dock morph and the context-menu open. That's a cross-corpus law, not a coincidence.

## 4. Determinism — the open is fire-and-forget choreography

MEASURED: open #2 replays open #1 to sub-pixel at exactly +4.800s — menuR 758.44/780.58/795.58/
804.39/808.68/810.24→797.30 vs 758.31/780.67/795.56/804.32/808.60/810.27→797.33; scrim and
whiteF match to the third decimal. Unlike the Maps dock (gesture-scrubbed), the long-press
popover has NO tracked phase: charge → commit → one canned spring flight. Law 15's regime split
gains a third case: surfaces with no scrub affordance run the release regime from birth. Also a
performance attestation: two flights, zero dropped frames, identical curves — 60fps honest.

## 5. The effervescence, characterized

The "effervescent effect" is not a specular sweep. Mechanism, from the birth frames
(crop-birth-019..026) + the anchor-luminance trace:

- The menu is born TRANSLUCENT (~60–70% alpha) over live backdrop blur — the colorful grid
  beneath shines through brighter than it ever will again; the anchor box reads +6.8% above its
  settled luminance at birth (82.8 vs 77.5) and cools to rest in ~60–80ms as the glass
  opacifies. BOUNDED (geometry-confounded — the sweep passes through the box), visually
  corroborated: the sparkle is content light through thin glass, damping as the material
  thickens.
- Text and icons are crisp from the first visible frame — no blur-up; opacity leads, geometry
  carries. The panel's own pixels never smear.
- The +5% white-pixel bump at the geometry peak (0.0394 at 2.6167 → 0.0375 settled) is the
  overshoot exposing more panel, not a flash — geometry explains it.

So: effervescence = thin-glass birth + backdrop shine-through + fast opacify, riding a spring
that overshoots once. Champagne from beneath, not glitter on top.

## 6. What makes it SMOOTH, not sharp (the user's law, quantified)

- No velocity discontinuity anywhere in the flight: menuR velocity 1341→893→525→257→100→−28→−88
  →−117→−106→−59→0 px/s — deceleration continuous THROUGH the extremum with a gentle
  counter-swing, the C∞ signature of an analytic spring. A canned ease-out would arrest at zero;
  this never arrests, it exhales.
- Every channel starts eased: scrim first-frame delta is −2.5 of a −60 travel (4%); whiteF rises
  0.0232→0.0259→0.0315 — no channel steps. The one abruptness iOS allows elsewhere (the CC blur
  cliff, ≤83ms) is absent here; the popover scrim takes ~195ms with both ends soft.
- Channels never finish together: fade (~100ms) < scrim (~195ms) < geometry (~320–360ms), all
  ending inside one gesture-breath. The last 180ms is a ≤13px settle — motion below the
  attention threshold, felt as weight rather than seen as travel.
- The overshoot is small (1.5–2% of travel) and singular. Springy, never rubbery.

## 7. The close — a coordinated exhale

MEASURED (blend-regression alpha, 1=open, 0=rest-grid):

- close #2 (clean): presence 1.000→0.912→0.763→0.569→0.426→0.304→0.205→0.126→0.081→0.047 —
  smooth exponential, τ≈50ms, <5% inside ~150ms. Whole stack (preview+menu) dissolves as ONE
  body — opacity-dominant with a mild shrink toward the source slot, no bounce. Scrim relaxes
  57→116 over ~180ms starting one frame later, finishing after the content is gone.
- close #1: same shape, τ≈90ms, presence gone in ~215ms, scrim relax ~230ms (tail grazes the pts
  jitter — durations ±20ms there).
- Unlike CC's close there is no long contentless-blur beat: content and medium overlap, content
  finishing at ~65–70% through the scrim ramp. The popover close is one exhale, ~200ms total.
  Law 8's asymmetric exit (fade-led, faster, never mirrors the entry): CONFIRMED. Law 15's
  fire-and-forget close: CONFIRMED.
- ANOMALY, flagged: close #1 contains a single full-rest frame at t=5.9333 (the entire screen at
  rest values for one frame, then the dissolve proceeds) — absent in close #2. Recording/
  compositor artifact suspected; an iOS defect not excluded. Single-sampled — INCONCLUSIVE as to
  cause, excluded from all fits.

## 8. The drag — movement of momentum (BOUNDED: no touch overlay)

Menu top edge tracked through drag60-1 (t 4.0–5.7): drag onset 4.13, peak ~2240px/s upward at
4.23–4.25, then a smooth 600ms deceleration whose rate INCREASES with penetration (τ ≈ 210ms →
117ms — resistance growing as the rubber-band engages), extremum at 1042 (67px past the eventual
rest 1109), velocity reversal, springback to 1118 (+9px past rest, 13% of the return travel),
then a slow ~350ms ease to 1109.

Springback fit (4.867–5.60, RMS 0.70px, critical rejected ×5.3): **ζ = 0.56 [0.54–0.58],
f_d = 1.30Hz [1.25–1.35], f_n = 1.57Hz.** Per the C1 lesson this whole window is
finger-contaminable — a smooth deceleration can be a hand — so the verdict is BOUNDED: the
kinematics are consistent with a fling released near peak velocity (~4.25–4.30) gliding into an
asymmetric rubber-band absorb and a soft sprung return, and the return register, IF free, is
distinctly SOFTER and bouncier than the open register (ζ≈0.56/1.6Hz vs ζ≈0.82/3.2Hz). Two
registers on one component: brisk-weighty for arrival, loose-elastic for boundary recovery.
Law 14(b)'s asymmetric rubber band (compression faster than release): consistent, not re-fitted.

## 9. Facility routing — what OUR language does with it

The standing law governs: warm cream, deft rounding, our palettes, our glass — no clone.

**springPresets.ts (on disk, verified 2026-07-19):** the fitted register lands EXACTLY on
`springPreset("dock")` — (response 0.30, ζ 0.82) ⇒ f_n 3.33Hz, f_d 1.90Hz, both inside every
fitted bracket (ζ 0.77–0.88, f_d 1.7–2.0, f_n 3.12–3.33). Nearest-preset table:

| preset | (response, ζ) | f_n / f_d | verdict vs measured |
|---|---|---|---|
| **dock** | (0.30, 0.82) | 3.33 / 1.90Hz | INSIDE the bracket — the popover register verbatim |
| snappy | (0.48, 0.74) | 2.08 / 1.40Hz | too slow by ~60% — the current enter-overlay clock |
| press | (0.20, 0.80) | 5.00 / 3.00Hz | too fast — stays the tap register |
| bouncy | (0.60, 0.60) | 1.67 / 1.33Hz | matches the BOUNDED drag-springback (ζ0.56/1.30Hz) |
| transient | (0.62, 0.90) | 1.61 / 0.70Hz | Toast's patient bloom — wrong register here |

The perfecting delta: response 0.30→0.31, ζ 0.82→0.83 would sit at the bracket center — both
sub-perceptual and INSIDE the measurement bracket. **No retune. The popover adopts
springPreset("dock") as-is; iOS itself runs one arrival register across dock and popover, which
retroactively ratifies DOCK_SPRING as the house arrival register, not a dock-local constant.**

Concrete routings:

1. **Enter geometry → the dock register.** `animations.css`'s `.glass-top-layer` enter and the
   reka `.glass-reveal` recipe currently ride the `enter-overlay` bundle on the snappy clock
   (f_n 2.08Hz) with opacity, scale, AND filter sharing ONE duration. The measurement says:
   geometry on dock's spring; opacity on its own ~100ms ease-out clock (≈⅓ of the response,
   done by rest-crossing); the blur-decongest with the fade clock, not the geometry clock. The
   1:4 fade:geometry detune is the constant to encode — one shared clock is exactly the "equal
   timings kill the effect" defect law 5 names.
2. **Scrim → its own ~200ms two-end-eased ramp** (dim+blur together, −50% luminance in our own
   scrim tokens' terms), starting on the commit frame — never the CC cliff for popover-class
   surfaces.
3. **Enter scale-from stays modest** (~0.94–0.96, our current token is right); the iOS menu is
   born ≥0.75 scale and translucent — the win is transform-origin at the ANCHOR (trigger corner)
   plus the thin-glass birth: opacity starting ~0.6 and opacifying in ~100ms gives the
   effervescent shine-through with zero extra machinery. Our warm-cream glass makes this reading
   RICHER than iOS's grey — cream tints from beneath bloom warmer at birth and settle into the
   frost; the effervescence becomes a candlelit moment instead of Apple's neutral shimmer.
   Compositor-only: scale/translate/opacity, no masking fallback, Chrome+Safari honest.
4. **Exit → keep `glass-reveal-out`'s grammar** (fade-led, mild shrink, no overshoot) and pin
   its clock ~180ms; the whole stack dies as one body toward the trigger. No empty-scrim beat
   for popovers — scrim relax overlaps, finishing last.
5. **Press-charge → the breath-of-life edict's cheapest win:** long-press-armed triggers swell
   ~8–10% on springPreset("press") and HOLD the charged state until commit or release — the
   held stillness is the display of engagement. Our deft rounding: the charge also deepens the
   corner radius toward the card grammar it is about to become (law 4 in our own accent).
6. **Boundary recovery → springPreset("bouncy") territory** for drag-past-bounds returns on
   popover/sheet stacks (the suffusion overpull scalars) — the two-register split (dock-arrive,
   bouncy-recover) is the honest reading of the corpus and is already expressible with the
   on-disk table. BOUNDED provenance noted at the SUFFUSION row.
7. **Velocity-bought overshoot only:** g ≈ 0.023s of crossing velocity, zero synthetic bounce on
   slow arrivals — the [0,10%] preset fence stands with room (measured 1.5–2% of travel); this
   is the same law C2 shipped, now two-surface attested.

## Honesty ledger

- MEASURED: the open register fits (5 traces, 2 samples), channel clocks/offsets, overshoot
  gains, determinism, close alpha curves, drag kinematics as trajectories.
- BOUNDED: the press-charge curve (predates the 60fps window), the birth bloom (+6.8%,
  geometry-confounded), menu birth scale (≤0.76 at first coherent track — alpha-masked below),
  the drag springback register (no touch overlay — finger contamination not excludable).
- INCONCLUSIVE: the close #1 single-frame rest-state glitch (artifact vs iOS defect,
  single-sampled); the menu's sub-alpha-threshold geometry before t0+67ms.

## Mark verdict

V3-POPOVER → the long-press popover opens as a three-clock choreography (fade ~100ms < scrim
~195ms < geometry ~330ms, the 1:4 detune) on ONE arrival spring — ζ 0.82, f_n 3.2Hz, single
velocity-bought overshoot (g≈0.024s), settle 180ms — which is `springPreset("dock")` verbatim;
effervescence is thin-glass birth with backdrop shine-through cooling in ~80ms; the close is a
~200ms one-body fade-led exhale; smoothness = no channel steps, no velocity arrests, nothing
finishing in unison. Routing: popover/menu enters adopt the dock register with split channel
clocks; press-charge hold on "press"; boundary recovery on "bouncy"; our warm cream makes the
birth bloom a candlelit moment — measured, not cloned.
