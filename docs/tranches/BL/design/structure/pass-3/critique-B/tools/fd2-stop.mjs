// tools/fd2-stop.mjs <replayed tree> — S-05: a move that makes kernel ↔ unit co-cyclic, run dry through the tree's
// own engine. FD-2 holds as a stop when the result is ok:false with scc.grown non-empty and written:false.
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const root = resolve(process.argv[2]);
const { runMoves } = await import(pathToFileURL(`${root}/scripts/structure/lib/move.mjs`));
const r = runMoves(root, [{ from: "src/composables/motion/motion-core.ts", to: "src/components/aurora/motion-core.ts" }], { dry: true });
const o = {};
for (const k of Object.keys(r)) if (!["byKind", "edits", "plan"].includes(k)) o[k] = r[k];
console.log(JSON.stringify(o));
