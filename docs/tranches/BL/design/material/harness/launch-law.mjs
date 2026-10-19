#!/usr/bin/env node
// LAW · H6-0 (pass 6): the material harness launches browsers under the machine law (user-level CLAUDE.md, "Browser
// runs"): Playwright's default headless shell, no GPU arguments, no full Chrome for Testing or branded Chrome channel,
// no headed browser. A file may carry one of those only with a `GPU-WITNESS: <witness id> · <evidence path>` line,
// the named witness that proved it needs them and the record of that proof. The evidence path is resolved against the
// file's directory, then the scanned root's parent, and must exist.
// Static: every .mjs, .js, .cjs and .sh file under each root. Comment lines (//, /*, *, #) are not read, so prose may
// name a flag. One gated row per file read; a file with a launch finding and no valid citation is a FAIL row.
//   node launch-law.mjs [--root <dir>[,<dir>…]]   (default: the harness directory and every ../pass-N, N ≥ 6)
import fs from "node:fs";
import path from "node:path";
import { HERE, cli, list } from "./lib.mjs";

const a = cli({ root: { type: "string" } });
// The law binds from pass 6 on (H6-0): the harness and every pass-N directory with N ≥ 6 (H7 adds pass-7/ and later).
const passes = fs.readdirSync(path.resolve(HERE, "..")).filter((d) => /^pass-(\d+)$/.test(d) && +d.slice(5) >= 6).map((d) => path.resolve(HERE, "..", d));
const roots = list(a.root, [HERE, ...passes]).map((r) => path.resolve(r)).filter((r) => fs.existsSync(r));
const BAD = [
  [/--enable-unsafe-webgpu/, "WebGPU flag"], [/--ignore-gpu-blocklist/, "GPU blocklist override"], [/--use-angle\b/, "ANGLE backend flag"],
  [/--use-gl\b/, "GL backend flag"], [/--enable-gpu\b/, "GPU enable flag"], [/--enable-unsafe-swiftshader/, "SwiftShader flag"],
  [/\bchannel\s*:\s*["'`](chrome|chromium|msedge)[\w-]*["'`]/, "full-browser channel"], [/\bheadless\s*:\s*false\b/, "headed browser"],
  [/\bexecutablePath\s*:/, "explicit browser executable"],
];
const CITE = /^\s*(?:\/\/|#|\*)\s*GPU-WITNESS:[ \t]*([^·\n]+?)[ \t]*·[ \t]*(\S+)[ \t]*$/m;   // one whole comment line
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.name === "node_modules" || e.name.startsWith(".") ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : /\.(mjs|js|cjs|sh)$/.test(e.name) ? [path.join(d, e.name)] : []));
console.log(`LAW · the harness launches the headless shell with no GPU arguments unless a GPU-WITNESS line cites the need (static; H6-0)\nroots: ${roots.join(", ") || "none"}`);
let rows = 0, fails = 0, cited = 0;
for (const root of roots) for (const file of walk(root)) {
  if (path.resolve(file) === path.resolve(HERE, "launch-law.mjs")) continue;   // this file names the flags it gates
  rows++;
  const text = fs.readFileSync(file, "utf8"), hits = [];
  text.split("\n").forEach((line, i) => { if (/^\s*(\/\/|\/\*|\*|#)/.test(line)) return; for (const [re, what] of BAD) if (re.test(line)) hits.push(`${i + 1} ${what}: ${line.trim().slice(0, 120)}`); });
  if (!hits.length) continue;
  const c = text.match(CITE), ev = c && [path.resolve(path.dirname(file), c[2]), path.resolve(root, "..", c[2])].find((p) => fs.existsSync(p));
  const rel = path.relative(path.dirname(root), file);
  if (c && ev) { cited++; console.log(`  ✓ ${rel}: ${hits.length} launch finding(s) under GPU-WITNESS ${c[1]} · ${path.relative(path.dirname(root), ev)}`); continue; }
  fails++;
  console.log(`  ✗ ${rel}: ${c ? `GPU-WITNESS cites ${c[2]}, which does not exist` : "no GPU-WITNESS citation"}`);
  for (const h of hits) console.log(`      ${h}`);
}
console.log(`LAUNCH-LAW files=${rows} cited=${cited} uncited=${fails}`);
console.log(rows === 0 ? "FAIL (no gated rows measured: no file)" : fails ? `FAIL (${fails} of ${rows} gated rows)` : `PASS (${rows} gated rows)`);
process.exitCode = rows && !fails ? 0 : 1;   // H11-1: no process.exit
