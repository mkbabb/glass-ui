// Throwaway spike config — includes only this dir's *.spike.test.ts. Greenfield.
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    test: {
        include: ["**/*.spike.test.ts"],
        root: import.meta.dirname,
        environment: "node",
    },
});
