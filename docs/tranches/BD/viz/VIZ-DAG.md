> **⚠ SUPERSEDED by the union `EXECUTION-DAG.md` enrollment — the V-tiers now live in the ONE union DAG; this parallel doc is retired.** This file is the pre-critique draft (it still carries the CUT/changed waves — `W-DOCK-WIRE`, `W-VIZ-INTERACTION-SPINE`, `W-EMOTION-PRIMITIVE`-as-suite-primitive, `W-REFLECT-ALL`). The canonical V-roster is `VIZ-FINAL-ROSTER.md`; the canonical DAG is `../union/EXECUTION-DAG.md` once the V-bands (11-15) enroll. Do not author from this file.

# BD viz/glass/dock expansion — the unified DAG (folds into the converged BD union)

The ~73-wave unified tranche = the converged **BD union** (61 waves: 40 still-valid + 20 needs-revision + 1 superseded) **+ the V-expansion** (~12 net-new, spec'd in `VIZ-BAND-PLAN.md` + `fleet2/`). Tiered topo order; acyclic; one terminal close gates the whole. NO legacy; the precept-inversions are deliberate decision-flips (recorded in `fleet2/deferred-chronic-fold.md` §A).

## How the V-expansion folds into the union
- **The BD union T0-T10 spine stays** (dock/tab/glass/aurora/Safari). 20 union waves get their SPEC AMENDED (not re-sequenced) — the iOS-27 token-deltas fold into `W-GLASS-EVERY-ELEMENT`/`W-SQUIRCLE`/`W-DESHADCN-SWEEP`; the frame-matched transition envelopes into `W-TABS-LIQUID`/`W-DOCK-NOWPLAYING-PILL`/`W-MAPS-CARD`/`W-AUR-ALBUM`; the dock GAP-4/5/7 into `W-DOCK-CONSTELLATION`/`W-DEEP-GLASS-WIRE`/`W-ICON-PRESENCE`.
- **1 SUPERSEDED:** `W-VIZ-TAILS`' `W-VIZ-FALLBACK-RETIRE-WATCH` arm RETIRES (the GPU-only inversion); the parity tails survive (the `.wgsl`↔`.glsl` twins are two GPU backends).
- **The V-waves INSERT** as new tiers between the union's breadth band (T9) and the close (T10): the whole ~73-wave set closes against ONE terminal `W-REFLECT-ALL` + the user-gated `W-CUT`.

## The V-expansion tier order (VT0 → VT4)

**VT0 — GPU-ONLY SPINE + shared engine (FOUNDATION, first; substrate, runs parallel with the union's consolidate band):**
- `W-GPU-ONLY-SPINE` (the dual-GPU-backend selector — `selectGpuBackend()` probe→pick→create, ~120 LOC evaporate; purge Canvas2D/swraster; precept-inversion) — **none-inbound, the keystone**
- `W-LENS-RASTER-PURGE` (`useGlassRenderer` Snell-bake → `.glass-lens` crossed-CSS-gradient) ← W-GPU-ONLY-SPINE
- `W-FIELD-ENGINE` (the shared `field/` chunk: WAVE_BASIS·CURL_FLOW·GERSTNER_WAVE·DOMAIN_WARP + the `waveFieldMath.ts` JS oracle; `proof:wave-field-single`) ← W-GPU-ONLY-SPINE
- `W-VIZ-PERF-BUDGET` (context-cap/compute-vs-fragment/DPR; `proof:viz-perf-budget`) ← W-GPU-ONLY-SPINE

**VT1 — FRAMEWORKS (reusable primitives, after VT0):**
- `W-EMOTION-PRIMITIVE` (`useEmotionalState` 4-circumplex; hoist `useBlobMood`; `proof:emotional-state`) — none-inbound (vue-only)
- `W-LAVA-FIELD` (`useLavaField` procedural-smin N-core; `proof:lava-field`) ← W-EMOTION-PRIMITIVE
- `W-VIZ-KEYBOARD` (`useVizKeyboard` over `/keyboard`, the zero-keyboard suite gap) — none-inbound
- `W-VIZ-INTERACTION-SPINE` (`useVizInteraction` facade: pointer + keyboard + the 6 primitives) ← W-VIZ-KEYBOARD
- `W-VIZ-CONFIGURATOR` (`<VizStudio>` schema-driven chassis; the 4 universal groups; `proof:viz-configurator`) ← W-EMOTION-PRIMITIVE + W-VIZ-KEYBOARD

**VT2 — per-viz REDEVELOPMENTS (consume VT0+VT1):**
- `W-BLOB-REDEVELOP` (rename goo-blob→blob · N-core multi-blob · 4 states · cartoon-shadow toggle · keyboard · LIFT the GOO-REDRESS cage + re-baseline proof:blob-page/render · the `:liquid` Snell-over-aurora) ← W-LAVA-FIELD + W-EMOTION-PRIMITIVE + W-VIZ-INTERACTION-SPINE
- `W-DOT-UNIFY` (the 3 dot vizzes → ONE `<DotMatrix>` projection×target) ← W-GPU-ONLY-SPINE; → `W-DOT-IMAGE` (target-coverage T(uv,t) + washPhase front; `proof:dot-image`) ← W-DOT-UNIFY + W-FIELD-ENGINE
- `W-CONCENTRIC-LEVELSET` (level-sets of curl-warped fbm terrain; KEEP IQ contourInk) ← W-FIELD-ENGINE
- `W-PAPERGRID-WARP` (structured multi-scale warp, CV<0.15) ← W-FIELD-ENGINE
- `W-AUR-METAL` (medium:"metal" uMedium 10 + "metal-gradient" uMedium 11; `proof:aur-metal`) ← W-GPU-ONLY-SPINE (+ the BD WGSL-medium baseline)
- `W-AUR-INTERACT` · `W-FOURIER-INTERACT` (draw-your-own-path) · `W-CONSTELLATION-STUDIO` (config + click-to-warp (node-conserving engine — Pass-D: a real add-node path needs an engine extension, DECIDE)) — each ← W-VIZ-INTERACTION-SPINE + W-VIZ-CONFIGURATOR

**VT3 — DOCK HALLMARK + iOS-27 GLASS:**
- `W-DOCK-WIRE` (compose engines INTO GlassDock · export the STRANDED `useDockContextSilhouette` · mint `useDockLink`) — **the hallmark PREREQUISITE** ← the union dock band
- `W-DOCK-CONTENT-FIELD` (live album-art field) ← W-DOCK-WIRE + W-AUR-ALBUM(union) ; `W-DOCK-SEARCH-FIELD` (fold the 4th `search` descriptor into W-SILHOUETTE-REALIZE) ← W-DOCK-WIRE
- `W-DOCK-SEQUENCE` (the one-organism nav→media→split→subdock→minimize→search continuous read; the hero capture) ← W-DOCK-WIRE + W-DOCK-CONTENT-FIELD + W-DOCK-SEARCH-FIELD
- `W-GLASS-IOS27` (the directional-rim re-point + the D1-D5 token-deltas + the shadcn-residue abrogation; D6) ← amends the union glass band ; `W-GLASS-IOS27-CONTROLS` (`.glass-control-track` + destructive→colored-glass) ← W-GLASS-IOS27
- `W-CARD-SHEET-EXPAND` (`useLiquidMorph.expand` + `--maps-backdrop-dim`; on `<Drawer>`/`useDrawerSnap`) ← amends union W-MAPS-CARD

**VT4 — NOVEL (opt-in / DEFER-with-trigger):**
- the 2 reusable helpers (ping-pong FBO multi-pass [the booked aurora-Kuwahara home] + compute-neighbor-query) + the top novel viz (reaction-diffusion · caustics · fluid-ink · voronoi-flow · chladni) — each ≥2-consumer-gated or booked.

**VT-CLOSE (terminal, gates the whole ~73-wave set):**
- `W-REFLECT-ALL` (flip EVERY gestalt row — union + V-expansion — on fresh live `:5199` both-mode chromium+webkit captures; the paint-first close) ← all
- `W-CUT` (USER-gated publish + slides redeploy; NEVER autonomous) ← W-REFLECT-ALL

## Acyclicity + the binding fences
- Zero back-edges: VT0 (substrate) → VT1 (frameworks) → VT2 (per-viz) → VT3 (dock/glass) → VT-CLOSE. The cross-tier consumes are all forward (W-DOT-IMAGE←W-FIELD-ENGINE, W-DOCK-CONTENT-FIELD←W-AUR-ALBUM, W-DOCK-SEQUENCE←its 3 deps).
- The 6 precept-inversions are recorded decision-flips (no silent re-open).
- Every painting V-wave closes against its OWN fresh π (no "rides W-REFLECT" deferral — the BB-disease law; the ~8-10 strings re-scoped per the deferred-fold §).
- Safari-first absolute (the WebGL2 backend + goo=regular-filter+sRGB); compositor-only; ≥2-consumer; presets-in-consumers; foreign-tree fence; D6 (abrogate shadcn-styling, never the glass).

## Count
~73 waves = 61 union (40 valid + 20 amended + 1 superseded-arm) + ~12 net-new V-waves (GPU-ONLY-SPINE · LENS-RASTER-PURGE · FIELD-ENGINE · VIZ-PERF-BUDGET · EMOTION-PRIMITIVE · LAVA-FIELD · VIZ-KEYBOARD · VIZ-INTERACTION-SPINE · VIZ-CONFIGURATOR · BLOB-REDEVELOP · DOT-UNIFY · DOT-IMAGE · CONCENTRIC-LEVELSET · PAPERGRID-WARP · AUR-METAL · AUR/FOURIER/CONSTELLATION-INTERACT · DOCK-WIRE · DOCK-ALBUM-STAGE · DOCK-SEARCH-FIELD · DOCK-SEQUENCE · GLASS-IOS27(+CONTROLS) · MAPS-CARD-EXPAND) — the band-plan lists ~24 V-rows, of which ~12 are net-new and ~12 amend existing union waves. The exact enrolled count is set when the critique-fleet confirms the fold + the DAG locks.
