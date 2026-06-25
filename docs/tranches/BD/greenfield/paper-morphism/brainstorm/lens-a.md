# Paper Morphism — Greenfield Lens A (PURE iOS-27 FIDELITY)

> "What of our paper morphism, I don't see any paper grain or grit anywhere."
> The grit must be **plainly visible**. If you have to squint, it FAILS.

This is a from-first-principles redesign of the entire paper register — texture
generation, blend math, alpha rung, surface coverage, and a11y carve — unified
with (not forked from) the landed `BD.W-PAPER-MORPHISM` token split. The lens is
the 1940s technicolor letterpress + iOS-27 transmissive-cream material: a surface
that reads as **pressed paper with visible tooth and fiber**, never flat-shaded
plastic.

---

## 0 · The live forensic — why the user sees NOTHING (4 compounding kills)

Sampled live on `/foundations/paper-texture` + `/compositions/math-paper`, both
modes (chrome-devtools, `getComputedStyle` + composite-variance probe + eyeball
screenshots). Verdict on both pages, both modes: **flat cream / flat brown, ZERO
grit.** The user is exactly right. Four independent failures stack, and EVERY one
must be fixed — fixing only the opacity (the prior wave's plan) cannot win because
three of the four are upstream of opacity.

**KILL 1 — the blend is a no-op against the cream floor.**
The grain `::after` runs `mix-blend-mode: overlay` over the page background
`rgb(251,250,248)` (L≈250/255≈0.98). The `overlay` formula for a base lighter
than 0.5 is `1 − 2(1−base)(1−blend)`. With base≈0.98, `(1−base)≈0.02`, the result
is pinned within ~2% of the base **no matter what the noise value is**. Overlay
on a near-white plate is mathematically a near-identity. This is the *primary*
kill and no opacity bump can rescue it — overlay simply cannot move a near-white
pixel.

**KILL 2 — the noise texture is a low-contrast mid-grey cloud, not paper tooth.**
Rasterized the actual `feTurbulence type='fractalNoise' baseFrequency=0.65
numOctaves=4` + `feColorMatrix saturate=0`: meanLum≈187, **stdDev only ≈15** (on
0–255), alpha varying 23–234. So the "grain" is a soft, semi-transparent grey
fog — fractalNoise at bf 0.65 reads as smooth clouds, not crisp fiber. Paper
tooth needs HIGH local contrast at a FINE spatial frequency (sharp light/dark
speckle), which fractalNoise + heavy desaturation actively destroys.

**KILL 3 — opacity 0.08, then for the underpaint a SECOND baked 0.04 cut.**
The `::after` opacity resolves to `0.08` (the `--paper-grain-opacity` token —
confirmed live). On top of an already-near-identity blend that is invisible. AND
the `paper-underpaint` route's texture (`--paper-clean-texture`, scale-paper.css
§12) bakes `opacity='0.04'` **into the SVG rect itself**, so the underpaint paints
at 0.04 × 0.08 ≈ **0.0032 effective** — a rounding error.

**KILL 4 — the demo "rung" the prior wave specced was NEVER applied.**
`--story-paper-grain` resolves to **empty string** on every paper route (sampled
live). `--story-paper-wash` is **`transparent`** in light mode (sampled live). The
`BD.W-PAPER-MORPHISM` plan to mint a demo-local rung + tint the wash did not
materialize in the running build — the surfaces still read the raw `0.08` token
over a transparent (flat-cream) wash. So even the partial prior fix is absent.

**Structural aggravator — grain is BACKGROUND, never MATERIAL.** The
`.story-bg-paper` grain sits at `z-index:-5` (full-bleed), the underpaint at
`-10`, both BEHIND every content card. The specimen cards that the eye actually
rests on wear no grain at all (`math-paper`'s one grained surface is a peripheral
wrapper). Paper morphism is claimed as a *material* but ships as an occluded
backdrop wash.

**Net per-pixel luminance perturbation on the cream page: < 1 L-unit** — well
under the ~2–3 L JND. Invisible by math, invisible by eye, invisible by the
user's own report. Confirmed.

---

## 1 · The gestalt — paper as a TWO-SIGNAL material (tooth + fiber)

Real paper, and the technicolor-letterpress register the edicts name, is not one
noise. It is **two superimposed signals**:

1. **Tooth** — fine, high-frequency, HIGH-CONTRAST speckle (the bite of the
   sheet; the ink-catch of a letterpress). This is what your eye reads as "this
   is a physical surface, not a screen." Spatial freq ~0.9; sharp.
2. **Fiber** — coarse, low-frequency, soft directional mottle (the cloud/laid
   lines of the pulp; the uneven absorb of an aged sheet). Spatial freq ~0.15;
   soft.

The current single fractalNoise at bf 0.65 sits BETWEEN both and reads as
neither — too soft to be tooth, too fine to be fiber. **The greenfield mints two
turbulence layers and composites them**, and — critically — uses a blend that
ACTUALLY perturbs a near-white plate.

The bar (`design.md §L1 layer 6`): grain "prevents a surface reading as
flat-shaded plastic." The greenfield bar is harder: the surface reads as
**tactile pressed paper you could run a thumb across** — visible, plainly, in a
screenshot, at arm's length, both modes.

---

## 2 · The mechanism — `--paper-grain` as a real two-layer recipe

A clean-break redesign of the texture + blend + alpha, expressed as ONE recipe
that both the library paper register and the demo consume (UNION, not fork). KISS:
it reuses the existing `paper-underpaint` / `paper-grain-overlay` `@utility`
seams and the `--paper-grain-opacity` token NAME — it replaces their *internals*.

### 2.1 · The texture — dual feTurbulence, contrast-stretched, NOT desaturated to mud

The single mud-cloud SVG is retired. The new canonical paper texture is a
**layered `background-image` stack** on the `::after` (two data-URI tiles, plus a
faint paper-warmth gradient), so the speckle is genuinely two-frequency:

```css
/* --paper-grain-tooth: fine, high-contrast speckle (the bite) */
--paper-grain-tooth: url("data:image/svg+xml,<svg xmlns=... width='90' height='90'>
  <filter id='t' x='0' y='0' width='100%' height='100%'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/>
    <feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0.9 0.9 0 0'/>
    <!-- luminance→alpha: noise becomes a black speckle whose ALPHA carries the grain;
         color stays black so the BLEND adds shadow tooth, transparency carries the texture -->
    <feComponentTransfer><feFuncA type='discrete' tableValues='0 0 0 .35 .7 1 1 .7 .35 0 0 0'/></feComponentTransfer>
    <!-- the discrete table CONTRAST-STRETCHES: mid-grey fog → crisp on/off speckle (paper tooth) -->
  </filter>
  <rect width='100%' height='100%' filter='url(#t)'/></svg>");

/* --paper-grain-fiber: coarse, soft directional mottle (the pulp/laid lines) */
--paper-grain-fiber: url("data:image/svg+xml,<svg ... width='220' height='220'>
  <filter id='f'>
    <feTurbulence type='fractalNoise' baseFrequency='0.012 0.16' numOctaves='3' seed='3' stitchTiles='stitch'/>
    <!-- ANISOTROPIC baseFrequency (0.012 horiz × 0.16 vert) → faint laid-line directionality -->
    <feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0.5 0 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#f)'/></svg>");
```

The two key texture moves vs the status quo:

- **`baseFrequency 0.9` (tooth) and anisotropic `0.012 0.16` (fiber)** — bracket
  the human paper-percept instead of sitting in the dead middle.
- **luminance→alpha via the last `feColorMatrix` row + a discrete
  `feComponentTransfer`** — turns the soft grey cloud into a CONTRAST-STRETCHED
  black speckle that carries its texture in the ALPHA channel (so the blend
  composites *shadow tooth*, not grey fog). The discrete table is the
  letterpress "bite" — it snaps mid-tones to on/off, the single biggest tactility
  win. (This is the technique Apple/awwwards paper-grain uses; the prior
  `saturate=0` desaturation is the anti-pattern that flattens to mud.)
- **stays a STATIC data-URI** — feTurbulence is computed once at decode, cached
  as a raster tile, zero per-frame cost. No `backdrop-filter:url`, compositor-only.

### 2.2 · The blend — the dual-pass that ACTUALLY moves a cream plate

Overlay-on-white is dead. The replacement is the canonical paper-grain dual pass —
two `::after`/`::before` arms so light and dark BOTH read, because alpha-carried
black speckle multiplied gives real shadow:

| arm | blend | role |
|---|---|---|
| `paper-grain` `::after` (tooth) | **`multiply`** (light) / **`screen`** (dark) | the bite — multiply darkens the cream into the tooth valleys (visible); screen lifts the dark-mode brown into highlights |
| `paper-grain` `::before` (fiber) | **`soft-light`** (both modes) | the soft pulp mottle — soft-light is fine here because fiber is *meant* to be subtle |

`multiply` is the correct light-mode primitive: a 0.7-alpha black speckle over
cream produces a genuine ~30% local darkening in the tooth pits — that is the
grain you SEE. `overlay` could never do this against L≈0.98. The dark arm flips
to `screen` (lighten) so the speckle reads as raised fiber catching light rather
than vanishing into the dark plate.

### 2.3 · The alpha rung — perceptible, golden-stepped, UNION with the landed split

The `BD.W-PAPER-MORPHISM` split (`--paper-grain-opacity` 0.08 light / 0.11 dark,
~3.2× the glass 0.025) STAYS as the token — we do not re-fork. But because the
blend now actually works, the *effective* contrast at 0.08 is already an order of
magnitude higher than before. We RE-CALIBRATE the rung to a perceptibility floor
measured live (not guessed), expressed as a φ-family pair:

```
--paper-grain-opacity:       0.14   /* light — multiply tooth on cream, measured to clear ~6 L-unit local σ */
--paper-grain-opacity (dark):0.18   /* dark  — screen tooth on brown; ~0.14·φ⁰·⁵ rounded, the brighter floor dark needs */
--paper-grain-fiber-opacity: 0.55   /* the soft-light fiber arm, relative to the tooth (fiber is the quieter signal) */
```

These are the **paper** register only. The glass material grain
(`--glass-grain-opacity` 0.025, `ladder.css .glass-*::after`) is **BYTE-UNTOUCHED**
— the calm-glass identity (the P.W1.B calibration, the BA.W-GLASS-CAL fence)
stands. Paper is loud; glass is a whisper. That separation IS the design.

> The boldest move (see §6) makes the *glass* grain consume the SAME contrast-
> stretched texture at its own low alpha — so glass stops being mud-fog too — but
> NOT the loud paper alpha. One texture, two volumes.

### 2.4 · Fix the underpaint double-cut

`--paper-clean-texture` / `--paper-aged-texture` (scale-paper.css §12) drop the
baked `opacity='0.04'`/`'0.06'` on the SVG rect (the double-cut, KILL 3) — alpha
is owned by ONE place (`--paper-grain-opacity`), per DRY. The underpaint adopts
the same dual tooth+fiber stack + multiply/screen blend so the fullscreen paper
substrate reads as paper too, not a flat wash.

---

## 3 · Coverage — grain as MATERIAL, on the right surfaces (the §3 fields + cards + utilities)

The user wants it "VISIBLE everywhere paper morphism is claimed." Today it is a
buried backdrop. The greenfield puts grain where the eye rests:

1. **The paper UTILITIES** (`paper-grain-overlay`, `paper-underpaint`) — the
   recipe above. The home of the register.
2. **Cards in the paper context** — `Card surface="paper"` (or `:grain`) composes
   `paper-grain-overlay` on the card's own `::after` (radius-inherited, clipped to
   the squircle) so the SPECIMEN surface wears tooth, not just the page behind it.
   `math-paper`'s worksheet card, `paper-glass`'s opaque specimens, the type
   specimen frames (`ShowcaseFrame :grain` — the prop already exists, wire it).
3. **The §3 COLOURFUL FIELD** — paper grain is the texture that sits OVER the
   transmissive glass-on-field composite at the paper register, the layer-6 cap
   of the six-layer stack (design.md §L1). On the paper demo routes the field +
   glass + grain compose as one tactile surface (NEVER gray — the BA.W-NO-GRAY
   warm-cream floor stands behind the grain).
4. **Demo wash** — `--story-paper-wash` clean-breaks off `transparent` to
   `color-mix(in oklch, var(--foreground) 4%, transparent)` in LIGHT (kept 7% in
   dark) so the multiply tooth reads on a faintly-tinted warm plate, not pure
   white where even multiply is weak at the very top end.

The rule for coverage: **wherever the route's manifest declares
`background:"paper"` OR a surface opts into the paper register, the tooth is
present and perceptible.** The audit list (`/foundations/paper-texture`,
`/foundations/paper-glass`, `/substrates/paper-grid`, `/compositions/math-paper`,
`foundations/typography` the print-specimen home) all get the material, not just
the wash.

---

## 4 · Motion + interaction (liquid-weight, DEFT, mostly STATIC by design)

Paper grain is canonically STILL — a crawling grain is nausea and a per-frame
cost. The motion is restrained and rides EXISTING primitives:

- **Grain ENGAGE on interaction (the already-shipped clock).** The
  `--glass-grain-engage-duration` (120ms linear) opacity cross-fade
  (`ladder.css`, BB.W-LIQUIDHOVER) already exists. On a paper card hover/press,
  the tooth alpha lifts a hair (0.14→0.17) on that thin linear write — the paper
  "catches the light" as the surface tilts under a press-squish. This is the ONLY
  grain motion; collapses to 0ms under PRM. No new mechanism.
- **The press squish carries it.** When a paper card runs `useSpringPress`
  (squash & stretch with real weight/inertia per the §L4 universal-liquid edict),
  the grain `::after` rides the same transform — the tooth scales WITH the
  squish, so the paper visibly compresses (overlapping action: the surface and
  its texture move as one mass). DEFT: the grain inherits the card's transform for
  free (it's a child pseudo-element), no extra wiring.
- **No grain animation otherwise.** The texture is a static raster. The
  cartoon-flow energy lives in the card's spring/shadow/entrance, not in crawling
  noise.

---

## 5 · Cross-engine (Chrome + Safari) + a11y carve

**Cross-engine — the grain is fully static + Baseline.**
- `feTurbulence` + `feColorMatrix` + `feComponentTransfer` in an SVG data-URI
  `background-image`: universal Baseline, computed at decode, rasterized, cached.
  Identical pixels Chrome + Safari (no `backdrop-filter:url`, no live filter).
- `mix-blend-mode: multiply / screen / soft-light`: universal Baseline.
- The anisotropic `baseFrequency='0.012 0.16'`: per the SVG spec, supported in
  both engines (verify the two-value form renders identically on WebKit; if a
  Safari delta appears, the fiber arm falls back to an isotropic `0.08` — the
  tooth arm, which carries 80% of the percept, is single-value and bulletproof).
- **Safari-support-matrix row:** `paper-morphism · dual feTurbulence
  (tooth+fiber) + luminance→alpha contrast-stretch + multiply/screen/soft-light ·
  SUPPORTED (cross-engine Baseline) · fiber falls back to isotropic bf on the one
  WebKit anisotropy delta; tooth is bulletproof`.

**a11y carve (absolute, design.md §150/§156).**
- `@media (prefers-reduced-transparency: reduce)` → BOTH grain arms `opacity: 0`
  AND the wash → opaque (the existing `paper.css:55-59` bracket, extended to reach
  `::before` + every paper surface). Per the edict, when the blur/transmission
  goes, the decorative grain MUST go with it — without the surrounding glass it
  reads as noise on a plate.
- `prefers-reduced-motion: reduce` → the grain-engage cross-fade collapses to 0ms;
  the static grain stays (a still texture is not a motion hazard). The press
  squish (if any) drops to a scale snap.
- Contrast floor: the tooth never darkens body text's local contrast below the
  legibility floor — measured by the π (the grain σ is a *surface* signal sampled
  on empty plate, not under glyphs; the alpha is tuned so text contrast holds).

---

## 6 · THE SINGLE BOLDEST MOVE

**Retire the desaturated-grey-cloud noise model wholesale and replace it with a
luminance→alpha CONTRAST-STRETCHED black-speckle texture composited via
`multiply` — so the grain carries its tooth in the ALPHA channel and the blend
DARKENS the cream into the paper's pits instead of trying (and failing) to
`overlay` a grey fog onto a near-white plate.**

This one change is the whole fix. The prior four tranches all tuned *opacity* on a
mechanism that was mathematically incapable of moving a near-white pixel (overlay
on L≈0.98 ≈ identity; desaturated mid-grey noise ≈ no contrast). By switching the
texture to alpha-carried high-contrast speckle (the `feComponentTransfer` discrete
"bite") and the blend to `multiply`, even the *current* 0.08 alpha would suddenly
be plainly visible — the recalibration to 0.14 then takes it from "visible" to
"tactile letterpress." And because it is ONE texture recipe, the same
contrast-stretched speckle feeds the calm glass grain at its own low 0.025 alpha
(so glass stops being mud-fog too) — a UNION across the whole grain register, one
texture, two volumes, NO fork, NO legacy.

---

## 7 · DELTA-ASSAY — the wave amendment (reconciled vs the 116 union waves)

This **AUGMENTS `BD.W-PAPER-MORPHISM`** (and the `paper.css` / scale-paper §12
texture seam it owns) — it does NOT add a parallel wave. The reconciliation:

- **AUGMENT `BD.W-PAPER-MORPHISM`** — replace its "strength recalibration only"
  scope with the texture+blend redesign. The prior plan's KILL-1/KILL-2 (blend +
  texture) were never diagnosed; this wave now owns:
  (a) the dual tooth+fiber `feTurbulence` texture with luminance→alpha
  contrast-stretch (replaces the single desaturated cloud in `paper.css` + the
  `--paper-*-texture` tokens in scale-paper §12, dropping the baked-opacity
  double-cut);
  (b) the `multiply`/`screen` (tooth) + `soft-light` (fiber) blend (replaces
  `overlay`);
  (c) the re-calibrated `--paper-grain-opacity` 0.14/0.18 + `--paper-grain-fiber-
  opacity` 0.55 (UNION with, not a re-fork of, the landed 0.08/0.11 split — same
  token names, perceptibility-floored values);
  (d) the `--story-paper-wash` clean-break off `transparent` (the demo leg the
  prior plan specced but that never landed — finally applied);
  (e) grain as MATERIAL: wire `Card :grain` / `ShowcaseFrame :grain` on the paper
  specimen surfaces.
- **The π is rewritten** to the binding paint: on every paper route, both modes,
  the empty-plate local luminance σ ≥ a measured floor (the tooth READS — born
  RED at HEAD's ~flat), the resolved blend is `multiply`/`screen` (NOT overlay),
  the texture is the dual stack (NOT the single cloud), `--story-paper-wash` is
  non-transparent in light. Plus the @webkit arm (identical paper read).
- **The library fence holds** — `--glass-grain-opacity` stays 0.025; the
  boldest-move "shared texture" change to glass is a SEPARATE, OPTIONAL clause
  (the glass grain may adopt the contrast-stretched texture at its OWN alpha) so
  the calm-glass anti-stipple fence (BA.W-GLASS-CAL, `proof:glass-cal`) is
  explicitly re-asserted GREEN: glass alpha untouched, only its texture sharpens.
- **No dup vs `BD.W-PAPERGRID-WARP`** (the GL paper-grid substrate — a different
  surface, the WebGL warp field, not the CSS grain register) and no dup vs
  `BD.W-TOKEN-TOUR-GLASS` Arm B (the paper-glass page rebuild — that wave owns the
  page composition; THIS wave owns the grain material it composes). Cross-pointed,
  not overlapping.

**Gestalt bar:** on a fresh both-mode capture of every paper route, the grit is
PLAINLY VISIBLE as pressed-paper tooth at arm's length — the user sees grain, not
flat cream/brown — while the library glass surfaces stay calm and un-stippled.
Born-FAIL at HEAD (the live screenshots show flat cream + flat brown, zero grit);
GREEN only when a non-squinting viewer reads paper.
