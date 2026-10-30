// farside.mjs (D2 pass 9, fresh critic of B′; diagnosis, enters no row). On `bp8i` (bp8 with one console line in arm(),
// scripts/bp8i-instrument.diff: per leaving unit, its heir if any, ds/de and `gated` = heir && de > 0, i.e. the handoff
// switched off by a unit arriving on the far side), which geometries reach the far-side case at all:
//   A · every harness scene variant that collapses or swaps, every sequence the witnesses drive;
//   B · every demo route with a GlassDock (the shell's docks too), each dock hovered open and left to collapse, and
//       every DockLayer tab of a layer group pressed.
// One browser per run, a fresh context per page, everything closed in finally.
//   node farside.mjs --build <bp8i dir> --adapter <adapter> [--engine chromium|webkit] [--part A|B|AB] [--json out]
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const engine = args.engine ?? "chromium";
const part = args.part ?? "AB";
const SEQ = {
  "first-expand": [[], [["expand"]]], "warm-collapse": [[["expand"]], [["collapse"]]],
  "warm-expand": [[["expand"], ["collapse"]], [["expand"]]], "content-add": [[["expand"]], [["setExtra", true]]],
  "content-remove": [[["expand"], ["setExtra", true]], [["setExtra", false]]], "lead-add": [[["expand"]], [["setLead", true]]],
  "lead-remove": [[["expand"], ["setLead", true]], [["setLead", false]]],
  "collapsed-content-add": [[], [["setExtra", true]]], "collapsed-lead-add": [[], [["setLead", true]]],
};
const SWAP = { "swap-long": [[], [["setFace", "long"]]], "swap-short": [[["setFace", "long"]], [["setFace", "short"]]] };
const SWAP3 = { "swap-mid": [[], [["setFace", "mid"]]], "swap-mid-long": [[["setFace", "mid"]], [["setFace", "long"]]] };
const SCENES = [];
for (const q of ["", "anchor=end", "wide=1", "neighbour=1", "anchor=end&wide=1", "wide=1&neighbour=1", "anchor=end&neighbour=1"])
  SCENES.push(["morph", q, SEQ]);
SCENES.push(["vmorph", "", SEQ], ["vmorph", "wide=1", SEQ], ["form", "", { "first-expand": SEQ["first-expand"], "warm-collapse": SEQ["warm-collapse"] }]);
SCENES.push(["swap", "", SWAP], ["swap", "three=1", { ...SWAP, ...SWAP3 }]);
const ROUTES = ["/dock/overview", "/dock/controls", "/dock/layers", "/dock/vertical", "/dock/dock-search", "/dock/sections",
  "/dock/overflow", "/dock/cta-receive", "/feedback/progress", "/display/dark-mode-toggle"];
const out = { engine, part, scenes: [], routes: [], load: [loadAvg()] };
const parse = (lines) => lines.map((l) => JSON.parse(l.slice(9)));
const target = await openTarget(args);
const browser = await launch(engine);
try {
  if (part.includes("A")) for (const [scene, q, seqs] of SCENES) for (const [name, [pre, go]] of Object.entries(seqs)) {
    let s; const lines = [];
    try {
      const query = q ? Object.fromEntries(q.split("&").map((kv) => kv.split("="))) : {};
      s = await openScene(browser, target, scene, { query });
      for (const [fn, ...a] of pre) { await s.page.evaluate(([f, a]) => window.__scene[f]?.(...a), [fn, a]); await waitRest(s.page); await s.page.waitForTimeout(400); }
      s.page.on("console", (m) => { const t = m.text(); if (t.startsWith("CRIT-ARM ")) lines.push(t); });
      await s.page.evaluate((go) => { for (const [fn, ...a] of go) window.__scene[fn]?.(...a); }, go);
      await waitRest(s.page); await s.page.waitForTimeout(600);
      const arms = parse(lines);
      out.scenes.push({ scene, q, seq: name, arms, heirs: arms.filter((a) => a.heir).length, gated: arms.filter((a) => a.gated).length });
      console.log(`A ${scene}${q ? "?" + q : ""} ${name}: ${arms.length} armed, heir ${arms.filter((a) => a.heir).length}, GATED ${arms.filter((a) => a.gated).length}${arms.filter((a) => a.gated).map((a) => ` [${a.t} heir ${a.heir} ds ${a.ds} de ${a.de} w ${a.w}]`).join("")}`);
    } catch (e) { console.log(`A ${scene}?${q} ${name}: ERROR ${String(e).slice(0, 160)}`); }
    finally { await s?.close().catch(() => {}); }
  }
  if (part.includes("B")) for (const route of ROUTES) for (const theme of [null]) {
    let ctx; const lines = [];
    try {
      ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
      const page = await ctx.newPage();
      page.on("console", (m) => { const t = m.text(); if (t.startsWith("CRIT-ARM ")) lines.push(t); });
      await page.goto(target.demoUrl(route), { waitUntil: "load" }); await page.waitForTimeout(2500);
      const n = await page.evaluate(() => document.querySelectorAll(".glass-dock").length);
      for (let i = 0; i < n; i++) {
        const box = await page.evaluate((i) => { const d = document.querySelectorAll(".glass-dock")[i]; d.scrollIntoView({ block: "center" }); const r = d.getBoundingClientRect(); return r.width > 0 ? [r.x + r.width / 2, r.y + r.height / 2] : null; }, i);
        if (!box) continue;
        await page.waitForTimeout(400);
        await page.mouse.move(box[0], box[1], { steps: 4 }); await page.waitForTimeout(1500);
        // DockLayer tabs inside this dock: press each, then back
        const tabs = await page.evaluate((i) => [...document.querySelectorAll(".glass-dock")[i].querySelectorAll("[role=tab], .dock-layer-trigger, [data-dock-layer]")].map((t) => { const r = t.getBoundingClientRect(); return r.width > 0 ? [r.x + r.width / 2, r.y + r.height / 2] : null; }).filter(Boolean).slice(0, 4), i);
        for (const t of tabs) { await page.mouse.click(t[0], t[1]); await page.waitForTimeout(900); }
        await page.mouse.move(4, 4, { steps: 4 }); await page.waitForTimeout(3500);
        await page.mouse.move(box[0], box[1], { steps: 4 }); await page.waitForTimeout(1500);
        await page.mouse.move(4, 4, { steps: 4 }); await page.waitForTimeout(3500);
      }
      const arms = parse(lines);
      out.routes.push({ route, docks: n, arms, heirs: arms.filter((a) => a.heir).length, gated: arms.filter((a) => a.gated).length });
      console.log(`B ${route}: ${n} dock(s), ${arms.length} armed, heir ${arms.filter((a) => a.heir).length}, GATED ${arms.filter((a) => a.gated).length}${arms.filter((a) => a.gated).map((a) => ` [${a.dk} ${a.t} heir ${a.heir} ds ${a.ds} de ${a.de} w ${a.w}]`).join("")}`);
    } catch (e) { console.log(`B ${route}: ERROR ${String(e).slice(0, 160)}`); }
    finally { await ctx?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
out.load.push(loadAvg());
if (args.json) fs.writeFileSync(args.json, JSON.stringify(out, null, 1));
console.log(`load ${out.load.join(" → ")}`);
