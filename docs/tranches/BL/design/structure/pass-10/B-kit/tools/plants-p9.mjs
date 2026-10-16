#!/usr/bin/env node
// plants-p9.mjs — pass 9's plant battery (§P8-6.4). Nothing in the trees it reads is left changed:
// gate plants are in-memory overlays; a judge plant that needs a throwing kit module runs a COPY of
// the kit (results left out) under the OS temp dir, which it removes; report plants write rewritten
// copies of the committed reports into the temp dir; the one dist plant truncates a built file of
// the seat's own worktree and puts its bytes back in a finally.
//   node tools/plants-p9.mjs --root <migrated, built tree> --reports <dir holding base.json,
//        base-rekeyed.json, route.json, reruns/> --out <json>
// Plants:
//   JUDGE    P8-R2 (a), LAW §14: each kit judge (browser-tally, browser-select, rekey, peer-closure)
//            exits 2 with `<tool>: no verdict` on no arguments, a missing input, a non-JSON input, a
//            wrong-schema input, and a kit module that throws as it loads (a copied kit whose
//            lib/floor.mjs, lib/follow.mjs or gate/peer.mjs throws); each clean control exits 0
//   EMPTY    P8-R2 (a): a degenerate input exits 2: an empty route report, an empty base report,
//            an empty rerun, a base that passes no test (tally); an empty base report, and one the
//            chain carries none of (rekey); an emptied dist entry (dist/motion-core.js) and an
//            emptied module it imports (peer-closure)
//   CAPTURE  P8-R1 (a): a capture spec the chain moves (S43b/S43c), and a `_` capture helper it moves,
//            each with a broken import, reads RED
//            (B0, exit 1 through the CLI); the same spec with a new import that resolves reads no new
//            count; the selection prints the excluded touched captures
//   XR       P8-R3 (b): the ./motion-core row withdrawn from src/README.md reads as written (no
//            count: a reviewed source edit); withdrawn plus a keyframes.js leaf it publishes, and
//            withdrawn plus an existing leaf gaining keyframes.js, each read RED by B18 through the
//            root's class
//   REDERIVE the re-keyed base re-derived from the committed base.json onto the tree equals the
//            committed base-rekeyed.json's results; the tally over the committed reports is GREEN
import { spawnSync } from "node:child_process";
import { appendFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.on("uncaughtException", (e) => {
    console.error(`plants-p9: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { arg } = await import("../lib/floor.mjs");
const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const reports = resolve(arg(args, "--reports"));
const out = resolve(arg(args, "--out"));
const CLI = "scripts/structure/seal/seal.mjs";
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const read = (p) => readFileSync(join(root, p), "utf8");
const results = [];
const note = (r) => { results.push(r); console.log(`${r.ok ? "PASS" : "FAIL"} ${r.kind} ${r.id}: ${r.read}`); };
const tmp = mkdtempSync(join(tmpdir(), "p9-plants-"));
const node = (cli, a, cwd) => spawnSync(process.execPath, [cli, ...a], { encoding: "utf8", maxBuffer: 1 << 27, cwd });
const first = (t) => (t.split("\n").find((l) => l.trim()) ?? "").slice(0, 170);
const T = (name) => join(KIT, "tools", name);

// a copy of the kit (frozen/, lib/, gate/, tools/, authored/; no results) with one module made to throw as it loads
const kitCopy = (name, mod) => {
    const k = join(tmp, name);
    for (const d of ["frozen", "lib", "gate", "tools", "authored"]) cpSync(join(KIT, d), join(k, d), { recursive: true });
    appendFileSync(join(k, mod), `\nthrow new Error("zq9: ${mod} throws as it loads");\n`);
    return k;
};
const judge = (kind, id, cli, a, expect, msg) => {
    const run = node(cli, a);
    const tool = cli.split("/").pop().replace(/\.mjs$/, "");
    const loud = expect !== 2 || (run.stderr.includes(`${tool}: no verdict`) && (!msg || run.stderr.includes(msg)));
    note({ kind, id, expect, exit: run.status, ok: run.status === expect && loud, read: `exit ${run.status} (expect ${expect})${expect === 2 ? ` · ${first(run.stderr)}` : ` · ${first(run.stdout.trim().split("\n").at(-1) ?? "")}`}` });
    return run;
};

try {
    const BASE = join(reports, "base.json"), BR = join(reports, "base-rekeyed.json"), RT = join(reports, "route.json");
    const B = JSON.parse(readFileSync(BR, "utf8")), R = JSON.parse(readFileSync(RT, "utf8")), B0 = JSON.parse(readFileSync(BASE, "utf8"));
    const w = (name, doc) => { const p = join(tmp, name); writeFileSync(p, typeof doc === "string" ? doc : JSON.stringify(doc)); return p; };
    const bad = w("bad.json", "{ not json"), wrong = w("wrong.json", { $schema: "browser-seat/1", testDir: ".", results: [{ spec: "a", title: "b", status: "expected" }] });
    const missing = join(tmp, "no-such-report.json");
    const reruns = readdirSync(join(reports, "reruns"));
    const RR = [...reruns.filter((f) => /^base-.*\.rekeyed\.json$/.test(f)).flatMap((f) => ["--base-rerun", join(reports, "reruns", f)]), ...reruns.filter((f) => /^route-.*\.json$/.test(f)).flatMap((f) => ["--route-rerun", join(reports, "reruns", f)])];

    // ---- JUDGE: browser-tally
    const TALLY = T("browser-tally.mjs");
    judge("JUDGE", "tally: no arguments", TALLY, [], 2, "--base and --route are required");
    judge("JUDGE", "tally: a missing route report", TALLY, ["--base", BR, "--route", missing], 2, "ENOENT");
    judge("JUDGE", "tally: a non-JSON route report", TALLY, ["--base", BR, "--route", bad], 2);
    judge("JUDGE", "tally: a wrong-schema base report", TALLY, ["--base", wrong, "--route", RT], 2, "not browser-seat/2");
    judge("JUDGE", "tally: the committed reports (control)", TALLY, ["--base", BR, "--route", RT, ...RR], 0);
    // ---- JUDGE: rekey
    const REKEY = T("rekey.mjs");
    judge("JUDGE", "rekey: no arguments", REKEY, [], 2, "usage");
    judge("JUDGE", "rekey: a missing base report", REKEY, [missing, root, join(tmp, "rk.json")], 2, "ENOENT");
    judge("JUDGE", "rekey: a non-JSON base report", REKEY, [bad, root, join(tmp, "rk.json")], 2);
    judge("JUDGE", "rekey: a wrong-schema base report", REKEY, [wrong, root, join(tmp, "rk.json")], 2, "browser-seat/2");
    judge("JUDGE", "rekey: a tree that names nothing", REKEY, [BASE, join(tmp, "no-tree"), join(tmp, "rk.json")], 2, "holds no package.json");
    // ---- JUDGE: browser-select
    const SELECT = T("browser-select.mjs");
    judge("JUDGE", "select: no arguments", SELECT, [], 2, "--root and --out are required");
    judge("JUDGE", "select: a --root that names nothing", SELECT, ["--root", join(tmp, "no-tree"), "--out", join(tmp, "sel-x")], 2, "holds no package.json");
    const selBadSeq = kitCopy("kit-seq", "lib/sequence.mjs");
    judge("JUDGE", "select: the chain reader throws as it loads (lib/sequence.mjs)", join(selBadSeq, "tools/browser-select.mjs"), ["--root", root, "--out", join(tmp, "sel-y")], 2, "zq9: lib/sequence.mjs");
    const kitFloor = kitCopy("kit-floor", "lib/floor.mjs");
    judge("JUDGE", "select: the floor loader throws as it loads (lib/floor.mjs)", join(kitFloor, "tools/browser-select.mjs"), ["--root", root, "--out", join(tmp, "sel-z")], 2, "zq9: lib/floor.mjs");
    // ---- JUDGE: peer-closure
    const PROBE = T("peer-closure.mjs"), PBASE = join(KIT, "results/p10/peer-closure-base.json");
    judge("JUDGE", "probe: no arguments", PROBE, [], 2, "--root is required");
    judge("JUDGE", "probe: a missing --base report", PROBE, ["--root", root, "--base", missing], 2, "ENOENT");
    judge("JUDGE", "probe: a non-JSON --base report", PROBE, ["--root", root, "--base", bad], 2);
    judge("JUDGE", "probe: the floor loader throws as it loads (lib/floor.mjs)", join(kitFloor, "tools/peer-closure.mjs"), ["--root", root, "--base", PBASE], 2, "zq9: lib/floor.mjs");
    const kitPeer = kitCopy("kit-peer", "gate/peer.mjs");
    judge("JUDGE", "probe: B18's reader throws as it loads (gate/peer.mjs)", join(kitPeer, "tools/peer-closure.mjs"), ["--root", root, "--base", PBASE], 2, "zq9: gate/peer.mjs");
    const kitFollow = kitCopy("kit-follow", "lib/follow.mjs");
    judge("JUDGE", "rekey: the chain follower throws as it loads (lib/follow.mjs)", join(kitFollow, "tools/rekey.mjs"), [BASE, root, join(tmp, "rk.json")], 2, "zq9: lib/follow.mjs");
    judge("JUDGE", "probe: the built tree (control)", PROBE, ["--root", root, "--base", PBASE], 0);

    // ---- EMPTY: degenerate inputs
    const emptyRoute = w("route-empty.json", { ...R, results: [] }), emptyBase = w("base-empty.json", { ...B, results: [] });
    judge("EMPTY", "tally: an empty route report", TALLY, ["--base", BR, "--route", emptyRoute], 2, "holds no results");
    judge("EMPTY", "tally: an empty base report", TALLY, ["--base", emptyBase, "--route", RT], 2, "holds no results");
    judge("EMPTY", "tally: an empty route rerun beside the full runs", TALLY, ["--base", BR, "--route", RT, "--route-rerun", emptyRoute], 2, "holds no results");
    const noGreen = w("base-no-green.json", { ...B, results: B.results.map((x) => ({ ...x, status: "unexpected" })) });
    judge("EMPTY", "tally: a base that passes no test", TALLY, ["--base", noGreen, "--route", RT], 2, "passes no test");
    judge("EMPTY", "rekey: an empty base report", REKEY, [w("base0-empty.json", { ...B0, results: [] }), root, join(tmp, "rk.json")], 2, "holds no results");
    judge("EMPTY", "rekey: a base the chain carries none of to the tree", REKEY, [w("base0-alien.json", { ...B0, results: B0.results.slice(0, 3).map((x) => ({ ...x, spec: `zq9-nowhere/${x.spec}` })) }), root, join(tmp, "rk.json")], 2, "carries none");
    // the dist arm: an emptied entry file, and an emptied module the entry imports (bytes restored in a finally)
    const pkg = JSON.parse(read("package.json"));
    const entryRel = pkg.exports["./motion-core"].import;
    const entryAbs = join(root, entryRel);
    const chunkRel = [...readFileSync(entryAbs, "utf8").matchAll(/from\s*["'](\.[^"']+)["']/g)].map((m) => m[1])[0];
    const truncate = (abs, id, msg) => {
        const keep = readFileSync(abs);
        try { writeFileSync(abs, ""); judge("EMPTY", id, PROBE, ["--root", root, "--base", PBASE], 2, msg); }
        finally { writeFileSync(abs, keep); }
        if (!readFileSync(abs).equals(keep)) throw new Error(`plants-p9: ${abs} was not restored`);
    };
    truncate(entryAbs, `probe: the dist entry emptied (${entryRel})`, "is empty");
    if (chunkRel) truncate(resolve(dirname(entryAbs), chunkRel), `probe: a module the entry imports emptied (${chunkRel})`, "is empty");
    else note({ kind: "EMPTY", id: "probe: a module the entry imports emptied", ok: false, read: `${entryRel} imports no relative module` });
    judge("EMPTY", "probe: the built tree after both restores (control)", PROBE, ["--root", root, "--base", PBASE], 0);

    // ---- CAPTURE: a moved capture spec's imports are read (B0)
    const seq = JSON.parse(readFileSync(join(KIT, "frozen/SEQUENCE.json"), "utf8"));
    const movedCaptures = seq.steps.filter((s) => s.kind === "moves").flatMap((s) => JSON.parse(readFileSync(join(KIT, s.file), "utf8")).moves.map((m) => ({ ...m, step: s.id }))).filter((m) => m.to.split("/").pop().startsWith("_") && m.to.startsWith("tests-visual/"));
    const movedSpecs = movedCaptures.filter((m) => m.to.endsWith(".spec.ts"));
    const clean = seal(root, {});
    const relOf = (m) => ({ ...m, rel: (read(m.to).match(/from\s+["'](\.{1,2}\/[^"']+)["']/) ?? [])[1] });
    // the capture spec itself, and the `_` helper a capture probe reads (both moved by the chain)
    const targets = [movedSpecs.map(relOf).find((m) => m.rel), movedCaptures.filter((m) => !m.to.endsWith(".spec.ts")).map(relOf).find((m) => m.rel)];
    if (!targets[0]) note({ kind: "CAPTURE", id: "a moved capture spec with a relative import", ok: false, read: `none of ${movedSpecs.length} moved capture specs holds a relative import` });
    for (const withImport of targets.filter(Boolean)) {
        const txt = read(withImport.to);
        const broken = txt.replace(`"${withImport.rel}"`, `"${withImport.rel}-zq9-gone"`).replace(`'${withImport.rel}'`, `'${withImport.rel}-zq9-gone'`);
        const ov = { [withImport.to]: broken };
        const r = seal(root, { overlay: ov });
        const red = Object.keys(r.counts).filter((k) => r.counts[k] > (clean.counts[k] ?? 0));
        const line = r.V.B0.find((l) => l.includes(withImport.to)) ?? "";
        note({ kind: "CAPTURE", id: `a moved capture ${withImport.to.endsWith(".spec.ts") ? "spec" : "helper"}'s import broken (${withImport.to}, moved by ${withImport.step}: "${withImport.rel}")`, red, ok: red.includes("B0") && !!line, read: `red [${red.join(",")}] · ${line.slice(0, 170)}` });
        const cli = node(join(root, CLI), ["--root", root, "--overlay", w("capture-broken.json", ov)]);
        note({ kind: "CAPTURE", id: `the same plant through the CLI (${withImport.to})`, exit: cli.status, ok: cli.status === 1, read: `exit ${cli.status} (expect 1) · ${first(cli.stdout.split("\n").filter((l) => l.startsWith("FAIL")).join(" | "))}` });
        const sidecar = `${withImport.to.replace(/\/[^/]+$/, "")}/zq9Helper.ts`;
        const okOv = { [sidecar]: "export const zq9 = 1;\n", [withImport.to]: `import { zq9 } from "./zq9Helper";\nvoid zq9;\n${txt}` };
        const rc = seal(root, { overlay: okOv });
        const redC = Object.keys(rc.counts).filter((k) => rc.counts[k] > (clean.counts[k] ?? 0));
        note({ kind: "CAPTURE", id: `control: ${withImport.to} gains an import that resolves`, red: redC, ok: !redC.includes("B0"), read: `red [${redC.join(",")}]` });
        const noRel = { [withImport.to]: `import "./zq9-nowhere";\n${txt}` };
        const rn = seal(root, { overlay: noRel });
        const redN = Object.keys(rn.counts).filter((k) => rn.counts[k] > (clean.counts[k] ?? 0));
        note({ kind: "CAPTURE", id: `${withImport.to} gains a side-effect import that resolves to nothing`, red: redN, ok: redN.includes("B0"), read: `red [${redN.join(",")}] · ${(rn.V.B0.find((l) => l.includes(withImport.to)) ?? "").slice(0, 160)}` });
    }
    const selOut = join(tmp, "sel");
    const s = node(SELECT, ["--root", root, "--out", selOut]);
    const caps = s.status === 0 ? readFileSync(join(selOut, "captures.txt"), "utf8").split("\n").filter(Boolean) : [];
    const printed = s.stdout.split("\n").filter((l) => l.startsWith("EXCLUDED capture"));
    note({ kind: "CAPTURE", id: "the selection states the excluded touched captures", ok: s.status === 0 && caps.length > 0 && printed.length === caps.length && movedSpecs.every((m) => caps.some((c) => c.startsWith(`${m.to}\t`))), read: `exit ${s.status}; captures.txt ${caps.length}, printed ${printed.length}; capture specs in the chain's move lists ${movedSpecs.length}, every one listed: ${movedSpecs.every((m) => caps.some((c) => c.startsWith(`${m.to}\t`)))}` });

    // ---- XR: the declared set (P8-R3 (b))
    const README = "src/README.md";
    const L = read(README).split("\n");
    const i = L.findIndex((l) => /@mkbabb\/glass-ui\/motion-core\s+\(none/.test(l));
    if (i < 0) note({ kind: "XR", id: "the ./motion-core row", ok: false, read: "no row in src/README.md" });
    else {
        const dropped = [...L.slice(0, i), ...L.slice(i + 1)].join("\n");
        const raf = "src/composables/motion/core/useRAFLoop.ts", MC = "src/composables/motion/core/index.ts";
        const kf = { "src/composables/motion/core/zq9Kf.ts": 'import * as zq9Kf from "@mkbabb/keyframes.js";\nexport const zq9KfLeak = (): unknown => zq9Kf;\n', [MC]: `${read(MC)}export * from "./zq9Kf";\n` };
        const xr = [
            { id: "XR-drop: the ./motion-core row withdrawn (a reviewed source edit, read as written)", files: { [README]: dropped }, expect: [] },
            { id: "XR-drop-KF: withdrawn + a keyframes.js leaf published on ./motion-core", files: { [README]: dropped, ...kf }, expect: ["B18"], line: ". (declared free of @mkbabb/keyframes.js)" },
            { id: "XR-drop-leaf: withdrawn + an existing motion-core leaf gains keyframes.js", files: { [README]: dropped, [raf]: `import * as zq9L from "@mkbabb/keyframes.js";\nvoid zq9L;\n${read(raf)}` }, expect: ["B18"], line: ". (declared free of @mkbabb/keyframes.js)" },
        ];
        for (const p of xr) {
            let r, error = null;
            try { r = seal(root, { overlay: p.files }); } catch (e) { error = e.message; }
            const red = r ? Object.keys(r.counts).filter((k) => r.counts[k] > (clean.counts[k] ?? 0)) : [];
            const ok = !error && (p.expect.length ? p.expect.every((k) => red.includes(k)) && r.V.B18.some((l) => l.startsWith(p.line)) : !red.length);
            note({ kind: "XR", id: p.id, red, ok, read: `red [${red.join(",")}]${error ? ` error ${error}` : ""}${r?.V.B18.length ? ` · ${r.V.B18[0].slice(0, 150)}` : ""}` });
        }
    }

    // ---- REDERIVE: rekey and tally from the committed reports
    const rk = join(tmp, "base-rekeyed.json");
    const rr = node(REKEY, [BASE, root, rk]);
    const same = rr.status === 0 && JSON.stringify(JSON.parse(readFileSync(rk, "utf8")).results) === JSON.stringify(B.results);
    note({ kind: "REDERIVE", id: "base.json re-keyed onto the tree equals the committed base-rekeyed.json", exit: rr.status, ok: same, read: `exit ${rr.status}; results ${same ? "identical" : "DIFFER"} · ${first(rr.stdout).slice(0, 120)}` });
} finally { rmSync(tmp, { recursive: true, force: true }); }

const summary = { plants: results.length, passed: results.filter((r) => r.ok).length, results };
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(summary, null, 1)}\n`);
console.log(`battery ${summary.passed}/${summary.plants}`);
process.exitCode = summary.passed === summary.plants ? 0 : 1;
