# MOTION-LADDER — the measured iOS-27 timing table (BI · A-MOTION)

The UF-P8 frame-by-frame re-examination of the reference corpus, MOTION axis: every
enter/exit/detent/bloom gesture in the three charter videos measured to the frame,
then bound to the library's motion registers with the deltas D-MOTION calibrates
against. Numbers, not vibes — every claim carries a frame ref.

## 0. Corpus + method

| Key | Source (corpus root `…/New Folder With Items 4/`) | Container | Content rate | Duration |
|---|---|---|---|---|
| **A** | `ScreenRecording_06-22-2026 23-59-33_1.MP4` — home → Control Center ×2 (incl. a canceled pull) → Maps launch → Maps bottom-sheet detent cycle → app close | 120 fps 1206×2622 | **60 Hz** (every frame duplicated — verified: all tracked positions come in identical pairs) | 12.2 s |
| **B** | `ScreenRecording_06-24-2026 21-44-31_1.MP4` — YouTube + comments → Siri engage → Siri results panel → notification capsules ×3 → Control Center | 60 fps | 60 Hz | 22.8 s |
| **C** | `ScreenRecording_06-24-2026 22-07-29_1.MP4` — dark home → notification capsule ×2 → Spotlight materialize/dismiss ×2 → Control Center | 60 fps | 60 Hz | 12.5 s |

Method: 2 fps contact sheets to inventory gestures → native-rate bursts per gesture
window (half-res 603×1311 grayscale for metrics) → three numeric instruments over
the burst frames (numpy): (1) **template-correlation tracking** of a landmark band
(the Maps search pill) → per-frame y-position; (2) **frame-differencing vs a
pre-gesture reference** → appearing-element bbox (capsule width/height/area);
(3) **region luminance + gradient energy** → dim/opacity curves and blur
onset/release (gradient energy collapses under backdrop blur). Gesture windows
named `g1…g14`; frame refs below are `g<N>/f-<idx>` (window start + idx/rate =
absolute time). Scratch frames:
`/private/tmp/claude-504/…/scratchpad/ios27-frames/a-motion/` (session-local).
Quantization: ±1 content frame ≈ ±17 ms.

---

## 1. The measured gestures

### 1.1 Maps bottom-sheet detent cycle (video A, g5 = 7.00–11.80 s, tracked via the search-pill template)

Pill rest positions (half-res px): half = y938 · peek = y1244 · full = y307.
Screen height 1311 → the peek↔full travel is **937 px = 71% of the screen**.

| Segment | Frames (g5, 120 fps idx) | What it is | Measured |
|---|---|---|---|
| S1 half→peek | f153–f217 | **Finger drag** (near-constant ~9–12 px/2f velocity — not an animation) | drag ≈ 533 ms; release tail ≤ 50 ms (f211 y1206 → f215 y1240 → f217 y1244), **no overshoot** |
| **S2 peek→full fling** | release ≈ f319 (t≈9.66 s), track f321 y1172 → f349–351 y291 (peak) → f373+ y307 (rest) | **The detent snap, fling-seeded** — the headline motion | travel 937 px · first tracked step 129 px/2f (velocity continuity: the spring inherits the fling v₀, no re-start) · **t90 = 17 f = 142 ms** · first settle-touch 200 ms · **overshoot 16 px = 1.7%** (peak at ~250–265 ms) · 2%-band settle **183 ms** · then a **~200 ms relax-back** (291→307 over f351–f373) · full visual rest ≈ 450 ms |
| S3 full→peek dismiss | from rest f429 (t≈10.57 s) → f447 y1222; steps 135,139,140,141,121,96,80,63 px/2f | **From-rest detent snap** (tap-dismiss) | travel 937 px · S-shaped velocity (accel→decel, spring-from-rest) · **t90 = 16 f ≈ 133 ms** · arrival ≈ 150–200 ms · no visible overshoot (tail occluded, ≤~2%) |
| Scrim | map-top region luma 81→46–48 during S2 (f320–f340); un-dim 48→81 during S3 (f432–f456) | **Fraction-coupled dim** | dims on the SAME clock as the translate — 87% of the dim lands within 133 ms of release — and **tracks the overshoot ripple** (luma dips 46 → rebounds 52–53 → settles 48 in lockstep with the y-overshoot); un-dim completes ~225–260 ms (trails the drop's t90 by ~80 ms) |

**Spring fit (S2/S3):** underdamped, ζ ≈ 0.8, damped period ≈ 516 ms →
**response ≈ 0.30–0.35 s, dampingFraction ≈ 0.80**. Validation: a real-time
`SpringProgress` at (0.31, 0.80) gives t90 150 ms · peak +1.5% @258 ms ·
2%-settle 192 ms — matching the measured 133–142 / 1.7% / 183 ms almost exactly.

### 1.2 Notification capsule enter/exit (videos B + C — the T14 reference)

Frame-differenced capsule bbox, 60 Hz.

**Enter — `g6` "My Home" over the static Siri panel (onset f34, abs ≈ 7.47 s):**

| Channel | Curve (frame:value) | Milestones |
|---|---|---|
| Width (65→584 px) | f34:65 · f40:177 · f44:288 (50%) · f50:430 · f56:520 (**90% @ 22.5 f = 375 ms**) · f60:554 · f69:584 | t50 = 170 ms · t75 = 275 ms · **t90 = 375 ms** · asymptotic (the last 10% takes ~200 ms) · **width overshoot: none** (monotone) |
| Height (11→99 px) | born at its CENTER row (~y130) and grows BOTH ways | t90 ≈ 250 ms; top edge overshoots ~3 px (89 → settles 92–93, f56→f62) ≈ 3% of capsule height — sub-perceptual |
| Luma (body fade-in) | 9→28, 90% at f53–56 | ≈ 320–370 ms, co-onset with scale |
| Blur decongest (grad) | dips 8.2→5.3 mid-enter (f47–52 — the capsule IS blurred in flight), sharp by f60–62 | text decongest **trails the scale settle by ~50–80 ms**, done ≈ 430 ms |

The capsule is **born as a small frosted seed at its own center** (~11% of final
width visible at onset, heavily blurred, translucent) and blooms outward — scale +
fade + blur are coupled from the first frame. Corroboration `g10` (video C, bright
blurred-home backdrop, onset f21 abs ≈ 0.85 s): width 161→524, t90 ≈ 275–330 ms,
monotone, no overshoot. `g8` (video B #3, onset f19 abs ≈ 16.12 s): luma t90 ≈
170–183 ms (lower bound; busy backdrop).

**Fit:** a **gentle-class spring** — velocity peaks ~150 ms after onset, no
overshoot → response ≈ 0.6–0.8 s, ζ ≈ 0.85–1.0.

**Exit (swipe/auto):**

| Instance | Frames | Measured |
|---|---|---|
| `g6` f90→f97 | bottom edge 192→41 in 6 f; area→0 at f97 | **≈ 100–117 ms**: translate-up ~its own height + shrink + fade + re-congest (blur returns f66–67-style), monotone, **no overshoot** |
| `g10` f63→f70 | area 53k→backdrop-floor | **≈ 117 ms**, same shape |

Enter : exit ≈ **3.4 : 1**.

### 1.3 Control Center engage/dismiss (A g1 g2 g3 @120-container, C g14, B g9 @60)

| Phase | Evidence | Measured |
|---|---|---|
| **Backdrop blur+dim ENGAGE** (flick-open) | g1: backdrop grad 5.3→1.0 f55→f61; g14: grad 6.4→0.6 f60→f66, luma 90% at f64 | **50–100 ms to full blur depth** — near-instant on a flick; the dim then deepens progressively to its floor over ~300 ms as the layer seats (g1 luma 64→32 by f91) |
| **Module plates materialize** | g1 filmstrip f059–f075: the ENTIRE CC layer appears at once as a blurred translucent ghost (~0.93–0.95 scale) that decongests + solidifies | plates ≈ **130–200 ms**; glyph/detail sharpness trails to ≈ 300–370 ms (g1 tl-grad settles f91–99; g14 f80–82) — **no strong per-module stagger** at 60 Hz granularity, and no visible >2–3% scale overshoot: it is a MATERIALIZE (blur+fade+slight scale), not a bouncy squish |
| **Dismiss: module dissolve** | g2: tl modules gone f85→f91; center f97→f105 | **50–90 ms** fade+congest, with a small top-first stagger (~50–70 ms tl→mid) |
| **Dismiss: blur RELEASE** | g2 backdrop grad 0.5→4.8 luma 36→64, f89→f125; corroborated g4 f21–f43 | **≈ 280–300 ms** smooth ramp — the un-blur deliberately TRAILS the module dissolve ~3–4× |
| **Canceled pull (rubber-band)** | g3 @15 fps: engage t≈3.53–3.67, release t≈3.73–4.00 | partial engage ≈ 130 ms → cancel releases over ≈ 270 ms with no discontinuity — the engage/release asymmetry holds even on a cancel |

**The blur asymmetry: engage fast (50–100 ms) · release slow (250–300 ms)** — the
inverse of the surface asymmetry (enter slow, exit fast).

### 1.4 Spotlight materialize/dismiss (video C, g11 = 2.20 s+, g12 = 5.00 s+)

| Piece | Frames | Measured |
|---|---|---|
| Backdrop blur (open) | icons grad 8.5→2.0, f24→f73 | **gesture-COUPLED** — tracks the pull-down drag (~780 ms total incl. drag); post-release completion ~330 ms |
| Search pill materialize | pill-zone luma 46→77, f27→f45 | ≈ **300 ms** plate bloom |
| Keyboard rise | kbd-zone f30→f46 | ≈ **267 ms** |
| Suggestion grid pop | icons grad 5.5→11.6, f100→f116 | ≈ **267 ms** (content-deferred — pops ~1 s after the pill, when results are ready) |
| Dismiss | g12: initiate f50; un-blur core f63→f69; settled f76 | un-blur **≈ 100–130 ms** (a fast release after the swipe — unlike CC's slow 300 ms release, a *dismissed-to-work* surface clears fast); total incl. keyboard drop ≈ 430 ms |

### 1.5 App-launch zoom (video A, g4, onset f67 abs ≈ 6.52 s — the icon→app bloom, the T5 sheet-bloom cousin)

Center of screen covered in 4 f ≈ **67 ms**; corners (the zoom's last reach) at
f80–82 ≈ **230 ms**. Corner-luma decel curve 104,99,90,78,72,68,64,59,54,50,46,44,
42,41,40 — smooth deceleration, **no overshoot** (arrival-class). App UI paints in
+250 ms after cover. Total icon→fullscreen ≈ **230–270 ms**.

---

## 2. The iOS TIMING TABLE (consolidated)

| Gesture class | t90 travel | Full settle | Overshoot | Coupling |
|---|---|---|---|---|
| Detent snap (fling-seeded) | **142 ms** | 183 ms (2% band) + 200 ms relax-back tail | **1.7%** | scrim on the same scalar, tracks overshoot |
| Detent snap (from rest) | **133 ms** | ~200 ms + tail | ≤2% | same |
| Notification/capsule bloom (enter-transient) | **300–375 ms** | ~430 ms | **0%** (≤3% edge-level) | scale+fade+blur co-onset; blur trails settle ≤80 ms |
| Overlay-layer materialize (CC) | plates 130–200 ms | detail ≈ 300–370 ms | ≤2–3% | backdrop blur leads (50–100 ms), layer rides on top |
| Utility panel/keyboard (Spotlight) | ~267–300 ms | — | 0% | backdrop gesture-coupled |
| App-zoom (container FLIP) | ~150 ms (center) | 230–270 ms | 0% | decelerating arrival |
| **Exit — capsule/notification** | — | **100–117 ms** | 0% | translate+shrink+fade+re-congest together |
| **Exit — module dissolve** | — | **50–90 ms** | 0% | slight top-first stagger |
| Backdrop blur ENGAGE | — | **50–100 ms** (flick) / gesture-coupled (drag) | — | leads the layer |
| Backdrop blur RELEASE | — | **250–300 ms** | — | trails the dissolve 3–4× |
| Spotlight dismiss un-blur | — | **100–130 ms** | — | fast release-to-work |
| Scrim/dim | — | same clock as the driving translate | tracks the overshoot ripple | fraction-coupled, never an independent clock |

**Spring identities measured:** detent = (response ≈ 0.31, ζ ≈ 0.80) ·
transient bloom = (response ≈ 0.6–0.8, ζ ≈ 0.85–1.0) · exits = ~110 ms
no-overshoot ease-out class · nothing in this corpus exceeds **1.7% measured
overshoot** at the whole-surface level.

## 3. The SMOOTHNESS verdict — what makes it read smooth, as testable properties

- **P1 — No dead frames.** Every gesture paints continuous change at 60 Hz from
  onset to rest; there is no idle span inside a running motion. (Testable: per-frame
  diff-energy > 0 across the whole clock.)
- **P2 — Velocity continuity at release/interrupt.** The detent spring inherits the
  fling v₀ (S2's first post-release step is already 129 px/2f — no restart ramp);
  the canceled CC pull rubber-bands back with no velocity discontinuity (g3).
  (Testable: no sign of a second accel phase at handoff.)
- **P3 — One drive scalar, coupled channels.** Scrim/dim/blur track the driving
  translate on the SAME clock — the Maps scrim even reproduces the sheet's 1.7%
  overshoot as a luma ripple (g5 f344–352). (Testable: cross-correlation of channel
  curves ≈ 1 with lag ≈ 0.)
- **P4 — The sub-perceptual tail.** After the 2%-band arrival there is a 150–250 ms
  sub-pixel creep (S2's 16 px relax-back over 200 ms; n1's last 10% of width over
  200 ms). Motion never *clicks* to a stop — this IS the weight read. (Testable:
  non-zero but sub-2%/frame displacement after the band entry.)
- **P5 — Overshoot discipline.** System spatial surfaces live at 0–2% (detent 1.7%,
  bloom 0%, edges ≤3%); **exits never overshoot** and never bounce. (Testable:
  peak-past-settle / travel.)
- **P6 — Asymmetry as rhythm.** Surface enter : exit ≈ 3 : 1 (375 vs 110 ms
  capsule; 200–300 vs 50–90 ms CC modules). Blur engage : release ≈ 1 : 3 — the
  inverse. Focus arrives with ceremony and leaves instantly; the veil snaps on and
  lifts gently. (Testable: the two ratios.)
- **P7 — Blur trails, never leads, on surfaces.** The decongest settles ≤80 ms
  after the spatial channel (n1 grad vs luma); on the BACKDROP the blur *leads* the
  layer (CC engage 50–100 ms before the plates seat). (Testable: channel-milestone
  ordering.)

## 4. Prior corrections (the BD-era analyses, re-verified at 60 Hz)

| BD prior (IOS27-REFERENCE.md / v-audits) | Verdict | Correction |
|---|---|---|
| **T14** — notification exit "fast fade-slide-out, ≤~40 ms / GONE in one frame" (v2 f001→f002) | **WRONG (aliased)** | The exit is **100–117 ms (6–8 frames @60)** — translate-up + shrink + fade + re-congest. The BD read was a coarse-cadence alias. The ENTER is also mischaracterized by "`.glass-reveal` at parity": iOS blooms from a **center seed (~11% width, heavily blurred)** on a **gentle-class** spring (t90 300–375 ms, 0% overshoot) — not a snappy scale-from-0.88. |
| **T6** — drawer opaque-at-full: "spring `DRAWER_SNAP {response:0.4, ζ:0.82}` = the heavier low-overshoot register the clip shows — ALIGNED" | **PARTLY WRONG (numbers)** | Measured iOS detent = **(≈0.31, ≈0.80), t90 133–142 ms, 1.7% overshoot, 183 ms 2%-settle**. HEAD's `DRAWER_SNAP` is now `{0.5, 0.74}` (drawer/constants.ts:27) → real-time t90 **225 ms, +3.2%** — ~60% slower and ~2× bouncier than the reference. The scrim-coupling claim is CONFIRMED and sharpened: the scrim tracks the snap fraction *including the overshoot ripple*. |
| **T10** — liquid entrance "modules squish-grow ≈0.88 vol-preserving + spring overshoot" | **PARTLY WRONG (shape)** | The CC layer materializes as ONE blurred ghost at ~0.93–0.95 scale that decongests + solidifies (plates 130–200 ms, detail ≈300–370 ms). The dominant channels are **blur + fade**, the scale change is subtle, and no >2–3% overshoot is visible. The 0.88-squish grammar over-rotates the scale channel and under-rotates the blur channel for the overlay-layer case. (The 0.88 read may hold for the liquid-video *control* entrances — out of this corpus.) |
| **T5** — album/sheet bloom + live-behind | **CONFIRMED + quantified** | App-zoom (the container FLIP) = 230–270 ms decelerating, 0 overshoot; sheet co-existence + fraction-coupled scrim measured (§1.1). |
| **T9** — backdrop-blur engage "ramps with the sheet translate" | **CONFIRMED + asymmetry found** | Engage 50–100 ms (flick) or gesture-coupled (drag); **release 250–300 ms** — an asymmetric pair the wave spec must encode (a symmetric ramp reads wrong on close). Cancel rubber-band: engage ~130 ms, release ~270 ms. |

## 5. Library binding — measured iOS vs glass-ui current, and THE PARITY BREAK

### 5.1 The parity break (the single biggest finding)

The library's six named springs exist in TWO time bases that disagree ~5×:

| Preset (response, ζ) | **CSS painted** (emitted `linear()` × its `--spring-*-duration` clock — what every `transition` paints; verified against both `scheme-spring.css` stops and the kf `springTimingFunction` twin) | **JS real-time** (`SpringProgress.tickDt(ms)` — what drawer/dock/JS morphs paint) |
|---|---|---|
| smooth (0.58, 0.80) · 450 ms clock | t90 **54 ms** (11.9% of clock) · peak +1.5% @92 ms · motion dead-flat from ~180 ms | t90 **283 ms** · peak @483 ms · settle 350 ms |
| snappy (0.48, 0.74) · 400 ms | t90 **44 ms** · peak +3.2% @75 ms · flat from ~180 ms | t90 **217 ms** · peak @358 ms · settle 450 ms |
| bouncy (0.60, 0.60) · 620 ms | t90 **58 ms** · peak +9.5% @97 ms | — |
| gentle (0.82, 1.00) · 510 ms | t90 **79 ms** | t90 **508 ms** · settle 767 ms |
| dock (0.68, 0.64) · 660 ms | t90 **65 ms** · peak +7.3% @103 ms | t90 **267 ms** · peak @442 ms · settle 650 ms |
| press (0.20, 0.80) · 160 ms | t90 **19 ms** | t90 **100 ms** · settle 125 ms |

The CSS emission front-loads the whole travel into the first ~10–16% of the clock —
the same (response, ζ) pair paints **~5× faster** via the `linear()` token than via
the live integrator, and the springPresets.ts tune fences ("t90 ∈ [50%,61%] of
clock") do NOT hold on the emitted curves. Consequence: every CSS-driven enter
(`.glass-reveal`, page-build, icon-chip reveal, tab glide when CSS-clocked) paints
a **mechanical ~50 ms pop followed by a 300+ ms dead-flat tail** — the exact
opposite of the BD.W-ANIM-IOS27-TUNE intent, and the plausible root of the user's
"animations feel off" read. The (response, ζ) TABLE itself is nearly right (see
5.2) — the defect is in the emission/normalization, so **the fix is the
`regen-spring-tokens.mjs` time base (or the springTimingFunction convention), not
another preset retune.**

### 5.2 Register deltas (the D-MOTION calibration inputs)

| Library register (BI PASS-1 vocabulary) | Library current (painted) | iOS measured | Delta → calibration |
|---|---|---|---|
| `enter-overlay` (`.glass-reveal` default: snappy curve, 400 ms clock, scale-from 0.88, blur 4 px) | t90 **44 ms**, then flat | CC layer 130–200 ms plates / Siri panel + pill ~300 ms; nothing overlay-class arrives faster than ~130 ms | **3–7× too early.** Time-faithful emission puts snappy t90 ≈ 200 ms on its own clock — inside the iOS overlay band. Keep the 400 ms clock; fix the curve. Blur channel is under-weighted vs iOS (the CC ghost is *heavily* blurred at birth — consider blur-from 6–10 px on overlay-class). |
| `enter-transient` / toast-notification | same snappy 400 ms recipe | **gentle-class bloom**: t90 300–375 ms, 0% overshoot, born ~0.4–0.6 scale (visible seed ~0.11 width) at its own center, heavy blur, asymptotic tail | Bind Toast/Notification enter to the **gentle** family, deeper scale-from (~0.5) + heavier blur; target t90 ≈ 300–350 ms. A response 0.6–0.7 / ζ 0.85–0.95 row fits better than gentle's 0.82/1.0 (runtime t90 508 ms — a touch slow). |
| `enter-menu` (utility whisper) | proposed smooth ×0.8 | closest corpus analog: Spotlight suggestion-grid pop ≈ 267 ms | pass-2 seed: t90 ≈ 180–250 ms, 0–1.5% overshoot. |
| `exit` (reveal exit keyframe: `--ease-out` cubic-bezier(0,0,0.2,1) @ `--duration-fast` 200 ms) | completes 200 ms, t90 ≈ 120 ms | capsule exit **100–117 ms**, CC dissolve **50–90 ms**, Spotlight un-blur ~100–130 ms — iOS exits COMPLETE where ours reaches t90 | **Tighten the exit clock 200 → ~140–160 ms** (overlay) and ~90–110 ms for small transients. Keep 0 overshoot. This + 5.1 is most of the "tighter, responsive" ask. |
| `detent` (drawer `DRAWER_SNAP {0.5, 0.74}` via `useDrawerSnap`) | t90 225 ms · +3.2% @375 ms · settle 467 ms | **(≈0.31, 0.80)**: t90 133–142 ms · +1.7% @~260 ms · settle 183 ms + 200 ms micro-tail | **Retune `DRAWER_SNAP` → response ≈ 0.32, ζ ≈ 0.80.** Keep the fling-v₀ seeding (already correct — the interruptible contract is exactly what S2 shows). |
| `morph`/dock (`DOCK_SPRING` = springPreset("dock") (0.68, 0.64)) | JS t90 267 ms · **+7.3%** | no dock morph in THIS corpus; but the corpus-wide surface ceiling is **1.7% measured overshoot** | Flag for D-MOTION against the v3 dock video: 7.3% is 4× the measured system ceiling; iOS-27 reads weight through the TAIL (P4), not through bounce amplitude. |
| `press` (0.20, 0.80) | JS t90 100 ms, CSS-painted 19 ms | no clean press close-up in corpus (sub-200 ms window plausible from control responses) | keep JS; fix CSS emission (5.1). |
| backdrop-engage (T9 wave, unminted) | — | **engage 50–100 ms / release 250–300 ms, gesture-coupled under drag; cancel releases ~270 ms** | mint as an ASYMMETRIC pair, never one duration both ways. |
| scrim | independent recipe clocks | fraction-coupled to the driving translate, reproduces its overshoot | scrim/dim must read the SAME drive scalar as the surface (`--glass-drawer-t` precedent), never a parallel `transition`. |
| app-zoom (`expandable-container` / spa-view class) | — | 230–270 ms decelerating, 0 overshoot | arrival-class (`--ease-out-expo`/high-ζ), ~250 ms. |
| `--motion-tempo` G3 (1.0 vs 0.88 seed) | open gap | iOS is *slower-arriving* than our painted enters and *faster* than our exits — a global 0.88 tighten would push the enters even further from the reference | **Seed tempo = 1.0 (identity).** The "tighter" feel the user wants comes from (a) the 5.1 parity fix, (b) the exit tighten, (c) the detent retune — not a global clock scale. |

**The direct answer to "does the REAL iOS read tighter or weightier than our
current registers?" — both, on different legs:** iOS ENTERS are **weightier**
(t90 130–375 ms vs our painted 44–79 ms; blur-led materialize; 150–250 ms
sub-pixel tails) while iOS EXITS and DETENTS are **tighter** (exits 50–120 ms vs
our 200 ms; detent (0.31, 0.80) vs our (0.5, 0.74) ≈ 40% faster with HALF the
bounce). glass-ui at HEAD is simultaneously too sharp on enter and too slack on
exit — the tempo problem is a SHAPE problem, not a scalar.

## 6. Open unknowns

- Why the kf `springTimingFunction`/`springLinearStops` time base is ~5×
  compressed vs `SpringProgress` for the same (response, ζ) — kf 5.x convention or
  regen pairing bug; needs a keyframes.js-side look before re-emitting tokens
  (cross-repo ask, foreign-tree fence).
- Whether `SpringProgress`-driven surfaces at HEAD (drawer, dock) also read wrong
  in live paint, or only the CSS-clocked ones — the BD Pass-E paint audits suggest
  the JS morphs read plausibly; a live A/B after the 5.1 fix should re-verify.
- Dock morph + goo-fission timing (T1/T2) — not in this corpus; the v3 video
  (`ScreenRecording_06-20-2026 18-47-21_1.MP4` era) needs the same kymograph
  treatment before touching `DOCK_SPRING`'s +7.3%.
- Press-register ground truth — no button-press close-up in these three videos.
- Video-encoder confound: "detail sharpening" tails (CC glyphs ~300–370 ms) may be
  partially screen-recording compression resolving, not UI blur; the onset/plate
  numbers are robust (large-region metrics), the last-10% detail numbers are ±.
- Whether the notification bloom's seed is the Dynamic-Island rect (a bloom-from-
  island FLIP) or a pure center-scale — the island sits at the birth region, but
  1206 px half-res is too coarse to prove rect-inheritance.
