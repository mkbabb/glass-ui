// plan.mjs — the move plan's vocabulary, read by the engine (move.mjs) and by FD-5's
// classifier (classify.mjs): a move list expanded to file moves, and an edge's mechanism
// class. It sits apart from both so neither reads the other for it (P5-F1: the engine calls
// the classifier, so the classifier cannot read the engine).

/** A move list with every directory move expanded to its member files. */
export function expandMoves(tree, moves) {
    const out = [];
    for (const m of moves) {
        if (m.from.endsWith("/")) {
            const base = m.from.replace(/\/$/, "");
            const dest = m.to.replace(/\/$/, "");
            const members = tree.files.filter((f) => f.startsWith(`${base}/`));
            if (members.length) for (const f of members) out.push({ from: f, to: `${dest}/${f.slice(base.length + 1)}` });
            else if (tree.isDir(dest)) out.push({ from: m.from, to: m.to, applied: true, dir: true });
            else throw new Error(`move: directory ${m.from} is empty and ${m.to} does not exist`);
        } else out.push({ from: m.from, to: m.to });
    }
    return out;
}

/** Kinds that name one mechanism, a path relative to a file whose text carries it; a
 *  rewrite may change which of the three spellings F-1 reads (P3-F5). */
const TEXT_ANCHORED = new Set(["base-relative", "quoted-relative", "embedded-path"]);
/** an edge's mechanism: its kind, with the three text-anchored spellings as one */
export const kindClass = (kind) => (TEXT_ANCHORED.has(kind) ? "text-anchored" : kind);
