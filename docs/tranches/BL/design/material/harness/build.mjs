#!/usr/bin/env node
// build.mjs · bundle the specimen app against a worktree's `src` into the scratch root.
//   node build.mjs <worktree> [--label head]   →   $D3_OUT/builds/<label>/dist (+ build.json)
// The worktree needs its own node_modules (symlink the checkout's). Nothing is written into the worktree:
// the app sources, the vite cache and the output all live under $D3_OUT/builds/<label>/.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { CHECKOUT, OUT, cli } from "./lib.mjs";
import { specimenApp } from "./specimens.mjs";

export async function buildSpecimens(worktree, label) {
  const wt = path.resolve(worktree);
  for (const need of ["src/styles/index.css", "src/components/dock/index.ts", "node_modules/vue", "vite.targets.ts"])
    if (!fs.existsSync(path.join(wt, need))) throw new Error(`${wt} lacks ${need} (a glass-ui worktree with node_modules is required)`);
  const root = path.join(OUT, "builds", label), app = path.join(root, "app"), dist = path.join(root, "dist");
  fs.rmSync(app, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });
  for (const [name, body] of Object.entries(specimenApp(wt))) fs.writeFileSync(path.join(app, name), body);
  // Production SFC compile, as the shipped dist: set BEFORE the compiler loads (@vue/compiler-core picks its prod
  // or dev build at require time), so root comments are stripped and fall-through attrs land on the root.
  process.env.NODE_ENV = "production";
  const { build } = await import(path.join(CHECKOUT, "node_modules/vite/dist/node/index.js"));
  const vue = (await import(path.join(CHECKOUT, "node_modules/@vitejs/plugin-vue/dist/index.mjs"))).default;
  const tailwindcss = (await import(path.join(CHECKOUT, "node_modules/@tailwindcss/vite/dist/index.mjs"))).default;
  const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
  const t0 = Date.now();
  await build({
    configFile: false, mode: "production", root: app, base: "./", cacheDir: path.join(root, ".vite"), logLevel: "warn", publicDir: false,
    plugins: [tailwindcss(), vue()],
    resolve: { alias: [
      { find: "@glass", replacement: path.join(wt, "src") },
      { find: /^vue$/, replacement: path.join(CHECKOUT, "node_modules/vue/dist/vue.runtime.esm-bundler.js") },
    ] },
    build: { outDir: dist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, sourcemap: false, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 },
  });
  let sha = null; try { sha = execFileSync("git", ["-C", wt, "rev-parse", "--short=8", "HEAD"], { encoding: "utf8" }).trim(); } catch {}
  let dirty = null; try { dirty = execFileSync("git", ["-C", wt, "status", "--porcelain", "--", "src"], { encoding: "utf8" }).trim().split("\n").filter(Boolean).length; } catch {}
  const meta = { label, worktree: wt, sha, srcDirtyFiles: dirty, cssTarget: glassCssTarget, built: new Date().toISOString(), seconds: +((Date.now() - t0) / 1000).toFixed(1) };
  fs.writeFileSync(path.join(dist, "build.json"), JSON.stringify(meta, null, 1));
  return { dist, meta };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ label: { type: "string" } });
  if (!a._[0]) { console.error("usage: node build.mjs <worktree> [--label head]"); process.exit(2); }
  const { dist, meta } = await buildSpecimens(a._[0], a.label || "head");
  console.log(`built ${meta.label} from ${meta.worktree} @ ${meta.sha} (src dirty files: ${meta.srcDirtyFiles}) in ${meta.seconds}s → ${dist}`);
}
