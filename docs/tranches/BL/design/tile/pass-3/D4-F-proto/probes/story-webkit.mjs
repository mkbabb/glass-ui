#!/usr/bin/env node
// D4-F pass-3 prototype · probes/story-webkit.mjs · does Playwright WebKit crash on the route's story page, or on the
// demo itself? story.mjs reads the "Tiles" section in Chromium, then Playwright WebKit crashes the page before the
// first `.toggle-group` paints (sitting 2: "Page crashed"; sitting 3: "Target page, context or browser has been
// closed"). This serves the worktree's demo once and opens, in Playwright WebKit only, the route's page
// (/forms/toggle) and two control pages the route does not touch (/forms/inputs, /forms/slider), each twice, in a
// fresh browser per open, under the BL WebKit lock. Reports per page: loaded and painted, or crashed, with the load.
//   node story-webkit.mjs <worktree> [--json f]
import fs from "node:fs";
import path from "node:path";
import { acquireLock, load, parseArgs } from "../../../harness/lib.mjs";
import { holdWebkit } from "../../../../../driver/webkit-lock.mjs";

const wt = path.resolve(process.argv[2]);
const args = parseArgs(process.argv.slice(3));
const lock = await acquireLock("d4f-p3-proto-story-webkit");
await holdWebkit("d4f-story-webkit");
console.log(`D4-F p3 proto story-webkit · ${wt} · lock waited ${lock.waitedS}s · load ${load()} at start`);
process.chdir(wt);
const { createServer } = await import(path.join(wt, "node_modules/vite/dist/node/index.js"));
const server = await createServer({ configFile: path.join(wt, "vite.config.ts"), root: wt, cacheDir: path.join(wt, ".vite-cache/story"), logLevel: "error", server: { host: "127.0.0.1", port: 5478, strictPort: false } });
await server.listen();
const base = server.resolvedUrls.local[0].replace(/\/$/, "");
const pw = await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs");
const out = { cells: [] };
try {
  for (const route of ["/forms/inputs", "/forms/slider", "/forms/toggle"]) {
    for (let k = 1; k <= 2; k++) {
      const b = await pw.webkit.launch({ headless: true });
      let verdict;
      try {
        const ctx = await b.newContext({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        let crashed = false;
        page.on("crash", () => { crashed = true; });
        await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 120000 });
        await page.waitForTimeout(4000);
        const painted = crashed ? null : await page.evaluate(() => ({ main: !!document.querySelector("main"), groups: document.querySelectorAll(".toggle-group").length, nodes: document.querySelectorAll("*").length })).catch((e) => ({ error: String(e.message).split("\n")[0] }));
        verdict = crashed ? "CRASHED (page crash event)" : painted?.error ? `CLOSED: ${painted.error}` : `loaded · ${painted.nodes} elements · .toggle-group ${painted.groups}`;
      } catch (e) {
        verdict = `CRASHED: ${String(e.message).split("\n")[0]}`;
      } finally {
        await b.close().catch(() => {});
      }
      const line = `Playwright WebKit ${route} try ${k} · ${verdict} · load ${load()}`;
      console.log(`  INFO ${line}`);
      out.cells.push({ route, try: k, verdict, load: load() });
    }
  }
} finally {
  await server.close();
}
if (args.json) fs.writeFileSync(String(args.json), JSON.stringify(out, null, 1));
console.log(`done · load ${load()} at end`);
