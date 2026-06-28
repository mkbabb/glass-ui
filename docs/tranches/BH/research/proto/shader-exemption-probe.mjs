#!/usr/bin/env node
// P5 PROTOTYPE — proof:no-god-module shader-literal exemption glob.
// READ-ONLY over the repo. Writes ONLY to proto/ (the .json report).
//
// Confirms: (a) which src files exceed the 500L god-module bound; (b) the exact
// `*.{wgsl,glsl,frag,vert}.ts` exemption catches every shader-literal file and ONLY
// shader-literal files; (c) the residual >500L set after exemption == the non-shader
// god-modules the carve plans target.

import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const BOUND = 500;

// The candidate exemption glob, expressed as the suffix set a regex/minimatch encodes.
const SHADER_SUFFIXES = [".wgsl.ts", ".glsl.ts", ".frag.ts", ".vert.ts"];
const SHADER_RE = /\.(wgsl|glsl|frag|vert)\.ts$/;

function walk(dir, acc) {
    for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name === ".git") continue;
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|vue)$/.test(name)) acc.push(p);
    }
    return acc;
}

function lineCount(p) {
    return readFileSync(p, "utf8").split("\n").length;
}

const srcRoot = join(REPO, "src");
const files = walk(srcRoot, []);

// All shader-literal files (any size) the glob matches.
const shaderFiles = files.filter((f) => SHADER_RE.test(f)).sort();

// Any NON-shader file the glob would catch (must be EMPTY — the anti-overmatch proof).
const overmatch = shaderFiles.filter((f) => !/shaders?\/|constants\/shaders\//.test(f));

// >500L files, partitioned by the exemption.
const big = files
    .map((f) => ({ f, lines: lineCount(f) }))
    .filter((x) => x.lines > BOUND)
    .sort((a, b) => b.lines - a.lines);

const bigShaders = big.filter((x) => SHADER_RE.test(x.f));
const bigNonShader = big.filter((x) => !SHADER_RE.test(x.f));

const rel = (p) => relative(REPO, p);

const report = {
    bound: BOUND,
    exemptionGlob: "src/**/*.{wgsl,glsl,frag,vert}.ts",
    exemptionRegex: SHADER_RE.source,
    exemptionSuffixes: SHADER_SUFFIXES,
    totalShaderLiteralFiles: shaderFiles.length,
    shaderLiteralFilesOver500: bigShaders.map((x) => ({ file: rel(x.f), lines: x.lines })),
    // The 3 the synthesis names — assert membership.
    expectedThreeShadersOver500: [
        "src/components/custom/goo-blob/shaders/metaball.wgsl.ts",
        "src/components/custom/dot-flow-field/shaders/flow-field.glsl.ts",
        "src/components/custom/goo-blob/shaders/metaball.frag.ts",
    ],
    overmatchNonShaderFilesCaughtByGlob: overmatch.map(rel), // MUST be []
    residualGodModulesAfterExemption: bigNonShader.map((x) => ({ file: rel(x.f), lines: x.lines })),
    nonShaderGodModuleCount: bigNonShader.length,
};

// Assertions
const got3 = new Set(bigShaders.map((x) => rel(x.f)));
report.assert_exactly_three_shaders_over_500 = bigShaders.length === 3;
report.assert_three_match_expected =
    report.expectedThreeShadersOver500.every((e) => got3.has(e)) &&
    bigShaders.length === 3;
report.assert_no_overmatch = overmatch.length === 0;

const outPath = join(
    "/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/b6d23e41-2f2a-4407-ba89-e126e9497583/scratchpad/bh-research/proto",
    "shader-exemption-report.json",
);
writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
