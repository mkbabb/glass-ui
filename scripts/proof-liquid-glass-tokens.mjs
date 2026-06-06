#!/usr/bin/env node
// AV.W15 — the iOS-26 Liquid Glass token-evolution gate (proof:liquid-glass-tokens).
//
// A STATIC CSS-assertion gate over the source CSS (the wave is token-edit-shaped;
// the CSS lint IS the proof per the wave §7). It asserts the new material tokens
// exist + are wired, the moving specular carries its mandatory guards, and the
// accessibility contracts (PRM static paint, reduced-transparency drop, @supports
// gating, the AA floors) survive.
//
// Born RED: at the pre-fold HEAD none of the new tokens/recipes exist, so every
// clause fails. Greens only once Lane A mints the tokens + wiring, Lane B ships
// the moving-specular rung + the reduced-motion/var-fallback/@supports guards.
//
// inv ε / bite-check: remove any minted token or strip any guard → the matching
// clause reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_LIQUID_GLASS_ARTIFACT",
    "W15-liquid-glass-tokens",
);

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const tokens = read("src/styles/tokens.css");
const glass = read("src/styles/glass.css");
const dock = read("src/styles/dock.css");
const specular = read("src/styles/glass-specular-track.css");
const indexCss = read("src/styles/index.css");

const violations = [];
const facts = {};

function assert(label, ok) {
    facts[label] = Boolean(ok);
    if (!ok) violations.push(label);
}

// ── (a) --glass-edge-light{,-dark} resolve AND are wired onto floating/dock ──
assert(
    "edge-light token declared",
    /--glass-edge-light:\s*inset/.test(tokens),
);
assert(
    "edge-light-dark token declared",
    /--glass-edge-light-dark:\s*inset/.test(tokens),
);
assert(
    "edge-light remaps inside .dark",
    /--glass-edge-light:\s*var\(--glass-edge-light-dark\)/.test(tokens),
);
assert(
    "edge-light wired onto floating tier",
    /\.glass-floating\s*\{[^}]*var\(--glass-edge-light\)/s.test(glass),
);
assert(
    "edge-light wired onto dock tier",
    /var\(--glass-edge-light\)/.test(dock),
);
// The rim is a FULL-PERIMETER inset ring (four-edge `inset 0 0 0 Npx`), distinct
// from the top-only `--glass-highlight` (`inset 0 0.5px 0 0`).
assert(
    "edge-light is a full-perimeter ring (inset 0 0 0 Npx), not top-only",
    /--glass-edge-light:\s*inset 0 0 0 [\d.]+px/.test(tokens),
);

// ── (b) the quiet rung's backdrop-filter chains saturate (rung parity) ──
const quietBlur = tokens.match(/--glass-blur-quiet:\s*([^;]+);/)?.[1] ?? "";
facts.quietBlurChain = quietBlur.trim();
assert("quiet rung chains saturate", /saturate\(/.test(quietBlur));
assert("quiet rung chains brightness", /brightness\(/.test(quietBlur));

// ── (c) the content-aware under-shadow modifier swaps to a heavier rung ──
assert(
    "content-aware modifier .glass-over-text / [data-over-content] present",
    /\.glass-over-text|\[data-over-content/.test(glass),
);
// quiet→default over text (the heavier rung swap).
assert(
    "over-text swaps quiet → --glass-under-shadow-default",
    /\.glass-quiet(\.glass-over-text|\[data-over-content="text"\])[^{]*\{[^}]*var\(--glass-under-shadow-default\)/s.test(
        glass,
    ),
);
// resting→vivid over text.
assert(
    "over-text swaps resting → --glass-under-shadow-vivid",
    /\.glass-resting(\.glass-over-text|\[data-over-content="text"\])[^{]*\{[^}]*var\(--glass-under-shadow-vivid\)/s.test(
        glass,
    ),
);
// the inverse — lighten over solid-light.
assert(
    "inverse over-solid lightens a rung",
    /\[data-over-content="solid"\]/.test(glass),
);

// ── (d) the @property --specular-* registrations exist ──
for (const name of ["--specular-x", "--specular-y", "--specular-intensity"]) {
    assert(
        `@property ${name} registered`,
        new RegExp(`@property\\s+${name}\\s*\\{`).test(tokens),
    );
}
assert(
    "--specular-x/y registered as <percentage>",
    /@property\s+--specular-x\s*\{[^}]*syntax:\s*"<percentage>"/s.test(tokens),
);
assert(
    "--specular-intensity registered as <number>",
    /@property\s+--specular-intensity\s*\{[^}]*syntax:\s*"<number>"/s.test(tokens),
);

// ── (e) the moving specular: pointer-tracked + STATIC under reduced-motion +
//        a centred var() fallback ──
assert("glass-specular-track.css present", specular.length > 0);
assert(
    "glass-specular-track imported in index.css cascade",
    /@import\s*"\.\/glass-specular-track\.css"/.test(indexCss),
);
assert(
    ".glass-specular-track opt-in class present",
    /\.glass-specular-track\b/.test(specular),
);
assert(
    "specular maps the consumer --mouse-x/--mouse-y write",
    /var\(--mouse-x/.test(specular) && /var\(--mouse-y/.test(specular),
);
assert(
    "specular paints a masked radial-gradient that tracks --specular-x/y",
    /radial-gradient\([^)]*var\(--specular-x/.test(specular) &&
        /mask-image:/.test(specular),
);
// centred var() fallback — `var(--specular-x, 50%)` paints centred without the
// typed-property animation.
assert(
    "centred var() fallback (50%) on --specular-x/y",
    /var\(--specular-x,\s*50%\)/.test(specular) &&
        /var\(--specular-y,\s*50%\)/.test(specular),
);
// the MANDATORY reduced-motion static bracket — pins position to centre + kills
// the transition.
const prmBlock =
    specular.match(
        /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/,
    )?.[1] ?? "";
facts.reducedMotionBracketLen = prmBlock.length;
assert(
    "reduced-motion bracket pins specular static (50%) + transition:none",
    /--specular-x:\s*50%/.test(prmBlock) &&
        /--specular-y:\s*50%/.test(prmBlock) &&
        /transition:\s*none/.test(prmBlock),
);

// ── (f) the per-rung saturate maps to the opacity-only register under
//        prefers-reduced-transparency: reduce (the saturate DROPS with the blur) ──
const reducedTransp =
    glass.match(
        /@media\s*\(prefers-reduced-transparency:\s*reduce\)\s*\{([\s\S]*?)\n\}/,
    )?.[1] ?? "";
facts.reducedTransparencyBracketLen = reducedTransp.length;
// `--glass-blur-quiet: none` inside the bracket drops the whole chain
// (blur+saturate+brightness) — the saturate cannot survive when the blur drops.
assert(
    "reduced-transparency maps --glass-blur-quiet: none (drops the saturate chain)",
    /--glass-blur-quiet:\s*none/.test(reducedTransp),
);
// the specular rung also drops under reduced-transparency.
assert(
    "specular drops under reduced-transparency",
    /@media\s*\(prefers-reduced-transparency:\s*reduce\)/.test(specular),
);

// ── (g) the feDisplacementMap refraction garnish is @supports-gated PE-only ──
assert(
    "refraction garnish is @supports (backdrop-filter: url(...))-gated",
    /@supports\s*\(backdrop-filter:\s*url\(/.test(specular),
);
// the url(#…) backdrop-filter DECLARATION MUST appear ONLY inside the @supports
// block — the substrate (the .glass-specular-track base rule) carries NO url(#…)
// reference. Strip the @supports CONDITIONS (which legitimately name
// `backdrop-filter: url(...)` as the feature query) before counting declaration
// leaks, so the gate flags only a real declaration outside the gate.
const declOnly = specular.replace(/@supports\s*\([^)]*\)/g, "");
const urlDecls = [...declOnly.matchAll(/backdrop-filter:[^;{}]*url\(/g)];
facts.refractionUrlDecls = urlDecls.length;
// Every such DECLARATION must sit after the @supports opener (i.e. inside the
// gated block). The opener position in the original; the declaration position
// in the original — a declaration appearing before the opener is a substrate
// leak. Map declOnly indices back is fiddly, so re-scan the original for the
// declaration and compare to the opener.
const supportsOpener = specular.search(
    /@supports\s*\(backdrop-filter:\s*url\(/,
);
const realDecls = [
    ...specular.matchAll(
        /backdrop-filter:\s*var\(--glass-blur-[a-z]+\)\s+url\(/g,
    ),
];
const leaks = realDecls.filter(
    (m) => supportsOpener < 0 || m.index < supportsOpener,
);
facts.refractionLeaks = leaks.length;
assert(
    "no backdrop-filter url(#…) leaks outside the @supports gate",
    leaks.length === 0 && supportsOpener >= 0,
);

// ── (h) the AA contrast floors at tokens.css:332/339 survive ──
// The wave must not touch the neutral-5 muted-text rung (AA 5.23:1 / 4.91:1) nor
// the neutral-6 strong-muted rung (AA 7.79:1 / 7.31:1). The edge-light + moving
// specular are decoration layers over the GLASS surfaces, not text-color edits —
// assert the legibility-floor rungs are byte-unchanged.
assert(
    "neutral-5 muted-text AA floor (L40) intact",
    /--neutral-5:\s*hsl\(48\s+6%\s+40%\)/.test(tokens),
);
assert(
    "neutral-6 strong-muted AA floor (L30) intact",
    /--neutral-6:\s*hsl\(48\s+7%\s+30%\)/.test(tokens),
);
// the edge-light rim alpha is held low (decoration, must not eat legibility).
const edgeAlpha = tokens
    .match(/--glass-edge-light:\s*inset 0 0 0 [\d.]+px hsl\([^)]*\/\s*([\d.]+)\)/)?.[1];
facts.edgeLightAlpha = edgeAlpha ? Number(edgeAlpha) : null;
assert(
    "edge-light rim alpha ≤ 0.25 (decoration, not a legibility-eating border)",
    edgeAlpha != null && Number(edgeAlpha) <= 0.25,
);

const status = violations.length === 0 ? "pass" : "fail";
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status,
    gate: "proof:liquid-glass-tokens",
    facts,
    violations,
});

console.log(
    "proof:liquid-glass-tokens — the iOS-26 Liquid Glass token-evolution (AV.W15)",
);
console.log(`  edge-light rim       : ${facts["edge-light token declared"]}`);
console.log(`  quiet-rung saturate  : ${facts["quiet rung chains saturate"]}`);
console.log(
    `  @property specular   : ${facts["@property --specular-x registered"]}`,
);
console.log(
    `  reduced-motion static: ${facts["reduced-motion bracket pins specular static (50%) + transition:none"]}`,
);
console.log(
    `  refraction url leaks : ${facts.refractionLeaks} (must be 0)`,
);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(
    `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.exit(status === "pass" ? 0 : 1);
}
