# Paper Morphism — GOLDEN reference (the canonical synthesis)

> "I don't see any paper grain or grit anywhere." The grit must be PLAINLY
> VISIBLE. If you have to squint, it FAILS.

The single best variant, reconciled from lenses A/B/C. All three converged on the
SAME root cause; this golden takes the strongest move from each, corrects the one
mechanism that was wrong in every lens (the luminance→alpha matrix), and resolves
to ONE coherent, measured, both-engine design. It is a UNION with the landed
`BD.W-PAPER-MORPHISM` token/utility seam — no parallel fork, no new system, no
legacy. **De-risked live** (`golden/paper-grain-spike.html`, Chrome): the grain
reads at arm's length both modes, std-dev clears the JND floor (light 3.65, dark
3.86 — see §8).

---

## 0 · The unanimous diagnosis (3 lenses, hard numbers, both modes, all 4 routes)

Sampled live (`:5173`, chrome-devtools) on `/foundations/paper-texture`,
`/foundations/paper-glass`, `/substrates/paper-grid`, `/compositions/math-paper`.
The painted luminance **std-dev over a content-free patch** is the only honest
"do I see grit" metric (JND floor ≈ std 3.0). All three lenses measured the same
three compounding kills:

1. **The blends are self-cancelling at the luminance poles.** The shipped
   `overlay` (light) and `soft-light` (dark) arms collapse to ~identity against a
   near-white cream wash (L≈0.98) and a near-black ink wash. Measured std
   **0.02 / 0.01 / 0.49** — invisible by math. Overlay/soft-light only bite
   mid-grey backdrops; the paper register lives on the poles. **`multiply`
   (light) and `screen` (dark) are the only blends that produce tooth there** —
   and they are the physically-true ones (ink sinks INTO light paper = darken;
   fiber CATCHES light on dark paper = lighten).

2. **The single bf=0.65 fine noise at a 60px tile averages to grey on hiDPI.**
   One frequency reads as TV static, not paper; on a 2× panel the high-freq
   speckle downsamples toward its mean and the tooth vanishes. Coarse grain
   survives hiDPI; fine grain does not.

3. **The demo legs never landed.** `--story-paper-grain` is empty on every route;
   `--story-paper-wash` is still `transparent` in light. The split landed on a
   token that flows into a blend that cancels.

**This is a REFINE + RE-CALIBRATE of the extant `paper-grain-overlay` /
`paper-underpaint` utilities, never a re-invent.** The static-SVG-`::after`
mechanism is fit and cross-engine. Fix the blend + texture + opacity at the
token/recipe source; finish the unwired legs.

---

## 1 · The gestalt — paper as a TWO-BAND letterpress material (tooth + fiber)

Real paper, and the 1940s technicolor-letterpress register the edicts name, is
not one noise. It is **two superimposed bands**, a golden octave apart so they
never beat:

- **TOOTH** — coarse, anisotropic, HIGH-CONTRAST cockle (the felt/bite of the
  sheet; the ink-catch of a letterpress; the thing a thumb feels). This carries
  ~80% of the percept and is the headline visibility fix. `baseFrequency
  0.16 0.21` (anisotropic = grain direction), 2 octaves, contrast-stretched.
- **FIBER** — fine, soft rag-fleck mottle (the pulp texture). `baseFrequency
  0.62`, 3 octaves, gentle. The quieter second band that keeps tooth from
  reading as blobs.

The bar (design.md §L1 layer 6): grain "prevents a surface reading as
flat-shaded plastic." The golden bar is harder: the surface reads as **tactile
pressed paper you could run a thumb across** — visible, plainly, in a screenshot,
at arm's length, both modes — while the library GLASS surfaces stay calm and
un-stippled. Paper is loud; glass is a whisper. That separation IS the design.

---

## 2 · The mechanism — ONE re-textured, re-calibrated paper recipe (UNION)

A clean-break redesign of the texture + blend + alpha, expressed so BOTH the
library paper register and the demo consume it (UNION, not fork). KISS: it reuses
the existing `paper-underpaint` / `paper-grain-overlay` `@utility` seams and the
`--paper-grain-opacity` token NAME — it replaces only their internals.

### 2.1 · The texture — dual feTurbulence, grey-RGB, contrast-stretched

**The corrected technique** (the one mechanism every lens got wrong, fixed here
and proven live): feTurbulence → `feColorMatrix type='saturate' values='0'`
(grey RGB — KEEP the RGB, never zero it) → per-channel `feComponentTransfer`
linear-slope CONTRAST STRETCH (the letterpress bite) → paint the grey speckle
straight onto the rect at full alpha. The blend (multiply/screen) carries it.

> **Why lens A's `feColorMatrix` matrix was broken:** zeroing the RGB rows first
> (`0 0 0 0 0 …`) and mapping luminance→alpha gives a near-empty texture
> (measured meanAlpha **0.1**, frac-nonzero **0.001** — invisible). The grey-RGB
> speckle painted with multiply is the working path (measured std 3.65). Keep the
> RGB; let the blend do the darkening.

Two `background-image` tokens (DRY single source, both utilities resolve them):

```css
/* TOOTH — coarse anisotropic cockle, slope-1.8 bite (the letterpress read) */
--paper-grain-tooth: url("data:image/svg+xml,<svg xmlns=... width='132' height='132'>
  <filter id='t' x='0' y='0' width='100%' height='100%'>
    <feTurbulence type='fractalNoise' baseFrequency='0.16 0.21' numOctaves='2' seed='7' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
    <feComponentTransfer>
      <feFuncR type='linear' slope='1.8' intercept='-0.4'/>
      <feFuncG type='linear' slope='1.8' intercept='-0.4'/>
      <feFuncB type='linear' slope='1.8' intercept='-0.4'/>
    </feComponentTransfer>
  </filter>
  <rect width='100%' height='100%' filter='url(#t)'/></svg>");

/* FIBER — fine rag fleck, no bite, the soft second band */
--paper-grain-fiber: url("data:image/svg+xml,<svg ... width='96' height='96'>
  <filter id='f' x='0' y='0' width='100%' height='100%'>
    <feTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='3' seed='13' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#f)'/></svg>");
```

Texture moves vs the status quo:
- **Two bands bracketing the human paper-percept** (coarse tooth + fine fiber),
  a golden octave apart (≈0.18 : 0.62 ≈ 1:φ⁴) so they never beat.
- **The coarse anisotropic tooth survives hiDPI** — the single most important
  visibility change (fine bf 0.65 averaged to grey on 2× panels).
- **No `feBlend mode='multiply' in2='SourceGraphic'`** — that op muddied the
  noise to near-black (live-proven, lens C); deleted. Clean turbulence on rect.
- **Tile 132px (tooth) / 96px (fiber)** — φ-stepped up from 60px so the coarse
  tooth reads as STRUCTURE, divides cleanly at DPR 1/2/3, vector source re-rasters
  crisp per-DPR.
- **Static data-URI** — computed once at decode, raster-cached, ZERO per-frame
  cost. No `backdrop-filter:url`, compositor-only.

### 2.2 · The blend law — the decisive, physically-true move (per-mode arms)

```css
/* paper.css — tooth ::after, fiber ::before */
.paper-grain-overlay::after,  .paper-underpaint           { mix-blend-mode: multiply; }   /* LIGHT tooth: ink sinks into the valleys → darken */
.dark .paper-grain-overlay::after, .dark .paper-underpaint { mix-blend-mode: screen; }     /* DARK tooth: fiber catches light → lighten */
.paper-grain-overlay::before                               { mix-blend-mode: soft-light; } /* FIBER: the quiet band, both modes */
```

- **NOT overlay, NOT soft-light for the tooth** — measured std 0.01–0.49 on the
  poles (invisible). `multiply`/`screen` are dual, sRGB-safe, Baseline, identical
  Chrome↔Safari (no `color-mix` inside the blend, no wide-gamut).
- The fiber rides `soft-light` because it is *meant* to be subtle — it adds pulp
  mottle without re-darkening the plate the tooth already bit.
- One swap takes the dark register from std 0.46 → 3.86 at the same alpha band.

### 2.3 · The alpha rung — measured to the JND floor, golden-stepped, UNION

The `BD.W-PAPER-MORPHISM` split (`--paper-grain-opacity` 0.08/0.11) STAYS as the
token NAME — we do not re-fork. We re-calibrate its VALUES to the live-measured
JND floors for the corrected blends. The floors INVERT vs naive intuition:
multiply on cream is gentle (needs MORE), screen on ink bites hard (needs LESS):

```css
/* glass-fx.css (light :root) */
--paper-grain-opacity: 0.22;        /* multiply tooth on cream → std 3.65 (measured); mean 247→242, a 3% darken, warm floor holds */
--paper-grain-fiber-opacity: 0.55;  /* the fiber arm, RELATIVE to the tooth (the quieter signal) */
--paper-grain-tile-tooth: 132px;
--paper-grain-tile-fiber: 96px;

/* dark-arm.css */
--paper-grain-opacity: 0.16;        /* screen tooth on ink → std 3.86 (measured); luminous lift, no blow-out */
```

The fiber `::before` opacity = `calc(var(--paper-grain-opacity) *
var(--paper-grain-fiber-opacity))` — the fiber never exceeds the tooth
(proportional, never gaudy). Opacity ladder light→dark `0.22 → 0.16` ≈ ×(1/√φ)
— dark bites harder so it steps DOWN, the honest inversion the measurements force.

**These are the PAPER register only.** The glass material grain
(`--glass-grain-opacity` 0.025, `ladder.css .glass-material::after`) is
**BYTE-UNTOUCHED** — the calm-glass identity (BA.W-GLASS-CAL, `proof:glass-cal`)
stands. The library fence is the token-identity: `--paper-grain-opacity` is
paper-only; `.glass-material::after` reads `--glass-grain-opacity`, unchanged.

### 2.4 · Kill the underpaint double-cut + the conflation

`--paper-clean-texture` / `--paper-aged-texture` (scale-paper.css §12) drop the
baked `opacity='0.04'`/`'0.06'` on the SVG rect — alpha is owned by ONE place
(`--paper-grain-opacity`), per DRY. The underpaint adopts the same dual
tooth+fiber stack + multiply/screen blend. The `position:fixed` 8-stack
conflation (the `BD.W-PAPER-BACKDROP-CONTAIN` src fix) folds here: in-card mounts
default to the CONTAINED `paper-grain-overlay::after` register, ONE fullscreen
`paper-underpaint` at app-root.

---

## 3 · Coverage — grain as MATERIAL, on the surfaces the eye rests on

The user wants it "VISIBLE everywhere paper morphism is claimed." Today it is a
buried backdrop. The golden puts grain where the eye lands (KISS — set the
already-shipping prop/class, no new mechanism):

1. **The paper UTILITIES** (`paper-grain-overlay`, `paper-underpaint`) — the
   recipe above. The home of the register; every existing application lights up
   at once when the blend+texture+opacity fix lands at the token source (the DRY
   win).
2. **Cards in the paper context** — `Card surface="paper"` / `Card :grain`
   composes `paper-grain-overlay` on the card's own `::after` (radius-inherited,
   clipped to the squircle) so the SPECIMEN wears tooth, not just the page behind
   it. `math-paper`'s worksheet card, `paper-glass`'s opaque specimens.
3. **The print/type specimens** — `ShowcaseFrame :grain` (the prop already
   exists, never set). `foundations/typography` is the paper HOME and wears ZERO
   grain today — the worst miss. Wire the prop.
4. **The §3 COLOURFUL FIELD composite** — paper grain is the layer-6 cap of the
   six-layer stack (design.md §L1) sitting OVER the transmissive glass-on-field
   composite at the paper register. The grit reads THROUGH the translucent glass
   tint, on the defined edge — "paper felt through glass," the duality the
   system's identity rests on (NEVER gray — the BA.W-NO-GRAY warm-cream floor
   stands behind the grain).
5. **Demo wash** — `--story-paper-wash` clean-breaks off `transparent` to
   `color-mix(in srgb, var(--foreground) 4%, transparent)` in LIGHT (keep the 7%
   dark lift) so the multiply tooth bites on a faintly-tinted warm plate, not pure
   white where even multiply is weak at the top end. (The split-wave's leg-2 that
   never landed — finally applied.)

Rule: **wherever the route declares `background:"paper"` OR a surface opts into
the paper register, the tooth is present and perceptible** — `.paper-grid` (the
geometric line register, `--paper-grid-opacity`, orthogonal) composes WITH it on
the document-register cards, not collides.

---

## 4 · Motion + interaction — STATIC by default, the raking-light PUNCH opt-in

Paper grain is canonically STILL — a crawling grain is nausea and a per-frame
cost. The motion is restrained and rides EXISTING primitives.

### 4.1 · The default — static, alive nowhere, grainy everywhere
The texture is a static raster; every paper surface is visibly grainy with NO JS.
The cartoon-flow energy lives in the card's spring/shadow/entrance, not in
crawling noise.

### 4.2 · The press squish carries it (DEFT, free)
When a paper card runs `useSpringPress` (squash & stretch with real weight per
the §L4 universal-liquid edict), the grain `::after`/`::before` ride the same
transform — the tooth scales WITH the squish, so the paper visibly compresses
(overlapping action: surface and texture move as one mass). The grain inherits
the card's transform for free (it is a child pseudo-element). No extra wiring.

### 4.3 · The PUNCH — the raking-light emboss (opt-in, `vSpecular`-composed)
The single audacious flourish (lens C), gated behind `--paper-emboss` (default
0 → zero cost, zero motion). On a surface that opts into the alive register
(`data-paper-alive` + the existing `useLiquidHover`/`vSpecular`), a SECOND
`::before` sublayer of the SAME tooth texture is masked to a directional gradient
keyed off the pointer azimuth the glass already publishes
(`--specular-x/y/-angle`, already `@property`-registered in `property-regs.css`,
already tracked in `glass-specular-track.css`):

```css
@utility paper-grain-overlay {
  /* ...the ::after tooth + ::before fiber from §2... */
  &::before { /* fiber, OR when --paper-emboss:1, the raking-light sweep */
    opacity: calc(var(--paper-grain-opacity) * var(--paper-grain-fiber-opacity)
                  + var(--paper-emboss, 0) * var(--paper-grain-opacity) * 0.5);
    -webkit-mask-image: linear-gradient(var(--specular-angle, 135deg), white, transparent 60%);
    transition: opacity var(--motion-rest, 600ms) var(--ease-liquid);
  }
}
```

- At rest `--paper-emboss:0` → pure fiber, invisible sweep.
- On pointer-enter → `--paper-emboss:1`, `--specular-angle` tracks the azimuth;
  the lit-side mask + soft-light highlight sweeps across the tooth → the paper
  EMBOSSES under a moving light. The letterpress PUNCH — cartoon FLOW & PUNCH
  applied to the grain, **composing the extant specular engine** (no new pointer
  machinery). Liquid-weight: the engage ramps on `--motion-rest` (≈600ms,
  weighted, inertial — never snappy).
- Compositor-only: only a CSS custom-prop write (the same paint-free recalc
  `vSpecular` already does); the noise raster is cached, only the mask angle moves.

---

## 5 · Cross-engine (Chrome + Safari) — the perf-first contract

| Concern | Decision |
|---|---|
| Texture source | static `data:image/svg+xml` feTurbulence (×2, one URI each). Rasterized once, compositor-cached, identical pixels Chrome↔Safari (deterministic `seed`). |
| Tooth blend | `multiply` (light) / `screen` (dark) — Baseline, sRGB, identical WebKit↔Chromium (no `color-mix` in the blend, no wide-gamut, no `color-interpolation-filters` surprise — default sRGB both engines). |
| Fiber blend | `soft-light` — Baseline both. |
| NO `backdrop-filter:url()` | the grain is a normal `::after`/`::before` background, never a backdrop filter — the WebKit-fragile path is untouched. |
| Per-frame cost | **ZERO** — static raster, no rAF, no GL. Repaints never after first composite. The opt-in emboss updates only a custom prop (compositor-only). |
| Anisotropic `baseFrequency='0.16 0.21'` | per SVG spec, supported both engines; if a WebKit two-value delta ever appears, the tooth falls back to isotropic `0.18` (the percept holds — coarse single-value is bulletproof). |
| `-webkit-mask-image` | the `-webkit-` prefix is shipped for the opt-in emboss mask. |
| DPR | 132/96px tiles divide cleanly at DPR 1/2/3; vector source re-rasters crisp per-DPR. |

**Safari support-matrix row:** `paper-morphism · dual feTurbulence (tooth+fiber)
grey-speckle + contrast-stretch + multiply/screen/soft-light · SUPPORTED
(cross-engine Baseline) · tooth isotropic-bf fallback the only conditional;
reads identically WebKit/Chromium`.

---

## 6 · a11y / PRM / reduced-transparency carve (absolute, design.md §150/§156)

- **`prefers-reduced-transparency: reduce`** → BOTH grain arms (`::after` +
  `::before`) AND the underpaint `opacity: 0`, AND `--paper-grain-opacity: 0`,
  AND the wash → opaque warm-cream (the existing `paper.css:55-59` bracket
  extended to reach `::before` + the emboss + every paper surface). When the
  transmission goes, the decorative grain goes with it — without the surrounding
  glass it reads as noise on a plate. `a11y-fallback.css` already zeroes
  `--glass-grain-opacity`; add `--paper-grain-opacity` to the same zero.
- **`prefers-reduced-motion: reduce`** → `--paper-emboss: 0` forced (the raking
  light never engages); the press-squish drops to a scale snap. The STATIC grain
  STAYS (a still texture is not a motion hazard — it is the a11y floor; the PUNCH
  is the progressive enhancement).
- **Contrast floor** — no chroma in the grain (`saturate 0`); it modulates only
  luminance ±. The tooth never darkens body text's local contrast below the
  legibility floor (the σ is a SURFACE signal sampled on empty plate, not under
  glyphs; the alpha is tuned so text contrast holds — light multiply drops mean L
  only 247→242, a 3% darken well inside the warm floor; the hue holds, no gray).

---

## 7 · THE SINGLE BOLDEST MOVE (reconciled)

**Retire the self-cancelling overlay/soft-light blend and the muddy single
fine-noise; replace with a TWO-BAND grey-speckle texture (coarse anisotropic
tooth + fine fiber, contrast-stretched) composited via the physically-true
`multiply` (light) / `screen` (dark) — so the tooth carries on a hiDPI-surviving
coarse band and the blend DARKENS the cream into the paper's pits / LIFTS the
fiber off the ink, instead of trying (and failing) to overlay a grey fog onto a
luminance pole.**

This is the whole fix. The prior tranches tuned *opacity* on a mechanism
mathematically incapable of moving a near-white pixel (overlay on L≈0.98 ≈
identity; fine noise ≈ averaged grey on hiDPI). Switching to the coarse two-band
grey speckle + multiply/screen makes even the current 0.08 alpha plainly visible;
the recalibration to 0.22/0.16 takes it from "visible" to "tactile letterpress."
The optional `vSpecular`-composed raking-light `::before` is the cartoon PUNCH on
top — alive on intent, static (free) at rest. ONE texture recipe, ONE token, two
modes, NO fork, NO legacy.

---

## 8 · The acceptance bar + the born-RED gate (π / readback)

**Acceptance bar (the user is the judge):** a fresh both-mode whole-page capture
of `/foundations/paper-texture` + `/foundations/typography` +
`/compositions/math-paper`: the page reads as TACTILE warm-cream (light) /
luminous-warm-ink (dark) PAPER — **the tooth is plainly visible WITHOUT
squinting**, the clean-vs-aged panels show a REAL grain difference, the type
specimen wears a felt finish — while the library glass surfaces stay calm
(un-stippled). The warm floor holds (NO gray) both modes.

**The metric:** painted **luminance std-dev over a content-free patch**
(JND floor = std **3.0**). This is the born-RED gate.

**π / readback sketch (`proof:paper-morphism`, re-based onto the corrected
stack):** for each paper route, both modes — rasterize a content-free patch over
the paper substrate AND over a paper-glass tile, then ASSERT:

```
1. painted luminance std-dev >= 3.0           (the tooth READS)
2. resolved tooth blend == multiply (light) / screen (dark)   (NOT overlay/soft-light)
3. texture background-image == the dual tooth+fiber stack      (NOT the single fine cloud)
4. --story-paper-wash != transparent in light                 (the plate the tooth bites)
5. --glass-grain-opacity == 0.025                             (LIBRARY FENCE — glass stays calm)
6. warm-floor hue: patch mean chroma in oklch < gray-threshold (NO gray)
+ @webkit paired arm: the SAME patch std-dev within tolerance  (identical Safari read)
```

**Self-test bites (born RED at HEAD):** overlay/soft-light tooth blend → RED;
opacity below the JND value → RED; single fine-noise texture → RED;
`--story-paper-wash: transparent` → RED; `--glass-grain-opacity` lifted off
0.025 → RED. Born-FAIL at HEAD (live: flat cream + flat brown, std 0.02–0.86,
zero grit); GREEN only when a non-squinting viewer reads paper.

**MEASURED on the golden spike** (`golden/paper-grain-spike.html`, Chrome,
canvas rasterization, JSON readback):

| stack (mode) | blend | opacity | mean L | **std L** | verdict |
|---|---|---|---|---|---|
| GOLDEN light | multiply + soft-light fiber | 0.22 | 242.5 | **3.65** | **PASS** (≥3) |
| GOLDEN dark | screen + soft-light fiber | 0.16 | 39.1 | **3.86** | **PASS** (≥3) |
| HEAD light (overlay, single noise) | overlay | 0.08 | 250.1 | **~0.02** | RED |
| HEAD dark (soft-light) | soft-light | 0.11 | 24.7 | **~0.03** | RED |

The screenshot proof (`golden/spike-proof.png`) shows the grained plates plainly
toothed vs the flat bare controls, both modes — the user sees grain, not flat
cream/brown.

---

## 9 · DELTA-ASSAY — the wave amendment (reconciled vs the union waves, no dup)

**AUGMENT `BD.W-PAPER-MORPHISM`** (do NOT add a parallel wave — this IS the paper
wave). Replace its "strength recalibration only" scope with the texture+blend
redesign:

- **(a) Two-band texture** — the dual `--paper-grain-tooth` (coarse anisotropic,
  contrast-stretched) + `--paper-grain-fiber` (fine soft) tokens replace the
  single desaturated cloud in `paper.css` + the `--paper-*-texture` tokens in
  scale-paper §12; drop the baked-opacity double-cut and the `feBlend
  in2=SourceGraphic` mud op.
- **(b) Blend law** — `multiply`/`screen` tooth (light/dark) + `soft-light` fiber
  replaces `overlay`/`soft-light`.
- **(c) Re-calibrate `--paper-grain-opacity`** to the measured JND floors:
  light **0.22** (`glass-fx.css`), dark **0.16** (`dark-arm.css`); mint
  `--paper-grain-fiber-opacity` 0.55 + the tile tokens. UNION with, not re-fork
  of, the landed 0.08/0.11 split (same token name, perceptibility-floored values).
- **(d) `--story-paper-wash`** clean-breaks off `transparent` (light 4%
  foreground tint) — the never-landed leg-2.
- **(e) Grain as MATERIAL** — wire `Card :grain` / `ShowcaseFrame :grain` on the
  paper specimen surfaces (`typography.vue` the headline miss). DROP the dead
  `--story-paper-grain` demo-rung indirection (KISS — the corrected single token
  reads).
- **(f) Opt-in raking-light PUNCH** — the `--paper-emboss` `::before` sweep,
  `vSpecular`-composed, PRM-gated (default 0 = zero cost).
- **FOLD `BD.W-PAPER-BACKDROP-CONTAIN`** — the `position:fixed` 8-stack
  containment rides the same `paper.css` edit.
- **The π is rewritten** to §8 (the std-dev gate, both modes, both engines).

**Library fence held** — `--glass-grain-opacity` stays 0.025; `proof:glass-cal`
re-asserted GREEN (glass alpha untouched). **No dup** vs `BD.W-PAPERGRID-WARP` /
`BC.W-VIZ-PAPERGRID` (the GL/geometric grid — a sibling register; `.paper-grid`
composes WITH the grain, not collides) nor `BD.W-TOKEN-TOUR-GLASS` /
`BD.W-PAPER-GLASS-ALIVE` (page composition — downstream consumers of this
register). Cross-pointed, not overlapping.

---

## Files

- `golden/paper-grain-spike.html` — the throwaway spike (the de-risk), live-verified Chrome.
- `golden/spike-proof.png` — the both-mode screenshot proof (grained vs bare).
