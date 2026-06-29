#!/usr/bin/env node
// BH.B4d — proof:consumer-evidence-live (the consumer-evidence FORCING gate).
//
// THE CLASS THIS KILLS — write-once-never-read. A `docs/consumer-evidence/<x>.md`
// is authored to satisfy a ≥2-consumer bar (J inv-10) at mint time, then NEVER
// read by any gate. It rots: the surface retires, the consumer count drifts, the
// doc lingers as dead prose nobody re-grades. The dir grew to 60 files, ~36 of
// them dead-to-gates. This gate is the forcing function: EVERY evidence doc is
// LIVE (load-bearing to a registered gate) OR it must be DELETED. No third state.
//
// LIVE iff EITHER:
//   (A) GATE-REFERENCED — the basename "<x>.md" appears as a literal in some
//       `scripts/*.mjs` gate source (the explicit by-name read: proof:spa-view
//       reads `spa-view.md`, proof:haptic reads `use-haptic.md`, …). A doc named
//       by a registered gate is genuinely read — it earns its keep.
//   (B) ORPHAN-EXEMPTION — `<x>` matches a PUBLISHED custom package that
//       proof:component-orphan keeps via its evidence-doc allowlist (a published
//       pkg with <2 non-self consumers — DELETING the doc would RED
//       proof:component-orphan). Computed by REUSING that gate's own detector
//       (DRY — no second census). On a siblings-absent runner the in-repo-only
//       census is CONSERVATIVE: it keeps MORE docs, never wrongly drops a
//       load-bearing one (in-repo consumer counts ≤ full counts), so the gate is
//       GREEN-robust on CI.
//   README.md is the dir's policy index — exempt.
//
// SELF-PROVING — a synthetic dead-doc name (neither LIVE-A nor LIVE-B) is fed to
// the pure detector each run; if the detector fails to flag it, the gate REDs
// (the bite is demonstrated every invocation — the proof:component-orphan shape).
//
// House style mirrors proof-component-orphan.mjs: ESM .mjs, a pure exported
// detector, a byte-stable JSON artefact via gate-output, a human summary,
// process.exit(1) on any violation.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
import {
    detectComponentOrphans,
    gatherOrphanInput,
} from "./proof-component-orphan.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_CONSUMER_EVIDENCE_LIVE_ARTIFACT",
    "BH-consumer-evidence-live",
);

const EVIDENCE_DIR = resolve(ROOT, "docs/consumer-evidence");
const SELF = "proof-consumer-evidence-live.mjs";

/**
 * The pure detector. A doc is LIVE iff it is GATE-REFERENCED (its basename is in
 * `liveA`) OR an ORPHAN-EXEMPTION (its package id — or its `use-`-stripped form —
 * is in `orphanPkgs`). Returns { live, violations }.
 *
 * @param {{ files: string[], liveA: Set<string>, orphanPkgs: Set<string> }} input
 *   files     — evidence basenames (e.g. "spa-view.md"); README.md excluded by caller.
 *   liveA     — basenames literally referenced in a registered-gate source.
 *   orphanPkgs— published-custom-package ids proof:component-orphan keeps by-doc.
 */
export function detectDeadEvidence({ files, liveA, orphanPkgs }) {
    const violations = [];
    const live = [];
    for (const f of files) {
        const name = f.replace(/\.md$/, "");
        const gateRef = liveA.has(f);
        const orphanExempt =
            orphanPkgs.has(name) || orphanPkgs.has(name.replace(/^use-/, ""));
        if (gateRef || orphanExempt) {
            live.push({ file: f, via: gateRef ? "gate-ref" : "orphan-exemption" });
        } else {
            violations.push(
                `dead consumer-evidence doc: docs/consumer-evidence/${f} is read by NO registered gate AND is not an orphan-exemption — DELETE it (BH.B4d forcing rule, the write-once-never-read class) or make it gate-referenced`,
            );
        }
    }
    return { live, violations };
}

// ── IO: gather the live-reference facts from the real tree ───────────────────

/** Every evidence basename present, minus the README policy index. */
function evidenceFiles() {
    if (!existsSync(EVIDENCE_DIR)) return [];
    return readdirSync(EVIDENCE_DIR)
        .filter((f) => f.endsWith(".md") && f !== "README.md")
        .sort();
}

/** LIVE-A — the set of basenames a `scripts/*.mjs` gate source actually READS.
 * Two read forms count, both precise (a bare basename in a prose COMMENT example
 * — the orphan gate's `→ \`use-sortable.md\`` kebab illustration — does NOT):
 *   (i)  the PATH form — `consumer-evidence/<name>.md` literal (the common case,
 *        `resolve(ROOT, "docs/consumer-evidence/spa-view.md")`).
 *   (ii) the TEMPLATED form — a gate that reads `docs/consumer-evidence/${name}.md`
 *        over a quoted-basename list (proof:virtual-window's preseededDocs verifies
 *        the section-window helper docs' src-path claims). The basename quoted IN
 *        THE SAME gate source that carries the `consumer-evidence/${` template IS a
 *        real read — so those docs are gate-verified, not write-once-never-read.
 * The forcing gate's OWN source is excluded (no self-reference into liveness). The
 * `.js` workflow scripts are NOT gates (the `.mjs` filter drops them — a doc named
 * ONLY in a wf-*.js is dead-to-gates, the synthesis verdict on underline.md). */
function gateReferenced(files) {
    const scriptsDir = resolve(ROOT, "scripts");
    const sources = readdirSync(scriptsDir)
        .filter((n) => n.endsWith(".mjs") && n !== SELF)
        .map((n) => {
            try {
                return readFileSync(resolve(scriptsDir, n), "utf8");
            } catch {
                return "";
            }
        });
    const live = new Set();
    for (const f of files) {
        const name = f.replace(/\.md$/, "");
        for (const src of sources) {
            const pathForm = src.includes(`consumer-evidence/${f}`);
            const templatedForm =
                src.includes("consumer-evidence/${") && src.includes(`"${name}"`);
            if (pathForm || templatedForm) {
                live.add(f);
                break;
            }
        }
    }
    return live;
}

/** LIVE-B — the published custom packages proof:component-orphan keeps via the
 * evidence-doc allowlist (published AND <2 non-self consumers). Reuses the
 * orphan gate's own gather + detector (DRY). Conservative under siblings-absence. */
function orphanExemptPkgs() {
    const input = gatherOrphanInput();
    const { facts } = detectComponentOrphans(input);
    return {
        pkgs: new Set(
            facts.surveyed
                .filter((s) => s.published && (s.consumers ?? 0) < 2)
                .map((s) => s.pkg),
        ),
        siblingsPresent: input.siblingsPresent,
    };
}

function run() {
    const files = evidenceFiles();
    const liveA = gateReferenced(files);
    const { pkgs: orphanPkgs, siblingsPresent } = orphanExemptPkgs();

    // SELF-PROVING — a synthetic dead-doc name must be flagged.
    const PROBE = "__synthetic_dead_evidence_probe__.md";
    const { violations: probeViolations } = detectDeadEvidence({
        files: [PROBE],
        liveA,
        orphanPkgs,
    });
    const selfProof =
        probeViolations.length === 1
            ? "ok (synthetic dead doc would be flagged)"
            : "FAILED";

    const { live, violations } = detectDeadEvidence({ files, liveA, orphanPkgs });
    if (selfProof === "FAILED") {
        violations.push(
            "SELF-PROOF FAILED: the synthetic dead-doc probe was NOT flagged — the forcing detector has lost its bite",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const facts = {
        evidenceFileCount: files.length,
        liveCount: live.length,
        gateRefCount: live.filter((l) => l.via === "gate-ref").length,
        orphanExemptCount: live.filter((l) => l.via === "orphan-exemption").length,
        deadCount: violations.filter((v) => v.startsWith("dead ")).length,
        siblingsPresent: siblingsPresent.length,
        selfProof,
        live,
    };

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:consumer-evidence-live",
        facts,
        violations,
    });

    console.log(
        "proof:consumer-evidence-live — every consumer-evidence doc is gate-read OR deleted (BH.B4d forcing gate)",
    );
    console.log(`  evidence docs (non-README)  : ${facts.evidenceFileCount}`);
    console.log(`  live (gate-ref)             : ${facts.gateRefCount}`);
    console.log(`  live (orphan-exemption)     : ${facts.orphanExemptCount}`);
    console.log(`  dead (must delete)          : ${facts.deadCount}`);
    console.log(`  sibling repos present       : ${facts.siblingsPresent}`);
    console.log(`  self-proof                  : ${facts.selfProof}`);
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
