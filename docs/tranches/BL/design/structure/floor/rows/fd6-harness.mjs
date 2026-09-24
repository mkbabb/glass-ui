#!/usr/bin/env node
// rows/fd6-harness.mjs — floor row FD-6: the harness reader. `tests/harness/source.ts` is
// the one way a whole-library suite reads source (R-3: "reads the resolved graph, never a
// directory walk"): `files({ under })` is F-1's file set under a path, a unit's
// `__tests__/` slots left out; `read(file)`; `edges({ from, to, kind })` is F-1's graph.
// The two suites that break the moment a unit gains a `__tests__/` slot (measured: a
// probe test in each of 116 src dirs → easing.contract uncollected with EISDIR, and two
// sortable-list battery tests EISDIR) move onto it. Every other directory walk over src is
// a route's to move (census in FLOOR-P3 §FD-6); none of them breaks on a slot.
//   node rows/fd6-harness.mjs --root <linked worktree>
import { floorIn, openRow } from "./lib.mjs";

const row = openRow("fd6-harness");
const FLOOR = floorIn(row.root);
row.create(
    "tests/harness/source.ts",
    `// tests/harness/source.ts — FD-6: the one way a whole-library suite reads source. R-3:
// "a suite that scans source reads the resolved graph, never a directory walk". The file
// set is F-1's (git's tracked and untracked files), so a \`__tests__/\` slot, a nested
// module or a moved file never meets a walker as a surprise directory.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
// @ts-ignore — the floor's tree reader is an untyped ESM leaf.
import { openTree } from "../../${FLOOR}/lib/tree.mjs";
// @ts-ignore — the floor's graph is an untyped ESM leaf.
import { buildGraph } from "../../${FLOOR}/lib/graph.mjs";

const ROOT = resolve(__dirname, "../..");

export interface SourceEdge {
    from: string;
    to: string | null;
    kind: string;
    line: number;
}

let fileSet: string[] | null = null;
let edgeSet: SourceEdge[] | null = null;

/** Repo-relative files at or under \`under\`, sorted. A unit's \`__tests__/\` slots are not
 *  its source, so they are left out unless \`tests\` is set. */
export function files({ under, suffix, tests = false }: { under: string; suffix?: string | RegExp; tests?: boolean }): string[] {
    fileSet ??= (openTree(ROOT) as { files: string[] }).files;
    const base = under.replace(/\\/$/, "");
    return fileSet.filter(
        (f) =>
            (f === base || f.startsWith(\`\${base}/\`)) &&
            (tests || !/(^|\\/)__tests__\\//.test(f)) &&
            (suffix === undefined || (typeof suffix === "string" ? f.endsWith(suffix) : suffix.test(f))),
    );
}

/** A repo-relative file's text. */
export function read(file: string): string {
    return readFileSync(resolve(ROOT, file), "utf8");
}

/** F-1's resolved references, filtered. */
export function edges({ from, to, kind }: { from?: string; to?: string; kind?: string } = {}): SourceEdge[] {
    edgeSet ??= (buildGraph(ROOT) as { edges: SourceEdge[] }).edges;
    return edgeSet.filter((e) => (!from || e.from === from) && (!to || e.to === to) && (!kind || e.kind === kind));
}
`,
);
row.edit("tests/components/easing.contract.test.ts", [
    [
        `import { bezierPresets } from "@mkbabb/value.js/easing";\n`,
        `import { bezierPresets } from "@mkbabb/value.js/easing";
import { files, read } from "../harness/source";
`,
    ],
    [
        `const LANE_FILES = readdirSync(EASING_DIR);
const LANE_SOURCE = LANE_FILES.map(source).join("\\n");`,
        `const LANE_SOURCE = files({ under: "src/components/easing" }).map(read).join("\\n");`,
    ],
]);
row.edit("tests/components/sortable-list/battery.test.ts", [
    [`import { existsSync, readFileSync, readdirSync } from "node:fs";\n`, `import { existsSync, readFileSync } from "node:fs";\nimport { files, read as readSource } from "../../harness/source";\n`],
    [
        `        // prose, and prose is not a shipped rule.
        const all = readdirSync(DIR)
            .filter((f) => !f.endsWith(".md"))
            .map((f) => strip(read(f)))
            .join("\\n");`,
        `        // prose, and prose is not a shipped rule.
        const all = files({ under: DIR })
            .filter((f) => !f.endsWith(".md"))
            .map((f) => strip(readSource(f)))
            .join("\\n");`,
    ],
    [
        `    it("axis, dragPosition, pointerCaptureActive and the re-export are all absent", () => {
        const all = readdirSync(DIR)
            .filter((f) => !f.endsWith(".md"))
            .map((f) => strip(read(f)))
            .join("\\n");`,
        `    it("axis, dragPosition, pointerCaptureActive and the re-export are all absent", () => {
        const all = files({ under: DIR })
            .filter((f) => !f.endsWith(".md"))
            .map((f) => strip(readSource(f)))
            .join("\\n");`,
    ],
]);
row.commit("tests/harness/source.ts reads F-1's file set; easing.contract and the sortable-list battery read through it");
