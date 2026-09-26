// D5 r0 probe build: App.vue against a worktree's src through @glass (the band-I build.mjs pattern, W-I.1 appendix A).
// node build.mjs <worktree> <label>   with D5_OUT=<scratch dir> (required; nothing is written beside this file or into the worktree)
import fs from "node:fs"; import path from "node:path"; import { pathToFileURL, fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
if (!process.env.D5_OUT) throw new Error("set D5_OUT to a scratch directory");
const wt = path.resolve(process.argv[2]); const label = process.argv[3] ?? "head"; const nm = path.join(wt, "node_modules");
const out = path.join(process.env.D5_OUT, "d5-" + label); fs.mkdirSync(out, { recursive: true });
const vite = await import(pathToFileURL(path.join(nm, "vite/dist/node/index.js")).href);
const vue = (await import(pathToFileURL(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs")).href)).default;
const tailwind = (await import(pathToFileURL(path.join(nm, "@tailwindcss/vite/dist/index.mjs")).href)).default;
const src = path.join(out, "src"); fs.rmSync(src, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
fs.writeFileSync(path.join(src, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>D5 probe</title></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(src, "main.ts"), `import "./h.css";\nimport { createApp } from "vue";\nimport App from "./App.vue";\nconst t = new URLSearchParams(location.search).get("theme"); if (t === "dark") document.documentElement.classList.add("dark");\ncreateApp(App).mount("#app");\n`);
fs.writeFileSync(path.join(src, "h.css"), `@import "${nm}/tailwindcss/index.css" source("./");\n@source "${wt}/src/components/**/*.vue";\n@source "${wt}/src/components/_shared/**/*.ts";\n@source "${wt}/src/components/**/index.ts";\n@import "${nm}/tw-animate-css/dist/tw-animate.css";\n@import "${wt}/src/styles/index.css";\nbody { min-height: 100vh; margin: 0; }\n`);
fs.copyFileSync(path.join(here, "App.vue"), path.join(src, "App.vue"));
await vite.build({ configFile: false, root: src, base: "./", cacheDir: path.join(out, ".vite"), logLevel: "warn", plugins: [tailwind(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") }] },
  build: { outDir: path.join(out, "dist"), emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 } });
console.log(path.join(out, "dist"));
