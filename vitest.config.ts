import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vue()],
    // Cross-repo dev-resolution contract, consumer half
    // (docs/precepts/cross-repo-dev-resolution.md §2.2). The test runner loads
    // `@mkbabb/keyframes.js` via the `development` condition → its live `src/`;
    // keyframes.js's `src/` imports `@mkbabb/value.js`, resolved through
    // keyframes.js's OWN `node_modules` symlink (real nested-graph resolution).
    // This is what makes retiring glass-ui's phantom `@mkbabb/value.js` devDep
    // safe — the grandparent no longer hoists the transitive sibling.
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
