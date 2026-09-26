#!/usr/bin/env node
// f4-plant.mjs — the P5-F4 plants' two setups (P4-G2: an engine wrote a file it did not parse).
//   row  --root <wt> --rows <rows/lib.mjs>   a floor row through the given row transaction
//        (the arm's own: HEAD's for the before arm, the checkout's for the after arm) whose
//        exact-text edit cuts the header of `combinedStylesDraw` in scripts/profile-bundle.mjs,
//        the shape S34's first derivation wrote (Bp4 §6.3). The body's closing brace is left
//        without its function, so the file no longer parses. Exit 0 when the row wrote.
//   seed --root <wt>                          plants a leaf and an importer that does not parse
//        (scripts/lib/zz-leaf.mjs, scripts/zz-importer.mjs). Moving the leaf makes the engine
//        rewrite the importer's specifier, so the engine writes an edited file that does not
//        parse (lists/f4-edited-importer.json).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
if (args[0] === "row") {
    const { openRow } = await import(pathToFileURL(resolve(opt("--rows"))).href);
    const row = openRow("p5-f4-cut-header");
    row.edit("scripts/profile-bundle.mjs", [["function combinedStylesDraw(distRoot) {\n", ""]]);
    const r = row.commit("the header of combinedStylesDraw cut (the S34 shape)");
    console.log(`row result: ${r}`);
} else if (args[0] === "seed") {
    const put = (f, t) => { mkdirSync(dirname(join(root, f)), { recursive: true }); writeFileSync(join(root, f), t); };
    put("scripts/lib/zz-leaf.mjs", "// P5-F4 plant leaf\nexport const leaf = 1;\n");
    put("scripts/zz-importer.mjs", '// P5-F4 plant importer: its import is rewritten by the move; its body does not parse\nimport { leaf } from "./lib/zz-leaf.mjs";\nexport function broken( {\n    return leaf;\n}\n');
    console.log("seeded scripts/lib/zz-leaf.mjs and scripts/zz-importer.mjs");
} else {
    console.error("usage: f4-plant.mjs row --root <wt> --rows <rows/lib.mjs> | seed --root <wt>");
    process.exit(2);
}
