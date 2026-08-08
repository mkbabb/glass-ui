export { default as GlassDock } from "./GlassDock.vue";
export type { DockBackdropMode, DockInteraction } from "./composables/useDockShellProps";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
// Thin controlled face-swap core. The
// two-child opacity overlap on the per-face `--dock-t` + measure-once peak reserve +
// focus-transfer-on-dissolve. `<DockLayerGroup>` COMPOSES it where a rail exists; the
// controlled-no-rail 5-pane case (a consumer) consumes it DIRECTLY (no selection engine).
// The crossfade context helpers stay INTERNAL (the composables barrel) — only the
// component + its discovery types publish on `/dock` (the dockLayerContext precedent).
export { default as DockCrossfade } from "./DockCrossfade.vue";
export type {
    DockFaceDescriptor,
    DockFaceRegistration,
    DockCrossfadeContext,
} from "./composables/dockCrossfadeContext";
// The shared dock control folds the retired
// `DockIconButton` + `DockTabButton` onto a `shape` axis) + the ONE overlay trigger
// (folds the retired `DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger`
// onto the shared `.dock-trigger` recipe). The five legacy SFCs are DEFINITION-ABSENT
// (clean break, no alias — G10 census; every consumer re-points by name, MIGRATION.md).
export { default as DockControl } from "./DockControl.vue";
export { default as DockTrigger } from "./DockTrigger.vue";
// WCAG 2.2.2 pause/play toggle for animated backgrounds
// (Aurora/Blob), bound by the consumer to the renderer's pause()/resume().
export { default as DockBackgroundToggle } from "./DockBackgroundToggle.vue";
// Orientation- and layout-aware dock divider primitive
// (component-over-class: the raw `.dock-separator` was axis-blind). Reads the dock
// orientation/layout via useOptionalDockContext and paints perpendicular to the
// layout axis (vertical hairline in a row dock, horizontal rule in a column dock,
// full-row section break in a grid dock).
export { default as DockSeparator } from "./DockSeparator.vue";
// Re-export composable types so consumers can
// type wrappers around the published surface. `UseDockStateOptions`
// and `DockState` need to be reachable through the `@mkbabb/glass-ui/dock`
// subpath, not only `./composables/index.ts`.
//
// `UseDockStateReturn` joins the named composable-return cohort
// composable-return shape paralleling `UseClipboardReturn` / `UseAuroraReturn`.
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables";

// Re-export the dock-context
// canonical DI primitives so consumers can migrate from the retired
// old string keys (`"dockKeepOpen"` / `"dockRelease"`) to the typed-key
// helpers without reaching for the deep-import path. fourier-analysis's 2
// silent `inject<...>("dockKeepOpen", null)` sites at SliderControl.vue + its own
// timeline surface (which silently no-op without it; a functional regression on scrub
// gestures — the library-side `GlassTimeline.vue` that once shared the defect is gone)
// migrate via `useOptionalDockContext()` once this re-export ships.
export {
    DOCK_CONTEXT_KEY,
    useDockContext,
    useOptionalDockContext,
    provideDockContext,
    type DockContext,
    type DockOrientation,
    type DockLayout,
} from "./composables/dockContext";

// `useDockOrientationMorph` is definition-absent.
// The platform cannot continuously interpolate a flex-column→row topology change, so the
// V↔H swap is the crossfade (`<DockCrossfade>`); the two-real-DOM-docks metaball bridge +
// `morph-bridge.css` retire with it. A consumer needing a V↔H transition composes the
// crossfade.

// The CTA-receive seat lives beside
// GlassDock/useDockState/DockControl. `useDockCtaReceive` (the external-CTA-morphs-
// into-dock seam + the `setPending`/`clearPending` landing seat) is ALSO published on
// the /dock subpath so a dock consumer imports it from `@mkbabb/glass-ui/dock`. ADDITIVE
// — the /motion export (the keyframes-bearing motion primitive's home) STAYS; this is a
// re-export, not a move, so no clean break and no migration row.
export {
    useDockCtaReceive,
    type UseDockCtaReceiveOptions,
    type UseDockCtaReceiveReturn,
    type DockCtaReceivePreset,
} from "../../composables/motion/morph/useDockCtaReceive";

// Dock-as-native-dynamic-search-bar seam. `useDockSearch`
// composes `useDockState` + the SHIPPED /search fuzzy pipeline (`useFuzzySearch`, the
// VSCode subsequence scorer — NO re-fork) + the dock's OWN `--dock-morph-t` metaball
// morph (the byte-untouched `morph-bridge.css` — box-inviolate, no second engine) + the
// optional `useScrollChrome` shrink + the ToC `ensureTargetWindow`/`scrollTo` subsume.
// A consuming seam BESIDE the morph engine; `<GlassDock search>` opts into it. `SearchBar`
// KEEPS (a live standalone surface); the `FuzzySearch.vue` demo component retired onto
// this register at REDUCTION W3.
// The network source plugs via `onSearch`.
export { useDockSearch } from "./composables";
export type { UseDockSearchOptions, UseDockSearchReturn } from "./composables";

// The fission facility (`useDockFission` + `DOCK_SPLIT_SIGNATURES` +
// `fission-bridge.css`/`fission-island.css`) and the Siri island (`<SiriDockCapability>` +
// `useSiriDock` + the `SIRI_FORMS` ladder + `siri.css`) are DEFINITION-ABSENT
// (decided-terminal, clean break, no alias). Fission was a demo-only spectacle AND the
// prime Safari suspect (the ONLY dock mechanism stacking goo `filter:url()` over
// `backdrop-filter`); Siri was a demo-only zero-binary-consumer capability. The
// Siri capability are absent from the public dock surface.
