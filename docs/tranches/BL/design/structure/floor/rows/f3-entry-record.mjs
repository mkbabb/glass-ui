#!/usr/bin/env node
// rows/f3-entry-record.mjs — floor row F-3: the one entry record. Every reader of the
// entry set (the vite entry map, the style-fold's entry walk and non-JS exports, the
// declaration projector, and the two gate suites) reads records/entry-record.json
// through lib/entries.mjs, and the classification leaf and its generator are deleted:
// subpath-policy.mjs → the record, regen-exports.mjs → `entries.mjs check|write`.
// The build-time guard is kept and widened: an undeclared index.ts anywhere under src/
// stops the build (HEAD checked first-level dirs only).
//   node rows/f3-entry-record.mjs --root <linked worktree>
import { floorIn, openRow } from "./lib.mjs";

const row = openRow("f3-entry-record");
const ENTRIES = `${floorIn(row.root)}/lib/entries.mjs`;
row.edit("vite.library.ts", [[`import { libraryEntryMap } from "./scripts/lib/subpath-policy.mjs";`, `import { libraryEntryMap } from "./${ENTRIES}";`]]);
row.edit("vite.style-fold.ts", [
    [
        `// @ts-ignore — the runtime policy is an intentionally untyped shared ESM leaf.
import { buildEntrySet, CSS_FONT_EXPORTS, readTree } from "./scripts/lib/subpath-policy.mjs";`,
        `// @ts-ignore — the entry record reader is an untyped ESM leaf.
import * as entryRecord from "./${ENTRIES}";`,
    ],
    // the CSS roots are the record's sources, read as declared: no source derived from a dist
    // basename, and no existsSync that drops a missing one (the guard has already thrown)
    [
        `function declaredStyleRoots(root: string): { cssRoots: string[]; fontRoots: FontRoot[] } {
    const cssRoots: string[] = [];
    const fontRoots: FontRoot[] = [];
    for (const target of Object.values(CSS_FONT_EXPORTS) as string[]) {
        const relativeTarget = target.replace(/^\\.\\/dist\\//, "");
        const wildcard = relativeTarget.indexOf("*");
        if (wildcard !== -1) {
            fontRoots.push({
                sourceRoot: resolve(root, "src", relativeTarget.slice(0, wildcard)),
                targetPrefix: relativeTarget.slice(0, wildcard),
            });
        } else if (relativeTarget.endsWith(".css")) {
            const source = resolve(root, "src", relativeTarget);
            if (existsSync(source)) cssRoots.push(source);
        }
    }
    return { cssRoots: [...new Set(cssRoots)], fontRoots };
}`,
        `function declaredStyleRoots(root: string): { cssRoots: string[]; fontRoots: FontRoot[] } {
    const { sheets, assets } = entryRecord.recordCssTargets(root) as {
        sheets: { source: string }[];
        assets: { assets: string; prefix: string }[];
    };
    return {
        cssRoots: [...new Set(sheets.map(({ source }) => source))],
        fontRoots: assets.map(({ assets: sourceRoot, prefix }) => ({ sourceRoot: resolve(sourceRoot), targetPrefix: prefix })),
    };
}`,
    ],
    [`    for (const source of Object.values(buildEntrySet(readTree({ repoRoot: root })).entries) as string[]) {`, `    for (const source of Object.values(entryRecord.recordEntries(root)) as string[]) {`],
    // a CSS entry ships at its declared dist name, wherever its source lives (P3-F5)
    [
        `    cpSync(sourceFonts, resolve(outputRoot, "fonts"), {
        recursive: true,
        filter: copyFilter(sourceFonts),
    });`,
        `    cpSync(sourceFonts, resolve(outputRoot, "fonts"), {
        recursive: true,
        filter: copyFilter(sourceFonts),
    });
    entryRecord.emitDeclaredCssEntries(root, outputRoot);`,
    ],
]);
row.edit("scripts/flatten-subpath-types.mjs", [
    [`import { buildEntrySet, readTree } from "./lib/subpath-policy.mjs";`, `import { recordEntries } from "../${ENTRIES}";`],
    [`    const { entries } = buildEntrySet(readTree({ repoRoot: ROOT }));`, `    const entries = recordEntries(ROOT);`],
]);
for (const t of ["tests/gates/orphan-css-partial.test.ts", "tests/gates/overfit-structure.test.ts"])
    row.edit(t, [[`import { libraryEntryMap } from "../../scripts/lib/subpath-policy.mjs";`, `import { libraryEntryMap } from "../../${ENTRIES}";`]]);
row.edit("vite.style-assets.ts", [[`        "scripts/lib/subpath-policy.mjs",\n`, `        "${floorIn(row.root)}/records/entry-record.json",\n        "${ENTRIES}",\n`]]);
// the deleted leaf's ledgered phantom goes with it (the graph fails closed on a stale ledger row)
row.dropJsonEntries(`${floorIn(row.root)}/records/opaque-ledger.json`, "entries", (e) => e.file === "scripts/lib/subpath-policy.mjs", 1);
row.remove("scripts/lib/subpath-policy.mjs");
row.remove("scripts/regen-exports.mjs");
row.commit("7 readers on the record; subpath-policy.mjs and regen-exports.mjs deleted");
