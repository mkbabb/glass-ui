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
// Scope criteria (L.W1 Lane B):
//
//   - Re-export only types/constants that are ALREADY on the canonical public
//     surface (i.e. exported from a package's `index.ts` or named-subpath barrel).
//   - Variant-prop types (`*Variants`) for the four-state component contract.
//   - Domain shapes that consumers type fixtures + presets against (Aurora,
//     Configurator, Metaballs).
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
//   - Dock orientation/state — component-internal; not on public surface
//     (closed at O.W4 Lane B against the dock barrel itself).
//
// M.W2 Lane B extensions (v1.0.5): 5 promotions absorbing L-residuals + L.W7
// fallout — `GlassPanelVariant` (W1-B Open Q1 path-a; canonical barrel
// re-export added in lockstep), `ConfiguratorCloneMode` (W1-B Open Q3;
// shipped at L.W7 Lane B), `TimelineSegment` + `TimelineSegmentGradient` +
// `TimelineSegmentState` (AA-tranche timeline primitive canonical data
// shape). Surface count 32 → 37 (29 types + 8 constants).
//
// O.W4 Lane A extensions (v1.2.4 or v1.3.0): 12 type promotions closing the
// 3 Rγ /api discovery gaps —
//   - Sidebar domain (6 types): `SidebarState` (composable-return canon,
//     parallels `ConfiguratorState<T>`), `SidebarSection`, `TreeNode`,
//     `TreeIndexEntry`, `SidebarIndexEntry`, `ScrollTrackerOptions`.
//   - Search domain (5 types): `SearchableItem`, `SearchResult`,
//     `FuzzySearchState`, `UseFuzzySearchOptions`, `SearchIndex`.
//   - Props / variants triad (3 types): `GlassPanelProps` (sibling of the
//     already-promoted `GlassPanelVariant`), `ToastType` (the toast row
//     shape — paired with `ToastVariant`), `MenuItemVariants` (CVA-derived
//     union from `ui/_shared/`; canonical home for the 11-site menu-item
//     four-state contract).
// Surface count 37 → 49 (41 types + 8 constants).

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
// configurator wrappers (e.g. aurora chrome, metaballs chrome) type against
// these. `ConfiguratorCloneMode` (M.W2 Lane B) drives the per-preset vs.
// commit-on-write disposition — the aurora chrome pins `'per-preset'`; new
// chrome consumers narrow against this union when picking their slot model.
export type {
    ConfiguratorCloneMode,
    ConfiguratorPreset,
    ConfiguratorScrollMode,
    ConfiguratorState,
    ConfiguratorStateOptions,
} from "../components/custom/configurator";

// ── Metaballs ──────────────────────────────────────────────────────────────
// Substrate config + default — parallel pattern to Aurora.
export type { MetaballConfig } from "../components/custom/metaballs";
export { DEFAULT_METABALL_CONFIG } from "../components/custom/metaballs";

// ── Timeline ───────────────────────────────────────────────────────────────
// Segment data shape consumers type fixture arrays + preset descriptors
// against (M.W2 Lane B; AA-tranche timeline primitive). `TimelineSegmentState`
// is the lifecycle enum (parallel to `ToastVariant`); `TimelineSegment` is
// the row shape; `TimelineSegmentGradient` is the `{from, to}` endpoint pair.
export type {
    TimelineSegment,
    TimelineSegmentGradient,
    TimelineSegmentState,
} from "../components/custom/timeline";

// ── Surface enums ──────────────────────────────────────────────────────────
// Semantic enums that recur across consumer code paths (typed prop values,
// switch dispatch, preset descriptors). `GlassPanelVariant` (M.W2 Lane B)
// is the 5-rung glass-ladder surface vocabulary (wash/quiet/resting/floating/
// overlay) parallel to `CardTier` — distinct because GlassPanel paints the
// glass substrate directly while Card composes the same ladder via the
// `tier` prop.
export type { CardTier } from "../components/ui/card";
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
// against. Promoted O.W4 Lane A per Rγ §3.3 A1.
export type {
    ScrollTrackerOptions,
    SidebarIndexEntry,
    SidebarSection,
    SidebarState,
    TreeIndexEntry,
    TreeNode,
} from "../components/custom/sidebar";

// ── Search domain ──────────────────────────────────────────────────────────
// `SearchableItem` is the input shape consumers feed `buildIndex` /
// `useFuzzySearch`; `SearchResult` carries scored matches; `FuzzySearchState`
// is the composable-return canon; `UseFuzzySearchOptions` parameterises the
// reactive composable; `SearchIndex` is the prebuilt-index handle the
// imperative `searchIndex(...)` accepts. Promoted O.W4 Lane A per Rγ §3.3 A2.
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
// flows as `ToastType` per shadcn-vue parity); paired with the
// already-promoted `ToastVariant` enum. Promoted O.W4 Lane A per Rγ §3.3 A3.
export type { GlassPanelProps } from "../components/custom/glass-panel";
export type { ToastType } from "../components/ui/toast";

// ── Clipboard ──────────────────────────────────────────────────────────────
// `UseClipboardReturn` — canonical composable-return shape paralleling
// `ConfiguratorState` / `SidebarState` / `FuzzySearchState`. Consumers
// wrapping `useClipboard` (e.g. a domain-specific copy button factory)
// pin against this rather than redeclaring `{ copied, copy }`.
// `UseClipboardOptions` ships paired so consumers can forward the
// `resetMs` knob from a wrapper. Promoted O.W6 Lane A per O11/e cross-walk
// (value.js 20 sites + fourier-analysis 1 inline site).
export type {
    UseClipboardOptions,
    UseClipboardReturn,
} from "../composables/dom/useClipboard";

// ── HeaderRibbon ───────────────────────────────────────────────────────────
// `HeaderRibbonProps` — props shape consumers forward when wrapping
// `<HeaderRibbon>` (e.g. domain-themed header strips). `HeaderRibbonPosition`
// is the alignment enum (`'left' | 'right'`). Promoted O.W6 Lane A per
// O11/e cross-walk (value.js + keyframes.js consumer copies).
export type {
    HeaderRibbonPosition,
    HeaderRibbonProps,
} from "../components/custom/header-ribbon";
