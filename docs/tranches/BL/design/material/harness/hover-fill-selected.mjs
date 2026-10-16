#!/usr/bin/env node
// HOV · H5-3 (pass 5): no `:hover` rule paints a value built on `--fill-selected`. The register reserves that rung for
// persistent state ("hover cannot mint it", tokens/color-radius.css), and pass 4's prose sweep found a ruled value (R-4:
// the menu row on `--fill-selected`, painted by `.glass-menu-row:hover`) only by hand (Crit A-2). Static: the tree's
// own CSS (every .css under src and every .vue <style> block, lib.mjs cssRules).
//   built on   a custom property is built on --fill-selected when any declaration of it reads var(--fill-selected) or
//              another property already built on it (to a fixpoint, so the indirection R-4 used, --menu-row-bg, is seen)
//   :hover     an effective selector (nesting resolved) that holds :hover outside :not(…) and carries no persistent
//              state of its own ([data-selected], [aria-selected], [aria-checked], [aria-pressed], [aria-current],
//              [data-state="checked|on|active"], :checked). Hover ON a selected item is the register's own derivation
//              (§1.3, hover + selected = 0.17), not hover minting the rung, so it is not read
//   paints     any declaration of that rule, custom properties included, whose value reads --fill-selected or a
//              property built on it
// One gated row per :hover selector read; a selector with a finding is a FAIL row. Static, so it reads the same in
// every engine: baseline.mjs repeats one verdict across its four columns, as it does for W-B and W-D.
//   node hover-fill-selected.mjs [<capdir>] [--root <tree>]   (the tree defaults to the capture's worktree)
import { cli, cssRules, splitTop, varRefs, staticRoot } from "./lib.mjs";

const a = cli({ root: { type: "string" } }), root = staticRoot(a);
console.log("HOV · no :hover rule paints a value built on --fill-selected (static; H5-3)");
if (!root) { console.log(`tree: none (pass --root, or a capture whose worktree is on disk)\nFAIL (no gated rows measured: no tree)`); process.exit(1); }
const { files, rules } = cssRules(root);
const RUNG = "--fill-selected";
const PERSISTENT = /\[(data-selected|aria-selected|aria-checked|aria-pressed|aria-current)\b|\[data-state=["']?(checked|on|active)["']?\]|:checked\b/;
// Custom properties built on the rung, to a fixpoint; `via` keeps one witness declaration per property.
const via = new Map([[RUNG, null]]);
for (let grew = true; grew; ) {
  grew = false;
  for (const r of rules) for (const d of r.decls) {
    if (!d.prop.startsWith("--") || via.has(d.prop)) continue;
    const hit = varRefs(d.value).find((n) => via.has(n));
    if (hit) { via.set(d.prop, { from: hit, at: `${r.file}:${d.line}` }); grew = true; }
  }
}
const chain = (n) => { const out = []; for (let x = n; x; x = via.get(x)?.from) out.push(via.get(x) ? `${x} (${via.get(x).at})` : x); return out.join(" ← "); };
const stripNot = (s) => { let o = "", i = 0; while (i < s.length) { if (s.startsWith(":not(", i)) { let d = 0, j = i + 4; for (; j < s.length; j++) { if (s[j] === "(") d++; if (s[j] === ")" && --d === 0) break; } i = j + 1; } else o += s[i++]; } return o; };
let rows = 0, fails = 0;
const lines = [];
for (const r of rules) for (const sel of r.sels) {
  const bare = stripNot(sel);
  if (!/:hover\b/.test(bare) || PERSISTENT.test(bare)) continue;
  rows++;
  const bad = r.decls.filter((d) => varRefs(d.value).some((n) => via.has(n)));
  if (!bad.length) continue;
  fails++;
  for (const d of bad) { const n = varRefs(d.value).find((x) => via.has(x)); lines.push(`HOVER-FILL-SELECTED ${r.file}:${d.line} ${sel} { ${d.prop}: ${d.value.slice(0, 80)} } · ${chain(n)} ✗`); }
}
console.log(`tree ${root} · ${files} files · ${rules.length} rules · built on ${RUNG}: ${[...via.keys()].filter((k) => k !== RUNG).join(", ") || "none"}`);
for (const l of lines) console.log("  " + l);
console.log(`HOVER-FILL-SELECTED hover-selectors=${rows} painting=${fails}`);
console.log(rows === 0 ? "FAIL (no gated rows measured: no :hover selector read)" : fails ? `FAIL (${fails} of ${rows} gated rows)` : `PASS (${rows} gated rows)`);
process.exitCode = rows && !fails ? 0 : 1;
