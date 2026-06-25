# Paper Morphism — DELTA-ASSAY (golden vs. current; the UNION path)

> Verdict: **REFINE + RE-CALIBRATE** (one band of it RE-INVENTED — the texture recipe;
> the seam KEPT). Convergence after this assay: **~74%**. Remaining 26% is build-time
> (real-route π, coarse-tooth re-measure, WebKit paired arm, through-glass spike).

Live-inspected Chrome `:5173` `/foundations/paper-texture` (both modes), source-read
`paper.css` · `scale-paper.css` · `glass-fx.css` · `dark-arm.css` · `a11y-fallback.css` ·
`story-hero.css` · the GOLDEN + 3 challenge lenses. The golden's HEAD diagnosis reproduces
verbatim on the live route (see §1).

---

## 1 · The CURRENT state (source-verified on disk + live-painted)

| axis | live HEAD value | source |
|---|---|---|
| `--paper-grain-opacity` (light) | **0.08** | `glass-fx.css:23` |
| `--paper-grain-opacity` (dark) | **0.11** | `dark-arm.css:225` |
| `--glass-grain-opacity` | **0.025 light / 0.045 dark** | `glass-fx.css:17` / `dark-arm.css:224` |
| overlay `::after` blend | **overlay** (light) / **soft-light** (dark) | `paper.css:43,49` |
| underpaint blend | **multiply** (light) / **soft-light** (dark) | `paper.css:21,26` |
| texture | single `feTurbulence bf=0.65 4-oct` + `feBlend multiply in2=SourceGraphic` | `paper.css:17,39` |
| tile | **60px** | `paper.css:19,41` |
| `--story-paper-wash` (light) | **transparent** | `story-hero.css:27` |
| `--story-paper-grain` rung | **EMPTY** (never landed) | — |
| scale-paper textures | `--paper-clean-texture` bf0.65 / `--paper-aged-texture` bf0.5, baked `opacity='0.04'/'0.06'` | `scale-paper.css:118-119` |
| painted std-dev (content-free patch) | **flat cream / flat brown** — std 0.02–0.86 (3 lenses) | live |

**Live gestalt (screenshot `golden/delta-head-light.png`):** `/foundations/paper-texture`
reads as a FLAT cream page; the clean-vs-aged panels show NO perceptible grain difference;
zero grit anywhere. The user's verbatim "I do not see any paper grain or grit anywhere" is
confirmed at live HEAD. **Born-RED is real, not theatre.**

**Mechanistic root cause (golden §0, all 3 lenses agree, reproduced live):** the blends
are self-cancelling at the luminance poles — `overlay`/`soft-light` collapse to identity
against the near-white cream wash (L≈0.98), so the shipped 0.08/0.11 alpha moves
essentially nothing. A pure opacity bump cannot fix a blend that is mathematically incapable
of moving a near-white pixel.

---

## 2 · The DELTA — survival-of-the-fittest triage

### KEEP (fit — the seam is correct, the golden is a UNION not a fork)
- **The `paper-grain-overlay` / `paper-underpaint` `@utility` seam** (`paper.css`). Static
  SVG `::after`/`::before` background, compositor-cached, cross-engine, no
  `backdrop-filter:url`. This is the home of the register and is fit. KEEP.
- **The `--paper-grain-opacity` token NAME + its split from `--glass-grain-opacity`** (the
  landed `BD.W-PAPER-MORPHISM` token identity). The library fence — paper grit is its own
  register, glass stays calm — is the right architecture. KEEP the token, RE-CALIBRATE the
  value (§3).
- **`saturate 0` grey-speckle (luminance-only, no chroma)** — the correct NO-GRAY / no-tint
  move. The grain modulates L only; the warm-cream floor (BA.W-NO-GRAY) shows through. KEEP.
- **The PRM / reduced-transparency carve seam** (`paper.css:55-59` + the EXISTING
  `a11y-fallback.css:15,64` zero of `--glass-grain-opacity`). KEEP; EXTEND to the paper token
  (§3.6). NOTE: challenge-3 R3.1 wrongly claimed `a11y-fallback.css` does not exist — it DOES,
  at `src/styles/glass/a11y-fallback.css`. The golden's a11y instruction is sound; the
  challenge's "phantom file" refutation is FALSE and is dropped.

### REFINE (weak — value/calibration wrong, mechanism kept)
- **`--paper-grain-opacity` VALUE** — 0.08/0.11 are tuned for a blend that cancels. RE-CALIBRATE
  to the measured JND floors for the corrected blends (light up, dark down — the honest
  inversion). **Re-derive against the PINNED-sRGB texture** (challenge-2 R1: the sRGB texture
  bites ~51% harder than the linearRGB default the golden measured under), not the
  linearRGB-default capture. And re-base to the NO-SQUINT floor (challenge-3 R2: std ≥ 4.5,
  not the bare JND 3.0), since the prose bar is "PLAINLY VISIBLE WITHOUT squinting."
- **`--story-paper-wash` (light)** — clean-break off `transparent` → a 4% warm-`--foreground`
  tint so the tooth bites on a faintly-tinted plate, not pure white where even multiply is
  weak at the top end (golden §3.5; the never-landed leg-2). KEEP the `.dark` 7% lift.
- **Coverage** — grain is a buried bg wash, never a MATERIAL on the specimen surfaces.
  `foundations/typography` (THE paper home) wears ZERO grain. Wire `Card :grain` /
  `ShowcaseFrame :grain` (props already exist). REFINE the coverage, no new mechanism.

### RE-INVENT (broken — the texture + blend are mathematically dead)
- **The blend law** — `overlay`(light)/`soft-light`(dark) tooth → **`multiply`(light) /
  `screen`(dark)** (physically true: ink sinks into light paper = darken; fiber catches light
  on dark paper = lighten). The ONE decisive move; takes dark std 0.46 → 3.86 at the same
  alpha band.
- **The texture** — the single `bf=0.65` cloud + the `feBlend multiply in2=SourceGraphic` mud
  op → a contrast-stretched grey-speckle. **HARDENED past the golden** (challenge-3 R1): the
  golden's `bf 0.16` is still FINE speckle (6.3px period, isotropic) — it passes the metric by
  AMPLITUDE (slope-1.8 stretch), not by COARSE STRUCTURE, and downsamples toward grey on DPR
  3. The UNION ships a genuinely coarse + anisotropic tooth (`baseFrequency 0.04 0.09` ≈ a
  ~20px structural period, a real 2.25× axis ratio for directional cockle) so the "tactile
  pressed paper you could run a thumb across" gestalt is in the PIXELS, not the prose. Re-measure
  std on the coarse stack.
- **The fiber band** — RETIRE it (challenge-1 R1: it paints std 0.0 light / 0.40 dark —
  the EXACT self-cancel the golden indicts for the tooth, reintroduced in its own "second
  band"; a whole layer + token + decode for zero signal, a KISS violation). The tooth carries
  the percept; one band is fitter. Dropping fiber also FREES the `::before` for the emboss
  (resolves challenge-1 R2 / challenge-3 R6: fiber and emboss collided on a shared `::before`).
  Net: **ONE tooth `::after`, ONE emboss `::before`.**

---

## 3 · The UNION PATH (the deft integration — KISS, no legacy, no dual-path)

The corrected recipe lands at the LIBRARY token/utility source (the DRY single-writer), so
every existing `paper-grain-overlay` / `paper-underpaint` / `--paper-clean-texture` consumer
lights up at once. This **supersedes** the demo-local `--story-paper-grain` indirection the
landed wave proposed (§5).

### 3.1 · ONE re-textured paper recipe — `paper.css`
- Replace the single `bf=0.65` cloud (`paper.css:17,39`) with the **coarse anisotropic
  contrast-stretched grey-speckle tooth**, a NEW `--paper-grain-tooth` token (DRY single
  source; both `::after` overlay and underpaint resolve it):

  ```
  feTurbulence type='fractalNoise' baseFrequency='0.04 0.09' numOctaves='2' seed='7' stitchTiles='stitch'
  feColorMatrix type='saturate' values='0'
  feComponentTransfer
    feFuncR/G/B type='linear' slope='1.8' intercept='-0.4'   ← the letterpress bite
    feFuncA   type='linear' slope='0'   intercept='1'        ← FORCE full opaque alpha (challenge-2 R2)
  + the <filter> carries color-interpolation-filters='sRGB'   ← PIN sRGB (challenge-2 R1)
  ```
  Tile **140px** (≈ √φ-stepped, divides clean at DPR 1/2/3). DELETE the `feBlend
  mode='multiply' in2='SourceGraphic'` mud op.
- **NO fiber band** (challenge-1 R1) — the `::before` is the emboss-only layer (§3.4).

### 3.2 · The blend law — `paper.css` (per-mode plain arms, NEVER inside light-dark())
- `.paper-grain-overlay::after`, `.paper-underpaint` → `mix-blend-mode: multiply` (light).
- `.dark .paper-grain-overlay::after`, `.dark .paper-underpaint` → `mix-blend-mode: screen`.
- This is a behavioral break on the underpaint dark arm (HEAD `soft-light` → `screen`,
  challenge-1 minor) — flagged in the wave; correct (soft-light cancels on ink), and it is
  the UNION (same selector, internals replaced).

### 3.3 · RE-CALIBRATE `--paper-grain-opacity` — `glass-fx.css` + `dark-arm.css`
Same token NAME, perceptibility-floored VALUES, **measured on the pinned-sRGB coarse texture
at the no-squint floor (std ≥ 4.5 light)** — NOT inherited from the golden's linearRGB/JND
capture (challenge-2 R1 + challenge-3 R2). The build agent re-derives the exact rungs from the
live painted std; the golden's 0.22 light / 0.16 dark are the STARTING anchor, expected to step
DOWN under sRGB. Mint `--paper-grain-tile: 140px`. The opacity ladder inverts (dark bites
harder → steps down) — the honest measured inversion.

### 3.4 · The opt-in raking-light PUNCH — `::before`, `vSpecular`-composed
The single audacious flourish, on its OWN `::before` (now free — no fiber). Gated behind
`--paper-emboss` (default 0 → zero cost, zero motion). On `data-paper-alive`, a SECOND tooth
sublayer masked to `linear-gradient(var(--specular-angle), white, transparent 60%)` keyed off
the pointer azimuth the glass already publishes (`--specular-angle`,
`glass-specular-track.css`). Engage ramps on `--motion-rest` (~600ms weighted — liquid, never
snappy). PRM → forced 0. Compositor-only (a CSS custom-prop write; raster cached). The emboss
highlight rides `screen`/`overlay` for a LIT read (NOT the dead fiber `soft-light` —
challenge-3 R6).

### 3.5 · The wash — `story-hero.css`
`--story-paper-wash` light: `transparent` → `color-mix(in srgb, var(--foreground) 4%,
transparent)`. The `.dark` 7% lift KEPT. Clean break, no alias.

### 3.6 · Coverage + the scale-paper unification + the a11y carve (DRY)
- `--paper-clean-texture` / `--paper-aged-texture` (`scale-paper.css:118-119`) → REPLACED by
  `--paper-grain-tooth` composed with a per-variant `baseFrequency`/`seed` delta (clean =
  tighter, aged = coarser) derived from the ONE recipe (challenge-2 R3). DROP the baked
  `opacity='0.04'/'0.06'` (alpha owned by ONE place per DRY). Consumers (`cards.css:11`,
  `glass/ladder.css:447`, `dock/shell.css:257`) re-resolve for free.
- Wire `ShowcaseFrame :grain` on `typography.vue` (the headline miss) + the print-specimen
  frames; `Card surface="paper"`/`Card :grain` on `math-paper`'s worksheet card +
  `paper-glass`'s opaque specimens (props already ship). DROP the dead `--story-paper-grain`
  demo-rung indirection (KISS — the corrected single library token reads).
- **PRM / reduced-transparency:** EXTEND `paper.css:55-59` to reach the `::before` emboss +
  set `--paper-grain-opacity: 0` + the wash → opaque warm-cream; ADD `--paper-grain-opacity: 0`
  to the EXISTING `a11y-fallback.css:15,64` brackets (next to the `--glass-grain-opacity: 0`)
  + the `forced-colors` bracket. The static grain STAYS under PRM-reduce-motion (a still
  texture is not a motion hazard); only the emboss is motion-gated.

### 3.7 · The library fence (held, per-mode — challenge-3 R4)
`--glass-grain-opacity` BYTE-UNTOUCHED at **0.025 light / 0.045 dark**; `.glass-material::after`
keeps reading it. The fence π asserts BOTH mode values (NOT a flat `== 0.025`, which would
false-fail dark or blind the dark fence). `proof:glass-cal` re-asserted GREEN.

---

## 4 · The born-RED gate (re-based onto the corrected stack + the challenge hardenings)

`proof:paper-morphism`, both modes, both engines. Born-RED at live HEAD (overlay/soft-light →
std 0.02–0.86, flat cream/brown; tooth token empty; wash transparent). Asserts:

1. **painted luminance std-dev over a content-free patch, MEASURED ON THE LIVE ROUTE NODE**
   (screenshot/`drawImage` of the real `::after`, NOT a standalone canvas proxy — challenge-1
   R3) **≥ 4.5** (light, the no-squint floor; challenge-3 R2), measured on the WASHED plate
   (not bare white — challenge-2 R5).
2. resolved tooth blend == `multiply`(light) / `screen`(dark) — born-RED if overlay/soft-light.
3. texture `background-image` == the coarse contrast-stretched tooth — born-RED on the single
   `bf=0.65` cloud; assert resolved `color-interpolation-filters` == sRGB (no-attr→linearRGB→RED,
   challenge-2 R1) + a dominant-spatial-period ≥ ~16px check so a fine-speckle-at-high-amplitude
   texture cannot game the std gate (challenge-3 R2).
4. `--story-paper-wash` != transparent in light.
5. **library fence: `--glass-grain-opacity` == 0.025 (light) AND 0.045 (dark)** — per-mode,
   born-RED only on a CHANGE to those (challenge-3 R4).
6. warm-floor: patch mean chroma in oklch < gray-threshold (NO gray) — assert BOTH on the
   opaque plate AND through a `.glass-material` tile over a saturated field (challenge-3 R5:
   the through-glass §3 application, the least-proven, gets a de-risk spike + a gate arm).
7. **@webkit paired arm:** the SAME live-route patch std-dev within tolerance (challenge-2 R1
   makes this honest only once sRGB is pinned — else a more-toothy Safari render spuriously
   fails parity).

---

## 5 · Reconciliation with the landed `BD.W-PAPER-MORPHISM` wave (the central UNION call)

The landed wave (`docs/tranches/BD/union/waves/BD.W-PAPER-MORPHISM.md`) is **DEMO-LOCAL** —
it mints a `--story-paper-grain` rung in `demo/stories/story-hero.css`, ZERO `src/` paint, and
keeps `--glass-grain-opacity` as the grain source. It was written BEFORE the
`--paper-grain-opacity` split landed (it describes the grain reading 0.025; the token now reads
`var(--paper-grain-opacity, …)` = 0.08). It is **partly STALE and architecturally superseded**:

- Its premise — a pure STRENGTH recalibration of a demo-local rung over the EXISTING overlay
  blend — **cannot work** (the blend self-cancels; 3 lenses + the live route prove it). Bumping
  any opacity on `overlay`-over-cream moves nothing.
- The golden corrects this at the LIBRARY token/utility source (the `--paper-grain-opacity`
  split ALREADY landed library-wide — the demo-local fork is now redundant). The DEFT UNION is
  to RE-CALIBRATE the landed library token + RE-TEXTURE the landed utility, and RETIRE the
  demo-local `--story-paper-grain` indirection (no dual-path, KISS).

**Decision: AUGMENT the landed wave in place** (it IS the paper wave — no parallel fork).
Replace its "demo-local strength recalibration" scope with the texture+blend+library-calibration
redesign; the wave's coverage legs (`ShowcaseFrame :grain`, `typography.vue`, un-occlude) and
its π skeleton are KEPT and re-based. See `WAVE-AMENDMENT.md`.

**No-dup confirmed** vs the 116-wave set:
- `BD.W-PAPERGRID-WARP` / `BC.W-VIZ-PAPERGRID` — the GL/geometric LINE grid, an orthogonal
  sibling register; `.paper-grid` composes WITH the grain, not collides. Cross-pointed.
- `BD.W-TOKEN-TOUR-GLASS` / page-composition waves — downstream consumers of this register.
- No `BD.W-PAPER-BACKDROP-CONTAIN` wave exists (the golden §2.4 cites one; it is a
  page-deep AUDIT finding `viz/page-deep/foundations-paper-texture-*.md`, not a wave). The
  `position:fixed` underpaint containment folds into the same `paper.css` edit as a sub-leg,
  not a separate wave.
