# PROBE-NOTES — V-WAVE, the waveform register

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-2
(PROTO-ATTENTION-EXIT), 2026-07-18. Status: RUNS; `node check.mjs` 43/43 PASS at write time.
Files: `index.html` (self-contained), `check.mjs` (extracts the physics block; cross-checks
the law-13/law-11 CSS stamps against the physics tokens).

## What the prototype claims to prove

Roster card 5 whole: ONE listening organ, any honest signal. The FAC three-sources-one-shape
contract (SUFFUSION §3.1 #2) is executable: mic RMS, pointer velocity, and value-churn spring
velocity all pass through adapters that publish the identical `{ level }` shape — node-proven
that the organ cannot distinguish sources and that identical levels produce identical bar
targets. HONESTY (the I-row law) is structural: zero `Math.random` in the file; all bar
structure is a deterministic raised-cosine kernel (symmetric, center-peaked, monotone
falloff) scaled by the REAL level — no fake spectra, ever; mic denial is silence with a
spoken status, never decoration. The rack is 20 fixed bars (≤24) moved by `scaleY` transform
only; per-bar critically-damped springs with center-out stiffness grading give the detuned
read (edge lags center 87ms — codex law 5's lead-order class, never one shared clock). Meter
ballistics: attack t90 96ms (the "I hear you" relay), release t10 488ms. Park discipline
(R3b): session end → level drains → every spring settles → the rAF dies (sim 1.5s); idle is
the law-11 CSS-only breath (7s period, peak 0.16 — stamped once, gated equal in CSS and
physics), NOT a flatlined waveform lying about listening. Keyboard law: churn is a
deterministic preset, v0=0, zero overshoot (overshoot is earned). PRM: the rack hides
entirely; a static stepped chip (5 quantized levels) carries the state — physics removed,
information kept. The home surface is the law-13 register: 0.70 black fill, blur(6px) low
ghosting, thin rims — near-black as a luminance floor over a live backdrop.

## QUEUED-PAINT (the serialized browser arm's ledger — video path only)

1. **QUEUED-PAINT / the mic session end-to-end.** Needs a real device + permission grant:
   speak, watch attack snap and release drain; deny permission, confirm honest silence + the
   status line. Node cannot hold a microphone.
2. **QUEUED-PAINT / transform-only trace.** Performance trace one churn session: 20 scaleY
   writes/frame, zero layout, zero paint beyond compositing; the rAF must die on the parked
   frame (frame-gap statistics — WebKit quantizes performance.now to 1ms).
3. **QUEUED-PAINT / the law-13 register read.** Video/screenshot both engines: the capsule
   must read smoky near-black with the world GHOSTING through (blur 6 is low by design), thin
   rim, no idle specular. If it reads opaque, the fill alpha is the dial — the register, not
   the mechanism.
4. **QUEUED-PAINT / the idle breath.** Long video at rest: the rim luminance must drift on
   the 7s asymmetric envelope, visibly alive at the threshold of noticing — and the rAF
   counter must stay parked the whole time (the breath is CSS-only).
5. **QUEUED-PAINT / PRM organ.** Emulate reduced motion: rack gone, chip stepping in quanta,
   idle breath stilled.

## Known dishonesties and limits

1. The mic RMS gain (×2.6) and the pointer/churn tanh scales are seat-tuned to feel-parity in
   sim, not measured against device mic levels — the browser arm should speak at conversational
   distance and confirm the level rides the meat of the range.
2. The PRM mic path samples on a 250ms `setTimeout` clock — a coarse honest clock, chosen so
   PRM never rides rAF; it is still a timer while (and only while) a PRM mic session is live.
3. The bars render the LEVEL through a spatial kernel — deliberately NOT a spectrum (one
   honest degree of freedom). If the campaign later wants true spectral bars, that is a new
   adapter shape decision (per-bin), which would break one-shape parity with the scalar
   sources; the roster's contract chose the scalar, and this prototype holds it.
4. `--engage-t` is published during sessions (the FAC shape) but nothing on this page consumes
   it — the publication is the contract under test, not the consumer.
