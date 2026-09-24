// build.mjs: build the scene page and the demo from ANY worktree, into scratch.
//
//   node build.mjs <worktree> [--out <dir>] [--label <name>] [--no-demo]
//
// <worktree> needs a node_modules (a symlink to the checkout's is fine). Nothing
// is written inside the worktree: the scene sources, both vite caches and both
// outputs go under <out>/builds/<label>/, and the demo config is loaded with
// vite's module-runner loader, which writes no temp file next to node_modules.
// Prints the build dir, which every witness takes as --build.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { parseArgs } from "./lib.mjs";
import { sceneFiles } from "./scenes.mjs";

const args = parseArgs();
const wt = path.resolve(args.positional[0] ?? "");
if (!args.positional[0] || !fs.existsSync(path.join(wt, "src"))) {
    console.error("usage: node build.mjs <worktree> [--out <dir>] [--label <name>] [--no-demo]");
    process.exit(2);
}
const nm = path.join(wt, "node_modules");
if (!fs.existsSync(nm)) { console.error(`no node_modules in ${wt} (symlink the checkout's)`); process.exit(2); }
const head = execFileSync("git", ["-C", wt, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const dirty = execFileSync("git", ["-C", wt, "status", "--porcelain", "--untracked-files=no"], { encoding: "utf8" }).trim();
const label = args.label ?? `${path.basename(wt)}-${head.slice(0, 8)}${dirty ? "-dirty" : ""}`;
const outRoot = path.resolve(args.out ?? process.env.DOCK_HARNESS_OUT ?? path.join(os.tmpdir(), "dock-harness"));
const dir = path.join(outRoot, "builds", label);
fs.mkdirSync(dir, { recursive: true });

const vite = await import(pathToFileURL(path.join(nm, "vite/dist/node/index.js")).href);
const vue = (await import(pathToFileURL(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs")).href)).default;
const tailwind = (await import(pathToFileURL(path.join(nm, "@tailwindcss/vite/dist/index.mjs")).href)).default;

// 1 · the scene page
const src = path.join(dir, "scene-src");
fs.rmSync(src, { recursive: true, force: true });
fs.mkdirSync(src, { recursive: true });
for (const [f, body] of Object.entries(sceneFiles(wt))) fs.writeFileSync(path.join(src, f), body);
const t0 = Date.now();
await vite.build({
    configFile: false,
    root: src,
    base: "./",
    cacheDir: path.join(dir, ".vite-scene"),
    logLevel: "warn",
    plugins: [tailwind(), vue()],
    resolve: {
        alias: [
            { find: "@glass", replacement: path.join(wt, "src") },
            { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") },
        ],
    },
    build: { outDir: path.join(dir, "scene"), emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 },
});
const sceneMs = Date.now() - t0;

// 2 · the demo (the real SidebarDock), through the worktree's own demo-dist config.
// vite's "bundle" config loader writes a temp file into the nearest node_modules
// (a symlink into the checkout), and its "runner" loader rejects the config's
// `__dirname` under Node's ESM detection. So the config is imported through
// vite.runnerImport with one pre-transform that turns `__dirname` into the
// module's own directory as a string literal, and the loaded object is built
// with configFile: false (so the worktree's root vite.config.ts is never read).
let demoMs = null;
if (!args["no-demo"]) {
    const t1 = Date.now();
    process.chdir(dir); // runnerImport pins its cacheDir to cwd
    const dirnamePatch = {
        name: "harness:dirname-literal",
        enforce: "pre",
        transform(code, id) {
            const file = id.split("?")[0];
            if (file.includes("/node_modules/") || !code.includes("__dirname")) return null;
            return { code: code.replaceAll("__dirname", JSON.stringify(path.dirname(file))), map: null };
        },
    };
    const { module } = await vite.runnerImport(path.join(wt, "demo/vite.demo-dist.config.ts"), { plugins: [dirnamePatch], logLevel: "warn" });
    const demoConfig = module.default;
    await vite.build(vite.mergeConfig(demoConfig, {
        configFile: false,
        cacheDir: path.join(dir, ".vite-demo"),
        logLevel: "warn",
        build: { outDir: path.join(dir, "demo"), emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 },
    }));
    demoMs = Date.now() - t1;
}
const meta = { label, worktree: wt, head, dirty: !!dirty, built: new Date().toISOString(), sceneMs, demoMs };
fs.writeFileSync(path.join(dir, "build.json"), JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta));
console.log(dir);
