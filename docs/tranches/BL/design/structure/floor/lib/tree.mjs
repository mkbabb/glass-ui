// tree.mjs — the file set the floor reads: one repo root, five zones, the root
// configs, and the floor's own records. Read-only. An optional in-memory overlay
// ({path: content | null}) lets a plant battery run without touching disk.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ZONES = ["src", "demo", "tests", "tests-visual", "scripts"];
/** The floor lives at docs/tranches/BL/design/structure/floor; the repo root is six levels up. */
export const FLOOR_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DEFAULT_ROOT = resolve(FLOOR_DIR, "../../../../../..");
/** Floor records the graph parses as part of the tree (their path strings are edges). */
export const FLOOR_RECORDS = ["records/entry-record.json", "records/opaque-ledger.json"].map(
    (p) => relative(DEFAULT_ROOT, join(FLOOR_DIR, p)),
);

const ROOT_CONFIG = /^(vite[^/]*\.ts|vitest[^/]*\.ts|tsconfig[^/]*\.json|package\.json|index\.html)$/;
const SKIP = /(^|\/)(node_modules|dist|dist-demo|\.cache|test-results|playwright-report)(\/|$)/;

export function zoneOf(path) {
    const top = path.split("/")[0];
    if (ZONES.includes(top)) return top;
    if (!path.includes("/") && ROOT_CONFIG.test(path)) return "root";
    return "other";
}

/** Parse scope: every zone file, every root config, and the floor records. */
export function inParseScope(path, floorRecords = FLOOR_RECORDS) {
    if (SKIP.test(path)) return false;
    const z = zoneOf(path);
    return z !== "other" || floorRecords.includes(path);
}

export function openTree(root = DEFAULT_ROOT, { overlay = {}, floorRecords } = {}) {
    root = resolve(root);
    const records = floorRecords ?? FLOOR_RECORDS.map((p) => p);
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
        records,
        parsed: files.filter((f) => inParseScope(f, records)),
        isFile: (p) => all.has(p),
        isDir: (p) => p === "" || p === "." || dirs.has(p),
        abs: (p) => join(root, p),
        rel: (abs) => relative(root, abs),
        exists: (p) => all.has(p) || dirs.has(p) || existsSync(join(root, p)),
    };
}
