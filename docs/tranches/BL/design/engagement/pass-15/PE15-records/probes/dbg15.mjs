#!/usr/bin/env node
// P-E15 part B · an instrument, not a witness: E-15's A5 G cell (and a named few) on an instrument build whose read() pushes each
// frame's classification to window.__d; prints the frames around the act. Not of record for any row.
import { witness } from "../../../harness/lib.mjs";
import { blk, filmKit } from "../../../harness/film.mjs";
await witness("DBG-15", "instrument: frame classification", async ({ a, E, T, cell, guard, idx, engine }) => {
  const K = filmKit({ E, T, cell, guard, idx, engine });
  const cells = [["A5 G 1 → 1.25", `G.insertBefore(${blk(300, "e15-deep")}, C);`, "G.style.zoom = '1.25'"],
    ["X8 G 2 C 0.75 40", "G.style.zoom = '2'; C.style.position = 'relative'; C.style.zoom = '0.75';", `C.insertBefore(${blk(40)}, root)`]];
  for (const [nm, setup, hook] of cells) {
    const r = await K.run(nm, { setup, hooks: [[8, hook]], read: "return window.__d ?? null;" });
    const d = r.extra ?? [];
    console.log(`## ${nm}: ${d.length} frames read`);
    const i0 = d.findIndex((x) => x.kind || (x.pz && x.z.some((z, i) => z !== x.pz[i]))); for (const x of d.slice(Math.max(0, i0 - 1), i0 + 4)) console.log(JSON.stringify(x));
    cell(nm, "REPORT", `frames ${d.length}`);
  }
});
