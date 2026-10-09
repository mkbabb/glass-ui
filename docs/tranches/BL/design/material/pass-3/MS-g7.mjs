#!/usr/bin/env node
// MS-g7.mjs · W-0.1 G7 ("every row PASS at head is PASS at w01") and G6 ("every dark plate composite within ΔE_OK 0.002 of
// HEAD") read row by row from two `--verbose` witness outputs of the SAME harness on two captures.
//   node MS-g7.mjs m2 <head.txt> <route.txt>      M-2 rows: pass = both R1 and R3 p05 ≥ 4.5 (an unread run is not a pass)
//   node MS-g7.mjs m3 <head.txt> <route.txt>      M-3 rows: pass = p05 ≥ 3
//   node MS-g7.mjs dark <head-m6.txt> <route-m6.txt>  every "<spec> #rrggbb" read in a dark cell (inline or per row): ΔE_OK route − head
import fs from "node:fs";
const [kind, hf, rf] = process.argv.slice(2);
const parse = (f) => { const m = new Map(); let cell = "";
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const c = /^  ((?:chromium|webkit)(?:\+shim)? \w+ \w+(?: \w+)?)(?: \[info\])?:/.exec(line);
    if (c) { cell = c[1].replace("+shim", "");
      // dark: every "<name> #rrggbb" on a dark cell's own line (M-6 prints its composites inline)
      if (kind === "dark" && / dark /.test(` ${cell} `)) for (const [, n, h] of line.matchAll(/(\S+) (#[0-9a-f]{6})/g)) m.set(`${cell} | ${n}`, { hex: h });
      continue; }
    if (kind === "m2") { const r = /^\s+(\S+) R1 p05 (\S+) R3 p05 (\S+)/.exec(line); if (r) m.set(`${cell} | ${r[1]}`, { v: Math.min(+r[2] || 0, +r[3] || 0), read: r[2] !== "—", pass: r[2] !== "—" && +r[2] >= 4.5 && +r[3] >= 4.5 }); }
    if (kind === "m3") { const r = /^\s+(\S+) p05 (\S+)/.exec(line); if (r) m.set(`${cell} | ${r[1]}`, { v: +r[2], pass: +r[2] >= 3 }); }
    if (kind === "dark") { const r = /^\s+(\S+) (#[0-9a-f]{6})/.exec(line); if (r && / dark /.test(` ${cell} `)) m.set(`${cell} | ${r[1]}`, { hex: r[2] }); }
  } return m; };
const H = parse(hf), R = parse(rf);
if (kind === "dark") {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const ok = (h) => { const [r, g, b] = [1, 3, 5].map((k) => lin(parseInt(h.slice(k, k + 2), 16))); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
  let worst = 0, n = 0, over = [];
  for (const [k, h] of H) { const r = R.get(k); if (!r) continue; n++; const [a, b] = [ok(h.hex), ok(r.hex)]; const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); worst = Math.max(worst, d); if (d > 0.002) over.push(`${k} ${h.hex} → ${r.hex} ΔE ${d.toFixed(4)}`); }
  console.log(over.join("\n")); console.log(`G6 dark composites compared ${n}, worst ΔE_OK ${worst.toFixed(4)}, over 0.002: ${over.length}`); process.exit(over.length ? 1 : 0);
}
const regress = [], gained = [], missing = []; let headPass = 0;
for (const [k, h] of H) { const r = R.get(k); if (!r) { if (h.pass) missing.push(k); continue; }
  if (h.pass) { headPass++; if (!r.pass) regress.push(`${k}: head ${h.v} → route ${r.v}${r.read === false ? " (unread)" : ""}`); }
  else if (r.pass) gained.push(k); }
console.log(regress.join("\n"));
if (missing.length) console.log("rows PASS at head with no route row:\n" + missing.join("\n"));
console.log(`G7 ${kind}: head PASS rows ${headPass}; regressed ${regress.length}; head-PASS rows absent in route ${missing.length}; rows FAIL at head now PASS ${gained.length}`);
process.exit(regress.length || missing.length ? 1 : 0);
