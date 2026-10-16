// authored/test-programs-scripts.mjs — AUTHORED input to derive/edits.mjs (step S23; R-3 "the
// same for backend files", FD-7).
//
// A scripts module's single-subject test lives in its `__tests__/` slot like a src unit's
// (the minify module's test is the first). The test program and the vitest collection take
// the scripts slots in by the same suffix rule as src's; the library program never reads
// scripts, so nothing leaves it.

export const why = "R-3 for the scripts zone: the test program and vitest collect scripts/**/__tests__ as they collect src's";

export const edits = [
    {
        file: "vitest.config.ts",
        why: "vitest collects a scripts module's colocated tests",
        from: `        include: ["tests/**/*.{test,spec}.{ts,tsx}", "src/**/__tests__/*.test.ts"],`,
        to: `        include: ["tests/**/*.{test,spec}.{ts,tsx}", "src/**/__tests__/*.test.ts", "scripts/**/__tests__/*.test.ts"],`,
    },
    {
        file: "tsconfig.test.json",
        why: "the test program types a scripts module's colocated tests",
        from: `    "include": ["tests/", "src/", "tests/shims.d.ts"],`,
        to: `    "include": ["tests/", "src/", "scripts/**/__tests__", "tests/shims.d.ts"],`,
    },
];
