#!/usr/bin/env node
// selftest-table.mjs · renders H6.md §2 from the self-test logs (logs/selftest-<engine>-<part>.log and the WebKit holds logs/wk-<tag>.log):
// per witness and engine, every clean, plant and control with its gating tally (H6 plants bold), the run count and
// BROKEN count, and the hash each log printed. It reads files only.
//   node selftest-table.mjs [logs dir]
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] ?? path.join(path.dirname(new URL(import.meta.url).pathname), "logs");
const order = ["CANON", "FACT", "ATTACK", "REPORT", "CORNER", "T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-A", "W-B", "W-C", "W-D", "W-E"];
const H6 = new Set(["atk-st-noreset", "atk-st-noreset-dev", "atk-bang-soft", "atk-bang-ref"]);
const files = fs.readdirSync(dir).filter((f) => /^(selftest-(chromium|webkit)-.+|wk-[A-Z])\.log$/.test(f)).sort((a, b) => (a.endsWith("-part.log") ? -1 : b.endsWith("-part.log") ? 1 : a.localeCompare(b)));
const rows = new Map();
const hashes = new Set();
let runs = 0, broken = 0;
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), "utf8").split("\n");
  for (const l of t) {
    const h = l.match(/^selftest · harness \S+ (\w+)/); if (h) hashes.add(h[1]);
    const m = l.match(/^(OK|BROKEN)\s+(\S+)\s+(chromium|webkit|both)\s+(clean|fault|control)\s*(\S+)?/);
    if (!m) continue;
    const [, ok, id, eng, kind, name] = m;
    const tally = (l.match(/· \S+ (?:PASS|FAIL) · (\d+\/\d+)/) ?? [])[1] ?? (/exit 2 · \S+ HARNESS ERROR/.test(l) ? "exit 2, named" : "?");
    // a run re-made in a later part (sorted by name: the stopped first Chromium call, then its parts) replaces the earlier line
    const key = `${id}|${eng}`;
    if (!rows.has(key)) rows.set(key, { id, eng, byName: new Map() });
    rows.get(key).byName.set(kind === "clean" ? "(clean)" : name, { ok, text: kind === "clean" ? `clean ${tally}` : `${kind === "control" ? "control " : ""}${H6.has(name) ? `**\`${name}\`**` : `\`${name}\``} ${tally}` });
  }
}
for (const r of rows.values()) { r.items = [...r.byName.values()].map((x) => x.text + (x.ok === "BROKEN" ? " BROKEN" : "")); for (const x of r.byName.values()) { runs++; if (x.ok === "BROKEN") broken++; } }
const sorted = [...rows.values()].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id) || a.eng.localeCompare(b.eng));
console.log(`harness ${[...hashes].join(", ")}${hashes.size > 1 ? " · MIXED" : ""}\n`);
console.log("| witness | engine | clean, plants and controls (gating cells pass / measured; H6 plants bold) | runs |");
console.log("|---|---|---|---:|");
for (const r of sorted) console.log(`| ${r.id} | ${r.eng === "webkit" ? "Playwright WebKit" : r.eng === "both" ? "both (one run)" : "Chromium"} | ${r.items.join("; ")} | ${r.items.length} |`);
console.log(`\n${runs} runs, ${broken} BROKEN.`);
