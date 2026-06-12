# LANE: preset-preview-dim (R8-5)

The aurora preset preview cards render DIM/muted. User: "The speedtest preview item
should NOT be dim like this." Ground: `ground/R8-05-speedtest-preview-dim.png`.

## Verdict — ROOT-CAUSED, mechanical, single-card

The dimming is NOT a render-path bug, a recession/opacity-envelope leak, or a
constellation-alpha class. It is a **per-preset `alpha` value baking into a
semi-transparent thumbnail that then composites over the opaque near-black
`bg-card`** in dark mode. ONE preset is affected: **Speedtest**. The other 12
preset cards are vivid (`alpha: 1.0`). The defect is real but narrow.

## The mechanism (file:line)

1. **The Speedtest preset alone overrides alpha to 0.26.**
   `demo/stories/aurora/presets.ts:450` — `alpha: 0.26` (the only `alpha:`
   override in the file; the lib default is `DEFAULT_AURORA_CONFIG.alpha = 1.0`
   at `src/components/custom/aurora/constants/presets.ts:282`). The authoring
   comment (`presets.ts:394-398`) is explicit: speedtest's live config has a
   "reactive light/dark + idle/running alpha fork" that "stays in the speedtest
   repo," and the preset "ships the static `alpha: 0.26` baseline."

2. **The aurora fragment multiplies BOTH color and output-alpha by `uAlpha`.**
   `src/components/custom/aurora/constants/shaders/aurora.frag.ts:403` —
   `fragColor = vec4(col * uAlpha, uAlpha);`. With `uAlpha = cfg.alpha = 0.26`
   (`src/components/custom/aurora/composables/uniformBridge.ts:299` —
   `gl.uniform1f(U.uAlpha, cfg.alpha)`), the painted fragment is 26% opaque.

3. **The thumbnail bakes onto a TRANSPARENT clear, preserving that 26% alpha.**
   `src/components/custom/aurora/composables/runtime.ts:169-170` set the capture
   context `alpha: true, premultipliedAlpha: true`; line 230 `gl.clearColor(0,0,0,0)`
   clears to transparent. `usePresetThumbnails.ts:74` then
   `shared.toDataURL("image/webp", 0.85)` captures the buffer — so the data-URL
   webp carries a real 26% alpha channel (not a flattened-onto-black image).

4. **The `<img>` composites that 26%-alpha thumbnail over the opaque card.**
   `PresetPickerRow.vue:99` — the card is `bg-card`; in dark mode that resolves
   to `rgb(28, 25, 23)` (near-black warm ink, measured live). The thumbnail
   (`PresetPickerRow.vue:119-125`, `object-cover` over the well) lets 74% of that
   near-black card show through → the dim/muted read.

## Live proof (`:5199`, dark mode, in-situ pixel readback)

Sampled every baked thumbnail `<img>` to a transparent canvas and measured mean
alpha. **Speedtest is the lone outlier**:

| preset | mean alpha |
|---|---|
| Sky, Dawn, Meadow, Deliberative, Day 9, Oil Impasto, Oil Gestural, Van Gogh, Oil Pastel Sunset/Rainbow/Ocean, Crayon | **1.000** |
| **Speedtest** | **0.259** |

Card `bg-card` (dark) measured `rgb(28, 25, 23)`. So Speedtest paints 0.26 ×
aurora + 0.74 × near-black → exactly the dim composite. Evidence-PNG (the blob
substrate the SPA router landed on, confirming the blob studio uses CHIP presets
with NO thumbnail, so this defect cannot recur there): `fleet/preset-preview-dim-dark.png`.

## Survey — is the dimming anywhere else?

- **Aurora preset strip** (`PresetPickerRow.vue`, mounted in
  `demo/stories/substrates/aurora.vue:114`): the ONLY thumbnail-bearing preview
  strip. Only Speedtest dims.
- **Blob "moods"** (`demo/stories/substrates/blob.vue`): uses the library
  `Configurator` preset row (Calm/Excited/Shy CHIPS, no baked thumbnail) —
  immune to the alpha-over-card composite. No dimming.
- No other thumbnail/preview strip exists in the demo. Single-card defect.

## Why the live stage is FINE but the preview is DIM (the design crux)

The live `<AuroraStage>` (`aurora.vue:143`) renders the SAME `studio.config`
(with `alpha: 0.26` for Speedtest) but sits over the page's OWN live aurora hero
backdrop (manifest `background: "aurora"`). The 26%-alpha aurora reads correctly
because a vivid substrate shows through. The PREVIEW has no such substrate — it
composites over opaque `bg-card`. **`alpha` is a substrate-relative property; a
preview thumbnail has no live substrate, so a sub-1 alpha cannot read as
intended.** This is also why the dim is far worse in dark mode (near-black card)
than light (cream card would read closer to the intended tone).

## Design diagnosis + gestalt remedy DIRECTION

The preview is a SWATCH — it must show the preset's COLOR, not its compositing
alpha. The intent (R8-5, and the broader R8 "previews read VIVID"): a preset card
is a vivid, opaque chip of the palette, independent of the per-consumer alpha the
preset happens to ship for its own live substrate. The fix direction is to
**decouple the swatch's opacity from the preset's deployment alpha** — bake the
thumbnail at full opacity regardless of the preset's `alpha`, since the swatch's
job is to communicate hue/composition, not the runtime translucency. Mechanically
that is a one-line clamp at the bake seam (force `alpha: 1` in `freezeCfg`, the
same place `usePresetThumbnails.ts:17-28` already neutralizes the drift channels
for a deterministic capture — drift is zeroed there for the SAME reason: capture
wants the canonical, not the deployment-time, config). Alternatively bake onto an
opaque neutral backing rather than transparent, but the alpha-clamp is the
cleaner, idiom-matching move (the freeze already canonicalizes the capture config;
alpha belongs in that canonicalization). NOTE this is demo-private (the preset +
the thumbnail composable both live under `demo/stories/aurora/`); the library
aurora itself is correct — `alpha` is a legitimate runtime knob.

## Severity

S2 — a visibly-broken, user-flagged preview, but scoped to one preset card on a
demo-private surface; the library aurora is sound and no other surface is affected.
