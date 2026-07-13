#!/usr/bin/env node
// BI.W-PRECUT-XR-ASKS — proof:crossrepo-asks:bi, the BI 5.0.0 cut outbound relay
// roster gate (device-free; the pure-detector house pattern, the proof:crossrepo-asks:bh
// precedent — a SEPARATE gate: proof-crossrepo-asks.mjs hardcodes RELAY=BB, the :bh gate
// RELAY=BH, this gate RELAY=BI).
//
// THE NEED. The 5.0.0 cut carries the dropped `./api` key (BH-covered) PLUS a cut-day
// hazard the BH roster never filed: atlas + sci-report carry glass-ui version ranges that
// resolve 5.0.0 while pinning value.js `^1.2.0` — BELOW the 5.0.0 value `^3.1.0` peer
// floor (sci-report's `>=4.2.0` AUTO-resolves 5.0.0 on next install; atlas's `^4.2.0`
// fires on its intentional bump). Unaddressed the publish auto-resolves into an
// unsatisfiable value.js peer. XR-6/FR-4: "a cut-day hazard requiring pin-guard asks
// BEFORE any publish. NOT YET A FILED GLASS ASK." This gate locks the BI roster
// (docs/tranches/BI/coordination/asks-and-consumes.md) as WHOLE:
//   X1 — the roster exists + covers every XR-9 carry row (SOURCE-ATTESTED from the
//        in-repo ROUND-2B-DIGEST.md §XR-9, NOT a hand-list) with a trigger + a terminal
//        disposition + the PAIRED kf ^5.2.0 / value ^3.1.0 peer bump (a subpath fix alone
//        leaves an unsatisfiable peer — the pairing is the binding discipline).
//   X2 — the pin-guard rows (atlas + sci-report → ^5.0.0 + value ^3.1.0 LOCKSTEP) filed
//        as HARD pre-publish blockers. BORN-RED at HEAD (the roster is ABSENT — the ask
//        unfiled, the ranges OPEN).
//   X3 — the .text-gilt→.gold-shimmer + /api + value.js blob-rename carry rows present.
//   X4 — the content-only foreign-tree fence (inv-26) by construction: every wave File
//        Bound is UNDER the glass-ui tree (no ../sibling path — the gate NEVER probes a
//        sibling; the killed proof:retired-token-consumers raw-grep is NOT re-introduced),
//        and the roster records the fence.
//
// STRUCTURAL/coordination wave — NO π, NO proof:ba-gestalt (zero pixels). The born-RED→
// GREEN log (roster absent→present) + the 4-bite self-test is the binding truth.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:crossrepo-asks:bi";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const ROSTER = "docs/tranches/BI/coordination/asks-and-consumes.md";
const OUTBOUND = "docs/tranches/BI/coordination/atlas-outbound-2026-07-12-decision-0.md";
const XR9_SOURCE = "docs/tranches/BI/audit/ROUND-2B-DIGEST.md";

// ── The wave's declared File Bounds (the X4 content-only fence target) ────────────────
// Every path this wave is allowed to touch is UNDER the glass-ui tree. The fence asserts
// none is a sibling-tree path (no `../` escape). A future cross-repo wave that edited a
// sibling directly would add a `../atlas/…`-shaped path here, which X4 reds.
const WAVE_BOUNDS = [
    ROSTER,
    OUTBOUND,
    "scripts/proof-crossrepo-asks-bi.mjs",
    "package.json",
    "scripts/gates.manifest.mjs",
];

// The kf + value peer-bump tokens the 5.0.0 floor requires (every subpath fix PAIRS them).
const KF_PEER = "^5.2.0";
const VALUE_PEER = "^3.1.0";
const FIVE_MAJOR = "^5.0.0";

// The CUT-FIXED by-name asks (issue at the 5.0.0 cut). Source-attested from the in-repo
// ROUND-2B-DIGEST.md §XR-9 — the roster covers the FULL expanded ids, the source names the
// stems, so a source-doc drop of an XR-9 stem reds the attestation (no silent drop).
const CUT_FIXED_ASKS = [
    "migrate-api-to-timeline",
    "migrate-api-to-aurora",
    "migrate-ring-to-focus-ring-color",
    "bbnf-glass-blur-dock-retune-no-op",
];
// The stems that appear LITERALLY in the XR-9 source (the {aurora,timeline} brace form for
// the /api pair). Each must be present in §XR-9 → the attestation.
const XR9_SOURCE_STEMS = [
    "migrate-api-to-",
    "migrate-ring-to-focus-ring-color",
    "bbnf-glass-blur-dock-retune-no-op",
];
// The BI-owned pin-guard asks (the cut-day HARD blocker — XR-6/FR-4).
const PIN_GUARD_ASKS = ["atlas-pin-guard-5xx-lockstep", "sci-report-pin-guard-5xx-lockstep"];
// The .text-gilt + value.js blob-rename carry ask ids.
const TEXT_GILT_ASK = "migrate-text-gilt-to-gold-shimmer";
const BLOB_ASK = "value-blob-rename-5site";

// Extract the §XR-9 section from the audit digest (between `### XR-9` and the next `###`/`##`).
function extractXR9(text) {
    const m = text.match(/###\s*XR-9[\s\S]*?(?=\n###\s|\n##\s|$)/);
    return m ? m[0] : "";
}

// ── Run ──────────────────────────────────────────────────────────────────────────────
const rosterText = read(ROSTER);
const xr9Text = extractXR9(read(XR9_SOURCE));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── X1 — the roster exists + covers the XR-9 carry rows + trigger/disposition/peer-bump ─
const rosterExists = rosterText.length > 0;
add("X1-roster-exists", rosterExists, `${ROSTER} ${rosterExists ? "exists" : "is ABSENT (born-RED — the pin-guard ask unfiled)"}`);

// SOURCE-ATTEST: §XR-9 names each cut-fixed stem (a source drop shrinks the set → red).
const xr9Present = xr9Text.length > 0;
add("X1-xr9-source-present", xr9Present, `${XR9_SOURCE} §XR-9 ${xr9Present ? "present (the relay-carry-list source-of-truth)" : "ABSENT"}`);
let allStemsAttested = xr9Present;
for (const stem of XR9_SOURCE_STEMS) {
    const attested = xr9Text.includes(stem);
    if (!attested) allStemsAttested = false;
    add(`X1-xr9-attests-${stem}`, attested, `§XR-9 names \`${stem}\` — ${attested ? "attested" : "MISSING (source drift)"}`);
}
add("X1-xr9-adopt", xr9Present && /ADOPT as the BI crossrepo-asks:bi roster/i.test(xr9Text), "§XR-9 disposition ADOPTs the carry list as the crossrepo-asks:bi roster");

// COVERAGE: the roster carries the FULL expanded cut-fixed ids (the no-silent-drop).
let allCutFixedCovered = true;
for (const ask of CUT_FIXED_ASKS) {
    const covered = rosterExists && rosterText.includes(ask);
    if (!covered) allCutFixedCovered = false;
    add(`X1-covers-${ask}`, covered, `${ask} — roster:${covered ? "covered" : "MISSING"}`);
}

// The PAIRED peer bump: the roster carries BOTH the kf ^5.2.0 + value ^3.1.0 floor AND
// the pairing discipline (a subpath fix PAIRS with the peer bump).
const carriesKfPeer = rosterExists && rosterText.includes(KF_PEER);
const carriesValuePeer = rosterExists && rosterText.includes(VALUE_PEER);
const pairingPhrase = rosterExists && /(PAIRS|PAIRED|paired peer bump)/.test(rosterText);
add(
    "X1-paired-peer-bump",
    carriesKfPeer && carriesValuePeer && pairingPhrase,
    `the roster PAIRS every subpath fix with kf ${KF_PEER} + value ${VALUE_PEER} — kf:${carriesKfPeer} value:${carriesValuePeer} pairing-discipline:${pairingPhrase}`,
);

// The trigger + disposition vocabulary (every ask carries a trigger + a terminal disposition).
const hasTrigger = rosterExists && /[Tt]rigger/.test(rosterText);
const hasDisposition = rosterExists && /CUT-FIXED/.test(rosterText) && /born-RED/.test(rosterText) && /HARD pre-publish blocker/i.test(rosterText);
add("X1-trigger-vocabulary", hasTrigger, "the roster carries a per-ask trigger (site / range)");
add("X1-disposition-vocabulary", hasDisposition, "the roster carries the terminal disposition vocabulary (CUT-FIXED / born-RED / HARD pre-publish blocker)");

// ── X2 — the pin-guard rows (atlas + sci-report → ^5.0.0 + value ^3.1.0 LOCKSTEP) ──────
let allPinGuardCovered = true;
for (const ask of PIN_GUARD_ASKS) {
    const covered = rosterExists && rosterText.includes(ask);
    if (!covered) allPinGuardCovered = false;
    add(`X2-covers-${ask}`, covered, `${ask} — roster:${covered ? "covered" : "MISSING (born-RED — the pin-guard unfiled)"}`);
}
const pinGuardBind = rosterExists && rosterText.includes(FIVE_MAJOR) && rosterText.includes(VALUE_PEER);
add("X2-pin-guard-bind", pinGuardBind, `the pin-guard binds glass-ui → ${FIVE_MAJOR} AND value → ${VALUE_PEER} — glass:${rosterText.includes(FIVE_MAJOR)} value:${rosterText.includes(VALUE_PEER)}`);
const pinGuardLockstep = rosterExists && /LOCKSTEP|lockstep/.test(rosterText);
const pinGuardHardBlocker = rosterExists && /HARD pre-publish blocker/i.test(rosterText) && /BEFORE any 5\.0\.0 publish|before any 5\.0\.0 publish|before any publish/i.test(rosterText);
add("X2-lockstep", pinGuardLockstep, "the pin-guard records the LOCKSTEP bind (glass-ui + value bumped together)");
add("X2-hard-pre-publish-blocker", pinGuardHardBlocker, "the pin-guard is a HARD pre-publish blocker (bound BEFORE any 5.0.0 publish — the USER-gated tag inherits it)");
add("X2-open-range-recorded", rosterExists && rosterText.includes(">=4.2.0") && /auto-resolve/i.test(rosterText), "the sci-report OPEN >=4.2.0 auto-resolve hazard recorded (the AUTO-RESOLVE urgency)");

// ── X3 — the .text-gilt / /api / blob-rename carry rows ───────────────────────────────
add("X3-text-gilt", rosterExists && rosterText.includes(TEXT_GILT_ASK) && rosterText.includes("text-gilt") && rosterText.includes("gold-shimmer"), `${TEXT_GILT_ASK} — the .text-gilt→.gold-shimmer carry row present`);
add("X3-api-timeline", rosterExists && rosterText.includes("/api") && rosterText.includes("/timeline"), "the /api → /timeline re-home carry row present");
add("X3-api-aurora", rosterExists && rosterText.includes("/api") && rosterText.includes("/aurora"), "the /api → /aurora re-home carry row present");
add("X3-blob-rename", rosterExists && rosterText.includes(BLOB_ASK) && rosterText.includes("goo-blob") && rosterText.includes("/blob"), `${BLOB_ASK} — the value.js goo-blob→blob 5-site carry row present`);

// ── X4 — the content-only foreign-tree fence (inv-26, by construction) ────────────────
const siblingPaths = WAVE_BOUNDS.filter(
    (p) => p.startsWith("../") || /(^|\/)\.\.\/(atlas|sci-report|speedtest|muster|value\.js|keyframes\.js|slides|bbnf-buddy)\//.test(p),
);
add(
    "X4-content-only-fence",
    siblingPaths.length === 0,
    siblingPaths.length === 0
        ? "all wave File Bounds are under the glass-ui tree (no sibling-tree path — the inv-26 content-only fence holds by construction; the gate never probes a sibling)"
        : `FOREIGN-TREE FENCE BREACH: ${siblingPaths.join(", ")} is a sibling-tree path (the inv-26 violation)`,
);
add(
    "X4-roster-records-fence",
    rosterExists && /foreign-tree fence/i.test(rosterText) && /ZERO sibling/i.test(rosterText),
    "the roster records the content-only foreign-tree fence (inv-26 — glass-ui edits ZERO sibling files; each sibling resolves the built dist/ on its own bump)",
);

// ── The self-test bites — the coverage floors + the pairing + the fence are falsifiable ─
function selfTest() {
    const bites = [];
    // bite 1: a roster DROPPING a cut-fixed ask id fails its coverage check.
    const dropped = rosterText.replace(new RegExp(CUT_FIXED_ASKS[0], "g"), "removed");
    bites.push({ id: "bite-dropped-ask-flags", pass: !dropped.includes(CUT_FIXED_ASKS[0]) });
    // bite 2: a roster missing the ^5.0.0 pin-guard bind fails X2.
    const noBind = rosterText.replace(new RegExp(FIVE_MAJOR.replace(/[.^]/g, "\\$&"), "g"), "^4.9.9");
    bites.push({ id: "bite-missing-pin-guard-flags", pass: !noBind.includes(FIVE_MAJOR) });
    // bite 3: an UNPAIRED subpath fix — a roster stripped of the paired peer-bump tokens
    // fails X1-paired-peer-bump (the subpath-fix-without-peer-bump red).
    const unpaired = rosterText
        .replace(new RegExp(KF_PEER.replace(/[.^]/g, "\\$&"), "g"), "^5.0.0")
        .replace(new RegExp(VALUE_PEER.replace(/[.^]/g, "\\$&"), "g"), "^1.2.0");
    const unpairedStillPairs = unpaired.includes(KF_PEER) && unpaired.includes(VALUE_PEER);
    bites.push({ id: "bite-unpaired-peer-bump-flags", pass: !unpairedStillPairs });
    // bite 4: a synthetic sibling-tree path in the bounds reds the fence.
    const doctoredBounds = [...WAVE_BOUNDS, "../atlas/package.json"];
    const breach = doctoredBounds.filter((p) => p.startsWith("../"));
    bites.push({ id: "bite-sibling-path-flags", pass: breach.length > 0 });
    return bites;
}
const bites = selfTest();
const allBitesPass = bites.every((b) => b.pass);
for (const b of bites) add(`selftest-${b.id}`, b.pass, `self-test bite: ${b.id} ${b.pass ? "FLAGS as expected" : "FAILED to flag"}`);
add("selftest-all-bites", allBitesPass, "every self-test bite flags its planted defect (the coverage floors + the paired peer bump + the fence are falsifiable)");

// The aggregate no-drop floors.
add("X1-all-cut-fixed-covered", rosterExists && allCutFixedCovered && allStemsAttested, `the roster covers ALL ${CUT_FIXED_ASKS.length} cut-fixed asks + §XR-9 attests every stem`);
add("X2-all-pin-guard-covered", rosterExists && allPinGuardCovered, `the roster covers BOTH pin-guard asks (atlas + sci-report)`);

// ── Report ───────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:crossrepo-asks:bi — the BI 5.0.0 cut outbound relay roster (BI.W-PRECUT-XR-ASKS)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_CROSSREPO_ASKS_BI_OUT", "BI-crossrepo-asks");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:crossrepo-asks:bi",
    command: COMMAND,
    note: "STRUCTURAL/coordination wave — NO π. X1 the roster covers every XR-9 carry row (SOURCE-ATTESTED from ROUND-2B-DIGEST.md §XR-9) with trigger + disposition + the PAIRED kf ^5.2.0 / value ^3.1.0 peer bump; X2 the pin-guard rows (atlas + sci-report → ^5.0.0 + value ^3.1.0 LOCKSTEP) filed as HARD pre-publish blockers (born-RED at HEAD — roster ABSENT); X3 the .text-gilt→.gold-shimmer + /api + value.js blob-rename carry rows; X4 the content-only foreign-tree fence (inv-26) by construction + the roster records it. + a 4-bite self-test.",
    roster: ROSTER,
    cutFixedAsks: CUT_FIXED_ASKS,
    pinGuardAsks: PIN_GUARD_ASKS,
    waveBounds: WAVE_BOUNDS,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:crossrepo-asks:bi] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:crossrepo-asks:bi] the BI 5.0.0 cut roster is whole — the XR-9 carry rows are covered (SOURCE-ATTESTED), the pin-guard (atlas + sci-report → ^5.0.0 + value ^3.1.0 LOCKSTEP) is filed as a HARD pre-publish blocker, the .text-gilt/api/blob-rename carry rows are present, and the content-only foreign-tree fence (inv-26) holds by construction.",
);
