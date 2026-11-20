export { default as GlassDock } from "./GlassDock.vue";
/* [2026-08-12 · BK #47 W1 SURFACE] `DockInteraction` is STRUCK with the `interaction`
   prop (a type-only export — the runtime `/dock` barrel is unmoved). `DockCollapse`
   takes its place on the surface as the folded collapse member's union. */
export type {
    DockAnchor,
    DockCollapse,
    DockExpandOn,
    DockProps,
} from "./composables/useDockShellProps";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
// Thin controlled face-swap core. The
// two-child opacity overlap on the per-face `--dock-t` + measure-once peak reserve +
// focus-transfer-on-dissolve. `<DockLayerGroup>` COMPOSES it where a switcher exists; the
// controlled-no-switcher 5-pane case (a consumer) consumes it DIRECTLY (no selection engine).
// The crossfade context helpers stay INTERNAL (the composables barrel) — only the
// component + its discovery types publish on `/dock` (the dockLayerContext precedent).
export { default as DockCrossfade } from "./DockCrossfade.vue";
export { default as DockOutlet } from "./DockOutlet.vue";
export { default as ControlsDock } from "./ControlsDock.vue";
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
// `DockTrigger` publishes on its own `./dock-trigger` subpath (U/B8 PF, G-M1-3b): it carries
// reka's Select, Popover and DropdownMenu triggers, and a dock that renders no trigger at first
// paint should not pull them into its consumer's entry. Clean break, no alias.
// [W-I.8, RULINGS-6] `DockBackgroundToggle` is deleted: no app used it. A site wires any
// button to an animated background's pause()/resume(): a DockControl, in a dock.
// Orientation-aware dock divider primitive (component-over-class: the raw
// `.dock-separator` was axis-blind). Reads the dock orientation via
// useOptionalDockContext and paints perpendicular to the layout axis (vertical
// hairline in a row dock, horizontal rule in a column dock).
export { default as DockSeparator } from "./DockSeparator.vue";
// Re-export composable types so consumers can
// type wrappers around the published surface. `UseDockStateOptions`
// and `DockState` need to be reachable through the `@mkbabb/glass-ui/dock`
// subpath, not only `./composables/index.ts`.
//
// `UseDockStateReturn` joins the named composable-return cohort
// composable-return shape paralleling `UseClipboardReturn` / `UseAuroraReturn`.
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables";

// The dock context a seat under an overlay reads (value.js, keyframes.js, fourier). [W-I.8,
// RULINGS-6] `useDockContext`, `provideDockContext` and `DOCK_CONTEXT_KEY` leave the
// barrel: no app imported them; the dock's own files import them from the composable.
export {
    useOptionalDockContext,
    type DockContext,
    type DockOrientation,
} from "./composables/dockContext";

// `useDockOrientationMorph` is definition-absent.
// The platform cannot continuously interpolate a flex-column→row topology change, so the
// V↔H swap is the crossfade (`<DockCrossfade>`); the two-real-DOM-docks metaball bridge +
// `morph-bridge.css` retire with it. A consumer needing a V↔H transition composes the
// crossfade.

// [W-I.8, RULINGS-6] `useDockCtaReceive` is no longer re-exported here (no app imported it
// from `/dock`); it stays in the motion entry, and `cta-seat.css` with it. `useDockSearch`,
// the `#search` slot and `search.css` are deleted: no app used them (gaggle and atlas built
// search in their own slots).

// The fission facility (`useDockFission` + `DOCK_SPLIT_SIGNATURES` +
// `fission-bridge.css`/`fission-island.css`) and the Siri island (`<SiriDockCapability>` +
// `useSiriDock` + the `SIRI_FORMS` ladder + `siri.css`) are DEFINITION-ABSENT
// (decided-terminal, clean break, no alias). Fission was a demo-only spectacle AND the
// prime Safari suspect (the ONLY dock mechanism stacking goo `filter:url()` over
// `backdrop-filter`); Siri was a demo-only zero-binary-consumer capability. The
// Siri capability are absent from the public dock surface.
