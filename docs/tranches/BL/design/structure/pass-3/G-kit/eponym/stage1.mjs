// stage1.mjs — the D1-G law, part 2 (LAW.md L1): stage 1, between units.
import { posix } from "node:path";
import { sccGrowth } from "../lib/move.mjs";
import { dirUnits, isSlot, placeAll, proposedPath, publicationAnchor } from "../lib/placement.mjs";
import { globToRegex } from "../lib/resolve.mjs";
import { NAMES, gUnits, inGlobal, isTest, renamedTo, within } from "./units.mjs";

const { dirname, basename } = posix;
/** L1.1 + L1.2 · the stage-1 anchor: the floor's publication anchor (FD-1, P3-R1(a)), and the
 *  kernel publication hold: a global-zone file that a kernel entry publishes is anchored in
 *  its own dir (it is global by publication, so placement never moves it into a unit). */
export function stage1Anchor(ctx) {
    const pa = publicationAnchor(ctx.g);
    const units = dirUnits();
    const anchor = (f) => pa(f) ?? (inGlobal(f) && [...(ctx.pubBy.get(f) ?? [])].some(ctx.kernelEntry) ? units.unitOf(f) : null);
    return anchor;
}

/** L1.3 · where a stage-1 row lands: proposedPath, except that in the global zone a shared
 *  file lands in its home dir itself (no `composables/` slot inside a kernel module), and the
 *  authored stage-1 targets and collision renames of names.json. */
export function stage1Target(ctx, row) {
    const T = ctx.T;
    let to = proposedPath(T, row);
    const base = basename(row.file);
    const home = row.class === "global" ? dirname(to) : row.home;
    if (row.class !== "global" && inGlobal(`${home}/x`) && basename(dirname(to)) === "composables" && !isSlot(home)) to = `${home}/${base}`;
    const sub = NAMES.stage1?.[base];
    if (sub && basename(dirname(to)) !== sub) to = `${dirname(to)}/${sub}/${base}`;
    const renamed = renamedTo(row.file);
    if (renamed) to = `${dirname(to)}/${renamed}`;
    return to;
}

/** L1.4 · FD-8 disposes: a move that changes the match set of a Tailwind `@source` glob (a
 *  css-source edge's pattern matches the file at one path and not the other) is held, since
 *  F-2's image check refuses any change to a glob's membership (FD-8) and the floor has no
 *  declared glob delta. The file stays; the hold is named with the sheet and the pattern. */
export function globHold(ctx, move) {
    ctx.globs ??= [...new Map(ctx.g.edges.filter((e) => e.kind === "css-source" && e.glob).map((e) => [`${e.from}\u0000${e.glob}`, { sheet: e.from, glob: e.glob, re: globToRegex(e.glob) }])).values()];
    const hit = ctx.globs.find((x) => x.re.test(move.from) !== x.re.test(move.to));
    return hit ? `${hit.sheet} @source ${hit.glob}` : null;
}

/** L1.5 · stage 1 to its fixpoint in memory: F-7's classification re-read on the image of the
 *  moves proposed so far (readers and homes mapped through the move map), until no new move
 *  appears; the union is one list, which FD-2 then judges as a whole. */
export function stage1(ctx, { hold = true } = {}) {
    const anchor = stage1Anchor(ctx);
    const p = placeAll(ctx.g, dirUnits(), { zones: ["src"], anchor });
    ctx.readers = p.readers;
    const units = dirUnits();
    const map = new Map();
    const M = (f) => map.get(f) ?? f;
    const rowOf = new Map(p.rows.map((r) => [r.file, r]));
    const moves = [];
    for (let pass = 1; pass <= 8; pass++) {
        const fresh = [];
        for (const r0 of p.rows) {
            if (r0.class === "anchored") continue;
            const here = M(r0.file);
            // L1.5 a test is no reader: it follows its subject (R-3), never the reverse
            const rs = [...(p.readers.get(r0.file) ?? [])].filter((r) => !isTest(r)).map(M);
            const us = [...new Set(rs.map((r) => units.unitOf(r)))].sort();
            if (!us.length) continue;
            const hereU = units.unitOf(here);
            let cls, home;
            if (us.length === 1) { home = us[0]; cls = within(hereU, home) ? "ok" : "move"; }
            else {
                const parts = us.map((d) => d.split("/"));
                const out = [];
                for (let i = 0; ; i++) { const seg = parts[0][i]; if (seg === undefined || parts.some((x) => x[i] !== seg)) break; out.push(seg); }
                home = out.join("/") || ".";
                const inReader = us.find((u) => u !== home && within(hereU, u));
                const rootHome = ["src", "src/components", "src/composables", "src/styles", "."].includes(home);
                cls = (within(hereU, home) && !inReader) || (rootHome && inGlobal(here)) ? "ok" : rootHome ? "global" : "move";
            }
            if (cls === "ok") continue;
            if (anchor(r0.file)) continue;
            const to = stage1Target(ctx, { ...rowOf.get(r0.file), file: here, class: cls, home, readerUnits: us });
            if (to === here || to === map.get(r0.file)) continue;
            fresh.push({ from: r0.file, to, class: cls, readers: us, pass });
        }
        // L1.3 · an authored group moves with its stage-1 move (names.json `groups`)
        for (const [w, gr] of Object.entries(NAMES.groups ?? {})) {
            const lead = fresh.find((m) => m.from === w);
            if (!lead) continue;
            for (const b of gr.members) { const from = `${dirname(w)}/${b}`; if (ctx.T.isFile(from) && !fresh.some((m) => m.from === from)) fresh.push({ from, to: `${dirname(lead.to)}/${b}`, class: "group", readers: [`with ${w}`], pass }); }
        }
        if (!fresh.length) break;
        for (const m of fresh) { map.set(m.from, m.to); const i = moves.findIndex((x) => x.from === m.from); if (i >= 0) moves[i] = m; else moves.push(m); }
    }
    const claims = new Map();
    for (const m of moves) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
    const needsName = moves.filter((m) => claims.get(m.to) > 1 || ctx.T.isFile(m.to));
    const globHeld = [];
    const named = moves.filter((m) => !needsName.includes(m)).filter((m) => { const h = globHold(ctx, m); if (h) globHeld.push({ ...m, glob: h }); return !h; });
    const { kept, held } = hold ? fd2Hold(ctx, named) : { kept: named, held: [] };
    return { rows: p.rows, readers: p.readers, moves: kept, held, globHeld, needsName, anchored: p.rows.filter((r) => r.class === "anchored").length };
}

/** L1.6 · FD-2 disposes: the co-cyclic module pairs a set of moves adds on its image graph
 *  (G's unit function, L0.3). While the set adds any, one move leaves the set (the rule is in
 *  fd2Hold); a removed move is `fd2-held`: the file stays, and the pair it would add is named. */
export function addedPairs(ctx, moves) {
    const fm = new Map();
    for (const m of moves) for (const x of m.expand ?? [m]) fm.set(x.from, x.to);
    const M = { fileMap: fm, file: (x) => fm.get(x) ?? x, dir: (d) => d };
    const image = { edges: ctx.g.edges.map((e) => ({ ...e, from: M.file(e.from), to: e.to && !e.dir ? M.file(e.to) : e.to })), tree: { files: ctx.T.files.map(M.file) } };
    return sccGrowth(ctx.g, image, M, { moduleOf: gUnits(ctx).unitOf });
}
export function fd2Hold(ctx, moves) {
    let kept = [...moves];
    const held = [];
    const alone = new Map(moves.map((m) => [m, addedPairs(ctx, [m])]));
    let r = addedPairs(ctx, kept);
    while (r.addedPairs > 0 && kept.length) {
        // the move whose removal lowers the added count most; ties go to the move that adds the
        // most alone, then to list order. A set whose pairs no single removal lowers loses the
        // move that adds the most alone.
        let best = null;
        for (const m of kept) {
            const n = addedPairs(ctx, kept.filter((x) => x !== m)).addedPairs;
            const a = alone.get(m).addedPairs;
            if (!best || n < best.n || (n === best.n && a > best.a)) best = { m, n, a };
        }
        if (best.n >= r.addedPairs && best.a === 0) throw new Error("L1.6: pairs added by a combination no single move carries");
        held.push({ ...best.m, pairs: alone.get(best.m).firstAdded.map((p) => p.join(" ↔ ")), added: r.addedPairs - best.n });
        kept = kept.filter((x) => x !== best.m);
        r = addedPairs(ctx, kept);
    }
    return { kept, held };
}
