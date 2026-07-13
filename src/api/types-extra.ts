// @mkbabb/glass-ui/api — type-publication extension module (BB.W-CARVE5 carve).
//
// The composable-return + motion-curve type re-exports carved out of api/index.ts
// to hold the discovery barrel under the no-god-module bound. PURE re-exports from
// each canonical home (never declares its own types) — re-joined into the
// @mkbabb/glass-ui/api surface by api/index.ts via `export type * from`, so the
// published subpath symbol set is byte-identical. NO grep-locked discovery types
// (BorderProgress/EasingPicker/Surface/IconChip/HandMark/PagerDots/SpaView) live
// here — those stay textually in api/index.ts for the per-surface source gates.

// ── Count-up animator ────────────────────────────────────────────────────────
// `Countup` — the `{ runActive, settle, cancel }` control shape `useCountup`
// returns; `UseCountupOptions` — its `{ easeFn, skip }` options. `useCountup`
// is keyframes-bearing (it rides `NumericAnimation`), so the composable itself
// ships ONLY on `@mkbabb/glass-ui/motion`, not the root barrel.
export type { Countup, UseCountupOptions } from "../composables/motion/useCountup";

// ── useDragMorph — the pull/drag-to-morph-squish primitive (BB.W-DRAG-MORPH) ──
// `DragMorphAxis` — the morph axis ("x"|"y"); `DragMorphSnapTarget<V>` — one snap
// target ({ value, center }); `UseDragMorphParams<V>`/`UseDragMorphReturn` — the
// gesture's params/return. `useDragMorph` is keyframes-bearing (it wires the kf
// `Draggable`), so the composable ships ONLY on `@mkbabb/glass-ui/motion`, not the root.
export type {
    DragMorphAxis,
    DragMorphSnapTarget,
    UseDragMorphParams,
    UseDragMorphReturn,
} from "../composables/motion/useDragMorph";

// ── useLiquidReveal — the iOS-27 bloom-from-source-rect open (BB.W-LIQUID-REVEAL) ──
// `LiquidRevealPreset` — the spring register ("snappy"|"bouncy"); `UseLiquidRevealOptions`
// — the leaf's options ({ trigger, preset, blur, respectReducedMotion });
// `UseLiquidRevealReturn` — the { reveal, conceal } pair. `useLiquidReveal` is
// keyframes-bearing (it composes the kf ElementMorph + springTimingFunction), so the
// composable ships ONLY on `@mkbabb/glass-ui/motion`, not the root.
export type {
    LiquidRevealPreset,
    UseLiquidRevealOptions,
    UseLiquidRevealReturn,
} from "../composables/motion/useLiquidReveal";

// ── useDockCtaReceive — the external-CTA-morphs-into-dock receive seam (BB.B2 W-DOCKMORPH-CTA) ──
// `DockCtaReceivePreset` — the spring register ("snappy"|"bouncy", matching useLiquidReveal so
// the two seams read as ONE family); `UseDockCtaReceiveOptions` — the leaf's options
// ({ dockControl, preset, blur, respectReducedMotion, onReceived }); `UseDockCtaReceiveReturn`
// — the { receive, reset } pair. useDockCtaReceive composes the SAME kf ElementMorph +
// springTimingFunction substrate useLiquidReveal activates (driven FORWARD — the reveal's
// inverse), a CONSUMING seam beside W-DOCK-MORPH-FAMILY (no dockMorphContext/DOCK_SPRING edit).
// Keyframes-bearing → ships ONLY on `@mkbabb/glass-ui/motion`, never the root.
export type {
    DockCtaReceivePreset,
    UseDockCtaReceiveOptions,
    UseDockCtaReceiveReturn,
} from "../composables/motion/useDockCtaReceive";

// ── useBloomUp — the shared-element FLIP where source≠dest + the 4th color channel (BE.W-BLOOM-UP) ──
// `BloomUpPreset` — the spring register ("snappy"|"bouncy", matching useLiquidReveal/
// useDockCtaReceive so the bloom family reads as ONE); `UseBloomUpOptions` — the leaf's
// options ({ preset, blur, fieldHue, field, fieldStrength, respectReducedMotion, onBloomed });
// `UseBloomUpReturn` — the { bloom, reset, blooming } shape. useBloomUp composes the SAME kf
// ElementMorph + springTimingFunction substrate useLiquidReveal activates (driven 1→0 — a
// SMALL source blooms UP onto a LARGE destination's full settled rect) PLUS a 4th COLOR
// channel on the destination FIELD (the field warms to the source's album hue on the spring
// curve). Keyframes-bearing → ships ONLY on `@mkbabb/glass-ui/motion`, never the root.
export type {
    BloomUpPreset,
    UseBloomUpOptions,
    UseBloomUpReturn,
} from "../composables/motion/useBloomUp";

// ── Motion suite + curve library (AY.W-MOTION2) ───────────────────────────────
// `/motion` is the distribution seam for the @mkbabb/keyframes.js STATIC suite
// (NumericAnimation, Sequence, the spring/FLIP/gesture/stagger constructors,
// loadAnimationEngine itself) — re-exported verbatim; the DYNAMIC engine surface
// stays behind `loadAnimationEngine()`. The complete curve library + the CSS↔JS
// `MOTION_CURVES` table ship on the value.js-bearing flat sibling `/motion-curves`
// (the §2.2 carve — value.js is a ~124 KB peer kept OFF /motion's eager graph).
// The shared (response, ζ) `SPRING_PRESETS` table is value.js-free pure data on both.
//
// `Easing`/`TimingFunction` — the keyframes.js callable-easing shapes a consumer
// passes to a `NumericAnimation`/`SpringProgress`. `MotionCurve` — one row of the
// CSS↔JS table (`{ token, kind, js, canonical?, note }`). `SpringPresetRow`/
// `SpringPresetName` — the shared spring-preset table types.
export type { Easing, TimingFunction } from "../composables/motion/suite";
export type {
    MotionCurve,
    MotionCurveKind,
    CurveFn,
    SpringPresetRow,
    SpringPresetName,
} from "../composables/motion/curves";

// ── Aurora ─────────────────────────────────────────────────────────────────
// Substrate config + family, plus numeric ceilings the consumer needs to
// type-check preset shapes against. (The aurora CONSTANTS —
// DEFAULT_AURORA_CONFIG/PAPER_WASH_GROUND/MAX_NUCLEI/MAX_STOPS — are VALUE
// exports and stay in api/index.ts, which re-joins this module's types.)
export type {
    AuroraAtoms,
    AuroraConfig,
    AuroraCursorApi,
    AuroraFlow,
    AuroraHarmony,
    AuroraHuePath,
    AuroraImageBlur,
    AuroraImageSource,
    AuroraInstance,
    AuroraInteractivity,
    AuroraInteractivityAtom,
    AuroraMedium,
    AuroraMediumAtom,
    AuroraMotionAtom,
    AuroraNucleus,
    AuroraSource,
    AuroraRuntimeMode,
    AuroraRuntimeOptions,
    AuroraZoneArrangement,
    AuroraZones,
    DeriveAuroraOptions,
    DeriveEasing,
    FlowPattern,
    OklchStop,
    StrokeMode,
    StrokeOrient,
    WarpMode,
} from "../components/custom/aurora";

// ── Configurator ───────────────────────────────────────────────────────────
// Preset descriptor + state-machine return shape. Consumers building generic
// configurator wrappers (e.g. aurora chrome) type against these.
export type {
    ConfiguratorCloneMode,
    ConfiguratorPreset,
    ConfiguratorScrollMode,
    ConfiguratorState,
    ConfiguratorStateOptions,
} from "../components/custom/configurator";

// ── Timeline ───────────────────────────────────────────────────────────────
// Segment data shape consumers type fixture arrays + preset descriptors against.
export type {
    TimelineSegment,
    TimelineSegmentGradient,
    TimelineSegmentState,
} from "../components/custom/timeline";

// ── CVA variant prop types ─────────────────────────────────────────────────
// Every CVA-driven component's `VariantProps`-derived type. Consumers wrapping a
// component type against these instead of redeclaring the union. (MenuItemVariants
// + ControlSize stay in api/index.ts beside `Surface` for the _shared per-surface
// source gate; the others ride here.)
export type { AlertVariants } from "../components/ui/alert";
export type { AvatarVariants } from "../components/ui/avatar";
export type { BadgeVariants } from "../components/ui/badge";
export type { ButtonVariants } from "../components/ui/button";
// `SheetVariants` RETIRED at BI.W-DIALOG-PLACEMENT — Sheet folded onto `<DialogContent
// placement>`; its `side` union is the shared `Placement` axis now (`@mkbabb/glass-ui`
// axes). No successor CVA type — the placement is an axis restriction, not a `variant` map.
export type { SliderVariants } from "../components/ui/slider";
export type { ToggleVariants } from "../components/ui/toggle";
// `ToggleChipVariants` RETIRED at BI.W-CHIP-FOLD — ToggleChip folded onto `<Chip>`;
// its `variant` (`chip`/`cell`) was a name-synonym of Chip's `shape`. Consumers read
// `ChipVariants` (`/chip` / api) — the ONE congruent chip recipe's `size × shape` axis.

// ── Search domain ──────────────────────────────────────────────────────────
// `SearchableItem` is the input shape consumers feed `buildIndex` /
// `useFuzzySearch`; `SearchResult` carries scored matches; `FuzzySearchState`
// is the composable-return canon; `UseFuzzySearchOptions` parameterises the
// reactive composable; `SearchIndex` is the prebuilt-index handle.
// (`SearchVariant`/`SearchVariants` stay in api/index.ts for proof:search-custom.)
export type {
    FuzzySearchState,
    SearchableItem,
    SearchIndex,
    SearchResult,
    UseFuzzySearchOptions,
} from "../components/custom/search";

// ── Toast row shape ──────────────────────────────────────────────────────────
// `ToastType` is the canonical toast row shape (aliased from `Toast` on the toast
// barrel); the `tone` field reads the shared `Tone` axis (`/axes`), the former
// `ToastVariant` enum RETIRED (BI.W-SYNONYM-RENAMES — clean break, no alias).
export type { ToastType } from "../components/ui/toast";

// ── Clipboard ──────────────────────────────────────────────────────────────
// `UseClipboardReturn` — canonical composable-return shape paralleling
// `ConfiguratorState` / `SidebarState` / `FuzzySearchState`. `UseClipboardOptions`
// ships paired so consumers can forward the `resetMs` / `onCopyError` knobs.
export type {
    UseClipboardOptions,
    UseClipboardReturn,
} from "../composables/dom/useClipboard";

// ── User-invalid ARIA bridge ─────────────────────────────────────────────────
// `UseUserInvalidAriaReturn` — canonical composable-return shape (the `{ bind }`
// handle). `UseUserInvalidAriaOptions` ships paired as the (currently empty)
// options seam — the legacy `fallbackClasses` knob was retired at BG.NF.2
// W-LEGACY-LADDER-COLLAPSE (`:user-invalid` is Baseline on the target set).
export type {
    UseUserInvalidAriaOptions,
    UseUserInvalidAriaReturn,
} from "../composables/dom/useUserInvalidAria";

// ── View-Transition substrate ───────────────────────────────────────────────
// `ViewTransitionResult` — the `{ finished, transitioned }` shape
// `startViewTransition` resolves. `ViewTransitionOptions` gains
// `instantUnderReducedMotion`; `NavigateOptions` is the route/navigation
// convenience's option shape.
export type {
    ViewTransitionResult,
    ViewTransitionOptions,
    NavigateOptions,
} from "../composables/motion/useViewTransition";

// ── Metric primitives ───────────────────────────────────────────────────────
// `MetricCellAppearance` is the visual register enum (`"dashboard" | "compact" |
// "bare"`); `MetricCellProps` is the Props shape consumers forward when wrapping
// `<MetricCell>`. `MetricStackProps` + `MetricRowProps` cover the layout shell +
// row pair. `MetricBadgeProps` is the inline/stacked badge-pill shape.
export type {
    MetricBadgeProps,
    MetricBadgeSize,
    MetricBadgeLabelPosition,
} from "../components/custom/metric-badge";
export type {
    MetricCellAppearance,
    MetricCellProps,
} from "../components/custom/metric-cell";
export type {
    MetricRowProps,
    MetricStackProps,
} from "../components/custom/metric-stack";

// ── StackedIconGroup ───────────────────────────────────────────────────────
// `StackedIconGroupProps<TItem>` — the generic shape consumers wiring stacked
// avatar/icon strips pin against.
export type { StackedIconGroupProps } from "../components/custom/stacked-icons";

// ── Paper / texture ────────────────────────────────────────────────────────
// `PaperBackdropProps` — the Props shape consumers forward when wrapping
// `<PaperBackdrop>`. `PaperBackdropFrequency` is the turbulence-register enum
// (`"clean" | "aged"`).
export type {
    PaperBackdropFrequency,
    PaperBackdropProps,
} from "../components/custom/paper-backdrop";

// ── Dark ergonomics ──────────────────────────────────────────────────────────
// `UseGlobalDarkOptions` — the one-shot `initialValue` seed shape;
// `DarkModeSyncScriptOptions` — options for the parse-time FOUC eliminator;
// `DarkFlipSettledCallback` / `UseGlobalDarkReturn` — the post-flip SETTLE seam
// shape. Both runtime values live on the flat `/dark` subpath; only the types
// ride the discovery layer.
export type {
    DarkFlipSettledCallback,
    DarkModeSyncScriptOptions,
    UseGlobalDarkOptions,
    UseGlobalDarkReturn,
} from "../composables/dark";

// ── Canvas2D lifecycle substrate ─────────────────────────────────────────────
// The Canvas2D park/freeze/dispose substrate's public option + handle + frame
// shapes. `Canvas2DSuspendReason` is the three-reason park enum. The runtime
// values live on `/canvas`.
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "../composables/glass/canvas2d";

// ── Text-highlight controls ──────────────────────────────────────────────────
// `UseTextHighlightControls` is the imperative-handle return shape of
// `useTextHighlight` and `HighlightMatcher` the per-node match callback. The
// runtime value lives on `/motion-core` + the root barrel.
export type {
    HighlightMatcher,
    UseTextHighlightControls,
} from "../composables/motion/useTextHighlight";

// ── HeaderRibbon ───────────────────────────────────────────────────────────
// `HeaderRibbonProps` — props shape consumers forward when wrapping
// `<HeaderRibbon>`. `HeaderRibbonPlacement` is the placement enum (`'left' | 'right'` —
// BI.W-SYNONYM-RENAMES: the `position`/`HeaderRibbonPosition` synonym renamed to the
// shared `placement` axis vocabulary, clean break no alias).
export type {
    HeaderRibbonPlacement,
    HeaderRibbonProps,
} from "../components/custom/header-ribbon";

// ── Constellation ───────────────────────────────────────────────────────────
// `ConstellationProps` — the props a consumer forwards when wrapping
// `<Constellation>` (the proximity-graph lattice; ships via `/constellation`).
// `ConstellationField` — the live field handed to the `drawOverlay` skin seam.
// `ConstellationWarp` — the engine-owned focal-warp spring state (`field.warp`).
export type {
    ConstellationProps,
    ConstellationField,
    ConstellationWarp,
} from "../components/custom/constellation";

// ── Fourier field ───────────────────────────────────────────────────────────
// `FourierFieldProps` — the props a consumer forwards when wrapping
// `<FourierField>` (the reconstructing-epicycle field on the WGSL-primary GPU
// substrate). `FourierFieldConfig` is the full author config the studio drives.
export type {
    FourierFieldProps,
    FourierFieldConfig,
} from "../components/custom/fourier-field";

// ── Digit / SegmentedTabs primitives ────────────────────────────────────────
// Props/variant types for the animated-digit + the unified SegmentedTabs.
// `AnimatedDigitMode` is the damping axis (`"absolute" | "progress"`);
// `AnimatedDigitProps` is the consume-side shape.
// `SegmentedTabsProps`/`SegmentedTabsVariant`/`SegmentedTabsOrientation`/
// `SegmentedTabOption` are the standardized tab family (BA.W-TABS).
export type {
    AnimatedDigitMode,
    AnimatedDigitProps,
} from "../components/custom/animated-digit";
export type {
    SegmentedTabsProps,
    SegmentedTabsVariant,
    SegmentedTabsOrientation,
    SegmentedTabOption,
} from "../components/custom/tabs";
