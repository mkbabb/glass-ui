// MEASURE-8 H8 (RU-77 as amended, C7-M2, C7-5): G-16's consumer fixture. One page that imports value.js's dock names
// (origin/master demo/shell/dock/Dock.vue:4-10 and its layers: GlassDock, DockLayerGroup, DockLayer, DockControl,
// DockSeparator, DockCrossfade, and DockTrigger from /dock-trigger) and one each of the overlays its dock holds
// (DropdownMenu from /menu, Select, Popover, Tooltip), and mounts them, so a bundler keeps what a page using them keeps.
// The same file builds against each ref's `git archive` dist (vite.config.mjs maps @mkbabb/glass-ui/* to it).
import { createApp, h } from "vue";
import { GlassDock, DockLayerGroup, DockLayer, DockControl, DockSeparator, DockCrossfade } from "@mkbabb/glass-ui/dock";
import { DockTrigger } from "@mkbabb/glass-ui/dock-trigger";
import { DropdownMenu } from "@mkbabb/glass-ui/menu";
import { Select } from "@mkbabb/glass-ui/select";
import { Popover } from "@mkbabb/glass-ui/popover";
import { Tooltip } from "@mkbabb/glass-ui/tooltip";
const App = {
    render: () =>
        h(GlassDock, { "aria-label": "fixture", collapse: "open" }, {
            default: () => [
                h(DockLayerGroup, { showSwitcher: false }, { default: () => [h(DockLayer, { id: "a", label: "A" }, { default: () => [h(DockControl, { "aria-label": "One" }, () => "1")] })] }),
                h(DockSeparator),
                h(DockCrossfade, null, { default: () => "x" }),
                h(DropdownMenu, null, { default: () => h(DockTrigger, { for: "dropdown", "aria-label": "Menu" }, () => "m") }),
                h(Select, null, { default: () => h(DockTrigger, { for: "select", "aria-label": "View" }, () => "v") }),
                h(Popover, null, { default: () => h(DockTrigger, { for: "popover", "aria-label": "About" }, () => "a") }),
                h(Tooltip, null, { default: () => "t" }),
            ],
        }),
};
createApp(App).mount("#app");
