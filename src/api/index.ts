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
    AuroraConfig,
    AuroraCursorApi,
    AuroraFlow,
    AuroraInstance,
    AuroraMedium,
    AuroraNucleus,
    AuroraRuntimeMode,
    AuroraRuntimeOptions,
    FlowPattern,
    OklchStop,
    StrokeMode,
    WarpMode,
} from "../components/custom/aurora";

export {
    DEFAULT_AURORA_CONFIG,
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
// switch dispatch, preset descriptors). `GlassPanelVariant` is the 5-rung
// glass-ladder surface vocabulary (wash/quiet/resting/floating/overlay)
// parallel to `CardTier` — distinct because GlassPanel paints the glass
// substrate directly while Card composes the same ladder via the `tier` prop.
export type { CardTier, CardSurface } from "../components/ui/card";
export type { GlassPanelVariant } from "../components/custom/glass-panel";
export type { InstrumentChassisPhase } from "../components/custom/instrument-chassis";
export type { ToastVariant } from "../components/ui/toast";

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
// preset panels) type their forwarded prop bag against this. `ToastType`
// is the canonical toast row shape (aliased from `Toast` on the toast
// barrel — `Toast` itself is the SFC default-export, so the row shape
// flows as `ToastType` per shadcn-vue parity); paired with the `ToastVariant`
// enum above.
export type { GlassPanelProps } from "../components/custom/glass-panel";
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
export type { ViewTransitionResult } from "../composables/motion/useViewTransition";

// ── Count-up animator ────────────────────────────────────────────────────────
// `Countup` — the `{ runActive, settle, cancel }` control shape `useCountup`
// returns; `UseCountupOptions` — its `{ easeFn, skip }` options. `useCountup`
// is keyframes-bearing (it rides `NumericAnimation`), so the composable itself
// ships ONLY on `@mkbabb/glass-ui/motion`, not the root barrel.
export type { Countup, UseCountupOptions } from "../composables/motion/useCountup";

// ── HeaderRibbon ───────────────────────────────────────────────────────────
// `HeaderRibbonProps` — props shape consumers forward when wrapping
// `<HeaderRibbon>` (e.g. domain-themed header strips). `HeaderRibbonPosition`
// is the alignment enum (`'left' | 'right'`).
export type {
    HeaderRibbonPosition,
    HeaderRibbonProps,
} from "../components/custom/header-ribbon";

// ── Metric primitives ───────────────────────────────────────────────────────
// `MetricCellAppearance` is the visual register enum (`"dashboard" | "compact"
// | "bare"`) parallel to `GlassPanelVariant`; `MetricCellProps` is the Props
// shape consumers forward when wrapping `<MetricCell>`. `MetricStackProps` +
// `MetricRowProps` cover the layout shell + row pair. Both metric families ship
// via their `/metric-cell` + `/metric-stack` subpaths (speedtest consumes them).
export type {
    MetricCellAppearance,
    MetricCellProps,
} from "../components/custom/metric-cell";
export type {
    MetricRowProps,
    MetricStackProps,
} from "../components/custom/metric-stack";

// ── Digit / responsive-tabs primitives ──────────────────────────────────────
// Props/variant types for the animated-digit + responsive-tabs primitives.
// `AnimatedDigitMode` is the damping axis (`"absolute" | "progress"`) forwarded
// into `useAnimatedNumber`; `AnimatedDigitProps` is the consume-side shape.
// `ResponsiveTabsProps` parallels `BouncyToggleProps` — single shape for the
// matchMedia-driven Select-or-Tabs swap.
export type {
    AnimatedDigitMode,
    AnimatedDigitProps,
} from "../components/custom/animated-digit";
export type { ResponsiveTabsProps } from "../components/custom/responsive-tabs";

// ── StackedIconGroup ───────────────────────────────────────────────────────
// `StackedIconGroupProps<TItem>` — the generic shape consumers wiring stacked
// avatar/icon strips pin against from the discovery layer.
export type { StackedIconGroupProps } from "../components/custom/stacked-icons";

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
export type {
    DarkModeSyncScriptOptions,
    UseGlobalDarkOptions,
} from "../composables/dark";
