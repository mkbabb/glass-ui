# BUILD-SPEC — BD.W-GLASS-ABROGATE-GRAY

> **The defect (live user screenshots, both modes).** The glass is too GREY/DARK. The
> select dropdown panel is a flat medium-GRAY plate in LIGHT mode (should be warm-cream
> luminous glass); the glass CARDS are far too gray; the TOGGLE BUTTONS are gray glass
> (buttons must NOT be gray glass); surfaces read too gray/dark and the TEXT ISN'T
> READABLE. The target is iOS-27 Liquid Glass — warm-cream LUMINOUS TRANSMISSIVE glass
> everywhere, real warm chroma, NEVER a dark-gray cast, readable text, in BOTH modes
> (the Maps-card reference: the backdrop shows THROUGH the glass tinted, with vibrant
> accents, not a gray slab).

**North star (binding):** `design.md` six-layer optical composite (backdrop blur+saturate ·
warm tint · edge rim · inner catch-light · drop shadow · grain) + the iOS-27 Liquid Glass
material + glass+PAPER morphism + `CLAUDE.md` §BA.W-NO-GRAY (glass is warm MATERIAL, never
gray) + §W-DARK-MATERIAL (the luminous-dark transmissive register) +
`[[feedback-liquid-weight-universal]]` (inertia/weight/bounce on ALL motion).

---

## 0 — ROOT CAUSE (one line, measured truth)

The glass compose recipe (AX.W54 `--glass-level`), the adaptive tint seam (W55), and the
dark-material arm all work **exactly as authored** — they faithfully composite the source
tokens. The **source color tokens are chroma-starved**: light `--card` = `hsl(36 48% 97%)`
→ OKLab **C 0.0066** (the floating plate composites to **C 0.0059**); dark `--card` =
`hsl(24 8% 16%)` → **C 0.0075** (charcoal). The perceptual warm-material threshold is
**C ≈ 0.012–0.020**. Every painted glass plate lands at **C 0.0045–0.0075** — a quarter to a
third of threshold — so it reads as a flat gray slab. The `proof:no-gray` `PLATE_FLOOR =
0.0035` greened the gate while the eye still reads gray (the *source-green / visually-broken*
close-class). **The fix is token-first** — lift the named chroma INPUTS the compose recipe
already reads; ZERO recipe edit, ZERO new compositing path, ZERO new class.

Diagnostic numbers (hsl→sRGB→OKLab, the SAME plumbing `proof-no-gray.mjs` carries):

| surface | HEAD | reads |
|---|---|---|
| light `--card` `hsl(36 48% 97%)` | L 0.980 · **C 0.0066** · H 78.3 | warm hue, chroma 3× below floor |
| light page `--neutral-0` `hsl(40 30% 98%)` | L 0.987 · C 0.0029 · **H 84.6** | near-achromatic + yellow-green hue |
| `.glass-floating` plate (card@0.80/page) | L 0.982 · **C 0.0059** · H 78.9 | **GRAY** |
| `.glass-resting` plate (card@0.65/page) | L 0.983 · **C 0.0053** | gray |
| dark `--card` `hsl(24 8% 16%)` | L 0.281 · **C 0.0075** · H 56.1 | **CHARCOAL** |
| dark `.glass-floating` plate (card@0.80/page) | L 0.255 · **C 0.0066** | dead charcoal slab |

---

## 1 — THE FIX (three coordinated token retunes, token-first, no re-fork)

`--card` is the **sole fill source** for every glass rung (`color-mix(in srgb, var(--card)
<α>, transparent)`). Warming it lifts the ENTIRE glass family (Card · Button · dropdown ·
Dialog · Sheet · Toast · Popover · Select-content · dock controls) onto warm-cream in ONE
edit. The light saturate companion (FIX-D) earns the warmth-from-backdrop where the cards
actually float over the page-substrate/aurora routes. The dark `--card` (FIX-C) closes the
dark "too gray" half (the brief binds BOTH modes).

### FIX-A (PRIMARY, keystone) — warm the light `--card` plate-fill source

The hue-drift trap (recorded): naively raising hsl-saturation rotates OKLab hue UP toward
84–90° (yellow-green — the EXACT cast `WARM_HUE_HI: 85` forbids). The escape is to LOWER the
hsl hue (36→30) as saturation rises, keeping OKLab H ≤ 78°.

| site | file:line | HEAD | NEW |
|---|---|---|---|
| **A1** | `src/styles/tokens/color-radius.css:72` | `--card: hsl(36 48% 97%);` | `--card: hsl(30 85% 96%);` |
| **A2** | `src/styles/tokens/light-dark.css:101` | `--card: light-dark(hsl(36 48% 97%), hsl(24 8% 16%));` | `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%));` (A2 carries BOTH the light arg A1 AND the dark arg C; the §2c LOCKSTEP discipline) |

**Resolved values (verified, /tmp/oklab-check.mjs):**

| surface | HEAD | NEW | reading |
|---|---|---|---|
| `--card` (light) | C 0.0066 H 78.3 | **C 0.0148 H 67.7** L 0.974 | warm-amber, still luminous |
| `.glass-floating` plate | C 0.0059 H 78.9 | **C 0.0124 H 68.5** L 0.976 | **warm-cream, 2.1× HEAD** |
| `.glass-resting` plate | C 0.0053 | **C 0.0106 H 69.3** | warm |
| `.glass-wash` (Button) plate | C 0.0018 (HEAD) | **C 0.0064 H 73.0** | warm (the thin 0.30-α plate is gamut-bound; clears the wash floor) |
| AA `--foreground` / floating plate | 16.2:1 | **16.32:1** | re-ratified (chroma-only move, L holds) |

### FIX-C — warm the DARK `--card` (the dark "too gray" half — Leg C of the brief)

The W-DARK-MATERIAL arm lifted the *lightness* (L10→L16) for elevation but left the
*saturation* at 8% → OKLab C 0.0075, charcoal-gray. Lift the hsl-saturation onto the warm
identity so the dark plate reads as warm-LUMINOUS dark glass (the transmissive
saturate/brightness companions already in the dark blur arm then make it GLOW).

| site | file:line | HEAD | NEW |
|---|---|---|---|
| **C1** | `src/styles/tokens/dark-arm.css:74` | `--card: hsl(24 8% 16%);` | `--card: hsl(26 22% 17%);` |
| **C2** | `src/styles/tokens/light-dark.css:101` | dark arg `hsl(24 8% 16%)` | dark arg `hsl(26 22% 17%)` (the SAME value as A2's dark arg — ONE lockstep edit lands both light + dark args) |

**Resolved (verified):** dark `--card` C 0.0075 → **C 0.0216 H 59.2** L 0.295 (warm, clears
STRONG_FLOOR, elevation step preserved L16→L17); dark `.glass-floating` plate composites
C 0.0066 → **C 0.0182 H 59.2**; AA `--foreground`/dark plate 12.64:1 → **12.23:1** (holds far
above 4.5:1). The dark `--surface-tint-*` `oklch(from var(--foreground) …)` derivation, the
dark `--foreground` warm, and the per-rung dark `--glass-saturate-*`/`brightness` companions
are UNTOUCHED — they all re-resolve over the now-warmer plate automatically.

### FIX-D — the light warm-LUMINOSITY companion (saturate lift toward the apple.com SOTA)

The light content tiers sit at `saturate(1.05)` (content) / `1.18` (floating) — apple.com's
nav glass runs `saturate(1.8)` (the load-bearing "concentrated light" term; LogRocket SOTA =
`saturate(180%)`). Over a flat page the saturate is inert (FIX-A carries the calm-page read),
but over the page-substrate / aurora / paper-grid routes the cards actually float over, a
materially-higher saturate is what pulls the warm backdrop THROUGH the glass (the Maps-card
transmissive read). Lift the light content + floating saturate toward the deep-tier ceiling,
staying BELOW it (the calm-vs-deep two-register fence).

| site | file:line | HEAD | NEW | bound |
|---|---|---|---|---|
| **D1** | `src/styles/tokens/glass.css:113-115` | `--glass-saturate-{wash,quiet,resting}: 1.05;` | `1.4;` | content tier — materially above 1.05, calm |
| **D2** | `src/styles/tokens/glass.css:116` | `--glass-saturate-floating: 1.18;` | `1.6;` | toward apple.com 1.8, below deep |
| **D3** | `src/styles/tokens/glass.css:117` | `--glass-saturate-overlay: 1.2;` | `1.6;` | the dropdown-panel tier |

**Fence:** the deep tier `--glass-saturate-deep: 1.8` (the Apple-nav ceiling, `glass.css:107`)
is UNTOUCHED — content tiers lift TOWARD it but stay below (the calm-vs-deep fence holds;
`proof:glass-cal` stays GREEN by construction — the radius axis + `--glass-level` are not
touched, only the saturate companion). The dark `--glass-saturate-*` arm (already 1.22–1.35)
is UNTOUCHED. This is the warm-LUMINOSITY arm research-2 §2.1 names ("the light tier must glow
warm like the dark arm already does").

**FIX-D rationale (why it is not blind).** FIX-A alone clears the *calm-page* defect (the
literal Select screenshot). FIX-D makes the warmth READ over the live backdrops the gestalt
roster captures over (the dock over aurora, the cards over the page-substrate grid/paper). It
is the second of the two warmth mechanisms: FIX-A = the plate carries its OWN warm chroma
intrinsically; FIX-D = the plate pulls the warm backdrop THROUGH it (transmission). Both are
needed for "warm-cream LUMINOUS TRANSMISSIVE" in §2.1.

### HELD (conditional — apply ONLY if the live π / capture shows it)

- **H1 — the page `--neutral-0` warm lift.** `hsl(40 30% 98%)` → `hsl(34 40% 98%)` (OKLab
  H 84.6→74.9, C 0.0029→0.0036). HOLD by default — `--neutral-0` is the KEEP-NEUTRAL luminance
  register and FIX-A decouples `--card` from it (the sanctioned lever). Apply ONLY if the
  capture shows a cold-page-vs-warm-plate seam (a yellow-green page reading visibly cooler
  THROUGH the now-warm transmissive glass). If applied: the `light-dark.css` `--neutral-0`
  light arg + the `color-radius.css:40` literal move in LOCKSTEP, and the `proof:no-gray`
  KEEP-NEUTRAL byte-assert on `--neutral-0` is widened to the new value (NOT deleted).
- **H2 — the floating/overlay rim-α bump.** `--glass-rim-top` α (0.30) on the floating/overlay
  tier ONLY, IF the live π shows the edge rim washing out against the near-white page (the pane
  not lifting off the backdrop). A 1-token edit, NOT the perimeter `--glass-border-*` (the
  BC.W-BLACK-BAR retirement stays). HOLD — apply only on a read defect.

### FROZEN (do NOT touch — W-DARK-MATERIAL / W-GLASS-CAL / AW.W26 bounds)

- `--glass-tint-strength-aa` (20%), `--glass-tint-strength-floor` (4% light / 12% dark), the
  continuous `--glass-backdrop-luma` clamp, `--glass-tint-ink` (= `--foreground`). FIX-A warms
  the FILL the darken composites OVER, so the darkened plate now darkens through warm-cream.
- The per-rung `--glass-opacity-*` (alpha ladder) + `--glass-blur-*-radius` (the W-GLASS-CAL
  radius dial-back) + the dark `--glass-saturate-*` arm.
- The spring/clock/scale motion tokens (`--spring-*`, `--scale-press*`, `--spring-*-duration`).
- The `--surface-tint-*` in-srgb family (the AW.W26 fence). The warmth lifts on the SOURCE
  COLOR axis (`--card`) + the `in oklab` glass tint axis — NEVER the in-srgb brand-overlay.
- The dark `--foreground` warm (`hsl(30 14% 90%)`), the dark `--surface-tint-*` `oklch(from …)`
  derivation (they re-resolve over the warmer dark plate; no edit).

---

## 2 — WHY THIS IS GESTALT, NOT A WORKAROUND

- **Single token, whole family.** `--card` is the ONE fill source; warming it (FIX-A light /
  FIX-C dark) lifts every glass surface in ONE edit per mode — the token-first single-family
  discipline the no-gray defect demands. No per-surface hardcode.
- **No re-fork, no new recipe, no new class.** Every change is a token VALUE on an existing
  compose seam. The recipe, tint seam, dark arm, and motion are byte-untouched.
- **Chroma-first, AA-preserving.** FIX-A/C are near-constant-L moves (light 0.980→0.974, dark
  0.281→0.295) so every AA pair re-ratifies (16.32:1 light / 12.23:1 dark fg/plate).
- **Six-layer composite honored.** FIX-A restores the warm-tint layer (the plate's own
  chroma); FIX-D restores the saturate layer's warmth-from-backdrop (transmission); the
  rim/catch-light/shadow/grain layers are structurally present and verified.
- **BOTH modes.** Light → warm-cream-luminous; dark → warm-luminous-dark-that-glows — the brief
  binds both, and FIX-A + FIX-C + FIX-D + the frozen dark companions deliver both.
- **The gate that lied is fixed.** `proof:no-gray`'s `PLATE_FLOOR` certified a gray plate;
  raising it to the warm-material band + the floating-plate witness + the π readback closes the
  source-green/visually-broken hole — the SAME close-class the gate's own header was written to
  kill.

---

## 3 — THE GATE EXTENSION (`proof:no-gray`, extended in place — no new gate, no new KEY)

| # | file | change | HEAD | NEW |
|---|---|---|---|---|
| **G1** | `scripts/proof-no-gray.mjs:217` | add `WARM_PLATE_FLOOR` const | — | `const WARM_PLATE_FLOOR = 0.010;` (the CHIP_FLOOR-class warm-material plate floor; ~2.8× the old `PLATE_FLOOR`; calibrated against the FIX-A floating composite C 0.0124 with headroom). Add to `facts.floors`. Keep `PLATE_FLOOR = 0.0035` ONLY as the thin Button-wash floor. |
| **G2** | `scripts/proof-no-gray.mjs:345-347` | re-point `card-plate-warm-light` | `cardPlateC >= PLATE_FLOOR (0.0035)` | `cardPlateC >= WARM_PLATE_FLOOR (0.010)` — born-RED on HEAD (0.0053 < 0.010), GREEN after FIX-A (0.0106). |
| **G3** | `scripts/proof-no-gray.mjs` (beside the resting/wash composite) | composite the FLOATING (0.80) rung + add `floating-plate-warm-light` | — | `const floatPlate = composite(cardRgb, 0.80, pageRgb); floatPlateC = rgbToOklab(floatPlate).C;` then `add("floating-plate-warm-light", floatPlateC >= WARM_PLATE_FLOOR, …)` — the literal dropdown-panel surface. Born-RED on HEAD (0.0059), GREEN after FIX-A (0.0124). |
| **G4** | `scripts/proof-no-gray.mjs` | add `plate-warm-hue-light` | — | `const floatOk = rgbToOklab(floatPlate); add("plate-warm-hue-light", floatOk.H >= WARM_HUE_LO && floatOk.H <= WARM_HUE_HI, …)` — the composite hue stays warm (FIX-A → 68.5°), not just `--card`. |
| **G5** | `scripts/proof-no-gray.mjs` | the dark arm — add `dark-card-warm-not-charcoal` | — | composite the dark `--card`@0.80 over the dark page; assert OKLab C ≥ `STRONG_FLOOR * 0.5` (0.010) at H ∈ [WARM_HUE_LO, WARM_HUE_HI]. Born-RED on HEAD dark (0.0066), GREEN after FIX-C (0.0182). The dark "too gray" half gate-locked. |
| **G6** | `tests-visual/no-gray.spec.ts` | extend the (b) roster | composites the default Card over the page | ADD the `/forms/select` open-dropdown: open the Select, `getComputedStyle(panel).backgroundColor` of the `.glass-floating` content over the real page → OKLab, assert C ≥ 0.010 warm (H ∈ [45,85]) in BOTH modes. The BINDING paint — maps 1:1 to `before-select-light.png`. ADD a toggle/glass `<Button>` composited-plate witness (the brief calls buttons out). |

**Gate impact:** `proof:no-gray` is EXTENDED in place (one new const, one re-pointed assert,
four new asserts split light/dark). Born-RED on HEAD, GREEN after the fix. The existing
`WARM_HUE_LO/HI` (45/85), `STRONG_FLOOR`, `CHIP_FLOOR`, the KEEP-NEUTRAL byte-asserts, the AA
re-ratification arms, and the dark `(e)` arm are UNTOUCHED (FIX-A/C are chroma-only at
near-constant L; every AA pair re-ratifies). NO other gate is impacted: `proof:glass-cal`
(radius/level axis — untouched), `proof:dark-material` (the six dark witnesses + the
saturate/brightness companions — untouched; the dark `--card` chroma lift is a no-gray
concern, gate-locked by G5), `proof:adaptive-glass` (the tint seam — frozen), `proof:glass-
cohesion` (allowlist — untouched). The FIX-D saturate move is asserted ONLY by the existing
`proof:glass-cal`-adjacent saturate-ladder note (no new assert needed — it is a calm-vs-deep
fence check: `--glass-saturate-floating (1.6) < --glass-saturate-deep (1.8)`).

---

## 4 — MOTION (the liquid-weight law — VERIFY, mint nothing)

This is a glass-MATERIAL fix; it must NOT regress the existing liquid motion. The dropdown
OPEN already blooms with `.glass-reveal` (BB.W-LIQUID-REVEAL — scale + fade + `filter:
blur(4px)→0` on `--spring-snappy` + the per-spring duration clock, the reka-portaled Select/
Dropdown composing it; `transform-origin: var(--reka-popper-transform-origin)`). The press
squish (`--scale-press` no-JS floor + `useSpringPress`/`useLiquidFlex` interruptible register)
+ the menu-row lift (`--menu-row-lift` on `--spring-smooth`) are shipped.

**Action: VERIFY the wiring on a fresh capture, mint nothing.** If the live π shows a flat
bezier zoom on the dropdown (the `.glass-reveal` class absent on the content), the fix is
WIRING the class — NOT minting a spring. All channels stay compositor-only
(`transform`/`opacity`/`filter` — `proof:no-layout-animation` floor), PRM-carved (the reveal
PRM block zeroes scale/translate/blur, keeps the fade; the menu PRM block zeroes the lift),
Safari-compatible (the spring `linear()` curves + the `filter` blur-settle on the surface's
OWN pixels — NOT `backdrop-filter`, which would clobber the resting plate blur). The
warm-luminosity arms (FIX-A/C/D) are static token values — no animated channel, no
liquid-weight obligation of their own beyond not regressing the shipped reveal.

---

## 5 — ACCEPTANCE CRITERIA (the binding gestalt verdict, BOTH modes, FRESH capture)

The wave closes ONLY when ALL hold, measured on a FRESH whole-page capture over the real
backdrop in BOTH modes (the `proof:ba-gestalt` discipline — a per-mechanism ΔC is necessary
but not sufficient; the human-read gestalt "warm-cream luminous glass, not gray" is the bar):

1. **NO-GRAY (headline).** Every enrolled glass surface — the select dropdown panel, the glass
   cards, the toggle/glass buttons, the dock — resolves a COMPOSITED warm chroma (final
   C ≥ 0.010 light / ≥ 0.010 dark, H ∈ [60,85]) over its real backdrop in BOTH modes. (Grey
   separates by L, warmth by C+H — the paint-arm parses oklab.)
2. **LUMINOUS + TRANSMISSIVE.** The backdrop reads THROUGH the glass tinted warm (the Maps-card
   read) — the plate is not an opaque slab. Verified by a busy/aurora backdrop modulating the
   plate (FIX-D's saturate carries this).
3. **READABLE TEXT.** `--foreground` body ≥ 4.5:1 AND `--muted-foreground`/on-glass ≥ 4.5:1
   over the composited warm plate, BOTH modes (verified: light 16.32:1, dark 12.23:1 fg/plate).
   No regression of the on-glass-fg family.
4. **BUTTONS ARE WARM, NOT GRAY.** A glass/toggle `<Button>` reads as warm transmissive
   material (or carries an accent hue for prominence) — never gray glass.
5. **TIER SEPARATION PRESERVED.** The ladder stays alpha-monotonic + the deep tier stays the
   richest (saturate 1.8 ceiling untouched); content tiers stay CALMER than deep.
6. **BOTH MODES.** Light → warm-cream-luminous; dark → warm-luminous-dark-that-glows — neither
   reads gray/charcoal/dead.
7. **LIQUID-WEIGHT un-regressed.** The dropdown bloom + press squish + menu lift ride the
   spring + fade-coupled register, compositor-only, PRM-carved, Safari-floored.
8. **IDIOMATIC / NO-LEGACY.** Token-first (lift the named chroma/saturate INPUTS, not a
   parallel recipe); clean break, no alias; the in-srgb `--surface-tint-*` fence UNTOUCHED; the
   `proof:no-gray` floor RAISED to a perceptual bar (the gate that lied is fixed).

**The captured DELTA** (before/after of `before-select-light.png` + `before-glass-material-
light.png` + a dark twin, side-by-side) IS the close artifact ([[feedback-live-verify-
capture]] — "live-verified" needs a captured DELTA, not a commit claim).

---

## 6 — A11Y / PRM / SAFARI RULES (binding)

- **A11Y.** AA contrast re-ratified after every L move (verified above; FIX-A/C are chroma-
  first, L holds). The on-glass-fg family (`--on-glass-muted` &c.) re-resolves over the warmer
  plate — verify it clears 4.5:1 (it does; the plate is warmer AND no darker). `prefers-
  contrast: more` rides the existing `--glass-level` opacity bracket + the tint-toward-ink bias
  — UNTOUCHED (FIX-A warms the fill it composites over, so the high-contrast register is warmer
  too, not grayer).
- **PRM.** No animated channel is added — the static token values carry no motion. The shipped
  `.glass-reveal` / press / menu-lift PRM carves are UNTOUCHED. `prefers-reduced-transparency:
  reduce` rides `--glass-level: 0` (the opaque escape) — the now-warmer `--card` is the SOLID
  fill it collapses to, so the reduced-transparency plate is warm-cream, not gray. Verify the
  opaque escape reads warm.
- **SAFARI.** The warmth lifts on the cross-engine base (`--card` source color +
  `backdrop-filter: blur() saturate()` — both Safari-supported since 9/14). FIX-D's `saturate()`
  is the cross-engine warmth term (NOT the Chrome-only `.glass-lens` SVG filter — the lens is
  the §7 progressive-enhancement refinement, never load-bearing on the warm read). The reveal
  blur-settle rides `filter` on the surface's own pixels (Safari-safe), never `backdrop-filter`.
  Verify the warm read on WebKit (the [[feedback-live-pi-oklab-paint-arm]] discipline — run the
  π in both engines if the harness supports it; at minimum the Chromium π + a manual WebKit
  spot-check of the select panel).

---

## 7 — THE EXACT EDIT LIST (implementer — compose existing seams, never re-fork)

| # | file | HEAD | NEW | seam |
|---|---|---|---|---|
| A1 | `src/styles/tokens/color-radius.css:72` | `--card: hsl(36 48% 97%);` | `--card: hsl(30 85% 96%);` | the SOLE glass-rung fill source |
| A2/C2 | `src/styles/tokens/light-dark.css:101` | `light-dark(hsl(36 48% 97%), hsl(24 8% 16%))` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | §2c lockstep — BOTH args |
| C1 | `src/styles/tokens/dark-arm.css:74` | `--card: hsl(24 8% 16%);` | `--card: hsl(26 22% 17%);` | dark fallback floor lockstep with C2 |
| D1 | `src/styles/tokens/glass.css:113-115` | `--glass-saturate-{wash,quiet,resting}: 1.05;` | `1.4;` | warm-luminosity content companion |
| D2 | `src/styles/tokens/glass.css:116` | `--glass-saturate-floating: 1.18;` | `1.6;` | transmission term, below deep 1.8 |
| D3 | `src/styles/tokens/glass.css:117` | `--glass-saturate-overlay: 1.2;` | `1.6;` | dropdown-panel tier |
| G1 | `scripts/proof-no-gray.mjs:217` | — | `const WARM_PLATE_FLOOR = 0.010;` + add to `facts.floors` | new warm-material plate floor |
| G2 | `scripts/proof-no-gray.mjs:345` | `>= PLATE_FLOOR` | `>= WARM_PLATE_FLOOR` | re-point `card-plate-warm-light` |
| G3 | `scripts/proof-no-gray.mjs` | — | composite 0.80 rung + `floating-plate-warm-light` C ≥ `WARM_PLATE_FLOOR` | new witness (the Select panel) |
| G4 | `scripts/proof-no-gray.mjs` | — | `plate-warm-hue-light` H ∈ [45,85] on the composite | composite-hue witness |
| G5 | `scripts/proof-no-gray.mjs` | — | `dark-card-warm-not-charcoal` (dark plate C ≥ 0.010 warm) | dark "too gray" half |
| G6 | `tests-visual/no-gray.spec.ts` | the (b) roster | ADD `/forms/select` open-panel + a glass Button composited-plate OKLab readback, BOTH modes, C ≥ 0.010 warm | the BINDING paint |

**HELD (conditional):** H1 page `--neutral-0` warm lift · H2 floating/overlay rim-α bump —
apply ONLY on a live-π read defect. **FROZEN:** §1 FROZEN list.

---

## APPENDIX — diagnostic (reproducible, /tmp/oklab-check.mjs)

Same hsl→sRGB→OKLab plumbing `proof-no-gray.mjs` carries — the gate's new asserts read the
SAME numbers. Verified: light `--card` C 0.0066→0.0148; light floating plate C 0.0059→0.0124
H 68.5; dark `--card` C 0.0075→0.0216; dark floating plate C 0.0066→0.0182; AA light 16.32:1 /
dark 12.23:1.
