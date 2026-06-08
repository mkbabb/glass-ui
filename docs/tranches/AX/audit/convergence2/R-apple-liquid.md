# R-apple-liquid — Apple Liquid Glass / squishy SOTA (convergence-2 research lane)

**Lane** SOTA-RESEARCH (G4 / D19 deepening). **Severity** research. **Verdict** augment-existing-wave (W52 material · W05 spring · W23 carousel · W42 morph substrate). **No net-new wave.**

The existing AX corpus (`docs/tranches/AX/research/liquidglass-synthesis.md` + the four `convergence/liquid-glass/*.md` files) already carries the material model and the spring physics at depth. This lane's NET ADD over that corpus is the **exact, source-confirmed Apple SOTA NUMBERS + the named idioms** the planned waves should pin to — the preset spring shapes, the `interactive()` press behavior, the tab-bar scroll-morph, and the segmented-control/carousel "morph as one liquid body" idiom — and a clean mapping of each onto the wave that consumes it. Every number below is cross-confirmed across Apple newsroom + Apple Developer docs + the SwiftUI spring references.

---

## 1. The Liquid Glass MATERIAL — Apple's exact phrasing (W52 consumer)

From the Apple newsroom announcement (2025-06) + apple.com/os, verbatim:

- *"This translucent material reflects and refracts its surroundings, while dynamically transforming to help bring greater focus to content."*
- *"Its color is informed by surrounding content and intelligently adapts between light and dark environments."*
- *"Liquid Glass uses real-time rendering and dynamically reacts to movement with specular highlights."*
- *"It combines the optical qualities of glass with a fluidity only Apple can achieve, as it transforms depending on your content or context."*
- iOS 26.x refinement: *"Updates to Liquid Glass ensure exceptional readability with more uniform refraction and improved contrast"* + *"a new slider lets you easily customize how Liquid Glass looks, from ultraclear to fully tinted."*

The decomposed material cue-stack (priority order, matching `material-design.md` §1):
1. **Backdrop blur + GENTLE saturation** (the translucency) — NOT a color-juice (the iOS-26.x "improved contrast / uniform refraction" tweak was a DIAL-DOWN, not up).
2. **A crisp thin EDGE rim** — the single strongest "this is glass" cue.
3. **A motion-tracked specular EDGE highlight** — "dynamically reacts to movement with specular highlights" = a small, off-centre, pointer/device-tracked catch-light at the RIM (a perimeter/edge phenomenon), explicitly NOT a diffuse central bloom.
4. **Refraction / lensing at the rim** — "refracts its surroundings"; iOS 26.x made it "more uniform."
5. **Adaptive tint + contrast** — color informed by content behind it; the ultraclear→fully-tinted axis; legibility floor per state.

**The cardinal SOTA correction this confirms for W52:** Apple's specular is a real-time RIM catch-light that tracks DEVICE MOTION, never a large centred screen-disc. The W52 headline (DELETE the central `circle … transparent 55%`/`screen` disc → a bounded `circle var(--glass-specular-size,36%)` edge gleam on `plus-lighter`) is the EXACT Apple idiom. The "ultraclear → fully tinted" slider is glass-ui's `--glass-tint-strength` axis (already shipped); the adaptive-contrast/backdrop-luminance darkening is the SEPARATE G2/W36 lane (not W52).

**→ W52 (liquid-glass material overhaul) consumes this.** No augment needed — W52 already prescribes the bounded-gleam / plus-lighter / saturate-tame / size-bound exactly to this idiom. This lane RATIFIES W52's direction against the primary source.

---

## 2. The SPRING SHAPES — exact Apple defaults (W05 consumer — AUGMENT)

Apple deprecated `(response, dampingFraction)` for the `(perceptualDuration, bounce)` authoring surface (iOS 17+). The SOTA preset table, **cross-confirmed** (Apple Developer docs `smooth/snappy/bouncy(duration:extraBounce:)` + GetStream + createwithswift + Amos Gyamfi):

| Preset | duration (perceptual) | bounce / extraBounce | dampingFraction (ζ) | overshoot | role |
|---|---|---|---|---|---|
| **smooth** | 0.5 s | **0.0** | 1.0 (critically damped) | none | patient settles; no overshoot |
| **snappy** | 0.5 s | **0.15** | ~0.85 | small (~+4–7%) | the iOS DEFAULT control register — "slightly underdamped, small overshoot, lively but not playful" |
| **bouncy** | 0.5 s | **0.3** | ~0.7 | clearly visible (~+15–20%) | celebratory/emphatic one-shots only |
| `.spring()` default | response **0.55 s** | — | **0.825** | small | general interactive default |
| `.interactiveSpring()` | response **0.15 s** | — | **0.86** (blendDuration 0.25) | near-instant | GESTURE/drag-follow — feels instant |

Closed-form map (already in W05 SOTA §1, confirmed): `bounce = 1 − dampingFraction`; `mass=1`; `stiffness=(2π/duration)²`; `damping=(1−bounce)·4π/duration`. **`duration` is PERCEPTUAL (time-to-the-meaningful-part), NOT settle-time** — a bouncy spring rings well past `duration`; gate on `settleThreshold`, never `duration`.

**The restraint doctrine, confirmed by the primary idiom:** iOS system controls (segmented, tab, toggle) ride **snappy (bounce 0.15)**, NOT bouncy. `bounce > 0.4` "reads too exaggerated for a UI element." Apple's own iOS 26.2 tweaks DIALED motion DOWN. High-frequency / keyboard-initiated actions are NOT animated (the press-squish is pointer-only).

**Mapping onto glass-ui's `--spring-*` registers (the W05 governance):**
- glass-ui `--spring-snappy` (~+6.8%) ↔ Apple **snappy (bounce 0.15)** — the CONTROL register. Correct.
- glass-ui `--spring-dock` (0.32, 0.7, ~+4.6%) ↔ Apple between snappy and `.interactiveSpring` — the structural-morph register. Correct.
- glass-ui `--spring-bouncy` (~+20.5%) ↔ Apple **bouncy (bounce 0.3)** — emphatic one-shots ONLY. W05's whole point is to keep this OFF high-frequency controls.
- glass-ui `--spring-smooth`/`--spring-gentle` ↔ Apple **smooth (bounce 0)** — settles.

**→ AUGMENT W05.** W05 already (a) adopts the `(duration, bounce)` authoring surface in `regen-spring-tokens.mjs`, (b) collapses the BouncyToggle press double-spring onto the CONTROL register, (c) runs the overfitting census on the 5-preset set (Apple ships THREE — `smooth/snappy/bouncy` — so glass-ui's 5 is at the edge; W05's census is the machine-enforced version of "justify each against ≥1 consumer"). The NET ADD this lane gives W05: **pin the regen PRESETS to the confirmed Apple defaults** — `smooth = (0.5s, bounce 0)`, `snappy = (0.5s, bounce 0.15)`, `bouncy = (0.5s, bounce 0.3)` — so the glass-ui registers MAP to the named Apple presets, not hand-tuned ζ values that drift. The press-squish should read the `.interactiveSpring`-class register (near-instant follow) for the gesture path and `snappy` for the release-settle.

---

## 3. The PRESS / SQUISH micro-interaction — `interactive()` (W05 §6 / W06 squish — AUGMENT)

Apple's exact phrasing: *"some elements squish and wiggle when you interact with them"*; *"When you grab an element it warps and moves as you interact with it"*; the `.glassEffect(.regular.interactive())` modifier makes the material *"respond to touch and pointer interactions in real-time"* — *"the material subtly shifts and reacts."* The light (specular) and the squish ride ONE clock (`.glassEffect(.interactive())` couples them).

The SOTA squish recipe (the corpus `liquid-squish-physics` facet + the iOS idiom), the values to pin:
- **Press scale-down:** ~0.92–0.96 (iOS button press lands ~0.96; glass-ui's `--scale-press`/`--scale-press-btn` cohort). Apple's tap is RESTRAINED — it is a settle-into, not a bounce-back-up-past-1.
- **Volume-preserving squash (the genuinely-new atom W06 surfaces):** `scale: var(--squash) calc(1/var(--stretch))` with `stretch = 1 + clamp(|velocity|·k, 0, maxStretch)`. **Cap `maxStretch` LOW (~1.06–1.10)** — Liquid Glass is restrained; `--spring-dock` is only +4.6%. The reciprocal X/Y pairing is non-negotiable or the volume reads wrong. The `velocity` ref already exists on `useSpringPress` but is currently UNUSED for deform.
- **Release:** the governed spring supplies ONE rebound (the snappy tail), never a baked `>1` keyframe stacked under a spring easing (the exact W05/D3 BouncyToggle double-spring defect).
- **Light couples to squish:** the specular intensity tracks the press in lockstep (Apple's `.interactive()` = light + squish on one clock) — glass-ui ties `--glass-specular-intensity-*` to the press spring.

**→ AUGMENT W05 (the BouncyToggle/press-keyframe MOTION-SHAPE arm) + W06 (the dock press-squish atom).** The single iOS squish track `scale(1)→scale(--scale-press)→scale(1)` eased on CONTROL `--spring-snappy` is EXACTLY Apple's restrained press; the volume-preserving squash is the W06 derivation. Light-couples-to-squish folds into W52's specular-tracks-press lockstep. No net-new wave.

---

## 4. The SEGMENTED-CONTROL / TAB / CAROUSEL morph idiom (T-tabs waves + W23 carousel — AUGMENT)

Apple's exact phrasing on navigation:
- *"In iOS 26, when users scroll, tab bars shrink to bring focus to the content while keeping navigation instantly accessible. The moment users scroll back up, tab bars fluidly expand."*
- Controls *"give way to content and dynamically morph as users need more options."*
- iOS 26 carousel idiom (NN/g + the live-product reports): *"carousel dots quietly morphing into the word Search after a few seconds. Tab bars bubble and wiggle when switching views."*
- The fusion idiom: `GlassEffectContainer(spacing:)` + `glassEffectID(_:in:)` + `.glassEffectTransition(.matchedGeometry)` — *"Elements within a specified spacing distance visually blend and morph together during transitions"* / *"glass materials flow from one shape to another, maintaining their material properties."*

The decomposed SEGMENTED-CONTROL / TABS idiom (the T1/T2 ask — default tabs → the bouncy spring-slider; offer underline + pill):
- The active-indicator is a **single liquid body that glides + squishes** between segments on the CONTROL register (snappy ~bounce 0.15), NOT a crossfade. glass-ui's BouncyTabs `inset` glide on `--spring-snappy` (post-W05) is the right substrate — but the NAME "Bouncy" mis-signals PLAYFUL when the idiom is CONTROL/snappy (T2: drop the "Bouncy" prefix, one animation across tabs).
- On SELECT, the indicator squishes (a brief width/scale flex) into the new segment — the "controls insist on animating themselves" Apple register, kept RESTRAINED.
- The pill/underline/segmented are ONE component with a `variant` axis (T1/T3), the indicator-morph shared across all three.

The CAROUSEL idiom (P5: "more Apple-like + glassy, the liquid/squishy carousel"; W23 consumer):
- The carousel page-indicator is a **liquid pill** — the dots are a single glass body where the active dot stretches/morphs (the "dots morphing into Search" idiom is the same liquid-pill substrate), NOT discrete dots.
- Slide-to-slide on the `.interactiveSpring` gesture-follow register (drag tracks the finger) → settle on snappy. The squish-on-overscroll is the elastic edge.
- The indicator/scrubber is a glass body that morphs between dot-row and progress-bar states (the W23 "glass-scrubber decision").

**→ AUGMENT the T-tabs wave family (T1/T2/T3 — the tabs/toggle/responsive-tabs consolidation) + W23 (carousel indicator reauthor).** The tabs waves should pin the active-indicator glide+squish to `--spring-snappy` (CONTROL, the confirmed iOS segmented register), drop "Bouncy" from the name, and unify pill/underline/segmented under one `variant` axis with a shared liquid indicator. W23 should adopt the liquid-pill page-indicator (single morphing glass body) + the `.interactiveSpring` drag-follow + snappy settle. The cross-element FUSION (dots↔Search, indicator morph) is the `useLiquidMorph`/`MorphGroup` substrate (W42) via the `glassEffectID`/`view-transition-name` route seam — NOT a per-component hack. These are augments; no net-new wave.

---

## 5. The morph SUBSTRATE — `useLiquidMorph` ↔ `GlassEffectContainer` (W42 — already planned)

The Apple morph API surface, confirmed:
- `.glassEffect()` (material) · `.glassEffect(.regular.tint(c).interactive())` (interactive material) · `.glassEffect(in: .rect(cornerRadius:))` (shape) · `GlassEffectContainer(spacing:)` (the shared-sampling group — "blend as one cohesive material") · `glassEffectID(_:in:namespace)` (matched-geometry id) · `.glassEffectUnion(id:namespace:)` (morph as one piece) · `.glassEffectTransition(.matchedGeometry)`.

This is the DIRECT web transposition the corpus already names: `useLiquidMorph` (per-element driver, one `@property`-registered `--morph-t` scalar) + `MorphGroup`/`provideMorphGroup({spacing})` (the `GlassEffectContainer` analog) + the `morphId` → `view-transition-name` route seam (the `glassEffectID` analog). The decision boundary is firm: **self-reshape → single-scalar spring (no VT); element-to-element/route → View Transitions named element; surface fusion (≤spacing) → gooey SVG filter.** Apple's `GlassEffectContainer(spacing:)` "glass cannot sample glass / one shared sampling region" rule = glass-ui's "one orchestrator per dock" (W02).

**→ Already planned in W42 (liquid-morph substrate).** This lane confirms the API-shape parity (GlassEffectContainer/glassEffectID/glassEffectUnion ↔ MorphGroup/morphId) and that the tabs-indicator + carousel-indicator fusion are W42 CONSUMERS, not bespoke per-component animations. No augment to W42's plan needed beyond noting tabs/carousel as additional first consumers.

---

## DEDUP summary (which wave consumes each idiom)

| Apple SOTA idiom | Confirmed value/recipe | glass-ui wave | Verdict |
|---|---|---|---|
| Refracts/translucent material, rim specular tracks motion, adaptive tint, "ultraclear→fully tinted" | bounded edge gleam, NOT central disc; gentle saturate; rim+blur+under-shadow; `plus-lighter` | **W52** | RATIFY (W52 already prescribes exactly this) |
| `(perceptualDuration, bounce)` preset shapes | smooth(0.5s,0)/snappy(0.5s,0.15)/bouncy(0.5s,0.3); `.spring()`=(0.55,0.825); `.interactiveSpring()`=(0.15,0.86,0.25); `bounce=1−ζ`; gate on settleThreshold | **W05** | AUGMENT — pin regen PRESETS to the confirmed Apple defaults; keep set small (Apple ships 3) |
| `interactive()` press squish + light-on-one-clock | press scale ~0.96; volume-preserving squash `scale(--squash, 1/--stretch)`, maxStretch ~1.06–1.10; ONE governed rebound; specular tracks press | **W05** (MOTION-SHAPE arm) + **W06** (squish atom) + **W52** (specular-press lockstep) | AUGMENT |
| Tab/segmented active-indicator glides+squishes (CONTROL, not crossfade); scroll shrink/expand | snappy (bounce 0.15) indicator glide; drop "Bouncy" name; pill/underline/segmented = one `variant` axis | **T-tabs (T1/T2/T3)** | AUGMENT — pin indicator to `--spring-snappy`, unify under one component |
| Liquid-pill carousel indicator, `.interactiveSpring` drag-follow, dots↔Search morph | single morphing glass body; gesture-follow (response 0.15) → snappy settle; elastic overscroll | **W23** (carousel reauthor) | AUGMENT — adopt liquid-pill indicator + drag-follow register |
| `GlassEffectContainer`/`glassEffectID`/`glassEffectUnion` shape fusion | one orchestrator/spacing group; matched-geometry id; `view-transition-name` route seam | **W42** (liquid-morph substrate) | already planned — tabs/carousel are W42 consumers |
| Adaptive backdrop-luminance darkening for legibility (G2) | dynamic contrast aware of content behind | **W36 / a G2 lane** | NOT W52 — separate adaptive-legibility concern |

**No net-new wave warranted.** Every Apple idiom maps cleanly onto an existing wave; the lane's contribution is the confirmed NUMBERS (the preset bounces, the press scales, the interactiveSpring follow register) + the dedup mapping that keeps tabs/carousel/squish folding into W05/W06/W23/W42/W52 rather than minting parallel animation paths.

## Sources

- [Apple newsroom — "delightful and elegant new software design" (2025-06)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [apple.com/os](https://www.apple.com/os/)
- [SwiftUI snappy(duration:extraBounce:) — Apple Developer](https://developer.apple.com/documentation/swiftui/animation/snappy)
- [SwiftUI smooth(duration:extraBounce:) — Apple Developer](https://developer.apple.com/documentation/swiftui/animation/smooth(duration:extrabounce:))
- [SwiftUI bouncy(duration:extraBounce:) — Apple Developer](https://developer.apple.com/documentation/swiftui/animation/bouncy(duration:extrabounce:))
- [Understanding Spring Animations in SwiftUI — createwithswift](https://www.createwithswift.com/understanding-spring-animations-in-swiftui/)
- [GetStream/swiftui-spring-animations](https://github.com/GetStream/swiftui-spring-animations)
- [Amos Gyamfi — Learning SwiftUI Spring Animations](https://medium.com/@amosgyamfi/learning-swiftui-spring-animations-the-basics-and-beyond-4fb032212487)
- [Mastering iOS 26's Liquid Glass: A Developer's Handbook (glassEffect APIs)](https://medium.com/@jaikrishnavj/mastering-ios-26s-liquid-glass-a-comprehensive-developer-s-handbook-2bba9965b024)
- [Liquid Glass Is Cracked — NN/g (carousel/tab-bar live behavior)](https://www.nngroup.com/articles/liquid-glass/)
- [Applying Liquid Glass to custom views — Apple Developer](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views)
