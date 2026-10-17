// reds.mjs · the re-run rule (H5-9, pass-5/H5.md): which cells of a witness run are re-run, as one anchored regex.
//
//   node reds.mjs <witness.json> [<witness.json> …]      prints the --cells regex ('' when nothing is red)
//   node reds.mjs --selftest                              the runner's plants (no browser)
//
// The pass-4 rule grepped the LOG for lines "FAIL  <W>  <engine>  <cell>". Two defects followed:
//   · a W3 cell that turns red when the pixel faces pass merges into it prints "FAIL  W3  (faces merged)  <cell>",
//     with no engine, so it was never re-run and its verdict stood on one run (G-crit §6.4);
//   · an exact-name re-run ('^(case·rotated)$') drops the cell's control ('case·rotated·control'), so a probe that
//     judges a cell against its control re-ran with no bound (B′-crit §6.3).
// The rule now reads the witness JSON (the cell's own verdict, after any merge) and names every counted FAIL cell
// (not UNMEASURED, OWNER-BLOCKED or RECORD), engine tags stripped, each with its optional control:
//   ^(<cell>(·control)?|…)$
import fs from "node:fs";
import path from "node:path";
import { HERE } from "./lib.mjs";

const esc = (s) => s.replace(/[\][(){}.*+?^$|\\]/g, "\\$&");
const strip = (n) => n.replace(/(\+shim|-unshimmed)$/, "").replace(/·control$/, "");
export function redsOf(jsons) {
    const names = new Set();
    for (const j of jsons) for (const c of j.cells ?? []) if (!c.pass && !c.unmeasured && !c.ownerBlocked && !c.record && !/^__/.test(c.cell)) names.add(strip(c.cell));
    return names.size ? `^(${[...names].sort().map((n) => `${esc(n)}(·control)?`).join("|")})$` : "";
}
/** the pass-4 rule, kept only as the plant's control */
export function redsOfLogPass4(log) {
    const out = new Set();
    for (const l of log.split("\n")) { const m = /^FAIL  [A-Z0-9]+  (Chromium|Playwright WebKit)  (\S+)/.exec(l); if (m) out.add(m[2].replace(/(\+shim|-unshimmed)$/, "")); }
    return out.size ? `^(${[...out].sort().map(esc).join("|")})$` : "";
}

if (process.argv[2] === "--selftest") {
    const P = path.join(HERE, "plants");
    const rows = [];
    const ok = (name, cond, got) => { rows.push(cond); console.log(`${cond ? "OK  " : "BAD "} RUN  ${name}  ${got}`); };
    // 1 · a merged faces red is re-run (the pass-4 log rule misses it)
    const merged = JSON.parse(fs.readFileSync(path.join(P, "reds-merged.json"), "utf8"));
    const rx = new RegExp(redsOf([merged]));
    const oldRx = redsOfLogPass4(fs.readFileSync(path.join(P, "reds-merged.log"), "utf8"));
    ok("merged-red", rx.test("swap-long") && rx.test("retarget·40"), `JSON rule: ${rx.source}`);
    ok("merged-red-control", !oldRx || !new RegExp(oldRx).test("swap-long"), `the pass-4 log rule (plant): ${oldRx || "''"} misses swap-long`);
    // 2 · a re-run keeps the control
    const cases = JSON.parse(fs.readFileSync(path.join(P, "reds-control.json"), "utf8"));
    const cx = new RegExp(redsOf([cases]));
    ok("control-kept", cx.test("case·rotated") && cx.test("case·rotated·control") && !cx.test("case·scaled"), `JSON rule: ${cx.source}`);
    ok("control-kept-plant", !new RegExp("^(case·rotated)$").test("case·rotated·control"), "the pass-4 exact-name regex (plant) drops case·rotated·control");
    // 3 · the main stage's W3 runs its pixel faces pass
    const plan = fs.readFileSync(path.join(HERE, "battery.sh"), "utf8");
    const w3 = (/\bW3\) echo ([^;]*);;/.exec(plan) ?? [])[1] ?? "";
    ok("main-faces", /w3-morph\.mjs/.test(w3) && !/--no-faces/.test(w3), `battery.sh W3 → ${w3 || "(none)"}`);
    // 4 · OWNER-BLOCKED, UNMEASURED and RECORD cells are not re-run; a passing cell is not either
    const quiet = redsOf([{ cells: [{ cell: "a", pass: false, ownerBlocked: "Q-4" }, { cell: "b", pass: false, unmeasured: true }, { cell: "c", pass: true }, { cell: "d", pass: false, record: true }] }]);
    ok("counted-only", quiet === "", `→ '${quiet}'`);
    console.log(`${rows.every(Boolean) ? "RUN SELFTEST PASS" : "RUN SELFTEST FAIL"}  ${rows.filter(Boolean).length}/${rows.length}`);
    process.exitCode = rows.every(Boolean) ? 0 : 1;
} else if (process.argv[1] && path.resolve(process.argv[1]) === path.join(HERE, "reds.mjs")) {
    const js = process.argv.slice(2).map((f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return { cells: [] }; } });
    process.stdout.write(redsOf(js));
}
