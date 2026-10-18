#!/usr/bin/env node
// declare-removed.mjs · H7-2 (pass 7, REGISTRY P6-2.2 R-15 (iii)), H8-2 (pass 8, P7-5): DEL's declaration, built from a
// patch's REMOVED lines, so the sweep is bounded by the patch and no deleted name depends on a reader remembering it.
// Every identifier of these kinds, on a `-` line of a src/ or demo/ file in the patch, is a candidate: a token
// (`--x-y`), a `data-` attribute, an export or declared function, type, interface or class, a prop (an optional member,
// `name?: T`), a PascalCase type or component, a hyphenated class selector (`.glass-x`) or `@utility` name; and (H8-2)
// the file stem of every src/ or demo/ module the patch deletes (`backdropSampleMath`), and every module-level
// `const`/`let`/`var` name, read as a declaration at column 0 of the removed line, destructured names included
// (`const { sample: backdropSample }` names `backdropSample`). Function locals (indented) and browser APIs are not
// declarations of the patch's own and are not read. Each candidate is then read in the patched tree's src/ and demo/, exact:
//   absent   the patch deleted it: DECLARED (DEL then reads its word form too, deleted-mechanisms.mjs)
//   present  it is still named in the tree (live elsewhere, or a sentence that survived): LISTED with file:line, for the
//            seat to rule one by one (live: keep; prose: rewrite and declare by hand)
// Concepts with no identifier (the adaptive tint, the earned darken) are declared by hand: --concepts <json> adds its
// names. --exact <json> carries the seat's exact list into DEL's `exact`: { name, why } reads an identifier exact only;
// { name, why, at } exempts one site read in context (H8-1). The output is DEL's { patch, names, exact } plus
// { derived, concepts, present }.
//   node declare-removed.mjs --patch <file.patch> --root <patched tree> [--concepts <names.json>] [--exact <rulings.json>] --out <decl.json>
import fs from "node:fs";
import path from "node:path";
import { cli } from "./lib.mjs";
import { textFiles } from "./deleted-mechanisms.mjs";

// The kinds, read from removed lines of src/ and demo/ files (a test's removed line names test API, not a mechanism).
// A template prefix (`--glass-blur-${level}`) is not a name, so a token followed by -, $ or a word character is skipped.
const ID = "[A-Za-z_$][\\w$]*";
const KINDS = [
  ["token", /--[a-z][a-z0-9-]*[a-z0-9](?![\w$-])/g],
  ["data- attribute", /(?<![\w-])data-[a-z][a-z0-9-]*[a-z0-9](?![\w$-])/g],
  ["export", /\b(?:export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|type|interface|enum)|function|type|interface|enum|class)\s+([A-Za-z_$][\w$]*)/g],
  ["prop", /^\s*([a-z][A-Za-z0-9]*)\?:\s/g],
  ["type or component", /(?<![\w$.-])[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)+\b/g],
  ["class or utility", /(?:(?<=[\s,{(]\.)|(?<=@utility\s+))[a-z][a-z0-9]*(?:-[a-z0-9]+)+(?![\w$-])/g],
];
// H8-2: a module-level declaration starts the removed line, unindented.
const MODULE_DECL = new RegExp(`^(?:export\\s+)?(?:const|let|var)\\s+(?:(${ID})|\\{([^}]*)\\}|\\[([^\\]]*)\\])`);
export function moduleConsts(line) {
  const m = line.match(MODULE_DECL);
  if (!m) return [];
  if (m[1]) return [m[1]];
  return (m[2] || m[3]).split(",").map((p) => p.trim().replace(/^\.\.\./, "").split(/\s*=\s*/)[0].split(/\s*:\s*/).pop()).filter((n) => new RegExp(`^${ID}$`).test(n));
}
export function removedIdentifiers(patchText) {
  const out = new Map();
  const put = (id, kind) => { if (!out.has(id)) out.set(id, kind); };
  let inScope = false, file = null;
  for (const l of patchText.split("\n")) {
    if (l.startsWith("diff --git ")) { const m = l.match(/^diff --git a\/((?:src|demo)\/\S+) b\//); inScope = !!m; file = m && m[1]; continue; }
    if (!inScope) continue;
    if (l.startsWith("deleted file mode")) { put(path.basename(file).replace(/\.[^.]+$/, ""), "module stem"); continue; }
    if (!l.startsWith("-") || l.startsWith("---")) continue;
    const body = l.slice(1);
    for (const [kind, re] of KINDS) for (const m of body.matchAll(re)) put(m[1] || m[0], kind);
    for (const id of moduleConsts(body)) put(id, "module const");
  }
  return [...out].sort(([x], [y]) => (x < y ? -1 : 1)).map(([id, kind]) => ({ id, kind }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ patch: { type: "string" }, root: { type: "string" }, concepts: { type: "string" }, exact: { type: "string" }, out: { type: "string" } });
  if (!a.patch || !a.root || !a.out) { console.log("usage: node declare-removed.mjs --patch <file.patch> --root <patched tree> [--concepts <names.json>] [--exact <rulings.json>] --out <decl.json>"); process.exit(2); }
  const patch = path.resolve(a.patch), cand = removedIdentifiers(fs.readFileSync(patch, "utf8"));
  const files = textFiles(path.resolve(a.root), [], ["src", "demo"]);
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
  for (const e of exact) if (!e.at && !names.includes(e.name)) { console.log(`exact-only ruling "${e.name}" names no declared identifier`); process.exit(2); }
  const doc = { patch: `${path.basename(patch)}: every identifier its removed lines name that the patched src/ and demo/ no longer name (declare-removed.mjs), plus ${concepts.length} concepts declared by hand${a.concepts ? " (" + path.basename(a.concepts) + ")" : ""}`, names, exact, derived, concepts, present };
  fs.writeFileSync(path.resolve(a.out), JSON.stringify(doc, null, 1) + "\n");
  const kinds = Object.entries(derived.reduce((o, d) => ((o[d.kind] = (o[d.kind] || 0) + 1), o), {})).map(([k, n]) => `${k} ${n}`).join(", ");
  console.log(`DECLARE ${path.basename(patch)}: ${cand.length} identifiers on removed lines · ${derived.length} absent from the patched tree (declared: ${kinds}) · ${present.length} still named (listed for the seat) · ${concepts.length} concepts · ${names.length} names, ${exact.filter((e) => !e.at).length} exact only, ${exact.filter((e) => e.at).length} sites → ${a.out}`);
  for (const d of derived) console.log(`  declared ${d.id} (${d.kind})`);
  for (const p of present) console.log(`  present ${p.id} (${p.kind}) ×${p.n} · ${p.where.join(" ")}`);
}
