// placement.mjs — F-7: the placement rule, as one function of (graph, unit set).
//
//   A file read by one unit lives in that unit. A file read by more lives at their
//   nearest common ancestor: in that ancestor's slot when the ancestor is a unit, in the
//   global zone when the ancestor is a zone root. Readers are counted by symbol through
//   barrels (symbols.mjs), inside the file's own zone, and a door is never a reader (R-2).
//
// The unit set is a parameter. `dirUnits` is R-2's reading: every directory is a unit
// except the kind slots R-5 names (composables/, __tests__/, styles/), which belong to
// the unit that holds them. `isSlot` is the one slot predicate (FD-3); bounds.mjs uses it.
//
// The anchor is a parameter too (FD-1, P3-R1): `publicationAnchor(g)` maps a file an
// entry door publishes from inside its own directory to that door's unit, and such a
// file is `anchored`, never moved. The anchoring door is the unit's root door (X-10): a
// slot barrel anchors nothing, and a container's aggregate door is no unit's door.
import { posix } from "node:path";
import { ZONES, zoneOf } from "./tree.mjs";
import { makeOrigins } from "./symbols.mjs";

export const KIND_SLOTS = new Set(["composables", "__tests__", "styles"]);
/** Dirs that hold modules and are not modules: the zones and the two component/hook containers. */
export const CONTAINERS = new Set([...ZONES, "src/components", "src/composables"]);

/** FD-3 · a kind slot is a dir named in R-5's set that is neither a zone root nor a direct
 *  child of a zone or container. `src/styles/` and `src/composables/` are therefore units
 *  (the global zone's own dirs), and `dock/composables/` is dock's slot. */
export function isSlot(dir) {
    if (!KIND_SLOTS.has(posix.basename(dir)) || CONTAINERS.has(dir)) return false;
    return !CONTAINERS.has(posix.dirname(dir));
}
export const ZONE_ROOTS = new Set(["src", "src/components", "src/composables", "src/styles", "demo", "scripts", "tests", "tests-visual"]);
/** An ancestor at one of these is a zone root: the file is shared across the zone (R-4's global slot). */
export const GLOBAL_HOMES = new Set(["src", "src/components", "src/composables", "src/styles"]);
/** The global zone: a file whose home is a zone root is placed anywhere in here (organised by module, not by reader). */
export const GLOBAL_ZONES = ["src/composables", "src/styles", "src/components/_shared", "src/fonts"];

export function dirUnits() {
    return {
        name: "dir (R-2: component dir, recursively; kind slots belong to their unit)",
        unitOf(file) {
            let d = posix.dirname(file);
            while (isSlot(d)) d = posix.dirname(d);
            return d;
        },
    };
}

/**
 * FD-1 · publicationAnchor(graph) → anchor(file) → unit | null (P3-R1: publication anchors).
 * An anchoring door is an entry source, or a declared door (`record.doors`) an entry
 * reaches through re-exports, whose dir is neither a container nor a kind slot; and every
 * CSS entry source under the same rule. It
 * anchors each file it publishes, by symbol origin through barrels (a CSS entry: its
 * `@import` closure), that lies inside its own dir. The innermost door wins. The global
 * zone is not exempt: a hook a kernel entry publishes is anchored in its kernel dir.
 */
export function publicationAnchor(graph) {
    const O = makeOrigins(graph);
    const anchorsDoor = (door) => { const d = posix.dirname(door); return !CONTAINERS.has(d) && !isSlot(d); };
    const map = new Map();
    const claim = (file, dir) => {
        if (!within(file, dir) || file === dir) return;
        const prev = map.get(file);
        if (!prev || dir.length > prev.length) map.set(file, dir);
    };
    // a door publishes only when an entry reaches it through re-exports (X-10's root door):
    // a declared door no entry reaches publishes nothing, so it anchors nothing
    const reached = new Set(graph.record.js.map(([, s]) => s));
    const stack0 = [...reached];
    while (stack0.length) {
        const f = stack0.pop();
        for (const e of graph.edges) if (e.from === f && /^reexport/.test(e.kind) && e.to && !reached.has(e.to)) { reached.add(e.to); stack0.push(e.to); }
    }
    const js = [...reached].filter((d) => (d === graph.record.js.find(([, s]) => s === d)?.[1] || graph.record.doors.includes(d)) && /\.(ts|mts|js|mjs)$/.test(d) && anchorsDoor(d));
    for (const door of js) {
        const dir = posix.dirname(door);
        for (const os of O.exportsOf(door).values()) for (const f of O.files(os)) if (f !== door) claim(f, dir);
    }
    for (const door of graph.record.css.map(([, t]) => t.source).filter((s) => s && anchorsDoor(s))) {
        const dir = posix.dirname(door);
        const seen = new Set([door]);
        const stack = [door];
        while (stack.length) {
            const f = stack.pop();
            for (const e of graph.edges) if (e.from === f && /css-import$/.test(e.kind) && e.to && !seen.has(e.to)) { seen.add(e.to); stack.push(e.to); claim(e.to, dir); }
        }
    }
    const anchor = (file) => map.get(file) ?? null;
    anchor.size = map.size;
    anchor.entries = () => [...map];
    return anchor;
}

export function nca(dirs) {
    const parts = dirs.map((d) => d.split("/"));
    const out = [];
    for (let i = 0; ; i++) {
        const seg = parts[0][i];
        if (seg === undefined || parts.some((p) => p[i] !== seg)) break;
        out.push(seg);
    }
    return out.join("/") || ".";
}

const within = (file, dir) => dir === "." || file === dir || file.startsWith(`${dir}/`);

/**
 * home(f): the unit a file belongs in. Classes:
 *   ok        placed at home: inside its one reader unit's subtree, or at its readers'
 *             ancestor and not inside any one reader's own subtree
 *   move      read by one unit and living outside it (colocate), or read by several and
 *             living inside one reader's subtree or outside their ancestor
 *   global    a move whose home is a zone root (src, src/components, src/composables,
 *             src/styles): the file is shared across the zone and goes to its global slot
 *   published read by no unit in its zone; an entry publishes it (placement free)
 *   unread    read by nothing and published by nothing (E-7 delete, R-8)
 *   anchored  would be move or global, but an entry door publishes it from its own dir (FD-1)
 */
export function placeAll(graph, units = dirUnits(), { zones = ["src"], anchor = null } = {}) {
    const O = makeOrigins(graph);
    const doors = new Set([...graph.record.js.map(([, s]) => s), ...graph.record.css.map(([, t]) => t.source).filter(Boolean), ...graph.record.doors]);
    const readers = new Map();
    const scope = graph.tree.files.filter((f) => zones.includes(zoneOf(f)));
    for (const r of graph.tree.parsed) {
        if (doors.has(r)) continue; // a door is not a reader (R-2)
        for (const f of O.readsOf(r)) {
            if (zoneOf(f) !== zoneOf(r)) continue;
            if (!readers.has(f)) readers.set(f, new Set());
            readers.get(f).add(r);
        }
    }
    const published = new Set();
    for (const [, source] of graph.record.js) for (const os of O.exportsOf(source).values()) for (const f of O.files(os)) published.add(f);
    // the CSS entries publish their @import closure
    const stack = graph.record.css.map(([, t]) => t.source).filter(Boolean);
    while (stack.length) {
        const f = stack.pop();
        for (const e of graph.edges) if (e.from === f && /css-import$/.test(e.kind) && e.to && !published.has(e.to)) { published.add(e.to); stack.push(e.to); }
    }
    const rows = [];
    for (const f of scope) {
        if (!/\.(ts|mts|js|mjs|vue|css)$/.test(f) || /\.d\.ts$/.test(f) || doors.has(f) || /(^|\/)index\.(ts|css)$/.test(f)) continue;
        const rs = [...(readers.get(f) ?? [])];
        const us = [...new Set(rs.map((r) => units.unitOf(r)))].sort();
        const here = units.unitOf(f);
        let cls, home, why = "";
        if (!us.length) { cls = published.has(f) ? "published" : "unread"; home = here; }
        else if (us.length === 1) {
            home = us[0];
            cls = within(here, home) ? "ok" : "move";
            if (cls === "move") why = "read by one unit, lives outside it";
        } else {
            // at the readers' nearest common ancestor: under it, and inside none of the readers
            home = nca(us);
            const inReader = us.find((u) => u !== home && within(here, u));
            const rootHome = GLOBAL_HOMES.has(home) || home === ".";
            cls = (within(here, home) && !inReader) || (rootHome && GLOBAL_ZONES.some((z) => within(here, z))) ? "ok" : rootHome ? "global" : "move";
            if (cls !== "ok") why = inReader ? `lives inside reader ${inReader}` : "lives outside its readers' ancestor";
        }
        const a = anchor ? anchor(f) : null;
        if (a && (cls === "move" || cls === "global")) { why = `${cls} → published by ${a}'s door`; cls = "anchored"; home = a; }
        rows.push({ file: f, unit: here, readers: rs.length, readerUnits: us, home, class: cls, why, ...(a ? { anchor: a } : {}) });
    }
    return { units: units.name, rows, readers };
}

/** Where a file would land: its home, in the kind slot for shared files (R-4), or the global slot. */
export function proposedPath(tree, row) {
    const base = posix.basename(row.file);
    const css = row.file.endsWith(".css");
    if (row.class === "global") {
        const zone = css ? "src/styles" : row.file.endsWith(".vue") ? "src/components/_shared" : "src/composables";
        return `${zone}/${base}`;
    }
    const shared = row.readerUnits.length > 1;
    const slot = css ? "styles" : shared && !row.file.endsWith(".vue") ? "composables" : /^use[A-Z]/.test(base) ? "composables" : null;
    const dir = slot && (shared || tree.isDir(`${row.home}/${slot}`)) ? `${row.home}/${slot}` : row.home;
    return `${dir}/${base}`;
}
