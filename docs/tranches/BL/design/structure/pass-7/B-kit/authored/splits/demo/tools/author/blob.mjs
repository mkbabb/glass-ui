#!/usr/bin/env node
// author/blob.mjs — AUTHOR-SIDE (B-S11, zone demo): split demo/stories/substrates/blob.vue
// (785 lines). The studio's data (its config shape, its option lists, the chroma ceiling,
// the geometry base and the five emotion presets) moves to `blob/presets.ts`; the live
// stage (the palette ramp, the lean register, the reactive BlobConfig and the watch that
// threads every studio edit onto it) moves to `blob/useBlobStage.ts`, taking the studio
// as its argument so its body reads unchanged, and is called where its code stood. The
// template, the plain blob and the pause seam stay in the story. The source witness in
// tests-visual/blob-page.spec.ts reads the studio geometry base where it now lives.
//
//   node author/blob.mjs --root <tree>
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/substrates/blob.vue";
const src = open(root, REL);
const { L, at, next, range } = src;

const dataA = at("// ── Configurator-driven blob studio ─────────────────────────────────────");
const dataB = next("];", at("const presets: readonly ConfiguratorPreset<BlobStudioCfg>[] = ["));
const stageA = at("// The live palette stops, derived from the studio seed/harmony (the D1 hero color-feed");
const stageB = at("    { immediate: true, deep: true },") + 1;
if (L[stageB - 1] !== ");") throw new Error("the stage watch does not close after its options");
if (!(dataB < at("const studio = useConfiguratorState<BlobStudioCfg>({") && stageA > dataB && stageB < at("// Plain blob configuration:"))) throw new Error("blob.vue blocks out of order");

const EXPORTED = ["BlobStudioCfg", "HARMONIES", "MOODS", "MERGES", "BLOB_WARM_REGISTER_CHROMA_CEILING", "presets"];
const dataText = range(dataA, dataB)
    .map((r) => (EXPORTED.some((n) => r.startsWith(`const ${n}`) || r.startsWith(`interface ${n} `)) ? `export ${r}` : r))
    .join("\n");
if ((dataText.match(/^export /gm) ?? []).length !== EXPORTED.length) throw new Error("an exported name was not found");
const stageText = range(stageA, stageB).map((r) => (r ? `    ${r}` : r)).join("\n");

const DIR = "demo/stories/substrates/blob";
mkdirSync(join(root, DIR), { recursive: true });
writeFileSync(
    join(root, DIR, "presets.ts"),
    [
        "// The blob studio's data: the config shape its controls edit, the option lists, the",
        "// warm-register chroma ceiling, the geometry base and the five emotion presets.",
        ...importsFor(src, dataText, DIR),
        "",
        dataText,
        "",
    ].join("\n"),
);
writeFileSync(
    join(root, DIR, "useBlobStage.ts"),
    [
        "// The blob studio's live stage: the palette ramp, the lean register, and the reactive",
        "// BlobConfig the hero paints, kept in step with every studio edit.",
        ...importsFor(src, stageText, DIR),
        'import { BLOB_WARM_REGISTER_CHROMA_CEILING, type BlobStudioCfg } from "./presets";',
        "",
        "export function useBlobStage(studio: { config: BlobStudioCfg }) {",
        stageText,
        "",
        "    return { paletteStops, stageConfig };",
        "}",
        "",
    ].join("\n"),
);

const text = rebuild(src, {
    cuts: [[dataA, dataB], [stageA, stageB]],
    put: {
        [dataA]: [
            "// ── Configurator-driven blob studio ─────────────────────────────────────",
            "// The studio's data lives in ./blob/presets.ts and its live stage in",
            "// ./blob/useBlobStage.ts; this page wires them to the Configurator and the hero.",
        ],
        [stageA]: ["const { paletteStops, stageConfig } = useBlobStage(studio);"],
    },
    addImports: [
        'import { HARMONIES, MERGES, MOODS, presets, type BlobStudioCfg } from "./blob/presets";',
        'import { useBlobStage } from "./blob/useBlobStage";',
    ],
    moved: [dataText, stageText].join("\n"),
});
writeFileSync(join(root, REL), text);

// the source witness follows the geometry base
const W = join(root, "tests-visual/blob-page.spec.ts");
let w = readFileSync(W, "utf8");
const edits = [
    [
        "            // SOURCE-WITNESS — the page's effective orbitRadius > bodyRadius. The page's\n            // stageConfig spreads BLOB_CONFIG_DEFAULTS then overrides geometry.orbitRadius\n            // (the D2 fix); the bodyRadius stays the default. Parse both from source.\n            const blobVue = fileURLToPath(new URL(\"../demo/stories/substrates/blob.vue\", import.meta.url));",
        "            // SOURCE-WITNESS — the page's effective orbitRadius > bodyRadius. The page's\n            // stageConfig spreads BLOB_CONFIG_DEFAULTS then overrides geometry.orbitRadius\n            // from the studio geometry base (the D2 fix), which lives in the blob story's\n            // presets module; the bodyRadius stays the default. Parse both from source.\n            const blobVue = fileURLToPath(new URL(\"../demo/stories/substrates/blob/presets.ts\", import.meta.url));",
    ],
    [
        "`could not parse the page's orbitRadius override from blob.vue — the source-witness",
        "`could not parse the page's orbitRadius override from blob/presets.ts — the source-witness",
    ],
];
for (const [from, to] of edits) {
    if (w.split(from).length !== 2) throw new Error(`blob-page.spec.ts: ${JSON.stringify(from.slice(0, 60))} does not match once`);
    w = w.replace(from, () => to);
}
writeFileSync(W, w);
console.log("blob split");
