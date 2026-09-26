#!/usr/bin/env node
// D4-G block test · question 2 · the content-visibility reveal, read in PAINT (the frame ledger's open question).
//   node cv-paint.mjs --build <g-glide build> --out <dir> [--engines chromium,webkit] --json <file>
// K2 with the Back section's tiles never rendered before reveal (a 1600 px spacer ahead of it) and 200 px of room
// under the group, the selected tile (ease-out-back) revealed by scrollIntoView({ block: "center" }). After the
// reveal, the page freezes the main thread for 900 ms in the task that follows frame F's paint (no geometry read
// before the freeze), so the compositor holds frame F's pixels on screen while Playwright's screencast records
// them. F = 0, 1, 2 are separate page loads. The recording is decoded (ffmpeg → PNG) and one pixel column is read
// per frame (the edge ledger below). A planted control pins the body's height at 126 px (the skipped tile's height in Playwright WebKit, so about 26 px
// taller than the revealed tile) and must show the row.
// Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { browser, closeBrowsers, parseArgs, serve, acquireLock, load, ENGINE_LABEL, PNG } from "../../harness/lib.mjs";

const a = parseArgs();
const ENGINES = (typeof a.engines === "string" ? a.engines : "chromium,webkit").split(",");
const out = path.resolve(a.out); fs.mkdirSync(out, { recursive: true });
const srv = await serve(path.join(path.resolve(a.build), "dist"));
const lock = await acquireLock("D4-G cv-paint");
const run = { loadStart: load(), cells: [] };
const VP = { width: 700, height: 700 };

const INIT = () => {
  const st = document.createElement("style");
  st.textContent = ".catalogue-section:first-of-type { margin-bottom: 1600px; } .specimen-grid-group { padding-bottom: 200px !important; }";
  const put = () => { if (document.head) { document.head.append(st); return true; } return false; };
  if (!put()) new MutationObserver((_, o) => { if (put()) o.disconnect(); }).observe(document, { childList: true, subtree: true });
};

async function cell(engine, freezeAt, plant) {
  const vdir = path.join(out, `${engine}-F${freezeAt}${plant ? "-plant" : ""}`);
  fs.rmSync(vdir, { recursive: true, force: true });
  const b = await browser(engine);
  const ctx = await b.newContext({ viewport: VP, deviceScaleFactor: 1, recordVideo: { dir: vdir, size: VP } });
  const page = await ctx.newPage();
  await page.addInitScript(`(${INIT.toString()})()`);
  await page.goto(`${srv.url}/index.html?scene=specimen-migrated&sel=7`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__tile && window.__tile.ready === true, null, { timeout: 30000 });
  await page.addStyleTag({ content: ".tx-sentinel{display:none!important}" });
  await page.mouse.move(1, 1);
  await page.waitForTimeout(800);
  const pre = await page.evaluate(() => ({ h: document.querySelector('[data-item][data-state="on"]').getBoundingClientRect().height }));
  // the plant is a stylesheet rule: the writer's inline style (Vue patches each property) would overwrite an inline one
  if (plant) await page.addStyleTag({ content: "[data-selection-body] { height: 126px !important; }" });
  await page.evaluate((F) => new Promise((resolve) => {
    const t = document.querySelector('[data-item][data-state="on"]');
    t.scrollIntoView({ block: "center" });
    let f = 0;
    const step = () => requestAnimationFrame(() => { const c = new MessageChannel(); c.port1.onmessage = () => {
      if (f === F) { const end = performance.now() + 900; while (performance.now() < end) {} resolve(); return; }
      f++; step(); }; c.port2.postMessage(0); });
    step();
  }), freezeAt);
  await page.waitForTimeout(400);
  const settled = await page.evaluate(() => {
    const t = document.querySelector('[data-item][data-state="on"]').getBoundingClientRect();
    const b = document.querySelector("[data-selection-body]").getBoundingClientRect();
    return { x: t.x + t.width / 2, bottom: t.bottom, tileH: t.height, bodyH: b.height };
  });
  const video = page.video();
  await ctx.close();
  const webm = await video.path();
  const fdir = path.join(vdir, "frames"); fs.mkdirSync(fdir, { recursive: true });
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", webm, "-vf", "fps=30", path.join(fdir, "%04d.png")]);
  // THE EDGE LEDGER. Per video frame, along the column 80 px right of the tile's centre (clear of the name and the
  // ball), the runs of dark rows (luma < 110: the body's 2 px edge ink; the tile's own seam is light) between 60 px
  // above the settled tile and 60 px below it. The settled frame shows two runs, the body's top and bottom edges at
  // the tile's top and bottom. A body taller than its tile shows its bottom run below the settled bottom.
  const col = Math.round(settled.x + 80), y0 = Math.round(settled.bottom - settled.tileH - 60), y1 = Math.round(settled.bottom + 60);
  const ledger = [];
  for (const f of fs.readdirSync(fdir).sort()) {
    const png = PNG.sync.read(fs.readFileSync(path.join(fdir, f)));
    const runs = []; let open = null;
    for (let y = y0; y <= y1 && y < png.height; y++) {
      const i = (y * png.width + col) * 4, L = 0.2126 * png.data[i] + 0.7152 * png.data[i + 1] + 0.0722 * png.data[i + 2];
      if (L < 110) { if (open === null) open = y; } else if (open !== null) { runs.push([open, y - 1]); open = null; }
    }
    if (open !== null) runs.push([open, y1]);
    ledger.push({ f, runs });
  }
  const bottom = Math.round(settled.bottom);
  // a frame is "taller" when its last dark run starts ≥ 4 px below the settled bottom edge while a run also sits at
  // the settled top edge (the body on this tile, not another tile scrolled into the column)
  const top = Math.round(settled.bottom - settled.tileH);
  const hits = ledger.filter((l) => l.runs.some((r) => Math.abs(r[0] - top) <= 3) && l.runs.some((r) => r[0] >= bottom + 4 && r[0] <= bottom + 40)).map((l) => l.f);
  const distinct = [...new Set(ledger.map((l) => JSON.stringify(l.runs.map((r) => r.map((v) => v - top)))))];
  const frames = fs.readdirSync(fdir).length;
  fs.rmSync(fdir, { recursive: true, force: true });
  const row = { engine: ENGINE_LABEL[engine], freezeAt, plant, tileHBefore: +pre.h.toFixed(2), settled, column: col, videoFrames: frames, framesBodyTaller: hits.length, firstHit: hits[0] ?? null,
    edgeRunPatterns: distinct.map((d) => ({ runsRelativeToTileTop: JSON.parse(d), frames: ledger.filter((l) => JSON.stringify(l.runs.map((r) => r.map((v) => v - top))) === d).length })), video: webm, load: load() };
  run.cells.push(row);
  console.log(`${row.engine.padEnd(17)} freeze after frame ${freezeAt}${plant ? " PLANT (body pinned 126 px)" : ""}: tile h ${row.tileHBefore} → ${settled.tileH.toFixed(2)}, body settles ${settled.bodyH.toFixed(2)}; ${hits.length}/${frames} video frames paint the body taller than its tile · edge-run patterns (rows relative to the tile top, × frames): ${row.edgeRunPatterns.map((p) => JSON.stringify(p.runsRelativeToTileTop) + "×" + p.frames).join(" ")} · ${webm} · load ${row.load}`);
}

for (const engine of ENGINES) {
  await cell(engine, 1, true);
  for (const F of [0, 1, 2]) await cell(engine, F, false);
}
run.loadEnd = load();
fs.writeFileSync(a.json, JSON.stringify(run, null, 1));
await closeBrowsers(); await srv.close(); lock.release();
