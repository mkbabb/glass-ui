#!/usr/bin/env node
// selftest-table.mjs · renders H4.md §2 from logs/selftest-*.log: per witness and engine, the hash, every clean, plant
// and control with its gating tally, the run count, BROKEN count and the 1-min load at start and end.
//   node selftest-table.mjs [logs dir]
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] ?? path.join(path.dirname(new URL(import.meta.url).pathname), "logs");
const order = ["FACT", "ATTACK", "CORNER", "REPORT", "T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-A", "W-B", "W-C", "W-D", "W-E", "CANON"];
const H4 = new Set(["t2-selfblock", "atk-split", "atk-nest", "atk-empty", "atk-attrs", "atk-sup", "atk-sup-dev", "atk-corner", "h46-kick", "h46-mark"]);
const logs = fs.readdirSync(dir).filter((f) => /^selftest-.*\.log$/.test(f));
const rows = [];
let runs = 0, broken = 0;
for (const f of logs) {
  const [, id, eng] = f.match(/^selftest-(.+)-(chromium|webkit|both)\.log$/) ?? [];
  if (!id) continue;
  const t = fs.readFileSync(path.join(dir, f), "utf8").split("\n");
  const load = (l) => (l?.match(/load \{ ([\d.]+)/) ?? [])[1] ?? "?";
  const exitLine = t.find((l) => /^exit \d+/.test(l));
  const hash = (t.find((l) => /^selftest · harness/.test(l))?.match(/harness \S+ (\w+)/) ?? [])[1] ?? "?";
  const items = [];
  for (const l of t) {
    const m = l.match(/^(OK|BROKEN)\s+\S+\s+\S+\s+(clean|fault|control)\s*(\S+)?/);
    if (!m) continue;
    const [, ok, kind, name] = m;
    // a gating tally, or (H3-1's `stall` plant) a loud stop: exit 2 with HARNESS ERROR
    const tally = (l.match(/· \S+ (?:PASS|FAIL) · (\d+\/\d+)/) ?? [])[1] ?? (/exit 2 · \S+ HARNESS ERROR/.test(l) ? "exit 2, named" : "?");
    runs++; if (ok === "BROKEN") broken++;
    const label = kind === "clean" ? `clean ${tally}` : `${kind === "control" ? "control " : ""}${H4.has(name) ? `**\`${name}\`**` : `\`${name}\``} ${tally}${ok === "BROKEN" ? " BROKEN" : ""}`;
    items.push(label);
  }
  rows.push({ id, eng, hash, items, n: items.length, start: load(t[0]), end: load(exitLine), exit: exitLine?.match(/^exit (\d+)/)?.[1] ?? "none" });
}
rows.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id) || a.eng.localeCompare(b.eng));
console.log("| witness | engine | harness | clean, plants and controls (gating cells pass / measured; H4 plants bold) | runs | exit | 1-min load start → end |");
console.log("|---|---|---|---|---:|---:|---|");
for (const r of rows) console.log(`| ${r.id} | ${r.eng === "webkit" ? "Playwright WebKit" : r.eng === "both" ? "both (one run)" : "Chromium"} | \`${r.hash}\` | ${r.items.join("; ")} | ${r.n} | ${r.exit} | ${r.start} → ${r.end} |`);
console.log(`\n${runs} runs, ${broken} BROKEN, across ${rows.length} logs.`);
