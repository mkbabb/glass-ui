#!/usr/bin/env node
// floor11.mjs --root <linked worktree> --cli <move.mjs CLI> --label <name> [--expect kept|lost] · critique-B pass 11 ·
// written and hashed BEFORE reading pass-11/B-kit, pass-11/B-proto.md or pass-11/plants/.
// P10-R1 (a): "floor/lib/move.mjs:168 takes the one-line cure with a floor plant that moves a holder of "./dist/x" and
// reads the spelling kept". FLOOR.md F-2 / P4-F3: "a root-relative spelling is kept verbatim".
// This seat's own plant. Each shape is a fresh holder file under scripts/zq11a/ moved to scripts/zq11b/ by the given
// move CLI (the floor's F-2 CLI, `move.mjs <moves.json> --root <wt> --out <report>`), one move per shape, then removed:
//   H-ctl      a holder with no path literal                        move exit 0, nothing to keep (mechanics control)
//   H-dot-read readFileSync("./dist/index.d.ts")                    KEPT: the moved file still reads "./dist/index.d.ts"
//   H-dot-exst existsSync("./dist/glass-ui.js")                      KEPT
//   H-dot-obj  { types: "./dist/index.d.ts" } read by readFileSync   KEPT (the entries.mjs:70 shape, an object literal
//              value beside a read of the same literal's dir)
//   H-dot-q    readFileSync("./dist/x.css?raw")                     KEPT with its query
//   H-bare     readFileSync("dist/index.d.ts")                       KEPT (no lead: regression)
//   H-up       readFileSync("../dist/index.d.ts")                    KEPT (the `../` lead: regression)
// A shape is KEPT when the move exits 0 and the file at its new path holds the literal byte for byte; LOST when the move
// refuses (non-zero, lost edges) or the literal is respelled. With --expect kept every ./-lead shape must be KEPT; with
// --expect lost (the pre-cure engine) at least one ./-lead shape must be LOST, else the plant does not discriminate
// (VACUOUS, a fail). Controls H-ctl, H-bare, H-up must be KEPT under both engines. After every shape the two dirs are
// removed and `git status --porcelain` must equal the snapshot before the plant (RESTORE line).
// Prints `FL11 <label> <id> KEPT|LOST|SETUP-FAIL :: …`, then `FL11 <label> SUMMARY pass=<n> fail=<n>`; exit 0 iff fail=0.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const a = process.argv.slice(2);
const opt = (k) => { const i = a.indexOf(k); if (i < 0) return null; const v = a[i + 1]; if (!v || v.startsWith("--")) throw new Error(`${k} needs a value`); return v; };
const root = opt("--root"), cli = opt("--cli"), label = opt("--label") ?? "engine", expect = opt("--expect") ?? "kept";
if (!root || !cli) { console.error("usage: floor11.mjs --root <wt> --cli <move.mjs> --label <l> [--expect kept|lost]"); process.exit(2); }
const porcelain = () => execFileSync("git", ["-C", root, "status", "--porcelain", "--untracked-files=all"], { encoding: "utf8", maxBuffer: 1 << 28 });
const before = porcelain();
const A = "scripts/zq11a", B = "scripts/zq11b";
const SHAPES = [
    ["H-ctl", "export const zq11 = 1;\n", null, "ctl"],
    ["H-dot-read", 'import { readFileSync } from "node:fs";\nexport const zq11 = () => readFileSync("./dist/index.d.ts", "utf8");\n', '"./dist/index.d.ts"', "dot"],
    ["H-dot-exst", 'import { existsSync } from "node:fs";\nexport const zq11 = () => existsSync("./dist/glass-ui.js");\n', '"./dist/glass-ui.js"', "dot"],
    ["H-dot-obj", 'import { readFileSync } from "node:fs";\nexport const zq11 = { types: "./dist/index.d.ts" };\nexport const zq11r = () => readFileSync("./dist/index.d.ts", "utf8");\n', '"./dist/index.d.ts"', "dot"],
    ["H-dot-q", 'import { readFileSync } from "node:fs";\nexport const zq11 = () => readFileSync("./dist/x.css?raw", "utf8");\n', '"./dist/x.css?raw"', "dot"],
    ["H-bare", 'import { readFileSync } from "node:fs";\nexport const zq11 = () => readFileSync("dist/index.d.ts", "utf8");\n', '"dist/index.d.ts"', "ctl"],
    ["H-up", 'import { readFileSync } from "node:fs";\nexport const zq11 = () => readFileSync("../dist/index.d.ts", "utf8");\n', '"../dist/index.d.ts"', "ctl"],
];
let pass = 0, fail = 0; const dotLost = [], dotKept = [];
const say = (id, v, why) => console.log(`FL11 ${label} ${id} ${v} :: ${why}`);
for (const [id, text, lit, kind] of SHAPES) {
    rmSync(join(root, A), { recursive: true, force: true }); rmSync(join(root, B), { recursive: true, force: true });
    mkdirSync(join(root, A), { recursive: true });
    writeFileSync(join(root, A, "zq11.mjs"), text);
    const list = join(root, "..", `zq11-moves-${id}.json`), rep = join(root, "..", `zq11-report-${id}.json`);
    writeFileSync(list, JSON.stringify({ moves: [{ from: `${A}/zq11.mjs`, to: `${B}/zq11.mjs` }] }));
    const r = spawnSync("node", [cli, list, "--root", root, "--out", rep], { encoding: "utf8", maxBuffer: 1 << 28, timeout: 600000 });
    const moved = join(root, B, "zq11.mjs");
    const after = existsSync(moved) ? readFileSync(moved, "utf8") : null;
    let lost = "?"; try { const j = JSON.parse(readFileSync(rep, "utf8")); lost = j.image?.lost?.length ?? "?"; } catch {}
    const tail = `${(r.stdout + r.stderr).split("\n").filter(Boolean).filter((l) => /lost|refus|RESIDUE|error|Error/i.test(l)).slice(0, 2).join(" | ").slice(0, 200)}`;
    const keptText = after !== null && (lit === null || after.includes(lit));
    const v = r.status === 0 && keptText ? "KEPT" : "LOST";
    const why = `move rc=${r.status} lost=${lost} moved-file=${after === null ? "absent" : "present"}${lit ? ` literal ${lit} ${after?.includes(lit) ? "kept" : "not found"}` : ""}${after && lit && !after.includes(lit) ? ` now: ${(after.match(/"[^"]*dist[^"]*"/) ?? ["?"])[0]}` : ""}${tail ? ` :: ${tail}` : ""}`;
    if (kind === "ctl") { if (v === "KEPT") { pass++; say(id, "KEPT", why); } else { fail++; say(id, "SETUP-FAIL", why); } }
    else { (v === "KEPT" ? dotKept : dotLost).push(id); if (expect === "kept") { v === "KEPT" ? pass++ : fail++; say(id, v === "KEPT" ? "KEPT" : "LOST(FAIL)", why); } else say(id, v, why); }
    rmSync(join(root, A), { recursive: true, force: true }); rmSync(join(root, B), { recursive: true, force: true }); rmSync(list, { force: true }); rmSync(rep, { force: true });
}
if (expect === "lost") { if (dotLost.length) { pass++; say("DISCRIMINATES", "PASS", `pre-cure engine loses ${dotLost.join(",")}`); } else { fail++; say("DISCRIMINATES", "VACUOUS(FAIL)", "the pre-cure engine kept every ./-lead shape: the plant cannot tell the engines apart"); } }
const restored = porcelain() === before;
restored ? pass++ : fail++;
say("RESTORE", restored ? "PASS" : "FAIL", restored ? "git status identical to before the plant" : "git status differs after the plant");
console.log(`FL11 ${label} SUMMARY pass=${pass} fail=${fail} dot-kept=${dotKept.join(",") || "-"} dot-lost=${dotLost.join(",") || "-"}`);
process.exit(fail ? 1 : 0);
