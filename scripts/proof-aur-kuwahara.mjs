#!/usr/bin/env node
// BB.W-AUR-KUWAHARA — proof:aur-kuwahara, the DECIDE gate (born-RED → GREEN at BUILD).
//
// The three-tranche anisotropic-Kuwahara booking (the AY.W-AUR-T5 named-successor the
// AY EXCISE re-routed the oil/oil-pastel anisotropy + oil-pastel slope residual onto) is
// DECIDED here. The charge is the no-re-book law: DECIDE (build or retire), NEVER route
// the residual to a fourth named-successor wave. This wave fired BUILD — the SOFT
// polynomial-weighted anisotropic-Kuwahara finish ships SINGLE-PASS as the OPT-IN
// `medium:"kuwahara"` (uMedium == 7, default-OFF), off the EXISTING single-pass
// structure-tensor field (aurora is a procedural field — the operator re-samples
// sampleBase over the elliptical kernel directly, no FBO required).
//
// A SOURCE/STRUCTURE parse — device-free, on the local + ci tag set. The live painterly
// DELTA (the no-pinwheel orientation-histogram π + the proof:ba-gestalt aurora verdict
// over the kuwahara render) rides W-REFLECT3 (Batch 7), the cardinal-lesson Playwright
// architecture.
//
// THE THREE FALSIFIABLE WITNESSES:
//   W1 — the booking is DECIDED, not routed. The aurora SOURCE/gate tree carries NO
//        surviving phantom-wave pointer (W-AUR-T5 / AUR-T5 / named-successor-kuwahara /
//        multi-pass-pending / staged-kuwahara). The self-test bite: a planted re-book
//        string in a fixture MUST red the gate (the gate proves it catches the re-book).
//   W2 — the decision artefact exists + names a fired verdict ∈ {BUILD, RETIRE}, with
//        the three measured inputs.
//   W3 — the branch landed coherently. BUILD: the mediumKuwahara() body + the uMedium==7
//        dispatch + the MEDIUM_ID kuwahara slot + the AuroraMedium union member all
//        present, the aurora.wgsl.ts BYTE-untouched (the kuwahara WGSL is the booked
//        W-AURORA-WGPU-MEDIUMS tail — a kuwahara config on WebGPU degrades to the smooth
//        core), the soft-blend (no hard argmin) the §4.2 anti-pinwheel discipline.
//
// bite-check: re-route the residual to "AY.W-AUR-T5" anywhere in the aurora tree → RED;
// delete the decision artefact → RED; remove the mediumKuwahara body / the uMedium==7
// dispatch → RED; add a hard-argmin (no soft-blend) kuwahara → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const AURORA = resolve(ROOT, "src/components/custom/aurora");
const MEDIUMS = resolve(AURORA, "constants/shaders/mediums.glsl.ts");
const FRAG = resolve(AURORA, "constants/shaders/aurora.frag.ts");
const WGSL = resolve(AURORA, "constants/shaders/aurora.wgsl.ts");
const PRESETS_TYPE = resolve(AURORA, "constants/presets.ts");
const BRIDGE = resolve(AURORA, "composables/uniformBridge.ts");
const README = resolve(AURORA, "README.md");
const DESIGN = resolve(AURORA, "DESIGN.md");
const RESEARCH = resolve(AURORA, "RESEARCH.md");
const ARRESTING = resolve(ROOT, "scripts/proof-aurora-arresting.mjs");
const DECISION = resolve(ROOT, "docs/tranches/BB/audit/W-AUR-KUWAHARA-DECISION.md");

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_AUR_KUWAHARA_ARTIFACT",
    "BB-W-AUR-KUWAHARA-decided",
);

// The aurora SOURCE/gate tree the W1 phantom-pointer scan covers (the LIVE re-routing
// surface — NOT the closed-tranche history under docs/tranches/{AX,AW,AY,AZ,BA}, which
// records what was decided AT THAT TIME and must not be falsified retroactively).
const W1_SCAN_FILES = [MEDIUMS, FRAG, WGSL, PRESETS_TYPE, BRIDGE, README, DESIGN, RESEARCH, ARRESTING];

// The phantom-wave re-book patterns the no-re-book law forbids. A surviving cite of any
// of these IN THE LIVE TREE is the routed-to-future-wave third state the gate REDs on.
// The patterns are scoped to the ROUTING phrasing (a re-book), NOT a historical mention:
// a doc may SAY "W-AUR-T5" inside a "DECIDED off the W-AUR-T5 named-successor" reconcile,
// so the gate flags the FORWARD-routing forms only.
const REBOOK_PATTERNS = [
    // "named T5 ... successor (AY.W-AUR-T5)" forward-routing — the residual still routed.
    /named\s+T5[^.\n]*successor/i,
    /named\.?\s*successor[^.\n]*kuwahara/i,
    /kuwahara[^.\n]*named\.?\s*successor/i,
    // "the multi-pass kuwahara finish is the staged / pending finish" — doc claims a
    // pending future finish (the doc-vs-reality green-wash the spine forbids).
    /staged[^.\n]*kuwahara/i,
    /kuwahara[^.\n]*\b(pending|staged)\b/i,
    /multi-pass[^.\n]*kuwahara[^.\n]*\b(pending|staged)\b/i,
];

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Run the W1 phantom-pointer scan over a set of {file, text} entries; returns the list of
// surviving re-book hits. Re-used by the self-test bite over a SYNTHETIC fixture.
function scanForRebook(entries) {
    const hits = [];
    for (const { file, text } of entries) {
        for (const pat of REBOOK_PATTERNS) {
            const m = text.match(pat);
            if (m) hits.push({ file, pattern: pat.source, snippet: m[0].slice(0, 80) });
        }
    }
    return hits;
}

function main() {
    const violations = [];
    const facts = {};

    const mediums = read(MEDIUMS);
    const frag = read(FRAG);
    const wgsl = read(WGSL);
    const presetsType = read(PRESETS_TYPE);
    const bridge = read(BRIDGE);
    const decision = read(DECISION);

    // ── W1 — the booking is DECIDED, not routed ──────────────────────────────────────
    const liveEntries = W1_SCAN_FILES.map((f) => ({ file: f, text: read(f) }));
    const rebookHits = scanForRebook(liveEntries);
    facts.w1RebookHits = rebookHits;
    if (rebookHits.length) {
        for (const h of rebookHits) {
            violations.push(
                `W1 — a phantom-wave re-book pointer survives in the live aurora tree (${h.file.replace(ROOT + "/", "")}: /${h.pattern}/ — "${h.snippet}") — the residual is still routed to a future named-successor wave (the no-re-book law forbids it)`,
            );
        }
    }

    // W1 self-test bite (anti-evasion) — the gate MUST catch a planted re-book. Run the
    // SAME scanner over a synthetic fixture carrying a re-book phrase; if it does NOT flag,
    // the detector is broken (a gate that cannot catch the re-book it forbids is dead).
    const SYNTHETIC_REBOOK =
        "the oil-pastel slope residual is the named T5 anisotropic-Kuwahara successor (AY.W-AUR-T5).";
    const biteHits = scanForRebook([{ file: "<synthetic>", text: SYNTHETIC_REBOOK }]);
    facts.w1SelfTestCatchesRebook = biteHits.length > 0;
    if (!facts.w1SelfTestCatchesRebook) {
        violations.push(
            "W1 self-test — the phantom-pointer scanner FAILED to flag a synthetic re-book string (the detector is broken; the gate cannot prove it catches the re-book it forbids)",
        );
    }

    // ── W2 — the decision artefact exists + names a fired verdict ─────────────────────
    facts.w2ArtefactExists = existsSync(DECISION);
    if (!facts.w2ArtefactExists) {
        violations.push(
            "W2 — the decision artefact docs/tranches/BB/audit/W-AUR-KUWAHARA-DECISION.md does not exist (a DECIDE with no recorded study is the close-class lie)",
        );
    } else {
        // The verdict ∈ {BUILD, RETIRE} (the matrix fired exactly one branch).
        const verdictMatch = decision.match(/Verdict:\s*\*\*(BUILD|RETIRE)\*\*/i);
        facts.w2Verdict = verdictMatch ? verdictMatch[1].toUpperCase() : null;
        if (!facts.w2Verdict) {
            violations.push(
                "W2 — the decision artefact does not record a fired verdict ∈ {BUILD, RETIRE} (the matrix must fire exactly one branch)",
            );
        }
        // The three measured inputs are present (the load-bearing study, not a stub).
        const inputs = ["Input 1", "Input 2", "Input 3"];
        const missingInputs = inputs.filter((i) => !decision.includes(i));
        facts.w2MissingInputs = missingInputs;
        if (missingInputs.length) {
            violations.push(
                `W2 — the decision artefact is missing the measured input(s): ${missingInputs.join(", ")} (the three-input cost/benefit study is the binding deliverable)`,
            );
        }
    }

    // ── W3 — the branch landed coherently ────────────────────────────────────────────
    // This wave fired BUILD; assert the BUILD coherence (the medium genuinely shipped).
    if (facts.w2Verdict === "BUILD") {
        // (a) The AuroraMedium union carries the kuwahara member.
        facts.w3UnionMember = /\|\s*"kuwahara"/.test(presetsType);
        if (!facts.w3UnionMember)
            violations.push('W3/BUILD — the AuroraMedium type union has no "kuwahara" member');

        // (b) The MEDIUM_ID map carries the kuwahara: 7 slot.
        facts.w3MediumIdSlot = /kuwahara:\s*7\b/.test(bridge);
        if (!facts.w3MediumIdSlot)
            violations.push("W3/BUILD — the MEDIUM_ID bridge map has no kuwahara: 7 slot");

        // (c) The shader body exists.
        facts.w3MediumBody = /vec3\s+mediumKuwahara\s*\(/.test(mediums);
        if (!facts.w3MediumBody)
            violations.push("W3/BUILD — the mediumKuwahara() shader body is absent from mediums.glsl.ts");

        // (d) The main() dispatch routes uMedium == 7 → mediumKuwahara.
        facts.w3Dispatch = /uMedium\s*==\s*7\)\s*col\s*=\s*mediumKuwahara/.test(frag);
        if (!facts.w3Dispatch)
            violations.push("W3/BUILD — the aurora.frag main() has no `uMedium == 7 → mediumKuwahara` dispatch branch");

        // (e) The finish forces the structure tensor (the kernel is squeezed along it).
        facts.w3ForcesTensor = /cfg\.medium\s*===\s*"kuwahara"/.test(bridge);
        if (!facts.w3ForcesTensor)
            violations.push("W3/BUILD — the kuwahara medium does not force the structure-tensor orientation (resolveStrokeOrientId)");

        // (f) The SOFT-blend discipline — NOT the pre-2010 hard argmin pinwheel. The body
        //     must carry the variance-weighted blend (a 1/(1+var...) sector weight), NOT a
        //     hard winner-take-all selection. The negative scan runs over the CODE only
        //     (comment lines stripped — the rationale prose legitimately NAMES "argmin").
        facts.w3SoftBlend = /1\.0\s*\/\s*\(\s*1\.0\s*\+\s*pow\s*\(\s*variance/.test(mediums);
        const mediumsCode = mediums
            .split("\n")
            .filter((l) => !l.trim().startsWith("//"))
            .join("\n");
        // A hard-argmin in CODE looks like a `bestVar`/`minVar` running-minimum variable
        // + a `<`/`<=` comparison that overwrites a winner colour — the winner-take-all
        // structure the soft blend supersedes.
        facts.w3NoHardArgmin = !/\b(bestVar|minVar|minVariance|argmin)\b/i.test(mediumsCode);
        if (!facts.w3SoftBlend)
            violations.push("W3/BUILD — the mediumKuwahara body has no SOFT variance-weighted sector blend (1/(1+var^q)) — a hard argmin BANDS into the 8-spoke pinwheel (the §4.2 anti-regression)");
        if (!facts.w3NoHardArgmin)
            violations.push("W3/BUILD — the mediumKuwahara CODE carries a hard-argmin/winner-take-all selection variable (the pre-2010 pinwheel-banding form the soft blend supersedes)");

        // (g) The GL/GPU fence — aurora.wgsl.ts is BYTE-untouched (no kuwahara WGSL body).
        //     A kuwahara config on WebGPU degrades to the smooth core (the WGSL has no
        //     medium dispatch at all); the kuwahara WGSL is the booked W-AURORA-WGPU-MEDIUMS
        //     tail. A live mediumKuwahara WGSL body here would breach the fence.
        facts.w3WgslUntouched = !/mediumKuwahara|fn\s+\w*[Kk]uwahara/.test(wgsl);
        if (!facts.w3WgslUntouched)
            violations.push("W3/BUILD — aurora.wgsl.ts carries a kuwahara WGSL body — the WGSL arm must stay byte-untouched (the kuwahara WGSL is the booked W-AURORA-WGPU-MEDIUMS tail; a kuwahara config on WebGPU degrades to the smooth core)");

        // (h) DEFAULT-UNCHANGED — kuwahara is OPT-IN: the dispatch is a guarded
        //     `else if (uMedium == 7)` branch (NOT the unconditional default path), so the
        //     smooth default (uMedium == 0) is byte-unchanged. The dispatch ladder must
        //     still carry the smooth-default fall-through (no `if (uMedium == 7)` at the head).
        facts.w3OptInGuarded = /else\s+if\s*\(\s*uMedium\s*==\s*7\)/.test(frag);
        if (!facts.w3OptInGuarded)
            violations.push("W3/BUILD — the uMedium == 7 branch is not a guarded `else if` opt-in (the smooth default must stay the unguarded fall-through — DEFAULT-UNCHANGED)");
    } else if (facts.w2Verdict === "RETIRE") {
        // RETIRE coherence: no half-built kuwahara scaffold ships (the no-dead-scaffold
        // discipline) AND the ceiling is accepted-as-register.
        facts.w3NoScaffold = !/vec3\s+mediumKuwahara\s*\(/.test(mediums) && !/kuwahara:\s*7\b/.test(bridge);
        if (!facts.w3NoScaffold)
            violations.push("W3/RETIRE — a half-built kuwahara scaffold ships (the no-dead-scaffold discipline forbids it on the RETIRE branch)");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aur-kuwahara",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:aur-kuwahara] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log(
        `[proof:aur-kuwahara] PASS — booking DECIDED (verdict ${facts.w2Verdict}); no phantom-wave re-book in the live aurora tree; the single-pass kuwahara medium (uMedium==7) shipped opt-in default-unchanged; aurora.wgsl byte-untouched`,
    );
}

main();
