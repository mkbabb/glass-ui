#!/usr/bin/env node
// libbuild.mjs · H-9: build the library's dist inside a worktree, as `npm run build` would, so build.mjs
// --flavor dist|dist-dev can import what a consumer installs. The worktree's own vite.config.ts writes
// <worktree>/dist; the vite cache is pinned inside the worktree (<worktree>/.vite-cache). Nothing is written
// anywhere else. Never run it against the main checkout.
//   node libbuild.mjs <worktree>
import path from "node:path";
import { load } from "./lib.mjs";

const wt = path.resolve(process.argv[2] ?? "");
if (!process.argv[2]) { console.error("usage: node libbuild.mjs <worktree>"); process.exit(2); }
process.chdir(wt);
process.env.NODE_ENV = "production";
const { build } = await import(path.join(wt, "node_modules/vite/dist/node/index.js"));
console.log(`load ${load()} at start`);
const t0 = Date.now();
await build({ configFile: path.join(wt, "vite.config.ts"), root: wt, cacheDir: path.join(wt, ".vite-cache"), logLevel: "warn" });
console.log(`lib build done in ${((Date.now() - t0) / 1000).toFixed(1)} s · load ${load()} at end`);
