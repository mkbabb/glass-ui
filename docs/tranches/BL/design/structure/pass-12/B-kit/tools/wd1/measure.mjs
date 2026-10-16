#!/usr/bin/env node
// measure.mjs — P8-G7 (REGISTRY §P8-5): W-D.1 §0's five items measured on a tree, each with its
// count and file:line. It runs W-D.1's own probes (appendices A-C, copied verbatim beside this file:
// d1-probe.mjs, one-door.mjs, one-name.mjs) and adds the file:line each probe leaves out. A
// measurement, not a gate: it adds no checklist item. The tree must be built (one-door and one-name
// read dist/ through the floor's readSurface).
//   node tools/wd1/measure.mjs --root <built tree>
// Exit: 0 when the five are measured (whatever the counts), 2 on any throw.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.on("uncaughtException", (e) => {
    console.error(`wd1-measure: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1] ?? "");
const GRAPH = join(root, "scripts/structure/lib/graph/index.mjs"), SURFACE = join(root, "scripts/structure/surface.mjs");
for (const p of [GRAPH, SURFACE, join(root, "dist/tokens.js")]) if (!existsSync(p)) throw new Error(`wd1-measure: ${p} is missing (a migrated, built tree is required)`);
const run = (f, a) => { const r = spawnSync(process.execPath, [join(HERE, f), ...a], { encoding: "utf8", cwd: root, maxBuffer: 1 << 26 }); if (r.status !== 0 && r.status !== 1) throw new Error(`${f} exit ${r.status}: ${r.stderr}`); return r; };
const lineOf = (file, re) => readFileSync(join(root, file), "utf8").split("\n").flatMap((l, i) => (re.test(l) ? [`${file}:${i + 1}`] : []));

// 1 · the parent<->child value cycle (Appendix A VALUE-SCC), with the edges that close it
const A = run("d1-probe.mjs", [root, GRAPH]);
console.log("## 1 · value SCCs at module grain (Appendix A, VALUE-SCC)");
const sccLine = A.stdout.split("\n").find((l) => / VALUE-SCC /.test(l)) ?? "";
console.log(sccLine);
const { buildGraph } = await import(pathToFileURL(GRAPH).href);
const g = buildGraph(root);
const SLOT = new Set(["composables", "styles", "__tests__"]);
const VALUE = new Set(["import", "reexport", "reexport-star", "dynamic", "import-side-effect", "require"]);
const mod = (f) => { let d = posix.dirname(f); while (SLOT.has(posix.basename(d)) && d.includes("/")) d = posix.dirname(d); return d; };
const sccs = [...sccLine.matchAll(/\[\d+\] ([^|]+)/g)].map((m) => m[1].split(",").map((s) => s.trim()).filter(Boolean));
for (const c of sccs) {
    const set = new Set(c);
    const edges = g.edges.filter((e) => e.to && VALUE.has(e.kind) && e.from.startsWith("src/") && !/\/__tests__\//.test(e.from) && set.has(mod(e.from)) && set.has(mod(e.to)) && mod(e.from) !== mod(e.to));
    console.log(`  SCC [${c.join(", ")}]: ${edges.length} value edges between its modules`);
    for (const e of edges) console.log(`    ${e.from}:${e.line} -> ${e.to} (${e.kind})`);
}

// 2 · `Surface` names two symbols (Appendix C), with the declarations
const C = run("one-name.mjs", [root, SURFACE]);
console.log("\n## 2 · one public name, one symbol (Appendix C)");
console.log(C.stdout.trim());
const decl = g.tree.files.filter((f) => f.startsWith("src/") && /\.(ts|vue)$/.test(f) && !/\/__tests__\//.test(f)).flatMap((f) => lineOf(f, /^export (type|interface) Surface\b|^export \{[^}]*\bSurface\b[^}]*\}|^\s*Surface,?\s*$|export type \{[^}]*\bSurface\b/));
console.log(`  declarations and re-exports naming Surface: ${decl.length}`);
for (const d of decl) console.log(`    ${d}`);
const B = run("one-door.mjs", [root, SURFACE]);
console.log("  one-door (Appendix B):");
for (const l of B.stdout.trim().split("\n")) console.log(`    ${l}`);

// 3 · bare type aliases (Appendix A, ALIAS-TYPE), with lines
console.log("\n## 3 · bare type aliases of library types (Appendix A, ALIAS-TYPE)");
const aliasLine = A.stdout.split("\n").find((l) => / ALIAS-TYPE /.test(l)) ?? "";
console.log(aliasLine.split(" :: ")[0]);
for (const a of (aliasLine.split(" :: ")[1] ?? "").split("; ").filter(Boolean)) {
    const [file, rest] = a.split(": ");
    const [x, y] = rest.split(" = ");
    console.log(`    ${lineOf(file, new RegExp(`^export type ${x} = ${y};$`)).join(", ")}: ${x} = ${y}`);
}

// 4 · the MIGRATION heading the chain writes
console.log("\n## 4 · MIGRATION.md section headings");
const heads = lineOf("MIGRATION.md", /^## /);
const bare = heads.filter((h) => /^## \d+\.\d+\.\d+\s*$/.test(readFileSync(join(root, "MIGRATION.md"), "utf8").split("\n")[Number(h.split(":")[1]) - 1]));
const notBare = heads.filter((h) => !bare.includes(h));
console.log(`  ${heads.length} headings; not a bare version: ${notBare.length}`);
for (const h of notBare) console.log(`    ${h}  ${readFileSync(join(root, "MIGRATION.md"), "utf8").split("\n")[Number(h.split(":")[1]) - 1]}`);
const tranche = lineOf("MIGRATION.md", /\bBL\b|\btranche\b/i);
console.log(`  lines naming a tranche id (BL) or "tranche": ${tranche.length}${tranche.length ? ` (first ${tranche.slice(0, 5).join(", ")})` : ""}`);

// 5 · the consumer preset in ./tokens (W-D.1 D1-G7's own command, and the source lines)
console.log("\n## 5 · chartHeights / chartMargin / chartColors in ./tokens");
const tok = await import(pathToFileURL(join(root, "dist/tokens.js")).href);
const present = ["chartHeights", "chartMargin", "chartColors"].filter((k) => k in tok);
console.log(`  dist/tokens.js exports ${present.length} of 3: ${present.join(", ") || "none"} (D1-G7 ${present.length ? "RED exit 1" : "exit 0"})`);
const src = g.tree.files.filter((f) => f.startsWith("src/") && /\.(ts|vue)$/.test(f)).flatMap((f) => lineOf(f, /export const (chartHeights|chartMargin|chartColors)\b/));
for (const s of src) console.log(`    ${s}`);
const readers = g.tree.files.filter((f) => /^(src|demo|tests|tests-visual)\//.test(f) && /\.(ts|vue|mjs|js)$/.test(f)).flatMap((f) => lineOf(f, /\b(chartHeights|chartMargin|chartColors)\b/)).filter((l) => !src.includes(l));
console.log(`  readers in src, demo, tests, tests-visual other than the declarations: ${readers.length}${readers.length ? ` (${readers.join(", ")})` : ""}`);
