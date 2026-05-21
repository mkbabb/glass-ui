// Sub-tree barrel for DOM observers + cascade bridges.
//
//   - useResizeObserver — RAF-coalesced ResizeObserver wrapper.
//   - useTouchGate     — per-control tap-to-activate guard for touch devices.
//   - useTokenColor    — reactive read of a CSS custom property's resolved value.
//   - useClipboard     — clipboard copy with auto-resetting `copied` flag
//                        (O.W6 Lane A; value.js + fourier-analysis promotion).
//   - useViewportReady — two-stage IntersectionObserver + requestIdleCallback
//                        gate for lazy-mount of heavy widgets (AJ.W6-α; speedtest
//                        useChartReady promotion).
export * from "./useResizeObserver";
export * from "./useTouchGate";
export * from "./useTokenColor";
export * from "./useClipboard";
export * from "./useViewportReady";
