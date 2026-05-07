import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vue()],
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
