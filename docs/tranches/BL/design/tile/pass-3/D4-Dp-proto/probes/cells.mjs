#!/usr/bin/env node
// D4-Dp-proto/probes/cells.mjs · reads a run directory's witness JSON (files only) and prints gating cells whose scene
// or line matches a pattern, with verdict, engine and arm. `--fails` prints only failing gating cells.
//   node cells.mjs <run dir> <witness> <regex> [--fails]
import fs from "node:fs"; import path from "node:path";
const [dir, w, re, flag] = process.argv.slice(2); const rx = new RegExp(re);
for (const f of fs.readdirSync(dir).filter((f) => f.startsWith(w + "-") && f.endsWith(".json")).sort()) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  for (const c of j.cells ?? []) {
    if (!c.gating) continue; if (flag === "--fails" && c.pass) continue;
    const s = `${c.scene ?? ""} ${c.line ?? ""}`; if (!rx.test(s)) continue;
    console.log(`${f.replace(".json", "")} ${c.pass === true ? "PASS" : c.pass === false ? "FAIL" : "UNMEASURED"} [${c.arm ?? "-"}] ${String(c.line).slice(0, 300)}`);
  }
}
