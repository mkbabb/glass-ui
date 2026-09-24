// placement.mjs — F-7: the placement rule, as one function of (graph, unit set).
//
//   A file read by one unit lives in that unit. A file read by more lives at their
//   nearest common ancestor: in that ancestor's slot when the ancestor is a unit, in the
//   global zone when the ancestor is a zone root. Readers are counted by symbol through
//   barrels (symbols.mjs), inside the file's own zone, and a door is never a reader (R-2).
//
// The unit set is a parameter. `dirUnits` is R-2's reading: every directory is a unit
// except the kind slots R-5 names (composables/, __tests__/, styles/), which belong to
// the unit that holds them.
import { posix } from "node:path";
import { zoneOf } from "./tree.mjs";
import { makeOrigins } from "./symbols.mjs";

export const KIND_SLOTS = new Set(["composables", "__tests__", "styles"]);
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
            while (KIND_SLOTS.has(posix.basename(d))) d = posix.dirname(d);
            return d;
        },
    };
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
 */
export function placeAll(graph, units = dirUnits(), { zones = ["src"] } = {}) {
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
        rows.push({ file: f, unit: here, readers: rs.length, readerUnits: us, home, class: cls, why });
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
