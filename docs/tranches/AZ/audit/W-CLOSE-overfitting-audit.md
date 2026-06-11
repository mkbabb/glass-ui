# AZ.W-CLOSE — Overfitting audit (the `proof:az-final` clause-7 read)

**Branch:** `tranche/AY` @ `4a13bee4` (the full AZ build landed) · **Date:** 2026-06-11 ·
**Protocol:** `docs/audits/overfitting-audit.md` (verbatim) · **Disposition:** READ-ONLY (no source edits, no git).

## Scope + method

The audited surface is the **AZ-MINTED `src/` delta** — the net-new and net-changed library
artefacts in the AZ tranche window. Enumeration is the union of (a) `git log --since=2026-06-09
--diff-filter=A --name-only -- 'src/**'` (net-new files), (b) the named artefacts the close brief
flags (DockRail/DockRailItem, useDockOrientationMorph, useLiquidFlex, useGlassBackdropLuminance,
coalesceMetric, the restored header-ribbon/glass-panel, createStrictContext/createOptionalContext,
the prng leaf), and (c) the AZ PROGRESS wave board. `demo/` is **exempt** (demo-private by the
audit's own §3 `demo-only-private` rule) — but a demo-only HELPER minted under `src/` is NOT
exempt and is audited as a library artefact. CSS partials born of the **W-CARVE @import split** are
reorganizations, not net-new abstractions: their bar is "wired into the thin `@import` root in
cascade order," not "≥2 class consumers."

For every AZ-minted `src/` artefact the bar is: **≥2 distinct consumer sites** OR
**exported on a published subpath** (the `package.json` `exports` + `typesVersions` contract — a
published seat with named consumer/evidence) OR **a formal retire/disposition**. Every site count
below is a re-runnable `rg`/`ls`/`git` invocation cited in the row.

A recurring AZ idiom that the audit's strict `inline-and-remove` precedence must read correctly:
the **W-COLOCATE convention** (CLAUDE.md "FEATURE-DIR COLOCATION", machine-locked by
`proof:colocation`) MANDATES that a complex component decompose its orchestrator into named
composables under `composables/`, constants into `constants.ts`, shaders into `shaders/`. These
single-host extractions are NOT anonymous helper-shaped abstractions — they are the documented,
gate-enforced architecture (the established `useDockState`/`useDockHold`/`useMetaballRenderer`
precedent). A single-binary-consumer colocation file is `keep` by the convention, not
`inline-and-remove`.

## Census table

| artefact | kind | def-site | in-published-surface | sites (src · demo) | verdict | rationale (rg / ls / git invocation) |
|---|---|---|---|---|---|---|
| `coalesceMetric` + `METRIC_PLACEHOLDER` + `MetricValue`/`MetricValueProps` | util fn/const/type | `src/utils/coalesceMetric.ts` | yes — `utils/index.ts` + `/api` discovery | 5 src · 0 | **keep** | `rg -l coalesceMetric src/` → MetricBadge.vue, MetricCell.vue, MetricRow.vue, AnimatedDigit.vue, MetricPill.vue + `utils/index.ts`; W-METRIC-UNIFY ONE empty-check core, all four `Metric*` families consume it |
| `useLiquidFlex` + `LiquidFlexAxis`/`UseLiquidFlexParams`/`UseLiquidFlexReturn` | composable/types | `src/composables/motion/useLiquidFlex.ts` | yes — root barrel `src/index.ts` + `/motion-core` (`core/index.ts`) | 2 src · 0 | **keep** | `rg "import.*useLiquidFlex" src/` → `useTabIndicator.ts` + `useDockOrientationMorph.ts` (the M4 ≥2-consumer bar: the tab-indicator squish + the dock orientation morph) |
| `useDockOrientationMorph` + `DockMorphOrientation`/`UseDockOrientationMorph*` | composable/types | `src/components/custom/dock/composables/useDockOrientationMorph.ts` | yes — `/dock` subpath (`dock/index.ts` + `composables/index.ts`) | 1 src · 1 demo | **keep** | `rg -l useDockOrientationMorph` → exported `/dock`, consumed `demo/stories/dock/morph-showcase.vue`; consumer #1 of useLiquidFlex (W-MORPH-SHOWCASE) |
| `DockRail` (component) | Vue SFC | `src/components/custom/dock/DockRail.vue` | yes — `/dock` subpath | 1 src (GlassDock `#rail`) · 3 demo | **keep** | `rg -l DockRail src/ demo/` → BottomDock.vue, SidebarDock.vue, dock/rail.vue + GlassDock host; W-RAIL-EXTEND/W-RAIL3 net-new facility, ≥2 demo consumers |
| `DockRailItem` (chip descriptor) | interface | `src/components/custom/dock/constants.ts` | yes — `/dock` (`export type { DockRailItem }`) | 1 src · 0 | **keep** | `rg DockRailItem src/components/custom/dock/` → DockRail.vue consumes + re-exported `dock/index.ts`; the W-RAIL3 clean-break replacement for the dead `entries` prop |
| `useGlassBackdropLuminance` + `GlassBackdropBucket`/`UseGlassBackdropLuminance*` | composable/types | `src/composables/glass/useGlassBackdropLuminance.ts` | **no** (DEMO-PRIVATE by design — NOT on glass barrel) | 1 src (GlassDock) · 1 demo | **keep-current (demo-private, path B)** | `rg useGlassBackdropLuminance src/composables/glass/index.ts` → EMPTY (off barrel); binary consumer #1 = `GlassDock.vue` (default-ON, H3-a); evidence doc `docs/consumer-evidence/use-glass-backdrop-luminance.md` names the booked 2nd-binary promotion trigger (verified present + current) |
| `createStrictContext` / `createOptionalContext` | DI factory fns | `src/composables/context/createContext.ts` | internal (context barrel) | 7+ src · 0 | **keep** | `rg -l "createStrictContext\|createOptionalContext" src/` → dockContext, dockLayerContext, dockMorphContext, toggleGroupContext, sortable-list/context, configurator/density (AV.W14 — not AZ-minted, AZ-verified clean) |
| `src/utils/prng.ts` (`mulberry32`/`hashString`) | seeded-prng leaf | `src/utils/prng.ts` | internal single-source | 4 src · 0 | **keep** | `rg -l "from.*utils/prng" src/` → constellation, watercolor-dot (re-export shim), fourier-field, goo-blob satellites (AV.W14 leaf; AZ-era consumers constellation+fourier grew it) |
| `HeaderRibbon` + `HeaderRibbonPosition`/`HeaderRibbonProps` | Vue SFC + types | `src/components/custom/header-ribbon/` | yes — `/header-ribbon` subpath (exports + typesVersions) + `/api` | 0 src · 1 demo · 1 ext | **keep-current (RESTORED)** | `rg '"./header-ribbon"' package.json` GREEN; evidence doc cites live external binary consumer keyframes.js `EditorShell.vue`; W-PRUNE2 RESTORE (census missed the keyframes consumer) |
| `GlassPanel` (+ index) | Vue SFC | `src/components/custom/glass-panel/` | yes — `/glass-panel` subpath + `/api` | 0 src · 1 demo · 1 ext | **keep-current (RESTORED)** | `rg '"./glass-panel"' package.json` GREEN; evidence doc cites keyframes.js `EasingCurveCanvas.vue`; W-PRUNE2 RESTORE; renderer-tier cascade is its differentiator from `<Card>` |
| `useGlassRenderer`/`createGlassFilter`/`destroyGlassFilter` cluster | composable cluster | `src/composables/glass/useGlassRenderer.ts` | **no** (GlassPanel-internal, NOT barrelled — E4-3 retire held) | 1 src (GlassPanel) · 0 | **keep-current** | `rg useGlassRenderer src/composables/glass/index.ts` → comment only, not re-exported; restored as GlassPanel's component-local renderer dependency (relative import) |
| `GlassUnderline` + `GlassUnderlineClock/Variant/Paths/Props/Expose` | Vue SFC + types | `src/components/custom/underline/` | yes — `/underline` subpath + `/api` | 0 src · 2 demo | **keep** | `rg '"./underline"' package.json` GREEN; `demo/stories/motion/underline.vue` + manifest; types on `/api` discovery |
| `useDockClickIntegrity` | composable | `src/components/custom/dock/composables/useDockClickIntegrity.ts` | no (GlassDock-internal colocation) | 1 src (GlassDock) · 0 | **keep** (W-COLOCATE) | `rg -l useDockClickIntegrity src/` → GlassDock.vue + constants; R5-TAP iOS one-tap integrity; named colocation extraction (mirrors useDockState precedent) |
| `useDockMorphWindow` + `DockMorphWindow` | composable/type | `src/components/custom/dock/composables/useDockMorphWindow.ts` | no (GlassDock-internal colocation) | 1 src (GlassDock) · 0 | **keep** (W-COLOCATE) | `rg -l useDockMorphWindow src/` → GlassDock.vue + constants; the morph-settle timing window extraction |
| `useDockShellProps` + `DockProps`/`DockShellProps`/`DockDensity` | composable/types | `src/components/custom/dock/composables/useDockShellProps.ts` | no (GlassDock-internal colocation) | 1 src (GlassDock) · 0 | **keep** (W-COLOCATE) | `rg "useDockShellProps\|DockProps" GlassDock.vue` → `defineProps<DockProps>()` + the W-DOCK-TAXONOMY ONE-shape prop contract |
| `src/components/custom/dock/constants.ts` (`DOCK_SPRING`, `HOVER_INTENT_MS`, `EDGE_BAND_PX`, `MORPH_SETTLE_MS`, `RESIZE_MORPH_PROPS`, the `*_LABEL`s) | colocation constants | `src/components/custom/dock/constants.ts` | partial (`DockRailItem` on `/dock`) | 10 src · 0 | **keep** (W-COLOCATE) | `rg -l "from.*dock/constants" src/components/custom/dock/` → 10 dock-cluster files; the W-COLOCATE + W-DOCK-FLICKER hysteresis-tuning home (c62fdb68) |
| `src/components/custom/tabs/constants.ts` | colocation constants | `src/components/custom/tabs/constants.ts` | no (tabs-internal) | 1 src (`useTabIndicator`) · 0 | **keep** (W-COLOCATE) | `rg -l "from.*\"\./constants\"" src/components/custom/tabs/` → useTabIndicator.ts; the SegmentedTabs squish-stretch constants |
| `MOTION_CURVES`/`MOTION_CURVES_CANONICAL`/`motionCurve` + `MotionCurve`/`MotionCurveKind`/`CurveFn` | const/fn/types | `src/composables/motion/curves.ts` | yes — `/motion-curves` subpath + `/api` | 1 src · 2 demo | **keep** | `rg -l "from.*motion/curves" src/ demo/` → `/motion-curves` barrel + BezierEditor.vue + curve-families.ts; the W-MOTION2 keyframes-isomorphic canon |
| `SPRING_PRESETS`/`springPreset` + `SpringPresetRow`/`SpringPresetName` | const/fn/types | `src/composables/motion/springPresets.ts` | yes — `/motion-curves` + `/api` | 3 src · 2 demo | **keep** | `rg -l SPRING_PRESETS src/ demo/` → motion barrel, curves.ts, useSpringMount.ts + springs.vue, curve-families.ts; the spring-fork-KILL consolidation |
| `src/composables/motion/suite.ts` | re-export hub | `src/composables/motion/suite.ts` | yes — `/api` + motion barrel | 2 src · 0 | **keep** | `rg -l "from.*motion/suite\|\"\./suite\"" src/` → motion `index.ts` + `/api`; W-MOTION-SUITE aggregation |
| `useSpringMount` (re-pointed) | composable | `src/composables/motion/useSpringMount.ts` | yes — motion barrel | ≥2 src · — | **keep** | pre-existing public composable, AZ re-pointed onto SPRING_PRESETS (not net-new) |
| `fourier-field/presets.ts` | colocation presets | `src/components/custom/fourier-field/presets.ts` | yes — FourierField on `/fourier-field` + `/fourier-math` | 1 src (FourierField) · 0 | **keep** (W-COLOCATE) | `rg -l "from.*fourier-field/presets" src/` → FourierField.vue; the field on a published subpath |
| `fourier-field/math.ts` (`/fourier-math` target) | math leaf | `src/components/custom/fourier-field/math.ts` | yes — `/fourier-math` subpath | — | **keep** | `src/subpaths/fourier-math.ts` → `../components/custom/fourier-field/math`; published seat |
| constellation colocation: `createConstellationField`, `useConstellationPointer`, `constellationDraw`, `constellationInteraction`, `constants.ts`, `constellationField.ts` | composables/leaves | `src/components/custom/constellation/**` | yes — Constellation on `/constellation` subpath | 1–N src each · 0 | **keep** (W-COLOCATE) | `rg -l <sym> src/components/custom/constellation/` → consumed by Constellation.vue + cross-imports; the field is a published-subpath component, these are its W-COLOCATE decomposition (W-CON-GEN/W-MOTION2) |
| goo-blob colocation: `buildMetaballProgram`, `uploadBlobUniforms`, `constants.ts`, `metaball-uniforms.glsl.ts` | composables/shaders | `src/components/custom/goo-blob/**` | yes — GooBlob on `/goo-blob` subpath | 1–4 src each · 0 | **keep** (W-COLOCATE) | `rg -l <sym> src/components/custom/goo-blob/` → consumed by `useMetaballRenderer.ts` + constants; the W-CARVE metaball-renderer decomposition |
| `metaball.frag.ts` (net-changed) | shader leaf | `src/components/custom/goo-blob/shaders/metaball.frag.ts` | yes — GooBlob `/goo-blob` | ≥2 src · — | **keep** | `rg -l metaball.frag src/` → metaball-uniforms + buildMetaballProgram; the post-split blob shader authority |
| `aurora/.../vangogh-medium.glsl.ts` (net-new) | shader leaf | `src/components/custom/aurora/constants/shaders/vangogh-medium.glsl.ts` | yes — Aurora `/aurora` | 4 src · 0 | **keep** | `rg -l vangogh-medium src/` → mediums.glsl, uniformBridge, atoms, presets; aurora medium splice |
| `useSpecularTracking` (AZ-touched) | composable | `src/composables/glass/useSpecularTracking.ts` | yes — glass barrel | 2 src · 0 | **keep** | `rg -l useSpecularTracking src/` → DockIconButton.vue + Card.vue (≥2 binary) |
| `createCanvasLifecycle` (AZ-touched) | webgl leaf | `src/composables/glass/webgl/createCanvasLifecycle.ts` | internal | 3 src · 0 | **keep** | `rg -l createCanvasLifecycle src/` → useWebGLCanvas, useMetaballRenderer, useCanvas2D |
| Configurator hierarchy tokens (`--configurator-section-size/-weight`, `.configurator-section-label`, `--configurator-preset-row-weight/-gap`) | CSS tokens/class | `src/styles/configurator.css` + `tokens/offsets-sizing.css` | n/a (token cascade) | 4 src · — | **keep** | `rg -l "configurator-section-label\|configurator-preset-row-weight" src/` → ConfiguratorLayer.vue, ConfiguratorRow.vue, the 2 css homes; W-HIERARCHY vocabulary |
| `src/styles/configurator.css` | stylesheet | — | wired | `@import` in `index.css` | **keep** | `rg "configurator.css" src/styles/index.css` GREEN |
| `src/styles/dock/rail-extend.css` | stylesheet | — | wired | `@import` in `dock.css` + DockRail consumes | **keep** | `rg "rail-extend.css" src/styles/dock.css` GREEN |
| `src/styles/dock/morph-bridge.css` (`.dock-morph-bridge*`) | stylesheet | — | wired | `@import` in `dock.css` · `morph-showcase.vue` consumes classes | **keep** | `rg "morph-bridge.css" src/styles/dock.css` GREEN + `rg -l dock-morph-bridge demo/` → morph-showcase.vue |
| W-CARVE token partials (`tokens/{scheme-motion,color-radius,shadow,glass,offsets-sizing,scale-paper,light-dark,dark-arm,property-regs}.css`) | stylesheet split | — | wired | 9 `@import` in `tokens.css` cascade | **keep (reorg)** | `rg "@import" src/styles/tokens.css` → all 9 present in cascade order; the @import-root carve, dist byte-isomorphic |
| W-CARVE theme partials (`theme/{radius,bridges,literals,dark}.css`) | stylesheet split | — | wired | 4 `@import` in `theme.css` | **keep (reorg)** | `rg "@import" src/styles/theme.css` → all 4 present |
| W-CARVE glass partials (`glass/{material,ladder,surfaces,progress-rail,squircle,a11y-fallback}.css`) | stylesheet split | — | wired | 6 `@import` in `glass.css` | **keep (reorg)** | `rg "@import" src/styles/glass.css` → all 6 present |
| W-CARVE utilities partials (`utilities/{animate,base,components,btn,a11y-overrides}.css`) | stylesheet split | — | wired | 5 `@import` in `utilities.css` | **keep (reorg)** | `rg "@import" src/styles/utilities.css` → all 5 present |
| W-CARVE dock-controls partials (`dock-controls/{icon-button,dark-mode-toggle,tab-button,triggers,touch-floor}.css`) | stylesheet split | — | wired | 5 `@import` in `dock-controls.css` | **keep (reorg)** | `rg "@import" src/styles/dock-controls.css` → all 5 present |
| W-CARVE dock partials (`dock/{shell,morph,density,layers,layer-group,overflow}.css`) | stylesheet split | — | wired | `@import` in `dock.css` root | **keep (reorg)** | `rg "@import" src/styles/dock.css` → partials present; AX.W06 monolith split, AZ-continued |
| **RETIRE — WebGPU twin:** `createGPUCanvas.ts`, `aurora/composables/gpuRuntime.ts`, `aurora/constants/shaders/aurora.wgsl.ts` | retired files | (absent at HEAD) | n/a | 0 | **retire (clean deletion proof)** | `ls` → all 3 ABSENT; W-AUR-WEBGPU-DECIDE RETIRE branch (no Kuwahara consumer); appeared in `git --since` only as deletions; `proof:webgpu-substrate-single` GREEN without the twin |
| **RETIRE — pruned components:** `deck-progress/`, `instrument-rail/`, `dialog-native/` (+ their `src/subpaths/*.ts` barrels) | retired dirs | (absent at HEAD) | n/a | 0 | **retire (formal disposition)** | `ls src/components/custom/<d>` → ABSENT; `ls src/subpaths/<d>.ts` → ABSENT; W-PRUNE2 "deck-progress/instrument-rail stay pruned"; appeared in `git --since` only as deletions; package.json carries NO `./deck-progress`/`./instrument-rail`/`./dialog-native` export |

## ORPHAN findings

**None.** Every AZ-minted `src/` artefact resolves to one of the three passing dispositions:

1. **≥2 consumer sites** — coalesceMetric (5), useLiquidFlex (2), useSpecularTracking (2),
   createCanvasLifecycle (3), the prng leaf (4), createStrict/OptionalContext (7+), SPRING_PRESETS (5),
   the configurator hierarchy tokens (4), dock/constants.ts (10).
2. **Exported on a published subpath** (with named consumer/evidence) — DockRail/DockRailItem
   (`/dock`), useDockOrientationMorph (`/dock`), HeaderRibbon (`/header-ribbon`, keyframes.js binary
   consumer), GlassPanel (`/glass-panel`, keyframes.js binary consumer), GlassUnderline (`/underline`),
   MOTION_CURVES/motionCurve (`/motion-curves`), fourier presets/math (`/fourier-field`,
   `/fourier-math`), the constellation/goo-blob colocation leaves (their components on
   `/constellation`, `/goo-blob`), the W-CARVE CSS partials (@import-wired in cascade order).
3. **Formal retire/disposition** — the WebGPU twin (createGPUCanvas/gpuRuntime/aurora.wgsl, a clean
   deletion proof) and the pruned trio (deck-progress/instrument-rail/dialog-native dirs + their
   subpath barrels + package.json export seats, all absent at HEAD).

### Two near-orphans correctly cleared (documented so the precedence is auditable)

- **`useGlassBackdropLuminance`** is OFF the public glass barrel with only 1 binary consumer
  (GlassDock) — by the strict table this would read as a candidate for triage. It is correctly
  **demo-private (path B)**, cleared by the explicit, current evidence doc
  `docs/consumer-evidence/use-glass-backdrop-luminance.md`, which names the booked 2nd-binary
  promotion trigger. The doc's own re-audit grep (`rg useGlassBackdropLuminance GlassDock.vue`)
  still finds the binary consumer, so the keep-current is live, not stale.
- **The W-COLOCATE single-host extractions** (useDockClickIntegrity, useDockMorphWindow,
  useDockShellProps, tabs/constants.ts, the constellation/goo-blob decomposition leaves) each have
  exactly 1 binary consumer and are not barrelled — under the table's `inline-and-remove`
  precedence a naive read would flag them. They are correctly **keep** under the documented,
  gate-enforced W-COLOCATE convention (`proof:colocation`): they are named, semantic
  decompositions of a complex component's orchestrator, the same architecture the shipped
  `useDockState`/`useDockHold`/`useMetaballRenderer` precedent established. They are not anonymous
  helper-shaped abstractions.

## Verdict distribution

| verdict | count | notes |
|---|---|---|
| keep (≥2 sites) | 14 | incl. the W-COLOCATE single-host extractions cleared by convention |
| keep / keep-current (published subpath or evidence-doc demo-private) | 11 | incl. the 2 RESTORED keyframes.js consumers + the demo-private luma observer |
| keep (CSS reorg, @import-wired) | 6 row-groups | the W-CARVE token/theme/glass/utilities/dock-controls/dock partial splits |
| retire (formal disposition) | 2 groups | the WebGPU twin (3 files) + the pruned trio (3 dirs + barrels) |
| **library-orphan / inline-and-remove / delete-unused** | **0** | — |

## ORPHANS: 0
