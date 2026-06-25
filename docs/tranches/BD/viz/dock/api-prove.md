# BD — Dock + Generative-Viz API PROOF (live)

**Branch** `prototype/liquid-dock` · **Verified** 2026-06-22 via chrome-devtools-mcp over the demo dev server (`npm run dev` → `http://localhost:5175`; the `:5199` canon default was not the served port this session, server bound `:5175`).
**Method** Per-route navigation (clean reload) → assert `<h1>`, live `<canvas>` count + acquired GPU context, `.glass-dock` instance count, configurator presence; console scanned for errors. Routes are `/:category/:story` (`demo/router.ts`). Subpath map is `demo/stories/manifest.ts` `SUBPATHS`.

**Headline result: every dock + viz subpath has a real demo consumer that RENDERS.** Every viz canvas acquires a **WebGPU** context live (probed in-page: `canvas.getContext('webgpu')` returns non-null on first probe across all 9 substrate routes). Only console output across the sweep is a benign `<Transition> non-element root` Vue warning (TooltipProvider) — **zero errors**.

> Rename note: the BD mandate renames `goo-blob → blob`. At HEAD the dir, subpath (`@mkbabb/glass-ui/goo-blob`), and component (`GooBlob`) are **unchanged**; the 4-state "emotional" mood system (`useBlobMood` → `BlobMood`) and the satellite system (`useBlobSatellites`) the mandate asks to expand **already exist** as the rebuild's foundation. The `<Blob>` seen in a Vue warning is the demo story's local wrapper, not the published export.

---

## A. Dock subpath — `@mkbabb/glass-ui/dock`

The hallmark. ONE `GlassDock` root; component family + composables below.

### Components (default exports)
`GlassDock` · `DockLayerGroup` · `DockLayer` · `DockIconButton` · `DockBackgroundToggle` (WCAG-2.2.2 pause/play) · `DockTabButton` · `DockSelectTrigger` · `DockDropdownTrigger` · `DockSeparator` · `DockStack` (the rail engine; `mode: "stack" | "facets"`) · `DockSection` (declarative tripartite chassis) · `DockGooFilter` (the SVG-goo metaball bridge).

### Composables + types
- `useLayerTransition` — axis-aware layer FLIP.
- `useDockState` family — `UseDockStateOptions`, `UseDockStateReturn`, `DockState`.
- `dockContext` seam — `DOCK_CONTEXT_KEY`, `useDockContext`, `useOptionalDockContext`, `provideDockContext`, `DockContext`, `DockOrientation`, `DockLayout`.
- `useDockOrientationMorph` — the V↔H driver on `--dock-morph-t` (`DockMorphOrientation`, `UseDockOrientationMorphOptions/Return`).
- `useDockCtaReceive` — external-CTA-morphs-into-dock receive seam (`UseDockCtaReceiveOptions/Return`, `DockCtaReceivePreset`).
- `useDockSearch` — the dock-IS-the-search-bar fuzzy pipeline (`UseDockSearchOptions/Return`).
- `useDockFission` — the dock-SPLITS-into-islands engine (`DOCK_SPLIT_SIGNATURES`, `DockSplitContext/Vector/SquishPeak/Signature`, `DockFissionPieceRegistration/Handle`, `UseDockFissionOptions/Return`).
- `DockStackItem`, `DockSectionDescriptor`, `DockSectionKind` (colocated in `constants.ts`).

### Proven by (live, all on `/dock/*`)
| Route | h1 | live evidence |
|---|---|---|
| `/dock/overview` | Overview | **12 `.glass-dock`** instances; canvases live | proves `GlassDock`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `DockBackgroundToggle`, `DockSeparator`, slider-keep-open |
| `/dock/liquid-playground` | Liquid Morph | **4 docks**, 5 canvases, WebGPU | proves the `useLiquidMorph` engine + `DockGooFilter` bridge + `DockStack mode="facets"` (horizontal + vertical) |
| `/dock/dock-gallery` | Dock Gallery | 3 docks render | proves the morph BREADTH (mini-player / Dynamic-Island / notification) |
| `/dock/layers` | Dock Layers | **7 docks** | proves `DockLayerGroup` + `DockLayer` drill-in, switcher rail, crossfade+FLIP |
| `/dock/rail` | Vertical Dock | **6 docks** | proves `orientation="vertical"` collapse/morph/shrink + anchored tooltips |
| `/dock/morph-showcase` | V↔H Morph | 3 docks | proves `useDockOrientationMorph` + the SVG-goo teardrop bridge on `--dock-morph-t` |
| `/dock/sections` | Dock Sections | 3 docks | proves `DockSection` + `DockSectionDescriptor[]` three-zone chassis |
| `/dock/cta-receive` | CTA → Dock Morph | 3 docks | proves `useDockCtaReceive` external-CTA receive seam |
| `/dock/dock-search` | Dock Search | 3 docks | proves `useDockSearch` (fuzzy + ghost-completion + scroll-to) |

---

## B. Generative-viz subpaths — the procedural suite

Each viz ships `<Component>` (default), a `use<Viz>` renderer composable (+ `Handle`/`Options` types), a `constants.ts` config block (`DEFAULT_*_CONFIG` + `WARM_IDENTITY_PALETTE` + `MAX_*` bounds), and a pure field/math leaf. All born WebGPU-first over `useGpuSubstrate` (WebGL2 fallback); `OklchStop` re-exported from `composables/color`.

| Subpath | Key exports | Proven by (live) |
|---|---|---|
| `@mkbabb/glass-ui/aurora` | `Aurora`; `useAurora` (`UseAuroraReturn`), `useCursorInteraction`, `createAurora`; `resolveRenderMode`/`isSoftwareWebGLRenderer` (`AuroraRenderMode`); presets (`DEFAULT_AURORA_CONFIG`, `MAX_NUCLEI/STOPS`, `AuroraConfig`, `AuroraMedium`, `WarpMode`, `FlowPattern`, `AuroraNucleus`…); atoms (`resolveAtoms`, `configToAtoms`, `nucleiPrior`, `AuroraAtoms`…); color (`cssToOklch`, `deriveAurora`, `oklchToLinear`…); `auroraFallbackGround`/`sampleAuroraField` | `/substrates/aurora` → h1 **Aurora**, live canvas, **WebGPU** |
| `@mkbabb/glass-ui/goo-blob` | `GooBlob`; `BLOB_CONFIG_DEFAULTS`, `BLOB_CONFIG_KEY`; `useBlobMood` (`BlobMoodSystem`, `BlobMood` — the 4-state system), `useBlobPointer`, `useBlobSatellites` (`BlobSatelliteSystem`), `useMetaballRenderer`; types `BlobConfig`, `BlobMerge`, `BlobVariant`, `BlobGeometry`, `BlobMembrane`, `BlobSurface`, `BlobInteraction`, `SatellitePhase`… | `/substrates/blob` → h1 **GooBlob**, canvases 874² + 692², **45 configurator** elements |
| `@mkbabb/glass-ui/fourier-field` | `FourierField`; `useFourierField` (`FourierFieldHandle`, `UseFourierFieldOptions`); math `comp`, `positionsAt`, `partialSumAt`, `dftFromPoints`, `makeEllipticSpectrum`; `DEFAULT_FOURIER_CONFIG`, `MAX_PHASORS/CURVE_SAMPLES` | `/substrates/fourier-field` → h1 **Fourier Field**, canvas 700×462 **WebGPU** (Canvas2D migrated) |
| `@mkbabb/glass-ui/constellation` | `Constellation`; field `seedField`/`stepField`/`refitField`/`buildEdges`/`appendPointerWeb`/`parallaxNodePos`; interaction `stepWell`/`warpStep`/`fireBurst`/`pickWanderTarget` + tuning consts; render `kVisOf`/`readPalette`/`parseColorRGBA`; `MAX_NODES/DEGREE` | `/substrates/constellation` → live canvas, **WebGPU** |
| `@mkbabb/glass-ui/concentric` | `Concentric`; `useConcentric` (`ConcentricHandle`); `ConcentricConfig`, `DEFAULT_CONCENTRIC_CONFIG`, `DEFAULT_RING_COMPONENTS`, `MAX_RINGS/CENTERS`; ring field `sampleRingField`, `ringIsolineInk`, `ellipsoidalRadius(Rot)`, `buildRingFamily`, `RING_GRAVITY` | `/substrates/concentric` → live canvas, **WebGPU** |
| `@mkbabb/glass-ui/dot-flow-field` | `DotFlowField`; `useDotFlowField` (`DotFlowFieldHandle`); `FlowFieldConfig`, `DEFAULT_FLOW_CONFIG`, `DEFAULT_WAVE_COMPONENTS`, `MAX_PARTICLES`; field `sampleVelocity`, `gerstnerVelocity`, `curlFBM`, `buildWaveLadder`, `sampleHeight/Displacement`, `FLOW_GRAVITY` | `/substrates/dot-flow-field` → live canvas, **WebGPU** |
| `@mkbabb/glass-ui/dot-matrix` | `DotMatrix`; `useDotMatrix` (`DotMatrixHandle`); `DotMatrixConfig`, `DotPointerMode`, `DEFAULT_DOT_MATRIX_CONFIG`, `MAX_DOTS`; field `fibonacciDot`, `facingFade`, `spinMatrix`, `breathRadius`, `GOLDEN_ANGLE` | `/substrates/dot-matrix` → live canvas, **WebGPU** |
| `@mkbabb/glass-ui/goo-dot-matrix` | `GooDotMatrix`; `useGooDotMatrix` (`GooDotMatrixHandle`); `GooDotConfig`, `GooDotVariant`, `GooDotPointerMode`, `DEFAULT_GOO_DOT_CONFIG`; lattice `gridOrigin`, `latticeInstanceCount`, `fibonacciDot` | `/substrates/goo-dot` → live canvas, **WebGPU** |
| `@mkbabb/glass-ui/paper-grid` | `PaperGrid`; `usePaperGrid` (`PaperGridHandle`); `PaperGridConfig`, `DEFAULT_PAPER_GRID_CONFIG`, `WARM_IDENTITY_INK`; field `potentialFBM`, `curlFBM`, `curlWarp`, `cursorBulge`, `gridCoverage`, `samplePaperGrid` | `/substrates/paper-grid` → live canvas, **WebGPU** |
| `@mkbabb/glass-ui/watercolor-dot` | `WatercolorDot` (CSS/SVG, not a GPU substrate); `mulberry32`, `hashString`, `randomRadii`, `radiiToCSS` | (CSS/SVG blob — not a canvas viz; renders inline) |

---

## C. Cross-cutting facts for the BD redevelopment

- **WebGPU is live for every canvas viz** — the BD "WebGPU/WebGL2 only, zero Canvas2D" mandate is already partly realized: `aurora`, `blob`, `fourier-field`, `constellation`, `concentric`, `dot-flow-field`, `dot-matrix`, `goo-dot`, `paper-grid` all acquire WebGPU on first probe. (fourier-field + constellation are confirmed off Canvas2D at HEAD.) The BD Canvas2D-purge targets named in the brief — `useCanvas2D` deletion, the aurora `getContext("2d")` raster ground (`auroraFallbackGround`) — are the remaining residue, not the live render path.
- **Each viz already ships a configurator + a pure field leaf** — the `DEFAULT_*_CONFIG` + `MAX_*` + `WARM_IDENTITY_PALETTE` shape is uniform; the BD "robust configurator + interactivity per viz" mandate extends an existing pattern (e.g. blob shows 45 configurator elements live).
- **`curlFBM` shared wave-math is already a 2-site export** (`dot-flow-field/flowField.ts` + `paper-grid/paperGrid.ts`) — the BD "SHARED wave-math across concentric + dot-matrix + paper-grid" mandate has a seed to generalize.
- **The blob 4-state mood + satellite system exist** (`useBlobMood`/`BlobMood`, `useBlobSatellites`/`BlobSatelliteSystem`) — the BD blob first-principles rebuild builds ON these, not from scratch.
