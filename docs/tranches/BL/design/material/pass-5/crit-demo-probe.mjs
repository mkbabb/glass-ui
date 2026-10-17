#!/usr/bin/env node
// crit-demo-probe.mjs · D3 pass 5, the critic: the two demo-only readings no seat measured in paint.
//   SEARCH  the dock-search story's result rows (R-6's one composer that reka does not drive; FLOOR-V4 §2.1 "owed to the
//           critic"): open the search, type, then (a) the pointer on a row that is NOT highlighted and (b) the pointer on
//           the highlighted row. Computed background of each, plus whether the hovered row carries [data-highlighted].
//   GLEAM   the glass-material story's pointer gleam (P4-5: "the edge gleam follows the cursor", judged under O-87): per
//           plate, a rest frame (pointer parked off the plate) and a hover frame (pointer at the plate's upper-left
//           quarter), the per-pixel OKLab ΔL between them over the plate box, and the ::before opacity in each.
// Chromium (headless shell, the harness's CHROMIUM_ARGS), one browser per run, a new context per theme; every page,
// context and server closed in a finally. Frames written only for the cited pairs (one per theme per reading).
//   node crit-demo-probe.mjs <demo-dist> --label <name> [--engines chromium] [--shots <dir>] [--out <json>]
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { PNG, cli, list, serve, playwright, oklab, CHROMIUM_ARGS, VIEW } from "../harness/lib.mjs";

const a = cli({ label: { type: "string" }, engines: { type: "string" }, shots: { type: "string" }, out: { type: "string" } });
const dist = path.resolve(a._[0] || ""), label = a.label || "demo";
if (!fs.existsSync(path.join(dist, "index.html"))) { console.error(`no demo build at ${dist}`); process.exit(2); }
const load = () => os.loadavg().map((x) => x.toFixed(1)).join(" ");
const doc = { label, dist, when: new Date().toISOString(), load: load(), search: [], gleam: [] };
const shotsDir = a.shots && path.resolve(a.shots); if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });

function writePair(file, left, right) {
  const w = left.width + right.width + 8, h = Math.max(left.height, right.height), out = new PNG({ width: w, height: h });
  out.data.fill(255);
  for (const [img, x0] of [[left, 0], [right, left.width + 8]]) for (let y = 0; y < img.height; y++) for (let x = 0; x < img.width; x++) {
    const s = (y * img.width + x) * 4, d = (y * w + x + x0) * 4; for (let k = 0; k < 4; k++) out.data[d + k] = img.data[s + k]; }
  const buf = PNG.sync.write(out); fs.writeFileSync(file, buf);
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
}
function dL(p0, p1) {
  let max = 0, sum = 0, n = 0, over = 0;
  for (let i = 0; i < p0.data.length; i += 4) {
    const L0 = oklab([p0.data[i], p0.data[i + 1], p0.data[i + 2]])[0], L1 = oklab([p1.data[i], p1.data[i + 1], p1.data[i + 2]])[0], d = L1 - L0;
    if (Math.abs(d) > Math.abs(max)) max = d; sum += d; n++; if (Math.abs(d) > 0.01) over++;
  }
  return { maxDL: +max.toFixed(4), meanDL: +(sum / n).toFixed(5), areaOver001: +(over / n).toFixed(4) };
}

const pw = await playwright();
for (const engine of list(a.engines, ["chromium"])) {
  const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
  const srv = await serve(dist);
  try {
    for (const theme of ["light", "dark"]) {
      // ── SEARCH ────────────────────────────────────────────────────────────────────
      let ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme });
      try {
        const page = await ctx.newPage();
        await page.goto(`${srv.url}?capture=/dock/dock-search&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
        await page.waitForSelector("html[data-capture-ready]", { timeout: 60000 }).catch(() => {});
        await page.waitForTimeout(1200);
        const trig = page.locator(".dock-search-trigger").first();
        if (await trig.count()) { await trig.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1200); }
        const field = page.locator(".input-bar-field").first();
        let rows = 0, rec = { engine, theme, opened: false };
        if (await field.count()) {
          await field.click({ timeout: 5000 }).catch(() => {});
          await field.type("e", { delay: 60 }); await page.waitForTimeout(800);
          rows = await page.locator(".dock-search-result").count();
          rec.opened = rows > 0; rec.rows = rows;
        }
        if (rows >= 2) {
          const read = () => page.evaluate(() => [...document.querySelectorAll(".dock-search-result")].slice(0, 3).map((e, i) => ({ i,
            highlighted: e.hasAttribute("data-highlighted"), hover: e.matches(":hover"), bg: getComputedStyle(e).backgroundColor, translate: getComputedStyle(e).translate })));
          const box = async (i) => page.locator(".dock-search-result").nth(i).boundingBox();
          const b1 = await box(1), b0 = await box(0);
          await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 6 }); await page.waitForTimeout(700);
          rec.pointerOnRow1 = await read();
          if (shotsDir) {
            const ul = await page.locator(".dock-search-results").first().boundingBox();
            const clip = { x: Math.max(0, ul.x - 8), y: Math.max(0, ul.y - 8), width: Math.min(ul.width + 16, 600), height: Math.min(ul.height + 16, 260) };
            rec.frame = path.join(shotsDir, `crit-${engine}-${theme}-dock-search-pointer-row1-${label}.png`);
            fs.writeFileSync(rec.frame, await page.screenshot({ clip }));
          }
          await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2, { steps: 6 }); await page.waitForTimeout(700);
          rec.pointerOnRow0 = await read();
        }
        doc.search.push(rec);
        const r1 = rec.pointerOnRow1?.[1], r0 = rec.pointerOnRow0?.[0];
        console.log(`SEARCH ${engine} ${theme} ${label}: rows ${rows} · pointer on row 1 (hl ${r1?.highlighted}, hover ${r1?.hover}) bg ${r1?.bg} · row 0 (hl ${rec.pointerOnRow1?.[0]?.highlighted}) bg ${rec.pointerOnRow1?.[0]?.bg} · pointer on row 0 (hl ${r0?.highlighted}) bg ${r0?.bg}`);
      } catch (e) { console.log(`SEARCH ${engine} ${theme} ${label}: ERROR ${String(e).split("\n")[0].slice(0, 200)}`); }
      finally { await ctx.close(); }

      // ── GLEAM ─────────────────────────────────────────────────────────────────────
      ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme });
      try {
        const page = await ctx.newPage();
        await page.goto(`${srv.url}?capture=/substrates/glass-material&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
        await page.waitForSelector("html[data-capture-ready]", { timeout: 60000 }).catch(() => {});
        await page.waitForTimeout(1500);
        const plates = await page.evaluate(() => [...document.querySelectorAll(".glass-card, .glass-resting, .glass-floating, .glass-quiet, .glass-wash, .glass-overlay")]
          .map((e, i) => { const r = e.getBoundingClientRect(); return { i, cls: [...e.classList].filter((c) => c.startsWith("glass-")).join(" "), r: [r.left, r.top, r.width, r.height] }; })
          .filter((p) => p.r[2] >= 140 && p.r[3] >= 90 && p.r[1] >= 0 && p.r[1] + p.r[3] <= innerHeight && p.r[0] >= 0 && p.r[0] + p.r[2] <= innerWidth).slice(0, 3));
        for (const [k, p] of plates.entries()) {
          const clip = { x: Math.floor(p.r[0]), y: Math.floor(p.r[1]), width: Math.floor(p.r[2]), height: Math.floor(p.r[3]) };
          const op = () => page.evaluate((i) => { const e = document.querySelectorAll(".glass-card, .glass-resting, .glass-floating, .glass-quiet, .glass-wash, .glass-overlay")[i];
            const s = getComputedStyle(e, "::before"); return { opacity: s.opacity, blend: s.mixBlendMode, bg: s.backgroundImage.slice(0, 90) }; }, p.i);
          await page.mouse.move(2, 2, { steps: 4 }); await page.waitForTimeout(900);
          const rest = PNG.sync.read(await page.screenshot({ clip })), restOp = await op();
          await page.mouse.move(clip.x + clip.width * 0.25, clip.y + clip.height * 0.25, { steps: 8 }); await page.waitForTimeout(900);
          const hov = PNG.sync.read(await page.screenshot({ clip })), hovOp = await op();
          const d = dL(rest, hov), rec = { engine, theme, plate: p.cls, rect: clip, restOpacity: restOp.opacity, hoverOpacity: hovOp.opacity, blend: hovOp.blend, ...d };
          if (shotsDir && k === 0) { rec.frame = path.join(shotsDir, `crit-${engine}-${theme}-gleam-rest-vs-hover-${label}.png`); rec.sha = writePair(rec.frame, rest, hov); }
          doc.gleam.push(rec);
          console.log(`GLEAM ${engine} ${theme} ${label}: ${p.cls} ${clip.width}x${clip.height} · ::before opacity rest ${restOp.opacity} → hover ${hovOp.opacity} (${hovOp.blend}) · ΔL max ${d.maxDL} mean ${d.meanDL} · area |ΔL|>0.01 ${(d.areaOver001 * 100).toFixed(2)}%`);
        }
        if (!plates.length) console.log(`GLEAM ${engine} ${theme} ${label}: no plate ≥ 140x90 in view`);
      } catch (e) { console.log(`GLEAM ${engine} ${theme} ${label}: ERROR ${String(e).split("\n")[0].slice(0, 200)}`); }
      finally { await ctx.close(); }
    }
  } finally { srv.close(); await browser.close(); }
}
doc.loadEnd = load();
if (a.out) fs.writeFileSync(path.resolve(a.out), JSON.stringify(doc, null, 1));
console.log(`RESULT ${label} · load ${doc.load} → ${doc.loadEnd}`);
