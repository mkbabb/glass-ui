// build.mjs <worktree> <outdir>: copy the challenge fixture into the worktree and vite-build it there (AB/tools/build.mjs, fixture dir swapped).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const wt = path.resolve(process.argv[2]);
const out = path.resolve(process.argv[3]);
const fx = path.join(wt, "tests-visual/dock-cluster-f3" + (process.argv[4] ? "-alt" : ""));
fs.mkdirSync(fx, { recursive: true });
const src = path.resolve(process.argv[4] ?? path.join(here, "../fixture"));
for (const f of fs.readdirSync(src)) fs.copyFileSync(path.join(src, f), path.join(fx, f));
const nm = path.join(wt, "node_modules");
const vite = await import(pathToFileURL(path.join(nm, "vite/dist/node/index.js")).href);
const vue = (await import(pathToFileURL(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs")).href)).default;
const tailwind = (await import(pathToFileURL(path.join(nm, "@tailwindcss/vite/dist/index.mjs")).href)).default;
const t0 = Date.now();
await vite.build({
    configFile: false, root: fx, base: "./", cacheDir: path.join(out, ".vite"), logLevel: "warn",
    plugins: [tailwind(), vue()],
    resolve: { alias: [
        { find: "@glass", replacement: path.join(wt, "src") },
        { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") },
    ] },
    build: { outDir: path.join(out, "site"), emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9, minify: false },
});
console.log(`built ${path.join(out, "site")} in ${Date.now() - t0} ms`);
