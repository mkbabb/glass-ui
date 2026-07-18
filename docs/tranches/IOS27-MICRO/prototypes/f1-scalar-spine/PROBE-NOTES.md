# PROBE-NOTES — F1 SCALAR-SPINE prototype

verified-model: claude-fable-5 (system-context model ID, verbatim). Prototype seat, pass 1, 2026-07-18.
Status: RUNS. Files: `index.html` (self-contained, no build step — open directly), `check.mjs`
(node logic check of the exact physics block shipped in the page; `node check.mjs` — 21/21 PASS
at write time).

## What the prototype claims to prove

The spec's riskiest claim (SPEC-F1 §5): the follower bank reproduces the CC choreography — open
bands, close-order inversion, the empty-medium beat, the held-featureless-blur interrupt — with
ONE parameterization, off ONE spine that is scrubbed and caught mid-flight; and the Maps card runs
on one spine over the extended domain with the two local bound registers.

Concretely, on one page:

1. **CC demo** — a stretch spine (`--gl-t`) plus two JS followers published as `--gl-m` (medium,
   position-keyed occupancy, 25/140ms) and `--gl-f` (fade, target-keyed commit intent, 65/55ms).
   Buttons run deterministic open / close-flick / interrupt scenarios; a readout table shows three
   columns per milestone: **sim** (1ms deterministic integration of the same classes that drive
   paint, computed at page load), **live** (rAF-sampled wall clock during the actual playback),
   and the MARKS band. Manual drag scrubs the same spine; touching mid-dismissal catches it C¹ and
   the blur visibly never resolves between cycles.
2. **Maps demo** — one spine on `[−0.10, 1.19]`: taffy dead-band below t=0.05, clip-path top-edge
   growth (bottom pinned by construction), the reveal ladder as per-rung calc bands of `--gl-t`
   (handle 0–5%, title ghost 10–30%, solid 30–50%, rung N at 0.4+0.1N), side breathe +3.6% with
   the ~1.2% pin squeeze, hyperbolic rubber-band overpull with bottom-anchored volume compression
   (−7.5% w / −21% h down), `pin-release` (0.22, 0.75) and `overpull-springback` (0.40, 0.34)
   local registers, the 170ms weak-well mid-detent catch, and the `--gl-vw` velocity-weight
   channel (tanh(|ṫ|·k)) driving an engagement glow.
3. **R1 panel** — 180-frame per-frame spine writes over a 40-consumer calc subtree; natural mode
   reports rAF gap/dropped frames, forced mode adds a synchronous getComputedStyle read as a
   recalc-cost proxy.
4. **R2 panel** — two registered `<number>` props with per-state transition durations under an
   irregular 10-toggle reversal storm; per-frame computed-value sampling; verdict GREEN if no
   inter-frame jump > 0.30 (a retarget must continue from the current computed value).

PRM: media query AND a simulate checkbox — spine seats instantly, JS followers snap, R2
transitions go to none. Zero in-between frames by construction.

## Sim numbers at write time (from check.mjs, same code as the page)

| milestone | sim | probe | MARKS |
|---|---|---|---|
| open medium 95% | 107ms | 106 | ≤100ms cliff (+1 frame tolerance) |
| open fade 95% | 194ms | 193 | 150–250ms |
| open stretch 90% | 589ms | 589 | ~600–650ms |
| open fade:stretch | 1:3.0 | 1:3.1 | ~1:4 |
| close fade out | 164ms | 163 | ~170ms |
| close empty-medium beat | 171ms | 172 | 100–200ms |
| close medium gone | 683ms | 681 | ~620ms |
| interrupt medium min | 0.62 | 0.46 | held featureless, never clears (acceptance ≥0.4) |
| interrupt fade min | 0.00 | 0.23 | content fully out (pure blurred field) |
| overpull overshoot | 32% @ 213ms | ζ0.3→37% | 30–50% of return |
| pin covered @83ms | 81% | 83–87% | ~130px in ≤100ms |
| mid-detent catch | 170ms well, lands 406ms | — | ~170ms transient catch |

## How to judge it visually (the browser seat's checklist)

- **Maps growth**: the card must never read as one bitmap sliding up — handle first, title ghost,
  icons EMERGING from behind the dock row (clipped tray, not opacity alone), labels, Recents rows,
  each fading AND rising. Bottom edge never moves; the top edge travels; the body widens slightly
  as it grows.
- **Overpull down**: glass AND content compress as one body, anchored bottom-center, displacement
  saturating (finger travels far, dock caps ~20 frame px). Release: exactly ONE overshoot past
  rest, settle inside ~a third of a second.
- **Pin**: drag far past the top, hold — barely-perceptible width squeeze; release — a very fast
  snapback with a soft decelerating tail, no visible oscillation.
- **Fast collapse from full**: a brief hesitation at the mid detent (~170ms) before the final
  fall — a catch, not a stop.
- **CC open**: blur+dim lands as a near-instant cliff; controls fade in next; the grid is still
  sliding down (deeper rows farther) well after the fade is done; the right rail trails ~100ms.
- **CC close**: content leaves FIRST (~170ms), then a beat of pure contentless blur, then the
  medium relaxes slowly. The order inversion vs open must be visible.
- **CC interrupt**: run interrupt (or flick-dismiss and touch mid-flight) — the blur must never
  fully resolve between the two cycles; content leaves and re-enters.
- **fps counter** top of page; "rAF parked (zero-cost idle)" must appear whenever everything is
  settled — the parked discipline is observable.

## Known dishonesties and limits

1. **The sim column is not a paint measurement.** It is a 1ms deterministic integration of the
   same Spine/Follower/Bank classes that drive the DOM writes. The live column samples the same
   follower values at rAF boundaries (wall clock, ±1 frame late per crossing). The live-π law —
   screenshot + paired-π in Chrome AND Safari — belongs to the serialized browser seat; nothing
   here substitutes for it.
2. **Interrupt medium-min diverges from the probe (0.62 vs 0.46), deliberately.** The probe used
   per-scenario occupancy constants (0.02 open, 0.10 close) and a positional fade ramp in its
   interrupt run. This prototype formalizes occupancy as one stateless target-conditioned rule
   (θ = 0.02 while intent is OPEN, 0.10 while CLOSED); at the catch the intent flips, so the
   medium re-attacks earlier and bottoms higher. Both satisfy the acceptance (≥0.4, never
   clears). Likewise fade-min is ~0.00 here (spec's pure target-keyed fade) vs the probe's 0.23
   (positional ramp) — ~0.00 matches MARKS' "pure blurred-dimmed field with NO content" read
   better. Round-2 should bless one of the two occupancy rules explicitly.
3. **CC "run open" is a pure glide** (spine 0→1 under cc-open), as in the probe. The video's open
   is gesture-driven then released; manual drag on the demo covers that path but the measured
   open row is the glide.
4. **The medium rides element opacity over a constant backdrop blur radius** (spec H4). Whether
   opacity attenuates the VISIBLE backdrop-filter smoothly is engine behavior that must be
   confirmed in Safari paint (it does in current Chrome/Safari to my knowledge, but this is
   exactly the class of claim the paint seat exists for). If it reads as a binary pop in Safari,
   the fallback inside the same architecture is an opacity ramp on a pre-blurred overlay — a
   material-recipe change (F1 publishes the same channel), not an architecture change.
5. **Settle metrics use the probe's definition** — first |x| < 2px after a real peak — not
   spine-park time (the analytic tail crosses the park epsilon much later). MARKS' "~170ms tail"
   for the pin is full visual rest; the 2px metric lands 102–122ms (probe bracket), and the page
   band reflects that.
6. **R1 forced mode is a proxy.** getComputedStyle after the write forces a synchronous recalc on
   the JS thread; the natural pipeline recalc may cost differently. Only the DevTools trace
   (browser seat, R1) gives the honest ms/frame; the panel exists to make the trace easy and to
   catch gross outliers cross-browser.
7. **R2 durations are 3τ linear stand-ins** (medium 75/420ms, fade 195/165ms) for the exponential
   followers — the probe's clocks expressed as CSS transitions. Continuity under retarget is the
   thing being probed, not curve shape. Verdict is computed-value continuity; paint continuity is
   the browser seat's call.
8. **Frame-scale px, not video px.** The phone mock is 300×620 CSS px (video 1206×2622), so all
   px readouts are frame-relative; ratios (overshoot %, coverage %) are the scale-free contract.
   μ_down displacement caps at ~20px and μ_up at ~36px in frame scale — note that in TRAVEL
   units the up margin is geometrically deeper (the video pins 130px past the detent vs the
   ~60–70px down cap); the spec's "deep down / shallow up" phrase is about compression feel
   (−21% vs −1%), which this prototype reproduces.
9. **Overpull ζ = 0.34** is the midpoint of the provisional 0.30–0.38 bracket; R3 (the 24fps
   re-burst) still arbitrates the MARKS-internal contradiction. One constant to change.
10. **Compositor residency unproven** (R5): the clip-path growth channel and the backdrop-filter
    scrim ride per-frame custom-property writes; whether Safari keeps them off the main thread is
    the R1/R5 trace's question. Badge/table DOM text updates are throttled to every 5th frame but
    still add main-thread noise a library implementation would not have.
11. **Two pointers on one surface are not handled** (R4 is out of scope for this prototype); a
    second pointerdown re-captures and re-seats the scrub.

## How to run

- Open `index.html` in Chrome and Safari (no server needed). Buttons fill the live columns;
  tables carry the MARKS bands; PASS/FAIL colors are encoded per band.
- `node check.mjs` — extracts the physics block from the HTML and asserts 21 checks (probe
  parity + MARKS bands + C¹ retarget continuity + rubber-band saturation).

## VERIFIED — browser seat, pass 1

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
2026-07-18. Engine: Chrome 150 via chrome-devtools MCP, file:// direct, ~98Hz display (frame gap
avg 10.23ms). Safari not driven this pass — the MCP owns Chrome only; the Safari paint arm
remains open.

**Verdict: PROVES.**

Live measurements (deterministic scenario buttons, rAF-sampled wall clock):

| measure | live | MARKS band | call |
|---|---|---|---|
| pin covered @83ms | 87% | ~80–87% | PASS |
| pin settle (<2px) | 123–124ms | 2px-metric bracket 102–122ms / tail ~170ms | PASS (+1ms) |
| overpull overshoot | 32–33% (8.4–10.1px) | 30–50% of return | PASS |
| overpull settle (<2px) | 323–332ms | ≤250–320ms | EDGE (+1 frame; both runs quoted) |
| mid-detent catch | 170ms well · landed 588ms | ~170ms well | PASS (well); live landing 588 vs sim 406 |
| CC open: medium 95% | 111–112ms | ≤100ms cliff (+1 frame) | PASS at tolerance (frame = 10.2ms here) |
| CC open: fade 95% | 202–204ms | 150–250ms | PASS |
| CC open: stretch 90% | 590–592ms | ~600–650ms | PASS (sim 589) |
| CC open: fade:stretch | 1:2.9 | ~1:3–1:4 | PASS at edge |
| CC close: fade out | 168ms | ~170ms | PASS |
| CC close: empty-medium beat | 173ms | 100–200ms | PASS |
| CC close: medium gone | 689ms | ~620–700ms | PASS |
| CC interrupt: medium min | 0.60 | ≥0.4, never clears | PASS |
| CC interrupt: fade min | 0.00 | ~0, content leaves | PASS |
| R1 forced-read, 40 consumers | avg 0.292ms · max 0.70ms/frame · 0 dropped/180 | gross-outlier catch | PASS |
| R2 reversal storm | 10 retargets · max inter-frame jump 0.149 | jump ≤0.30 | GREEN |

Geometry, measured from held synthetic-pointer scrubs (getBoundingClientRect):

- Rest dock w 256.42px → settled-open card w 266.00px = **+3.74% side breathe** (spec +3.6%).
- Pin held at t=1.108: w 264.19px = **−0.68% vs settled** — the ~1% pin squeeze, present.
- Deep down-overpull held at t=−0.080 (80% of the −0.10 floor): w **−6.0%**, h **−16.8%** —
  exactly 0.8 × the −7.5%/−21% full-depth targets, linear in depth as specced.
- Bottom edge y=722.742px at rest, mid-growth, and deep overpull — **immobile to the sub-pixel**.
- Scrub held at t=0.494 (CC): medium=1.00, fade=1.00, grid mid-travel — the three clocks
  visibly desynchronized in a single static frame.
- Scrub held at t=0.121 mid-dismissal: medium=1.00, fade=0.00 — the pure contentless
  blurred-dimmed field, held indefinitely under the finger; blur never resolves.

Visual reads (screenshots in this directory):

- `f1-scrub-mid-growth.png` — t=0.449 held: "Places" title solid, icon discs half-emerged
  CLIPPED from behind the dock row, labels/Recents not yet revealed, bottom pinned. The reveal
  ladder reads as a ladder, not a bitmap slide.
- `f1-pinned-held.png` — t=1.108 held: all rungs landed, card past detent.
- `f1-overpull-down-held.png` — deep down compression: pill, MIC/ME chips, and text all shrink
  with the glass — one body, bottom-anchored.
- `f1-cc-scrub-mid-stretch.png` — the desync frozen: tiles fully faded in, stack sitting high.
- `f1-cc-held-empty-medium.png` — the signature: wallpaper as blurred color masses, zero content.
- `f1-cc-open-settled.png` — settled CC; two-tier material visible (dark tiles, brighter toggle
  circles, near-opaque sliders).

Idle honesty: "rAF parked (zero-cost idle)" observed after every settle, including after the full
battery — the parked discipline is real. fps 98 steady, worst frame 11.3ms across the session.

Defect found (minor, PRM-only): `prmSeat()` seats to `spine.intent` but `scenario()` returns
early under PRM BEFORE the scenario fn sets the new intent — the scripted Maps buttons (flick
open/close) are no-ops under PRM from a parked state. CC buttons and manual gesture release seat
correctly (CC open seated t=1.000 within 60ms, zero frames, rAF parked). One-line fix: pass the
target into scenario() and seat to it.

Notes for pass 2: overpull settle sits 1 frame over its band on this 98Hz machine (323/332 vs
≤320) — either the band widens by one frame or ζ nudges up inside the R3 bracket; the live
mid-detent landing (588ms) runs ~180ms past sim (406ms) — worth one look at where the well
re-arms; the open-medium cliff needs a 120Hz display to clear ≤100ms without the tolerance frame.

## PASS-2 SAFARI ARM (Playwright-WebKit 26.5, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
pass 2 — the singleton browser owner this phase. Engine: repo-local Playwright 1.61.1 WebKit
build webkit-2311, `browser.version()` = 26.5, UA `Version/26.5 Safari/605.1.15`, headed,
macOS, DPR 2, display ~67Hz VRR (frame avg ~14.8–15.0ms). Playwright-WebKit is the honest
desktop proxy for Safari 2026; where a claim needs real-device input or Web Inspector traces
it is marked DEVICE-DEFER / TOOL-DEFER, never inferred.

**Two harness laws discovered this pass, governing every row below:**
1. **Playwright `page.screenshot()` is backdrop-filter-BLIND in WebKit** — all seven anatomies
   of a blur(8px) probe paint sharp in screenshots while the video/screencast path shows them
   fully frosted (`passes/PASS-2/harness-backdrop-blind-sanity.png` vs
   `harness-backdrop-video-truth.png`). Every MATERIAL verdict below rides the video path
   (25fps VP8 screencast at 1280×1000, 1:1 CSS px); screenshots serve geometry/light-layer
   claims only.
2. **WebKit quantizes `performance.now()` to 1ms** — the page's µs/sub-ms meters read 0/1ms;
   frame-gap statistics are the honest cost readout on this engine.

**Verdict: PROVES-IN-WEBKIT** — the full battery lands, with the same two carried defects as
Chrome (G7 PRM one-liner still unapplied; overpull constants stale vs the MARKS PASS-2
corrections).

| claim | measured (WebKit 26.5) | band / Chrome 150 parity | call |
|---|---|---|---|
| CC open: medium 95% | 112ms | ≤100ms cliff +1 frame (14.8ms here) · Chrome 111–112 | PROVES |
| CC open: fade 95% | 201ms | 150–250 · Chrome 202–204 | PROVES |
| CC open: stretch 90% | 599ms | ~600–650 · Chrome 590–592 | PROVES |
| CC open: fade:stretch | 1:3.0 | MARKS raw bands admit 1:2.4–1:4.3 (G2 caveat) | PROVES |
| CC close: fade out | 172ms | ~170 · Chrome 168 | PROVES |
| CC close: empty-medium beat | 163ms | 100–200 · Chrome 173 | PROVES |
| CC close: medium gone | 686ms | page band ~620–700 (G2: MARKS said ~620) · Chrome 689 | PASS-on-page-band |
| CC interrupt: medium min / fade min | 0.64 / 0.00 | ≥0.4 never clears / ~0 · Chrome 0.60 / 0.00 | PROVES |
| pin covered @83ms / settle | 84% / 116ms | ~80–87% / 2px-metric 102–122ms · Chrome 87% / 123–124 | PROVES |
| overpull overshoot / settle | 32% (10.1px) / 327ms | page band 30–50% / ≤330 · Chrome 32–33% / 323–332 | REGRESSION-LOCK only — see below |
| mid-detent catch | 170ms well · landed 584ms | Chrome 588 | DATA only — the cell is hard-wired PASS (G3), and C3 voided the corpus instance |
| R2 reversal storm | 10 retargets · max jump 0.227 | ≤0.30 · Chrome 0.149 (98Hz; step bound is rate-dependent) | GREEN — the CSS-follower arm's Safari precondition now holds |
| R1 natural | write avg 0.039ms · frame gap avg 14.91ms · 0 dropped/180 | 40 consumers | PROVES (cost bound) |
| R1 forced-read | write+recalc 0.656ms avg · max 2.0ms · 1 gap >24ms | proxy only | PARTIAL — a true style-recalc trace needs desktop Safari Web Inspector (TOOL-DEFER) |
| R5 clip-path growth cost | flick-open: 35 frames, avg 14.03ms, max 19ms, 0 >24ms at 67Hz | cost bound, not residency | PARTIAL — compositor residency itself TOOL-DEFER |
| idle honesty | "rAF parked (zero-cost idle)" after every settle; boot parked | — | PROVES |

**The overpull row, judged honestly:** the live WebKit numbers replicate Chrome and the pass-1
sim exactly (engine parity of the shipped constants) — but MARKS PASS-2 C2 voided the 30–50%
band itself: the corrected register is ζ 0.80 (0.77–0.88), f_d 1.7Hz, overshoot
velocity-bought ~1–2% of travel, settle ≈180ms. Against the corrected corpus the shipped
`overpull` register (0.40, ζ0.34) FAILS by construction on any engine. Constants re-derivation
is the F1 spec seat's work, not a paint question — the paint arm certifies parity only.

Geometry under held synthetic-pointer scrubs (getBoundingClientRect, `.card-body`):

- rest w 256.42px → settled-open 266.00px = **+3.74% side breathe** (Chrome identical to the hundredth).
- pin held t=1.140: w 263.65 = **−0.88% squeeze** vs settled (Chrome −0.68% at t=1.108).
- deep down held t=−0.083 (83% of floor): w **−6.2%**, h **−17.4%** = 0.83 × the −7.5%/−21%
  full-depth targets — linear in depth, as specced.
- bottom edge y=722.234px at rest, mid-growth, pin, AND deep compression — **immobile to the
  sub-pixel** in WebKit.
- held CC scrub t=0.500: medium 1.0000, fade 0.9990; held mid-dismissal t=0.121: medium 1.0000,
  fade 0.0000 — the contentless blurred field held indefinitely.

**H4 — the medium mechanism (dishonesty #4), answered in WebKit paint:** scrim = constant-radius
`blur(18px) saturate(1.2) brightness(0.62)` with `opacity: var(--gl-m)`. Video-path ramp at
--gl-m 0/0.35/0.7/1 over the wallpaper word: gradient-energy/luminance ratio falls
0.113 → 0.096 → 0.055 → 0.024 — the visible blur attenuates smoothly and monotonically with
element opacity, no binary pop. **PROVES — the fallback (pre-blurred overlay) is unnecessary.**
Artifact: `f1-wk-h4-blur-ramp.png` (video frames, m=0/0.35/0.7/1 left to right). The
screenshot-path version of the same experiment shows a constant ratio (dim only) — harness
blindness, kept in the scratch record as the lesson.

PRM: CC open seats t/m/f = 1.0000 in one poll with rAF parked (PROVES); **the G7 defect
reproduces in WebKit** — under PRM from parked, the scripted Maps flick-open is a no-op
(t stays 0.0000). Engine-independent; the one-line `scenario(target)` fix remains unapplied.

Screenshots (this directory, provenance stamped): `f1-wk-scrub-mid-growth.png` (t=0.449 held —
reveal ladder as a ladder, icons clipped behind the dock row; screenshot path, geometry),
`f1-wk-pinned-held.png` (t=1.140 held), `f1-wk-overpull-down-held.png` (deep compression, one
body), `f1-wk-cc-scrub-mid.png` (t=0.5 held desync), `f1-wk-cc-open-settled.png`,
`f1-wk-cc-held-empty-medium.png` (**video path** — wallpaper as pure blurred color masses, zero
content), `f1-wk-h4-blur-ramp.png` (video montage). Zero page errors across the session.

## PASS-2 CURES (cure seat F1, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). No browser owned this seat —
every check needing live paint is queued at `../../passes/PASS-2/reverify-queue.md` §F1 with
exact steps + acceptance numbers. Provenance: the wall-#9-killed cure seat's partial writes
(snapshot `../../passes/PASS-2/salvage-wall9/`) were verified byte-identical to the live tree at
resume, audited gap-by-gap against CRIT-F1 + MARKS PASS-2 CORRECTIONS, and completed. The
ledger: `../../passes/PASS-2/cures-F1.md`.

What changed in this directory (`node check.mjs` — **38/38 PASS** after the cures):

1. **Constants re-fit to MARKS, not to the pass-1 probe (G2).** Medium clocks 25/140ms →
   20/120ms (open-medium-95% 107→92ms inside the ≤100ms cliff; close-medium-gone 683→623ms
   inside MARKS 600–650). Overpull register (0.40, ζ0.34) → **(0.35, ζ0.80)** — the MARKS C2
   arbitrated register; `pin-release` (0.22, 0.75) kept as DESIGN (C3: bounds-only,
   INCONCLUSIVE). Every check.mjs band now carries a source tag — `[MARKS §n]` (corpus-derived),
   `[DESIGN]` (corpus-silent design law), `[REG-LOCK]` (drift lock on adopted constants, not
   corpus truth) — and the sim value is a point inside its band, never the band's author.
2. **The mid-detent catch is falsifiable end to end (G3).** Trigger rewritten from the
   release-state condition (`value > 0.72 && v < −2.2`) to the spec's projected-MOMENTUM path
   (decayRest-style, v′ = −k·v, k=3/s): a fast fall released at 0.70 now catches, a slow ease
   and a −3.2 flick-close refuse, upward crossings report symmetrically — a 10-row truth table
   in check.mjs. Exit is arrival-or-170ms. The page's `#mCatchS`/`#mCatchL` cells are no longer
   hard-wired PASS: dwell 120–220ms, well proximity ≤0.12, and landing gated live. **The
   588-vs-406ms delta is explained and eliminated**: sim gated |x|<0.006 ∧ |v|<0.1 while the
   live page gated the park epsilon (0.0015/0.02) — ~90–180ms apart at the dock register's
   decay rate. One metric now (the spine's own park epsilon, both sides): sim lands 571ms, live
   must land 571±40ms.
3. **ONE blessed parameterization (G5).** The target-conditioned θ rule (0.02 open-intent /
   0.10 close-intent) is the only occupancy rule in physics, page, spec, and check; the pass-1
   probe file carries a supersession header marking its per-scenario constants and positional
   fade ramp as history. Dishonesty #2 below is RESOLVED (the round-2 blessing happened).
4. **The intent law (G6).** The scrub-time heuristic is now a specced law in the physics block:
   committed-intent LATCH (drive-time latched), projection p = value + 0.15·v̄ with v̄ through a
   τ=120ms filter, hysteresis 0.5±0.10, pointer-idle decay (τ=100ms after 80ms still — the
   stale-LSQ accident is designed away; `scrubIdle` runs per frame in both demos). Six new
   check gates: zero flips under ±0.04 @ 6Hz dither from either latch state, exactly one flip
   on a slow cross, early commit (value 0.416 < 0.5) on a fast flick. Both badges now print
   `intent=` so the latch is observable live; the live dither rows are queued (reverify §F1).
5. **The G7 PRM defect is fixed.** `scenario(target, fn)` now receives the target and seats to
   it under PRM before returning — the Maps flick buttons seat correctly from parked. The live
   PRM re-run (both engines) is queued.
6. **Gate-cell honesty on the page.** Every live cell's inline gate now matches the check.mjs
   band ±1 display frame where a wall-clock crossing is sampled; the H5 sim column regenerates
   from the same physics block check.mjs extracts (unchanged mechanism, new constants).

Dishonesty-ledger disposition (the pass-1 list above stands as history): #2 RESOLVED (blessed
rule, item 3); #4 ANSWERED in WebKit paint (H4 blur-rides-opacity, safari-arm section); #5
PARTIALLY SUPERSEDED — the catch landing now uses the park metric on both sides (item 2); the
pin/overpull settle rows keep the 2px metric, still stated; #9 DEAD (register re-fit, item 1);
#1, #3, #6, #7, #8, #10, #11 stand unchanged. The pass-1 "Sim numbers at write time" table and
both VERIFIED live columns predate the re-fit and stand only as history — the re-measurement
under the corrected bands is the re-verify seat's (queue §F1).

## PASS-2 RE-VERIFY (queue §F1) — the re-fit constants measured live, engine-tagged

verified-model: claude-fable-5 (system-context model ID, verbatim). Re-verify browser seat,
2026-07-18. Chrome 150.0.7871.128 (Playwright 1.61.1 channel:"chrome", headed, display 120Hz —
frame 8.3ms) + WebKit 26.5 (webkit-2311, headed, 60Hz — frame 17ms), file://, DPR 2. Sim
reference re-confirmed at run time: `node check.mjs` = 38/38 PASS. Queue-precondition
correction: `maps`/`cc` are NOT reachable top-level bindings (the wiring script is an IIFE;
only `F1` is global) — the intent rows were measured through the page's own observables (the
badge `intent=` cell, ≤5-frame cadence, and the fade follower's per-rAF direction — the same
latch's consumer-facing consequence; the two concur on every row).

1. **CC battery (re-fit clocks) — 12/12 live cells PASS, both engines.**
   Chrome: open medium 95% 96ms (≤115; page sim 92), fade 95% 196ms, stretch 90% 596ms,
   fade:stretch 1:3.0; close fade 172ms, beat 150ms, medium gone 622ms; interrupt 0.57/0.00.
   WebKit: 91/206/590 · 1:2.9; 179/151/630; 0.58/0.00. The expected drift is LIVE: medium 95%
   lands 16–21ms earlier and medium-gone 56–64ms earlier than the banked pass-1 112/686 class
   — the stale-physics tripwire did not fire.
2. **Maps battery (C2 register) — all cells PASS, both engines.** Pin covered @83ms 85%/90%
   (≥75), settle 114/130ms (≤220). Overpull zero-seed overshoot **1.3%/0.8%** (≤3% — the
   pass-1 32–33% class is DEAD), settle 189/196ms (170–290). Flung overshoot/velocity
   0.022s/0.030s (0.015–0.030; WebKit at the band edge, page-classed PASS), settle from
   crossing 151/150ms. Catch: dwell 173/181ms, near 0.007, landed 581/597ms vs sim 571 —
   Δ10/Δ26 ≤ ±40 (the 588-vs-406 gate is real and held).
3. **PRM regression (G7) — VERIFIED both engines.** Under PRM each button seats in ONE poll:
   Maps flick-open computed --gl-t {0.0000→1.0000}, flick-close {1.0000→0.0000}, zero
   intermediate values, the engine's own fps cell parked THROUGHOUT (never woke); CC open/close
   seat t/m/f jointly in one step. The pre-cure no-op (t stuck at 0.000) did not reproduce.
4. **The intent-law live rows (G6) — VERIFIED both engines.**
   (a) settled open → slow-drag to t=0.500 (~1.5s) → ±13.6px @6Hz ×1.2s: 0 flips (intent held
   1; 350/170 samples); release glides to the LATCH's target 1.000 — not the nearest detent.
   (b) same dither reached from closed: 0 flips (intent 0).
   (c) continue slow to t≈0.75: EXACTLY 1 flip 0→1 at value 0.5813 (Chrome) / 0.5765 (WebKit)
   — consistent with p = value + 0.15·v̄ ≥ 0.60 at the measured drag speed; release → 1.000.
   (d) fast downward flick from parked closed: first intent=1 frame at value 0.3529 / 0.2941
   < 0.5 (early commit; sim ref 0.416) — the badge flip and the fade-rise frame AGREE on both
   engines; the surface commits open (final 1.000).
   Corroboration from the capture leg: a 0.55 t/s drag to 0.5 on WebKit latched intent 1
   mid-drag (velocity-bought commit) — the projection law visible in a second, independent path.
5. **R1 recalc attribution, Chrome arm — PASS.** Trace across the natural 180-frame run at 40
   consumers: 182 FireAnimationFrames, Recalculate Style total 52.0ms → **0.289ms/frame avg**
   (≤2ms), max single recalc 0.70ms; page meter: gap avg 8.33ms, max 9.4ms, 0 dropped >24ms.
   The WebKit half stays TOOL-DEFER (desktop Safari Web Inspector), per the queue.
6. **R5 clip-path residency, Chrome arm — GREEN; SPEC-F1 §2-H1 STANDS (no revert).** Trace
   across 3 flick-open/flick-close cycles (~54 rAF/750ms per flight): Paint events with clip
   rects intersecting the card body = **0 in all six growth windows** (the ~120 paints/window
   sit in the instrumentation panel outside the card box); after each flight's first
   invalidation no recurring per-frame main-thread Paint attributable to the card; frame gaps
   p95 9.2ms — the only 5 gaps >24ms are the 5 inter-flight PARKED idles (by design), 0
   in-flight frames >24ms.
7. **Capture law (SPEC §5) — the re-fit exhibit set stamped `f1-p2-*` / `f1-p2-wk-*`, each
   with its paired-π computed sample.** Mid-growth ladder held: t 0.4500/0.4494, badge
   "regime: scrub" in-frame. Held desync: t 0.5000, medium 1.0000, fade 0.0000, intent 0
   (the WebKit first take latched intent 1 at a 0.55 t/s drag — retaken at the (b)-class
   speed; the fast take kept as corroboration of row 4, not as the exhibit). Empty-medium
   beat frame: trigger f 0.043/0.050 with m 1.000; post-shot m 1.000/0.967 — the capture sits
   inside the beat on both engines. The pass-1 PNGs stand as history per the queue.
