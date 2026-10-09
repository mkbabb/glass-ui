#!/usr/bin/env node
// test-doors.mjs — DERIVE: a colocated test crosses every module but its home through the door
// (LAW §5, B1). The list is the landed gate's own B1 reading of the tree: each B1 line whose
// source is a test and whose edge is an import is re-pointed at the entered module's door, in
// the `@glass/…` form the tests use, when the door carries every imported name from that file
// (by origin, F-3); a default import becomes the door's named re-export of that default. A
// line the door does not carry stops the run (the door is not widened here: B11 would judge
// a name only a test reads). An entry source inside the entered module is its door too (the
// library itself reads motion's pointer and spring leaves through ./motion-core): the first
// of the door and those entry sources that carries every name is taken. A namespace import
// carries the members the test reads off it (`X.name`, `spyOn(X, "name")`). Applied as one frozen row (lib/row.mjs), recorded as a step.
//   node derive/test-doors.mjs --root <wt> --id S28 --out frozen/S28-test-doors.json [--dry]
import { readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg, loadFloor } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const lines = seal(root).V.B1
    .map((s) => /^(\S+):(\d+) -> (\S+) \[import\] \(door (\S+)\)$/.exec(s))
    .filter((m) => m && /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(m[1]))
    .map(([, from, line, to, door]) => ({ from, line: Number(line), to, door }));
const g = F.buildGraph(root);
const O = F.makeOrigins(g);
const alias = (door) => `@glass/${(posix.basename(door).startsWith("index.") ? posix.dirname(door) : door.replace(/\.ts$/, "")).replace(/^src\//, "")}`;
const ENTRY_SOURCES = JSON.parse(readFileSync(join(root, "scripts/structure/records/entry-record.json"), "utf8")).js.map(([, source]) => source);
const files = {};
const stop = [];
const reasons = [];
for (const l of lines) {
    const e = g.edges.find((x) => x.from === l.from && x.line === l.line && x.to === l.to && x.kind === "import");
    if (!e) { stop.push(`${l.from}:${l.line}: no import edge`); continue; }
    const text = (files[l.from] ??= readFileSync(join(root, l.from), "utf8"));
    const stmt = new RegExp(`^[ \\t]*import(\\s+type)?\\s+([^;]*?)\\s+from\\s+(["'])${e.spec.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}\\3;`, "m").exec(text);
    if (!stmt) { stop.push(`${l.from}:${l.line}: no statement for ${e.spec}`); continue; }
    const doors = [l.door, ...ENTRY_SOURCES.filter((f) => f !== l.door && f.startsWith(`${posix.dirname(l.door)}/`))];
    const carries = (door, names) => names.every((n) => O.originOf(door, n).some((o) => o.file === l.to));
    let clause = stmt[2];
    let door = null;
    const def = /^([A-Za-z_$][\w$]*)$/.exec(clause);
    const ns = /^\*\s+as\s+([A-Za-z_$][\w$]*)$/.exec(clause);
    if (def) {
        // the door re-exports the file's default under a name: take that name
        for (const d of doors) {
            const named = [...readFileSync(join(root, d), "utf8").matchAll(/export\s*\{\s*default as (\w+)\s*\}\s*from\s*["']([^"']+)["']/g)]
                .find((m) => posix.normalize(posix.join(posix.dirname(d), m[2])) === l.to);
            if (named) { door = d; clause = named[1] === def[1] ? `{ ${def[1]} }` : `{ ${named[1]} as ${def[1]} }`; break; }
        }
        if (!door) { stop.push(`${l.from}:${l.line}: no door carries the default of ${l.to}`); continue; }
    } else {
        const names = ns
            ? [...new Set([...text.matchAll(new RegExp(`\\b${ns[1]}\\.(\\w+)|spyOn\\(\\s*${ns[1]}\\s*,\\s*["'](\\w+)["']`, "g"))].map((m) => m[1] ?? m[2]))]
            : (e.names ?? []).map((n) => n.imported);
        door = names.length ? doors.find((d) => carries(d, names)) : null;
        if (!door) { stop.push(`${l.from}:${l.line}: none of ${doors.join(", ")} carries ${names.join(", ") || "(no names)"}`); continue; }
    }
    const to = `import${stmt[1] ?? ""} ${clause} from ${stmt[3]}${alias(door)}${stmt[3]};`;
    files[l.from] = text.replace(stmt[0], () => to);
    reasons.push({ file: l.from, from: stmt[0], to, why: `B1: ${l.to} is inside ${posix.dirname(l.door)}; the test reads it through ${door}` });
}
console.log(JSON.stringify({ lines: lines.length, edits: reasons.length, stops: stop.length }));
for (const s of stop) console.log(`  stop ${s}`);
if (stop.length) process.exit(1);
if (args.includes("--dry")) { for (const r of reasons) console.log(`  ${r.file}: ${r.to}`); process.exit(0); }
const id = arg(args, "--id");
const row = { ...makeRow(root, `${id} B1: colocated tests cross other modules through their doors (frozen from the gate's B1 reading, F-9)`, files), reasons };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id, kind: "row", file, why: `B1 (LAW §5): ${reasons.length} imports of colocated tests re-pointed at the entered module's door` });
