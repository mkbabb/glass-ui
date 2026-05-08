import { resolve } from "node:path";

export function libraryEntries(rootDir: string) {
    return {
        index: resolve(rootDir, "src/index.ts"),
        tokens: resolve(rootDir, "src/tokens.ts"),
        dock: resolve(rootDir, "src/dock.ts"),
        search: resolve(rootDir, "src/search.ts"),
        sidebar: resolve(rootDir, "src/sidebar.ts"),
        controls: resolve(rootDir, "src/controls.ts"),
        "confirm-dialog": resolve(rootDir, "src/confirm-dialog.ts"),
        "infinite-scroll": resolve(rootDir, "src/infinite-scroll.ts"),
        tabs: resolve(rootDir, "src/tabs.ts"),
        typewriter: resolve(rootDir, "src/typewriter.ts"),
        "stacked-icons": resolve(rootDir, "src/stacked-icons.ts"),
        virtual: resolve(rootDir, "src/virtual.ts"),
        pagination: resolve(rootDir, "src/pagination.ts"),
        "glass-carousel": resolve(rootDir, "src/glass-carousel.ts"),
        aurora: resolve(rootDir, "src/aurora.ts"),
        "metric-badge": resolve(rootDir, "src/metric-badge.ts"),
        "status-dot": resolve(rootDir, "src/status-dot.ts"),
        pulse: resolve(rootDir, "src/pulse.ts"),
        "paper-backdrop": resolve(rootDir, "src/paper-backdrop.ts"),
        "toggle-chip": resolve(rootDir, "src/toggle-chip.ts"),
        "glass-panel": resolve(rootDir, "src/glass-panel.ts"),
        metaballs: resolve(rootDir, "src/metaballs.ts"),
        "sortable-list": resolve(rootDir, "src/sortable-list.ts"),
        timeline: resolve(rootDir, "src/timeline.ts"),
        "labeled-field": resolve(rootDir, "src/labeled-field.ts"),
        "expandable-container": resolve(rootDir, "src/expandable-container.ts"),
        "icon-tooltip": resolve(rootDir, "src/icon-tooltip.ts"),
        "instrument-chassis": resolve(rootDir, "src/instrument-chassis.ts"),
        "glyph-face": resolve(rootDir, "src/glyph-face.ts"),
        "dock-group": resolve(rootDir, "src/dock-group.ts"),
        "disco-glyph": resolve(rootDir, "src/disco-glyph.ts"),
        "hover-popover": resolve(rootDir, "src/hover-popover.ts"),
        configurator: resolve(rootDir, "src/configurator.ts"),
        "scrolling-text": resolve(rootDir, "src/scrolling-text.ts"),
    };
}

export function libraryFileName(_format: string, entryName: string) {
    return entryName === "index" ? "glass-ui.js" : `${entryName}.js`;
}

export const libraryExternal = [
    "vue",
    "reka-ui",
    "@vueuse/core",
    "@mkbabb/keyframes.js",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "embla-carousel-vue",
    "lucide-vue-next",
    "vaul-vue",
];

export const libraryGlobals = {
    vue: "Vue",
    "@mkbabb/keyframes.js": "Keyframes",
};
