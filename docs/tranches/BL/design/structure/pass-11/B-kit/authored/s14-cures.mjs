// authored/s14-cures.mjs — AUTHORED input to derive/edits.mjs (step S38, pass 5; S-14).
//
// Pass 4's B17 read two shapes and declared the rest unseen; the pass-4 critic planted the
// unseen ones and found two live (cB4 §4, S-35). The pass-5 gate reads every shape §P4-8.3
// names (LAW §10): the negative and positive missing-file guards, the ternary, the
// `try { read } catch { return x }`, `.then(ok, h)`, and a load through a loader bound to a
// name. On the tree after S37 it names nine sites, and each is cured at its cause: the guard
// or the handler leaves and the read or the load fails loud on its own error.
//   - demo/router.ts: the chunk pre-resolve swallowed a failed route chunk (a loader bound
//     to a name, `c`). A failed chunk now rejects the navigation, which the router reports.
//   - scripts/profile-bundle.mjs: the /styles draw kept an `@import` line as text when its
//     target was missing (the ternary). It also resolved one level only, so a CSS door
//     (`styles/theme/index.css` importing its partials, LAW §6) was measured as its import
//     lines. The draw now inlines the whole relative-import closure, each sheet once, and a
//     named sheet missing from dist fails the read.
//   - scripts/verify-export-types.mjs: MIGRATION.md read as empty when absent, so the roster
//     ratchet would call every removal unnamed for the wrong reason. It is read.
//   - tests-visual/paint/reflect-capture-verify.mjs: the PNG readers returned null for a
//     missing capture, the same null as "not a PNG". A missing capture now throws; a file
//     that is not a PNG still reads null (the predicate's answer).
//   - tests/demo/page-chrome-shrink.test.ts, tests/styles/layout-canon.test.ts,
//     tests/styles/focus-veil.test.ts, tests/gates/overfit-structure.test.ts: a subject
//     read as "" when absent. A missing subject now fails the suite with the read's error,
//     which is a failure, not an empty pass.

export const why = "S-14 (LAW §10, pass 5): the nine masking fallbacks the widened B17 names on the tree, each cured at its cause; a missing file or a failed load fails loud";

export const edits = [
    {
        file: "demo/router.ts",
        why: "a loader bound to a name: a failed route chunk rejects the navigation instead of resolving to nothing",
        from: "    await Promise.all(comps.map((c) => c().catch(() => undefined)));",
        to: "    await Promise.all(comps.map((c) => c()));",
    },
    {
        file: "scripts/profile-bundle.mjs",
        why: "the ternary fallback leaves; the draw reads the whole @import closure (CSS doors nest), and a missing sheet fails the read",
        from: `    const indexPath = resolve(stylesDir, "index.css");
    let css = readFileSync(indexPath, "utf-8");
    // One-level resolve: ./*.css siblings + ../glass-ui.css both resolve under stylesDir.
    css = css.replace(/@import\\s+["']([^"']+\\.css)["'];?/g, (m, ref) => {
        const target = resolve(stylesDir, ref);
        return existsSync(target) ? \`\\n\${readFileSync(target, "utf-8")}\\n\` : m;
    });
    return`,
        to: `    // Every relative \`@import\` is inlined, recursively and each sheet once: a CSS door
    // (\`theme/index.css\`) imports its partials, so the draw is the whole closure. A sheet an
    // import names that is not in dist fails the read.
    const seen = new Set();
    const inline = (file) => {
        if (seen.has(file)) return "";
        seen.add(file);
        return readFileSync(file, "utf-8").replace(/@import\\s+["']([^"']+\\.css)["'];?/g, (_m, ref) => \`\\n\${inline(resolve(dirname(file), ref))}\\n\`);
    };
    const css = inline(resolve(stylesDir, "index.css"));
    return`,
    },
    {
        file: "scripts/verify-export-types.mjs",
        why: "the ratchet reads MIGRATION.md; an absent one fails the read instead of naming every removal unnamed",
        from: `    const migration = existsSync(migrationPath) ? readFileSync(migrationPath, "utf8") : "";`,
        to: `    const migration = readFileSync(migrationPath, "utf8");`,
    },
    {
        file: "tests-visual/paint/reflect-capture-verify.mjs",
        why: "a missing capture fails the read; only a file that is not a PNG reads null",
        from: `export function pngDimensions(path) {
    try {
        const bytes = readFileSync(path);
        if (bytes.length < 24 || bytes.subarray(12, 16).toString("ascii") !== "IHDR") return null;
        return { w: bytes.readUInt32BE(16), h: bytes.readUInt32BE(20) };
    } catch {
        return null;
    }
}`,
        to: `export function pngDimensions(path) {
    const bytes = readFileSync(path);
    if (bytes.length < 24 || bytes.subarray(12, 16).toString("ascii") !== "IHDR") return null;
    return { w: bytes.readUInt32BE(16), h: bytes.readUInt32BE(20) };
}`,
    },
    {
        file: "tests-visual/paint/reflect-capture-verify.mjs",
        why: "a missing capture fails the read; only a file that is not a PNG reads null",
        from: `    let fd;
    try {
        fd = readFileSync(absPath);
    } catch {
        return null;
    }
`,
        to: `    const fd = readFileSync(absPath);
`,
    },
    {
        file: "tests/demo/page-chrome-shrink.test.ts",
        why: "a missing subject fails the read, loud, instead of reading as empty",
        from: `const read = (rel: string): string => {
    try {
        return readFileSync(join(process.cwd(), rel), "utf8");
    } catch {
        return "";
    }
};`,
        to: `const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");`,
    },
    {
        file: "tests/styles/layout-canon.test.ts",
        why: "a missing sheet fails the read, loud: the suite fails on the read's error rather than passing on empty text",
        from: `/**
 * A missing sheet is a MISSING LAW, not a broken harness. Reading it as empty is
 * what lets each case name the law it could not find; an unguarded \`readFileSync\`
 * throws at module load and the whole file reports "0 tests", which is the least
 * informative possible answer to "is the layout canon on disk". It is also what
 * makes the born-RED run legible: at the pre-cut bytes \`demo/chassis/layout.css\`
 * does not exist, and every measure/ladder case has to say so out loud.
 */
const read = (rel: string): string => {
    try {
        return readFileSync(join(process.cwd(), rel), "utf8");
    } catch {
        return "";
    }
};`,
        to: `/** A missing sheet is a missing law: its read fails, and the suite fails with it. */
const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");`,
    },
    {
        file: "tests/styles/focus-veil.test.ts",
        why: "the subject is read; a missing primitive fails the suite on the read's error",
        from: `// The subject file is read TOLERANTLY on purpose. A module-level throw would make the
// whole suite fail to load, and a suite that cannot load reports ZERO tests — ABSENT
// under the ⊕²⁵ status vocabulary, which is precisely the reading this register refuses
// to accept as a gate result. Reading an absent primitive as empty content makes every
// arm below RED on its own terms, which is what "born-RED" has to mean to be evidence.
const VEIL_PATH = "src/styles/glass/focus-veil.css";
const veil = existsSync(join(process.cwd(), VEIL_PATH))
    ? stripComments(read(VEIL_PATH))
    : "";`,
        to: `// The subject file is read, not probed: an absent primitive fails the suite with the
// read's error, which is a failure, never an empty pass.
const VEIL_PATH = "src/styles/glass/focus-veil.css";
const veil = stripComments(read(VEIL_PATH));`,
    },
    {
        file: "tests/gates/overfit-structure.test.ts",
        why: "a file the census names is read; an absent one fails the read",
        from: `    text.get(f) ?? (existsSync(f) ? readFileSync(f, "utf8") : "");`,
        to: `    text.get(f) ?? readFileSync(f, "utf8");`,
    },
];
