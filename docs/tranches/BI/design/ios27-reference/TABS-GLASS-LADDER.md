# TABS-GLASS-LADDER — the iOS-27 eyeglass tab-pill + glass MATERIAL reference ladder (A-TABS-GLASS)

> **Terminal implementation precedence — P092/Q020 (2026-07-16).** This file preserves
> measured reference evidence only. Its proposed two-rest-state scalar, dedicated spring,
> lead/trail Tabs path, and related library bindings are superseded and must not be built.
> The current contract is one measured `.glass-lens` pill fill on the shared `snappy`
> clock; see `docs/tranches/BI/FORMATION/waves/BI.W-P092.md` and Q020 in
> `docs/tranches/BI/addenda/PLAN.md`.

BI design-loop reference re-examination (UF-P8). Analyst: A-TABS-GLASS (Fable).
Every number below is a direct pixel measurement with a frame reference; the BD/BG
priors were re-derived from scratch and are corrected where wrong (§7).

**Sources measured**
- The eyeglass corpus `docs/tranches/BG/audit/ios27-eyeglass-tabs/` — primarily the
  `ext/` 60 fps bar-band strip (`e-0000..e-0335`, 1206×260, `t = 7.0s + N/60` of the
  Find My recording; byte-verified against `bar60/`), + `frames/`, `keyframes/`,
  `RESEARCH-KINEMATICS.md` (the prior under test).
- `ScreenRecording_06-21-2026 01-28-54_1.MP4` (Apple Maps detented sheet, 1206×2622@60,
  9.7 s) — re-extracted at 10 fps as `m-001..m-097` (`t = N/10 s`). NOTE: this clip is
  the Maps SHEET, not a tab bar — the BD `v1-tabs-glass` label was always a misnomer
  (its own §scope-honesty says so). It is the glass-MATERIAL / detent witness here.
- `IMG_1874.PNG` (writing-tools "Proofread" thick sheet over purple chat bubbles) —
  the clean blur-σ and hue-transmission still.
- Scale: recording 1206 px wide = 402 pt logical ⇒ **3 recording-px per pt/CSS-px**.
- Bar geometry (re-confirmed): capsule x 60..1146 (1086×187 px), 4 slots ≈ 271 px,
  tab centers x ≈ 210 / 468 / 762 / 1006, bar band y 40..227 in the crop.

Method: fixed-box photometric timelines (no tracking), a continuity-constrained
leading/trailing-edge tracker on the y 148–174 row band, glyph-bbox magnification,
1-px rim/crown channel scans, gaussian-band-match + edge-spread blur estimation,
grid-annotated crops for all geometry reads. Confidence tags as in the prior:
[H] direct pixel measurement · [M] tracker with stated bias · [L] qualitative.

---

## §1 — THE HEADLINE: the pill is a TWO-REST-STATE machine, not a static loupe

The single largest correction to the priors. The pill has **two distinct rest
geometries/materials** plus a live transition arc, driven by **touch/motion — not by
backdrop sampling**:

| state | height (px / pt) | vs bar 187 | width (px) | material | frames [H] |
|---|---|---|---|---|---|
| **SETTLED** (long rest) | 150–165 / 50–55 | **0.80–0.88× — INSET** | 260–290 | ink-darkened flat plate, ≈25–30 % darker than the bar (interior L 72 vs bar 101 @ e-0320; L 89 vs ≈128 @ e-0100); **no rim ring, no specular, no magnification** (plain ≈2 px step edge) | e-0100, e-0165, e-0320 |
| **LIVE** (touched / travelling / just-arrived) | 200–220 / 67–73 | **1.07–1.18× — PROUD both edges** (crown apex to y≈12–31 vs bar-top 40; base 228–235 vs bar-bottom 227; domed — taller at center) | 290–340 | magnifying loupe: interior ×1.15–1.25, dark refractive ring 3–5 px (ΔL −45 %), crown specular arc +65–100 %, luminance-lifted | e-0140, e-0226, e-0230, e-0285 |

**Transition timings [H]** (fixed-box photometry, `photo1`):

| leg | timing | witness |
|---|---|---|
| ENERGIZE (touch → bloom onset) | photometric flip starts **50–67 ms BEFORE motion** (bloom e-0109, departs e-0112; T4: bloom e-0263, departs e-0266/67) | Devices slot L 89→143 in 3 frames while stationary |
| bloom magnitude | pill goes from ≈−40 L below the local bar to ≈+20..25 L above it — a ≈±25 % swing relative to the bar (Devices slot 89→172 across e-0100→e-0116; ~+20 L of that window is a global page-transition confound, stated honestly) | e-0109..e-0116 |
| LIVE DWELL after arrival | ≈250–420 ms bright/proud hold (T2: e-0122→~0147 ≈ 420 ms, possibly touch-extended; T4: e-0272→~0288 ≈ 270 ms) | photo1 slot plateaus |
| DECAY (deflate + dim to SETTLED) | ≈250–430 ms; fully settled-dark ≈ **0.65–0.72 s post-arrival** (T2 dark by e-0165 = 717 ms; T4 stable by e-0314 = 700 ms; T1→e-0100 ≈ 0.97 s already settled) | Me slot L 163→82.7 e-0278→e-0314, then flat |

The arrival glow itself decays fast (interior L 166→155 over e-0122→e-0140 ≈ 300 ms);
the geometric deflate (proud → inset) rides the slower 250–430 ms leg.

**Driver verdict [H]:** the register switch is **temporal/gestural** (touch-down
energizes, arrival starts a dwell-then-decay clock). The backdrop does not modulate
the pill's own state — what backdrop changes is only what the transmissive material
shows through it (§5). The prior's "the optics track backdrop luminance dynamically —
must sample the live backdrop" mistook passive transmission for active adaptation (§7-1).

---

## §2 — Kinematics re-verified (deeper): the liquid arrival is EDGE-ASYMMETRIC

Leading/trailing-edge tracker, y 148–174 band, T2 (Devices→People, 258 px, leftward),
`t_rel` from departure e-0112 [M, edges ±4 px; cross-checked on grid crops]:

| e- | t_rel (ms) | leading edge | trailing edge | width | note |
|---|---|---|---|---|---|
| 0112 | 0 | 399.6 | 601.3 | 202 | departs (already bloomed) |
| 0116 | 67 | 314.3 | 544.1 | 230 | fast leg |
| 0119 | 117 | 196.8 | 505.2 | 308 | peak stretch building |
| 0122 | 167 | 145.2 | 457.1 | 312 | leading edge at target zone (~90 % travel) |
| 0124 | 200 | 101.4 | 431.5 | 330 | width peak |
| **0126** | **233** | **84.2** | 403.3 | 319 | **leading-edge OVERSHOOT max: 26 px past rest** |
| 0129 | 283 | 105.9 | 379.0 | 273 | leading edge recovered (≈117 ms recovery) |
| 0133 | 350 | 110.6 | 356.9 | 246 | trailing edge still arriving |
| 0136 | 400 | 114.2 | 343.2 | 229 | center settled (±2 %) |
| 0140–0146 | 470–570 | 110±2 | 338±1 | 228 | **structurally settled** |

- **Overshoot [H]: 26 px ≈ 10 % of the 258 px travel** at the leading edge, recovered
  in ≈117 ms ⇒ ζ ≈ 0.6 on the leading edge. T4 (Items→Me, 244 px) is much softer:
  ≈2–4 px (≈1–2 %, e-0277) ⇒ ζ ≈ 0.85. The prior's T2 ≈20 px/8 % is CONFIRMED and
  sharpened; damping is variable per gesture (flick energy), ζ band 0.6–0.85.
- **The trailing edge lags ~270 ms behind the leading edge** (contracts 65 px from
  e-0126→e-0142 after the leading edge has already arrived+overshot). The "liquid"
  read is exactly this edge asymmetry — the pill arrives nose-first and its tail
  pours in afterwards. A rigid translate+scale on one clock cannot produce it.
- **Settle:** perceptual arrival ≈150–170 ms; center 2 %-band ≈400–430 ms; full
  structural settle (both edges + width) ≈ **470–500 ms** post-departure. The prior's
  "settled 333 ms" tracked only the centroid — the tail is ~170 ms longer (§7-4).
- **Spring [M]:** re-affirmed — travel duration is amplitude-independent (2-slot T3 ≈
  1-slot T2 in settle), damped-spring fit response ≈ 0.32–0.40 s. Net: **(response
  0.32–0.40 s, ζ 0.6–0.85, overshoot 1–10 %)**.
- **Continuous transit [H]:** T3 (People→Items, 2 slots, 552 px) physically transits
  the intermediate Devices slot (accent tracker crosses De at e-0198–0202) — a slide,
  never fade-out/fade-in. T3 also shows a ≈130 ms pre-departure LEAN (e-0196) — a
  drag-scrub affordance signature (open unknown §9-2).

**Squish — volume preservation MEASURED in 2D [M/H]:**

| axis | rest (live state) | mid-flight | ratio |
|---|---|---|---|
| along-travel width | 290–320 | rim-to-rim ≈350–370 @ e-0124 (tracker half-height peak 330; fast-leg readings inflated by ~30–40 px motion blur) | **×1.15–1.30 core** |
| height | 200–213 | 168–178 (grid reads e-0119/0124/0126) | **×0.82–0.88** |
| area | — | 1.2 × 0.85 ≈ 1.02 | **volume-preserving within ≈5 %** |

The height compression means the mid-flight pill momentarily drops back INSIDE the
track and re-pops proud at arrival — the loupe "ducks" while travelling.

---

## §3 — Loupe OPTICS quantified

**Magnification (glyph-bbox, same glyph three states) [H]:**

| glyph | bare | LIVE loupe | SETTLED plate |
|---|---|---|---|
| Me (55×55) | 1.00 | **67×66 = ×1.22** (e-0285) | 55×55 = ×1.00 (e-0320) |
| People (75×52) | 1.00 | 83–84 × 64–66 = **×1.12 W / ×1.25 H** (e-0128/e-0140) | 75×50 = ×1.00 (e-0170) |

Interior magnification in the live state is **×1.15–1.25**, anisotropic near the rim
(the wide People glyph's W-mag reads lower because its ends enter the rim-compression
band). Glyph centroids displace OUTWARD from the pill center (People x 191→171;
Me 945→961) — center-magnifier displacement, not a translate.

**Edge displacement [H]:** the bar's own top-edge line, seen through the crown, is
displaced **+14 px inward** (y40 outside → y≈54 inside; e-0285 vscan x990). Backdrop
text compresses INTO the rim band and bends around the crown (the "Salazar" bend,
grid-0226, real x 625–755, y 10–25). Edge-concentrated displacement over a
magnifying interior — the squircle-bevel profile with a NON-unity interior term.

**Rim band [H]** (1-px scans): LIVE left rim @ e-0285 (y130): bar L 147 → dark
refractive ring L 78 (**−47 %**, R channel 82→18) over **3–5 px**, a 2–4 px recovery
band, then interior at/above bar luminance. SETTLED rim @ e-0320: **no ring at all** —
a plain ≈2 px step from bar L 101 to plate L 72.

**Crown specular [H]:** LIVE rest: 2–3 px arc, L 146 vs 88 surround (+66 %, e-0285
y32–34). Mid-flight it INTENSIFIES: L 178 (+~100 %, e-0116 y37–39). SETTLED: absent
(e-0320 crown scan shows only the bar's own y40–42 edge line). Base: soft shadow
under the live pill's bottom edge; none settled.

**Chromatic dispersion [H, magnitude M]:** REAL but micro. The crown arc carries a
warm fringe (R 47 vs interior R 0–10 at e-0116 y37–39; rainbow iridescence visible in
the bent Salazar text at the crown, grid-0226). Per-channel peak offsets ≤2–3
recording px ⇒ **≤1 pt** — a whisper, visible only where bright content bends at the
crown, not an RGB-split spectacle.

**Rim/glint in motion:** the specular arc persists throughout travel at the crown
(brightest reading of the whole corpus is mid-flight e-0116) and reads biased toward
the leading side [L — 60 fps motion blur prevents a decisive lean measurement, §9-3].

---

## §4 — Accent-ink choreography: ASYMMETRIC, and vibrancy-composited

Glyph-stroke color tracker (brightest-15 % pixels per glyph box), T2 [H]:

- **Incoming glyph SNAPS white→accent in ≤2 frames (≤33 ms)** the moment the lens's
  leading edge covers it — People B−R excess 18→151 between e-0116 and e-0118, i.e.
  **~4–6 frames BEFORE the center settles** (settle e-0136). Keyed to lens-cover,
  not to arrival.
- **Outgoing glyph FADES accent→white over ≈270 ms** (Devices R 59→243 across
  e-0108→e-0126), tracking the travel duration.
- **The accent ink is translucent/vibrancy-composited, not an opaque color:** the SAME
  selected accent renders `[102,253,253]` (light cyan) over the bright teal map and
  `[37,184,251]` (deep blue) over the dark People sheet (e-0140 vs e-0166). The
  prior's fixed "#54FBFE saturated cyan" was one backdrop's rendering (§7-6).
- Unselected glyphs/labels stay white (`[254,254,254]`) in every state.

---

## §5 — The glass MATERIAL family facts (both videos + IMG_1874)

**Hue: NOTHING has a fixed hue — bar and pill are fully hue-stealing [H].** Over the
teal map both read teal (bar interior gradient ≈ [50,126,155]→[89,132,181]); over the
dark People sheet both read neutral dark (e-0165+, zero teal anywhere); the bar's left
end reads warm where the avatar photo passes behind (e-0165). The prior's "luminous
cyan-blue glass, B 200–206" was transmitted map teal + the live-state lift, not a
material tint. Identity comes 100 % from the backdrop + the accent INK.

**Blur-radius classes measured (recording-px ÷3 = CSS px @1x):**

| material | measurement | σ (CSS px) | witness |
|---|---|---|---|
| **Thick sheet body** (writing-tools "Proofread") | edge-spread: bubble edge 20–80 % width 2 px bare → 93 px through glass ⇒ σ≈55 rec-px | **σ ≈ 18.3** (≈ `backdrop-filter: blur(18px)`) | IMG_1874 [H] |
| **Maps half-sheet body** | band-match: uniform contrast retention a≈0.28–0.39 + tint plate; texture kill 72–86 % | blur modest; the kill is mostly TINT-PLATE compositing | m-025 vs m-031/032 probe [M] |
| **Maps sheet TOP EDGE** | **PROGRESSIVE graded band**: map nearly sharp in the first ~40 rec-px below the edge, deep frost by ~100–120 rec-px | a **13–40 CSS-px progressive ramp zone** | sheet-band-compare m-025/m-032 [H] |
| **Find My tab bar** | ≈94 % contrast kill (prior, corroborated); only large bright features ghost through as hue blobs (e-0165 "…Now" ghost); σ unresolvable from footage | deep class (≥ sheet body) | e-0100/e-0165 [M] |

**Saturation behavior [H]:** through the thick sheet the purple bubbles keep their hue
at full identity (the pink-purple bleeds through vividly) while region saturation
dilutes by the bright plate composite (sat 0.451→0.209, L 103→177). Hue-preserving
deep frost — never a gray-out. A quantitative `saturate()` lift factor is not
decidable from this footage (§9-6).

**T9 — the backdrop-blur ENGAGE, corrected [H]:** on the detented sheet the material
is **CONSTANT during translate**. The fixed probe under the sheet path transitions
unobscured→fully-glassed within the edge-sweep time (≤1 probe frame, ≤100 ms;
m-027→m-029) — the blur/tint is carried by the moving edge; **no radius ramp
animates**. The radius-ramp engage belongs only to the Control-Center-style overlay
pull (not present in these sources; unmeasured, §9-7).

---

## §6 — The Maps detented sheet: position-coupled material physics (numbers for the drawer band)

10 fps probes (`m-NNN`, t = N/10 s); probe box x 460–750 y 1600–1750; scrim box
y 320–470 (uncovered until near-full):

| detent / leg | measured |
|---|---|
| peek→half rise | t 2.7→3.3 (≈0.5–0.6 s incl. settle); material constant during the rise |
| **half** | plate over dark map: **L +30–40 %** (65.7→85–92), texture −72 % (19.9→5.5), sat preserved (11.7→13); **scrim on the still-uncovered map −6–7 %** (79.1→73.1–77.2; again t 6.6–7.1) |
| half→full | the congeal + big dim ride the LAST leg: uncovered-map probe 69.4→38.5 across t 7.2–7.7 (sheet-coverage confound above y≈320 noted honestly) |
| **full** | near-opaque content surface: probe sat 2.8 vs map 11.7 (**≈76 % desat — map hue gone**), texture 2.7 (own content only); backdrop legible NOWHERE through the body; only the graded edge band at the grabber ghosts |
| release full→half | t 8.8→9.3 (≈0.4–0.5 s); the probe reads glass-state again within ≤0.2 s of the edge clearing — **fully position-coupled, reversible, no hysteresis** |

This puts NUMBERS on the BD T6/v1-GAP-1 story: translucent at peek/half, congealing
near-opaque at full, with the opacity/scrim coupling weighted NONLINEARLY into the
upper half of the travel.

---

## §7 — PRIOR CORRECTIONS (BD-era + BG RESEARCH-KINEMATICS, re-verified)

| # | prior claim | verdict |
|---|---|---|
| 1 | RESEARCH-KINEMATICS §2e / signature #5: "optics track backdrop dynamically… must *sample the live backdrop*" (binds `useGlassBackdropLuminance`) | **WRONG DRIVER.** The register switch is the pill's own touch/motion state machine (§1). Backdrop-dependence is passive transmission through a fixed material. The calm-vs-busy comparison was CONFOUNDED: every "busy bloom" frame is a LIVE-state window (≤420 ms post-arrival), every "calm whisper" frame a SETTLED-state window. |
| 2 | §2a "interior magnification near-unity ~1.0–1.1×; the optical work lives at the rim" [L] | **CORRECTED: interior ×1.15–1.25 in the LIVE state** (glyph-bbox, §3); unity only in the SETTLED state — which the prior never identified as a distinct state. Edge-concentration of DISPLACEMENT stands; interior-unity does not. |
| 3 | §2c "the pill is a distinct loupe resting ON the track, 1.14×, proud both edges" as THE resting geometry | **State-scoped.** True of the LIVE state only (measured 1.07–1.18×). The true long-rest is an INSET 0.80–0.88× ink-darkened plate with no lens at all (§1) — the two-rest-geometry fact is NEW. |
| 4 | §1 "settle 200–300 ms" | Leading-edge/centroid only. The trailing edge pours in ~270 ms after the leading edge; full structural settle ≈470–500 ms (§2). The edge ASYMMETRY is the liquid signature the prior's single-centroid tracker could not see. |
| 5 | §2d "the accent tint arrives with the lens (saturates as the plate settles)" | Refined: incoming SNAPS ≤33 ms at lens-cover, BEFORE settle; outgoing fades ≈270 ms. Asymmetric two-clock choreography (§4). |
| 6 | §2d selected glyph = fixed "#54FBFE saturated cyan" | The ink is vibrancy-composited; it renders light-cyan over bright teal, deep-blue over dark (§4). |
| 7 | `v1-tabs-glass/ANALYSIS.md` labeled a tabs/glass audit | It is the Maps SHEET clip (its own scope note admits it). Its GAP-1/GAP-2 story is CONFIRMED here with numbers (§6). |
| 8 | IOS27-REFERENCE T9 "the blur radius animates with the sheet translate" | **NOT for detented sheets** — material constant, the engage is the edge sweep (§5). Radius-ramp engage is Control-Center-only; do not build a radius animation into the drawer. |
| 9 | IOS27-REFERENCE T4 "~1.15× icon overshoot + accent-flood on commit" applied to tab bars generally | Find My shows glyph-mag ×1.2 via the LENS (an optical effect, not an icon scale-pop) and NO accent-flood. Those behaviours belong to the v3 Apple-Music clip's register; do not conflate the two tab registers. |
| 10 | §1 T2 overshoot ≈20 px ≈8 %, ζ≈0.63; spring response 0.32–0.40 | **CONFIRMED** (26 px/10 % leading-edge, ζ 0.6; T4 ζ 0.85). The prior's kinematic core survives re-measurement. |

---

## §8 — LIBRARY BINDINGS (register ⇄ measured fact ⇄ delta)

1. **The eyeglass state machine → a new `--eyeglass-live-t` scalar (the BI eyeglass
   wave's core).** SETTLED(0) ⇄ LIVE(1) drives, in lockstep: outset (height 0.84×→1.12×
   of bar, inset→proud), the `.glass-lens` engage (ring + ×1.2 interior magnify),
   the crown specular, and the luminance register (−25 %→+15 % vs bar). Timings:
   energize ≤67 ms on pointer-down (BEFORE travel), dwell 250–400 ms post-arrival,
   decay 250–430 ms. `useGlassBackdropLuminance` is NOT the driver (keep it only as
   the AA legibility floor). PRM: state-snap, zero travel/deform frames.
2. **Spring register** (`src/composables/motion/springPresets.ts`): measured travel =
   (response 0.32–0.40 s, ζ 0.6–0.85, overshoot 1–10 %, amplitude-independent).
   Current `snappy` (0.48, 0.74, +3.2 %) is slower + more damped than the reference;
   `dock` (0.68, 0.64, +7.3 %) has the right give but nearly 2× the response. The
   eyeglass travel sits at a point the current six-row vocabulary does not cover:
   **snappy-class speed with dock-class give**. The BI wave must either dip ζ on a
   snappy variant or mint the row via `SPRING_PRESETS` (one-table doctrine); the
   measured 10 % peak sits exactly AT the BD ≤10 % overshoot fence.
3. **Squish** (`useTabIndicator` + `useLiquidFlex`): reference core stretch
   **×1.15–1.30** vs `--tab-indicator-max-stretch` 1.08 — the eyeglass register wants
   a ~1.2 cap (keep 1.08 for plain SegmentedTabs). Volume preservation is now
   REFERENCE-MEASURED (§2, ±5 %) — `useLiquidFlex`'s reciprocal law is validated.
   The release must become **edge-asymmetric**: leading edge settles on the spring
   (~117 ms recovery) while the trailing edge/width releases over ~270 ms — a
   two-clock release, not the current single `INDICATOR_RELEASE_AT_ARRIVAL` switch.
4. **`.glass-lens` / `--glass-refract`** (the BI glass PASS-1 "one refraction door"):
   the squircle edge-displacement profile is re-validated (bar-edge +14 px inward at
   the crown, rim-band compression) **but the reference adds a ×1.15–1.25 interior
   magnification term in the live state** — the current edge-only/interior-thin map
   under-magnifies. Delta: an interior scale term coupled to `--eyeglass-live-t`.
   Ring spec: 3–5 px (1–1.7 pt) at ΔL −45 %; crown arc 2–3 px at +65 % rest / +100 %
   in motion.
5. **Chromatic-aberration rim (the booked W-LENSING successor):** real in the
   reference but a WHISPER — ≤1 pt channel offset, visible only where bright content
   bends at the crown. Build it sub-perceptual or not at all; an RGB-split rim would
   overshoot the reference.
6. **`--glass-accent`:** the reference rim carries NO accent hue — the rim/specular
   hue-steal from the transmitted field; the accent lives ONLY in the glyph/label INK,
   vibrancy-composited (§4). The house per-facet accent rim is a deliberate glass-ui
   identity move BEYOND the reference — keep it opt-in, never default-on for the
   eyeglass register. The accent-ink choreography to encode: incoming snap ≤33 ms
   keyed to lens-cover; outgoing 270 ms fade (EFFECTS-leg asymmetry).
7. **Glass blur ladder** (`tokens/glass.css` 8/8/13/13, dock 9, deep 16 [14–20]):
   the measured thick-sheet σ≈18.3 CSS px lands INSIDE the deep band — `.glass-deep`
   16 px is −13 % of reference, overlay 13 px −29 %. The reference TAB BAR is the deep
   frost class (~94 % contrast kill): the eyeglass STAGE (the bar under the pill) must
   ride the deep register, not the calm dock 9 px (the calm dock stays a house-identity
   divergence, but the eyeglass demo bar reads wrong without deep frost — the loupe
   needs the frosted field to lens, RESEARCH-KINEMATICS signature #7 re-affirmed).
8. **Progressive graded edge — NO house register exists.** The Maps sheet's top edge
   is a 13–40 CSS-px progressive blur/tint ramp (§5) — a new BI glass-band fact
   (mask-graded backdrop layer; must be Safari-safe, no `backdrop-filter: url()`).
9. **Drawer detent coupling (`--glass-drawer-t`, the BD W-DRAWER-DETENT-GLASS
   numbers):** scrim ladder ≈ {peek 0, half 0.06–0.07, full → content-opaque};
   congeal weighted nonlinearly into the upper half of travel; **material constant
   during translate** — never animate the blur radius with the drag (§5 T9
   correction); coupling reversible with position, no hysteresis (§6).
10. **Bar/slot geometry for the eyeglass demo:** bar 62 pt tall, slot pitch ≈90 pt,
    pill live ≈97–113 pt × 67–73 pt proud ±3–5 pt both edges; settled ≈87–97 pt ×
    50–55 pt inset. Pill/slot width ratio ≈1.07–1.25 live, ≈0.96–1.07 settled.

---

## §9 — OPEN UNKNOWNS (booked, not guessed)

1. **Rapid re-tap / mid-flight interruption** — zero witnesses in any source (the four
   travels are ≥1.3 s apart). The velocity-continuous re-seat (house `useSpring`
   re-target) remains the presumed-correct model, unverified against the reference.
   Book a capture ask (two taps <300 ms apart).
2. **Tap vs drag-scrub** — T3's ≈130 ms pre-departure lean suggests the pill is
   scrubbable (finger-drag between tabs); recordings carry no touch indicator.
3. **Specular-arc lean into the travel direction** — suggestive at e-0116, not
   measurable under 60 fps motion blur.
4. **The exact decay clock** of LIVE→SETTLED (250–430 ms band; both clean windows are
   partially backdrop-confounded) and whether a held finger extends the dwell.
5. **Bar blur σ** — only the ≈94 % contrast kill is bounded; needs a controlled still
   (an IMG_1874-analogue behind a tab bar).
6. **`saturate()` lift factor** through the frost — hue survives vividly, but a
   quantitative factor needs a known color chart behind glass.
7. **The Control-Center radius-ramp engage** (the true T9 case) — absent from these
   sources; ramp duration unmeasured.

---

*Scratchpad artifacts (tracker CSVs, grid crops, rim scans, blur-match scripts) at
`scratchpad/ios27-frames/a-tabs-glass/` for the session; every table above names its
frame witnesses so the measurements re-derive from the committed corpus alone.*
