# Apple iOS 26/27 "Liquid Glass" — Web-SOTA Research Corpus (BC iteration 1)

Assignment: web-SOTA research on Apple's Liquid Glass (iOS 26, refined in 26.1/iOS 27) + apple.com primitives, mapped to BC bands **1 (glass)**, **3 (tabs)**, **7 (motion)**, with TARGET numbers the waves bake.

Sources fetched (11): Apple Newsroom 2025-06 announcement; WWDC25 session 219 "Meet Liquid Glass" (via search digests); conor.fyi / LiquidGlassReference (the canonical community SwiftUI reference); kube.io "Liquid Glass in the Browser: Refraction with CSS and SVG" (the definitive refraction math); nilcoalescing + Amos-Gyamfi spring manifesto + GetStream swiftui-spring-animations (spring constants); Donny Wals "Exploring tab bars on iOS 26"; natashatherobot "Anatomy of a LiquidGlass Button"; kevinbism "Recreating Apple's Liquid Glass with pure CSS"; supercharge.design UX analysis. URLs in the §Sources block.

---

## 1 — The Liquid Glass MATERIAL model (BC Band 1: glass)

### 1.1 What Apple's material actually is (the canonical model, WWDC25 §219)

Apple's Liquid Glass is **NOT a blur**. It is **real-time lensing**: "dynamically bends and concentrates light, creating a transparent and lightweight appearance while providing definition against background content." The material has five mechanisms (conor.fyi reference, WWDC §219):

1. **Lensing (refraction)** — light bends + concentrates at the EDGES (the rim), thin in the interior. This is the opposite of a uniform blur; it is an edge-concentrated displacement.
2. **Specular highlights** — bright catch-light that responds to device motion ("specular highlights responding to device motion"). On the web, a static angle-keyed gleam approximates it.
3. **Adaptive shadows** — "Shadow opacity increases over text, decreases over white backgrounds" (the shadow is the legibility-separation device, not a decoration). "As text scrolls underneath, shadows become more prominent to create additional separation."
4. **Adaptive tint** — "color is informed by surrounding content and intelligently adapts between light and dark environments." THE legibility rule (verbatim): **"The amount of tint and the dynamic range shift to always ensure buttons remain legible, while letting as much of the content through as possible."**
5. **Materialization** — "objects materialize in and out by gradually modulating the light bending and lensing" — i.e. the open/close animation drives the REFRACTION amount, not just opacity.

**The two variants** (Apple's `Glass.regular` / `Glass.clear`):
- `.regular` — medium transparency, full adaptation, the default for toolbars/buttons/nav/cards.
- `.clear` — high transparency, used ONLY over media-rich bright content, REQUIRES a dimming layer underneath.
- (iOS 26.1 / "iOS 27" added a user-level **Clear ↔ Tinted** toggle — a global firmness preference, NOT a per-surface API.)

**Glass-on-glass rule** (the morph constraint): "Glass cannot sample other glass; the container provides a shared sampling region." Nested glass must share ONE sampling context (the `GlassEffectContainer`) — directly relevant to glass-ui's nested-glass tint cascade.

### 1.2 The refraction MATH (kube.io — the definitive web spec, and the one glass-ui already adopted)

The displacement-map refraction is built from four surface profiles; Apple's preferred is the **convex squircle**:

```
Convex Circle:    y = √(1 − (1−x)²)          (harsh interior transition)
Convex Squircle:  y = ⁴√(1 − (1−x)⁴)         ← Apple's preferred smooth profile
Concave:          y = 1 − Convex(x)          (divergent rays)
Lip:              y = mix(Convex, Concave, smootherstep(x))  (rim + dip)
```

- **Refraction (Snell-Descartes):** `n₁·sin(θ₁) = n₂·sin(θ₂)`, with `n₁ = 1` (air), **`n₂ = 1.5` (glass, Apple's preferred value)**, single refraction event.
- **Channel encoding:** `R = 128 + x·127`, `G = 128 + y·127`, `B = 128` (unused), `A = 255`. Neutral 128 = no shift; `0 → −scale`, `255 → +scale`.
- **feDisplacementMap scale = maximumDisplacement** (the normalized vectors re-scaled to pixel shifts). kevinbism/kube use **scale ≈ 28px** for a card-radius surface; glass-ui's W-LENSING bakes `scale='28'`.
- **Specular highlight layer:** a separate `feImage` rim-light blended via `feBlend screen`. Designer-exposed params: **Specular Opacity 0.2–0.5, Specular Saturation 4–9.**
- **Sampling resolution:** 127 ray samples along one radius (8-bit channel constraint, 256 values).
- **No chromatic aberration** in Apple's web-replica spec (only R/G x/y displacement; an RGB-split rim is a "booked successor" both in kube.io and in glass-ui).
- **CRITICAL LIMITATION (cross-engine):** `backdrop-filter: url(#…)` SVG-filter is **Chromium-ONLY** (WebKit bug 245510 OPEN, Firefox not shipping). So the full lens is Chrome-only; **Safari/Firefox get the un-filtered blur+tint base.** This is the binding cross-engine fact for D7/D5 (Safari).

### 1.3 The pure-CSS approximation values (kevinbism — the floor when SVG-filter is unavailable)

```css
.glass {
  background: rgba(255,255,255,0.15);           /* 15% white translucency */
  backdrop-filter: blur(2px) saturate(180%);    /* note: LOW blur, HIGH saturate */
  border: 1px solid rgba(255,255,255,0.8);      /* BRIGHT rim, not dark */
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(31,38,135,0.2),   /* outer depth */
              inset 0 4px 20px rgba(255,255,255,0.3); /* INSET WHITE top highlight */
}
```
The community range for a "realistic glass lens" is **blur 10–20px + saturate 150–180% (or brightness 1.1)** — saturation is the load-bearing term, blur is moderate. The recurring rim motif: **a bright white inset highlight on the TOP edge** (`inset 0 4px 20px rgba(255,255,255,0.3)` / `inset 0 1px white`), NOT a dark hairline. This is the D2 root.

### 1.4 The glass-ui HEAD state vs the SOTA (Band 1 gaps)

| axis | glass-ui HEAD (measured) | Apple/SOTA target | gap |
|---|---|---|---|
| blur (calm floating) | `--glass-blur-floating-radius: 13px`, saturate 1.18 (`tokens/glass.css:78,113`) | regular ≈ blur 14–20 / saturate 1.5–1.8 | calm is intentionally dialed-back (W-GLASS-CAL, INVIOLATE) |
| blur (deep, opt-in) | `--glass-blur-deep-radius: 16px`, saturate 1.5 (`glass-deep.css:38`) | Apple home nav blur 20 / saturate 1.8 | deep tier in-band but conservative; full 20px booked |
| rim RING | white catch-light `inset 0 0 0 0.75px hsl(0 0% 100% /0.18)` (`glass-fx.css:56`) | bright top catch-light ✓ | CORRECT — keep |
| rim BORDER | uniform warm-ink `color-mix(in srgb, --foreground 11–19%, transparent)` ALL sides incl. TOP (`glass.css:191-194`) | bright top, subtle dark bottom only | **D2 BLACK BAR ROOT** — the warm-ink top border reads as a dark hairline over light glass |
| adaptive tint AA | `--glass-tint-strength-aa: 20%` light / `12%` dark (`glass-fx.css:136`, `dark-arm.css:266`); content-tier floor `4%` (`glass-fx.css:153`) | dynamic, ≤24% iOS clamp | bounded correctly; the OBSERVER doesn't drive it (D1) |
| luma observer | `useGlassBackdropLuminance` writes `--glass-backdrop-luma` + discrete `--glass-backdrop` bucket; **`--glass-backdrop-luma` declared empty at `glass-fx.css:123`, read by NOTHING as a continuous driver** | continuous per-frame adaptation | **D1 ROOT — the loop is OPEN; the luma is decorative** |
| lensing | W-LENSING squircle `⁴√(1-(1-x)⁴)`, n=1.5, scale=28 baked (`glass-refract.css`) | ✓ canonical | CORRECT math, but `:active` swell DROPPED (CSS var-in-url() limit) + Chromium-only |

### 1.5 D1 — the adaptive-observer loop (the grey-slab root)

The grey-slab regression (D1) is the **unconditional 20%-AA darken** firing where it should not + the **observer's numeric luma being unread**. The fix path (already partly pre-staged at e1b4b44c, 4% floor):
- The full AA darken on a content tier must fire ONLY under the BRIGHT bucket (`@container style(--glass-backdrop: light)`), which IS the shape at HEAD (`ladder.css:154-155`). The dock/overlay band self-darkens unconditionally (correct — floats over unknown).
- **The missing half: close the loop.** `useGlassBackdropLuminance` writes `--glass-backdrop-luma` (0..1) but the CSS reads only the discrete `--glass-backdrop` bucket. SOTA Apple "shifts the dynamic range" CONTINUOUSLY. TARGET: make the AA strength a `calc()` function of `--glass-backdrop-luma` — e.g. `--glass-tint-strength: calc(var(--glass-tint-strength-floor) + (var(--glass-tint-strength-aa) − var(--glass-tint-strength-floor)) * var(--glass-backdrop-luma, 0))` so a brighter sampled backdrop darkens MORE, smoothly, the way iOS does. This converts the observer from decorative to load-bearing (D1's "luma is read, not decorative" acceptance in ORCHESTRATION Band 1).

### 1.6 D2 — the black bar (the card-top dark rim)

Root: `--glass-border-{wash,quiet,resting,floating}` is `color-mix(in srgb, var(--foreground) 11/13/16/19%, transparent)` — a UNIFORM warm-ink hairline on all four sides. Over light glass the TOP edge reads as a dark bar (the user's "wtf is this black bar"). Apple's model: **top edge = bright catch-light (the inset-white highlight), bottom = subtle shadow; the dark never sits on the top.** The rim RING (`--glass-material-rim`, white 0.18α) is already correct; the BORDER is the offender. TARGET options: (a) make the border DIRECTIONAL — drop/lighten the top-border ink, keep a faint bottom (a `border-image` or a two-stop `box-shadow` pair: `inset 0 1px 0 hsl(0 0% 100%/0.3)` top catch-light + `inset 0 -1px 0 hsl(0 0% 0%/0.06)` bottom shadow), retiring the uniform `--glass-border-*` ink-on-top; (b) at minimum cut the top-border alpha to ≤4% and lift the white catch-light. This is BC.W-BLACK-BAR / D2 root.

### 1.7 Band-1 PRUNE (the user's "why so many glass duplicates")

The user demands **two registers: Glass CARDS + Glass MATERIALS** (USER-DEFECTS §D). Apple has exactly two material variants (`.regular`/`.clear`) over ONE material. glass-ui HEAD has `glass-panel` (rimless), `glass-card`, the 5-rung `--glass-*` ladder (wash/quiet/resting/floating/overlay), `glass-deep`, `glass-opaque`, `veil`. The SOTA precedent supports collapsing to: a **MATERIAL** (the tier ladder = the variable-firmness `.regular`/`.clear` analogue, opacity+blur+tint) and a **CARD** (the material on a content surface with padding+radius). `glass-panel` (rimless) folds onto `<Card surface="veil">` or the material directly. This is BC.W-GLASS-PRUNE — the SOTA backing is "Apple ships ONE material, TWO variants" (conor.fyi).

---

## 2 — The LIQUID animation choreography (BC Band 7: motion)

### 2.1 The materialize/open choreography (the coupled scale+fade+blur-settle)

Apple: "objects materialize in and out by gradually modulating the light bending and lensing." The open is NOT a flat zoom-95. It is **three coupled channels** on the SPATIAL/EFFECTS split:
- **SPATIAL** (scale + translate from the trigger/anchor) on a spring with iOS overshoot.
- **EFFECTS** (opacity fade + a `filter: blur(Npx)→0` "decongest" settle + the lensing amount ramping in) on a no-overshoot ease.
- **transform-origin at the anchor edge** (the bloom-from-source — `var(--reka-popper-transform-origin)`).

glass-ui HEAD already encodes this exactly in `.glass-reveal` (BB.W-LIQUID-REVEAL) — SPATIAL on `--spring-snappy` + `--spring-snappy-duration`, EFFECTS on `--ease-out`, `filter: blur(4px)→0`, transform-origin at the anchor. This is SOTA-correct; the gap is whether it actually PAINTS on the reka portaled overlays (the BC "source-green/visually-broken" disease — verify the paint, BC Band 0).

### 2.2 The canonical SwiftUI spring vocabulary (the TARGET numbers for keyframes.js)

The three Apple presets, ALL default to `duration: 0.5s, extraBounce: 0.0` and differ only by `extraBounce` (Apple API; conor.fyi; GetStream):

| preset | duration | extraBounce | dampingFraction (derived) | overshoot | use |
|---|---|---|---|---|---|
| `.smooth` | 0.5s | 0.0 | 1.0 (critically damped, NO overshoot) | 0% | entrances, fades, scale-ins |
| `.snappy` | 0.5s | 0.15 | ≈0.85 | small (~5-7%) | crisp position morphs, controls, the LIVELY default |
| `.bouncy` | 0.5s | 0.30 | ≈0.70 | clear (~15-20%) | emphatic one-shots, playful |
| `.interactiveSpring` | response 0.15s | — | 0.86, blendDuration 0.25 | tiny | press/drag, mid-gesture |

**The bounce↔damping formula (Apple's official, corrected on the Developer Forum):**
```
mass      = 1
stiffness = (2π / perceptualDuration)²
damping   = ((1 − bounce) × 4π) / perceptualDuration      [for bounce ≥ 0]
⇒ dampingFraction ζ = damping / (2·√(stiffness·mass)) = 1 − bounce
```
So **ζ = 1 − bounce**: smooth ζ=1.0, snappy ζ=0.85, bouncy ζ=0.70. And SwiftUI **"duration" ≈ "response"** (the perceptual settle; `response` is the same axis). The `interactiveSpring` (response 0.15, ζ 0.86) is the iOS PRESS/DRAG register.

### 2.3 glass-ui HEAD spring presets vs Apple (Band-7 gap)

glass-ui `SPRING_PRESETS` (`springPresets.ts:51-77`):

| glass-ui | response | ζ | Apple analogue | delta |
|---|---|---|---|---|
| smooth | 0.5 | 0.86 | .smooth (0.5/1.0) | glass-ui's smooth has a faint overshoot (ζ0.86 vs Apple's critically-damped 1.0) — DELIBERATE sub-perceptual "alive" peak |
| snappy | 0.35 | 0.65 | .snappy (0.5/0.85) | **glass-ui snappy is FASTER (0.35 vs 0.5) and BOUNCIER (ζ0.65 vs 0.85 → overshoot ~+6.8% vs Apple's ~small).** Within iOS family but more energetic |
| bouncy | 0.5 | 0.45 | .bouncy (0.5/0.70) | **glass-ui bouncy overshoots ~+20.5% vs Apple's ~15%.** More playful — verify it doesn't read as "abrupt"/over-springy (BC.W-SPRING-EASE) |
| gentle | 0.7 | 1.0 | (critically-damped patient) | matches .smooth-at-0.7 |
| dock | 0.32 | 0.7 | iOS-control settled, ~+4.6% | tight + crisp; good for the dock morph |

Generated `--spring-*-duration` clocks (the 2%-band settle, `scheme-motion.css:242-245`): smooth 0.36s, snappy 0.34s, bouncy 0.69s, gentle 0.44s. **TARGET for BC.W-SPRING-EASE:** the user wants "squishy/quick/coupled-fade, the abrupt curves EASED." The candidate retune is to nudge glass-ui's springs TOWARD Apple's measured family where a curve reads abrupt — specifically the **bouncy** (ζ0.45 → ~0.55-0.60 to land overshoot in the Apple 12-18% band) and a **press register** at Apple's `interactiveSpring` (response 0.15, ζ 0.86) for the button/control press (glass-ui's `--scale-press: 0.96` is the magnitude; the spring is the missing physics). Keep snappy fast (the user wants "quick"), but ensure the EFFECTS leg is coupled (P3 fade-coupled-to-transform).

### 2.4 The ease curves (the EFFECTS/exit legs) — SOTA-correct at HEAD

glass-ui's `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` (`scheme-motion.css:252`) is the SOTA "bold-decelerating arrival" curve (the house expo; the value.js easeOutExpo twin). `--ease-out: cubic-bezier(0,0,0.2,1)` is the no-overshoot exit (Material/Apple decelerate). These are correct — the canon NAMES them (BB.W-MOTION-CANON). The exit must NEVER overshoot past gone (P2). No change needed; the gap is APPLICATION (the abrupt curves the user flagged are likely the spring presets or un-coupled fades, §2.3).

### 2.5 Press/interactive — the iOS touch model

Apple `.glassEffect(.regular.interactive())`: scale-on-press + bounce + **shimmer + touch-point illumination radiating to nearby glass** (the gleam follows the touch, brightening). glass-ui HEAD: `--scale-press: 0.96` / `--scale-press-btn` / `--scale-press-dock` (`scale-paper.css:24-26`), `--scale-hover-btn: 1.05`, `--scale-hover-dock: 1.1`, plus the specular gleam tracking the pointer (`createSpecularWriter` / W-LIQUIDHOVER). The structure matches Apple. **TARGET:** drive the press SCALE on a spring (the `interactiveSpring` 0.15/0.86), couple a brightness/specular bump to the `--*-press-t` 0..1 drive (P3), and ensure the gleam illuminates ON PRESS (the touch-illumination). glass-ui's `useSpringPress` + `useLiquidPress` already factor this (BB.W-PRESS-UNIFY) — verify it PAINTS.

---

## 3 — Tabs / segmented controls (BC Band 3: tabs)

### 3.1 The iOS 26 tab-bar model (Donny Wals + WWDC)

- **Floating capsule** — the tab bar is a floating Liquid-Glass capsule (not edge-to-edge). The active tab is a glass PILL inside it.
- **Scroll-minimize:** `.tabBarMinimizeBehavior(.onScrollDown)` — on scroll-down the bar "shrinks into a compact floating capsule," giving content room; expands on scroll-up. (Apple: tab bars "fluidly expand when users scroll up" — "a lively experience.")
- **Morph, not fade:** "The glass doesn't just fade; it physically morphs from one shape to another, maintaining the translucent material throughout the animation." The active pill MORPHS to the tapped tab's location, maintaining glass the whole way.
- **GlassEffectContainer spacing** — when two glass elements get within `spacing`, they "visually blend and morph together" (the signature liquid merge). Morph animation: `withAnimation(.bouncy(duration: 0.35))` in Apple's own examples.
- **Material:** `.regular` glass capsule; corners are `.capsule` (stadium) or `.containerConcentric` (radius follows the container, never an arbitrary corner).

### 3.2 The "liquid tab pull" (the user's headline Band-3 ask)

The user wants: **"pull an active tab → it morphs, squishes, to the current location"** (the iOS-27 facility). The iOS interactive model: the pill follows the finger ~1:1, stretches along travel by velocity (volume-preserving squish, capped LOW), and on release flings velocity-continuously to the nearest tab, settling with a small overshoot. This is EXACTLY glass-ui's `useDragMorph` (BB.W-DRAG-MORPH) + the `:draggable` SegmentedTabs axis — the architecture exists; the gap is the MATERIAL (the pill must read as iOS glass, not flat) + the paint.

### 3.3 glass-ui HEAD tabs vs SOTA (Band-3 gaps)

| axis | glass-ui HEAD (measured) | iOS-27 target | gap |
|---|---|---|---|
| track material | `--glass-bg-quiet` + hairline (`segmented-tabs.css:53`) | glass capsule | OK material, but the user says "NOT pills, squared / not glassy / reka-like" — likely the RADIUS + the rim |
| active pill | `--glass-bg-floating` plate (`segmented-tabs.css:83`) — "selected reads as glass" tier ABOVE the track | glass pill forward of track | CORRECT register; verify it PAINTS as a pill not a flat fill (D4) |
| pill SHAPE | varies (not capsule-locked) | **PROPER SMALL PILLS, not squared** (user verbatim) | **TARGET: capsule/stadium radius on the pill (border-radius: 9999px / --radius-pill), small + rounded, NOT the squared shadcn look** |
| glide spring | `--spring-snappy` at `--tab-indicator-duration` (= `--spring-snappy-duration` ≈0.34s) | .bouncy(0.35) / snappy | matches |
| squish cap | `DEFAULT_INDICATOR_MAX_STRETCH = 1.08` (≈+8%), release at `INDICATOR_RELEASE_AT_ARRIVAL = 0.82` (`tabs/constants.ts`) | volume-preserving, capped LOW | SOTA-correct (Material/iOS release-at-arrival) |
| drag-to-morph | `useDragMorph` + `:draggable` (BB.W-DRAG-MORPH), snappy response 0.35/ζ0.65 | iOS pull-morph-squish | architecture EXISTS; verify paint + material |
| not-reka/shadcn | the active arm paints a glass plate | NOT a flat `bg-accent` | the user reads it as flat — likely D4 (the rim/material not rendering) |

**TARGET for BC.W-TABS-IOS:** lock the pill to a CAPSULE radius (`--radius-pill` / 9999px), small proportioned padding (the value.js demo pills the user cites are small + fully rounded), the active pill as the `--glass-bg-floating` iOS glass tier WITH the white catch-light rim (not the dark D2 border), and the whole strip glassy (the track `--glass-bg-quiet` reading the W55 tint seam). The glide stays on snappy ≈0.34s (matches Apple's `.bouncy(0.35)`). The squish stays at +8% cap. BC.W-LIQUID-TAB is the `useDragMorph` paint-verification + material upgrade.

---

## 4 — Buttons (the "increased button glass-morphism" ask, BC Band 1)

### 4.1 The iOS 26 button anatomy (natashatherobot + conor.fyi)

- **It is GLASS ON TOP of its background** — "white on white will be more white" (the material composites the backdrop UP, never an opaque fill).
- **`.glass`** — subtle white translucent background, minimal prominence.
- **`.glassProminent`** — blue-TINTED background by default, more assertive (the CTA register).
- **Prominence = tint saturation + background opacity, NOT size** (the legibility-preserving hierarchy: the tint conveys "primary action," contrast stays ≥4.5:1).
- **Tint conveys SEMANTIC meaning** ("primary action, state — NOT decoration; selective, call-to-action only") — directly aligns with glass-ui's `--glass-accent` per-instance axis.
- **Press:** `.interactive()` → scale + bounce + shimmer + touch-illumination ("much more fun when pressed").
- **Shape:** `.capsule` default; circular buttons need explicit `.clipShape(Circle())` so the glass respects the boundary.
- **Corner radius:** system-enforced concentric — "containers with specific corner radii can no longer be overridden freely... concentric corners and visual consistency."

### 4.2 glass-ui HEAD buttons vs SOTA (Band-1 gap)

glass-ui HEAD: `default` variant IS glass (AX.W54), `solid` is the opaque escape, `primary-audacious` is the calm glass CTA (`glass-wash btn-glass`), `gold-audacious` the warm-gold tint. The W-BUTTON-GLASS surface re-points hover/active fills onto the element-level oklab-tinted pair (reaches the W55 seam). The press composes `useSpringPress` (response 0.25, ζ 0.7) + `useLiquidFlex` squish. The gleam tracks via `useSpecularTracking`.

**Gaps vs Apple:**
- The button is structurally aligned (glass-on-background, tint=prominence, press-spring, gleam). The user's "increase glass-morphism for buttons" → the button blur/saturate should read RICHER. HEAD `--glass-blur-btn` = `--glass-blur-quiet-radius` (8px) saturate 1.05 — quieter than even the calm floating tier. **TARGET:** lift the button glass toward the floating tier (blur 10-13, saturate 1.18) or the deep tier on the hero CTA (`:liquid` opts into `.glass-lens`), so a glass `<Button>` reads as MORE glass. Keep the press-spring on the iOS `interactiveSpring` (0.15/0.86).
- The D2 dark-rim afflicts buttons too (the uniform `--glass-border-*` ink) — fix in lockstep with the card rim.
- The `.glassProminent` blue-tint precedent backs glass-ui's `--glass-accent` as the prominence vehicle (a CTA glows with its accent hue at a bounded strength while staying ≥4.5:1).

---

## 5 — The concrete spec params to TARGET (the bake table)

The numbers BC waves should bake, with the current HEAD value beside each:

### Glass material (Band 1)
| param | HEAD | TARGET (SOTA) | note |
|---|---|---|---|
| regular/calm blur | floating 13px / sat 1.18 | keep (W-GLASS-CAL inviolate) | the calm default is the user's "a hair too much" call |
| deep blur | 16px / sat 1.5 | push toward 18-20 / 1.6-1.8 IF budget clears | Apple home nav = 20px / 1.8 |
| button blur | 8px / sat 1.05 | lift to 10-13 / 1.18 | "increase button glass-morphism" |
| rim RING (top catch-light) | white 0.18α light / 0.22α dark | keep | correct |
| rim BORDER | warm-ink 11-19% uniform | top ≤4% / bright catch-light top, faint shadow bottom | **D2 fix** |
| tint AA strength | 20% light / 12% dark, ≤24% | keep bounded; drive by luma | iOS clamp ≤24% |
| tint floor (calm content) | 4% | keep | sub-perceptual whisper |
| lensing | squircle n=1.5 scale=28 | keep math; restore press-swell if platform allows | Chromium-only (Safari floor = blur+tint) |
| specular opacity | (gleam, plus-lighter) | 0.2-0.5 band | Apple/kube |
| specular saturation | — | 4-9 band | Apple/kube |

### Springs (Band 7) — bake into keyframes.js SPRING_PRESETS
| preset | HEAD (resp/ζ) | Apple (resp/ζ) | TARGET |
|---|---|---|---|
| smooth | 0.5 / 0.86 | 0.5 / 1.0 | keep (deliberate alive-peak) or → 1.0 for true-Apple no-overshoot |
| snappy | 0.35 / 0.65 | 0.5 / 0.85 | keep fast; the lively control register |
| bouncy | 0.5 / 0.45 | 0.5 / 0.70 | ease toward ζ0.55-0.60 if "abrupt" (overshoot 20.5%→~14%) |
| press (NEW) | scale 0.96, useSpringPress 0.25/0.7 | interactiveSpring 0.15 / 0.86 | the iOS press register |
| dock | 0.32 / 0.7 | iOS-control | keep |
| duration clocks | smooth 0.36 / snappy 0.34 / bouncy 0.69 / gentle 0.44s | — | generated; keep |
| bounce↔ζ | — | **ζ = 1 − bounce** | the formula keyframes.js springTimingFunction should honor |

### Tabs (Band 3)
| param | HEAD | TARGET |
|---|---|---|
| track | `--glass-bg-quiet` + hairline | keep, glassy, W55 tint seam |
| active pill | `--glass-bg-floating` | keep tier; LOCK capsule radius (`--radius-pill`/9999px), small pad |
| glide | snappy ≈0.34s | matches `.bouncy(0.35)` |
| squish cap | 1.08 (+8%) | keep |
| release | 0.82 (release-at-arrival) | keep |
| drag morph | useDragMorph 0.35/0.65 | keep; verify paint |

### Transform-origins (Band 7)
- Reveal/open: `transform-origin: var(--reka-popper-transform-origin, center)` (bloom-from-anchor) — HEAD-correct.
- Tab pill: origin at the pill center, travel-axis stretch.
- Materialize: drive the lensing/blur amount in tandem with scale (Apple's "modulate the light bending").

---

## 6 — Cross-engine (Safari, feeds Band 8)

The binding cross-engine fact: **`backdrop-filter: url(#svgfilter)` is Chromium-ONLY** (WebKit bug 245510 open, Firefox not shipping). So:
- The full Liquid-Glass LENS (the squircle displacement) paints ONLY on Chrome. Safari/Firefox get the un-filtered `blur() + saturate() + tint` base. glass-ui already gates the lens behind `@supports (backdrop-filter: url(#…))` (correct degrade floor) — Safari is NOT broken by the lens absence; it gets the calm glass.
- The Safari FLASHING (D5/D7) is NOT the lens — it is the **WebGL context-loss + morph re-render churn** (`WebGL: context lost` on WebKit). That is a Band-8 WebGL-lifecycle fix, NOT a glass-material fix. The glass material itself is Safari-safe (blur+saturate+tint are cross-engine); confirm no `backdrop-filter: url()` is on a load-bearing (non-`@supports`-gated) path.
- This means the iOS-fidelity LENS is a progressive enhancement; the LEGIBILITY (tint + catch-light rim + the D2 fix) must live on the cross-engine base, not the Chrome-only filter.

---

## 7 — Mapping to BC checklist boxes

- **BC.W-GLASS-IDENTITY / BC.W-ADAPTIVE-RECONCILE** ← §1.4, §1.5 (close the luma loop: `calc()` AA from `--glass-backdrop-luma`).
- **BC.W-GLASS-LEGIBILITY-MEASURED** ← §1.1 (Apple's "shift dynamic range to keep buttons legible while letting content through" — the measured ≥4.5:1 at the bright-bucket).
- **BC.W-GLASS-PRUNE** ← §1.7 (Apple = ONE material, TWO variants → Glass CARDS + Glass MATERIALS).
- **BC.W-BLACK-BAR / D2** ← §1.6 (directional rim: bright top catch-light, faint bottom shadow; retire uniform warm-ink top border).
- **BC.W-BUTTON-GLASS-IOS** ← §4 (lift button blur/saturate toward floating tier; `.glassProminent` = `--glass-accent` prominence; iOS press-spring).
- **BC.W-DIALOG-GLASS** ← §1.1-1.3 (the dialog must read partially-transparent — the `--glass-bg-overlay` 0.95 is nearly opaque; the user wants it GLASSY — lower toward 0.80-0.85 + the lens on Chrome).
- **BC.W-TABS-IOS / BC.W-LIQUID-TAB** ← §3 (capsule pills, glassy, drag-morph paint).
- **BC.W-SPRING-EASE / BC.W-MOTION-ONE-CLOCK** ← §2.2-2.4 (bake Apple spring family into keyframes.js; ζ=1−bounce; press register at 0.15/0.86).
- **BC.W-SAFARI-WEBGL** ← §6 (the lens is Chrome-only by design; the flash is WebGL, not glass).

---

## Sources
- [Apple Newsroom — "Apple introduces a delightful and elegant new software design" (2025-06)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [WWDC25 Session 219 — "Meet Liquid Glass" (Apple Developer)](https://developer.apple.com/videos/play/wwdc2025/219/)
- [conor.fyi — iOS 26 Liquid Glass Comprehensive SwiftUI Reference](https://www.conor.fyi/writing/liquid-glass-reference) / [GitHub: conorluddy/LiquidGlassReference](https://github.com/conorluddy/LiquidGlassReference)
- [kube.io — Liquid Glass in the Browser: Refraction with CSS and SVG](https://kube.io/blog/liquid-glass-css-svg/) (the definitive refraction math)
- [nilcoalescing — SwiftUI animation timing](https://nilcoalescing.com/blog/AnimationTimingInSwiftUI/)
- [Amos Gyamfi — The Meaning, Maths, and Physics of SwiftUI Spring Animation](https://medium.com/@amosgyamfi/the-meaning-maths-and-physics-of-swiftui-spring-animation-amos-gyamfis-manifesto-0044755da208)
- [GetStream — swiftui-spring-animations](https://github.com/GetStream/swiftui-spring-animations)
- [Donny Wals — Exploring tab bars on iOS 26 with Liquid Glass](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/)
- [natashatherobot — The Anatomy of a LiquidGlass Button in iOS 26](https://www.natashatherobot.com/p/liquidglass-button-ios-26)
- [kevinbism — Recreating Apple's Liquid Glass Effect with Pure CSS (DEV)](https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl)
- [supercharge.design — Apple Liquid Glass: The UX Evolution of Adaptive Interfaces](https://supercharge.design/blog/apple-liquid-glass-the-ux-evolution-of-adaptive-interfaces)