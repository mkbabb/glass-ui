// stage-g.mjs — stage G's gate (G-kit/eponym/*, the law code and its authored names.json, byte
// for byte) outside the judged tree, with each `../lib/<f>.mjs` floor import pointed at the
// judged tree's own floor file. The two routes keep the same floor code at different paths
// (B's S19 moved the F-1 graph and its scanners into scripts/structure/lib/graph/), so the
// graph import resolves to `lib/graph/graph.mjs` when `lib/graph.mjs` is absent. Nothing is
// written into the judged tree. Returns the staged gate module ({ judge, CLAUSES }).
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const GKIT = resolve(dirname(fileURLToPath(import.meta.url)), "../G-kit/eponym");
/** the clauses the merge test names (REGISTRY §P2-6.4: E0-E3 with the authored overrides) and
 *  the four B clauses G adopted (§P2-4, G-kit LAW §L4) */
export const MERGE = ["E0", "E1", "E1K", "E2", "E3", "E3N", "E3P", "B1", "B8", "B12", "B14"];

export async function stageG(tree, stage) {
    const lib = join(tree, "scripts/structure/lib");
    const floor = (f) => {
        const flat = join(lib, f);
        if (existsSync(flat)) return flat;
        const moved = join(lib, "graph", f);
        if (existsSync(moved)) return moved;
        throw new Error(`stage-g: floor file ${f} not found under ${lib}`);
    };
    const dir = join(stage, `eponym-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    mkdirSync(dir, { recursive: true });
    const rewired = [];
    for (const f of readdirSync(GKIT)) {
        let text = readFileSync(join(GKIT, f), "utf8");
        if (f.endsWith(".mjs")) text = text.replace(/"\.\.\/lib\/([a-z-]+\.mjs)"/g, (_, n) => { const p = floor(n); rewired.push(`${f}: ../lib/${n} → ${p.slice(tree.length + 1)}`); return `"${pathToFileURL(p).href}"`; });
        writeFileSync(join(dir, f), text);
    }
    const mod = await import(pathToFileURL(join(dir, "eponym.mjs")).href);
    return { ...mod, dir, rewired };
}
