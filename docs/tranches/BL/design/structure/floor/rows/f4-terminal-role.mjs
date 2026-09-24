#!/usr/bin/env node
// rows/f4-terminal-role.mjs — floor row F-4: the declared terminal role. The published
// cascade ends on the entry record's `cascade.terminal`, found by resolving each @import
// of the staged index.css to a file and comparing it with that file. A miss, or a
// terminal that is not the last @import, throws. The `./accessibility.css` path regex and
// its fallback to the trailing `@source` (vite.style-fold.ts:89-92, REGISTRY S-2) go.
//   node rows/f4-terminal-role.mjs --root <linked worktree>
import { openRow } from "./lib.mjs";

const row = openRow("f4-terminal-role");
row.edit("vite.style-fold.ts", [
    // requires row f3-entry-record (its `entryRecord` namespace import carries recordTerminal)
    [" * import (or the trailing `@source` in an older source tree). The SFC bundle", " * import, the entry record's declared `cascade.terminal`. The SFC bundle"],
    [
        /\/\*\*\n \* atSourceIndex — locate the offset[\s\S]*?\nexport function terminalImportIndex\(css: string\): number \{\n    const mode = [^\n]*\n    return mode \? mode\.index : atSourceIndex\(css\);\n\}\n/,
        `/**
 * terminalImportIndex — the offset of the @import that ends the published cascade: the
 * one whose target is the entry record's declared \`cascade.terminal\`. Each @import of the
 * staged index.css is resolved against the staged styles dir and compared by file, so a
 * moved or renamed terminal still anchors. A missing terminal, or one that is not the
 * last @import, throws: dist-only imports are never placed by a guess.
 */
export function terminalImportIndex(css: string, distStyles: string, root: string): number {
    const terminal = resolve(dirname(distStyles), String(entryRecord.recordTerminal(root)).replace(/^src\\//, ""));
    const imports = [...css.matchAll(/^[ \\t]*@import\\s+(?:url\\(\\s*)?["']([^"']+)["']/gm)];
    const at = imports.findIndex((m) => resolve(distStyles, m[1]) === terminal);
    if (at === -1) throw new Error(\`style-fold: the declared cascade terminal \${terminal} is not imported by \${distStyles}/index.css\`);
    if (at !== imports.length - 1) throw new Error(\`style-fold: the declared cascade terminal is @import #\${at + 1} of \${imports.length}, not the last\`);
    return imports[at].index ?? -1;
}
`,
    ],
    [
        `            const sourceAt = terminalImportIndex(indexSrc);
            const folded =
                sourceAt === -1
                    ? \`\${indexSrc}\\n\${sfcImport}\\n\`
                    : \`\${indexSrc.slice(0, sourceAt)}`,
        `            const sourceAt = terminalImportIndex(indexSrc, distStyles, root);
            const folded =
                \`\${indexSrc.slice(0, sourceAt)}`,
    ],
]);
row.edit("vite.utility-emit.ts", [
    [
        `    const sourceAt = terminalImportIndex(indexSrc);`,
        `    const sourceAt = terminalImportIndex(indexSrc, distStyles, root);`,
    ],
    [
        `    const folded =
        sourceAt === -1
            ? \`\${indexSrc}\\n\${comment}\${compImport}\\n\`
            : \`\${indexSrc.slice(0, sourceAt)}\${comment}\${compImport}\\n\\n\${indexSrc.slice(sourceAt)}\`;`,
        `    const folded = \`\${indexSrc.slice(0, sourceAt)}\${comment}\${compImport}\\n\\n\${indexSrc.slice(sourceAt)}\`;`,
    ],
]);
row.commit("terminalImportIndex resolves the declared terminal by file and throws on a miss; the path regex and @source fallback are gone");
