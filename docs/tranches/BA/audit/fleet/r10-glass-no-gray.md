# BA fleet · LANE r10-glass-no-gray (R10-5 — "a better designed glass system for cards, buttons, etc. No gray.")

The design INPUTS for Fable's synthesis. This lane CENSUSES where gray comes from across
the token system and characterizes what makes the best HEAD surfaces warm-not-gray — Fable
designs the redesigned card/button registers, this lane supplies the levers and the bounds.

Audited master @ HEAD (v3.13.0); live-probed :5210 (the user's audit instance), BOTH modes,
computed-style + canvas-resolved OKLab chroma readback. Builds ON the R9 self-engage proof
(`USER-AUDIT-2026-06-12-R9.md`), the dark-register lane (`dark-register.md` — the DARK gray
diagnosed exhaustively; not re-derived here), the glass-variant-census (the tone-clobber
matrix), and the tabs lane (`r10-tabs-overhaul.md` §231-268 — converges on this bar). Captures
beside this file: `r10-nogray-{card,buttons}-{light,dark}.png`.

## The chroma floor (the decidable "is it gray" test)

A surface reads as GRAY when its OKLab chroma **C < ~0.020** (the perceptual floor below which
a hue is indistinguishable from neutral at UI scale). The house identity is WARM: `--foreground`
hsl(24…) ink, the `--neutral-*` ladder authored at hue 48 (warm paper), the section/viz palette
at C ≈ 0.09–0.22. Gray appears wherever the warm hue is specified but the **saturation is too
low at that lightness to clear the floor**, OR where an oklab mix toward ink/cream cancels the
chroma. Every value below is the canvas-resolved OKLab C of the RESOLVED token (not the source
hsl()), so a "warm" spec that resolves achromatic is caught.

## THE GRAY-SOURCE CENSUS (resolved chroma, both arms)

Live readback. LIGHT arm forced via a `color-scheme:light` wrapper (the app hard-pins
`color-scheme:dark` under `.dark`, so a class-removal alone leaves the dark `light-dark()` arm);
DARK arm read directly (the `:5210` instance resolves dark by default).

| # | token / recipe | LIGHT resolved → C | DARK resolved → C | consumers (grep) | WHY it grays | verdict |
|---|---|---|---|---|---|---|
| G1 | **default Card plate** = `glass-resting` + the self-engage | `rgb(182,180,179)` **C=0.0027** L=0.77 | `oklab(.785/.79)` **C≈0.005** (R9) | `Card.vue:162` (every default `<Card>`); Toast, Notification, Popover, Sheet, Dialog bases | the AZ self-engage `ladder.css:185-196` mixes the cream/near-black plate **20% toward `--glass-tint-ink`** (`--glass-tint-strength-aa:20%`, glass.css:261) over a FLAT page → the oklab mix toward warm-ink/cream CANCELS the plate's chroma → flat gray. **R9 baseline row** — do not re-derive. | **WARM-IT** (R9: conditionalize the 20% on the bright signal; unconditional floor ~6-10%; W-DARK-MATERIAL scope 7) |
| G2 | **default Card plate, self-engage OFF** | `rgb(250,250,249)` **C=0.0013** L=0.985 | n/a | as G1 | even WITHOUT the self-engage, the plate is `--card`@0.65 over the cream page = near-white achromatic. Glass is TRANSMISSIVE — over a FLAT page there is no chroma behind it to modulate, so the plate is its own near-neutral cream. The gray is the BACKDROP's fault as much as the plate's (the `/display/card` tier cards DO read as glass — they sit over the demo's teal/cream gradient; the chrome cards over the flat page do not). | **CHROMA-IT the backdrop** (W-STAGE rich per-route backgrounds) + a warm-bias in the bg mix (lever L1) |
| G3 | **`--neutral-2` / `--secondary`** | `rgb(232,231,227)` **C=0.0055** L=0.93 | `rgb(43,40,39)` **C=0.0048** L=0.28 | `bg-secondary` ×10 (Badge `secondary`, Button `secondary`, SheetContent close, ToggleGroup, …); `--secondary: var(--neutral-2)` (color-radius.css:63) | the warm-48 hue at L90/sat-9% resolves C=0.0055 — below floor. A "warm chip" that paints flat gray. | **WARM-IT** (chroma floor on the ladder, lever L2) |
| G4 | **`--neutral-3` / `--accent`** | `rgb(213,211,205)` **C=0.0085** L=0.87 | `rgb(59,56,53)` **C=0.0067** L=0.34 | `bg-accent` (Button `accent`/`outline`-hover, Toggle, DialogContent, menuItemVariants) | same — hue 48 / sat 8% / L82 → C=0.0085, the hover/highlight register reads gray-on-gray (R10-2 tabs vertical panel, gray-on-gray) | **WARM-IT** (lever L2) |
| G5 | **`--neutral-4` / `--border` / `--input`** | `rgb(184,182,173)` **C=0.0128** L=0.78 | `rgb(91,86,82)` **C=0.0092** L=0.46 | `--border`/`border-border`/`--border-soft` ×22 families (every card/panel/divider edge); `--input` | the edge that should be a warm hairline resolves a cool-neutral C=0.0128. The library's edges read gray, not warm-cream. | **WARM-IT** (border warm-tint, lever L3) — KEEP-NEUTRAL for true dividers/`<Separator>` |
| G6 | **`--neutral-5` / `--muted-foreground`** | `rgb(108,106,96)` **C=0.0155** L=0.52 | `rgb(163,161,153)` **C=0.0117** L=0.71 | `text-muted-foreground` ×57 families (every caption, blurb, secondary label, unit) | body/caption ink at C=0.012-0.016 — the muted register is a flat warm-gray. This is the MOST-consumed gray (57 families). | **WARM-IT** (lever L2 lifts it to ≥floor without changing L — the ink stays muted but reads warm) |
| G7 | **dark `--primary`** | `rgb(28,25,23)` (light primary is the ink — fine) | `rgb(232,231,227)` **C=0.0055** L=0.93 | `bg-primary` (Button `solid`/`primary-audacious`), Slider range fill `Slider.vue:200`, Badge `default`, Switch/Checkbox accent | `dark-arm.css:59` `--primary: hsl(48 10% 90%)` — achromatic cream. EVERY filled/active/selected control in dark paints a pale-gray slab with ZERO brand chroma. **DARK-2 baseline row.** | **CHROMA-IT** (re-anchor dark `--primary` onto a real hue; W-DARK-MATERIAL scope 4) |
| G8 | **the glass `default`/`glass`/`glass-wash` Button** | `rgb(202,201,200)` **C=0.0018** L=0.84 | `rgb(59,57,55)` **C=0.0044** L=0.35 | `button/index.ts:35,73,75` — the DEFAULT `<Button>` (AX.W54 glass-first) | a bare `<Button>` = `glass-wash`+`btn-glass` over the flat page → composites to C=0.0018 gray pill (G1+G2 compounded: achromatic plate + flat backdrop). The user's "no gray" names buttons FIRST — and the DEFAULT button is the grayest. | **CHROMA-IT the backdrop** (L1) + the warm-bias plate (L1); the `secondary`/`accent`/`outline`/`ghost` variants ride G3/G4 |
| G9 | **`--glass-border-*`** (foreground-tinted) | `color-mix(srgb,--foreground 8-18%,transparent)` → warm but very faint | same | every `.glass-*` rung edge (ladder.css) | the edge IS warm (rides `--foreground` hsl(24)), but at 8-12% α over a near-white plate it is a near-invisible hairline — the plate has no carved silhouette, reading as a borderless gray rectangle. | **WARM-IT** (lift the rim's warm presence, lever L3 — couples with the dark-edge-light work in W-DARK-MATERIAL scope 2) |
| G10 | **`--warning-foreground`** | `hsl(24 10% 10%)` warm ink (fine) | same | Notification/Alert warning glyph | KEEP — correct (dark warm ink on the luminous amber plate). | **KEEP-NEUTRAL** |
| G11 | **`--overlay-scrim-ink` / shadow family** | `hsl(24 10% 10%)` warm ink, low-α | same | modal scrims, `--shadow-color`/cartoon shadows | KEEP — a scrim/shadow MUST recede to neutral ink; warming it would tint the room. | **KEEP-NEUTRAL** (the `in srgb` shadow fence is house identity, CLAUDE.md) |
| G12 | **`--neutral-1` / `--muted` / page `--neutral-0`** | `rgb(244,243,241)` C=0.003 / page `rgb(251,250,249)` C=0.0017 | `rgb(30,28,26)` C=0.005 / page `rgb(17,15,14)` C=0.004 | `bg-muted`, page/card backgrounds | the substrate. KEEP-NEUTRAL as a SURFACE (a page should be calm), but the DARK page↔card 4-L collapse is the dark-register disease (DARK-1, W-DARK-MATERIAL scope 1) — that is a LUMINANCE problem, not a chroma one. | **KEEP-NEUTRAL** (chroma) — luminance owned by W-DARK-MATERIAL scope 1 |

**The pattern**: the warm-48 ladder is *specified* warm but *resolves* achromatic because the
saturation (6-10%) is too low at the chip/border/muted lightness band (L40-95) to clear the
chroma floor. The hue is right; the chroma is starved. This is a SINGLE systemic defect with a
single-family fix (a chroma floor on the ladder), NOT 9 per-token edits.

## CARDS + BUTTONS (the user names them) — live π, both modes

**Cards** (`r10-nogray-card-{light,dark}.png`, `/display/card`): the five tier cards
(wash/quiet/resting/floating/overlay) stage over the demo's teal/cream GRADIENT and DO read as
warm translucent glass — color transmits through. Every OTHER card on the page (the polymorphic-
root card, the nested-card demo, the 404 "Lost in the lattice" card on `/display/card`'s 404)
sits over the FLAT page and composites to a flat gray slab (G1+G2, C=0.0027). **The cartoon-
shadow cards (Rose/Amber/Teal §) carry section-color tints — the positive reference.** The dark
capture: the tier cards over the dark gradient still read; the flat-page cards are the charcoal
slabs of DARK-1.

**Buttons** (`r10-nogray-buttons-{light,dark}.png`, `/display/buttons`): the Variants row —
`default`, `secondary`, `outline`, `accent`, `ghost`, `glass`, `glass-wash` — are ALL pale
gray/cream pills, visually near-indistinguishable from the page and from each other. ONLY
`destructive` (red C=0.20), `ai` (amber), `link` (red text), and the chromatic-viz chips
(pink/teal/purple) carry chroma. **The DEFAULT button (glass, G8) is the grayest of all.** Why:
the glass plate is achromatic (G2) AND the flat page gives it nothing to transmit (the plate
blur is imperceptible over a flat substrate — CLAUDE.md AX.W54's own caveat). The neutral-fill
variants (secondary/accent/outline/ghost) ride the starved ladder (G3/G4). So buttons gray
through TWO chains at once: the glass-over-flat chain (default/glass) and the starved-neutral
chain (secondary/accent/outline/ghost).

## THE DESIGN INPUTS — what makes the BEST HEAD surfaces warm-not-gray (the Fable checklist)

The gold-standard reads at HEAD that DON'T gray:
- **the `math-paper.vue` calm idiom** (CLAUDE.md W-SUFFUSE gold standard): a `border-l-[3px]`
  section-accent rail (a real `--section-color-*` hue, C≈0.09-0.18) + a paper-grain wash + a
  warm-cream surface. The ONE color event carries the warmth; the surface stays calm.
- **the cartoon-shadow Rose/Amber/Teal cards** (`/display/card`): a `color-mix(…25%,transparent)`
  section-color backplate + a warm offset-stamp shadow (`--shadow-cartoon` rides `--foreground`).
- **the `/display/card` tier cards over the demo gradient**: glass reading as glass because there
  IS a rich warm backdrop to transmit (proving the backdrop is half the fix).
- **the icons.vue chip register** (the one-color-event reference): a low-α section-color fill
  under a full-chroma glyph.

The redesigned card/button registers must satisfy, as a binding checklist:
1. **A warm tint direction in the plate** — the glass bg mix carries a *toward-warm-cream* bias
   (not toward-neutral), so even a flat-backdrop plate reads warm, not gray (lever L1).
2. **A warm, present edge catch-light** — the rim is a visible warm hairline that carves the
   silhouette (G9/L3), not an 8%-α near-invisible foreground tint.
3. **Warm shadow** — already correct (`--shadow-color: --foreground` hsl(24)); KEEP.
4. **A rich warm backdrop behind the glass** — glass needs something to transmit; the flat page
   is the root of the default-button gray (W-STAGE).
5. **Chroma at the floor everywhere a hue is named** — secondary/accent/border/muted clear
   C≥0.020 so a "warm chip" reads warm (L2).

## THE 3-5 TOKEN-LEVEL LEVERS (bounded edits, whole-system reach)

- **L1 — a warm-bias in the glass bg mix (the keystone for cards+buttons).** Today
  `--glass-bg-*` = `color-mix(in srgb, var(--card) …%, transparent)` over a near-neutral `--card`.
  Add a small unconditional warm-bias to the mix SOURCE (mix `--card` a few % toward a warm-cream
  tint token, OR re-anchor `--card` itself a hue-step warmer with a touch more sat) so every
  glass plate carries warmth over ANY backdrop. ONE seam (glass.css:127-138), reaches every
  Card/Button/Toast/Popover/Dialog/Sheet plate. **Couples with the R9 self-engage recalibration**
  (G1): the self-engage must mix toward this warm bias, not cancel it.
- **L2 — a warm-chroma FLOOR on the `--neutral-*` ladder.** Lift the saturation of `--neutral-2..6`
  (and thereby `--secondary`/`--accent`/`--border`/`--muted-foreground`) so each resolves C≥0.020
  at its L — the hue stays 48, the L stays put (legibility/contrast unchanged), only the chroma
  lifts off the floor. ONE family edit (color-radius.css:27-41 + light-dark.css:69-76 +
  dark-arm.css:32-43 in lockstep). Kills G3/G4/G5/G6 (the 57+10+22 consumer families) in one move.
  **This token does not exist today** (no chroma-floor mechanism anywhere in tokens/) — it is the
  net-new register the user's "no gray" asks for.
- **L3 — the border/rim warm re-anchor.** Lift `--glass-border-*` (G9) and `--neutral-4`/`--border`
  (G5) warm presence so the silhouette is a visible warm hairline. Bounded: the rim α/sat lifts
  just enough to carve the plate; KEEP `<Separator>`/disabled/scrim neutral.
- **L4 — dark `--primary` onto a real chroma (G7/DARK-2).** Re-anchor off `hsl(48 10% 90%)` onto a
  library-identity dark accent hue (a brand chroma, NOT a ppmycota preset — the fence). Filled
  controls carry identity. **Owned by W-DARK-MATERIAL scope 4.**
- **L5 — rich warm backdrops behind glass (G2/G8).** Not a token — the per-route background map.
  Glass cannot read as glass over a flat field; the default button's gray is half a backdrop
  problem. **Owned by W-STAGE.**

## CROSS-MAP TO BA — owned vs UNOWNED

| gray source | owned by | gap |
|---|---|---|
| G1 (self-engage gray over light) | **W-DARK-MATERIAL scope 7** (R9-1 folded) | OWNED |
| G7/L4 (dark `--primary` achromatic) | **W-DARK-MATERIAL scope 4** | OWNED |
| G12 dark page↔card luminance collapse | **W-DARK-MATERIAL scope 1** (luminance, not chroma) | OWNED |
| G9/L3-dark (dark edge-light below threshold) | **W-DARK-MATERIAL scope 2** (transmissive lift) | OWNED (dark only) |
| G2/G8/L5 (glass over flat backdrop) | **W-STAGE** (rich per-route backgrounds) | OWNED (demo-staging; the LIBRARY plate warmth is NOT) |
| tone-clobber opaque slabs (not gray, saturated) | W-FEEDBACK-TONE | OWNED (separate defect) |
| **L1 — warm-bias in the glass bg mix (LIGHT plate identity)** | — | **UNOWNED — candidate amendment** (the keystone: every light card/button plate reads gray over a flat backdrop because `--card`/`--glass-bg-*` is near-neutral; W-STAGE warms the BACKDROP but not the PLATE) |
| **L2 — warm-chroma floor on the light `--neutral-*` ladder (G3/G4/G5/G6)** | — | **UNOWNED — candidate amendment** (the 57+ muted-foreground + 22 border + 10 secondary + accent families gray in BOTH modes; NO BA wave re-anchors the light ladder; NO chroma-floor token exists) |
| **L3 — light `--border`/`--glass-border-*` warm re-anchor (G5/G9 light)** | — | **UNOWNED — candidate amendment** (W-DARK-MATERIAL touches only the DARK edge-light; the light hairline-reads-gray is unowned) |

**The headline gap**: BA owns the DARK gray (W-DARK-MATERIAL) and the over-LIGHT self-engage gray
(scope 7) and the flat-backdrop staging (W-STAGE) — but **the LIGHT neutral-ladder chroma starve
(L2) and the LIGHT plate warm-bias (L1) are UNOWNED.** The user's "no gray ... for cards, buttons"
is a LIGHT-MODE register defect on the default Card/Button as much as a dark one, and no current
wave moves the light ladder off gray. The clean amendment is a "no-gray register" wave (or a
W-DARK-MATERIAL companion / a W-GLASS-CAL fold): mint the warm-chroma floor (L2) + the glass-bg
warm-bias (L1) + the border warm re-anchor (L3) as ONE token-family edit, gated by a chroma-floor
π readback (every neutral-ladder consumer resolves C≥0.020; the default Card/Button plate reads
warm-not-gray over a flat page). Presets-in-consumers + the `in srgb` shadow fence + the
KEEP-NEUTRAL set (separator/disabled/scrim/shadow) bound it.

## Evidence (beside this file)
- `r10-nogray-card-light.png` / `r10-nogray-card-dark.png` — tier cards read over gradient, chrome cards gray over flat page.
- `r10-nogray-buttons-light.png` / `r10-nogray-buttons-dark.png` — the all-gray Variants row; only destructive/ai/link/viz-chips carry chroma.
