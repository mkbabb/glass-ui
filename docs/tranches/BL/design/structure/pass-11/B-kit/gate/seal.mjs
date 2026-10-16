// seal.mjs — the D1-B gate's CLI, pass 8 (B-kit/LAW.md "The gate"). The clauses are
// clauses.mjs, read in process through the module's door (seal/index.mjs).
//
//   node scripts/structure/seal/seal.mjs [--root R] [--verbose] [--json out] [--overlay plants.json]
//                                   [--write-pin pin.json]
// --write-pin writes the pin the gate measures now (a reviewed diff when it lands); the gate
// itself reads only records/seal-pin.json.
//
// Exit (P6-R3; pass 8, S-14): 0 GREEN, 1 RED, 2 no verdict. Every throw is no verdict, without
// exception: one while the gate's modules evaluate (a floor module that throws as it loads, a
// package.json that does not parse), one in the run (a missing pin, an overlay that is not
// JSON, a refused option), one while a record is written. So this file imports nothing but
// node's own: its first statement installs the guard, and the gate loads after it, by a
// dynamic import the guard covers. A caller that reads 1 as RED never reads a crash as one.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

process.on("uncaughtException", (e) => {
    console.error(`seal: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const args = process.argv.slice(2);
// B-11: the CLI takes exactly these options; any other (a `--pin`, a `--no-pin`) is refused,
// never ignored, so no caller can believe it judged against another pin
const FLAGS = new Set(["--verbose"]), VALUED = new Set(["--root", "--json", "--overlay", "--write-pin"]);
const { seal, PIN_PATH } = await import("./clauses.mjs");
for (let i = 0; i < args.length; i++) { if (VALUED.has(args[i])) { i++; continue; } if (!FLAGS.has(args[i])) throw new Error(`seal: unknown option ${args[i]} (the pin has one path, ${PIN_PATH})`); }
const opt = (k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const root = resolve(opt("--root", resolve(import.meta.dirname, "../../..")));
const r = seal(root, { overlay: opt("--overlay") ? JSON.parse(readFileSync(opt("--overlay"), "utf8")) : {} });
for (const [k, list] of Object.entries(r.V)) {
    console.log(`${list.length ? "FAIL" : "PASS"} ${k} ${list.length}`);
    for (const s of args.includes("--verbose") ? list : list.slice(0, 3)) console.log(`   ${s}`);
    if (!args.includes("--verbose") && list.length > 3) console.log(`   … ${list.length - 3} more`);
}
console.log(`seal ${JSON.stringify(r.meta)}: ${r.total ? `FAIL (${r.total})` : "PASS"}`);
if (opt("--write-pin")) writeFileSync(opt("--write-pin"), `${JSON.stringify(r.pinNow, null, 1)}\n`);
if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ counts: r.counts, meta: r.meta, V: r.V }, null, 1));
process.exitCode = r.total ? 1 : 0;
