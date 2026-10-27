// sum.mjs: one compact line per W3/FM cell of an iteration: verdict, failed checks, the tightest leaving fade against its
// bound, the worst vanish, blank, splice/sliver, and FM's hole run.   node sum.mjs <W3.json|FM.json>…
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  if (!fs.existsSync(f)) { console.log("missing", f); continue; }
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const c of j.cells ?? j.results ?? []) {
    const s = c.summary ?? "";
    const g = (re) => (s.match(re) ?? [])[1] ?? "";
    const verdict = c.ownerBlocked ? "OB" : c.unmeasured ? "UM" : c.pass ? "P" : "F";
    console.log(`${verdict} ${c.cell} ${c.failed?.length ? "[" + c.failed.join(",") + "]" : ""} | fade ${g(/over ([\d.]+ ms) \/ \d+ frame\(s\) \(fade bound ≥ 3 frames and ≥ ([\d.]+ ms)/)}${s.match(/fade bound ≥ 3 frames and ≥ ([\d.]+) ms/) ? "≥" + s.match(/fade bound ≥ 3 frames and ≥ ([\d.]+) ms/)[1] : ""} | vanish ${g(/vanish worst one-frame drop[^\d]*([\d.]+)/)} | blank ${g(/longest run (\d+)/)} | splice ${g(/(\d+ splice frame\(s\)[^;]*sliver frame\(s\))/)} | hole ${g(/(\d+ frame\(s\) with a hole[^(]*)/)}`);
  }
}
