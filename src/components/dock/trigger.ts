// The `./dock-trigger` subpath (U/B8 PF, G-M1-3b). `DockTrigger` lives in its own module so the
// reka Select, Popover and DropdownMenu triggers it imports reach a consumer only where a menu
// renders, not in every entry that mounts a `GlassDock`. `dist/dock.js` was one module, and a
// consumer bundler places a module in one chunk.
export { default as DockTrigger } from "./DockTrigger.vue";
