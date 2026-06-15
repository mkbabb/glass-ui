// @mkbabb/glass-ui — Unified design system (curated public surface).
//
// ── Import shape canon ───────────────────────────────────────────────────
//
// The library exposes consumers via three layers:
//
//   1. ROOT barrel (`@mkbabb/glass-ui`) — vueuse-free curated surface;
//      the per-package list below. This file IS that barrel.
//   2. Per-package SUBPATHS (`@mkbabb/glass-ui/<pkg>`) — every public
//      component package reachable via flat name (verified by
//      `npm run verify-export-types`).
//   3. API discovery layer (`@mkbabb/glass-ui/api`) — pure-types/constants
//      re-export aggregator (see `src/api/index.ts`).
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
//   Input, Textarea, Combobox*                 @mkbabb/glass-ui/forms         @vueuse/core
//   useGlobalDark, installDarkModeSync         @mkbabb/glass-ui/dark          @vueuse/core
//   useKeyboardShortcuts, registerShortcut,    @mkbabb/glass-ui/keyboard      @vueuse/core
//   formatCombo, formatComboParts, isMac,
//   useRegisteredShortcuts, ShortcutOptions,
//   RegisteredShortcut, ShortcutCombo,
//   ShortcutEventType
//   Carousel, CarouselContent,                 @mkbabb/glass-ui/carousel      @vueuse/core
//   CarouselItem, CarouselNext, CarouselPager,
//   CarouselPrevious, GlassCarouselPager,
//   useCarousel, CarouselApi
//   useSpring, useSpringMount, useSpringPress, @mkbabb/glass-ui/motion        @mkbabb/keyframes.js
//   useNumericTransition, useAnimatedNumber,
//   DAMPING, SNAP_THRESHOLD
//   useStaggerReveal,                          @mkbabb/glass-ui/motion-core   (none — keyframes-FREE + vueuse-FREE)
//   useScrollProgress, useRAFLoop,
//   useIntersectionPause, RAFLoopTiming,
//   PausableRuntime, DAMPING, SNAP_THRESHOLD
//
// Mechanism: the root barrel re-exports each vueuse-free leaf EXPLICITLY rather
// than `export * from "./components/ui"`, so Rollup never walks a vueuse-bearing
// leaf into the root SCC.
//
// ── Custom-package cherry-pick rationale ─────────────────────────────────
//
// This root barrel re-exports a curated 4 of the `src/components/custom/`
// packages (`instrument-chassis`, `hover-popover`, `configurator`,
// `scrolling-text`). The rest reach consumers ONLY via their
// dedicated subpath (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, ...).
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
//     animated-digit, metric-cell, metric-stack, tabs).
// Consumers of those packages explicitly opt into them via subpath, keeping
// the root barrel's transitive-import graph tight.

// ─── Core UI primitives (vueuse-free) ─────────────────────────────────────
// Explicit per-package re-exports — the `export * from "./components/ui"`
// wildcard is intentionally NOT used because it drags vueuse-bearing
// carousel/combobox/input/textarea barrels into the root SCC walk.
export * from "./components/ui/accordion";
export * from "./components/ui/alert";
export * from "./components/ui/avatar";
export * from "./components/ui/badge";
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/checkbox";
export * from "./components/ui/collapsible";
export * from "./components/ui/command";
export * from "./components/ui/context-menu";
export * from "./components/ui/data-table";
export * from "./components/ui/dialog";
export * from "./components/ui/drawer";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/hover-card";
export * from "./components/ui/label";
export * from "./components/ui/metric-pill";
export * from "./components/ui/multi-select";
export * from "./components/ui/notification";
export * from "./components/ui/number-field";
export * from "./components/ui/popover";
export * from "./components/ui/progress";
export * from "./components/ui/radio-group";
export * from "./components/ui/section";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/skeleton";
export * from "./components/ui/slider";
export * from "./components/ui/switch";
export * from "./components/ui/table";
// BA.W-TABS — `ui/Tabs` (the reka wrapper family) LEFT the public surface (the
// "too many types" cut: two parallel tab families, the always-ON baked-plate
// indicator default that painted the R10-2 oval blob). The standardized tab family
// is `SegmentedTabs` (`@mkbabb/glass-ui/tabs`, TWO materials). The reka substrate
// files (`components/ui/tabs/*`) remain INTERNAL solely for the dock-rail consumer
// (`DockLayerGroup.vue` + `<TabsIndicator :surface="false">`, the AZ hairline);
// they are NOT re-exported from any public barrel.
export * from "./components/ui/tags-input";
export * from "./components/ui/toast";
export * from "./components/ui/toggle";
export * from "./components/ui/toggle-group";
export * from "./components/ui/tooltip";

// Custom composites — instrument-cluster chassis
export * from "./components/custom/instrument-chassis";
export * from "./components/custom/hover-popover";

// Custom composites — configurator primitive
export * from "./components/custom/configurator";

// Custom composites — overflow-marquee primitive
export * from "./components/custom/scrolling-text";

// Custom composites — the section-color pop primitive (BA.W-ICON-CHIP). The ONE
// color-event vehicle (the `color-mix` backplate + full-chroma glyph + the
// duotone/bloom/reveal axes). Vueuse-FREE + lightweight (it composes only `cn` +
// the dependency-free `vReveal` directive — no `@vueuse/core`, no
// `@mkbabb/keyframes.js`), so it is root-barrel safe and cherry-picked here for
// BROAD reach; also reachable via `@mkbabb/glass-ui/icon-chip`.
export * from "./components/custom/icon-chip";

// ─── Core composables (vueuse-free) ───────────────────────────────────────
// `useGlobalDark` and `useKeyboardShortcuts` are intentionally removed
// from the root barrel — they are vueuse-bearing SCC-trap leaves.
// Consumers use the `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`
// subpaths (flat naming).
//
// Sub-trees: reactive/ (useInterval + useTimer), dom/ (useResizeObserver +
// useTouchGate + useTokenColor), glass/, sortable/. `useStoryDemo` is
// demo-private per CLAUDE.md.
//
// `composables/motion` is NOT on the root barrel — it statically reaches a
// heavy peer (`@mkbabb/keyframes.js` — the NumericAnimation + SmoothProgress
// engines) that the bundler would otherwise walk transitively into every
// consumer's entry chunk, even Card-/Button-only consumers. The motion
// composables are reachable via `@mkbabb/glass-ui/motion`.
export * from "./composables/reactive";
export * from "./composables/dom";
export * from "./composables/glass";
export * from "./composables/sortable";

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
    // BA.W-ATLAS-RECONCILE A-4b — the route/navigation convenience over the ONE
    // VT substrate (async update + reduced-motion instant-path). NO parallel
    // useRouteTransition wrapper.
    navigate,
    supportsRouteTransitions,
    type ViewTransitionResult,
    type NavigateOptions,
} from "./composables/motion/useViewTransition";

// The v-reveal entrance directive. Dependency-free (`vue` type-only — no
// keyframes, no vueuse), so it is root-barrel safe per the `useViewTransition`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export { vReveal } from "./composables/motion/vReveal";

// The named CSS Custom Highlight composable (re-homed from `/dom` to
// `/motion-core`). Imports `vue` `getCurrentScope`/`onScopeDispose` only —
// keyframes-FREE + vueuse-FREE, so it is root-barrel safe per the `vReveal`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`. A TARGETED
// re-export preserves the pre-move root-barrel reach (it shipped on the root via
// the `./composables/dom` walk before the re-home).
export {
    useTextHighlight,
    type HighlightMatcher,
    type UseTextHighlightControls,
} from "./composables/motion/useTextHighlight";

// AZ.W-MORPH-SHOWCASE (W-LIQUID fold) — the shared amorphous flex+squish primitive.
// A PURE projection of a caller-driven normalized scalar onto a size span + a
// volume-preserving squish (no spring/rAF/element — imports `vue` only), so it is
// engine-FREE + vueuse-FREE and root-barrel safe per the `useViewTransition`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export {
    useLiquidFlex,
    type LiquidFlexAxis,
    type UseLiquidFlexParams,
    type UseLiquidFlexReturn,
} from "./composables/motion/useLiquidFlex";

// Core utilities
export * from "./utils";
