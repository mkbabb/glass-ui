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
// `CardVariant` is the BC.W-SELECTION-CARD decoration axis (`"selection"` — the I5
// selection card, the ONE new Atlas component); `CardMetal` is the earned
// selected-rim quad (`"gold" | "silver" | "bronze"`). A consumer types its
// `<Card variant="selection" :metal>` preview-grid against these (the Atlas I5 grid
// re-points its hand-rolled accent threading onto the published `--glass-accent` seam
// on its `^4.x` bump).
export type { CardVariant, CardMetal } from "../components/ui/card";
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
// `ControlSize` — BC.W-CONTROL-CUSTOM. The shared control-size union the input
// register (Input / Switch / Textarea / NumberFieldInput) threads as `size?`.
// Sourced from `_shared/` (the form-family shared home, beside `surfaceClass`);
// a consumer wrapping a control types its `size` against this instead of
// redeclaring the `"sm" | "default" | "lg"` union.
export type { ControlSize } from "../components/ui/_shared";

// ── Sidebar domain ─────────────────────────────────────────────────────────
// Composable-return canon (`SidebarState`) parallels `ConfiguratorState<T>`.
// `SidebarSection` is the row shape; `TreeNode` + `TreeIndexEntry` +
// `SidebarIndexEntry` describe the flat-index lookup; `ScrollTrackerOptions`
// pins the `useSidebarFollow` option shape consumers customise root-margin
// against.
// The three ToC-tracking-family leaf option shapes (BC.W-TOC-RECONCILE):
// `ScrollToOptions` (the rAF-retry scroll-to + treeIndex-aware partial-load),
// `ClickDelegateOptions` (the delegated scroll-target click), and
// `LazyLoaderOptions` (the progressive batch-render count). A consumer typing a
// ToC wrapper / fixture pins these from the discovery layer.
export type {
    ScrollTrackerOptions,
    ScrollToOptions,
    ClickDelegateOptions,
    LazyLoaderOptions,
    SidebarIndexEntry,
    SidebarSection,
    SidebarState,
    TreeIndexEntry,
    TreeNode,
} from "../composables/sidebar";

// ── Virtual-windowing domain (BC.W-VIRTUAL-WINDOW) ───────────────────────────
// The re-homed section-windowing contract types. `FlatSection` is the generic
// windowing INPUT shape (id + index + the shared `SectionHierarchy` fields +
// `estimatedHeight`) a consumer's flattener produces; `SectionLayout` is the
// `buildSectionLayout` output; `SectionWindowRange` is the resolved visible
// range + spacer sizes; `ForcedSectionWindowRange` is the warm-target
// injection. A consumer typing a windowing fixture / a flattener output pins
// these from the discovery layer; the value.js-free runtime + composables ride
// `/virtual` ONLY (OFF the root barrel — the heavy DOM-measure leaf discipline).
export type {
    FlatSection,
    SectionLayout,
    SectionWindowRange,
    ForcedSectionWindowRange,
} from "../composables/virtual";

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
export type { SpaViewProps } from "../components/custom/spa-view";

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

// ── Carved type-publication extension (BB.W-CARVE5) ───────────────────────────
// The composable-return + motion-curve type re-exports (Count-up animator,
// useDragMorph, useLiquidReveal, useDockCtaReceive, the motion suite + curve
// library) live in ./types-extra to hold this discovery barrel under the
// no-god-module line bound; re-joined here so the /api surface is byte-identical.
export type * from "./types-extra";

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
// `<FourierField>` (the reconstructing-epicycle field on the WGSL-primary GPU
// substrate, the sibling to Aurora/GooBlob/DotFlowField; ships via
// `/fourier-field`). `FourierFieldConfig` is the full author config the studio
// drives (the `variant: "hero"|"final"` enum is RETIRED — BC.W-VIZ-FOURIER —
// folded into config presets). The pure inverse-DFT/epicycle math leaf ships
// separately via `/fourier-math`.
export type {
    FourierFieldProps,
    FourierFieldConfig,
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

// ── SelectableChip / accent-tone (BC.W-ACCENT-TONE) ──────────────────────────
// The contrast-floored tonal-accent register's public types. `SelectableChipVariants`
// is the CVA-derived size axis a consumer wrapping <SelectableChip> types against.
// `UseAccentToneOptions`/`UseAccentToneReturn` are the contrast-safe-ink composable's
// option + return shapes (the value.js-bearing `safeAccentColor` ink resolver). The
// value.js-bearing runtime values ride `/selectable-chip` + the `/color` leaf ONLY
// (OFF the value.js-free root barrel — the SCC-trap discipline); the types ride here.
export type { SelectableChipVariants } from "../components/custom/selectable-chip";
export type {
    UseAccentToneOptions,
    UseAccentToneReturn,
} from "../composables/color/useAccentTone";

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

// ── SplitChars / useCharStagger (the per-glyph split, BC.W-SPLIT-CHARS) ───────
// `useCharStagger` (the per-glyph split partner to the shipped `.char-stagger`
// CSS) on `/motion-core` + the root barrel. `UseCharStaggerOptions` is the option
// shape (`by` split-unit / `preserveWhitespace` / `writeTotal`); `UseCharStaggerReturn`
// is the `{ split, count }` handle. A consumer wiring its own split surface (a
// hero word) or typing a wrapper pins them here; the runtime value lives on
// `/motion-core` + the root barrel (engine-free). `<SplitChars>` is the component
// face over it.
export type {
    UseCharStaggerOptions,
    UseCharStaggerReturn,
} from "../composables/motion/useCharStagger";

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

// ── CompletionSeal ────────────────────────────────────────────────────────────
// The hero-scale earned-GOLD completion seal (BC.W-AX-COMPLETION-SEAL) — a one-shot
// gold-draw mark on 4 `@property` motion tokens. `CompletionSealProps` is the
// consume-side shape; `CompletionSealShape` is the glyph axis (`"check" | "ring" |
// "wordmark"`). The ink reads the W-PHASE-PALETTE earned-gold register
// (`--phase-complete-color`/`--color-gold` — Q2: gold is EARNED at completion, never the
// phase spectrum); the glint composes the W-AX-METAL-GLOW catch-light. Ships via its
// `/completion-seal` subpath (OFF the root barrel — a focal opt-in feedback surface).
export type {
    CompletionSealProps,
    CompletionSealShape,
} from "../components/custom/completion-seal";

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

// ── useScrollTrigger — the ONE scroll reader (BC.W-SCROLL-TRIGGER) ─────────────
// `TriggerPoint` — a declared trigger-point on the scroll source ({ at: px | {fraction}
// | {element}, direction?, id? }); `UseScrollTriggerOptions` — the reader options
// ({ triggers, flipDeltaPx, trackProgress, respectReducedMotion, onCross, onEnter,
// onLeave }); `UseScrollTriggerReturn` — the reader's return shape ({ progress,
// direction, velocity, recalculate }). `useScrollTrigger` is engine-FREE + vueuse-FREE
// (vue-only), so it ships on `@mkbabb/glass-ui/motion-core` — the dock-search +
// scroll-chrome consumers reach it there. The continuous `progress` ramp is
// native-timeline-gated (dual-path single-writer); the discrete crossing events run
// the JS rAF tick on every engine (events can't ride a CSS timeline) and SURVIVE PRM.
export type {
    TriggerPoint,
    UseScrollTriggerOptions,
    UseScrollTriggerReturn,
} from "../composables/motion/useScrollTrigger";

// ── useScrollChrome — the floating-chrome COLLAPSE-STATE machine (BC.W-SCROLL-CHROME) ──
// `UseScrollChromeOptions` — the collapse machine options ({ collapseOnScroll (DEFAULT
// FALSE — persistent-by-default, the iOS-27 lesson), flipDeltaPx, velocityGate,
// snapMidpoint, collapseRangePx, chromeRef, respectReducedMotion, scrollStopMs });
// `UseScrollChromeReturn` — the machine's return ({ collapseT (0..1), collapsed,
// direction, recalculate }). `useScrollChrome` is a THIN collapse-state machine OVER
// `useScrollTrigger` (the ONE reader — no second listener); it ramps `collapseT` on
// direction + a px range, snaps to a discrete endpoint on scroll-stop, and writes the
// `--chrome-collapse-t` custom the `.scroll-chrome` recipe reads for the COMPOSITOR
// shrink/quiet (NEVER a per-frame reflow). Engine-FREE + vueuse-FREE (vue-only), so it
// ships on `@mkbabb/glass-ui/motion-core` — the dock-search + page-header consumers reach
// it there.
export type {
    UseScrollChromeOptions,
    UseScrollChromeReturn,
} from "../composables/motion/useScrollChrome";

// ── useDockSearch — the DOCK-as-native-dynamic-search-bar seam (BC.W-DOCK-SEARCH) ──
// `UseDockSearchOptions` — the seam options ({ dockState (the composed state machine),
// items | onSearch (sync XOR the pluggable async source), debounceMs, maxResults,
// collapseOnScroll (DEFAULT FALSE — persistent-default, the iOS-27 lesson), scrollContainer,
// chromeRef, onResultSelect, ensureTargetWindow, scrollTo (the ToC subsume) });
// `UseDockSearchReturn` — the handle ({ fuzzy (the composed useFuzzySearch state),
// autocompleteText (the ghost-text top-match completion), scrollChrome, armSearch,
// disarmSearch, acceptAutocomplete, isSearchArmed }). `useDockSearch` COMPOSES the dock
// state machine + the SHIPPED /search fuzzy pipeline (the VSCode scorer — NO re-fork) +
// the dock's OWN `--dock-morph-t` metaball morph (box-inviolate — no second engine, no
// `dockMorphContext`/`DOCK_SPRING` edit) + the optional `useScrollChrome` shrink + the
// virtual-window/ToC scroll-to-and-warm. `<GlassDock search>` opts into it; the words
// `SearchBar` retires onto it on the `^4.x` consume (the foreign-tree fence — the network
// source plugs via `onSearch`). Reached from `@mkbabb/glass-ui/dock`.
export type {
    UseDockSearchOptions,
    UseDockSearchReturn,
} from "../components/custom/dock/composables/useDockSearch";

// ── DotFlowField — the WebGPU-first curl-noise flow viz (BB.W-FLOWFIELD) ──
// Config + handle types for a consumer wrapping <DotFlowField> (the /dot-flow-field subpath).
export type {
    FlowFieldConfig,
    WaveComponent,
    DotFlowFieldHandle,
    UseDotFlowFieldOptions,
} from "../components/custom/dot-flow-field";

// ── Concentric — the WebGPU-first radial Fourier ring-interference viz (BB.W-CONCENTRIC) ──
// Config + handle types for a consumer wrapping <Concentric> (the /concentric subpath).
export type {
    ConcentricConfig,
    RingComponent,
    RingCenter,
    ConcentricHandle,
    UseConcentricOptions,
} from "../components/custom/concentric";

// ── PaperGrid — the WebGPU-first liquid AA-grid viz (BC.W-VIZ-PAPERGRID) ──
// Config + handle types for a consumer wrapping <PaperGrid> (the /paper-grid subpath).
export type {
    PaperGridConfig,
    PaperGridHandle,
    UsePaperGridOptions,
} from "../components/custom/paper-grid";

// ── The component customization-surface contract (BC.W-CUSTOMIZABILITY-CENSUS) ──
//
// THE BINDING BAR (component-customizability.md §0): every published glass-ui
// component is *fully customizable with reasonable, pragmatic, GOLDEN (like our
// golden typography) defaults that afford design hierarchy.* A consumer reaches
// for ANY component on this discovery surface and finds the SAME three-layer
// customization surface:
//
//   PROPS  — the semantic per-instance choices (variant / size / tier / tone),
//            typed + published here on `@mkbabb/glass-ui/api` (the `*Variants`
//            types above are exactly this layer). A primary CTA reads bigger +
//            glassier than a secondary with ONE prop — hierarchy out of the box.
//   TOKENS — the visual MAGNITUDES (padding / blur / glyph / alpha / hue /
//            duration) as CSS custom properties a consumer retunes from ONE
//            `:root` override. A TOKEN beats a prop where a `:root` override
//            suffices: the `--control-h-{xs,sm,md,lg}` / `--control-text` cohort
//            (the control box+type), the φ `--overlay-pad-inline/-block` ladder
//            (the overlay padding), the sqrt-φ `--card-pad-*` ladder, the √φ
//            `--type-*` / `text-display-*` ladder, `--glass-level` / the
//            `--glass-bg-*` tiers (the glass magnitude).
//   SLOTS  — content insertion.
//
// AND the BARE component already reads as a proportioned √φ-typography /
// warm-cream-glass / spring-clocked design (the golden default) — a consumer
// composes `<Card>` / `<Button>` / `<Dialog>` with zero props and gets the
// canonical house plate; the size/tier/surface rungs let them EXPRESS hierarchy
// without per-site hand-tuning.
//
// THE FENCES (the discipline a wave adding a customization axis must hold):
//   - DON'T over-prop. A magnitude a `:root` token already covers does NOT get a
//     prop (a `padding` prop where `--overlay-pad-inline` suffices is the
//     anti-pattern). Magnitudes → tokens; semantic choices → props.
//   - No contrivance. A size/variant/tier axis is added ONLY where the hierarchy
//     choice is REAL (the input register Input/Switch/Textarea — yes; a hairline
//     Separator / a 16px checkbox atom — no).
//   - DRY. Thread the EXISTING register (the `--control-*` cohort, the shared
//     `Surface` axis, the φ overlay-pad ladder, the √φ type ladder — each ≥2
//     consumers); ZERO new parallel register.
//
// THE CENSUS + THE GATE (the anti-smuggle floor): every published `ui/` +
// enrolled `custom/` component appears on EXACTLY ONE list — `gold` | `gap` |
// `token-only-correct` — at `docs/tranches/BC/audit/W-CUSTOMIZABILITY-census.md`,
// machine-locked by `proof:customizability-census`
// (`scripts/proof-customizability-census.mjs`, `["local","ci"]`): C1 no hardcoded
// control type/height off the `--control-*` cohort · C2 overlay golden uniformity
// (the `surface` axis + the φ `--overlay-pad-*` ladder) · C3 no fork-forced px
// literal / `!important`-fighting-CVA in a compound · C4 audacious-type-not-
// starved. A NEW component bearing a customization gap with no census row reds.
// The captured-paint twin (the golden default + the prop/token retune cascade) is
// `tests-visual/customizability.spec.ts`. The gate scopes the customization-
// SURFACE axis; `proof:no-shadcn-default` owns the default-paint vocabulary,
// `proof:glass-cohesion` the bg-opacity axis — disjoint by clause.

// ── BC.W-OVERLAY-UNIFORM — the floating-overlay surface-axis consumer record ──
//
// The shared `Surface` union (published above from `../components/ui/_shared`) is
// NOW threaded onto the SIX floating overlays that previously LACKED it, so every
// floating overlay carries the SAME golden customization surface Dialog/Popover/
// Sheet/Drawer/Toast already expose. ZERO new register — the threads WIDEN the ONE
// resolver's enrolled set (`proof:surface-axis` W1 no-fork stays GREEN); no symbol
// is re-published here (the `Surface` export above already covers the new consumers):
//
//   <DropdownMenu><DropdownMenuContent surface="veil"> — the busy-backdrop feather
//   <Select><SelectContent surface="opaque">           — the solid-card escape
//   <Tooltip><TooltipContent surface="veil">           — the legibility plate
//   <ContextMenu><ContextMenuContent surface="glass">  — the default glass plate
//   <Command surface="veil"> (Dialog-hosted: the surface flows through the host)
//   <HoverCard><HoverCardContent surface="opaque">     — the half-threaded case closed
//
// Each defaults to `surface="glass"` (byte-identical to the prior bare
// `glass-floating` plate). The raw `min-w-32` / `max-h` / tooltip `text-sm` /
// chevron `opacity-50` literals are token-backed onto `--overlay-min-width` /
// `--overlay-max-block` / `--tooltip-text` / `--select-chevron-opacity`
// (`tokens/offsets.css`) — `:root`-overridable magnitudes that retune EVERY overlay
// in lockstep (the φ `--overlay-pad-inline/-block` ladder is the shared breath
// cadence). Censused in docs/tranches/BC/audit/W-CUSTOMIZABILITY-census.md (the C2
// rows moved gap→gold); machine-locked by `proof:customizability-census` C2.

// ── BC.W-SEARCH-CUSTOM — the search field-CHROME variant CVA type surface ─────
//
// `SearchVariants` is the CVA-derived prop union for the field-chrome variant the
// glassified `<SearchBar>`/`<FuzzySearch>` thread (`inline` boxed glass pill ·
// `bare`/`floating` chromeless). It REPLACES the `!important`-fighting escape the
// FuzzySearch field carried (CLEANUP-PLAN HOLD-4) with a real CVA rung. The size
// axis rides the already-published shared `ControlSize`/`controlSizeClass`
// (surfaced above); the surface axis rides the already-published `Surface`. ZERO
// new magnitude register — the search-family `--search-*` tokens are indirection
// rungs defaulting to the `--ui-glyph`/`--control-*` cohort (tokens/sizing.css).
// Machine-locked by `proof:search-custom` + `proof:customizability-census` C3.
export type { SearchVariant, SearchVariants } from "../components/custom/search";
