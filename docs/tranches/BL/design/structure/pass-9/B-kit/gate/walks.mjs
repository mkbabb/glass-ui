// walks.mjs — clause B0's walk arm (LAW §9, R-3; pass 5, B-S12): a directory listing outside
// the harness and the floor runtime. R-3: "a suite that scans source reads the resolved graph,
// never a directory walk". A walk is a call that lists a directory: `readdirSync`, `readdir`,
// `opendirSync`, `opendir`, `globSync`, `glob` (fs, fast-glob, tinyglobby; `import.meta.glob`
// is the bundler's collection, an F-1 `glob` edge, not a walk), `globby`, `globbySync`,
// `fastGlob`. It is read from the syntax, so a listing whose directory is computed at run time
// is seen as well as one whose directory is a literal. A directory named by a string
// (`files({ under: "src" })`, a vite alias, a prefix a filter compares against) is not a walk:
// only a listing call is. A listing run in a subprocess is a walk too: a child-process call
// (`execFileSync`, `execFile`, `spawnSync`, `spawn`, `execSync`, `exec`) whose command is
// `find`, `rg`, `fd` or `ls`, or `grep` with a recursive flag (`-r`, `-R`, `-rl`, …).

/** Every directory listing in the tree `T`, one line each: `{ file, line, call }`. */
export function directoryWalks(ts, T, { zones, zoneOf, exempt }) {
    const out = [];
    const SCRIPT = /\.(ts|mts|cts|js|mjs|cjs|vue)$/;
    const LISTERS = new Set(["readdirSync", "readdir", "opendirSync", "opendir", "globSync", "glob", "globby", "globbySync", "fastGlob"]);
    const SPAWNERS = new Set(["execFileSync", "execFile", "spawnSync", "spawn", "execSync", "exec"]);
    const LIST_COMMANDS = new Set(["find", "rg", "fd", "ls"]);
    const RECURSIVE = /^-[a-zA-Z]*[rR]/;
    for (const f of T.files) {
        if (!zones.includes(zoneOf(f)) || !SCRIPT.test(f) || /\.d\.[mc]?ts$/.test(f) || exempt(f)) continue;
        const text = T.read(f);
        if (text === null || text === undefined) throw new Error(`seal B0: ${f} is unreadable`);
        const blocks = f.endsWith(".vue") ? [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => ({ code: m[1], off: text.slice(0, m.index + m[0].indexOf(">") + 1).split("\n").length - 1 })) : [{ code: text, off: 0 }];
        for (const { code, off } of blocks) {
            const sf = ts.createSourceFile(f, code, ts.ScriptTarget.Latest, true);
            const visit = (n) => {
                if (ts.isCallExpression(n)) {
                    const e = n.expression;
                    const name = ts.isIdentifier(e) ? e.text : ts.isPropertyAccessExpression(e) ? e.name.text : null;
                    const onImportMeta = ts.isPropertyAccessExpression(e) && ts.isMetaProperty(e.expression);
                    if (name && LISTERS.has(name) && !onImportMeta) out.push({ file: f, line: sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1 + off, call: `${name}(${n.arguments[0]?.getText(sf).slice(0, 50) ?? ""})` });
                    if (name && SPAWNERS.has(name) && n.arguments[0] && ts.isStringLiteralLike(n.arguments[0])) {
                        const words = n.arguments[0].text.trim().split(/\s+/);
                        const cmd = words[0].split("/").pop();
                        const argv = n.arguments[1] && ts.isArrayLiteralExpression(n.arguments[1]) ? n.arguments[1].elements.filter(ts.isStringLiteralLike).map((x) => x.text) : [];
                        const flags = [...words.slice(1), ...argv];
                        if (LIST_COMMANDS.has(cmd) || (cmd === "grep" && flags.some((x) => RECURSIVE.test(x)))) out.push({ file: f, line: sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1 + off, call: `${name}(${n.arguments[0].getText(sf).slice(0, 50)})` });
                    }
                }
                ts.forEachChild(n, visit);
            };
            visit(sf);
        }
    }
    return out;
}
