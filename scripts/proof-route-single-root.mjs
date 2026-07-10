#!/usr/bin/env node
// BG.W-ROUTE-TRANSITION — proof:route-single-root, the routed-root hygiene assert.
//
// RE-SCOPED (the pass-4-converged decision). With NO Vue `<Transition>` wrapping the
// route swap, Vue's "Component inside <Transition> renders non-element root node"
// warning (runtime-core) CANNOT fire — it is gated on a transitioning component. So
// this gate is no longer a #7956-warning protector; it is a STRUCTURAL-HYGIENE assert
// for the bare keyed `<component :is :key="route.path" class="route-enter">` swap:
//
//   the `.route-enter` on-mount entrance class is applied to the keyed `<component>`,
//   which Vue forwards to the routed component's ROOT ELEMENT. A routed root that is
//   TEXT-ONLY, INTERPOLATION-ONLY, EMPTY, or TELEPORT-ONLY has no in-flow element to
//   receive the class (and breaks the live `main.children.length === 2` settle assert).
//
// The gate parses every ROUTED SFC's `<template>` and flags that genuine pathology. A
// single element root (the norm) passes; a component root (`<StoryPage>`, `<article>`)
// passes. AST-verified empty on the current tree (the routed SFCs all have an element
// root; NotFound's as-child `<Button>` is ONE element). + a planted bite: a synthetic
// text-root routed module MUST flag.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── pure helpers ─────────────────────────────────────────────────────────────
/** The routed `<cat>/<id>` rows — the `s("cat","id", …)` manifest factory calls. */
export function parseRoutedRows(manifestSrc) {
    const rows = [];
    const rowRe = /\bs\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
    let m;
    while ((m = rowRe.exec(manifestSrc))) rows.push(`${m[1]}/${m[2]}`);
    return rows;
}

/** Extract the SFC root `<template>` inner content (full, incl. nested templates). */
export function extractTemplate(sfcSrc) {
    const m = sfcSrc.match(/<template(?:\s[^>]*)?>([\s\S]*)<\/template>/);
    return m ? m[1] : null;
}

/**
 * Assert the routed template has an ELEMENT root that can carry `.route-enter`.
 * Flags the genuine pathology: empty / text-only / interpolation-only / teleport-only.
 * @returns {{ ok: boolean, reason: string }}
 */
export function checkRootElement(templateInner) {
    if (templateInner == null) return { ok: false, reason: "no <template> block found" };
    // Strip HTML comments, then trim.
    const t = templateInner.replace(/<!--[\s\S]*?-->/g, "").trim();
    if (t.length === 0) return { ok: false, reason: "empty template root (no element to carry .route-enter)" };
    if (!t.startsWith("<")) {
        return { ok: false, reason: "text/interpolation root (the routed root must start with an element, not text/{{…}})" };
    }
    const tag = t.match(/^<\s*([A-Za-z][\w.-]*)/);
    if (!tag) return { ok: false, reason: "could not resolve the root tag" };
    const name = tag[1];
    if (name.toLowerCase() === "teleport") {
        return { ok: false, reason: "teleport-only root (the routed root teleports away — no in-flow element for .route-enter)" };
    }
    return { ok: true, reason: "" };
}

// ── routed-SFC enumeration ───────────────────────────────────────────────────
function routedFiles(ROOT) {
    const manifestSrc = readFileSync(resolve(ROOT, "demo/stories/manifest.ts"), "utf8");
    const rows = parseRoutedRows(manifestSrc);
    const files = rows.map((r) => `demo/stories/${r}.vue`);
    // The category-landing route component + the catch-all 404 are routed too.
    files.push("demo/chassis/landing/SectionLanding.vue");
    files.push("demo/eggs/NotFound.vue");
    return [...new Set(files)];
}

// ── always-on self-test bite ─────────────────────────────────────────────────
function selfTest() {
    const failures = [];
    if (!checkRootElement("<article>real page</article>").ok) failures.push("bite A: an element root falsely flagged");
    if (!checkRootElement("<StoryPage><p>x</p></StoryPage>").ok) failures.push("bite B: a component root falsely flagged");
    if (checkRootElement("just plain text, no element").ok) failures.push("bite C: a text-only root did NOT flag");
    if (checkRootElement("{{ greeting }}").ok) failures.push("bite D: an interpolation-only root did NOT flag");
    if (checkRootElement("   ").ok) failures.push("bite E: an empty root did NOT flag");
    if (checkRootElement('<Teleport to="body"><div/></Teleport>').ok) failures.push("bite F: a teleport-only root did NOT flag");
    if (!checkRootElement("<!-- leading comment -->\n<div>x</div>").ok) failures.push("bite G: a comment-then-element root falsely flagged (comment strip broken)");
    return failures;
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ROUTE_SINGLE_ROOT_ARTIFACT",
        "BG-route-single-root",
    );
    const violations = [];
    const facts = { routedCount: 0, missingFiles: [], pathologicalRoots: [] };

    for (const rel of routedFiles(ROOT)) {
        const abs = resolve(ROOT, rel);
        if (!existsSync(abs)) {
            // A manifest row that points at a missing file is a different gate's
            // concern (proof:no-orphan-demo-route) — record but do not double-fail.
            facts.missingFiles.push(rel);
            continue;
        }
        facts.routedCount += 1;
        const { ok, reason } = checkRootElement(extractTemplate(readFileSync(abs, "utf8")));
        if (!ok) {
            facts.pathologicalRoots.push(rel);
            violations.push({ clause: "R1", msg: `${rel}: ${reason}` });
        }
    }

    const biteFailures = selfTest();
    for (const f of biteFailures) violations.push({ clause: "SELF-TEST", msg: f });

    const status = violations.length === 0 ? "pass" : "fail";
    facts.selfTestBites = biteFailures.length === 0 ? "7/7 GREEN" : biteFailures;
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:route-single-root",
        facts,
        violations,
    });

    console.log("proof:route-single-root — every routed SFC has an element root for the .route-enter swap (BG.W-ROUTE-TRANSITION)");
    console.log(`  routed SFCs        : ${facts.routedCount}`);
    console.log(`  pathological roots : ${facts.pathologicalRoots.length}`);
    console.log(`  self-test bites    : ${biteFailures.length === 0 ? "7/7 GREEN" : `${biteFailures.length} FAILED`}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ [${v.clause}] ${v.msg}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
