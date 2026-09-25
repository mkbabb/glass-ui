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

/** LAW §3 · the target of a placement row: the authored target when the law names one
 *  (authored/targets.json), else the floor's proposedPath, except that in the scripts zone a
 *  shared file lands in its home dir itself: R-4's `composables/` slot is the hook slot of
 *  `src`, and a script is not a hook. */
export function targetOf(F, tree, r, targets = {}) {
    if (targets[r.file]?.to) return targets[r.file].to;
    const p = F.proposedPath(tree, r);
    if (r.file.startsWith("scripts/") && p.includes("/composables/")) return `${r.home}/${posix.basename(r.file)}`;
    return p;
}

/** LAW §4 · F-7 at the depth FD-2 permits. For each move or global row F-7 proposes, the
 *  image graph with that one file at its proposed path is judged by the floor's sccGrowth over
 *  the sealed zones (src, scripts) and demo. A move that would add a co-cyclic module pair is
 *  FD-2-bound: the file stays, provided it already lies inside F-7's home (it sits in a
 *  sub-module of the dir F-7 names). Every other move or global row is a violation, less the
 *  holds the law names (`holds`, each with its floor reason). Returns { violations, bound, held }. */
/** LAW §4 · a test is not a reader. R-3 puts a test with its subject; a colocated test must
 *  not then pull its subject toward the test's slot, so F-7 reads the graph without tests. */
export const isTestFile = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(f) || /\.visual\.ts$/.test(f);
export const placementGraph = (g) => ({ ...g, tree: { ...g.tree, parsed: g.tree.parsed.filter((f) => !isTestFile(f)) } });

export const FD2_ZONES = ["src", "scripts", "demo"];
export function placementViolations(F, g, rows, { holds = {}, targets = {}, groups = [] } = {}) {
    const out = [], bound = [], held = [];
    for (const r of rows) {
        if (r.class !== "move" && r.class !== "global") continue;
        if (holds[r.file]) { held.push({ ...r, why: holds[r.file].why }); continue; }
        if (!under(r.file, r.home)) { out.push(r); continue; }
        const to = targetOf(F, g.tree, r, targets);
        // the image moves the row's file and, when it leads an authored group, the group with it
        const map = new Map([[r.file, to], ...groups.filter((x) => x.with === r.file).flatMap((x) => x.moves.map((m) => [m.from, m.to]))]);
        const at = (f) => map.get(f) ?? f;
        const image = { edges: g.edges.map((e) => ({ ...e, from: at(e.from), to: e.to && at(e.to) })), tree: { ...g.tree, files: g.tree.files.map(at) } };
        const s = F.sccGrowth(g, image, null, { zones: FD2_ZONES });
        if (s.grown.length) bound.push({ ...r, to, added: s.addedPairs, first: s.firstAdded }); else out.push(r);
    }
    return { violations: out, bound, held };
}
