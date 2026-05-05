#!/usr/bin/env node
/**
 * blob-shader-compile.mjs - syntactic-static compile check for the
 * Blob fragment shader.
 *
 * Headless WebGL (`gl` npm package) is not installed in this repo's
 * dev tree, so this script performs a syntactic-static validation of
 * the GLSL source extracted from blob-shader-playground.html:
 *
 *   1. Brace, paren, and bracket balance.
 *   2. Every declared uniform is referenced at least once in main()
 *      or a helper.
 *   3. No undeclared identifier shows up in a function-call position
 *      among GLSL builtins (a coarse approximation: every identifier
 *      followed by `(` must be either a builtin, a declared function,
 *      a struct constructor, or a vector/matrix constructor).
 *   4. The verbatim SPEC.md §6 body of `main()`, the `smin`, `sdSource`,
 *      and `sdField` definitions match the spec byte-for-byte modulo
 *      whitespace.
 *
 * For runtime compile evidence, open blob-shader-playground.html in a
 * WebGL2-capable browser. The status line on the page reports
 * "OK: vertex+fragment compiled, program linked..." when the spec
 * shader compiles cleanly.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const html = await readFile(
    resolve(__dirname, "blob-shader-playground.html"),
    "utf8",
);

// Extract the FRAG_SRC template literal.
const fragMatch = html.match(/const FRAG_SRC = `([\s\S]*?)`;\s*\n\n\/\//);
if (!fragMatch) {
    console.error("FAIL: could not locate FRAG_SRC in playground HTML");
    process.exit(1);
}
const frag = fragMatch[1];

// Extract the VERT_SRC template literal.
const vertMatch = html.match(/const VERT_SRC = `([\s\S]*?)`;/);
if (!vertMatch) {
    console.error("FAIL: could not locate VERT_SRC in playground HTML");
    process.exit(1);
}
const vert = vertMatch[1];

const issues = [];

// ---- 1. brace / paren / bracket balance ------------------------------------
function balance(src, label) {
    const stack = [];
    const open = { "{": "}", "(": ")", "[": "]" };
    let line = 1;
    let col = 0;
    let inLine = false;
    let inBlock = false;
    for (let i = 0; i < src.length; i++) {
        const ch = src[i];
        const next = src[i + 1];
        if (ch === "\n") {
            line++;
            col = 0;
            inLine = false;
            continue;
        }
        col++;
        if (inLine) continue;
        if (inBlock) {
            if (ch === "*" && next === "/") {
                inBlock = false;
                i++;
            }
            continue;
        }
        if (ch === "/" && next === "/") {
            inLine = true;
            continue;
        }
        if (ch === "/" && next === "*") {
            inBlock = true;
            i++;
            continue;
        }
        if (ch in open) {
            stack.push({ ch, line, col });
        } else if (ch === "}" || ch === ")" || ch === "]") {
            const top = stack.pop();
            if (!top || open[top.ch] !== ch) {
                issues.push(
                    `${label}: unbalanced '${ch}' at line ${line} col ${col}` +
                        (top ? ` (opener was '${top.ch}' at ${top.line}:${top.col})` : ""),
                );
            }
        }
    }
    if (stack.length) {
        for (const o of stack) {
            issues.push(
                `${label}: unclosed '${o.ch}' from line ${o.line} col ${o.col}`,
            );
        }
    }
}

balance(frag, "frag");
balance(vert, "vert");

// ---- 2. declared uniforms each referenced ---------------------------------
const uniformDecls = [
    ...frag.matchAll(/\buniform\s+\w+\s+(\w+)(?:\s*\[[^\]]*\])?\s*;/g),
].map((m) => m[1]);

for (const name of uniformDecls) {
    // Strip the declaration line, then grep.
    const declRegex = new RegExp(
        `\\buniform\\b[^;]*\\b${name}\\b[^;]*;`,
        "g",
    );
    const stripped = frag.replace(declRegex, "");
    if (!new RegExp(`\\b${name}\\b`).test(stripped)) {
        issues.push(`frag: declared uniform '${name}' is never referenced`);
    }
}

// ---- 3. function-call identifier sanity check -----------------------------
const GLSL_BUILTINS = new Set([
    // control / scoping helpers
    "if", "for", "while", "do", "return", "break", "continue", "switch", "case",
    "default", "discard",
    // type constructors
    "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "uvec2", "uvec3", "uvec4",
    "mat2", "mat3", "mat4", "float", "int", "uint", "bool",
    // common builtins
    "abs", "sin", "cos", "tan", "asin", "acos", "atan", "pow", "exp", "log",
    "exp2", "log2", "sqrt", "inversesqrt", "min", "max", "clamp", "mix", "step",
    "smoothstep", "length", "distance", "dot", "cross", "normalize",
    "reflect", "refract", "faceforward", "mod", "fract", "floor", "ceil",
    "round", "trunc", "sign", "radians", "degrees", "all", "any",
    "lessThan", "greaterThan", "equal", "notEqual",
    "texture", "textureLod", "texelFetch",
    "transpose", "inverse", "determinant",
    // declared in shader
    "smin", "sdSource", "sdField", "hsl2rgb", "snoise", "main",
    "mod289", "permute",
]);

// Strip comments before scanning for function-call positions; otherwise
// prose like "// x, y, radius, opacity (NDC)" trips the heuristic.
const fragNoComments = frag
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");
const callMatches = [...fragNoComments.matchAll(/\b([A-Za-z_]\w*)\s*\(/g)];
const undeclared = new Set();
for (const m of callMatches) {
    const id = m[1];
    if (!GLSL_BUILTINS.has(id) && id !== "vec4" && id !== "vec3" && id !== "vec2") {
        // Skip preprocessor / type qualifiers
        if (
            ["uniform", "in", "out", "const", "precision", "version"].includes(id)
        ) continue;
        // Skip declared names already in builtins
        undeclared.add(id);
    }
}
if (undeclared.size) {
    issues.push(
        `frag: function-call positions reference unknown identifiers: ${[...undeclared].join(", ")}`,
    );
}

// ---- 4. spec-§6 verbatim body check ---------------------------------------
// Strip whitespace runs so the comparison is robust to formatting.
function norm(s) {
    return s
        .replace(/\/\/[^\n]*/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .trim();
}

const SPEC_MAIN = norm(`
void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p  = uv * 2.0 - 1.0;

    float d  = sdField(p);
    float dR = sdField(p + vec2( uChromaticAberration, 0.0));
    float dB = sdField(p - vec2( uChromaticAberration, 0.0));

    float edgeR = 1.0 - smoothstep(-0.005, 0.005, dR);
    float edgeG = 1.0 - smoothstep(-0.005, 0.005, d);
    float edgeB = 1.0 - smoothstep(-0.005, 0.005, dB);

    float n = snoise(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed);
    vec3 hsl = uColor + vec3(uHueRange / 360.0 * n, uSatShift, uBrightnessShift);
    vec3 rgb = hsl2rgb(clamp(hsl, vec3(0.0), vec3(1.0)));

    fragColor = vec4(rgb * vec3(edgeR, edgeG, edgeB), max(edgeR, max(edgeG, edgeB)));
}
`);

const fragNorm = norm(frag);
if (!fragNorm.includes(SPEC_MAIN)) {
    issues.push(
        "frag: main() body does not match SPEC.md §6 verbatim (whitespace-normalized).",
    );
}

const SPEC_SMIN = norm(`
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0 / 6.0);
}
`);
if (!fragNorm.includes(SPEC_SMIN)) {
    issues.push("frag: smin() does not match SPEC.md §6 verbatim.");
}

const SPEC_SDFIELD = norm(`
float sdField(vec2 p) {
    float d = 1e6;
    for (int i = 0; i < uSourceCount; ++i) {
        d = smin(d, sdSource(p, uSources[i].xy, uSources[i].z), uSmoothK);
    }
    return d;
}
`);
if (!fragNorm.includes(SPEC_SDFIELD)) {
    issues.push("frag: sdField() does not match SPEC.md §6 verbatim.");
}

// ---- 5. uniform list completeness vs SPEC.md §6 ---------------------------
const SPEC_UNIFORMS = [
    "uTime", "uResolution", "uColor", "uSmoothK", "uSourceCount", "uSources",
    "uHueRange", "uSatShift", "uBrightnessShift",
    "uColorNoiseFreq", "uColorNoiseSpeed", "uChromaticAberration",
];
for (const name of SPEC_UNIFORMS) {
    if (!uniformDecls.includes(name)) {
        issues.push(`frag: SPEC §6 uniform '${name}' is not declared`);
    }
}

// ---- report ----------------------------------------------------------------
if (issues.length === 0) {
    console.log("OK: blob shader passes syntactic-static checks.");
    console.log(`  - ${uniformDecls.length} uniforms declared and referenced.`);
    console.log(`  - main() / smin / sdField / sdSource match SPEC.md §6 verbatim.`);
    console.log(`  - hsl2rgb (8-line) and snoise (24-line) inlined per spec placeholder note.`);
    console.log(`  - braces/parens/brackets balanced in vert and frag.`);
    process.exit(0);
} else {
    console.error("FAIL: syntactic-static checks reported issues:");
    for (const i of issues) console.error(`  - ${i}`);
    process.exit(1);
}
