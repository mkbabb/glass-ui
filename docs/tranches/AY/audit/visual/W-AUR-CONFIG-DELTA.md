# W-AUR-CONFIG-REBUILD — DELTA (B21 + B19)

The aurora studio configurator + preview-pane fix, rebuilt from first principles.
Route: `/substrates/aurora` (`:5199`). All captures real-dimensioned, ANGLE-metal
(real-GPU, darwin), `--headless=new`, 1× DSF unless noted.

## B21 — the configurator rebuilt from first principles

### Before (the janky two-face split)
The studio chrome forked into a top-level **"Atoms ↔ Advanced" `<SegmentedTabs>` pill
toggle**: a cramped flat atoms scroll on one face (Color/Zones/Noise/Medium/Motion as
bare `<p>` labels + controls), a stack of bare `<ConfiguratorLayer>` collapsibles on the
other (Medium/Palette/Flow/Texture/Comp/Nuclei). The split FRAGMENTED the control surface
— the user's "god-awful … janky mess, doesn't have the same configurability."

- `W-AUR-CONFIG-before-studio-desktop1440.png` (1440×900) — the whole studio, Atoms face.

### After (ONE progressive-disclosure column)
A single cohesive scrolling controls column on the library's own `<ConfiguratorLayer>`
sections, with a clear **Color → Composition → Motion → Warp&noise → Flow → Texture →
Nuclei** hierarchy. Each section carries BOTH its few intuitive knobs (the atoms — seeded
FROM the preset, refining over its baseline) AND its deep config fields. The quick three
sections open by default; the deep four start collapsed. A header strip ("Aurora studio"
+ live `N stops · M nuclei` + Reset) replaces the bare "Aurora" label. The Atoms/Advanced
face-toggle is DELETED (the janky split the user named) — the section stack IS the nav.

- `W-AUR-CONFIG-after-studio-desktop1440.png` (1440×900) — the whole studio, rebuilt.
- `W-AUR-CONFIG-after-aside-360.png` (360×700, 2× DSF) — the Color section open: seed
  swatch · Harmony select · Energy slider · Derive-from-color card (harmony toggle +
  Stops stepper + Derive) · the per-stop OKLCh editor (L/C/h spectrum sliders + values).
- `W-AUR-CONFIG-after-sections-360.png` (360×~720) — the section headers stacked: Color
  (collapsed), Composition (Medium·Zones·Arrangement·Organic-boundary), Motion (register
  + Nuclei/Palette drift + Breath), and the collapsed Warp&noise/Flow/Texture/Nuclei.

### Full historical control surface — EVERY control reachable
Inventoried from the pre-AY surface (the AtomsPanel ×7 atoms + the six config/*Layer.vue
advanced panels). All preserved in the rebuilt column:

| Section | Atoms (data-atom) | Deep config fields |
|---|---|---|
| Color | seed · harmony · colorEnergy | per-stop OKLCh L/C/h editor + derive-from-color (seed/harmony/stop-count) + add/remove/reorder stops |
| Composition | medium (+ texture) · zones-count · zones-arrangement · noise | — |
| Motion | motion | nucleiDrift · paletteDrift · breathDepth · breathPeriod |
| Warp & noise | — | warpMode · warpAmount · warpScale · warpDrift · softmaxBeta · valueVariance |
| Flow | — | pattern · focalX · focalY · angle · curl |
| Texture | — | oil strokeMode/strokeLayers (oil-only) · noiseOctaves · strokeAmount · strokeScale · anisotropy · impasto · brokenColor · canvasGrain · wetEdge · granulation · paperGrain |
| Nuclei | — | per-nucleus x/y/radius/elongation/angle/paletteBias/valueBias/driftRadius + add/remove |

The medium enum renders ONCE (a single `LabeledSelect` in Composition) — the prior
dual native-`<select>` / `SegmentedTabs`-pill double-rendering is structurally gone with
the retired `AuroraAtomsPanel.vue` + `config/MediumLayer.vue` faces (both deleted; no
orphans). The oil stroke sub-modes + noise-octaves moved into the Texture section; the
nuclei/palette drift + breath moved into the Motion section (one motion home).

## B19 — the black bar on the preview panes REMOVED

### Root cause
The preset thumbnail cards (`PresetPickerRow.vue`) were `display: block` buttons. A
block-level card gives its first child (the `aspect-[16/10]` thumbnail well) a ~5px
line-box STRUT off the caption's `line-height: 27.9px` — that strut painted a band of
`bg-card` ABOVE the baked thumbnail image. In dark mode `bg-card` is near-black
(`28,25,23`), so it read as a **black bar across the top of every preview pane** (the
user's B19). Measured BEFORE (dark, Dawn card, center column, 2× DSF):

```
y0-1   91,86,82    (card border)
y2-11  28,25,23    ← the BLACK BAR (~10px @ 2× = ~5px logical of bg-card)
y12+   234,126,119 (the warm thumbnail image finally begins)
```

### Fix
`PresetPickerRow.vue` card → `flex flex-col` (a real flex column has NO baseline strut),
so the thumbnail well is a flex item flush to the card's top inner edge. Measured AFTER:

```
y0-1   91,86,82    (card border)
y2+    234,126,119 ← the thumbnail image immediately (ZERO bg-card band)
```

- `W-AUR-CONFIG-blackbar-after-dawn-dark.png` (200-px card, 2× DSF, dark) — the Dawn
  pane: the warm pink/orange thumbnail meets the rounded top crown directly. The dark
  band at the BOTTOM is the caption area (by design), not the bug.
- `W-AUR-CONFIG-before-presets-row.png` (1294-px row, 2× DSF, light) — the full preset
  row reference (the band reads near-black only under `.dark`).

## Preset tunings

`sky` + `dawn` BYTE-PRESERVED (git diff shows only the SPEEDTEST + CRAYON hunks changed).

### Speedtest — "more cloud-like + actually change over time"
CLOUDIER: softer nucleus blend (`softmaxBeta 3.2 → 2.4` — masses merge like cumulus,
not hard cells), more billowy organic warp (`warpAmount 0.38 → 0.52`, `warpScale 1.6 →
1.25` for broader puffs, `noiseOctaves 4 → 5` for wispy edge detail). EVOLVING OVER TIME:
the whole field slowly migrates — `nucleiDrift 0.04 → 0.055`, `paletteDrift 0.02 → 0.035`,
`warpDrift 0.02 → 0.03`, and each nucleus `driftRadius` ~doubled (0.015-0.022 → 0.030-
0.042) so the masses visibly ORBIT; a deeper, slower breath (`breathDepth 0.08 → 0.11`,
`breathPeriod 42 → 58`) for the gentle billow-and-settle.

MEASURED temporal evolution (canvas-only, interior, 1×): mean Δ **16.11 over 7 s** — a
clear smooth drift, not a static field and not a jarring flicker. (Same-preset confirmed:
active0 == active1 == "Speedtest".)

- `W-AUR-CONFIG-before-speedtest.png` / `W-AUR-CONFIG-after-speedtest.png` — the before is
  sharper pastel blobs; the after is softer/billowier cloud masses.

### Crayon — "a bit too oily"
Dried out via the preset's medium params (the SHADER crayon BODY is the sibling
W-AUR-VANGOGH-REBUILD lane's `mediums.glsl.ts` domain — see coordination below):
`strokeAmount 0.60 → 0.48` (a lighter waxy STAMP, less heavy deposit), `wetEdge` pinned
`0` (no creamy wet darkening), `canvasGrain 0.07 → 0.09` + `paperGrain 0.018 → 0.024`
(MORE dry paper tooth/bite), `brokenColor 0.35 → 0.28` (less creamy color-mixing),
`saturation 1.04 → 0.97` (matte, not vivid), `impasto` stays `0` (no sheen).

- `W-AUR-CONFIG-after-crayon.png` — NOTE: crayon currently renders SMOOTH (no dry-tooth
  texture) because the crayon medium BODY in `mediums.glsl.ts` is mid-rebuild by the
  W-AUR-VANGOGH-REBUILD lane (oil renders rich texture in the same capture window → the
  textured-medium machinery works; only the crayon dispatch is in-flux). The dryness
  config tuning is correct and manifests the moment their crayon shader paints its tooth.

## Coordination boundary (disjoint files)

- **MINE (this lane):** the demo studio chrome — `AuroraConfigDock.vue` (rebuilt) + the
  new `sections/AuroraColorSection.vue` / `AuroraCompositionSection.vue` /
  `AuroraMotionSection.vue` + the re-homed `config/{TextureLayer,CompositionLayer}.vue` +
  `PresetPickerRow.vue` (black-bar fix) + `substrates/aurora.vue` (tab-wiring removed) +
  `presets.ts` (crayon/speedtest tunings) + the two studio gate drivers.
- **THEIRS (W-AUR-VANGOGH-REBUILD):** `mediums.glsl.ts` — the van-Gogh + crayon SHADER
  bodies. The painterly-statistics van-Gogh gap-fraction failure + the crayon smooth-
  render are their in-flight shader rebuild, NOT this lane's regression.

## Gates (kept honest)

- `proof:aurora-studio` SOURCE arm GREEN; the live-π `aurora-studio.spec.ts` (6/6,
  desktop + coarse-touch) PASSES against the rebuilt DOM — medium select opens, textured
  pick reveals the Texture slider, Van-Gogh seed-from-preset round-trip survives a
  one-atom touch, served-app sentinel fails-closed. The `DEAD_SELECT_SITES` deletion-proof
  was re-pointed from the deleted `AuroraAtomsPanel.vue`/`config/MediumLayer.vue` to the
  new `sections/*.vue` (intent preserved + strengthened; rationale in the driver).
- `proof:aurora-atoms-render` PASSES (1/1) — every atom (medium · noise · zones-count ·
  colorEnergy · seed) visibly changes the canvas above the drift floor on the rebuilt DOM.
- `proof:aurora-chrome-idiomatic` PASS — re-pointed at the rebuilt section SFCs; medium
  renders once via LabeledSelect, the section stack on ConfiguratorLayer, Option-B native
  swatch, ONE progressive-disclosure column (the Atoms↔Advanced face-toggle deletion is
  now an asserted invariant), composes-only.
- `proof:aurora-painterly-statistics` van-Gogh gap-fraction clause is RED on the
  W-AUR-VANGOGH-REBUILD lane's in-flight shader (their gate to flip; not this lane's).

## D5 radii note (proof:aurora-studio clause 6c)
The D5 oil-pastel β arm is the sibling shader lane's; the prior recorded radii before/after
triple stands: the oil-pastel β moved −2.53 → −2.41 (the `mediums.glsl.ts` sBig/sMed/sSml
respacing) and was kept within the arresting-gate margin (no van-Gogh/oil regression).
