#!/usr/bin/env node
// R-A · PORTFOLIO §6 D5-A Q-3: the drift check. Every class recipe stamps its class as the registered, non-inherited
// `--rung-class`; this reads it from the computed style of each exemplar's element and compares it with the class
// the built declaration (window.__e.decl) gives that directory. The plant adds `engage-chosen` to the Separator at
// runtime: a member composing a recipe its row does not declare must read as DRIFT.
//   node driftprobe.mjs <build dir> [chromium|webkit]
import { INIT, Engine, serveTarget, load } from "../../harness/lib.mjs";

const build = process.argv[2]; const engine = process.argv[3] ?? "chromium";
const ROWS = [["switch", "switch", '[role="switch"]'], ["accordion", "accordion", ".disclosure-trigger"], ["slider", "slider", ".glass-slider"],
  ["passive", "separator", '[data-t="sep"]'], ["passive", "skeleton", '[data-t="skel"]'], ["passive", "separator (plant: static → chosen)", '[data-t="sep"]', true],
  ["switch", "switch thumb (child: must not inherit)", ".switch__thumb"]];
const T = await serveTarget({ build }); const E = new Engine(engine); const b = await E.browser();
console.log(`# R-A driftprobe · ${build.split("/").pop()} · ${engine} ${E.version} · load ${load()}`);
let drift = 0;
for (const [scene, dir, sel, plant] of ROWS) {
  const ctx = await b.newContext(); const page = await ctx.newPage(); await page.addInitScript(INIT);
  await page.goto(`${T.url}?scene=${scene}&theme=light`, { timeout: 180000 }); await page.waitForFunction(() => window.__e?.ready === true, null, { timeout: 60000 });
  const r = await page.evaluate(([sel, dir, plant]) => {
    const e = document.querySelector(sel); if (plant) { e.classList.remove("engage-static"); e.classList.add("engage-chosen"); }
    const got = e ? getComputedStyle(e).getPropertyValue("--rung-class").trim() : "absent";
    const key = dir.split(" ")[0]; const decl = window.__e.decl;
    return { got, want: decl?.members?.[key] ?? "(no declaration)", child: dir.includes("child") };
  }, [sel, dir, !!plant]);
  await ctx.close();
  const ok = r.child ? r.got === "unclassed" || r.got === "" : r.got === r.want;
  if (!ok) drift++;
  console.log(`${ok ? "MATCH" : "DRIFT"}  ${dir.padEnd(40)} computed --rung-class "${r.got}" · declared ${r.child ? "(child: expects initial)" : `"${r.want}"`} · load ${load()}`);
}
console.log(`# ${drift} drift(s)`);
await E.close(); T.close();
