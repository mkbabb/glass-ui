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
