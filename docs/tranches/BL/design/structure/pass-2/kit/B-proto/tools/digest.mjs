// digest.mjs — the floor's tree digest (lib/move.mjs treeDigest) over the floor's file set
// (git ls-files -co --exclude-standard, minus node_modules/dist), plus a code-only digest.
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]);
const { openTree } = await import(pathToFileURL(join(root, "docs/tranches/BL/design/structure/floor/lib/tree.mjs")));
const { treeDigest } = await import(pathToFileURL(join(root, "docs/tranches/BL/design/structure/floor/lib/move.mjs")));
const files = openTree(root).files;
const code = files.filter((f) => /^(src|demo|scripts|tests|tests-visual)\//.test(f) || !f.includes("/") || f.startsWith("docs/tranches/BL/design/structure/floor/records/"));
console.log(JSON.stringify({ files: files.length, digest: treeDigest(root, files), codeFiles: code.length, codeDigest: treeDigest(root, code) }));
