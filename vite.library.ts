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
        "glass-carousel": resolve(rootDir, "src/glass-carousel.ts"),
        aurora: resolve(rootDir, "src/aurora.ts"),
        "metric-badge": resolve(rootDir, "src/metric-badge.ts"),
        "metric-stack": resolve(rootDir, "src/metric-stack.ts"),
        "metric-cell": resolve(rootDir, "src/metric-cell.ts"),
        "responsive-tabs": resolve(rootDir, "src/responsive-tabs.ts"),
        "animated-digit": resolve(rootDir, "src/animated-digit.ts"),
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
        "disco-glyph": resolve(rootDir, "src/disco-glyph.ts"),
        "hover-popover": resolve(rootDir, "src/hover-popover.ts"),
        "header-ribbon": resolve(rootDir, "src/header-ribbon.ts"),
        configurator: resolve(rootDir, "src/configurator.ts"),
        "scrolling-text": resolve(rootDir, "src/scrolling-text.ts"),
        forms: resolve(rootDir, "src/forms.ts"),
        api: resolve(rootDir, "src/api/index.ts"),
        // L.W1 Lane C — flat top-level subpath barrels for the vueuse-bearing
        // composables. The v0.9.x transitional `dark-subpath` / `keyboard-subpath`
        // dist filenames retire here in favour of canonical flat names matching
        // every other subpath. `useCarousel` joins the set as a new public
        // subpath (Lane A removes it from the root barrel re-export chain).
        dark: resolve(rootDir, "src/dark.ts"),
        keyboard: resolve(rootDir, "src/keyboard.ts"),
        carousel: resolve(rootDir, "src/carousel.ts"),
        // AI.W1 R3 — flat top-level subpath barrel for the keyframes.js-bearing
        // motion composables. Mirrors the Lane C closure shape: a heavy peer
        // (`@mkbabb/keyframes.js`, ~102 KB raw) gets carved off the root barrel
        // so consumers opt into it explicitly and bundlers shake it from
        // unrelated entry chunks. Closes AI-CARRY-GLASS-UI-KEYFRAMES-EDGE.
        motion: resolve(rootDir, "src/motion.ts"),
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
    "embla-carousel-vue",
    "lucide-vue-next",
    "vaul-vue",
];

export const libraryGlobals = {
    vue: "Vue",
    "@mkbabb/keyframes.js": "Keyframes",
};
