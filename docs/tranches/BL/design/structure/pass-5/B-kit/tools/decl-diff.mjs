#!/usr/bin/env node
// decl-diff.mjs — the "other declarations" class of the ratchet row explained (P4-R3, P4-G9).
// Reads two built dist/ trees and splits every declaration file that is not a door
// (`*.d.ts` not named `index.d.ts`, pack-diff.mjs's class) into four kinds of bytes:
//   wiring    import statements and `export … from` statements (how a file reaches others);
//   comments  JSDoc blocks and line comments (the prose a source file carries into its .d.ts);
//   body      every other byte (the declarations themselves);
// and pairs the files across the two trees: by identical text (a pure move), then by file
// name (a moved or edited file), the rest as added or removed. A delta is then stated by
// kind and by pairing, so a growth reads as "N new files, each with its own wiring and
// prose", or as "the same file, longer specifiers", never as one number.
// With --doors, door declarations (`index.d.ts`) are read too, so a byte a step moves from a
// door into a named file (B14, S5a) reads as the move it is. With --chain, every changed file
// is charged to the last chain step that wrote or moved its source (src/<path>.ts or .vue).
//   node tools/decl-diff.mjs <dist-base> <dist-now> [--doors] [--chain frozen/SEQUENCE.json] [--top 25] [--out result.json]
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

const args = process.argv.slice(2);
const valued = new Set(["--top", "--out", "--chain"].map((f) => args.indexOf(f) + 1).filter((i) => i > 0));
const [baseDir, nowDir] = args.filter((a, i) => !a.startsWith("--") && !valued.has(i));
const top = Number(args[args.indexOf("--top") + 1]) || 25;
const outPath = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
const doors = args.includes("--doors");
const chainPath = args.includes("--chain") ? args[args.indexOf("--chain") + 1] : null;

const list = (root) => {
    const out = [];
    const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.d\.ts$/.test(e.name) && (doors || e.name !== "index.d.ts")) out.push(relative(root, p)); } };
    walk(root);
    return out.sort();
};
/** Bytes of a declaration file by kind. Comments first (a JSDoc block or a line comment);
 *  then, in the text without them, every statement that starts a line with `import` or is an
 *  `export … from "…"` (multi-line included) is wiring; the rest is body. */
const WIRING = /^[ \t]*(?:import\b[^;]*;|export\s*(?:type\s*)?(?:\*(?:\s+as\s+\w+)?|\{[^}]*\})\s*from\s*["'][^"']+["'];?)[ \t]*\n?/gm;
const kinds = (text) => {
    const k = { wiring: 0, comments: 0, body: 0, total: Buffer.byteLength(text) };
    const noComments = text.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (m) => { k.comments += Buffer.byteLength(m); return ""; });
    for (const m of noComments.matchAll(WIRING)) k.wiring += Buffer.byteLength(m[0]);
    k.body = k.total - k.comments - k.wiring;
    return k;
};
const load = (root) => new Map(list(root).map((p) => { const t = readFileSync(join(root, p), "utf8"); return [p, { text: t, hash: createHash("sha256").update(t).digest("hex"), k: kinds(t) }]; }));
const A = load(baseDir), B = load(nowDir);
const sum = (m) => [...m.values()].reduce((a, { k }) => ({ wiring: a.wiring + k.wiring, comments: a.comments + k.comments, body: a.body + k.body, total: a.total + k.total }), { wiring: 0, comments: 0, body: 0, total: 0 });
const sa = sum(A), sb = sum(B);

// pairing: same path, then identical text, then same file name (one-to-one, first come)
const pairs = [];
const freeA = new Map(A), freeB = new Map(B);
for (const p of [...freeB.keys()]) if (freeA.has(p)) { pairs.push({ how: "same path", a: p, b: p }); freeA.delete(p); freeB.delete(p); }
const byHash = new Map(); for (const [p, v] of freeA) (byHash.get(v.hash) ?? byHash.set(v.hash, []).get(v.hash)).push(p);
for (const [p, v] of [...freeB]) { const c = byHash.get(v.hash); if (c?.length) { const a = c.shift(); pairs.push({ how: "moved, same text", a, b: p }); freeA.delete(a); freeB.delete(p); } }
const byName = new Map(); for (const p of freeA.keys()) (byName.get(basename(p)) ?? byName.set(basename(p), []).get(basename(p))).push(p);
for (const p of [...freeB.keys()]) { const c = byName.get(basename(p)); if (c?.length) { const a = c.shift(); pairs.push({ how: "moved, edited", a, b: p }); freeA.delete(a); freeB.delete(p); } }
const d = (x, y) => ({ wiring: y.wiring - x.wiring, comments: y.comments - x.comments, body: y.body - x.body, total: y.total - x.total });
const zero = { wiring: 0, comments: 0, body: 0, total: 0 };
const add = (a, b) => ({ wiring: a.wiring + b.wiring, comments: a.comments + b.comments, body: a.body + b.body, total: a.total + b.total });
const by = {};
for (const pr of pairs) by[pr.how] = add(by[pr.how] ?? zero, d(A.get(pr.a).k, B.get(pr.b).k));
by.added = [...freeB.values()].reduce((a, v) => add(a, v.k), zero);
by.removed = [...freeA.values()].reduce((a, v) => add(a, { wiring: -v.k.wiring, comments: -v.k.comments, body: -v.k.body, total: -v.k.total }), zero);
const counts = { "same path": 0, "moved, same text": 0, "moved, edited": 0 };
for (const pr of pairs) counts[pr.how]++;
const rows = [
    ...pairs.map((pr) => ({ how: pr.how, file: pr.b, from: pr.a === pr.b ? undefined : pr.a, ...d(A.get(pr.a).k, B.get(pr.b).k) })),
    ...[...freeB].map(([p, v]) => ({ how: "added", file: p, ...v.k })),
    ...[...freeA].map(([p, v]) => ({ how: "removed", file: p, wiring: -v.k.wiring, comments: -v.k.comments, body: -v.k.body, total: -v.k.total })),
].filter((r) => r.total !== 0).sort((x, y) => Math.abs(y.total) - Math.abs(x.total));
const result = {
    files: { base: A.size, now: B.size, sameText: [...B.values()].filter((v) => [...A.values()].some((w) => w.hash === v.hash)).length },
    totals: { base: sa, now: sb, delta: d(sa, sb) },
    byPairing: Object.fromEntries(Object.entries(by).map(([k, v]) => [k, { files: counts[k] ?? (k === "added" ? freeB.size : freeA.size), ...v }])),
    top: rows.slice(0, top),
};
// --chain: charge each changed file to the last step that wrote or moved its source
if (chainPath) {
    const kitDir = join(chainPath, "..", "..");
    const seq = JSON.parse(readFileSync(chainPath, "utf8"));
    const touched = new Map(); // source path → last step id
    for (const st of seq.steps) {
        if (!st.file) continue;
        const f = JSON.parse(readFileSync(join(kitDir, st.file), "utf8"));
        for (const m of f.moves ?? []) { touched.set(m.from, st.id); touched.set(m.to, st.id); }
        for (const p of Object.keys(f.files ?? {})) touched.set(p, st.id);
    }
    const sourceOf = (d) => { const s = `src/${d.replace(/\.d\.ts$/, "")}`; return [/\.vue$/.test(s) ? s : `${s}.ts`, `${s}.vue`, `${s}.mjs`]; };
    const byStep = {}, filesOf = {};
    for (const r of rows) {
        const cands = [...sourceOf(r.file), ...(r.from ? sourceOf(r.from) : [])];
        const id = cands.map((c) => touched.get(c)).find(Boolean) ?? (r.file.includes("/") ? "unattributed" : "entry relay (top level)");
        byStep[id] = add(byStep[id] ?? zero, r);
        (filesOf[id] ??= []).push(r.file);
    }
    result.byStep = Object.fromEntries(Object.entries(byStep).sort((x, y) => y[1].total - x[1].total).map(([k, v]) => [k, { ...v, files: filesOf[k].length }]));
}
if (outPath) writeFileSync(outPath, `${JSON.stringify({ ...result, all: rows }, null, 1)}\n`);
console.log(JSON.stringify(result, null, 1));
