// W-C.2 prototype: the E-10 invariant (no tranche meta in live artefacts) and the prose-style arm.
// META (the E-10 grammar, a spelling set): tranche row refs (`BK #17`), dated brackets (`[2026-09-22`),
//   strike tombstones (`~~`), ⊕ markers, tranche wave ids (`AX.W13`, `BH.B0-W0`, `W-DISSOLVE`), finding and
//   inbound ids (`O-62`, `RT-28D`, `TR#30`, `L09-16`, `R8-02-01`), deleted `proof:*` script names, backticked
//   commit shas, cites of the deleted CLAUDE.md, and cites of tranche records (`docs/tranches/`).
//   Scope: tracked src, demo, tests, tests-visual, scripts, .github, root config and docs (README, MIGRATION,
//   DESIGN, CHANGELOG, CONTRIBUTING, .gitignore, vite*.ts, vitest*.ts, tsconfig*.json, package.json),
//   docs/{canon,design,instructions,audits}, and dist/**/*.d.ts plus dist/**/*.js when dist/ exists.
//   Excluded: docs/tranches and docs/archive (records), tests/_support/fixtures (the detector's synthetic plants).
// STYLE (consumer-facing prose: README, MIGRATION, DESIGN, CONTRIBUTING, docs/canon, docs/design, src/**/*.md):
//   a spaced em dash, a first-person decree, an ALL-CAPS emphasis word from the lexicon below (outside backticks).
// Usage: node no-meta.mjs [root] [--list]. Exit 1 when either arm has a hit.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
const root = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : ".");
const list = process.argv.includes("--list");
const tracked = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" }).split("\n").filter(Boolean);
const TEXT = /\.(ts|tsx|vue|css|mjs|cjs|js|json|md|yml|yaml|sh|html)$|^\.gitignore$/;
const inScope = (f) => TEXT.test(f) && !/^docs\/(tranches|archive|precepts|consumer-evidence)\//.test(f) && !/^tests\/_support\/fixtures\//.test(f) && !/package-lock\.json$/.test(f);
let files = tracked.filter(inScope);
const walk = (d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const dist = walk(path.join(root, "dist")).filter((f) => /\.(d\.ts|js)$/.test(f)).map((f) => path.relative(root, f));
files = files.concat(dist);
const META = [
  ["row-ref", /\b(?:A[A-Z]|B[A-Z])\s?#\d+/g], ["dated-bracket", /\[20\d\d-\d\d-\d\d\b/g], ["strike", /~~/g], ["oplus", /⊕/g],
  ["wave-id", /\b(?:[A-Z]{1,2}|IOS27-MICRO)\.(?:W|B|P)[0-9][A-Za-z0-9-]*|\bW-[A-Z][A-Z0-9-]{2,}/g],
  ["finding-id", /\bO-\d{2}\b|\bRT-\d+[A-Z]?\b|\bTR#\d+|\bL\d\d[ab]?-(?:F)?\d\d\b|\bR\d{1,2}-\d\d-\d\d\b|\bUIA-[A-Z]+-\d+\b/g],
  ["proof-script", /\bproof:[a-z][a-z0-9-]*/g], ["sha", /`[0-9a-f]{8}`/g], ["claude-md", /CLAUDE\.md/g], ["record-cite", /docs\/tranches\//g],
];
const PROSE = tracked.filter((f) => /^(README|MIGRATION|DESIGN|CONTRIBUTING)\.md$/.test(f) || /^docs\/(canon|design)\/.*\.md$/.test(f) || /^src\/.*\.md$/.test(f));
const LEX = "NEVER|ALWAYS|MUST|ONLY|NOT|NO|EVERY|ALL|NONE|ZERO|ONE|TWO|THE|IS|ARE|WAS|BOTH|EXACTLY|SINGLE|CANONICAL|LIVE|DELETED|RETIRED|STRUCK|OWED|ROUTED|DEAD|HERE|THIS|THAT|OR|AND|BUT|NOW|STILL|ALREADY|OWN|SAME|WHOLE|REAL|TRUE|FALSE|BEFORE|AFTER|ANY|IS|DOES|CANNOT|WITHOUT";
const STYLE = [["spaced-em-dash", / — /g], ["first-person", /\bI (?:promulgate|decree|rule|ratify|declare)\b/g], ["caps-emphasis", new RegExp(`\\b(?:${LEX})\\b`, "g")]];
const hits = { meta: [], style: [] }; const byClass = {};
for (const f of files) {
  const s = fs.readFileSync(path.join(root, f), "utf8");
  s.split("\n").forEach((line, i) => { for (const [k, re] of META) for (const m of line.matchAll(re)) { hits.meta.push(`${f}:${i + 1} ${k} ${m[0]}`); byClass[k] = (byClass[k] ?? 0) + 1; } });
}
for (const f of PROSE) {
  const s = fs.readFileSync(path.join(root, f), "utf8").replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, " "));
  s.split("\n").forEach((line, i) => { const bare = line.replace(/`[^`]*`/g, " "); for (const [k, re] of STYLE) for (const m of bare.matchAll(re)) { hits.style.push(`${f}:${i + 1} ${k} ${m[0]}`); byClass[k] = (byClass[k] ?? 0) + 1; } });
}
const fileCount = (a) => new Set(a.map((x) => x.split(":")[0])).size;
const tree = (a, pre) => a.filter((x) => x.startsWith(pre)).length;
console.log(`no-meta: META ${hits.meta.length} hits in ${fileCount(hits.meta)} files (src ${tree(hits.meta, "src/")}, demo ${tree(hits.meta, "demo/")}, tests ${tree(hits.meta, "tests/")}, tests-visual ${tree(hits.meta, "tests-visual/")}, scripts ${tree(hits.meta, "scripts/")}, dist ${tree(hits.meta, "dist/")}, MIGRATION ${tree(hits.meta, "MIGRATION.md")}, other ${hits.meta.length - ["src/", "demo/", "tests/", "tests-visual/", "scripts/", "dist/", "MIGRATION.md"].reduce((n, p) => n + tree(hits.meta, p), 0)}) · STYLE ${hits.style.length} hits in ${fileCount(hits.style)} files`);
console.log(JSON.stringify(byClass));
if (list) console.log([...hits.meta, ...hits.style].join("\n"));
process.exitCode = hits.meta.length + hits.style.length ? 1 : 0;
