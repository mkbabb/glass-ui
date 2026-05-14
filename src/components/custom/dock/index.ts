export { default as GlassDock } from "./GlassDock.vue";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
export { default as DockIconButton } from "./DockIconButton.vue";
export { default as DockTabButton } from "./DockTabButton.vue";
export { default as DockSelectTrigger } from "./DockSelectTrigger.vue";
export { default as DockDropdownTrigger } from "./DockDropdownTrigger.vue";

// O.W4 Lane B — Fix 1 (Rγ L1): re-export composable types so consumers can
// type wrappers around the published surface. Previously `UseDockStateOptions`
// and `DockState` were exported only from `./composables/index.ts`, which is
// not reachable through the `@mkbabb/glass-ui/dock` subpath.
export type { UseDockStateOptions, DockState } from "./composables";
