// Sub-tree barrel for DOM observers + cascade bridges.
//
// NAMING CONVENTION (AW.W15): the `Use…Controls` return interfaces in this
// sub-tree (`UseResizeObserverControls`, `UseTokenColorControls`,
// `UseIntervalControls`, `UseTimerControls`, `UseTextHighlightControls`) use the
// "Controls" suffix DELIBERATELY — it names a bundle of imperative HANDLES
// (`refresh`/`start`/`stop`/`pause`), distinct from the "Return" suffix that
// names a reactive STATE shape (`Use<Name>Return`, the motion/glass convention).
// This is intentional, NOT renamed to "Return".
//
//   - useResizeObserver — RAF-coalesced ResizeObserver wrapper.
//   - useTouchGate     — per-control tap-to-activate guard for touch devices.
//   - useTokenColor    — reactive read of a CSS custom property's resolved value.
//   - resolveTokenColor — ONE `var(--token)` → concrete-rgb un-wrap leaf (AX.W16):
//                        the single cached `getComputedStyle` cascade read the blob
//                        un-wraps colors through BEFORE the renderer's ColorResolver,
//                        so the renderer stays DOM-free. Distinct from useTokenColor
//                        (reads a property BY NAME) — this un-wraps a color STRING.
//   - useClipboard     — clipboard copy with auto-resetting `copied` flag
//                        (O.W6 Lane A; value.js + fourier-analysis promotion).
//   - useUserInvalidAria — `:user-invalid` → `aria-invalid` blur-bridge; keeps
//                        the screen-reader validity state in step with the
//                        native visual state, with a fallback class-toggle for
//                        engines without `:user-invalid` (AQ.W4; the muster J
//                        cross-repo coupling contract).
//   - useTextHighlight — named CSS Custom Highlight API wrapper (CSS.highlights
//                        registry + ::highlight(<name>) paint); Range-based
//                        substring/match emphasis with no <mark> DOM mutation,
//                        feature-detected no-op fallback.
//   - useBreakpoint / useIdleReady / useViewportReady — RE-INSTATED (AW.W19,
//                        glassui-aw-corrections Item 5). The AV "speedtest-
//                        ownership" wave (cbbaeb0) removed these 3 /dom leaves as
//                        orphans, but they have LIVE external consumers reached
//                        over the /dom subpath — speedtest imports all three
//                        (AdminDataSourceToggle + App + the route transitions),
//                        value.js's demo imports useBreakpoint. A consumer bump to
//                        3.4.x broke (MISSING_EXPORT) until they were restored.
//                        Re-instated on their ≥2-external-consumer load-bearing
//                        rationale (the same internal-only-rg blind spot as the
//                        metric-cell/stack mis-prune).
export * from "./useResizeObserver";
export * from "./useTouchGate";
export * from "./useTokenColor";
export * from "./useResolveTokenColor";
export * from "./useClipboard";
export * from "./useUserInvalidAria";
export * from "./useTextHighlight";
export * from "./useBreakpoint";
export * from "./useIdleReady";
export * from "./useViewportReady";
