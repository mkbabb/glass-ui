// vmsum.mjs <vm dir>: vmorph collapse in paint, per column and run: spliceRow (frames, first pair, gap, offset), sliver, stub,
// the pair's painted spans against their boxes on the first splice frame, load. A reading; enters no row.
import fs from "node:fs";
import path from "node:path";
const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  for (const r of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))) {
    if (r.error) { console.log(`${r.tag} r${r.run} ERROR ${r.error} [load ${r.load}]`); continue; }
    const s = r.splice, p = (r.pairAtSplice ?? []).map((q) => `${q.id} box ${q.box.map((x) => x.toFixed(2)).join("-")} paints ${q.paint.map((x) => x.toFixed(2)).join("-")} o ${q.o}`).join("; ");
    console.log(`${r.tag} r${r.run}: splice ${s.n}${s.first ? ` (${s.first.units.join("|")} gap ${s.first.gapPx} px, adv ${s.first.advPx}, at ${s.first.atMs} ms)` : ""}, sliver ${s.sliver}, stub ${r.stub ? (r.stub.ok ? "0" : r.stub.why) : "-"}; marker frame ${r.markerFrame}; ${p} [load ${r.load}-${r.loadEnd}]`);
  }
}
