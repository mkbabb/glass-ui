# KS-GLASS — SOTA research: glassmorphism within the bounds of CSS (2026)

**Lane:** GLASS · SOTA researcher (KS-A). **Date:** 2026-07-01. **HEAD:** `fa6ed40a`.
**Waves this feeds:** 3.5 `W-GLASS-REGISTER-UNIFY` · F2.1 `W-GLASS-DEFAULT-DEFINITION` ·
F2.2 `W-GLASS-BASIS-CONSOLIDATE` · F2.3 `W-DEEP-GLASS-DECIDE` · 13.2 `W-GLASS-REFRACT-WEBGL`
(C-SAFARI Tier-1) · 3.10 `W-GLASS-DYNAMICS` · 0.7 `W-DOCK-BLUR-RETIRE-CARVE`.

**Fence honored:** this file is the ONLY write. No src/demo/scripts edits. Siblings read-only.
Every corpus claim is cited `file:line`; every external reference is named + linked.

---

## 0 — The one-paragraph SOTA verdict (what the frontier says, and what glass-ui should do)

Apple's Liquid Glass (iOS 26, WWDC 2025; refined iOS 27 "Golden Gate", WWDC 2026) is a
**real-time refractive material** — translucency + refraction/lensing + depth + specular
highlights that respond to motion, adapting color/brightness/saturation to the backdrop so a
control stays legible over ANY background ([Apple Newsroom 2025](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/),
[Wikipedia · Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass)). The web CANNOT get
GPU pixel-refraction of the live page cross-engine — the only primitive that bends live backdrop
pixels, `backdrop-filter: url(#svgfilter)`, is **Chromium-only and WebKit bug 245510 is STILL
NEW as of 2026-06-12, four years open** ([webkit.org/245510](https://bugs.webkit.org/show_bug.cgi?id=245510)).
So the 2026 frontier splits into two honest strategies: **(A)** the cheap cross-engine CEL
composite — warm field + directional keyed rim + coherent warm cast + `blur() saturate()` — which
is what glass-ui's own greenfield GOLDEN already lands, and **(B)** true refraction, reached ONLY
via a fallback ladder: `backdrop-filter:url()` (Chromium) → `filter:url()` on the element/a bent
copy (all engines, but bends a copy not the live backdrop, per [samasante/liquid-glass](https://github.com/samasante/liquid-glass))
→ flat blur (WebKit degrade). **glass-ui should ADOPT strategy A as the floor identity (it owns
this already), REJECT any load-bearing `backdrop-filter:url()`, and scope 13.2's WebGL2 Tier-1
refract honestly as the CTA/dock opt-in over the cross-engine base** — which is exactly the
folded plan shape. The research below hardens the specific parameter choices and closes the
C-SAFARI ambiguity.

---

## 1 — Apple Liquid Glass: the reference material (iOS 26/27, WWDC 2025/2026)

### 1.1 The two-variant material split (feeds F2.3 W-DEEP-GLASS-DECIDE + F2.1)

Apple ships **two** material variants, not a continuum ([conorluddy/LiquidGlassReference](https://github.com/conorluddy/LiquidGlassReference)):

| variant | transparency | requires | glass-ui mapping |
|---|---|---|---|
| **Regular** | medium | nothing — the default everywhere | the calm content ladder (`--glass-level:1`, W-GLASS-CAL blur floor) |
| **Clear** | high | media-rich backdrop + a **mandatory dimming layer** + bold fg content | `.glass-deep`/`--glass-depth` — the OPT-IN maximal tier (CLAUDE.md `glass-deep.css`) |

**The load-bearing finding for F2.3:** Apple's "Clear" (the deep/refractive read) is **not a
free default** — it is gated on THREE preconditions (over media, dimming applied, bold content).
This is the SOTA justification for glass-ui's own rule that deep glass is opt-in, never the bare
content default (CLAUDE.md: "the deep tier is OPT-IN (never the bare content default)"). So
**F2.3's "decide with a number" should measure the deep tier ONLY at the hero/dock/CTA surfaces
Apple would call Clear-eligible** — a `>54KB gz` or throttled-frame miss there is a retire signal,
not a whole-library one. ADOPT: keep the two-register split; the deep register's acceptance
context is media-rich surfaces, matching Apple's Clear gating.

**iOS 27 direction (WWDC 2026):** Apple **REDUCED default transparency** and changed sidebar
corner radii ([Wikipedia · Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass)). This is
the single most important 2026 signal: **the industry leader walked BACK from maximal
transparency toward legibility.** iOS 26.1+ already added a user "Tinted Mode" that raises opacity
([conorluddy ref](https://github.com/conorluddy/LiquidGlassReference)). glass-ui's `--glass-level`
opacity knob + the `prefers-reduced-transparency → level 0` + `prefers-contrast: more → 0.3`
brackets (CLAUDE.md AX.W54) are ALREADY the exact mechanism Apple shipped a year later. ADOPT:
cite this as validation of the defined-control-tier direction (F2.1) — the frontier is moving
toward glass-ui's warm-defined-floor, not away from it.

### 1.2 Adaptive legibility — how Apple keeps a glass BUTTON readable over ANY backdrop (feeds F2.1 W-GLASS-DEFAULT-DEFINITION)

This is the exact question F2.1 answers. Apple's mechanism ([conorluddy ref](https://github.com/conorluddy/LiquidGlassReference),
[letsdev · Liquid Glass usability/a11y](https://letsdev.de/en/blog/ios-26-in-detail-liquid-glass-ui-between-usability-and-accessibility.php)):

1. **Adjust color/brightness/saturation based on background** — continuous adaptation (glass-ui:
   `useGlassBackdropLuminance` + the `@container style(--glass-backdrop: light)` bright bucket).
2. **Shadow opacity increases over text, decreases over white** — a directional legibility floor.
3. **Tint adjusts hue for legibility** — a bounded hue lift toward contrast.
4. **The "Clear" variant DEMANDS a dimming layer** — Apple does NOT let a high-transparency
   control float over an unknown backdrop without a floor-fill.

**The finding:** Apple's answer to "legible over anything" is **not more blur — it is a floor +
an edge + adaptive tint.** A glass button is a DEFINED SHAPE with an edge, and over a risky
backdrop it gets a fill floor. This is precisely glass-ui's greenfield GOLDEN leg (c) — the
`--glass-key` directional rim + warm cast + the `.glass-defined`/`--glass-floor-fill`/
`@property --glass-definition` F2.1 machinery (EXECUTION-PROGRESS.md:69). ADOPT: F2.1's defined
control tier is the correct SOTA transposition — a glass control resolves an edge (keyed rim) +
a bounded fill floor over flat/risky backdrops, born-RED on the 0.0138-chroma near-gray control
the plan names (EXECUTION-PROGRESS.md:69). The WCAG floor stays 4.5:1 ([expertappdevs guide](https://medium.com/@expertappdevs/liquid-glass-2026-apples-new-design-language-6a709e49ca8b)).

### 1.3 Specular response to motion (feeds 3.10 W-GLASS-DYNAMICS)

Apple: **"specular highlights responding to device motion" + "real-time light bending (lensing)"
+ "touch-point illumination that radiates to nearby glass"** ([conorluddy ref](https://github.com/conorluddy/LiquidGlassReference)).
The web has no device-motion API for this on desktop, but the POINTER is the analogue. glass-ui
already ships this: `createSpecularWriter` / `vSpecular` / `useSpecularPointer` (CLAUDE.md
W-LIQUIDHOVER + W-LENSING) — ONE position-write source, angle-keyed conic rim, `usePointerVelocityField`
for the velocity smear. ADOPT: 3.10 W-GLASS-DYNAMICS is the read-carrier axis (lensing/refraction
+ neutral specular hairline, EXECUTION-PROGRESS.md:67) — the SOTA "touch-point illumination
radiating to nearby glass" is a booked successor (the fission-bridge already radiates; a
pointer-proximity glow across sibling glass is a candidate, but ≥2-consumer-gated, not a BG mint).

---

## 2 — CSS-bounds techniques at the 2026 frontier (feeds 3.5, 13.2, 3.10)

### 2.1 The refraction primitives — and the hard cross-engine wall

The canonical refraction graph (kube.io / ekino / LogRocket / WebTricks, 2025-2026):

```
feImage (displacement map)  →  feDisplacementMap(in=SourceGraphic, in2=map,
                                  scale=maxPx, xChannelSelector=R, yChannelSelector=G)
                            →  feImage (specular)  →  feBlend(mode=screen)
```

The map encodes X-shift in R, Y-shift in G (128 = no shift): `r = 128 + cos(angle)·mag·127`,
`g = 128 + sin(angle)·mag·127` ([kube.io](https://kube.io/blog/liquid-glass-css-svg/),
[ekino](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d)).

**The surface profile is the design lever** — four functions, one preferred ([kube.io](https://kube.io/blog/liquid-glass-css-svg/)):
- convex circle `y=√(1-(1-x)²)` — harsh transition
- **convex SQUIRCLE `y=⁴√(1-(1-x)⁴)` — Apple's preferred; softer flat→curve transition, smooth
  refraction gradients** — this is EXACTLY the profile glass-ui already bakes (`glass-refract.css:11`).
- concave `1-convex(x)` — diverges rays
- lip — smootherstep blend

**The hard wall, confirmed 2026-06-12:** `backdrop-filter: url(#filter)` — the ONLY form that
bends the LIVE backdrop — is **Chromium-only; WebKit 245510 is NEW/P2, four years open, no
workaround** ([webkit.org/245510](https://bugs.webkit.org/show_bug.cgi?id=245510),
[mdn/browser-compat-data#24110](https://github.com/mdn/browser-compat-data/issues/24110)). WebKit
restricts `backdrop-filter` to built-in CSS filter functions to avoid GPU instability. Safari
silently falls back to flat blur.

**Cost model:** dynamic shape/size changes are **costly — nearly every tweak forces a full
displacement-map rebuild; only animating filter `scale` avoids recomputation** ([kube.io](https://kube.io/blog/liquid-glass-css-svg/)).
This is the EXACT lesson glass-ui learned the hard way at `glass-refract.css:34-58` (DDR-LENS-BAKE:
the `scale` cannot be `var()`-driven inside a `url()` data-URI token — the press-swell was inert;
baked `scale='28'` is the only form that parses AND survives a bundler's url()-rewriter).

**REJECT (binding):** do NOT make `backdrop-filter:url()` load-bearing on any read. glass-ui's
`@supports (backdrop-filter: url(#glass-refract))` gate (`glass-refract.css:106`) is correct — it
stays progressive enhancement, the un-gated blur base is the WebKit floor. The greenfield GOLDEN
`§6 MEATBALLING note` is the law: "The material path has zero goo, zero `backdrop-filter:url`"
(GOLDEN.md:290).

### 2.2 The 2026 cross-engine breakthrough — `filter:url()` on the element (feeds 13.2 C-SAFARI)

The one genuinely new 2026 move: **run the SVG displacement on the ELEMENT (`filter: url()`),
not the backdrop.** [samasante/liquid-glass](https://github.com/samasante/liquid-glass) ("refracts
the live DOM in Safari, Firefox and Chrome. Zero dependencies") does this — a rounded-rect
**signed-distance field** rasterized to a displacement map (R/G = X/Y, **B = specular mask**),
fed to `feDisplacementMap`, with a **3-pass RGB split for chromatic aberration**, plus
WebKit-specific fixes (**1× filter scale, shape-only map regeneration, cache-busting filter ids**).

**The critical honesty caveat:** `filter:url()` bends **a COPY of content you hand it — NOT the
live backdrop behind the element.** samasante's cross-browser mode says: "To bend in every
browser, refract a copy — the same `<Glass>`, you just tell it what to bend." So the cross-engine
"refraction" is a bent copy layer, not true backdrop lensing. The defensive pattern is
`@supports (backdrop-filter: blur(1px)) and (filter: url('#liquid-glass-refract'))` ([LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)).

**ADOPT for 13.2 (the honest C-SAFARI ladder):** the folded plan already scopes this right —
"Tier-1 WebGL2 FLOOR — PRIMARY … full→drapery-dropped→flat-blur ladder … FBO 2nd-sample
DROPPED-WITH-TRIGGER" (EXECUTION-PROGRESS.md:68). The SOTA sharpens the ladder rungs:
1. **Chromium:** `backdrop-filter:url()` squircle displacement (the live-backdrop lens, shipped).
2. **All engines (the C-SAFARI Tier-1 floor):** a WebGL2 pass is the RIGHT floor over
   `filter:url()`-on-a-copy — a WebGL2 shader can sample the actual composited region and produce
   true refraction where the platform allows a GPU context, without the copy-not-live caveat. This
   is why the plan makes WebGL2 the PRIMARY floor, not the CSS `filter:url()` copy — glass-ui
   already owns the WebGL/WebGPU substrate (`useGpuSubstrate`), so the WebGL2 Tier-1 is DRY-er and
   more faithful than importing samasante's copy-bend.
3. **Degrade:** flat `blur() saturate()` (the WebKit-safe base, always painted).

**The `uChromatic` fence (13.2's gate):** the plan gates on `uChromatic` NOT `uDispersion`/
`uRefract` (EXECUTION-PROGRESS.md:68). SOTA confirms chromatic aberration = the 3-pass RGB split
([samasante](https://github.com/samasante/liquid-glass)); glass-ui's booked "chromatic-aberration
RGB-split rim is a booked successor" (CLAUDE.md W-LENSING) is the right deferral — the Tier-1
floor ships depth-refraction (single-channel displacement), chromatic-split rides the WebGL2
successor. REJECT: minting a CSS `filter:url()` chromatic path — it bends a copy, doubling the
DOM, and the WebGL2 floor is the DRY-er home.

### 2.3 The cross-engine CEL techniques (feeds 3.5 UNIFY + 3.10 + F2.1) — ALL Safari-native

These are the techniques that read as glass in EVERY engine, no `url()`, spike-verified in the
greenfield GOLDEN (GOLDEN.md:278-291):

| technique | primitive | engine support | glass-ui home |
|---|---|---|---|
| **frost** | `backdrop-filter: blur() saturate() brightness()` | WebKit since 9 (needs `-webkit-` prefix, [generalistprogrammer 2026 guide](https://generalistprogrammer.com/tutorials/css-filters-complete-guide)) | `--glass-blur-*` ladder (`glass.css`) |
| **directional keyed rim** | `conic-gradient` border + `mask-composite: exclude` (`-webkit-mask-composite: xor`) | Chrome + Safari native (spike-confirmed, GOLDEN.md:283) | `rim.css` — F2 KEY-EDGE |
| **coherent warm cast** | `box-shadow` + `cos()`/`sin()` (CSS Values 4) | both engines | `shadow.css`/`glass-fx.css` |
| **transmissive tint** | `color-mix(in oklab, <rung>, <ambient-hue> <strength>)` | both engines | `--glass-tint-*` + `--glass-ambient-*` |
| **adaptive ink** | `contrast-color()` `@supports`-gated + `oklch(from …)` relative color | Chrome 147+/Safari 26+ progressive (CLAUDE.md) | the `@supports (color: contrast-color(white))` block |
| **backdrop bucket** | `@container style(--glass-backdrop: light)` style query | both engines (Baseline) | the W55 bright bucket |

**The KEY finding for 3.5 UNIFY (the tentpole):** the tint recipe is the ONE seam that must be
factored to a single home. The plan makes 3.5 "OWNS the tint-recipe home = the applied
`@utility glass-fill`; deletes `--glass-bg-*-tinted` dup tokens + 9 inline re-spells, clean
break" (EXECUTION-PROGRESS.md:66). SOTA reinforces this: EVERY frontier implementation composes
ONE `color-mix(in oklab, base, tint strength)` seam — the duplication glass-ui carries
(`--glass-bg-resting-tinted` on `.btn-glass`, the menu-row respell, the dock respell) is the
"substitution-vs-inheritance trap" the codebase documents 4× (CLAUDE.md W55, W-BUTTON-GLASS,
W-MENU-GLASS, W-DARK-MATERIAL). ADOPT: the `@utility glass-fill` single recipe is the correct DRY
collapse — one applied utility every lit surface composes, no per-surface re-spell.

### 2.4 `@property`-driven material scalars (feeds F2.3, 3.10)

The frontier animates material depth via registered `@property` scalars so a `var()` interpolates
instead of snapping ([atlaspuplabs](https://atlaspuplabs.com/blog/liquid-glass-but-in-css),
LogRocket). glass-ui already owns this: `--glass-level` (`<number>`), `--glass-depth` (`<number>`,
the deep-tier lerp), `--glass-definition` (F2.1), `--border-progress-fill` (`<percentage>`). The
DDR-LENS-BAKE lesson (`glass-refract.css:34`) is the boundary: a `@property` scalar CANNOT be
substituted inside a `url()` data-URI string token — so material scalars drive `blur`/`saturate`/
`scale`/`box-shadow`/`translate` (compositor channels), NEVER a value spliced into an SVG filter
URL. ADOPT: F2.3's `--glass-depth` lerp is the correct home for the deep-tier animation; do NOT
re-attempt a `var()`-driven displacement `scale` (proven inert twice).

---

## 3 — First-principles design (the greenfield loop, per lane wave)

The material's IDENTITY is settled by the BD greenfield GOLDEN (field + keyed rim + coherent cast
= the CEL) and is INVIOLABLE per SYNTHESIS-PASS1 §4. These waves PERFECT the delivery of that
identity — they do not re-derive it. Per-wave first-principles below.

### 3.5 W-GLASS-REGISTER-UNIFY (the F2 tentpole) — ≥3 directions → GOLDEN

**Problem:** the tint recipe is spelled ~10 places (`--glass-bg-*-tinted` tokens + 9 inline
re-spells). **Directions:** (1) a shared CUSTOM PROPERTY every surface reads — but a pre-computed
`--glass-bg-*-tinted` at `:root` doesn't re-compose on a descendant (the documented trap,
CLAUDE.md W-CARD-TIER-ALPHA); (2) a Sass/build-time mixin — REJECT, glass-ui is token-first, no
build-time indirection; (3) **an applied `@utility glass-fill`** — the recipe lives ONCE, every
lit surface `@apply`s it, so the `color-mix(in oklab, …)` composes AT THE ELEMENT (the only place
the tint darken/lift reaches, per the substitution trap). **GOLDEN: (3).** It is the exact seam
the plan names, and the only one that closes the trap. **Self-challenge:** does an `@utility`
reach a `data-state`/`:hover` variant fill? Yes — the utility sets the base; the state fills
re-`@apply` or set the two tint inputs. **Contrived?** No — it's the DRY-est expression of the
one recipe every frontier implementation uses (§2.3). **Gate:** `glass-fill-single-recipe` +
Safari `-webkit-backdrop-filter` assert + no-gray dock witnesses (EXECUTION-PROGRESS.md:66).

### F2.1 W-GLASS-DEFAULT-DEFINITION (the defined control tier)

**Problem:** a glass control over a flat/risky backdrop reads 0.0138-chroma near-gray with no
edge. **Directions:** (1) always-on opaque fill — REJECT, kills the glass identity; (2) darken
the plate — REJECT, that's the W55 bright-bucket, a whole-plate legibility move, not an edge;
(3) **a keyed edge + a bounded fill FLOOR that engages only over risky backdrops** — Apple's
exact Clear-variant answer (§1.2). **GOLDEN: (3)** — `.glass-defined` + `--glass-floor-fill` +
`@property --glass-definition`, born-RED on the near-gray control (EXECUTION-PROGRESS.md:69).
**Self-challenge:** doesn't the field (FIELD-AURORA, landed) already give every control an edge by
contrast? Yes over the field — but F2.1 is the FLAT-PAGE + reduce-transparency INSURANCE (the
GOLDEN §4 "structural insurance", GOLDEN.md:215): when host and control collapse to the same tier
or transparency is off, the keyed rim + floor cut the shape. **Contrived?** No — it's the
reduce-transparency legibility anchor doing double duty, matching iOS 27's transparency-reduction
direction. **≥2-consumer:** every glass control (Select trigger, Button, menu row) reads it.

### F2.2 W-GLASS-BASIS-CONSOLIDATE (zero-pixel elegance transposition)

**Problem:** the dark arm mixes two mechanisms (`light-dark()` for colors, `.dark{}` for
shadows/insets); goo ids may duplicate; refract→lens rename may be incomplete. **This is a
DRY/correctness pass, not a design choice** — the design is frozen. **First-principle:** ONE
mechanism per token TYPE — colors via `light-dark()`, shadows/insets via `.dark{}` (the
light-dark() inset-shadow trap is BINDING: inset fragments inside `light-dark()` compute the whole
box-shadow to `none`, per MEMORY + CLAUDE.md). **Self-challenge:** any of these moves shifting a
pixel? Then it's a FINDING, not a consolidation — the gate + the Fable "CONFIRMS byte-identical
darken/lift" arm (EXECUTION-PROGRESS.md:70) is the guardrail. **Fence:** F2.2 does NOT touch the
recipe home (that's 3.5's) — clean split of concern.

### F2.3 W-DEEP-GLASS-DECIDE (end the 5-tranche chronic with a number)

**Problem:** the deep tier (Apple "Clear", 20px/1.8 saturate) has ridden BOOKED for 5 tranches.
**First-principle:** DECIDE with a measurement, never re-book (SYNTHESIS-PASS1 §2 ruling #10).
Run `profile:budget` at 20px/1.8 on the hero/dock/CTA (the Apple-Clear-eligible surfaces, §1.1)
→ TERMINAL verdict `landed-20px` OR `retired-at-16px-cost-N` (EXECUTION-PROGRESS.md:71).
**Self-challenge:** is 20px measurably better than the shipped 16px? SOTA says the deepest read is
the BLUR carrying the "more glass" impression (CLAUDE.md W-DEEP-GLASS: "the deepest BLUR carrying
the more-glass read"), and iOS 27 REDUCED transparency — so the honest bar is: does 20px clear the
budget AND read distinctly deeper over media? If the throttled frame or the `>54KB gz` split
trigger fires, retire at 16px with the cost recorded. **Contrived?** No — this is the
audit's own ruling made executable.

### 13.2 W-GLASS-REFRACT-WEBGL (C-SAFARI Tier-1) — the ladder, hardened

Covered in §2.2. **GOLDEN: WebGL2-primary floor over the cross-engine CSS base, `backdrop-filter:url()`
as Chromium-only enhancement, chromatic-split booked to the successor.** The self-challenge the
audit already ran: is a WebGL2 refract worth a GL context on a card? NO — that's why it's
CTA/dock/hero-scoped (the one-GL-per-route budget), matching Apple's Clear gating (§1.1). REJECT
the samasante `filter:url()` copy-bend as the floor — it bends a copy not the live backdrop, and
doubles DOM; the WebGL2 floor is faithful + DRY.

### 3.10 W-GLASS-DYNAMICS + 0.7 W-DOCK-BLUR-RETIRE-CARVE

3.10 = the read-carrier axis (lensing/refraction + neutral specular hairline over the pointer,
§1.3) — KEEP as a distinct axis. 0.7 = a pure carve/retire (retire `--glass-blur-dock` chain,
carve ladder 527→470 + shell 510→459, dist byte-identical; the KILLED `proof:retired-token-consumers`
sibling-probe is NEVER minted — the foreign-tree fence, EXECUTION-PROGRESS.md:64). No design
research owed; it's a structural cleanup. The one SOTA note: the dock's blur is the "translucent
chrome over the field's motion" tier (GOLDEN.md:92) — retiring the SEPARATE `--glass-blur-dock`
token onto the shared ladder is correct (the dock reads a named ladder rung, not a bespoke blur).

---

## 4 — Precepts conformance (explicit checks)

- **Compositor-only + PRM:** every technique above rides `blur`/`saturate`/`box-shadow`/
  `transform`/`opacity`/`filter` + `@property` customs — never a layout property
  (`proof:no-layout-animation`). The field drift is a `::before` transform, PRM→static. The keyed
  rim/cast are static paint; specular is pointer-driven, PRM-snapped. ✔
- **Spring-iff-spatial / bezier-iff-effect (motion-canon P1):** the deep-glass depth lerp +
  press-swell are SPATIAL→spring; the tint/ambient-hue cross-fade is an EFFECT→bezier. ✔ (matches
  GOLDEN §6 "the ambient hue rides the existing `--glass-tint-strength` transition (a spring…)"
  — note: the AMBIENT hue is a color EFFECT; per P1 it should ride a bezier `--ease-*`, and the
  GOLDEN's "a spring, never a hard swap" (GOLDEN.md:266) should be read as "eased, never a hard
  swap" — flag for the F2 spec author to reconcile with P1, a minor wording tension not a design
  conflict.)
- **Token-first:** every axis is a CSS custom property (`--glass-level`/`-depth`/`-definition`/
  `-key`/`-ambient-*`/`-floor-fill`); no consumer edits source for styling. ✔
- **Clean breaks (no legacy):** 3.5 deletes `--glass-bg-*-tinted` + 9 respells clean; 13.2's
  `.glass-refract`→`.glass-lens` rename already landed clean (`glass-refract.css:66`). ✔
- **≥2-consumer:** `glass-fill` (every lit surface), `.glass-defined` (every control),
  `--glass-key` (rim + cast, every tier). The deep tier reads on hero + dock + CTA. ✔
- **Presets-in-consumers:** the field triad derives from a consumer section-accent; ppmycota/demo
  hues NEVER enter library tokens (GOLDEN.md:134). ✔
- **`in srgb` surface-tint fence:** the glass tint is `in oklab` (perceptual); the `--surface-tint-*`
  brand-overlay family stays `in srgb` — the AW.W26 fence, UNTOUCHED. ✔
- **Cross-engine paired-π:** acceptance is Chromium AND WebKit (GOLDEN §L7 bar) — the C-SAFARI
  Tier-1 floor is the WebKit path. ✔
- **Warm identity / no-gray / luminous-dark:** every plate warms toward `--foreground`; the field
  is warm-amber→terracotta→sand (light) / warm-dark GLOW (dark, never charcoal). ✔

---

## 5 — The gestalt bar (this hallmark's paint verdict — from GOLDEN §10, SOTA-affirmed)

On a FRESH capture of `/forms/select`, `/forms/toggle-chip`, `/display/buttons`, a cards page,
`/foundations/intro`, BOTH modes AND both engines:

1. **A colorful warm field is visibly behind every glass surface** (page not flat cream/gray). [F1/F4]
2. **The glass TRANSMITS the field tinted warm** — composited C ≥ 0.018 over the field. [F2]
3. **Every control reads as a DEFINED SHAPE** — a cut, lit edge + a warm cast (Apple's Clear-floor). [F3]
4. **No surface reads gray/muddy** — a single gray plate is a FAIL regardless of metric. (headline)
5. **The cel coheres** — rim + cast agree on one `--glass-key`; objects lift with cartoon weight.
6. **Text AA holds** (4.5:1 min, WCAG — the SOTA + a11y floor); plate L unmoved.
7. **Both modes warm-luminous;** dark GLOWS, never charcoal (iOS-dark transmission model).
8. **Deep tier reads distinctly deeper over media** ONLY where opted-in (Apple Clear gating); the
   calm content default stays calm (iOS 27's reduced-transparency direction).
9. **Refraction is honest per engine** — Chromium bends the live backdrop; WebKit reads the WebGL2
   Tier-1 floor OR the flat-blur degrade; NO broken `url()` reference, NO copy-bend masquerading as
   live lensing.
10. **Liquid-weight un-regressed;** the field drifts with eased weight; Safari-parity on field +
    rim + cast + transmission.

---

## 6 — ADOPT / REJECT ledger (the one-screen summary for the spec authors)

| # | finding | source | ADOPT / REJECT | why |
|---|---|---|---|---|
| 1 | Apple 2-variant Regular/Clear split | [conorluddy](https://github.com/conorluddy/LiquidGlassReference) | **ADOPT** | maps to calm ladder vs `--glass-depth` opt-in; F2.3 measures deep at Clear-eligible surfaces only |
| 2 | iOS 27 REDUCED default transparency | [Wikipedia](https://en.wikipedia.org/wiki/Liquid_Glass) | **ADOPT (as validation)** | the frontier moved toward legibility — glass-ui's `--glass-level` brackets + F2.1 defined tier are ahead of it |
| 3 | adaptive legibility = floor + edge + tint, not more blur | [conorluddy](https://github.com/conorluddy/LiquidGlassReference), [letsdev](https://letsdev.de/en/blog/ios-26-in-detail-liquid-glass-ui-between-usability-and-accessibility.php) | **ADOPT** | F2.1's `.glass-defined` + `--glass-floor-fill` is the exact transposition |
| 4 | convex squircle displacement profile `⁴√(1-(1-x)⁴)` | [kube.io](https://kube.io/blog/liquid-glass-css-svg/) | **ADOPT (already baked)** | matches `glass-refract.css:11`; confirms the current profile is SOTA |
| 5 | `backdrop-filter:url()` = Chromium-only, WebKit 245510 still NEW 2026-06 | [webkit.org/245510](https://bugs.webkit.org/show_bug.cgi?id=245510) | **REJECT as load-bearing** | keep `@supports` gate; blur base is the WebKit floor; zero `backdrop-filter:url` in the material path |
| 6 | `filter:url()`-on-element bends the LIVE DOM cross-engine | [samasante](https://github.com/samasante/liquid-glass) | **REJECT as the floor** | it bends a COPY not the live backdrop + doubles DOM; the WebGL2 Tier-1 floor is faithful + DRY |
| 7 | WebGL2 as the C-SAFARI Tier-1 refract floor | plan + glass-ui `useGpuSubstrate` | **ADOPT** | GPU samples the real region cross-engine; matches the folded plan; 13.2 gates on `uChromatic` |
| 8 | chromatic aberration = 3-pass RGB split | [samasante](https://github.com/samasante/liquid-glass) | **ADOPT (booked)** | the WebGL2 successor's channel, not a CSS copy path; `uChromatic` fence |
| 9 | dynamic displacement `scale` forces map rebuild; only animate `scale` | [kube.io](https://kube.io/blog/liquid-glass-css-svg/) | **ADOPT (already learned)** | validates DDR-LENS-BAKE (`glass-refract.css:34`); no `var()` in url() token |
| 10 | ONE `color-mix(in oklab)` tint seam everywhere | kube/ekino + glass-ui traps | **ADOPT** | 3.5's `@utility glass-fill` collapses the ~10 re-spells; closes the substitution trap |
| 11 | `conic-gradient` rim + `mask-composite:exclude` is Safari-native | [GOLDEN spike](GOLDEN.md:283) | **ADOPT** | the cross-engine keyed edge; no `url()` needed for the defined-edge read |
| 12 | keep the field + cel identity byte-for-byte | SYNTHESIS-PASS1 §4 | **ADOPT (frozen)** | the identity is settled; these waves perfect delivery, not design |

---

## 7 — Open flags for the F2 spec author (non-blocking)

1. **P1 wording tension (§4):** GOLDEN §6 calls the ambient-hue cross-fade "a spring"; motion-canon
   P1 says a color EFFECT rides a bezier. Reconcile the wording in the 3.5/W-GLASS-AMBIENT spec —
   eased-not-a-hard-swap is the intent; the mechanism is a bezier `--ease-*`, not a spring. Design
   unchanged; wording only.
2. **13.2 floor faithfulness:** confirm the WebGL2 Tier-1 pass samples the ACTUAL composited region
   (true refraction) vs a copy — the plan's "PRIMARY" framing implies faithful; the spec should
   state the sample source explicitly so it never silently degrades to samasante's copy-bend.
3. **F2.3 Clear-eligibility surface set:** the spec should NAME the Apple-Clear-eligible surfaces
   (hero, dock, CTA over media) as the deep-tier measurement context, so `profile:budget` measures
   deep where it matters, not library-wide.

---

## Sources

- [Apple Newsroom — Liquid Glass (2025)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Wikipedia — Liquid Glass (iOS 26/27, WWDC 2025/2026)](https://en.wikipedia.org/wiki/Liquid_Glass)
- [conorluddy/LiquidGlassReference — the Apple technical reference](https://github.com/conorluddy/LiquidGlassReference)
- [letsdev — iOS 26 Liquid Glass usability & accessibility](https://letsdev.de/en/blog/ios-26-in-detail-liquid-glass-ui-between-usability-and-accessibility.php)
- [expertappdevs — Liquid Glass 2026 developer guide](https://medium.com/@expertappdevs/liquid-glass-2026-apples-new-design-language-6a709e49ca8b)
- [kube.io — Liquid Glass in the Browser: Refraction with CSS and SVG](https://kube.io/blog/liquid-glass-css-svg/)
- [ekino-france — Liquid Glass in CSS (and SVG)](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d)
- [samasante/liquid-glass — cross-browser headless lens (filter:url() on element)](https://github.com/samasante/liquid-glass)
- [LogRocket — How to create Liquid Glass effects with CSS and SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- [atlaspuplabs — Liquid Glass, but in CSS](https://atlaspuplabs.com/blog/liquid-glass-but-in-css)
- [WebKit Bug 245510 — backdrop-filter:url() + feDisplacementMap (NEW, 2026-06-12)](https://bugs.webkit.org/show_bug.cgi?id=245510)
- [mdn/browser-compat-data #24110 — SVG filters not supported in Firefox/Safari backdrop-filter](https://github.com/mdn/browser-compat-data/issues/24110)
- [generalistprogrammer — CSS Filter and backdrop-filter Complete Guide (2026)](https://generalistprogrammer.com/tutorials/css-filters-complete-guide)

*Corpus cited: `docs/tranches/BD/greenfield/glass-material/GOLDEN.md`, `docs/tranches/BG/audit/RESPEC-GESTALT/SYNTHESIS-PASS1.md`, `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`, `src/styles/glass-refract.css`, `CLAUDE.md` (W-GLASS-CAL/W-DEEP-GLASS/W-LENSING/W-LIQUIDHOVER/W-BUTTON-GLASS/W-MENU-GLASS/W-DARK-MATERIAL/AX.W54).*
