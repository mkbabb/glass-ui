// Sub-tree barrel for DOM observers + cascade bridges.
//
//   - useResizeObserver — RAF-coalesced ResizeObserver wrapper.
//   - useTouchGate     — per-control tap-to-activate guard for touch devices.
//   - useTokenColor    — reactive read of a CSS custom property's resolved value.
export * from "./useResizeObserver";
export * from "./useTouchGate";
export * from "./useTokenColor";
