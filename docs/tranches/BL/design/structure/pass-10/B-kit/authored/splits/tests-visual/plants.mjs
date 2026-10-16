#!/usr/bin/env node
// plants.mjs — the tests-visual seat's plant battery. Each plant is one defect a tool or the
// gate must refuse; each reads RED (the refusal it names) or the battery exits 1. Controls
// (the unplanted inputs) must read clean.
//
//   --tools <scratch> --root <carved tree>: refusals of carve.mjs, split.mjs and conserve.mjs,
//       each fed a planted copy of its input (written under <scratch>):
//       T1 a module named with a placeholder (`utils`)       carve: placeholder name
//       T2 a module over 12 files after the splits          carve: > 12
//       T3 a file of tests-visual/ named by no module        carve: named by no …
//       T4 a block no part names (w1's `command`)            split: named by 0 parts
//       T5 a split whose one part keeps the whole file       split: > 500 lines
//       T6 a split row that drops one line of an output      conserve: MISSING
//     (run on the tree before the carve for T1-T3, and on the carved, unsplit tree for T4-T6)
//   --seal <tree>: the gate, through its in-memory overlay (seal.mjs --overlay), on the
//       carved, split tree with the gate row:
//       G1 a visual spec slotted in a unit it does not read (css-critical into chip)  B16
//       G2 a split's new file given a placeholder name (blob/helpers.ts)             B15
//       G3 a module dir at 13 files (glass/ + 1)                                     B6
//       G4 a split output over 500 lines                                              B6
//       G0 the control: no overlay                                                   B6/B15/B16 read no tests-visual line
//   node plants.mjs --tools <scratch> --root <tree> --phase carve|split [--splits <splits.json>]
//   node plants.mjs --seal <tree> --scratch <dir>
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KIT = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i < 0 ? undefined : args[i + 1]; };
const results = [];
const expect = (id, what, run, pattern) => {
    const r = run();
    const text = `${r.stdout ?? ""}${r.stderr ?? ""}`;
    const red = r.status !== 0 && pattern.test(text);
    results.push({ id, what, verdict: red ? "RED (caught)" : "MISSED", line: (text.match(pattern)?.[0] ?? text.trim().split("\n").pop()).slice(0, 140) });
};
const node = (script, a) => spawnSync("node", [join(KIT, script), ...a], { encoding: "utf8", maxBuffer: 1 << 28 });

if (opt("--tools")) {
    const scratch = resolve(opt("--tools"));
    const root = resolve(opt("--root"));
    mkdirSync(scratch, { recursive: true });
    const carve = JSON.parse(readFileSync(join(KIT, "carve.json"), "utf8"));
    const splitsPath = resolve(opt("--splits") ?? join(KIT, "splits.json")); // an arm whose tree lacks a split source passes a spec without it
    const splits = JSON.parse(readFileSync(splitsPath, "utf8"));
    const put = (name, doc) => { const p = join(scratch, name); writeFileSync(p, JSON.stringify(doc, null, 1)); return p; };
    const clone = (x) => JSON.parse(JSON.stringify(x));
    if (opt("--phase") === "carve") {
        const c0 = node("carve.mjs", ["--root", root, "--carve", join(KIT, "carve.json"), "--splits", splitsPath]);
        results.push({ id: "T0", what: "control: carve.json as authored", verdict: c0.status === 0 ? "clean" : "RED (control failed)", line: (c0.stdout || c0.stderr).split("\n")[0] });
        const c1 = clone(carve); c1.modules.find((m) => m.dir === "goo").dir = "utils";
        expect("T1", "a module named with a placeholder (goo -> utils)", () => node("carve.mjs", ["--root", root, "--carve", put("t1.json", c1), "--splits", splitsPath]), /placeholder name utils/);
        const c2 = clone(carve); const from = c2.modules.find((m) => m.dir === "glass/contrast"); const to = c2.modules.find((m) => m.dir === "glass");
        to.files.push(...from.files.splice(1, 2));
        expect("T2", "glass/ given two more files (14)", () => node("carve.mjs", ["--root", root, "--carve", put("t2.json", c2), "--splits", splitsPath]), /tests-visual\/glass: 14 files after the carve and splits > 12/);
        const c3 = clone(carve); c3.modules.find((m) => m.dir === "motion").files.pop();
        expect("T3", "a file of tests-visual/ named by no module", () => node("carve.mjs", ["--root", root, "--carve", put("t3.json", c3), "--splits", splitsPath]), /named by no stay, delete, slot or module/);
    } else {
        const s4 = clone(splits); const w1 = s4.splits.find((s) => s.source.endsWith("w1-radius-redress.spec.ts"));
        w1.parts[1].blocks = w1.parts[1].blocks.filter((b) => b !== "command");
        expect("T4", "w1's `command` block named by no part", () => node("split.mjs", ["--root", root, "--spec", put("t4.json", s4), "--only", w1.source]), /block "command[^"]*" is named by 0 parts/);
        const s5 = clone(splits); const ag = s5.splits.find((s) => s.source.endsWith("adaptive-glass.spec.ts")); ag.helpers = [];
        expect("T5", "adaptive-glass split with its helper taken away (one part keeps all)", () => node("split.mjs", ["--root", root, "--spec", put("t5.json", s5), "--only", ag.source]), /adaptive-glass\.spec\.ts: \d+ lines > 500/);
        const rowPath = join(scratch, "t6-row.json");
        const ok = node("split.mjs", ["--root", root, "--spec", splitsPath, "--out", rowPath]);
        if (ok.status !== 0) throw new Error(`T6: the split row did not derive: ${ok.stderr}`);
        const row = JSON.parse(readFileSync(rowPath, "utf8"));
        const c6 = node("conserve.mjs", ["--row", rowPath, "--spec", splitsPath, "--root", root]);
        results.push({ id: "T6c", what: "control: the split row as derived", verdict: c6.status === 0 ? "clean" : "RED (control failed)", line: c6.stdout.split("\n").filter(Boolean).length + " sources conserved" });
        const helper = "tests-visual/blob/blob-render-readback.ts";
        row.files[helper].create = row.files[helper].create.replace(/\n[^\n]*const EDGE_RING_W[^\n]*/, "");
        writeFileSync(join(scratch, "t6-planted.json"), JSON.stringify(row));
        expect("T6", "the split row with one line of an output dropped (EDGE_RING_W)", () => node("conserve.mjs", ["--row", join(scratch, "t6-planted.json"), "--spec", splitsPath, "--root", root]), /MISSING +tests-visual\/blob\/blob-render\.spec\.ts[\s\S]*EDGE_RING_W/);
    }
}

if (opt("--seal")) {
    const root = resolve(opt("--seal"));
    const scratch = resolve(opt("--scratch"));
    mkdirSync(scratch, { recursive: true });
    const read = (p) => readFileSync(join(root, p), "utf8");
    const sealRun = (name, overlay) => {
        const o = join(scratch, `${name}.overlay.json`), j = join(scratch, `${name}.seal.json`);
        writeFileSync(o, JSON.stringify(overlay));
        spawnSync("node", ["scripts/structure/seal/seal.mjs", "--overlay", o, "--json", j], { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 });
        return JSON.parse(readFileSync(j, "utf8"));
    };
    const lines = (r, k, re) => (r.V[k] ?? []).filter((l) => re.test(l));
    const TV = /tests-visual|__tests__\/[^ ]*\.visual\.ts/;
    const g0 = sealRun("g0", {});
    results.push({ id: "G0", what: "control: the carved, split tree, no overlay", verdict: ["B6", "B15", "B16"].every((k) => !lines(g0, k, TV).length) ? "clean" : "RED (control failed)", line: JSON.stringify(g0.counts) });
    const judge = (id, what, overlay, k, re) => {
        const r = sealRun(id.toLowerCase(), overlay);
        const hit = lines(r, k, re);
        results.push({ id, what, verdict: hit.length ? "RED (caught)" : "MISSED", line: `${k} ${g0.counts[k]} -> ${r.counts[k]}: ${hit[0] ?? "(none)"}`.slice(0, 180) });
    };
    judge("G1", "css-critical slotted into chip, a unit it does not read", { "tests-visual/color/css-critical.spec.ts": null, "src/components/chip/__tests__/css-critical.visual.ts": read("tests-visual/color/css-critical.spec.ts") }, "B16", /css-critical\.visual\.ts/);
    judge("G2", "a split's new file named helpers.ts", { "tests-visual/blob/blob-render-readback.ts": null, "tests-visual/blob/helpers.ts": read("tests-visual/blob/blob-render-readback.ts"), "tests-visual/blob/blob-render.spec.ts": read("tests-visual/blob/blob-render.spec.ts").replace('"./blob-render-readback.ts"', '"./helpers.ts"') }, "B15", /tests-visual\/blob\/helpers/);
    judge("G3", "glass/ at 13 files", { "tests-visual/glass/glass-extra.spec.ts": read("tests-visual/glass/glass-cal.spec.ts") }, "B6", /tests-visual\/glass\/: 13/);
    judge("G4", "blob-render.spec.ts over 500 lines", { "tests-visual/blob/blob-render.spec.ts": read("tests-visual/blob/blob-render.spec.ts") + "\n" + read("tests-visual/blob/blob-render-readback.ts").split("\n").map((l) => `// ${l}`).join("\n") }, "B6", /blob-render\.spec\.ts: \d+ lines > 500/);
}

for (const r of results) console.log(`${r.id.padEnd(4)} ${r.verdict.padEnd(22)} ${r.what}\n       ${r.line}`);
const missed = results.filter((r) => /MISSED|control failed/.test(r.verdict));
console.log(`${results.length - missed.length}/${results.length} as expected`);
process.exit(missed.length ? 1 : 0);
