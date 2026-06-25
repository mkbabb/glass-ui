# BD.W-GLASS-ABROGATE-GRAY — abrogate the dark-gray glass; warm-cream luminous transmissive material, both modes

**Band:** BD union — viz/refine.
**Class:** token-first glass-material refine (no re-fork, no new recipe, compositor-only, PRM-carved, Safari-floored).
**Build-spec:** `docs/tranches/BD/viz/refine/glass-abrogate-gray/BUILD-SPEC.md` (the exact tokens + before/after + gate impact + a11y/PRM/Safari rules).
**North star:** `design.md` six-layer optical composite · iOS-27 Liquid Glass · glass+PAPER morphism · `CLAUDE.md` §BA.W-NO-GRAY (glass is warm MATERIAL, never gray) · §W-DARK-MATERIAL · `[[feedback-liquid-weight-universal]]`.

---

## THE DEFECT (live user screenshots, both modes)

The glass reads too GREY/DARK. The select dropdown panel is a flat medium-gray plate in LIGHT
mode; the glass cards are far too gray; the toggle buttons are gray glass (buttons must NOT be
gray glass); surfaces read too gray/dark and the TEXT ISN'T READABLE. Target: iOS-27 Liquid
Glass — warm-cream LUMINOUS TRANSMISSIVE glass everywhere, real warm chroma, NEVER a dark-gray
cast, readable text, BOTH modes (the Maps card: backdrop shows THROUGH the glass tinted, with
vibrant accents — not a gray slab).

## ROOT CAUSE (one line)

The compose recipe + adaptive tint seam + dark arm all work as authored — they faithfully
composite **chroma-starved source tokens**: light `--card` `hsl(36 48% 97%)` → OKLab C 0.0066
(floating plate composites to C 0.0059); dark `--card` `hsl(24 8% 16%)` → C 0.0075 (charcoal).
The perceptual warm-material threshold is C ≈ 0.012–0.020 — every plate lands a third of the
way there, so it reads gray. `proof:no-gray`'s `PLATE_FLOOR = 0.0035` greened the gate while
the eye reads gray (the source-green / visually-broken close-class). **Fix is token-first.**

## THE BUILD (compose existing seams; ZERO recipe edit, ZERO new class)

`--card` is the SOLE fill source for every glass rung — warm it once, the whole family lifts.

1. **FIX-A (keystone, light).** `--card` `hsl(36 48% 97%)` → **`hsl(30 85% 96%)`**
   (`color-radius.css:72` + the `light-dark.css:101` light arg, §2c lockstep). The hue is
   LOWERED (36→30) as saturation rises so OKLab H stays ≤ 78° (the yellow-green hue-drift trap
   the `WARM_HUE_HI: 85` forbids). Result: floating plate **C 0.0124 H 68.5** L 0.976 (2.1× the
   gray HEAD), AA fg 16.32:1.
2. **FIX-C (dark, the "too gray" half).** dark `--card` `hsl(24 8% 16%)` → **`hsl(26 22% 17%)`**
   (`dark-arm.css:74` + the `light-dark.css:101` dark arg, lockstep). The W-DARK-MATERIAL arm
   lifted L but left sat at 8% (charcoal); this warms it onto the identity. Result: dark
   floating plate **C 0.0182 H 59.2** (warm-luminous, the saturate/brightness companions glow),
   AA fg 12.23:1.
3. **FIX-D (light warm-luminosity / transmission).** the light content `--glass-saturate-*`
   companion: wash/quiet/resting `1.05` → **`1.4`**, floating `1.18` → **`1.6`**, overlay `1.2`
   → **`1.6`** (`glass.css:113-117`). Toward the apple.com nav `saturate(1.8)` load-bearing
   term, BELOW the deep-tier ceiling (the calm-vs-deep fence). Pulls the warm backdrop THROUGH
   the glass on the live routes (transmission, the Maps-card read).

**HELD (apply only on a live-π read defect):** page `--neutral-0` warm lift · floating/overlay
rim-α bump. **FROZEN:** the tint-strength clamp + `--glass-tint-ink`, the opacity/blur-radius
ladder, the dark saturate arm, the spring/scale motion tokens, the in-srgb `--surface-tint-*`
family (AW.W26), the dark `--foreground` + `oklch(from …)` surface-tint derivation.

**Motion:** VERIFY (mint nothing). The dropdown bloom (`.glass-reveal`), press squish
(`--scale-press` + `useSpringPress`), menu-row lift are shipped, compositor-only, PRM-carved,
Safari-floored. If the capture shows a flat zoom, WIRE the class — do not mint a spring.

## GATE — `proof:no-gray` EXTENDED IN PLACE (no new gate, no new KEY)

- **G1** `WARM_PLATE_FLOOR = 0.010` (CHIP_FLOOR-class warm-material plate floor; ~2.8× the old
  `PLATE_FLOOR`, calibrated against the FIX-A composite C 0.0124 with headroom). `PLATE_FLOOR =
  0.0035` KEPT only as the thin Button-wash floor.
- **G2** re-point `card-plate-warm-light` to `>= WARM_PLATE_FLOOR` — born-RED on HEAD (0.0053).
- **G3** composite the FLOATING (0.80) rung + `floating-plate-warm-light` C ≥ `WARM_PLATE_FLOOR`
  — the literal Select-panel surface; born-RED on HEAD (0.0059).
- **G4** `plate-warm-hue-light` — the composite hue H ∈ [45,85] (FIX-A → 68.5).
- **G5** `dark-card-warm-not-charcoal` — the dark `--card`@0.80/dark-page composite C ≥ 0.010
  warm; born-RED on HEAD dark (0.0066).
- **G6** `tests-visual/no-gray.spec.ts` — ADD the `/forms/select` open-dropdown panel + a glass
  `<Button>` composited-plate OKLab readback over the real page, C ≥ 0.010 warm, BOTH modes (the
  BINDING paint, maps 1:1 to `before-select-light.png`).

UNTOUCHED: `WARM_HUE_LO/HI`, `STRONG_FLOOR`, `CHIP_FLOOR`, the KEEP-NEUTRAL byte-asserts, the AA
re-ratification arms, the dark `(e)` arm. No other gate impacted (`proof:glass-cal`/`proof:dark-
material`/`proof:adaptive-glass`/`proof:glass-cohesion` all stay GREEN by construction — the
radius/level/tint/allowlist axes are untouched; the FIX-D saturate stays below the deep ceiling).

## GATE SKETCH (the real born-RED witness — `scripts/proof-no-gray.mjs`)

```js
// ── G1: the warm-material plate floor (NEW const) ─────────────────────────────
const WARM_PLATE_FLOOR = 0.010; // the CHIP_FLOOR-class warm-material PLATE floor.
// PLATE_FLOOR (0.0035) STAYS as the thin Button-wash floor ONLY.
facts.floors = { STRONG_FLOOR, CHIP_FLOOR, PLATE_FLOOR, WARM_PLATE_FLOOR, WARM_HUE_LO, WARM_HUE_HI, L_TOLERANCE };

// ── the composite witnesses (resting/wash already present; ADD floating 0.80) ──
let floatPlateC = null, floatPlateH = null;
if (cardRgb && pageRgb) {
    const floatPlate = composite(cardRgb, 0.80, pageRgb); // the .glass-floating dropdown panel
    const fok = rgbToOklab(floatPlate);
    floatPlateC = fok.C; floatPlateH = fok.H;
}
facts.floatPlateC = floatPlateC ? Number(floatPlateC.toFixed(4)) : null;

// ── G2: re-point card-plate-warm-light onto the warm bar ──────────────────────
add(
    "card-plate-warm-light",
    cardPlateC !== null && cardPlateC >= WARM_PLATE_FLOOR,
    `the default Card plate (--card@0.65 over the page) composites OKLab C = ${cardPlateC?.toFixed(4)} (≥ ${WARM_PLATE_FLOOR} warm-material — the gray gone). HEAD ≈ 0.0053 < 0.010 → born-RED.`,
);
// ── G3: the floating dropdown-panel witness (the literal Select surface) ──────
add(
    "floating-plate-warm-light",
    floatPlateC !== null && floatPlateC >= WARM_PLATE_FLOOR,
    `the .glass-floating dropdown panel (--card@0.80 over the page) composites OKLab C = ${floatPlateC?.toFixed(4)} (≥ ${WARM_PLATE_FLOOR}). HEAD ≈ 0.0059 < 0.010 → born-RED; FIX-A → 0.0124 GREEN.`,
);
// ── G4: the composite hue stays warm (not just --card) ────────────────────────
add(
    "plate-warm-hue-light",
    floatPlateH !== null && floatPlateH >= WARM_HUE_LO && floatPlateH <= WARM_HUE_HI,
    `the floating plate composites OKLab H = ${floatPlateH?.toFixed(1)}° (in [${WARM_HUE_LO},${WARM_HUE_HI}]° warm). FIX-A → 68.5°.`,
);
// ── G5: the dark "too gray" half — dark --card not charcoal ───────────────────
const darkCardRgb = colorToRgb(/* dark --card arg from light-dark.css / dark-arm.css */);
const darkPageRgb = colorToRgb(/* dark --neutral-0 */);
let darkPlateC = null, darkPlateH = null;
if (darkCardRgb && darkPageRgb) {
    const dp = composite(darkCardRgb, 0.80, darkPageRgb);
    const dok = rgbToOklab(dp); darkPlateC = dok.C; darkPlateH = dok.H;
}
facts.darkPlateC = darkPlateC ? Number(darkPlateC.toFixed(4)) : null;
add(
    "dark-card-warm-not-charcoal",
    darkPlateC !== null && darkPlateC >= 0.010 && darkPlateH >= WARM_HUE_LO && darkPlateH <= WARM_HUE_HI,
    `the dark .glass-floating plate (dark --card@0.80 over the dark page) composites OKLab C = ${darkPlateC?.toFixed(4)} at H ${darkPlateH?.toFixed(1)}° (≥ 0.010 warm — the charcoal gone). HEAD ≈ 0.0066 < 0.010 → born-RED; FIX-C → 0.0182 GREEN.`,
);
```

**Born-RED on HEAD** (`card-plate-warm-light` 0.0053 < 0.010, `floating-plate-warm-light` 0.0059
< 0.010, `dark-card-warm-not-charcoal` 0.0066 < 0.010). **GREEN after the fix** (0.0106 /
0.0124 / 0.0182). The π arm (`tests-visual/no-gray.spec.ts` G6) is the BINDING truth — the live
`getComputedStyle(selectPanel).backgroundColor` → OKLab readback over the real page, both modes;
the source-arm floor can never substitute for the paint.

## ACCEPTANCE (binding gestalt, BOTH modes, FRESH whole-page capture)

1. NO-GRAY — every enrolled glass surface (select panel · cards · toggle/glass buttons · dock)
   composites warm C ≥ 0.010, H ∈ [60,85], BOTH modes.
2. LUMINOUS + TRANSMISSIVE — backdrop reads THROUGH tinted warm (FIX-D), not an opaque slab.
3. READABLE TEXT — body + muted/on-glass ≥ 4.5:1 over the warm plate (light 16.32:1 / dark
   12.23:1).
4. BUTTONS warm-not-gray.
5. TIER SEPARATION preserved (alpha-monotonic; deep stays richest at saturate 1.8).
6. BOTH MODES — light warm-cream-luminous; dark warm-luminous-dark-that-glows.
7. LIQUID-WEIGHT un-regressed (the bloom/press/lift ride the spring + fade-coupled register,
   compositor-only, PRM-carved, Safari-floored).
8. IDIOMATIC / NO-LEGACY — token-first, clean break, in-srgb `--surface-tint-*` fence untouched,
   the gate floor RAISED.

**Close artifact:** the captured DELTA — before/after of `before-select-light.png` +
`before-glass-material-light.png` + a dark twin, side-by-side ([[feedback-live-verify-capture]]).

## A11Y / PRM / SAFARI

- A11Y — AA re-ratified after each L move (chroma-first, L holds); on-glass-fg re-resolves over
  the warmer/no-darker plate; `prefers-contrast: more` rides the existing bracket (now warmer).
- PRM — no animated channel added; the shipped reveal/press/lift carves untouched; `prefers-
  reduced-transparency` collapses to the warm `--card` solid (verify the opaque escape reads
  warm).
- SAFARI — warmth on the cross-engine base (`--card` color + `backdrop-filter: blur() saturate()`,
  both Safari-supported); FIX-D `saturate()` is the cross-engine warmth term (NOT the Chrome-only
  lens); the reveal blur-settle rides `filter` (surface pixels), never `backdrop-filter`. Spot-
  check the select panel on WebKit.

## MIGRATION

None. Token-VALUE moves on existing seams; no public prop/recipe/class change; clean break (no
alias). Every `--card`-derived surface inherits the warm lift automatically.
