// adapter.mjs · critique-B pass 7 · written and hashed BEFORE reading pass-7/B-kit. It decides nothing: judge(root)
// runs the tree's own gate in a child process and returns its clause table `V` (pass 6's seal JSON shape).
// Exit codes per P6-R3: 0 GREEN, 1 RED (both return the table), 2 an uncaught throw (throws here). Any other exit,
// or a missing table, throws too. SEAL_REL overrides the gate path if the route moved it (disclosed if used).
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
export const SEAL_REL = process.env.SEAL_REL ?? "scripts/structure/seal/seal.mjs";
export async function judge(root) {
    const seal = join(root, SEAL_REL);
    if (!existsSync(seal)) throw new Error(`adapter: no gate at ${seal}`);
    const d = mkdtempSync(join(process.env.CRIT_TMP ?? tmpdir(), "seal7-"));
    const out = join(d, "v.json");
    let status = 0;
    try {
        execFileSync("node", [seal, "--root", root, "--json", out], { stdio: "ignore", maxBuffer: 1 << 26 });
    } catch (e) { status = e.status; }
    try {
        if (status === 2) throw new Error("seal exited 2 (uncaught throw)");
        if (status !== 0 && status !== 1) throw new Error(`seal exited ${status}`);
        if (!existsSync(out)) throw new Error(`seal exited ${status} with no table`);
        return JSON.parse(readFileSync(out, "utf8")).V;
    } finally { rmSync(d, { recursive: true, force: true }); }
}
