#!/usr/bin/env node
// rebase-diff.mjs — measure the rebase: each step of this kit's chain against the step of the
// same id in pass 3's chain. For a move list: the moves (from -> to) only one side has. For a
// row: the files only one side touches, and the files both touch whose ops differ (a create's
// text, a removal, or the hunks). A step only one chain has is listed as such. The per-step
// digests always differ (the base moved), so they are not compared. Read-only.
//   node tools/rebase-diff.mjs [--json out.json]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KIT = join(dirname(fileURLToPath(import.meta.url)), "..");
const P3 = join(KIT, "../../pass-3/B-kit");
const seq = (k) => JSON.parse(readFileSync(join(k, "frozen/SEQUENCE.json"), "utf8"));
const load = (k, f) => (f ? JSON.parse(readFileSync(join(k, f), "utf8")) : null);
const a = seq(P3), b = seq(KIT);
const ids = [...new Set([...a.steps.map((s) => s.id), ...b.steps.map((s) => s.id)])];
const order = b.steps.map((s) => s.id);
ids.sort((x, y) => (order.indexOf(x) + 1 || 1e3) - (order.indexOf(y) + 1 || 1e3));
const out = [];
for (const id of ids) {
    const sa = a.steps.find((s) => s.id === id), sb = b.steps.find((s) => s.id === id);
    if (!sa || !sb) { out.push({ id, only: sa ? "pass-3" : "pass-4" }); continue; }
    const A = load(P3, sa.file), B = load(KIT, sb.file);
    const r = { id, kind: sb.kind, same: true };
    if (sb.kind === "moves") {
        const key = (m) => `${m.from} -> ${m.to}`;
        const ka = new Set(A.moves.map(key)), kb = new Set(B.moves.map(key));
        r.moves = [A.moves.length, B.moves.length];
        r.onlyP3 = [...ka].filter((k) => !kb.has(k));
        r.onlyP4 = [...kb].filter((k) => !ka.has(k));
        r.scanDeltas = [A.scanDeltas?.length ?? 0, B.scanDeltas?.length ?? 0];
        r.same = !r.onlyP3.length && !r.onlyP4.length;
    } else if (sb.kind === "row") {
        const fa = Object.keys(A.files), fb = Object.keys(B.files);
        r.files = [fa.length, fb.length];
        r.onlyP3 = fa.filter((f) => !(f in B.files));
        r.onlyP4 = fb.filter((f) => !(f in A.files));
        r.changed = fb.filter((f) => f in A.files && JSON.stringify(A.files[f]) !== JSON.stringify(B.files[f]));
        r.same = !r.onlyP3.length && !r.onlyP4.length && !r.changed.length;
    }
    out.push(r);
}
for (const r of out) {
    if (r.only) { console.log(`${r.id}: only in ${r.only}`); continue; }
    if (r.kind === "floor-rows") { console.log(`${r.id} [floor-rows]: the floor's own rows (not compared here)`); continue; }
    const n = r.kind === "moves" ? `moves ${r.moves.join(" -> ")}` : `files ${r.files.join(" -> ")}`;
    console.log(`${r.id} [${r.kind}] ${r.same ? "SAME" : "CHANGED"} ${n}${r.onlyP3?.length ? ` · only p3 ${r.onlyP3.length}` : ""}${r.onlyP4?.length ? ` · only p4 ${r.onlyP4.length}` : ""}${r.changed?.length ? ` · ops differ ${r.changed.length}` : ""}`);
    for (const k of ["onlyP3", "onlyP4", "changed"]) for (const x of r[k] ?? []) console.log(`    ${k}: ${x}`);
}
const i = process.argv.indexOf("--json");
if (i > 0) writeFileSync(process.argv[i + 1], `${JSON.stringify(out, null, 1)}\n`);
