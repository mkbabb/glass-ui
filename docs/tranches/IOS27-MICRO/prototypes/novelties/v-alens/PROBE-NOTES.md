# PROBE-NOTES — V-ALENS, the gradient-blur attention lens

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-2
(PROTO-ATTENTION-EXIT), 2026-07-18. Status: RUNS; `node check.mjs` 24/24 PASS at write time.
Files: `index.html` (self-contained, no build step), `check.mjs` (extracts the exact
`/*ALENS-PHYSICS-BEGIN*/` block shipped in the page).

## What the prototype claims to prove

Roster card 2's mechanism as REFINED at the pass-2.5 adjudication: engaging a control softens
a LOCAL ANNULUS around it via 3 stacked backdrop-filter layers (4/3/2px — sigma DECAYS
outward, compound peak ~5px in the near band, zero by ~330px) under STATIC nested-annulus
masks with a sharp hole at the seat, plus a dim capped at a 0.05 whisper — with ONLY layer
opacity animating, all of it driven by `--engage-t` as calc-band ladders (the F1 authoring
pattern). The center seats ONCE per engagement (`makeSeat()` — `move()` provably ignored);
the stack parks (`visibility: hidden`) whenever `--engage-t` is 0; reversal mid-rise is C¹
(the scrub law); N3 sibling legibility is gated analytically across the full dim sweep with
the label's OWN ALPHA honored in the composite (worst case 4.88:1 ≥ AA at label alpha 1.0).

## JUDGE CORRECTIONS (pass-2.5 adjudication, 2026-07-18)

- **MECH M1 SUSTAINED and CURED.** The old `siblingContrast()` read the label RGB as opaque;
  honoring the painted 0.92 alpha put the true worst case at 4.41:1 < AA while the gate and
  these notes claimed 4.88. The model now composites the label at its alpha, and the label
  ships at alpha 1.0 (`.feed .item b { color: rgb(255,255,255) }`) — the 4.88 floor is
  re-earned honestly.
- **DESIGN M1 SUSTAINED and CURED.** The old build inverted the measured annulus (crisp near,
  saturated 4+8+16px + 0.26-dim far — a modal spotlight where MARKS-C-APPS.md:117-131 measures
  luminance LOCKED 0.99-1.01 and a local field decaying to zero). Masks re-banded to the
  `--glass-halo-*` profile; dim capped 0.26 → 0.05. The 0.85 figure in the ramp's far stop is
  the gradient color's alpha — the painted dim ceiling was 0.26×0.85 ≈ 0.22, still a scrim.
- **MECH M5 SUSTAINED and CURED.** `--engage-t`/`--lens-cx/cy` now publish on `#stage`, not
  `documentElement` (the inheriting-:root-per-frame subtree storm).
- **MECH M7 SUSTAINED, comments cured.** The "single-sourced / CSS stamps FROM here" comments
  were false — bands are hand-mirrored; the stamp/cross-check is a pass-3 gate owed.
- **QUEUED-PAINT (new):** the re-banded annulus must be VIDEO-judged on WebKit (halo local,
  world crisp, no banding between the 4/3/2 rings) before any adoption language.

Node-proven at write time: envelope t90 129ms (attack) / t10 371ms (release, law-14c class);
band arrival strictly deepening (17/33/75ms); seat law held; interrupt max jump 0.022, zero
non-monotone frames; thumb pop 1.10 under the φ^¼ = 1.1279 cap (C7).

## QUEUED-PAINT (the serialized browser arm's ledger — video path only)

1. **QUEUED-PAINT / blur-rides-opacity on the masked stack.** `safari-arm.md:148-150` proved
   opacity-ramped backdrop layers; it did NOT prove three CONCURRENT masked siblings ramping
   independently. WebKit video capture: engage the slider, confirm the blur field deepens
   smoothly outward (no banding pops between the 4/8/16 rings) and dies reversibly on release.
   Playwright-WebKit screenshots are backdrop-blind — video is the only honest organ.
2. **QUEUED-PAINT / Chromium parity, no clipping wrapper.** The stack root carries no
   `overflow:hidden` (the Chromium stacked-mask weakness). Verify the same paint on Chrome —
   NO-CHROME-SPECIAL cuts both ways.
3. **QUEUED-PAINT / mask re-seat repaint cost.** The mask position vars are stamped once per
   engagement (a seat, not tracking). Trace one engagement: the mask-geometry write must cost
   one repaint at seat time, none per frame thereafter (frame-gap statistics, not
   `performance.now()` deltas — WebKit quantizes to 1ms).
4. **QUEUED-PAINT / live-π sibling contrast.** The analytic N3 gate composites the worst-case
   stack in sRGB math; the live gate is paired-π on the actual pixels under peak accent
   (the paint-arm oklab parse applies).
5. **QUEUED-PAINT / rAF parks at settled hold.** HUD shows "rAF parked" at engage-t=1 held —
   confirm no rAF churn while the finger rests (the envelope is at target; nothing moves).

## Known dishonesties and limits

1. The dim ramp's alpha composite assumes sRGB source-over; real backdrop-filter compositing
   differs in colorspace detail. The analytic gate is a floor argument (darken-only under
   near-white text), not a pixel claim — hence QUEUED-PAINT item 4.
2. The lens region is bounded to the phone stage, not the control's container as the roster
   card specifies for library integration — a standalone-prototype simplification; the
   architecture (sibling stack, static masks, seat vars) is the thing under test.
3. Keyboard focus seats the lens at the control's center (one `getBoundingClientRect` per
   engagement — event-scoped, not per-frame). Fine for the prototype; the library form should
   take the seat from the focus event's target geometry cache.
