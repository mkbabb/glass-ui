#!/usr/bin/env node
// author/fourier-field.mjs — AUTHOR-SIDE (B-S11, zone demo): split
// demo/stories/substrates/fourier-field.vue (531 lines) into the story's existing module
// dir `fourier-field/`: the view model, its colour choices and its five presets to
// `presets.ts`; the source minting (figure labels, the elliptic seed, `mintFor`) to
// `sources.ts`, beside the `fourier-paths.ts` it reads. The story keeps the studio wiring,
// the transport, the colour ramp and the template (the smoke test reads the template's
// transport vocabulary).
//
//   node author/fourier-field.mjs --root <tree>
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/substrates/fourier-field.vue";
const src = open(root, REL);
const { L, at, next, range } = src;

const modelA = at("/** The view model. Every field is a control, and every control changes the picture. */");
const colorB = next("];", at("const COLOR_OPTIONS = ["));
const labelsA = at("const FIGURE_LABELS: Record<string, string> = {");
const mintB = next("}", at("function mintFor(key: string, richness: number): MintedSpectrum {"));
const presetsA = at("const presets: readonly ConfiguratorPreset<FourierViewCfg>[] = [");
const presetsB = next("];", presetsA);
if (labelsA !== colorB + 2 || presetsA !== mintB + 2 || L[colorB] !== "" || L[mintB] !== "" || L[presetsB] !== "") throw new Error("fourier-field.vue: the three blocks are not adjacent");

const exp = (names) => (r) => (names.some((n) => r.startsWith(n)) ? `export ${r}` : r);
const presetsText = [
    ...range(modelA, colorB),
    "",
    ...range(presetsA, presetsB),
].map(exp(["interface FourierViewCfg {", "const COLOR_OPTIONS = [", "const presets: "])).join("\n");
const sourcesText = range(labelsA, mintB).map(exp(["const FIGURE_LABELS", "function mintFor("])).join("\n");
if ((presetsText.match(/^export /gm) ?? []).length !== 3 || (sourcesText.match(/^export /gm) ?? []).length !== 2) throw new Error("an exported name was not found");

const DIR = "demo/stories/substrates/fourier-field";
writeFileSync(
    join(root, DIR, "presets.ts"),
    ["// The Fourier studio's view model, its colour choices and its five presets.", ...importsFor(src, presetsText, DIR), "", presetsText, ""].join("\n"),
);
writeFileSync(
    join(root, DIR, "sources.ts"),
    [
        "// The Fourier studio's sources: the figure labels, the elliptic seed, and the one mint",
        "// every source goes through.",
        ...importsFor(src, sourcesText, DIR),
        "",
        sourcesText,
        "",
    ].join("\n"),
);
writeFileSync(
    join(root, REL),
    rebuild(src, {
        cuts: [[modelA, presetsB + 1]],
        addImports: [
            'import { COLOR_OPTIONS, presets, type FourierViewCfg } from "./fourier-field/presets";',
            'import { FIGURE_LABELS, mintFor } from "./fourier-field/sources";',
        ],
        moved: [presetsText, sourcesText].join("\n"),
    }),
);
console.log("fourier-field split");
