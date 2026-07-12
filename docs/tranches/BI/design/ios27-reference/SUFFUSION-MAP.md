# SUFFUSION-MAP — every measured iOS-27 behavior → ONE library home (BI design loop, UF-P8 second half)

Binding de-dup + delta map. Inputs: the three BI reference ladders (`DOCK-LADDER.md` ·
`TABS-GLASS-LADDER.md` · `MOTION-LADDER.md`), the BD prior (`docs/tranches/BD/viz/video-audit/
IOS27-REFERENCE.md` T1–T17), the pass-1/2 design-loop state (D-DOCK/D-GLASS/D-MOTION/D-PAGER
PASS-1 + PASS-2-AGGLOMERATION), and the audit registry (FAM-1..17).

**Precedence:** the ladders' pixel measurements OVERRIDE the BD T-table where they conflict
(corrections DOCK C1–C9, TABS §7-1..10, MOTION §4). Every behavior below names (a) its ONE
register home, (b) the duplicates the formation must collapse, (c) the numeric delta the owning
wave encodes, (d) its BD T-row disposition (§2). §3 is the DE-DUP ROSTER the formation folds
into the wave specs. One behavior, one home, zero parallel paths (`proof:no-dual-path`).

**The load-bearing prerequisite (M1):** the CSS `linear()` spring emission is ~5× time-compressed
vs the JS integrator for the SAME `(response, ζ)` — every CSS-clocked delta below is meaningless
until `regen-spring-tokens.mjs`'s time base is fixed (+ the keyframes.js `springTimingFunction`
cross-repo ask). No preset retune ships before M1 lands.

---

## §1 The behavior map

### M — MOTION CLOCKS (owner: D-MOTION; the register table `motion-registers.css` + SPRING_PRESETS)

| # | observed behavior (iOS, measured) | ONE home | duplicates to collapse | delta to encode |
|---|---|---|---|---|
| M1 | **THE PARITY BREAK** — same (response,ζ) paints t90 44–79ms via emitted `linear()` vs 217–508ms via `SpringProgress`; every CSS enter is a ~50ms pop + dead 300ms tail | `scripts/regen-spring-tokens.mjs` emission time base (ONE fix) + kf `springTimingFunction` ask | the tune-fence lie (t90 ∈ [50,61]% of clock holds on NEITHER emitted curve); per-preset retunes chasing the symptom | painted t90 must move 10–16% → 50–61% of clock; snappy painted 44→~200ms on its own 400ms clock |
| M2 | overshoot ceiling: surfaces ≤2% (max measured 1.7%), **exits 0%**, bidirectional box morphs ~1% both legs | SPRING_PRESETS tune fences + motion-canon P5 | — | DOCK_SPRING +7.3% = 4× ceiling; bouncy +9.5% flagged; canon P2 clarified: box morphs MAY land ~1% past on both legs (DOCK §2) |
| M3 | detent snap: (0.31, ζ0.80), t90 133–142ms, 1.7% overshoot, 2%-settle 183ms + 200ms relax tail; velocity-continuous from fling v₀ | `DRAWER_SNAP` (drawer/constants.ts) on the one-table doctrine | independent scrim clocks (M9) | {0.5, 0.74} → **{≈0.32, 0.80}** (HEAD paints t90 225ms +3.2% — 60% slower, 2× bouncier) |
| M4 | overlay enter: 130–300ms blur-LED materialize, one ghost at ~0.93–0.95 scale, ≤2–3% overshoot | `enter-overlay` register on the ONE `.glass-reveal` body (curve/clock tokenized) | **the 4th register**: `.glass-top-layer` native 0.62s `@starting-style` enter (animations.css); dead `transitions.css` recipes (dialog-scale/dropdown/pop/fade-slide, 0 production consumers); `data-motion` binding attr RENAMED (collides with shipped BH.W-MOTION-AXIS; `data-motion="reduced"` is a dead attr — excise) | keep 400ms clock, fix curve (M1); scale-from 0.88 → ~0.93–0.95 overlay-class; blur-from 4 → 6–10px (blur is the dominant channel) |
| M5 | transient enter (notification/toast): gentle-class CENTER-SEED bloom — born ~11% width heavily blurred, t50 170ms, t90 300–375ms, 0% overshoot, blur trails scale ≤80ms, done ~430ms | NEW `enter-transient` rung (response ≈0.6–0.7, ζ 0.85–0.95) in the register table | Toast/Notification riding the same snappy 400ms `.glass-reveal` recipe | t90 44ms painted → 300–350ms target; scale-from ~0.5; enter:exit 3.4:1 |
| M6 | exits: capsule 100–117ms, CC modules 50–90ms, spotlight un-blur 100–130ms — **0 overshoot, iOS completes where our exit reaches t90** | `exit` register | per-surface exit literals | `--duration-fast` 200ms → **140–160ms overlay / 90–110ms transient** |
| M7 | rhythm asymmetries: surface enter:exit ≈ 3:1; backdrop blur engage:release ≈ 1:3 (the inverse) | register table (M4–M6, M8) | any symmetric one-duration-both-ways recipe | the two ratios are π-testable properties (MOTION P6) |
| M8 | backdrop blur ENGAGE 50–100ms (flick) / gesture-coupled (drag) / RELEASE 250–300ms; cancel rubber-bands ~270ms | NEW `backdrop-engage` asymmetric-pair register (overlay-pull class ONLY, one-shot, Safari-fenced) | the T9 "radius ramps with sheet translate" claim (FALSE for detented sheets — G4); any drawer blur-radius animation | no house register exists — mint; radius-ramp is Control-Center-class only |
| M9 | scrim/dim is fraction-coupled to the driving translate and reproduces its 1.7% overshoot as a luma ripple | the one-drive-scalar law (`--glass-drawer-t` precedent) | any parallel scrim `transition` | scrim reads the SAME scalar, never its own clock |
| M10 | the weight read = the 150–250ms sub-perceptual tail after 2%-band arrival (never a slow travel, never a click-stop) | motion-canon P4 + the per-spring settle clocks | clock truncation; slow-spring-as-weight tuning (the C7 disease) | encode P4 as a π property; weight ∈ {tail, deformation}, never the clock |
| M11 | global tempo: iOS is SLOWER-arriving than our painted enters and FASTER than our exits — a scalar cannot fix a shape problem | `--motion-tempo` seed = **1.0 identity** (G3 answered by measurement) | the 0.88 seeded-tighter arm | tightness comes from M1 + M6 + M3, not a global clock scale |
| M12 | app-launch zoom 230–270ms smooth deceleration, 0 overshoot | arrival class `--ease-out-expo` (expandable-container / spa-view swap) | — | ~250ms, high-ζ arrival |
| M13 | smoothness = 7 testable properties (P1 no dead frames · P2 velocity continuity · P3 one scalar/coupled channels · P4 tail · P5 overshoot discipline · P6 asymmetry ratios · P7 blur trails surfaces ≤80ms / leads backdrops) | the D-MOTION π/gate suite | vibe-based feel claims | each property is a frame-series assert |

### D — DOCK (owner: D-DOCK greenfield; SPRING_PRESETS.dock, `--dock-t`, the spine)

| # | observed behavior | ONE home | duplicates to collapse | delta |
|---|---|---|---|---|
| D1 | morph spring: response 0.25–0.32s, ζ 0.80–0.90, overshoot 1.1–1.4%, 90% travel 117–133ms, settle ≤~420ms; three independent measurements converge on ONE band | `SPRING_PRESETS.dock` via D-DOCK G8 (A/B still decides — the reference side is now a NUMBER; user-judgment item 1 stands vs the liquid-weight edict) | the arrival-cut hack in `dockMorphContext.ts` (exists to hide the ζ0.64 ~1s ring); 5 `new SpringProgress` sites → ONE `useDockSpring` | shipped (0.68, 0.64, +7.3%) → measured **(0.28±0.04, 0.82±0.06, 1–3%)**; the shipped tune is ~2.3× slower with ~6× the overshoot of the reference it cited (C7) |
| D2 | one-clock choreography: legs stagger ≤50–66ms, all land together; content adaptation (truncate/fade) rides the SAME clock; gestalt 350–420ms first-motion→rest | the plate-scoped `--dock-t` scalar | the scalar zoo (`--dock-expand-t`, `--dock-size-scale`, dock `--stretch`, `--dock-punch-stretch`), the 7-factor scale product + per-child counter-scales, the dockMorphMeasure per-swap FLIP arm | zero second timelines; CDP Layout-flat |
| D3 | the honest goo: lobe-bulge → waist **≤2 frames (17–33ms)** → clean gap; merge = contact-fillet ≤2 frames + interior ghost; content = dual-glyph double-exposure crossfade; NO taffy thread ever (C3) | RECORDED BOUND (this map + the DOCK-B harvest: static-wrapper filter pattern, focus-transfer rule) — fission itself RETIRES pending G10 census | `useDockFission` + `useDockFissionWiring` + `dockFissionSignatures` + `fission-bridge.css` + `fission-island.css` (~1,392L) + the V↔H goo bridge (~634L) — the prime Safari suspect | if fission ever re-triggers (DOCK-B bank): waist ≤2 frames @60fps, no persistent strands, PRM = instant topology swap |
| D4 | scroll-minimize trigger: direction + ≥~4px/frame sustained, latency 2–3 frames (~33–50ms); velocity-gated, not distance-accumulated | the D-DOCK chrome-STATE machine (the collapse trigger spec, whatever `useScrollChrome` becomes) | — | threshold/hysteresis unresolved (open unknown; capture ask booked) |
| D5 | geometry: stadium r = h/2 EVERYWHERE; slot pitch 206px/68.7pt; bud d = 0.8× bar height (51pt ≥ 44pt floor); inter-piece gaps 45–47px; capsule 645×137; margins 52/62; mini↔bar 22px | D-DOCK spine geometry tokens (`density.css` `--dock-scale` cascade) + D-GLASS Law 2 (the capsule register IS the fence) | the `--dock-control-safe-inset` 10% band-aid (folds into the shared `.glass-capsule` face); `--radius-{tab,control,badge,dock}` all aliasing `--radius-pill` unguarded | the triad + pitch numbers are the greenfield's binding proportions |
| D6 | plate optics: hue-preserving transmission (Δhue ≤5°), **per-pixel LOCAL bleed** (two-tone capsule — a sampled dominant hue CANNOT reproduce it, C6), mid-luma pull (dark ×2–3.6, bright −18%), texture kill −73% MODERATE, self-luminance over black L 40–66, 1–2px adaptive dark rim + 1–2px inner specular, −43% top-bottom lighting gradient | real `backdrop-filter` (the shipped ladder — PROTECT locality, never rasterize the plate to a tint) + `rim.css` inset ring; `useGlassBackdropLuminance` stays **luminance-only** | BD.W-DOCK-DEEP-TRANSMIT arm ii (dominant-hue sample) RETIRED UNBUILT; the 12 per-dock observers / 10 getImageData readbacks → one shared observer (FAM-5 W-DOCK-LUMA-SHARE) | reference dock frost ≈3–5pt vs house `--glass-blur-dock` 9px — the house is already AT/ABOVE; do NOT deepen the nav dock; the deep opt-in is media-capsule-bounded |
| D7 | press: NO visible pre-commit tint resolves at 60fps; the lens departure IS the feedback | press register bounded-control law + `--dock-control-press-bg` kept subtle | any press animation serialized BEFORE the travel | tab commit → departure ≤1 frame |
| D8 | the dock selection lens: near-unity clear window (L 84.8 vs bar 110.5) punched through the frost, swells ~1.21× pitch slightly proud in flight, rim-gated per-pixel ink wipe | the EYEGLASS register (E-block) applied to the dock tab row via `useSelectionGroup` + the ONE indicator writer | BD.W-DOCK-TAB-INDICATOR's accent-flood leg (C1 — the "flood" was a red card behind the plate) RETIRED UNBUILT; the "per-glyph scale-pop ~1.15×" (C2 — lens magnification, not a transform); the dock's plate-swap non-indicator | rest proudness is a per-surface knob (Find-My 1.14× vs Music ~flush) |

### E — EYEGLASS + LENS (owner: the BI eyeglass wave UF-H1; `--eyeglass-live-t` minted)

| # | observed behavior | ONE home | duplicates to collapse | delta |
|---|---|---|---|---|
| E1 | **TWO-REST-STATE machine**: SETTLED = inset 0.80–0.88× ink-darkened plate (−25–30% vs bar, NO ring/specular/magnification) ⇄ LIVE = proud domed loupe 1.07–1.18×; driver is TOUCH/MOTION, never backdrop sampling (TABS §7-1) | NEW `--eyeglass-live-t` state scalar — drives outset, lens engage, crown specular, luminance register (−25%→+15% vs bar) in lockstep | `useGlassBackdropLuminance`-as-driver (RESEARCH-KINEMATICS signature #5, WRONG DRIVER) — demoted to the AA legibility floor only | the two-rest-geometry fact is NEW; no house register expresses it |
| E2 | state clocks: energize ≤67ms BEFORE motion; live dwell 250–420ms post-arrival; decay 250–430ms; fully settled ~0.7s | the eyeglass wave's state clocks (tokens beside the register table) | — | PRM = state-snap, zero travel/deform frames |
| E3 | travel spring: (0.32–0.40s, ζ 0.6–0.85, overshoot 1–10%), amplitude-independent | NEW SPRING_PRESETS row (or a ζ-dip snappy variant) — the one-table doctrine; the point is UNCOVERED by the six-row vocabulary | — | snappy (0.48, 0.74, +3.2%) too slow + over-damped; dock has the give at 2× the response; measured 10% sits AT the ≤10% fence |
| E4 | **edge-asymmetric liquid arrival**: leading edge overshoots 26px = 10%, recovers ~117ms; trailing edge pours in **~270ms later**; structural settle 470–500ms — a rigid translate+scale on one clock cannot produce it | the **lead/trail two-edge driver** — ONE integrator shared with the D-PAGER worm (spring lead + critically-damped follower, τ ≈ 270ms; one rAF) | `INDICATOR_RELEASE_AT_ARRIVAL` single-switch release; the pager `--goo-t` transition-restart drive | two clocks: lead ~117ms recovery, trail ~270ms pour |
| E5 | squish: width ×1.15–1.30, height ×0.82–0.88, volume-preserving ±5% (the loupe "ducks" mid-flight) | `useLiquidFlex` (reciprocal law REFERENCE-VALIDATED) | per-surface squish caps drifting apart | `--tab-indicator-max-stretch` 1.08 → ~**1.2** for the eyeglass register (plain SegmentedTabs keeps 1.08; pager re-registers off its 1.45 taffy value into the 1.08–1.2 band) |
| E6 | loupe optics: interior magnification ×1.15–1.25 LIVE (unity settled — TABS §7-2), dark refractive ring 3–5px @ ΔL −45%, crown specular 2–3px +66% rest / +100% mid-flight, bar-edge displaced +14px at the crown | `.glass-lens`/`#glass-refract` — the ONE refraction door — gains an interior-scale term coupled to `--eyeglass-live-t`; crown specular enters the ONE `createSpecularWriter` channel (via `useSpecularPointer`'s angle leaf) | `useGlassRenderer`/`createGlassFilter` (GlassPanel's SVG second refraction path) RETIRES with GlassPanel (FAM-10); any new `--mouse-x/y` writer fork | current map is edge-only/interior-thin — under-magnifies live-state by ×1.15–1.25 |
| E7 | chromatic dispersion: real but a WHISPER — per-channel offsets ≤1pt, visible only where bright content bends at the crown | the booked W-LENSING chromatic successor | any RGB-split rim spectacle | build sub-perceptual or not at all |
| E8 | accent ink: vibrancy-COMPOSITED (no fixed hex — renders [102,253,253] over teal, [37,184,251] over dark); incoming SNAPS ≤33ms keyed to lens-cover (BEFORE settle); outgoing fades ~270ms; the rim carries NO accent hue | the eyeglass ink seam (lens-mask rim-gated wipe — the dock TAB t-0033/36 mechanism) | opacity-timer ink crossfades; the fixed "#54FBFE" claim | `--glass-accent` rim stays an OPT-IN house identity move BEYOND the reference — never eyeglass default-on |
| E9 | the stage frost: the reference tab BAR is deep-class (~94% contrast kill); the loupe needs the frosted field to lens | the eyeglass STAGE rides `.glass-deep` (16px), not the dock 9px | — | orthogonal to D-GLASS §5's button blur-MUTE (opposite direction, different cohort — fence recorded) |

### G — GLASS MATERIAL (owner: D-GLASS + the drawer detent wave)

| # | observed behavior | ONE home | duplicates to collapse | delta |
|---|---|---|---|---|
| G1 | zero fixed hue anywhere — the material is fully hue-stealing; identity = backdrop + accent ink | the transmissive ladder as shipped (warm-cream is the HOUSE identity divergence, kept deliberately) | — | — |
| G2 | thick-sheet blur σ ≈ 18.3 CSS px; hue survives vividly through deep frost (sat dilutes, hue never grays) | `--glass-blur-deep` [14–20] band | — | deep 16px = −13% of measured; an 18px re-pin sits inside the band — D-GLASS calibration call (the 20px pair stays RETIRED per BG.W-DEEP-GLASS-DECIDE); overlay 13px = −29% |
| G3 | the Maps sheet top edge is a **PROGRESSIVE graded band** — 13–40 CSS-px blur/tint ramp | NEW graded-edge-band register (mask-graded backdrop layer; Safari-safe, never `backdrop-filter: url()`) | none exists — a genuine mint | 13–40 CSS-px ramp zone |
| G4 | detent material physics: material CONSTANT during translate (engage = edge sweep ≤100ms, NO radius ramp); scrim ladder {peek 0 · half −6–7% · full content-opaque}; congeal weighted NONLINEARLY into the upper half; full ≈76% desat (sat 11.7→2.8); reversible with position, no hysteresis | `--glass-drawer-t` coupling → `--glass-level` + scrim (+ page-scale) — the drawer detent wave | `shouldScaleBackground` dead knob (wire or delete); the per-frame blur-radius write + documentElement `--stage-t` + pointermove gBCR (FAM-5 W-DRAWER-CHEAP-DRAG) — the material-constant law KILLS the per-frame blur by mandate | peek/half translucent → full lerps to the `.glass-opaque` endpoint via the ONE `--glass-level` path |

---

## §2 BD T-table dispositions (T1–T17)

| T | BD claim | disposition | owner / rationale |
|---|---|---|---|
| T1 dock morph | "no structural gap; DOCK_SPRING matches the feel" | **BI-OWNED calibration** | C7: the BD.W-ANIM-IOS27-TUNE retune (0.68/0.64) moved AWAY from the reference it cited; measured (0.28±0.04, 0.82±0.06). D-DOCK G8 A/B + the M1 emission fix. |
| T2 fission | "highest-value wave: W-DOCK-SCROLL-FISSION" | **RETIRED as a dock facility** (pending the G10 census) | D-DOCK §2.8/§7: demo-only spectacle + the prime Safari suspect (~2,026L with the V↔H bridge). The honest goo spec (D3) is the recorded bound; DOCK-B bank re-trigger named (≥2-consumer demand for multi-island choreography). C3 corrected the neck fiction. |
| T3 contextual silhouette | "drill-in recomposes the dock" | **RETIRED — premise misread** | C4: drill-in leaves the dock untouched; the back-capsule is a HEADER affordance. The only recomposition axis is scroll-minimize (D4); the active-tab-bud mapping (C8) recorded for any re-trigger. |
| T4 tab indicator | "scale-pop ×1.15 + accent-flood on commit" | **SUPERSEDED → the eyeglass-on-dock-row register** | C1: the flood was a red card READ THROUGH the plate — `--dock-accent-flood-t` retired unbuilt. C2: the pop is lens magnification. The reference-true indicator is D8/E-block; the BI eyeglass wave owns it. |
| T5 bloom-up + live-behind | confirmed | **MET on disk (engines) + numbers encoded at BI** | app-zoom 230–270ms → the M12 arrival class; the now-playing composition reconcile stays a booked demo item. |
| T6 drawer opaque-at-full | "DRAWER_SNAP {0.4, 0.82} aligned" | **BI-OWNED** (numbers were wrong) | measured (≈0.31, 0.80) t90 133–142ms/1.7% vs HEAD {0.5, 0.74} t90 225ms/+3.2%; + the G4 scrim ladder/congeal/dead-knob kill + the FAM-5 per-frame-blur kill. |
| T7 hue-bleed | "sample a dominant hue into --glass-accent" | **MET by construction on the plate; arm ii RETIRED** | C6: the bleed is per-pixel LOCAL — real `backdrop-filter` already has locality; protect it. Observer stays luminance-only. Deep arm bounded: the dock frost is MODERATE (−73%), reference ≈3–5pt vs house 9px. |
| T8 nested glass | "control pucks on the capsule = nested tiers" | **RE-SCOPED** | C5: the pucks were a sibling circle + a bare glyph; the REAL glass-on-glass is the clear lens on the frosted bar → the eyeglass wave. The puck element-level-tint verify stays a small D-DOCK check. |
| T9 backdrop-blur engage | "blur radius animates with the sheet translate" | **CORRECTED + SPLIT** | FALSE for detented sheets (material constant, edge-sweep engage ≤100ms — TABS §7-8). The true engage is the NEW asymmetric pair (M8: 50–100ms / 250–300ms), Control-Center-class only. The drawer NEVER radius-ramps. |
| T10 liquid entrance | "0.88 vol-preserving squish + spring overshoot, everywhere" | **RE-SHAPED → the D-MOTION register table** | MOTION §4: the CC layer materializes as ONE blurred ghost ~0.93–0.95, blur+fade dominant, ≤2–3% overshoot; the transient is a gentle-class center-seed bloom. The 0.88-squish grammar over-rotates scale, under-rotates blur. |
| T11 living backdrop | aurora superior | **MET/BETTERED** | per-card living-artwork stays a LOW booked item. |
| T12 marquee | aligned | **MET** (`<ScrollingText>`) | — |
| T13 carousel | "~90%, likely calm" | **OVERTAKEN — D-PAGER owns the rebuild** | the carousel is broken at HEAD (PagerDots paints EMPTY, engine-agnostic — UF-I1/SAF); the calm-overdamped content-snap law (momentum yes, bounce no) binds P3; the content barbell (Defect 2) RETIRES wholesale. |
| T14 notification capsule | "exit ≤40ms, .glass-reveal parity enter" | **CORRECTED → BI D-MOTION** | the ≤40ms was a coarse-cadence alias — measured exit 100–117ms; the enter is the M5 gentle-class bloom, not snappy parity. |
| T15 audacious type | aligned/bettered | **MET/BETTERED** | display ladder + −1.5% tracking ship. |
| T16 media-dock | demo composition | **BI-OWNED demo on the D-DOCK spine** | now with the measured D5 geometry (triad d≈0.8× bar, pitch 206px, gaps 45–47px). |
| T17 dot-flow | "density-gradient halftone rebuild, ~35%" | **LANDED as the streamline register** (BG.W-DOTFLOW-REBUILD supersedes BB.W-FLOWFIELD) | the residual halftone-vignette / content-mask judgment rides D-VIZ (with the owner-ordered aurora-pointer rider). Out of this map's motion/glass scope. |

---

## §3 THE DE-DUP ROSTER — behavior → ONE register → collapsing duplicates

The single-home table the formation folds into the wave specs. A duplicate listed here is a
DELETE/RE-POINT mandate on the owning wave, never an optional cleanup.

| # | behavior | the ONE home | collapsing duplicates (files named) |
|---|---|---|---|
| R1 | spring (response, ζ) source | `SPRING_PRESETS` (`src/composables/motion/springPresets.ts`) | the 5 dock `new SpringProgress` sites → `useDockSpring`; `useLayerTransition.ts:287`'s second spring; `useDockItemDrag`'s 7th site (D-DOCK pass-2 census); raw duration literals (the universal literal-ban, D-MOTION §2.6) |
| R2 | CSS spring painting | `regen-spring-tokens.mjs` emission (one time base) | the ~5×-compressed `linear()` stops in `scheme-spring.css`; the false tune-fence comments; symptom-chasing preset retunes |
| R3 | enter recipe body | `.glass-reveal` (`src/styles/glass/reveal.css`), curve/clock tokenized | `.glass-top-layer` 0.62s native enter (`animations.css` — the FOURTH register); dead `transitions.css` recipes (dialog-scale/dropdown/pop/fade-slide); the renamed register-binding attr (ex-`data-motion`, BH collision + the dead `data-motion="reduced"`) |
| R4 | named clocks | `motion-registers.css` (the register table: enter-overlay · enter-menu · enter-tooltip · enter-transient · exit · draw-in · press · morph · cascade · detent · backdrop-engage) | `menu.css:58` wrong clock; `menu.css:67` keyboard-lift restart; Tailwind `duration-N` template literals; per-surface clock picks in `transitions.css` |
| R5 | eyeglass state | NEW `--eyeglass-live-t` (the UF-H1 wave) | `useGlassBackdropLuminance`-as-optics-driver (demoted to AA floor); `--dock-accent-flood-t` (retired unbuilt); the phantom per-glyph scale-pop |
| R6 | refraction | `.glass-lens`/`#glass-refract` — the one door (+ live-state interior magnify term) | `useGlassRenderer`/`createGlassFilter` (GlassPanel SVG backend, sole consumer — retires with GlassPanel) |
| R7 | specular position write | `createSpecularWriter` (wrapped by `vSpecular`/`useSpecularTracking`/`useSpecularPointer`) | any new `--mouse-x/y` fork; the eyeglass crown specular ENTERS this channel (angle leaf), never a second writer |
| R8 | traveling selection indicator | `useSelectionIndicator` (promoted `useTabIndicator.ts`) under `useSelectionGroup` | reka `--reka-tabs-indicator-position` path; the CSS-anchor indicator branch in `SegmentedTabs.vue`; the dock's active-plate swap (joins the indicator); `DockTabButton`/`DockIconButton` → one `<DockControl>` |
| R9 | edge-asymmetric liquid arrival | the lead/trail two-edge driver (ONE integrator: spring lead + critically-damped follower τ≈270ms; one rAF) — shared by the pager worm AND the eyeglass release | `INDICATOR_RELEASE_AT_ARRIVAL` single switch; the pager `--goo-t` transition-restart + per-frame `getComputedStyle` read-back; `--pager-worm-duration: 1.8s` |
| R10 | volume squish law | `useLiquidFlex` (reference-validated ±5%) | the pager 1.45 taffy cap (→ 1.08–1.2 band); any per-surface reciprocal re-derivation. Caps: tabs 1.08 · eyeglass ~1.2 |
| R11 | goo/metaball paint | `GooFilter.vue` — the ONE `<defs>` mount, WORM-scoped ids only | the whole-layer pager filter (σ8/18/−7 annihilation → σ≈4/18/−6 worm-only or filter-free per D-PAGER G1); `useCarouselWorm.ts` + the content barbell (DELETE); the dock fission/morph goo bridges (retire w/ D3) |
| R12 | backdrop luminance | `useGlassBackdropLuminance` — luminance-only, ONE shared observer per route | the 12 per-dock observers / 10 `getImageData` readbacks (FAM-5); the dominant-hue sample arm (retired unbuilt) |
| R13 | hue transmission | real `backdrop-filter` per-pixel locality (the plate itself) | any rasterized sampled-tint plate (forbidden — paints WRONG on any two-color backdrop) |
| R14 | drawer detent | `--glass-drawer-t` one scalar (+ retuned `DRAWER_SNAP` {≈0.32, 0.80}) coupling glass-level + scrim + page-scale | `shouldScaleBackground` dead knob; the per-frame blur-radius write + `--stage-t` on documentElement + pointermove gBCR; independent scrim transitions |
| R15 | dock morph | `useDockSpring` + plate-scoped `--dock-t` (clip-path plate morph) | the scalar zoo (`--dock-expand-t`/`--dock-size-scale`/dock `--stretch`/`--dock-punch-stretch`); the 7-factor scale product + counter-scales (`shape.css:166-258`); the measured-endpoint FLIP arm; the arrival-cut hack |
| R16 | dock escapes (fan/menu/search) | top-layer `popover` + CSS anchor positioning | `.glass-dock-frame` escape; `overflow-clip-margin` band-aids; `railProjection.ts`'s 3×-reinvented fan math (pure projection MAY survive inside the popover, P2's call) |
| R17 | dock hover intent | the stationary state-sized hit frame (+ ~60ms dwell) | ~120L hysteresis in `useDockState.ts` (`isMorphingEdgeSweep`, `EDGE_BAND_PX`, leave-recheck) |
| R18 | surface taxonomy | `<Surface>` + `decorationClass()` (`useSurfaceAxis.ts`) | `GlassPanel` (→ Surface); the `surfaceClass(...).replace()` warts (`Card.vue:412`, `SheetContent.vue:92`, +); `--glass-bg-dialog`/`--glass-bg-sheet` rungs (→ floating/overlay); `.glass-card` alias (→ `.glass-resting`); `floating-panel.css` (0 consumers); `.glass-hero`; `veil-surface` `@utility` (→ literal); `surface="clear"` dead substrate (FAM-9 W-FOLD-CLEAR) |
| R19 | rim grammar | inset ring (`rim.css`) / masked band (`border-progress.css:61-65` recipe) — D-GLASS Law 3 | `.metal-*-border` `border-image` (`metal.css:122` — squares corners); any future border-image rim on a rounded host |
| R20 | radius grammar | Law 1 concentric relay (`--radius-ctx`/`--radius-inset`) + Law 2 capsule-vs-card + `--radius-strip` | the pill-alias free-for-all (`--radius-{tab,control,badge,dock}` = 9999px unguarded — the 10003px balloon, `segmented-tabs.css:46`); ad-hoc nested radii |
| R21 | draw-in | `.draw-rule` (`--ease-out-expo`, NO overshoot — categorically not a spring) | chrome-rule-strike on `--ease-cartoon-punch` (+22% — the user's "too bouncy"); ad-hoc divider springs. CompletionSeal/HandMark stay named MEMBERS, not re-authored |
| R22 | press | the press register, BOUNDED-CONTROL only (`--spring-press` 0.16s exists) | accordion `tap-squish` on a full-width row (`AccordionTrigger.vue:27` — the "indent"); the `transition-control` clobber; dock pre-travel press serialization (D7) |
| R23 | backdrop engage | NEW asymmetric-pair register (50–100ms / 250–300ms; CC-class only; one-shot) | the symmetric-ramp T9 claim; any drawer radius animation |
| R24 | graded sheet edge | NEW progressive graded-edge band (mask-graded, 13–40 CSS-px, Safari-safe) | none — a genuine mint |
| R25 | accent | `--glass-accent` opt-in rim (house identity) ⊥ the eyeglass vibrancy-INK choreography (snap ≤33ms in / 270ms fade out, lens-mask gated) | the accent-flood; fixed-hex accent claims; default-on accent rim for the eyeglass register |
| R26 | interruption contract | `SpringProgress` velocity-continuous re-seat (P2 measured: detents inherit fling v₀; cancels rubber-band) | CSS transition restarts anywhere a gesture can interrupt (pager, drawer, dock, eyeglass). Open capture asks: dock mid-morph reversal · eyeglass re-tap <300ms |

---

## §4 Fences + open items (binding, brief)

1. **M1 first.** No spring retune (D1, M3, E3) ships before the emission time base is fixed and
   re-verified live; the kf-side question (convention vs regen pairing bug) is a cross-repo ask
   under the foreign-tree fence.
2. **Two user-judgment items survive this map** (PASS-2 standing): G8 dock spring (reference
   0.28/0.82 vs the liquid-weight edict's 0.68/0.64 — the A/B capture decides; note the ladders
   show weight lives in the TAIL + deformation, never the clock) and the pager multi-hop
   SLIDE-vs-STRETCH. The map constrains, the user decides.
3. **Deep vs mute are different cohorts.** E9 deepens the eyeglass STAGE bar; D-GLASS §5 mutes
   the BUTTON cohort's blur a hair; D6 caps the nav-dock at its moderate frost. Three distinct,
   fenced calibrations on the same `--glass-blur-*-radius` primitive family.
4. **Retirement census (G10/inv-11)** gates every R11/R15/R16 dock deletion + GlassPanel (5
   sites / 2 repos per XR) + hover-popover (atlas EasterEgg.vue:44) — consumer probes before
   cuts, migration rows for every public-surface change.
5. **Open unknowns booked, not guessed:** fission trigger hysteresis (D4) · dock/eyeglass
   interruption witnesses (R26) · lens rest-proudness system default (D8) · LIVE→SETTLED decay
   under a held finger (E2) · bar blur σ + saturate() factor (needs a controlled still) ·
   CC radius-ramp duration (M8's true T9 case) · notification bloom island-rect FLIP vs pure
   center-scale (M5).
