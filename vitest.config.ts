import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        environment: "happy-dom",
        globals: true,
        include: [
            "src/**/*.{test,spec}.{ts,tsx}",
            "src/**/*.{test,spec}.vue",
            "tests/**/*.{test,spec}.{ts,tsx}",
        ],
        setupFiles: ["./tests/setup.ts"],
    },
});
