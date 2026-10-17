#!/usr/bin/env node
// tabulate.mjs · H3's self-test table from logs/selftest-<engine>-<id>[-rN].log (the last read of each witness stands;
// earlier reads are listed with their verdict). Read-only.
import fs from "node:fs";
import path from "node:path";
const L = path.join(path.dirname(new URL(import.meta.url).pathname), "logs");
const ids = ["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9", "E-10", "E-11", "CAP"];
const rows = [];
for (const eng of ["chromium", "webkit"]) {
  let runs = 0, ok = 0, na = 0, bad = 0;
  for (const id of ids) {
    const files = fs.readdirSync(L).filter((f) => f === `selftest-${eng}-${id}.log` || new RegExp(`^selftest-${eng}-${id}-r\\d+\\.log$`).test(f)).sort((a, b) => (a.length - b.length) || a.localeCompare(b));
    if (!files.length) { rows.push(`| ${id} | ${eng} | not run | | | | | |`); continue; }
    const reads = files.map((f) => {
      const s = fs.readFileSync(path.join(L, f), "utf8");
      const n = (re) => (s.match(re) ?? []).length;
      const lo = [...s.matchAll(/load \{ ([\d.]+) /g)].map((m) => +m[1]);
      const at = (s.match(/^# start .*?(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d)/m) ?? [])[1] ?? "?";
      return { f, ok: n(/^OK /gm), bad: n(/^(BROKEN|UNREAD) /gm), na: n(/^N\/A /gm), clean: (s.match(/^(OK|BROKEN|N\/A)\s+\S+ \S+\s+clean[^\n]*/m) ?? [""])[0].slice(0, 6).trim(), sum: (s.match(/^selftest:[^\n]*/m) ?? ["(no summary)"])[0], load: lo.length ? `${Math.min(...lo).toFixed(1)}-${Math.max(...lo).toFixed(1)}` : "?", at };
    });
    const last = reads.at(-1);
    runs += last.ok + last.bad + last.na; ok += last.ok; na += last.na; bad += last.bad;
    const earlier = reads.slice(0, -1).map((r) => `${r.f}: ${r.ok} OK, ${r.bad} BROKEN`).join("; ");
    rows.push(`| ${id} | ${eng} | ${last.ok + last.bad + last.na} | ${last.ok} | ${last.bad} | ${last.na} | ${last.load} (${last.at}) | \`logs/${last.f}\`${earlier ? `; superseded: ${earlier}` : ""} |`);
  }
  rows.push(`| **all** | **${eng}** | **${runs}** | **${ok}** | **${bad}** | **${na}** | | |`);
}
console.log("| witness | engine | runs | OK | BROKEN/UNREAD | N/A | load 1-min (start) | log |\n|---|---|---:|---:|---:|---:|---|---|\n" + rows.join("\n"));
