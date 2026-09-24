// rows/lib.mjs — asserted, all-or-nothing edits for floor rows. A row opens a transaction,
// stages every edit against the staged text, and writes only when every assertion held:
// an edit names the exact text it replaces (exactly one match), a JSON edit names the
// entries it drops, a removal names a file that exists. Any miss throws before the first
// write, so a row never half-applies. Rows run only inside a linked git worktree.
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

/** Open a row transaction on a linked worktree. */
export function openRow(name) {
    const root = rootArg();
    const staged = new Map(); // file → text | null (removed)
    const current = (file) => {
        if (staged.has(file)) {
            if (staged.get(file) === null) throw new Error(`row ${name}: ${file} was removed earlier in this row`);
            return staged.get(file);
        }
        const path = join(root, file);
        if (!existsSync(path)) throw new Error(`row ${name}: ${file} does not exist`);
        return readFileSync(path, "utf8");
    };
    return {
        root,
        edit(file, pairs) {
            let text = current(file);
            for (const [from, to] of pairs) {
                const hits = typeof from === "string" ? text.split(from).length - 1 : (text.match(new RegExp(from.source, `${from.flags.replace("g", "")}g`)) ?? []).length;
                if (hits !== 1) throw new Error(`row ${name}: ${file}: expected exactly 1 match, found ${hits} for ${String(from).slice(0, 80)}`);
                text = typeof from === "string" ? text.replace(from, () => to) : text.replace(from, to);
            }
            staged.set(file, text);
        },
        dropJsonEntries(file, key, match, count) {
            const doc = JSON.parse(current(file));
            const before = doc[key].length;
            doc[key] = doc[key].filter((e) => !match(e));
            if (before - doc[key].length !== count) throw new Error(`row ${name}: ${file}: expected to drop ${count} ${key}, dropped ${before - doc[key].length}`);
            staged.set(file, `${JSON.stringify(doc, null, 4)}\n`);
        },
        create(file, text) {
            if (staged.get(file) != null || (!staged.has(file) && existsSync(join(root, file)))) throw new Error(`row ${name}: ${file} already exists`);
            staged.set(file, text);
        },
        remove(file) {
            current(file);
            staged.set(file, null);
        },
        commit(message) {
            for (const [file, text] of staged) {
                const path = join(root, file);
                if (text === null) unlinkSync(path);
                else { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); }
            }
            console.log(`row ${name}: ${message} (${staged.size} file(s))`);
        },
    };
}
