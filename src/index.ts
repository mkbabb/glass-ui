// @mkbabb/glass-ui — Unified design system
// Core UI primitives
export * from "./components/ui";

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

// Core composables
export { useGlobalDark } from "./composables/useGlobalDark";
export * from "./composables/useInterval";
export * from "./composables/useKeyboardShortcuts";
export * from "./composables/useResizeObserver";
export * from "./composables/useStagger";
export * from "./composables/useStoryDemo";
export * from "./composables/useTimer";
export * from "./composables/useTokenColor";
export * from "./composables/useTouchGate";
export * from "./composables/glass";
export * from "./composables/motion";
export * from "./composables/sortable";
export * from "./composables/utils";

// Core utilities
export * from "./utils";
