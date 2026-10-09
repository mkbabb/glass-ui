#!/usr/bin/env node
// D4-Dp-proto/probes/consumer-aria-name.mjs · M-7 read in paint and console: `preset-consumer-aria` (a consumer role and
// tabindex on every ToggleGroupItem) is named once per item in a development build (src-dev, dist-dev) and is silent in
// production (src, dist); the engine's role stands in every flavour. Both engines.
//   node consumer-aria-name.mjs --build <out>/builds/<label>
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
const args = parseArgs(); const lock = await acquireLock("dp-consumer-aria-name"); const target = await openTarget(args);
const dev = target.meta.flavor.endsWith("-dev");
console.log(`consumer-aria name probe · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
let pass = 0, n = 0;
for (const engine of ["chromium", "webkit"]) {
  console.log(`engine ${await engineVersion(engine)}`);
  // the harness collects console output from page creation (P.logs), so a name logged at mount is read
  const P = await openPage(target, engine, "preset-consumer-aria", { mode: "light" });
  await P.page.waitForTimeout(1200);
  const roles = await P.page.evaluate(() => window.__th.items().map((e) => `${e.getAttribute("role")}/${e.getAttribute("tabindex")}`));
  await P.close();
  const errs = P.logs.filter((l) => l.type === "error" || l.type === "warning").map((l) => l.text);
  const named = errs.filter((t) => /sets role, tabindex/.test(t));
  const ok = (dev ? named.length >= 1 : named.length === 0) && roles.every((r) => r.startsWith("radio/"));
  n++; if (ok) pass++;
  console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} · items ${roles.join(" ")} · ${named.length} name(s)${named[0] ? ": " + named[0].slice(0, 200) : ""} · load ${load()}`);
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(pass === n ? 0 : 1);
