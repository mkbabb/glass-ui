// floor.mjs — load the floor a tree carries (FD-11: `scripts/structure/` once landed), so
// every B-kit tool reads the target tree with that tree's own floor, never the checkout's.
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function floorDir(root) {
    const landed = join(root, "scripts/structure");
    if (existsSync(join(landed, "lib/graph.mjs"))) return landed;
    return join(root, "docs/tranches/BL/design/structure/floor");
}

export async function loadFloor(root) {
    const dir = floorDir(resolve(root));
    const mod = (p) => import(pathToFileURL(join(dir, "lib", p)).href);
    const [graph, symbols, placement, move, tree] = await Promise.all([mod("graph.mjs"), mod("symbols.mjs"), mod("placement.mjs"), mod("move.mjs"), mod("tree.mjs")]);
    return { dir, ...graph, ...symbols, ...placement, ...move, tree };
}

export const arg = (args, k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
