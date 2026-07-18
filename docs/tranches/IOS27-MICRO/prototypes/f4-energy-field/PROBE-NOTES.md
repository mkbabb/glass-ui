# PROBE-NOTES — F4 ENERGY-FIELD prototype (IOS27-MICRO pass 1)

verified-model: claude-fable-5 (system-context model ID, verbatim). Prototype seat, 2026-07-18.
Artifact: `index.html` — self-contained, no build, no network. Open directly in Safari 26 and
Chrome. Status: RUNS (node-verified logic; paint unverified from this browserless seat — the
serialized browser seat owns that).

## What the prototype claims to prove

The spec §5 riskiest claim, both halves:

1. **Per-frame per-element energy writes stay cheap at realistic fan-out.** ~49 consumers
   across four scopes (30-row scroll list, a backdrop-filter glass dock and card with
   energy-modulated transforms — the U6 cost surface — a slider, a tab bar, a periphery rail),
   each written per frame with the registered non-inheriting triple
   `--energy`/`--energy-x`/`--energy-y`, dirty-checked. On-page meters: fan-out cost in
   µs/frame (JS side of the write), writes/frame, fps over the live window, long-frame count.
2. **The role verbs read as life, not as a filter.** The closed five off one scalar:
   container smears anisotropically (volume-preserving, bottom-anchored), control glows before
   it deforms (knob ring opacity from e≈0, geometry only past 0.5), content counter-lags and
   deforms WITH the glass (one-body — dock children share `--carrier-s` by explicit coupling),
   lens blooms (light, arrival heat from the seeded spring), periphery echoes ~100ms late via a
   typed-property transition on `--energy` — no JS delay.

Plus the full channel/fold/write-discipline architecture live: kind-exclusive channels
(pointer/scroll/spring), regime gating (a live gesture mutes and kills the spring — scrub
catch resumes from current displacement), MAX residual fold, unclamped publication with the
0.7 cap relocated into the control role row, event-window rAF with a genuinely parked idle
state, seeded-successor snap vs 150ms typed-transition bleed, PRM pinning the field to 0 with
the engagement envelope surviving as non-motion state.

## Encoded MARKS acceptance numbers (on-page readouts)

- **U-LAW**: 280/1150/1200/1570/2600 px/s → 0.273/0.818/0.834/0.917/0.989 vs the probe-D
  expecteds, with the clamped column showing 1150…2600 all flattening to 0.70 (what the shipped
  clamp erases). PASS at |Δ|<0.01.
- **U-FOLD**: twin 900 px/s channels — MAX 1.00x vs PROB_OR 1.28x / RAW_SAT 1.32x /
  SUM_CLMP 1.40x. Matches the research probe §3 exactly.
- **U-CONT**: scenario-A replay at 120Hz — E(release) 0.782 pointer-side / 0.811 spring-side,
  handoff jump 0.0288 ≤ 0.032. PASS bound is the spec's release-frame number.
- **U-SPRING**: {0.68, 0.64} — fast (x₀130, v₀1150): rebound 17px (13%), settle ~658ms; slow
  place (v₀0): 2.2px. PASS = fast>10px, slow<4px.
- **Live gestures** (scripted, deterministic, node-simulated at 60 and 120fps): slow place
  peak E 0.273 · carry 0px; flick 1150 → 0.816 · carry ~9–11px; fling 2600 → 0.989 · carry
  ~27–32px — the fling's carry matches MARKS §6's measured 27px into the magnetic ceiling.
- **Press-charge before travel** (MARKS §3): tab pointerdown fires the charge (lens bloom +
  whole-bar wash) at +0ms; travel starts on pointerup; the readout prints the measured lead.
- **Specular never idle** (MARKS §4): streak opacity = clamp((E−0.6)/0.4) + charge — zero on
  a static page, mechanical, not a review rule.
- **Slider regression**: consumed value (role cap 0.7) vs the shipped law, max |Δ| printed —
  0.0000 expected (byte-identical relocation of the cap).
- **No-idle**: rAF state PARKED when quiet, a stray-tick violation counter, writes/frame 0 at
  rest.

## How to judge it visually (the paint seat's checklist)

1. Idle page: nothing moves, no rAF (Performance panel: zero scripting activity), specular
   invisible, glow invisible.
2. Drag the dock down: it translates AND compresses (−21% height feel, bottom-anchored),
   text/icons compress with it (one body). Release: springback with a small rebound and a soft
   tail. Grab it mid-springback: it catches at the current displacement, no jump.
3. Slow-place vs flick on the dock (buttons or by hand): the slow drag shows NO glow
   (0.273 sits at the 0.25 floor) and no carry; the flick glows, smears visibly more, carries
   deeper, and lands with specular. Same element, same CSS — only the scalar differs.
4. Tab press: bloom + bar-wide wash BEFORE the lens moves; arrival lands hot and cools with
   the spring settle; sibling labels stay legible above the bloom (z-order, deliberate).
5. Scroll flick: rows counter-lag with visible depth grading (deeper visible rows move ~20%
   more), the card smears vertically, everything settles when scrolling stops; the close-edge
   readout says which of scrollend/debounce fired (U8).
6. Periphery rail: the dots echo the dock's energy ~100ms late — visibly behind, not synced.
7. PRM sim ON: zero motion everywhere, value still tracks on the slider, press states still
   appear (as static highlights), rAF never opens.
8. Traces (the U6 obligation): Safari + Chrome trace during the fling + scroll burst — style
   recalc per frame should be micro-scale (non-inheriting registration); watch backdrop-filter
   re-sample cost under the dock's energy-modulated transform.

## Known dishonesties, bounded

- **The µs/frame meter times only the JS `setProperty` fan-out** — it cannot see the browser's
  style-recalc or the backdrop re-sample. Those are exactly U6 and belong to the trace capture;
  the on-page number is the cheap side of the claim, stated as such.
- **Position is a carrier stand-in.** Dock translate/rubber-band/compression (`--carrier-y`,
  `--carrier-s`) and the lens travel transition are NOT the family's claim — they exist so the
  modulation has a body to ride. Marked in-source. The spring stand-in {0.68, 0.64} uses the
  fold-probe constants for energy continuity; the in-tree `springPreset("dock")` is now
  {0.3, 0.82} and MARKS asks a 30–50% springback overshoot — carrier-plane tuning, pass 2.
- **Scripted gestures synthesize channel samples**, not real PointerEvents — deterministic by
  design (readouts must hit the MARKS numbers); every gesture also works by hand through real
  events (coalesced where available).
- **The EMA is dt-normalized** (`0.65^(dt/16.67ms)`), so the law is frame-rate-independent —
  byte-identical with the shipped per-frame EMA at exactly 60fps, slightly smoother at 120Hz.
  Node sim confirms peaks stable across 60/120 (0.273/0.816/0.989 both).
- **The one-body coupling writes carrier vars per pointermove event**, outside the timed
  publish loop — stand-in plumbing, excluded from the fan-out meter on purpose.
- **`abs()`/`max()` in transform calc** — Safari 15.4+/Chrome 120+; inside the 2026 floor but
  the paint seat should confirm the smear actually computes in Safari (an invalid calc would
  silently kill the whole transform — no-masking-fallback rule: if it dies, it dies loud in
  the smear's absence).
- **Readout DOM updates** (every 8th frame + on park) add work inside the live window; they
  pollute fps slightly, never the fan-out meter.
- **PRM sim collapses inline transition durations to 0.001ms** and the media-query path covers
  the stylesheet ones — blunt prototype-grade PRM, not the library's rung system.

## Files

- `index.html` — the prototype (inline everything; ~980 lines).
- Logic checks (session scratchpad, node-run this seat): `f4-core-check.mjs` — law/fold/
  continuity/spring numbers; `f4-gesture-sim.mjs` — scripted-gesture peaks + carry/rebound at
  60/120fps. Results reproduced in the readout expecteds above.

## VERIFIED — browser seat, pass 1

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
2026-07-18. Engine: Chrome 150 via chrome-devtools MCP, file:// direct, ~98Hz display. Safari not
driven this pass (MCP owns Chrome only) — the `abs()`/`max()` smear-computes-in-Safari check and
the U6 trace remain open there.

**Verdict: PARTIAL** — both §5 riskiest-claim halves PROVE in paint; one encoded acceptance row
(the scroll burst) cannot pass as shipped, root-caused below to a Chrome scrollend behavior.

Measured, in paint:

| readout | measured | expected | call |
|---|---|---|---|
| U-LAW E at 280/1150/1200/1570/2600 | 0.273/0.818/0.834/0.917/0.989 | 0.27/0.82/0.83/0.92/0.99 | PASS |
| U-FOLD | MAX 0.7163, 1.00x chosen; OR 1.28x / SAT 1.32x / SUM 1.40x | probe §3 | PASS |
| U-CONT handoff jump | 0.0288 | ≤0.032 | PASS |
| slow place 280 | peak E 0.273, no glow, no carry | 0.273 floor | PASS |
| flick 1150 | peak E 0.808 | ~0.816 (±rAF quantization) | PASS |
| fling 2600 | peak E 0.989 · carry +30.7px · rebound 4.2px (from 36px) · settle 806ms · teardown snap | 0.989 · carry 27–32px | PASS (settle 806 vs sim ~658 — quantization + stand-in carrier, note) |
| press→travel | charge fired 282ms before travel (= press hold; charge at +0ms) | charge leads | PASS; tabs peak 0.830 |
| slider regression | max Δ 0.0000 (byte-identical) · peak 0.620 under cap 0.7 | 0.0000 | PASS |
| periphery echo | dock 0.529 vs rail 0.144 at t=56ms; rail still 0.370 at t=725ms after dock fell to 0.175 | ~100ms lag, visibly behind | PASS |
| write discipline | idle: rAF PARKED, 0 violations, 0 writes/frame. Live: 22 writes/frame, fan-out 2–7µs/frame, 98fps, longFrames 2 (probe-window artifacts) | µs-scale | PASS |
| PRM sim | fling → identity transform throughout, rAF PARKED, E pinned 0.000, "SIM ACTIVE — field pinned 0" | zero motion, zero rAF | PASS |

**The defect (CONFIRMED, root-caused): the scroll channel is dead under stepped programmatic
scrolling in Chrome.** Chrome emits `scrollend` after EVERY discrete `scrollTop` assignment
(measured 10 scrolls → 10 scrollends); each scrollend closes the channel and each next event
re-opens it with `v=0` and `_pos=pos`, so raw velocity computes 0 forever — list E stayed 0.000
through the page's own "scroll burst" (whose driver steps `scrollTop` per frame — self-defeating)
and through any stepped scroll. The U8 close-edge readout misreports "scrollend" mid-gesture. The
channel architecture itself is sound: a CONTINUOUS scroll (`scrollBy({behavior:'smooth'})`, one
scrollend at completion) drove v→3533px/s, E→0.998 with correct EMA decay, single clean close,
peak 1.000 recorded, teardown snap. Real trackpad/touch scrolls are continuous, so the user-facing
path likely works — but the acceptance row can't pass and stepped drivers (incl. any library
scroll animation) hit this. U8's race is hereby answered: **scrollend is not a safe close edge in
Chrome; close on the 160ms debounce (or ignore scrollend while scroll events arrived within the
last frame or two).** With that one change this family re-grades PROVES.

Screenshots (this directory):
- `f4-idle.png` — idle honesty: all scopes 0.000, rAF PARKED, specular and glow absent.
- `f4-dock-live-energy.png` — sustained gesture mid-flight: dock E 0.438 (oscillating to the 0.73
  cap, peak row 0.732), search pill visibly smeared with a warm specular streak, content riding
  the deformation, rAF LIVE at 22 writes/frame · 5µs/frame · 98fps. Same element, same CSS as
  idle — only the scalar differs.

Secondary notes: (a) dock-scope peak pins at 0.732 — the container row cap engages under the
sinusoid, worth confirming intended for container (vs control's 0.7); (b) fling settle measured
806ms vs the node sim's ~658ms — quantization plus the carrier stand-in, per the stand-in
disclaimer; (c) two long frames >20ms logged during instrumented probing (readout DOM churn +
screenshot capture), none during clean scripted runs.
