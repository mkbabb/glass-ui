#!/usr/bin/env node
// build.mjs · the scene app (scenes/App.vue) bundled against a worktree's library source through `@glass`
// (the D5 r0 probe build, the band-I pattern). Nothing is written into the worktree.
//   node build.mjs <worktree> --label <l> --out <dir> [--decl <subpath>#<export>] [--app <scene-app.vue>]
// Output: <out>/builds/<l>/index.html. Two generated modules ride along:
//   dirs.ts  the component directories of <worktree>/src/components (names only, `_shared` excluded): E-1's denominator
//   decl.ts  the register's class declaration, imported from the built library at `@glass/<subpath>` by name
//            (default composables/motion#ENGAGE_DECLARATION); null when the export does not exist. A route whose
//            declaration lives elsewhere passes --decl. Its contract is HARNESS.md §2 E-1.
//   members.ts  CK-01 (pass 2): every value each directory's index exports, mapped to that directory (the first
//            directory in name order wins a value two export), so the scene app attributes a rendered component to its
//            directory by identity, not by name. A directory without an index.ts exports nothing to map.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, parseArgs } from "./lib.mjs";

const a = parseArgs(process.argv.slice(3));
const wt = path.resolve(process.argv[2] ?? "");
if (!fs.existsSync(path.join(wt, "src", "components"))) throw new Error(`not a glass-ui worktree: ${wt}`);
if (typeof a.out !== "string") throw new Error("--out <dir> is required (a scratch directory)");
const label = typeof a.label === "string" ? a.label : "head";
const [declPath, declName] = (typeof a.decl === "string" ? a.decl : "composables/motion#ENGAGE_DECLARATION").split("#");
const nm = path.join(wt, "node_modules");
const work = path.join(path.resolve(a.out), "work", label); const outDir = path.join(path.resolve(a.out), "builds", label);
const vite = await import(pathToFileURL(path.join(nm, "vite/dist/node/index.js")).href);
const vue = (await import(pathToFileURL(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs")).href)).default;
const tailwind = (await import(pathToFileURL(path.join(nm, "@tailwindcss/vite/dist/index.mjs")).href)).default;
fs.rmSync(work, { recursive: true, force: true }); fs.mkdirSync(work, { recursive: true });
const C = path.join(wt, "src", "components");
const dirs = fs.readdirSync(C).filter((e) => e !== "_shared" && fs.statSync(path.join(C, e)).isDirectory()).sort();
fs.writeFileSync(path.join(work, "dirs.ts"), `export default ${JSON.stringify(dirs)} as string[];\n`);
fs.writeFileSync(path.join(work, "decl.ts"), `import * as M from "@glass/${declPath}";\nexport default ((M as Record<string, unknown>)[${JSON.stringify(declName)}] ?? null) as unknown;\n`);
const withIndex = dirs.filter((x) => fs.existsSync(path.join(C, x, "index.ts")));
fs.writeFileSync(path.join(work, "members.ts"), `${withIndex.map((x, i) => `import * as m${i} from "@glass/components/${x}";`).join("\n")}
const M = new Map<unknown, string>();
for (const [d, mod] of [${withIndex.map((x, i) => `[${JSON.stringify(x)}, m${i}]`).join(", ")}] as [string, Record<string, unknown>][])
  for (const v of Object.values(mod)) if (v && (typeof v === "object" || typeof v === "function") && !M.has(v)) M.set(v, d);
export default M;
`);
fs.writeFileSync(path.join(work, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>D5 battery</title></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(work, "main.ts"), `import "./h.css";\nimport { createApp } from "vue";\nimport App from "./App.vue";\nif (new URLSearchParams(location.search).get("theme") === "dark") document.documentElement.classList.add("dark");\ncreateApp(App).mount("#app");\n`);
fs.writeFileSync(path.join(work, "h.css"), `@import "${nm}/tailwindcss/index.css" source("./");\n@source "${wt}/src/components/**/*.vue";\n@source "${wt}/src/components/_shared/**/*.ts";\n@source "${wt}/src/components/**/index.ts";\n@import "${nm}/tw-animate-css/dist/tw-animate.css";\n@import "${wt}/src/styles/index.css";\nbody { min-height: 100vh; margin: 0; }\n`);
// --app <file>: a route's scene-app fork (its H-2 exemplars) in place of scenes/App.vue; same DOM contract (§1.3)
fs.copyFileSync(typeof a.app === "string" ? path.resolve(a.app) : path.join(HERE, "scenes", "App.vue"), path.join(work, "App.vue"));
await vite.build({
  configFile: false, root: work, base: "./", cacheDir: path.join(work, ".vite"), logLevel: "warn", plugins: [tailwind(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") }] },
  build: { outDir, emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 },
});
console.log(`${outDir} · ${dirs.length} component directories (${withIndex.length} with an index.ts mapped for the member walk) · declaration ${declPath}#${declName}`);
