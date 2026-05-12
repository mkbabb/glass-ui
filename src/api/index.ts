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
//   - Component-internal types not re-exported by the package's `index.ts`
//     (e.g. `GlassPanelVariant` is only exported from the SFC, not the barrel).
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
// configurator wrappers (e.g. aurora chrome, metaballs chrome) type against
// these.
export type {
    ConfiguratorPreset,
    ConfiguratorScrollMode,
    ConfiguratorState,
    ConfiguratorStateOptions,
} from "../components/custom/configurator";

// ── Metaballs ──────────────────────────────────────────────────────────────
// Substrate config + default — parallel pattern to Aurora.
export type { MetaballConfig } from "../components/custom/metaballs";
export { DEFAULT_METABALL_CONFIG } from "../components/custom/metaballs";

// ── Surface enums ──────────────────────────────────────────────────────────
// Semantic enums that recur across consumer code paths (typed prop values,
// switch dispatch, preset descriptors).
export type { CardTier } from "../components/ui/card";
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
