#!/usr/bin/env node
// proof:design-docs-files — BH.B4c-precept-extract-files: the design-doc extraction-files lock.
//
// BH carves the 4 glass-ui design docs (design-idioms · motion-canon · tunable-anim ·
// affordance-map) out of the `docs/precepts` SUBMODULE into a first-class repo home
// `docs/design/`. The FILES arm (B4c-files) ESTABLISHED the new home (a verbatim copy); the
// EXTRACTION arm (B4c-extraction, after WS2 = BG.W-DOCK-ENGINE-UNIFY) FRESHENS the DOCK_SPRING
// canon 0.32/0.7 → 0.68/0.64 so BH does not enshrine the pre-WS2 stale value (the 10
// precept-reader gate re-points are the separate B4c-gate-repoints [WS12] wave). This gate is
// the standing guard that the home LANDED, STAYS landed, AND carries the CURRENT dock canon:
// a future doc-slim / CLAUDE-delete / gate-rehome wave cannot silently drop a design doc, and
// a submodule re-copy cannot silently re-import the retired 0.32/0.7 dock spring.
//
// CLAUSES (F1-F3):
//   F1  EXTRACTED — each of the 4 design docs RESOLVES on disk in docs/design/ (exists AND
//       is non-trivially-sized, so an empty stub or a 0-byte placeholder REDs). Born-RED on
//       HEAD: docs/design/ does not exist, so all 4 are MISSING.
//   F2  IDENTITY — each extracted doc carries its expected H1 identity token, so a wrong /
//       truncated / stub file (right path, wrong content) REDs. The identity tokens are the
//       stable title words the freshening (numeric-value-only) never rewrites.
//   F3  DOCK-CANON-FRESH — the extracted motion-canon + tunable-anim docs carry the CURRENT
//       WS2 DOCK_SPRING (0.68, 0.64 via springPreset("dock")) and NOT the retired 0.32/0.7,
//       and tunable-anim's derived --spring-dock-duration reads the fresh 0.66s not 0.28s.
//       Born-RED on the pre-extraction docs (they carry the verbatim 0.32/0.7 + 0.28s).
//
// The foreign-tree fence (the files arm COPIES, never MOVES the submodule source) is the
// orchestrator's patch-scope guarantee — this gate locks the OUTCOME (the home exists + is
// fresh), not the submodule lifecycle (the upstream by-name-ask delete lands in mkbabb/precepts).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-design-docs-files.mjs --self-test` feeds the
// pure detectors synthetic fixtures — a missing doc (F1 RED), an empty stub (F1 RED), a
// wrong-identity doc (F2 RED), a stale-dock-value doc (F3 RED), a missing-fresh-value doc
// (F3 RED), a stale-duration doc (F3 RED) — each MUST flag, AND the real on-disk tree is clean.
//
// House style mirrors proof-tunable-anim.mjs / proof-affordance-map.mjs: ESM .mjs, a pure
// exported detector over an injected fileMap (so --self-test runs with no disk), a human
// summary, exit(1) on any violation.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

// The 4 design docs carved into docs/design/ + their stable H1 identity token.
export const DESIGN_DOCS = [
    { name: "design-idioms", title: "Design Idioms" },
    { name: "motion-canon", title: "motion canon" },
    { name: "tunable-anim", title: "tunable-anim" },
    { name: "affordance-map", title: "affordance-map" },
];

// A non-trivial doc floor — a real extracted design doc is kilobytes; a stub/placeholder is not.
const MIN_BYTES = 1024;

/**
 * Pure detector: given `read(path) -> string|null`, return the list of violations.
 * The real run injects a disk reader; --self-test injects a synthetic fixture map.
 */
export function auditDesignDocsFiles(read) {
    const violations = [];
    for (const doc of DESIGN_DOCS) {
        const path = `docs/design/${doc.name}.md`;
        const content = read(path);
        if (content == null) {
            violations.push(`F1 ${path} MISSING — the extraction-files home is incomplete.`);
            continue;
        }
        if (content.length < MIN_BYTES) {
            violations.push(
                `F1 ${path} too small (${content.length}B < ${MIN_BYTES}B) — an empty stub is not the extracted doc.`,
            );
        }
        const h1 = (content.split("\n", 1)[0] || "").trim();
        if (!h1.startsWith("#") || !h1.includes(doc.title)) {
            violations.push(
                `F2 ${path} H1 missing identity "${doc.title}" (got "${h1.slice(0, 64)}") — wrong/truncated content.`,
            );
        }
    }
    return violations;
}

// F3 — the DOCK_SPRING freshening canon (the B4c-extraction WS2 coupling). WS2
// (BG.W-DOCK-ENGINE-UNIFY) re-homed DOCK_SPRING onto `springPreset("dock")` = (0.68, 0.64)
// (the BD.W-ANIM-IOS27-TUNE weighty-gooey re-tune); its analytic settle clock is 0.66s. The
// pre-WS2 dock row was the frozen (0.32, 0.7) / 0.28s value.js-fenced KEEP. A verbatim
// extraction copies the stale value, so this clause makes the extracted docs carry the
// CURRENT canon — the fresh pair PRESENT and the retired pair ABSENT (an anti-evasion pair:
// appending 0.68/0.64 while leaving 0.32/0.7 somewhere still REDs).
export const DOCK_CANON = {
    // the (response, ζ) pairs are dock-unique substrings in these two docs
    retiredPair: "0.32, 0.7",
    freshPair: "0.68, 0.64",
    // the analytic settle clock lives once, on the --spring-dock-duration row of tunable-anim
    retiredDuration: "0.28s",
    freshDuration: "0.66s",
    pairDocs: ["motion-canon", "tunable-anim"],
    durationDoc: "tunable-anim",
};

export function auditDockCanonFresh(read) {
    const violations = [];
    for (const name of DOCK_CANON.pairDocs) {
        const path = `docs/design/${name}.md`;
        const content = read(path);
        if (content == null) {
            // F1 already reports the MISSING; F3 skips a doc it cannot read.
            continue;
        }
        if (content.includes(DOCK_CANON.retiredPair)) {
            violations.push(
                `F3 ${path} carries the RETIRED dock spring "${DOCK_CANON.retiredPair}" — WS2 re-homed DOCK_SPRING onto springPreset("dock") = "${DOCK_CANON.freshPair}".`,
            );
        }
        if (!content.includes(DOCK_CANON.freshPair)) {
            violations.push(
                `F3 ${path} missing the fresh DOCK_SPRING "${DOCK_CANON.freshPair}" (springPreset("dock"), BD.W-ANIM-IOS27-TUNE) — the extraction must carry the current canon.`,
            );
        }
    }
    const durPath = `docs/design/${DOCK_CANON.durationDoc}.md`;
    const durContent = read(durPath);
    if (durContent != null) {
        const durLine = durContent.split("\n").find((l) => l.includes("--spring-dock-duration"));
        if (durLine) {
            if (durLine.includes(DOCK_CANON.retiredDuration)) {
                violations.push(
                    `F3 ${durPath} --spring-dock-duration carries the retired "${DOCK_CANON.retiredDuration}" — the (0.68,0.64) spring settles at "${DOCK_CANON.freshDuration}".`,
                );
            }
            if (!durLine.includes(DOCK_CANON.freshDuration)) {
                violations.push(
                    `F3 ${durPath} --spring-dock-duration missing the fresh "${DOCK_CANON.freshDuration}" (the analytic settle of the re-tuned dock spring).`,
                );
            }
        }
    }
    return violations;
}

function diskRead(relPath) {
    const abs = join(ROOT, relPath);
    return existsSync(abs) ? readFileSync(abs, "utf8") : null;
}

function selfTest() {
    const real = "# affordance-map — the interaction-affordance idiom\n" + "x".repeat(2048);
    const bites = [
        {
            label: "missing doc → F1",
            map: { "docs/design/tunable-anim.md": real }, // the other 3 absent
            expect: (v) => v.some((m) => m.startsWith("F1") && m.includes("MISSING")),
        },
        {
            label: "empty stub → F1",
            map: {
                "docs/design/design-idioms.md": "# Design Idioms — the localized home\n",
                "docs/design/motion-canon.md": "# The motion canon\n" + "y".repeat(2048),
                "docs/design/tunable-anim.md": "# tunable-anim registry\n" + "y".repeat(2048),
                "docs/design/affordance-map.md": "# affordance-map idiom\n" + "y".repeat(2048),
            },
            expect: (v) => v.some((m) => m.startsWith("F1") && m.includes("too small")),
        },
        {
            label: "wrong identity → F2",
            map: {
                "docs/design/design-idioms.md": "# Some Other Doc\n" + "z".repeat(2048),
                "docs/design/motion-canon.md": "# The motion canon\n" + "z".repeat(2048),
                "docs/design/tunable-anim.md": "# tunable-anim registry\n" + "z".repeat(2048),
                "docs/design/affordance-map.md": "# affordance-map idiom\n" + "z".repeat(2048),
            },
            expect: (v) => v.some((m) => m.startsWith("F2")),
        },
        {
            label: "stale dock value → F3",
            audit: auditDockCanonFresh,
            // the verbatim pre-extraction dock row — the retired pair present
            map: {
                "docs/design/motion-canon.md": "# The motion canon\nDOCK_SPRING (0.32, 0.7)\n",
                "docs/design/tunable-anim.md": "# tunable-anim registry\n| dock | 0.68, 0.64 |\n| dock | `--spring-dock-duration` | 0.66s |\n",
            },
            expect: (v) => v.some((m) => m.startsWith("F3") && m.includes("RETIRED")),
        },
        {
            label: "missing fresh value → F3",
            audit: auditDockCanonFresh,
            // motion-canon carries neither pair — the fresh value is absent
            map: {
                "docs/design/motion-canon.md": "# The motion canon\nDOCK_SPRING has no numeric pair here\n",
                "docs/design/tunable-anim.md": "# tunable-anim registry\n| dock | 0.68, 0.64 |\n| dock | `--spring-dock-duration` | 0.66s |\n",
            },
            expect: (v) => v.some((m) => m.startsWith("F3") && m.includes("missing the fresh")),
        },
        {
            label: "stale dock duration → F3",
            audit: auditDockCanonFresh,
            // fresh pair present but the derived clock still the retired 0.28s
            map: {
                "docs/design/motion-canon.md": "# The motion canon\nDOCK_SPRING (0.68, 0.64)\n",
                "docs/design/tunable-anim.md": "# tunable-anim registry\n| dock | 0.68, 0.64 |\n| dock | `--spring-dock-duration` | 0.28s |\n",
            },
            expect: (v) => v.some((m) => m.startsWith("F3") && m.includes("0.28s")),
        },
    ];
    let ok = true;
    for (const bite of bites) {
        const audit = bite.audit ?? auditDesignDocsFiles;
        const v = audit((p) => bite.map[p] ?? null);
        const flagged = bite.expect(v);
        console.log(`  ${flagged ? "PASS" : "FAIL"}  self-test bite: ${bite.label}`);
        if (!flagged) ok = false;
    }
    // GREEN-after: the real on-disk tree must be clean under BOTH the files (F1/F2) and the
    // dock-canon-fresh (F3) detectors.
    const realViolations = [...auditDesignDocsFiles(diskRead), ...auditDockCanonFresh(diskRead)];
    const realClean = realViolations.length === 0;
    console.log(`  ${realClean ? "PASS" : "FAIL"}  self-test: the real docs/design/ tree is clean`);
    if (!realClean) {
        ok = false;
        for (const m of realViolations) console.log(`        ${m}`);
    }
    return ok;
}

function main() {
    if (process.argv.includes("--self-test")) {
        console.log("proof:design-docs-files — self-test (born-RED→GREEN bites)");
        const ok = selfTest();
        console.log(ok ? "\nproof:design-docs-files self-test GREEN" : "\nproof:design-docs-files self-test RED");
        process.exit(ok ? 0 : 1);
    }
    const violations = [...auditDesignDocsFiles(diskRead), ...auditDockCanonFresh(diskRead)];
    if (violations.length) {
        console.log(
            "proof:design-docs-files RED — the design-doc extraction home is incomplete or stale:",
        );
        for (const m of violations) console.log(`  ✗ ${m}`);
        process.exit(1);
    }
    console.log(
        `proof:design-docs-files GREEN — all ${DESIGN_DOCS.length} design docs resolve in docs/design/ (${DESIGN_DOCS
            .map((d) => d.name)
            .join(" · ")}) carrying the fresh DOCK_SPRING ${DOCK_CANON.freshPair}.`,
    );
    process.exit(0);
}

// Guard the top-level run behind the entry-module check (the house import.meta.url idiom) so
// importing the pure detector for the self-test / a sibling never runs the gate.
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
