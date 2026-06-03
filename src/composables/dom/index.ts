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
//   - useBreakpoint    — reactive `matchMedia` wrapper (AJ.W6-β; speedtest
//                        useBreakpoint promotion).
//   - useIdleReady     — requestIdleCallback (+ setTimeout fallback) post-mount
//                        idle gate; rIC-sibling of useViewportReady, no viewport
//                        stage (AO.W3; speedtest 5-site promotion).
//   - useUserInvalidAria — `:user-invalid` → `aria-invalid` blur-bridge; keeps
//                        the screen-reader validity state in step with the
//                        native visual state, with a fallback class-toggle for
//                        engines without `:user-invalid` (AQ.W4; the muster J
//                        cross-repo coupling contract).
//   - useTextHighlight — named CSS Custom Highlight API wrapper (CSS.highlights
//                        registry + ::highlight(<name>) paint); Range-based
//                        substring/match emphasis with no <mark> DOM mutation,
//                        feature-detected no-op fallback.
export * from "./useResizeObserver";
export * from "./useTouchGate";
export * from "./useTokenColor";
export * from "./useClipboard";
export * from "./useViewportReady";
export * from "./useBreakpoint";
export * from "./useIdleReady";
export * from "./useUserInvalidAria";
export * from "./useTextHighlight";
