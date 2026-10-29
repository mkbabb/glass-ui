// costsum.mjs <cost json…>: the 4× rows at 20 and 40 seats (frames over 25 ms / max ms / main-thread ms per frame, load).
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const rows = j.cells.filter((c) => c.arm === "pcost" && (c.throttle === 4 && (c.seats === 20 || c.seats === 40) || c.throttle === 1 && c.seats === 40))
    .map((c) => `${c.throttle}x ${c.seats} ${c.mode}: ${c.over25ms} / ${c.dtMax} / ${c.trace?.mainTaskMsPerFrame} (morph ${c.morphFrames}, load ${c.load})`);
  console.log(f.split("/").pop(), "\n  " + rows.join("\n  "));
}
