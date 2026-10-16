// authored/no-masking.mjs — AUTHORED input to derive/edits.mjs (step S34, pass 4; S-14).
//
// The edict bans masking fallbacks: a primary works, or it fails loud. B17 reads two forms
// from the syntax (LAW §10), and on the tree after S33 it names 16 sites. Each is cured at its
// cause, never exempted:
//   - a guard that returns as if a missing file were empty (`if (!existsSync(p)) return …`)
//     leaves, and the read that follows fails on the missing file with the platform's own
//     error. This includes `vite.utility-emit.ts`'s theme guard (cB O-2: after the theme move
//     it would have skipped the component-utility emit silently had the path been wrong);
//   - the accent-tone solve leaf's load is no longer swallowed (`import(…).catch(() => null)`):
//     the leaf is library code, so a failed load rejects. A THROWING solve still settles to
//     the CSS fallback ink with one warning; that is a computation the component documents,
//     not a load. Its test now asserts the failure surfaces, instead of that it stays quiet.
// One guarded site was not a mask: `profile-bundle.mjs`'s styles draw returned null for an
// absent index, and its caller reports that null as a MISSING budget row. The guard still
// leaves; the caller reads presence from the walked dist listing, as its JS arm does.
// Two sites a guard alone does not describe are cured the same way: `surfaceHash` is called
// only after `freshnessVerdict` has reported a missing surface path as `stale`, and
// `copyFilter` is called by `cpSync` only for entries that exist.

export const why = "S-14: no masking fallback. 15 missing-file guards that returned as if the file were empty leave (the read fails loud), and the accent-tone solve leaf's load is no longer swallowed; its test asserts the failure surfaces";

const drop = (file, from, why) => ({ file, from, to: "", why });

export const edits = [
    drop("vite.utility-emit.ts", "    if (!existsSync(dist) || !existsSync(themePath)) return;\n", "cB O-2: the emit reads the dist and the theme; a wrong path fails the build instead of skipping the emit"),
    drop("vite.utility-emit.ts", "    if (!existsSync(distIndex)) return;\n", "the dist index is read next; a missing one fails the build"),
    { file: "vite.style-fold.ts", from: "    if (!existsSync(root)) return [];\n    return readdirSync(root, { recursive: true })", to: "    return readdirSync(root, { recursive: true })", why: "the walked root is read next; a missing one fails the build" },
    drop("vite.style-fold.ts", "        if (!existsSync(source)) return false;\n", "cpSync calls the filter only for entries that exist"),
    { file: "vite.style-fold.ts", from: "        if (!existsSync(root)) return [];\n        if (statSync(root).isFile())", to: "        if (statSync(root).isFile())", why: "a CSS root the build names is read next; a missing one fails the build" },
    {
        file: "vite.style-fold.ts",
        why: "a font URL a declaration names is inlined or the build fails. The guard hid a second defect: the text regex also matched the documented form in src/styles/fonts.css's comment (`<family>/<face>.woff2`), so the rewrite reads declarations only (postcss, already the fold's parser)",
        from: "    for (const path of cssFilesUnder(...cssRoots)) {\n        const src = readFileSync(path, \"utf-8\");\n        let touched = false;\n        const rewritten = src.replace(urlRe, (_match, rel: string) => {\n            const fontPath = resolve(srcFonts, rel);\n            if (!existsSync(fontPath)) return _match;\n            const buf = readFileSync(fontPath);\n            const b64 = buf.toString(\"base64\");\n            touched = true;\n            return `url(\"data:font/woff2;base64,${b64}\")`;\n        });\n        if (touched) writeFileSync(path, rewritten, \"utf-8\");\n    }",
        to: "    for (const path of cssFilesUnder(...cssRoots)) {\n        // A reference is a declaration's url(); the same text in a comment documents the\n        // form and is not a font the sheet loads.\n        const sheet = postcss.parse(readFileSync(path, \"utf-8\"));\n        let touched = false;\n        sheet.walkDecls((decl) => {\n            const value = decl.value.replace(urlRe, (_match, rel: string) => {\n                touched = true;\n                return `url(\"data:font/woff2;base64,${readFileSync(resolve(srcFonts, rel)).toString(\"base64\")}\")`;\n            });\n            if (value !== decl.value) decl.value = value;\n        });\n        if (touched) writeFileSync(path, sheet.toString(), \"utf-8\");\n    }",
    },
    drop("scripts/profile-bundle.mjs", "    if (!existsSync(indexPath)) return null;\n", "the styles draw reads the dist index it is handed; whether the index exists is the caller's question (next edit)"),
    {
        file: "scripts/profile-bundle.mjs",
        why: "the absent styles index was never masked: its null reaches the budget report as a MISSING row (fail-closed under --enforce). The caller now reads presence from the walked dist listing, as the JS arm does, so the draw needs no guard and the MISSING row stands",
        from: "            ? combinedStylesDraw(distRoot)\n            : files.find((f) => f.file === path);",
        to: "            ? files.some((f) => f.file === path) ? combinedStylesDraw(distRoot) : null\n            : files.find((f) => f.file === path);",
    },
    { file: "scripts/profile-bundle.mjs", from: "function walk(dir) {\n    if (!existsSync(dir)) return [];\n", to: "function walk(dir) {\n", why: "the walked dist is read next; a missing one fails the run" },
    drop("scripts/verify-export-types.mjs", "    if (!existsSync(directory)) return [];\n", "the listed artifact is read next; a missing one fails the check"),
    drop("tests-visual/paint/reflect-capture-verify.mjs", "        if (!existsSync(absolute)) return \"\";\n", "freshnessVerdict reports a missing surface path as stale before it hashes"),
    drop("tests/gates/feedback-tint-seam.test.ts", "    if (!existsSync(dir)) return out;\n", "the gate walks src; a missing dir fails the gate instead of passing it empty"),
    { file: "tests/gates/feedback-tint-seam.test.ts", from: 'import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";', to: 'import { readFileSync, readdirSync, statSync } from "node:fs";', why: "the guard was its one existsSync" },
    { file: "vite.style-fold.ts", from: "        if (!path || visitingScripts.has(path) || !existsSync(path)) return;\n", to: "        if (!path || visitingScripts.has(path)) return;\n", why: "every visited script is an entry source (the record validates it) or a resolved reference (a dangling one throws above); a missing one fails the build" },
    {
        file: "tests/styles/typed-track-seam.test.ts",
        why: "a gate that returns green without its evidence masks; the suite runs on a built dist (the floor gates read it too), so a missing or stale manifest fails the row",
        from: "        if (!existsSync(manifest) || statSync(manifest).mtimeMs < statSync(generator).mtimeMs) {\n            /* dist is a build artifact, and it is only evidence when it is NEWER than\n               the generator that writes it — a stale manifest describes a tree that no\n               longer exists and would false-RED (or, worse, false-GREEN) this row. The\n               generator itself is fail-closed on missing targets, and the\n               installed-tarball fixture is the routed §4.2 arm. */\n            return;\n        }\n",
        to: "        /* dist is a build artifact, and it is only evidence when it is NEWER than the\n           generator that writes it — a stale manifest describes a tree that no longer\n           exists. A missing or stale one fails the row: build first. */\n        expect(existsSync(manifest), \"dist/component-styles.css is absent: build first\").toBe(true);\n        expect(statSync(manifest).mtimeMs >= statSync(generator).mtimeMs, \"dist/component-styles.css is older than its generator: rebuild\").toBe(true);\n",
    },
    {
        file: "tests/styles/typed-track-seam.test.ts",
        why: "as above: the layer-order row reads a built, fresh manifest or fails",
        from: "        if (!existsSync(manifest) || statSync(manifest).mtimeMs < statSync(generator).mtimeMs) return;\n",
        to: "        expect(existsSync(manifest), \"dist/component-styles.css is absent: build first\").toBe(true);\n        expect(statSync(manifest).mtimeMs >= statSync(generator).mtimeMs, \"dist/component-styles.css is older than its generator: rebuild\").toBe(true);\n",
    },
    drop("tests/gates/overfit-structure.test.ts", "    if (!existsSync(dir)) return out;\n", "the census walks src; a missing dir fails the census instead of passing it empty"),
    // ---- the accent-tone solve leaf's load
    {
        file: "src/composables/color/useAccentTone.ts",
        why: "S-14: the solve leaf is library code; its load is not swallowed",
        from: "let accentToneLoader: Promise<AccentToneSolveModule | null> | undefined;",
        to: "let accentToneLoader: Promise<AccentToneSolveModule> | undefined;",
    },
    {
        file: "src/composables/color/useAccentTone.ts",
        why: "S-14: the solve leaf is library code; its load is not swallowed",
        from: "function loadAccentToneSolve(): Promise<AccentToneSolveModule | null> {\n    return (accentToneLoader ??= import(\"./accent-tone-solve\").catch(() => null));\n}",
        to: "function loadAccentToneSolve(): Promise<AccentToneSolveModule> {\n    return (accentToneLoader ??= import(\"./accent-tone-solve\"));\n}",
    },
    {
        file: "src/composables/color/useAccentTone.ts",
        why: "S-14: a failed load rejects; only a throwing solve settles to the documented CSS fallback ink",
        from: "        // Both an ABSENT optional value.js leaf and a THROWING solve settle to\n        // the same terminal, process-local `absent`: the documented degradation\n        // is the CSS `var(--accent-ink-resolved, var(--foreground))` fallback,\n        // so the failure is warned once and never re-thrown from a render.\n        void loadAccentToneSolve().then((module) => {\n            if (!module) {\n                settleCacheKey(key, { state: \"absent\" });\n                return;\n            }\n            try {",
        to: "        // A THROWING solve settles to the terminal, process-local `absent`: the\n        // documented degradation is the CSS `var(--accent-ink-resolved,\n        // var(--foreground))` ink, warned once and never re-thrown from a render.\n        // The solve leaf's LOAD is not absorbed: the leaf is library code, so a\n        // failed load rejects (no masking fallback).\n        void loadAccentToneSolve().then((module) => {\n            try {",
    },
    {
        file: "tests/composables/color/use-accent-tone.test.ts",
        why: "S-14: the test asserts the failure surfaces, where it asserted the failure stayed quiet",
        from: "    it(\"quietly caches a rejected lazy module for every same-key consumer\", async () => {",
        to: "    it(\"surfaces a failed load of the solve leaf, loaded once, and never paints a solved ink\", async () => {",
    },
    {
        file: "tests/composables/color/use-accent-tone.test.ts",
        why: "S-14: the planted load failure is named as what it is",
        from: "                throw new Error(\"controlled optional module absence\");",
        to: "                throw new Error(\"controlled load failure\");",
    },
    {
        file: "tests/composables/color/use-accent-tone.test.ts",
        why: "S-14: every rejection the consumers' chains leave is the planted load failure, and there is at least one",
        from: "            expect(solveLoads).toBe(1);\n            expect(unhandled).toEqual([]);",
        to: "            expect(solveLoads).toBe(1);\n            await vi.waitFor(() => expect(unhandled.length).toBeGreaterThan(0));\n            // vitest wraps a throwing mock factory; the planted failure is the wrapper's cause\n            const chain = (reason: unknown): string => {\n                const parts: string[] = [];\n                for (let e = reason; e; e = (e as { cause?: unknown }).cause) parts.push(String(e));\n                return parts.join(\" <- \");\n            };\n            for (const reason of unhandled) expect(chain(reason)).toContain(\"controlled load failure\");",
    },
];
