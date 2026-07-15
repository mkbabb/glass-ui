# MIGRATION

The per-version migration guide for `@mkbabb/glass-ui`. Each `## <version>` section
records the breaking changes that landed in that cut, newest first. Clean breaks only
— no legacy aliases, no back-compat shims (L invariant 4); every break is a one-line
rename or import re-point per call site.

## 5.0.0

The 5.0.0 cut is the joint BG/BH release: the BG visual-convergence band (the warm /
weighty / liquid iOS-27 redesign) lands alongside the BH structural reshape. **The
whole consumer break is ONE dropped export key — `./api` — plus its 199-symbol
re-home** (each symbol swaps its import PATH onto the owning subpath, zero symbol loss);
every other published key is preserved (the regen proves 96/96 keys reproduce). The
remaining rows are a token rename (`--ring` → `--focus-ring-color`), one
component/subpath rename (`goo-blob` → `blob`), and the source-only `src/subpaths/`
deletion + curated flat-barrel relocations (no export break). The BG visual band is a
paint upgrade — no public-prop break beyond the rows below.

### The `/api` discovery-subpath fold — 185-symbol re-home

`@mkbabb/glass-ui/api` (the pure types + constants discovery layer) is FOLD-DELETED. The
`./api` key is the ONLY dropped key. 185 of its symbols re-home onto their OWNING published
subpath — so a consumer swaps the import PATH with zero symbol loss (the 6 deleted-viz types
+ the 4 retired `/virtual` windowing types + the 4 retired `/border-progress` ring types
below are the exception — they are DELETED / RETIRED, not re-homed):

```ts
// 5.0.0 — the /api discovery layer is gone; import each symbol from its owning subpath
- import type { AuroraConfig, CardTier } from "@mkbabb/glass-ui/api";
+ import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";
+ import type { CardTier } from "@mkbabb/glass-ui/card";
```

183 of the 185 re-homed symbols were ALREADY exported by their owning subpath barrel (the
fold is a pure import-path swap — the owning subpath needs no new export). The SIX
`Concentric*` / `DotFlowField*`+`FlowFieldConfig` viz types are NOT re-homed — the
`/concentric` + `/dot-flow-field` subpaths + their components are DELETED at
BI.W-VIZ-DELETIONS (see "The BI viz-family deletion" section below), so those types have no
owning subpath; a consumer of them has no target (the vizzes are retired). The FOUR
`/virtual` windowing types (`FlatSection` / `ForcedSectionWindowRange` / `SectionLayout` /
`SectionWindowRange`) are LIKEWISE not re-homed — the `/virtual` subpath is RETIRED at
BI.W-VIRTUAL-TRUTH (see "The `/virtual` subpath retirement" section below), so those types
have no owning subpath either. The FOUR `/border-progress` ring types
(`BorderProgressCoverage` / `BorderProgressMilestone` / `BorderProgressMilestoneEvent` /
`BorderProgressProps`) are ALSO not re-homed — the `/border-progress` subpath is RETIRED at
BI.W-BORDER-PROGRESS-RETIRE (see "The `/border-progress` subpath retirement" section below);
the component is BANKED dormant off the public surface, so those types have no owning subpath
until the speedtest adopt re-publishes it. The surface-axis
grammar types (`Surface` / `SurfaceTier`) publish via the dedicated `/axes` grammar
subpath (BH.W-AXIS-GRAMMAR — the honest `/api` successor). Only two `ui/_shared`
convenience unions re-home to a barrel that ADDS one type-only export: `MenuItemVariants`
→ `/command`, `ControlSize` → `/forms`. The three root-barrel `*Variants` types
(`AlertVariants` / `AvatarVariants` / `ToggleVariants`) resolve off the root
`@mkbabb/glass-ui` barrel. value.js's 18 consumed specifiers (root + 15 subpaths +
`/easing` + `/styles/fonts`) are all named in the table below, so the compound-import
unbuildable class cannot recur.

The `/api` layer carried 199 symbols at the fold (down from the pre-BG 203: the
dead-composable sweep retired `Haptic*` / `CelebrationBurst*` / `WaveComponent` and the
`GlassPanelVariant` tier-homonym, and the `PaperGrid*` → `LiquidGrid*` +
`SelectableChipVariants` → `ChipVariants` renames moved their entries — each documented in
its own section below or in the BG retirements). Of those, 185 re-home (the table above);
the 6 `Concentric*` / `DotFlowField*`+`FlowFieldConfig` viz types are DELETED, the 4
`/virtual` windowing types are RETIRED with their subpath (BI.W-VIRTUAL-TRUTH), and the 4
`BorderProgress*` ring types are RETIRED with the `/border-progress` subpath
(BI.W-BORDER-PROGRESS-RETIRE), not re-homed.

The full 199-symbol map (grouped alphabetically by symbol; `kind` is the TS export kind;
`new import (owning subpath)` is the 5.0.0 target):

| symbol | kind | new import (owning subpath) |
|---|---|---|
| `AlertVariants` | type | `@mkbabb/glass-ui` (root) |
| `AvatarVariants` | type | `@mkbabb/glass-ui` (root) |
| `ToggleVariants` | type | `@mkbabb/glass-ui` (root) |
| `AnimatedDigitMode` | type | `/animated-digit` |
| `AnimatedDigitProps` | type | `/animated-digit` |
| `AuroraAtoms` | type | `/aurora` |
| `AuroraConfig` | type | `/aurora` |
| `AuroraCursorApi` | type | `/aurora` |
| `AuroraFlow` | type | `/aurora` |
| `AuroraHarmony` | type | `/aurora` |
| `AuroraHuePath` | type | `/aurora` |
| `AuroraImageBlur` | type | `/aurora` |
| `AuroraImageSource` | type | `/aurora` |
| `AuroraInstance` | type | `/aurora` |
| `AuroraInteractivity` | type | `/aurora` |
| `AuroraInteractivityAtom` | type | `/aurora` |
| `AuroraMedium` | type | `/aurora` |
| `AuroraMediumAtom` | type | `/aurora` |
| `AuroraMotionAtom` | type | `/aurora` |
| `AuroraNucleus` | type | `/aurora` |
| `AuroraRuntimeMode` | type | `/aurora` |
| `AuroraRuntimeOptions` | type | `/aurora` |
| `AuroraSource` | type | `/aurora` |
| `AuroraZoneArrangement` | type | `/aurora` |
| `AuroraZones` | type | `/aurora` |
| `DEFAULT_AURORA_CONFIG` | const | `/aurora` |
| `DeriveAuroraOptions` | type | `/aurora` |
| `DeriveEasing` | type | `/aurora` |
| `FlowPattern` | type | `/aurora` |
| `MAX_NUCLEI` | const | `/aurora` |
| `MAX_STOPS` | const | `/aurora` |
| `OklchStop` | type | `/aurora` |
| `PAPER_WASH_GROUND` | const | `/aurora` |
| `StrokeMode` | type | `/aurora` |
| `StrokeOrient` | type | `/aurora` |
| `WarpMode` | type | `/aurora` |
| `BadgeVariants` | type | `/badge` |
| `ButtonVariants` | type | `/button` |
| `Canvas2DFrame` | type | `/canvas` |
| `Canvas2DHandle` | type | `/canvas` |
| `Canvas2DOptions` | type | `/canvas` |
| `Canvas2DSuspendReason` | type | `/canvas` |
| `CardMetal` | type | `/card` |
| `CardSurface` | type | `/card` |
| `CardTier` | type | `/card` |
| `CardVariant` | type | `/card` |
| `ScrollCardHeaderProps` | type | `/card` |
| `ScrollCardProps` | type | `/card` |
| `UseAccentToneOptions` | type | `/color` |
| `UseAccentToneReturn` | type | `/color` |
| `CompletionSealProps` | type | `/completion-seal` |
| `CompletionSealShape` | type | `/completion-seal` |
| `ConfiguratorCloneMode` | type | `/configurator` |
| `ConfiguratorPreset` | type | `/configurator` |
| `ConfiguratorScrollMode` | type | `/configurator` |
| `ConfiguratorState` | type | `/configurator` |
| `ConfiguratorStateOptions` | type | `/configurator` |
| `ConstellationField` | type | `/constellation` |
| `ConstellationProps` | type | `/constellation` |
| `ConstellationWarp` | type | `/constellation` |
| `DarkFlipSettledCallback` | type | `/dark` |
| `DarkModeSyncScriptOptions` | type | `/dark` |
| `UseGlobalDarkOptions` | type | `/dark` |
| `UseGlobalDarkReturn` | type | `/dark` |
| `DeckCore` | type | `/deck` |
| `DeckMoves` | type | `/deck` |
| `UseDockSearchOptions` | type | `/dock` |
| `UseDockSearchReturn` | type | `/dock` |
| `UseDockStateReturn` | type | `/dock` |
| `UseClipboardOptions` | type | `/dom` |
| `UseClipboardReturn` | type | `/dom` |
| `UseUserInvalidAriaOptions` | type | `/dom` |
| `UseUserInvalidAriaReturn` | type | `/dom` |
| `BezierPoints` | type | `/easing` |
| `EasingFn` | type | `/easing` |
| `EasingPickerMode` | type | `/easing` |
| `EasingPickerValue` | type | `/easing` |
| `JumpTerm` | type | `/easing` |
| `UseEasingPickerOptions` | type | `/easing` |
| `UseEasingPickerReturn` | type | `/easing` |
| `FourierFieldConfig` | type | `/fourier-field` |
| `FourierFieldProps` | type | `/fourier-field` |
| `BlendMode` | type | `/handmark` |
| `Brush` | type | `/handmark` |
| `BrushName` | type | `/handmark` |
| `HandAnimation` | type | `/handmark` |
| `HandMarkProps` | type | `/handmark` |
| `HandShape` | type | `/handmark` |
| `InkPath` | type | `/handmark` |
| `MarkBox` | type | `/handmark` |
| `TaperSpec` | type | `/handmark` |
| `HeaderRibbonPlacement` | type | `/header-ribbon` |
| `HeaderRibbonProps` | type | `/header-ribbon` |
| `IconChipIcon` | type | `/icon-chip` |
| `IconChipProps` | type | `/icon-chip` |
| `IconChipSection` | type | `/icon-chip` |
| `IconChipTone` | type | `/icon-chip` |
| `InstrumentChassisPhase` | type | `/instrument-chassis` |
| `MetricBadgeLabelPosition` | type | `/metric-badge` |
| `MetricBadgeProps` | type | `/metric-badge` |
| `MetricBadgeSize` | type | `/metric-badge` |
| `MetricCellAppearance` | type | `/metric-cell` |
| `MetricCellProps` | type | `/metric-cell` |
| `MetricRowProps` | type | `/metric-stack` |
| `MetricStackProps` | type | `/metric-stack` |
| `BloomUpPreset` | type | `/motion` |
| `Countup` | type | `/motion` |
| `DockCtaReceivePreset` | type | `/motion` |
| `DragMorphAxis` | type | `/motion` |
| `DragMorphSnapTarget` | type | `/motion` |
| `Easing` | type | `/motion` |
| `LiquidRevealPreset` | type | `/motion` |
| `TimingFunction` | type | `/motion` |
| `UseBloomUpOptions` | type | `/motion` |
| `UseBloomUpReturn` | type | `/motion` |
| `UseCountupOptions` | type | `/motion` |
| `UseDockCtaReceiveOptions` | type | `/motion` |
| `UseDockCtaReceiveReturn` | type | `/motion` |
| `UseDragMorphParams` | type | `/motion` |
| `UseDragMorphReturn` | type | `/motion` |
| `UseLiquidRevealOptions` | type | `/motion` |
| `UseLiquidRevealReturn` | type | `/motion` |
| `HighlightMatcher` | type | `/motion-core` |
| `NavigateOptions` | type | `/motion-core` |
| `PointerVec2` | type | `/motion-core` |
| `TriggerPoint` | type | `/motion-core` |
| `UseCharStaggerOptions` | type | `/motion-core` |
| `UseCharStaggerReturn` | type | `/motion-core` |
| `UsePointerVelocityField` | type | `/motion-core` |
| `UsePointerVelocityFieldOptions` | type | `/motion-core` |
| `UseScrollChromeOptions` | type | `/motion-core` |
| `UseScrollChromeReturn` | type | `/motion-core` |
| `UseScrollTriggerOptions` | type | `/motion-core` |
| `UseScrollTriggerReturn` | type | `/motion-core` |
| `UseTextHighlightControls` | type | `/motion-core` |
| `ViewTransitionOptions` | type | `/motion-core` |
| `ViewTransitionResult` | type | `/motion-core` |
| `CurveFn` | type | `/motion-curves` |
| `MotionCurve` | type | `/motion-curves` |
| `MotionCurveKind` | type | `/motion-curves` |
| `SpringPresetName` | type | `/motion-curves` |
| `SpringPresetRow` | type | `/motion-curves` |
| `PagerDotsProps` | type | `/pager-dots` |
| `PagerWindow` | type | `/pager-dots` |
| `PaperBackdropFrequency` | type | `/paper-backdrop` |
| `PaperBackdropProps` | type | `/paper-backdrop` |
| `LiquidGridConfig` | type | `/liquid-grid` |
| `LiquidGridHandle` | type | `/liquid-grid` |
| `UseLiquidGridOptions` | type | `/liquid-grid` |
| `FuzzySearchState` | type | `/search` |
| `SearchableItem` | type | `/search` |
| `SearchIndex` | type | `/search` |
| `SearchResult` | type | `/search` |
| `SearchVariant` | type | `/search` |
| `SearchVariants` | type | `/search` |
| `UseFuzzySearchOptions` | type | `/search` |
| `ChipVariants` | type | `/chip` |
| `ClickDelegateOptions` | type | `/sidebar` |
| `LazyLoaderOptions` | type | `/sidebar` |
| `ScrollToOptions` | type | `/sidebar` |
| `ScrollTrackerOptions` | type | `/sidebar` |
| `SidebarIndexEntry` | type | `/sidebar` |
| `SidebarSection` | type | `/sidebar` |
| `SidebarState` | type | `/sidebar` |
| `TreeIndexEntry` | type | `/sidebar` |
| `TreeNode` | type | `/sidebar` |
| `SliderVariants` | type | `/slider` |
| `SpaViewProps` | type | `/spa-view` |
| `StackedIconGroupProps` | type | `/stacked-icons` |
| `SegmentedTabOption` | type | `/tabs` |
| `SegmentedTabsOrientation` | type | `/tabs` |
| `SegmentedTabsProps` | type | `/tabs` |
| `SegmentedTabsVariant` | type | `/tabs` |
| `TimelineSegment` | type | `/timeline` |
| `TimelineSegmentGradient` | type | `/timeline` |
| `TimelineSegmentState` | type | `/timeline` |
| `ToastType` | type | `/toast` |
| `ControlSize` | type | `/forms` |
| `MenuItemVariants` | type | `/command` |
| `Surface` | type | `/axes` |
| `SurfaceTier` | type | `/axes` |
### `--ring` → `--focus-ring-color` (focus-ring token rename)

The focus-ring color token `--ring` is renamed `--focus-ring-color` (clean break, no
alias). It reads the focus register the `--focus-ring-shadow` utility composes (the
token-first focus axis). MIGRATE: rename every `--ring` reference to `--focus-ring-color`
at each declaration/read site. A consumer that cannot re-point in one pass reads it
fallback-first for the transition window — `var(--focus-ring-color, var(--ring))` — then
drops the `var(--ring)` fallback once its own tree is renamed (the fallback is a consumer
convenience, NOT a library alias: glass-ui ships only `--focus-ring-color`). Landed on
the 5.0.0 cut commit; the atlas consumer (12 bare `--ring` reads across 11 files)
re-points on its own `^5.0.0` bump.

### `goo-blob` → `blob` (component + subpath rename)

`<GooBlob>` renames to `<Blob>` and the `@mkbabb/glass-ui/goo-blob` subpath renames to
`@mkbabb/glass-ui/blob` (clean break, no alias — the owner-ratified full rename). The
types + scoped CSS seams rename in lockstep; the config registry keys
`BLOB_CONFIG_KEY` / `BLOB_CONFIG_DEFAULTS` already carried the `BLOB` prefix (stable, no
change). MIGRATE (one-line rename per call site):

```ts
- import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
+ import { Blob } from "@mkbabb/glass-ui/blob";
```

`<GooBlob …>` → `<Blob …>`; the prop schema + the `useMetaballRenderer` seam are
otherwise unchanged. The merged-metaball FIELD look is identical — only the name moves.

### `src/subpaths/` deleted + curated flat-barrel relocations (key-preserving)

The 79 one-line `src/subpaths/*.ts` mirror barrels are DELETED; the build entry-map is
re-derived from the real colocated component/composable barrels by the fail-closed
exports regen. The 11 curated flat `src/*.ts` barrels relocate under `src/entries/`.
Both moves are SOURCE-ONLY and KEY-PRESERVING — the same `dist/<name>.js` chunk set
emits and every published subpath key resolves identically. No consumer action is
required for either.

### The BG/BH visual-convergence & structural retirements

**BG.W-GOODOT-PRUNE — `GooDotMatrix` + the `/goo-dot-matrix` subpath RETIRED with
rationale (0 external consumers). Clean break, no alias ("No legacy code").** The
`goo-dot-matrix` goo+dot HYBRID viz (`<GooDotMatrix>`, `GooDotConfig`, `useGooDotMatrix`,
`DEFAULT_GOO_DOT_CONFIG`) + its `@mkbabb/glass-ui/goo-dot-matrix` subpath are
DEFINITION-ABSENT at the 5.0.0 cut. It was a demonstration hybrid that earned no external
consumer since BC (the ≥2-consumer / visual-load-bearing bar; J-inv-10 / L-inv-8). At BG its
FIELD donor (blob) AND its dot-matrix RENDER register both survived it; **`dot-matrix` was
subsequently DELETED at BI.W-VIZ-DELETIONS** (the user-ordered clean-break prune of the
30+-attempt viz family), so the surviving re-home target is the blob FIELD donor
(`@mkbabb/glass-ui/blob`, byte-untouched render). MIGRATE: none for the library's own tree;
any external consumer of `/goo-dot-matrix` re-homes onto `<Blob>` (the merged-metaball FIELD
look). The inv-11 registry-consumer probe (`npm view @mkbabb/glass-ui` + the constellation
census) read ZERO consumers; recorded in the cut notes.

**BI.W-VIZ-DELETIONS — `DotFlowField` / `Concentric` / `DotMatrix` + their subpaths DELETED
(the user-ordered clean-break prune). Clean break, no alias ("No legacy code").** The three
condemned procedural-viz members are DEFINITION-ABSENT at the 5.0.0 cut — the user edict
verbatim: *"Dot flow field, concentric, dot matrix — all to be deleted. You've failed 30+
attempts to implement these."* The deleted surface:

| dropped subpath | dropped exports (component + composable + config/handle types) |
|---|---|
| `@mkbabb/glass-ui/dot-flow-field` | `<DotFlowField>`, `useDotFlowField`, `FlowFieldConfig`, `DotFlowFieldHandle`, `UseDotFlowFieldOptions`, `DEFAULT_FLOW_CONFIG`, `sampleStreamField`/`curlFBM`/… |
| `@mkbabb/glass-ui/concentric` | `<Concentric>`, `useConcentric`, `ConcentricConfig`, `ConcentricHandle`, `UseConcentricOptions`, `DEFAULT_CONCENTRIC_CONFIG`, `sampleHeight`/`toneFromHeight`/… |
| `@mkbabb/glass-ui/dot-matrix` | `<DotMatrix>`, `useDotMatrix`, `DotMatrixConfig`, `DotMatrixHandle`, `UseDotMatrixOptions`, `DEFAULT_DOT_MATRIX_CONFIG`, `fibonacciDot`/`facingFade`/… |

This is a BREAKING export change — routed into the 5.0.0 MAJOR cut (STRUCT-2), NOT the
zero-churn 5.1.0 flatten. It REVERSES BG.W-DOTFLOW-REBUILD (STRUCT-14): the 30+-attempt viz
family is RETIRED, not re-attempted — a future streamline/topographic/dot-sphere need
re-enters through a NEW honest trigger, never a re-open of the deleted registers. **MIGRATE:
none for consumers — the sibling census (`npm view` + the constellation import-graph) read
ZERO binary consumers of the three subpaths, so this is a no-op-for-consumers record (per
invariant-11), not a silent prune.** The surviving procedural-viz suite is aurora · blob ·
fourier-field · constellation · **liquid-grid** (the KEEPER born-WebGPU grid viz — NOT in the
delete set); the shared `curlFBM` chunk (`flow.glsl.ts`/`flow.wgsl.ts`) KEEPS (liquid-grid +
aurora-curl-warp consume it, the ≥2 shared-chunk bar).

#### The `/virtual` subpath retirement

**BI.W-VIRTUAL-TRUTH — the `/virtual` PUBLISHED SUBPATH RETIRED (the consumer-truth
adjudication, DOC-4). Clean break, no alias ("No legacy code").** The section-windowing
engine was un-retired at BC on a two-binary-consumer justification that a fresh
registry+sibling probe at execution found FABRICATED: (1) the named external consumer, words
`DefinitionContentView`, imports a byte-DIVERGENT words-LOCAL fork (`@/composables/virtual`,
md5 ≠ the glass-ui copy), never `@mkbabb/glass-ui/virtual` — 0 external binary consumers; (2)
the "internal live consumer" (the dock-search results list) does NOT compose the windower —
the library dock only accepts an optional `ensureTargetWindow` callback. There are 0 src/
production consumers; the mechanism is DEMO-ONLY (3 demo sites). Under the mechanism-distinctness
+ ≥2-binary-consumer law the PUBLISHED SUBPATH does not earn its keep, so it retires:

| dropped surface | disposition |
|---|---|
| `@mkbabb/glass-ui/virtual` subpath export + `typesVersions` | RETIRED — no external target |
| `src/subpaths/virtual.ts` mirror | DELETED |
| `/api` re-export of `FlatSection` / `ForcedSectionWindowRange` / `SectionLayout` / `SectionWindowRange` | REMOVED — the 4 types have no owning subpath (see the `/api` fold note above) |
| `src/composables/virtual/` engine (`useVirtualSectionWindow` / `useWindowedStore` / `virtualSectionLayout`) | KEEPS — internal, demo-consumed via `@glass/composables/virtual` |

**MIGRATE: none — the fresh probe read ZERO external binary consumers (words maintains its own
fork; the atlas O-E9 document-native `/virtual` core is a long-pole future ask that "needs
nothing from this row" today, DECLINED-TERMINAL). A no-op-for-consumers record (per
invariant-11), not a silent prune.** Re-entry trigger: the published subpath re-mints only on
a real ≥2 cross-repo binary consume (a words re-adopt ask, or the vft V4 → V6.g consume) — a
production or external importer of the glass-ui surface, never a demo page and never a local
fork. Recorded in `docs/consumer-evidence/use-virtual-section-window.md` +
`proof:consumer-evidence-true` / `proof:virtual-window` (VW4/VW5 reconciled to the retire).

#### The `/border-progress` subpath retirement

**BI.W-BORDER-PROGRESS-RETIRE — `/border-progress` and the broad `BorderProgress` component are
deleted. Clean break, no alias.** The old surface mixed a content wrapper, three coverage modes,
milestone events, spectrum expansion, and progress paint despite having no external binary
consumer. Its one earned mechanism—the radius-following masked band—now belongs to the smaller
public `ScrollProgressRim` successor.

| surface | disposition |
|---|---|
| `@mkbabb/glass-ui/border-progress` subpath export + `typesVersions` | RETIRED — 0 binary consumers |
| `BorderProgress`, milestone APIs, content-wrapper behavior, and old CSS properties | DELETED |
| `@mkbabb/glass-ui/scroll-progress-rim` | ADDED — exports `ScrollProgressRim` |

`ScrollProgressRim` accepts aggregate `value` / `max`, optional per-item `segments` whose values
are clamped to `[0,1]`, an edge `coverage`, and optional rainbow `stops`. It paints one 4px masked
band that follows the host radius and exposes native progressbar semantics. SidebarDock and the
feedback progress demo consume this successor directly. `completion-seal` remains published and
unchanged.

#### The `/scrolling-text` subpath retire-relocation

**BI.W-SPEEDTEST-ONLY-PAIR — the `/scrolling-text` PUBLISHED SUBPATH + its component RETIRE-RELOCATED
to speedtest (the consumer-truth adjudication; XR-3 / UF-K1). Clean break, no alias ("No legacy
code").** `ScrollingText` is an overflow-detection marquee lifted from the speedtest fleet at W.W2;
at the 5.0.0 cut the fresh registry+sibling probe (`npm view @mkbabb/glass-ui` + a read-only grep of
the constellation) reads its ONLY binary consumers as **speedtest, 2 sites** — `ResultDetailSheet.vue:6`
+ `AppSettingsButton.vue:97`, both `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"`;
**0** across muster · sci-report · atlas · slides · value.js · keyframes.js · words · bbnf-buddy. The
≥2-**repo**-binary-consumer bar is UNMET (one consuming repo), and the mechanism is a distinct
overflow-marquee no survivor expresses — so the law does NOT fold it onto a sibling, it RELOCATES to the
sole consumer's own repo (UF-P6 no-standing-overfit — the honest home is speedtest's tree, NOT a
keep-with-evidence-doc). Unlike border-progress (banked dormant, demo-only own-render), scrolling-text
has NO glass-ui demo consumer once its story folds, so the retire is a full DELETE:

| dropped surface | disposition |
|---|---|
| `@mkbabb/glass-ui/scrolling-text` subpath export + `typesVersions` | RETIRED — speedtest-only, ≥2-repo bar unmet (derived regen: subpath-policy drop → `regen-exports --write`) |
| `src/subpaths/scrolling-text.ts` mirror | DELETED |
| `src/components/custom/scrolling-text/` component (`ScrollingText.vue` + barrel + README) | DELETED — relocated to speedtest's repo |
| root barrel re-export (`src/index.ts` `export * from "./components/custom/scrolling-text"`) | DROPPED — no `ScrollingText` off the root barrel |
| the `data/scrolling-text` demo story + its manifest row + metrics-family member | DELETED — the metrics family keeps its four metric primitives |

**MIGRATE: none — the fresh probe read ZERO external binary consumers beyond speedtest; a
no-op-for-registry-consumers record (per invariant-11), not a silent prune.** Relocation home: speedtest
ADOPTS a local copy (or its own overflow primitive) on its `^5.x` consume and DROPS the `/scrolling-text`
import — the by-name ASK (with the paired kf `^5.2.0` / value `^3.1.0` peer bump) is rostered on the
`crossrepo-asks:bi` book (`docs/tranches/BI/coordination/asks-and-consumes.md`). Re-entry trigger: a real
≥2-repo cross-repo binary consume re-mints the published subpath (never a demo page, never one repo).
Recorded in `proof:consumer-evidence-true` (the SP1 arm — source-anchored: component + mirror + root-barrel
re-export + demo story DEFINITION-ABSENT).

#### The `icon-tooltip` disposition (Tooltip preset — no subpath change)

**BI.W-SPEEDTEST-ONLY-PAIR (consumer-truth) · BI.W-OVERLAY-UNION (mechanism).** The overlay Kronecker fold
(BI.W-OVERLAY-UNION) already re-expressed `IconTooltip` as a **Tooltip PRESET** — it composes the `ui/tooltip`
family verbatim (the distinct mechanism: `aria-describedby` naming, `role="tooltip"`, the SR mirror,
non-focusable content), NOT its own overlay root. This wave owns the consumer-truth consequence: speedtest is
the sole binary consumer (`Dock.vue:17` `import { IconTooltip } from "@mkbabb/glass-ui/icon-tooltip"` +
`AddressAutocomplete.vue:103`), so the fold PAIRS a speedtest ADOPT ask (migrate the two sites onto the
Tooltip preset) on the same cut — rostered on the `crossrepo-asks:bi` book. Recorded in
`proof:consumer-evidence-true` (the SP2 arm — source-anchored: `IconTooltip.vue` composes the Tooltip family).

**BG.W-GRID-AFFINE — `PaperGrid` (the viz) RENAMED to `LiquidGrid`; `/paper-grid` →
`/liquid-grid`. Clean break, no alias ("No legacy code").** The WebGPU-first liquid AA-grid
viz + its subpath are renamed to kill the live homonym with the STATIC `.paper-grid` /
`--paper-grid-texture` geometric-paper CARD register (`cards.css` / `scale-paper.css`), which
is BYTE-UNTOUCHED — the homonym dies on the VIZ side only. MIGRATE (one-line rename per call
site):
- `import { PaperGrid, DEFAULT_PAPER_GRID_CONFIG } from "@mkbabb/glass-ui/paper-grid"`
  → `import { LiquidGrid, DEFAULT_LIQUID_GRID_CONFIG } from "@mkbabb/glass-ui/liquid-grid"`.
- `<PaperGrid …>` → `<LiquidGrid …>`; `PaperGridConfig` → `LiquidGridConfig` (the `/api`
  discovery type); `usePaperGrid` → `useLiquidGrid`; `samplePaperGrid` → `sampleLiquidGrid`;
  the demo route `/substrates/paper-grid` → `/substrates/liquid-grid`.
- The `.paper-grid-wrapper`/`.paper-grid-canvas` scoped SFC classes → `.liquid-grid-*`
  (internal — no consumer surface). Zero external consumers verified — no by-name cross-repo
  ask owed. The prop schema is otherwise unchanged, EXCEPT the retired per-cell `shearMax`
  config field (the affine sheet-warp is shear-free — a `shearMax` set on a config object is a
  dead field; drop it).
- **The mechanism changed too (paint, not API):** the ripple is now a SMOOTH continuous
  AFFINE sheet-warp (`waveFlow`, the SAME warp Concentric reads) — major gridlines bow/shear as
  ONE coherent curve, cells near-parallelogram — instead of the retired per-cell `cellTwist`
  (which kinked each box about its own center). No consumer action; the surface reads better.

**BH.W-MOTION-AXIS — the four-boolean motion scatter → the ONE `motion` axis. Clean
break, no alias ("No legacy code").** The `draggable` / `pressable` / `spring` /
`liquidDrag` booleans (7 prop instances across 6 SFCs — `Card` · `Slider` ·
`DialogContent` · `SheetContent` · `SegmentedTabs` · `DockLayerGroup`) are COLLAPSED onto
a single `motion?: "full" | "reduced" | "off"` axis (default `full` — physics is the
DEFAULT, the axis is an opt-DOWN per the liquid-weight-universal law). `motion="reduced"`
degrades the JS gesture physics to their CSS floor (the same state `prefers-reduced-motion`
produces); `motion="off"` unbinds the enrichment AND writes `--motion-weight: 0` (the
functional interaction — click/keyboard/drag-handle — stays). PRM forces `full → reduced`
regardless (a11y absolute).
- **`<SegmentedTabs draggable>` / `<DockLayerGroup draggable>` → the `motion="full"`
  DEFAULT.** The drag is now the DEFAULT (a click-only strip opts DOWN with
  `motion="reduced"`). DockLayerGroup's drag flips default-ON (the boolean defaulted
  `false`) — the pull is an enrichment over the always-present click/keyboard model write.
- **`<Card pressable>` → interactivity + `motion`.** A Card presses IFF it renders
  interactive (`as="button"` / `as="a"` / `href` / `role="button"` on the root) AND
  `motion !== "off"`. MIGRATE: a former `<Card pressable @click>` becomes
  `<Card as="button" @click>` (a static plate never presses — the derivation, not a
  default). A former `<Card pressable="false">` is a bare `<Card>` (already static).
- **`<Slider liquidDrag>` → `motion`.** `liquidDrag="false"` → `motion="reduced"` (or
  `"off"`); the default `full` is byte-identical to the prior `liquidDrag: true`.
- **`<DialogContent spring>` / `<SheetContent spring>` → `springPreset` + `motion`.** The
  `spring` boolean carried BOTH the on/off AND the preset; it splits: `springPreset?:
  "smooth" | "snappy" | "bouncy" | "gentle"` is the curve choice (a distinct concern from
  motion intensity), and `motion` gates the engine. `spring={true}` → `springPreset="smooth"`;
  `spring="bouncy"` → `springPreset="bouncy"`; unset `spring` → unset `springPreset` (the
  `.glass-reveal` / `sheet-animate` CSS floor, byte-identical). Sheet's `dragDismiss` now
  engages the spring engine on its own (it needs it) — it no longer requires `spring`.
- **The kept gesture CONTRACTS are UNTOUCHED** (`keepDockOpen` · `dragDismiss` ·
  `responsive`) — a gesture contract is a role/behavior, not motion intensity.
Machine-locked by `proof:encapsulation` · `motion-axis` arm (M1-M6).

**BI.W-TABS-FACTOR — the eyeglass loupe becomes THE `pill` default + the variant cull.
Clean break, no alias ("No legacy code"; UF-H1: "eyeglass should become the default tabs
option … we don't need a million variants that are essentially the same thing").** The
`pill` material IS the iOS-27 loupe by construction — a proud two-rest-state liquid-glass
plate (a SETTLED inset long-rest that magnifies proud on touch/travel, the release riding
the edge-asymmetric `useLeadTrail` integrator).
- **`<SegmentedTabs eyeglass>` (the opt-in boolean) → DELETED.** The BG opt-in prop is
  RETIRED: a bare `<SegmentedTabs>` now paints the loupe. MIGRATE: drop the `eyeglass`
  attribute (it re-defaults to the loupe). A consumer who wants the prior FLAT slot-fill
  pill sets `--eyeglass-proud: 1; --eyeglass-settled: 1` on the strip (the token-first
  escape — the flat capsule survives only as that register + the PRM/degrade floor, not a
  named variant).
- **The sizing config — `--eyeglass-proud`.** The user-asked vertical-sizing knob is ONE
  bare `<number>` ratio: `--eyeglass-proud` (the LIVE magnify, default `1.12`, band
  1.05–1.25) with `--eyeglass-settled` (the inset rest, default `0.84`). Set it on any
  ancestor / the strip to retune every descendant loupe; no length, no `@media` re-declare
  (viewport-invariant by construction).
- **The eyeglass `SPRING_PRESETS` row.** The loupe travel is its own measured register
  (`eyeglass`, response 0.36 / ζ 0.64) — the CSS `--spring-eyeglass` + `--spring-eyeglass-duration`
  tokens + the `MOTION_CURVES` twin derive from it. Consumers reading `var(--spring-eyeglass)`
  get the Find My loupe curve.
Machine-locked by `proof:eyeglass-tabs` (E7 default-is-eyeglass · E8 the bounded sizing
axis · E9 the culled variants definition-absent · E10 `useLeadTrail` consumed, no second
integrator).

**BG.W-DEAD-SWEEP — the `selectableChipVariants` alias + the `--corner-shape-card`/
`-pill` dead tokens SWEPT. Clean break, no alias ("No legacy code").** Two net-negative
cuts:
- **`selectableChipVariants` → `chipVariants`, `SelectableChipVariants` → `ChipVariants`.**
  The `selectableChipVariants.ts` re-point shim (a self-admitted back-compat rename over
  the ONE congruent `chipVariants` recipe — BD.W-CHIP-CONGRUENT-GLASS) is DELETED. The
  `@mkbabb/glass-ui/selectable-chip` subpath now exports `chipVariants` (value) +
  `ChipVariants` (type); `@mkbabb/glass-ui/api` exports the `ChipVariants` type (was
  `SelectableChipVariants`). MIGRATE: rename `selectableChipVariants` → `chipVariants`
  and `SelectableChipVariants` → `ChipVariants` at each import site (the recipe body is
  byte-identical — it always WAS `chipVariants` under the alias). `<SelectableChip>`
  itself is unchanged.
- **`--corner-shape-card` / `--corner-shape-pill` DELETED.** They were dead `round`
  no-op knobs (zero `var()` readers; the CSS `corner-shape` INITIAL VALUE is `round`, so
  a card/pill with no declaration is already round). The "cards/pills stay round" policy
  is UNCHANGED — glass.css writes no `corner-shape` on `.glass-card`/`.glass-btn`/
  `.btn-pill`, so they inherit the round default (the CARD-REHOMED policy). The SQUIRCLE
  members `--corner-shape-{bigdock,dialog,sheet,panel,hero}` are LIVE and untouched.
  MIGRATE: a consumer who was re-pointing `--corner-shape-card`/`-pill` mints the alias
  itself and adds the surface to `glass/squircle.css`'s `@supports` block (presets-in-
  consumers). `proof:squircle-language`'s policy clause is re-pointed onto the NEGATIVE
  GUARD — a re-mint of either token reds (the net-negative cannot silently reverse).

**BG.W-DOCK-CAP-SCROLL-FADE — the `<GlassDock overflow="scroll">` opt-in RETIRED.
Clean break, no alias ("No legacy code").** The `overflow` prop is now
`"grow" | "wrap"` (the `"scroll"` member is GONE). A capped dock axis is
INTRINSICALLY a scroll axis, no opt-in: a HORIZONTAL dock scrolls its over-cap
inline content whenever the row exceeds `--dock-max-inline-size` (the intrinsic
`.dock-scroll-x` port; under the cap nothing scrolls), and a VERTICAL rail scrolls
its over-cap block content whenever it exceeds `--dock-max-block-size` (the
unconditional cap-derived shell rule; the `.dock-scroll-y` opt-in class is
retired). The scroll port's CROSS axis is now `overflow-*: clip` +
`overflow-clip-margin: var(--dock-control-safe-inset)` (the mechanically-honest
un-clip — the prior `overflow-*: visible` pin was a latent no-op that CSS Overflow
§3 computed to `auto`), and the over-cap edge feathers via the `<FadingScroll>`
`--fade-scroll-width` mask seam (the liquid-weight soft edge). MIGRATE: drop any
`overflow="scroll"` prop — a capped dock scrolls by construction; set
`--dock-max-block-size` / `--dock-max-inline-size` per-instance to anchor the cap.
Machine-locked by `proof:dock-plate-clearance` (W2 re-pointed onto the `clip` +
`overflow-clip-margin` un-clip + the `.dock-scroll-y`-retired assert + a self-test
bite).

### BI.W-DOCK-FOLD — the dock control/trigger fold + the reka `ui/tabs` retire

The dock greenfield collapses the five legacy control/trigger SFCs onto TWO folded
survivors (`<DockControl>` with a `shape` axis + `<DockTrigger>` with a `for` axis),
retires the reka `ui/tabs` substrate (its sole internal consumer `<DockLayerGroup>`
re-points onto the headless `useSelectionGroup` engine), and retires the demo-only
dock-ITEM drag-reorder axis. Clean break, no alias — every consumer re-points by name.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `DockIconButton` | `DockControl` | `<DockIconButton …>` → `<DockControl …>` (props identical; `shape="icon"` is the default) |
| `DockTabButton` | `DockControl` | `<DockTabButton …>` → `<DockControl shape="tab" …>` |
| `DockSelectTrigger` | `DockTrigger` | `<DockSelectTrigger …>` → `<DockTrigger for="select" …>` |
| `DockDropdownTrigger` | `DockTrigger` | `<DockDropdownTrigger …>` → `<DockTrigger for="dropdown" …>` |
| `DockPopoverTrigger` | `DockTrigger` | `<DockPopoverTrigger …>` → `<DockTrigger for="popover" …>` |

**`<GlassDock draggable-items>` + the `update:order` emit RETIRED** (the demo-only
`useDockItemDrag` dock-item drag-reorder — zero binary consumer, G10 census). A dock
reorder is a consumer concern: compose `useSortable` (`@mkbabb/glass-ui/sortable`).
Drop `draggable-items` + `@update:order` + any `data-dock-draggable` markers.

**The reka `ui/tabs` substrate is DEFINITION-ABSENT** — it was never on a public barrel
(internal-only), so there is no consumer-facing import to migrate. Consumers building tab
UIs already use `<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`).

The blast radius: `DockIconButton` dominated ~24 import sites across ~9 consuming repos —
each is a mechanical by-name rename on the `^5.0.0` bump (the cross-repo ask
`docs/tranches/BI/coordination/W-DOCK-FOLD-asks.md`). `useDockCtaReceive` + `cta-seat.css`
are PRESERVED (the /motion + /dock + /api triple export stays — the pass-2 /dock-only
charge was reversed). Machine-locked by `proof:dock-fold` (F1 components-folded · F2
reka-ui-tabs-retired · F3 cta-seat-preserved · F4 migration-table-complete · F5
useDockItemDrag-retired + 3 self-test bites).

### BI.W-OVERLAY-UNION — HoverPopover + HoverCard fold onto ONE sealed `<Popover>`

The Kronecker fold (UF-P7/UF-J6): the three overlays with the SAME positioned-glass
mechanism collapse onto ONE sealed `<Popover>` with a `trigger` axis (`click` default
· `hover` · `context`) that switches the reka ROOT internally (fine-hover → reka
`HoverCardRoot`; click/context/coarse-hover → `PopoverRoot`), a `role` axis on
`<PopoverContent>` (`dialog` default · `card` → `role="group"` + `aria-label`
passthrough), and the shared `surface` axis. `keepDockOpen` is ONE `watch(open)`
serving both roots. Coarse-pointer hover auto-promotes to tap-toggle (reka's
`excludeTouch` leaves the hover root structurally dead on touch). **Tooltip SURVIVES**
the fold as a genuinely distinct mechanism (`aria-describedby` naming, `role="tooltip"`,
the SR mirror, non-focusable content); `IconTooltip` is its canonical preset. Clean
break, no alias — every consumer re-points by name.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `HoverPopover` (`@mkbabb/glass-ui/hover-popover`) | `Popover` (`@mkbabb/glass-ui/popover`) | `<HoverPopover content side align>…</HoverPopover>` → `<Popover trigger="hover"><PopoverTrigger as-child>…</PopoverTrigger><PopoverContent role="card" :side>…</PopoverContent></Popover>` |
| `HoverCard` / `HoverCardTrigger` / `HoverCardContent` (`@mkbabb/glass-ui/hover-card`) | `Popover` / `PopoverTrigger` / `PopoverContent` | `<HoverCard>…</HoverCard>` → `<Popover trigger="hover">…</Popover>`; `<HoverCardContent>` → `<PopoverContent role="card" aria-label="…">` (the reka `HoverCardRoot` substrate is PRESERVED — imported by the union's fine-hover branch) |
| `hoverOpenDelay` prop | `openDelay` prop | `:hover-open-delay="80"` → `:open-delay="80"` |
| `./hover-popover` subpath export | `./popover` | delete the import spec; import `Popover`/`PopoverTrigger`/`PopoverContent` from `@mkbabb/glass-ui/popover` |
| `./hover-card` subpath export | `./popover` | as above |
| `hover-popover.css` substrate sheet (`.hover-popover-panel` / `.hover-popover-label`) | none | the union content rides the shared `glass-floating` + `glass-reveal` recipe; the bespoke panel substrate is deleted |

`role="dialog"` under `trigger="hover"` is REFUSED (a hover surface cannot be a
modal-adjacent dialog — WCAG 1.4.13): the union dev-warns and falls to `role="card"`
(the documented fallback is `role="dialog" aria-modal="false"`). `IconTooltip` is
byte-unchanged at the call site (it composes the Tooltip family — the disposition only
records it as a preset, NOT its own overlay root). Cross-repo: the `words` hover-card
×12-13 migration + the `atlas` `EasterEgg.vue` hover-popover fold ride the `^5.0.0`
peer-bump asks (`docs/tranches/BI/coordination/asks-and-consumes.md`, filed by
W-FACTOR-ASKS). Machine-locked by `proof:fold-delete` (overlay clause: retired
dir/subpath/export absent ×2, no consumer import, survivor `Popover` present) + the
WCAG 1.4.13 / coarse-pointer / focus-return π (rides the B-close gestalt ceremony).

### BI.W-COMPOSITIONS-PRUNE — the demo storybook prunes 5 misfiled single-component demos out of the `compositions` band

No consumer API change (demo-only IA). The storybook `compositions` band is for REAL SCENES —
components composed into a surface they were built for (auth-shell, settings, empty-states,
form-validation, gate-pattern, the story chassis). Five registrations were SINGLE-library-family
demos misfiled there; each carries an `@mkbabb/glass-ui/*` subpath (one library family owns it), so it
belongs on that family's band. `proof:demo`'s compositions-census (CP1) enforces this: a surviving
`compositions/*` story must carry a `/compositions/*` ROUTE-path subpath, never a library subpath.

| demo | was | now |
|---|---|---|
| Configurator | `/compositions/configurator` | `/containers/configurator` |
| Icon Tooltip | `/compositions/icon-tooltip` | `/containers/icon-tooltip` |
| Instrument Chassis | `/compositions/instrument-chassis` | `/data/instrument-chassis` |
| Labeled Field | `/compositions/labeled-field` | `/forms/labeled-field` |
| Drawer Live-Behind | `/compositions/drawer-live-behind` | folded into `/containers/drawer` (a Live-behind mode section — one comprehensive Drawer page: snap · fixed · live-behind) |

The shipped subpaths (`@mkbabb/glass-ui/{configurator,icon-tooltip,instrument-chassis,labeled-field,drawer}`)
are UNCHANGED — only the demo routes moved. A deep-link to an old `/compositions/*` route 302s to its new
band route via `RELOCATED_STORY_ROUTES` (`manifest.ts`) consumed by W-FOLDED-REDIRECTS (no lattice 404).

### BI.W-HERO-DEMOTE — the standalone `/compositions/hero` demo is demoted to the `/compositions` section landing

No consumer API change (demo-only IA). The standalone `compositions/hero` storybook page (UF-K2 — "what even
is /compositions/hero — this likely needs to be removed or made not a full category item, a sub-page instead")
DUPLICATED the `/compositions` D1 section landing: the chassis already renders the real-scene bento (the composed
scenes as tiles) over the section hero, and the landing subtitle carries the "Real scenes" identity. So the
standalone story is RETIRED — no `compositions/hero` manifest row/route and `demo/stories/compositions/hero.vue`
is deleted; `/compositions` renders the bento landing directly. The audacious flourishes (the `heroScale:"mega"`
rung + the ℱ ornament) were page-specific decoration and die with the page — the section landing keeps the uniform
D1 `hero` rung across all 11 categories (no per-category special-casing). `proof:demo`'s HD arm enforces the
demotion (no standalone row/route + `hero.vue` DEFINITION-ABSENT); `proof:compositions-hero` witnesses the SFC
stays retired.

| demo | was | now |
|---|---|---|
| Hero (Real scenes) | `/compositions/hero` (standalone `heroScale:"mega"` story) | the `/compositions` section landing (the real-scene bento hero) |

A deep-link to `/compositions/hero` 302s to `/compositions` via `RELOCATED_STORY_ROUTES` (`manifest.ts`) consumed
by W-FOLDED-REDIRECTS (no lattice 404).

### BI.W-MENU-TRIGGER — ContextMenu folds onto the Menu family as `trigger="context"`

The Kronecker fold (UF-P7 / FAM-10): ContextMenu owns NO distinct mechanism vs
DropdownMenu — identical reka roving-focus + typeahead, and the items already share ONE
`menuItemVariants` CVA. So the whole `ContextMenu*` family collapses onto the Menu
(`DropdownMenu*`) family with a `trigger` axis (`click` default · `context`) that switches
the reka anchoring family internally (`context` → the reka `ContextMenu*` substrate at the
pointer; `click` → the reka `DropdownMenu*` substrate at the button). ONE menu engine, one
set of items — the trigger is paint/anchoring, not mechanism. `v-model:open` round-trips in
both modes. **Select (listbox) and Combobox (combobox) SURVIVE** the census (distinct ARIA
roles + keyboard models); **Command SURVIVES** as its own command-palette root. Clean break,
no alias — every consumer re-points by name.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `ContextMenu` / `ContextMenuTrigger` / `ContextMenuContent` / …Item / …CheckboxItem / …RadioItem / …RadioGroup / …Label / …Separator / …Shortcut / …Sub* (`@mkbabb/glass-ui/context-menu`) | `DropdownMenu` / `DropdownMenuTrigger` / `DropdownMenuContent` / … (`@mkbabb/glass-ui/dropdown-menu`) | `<ContextMenu><ContextMenuTrigger>…</ContextMenuTrigger><ContextMenuContent>…</ContextMenuContent></ContextMenu>` → `<DropdownMenu trigger="context"><DropdownMenuTrigger>…</DropdownMenuTrigger><DropdownMenuContent>…</DropdownMenuContent></DropdownMenu>` (rename `ContextMenu*` → `DropdownMenu*` at every node; add `trigger="context"` on the root) |
| `./context-menu` subpath export | `./dropdown-menu` | delete the import spec; import the `DropdownMenu*` family from `@mkbabb/glass-ui/dropdown-menu` |

The `--dropdown-menu-{bg,border,shadow}` consumer-retunable tokens (value.js L11) join the
existing `--dropdown-menu-font` on `.dropdown-menu-content` (menu.css) — ONE menu-plate
token surface a consumer retunes via a `:root` override, no-op at its default. Machine-locked
by `proof:fold-delete` (menu clause: retired dir/subpath/export absent, no consumer import,
survivor `DropdownMenu` present) + the roving-focus/typeahead-parity π (`trigger=context`
right-click reads identically to `trigger=click`, Chrome + WebKit, both modes; rides the
B-close gestalt ceremony). No cross-repo ContextMenu consumer in the round-2b roster
(invariant-11 probe confirmed at execution).

### BI.W-MULTISELECT-FOLD — MultiSelect folds onto `<Combobox multiple>`

The Kronecker fold (D-FACTOR PASS-1 §B): `MultiSelect` was a `Popover` + `Command`
composition over the SAME Combobox-family mechanism (a filtered listbox with a
selection model) — no distinct mechanism, so it folds onto `<Combobox multiple>`. reka's
`ComboboxRoot` carries `multiple` natively (an array `v-model` + `by` comparison); the
selected values render as **chips-in-trigger** via the shared glass-chip capsule register
(the TagsInput chip register — `.glass-chip .glass-capsule`), read from the forwarded
root `modelValue` slot state. `MultiSelect` was a root-barrel-only export (NO subpath at
HEAD), so there is no `./multi-select` package export to retire. Clean break, no alias.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `MultiSelect` / `MultiSelectOption` (root barrel `@mkbabb/glass-ui`) | `Combobox` (+ `multiple`) (`@mkbabb/glass-ui/forms`) | `<MultiSelect v-model="arr" :options="opts" placeholder="…" :max-display="3" />` → `<Combobox v-model="arr" multiple>`, composing `<ComboboxAnchor>` (render selected chips-in-trigger from the `modelValue` slot on the glass-chip capsule register) + `<ComboboxList>` / `<ComboboxInput>` / `<ComboboxItem :value>` (the same filtered items). The prior `:options` array becomes explicit `<ComboboxItem>`s; `:max-display` has no analogue (the chips-in-trigger wrap, they do not collapse to `(+N)`). |

The single-select `<Combobox>` (multiple unset) is byte-identical — the `multiple` prop is
additive on the shared root. No cross-repo consumer: `MultiSelect` was demo-only at HEAD
(the invariant-11 registry + foreign-tree probe found 0 external consumers). Machine-locked
by `proof:fold-delete` (multiselect clause: retired `ui/multi-select` dir absent, survivor
Combobox `multiple` capability present) + the a11y-axe multiple-arm (selected-option
announcements) + the story-fold π (the chips-in-trigger read, both modes; rides the B-close
gestalt ceremony).

### BI.W-CHIP-FOLD — ToggleChip + SelectableChip fold onto ONE `<Chip>`

The Kronecker fold (D-FACTOR FACTOR-B / UF-P7 / FAM-10): `ToggleChip` and `SelectableChip`
were ONE interactive lozenge over ONE CVA — `ToggleChip`'s `variant` (`chip`/`cell`) is a
pure NAME-SYNONYM of `SelectableChip`'s `shape` (`pill`/`cell`). They collapse onto ONE
`<Chip>` with `shape: pill | cell` × an opt-in `tone` (the contrast-floored tonal-accent
register) × the shared `surface` axis. The `variant`/`shape` merge is compile-time (the CVA
folds); `shape=pill` ≡ the retired `ToggleChip variant="chip"`, `shape=cell` ≡ `variant="cell"`,
and an unset `tone` ≡ the plain warm-floor glass toggle (byte-identical). `<Chip>` ships
subpath-ONLY (`/chip`, OFF the value.js-free root barrel): its tonal ink solve is
value.js-bearing, quarantined behind a dynamic `import('./accent-tone-solve')` boundary
INSIDE `useAccentTone` (the sync value.js-FREE shell — the measured 26KB payload rides the
dynamic leaf, the `/border-progress` BC.W-AX-BP-LAZY carve-off precedent), so a plain-boolean
toggle (a `var()` / unset tone) stays ~1KB value.js-free. `IconChip` is KEPT (a distinct
mechanism, resolved-by-distinctness); `Badge` SURVIVES (static, non-interactive). Clean
break, no alias.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `ToggleChip` (`@mkbabb/glass-ui/toggle-chip`) | `Chip` (`@mkbabb/glass-ui/chip`) | `<ToggleChip v-model="on" variant="chip">…</ToggleChip>` → `<Chip v-model="on" shape="pill">…</Chip>`; `variant="cell"` → `shape="cell"` (`pill` is the default, so `variant="chip"` may drop to bare `<Chip>`) |
| `SelectableChip` (`@mkbabb/glass-ui/selectable-chip`) | `Chip` (`@mkbabb/glass-ui/chip`) | `<SelectableChip v-model="on" :tone="t" size="lg">…</SelectableChip>` → `<Chip v-model="on" :tone="t" size="lg">…</Chip>` (the `tone` prop is unchanged — the tonal register is now opt-in on the ONE `<Chip>`) |
| `toggleChipVariants` / `ToggleChipVariants` (`/toggle-chip`) | `chipVariants` / `ChipVariants` (`/chip`) | rename the recipe + type; the CVA axis is now `size × shape` (the `variant`→`shape` name-synonym; the `selectableChipVariants`→`chipVariants` shim was already SWEPT at BG.W-DEAD-SWEEP) |
| `./toggle-chip` + `./selectable-chip` subpath exports | `./chip` | delete the import specs; import `Chip` / `chipVariants` from `@mkbabb/glass-ui/chip` (a value.js-bearing subpath — NOT re-added to the root barrel) |

`<Chip>`'s eager `/chip` chunk is value.js-FREE (a static-only critical-path walk reaches ZERO
value.js; `accent-tone-solve.ts` is reached ONLY by the dynamic `import()`), so a `var()` tone
never loads the 26KB value.js math — a concrete `#hex`/`oklch(…)` tone lazily upgrades the
label ink the next tick. Cross-repo `ToggleChip`/`SelectableChip` consumers ride the `^5.0.0`
peer-bump asks (`docs/tranches/BI/coordination/asks-and-consumes.md`, filed by W-FACTOR-ASKS;
confirm via the invariant-11 registry probe). Machine-locked by `proof:fold-delete` (chip
clause: retired `toggle-chip` + `selectable-chip` dir/subpath/export absent ×2, no consumer
import, survivor `Chip` present) + `proof:accent-tone` A2 (the value.js QUARANTINE — the
`accent-tone-solve` leaf bears value.js, the sync shell does NOT) + the value.js-boundary walk
(the `proof:bp-lazy`-style eager-graph assert) + the B-close gestalt ceremony (the pill/cell/
tonal chip byte-faithful to the retired pair, both modes).

### BI.W-SURFACE-EXTRACT — `CardTier` folds onto the `surface` axis

The bare (tier × decoration) glass plate is extracted as `<Surface>` (published at
`@mkbabb/glass-ui/surface`); `Card`'s legacy tier spellings fold onto the same axis.
Clean break, no alias.

| Retired (5.0.0) | Replacement |
|---|---|
| `CardTier` `"opaque"` (tier prop spelling) | `surface="opaque"` on `Card`/`Surface` |
| `CardTier` `"deep"` (tier prop spelling) | `surface="deep"` on `Card`/`Surface` |

Machine-locked by `proof:surface-axis` W7/W8 (the wart census is zero + `<Surface>`
publishes; the private-union floor holds).

### BI.W-CLEAR-FOLD — the dead `surface="clear"` member retired

The `surface="clear"` decoration member (BE.W-CLEAR-VARIANT — the Apple-Clear
maximally-translucent plate + its mandatory `::before` legibility scrim) is RETIRED as
dead substrate: a full mechanism with ZERO binding consumers (0 in-repo + 0 across
atlas / speedtest / slides / value.js / keyframes.js at npm 4.2.0 — the substrate-
without-consumer invariant J-inv-10). Clean break, no alias.

| Retired (5.0.0) | Replacement |
|---|---|
| `surface="clear"` (Surface union member) | none — the member is gone; use `surface="glass"` (the maximal translucent default) or `surface="veil"` (the borderless text plate) |
| `--glass-bg-clear` / `--glass-opacity-clear` tokens | none (rung census 11→10; the `.glass-clear` decoration + the `[data-surface="clear"]` scrim rule die with the member) |

No paint changes for any surviving surface (a dead member painted nowhere). No consumer
migration is owed — the 0-consumer state was verified at the retire (the inv-11 registry +
foreign-tree probe). Machine-locked by `proof:surface-axis` **W9** (member-consumption:
every `Surface` union member resolves ≥1 real non-demo/non-self consumer in `src/` OR is
DEFINITION-ABSENT — the vacuous-green a dead member used to ride is closed) + the coupled
retirement of `proof:glass-foundation`'s A3 clear arm (the gate that verified the member
dies WITH it) + the `proof:encapsulation` G2 3-member re-green.

### BI.W-DIALOG-PLACEMENT — Sheet folds onto `<Dialog placement>`; ConfirmDialog → a Dialog preset

The Kronecker fold (D-FACTOR FACTOR-B): `Sheet` was the SAME reka `DialogRoot` + the
SAME FocusScope as Dialog — its side-slide is PAINT, not a distinct mechanism — so it
folds onto a `<DialogContent placement="center | top | right | bottom | left">` axis
(`center` default = the byte-identical centered modal; the four side values are the
retired Sheet sides). The per-side rounding/border + the `sheet-animate` slide register
are the retired `sheetVariants` arms verbatim; the structural positioning ships
PRECOMPILED off `[data-slot="dialog-content"][data-placement]` (`dialog-placement.css`,
the renamed `sheet.css`). **`ConfirmDialog` DEMOTES to a Dialog preset** — its
promise/`v-model:open` opener was thin (a glass `<DialogContent :show-close="false">` +
a title/description + a confirm/cancel footer + a loading dismiss-guard), a CONSUMER
composition now (presets live in consumers), not a shipped component. Clean break, no
alias.

**THE N3 DISAMBIGUATION RULE:** `Dialog[placement]` is NOT `Drawer`. **Drawer SURVIVES** —
it owns the snap-detent spring physics + the live-behind non-modal focus model + a
keyframes-bearing chunk (a mechanism no survivor expresses). A side sheet with no detents
is `<Dialog placement="right">`; a detented bottom sheet over a live surface is `<Drawer>`.
Placement is a Dialog paint axis; snap-physics is Drawer's mechanism — disjoint, never a
third fork. Sheet's `dragDismiss` gesture does NOT carry into the fold (it was the JS
slide-spring — Drawer's mechanism).

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `Sheet` / `SheetTrigger` / `SheetContent` / `SheetHeader` / `SheetTitle` / `SheetDescription` / `SheetFooter` / `SheetClose` (`@mkbabb/glass-ui/sheet`) | `Dialog` / `DialogTrigger` / `DialogContent` / `DialogHeader` / `DialogTitle` / `DialogDescription` / `DialogFooter` / `DialogClose` (`@mkbabb/glass-ui/dialog`) | `<Sheet>…<SheetContent side="right">` → `<Dialog>…<DialogContent placement="right">`; every `Sheet*` sub-part → its `Dialog*` twin (same slot shape) |
| `<SheetContent side="top\|right\|bottom\|left">` | `<DialogContent placement="…">` | `side="right"` → `placement="right"` (the prop renames; `placement="center"` is the new default centered modal) |
| `<SheetContent dragDismiss dragThreshold>` | `<Drawer>` (snap physics) | a drag-dismissable bottom sheet is a `Drawer` (detents + live-behind), not a placement Dialog — re-point to the Drawer family |
| `SheetVariants` (type, `/sheet`) | `Placement` axis (`@mkbabb/glass-ui`) | `SheetVariants['side']` → `Placement` (`"center" \| "top" \| "right" \| "bottom" \| "left"`); no successor CVA type (placement is an axis restriction, not a `variant` map) |
| `ConfirmDialog` (`@mkbabb/glass-ui/confirm-dialog`) | `Dialog` preset (consumer composition) | `<ConfirmDialog v-model:open title description confirm-label destructive :loading @confirm>` → a `<Dialog v-model:open><DialogContent surface="glass" :show-close="false" @escape-key-down @interact-outside>` with a `<DialogHeader>` title/description + a `<DialogFooter>` cancel/confirm `<Button>` pair (the confirm reads `tone="destructive"` when destructive — the tone axis, see BI.W-BUTTON-TONE below; the loading guard `preventDefault`s the dismiss intents while in-flight) — the demo `feedback/confirm-dialog` story shows the full preset inline |
| `./sheet` subpath export | `./dialog` | delete the import spec; import from `@mkbabb/glass-ui/dialog` |
| `./confirm-dialog` subpath export | `./dialog` | as above — compose the confirm preset over `Dialog` |
| `sheet.css` (`[data-slot="sheet-content"][data-side]`) | `dialog-placement.css` (`[data-slot="dialog-content"][data-placement]`) | the precompiled overlay-positioning file renames; the `:where()` consumer-override specificity is unchanged |

The folded side sheet reads the Dialog `--glass-bg-dialog` glass rung (the fold's whole
point — ONE dialog material; the retired Sheet read the floating rung — a plate-α shift,
NOT a slide-geometry change: the enter travel is byte-identical). Dialog `variant`→`surface`
is the separate BA.W-SURFACE-AXIS clean break (documented above). Cross-repo: no external
`/sheet` or `/confirm-dialog` consumer found (the configurator gear-sheet is internal-demo,
ConfirmDialog was demo-only); the `^5.0.0` peer-bump ask covers any downstream importer
(`docs/tranches/BI/coordination/asks-and-consumes.md`, filed by W-FACTOR-ASKS). Machine-
locked by `proof:fold-delete` (dialog-sheet clause: retired `ui/sheet` +
`custom/confirm-dialog` dirs/subpaths/exports absent, no consumer import, survivor `Dialog`
present) + the edge-slide + focus-return π (Chrome + real WebKit, both modes; rides the
B-close gestalt ceremony).

### BI.W-BUTTON-TONE — `Button.destructive` migrates off `variant` onto the `tone` axis

The Kronecker factorization reaches the library's oldest component (PASS-4B ruling 5 — "destructive
IS a tone"). `destructive` was a `variant` CVA member — but a destructive intent is a SEMANTIC TONE,
not a style/surface register, so it moves onto the ORTHOGONAL `tone` axis (`_shared/axes.ts`'s `TONES`
tuple, the ONE grammar home). `variant` is now STYLE-only (`default`/`primary-audacious`/`gold-audacious`/
`outline`/`secondary`/`accent`/`ghost`/`glass`/`glass-wash`/`ai`/`link`) — machine-locked by
`proof:variant-residual` (no tone/size/surface concept may hide in a `variant` map). The four-state
fill/hover/active/aria-pressed recipe moves VERBATIM onto the `tone.destructive` arm (the byte-identical
CVA rows); `tone="neutral"` is the tone-less default (the variant paints alone). Clean break, no alias.
`ButtonVariants['tone']` publishes on `/api` in lockstep (it re-derives off the CVA `tone` map — no
separate api edit).

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `<Button variant="destructive">` | `<Button tone="destructive">` | the destructive register is a `tone`, not a `variant`; `variant` is reserved for STYLE members. `tone` composes ORTHOGONALLY (a destructive `outline`/`ghost` is now expressible: `<Button variant="outline" tone="destructive">`) |
| `ButtonVariants['variant']` member `"destructive"` | `ButtonVariants['tone']` member `"destructive"` | the CVA `variant` map DROPS `destructive`; the CVA `tone` map ADDS it (`"neutral" \| "destructive"`, default `neutral`) |

Cross-repo: the consumer call-site migration (`<Button variant="destructive">` → `<Button tone="destructive">`
in words/atlas/muster/sci-report, paired with the kf `^5.2.0` + value `^3.1.0` peer bump) is filed by
`BI.W-FACTOR-ASKS` on the `docs/tranches/BI/coordination/asks-and-consumes.md` roster. Machine-locked by
`proof:variant-residual` (the `button:destructive` residual GREENs when `destructive` is a `tone` value +
DEFINITION-ABSENT from the `variant` map) — jointly with `BI.W-SYNONYM-RENAMES` (the alert/badge tone
residuals). The tone byte-diff rides `W-SYNONYM-RENAMES-DELTA.md` + the B-close gestalt ceremony.

### BI.W-SYNONYM-RENAMES — the library-wide synonym-rename law (`type`/`variant` tone · `direction` · `position` · `ToastVariant`)

The synonym-de-duplication law (UF-P7; FAM-10 mechanism-distinctness — a synonym is a name-duplicate, not a
distinct mechanism). Every rename is a NAME rename with ZERO value change (byte-identical paint); the `/api`
surface moves in lockstep (the old synonym name is DEFINITION-ABSENT, no alias, no dual path).

**Tone axis** — the semantic status register (success/warning/info/destructive + neutral) moves off the
`type`/`variant` maps onto the ONE shared `tone` axis (`_shared/axes.ts`'s `TONES` tuple), machine-locked by
`proof:variant-residual` (no tone concept may hide in a `variant`/`type` map). Byte-identical paint: each tone
still resolves the SAME classes/`.feedback-tone-<name>` register.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `<Alert variant="destructive\|success\|warning\|info">` | `<Alert tone="…">` | the CVA `variant` map → a `tone` map; `variant:'default'` → `tone:'neutral'` (the un-toned glass-wash base). `Alert` now emits `:data-tone` |
| `<Badge variant="destructive\|success\|warning\|info">` | `<Badge tone="…">` | `variant` stays STYLE-only (`default`/`secondary`/`outline`); a new orthogonal `tone` map carries the semantics (`tone` declared AFTER `variant` so a set tone wins the `cn` merge — byte-identical). `Badge` emits `:data-tone`; the glass register keys off `.badge-atom--glass[data-tone='…']` (glass-atom.css re-keyed) |
| `Toast.variant?: ToastVariant` (`'default'\|'destructive'\|…`) | `Toast.tone?: Tone` | the private `ToastVariant` union RETIRED — the toast status reads the ONE shared `Tone` axis (`default` → `neutral`). `Toast` emits `:data-tone`. `ToastVariant` export DROPPED from `/api` (`src/api/index.ts`) + the toast barrel; the tone type publishes as `Tone` via `@mkbabb/glass-ui/axes` |
| `Notification` item `type: 'success'\|'error'\|'info'\|'warning'` | item `tone: 'success'\|'warning'\|'info'\|'destructive'` | the `type` synonym → `tone` (a TONES subset); `error` was `destructive`'s synonym → folded (clean break). Zero paint change (same `.feedback-tone-<name>`) |

**Orientation / Placement axis** — the layout/side synonyms fold onto the shared axis vocabulary:

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `<StackedIconGroup direction="horizontal\|vertical">` | `<StackedIconGroup orientation="…">` | `direction` → the shared `orientation` vocabulary (`StackedIconGroupProps.direction` → `.orientation`; `:data-direction` → `:data-orientation`, the SFC CSS re-keyed). Zero value change |
| `HeaderRibbon.position?: HeaderRibbonPosition` (`'left'\|'right'`) | `HeaderRibbon.placement?: HeaderRibbonPlacement` | `position` → the shared `placement` vocabulary (a PLACEMENTS subset); the type `HeaderRibbonPosition` → `HeaderRibbonPlacement` (published on `/api`). Zero value change |

Cross-repo: the consumer call-site migration (words/atlas/muster/sci-report, paired with the `^5.0.0` peer
bump) is filed by `BI.W-FACTOR-ASKS` on `docs/tranches/BI/coordination/asks-and-consumes.md`. Machine-locked by
`proof:variant-residual` (the alert/badge tone residuals GREEN) — jointly with `BI.W-BUTTON-TONE`. The
`register`→`size` (SelectTrigger, already `size`) + `ToggleChip.variant`→`shape` (BI.W-CHIP-FOLD) rows of the
law are recorded in their own waves. Distinct-mechanism holdouts (NOT synonyms — flagged as riders, not
renamed): `SortableList.axis` (`x\|y` drag-axis, not orientation), `DockStack.position` (`start\|end`
alignment), `MetricStack.register` (`audacious\|result` display-mode, would break `size-grammar`),
`Toaster.position` (corner anchor), `Drawer.direction` (reka/vaul forward prop). The tone/orientation byte-diff
rides `W-SYNONYM-RENAMES-DELTA.md` + the B-close gestalt ceremony.

### BI.W-GLASS-DEDUP — `GlassPanel` retires onto `Card` / `<Surface>` / `.glass-resting` (the ONE refraction door)

The FAM-10 mechanism-distinctness ruling (UF-B2): `<GlassPanel>` owned NO distinct mechanism — its tier map
was Card's, its surface was the shared `surface` resolver, and its `useGlassRenderer`/`createGlassFilter`
JS-canvas `feDisplacementMap` was a SECOND refraction path competing with the house `.glass-lens` /
`#glass-refract` axis. A slotless glass surface needs no component: `<Surface tier surface>` (or the bare
`class="glass-resting"` utility) serves the plate case, and `.glass-lens` serves the refraction case. Clean
break, no alias — the component, its subpath, its `/api` type, its tier-proof gate, and the JS-canvas
refraction builder all retire together.

| Retired (5.0.0) | Survivor | Rename |
|---|---|---|
| `GlassPanel` (`@mkbabb/glass-ui/glass-panel`) | `Card` / `<Surface>` / `class="glass-resting"` | `<GlassPanel tier="resting">…</GlassPanel>` → `<Surface tier="resting" surface="glass">…</Surface>` (or the bare `class="glass-resting"` on the plate); a refraction case re-points onto `class="glass-lens"` |
| `GlassPanelProps` (type, `/api`) | none — retired outright | no successor type; `<Surface>` publishes `SurfaceProps` (the shared tier × surface axis) |
| `./glass-panel` subpath export | `./card` / root `<Surface>` | delete the import spec; import `Card`/`Surface` from `@mkbabb/glass-ui` (root) or `@mkbabb/glass-ui/card` |
| `useGlassRenderer` / `createGlassFilter` / `destroyGlassFilter` (the JS-canvas refraction builder) | `.glass-lens` / `#glass-refract` (the ONE declarative refraction door) | a bespoke JS `feDisplacementMap` builder is gone — the refraction is the single `.glass-lens` opt-in on the SOTA-degrade ladder |
| `.glass-card` (co-selector alias) | `.glass-resting` | fold the alias onto `.glass-resting` (pure co-selector; byte-identical) |

Byte-diff: every GlassPanel-slot demo now mounting `<Surface>` / `class="glass-resting"` is 0-delta at the
shared tier rungs (GlassPanel's tier map ≡ Card's); any refraction demo re-points `.glass-lens`. Cross-repo:
the glass-panel usage (5 sites / 2 repos — **atlas ×3**, **sci-report ×2**) rides the `^5.0.0` peer-bump ask
(`docs/tranches/BI/coordination/asks-and-consumes.md` row 8, filed by `BI.W-FACTOR-ASKS`). The
`composables/glass/index.ts` keyframes.js-binds-`/glass-panel` claim was RE-PROBED read-only at HEAD — no live
sibling binds it, so the delete is silent-safe. Machine-locked by `proof:fold-delete` (glass-panel clause:
`custom/glass-panel/` dir + `/glass-panel` subpath + `GlassPanelProps` DEFINITION-ABSENT, no live `GlassPanel`
import in `src/`, survivor `.glass-resting`/`<Surface>` present — the residual package.json `./glass-panel`
export drop is the orchestrator regen) + `proof:no-dual-path` (single refraction door: builders=0) +
`proof:migration-truth` (the dead `GlassPanelProps→/glass-panel` re-home row removed).

### BI.W-XR-PRODUCER-REPAIRS — the dist `--default-transition-duration` routes through `--duration-fast` + the display/heading/title weight axis

Two producer-red repairs surface a consumer-visible token behaviour (the rest — the
spectrum-thumb focus-ring pairing, the WatercolorDot solid-ring floor, the
`backdrop-filter: none` prefix policy — are internal fixes with no API change):

- **PKT-1 (value.js P2)** — the emitted `dist/styles/components.css` R3 base block no
  longer re-declares a **bare** `:root { --default-transition-duration: 150ms }` over a
  consumer's own `@theme` alias. It now routes THROUGH the house token —
  `--default-transition-duration: var(--duration-fast, 150ms)`. Consumer impact: a
  bare `@import "@mkbabb/glass-ui/styles"` consumer's Tailwind `.transition-*`
  utilities now read the house `--duration-fast` (0.2s) as their default duration
  (was the frozen 150ms), and a consumer that retunes `--duration-fast` (or its own
  `--default-transition-duration` `@theme` alias) now GOVERNS them instead of being
  clobbered. No import or class rename — a felt-duration retune only.
- **X7 (value.js P10/T-40)** — new customization tokens `--type-weight-display` (600),
  `--type-weight-heading` (700), `--type-weight-title` (700). The `text-display*` /
  `text-heading` / `text-title` utilities read them instead of hardcoded weights, so a
  consumer dials the bold-letterform character from ONE override. Purely additive
  (defaults byte-identical); no break.

Machine-locked by `proof:xr-producer-repairs` (X1 duration-through-token on the fresh
dist + X7 tokens-declared + `text-title` reads `var(--type-weight-title)`).

**Deferred (NOT in this cut):** the T-45 glass-ladder backdrop edge-bleed (X2) — its
oversampled-pseudo cure is architecturally blocked at the rung (both pseudos claimed;
`.btn-glass`/`.glass-deep`/the dock re-declare `backdrop-filter` on the host, so moving
the plate to a pseudo double-blurs those consumers; the edge rim interferes with an
edge-oversampling blur). Routed to a wrapper-architecture follow-up + the #92 paint
batch (see `docs/tranches/BI/audit/visual/W-XR-PRODUCER-REPAIRS-DELTA.md`). Likewise the
X5 `color-mix`-@property-collapse on bare `.glass-wash` is booked to #92 (a live-paint
engine repro).

## 4.1.0

**BC.W-VIZ-FOURIER — the Canvas2D fourier renderer + the three-view split RETIRED
onto the WebGPU-first `useFourierField`. Clean break, no alias ("No legacy code").**
The fourier surface — three views (`fourier-field.vue` + the foreground
`fourier-studio.vue` over `FourierStudioStage.vue`) on a Canvas2D renderer the §E
"WebGPU everywhere, no canvas" mandate forbids — COLLAPSES to ONE GPU view and
MIGRATES off Canvas2D onto the WGSL-primary GPU substrate (`createGpuSubstrate`,
`setupWGPU` + `setupGL`). **The demo `fourier-studio.vue` + `FourierStudioStage.vue`
are DELETED** (the studio's controllable-clock/N-harmonics/epicycle/ℱ-trace axes fold
into the ONE merged `fourier-field.vue` view; no alias). The Canvas2D-era gates
`proof:fourier-field-intensity` / `proof:fourier-studio` /
`proof:fourier-field-visibility-live` retired with the Canvas2D render they asserted
(the flat-alpha/quadratic intensity model + the phosphor-comet canvas readback are
gone); the new `proof:fourier-field` (U1 ONE-merged-view + the deleted SFCs ABSENT, U2
WGSL-primary-no-Canvas2D, U3 the ONE math source round-trip) is their successor. No
public-prop break — `<FourierField>` keeps its `ConstellationProps`-shaped contract;
only the demo studio split + the Canvas2D substrate are retired. MIGRATE: none for a
library consumer (the public `<FourierField>` surface is unchanged); the demo studio
route folds into the merged view.

**BC.W-VIZ-CONSTELLATION — the Canvas2D `drawOverlay` frozen-`now` handoff gate
`proof:constellation-freeze-live` RETIRED with the migration. Clean break, no alias.**
The constellation re-homes off the Canvas2D substrate (the low-res `ctx.arc()` discs +
the 2D `drawOverlay` skin seam) onto the WebGPU instanced-points+lines substrate
(`createGpuSubstrate`); the `drawOverlay` overlay-painter seam is INERT post-migration
(the lattice renders on the GPU, not a 2D context, so the render loop never invokes
`drawOverlay`). `proof:constellation-freeze-live` measured the `drawOverlay`
frozen-`now` handoff — a Canvas2D-era internal the GPU re-home deleted — so it retired;
the SURVIVING field-freeze determinism (under `prefers-reduced-motion` two frames are
IDENTICAL) is covered by the new `tests-visual/constellation.spec.ts` PRM-freeze π.
`drawOverlay` stays a public `ConstellationProps` prop (a consumer-skin seam) but is
no longer painted by the built-in GPU loop. The new `proof:viz-constellation` (C1 no
Canvas2D / `constellationDraw.ts` DELETED, C2 crisp SDF circle, C3 instanced quads, C4
the ONE math source) is the migration's source gate. MIGRATE: none for a library
consumer.

**BC.W-RADIO-FIX / Band 6 — `<Button variant="solid">` RETIRED (clean break, no
alias, "No legacy code").** The `solid` variant was a back-compat escape hatch (the
previous default's opaque `bg-primary` fill, "so consumers can still get the solid
look") — unused in-repo and at odds with the glass-first identity. MIGRATE: the
default `<Button>` is the glass register; for a loud CTA use `variant="accent"` (the
gold-tint-on-glass). This flips `proof:no-shadcn-default` fully GREEN (the last
shadcn-neutral surface-fill residual removed). The `default`/`outline`/`secondary`/
`accent`/`ghost` variants are unchanged (`destructive` LATER migrates off `variant`
onto the `tone` axis at BI.W-BUTTON-TONE — see below).

**BC.W-DOCK-STACK-RAIL — `<DockRail>` + `DockRailItem` RETIRED onto the macOS
hover-expand `<DockStack>` + `DockStackItem`. Clean break, no alias ("No legacy
code").** The AZ.W-RAIL3 divider-carousel rail (a floating strip of detached glass
chips on a connective hairline at a measured `<DockSeparator>` seam) CONTRADICTED the
verbatim macOS-stack ask, so it is rebuilt from scratch as the stack: a core anchor
item whose N members FAN OUT next to the rail on hover/focus (3 configurable + scrollable
n-stack via `<FadingScroll>`), extending beyond the dock edge into its own gutter so it
clears `<main>` BY TOPOLOGY. **`DockRail` + `DockRailItem` are GONE from
`@mkbabb/glass-ui/dock`** (the export names + the SFC `DockRail.vue` + the
`src/styles/dock/rail-extend.css` chip partial + the `measureSeam` /
`--dock-rail-seam-offset` seam-locator all DELETED, no alias). MIGRATE: `<DockRail
v-model:context :items>` → `<DockStack v-model:selected :items>` (`DockRailItem` →
`DockStackItem = { id, label, icon?, onSelect? }`); the in-dock-`<DockLayerGroup>`
contextual pattern stays the route-keyed seam — only its render target is the stack rail
(demo-only; no library API there). Machine-locked by `proof:dock-stack-rail` (S1 asserts
the divider-carousel DEFINITION-ABSENT; S2-S6 own the new `<DockStack>` seat / fan-out /
overflow / topology / one-registry). The `proof:rail3` gate retired with it; the
SECTION-GROUPING half of `proof:dock-sections` (S1 the `<DockSection>` zones + S4 the
shell adoption) stays GREEN.

ADDITIVE (4.1.0): `@mkbabb/glass-ui/border-progress` — `<BorderProgress>`, the masked-conic
border-ring primitive (progress IS the element's border; BB.W-BORDER-PROGRESS). A net-new public
subpath (off the root barrel) shipped at 4.1.0. The 4.1.0 note that "the speedtest AW.W7 consumer
binds it on `^4.1.0`" did NOT hold — speedtest hand-rolls its own bar (0 binary consumers), so the
subpath is RETIRED at the 5.0.0 cut (banked dormant), see "The `/border-progress` subpath
retirement" below. Re-entry = the speedtest adopt ASK.

ADDITIVE (4.1.0): `--instrument-dial-min-block-size-desktop` (BB.W-DESKTOP-RESERVE) — the wide-axis
(desktop) chassis dial reserve now ships in the library (`@container chassis (min-width: 45rem)` on
`.instrument-dial`, default `var(--chassis-max-block-size)`). A consumer that authored a local wide-axis
reserve interim (e.g. speedtest's `.instrument-dial { min-block-size: var(--chassis-max-block-size) }`,
AW.W4.1) DELETES it on consume — byte-equivalent at the default; retune via the token if the meter block-size differs.

CANONICALIZED (4.1.0): `--glass-opacity-{tier}` per-tier alpha — documented + gated (BB.W-CARD-TIER-ALPHA); values byte-unchanged, a consumer that re-pinned the same tier alphas (e.g. speedtest register.css) deletes its override on consume.

ADDITIVE (4.1.0): aurora `warpMode` gains `"curl"` — the Bridson curl-noise flow warp (opt-in; the default fbm/cellular/hybrid render byte-identical). The published `WarpMode` union widens additively; no break (BB.B1).

ADDITIVE (4.1.0, BB.W-SURFACE-AXIS-COMPLETE): the shared `Surface = "glass" | "veil" | "opaque"`
axis reaches the last two surfaces R8-12 named verbatim — `<Toast>` and `<Button>` each gain a
`surface` prop (the Card-`surface`-gains-`veil` precedent). `<Toast surface="glass">` (the default,
byte-identical to today's `glass-floating` plate) composes WITH the `variant` tone arm — the
feedback-tone tint rides ON the resolved surface, orthogonal to the {glass·veil·opaque} decoration.
`<Button surface=…>` defaults UNSET (the `variant` axis owns Button's default); `surface="opaque"`
and the `solid` variant are the same `--glass-level:0` endpoint reached from two axes (NOT
duplicated recipes). No break for either.

**ADDITIVE (4.1.0, BB.W-ON-GLASS-FG) — the surface-aware FOREGROUND register (the dark-theme
whisper collapse closed).** glass-ui mints a THREE-RUNG on-glass foreground family whose
contrast TARGET is the COMPOSITED content-tier glass FILL, not the canvas: `--on-glass-muted`
(+ `--on-glass-muted-strong`), `--input-on-glass`, and `--progress-track-on-glass`. The
glass-first MAXIMAL default (AX.W54) makes a caption/well/track over a TRANSLUCENT glass plate
the common case, where the canvas-calibrated `--muted-foreground` (= `--neutral-5`, "AA vs
page") COLLAPSED on its own surface (1.15-3.29:1 measured in dark theme). The calm-light content
tiers (`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) now re-point
`--muted-foreground` → `--on-glass-muted` (+ the `-strong` twin) BESIDE the BA adaptive-glass
seam (the THIRD state — between page-muted and the bright-bucket full ink; legible-AND-subordinate),
so every `text-muted-foreground` caption + CardDescription inherits the on-glass rung with ZERO
per-site edit. Input/Textarea wells read `--input-on-glass`; the Progress default/gradient track
reads `--progress-track-on-glass`. No break, no rename — the page-muted register
(`--muted-foreground: var(--neutral-5)`) is UNTOUCHED for the opaque-canvas case.

CONSUMER-INTERIM DELETION (the ≥2-consumer law closed): a consumer that hand-re-declared
`--muted-foreground` over glass — the slides `deck.css §1` `--muted-foreground`/`-strong`
override, the speedtest WG (secondary-text + value-plate) + WV1 (survey-seat) interims — DELETES
its override on the `^4.1.0` re-pin and INHERITS the library on-glass register. The override that
PROVED the fix retires onto the root.

**BB.W-METAL-SHIMMER — the `@keyframes gold-shimmer-slide` RETIRED onto the
metal-PARAMETERIZED `@keyframes metal-shimmer-sweep`. Clean break, no alias ("No
legacy code").** The gold-only shimmer keyframe generalized into ONE metal-agnostic
position sweep (reading a `--metal-shimmer-color` channel + the `--metal-stop-*`
slots the recipe binds per-metal), so the bronze quad (the third brand metal) + the
gold + silver registers all share ONE keyframe. Two notes:

1. **`@keyframes gold-shimmer-slide` is GONE** — the keyframe NAME is removed (no
   alias). The `.gold-shimmer` CLASS is PRESERVED (it re-points onto
   `metal-shimmer-sweep` with `--metal-shimmer-color: gold`; the gold gradient stops +
   `background-size`/`background-clip` + the PRM bracket are byte-identical — the gold
   READ is UNCHANGED). The `--animate-gold-shimmer` token is PRESERVED (re-pointed onto
   `metal-shimmer-sweep`). MIGRATE only if a consumer referenced `gold-shimmer-slide`
   BY NAME in a hand-rolled `animation:` rule → `animation: metal-shimmer-sweep …`.
   No consumer that composed the `.gold-shimmer` class or read `--animate-gold-shimmer`
   changes.
2. **NEW additive surface (no break).** The bronze quad (`--bronze`/`-light`/`-dark`/
   `-deep` + `--color-bronze*`, the third brand metal on the W-NO-GRAY exception), the
   `--duration-metal: 6s` slow clock, and the `.metal-{gold,silver,bronze}` /
   `.metal-*-border` / `.metal-rainbow-rim` utilities are all ADDITIVE — a consumer
   opts in by composing a `.metal-*` class. The `.metal-rainbow-rim` composes
   W-GLASS-ACCENT's `--glass-accent` rim seam.

## 4.0.0

**BA.W-TABS — the tab family standardized on ONE engine, TWO materials. Clean
break, no alias ("No legacy code").** `SegmentedTabs` is now ONE engine with TWO
MATERIALS (`variant: "pill" | "underline"`) and ONE orientation axis
(`orientation: "horizontal" | "vertical"`). Four retirements:

1. **`variant="segmented"` → `variant="pill"` (the DEFAULT now).** Segmented and
   pill were one register; the user kept "pill" by name. `pill` is the glass
   material — a glass-quiet track + the selected-reads-as-glass (`--glass-bg-floating`)
   indicator, no gray. MIGRATE: drop the `variant="segmented"` prop (it re-defaults
   to `pill`) or rename it to `variant="pill"`. A `<SegmentedTabs>` with no `variant`
   now paints the glass pill.
2. **`overflow="scroll" / "auto"` axis RETIRED.** Overflow is `<FadingScroll>`'s job
   (`@mkbabb/glass-ui/fading-scroll`) at the consumer's own level, not an in-tabs
   scroller. MIGRATE: wrap the strip in `<FadingScroll>` or apply `useFadingScroll`
   where a genuinely-overflowing tab row needs an edge fade (the common ≤4-tab case
   needs none).
3. **`:multi-select` RE-HOMED to `<ToggleGroup>`.** A multi-pressed strip (N
   independent toggles on one surface, `role="group"`) IS a ToggleGroup, not a tab
   family member. MIGRATE: `<SegmentedTabs :multi-select>` →
   `<ToggleGroup type="multiple">` (the IG-B2 glass-track register). The single-select
   string model replaces the prior `string | string[]` union.
4. **`ui/Tabs` (the reka wrapper family: `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`/`TabsIndicator`)
   LEFT the public surface.** It is no longer re-exported from `@mkbabb/glass-ui` or
   `@mkbabb/glass-ui/<ui-tabs>`. The standardized family is `SegmentedTabs`
   (`@mkbabb/glass-ui/tabs`). MIGRATE a hand-rolled `ui/Tabs` recipe to the matching
   `<SegmentedTabs variant="…">` material. (The reka substrate files remain INTERNAL
   solely for the dock-rail consumer `DockLayerGroup` — they are not a consumer
   surface.) The `indicator`/`surface` default-ON baked-plate that painted the R10-2
   oval blob dies with the public surface.

**External migration re-issue (the AY W-CONSUMER ledger, re-stamped at this SHA).**
The 5 DEFERRED external rows (fourier-analysis/web 3× `UnderlineTabs`, words/frontend
2× `BouncyToggle`) re-target the standardized API: `UnderlineTabs` →
`<SegmentedTabs variant="underline">` (the paper material, panel-nav `role="tablist"`);
`BouncyToggle` → `<SegmentedTabs>` (the default pill material — the named-good glass
register). The receiver contract is PRESERVED — `:options` / `:model-value` /
`@update:model-value` + `variant` are unchanged across the standardization, so the
drop-in swap the ledger promises still holds; the `proof:consumer-staleness` allowlist
re-stamps (those rows carry their `{receiver-wave, close-gate}` terminals in the
consumer's own tranche). The `proof:tabs-unified` gate retired-with-re-point onto
`proof:tabs-std`.

**CALLER HAZARD (next cut, BA.W-DEMO-AFFORDANCES) — never stack `.glass-btn` + `.btn-pill`.**
The two button size registers are MUTUALLY EXCLUSIVE: `.glass-btn` is the
FIXED-square icon primitive (`width/height: var(--size-icon-btn)` + `contain:paint`),
`.btn-pill` is the CONTENT-WIDTH text pill. Stacked on one element the fixed square
wins and `contain:paint` clips a wrapped text label into a ~40px blob (the R8-17
defect). A text-bearing `.glass-btn` (an icon button carrying a text child) collapses
the same way even without `.btn-pill`. MIGRATE: for a play/replay or text-bearing
affordance reach for a real `<Button>` with a leading Lucide glyph (the content-width
pill), never an icon-button primitive carrying text. No library recipe changes — the
`.glass-btn`/`.btn-pill` recipes are untouched; this is a caller-side hazard the new
`proof:demo-affordances` gate machine-locks (W1: no class co-occurrence, no text-bearing
icon button across `demo/**` + the `src/styles/**` recipes).

**CLEAN BREAK (next cut, BA.W-SURFACE-AXIS) — Dialog `variant` → the shared `surface` axis.**
`<DialogContent variant="glass|opaque">` is RETIRED onto the ONE shared
`{glass·veil·opaque}` surface-decoration axis: `<DialogContent surface="glass|veil|opaque">`
(no alias — the prior `variant` was Dialog-local and never matched the Card grammar). Migrate
per call site: `variant="glass"` → `surface="glass"` (also the new default), `variant="opaque"`
→ `surface="opaque"`; the `veil` rung is gained for free. The painted output for the `glass`
and `opaque` rungs is byte-identical (the same `glass-floating` / `.glass-opaque` material,
now reached through the shared resolver).

ADDITIVE (next cut, BA.W-SURFACE-AXIS): the shared `Surface = "glass" | "veil" | "opaque"` axis
(published on `@mkbabb/glass-ui/api`) reaches the whole content/floating band — `GlassPanel`,
`Sheet`, `Popover`, `Command`, `Drawer`, and `ExpandableContainer` each gain a `surface` prop
(default `"glass"`, byte-compatible). `<Skeleton>` gains a `surface?: "glass" | "opaque"` prop
(default `"opaque"`, byte-identical to today's `bg-muted`); `surface="glass"` is the NEW
over-glass register (a translucent `--skeleton-glass-bg` block that lets a frosted plate read
through). The `ExpandableContainer` fullscreen overlay now un-walls onto the overlay glass tier
by default (`surface="opaque"` restores the prior solid wall). No break for any of these.

**RENDERED-BEHAVIOUR (next cut, BA.W-EMISSION) — the Select bound + the Slider size axis
now actually PAINT in every consumer.** No API rename — these are EMISSION fixes (the
structural utilities ship as precompiled CSS instead of dead arbitrary-bracket classes a
consumer's content-scan never reached). Three rendered changes a consumer SEES on the bump:
(1) `<SelectContent>` now BOUNDS its content to `min(24rem, 60dvh)` tightened by
`--reka-popper-available-height` with inner `overflow-y: auto` — a tall (16-item-class)
dropdown that previously overflowed the viewport now bottoms INSIDE it and scrolls within
(override the cap via `--select-content-max-h` on any ancestor). (2) `<Slider size="md">`
(and `sm`/`lg`) now renders its REAL track geometry (`md` ≈ 20px / 1.25rem) — the `size`
prop was previously INERT in consumers (fell back to the 6px track); a consumer relying on
that broken 6px-regardless behaviour will now see the correct sized track. (3) glass-ui's
own `@source` directive (for a consumer re-importing the `/styles` cascade) re-points
`"../components"` → `"../*.js"` so it reaches the compiled `dist/*.js` chunks — a consumer
that copied glass-ui's `@source` line verbatim should ensure THEIR `@source` points at the
installed `dist` (per the consumer-wiring section), unchanged guidance.

ADDITIVE (next cut, BA.W-EMISSION): `<WatercolorDot>` gains a `variant?: "solid" | "ghost"`
prop (default `"solid"`, byte-compatible). `variant="ghost"` renders the SAME seeded blob
silhouette as a STROKE (a `color` border over a low-alpha fill) — the empty-palette-slot
affordance, NOT a CSS dashed rectangle. No break.

**BA.W-PAGER — `CarouselDots` RETIRED onto `<PagerDots>` + the counter re-registers
off `bg-card`. Clean break, no alias ("No legacy code").** The carousel dots and the
slides deck `DeckPager` were ALREADY one register; BA.W-PAGER harvests that into ONE
primitive — `<PagerDots>` (`@mkbabb/glass-ui/pager-dots`), encapsulated in a glass pager
pill. Two breaks:

1. **`CarouselDots` → `<PagerDots>` (clean break).** `CarouselDots` is GONE from the
   `/carousel` barrel (it auto-wired the embla API via `useCarousel()` inject).
   `<PagerDots>` is standalone — wire `:count`, `:active` (`v-model:active`), and
   `@select`/`scrollTo` to the embla API explicitly. MIGRATE: `<CarouselDots />` →
   `<PagerDots :count="api.scrollSnapList().length" :active="api.selectedScrollSnap()"
   @select="(i) => api.scrollTo(i)" />`. The pip anatomy (24px hit-box, 6px pip,
   elongate-on-active, the `--foreground` 52%/72%/full register) is IDENTICAL — the dots
   look the same; they now read a `--pager-dot-*` token set (retint the active fill via
   `--pager-dot-active`) and sit in the `.glass-pager-ring` chassis by default
   (`ring="false"` for a flush-on-an-ambient-glass-host deck). `windowFit?` generalizes
   the DeckPager dock-gutter windowing (off by default).
2. **The `<CarouselPager>` counter is off the opaque `bg-card` ring.** The counter
   `<span>` now composes `.glass-pager-ring` (the glass-floating pill) instead of
   `rounded-pill border border-border bg-card` — the dark `rgb(28,25,23)` slab dies.
   No consumer change (the counter is internal to `<CarouselPager>`); a consumer that
   hand-overrode the counter's `bg-card` re-points to the glass ring.

**BA.W-HANDMARK — `GlassUnderline` + the `/underline` subpath RETIRED onto
`<HandMark shape="underline">`. Clean break, no alias (DEC-8 outcome 1).** The d6
hand-voice family re-landed on `@mkbabb/glass-ui/handmark` (`<HandMark>` / `<InkMark>`
+ the flat `BRUSHES` continuum + the pure L1–L3 stages), and the editorial underline
is now ONE shape of that ONE hand voice — not a parallel component. Two breaks:

1. **`@mkbabb/glass-ui/underline` (`<GlassUnderline>`) is GONE.** The `/underline`
   subpath + the `GlassUnderline*` types are removed from the surface (no alias, per
   the no-backwards-compat invariant). MIGRATE: `import { GlassUnderline } from
   "@mkbabb/glass-ui/underline"` → `import { HandMark } from
   "@mkbabb/glass-ui/handmark"`; `<GlassUnderline>word</GlassUnderline>` →
   `<HandMark shape="underline">word</HandMark>`. The editorial draw-on underline is
   `<HandMark shape="underline" animation="draw-on">`; the natural pencil-boil
   morphology (scale-relative amplitude, irregular seeded periods) is the `boil`
   brush (`<HandMark brush="boil" shape="underline">`). The default `pen` brush is a
   clean wobbled line, `grain:0`, no extra dep.
2. **New optional peers (vendored/peer split).** `<HandMark>` adds two OPTIONAL peers:
   `@mkbabb/pencil-boil ^0.4.1` (the L1 wobble geometry — imported only when a wobble
   paints) and `perfect-freehand ^1.2.3` (the variable-width hull body — VENDORED into
   `freehand.ts`, declared as an optional peer for provenance, touched only by the
   `ribbon:"hull"` highlighter). Both are tree-shaken when unused; a `pen`-only
   consumer pulls neither. The `/handmark` chunk is ≈7.6 KiB-gzip (the `profile:budget`
   rebaseline records it + the engaged pf hull body).

**This row is for any FUTURE external `/underline` consumer — NOT slides.** The
2026-06-15 slides ground-truth (BINDING) confirms slides imports ZERO
`@mkbabb/glass-ui/underline` / `GlassUnderline`: its `SlideIntro`/`SlideCloser` red
pen-underlines are deck-LOCAL CSS/SVG `::after` glyphs, never the library component.
The phantom "slides adopt-book break" was the AZ-H6-fold assumption the slides session
disproved at HEAD `c943a49`; there is no slides edit on this fold.

## 3.13.0

**AZ.W-REGISTER-IOS — the dock interactive register is DE-RED'd to the iOS
luminance-lift.** No consumer API rename — this is a TOKEN-knob + demo-preset
change. The dock SELECTED/hover/active/pressed register at the library ROOT is
now the iOS-26/27 glass luminance-lift, not a brand-red accent (R3-6). Two NEW
retint knobs for downstream retinters: `--dock-selected-accent` (the SINGLE knob
for the selected affordance — defaults to `color-mix(in oklab, var(--foreground)
14%, transparent)`, a translucent foreground luminance-lift that auto-flips with
`--foreground`; consumed by the rail leading-edge accent BAR), and
`--dock-control-press-bg` (the iOS press-darken — `--glass-bg-resting` mixed ~7%
toward `--foreground`, read on every dock control `:active`). The rail active
GLYPH + BAR no longer fall back to `var(--dock-rail-active-accent, var(--primary))`;
the glyph stays warm-ink `--foreground`, the bar paints `--dock-selected-accent`.
A consumer that previously re-tinted the selected register to a brand hue via
`--dock-rail-active-accent` should instead set `--dock-selected-accent` (the
luminance-lift knob) — `--dock-rail-active-accent` is no longer read on the rail
glyph/bar default. The demo's `--demo-nav-accent: var(--viz-fourier)` NCSU-red
preset is RETIRED (the demo consumes the neutral root register; presets live in
the consumer, the library's default is the de-red'd iOS register). Brand red
survives only as static ink (the ℱ wordmark / data-viz strokes / gold-CTA family).
Guarded by `proof:register-ios` (a negative predicate that REDs a brand-red
re-introduction on any interactive selector).

**The published cut is v3.13.0 — there is no 3.11/3.12 entry on the registry.** The
AZ tranche's breaks (the dock taxonomy + the metric `amount`→`value` rename + the
constellation generalization + the Card `veil` addition) ALL ship together in the
published **3.13.0**. The interim `3.11.0/.1/.2 + 3.12.0` registry publishes were
STALE-LINEAGE out-of-band publishes from a pre-prune tree (they carry the four
since-retired subpaths and lack `/underline`); the AZ cut SKIPPED them and published
3.13.0 from master via release.yml provenance so `latest` resolves the true close (AZ
FINAL §5). A consumer pins **3.13.0** and reads every break below as landing on that one
release — the number-skip is intentional, the 3.11/3.12 lineage is not the close.

**v3.13.0** — the dock taxonomy clean break (AZ.W-DOCK-TAXONOMY, H2 arm-a):
`<GlassDock variant="rail">` → `<GlassDock orientation="vertical">` (the `variant`
discriminant is removed; a vertical dock is now COLLAPSIBLE by default — it morphs its
`height`; a static nav column adds `always-expanded`). `<GlassDock variant="instrument-strip">`
is removed (zero live consumers) — compose `<InstrumentChassis>` directly; the speedtest
`SurveyResultDock` cockpit re-pins on the 3.13.0 adopt.

BREAKING (3.13.0): `<MetricBadge>` / `<MetricPill>` — the primary prop `amount` is renamed
`value` (the Metric value-core convergence; a valid `0` now renders `0`, never the placeholder).
Clean break, no alias — speedtest re-points on the bump (`/metric-cell` + `/metric-stack`
surfaces unchanged).

ADDITIVE (3.13.0): the `/constellation` subpath gains optional default-OFF generalization
props/exports (pinnedIndex/pinNode, accentEdges, the palette accent/edgeFloor/edgeAccentAlpha,
stepPinnedDrift, warpAutoRelease + warpSettled) — the protected quintet is byte-compatible.

ADDITIVE (3.13.0): the Card `surface` union gains `"veil"` — the borderless/rimless
wash-fill text-legibility plate (`--veil-*` knobs, the optional `--veil-feather` mask). No break.

## 3.10.0

**v3.10.0 (AY, NARROWED at AZ.W-PRUNE2)**—two zero-consumer subpaths RETIRED outright (no
aliases, per the no-backwards-compat invariant): `@mkbabb/glass-ui/deck-progress` +
`/instrument-rail` (0 production consumers at the census,
`docs/tranches/AY/audit/PRUNE-LEDGER.md`). `/header-ribbon` + `/glass-panel` were retired
by the same census and RESTORED at AZ.W-PRUNE2 — the census missed their live keyframes.js
binary consumer (`docs/consumer-evidence/{header-ribbon,glass-panel}.md`); both ship again.
A consumer that referenced one composes the equivalent from the surviving
primitives (`Progress`, `Section`, the `.glass-*` ladder, `InstrumentChassis`).
NEW subpath: `@mkbabb/glass-ui/underline` (`<GlassUnderline>`) — RETIRED at the BA cut
onto `<HandMark shape="underline">` (see the BA.W-HANDMARK row above; it never reached
a real consumer, the 3.11/3.12 publishes were stale-lineage).

## 2.0.0 (AI.W1 R3) — motion subpath surgery

**v2.0.0 (AI.W1 R3)**—the motion composables move off the root barrel to
the new `@mkbabb/glass-ui/motion` flat subpath, closing the
AI-CARRY-GLASS-UI-KEYFRAMES-EDGE 4-tranche chronic. See the **v2.0.0**
section below for the full symbol list + codemod hints. Same SCC-trap
closure shape as L.W1 Lane C — different heavy peer
(`@mkbabb/keyframes.js` instead of `@vueuse/core`).

---

v1.0 is the L-tranche cohort release. It freezes the public API and lands four
architectural transpositions that BREAK v0.9.x consumer shapes:

1. **Root-barrel Phase 2**—vueuse-bearing symbols leave the root barrel; they
   live on explicit subpaths so bundlers can tree-shake them.
2. **`src/api/` discovery layer**—pure types + constants surface for "where
   do I import the type from?" discovery.
3. **Subpath flatten**—`composables/dark` + `composables/keyboard` collapse
   to flat `/dark` + `/keyboard`; new `/carousel` subpath added.
4. **Second-consumer fidelity**—substrate without ≥ 2 consumers either wires
   a real second consumer or retires (per L invariant 8).

Per L invariant 4 (no backwards-compat shims), v1.0 ships no legacy aliases.
Every break is documented below. v0.9.4 remains available indefinitely as a
patch-stream tag; v1.0 adoption is opt-in.

---

## At a glance

- Vueuse-bearing symbols (`Input`, `Textarea`, `Combobox*`, `Carousel*`,
  `useCarousel`, `useGlobalDark`, `useKeyboardShortcuts`, `registerShortcut`,
  ...) NO LONGER on the root barrel—use the named subpath.
- Nested `composables/dark` + `composables/keyboard` subpaths RETIRED—flat
  `/dark` + `/keyboard`.
- NEW `@mkbabb/glass-ui/carousel` subpath for `useCarousel` + `CarouselApi`.
- NEW `@mkbabb/glass-ui/api` subpath for canonical types + constants
  discovery (32 symbols).
- RETIRED composables: `useOffsetPagination`, `useVirtualSectionWindow`,
  `useWindowedStore`, `virtualSectionLayout` helpers. `/pagination` +
  `/virtual` subpaths gone.
- RETIRED primitive: demo-private `<DockShowcaseFrame>` (was never public
  surface).
- `src/composables/` restructured into coherent sub-trees
  (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`,
  `sidebar/`, `sortable/`)—affects deep relative imports only.
- Production demo build NOT shipped—`npm run build` is library-mode only.

Worked example: speedtest re-link commit `98f88325` migrated 15 src/ files
to the v1.0 subpath surface in ~30 minutes. Entry-chunk gz dropped 32.5 KB.

---

## Before you migrate

1. **Pin to v0.9.4 first** if you are on v0.9.0–v0.9.3. v0.9.4 patches the
   K.WS subpath-typing-publication gap and lets you adopt subpath imports
   incrementally BEFORE the breaking v1.0 cut.
2. **Run your tests + typecheck** at v0.9.4. Establish a green baseline.
3. **Inventory your imports**—`rg 'from "@mkbabb/glass-ui"' src/` lists
   every root-barrel call site. Save the output; you will sweep it twice.
4. **Plan the cut as one commit per repo**—v1.0 is intentionally
   atomic. Mixing v0.9.x and v1.0 import shapes across files in the same
   commit makes review noisier than necessary.
5. **Read the Cohabitation note** below if you intend to stay on v0.9.4
   indefinitely. That path is supported.

---

## Breaking changes

### 1. Root-barrel curation (Phase 2 SCC trap closure)

The root barrel is now vueuse-free. Re-exporting these symbols from
`@mkbabb/glass-ui` forced every consumer to walk the vueuse SCC at
tree-shake time, regressing entry-chunk gzip by ~2 KB (speedtest's X.W3.c
re-probe was the canonical evidence). Phase 2 carves them onto subpaths.

#### 1.1—Form primitives → `/forms`

```ts
// Before
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui";

// After
import { Input, Textarea, Combobox, ComboboxInput } from "@mkbabb/glass-ui/forms";
```

The `/forms` subpath was added at v0.9.3 (K.WS Phase 1) and is preserved
verbatim at v1.0. Affected symbols: `Input`, `Textarea`, `Combobox`,
`ComboboxAnchor`, `ComboboxCancel`, `ComboboxEmpty`, `ComboboxGroup`,
`ComboboxInput`, `ComboboxItem`, `ComboboxItemIndicator`, `ComboboxList`,
`ComboboxSeparator`, `ComboboxTrigger`, `ComboboxViewport`.

Rationale: `Input` + `Textarea` import `useVModel` from `@vueuse/core`;
the `Combobox*` family imports `reactiveOmit`. Each is a vueuse-bearing
leaf; isolating them on `/forms` keeps the root barrel walk-free.

#### 1.2—Carousel → `/carousel`

```ts
// Before
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui";
import type { CarouselApi } from "@mkbabb/glass-ui";

// After
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext, CarouselPrevious, useCarousel,
} from "@mkbabb/glass-ui/carousel";
import type { CarouselApi } from "@mkbabb/glass-ui/carousel";
```

Affected symbols: `Carousel`, `CarouselContent`, `CarouselDots`,
`CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`,
`GlassCarouselPager`, `useCarousel`, type `CarouselApi`.

Rationale: `useCarousel` imports `createInjectionState` from
`@vueuse/core`. The composable transitively taints every `Carousel*.vue`
in the package because they `inject` it. The whole family moves together.

The `/carousel` subpath is NEW at v1.0—v0.9.x consumers reached
`useCarousel` only via the root barrel.

#### 1.3—Dark-mode singleton → `/dark`

```ts
// Before
import { useGlobalDark } from "@mkbabb/glass-ui";

// After
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

Rationale: `useGlobalDark` composes `createGlobalState`, `useDark`,
`useToggle` from `@vueuse/core`. The `/dark` subpath is flat at v1.0
(the v0.9.4 nested form `composables/dark` is RETIRED—see §2).

#### 1.4—Keyboard registry → `/keyboard`

```ts
// Before
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui";

// After
import {
    registerShortcut, useRegisteredShortcuts,
    formatCombo, formatComboParts, isMac, useKeyboardShortcuts,
} from "@mkbabb/glass-ui/keyboard";
import type {
    ShortcutOptions, ShortcutCombo,
    RegisteredShortcut, ShortcutEventType,
} from "@mkbabb/glass-ui/keyboard";
```

Rationale: keyboard-shortcuts registry composes `createGlobalState` +
`useEventListener` from `@vueuse/core`. Same flatten as `/dark`.

#### 1.5—Codemod hints

Find every root-barrel call site that references a moved symbol:

```bash
# Inventory: which files import from the root barrel?
rg -l 'from "@mkbabb/glass-ui"' src/

# Of those, which import a moved symbol?
rg -l 'from "@mkbabb/glass-ui"' src/ \
  | xargs rg -l '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
```

The mechanical rewrite is a per-symbol regex (run inside your editor or
via `sed -i`). Pattern shape:

```
# 1. Find imports that ONLY pull moved symbols → rewrite source
#    import { Input, Textarea } from "@mkbabb/glass-ui"
#    → import { Input, Textarea } from "@mkbabb/glass-ui/forms"

# 2. Find mixed imports → split the import statement
#    import { Button, Input } from "@mkbabb/glass-ui"
#    → import { Button } from "@mkbabb/glass-ui"
#      import { Input } from "@mkbabb/glass-ui/forms"
```

Speedtest's `98f88325` migration commit hand-rewrote 15 files in ~30
minutes without a scripted codemod—the breaks are mechanical enough
that an editor multi-cursor pass is the canonical workflow.

---

### 2. Subpath flatten (v0.9.4 transitional shapes retired)

v0.9.4 introduced nested `composables/dark` + `composables/keyboard`
subpaths as a transitional shape for the K.WS dts-publication-gap fix.
v1.0 flattens them to match every other public subpath
(`/forms`, `/dock`, `/configurator`, ...).

#### 2.1—`/composables/dark` → `/dark`

```ts
// Before (v0.9.4 only)
import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark";

// After (v1.0)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
```

#### 2.2—`/composables/keyboard` → `/keyboard`

```ts
// Before (v0.9.4 only)
import { registerShortcut } from "@mkbabb/glass-ui/composables/keyboard";

// After (v1.0)
import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
```

Codemod:

```bash
rg -l '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/ \
  | xargs sed -i '' 's|@mkbabb/glass-ui/composables/dark|@mkbabb/glass-ui/dark|g; s|@mkbabb/glass-ui/composables/keyboard|@mkbabb/glass-ui/keyboard|g'
```

Trying the retired subpath at v1.0 fails with Node's standard package
exports gate:

```
$ node -e "import('@mkbabb/glass-ui/composables/dark')"
Error: ERR_PACKAGE_PATH_NOT_EXPORTED
```

That hard fail is intentional. Per L invariant 4, no alias re-routes the
nested form to the flat one.

---

### 3. Composable retirements (substrate-without-consumer binary)

L.W3 Lane A's audit ran the substrate-without-consumer check across six
composables. Three were WIRED via cross-repo speedtest consumption; three
retired with rationale.

#### 3.1—`useOffsetPagination`—REMOVED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers (no `src/` site; no speedtest site).
  Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/pagination` (entry removed from
  `package.json` exports + typesVersions and from `vite.library.ts`).
- **Migration**: roll your own with `ref()` + a `fetchFn`-driven loader.
  The v0.9.3 reference at
  `src/composables/pagination/useOffsetPagination.ts` was 60 LOC and had
  no glass-ui-private substrate dependency. Copy from v0.9.3 source if
  you want the exact shape; or adopt an external library
  (`@tanstack/vue-query` if you need server-state coordination,
  `@vueuse/core`'s `useOffsetPagination` if you want a thin wrapper).

#### 3.2—`useVirtualSectionWindow`—REMOVED → REVERSED-at-BC

- **Status**: REMOVED in v1.0; **REVERSED-at-BC** (re-promoted to
  `src/composables/virtual/useVirtualSectionWindow.ts` + the `/virtual`
  subpath, OFF the root barrel).
- **Reason for the v1.0 removal**: 0 production consumers. Demo-only at
  v0.9.x. **Reason for the BC reversal**: two binary consumers now
  overturn the no-consumer verdict — the live words
  `DefinitionContentView` consumer + the booked `BC.W-DOCK-SEARCH`
  results list (`docs/consumer-evidence/use-virtual-section-window.md`).
  The homecoming: v0.9.4 → retired v1.0 → returned BC. The machinery is
  byte-faithful to the proven words transposed copy save three recorded
  refinements (binary-search `findSectionOffset`, the house
  `useResizeObserver` leaf, the shared `SectionHierarchy` type-reconcile).
- **Subpath retired**: `@mkbabb/glass-ui/virtual` — **RE-MINTED at BC** (it
  again houses `useVirtualSectionWindow` + `useWindowedStore` + the
  `virtualSectionLayout` pure core). `useVirtualGrid` (the
  `@tanstack/vue-virtual`-bearing grid windower) STAYS words-local — one
  consumer + a hard 3rd-party dep, the ≥2-consumer bar fails for glass-ui.
- **Migration (pre-BC)**: production-grade virtualization belonged to
  `@tanstack/vue-virtual`. **Post-BC**: import the re-homed engine from
  `@mkbabb/glass-ui/virtual`.

#### 3.3—`useWindowedStore`—REMOVED → REVERSED-at-BC

- **Status**: REMOVED in v1.0; **REVERSED-at-BC** (re-promoted to
  `src/composables/virtual/useWindowedStore.ts`, on `/virtual`).
- **Reason for the v1.0 removal**: 0 production consumers. **Reason for
  the BC reversal**: the live words `wordlist.ts` store is the consumer
  the no-consumer verdict missed (`docs/consumer-evidence/use-windowed-store.md`).
  The generation-counter stale-append race-guard is the load-bearing
  concurrency primitive, preserved byte-faithful.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (shared with
  `useVirtualSectionWindow`) — **RE-MINTED at BC**.
- **Migration (post-BC)**: import from `@mkbabb/glass-ui/virtual`.

#### 3.4—`virtualSectionLayout` helpers—REMOVED → REVERSED-at-BC

- **Status**: REMOVED in v1.0; **REVERSED-at-BC** (re-promoted to
  `src/composables/virtual/virtualSectionLayout.ts`, on `/virtual` + the
  `/api` type discovery layer).
- **Affected exports**: `buildSectionLayout`, `findSectionOffset`,
  `resolveActiveSection`, `resolveSectionWindow`, plus the
  `FlatSection`, `SectionLayout`, `SectionWindowRange`, and
  `ForcedSectionWindowRange` types.
- **Reason for the v1.0 removal**: support substrate for
  `useVirtualSectionWindow`; retired with its parent. **Reason for the BC
  reversal**: returns home WITH its parent. `findSectionOffset` is
  refined to a binary search over a by-id-sorted view (the words copy
  linear-scanned; the offset answer is byte-identical), and `FlatSection`
  now shares the four hierarchy fields with the sidebar's `TreeIndexEntry`
  via the `SectionHierarchy` base (no redeclared fields).
- **Migration (post-BC)**: import the pure helpers from
  `@mkbabb/glass-ui/virtual` (types also discoverable via
  `@mkbabb/glass-ui/api`).

#### Composables KEPT (cross-repo wired)

The substrate-without-consumer audit retained three motion composables
because speedtest consumes them in production:

| Composable | Speedtest consumer | Disposition |
|---|---|---|
| `useRAFLoop` | `src/components/speedtest/composables/useMeterRenderer.ts` (canvas render loop) | WIRED |
| `useIntersectionPause` | `src/composables/useAuroraPolicy.ts` (reduced-motion + visibility gating) | WIRED |
| `useDarkModeSync` | `src/components/speedtest/SpeedtestMeter.vue` + `src/components/dashboard/composables/useEChartsTheme.ts` | WIRED |

All three remain on `@mkbabb/glass-ui` (vueuse-free) via
`src/composables/motion/`. Each has a demo story under
`demo/stories/composables/`. No consumer-side migration required.

---

### 4. Primitive retirements

#### 4.1—`<DockShowcaseFrame>`—REMOVED

- **Status**: REMOVED in v1.0 (demo file deleted).
- **Reason**: demo-private chassis introduced at V.W4 with ZERO non-self
  consumers at L.W3 open (`rg "DockShowcaseFrame" demo/` returned only
  the definition file).
- **Public-surface impact**: NONE. The component was never on the
  library public surface—it was a demo-private chassis primitive.
  No `src/` source / barrel / package.json export changes.
- **Migration**: dock-tier demos compose `<ShowcaseFrame>` (canonical
  demo chassis) directly, OR raw chassis recipes:

  ```vue
  <div class="rounded-[var(--radius-card)] border border-border/40 bg-card/40 shadow-cartoon">
      <!-- dock content -->
  </div>
  ```

#### Primitives KEPT (2nd consumer wired)

L.W3 Lane B wired second consumers for three primitives that reached
the wave at 1 consumer:

- **`<DiscoGlyph>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (chart-token
  facet-swatch row).
- **`<DockGroup>`**—2nd consumer at
  `demo/stories/compositions/dashboard.vue` (KPI pill-row shelf).
- **`<InstrumentChassis>`**—2nd consumer at
  `demo/stories/foundations/chart-chassis-palette.vue` (live
  mini-chassis below the chassis-tier-tokens ladder).

No consumer-side change. All three remain exported via the root barrel
(`@mkbabb/glass-ui`) AND their per-package subpaths.

---

### 5. Composables restructure (internal re-org)

L.W2 Lane A restructured `src/composables/` into coherent sub-trees.
**This affects you ONLY if you import directly from a deep relative
path** (e.g., `@mkbabb/glass-ui/src/composables/useTimer`). The public
surface (`@mkbabb/glass-ui` root barrel + named subpaths) is unchanged
for KEPT composables.

| v0.9.x relative path | v1.0 relative path |
|---|---|
| `composables/useGlobalDark` | `composables/dark` |
| `composables/useKeyboardShortcuts` | `composables/keyboard` |
| `composables/useInterval` | `composables/reactive/useInterval` |
| `composables/useTimer` | `composables/reactive/useTimer` |
| `composables/useResizeObserver` | `composables/dom/useResizeObserver` |
| `composables/useTouchGate` | `composables/dom/useTouchGate` |
| `composables/useTokenColor` | `composables/dom/useTokenColor` |
| `composables/useStagger` | `composables/motion/useStagger` |
| `composables/useStoryDemo` | (moved to `demo/composables/useStoryDemo`—demo-private) |

Resulting tree:

```
src/composables/
├── dark/         useGlobalDark
├── keyboard/     useKeyboardShortcuts + family
├── reactive/     useInterval, useTimer
├── dom/          useResizeObserver, useTouchGate, useTokenColor
├── motion/       useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│                 useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│                 useRAFLoop, useIntersectionPause, useStagger
├── glass/        useGlassRenderer + webgl/ + webgpu/
├── sidebar/      useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
├── sortable/     useSortable
└── index.ts      (sub-tree re-exports)
```

Recommended: stop reaching for deep relative paths; the public surface
(`@mkbabb/glass-ui` root barrel + the dedicated subpaths) is the
canonical import shape.

---

## New surfaces in v1.0

### `@mkbabb/glass-ui/api`—type + constant discovery layer

32 canonical public symbols (28 types + 4 runtime constants) re-exported
from their existing homes. Recommended for consumer-side type discovery
without coupling to a specific component's runtime entry point:

```ts
import type {
    AuroraConfig, AuroraNucleus, AuroraFlow, AuroraInstance,
    AuroraRuntimeOptions, AuroraRuntimeMode,
    FlowPattern, OklchStop, StrokeMode, WarpMode,
    ConfiguratorPreset, ConfiguratorState, ConfiguratorStateOptions,
    ConfiguratorScrollMode,
    CardTier, InstrumentChassisPhase, ToastVariant,
    AlertVariants, AvatarVariants, BadgeVariants, ButtonVariants,
    SheetVariants, SliderVariants, ToggleVariants, ToggleChipVariants,
} from "@mkbabb/glass-ui/api";

import {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI, MAX_STOPS,
} from "@mkbabb/glass-ui/api";
```

The `/api` subpath has zero JS payload for types-only consumers—all 28
type aliases erase at build, leaving only the 4 constants in the runtime
chunk. Use it freely for prop-forwarding wrappers, fixture typings, and
union narrowing.

### `@mkbabb/glass-ui/carousel`

New at v1.0. See §1.2 above.

### `useConfiguratorState` gained `cloneMode` option

`useConfiguratorState<T>(options)` accepts a new `cloneMode?: "commit-on-write" | "per-preset"` option (default `"commit-on-write"`—unchanged behaviour for existing consumers).

```ts
import {
    useConfiguratorState,
    type ConfiguratorCloneMode,
} from "@mkbabb/glass-ui/configurator";

// per-preset: edits persist per-slot across preset switches.
const studio = useConfiguratorState<MyConfig>({
    presets,
    initialPreset: "default",
    cloneMode: "per-preset",
});
```

The L W7 Lane B Option-A unification (Rε §A.8) routed aurora's per-preset clone semantics through the canonical primitive; `useAuroraStudio` was demo-private and retired. `cyclePreset` also accepts an optional `direction?: 1 | -1` (default `1`) so consumers can map `ArrowLeft` / `ArrowRight` keyboard handlers cleanly. Purely additive—no consumer migration required.

---

## v2.0.0—Motion subpath surgery (AI.W1 R3)

v2.0.0 closes the **AI-CARRY-GLASS-UI-KEYFRAMES-EDGE** chronic (4-tranche
deferral from AI). The root barrel statically reached `@mkbabb/keyframes.js`
through `composables/motion`, which forced every consumer's entry chunk to
carry the ~102 KB raw / ~34 KB gz `keyframes-*.js` chunk even when the
consumer only imported `<Card>` or `<Button>`. The motion composables now
live on the `@mkbabb/glass-ui/motion` flat subpath. The root barrel is
keyframes.js-free.

The shape mirrors the L.W1 Lane C SCC-trap closure that carved `/dark`,
`/keyboard`, and `/carousel` off the root barrel for the vueuse-bearing
surface. Same precedent, different heavy peer.

### Symbols moved—root barrel → `/motion`

```ts
// Before (≤ v1.9.x)
import {
    Card,
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui";

// After (≥ v2.0.0)—split the import statement
import { Card } from "@mkbabb/glass-ui";
import {
    DAMPING,
    SNAP_THRESHOLD,
    useAnimatedNumber,
    useAnimatedNumberMap,
    useSpringOrchestrator,
    useStagger,
    useStaggerReveal,
    useScrollProgress,
    useRAFLoop,
    useIntersectionPause,
    installDarkModeSync,
    type RAFLoopTiming,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";
```

### Symbols inventory

The following 11 runtime exports + 2 type exports move from root → `/motion`:

| Symbol | Kind |
|---|---|
| `useSpringOrchestrator` | composable (keyframes.js `NumericAnimation`) |
| `useAnimatedNumber` | composable (keyframes.js `SmoothProgress`) |
| `useAnimatedNumberMap` | composable (depends on `useAnimatedNumber`) |
| `useStagger` | composable (timer-driven; no keyframes reach but rides the same barrel) |
| `useStaggerReveal` | composable (IO-driven; same) |
| `useScrollProgress` | composable (scroll-driven; same) |
| `useRAFLoop` | composable (rAF wrapper; same) |
| `useIntersectionPause` | composable (IO + animation pause; same) |
| `installDarkModeSync` | composable (motion engine ↔ dark-mode bridge) |
| `DAMPING` | constant |
| `SNAP_THRESHOLD` | constant |
| `RAFLoopTiming` | type |
| `PausableRuntime` | type |
| `AnimatedNumber` | type (also reachable via `/api`) |
| `UseAnimatedNumberOptions` | type (also reachable via `/api`) |
| `SpringSnapshot` | type (also reachable via `/api`) |

### Why the entire motion barrel moves (not just the keyframes-touching subset)

Only `useSpringOrchestrator` + `useAnimatedNumber` (and `useAnimatedNumberMap`
transitively) statically reach `@mkbabb/keyframes.js`. The rest of the motion
sub-tree (`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`,
`useIntersectionPause`, `installDarkModeSync`) is keyframes-free. Conceptually
the keyframes-free composables could stay on the root barrel.

In practice the sub-tree's `index.ts` rolls up every leaf with `export *`, so
Rollup walks the entire sub-tree as one SCC at root-barrel build time. Either
the whole sub-tree moves or none of it does — splitting it would require a
second internal sub-barrel (`motion-keyframes/` vs `motion-pure/`), which is
the wrong shape. The motion subpath is the canonical home for every kinetic
composable; consumers reach `/motion` for any kinetic primitive regardless of
whether that specific primitive happens to touch the engine today.

### Codemod hints

```bash
# Find every site that needs migration:
rg 'from "@mkbabb/glass-ui"' src/ | rg 'useStagger|useAnimatedNumber|useSpringOrchestrator|useStaggerReveal|useScrollProgress|useRAFLoop|useIntersectionPause|installDarkModeSync|DAMPING|SNAP_THRESHOLD|RAFLoopTiming|PausableRuntime'
```

For mixed imports (e.g. `import { Card, useAnimatedNumber } from "@mkbabb/glass-ui"`),
split into two import statements: `Card` stays on root, the motion symbols
move to `/motion`. There is no auto-codemod shipped — the diffs are mechanical
1-line edits per site and easier to apply by hand than to write a robust
transform for (the import-statement-splitting case requires AST awareness).

### Verification

After the migration, `dist/glass-ui.js` must NOT contain a static import of
`@mkbabb/keyframes.js`. Verify with:

```bash
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/glass-ui.js
# Expected: 0
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (NumericAnimation + SmoothProgress reach)
```

Consumer bundle graphs should show the `keyframes-*.js` chunk dropping off
routes that don't use motion composables. The carry retires per route.

### No back-compat shim

Per precept 1 (NO workarounds) + precept 2 (NO legacy code) + L invariant 4
(no backwards-compat shims), v2.0.0 ships no root-barrel alias for the moved
symbols. Pinning to `^1.9.3` remains supported on the v1.x patch stream if a
consumer cannot migrate immediately.

---

## v3.0.0—`/motion-core` engine-free carve (AP.W3 R0G-7)

v2.0.0 moved the whole motion sub-tree onto `/motion` on the theory that "the
bundler walks the sub-tree's `export *` chain as one SCC anyway" — so splitting
keyframes-touching from keyframes-adjacent leaves "would be a fictitious
distinction" (the v2.0.0 §"Why the entire motion barrel moves" rationale above).
**That premise is overturned by consumer measurement.** A cheap path touching
ZERO keyframes (e.g. importing only `useIntersectionPause`) still dragged the
~125 KB `@mkbabb/keyframes.js` engine onto the eager graph, because the joined
barrel is what makes the SCC, not the leaves — the leaves split cleanly.

v3.0.0 breaks the barrel. The keyframes-BEARING leaves stay on `/motion`; the
keyframes-FREE leaves carve out to a new flat sibling `@mkbabb/glass-ui/motion-core`
(keyframes-free AND vueuse-free); the keyframes-free-but-vueuse-bearing
`installDarkModeSync` relocates to `@mkbabb/glass-ui/dark` (it reads
`useGlobalDark`, so it is topically a dark-mode leaf). `dist/motion-core.js`
reaches neither heavy peer; `dist/motion.js` keeps the engine.

### Rename table (no alias — inv 47)

| Symbol | Old path | New path |
|---|---|---|
| `useStaggerReveal` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useScrollProgress` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useRAFLoop`, `RAFLoopTiming` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useIntersectionPause`, `PausableRuntime` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `useStagger` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` |
| `DAMPING`, `SNAP_THRESHOLD` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion-core` (also still on `/motion`) |
| `installDarkModeSync` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/dark` |
| `useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`, `useAnimatedNumber`, `useAnimatedNumberMap` | `@mkbabb/glass-ui/motion` | `@mkbabb/glass-ui/motion` (unchanged) |

`DAMPING` + `SNAP_THRESHOLD` resolve identically from either path (the same
pure-data `constants` module is duplicate-exported on both barrels because the
bearing leaves read them). `RAFLoopTiming` + `PausableRuntime` are type-only
relocations — no bearing leaf references them, so they move with their leaves to
`/motion-core` and drop from `/motion`'s type surface.

### Example

```ts
// Before (v2.0.0–v2.x)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    installDarkModeSync,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion";

// After (≥ v3.0.0)
import {
    useIntersectionPause,
    useScrollProgress,
    DAMPING,
    type PausableRuntime,
} from "@mkbabb/glass-ui/motion-core";
import { installDarkModeSync } from "@mkbabb/glass-ui/dark";
```

The keyframes-bearing imports (`useSpring*`, `useNumericTransition`,
`useAnimatedNumber*`) stay on `@mkbabb/glass-ui/motion` unchanged.

### Verification

```bash
grep -c "@mkbabb/keyframes\|@vueuse/core" node_modules/@mkbabb/glass-ui/dist/motion-core.js
# Expected: 0 (both heavy peers absent — engine-free + vueuse-free)
grep -c "@mkbabb/keyframes" node_modules/@mkbabb/glass-ui/dist/motion.js
# Expected: ≥ 1 (the engine still resolves on /motion)
```

### No back-compat shim

Per inv 47 (no back-compat alias on `/motion` for the relocated leaves) +
precept 1/2 + L invariant 4, `/motion` ships no alias for the carved symbols.
Consumers rename per call site (the diffs are mechanical 1-line edits).

---

## v1.2.1—Aurora init fail-explicit (O.W1 Lane A)

Per O invariant 24 (library-internal contract violations throw; browser-API
degradation paths remain befitting silent fallbacks), `<Aurora>` init failure
is now **fail-explicit**.

### Before (≤ v1.2.0)

```ts
// useAurora's onMounted try/catch:
try {
    inst = createAurora(canvas, getCfg(), runtimeOptions);
} catch (err) {
    console.warn("[Aurora]", err);   // silent—surface renders nothing
    return;
}
```

A `createAurora` failure (WebGL2 unavailable, shader compile/link failure)
logged a warning to the console and rendered an empty `<canvas>`. The
consumer received no surface signal beyond the dev-console warn.

### After (≥ v1.2.1)

`createAurora` is glass-ui-internal; its failure is an internal contract
violation. The composable now rethrows by default so the failure surfaces to
the consumer's error boundary (or dev console as an uncaught exception). To
opt back into the prior silent-warn behaviour, pass `onInitError`:

```vue
<template>
    <Aurora
        :config="auroraConfig"
        :on-init-error="(err) => console.warn('[Aurora]', err)"
    />
</template>
```

The callback is invoked with the caught `Error`; the canvas stays unmounted
(matching the prior silent-fallback shape). The prop is also threadable via
`runtimeOptions.onInitError` for consumers passing a fully-composed
`AuroraRuntimeOptions` object (e.g. thumbnail-baking pipelines):

```ts
import type { AuroraRuntimeOptions } from "@mkbabb/glass-ui/api";

const runtimeOptions: AuroraRuntimeOptions = {
    mode: "capture",
    preserveDrawingBuffer: true,
    onInitError: (err) => myErrorBus.report("aurora-init", err),
};
```

The top-level prop wins when both are set.

### Why the change

Per Rα FAIL-EXPLICITLY F1 (`docs/tranches/O/research/Ralpha-legacy-code.md:85`)
and O invariant 24:

- Library-internal contract (shader compile / factory init / WebGL2 unavailable)
  → throw.
- Browser-API degradation (pointer-capture failure / reduced-motion preference)
  → silent fallback with rationale.

Silent-warn concealed bugs in shader edits, masked WebGL2-context-cap
exhaustion (Chromium ~8/page), and left consumers debugging "why is my canvas
blank" without a signal. The throw forces the bug to the surface where the
consumer can decide how to handle it.

### Migration cost

`grep` your codebase for `<Aurora` and `useAurora(`:

- If you depend on the prior render-nothing-and-warn behaviour, add
  `onInitError={(err) => console.warn("[Aurora]", err)}` to your `<Aurora>`
  call site.
- If you have an error boundary upstream and want the failure to surface
  there, no change needed.
- Speedtest's single `<Aurora>` call site (`src/App.vue:5`) inherits the
  fail-explicit default—the consumer-side disposition is coordinated at
  the cross-repo cohort wave (O.W6).

---

## v1.3.0—`avatarVariant` → `avatarVariants` (O.W4 Lane C)

Renamed for consistency with every other CVA variants const in the library
(`buttonVariants`, `toggleVariants`, `badgeVariants`, `sliderVariants`,
`menuItemVariants`, ...). The singular `avatarVariant` was the only
non-pluralized CVA constant in the codebase. One-line consumer migration:

```ts
// Before
import { avatarVariant } from "@mkbabb/glass-ui";
// After
import { avatarVariants } from "@mkbabb/glass-ui";
```

The `AvatarVariants` type alias is unchanged. Cross-repo audit
(`words`, `fourier-analysis`, `bbnf-buddy`, `keyframes.js`, `value.js`,
`speedtest`) found one passthrough re-export site
(`value.js/demo/@/components/ui/avatar/index.ts`); coordinated at O.W6
cross-repo cohort wave. No other production call sites use the symbol
across the constellation.

---

## v1.3.0—`useDarkModeSync` → `installDarkModeSync` (O.W4 Lane B)

Renamed because the composable doesn't follow the canonical `useFoo`
contract—it returns `void` after installing a `watch` side-effect.
The new name names the side-effect plainly (it installs a sync between
two darkness sources; it does not return a reactive handle). One-line
consumer migration:

```ts
// Before
import { useDarkModeSync } from "@mkbabb/glass-ui";
useDarkModeSync(localIsDark);
// After
import { installDarkModeSync } from "@mkbabb/glass-ui";
installDarkModeSync(localIsDark);
```

Cross-repo audit found 3 references in speedtest
(`src/components/speedtest/SpeedtestMeter.vue`,
`src/components/dashboard/composables/useEChartsTheme.ts`); coordinated
at O.W6 cross-repo cohort. No other constellation references.

---

## The metric family — KEPT (a THREE-repo public surface: speedtest + muster + sci-report) — BI.W-METRICS-DEMO

The whole compact-metric family SHIPS: `metric-cell` (`MetricCell`), `metric-stack`
(`MetricStack` + `MetricRow`), `metric-badge` (`MetricBadge`), `instrument-chassis`
(`InstrumentChassis` + `ChassisDivider`), `pulse` (`Pulse`) — their `src/components/custom/`
dirs, `src/subpaths/*.ts` barrels, the `./metric-cell` / `./metric-stack` /
`./metric-badge` / `./instrument-chassis` / `./pulse` `package.json` `exports` entries +
`typesVersions` rows, the `@mkbabb/glass-ui/api` re-exports, and the `--metric-row-*`
value-clamp token family (tokens.css §17) are all LIVE. `<MetricPill>` (ui/, composes
`<MetricBadge>`) rides the family on the root barrel.

**Not speedtest-only — a three-repo public API.** The earlier "speedtest-consumed"
framing (and the FAM-10 "speedtest-only sextet" premise / the UF-K1 move-to-speedtest
carry) is CORRECTED: the family is consumed by speedtest, muster, AND sci-report — with
`metric-badge` spanning all three. It clears the ≥2-binary-consumer bar (J inv 10) by a
wide margin; a metrics relocate or retire would silently break muster + sci-report, so
it is NOT a speedtest-transfer candidate. Per-site consumer evidence:
`docs/consumer-evidence/metrics.md`. No migration action is required; the family STAYS.
(The overfit UF-K1 flagged lands on the `/data/metrics` DEMO page, redesigned by
W-AFFORDANCE-REDESIGN — not the components.)

Import them via their flat subpaths:

```ts
import { MetricCell } from "@mkbabb/glass-ui/metric-cell";
import { MetricStack, MetricRow } from "@mkbabb/glass-ui/metric-stack";
import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
import { InstrumentChassis } from "@mkbabb/glass-ui/instrument-chassis";
import { Pulse } from "@mkbabb/glass-ui/pulse";
```

---

## Recommended new surfaces (best-practice, not strict migration)

Even where a root-barrel import still works at v1.0, prefer per-package
subpaths for better tree-shake granularity:

```ts
// Works at v1.0, but is broad—pulls the whole glass-ui root chunk.
import { GlassDock, Configurator } from "@mkbabb/glass-ui";

// Better—pulls only what you need.
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
```

Speedtest's re-link did NOT make this best-practice rewrite (it kept
root-barrel imports for non-vueuse-bearing symbols) and still saw the
-32.5 KB entry-chunk gz drop. Per-package subpath imports are an
incremental polish above that baseline.

### Adaptive glass over light — the self-engage default + the sampled observer (AZ.W-ADAPTIVE-AUTO)

Glass surfaces (the dock + the `.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`
content tiers + the overlay band) now **self-darken over light backdrops by default** —
the W54 glass-first MAXIMAL register made legible over the common bright-content case, no
consumer opt-in. The dock additionally wires the iOS-27 **sampled-luminance observer** ON
by default (`useGlassBackdropLuminance`), which dynamically tracks a live/animated backdrop
and writes `--glass-backdrop-luma` + the `--glass-backdrop` bucket on the dock root.

This is additive (no break). A **dark-substrate consumer** whose backdrop is already dark
(so the warm-ink darken is unwanted) opts out per-surface:

```css
/* The pristine un-tinted plate on a known-dark surface (the documented opt-out). */
.my-dark-surface .glass-card { --glass-tint-strength: 0%; }
```

```vue
<!-- The dock over a known-dark substrate — disable the sampled observer + the darken. -->
<GlassDock :auto-luminance="false" style="--glass-tint-strength: 0%" />
```

The observer is DEMO-PRIVATE (not on the public glass barrel) — it is wired internally for
the dock; a downstream surface that needs the same dynamic sampling triggers the public
barrel promotion (`docs/consumer-evidence/use-glass-backdrop-luminance.md`).

---

### The luminous-dark transmissive material + the calm-light recalibration (BA.W-DARK-MATERIAL)

The DARK register was rebuilt as a luminous transmissive material, and the LIGHT
content-tier self-engage was recalibrated. Both are **token-identity evolutions, NOT
breaking aliases** (the lib's own default tokens evolve as the lib's identity changes —
presets-in-consumers; no clean-break migration, no codemod).

**1 — The calm-light recalibration (the slides gray-slab fix).** The content tiers
(`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) no longer apply the full 20%
AA darken UNCONDITIONALLY — over a plain LIGHT page they self-engage only a sub-perceptual
`--glass-tint-strength-floor` (4%), so a calm-light card stays a translucent WARM cream
(was: a flat gray slab). The FULL AA darken on a content tier now engages only under the
declared/sampled BRIGHT signal (`--glass-backdrop: light` / the observer). A consumer whose
light-page card was relying on the unconditional 20% darken (rare) declares the bright
signal on an ancestor; a consumer who wants a content card flat opts out as before:

```css
/* A calm light page where the card should stay warm needs NOTHING (the new default).
   To FORCE the full darken on a content card over a known-bright surface: */
.my-bright-region { --glass-backdrop: light; }

/* The pristine un-tinted plate (unchanged opt-out). */
.my-surface .glass-card { --glass-tint-strength: 0%; }
```

**2 — Dark `--primary` is now chromatic.** The dark-mode `--primary` evolved off the
achromatic cream `hsl(48 10% 90%)` onto the brand legendre-violet `oklch(0.739 0.134 318.1)`
(a library-identity hue). Every filled/active/selected control reading `--primary` in dark
(Slider range, Badge `default`, Switch checked, Checkbox accent) now carries the brand
chroma instead of a flat pale-grey slab. The dark `--primary-foreground` is unchanged
(`hsl(24 10% 10%)`, clears 7.15:1 over the new accent). A consumer who OVERRODE the dark
`--primary` (presets-in-consumers) re-pins their own value in `:root`/`.dark` — no action
otherwise.

**3 — The `--surface-tint-*` family gained a dark arm.** In dark the family now mixes
toward a light ink (`hsl(48 12% 96%)`) so chip backplates / hairlines / the dock-rail
divider / the timeline dot read against the near-black card (was: invisible — collapsed
into the plate). The light arm + the in-srgb interpolation are UNCHANGED (the AW.W26
fence). Every `--surface-tint-*` consumer re-resolves automatically — no per-site edit.

### The warm-chroma floor — the neutral ladder + glass plate off gray (BA.W-NO-GRAY)

The `--neutral-*` ladder + the `--card` glass plate were re-saturated onto the warm
identity (R10-5 "No gray."). This is a **token-identity evolution, NOT a breaking alias**
(the lib's own default tokens evolve as its identity changes — presets-in-consumers; no
clean-break migration, no codemod). The ladder was SPECIFIED warm (hue 48) but RESOLVED
achromatic — at the library's low saturation it painted a yellow-green gray (OKLab hue ~95°,
chroma below the perceptual floor). The values evolve, both modes in lockstep:

| token | was (hsl) | now (hsl) |
|---|---|---|
| `--neutral-0` (page) | `48 12% 98%` / dark `24 9% 4%` | `40 30% 98%` / dark `24 9% 4%` (KEEP) |
| `--neutral-1` | `48 10% 95%` / dark `24 6% 11%` | `38 26% 95%` / dark `28 12% 11%` |
| `--neutral-2`/`--secondary` | `48 9% 90%` / dark `24 5% 16%` | `34 28% 90%` / dark `28 14% 16%` |
| `--neutral-3`/`--accent` | `48 8% 82%` / dark `24 5% 22%` | `33 30% 82%` / dark `30 18% 22%` |
| `--neutral-4`/`--border`/`--input` | `48 7% 70%` / dark `24 5% 34%` | `32 26% 70%` / dark `30 16% 34%` |
| `--neutral-5`/`--muted-foreground` | `48 6% 40%` / dark `48 5% 62%` | `30 22% 40%` / dark `34 14% 62%` |
| `--neutral-6` (strong-muted) | `48 7% 30%` / dark `48 6% 72%` | `28 24% 30%` / dark `36 14% 72%` |
| `--card` (glass plate) | `var(--neutral-0)` / dark `24 8% 16%` | `36 48% 97%` / dark `24 8% 16%` (KEEP) |
| `--glass-border-*` rim α | wash 8% → overlay 18% | wash 11% → overlay 22% (warmer rim) |

The moves are **chroma-only at constant L** — the L (and therefore every AA contrast ratio)
is preserved to within ±0.005 of HEAD (the gate re-ratifies). **`--card` now decouples from
`--neutral-0`** (a glass plate reads warm-cream over a flat backdrop, the page stays calm
surface). A consumer who OVERRODE any `--neutral-*` rung or `--card` (presets-in-consumers)
RE-PINS their own value in `:root`/`.dark` — those overrides win as before; no action
otherwise (every semantic alias `--secondary`/`--accent`/`--border`/`--muted-foreground`
still tracks the ladder, so a consumer reading those gets the warm value automatically). The
`--surface-tint-*` in-srgb family + the KEEP-NEUTRAL registers (`--warning-foreground`,
`--overlay-scrim-ink`, the shadow ink) are UNCHANGED.

```css
/* A consumer who hand-tuned a neutral re-pins their value (it still wins): */
:root { --neutral-4: hsl(30 6% 72%); }   /* your border override, unchanged behaviour */
/* A consumer who wants the prior achromatic plate re-pins --card: */
:root { --card: var(--neutral-0); }       /* opt back to the page-tracking plate */
```

---

### The scroll-state edge fade — `.scroll-fade-*` → `<FadingScroll>` + `--mask-fade-width` → `--fade-scroll-width` (BA.W-FADING-SCROLL)

The scroll-BLIND static `.scroll-fade-mask` / `.scroll-fade-y` / `.scroll-fade-top` /
`.scroll-fade-bottom` mask utilities are SUPERSEDED by the scroll-state-driven
`<FadingScroll>` primitive (`@mkbabb/glass-ui/fading-scroll`, axis `x`|`y`). The static
masks feathered BOTH edges unconditionally with no scroll knowledge — so the first card's
chrome was half-erased at `scroll = 0` (the R8-08 "Shy" defect). `<FadingScroll>` feathers
the start edge ONLY past `scroll > 0` and the end edge ONLY while trailing overflow remains.
This is a **CLEAN BREAK — no alias** (the static utilities + the `--mask-fade-width` token
were RETIRED at the 4.1.0 cut — BB.W-SCROLL-FADE-RETIRE — after every consumer migrated).

| was | now |
|---|---|
| `<div class="… overflow-x-auto scroll-fade-mask">` | `<FadingScroll axis="x" class="…">` (root is the scroll port) |
| `<div class="… overflow-y-auto scroll-fade-y">` | `<FadingScroll axis="y" class="…">` |
| `.scroll-fade-top` / `.scroll-fade-bottom` (one-sided V) | `<FadingScroll axis="y" :fade-start="false">` / `:fade-end="false"` |
| `--mask-fade-width: 1rem` (token) | `--fade-scroll-width: 1rem` (token — same default, inheriting) |

```vue
<!-- before -->
<div class="flex gap-2 overflow-x-auto scroll-fade-mask scrollbar-hidden">…</div>
<!-- after -->
<FadingScroll axis="x" class="flex gap-2 scrollbar-hidden">…</FadingScroll>
```

When wrapping the scroll port in a `<FadingScroll>` node would re-parent a load-bearing
anchor (e.g. a `position-anchor` indicator on the scroll container root), call the composable
form on the existing element instead — no extra DOM node:

```ts
import { useFadingScroll } from "@mkbabb/glass-ui/fading-scroll";
useFadingScroll(containerRef, { axis: "x" });   // writes --fade-start/--fade-end on the root
// + the container carries `fading-scroll fading-scroll--x` + the data-fade-* attrs
```

A consumer who overrode `--mask-fade-width` (`:root { --mask-fade-width: 0.5rem }`) re-pins
`--fade-scroll-width` instead. The native `scroll(self)` timeline is the primary path
(zero JS on a supporting engine); the `useFadingScroll` JS fallback covers older engines
automatically. The fade does NOT vanish under `prefers-reduced-motion: reduce` (it is a
legibility cue, not motion — it stops interpolating, the discrete edge presence stays).

---

### The disco CTA register retired — `btn-audacious` / `btn-audacious-gold` GONE (BA.W-GLASS-CAL, hinge H2a)

The user removed the "disco effect" wholesale. The `@utility btn-audacious` + `@utility btn-audacious-gold`
recipes (the sparkle `✦` glyph, the disco-grain hover, the gold-sweep shimmer, the typed press-ripple)
and their `@keyframes sparkle-sweep` / `btn-gold-bg-sweep` + the `--duration-sparkle` /
`--glass-grain-opacity-disco` / `--ripple-radius-max` / `--motion-duration-ripple` knobs are **DELETED —
clean break, no alias** (house no-backwards-compat). The `primary-audacious` / `gold-audacious` Button
**variant keys are KEPT and re-pointed** onto the calm glass-first register (hinge H2 arm a — *gold
survives CALM*), so a `<Button variant="primary-audacious">` / `variant="gold-audacious">` call site needs
**no change** — it inherits the new register automatically. Only a consumer that applied the `btn-audacious`
*utility class directly* (not via the variant) must migrate.

| was | now |
|---|---|
| `class="btn-audacious"` (the disco utility, applied directly) | the calm glass register — `class="glass-wash btn-glass text-foreground"` (the `--glass-specular` edge gleam + the §6 hover/press) |
| `class="btn-audacious btn-audacious-gold"` (the gold sweep) | `<Button variant="gold-audacious">` (the calm glass + STATIC `--color-gold` tint + specular, no animated sweep) — or a hand-authored `class="glass-wash btn-glass"` + a static `bg-[linear-gradient(135deg,color-mix(in srgb,var(--color-gold) 10%,transparent),…)]` tint |
| `<Button variant="primary-audacious">` | **unchanged** — the variant key re-points to the calm glass CTA |
| `<Button variant="gold-audacious">` | **unchanged** — the variant key re-points to the calm gold-glass CTA |
| `@keyframes sparkle-sweep` / `btn-gold-bg-sweep`, `--duration-sparkle`, `--glass-grain-opacity-disco`, `--ripple-radius-max`, `--motion-duration-ripple`, `@property --ripple-radius` | RETIRED (no surviving consumer) |

The dock-tab PRIMARY tier (`<DockTabButton data-tier="primary">`) no longer auto-attaches `btn-audacious` or
paints the phase-grain hover/halo — it reads the plain de-red'd dock-control glass hover register. The
`data-tier="primary"` styling hook is **unchanged** (the taller/wider structural shell stays); only the disco
accents drop. **Speedtest + slides:** any direct `btn-audacious` class binding migrates to the calm glass
register per the table; the `gold-audacious` / `primary-audacious` *variant* consumers are untouched. This is
a **breaking change for direct-utility consumers** (an input to the 4.0.0-vs-3.14.0 version call at W-CLOSE).

### Per-spring duration clock minted — `--spring-<name>-duration` (BA.W-GLASS-CAL Unit 3)

ADDITIVE — no migration required. `--spring-<name>-duration` (generated from the `(response, ζ)` SPRING_PRESETS
table: smooth 0.36s / snappy 0.34s / bouncy 0.69s / gentle 0.44s / dock 0.28s) is the spring's OWN settle clock.
A `transition` that pairs `--spring-<name>` with a generic `--duration-*` now re-points to the matching
`--spring-<name>-duration` so the spring plays at its physical settle (the prior generic clock dragged a dead
sub-pixel tail). A consumer reading `var(--spring-snappy)` directly gains the option of `var(--spring-snappy-duration)`
for the matched clock; the existing generic-clock pairings still work.

### The section-color pop primitive — `<IconChip>` + the `@mkbabb/glass-ui/icon-chip` subpath (BA.W-ICON-CHIP, additive)

ADDITIVE — no breaking change, a NET-NEW primitive + subpath. `<IconChip :icon :section>` (or
`:tone="var(--chart-download)"`) is the library's single section-color POP vehicle — the
`color-mix(… 25%, transparent)` backplate + full-chroma glyph the demo previously hand-rolled as an
inline `:style` paste. It enforces the chip≤glyph proportion IN the component (the
`--icon-chip-glyph-ratio` floor, default 2.18 — a consumer cannot collapse the plate under the glyph)
and ships three opt-in axes (`:duotone` filled-tonal fill / `:bloom` smooth-glass hover / `:reveal`
entrance, all PRM-gated, disco-FREE). A consumer wanting a proportioned section-color pop reaches for
`<IconChip>` instead of re-pasting the recipe. Reachable on the root barrel AND
`@mkbabb/glass-ui/icon-chip`; the types ride `@mkbabb/glass-ui/api` (`IconChipProps`,
`IconChipSection`, `IconChipTone`). `MetricCell`'s `iconColor` prop is unchanged (it now reconciles
internally onto `<IconChip bare :tone>` — the value/unit ink stays neutral; no consumer change).

---

## Cohabitation note—v0.9.4 stays supported

v0.9.4 remains available indefinitely as a v0.9.x patch-stream tag.
v1.0 adoption is opt-in. If you cannot migrate immediately:

- Pin to `^0.9.4` in `package.json`.
- The K.WS subpath typing-publication gap is patched at v0.9.4—you can
  adopt subpath imports incrementally (`@mkbabb/glass-ui/forms`,
  `@mkbabb/glass-ui/composables/dark`, etc.) without breaking your
  existing root-barrel calls.
- When you DO migrate to v1.0, the v0.9.4 subpath adopters have fewer
  call sites to rewrite—only the nested `composables/{dark,keyboard}`
  → flat `/dark` + `/keyboard` shape changes.

There is no scheduled v0.9.4 EOL. The patch line is frozen but not
retired.

---

## Worked example—speedtest re-link

Speedtest re-linked from v0.9.3 (root-barrel imports) directly to v1.0
in commit `98f88325` (`feat(deps): adopt glass-ui v1.0`). The diff
touched 15 src/ files:

| Pattern | Sites | Time to rewrite |
|---|---|---|
| `Input` + `Textarea` → `/forms` | 10 sites | ~10 min (multi-cursor pass) |
| `useGlobalDark` → `/dark` | 2 sites | ~2 min |
| `registerShortcut` → `/keyboard` | 2 sites (incl. 1 test mock) | ~2 min |
| Build + typecheck + lighthouse re-probe |—| ~15 min |

Cross-repo observed deltas (from
`docs/tranches/L/coordination/speedtest-Y.md`):

| Indicator | Pre-v1.0 | Post-v1.0 | Delta |
|---|---|---|---|
| `dist/index.html` modulepreload directives | 1 | 0 | canonical SCC closure |
| Entry chunk gz (speedtest) | ~204 KB (X close) | 171.5 KB | -32.5 KB |
| Glass-ui `dist/glass-ui.js` gz | 33.6 KB (K close) | 22.4 KB | -11.2 KB |
| Glass-ui `dist/glass-ui.js` raw | 189 KB (K close) | 124.8 KB | -65 KB |
| Subpath dts publication (`/dark`, `/keyboard`, `/api`, `/carousel`) | broken (K.WS regression) | self-contained | gap closed |

Speedtest build PASS in 9.83s. Consumer-side vue-tsc resolution clean.

---

## Production demo build—formal retire (per L.W5 Lane B Option B)

`npm run build` is library-mode only—it produces the `dist/glass-ui.{js,css,d.ts}`
bundle plus the per-subpath dist artefacts. There is NO `vite.demo.config.ts`
that produces a static demo build artefact.

**Disposition at L.W5**: option B—formally retire the demo as a production
deploy target. Rationale:

- The demo storybook is dev-mode-only—the canonical workflow is `npm run dev`
  → Vite dev server.
- Lighthouse audits run against the dev server with the documented dev-mode
  caveat. The K.W4 + L.W6 Lighthouse passes used this workflow.
- Consumer-deploy concerns (CloudFlare Pages, Vercel, GitHub Pages hosting,
  cache-TTL, etc.) are out of glass-ui scope—they belong to consumer repos
  (speedtest is the canonical reference for demo build chains).
- Shipping a `vite.demo.config.ts` would create a second build target this
  library does not need to maintain.

If you need a static demo for offline review, the path is: clone the repo,
`npm run dev`, navigate, screenshot. The demo storybook is an internal
authoring substrate, not a published artefact.

---

## Verification checklist

After migrating to v1.0:

```bash
# 1. Build clean
npm run build

# 2. Typecheck clean (vue-tsc or vue-tsc-bundled)
npx vue-tsc --noEmit

# 3. No retired-symbol root-barrel imports remain
rg 'from "@mkbabb/glass-ui"' src/ \
  | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
# (expected: zero hits)

# 4. No retired nested subpath imports remain
rg '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/
# (expected: zero hits)

# 5. No retired composable imports remain
rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow)\b' src/
# (expected: zero hits)

# 6. No retired subpath imports remain
rg '"@mkbabb/glass-ui/(pagination|virtual)"' src/
# (expected: zero hits)

# 7. Bundle re-probe (consumer-specific; speedtest observed -32.5 KB entry-chunk gz)
```

---

## reka-ui 2.x — Combobox `searchTerm` → `ComboboxInput` v-model (AW.W26)

> Downstream-consumer note. glass-ui's own `Combobox*` wrappers are ALREADY on
> the canonical 2.x shape — this note is for consumers who hand-wired the reka
> Combobox primitive directly and still bind the pre-2.x `v-model:search-term`
> on `ComboboxRoot`.

reka-ui 2.x moved the search/filter term OFF `ComboboxRoot` and ONTO
`ComboboxInput`'s `v-model`. The pre-2.x `<ComboboxRoot v-model:search-term>`
binding **silently no-ops** on 2.x (the prop no longer exists on the root) — and
because a stale reka model binding is a no-op, neither `vue-tsc` nor a unit test
catches it; only a render-effect probe does (the standing binding-verification
note + glass-ui's own `proof:reka-binding-idiom` render guard).

```vue
<!-- BEFORE (pre-2.x) — the filter term on the root -->
<ComboboxRoot v-model:search-term="query">
  <ComboboxInput />
</ComboboxRoot>

<!-- AFTER (reka 2.x) — the filter term on the input -->
<ComboboxRoot>
  <ComboboxInput v-model="query" />
</ComboboxRoot>
```

glass-ui's `<Combobox>` / `<ComboboxInput>` already forward the 2.x shape (the
wrapper passes `ComboboxRootProps`; the search term rides `ComboboxInput`), so a
consumer on glass-ui's wrappers needs no change — this is only for hand-rolled
reka usage. Sweep on every reka major bump.

---

## Reference

- **CHANGELOG**: full v1.0 entry at the top of `CHANGELOG.md`.
- **Tranche plan**: `docs/tranches/L/L.md` (invariants, hard gates).
- **HEADLINE wave proof**: `docs/tranches/L/audit/W1-{A,B,C}-*.md`
  (root-barrel curation, api/ discovery, subpath flatten).
- **Wire-or-retire proofs**: `docs/tranches/L/audit/W3-{A,B}-*.md`
  (composables + primitives).
- **Cross-repo verification**: `docs/tranches/L/coordination/speedtest-Y.md`
  (re-link ledger, before/after deltas).
- **Research basis**: `docs/tranches/L/research/Rε-architectural-transpositions.md`
  (HEADLINE rationale).
- **Speedtest re-link diff**: speedtest commit `98f88325`
  (`feat(deps): adopt glass-ui v1.0`).

## 3.13.0 — the constellation kVis floor (R5-8, additive)

The constellation gains a visual-size draw-scale FLOOR: `kVis = max(k, kFloor)` applied by
`drawNodes`/`drawEdges`/`drawPointerWeb`/`drawRipples` to SIZES (dot radii, line widths, the
cursor dot, the ripple ring) while TRUE `k` keeps positions and reach. On a 390px canvas
(k≈0.30) the dots stop crushing sub-pixel; at/above `0.72·BASE_WIDTH ≈ 922px` (including the
1280 export frame) `kVis === k` exactly — byte-identical by construction. New exports on
`/constellation`: `DEFAULT_K_FLOOR` (0.72) + `kVisOf(field)` (for `drawOverlay` skins to floor
their own marks); new optional `ConstellationField.kFloor` member, tokenable per instance via
`--constellation-k-floor` (read by `<Constellation>` from the canvas). No API changes to the
existing exports; the slides deck-side `K_VIS_FLOOR` interim arm retires on this release.

## BA — the d6-lineage A/B reconciliation (the Connectivity Atlas fold)

The Connectivity Atlas consumed the d6 fork lineage (the registry 3.11.x/3.12.0 publishes)
and moves to mainline. BA.W-ATLAS-RECONCILE folds the d6 A/B registers need-shaped. Per the
atlas letter: zero legacy shims, zero compat re-exports — where an idiom was superseded, the
new shape is below and the consumer migrates. The full old→new table is in
`docs/tranches/BA/audit/W-ATLAS-RECONCILE-cut-notes.md`.

### A-1 — the post-flip settle seam (ADDITIVE, no migration)

`useGlobalDark().onFlipSettled(cb)` returns to mainline ADOPTED VERBATIM from the d6 fork —
register ONE post-flip post-paint callback (`(isDark: boolean) => void`) that batches N
expensive re-theme ops (palette memo + chart retint + aurora re-derivation) into a single
coalesced `requestAnimationFrame` beat per flip. On `/dark` + `/api`
(`DarkFlipSettledCallback`). No call-site change vs the fork — byte-identical seam.

### A-4a — `PAPER_WASH_GROUND` (ADDITIVE, no migration)

The library-canon recessive-ground crayon calibration partial returns ADOPTED VERBATIM. On
the `/aurora` barrel + `/api`. Spread it over a consumer's pole-derived pigment:
`const cfg = { ...consumerBase, ...PAPER_WASH_GROUND }`.

### A-4b — the route transition: `navigate` over the ONE VT substrate (ONE-LINE RENAME)

The d6 `useRouteTransition()` standalone wrapper is SUPERSEDED — there is NO parallel route
wrapper. `navigate` is a thin convenience over the ONE `useViewTransition` substrate
(`startViewTransition` gained an async update + a JS-level reduced-motion instant-path).

```ts
// OLD (d6 fork)
const { navigate } = useRouteTransition();
await navigate(() => router.push(`/${slug}`));

// NEW (mainline) — `navigate` is a DIRECT named import (root barrel or /motion-core)
import { navigate } from "@mkbabb/glass-ui";
await navigate(() => router.push(`/${slug}`), { types: ["forward"] }).finished;
```

`supportsRouteTransitions()` mirrors `supportsViewTransitions()`. Under reduced motion (or an
unsupported engine) the navigation runs instantly, unanimated — information parity absolute.

### C-3 — the silver structure quad + `variant="structure"` (NEW, additive)

The silver structure metal (`--silver`/`-light`/`-dark`/`-deep` + `--color-silver*` aliases,
gold's cool mirror) + the `<InstrumentChassis variant="structure">` register (the cool
milled-metal housing). The atlas's structure surface adopts `variant="structure"` (or reads
the `--color-silver*` tokens) for the precision-instrument register.

### A-5 — `MetricBadge` `amount`→`value` (ONE-LINE RENAME; already shipped at AZ)

`<MetricBadge :amount="…">` → `<MetricBadge :value="…">`. The atlas acknowledged this is
intentional; see the AZ.W-METRIC-UNIFY row above (`MIGRATION.md` §3.x amount→value).

## BA → 4.0.0 — the dark-register-rebuilt cut (the clean breaks)

The 4.0.0 major collects the BA tranche's clean breaks (no aliases, no compat shims — the
no-backwards-compat house rule: a clean break IS a major). H4 SETTLED to **4.0.0** on the
atlas register-D two grounds (§the d6 reconciliation above): the A-list is a
removal+re-add for a live 3.12.0 fork consumer, AND BA carries its own breaks below. Each row
names the wave, the break, and the consumer re-pin action. **The value.js-impacting rows
(tabs, Dialog, menu-row, Select, Slider) are flagged `[value.js]` by name** — value.js is the
live 3.13.0 registry consumer owed the named cut-notes (the atlas register-D discipline — by
name, never silently; the full value.js adopt is `docs/tranches/BA/audit/valuejs-adopt-book.md`).

### The disco retirement (W-GLASS-CAL / H2a) — gold survives CALM

The audacious disco-grain recipe family RETIRES (clean break, no alias): the `@utility
btn-audacious` / `btn-audacious-gold` recipes, the `@keyframes sparkle-sweep` /
`btn-gold-bg-sweep`, and the disco-grain knobs (`--duration-sparkle`,
`--glass-grain-opacity-disco`) are GONE. Gold survives in the CALM register per H2a arm (a):
the static `.gold-shimmer` text gradient + the `--glass-specular` edge catch-light registers
STAY (the FENCE held — only the ANIMATED sweeps die). The dock-tab primary tier collapses onto
the plain glass hover register (no grain / `--phase-color` radial halo). **Consumer re-pin:**
drop any `<Button variant="primary-audacious">` / `gold-audacious` binding (the variant rides
the retired recipe) or accept the calm register — the slides `DeckGate.vue:70`
`variant="primary-audacious"` is the named live break site (see the slides adopt book).

### The tone-on-glass recompose (W-FEEDBACK-TONE)

Toast / Notification / Alert tone variants render TINTED-GLASS over the floating rung (ONE
`.feedback-tone` `color-mix` recipe, α < 0.92 both modes), NOT an opaque saturated slab. The
three independent tone maps collapsed onto the ONE recipe. **Consumer re-pin:** a consumer that
hardcoded a tone-slab color re-points to the house tone token; the slab look is gone.

### The static scroll-fade retirement (W-FADING-SCROLL)

The static `.scroll-fade-*` utilities RETIRE (clean break). **Consumer re-pin:** migrate to the
`<FadingScroll>` primitive (`@mkbabb/glass-ui/fading-scroll`) — a native `scroll(self)`-driven
edge-fade with a JS fallback. A consumer's local FadingScroll prototype (slides had one) deletes
on the bump.

### PresetEditorField retires onto the Configurator chassis (W-CONFIG-CHASSIS)

The gear PresetEditor recomposes on the Configurator chassis; `PresetEditorField` is REMOVED
(clean break). **Consumer re-pin:** the migration is the `<ConfiguratorRow>` composition shape
(label + control row; `DarkModeToggle` on the live `useGlobalDark` seam). The section divider
COLOR moved off the inline `border-border/30` alpha to the dark-adaptive
`--configurator-divider` token, keyed by the `data-dividers` attribute (the `border-t` WIDTH
arm stays).

### The shared `surface` axis (W-SURFACE-AXIS) — incl. the Dialog break `[value.js]`

The shared `{glass · veil · opaque}` `surface` axis is adopted across
Card / GlassPanel / Dialog / Sheet / Drawer / Popover / Command / ExpandableContainer / Skeleton
(`surface-axis.css` + `useSurfaceAxis`). It is ADDITIVE where it extends a union, but two breaks
a consumer re-pins:
- **The Dialog `variant`→`surface` move `[value.js]`** — Dialog's prior `variant` discriminant
  is the `surface` axis now. A consumer setting `<Dialog variant="…">` re-points to `surface="…"`.
  (value.js DeckGate sets no `variant` on its Dialog → a NO-OP for slides specifically; the
  value.js consumer of `/dialog` re-pins.)
- **The GlassPanel↔Card axis reconciliation** — the two surfaces share the ONE `surface` axis;
  a consumer relying on the prior divergent prop shape re-pins to the unified `surface` prop.
- **`<Skeleton surface="glass">`** is the named downstream register for value.js's bespoke
  `PaletteCardSkeleton.vue` (`bg-foreground/[0.04]` over `bg-card` — the "too black" composite)
  re-author at the pin.

### The tabs taxonomy cut (W-TABS) `[value.js]`

ONE tab engine: `<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`, pill-glass + underline-paper on
`.paper-ink-mark`). The clean breaks (no alias):
- **`ui/Tabs` LEFT the public root barrel** — the reka `Tabs`/`TabsList`/`TabsTrigger`/
  `TabsContent` wrapper family is OFF `@mkbabb/glass-ui` (the reka substrate stays INTERNAL
  solely for the dock-rail consumer). Canonical panel-nav is `<SegmentedTabs variant="underline">`.
- **`segmented`→`pill` `[value.js]`** — the SegmentedTabs `segmented` variant folds onto `pill`;
  value.js's `PaneSegmentedControl.vue` (consumes `@mkbabb/glass-ui/tabs`) re-points the variant.
- **`multi-select` → `<ToggleGroup>`** — the multi-select tabs arm retires onto ToggleGroup
  (the independent-toggles surface; Tabs is panel-nav only).
- **`overflow` responsive-collapse** retired (the prior `:responsive` collapse arm).
The indicator paints ONE elastic register (the oval-blob default-ON `TabsIndicator` plate is dead).
`proof:tabs-unified` re-pointed to `proof:tabs-std`.

### The menu-row glass default flip (W-MENU-GLASS) `[value.js]`

The `.glass-menu-row` register is minted on the shared `menuItemVariants` CVA — DropdownMenuItem /
ContextMenuItem / Select / Combobox / Command items inherit the element-level oklab-tint hover/
highlight by DEFAULT. The base flat-fill (`hover:bg-accent` / `focus:bg-accent` /
`data-[highlighted]:bg-accent` / `data-[state=open]:bg-accent`) is DROPPED — `accent` is now the
explicit opt-out ESCAPE, not the base. **Consumer re-pin:** a consumer relying on the flat
`bg-accent` highlight re-points; the `.glass-menu-section` mono-caption/hairline recipe is the
section register. `[value.js]` — the dropdown/context-menu glass register.

### The `/underline`→`/handmark` DEC-8 fold (W-HANDMARK)

The d6 hand-voice family RE-LANDS on `@mkbabb/glass-ui/handmark` (`HandMark`/`InkMark`/`BRUSHES`).
The prior `GlassUnderline` + `custom/underline/` + the `/underline` subpath RETIRE (clean break,
grep-negative survivor). **Consumer re-pin:** a consumer importing `@mkbabb/glass-ui/underline` /
`GlassUnderline` re-points to `/handmark` (`<HandMark>`). (slides imports ZERO `/underline` — the
red pen-underlines on its intro/closer slides are deck-LOCAL CSS/SVG glyphs, never the library
component; a NO-OP for slides — see the slides adopt book.)

### The `CarouselDots`→`PagerDots` retirement (W-PAGER)

`CarouselDots` RETIRES onto the unified `<PagerDots>` + `.glass-pager-ring` register
(`@mkbabb/glass-ui/pager`) — the carousel counter off the dark `bg-card` slab. The dots and the
slides `DeckPager` were ALREADY one recipe (≥2 consumers by construction). **Consumer re-pin:**
a `CarouselDots` consumer re-points to `<PagerDots>`.

### Dark-material token-identity NOTEs (W-DARK-MATERIAL — token re-points, not API breaks)

The dark register is rebuilt on the EXISTING `--glass-tint-*` seam (no new compositing seam):
the page→card L-point split (page L6→L4, card L10→L16), the transmissive dark `saturate`/
`brightness` arm + edge α 0.22, the dark tint LIFT 12%, and the `--primary` →
legendre-violet (`oklch(0.739 0.134 318.1)`, fg 7.15:1). These are TOKEN re-resolutions on the
inheriting axis — a consumer overriding a `--glass-*` / `--primary` token re-checks its value
against the rebuilt register, but there is no API/prop break (the W-DARK-MATERIAL scope-7
self-engage conditionalization REMOVES the gray-slab self-engage a calm-light content card
composited — a consumer's content card un-grays at the bump with ZERO consumer edit).

### Warm-chroma-floor NOTEs (W-NO-GRAY — token re-saturation, not API breaks)

The neutral ladder + light glass plates + borders are re-saturated onto the warm identity (the
achromatic-48 ladder lifted above the C 0.020 chroma floor). TOKEN re-resolution; no API break.
A consumer overriding a neutral token re-checks its chroma.

### The `--glass-blur-*` dial-back (W-GLASS-CAL B1 — token re-point, not API break)

The six `--glass-blur-*-radius` primitives dialed back ~15-20% within the 8-15px band
(`10/12/16/15/11` → `8/10/13/13/9`; wash unchanged at 1px; the dock radius 11px→9px). TOKEN
re-resolution; no API break. The per-spring `--spring-<name>-duration` vocabulary is MINTED (the
analytic 2%-band settle envelope, GENERATED from `SPRING_PRESETS`) — a consumer that rode a
`--spring-*` easing on a generic `--duration-*` clock gains the matched per-spring duration.

### The `@source` re-point (W-EMISSION — consumer-wiring fix, not an API break)

The dead `@source` in `index.css` re-points to the real `dist/` surface so glass-ui's compiled
utilities reach a consumer's Tailwind content-scan again. The Select collision-bound + inner-
scroll ship as PRECOMPILED CSS; the Slider `size` axis now renders REAL track geometry in every
consumer (no rename, but the rendered behaviour changes — a consumer relying on the silently-6px
track now gets the real `size` track) `[value.js — the A-3 Slider size axis]`. The
`SelectTrigger` `size` gained a font-rung prop writing `--dropdown-text` `[value.js — WO-3]`.

### `MetricBadge` `amount`→`value` (already shipped at AZ; re-flagged here for the BA consumer set)

Carried verbatim from AZ.W-METRIC-UNIFY (above) — a ONE-LINE `amount=`→`value=` rename per call
site. Named here so a consumer adopting the 4.0.0 cut sees it in the BA break list.

### `Drawer*` moves to the `/drawer` subpath (BB.W-DRAWER-ABROGATE — clean break, no alias)

The Drawer family is re-built on reka `DialogRoot` + the house `useDrawerSnap` engine (a
`@mkbabb/keyframes.js` `SpringProgress` consumer), abrogating vaul-vue (the lone `@vueuse/core
^10.8` dual → full `@vueuse ^14` convergence). Because the rebuilt Drawer now bears the optional
`@mkbabb/keyframes.js` peer, it CANNOT inline that peer into the vueuse-free root bundle, so it
ships via a dedicated subpath like dock/aurora:

```ts
// before (v4.0.0)
import { Drawer, DrawerContent, DrawerTrigger } from "@mkbabb/glass-ui";
// after (v4.1.0) — one-line rename per call site
import { Drawer, DrawerContent, DrawerTrigger } from "@mkbabb/glass-ui/drawer";
```

The `mode` / `surface` / `showOverlay` props + the `[data-surface]` axis are PRESERVED byte-for-byte;
the `[data-vaul-*]` state-attribute LOOK keys re-pointed to `[data-glass-drawer-*]` (a consumer that
hand-styled `[data-vaul-snap-points]` re-points to `[data-glass-drawer-snap-points]`). The
direction-aware default snap ladder is now native (`resolveDefaultSnapPoints(direction)` — no more
`:snap-points="[]"` workaround for a full-slide left/right drawer).

### `.glass-refract` → `.glass-lens` (BB.W-LENSING — clean break, no alias)

The refractive-glass opt-in class is renamed `.glass-refract` → `.glass-lens` (the iOS-26
edge-lensing vocabulary). The class now composes the EVOLVED squircle bevel-profile displacement
filter (the crude AW.W23 uniform-radial map is RETIRED) + the typed inheriting `--glass-refract`
magnitude axis (the `:active` lens-swell). The `--glass-refract*` AXIS/token names are KEPT (only the
opt-in CLASS renames). One-line rename per call site:

```html
<!-- before (v4.0.0) -->
<div class="glass-floating glass-refract">…</div>
<!-- after (v4.1.0) -->
<div class="glass-floating glass-lens">…</div>
```

`<Button :liquid>` re-points internally (no consumer change). Off-Chromium the lens still degrades to
the un-gated blur+tint base (the `@supports (backdrop-filter: url(#…))` floor, PRESERVED).

### Refraction gains a Tier-1 WebGL2 FLOOR — the SOTA degrade ladder (BG.W-GLASS-REFRACT-WEBGL — additive, no consumer break)

The `.glass-lens` refraction now sits on a three-rung SOTA degrade ladder, so the depth-refraction reads
on EVERY engine — not just Chromium:

- **Tier-0 (CSS box-shadow)** — the `--glass-edge-dispersion` rung, the un-gated floor.
- **Tier-1 (WebGL2)** — `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (NEW), the universal
  Safari-safe primary. The prior refraction rode the CSS-SVG `#glass-refract` `feDisplacementMap` filter,
  which is **DEAD on Safari/WebKit + Firefox 2026** (a `backdrop-filter: url()` displacement never
  rasterizes there → the refraction silently collapsed to a flat blur on half the web). The WebGL2
  fragment pass renders the SAME edge-concentrated squircle depth-refraction + the absolute-rim chromatic
  split (`ca = inward · rim · uChromatic · CHROMATIC_SCALE`, `CHROMATIC_SCALE = 0.0045`) on any WebGL2
  engine.
- **Tier-2 (WGSL)** — `glassShader.wgsl` where `navigator.gpu` is present (the highest fidelity).

**Nothing to do — the ladder is internal.** No public class/prop/token changes: `.glass-lens` and the
`--glass-refract*` axis are byte-identical. The new **`--glass-chromatic-strength`** scalar (typed
`@property <number>`, `initial-value: 0` — no fringe by default) threads the Tier-1/Tier-2 `uChromatic`
uniform; a consumer opts into the rim dispersion by raising it (e.g. `--glass-chromatic-strength: 0.25`)
and leaves it 0 for the depth-only lens. The `--glass-chromatic-strength` float scalar is a SIBLING of the
Tier-0 `--glass-edge-dispersion` box-shadow rung (they do NOT collide — one is a GL-uniform float, the
other a CSS box-shadow).

### `popover-animate` / `slide-in-from-side` → `.glass-reveal` (BB.W-LIQUID-REVEAL — clean break, no alias)

The reka-overlay enter `@utility popover-animate` (the fixed-bezier `zoom-in-95` + `fade-in-0`) AND
`@utility slide-in-from-side` are RETIRED, replaced by the spring-clocked LIQUID-ENTER recipe
`.glass-reveal` (the iOS-27 bloom: scale + fade + `filter` blur-settle on `--spring-snappy` +
`--spring-snappy-duration`, exit `--ease-out` no-overshoot, PRM-snap). The ≥9 enrolled overlays
(Dialog/Popover/Sheet/Tooltip/HoverCard/DropdownMenu/ContextMenu/Combobox/Select + HoverPopover)
re-point INTERNALLY — **no public-prop break; the default enter upgrades to liquid glass.** The
Dialog `spring` opt-in (`useSpringMount` drag-dismiss) is UNCHANGED.

A consumer who hand-composed `popover-animate` / `slide-in-from-side` directly on a CUSTOM portal
surface re-points to `glass-reveal` (the directional `slide-in-from-side` folds onto `.glass-reveal`'s
`data-side` compositor `translate` leg):

```html
<!-- before (v4.0.0) -->
<div class="glass-floating popover-animate slide-in-from-side">…</div>
<!-- after (v4.1.0) -->
<div class="glass-floating glass-reveal">…</div>
```

NEW: `useLiquidReveal(surfaceRef, { trigger, preset })` (`@mkbabb/glass-ui/motion`) — the source-rect
bloom JS leaf (the dialog-from-button / dock-from-pill case), composing the kf `ElementMorph` +
`springTimingFunction`. The CSS `.glass-reveal` recipe is the zero-JS everywhere floor; the JS leaf is
the source-rect refinement.

## BG — the glass standardization cut (clean breaks)

### The `--glass-blur-dock` chain RETIRES (BG.W-CLOSEFIX-9SITE — clean break, no alias)

The dock-own blur register — `--glass-blur-dock` (light + dark composite), `--glass-saturate-dock`
(light + dark), `--glass-blur-dock-radius`, and the `--blur-dock` `@theme` bridge (→ the `blur-dock` /
`backdrop-blur-dock` Tailwind utility) — is RETIRED wholesale. It was orphaned at BG.W-GLASS-BLUR-PEER,
which re-pointed the dock's backdrop onto the ONE unified glass material via `--dock-surface-blur:
var(--glass-blur-resting)` (the 8px resting peer). The dock now paints its blur through that peer; there
is no dock-own rung.

**Consumer impact:** none for the token cascade (the chain had zero external readers — the dock reads
the resting peer, and the `blur-dock` Tailwind utility had zero consumers). A consumer who authored
`class="blur-dock"` / `class="backdrop-blur-dock"` directly (there were none in the constellation) re-points
to `backdrop-blur-glass-resting` (the 8px material) or overrides the `--glass-blur-resting-radius` primitive.
A consumer who overrode `:root { --glass-blur-dock-radius: … }` to retune the dock blur now overrides
`--glass-blur-resting-radius` (the substitution-vs-composite discipline — the dock shares the resting
material).

```css
/* before (v4.2.0) — retune the dock blur */
:root { --glass-blur-dock-radius: 12px; }
/* after (BG) — the dock reads the unified resting material */
:root { --glass-blur-resting-radius: 12px; }
```

This retire ROW is the **bbnf-buddy row-4 by-name-ask witness** of the 5.0.0-BH-B7
consumer-migration roster (`bbnf-glass-blur-dock-retune-no-op`; `preset.css:230`) —
the sole in-repo witness now that the sibling-probe gate `proof:retired-token-consumers`
is KILLED (ruling #3). A consumer overriding `--glass-blur-dock`/`-radius`/`--glass-saturate-dock`
drops the dead override on its own bump; there is no glass-ui gate probing the sibling
tree. See `docs/tranches/BH/coordination/asks-and-consumes.md` (row 4) + `proof:crossrepo-asks:bh`
(the `>=4` covered-floor).

### `ladder.css` / `shell.css` carves (BG.W-CLOSEFIX-9SITE — no-god-module, no consumer impact)

`glass/ladder.css`'s grain `::after` overlay tail carves into `glass/grain-overlay.css`, and `dock/shell.css`'s
`#persistent` region + vertical layer-stack tail carves into `dock/shell-regions.css` (each @import-ed
IMMEDIATELY AFTER its parent in the SAME `@layer components`, cascade-order-invariant → the `/styles`
draw is unchanged). Internal carves to hold the 500-line no-god-module bound; zero API/paint delta.

### The dead-composable cut (BG.W-DEAD-COMPOSABLE-CUT — clean break, no alias)

Five F5-motion composables (+ their paired CSS, tests, "≥2-consumer" evidence docs, and subject
gates) shipped with 0-1 real binary consumers — the shelf-ware the fewer-sharper-primitives law
forbids. They are DEFINITION-ABSENT (a clean cut; there is no replacement primitive because there
was no real consumer to serve). The dead `useMorphField()` WELD (zero callers) is GUTTED to its
motion-named SIGNATURE DATA.

| removed | prior surface | disposition |
|---|---|---|
| `useHaptic` (+ `HapticPattern`/`UseHapticOptions`/`UseHapticReturn`) | root barrel · `/motion-core` · `/api` | REMOVED — no replacement. A consumer wanting a body-confirm buzz calls `navigator.vibrate` directly behind its own feature-detect. |
| `useCelebrationBurst` (+ `CelebrationBurstPreset`/`UseCelebrationBurstOptions`/`UseCelebrationBurstReturn` + `jubilance.css` + `.glass-celebration-petal`) | `/motion` · `/api` types | REMOVED — no replacement. |
| `useVizChoreography` | internal (`composables/glass/`, never exported) | REMOVED — no consumer impact (unexported). |
| `useLiquidMorph` (+ `src/styles/glass/liquid-morph.css`) | never exported; the liquid-dock demo | REMOVED — the demo (`liquid-playground.vue`) composes the shipped `useBloomUp` source-rect bloom + the SVG-goo bridge; `liquid-morph.css` MOVED to `demo/stories/dock/` (demo-only, off the library bundle). |
| `useDockContextSilhouette` (+ `AppSwitcher`'s stale reference) | never exported (`custom/dock/composables/`) | REMOVED — no live consumer (the founding demo reads `useBloomUp`); a future dock context→silhouette need re-enters through the shipped dock-morph family. |
| `useMorphField()` (the weld function + `MorphTier`/`MorphSilhouette`/`MorphFieldRect`/`BodySpec`/`MorphFieldOptions`/`MorphFieldHandle`) | root barrel · `/motion-core` | GUTTED — the weld body had ZERO callers. Its live surface — `MORPH_SIGNATURES` + `MorphSignature`/`MorphSignatureName`/`MorphVector` — MOVES to `composables/motion/morphSignatures.ts` and STAYS on the barrel (byte-identical DATA). |

**Consumer re-pin (`MORPH_SIGNATURES`):** none — the import path is unchanged (the root barrel + `/motion-core` still re-export `MORPH_SIGNATURES` and the three signature types). Only the `useMorphField` function symbol + its function-domain types leave the surface. Machine-locked by `proof:motion` (the DEFINITION-ABSENCE + the gut + the name-collision fence against `proof:liquid-morph`, the DISTINCT BC dock-morph gate).
