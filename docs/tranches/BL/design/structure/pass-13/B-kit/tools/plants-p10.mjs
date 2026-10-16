#!/usr/bin/env node
// plants-p10.mjs — pass 10's plant battery (REGISTRY §P9-6.4). Nothing in the tree it reads is left
// changed: gate plants are in-memory overlays (or an --overlay file for the CLI and the probe); report
// plants are rewritten copies under the OS temp dir, which it removes.
//   node tools/plants-p10.mjs --root <migrated, built tree> --floor-base <floor-base tree> --reports <dir
//        holding base.json, base-rekeyed.json, route.json, reruns/> --out <json>
// Plants:
//   INPUT  P9-G1, LAW §14: every input argument of every kit judge, each fed a missing file, a non-JSON
//          file, `{}`, `[]`, a report of another kind, and (where the argument has one) a report of the
//          right schema but the wrong kind: each exits 2 with `<tool>: no verdict`. Directory and output
//          arguments get a missing directory, a directory that names no tree, and an unwritable path.
//          Controls exit 0.
//   LEAK   P9-G1: a keyframes.js leak in ./motion-core with each degenerate --base never exits 0 (each
//          exits 2); the same leak with the floor-base report, and with no --base, exits 1
//   ROW    P9-G2, P8-R3 as ruled: a peer-less declaration row, a whitespace-only Peer cell, and a row
//          naming a peer but no subpath: the seal CLI and the probe each exit 2; in process, seal()
//          throws; a continuation line (no subpath, no peer) reads as before (control)
//   CYCLE  P9-R1 (a): a parent<->child value cycle planted in another unit reads B4 RED (the module
//          arm); the same reverse edge as a type-only import reads no count; the fourier-field cycle
//          S74 cured, re-planted (renderer/mint.ts value-reading a new parent-level file), reads RED
//   GATE   B4's reader (seal/cycles.mjs) and the tree model (lib/tree/index.mjs, lib/tree/tree.mjs) throwing
//          as they load: the seal CLI exits 2
//   MIGR   P9-R2 (a): a tranche id written into the chain's MIGRATION text reads RED by C2-G1
//          (tools/wc2/chain-text.mjs: `BL #3`, a `docs/tranches/BL/` cite) and by its tranche arm (a
//          bare "(BL)"); the heading put back to `## UNRELEASED — the structure cut (BL)` reads RED by
//          C2-G4 (a new miss); the route's own text reads GREEN (control)
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.on("uncaughtException", (e) => {
    console.error(`plants-p10: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { arg } = await import("../lib/floor.mjs");
const args = process.argv.slice(2);
for (const k of ["--root", "--reports", "--out", "--floor-base"]) if (!arg(args, k)) throw new Error(`plants-p10: ${k} is required`);
const root = resolve(arg(args, "--root")), reports = resolve(arg(args, "--reports")), out = resolve(arg(args, "--out")), floorBase = resolve(arg(args, "--floor-base"));
const CLI = join(root, "scripts/structure/seal/seal.mjs");
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const read = (p) => readFileSync(join(root, p), "utf8");
const results = [];
const note = (r) => { results.push(r); console.log(`${r.ok ? "PASS" : "FAIL"} ${r.kind} ${r.id}: ${r.read}`); };
const tmp = mkdtempSync(join(tmpdir(), "p10-plants-"));
const node = (cli, a) => spawnSync(process.execPath, [cli, ...a], { encoding: "utf8", maxBuffer: 1 << 27 });
const first = (t) => (t.split("\n").find((l) => l.trim()) ?? "").slice(0, 170);
const last = (t) => (t.trim().split("\n").at(-1) ?? "").slice(0, 170);
const T = (name) => join(KIT, "tools", name);
const w = (name, doc) => { const p = join(tmp, name); writeFileSync(p, typeof doc === "string" ? doc : JSON.stringify(doc)); return p; };
const judge = (kind, id, cli, a, expect, msg) => {
    const run = node(cli, a);
    const tool = cli.split("/").pop().replace(/\.mjs$/, "");
    const loud = expect !== 2 || (run.stderr.includes(`${tool}: no verdict`) && (!msg || run.stderr.includes(msg)));
    note({ kind, id, expect, exit: run.status, ok: run.status === expect && loud, read: `exit ${run.status} (expect ${expect})${expect === 2 ? ` · ${first(run.stderr.replace(/^.*?no verdict: (Error: )?/s, ""))}` : ` · ${last(run.stdout)}`}` });
    return run;
};

try {
    const BASE = join(reports, "base.json"), BR = join(reports, "base-rekeyed.json"), RT = join(reports, "route.json");
    const B = JSON.parse(readFileSync(BR, "utf8")), R = JSON.parse(readFileSync(RT, "utf8")), B0 = JSON.parse(readFileSync(BASE, "utf8"));
    const PBASE = join(KIT, "results/p13/peer-closure-base.json");
    const PB = JSON.parse(readFileSync(PBASE, "utf8"));
    const missing = join(tmp, "no-such-input.json");
    const bad = w("bad.json", "{ not json"), obj = w("obj.json", {}), arr = w("arr.json", []);
    const nodir = join(tmp, "no-such-dir"), notree = join(tmp, "not-a-tree"); mkdirSync(notree);
    const unwritable = join(tmp, "no-such-dir", "deeper", "out.json");
    // the probe's own non-floor report (its run on the migrated tree), produced here
    const ownRun = node(T("peer-closure.mjs"), ["--root", root, "--base", PBASE, "--json", join(tmp, "probe-route.json")]);
    if (ownRun.status !== 0) throw new Error(`plants-p10: the probe on the built tree exits ${ownRun.status}: ${ownRun.stderr}`);
    const ownReport = join(tmp, "probe-route.json");
    const degenerate = [["a missing file", missing, "ENOENT"], ["a non-JSON file", bad, "JSON"], ["{}", obj, null], ["[]", arr, null]];
    const reruns = (await import("node:fs")).readdirSync(join(reports, "reruns"));
    const baseRerunRaw = join(reports, "reruns", reruns.find((f) => /^base-.*\d\.json$/.test(f)));
    const baseRerunKeyed = join(reports, "reruns", reruns.find((f) => /^base-.*\.rekeyed\.json$/.test(f)));
    const routeRerun = join(reports, "reruns", reruns.find((f) => /^route-.*\.json$/.test(f)));

    // ---- INPUT: browser-tally, each of its four report arguments
    const TALLY = T("browser-tally.mjs");
    const tallyArgs = (slot, f) => {
        const a = { "--base": BR, "--route": RT, "--base-rerun": null, "--route-rerun": null, [slot]: f };
        return Object.entries(a).flatMap(([k, v]) => (v ? [k, v] : []));
    };
    const noStatus = w("route-no-status.json", { ...R, results: [{ ...R.results[0], status: undefined }, ...R.results.slice(1)] });
    const noBands = w("route-no-bands.json", { ...R, bands: undefined });
    for (const slot of ["--base", "--route", "--base-rerun", "--route-rerun"]) {
        for (const [what, f, msg] of degenerate) judge("INPUT", `tally ${slot}: ${what}`, TALLY, tallyArgs(slot, f), 2, msg);
        judge("INPUT", `tally ${slot}: a report of another kind (the probe's floor-base report)`, TALLY, tallyArgs(slot, PBASE), 2, "not browser-seat/2");
        judge("INPUT", `tally ${slot}: a result with no status`, TALLY, tallyArgs(slot, noStatus), 2, "without spec, title and status");
        judge("INPUT", `tally ${slot}: no band table`, TALLY, tallyArgs(slot, noBands), 2, "no band table");
    }
    judge("INPUT", "tally --base: right schema, wrong kind (the base run not re-keyed)", TALLY, tallyArgs("--base", BASE), 2, "re-key the base");
    judge("INPUT", "tally --base-rerun: right schema, wrong kind (a base rerun not re-keyed)", TALLY, tallyArgs("--base-rerun", baseRerunRaw), 2, "re-key it");
    judge("INPUT", "tally --route-rerun: right schema, wrong kind (the base run, keyed from tests-visual)", TALLY, tallyArgs("--route-rerun", BASE), 2, "re-key it");
    judge("INPUT", "tally: the committed reports with one rerun of each kind (control)", TALLY, ["--base", BR, "--route", RT, "--base-rerun", baseRerunKeyed, "--route-rerun", routeRerun], 0);

    // ---- INPUT: rekey <base report> <tree> <out>
    const REKEY = T("rekey.mjs");
    for (const [what, f, msg] of degenerate) judge("INPUT", `rekey <base>: ${what}`, REKEY, [f, root, join(tmp, "rk.json")], 2, msg);
    judge("INPUT", "rekey <base>: a report of another kind (the probe's floor-base report)", REKEY, [PBASE, root, join(tmp, "rk.json")], 2, "browser-seat/2");
    judge("INPUT", "rekey <base>: right schema, wrong kind (a report it already re-keyed)", REKEY, [BR, root, join(tmp, "rk.json")], 2, "already re-keyed");
    judge("INPUT", "rekey <base>: a result with no status", REKEY, [w("b0-no-status.json", { ...B0, results: [{ ...B0.results[0], status: undefined }, ...B0.results.slice(1)] }), root, join(tmp, "rk.json")], 2, "without spec, title and status");
    judge("INPUT", "rekey <tree>: a missing directory", REKEY, [BASE, nodir, join(tmp, "rk.json")], 2, "holds no package.json");
    judge("INPUT", "rekey <tree>: a directory that names no tree", REKEY, [BASE, notree, join(tmp, "rk.json")], 2, "holds no package.json");
    judge("INPUT", "rekey <out>: an unwritable path", REKEY, [BASE, root, unwritable], 2, "ENOENT");
    judge("INPUT", "rekey: the committed base run (control)", REKEY, [BASE, root, join(tmp, "rk.json")], 0);

    // ---- INPUT: browser-select --root <tree> --out <dir>
    const SELECT = T("browser-select.mjs");
    judge("INPUT", "select --root: a missing directory", SELECT, ["--root", nodir, "--out", join(tmp, "sel-a")], 2, "holds no package.json");
    judge("INPUT", "select --root: a directory that names no tree", SELECT, ["--root", notree, "--out", join(tmp, "sel-b")], 2, "holds no package.json");
    writeFileSync(join(tmp, "a-file"), "x");
    judge("INPUT", "select --out: a path under a file (unwritable)", SELECT, ["--root", root, "--out", join(tmp, "a-file", "sel")], 2, null);
    judge("INPUT", "select: the migrated tree (control)", SELECT, ["--root", root, "--out", join(tmp, "sel-ok")], 0);

    // ---- INPUT: peer-closure --root, --base, --overlay, --table, --json
    const PROBE = T("peer-closure.mjs");
    judge("INPUT", "probe --root: a missing directory", PROBE, ["--root", nodir, "--base", PBASE], 2, null);
    judge("INPUT", "probe --root: a directory that names no tree", PROBE, ["--root", notree, "--base", PBASE], 2, null);
    for (const [what, f, msg] of degenerate) judge("INPUT", `probe --base: ${what}`, PROBE, ["--root", root, "--base", f], 2, msg);
    const baseKinds = [
        ["{\"entries\":{}}", w("pb-entries-empty.json", { entries: {} }), "not this probe's floor-base report"],
        ["a report of another kind (the route's browser report)", RT, "not this probe's floor-base report"],
        ["right schema, wrong kind (the probe's own non-floor report)", ownReport, "not this probe's floor-base report"],
        ["a floor-base report with no entries", w("pb-no-entries.json", { ...PB, entries: {} }), "holds no entries"],
        ["a floor-base report missing ./motion-core", w("pb-no-mc.json", { ...PB, entries: { ".": PB.entries["."] } }), "holds no broken arms for ./motion-core"],
        ["a floor-base report whose ./motion-core lacks the dist arm", w("pb-no-dist.json", { ...PB, entries: { ...PB.entries, "./motion-core": { ...PB.entries["./motion-core"], broken: { names: [], files: [] } } } }), "broken.dist is not a list"],
    ];
    for (const [what, f, msg] of baseKinds) judge("INPUT", `probe --base: ${what}`, PROBE, ["--root", root, "--base", f], 2, msg);
    for (const [what, f, msg] of degenerate) judge("INPUT", `probe --overlay: ${what}`, PROBE, ["--root", root, "--base", PBASE, "--overlay", f], 2, msg ?? "--overlay");
    judge("INPUT", "probe --overlay: a path mapped to a number", PROBE, ["--root", root, "--base", PBASE, "--overlay", w("ov-num.json", { "src/zq.ts": 1 })], 2, "is not text");
    judge("INPUT", "probe --table: a missing file", PROBE, ["--root", root, "--base", PBASE, "--table", "src/zq10-no-table.md"], 2, null);
    judge("INPUT", "probe --table: a file with no table (package.json)", PROBE, ["--root", root, "--base", PBASE, "--table", "package.json"], 2, "Heavy-peer exclusions");
    judge("INPUT", "probe --json: an unwritable path", PROBE, ["--root", root, "--base", PBASE, "--json", unwritable], 2, "ENOENT");
    judge("INPUT", "probe: the built tree with the floor-base report (control)", PROBE, ["--root", root, "--base", PBASE], 0);

    // ---- LEAK: a keyframes.js leak in ./motion-core under each degenerate --base
    const MC = "src/composables/motion/core/index.ts";
    const leak = w("leak.json", { "src/composables/motion/core/zq10Kf.ts": 'import * as zq10Kf from "@mkbabb/keyframes.js";\nexport const zq10KfLeak = (): unknown => zq10Kf;\n', [MC]: `${read(MC)}export * from "./zq10Kf";\n` });
    const leakBases = [...degenerate.map(([what, f]) => [what, f]), ...baseKinds.map(([what, f]) => [what, f])];
    for (const [what, f] of leakBases) {
        const run = node(PROBE, ["--root", root, "--base", f, "--overlay", leak]);
        note({ kind: "LEAK", id: `a ./motion-core leak with --base ${what}`, exit: run.status, ok: run.status === 2, read: `exit ${run.status} (expect 2, never 0) · ${first(run.stderr.replace(/^.*?no verdict: (Error: )?/s, "")) || last(run.stdout)}` });
    }
    for (const [what, a] of [["the floor-base report", ["--base", PBASE]], ["no --base", []]]) {
        const run = node(PROBE, ["--root", root, ...a, "--overlay", leak]);
        const line = run.stdout.split("\n").find((l) => /\.\/motion-core/.test(l) && /BROKEN/.test(l)) ?? "";
        note({ kind: "LEAK", id: `a ./motion-core leak with ${what}`, exit: run.status, ok: run.status === 1 && /keyframes/.test(run.stdout), read: `exit ${run.status} (expect 1) · ${line.slice(0, 160)}` });
    }

    // ---- ROW: the declarations table's rows (P8-R3 as ruled, P9-G2)
    const README = "src/README.md";
    const text = read(README);
    const row = /^( *\S.*?@mkbabb\/glass-ui\/motion-core)( +)(\(none.*)$/m.exec(text);
    if (!row) throw new Error("plants-p10: src/README.md holds no ./motion-core row");
    const rowPlants = [
        ["a peer-less row (the Peer cell cut)", row[1], "empty Peer cell"],
        ["a whitespace-only Peer cell", `${row[1]}${row[2]}    `, "empty Peer cell"],
        ["a row naming a peer but no subpath", `${" ".repeat(row[1].length)}${row[2]}${row[3]}`, "names a peer but no subpath"],
        ["a row naming a heavy peer but no subpath", `${"zq10Thing".padEnd(row[1].length)}${row[2]}@mkbabb/keyframes.js`, "names a peer but no subpath"],
    ];
    for (const [what, line, msg] of rowPlants) {
        const ov = { [README]: text.replace(row[0], line) };
        let thrown = null; try { seal(root, { overlay: ov }); } catch (e) { thrown = e.message; }
        note({ kind: "ROW", id: `seal(): ${what}`, ok: !!thrown && thrown.includes(msg), read: thrown ? `throws · ${thrown.slice(0, 150)}` : "no throw" });
        const f = w(`row-${results.length}.json`, ov);
        const c = node(CLI, ["--root", root, "--overlay", f]);
        note({ kind: "ROW", id: `seal CLI: ${what}`, exit: c.status, ok: c.status === 2 && c.stderr.includes(msg), read: `exit ${c.status} (expect 2) · ${first(c.stderr.replace(/^.*?no verdict: (Error: )?/s, ""))}` });
        judge("ROW", `probe: ${what}`, PROBE, ["--root", root, "--base", PBASE, "--overlay", f], 2, msg);
    }
    const clean = seal(root, {});
    {
        // control: a continuation line of a Symbol(s) cell (no subpath, no peer) inside the table
        const cont = text.replace(row[0], `${row[0]}\n//   zq10Continued,`.replace(/^\/\/ {3}/m, row[0].startsWith("//") ? "//   " : "  "));
        let r = null, thrown = null; try { r = seal(root, { overlay: { [README]: cont } }); } catch (e) { thrown = e.message; }
        const red = r ? Object.keys(r.counts).filter((k) => r.counts[k] > clean.counts[k]) : [];
        note({ kind: "ROW", id: "control: a Symbol(s) continuation line in the table", ok: !thrown && !red.length, read: thrown ? `throws · ${thrown.slice(0, 120)}` : `red [${red.join(",")}]` });
    }

    // ---- CYCLE: B4's module arm (P9-R1 (a))
    const cyc = (id, ov, expectRed, needle) => {
        const r = seal(root, { overlay: ov });
        const added = r.V.B4.filter((l) => !clean.V.B4.includes(l));
        const hit = added.filter((l) => l.startsWith("value SCC at module grain") && (!needle || l.includes(needle)));
        note({ kind: "CYCLE", id, ok: expectRed ? hit.length > 0 : r.counts.B4 === clean.counts.B4, read: expectRed ? `B4 ${clean.counts.B4} -> ${r.counts.B4} · ${(hit[0] ?? added[0] ?? "no new B4 line").slice(0, 170)}` : `B4 ${clean.counts.B4} -> ${r.counts.B4}${added.length ? ` · ${added[0].slice(0, 150)}` : ""}` });
    };
    // another unit: aurora reads its config module through the module's door (Aurora.vue,
    // aurora-config.ts). A new parent-level file that reads nothing, value-read by a file of config/,
    // closes aurora <-> aurora/config at module grain and no sibling cycle (the new file reads nothing,
    // so the sibling arm sees one edge). The same reverse edge as a type-only import loads nothing:
    // no count in either arm. (A parent-level file that itself reads the child, aurora-config.ts, would
    // close a sibling cycle, value or type, which LAW §8's sibling arm counts: the run-1 control read so.)
    {
        const child = "src/components/aurora/config", parentFile = "src/components/aurora/zq10Base.ts";
        const base = { [parentFile]: "export const zq10Base = 1;\n" };
        cyc(`a parent<->child value cycle in another unit (${child} value-reads a new parent-level ${parentFile})`, { ...base, [`${child}/zq10Up.ts`]: 'import { zq10Base } from "../zq10Base";\nexport const zq10Up = (): number => zq10Base;\n' }, true, child);
        cyc(`control: the same reverse edge, type-only (${child} -> ${parentFile})`, { ...base, [`${child}/zq10Up.ts`]: 'import type { zq10Base } from "../zq10Base";\nexport type Zq10Up = typeof zq10Base;\n' }, false);
    }
    // the cycle S74 cured, re-planted: renderer value-reads a new parent-level fourier-field file
    cyc("fourier-field: renderer/mint.ts value-reads a parent-level file (the cured cycle, re-planted)", { "src/components/fourier-field/zq10Math.ts": "export const zq10 = 1;\n", "src/components/fourier-field/renderer/mint.ts": `import { zq10 } from "../zq10Math";\nvoid zq10;\n${read("src/components/fourier-field/renderer/mint.ts")}` }, true, "src/components/fourier-field");
    // and the cure itself: the base module now holds math.ts, so the tree reads no module-grain SCC
    note({ kind: "CYCLE", id: "the route tree: no value SCC at module grain", ok: !clean.V.B4.some((l) => l.startsWith("value SCC at module grain")) && clean.counts.B4 === 0, read: `B4 ${clean.counts.B4}` });

    // ---- GATE: the modules pass 10 adds to the gate's load closure throw as they load: exit 2
    const gcopy = (name, file) => {
        const r = join(tmp, name);
        cpSync(join(root, "scripts/structure"), join(r, "scripts/structure"), { recursive: true });
        writeFileSync(join(r, "package.json"), read("package.json"));
        writeFileSync(join(r, file), `${readFileSync(join(r, file), "utf8")}\nthrow new Error("zq10: ${file} throws as it loads");\n`);
        return join(r, "scripts/structure/seal/seal.mjs");
    };
    for (const f of ["scripts/structure/seal/cycles.mjs", "scripts/structure/lib/tree/index.mjs", "scripts/structure/lib/tree/tree.mjs"]) {
        const c = node(gcopy(`g-${f.split("/").slice(-2).join("-")}`, f), ["--root", root]);
        note({ kind: "GATE", id: `${f} throws as it loads`, exit: c.status, ok: c.status === 2 && c.stderr.includes("seal: no verdict") && c.stderr.includes(`zq10: ${f}`), read: `exit ${c.status} (expect 2) · ${first(c.stderr.replace(/^.*?no verdict: (Error: )?/s, ""))}` });
    }

    // ---- MIGR: the chain's MIGRATION text (P9-R2 (a))
    const CT = T("wc2/chain-text.mjs");
    const mtree = (name, mig) => { const d = join(tmp, name); mkdirSync(d); writeFileSync(join(d, "MIGRATION.md"), mig); cpSync(join(root, "package.json"), join(d, "package.json")); return d; };
    const M = read("MIGRATION.md");
    const head = "## 11.0.0\n";
    if (!M.includes(head)) throw new Error("plants-p10: the route's MIGRATION.md holds no `## 11.0.0` heading");
    const migPlants = [
        ["control: the route's own MIGRATION.md", M, 0, "chain-text: GREEN"],
        ["a row reference `BL #3` in the chain's section", M.replace(head, `${head}\nThe structure cut closes BL #3.\n`), 1, "row-ref BL #3"],
        ["a `docs/tranches/BL/` cite in the chain's section", M.replace(head, `${head}\nSee docs/tranches/BL/CHARTER.md.\n`), 1, "record-cite"],
        ["a bare tranche id \"(BL)\" in the chain's section", M.replace(head, `${head}\nThe structure cut (BL).\n`), 1, "TRANCHE"],
        ["the heading put back to `## UNRELEASED — the structure cut (BL)`", M.replace(head, "## UNRELEASED — the structure cut (BL)\n"), 1, "NEW-MISS"],
    ];
    for (const [what, mig, expect, needle] of migPlants) {
        const d = mtree(`mig-${results.length}`, mig);
        const run = node(CT, ["--base", floorBase, "--route", d]);
        note({ kind: "MIGR", id: what, exit: run.status, ok: run.status === expect && run.stdout.includes(needle), read: `exit ${run.status} (expect ${expect}) · ${(run.stdout.split("\n").find((l) => l.includes(needle)) ?? last(run.stdout)).slice(0, 150)}` });
    }
} finally { rmSync(tmp, { recursive: true, force: true }); }

const summary = { plants: results.length, passed: results.filter((r) => r.ok).length, byKind: Object.fromEntries([...new Set(results.map((r) => r.kind))].map((k) => [k, `${results.filter((r) => r.kind === k && r.ok).length}/${results.filter((r) => r.kind === k).length}`])), results };
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(summary, null, 1)}\n`);
console.log(`battery ${summary.passed}/${summary.plants} ${JSON.stringify(summary.byKind)}`);
process.exitCode = summary.passed === summary.plants ? 0 : 1;
