# BD viz audit — configurator + interactivity state

Branch `prototype/liquid-dock`. Per-viz audit of (a) configurator robustness (does the
demo studio compose `<Configurator>`/`useConfiguratorState`, how many live controls,
presets) and (b) pointer/keyboard interactivity (is `usePointerVelocityField` wired and
CONSUMED, is it inert, is there keyboard control). The user mandate: EACH viz gets a
**robust configurator + full interactivity + birthdaycolor.com-like** play.

Method: read `src/components/custom/<viz>/` (component + composables + config interface)
and `demo/stories/substrates/<viz>.vue` (+ the aurora `demo/stories/aurora/` sub-tree).
Control counts are LIVE `ConfiguratorRow`/`LabeledSlider`/`Switch`/`OklchStopRow`/
`ColorSwatch` instances in the studio, NOT the config-interface field count (the
interface is the SURFACE the studio could expose; the gap is studio-vs-surface).

## The matrix

| # | viz | config-interface fields | studio configurator | live controls | presets | pointer (wired+consumed) | keyboard | birthdaycolor-like |
|---|-----|------------------------|---------------------|---------------|---------|--------------------------|----------|--------------------|
| 1 | **aurora** | ~35 (`AuroraConfig`) | **robust** — `useConfiguratorState<AuroraConfig>` `cloneMode:per-preset` + 5-layer `AuroraConfigDock` (Nuclei/Palette/Composition/Flow/Texture) | **~31 LabeledSliders + 4 OklchStopRows + ColorSwatch** | yes (PresetPickerRow, per-preset clones) | **full** — `usePointerVelocityField` ×3, `cursorModel.ts` + `useCursorInteraction.ts`, 7 field calls | **none** | partial (pointer swirl; no birthday-color play) |
| 2 | **goo-blob → blob** | ~18 (`BlobConfig`) | **robust** — `<Configurator>` ×21, 34 `ConfiguratorRow`, `useConfiguratorState` ×3 | **34 rows** (mood, satelliteCount, orbit/satellite radii, seed/harmony, merge) | yes (10 preset refs, weighted row) | **full** — `useBlobPointer.ts` + `usePointerVelocityField`, 8 field calls; `pointer.active`→`wake()` | **none** (`keyboard` token only in types.ts comment) | partial |
| 3 | **fourier-field** | ~26 (`FourierFieldConfig`) | **robust** — `<Configurator>` ×15, 21 `ConfiguratorRow`, `useConfiguratorState` ×2 | **21 rows** | yes (6 presets) | **pointer** — `usePointerVelocityField` ×2, 1 field call (thin consume) | **none** | partial |
| 4 | **constellation** | n/a (flat props: count/link/speed/parallax/…13 props) | **NONE** — gallery of ~9 STATIC demo panels, most `:pointer-reactive="false"`; ONE `<Switch>` toggles interactivity on the lead | **1 Switch** | none | **pointer** — `usePointerVelocityField` ×2 + `constellationInteraction.ts` + `constellationWell.ts`, 7 field calls (lead panel only) | **none** | no |
| 5 | **concentric** | ~26 (`ConcentricConfig`) | **robust** — `<Configurator>` ×16, 25 `ConfiguratorRow`, `reactive<ConcentricConfig>` (NO `useConfiguratorState` — hand-rolled reactive) | **25 rows** | yes (2 presets: WARM/THEME) | **pointer** — `usePointerVelocityField` ×2, 1 field call (thin consume) | **none** | partial |
| 6 | **dot-flow-field** | ~32 (`FlowFieldConfig`) | **thin** — 3 `<Switch>` (preset-toggle / interactive / paused) over a 32-field config that is passed WHOLE but NOT exposed | **3 Switches** | yes (2: WARM / MONO_REFERENCE) | **pointer** — `usePointerVelocityField` ×3, 2 field calls | **none** | no |
| 7 | **dot-matrix** | ~30 (`DotMatrixConfig`) | **thin** — 3 `<Switch>` over a 30-field config passed whole, not exposed | **3 Switches** | yes (2: WARM / REFERENCE) | **pointer** — `usePointerVelocityField` ×2, 1 field call | **none** | no |
| 8 | **goo-dot-matrix** | ~30 (`GooDotConfig`) | **thin** — 3 `<Switch>` over a 30-field config passed whole, not exposed | **3 Switches** | yes (2: WARM / REFERENCE) | **pointer** — `usePointerVelocityField` ×2, 7 field calls (richer consume) | **none** | no |
| 9 | **paper-grid** | ~32 (`PaperGridConfig`) | **robust** — `<Configurator>` ×20, 31 `ConfiguratorRow` | **31 rows** | thin (1 preset) | **pointer** — `usePointerVelocityField` ×4, 1 field call (thin consume) | **none** | partial |
| 10 | **watercolor-dot** | n/a (CSS/SVG swatch: color/variant/animate/seed) | **NONE** — no own studio; used only as a `<ColorSwatch>` inside `blob.vue` | 0 (not a procedural-canvas viz) | n/a | **none** — 0 `usePointerVelocityField`; `animate` is a seeded compositor wobble only | **none** | no |

## Tiering summary

- **Configurator robustness:** robust = aurora · blob · fourier-field · concentric · paper-grid (5). thin = dot-flow-field · dot-matrix · goo-dot-matrix (3, each a 3-Switch shell over a ~30-field config). none = constellation (static gallery) · watercolor-dot (CSS swatch, arguably out of scope).
- **Interactivity:** full pointer = aurora · blob. pointer-wired-but-THIN-consume (1 field call only) = fourier-field · concentric · dot-matrix · paper-grid. pointer-richer = goo-dot-matrix · constellation (lead only). none = watercolor-dot. **keyboard = ZERO across the entire suite.** **birthdaycolor-like play = nowhere** (aurora's pointer swirl is the closest, still partial).

## The gaps (work the BD expansion must close)

1. **Keyboard interactivity is absent suite-wide (10/10).** No viz reads `keydown`/`KeyboardEvent`. The mandate ("mouse/keyboard INTERACTIVITY") needs a shared keyboard seam — likely a `useVizKeyboard` reading arrow/±/space onto the same field `usePointerVelocityField` feeds (parity with the pointer push-API, PRM-safe).

2. **Three thin studios (dot-flow-field, dot-matrix, goo-dot-matrix) expose 3 Switches over ~30-field configs.** The config SURFACE already exists and is passed whole — they need the `VizStudio` + `<Configurator asideSide="right">` + per-axis `ConfiguratorRow` treatment the robust five carry (NOT a re-fork; compose `VizStudio`). Lowest-effort high-value lift.

3. **Constellation has NO configurator** — it is a 9-panel static gallery with flat props (count/link/speed/parallax/…), most panels `:pointer-reactive="false"`. Needs a real `ConstellationConfig` interface + a `VizStudio` studio (its props are already a config-shaped surface).

4. **birthdaycolor-like interactive play is nowhere.** None of the studios offer the click/drag-to-paint/seed-from-pointer generative play the mandate cites (aurora "likely supersedes it" per the brief — so aurora's pointer model is the reference to generalize, but it is still only a swirl, not generative seeding).

5. **Four robust studios consume pointer THINLY (1 field call):** fourier-field, concentric, dot-matrix, paper-grid wire `usePointerVelocityField` but call only 1 field method — likely position-only, no velocity/accel/flick-burst. The full velocity+accel+flick API (consumed richly by aurora/blob/goo-dot-matrix at 7-8 calls) is under-used. Audit each for the inert-pointer class.

6. **State idiom is split:** concentric hand-rolls `reactive<ConcentricConfig>` while aurora/blob/fourier-field use `useConfiguratorState`. The per-preset/commit-on-write semantics and reset path should be unified onto `useConfiguratorState` for the BD configurator-suite.

7. **blob mandate-deltas (FROM-FIRST-PRINCIPLES rebuild):** blob has 5 moods (idle/happy/curious/sleepy/excited vs the mandate's "FOUR emotional states") + satellites + a `merge` axis, but **NO multiple-blob-spawn** (`grep multiple/spawn/instances → 0`). The rebuild needs: cartoon-shadow on/off toggle, multi-blob organic interaction, and the mood model re-cut to the mandated 4.

8. **Canvas2D still present in 4 viz paths (the migration mandate):** `getContext("2d")` lives in `fourier-field/useFourierField.ts`, `constellation/constellationRender.ts`, `aurora/auroraFallbackGround.ts` (raster ground), `dot-flow-field/shaders/flow-field.glsl.ts` (WebGL2 fallback comment). Plus `useCanvas2D.ts` (to be DELETED) is imported by constellation + fourier-field. These configurator/interactivity rebuilds should land on the WebGPU/WebGL2-only substrate, not re-wire Canvas2D.
