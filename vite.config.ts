import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
    libraryGlobals,
} from "./vite.library";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        dts({
            tsconfigPath: "./tsconfig.src.json",
            rollupTypes: true,
        }),
    ],
    // Cross-repo dev-resolution contract, consumer half
    // (docs/precepts/cross-repo-dev-resolution.md §2.2).
    // glass-ui consumes `@mkbabb/keyframes.js`; the explicit `development`
    // condition resolves the workspace-linked sibling to its live `src/`
    // when this config serves the demo (`npm run dev`). For the library
    // `build` below keyframes.js is `external` (vite.library libraryExternal),
    // so the condition only governs dev/serve resolution — never bundles `src/`.
    resolve: {
        conditions: ["development", "module", "browser", "default"],
    },
    server: {
        // The `development` branch resolves keyframes.js's `src/`, served over
        // Vite's `/@fs/` channel — its repo root must be inside `fs.allow`.
        fs: {
            allow: [".."],
        },
    },
    build: {
        lib: {
            entry: libraryEntries(__dirname),
            name: "GlassUI",
            fileName: libraryFileName,
            formats: ["es"],
        },
        rollupOptions: {
            external: libraryExternal,
            output: {
                globals: libraryGlobals,
            },
        },
    },
});
