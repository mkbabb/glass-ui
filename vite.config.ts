import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
} from "./vite.library";
import { publishStyleAssets } from "./vite.style-assets";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        // TypeScript declarations are emitted out-of-band by the repo-native
        // `vue-tsc` (the `emit-types` script, run as the second half of
        // `build`), NOT by an in-Vite dts plugin. `vue-tsc --project
        // tsconfig.build.json` emits the flat per-entry `.d.ts` set into
        // `dist/` in `emitDeclarationOnly` mode against the repo's own
        // TypeScript — no plugin-bundled TS pin to drift from. See
        // `tsconfig.build.json` + `package.json` build.
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
        lib: {
            entry: libraryEntries(__dirname),
            name: "GlassUI",
            fileName: libraryFileName,
            formats: ["es"],
        },
        rolldownOptions: {
            external: libraryExternal,
        },
    },
});
