// authored/test-edits.mjs — AUTHORED input to derive/edits.mjs (step B-S6, LAW §9).
//
// The fifteen layout pins the migration reds. Each is an exact-text edit (one match, or
// every match when `all`), and each keeps the pin's intent while it stops naming a
// remembered path or a remembered door. R-3: a suite that scans source reads the resolved
// graph, so the one new helper is `cssOrder` in tests/harness/source.ts, the flattened
// `@import` order under an entry. A pin that said "the aggregate imports X" or "X is
// imported after Y" now reads that order and holds whichever door holds the sheet.
// No assertion is dropped; three arms get stronger (sortable, dock band, orphan gate).

const HARNESS_TAIL = `    return edgeSet.filter((e) => (!from || e.from === from) && (!to || e.to === to) && (!kind || e.kind === kind));
}
`;

export const why = "B-S6: the layout pins the migration reds, re-read through the resolved graph (R-3), intent kept";

export const edits = [
    // ── the harness ──────────────────────────────────────────────────────────────────────
    {
        file: "tests/harness/source.ts",
        why: "R-3: the flattened @import order, so a cascade pin holds whichever door holds a sheet",
        from: HARNESS_TAIL,
        to: `${HARNESS_TAIL}
/** The sheets under a CSS entry in cascade order: each \`@import\` read by F-1's CSS scanner,
 *  walked in document order, an imported sheet before its importer's own rules, each sheet
 *  once (the CSS plane alone, so a suite pays no whole-graph build). A pin that says "the
 *  aggregate carries X" or "X is imported after Y" reads this, never an \`@import\` line. */
export function cssOrder(entry: string): string[] {
    const out: string[] = [];
    const seen = new Set<string>();
    const visit = (file: string): void => {
        if (seen.has(file)) return;
        seen.add(file);
        const { refs } = scanCss(postcss, file, read(file), 0) as { refs: Array<{ kind: string; spec: string }> };
        for (const r of refs) if (r.kind === "css-import" && r.spec.startsWith(".")) visit(posix.normalize(posix.join(posix.dirname(file), r.spec)));
        out.push(file);
    };
    visit(entry);
    return out;
}
`,
    },
    {
        file: "tests/harness/source.ts",
        why: "the CSS plane reader and its parser",
        from: `import { resolve } from "node:path";\n`,
        to: `import { posix, resolve } from "node:path";\nimport postcss from "postcss";\n`,
    },
    {
        file: "tests/harness/source.ts",
        why: "F-1's CSS scanner, the same reader the graph uses",
        from: `import { buildGraph } from "../../scripts/structure/lib/graph.mjs";\n`,
        to: `import { buildGraph } from "../../scripts/structure/lib/graph.mjs";\n// @ts-ignore — the floor's CSS scanner is an untyped ESM leaf.\nimport { scanCss } from "../../scripts/structure/lib/css.mjs";\n`,
    },

    // ── cascade-order and membership pins ───────────────────────────────────────────────
    {
        file: "tests/styles/dissolve.test.ts",
        why: "import the harness order",
        from: `import { describe, expect, it } from "vitest";\n`,
        to: `import { describe, expect, it } from "vitest";\nimport { cssOrder } from "../harness/source";\n`,
    },
    {
        file: "tests/styles/dissolve.test.ts",
        why: "reveal and dissolve now sit behind glass/transitions/index.css; the pin is their order in the shipped cascade",
        from: `        const reveal = GLASS_CSS.indexOf('@import "./transitions/reveal.css"');
        const dissolve = GLASS_CSS.indexOf('@import "./transitions/dissolve.css"');
`,
        to: `        const order = cssOrder("src/styles/index.css");
        const reveal = order.indexOf("src/styles/glass/transitions/reveal.css");
        const dissolve = order.indexOf("src/styles/glass/transitions/dissolve.css");
`,
    },
    {
        file: "tests/styles/dissolve.test.ts",
        why: "GLASS_CSS has no reader left",
        from: `const GLASS_CSS = readStyle("glass/index.css");\n`,
        to: "",
    },
    {
        file: "tests/styles/dissolve.test.ts",
        why: "the closed BJ register names the sheet by its old path; the row is found by the selector it authorizes (the next line already pins it), the digest check below still binds it to this carve",
        from: `line.includes("glass/transitions/dissolve.css"),`,
        to: `line.includes('.glass-vaporize[data-state="closed"]'),`,
    },
    {
        file: "tests/styles/mark-register.test.ts",
        why: "import the harness order",
        from: `import { describe, expect, it } from "vitest";\n`,
        to: `import { describe, expect, it } from "vitest";\nimport { cssOrder } from "../harness/source";\n`,
    },
    {
        file: "tests/styles/mark-register.test.ts",
        why: "mark.css joins the glass cascade through glass/shapes/index.css",
        from: `expect(read(GLASS_CSS)).toContain('@import "./shapes/mark.css";');`,
        to: `expect(cssOrder(GLASS_CSS)).toContain("src/styles/glass/shapes/mark.css");`,
    },
    {
        file: "tests/components/field/forms-seam.test.ts",
        why: "import the harness order",
        from: `import { describe, expect, it } from "vitest";\n`,
        to: `import { describe, expect, it } from "vitest";\nimport { cssOrder } from "../../harness/source";\n`,
    },
    {
        file: "tests/components/field/forms-seam.test.ts",
        why: "control-edge.css joins the glass cascade through glass/surfaces/index.css",
        from: `        expect(read("src/styles/glass/index.css")).toContain(
            '@import "./surfaces/control-edge.css";',
        );
`,
        to: `        expect(cssOrder("src/styles/glass/index.css")).toContain(
            "src/styles/glass/surfaces/control-edge.css",
        );
`,
    },
    {
        file: "tests/styles/feedback-motion.test.ts",
        why: "import the harness order",
        from: `import { describe, expect, it } from "vitest";\n`,
        to: `import { describe, expect, it } from "vitest";\nimport { cssOrder } from "../harness/source";\n`,
    },
    {
        file: "tests/styles/feedback-motion.test.ts",
        why: "dot-ring.css joins the shipped stylesheet through the _shared/feedback door",
        from: `        expect(STYLE_ENTRY).toContain(
            '@import "../components/_shared/feedback/dot-ring.css";',
        );
`,
        to: `        expect(cssOrder("src/styles/index.css")).toContain(
            "src/components/_shared/feedback/dot-ring.css",
        );
`,
    },

    // ── remembered paths ────────────────────────────────────────────────────────────────
    {
        file: "tests/styles/proportion-register.test.ts",
        why: "sizing.css is a leaf of the tokens/sizing module",
        from: `"src/styles/tokens/sizing.css: @media (max-width: 768px)"`,
        to: `"src/styles/tokens/sizing/sizing.css: @media (max-width: 768px)"`,
    },
    {
        file: "tests/styles/typed-track-seam.test.ts",
        why: "the generator emits each register at its dist path: track-well in styles/surface, the glass registers in styles/glass/shapes",
        from: `        expect(order).toContain("./styles/track-well.css");
        expect(order).toContain("./styles/glass/track-flow.css");
        expect(order).toContain("./styles/glass/value-marks.css");
`,
        to: `        expect(order).toContain("./styles/surface/track-well.css");
        expect(order).toContain("./styles/glass/shapes/track-flow.css");
        expect(order).toContain("./styles/glass/shapes/value-marks.css");
`,
    },
    {
        file: "tests/components/custom/blob/gl-excise.test.ts",
        why: "the webgl arm gained a door (LAW §5); it re-exports the program builder and dies with the arm",
        from: `            "src/components/blob/renderer/webgl/buildMetaballProgram.ts", // dies in W1\n`,
        to: `            "src/components/blob/renderer/webgl/buildMetaballProgram.ts", // dies in W1
            "src/components/blob/renderer/webgl/index.ts", // the arm's door — dies in W1\n`,
    },

    // ── the dock band: read from the resolved file set, the whole unit ──────────────────
    {
        file: "tests/components/custom/dock/g-dock-lattice.test.ts",
        why: "the harness file set replaces the directory walk",
        from: `import { join, sep } from "node:path";\n`,
        to: `import { join } from "node:path";\n`,
    },
    {
        file: "tests/components/custom/dock/g-dock-lattice.test.ts",
        why: "import the harness file set",
        from: `import { mountComposable } from "../../../utils/mountComposable";\n`,
        to: `import { mountComposable } from "../../../utils/mountComposable";\nimport { files } from "../../../harness/source";\n`,
    },
    {
        file: "tests/components/custom/dock/g-dock-lattice.test.ts",
        why: "the band is every dock sheet: controls/, search/ and legibility/ are modules of the unit now, so a walk of styles/ alone would quantify over a subset, the failure this function was cured of",
        from: `    return readdirSync(join(process.cwd(), STYLES), { recursive: true })
        .map((entry) => String(entry).split(sep).join("/"))
        .filter((name) => name.endsWith(".css"))
        .sort()
        .map((name) => ({ file: \`\${STYLES}/\${name}\`, css: declarations(\`\${STYLES}/\${name}\`) }));
`,
        to: `    return files({ under: DOCK, suffix: ".css" }).map((file) => ({ file, css: declarations(file) }));
`,
    },
    {
        file: "tests/components/custom/dock/g-dock-lattice.test.ts",
        why: "controls/ holds its four partials, its root and its door",
        from: `        expect(bandCss().filter(({ file }) => file.includes("/controls/")).length).toBe(4);`,
        to: `        expect(bandCss().filter(({ file }) => file.includes("/controls/")).length).toBe(6);`,
    },
    {
        file: "tests/components/custom/dock/g-dock-lattice.test.ts",
        all: true,
        why: "the controls module sits at the unit root",
        from: "`${STYLES}/controls/",
        to: "`${DOCK}/controls/",
    },
    {
        file: "tests/components/custom/dock/g-dock-lattice.test.ts",
        why: "the ring rule's sheet is styles/core.css (the unit door is dock/index.css)",
        from: "`${STYLES}/index.css: .glass-dock [data-ring-yield]:focus-visible`",
        to: "`${STYLES}/core.css: .glass-dock [data-ring-yield]:focus-visible`",
    },

    // ── sortable-list: a member is found by name anywhere in the unit ───────────────────
    {
        file: "tests/components/sortable-list/battery.test.ts",
        why: "drag/ and resolve/ are modules of the unit; a member is found by its file name in the unit, never by a remembered path",
        from: "const read = (rel: string): string => readFileSync(`${DIR}/${rel}`, \"utf8\");\n",
        to: `const locate = (name: string): string[] => files({ under: DIR }).filter((f) => f.endsWith(\`/\${name}\`));
const read = (name: string): string => {
    const hit = locate(name);
    if (hit.length !== 1) throw new Error(\`\${name}: \${hit.length} files in \${DIR}\`);
    return readFileSync(hit[0], "utf8");
};
`,
    },
    {
        file: "tests/components/sortable-list/battery.test.ts",
        why: "a liar is gone from the whole unit, not only its root",
        from: "expect(existsSync(`${DIR}/${liar}`), `${liar} survives`).toBe(false);",
        to: "expect(locate(liar), `${liar} survives`).toEqual([]);",
    },
    {
        file: "tests/components/sortable-list/battery.test.ts",
        why: "each honest name is exactly one file in the unit",
        from: "expect(existsSync(`${DIR}/${honest}`), `${honest} missing`).toBe(true);",
        to: "expect(locate(honest), `${honest} missing`).toHaveLength(1);",
    },

    // ── the built-artifact pins read the entry record (F-3) ─────────────────────────────
    {
        file: "tests/public-surface.spec.ts",
        why: "P3-F5: a CSS entry the record declares under a dist name other than its source path (./styles/theme ships styles/theme.css from theme/index.css) is a member the build writes",
        from: `            "glass-ui.css",
            "styles/components.css",
            "component-styles.css",
        ]);
        const shipped = new Set(filesUnder("dist").filter((file) => file.endsWith(".css")));`,
        to: `            "glass-ui.css",
            "styles/components.css",
            "component-styles.css",
            ...(
                JSON.parse(readFileSync("scripts/structure/records/entry-record.json", "utf8")).css as [
                    string,
                    { source?: string; dist?: string },
                ][]
            )
                .filter(([, t]) => t.source && t.dist && t.dist !== relative(sourceRoot, resolve(t.source)))
                .map(([, t]) => t.dist as string),
        ]);
        const shipped = new Set(filesUnder("dist").filter((file) => file.endsWith(".css")));`,
    },
    {
        file: "tests/gates/orphan-css-partial.test.ts",
        why: "P3-F5: the record maps a declared dist name to its source; every other dist/styles leaf is the copy of its src twin",
        from: `const JS_EXTS = [".ts", ".tsx", ".mjs", ".js", ".vue"];\n`,
        to: `const JS_EXTS = [".ts", ".tsx", ".mjs", ".js", ".vue"];

// F-3's entry record: a CSS entry published under a dist name other than its source path
// (\`./styles/theme\` ships styles/theme.css from theme/index.css) maps back through it.
const RECORD_SOURCE = new Map(
    (
        JSON.parse(readFileSync(join(REPO_ROOT, "scripts/structure/records/entry-record.json"), "utf8")).css as [
            string,
            { source?: string; dist?: string },
        ][]
    )
        .filter(([, t]) => t.source && t.dist)
        .map(([, t]) => [\`./dist/\${t.dist}\`, t.source as string]),
);
`,
    },
    {
        file: "tests/gates/orphan-css-partial.test.ts",
        why: "a declared dist name resolves through the record; the copy rule covers the rest",
        from: `                roots.push(join(REPO_ROOT, node.replace("./dist/", "src/")));`,
        to: `                roots.push(join(REPO_ROOT, RECORD_SOURCE.get(node) ?? node.replace("./dist/", "src/")));`,
    },
    {
        file: "tests/gates/orphan-css-partial.test.ts",
        why: "a rescued sheet carries its own @imports: a <style src> that names a module's CSS door ships the door's sheets",
        from: `const reachable = new Set([...importClosure(roots), ...rescuedReferences(refMap, reach)]);`,
        to: `const reachable = importClosure([...roots, ...rescuedReferences(refMap, reach)]);`,
    },
];
