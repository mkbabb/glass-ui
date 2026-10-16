// authored/source-directive.mjs — AUTHORED input to derive/edits.mjs (step B-S7, LAW §6, B14).
//
// `@source "../*.js"` sat in src/styles/index.css, the ./styles door. P3-R8 lets a CSS door
// hold an @source over its own subtree only, and this one reaches out of it: its own comment
// says it is a no-op in the source build (src/*.js is empty) and does its work only in the
// SHIPPED copy, where dist/styles/../*.js is the compiled chunks. So it belongs to the dist
// copy, and the build writes it there, beside the SFC fold that already edits that copy. The
// dist bytes are unchanged: it was the last statement of dist/styles/index.css and the build
// appends it last (B-proto.md §B14 gives the before/after digest).

export const why = "B14 (P3-R8): the dist-only @source leaves the ./styles door; the build writes it into the shipped copy, dist bytes unchanged";

const MOVED_COMMENT = `/**
 * shipSourceDirective — write \`@source "../*.js"\` into the SHIPPED \`dist/styles/index.css\`,
 * last, so a consumer's Tailwind scans glass-ui's compiled component templates for the
 * utility classes they emit (CVA variant classes like text-destructive-foreground, layout
 * utilities like h-full/shrink-0).
 *
 * The glob reaches the compiled render-functions only in the shipped context: from
 * \`dist/styles/\` it is \`dist/*.js\`, the flat compiled chunks that carry the class strings
 * (a \`../components\` glob would reach \`dist/components/\`, which holds only \`.d.ts\`
 * mirrors). In the source tree it would be \`src/*.js\`, which is empty, so the directive
 * lives in the dist copy only and the source door carries no @source outside its subtree
 * (P3-R8). A bare \`../\` glob would also trip Tailwind's candidate extractor on the shader
 * template strings. This is a BACKSTOP for a consumer that imports this exact cascade file;
 * the PRIMARY self-emission path is \`vite.utility-emit.ts emitComponentUtilities\`, which
 * ships the component-utility RULES into \`dist/styles/components.css\`. Fully-arbitrary
 * bracket utilities are rejected by that path's \`classish\` filter and are not reliably
 * reachable by a JIT scan, so every structural bracket utility is pre-compiled into shipped
 * CSS instead.
 */
export function shipSourceDirective(distStyles: string): void {
    const distIndex = resolve(distStyles, "index.css");
    const directive = '@source "../*.js";';
    const text = readFileSync(distIndex, "utf-8");
    if (text.includes(directive)) return;
    writeFileSync(distIndex, \`\${text.endsWith("\\n") ? text : \`\${text}\\n\`}\${directive}\\n\`, "utf-8");
}

`;

export const edits = [
    {
        file: "src/styles/index.css",
        why: "the directive and its comment leave the source door",
        from: `@import "./accessibility.css";\n\n/* Ensure Tailwind scans glass-ui's compiled component templates`,
        until: `@source "../*.js";\n`,
        to: `@import "./accessibility.css";\n`,
    },
    {
        file: "vite.style-fold.ts",
        why: "the build writes the directive into the shipped copy",
        from: `/**
 * inlineFonts — inline every`,
        to: `${MOVED_COMMENT}/**
 * inlineFonts — inline every`,
    },
    {
        file: "vite.style-assets.ts",
        why: "import the dist writer",
        from: `    foldSfcBundle,\n    inlineFonts,\n`,
        to: `    foldSfcBundle,\n    inlineFonts,\n    shipSourceDirective,\n`,
    },
    {
        file: "vite.style-assets.ts",
        why: "the directive is written right after the SFC fold, last in the shipped index",
        from: `                foldSfcBundle(repositoryRoot, distStyles);\n`,
        to: `                foldSfcBundle(repositoryRoot, distStyles);\n                shipSourceDirective(distStyles);\n`,
    },
];
