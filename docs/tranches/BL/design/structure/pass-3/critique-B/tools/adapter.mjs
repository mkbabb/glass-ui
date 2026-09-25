// adapter.mjs — written AFTER the battery hash, after reading B-kit/LAW.md: maps the route's landed gate to the
// battery's contract. It decides nothing: judge(root) returns the gate's own V table ({B0: [lines], ...}).
import { join } from "node:path";
import { pathToFileURL } from "node:url";
let seal = null;
export async function judge(root) {
    seal ??= (await import(pathToFileURL(join(root, "scripts/structure/seal/seal.mjs")))).seal;
    return seal(root).V;
}
