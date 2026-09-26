// adapter.mjs · written AFTER the battery hash, after reading B-kit/gate/seal.mjs. It maps the landed gate onto the
// battery's contract and decides nothing: judge(root) returns the gate's own V table. The gate is run in a child
// process per judgement so no module cache (the gate's graph or its pin) survives between plants.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
export async function judge(root) {
    const d = mkdtempSync(join(process.env.CRIT_TMP ?? tmpdir(), "seal-"));
    const out = join(d, "v.json");
    try {
        execFileSync("node", [join(root, "scripts/structure/seal/seal.mjs"), "--root", root, "--json", out], { stdio: "ignore", maxBuffer: 1 << 26 });
    } catch (e) { if (e.status !== 1) throw new Error(`seal exited ${e.status}`); }
    const r = JSON.parse(readFileSync(out, "utf8")).V;
    rmSync(d, { recursive: true, force: true });
    return r;
}
