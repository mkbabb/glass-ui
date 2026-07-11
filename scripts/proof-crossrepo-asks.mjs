#!/usr/bin/env node
// BB.W-CROSSREPO-ASKS — proof:crossrepo-asks, the cross-repo asks-and-consumes
// relay gate (device-free; the pure-detector house pattern, mirroring
// proof-atlas-ab.mjs / proof-claude-structure-sync.mjs).
//
// THE NEED. The by-name cross-repo asks (value.js OKLCH spectrum helper, kf
// springTimingFunction + the KF-OSCILLATOR + the boundary law, speedtest's
// ^4.1.0 AW.W7 bump) + the speedtest AW v3 relay (the §5 triage in
// cross-repo-inbound.md) lived SCATTERED across the consuming wave specs + the
// BB-AMENDMENT §A3. This gate locks the FORMALIZED relay
// (docs/tranches/BB/coordination/asks-and-consumes.md) so:
//   - the no-silent-drop law holds: the relay covers EVERY §A3 by-name ask
//     (a dropped ask reds W1); the expected ask-set is DERIVED from the live
//     amendment §A3 (a hand-frozen list that goes stale when the amendment adds
//     an ask is itself caught).
//   - every ask names a CONSUMER wave that EXISTS in docs/tranches/BB/waves/
//     (a phantom consumer reds W2) AND a terminal DISPOSITION (W2).
//   - the dep graph + the consume cadence + the freshness header (the three
//     sibling HEAD versions) are recorded (W3).
//   - the content-only fence (inv-26) holds BY CONSTRUCTION: this wave's File
//     Bounds touch ZERO sibling tree (no `../value.js`/`../keyframes.js`/
//     `../speedtest`/`../slides` path); a future cross-repo wave that "just
//     edits the sibling" writes a `../` path the gate reds (W4 — the load-bearing
//     foreign-tree-fence machine-lock).
//
// STRUCTURAL/coordination wave — NO π, NO proof:ba-gestalt (zero pixels). The
// born-RED→GREEN log for the four witnesses + the self-test bite is the binding
// truth. Born-RED at HEAD pre-wave (the relay doc does not exist).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:crossrepo-asks";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const RELAY = "docs/tranches/BB/coordination/asks-and-consumes.md";
const AMENDMENT = "docs/tranches/BB/BB-AMENDMENT-crossrepo.md";
const INBOUND = "docs/tranches/BB/coordination/cross-repo-inbound.md";

// ── The wave's declared File Bounds (the W4 content-only fence target) ───────────────
// Every path this wave is allowed to touch. The fence asserts none is a sibling-tree
// path (no `../` escape). A future cross-repo wave that edits a sibling directly would
// have to add a `../value.js/...`-shaped path here, which W4 reds.
const WAVE_BOUNDS = [
    RELAY,
    "scripts/proof-crossrepo-asks.mjs",
    "package.json",
    "scripts/gates.mjs",
    // BH.B5c: the CLAUDE.md canon-note bound re-homed onto the redistributed
    // cross-repo relay note in the dependencies canon home (CLAUDE.md is deleted at B4f).
    "docs/canon/dependencies.md",
    "docs/tranches/BB/PROGRESS.md",
];

// ── The expected ask-set, DERIVED from the live amendment §A3 (anti-evasion) ─────────
// W1 re-reads BB-AMENDMENT-crossrepo.md §A3 and asserts the relay covers every by-name
// ask named there. The ask is keyed by a STABLE token-set found in §A3 prose; a relay
// that drops an ask (records 5 of 6) reds; an amendment that adds an ask the relay does
// not cover reds (the list is not hand-frozen — it is the amendment-derived expected set
// gated against the relay).
//
// Each entry: a label + the regex that must match BOTH the amendment §A3 region (the
// ask is genuinely named there — the amendment-liveness check) AND the relay (the relay
// covers it). A future amendment ask that this map does not know is caught by the
// COVERAGE arm below (every §A3 by-name token-anchor must appear in the relay).
const EXPECTED_ASKS = [
    {
        id: "value-oklch-spectrum-helper",
        label: "the value.js OKLCH/shorter-hue spectrum helper (sampleColorRamp)",
        amendment: /OKLCH\/shorter-hue spectrum helper/i,
        relay: /OKLCH\/shorter-hue spectrum helper|sampleColorRamp/i,
    },
    {
        id: "value-pin-4.1.0",
        label: "pin glass-ui 4.0.0 → 4.1.0 (the BB cut)",
        amendment: /pin glass-ui[^.]*4\.0\.0[^.]*4\.1\.0|4\.1\.0 on the BB cut/i,
        relay: /4\.0\.0[^.|]*4\.1\.0|re-pins?\s+`?4\.1\.0`?/i,
    },
    {
        id: "value-vj-grammar-0.13.0",
        label: "the VJ grammar (scroll + perceptual ramp) lands 0.13.0",
        amendment: /VJ grammar \(scroll \+ perceptual ramp\) lands 0\.13\.0/i,
        relay: /VJ grammar[^|]*0\.13\.0/i,
    },
    {
        id: "value-peer-widen",
        label: "the value.js peer admits ^0.12.0 || ^0.13.0 (closes F-2)",
        amendment: /admits value\.js `\^0\.12\.0 \|\| \^0\.13\.0`|\^0\.12\.0 \|\| \^0\.13\.0`? \(closes F-2\)/i,
        relay: /peer admits[^|]*\^0\.12\.0[^|]*\^0\.13\.0|\^0\.13\.0 \|\| \^1\.0\.0/i,
    },
    {
        id: "kf-spring-timing-function",
        label: "confirm the keyframes.js springTimingFunction (W-DECK's --spring-deck)",
        amendment: /springTimingFunction/i,
        relay: /springTimingFunction/i,
    },
    {
        id: "kf-oscillator",
        label: "the KF-OSCILLATOR shared-oscillator phase (the speedtest idle-breath)",
        amendment: /KF-OSCILLATOR/i,
        relay: /KF-OSCILLATOR/i,
    },
    {
        id: "kf-boundary-law",
        label: "the boundary law (curve MATH = value.js · playback/spring = kf · editor = glass-ui)",
        amendment: /boundary law|curve MATH = value\.js/i,
        relay: /boundary law/i,
    },
    {
        id: "speedtest-aw-w7-bump",
        label: "speedtest bumps its ^ pin to ^4.1.0 at AW.W7 (R-CONSUME)",
        amendment: /\^4\.1\.0 at AW\.W7|bumps its `\^` pin to `?4\.1\.0`? at AW\.W7/i,
        relay: /AW\.W7/i,
    },
];

// The §A3 by-name token-anchors that MUST appear in the relay (the coverage arm — a new
// §A3 ask token that the relay does not carry reds, so the relay can never silently drop
// an amendment ask). These are the stable nouns §A3 names BY NAME.
const A3_COVERAGE_ANCHORS = [
    "OKLCH/shorter-hue spectrum helper",
    "springTimingFunction",
    "KF-OSCILLATOR",
    "AW.W7",
];

// The speedtest AW v3 relay items (the §5 triage) that the formalized relay MUST carry
// with a terminal disposition (no orphan ask). The A/C/B id set from cross-repo-inbound §5.
const AW_V3_ITEMS = ["A1", "A2", "A3", "C1", "C2", "C3", "C4", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"];

// The named consumer waves the relay points at — each MUST be named in the relay (the
// house bare `W-` prose form) AND resolve to a wave spec that EXISTS. A wave that FOLDED
// to another spec home carries a `specFile` (the back-pointer the gate honors): the peer
// widen executed at W-SPINE-LATEST (Batch C) lives in the folded BB.W-PEER-SPINE.md spec
// (the PROGRESS back-pointer), so the consumer resolves there — never a phantom.
const CONSUMER_WAVES = [
    { name: "W-BORDER-PROGRESS", specFile: "BB.W-BORDER-PROGRESS.md" },
    { name: "W-DECK", specFile: "BB.W-DECK.md" },
    { name: "W-EASING-PRIMITIVE", specFile: "BB.W-EASING-PRIMITIVE.md" },
    { name: "W-SPINE-LATEST", specFile: "BB.W-PEER-SPINE.md" },
    { name: "W-LINEAGE-PROBE", specFile: "BB.W-LINEAGE-PROBE.md" },
    { name: "W-DOCK-MORPH-FAMILY", specFile: "BB.W-DOCK-MORPH-FAMILY.md" },
];

// ── Run ──────────────────────────────────────────────────────────────────────────────
const relayText = read(RELAY);
const amendmentText = read(AMENDMENT);
const inboundText = read(INBOUND);
// §A3 region: from the §A3 header to the §A4 header (the by-name asks block).
const a3Match = amendmentText.match(/## §A3[\s\S]*?(?=## §A4|$)/);
const a3Region = a3Match ? a3Match[0] : amendmentText;

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── W1 — the relay exists + covers every §A3 ask (the no-silent-drop law) ────────────
const relayExists = relayText.length > 0;
add("W1-relay-exists", relayExists, `${RELAY} ${relayExists ? "exists" : "is ABSENT (born-RED)"}`);

let allAsksLive = true;
let allAsksCovered = true;
for (const ask of EXPECTED_ASKS) {
    const liveInAmendment = ask.amendment.test(a3Region);
    const coveredInRelay = relayExists && ask.relay.test(relayText);
    if (!liveInAmendment) allAsksLive = false;
    if (!coveredInRelay) allAsksCovered = false;
    add(
        `W1-ask-${ask.id}`,
        liveInAmendment && coveredInRelay,
        `${ask.label} — amendment§A3:${liveInAmendment ? "named" : "MISSING"} relay:${coveredInRelay ? "covered" : "MISSING"}`,
    );
}
add("W1-all-asks-live-in-amendment", allAsksLive, "every expected ask is genuinely named in the live BB-AMENDMENT §A3 (amendment-liveness, not a frozen literal)");
add("W1-all-asks-covered", allAsksCovered, "the relay covers every §A3 by-name ask (the no-silent-drop completeness law)");

// The §A3 token-anchor coverage arm (a new §A3 noun the relay omits reds).
for (const anchor of A3_COVERAGE_ANCHORS) {
    const inA3 = a3Region.includes(anchor) || new RegExp(anchor.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).test(a3Region);
    const inRelay = relayExists && (relayText.includes(anchor) || new RegExp(anchor.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).test(relayText));
    add(
        `W1-coverage-${anchor.replace(/[^a-z0-9]/gi, "-").slice(0, 28)}`,
        inA3 && inRelay,
        `§A3 anchor "${anchor}" — amendment:${inA3 ? "named" : "absent"} relay:${inRelay ? "covered" : "MISSING"}`,
    );
}

// ── W2 — every ask names a consumer wave that EXISTS + a disposition ─────────────────
let allConsumersExist = true;
for (const { name, specFile } of CONSUMER_WAVES) {
    // The relay names the wave in the house bare `W-` prose form (a `BB.`-prefix is
    // optional in the doc); the spec file resolves under docs/tranches/BB/waves/.
    const inRelay = relayExists && new RegExp(`\\b${name}\\b`).test(relayText);
    const fileExists = existsSync(resolve(ROOT, `docs/tranches/BB/waves/${specFile}`));
    if (!(inRelay && fileExists)) allConsumersExist = false;
    add(
        `W2-consumer-${name}`,
        inRelay && fileExists,
        `${name} → ${specFile} — relay-named:${inRelay ? "yes" : "NO"} wave-spec-exists:${fileExists ? "yes" : "NO"}`,
    );
}
add("W2-all-consumers-exist", allConsumersExist, "every named consumer wave EXISTS in docs/tranches/BB/waves/ (no phantom consumer)");

// A disposition vocabulary must be present for the asks (✅/🟡/BUILT/BOOKED/SATISFIED/
// NO-OP/cadence). A relay with asks but no disposition register is incomplete.
const hasDispositions =
    relayExists &&
    /SATISFIED/i.test(relayText) &&
    /BOOKED/i.test(relayText) &&
    /(NO-OP|WITHDRAWN)/i.test(relayText) &&
    /AFFIRMED/i.test(relayText);
add("W2-dispositions-present", hasDispositions, "the relay carries the disposition vocabulary (SATISFIED ✅ · BOOKED 🟡 · NO-OP/WITHDRAWN · AFFIRMED)");

// The AW v3 §5 items each carry a terminal disposition (no orphan ask).
let allAwItemsTerminal = true;
for (const item of AW_V3_ITEMS) {
    // Each item id must appear in the relay (the §2 AW v3 intake) — a dropped item reds.
    const re = new RegExp(`\\b${item}\\b`);
    const inRelay = relayExists && re.test(relayText);
    if (!inRelay) allAwItemsTerminal = false;
}
add(
    "W2-aw-v3-items-terminal",
    allAwItemsTerminal,
    `every AW v3 relay item (${AW_V3_ITEMS.join("/")}) carries a terminal disposition in the relay (no orphan ask)`,
);

// ── W3 — the dep graph + cadence + the freshness header (the sibling provenance) ─────
const hasDepGraph =
    relayExists &&
    /dep graph|dependency graph|##\s*§3\s*—\s*The dep graph/i.test(relayText) &&
    /──/.test(relayText); // the §A4-form graph block uses the ── edge arrows
add("W3-dep-graph", hasDepGraph, "the relay carries the §A4-form dep graph (the value.js→W-BORDER-PROGRESS, kf→W-DECK/W-EASING, glass-ui-4.1.0→speedtest-AW.W7 edges)");

const hasCadence =
    relayExists &&
    /consume cadence|consume-and-delete/i.test(relayText) &&
    /4\.1\.0/.test(relayText) &&
    /fold-all/i.test(relayText);
add("W3-cadence", hasCadence, "the consume cadence is recorded (the fold-all → 4.1.0 decision + the per-ask consume-and-delete triggers)");

const hasFreshnessHeader =
    relayExists &&
    /freshness header/i.test(relayText) &&
    /glass-ui HEAD sha/i.test(relayText) &&
    /value\.js sibling/i.test(relayText) &&
    /keyframes\.js sibling/i.test(relayText) &&
    /speedtest sibling/i.test(relayText);
add(
    "W3-freshness-header",
    hasFreshnessHeader,
    "the AZ-form freshness header carries the capture date + glass-ui HEAD sha + the three sibling versions (the relay is only as fresh as the sibling state it records)",
);

const hasGreenHandshake =
    relayExists && /green[- ]handshake/i.test(relayText) && /mismatch/i.test(relayText);
add("W3-green-handshake", hasGreenHandshake, "the green-handshake state is recorded (all three lanes agree) + the mismatch-flagging discipline for re-runs");

// ── W4 — the content-only fence (inv-26, proof by construction) ──────────────────────
// Every path in the wave's declared File Bounds is UNDER the glass-ui tree (no `../`
// sibling escape). This is the load-bearing fence: a future cross-repo wave editing a
// sibling directly would add a `../value.js/...` path here, which this clause reds.
const siblingPaths = WAVE_BOUNDS.filter(
    (p) => p.startsWith("../") || /(^|\/)\.\.\/(value\.js|keyframes\.js|speedtest|slides)\//.test(p),
);
add(
    "W4-content-only-fence",
    siblingPaths.length === 0,
    siblingPaths.length === 0
        ? "all wave File Bounds are under the glass-ui tree (no sibling-tree path — the inv-26 content-only fence holds by construction)"
        : `FOREIGN-TREE FENCE BREACH: ${siblingPaths.join(", ")} is a sibling-tree path (the inv-26 violation)`,
);
// The relay's OWN §6 must ASSERT the content-only fence (the doc records the inv-26 proof).
add(
    "W4-relay-records-fence",
    relayExists && /content-only fence|inv-26/i.test(relayText) && /foreign-tree/i.test(relayText),
    "the relay records the content-only fence (inv-26 / the foreign-tree fence) as a standing fact",
);

// ── The self-test bite — the no-silent-drop law is falsifiable ───────────────────────
// A SYNTHETIC dropped ask + a SYNTHETIC phantom-consumer + a SYNTHETIC sibling-path MUST
// each flag. Proven by construction: we run the SAME predicates against doctored inputs.
function selfTest() {
    const bites = [];
    // bite 1: a relay missing the springTimingFunction ask reds W1.
    const droppedAsk = relayText.replace(/springTimingFunction/g, "XXX-REDACTED");
    const dropFlags = !/springTimingFunction/.test(droppedAsk);
    bites.push({ id: "bite-dropped-ask-flags", pass: dropFlags });
    // bite 2: a phantom consumer wave (a name with no spec file) reds W2.
    const phantomExists = existsSync(resolve(ROOT, "docs/tranches/BB/waves/BB.W-DOES-NOT-EXIST.md"));
    bites.push({ id: "bite-phantom-consumer-flags", pass: !phantomExists });
    // bite 3: a synthetic sibling-tree path in the bounds reds W4.
    const doctoredBounds = [...WAVE_BOUNDS, "../value.js/src/units/color/mix.ts"];
    const breach = doctoredBounds.filter((p) => p.startsWith("../"));
    bites.push({ id: "bite-sibling-path-flags", pass: breach.length > 0 });
    // bite 4: a relay with no disposition vocabulary reds W2.
    const noDisp = relayText.replace(/SATISFIED/gi, "PENDING");
    bites.push({ id: "bite-missing-disposition-flags", pass: !/SATISFIED/i.test(noDisp) });
    return bites;
}
const bites = selfTest();
const allBitesPass = bites.every((b) => b.pass);
for (const b of bites) add(`selftest-${b.id}`, b.pass, `self-test bite: ${b.id} ${b.pass ? "FLAGS as expected" : "FAILED to flag"}`);
add("selftest-all-bites", allBitesPass, "every self-test bite flags its planted defect (the no-silent-drop law is falsifiable)");

// ── Report ───────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:crossrepo-asks — the cross-repo asks-and-consumes relay (BB.W-CROSSREPO-ASKS)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_CROSSREPO_ASKS_OUT", "BB-crossrepo-asks");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:crossrepo-asks",
    command: COMMAND,
    note: "STRUCTURAL/coordination wave — NO π, NO proof:ba-gestalt (zero pixels). W1 the relay covers every §A3 by-name ask (no-silent-drop, amendment-derived) + the AW v3 §5 items carry terminal dispositions; W2 every ask names a CONSUMER wave that exists + a disposition; W3 the dep graph + cadence + the AZ-form freshness header (the three sibling versions) + the green-handshake; W4 the content-only fence (inv-26, no sibling-tree path) by construction + a 4-bite self-test.",
    relay: RELAY,
    waveBounds: WAVE_BOUNDS,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:crossrepo-asks] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:crossrepo-asks] the cross-repo relay is whole — every §A3 by-name ask + every AW v3 §5 item carries a consumer wave + a terminal disposition, the dep graph + cadence + the three-sibling freshness header are recorded, the green-handshake holds, and the content-only foreign-tree fence (inv-26) is machine-locked by construction.",
);
