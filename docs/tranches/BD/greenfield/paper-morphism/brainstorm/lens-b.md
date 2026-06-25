# Paper Morphism — Greenfield (Lens B · cross-engine / perf-first / KISS)

> Lens: design for FLAWLESS Chrome **and** Safari + zero per-frame cost. The grit is a
> static raster overlay; the whole job is to make it DECISIVELY READ as paper tooth while
> staying a single compositor-cached layer, sRGB-safe, PRM/reduced-transparency carved.
> Survival-of-the-fittest UNION with the landed `--paper-grain-opacity` split — **no re-fork**.

---

## 0. The live diagnosis (chrome-devtools, :5173, both modes, all four routes)

I sampled the live paper surfaces and, decisively, **measured the painted luminance
std-dev** of the production grain stack (the only honest perceptibility metric — std-dev of
luminance over a patch IS "do I see grit"). The verdict is not "raise the number a bit"; it
is **the blend mode is mathematically self-cancelling and nobody wired the demo rung.**

### Hard measurements (luminance std-dev over a 120px patch; JND floor ≈ std 3)

| Stack (mode) | blend | opacity | mean L | **std L** | reads? |
|---|---|---|---|---|---|
| **PROD light** (bf 0.65) | overlay/multiply 0.08 | 0.08 | 247.5 | **0.86** | NO (sub-JND) |
| old 0.025 | multiply | 0.025 | 244 | ~0.3 | NO |
| multiply | multiply | 0.18 | 244.1 | 1.89 | marginal |
| **multiply** | multiply | **0.30** | 240 | **3.14** | **YES** |
| overlay (the SHIPPED light blend) | overlay | 0.18 | 250.1 | **0.02** | **NEVER** |
| soft-light | soft-light | 0.30 | 250.1 | **0.01** | **NEVER** |
| coarse bf 0.25 | multiply | 0.22 | 242.7 | **2.32** | yes (bigger tooth/opacity) |
| **PROD dark** (bf 0.65) | soft-light | 0.11 | 21.3 | **0.46** | NO (sub-JND) |
| **screen** (dark-correct) | screen | **0.18** | 35.7 | **4.08** | **YES** |
| overlay | overlay | 0.25 | 21.3 | **0.49** | NEVER |
| coarse screen | screen 0.30bf | 0.16 | 34 | **3.51** | yes |

### The three root causes (empirical, not opinion)

1. **The blend modes are SELF-CANCELLING at the luminance extremes.** `mix-blend-mode:
   overlay` (the shipped light arm) and `soft-light` (the shipped dark arm) both collapse to
   ~identity against a near-white cream wash and a near-black dark wash respectively —
   measured std **0.02 / 0.01 / 0.49**. Overlay/soft-light only bite mid-grey backdrops; the
   paper register lives on the luminance poles. **`multiply` (light) and `screen` (dark) are
   the only blends that produce tooth on a paper-cream / paper-ink surface** — and they are
   the physically-correct ones (ink sinks INTO light paper = darken; fiber CATCHES light on
   dark paper = lighten). The shipped paper-grain-overlay `::after` got this exactly backwards.

2. **The opacity is ~4× too low** even with the right blend. At the correct `multiply`,
   0.08 → std 0.86; you need **~0.28–0.32** for std ≥ 3 on light. The landed split (0.08/0.11)
   is a real improvement over 0.025 but still **lands below the JND floor**. The split's
   *direction* is right (dark floors lower because... no — see §1; the dark blend is the lever,
   not a lower number).

3. **The demo perceptibility rung `--story-paper-grain` was SPECIFIED but NEVER LANDED.**
   Live, `getComputedStyle(:root)['--story-paper-grain']` is **empty** on every paper route;
   `--story-paper-wash` is still **`transparent`** in light. The BD.W-PAPER-MORPHISM wave's
   actual fix (the demo-local rung + the wash tint + the `typography.vue grain` prop) is
   **unimplemented** — only the token split shipped. So "the split landed but the user can't
   see it" is literally true: the split is on a token that flows to a blend that cancels.

**Conclusion: this is a REFINE, not a re-invent.** The static-SVG-noise-`::after` mechanism is
fit and cross-engine. The defect is (a) wrong blend math, (b) sub-JND opacity, (c) the demo
rung never wired. Fix the blend + opacity at the TOKEN/recipe source and finish wiring the
rung — KISS, one writer, no new layer, no GL.

---

## 1. The greenfield register — "ink-and-tooth", one recipe, two blend arms

Paper morphism is a **single static raster overlay** that reads as fiber tooth. The
greenfield is the *correct cross-engine physics* of that overlay, expressed as ONE
`paper-grain` recipe with a **per-mode blend arm** and a **two-octave tooth**, driven by the
existing `--paper-grain-opacity` token (re-calibrated) — not a new system.

### 1.1 The blend law (THE decisive move)

```css
/* paper.css — the corrected, physically-true paper blend */
.paper-grain-overlay::after,
.paper-underpaint {
    mix-blend-mode: multiply;          /* LIGHT: ink sinks into the tooth → darken */
}
.dark .paper-grain-overlay::after,
.dark .paper-underpaint {
    mix-blend-mode: screen;            /* DARK: fiber catches light → lighten */
}
```

- **NOT overlay, NOT soft-light** — those measured std 0.01–0.49 (invisible) on the poles.
- `multiply`/`screen` are dual and both **sRGB-safe, Baseline, identical Chrome↔Safari** — no
  `color()` , no `color-interpolation`, no `backdrop-filter`. Zero WebKit risk.
- This single swap takes the dark register from std **0.46 → 4.08** at the *same* opacity band.

### 1.2 The two-octave tooth (grain you can FEEL, not just measure)

A single bf=0.65 fractal noise is a fine sandpaper hiss. Real paper has **two scales**: a
fine fiber AND a coarser cockle/tooth. Composite **two `feTurbulence` rects in ONE SVG** (one
data-URI, one raster, one layer — no extra cost):

```
fine   : baseFrequency 0.62, numOctaves 3   (the fiber hiss, ~tiles at 60px)
tooth  : baseFrequency 0.18, numOctaves 2   (the cockle/mottle, the LETTERPRESS read)
```

The coarse octave is what makes grit read as *paper* not *TV static*; the fine octave keeps
it from looking like blobs. Measured: bf 0.25 coarse hits std 2.32 at only 0.22 opacity (vs
1.89 for fine bf 0.65 at 0.18) — **coarse tooth is more perceptible per unit darkening**, so
the composite reads strong at a LOWER total opacity (less plate-greying — protects the
warm-cream no-gray floor). Tile the composite at **120px** (φ-stepped from 60) so the coarse
octave's period is visible within a card.

### 1.3 The opacity re-calibration (the token, re-pointed to the JND floor)

The landed `--paper-grain-opacity` split *direction* is wrong-for-the-blend. With the
corrected blends, the floors invert: light needs MORE (multiply on cream is gentle), dark
needs LESS (screen on near-black bites hard). Re-calibrate the SAME token, no new token:

```css
/* glass-fx.css (light :root) */
--paper-grain-opacity: 0.30;   /* multiply on cream → std ~3.1 (JND-clear) */
/* dark-arm.css */
--paper-grain-opacity: 0.16;   /* screen on ink → std ~3.5 (JND-clear, no blow-out) */
```

These are the **measured** JND-clearing values for the corrected blends (light std 3.14 @
0.30 multiply; dark std 3.5–4.0 @ 0.16–0.18 screen). The library `--glass-grain-opacity`
(0.025) stays **byte-untouched** — the calm-glass tier grain is a DIFFERENT token on a
DIFFERENT selector (`.glass-material::after`, `ladder.css:450`) and must NOT gain stipple.
Paper is its own register. (No backwards-compat alias — clean break per the no-legacy law.)

### 1.4 Finish wiring the demo rung (the unimplemented BD.W-PAPER-MORPHISM legs)

The wave's actual fix never landed. Land it, simplified onto the corrected token:
- **`--story-paper-wash`**: light `transparent` → `color-mix(in srgb, var(--foreground) 4%,
  transparent)` (a faint warm-cream tint so the grain reads on a substrate, not a flat page);
  keep the dark 7% lift. This is the "field behind the grain" — without it multiply has almost
  nothing to bite.
- **`typography.vue` + the token-tour specimen frames**: set the already-shipped
  `ShowcaseFrame grain` prop (the print-specimen pages are the paper HOME and wear ZERO grain
  today). One prop per page; no new mechanism.
- **DROP** the wave's separate `--story-paper-grain` demo-rung indirection. With the corrected
  blend + recalibrated `--paper-grain-opacity`, the paper surfaces read perceptibly off the
  ONE token — the extra demo-local rung was a workaround for the buried 0.025 that no longer
  exists. KISS: one token, one writer. (The library fence is held by the token being
  paper-specific and the glass tier reading `--glass-grain-opacity`, unchanged.)

---

## 2. Where the grit lives (the "everywhere paper is claimed" surface map)

The user wants it **visible everywhere paper morphism is claimed**. Three carriers, all
already shipping the `paper-grain-overlay` / `paper-underpaint` utility — they just paint
nothing today:

1. **The full-bleed page substrate** (`paper-underpaint` / `.story-bg-paper`) — every
   paper-default page (`/foundations/paper-texture`, `paper-glass`, `typography`, the token
   tours, `/compositions/math-paper`). Fixed, z-index −1, ONE raster behind everything.
2. **The glass paper-tiles** (`paper-glass` route: wash/quiet/resting/floating/overlay tiles
   all carry `paper-grain-overlay` — confirmed live, 11 elements, all invisible at overlay
   0.08). The corrected multiply/screen makes the grain read THROUGH the translucent glass —
   the "paper felt through glass" composite the route demonstrates.
3. **The `<PaperBackdrop>` component + `.paper-grid` card interiors** — `math-paper` and the
   document-register cards. `.paper-grid` is a separate geometric (line) register on its own
   `--paper-grid-opacity` (0.08) — KEEP it (it's a grid, not grain), but it composes WITH the
   corrected grain `::after` on the same card for the full letterpress feel.

No new surfaces; the utility is already applied at all three. The fix is the blend+opacity at
the token/recipe, so **every existing application lights up at once** — that is the DRY win.

---

## 3. Cross-engine (Chrome + Safari) — the perf-first contract

| Concern | Decision |
|---|---|
| Texture source | static `data:image/svg+xml` `feTurbulence` (×2 octave rects, one URI). Rasterized once, compositor-cached. |
| Blend | `mix-blend-mode: multiply` (light) / `screen` (dark) — Baseline, sRGB, **identical WebKit↔Chromium** (verified math; no `color-mix` inside the blend, no wide-gamut). |
| NO `backdrop-filter: url()` | the grain is a normal `::after` background, never a backdrop filter — the WebKit-fragile path is untouched. |
| Per-frame cost | **ZERO** — static raster, no animation, no rAF, no GL. The grain never repaints after first composite. |
| `feTurbulence` cost | one-time filter raster at decode; tiled via `background-repeat`. Both engines cache it. (Coarse octave adds ~0 — same single raster.) |
| Color-interp | `feColorMatrix saturate 0` → pure grey noise; multiply/screen in sRGB. No oklab, no `color-interpolation-filters` surprise (default sRGB on both). |
| DPR | 120px tile divides cleanly at DPR 1/2/3; the SVG re-rasters crisp per-DPR (vector source). |

**Safari support-matrix row:** `paper-grain · SVG fractalNoise ::after + mix-blend-mode
multiply/screen · SUPPORTED (Baseline) · none — reads identically WebKit/Chromium`.

---

## 4. a11y / PRM carve (absolute, inherited)

- **`prefers-reduced-transparency: reduce`** → grain `::after` opacity `0` AND
  `--paper-grain-opacity: 0` (the existing `paper.css:55-59` bracket extended to the recipe).
  A flat warm-cream plate is the reduced-transparency endpoint — no tooth, full legibility.
- **`prefers-reduced-motion`** → no-op for grain (it is static); the bracket stays as a
  future-motion guard only. **The paper register adds ZERO motion** — it is the calm static
  counterpart to the GL vizzes (the free-static-wash budget). No grain crawl, ever.
- **`a11y-fallback.css`** already zeroes `--glass-grain-opacity` under fallback; add the
  paper token to the same zero so the high-contrast/reduced path drops paper grit too.

---

## 5. The DELTA-ASSAY → wave amendment (UNION, no dup vs the 116 waves)

**AUGMENT `BD.W-PAPER-MORPHISM`** (do NOT add a new wave — this IS the paper wave):

1. **Re-point the blend** in `paper.css`: `paper-grain-overlay::after` + `paper-underpaint`
   → `multiply` (light) / `screen` (dark). [THE headline fix — the shipped overlay/soft-light
   measured std 0.01–0.49 = invisible.]
2. **Re-calibrate `--paper-grain-opacity`** to the measured JND floors: light **0.30**
   (`glass-fx.css`), dark **0.16** (`dark-arm.css`). Replaces the sub-JND 0.08/0.11.
3. **Two-octave tooth** in the SVG data-URI (fine bf 0.62 + coarse bf 0.18), tile 120px.
4. **Land the un-implemented legs**: `--story-paper-wash` light tint (4% foreground), the
   `ShowcaseFrame grain` prop on `typography.vue` + token-tour specimens.
5. **DROP the `--story-paper-grain` demo-rung** from the wave spec (superseded — the corrected
   single token reads; KISS, one writer). The library fence is now the token-identity
   (`--paper-grain-opacity` is paper-only; `.glass-material::after` keeps `--glass-grain-opacity`).
6. **Gate `proof:paper-morphism`**: re-base the perceptibility π onto the corrected stack —
   the binding assertion is **painted luminance std-dev ≥ 3.0** on a sampled patch over the
   paper substrate AND over a paper-glass tile, **BOTH modes** (born-RED on the shipped
   overlay/soft-light std 0.86/0.46), plus the `@webkit` paired arm proving identical std on
   WebKit. Self-test bites: overlay/soft-light blend → RED; opacity < the JND value → RED;
   `--glass-grain-opacity` lifted off 0.025 → RED (library fence).

No new wave; no overlap with `BD.W-PAPERGRID-WARP` (that is the liquid `<PaperGrid>` viz, a
distinct line/cell-warp register) or `BC.W-VIZ-PAPERGRID`. `.paper-grid` (geometric line
register, `--paper-grid-opacity`) is orthogonal and untouched — it composes WITH the corrected
grain on the document-register cards.

---

## 6. Convergence (this lens)

~**90%**. The mechanism is fit and cross-engine; the defect is fully diagnosed with hard
numbers (blend self-cancels at the luminance poles; opacity 4× below JND; demo legs never
landed). The fix is a token/recipe recalibration + finishing the wired legs — KISS, DRY,
no new layer, no GL, no WebKit risk. Remaining 10% = build-time real-paint π (the std-dev
gate on actual rendered pixels, both engines) + a designer eye-check that 0.30 multiply on
cream doesn't tip the warm-cream plate toward gray (the no-gray cross-check — multiply at 0.30
drops mean L 247→240, a 3% darken, well inside the warm floor; verify the hue holds).
