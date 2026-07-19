# MARKS-D-SIRI — the V2 Siri read (EXEMPLARS-2, frame-by-frame)

Verified-model: claude-fable-5 (read verbatim from this seat's system context). Seat: V2-SIRI.
Source: `ScreenRecording_07-18-2026 15-11-44_1.MP4`, 1206x2622, 14.235s, 847 frames—true 60fps CFR
(838/845 presentation intervals at 16.7ms; 4 isolated 33ms gaps, 1 at 25ms). Audio: AAC 44.1kHz
stereo, aligned at t=0 with video (both streams start_time 0.000000). The audio track is
digitally silent until 7.27s—the mic was NOT recorded; the 7.27–11.27 speech spans are Siri's
own TTS through the device. That absence governs what the waveform-driver question can honestly
claim (mark 2).

Frames (NEVER in the repo): `scratchpad/exemplars2/V2-SIRI/` under
`/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/`.
Every burst dir carries a t0+fps README. Contracts:

| set | t0 | fps | frames | window |
|---|---|---|---|---|
| survey8 (s-N) | 0.0 | 8 | 114 | whole video; s-N at (N−1)/8 s |
| b60-invoke (f-N) | 1.00 | 60 | 96 | the invocation + orb formation |
| b60-wave (f-N) | 2.60 | 60 | 120 | the waveform + end-of-listening collapse |
| b60-expand (f-N) | 5.20 | 60 | 84 | the results expansion + settle |
| b60-dismiss (f-N) | 12.70 | 60 | 60 | the dismissal |
| crop-rim / crop-orb (r/o-N) | 0.0 | 60 | 854 | full-video cropped traces (rim y880–1000 x150–1050; orb y130–300 x360–845) |

Method: (a) luminance-gradient bottom-edge tracker (median over x150–1050) + dual-threshold
darkening fronts (ghost vs core) + dark-run width tracker at fixed rows; (b) grid-search damped
oscillator fits, linear LSQ for phase/amplitude, brackets at ≤1.15×RMS, critical-damping
alternative always tested (the C2 method); (c) region chroma (max−min RGB) traces for aurora
energy; column-profile cross-correlation for horizontal phase travel; (d) audio RMS per 1/60s
window, cross-correlated raw and detrended. Scripts in the seat dir (`measure.py`, `expand2.py`,
`fit.py`, `waveanal.py`, `rimtts.py`, `final-checks.py`); all quoted px are original video px.
All quantitative claims below are MEASURED unless marked BOUNDED or INCONCLUSIVE; a 60fps read
of a ≤2-frame event is bounded by ±17ms and marked so.

## Scene index

| t (s) | evidence | scene |
|---|---|---|
| 0.00–1.20 | s-001..s-010 | Home Screen at rest; island pill x336–850 (width 514) |
| 1.22–1.45 | b60-invoke | invocation: the island swells and the smoky-glass orb drops out of it, ~215ms |
| 1.45–2.43 | b60-invoke, crop-orb | orb idle-listening; aurora builds inside over ~700ms |
| 2.43–4.38 | b60-wave, crop-orb | the waveform: standing aurora sea, envelope arcs, lull, terminal flare |
| 4.40–4.60 | b60-wave tail | hard aurora cut (≤33ms) + orb collapses into the wide thinking pill |
| 4.60–5.48 | s-037..s-044 | thinking pill x223–982 (width 759, bottom 231), 6-dot sparkle ring at its left, bottom meniscus lit |
| 5.483 | b60-expand f-018 | ONE FRAME: full-size frosted ghost of the panel (translucent, meniscus rim, no content) |
| 5.50–5.98 | b60-expand | the results panel inflates pill→slab, both axes on one spring, overshoot and settle |
| 5.98–12.98 | crop-rim, s-049..s-104 | settled panel (x49–1156, bottom 983); rim flare at data-arrival; autonomous rim breathing; Siri TTS 7.27–11.27 |
| 13.00–13.20 | b60-dismiss | dismissal: text killed first (≤1 frame), glass thins, body retracts into the island |
| 13.47–13.65 | b60-dismiss | island resettles with a ~20px small-side overshoot |
| 13.65–14.23 | s-110..s-114 | rest |

The state chain is a monotone width escalation through four surfaces, every transition
origin-anchored at the island: island 514 → orb (neck ~435, belly ~660 BOUNDED visual) →
thinking pill 759 → panel 1107. Nothing ever slides in from an edge (law 18 CONFIRMED).

---

## Mark 1 — the invocation

Trigger: no touch overlay in frame; assumed side-button (INCONCLUSIVE which input; the red dot
in the island is the screen-recording indicator, present from t=0, not a Siri element).

Timeline (b60-invoke; f-N at 1.00+(N−1)/60):

| t (s) | measure | event |
|---|---|---|
| ≤1.183 | all trackers flat | rest |
| 1.200 | island width 514→508 | first geometry motion |
| 1.233 | diff-extent 165; core lum 9.79→9.09 | the island bottom swells; the black deepens—light and shape move within ≤2 frames of each other |
| 1.233–1.367 | width 489→460→430→425 | the island NARROWS −17.3% while the orb drops out of it—a squeeze |
| 1.233–1.433 | extent 165→432; peak ~4,900px/s at ~1.28 | the orb's drop: 215±17ms flight, smooth deceleration into the landing |
| 1.433 | extent pins at 432 | landed DEAD—no overshoot in the extent scalar at 60fps |
| 1.37–1.50 | width 425→435 | the squeeze relaxes back ~10px (~2%)—a micro-recover, not a bounce |
| 1.57–2.27 | orb chroma 4.3→21.8 | the aurora builds inside the glass over ~700ms—light arrives long after geometry |

Anatomy (montage/invoke-4up, t=1.2167/1.2667/1.3333/1.4333): the birth is TWO NESTED BODIES—the
island's black pill face persists at the top while a smoky translucent belly swells out beneath
it; by 1.33 the belly is a glass bowl with a darker elliptical stage-shadow at its floor; at
1.43 the landed orb REFRACTS the calendar text beneath its lower rim (glyphs visibly bent and
doubled inside the glass) and carries a bright specular arc at bottom-left. Law 13's material
(smoky near-black glass, low backdrop blur, rim refraction, thin white rim highlights):
CONFIRMED in every particular.

Law verdicts:
- **Law 9, damping clause—CONFIRMED for the orb**: the formation lands critically-damped-flat
  (extent pins, zero overshoot at 60fps); the energy display is the aurora build, not bounce.
- **Law 9, light-leads-shape ~80ms—NOT REPRODUCED here**: first luminance move and first
  geometry move sit within ≤33ms of each other, geometry marginally first (1.200 vs 1.233).
  That clause came from island formation in `sr-0624-2144 P1`; the button-invoked orb does not
  show it. Scope the clause to island state-changes, not to Siri invocation. (MEASURED at 60fps.)
- **Law 5, origin anchoring—CONFIRMED**: the orb grows from the island's live frame; the island
  face rides the morph as the orb's own top.
- **NO SCRIM—MEASURED, and it matters**: wallpaper luminance outside the orb during listening:
  −1%, +2%, −1%, 0% across four probe regions vs rest. The orb floats over a fully live,
  undimmed Home Screen (law 18's non-modal clause, now with numbers; contrast CC's −46% dim).

WHAT OURS DOES WITH IT: our invocation is the blob greenfield's birth move played on OUR dock—
the pill face stays put while a warm-cream smoky belly swells from beneath it (two nested
bodies, the island squeeze −17% with the ~2% relax), landing dead in ~215ms as a
`springPreset("orb-drop")` at critical damping. The engagement ramp is the light: our aurora
(our palettes, not Siri's) builds over ~700ms AFTER geometry lands—the component wakes up rather
than popping awake. No scrim ever; the page beneath stays alive and legible—glass, not modal.

## Mark 2 — the waveform visualizer

Anatomy (montage/wave-4up; crop-orb trace): a layered aurora SEA inside the orb's glass
belly—two-to-three chromatic layers (a cyan-white crest, an orange-red under-wave, a blue tail)
that cross and exchange dominance over seconds, clipped by the glass, with a gold hotspot where
crests intersect. It is emphatically not a bar-graph or a scrolling oscilloscope.

The motion register, measured (wave-track.csv, 2.60–4.60; crop-orb full-video):
- **Standing field, not a traveling wave**: median horizontal drift of the chroma column-profile
  between consecutive frames is 0.0px/frame (IQR 0.0..0.0; only 6/119 frames exceed 5px, all at
  large amplitude jumps). The crests inflate and deflate IN PLACE—phase does not scroll.
- **Amplitude is height and saturation together**: chroma mean and active wave height track each
  other through every event (peak chroma 57.6 ↔ height 133–137px; lull chroma 15.4 ↔ height 39).
- **Envelope arcs at 0.5–1.5Hz**: FFT of both chroma and height put the dominant energy at
  0.5–1.0Hz with a 1.5Hz shoulder—prosody-scale swells, peaks at 2.83/3.07/3.30–3.50s.
- **Centroid sway**: the chroma centroid wanders x546–627 (±40px around the orb axis) at ~1.5Hz,
  smooth and slow—the sea leans, it does not dart.
- **The lull floor**: at 3.80–4.00 the field falls to a near-flat filament (chroma 15, height 39)
  but NEVER to zero—a becalmed line persists through the pause.
- **The terminal flare and the cut**: 4.233–4.383, chroma surges to 64 and PINS flat-topped for
  ~150ms (the maximum of the whole session), then dies 64→4.5 in ≤33ms at 4.400—a hard cut, and
  the orb collapses into the thinking pill. The end of listening is a flare, a hold, a cut.

What drives amplitude/phase—the honest verdict:
- **INCONCLUSIVE by correlation**: the recording carries no microphone track (audio RMS is
  digitally zero for the entire listening window), so no direct audio↔visual fit exists in this
  corpus. A re-capture with mic enabled would decide it.
- **BOUNDED as speech-envelope-driven**: the event structure is speech-shaped—activity begins at
  2.43 (right after the aurora finishes building), swells in 0.5–1.5Hz prosody arcs, holds a
  never-zero filament through a mid-utterance pause, and ends with flare→hold→cut exactly where
  an end-of-speech commit belongs (the thinking pill follows immediately).
- **MEASURED, the negative control**: during Siri's own TTS (7.27–11.27) the panel's aurora rim
  does NOT track the speech envelope—detrended max|r|=0.106 across ±400ms of lag. iOS's aurora
  surfaces run AUTONOMOUS breathing when not listening; whatever drives the listening wave, the
  at-rest shimmer is not audio-reactive.

WHAT OURS DOES WITH IT: our visualizer is a standing interference field of two-to-three hue
layers from OUR palettes—amplitude keyed to the live input envelope (WebAudio RMS when a mic
exists; synthetic 0.5–1.5Hz prosody arcs in demos), phase pinned (no scrolling bars—crests
breathe in place with a ±40px lean), a lull FILAMENT as the floor (the component never flatlines;
the breath-of-life edict's literal reading), and the commit gesture kept whole: flare to maximum,
pin ~150ms, hard cut into the next surface. The cut is the one place sharpness is correct—it
means "heard you."

## Mark 3 — the results panel: expanding LIKE A DOCK, downwards

Timeline (b60-expand; f-N at 5.20+(N−1)/60):

| t (s) | bottom y | width @y140 | event |
|---|---|---|---|
| ≤5.467 | 231 | 759 | thinking pill at rest (x223–982), 6-dot sparkle ring, bottom meniscus already lit |
| 5.483 | ~945 | 1102 | ONE FRAME: a full-size frosted GHOST of the panel—translucent (calendar legible through it), meniscus at its bottom rim, zero content. Gone next frame. |
| 5.500 | 251 | 767 | the real inflation starts from the pill's own frame |
| 5.517–5.733 | 307→1015 | 797→1121 | the flight; peak velocity ~4,650px/s (vertical) at ~5.62 |
| 5.750–5.767 | 1017 peak | 1123 peak | BOTH axes peak in the same two frames—overshoot +34px vertical, +16px horizontal |
| 5.783–5.933 | →985 | →1109 | monotone return; text is born BLURRED at ~5.75 (visual: f-034) and condenses |
| 5.983 | 983 | 1107 | settled; no second excursion ≥1px through 6.58 (tail bit-stable at 983±1) |

The spring, fitted (grid over ζ×f_d, LSQ phase/amplitude, eq=983 measured from the tail):

| window | n | ζ | f_d | RMS | bracket (≤1.15×RMS) |
|---|---|---|---|---|---|
| full flight 5.50–5.933 (766px travel) | 27 | 0.71 | 1.75Hz | 4.37px | ζ 0.70–0.72, f_d 1.70–1.80 |
| tail from rest-crossing 5.683 | 16 | 0.69 | 1.80Hz | 0.61px | ζ 0.66–0.73, f_d 1.70–1.85 |
| WIDTH series, same fit | 27 | 0.71 | 1.75Hz | 2.05px | ζ 0.70–0.72, f_d 1.70–1.80 |

Critical damping REJECTED (tail RMS ×3.6 worse). **The register: ζ=0.71 (0.66–0.73), f_d=1.75Hz
(1.70–1.85), f_n≈2.5Hz; overshoot 4.6% of travel vertical, 4.8% horizontal, intrinsic (fired
animation, no gesture to buy it); settle |x|<3px ≈250ms from rest-crossing; onset→settled
≈480ms.** The width fit is bracket-identical to the vertical fit—ONE spring drives a 2D
inflation; the axes never decouple (identical peak frames, identical fractional overshoot).

The channel ladder, measured against law 5's Siri row (geometry < content fade+deblur < aurora
rim +0.5s):

| channel | onset | complete | duration |
|---|---|---|---|
| material ghost pre-pose | 5.483 | 5.500 | 1 frame (17ms)—artifact-vs-intent INCONCLUSIVE at one frame |
| geometry (both axes, one spring) | 5.500 | ~5.98 | 250ms flight + ~230ms settle |
| text: born blurred ~at the geometry peak, condenses | ~5.75 (BOUNDED ±3 frames) | ~5.97 | ~190ms sharpen+brighten ramp |
| weather card materialize | 5.72 | ~6.00 | ~280ms |
| card data/tint upgrade (in place, no reflow) | 6.32 | 6.53 | ~200ms—law 17's late-upgrade, seen live |
| aurora rim stage 1: ramp to plateau 20 | ~5.78 | ~6.00 | rim rides the traveling edge from ~5.62 (chroma 18.8 mid-flight) |
| aurora rim stage 2: FLARE to 42 (2.1× plateau) | 6.33 | peak 6.50, decays after | coincident with the data upgrade—light celebrates the data |

At rest the rim breathes autonomously: mean 37.4, ±18% (std 6.55), a ~2.3Hz shimmer over slower
drifts, uncorrelated with the TTS playing over it (mark 2's negative control). The settled
panel's bottom edge REFRACTS the widget title beneath it ("Son of Toast" reads warped under the
meniscus)—the rim is a lens, not a stroke (law 3's caustic, at panel scale).

Background: NO dim change at any point of the expansion (probe regions ±2%)—the panel's focus
is carried entirely by its own dark mass and the rim, never by a scrim. Non-modal throughout.

Law verdicts:
- **The dock claim—CONFIRMED, with the constants**: the panel is a top-anchored dock. Pill→slab
  inflation, origin-anchored at the island, fixed top inset with the bottom edge doing the
  travel, chrome/content pre-composed at final layout and revealed (the blurred-text birth is
  law 5's "revealed, not reflowed," photographed). Its f_d 1.70–1.85Hz sits in the same family
  as `springPreset("dock")` (0.30, ζ0.82 ⇒ f_d 1.91Hz) and the C2 Maps register (f_d 1.4–2.0Hz):
  ONE arrival-frequency family across iOS's dock-like surfaces. The ζ differs by intent: 0.82
  gesture-landed dock, 0.80 flung sheet, 0.71 fired presentation—the fired morph is deliberately
  livelier (4.7% intrinsic overshoot vs C2's velocity-bought 1–2%). Law 16's ~250ms re-expand
  clock matches the 250ms flight.
- **Law 9 staged-axis—REFINED (and its generalization CONTRADICTED)**: the pill→panel morph does
  NOT stage x then y—both axes run one spring in locked phase, and width overshoots 4.8% where
  law 9's orb→pill claims "no width overshoot—critically damped." The staging law is real but
  it lives ACROSS CHANNELS (ghost → geometry → text-deblur → card data → rim flare), not across
  spatial axes; and the critically-damped register belongs to the ORB grammar (mark 1 confirmed
  it there), while the panel grammar is underdamped. Two surfaces, two registers—the codex
  should say so explicitly.
- **Law 5 detuned channels—CONFIRMED and quantified**: geometry 250ms < text ~190ms starting at
  the peak < rim full arrival +0.5s (stage 1) and +0.85s (the flare). Equal timings would kill
  exactly what makes this read alive.
- **Law 17—CONFIRMED live**: the weather card lands as a skeleton and upgrades in place ~600ms
  later; the rim flare marks the moment.
- **Law 8's exit half + law 15 (the dismissal, b60-dismiss)—CONFIRMED**: text killed FIRST
  (mass 0.1223→0.0000 across one frame boundary at 13.00; fade ≤50ms BOUNDED by thresholding),
  the glass THINS (mid-collapse frame shows calendar text through the panel body) while the
  body retracts 983→~231 in ~150ms, ACCELERATING into the island (1.1k→8k px/s)—a
  fire-and-forget close, never a reverse scrub. The cooled meniscus rides the collapsing edge,
  refracting the "Calendar" label in transit. The island then resettles with a ~20px
  small-side overshoot recovered over ~180ms (13.47→13.65). Open 480ms, close ~200ms visible:
  the entry/exit asymmetry, measured.

WHAT OURS DOES WITH IT: this mark is a gift to the dock greenfield—the panel IS a dock in the
grammar our facilities already speak, so we build it from the dock's own state machine: a new
top-anchored expand state on the single-scalar engine, `ζ0.71/f_d1.75` as a shipped
`springPreset("panel")` beside DOCK_SPRING (same frequency family, softer damping—the fired-
presentation register), both axes on ONE scalar (never two springs), 4–5% intrinsic overshoot.
The channel ladder becomes choreography-API rows: geometry → text born-blurred condensing
~190ms → data upgrade in place → rim flare celebrating it (+0.5s/+0.85s), with our warm-cream
glass and our aurora tokens on the meniscus—a living rim that breathes ±18% at rest (suffusion
scalar territory) and flares on data arrival. We skip iOS's one-frame ghost pre-pose (compositor
artifact or not, it is invisible at speed and worthless to clone) and we keep the two honest
sharp edges: the text kill on dismissal and nothing else. Zero scrim—our panel, like our orb,
floats non-modally over live content; the world beneath keeps breathing.

---

## Corrections risk register (what could overturn these reads)

- The 5.483 ghost is a single 60fps frame: intent vs CoreAnimation pre-pose flash is undecidable
  at one sample; a second capture of any Siri result would settle it.
- The text-kill "≤17ms" is a thresholded measure (>140 lum); a 2–3 frame steep fade reads the
  same. Bounded at ≤50ms, stated so.
- The invoke extent tracker includes the orb's soft shadow; the orb-bottom landing value (432)
  is a diff-extent, not a glass-edge coordinate—the 215ms flight time and dead landing are
  robust, the terminal coordinate is BOUNDED (glass belly bottom ~420–500 by visual).
- No claim in this doc rests on a 12fps read; every register quoted was fitted or bounded at
  60fps. The mic absence is stated wherever it bites.

---

## VERIFICATION — the independent re-derivation (seat resumed, 2026-07-18)

Verified-model: claude-fable-5. The seat resumed with the doc complete on disk; per the MARKS.md
precedent the load-bearing claims were re-derived from the raw CSVs and frames with fresh code
(not `fit.py`), and the frame ladders re-inventoried. Corrections are ADDITIVE—the sections
above stand as measured history; what is voided is quoted.

**Inventory + provenance.** All six ladder sets present at the contracted counts with t0+fps
READMEs (survey8 114, b60-invoke 96, b60-wave 120, b60-expand 84, b60-dismiss 60, crop-rim/orb
854 each). PTS census correction to the header line: 846 intervals = 838×16.7ms + 4×33.3ms
(one at t=2.967, three at 4.267–4.367) + 2×25ms (1.267, 1.292) + 1×66.7ms (0.65, at rest,
harmless) + 1×18.3ms. ~~"4 isolated 33ms gaps, 1 at 25ms"~~ read as above. Audio re-checked:
digitally silent until 7.25–7.27s. Background probes re-run: bg swing 0.18% across the whole
expansion, flat 97.6 through the dismissal—the no-scrim claims stand with numbers re-derived.

**Mark 3 register: STANDS.** Independent grid-fit against `expand-track.csv` with eq=982.9
re-measured from `expand-tail.csv` (the main tracker demonstrably re-latches to an interior
content edge at 5.95—616 is not a panel edge; the two trackers agree frame-for-frame through
the descent): full flight ζ=0.71, f_d=1.75Hz, RMS 4.49px (bracket 0.70–0.72 / 1.65–1.80);
tail ζ=0.74, f_d=1.70, RMS 0.78px (bracket 0.70–0.79 / 1.6–1.8); width ζ=0.71, f_d=1.70,
RMS 2.03px (bracket identical to vertical). Critical damping rejected ×2.5 on the tail.
Overshoot +34.1px vertical (4.5%), +16px width (4.7%), same peak frames; settle 233ms from
the 5.70 crossing. All inside the published brackets. The ghost is EXACTLY one frame:
f-017 vs f-019 mean |Δlum| 0.82 (1% of px >20) while f-018 differs from both at mean ~12.9
(21% of px >20); visual re-read confirms the anatomy (opaque-smoke top, translucent lower
half with the calendar legible through it, lit meniscus, no content, thinking pill absent).

**CORRECTION D1 — the flight's peak velocity.** ~~"peak velocity ~4,650px/s (vertical) at
~5.62"~~ is not reproducible from the cited series: raw single-frame max is 7,229px/s across
5.5167→5.5333 (120px in one frame), and the fitted spring's model peak is 5,734px/s at
t≈5.54. The flight is front-loaded—peak velocity sits in the first ~2 frames after launch,
not mid-flight. No register or law verdict changes.

**Mark 1: STANDS, two refinements.** Re-derived: first geometry motion 1.200, squeeze −17.3%
at 1.3667, relax to ~433–435, extent pinned at 432 from 1.4167 with zero overshoot, chroma
3.8→21.7 across 1.5→2.35. (a) Two 25ms source gaps sit inside the flight window (1.267,
1.292)—one duplicated grid frame—so the 215ms flight carries ±33ms honesty, not ±17ms.
(b) The invoke-track discontinuity at 1.5667 (extent 432→641, width 435→775 in one frame,
then frozen) is NOT orb motion: spatial diff shows a 1px whole-field nudge of the Home Screen
(no dim—mean Δlum ≈0; no scale—icon edge x-positions identical) that pushed the diff/dark-run
thresholds far along the halo's shallow gradients. Tracker artifact; the dead landing stands
(bit-static 432 through 1.55 on real frames).

**Mark 2: STANDS, flare anatomy refined.** Lull floor re-read at chroma 15.4 / height 39,
never zero. The terminal flare decomposes: surge 26→64 in ~50–67ms (4.200→4.267), flat-top
HOLD at 64.0 for ~117ms (4.267–4.383), cut 63.4→4.5 across ONE frame boundary at 4.400
(≤17ms—tighter than the stated ≤33ms). ~~"pins flat-topped for ~150ms"~~ reads as
surge+hold ≈167ms, hold alone ≈117ms. The three 33ms source drops sit exactly inside the
hold—screen recorders drop frames when content is static, which corroborates (not proves) a
genuinely held frame. TTS negative control re-derived: detrended max|r|=0.126 over ±400ms
lags (vs 0.106 stated—different detrend window, same verdict: the at-rest rim is not
audio-reactive).

**Mark 3 dismissal: STANDS.** text_mass →0 across one frame boundary BEFORE any body motion;
retraction 980→257 in ~133ms with per-frame velocities 1.1k→8.0k px/s, accelerating into the
island (a tracker mislatch triple at 13.183–13.217 excluded—it re-reports an interior edge,
same pathology as the 5.95 re-latch, recognized and discarded).
