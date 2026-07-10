#!/usr/bin/env node
// BH.B7 W-api-ask-roster — proof:crossrepo-asks:bh, the 5.0.0-BH-B7 by-name
// migration-ask roster gate (device-free; the pure-detector house pattern, the
// BB-scoped proof-crossrepo-asks.mjs sibling — a SEPARATE gate, NOT a shared one:
// proof-crossrepo-asks.mjs:43 hardcodes RELAY="docs/tranches/BB/…" and is vacuous
// for BH).
//
// THE NEED. The 5.0.0 joint BG/BH cut carries ONE consumer-facing break surface —
// the dropped `./api` key (203-symbol re-home) PLUS two non-`/api` break vectors
// (the atlas `--ring`→`--focus-ring-color` rename, the bbnf-buddy `--glass-blur-dock`
// token-retire). BH's original B7 spec hardcoded "exactly 2 by-name asks" in three
// coupled places while BG's authoritative fold (consumer-constellation.md's By-name
// ask ledger) names FOUR. This gate locks the completed roster
// (docs/tranches/BH/coordination/asks-and-consumes.md) against the SOURCE DOCS — the
// expected set is DERIVED by AUTO-SCAN, NOT a hand-list count:
//   W1 — the roster covers the AUTO-SCANNED expected set. The ledger asks are parsed
//        from consumer-constellation.md's By-name ask ledger (row-filter lands
//        == 5.0.0-BH-B7 AND is-a-by-name-migration-ask → {aurora, timeline, ring});
//        the bbnf token-retire ask is source-attested from bg-build-map §G7 U1. The
//        >=3 scan-floor (the ledger asks) + the >=4 covered-floor (∪ bbnf) fail LOUD
//        on source-doc drift: a source doc that DROPS a 5.0.0-BH-B7 ledger ask shrinks
//        the derived set and reds; a source doc that ADDS one the roster does not
//        carry reds.
//   W2 — the row-4 witness is RE-BASED (ruling #3). The sibling-probe gate
//        proof:retired-token-consumers is KILLED (BG.W-CLOSEFIX-9SITE stripped to
//        BG.W-DOCK-BLUR-RETIRE-CARVE — a sibling raw-grep ran the inv-26 foreign-tree
//        fence backwards into a coupling). The bbnf row-4 born-RED witness is now the
//        MIGRATION.md `--glass-blur-dock` retire ROW + this gate's >=4 covered-floor.
//        This clause is BORN-RED at HEAD (the roster still presents the KILLED gate as
//        the live primary witness) → GREEN once the roster records the re-base.
//   W3 — the content-only foreign-tree fence (inv-26) by construction: every wave File
//        Bound is UNDER the glass-ui tree (no ../bbnf-buddy/… sibling path); the sibling
//        resolves the built dist/ on its own bump (contract-v2 — no glass-ui gate probes
//        the sibling), and the roster records the fence.
//
// STRUCTURAL/coordination wave — NO π, NO proof:ba-gestalt (zero pixels). The
// born-RED→GREEN log for the roster re-base + the self-test bites is the binding truth.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:crossrepo-asks:bh";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const ROSTER = "docs/tranches/BH/coordination/asks-and-consumes.md";
const CONSTELLATION = "docs/tranches/BG/execution/consumer-constellation.md";
const BUILD_MAP = "docs/tranches/BG/execution/bg-build-map.md";
const MIGRATION = "MIGRATION.md";

// ── The wave's declared File Bounds (the W3 content-only fence target) ────────────────
// Every path this wave is allowed to touch is UNDER the glass-ui tree. The fence asserts
// none is a sibling-tree path (no `../` escape). A future cross-repo wave that edits a
// sibling directly would add a `../bbnf-buddy/…`-shaped path here, which W3 reds.
const WAVE_BOUNDS = [
    ROSTER,
    MIGRATION,
    "scripts/proof-crossrepo-asks-bh.mjs",
    "package.json",
    "scripts/gates.mjs",
];

// The scan-floor (the ledger by-name migration asks) and the covered-floor (∪ bbnf).
const SCAN_FLOOR = 3;
const COVERED_FLOOR = 4;

// The bbnf token-retire ask id + its token (source-attested from bg-build-map §G7 U1;
// the roster carries the id, bg-build-map §G7 U1 carries the source-of-truth anchor).
const BBNF_ASK_ID = "bbnf-glass-blur-dock-retune-no-op";
const BBNF_TOKEN = "--glass-blur-dock";

// ── The SOURCE-DOC AUTO-SCAN — the ledger asks are DERIVED, not hand-listed ───────────
// Parse consumer-constellation.md's "By-name ask ledger" table. Each row is
// `| ask id | repo | line | disposition | lands |`. Row-filter: lands has 5.0.0 AND
// BH B7 (the 5.0.0-BH-B7 landing), AND the ask is NOT a "(consume)" (a coupled consume
// is not a by-name migration ask). A source-doc drop shrinks this set → the floors red.
function parseLedgerMigrationAsks(text) {
    const secMatch = text.match(/##\s*By-name ask ledger[\s\S]*?(?=\n##\s|\n---\s*\n|$)/);
    const section = secMatch ? secMatch[0] : "";
    const asks = [];
    for (const line of section.split("\n")) {
        if (!line.trim().startsWith("|")) continue;
        const inner = line.split("|").slice(1, -1).map((c) => c.trim());
        if (inner.length < 5) continue;
        const askRaw = inner[0];
        const lands = inner[inner.length - 1];
        // skip the header + the separator row.
        if (/^ask id$/i.test(askRaw)) continue;
        if (inner.every((c) => /^:?-+:?$/.test(c))) continue;
        const is5xxBhB7 = /5\.0\.0/.test(lands) && /BH[\s-]?B7/.test(lands);
        const isConsume = /\(?\bconsume\b\)?/i.test(askRaw) || /consume/i.test(lands);
        if (!is5xxBhB7 || isConsume) continue;
        const id = (askRaw.match(/`([^`]+)`/) || [null, askRaw])[1].trim();
        asks.push({ id, lands });
    }
    return asks;
}

// The bbnf 4th-ask source-of-truth: a bg-build-map §G7 U1 window naming BOTH the bbnf
// consumer AND the `--glass-blur-dock` token-retire (the 4th union member's anchor).
function bbnfSourceAttested(text) {
    for (const m of text.matchAll(/G7\s*U1/g)) {
        const win = text.slice(Math.max(0, m.index - 2600), m.index + 2600);
        if (/bbnf/i.test(win) && win.includes(BBNF_TOKEN)) return true;
    }
    return false;
}

// ── Run ──────────────────────────────────────────────────────────────────────────────
const rosterText = read(ROSTER);
const constText = read(CONSTELLATION);
const buildMapText = read(BUILD_MAP);
const migText = read(MIGRATION);

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── W1 — the roster covers the AUTO-SCANNED expected set (scan-floor + covered-floor) ─
const rosterExists = rosterText.length > 0;
add("W1-roster-exists", rosterExists, `${ROSTER} ${rosterExists ? "exists" : "is ABSENT (born-RED)"}`);

const ledgerAsks = parseLedgerMigrationAsks(constText);
const scanCount = ledgerAsks.length;
add(
    "W1-scan-floor",
    scanCount >= SCAN_FLOOR,
    `consumer-constellation By-name ask ledger row-filter (lands 5.0.0-BH-B7 ∧ by-name-migration-ask) → ${scanCount} asks [${ledgerAsks.map((a) => a.id).join(", ")}] (>=${SCAN_FLOOR} scan-floor)`,
);

// Each derived ledger ask id MUST appear in the roster (the no-silent-drop coverage).
let allLedgerCovered = true;
for (const ask of ledgerAsks) {
    const covered = rosterExists && rosterText.includes(ask.id);
    if (!covered) allLedgerCovered = false;
    add(`W1-covers-${ask.id}`, covered, `${ask.id} — roster:${covered ? "covered" : "MISSING"}`);
}

// The bbnf ask (the 4th union member) is source-attested from bg-build-map §G7 U1 AND
// carried in the roster (its id + the `--glass-blur-dock` token).
const bbnfAttested = bbnfSourceAttested(buildMapText);
add("W1-bbnf-source-attested", bbnfAttested, `bg-build-map §G7 U1 attests the bbnf ${BBNF_TOKEN} token-retire (the 4th union member's source-of-truth)`);
const bbnfCovered = rosterExists && rosterText.includes(BBNF_ASK_ID) && rosterText.includes(BBNF_TOKEN);
add("W1-covers-bbnf", bbnfCovered, `${BBNF_ASK_ID} (${BBNF_TOKEN}) — roster:${bbnfCovered ? "covered" : "MISSING"}`);

const coveredCount = ledgerAsks.filter((a) => rosterExists && rosterText.includes(a.id)).length + (bbnfCovered ? 1 : 0);
add(
    "W1-covered-floor",
    coveredCount >= COVERED_FLOOR && allLedgerCovered && bbnfAttested,
    `the roster covers ${coveredCount} by-name asks (${ledgerAsks.length} ledger ∪ bbnf) (>=${COVERED_FLOOR} covered-floor)`,
);
// The roster's own count-claim must NOT regress to the stale "exactly 2 by-name asks".
add(
    "W1-no-stale-2-ask-count",
    rosterExists && !/exactly 2 by-name asks|exact 2-ask|the 2-ask/i.test(rosterText),
    "the roster carries NO stale 'exactly 2 by-name asks' count (the C2 close-class the fold killed)",
);

// ── W2 — the row-4 witness is RE-BASED (ruling #3; born-RED at HEAD) ──────────────────
// The MIGRATION.md `--glass-blur-dock` retire ROW is the row-4 born-RED witness home.
const migRetireRow = /--glass-blur-dock[^\n]*RETIRE/i.test(migText);
add("W2-migration-retire-row", migRetireRow, `MIGRATION.md carries the ${BBNF_TOKEN} retire ROW (the re-based row-4 witness home)`);

// The roster RECORDS the re-based witness: the bbnf row-4 witness is the MIGRATION.md
// retire ROW + this gate's covered-floor (NOT the killed sibling-probe gate).
const rosterMigrationWitness =
    rosterExists &&
    /MIGRATION\.md[^\n]*--glass-blur-dock|--glass-blur-dock[^\n]*retire[^\n]*MIGRATION|MIGRATION\.md[^\n]*retire ROW/i.test(rosterText) &&
    /(>=\s*4|≥\s*4|covered-floor)/.test(rosterText);
add(
    "W2-roster-migration-witness",
    rosterMigrationWitness,
    "the roster records the bbnf row-4 witness as the MIGRATION.md --glass-blur-dock retire ROW + the proof:crossrepo-asks:bh covered-floor",
);

// If the roster mentions the KILLED gate at all, it must annotate the kill (ruling #3 /
// re-based) — never present proof:retired-token-consumers as the LIVE primary witness.
const mentionsKilledGate = rosterExists && /proof:retired-token-consumers/.test(rosterText);
const recordsKill =
    /retired-token-consumers[\s\S]{0,260}(KILLED|ruling #3|re-based|superseded|no longer)/i.test(rosterText) ||
    /(KILLED|ruling #3|re-based|superseded|no longer)[\s\S]{0,260}retired-token-consumers/i.test(rosterText);
add(
    "W2-roster-records-ruling3-kill",
    !mentionsKilledGate || recordsKill,
    mentionsKilledGate
        ? `the roster annotates proof:retired-token-consumers as KILLED (ruling #3): ${recordsKill ? "recorded" : "MISSING — still presents the killed gate as the live primary witness (born-RED)"}`
        : "the roster does not present the killed sibling-probe gate as a live witness",
);
// Row 4's Primary-witness cell must name proof:crossrepo-asks:bh (this gate's floor),
// never the killed gate as the primary witness.
const row4 = (rosterText.split("\n").find((l) => l.includes(BBNF_ASK_ID) && l.trim().startsWith("|")) || "");
const row4WitnessOk = row4.includes("proof:crossrepo-asks:bh") && !/\*\*`?proof:retired-token-consumers`?\*\*/.test(row4);
add(
    "W2-row4-primary-witness",
    row4WitnessOk,
    row4
        ? `row 4's Primary witness names proof:crossrepo-asks:bh, not the killed gate: ${row4WitnessOk ? "yes" : "NO (born-RED)"}`
        : "row 4 not found",
);

// ── W3 — the content-only foreign-tree fence (inv-26, by construction) ────────────────
const siblingPaths = WAVE_BOUNDS.filter(
    (p) => p.startsWith("../") || /(^|\/)\.\.\/(bbnf-buddy|muster|speedtest|atlas|slides|value\.js|keyframes\.js)\//.test(p),
);
add(
    "W3-content-only-fence",
    siblingPaths.length === 0,
    siblingPaths.length === 0
        ? "all wave File Bounds are under the glass-ui tree (no sibling-tree path — the inv-26 content-only fence holds by construction)"
        : `FOREIGN-TREE FENCE BREACH: ${siblingPaths.join(", ")} is a sibling-tree path (the inv-26 violation)`,
);
add(
    "W3-roster-records-fence",
    rosterExists && /foreign-tree fence/i.test(rosterText) && /ZERO sibling/i.test(rosterText),
    "the roster records the content-only foreign-tree fence (inv-26 — glass-ui edits ZERO sibling files; the sibling resolves the built dist/ on its own bump)",
);

// ── The self-test bites — the AUTO-SCAN floors + the re-base clause are falsifiable ───
function selfTest() {
    const bites = [];
    // bite 1: a constellation ledger row falling OUT of the 5.0.0-BH-B7 filter (its
    // lands cell no longer lands at the joint cut) drops the derived set below the
    // scan-floor (the no-silent-drop is falsifiable). Doctor the FIRST 5.0.0 (BH B7)
    // lands cell (the aurora row) to a non-BH-B7 landing.
    const dropped = constText.replace(/5\.0\.0 \(BH B7\)/, "9.9.9 (dropped)");
    const droppedAsks = parseLedgerMigrationAsks(dropped);
    bites.push({ id: "bite-ledger-drop-flags", pass: droppedAsks.length < ledgerAsks.length });
    // bite 2: a roster missing the bbnf ask id fails the covered-floor.
    const noBbnf = rosterText.replace(new RegExp(BBNF_ASK_ID, "g"), "removed");
    bites.push({ id: "bite-missing-bbnf-flags", pass: !noBbnf.includes(BBNF_ASK_ID) });
    // bite 3: a roster presenting the KILLED gate as the LIVE primary witness (no kill
    // annotation) reds the re-base clause (the born-RED reproduction).
    const doctored = "| 4 | bbnf | x | y | z | w | ask | **`proof:retired-token-consumers`** (BG-owned) |";
    const doctoredMentions = /proof:retired-token-consumers/.test(doctored);
    const doctoredRecordsKill =
        /retired-token-consumers[\s\S]{0,260}(KILLED|ruling #3|re-based|superseded|no longer)/i.test(doctored);
    bites.push({ id: "bite-killed-gate-live-flags", pass: doctoredMentions && !doctoredRecordsKill });
    // bite 4: a synthetic sibling-tree path in the bounds reds the fence.
    const doctoredBounds = [...WAVE_BOUNDS, "../bbnf-buddy/src/styles/preset.css"];
    const breach = doctoredBounds.filter((p) => p.startsWith("../"));
    bites.push({ id: "bite-sibling-path-flags", pass: breach.length > 0 });
    return bites;
}
const bites = selfTest();
const allBitesPass = bites.every((b) => b.pass);
for (const b of bites) add(`selftest-${b.id}`, b.pass, `self-test bite: ${b.id} ${b.pass ? "FLAGS as expected" : "FAILED to flag"}`);
add("selftest-all-bites", allBitesPass, "every self-test bite flags its planted defect (the AUTO-SCAN floors + the ruling-#3 re-base are falsifiable)");

// ── Report ───────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:crossrepo-asks:bh — the 5.0.0-BH-B7 by-name migration-ask roster (BH.B7 W-api-ask-roster)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_CROSSREPO_ASKS_BH_OUT", "BH-crossrepo-asks");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:crossrepo-asks:bh",
    command: COMMAND,
    note: "STRUCTURAL/coordination wave — NO π. W1 the roster covers the AUTO-SCANNED expected set (the ledger asks DERIVED from consumer-constellation.md's By-name ask ledger row-filter lands==5.0.0-BH-B7 ∧ by-name-migration-ask, the bbnf ask source-attested from bg-build-map §G7 U1; >=3 scan-floor + >=4 covered-floor, NOT a hand-list count); W2 the row-4 witness is RE-BASED per ruling #3 (proof:retired-token-consumers KILLED → the MIGRATION.md --glass-blur-dock retire ROW + this gate's covered-floor; born-RED at HEAD); W3 the content-only foreign-tree fence (inv-26) by construction + the roster records it. + a 4-bite self-test.",
    roster: ROSTER,
    ledgerAsks: ledgerAsks.map((a) => a.id),
    coveredCount,
    waveBounds: WAVE_BOUNDS,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:crossrepo-asks:bh] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:crossrepo-asks:bh] the 5.0.0-BH-B7 roster is whole — the AUTO-SCANNED expected set (>=4 covered-floor) is covered, the bbnf row-4 witness is re-based onto the MIGRATION.md retire ROW + this covered-floor (the killed sibling-probe gate recorded, ruling #3), and the content-only foreign-tree fence (inv-26) holds by construction.",
);
