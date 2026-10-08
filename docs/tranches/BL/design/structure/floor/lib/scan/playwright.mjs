// scan/playwright.mjs — a Playwright config's test program (P4-F5). `testDir` and
// `testMatch` (top level and per project) decide which spec files the runner collects; a
// spec moved out of that set silently stops running. Each pattern becomes one program
// reference: its head dir must exist, and every spec it matches is an edge from the config,
// so the move engine's image check refuses a move that drops a spec from the program.
// Playwright's rule: a pattern with no "/" matches at any depth under testDir; the default
// testMatch is every `*.spec.*` / `*.test.*` script. A non-literal testDir or a RegExp
// testMatch cannot be read statically and is an `opaque` reference (the graph fails closed).
//
// P6-F2 · the spec key. Playwright names a spec, in every report, by its path from the
// config's `rootDir`: the top-level testDir resolved against the config's dir (Playwright
// 1.61, `rootDir: pathResolve(configDir, userConfig.testDir) || configDir`; the JSON
// reporter writes `file: relative(config.rootDir, file)`). `playwrightProgram` gives that
// root and the program's specs, and the browser seat and FD-4's coverage arm key every
// spec by it: one key from the runner's report to the selection's bands to the file read.
import { posix } from "node:path";

export const PLAYWRIGHT_CONFIG = /(^|\/)playwright[^/]*\.config\.(ts|mts|js|mjs)$/;
const DEFAULT_MATCH = ["*.{spec,test}.{ts,tsx,mts,cts,js,jsx,mjs,cjs}"];
/** The browser seat's report schema. /2 keys results, bands and the selection by the spec's
 *  path from the config's testDir and records that dir (`testDir`); a /1 report keyed results
 *  by basename and is refused, never read. */
export const SEAT_REPORT = "browser-seat/2";

function readConfig(ts, file, code) {
    const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    let config = null;
    const visit = (n) => {
        if (config) return;
        if (ts.isCallExpression(n) && n.expression.getText(sf) === "defineConfig" && n.arguments[0] && ts.isObjectLiteralExpression(n.arguments[0])) config = n.arguments[0];
        else if (ts.isExportAssignment(n) && ts.isObjectLiteralExpression(n.expression)) config = n.expression;
        ts.forEachChild(n, visit);
    };
    visit(sf);
    const prop = (obj, name) => obj.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText(sf).replace(/["']/g, "") === name) ?? null;
    const strings = (p) => {
        if (!p) return { list: null };
        const v = p.initializer;
        if (ts.isStringLiteralLike(v)) return { list: [v.text] };
        if (ts.isArrayLiteralExpression(v) && v.elements.every((x) => ts.isStringLiteralLike(x))) return { list: v.elements.map((x) => x.text) };
        return { opaque: v };
    };
    return { sf, config, prop, strings };
}

export function scanPlaywright(ts, file, code) {
    const { sf, config, prop, strings } = readConfig(ts, file, code);
    const refs = [];
    if (!config) return { refs };
    const at = (n) => ({ start: n.getStart(sf), end: n.end });
    const program = (obj, inherited) => {
        const dirP = prop(obj, "testDir");
        const matchP = prop(obj, "testMatch");
        const dir = strings(dirP);
        const match = strings(matchP);
        for (const [p, v] of [[dirP, dir], [matchP, match]]) if (v.opaque) refs.push({ kind: "test-program", mode: "opaque", spec: v.opaque.getText(sf).slice(0, 120), ...at(p) });
        if (dir.opaque || match.opaque) return inherited;
        const testDir = dir.list?.[0] ?? inherited.testDir;
        const patterns = match.list ?? inherited.patterns;
        const site = matchP ?? dirP ?? obj;
        for (const m of patterns) {
            const spec = posix.join(testDir, m.includes("/") ? m : `**/${m}`);
            refs.push({ kind: "test-program", mode: "glob", spec: spec.startsWith(".") ? spec : `./${spec}`, ...at(site), spans: [], testProgram: true });
        }
        return { testDir, patterns };
    };
    const top = program(config, { testDir: ".", patterns: DEFAULT_MATCH });
    const projects = prop(config, "projects");
    if (projects && ts.isArrayLiteralExpression(projects.initializer)) {
        for (const p of projects.initializer.elements) {
            if (!ts.isObjectLiteralExpression(p)) continue;
            if (prop(p, "testDir") || prop(p, "testMatch")) program(p, top);
        }
    }
    // one reference per distinct pattern
    const seen = new Set();
    return { refs: refs.filter((r) => { const k = `${r.mode}|${r.spec}`; if (seen.has(k)) return false; seen.add(k); return true; }) };
}

/**
 * P6-F2 · the tree's Playwright program: its one config, its `rootDir` (repo-relative) and its
 * collected specs (F-1's `test-program` glob edges). `keyOf(path)` is a spec's key, its path
 * from rootDir, as Playwright reports it; `pathOf(key)` is the repo path a key names. Two
 * configs carrying a program, or a testDir that cannot be read statically, throw: a key is a
 * path from one root.
 */
export function playwrightProgram(g, ts) {
    const configs = [...new Set(g.edges.filter((e) => e.kind === "test-program").map((e) => e.from))];
    if (configs.length !== 1) throw new Error(`playwright: ${configs.length} config(s) carry a test program (${configs.join(", ") || "none"}); a spec key is a path from one config's testDir`);
    const [config] = configs;
    const { config: obj, prop, strings } = readConfig(ts, config, g.tree.read(config));
    const dir = strings(obj && prop(obj, "testDir"));
    if (!obj || dir.opaque) throw new Error(`playwright: ${config}'s testDir cannot be read statically; the spec key's root is unknown`);
    const rootDir = posix.normalize(posix.join(posix.dirname(config), dir.list?.[0] ?? "."));
    const specs = [...new Set(g.edges.filter((e) => e.kind === "test-program" && e.via === "glob" && e.to).map((e) => e.to))].sort();
    return { config, rootDir, specs, keyOf: (f) => posix.relative(rootDir, f), pathOf: (k) => posix.normalize(posix.join(rootDir, k)) };
}
