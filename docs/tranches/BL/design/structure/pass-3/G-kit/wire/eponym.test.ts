// The D1-G gate under `npm test` (LAW.md §E). One child process judges the tree; every clause
// the gate defines is one `it`, so no clause is CLI-only: the clause list comes from the gate
// itself, and a clause the gate adds is collected here without an edit.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../..");
const GATE = resolve(ROOT, "scripts/structure/eponym/eponym.mjs");

const verdict = JSON.parse(execFileSync("node", [GATE, "--root", ROOT, "--json", "-"], { encoding: "utf8", maxBuffer: 1 << 28 })) as {
    clauses: string[];
    counts: Record<string, number>;
    V: Record<string, string[]>;
};

describe("D1-G eponym gate", () => {
    it("judges every clause it defines", () => {
        expect(Object.keys(verdict.counts).sort()).toEqual([...verdict.clauses].sort());
    });
    for (const clause of verdict.clauses) {
        it(clause, () => {
            expect(verdict.V[clause], `${clause}: ${verdict.V[clause].slice(0, 20).join("\n")}`).toEqual([]);
        });
    }
});
