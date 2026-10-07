// extra-plants.mjs · critique-B pass 5 · written AFTER the battery hash and after reading B-kit/gate/fallbacks.mjs.
// Not part of the hashed battery. Same contract as battery/plants.mjs; run with battery/run-plants.mjs --set this file.
// Each isolates a shape B17 reads by syntax from the incidental B0 catch the hashed battery's parameter forms had
// (a computed import is a B0 line, which says nothing about B17), plus the live shape the census found on the tree.
export function plants() {
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });
    // a loader bound to a name, literal target, called with an argument (fallbacks.mjs loaderCall requires 0 arguments)
    for (const [z, d, ext] of [["demo", "demo", "ts"], ["tests", "tests", "ts"], ["tests-visual", "tests-visual", "ts"]]) {
        const n = `zqX${z.replace("-", "")}LoaderArg`;
        add(`X5-LOADER-ARG-${z}`, "S-14", "B17", n, `${z}: const load = (k) => import(<public entry>); load(k).catch(() => undefined)`,
            { [`${d}/${n}.${ext}`]: `const load = (_k: string) => import("@mkbabb/glass-ui/chip");\nexport const ${n} = (k: string) => load(k).catch(() => undefined);\n` });
    }
    add("X5-LOADER-ARG-scripts", "S-14", "B17", "zqXscriptsLoaderArg", "scripts: a named loader of a literal target called with an argument",
        { "scripts/zqXscriptsLoaderArg.mjs": 'const load = (_k) => import("node:path");\nexport const zqXscriptsLoaderArg = (k) => load(k).catch(() => undefined);\n' });
    // the live shape: a read through a reader the tree defines (scripts/structure's tree.read), swallowed to ""
    add("X5-TREEREAD-ret", "S-14", "B17", "zqXtreeReadRet", "try { return tree.read(p) } catch { return \"\" } (cascade.mjs:219's shape)",
        { "scripts/zqXtreeReadRet.mjs": 'export const zqXtreeReadRet = (tree, p) => { try { return tree.read(p); } catch { return ""; } };\n' });
    add("X5-TREEREAD-empty", "S-14", "B17", "zqXtreeReadEmpty", "try { x = JSON.parse(tree.read(p)) } catch { /* absent = empty */ } (graph.mjs:37's shape)",
        { "scripts/zqXtreeReadEmpty.mjs": 'export const zqXtreeReadEmpty = (tree, p) => { let x = { entries: [] }; try { x = JSON.parse(tree.read(p)); } catch { /* absent = empty */ } return x; };\n' });
    add("X5-FSREAD-literal-promise", "S-14", "B17", "zqXpromiseRead", "readFile(<literal>).catch(() => \"\") in scripts",
        { "scripts/zqXpromiseRead.mjs": 'import { readFile } from "node:fs/promises";\nexport const zqXpromiseRead = () => readFile("package.json", "utf8").catch(() => "");\n' });
    return P;
}
