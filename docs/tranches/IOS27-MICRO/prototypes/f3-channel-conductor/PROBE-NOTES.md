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
7. Run full battery: 12 GATED rows must go PASS (the fade/stretch ratio row is derived-info —
   its primaries gate it; the sub-sat row is the 12th gate). Timings are rAF-sampled with linear
   interpolation at crossings; the ±1-frame display term is INSIDE every printed band (the BANDS
   block — printed = gated, MARKS-derived).
7b. Re-run the battery with "paint-side sampling" checked: every row re-measured from
   style-engine-resolved values (computed scrim opacity, row-0 computed translateY inverted,
   row/rail opacity) — certifies the var→CSS binding; expect each timing row within ±1 display
   frame of its internal-mode twin.
8. Stress ×3: three live conductors (three rAF loops by contract) cycling ~5 s; the readout gives
   avg/max conductor JS ms per frame and fps. Style-recalc ms per frame (U10 proper) needs the
   browser seat's devtools trace — JS cannot see recalc cost.
9. PRM (simulate checkbox or the OS setting): every drive seats instantly — no motion, no rAF.

Measurement definitions (also printed on-page): t90 rising ≥0.90; geometry t99 ≥0.99; content out
≤0.05; medium relax <0.90; medium out ≤0.10; beat = t(medium<0.90) − t(content≤0.05); periphery
lag = t90(periphery) − t90(content); interrupt max-step bound = 1 − exp(−dt_max/0.055).

## Known dishonesties and deviations (pass-2 cure status inline)

1. **`inherits: true` on the channel vars.** SPEC §1 says registered vars `inherits: false` written
   on the surface root only — but the depth-graded rows are descendants and must read the var, so
   the prototype registers `inherits: true`. Real cost consequence: the per-frame write invalidates
   the stage subtree, not one element. Pass-2 must pick: inherits:true, or per-row JS writes.
   → **CURED (G2 RULED): inherits:true accepted with the WebKit price card (safari-arm U10
   differential — ≤18 ms worst frame through ~1000 consumers); spec §1 rewritten; per-row JS
   writes rejected; Chrome recalc attribution queued (reverify-queue §F3).**
2. **Geometry is `(response 0.6, ζ 1.0)`, not `preset: "dock"`.** SPEC §1's manifest writes
   `preset: "dock"` but the accepted probe table was produced with (0.6, 1.0) — dock (0.68, 0.64)
   would not hit geometry t99 ~633 ms and would ring. The prototype follows the probe rack; the
   spec's manifest line needs correcting at the pass-2 API review.
   → **CURED (G1): spec manifest corrected to (0.6, 1.0) with the per-surface register home
   pinned (presets-in-consumers seam, springPresets.ts:116–122). Note the dock row cited here
   as (0.68, 0.64) was itself the stale MARKS literal — on disk it is (0.30, ζ 0.82), verified,
   and corpus-true for the dock morph (MARKS PASS-2 C2); the ring/undershoot conclusion stands
   either way.**
3. **Cliff input saturation (`sat: 0.12`) is this seat's addition.** Under scrub the medium maps
   g/0.12 clamped — needed so the medium reaches full while the gesture is barely started (MARKS:
   blur done at 12.42 while the grid slides to 13.05) and so a catch at g≈0.9 cannot drag the
   medium below 1.000. The spec text never states the input map; it must be pinned.
   → **CURED (G4): `sat` promoted into the law vocabulary as a first-class modifier; the
   scrub-regime medium law adjudicated and written (SPEC §1); §1 manifest carries sat 0.12;
   the sub-sat battery row gates the map at g/sat ±0.02.**
4. **The delay law is a dead-time gate on the channel's own response, then it chases the LIVE
   source** — not a transport-delayed input. The transport reading gives periphery lag ~211 ms
   (off-band); the gate reading gives ~132–142 ms (on-band, matches the probe's 142). The spec's
   "transport delay + source routing" wording should be corrected or the constant re-fit.
   → **CURED (G5): the wake-armed dead-time-gate semantics are now the specced law, with re-arm
   rules per drive transition (arms on wake-from-parked only; mid-flight retargets never re-arm —
   adjudicated intended against MARKS; seat clears). The four-laws framing corrected to three
   laws + three modifiers.**
5. **Max-frame-step is dt-dependent.** The probe's 0.12 was at 120 Hz; the law bound at 60 Hz is
   0.261 and the prototype measures 0.242 there. The readout prints the measured dt and its bound —
   do not compare raw step numbers across refresh rates. *(Stands — documented behavior.)*
6. **The interrupt catch is scripted** (setTimeout at +120 ms), not a human gesture — deterministic
   for measurement. A real manual catch is available via drag and behaves identically by
   construction. *(Stands.)*
7. **The beat sits at the band's low edge** (99 ms against MARKS ~100–200) under these crossing
   definitions; the pass-1 probe reported 117 ms with its own thresholds. Definitional sensitivity,
   not a mechanism gap — the acceptance band used here is 80–220 ms.
   → **CURED (G8): the shown-vs-gated split is gone — bands live in ONE extracted BANDS block,
   printed = gated, each derived from MARKS ± declared quantization (beat: floor 80−17, ceiling
   200+17 → 63–217 ms). 99 ms now sits INSIDE the printed band instead of beside a prettier one.**
8. **Scrim blur rides element opacity over a constant-radius `backdrop-filter`.** → **ANSWERED in
   paint on both engines: Chrome mid-relax computed sample (pass-1 VERIFIED) + the WebKit video-
   path ramp 0.0150→0.0037 (`f3-wk-blur-ramp.png`, PASS-2 SAFARI ARM).**
9. **Nested backdrop-filters cost cliff.** → **NOT OBSERVED at ×3 conductors on WebKit 26.5
   (~67 fps, gaps ≤24 ms, tile blur intact) — bounded at this scale, not universally.**
10. **Battery timings quantize to the display's refresh** — on 120 Hz displays the numbers will sit
    closer to the probe's; on 60 Hz expect ±1-frame wobble. Crossings are interpolated between
    frames to keep sub-frame precision. *(Stands — and the gate bands now carry the ±17 ms display
    term explicitly.)*
11. **No browser was run by this seat** — node logic check only, per the seat contract.
    → **The Safari arm landed (below); the Chrome arm landed pass 1. The paint-side battery mode
    (G9) ships in the page; its browser run is queued (reverify-queue §F3).**

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

## PASS-2 SAFARI ARM (Playwright-WebKit 26.5, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
pass 2. Engine: repo-local Playwright 1.61.1 WebKit webkit-2311, version 26.5
(`Version/26.5 Safari/605.1.15`), headed, macOS, DPR 2, ~67Hz VRR display. Harness laws
(proven this pass, full statement in the F1 section): Playwright WebKit screenshots are
backdrop-filter-blind — material verdicts ride the 25fps video path; `performance.now()`
quantizes to 1ms — frame gaps are the honest cost stat.

**Verdict: PROVES-IN-WEBKIT — 12/12 battery in live paint, second engine.**

| metric | WebKit 26.5 | Chrome 150 | band (page gate; G8's wider gate noted) |
|---|---|---|---|
| open: medium t90 | 67ms | 58ms | ≤100ms |
| open: fade t90 | 158ms | 150ms | shown 150–250, gated 130–270 |
| open: geometry t99 | 638ms | 627ms | shown ~600–650, gated 560–700 |
| open: fade/stretch | 0.248 | 0.239 | 0.20–0.31 |
| open: periphery lag | 130ms | 137ms | 80–160 |
| close: content out | 162ms | 160ms | shown ~170, gated 110–210 |
| close: empty-medium beat | 94ms | 102ms | shown 100–200, gated 80–220 — the low-edge sits OUTSIDE the shown MARKS band (G8 live in WebKit too) |
| close: medium out | 630ms | 636ms | ~620 |
| interrupt: medium min | 1.0000 | 1.0000 | held across cycles |
| interrupt: max frame step | 0.208 (bound 0.279 @ dt 18.0ms) | 0.172 (bound 0.186 @ 11.3) | law-bounded, dt-dependent as documented |
| park after settle | 0 ticks (settle @964ms) | 0 ticks (@953ms) | 0 ticks / 600ms |
| tempo ×1.3 | 0.256 (fade 213 / stretch 835) | 0.245 | ratio invariant |

Stress ×3: conductor JS avg 0.14ms · max 1.0ms (1ms clock floor) per frame, ~67fps over 6.0s,
sampled frame gaps ≤24ms with zero over-24 — no nested-backdrop-filter cost cliff at this
scale (dishonesty #9: not observed; the tile blur survives on WebKit at three live conductors).

Depth-graded travel at held g=0.500 (remaining travel to settle, rows r0→r3):
29.76 / 31.75 / 33.73 / 35.72px — **deep/shallow ratio 1.20, exactly the MARKS +20% grading,
on the second engine.**

**U10 — the inherits:true subtree cost, priced (differential, not a trace):** open+close cycle
frame gaps — baseline avg 7.32ms (the VRR display ramps to ~136Hz when cheap); +240 injected
descendant consumers reading the channel vars: avg 14.74ms; +960: avg 14.72ms, max 18ms, zero
frames >24ms. Reading: the per-frame inherited-var write is not free — it halves the achievable
VRR cadence on this display — but it holds a 60Hz budget through ~1000 consumers. Forced-recalc
proxy (write `--ch-content` on the stage + forced `getComputedStyle` on a deep child, 240
consumers): avg 0.72ms, max 1ms (clock floor). Style-recalc ATTRIBUTION proper remains
TOOL-DEFER (Safari Web Inspector; Playwright exposes no WebKit timeline). The VRR ramp is a
confound on the halving read; the ≤18ms worst frame is the load-bearing number.

**Blur-rides-element-opacity (dishonesty #8), answered in WebKit paint:** scrim = constant
`blur(26px) saturate(1.4)` with `opacity: var(--ch-medium)`. Video-path ramp at 0/0.35/0.7/1:
gradient/luminance ratio 0.0150 → 0.0133 → 0.0068 → 0.0037 — the blur visibly and smoothly
attenuates with opacity; no radius pump, no pop. **PROVES.** Artifact: `f3-wk-blur-ramp.png`.

**A scrub-regime medium finding (feeds G4):** held scrub at g≈0.100 (below sat 0.12) leaves the
medium at 0.8333 = g/sat — in paint the blur visibly thins while a finger hesitates near
closed. The release-regime hold is intact (battery interrupt row 1.0000), but the sub-sat
scrub map is now a SEEN behavior on both engines — the pass-2 medium-law adjudication (G4) has
its paint exhibit.

PRM: simulate-PRM open seats all four channels to 1.0000 within 120ms with the tick counter
frozen (1399 → 1399) — zero frames, second engine.

Boot idle honesty: state PARKED, ticks 0 on load. Zero page errors.

Screenshots (provenance stamped): `f3-wk-scrub-mid-open.png` (held g=0.5 — three clocks
desynced in one frame; screenshot path, geometry), `f3-wk-held-near-closed.png` (held g≈0.10 —
the sub-sat medium state; screenshot path), `f3-wk-blur-ramp.png` (**video path**, the
material truth). The unprovenanced `f3-wk-held-half-medium.png` left by a crashed earlier
capture run was removed — no notes row ever referenced it.

## PASS-2 CURES (cure seat F3, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). Cure seat, no browser owned.
Ledger: `../../passes/PASS-2/cures-F3.md`. Queued paint checks: `../../passes/PASS-2/reverify-queue.md` §F3.

Code changes (conductor + harness, `check.mjs` re-extracts both blocks — zero drift preserved):

- **G6 — direction latched at drive time.** `stepChannel` no longer infers direction per frame;
  each drive (`scrub`/`release`/`seat`) latches `c.dir`. New gate row: an underdamped
  direction-asymmetric spring {0.5/ζ0.35, close 0.35/ζ0.8} released at v=0 must match a
  latched-reference integration through its 31% overshoot — measured deviation 0.0 (bitwise),
  peak 1.308. FALSIFICATION RUN: the pre-cure per-frame code, restored in a scratchpad copy,
  FAILS the row at max dev 1.9e-1 (peak flapped to 1.164) — the gate bites.
- **G8 — one BANDS block, printed = gated.** All gate bands now live in `/*F3-BANDS-BEGIN*/…END*/`
  in index.html, extracted verbatim by check.mjs and rendered verbatim in the page table. Every
  band derives from MARKS ± declared quantization (±17 ms display; ±42/±21 ms burst on point
  figures). The fade/stretch ratio row is demoted to derived-info (its primaries gate it — a band
  it cannot escape is not a gate); tempo now gates INVARIANCE (|Δratio| ≤ 0.06 vs the same-run
  base) instead of an absolute band; the interrupt step bound prints its τ and asserts its
  parameter region (g ≥ sat).
- **G4 — the sub-sat episode is a gate.** New row on page and in check: release-close caught at
  g = 0.10 < sat 0.12 → medium must hold g/sat = 0.8333 ±0.02 with steps bounded by the
  manifest's fastest law (τ0.03). Measured: 0.8333, max step 0.130 vs bound 0.243.
- **G9 — paint-side sampling mode.** Page checkbox re-points the battery recorder at
  style-engine-resolved values (computed scrim opacity; row-0 computed translateY inverted to the
  channel value, g = 1 + ty/56; row-0/rail computed opacity). A typo'd var name or dead binding
  fails this mode where internal sampling would lie. Browser run queued (this seat owns none).
- **G13 — hygiene.** Dead `delayedOK` channel field removed; the PRM-stale g/geometry badge now
  refreshes from the 250 ms poll while parked; a mid-flight tempo rebuild now carries live
  velocity (`state()` exposed; seat + re-release instead of a dead seat).
- **New probe rows** (F3-owned evidence): H3 lens clock — {light cliff τ0.02, geo spring("dock")}
  gives light t90 50 ms vs geometry t90 150 ms (ratio 0.34): light leads emergently, DESIGN-
  labeled; useLeadTrail-as-two-channel-manifest expressibility — trail never leads through the
  rise (source routing is load-bearing: a target-chasing first-order would outrun the spring's
  slow start), joint park holds (the generalization-not-rival demand).

Node battery after the cures — 19/19 gates PASS (+1 info):

```
open: medium t90                        73ms    ≤100 ms (corpus cliff ≤83 @12fps + 17 display)  PASS
open: fade t90                          165ms   133–267 ms (MARKS 150–250 ±17)                  PASS
open: geometry t99                      642ms   583–667 ms (MARKS 600–650 ±17)                  PASS
open: fade/stretch (derived)            0.258   info — φ³ ref 0.236; primaries gate it          info
open: periphery lag                     132ms   63–177 ms (MARKS 80–160 ±17)                    PASS
park after open                         967ms, pending rAF=0                                    PASS
close: content out                      169ms   111–229 ms (MARKS ~170 ±42 burst ±17)           PASS
close: empty-medium beat                99ms    63–217 ms (floor 80−17; ceiling 200+17)         PASS
close: medium out                       641ms   561–679 ms (MARKS ~620 ±42 burst ±17)           PASS
interrupt: medium min                   1.0000  held (region g≥sat)                             PASS
interrupt: max step                     0.130 (bound 0.141, τ0.055)                             PASS
interrupt: re-settled + parked          yes                                                     PASS
sub-sat catch: medium = g/sat           0.8333 (want 0.8333), step 0.130 (bound 0.243, τ0.03)   PASS
tempo x1.3: fade/stretch invariance     0.257 (Δ 0.001 vs base 0.258)                           PASS
60Hz interrupt: medium min              1.0000                                                  PASS
60Hz interrupt: max step                0.242 (bound 0.261, τ0.055)                             PASS
PRM: release seats                      x=1, frames=0, pending rAF=0                            PASS
G6 latch: continuity through overshoot  max dev 0.0e+0 vs latched ref, peak 1.308               PASS
H3 lens clock: light leads (DESIGN)     light t90 50ms, geometry t90 150ms, ratio 0.34          PASS
useLeadTrail as a 2-channel manifest    trail ≤ lead through rise; jointly parked               PASS
```

Every pass-1/pass-2 paint measurement re-checked against the new derived bands: Chrome 150 and
WebKit 26.5 rows all sit INSIDE the printed gates (the WebKit beat 94 ms — formerly "outside the
shown band, inside the wider gate" — now sits inside the one honest band 63–217). The bands
tightened where derivation demanded (geometry hi 700→667, medium-out 560–720→561–679) and no
measurement was lost — falsifiability increased, evidence held.

## PASS-2 RE-VERIFY (queue §F3) — engine-tagged VERIFIED rows

verified-model: claude-fable-5 (system-context model ID, verbatim). Re-verify browser seat,
2026-07-18. Chrome 150.0.7871.128 (Playwright 1.61.1 channel:"chrome", headed, 120Hz — frame
8.3ms) + WebKit 26.5 (webkit-2311, headed, 60Hz — frame 17ms), file://, DPR 2.

1. **Paint-side battery, both engines (G9 CLOSED).** 12/12 gates PASS in PAINT-SIDE mode on
   Chrome AND WebKit (summary prints "sampling: PAINT-SIDE"), and 12/12 again in internal
   mode. Chrome paint-side: medium t90 65ms, fade t90 157ms (133–267 ✓), geometry t99 633ms
   (583–667 ✓), periphery 136ms, content-out 155ms, beat 107ms, medium-out 636ms, interrupt
   1.0000 / step 0.131 (bound 0.154), sub-sat 0.8333 (want 0.833), park 0 ticks, tempo Δ0.001.
   WebKit paint-side: 66/158/639/132/162/90/626, interrupt 1.0000/0.234 (bound 0.279), sub-sat
   0.8333, park 0 ticks, tempo Δ0.014. Per-timing-row |paint − internal|: Chrome ≤1ms (display
   bound 8.3ms), WebKit ≤11ms — op +6, cc −11, cm −11, others ≤2 (bound 17ms @60Hz). The
   var→CSS binding layer is certified in paint on both engines.
2. **Chrome style-recalc attribution on stress (the G2-ruling deepening) — PASS.** Stress ×3
   baseline: 6.08s window, 2159 rAFs, recalc total 317.7ms → 0.147ms/frame, page cell "avg
   0.07ms · max 0.40ms · ~120fps". With the queue's 960 injected descendant consumers reading
   the channel vars inside `.stage`: recalc total 671.8ms / 2156 rAFs → **0.312ms/frame avg
   (bound ≤6ms — 19× margin)**, max single recalc 1.40ms, frame gaps p95 8.5ms, max 12.0ms,
   **0 frames >24ms**; fps held 120. Far inside the WebKit differential's parity band.
3. **Sub-sat medium exhibit, Chrome arm (G4 parity) — VERIFIED.** Real pointer drag from full
   open, held near-closed: h-g readout 0.081 (window 0.08–0.11), computed scrim opacity
   0.6710 = the scrubbed g/sat exactly (0.0805/0.12 = 0.671, Δ0.000; measured against the
   still-settling geometry x 0.0853 the gap is 0.040 — the position-mapped law binds to the
   scrubbed g, and after the geometry spring settles the two agree within the ±0.02 band).
   Exhibits: `f3-p2-full-open.png` vs `f3-p2-held-near-closed.png` — home icons readable
   through the visibly THINNED veil. (WebKit exhibit already banked: `f3-wk-held-near-closed.png`.)
4. **Tempo-rebuild velocity carry (G13) — VERIFIED both engines.** Open clicked from seated
   closed; slow-mo ×4 toggled mid-flight (g at toggle 0.454 / 0.430). Per-frame Δg across the
   rebuild carries at 0.84× (Chrome 0.0318→0.0266/frame; WebKit 0.0637→0.0533) — NO
   arrest/dead stop (the pre-cure zero-velocity rebuild would read ~0); conductor state stays
   "running" across the toggle, no park within 60 frames; geometry proceeds to 1.000 with a
   +0.5% velocity-bought overshoot then settles — the carried velocity made visible. Post-
   toggle evolution runs on the ×4 clock as designed.
