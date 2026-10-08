#!/usr/bin/env node
// R-E · builds glance/App.vue against a worktree's library through `@glass` (the harness build.mjs pattern, one page).
//   node build-glance.mjs <worktree> --label <l> --out <dir>
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2); const wt = path.resolve(argv[0]);
const opt = (k) => argv[argv.indexOf(`--${k}`) + 1];
const label = opt("label"), out = path.resolve(opt("out"));
const nm = path.join(wt, "node_modules");
const work = path.join(out, "work-glance", label), outDir = path.join(out, "glance", label);
const vite = await import(pathToFileURL(path.join(nm, "vite/dist/node/index.js")).href);
const vue = (await import(pathToFileURL(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs")).href)).default;
const tailwind = (await import(pathToFileURL(path.join(nm, "@tailwindcss/vite/dist/index.mjs")).href)).default;
fs.rmSync(work, { recursive: true, force: true }); fs.mkdirSync(work, { recursive: true });
fs.writeFileSync(path.join(work, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>R-E glance</title></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(work, "main.ts"), `import "./h.css";\nimport { createApp } from "vue";\nimport App from "./App.vue";\nif (new URLSearchParams(location.search).get("theme") === "dark") document.documentElement.classList.add("dark");\ncreateApp(App).mount("#app");\n`);
fs.writeFileSync(path.join(work, "h.css"), `@import "${nm}/tailwindcss/index.css" source("./");\n@source "${wt}/src/components/**/*.vue";\n@source "${wt}/src/components/_shared/**/*.ts";\n@import "${nm}/tw-animate-css/dist/tw-animate.css";\n@import "${wt}/src/styles/index.css";\nbody { min-height: 100vh; margin: 0; }\n`);
fs.copyFileSync(path.join(HERE, "glance", "App.vue"), path.join(work, "App.vue"));
await vite.build({ configFile: false, root: work, base: "./", cacheDir: path.join(work, ".vite"), logLevel: "warn", plugins: [tailwind(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") }] },
  build: { outDir, emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 } });
console.log(outDir);
