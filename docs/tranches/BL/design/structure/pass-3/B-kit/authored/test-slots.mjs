// authored/test-slots.mjs — AUTHORED input to derive/edits.mjs (step B-S16, R-3).
//
// After S15 a unit's tests sit in its `__tests__/` slot. Three suites walk a source directory
// with readdirSync and now meet those tests as if they were the unit's source: a void-kept
// variable in a test, a rail identifier in a dock search test, a GL word in a blob test.
// The harness already reads it this way (tests/harness/source.ts: "a unit's __tests__ slots
// are not its source"); each walker now skips the slot, and its census is the source again.

export const why = "R-3: three source walkers skip the __tests__ slot, as the harness does";

export const edits = [
    {
        file: "tests/gates/overfit-structure.test.ts",
        why: "the shipped-bytes census reads source, not the test slot",
        from: `function walk(dir: string, out: string[] = []): string[] {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full, out);
`,
        to: `function walk(dir: string, out: string[] = [], slots = false): string[] {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) { if (slots || entry !== "__tests__") walk(full, out, slots); }
`,
    },
    {
        file: "tests/gates/overfit-structure.test.ts",
        why: "a colocated test is still an external site of the exports it reads, as it was from tests/",
        from: `    ...walk(join(REPO_ROOT, "tests")),\n`,
        to: `    ...walk(join(REPO_ROOT, "tests")),\n    ...walk(SRC, [], true).filter((f) => f.includes("/__tests__/")),\n`,
    },
    {
        file: "tests/styles/dock-name-canon.test.ts",
        why: "the dock band is the dock's source, not its test slot",
        from: "        if (e.isDirectory()) out.push(...walk(child));\n",
        to: "        if (e.isDirectory()) { if (e.name !== \"__tests__\") out.push(...walk(child)); }\n",
    },
    {
        file: "tests/components/custom/blob/gl-excise.test.ts",
        why: "the GL register census reads the blob's source, not its test slot",
        from: "        if (statSync(abs).isDirectory()) walk(abs, out);\n",
        to: "        if (statSync(abs).isDirectory()) { if (entry !== \"__tests__\") walk(abs, out); }\n",
    },
];
