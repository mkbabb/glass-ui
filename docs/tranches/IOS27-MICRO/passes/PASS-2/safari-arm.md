# PASS-2 SAFARI ARM — the WebKit paint evidence pack (IOS27-MICRO)

verified-model: claude-fable-5 (system-context model ID, returned verbatim). Seat:
safari-arm — the single browser-owning seat this phase (browser-seat singleton honored;
no MCP browser touched). Date: 2026-07-18.

Engine of record: repo-local Playwright 1.61.1, WebKit build webkit-2311,
`browser.version()` = **26.5** (UA `Version/26.5 Safari/605.1.15`), headed, macOS,
DPR 2, ~67Hz VRR display (frame avg 14.7–15.0ms). Playwright-WebKit is the honest desktop
proxy for Safari 2026; everything a proxy cannot see is marked DEVICE-DEFER or TOOL-DEFER
below, never inferred. Prototypes driven via `file://`. Observation was screenshot / video
/ computed-style only — no context was ever taken from a live canvas.

Pass-1 context: every pass-1 verdict was PROVES-IN-CHROME with zero Safari frames against a
Safari-floor task. This pack appends the second engine. Per-claim rows live in each
prototype's PROBE-NOTES.md under "PASS-2 SAFARI ARM"; this file is the roll-up.

---

## 0. Two harness laws, discovered and proven this pass

1. **Playwright `page.screenshot()` is backdrop-filter-BLIND on WebKit.** A 7-anatomy
   isolation page (parent-background vs sibling backdrop, ±border-radius, ±overflow:hidden,
   ±-webkit prefix) paints every chip stone-sharp in screenshots — and every chip fully
   frosted in the video/screencast path. The engine renders; the screenshot pipeline omits
   the pass. Artifacts: `harness-backdrop-blind-sanity.png` (the crashed prior run's sanity,
   now explained) + `harness-backdrop-video-truth.png` (same page, video path). **Every
   material verdict in this pack rides the 25fps VP8 screencast (1280×1000, 1:1 CSS px);
   screenshots serve geometry/light-layer claims only.** Without this law, this arm would
   have false-FAILED every blur claim in the campaign — the live-π/oklab lesson recurring
   in a new organ.
2. **WebKit quantizes `performance.now()` to 1ms.** All µs-scale page meters read 0/1ms
   there; frame-gap statistics are the honest cost readout on this engine.

---

## 1. Family verdicts

### F1 SCALAR-SPINE — PROVES-IN-WEBKIT

Full battery lands: CC open 112/201/599ms ratio 1:3.0; close 172/163/686ms; interrupt
0.64/0.00; pin 84% @83ms, settle 116ms; R2 reversal storm GREEN (max jump 0.227 ≤ 0.30 —
the CSS-follower arm's Safari precondition now holds); R1 natural 0 dropped/180 frames at
40 consumers; clip-path growth holds cadence (max 19ms, 0 >24ms) — residency itself
TOOL-DEFER. Geometry parity with Chrome to the hundredth: +3.74% side breathe, −0.88% pin
squeeze, −6.2%/−17.4% at 83% overpull depth (linear in depth), bottom edge immobile to the
sub-pixel. **H4 answered in paint: the constant-radius scrim blur attenuates smoothly with
element opacity** (gradient/luminance ratio 0.113→0.024 across m 0→1; artifact
`f1-wk-h4-blur-ramp.png`) — the pre-blurred-overlay fallback is unnecessary. Carried
defects, both engine-independent: the G7 PRM scenario() no-op reproduces; the overpull
register passes only its own stale band — MARKS PASS-2 C2 voided 30–50%/≤330ms, so the
shipped (0.40, ζ0.34) fails the corrected corpus register (ζ 0.77–0.88, f_d 1.4–2.0Hz,
overshoot velocity-bought ~1–2%) by construction. The mid-detent cells remain hard-wired
PASS (G3) and C3 removed their corpus instance — data recorded (landed 584ms), gate status:
not a gate.

### F3 CHANNEL-CONDUCTOR — PROVES-IN-WEBKIT

**12/12 battery in live paint on the second engine** (medium t90 67ms, fade 158, geometry
638, ratio 0.248, periphery 130, content-out 162, beat 94 — outside the shown MARKS band,
inside the wider gate: G8 is live in WebKit too — medium-out 630, interrupt 1.0000,
step law-bounded at dt 18ms, park 0 ticks, tempo-invariant 0.256). Depth grading **1.20
exact** again. Stress ×3: 0.14ms conductor JS, 67fps, no nested-backdrop cost cliff.
U10 priced differentially: +240/+960 inheriting consumers halve the achievable VRR cadence
(7.3→14.7ms avg) yet hold ≤18ms worst frame — a 60Hz budget through ~1000 consumers;
recalc ATTRIBUTION stays TOOL-DEFER. **Dishonesty #8 answered in paint: blur rides element
opacity smoothly** (ratio 0.0150→0.0037; artifact `f3-wk-blur-ramp.png`). New paint
exhibit for G4: a held sub-sat scrub (g≈0.10) leaves the medium at g/sat = 0.833 — the
blur visibly thins under a hesitant finger; the release-regime hold is intact. PRM seats
with the tick counter frozen.

### F4 ENERGY-FIELD — PARTIAL (the same shape as Chrome, now cross-engine)

U-LAW/U-FOLD/U-CONT reproduce exactly (regression locks; G4's tautology caveat carried).
Gestures: slow 0.273/no carry; flick 0.816/+9.1px; fling 0.989/**+28.0px carry**
(MARKS 27–32px band, second engine). **U6a: the abs()/max() transform calc COMPUTES in
WebKit** — live matrices during fling and a held drag land exactly on the formula
(scaleY 0.877 at carrier −0.586); the no-masking-fallback risk did not fire. U6b material:
the dock/card glass frosts while transform-modulated (video artifact); the re-raster trace
is TOOL-DEFER. Invalidation asymmetry: non-inheriting write+forced-read 35µs vs 960µs for
an inheriting var over a 500-child subtree — `inherits:false` stays micro-scale on WebKit.
**The scroll finding: WebKit 26.5 fires `scrollend` after every discrete `scrollTop` step
(89/89), killing the channel identically to Chrome; smooth scroll works (one scrollend,
peak 0.999). The U8 debounce-primary cure is cross-engine law**; it remains unapplied in
the prototype (G2 still open) — hence PARTIAL, on both engines, for the same reason.
Periphery τ-tail reproduces (G8's respec need confirmed). PRM pins the field, identity
transform throughout.

### F5 OPTICAL-MEDIUM — the lens core PROVES-IN-WEBKIT; **U1 RED — the shipped gate lies**

- **U1, both forms, the lying-gate question answered:** WebKit 26.5 returns
  `CSS.supports("backdrop-filter", url(…))` = **true** for the fragment form, the shipped
  gate form `url("#glass-refract")`, and the shipped data-URI value (bare and after
  blur(8px)); computed style retains the full composite — **and paint drops the WHOLE
  value**: chip A blur-only frosts (gradient 0.0018) while chips B/C/**D (the verbatim
  shipped value)** paint at bare-background sharpness (0.0748–0.0749 vs baseline 0.0756).
  Fragment vs data-URI do not diverge — both die. Consequence for shipped CSS: on this
  engine the `glass-refract.css` gate ENGAGES, overrides the un-gated blur base, and
  `.glass-lens` paints with **no backdrop filter at all**. That is a live defect against
  glass-ui 7.0.0 on the Safari floor — the gate must become a runtime paint-probe (the
  `supportsCssTimeline`-class harden) or the url() composite must not ship to WebKit.
  Chrome's pass-1 read (full value paints) stands; this is WebKit-only.
- **U3 GREEN on the engine it exists for:** nested control-on-container sampling paints
  distinctly (0.00186 vs 0.00233 — ~20% smoother than the fill-only twin).
- **The blink test, paint-true at last:** a 25fps compositor burst across two full morphs —
  132 painted frames, min lens-presence luminance 0.824, no frame without a lens body —
  plus the stricter wash-excluded computed sampler (min 0.938/0.996/0.966 across 1-slot,
  4-slot, and mid-travel retarget). Goo Arm A applies (`filter: url(#f5-goo)` supported);
  the barbell stays one CONNECTED body throughout. Artifacts: `f5-wk-blink-sheet.png`
  (charge → stretch-bridge → converge → oversized arrival → cool), travel/arrival crops.
- Choreography numbers in band: 1-slot press→settle 1334ms, arrival scale 1.150, hold
  201–203ms; one 26ms long frame during the 4-slot morph, noted.
- **Sibling legibility at bloom peak, first paint-side read:** siblings ≈4.53–5.03:1
  (≥4.5), source-under-lens ~1.9 (not a sibling) — calibrates the analytic 4.7:1 model.
- U2: cliff 104ms, beat 150ms, relax 422ms, 1:4.0, interrupt floor 0.09-never-0;
  constant-radius medium with opacity-only decay confirmed; re-raster trace TOOL-DEFER.
- PRM: teleport with zero intermediate frames, sweep off — but the ~250ms charge-floor
  deferral (G5) reproduces; the PRM branch fix remains unapplied.

### F2 NATIVE-SCROLL (banked) — the two reassigned probes

- **U2-scrollTop: NOT DECIDED → DEVICE-DEFER.** Synthetic wheel carries no momentum phase;
  desktop WebKit never rubber-banded under automation (scrollTop pinned at 0/max across all
  samples, both bounds, element and window scrollers). The MDN unclamped-read claim stays
  paper-only — the decisive arm is a real macOS trackpad / iOS touch device. The bank's
  re-trigger clause is UN-EVALUABLE from desktop automation; the bank holds, neither
  promoted nor retired.
- **U-R1: resample correctness PROVES; threading TOOL-DEFER.** `animation-timeline:
  scroll()` binds on WebKit 26.5; an SDA-driven transform on a backdrop-filter bar maps
  scroll fractions to tx EXACTLY (0/150/300/450/600) and genuinely frosts its backdrop at
  every offset (video-path evidence). Whether it stays threaded under a jammed main thread
  is unobservable here — Playwright's wheel input serializes behind the jam; needs real
  Safari + Instruments. Probe pages + notes now live in `prototypes/f2-native-scroll/`.

---

## 2. Cross-cutting findings, ranked

1. **The shipped `glass-refract.css` gate lies on WebKit 26.5** — @supports true,
   whole-value paint drop, `.glass-lens` loses ALL blur. Cross-repo severity (glass-ui
   7.0.0 ships it); the repair class is known (runtime paint-probe gate). U1 RED.
2. **The scrollend-per-step defect is cross-engine** (89/89 in WebKit as in Chrome) —
   the F4 U8 debounce-primary ruling is promoted to law for every scroll channel in the
   constellation.
3. **The harness is backdrop-blind in screenshots** — any future WebKit paint gate that
   reads Playwright screenshots will false-FAIL blur claims; the video path is the honest
   capture organ, now documented with a paired sanity artifact.
4. **Blur-rides-element-opacity holds on WebKit** (F1 H4, F3 #8, F5 U2 mechanism) — the
   whole medium architecture's cheapest mechanism is safe on the floor engine; no
   pre-blurred-overlay fallbacks needed.
5. **The physics stack is engine-portable to the sub-pixel**: battery numbers, depth
   grading 1.20, carry 28px, geometry breathe/squeeze/compression — Chrome↔WebKit parity
   everywhere it was measured.
6. The engine-independent defects reproduce and remain unapplied: F1 G7 PRM no-op, F5 G5
   PRM charge-floor, F4 G2 scroll cure — all one-line-class fixes named since pass 1.
7. F1's overpull constants now fail the corrected corpus (MARKS C2) on any engine — a
   constants re-fit, not a paint question.

## 3. What this arm could not honestly measure (open, with owners)

- True style-recalc/compositor traces (F1 R1/R5 attribution, F3 U10 attribution, F4 U6b
  re-raster, F5 U2 re-raster): TOOL-DEFER — desktop Safari Web Inspector/Instruments; the
  differential and cadence bounds recorded here are the interim evidence.
- iOS touch rubber-band + unclamped scrollTop (F2 U2), SDA threading under main-thread jam
  (F2 U-R1): DEVICE-DEFER.
- Real-device Safari (iOS) remains undriven for everything above — this arm is the honest
  desktop proxy, stamped as such on every row.

Raw evidence: session scratchpad `safari-arm/` (results/*.json, vids/*.webm, frames/,
analyze scripts); durable artifacts in each prototype directory (`*-wk-*` PNGs, provenance
stamped per family) and the two harness PNGs beside this file.
