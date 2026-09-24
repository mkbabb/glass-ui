// rows/lib.mjs — asserted, all-or-nothing edits for floor rows. A row opens a transaction,
// stages every edit against the staged text, and writes only when every assertion held:
// an edit names the exact text it replaces (exactly one match), a JSON edit names the
// entries it drops, a removal names a file that exists. Any miss throws before the first
// write, so a row never half-applies. Rows run only inside a linked git worktree.
//
// Idempotent (P3-F6). Every operation also knows its own applied state: an edit whose old
// text is gone and whose new text is present once, a creation whose file already holds
// that text, a removal of a file already gone, a drop whose entries are already gone. A
// row whose every operation is applied writes nothing and says so; a row that is partly
// applied throws (a half-applied tree is an error, never a state to repair silently).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

export function linkedWorktree(root) {
    if (!root) throw new Error("row: --root <linked worktree> is required");
    const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
    const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
    if (resolve(root, gitDir) === resolve(root, common)) throw new Error("row: refusing the main checkout; run it in a linked worktree");
    return resolve(root);
}

export function rootArg() {
    const a = process.argv.slice(2);
    return linkedWorktree(a.includes("--root") ? a[a.indexOf("--root") + 1] : null);
}

/** Where the floor lives in a target tree: `scripts/structure` once row fd11 has landed it
 *  (FD-11), else its design home under docs/. Rows spell reader paths through this, so a
 *  replay over a landed tree reads its own landed text as applied. */
export const FLOOR_HOME = "docs/tranches/BL/design/structure/floor";
export const FLOOR_LANDED = "scripts/structure";
export function floorIn(root) {
    return existsSync(join(root, FLOOR_LANDED, "records/entry-record.json")) ? FLOOR_LANDED : FLOOR_HOME;
}

const count = (text, needle) => (typeof needle === "string" ? text.split(needle).length - 1 : (text.match(new RegExp(needle.source, `${needle.flags.replace("g", "")}g`)) ?? []).length);

/** Open a row transaction on a linked worktree. */
export function openRow(name) {
    const root = rootArg();
    const staged = new Map(); // file → text | null (removed)
    const states = []; // one { op, state: "apply" | "applied" } per operation
    const current = (file) => {
        if (staged.has(file)) {
            if (staged.get(file) === null) throw new Error(`row ${name}: ${file} was removed earlier in this row`);
            return staged.get(file);
        }
        const path = join(root, file);
        if (!existsSync(path)) throw new Error(`row ${name}: ${file} does not exist`);
        return readFileSync(path, "utf8");
    };
    const note = (op, state) => states.push({ op, state });
    return {
        root,
        edit(file, pairs) {
            let text = current(file);
            for (const [from, to] of pairs) {
                const hits = count(text, from);
                // the new text marks the applied state only when it is distinctive (a pure
                // deletion's "" or "\n" is not); such a pair reads applied when its old text is gone
                const marked = to.trim().length >= 8;
                const toHits = marked ? text.split(to).length - 1 : 0;
                const op = `${file}: ${String(from).slice(0, 60)}`;
                if (marked && toHits === 1 && (hits === 0 || (typeof from === "string" && to.includes(from) && hits === 1))) { note(op, "applied"); continue; }
                if (!marked && hits === 0) { note(op, "applied"); continue; }
                if (hits !== 1) throw new Error(`row ${name}: ${file}: expected exactly 1 match, found ${hits} for ${String(from).slice(0, 80)}`);
                text = typeof from === "string" ? text.replace(from, () => to) : text.replace(from, to);
                note(op, "apply");
            }
            staged.set(file, text);
        },
        /** Replace every one of exactly `n` occurrences of `from` (applied: none left and at
         *  least `n` of `to`). */
        substitute(file, from, to, n) {
            const text = current(file);
            const hits = text.split(from).length - 1;
            const op = `${file}: ${n}× ${from.slice(0, 40)}`;
            if (hits === 0 && text.split(to).length - 1 >= n) { note(op, "applied"); return; }
            if (hits !== n) throw new Error(`row ${name}: ${file}: expected ${n} occurrence(s) of ${from}, found ${hits}`);
            staged.set(file, text.split(from).join(to));
            note(op, "apply");
        },
        dropJsonEntries(file, key, match, n) {
            const doc = JSON.parse(current(file));
            const before = doc[key].length;
            doc[key] = doc[key].filter((e) => !match(e));
            const dropped = before - doc[key].length;
            if (dropped === 0 && n > 0) { note(`${file}: drop ${n} ${key}`, "applied"); return; }
            if (dropped !== n) throw new Error(`row ${name}: ${file}: expected to drop ${n} ${key}, dropped ${dropped}`);
            staged.set(file, `${JSON.stringify(doc, null, 4)}\n`);
            note(`${file}: drop ${n} ${key}`, "apply");
        },
        create(file, text) {
            const path = join(root, file);
            if (!staged.has(file) && existsSync(path)) {
                if (readFileSync(path, "utf8") === text) { note(`create ${file}`, "applied"); return; }
                throw new Error(`row ${name}: ${file} already exists with other content`);
            }
            if (staged.get(file) != null) throw new Error(`row ${name}: ${file} already exists`);
            staged.set(file, text);
            note(`create ${file}`, "apply");
        },
        remove(file) {
            if (!staged.has(file) && !existsSync(join(root, file))) { note(`remove ${file}`, "applied"); return; }
            current(file);
            staged.set(file, null);
            note(`remove ${file}`, "apply");
        },
        /** Write, or report the row applied. Returns "applied" | "wrote". */
        commit(message) {
            const pending = states.filter((s) => s.state === "apply");
            if (!pending.length) {
                console.log(`row ${name}: already applied (${states.length} operation(s)), nothing written`);
                return "applied";
            }
            if (pending.length !== states.length) {
                const done = states.filter((s) => s.state === "applied").map((s) => s.op);
                throw new Error(`row ${name}: partly applied (${done.length} of ${states.length} operations already in the tree: ${done.slice(0, 3).join("; ")}); refusing to write`);
            }
            for (const [file, text] of staged) {
                const path = join(root, file);
                if (text === null) unlinkSync(path);
                else { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); }
            }
            console.log(`row ${name}: ${message} (${staged.size} file(s))`);
            return "wrote";
        },
    };
}
