// dominance.mjs — G's within-unit dominance law (G-research §1, G-proto §8, SPECS-v2 §4.2),
// rebuilt on the floor's F-1 graph as B's MODULE PROPOSER (REGISTRY §P2-4, earned G → B).
//
// For each unit U: the reader subgraph over U's files (makeOrigins.readsOf, by symbol
// through barrels), a super-root ⊤ with an edge to U's door and to every file read from
// outside U or read by nothing in U, door edges weak (a door keeps an edge only to a file
// no other U file reads). Immediate dominators by Cooper-Harvey-Kennedy. Roots: every SFC,
// U's door and entry sources, and every file that immediately dominates 2 or more files. A
// file's owner is its nearest root ancestor; a non-door root whose owned closure holds 2 or
// more files heads a dir (the proposal), nested in its owner's dir. Names are not decided
// here: `rootName` is the default, and B's authored names (authored/names.json) override it.
import { posix } from "node:path";

const dirOf = (f) => posix.dirname(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);

export function rootName(file, unitName) {
    let stem = posix.basename(file).replace(/\.(ts|mts|mjs|js|vue|css)$/, "");
    stem = stem.replace(/\.(glsl|wgsl)$/, "-$1").replace(/\.(frag|vert)$/, "-$1");
    stem = stem.replace(/^use(?=[A-Z])/, "");
    let kebab = stem.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
    if (kebab === "index") kebab = posix.basename(dirOf(file));
    const u = unitName.toLowerCase();
    if (kebab.startsWith(`${u}-`) && kebab.length > u.length + 1) kebab = kebab.slice(u.length + 1);
    return kebab;
}

/** Cooper-Harvey-Kennedy immediate dominators over adj (Map node → [succ]) from `start`. */
export function idoms(adj, start) {
    const order = [], seen = new Set();
    const dfs = (x) => { seen.add(x); for (const y of adj.get(x) ?? []) if (!seen.has(y)) dfs(y); order.push(x); };
    dfs(start);
    const rpo = order.reverse();
    const idx = new Map(rpo.map((n, i) => [n, i]));
    const preds = new Map(rpo.map((n) => [n, []]));
    for (const x of rpo) for (const y of adj.get(x) ?? []) if (idx.has(y)) preds.get(y).push(x);
    const dom = new Map([[start, start]]);
    const inter = (a, b) => { while (a !== b) { while (idx.get(a) > idx.get(b)) a = dom.get(a); while (idx.get(b) > idx.get(a)) b = dom.get(b); } return a; };
    for (let changed = true; changed;) {
        changed = false;
        for (const n of rpo) {
            if (n === start) continue;
            let d = null;
            for (const p of preds.get(n)) if (dom.has(p)) d = d === null ? p : inter(p, d);
            if (d !== null && dom.get(n) !== d) { dom.set(n, d); changed = true; }
        }
    }
    return dom;
}

const TOP = "⊤";
/** proposeUnit(F, g, O, U) → { unit, files, rows: [{file, owner, dir}], dirs: [{root, name, members}] } */
export function proposeUnit(F, g, O, U, { doors, isSlot }) {
    const code = /\.(ts|mts|vue|css)$/;
    const files = g.tree.files.filter((f) => under(f, U) && code.test(f) && !/\.d\.ts$/.test(f) && !/(^|\/)__tests__\//.test(f));
    const inU = new Set(files);
    const isDoor = (f) => doors.has(f);
    const readers = new Map(files.map((f) => [f, new Set()]));
    const outside = new Set();
    for (const r of g.tree.parsed) {
        if (/(^|\/)__tests__\//.test(r) || /\.(test|spec)\.ts$/.test(r)) continue;
        for (const f of O.readsOf(r)) {
            if (!inU.has(f)) continue;
            if (inU.has(r)) readers.get(f).add(r);
            else if (!doors.has(r)) outside.add(f);
        }
    }
    // door edges weak: a door keeps its edge only to a file no other U file reads
    const adj = new Map([[TOP, []]]);
    for (const f of files) adj.set(f, []);
    for (const [f, rs] of readers) {
        const nonDoor = [...rs].filter((r) => !isDoor(r));
        for (const r of rs) if (!isDoor(r) || !nonDoor.length) adj.get(r).push(f);
    }
    for (const f of files) if (isDoor(f) || outside.has(f) || readers.get(f).size === 0) adj.get(TOP).push(f);
    const dom = idoms(adj, TOP);
    const kids = new Map();
    for (const [n, d] of dom) if (n !== TOP) { if (!kids.has(d)) kids.set(d, []); kids.get(d).push(n); }
    const isRoot = (f) => f === TOP || f.endsWith(".vue") || isDoor(f) || (kids.get(f)?.length ?? 0) >= 2;
    const owner = (f) => { let d = dom.get(f); while (d !== undefined && !isRoot(d)) d = dom.get(d); return d ?? TOP; };
    const unitName = posix.basename(U);
    const owned = new Map();
    for (const f of files) { if (!dom.has(f)) continue; const o = owner(f); if (!owned.has(o)) owned.set(o, []); owned.get(o).push(f); }
    // a root heads a dir when its owned closure (transitively through non-dir roots) holds >= 2 files
    const closure = (r) => { const out = []; for (const f of owned.get(r) ?? []) { out.push(f); if (isRoot(f)) out.push(...closure(f)); } return out; };
    const heads = new Map();
    const place = new Map(); // file → proposed dir
    const visit = (r, dir) => {
        for (const f of owned.get(r) ?? []) {
            const c = isRoot(f) && f !== TOP && !isDoor(f) ? closure(f) : [];
            const name = rootName(f, unitName);
            if (c.length >= 2 && name !== unitName) {
                const d = `${dir}/${name}`;
                heads.set(f, { root: f, dir: d, members: [f, ...c] });
                place.set(f, d);
                visit(f, d);
            } else {
                place.set(f, dir);
                if (isRoot(f)) visit(f, dir);
            }
        }
    };
    visit(TOP, U);
    const unreached = files.filter((f) => !dom.has(f));
    const rows = files.map((f) => {
        let dir = place.get(f) ?? dirOf(f);
        // slot tolerance (G §8): a file in a kind slot of its computed dir stays in the slot
        const cur = dirOf(f);
        if (isSlot(cur) && dirOf(cur) === dir) dir = cur;
        return { file: f, owner: dom.has(f) ? owner(f) : null, dir, moves: dir !== cur };
    });
    return { unit: U, files: files.length, unreached, rows, dirs: [...heads.values()] };
}
