// @mkbabb/glass-ui/api — canonical public types + constants discovery layer.
//
// This subpath is the pure-types/constants discovery surface for glass-ui's
// canonical public shapes. It re-exports from each canonical home — never
// declares its own types — so a consumer can write:
//
//     import type { AuroraConfig, ButtonVariants } from "@mkbabb/glass-ui/api";
//     import { MAX_NUCLEI, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/api";
//
// without dragging Vue runtime or component implementations into their build.
//
// Scope criteria — what rides this discovery layer:
//
//   - Re-export only types/constants that are ALREADY on the canonical public
//     surface (i.e. exported from a package's `index.ts` or named-subpath barrel).
//   - Variant-prop types (`*Variants`) for the four-state component contract.
//   - Domain shapes that consumers type fixtures + presets against (Aurora,
//     Configurator).
//   - Semantic surface enums (`CardTier`, `InstrumentChassisPhase`,
//     `ToastVariant`).
//   - Aurora numeric ceilings + default config (consumers building presets).
//
// NOT in scope (defer to component-specific subpaths):
//
//   - Composable option/return types EXCEPT canonical return-shape interfaces
//     (`ConfiguratorState`, `SidebarState`, `FuzzySearchState`) which consumers
//     pin against when typing component wrappers or fixtures.
//   - Carousel domain types — vueuse-bearing per-subpath only.
//   - Dock orientation/state — component-internal; not on public surface.

// ── Aurora ─────────────────────────────────────────────────────────────────
// Substrate config + family, plus numeric ceilings the consumer needs to
// type-check preset shapes against.
export type {
    AuroraAtoms,
    AuroraConfig,
    AuroraCursorApi,
    AuroraFlow,
    AuroraHarmony,
    AuroraHuePath,
    AuroraInstance,
    AuroraInteractivity,
    AuroraInteractivityAtom,
    AuroraMedium,
    AuroraMediumAtom,
    AuroraMotionAtom,
    AuroraNucleus,
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

export {
    DEFAULT_AURORA_CONFIG,
    // BA.W-ATLAS-RECONCILE A-4a (d6 9467bd16 adopt) — the library-canon
    // recessive-ground crayon calibration partial (spread over a consumer's
    // pole-derived pigment for a paper-on-tooth data-ground aurora).
    PAPER_WASH_GROUND,
    MAX_NUCLEI,
    MAX_STOPS,
} from "../components/custom/aurora";

// ── Configurator ───────────────────────────────────────────────────────────
// Preset descriptor + state-machine return shape. Consumers building generic
// configurator wrappers (e.g. aurora chrome) type against these.
// `ConfiguratorCloneMode` drives the per-preset vs. commit-on-write
// disposition — the aurora chrome pins `'per-preset'`; new chrome consumers
// narrow against this union when picking their slot model.
export type {
    ConfiguratorCloneMode,
    ConfiguratorPreset,
    ConfiguratorScrollMode,
    ConfiguratorState,
    ConfiguratorStateOptions,
} from "../components/custom/configurator";

// ── Timeline ───────────────────────────────────────────────────────────────
// Segment data shape consumers type fixture arrays + preset descriptors
// against. `TimelineSegmentState` is the lifecycle enum (parallel to
// `ToastVariant`); `TimelineSegment` is the row shape; `TimelineSegmentGradient`
// is the `{from, to}` endpoint pair.
export type {
    TimelineSegment,
    TimelineSegmentGradient,
    TimelineSegmentState,
} from "../components/custom/timeline";

// ── Surface enums ──────────────────────────────────────────────────────────
// Semantic enums that recur across consumer code paths (typed prop values,
// switch dispatch, preset descriptors). `CardTier` is the 5-rung glass-ladder
// surface vocabulary (wash/quiet/resting/floating/overlay) a consumer types its
// `tier` prop against; `CardSurface` is the orthogonal decoration register
// (`glass` | `cartoon` | `veil` — R5-7 added the borderless/rimless text-plate).
export type { CardTier, CardSurface } from "../components/ui/card";
// BB.W-SCROLL-CARD — the first-class scroll-shrink card family prop types. A
// consumer types `<ScrollCard :max-height>` / `<ScrollCardHeader :sticky>`
// against these; the family ships in the same `card` chunk + `/card` subpath.
export type { ScrollCardProps, ScrollCardHeaderProps } from "../components/ui/card";
// `Surface` is the SHARED {glass·veil·opaque} surface-decoration axis
// (BA.W-SURFACE-AXIS) — the ONE three-rung register every content/floating
// surface (Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/Expandable/
// Skeleton) threads via `surfaceClass`. Distinct from `CardSurface` (Card's
// own superset, which adds the Card-local `cartoon` decoration member). A
// consumer types `<Sheet surface="opaque">` / `<Popover surface="veil">`
// against `Surface`; the discovery layer publishes the union.
export type { Surface } from "../components/ui/_shared";
// `GlassPanelVariant` is the 5-rung glass-ladder surface vocabulary
// (wash/quiet/resting/floating/overlay) parallel to `CardTier` — distinct because
// GlassPanel paints the glass substrate directly while Card composes the same
// ladder via the `tier` prop. (AZ.W-PRUNE2 RESTORE — keyframes.js binds
// `@mkbabb/glass-ui/glass-panel`, so the surface + its api seat are live again.)
export type { GlassPanelVariant } from "../components/custom/glass-panel";
export type { InstrumentChassisPhase } from "../components/custom/instrument-chassis";
export type { ToastVariant } from "../components/ui/toast";

// ── HandMark (the hand-voice mark family, BA.W-HANDMARK) ─────────────────────
// The `/handmark` subpath's public surface: the prop model + the flat Brush
// continuum. `GlassUnderline`/`/underline` RETIRED onto `HandMark shape="underline"`
// (DEC-8 outcome 1; clean break, no alias — the editorial draw-on underline is
// `<HandMark shape="underline" animation="draw-on">`, the natural pencil-boil
// morphology the `boil` brush).
export type {
    HandMarkProps,
    HandShape,
    HandAnimation,
    MarkBox,
    Brush,
    BrushName,
    BlendMode,
    TaperSpec,
    InkPath,
} from "../components/custom/handmark";

// ── CVA variant prop types ─────────────────────────────────────────────────
// Every CVA-driven component's `VariantProps`-derived type. Consumers wrapping
// a component (e.g. a domain Button that forwards `variant` + `size`) type
// against these instead of redeclaring the union.
export type { AlertVariants } from "../components/ui/alert";
export type { AvatarVariants } from "../components/ui/avatar";
export type { BadgeVariants } from "../components/ui/badge";
export type { ButtonVariants } from "../components/ui/button";
export type { SheetVariants } from "../components/ui/sheet";
export type { SliderVariants } from "../components/ui/slider";
export type { ToggleVariants } from "../components/ui/toggle";
export type { ToggleChipVariants } from "../components/custom/toggle-chip";
// `MenuItemVariants` — CVA-derived union for the 11-site menu/picker item
// four-state contract (command / dropdown-menu / context-menu / combobox /
// select). Sourced from `_shared/` which is private-to-ui/ at runtime; the
// barrel exists so `/api` can pin the canonical type shape.
export type { MenuItemVariants } from "../components/ui/_shared";

// ── Sidebar domain ─────────────────────────────────────────────────────────
// Composable-return canon (`SidebarState`) parallels `ConfiguratorState<T>`.
// `SidebarSection` is the row shape; `TreeNode` + `TreeIndexEntry` +
// `SidebarIndexEntry` describe the flat-index lookup; `ScrollTrackerOptions`
// pins the `useSidebarFollow` option shape consumers customise root-margin
// against.
export type {
    ScrollTrackerOptions,
    SidebarIndexEntry,
    SidebarSection,
    SidebarState,
    TreeIndexEntry,
    TreeNode,
} from "../composables/sidebar";

// ── Search domain ──────────────────────────────────────────────────────────
// `SearchableItem` is the input shape consumers feed `buildIndex` /
// `useFuzzySearch`; `SearchResult` carries scored matches; `FuzzySearchState`
// is the composable-return canon; `UseFuzzySearchOptions` parameterises the
// reactive composable; `SearchIndex` is the prebuilt-index handle the
// imperative `searchIndex(...)` accepts.
export type {
    FuzzySearchState,
    SearchableItem,
    SearchIndex,
    SearchResult,
    UseFuzzySearchOptions,
} from "../components/custom/search";

// ── Props triad ────────────────────────────────────────────────────────────
// `GlassPanelProps` — the props shape sibling of the already-promoted
// `GlassPanelVariant`; consumers wrapping `<GlassPanel>` (chrome composers,
// preset panels) type their forwarded prop bag against this. (AZ.W-PRUNE2
// RESTORE — re-published with the GlassPanel surface for the keyframes consumer.)
export type { GlassPanelProps } from "../components/custom/glass-panel";

// ── Toast row shape ──────────────────────────────────────────────────────────
// `ToastType` is the canonical toast row shape (aliased from `Toast` on the
// toast barrel — `Toast` itself is the SFC default-export, so the row shape
// flows as `ToastType` per shadcn-vue parity); paired with the `ToastVariant`
// enum above.
export type { ToastType } from "../components/ui/toast";

// ── Clipboard ──────────────────────────────────────────────────────────────
// `UseClipboardReturn` — canonical composable-return shape paralleling
// `ConfiguratorState` / `SidebarState` / `FuzzySearchState`. Consumers
// wrapping `useClipboard` (e.g. a domain-specific copy button factory)
// pin against this rather than redeclaring `{ copied, copy }`.
// `UseClipboardOptions` ships paired so consumers can forward the
// `resetMs` / `onCopyError` knobs from a wrapper.
export type {
    UseClipboardOptions,
    UseClipboardReturn,
} from "../composables/dom/useClipboard";

// ── User-invalid ARIA bridge ─────────────────────────────────────────────────
// `UseUserInvalidAriaReturn` — canonical composable-return shape (the `{ bind }`
// handle) paralleling `UseClipboardReturn`. `UseUserInvalidAriaOptions` ships
// paired so a consumer wrapping `useUserInvalidAria` (e.g. a form-shell factory)
// can forward the `fallbackClasses` knob.
export type {
    UseUserInvalidAriaOptions,
    UseUserInvalidAriaReturn,
} from "../composables/dom/useUserInvalidAria";

// ── View-Transition substrate ───────────────────────────────────────────────
// `ViewTransitionResult` — the `{ finished, transitioned }` shape
// `startViewTransition` resolves. The `startViewTransition` +
// `supportsViewTransitions` runtime helpers ship on the root barrel +
// `@mkbabb/glass-ui/motion-core` (dependency-free).
// BA.W-ATLAS-RECONCILE A-4b — `ViewTransitionOptions` gains
// `instantUnderReducedMotion` (the JS-level reduced-motion instant-path) and an
// async-capable update; `NavigateOptions` is the route/navigation convenience's
// option shape (the `navigate(fn)` helper over the ONE VT substrate).
export type {
    ViewTransitionResult,
    ViewTransitionOptions,
    NavigateOptions,
} from "../composables/motion/useViewTransition";

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

// ── HeaderRibbon ───────────────────────────────────────────────────────────
// `HeaderRibbonProps` — props shape consumers forward when wrapping
// `<HeaderRibbon>` (e.g. domain-themed header strips). `HeaderRibbonPosition`
// is the alignment enum (`'left' | 'right'`). (AZ.W-PRUNE2 RESTORE — keyframes.js
// binds `@mkbabb/glass-ui/header-ribbon` in EditorShell, so the surface + its api
// seats are live again.)
export type {
    HeaderRibbonPosition,
    HeaderRibbonProps,
} from "../components/custom/header-ribbon";

// ── Constellation ───────────────────────────────────────────────────────────
// `ConstellationProps` — the props a consumer forwards when wrapping
// `<Constellation>` (the proximity-graph lattice; ships via `/constellation`).
// `ConstellationField` — the live field handed to the `drawOverlay` skin seam,
// so a consumer types its overlay against the node set + scale.
// `ConstellationWarp` — the engine-owned focal-warp spring state (`field.warp`),
// so a consumer types its focal-mark overlay against the spring-eased position
// (the click-to-warp seam).
export type {
    ConstellationProps,
    ConstellationField,
    ConstellationWarp,
} from "../components/custom/constellation";

// ── Fourier field ───────────────────────────────────────────────────────────
// `FourierFieldProps` — the props a consumer forwards when wrapping
// `<FourierField>` (the seeded inverse-DFT epicycle background; the sibling to
// Aurora/Constellation, ships via `/fourier-field`). `FourierFieldVariant` is
// the configuration-bundle axis (`hero` | `final`). The `intensity` knob is the
// Aurora `opacityCeiling`-shape outer loudness envelope (AY.W-FF2). The pure
// inverse-DFT/epicycle math leaf ships separately via `/fourier-math`.
export type {
    FourierFieldProps,
    FourierFieldVariant,
} from "../components/custom/fourier-field";

// ── Metric primitives ───────────────────────────────────────────────────────
// `MetricCellAppearance` is the visual register enum (`"dashboard" | "compact"
// | "bare"`) parallel to `CardTier`; `MetricCellProps` is the Props
// shape consumers forward when wrapping `<MetricCell>`. `MetricStackProps` +
// `MetricRowProps` cover the layout shell + row pair. `MetricBadgeProps` is the
// inline/stacked badge-pill shape (the unified `value` field per
// AZ.W-METRIC-UNIFY). All metric families share the `coalesceMetric` value core
// (the single empty-check + the "—" placeholder default). The cell/stack
// families ship via their `/metric-cell` + `/metric-stack` subpaths (speedtest
// consumes them).
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

// ── PagerDots ────────────────────────────────────────────────────────────────
// `PagerDotsProps` is the Props shape consumers forward when wrapping
// `<PagerDots>` — the ONE position-dot rail register the carousel ships and the
// slides deck adopts (BA.W-PAGER). Ships via its `/pager-dots` subpath.
export type { PagerDotsProps } from "../components/custom/pager-dots";

// ── Digit / SegmentedTabs primitives ────────────────────────────────────────
// Props/variant types for the animated-digit + the unified SegmentedTabs.
// `AnimatedDigitMode` is the damping axis (`"absolute" | "progress"`) forwarded
// into `useAnimatedNumber`; `AnimatedDigitProps` is the consume-side shape.
// `SegmentedTabsProps`/`SegmentedTabsVariant`/`SegmentedTabsOrientation`/
// `SegmentedTabOption` are the standardized tab family (BA.W-TABS) — ONE engine,
// TWO materials (`variant`: pill · underline), ONE orientation axis (horizontal ·
// vertical), responsive collapse as a prop.
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

// ── StackedIconGroup ───────────────────────────────────────────────────────
// `StackedIconGroupProps<TItem>` — the generic shape consumers wiring stacked
// avatar/icon strips pin against from the discovery layer.
export type { StackedIconGroupProps } from "../components/custom/stacked-icons";

// ── IconChip ─────────────────────────────────────────────────────────────────
// The section-color pop primitive (BA.W-ICON-CHIP) — the ONE color-event
// vehicle. `IconChipProps` is the full contract; `IconChipSection` (the 0..12
// ramp index) + `IconChipTone` (a complete token colour, the MetricCell-iconColor
// reconcile path) + `IconChipIcon` (the permissive lucide glyph type) are the
// public axis types consumers pin against.
export type {
    IconChipProps,
    IconChipSection,
    IconChipTone,
    IconChipIcon,
} from "../components/custom/icon-chip";

// ── Dock ───────────────────────────────────────────────────────────────────
// `UseDockStateReturn` — canonical composable-return shape paralleling
// `UseClipboardReturn` / `UseAuroraReturn`. Consumers wrapping `<GlassDock>`
// or authoring a custom dock chassis pin against this rather than
// redeclaring the state-machine handle. `UseDockStateOptions` + `DockState`
// ship via the `/dock` subpath barrel only (component-internal arg + state-enum).
export type { UseDockStateReturn } from "../components/custom/dock";

// ── Paper / texture ────────────────────────────────────────────────────────
// `PaperBackdropProps` — the Props shape consumers forward when wrapping
// `<PaperBackdrop>` (e.g. app-shell substrate composers). `PaperBackdropFrequency`
// is the turbulence-register enum (`"clean" | "aged"`) parallel to
// `AnimatedDigitMode`. The texture-system canonical
// pattern (CSS custom-property cascade via `--paper-*-texture` vars at `:root`)
// is documented in DESIGN.md "Texture system" section.
export type {
    PaperBackdropFrequency,
    PaperBackdropProps,
} from "../components/custom/paper-backdrop";

// ── Dark ergonomics ──────────────────────────────────────────────────────────
// `UseGlobalDarkOptions` — the one-shot `initialValue` seed shape honored on
// FIRST `useGlobalDark()` construction (the createGlobalState factory is
// memoized; a later conflicting seed throws). `DarkModeSyncScriptOptions` —
// options for the parse-time FOUC eliminator `darkModeSyncScript()`, the
// PURE inline-<head>-script string emitter that byte-mirrors the runtime
// dark contract (localStorage["vueuse-color-scheme"] → prefers-color-scheme
// fallback → classList("dark") + style.colorScheme). Both runtime values
// live on the flat `/dark` subpath (vueuse-bearing surface discipline);
// only the types ride the discovery layer.
// `DarkFlipSettledCallback` / `UseGlobalDarkReturn` — BA.W-ATLAS-RECONCILE A-1
// (d6 9467bd16 adopt): the post-flip SETTLE seam shape. A consumer subscribes
// ONE post-flip post-paint moment via `useGlobalDark().onFlipSettled(cb)` (the
// atlas's palette-memo/chart-retint/aurora-rederivation batch). `(isDark) => void`.
export type {
    DarkFlipSettledCallback,
    DarkModeSyncScriptOptions,
    UseGlobalDarkOptions,
    UseGlobalDarkReturn,
} from "../composables/dark";

// ── Canvas2D lifecycle substrate ─────────────────────────────────────────────
// The Canvas2D park/freeze/dispose substrate now ships on the `/canvas` subpath
// (`useCanvas2D`/`useCanvasLifecycle` + `resolveCanvasColor`). Its public option
// + handle + frame shapes ride the discovery layer so a consumer composing the
// substrate (a custom Canvas2D field paralleling Constellation/FourierField)
// pins them without dragging the runtime. `Canvas2DSuspendReason` is the
// three-reason park enum. The runtime values live on `/canvas`.
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "../composables/glass/canvas2d";

// ── Text-highlight controls ──────────────────────────────────────────────────
// `useTextHighlight` (the named CSS Custom Highlight composable) re-homed to
// `/motion-core`. `UseTextHighlightControls` is its imperative-handle return
// shape and `HighlightMatcher` the per-node match callback; consumers wiring a
// search-mark / equation-var highlight pin them here. The runtime value lives on
// `/motion-core` + the root barrel.
export type {
    HighlightMatcher,
    UseTextHighlightControls,
} from "../composables/motion/useTextHighlight";

// ── EasingPicker (the boundary-law curve editor) ─────────────────────────────
// The published <EasingPicker>/<EasingConfigurator> curve-authoring family
// (BB.W-EASING-PRIMITIVE — the C-3 fold). `EasingPickerMode` is the two-arm axis
// (`"bezier" | "steps"`); `EasingPickerValue` is the v-model payload (mode + the
// re-parseable css literal + the live value.js callable + raw params); `JumpTerm`
// is the value.js step jump-term family. The boundary law: curve MATH = value.js ·
// playback = keyframes.js · the editor COMPONENT = glass-ui. The value.js-BEARING
// runtime values live ONLY on the `/easing` subpath (NOT the value.js-free root
// barrel — the /motion-curves SCC-trap precedent).
export type {
    EasingPickerMode,
    EasingPickerValue,
    EasingFn,
    BezierPoints,
    JumpTerm,
    UseEasingPickerOptions,
    UseEasingPickerReturn,
} from "../components/custom/easing";

// ── BorderProgress ───────────────────────────────────────────────────────────
// The masked-conic BORDER ring (BB.W-BORDER-PROGRESS) — progress IS the element's
// border. `BorderProgressProps` is the consume-side shape; `BorderProgressCoverage`
// is the two-arm axis (`"full-ring" | "bottom-edge"`); `BorderProgressMilestone` +
// `BorderProgressMilestoneEvent` are the phase-edge milestone descriptor + emit
// payload. Ships via its `/border-progress` subpath (OFF the root barrel — the
// conic/@property chunk).
export type {
    BorderProgressProps,
    BorderProgressCoverage,
    BorderProgressMilestone,
    BorderProgressMilestoneEvent,
} from "../components/custom/border-progress";

// ── usePointerVelocityField — the shared viz-pointer-physics field (BB.B4 W-VIZ-POINTER) ──
// `PointerVec2` — a 2-vector in normalized-host space (0..1); `UsePointerVelocityField`
// — the field's return shape ({ position, velocity, acceleration, speed, burst, tick, … });
// `UsePointerVelocityFieldOptions` — its options ({ positionLerp, velocityLerp,
// accelerationLerp, burstDecay, respectReducedMotion }). `usePointerVelocityField` is
// engine-FREE + vueuse-FREE (vue-only), so it ships on the root barrel AND
// `@mkbabb/glass-ui/motion-core`. The viz renderer FEEDS it via its frame `tick(delta)`
// (NO own rAF); under PRM it freezes (`tick(0)`). The booked binary consumers are the
// born-WebGPU viz (W-FLOWFIELD + W-CONCENTRIC).
export type {
    PointerVec2,
    UsePointerVelocityField,
    UsePointerVelocityFieldOptions,
} from "../composables/motion/usePointerVelocityField";
