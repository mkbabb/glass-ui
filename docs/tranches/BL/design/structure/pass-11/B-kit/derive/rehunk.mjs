#!/usr/bin/env node
// rehunk.mjs — DERIVE (pass 6): carry a frozen pass-5 row onto the P6 floor cut, where some of
// its files' text moved under it. Each file op is re-cut into the smallest exact-text hunks
// (lib/row.mjs hunksOf) between the row's own before and after texts, and those hunks are
// tried on the tree as it stands. A file whose before text the floor already changed is
// re-hunked this way; a file the P6 floor already cured (named with --drop, each with its
// reason) leaves the row. Any hunk that does not match exactly once stops the run before a
// row exists. The result is written as a row (lib/row.mjs shape) for derive/land-row.mjs.
//   node derive/rehunk.mjs --root <wt> --row frozen/S49-x.json --out <row.json> [--drop path=reason …]
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { hunksOf } from "../lib/row.mjs";
import { KIT } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const row = JSON.parse(readFileSync(join(KIT, arg(args, "--row")), "utf8"));
const drop = new Map(args.flatMap((a, i) => (args[i - 1] === "--drop" ? [a.split("=")] : [])).map(([p, ...r]) => [p, r.join("=")]));
const count = (t, s) => t.split(s).length - 1;
const files = {}, stop = [], dropped = [];
for (const [path, op] of Object.entries(row.files)) {
    if (drop.has(path)) { dropped.push({ file: path, why: drop.get(path) }); continue; }
    if (!op.hunks) { files[path] = op; continue; }
    const cur = readFileSync(join(root, path), "utf8");
    // the row's hunks as they are; a hunk the floor moved under is carried as a unified diff of
    // its own before/after (`diff -U3`), applied by `patch` (context fuzz up to 3 lines; the result is a row whose exact hunks are re-cut from the tree and reviewed)
    let text = cur;
    for (const [f, t] of op.hunks) {
        if (count(text, f) === 1) { text = text.replace(f, () => t); continue; }
        const d = mkdtempSync(join(tmpdir(), "rehunk-"));
        try {
            writeFileSync(join(d, "a"), f); writeFileSync(join(d, "b"), t); writeFileSync(join(d, "cur"), text);
            let diff = "";
            try { execFileSync("diff", ["-U3", join(d, "a"), join(d, "b")], { encoding: "utf8" }); } catch (e) { if (e.status !== 1) throw e; diff = e.stdout; }
            writeFileSync(join(d, "p.diff"), diff);
            execFileSync("patch", ["--fuzz=3", "--no-backup-if-mismatch", "-s", join(d, "cur"), join(d, "p.diff")], { encoding: "utf8" });
            text = readFileSync(join(d, "cur"), "utf8");
        } catch (e) { stop.push(`${path}: the hunk does not carry (${String(e.stdout || e.message).slice(0, 200)})`); }
        finally { rmSync(d, { recursive: true, force: true }); }
    }
    files[path] = { hunks: hunksOf(cur, text) };
}
if (stop.length) { console.error(`stopped\n  ${stop.join("\n  ")}`); process.exit(1); }
const out = { step: row.step, files, reasons: (row.reasons ?? []).filter((r) => !drop.has(r.file)), dropped };
writeFileSync(resolve(arg(args, "--out")), `${JSON.stringify(out, null, 1)}\n`);
console.log(JSON.stringify({ files: Object.keys(files).length, dropped: dropped.map((d) => d.file) }));
if (!existsSync(join(root, "scripts/structure"))) throw new Error("rehunk: the tree has no landed floor");
