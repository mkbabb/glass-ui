# Paper morphism — greenfield brainstorm · LENS C (audacious cartoon-technicolor PUNCH)

> The grit must be PLAINLY VISIBLE. If you have to squint, it FAILS. This lens designs the
> paper register for maximum 1940s-Technicolor FLOW & PUNCH — letterpress tooth you can FEEL,
> fiber you can SEE, a deboss/emboss bite under a moving light — while staying a static,
> compositor-cheap, Chrome+Safari-identical, PRM-carved overlay. DEFT UNION with the landed
> `BD.W-PAPER-MORPHISM` split — extend the token + texture, never re-fork.

---

## 0 · The LIVE assay (what I actually measured — both modes, all four routes)

Dev server `:5173`, chrome-devtools-mcp, `getComputedStyle` + canvas rasterization of the grain SVG.

**Routes inspected:** `/foundations/paper-texture`, `/compositions/math-paper`, `/substrates/paper-grid` (host-bg grain), `/foundations/paper-glass` (sibling).

**The grain IS painting** — it is NOT clipped, NOT occluded, NOT overridden:
- `.paper-grain-overlay::after` resolves `opacity: 0.08` (light) / `0.11` (dark) — the `BD.W-PAPER-MORPHISM`
  split **DID land** in `glass-fx.css`/`dark-arm.css`. `mix-blend-mode: overlay` (light) / `soft-light` (dark).
- `--story-paper-grain` is **EMPTY** (the proposed demo rung in the wave was authored but **never wired** —
  `story-hero.css` does not declare it). `--story-paper-wash: transparent` in light (a FLAT cream base under
  the ~invisible grain — the wave's leg 2 also never landed).
- `paper-texture` route mounts **8 stacked `paper-underpaint`** `position:fixed` elements at 0.08 each (the
  register-conflation `paper-glass`/`paper-texture` SYNTHESIS already flagged — they escape to viewport).

**Why it reads FLAT (the quantified root cause — three compounding misses):**
1. **Effective ΔL is at the JND floor.** Rasterized pure 4-octave turbulence (no blend) carries
   `lumStdDev ≈ 15` over `mean ≈ 187`, `meanAlpha ≈ 0.50`. Through `overlay` at `opacity 0.08` over the
   `rgb(251,250,248)` cream page the effective luminance delta is **≈ 15 × 0.08 ≈ 1.2 L units** — right at
   the ~1–2 L human just-noticeable-difference floor. It is **mathematically a squint**. The user is correct.
2. **The tile is too FINE + anti-aliases flat.** `baseFrequency 0.65` at a **60px** tile is a very-high-freq
   stipple; on a 2× hiDPI panel the browser downsamples it toward its mean — the high-freq noise **averages
   out to grey**, losing the very tooth that should read. Fine noise is the WORST choice for hiDPI visibility.
3. **Dark is WORSE than light.** At `0.11` `soft-light` over the near-black `--card`, soft-light **compresses
   toward the midpoint** — over a dark base soft-light barely lifts. Live: the dark `paper-texture` page is a
   DEAD brown-black with zero grit (screenshot-confirmed). The 3.2× token bump bought nothing perceptible.
4. **The SVG's own `feBlend mode='multiply' in2='SourceGraphic'`** muddies the noise (rasterizes near-black
   because SourceGraphic is empty on a filter-on-rect) — the texture is dirtier + lower-contrast than a clean
   turbulence-on-rect would be. It is a noisy no-op that only darkens.

**User-judged screenshots (both modes):** `paper-texture` light = flat warm-cream, the "clean vs aged"
panels **IDENTICAL** (a demo of a difference that shows no difference); dark = dead brown-black. **FAILS the
squint test outright in both modes.** This is the verbatim "I don't see any paper grain or grit anywhere."

**Conclusion:** the mechanism is sound and ALREADY ON the right plumbing; the **calibration is broken** —
wrong amplitude, wrong scale, wrong blend math for dark, and a fine-noise choice that hiDPI eats. This is a
RE-CALIBRATE + RE-TEXTURE of the extant `paper-grain-overlay`/`paper-underpaint` utilities, NOT a new system.

---

## 1 · The LENS-C gestalt — LETTERPRESS, not stipple. PUNCH the tooth with LIGHT.

A 1940s Technicolor print is not flat ink on flat stock — it is **ink pressed INTO tooth**, lit by a raking
light that catches the high points and shadows the valleys. Real paper reads because of **two things a single
flat-grey noise overlay can never give:**

1. **A real two-band fiber structure** — a COARSE "tooth" band (the felt/cockle of the sheet, the thing your
   thumb feels) PLUS a fine "fiber" band (the rag flecks). One frequency reads as TV static; two stacked
   frequencies read as PAPER.
2. **A directional emboss/deboss** — a faint dual-offset highlight/shadow so the grain has a LIT side and a
   shadowed side (the letterpress bite). This is the SAME 1940s-cartoon "layered-offset shadow" instinct the
   BD law elevates to a register — applied at micro-scale to the grain itself.

The PUNCH move: make the paper tooth **respond to the same moving catch-light the glass already tracks**
(`vSpecular`). On hover/pointer-move, the raking light sweeps across the sheet and the tooth **lights up on the
near side, shadows on the far side** — the paper goes from a static grit to a tactile, alive, embossed surface
the user can SEE breathing under the cursor. Static at rest (compositor-cheap, PRM-frozen), alive on intent.

This is paper morphism with FLOW & PUNCH: the grit is plainly visible at rest, and it **comes alive** the
instant a pointer rakes across it — the letterpress register, not a dusty stipple.

---

## 2 · The mechanism — ONE re-textured, re-calibrated paper rung (UNION with the split)

### 2.1 Retire the muddy single-noise; ship a TWO-BAND letterpress texture token

Replace the `feBlend-multiply` noise data-URI in BOTH `paper-underpaint` and `paper-grain-overlay::after`
with a **clean two-band turbulence** authored ONCE as a token (`--paper-grain-texture`), so every paper
surface shares ONE source (DRY). The texture is a single SVG carrying two `feTurbulence` layers composited:

```
--paper-grain-texture: url("data:image/svg+xml,...
  <filter id='g'>
    <!-- COARSE tooth band: low freq, big grain you can FEEL -->
    <feTurbulence type='fractalNoise' baseFrequency='0.012 0.018' numOctaves='2'
                  seed='7' stitchTiles='stitch' result='tooth'/>
    <!-- FINE fiber band: higher freq rag flecks -->
    <feTurbulence type='fractalNoise' baseFrequency='0.09' numOctaves='3'
                  seed='13' stitchTiles='stitch' result='fiber'/>
    <feMerge result='paper'>            <!-- stack the two bands -->
      <feMergeNode in='tooth'/><feMergeNode in='fiber'/>
    </feMerge>
    <feColorMatrix in='paper' type='saturate' values='0'/>   <!-- grey, no chroma -->
    <feComponentTransfer><feFuncA type='linear' slope='1.4'/></feComponentTransfer> <!-- bite the alpha contrast -->
  </filter>
  <rect width='100%' height='100%' filter='url(#g)'/>
...")
```

- **NO `feBlend in2=SourceGraphic`** — paint the filtered noise straight onto the rect (the live measurement
  showed the multiply-against-empty-source muddies it to near-black). Clean turbulence = honest grain.
- **The COARSE band is the headline fix** — `baseFrequency 0.012–0.018` (anisotropic, slightly stretched on
  one axis = the cockle/grain-direction of real stock) gives a **big, low-freq tooth** that survives hiDPI
  downsampling (where the old 0.65 fine noise averaged to grey). This is the single most important change for
  visibility: **coarse grain reads on hiDPI; fine grain does not.**
- The fine band rides on top for the rag-fleck texture. The `feFunc A slope 1.4` bites the alpha histogram so
  the grain has real contrast rather than a flat grey wash.
- **Tile size up to 220px** (from 60px) so the coarse tooth has room to read as a STRUCTURE, not a repeat.
  `--paper-grain-tile: 220px` (one token, both utilities).

### 2.2 Re-calibrate the amplitude to CLEAR the JND floor — DECISIVELY (both modes)

The split's 0.08/0.11 buys ≈1.2 ΔL — a squint. Lens-C target: **effective ΔL ≥ ~4–5 L units** at rest
(plainly visible, well above JND, still calm — not TV static). With the higher-amplitude two-band texture
(`lumStdDev` rises to ~28–32 after the alpha-bite) the opacity to clear ~4–5 ΔL is roughly:

- **Light: `--paper-grain-opacity: 0.14`** with `mix-blend-mode: multiply` (NOT overlay). Multiply over the
  cream page darkens the valleys directly — a more legible, more "printed-ink-in-tooth" read than overlay's
  symmetric push. (overlay is kept only where the surface is mid-tone glass.)
- **Dark: `--paper-grain-opacity: 0.20`** — and **abandon `soft-light` for the dark arm** (it collapses over
  near-black, live-proven). Use **`screen` blend** on dark (the `.paper-texture`/`paper-grid` dark arm ALREADY
  uses `screen` — UNIFY the whole paper register onto it, DRY): screen lifts the grain highlights off the dark
  card so the tooth reads as a faint luminous fiber. This is the dark-mode headline fix.

These are a **clean-break re-calibration of the EXISTING `--paper-grain-opacity` token** (no new token, no
alias — no-legacy). The split's intent (paper > glass grain) is PRESERVED and amplified; we keep the
two-mode token, just at honest values + the right blend per mode.

> Fence: this is the `--paper-grain-opacity` PAPER token, NOT `--glass-grain-opacity` (0.025, the calm glass
> floor). The library glass tiers' `.glass-material::after` grain reads `--glass-grain-opacity` and is
> BYTE-UNTOUCHED — paper stays the loud register, glass stays calm. The split's cardinal fence holds.

### 2.3 The PUNCH — a raking catch-light emboss (alive on pointer, static at rest)

Add a SECOND, optional sublayer to `paper-grain-overlay` (the per-surface variant only, never the fullscreen
underpaint): a **dual-offset emboss** that reuses the glass `vSpecular` pointer vars the ecosystem already
publishes (`--specular-x`/`--specular-y`, 0–1 normalized pointer pos). At rest it is a static, symmetric,
sub-perceptual sheen; on pointer-move it becomes a directional raking light:

```css
@utility paper-grain-overlay {
  /* ...the ::after grain band from 2.1/2.2... */
  &::before {                       /* the emboss/deboss raking light — OPT-IN via --paper-emboss:1 */
    content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
    opacity: calc(var(--paper-emboss, 0) * var(--paper-grain-opacity));
    /* the SAME two-band noise, masked to a directional gradient keyed off the pointer */
    background-image: var(--paper-grain-texture);
    -webkit-mask-image: linear-gradient(
      calc(var(--specular-angle, 135deg)),
      white, transparent 60%);              /* lit side only */
    mix-blend-mode: screen;                  /* highlights the tooth high-points */
    /* a paired multiply layer for the shadow side is the deboss — see spec */
    transition: opacity var(--motion-rest, 600ms) var(--ease-liquid);
  }
}
```

- **At rest** `--paper-emboss` defaults `0` → the `::before` is invisible (zero cost, zero motion). The base
  `::after` grain still reads plainly (2.1/2.2). So **every paper surface is visibly grainy with NO JS.**
- **On a surface that opts into the alive register** (`data-paper-alive` + `vSpecular`/`useLiquidHover`):
  `--paper-emboss → 1` on pointer-enter, and `--specular-angle` tracks the pointer azimuth. The lit-side
  mask + screen highlight sweeps across the tooth → the paper EMBOSSES under the raking light. This is the
  letterpress PUNCH — pure cartoon FLOW & PUNCH applied to the grain, **composing the existing specular
  engine** (no new pointer machinery). Liquid-weight: the engage ramps on `--motion-rest` (≈600ms, weighted,
  not snappy), so the light sweeps in with inertia, not a hard toggle.
- Compositor: `::before` opacity + mask are GPU-composited; the pointer var update is the same per-frame
  custom-prop write `vSpecular` already does (one paint-free style recalc). **No backdrop-filter, no GL, no
  per-frame raster** — the noise raster is cached, only the mask gradient angle changes.

### 2.4 The right SURFACES — paper grit EVERYWHERE paper morphism is claimed

The user wants it visible EVERYWHERE the register is claimed. Three placement legs (KISS — set the existing
prop / class, no new mechanism):

1. **Page substrate (every paper-default route):** the `paper-underpaint` fullscreen wash carries the
   re-calibrated coarse grain. FIX the 8-stack register-conflation (the `paper-glass`/`paper-texture` SYNTHESIS
   `BD.W-PAPER-BACKDROP-CONTAIN` src wave): in-card mounts default to the CONTAINED `paper-grain-overlay`
   `::after` register, ONE fullscreen `paper-underpaint` at app-root. + tint the LIGHT page wash off
   `transparent` to `color-mix(in srgb, var(--foreground) 4%, transparent)` (the split-wave's leg-2 that never
   landed) so the grit reads on a faint warm-cream plate, not flat paper-white.
2. **Paper utilities + cards (the MATERIAL leg):** `.paper-texture`, `.paper-grid`, `cartoon-surface`,
   `.glass-cartoon`, and `Card :grain` ALL resolve the ONE `--paper-grain-texture` + `--paper-grain-opacity`.
   The §L1 "layer 6" grain on a glass plate becomes plainly the paper finish — the six-layer composite finally
   shows its tooth. `ShowcaseFrame grain` prop (already shipping) gets SET on the print/type-specimen frames
   (`typography.vue` the WORST miss — zero grain today; the paper HOME).
3. **The §3 colorful-field demos:** where glass stages over an Aurora field, the glass plate wears
   `paper-grain-overlay` as its layer-6 finish — paper grit reads ON the glass OVER the colorful field (the
   six-layer demonstration the SYNTHESIS calls load-bearing). The grain reads through the glass tint, on the
   defined edge — the duality the system's identity rests on.

### 2.5 The proportion + the calibration ladder (Aristotelian)

- Tile `220px` ≈ the φ-family page rhythm; the coarse:fine frequency ratio `0.015 : 0.09 ≈ 1 : 6` ≈ φ⁴ (the
  two bands are a golden octave apart — they never beat against each other).
- Opacity ladder light→dark `0.14 → 0.20` ≈ ×√φ (1.27 × the split's preserved 1.4× paper>glass intent,
  re-anchored). The emboss engage opacity = `--paper-emboss × --paper-grain-opacity` (the lit sheen never
  exceeds the base grain — proportional, never gaudy).

---

## 3 · Cross-engine (Chrome + Safari) — the hard gate

- **Static SVG `feTurbulence` + `feMerge` + `feComponentTransfer`** are cross-engine Baseline; the noise
  raster is identical Chrome/WebKit (deterministic `seed`). The data-URI is parsed once, cached — **zero
  per-frame cost, both engines**.
- **`mix-blend-mode: multiply / screen`** + `-webkit-mask-image: linear-gradient(...)` are Baseline (the
  `-webkit-` mask prefix is shipped for Safari). NO `backdrop-filter:url()` (the WebKit goo trap) — the grain
  is a plain `background-image` + blend, never a backdrop filter.
- The emboss `::before` updates only a CSS custom property (`--specular-angle`) — the SAME compositor-only
  pointer write `vSpecular` already proves cross-engine. No layout, no repaint of the cached noise.
- **Determinism:** the live `lumStdDev` rasterization (Chrome) is the calibration anchor; the π re-measures
  the SAME patch-variance on the `webkit` project (the texture is byte-identical, so the variance must match
  within tolerance). The grain reads identically on Safari and Chromium — the Safari-support-matrix row holds.

## 4 · a11y / PRM / reduced-transparency

- `@media (prefers-reduced-transparency: reduce)` → `--paper-grain-opacity: 0` on BOTH `paper-underpaint` +
  `paper-grain-overlay::after`/`::before` (the existing bracket EXTENDED to the `::before`). The grit is a
  decorative finish — it retires with the rest of the refraction (design.md §"no silent degradation").
- `@media (prefers-reduced-motion: reduce)` → `--paper-emboss: 0` forced (the raking light never engages); the
  STATIC grain stays (a still texture is fine at rest — only the alive sweep is gated). The base grit is the
  a11y floor; the PUNCH is the progressive enhancement.
- No chroma in the grain (`feColorMatrix saturate 0`) — never tints the warm-cream identity; never a
  contrast-floor risk (it modulates luminance ±, the type contrast is unaffected at these amplitudes).

---

## 5 · DEFT UNION — what changes, what is reused, what is retired (KISS/DRY/no-legacy)

| Item | Action | Note |
|---|---|---|
| `--paper-grain-opacity` (0.08/0.11) | **RE-CALIBRATE** → 0.14 / 0.20 | clean-break, no alias; the split's token KEPT, honest values |
| `paper.css` noise data-URI ×2 | **RE-TEXTURE** → ONE `--paper-grain-texture` token (two-band, 220px, no feBlend) | DRY single source; both utilities + `.paper-texture`/`.paper-grid` resolve it |
| dark blend `soft-light` | **REPLACE** → `screen` (unify onto the `.paper-texture`/`paper-grid` dark arm) | one dark blend across the whole paper register; the dark-mode headline fix |
| light blend `overlay` | → `multiply` (ink-in-tooth read) | overlay kept only on mid-tone glass plates |
| `--paper-emboss` + `::before` raking light | **ADD** (opt-in, composes `vSpecular`/`--specular-*`) | the PUNCH; reuses extant specular pointer vars, no new engine |
| `--story-paper-wash: transparent` (light) | **TINT** → `color-mix(... --foreground 4% ...)` | the split-wave's never-landed leg-2; grit reads on a plate |
| 8× `paper-underpaint` fixed stack | **CONTAIN** → default per-surface `::after`, one fullscreen underpaint | folds the `BD.W-PAPER-BACKDROP-CONTAIN` src fix |
| `feBlend multiply in2=SourceGraphic` | **DELETE** | live-proven to muddy the noise to near-black |
| `--glass-grain-opacity` (0.025) | **UNTOUCHED** | the cardinal fence — glass stays calm, paper stays loud |

**One wave-amendment, no fork:** AUGMENT `BD.W-PAPER-MORPHISM` (the re-texture + re-calibrate + dark-blend
flip + the light-wash tint, all on its existing token/utility seam) and FOLD the `::before` raking-light PUNCH
+ the `BD.W-PAPER-BACKDROP-CONTAIN` containment into the same union. The split is not re-forked — it is
finished and amplified.

---

## 6 · The DELTA-ASSAY → wave amendment (reconciled vs the 116 union waves, no dup)

- **AUGMENT `BD.W-PAPER-MORPHISM`** — its mechanism (re-point the paper grain onto a perceptible rung) is
  RIGHT; its VALUES are wrong and its demo-rung leg never landed. Amendment: (a) the two-band 220px
  `--paper-grain-texture` re-texture; (b) the `0.14`/`0.20` re-calibration; (c) the dark `soft-light → screen`
  flip; (d) the `multiply` light blend; (e) the `--story-paper-wash` light tint (the unlanded leg-2); (f) the
  `--paper-emboss` raking-light `::before` PUNCH (opt-in, `vSpecular`-composed, PRM-gated). The gate
  `proof:paper-morphism` re-baselines its π floor: **effective patch luminance-variance ≥ ~4–5 L units** (up
  from the ~1.2 that born-passed a too-low floor) on BOTH modes BOTH engines; born-RED on the current 0.08
  flat. P2 library fence (`--glass-grain-opacity` byte-untouched) UNCHANGED.
- **FOLD `BD.W-PAPER-BACKDROP-CONTAIN`** (the SYNTHESIS-proposed src micro-wave) into the union — the
  `position:fixed` containment + the dead `--paper-underpaint-color` paint ride the same `paper.css` edit.
- **No dup vs:** `BB.W-PAPER-GRID-TEXTURE`/`BC.W-VIZ-PAPERGRID` (the GEOMETRIC grid — a sibling register, it
  shares `--paper-grain-opacity` for its ambient strength but is the grid-ink, not the fiber grain; they
  compose, not collide). `BD.W-TOKEN-TOUR-GLASS`/`BD.W-PAPER-GLASS-ALIVE` (the page-composition + alive
  dock-explorer waves) CONSUME this register — they are downstream, not duplicative.

---

## 7 · The gestalt bar (the user is the judge)

A fresh whole-page both-mode capture of `/foundations/paper-texture` + `/foundations/typography` +
`/compositions/math-paper`: the page reads as a TACTILE warm-cream (light) / luminous-dark (dark) PAPER —
**the tooth is plainly visible without squinting**, the clean-vs-aged panels now show a REAL grain difference,
the type specimen wears a felt finish, and on a pointer rake the sheet EMBOSSES under the moving light (the
letterpress PUNCH). The glass surfaces elsewhere stay calm (un-stippled). If the orchestrator has to squint,
the amendment has not landed. Born-FAIL on HEAD (live-proven flat, both modes).
