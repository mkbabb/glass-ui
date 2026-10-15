// floor.mjs — load the floor a tree carries (FD-11: `scripts/structure/` once landed), so
// every B-kit tool reads the target tree with that tree's own floor, never the checkout's.
// The kit is outside the tree, so it reads the floor's files by path (a reader outside the
// tree is not judged by the seal); after S19 the graph lives in the library's graph module.
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function floorDir(root) {
    const landed = join(root, "scripts/structure");
    if (existsSync(join(landed, "lib/tree.mjs"))) return landed;
    return join(root, "docs/tranches/BL/design/structure/floor");
}

export async function loadFloor(root) {
    const dir = floorDir(resolve(root));
    const mod = (...cands) => {
        const p = cands.map((c) => join(dir, "lib", c)).find((x) => existsSync(x));
        if (!p) throw new Error(`floor: none of ${cands.join(", ")} under ${dir}/lib`);
        return import(pathToFileURL(p).href);
    };
    const [graph, symbols, placement, move, tree] = await Promise.all([mod("graph/graph.mjs", "graph.mjs"), mod("symbols.mjs"), mod("placement.mjs"), mod("move.mjs"), mod("tree.mjs")]);
    return { dir, ...graph, ...symbols, ...placement, ...move, tree };
}

export const arg = (args, k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);

/** The tree's Playwright program (pass 8): its spec files and the key Playwright reports each by
 *  (the path from its rootDir), read by the tree's own floor in either layout (the floor base's
 *  lib/scan/, the migrated tree's lib/graph/). Capture specs (`_`-prefixed) are not selected. */
export async function loadProgram(root) {
    const F = await loadFloor(root);
    const dir = F.dir;
    const p = ["graph/playwright.mjs", "scan/playwright.mjs"].map((c) => join(dir, "lib", c)).find((x) => existsSync(x));
    if (!p) throw new Error(`floor: no playwright program reader under ${dir}/lib`);
    const { playwrightProgram } = await import(pathToFileURL(p).href);
    const g = F.buildGraph(resolve(root));
    const program = playwrightProgram(g, F.loadDeps(resolve(root)).ts);
    const specs = program.specs.filter((f) => !f.split("/").pop().startsWith("_"));
    return { rootDir: program.rootDir, specs, keyOf: program.keyOf };
}
