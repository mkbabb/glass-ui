#!/usr/bin/env node
// rows/fd7-programs.mjs — floor row FD-7: the programs R-3 needs, so the first file in a
// unit's `__tests__/` slot is an ordinary test and not a floor violation.
//   declarations  the build's `vue-tsc` emit runs a program rooted at the entry record
//                 (lib/entries.mjs declarationProgram): entries + ambient .d.ts, no include,
//                 no exclude. tsconfig.build.json (include src/ minus three test globs) goes.
//   tests         vitest collects `src/**/__tests__/*.test.ts` beside `tests/**`; the two
//                 includes that matched nothing (`tests/**/*.vue`, `scripts/**`) go.
//   @source       the demo's Tailwind scans exclude every `__tests__/` (P3-R6), so a test
//                 never adds a class to the shipped or demo CSS.
// The five ledger rows those patterns needed were dropped from the floor ledger with the
// program-pattern rule (F-1: a program glob may match nothing).
//   node rows/fd7-programs.mjs --root <linked worktree>
import { floorIn, openRow } from "./lib.mjs";

const row = openRow("fd7-programs");
const FLOOR = floorIn(row.root);
row.edit("vite.style-assets.ts", [
    [`        "tsconfig.build.json",\n`, ``],
    [
        `import { verifyExportTypes } from "./scripts/verify-export-types.mjs";\n`,
        `import { verifyExportTypes } from "./scripts/verify-export-types.mjs";
// @ts-ignore — the entry record reader is an untyped ESM leaf.
import * as entryRecord from "./${FLOOR}/lib/entries.mjs";
`,
    ],
    [
        `    const stageTypesAndRelays = (outputRoot: string) => {
        execFileSync(process.execPath, [
            commandPath("vue-tsc", "vue-tsc"),
            "--project",
            resolve(repositoryRoot, "tsconfig.build.json"),
            "--outDir",
            outputRoot,
            "--pretty",
            "false",
        ], { cwd: repositoryRoot, stdio: "inherit" });`,
        `    const stageTypesAndRelays = (outputRoot: string) => {
        // FD-7: the declaration program is rooted at the entry record, so dist carries
        // what the entries reach and a \`__tests__/\` file never ships (no exclusion list)
        const program = entryRecord.declarationProgram(repositoryRoot, outputRoot) as string;
        execFileSync(process.execPath, [
            commandPath("vue-tsc", "vue-tsc"),
            "--project",
            program,
            "--pretty",
            "false",
        ], { cwd: repositoryRoot, stdio: "inherit" });
        rmSync(program);`,
    ],
]);
row.remove("tsconfig.build.json");
row.edit("vitest.config.ts", [
    [
        `        // AV.W14 — all tests live under the top-level \`tests/\` tree (mirrors
        // \`src/\`); none remain in \`src/\` (proof:no-test-in-src). The
        // \`scripts/**\` glob covers any gate self-test colocated with a script.
        include: [
            "tests/**/*.{test,spec}.{ts,tsx}",
            "tests/**/*.{test,spec}.vue",
            "scripts/**/*.{test,spec}.{ts,tsx}",
        ],`,
        `        // R-3: a test whose subject is one unit lives in that unit's \`__tests__/\`
        // slot; a whole-library suite lives under \`tests/\`.
        include: ["tests/**/*.{test,spec}.{ts,tsx}", "src/**/__tests__/*.test.ts"],`,
    ],
]);
row.edit("demo/demo.css", [
    [
        `@source "../src/components/**/index.ts";\n`,
        `@source "../src/components/**/index.ts";
/* P3-R6: a test is not library source; no scan above reads a unit's __tests__ slot. */
@source not "../src/**/__tests__";
`,
    ],
]);
row.commit("declarations rooted at the entry record; vitest collects __tests__ slots; @source excludes them; tsconfig.build.json deleted");
