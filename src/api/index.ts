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
// shape). Surface count 32 → 37 (33 types + 4 constants).
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
// Surface count 37 → 49 (45 types + 4 constants).
//
// O.W6 Lane A extensions (v1.4.0): 4 type promotions for the useClipboard +
// HeaderRibbon canonical primitives (`UseClipboardOptions`, `UseClipboardReturn`,
// `HeaderRibbonPosition`, `HeaderRibbonProps`). Surface count 49 → 53 (49
// types + 4 constants). HeaderRibbon ships subpath-only; useClipboard is
// root-barrel re-exported (vueuse-free).
//
// P.W0 Lane C resync (v1.7.0 ceremonial close): canonical surface at HEAD is
// 55 (51 types + 4 constants). The 2-type drift between the O.W6 running
// tally (53) and the actual HEAD count surfaced at the P-open Pγ audit; the
// AB+1 cohort (v1.5.0 → v1.7.0) shipped 4 new custom primitives
// (`AnimatedDigit`, `MetricCell`, `MetricStack`, `ResponsiveTabs` — also
// `MetricRow` which lives in ui/) but did NOT promote their Props/variant
// types to /api. Those promotions land at P.W1 Lane A (surface 55 → 63).
// The 2-type delta is bookkeeping (historical add-counts vs. actual
// exported-symbol enumeration); the P.W0 resync names the canonical at-HEAD
// count.
//
// P.W1 Lane A extensions (v1.7.1): 8 type promotions for the AB+1 primitive
// cohort per Pγ §"AB+1 cohort skipped the Props-export canon" —
//   - MetricCell domain (2 types): `MetricCellProps` + `MetricCellAppearance`
//     (the `"dashboard" | "compact" | "bare"` visual register).
//   - MetricStack domain (2 types): `MetricStackProps` + `MetricRowProps`
//     (the layout shell + row Props pair).
//   - AnimatedDigit domain (2 types): `AnimatedDigitProps` +
//     `AnimatedDigitMode` (the `"absolute" | "progress"` damping axis).
//   - ResponsiveTabs (1 type): `ResponsiveTabsProps` (parallels
//     `BouncyToggleProps`).
//   - StackedIconGroup (1 type, Rγ baseline carryover): `StackedIconGroupProps`
//     — flagged by Rγ §2.3, missed at O.W4 Lane A triad.
// Surface count 55 → 63 (59 types + 4 constants).
//
// P.W2 Lane D extensions (v1.7.2): 1 type promotion — `UseDockStateReturn`
// (composable-return canon paralleling `UseClipboardReturn`). Closes Pγ.3
// "useDockState inline return" by naming the inferred return shape and
// re-exporting from the `/dock` subpath barrel + the `/api` discovery layer.
// Surface count 63 → 64 (60 types + 4 constants).
//
// P.W3 Lane C extensions (v1.8.0): 2 type promotions for the paper-backdrop
// / texture-system substrate per P11/a §G3 + §I2. `PaperBackdropProps` lifts
// the inline `defineProps<{...}>` shape to a named interface (matching the
// HeaderRibbon precedent applied to the AB+1 cohort at P.W1 Lane A);
// `PaperBackdropFrequency` is the `"clean" | "aged"` turbulence-texture
// register parallel to `MetricCellAppearance` / `AnimatedDigitMode`. The
// canonical texture-system pattern (consumer retints via `--paper-*-texture`
// CSS custom properties at `:root`) is documented in DESIGN.md "Texture
// system" section. Surface count 64 → 66 (62 types + 4 constants).

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

// ── AB+1 primitives ────────────────────────────────────────────────────────
// AC.W6d + AC.W8e cohort (v1.5.0 → v1.7.0) Props/variant types — promoted
// P.W1 Lane A per Pγ §"AB+1 cohort skipped the Props-export canon".
// `MetricCellAppearance` is the visual register enum (`"dashboard" |
// "compact" | "bare"`) parallel to `GlassPanelVariant`; `MetricCellProps`
// is the Props shape consumers forward when wrapping `<MetricCell>`.
// `MetricStackProps` + `MetricRowProps` cover the layout shell + row pair
// (both lift their inline `defineProps<{...}>` shapes to named interfaces
// matching the HeaderRibbon precedent). `AnimatedDigitMode` is the damping
// axis (`"absolute" | "progress"`) forwarded into `useAnimatedNumber`;
// `AnimatedDigitProps` is the consume-side shape. `ResponsiveTabsProps`
// parallels `BouncyToggleProps` — single shape for the matchMedia-driven
// Select-or-Tabs swap.
export type {
    MetricCellAppearance,
    MetricCellProps,
} from "../components/custom/metric-cell";
export type {
    MetricRowProps,
    MetricStackProps,
} from "../components/custom/metric-stack";
export type {
    AnimatedDigitMode,
    AnimatedDigitProps,
} from "../components/custom/animated-digit";
export type { ResponsiveTabsProps } from "../components/custom/responsive-tabs";

// ── StackedIconGroup ───────────────────────────────────────────────────────
// `StackedIconGroupProps<TItem>` — Rγ baseline carryover (§2.3); missed at
// the O.W4 Lane A Props/variants triad. The barrel already exports the
// type; P.W1 Lane A adds the `/api` re-export so consumers wiring stacked
// avatar/icon strips can pin the generic shape from the discovery layer.
export type { StackedIconGroupProps } from "../components/custom/stacked-icons";

// ── Dock ───────────────────────────────────────────────────────────────────
// `UseDockStateReturn` — canonical composable-return shape paralleling
// `UseClipboardReturn` / `UseAuroraReturn`. Consumers wrapping `<GlassDock>`
// or authoring a custom dock chassis pin against this rather than
// redeclaring the state-machine handle. Promoted P.W2 Lane D per Pγ.3
// "useDockState inline return". `UseDockStateOptions` + `DockState` ship via
// the `/dock` subpath barrel only (component-internal arg + state-enum;
// O.W4 Lane B disposition preserved).
export type { UseDockStateReturn } from "../components/custom/dock";

// ── Paper / texture ────────────────────────────────────────────────────────
// `PaperBackdropProps` — the Props shape consumers forward when wrapping
// `<PaperBackdrop>` (e.g. app-shell substrate composers). `PaperBackdropFrequency`
// is the turbulence-register enum (`"clean" | "aged"`) parallel to
// `MetricCellAppearance` / `AnimatedDigitMode`. Promoted P.W3 Lane C per
// P11/a §G3 + §I2 — the consumer-side cleanup wave (words/frontend at P.W5
// Lane E) retires ~500 LOC of parallel `useTextureSystem` + 3 TextureCard /
// TextureBackground / TextureOverlay SFCs in favour of the canonical
// `<PaperBackdrop>` + `paper-underpaint` / `paper-grain-overlay` utility
// composition. The texture-system canonical pattern (CSS custom-property
// cascade via `--paper-*-texture` vars at `:root`) is documented in DESIGN.md
// "Texture system" section.
export type {
    PaperBackdropFrequency,
    PaperBackdropProps,
} from "../components/custom/paper-backdrop";
