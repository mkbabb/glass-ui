import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vue()],
    // Cross-repo dev-resolution contract, consumer half
    // (docs/precepts/cross-repo-dev-resolution.md §2.2). The test runner loads
    // `@mkbabb/keyframes.js` via the `development` condition → its live `src/`.
    // `@mkbabb/value.js` is now a DIRECT peerDependency consumed by aurora's
    // color path (composables/color.ts — value.js-K inv-K-2 dedup); it resolves
    // through glass-ui's own `node_modules/@mkbabb/value.js` (kept as a devDep
    // alongside the peer so the suite + build have an instance to resolve). The
    // former "phantom devDep" framing is retired: value.js is a first-class peer.
    // BH.B2.0 — the `@glass` source alias (`@glass/*` → `src/*`), the runtime
    // twin of the `tsconfig.json` `paths` type-plane alias. vitest does NOT read
    // `vite.config.ts`'s alias, so the tests-tree codemod (227 `../../src/...` →
    // `@glass/...` rewrites) needs its own here.
    resolve: {
        conditions: ["development", "module", "browser", "default"],
        alias: {
            "@glass": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        environment: "happy-dom",
        globals: true,
        fileParallelism: false,
        // AV.W14 — all tests live under the top-level `tests/` tree (mirrors
        // `src/`); none remain in `src/` (proof:no-test-in-src). The
        // `scripts/**` glob covers any gate self-test colocated with a script.
        include: [
            "tests/**/*.{test,spec}.{ts,tsx}",
            "tests/**/*.{test,spec}.vue",
            "scripts/**/*.{test,spec}.{ts,tsx}",
        ],
        setupFiles: ["./tests/setup.ts"],
    },
});
