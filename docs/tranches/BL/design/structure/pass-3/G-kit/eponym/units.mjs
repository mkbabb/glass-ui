// units.mjs — the D1-G law, part 1 (LAW.md L0 and L3): units, zones, the unit function for FD-2,
// the context every stage reads, and names. The law is split by stage so no file passes R-5's
// 500 lines; index.mjs is the door the tools and the gate read.
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { buildGraph } from "../lib/graph.mjs";
import { makeOrigins } from "../lib/symbols.mjs";
import { CONTAINERS, GLOBAL_ZONES, dirUnits, isSlot } from "../lib/placement.mjs";

const { dirname, basename } = posix;
export const NAMES = JSON.parse(readFileSync(new URL("./names.json", import.meta.url), "utf8"));
export const COMPONENTS = CONTAINERS.has("src/components") ? "src/components" : null;
export const TOP = "⊤";
export const CODE = /\.(ts|mts|js|mjs|vue)$/;
export const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(f) || /\.visual\.ts$/.test(f);
export const within = (f, d) => d === "." || f === d || f.startsWith(`${d}/`);
export const inGlobal = (f) => GLOBAL_ZONES.some((z) => within(f, z));
/** L0.1 · a component unit: a first-level dir of src/components outside the global zone. */
export function componentUnitOf(f) {
    if (!f.startsWith(`${COMPONENTS}/`) || inGlobal(f)) return null;
    const seg = f.slice(COMPONENTS.length + 1).split("/");
    return seg.length > 1 ? `${COMPONENTS}/${seg[0]}` : null;
}
/** strip kind slots from a dir: the dir a slot's files belong to (FD-3) */
export const slotStrip = (d) => { while (isSlot(d)) d = dirname(d); return d; };

/** L0.3 · G's unit function for FD-2: R-2's dir units (FD-3 slots belong to their unit), except
 *  that a unit's door (an entry source or a declared door) is a node of its own, and so is a
 *  test. A door publishes; it reads nothing (R-2), so its re-export edges into its own subtree
 *  never make the unit co-cyclic with a sub-unit. A test reads its subject and nothing reads a
 *  test, so a test homed in its subject's `__tests__/` slot (R-3) never joins a cycle. */
export function gUnits(ctx) {
    const base = dirUnits();
    return { name: "G: R-2 dir units, doors and tests as their own nodes", unitOf: (f) => (ctx.doors.has(f) || isTest(f) ? f : base.unitOf(f)) };
}

/** Everything the law and the gate read, built once per tree. */
export function context(root, { overlay = {}, g = null } = {}) {
    g ??= buildGraph(root, { overlay });
    const O = makeOrigins(g);
    const T = g.tree;
    const entrySources = new Set(g.record.js.map(([, s]) => s));
    const cssEntrySources = new Set(g.record.css.map(([, t]) => t.source).filter(Boolean));
    const doors = new Set([...entrySources, ...cssEntrySources, ...g.record.doors]);
    /** file → Set of entry names that publish it (by symbol origin through barrels) */
    const pubBy = new Map();
    for (const [name, src] of g.record.js) for (const os of O.exportsOf(src).values()) for (const f of O.files(os)) { if (!pubBy.has(f)) pubBy.set(f, new Set()); pubBy.get(f).add(name); }
    const entryOf = new Map(g.record.js.map(([n, s]) => [n, s]));
    /** L1.2 · a kernel entry: an entry whose source lies in the global zone */
    const kernelEntry = (name) => name !== "index" && inGlobal(entryOf.get(name));
    return { root, g, O, T, entrySources, cssEntrySources, doors, pubBy, entryOf, kernelEntry };
}

// ------------------------------------------------------------------ L3 · names
const STAGES = new Set(["frag", "vert", "wgsl", "glsl", "comp"]);
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
export const norm = (s) => s.toLowerCase().replace(/[-_.]/g, "");
/** L3.1 · rootName(file, unitName): the dir name a root's file name gives. */
export function rootName(file, unitName) {
    const b = basename(file);
    if (/^index\./.test(b)) return basename(dirname(file));
    let s = kebab(b.replace(/\.(vue|ts|mts|mjs|js|css)$/, "")).replace(/\./g, "-");
    s = s.replace(/^use-/, "");
    // L3.1(e) a leading token equal to the unit's name drops, unless only a stage token would remain
    if (unitName && s.startsWith(`${unitName}-`)) {
        const rest = s.slice(unitName.length + 1);
        if (!STAGES.has(rest)) s = rest;
    }
    return s;
}
/** L4.7 · R-6's owning entry. For a symbol origin that two or more non-root entries publish,
 *  the owner is the entry whose source's dir most deeply contains the origin file; among
 *  equals, the entry that publishes the fewest names (the lighter door, P3-R4's config-door
 *  reading). Every other entry drops the name. A tie the two rules leave is thrown: the law
 *  names no owner there, so a person must. */
export function r6Owner(ctx, originFile, names) {
    ctx.entryWeight ??= new Map(ctx.g.record.js.map(([n, s]) => [n, ctx.O.exportsOf(s).size]));
    const depth = (n) => { const d = dirname(ctx.entryOf.get(n)); return within(originFile, d) ? d.split("/").length : 0; };
    const ranked = [...names].sort((a, b) => depth(b) - depth(a) || ctx.entryWeight.get(a) - ctx.entryWeight.get(b) || (a < b ? -1 : 1));
    const [first, second] = ranked;
    if (second && depth(first) === depth(second) && ctx.entryWeight.get(first) === ctx.entryWeight.get(second)) throw new Error(`L4.7: ${originFile} on ./${first} and ./${second} ties`);
    return first;
}
/** L3.2 · the authored name of a root's dir, when names.json overrides it: keyed by the
 *  unit's name and the root's file name. */
export function dirNameOf(file, unit) {
    const d = decisionOf(file, unit);
    return typeof d === "string" ? d : d?.name ?? rootName(file, basename(unit));
}
/** L3.2 · the authored decision for a root (names.json `names`, keyed by the unit's name and the
 *  root's file name): a string names its dir; `{ collapse: true }` makes the root head no dir
 *  (its private closure lives in the dir of the root's own owner). */
export const decisionOf = (file, unit) => NAMES.names?.[basename(unit)]?.[basename(file)] ?? null;
export const collapsedRoot = (file, unit) => { const d = decisionOf(file, unit); return !!(d && typeof d === "object" && d.collapse); };
/** L7.2 · the authored carve of a peer dir (names.json `carve`: dir → module → file names, taken
 *  from B's pass-3 carve): the module dir a file of that dir belongs to, or null. */
export function carveModule(dir, base) {
    for (const [m, files] of Object.entries(NAMES.carve?.[dir] ?? {})) if (m !== "why" && files.includes(base)) return `${carveHome(dir)}/${m}`;
    return null;
}
/** a carve of a kind slot names modules of the slot's unit (dock/styles → dock/search/) */
const carveHome = (dir) => (isSlot(dir) ? slotStrip(dir) : dir);
/** every carve entry: [the carved dir, the module dir, the file name] */
export const carveEntries = () => Object.entries(NAMES.carve ?? {}).flatMap(([d, ms]) => Object.entries(ms).filter(([m]) => m !== "why").flatMap(([m, fs]) => fs.map((b) => [d, `${carveHome(d)}/${m}`, b])));
/** every carve module dir the names author */
export const carveModules = () => [...new Set(carveEntries().map(([, m]) => m))];
/** L3.5 · a file rename (names.json `rename`), keyed by the file's path at proposal time. */
export const renamedTo = (file) => NAMES.rename?.[file] ?? null;
/** L2.8 · the authored base-module name for parent dir P of unit U (names.json `bases`, keyed by
 *  the unit's name and P relative to U, "." for U itself). */
export const baseNameOf = (U, P) => NAMES.bases?.[basename(U)]?.[P === U ? "." : P.slice(U.length + 1)] ?? null;
