import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";
import { darkModeSyncScript } from "./src/composables/dark/darkModeSyncScript";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
} from "./vite.library";
import { publishStyleAssets } from "./vite.style-assets";
import { glassCssTarget } from "./vite.targets";

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
 */
export function darkModeStamp(): Plugin {
    return {
        name: "glass-ui:dark-mode-stamp",
        transformIndexHtml: () => [
            { tag: "script", children: darkModeSyncScript(), injectTo: "head-prepend" },
        ],
    };
}

export default defineConfig({
    // BH.B2.0 — the `@glass` source alias (`@glass/*` → `src/*`). Decouples the
    // demo's deep-relative `../../src/...` imports from src depth so a later src
    // move is a one-line target change, not a 492-site rewrite. Vite needs its
    // own `resolve.alias` (the demo dev server + any demo build); vitest does not
    // read this (it has the twin in `vitest.config.ts`); tsconfig carries the
    // type-plane `paths` twin. Inert in the library `build.lib` arm — src entries
    // import relatively, the demo files are not entries.
    resolve: {
        alias: {
            "@glass": resolve(__dirname, "src"),
        },
    },
    plugins: [
        tailwindcss(),
        vue(),
        darkModeStamp(),
        // The ONE publish lifecycle: JS/SFC-CSS/declarations/relays/styles are
        // staged outside `dist/`, verified as a complete tuple, then atomically
        // renamed into place. Declarations come from the repo-native `vue-tsc
        // --project tsconfig.build.json` (spawned inside the plugin), NOT from a
        // dts plugin with its own bundled TypeScript pin.
        publishStyleAssets(),
    ],
    // Cross-repo dev-resolution contract-v2
    // (docs/precepts/cross-repo-dev-resolution.md §2).
    // glass-ui consumes `@mkbabb/keyframes.js`. Under contract-v2 the
    // `development` condition is abrogated fleet-wide: there is no longer a
    // `development`-branch in any `@mkbabb/*` `exports` map, so the consumer
    // half is struck too. A bare `@mkbabb/keyframes.js` specifier resolves
    // through the sibling's `exports` map to its built `dist/` via the `file:`
    // symlink in `node_modules` — `import`/`default`, the same path dev and
    // prod alike. keyframes.js's `build:watch` keeps that `dist/` fresh while
    // the demo runs (`npm run dev`). For the library `build` below keyframes.js
    // is `external` (vite.library libraryExternal) and never bundled at all.
    // The `fs.allow` widening that the `development` condition once required
    // (to reach a sibling's `src/` over the `/@fs/` channel) is gone with it —
    // `dist/` resolves inside `node_modules`, no widening needed.
    build: {
        cssTarget: glassCssTarget,
        lib: {
            entry: libraryEntries(__dirname),
            name: "GlassUI",
            fileName: libraryFileName,
            formats: ["es"],
        },
        rolldownOptions: {
            external: libraryExternal,
            output: {
                // BB.W-PAYLOAD-DEFER (scope 3) — the canonical Vite-8 `manualChunks`
                // recipe, shipped as the LIVE reference (the verified-by-build
                // copy-paste a consumer lifts). The single-arg
                // Rolldown-compatible form, ordered glass-ui → vueuse → vendor so the
                // node_modules catch-all never swallows the two named splits (both
                // resolve under node_modules). NEVER set `output.advancedChunks`
                // alongside it — Rolldown IGNORES `manualChunks` when both are set.
                //
                // In glass-ui's OWN library build every `@mkbabb`/`@vueuse` peer is
                // `external` (vite.library libraryExternal), so this recipe is inert
                // here (no peer is bundled to split) — it is the CONSUMER reference,
                // verified to load + survive the build, not a library-output change.
                // A consumer building an APP that depends on glass-ui drops this
                // recipe into their `build.rollupOptions.output` to isolate the
                // glass-ui chunk from app code.
                manualChunks(id: string) {
                    if (id.includes("@mkbabb/glass-ui")) return "glass-ui";
                    if (id.includes("@vueuse")) return "vueuse";
                    if (id.includes("node_modules")) return "vendor";
                },
            },
        },
    },
});
