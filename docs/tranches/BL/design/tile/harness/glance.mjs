#!/usr/bin/env node
// glance.mjs · owner-glance captures of the two consumer tile sites under the shape candidates.
//   node glance.mjs --build <dir> --dest <dir> [--engine chromium|webkit]
// For the preset and specimen scenes, in light and dark: the library at the build (shape=stadium, the bare
// transcription), the consumer as it ships (verbatim), and the two candidates the portfolio names, applied to
// the bare tiles by the scene page's owner-glance rule only: rungHalf (the corner is half the item's control
// rung, D4-A arm A1) and field (--radius-field, the card rung). Writes one PNG per cell, one contact sheet per
// scene and mode, and glance.json with each cell's measured box and used corner. Not a witness.
import fs from "node:fs";
import path from "node:path";
import { openTarget, openPage, closeBrowsers, parseArgs, PNG, engineVersion } from "./lib.mjs";

const a = parseArgs();
if (!a.build || !a.dest) { console.error("usage: node glance.mjs --build <dir> --dest <dir> [--engine chromium|webkit]"); process.exit(2); }
const engine = a.engine ?? "chromium";
const target = await openTarget(a);
fs.mkdirSync(a.dest, { recursive: true });
const CELLS = [["head", "", "stadium"], ["consumer", "-verbatim", "stadium"], ["rungHalf", "", "rungHalf"], ["field", "", "field"]];
const out = { engine: await engineVersion(engine), build: target.meta, cells: [] };
for (const scene of ["preset", "specimen"]) for (const mode of ["light", "dark"]) {
  const shots = [];
  for (const [name, suffix, shape] of CELLS) {
    const P = await openPage(target, engine, scene + suffix, { mode, query: { shape } });
    await P.page.mouse.move(2, 2);
    await P.page.waitForTimeout(300);
    const m = await P.page.evaluate(() => {
      const its = window.__th.items();
      const c = window.__th.corner(its[0]);
      const r = document.querySelector("[data-scene]").getBoundingClientRect();
      return { w: c.w, h: c.h, computed: c.computed, used: c.used, n: its.length, clip: { x: Math.floor(r.x), y: Math.floor(r.y), width: Math.ceil(r.width), height: Math.min(Math.ceil(r.height), 420) } };
    });
    const file = path.join(a.dest, `${scene}-${mode}-${name}.png`);
    const buf = await P.page.screenshot({ clip: m.clip, animations: "disabled", caret: "hide" });
    fs.writeFileSync(file, buf);
    shots.push({ name, png: PNG.sync.read(buf) });
    out.cells.push({ scene, mode, cell: name, file, box: `${m.w.toFixed(1)}×${m.h.toFixed(1)}`, computed: m.computed, used: +m.used.toFixed(2), ratio: +(m.used / (m.h / 2)).toFixed(2), modeOk: P.modeOk });
    console.log(`${scene} ${mode} ${name.padEnd(8)} ${m.w.toFixed(1)}×${m.h.toFixed(1)} ${m.computed} → used ${m.used.toFixed(2)} px (÷h/2 ${(m.used / (m.h / 2)).toFixed(2)}) ${P.modeOk ? "" : "MODE NOT APPLIED"} → ${file}`);
    await P.close();
  }
  // contact sheet: the four cells stacked, 8 device px apart, on a mid-grey gutter
  const W = Math.max(...shots.map((s) => s.png.width)), G = 16, H = shots.reduce((t, s) => t + s.png.height + G, G);
  const sheet = new PNG({ width: W + 2 * G, height: H });
  sheet.data.fill(128);
  let y = G;
  for (const s of shots) { PNG.bitblt(s.png, sheet, 0, 0, s.png.width, s.png.height, G, y); y += s.png.height + G; }
  const f = path.join(a.dest, `${scene}-${mode}-sheet.png`);
  fs.writeFileSync(f, PNG.sync.write(sheet));
  console.log(`sheet ${f} (top to bottom: ${shots.map((s) => s.name).join(", ")})`);
}
fs.writeFileSync(path.join(a.dest, "glance.json"), JSON.stringify(out, null, 1));
await closeBrowsers(); await target.close();
