// digest.mjs — the code digest of a tree: sha256 over every file git would track (tracked or
// untracked-not-ignored) outside docs/, as sorted "path\0sha256(bytes)" lines. docs/ is left
// out so a replay at a later docs-only HEAD reads the same digest; the symlinked
// node_modules and every ignored output (dist, dist-demo, test-results) are out by
// .gitignore. The whole-chain replay keys its checkpoints on this digest (replay.mjs).
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function codeFiles(root) {
    const out = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 });
    const files = [...new Set(out.split("\0").filter(Boolean))]
        .filter((f) => !f.startsWith("docs/") && f !== "node_modules" && f !== "tests-visual/node_modules")
        .filter((f) => { const p = join(root, f); return existsSync(p) && !lstatSync(p).isSymbolicLink() && lstatSync(p).isFile(); });
    return files.sort();
}

export function codeDigest(root) {
    const files = codeFiles(root);
    const h = createHash("sha256");
    for (const f of files) h.update(`${f}\0${createHash("sha256").update(readFileSync(join(root, f))).digest("hex")}\n`);
    return { digest: h.digest("hex"), files: files.length };
}
