// run.mjs: every witness against one build, then a table.
//
//   node run.mjs --build <dir> [--engine …] [--adapter <file>] [--out <dir>] [--only W1,W2]
//
// Witnesses run one after another (W3's frame timing is load-sensitive). Exits
// non-zero when any witness fails.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { HERE, parseArgs, outDir } from "./lib.mjs";

const args = parseArgs();
if (!args.build) { console.error("usage: node run.mjs --build <dir> [--engine …] [--adapter <file>] [--out <dir>]"); process.exit(2); }
const SCRIPT = { W1: "w1-corner.mjs", W2: "w2-run.mjs", W3: "w3-morph.mjs", W4: "w4-state.mjs", W5: "w5-rim.mjs" };
const only = args.only ? String(args.only).split(",") : Object.keys(SCRIPT);
const pass = [];
for (const w of only) {
    const argv = [path.join(HERE, SCRIPT[w]), "--build", args.build, "--engine", args.engine ?? "all"];
    for (const k of ["adapter", "out"]) if (args[k]) argv.push("--" + k, args[k]);
    if (args["no-webkit-shim"]) argv.push("--no-webkit-shim");
    const r = spawnSync(process.execPath, argv, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], maxBuffer: 1 << 26 });
    process.stdout.write(r.stdout);
    const json = JSON.parse(fs.readFileSync(path.join(outDir({ out: args.out, build: args.build }, w), `${w}.json`), "utf8"));
    pass.push({ w, code: r.status, n: json.cells.length, ok: json.cells.filter((c) => c.pass).length });
}
console.log("\nwitness  verdict  cells passing");
for (const p of pass) console.log(`${p.w}       ${p.code === 0 ? "PASS" : "FAIL"}     ${p.ok}/${p.n}`);
process.exitCode = pass.every((p) => p.code === 0) ? 0 : 1;
