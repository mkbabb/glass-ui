// follow.mjs — a path's journey through the frozen chain (pass 8; read by tools/rekey.mjs,
// tools/base-specs.mjs and tools/browser-select.mjs). The chain moves a file by a frozen move
// list (from → to, applied in order), or by a row that removes a spec and creates one with the
// same stem (a row-moved spec, *.spec.ts → *.visual.ts). `follow(p)` is where the chain carries
// the path `p` of the base tree; nothing is guessed, a path no step moves stays where it is.
import { execFileSync } from "node:child_process";
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

/**
 * (pass 12, P11-R1 (a)) The chain's steps with what each row creates: [{ pairs, created }] in chain order,
 * every step with a frozen file (a move list's `created` is empty; a row's is every path it creates that
 * is not the target of one of its row-move pairs).
 */
export function chainSteps() {
    const out = [];
    for (const s of readSeq().steps) {
        if (!s.file) continue;
        const f = JSON.parse(readFileSync(join(KIT, s.file), "utf8"));
        if (f.moves) { out.push({ id: s.id, pairs: f.moves.map(({ from, to }) => [from, to]), created: new Set() }); continue; }
        if (!f.files) throw new Error(`follow: step ${s.id}'s frozen file ${s.file} holds neither a move list nor a row`);
        const removed = Object.entries(f.files).filter(([, op]) => op.remove).map(([p]) => p);
        const created = Object.entries(f.files).filter(([, op]) => op.create !== undefined).map(([p]) => p);
        const pairs = [];
        for (const r of removed.filter((p) => /\.spec\.ts$/.test(p))) {
            const hits = created.filter((c) => specStem(c) === specStem(r) && /\.(spec|visual)\.ts$/.test(c));
            if (hits.length === 1) pairs.push([r, hits[0]]);
        }
        const targets = new Set(pairs.map(([, to]) => to));
        out.push({ id: s.id, pairs, created: new Set(created.filter((c) => !targets.has(c))) });
    }
    return out;
}

/**
 * (pass 12, P11-R1 (a)) origin(p): the floor-base path the chain carries to the final-tree path `p`, read
 * backward through the same journey follow() reads forward; null when a row of the chain creates `p` (or a
 * path a later step carries to `p`) with no row-move pair, i.e. a file the chain makes and the base never held.
 * A path no step touches is its own origin. follow(origin(p)) === p is checked: a map that does not invert is
 * a throw.
 */
export function chainOrigin(steps = chainSteps()) {
    const follow = chainFollow(steps.filter((s) => s.pairs.length).map((s) => s.pairs));
    return (p) => {
        let at = p;
        for (const s of [...steps].reverse()) {
            let paired = false;
            for (const [from, to] of [...s.pairs].reverse()) {
                if (at === to) { at = from; paired = true; }
                else if (at.startsWith(`${to}/`)) { at = `${from}${at.slice(to.length)}`; paired = true; }
            }
            if (!paired && s.created.has(at)) return null;
        }
        if (follow(at) !== p) throw new Error(`follow: the chain's map does not invert at ${p}: its origin ${at} follows to ${follow(at)}`);
        return at;
    };
}

/**
 * (pass 12, P11-R1 (a)) The base program: every Playwright spec of the floor base, read from committed bytes, the
 * chain's own baseSha (frozen/SEQUENCE.json), with git. The base config (tests-visual/playwright.config.ts) has
 * testDir "." and testMatch "*.spec.ts" (any depth), so the program is every tests-visual/**\/*.spec.ts, capture
 * specs (a basename starting "_", LAW §13) excluded. No floor row touches tests-visual, so the program at baseSha
 * is the floor base's. An empty program or a git failure is a throw.
 */
export function baseProgram() {
    const { baseSha } = readSeq();
    if (typeof baseSha !== "string" || !baseSha) throw new Error("follow: frozen/SEQUENCE.json names no baseSha; the base program cannot be read");
    const out = execFileSync("git", ["-C", KIT, "ls-tree", "-r", "--name-only", "--full-tree", baseSha, "--", "tests-visual"], { encoding: "utf8", maxBuffer: 1 << 26 });
    const specs = out.split("\n").filter((p) => /^tests-visual\/.+\.spec\.ts$/.test(p) && !p.slice(p.lastIndexOf("/") + 1).startsWith("_"));
    if (!specs.length) throw new Error(`follow: the base program at ${baseSha} holds no spec`);
    return new Set(specs);
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
