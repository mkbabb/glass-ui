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
    resolve: {
        conditions: ["development", "module", "browser", "default"],
    },
    test: {
        environment: "happy-dom",
        globals: true,
        include: [
            "src/**/*.{test,spec}.{ts,tsx}",
            "src/**/*.{test,spec}.vue",
            "tests/**/*.{test,spec}.{ts,tsx}",
            "scripts/**/*.{test,spec}.{ts,tsx}",
        ],
        setupFiles: ["./tests/setup.ts"],
    },
});
