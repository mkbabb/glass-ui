#!/usr/bin/env node
// browser-plants.mjs --dir <route browser dir> --tally <tally tool .mjs> [--select-cmd "<cmd>" --root <tree>] [--out <json>]
// critique-B pass 8 · S-12 · REGISTRY §P7-6.4: "a route report with a base-green key removed (the tally reads it not
// held), and a moved spec with no band (the selection picks it)". Written and hashed BEFORE reading pass-8/B-kit.
// Reads the browser-seat/2 reports in <dir>: base-rekeyed.json, route.json, selection.json, moved.json (pass-7 kit
// names; overridable with --base/--route/--selection/--moved). Keys are `spec :: title`.
//
// RD   independent re-derivation (no route tool): base-green = keys whose every base status is "expected"; a new
//      failure is a base-green key whose route statuses are not all "expected" (absent = not held).
// T0   the tally tool on the committed pair, output recorded; the held count is parsed (first "held ... N" number).
// T1   one base-green key removed from a copy of the route report: PASS when the tally prints that key with a
//      not-held word (missing|absent|not held|not-held|MISSING|ABSENT|NOT-HELD|NOTHELD|dropped) or as NEW, AND its
//      held count (when parseable) is T0's minus one, AND it is not only listed as UNKEYED.
// T2   every result of one spec holding >= 2 base-green keys removed: PASS when every one of those keys is named.
// T3   a base-green key removed while a same-title route-only key is added under another spec (a title-match masking
//      attempt): PASS when the removed key is still named not held.
// T4   a base-green key flipped to "unexpected": PASS when it is named.
// T5   a base-green key with a duplicate title (two "expected" rows under one key) loses ONE of its rows: RECORD.
// S1   property over committed bytes: every spec/visual file the chain moves or creates (moved.json `to` and `from`)
//      that the selection's own changed/specs lists know as a spec is in the selected spec list; PASS when none is
//      missing. Specs absent from the final tree (a `from` that left) are reported, not judged.
// S2   (needs --select-cmd and --root) a spec on the tree that the committed selection does NOT pick, given a self
//      move {from: spec, to: spec} appended to a copy of moved.json; the command is run with {MOVED} {OUT} {ROOT}
//      substituted: PASS when the new selection holds the spec.
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";
import { tmpdir } from "node:os";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const D = resolve(arg("--dir"));
const J = (f) => JSON.parse(readFileSync(f, "utf8"));
const baseF = arg("--base", join(D, "base-rekeyed.json")), routeF = arg("--route", join(D, "route.json"));
const selF = arg("--selection", join(D, "selection.json")), movF = arg("--moved", join(D, "moved.json"));
const TALLY = resolve(arg("--tally"));
const tmp = mkdtempSync(join(process.env.CRIT_TMP ?? tmpdir(), "bplants8-"));
const out = []; const say = (s) => { console.log(s); out.push(s); };
const key = (r) => `${r.spec} :: ${r.title}`;
const idx = (rep) => { const m = new Map(); for (const r of rep.results) { const k = key(r); m.set(k, [...(m.get(k) ?? []), r.status]); } return m; };
const base = J(baseF), route = J(routeF);
const B = idx(base), R = idx(route);
const green = [...B].filter(([, s]) => s.every((x) => x === "expected")).map(([k]) => k);
const notHeld = green.filter((k) => !(R.get(k) ?? []).length || !R.get(k).every((x) => x === "expected"));
say(`RD base keys ${B.size}, route keys ${R.size}; base-green ${green.length} (dup-row keys ${green.filter((k) => B.get(k).length > 1).length}); held ${green.length - notHeld.length}; not held ${notHeld.length}`);
for (const k of notHeld) say(`RD NOT-HELD ${k} -> ${(R.get(k) ?? ["ABSENT"]).join(",")}`);
if (Array.isArray(route.bands)) {
    for (const b of route.bands) {
        const g = green.filter((k) => (b.specs ?? []).some((s) => k.startsWith(`${s} :: `)));
        const n = g.filter((k) => notHeld.includes(k));
        say(`RD BAND ${b.band} specs ${(b.specs ?? []).length} base-green ${g.length} not-held ${n.length}${b.baseGreen !== undefined ? ` (route says baseGreen ${b.baseGreen})` : ""}`);
    }
}
const runTally = (rep, tag) => {
    const f = join(tmp, `${tag}.json`); writeFileSync(f, JSON.stringify(rep));
    let txt = "", rc = 0;
    try { txt = execSync(`node "${TALLY}" "${baseF}" "${f}"`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 26 }); }
    catch (e) { rc = e.status; txt = `${e.stdout ?? ""}${e.stderr ?? ""}`; }
    const m = /held[^0-9]{0,40}?(\d+)/i.exec(txt);
    return { txt, rc, held: m ? Number(m[1]) : null };
};
const NOTHELD = /(missing|absent|not[ -]?held|dropped|NEW)/i;
const namedNotHeld = (txt, k) => txt.split("\n").some((l) => l.includes(k) && NOTHELD.test(l) && !/^\s*UNKEYED/.test(l));
const res = {};
const t0 = runTally(route, "t0"); res.T0 = { rc: t0.rc, held: t0.held };
say(`T0 rc=${t0.rc} held=${t0.held} :: ${t0.txt.split("\n")[0]}`);
const heldGreen = green.filter((k) => !notHeld.includes(k));
const unique = heldGreen.filter((k) => B.get(k).length === 1 && R.get(k)?.length === 1);
const drop = (rep, pred) => ({ ...rep, results: rep.results.filter((r) => !pred(r)) });
// T1
{
    const k = unique[0]; const t = runTally(drop(route, (r) => key(r) === k), "t1");
    const ok = namedNotHeld(t.txt, k) && (t.held === null || t0.held === null || t.held === t0.held - 1);
    res.T1 = ok ? "PASS" : "FAIL";
    say(`T1 ${res.T1} rc=${t.rc} held=${t.held} (T0 ${t0.held}) removed: ${k} :: ${t.txt.split("\n").filter((l) => l.includes(k)).join(" | ").slice(0, 300) || "key not printed"}`);
}
// T2
{
    const bySpec = new Map(); for (const k of unique) { const s = k.split(" :: ")[0]; bySpec.set(s, [...(bySpec.get(s) ?? []), k]); }
    const [spec, keys] = [...bySpec].find(([, ks]) => ks.length >= 2) ?? [null, []];
    if (!spec) { res.T2 = "SKIP"; say("T2 SKIP no spec with two held base-green keys"); }
    else {
        const t = runTally(drop(route, (r) => r.spec === spec), "t2");
        const miss = keys.filter((k) => !namedNotHeld(t.txt, k));
        res.T2 = miss.length ? "FAIL" : "PASS";
        say(`T2 ${res.T2} rc=${t.rc} held=${t.held} spec ${spec} removed (${keys.length} base-green keys); unnamed ${miss.length}`);
    }
}
// T3
{
    const k = unique[1]; const [spec, ...tt] = k.split(" :: "); const title = tt.join(" :: ");
    const other = route.results.find((r) => r.spec !== spec)?.spec ?? "tests-visual/zq8-other.spec.ts";
    const rep = drop(route, (r) => key(r) === k); rep.results = [...rep.results, { spec: other.replace(/(\.spec|\.visual)?\.ts$/, "-zq8$1.ts"), title, status: "expected" }];
    const t = runTally(rep, "t3");
    res.T3 = namedNotHeld(t.txt, k) ? "PASS" : "FAIL";
    say(`T3 ${res.T3} rc=${t.rc} held=${t.held} removed ${k}, same title added under another spec :: ${t.txt.split("\n").filter((l) => l.includes(title)).join(" | ").slice(0, 300)}`);
}
// T4
{
    const k = unique[2]; const rep = { ...route, results: route.results.map((r) => key(r) === k ? { ...r, status: "unexpected" } : r) };
    const t = runTally(rep, "t4");
    res.T4 = namedNotHeld(t.txt, k) ? "PASS" : "FAIL";
    say(`T4 ${res.T4} rc=${t.rc} held=${t.held} flipped ${k}`);
}
// T5
{
    const k = heldGreen.find((x) => B.get(x).length > 1 && (R.get(x)?.length ?? 0) > 1);
    if (!k) { res.T5 = "SKIP"; say("T5 SKIP no duplicate-row key"); }
    else {
        let gone = false; const rep = { ...route, results: route.results.filter((r) => { if (!gone && key(r) === k) { gone = true; return false; } return true; }) };
        const t = runTally(rep, "t5"); res.T5 = namedNotHeld(t.txt, k) ? "NAMED" : "UNNAMED";
        say(`T5 RECORD ${res.T5} rc=${t.rc} held=${t.held} one of ${B.get(k).length} rows of ${k} removed`);
    }
}
// S1
if (existsSync(selF) && existsSync(movF)) {
    const sel = J(selF), mov = J(movF);
    const picked = new Set([...(sel.specs ?? []), ...(Array.isArray(sel.selection) ? sel.selection : [])].map((s) => (typeof s === "string" ? s : s.spec ?? s.path)).filter(Boolean)
        .map((s) => (sel.testDir && sel.testDir !== "." && !s.startsWith(sel.testDir) ? `${sel.testDir}/${s}` : s)));
    const isSpec = (p) => /\.(spec|visual)\.ts$/.test(p);
    const moved = [...new Set((mov.moves ?? []).flatMap((m) => [m.to]).filter(isSpec))];
    const left = [...new Set((mov.moves ?? []).filter((m) => m.from !== m.to).map((m) => m.from).filter(isSpec))];
    const missing = moved.filter((s) => !picked.has(s));
    res.S1 = missing.length ? "FAIL" : "PASS";
    say(`S1 ${res.S1} selection ${picked.size} specs; specs the chain moves or creates (to) ${moved.length}; not selected ${missing.length}; old paths ${left.length} (not judged)`);
    for (const s of missing) say(`S1 NOT-SELECTED ${s}`);
} else { res.S1 = "SKIP"; say(`S1 SKIP no ${existsSync(selF) ? "" : "selection "}${existsSync(movF) ? "" : "moved"}`); }
// S2
const CMD = arg("--select-cmd"), ROOT = arg("--root");
if (CMD && ROOT && existsSync(movF) && existsSync(selF)) {
    const sel = J(selF); const picked = new Set((sel.specs ?? []).map((s) => (typeof s === "string" ? s : s.spec)));
    const specs = []; (function walk(d) { for (const e of readdirSync(join(ROOT, d), { withFileTypes: true })) { if (e.name === "node_modules") continue; const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else if (/\.spec\.ts$/.test(p)) specs.push(p); } })("tests-visual");
    const pick = specs.sort().find((s) => !picked.has(s));
    if (!pick) { res.S2 = "SKIP"; say("S2 SKIP every tests-visual spec already selected"); }
    else {
        const mov = J(movF); mov.moves = [...(mov.moves ?? []), { from: pick, to: pick, step: "zq8" }];
        const mf = join(tmp, "moved-zq8.json"); writeFileSync(mf, JSON.stringify(mov)); const of = join(tmp, "sel-zq8.json");
        let txt = ""; try { txt = execSync(CMD.replaceAll("{MOVED}", mf).replaceAll("{OUT}", of).replaceAll("{ROOT}", ROOT), { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 26 }); } catch (e) { txt = `${e.stdout ?? ""}${e.stderr ?? ""}`; }
        const got = existsSync(of) ? J(of) : null;
        const has = got ? (got.specs ?? []).some((s) => (typeof s === "string" ? s : s.spec) === pick) : txt.includes(pick);
        res.S2 = has ? "PASS" : "FAIL";
        say(`S2 ${res.S2} planted self-move of an unselected spec ${pick}; ${got ? `new selection ${(got.specs ?? []).length} specs` : "no selection file; judged on stdout"}`);
    }
} else { res.S2 = "SKIP"; say("S2 SKIP no --select-cmd/--root"); }
rmSync(tmp, { recursive: true, force: true });
say(`BPLANTS ${JSON.stringify(res)}`);
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify({ res, lines: out }, null, 1));
