# Convergence audit — A-waves-aurora (Aurora-band wave coverage: W14 + W38 vs D1/D2/D3)

**Lane:** A-waves-aurora · **Verdict:** augment-existing-wave (W38) + audit-note (W14 clean) ·
**Severity:** major

Audits AX.W14 (WebGPU painterly parity-or-excise) + AX.W38 (aurora-configurator glass-atoms
restyle) against HEAD `f2fc614` and the user-defect ledger D1/D2/D3. Reads both waves in full;
source-grounds every claim. Conclusion: **W14 is sound and needs no change. W38 as-written does
NOT fully cover D1 (configurator-redesign) and does NOT cover D2 (van-Gogh discoverability) — its
FileBounds stop at the three library `Configurator*.vue` SFCs and explicitly exclude
`AuroraAtomsPanel.vue`, which is the actual hand-rolled-chrome surface the user saw.** Augment W38
(or split a sibling demo-chrome wave) to reach the atoms panel; D3 belongs to W05 (not this lane).

---

## Ledger-HEAD ⇔ current-HEAD continuity (the defects are LIVE at HEAD)

- The defect ledger was captured at `e2c9995` (W05/W13/W22 band complete). `git merge-base
  --is-ancestor e2c9995 HEAD` → **YES** — `e2c9995` is an ancestor of current HEAD `f2fc614`.
- `git log e2c9995..HEAD -- demo/stories/aurora/` → **ZERO commits**. No aurora-demo change landed
  between the ledger capture and HEAD. **D1 + D2 are present at current HEAD exactly as observed.**
  This is not a stale-ledger artefact.

---

## D1 — configurator design is poor + not idiomatic (W38 PARTIAL, augment)

### What the user actually saw (source-grounded)

The aurora story (`demo/stories/substrates/aurora.vue:148-170`) composes `<Configurator>` with
its `controls` slot filled by `AuroraConfigDock.vue`. The DEFAULT surface that dock opens on is the
**Atoms** tab (`AuroraConfigDock.vue:79` `dockTab = ref("atoms")`), which renders
`AuroraAtomsPanel.vue`. That panel — the first thing the user sees — is built **entirely from raw
HTML elements**, NOT glass-ui primitives:

- `AuroraAtomsPanel.vue:82-87` — `<input type="color" class="h-8 w-full rounded">` (raw color input)
- `:92-98`, `:129-135`, `:156-162`, `:182-188` — `<select class="rounded border bg-card px-2 py-1">`
  (raw native selects, four of them)
- `:103-110`, `:117-124`, `:142-149`, `:168-175` — `<input type="range">` (raw range sliders, four)
- `:80`, `:90`, `:101`, … — `<label class="grid gap-1 text-sm">` with bare `<span>` labels

This is the textbook D1 violation: **hand-rolled chrome where library primitives exist.** The full
`LabeledField` family ships (`src/components/custom/labeled-field/` —
`LabeledInput/LabeledSelect/LabeledSlider/LabeledSwitch`), as do `Slider`, `Select`, `ToggleGroup`,
`ToggleChip`, `BouncyTabs`. Every raw control in the atoms panel has a direct primitive substitute.

Note the asymmetry: the **Advanced** layers (e.g. `config/MediumLayer.vue`) already DO use
`BouncyTabs` pills. So the default surface is LESS idiomatic than the escape hatch — the worst-case
inversion. The library `Configurator*.vue` chrome itself (chip/trigger/reset) is the cosmetic-drift
W38 correctly targets, but it is the OUTER frame; the INNER atoms body is the bigger eyesore.

### W38 coverage of D1 — PARTIAL

W38 restyles the three LIBRARY `Configurator*.vue` SFCs (preset chip → glass-tier active, layer
trigger → glass-button + press-spring, row reset → glass-pill, `transition-control`, `data-slot`
sweep). That correctly fixes the cosmetic drift in the *frame*. But W38's FileBounds
(`AX.W38:52-63`) are explicit:

| Surface | W38 access |
|---|---|
| `Configurator.vue` / `ConfiguratorLayer.vue` / `ConfiguratorRow.vue` | modify-carve (the restyle) |
| `demo/stories/substrates/aurora.vue` | class-alignment ONLY (no structural change) |
| `demo/stories/aurora/AuroraConfigDock.vue` | class-alignment ONLY ("the hand-authored DockLayerGroup chrome STAYS") |
| **`demo/stories/aurora/AuroraAtomsPanel.vue`** | **NOT LISTED — out of bounds** |
| **`demo/stories/aurora/config/*Layer.vue`** | **NOT LISTED — out of bounds** |

W38 §FileBounds "Do NOT touch" closes with "any other `src/components/` surface (bounded to the
configurator package + its demo consumer)." The atoms panel is reached only via the demo consumer
`AuroraConfigDock` (class-alignment), so the raw-element body is structurally untouched. **W38 as
written does NOT reauthor the raw `<select>`/`<input>` controls into LabeledField/Slider/Select
primitives** — which is the heart of D1.

W10 (COMPLETE) absorbed `AuroraAtomsPanel` as the live default but was FUNCTIONAL-ONLY by charter —
`AuroraConfigDock.vue:32`: "NO glass-atoms visual restyle — that is AX.W38; W10 is FUNCTIONAL wiring
only." So W10 deliberately deferred the visual restyle, and W38 deliberately bounds to the library
frame. **D1's biggest surface (the atoms-panel raw controls) sits in the seam between W10 and W38,
owned by neither.**

### Fix direction (augment W38)

Extend W38's FileBounds (or split a small sibling demo-chrome wave sequenced after W10) to reauthor
`AuroraAtomsPanel.vue` + the `config/*Layer.vue` raw controls onto the library primitive family:
raw `<select>` → `LabeledSelect`/`Select`; `<input type=range>` → `LabeledSlider`/`Slider`;
`<input type=color>` → a glass-tinted color control or `LabeledInput[type=color]`; bare
`<label class=grid>` → `LabeledField`. This is demo-internal (zero library-surface delta), composes
existing primitives (no new token/variant — stays inside the W38 no-overfitting bar), and is the
real D1 fix. Keep it sequenced AFTER W10 (functional wiring landed) and W09 (specular spine) per
the existing W38 dependency contract.

---

## D2 — "Where are the van-Gogh items?" (W38 NOT covered; W13→W10 seam orphan)

### Source state — van-Gogh EXISTS but is undiscoverable

Van-Gogh is present at HEAD in TWO places (W13 landed it at `24b7e52`, before the ledger capture):

1. **Default Atoms panel** — `AuroraAtomsPanel.vue:43-51` `MEDIA` array includes `"vangogh"` +
   `"oil-pastel"`, rendered as plain lowercase `<option>` text inside a raw `<select>` (`:156-163`),
   one-of-seven, no preview, no thumbnail, no label-casing, indistinguishable from `smooth`/`oil`.
2. **Advanced → Medium tab** — `config/options.ts:21` `mediumOptions` has `{ label: "Van Gogh",
   value: "vangogh" }` rendered as a `BouncyTabs` pill in `MediumLayer.vue:43-48` — but this is TWO
   navigations deep (switch Atoms→Advanced, then the Medium layer tab).

So the user — observing the DEFAULT surface — saw a raw `<select>` with a buried lowercase
`vangogh` entry and asked "Where are the van-Gogh items?" **D2 is a DISCOVERABILITY defect, not a
missing-feature defect.** The medium renders (W13 GREEN), but it is invisible as a *named, previewable
artistic medium* on the surface the user lands on.

### Wave-ownership seam (the orphan)

- **W13** authored the medium BODIES and explicitly routed the surfacing elsewhere
  (`AX.W13:288` — "the `deriveAurora` public surface (**W10/W11**), NOT this wave's").
- **W10** (COMPLETE) wired the atoms door FUNCTIONALLY but deferred all visual restyle to W38.
- **W38** bounds to the library `Configurator*.vue` frame and excludes `AuroraAtomsPanel.vue`.

**No wave currently owns making van-Gogh discoverable.** This is exactly the D2 dedup-anchor note
("W13 follow / configurator-redesign") — and neither the W13-follow nor the configurator-redesign
(W38) wave reaches it as scoped.

### Fix direction (fold into the D1 augment)

The D2 fix is a natural rider on the D1 atoms-panel reauthor: surface the medium as a
**previewable, properly-labelled affordance** — e.g. a `ToggleGroup`/`BouncyTabs` medium picker
(matching the Advanced tab's idiom) with proper Title-Case labels ("Van Gogh", "Oil Pastel") in the
DEFAULT atoms panel, optionally with a small swatch/thumbnail preview per medium (the
`usePresetThumbnails` pattern already exists for presets — `demo/stories/aurora/usePresetThumbnails.ts`).
Replacing the raw `<select>` with the same pill family the Advanced layer uses fixes D1 (idiomatic
primitive) AND D2 (van-Gogh is a visible, named pill) in one stroke — they are the SAME edit on the
SAME file. Do NOT mint a new primitive; compose `BouncyTabs`/`ToggleGroup` + the preset-thumbnail
pattern.

---

## D3 — BouncyTabs jarring motion (NOT this lane; W05 owns)

D3 (BouncyTabs egregious motion) is dedup-anchored to W05 (one iOS-spring vocabulary, COMPLETE) per
the ledger. It is adjacent to this lane only because `AuroraConfigDock`/`MediumLayer` consume
`BouncyTabs` — but the motion-smoothing fix is the BouncyTabs SPRING REGISTER, owned by the W05
spring vocabulary, not the aurora waves. **Out of this lane's scope; recorded for the BouncyTabs
lane.** No aurora-wave change needed for D3 (the aurora demo merely consumes the smoothed component
once W05's register is tuned).

---

## W14 — WebGPU painterly parity-or-excise (CLEAN, no convergence change)

W14 is well-formed and needs no augmentation. It is orthogonal to D1/D2/D3 (it concerns the WebGPU
RENDER path, not the configurator UI). Audit confirms:

- **Born-RED witnesses verified at HEAD-class state:** `painterly.wgsl.ts` + `wake.wgsl.ts` are dead
  exports (zero importers); `device.lost` is punted (`createGPUCanvas.ts:122-123` comment, no
  subscription); the WGSL `samplePalette` uses straight-OKLab `mix`, not the GLSL OKLCh arc. All
  three are real, falsifiable, source-cited.
- **RATIFY-BEFORE-IMPL default is sound:** Branch B (EXCISE) is the recommended + autonomous default
  (§4 note 14 + constellation finding 7) — delete the dead scaffold, re-scope WebGPU to a
  parity-floor single-pass opt-in, port `mixPaletteOklchArc` (single-source via spliced
  `OKLCH_MATRICES_WGSL`), subscribe `device.lost` → WebGL2 fallback. The disjointness contract vs
  W07/W11/W13 is tight and file-line-precise. The medium-parity-is-unmeetable premise (W13 ships
  mediums in GLSL only; the WGSL twin has no `uMedium` dispatch) is correct and load-bearing.
- **No overlap with the configurator defects.** W14's FileBounds are the aurora GPU runtime + WGSL
  shaders + `renderMode.ts` + DESIGN/README/CHANGELOG — disjoint from the demo configurator chrome.

W14 verdict: **audit-note, no change.** It does not touch D1/D2/D3 and should not be expanded to.

---

## Convergence summary

| Defect | Existing wave | Sufficient? | Disposition |
|---|---|---|---|
| D1 (configurator hand-rolled chrome) | W38 | PARTIAL — covers the library frame, NOT the `AuroraAtomsPanel.vue` raw `<select>`/`<input>` body | **augment W38** (or sibling demo-chrome wave) to reauthor the atoms panel + `config/*Layer.vue` raw controls onto LabeledField/Slider/Select/ToggleGroup |
| D2 (van-Gogh undiscoverable) | W13→W10 seam | NO — orphan; W13 punts to W10, W10 is functional-only, W38 excludes the panel | **fold into the D1 augment** — replace the raw medium `<select>` with a labelled previewable pill picker (Title-Case "Van Gogh"); same file, same edit as D1 |
| D3 (BouncyTabs jarring) | W05 | YES (out of this lane) | no aurora-wave change; W05 spring register owns it |
| W14 (WebGPU) | W14 | YES — sound as written | **audit-note, no change** |

### Dedupe note

The D1+D2 augment is ONE addition to W38's FileBounds, not a new wave: extend
`demo/stories/aurora/AuroraAtomsPanel.vue` (+ `config/*Layer.vue`) from "out of bounds" to
"modify — reauthor raw controls onto library primitives + surface van-Gogh as a labelled previewable
pill," sequenced AFTER W10 (functional wiring) and W09 (specular spine) exactly as W38 already
requires. This folds BOTH D1's biggest surface and all of D2 into the existing configurator-redesign
wave without minting a parallel wave — it is demo-internal, composes-only (no new token/variant/
primitive — inside W38's no-overfitting bar), and uses the same π-lane visual-truth close W38
already runs. If the orchestrator prefers a clean wave boundary, split it as a tiny W38b
"aurora-atoms-panel idiomatic reauthor + van-Gogh surfacing" sequenced immediately after W38 — but
do NOT leave the atoms panel orphaned between W10 and W38. W14 stays untouched.
