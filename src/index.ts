// @mkbabb/glass-ui — Unified design system (v1.0 curated public surface)
//
// L.W1 Lane A — vueuse SCC trap closure (Phase 2; intentional v1.0 break).
// L.W2 Lane B — cohesion + import-shape annotations (cherry-pick rationale).
//
// ── Import shape canon ───────────────────────────────────────────────────
//
// The library exposes consumers via three layers:
//
//   1. ROOT barrel (`@mkbabb/glass-ui`) — vueuse-free curated surface;
//      the per-package list below. This file IS that barrel.
//   2. Per-package SUBPATHS (`@mkbabb/glass-ui/<pkg>`) — 35 + 4 active
//      entries, every public component package reachable via flat name
//      (verified at L.W2 Lane B via `npm run verify-export-types` and
//      runtime probe in `docs/tranches/L/audit/W2-B-cohesion-import-shape-proof.md`).
//   3. API discovery layer (`@mkbabb/glass-ui/api`) — pure-types/constants
//      re-export aggregator (L.W1 Lane B; see `src/api/index.ts`).
//
// All subpath barrels at top level (`src/<flat>.ts`) follow the same shape:
// `export * from "./components/<dir>"` (or composition thereof). Lane C of
// W1 added `src/dark.ts` + `src/keyboard.ts` + `src/carousel.ts` to retire
// the nested `composables/dark` + `composables/keyboard` v0.9.x subpaths.
//
// ── vueuse-bearing exclusions ────────────────────────────────────────────
//
// This root barrel is **vueuse-free**: it does NOT re-export any symbol whose
// implementation imports `@vueuse/core`. Consumers reach vueuse-bearing
// symbols via explicit subpaths so bundlers can shake them when unused:
//
//   Symbol(s)                                  Subpath
//   -----------------------------------------  -------------------------------
//   Input, Textarea, Combobox*                 @mkbabb/glass-ui/forms
//   useGlobalDark                              @mkbabb/glass-ui/dark          (flat; L.W1 Lane C)
//   useKeyboardShortcuts, registerShortcut,    @mkbabb/glass-ui/keyboard      (flat; L.W1 Lane C)
//   formatCombo, formatComboParts, isMac,
//   useRegisteredShortcuts, ShortcutOptions,
//   RegisteredShortcut, ShortcutCombo,
//   ShortcutEventType
//   Carousel, CarouselContent, CarouselDots,   @mkbabb/glass-ui/carousel      (flat; L.W1 Lane C)
//   CarouselItem, CarouselNext, CarouselPager,
//   CarouselPrevious, GlassCarouselPager,
//   useCarousel, CarouselApi
//
// Mechanism: K.WS Phase 1 (additive subpaths at v0.9.3) did NOT close the SCC
// trap because Rollup still walked `export * from "./components/ui"` through
// every vueuse-bearing leaf. Phase 2 removes the leaves from the root walk.
// See `docs/tranches/L/research/Rε-architectural-transpositions.md` §B.1 and
// `docs/tranches/L/waves/W1.md` for full context.
//
// ── Custom-package cherry-pick rationale (Rε §B.2.2 → L.W2 disposition) ───
//
// Of the 35 packages in `src/components/custom/`, this root barrel re-exports
// 7 (`instrument-chassis`, `glyph-face`, `dock-group`, `disco-glyph`,
// `hover-popover`, `configurator`, `scrolling-text`). The other 28 reach
// consumers ONLY via their dedicated subpath (`@mkbabb/glass-ui/dock`,
// `/aurora`, `/sidebar`, ...).
//
// Acceptance bar for root-barrel inclusion:
//   (a) vueuse-free at every transitive import (closes SCC trap);
//   (b) single-component or small primitive package (no nested composables
//       sub-tree, no WebGL substrate); AND
//   (c) composes tightly with the `ui/` primitives in compositions
//       — i.e. consumers reach for it alongside `<Button>`, `<Card>`, etc.
//       rather than as a stand-alone bundle.
//
// The 23 excluded packages fail one or more of those criteria:
//   - vueuse-bearing internals (sidebar, glass-carousel, infinite-scroll);
//   - large composite chassis with nested composables (dock, aurora,
//     configurator domain helpers); OR
//   - vertical/themed substrate (metaballs, paper-backdrop, search,
//     animated-digit, metric-cell, metric-stack, responsive-tabs).
// Consumers of those packages explicitly opt into them via subpath, keeping
// the root barrel's transitive-import graph tight per the tree-shaking
// gestalt in `docs/tranches/L/research/Rε-architectural-transpositions.md`
// §B.2.2 (HEADLINE-aligned curation).
//
// Brittleness window: `breaking_changes_during_wave: yes`; consumer-facing
// migration documented in `MIGRATION.md` (L.W5).

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
export * from "./components/ui/cartoon-card";
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
export * from "./components/ui/scroll-pane";
export * from "./components/ui/section";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/skeleton";
export * from "./components/ui/slider";
export * from "./components/ui/switch";
export * from "./components/ui/table";
export * from "./components/ui/tabs";
export * from "./components/ui/tags-input";
export * from "./components/ui/toast";
export * from "./components/ui/toggle";
export * from "./components/ui/toggle-group";
export * from "./components/ui/tooltip";

// Custom composites — instrument-cluster chassis
export * from "./components/custom/instrument-chassis";
export * from "./components/custom/glyph-face";
export * from "./components/custom/dock-group";
export * from "./components/custom/disco-glyph";
export * from "./components/custom/hover-popover";

// Custom composites — configurator primitive
export * from "./components/custom/configurator";

// Custom composites — overflow-marquee primitive
export * from "./components/custom/scrolling-text";

// NOTE: `./freshness` is intentionally NOT re-exported here. It imports
// `node:fs` / `node:path` / `node:url`, which Vite's browser bundler
// externalises and chokes on (the speedtest worker leak class).
// Consumers reach the helper at the `@mkbabb/glass-ui/freshness` subpath.
// See A3 §4.3 / V.FINAL.md:104-106 for the stale-dist closure rationale,
// and W3.b.2 for the root-barrel browser-safety fix.

// ─── Core composables (vueuse-free) ───────────────────────────────────────
// `useGlobalDark` and `useKeyboardShortcuts` are intentionally removed
// from the root barrel — they are vueuse-bearing SCC-trap leaves.
// Consumers use the `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`
// subpaths (Lane C; flat naming per L.W1).
//
// L.W2 — Sub-tree restructure: reactive/ (useInterval + useTimer), dom/
// (useResizeObserver + useTouchGate + useTokenColor), motion/ (includes
// useStagger), glass/, sortable/. `useStoryDemo` was demoted to demo-private
// per CLAUDE.md.
export * from "./composables/reactive";
export * from "./composables/dom";
export * from "./composables/motion";
export * from "./composables/glass";
export * from "./composables/sortable";

// Core utilities
export * from "./utils";
