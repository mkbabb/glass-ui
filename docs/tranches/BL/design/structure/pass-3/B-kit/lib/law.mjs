// law.mjs — route D1-B's placement law in code, one function per rule of LAW.md. The B-kit
// planners and the gate (seal.mjs, which lands a copy of this file as
// scripts/structure/seal-law.mjs) read these, so the law is stated once. Every function takes
// the floor's namespaces as `F` ({ makeOrigins, CONTAINERS, isSlot, ... }).
import { posix } from "node:path";

const dirOf = (f) => posix.dirname(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
export const GLOBAL_ROOTS = ["src/composables", "src/styles", "src/components/_shared", "src/fonts"];
export const inGlobal = (f) => GLOBAL_ROOTS.some((z) => under(f, z));
const KERNEL_CONTAINERS = ["src/composables", "src/components/_shared"];

/** LAW §1: the MODULE a door belongs to. A component entry's module is its own dir; an entry
 *  inside a kernel module is a door of that module (the first dir below `src/composables/`
 *  or `_shared/`, or `src/styles`): `./motion-core` is a door of `composables/motion`. */
export function doorModule(door) {
    const d = dirOf(door);
    for (const c of KERNEL_CONTAINERS) if (d.startsWith(`${c}/`)) return `${c}/${d.slice(c.length + 1).split("/")[0]}`;
    if (under(d, "src/styles")) return "src/styles";
    return d;
}

const isDoorFile = (f, g) => /(^|\/)index\.(ts|mts|mjs|css)$/.test(f) || g.record.js.some(([, s]) => s === f);

/**
 * LAW §1 · B's publication anchor (P3-R1(a), read by NAME). A file is published when an entry
 * exports a name whose origin is that file. It is anchored in the innermost door dir on that
 * name's re-export chain from the entry that contains it (X-10: never a container's or a kind
 * slot's dir). A kernel entry's claim widens from its own dir to its module (doorModule), so
 * `./motion-core` anchors `motion/scroll/useScrollChrome.ts` in `composables/motion`. A door
 * an entry reaches anchors only the names the entry takes from it: growing a door never
 * anchors a file (the floor's publicationAnchor anchors every export of a reached door).
 */
export function bAnchor(F, g, O = F.makeOrigins(g)) {
    const byFile = new Map();
    for (const e of g.edges) { if (!byFile.has(e.from)) byFile.set(e.from, []); byFile.get(e.from).push(e); }
    const edgeOfRef = (file, idx) => (byFile.get(file) ?? []).find((e) => e.refIndex === idx) ?? null;
    const okDir = (d) => !F.CONTAINERS.has(d) && !F.isSlot(d) && d !== "src/components/_shared";
    const map = new Map();
    const claim = (f, d) => { if (!under(f, d) || f === d) return; const p = map.get(f); if (!p || d.length > p.length) map.set(f, d); };
    function walk(file, name, path, seen, entry) {
        const k = `${file}#${name}`; if (seen.has(k)) return; seen.add(k);
        const doors = isDoorFile(file, g) ? [...path, file] : path;
        const land = (origin) => {
            const files = name === "*" || origin.ns ? O.files([{ file: origin.file, name: "*" }]) : [origin.file];
            for (const f of files) {
                const cands = doors.map(dirOf).filter((d) => okDir(d) && under(f, d));
                if (cands.length) claim(f, cands.sort((a, b) => b.length - a.length)[0]);
                else if (inGlobal(entry)) { const m = doorModule(entry); if (m !== dirOf(entry) && !F.CONTAINERS.has(m) && under(f, m)) claim(f, m); }
            }
        };
        const info = g.exportsOf.get(file);
        if (!info) return land({ file });
        if (name !== "*" && info.own.has(name)) land({ file });
        for (const { local, exported } of info.local) {
            if (exported !== name) continue;
            const b = info.importBindings.get(local);
            const e = b ? edgeOfRef(file, b.ref) : null;
            if (!e?.to) { land({ file }); continue; }
            if (b.imported === "*") land({ file: e.to, ns: true }); else walk(e.to, b.imported, doors, seen, entry);
        }
        for (const e of byFile.get(file) ?? []) {
            if (!e.to) continue;
            if (e.kind === "reexport") for (const n of e.names ?? []) if (n.exported === name) walk(e.to, n.imported, doors, seen, entry);
            if (e.kind === "reexport-ns") for (const n of e.names ?? []) if (n.exported === name) land({ file: e.to, ns: true });
            if (e.kind === "reexport-star" && name !== "default" && O.exportsOf(e.to).has(name)) walk(e.to, name, doors, seen, entry);
        }
    }
    for (const [, src] of g.record.js) for (const n of O.exportsOf(src).keys()) walk(src, n, [], new Set(), src);
    const anchor = (f) => map.get(f) ?? null;
    anchor.size = map.size;
    anchor.entries = () => [...map];
    return anchor;
}

/** LAW §4 · F-7 at the depth FD-2 permits. A move F-7 proposes that would add a co-cyclic
 *  module pair (the floor's sccGrowth on the image graph, in memory) is FD-2-bound: the file
 *  stays, provided it already lies inside F-7's home. Returns the rows that are violations. */
export function placementViolations(F, g, rows) {
    const out = [], bound = [];
    for (const r of rows) {
        if (r.class !== "move" && r.class !== "global") continue;
        if (!under(r.file, r.home) || r.class === "global") { out.push(r); continue; }
        const to = F.proposedPath(g.tree, r);
        const image = { edges: g.edges.map((e) => ({ ...e, from: e.from === r.file ? to : e.from, to: e.to === r.file ? to : e.to })), tree: { files: g.tree.files.map((f) => (f === r.file ? to : f)) } };
        const s = F.sccGrowth(g, image, null, {});
        if (s.grown.length) bound.push({ ...r, to, added: s.addedPairs }); else out.push(r);
    }
    return { violations: out, bound };
}
