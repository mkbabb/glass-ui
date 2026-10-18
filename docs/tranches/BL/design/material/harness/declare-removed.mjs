#!/usr/bin/env node
// declare-removed.mjs · H7-2 (pass 7, REGISTRY P6-2.2 R-15 (iii)): DEL's declaration, built from a patch's REMOVED
// lines, so the sweep is bounded by the patch and no deleted name depends on a reader remembering it.
// Every identifier of the kinds R-15 (iii) names, on a `-` line of a src/ or demo/ file in the patch, is a candidate: a
// token (`--x-y`), a `data-` attribute, an export or declared function, type, interface or class, a prop (an optional
// member, `name?: T`), a PascalCase type or component, a hyphenated class selector (`.glass-x`) or `@utility` name. Each candidate is then read in the patched tree's src/ and demo/ (DEL's
// scope), exact:
//   absent   the patch deleted it: DECLARED (DEL then reads its word form too, deleted-mechanisms.mjs)
//   present  it is still named in the tree (live elsewhere, or a sentence that survived): LISTED with file:line, for the
//            seat to rule one by one (live: keep; prose: rewrite and declare by hand)
// Concepts with no identifier (the adaptive tint, the earned darken) are declared by hand: --concepts <json> adds its
// names. --exact <json> ([{ name, why }]) carries the seat's exact-only rulings into DEL's `exact` (an identifier whose
// word form is ordinary live prose). The output is DEL's { patch, names, exact } plus { derived, concepts, present }.
//   node declare-removed.mjs --patch <file.patch> --root <patched tree> [--concepts <names.json>] [--exact <rulings.json>] --out <decl.json>
import fs from "node:fs";
import path from "node:path";
import { cli } from "./lib.mjs";
import { textFiles } from "./deleted-mechanisms.mjs";

// The kinds R-15 (iii) names, read from removed lines of src/ and demo/ files (DEL's scope; a test's removed line names
// test API, not a mechanism). A template prefix (`--glass-blur-${level}`) is not a name, so a token followed by -, $ or a
// word character is skipped. A plain local variable is not one of the kinds and is not read.
const KINDS = [
  ["token", /--[a-z][a-z0-9-]*[a-z0-9](?![\w$-])/g],
  ["data- attribute", /(?<![\w-])data-[a-z][a-z0-9-]*[a-z0-9](?![\w$-])/g],
  ["export", /\b(?:export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|type|interface|enum)|function|type|interface|enum|class)\s+([A-Za-z_$][\w$]*)/g],
  ["prop", /^\s*([a-z][A-Za-z0-9]*)\?:\s/g],
  ["type or component", /(?<![\w$.-])[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)+\b/g],
  ["class or utility", /(?:(?<=[\s,{(]\.)|(?<=@utility\s+))[a-z][a-z0-9]*(?:-[a-z0-9]+)+(?![\w$-])/g],
];
export function removedIdentifiers(patchText) {
  const out = new Map();
  let inScope = false;
  for (const l of patchText.split("\n")) {
    if (l.startsWith("diff --git ")) { inScope = /^diff --git a\/(src|demo)\//.test(l); continue; }
    if (!inScope || !l.startsWith("-") || l.startsWith("---")) continue;
    for (const [kind, re] of KINDS) for (const m of l.slice(1).matchAll(re)) { const id = m[1] || m[0]; if (!out.has(id)) out.set(id, kind); }
  }
  return [...out].sort(([x], [y]) => (x < y ? -1 : 1)).map(([id, kind]) => ({ id, kind }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ patch: { type: "string" }, root: { type: "string" }, concepts: { type: "string" }, exact: { type: "string" }, out: { type: "string" } });
  if (!a.patch || !a.root || !a.out) { console.log("usage: node declare-removed.mjs --patch <file.patch> --root <patched tree> [--concepts <names.json>] --out <decl.json>"); process.exit(2); }
  const patch = path.resolve(a.patch), cand = removedIdentifiers(fs.readFileSync(patch, "utf8"));
  const files = textFiles(path.resolve(a.root));
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const derived = [], present = [];
  for (const { id, kind } of cand) {
    const re = new RegExp(`(?<![\\w-])${esc(id)}(?![\\w-])`, "g"), where = [];
    for (const [rel, text] of files) for (const m of text.matchAll(re)) where.push(`${rel}:${text.slice(0, m.index).split("\n").length}`);
    if (where.length) present.push({ id, kind, n: where.length, where: where.slice(0, 6) }); else derived.push({ id, kind });
  }
  const concepts = a.concepts ? JSON.parse(fs.readFileSync(path.resolve(a.concepts), "utf8")).names : [];
  const names = [...new Set([...concepts, ...derived.map((d) => d.id)])];
  const exact = a.exact ? JSON.parse(fs.readFileSync(path.resolve(a.exact), "utf8")) : [];
  for (const e of exact) if (!names.includes(e.name)) { console.log(`exact-only ruling "${e.name}" names no declared identifier`); process.exit(2); }
  const doc = { patch: `${path.basename(patch)}: every identifier its removed lines name that the patched src/ and demo/ no longer name (declare-removed.mjs), plus ${concepts.length} concepts declared by hand${a.concepts ? " (" + path.basename(a.concepts) + ")" : ""}`, names, exact, derived, concepts, present };
  fs.writeFileSync(path.resolve(a.out), JSON.stringify(doc, null, 1) + "\n");
  console.log(`DECLARE ${path.basename(patch)}: ${cand.length} identifiers on removed lines · ${derived.length} absent from the patched tree (declared) · ${present.length} still named (listed for the seat) · ${concepts.length} concepts · ${names.length} names, ${exact.length} exact only → ${a.out}`);
  for (const d of derived) console.log(`  declared ${d.id} (${d.kind})`);
  for (const p of present) console.log(`  present ${p.id} (${p.kind}) ×${p.n} · ${p.where.join(" ")}`);
}
