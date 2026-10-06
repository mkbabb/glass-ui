#!/usr/bin/env node
// D4-D′ prototype probe (copied from D4-Dp-spec/probes, unchanged in logic) · does a scene load (the `load` event and window.__tile.ready) in an engine, and how long it takes.
// Written for the Playwright WebKit T-3 HARNESS ERROR on `preset-contents` (page.goto: Timeout 30000ms exceeded).
//   node load-scene.mjs --build <dir> --engine webkit --scenes a,b [--css '<rule>'] [--timeout 60000]
import { parseArgs, openTarget, browser, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
const args = parseArgs();
const engine = String(args.engine ?? "webkit");
const lock = await acquireLock("dp-proto-load");
const target = await openTarget(args);
console.log(`load-scene · ${target.label} · ${await engineVersion(engine)} · load ${load()}${args.css ? ` · css ${args.css}` : ""}`);
for (const scene of String(args.scenes).split(",")) {
  const b = await browser(engine);
  const ctx = await b.newContext({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  if (args.css) await page.addInitScript((css) => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }), String(args.css));
  const t0 = Date.now();
  let res;
  try {
    await page.goto(target.url(`scene=${scene}`), { timeout: Number(args.timeout ?? 60000) });
    await page.waitForFunction(() => window.__tile && window.__tile.ready, null, { timeout: 20000 });
    res = `loaded + ready in ${((Date.now() - t0) / 1000).toFixed(1)} s`;
  } catch (e) { res = `FAILED after ${((Date.now() - t0) / 1000).toFixed(1)} s: ${String(e.message).split("\n")[0]}`; }
  console.log(`  ${scene} · ${res} · load ${load()}`);
  await Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]);
}
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
