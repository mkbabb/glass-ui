<!-- capture-commit: 875c271a7849ad62a627a0749e3f44d447e149b0 -->
<!-- surface-paths: src/components/custom/goo-blob/GooBlob.vue, src/composables/color/index.ts, src/components/custom/constellation/Constellation.vue, src/components/custom/constellation/constellationDraw.ts, src/styles/tokens/shadow.css, demo/stories/substrates/blob.vue, demo/stories/StoryHero.vue -->

# AY.W-COHERE — the four live substrates as ONE set · cohesion convergence DELTA

This wave is the CONVERGENCE pass the per-substrate waves could not own. The four AY
Batch-2 substrates — constellation (W-CON1), blob (W-BLOB2), dock (W-DOCK1/2),
fourier (W-FF2) — each passed its OWN isolation gate and shipped a DELTA, but read
TOGETHER (the `audit/hardening/b2/B2-gestalt.md` red-team) they were FOUR SEPARATE
GATE-PASSES, not one cohesive family. W-COHERE pulls the worst-offending surface (the
blob) into the constellation-defined optimum and binds the four to ONE shared
contract: ONE warm-red accent family, ONE recession-envelope vocabulary, ONE soft
ambient shadow language — measured AS A SET.

## What landed (the three convergence edits + the set-level gate)

- **E1 — the blob mood/seed chroma into the warm-red band (D1, D4).** The
  `deriveBlobPalette` producer (`src/composables/color/index.ts:260,298`) gained a
  `chromaCeiling?: number` option applied as `Math.min(C, chromaCeiling)` AFTER the
  midpoint bump, BEFORE the gamut-map. `undefined` (the default) is byte-identical to
  HEAD — this is a CHROMA CAP on the shader-amplified seed path, NOT a hue re-map (a
  blue seed stays blue, capped to non-neon chroma). The blob demo
  (`demo/stories/substrates/blob.vue:91,163`) caps the mood/seed derivation at
  `BLOB_WARM_REGISTER_CHROMA_CEILING = 0.15` (the comet's band) and re-points the
  "Excited" preset harmony from `triad` → `analogous` (the triad scattered the
  warm-red seed's satellites to green/blue ~145°/265°, fracturing the accent family).
  **RECONCILE with W-BLOB-REBUILD:** the RESTING studio IS the canonical
  `BLOB_CONFIG_DEFAULTS` cream bead (the rebuilt stunning-bar default is preserved
  untouched — the ceiling rides ONLY the seed/mood derivation path, never the resting
  default).

- **E2 — the blob ambient contact shadow at ALL THREE sites (D2).** The
  `GooBlob.vue` wrapper's hard `5px 5px 2.5px …80%-near-black` cartoon offset-stamp is
  GONE, replaced by `filter: drop-shadow(var(--blob-shadow))` at all three sites — the
  resting filter (`:262`), the `:hover` lift (`:267` → `--blob-shadow-hover`), and the
  `prefers-reduced-motion` `!important` block (`:289`). The `--blob-shadow` token
  (`src/styles/tokens/shadow.css:121-130`) is a low-offset (`0 4px`), larger-blur
  (`14px`), ambient-tinted (`--blob-color` mixed toward `--shadow-color` at `22%`,
  emitted at `20%` strength) contact shadow. Adaptive-by-construction: the color rides
  `--shadow-color` = `var(--foreground)`, which flips light→dark, so the shadow
  re-resolves under `.dark` with NO hardcoded `.dark` block (the house cartoon-shadow
  contract's pattern). The Memphis offset-stamp STAYS the identity of
  `<Card surface="cartoon">` — it is removed ONLY from the gel bead (a different
  lighting language).

- **E3 — the constellation recession envelope (D3).** `Constellation.vue` gained
  `opacityCeiling?: number` (default `1`; the SAME prop name aurora carries, the FF
  `intensity` sibling — ONE recession vocabulary, not three synonyms). It threads into
  the carved `constellationDraw.ts` (the W-GOD1 carve target — the four draw passes
  `drawEdges`/`drawNodes`/`drawPointerWeb`/`drawRipples` moved there), where the
  painted edge/node/web/ripple alpha scales by `opacityCeiling` OVER the mode-tuned
  `--constellation-alpha`. At `opacityCeiling = 1` the draw is byte-identical to HEAD
  (the default-OFF canary). `StoryHero.vue:160` threads
  `:opacity-ceiling="opacityCeiling"` onto the constellation hero exactly as it
  threads aurora (`:151`) + fourier (`:169 :intensity`), so a constellation StoryHero
  recedes to the page's 0.4–0.6 with its siblings.

- **E4 — `scripts/proof-substrate-cohesion.mjs` (the set-level gate).** A
  source-witness + π-readback hybrid modeled on `proof:glass-cohesion` (measure the
  SET). It self-proves each run (the synthetic `5px 5px` stamp line is fed through the
  hard-offset detector). Wired into `package.json` + appended to the `scripts/gates.mjs`
  `GATES` array (see §sharedFileDeltas).

## The AFTER — the both-mode SET contact sheet (the G4 binding)

The own-surface DELTA is the four substrates captured TOGETHER, at ≥2 viewports ×
{light, dark}, each legible — the protocol floor. Captured live on the demo storybook
(`npm run dev -- --port 5199`) at desktop (1280-class) + mobile (390-class) element
crops:

### Blob — the warm-cream gel bead + the soft ambient contact shadow

- `W-COHERE-blob-desktop1280-light.png` (256×257)
- `W-COHERE-blob-desktop1280-dark.png` (256×257)
- `W-COHERE-blob-mobile390-light.png` (192×193)
- `W-COHERE-blob-mobile390-dark.png` (192×193)

The bead is a lit cream dome sitting IN the scene with a soft near-centered ambient
halo — NOT the hard down-right Memphis stamp. Under `.dark` the same `--blob-shadow`
token re-resolves to a faint warm glow on the ink ground (the adaptive `--shadow-color`
flip; no `.dark` re-declaration).

### Constellation — the recessive lattice + the warm focal ring (the bar)

- `W-COHERE-constellation-desktop1280-light.png` (1280×800)
- `W-COHERE-constellation-desktop1280-dark.png` (1280×800)
- `W-COHERE-constellation-mobile390-light.png` (390×844)
- `W-COHERE-constellation-mobile390-dark.png` (390×844)

The recessive grey lattice with a single warm focal ring (red on cream, amber on ink),
the dock floating over it as a clean glass pill — the two read as ONE composed scene.
This IS the convergent-optimum reference the other three are measured against.

### Fourier — the warm-red comet, legible on cream AND ink (W-FF2 RG3 MET)

- `W-COHERE-fourier-desktop1280-light.png` (1134×1852)
- `W-COHERE-fourier-desktop1280-dark.png` (1134×1852)
- `W-COHERE-fourier-mobile390-light.png` (358×1520)
- `W-COHERE-fourier-mobile390-dark.png` (358×1520)

The phosphor comet (head + glowing trail) traverses the full frame — NO corner stub.
On cream the `source-over` blend keeps the warm-red beam legible (the W-FF2 light-mode
floor dependency is landed); on ink the additive `lighter` phosphor bloom lifts it. The
comet's warm-red hue (~28°) is the accent the blob bead now shares.

### Dock — the glass pill + the warm-red selected register (W-DOCK2 RG1 MET)

- `W-COHERE-dock-desktop1280-light.png` (58×640)
- `W-COHERE-dock-desktop1280-dark.png` (58×640)
- `W-COHERE-dock-mobile390-light.png` (390×844)
- `W-COHERE-dock-mobile390-dark.png` (390×844)

The vertical glass dock rail — home/brand control leading, nav items, a `<DockSeparator>`
divider, the warm-red selected indicator reading as a glass tier (the dependency
capture is landed; the dock is shown in the constellation scene as the floating pill).

## The falsifiable set-cohesion measurements (the π readback, not prose)

The live π arm (`tests-visual/substrate-cohesion.spec.ts`, the composited-element
screenshot decoded with pngjs, OKLCh computed inline via the Ottosson matrices)
ratifies the three set-cohesion axes on the desktop project (3/3 specs PASS; the mobile
project skips — the geometry-sensitive readbacks are desktop-layout calibrated, the
mobile look rides this contact sheet):

| axis | measured (live π) | band / floor | verdict |
|------|-------------------|--------------|---------|
| **G-ACCENT** — FF comet head | C = 0.145, hue = 27.7° | the set's chromatic accent ceiling | — |
| **G-ACCENT** — blob MOOD bead (Excited seed) | **C = 0.136, hue = 19.0°** | C ∈ [0.045 floor, 0.175 ceiling]; hue ∈ [5°, 75°] | **IN BAND** — saturated warm-red bead, NOT the neon coral ball (the seed `oklch(0.62 0.19 25)` rendered C well above the ceiling at HEAD) |
| **G-RECESSION** — constellation 0.4-ceiling vs 1.0 ink | **ratio = 0.254 (25%)** | ∈ [18%, 62%] | **BITES** — the recessed field paints ~25% of the full field's ink (at HEAD, no prop → ~100%, identical) |
| **G-SHADOW** — blob cast shadow darkest-5% OKLCh-L (light) | **L = 0.780** | ≥ 0.58 floor | **SOFT AMBIENT** — well above the floor (the `5px 5px` 80%-near-black cartoon stamp drives it to L ≈ 0.48) |

One warm-red accent family (comet 27.7° / bead 19.0°, both inside [5,75]°; bead C
0.136 ≤ comet ceiling 0.175). One recession contract (all four expose the
outer-envelope knob; the constellation prop BITES at 25%). One soft ambient shadow
language (the gel bead, not the Memphis stamp), adaptive in both modes.

## Re-capture / re-verify command

```
# the set-level cohesion gate (source-witness + the live π readback, fail-CLOSED)
node scripts/proof-substrate-cohesion.mjs           # → proof:substrate-cohesion once wired
# the ledger that binds THIS DELTA's W-COHERE-*.png to the live-verified row
npm run proof:live-verified-ledger -- --tranche=AY
```

**Captured 2026-06-10** against the carved tree (`tranche/AY`, post-Batch-4: W-GOD1
carve landed, `proof:no-god-module` PASSES) on the live demo (`localhost:5199`). The
gate reads back GREEN on all four arms: G-SHADOW (no hard stamp + reads `--blob-shadow`
+ adaptive token), G-RECESSION (4/4 knobs + the draw scales), G-ACCENT (chromaCeiling
threaded), and the π live readback (3/3 specs, exit 0).

## Gate / dependency notes

- **G4 dependencies MET.** The both-mode set DELTA depends on the FF light-mode floor
  (W-FF2 RG3 — the comet legible on cream, captured above) + the dock own-surface
  capture (W-DOCK2 RG1 — shown above). Both landed before W-COHERE ran (W-COHERE is the
  LAST substrate-band wave).
- **G5 — no per-substrate regression.** The blob fleet (`proof:blob-warm-default` 4/0)
  + constellation tokens/field + `proof:glass-cohesion` stay GREEN; the chroma ceiling
  default-`undefined` and the `opacityCeiling=1` default-OFF leave HEAD byte-identical.
  See §sharedFileDeltas for the two CARVE-STALE gates (`proof:constellation-substrate-single`,
  `proof:fourier-field-intensity`) whose file cites the W-GOD1 carve invalidated — NOT
  W-COHERE regressions (the moved functions / presets are the carve's, the gate cites
  need W-GOD1 owner updates).
