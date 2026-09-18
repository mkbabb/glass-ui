import type { Plugin } from "vite";

import { darkModeSyncScript } from "./src/composables/dark/darkModeSyncScript";

/**
 * The demo's parse-time theme stamp — glass-ui dogfooding its own FOUC primitive.
 *
 * `darkModeSyncScript()` returns the `<head>` script STRING; a consumer's job is to
 * get that string into the HTML before first paint, and the recipe is this plugin,
 * not a transcription. Injected `head-prepend`, so it is the first thing in `<head>`
 * and the theme is resolved before any stylesheet or module is fetched.
 *
 * Until this existed the demo resolved the theme in `demo/main.ts`, after the whole
 * module graph had loaded — the library's own shell shipped the flash its published
 * primitive exists to remove. `demo/main.ts`'s capture boot still forces `?mode=`
 * over this stamp on purpose: a capture asks for a mode, this answers when nobody has.
 *
 * It lives in its OWN root module because there are TWO shells to stamp and they
 * share no config: `vite.config.ts` is the dev server and the library `build.lib`
 * arm, and `demo/vite.demo-dist.config.ts` is a standalone config that fully replaces
 * it for the built demo. A plugin defined inside either one is a plugin the other
 * silently lacks — which is exactly how `dist-demo/index.html`, the bytes a viewer
 * actually loads, went unstamped while the dev server was stamped.
 *
 * The plugin NAME is load-bearing: `tests/composables/dark/darkModeSyncScript.test.ts`
 * finds it by name in both configs' loaded plugin lists.
 */
export function darkModeStamp(): Plugin {
    return {
        name: "glass-ui:dark-mode-stamp",
        transformIndexHtml: () => [
            { tag: "script", children: darkModeSyncScript(), injectTo: "head-prepend" },
        ],
    };
}
