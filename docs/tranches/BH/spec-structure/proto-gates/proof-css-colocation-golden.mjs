#!/usr/bin/env node
// PROTO (BH round-4 execution-proto) — proof:css-colocation golden /styles-hash arm.
//
// The byte-drift sentinel for the CSS-colocation flatten. Covers BOTH halves of
// the shipped /styles surface:
//   (a) the dist/styles/ cascade (~106 authored global sheets — SCOPE-ID-FREE,
//       byte-identical under the flatten unconditionally: a physical file MOVE);
//   (b) the SFC-fold dist/glass-ui.css (carries EVERY `data-v-XXXX` scoped
//       selector — byte-identical under the flatten IFF the path-independent
//       componentIdGenerator (§7) is adopted; the DEFAULT path+source generator
//       rotates all 41 scoped ids and false-REDs this gate).
//
// Build-verified (round-4 worktree, plugin-vue 6.0.7):
//   basename-key generator: GOLDEN invariant across a flatten proxy → GREEN.
//   source-key  generator: GOLDEN 42590f30→dccabf40 across the SAME proxy → RED.
//
// Usage: node proof-css-colocation-golden.mjs <distDir> [expectedGolden]
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";
const DIST = resolve(process.argv[2] ?? "dist");
const EXPECT = process.argv[3];
const sha = (b) => createHash("sha256").update(b).digest("hex");
function walkCss(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walkCss(p, acc);
    else if (p.endsWith(".css")) acc.push(p);
  }
  return acc;
}
const rows = [...walkCss(join(DIST, "styles")), join(DIST, "glass-ui.css")]
  .map((p) => [relative(DIST, p), sha(readFileSync(p))])
  .sort((a, b) => (a[0] < b[0] ? -1 : 1));
const golden = sha(rows.map(([p, h]) => `${p} ${h}`).join("\n"));
// zero-collision arm: no two scoped SFCs may share a data-v id in glass-ui.css
const ids = [...readFileSync(join(DIST, "glass-ui.css"), "utf8").matchAll(/data-v-([0-9a-f]{8})/g)].map((m) => m[1]);
const uniq = new Set(ids);
console.log(`files=${rows.length}  scoped-ids=${uniq.size}  GOLDEN=${golden}`);
if (EXPECT && golden !== EXPECT) { console.error(`RED: golden drift (expected ${EXPECT})`); process.exit(1); }
console.log("GREEN");
