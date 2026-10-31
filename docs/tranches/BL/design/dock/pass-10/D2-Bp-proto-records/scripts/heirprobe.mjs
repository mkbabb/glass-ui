// heirprobe.mjs (D2 pass 10, builder; diagnosis, enters no row): every arm() that finds a unit tied on the leaving unit's place, on an instrumented
// build: is the tied unit coming in (enter/joined) or hidden, is it gated by the far side, over the scene sequences including vmorph lead-remove, and
// the empty-frame read on the same run. One browser per run, a fresh context per sequence.
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs(); const engine = args.engine ?? "chromium";
const SEQ = {
  "first-expand": ["morph", {}, [], [["expand"]]], "warm-collapse": ["morph", {}, [["expand"]], [["collapse"]]], "warm-expand": ["morph", {}, [["expand"], ["collapse"]], [["expand"]]],
  "swap-long": ["swap", {}, [], [["setFace", "long"]]], "swap-short": ["swap", {}, [["setFace", "long"]], [["setFace", "short"]]], "content-add": ["morph", {}, [["expand"]], [["setExtra", true]]],
  "lead-add": ["morph", {}, [["expand"]], [["setLead", true]]], "lead-remove": ["morph", {}, [["expand"], ["setLead", true]], [["setLead", false]]],
  "vlead-add": ["vmorph", {}, [["expand"]], [["setLead", true]]], "vlead-remove": ["vmorph", {}, [["expand"], ["setLead", true]], [["setLead", false]]], "vlead-remove-wide": ["vmorph", { wide: "1" }, [["expand"], ["setLead", true]], [["setLead", false]]],
  "vfirst-expand": ["vmorph", {}, [], [["expand"]]], "wide-first-expand": ["morph", { wide: "1" }, [], [["expand"]]], "end-first-expand": ["morph", { anchor: "end" }, [], [["expand"]]],
  "three-long": ["swap", { three: "1" }, [], [["setFace", "long"]]], "three-mid": ["swap", { three: "1" }, [["setFace", "long"]], [["setFace", "mid"]]],
};
const target = await openTarget(args); const browser = await launch(engine); const out = [];
try { for (const [name, [scene, query, pre, go]] of Object.entries(SEQ)) { let s; try {
  s = await openScene(browser, target, scene, { query, theme: args.theme ?? null });
  for (const [fn, ...a] of pre) { await s.page.evaluate(([f, a]) => window.__scene[f](...a), [fn, a]); await waitRest(s.page); await s.page.waitForTimeout(300); }
  await s.page.evaluate(() => { window.__dockTrace = []; });
  await s.page.evaluate((go) => { for (const [fn, ...a] of go) window.__scene[fn](...a); }, go);
  await s.page.waitForTimeout(150); await waitRest(s.page, { quiet: 400, cap: 5000 });
  const arms = await s.page.evaluate(() => window.__dockTrace.filter((e) => e.k === "arm"));
  const tied = arms.filter((a) => a.tied);
  out.push({ seq: name, armed: arms.length, tied });
  console.log(`${name.padEnd(20)} armed ${String(arms.length).padStart(2)} tied ${tied.length}: ${tied.map((a) => `${a.m}→${a.tied} ${a.enter ? "enter" : a.joined ? "joined" : "HIDDEN"} ${a.gated ? "gated(de " + a.de + ")" : "taken"}`).join("; ")} [load ${loadAvg()}]`);
} catch (e) { console.log(name, "ERROR", String(e).split("\n")[0].slice(0, 160)); } finally { await s?.close().catch(() => {}); } } }
finally { await browser.close().catch(() => {}); }
if (args.json) fs.writeFileSync(args.json, JSON.stringify(out));
process.exit(0);
