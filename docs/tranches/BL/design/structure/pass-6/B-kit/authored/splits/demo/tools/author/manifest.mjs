#!/usr/bin/env node
// author/manifest.mjs — AUTHOR-SIDE (B-S11, zone demo): split demo/stories/manifest.ts
// (1,098 lines) into the manifest module it already half is (`manifest/lazy.ts`):
//   manifest/categories/<id>.ts  the eleven category blocks, verbatim (dedented one level,
//                                since each leaves the array literal);
//   manifest/types.ts            HeroScale, StoryDepth, Story, Category, SectionLanding,
//                                StoryOptions, and the two authored row shapes;
//   manifest/row.ts              s(), which now returns the authored row.
// The manifest keeps the globs, the background and landing maps, the resolver (s()'s old
// body, verbatim, as story(row)), the depth ladder, the assembly, the act order and the
// lookups. Blocks are found by their own text (lib.mjs), so the script refuses a drifted
// file rather than cutting it.
//
//   node author/manifest.mjs --root <tree>
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { docStart, importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const src = open(root, "demo/stories/manifest.ts");
const { L, at, next, range } = src;

// the eleven category blocks, in the literal's order (also the pi lane's scene order)
const CATS = ["foundations", "substrates", "forms", "display", "containers", "navigation", "dock", "data", "feedback", "motion", "compositions"];
const catsOpen = at("export const CATEGORIES: Category[] = [");
const catsClose = next("];", catsOpen);
const blocks = CATS.map((id) => {
    const a = at(`        id: "${id}",`) - 1;
    if (L[a - 1] !== "    {" || a <= catsOpen) throw new Error(`${id}: block does not open at ${a}`);
    const b = next("    },", a);
    const icon = L[a + 2].match(/^ {8}icon: (\w+),$/)?.[1];
    if (!icon) throw new Error(`${id}: no icon line`);
    return { id, a, b, icon };
});
blocks.forEach((k, i) => {
    const end = i + 1 < blocks.length ? blocks[i + 1].a - 1 : catsClose - 1;
    if (k.b !== end) throw new Error(`${k.id}: text between its block and the next`);
});

const heroScale = at('export type HeroScale = "audacious" | "mega" | "hero" | "5" | "4";');
const typesA = docStart(src, heroScale);
const reExport = at("/** Re-export the descriptor type so consumers reach it from the manifest. */");
const categoryA = at("export interface Category {");
const decision = at("// ── The δ5/δ6 manifest-carve+glob DECISION ( δ5/δ6). ────────────────────────");
const optionsA = at("/** Per-page container options — the declared background + the hero register. */");
const optionsB = next("}", optionsA);
if (L[optionsA] !== "interface StoryOptions {") throw new Error("StoryOptions moved");
const sA = at("function s(");
const sSig = next("): Story {", sA);
const keepSentence = at(" * `demo/stories/<category>/<id>.vue` and appending a row here.");
const globNote = at("// Keep the typed route rows in place and the glob-resolved SFC loader in");
if (L[globNote] !== "// `./manifest/lazy.ts`; no generated catalogue or parallel route registry exists.") throw new Error("glob note moved");

const dedent = (rows) => rows.map((r) => (r.startsWith("    ") ? r.slice(4) : r));
const DIR = "demo/stories/manifest";
mkdirSync(join(root, DIR, "categories"), { recursive: true });
for (const k of blocks) {
    writeFileSync(
        join(root, DIR, `categories/${k.id}.ts`),
        [
            `import { ${k.icon} } from "@lucide/vue";`,
            'import { s } from "../row";',
            'import type { CategoryRow } from "../types";',
            "",
            `export const ${k.id}: CategoryRow = {`,
            ...dedent(range(k.a + 1, k.b - 1)),
            "};",
            "",
        ].join("\n"),
    );
}

const typesBody = [...range(typesA, reExport - 1), ...range(categoryA, decision - 1)];
const options = range(optionsA, optionsB);
options[1] = `export ${options[1]}`;
const typesText = [
    ...typesBody,
    ...options,
    "",
    "/** One authored story row: `s(category, id, title, blurb?, opts?)` in a category file. */",
    "export interface StoryRow {",
    "    cat: string;",
    "    id: string;",
    "    title: string;",
    "    blurb?: string;",
    "    opts?: StoryOptions;",
    "}",
    "",
    "/** One authored category: its rail identity and its story rows, in order. */",
    'export interface CategoryRow extends Pick<Category, "id" | "title" | "icon" | "reference"> {',
    "    stories: StoryRow[];",
    "}",
    "",
].join("\n");
writeFileSync(
    join(root, DIR, "types.ts"),
    [
        "// The manifest's types: the resolved `Story` and `Category` the routes, docks and",
        "// landings read, and the `StoryRow` / `CategoryRow` shapes a category file authors.",
        ...importsFor(src, typesText, DIR),
        "",
        typesText,
    ].join("\n"),
);
writeFileSync(
    join(root, DIR, "row.ts"),
    [
        'import type { StoryOptions, StoryRow } from "./types";',
        "",
        "/**",
        " * One story row, as a category file authors it. The manifest resolves the row into",
        " * a `Story` (its lazy SFC, its tile, its background); the pi lane re-sources its",
        " * scenes by parsing these calls (`tests-visual/pi-manifest.ts`).",
        " */",
        "export function s(",
        "    cat: string,",
        "    id: string,",
        "    title: string,",
        "    blurb?: string,",
        "    opts?: StoryOptions,",
        "): StoryRow {",
        "    return { cat, id, title, blurb, opts };",
        "}",
        "",
    ].join("\n"),
);

const moved = [...typesBody, ...options, ...blocks.flatMap((k) => range(k.a, k.b))].join("\n");
const text = rebuild(src, {
    cuts: [
        [keepSentence, keepSentence],
        [typesA, reExport - 1],
        [categoryA, decision - 1],
        [globNote, globNote + 1],
        [optionsA, optionsB + 1],
        [sA, sSig],
        [catsOpen, catsClose],
    ],
    put: {
        [keepSentence]: [" * `demo/stories/<category>/<id>.vue` and appending a row to its", " * category's file in `./manifest/categories/`."],
        [globNote]: [
            "// The typed route rows live one file per category in `./manifest/categories/`, and the",
            "// glob-resolved SFC loader in `./manifest/lazy.ts`; no generated catalogue or parallel",
            "// route registry exists.",
        ],
        [sA]: ["function story({ cat, id, title, blurb, opts }: StoryRow): Story {"],
        [catsOpen]: [
            "export const CATEGORIES: Category[] = [",
            ...CATS.map((id) => `    ${id},`),
            "].map(({ stories, ...category }) => ({ ...category, stories: stories.map(story) }));",
        ],
    },
    addImports: [
        "import type {",
        "    Category,",
        "    HeroScale,",
        "    SectionLanding,",
        "    Story,",
        "    StoryDepth,",
        "    StoryRow,",
        '} from "./manifest/types";',
        ...CATS.map((id) => `import { ${id} } from "./manifest/categories/${id}";`),
        "",
        "/** The resolved rows, re-exported so consumers reach them from the manifest. */",
        'export type { Category, Story } from "./manifest/types";',
    ],
    moved,
});
writeFileSync(join(root, "demo/stories/manifest.ts"), text);
// the pi lane's scene re-source follows the rows (pi-manifest.edits.json: exact text, once each)
const PI = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "pi-manifest.edits.json"), "utf8"));
let pi = readFileSync(join(root, PI.file), "utf8");
for (const { from, to } of PI.edits) {
    if (pi.split(from).length !== 2) throw new Error(`${PI.file}: ${JSON.stringify(from.slice(0, 60))} does not match once`);
    pi = pi.replace(from, () => to);
}
writeFileSync(join(root, PI.file), pi);
console.log("manifest split:", text.split("\n").length, "lines in manifest.ts");
