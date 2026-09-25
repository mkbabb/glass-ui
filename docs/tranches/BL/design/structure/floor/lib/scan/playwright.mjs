// scan/playwright.mjs — a Playwright config's test program (P4-F5). `testDir` and
// `testMatch` (top level and per project) decide which spec files the runner collects; a
// spec moved out of that set silently stops running. Each pattern becomes one program
// reference: its head dir must exist, and every spec it matches is an edge from the config,
// so the move engine's image check refuses a move that drops a spec from the program.
// Playwright's rule: a pattern with no "/" matches at any depth under testDir; the default
// testMatch is every `*.spec.*` / `*.test.*` script. A non-literal testDir or a RegExp
// testMatch cannot be read statically and is an `opaque` reference (the graph fails closed).
import { posix } from "node:path";

export const PLAYWRIGHT_CONFIG = /(^|\/)playwright[^/]*\.config\.(ts|mts|js|mjs)$/;
const DEFAULT_MATCH = ["*.{spec,test}.{ts,tsx,mts,cts,js,jsx,mjs,cjs}"];

export function scanPlaywright(ts, file, code) {
    const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    let config = null;
    const visit = (n) => {
        if (config) return;
        if (ts.isCallExpression(n) && n.expression.getText(sf) === "defineConfig" && n.arguments[0] && ts.isObjectLiteralExpression(n.arguments[0])) config = n.arguments[0];
        else if (ts.isExportAssignment(n) && ts.isObjectLiteralExpression(n.expression)) config = n.expression;
        ts.forEachChild(n, visit);
    };
    visit(sf);
    const refs = [];
    if (!config) return { refs };
    const prop = (obj, name) => obj.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText(sf).replace(/["']/g, "") === name) ?? null;
    const at = (n) => ({ start: n.getStart(sf), end: n.end });
    const strings = (p) => {
        if (!p) return { list: null };
        const v = p.initializer;
        if (ts.isStringLiteralLike(v)) return { list: [v.text] };
        if (ts.isArrayLiteralExpression(v) && v.elements.every((x) => ts.isStringLiteralLike(x))) return { list: v.elements.map((x) => x.text) };
        return { opaque: v };
    };
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
