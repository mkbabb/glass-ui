export { default as GlassDock } from "./GlassDock.vue";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
export { default as DockIconButton } from "./DockIconButton.vue";
// AV.W7 G2 — the WCAG 2.2.2 Level-A pause/play toggle for the AV backgrounds
// (Aurora/GooBlob), bound by the consumer to the renderer's pause()/resume().
export { default as DockBackgroundToggle } from "./DockBackgroundToggle.vue";
export { default as DockTabButton } from "./DockTabButton.vue";
export { default as DockSelectTrigger } from "./DockSelectTrigger.vue";
export { default as DockDropdownTrigger } from "./DockDropdownTrigger.vue";
// BD.W-DOCK-CORE (A8) — the unified dock overlay-trigger family's third member: a
// PopoverTrigger emitting the SHARED `.dock-trigger` recipe (byte-identical geometry +
// style + baseline alignment to the dropdown trigger; the hover-scale is OFF across the
// family so portaled content anchors smoothly).
export { default as DockPopoverTrigger } from "./DockPopoverTrigger.vue";
// AX.W45 D13-c / DK5 — the orientation+layout-aware dock divider primitive
// (component-over-class: the raw `.dock-separator` was axis-blind). Reads the dock
// orientation/layout via useOptionalDockContext and paints perpendicular to the
// layout axis (vertical hairline in a row dock, horizontal rule in a column dock,
// full-row section break in a grid dock).
export { default as DockSeparator } from "./DockSeparator.vue";
// BC.W-DOCK-STACK-RAIL — the macOS hover-expand STACK rail (the clean-break rebuild of
// the retired divider-carousel `DockRail`): a core anchor item whose members FAN OUT next
// to the rail on hover/focus, extending BEYOND the dock edge into its gutter (the kept
// `.glass-dock-frame` non-clipping escape) so it clears `<main>` by topology and never
// changes the dock box. 3 configurable, scrollable, n-stack; binds the consumer-owned
// model (one registry, no parallel state). No `DockRail` alias — clean break.
export { default as DockStack } from "./DockStack.vue";
// BC.W-DOCK-STACK-RAIL — the stack-member descriptor for `<DockStack>` (`items` prop).
// Lives in `constants.ts` because a `<script setup>` SFC cannot re-export a named type
// through the default barrel. Replaces the retired `DockRailItem` (no alias).
export type { DockStackItem } from "./constants";
// BA.W-DOCK-SECTIONS — the declarative tripartite section chassis (R8-9 / IG-A3 — the
// reusable layering abstraction): a consumer passes `sections: DockSectionDescriptor[]`
// and the dock body renders rail-core | divided sections | nav by composing the
// existing <DockSeparator> over the in-flow controls (no box-inflation). The descriptor
// types live in `constants.ts` (the SFC-cannot-re-export-a-type colocated home, beside
// DockRailItem); a separator flagged `anchor` is the rail's seam-locator (direction b).
export { default as DockSection } from "./DockSection.vue";
export type { DockSectionDescriptor, DockSectionKind } from "./constants";

// O.W4 Lane B — Fix 1 (Rγ L1): re-export composable types so consumers can
// type wrappers around the published surface. Previously `UseDockStateOptions`
// and `DockState` were exported only from `./composables/index.ts`, which is
// not reachable through the `@mkbabb/glass-ui/dock` subpath.
//
// P.W2 Lane D (Pγ.3): `UseDockStateReturn` joins the cohort — the named
// composable-return shape paralleling `UseClipboardReturn` / `UseAuroraReturn`.
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables";

// AX.W01 — expose the rebuilt single-scalar `useLayerTransition` on the `/dock`
// subpath barrel (substrate-WITH-consumer). value.js maintains a local FLIP-width
// fork ONLY because this barrel never re-exported the primitive; with the export
// landed the consumer-adoption leg (value.js deletes its fork + re-points
// ActionBarLayer.vue) routes to AX.W34. The primitive is the same one
// `<DockLayerGroup>` already composes — one mechanism, one published surface.
export { useLayerTransition } from "./composables";
export type {
    UseLayerTransitionOptions,
    UseLayerTransitionReturn,
} from "./composables";

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

// AZ.W-MORPH-SHOWCASE — the V↔H liquid-glass morph driver (the metaball-bridge, H4
// arm a; consumer #1 of `useLiquidFlex`). Published so a consumer can compose the
// two-dock morph showcase against its own docks.
export {
    useDockOrientationMorph,
    type DockMorphOrientation,
    type UseDockOrientationMorphOptions,
    type UseDockOrientationMorphReturn,
} from "./composables/useDockOrientationMorph";

// BC.W-AX-DOCK-CTA-SEAT — the CTA-receive seat reaches its natural home beside
// GlassDock/useDockState/DockIconButton. `useDockCtaReceive` (the external-CTA-morphs-
// into-dock seam + the `setPending`/`clearPending` landing seat) is ALSO published on
// the /dock subpath so a dock consumer imports it from `@mkbabb/glass-ui/dock`. ADDITIVE
// — the /motion export (the keyframes-bearing motion primitive's home) STAYS; this is a
// re-export, not a move, so no clean break and no migration row.
export {
    useDockCtaReceive,
    type UseDockCtaReceiveOptions,
    type UseDockCtaReceiveReturn,
    type DockCtaReceivePreset,
} from "../../../composables/motion/useDockCtaReceive";

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

// BE.W-DOCK-FISSION + BE.W-METABALL-BRIDGE2 — the n-ary detach orchestrator. `useDockFission`
// is the CONSUMING seam BESIDE the morph engine (dockMorphContext/DOCK_SPRING byte-untouched
// — the box-inviolate fence): ONE `SpringProgress` on `DOCK_SPRING` writing `--dock-split-t`
// + per-piece DIRECTION-VECTOR off a `DockSplitSignature` (search=radial / media=lateral /
// nav=inward-merge — data, not three code paths), the snap-recoil on `useLiquidFlex`, the
// seam-tension on `usePointerVelocityField` (fed from inside the ONE loop), PRM sync-seated.
// The CSS lives in `src/styles/dock/fission-bridge.css`.
//
// BD.W-MORPH-FIELD-WELD — `GooFilter` is the ONE library metaball `<filter>` mount
// (#dock-fission-goo / #dock-morph-goo / #glass-goo / #pager-goo / #morph-goo all off one
// byte-identical sRGB graph at shell root — the DRY union of the prior four mounts; the
// fission-bridge.css `url(#dock-fission-goo)` consumer reaches it). Mount ONCE at app root.
export { GooFilter } from "../goo-filter";
export {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
    type DockSplitContext,
    type DockSplitVector,
    type DockSplitSquishPeak,
    type DockSplitSignature,
    type DockFissionPieceRegistration,
    type DockFissionPieceHandle,
    type UseDockFissionOptions,
    type UseDockFissionReturn,
} from "./composables/useDockFission";
