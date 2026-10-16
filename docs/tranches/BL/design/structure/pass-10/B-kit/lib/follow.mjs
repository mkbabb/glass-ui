// follow.mjs — a path's journey through the frozen chain (pass 8; read by tools/rekey.mjs,
// tools/base-specs.mjs and tools/browser-select.mjs). The chain moves a file by a frozen move
// list (from → to, applied in order), or by a row that removes a spec and creates one with the
// same stem (a row-moved spec, *.spec.ts → *.visual.ts). `follow(p)` is where the chain carries
// the path `p` of the base tree; nothing is guessed, a path no step moves stays where it is.
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { KIT, readSeq } from "./sequence.mjs";

export const specStem = (p) => basename(p).replace(/\.(spec|visual)\.ts$|\.ts$/, "");

/** The chain's moves, step by step: [[from, to], …] per step. */
export function chainMoves() {
    const steps = [];
    for (const s of readSeq().steps) {
        if (!s.file) continue;
        const f = JSON.parse(readFileSync(join(KIT, s.file), "utf8"));
        if (f.moves) { steps.push(f.moves.map(({ from, to }) => [from, to])); continue; }
        if (!f.files) continue;
        const removed = Object.entries(f.files).filter(([, op]) => op.remove).map(([p]) => p);
        const created = Object.entries(f.files).filter(([, op]) => op.create !== undefined).map(([p]) => p);
        const pairs = [];
        for (const r of removed.filter((p) => /\.spec\.ts$/.test(p))) {
            const hits = created.filter((c) => specStem(c) === specStem(r) && /\.(spec|visual)\.ts$/.test(c));
            if (hits.length === 1) pairs.push([r, hits[0]]);
        }
        if (pairs.length) steps.push(pairs);
    }
    return steps;
}

/** follow(p): the path the chain carries the base path `p` to. */
export function chainFollow(steps = chainMoves()) {
    return (p) => {
        let at = p;
        for (const pairs of steps) for (const [from, to] of pairs) {
            if (at === from) at = to;
            else if (at.startsWith(`${from}/`)) at = `${to}${at.slice(from.length)}`; // a directory move
        }
        return at;
    };
}
