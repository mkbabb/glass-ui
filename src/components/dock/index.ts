export { default as GlassDock } from "./GlassDock.vue";
export type { DockBackdropMode } from "./composables/useDockShellProps";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
// BI.W-DOCK-CROSSFADE — the thin controlled face-swap core (PASS-4B ruling 3). The
// two-child opacity overlap on the per-face `--dock-t` + measure-once peak reserve +
// focus-transfer-on-dissolve. `<DockLayerGroup>` COMPOSES it where a rail exists; the
// controlled-no-rail 5-pane case (speedtest) consumes it DIRECTLY (no selection engine).
// The crossfade context helpers stay INTERNAL (the composables barrel) — only the
// component + its discovery types publish on `/dock` (the dockLayerContext precedent).
export { default as DockCrossfade } from "./DockCrossfade.vue";
export type {
    DockFaceDescriptor,
    DockFaceRegistration,
    DockCrossfadeContext,
} from "./composables/dockCrossfadeContext";
// BI.W-DOCK-CONTROLS / BI.W-DOCK-FOLD — the ONE dock control (folds the retired
// `DockIconButton` + `DockTabButton` onto a `shape` axis) + the ONE overlay trigger
// (folds the retired `DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger`
// onto the shared `.dock-trigger` recipe). The five legacy SFCs are DEFINITION-ABSENT
// (clean break, no alias — G10 census; every consumer re-points by name, MIGRATION.md).
export { default as DockControl } from "./DockControl.vue";
export { default as DockTrigger } from "./DockTrigger.vue";
// AV.W7 G2 — the WCAG 2.2.2 Level-A pause/play toggle for the AV backgrounds
// (Aurora/Blob), bound by the consumer to the renderer's pause()/resume().
export { default as DockBackgroundToggle } from "./DockBackgroundToggle.vue";
// AX.W45 D13-c / DK5 — the orientation+layout-aware dock divider primitive
// (component-over-class: the raw `.dock-separator` was axis-blind). Reads the dock
// orientation/layout via useOptionalDockContext and paints perpendicular to the
// layout axis (vertical hairline in a row dock, horizontal rule in a column dock,
// full-row section break in a grid dock).
export { default as DockSeparator } from "./DockSeparator.vue";
// O.W4 Lane B — Fix 1 (Rγ L1): re-export composable types so consumers can
// type wrappers around the published surface. Previously `UseDockStateOptions`
// and `DockState` were exported only from `./composables/index.ts`, which is
// not reachable through the `@mkbabb/glass-ui/dock` subpath.
//
// P.W2 Lane D (Pγ.3): `UseDockStateReturn` joins the cohort — the named
// composable-return shape paralleling `UseClipboardReturn` / `UseAuroraReturn`.
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables";

// P.W1 Lane B — Fix 2 (P11/b CR-2 prerequisite): re-export the dock-context
// canonical DI primitives so consumers can migrate from the retired
// pre-O.W2 string keys (`"dockKeepOpen"` / `"dockRelease"`) to the typed-key
// helpers without reaching for the deep-import path. fourier-analysis's 2
// silent `inject<...>("dockKeepOpen", null)` sites at SliderControl.vue + GlassTimeline.vue
// (which silently no-op at v1.7.0; functional regression on scrub gestures)
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

// BI.W-DOCK-RETIRES — `useDockOrientationMorph` is DEFINITION-ABSENT (decided-terminal).
// The platform cannot continuously interpolate a flex-column→row topology change, so the
// V↔H swap is the crossfade (`<DockCrossfade>`); the two-real-DOM-docks metaball bridge +
// `morph-bridge.css` retire with it. A consumer needing a V↔H transition composes the
// crossfade. See the disposition register (retiredBy: BI.W-DOCK-RETIRES).

// BC.W-AX-DOCK-CTA-SEAT — the CTA-receive seat reaches its natural home beside
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
} from "../../composables/motion/useDockCtaReceive";

// BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar seam. `useDockSearch`
// composes `useDockState` + the SHIPPED /search fuzzy pipeline (`useFuzzySearch`, the
// VSCode subsequence scorer — NO re-fork) + the dock's OWN `--dock-morph-t` metaball
// morph (the byte-untouched `morph-bridge.css` — box-inviolate, no second engine) + the
// optional `useScrollChrome` shrink + the ToC `ensureTargetWindow`/`scrollTo` subsume.
// A consuming seam BESIDE the morph engine; `<GlassDock search>` opts into it. The words
// `SearchBar` + its 7 search composables retire onto this register on the `^4.x` consume
// (THEIR edit — the foreign-tree fence; the network source plugs via `onSearch`).
export { useDockSearch } from "./composables";
export type { UseDockSearchOptions, UseDockSearchReturn } from "./composables";

// BI.W-DOCK-RETIRES — the fission facility (`useDockFission` + `DOCK_SPLIT_SIGNATURES` +
// `fission-bridge.css`/`fission-island.css`) and the Siri island (`<SiriDockCapability>` +
// `useSiriDock` + the `SIRI_FORMS` ladder + `siri.css`) are DEFINITION-ABSENT
// (decided-terminal, clean break, no alias). Fission was a demo-only spectacle AND the
// prime UF-C3 Safari suspect (the ONLY dock mechanism stacking goo `filter:url()` over
// `backdrop-filter`); Siri was a demo-only zero-binary-consumer capability. The
// siri-*-on-public-/dock adjudication is terminal here (ruling 18). See the disposition
// register (retiredBy: BI.W-DOCK-RETIRES).
