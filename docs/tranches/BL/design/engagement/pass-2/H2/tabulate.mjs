#!/usr/bin/env node
// tabulate.mjs · H2's tables from its logs (nothing is typed by hand).
//   node tabulate.mjs selftest <log> [<log>…]   one markdown row per witness and engine
//   node tabulate.mjs baseline <log>            one row per witness and engine, then every FAIL/UNMEASURED cell name
import fs from "node:fs";
const [mode, ...files] = process.argv.slice(2);
const loads = (s) => [...s.matchAll(/load (\d+\.\d+)\/\d+\.\d+\/\d+\.\d+/g)].map((m) => +m[1]);
if (mode === "selftest") {
  const rows = new Map();
  for (const f of files) {
    const L = fs.readFileSync(f, "utf8").split("\n");
    let cur = null;
    for (const l of L) {
      const m = l.match(/^(OK|BROKEN|N\/A)\s+(E-\d+) (chromium|webkit)\s+(clean|fault|control|unmeas)\s*(\S*)/);
      if (m) {
        const k = `${m[2]} ${m[3]}`;
        cur = rows.get(k) ?? { clean: "-", fault: [0, 0], control: [0, 0], unmeas: [0, 0], na: [], broken: [], lo: Infinity, hi: 0 };
        rows.set(k, cur);
        if (m[1] === "N/A") cur.na.push(m[5] || "clean");
        else if (m[4] === "clean") { cur.clean = m[1] === "OK" ? (l.match(/(\d+ pass, \d+ fail, \d+ unmeasured of \d+)/)?.[1] ?? "OK") : "BROKEN"; if (m[1] !== "OK") cur.broken.push("clean"); }
        else { cur[m[4]][1]++; if (m[1] === "OK") cur[m[4]][0]++; else cur.broken.push(m[5]); }
      }
      if (cur) for (const v of loads(l)) { cur.lo = Math.min(cur.lo, v); cur.hi = Math.max(cur.hi, v); }
    }
  }
  console.log("| witness | engine | clean fixture (gating cells) | plants FAIL on the planted cell | controls PASS | UNMEASURED plants | N/A | BROKEN | load (1-min) |\n|---|---|---|---|---|---|---|---|---|");
  let t = 0, ok = 0, na = 0;
  for (const [k, r] of rows) {
    const [w, e] = k.split(" ");
    const n = 1 + r.fault[1] + r.control[1] + r.unmeas[1] + r.na.length; t += n; na += r.na.length;
    ok += (r.clean !== "BROKEN" && r.clean !== "-" ? 1 : 0) + r.fault[0] + r.control[0] + r.unmeas[0];
    const fr = (x) => (x[1] ? `${x[0]}/${x[1]}` : "-");
    console.log(`| ${w} | ${e} | ${r.clean} | ${fr(r.fault)} | ${fr(r.control)} | ${fr(r.unmeas)} | ${r.na.join(", ") || "-"} | ${r.broken.join(", ") || "0"} | ${r.lo.toFixed(0)}-${r.hi.toFixed(0)} |`);
  }
  console.log(`\ntotal ${t} runs: ${ok} OK, ${na} N/A, ${t - ok - na} BROKEN`);
} else {
  const L = fs.readFileSync(files[0], "utf8").split("\n");
  console.log("| witness | engine | exit | verdict | pass | fail | unmeasured | gating | reported | seconds | load at start → end |\n|---|---|---|---|---|---|---|---|---|---|---|");
  const detail = [];
  let cur = null;
  for (const l of L) {
    const m = l.match(/^(E-\d+) (chromium|webkit)\s+exit (\d) · .*?(PASS|FAIL|UNMEASURED|HARNESS ERROR)(?: · (\d+) pass, (\d+) fail, (\d+) unmeasured of (\d+) gating cells \((\d+) reported\))?.*?(?:load ([\d.]+)\/[\d./]+ at start, ([\d.]+)\/[\d./]+ at end)?.* · (\d+) s, load at start/);
    if (m) {
      cur = `${m[1]} ${m[2]}`;
      console.log(`| ${m[1]} | ${m[2]} | ${m[3]} | ${m[4]} | ${m[5] ?? "-"} | ${m[6] ?? "-"} | ${m[7] ?? "-"} | ${m[8] ?? "-"} | ${m[9] ?? "-"} | ${m[12]} | ${l.match(/load ([\d.]+)\/[\d.]+\/[\d.]+ at start,/)?.[1] ?? "?"} → ${l.match(/at start, ([\d.]+)\/[\d.]+\/[\d.]+ at end/)?.[1] ?? "?"} |${/NOT-REPRODUCED|REPRODUCED/.test(l) ? " " + l.match(/(NOT-)?REPRODUCED[^·]*/)[0] : ""}`);
    } else if (cur && /^\s+(FAIL|UNMEASURED|HARNESS)/.test(l)) detail.push(`${cur} · ${l.trim()}`);
  }
  console.log("\n" + detail.join("\n"));
}
