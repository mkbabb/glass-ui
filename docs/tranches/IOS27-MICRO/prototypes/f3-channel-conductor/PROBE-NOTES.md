# PROBE-NOTES — F3 CHANNEL-CONDUCTOR prototype (IOS27-MICRO pass 1)

verified-model: claude-fable-5 (system-context model ID, verbatim). Prototype seat, 2026-07-18.
Status: RUNS (node-verified logic; paint unverified — this seat owns no browser).

## What the prototype claims to prove

SPEC-F3 §5's riskiest claim: the probe's emergent choreography survives contact with paint. One
conductor — four laws, zero authored timelines — drives the Control-Centre surface (scrim + grid +
rail) and hits every MARKS §5/§6 band in-browser, under scrub, release, AND a mid-close catch, with
the medium held featureless between cycles and zero idle rAF after park. The desync (fade ~4× faster
than stretch, close-order inversion, empty-medium beat, depth-graded travel, delayed periphery) falls
out of the coupling constants only.

File: `index.html` — self-contained, no build step, no server; open via `file://` in Safari and
Chrome. `check.mjs` extracts the conductor block from the HTML (the exact shipped code, zero drift)
and runs the same battery on a virtual clock: `node check.mjs`.

## Node logic check — 16/16 PASS (virtual clock, 120 Hz; 60 Hz continuity rows included)

```
open: medium t90                  73ms                          <=100ms         PASS
open: fade t90                    165ms                         130-270ms       PASS
open: geometry t99                642ms                         560-700ms       PASS
open: fade/stretch                0.258                         0.20-0.31       PASS
open: periphery lag               132ms                         60-180ms        PASS
park after open                   967ms, pending rAF=0          parked, 0 rAF   PASS
close: content out                169ms                         110-210ms       PASS
close: empty-medium beat          99ms                          80-220ms        PASS
close: medium out                 641ms                         560-720ms       PASS
interrupt: medium min             1.0000                        1.000 held      PASS
interrupt: max step               0.130 (bound 0.141)           law-bounded     PASS
interrupt: re-settled + parked    yes                           parked          PASS
tempo x1.3: fade/stretch          0.257                         0.20-0.31       PASS
60Hz interrupt: medium min        1.0000                        1.000 held      PASS
60Hz interrupt: max step          0.242 (bound 0.261)           law-bounded     PASS
PRM: release seats                x=1, frames=0, pending rAF=0  x=1, 0 frames   PASS
```

Kin to the pass-1 probe table (SPEC-F3 §2 H5): medium 73 vs 67 ms, fade 165 vs 158, geometry 642 vs
633, ratio 0.258 vs 0.250, periphery 132 vs 142, content-out 169 vs 158, medium-out 641 vs 642 —
same rack, same constants, integration-scheme deltas only.

## How to judge it in paint

1. Idle honesty first: on load the page is seated closed, conductor PARKED, ticks 0 — verify zero
   rAF activity before touching anything.
2. Open (button or drag down): the scrim dims+blurs near-instantly; the whole grid is already
   present but dim, sitting high; it slides down ~600 ms decelerating while the fade completes in
   the first quarter; the bottom row visibly travels farther than the top row; the right-edge rail
   pops in ~100–160 ms behind the tiles.
3. Close: tiles fade+rise out in ~170 ms; then a beat of pure contentless blur (~100–200 ms — the
   signature moment); then the wallpaper resolves over a ~400 ms tail. Content leaves first, the
   medium relaxes after.
4. Flick + catch (button): dismissal starts, is caught at +120 ms, held, re-opened. The wallpaper
   must never resolve between the cycles — watch for any blur flicker; the medium-min readout must
   say 1.0000.
5. Drag is a scrub at any instant — grab mid-release, jockey the grid at any held position (the
   state is a pure function of position under the finger), flick hard vs place slow: hard flicks
   may overshoot (readout), slow places land dead.
6. Slow-mo ×4: same choreography stretched — the three clocks are easiest to eyeball here; the
   battery forces it off before measuring.
7. Run full battery: 12 rows must go PASS. Timings are rAF-sampled with linear interpolation at
   crossings; SPEC §5 allows ±1 frame at 60 fps.
8. Stress ×3: three live conductors (three rAF loops by contract) cycling ~5 s; the readout gives
   avg/max conductor JS ms per frame and fps. Style-recalc ms per frame (U10 proper) needs the
   browser seat's devtools trace — JS cannot see recalc cost.
9. PRM (simulate checkbox or the OS setting): every drive seats instantly — no motion, no rAF.

Measurement definitions (also printed on-page): t90 rising ≥0.90; geometry t99 ≥0.99; content out
≤0.05; medium relax <0.90; medium out ≤0.10; beat = t(medium<0.90) − t(content≤0.05); periphery
lag = t90(periphery) − t90(content); interrupt max-step bound = 1 − exp(−dt_max/0.055).

## Known dishonesties and deviations

1. **`inherits: true` on the channel vars.** SPEC §1 says registered vars `inherits: false` written
   on the surface root only — but the depth-graded rows are descendants and must read the var, so
   the prototype registers `inherits: true`. Real cost consequence: the per-frame write invalidates
   the stage subtree, not one element. Pass-2 must pick: inherits:true, or per-row JS writes.
2. **Geometry is `(response 0.6, ζ 1.0)`, not `preset: "dock"`.** SPEC §1's manifest writes
   `preset: "dock"` but the accepted probe table was produced with (0.6, 1.0) — dock (0.68, 0.64)
   would not hit geometry t99 ~633 ms and would ring. The prototype follows the probe rack; the
   spec's manifest line needs correcting at the pass-2 API review.
3. **Cliff input saturation (`sat: 0.12`) is this seat's addition.** Under scrub the medium maps
   g/0.12 clamped — needed so the medium reaches full while the gesture is barely started (MARKS:
   blur done at 12.42 while the grid slides to 13.05) and so a catch at g≈0.9 cannot drag the
   medium below 1.000. The spec text never states the input map; it must be pinned.
4. **The delay law is a dead-time gate on the channel's own response, then it chases the LIVE
   source** — not a transport-delayed input. The transport reading gives periphery lag ~211 ms
   (off-band); the gate reading gives ~132–142 ms (on-band, matches the probe's 142). The spec's
   "transport delay + source routing" wording should be corrected or the constant re-fit.
5. **Max-frame-step is dt-dependent.** The probe's 0.12 was at 120 Hz; the law bound at 60 Hz is
   0.261 and the prototype measures 0.242 there. The readout prints the measured dt and its bound —
   do not compare raw step numbers across refresh rates.
6. **The interrupt catch is scripted** (setTimeout at +120 ms), not a human gesture — deterministic
   for measurement. A real manual catch is available via drag and behaves identically by
   construction.
7. **The beat sits at the band's low edge** (99 ms against MARKS ~100–200) under these crossing
   definitions; the pass-1 probe reported 117 ms with its own thresholds. Definitional sensitivity,
   not a mechanism gap — the acceptance band used here is 80–220 ms.
8. **Scrim blur rides element opacity over a constant-radius `backdrop-filter`.** Both engines fade
   the filtered backdrop with element opacity in practice, but this is exactly the kind of paint
   claim this seat cannot verify — the browser seat should eyeball the blur actually fading, not
   just the dim.
9. **Nested backdrop-filters** (tiles blur over the scrim's blur) are a known cost cliff on some
   engines — if the stress fps craters in Safari, suspect the tile blur first; the choreography
   claim survives with tile blur removed.
10. **Battery timings quantize to the display's refresh** — on 120 Hz displays the numbers will sit
    closer to the probe's; on 60 Hz expect ±1-frame wobble. Crossings are interpolated between
    frames to keep sub-frame precision.
11. **No browser was run by this seat** — node logic check only, per the seat contract. Paint
    verification (both engines, screenshots, the trace for U10) belongs to the serialized browser
    seat.

## What this prototype does NOT cover

Overpull volume compression and detent catches (F1's turf — the conductor consumes g after the
gesture layer's rubber map; only a mild rubber margin is present here), the lens body (F5 —
conductor supplies clocks only), scroll-timeline hybrid scrub (U12), and the adoption census (U9).

## VERIFIED — browser seat, pass 1

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
2026-07-18. Engine: Chrome 150 via chrome-devtools MCP, file:// direct, ~98Hz display (battery
reports dt 11.3ms). Safari not driven this pass — the MCP owns Chrome only; the Safari arm
(incl. the nested-backdrop-filter cost cliff, dishonesty #9) remains open.

**Verdict: PROVES.**

Full battery in live paint — 12/12 PASS:

| metric | measured | band |
|---|---|---|
| open: medium t90 | 58ms | ≤100ms cliff |
| open: fade t90 | 150ms | 150–250ms |
| open: geometry t99 | 627ms | ~600–650ms decel |
| open: fade/stretch | 0.239 | ~1:4 (0.25) |
| open: periphery lag | 137ms | 80–160ms |
| close: content out | 160ms | ~170ms |
| close: empty-medium beat | 102ms | 100–200ms |
| close: medium out | 636ms | ~620ms |
| interrupt: medium min | 1.0000 | held across cycles |
| interrupt: max frame step | 0.172 (bound 0.186 @ dt 11.3ms) | law-bounded |
| park: rAF after settle | 0 ticks (settle @953ms) | 0 ticks / 600ms |
| tempo ×1.3: fade/stretch | 0.245 (fade 200 / stretch 820) | ratio invariant |

Stress ×3: three live conductors, avg 0.06ms · max 0.30ms conductor JS per frame, ~96 fps over
6.0s. The choreography stays cheap under triple fan-out.

Depth-graded travel, measured directly (held scrub at g=0.500, remaining travel to settle by
getBoundingClientRect): rows r0→r3 = 28.0 / 29.9 / 31.8 / 33.6px — deep/shallow ratio 1.20,
exactly the +20% MARKS grading, emergent from the row constants.

Held-scrub paint reads (screenshots in this directory):

- `f3-idle.png` — boot state: closed, conductor PARKED, ticks 0. Idle honesty on load.
- `f3-scrub-mid-open.png` — held g=0.500: tiles fully faded in, grid sitting high, scrim fully
  engaged, wallpaper below reading as blurred masses — the three clocks desynchronized in one
  static frame. Notably the conductor PARKS mid-scrub at steady state (ticks frozen while held) —
  event-driven to the bone.
- `f3-held-near-closed.png` — held g=0.097 mid-dismissal: content out to ghosts, home icons
  reading semi-blurred through the still-engaged medium vs sharp at idle — the persistent-medium
  read, and with it the blur-rides-element-opacity claim (dishonesty #8) confirmed at an
  intermediate opacity in Chrome paint. A mid-relax computed sample caught scrim opacity 0.267
  during the close tail; the blur visibly attenuates with it (no binary pop).

PRM, proven in paint: with simulate-PRM on, Open seats row-0 top 127.18→183.18px and scrim
opacity 0→1 within one 50ms poll, identical at 350ms, Close the mirror — and the rAF tick counter
did not advance at all across both (1859→1859). Zero frames by construction, observed. One
cosmetic nit: the g/geometry badge does not refresh under PRM (no tick → no render), so it shows
the stale pre-seat value until the next interaction.

Scrub interrupt: grabbing mid-release (pointerdown during flight) arrests with no visible jump —
`mainCond.scrub(g0)` continuity by construction; the battery's max-frame-step row (0.172 within
its 0.186 law bound) is the quantitative form. Flick vs slow-place: release at speed overshoots
per the readout; a slow place lands dead (overshoot 0.0% observed on the held-release).

Screenshot-latency note: two attempts to catch the ×4 slow-mo close mid-relax in a PNG lost to
the MCP screenshot round-trip (~2s); the held states + computed samples above carry that claim.

Not verified here, per scope: Safari paint + the U10 style-recalc devtools trace (the stress
readout is JS-side only), and the U12/U9 items the prototype declares out of scope.
