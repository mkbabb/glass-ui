#!/usr/bin/env node
// selftest.mjs · every witness must PASS on the minimal fixture and FAIL on its planted violation.
//   node selftest.mjs [--out <dir>] [--only T-1,W-E]
// A witness that exits 0 on its fault, or non-zero on the clean fixture, is broken; exit 1 if any is.
import { parseArgs } from "./lib.mjs";
import { WITNESSES, runOne } from "./run.mjs";
import { FAULTS } from "./fixtures.mjs";

const a = parseArgs();
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const out = typeof a.out === "string" ? ["--out", a.out] : [];
let broken = 0;
for (const [id, file] of WITNESSES) {
  if (only && !only.has(id)) continue;
  const fault = id.toLowerCase().replace("-", "");
  const fam = id === "W-E" ? ["--family", "e"] : [];
  const clean = runOne(file, ["--fixture", ...fam, ...out]);
  const planted = runOne(file, ["--fixture", ...fam, "--fault", fault, ...out]);
  const ok = clean.code === 0 && planted.code === 1;
  if (!ok) broken++;
  console.log(`${ok ? "OK    " : "BROKEN"} ${id.padEnd(4)} clean exit ${clean.code} · ${clean.last}`);
  console.log(`       ${"".padEnd(4)} fault ${fault} (${FAULTS[fault]}) exit ${planted.code} · ${planted.last}`);
}
console.log(broken ? `selftest: ${broken} witness(es) BROKEN` : "selftest: every witness passes its fixture and fails its planted violation");
process.exit(broken ? 1 : 0);
