#!/usr/bin/env node
// rows/f9-wire.mjs — floor row F-9: wire the floor gates into `npm test`. vitest's include
// glob (tests/**/*.test.ts) collects the suite; CI runs `npm run build` then `npm test`,
// so the surface pin reads a fresh dist there.
//   node rows/f9-wire.mjs --root <linked worktree>
import { openRow } from "./lib.mjs";

const row = openRow("f9-wire");
row.create(
    "tests/gates/floor.test.ts",
    `// The BL D1 floor gates (docs/tranches/BL/design/structure/floor/FLOOR.md): graph,
// entry record, cascade contract, surface pin. One child process, one verdict per gate.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../..");
const GATES = resolve(ROOT, "docs/tranches/BL/design/structure/floor/gates.mjs");

function run(): { pass: boolean; checks: { id: string; pass: boolean; detail: unknown }[] } {
    try {
        return JSON.parse(execFileSync("node", [GATES, "--root", ROOT, "--json"], { encoding: "utf8", maxBuffer: 1 << 26 }));
    } catch (error) {
        const out = (error as { stdout?: string }).stdout;
        if (!out) throw error;
        return JSON.parse(out);
    }
}

describe("floor gates", () => {
    const verdict = run();
    for (const check of verdict.checks) {
        it(check.id, () => {
            expect(check.pass, JSON.stringify(check.detail, null, 1)).toBe(true);
        });
    }
});
`,
);
row.commit("tests/gates/floor.test.ts runs the floor gates under npm test");
