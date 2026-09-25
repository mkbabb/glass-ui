// critique-B seat 2 · FD-5 over B's whole chain (S2..S32, the steps after the floor rows).
// Builds the classifier's inputs from the committed chain only: every frozen move list of a `moves` step, and a
// manifest naming every file a `row` step writes as an authored hunk (its reason = the step id). Then runs the
// tree's own FD-5 CLI: node <final>/scripts/structure/classify.mjs --base <S1 tree> --root <final> --moves … --manifest …
//   node fd5-chain.mjs --kit <B-kit> --base <tree after S1> --final <replayed tree> --out <dir>
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
const a = Object.fromEntries(process.argv.slice(2).reduce((o, v, i, all) => (v.startsWith("--") ? o.concat([[v.slice(2), all[i + 1]]]) : o), []));
mkdirSync(a.out, { recursive: true });
const seq = JSON.parse(readFileSync(join(a.kit, "frozen/SEQUENCE.json"), "utf8"));
const moves = [], authored = [];
for (const s of seq.steps) {
  if (s.kind === "moves") moves.push(join(a.kit, s.file));
  if (s.kind === "row") for (const f of Object.keys(JSON.parse(readFileSync(join(a.kit, s.file), "utf8")).files)) authored.push({ file: f, reason: s.id });
}
writeFileSync(join(a.out, "fd5-manifest.json"), JSON.stringify({ authored }, null, 1));
const r = spawnSync("node", [join(a.final, "scripts/structure/classify.mjs"), "--base", a.base, "--root", a.final, ...moves.flatMap((m) => ["--moves", m]), "--manifest", join(a.out, "fd5-manifest.json"), "--json", join(a.out, "fd5.json")], { encoding: "utf8", maxBuffer: 1 << 28 });
writeFileSync(join(a.out, "fd5.txt"), `${r.stdout}\n${r.stderr}`);
console.log(`exit ${r.status}; move lists ${moves.length}; authored files ${authored.length}`);
console.log(r.stdout.split("\n").slice(0, 1).join("\n"));
console.log(r.stdout.split("\n").filter((l) => l.startsWith("UNCLASSIFIED")).length, "UNCLASSIFIED");
