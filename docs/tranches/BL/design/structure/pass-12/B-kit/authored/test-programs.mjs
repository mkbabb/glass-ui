// authored/test-programs.mjs — AUTHORED input to derive/edits.mjs (step B-S14, R-3, B16).
//
// Before a test joins its subject in `<module>/__tests__/` (S15), the two tsconfig programs
// are told where tests live: the strict library program (tsconfig.json, and
// tsconfig.src.json, which inherits its exclude) leaves `src/**/__tests__` out, and the test
// program (tsconfig.test.json, which already includes src/) takes it back in. vitest already
// collects `src/**/__tests__/*.test.ts`, the demo's Tailwind scan already excludes it
// (`@source not "../src/**/__tests__"`), and declarations are emitted from the entry
// sources only, so nothing else follows.

export const why = "R-3: the library program leaves colocated tests out, the test program takes them in";

export const edits = [
    {
        file: "tsconfig.json",
        why: "the strict library program does not type tests",
        from: `    "include": ["src/", "demo/"]\n}`,
        to: `    "include": ["src/", "demo/"],\n    "exclude": ["src/**/__tests__"]\n}`,
    },
    {
        file: "tsconfig.test.json",
        why: "the test program types the colocated tests (the base exclude is not inherited here)",
        from: `    "include": ["tests/", "src/", "tests/shims.d.ts"]\n}`,
        to: `    "include": ["tests/", "src/", "tests/shims.d.ts"],\n    "exclude": []\n}`,
    },
];
