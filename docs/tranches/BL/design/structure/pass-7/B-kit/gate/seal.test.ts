// tests/gates/seal.test.ts — the D1-B seal (scripts/structure/seal/; the route's law is
// scripts/structure/seal/law.mjs). One verdict per clause, B0..B17, over the F-1 graph and the
// reviewed pin (scripts/structure/records/seal-pin.json). No off switch: the pin is always
// read, and a clause passes only with zero violations. The gate is read through the floor
// runtime's door, like every other reader of scripts/structure.
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { seal } from "../../scripts/structure/index.mjs";

const ROOT = resolve(__dirname, "../..");

describe("seal (route D1-B)", () => {
    const verdict: { counts: Record<string, number>; V: Record<string, string[]> } = seal(ROOT);
    it("has one pin path: the CLI refuses a --pin, and a refusal is no verdict (exit 2)", () => {
        const run = spawnSync(process.execPath, [resolve(ROOT, "scripts/structure/seal/seal.mjs"), "--root", ROOT, "--pin", "elsewhere.json"], { encoding: "utf8" });
        expect(run.status).toBe(2);
        expect(run.stderr).toContain("unknown option --pin");
    });
    // P6-R3: 0 GREEN, 1 RED, 2 no verdict. A crash is never read as RED: an overlay that is not
    // JSON throws before any clause runs (2); a planted door crossing is a verdict (1).
    it("exits 2 on an uncaught throw and 1 on a RED verdict", () => {
        const dir = mkdtempSync(join(tmpdir(), "seal-exit-"));
        try {
            const bad = join(dir, "bad.json");
            writeFileSync(bad, "{ not json");
            const crash = spawnSync(process.execPath, [resolve(ROOT, "scripts/structure/seal/seal.mjs"), "--root", ROOT, "--overlay", bad], { encoding: "utf8" });
            expect(crash.status).toBe(2);
            expect(crash.stderr).toContain("seal: no verdict");
            const red = join(dir, "red.json");
            writeFileSync(red, JSON.stringify({ "demo/zqSealExit.ts": 'import "../src/components/dock/GlassDock.vue";\n' }));
            const verdict = spawnSync(process.execPath, [resolve(ROOT, "scripts/structure/seal/seal.mjs"), "--root", ROOT, "--overlay", red], { encoding: "utf8" });
            expect(verdict.status, verdict.stdout.split("\n").filter((l) => l.startsWith("FAIL")).join("\n")).toBe(1);
            expect(verdict.stdout).toContain("FAIL B2 1");
        } finally {
            rmSync(dir, { recursive: true, force: true });
        }
    }, 120_000);
    it("judges all eighteen clauses", () => {
        expect(Object.keys(verdict.counts)).toEqual(Array.from({ length: 18 }, (_, i) => `B${i}`));
    });
    for (const clause of Object.keys(verdict.counts)) {
        it(clause, () => {
            expect(verdict.counts[clause], verdict.V[clause].slice(0, 12).join("\n")).toBe(0);
        });
    }
});
