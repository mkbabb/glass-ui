// node fails.mjs report.json... -> TSV: file \t title-path, for every unexpected or flaky test.
// The same reading as the 10.1.4 close's fails.mjs, so the title sets compare.
import { readFileSync } from "node:fs";
const out = new Set();
function walk(s, trail, file) {
  const f = s.file ?? file;
  const t = s.title && s.title !== f && !s.title.endsWith(".spec.ts") ? [...trail, s.title] : trail;
  for (const sp of s.specs ?? []) for (const te of sp.tests ?? [])
    if (te.status === "unexpected" || te.status === "flaky")
      out.add(`${(sp.file ?? f).split("/").pop()}\t${[...t, sp.title].join(" › ")}`);
  for (const c of s.suites ?? []) walk(c, t, f);
}
for (const p of process.argv.slice(2)) { const j = JSON.parse(readFileSync(p, "utf8")); for (const s of j.suites ?? []) walk(s, [], s.file); }
if (out.size) console.log([...out].sort().join("\n"));
