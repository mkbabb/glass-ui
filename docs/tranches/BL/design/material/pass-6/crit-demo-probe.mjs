#!/usr/bin/env node
// crit-demo-probe.mjs · D3 pass 6, the critic: R-12 beyond the seats' probe. The seats' FV5-demo-probe.mjs reads
// pointer on row 1, then row 0. This probe adds the legs a single register must also survive:
//   K  pointer resting on row 1, then the keyboard (ArrowDown ×1): the highlight moves to row 2 and row 2 is the ONLY
//      row painting; the resting pointer must not keep a second fill on row 1 (the deleted hover leg's job);
//   L  the pointer leaves the list (moves to the page corner): exactly one row stays highlighted and painting;
//   (the highlighted row's label ink and fill are printed as computed colours; their contrast is M-2's, not this probe's)
//   F  one frame per theme with the pointer on row 1 and the keyboard's highlight moved to row 2 (O-87 judgement).
// Headless shell, no launch arguments; one browser per run, a new context per theme; everything closed in a finally.
//   node crit-demo-probe.mjs <demo-dist> --label <name> [--engines chromium] [--shots <dir>] [--out <json>]
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { cli, list, serve, playwright, VIEW } from "../harness/lib.mjs";

const a = cli({ label: { type: "string" }, engines: { type: "string" }, shots: { type: "string" }, out: { type: "string" } });
const dist = path.resolve(a._[0] || ""), label = a.label || "demo";
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
        await field.click({ timeout: 5000 }); await field.type("e", { delay: 60 }); await page.waitForTimeout(800);
        const read = () => page.evaluate(() => [...document.querySelectorAll(".dock-search-result")].slice(0, 4).map((e, i) => ({ i,
          hl: e.hasAttribute("data-highlighted"), hover: e.matches(":hover"), bg: getComputedStyle(e).backgroundColor,
          ink: getComputedStyle(e.querySelector(".dock-search-result-label") || e).color })));
        const judge = (rows, want) => { const fill = rows.filter((r) => painted(r.bg)).map((r) => r.i), hl = rows.filter((r) => r.hl).map((r) => r.i);
          return { ok: hl.length === 1 && hl[0] === want && fill.length === 1 && fill[0] === want, hl, fill, bg: rows[want]?.bg, ink: rows[want]?.ink }; };
        const b1 = await page.locator(".dock-search-result").nth(1).boundingBox();
        await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 6 }); await page.waitForTimeout(700);
        rec.P = judge(await read(), 1);
        await page.keyboard.press("ArrowDown"); await page.waitForTimeout(700);
        rec.K = judge(await read(), 2); rec.K.pointerStillOn1 = (await read())[1].hover;
        if (shotsDir) {
          const ul = await page.locator(".dock-search-results").first().boundingBox();
          const clip = { x: Math.max(0, ul.x - 8), y: Math.max(0, ul.y - 8), width: Math.min(ul.width + 16, 600), height: Math.min(ul.height + 16, 260) };
          rec.frame = path.join(shotsDir, `crit-${engine}-${theme}-dock-search-pointer1-key2-${label}.png`);
          fs.writeFileSync(rec.frame, await page.screenshot({ clip }));
        }
        await page.mouse.move(VIEW.width - 2, VIEW.height - 2, { steps: 6 }); await page.waitForTimeout(700);
        const rl = await read(); const hl = rl.filter((r) => r.hl).map((r) => r.i), fill = rl.filter((r) => painted(r.bg)).map((r) => r.i);
        rec.L = { ok: hl.length === 1 && fill.length === 1 && hl[0] === fill[0], hl, fill };
        rec.pass = rec.P.ok && rec.K.ok && rec.L.ok;
      } catch (e) { rec.pass = false; rec.error = String(e).split("\n")[0].slice(0, 200); }
      finally { await ctx.close(); }
      if (!rec.pass) fails++;
      doc.rows.push(rec);
      const s = (v) => v ? `${v.ok ? "ok" : "✗"} highlighted [${v.hl}] painting [${v.fill}]` : "—";
      console.log(`CRIT ${rec.pass ? "PASS" : "FAIL"} ${engine} ${theme} ${label}: P pointer→row1 ${s(rec.P)} · K ArrowDown with pointer on row 1 (still :hover ${rec.K?.pointerStillOn1}) ${s(rec.K)} bg ${rec.K?.bg} ink ${rec.K?.ink} · L pointer leaves ${s(rec.L)}${rec.error ? " · ERROR " + rec.error : ""}`);
    }
  } finally { srv.close(); await browser.close(); }
}
doc.loadEnd = load();
if (a.out) fs.writeFileSync(path.resolve(a.out), JSON.stringify(doc, null, 1));
console.log(`CRIT-DEMO ${label} · ${fails ? `FAIL (${fails} of ${doc.rows.length})` : `PASS (${doc.rows.length})`} · load ${doc.load} → ${doc.loadEnd}`);
process.exit(fails ? 1 : 0);
