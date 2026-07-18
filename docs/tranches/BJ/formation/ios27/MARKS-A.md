# iOS-27 Liquid-Glass Reference — MARKS (Group A)

- verified-model: claude-fable-5
- union provenance: REFABLE RU-15, 2026-07-18 — the prior opus-begat marks (claude-opus-4-8 via the settings-level subagent override) re-proven claim-by-claim against the fresh Fable timelines in `refable-timelines/`; fresh-timeline evidence authoritative on every conflict; opus claims kept only where RATIFIED. Verdict ledger: `../refable/REFABLE-RU-15.md`.

Group-A corpus: the June 20-22 recordings + early stills. Frame-precise ledgers (dense 4/12/60fps bursts, machine-measured geometry) live in the per-video timelines cited per section; this file is the synthesis canon the codex cites. Phone frames 1206x2622 (3x); screen-record red dot + Dynamic Island chrome present throughout — ignore.

## Corpus manifest

| Tag | Source | Fresh timeline | Subject |
|-----|--------|----------------|---------|
| V1 | ScreenRecording_06-20 18-47-21 (38.24s) | `refable-timelines/sr-0620-1847.md` | Apple Music — dock lens tab-switch, dock scroll-collapse, mini↔full player, push/pop, Control Center |
| V2 | ScreenRecording_06-20 18-48-52 (11.97s) | `refable-timelines/sr-0620-1848.md` | Apple Music home — carousel flick physics, end-of-list rubber band, glass shelf, banner dismiss |
| V3 | ScreenRecording_06-21 01-28-54 (9.74s) | `refable-timelines/sr-0621-0128.md` | Apple Maps — bottom-sheet detents, overlay dodge, position-mapped scrim |
| V4 | Screen Recording 06-22 14.38.42 (.mov + copy, 14.42s) | `refable-timelines/mov-0622-1438.md`, `mov-0622-1438-copy.md` | Cowork desktop — NOT iOS; mis-slotted in the reference set; retained only as the restraint/ambient reference |
| Stills | Downloads/New Folder 4 | `refable-timelines/stills.md` | Proofread sheet, r/iOSBeta glass commentary, Maps sheet, Live-Activity goo-morph, house dataviz, glass-ui dock storybook, axis-capsule sketch |

---

## V1 — Apple Music (timeline: sr-0620-1847.md)

### The dock lens tab-switch [NEW]
Page content swaps to the target ≤83ms after tap — a hard cut under a fluid lens; never sequence content after the morph. The selection lens travels one tab pitch in ~170ms as a horizontally stretched blob (~1.6-1.8x scaleX bulge decaying over travel), tinting whichever glyphs sit beneath it in transit; full settle ~250ms.

### The dock scroll-collapse: slab → corner trio [NEW]
The 5-tab slab + mini-player collapse to three glass bodies — active-tab circle (accent glyph survives), compact mini pill, search circle — in ~330ms with visible three-body overlap mid-morph (deliberate goo, not a crossfade; the overlaps double-stack blur/tint). Trigger rules: collapse fires on scroll-down DISPLACEMENT (~100-150px), velocity-agnostic; re-expand (~250ms reverse morph) fires only on a sustained upward drag arriving at top — momentum rebound does NOT re-expand; any tab switch resets to full. The header large-title blurs out in place ~250ms BEFORE the collapse fires — header dissolve leads, dock follows at threshold.

### Mini-player ↔ full-player: the detuned-spring card growth [CORRECTED]
Origin-anchored [RATIFIED] — the growth anchor is the pill's CURRENT geometry (docked or collapsed corner state), never a fixed origin. The channels are deliberately detuned, NOT one shared spring: blur/dim fastest (~150-200ms), card geometry second (~300ms, small overshoot), album artwork last (~450ms visible lag + a ~300ms soft-bitmap tail after geometry rests). Full chrome fades in pre-composed at its FINAL layout positions inside the growing card — revealed, not reflowed. Gesture asymmetry: drag dismiss is 1:1 finger-tracked with art size frozen, release re-forms the pill text row within ~80ms and the art catches up last; flick dismiss is a fired ~350ms morph with art trailing throughout. Expansion from the collapsed corner pill starts with the background still SHARP — blur is a channel, not a precondition.
- Killed claims: no cyan/blue rim glow around the art (card tint derives from the album art itself); no depth-graded backdrop blur (near-sharp toolbar / far-blurred grid) — blur is a fast uniform ramp; and NO popover event exists anywhere in this recording (the prior "popover with triangular tail" mark is unsupported by the dense pass).

### Push/pop navigation [CORRECTED]
In-app push/pop is slide + parallax: the incoming page slides from the right at full speed, the outgoing parallaxes left ~1/3 under a dim veil (~350ms); secondary chrome (A-Z index rail, toolbar glyphs) staggers to after-settle; back-chevron press blooms white. The "shrink-into-cell" hero read comes free when detail art and grid cell share alignment — worth engineering deliberately. The scaling-card-over-blurred-destination grammar belongs to APP open/close zoom (group B), not to in-app navigation.

### Control Center [RATIFIED]
Module anatomy ratified: connectivity squircle tile containing circular toggles; now-playing tile; white filled circles for active toggles; Focus pill; two tall vertical capsule sliders with rising fill; bottom grid of glass circles — all over a blurred + darkened home. A fast swipe opens in ≤250ms including the full blur ramp; module circles pass underlying content color through; the sheet itself is springy under drag. Dismiss is a single global de-blur ramp (~500ms) and the CC status readouts MIGRATE into the status-bar corners while shrinking — migrate, don't fade.

### Glass material [RATIFIED + sharpened]
Tint sampling is per-element and local — the mini pill and the dock slab directly below take DIFFERENT hues from the same scene. Morphing bodies stay separate backdrop layers so overlaps double-darken — the overlap IS the liquid read. Rims: 1px bright top rim on pill + slab; specular arc on collapsed circles; press states dim the surface.

### State continuity [NEW]
The mini-pill marquee keeps its horizontal scroll offset through every geometry morph; track changes pass through with no geometry event. Text state is continuous, never reset by shape.

---

## V2 — Apple Music home (timeline: sr-0620-1848.md)

### Carousel flick physics [NEW]
Velocity-parameterized, duration-stable snap: release velocities of 2400-3200pt/s all settle in 650-683ms — the spring absorbs v0 as an initial condition; critically damped (τ≈130ms), ZERO overshoot, with a ~200ms sub-2px creep tail that must not be clipped. Single-channel motion: no scale, fade, blur, or parallax during flight. Snap grammar is edge-inset-symmetric (21pt insets), not center-symmetric.

### End-of-list rubber band [NEW]
Penetration ≈12pt at ≈520pt/s entry (gain ≈0.023pt per pt/s); compression ~90ms, release ~380ms asymptotic with no crossing of rest. Compression 4-5x faster than release — the asymmetry is what reads as elastic resistance.

### Notification banner dismiss [NEW]
Channel desync: translate leads (~100ms ease-in, preceded by ~6pt drag take-up creep), opacity trails ~40ms, the backdrop veil/scrim clears LAST (~70ms after the panel), status bar relights after. The banner slides UNDER the Dynamic Island.

### Shelf glass [CORRECTED + sharpened]
The bottom shelf is three bodies at rest: home pill (the collapsed active-tab circle, fully on-screen at x 28-78pt), tinted mini-player, search circle — this is V1's collapsed-dock rest state, NOT a tab bar contracted to a peeking off-screen nub, and no shared-width negotiation occurs anywhere in the corpus. Mini-pill glass is per-REGION chromatic: left half red over a red card, right half indigo over a purple card in the same frame. Cap refraction: the backdrop boundary displaces ~22-33pt where it passes behind the pill caps — the cap acts as a lens; this displacement is what reads liquid rather than frosted. Rim = paired bright arcs top-left/bottom-right (~0.7pt stroke), not a uniform border.

### Marquee [RATIFIED + quantified]
Both lines scroll together on one clock; delayed start, ~1s ease-in ramp to ~50pt/s; asymmetric masks (leading fade ~5pt, trailing ~10pt).

### Ambient card life [NEW]
Every editorial card runs a continuously morphing gradient field — ~7.6pt/s positional drift with ±20% mass breathing over 2-3s, hue held. The cheapest breath-of-life win in the corpus.

---

## V3 — Apple Maps bottom sheet (timeline: sr-0621-0128.md)

### Detent springs [CORRECTED]
Three detents (~10/43/93% coverage). Edge detents (collapsed, full) land critically damped — NO overshoot; the interior (medium) detent lands slightly underdamped (~15-25px, ~2% of travel, recovered ~100ms). Detent selection is velocity-projected (target = detentNearest(y + v·τ), τ≈0.2s), not nearest-position — a release moving down skips medium entirely. Peak speeds 1-2.25 screen-heights/s are the reference band.

### Overlay dodge + predictive fades [CORRECTED]
Floating map controls RIDE the sheet at fixed offset (sheet-anchored), clamp at a ceiling (their medium-detent tracked position), then fade out IN PLACE ~150ms when the sheet crosses medium — they are never covered-and-occluded; there is no z-handoff. Fade-IN is predictive: keyed to gesture direction/projected target, firing while the sheet is still past-medium and moving fast. Fade in place, never fade-while-translating.

### Position-mapped material [CORRECTED + sharpened]
The scrim over the map and the sheet's own darkening are pure functions of sheet position — scrub-reversible, same values at the same heights in both directions; NOT time-animated. Backdrop blur is PRESENT AT EVERY HEIGHT and constant — only darkening/saturation ramps. (The prior "blur proportional to sheet height" claim is dead: the graded channel is luminance, not blur.)

### Rigid mask reveal [NEW]
Sheet content keeps constant offset from the sheet top at every instant including mid-flick — clipped by the rising edge, appearing fully formed at full opacity. No per-element fade, slide, stagger, or parallax inside the sheet. The slab's rigidity is what sells the weight; resist adding entrance animations.

### Grabber [NEW]
Absent at cold idle; appears at first touch; persists through the session.

---

## V4 — Cowork desktop (timelines: mov-0622-1438.md + -copy.md) — NOT iOS [CORRECTED]

Both .mov files capture the Anthropic Cowork desktop landing screen — no iOS surface, no glass, no gesture anywhere (max inter-frame scene score 0.00056; zero scene cuts at detection threshold 2). Mis-slotted in the reference set; cite for nothing except the restraint floor below.

### The ambient dot-lattice [CORRECTED mechanism]
The lattice never moves and no dot travels — a slow luminance ENVELOPE evolves over a fixed halftone grid (pitch ~14 CSS px, dot ~1.25px logical, peak ~+16% luminance over a #1B1B1B ground): coherent cloud-shaped regions (~300-600px) brighten and fade in place, the envelope wandering at ~10-20 CSS px/s, asymmetric per-dot lifecycle (rise ~0.7s, decay ~3s). NOT a radial outward drift; not a twinkle. Slowest visible change wins. This is the restraint-floor exemplar: engagement can be the background, not the widget.

---

## Stills (timeline: stills.md)

- IMG_1874 Proofread sheet [RATIFIED] — frosted diffuser inheriting the covered chat's purple as broad washes; blur ~40-60pt + saturation; white diffusing layer ~65-75% (hue survives, geometry does not); one saturated accent (the blue confirm circle); Copy/Replace/Share capsule row one step lighter than the field. Reserve full saturation for the single primary action.
- IMG_1881 r/iOSBeta commentary [RATIFIED] — the community tuning spec verbatim: lighter drop-shadows inside glass buttons, flatter tops and sides, much brighter upper and lower edges in light mode, left/right edges less dark grey; "is the shine around icons changed" — edge/shine is what observers track. The rim model is anisotropic: bright horizontals, quiet verticals; dark side edges are the tell that breaks the illusion.
- Screenshot 06-20 18.52.29 Maps sheet [RATIFIED] — neutral glass picking up terrain green; identity color lives only in content circles and the avatar; grouped actions merge into one capsule (spacing as the divider), singles stay circles. Glass never carries brand color.
- Screenshot 06-21 14.38.54 expanded sheet [RATIFIED] — the sheet grades warm pink-cream from the ambient backdrop; radius stays generous at full size; the art gradient carries across morph poles as the identity thread.
- Screenshot 06-21 14.38.58 search capsule [CORRECTED] — near-opaque warm white capsule, warm brown ink, no border, NEGLIGIBLE shadow. The prior "edge emits a light bloom into the backdrop" read is unsupported here; bloom evidence lives in group B (the Find My toggle aura, the lens glow).
- Screenshot 06-21 15.26.49 media pill [RATIFIED] — art squircle / two-line text / thin-ring action circle; the action stays tone-on-tone; color identity lives in the art block only.
- Screenshot 06-21 15.26.54 goo capsule [RATIFIED] — two Live Activities share a meniscus bridge, one liquid body with two lobes; waist depth ~45-50% of lobe height is the state signal; content never crosses the waist. The canonical goo-morph reference.
- IMG_1880.HEIC axis sketch [RATIFIED] — a capsule crossed by an axis gaining zones x → x+y → x+y+z; the user's own anchor for axis-parametrized morph (growth per named axis on one shared spring; matches `useLiquidMorph`). Now backed by live evidence: the group-B Siri orb→pill morph runs staged axes.
- House dataviz stills (06-22 11.32.x / 13.30.41 / 13.58.05) [RATIFIED] — serif display + mono numerals + technicolor bars on near-black; three flagged defects: selected-card flood, panel stacking collisions, sub-legible flow ribbons.
- glass-ui storybook crops (06-21 04.08.x) [RATIFIED] — the in-repo anchor: one engine, one dock-spring scalar, the dock is the controlled object.
- 06-22 14.32.01 playbill [RATIFIED] — ornament-and-rule typographic reference + a plain example of the dot-pager idiom the goo work replaces.
- IMG_1882 income infographic [RATIFIED] — ranked-bar idiom reference (inline labels, one reference line, palette doubling as legend).

---

## Cross-corpus design codex (group A) — corrected

1. **Dock morphology** — the dock is a state MACHINE of glass bodies: full slab ↔ corner trio, driven by displacement-gated collapse, intent-gated re-expand, tab-switch reset; the selection lens goo-travels under an instant content swap. (The prior "shared-width negotiation / tab bar contracts to a peeking edge" model is dead — no such event exists in the corpus.)
2. **Backdrop treatment** — blur + darken co-applied, fast, and often ASYNC to geometry (blur completes before geometry on one expansion, arrives late on another). Sheet materials grade DARKENING by position (scrub-reversible); blur stays constant. Depth-graded blur across a single app surface is NOT attested in group A.
3. **Radius grammar** [RATIFIED] — circle = discrete tap-target; pill (r = half-height) = primary action / field / short-label float; card ~24-32px = content container; squircle tile = group container of circles; slider = tall pill with rising fill; concentric nesting throughout. iOS-27 trends flatter-than-squircle per IMG_1881 — bias radii slightly less round, keep the corner, flatten the mid-edge.
4. **Engagement** — expansion grows from the source's CURRENT geometry; dismissal is gesture-profiled (drag = tracked with frozen art; flick = fired morph); sheets spring to detents with per-detent damping; even the static desktop breathes (V4).
5. **Spring character** [CORRECTED] — the signature is DETUNED channels in a fixed lead order (blur < geometry < artwork here; content < annotations < camera < data in group B), not one shared spring; equal timings kill the effect. Physics constants worth copying verbatim: τ≈130ms critically damped snap, duration-stable under varying v0; rubber-band gain ~0.023pt/(pt/s) with compression 4-5x faster than release.
6. **Overlay entry/exit** — banner exit: translate leads, fade trails, scrim clears last, all under the island. (The anchored-popover-with-tail idiom is UNSUPPORTED in this corpus — no popover event exists; do not cite V1 for it.)
7. **Material layering** [RATIFIED + sharpened] — per-element backdrop sampling (never a shared wrapper); overlapping bodies double-darken mid-morph; asymmetric rims per IMG_1881; active = opaque white fill; press = dim.
8. **Typography** [RATIFIED] — SF tight hierarchy on iOS surfaces; the serif-display + mono house voice as glass-ui's own identity lever.
9. **Proportion** [RATIFIED] — concentric ratio inner ≈ 0.5-0.6x outer; shelf gaps ≈ the pill's own corner radius (measured 17-20pt against radius ~22pt).
10. **Adaptive tint** [RATIFIED + sharpened] — tint is a live per-element, per-REGION sample of the backdrop (the two halves of one pill differ), spring-smoothed. Panel tint is a function of backdrop, never a preset.

---

## To BEST iOS 27 (net direction, corrected)

1. **One liquid surface for the nav layer** — the collapse morph's three-body overlap and the lens transit are already goo; unify dock/player/sheet states on the metaball engine so every state change is continuous deformation. Fence from group B: iOS does NOT goo independent passing bodies (hard z-overlap) — exceeding iOS there is deliberate.
2. **Detuned channel choreography as a first-class API** — named channels (blur/dim, geometry, content, accent) with a fixed lead order and per-channel springs; never one shared spring.
3. **Physics constants shipped as presets** — τ≈130ms duration-stable snap, the asymmetric rubber band, the displacement-gated + intent-gated dock state machine.
4. **Live per-region backdrop tint + cap-refraction displacement** — the two properties that separate liquid from frosted.
5. **Asymmetric rim per IMG_1881** — bright top/bottom, quiet sides, light inner shadow, flatter-than-squircle — baked into the token set.
6. **Axis-parametrized morph** (IMG_1880 → `useLiquidMorph` x/y/z scalars) — now live-backed by the group-B staged-axis orb→pill morph.
7. **Editorial serif + mono identity and the breathing restraint floor** as shipped modes.
