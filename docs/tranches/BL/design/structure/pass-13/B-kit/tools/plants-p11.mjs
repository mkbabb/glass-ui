#!/usr/bin/env node
// plants-p11.mjs — pass 11's plant battery (REGISTRY §P10-6.4). Nothing in the trees it reads is left
// changed: report plants are rewritten copies under the OS temp dir, which it removes; the floor plant
// restores its tree and checks the digest.
//   node tools/plants-p11.mjs --root <migrated, built tree> --floor-base <floor-base tree, built>
//        --reports <dir holding base.json, base-rekeyed.json, route.json, selection.json, reruns/>
//        --probe-base <the probe's floor-base report> --out <json>
// Plants:
//   KIND  P10-G1: every committed report kind in every report slot of browser-tally (--base, --route,
//         --base-rerun, --route-rerun) and in rekey's <base>: the base run, a re-keyed base, the route
//         run, a base rerun (raw and re-keyed), a route rerun (baseReport null), the probe's floor-base
//         report, the probe's own route report and a selection. A kind the slot does not take exits 2
//         with `<tool>: no verdict`; a kind it takes reads a verdict (0 or 1, stated per row).
//   F6    P10-G1: a route with one base-green test failing. Read right it is RED (1). Read through every
//         wrong-kind path (the route as --base, as --base-rerun, a route rerun as --base-rerun, the
//         re-keyed base as --route and as --route-rerun, rekey on the route, and the report the pass-10
//         rekey would have written from it) it exits 2: never 0.
//   FLAG  P10-G2: every value-taking option of every judge present with no value (last on the line),
//         followed by another option, and with an empty value: each exits 2. An option the judge does
//         not take, a single-valued option twice, a switch twice, and rekey's positionals (two, four,
//         an empty one, an option): each exits 2. The derive tools' `arg` throws in process on the
//         same three shapes and reads an absent option as its default.
//   TREE  P10-G1 (trees are inputs): rekey and browser-select on the floor base exit 2 (not the
//         chain's final tree); peer-closure --floor-base on the migrated tree, and --floor-base with a
//         --base beside it, exit 2; the probe's own floor-base run on the floor base exits 1 (P7-G5,
//         control).
//   FLOOR P10-R1 (a): the floor plant on the floor base's landed engine reads KEPT (exit 0).
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

process.on("uncaughtException", (e) => {
    console.error(`plants-p11: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { readArgs } = await import("../lib/argv.mjs");
const { arg } = await import("../lib/floor.mjs");
const A = readArgs("plants-p11", process.argv.slice(2), { values: ["--root", "--floor-base", "--reports", "--probe-base", "--out"] });
for (const k of ["--root", "--floor-base", "--reports", "--probe-base", "--out"]) if (A.value(k) === null) throw new Error(`plants-p11: ${k} is required`);
const root = resolve(A.value("--root")), floorBase = resolve(A.value("--floor-base")), reports = resolve(A.value("--reports")), PBASE = resolve(A.value("--probe-base")), out = resolve(A.value("--out"));
const results = [];
const note = (r) => { results.push(r); console.log(`${r.ok ? "PASS" : "FAIL"} ${r.kind} ${r.id}: ${r.read}`); };
const tmp = mkdtempSync(join(tmpdir(), "p11-plants-"));
const node = (cli, a) => spawnSync(process.execPath, [cli, ...a], { encoding: "utf8", maxBuffer: 1 << 27 });
const first = (t) => (t.split("\n").find((l) => l.trim()) ?? "").slice(0, 190);
const last = (t) => (t.trim().split("\n").at(-1) ?? "").slice(0, 170);
const T = (name) => join(KIT, "tools", name);
const w = (name, doc) => { const p = join(tmp, name); writeFileSync(p, typeof doc === "string" ? doc : JSON.stringify(doc)); return p; };
/** expect: 2 (no verdict, with the message), 0 or 1 (that verdict), or "verdict" (0 or 1, no throw) */
const judge = (kind, id, cli, a, expect, msg) => {
    const run = node(cli, a);
    const tool = cli.split("/").pop().replace(/\.mjs$/, "");
    const threw = run.stderr.includes(`${tool}: no verdict`);
    const ok = expect === "verdict" ? (run.status === 0 || run.status === 1) && !threw
        : run.status === expect && (expect !== 2 || (threw && (!msg || run.stderr.includes(msg))));
    note({ kind, id, expect, exit: run.status, ok, read: `exit ${run.status} (expect ${expect})${threw ? ` · ${first(run.stderr.replace(/^.*?no verdict: (Error: )?/s, ""))}` : ` · ${last(run.stdout)}`}` });
    return run;
};
const inproc = (kind, id, fn, expectThrow, msg) => {
    let threw = null, val;
    try { val = fn(); } catch (e) { threw = String(e.message); }
    const ok = expectThrow ? threw !== null && (!msg || threw.includes(msg)) : threw === null;
    note({ kind, id, expect: expectThrow ? "throw" : "value", exit: null, ok, read: threw !== null ? `throws · ${threw.slice(0, 160)}` : `returns ${JSON.stringify(val)}` });
};

try {
    const BASE = join(reports, "base.json"), BR = join(reports, "base-rekeyed.json"), RT = join(reports, "route.json"), SEL = join(reports, "selection.json");
    const reruns = readdirSync(join(reports, "reruns"));
    const pick = (re) => { const f = reruns.filter((x) => re.test(x)).sort()[0]; if (!f) throw new Error(`plants-p11: no rerun matches ${re}`); return join(reports, "reruns", f); };
    const baseRerunRaw = pick(/^base-\d+-\d+\.json$/), baseRerunKeyed = pick(/^base-\d+-\d+\.rekeyed\.json$/), routeRerun = pick(/^route-\d+-\d+\.json$/);
    // the probe's own route report (its run on the migrated tree)
    const own = join(tmp, "probe-route.json");
    const ownRun = node(T("peer-closure.mjs"), ["--root", root, "--base", PBASE, "--json", own]);
    if (ownRun.status !== 0) throw new Error(`plants-p11: the probe on the built tree exits ${ownRun.status}: ${ownRun.stderr}`);

    // ---- KIND: every committed kind in every slot
    const kinds = [
        ["the base run", BASE, "base"],
        ["a re-keyed base", BR, "rekeyed"],
        ["the route run", RT, "route"],
        ["a base rerun, raw", baseRerunRaw, "base"],
        ["a base rerun, re-keyed", baseRerunKeyed, "rekeyed"],
        ["a route rerun (baseReport null)", routeRerun, "route"],
        ["the probe's floor-base report", PBASE, "probe"],
        ["the probe's own route report", own, "probe"],
        ["a selection report", SEL, "selection"],
    ];
    const TALLY = T("browser-tally.mjs");
    const takes = { "--base": "rekeyed", "--base-rerun": "rekeyed", "--route": "route", "--route-rerun": "route" };
    const tallyArgs = (slot, f) => {
        const a = { "--base": BR, "--route": RT, "--base-rerun": null, "--route-rerun": null, [slot]: f };
        return Object.entries(a).flatMap(([k, v]) => (v ? [k, v] : []));
    };
    for (const slot of Object.keys(takes)) for (const [what, f, kind] of kinds) {
        if (kind === takes[slot]) judge("KIND", `tally ${slot} <- ${what} (the kind it takes)`, TALLY, tallyArgs(slot, f), "verdict");
        else judge("KIND", `tally ${slot} <- ${what}`, TALLY, tallyArgs(slot, f), 2, null);
    }
    const REKEY = T("rekey.mjs");
    for (const [what, f, kind] of kinds) {
        if (kind === "base") judge("KIND", `rekey <base> <- ${what} (the kind it takes)`, REKEY, [f, root, join(tmp, "rk.json")], 0);
        else judge("KIND", `rekey <base> <- ${what}`, REKEY, [f, root, join(tmp, "rk.json")], 2, null);
    }
    judge("KIND", "tally: the committed reports, every rerun in its slot (control)", TALLY, ["--base", BR, "--route", RT, ...reruns.filter((x) => /^base-\d+-\d+\.rekeyed\.json$/.test(x)).flatMap((x) => ["--base-rerun", join(reports, "reruns", x)]), ...reruns.filter((x) => /^route-\d+-\d+\.json$/.test(x)).flatMap((x) => ["--route-rerun", join(reports, "reruns", x)])], 0);

    // ---- F6: a route with one base-green test failing
    const B = JSON.parse(readFileSync(BR, "utf8")), R = JSON.parse(readFileSync(RT, "utf8"));
    const key = (x, n) => `${x.spec} :: ${x.title} #${n}`;
    const keyed = (rep) => { const c = new Map(); return rep.results.map((x) => { const k = `${x.spec} :: ${x.title}`; const i = (c.get(k) ?? 0) + 1; c.set(k, i); return key(x, i); }); };
    const bk = keyed(B), green = new Set(bk.filter((k, i) => B.results[i].status === "expected"));
    const rk = keyed(R);
    const at = rk.findIndex((k, i) => green.has(k) && R.results[i].status === "expected" && !R.results[i].spec.includes("blob-config-delta"));
    if (at < 0) throw new Error("plants-p11: no base-green key the route passes");
    const failRoute = w("route-fail.json", { ...R, results: R.results.map((x, i) => (i === at ? { ...x, status: "unexpected" } : x)) });
    const failRerun = w("route-rerun-fail.json", { ...JSON.parse(readFileSync(routeRerun, "utf8")), results: [{ ...R.results[at], status: "unexpected" }] });
    note({ kind: "F6", id: "the failing key", expect: null, exit: null, ok: true, read: rk[at] });
    judge("F6", "read right: --base the re-keyed base, --route the failing route (control RED)", TALLY, ["--base", BR, "--route", failRoute], 1);
    judge("F6", "the failing route as --base, the re-keyed base as --route", TALLY, ["--base", failRoute, "--route", BR], 2, null);
    judge("F6", "the failing route as --base and as --route", TALLY, ["--base", failRoute, "--route", failRoute], 2, null);
    judge("F6", "the failing route as --base, the passing route as --route", TALLY, ["--base", failRoute, "--route", RT], 2, null);
    judge("F6", "the re-keyed base as --route, the failing route as --route-rerun", TALLY, ["--base", BR, "--route", BR, "--route-rerun", failRoute], 2, null);
    judge("F6", "the failing route as --route, the re-keyed base as --route-rerun", TALLY, ["--base", BR, "--route", failRoute, "--route-rerun", BR], 2, null);
    judge("F6", "the failing route as --route, a re-keyed base rerun as --route-rerun", TALLY, ["--base", BR, "--route", failRoute, "--route-rerun", baseRerunKeyed], 2, null);
    judge("F6", "the failing route as --base-rerun", TALLY, ["--base", BR, "--route", failRoute, "--base-rerun", failRoute], 2, null);
    judge("F6", "a failing route rerun as --base-rerun", TALLY, ["--base", BR, "--route", failRoute, "--base-rerun", failRerun], 2, null);
    judge("F6", "a route rerun as --base-rerun (the committed one)", TALLY, ["--base", BR, "--route", failRoute, "--base-rerun", routeRerun], 2, null);
    judge("F6", "rekey on the failing route", REKEY, [failRoute, root, join(tmp, "rk-route.json")], 2, null);
    // what the pass-10 rekey wrote from a route report: rekeyedFrom with the route's own testDir
    const forged = w("route-as-rekeyed.json", { ...JSON.parse(readFileSync(failRoute, "utf8")), rekeyedFrom: { report: failRoute, testDir: "." }, unmapped: [] });
    judge("F6", "the pass-10 rekey's output from the failing route, as --base", TALLY, ["--base", forged, "--route", failRoute], 2, "route's own testDir");

    // ---- FLAG: every value-taking option of every judge, with no value
    const SELECT = T("browser-select.mjs"), PROBE = T("peer-closure.mjs");
    const flagRows = [
        [TALLY, "browser-tally", ["--base", "--route", "--base-rerun", "--route-rerun"], { "--base": BR, "--route": RT }],
        [SELECT, "browser-select", ["--root", "--out"], { "--root": root, "--out": join(tmp, "sel") }],
        [PROBE, "peer-closure", ["--root", "--table", "--base", "--overlay", "--json"], { "--root": root, "--base": PBASE }],
    ];
    for (const [cli, tool, opts, good] of flagRows) {
        const rest = (k) => Object.entries(good).filter(([g]) => g !== k).flat();
        for (const k of opts) {
            judge("FLAG", `${tool} ${k} last on the line, no value`, cli, [...rest(k), k], 2, `${k} is present with no value`);
            const other = Object.keys(good).find((g) => g !== k);
            judge("FLAG", `${tool} ${k} followed by ${other}`, cli, [k, other, good[other], ...Object.entries(good).filter(([g]) => g !== k && g !== other).flat()], 2, `${k} is present with no value`);
            judge("FLAG", `${tool} ${k} with an empty value`, cli, [...rest(k), k, ""], 2, "empty value");
        }
        judge("FLAG", `${tool}: an option it does not take`, cli, [...Object.entries(good).flat(), "--zq-unknown", "x"], 2, "is not an option it takes");
        const single = opts.find((k) => !k.endsWith("-rerun"));
        judge("FLAG", `${tool}: ${single} given twice`, cli, [...Object.entries(good).flat(), single, good[single] ?? good[Object.keys(good)[0]]], 2, "is given twice");
    }
    judge("FLAG", "browser-tally: --plan given twice", TALLY, ["--base", BR, "--route", RT, "--plan", "--plan"], 2, "is given twice");
    judge("FLAG", "peer-closure: --floor-base given twice", PROBE, ["--root", floorBase, "--floor-base", "--floor-base", "--table", "src/index.ts"], 2, "is given twice");
    judge("FLAG", "rekey: two positionals", REKEY, [BASE, root], 2, "usage");
    judge("FLAG", "rekey: four positionals", REKEY, [BASE, root, join(tmp, "rk4.json"), "extra"], 2, "it takes 3");
    judge("FLAG", "rekey: an empty positional", REKEY, [BASE, "", join(tmp, "rk5.json")], 2, "an empty argument");
    judge("FLAG", "rekey: an option", REKEY, ["--base", BASE, root, join(tmp, "rk6.json")], 2, "is not an option it takes");
    inproc("FLAG", "arg: present, last on the line", () => arg(["--out"], "--out"), true, "present with no value");
    inproc("FLAG", "arg: followed by another option", () => arg(["--out", "--id", "S1"], "--out"), true, "followed by --id");
    inproc("FLAG", "arg: an empty value", () => arg(["--out", ""], "--out"), true, "empty value");
    inproc("FLAG", "arg: absent reads its default (control)", () => arg(["--id", "S1"], "--out", "d"), false);
    inproc("FLAG", "arg: present with a value (control)", () => arg(["--out", "x.json"], "--out"), false);

    // ---- TREE: trees are inputs
    judge("TREE", "rekey <tree> <- the floor base", REKEY, [BASE, floorBase, join(tmp, "rk-base.json")], 2, "not the chain's final");
    judge("TREE", "browser-select --root <- the floor base", SELECT, ["--root", floorBase, "--out", join(tmp, "sel-base")], 2, "not the chain's final");
    judge("TREE", "peer-closure --floor-base on the migrated tree", PROBE, ["--root", root, "--floor-base", "--table", "src/README.md"], 2, "not the floor base");
    judge("TREE", "peer-closure --floor-base with a --base beside it", PROBE, ["--root", floorBase, "--floor-base", "--table", "src/index.ts", "--base", PBASE], 2, "a --base beside it");
    judge("TREE", "peer-closure --floor-base on the floor base (control: P7-G5, RED)", PROBE, ["--root", floorBase, "--floor-base", "--table", "src/index.ts"], 1);
    judge("TREE", "browser-select on the migrated tree (control)", SELECT, ["--root", root, "--out", join(tmp, "sel-ok")], 0);

    // ---- FLOOR: P10-R1 (a), the landed engine of the re-cut floor base
    judge("FLOOR", "P11-F1: a holder of \"./dist/index.d.ts\" moved on the floor base keeps its spelling", join(KIT, "../../pass-11/plants/p11-floor-plant.mjs"), ["--root", floorBase], 0);
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
const pass = results.filter((r) => r.ok).length;
writeFileSync(out, `${JSON.stringify({ battery: "plants-p11", pass, total: results.length, results }, null, 1)}\n`);
const by = {};
for (const r of results) { by[r.kind] ??= [0, 0]; by[r.kind][1]++; if (r.ok) by[r.kind][0]++; }
console.log(`plants-p11: ${pass}/${results.length} · ${Object.entries(by).map(([k, [p, n]]) => `${k} ${p}/${n}`).join(" · ")}`);
process.exitCode = pass === results.length ? 0 : 1;
