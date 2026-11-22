import type { Plugin } from "vite";

import { darkModeSyncScript } from "./src/composables/dark/darkModeSyncScript";

/**
 * The demo's parse-time theme stamp: glass-ui's own head script, plus the ground
 * colour the page paints before any stylesheet or module arrives.
 *
 * Two tags, first in `<head>`: an inline `<style>` that colours `html` in both
 * themes, then the theme script that sets `.dark` on `html`. Together they make the
 * first frame the warm ground, never the browser's dark canvas.
 *
 * Both configs import this one module (`vite.config.ts` for the dev server,
 * `demo/vite.demo-dist.config.ts` for the built demo). The plugin name is read by
 * `tests/composables/dark/darkModeSyncScript.test.ts`.
 */

/** The settled shell field's mean ground, light and dark. */
export const DEMO_GROUND = {
    light: "rgb(252 241 230)",
    dark: "rgb(43 34 27)",
} as const;

export const demoGroundStyle = `html{background-color:${DEMO_GROUND.light}}html.dark{background-color:${DEMO_GROUND.dark}}`;

export function darkModeStamp(): Plugin {
    return {
        name: "glass-ui:dark-mode-stamp",
        transformIndexHtml: () => [
            { tag: "style", children: demoGroundStyle, injectTo: "head-prepend" },
            { tag: "script", children: darkModeSyncScript(), injectTo: "head-prepend" },
        ],
    };
}
