// proof:bc-fold-ledger — BC.W-FOLD-LEDGER: the no-silent-drop floor (the anti-evasion close oracle).
//
// The BB close shipped with 18 ci-tagged reds riding along + a 14-row chronic-fold
// table authored but never executed — because the close was an honest-flush ceremony
// with no mechanical floor. BC's close is a VERIFICATION: docs/tranches/BC/FOLD-LEDGER.json
// is the machine witness that every chronic + every prior-tranche deferral is folded +
// DECIDED, not re-stamped a seventh time. This gate REDs the close on any dropped /
// undecided / phantom-destination / band-only-destination / stale-transcribed-band row.
//
// CLAUSES (F1-F7):
//   F1   doc⟷JSON completeness — every id in DEFERRAL-LEDGER.md's tables appears in the
//        JSON and vice-versa; the 213-item count is asserted (a drift REDs).
//   F1.b BAND DERIVED, NOT TRANSCRIBED — a BUILD/MET row's `band` field MUST equal the
//        named wave's on-disk `**Band:**` header (the leading band token), NEVER the doc
//        `(Band N)` parenthetical. A transcribed-stale band drifts from the derived value
//        and REDs. The wave-id + its on-disk header are the SINGLE band authority.
//   F2   decided-destination soundness — every BUILD/MET row's `wave` resolves to a real
//        docs/tranches/BC/waves/BC.W-*.md. A phantom-dest REDs.
//   F2.b band-string rejection — a BUILD/MET `wave` that is EMPTY or matches /^Band\s*\d+/
//        (a bare band label like "Band 8/perf", NOT a BC.W-* id) REDs. A band is a thematic
//        grouping, never a destination.
//   F3   no-undecided/no-book — every row's disposition ∈ {BUILD,RETIRE,MET,
//        HELD-with-rationale,SUPERSEDED}; a book/empty/re-stamped/deferred disposition REDs.
//   F4   HELD-rationale — every HELD-with-rationale row carries a non-empty `rationale`
//        AND a `trigger`; a bare HELD REDs.
//   F5   requirement-traceability — each of the 10 BC.W-PM-SYNTHESIS root-failure-class
//        requirements maps to a real Band-0 wave (the synthesis → cure traceability).
//   F6   close-union binding — the close runs `--run full` siblings-absent per-round; a
//        --run local-only close path REDs (the masked-accretion cure).
//   F7   disposition-register reconcile — the 2 open register destinations carry a real BC
//        wave; the 28 honest-hold rows carry reStampedAt:"BC" + rationale (in-place, no delete).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-bc-fold-ledger.mjs --self-test` runs 7
// synthetic-fixture bites — a dropped item (F1 RED), a stale-transcribed band (F1.b RED), a
// phantom dest (F2 RED), a band-only dest "Band 8/perf" (F2.b RED), a book disposition
// (F3 RED), a bare HELD (F4 RED), a --run local-only close (F6 RED) — each MUST flag.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const LEDGER_JSON = join(ROOT, "docs/tranches/BC/FOLD-LEDGER.json");
const LEDGER_DOC = join(ROOT, "docs/tranches/BC/DEFERRAL-LEDGER.md");
const WAVES_DIR = join(ROOT, "docs/tranches/BC/waves");
const REGISTER = join(ROOT, "docs/tranches/AX/audit/DISPOSITION-REGISTER.json");
const SYNTHESIS = join(ROOT, "docs/tranches/BC/waves/BC.W-PM-SYNTHESIS.md");

const EXPECTED_COUNT = 213;
const DISPOSITIONS = new Set([
    "BUILD",
    "RETIRE",
    "MET",
    "HELD-with-rationale",
    "SUPERSEDED",
]);
const DESTINATION_DISPOSITIONS = new Set(["BUILD", "MET"]);
const BAND_ONLY_RE = /^Band\s*\d+/i;
const BC_WAVE_RE = /^BC\.W-[A-Z0-9-]+$/;

// ── doc id extraction ──────────────────────────────────────────────────────────
// The DEFERRAL-LEDGER.md tables carry `| id | ... |` rows whose first cell is the
// machine id. We extract every first-cell token that looks like a fold id (the §1-§11
// item rows). Header rows (`| id | what |`) and separators (`|---|`) are skipped.
//
// The §8 phantom-successor table carries the 4 canonical phantom-successor names PLUS 2
// GENEALOGY-ONLY cross-reference rows (phantom-w-aur-t5 → DECIDED-at-BB.W-AUR-KUWAHARA,
// duplicating ay-w-aur-t5-kuwahara; phantom-w-kf-consumer → the by-name kf consume). These
// are navigation genealogy, NOT distinct folds (the no-double-count rule, §0): they cross-
// reference ids already in the per-tranche tables, so they are excluded from the distinct-
// fold id-set the 213-count + the JSON⟷doc parity assert against. The doc keeps them for
// the human reader; the machine ledger carries one row per DISTINCT fold.
const GENEALOGY_IDS = new Set(["phantom-w-aur-t5", "phantom-w-kf-consumer"]);

function extractDocIds(docText) {
    const ids = new Set();
    for (const line of docText.split("\n")) {
        const m = line.match(/^\|\s*([a-z][a-z0-9-]+)\s*\|/);
        if (!m) continue;
        const id = m[1];
        if (id === "id" || id === "ask" || id === "source") continue; // header cells
        if (GENEALOGY_IDS.has(id)) continue; // §8 genealogy cross-refs, not distinct folds
        ids.add(id);
    }
    return ids;
}

// ── on-disk band derivation ─────────────────────────────────────────────────────
// The SINGLE band authority: the named wave's `**Band:**` header line 2/3. We parse the
// LEADING band token (a number, or the FORENSICS letter F) — the parenthetical and any
// "/ N" co-band suffix are advisory. So "**Band:** 1 / 12 (glass…)" derives 1;
// "**Band:** 4 (cross-cutting)" derives 4; "**Band:** F (FORENSICS)" derives "F".
const bandCache = new Map();
function deriveBand(waveId) {
    if (bandCache.has(waveId)) return bandCache.get(waveId);
    const file = join(WAVES_DIR, `${waveId}.md`);
    let band = null;
    if (existsSync(file)) {
        const text = readFileSync(file, "utf8");
        const m = text.match(/\*\*Band:\*\*\s*([0-9]+|F)\b/);
        if (m) band = m[1] === "F" ? "F" : Number(m[1]);
    }
    bandCache.set(waveId, band);
    return band;
}

function waveSpecExists(waveId) {
    return (
        typeof waveId === "string" &&
        BC_WAVE_RE.test(waveId) &&
        existsSync(join(WAVES_DIR, `${waveId}.md`))
    );
}

// ── the 10 PM-SYNTHESIS root-failure-class requirements (F5) ─────────────────────
// The requirement → wave map is the §22 table (lines 27-36): each requirement is "owned
// by" a Band-0 wave (BC.W-GESTALT-FIRST / BC.W-PAINT-GATE / BC.W-FOLD-LEDGER). We parse
// the `| # | failure class | requirement | owned by |` table and assert all 10 rows name
// a Band-0 wave that resolves on disk with a derived band of 0.
function extractSynthesisRequirements(text) {
    const reqs = [];
    for (const line of text.split("\n")) {
        const m = line.match(/^\|\s*(\d+)\s*\|.*\|.*\|\s*(BC\.W-[A-Z0-9-]+.*?)\s*\|/);
        if (!m) continue;
        const num = Number(m[1]);
        const owners = [...m[2].matchAll(/BC\.W-[A-Z0-9-]+/g)].map((x) => x[0]);
        reqs.push({ num, owners });
    }
    return reqs;
}

// ── F6: close-union binding ──────────────────────────────────────────────────────
// The ledger declares its close-run mode in a `closeUnion` block. The masked-accretion
// cure: the close MUST run `--run full` siblings-absent per-round; a `--run local`-only
// close path REDs. The JSON records `{ "runMode": "full", "perRound": true,
// "localOnlyForbidden": true }`; any other runMode (or a missing/false perRound) REDs.
function checkCloseUnion(cu, fail) {
    if (!cu || typeof cu !== "object") {
        fail("F6", "FOLD-LEDGER.json carries no `closeUnion` block — the close-union binding is undeclared.");
        return;
    }
    if (cu.runMode !== "full") {
        fail(
            "F6",
            `closeUnion.runMode is "${cu.runMode}" — the close MUST run \`--run full\` siblings-absent; a \`--run local\`-only close is forbidden (the masked-accretion cure).`,
        );
    }
    if (cu.perRound !== true) {
        fail("F6", "closeUnion.perRound is not true — the full-union close must fire PER-ROUND, not only at the terminal cut (W-CLOSE-BATTERY).");
    }
    if (cu.localOnlyForbidden !== true) {
        fail("F6", "closeUnion.localOnlyForbidden is not true — the --run local-only close path must be explicitly forbidden.");
    }
}

// ── core check ───────────────────────────────────────────────────────────────────
// Operates on already-loaded objects so the self-test can feed synthetic fixtures.
function runChecks({ ledger, docIds, register, synthesisText }) {
    const failures = [];
    const fail = (clause, msg) => failures.push({ clause, msg });

    const rows = Array.isArray(ledger?.items) ? ledger.items : [];
    const jsonIds = new Set(rows.map((r) => r.id));

    // F1 — count + doc⟷JSON completeness.
    const count = rows.length;
    if (count !== EXPECTED_COUNT) {
        fail("F1", `FOLD-LEDGER.json carries ${count} rows, expected ${EXPECTED_COUNT} (the canonical 213-item fold) — a count drift REDs.`);
    }
    for (const id of docIds) {
        if (!jsonIds.has(id))
            fail("F1", `id "${id}" is in DEFERRAL-LEDGER.md but absent from FOLD-LEDGER.json (a doc item silently dropped from the machine source).`);
    }
    for (const id of jsonIds) {
        if (!docIds.has(id))
            fail("F1", `id "${id}" is in FOLD-LEDGER.json but absent from DEFERRAL-LEDGER.md (a machine row with no human face).`);
    }

    // per-row clauses.
    for (const row of rows) {
        const id = row.id ?? "<no-id>";

        // F3 — every row DECIDED.
        if (!DISPOSITIONS.has(row.disposition)) {
            fail("F3", `id "${id}" disposition "${row.disposition}" ∉ {BUILD,RETIRE,MET,HELD-with-rationale,SUPERSEDED} — the chronic re-stamp (book/deferred/re-stamped/empty) is forbidden; every item is DECIDED.`);
        }

        // F4 — HELD carries rationale + trigger.
        if (row.disposition === "HELD-with-rationale") {
            if (!row.rationale || !String(row.rationale).trim())
                fail("F4", `id "${id}" is HELD-with-rationale but carries no non-empty rationale (a bare HELD is a deferral wearing a decision's clothing).`);
            if (!row.trigger || !String(row.trigger).trim())
                fail("F4", `id "${id}" is HELD-with-rationale but names no trigger (the ≥2-consumer / Baseline-graduation condition that flips it to BUILD).`);
        }

        // F2 / F2.b — decided-destination soundness for BUILD/MET.
        if (DESTINATION_DISPOSITIONS.has(row.disposition)) {
            const wave = row.wave;
            if (!wave || !String(wave).trim()) {
                fail("F2.b", `id "${id}" is ${row.disposition} but carries an EMPTY wave — a disposition MUST resolve to a docs/tranches/BC/waves/BC.W-*.md, never a blank cell.`);
            } else if (BAND_ONLY_RE.test(String(wave).trim())) {
                fail("F2.b", `id "${id}" is ${row.disposition} but its wave "${wave}" is a bare band label (/^Band\\s*\\d+/) — a band is a THEMATIC grouping, never a destination; resolve it to a BC.W-* id.`);
            } else if (!waveSpecExists(wave)) {
                fail("F2", `id "${id}" is ${row.disposition} but its wave "${wave}" names no spec at docs/tranches/BC/waves/${wave}.md (a phantom destination).`);
            } else {
                // F1.b — band DERIVED, not transcribed.
                const derived = deriveBand(wave);
                if (derived === null) {
                    fail("F1.b", `id "${id}" wave "${wave}" has no parseable on-disk **Band:** header — the band authority is missing.`);
                } else if (row.band !== derived) {
                    fail(
                        "F1.b",
                        `id "${id}" band ${JSON.stringify(row.band)} disagrees with its wave "${wave}" on-disk **Band:** ${JSON.stringify(derived)} — the band field is DERIVED from the named wave's header, NEVER transcribed from the doc (Band N) parenthetical.`,
                    );
                }
            }
        }
    }

    // F5 — the 10 PM-SYNTHESIS requirements each map to a real Band-0 wave.
    const reqs = extractSynthesisRequirements(synthesisText ?? "");
    if (reqs.length !== 10) {
        fail("F5", `BC.W-PM-SYNTHESIS carries ${reqs.length} root-failure-class requirement rows, expected 10 (the 29→10 dedup) — a drift REDs.`);
    }
    for (const req of reqs) {
        if (req.owners.length === 0) {
            fail("F5", `PM-SYNTHESIS requirement #${req.num} names no owning wave.`);
            continue;
        }
        // every named owner must resolve on disk (no phantom); AND the requirement must be
        // ROOTED in a Band-0 wave (≥1 Band-0 owner). The downstream cross-band waves a
        // requirement also names (e.g. #3's BC.W-ADAPTIVE-RECONCILE Band 1, #8's
        // BC.W-WEBGPU-EVERYWHERE Band 4) are the landing sites, not the Band-0 root.
        let hasBand0 = false;
        for (const owner of req.owners) {
            if (!waveSpecExists(owner)) {
                fail("F5", `PM-SYNTHESIS requirement #${req.num} owner "${owner}" names no wave-spec on disk.`);
            } else if (deriveBand(owner) === 0) {
                hasBand0 = true;
            }
        }
        if (!hasBand0) {
            fail("F5", `PM-SYNTHESIS requirement #${req.num} names no Band-0 owner (owners: ${req.owners.join(", ")}) — each root-failure-class cure must be ROOTED in a Band-0 wave.`);
        }
    }

    // F6 — close-union binding.
    checkCloseUnion(ledger?.closeUnion, fail);

    // F7 — disposition-register reconcile (2 open dests re-pointed; 28 holds re-stamped).
    const regItems = Array.isArray(register?.items) ? register.items : [];
    const OPEN_DESTS = {
        "styles-critical-split": "BC.W-CSS-CRITICAL",
        "deck-subpath": "BC.W-DECK",
    };
    // The 2 open destinations carry the close-gated flip the BB register could not fire —
    // a real BC `resolvedBy` wave (re-pointed to their BC homes). They stay `book` rows
    // (the build lands library-internal; min-consumers stays un-MET), re-stamped in place.
    for (const [rowId, expectedWave] of Object.entries(OPEN_DESTS)) {
        const row = regItems.find((r) => r.id === rowId);
        if (!row) {
            fail("F7", `disposition-register row "${rowId}" (an open destination) is missing — F7 re-points it to ${expectedWave}.`);
            continue;
        }
        if (row.resolvedBy !== expectedWave) {
            fail("F7", `disposition-register row "${rowId}" must carry resolvedBy "${expectedWave}" (the close-gated flip the BB register could not fire); found ${JSON.stringify(row.resolvedBy)}.`);
        }
    }
    // The 28 honest-hold book rows: reStampedAt:"BC" + a non-empty rationale (the in-place
    // fold — a HOLD is folded in place, never deleted; L-inv-8). This covers all 28 book
    // rows INCLUDING the 2 open dests (which are re-pointed AND re-stamped).
    let restampedBC = 0;
    for (const row of regItems) {
        if (row.disposition !== "book") continue;
        if (row.reStampedAt !== "BC") {
            fail("F7", `disposition-register book row "${row.id}" must be re-stamped reStampedAt:"BC" (an honest hold is folded in-place, never deleted — L-inv-8); found ${JSON.stringify(row.reStampedAt)}.`);
        } else if (!row.reStampNote || !String(row.reStampNote).trim()) {
            fail("F7", `disposition-register book row "${row.id}" is reStampedAt:"BC" but carries no rationale (reStampNote).`);
        } else {
            restampedBC++;
        }
    }
    if (restampedBC !== 28) {
        fail("F7", `expected 28 honest-hold book rows re-stamped reStampedAt:"BC" in-place, found ${restampedBC} (L-inv-8 no-delete — every booked row is folded in place).`);
    }

    return { failures, count, restampedBC, reqCount: reqs.length };
}

// ── self-test ────────────────────────────────────────────────────────────────────
function loadReal() {
    for (const [label, p] of [
        ["FOLD-LEDGER.json", LEDGER_JSON],
        ["DEFERRAL-LEDGER.md", LEDGER_DOC],
        ["DISPOSITION-REGISTER.json", REGISTER],
        ["BC.W-PM-SYNTHESIS.md", SYNTHESIS],
    ]) {
        if (!existsSync(p)) {
            console.error(`[proof:bc-fold-ledger] missing input: ${label} (${p})`);
            process.exit(1);
        }
    }
    return {
        ledger: JSON.parse(readFileSync(LEDGER_JSON, "utf8")),
        docIds: extractDocIds(readFileSync(LEDGER_DOC, "utf8")),
        register: JSON.parse(readFileSync(REGISTER, "utf8")),
        synthesisText: readFileSync(SYNTHESIS, "utf8"),
    };
}

function clausesHit(failures) {
    return new Set(failures.map((f) => f.clause));
}

function selfTest() {
    const real = loadReal();
    const bites = [];

    const clone = (o) => JSON.parse(JSON.stringify(o));
    // pick a genuine BUILD row to mutate (one whose wave resolves on disk).
    const buildRow = real.ledger.items.find(
        (r) => r.disposition === "BUILD" && waveSpecExists(r.wave),
    );
    const heldRow = real.ledger.items.find(
        (r) => r.disposition === "HELD-with-rationale",
    );

    // bite 1 — dropped item → F1 RED.
    {
        const led = clone(real.ledger);
        led.items.pop();
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["dropped-item → F1", clausesHit(failures).has("F1")]);
    }
    // bite 2 — stale-transcribed band → F1.b RED.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => x.id === buildRow.id);
        const derived = deriveBand(r.wave);
        r.band = derived === 99 ? 98 : 99; // a band that disagrees with the wave header
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["stale-transcribed-band → F1.b", clausesHit(failures).has("F1.b")]);
    }
    // bite 3 — phantom dest → F2 RED.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => x.id === buildRow.id);
        r.wave = "BC.W-DOES-NOT-EXIST";
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["phantom-dest → F2", clausesHit(failures).has("F2")]);
    }
    // bite 4 — band-only dest "Band 8/perf" → F2.b RED.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => x.id === buildRow.id);
        r.wave = "Band 8/perf";
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["band-only-dest → F2.b", clausesHit(failures).has("F2.b")]);
    }
    // bite 5 — book disposition → F3 RED.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => x.id === buildRow.id);
        r.disposition = "book";
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["book-disposition → F3", clausesHit(failures).has("F3")]);
    }
    // bite 6 — bare HELD → F4 RED.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => x.id === heldRow.id);
        delete r.rationale;
        delete r.trigger;
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["bare-HELD → F4", clausesHit(failures).has("F4")]);
    }
    // bite 7 — local-only close → F6 RED.
    {
        const led = clone(real.ledger);
        led.closeUnion = { runMode: "local", perRound: false, localOnlyForbidden: false };
        const { failures } = runChecks({ ...real, ledger: led });
        bites.push(["local-only-close → F6", clausesHit(failures).has("F6")]);
    }

    console.log("proof:bc-fold-ledger — SELF-TEST (born-RED→GREEN, 7 bites)");
    let allFlag = true;
    for (const [name, flagged] of bites) {
        console.log(`  ${flagged ? "FLAGGED" : "MISSED "}  ${name}`);
        if (!flagged) allFlag = false;
    }
    // the real ledger itself must be clean (GREEN-after).
    const realRun = runChecks(real);
    console.log(`  real ledger failures   : ${realRun.failures.length}`);
    for (const f of realRun.failures.slice(0, 20))
        console.log(`    [${f.clause}] ${f.msg}`);
    if (!allFlag) {
        console.error("\n[proof:bc-fold-ledger] SELF-TEST FAILED — a synthetic-broken fixture did not flag its clause; the detector is not load-bearing.");
        process.exit(1);
    }
    if (realRun.failures.length > 0) {
        console.error("\n[proof:bc-fold-ledger] SELF-TEST FAILED — the REAL ledger is not clean (the GREEN-after state must pass every clause).");
        process.exit(1);
    }
    console.log("\n[proof:bc-fold-ledger] SELF-TEST GREEN — all 7 bites flag born-RED, the real ledger passes every clause.");
    process.exit(0);
}

// ── entry ────────────────────────────────────────────────────────────────────────
if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    const real = loadReal();
    const { failures, count, restampedBC, reqCount } = runChecks(real);
    console.log("proof:bc-fold-ledger — the no-silent-drop floor (BC.W-FOLD-LEDGER)");
    console.log(`  ledger rows            : ${count} (expected ${EXPECTED_COUNT})`);
    console.log(`  PM-SYNTHESIS reqs      : ${reqCount} (expected 10)`);
    console.log(`  register holds re-stamped BC : ${restampedBC}`);
    console.log(`  failures               : ${failures.length}`);
    for (const f of failures) console.error(`  [${f.clause}] ${f.msg}`);
    if (failures.length > 0) {
        console.error(`\n[proof:bc-fold-ledger] ${failures.length} fold-ledger violation(s) — a chronic was dropped, left undecided, or names a phantom/band-only destination. The close cannot proceed.`);
        process.exit(1);
    }
    console.log("\n[proof:bc-fold-ledger] every one of the 213 folds is present + DECIDED + destination-sound — the no-silent-drop floor holds.");
    process.exit(0);
}
