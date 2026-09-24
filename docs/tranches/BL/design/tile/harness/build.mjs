#!/usr/bin/env node
// build.mjs · bundle the scene app against a worktree's `src` into the output root.
//   node build.mjs <worktree> [--label head] [--out <dir>] [--dev]
//   → <out>/builds/<label>/{app,dist,.vite,build.json}; pass `--build <out>/builds/<label>` to every witness.
// The worktree needs node_modules (symlink the checkout's). Nothing is written into the worktree: the app
// sources, the vite cache and the output live under <out>/builds/<label>/.
// Production SFC compile by default (as the shipped dist: root comments stripped, fall-through attributes land
// on the root). `--dev` builds with import.meta.env.DEV true, for a family whose refusal is DEV-only.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { REPO, parseArgs, outRoot } from "./lib.mjs";
import { sceneApp } from "./scenes.mjs";

// The two new-component families the portfolio sketches (D4-B, D4-C). When a worktree carries one, the app
// imports it and publishes its export names on window.__tile.exports; at HEAD neither directory exists.
const FAMILY_DIRS = { choice: "choice", selection: "selection" };

export async function buildScenes(worktree, { label = "head", out, dev = false } = {}) {
  const wt = path.resolve(worktree);
  for (const need of ["src/styles/index.css", "src/components/toggle-group/index.ts", "node_modules/vue", "vite.targets.ts"])
    if (!fs.existsSync(path.join(wt, need))) throw new Error(`${wt} lacks ${need} (a glass-ui worktree with node_modules is required)`);
  const nm = path.join(REPO, "node_modules");
  const root = path.join(out, "builds", label), app = path.join(root, "app"), dist = path.join(root, "dist");
  fs.rmSync(app, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });
  const familyModules = Object.fromEntries(Object.entries(FAMILY_DIRS).filter(([, d]) => fs.existsSync(path.join(wt, "src/components", d, "index.ts"))));
  for (const [name, body] of Object.entries(sceneApp(wt, nm, { familyModules }))) fs.writeFileSync(path.join(app, name), body);
  process.env.NODE_ENV = dev ? "development" : "production";
  const { build } = await import(path.join(nm, "vite/dist/node/index.js"));
  const vue = (await import(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs"))).default;
  const tailwindcss = (await import(path.join(nm, "@tailwindcss/vite/dist/index.mjs"))).default;
  const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
  const t0 = Date.now();
  await build({
    configFile: false, mode: dev ? "development" : "production", root: app, base: "./", cacheDir: path.join(root, ".vite"), logLevel: "warn", publicDir: false,
    plugins: [tailwindcss(), vue()],
    define: dev ? { "import.meta.env.DEV": "true" } : {},
    resolve: { alias: [
      { find: "@glass", replacement: path.join(wt, "src") },
      { find: /^vue$/, replacement: path.join(nm, dev ? "vue/dist/vue.runtime.esm-bundler.js" : "vue/dist/vue.runtime.esm-bundler.js") },
    ] },
    build: { outDir: dist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, sourcemap: false, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 },
  });
  let sha = null; try { sha = execFileSync("git", ["-C", wt, "rev-parse", "--short=8", "HEAD"], { encoding: "utf8" }).trim(); } catch {}
  let dirty = null; try { dirty = execFileSync("git", ["-C", wt, "status", "--porcelain", "--", "src"], { encoding: "utf8" }).trim().split("\n").filter(Boolean).length; } catch {}
  const meta = { label, worktree: wt, sha, srcDirtyFiles: dirty, dev, familyModules: Object.keys(familyModules), built: new Date().toISOString(), seconds: +((Date.now() - t0) / 1000).toFixed(1) };
  fs.writeFileSync(path.join(root, "build.json"), JSON.stringify(meta, null, 1));
  return { root, dist, meta };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  if (!a.positional[0]) { console.error("usage: node build.mjs <worktree> [--label head] [--out <dir>] [--dev]"); process.exit(2); }
  const { root, meta } = await buildScenes(a.positional[0], { label: a.label || "head", out: outRoot(a), dev: !!a.dev });
  console.log(`built ${meta.label} from ${meta.worktree} @ ${meta.sha} (src dirty files: ${meta.srcDirtyFiles}, dev ${meta.dev}, family modules [${meta.familyModules}]) in ${meta.seconds}s → --build ${root}`);
}
