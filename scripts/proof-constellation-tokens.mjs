#!/usr/bin/env node
// AX.W17 — proof:constellation-tokens.
//
// The Canvas2D-SAFE token gate. Born-RED at HEAD (the library shipped ZERO
// `--constellation-*` tokens — RED witness 1; `readPalette` read 3 — RED witness
// 1b; no guard existed — RED witness 4). It drives three clauses GREEN:
//
//   (a) TOKEN-BLOCK-PRESENT — `src/styles/tokens.css` ships a `--constellation-*`
//       block with BOTH a `:root` (light) arm and a `.dark` arm.
//   (b) READPALETTE-FULL-SET — `constellationField.ts` `readPalette` reads the
//       FULL set (≥6 `--constellation-*` tokens: node, node-dim, line, edge-alpha,
//       edge-focus-alpha, alpha) — not the 3 it read at HEAD.
//   (c) NO-LIGHT-DARK-IN-CONSTELLATION-TOKEN — the W30 cardinal-defect static
//       assertion + its TRANSITIVE-var closure: NO `--constellation-*` declaration
//       may carry a literal `light-dark(` substring NOR any `var(…)` reference to
//       a `light-dark()`-bearing token. Canvas2D silently rejects a `light-dark()`
//       value into `strokeStyle`/`fillStyle` (the W30 86.3%-red-splatter defect),
//       and the rejection is IDENTICAL whether the value is a literal `light-dark(…)`
//       OR a `var(--foreground)`/`var(--neutral-4)` that RESOLVES to one. A
//       literal-substring-only check is a HOLE — `--constellation-line:
//       var(--neutral-4)` carries no `light-dark(` substring yet re-admits the leak
//       through the neutral ladder. The gate maintains the set of known
//       `light-dark()`-bearing tokens (literal `light-dark(` carriers + any token
//       with a per-mode `:root`-vs-`.dark` split) and FAILS on any
//       `--constellation-*` value that `var(`-references one (one hop — the
//       constellation tokens are PLAIN-hsl leaves by construction).
//
// Bite (born-RED fixtures the gate-author proves): drop the token block → (a)
// reddens; have readPalette read 3 → (b) reddens; declare `--constellation-line:
// light-dark(...)` → (c) literal arm reddens; declare `--constellation-line:
// var(--neutral-4)` → (c) TRANSITIVE arm reddens (the hole is closed).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const TOKENS = resolve(ROOT, "src/styles/tokens.css");
const FIELD = resolve(ROOT, "src/components/custom/constellation/constellationField.ts");
// BC.W-VIZ-CONSTELLATION re-point: the four Canvas2D draw passes RETIRED; `readPalette`
// relocated to `constellationRender.ts` (the JS-side render leaf — the palette read stays
// JS, written to the WebGPU uniform buffer). The READPALETTE-FULL-SET clause (b) reads it
// there; the FIELD path stays the presence canary for the engine module.
const DRAW = resolve(ROOT, "src/components/custom/constellation/constellationRender.ts");

/** The 6 canonical legibility tokens readPalette must read (the FULL set). */
const REQUIRED_TOKENS = [
    "--constellation-node",
    "--constellation-node-dim",
    "--constellation-line",
    "--constellation-edge-alpha",
    "--constellation-edge-focus-alpha",
    "--constellation-alpha",
];

/** Strip CSS comments so a clause cannot be satisfied/tripped by a comment. */
function stripCssComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Strip JS/TS comments (the readPalette clause reads real code, not comments). */
function stripTsComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Extract the `:root { … }` and `.dark { … }` block BODIES from the (comment-
 * stripped) tokens.css. tokens.css carries MULTIPLE `:root {…}` blocks (a base
 * block + an `@supports` light-dark() block + trailing @property cohorts) and a
 * single top-level `.dark {…}` — we concatenate ALL `:root` bodies and ALL
 * `.dark` bodies (brace-balanced) so a token declared in any arm is seen.
 */
function selectorBodies(css, selectorRe) {
    const bodies = [];
    let m;
    const re = new RegExp(selectorRe, "g");
    while ((m = re.exec(css))) {
        // From the `{` after the selector, walk brace-balanced to the matching `}`.
        let i = m.index + m[0].length;
        // advance to the opening brace
        while (i < css.length && css[i] !== "{") i++;
        if (css[i] !== "{") continue;
        let depth = 0;
        const start = i;
        for (; i < css.length; i++) {
            if (css[i] === "{") depth++;
            else if (css[i] === "}") {
                depth--;
                if (depth === 0) {
                    bodies.push(css.slice(start + 1, i));
                    break;
                }
            }
        }
    }
    return bodies;
}

/** Parse `--token: value;` declarations from a block body into a Map (last wins). */
function parseDecls(body) {
    const decls = new Map();
    const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
    let m;
    while ((m = re.exec(body))) {
        decls.set(m[1], m[2].trim());
    }
    return decls;
}

/**
 * Build the set of `light-dark()`-BEARING token NAMES — the transitive blocklist.
 * A token is light-dark()-bearing if it EITHER (i) carries a literal `light-dark(`
 * in any arm, OR (ii) has a per-mode `:root`-vs-`.dark` value SPLIT (its resolved
 * paint differs between modes — exactly what Canvas2D cannot read from a single
 * static custom property). Both classes re-admit the W30 leak if a
 * `--constellation-*` token `var()`-references them.
 */
function lightDarkBearingTokens(rootDecls, darkDecls) {
    const bearing = new Set();
    // (i) literal light-dark() carriers (across both arms).
    for (const [k, v] of rootDecls) if (/light-dark\(/i.test(v)) bearing.add(k);
    for (const [k, v] of darkDecls) if (/light-dark\(/i.test(v)) bearing.add(k);
    // (ii) per-mode split — a token re-declared in `.dark` with a DIFFERENT value
    // resolves per-mode (the same class of leak: one static prop, two paints).
    for (const [k, dv] of darkDecls) {
        const rv = rootDecls.get(k);
        if (rv !== undefined && rv !== dv) bearing.add(k);
    }
    return bearing;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_CONSTELLATION_TOKENS_ARTIFACT",
        "AX-constellation-tokens",
    );
    const violations = [];
    const facts = {};

    if (!existsSync(TOKENS)) {
        violations.push("src/styles/tokens.css is absent");
    }
    if (!existsSync(FIELD)) {
        violations.push("constellationField.ts is absent");
    }

    let rootDecls = new Map();
    let darkDecls = new Map();
    if (existsSync(TOKENS)) {
        const css = stripCssComments(readMonolith(ROOT, "tokens"));
        // ALL `:root` arms (base + @supports light-dark() + @property cohorts).
        const rootBodies = selectorBodies(css, "(?:^|[\\s}])\\:root(?=\\s*\\{|\\s*,)");
        const darkBodies = selectorBodies(css, "(?:^|[\\s}])\\.dark(?=\\s*\\{|\\s*,)");
        for (const b of rootBodies) for (const [k, v] of parseDecls(b)) {
            if (!rootDecls.has(k)) rootDecls.set(k, v); // first :root arm wins (base)
        }
        for (const b of darkBodies) for (const [k, v] of parseDecls(b)) darkDecls.set(k, v);

        // ── (a) TOKEN-BLOCK-PRESENT — both arms ───────────────────────────────
        const rootHas = [...rootDecls.keys()].some((k) => k.startsWith("--constellation-"));
        const darkHas = [...darkDecls.keys()].some((k) => k.startsWith("--constellation-"));
        facts.rootArmPresent = rootHas;
        facts.darkArmPresent = darkHas;
        if (!rootHas)
            violations.push(
                "no `--constellation-*` token in a `:root` arm of tokens.css (the light arm is absent)",
            );
        if (!darkHas)
            violations.push(
                "no `--constellation-*` token in the `.dark` arm of tokens.css (the dark arm is absent)",
            );

        // ── (c) NO-LIGHT-DARK + TRANSITIVE-VAR ────────────────────────────────
        const bearing = lightDarkBearingTokens(rootDecls, darkDecls);
        facts.lightDarkBearingCount = bearing.size;
        const constellationDecls = [];
        for (const [k, v] of rootDecls) if (k.startsWith("--constellation-")) constellationDecls.push([k, v, ":root"]);
        for (const [k, v] of darkDecls) if (k.startsWith("--constellation-")) constellationDecls.push([k, v, ".dark"]);
        const cViolations = [];
        for (const [k, v, arm] of constellationDecls) {
            // literal light-dark()
            if (/light-dark\(/i.test(v)) {
                cViolations.push(
                    `${k} (${arm}) carries a literal \`light-dark(\` — Canvas2D silently rejects it (the W30 cardinal defect)`,
                );
            }
            // transitive var() → a light-dark()-bearing token
            for (const m of v.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)) {
                const ref = m[1];
                if (bearing.has(ref)) {
                    cViolations.push(
                        `${k} (${arm}) = \`${v}\` var()-references the light-dark()-bearing token \`${ref}\` — re-admits the Canvas2D leak TRANSITIVELY (write a plain-hsl literal, never alias the neutral ladder)`,
                    );
                }
            }
        }
        facts.noLightDarkViolations = cViolations;
        violations.push(...cViolations);
    }

    // ── (b) READPALETTE-FULL-SET ─────────────────────────────────────────────
    // readPalette lives in constellationDraw.ts post-W-GOD1 carve (the palette
    // read feeds ONLY the draw pass, so it travelled with it).
    if (existsSync(DRAW)) {
        const field = stripTsComments(readFileSync(DRAW, "utf8"));
        // The readPalette body — from `export function readPalette` to its close.
        const fnStart = field.indexOf("export function readPalette");
        const fnSrc = fnStart >= 0 ? field.slice(fnStart) : field;
        const read = REQUIRED_TOKENS.filter((t) => fnSrc.includes(`"${t}"`));
        facts.readPaletteTokens = read;
        facts.readPaletteCount = read.length;
        if (read.length < 6) {
            const missing = REQUIRED_TOKENS.filter((t) => !read.includes(t));
            violations.push(
                `readPalette reads only ${read.length} of the 6 canonical \`--constellation-*\` tokens (missing: ${missing.join(", ")}) — the FULL legibility set must route through the getComputedStyle probe`,
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:constellation-tokens",
        facts,
        violations,
    });

    console.log(
        "proof:constellation-tokens — the Canvas2D-SAFE --constellation-* token gate (AX.W17)",
    );
    console.log(`  TOKEN-BLOCK-PRESENT (both arms): ${facts.rootArmPresent && facts.darkArmPresent ? "yes ✓" : "NO ✗"}`);
    console.log(`  READPALETTE-FULL-SET (≥6)      : ${(facts.readPaletteCount ?? 0) >= 6 ? "yes ✓" : "NO ✗"} (${facts.readPaletteCount ?? 0}/6)`);
    console.log(`  NO-LIGHT-DARK + TRANSITIVE-VAR : ${(facts.noLightDarkViolations?.length ?? 0) === 0 ? "yes ✓" : "NO ✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
