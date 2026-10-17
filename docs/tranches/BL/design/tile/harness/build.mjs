#!/usr/bin/env node
// build.mjs · bundle the scene app against a worktree's library into the output root.
//   node build.mjs <worktree> [--label head] [--out <dir>] [--flavor src|src-dev|dist|dist-dev] [--route <dir>]
//   → <out>/builds/<label>/{app,dist,.vite,build.json}; pass `--build <out>/builds/<label>` to every witness.
// The worktree needs node_modules (symlink the checkout's). Nothing is written into the worktree: the app
// sources, the vite cache and the output live under <out>/builds/<label>/.
//
// FLAVOURS (H-9: refusal and guard cells run against what a consumer installs):
//   src       `@glass` aliases <worktree>/src; production SFC compile (as the shipped dist compiles). Default.
//   src-dev   the same with import.meta.env.DEV true (the old `--dev`): a DEV-only branch runs here and nowhere
//             a consumer can reach it.
//   dist      the library's built dist, as a consumer installs it: every `@glass/components/<x>` import resolves
//             through <worktree>/package.json's `exports["./<x>"]` (conditions import, default) and the styles
//             through `./styles`; the consumer app is a production build. Build the library first
//             (`vite build` in the worktree, cacheDir inside it).
//   dist-dev  the same dist, resolved with the `development` condition first (Q-5 (d)), under a consumer DEV build.
// ROUTE (H-7, H-8): `--route <dir>` names a pass-2 route directory. Its `route.json` may give
//   { "label": "D-prime", "familyDirs": ["choice"], "migrated": "migrated.mjs" }:
//   familyDirs  component directories under src/components the app imports and whose export names it publishes
//               on window.__tile.exports (the family witnesses read them). Default: none.
//   migrated    a module whose default export maps a consumer site (preset, specimen, strip, f1, v2, c1) to
//               { group: "<Vue template of the group, the DOM contract stamped>", css: "<rules, nested under the
//               migrated arm>" }. The template sees PRESETS, orderedPresets, CURVE_GROUPS, STRIP, LEVELS, PALETTES,
//               STATUSES, model, isMulti, toggleMulti, and the components the app imports (family modules by
//               their directory name). It renders as <site>-migrated with a stripped twin for T-7. A key that is no
//               consumer site (H5-2: the attack route's `matrix`) renders as <site>-migrated as written, with no host
//               and no twin; its template also sees `mx(site)`, the inline `--selection-tile` write `?w=<site>&v=<value>`
//               asks for at mount (undefined otherwise)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { REPO, parseArgs, outRoot } from "./lib.mjs";
import { sceneApp } from "./scenes.mjs";

const FLAVORS = ["src", "src-dev", "dist", "dist-dev"];

/** Resolve `@glass/components/<x>` through the worktree's package exports, as a consumer's resolver would. */
function distAliases(wt, dev) {
  const pkg = JSON.parse(fs.readFileSync(path.join(wt, "package.json"), "utf8"));
  const pick = (entry) => {
    if (typeof entry === "string") return entry;
    for (const c of [...(dev ? ["development"] : []), "import", "default"]) if (entry?.[c]) return pick(entry[c]);
    return null;
  };
  const conds = [];
  const aliases = [];
  for (const [key, entry] of Object.entries(pkg.exports ?? {})) {
    if (!key.startsWith("./") || key.includes("*")) continue;
    const file = pick(entry);
    if (!file || !/\.(m?js)$/.test(file)) continue;
    if (dev && entry?.development) conds.push(key);
    aliases.push({ find: new RegExp(`^@glass/components/${key.slice(2).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), replacement: path.join(wt, file) });
  }
  const styles = pick(pkg.exports?.["./styles"]);
  return { aliases, styles: styles ? path.join(wt, styles) : null, developmentConditions: conds };
}

export async function buildScenes(worktree, { label = "head", out, flavor = "src", route = null } = {}) {
  if (!FLAVORS.includes(flavor)) throw new Error(`--flavor is one of ${FLAVORS.join(", ")}`);
  const wt = path.resolve(worktree);
  const dist = flavor.startsWith("dist");
  const dev = flavor.endsWith("-dev");
  for (const need of ["src/styles/index.css", "src/components/toggle-group/index.ts", "node_modules/vue", "vite.targets.ts", ...(dist ? ["dist/toggle-group.js", "dist/styles/index.css"] : [])])
    if (!fs.existsSync(path.join(wt, need))) throw new Error(`${wt} lacks ${need} (a glass-ui worktree with node_modules${dist ? " and a built dist" : ""} is required)`);
  const nm = path.join(REPO, "node_modules");
  const root = path.join(out, "builds", label), app = path.join(root, "app"), outDist = path.join(root, "dist");
  fs.rmSync(app, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });

  let routeCfg = {}, migration = null;
  if (route) {
    const dir = path.resolve(route);
    const cfgFile = path.join(dir, "route.json");
    routeCfg = fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, "utf8")) : {};
    if (routeCfg.migrated) {
      const mod = (await import(pathToFileURL(path.join(dir, routeCfg.migrated)).href)).default;
      migration = { label: routeCfg.label ?? path.basename(dir), sites: mod };
    }
  }
  const familyModules = Object.fromEntries((routeCfg.familyDirs ?? [])
    .filter((d) => fs.existsSync(path.join(wt, "src/components", d, "index.ts")))
    .map((d) => [d.replace(/[^A-Za-z0-9_]/g, "_"), d]));
  for (const [name, body] of Object.entries(sceneApp(wt, nm, { familyModules, migration, flavor }))) fs.writeFileSync(path.join(app, name), body);

  process.env.NODE_ENV = dev ? "development" : "production";
  const { build } = await import(path.join(nm, "vite/dist/node/index.js"));
  const vue = (await import(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs"))).default;
  const tailwindcss = (await import(path.join(nm, "@tailwindcss/vite/dist/index.mjs"))).default;
  const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
  const da = dist ? distAliases(wt, dev) : null;
  const alias = [
    ...(dist ? da.aliases : [{ find: "@glass", replacement: path.join(wt, "src") }]),
    { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") },
  ];
  const t0 = Date.now();
  await build({
    configFile: false, mode: dev ? "development" : "production", root: app, base: "./", cacheDir: path.join(root, ".vite"), logLevel: "warn", publicDir: false,
    plugins: [tailwindcss(), vue()],
    define: dev ? { "import.meta.env.DEV": "true" } : {},
    resolve: { alias, conditions: dist && dev ? ["development", "module", "browser"] : undefined },
    build: { outDir: outDist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, sourcemap: false, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 },
  });
  let sha = null; try { sha = execFileSync("git", ["-C", wt, "rev-parse", "--short=8", "HEAD"], { encoding: "utf8" }).trim(); } catch {}
  let dirty = null; try { dirty = execFileSync("git", ["-C", wt, "status", "--porcelain", "--", "src"], { encoding: "utf8" }).trim().split("\n").filter(Boolean).length; } catch {}
  let distBuilt = null; if (dist) try { distBuilt = fs.statSync(path.join(wt, "dist/toggle-group.js")).mtime.toISOString(); } catch {}
  const meta = { label, worktree: wt, sha, srcDirtyFiles: dirty, flavor, dev, distBuilt, developmentConditions: da?.developmentConditions ?? null,
    route: route ? path.resolve(route) : null, migration: migration ? { label: migration.label, sites: Object.keys(migration.sites) } : null,
    familyModules: Object.values(familyModules), built: new Date().toISOString(), seconds: +((Date.now() - t0) / 1000).toFixed(1) };
  fs.writeFileSync(path.join(root, "build.json"), JSON.stringify(meta, null, 1));
  return { root, dist: outDist, meta };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  if (!a.positional[0]) { console.error("usage: node build.mjs <worktree> [--label head] [--out <dir>] [--flavor src|src-dev|dist|dist-dev] [--route <dir>]"); process.exit(2); }
  const flavor = typeof a.flavor === "string" ? a.flavor : a.dev ? "src-dev" : "src";
  const { root, meta } = await buildScenes(a.positional[0], { label: a.label || "head", out: outRoot(a), flavor, route: typeof a.route === "string" ? a.route : null });
  console.log(`built ${meta.label} from ${meta.worktree} @ ${meta.sha} (flavor ${meta.flavor}, src dirty files ${meta.srcDirtyFiles}${meta.distBuilt ? `, dist built ${meta.distBuilt}` : ""}${meta.developmentConditions ? `, development conditions ${meta.developmentConditions.length}` : ""}, migration ${meta.migration ? meta.migration.label + " [" + meta.migration.sites + "]" : "none"}, family modules [${meta.familyModules}]) in ${meta.seconds}s → --build ${root}`);
}
