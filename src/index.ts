// @mkbabb/glass-ui — Unified design system (curated public surface).
//
// ── Import shape canon ───────────────────────────────────────────────────
//
// The library exposes consumers via two layers:
//
//   1. ROOT barrel (`@mkbabb/glass-ui`) — vueuse-free curated surface;
//      the per-package list below. This file IS that barrel.
//   2. Per-package SUBPATHS (`@mkbabb/glass-ui/<pkg>`) — every public
//      component package reachable via flat name (verified by
//      `npm run verify:package`). Public types + constants ride
//      their OWNING package subpath (e.g. `ConstellationProps` on
//      `/constellation`, `AuroraConfig` + `MAX_NUCLEI` on `/aurora`,
//      `ButtonProps` on `/button`).
//
// All subpath barrels at top level (`src/<flat>.ts`) follow the same shape:
// `export * from "./components/<dir>"` (or composition thereof).
//
// ── Heavy-peer exclusions (vueuse + keyframes.js) ────────────────────────
//
// This root barrel is **vueuse-free** AND **keyframes.js-free**: it does
// NOT re-export any symbol whose implementation imports `@vueuse/core` OR
// `@mkbabb/keyframes.js`. Consumers reach heavy-peer-bearing symbols via
// explicit subpaths so bundlers can shake them when unused:
//
//   Symbol(s)                                  Subpath                        Peer
//   -----------------------------------------  -----------------------------  ---------------------
//   Input, Textarea                            @mkbabb/glass-ui/forms         @vueuse/core
//   useGlobalDark, installDarkModeSync         @mkbabb/glass-ui/dark          @vueuse/core
//   useKeyboardShortcuts, registerShortcut,    @mkbabb/glass-ui/keyboard      @vueuse/core
//   formatCombo, formatComboParts, isMac,
//   useRegisteredShortcuts, ShortcutOptions,
//   RegisteredShortcut, ShortcutCombo,
//   ShortcutEventType
//   Carousel, CarouselContent,                 @mkbabb/glass-ui/carousel      @vueuse/core
//   CarouselItem, CarouselNext, CarouselPager,
//   CarouselPrevious,
//   useCarousel, CarouselApi
//   useSpring, useSpringMount, useLiquidPress, @mkbabb/glass-ui/motion        @mkbabb/keyframes.js
//   useAnimatedNumber, useAnimatedNumberMap,
//   DAMPING, SNAP_THRESHOLD
//   useScrollProgress, useRAFLoop,             @mkbabb/glass-ui/motion-core   (none — keyframes-FREE + vueuse-FREE)
//   useIntersectionPause, RAFLoopTiming,
//   PausableRuntime, DAMPING, SNAP_THRESHOLD
//
// Mechanism: the root barrel re-exports each vueuse-free leaf EXPLICITLY rather
// than `export * from "./components"`, so Rollup never walks a vueuse-bearing
// leaf into the root SCC.
//
// ── Custom-package cherry-pick rationale ─────────────────────────────────
//
// This root barrel re-exports the curated `configurator` package from
// `src/components/`.
// `hover-popover` is part of the `ui/popover` union, and `scrolling-text`
// lives in its one consumer because the overflow-marquee is consumer-only and
// below the two-binary inclusion bar. The rest reach
// consumers ONLY via their dedicated subpath
// (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, ...).
//
// Acceptance bar for root-barrel inclusion:
//   (a) vueuse-free at every transitive import (closes the SCC trap);
//   (b) single-component or small primitive package (no nested composables
//       sub-tree, no WebGL substrate); AND
//   (c) composes tightly with the `ui/` primitives in compositions
//       — i.e. consumers reach for it alongside `<Button>`, `<Card>`, etc.
//       rather than as a stand-alone bundle.
//
// The excluded packages fail one or more of those criteria:
//   - vueuse-bearing internals (sidebar, infinite-scroll);
//   - large composite chassis with nested composables (dock, aurora,
//     configurator domain helpers); OR
//   - vertical/themed substrate (paper-backdrop, search,
//     animated-digit, metric, tabs).
// Consumers of those packages explicitly opt into them via subpath, keeping
// the root barrel's transitive-import graph tight.

// ─── Core UI primitives (vueuse-free) ─────────────────────────────────────
// Explicit per-package re-exports — the `export * from "./components"`
// wildcard is intentionally NOT used because it drags vueuse-bearing
// carousel/input/textarea barrels into the root SCC walk.
export * from "./components/accordion";
export * from "./components/alert";
export * from "./components/avatar";
export * from "./components/badge";
export * from "./components/button";
export * from "./components/card";
export * from "./components/checkbox";
export * from "./components/collapsible";
export * from "./components/command";
export * from "./components/data-table";
export * from "./components/dialog";
// Drawer is off the root barrel because it uses the house `useDrawerSnap` engine
// (a `@mkbabb/keyframes.js` SpringProgress consumer), so
// it is now a keyframes-BEARING heavy component that must NOT inline its optional
// peer into the vueuse-free root bundle. It ships via the `/drawer` subpath
// (`@mkbabb/glass-ui/drawer`) — the dock/aurora substrate-isolation pattern; see
// MIGRATION.md. (clean break, no alias.)
export * from "./components/dropdown-menu";
// `ui/hover-card` retired as a name (the reka HoverCardRoot
// substrate stays, imported by the sealed `<Popover trigger="hover">` union). The
// HoverCard component + subpath fold onto ONE `Popover`. (clean break, no alias.)
export * from "./components/label";
// `ui/multi-select` retired. A MultiSelect is a
// Popover+Command composition over the same Combobox-family mechanism, so it folds
// onto `<Combobox multiple>` (array v-model + chips-in-trigger). (clean break, no alias.)
export * from "./components/number-field";
export * from "./components/popover";
export * from "./components/progress";
export * from "./components/radio-group";
export * from "./components/select";
export * from "./components/separator";
// `ui/sheet` retired; Sheet's side-slide folded onto
// `<DialogContent placement=top|right|bottom|left>` (same reka DialogRoot + FocusScope;
// the slide is paint, not mechanism). Reach `Dialog` (`@mkbabb/glass-ui/dialog`); snap-
// detent physics stays `Drawer`'s. Clean break, no alias.
export * from "./components/skeleton";
export * from "./components/slider";
export * from "./components/switch";
export * from "./components/table";
// `ui/Tabs` (the reka wrapper family) left the public surface because it duplicated
// the tab vocabulary and its always-on baked-plate indicator painted an unwanted
// oval blob. The standardized tab family
// is `SegmentedTabs` (`@mkbabb/glass-ui/tabs`, TWO materials).
// The reka substrate files (`components/tabs/*`) are
// DEFINITION-ABSENT (retired): their sole internal consumer `DockLayerGroup.vue`
// re-points onto the library's ONE headless selection engine `useSelectionGroup`
// (roving focus + the ONE traveling-indicator writer, Safari-identical), so the
// reka `--reka-tabs-indicator-*` path is gone. No public barrel re-exported them.
export * from "./components/tags-input";
export * from "./components/toast";
export * from "./components/toggle-group";
export * from "./components/tooltip";

// Custom composites — instrument-cluster chassis
// `custom/hover-popover` folded onto `<Popover trigger="hover">`
// (the Kronecker fold). HoverPopover the NAME is retired; the mechanism (hover-open
// timer + keepDockOpen watch) lives on the sealed Popover union. (clean break, no alias.)

// Custom composites — configurator primitive
export * from "./components/configurator";

// `custom/scrolling-text` lives in its one consumer.
// The overflow-marquee's only binary consumer is a single app (2 sites), the
// ≥2-binary-consumer bar unmet, so the primitive + its `/scrolling-text` subpath
// leave glass-ui; that consumer brings its own marquee. (clean break, no alias.)

// ─── Core composables (vueuse-free) ───────────────────────────────────────
// `useGlobalDark` and `useKeyboardShortcuts` are intentionally removed
// from the root barrel — they are vueuse-bearing SCC-trap leaves.
// Consumers use the `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`
// subpaths (flat naming).
//
// Sub-trees: reactive/ (useInterval + useTimer), dom/ (useResizeObserver +
// useTouchGate + useTokenColor), glass/, sortable/.
//
// `composables/motion` is NOT on the root barrel — it statically reaches a
// heavy peer (`@mkbabb/keyframes.js` — the NumericAnimation + SmoothProgress
// engines) that the bundler would otherwise walk transitively into every
// consumer's entry chunk, even Card-/Button-only consumers. The motion
// composables are reachable via `@mkbabb/glass-ui/motion`.
export * from "./composables/reactive";
export * from "./composables/dom";
export * from "./composables/glass";

// The View-Transitions motion substrate. Dependency-free (no `vue`, no
// `@mkbabb/keyframes.js`, no `@vueuse/core`), so it is safe on the
// vueuse-/keyframes-FREE root barrel — re-exported here for BROAD reach (also
// reachable via the `@mkbabb/glass-ui/motion-core` subpath). A TARGETED
// re-export, NOT `export * from "./composables/motion/core"`, so the
// keyframes-free-but-barrel-excluded scroll/RAF/stagger leaves stay off the
// root walk.
export {
    startViewTransition,
    supportsViewTransitions,
    type ViewTransitionResult,
} from "./composables/motion/core/useViewTransition";

// The v-reveal entrance directive. Dependency-free (`vue` type-only — no
// keyframes, no vueuse), so it is root-barrel safe per the `useViewTransition`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export { vReveal } from "./composables/motion/reveal/vReveal";

// Shared amorphous flex-and-squish primitive.
// A PURE projection of a caller-driven normalized scalar onto a size span + a
// volume-preserving squish (no spring/rAF/element — imports `vue` only), so it is
// engine-FREE + vueuse-FREE and root-barrel safe per the `useViewTransition`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export {
    useLiquidFlex,
    type LiquidFlexAxis,
    type UseLiquidFlexParams,
    type UseLiquidFlexReturn,
} from "./composables/motion/spring/useLiquidFlex";

// Two-edge lead/trail integrator behind the liquid dot morph
// worm. A spring LEAD edge + a damped TRAIL follower share ONE rAF; their gap is the
// worm's elongation and the trail catching the lead is the emergent release. Imports
// `vue` only — engine-FREE + vueuse-FREE (a hand-rolled integrator, no spring engine),
// so it is root-barrel safe per the `useLiquidFlex` precedent; also reachable via
// `@mkbabb/glass-ui/motion-core`.
export {
    useLeadTrail,
    type LeadTrailEdges,
    type UseLeadTrail,
    type UseLeadTrailOptions,
} from "./composables/motion/morph/useLeadTrail";

// Shared visualization pointer-physics field (pointer position +
// derived velocity + the ACCEL term). The viz renderer FEEDS it via its frame `tick`
// (NO own rAF — the one-loop discipline); under PRM it freezes (`tick(0)`). Imports
// `vue` only — engine-FREE + vueuse-FREE and root-barrel safe per the `useLiquidFlex`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`. WebGPU visualizations
// consume it for flow-field and concentric pointer response.
export {
    usePointerVelocityField,
    type PointerVec2,
    type UsePointerVelocityField,
    type UsePointerVelocityFieldOptions,
} from "./composables/motion/pointer/usePointerVelocityField";

// Route pointer broadcaster (a full-bleed pointer-events:none
// background viz cannot listen for itself; the ONE capture-phase window listener per
// route serves them via provide/inject) + the four PURE per-viz pointer-field mappings
// (fourier draw-bias/lean · blob heavy-pull · aurora cursor · constellation well). Both
// import `vue` only (the mappings are pure) — engine-FREE + vueuse-FREE + root-barrel safe
// per the `usePointerVelocityField` precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export {
    useRoutePointer,
    type RoutePointerContext,
    type UseRoutePointerOptions,
} from "./composables/motion/pointer/useRoutePointer";
export {
    fourierLeanMapping,
    blobPullMapping,
    auroraCursorMapping,
    constellationWellMapping,
    snapshotField,
    FOURIER_BIAS_GAIN,
    FOURIER_FOLLOW_LEAN,
    BLOB_LEAD_K,
    BLOB_STRETCH_GAIN,
    BLOB_STRETCH_MAX,
    AURORA_CURSOR_RADIUS,
    type PointerFieldSnapshot,
    type FourierLeanGeometry,
    type FourierLeanOptions,
    type FourierLeanResult,
    type BlobPullOptions,
    type BlobPullResult,
    type AuroraCursorOptions,
    type AuroraCursorResult,
    type ConstellationWellResult,
} from "./composables/motion/pointer/pointerFieldMappings";

// The four grammar axis types published on the root barrel
// (the ONE axis home is `_shared/axes.ts`; the `/axes` subpath is the discovery
// front door). Types-only re-export — no runtime import, so the vueuse-FREE
// root-barrel discipline is preserved.
export type {
    Size,
    Orientation,
    Motion,
    Surface,
    SurfaceTier,
} from "./components/_shared/axes";

// Component foundations
export { cn } from "./components/_shared/class-names";
export {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "./composables/motion/scroll/supportsCssTimeline";
