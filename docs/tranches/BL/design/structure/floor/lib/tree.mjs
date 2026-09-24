// tree.mjs — the file set the floor reads: one repo root, five zones, the root
// configs, and the floor's runtime. Read-only. An optional in-memory overlay
// ({path: content | null}) lets a plant battery run without touching disk.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ZONES = ["src", "demo", "tests", "tests-visual", "scripts"];
/** The floor's own dir. It is location-independent (FD-11): it lives under docs/ while it
 *  is design tooling and lands at `scripts/structure/`, and no floor file names either. */
export const FLOOR_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
/** The repo root: the nearest ancestor of the floor whose package.json is the library's. */
export const DEFAULT_ROOT = (() => {
    for (let d = FLOOR_DIR; d !== dirname(d); d = dirname(d)) {
        try { if (JSON.parse(readFileSync(join(d, "package.json"), "utf8")).name === "@mkbabb/glass-ui") return d; } catch { /* keep walking */ }
    }
    throw new Error(`floor: no @mkbabb/glass-ui package.json above ${FLOOR_DIR}`);
})();
/** Where the floor lives, relative to its repo: its design home under docs/ until row
 *  fd11 lands it at `scripts/structure/`. A tree is read with the floor at the same place,
 *  so a landed tree is judged by its own landed floor (`node scripts/structure/…`). */
export const FLOOR_REL = relative(DEFAULT_ROOT, FLOOR_DIR);
export function floorHome() {
    return FLOOR_REL;
}
export const recordPath = (root) => `${floorHome(root)}/records/entry-record.json`;
export const ledgerPath = (root) => `${floorHome(root)}/records/opaque-ledger.json`;
export const pinPath = (root) => `${floorHome(root)}/records/surface-pin.json`;
/** The floor's runtime in a tree (its CLIs, lib/ and records/), which the graph parses in
 *  either home: the floor's own path strings are edges like any script's, so a move that
 *  renames a dir the floor's law names rewrites the floor too. Its design record (FLOOR.md,
 *  plants/, rows/, samples/) is prose and planted fixtures, and is not parsed. */
export function floorRuntime(root) {
    const home = `${floorHome(root)}/`;
    return (p) => p.startsWith(home) && /\.(mjs|json)$/.test(p) && !/^(plants|rows|samples)\//.test(p.slice(home.length));
}

const ROOT_CONFIG = /^(vite[^/]*\.ts|vitest[^/]*\.ts|tsconfig[^/]*\.json|package\.json|index\.html)$/;
/** CI workflows (FD-10): their command tokens name scripts and package scripts. */
const CI_CONFIG = /^\.github\/workflows\/[^/]+\.ya?ml$/;
const SKIP = /(^|\/)(node_modules|dist|dist-demo|\.cache|test-results|playwright-report)(\/|$)/;

export function zoneOf(path) {
    const top = path.split("/")[0];
    if (ZONES.includes(top)) return top;
    if (!path.includes("/") && ROOT_CONFIG.test(path)) return "root";
    if (CI_CONFIG.test(path)) return "ci";
    return "other";
}

/** Parse scope: every zone file, every root config, every CI workflow, the floor runtime. */
export function inParseScope(path, runtime) {
    if (SKIP.test(path)) return false;
    const z = zoneOf(path);
    return z !== "other" || runtime(path);
}

export function openTree(root = DEFAULT_ROOT, { overlay = {} } = {}) {
    root = resolve(root);
    const runtime = floorRuntime(root);
    const listed = execFileSync("git", ["-C", root, "ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
        encoding: "utf8",
        maxBuffer: 1 << 28,
    })
        .split("\0")
        .filter(Boolean);
    const all = new Set();
    for (const p of listed) {
        if (SKIP.test(p) || p === "node_modules") continue;
        if (Object.prototype.hasOwnProperty.call(overlay, p) && overlay[p] === null) continue;
        let st;
        try { st = statSync(join(root, p)); } catch { continue; }
        if (st.isFile()) all.add(p);
    }
    for (const [p, c] of Object.entries(overlay)) if (c !== null) all.add(p);
    const files = [...all].sort();
    const dirs = new Set();
    for (const f of files) {
        let d = dirname(f);
        while (d !== "." && !dirs.has(d)) { dirs.add(d); d = dirname(d); }
    }
    const cache = new Map();
    const read = (p) => {
        if (Object.prototype.hasOwnProperty.call(overlay, p)) return overlay[p];
        if (!cache.has(p)) cache.set(p, readFileSync(join(root, p), "utf8"));
        return cache.get(p);
    };
    return {
        root,
        files,
        fileSet: all,
        dirs,
        read,
        parsed: files.filter((f) => inParseScope(f, runtime)),
        isFile: (p) => all.has(p),
        isDir: (p) => p === "" || p === "." || dirs.has(p),
        abs: (p) => join(root, p),
        rel: (abs) => relative(root, abs),
        exists: (p) => all.has(p) || dirs.has(p) || existsSync(join(root, p)),
    };
}
