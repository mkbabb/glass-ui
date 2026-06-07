#!/usr/bin/env node
// AW.W17 — proof:constellation-substrate-single.
//
// The Constellation lattice was GATED-NOT-LANDED at AV.W8 (1 consumer). It lands
// at AW.W17 with consumer #1 (the demo story) + consumer #2 (the slides deck,
// H.W10). This gate freezes the THREE invariants that keep the library surface
// clean of deck-domain content and the substrate single-source:
//
//   SUBSTRATE-EXISTS — `useCanvas2D.ts` exports `createCanvas2D` AND carries the
//     same park/freeze machinery as `useWebGLCanvas` (the suspend Set gating one
//     isRunning, the content-visibility offscreen hook, the tab-hidden owner, the
//     LIVE reduced-motion matchMedia `change` re-monitor).
//   PRNG-SINGLE-SOURCE — `Constellation.vue` imports `mulberry32`/`hashString`
//     from `utils/prng` (the shipped single-source PRNG), NOT a private re-roll.
//   ANOMALY-IS-SKIN — NO `ncsu`/`anomaly`/`Fira Code`/`accentColor` literal lives
//     anywhere in `src/components/custom/constellation/*`. The branded NC-red
//     anomaly + dashed Fira-Code callout reach the canvas ONLY via the consumer's
//     `drawOverlay` injection.
//
// Born RED on HEAD before the substrate + component land. Bite: re-roll a private
// `mulberry32` in the constellation dir → PRNG clause reddens; paint an `anomaly`
// pass in `constellationField.ts` → ANOMALY clause reddens; drop the substrate's
// matchMedia re-monitor → SUBSTRATE clause reddens.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        SUBSTRATE: resolve(ROOT, "src/composables/glass/canvas2d/useCanvas2D.ts"),
        SUBSTRATE_BARREL: resolve(ROOT, "src/composables/glass/canvas2d/index.ts"),
        COMPONENT: resolve(ROOT, "src/components/custom/constellation/Constellation.vue"),
        FIELD: resolve(ROOT, "src/components/custom/constellation/constellationField.ts"),
        DIR: resolve(ROOT, "src/components/custom/constellation"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_CONSTELLATION_ARTIFACT",
            "AW-constellation-substrate-single",
        ),
    };
}

function run() {
    const { ROOT, SUBSTRATE, SUBSTRATE_BARREL, COMPONENT, FIELD, DIR, ARTIFACT } =
        cliPaths();
    const violations = [];
    const facts = {};

    // ── SUBSTRATE-EXISTS ──────────────────────────────────────────────────────
    if (!existsSync(SUBSTRATE)) {
        violations.push("the useCanvas2D substrate is absent");
        facts.substrateExists = false;
    } else {
        const sub = stripComments(readFileSync(SUBSTRATE, "utf8"));
        facts.substrateExists = true;
        facts.exportsFactory = /export function createCanvas2D/.test(sub);
        facts.hasSuspendSet =
            /new Set</.test(sub) && /isRunning\b/.test(sub);
        facts.hasContentVisibility =
            /contentvisibilityautostatechange/.test(sub) &&
            /suspend\(\s*["']off-screen["']\s*\)/.test(sub);
        facts.hasTabHidden =
            /visibilitychange/.test(sub) &&
            /document\.hidden/.test(sub) &&
            /suspend\(\s*["']tab-hidden["']\s*\)/.test(sub);
        facts.hasReducedMotionReMonitor =
            /matchMedia\(\s*["'`]\(prefers-reduced-motion: reduce\)["'`]\s*\)/.test(sub) &&
            /addEventListener\(\s*["']change["']/.test(sub);
        facts.hasDispose = /function dispose\b/.test(sub);

        if (!facts.exportsFactory)
            violations.push("useCanvas2D does not export `createCanvas2D`");
        if (!facts.hasSuspendSet)
            violations.push(
                "useCanvas2D has no suspend Set gating `isRunning()` (the demand-driven park model)",
            );
        if (!facts.hasContentVisibility)
            violations.push(
                "useCanvas2D has no content-visibility offscreen-park (no `contentvisibilityautostatechange` → `suspend(\"off-screen\")`)",
            );
        if (!facts.hasTabHidden)
            violations.push(
                "useCanvas2D does not park on `document.hidden` (no `visibilitychange` → `suspend(\"tab-hidden\")`)",
            );
        if (!facts.hasReducedMotionReMonitor)
            violations.push(
                "useCanvas2D does not LIVE-monitor `prefers-reduced-motion` (no `matchMedia` `change` re-monitor)",
            );
        if (!facts.hasDispose)
            violations.push("useCanvas2D has no `dispose()` teardown");
    }
    facts.substrateBarrelExists = existsSync(SUBSTRATE_BARREL);
    if (facts.substrateExists && !facts.substrateBarrelExists)
        violations.push("the canvas2d/ barrel is absent");

    // ── PRNG-SINGLE-SOURCE ────────────────────────────────────────────────────
    if (!existsSync(COMPONENT)) {
        violations.push("Constellation.vue is absent");
        facts.componentExists = false;
    } else {
        const comp = stripComments(readFileSync(COMPONENT, "utf8"));
        facts.componentExists = true;
        // The prng symbols must come FROM the shared utils/prng leaf.
        facts.prngImportFromShared =
            /import\s*\{[^}]*\b(mulberry32|hashString)\b[^}]*\}\s*from\s*["'][^"']*utils\/prng["']/.test(
                comp,
            );
        if (!facts.prngImportFromShared)
            violations.push(
                "Constellation.vue does not import `mulberry32`/`hashString` from `utils/prng` (the single-source PRNG) — a private re-roll is the regression",
            );
    }

    // ── ANOMALY-IS-SKIN — no deck-domain literal anywhere in the dir ──────────
    const FORBIDDEN = [/ncsu/i, /anomaly/i, /Fira Code/i, /accentColor/];
    const dirHits = [];
    if (existsSync(DIR)) {
        for (const file of readdirSync(DIR)) {
            // The README is allowed to NAME the seam (it documents "the anomaly is
            // a consumer overlay"); the source files must carry zero domain skin.
            if (!/\.(ts|vue)$/.test(file)) continue;
            const src = readFileSync(resolve(DIR, file), "utf8");
            for (const re of FORBIDDEN) {
                if (re.test(src)) dirHits.push(`${file} :: ${re}`);
            }
        }
    }
    facts.anomalySkinAbsent = dirHits.length === 0;
    facts.dirHits = dirHits;
    if (!facts.anomalySkinAbsent)
        violations.push(
            `deck-domain skin literal found in the constellation source (must live in a consumer drawOverlay): ${dirHits.join("; ")}`,
        );

    // ── field engine carries the four NEUTRAL passes, no anomaly pass ─────────
    if (existsSync(FIELD)) {
        const fld = stripComments(readFileSync(FIELD, "utf8"));
        facts.hasNeutralPasses =
            /export function drawEdges/.test(fld) &&
            /export function drawNodes/.test(fld) &&
            /export function drawPointerWeb/.test(fld) &&
            /export function drawRipples/.test(fld);
        if (!facts.hasNeutralPasses)
            violations.push(
                "constellationField.ts does not export the four neutral passes (drawEdges/drawNodes/drawPointerWeb/drawRipples)",
            );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:constellation-substrate-single",
        facts,
        violations,
    });

    console.log(
        "proof:constellation-substrate-single — useCanvas2D + Constellation, single-source prng, anomaly-is-skin (AW.W17)",
    );
    console.log(`  SUBSTRATE-EXISTS  : ${facts.exportsFactory ? "yes ✓" : "NO ✗"}`);
    console.log(
        `  PRNG-SINGLE-SOURCE: ${facts.prngImportFromShared ? "yes ✓" : "NO ✗"}`,
    );
    console.log(`  ANOMALY-IS-SKIN   : ${facts.anomalySkinAbsent ? "yes ✓" : "NO ✗"}`);
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
