#!/usr/bin/env node
// AW.W11.c — the mood-resolution gate (proof:blob-mood-resolved).
//
// `useBlobMood` is ALREADY exported (goo-blob/index.ts) AND consumed by its own
// component, so by the overfitting-audit precept it is ALREADY load-bearing —
// KEEPING it is correct (excising an exported, consumed composable is a
// public-surface BREAK, not an orphan cleanup). The genuine question is NARROWER:
// the mood model's INTERNAL sub-orphans. This gate asserts no declared-but-UNREAD
// sub-orphan remains (NOT a >=2-external-consumer count):
//
//   1. setMood HAS an internal caller (the W11.c `update` wiring drives it from the
//      pointer/idle state) — not a dead retarget.
//   2. orbitSpeedScale + wobbleScale are READ by useBlobSatellites.tick (the orbit
//      consumes them) — not lerped-but-unread MoodParams.
//   3. the demo story binds every shipped mood — OR the collapse is recorded in
//      MIGRATION.md (the FALLBACK; not in effect here, the wire path is taken).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BLOB = resolve(ROOT, "src/components/custom/goo-blob");
    _cliPaths = {
        ROOT,
        MOOD: resolve(BLOB, "composables/useBlobMood.ts"),
        SATS: resolve(BLOB, "composables/useBlobSatellites.ts"),
        STORY: resolve(ROOT, "demo/stories/substrates/blob-mood.vue"),
        MIGRATION: resolve(ROOT, "MIGRATION.md"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_MOOD_RESOLVED_ARTIFACT",
            "AW-blob-mood-resolved",
        ),
    };
    return _cliPaths;
}

const MOODS = ["idle", "happy", "curious", "sleepy", "excited"];

function run() {
    const { ROOT, MOOD, SATS, STORY, MIGRATION, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const moodSrc = existsSync(MOOD) ? stripComments(readFileSync(MOOD, "utf8")) : "";
    const satsSrc = existsSync(SATS) ? stripComments(readFileSync(SATS, "utf8")) : "";

    // Detect the FALLBACK collapse: if useBlobMood is collapsed to an `energy`
    // scalar, the removal must be recorded in MIGRATION.md. (Not the wire path.)
    const collapsed = !/setMood/.test(moodSrc) || !/MoodParams/.test(moodSrc);
    facts.collapsed = collapsed;
    if (collapsed) {
        const migration = existsSync(MIGRATION) ? readFileSync(MIGRATION, "utf8") : "";
        facts.migrationRecordsRemoval = /useBlobMood/.test(migration);
        if (!facts.migrationRecordsRemoval)
            violations.push(
                "useBlobMood appears COLLAPSED but the public-surface removal is NOT recorded in MIGRATION.md (L invariant 4 — no silent alias)",
            );
    } else {
        // ── Sub-check 1: setMood has an internal caller (the `update` wiring). ──
        // The definition is `function setMood`; a CALL is `setMood(` elsewhere.
        const setMoodCalls = (moodSrc.match(/setMood\(/g) || []).length;
        // one is the definition signature; >1 means it is called internally.
        const hasUpdateCaller = /function update\(/.test(moodSrc) && setMoodCalls >= 2;
        facts.setMoodInternalCaller = hasUpdateCaller;
        if (!hasUpdateCaller)
            violations.push(
                "setMood has no internal caller — the W11.c `update` wiring must drive it from the pointer/idle state (else setMood is a dead retarget)",
            );

        // ── Sub-check 2: orbitSpeedScale + wobbleScale READ by the satellite tick.
        const orbitRead = /mood\.orbitSpeedScale|orbitSpeedScale\b/.test(satsSrc);
        const wobbleRead = /mood\.wobbleScale|wobbleScale\b/.test(satsSrc);
        facts.orbitSpeedScaleRead = orbitRead;
        facts.wobbleScaleRead = wobbleRead;
        if (!orbitRead)
            violations.push(
                "orbitSpeedScale is lerped in MoodParams but NOT read by useBlobSatellites.tick — a dead sub-orphan; consume it",
            );
        if (!wobbleRead)
            violations.push(
                "wobbleScale is lerped in MoodParams but NOT read by useBlobSatellites.tick — a dead sub-orphan; consume it",
            );

        // ── Sub-check 3: the demo story drives every shipped mood. ──
        if (!existsSync(STORY)) {
            violations.push(
                "the mood demo story demo/stories/substrates/blob-mood.vue is absent — it must exercise every shipped mood",
            );
            facts.story = { present: false };
        } else {
            const story = readFileSync(STORY, "utf8");
            const missing = MOODS.filter((m) => !story.includes(m));
            facts.story = { present: true, missingMoods: missing };
            if (missing.length)
                violations.push(
                    `the demo story does not drive every shipped mood (missing: ${missing.join(", ")})`,
                );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-mood-resolved",
        facts,
        violations,
    });

    console.log("proof:blob-mood-resolved — no UNREAD mood sub-orphan (AW.W11.c)");
    if (collapsed) {
        console.log(`  COLLAPSED path : MIGRATION records removal: ${facts.migrationRecordsRemoval ? "✓" : "✗"}`);
    } else {
        console.log(`  setMood caller : ${facts.setMoodInternalCaller ? "✓ (update wiring)" : "✗ dead retarget"}`);
        console.log(
            `  dead params    : orbitSpeedScale read ${facts.orbitSpeedScaleRead ? "✓" : "✗"} | wobbleScale read ${facts.wobbleScaleRead ? "✓" : "✗"}`,
        );
        console.log(`  demo moods     : ${facts.story ? JSON.stringify(facts.story) : "ABSENT"}`);
    }
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
