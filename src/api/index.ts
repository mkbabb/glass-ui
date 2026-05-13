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
//   - Composable option/return types (change with implementation).
//   - Sidebar / Search / Carousel domain types — those have their own
//     dedicated subpaths and aren't cross-cutting enough to surface here.
//   - Dock orientation/state — component-internal; not on public surface.
//
// M.W2 Lane B extensions (v1.0.5): 5 promotions absorbing L-residuals + L.W7
// fallout — `GlassPanelVariant` (W1-B Open Q1 path-a; canonical barrel
// re-export added in lockstep), `ConfiguratorCloneMode` (W1-B Open Q3;
// shipped at L.W7 Lane B), `TimelineSegment` + `TimelineSegmentGradient` +
// `TimelineSegmentState` (AA-tranche timeline primitive canonical data
// shape). Surface count 32 → 37 (29 types + 8 constants).

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
