#!/usr/bin/env node
// plants-p12.mjs — pass 12's plant battery (REGISTRY §P11-6.4): S-14's extent (P11-G1, P11-R1 (a)). Every planted
// report is written under --plants (a durable dir under results/p12/), so each verdict rests on a committed file;
// the trees it reads are left unchanged (rekey writes only under --plants).
//   node tools/plants-p12.mjs --root <the chain's final tree> --reports <results/p12/browser> --plants <dir> --out <json>
// Plants:
//   SLOT    every committed browser-seat/2 report, full and partial (18: the full base raw and re-keyed, each base
//           rerun raw and re-keyed, each touched-spec base raw and re-keyed (p10, p11), the full route, each route
//           rerun, each touched-spec route), in each of browser-tally's four slots against the full pair, and as
//           rekey's <base>. A slot that refuses the report exits 2; in --base against the full route (every committed
//           rerun in its slot, so the P7-R2 flake is out of the bar), only the full re-keyed base reads 0.
//   F6      a route with one base-green key failing, through every report above in --base (alone, and with every
//           committed rerun and both touched-spec pairs in their rerun slots): only the full re-keyed base reads
//           (1, RED); every other exits 2; never 0. The failing route as a route rerun (1), a base rerun (2), and
//           rekey's base (2). The ten rows of the pass-11 critic's F7 (cB11-R/f7.txt) are the F7-tagged rows.
//   PAIR    each touched-spec pair (p10, p11) judged on its own: a verdict (0); its F6 analogue (one base-green key
//           of the pair's route failing): RED (1). The full tally with every committed rerun and both pairs as
//           reruns: GREEN (0), 428 base-green.
//   DEL     the full re-keyed base with one base-origin spec's results deleted, against the full route: 2 (the
//           extent, spec grain, P11-R1 (a)); with one base-green key deleted: 1 (that route key is UNBASED, not
//           held); with the failing key deleted, against the failing route (the masking shape): 1, never 0. Controls: the full route without the two specs the chain creates (every rerun in its slot): 0; the full route
//           without one base-origin spec: 1 (its base-green keys absent).
//   ORIGIN  the route with a planted spec no base program spec reaches (a tests-visual path, a .visual.ts slot
//           path): no base origin, read for nothing (0); a capture spec (2); pass 8's T3 shape (a base-green key
//           removed, its title added under an invented spec): ABSENT, RED (1). In process: chainOrigin over the full
//           route's 155 specs gives 2 created and 153 base-origin; the base program at the chain's baseSha holds 153
//           specs and every origin is one of them; chainOrigin inverts follow() on every base spec; a chain with no
//           SEQUENCE.json throws (ENOENT), never reads as no chain.
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.on("uncaughtException", (e) => {
    console.error(`plants-p12: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { readArgs } = await import("../lib/argv.mjs");
const { chainOrigin, chainFollow, baseProgram } = await import("../lib/follow.mjs");
const A = readArgs("plants-p12", process.argv.slice(2), { values: ["--root", "--reports", "--plants", "--out"] });
for (const k of ["--root", "--reports", "--plants", "--out"]) if (A.value(k) === null) throw new Error(`plants-p12: ${k} is required`);
const root = resolve(A.value("--root")), D = resolve(A.value("--reports")), P = resolve(A.value("--plants")), out = resolve(A.value("--out"));
rmSync(P, { recursive: true, force: true });
mkdirSync(P, { recursive: true });
const results = [];
const note = (r) => { results.push(r); console.log(`${r.ok ? "PASS" : "FAIL"} ${r.kind} ${r.id}: ${r.read}`); };
const node = (cli, a) => spawnSync(process.execPath, [cli, ...a], { encoding: "utf8", maxBuffer: 1 << 27 });
const first = (t) => (t.split("\n").find((l) => l.trim()) ?? "").slice(0, 200);
const verdictLine = (t) => (t.split("\n").find((l) => l.startsWith("verdict")) ?? t.trim().split("\n").at(-1) ?? "").slice(0, 170);
const T = (name) => join(KIT, "tools", name);
const TALLY = T("browser-tally.mjs"), REKEY = T("rekey.mjs");
const rel = (f) => f.replace(`${D}/`, "").replace(`${P}/`, "plants/");
const w = (name, doc) => { const p = join(P, name); writeFileSync(p, `${JSON.stringify(doc)}\n`); return p; };
const J = (f) => JSON.parse(readFileSync(f, "utf8"));
/** expect: 2 (no verdict, with the message), 0 or 1 (that verdict), or "verdict" (0 or 1, no throw) */
const judge = (kind, id, cli, a, expect, msg, tags = []) => {
    const run = node(cli, a);
    const tool = cli.split("/").pop().replace(/\.mjs$/, "");
    const threw = run.stderr.includes(`${tool}: no verdict`);
    const ok = expect === "verdict" ? (run.status === 0 || run.status === 1) && !threw
        : run.status === expect && (expect !== 2 || (threw && (!msg || run.stderr.includes(msg))));
    note({ kind, id, tags, expect, exit: run.status, ok, read: `exit ${run.status} (expect ${expect})${threw ? ` · ${first(run.stderr.replace(/^.*?no verdict: (Error: )?/s, ""))}` : ` · ${verdictLine(run.stdout)}`}` });
    return run;
};
const inproc = (kind, id, fn, expectThrow, msg) => {
    let threw = null, val;
    try { val = fn(); } catch (e) { threw = String(e.message); }
    const ok = expectThrow ? threw !== null && (!msg || threw.includes(msg)) : threw === null && val === true;
    note({ kind, id, expect: expectThrow ? "throw" : "true", exit: null, ok, read: threw !== null ? `throws · ${threw.slice(0, 160)}` : `returns ${JSON.stringify(val)}` });
};

// ---- the committed reports, by kind
const BR = join(D, "base-rekeyed.json"), RT = join(D, "route.json");
const rr = readdirSync(join(D, "reruns")).sort();
const REPORTS = [
    ["the full base, raw", join(D, "base.json"), "raw", true],
    ["the full base, re-keyed", BR, "rekeyed", true],
    ...rr.filter((f) => /^base-\d+-\d+\.json$/.test(f)).map((f) => [`base rerun ${f}, raw`, join(D, "reruns", f), "raw", false]),
    ...rr.filter((f) => /^base-\d+-\d+\.rekeyed\.json$/.test(f)).map((f) => [`base rerun ${f}, re-keyed`, join(D, "reruns", f), "rekeyed", false]),
    ...["p10-steps", "p11-steps"].flatMap((s) => [[`${s} base, raw`, join(D, s, "base.json"), "raw", false], [`${s} base, re-keyed`, join(D, s, "base.rekeyed.json"), "rekeyed", false]]),
    ["the full route", RT, "route", true],
    ...rr.filter((f) => /^route-\d+-\d+\.json$/.test(f)).map((f) => [`route rerun ${f}`, join(D, "reruns", f), "route", false]),
    ...["p10-steps", "p11-steps"].map((s) => [`${s} route`, join(D, s, "route.json"), "route", false]),
];
if (REPORTS.length !== 18) throw new Error(`plants-p12: ${REPORTS.length} committed reports, expected 18`);
const RERUNS = [
    ...rr.filter((f) => /^base-\d+-\d+\.rekeyed\.json$/.test(f)).flatMap((f) => ["--base-rerun", join(D, "reruns", f)]),
    ...rr.filter((f) => /^route-\d+-\d+\.json$/.test(f)).flatMap((f) => ["--route-rerun", join(D, "reruns", f)]),
    ...["p10-steps", "p11-steps"].flatMap((s) => ["--base-rerun", join(D, s, "base.rekeyed.json"), "--route-rerun", join(D, s, "route.json")]),
];

// ---- SLOT: every committed report in every slot
const takes = { "--base": "rekeyed", "--base-rerun": "rekeyed", "--route": "route", "--route-rerun": "route" };
const tallyArgs = (slot, f, route = RT) => {
    const a = { "--base": BR, "--route": route, "--base-rerun": null, "--route-rerun": null, [slot]: f };
    return Object.entries(a).flatMap(([k, v]) => (v ? [k, v] : []));
};
for (const slot of Object.keys(takes)) for (const [what, f, kind, full] of REPORTS) {
    let expect;
    if (slot === "--base") expect = kind === "rekeyed" && full ? 0 : 2;
    else expect = kind === takes[slot] ? "verdict" : 2;
    // --base rows carry every committed rerun, so the P7-R2 flake (blob D2) is out of the bar and the right full base reads 0
    judge("SLOT", `tally ${slot} <- ${what}${slot === "--base" ? " (every rerun in its slot)" : ""}`, TALLY, slot === "--base" ? [...tallyArgs(slot, f), ...RERUNS] : tallyArgs(slot, f), expect, null);
}
for (const [what, f, kind] of REPORTS) judge("SLOT", `rekey <base> <- ${what}`, REKEY, [f, root, join(P, "rk.json")], kind === "raw" ? 0 : 2, null);

// ---- F6: a route with one base-green key failing
const keyedList = (rep) => { const c = new Map(); return rep.results.map((x) => { const k = `${x.spec} :: ${x.title}`; const i = (c.get(k) ?? 0) + 1; c.set(k, i); return `${k} #${i}`; }); };
const flip = (baseF, routeF, name) => {
    const B = J(baseF), R = J(routeF);
    const bk = keyedList(B), green = new Set(bk.filter((k, i) => B.results[i].status === "expected"));
    const rk = keyedList(R);
    const at = rk.findIndex((k, i) => green.has(k) && R.results[i].status === "expected" && !R.results[i].spec.includes("blob-config-delta"));
    if (at < 0) throw new Error(`plants-p12: no base-green key ${routeF} passes`);
    return { file: w(name, { ...R, results: R.results.map((x, i) => (i === at ? { ...x, status: "unexpected" } : x)) }), key: rk[at] };
};
const FR = flip(BR, RT, "route-fail.json");
note({ kind: "F6", id: "the failing key", expect: null, exit: null, ok: true, read: FR.key });
const F7 = (what) => (/^base rerun .*re-keyed$|^p1[01]-steps base, re-keyed$/.test(what) ? ["F7"] : []);
for (const [what, f, kind, full] of REPORTS) {
    const expect = kind === "rekeyed" && full ? 1 : 2;
    judge("F6", `--base <- ${what}, --route the failing route`, TALLY, ["--base", f, "--route", FR.file], expect, null, F7(what));
    judge("F6", `--base <- ${what}, --route the failing route, every rerun and both pairs in their slots`, TALLY, ["--base", f, "--route", FR.file, ...RERUNS], expect, null, F7(what));
}
judge("F6", "the failing route as a route rerun of the full pair", TALLY, ["--base", BR, "--route", RT, "--route-rerun", FR.file], 1);
judge("F6", "the failing route as a base rerun", TALLY, ["--base", BR, "--route", RT, "--base-rerun", FR.file], 2, null);
judge("F6", "rekey on the failing route", REKEY, [FR.file, root, join(P, "rk-fail.json")], 2, null);

// ---- PAIR: the touched-spec pairs judged on their own
for (const s of ["p10-steps", "p11-steps"]) {
    const b = join(D, s, "base.rekeyed.json"), r = join(D, s, "route.json");
    judge("PAIR", `${s}: the pair on its own`, TALLY, ["--base", b, "--route", r], 0);
    const f = flip(b, r, `${s}-route-fail.json`);
    judge("PAIR", `${s}: one base-green key of the pair's route failing (${f.key.slice(0, 80)})`, TALLY, ["--base", b, "--route", f.file], 1);
}
judge("PAIR", "the full pair, every committed rerun and both pairs as reruns (control)", TALLY, ["--base", BR, "--route", RT, ...RERUNS], 0);

// ---- DEL: a base with part of the route's extent deleted
const Bf = J(BR), Rf = J(RT);
const specOf = (x) => x.spec;
const victimSpec = Rf.results.find((x) => x.status === "expected" && !x.spec.includes("blob-config-delta") && Bf.results.some((y) => y.spec === x.spec)).spec;
judge("DEL", `the full re-keyed base without ${victimSpec}'s results, against the full route`, TALLY, ["--base", w("base-no-spec.json", { ...Bf, results: Bf.results.filter((x) => specOf(x) !== victimSpec) }), "--route", RT], 2, "holds no results for 1 of the route's 153");
const bk = keyedList(Bf), victimKey = bk.find((k, i) => Bf.results[i].status === "expected" && !k.includes("blob-config-delta") && k.endsWith(" #1"));
const dropKey = (key) => Bf.results.filter((x, i) => bk[i] !== key);
judge("DEL", `the full re-keyed base without one base-green key (${victimKey.slice(0, 70)}), against the full route, every rerun in its slot: UNBASED, RED`, TALLY, ["--base", w("base-no-key.json", { ...Bf, results: dropKey(victimKey) }), "--route", RT, ...RERUNS], 1);
judge("DEL", "the full re-keyed base without the failing key, against the failing route, every rerun in its slot (the masking shape): UNBASED, RED", TALLY, ["--base", w("base-no-failing-key.json", { ...Bf, results: dropKey(FR.key) }), "--route", FR.file, ...RERUNS], 1);
const origin = chainOrigin();
const createdSpecs = [...new Set(Rf.results.map(specOf))].filter((s) => origin(s) === null);
judge("DEL", `control: the full route without the ${createdSpecs.length} specs the chain creates`, TALLY, ["--base", BR, "--route", w("route-no-created.json", { ...Rf, results: Rf.results.filter((x) => !createdSpecs.includes(x.spec)) }), ...RERUNS], 0);
judge("DEL", `control: the full route without ${victimSpec} (its base-green keys absent)`, TALLY, ["--base", BR, "--route", w("route-no-spec.json", { ...Rf, results: Rf.results.filter((x) => x.spec !== victimSpec) })], 1);

// ---- ORIGIN: a route spec the base cannot hold, and the map itself
const plantSpec = (spec, name) => w(name, { ...Rf, results: [...Rf.results, { ...Rf.results[0], spec, title: "planted", status: "expected" }] });
judge("ORIGIN", "a route spec no base program spec reaches (tests-visual path): no base origin, UNKEYED, judged for nothing (every rerun in its slot)", TALLY, ["--base", BR, "--route", plantSpec("tests-visual/zz-planted.spec.ts", "route-plant-base-path.json"), ...RERUNS], 0);
judge("ORIGIN", "a route spec no base program spec reaches (a .visual.ts slot path): the same (every rerun in its slot)", TALLY, ["--base", BR, "--route", plantSpec("src/components/zz/__tests__/zz.visual.ts", "route-plant-no-program.json"), ...RERUNS], 0);
judge("ORIGIN", "a capture spec in the route report", TALLY, ["--base", BR, "--route", plantSpec("tests-visual/captures/_zz-capture.spec.ts", "route-plant-capture.json")], 2, "a capture spec");
{
    // a key whose spec no route rerun reports, so only the full route can hold it
    const rerunSpecs = new Set(RERUNS.filter((f, i) => RERUNS[i - 1] === "--route-rerun").flatMap((f) => J(f).results.map((x) => x.spec)));
    const bkg = keyedList(Bf), baseGreen = new Set(bkg.filter((x, i) => Bf.results[i].status === "expected"));
    const B9 = keyedList(Rf), k = B9.find((x, i) => baseGreen.has(x) && Rf.results[i].status === "expected" && !rerunSpecs.has(Rf.results[i].spec) && x.endsWith(" #1"));
    if (!k) throw new Error("plants-p12: no base-green key outside every rerun");
    const [spec, rest] = [k.slice(0, k.indexOf(" :: ")), k.slice(k.indexOf(" :: ") + 4, -3)];
    const moved = { ...Rf, results: [...Rf.results.filter((x, i) => B9[i] !== k), { spec: spec.replace(/(\.spec|\.visual)?\.ts$/, "-zq8$1.ts"), title: rest, status: "expected" }] };
    judge("ORIGIN", "pass 8's T3 shape: a base-green key removed, its title added under an invented spec: the key ABSENT, RED", TALLY, ["--base", BR, "--route", w("route-t3-shape.json", moved), ...RERUNS], 1);
}
const routeSpecs = [...new Set(Rf.results.map(specOf))];
inproc("ORIGIN", `chainOrigin over the full route's ${routeSpecs.length} specs: 2 created, 153 base-origin`, () => createdSpecs.length === 2 && routeSpecs.length - createdSpecs.length === 153, false);
const PROG = baseProgram();
inproc("ORIGIN", `the base program at the chain's baseSha: ${PROG.size} specs; every base-origin route spec's origin is one of them`, () => PROG.size === 153 && routeSpecs.filter((s) => origin(s) !== null).every((s) => PROG.has(origin(s))), false);
const follow = chainFollow(), baseRaw = J(join(D, "base.json"));
inproc("ORIGIN", "chainOrigin inverts follow() on every base spec", () => [...new Set(baseRaw.results.map(specOf))].every((s) => { const p = `${baseRaw.testDir}/${s}`; return origin(follow(p)) === p; }), false);
const noSeq = join(P, "kit-no-sequence");
cpSync(join(KIT, "lib"), join(noSeq, "lib"), { recursive: true });
const ns = spawnSync(process.execPath, ["--input-type=module", "-e", `import(${JSON.stringify(pathToFileURL(join(noSeq, "lib/follow.mjs")).href)}).then((m) => { m.chainOrigin(); console.log("read"); })`], { encoding: "utf8" });
note({ kind: "ORIGIN", id: "a kit with no frozen/SEQUENCE.json: the map throws (ENOENT), never reads as no chain", expect: "throw", exit: ns.status, ok: ns.status !== 0 && ns.stderr.includes("ENOENT") && !ns.stdout.includes("read"), read: `exit ${ns.status} · ${first(ns.stderr.replace(/^[\s\S]*?Error/, "Error"))}` });
rmSync(noSeq, { recursive: true, force: true });

const pass = results.filter((r) => r.ok).length;
const f6zero = results.filter((r) => r.kind === "F6" && r.exit === 0).length;
const baseZero = results.filter((r) => r.kind === "SLOT" && r.id.startsWith("tally --base <-") && r.exit === 0).map((r) => r.id);
writeFileSync(out, `${JSON.stringify({ battery: "plants-p12", pass, total: results.length, f6Zero: f6zero, baseSlotZero: baseZero, results }, null, 1)}\n`);
const by = {};
for (const r of results) { by[r.kind] ??= [0, 0]; by[r.kind][1]++; if (r.ok) by[r.kind][0]++; }
console.log(`F6 rows reading 0: ${f6zero}; F7-tagged rows: ${results.filter((r) => r.tags?.includes("F7")).length}, exits ${[...new Set(results.filter((r) => r.tags?.includes("F7")).map((r) => r.exit))].join(",")}`);
console.log(`--base rows reading 0 against the full route: ${baseZero.length} (${baseZero.join("; ")})`);
console.log(`plants-p12: ${pass}/${results.length} · ${Object.entries(by).map(([k, [p, n]]) => `${k} ${p}/${n}`).join(" · ")}`);
process.exitCode = pass === results.length ? 0 : 1;
