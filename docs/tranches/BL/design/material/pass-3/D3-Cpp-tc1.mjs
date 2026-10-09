#!/usr/bin/env node
// D3-Cpp-tc1.mjs · D3 pass 3, C″ prototype: T_c1 for row C-7 with the pole read where no claim moves it.
// t-transmission.mjs reads each surface's pole from its composites over black and white. Under ?claim=honest the
// black and white stands are claimed with their own colours (black → the bound, white → a thinner licence), so the
// two composites carry two different α and the pole and T_c1 it derives are not the plate's. The pole is the plate
// colour (`--card`), which no claim moves, so this reads it from an UNCLAIMED capture of the same build and the c1
// composite and raw from the CLAIMED one. Same arithmetic as t-transmission.mjs otherwise.
// Source of record for its readings: D3-Cpp-proto.md §4.
//   node D3-Cpp-tc1.mjs <claimed capdir> <unclaimed capdir>
import { loadCapture, paintedAlpha, composite, region, mean3, pick, f, THEMES } from "../harness/lib.mjs";

const [claimedDir, poleDir] = process.argv.slice(2);
if (!claimedDir || !poleDir) { console.error("usage: node D3-Cpp-tc1.mjs <claimed capdir> <unclaimed capdir>"); process.exit(2); }
const cl = loadCapture(claimedDir), un = loadCapture(poleDir);
const slope = (comp, raw, pole) => {
  let num = 0, den = 0;
  for (let k = 0; k < 3; k++) { num += (comp[k] - pole[k]) * (raw[k] - pole[k]); den += (raw[k] - pole[k]) ** 2; }
  return den > 1 ? num / den : null;
};
for (const engine of [...new Set(cl.cells.map((c) => c.engine))]) for (const theme of THEMES) {
  const q = { engine, theme, scene: "ladder", variant: "base" };
  const B = pick(un, { ...q, ground: "black" })[0], W = pick(un, { ...q, ground: "white" })[0];
  const C1 = pick(cl, { ...q, ground: "aurora" })[0], U1 = pick(un, { ...q, ground: "aurora" })[0];
  if (!B || !W || !C1 || !U1) { console.log(`${engine} ${theme}: a cell is missing`); continue; }
  const parts = [];
  for (const s of B.specs.filter((x) => x.sample)) {
    const { alpha, pole } = paintedAlpha(un, B, W, s);
    const c1 = C1.specs.find((z) => z.id === s.id), u1 = U1.specs.find((z) => z.id === s.id);
    if (!pole || !c1?.sample || !u1?.sample) continue;
    const tc = slope(composite(cl, C1, c1), mean3(region(cl.img(C1, "raw"), c1.sample)), pole);
    const tu = slope(composite(un, U1, u1), mean3(region(un.img(U1, "raw"), u1.sample)), pole);
    parts.push(`${s.id} T_floor ${f(1 - alpha, 3)} T_c1 unclaimed ${f(tu, 3)} claimed ${f(tc, 3)} ×${tc != null && tu ? f(tc / tu, 2) : "—"}`);
  }
  console.log(`${engine} ${theme}: ${parts.join(" · ")}`);
}
