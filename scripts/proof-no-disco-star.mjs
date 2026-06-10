#!/usr/bin/env node
// D6.b — proof:no-disco-star, the disco-star EXCISION gate.
//
// The user's named removal, verbatim: "plan to remove the disco star from all
// glass-ui elements." The `✦` four-point star + its `sparkle-sweep` diagonal
// sweep was the one garish gesture in an otherwise deft library. This gate
// asserts the star is GONE from every live surface and never creeps back.
//
// WHAT IT FORBIDS (a LIVE trigger, scanned over the COMMENT-STRIPPED CSS so a
// deprecation/excision note that NAMES the star to document its removal does not
// trip the gate — the precept-correct form: scan the EFFECTIVE stylesheet, not
// the raw prose):
//   • a `content:` declaration whose value contains the `✦` glyph
//     (the literal sparkle character the `::after` painted), AND
//   • an `animation` / `animation-name` declaration that references the
//     `sparkle-sweep` keyframe (the hover trigger).
//
// WHAT IT ALLOWS (exactly one survivor):
//   • the TOMBSTONE — an EMPTY `@keyframes sparkle-sweep {}` (animations.css),
//     kept ONE minor so an out-of-tree consumer (the slides decks) resolves a
//     no-op animation rather than an unknown-animation error. The empty body
//     carries no `0% {}`/transform/opacity steps. A NON-empty `@keyframes
//     sparkle-sweep` reddens the gate (a revived star definition).
//
// This is a SOURCE-STRUCTURE gate (it parses the effective CSS and asserts the
// ABSENCE of two declaration forms) — born-RED on the unfixed HEAD (the `✦`
// `::after` + the `&:hover::after { animation: sparkle-sweep … }` both present),
// GREEN after the excision.
//
// SELF-TEST (the planted-fixture discipline): `node proof-no-disco-star.mjs
// --selftest` plants BOTH a live `content:"✦"` and a live `animation:
// sparkle-sweep` trigger into an in-memory fixture and asserts the detector
// REDDENS on each — proving the gate bites, not a vacuous pass.
//
// bite-check: re-add `content:"✦"` to any `::after` → the glyph clause reddens;
// re-add `animation: sparkle-sweep …` to any rule → the trigger clause reddens;
// give the tombstone a non-empty body → the tombstone clause reddens.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMMAND = "npm run proof:no-disco-star";

/** Strip `/* … *\/` CSS comments so documentary mentions of the star (the
 *  deprecation notes naming `sparkle-sweep` / `✦`) are not scanned as code. */
function stripCssComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Walk src/ collecting .css + .vue files (the surfaces that can paint a star). */
function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        if (statSync(p).isDirectory()) walk(p, acc);
        else if (/\.(css|vue)$/.test(n)) acc.push(p);
    }
    return acc;
}

// ── The two live-trigger forms (scanned over comment-stripped CSS) ──
// A `content:` value containing the star glyph (the `::after` paint).
const GLYPH_TRIGGER = /content\s*:\s*[^;{}]*✦/g;
// An `animation`/`animation-name` value referencing the keyframe (the hover sweep).
const ANIM_TRIGGER = /animation(?:-name)?\s*:[^;{}]*\bsparkle-sweep\b/g;
// A NON-empty `@keyframes sparkle-sweep { … }` (a revived definition). The
// tombstone body is empty (only whitespace); any token inside reddens.
const KEYFRAME_BODY = /@keyframes\s+sparkle-sweep\s*\{([\s\S]*?)\}/g;

/** Scan one file's effective (comment-stripped) CSS for live star triggers. */
function scanText(text, label) {
    const violations = [];
    const css = stripCssComments(text);

    for (const m of css.matchAll(GLYPH_TRIGGER)) {
        violations.push(
            `${label}: a live \`content:\` declaration paints the ✦ star glyph (${m[0].trim().slice(0, 60)}…) — the disco-star is EXCISED, delete it`,
        );
    }
    for (const m of css.matchAll(ANIM_TRIGGER)) {
        violations.push(
            `${label}: a live \`animation\` references the sparkle-sweep keyframe (${m[0].trim().slice(0, 60)}…) — the disco-star hover trigger is EXCISED, delete it`,
        );
    }
    for (const m of css.matchAll(KEYFRAME_BODY)) {
        // The tombstone keeps an EMPTY body. Any non-whitespace inside is a
        // revived star definition.
        if (m[1].trim().length > 0) {
            violations.push(
                `${label}: \`@keyframes sparkle-sweep\` has a NON-empty body — it must stay TOMBSTONED (empty) until the 3.11 delete`,
            );
        }
    }
    return violations;
}

export function detect() {
    const violations = [];
    const facts = { filesScanned: 0, glyphTriggers: 0, animTriggers: 0, tombstonePresent: false };

    for (const file of walk(SRC)) {
        facts.filesScanned++;
        const text = readFileSync(file, "utf8");
        const css = stripCssComments(text);
        if (/@keyframes\s+sparkle-sweep\b/.test(css)) facts.tombstonePresent = true;
        facts.glyphTriggers += [...css.matchAll(GLYPH_TRIGGER)].length;
        facts.animTriggers += [...css.matchAll(ANIM_TRIGGER)].length;
        violations.push(...scanText(text, file.slice(ROOT.length + 1)));
    }

    return { facts, violations };
}

// ── Self-test: plant live fixtures, assert the detector bites ──
function selftest() {
    const cases = [
        {
            name: "live ✦ content glyph",
            css: `.btn::after { content: "✦"; color: white; }`,
            expectMatch: GLYPH_TRIGGER,
        },
        {
            name: "live sparkle-sweep animation trigger",
            css: `.btn:hover::after { animation: sparkle-sweep var(--duration-sparkle) ease; }`,
            expectMatch: ANIM_TRIGGER,
        },
        {
            name: "revived non-empty @keyframes",
            css: `@keyframes sparkle-sweep { 0% { opacity: 0; } }`,
            expectMatch: KEYFRAME_BODY,
        },
    ];
    let ok = true;
    for (const c of cases) {
        const v = scanText(c.css, "<fixture>");
        const bit = v.length > 0;
        console.log(`  selftest [${c.name}] → ${bit ? "REDDENS ✓" : "MISSED ✗"}`);
        if (!bit) ok = false;
    }
    // And the inverse: a documentary comment naming the star must NOT redden.
    const docComment = `/* the ✦ star + animation: sparkle-sweep are EXCISED (D6.b) */`;
    const docV = scanText(docComment, "<fixture-comment>");
    const docGreen = docV.length === 0;
    console.log(`  selftest [doc comment naming the star] → ${docGreen ? "stays GREEN ✓" : "false-reddens ✗"}`);
    if (!docGreen) ok = false;
    // The tombstone (empty body) must NOT redden.
    const tomb = `@keyframes sparkle-sweep {\n  /* tombstoned */\n}`;
    const tombGreen = scanText(tomb, "<fixture-tombstone>").length === 0;
    console.log(`  selftest [empty tombstone] → ${tombGreen ? "stays GREEN ✓" : "false-reddens ✗"}`);
    if (!tombGreen) ok = false;

    console.log(`\n  selftest: ${ok ? "PASS (the gate bites)" : "FAIL (the gate is vacuous)"}`);
    process.exit(ok ? 0 : 1);
}

function run() {
    if (process.argv.includes("--selftest")) return selftest();

    const ARTIFACT = gateArtifactPath("GLASS_UI_NO_DISCO_STAR_ARTIFACT", "D6-no-disco-star");
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-disco-star",
        facts,
        violations,
    });

    console.log("proof:no-disco-star — the disco-star is excised; zero live ✦/sparkle-sweep triggers (D6.b)");
    console.log(`  files scanned     : ${facts.filesScanned}`);
    console.log(`  ✦ glyph triggers  : ${facts.glyphTriggers}`);
    console.log(`  sparkle triggers  : ${facts.animTriggers}`);
    console.log(`  tombstone present : ${facts.tombstonePresent ? "yes (empty keyframe kept for 3.10)" : "no"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
