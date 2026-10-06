// sequence.mjs — the frozen chain (frozen/SEQUENCE.json): { base, steps: [{ id, kind, file, why, digest }] }.
// A derive tool appends its step once it has applied it, with the code digest the tree then
// holds (lib/digest.mjs); replay.mjs replays the chain from these records only.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { codeDigest } from "./digest.mjs";

export const KIT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PATH = join(KIT, "frozen/SEQUENCE.json");
export const readSeq = () => (existsSync(PATH) ? JSON.parse(readFileSync(PATH, "utf8")) : null);
export function writeSeq(seq) { writeFileSync(PATH, `${JSON.stringify(seq, null, 1)}\n`); }
export function startSeq(root, sha) { const seq = { note: "route D1-B pass 5 (HEAD code, glass-ui 10.1.0, on the P5 floor): the frozen chain, replayed by replay.mjs", baseSha: sha, base: codeDigest(root).digest, steps: [] }; writeSeq(seq); return seq; }
/** Record a step that has just been applied to `root`. Re-recording an id replaces it and drops every later step. */
export function recordStep(root, { id, kind, file = null, why }) {
    const seq = readSeq();
    if (!seq) throw new Error("sequence: no chain started");
    const i = seq.steps.findIndex((s) => s.id === id);
    if (i >= 0) seq.steps.splice(i);
    const d = codeDigest(root).digest;
    if (seq.steps.length && seq.steps.at(-1).digest === d) throw new Error(`sequence: step ${id} changed nothing`);
    seq.steps.push({ id, kind, file, why, digest: d });
    writeSeq(seq);
    return d;
}
