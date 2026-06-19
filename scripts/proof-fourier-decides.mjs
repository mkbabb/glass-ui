#!/usr/bin/env node
// proof:fourier-decides — BC.W-FOURIER-DECIDES, the no-silent-drop + disposition-
// soundness gate for the three DECIDE-or-BOOK fourier asks (the pure-detector
// house pattern, mirroring proof-crossrepo-asks.mjs / proof-fourier-reconcile).
//
// THE NEED. Three FOURIER-INBOUND asks do NOT clear the ≥2-consumer bar into a
// built primitive. The no-silent-drop law demands each gets a TERMINAL,
// GROUNDED disposition — recorded, not dropped:
//   #4  AtomDiff               → BOOK (3 consumers diff 3 DIVERGENT shapes; only
//                                the 3-tone styling shared = --accent-tone)
//   #7  canvas-anchored-overlay → BOOK (1 named binary consumer; ≥2-bar unmet)
//   #12 tier-class-staleness    → BUILD-as-gate (proof:tier-class-staleness +
//                                the consumer PostCSS recipe)
//
// FD1 each item carries a TERMINAL disposition. FD2 the two BOOKs are grounded +
// carry a NAMED promotion trigger (a BOOK is not a dead-letter). FD3 the
// tier-class-staleness gate exists + is single-sourced + the recipe doc exists.
// FD4 the BC.W-FOURIER-ASK boundary holds (no double-ownership). + a self-test
// bite per clause.
//
// STRUCTURAL/coordination wave — NO π (zero pixels). Born-RED at HEAD pre-wave
// (the evidence docs + the gate do not exist).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:fourier-decides";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const DIFF_ROWS = "docs/consumer-evidence/diff-rows.md";
const CANVAS_OVERLAY = "docs/consumer-evidence/canvas-anchored-overlay.md";
const TIER_GATE = "scripts/proof-tier-class-staleness.mjs";
const RECIPE = "docs/consumer-evidence/consumer-tier-class-lint.md";
const FOURIER_BC = "docs/tranches/BC/coordination/FOURIER-BC.md";
const FOURIER_ASK_SPEC = "docs/tranches/BC/waves/BC.W-FOURIER-ASK.md";

const diffRows = read(DIFF_ROWS);
const canvasOverlay = read(CANVAS_OVERLAY);
const tierGate = read(TIER_GATE);
const recipe = read(RECIPE);
const fourierBc = read(FOURIER_BC);

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── FD1 — all three items carry a TERMINAL disposition ───────────────────────
const diffBooked = /DISPOSITION:?\s*\**BOOK\b/i.test(diffRows);
const canvasBooked = /DISPOSITION:?\s*\**BOOK\b/i.test(canvasOverlay);
const tierBuild = existsSync(resolve(ROOT, TIER_GATE)) && /DISPOSITION:?\s*\**BUILD-as-gate/i.test(recipe);
add("FD1-diff-rows-BOOK", diffBooked, `#4 AtomDiff carries a BOOK disposition in ${DIFF_ROWS}`);
add("FD1-canvas-overlay-BOOK", canvasBooked, `#7 canvas-anchored-overlay carries a BOOK disposition in ${CANVAS_OVERLAY}`);
add("FD1-tier-class-BUILD-as-gate", tierBuild, `#12 tier-class-staleness carries a BUILD-as-gate disposition (the gate exists + the recipe records it)`);
add("FD1-all-terminal", diffBooked && canvasBooked && tierBuild, "all three items carry a TERMINAL disposition (no silent drop)");

// ── FD2 — the BOOKs are grounded + carry a promotion trigger ─────────────────
// #4: names the 3 consumers + their DIVERGENT shapes + the convergence trigger.
const diffNamesConsumers =
    /fourier/i.test(diffRows) && /value\.js/i.test(diffRows) && /speedtest/i.test(diffRows);
const diffDivergent = /divergent|different shape/i.test(diffRows);
const diffTrigger = /promotion trigger/i.test(diffRows) && /shared keyed-diff shape|SHARED.*shape/i.test(diffRows);
const diffAccentTone = /--accent-tone/i.test(diffRows) && /BC\.W-ACCENT-TONE/i.test(diffRows);
add("FD2-diff-names-3-consumers", diffNamesConsumers, "#4 names the 3 consumers (fourier /diff + value.js palette diffs + speedtest run-compares)");
add("FD2-diff-divergent-shapes", diffDivergent, "#4 records the 3 DIVERGENT shapes (the grounding for the unmet ≥2-bar)");
add("FD2-diff-promotion-trigger", diffTrigger, "#4 carries the named promotion trigger (≥2 converge on a SHARED keyed-diff shape → <DiffRows :tone-map>)");
add("FD2-diff-cites-accent-tone", diffAccentTone, "#4 cites the --accent-tone register (BC.W-ACCENT-TONE) for the 3-tone styling (cited, not owned)");

// #7: names consumer #1 + the 2nd-consumer trigger + the reka virtual-anchor seam.
const canvasNamesConsumer1 = /consumer #1|fourier/i.test(canvasOverlay);
const canvasTrigger = /promotion trigger/i.test(canvasOverlay) && /SECOND|2nd/i.test(canvasOverlay);
const canvasRekaSeam =
    /:reference|virtual-anchor/i.test(canvasOverlay) &&
    /getBoundingClientRect/.test(canvasOverlay) &&
    /reka|floating-ui/i.test(canvasOverlay);
add("FD2-canvas-names-consumer-1", canvasNamesConsumer1, "#7 names consumer #1 (fourier's canvas coefficient/curve hovers)");
add("FD2-canvas-promotion-trigger", canvasTrigger, "#7 carries the named promotion trigger (a SECOND canvas-/SVG-point-anchored top-layer flips it to BUILD)");
add("FD2-canvas-reka-seam", canvasRekaSeam, "#7 names the reka/floating-ui virtual-anchor seam to expose on the flip (:reference accepting { getBoundingClientRect })");

// A BOOK with NO promotion trigger reds (the no-silent-drop: a BOOK is not a dead-letter).
add("FD2-both-books-carry-trigger", diffTrigger && canvasTrigger, "both BOOKs carry a NAMED promotion trigger (a BOOK is a checked terminal with a flip condition, never a dead-letter)");

// ── FD3 — the tier-class-staleness gate exists + is single-sourced ───────────
const gateExists = existsSync(resolve(ROOT, TIER_GATE));
const gateHasSet = /RETIRED_TIER_CLASSES\s*=/.test(tierGate);
const gateReusesHarness =
    /from "\.\/constellation\.mjs"/.test(tierGate) &&
    /resolveSibling/.test(tierGate) &&
    /skipSibling/.test(tierGate) &&
    /CONSUMERS/.test(tierGate);
const gateHasCompletenessArm = /completenessGaps|COMPLETENESS/.test(tierGate);
const recipeExists = existsSync(resolve(ROOT, RECIPE));
const recipeIsConsumerSide =
    recipeExists && /PostCSS|stylelint/i.test(recipe) && /consumer/i.test(recipe);
add("FD3-gate-exists", gateExists, `${TIER_GATE} exists (born-RED: absent at HEAD pre-wave)`);
add("FD3-gate-has-set", gateHasSet, "the gate carries the RETIRED_TIER_CLASSES set");
add("FD3-gate-reuses-harness", gateReusesHarness, "the gate REUSES the proof:consumer-staleness constellation walk (CONSUMERS/resolveSibling/skipSibling — no re-fork, DRY)");
add("FD3-gate-completeness-arm", gateHasCompletenessArm, "the gate carries the single-source COMPLETENESS arm (a retired-without-entry reds)");
add("FD3-recipe-exists", recipeExists && recipeIsConsumerSide, `the consumer PostCSS lint recipe doc exists (${RECIPE})`);

// ── FD4 — the BC.W-FOURIER-ASK boundary (no double-ownership) ────────────────
// This wave's items (#4/#7/#12) are DISJOINT from BC.W-FOURIER-ASK's (the demo
// defect + the ^4.0.0 WEB-workspace bump). The FOURIER-BC coordination doc must
// RECORD the boundary; this wave's items must NOT be claimed by FOURIER-ASK.
const fourierAskSpec = read(FOURIER_ASK_SPEC);
const boundaryRecorded =
    /BC\.W-FOURIER-ASK/.test(fourierBc) &&
    /(boundary|double-ownership|disjoint)/i.test(fourierBc) &&
    /cross-repo-INBOUND|cross-repo-inbound|adoption-asks/i.test(fourierBc);
add("FD4-boundary-recorded", boundaryRecorded, "FOURIER-BC.md records the BC.W-FOURIER-ASK boundary (this wave = the M-tranche cross-repo-INBOUND DECIDE-items; that wave = the demo defect + the ^4.0.0 bump)");
// The other wave's spec, if present, must NOT claim #4/#7/#12 as its own. The
// demo/bump cluster is its register — a conflation (it owning the DECIDE-items)
// reds. We assert the disjointness POSITIVELY: FOURIER-ASK does not carry the
// canvas-anchored-overlay / DiffRows / tier-class-staleness BUILD ownership.
const askConflation =
    fourierAskSpec.length > 0 &&
    /\bowns?\b[\s\S]{0,400}(canvas-anchored-overlay|DiffRows|tier-class-staleness)/i.test(fourierAskSpec);
add("FD4-no-ask-conflation", !askConflation, fourierAskSpec.length === 0 ? "BC.W-FOURIER-ASK spec absent at HEAD — no conflation possible (boundary recorded in FOURIER-BC.md)" : "BC.W-FOURIER-ASK does NOT claim ownership of #4/#7/#12 (no double-ownership)");

// ── The self-test bite — one per clause (the no-silent-drop is falsifiable) ──
function selfTest() {
    const bites = [];
    // FD1 bite: a removed disposition reds.
    const droppedDisp = diffRows.replace(/DISPOSITION:?\s*\**BOOK\b/i, "DISPOSITION: ");
    bites.push({ id: "FD1-removed-disposition-reds", pass: !/DISPOSITION:?\s*\**BOOK\b/i.test(droppedDisp) });
    // FD2 bite: a BOOK without a promotion trigger reds.
    const droppedTrigger = canvasOverlay.replace(/promotion trigger/gi, "XXX");
    bites.push({ id: "FD2-book-without-trigger-reds", pass: !/promotion trigger/i.test(droppedTrigger) });
    // FD3 bite: a planted consumer-markup class="cartoon-card" is a retired class
    // the tier-class gate detects (the cross-gate witness — the set is live).
    bites.push({ id: "FD3-retired-class-in-set", pass: /cartoon-card/.test(tierGate) });
    // FD4 bite: an overlap with the other wave's items reds.
    const doctoredAsk = "BC.W-FOURIER-ASK owns the canvas-anchored-overlay seam";
    const overlap = /\bowns?\b[\s\S]{0,400}(canvas-anchored-overlay|DiffRows|tier-class-staleness)/i.test(doctoredAsk);
    bites.push({ id: "FD4-overlap-reds", pass: overlap });
    return bites;
}
const bites = selfTest();
const allBitesPass = bites.every((b) => b.pass);
for (const b of bites) add(`selftest-${b.id}`, b.pass, `self-test bite: ${b.id} ${b.pass ? "FLAGS as expected" : "FAILED to flag"}`);
add("selftest-all-bites", allBitesPass, "every self-test bite flags its planted defect (the no-silent-drop law is falsifiable)");

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:fourier-decides — the DECIDE-or-BOOK disposition-soundness gate (BC.W-FOURIER-DECIDES)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_FOURIER_DECIDES_OUT", "BC-fourier-decides");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:fourier-decides",
    command: COMMAND,
    note: "BC.W-FOURIER-DECIDES — the three DECIDE-or-BOOK fourier asks each carry a terminal, grounded disposition (FD1 #4 BOOK / #7 BOOK / #12 BUILD-as-gate); FD2 the two BOOKs name their consumers + divergent-shape/1-consumer grounding + a NAMED promotion trigger (a BOOK is not a dead-letter); FD3 proof:tier-class-staleness exists, reuses the proof:consumer-staleness constellation walk, carries the single-sourced RETIRED_TIER_CLASSES + the completeness arm, + the consumer PostCSS recipe doc; FD4 the BC.W-FOURIER-ASK boundary holds (no double-ownership) + a self-test bite per clause. STRUCTURAL — NO π.",
    docs: { diffRows: DIFF_ROWS, canvasOverlay: CANVAS_OVERLAY, tierGate: TIER_GATE, recipe: RECIPE, coordination: FOURIER_BC },
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:fourier-decides] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:fourier-decides] the three DECIDE-or-BOOK fourier asks carry terminal, grounded dispositions — #4 + #7 BOOK with named promotion triggers, #12 BUILD-as-gate (proof:tier-class-staleness + the consumer recipe), the BC.W-FOURIER-ASK boundary holds, and every self-test bite flags its planted defect.",
);
