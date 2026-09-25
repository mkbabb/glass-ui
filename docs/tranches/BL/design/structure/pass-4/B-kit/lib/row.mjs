// row.mjs — B's frozen content rows: exact-text hunks, all-or-nothing, idempotent (P3-F6's
// contract, in the shape a derive step can emit). A row is
//   { step, files: { path: { create: text } | { remove: true, before: text } | { hunks: [[from, to], …] } } }
// A hunk's `from` occurs exactly once in the file when the row applies; the row is applied
// when every `from` is gone and every `to` is present once (a create holds its text, a
// removed file is absent). Any other state throws before the first write.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const count = (text, needle) => (needle === "" ? 0 : text.split(needle).length - 1);

/** Line hunks between two texts, each widened with context until its `from` is unique. */
export function hunksOf(a, b) {
    if (a === b) return [];
    const A = a.split(/(?<=\n)/), B = b.split(/(?<=\n)/);
    let p = 0;
    while (p < A.length && p < B.length && A[p] === B[p]) p++;
    let s = 0;
    while (s < A.length - p && s < B.length - p && A[A.length - 1 - s] === B[B.length - 1 - s]) s++;
    const a1 = A.slice(p, A.length - s), b1 = B.slice(p, B.length - s);
    // LCS over the middle (bounded), splitting it into independent hunks
    const regions = [];
    if (a1.length * b1.length <= 4e6) {
        const n = a1.length, m = b1.length;
        const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
        for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a1[i] === b1[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
        let i = 0, j = 0, cur = null;
        while (i < n || j < m) {
            if (i < n && j < m && a1[i] === b1[j]) { if (cur) { regions.push(cur); cur = null; } i++; j++; continue; }
            if (!cur) cur = { ai: i, aj: i, bi: j, bj: j };
            if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) { j++; cur.bj = j; } else { i++; cur.aj = i; }
        }
        if (cur) regions.push(cur);
    } else regions.push({ ai: 0, aj: a1.length, bi: 0, bj: b1.length });
    const hunks = [];
    for (const r of regions) {
        let lo = p + r.ai, hi = p + r.aj; // [lo, hi) in A
        let blo = p + r.bi, bhi = p + r.bj;
        for (let ctx = 0; ; ctx++) {
            const from = A.slice(Math.max(0, lo - ctx), Math.min(A.length, hi + ctx)).join("");
            const to = [...A.slice(Math.max(0, lo - ctx), lo), ...B.slice(blo, bhi), ...A.slice(hi, Math.min(A.length, hi + ctx))].join("");
            if ((from.length && count(a, from) === 1 && count(b, to) >= 1) || (lo - ctx <= 0 && hi + ctx >= A.length)) { hunks.push([from, to]); break; }
        }
    }
    // verify: applying in order reproduces b; else fall back to one whole-file hunk
    let t = a;
    for (const [f, to] of hunks) { if (count(t, f) !== 1) return [[a, b]]; t = t.replace(f, () => to); }
    return t === b ? hunks : [[a, b]];
}

/** Build a row from the tree's current text and the intended text per path (null = remove). */
export function makeRow(root, step, intended) {
    const files = {};
    for (const [path, next] of Object.entries(intended)) {
        const abs = join(root, path);
        const cur = existsSync(abs) ? readFileSync(abs, "utf8") : null;
        if (cur === next) continue;
        if (cur === null) files[path] = { create: next };
        else if (next === null) files[path] = { remove: true, before: cur };
        else files[path] = { hunks: hunksOf(cur, next) };
    }
    return { step, files };
}

/** Apply a row. Returns { written, applied } or throws naming the file that holds neither state. */
export function applyRow(root, row, { dry = false } = {}) {
    const staged = new Map();
    let todo = 0, done = 0;
    for (const [path, op] of Object.entries(row.files)) {
        const abs = join(root, path);
        const cur = existsSync(abs) ? readFileSync(abs, "utf8") : null;
        if (op.create !== undefined) {
            if (cur === op.create) { done++; continue; }
            if (cur !== null) throw new Error(`row ${row.step}: ${path} exists with other content`);
            staged.set(path, op.create); todo++; continue;
        }
        if (op.remove) {
            if (cur === null) { done++; continue; }
            if (cur !== op.before) throw new Error(`row ${row.step}: ${path} differs from the text the removal names`);
            staged.set(path, null); todo++; continue;
        }
        if (cur === null) throw new Error(`row ${row.step}: ${path} does not exist`);
        // a hunk is in place when its old text is gone and its new text present; a pure
        // deletion (new text not distinctive) reads in place when its old text is gone
        const placed = ([f, t]) => (t.trim().length < 8 ? count(cur, f) === 0 : (count(cur, f) === 0 || (t.includes(f) && count(cur, f) === count(cur, t))) && count(cur, t) >= 1);
        const applied = op.hunks.every(placed);
        if (applied) { done++; continue; }
        let text = cur;
        for (const [f, t] of op.hunks) {
            const n = count(text, f);
            if (n !== 1) throw new Error(`row ${row.step}: ${path}: expected exactly 1 match, found ${n} for ${JSON.stringify(f.slice(0, 80))}`);
            text = text.replace(f, () => t);
        }
        staged.set(path, text); todo++;
    }
    if (todo && done) throw new Error(`row ${row.step}: partly applied (${done} of ${todo + done} files already in the tree); refusing to write`);
    if (!dry) for (const [path, text] of staged) {
        const abs = join(root, path);
        if (text === null) {
            unlinkSync(abs);
            // prune the dirs the removal emptied, deepest first (F-2's rule, P3-F5)
            for (let d = dirname(abs); d.startsWith(root) && d !== root && existsSync(d) && !readdirSync(d).length; d = dirname(d)) rmdirSync(d);
        } else { mkdirSync(dirname(abs), { recursive: true }); writeFileSync(abs, text); }
    }
    return { step: row.step, written: todo, applied: done };
}
