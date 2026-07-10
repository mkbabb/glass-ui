# ColorSwatch

## Artefact path

`src/components/custom/color-swatch/` (the published subpath `@mkbabb/glass-ui/color-swatch`).

## Verdict

`keep-current` — **user-directed wave (BA.W-CONFIG-CHASSIS), booked with a named
in-repo second consumer.** `<ColorSwatch>` is the first-class color-input register —
a proportioned chip swatch + hex affordance over the native `<input type="color">`
(the invisible accessible carrier), the replacement for the raw full-width
`<input type=color w-full>` slabs the configurator chrome used to hand-roll. The honest
component-orphan census (source files only, library publication machinery + demo
own-story excluded) measures it at exactly **1 real in-repo call-site** — below the
bare ≥2 bar, but a load-bearing published primitive with NAMED in-repo second/third
consumers booked (the blob Seed + the OKLCh stop rows still on raw
`<input type="color">`). Booked here per the evidence-doc escape.

## Consumer proof (re-runnable)

**Internal consumers — 1 (real). Only one file truly IMPORTS the component:**

```bash
# the import-path / subpath grep (NOT the `[&::-webkit-color-swatch]` CSS-class
# false-positive — those sites use a raw <input type="color">, not the component):
grep -rln 'components/custom/color-swatch|@mkbabb/glass-ui/color-swatch' demo/ src/ \
  | grep -v '/components/custom/color-swatch/' | grep -v 'src/subpaths/'
#   → demo/stories/substrates/aurora/sections/AuroraColorSection.vue
```

`demo/stories/substrates/aurora/sections/AuroraColorSection.vue` mounts `<ColorSwatch>` twice (the
aurora Seed input + the DERIVE seed) — two mounts in one file (the file is the unit
the census counts).

**The raw-input sites that are the booked re-point targets (NOT counted — they
reference the `[&::-webkit-color-swatch]` CSS pseudo, not the component import):**

```bash
grep -rln '\[&::-webkit-color-swatch\]' demo/ src/ | grep -v '/components/custom/color-swatch/'
#   → demo/stories/substrates/aurora/OklchStopRow.vue          (the per-stop OKLCh hex input)
#   → demo/stories/substrates/aurora/config/PaletteLayer.vue   (the palette stop input)
#   → src/components/custom/watercolor-dot/WatercolorDot.vue (the dot color hex input)
```

## The named ≥2-consumer TRIGGER

BA.W-CONFIG-CHASSIS named the blob Seed as the third `<ColorSwatch>` consumer; the
OKLCh stop rows (`OklchStopRow.vue` / `PaletteLayer.vue`) are the natural second
in-repo re-point (they still hand-roll the raw `<input type="color">` +
`[&::-webkit-color-swatch]` CSS the component supersedes). The binding close-criterion
is the SECOND file re-pointing its raw seed/stop input onto `<ColorSwatch>`:

```bash
grep -rln 'components/custom/color-swatch|@mkbabb/glass-ui/color-swatch' demo/ src/ \
  | grep -v '/components/custom/color-swatch/' | grep -v 'src/subpaths/'   # → ≥2 files
```

When that lands, record the call-site here; the component clears the ≥2-consumer bar on
its own and this evidence-doc escape is no longer load-bearing.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `color-swatch` while
the `AuroraColorSection.vue` mount stays present AND a second in-repo re-point is booked.
If the mount is removed with no second consumer arriving, the verdict returns to
`library-orphan` (formally retire the `/color-swatch` subpath + export).

**Re-audit date: 2026-09-01.** By then either (a) the blob Seed / OKLCh stop rows have
re-pointed onto `<ColorSwatch>` (record the call-site; the ≥2-consumer bar clears) OR
(b) the re-point has not landed → re-grade.

## Cross-references

- `demo/stories/substrates/aurora/sections/AuroraColorSection.vue` (consumer #1 — Seed + DERIVE).
- `demo/stories/substrates/aurora/OklchStopRow.vue` / `demo/stories/substrates/aurora/config/PaletteLayer.vue`
  (the booked re-point targets — still raw `<input type="color">`).
- `src/components/custom/color-swatch/ColorSwatch.vue` (the proportioned chip + hex affordance).
