#!/usr/bin/env node
// bindings.mjs — CHECK: in each given .mjs file, every imported name is read, and every name
// the file reads at top level is bound (declared, imported or a global). A split that
// forgets an import, or carries one it no longer needs, fails here before any run.
//
//   node bindings.mjs --root <tree> <file…>
//
// Unbound names are found with the TypeScript checker over the file alone (allowJs,
// checkJs, noEmit): diagnostic 2304 "Cannot find name". Unused imports come from the same
// program's 6133 / 6192 with noUnusedLocals.
import { createRequire } from "node:module";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const files = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--root");
const ts = createRequire(join(root, "package.json"))("typescript");
const program = ts.createProgram(files.map((f) => join(root, f)), {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    noUnusedLocals: true,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
    types: ["node"],
    typeRoots: [join(root, "node_modules/@types")],
    skipLibCheck: true,
});
const WANT = new Set([2304, 2552, 6133, 6192, 6196, 6198, 2305, 2724]);
let bad = 0;
for (const f of files) {
    const sf = program.getSourceFile(join(root, f));
    for (const d of [...program.getSemanticDiagnostics(sf), ...program.getSyntacticDiagnostics(sf)]) {
        if (!WANT.has(d.code)) continue;
        const { line } = sf.getLineAndCharacterOfPosition(d.start ?? 0);
        console.log(`${f}:${line + 1} TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, " ")}`);
        bad++;
    }
}
console.log(JSON.stringify({ files: files.length, findings: bad }));
process.exit(bad ? 1 : 0);
