#!/usr/bin/env node
// D6.c M1 — proof:crayon-wipe-compositor, the crayon-wipe compositor-purity gate.
//
// The scroll-scrubbed crayon draw-on (ds2-motion-field M1) re-mechanizes the
// hand-mark draw from `stroke-dashoffset` (which re-rasters the static grain
// `feTurbulence` filter EVERY frame) to a `clip-path: inset()` wipe — the
// compositor-eligible, FILTER-STABLE draw. The cardinal discipline: the grain
// filter rasters ONCE; the wipe animates on the compositor and never touches it.
// This gate is the standing guard that the `@keyframes crayon-wipe` keyframe
// animates `clip-path` and ONLY `clip-path` — never an animated property that
// would (a) re-raster the static grain filter (`filter`, `stroke-dashoffset`,
// `background`) or (b) double the motion budget with an opacity/transform leg the
// `clip-path` wipe already expresses.
//
// THE TWO ASSERTS (a grep-class proof over the comment-stripped keyframe body):
//   A. PRESENT + ANIMATES clip-path — the `@keyframes crayon-wipe` exists and every
//      keyframe step declares `clip-path` (the `from` clip is `inset(0 100% 0 0)`
//      = fully hidden, the `to` is `inset(0 0 0 0)` = fully drawn). A keyframe that
//      named no `clip-path` would animate nothing (or worse, animate a default).
//   B. clip-path ONLY — NO other animatable property appears in any step. The
//      forbidden set is the raster-forcing + budget-doubling cohort:
//        `filter` / `backdrop-filter`  → re-rasters the grain `feTurbulence`,
//        `stroke-dashoffset`           → the OLD draw mechanic this REPLACES,
//        `background` / `background-*` → repaints the surface every frame,
//        `opacity` / `transform` / `translate` / `scale` / `rotate`
//                                      → a second motion leg the wipe subsumes.
//      A `clip-path`-only keyframe promotes its own compositor layer and leaves
//      the static filter untouched — the "filter applied ONCE" discipline.
//
// This is a device-free SOURCE gate (a parse of animations.css), the same shape
// as proof:no-disco-star / proof:liquid-glass-material — the PAINTED scrub is a
// live/π concern; the COMPOSITOR-PURITY of the keyframe is a source invariant.
//
// SELF-TEST (the planted-fixture discipline): `node
// proof-crayon-wipe-compositor.mjs --selftest` plants a keyframe with an added
// `opacity` leg + one with a `filter` leg + one with NO clip-path, and asserts the
// detector REDDENS on each — proving the gate bites, not a vacuous pass.
//
// bite-checks (the born-RED witnesses this gate inverts):
//   • add `opacity: 0` to the `from` step → the clip-path-ONLY clause reddens.
//   • add `filter: blur(2px)` to any step → the raster-forcing clause reddens.
//   • re-introduce a `stroke-dashoffset` leg → reddens (the old draw mechanic).
//   • delete the `clip-path` declarations → the animates-clip-path clause reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// The forbidden animatable properties — a label → matcher over the keyframe body.
// Each is either a raster-forcer (re-runs the static grain filter / repaints) or a
// budget-doubling second leg the clip-path wipe already expresses. `clip-path` is
// the ONLY property the wipe keyframe may animate.
const FORBIDDEN = [
    ["filter", /(^|[^-])\bfilter\s*:/],
    ["backdrop-filter", /\bbackdrop-filter\s*:/],
    ["stroke-dashoffset", /\bstroke-dashoffset\s*:/],
    ["stroke-dasharray", /\bstroke-dasharray\s*:/],
    ["background", /\bbackground(?:-[a-z]+)?\s*:/],
    ["opacity", /\bopacity\s*:/],
    ["transform", /\btransform\s*:/],
    ["translate", /\btranslate\s*:/],
    ["scale", /\bscale\s*:/],
    ["rotate", /\brotate\s*:/],
];

/**
 * Extract the body of `@keyframes crayon-wipe { … }` (the steps between the outer
 * braces). Returns the raw body text, or null if the keyframe is absent.
 */
function crayonWipeBody(src) {
    const m = src.match(/@keyframes\s+crayon-wipe\s*\{([\s\S]*?\})\s*\}/);
    // The greedy-to-last-inner-brace capture: the keyframe body itself contains
    // nested `{ … }` step blocks, so we capture up to the matching OUTER brace by
    // counting. A robust manual scan:
    const at = src.search(/@keyframes\s+crayon-wipe\s*\{/);
    if (at === -1) return null;
    const open = src.indexOf("{", at);
    let depth = 0;
    for (let i = open; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
            depth--;
            if (depth === 0) return src.slice(open + 1, i);
        }
    }
    return m ? m[1] : null;
}

/**
 * Pure detector over a stylesheet's effective CSS. Returns `{ facts, violations }`
 * for the crayon-wipe keyframe — exported so the self-test drives it in memory.
 */
export function detectCrayonWipe(css, label = "animations.css") {
    const violations = [];
    const facts = {};
    const src = stripComments(css);

    const body = crayonWipeBody(src);
    facts.keyframePresent = Boolean(body);
    if (!body) {
        violations.push(
            `${label}: no \`@keyframes crayon-wipe\` — the scroll-scrubbed crayon draw-on keyframe is absent (D6.c M1)`,
        );
        return { facts, violations };
    }

    // ── A. animates clip-path (every meaningful step declares it). ──
    const clipDecls = (body.match(/\bclip-path\s*:/g) || []).length;
    facts.clipPathDeclCount = clipDecls;
    // The from/to (or 0%/100%) pair → ≥2 clip-path declarations.
    if (clipDecls < 2) {
        violations.push(
            `${label}: \`@keyframes crayon-wipe\` declares clip-path ${clipDecls} time(s); the from/to wipe needs ≥2 (the inset(0 100% 0 0) → inset(0) pair) (D6.c M1)`,
        );
    }
    // The `from` (hidden) clip is the right-inset 100% form, the `to` is inset(0).
    facts.hasHiddenStart = /clip-path\s*:\s*inset\(\s*0\s+100%/.test(body);
    facts.hasDrawnEnd = /clip-path\s*:\s*inset\(\s*0(\s+0){0,3}\s*\)/.test(body);
    if (!facts.hasHiddenStart) {
        violations.push(
            `${label}: \`@keyframes crayon-wipe\` has no hidden start (\`clip-path: inset(0 100% 0 0)\`) — the mark does not start fully clipped (nothing-drawn) (D6.c M1)`,
        );
    }
    if (!facts.hasDrawnEnd) {
        violations.push(
            `${label}: \`@keyframes crayon-wipe\` has no drawn end (\`clip-path: inset(0 …)\` reaching inset(0)) — the mark does not finish fully revealed (D6.c M1)`,
        );
    }

    // ── B. clip-path ONLY — no raster-forcing / budget-doubling property. ──
    const offenders = [];
    for (const [name, re] of FORBIDDEN) {
        if (re.test(body)) offenders.push(name);
    }
    facts.forbiddenProps = offenders;
    if (offenders.length > 0) {
        violations.push(
            `${label}: \`@keyframes crayon-wipe\` animates non-clip-path propert${offenders.length === 1 ? "y" : "ies"} [${offenders.join(", ")}] — the wipe must animate clip-path ONLY (a filter/background/stroke leg re-rasters the static grain; an opacity/transform leg doubles the motion budget) (D6.c M1)`,
        );
    }

    return { facts, violations };
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        ANIMATIONS: resolve(ROOT, "src/styles/animations.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_CRAYON_WIPE_COMPOSITOR_ARTIFACT",
            "D6-crayon-wipe-compositor",
        ),
    };
    return _cliPaths;
}

// ── Self-test: plant born-RED fixtures, assert the detector bites ──
function selftest() {
    const cases = [
        {
            name: "added opacity leg",
            css: `@keyframes crayon-wipe { from { clip-path: inset(0 100% 0 0); opacity: 0; } to { clip-path: inset(0 0 0 0); opacity: 1; } }`,
            wantClause: "opacity",
        },
        {
            name: "added filter leg (re-rasters grain)",
            css: `@keyframes crayon-wipe { from { clip-path: inset(0 100% 0 0); filter: blur(2px); } to { clip-path: inset(0 0 0 0); } }`,
            wantClause: "filter",
        },
        {
            name: "stroke-dashoffset (the OLD mechanic)",
            css: `@keyframes crayon-wipe { from { stroke-dashoffset: 100; clip-path: inset(0 100% 0 0); } to { stroke-dashoffset: 0; clip-path: inset(0 0 0 0); } }`,
            wantClause: "stroke-dashoffset",
        },
        {
            name: "no clip-path at all",
            css: `@keyframes crayon-wipe { from { opacity: 0; } to { opacity: 1; } }`,
            wantClause: "declares clip-path 0 time",
        },
        {
            name: "keyframe absent",
            css: `@keyframes other-thing { from { opacity: 0; } }`,
            wantClause: "no `@keyframes crayon-wipe`",
        },
    ];
    let ok = true;
    for (const c of cases) {
        const { violations } = detectCrayonWipe(c.css, "<fixture>");
        const bit = violations.some((v) => v.includes(c.wantClause));
        console.log(`  selftest [${c.name}] → ${bit ? "REDDENS ✓" : "MISSED ✗"}`);
        if (!bit) ok = false;
    }
    // The inverse: the CORRECT clip-path-only keyframe stays GREEN.
    const good = `@keyframes crayon-wipe {
        from { clip-path: inset(0 100% 0 0); }
        to   { clip-path: inset(0 0 0 0); }
    }`;
    const goodGreen = detectCrayonWipe(good, "<fixture-good>").violations.length === 0;
    console.log(`  selftest [correct clip-path-only keyframe] → ${goodGreen ? "stays GREEN ✓" : "false-reddens ✗"}`);
    if (!goodGreen) ok = false;

    console.log(`\n  selftest: ${ok ? "PASS (the gate bites)" : "FAIL (the gate is vacuous)"}`);
    process.exit(ok ? 0 : 1);
}

function run() {
    if (process.argv.includes("--selftest")) return selftest();

    const { ROOT, ANIMATIONS, ARTIFACT } = cliPaths();
    const violations = [];
    let facts = {};

    if (!existsSync(ANIMATIONS)) {
        violations.push("animations.css is absent");
    } else {
        const res = detectCrayonWipe(
            readFileSync(ANIMATIONS, "utf8"),
            "src/styles/animations.css",
        );
        facts = res.facts;
        violations.push(...res.violations);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:crayon-wipe-compositor",
        facts,
        violations,
    });

    console.log(
        "proof:crayon-wipe-compositor — the crayon-wipe keyframe animates clip-path ONLY (filter-stable, compositor-eligible) (D6.c M1)",
    );
    console.log(
        `  keyframe            : present=${facts.keyframePresent ? "✓" : "✗"}  clip-path decls=${facts.clipPathDeclCount ?? 0}`,
    );
    console.log(
        `  wipe bounds         : hidden-start inset(0 100%)=${facts.hasHiddenStart ? "✓" : "✗"}  drawn-end inset(0)=${facts.hasDrawnEnd ? "✓" : "✗"}`,
    );
    console.log(
        `  compositor-pure     : forbidden props=${facts.forbiddenProps && facts.forbiddenProps.length ? facts.forbiddenProps.join(", ") + " ✗" : "none ✓"}`,
    );
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
