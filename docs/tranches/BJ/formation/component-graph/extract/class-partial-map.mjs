// class-partial-map.mjs — build the {class → [partial]} resolution table once by
// grepping every CSS partial for its top-level class selectors. Deterministic;
// cached to class-partial-map.json beside this module.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { REPO_ROOT, relRepo, csort } from "./util.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname);

/** Recursively list *.css under a dir. */
function listCss(dir) {
    const out = [];
    for (const e of readdirSync(dir)) {
        const p = path.join(dir, e);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...listCss(p));
        else if (e.endsWith(".css")) out.push(p);
    }
    return out;
}

/** Extract class selector names (`.foo-bar`) defined in a CSS file. */
function classSelectorsIn(code) {
    const names = new Set();
    // strip comments to avoid picking up commented selectors
    const clean = code.replace(/\/\*[\s\S]*?\*\//g, "");
    const re = /\.(-?[A-Za-z_][\w-]*)/g;
    let m;
    while ((m = re.exec(clean))) names.add(m[1]);
    return names;
}

/**
 * Build the class→partial map from all CSS under src/styles and component-local
 * CSS. Returns { map: {class: [repoRelPartial,...]}, partials: [repoRelPartial],
 * importedByRoot: {repoRelPartial: bool} }.
 */
export function buildClassPartialMap({ cache = true } = {}) {
    const stylesDir = path.join(REPO_ROOT, "src/styles");
    const compDir = path.join(REPO_ROOT, "src/components");
    const cssFiles = [
        ...listCss(stylesDir),
        ...listCss(compDir).filter((p) => p.endsWith(".css")),
    ];
    const map = {};
    for (const f of cssFiles) {
        const rel = relRepo(f);
        const code = readFileSync(f, "utf8");
        for (const cls of classSelectorsIn(code)) {
            (map[cls] ||= []).push(rel);
        }
    }
    for (const k of Object.keys(map)) map[k] = csort([...new Set(map[k])]);

    const importedByRoot = computeImportedByRoot();

    const result = {
        map,
        partials: csort(cssFiles.map(relRepo)),
        importedByRoot,
    };
    if (cache) {
        writeFileSync(
            path.join(HERE, "class-partial-map.json"),
            JSON.stringify(result, null, 1) + "\n",
        );
    }
    return result;
}

/**
 * Compute, for every CSS partial, whether it is reachable via the @import
 * cascade rooted at src/styles/index.css. Un-reachable partials (glass-atom.css,
 * glass-chip.css) get false — the orphan seed (§3c.6-5).
 */
export function computeImportedByRoot() {
    const stylesDir = path.join(REPO_ROOT, "src/styles");
    const compDir = path.join(REPO_ROOT, "src/components");
    const all = [
        ...listCss(stylesDir),
        ...listCss(compDir).filter((p) => p.endsWith(".css")),
    ];
    const importRe = /@import\s+["']([^"']+)["']/g;
    const edges = new Map(); // abs → [abs targets]
    for (const f of all) {
        const code = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
        const targets = [];
        let m;
        importRe.lastIndex = 0;
        while ((m = importRe.exec(code))) {
            const spec = m[1];
            if (!spec.startsWith(".")) continue;
            const abs = path.resolve(path.dirname(f), spec);
            targets.push(abs);
        }
        edges.set(f, targets);
    }
    // BFS from index.css
    const root = path.join(stylesDir, "index.css");
    const reached = new Set([root]);
    const queue = [root];
    while (queue.length) {
        const cur = queue.shift();
        for (const t of edges.get(cur) || []) {
            if (!reached.has(t)) {
                reached.add(t);
                queue.push(t);
            }
        }
    }
    const out = {};
    for (const f of all) out[relRepo(f)] = reached.has(f);
    return out;
}
