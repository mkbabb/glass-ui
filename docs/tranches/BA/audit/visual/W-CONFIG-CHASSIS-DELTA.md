# BA.W-CONFIG-CHASSIS — DELTA (the configurator chassis made whole)

**Wave**: BA.W-CONFIG-CHASSIS (Batch 2) — the 0px-slider class dies at the chassis;
the gear folds onto the library anatomy.
**Captured**: 2026-06-13T00:28Z (own-surface π readback at `:5199`, chromium-headless-new,
BOTH modes, ≥2 viewports).
**Surface-hash** (sha256 of the concatenated surface files below): `0336b6dd893ca9a3c6f96a548188419d6b69b75ed6b208addfbeea8bdf515fbb`

**Surface-paths** (the files this wave touched, hashed in this order):

```
src/components/custom/configurator/ConfiguratorRow.vue
src/components/custom/labeled-field/LabeledField.vue
src/components/custom/configurator/Configurator.vue
src/components/custom/configurator/ConfiguratorLayer.vue
src/styles/configurator.css
src/styles/tokens/offsets-sizing.css
src/styles/tokens/dark-arm.css
src/components/custom/color-swatch/ColorSwatch.vue
src/components/custom/color-swatch/index.ts
src/subpaths/color-swatch.ts
demo/stories/aurora/sections/AuroraColorSection.vue
demo/configurator/PresetEditor.vue
demo/configurator/preset-editor/store.ts
demo/configurator/preset-editor/types.ts
demo/configurator/preset-editor/defaults.ts
demo/configurator/preset-editor/persistence.ts
demo/stories/aurora/usePresetThumbnails.ts
```

## The binding π readback (the captured truth)

`proof:config-chassis` proves the SOURCE (8/8 source witnesses GREEN); THIS readback
proves the painted RENDER — the WVR-2/3 source-green/visually-broken close-class BA
exists to fix (the AZ gates were headless + missed the 0-width slider render). The
binding spec is `tests-visual/config-chassis.spec.ts` — **8/8 π tests GREEN**.

| # | arm | measured (after) | before (HEAD) | verdict |
|---|---|---|---|---|
| W1 | a `<ConfiguratorRow>`-slotted slider on `/substrates/blob` paints non-zero width (desktop + 390px, both modes) | **954px** (desktop) | **0px** (the circular percentage-against-content-sized collapse) | the 0px-slider class DEAD |
| W4 | the DERIVE chip group's rightmost chip ≤ the aside content right edge | rightmost ≤ aside right | MONO sliced ~40px off the ~360px aside | no clip — the group WRAPS |
| W6 | the gear dark-row click FLIPS `html.dark` both directions, the control is the `<DarkModeToggle>` | flips OFF→ON→OFF; `.dark-mode-toggle-button` present | a desynced `<Switch v-model="darkModel">` NO-OP both directions | live flip |
| W5 | the gear section labels resolve the `--configurator-section-size` 20.4px rung | ≥18px (the `.configurator-section-label` rung) | 12px mono `<h3>` eyebrow (BELOW body) | the section reads as a section |
| W2 | the configurator dividers paint a visible luminance step on the DARK plate | dark `color(srgb 0.91 0.906 0.89 / 0.3)` — a light warm-ink hairline at 30% over the L16 plate; light `color(srgb 0.778 0.705 0.622 / 0.7)` | inline `border-border/40` — near-equal-luminance, vanished on dark | the dividers survive dark |
| PPD-1 | the Speedtest preview thumbnail mean-alpha ≥ 0.95 | **≥ 0.95** (the freezeCfg `alpha: 1` clamp) | **0.259** (the lone dim outlier — 0.26×aurora + 0.74×near-black) | vivid |

The dark divider correctly lifts to the light `--foreground` ink (luminance 0.91) over
the L16 dark plate (the dark-adaptive `light-dark()` arm working) — exactly the
"visible luminance step on the dark plate" the W-DARK-MATERIAL re-tuned plate demands.

## Captured frames

| frame | surface |
|---|---|
| `W-CONFIG-CHASSIS-blob-slider-light-desktop.png` | the blob studio sliders at full row width (light, 1280) |
| `W-CONFIG-CHASSIS-blob-slider-dark-desktop.png` | the blob studio sliders at full row width (dark, 1280) |
| `W-CONFIG-CHASSIS-blob-slider-light-mobile.png` | the blob studio sliders at 390px (light) |
| `W-CONFIG-CHASSIS-blob-slider-dark-mobile.png` | the blob studio sliders at 390px (dark) |
| `W-CONFIG-CHASSIS-aurora-derive-chips-dark.png` | the aurora Color section — the Seed `<ColorSwatch>` + the wrapped DERIVE chip group (no MONO clip) |
| `W-CONFIG-CHASSIS-gear-sections-light.png` | the gear PresetEditor recomposed on `<ConfiguratorLayer>`/`<ConfiguratorRow>` (the 20.4px section rung; the live `<DarkModeToggle>` dark row) |
| `W-CONFIG-CHASSIS-gear-dividers-dark.png` | the gear dividers reading on the dark plate (the `--configurator-divider` token) |

Before-frames: the fleet RED baselines beside the lane reports under
`docs/tranches/BA/audit/fleet/` (`configurator-occlusion-*-dark.png`,
`goo-studio-sliders-collapsed-dark.png`, `darkmode-*-dark.png`,
`preset-preview-dim-dark.png`) + the R8 ground anchors (`ground/R8-04`/`R8-05`/`R8-07`).

## The seven scopes — what landed

1. **THE WIDTH CONTRACT (S1 / CFG-1).** `ConfiguratorRow.vue`'s control slot is a
   definite-width block context (`flex w-full min-w-0 items-center [&>*]:min-w-0
   [&>*]:w-full [&>*]:flex-1`) and `.labeled-field` claims `inline-size:100%;
   min-inline-size:0` (`utilities/base.css`). The percentage track now resolves
   against a definite width — 0px → 954px, library-wide, NOT per-consumer. The
   `hide-label` regression (the label was the only width contributor) is covered by
   the field's own width claim.
2. **The chip-overflow contract (CFG-2).** The DERIVE `<ToggleGroup>` is `flex flex-1
   flex-wrap` (each chip `basis-[calc(50%-0.25rem)]`) so the 4 harmony chips reflow to
   a second line rather than overflowing — MONO is never sliced. `AuroraConfigDock`'s
   `overflow-x-clip` stays as a defensive cross-axis guard (no content depends on it).
3. **The `<ColorSwatch>` register (CFG-3).** `src/components/custom/color-swatch/` — a
   proportioned chip swatch + hex affordance (the native `<input type=color>` is the
   invisible accessible carrier), subpath `/color-swatch`, ≥2 consumers (the aurora
   Seed + DERIVE seed). Replaces the raw full-width `<input type=color w-full>` slab.
4. **The `--configurator-divider-*` token, dark-adaptive (CFG-4).** Minted in
   `tokens/offsets-sizing.css` with a `light-dark()` arm (off `--border` on light,
   off `--foreground` on dark) + the `dark-arm.css` `.dark` fallback floor; consumed by
   the section + inter-row + chrome divider rules in `configurator.css`. NO inline
   `border-border/N` divider survives. The faint section tonal step
   (`--configurator-section-tint`) is the 3% foreground wash on dark.
5. **The gear RECOMPOSED on the chassis (CFG-5, clean break).** `PresetEditor.vue`
   composes `<ConfiguratorLayer>`/`<ConfiguratorRow>` — the sections read on the 20.4px
   `.configurator-section-label` rung (off the 12px mono `<h3>` eyebrow);
   `PresetEditorField.vue` DELETED (it was a byte-for-byte `ConfiguratorRow` clone).
6. **The dark row on the live `<DarkModeToggle>` (BA-DARK-F1+F2).** The Appearance row
   renders the canonical self-syncing `<DarkModeToggle>` bound to `useGlobalDark`; the
   `delta.dark` field + the `setField("dark")` branch + the `watch(isDark)` mirror are
   DELETED from `store.ts` (+ the `dark` baseline from `defaults.ts`, the `dark` member
   from `types.ts`, and the legacy persistence reads — the clean-break tail through the
   `preset-editor/` package). "Reset all" no longer flips the user's dark preference.
7. **The preset-alpha clamp (PPD-1).** `freezeCfg` (`usePresetThumbnails.ts`) sets
   `alpha: 1` in the capture canonicalization alongside the drift-zeroing — the preview
   shows the preset's COLOR, not its 0.26 deployment translucency. The `presets.ts`
   `alpha: 0.26` runtime baseline is UNTOUCHED (the legitimate live-substrate value).

## Coordination notes (worktree overlap, recorded — not mine to fix)

- **W-ATLAS-RECONCILE (Group-B sibling)** is rewriting `DarkModeToggle.vue` +
  `src/composables/dark/*` (the library dark-flip seam) in the working tree at capture.
  My gear-row binding to `useGlobalDark`/`<DarkModeToggle>` survives by construction (I
  consume only). The W6 π flip is delivered via a programmatic native click (the
  sibling's in-flight `isolate` + sun/moon pseudo-overlay confounds playwright's
  actionability hit-test); the genuine flip is confirmed.
- **W-GOO-REDRESS (Batch 2 ‖)** owns `blob.vue` + the goo renderer; the blob studio
  sliders are fixed by THIS wave's LIBRARY chassis edit (scope 1) without touching
  `blob.vue`. The blob Seed → `<ColorSwatch>` re-point is the swatch's 3rd consumer,
  in W-GOO-REDRESS's bound.
- The `/styles` cascade ships per-partial (`dist/styles/configurator.css`,
  `dist/styles/tokens/{offsets-sizing,dark-arm}.css`) — the divider token + rules
  verified present there (NOT in `dist/glass-ui.css`, which is the scoped-SFC bundle).
