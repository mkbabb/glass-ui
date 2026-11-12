import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const repo = resolve(__dirname, "../../../../../../..");
export default defineConfig({
    root: __dirname,
    resolve: { alias: { "@glass": resolve(repo, "src") } },
    plugins: [tailwindcss(), vue()],
    server: { port: 5381, strictPort: true, fs: { allow: [repo] } },
});
