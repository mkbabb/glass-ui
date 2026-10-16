#!/usr/bin/env node
// author/aurora-presets.mjs — AUTHOR-SIDE (B-S11, zone demo): split
// demo/stories/substrates/aurora/presets.ts (740 lines) by medium. The preset table, its
// keys and its display metadata stay in presets.ts (every reader imports those, and two
// pi specs read the file by path); the seventeen configurations move, verbatim, to
// `aurora/mediums/`: `smooth.ts` (medium "smooth") and `painterly.ts` (every stroke
// medium), with the `cfg` builder they share in `mediums/preset.ts`.
//
//   node author/aurora-presets.mjs --root <tree>
//
// Blocks are found by their banners; each block's medium is read from the block and must
// match the file it is filed under, so a re-mediumed preset stops the run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/substrates/aurora/presets.ts";
const src = open(root, REL);
const { L, at, next, range } = src;

const overrides = at("type PresetOverrides = Partial<AuroraConfig>;");
const cfgEnd = next("}", at("function cfg(overrides: PresetOverrides): AuroraConfig {"));
const table = at("export const PRESETS = {");
const NAMES = ["OPENAI_SKY", "OPENAI_DAWN", "OPENAI_MEADOW", "DELIBERATIVE", "DAY9_YELLOW", "OIL_IMPASTO", "OIL_GESTURAL", "VANGOGH", "OILPASTEL_SUNSET", "OILPASTEL_RAINBOW", "SPEEDTEST", "OILPASTEL_OCEAN", "CRAYON", "METAL", "SETTING_SUN", "DUSK", "VIVID_SETTING_SUN"];
const banner = (name) => {
    const hits = L.map((r, i) => (r.startsWith(`// ── ${name} `) ? i + 1 : 0)).filter(Boolean);
    if (hits.length !== 1) throw new Error(`${name}: ${hits.length} banner(s)`);
    return hits[0];
};
const blocks = NAMES.map((name) => {
    const a = banner(name);
    const decl = at(`const ${name} = cfg({`);
    const b = next("});", decl);
    const medium = range(a, b).find((r) => /^\s+medium: "/.test(r))?.match(/"([^"]+)"/)?.[1] ?? "smooth";
    return { name, a, b, file: medium === "smooth" ? "smooth" : "painterly" };
}).sort((x, y) => x.a - y.a);
// the blocks tile the region between the builder's medium-label helper and the table
blocks.forEach((k, i) => {
    const end = i + 1 < blocks.length ? blocks[i + 1].a - 2 : table - 2;
    if (k.b !== end || L[k.b] !== "") throw new Error(`${k.name}: text after its block`);
});

const DIR = "demo/stories/substrates/aurora/mediums";
mkdirSync(join(root, DIR), { recursive: true });
const cfgText = [...range(overrides, overrides + 1), `export ${L[overrides + 1]}`, ...range(overrides + 3, cfgEnd)].join("\n");
if (!L[overrides + 1].startsWith("function cfg(")) throw new Error("cfg does not follow PresetOverrides");
writeFileSync(
    join(root, DIR, "preset.ts"),
    [
        "// The one builder every authored preset goes through: the neutral library default,",
        "// the preset's overrides, and the shared pointer swirl.",
        ...importsFor(src, cfgText, DIR),
        "",
        cfgText,
        "",
    ].join("\n"),
);
const HEAD = {
    smooth: ["// The smooth-medium presets: the setting-sun candidates, the OpenAI sky and dawn,", "// and the speedtest dashboard baseline. Nuclei y is CSS-top-origin (see presets.ts)."],
    painterly: ["// The presets on a stroke medium: watercolor, pastel, oil, van Gogh, oil pastel,", "// crayon and metal. Nuclei y is CSS-top-origin (see presets.ts)."],
};
for (const file of ["smooth", "painterly"]) {
    const body = [];
    for (const k of blocks.filter((x) => x.file === file)) {
        body.push(...range(k.a, k.b).map((r) => (r === `const ${k.name} = cfg({` ? `export ${r}` : r)), "");
    }
    body.pop();
    writeFileSync(join(root, DIR, `${file}.ts`), [...HEAD[file], 'import { cfg } from "./preset";', "", ...body, ""].join("\n"));
}

const docEnd = at(" * DEFAULT_AURORA_CONFIG.");
const names = (file) => blocks.filter((k) => k.file === file).map((k) => `    ${k.name},`).join("\n");
const moved = [cfgText, ...blocks.map((k) => range(k.a, k.b).join("\n"))].join("\n");
const text = rebuild(src, {
    cuts: [[docEnd, docEnd], [overrides, cfgEnd + 1], [blocks[0].a, table - 1]],
    put: {
        [docEnd]: [" * DEFAULT_AURORA_CONFIG.", " *", " * The configurations live by medium in `./mediums/`; this file is the table."],
    },
    addImports: [`import {\n${names("smooth")}\n} from "./mediums/smooth";`, `import {\n${names("painterly")}\n} from "./mediums/painterly";`],
    moved,
});
writeFileSync(join(root, REL), text);
console.log("aurora presets split");
