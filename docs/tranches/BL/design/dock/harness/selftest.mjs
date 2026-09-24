// selftest.mjs: proves every witness CAN pass and CAN fail.
//
//   node selftest.mjs [--only W1,W3] [--engine chromium|webkit|all] [--out <dir>]
//
// For each witness: the hand-made fixture must exit 0 with every cell PASS, and each
// planted fault must exit non-zero with the named sub-check failing in the named
// cells, in every engine run. Exits non-zero if any expectation is violated.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { HERE, parseArgs, outDir } from "./lib.mjs";

const args = parseArgs();
const only = args.only ? String(args.only).split(",") : null;
const outRoot = args.out ?? process.env.DOCK_HARNESS_OUT;

// fault → [witness, cell-name pattern that must FAIL, failed sub-check (W3) or null]
const EXPECT = [
    ["W1", "lens", /fit·rest|expanded-rest|rail·rest/, null],
    ["W1", "squash", /morph·first-expand|morph·warm-collapse|morph·collapsed-rest/, null],
    ["W2", "scroller", /route2|route3|route4/, null],
    ["W2", "ringclip", /route1/, null],
    ["W3", "jump", /first-expand/, "continuity"],
    ["W3", "subpx", /warm-expand|content-add/, "landing"],
    ["W3", "late", /warm-expand/, "window"],
    ["W3", "owners", /warm-expand/, "owners"],
    ["W3", "overhang", /warm-expand/, "faces"],
    ["W3", "content", /content-add|content-remove/, "window"],
    ["W4", "nohyst", /no-threshold-bounce/, null],
    ["W4", "latch", /no-hover-latch/, null],
    ["W4", "menucollapse", /menu-holds/, null],
    ["W4", "noprm", /prm·posture-morph|prm·compact/, null],
    ["W4", "tapthrough", /tap-pins/, null],
    ["W5", "rimout", /expanded|collapsed/, null],
];
const SCRIPT = { W1: "w1-corner.mjs", W2: "w2-run.mjs", W3: "w3-morph.mjs", W4: "w4-state.mjs", W5: "w5-rim.mjs" };

const rows = [];
function run(w, fixture) {
    const argv = [path.join(HERE, SCRIPT[w]), "--fixture", fixture, "--engine", args.engine ?? "all"];
    if (outRoot) argv.push("--out", outRoot);
    const t0 = Date.now();
    const r = spawnSync(process.execPath, argv, { encoding: "utf8", maxBuffer: 1 << 26 });
    const dir = outDir({ out: outRoot, fixture }, w);
    const json = JSON.parse(fs.readFileSync(path.join(dir, `${w}.json`), "utf8"));
    return { code: r.status, cells: json.cells, ms: Date.now() - t0, tail: (r.stdout || "").trim().split("\n").at(-1) };
}

let bad = 0;
for (const w of Object.keys(SCRIPT)) {
    if (only && !only.includes(w)) continue;
    const p = run(w, "pass");
    const pOk = p.code === 0 && p.cells.every((c) => c.pass);
    rows.push({ witness: w, fixture: "pass", expect: "exit 0, all cells PASS", got: `exit ${p.code}, ${p.cells.filter((c) => c.pass).length}/${p.cells.length} PASS`, ok: pOk });
    if (!pOk) bad++;
    for (const [ew, fault, pat, check] of EXPECT) {
        if (ew !== w) continue;
        const f = run(w, fault);
        const hit = f.cells.filter((c) => pat.test(c.cell) && !c.pass && (!check || (c.failed ?? []).includes(check)));
        const engs = new Set(hit.map((c) => c.engine));
        const want = args.engine && args.engine !== "all" ? String(args.engine).split(",") : ["chromium", "webkit"];
        const ok = f.code !== 0 && want.every((e) => engs.has(e));
        rows.push({ witness: w, fixture: fault, expect: `exit ≠ 0; ${check ? check + " fails in " : ""}${pat.source}`, got: `exit ${f.code}, ${f.cells.filter((c) => !c.pass).length}/${f.cells.length} FAIL; matching ${hit.length} (${[...engs].join("+") || "none"})`, ok });
        if (!ok) bad++;
    }
}
for (const r of rows) console.log(`${r.ok ? "OK  " : "BAD "} ${r.witness}  ${r.fixture.padEnd(12)}  expect: ${r.expect}  ·  got: ${r.got}`);
console.log(`${bad ? "SELFTEST FAIL" : "SELFTEST PASS"}  ${rows.length - bad}/${rows.length} expectations hold`);
process.exitCode = bad ? 1 : 0;
