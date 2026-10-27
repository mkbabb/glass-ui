// vanish.mjs <W3.json…>: per file, R2's worst first leaving one-frame drop (from each cell's summary) and the narrowest ramp.
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(f, "utf8")); let worst = null, ramp = Infinity, rc = "";
  for (const c of j.cells) {
    const s = c.summary || ""; const m = s.match(/vanish worst one-frame drop beyond the closing edge ([0-9.]+) \(([^)]*)\)/);
    if (m && (!worst || +m[1] > worst.v)) worst = { v: +m[1], cell: c.cell, at: m[2], load: c.load };
    const r = s.match(/narrowest ramp across a glyph ([0-9.]+)/); if (r && +r[1] < ramp) { ramp = +r[1]; rc = c.cell; }
  }
  console.log(`${f.split("/out/")[1]}: vanish worst ${worst?.v} (${worst?.cell}, ${worst?.at}, load ${worst?.load}); narrowest ramp ${ramp} px (${rc})`);
}
