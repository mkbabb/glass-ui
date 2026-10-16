// authored/p6-s14-cures.mjs — AUTHORED input to derive/edits.mjs (step S60; LAW §10, S-14,
// pass 6). The pass-6 B17 reads a read through any reader the tree defines, the conditional
// read and the conditional collect; on the rebased tree it names four live sites, each cured
// at its cause here. A primary works or fails loud.

export const why = "S-14 (LAW §10, pass 6): the four masking fallbacks the widened B17 names on the tree, each cured at its cause: the SFC bundle fold and the utility scan read the SFC bundle unconditionally (a missing bundle fails the build), Tailwind's theme is read unconditionally (a dependency the build already resolved), and the code highlighter's chunk load rejects loudly instead of returning";

export const edits = [
    {
        file: "vite.style-fold.ts",
        why: "the fold reads the staged index.css and the SFC bundle unconditionally: a build that did not write either fails here, instead of shipping ./styles without the component CSS",
        from: `    if (existsSync(distIndex) && existsSync(sfcBundle)) {
        const indexSrc = readFileSync(distIndex, "utf-8");
        const sfcImport = '@import "../glass-ui.css";';
        if (!indexSrc.includes(sfcImport)) {
            const sourceAt = terminalImportIndex(indexSrc, distStyles, root);
            const folded =
                \`\${indexSrc.slice(0, sourceAt)}/* AN.W1 — SFC scoped component CSS (folded so a single\\n   @import "@mkbabb/glass-ui/styles" carries cascade + components) */\\n\${sfcImport}\\n\\n\${indexSrc.slice(sourceAt)}\`;
            writeFileSync(distIndex, folded, "utf-8");
        }
    }
}`,
        to: `    // Both are build outputs this fold requires: a missing one is a broken build, never a
    // fold to skip (the index read below fails on its own).
    if (!existsSync(sfcBundle)) throw new Error(\`style-fold: the SFC bundle \${sfcBundle} was not built; ./styles would ship without the component CSS\`);
    const indexSrc = readFileSync(distIndex, "utf-8");
    const sfcImport = '@import "../glass-ui.css";';
    if (!indexSrc.includes(sfcImport)) {
        const sourceAt = terminalImportIndex(indexSrc, distStyles, root);
        const folded =
            \`\${indexSrc.slice(0, sourceAt)}/* AN.W1 — SFC scoped component CSS (folded so a single\\n   @import "@mkbabb/glass-ui/styles" carries cascade + components) */\\n\${sfcImport}\\n\\n\${indexSrc.slice(sourceAt)}\`;
        writeFileSync(distIndex, folded, "utf-8");
    }
}`,
    },
    {
        file: "vite.utility-emit.ts",
        why: "the SFC bundle is always scanned: a missing bundle fails the read below instead of dropping its classes from the utility scan",
        from: `    const sfcBundle = resolve(dist, "glass-ui.css");
    if (existsSync(sfcBundle)) scanPaths.push(sfcBundle);`,
        to: `    scanPaths.push(resolve(dist, "glass-ui.css"));`,
    },
    {
        file: "vite.utility-emit.ts",
        why: "Tailwind's theme.css is read unconditionally: the build resolved the package above, so a missing theme is a broken install and fails",
        from: `    if (existsSync(twThemePath)) {
        const twTheme = postcss.parse(readFileSync(twThemePath, "utf-8"));
        twTheme.walkAtRules("theme", (atRule) => {
            atRule.walkDecls((decl) => {
                if (decl.prop.startsWith("--")) {
                    themeOwned.set(decl.prop, decl.value);
                }
            });
        });
        // Tailwind pairs each \`--animate-*\` token with the \`@keyframes\` it names,
        // nested in the same \`@theme\` block. The token alone is inert.
        twTheme.walkAtRules("keyframes", (atRule) => {
            twKeyframes.set(atRule.params.trim(), atRule);
        });
    }`,
        to: `    const twTheme = postcss.parse(readFileSync(twThemePath, "utf-8"));
    twTheme.walkAtRules("theme", (atRule) => {
        atRule.walkDecls((decl) => {
            if (decl.prop.startsWith("--")) {
                themeOwned.set(decl.prop, decl.value);
            }
        });
    });
    // Tailwind pairs each \`--animate-*\` token with the \`@keyframes\` it names,
    // nested in the same \`@theme\` block. The token alone is inert.
    twTheme.walkAtRules("keyframes", (atRule) => {
        twKeyframes.set(atRule.params.trim(), atRule);
    });`,
    },
    {
        file: "vite.utility-emit.ts",
        why: "existsSync has no reader left in this file",
        from: `import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";`,
        to: `import { readdirSync, readFileSync, writeFileSync } from "node:fs";`,
    },
    {
        file: "demo/chassis/code/useCodeHighlight.ts",
        why: "the highlighter chunk's load is not swallowed: a failed load rejects highlight() and surfaces through Vue's error handling, while the raw text Vue already painted stays (the text is the primary, the colour is the enhancement)",
        from: `        // Best-effort COLOR: a failed chunk (offline, missing dep) leaves the raw
        // fira-code text Vue already painted — legible mono, never a blank box
        // (no-masking-fallback). The primary is the text; color is the enhancement.
        let hljs: Hljs;
        try {
            hljs = await loadHljs();
        } catch {
            return;
        }
`,
        to: `        // The raw fira-code text is already painted; colour is the enhancement. A failed
        // chunk load (offline, missing dep) rejects here and surfaces through Vue's error
        // handling: the text stays legible and the failure is reported, never swallowed.
        const hljs = await loadHljs();
`,
    },
];
