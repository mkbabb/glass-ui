#!/usr/bin/env node
// FV5-demo-probe.mjs · D3 pass 6, floor v5: R-12's plant (REGISTRY P5-2.2), gated. The demo's dock search, the one
// `.glass-menu-row` composer reka does not drive, must highlight on pointer movement like every library composer, with
// one register: the pointer on a row makes that row `[data-highlighted]` and the ONLY result row painting a fill, in
// both themes. Floor v4's hover leg (row 1 at `--fill-hover` beside row 0 at the state rung) reds it.
// The reading is pass 5's crit-demo-probe.mjs SEARCH leg (open the search, type "e", pointer on row 1, then on row 0),
// with a verdict per theme. Headless shell, no launch arguments; one browser per engine run, a new context per theme;
// every page, context, server and browser closed in a finally. --shots writes one frame per theme (pointer on row 1).
//   node FV5-demo-probe.mjs <demo-dist> --label <name> [--engines chromium,webkit] [--shots <dir>] [--out <json>]
// Exit 0 when every read theme PASSes, 1 otherwise.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { cli, list, serve, playwright, VIEW } from "../harness/lib.mjs";

const a = cli({ label: { type: "string" }, engines: { type: "string" }, shots: { type: "string" }, out: { type: "string" } });
const dist = path.resolve(a._[0] || ""), label = a.label || "demo";
if (!fs.existsSync(path.join(dist, "index.html"))) { console.error(`no demo build at ${dist}`); process.exit(2); }
const load = () => os.loadavg().map((x) => x.toFixed(1)).join(" ");
const doc = { label, dist, when: new Date().toISOString(), load: load(), rows: [] };
const shotsDir = a.shots && path.resolve(a.shots); if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });
const painted = (bg) => !/^rgba\(0, 0, 0, 0\)$|^transparent$/.test(bg) && !/\/ 0\)$/.test(bg);
let fails = 0;

const pw = await playwright();
for (const engine of list(a.engines, ["chromium"])) {
  const browser = await pw[engine].launch({ headless: true });
  const srv = await serve(dist);
  try {
    for (const theme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme });
      const rec = { engine, theme };
      try {
        const page = await ctx.newPage();
        await page.goto(`${srv.url}?capture=/dock/dock-search&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
        await page.waitForSelector("html[data-capture-ready]", { timeout: 60000 }).catch(() => {});
        await page.waitForTimeout(1200);
        const trig = page.locator(".dock-search-trigger").first();
        if (await trig.count()) { await trig.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1200); }
        const field = page.locator(".input-bar-field").first();
        await field.click({ timeout: 5000 });
        await field.type("e", { delay: 60 }); await page.waitForTimeout(800);
        rec.rows = await page.locator(".dock-search-result").count();
        if (rec.rows < 3) throw new Error(`only ${rec.rows} result rows`);
        const read = () => page.evaluate(() => [...document.querySelectorAll(".dock-search-result")].slice(0, 3).map((e, i) => ({ i,
          hl: e.hasAttribute("data-highlighted"), hover: e.matches(":hover"), bg: getComputedStyle(e).backgroundColor })));
        const at = async (i) => { const b = await page.locator(".dock-search-result").nth(i).boundingBox();
          await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 6 }); await page.waitForTimeout(700); return read(); };
        const judge = (rows, i) => { const fill = rows.filter((r) => painted(r.bg)).map((r) => r.i), hl = rows.filter((r) => r.hl).map((r) => r.i);
          return { ok: rows[i].hover && rows[i].hl && hl.length === 1 && fill.length === 1 && fill[0] === i, hl, fill, bg: rows[i].bg }; };
        rec.row1 = await at(1); rec.v1 = judge(rec.row1, 1);
        if (shotsDir) {
          const ul = await page.locator(".dock-search-results").first().boundingBox();
          const clip = { x: Math.max(0, ul.x - 8), y: Math.max(0, ul.y - 8), width: Math.min(ul.width + 16, 600), height: Math.min(ul.height + 16, 260) };
          rec.frame = path.join(shotsDir, `fv5probe-${engine}-${theme}-dock-search-pointer-row1-${label}.png`);
          fs.writeFileSync(rec.frame, await page.screenshot({ clip }));
        }
        rec.row0 = await at(0); rec.v0 = judge(rec.row0, 0);
        rec.pass = rec.v1.ok && rec.v0.ok;
      } catch (e) { rec.pass = false; rec.error = String(e).split("\n")[0].slice(0, 200); }
      finally { await ctx.close(); }
      if (!rec.pass) fails++;
      doc.rows.push(rec);
      const f = (v) => v ? `highlighted [${v.hl}] painting [${v.fill}] bg ${v.bg}` : "—";
      console.log(`DEMO ${rec.pass ? "PASS" : "FAIL"} ${engine} ${theme} ${label}: rows ${rec.rows ?? "—"} · pointer on row 1: ${f(rec.v1)} · pointer on row 0: ${f(rec.v0)}${rec.error ? ` · ERROR ${rec.error}` : ""}`);
    }
  } finally { srv.close(); await browser.close(); }
}
doc.loadEnd = load();
if (a.out) fs.writeFileSync(path.resolve(a.out), JSON.stringify(doc, null, 1));
console.log(`DEMO-PROBE ${label} · ${fails ? `FAIL (${fails} of ${doc.rows.length} theme rows)` : `PASS (${doc.rows.length} theme rows)`} · load ${doc.load} → ${doc.loadEnd}`);
process.exit(fails ? 1 : 0);
