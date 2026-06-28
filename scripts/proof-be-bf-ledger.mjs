// proof:be-bf-ledger — BG.W-BE-BF-LEDGER: the 70-wave BE+BF parity floor (the no-silent-drop oracle).
//
// BE (39 specs) and BF (31 specs) were tranche-DEVELOPED but NEVER executed as their own
// tranches — both were unioned into BG. Their per-wave deliverables must NOT vanish in the
// fold: every one of the 70 BE+BF wave-specs is DECIDED in docs/tranches/BG/BE-BF-LEDGER.md
// with exactly one of three dispositions, each carrying load-bearing evidence:
//
//   LANDED-no-build           — the wave's mechanism is already on committed disk (it landed
//                               via an earlier integration; BG owes NO new build). The
//                               `landed-evidence` cell names the on-disk path, which MUST
//                               existSync (you cannot claim LANDED without pointing at the file).
//   NEVER-BUILT-names-a-wave  — never built; a real BG wave carries the work forward. The
//                               `carry-dest` cell names a BG.W-* wave that MUST appear in the
//                               locked BG wave registry (a phantom/typo dest REDs).
//   RETIRE                    — never built, retired; the `rationale` cell MUST be non-empty.
//
// The corpus (the 70 wave ids) is DERIVED from disk — readdir of docs/tranches/{BE,BF}/waves —
// never a hand-list, so a new/renamed BE/BF spec is enrolled the moment it lands and a dropped
// row REDs (the no-hand-list discipline, the proof:visual-runner / proof:bc-fold-ledger precedent).
//
// CLAUSES (L1-L8):
//   L1  completeness — every BE+BF wave-spec on disk appears as EXACTLY ONE ledger row; no
//       missing row (a silent drop) and no extra/duplicate/unknown row.
//   L2  disposition vocabulary — every row ∈ {LANDED-no-build, NEVER-BUILT-names-a-wave, RETIRE}.
//   L3  LANDED soundness — a LANDED-no-build row's `landed-evidence` is a repo-relative path
//       that existsSync; its `carry-dest` is empty (a LANDED row owes no forward wave).
//   L4  NEVER-BUILT soundness — a NEVER-BUILT row's `carry-dest` matches /^BG\.W-[A-Z0-9-]+$/
//       AND is a member of the embedded BG wave registry (the locked plan); its `landed-evidence`
//       is empty (a not-built row has no on-disk mechanism). A bare band label or phantom dest REDs.
//   L5  RETIRE soundness — a RETIRE row carries a non-empty `rationale` (≥20 chars) and neither
//       a landed-evidence path nor a carry-dest (it is neither landed nor carried).
//   L6  count — exactly 39 BE + 31 BF = 70 rows (the count DERIVED from disk).
//   L7  registry well-formed — the embedded BG WAVE REGISTRY parses to ≥1 BG.W-* entries, and
//       (conditional) when docs/tranches/BG/execution/bg-build-map.md is present, every registry
//       entry appears in the build-map (the registry cannot smuggle a wave not in the locked plan).
//   L8  every row carries a non-empty rationale/note (the human face).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-be-bf-ledger.mjs --self-test` runs synthetic
// bites — a dropped row (L1 RED), a bad disposition (L2 RED), a LANDED row whose evidence path
// does not exist (L3 RED), a NEVER-BUILT phantom dest (L4 RED), a bare RETIRE (L5 RED), an extra
// unknown row (L1 RED) — each MUST flag, then the REAL ledger must pass every clause.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const LEDGER = join(ROOT, "docs/tranches/BG/BE-BF-LEDGER.md");
const BE_WAVES = join(ROOT, "docs/tranches/BE/waves");
const BF_WAVES = join(ROOT, "docs/tranches/BF/waves");
const BUILD_MAP = join(ROOT, "docs/tranches/BG/execution/bg-build-map.md");

const DISPOSITIONS = new Set([
    "LANDED-no-build",
    "NEVER-BUILT-names-a-wave",
    "RETIRE",
]);
const BG_WAVE_RE = /^BG\.W-[A-Z0-9-]+$/;
const BE_BF_WAVE_RE = /^(BE|BF)\.W-[A-Z0-9-]+$/;
const BAND_ONLY_RE = /^Band\s*\d+/i;
const EMPTY = new Set(["", "—", "-", "n/a", "na"]);
const isEmpty = (v) => EMPTY.has(String(v ?? "").trim().toLowerCase());

// ── disk-derived corpus (the no-hand-list discipline) ───────────────────────────
// The 70 expected wave ids are READ from disk, never transcribed: a new BE/BF spec is
// enrolled the moment it lands; a removed spec drops out. The ledger row-set must match
// this derived set exactly (L1/L6).
function deriveCorpus() {
    const ids = new Set();
    for (const dir of [BE_WAVES, BF_WAVES]) {
        if (!existsSync(dir)) continue;
        for (const f of readdirSync(dir)) {
            if (!f.endsWith(".md")) continue;
            ids.add(f.slice(0, -3));
        }
    }
    return ids;
}

// ── the embedded BG wave registry (the valid carry-dest set, L4/L7) ─────────────
// Parsed from the ledger's `## BG WAVE REGISTRY` fenced block — one BG.W-* per line. The
// registry IS the locked BG plan (FINAL.md / bg-build-map.md); L7 cross-checks it against
// the build-map when present so a fabricated registry entry (a wave not in the plan) REDs.
function extractRegistry(docText) {
    const ids = new Set();
    const m = docText.match(/##\s*BG WAVE REGISTRY[\s\S]*?```(?:text)?\n([\s\S]*?)```/i);
    if (!m) return ids;
    for (const tok of m[1].matchAll(/BG\.W-[A-Z0-9-]+/g)) ids.add(tok[0]);
    return ids;
}

// The build-map text whitespace-normalized — so a registry entry that the build-map
// LINE-WRAPS (e.g. `BG.W-DEMO-STYLE-\nREHOME`) is still found by a normalized substring.
function normalizeBuildMap(text) {
    return text.replace(/\s+/g, "");
}

// ── markdown-table parser (column-by-HEADER, escaped-pipe-safe) ─────────────────
// The BB.W-LEDGER-REPAIR discipline: locate columns by header NAME (the first pipe-row whose
// cells include 'tranche' + 'wave' + 'disposition'), so the column ORDER is free. Returns the
// disposition rows as objects keyed by the (normalized) header names.
function splitRow(line) {
    // strip the leading/trailing pipe, split on unescaped pipes.
    const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    return trimmed.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
}
function isSeparatorRow(cells) {
    return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c.replace(/\s/g, "")));
}
function parseLedgerTable(docText) {
    const lines = docText.split("\n");
    let headerCols = null;
    const rows = [];
    for (const line of lines) {
        if (!line.trim().startsWith("|")) {
            if (headerCols) break; // table ended
            continue;
        }
        const cells = splitRow(line);
        if (!headerCols) {
            const lower = cells.map((c) => c.toLowerCase());
            if (lower.includes("tranche") && lower.includes("wave") && lower.includes("disposition")) {
                headerCols = lower;
            }
            continue;
        }
        if (isSeparatorRow(cells)) continue;
        const row = {};
        for (let i = 0; i < headerCols.length; i++) row[headerCols[i]] = cells[i] ?? "";
        rows.push(row);
    }
    return { headerCols, rows };
}

// ── core check (operates on loaded objects so the self-test can feed fixtures) ───
function runChecks({ rows, corpus, registry, buildMapNorm }) {
    const failures = [];
    const fail = (clause, msg) => failures.push({ clause, msg });

    // L7 — registry well-formed + (conditional) build-map soundness.
    if (!registry || registry.size === 0) {
        fail("L7", "the embedded BG WAVE REGISTRY parsed to zero BG.W-* entries — the carry-dest authority is missing.");
    } else {
        for (const w of registry) {
            if (!BG_WAVE_RE.test(w)) {
                fail("L7", `BG WAVE REGISTRY entry "${w}" is not a well-formed BG.W-* id.`);
            }
        }
        if (buildMapNorm) {
            for (const w of registry) {
                if (!buildMapNorm.includes(w)) {
                    fail("L7", `BG WAVE REGISTRY entry "${w}" does not appear in docs/tranches/BG/execution/bg-build-map.md — the registry cannot carry a wave that is not in the locked BG plan.`);
                }
            }
        }
    }

    // L1/L6 — completeness + count against the DERIVED corpus.
    const seen = new Map(); // id → count
    for (const row of rows) {
        const id = String(row.wave ?? "").trim();
        seen.set(id, (seen.get(id) ?? 0) + 1);
    }
    for (const id of corpus) {
        if (!seen.has(id)) fail("L1", `wave-spec "${id}" exists on disk but has NO ledger row (a silent drop — the no-silent-drop floor).`);
    }
    for (const [id, n] of seen) {
        if (!corpus.has(id)) fail("L1", `ledger row "${id}" names no wave-spec on disk under docs/tranches/{BE,BF}/waves (an extra/unknown row).`);
        if (n > 1) fail("L1", `wave "${id}" appears in ${n} ledger rows (a duplicate row).`);
    }
    if (rows.length !== corpus.size) {
        fail("L6", `ledger carries ${rows.length} rows; the disk-derived corpus is ${corpus.size} (39 BE + 31 BF = 70) — a count drift REDs.`);
    }

    // per-row clauses.
    for (const row of rows) {
        const id = String(row.wave ?? "<no-id>").trim();
        const disp = String(row.disposition ?? "").trim();
        const evid = String(row["landed-evidence"] ?? "").trim();
        const dest = String(row["carry-dest"] ?? "").trim();
        const rat = String(row.rationale ?? "").trim();
        const tranche = String(row.tranche ?? "").trim();

        // shape sanity.
        if (!BE_BF_WAVE_RE.test(id)) {
            fail("L1", `ledger wave id "${id}" is malformed (expected /^(BE|BF)\\.W-[A-Z0-9-]+$/).`);
        }
        if (tranche !== "BE" && tranche !== "BF") {
            fail("L1", `row "${id}" tranche "${tranche}" is not BE or BF.`);
        }

        // L2 — disposition vocabulary.
        if (!DISPOSITIONS.has(disp)) {
            fail("L2", `row "${id}" disposition "${disp}" ∉ {LANDED-no-build, NEVER-BUILT-names-a-wave, RETIRE} — every BE/BF wave is DECIDED (a book/deferred/empty disposition is the silent-drop chronic).`);
            continue;
        }

        // L8 — every row carries a non-empty rationale/note.
        if (isEmpty(rat)) {
            fail("L8", `row "${id}" carries no rationale/note (every disposition owes a one-line human reason).`);
        }

        if (disp === "LANDED-no-build") {
            // L3 — the evidence path must resolve on disk; no forward dest.
            if (isEmpty(evid)) {
                fail("L3", `row "${id}" is LANDED-no-build but names no landed-evidence path — a LANDED claim MUST point at the on-disk mechanism.`);
            } else if (!existsSync(join(ROOT, evid))) {
                fail("L3", `row "${id}" is LANDED-no-build but its landed-evidence "${evid}" does not exist on disk — you cannot claim LANDED without the file (the anti-evasion floor).`);
            }
            if (!isEmpty(dest)) {
                fail("L3", `row "${id}" is LANDED-no-build but also names carry-dest "${dest}" — a landed wave owes no forward BG wave; clear the dest.`);
            }
        } else if (disp === "NEVER-BUILT-names-a-wave") {
            // L4 — the dest must be a real BG wave in the locked registry; no landed evidence.
            if (isEmpty(dest)) {
                fail("L4", `row "${id}" is NEVER-BUILT-names-a-wave but names no carry-dest — it MUST name the BG wave that carries the work.`);
            } else if (BAND_ONLY_RE.test(dest)) {
                fail("L4", `row "${id}" carry-dest "${dest}" is a bare band label — a band is a thematic grouping, never a destination; resolve it to a BG.W-* id.`);
            } else if (!BG_WAVE_RE.test(dest)) {
                fail("L4", `row "${id}" carry-dest "${dest}" is not a well-formed BG.W-* id.`);
            } else if (registry && registry.size > 0 && !registry.has(dest)) {
                fail("L4", `row "${id}" carry-dest "${dest}" is not in the BG WAVE REGISTRY (a phantom destination — the carried wave must exist in the locked BG plan).`);
            }
            if (!isEmpty(evid)) {
                fail("L4", `row "${id}" is NEVER-BUILT-names-a-wave but also names landed-evidence "${evid}" — a not-built wave has no on-disk mechanism; clear the evidence.`);
            }
        } else if (disp === "RETIRE") {
            // L5 — a real rationale; neither landed nor carried.
            if (rat.length < 20) {
                fail("L5", `row "${id}" is RETIRE but its rationale is empty/too short (≥20 chars) — a retirement must record WHY (no bare RETIRE).`);
            }
            if (!isEmpty(evid)) {
                fail("L5", `row "${id}" is RETIRE but names landed-evidence "${evid}" — a retired wave did not land; clear the evidence.`);
            }
            if (!isEmpty(dest)) {
                fail("L5", `row "${id}" is RETIRE but names carry-dest "${dest}" — a retired wave is not carried forward; clear the dest.`);
            }
        }
    }

    const counts = { LANDED: 0, NEVER: 0, RETIRE: 0, BE: 0, BF: 0 };
    for (const row of rows) {
        const d = String(row.disposition ?? "").trim();
        if (d === "LANDED-no-build") counts.LANDED++;
        else if (d === "NEVER-BUILT-names-a-wave") counts.NEVER++;
        else if (d === "RETIRE") counts.RETIRE++;
        const t = String(row.tranche ?? "").trim();
        if (t === "BE") counts.BE++;
        else if (t === "BF") counts.BF++;
    }

    return { failures, counts, rowCount: rows.length };
}

function loadReal() {
    if (!existsSync(LEDGER)) {
        console.error(`[proof:be-bf-ledger] missing input: docs/tranches/BG/BE-BF-LEDGER.md (${LEDGER})`);
        process.exit(1);
    }
    const docText = readFileSync(LEDGER, "utf8");
    const { rows } = parseLedgerTable(docText);
    return {
        rows,
        corpus: deriveCorpus(),
        registry: extractRegistry(docText),
        buildMapNorm: existsSync(BUILD_MAP)
            ? normalizeBuildMap(readFileSync(BUILD_MAP, "utf8"))
            : null,
    };
}

function clausesHit(failures) {
    return new Set(failures.map((f) => f.clause));
}

function selfTest() {
    const real = loadReal();
    // clone ONLY the rows (plain objects); corpus/registry are Sets + buildMapNorm a string —
    // JSON-cloning those would silently destroy them, so they pass through by reference.
    const cloneRows = () => real.rows.map((r) => ({ ...r }));
    const withRows = (rows) => ({ ...real, rows });
    const bites = [];

    const landedRow = real.rows.find((r) => r.disposition === "LANDED-no-build");
    const neverRow = real.rows.find((r) => r.disposition === "NEVER-BUILT-names-a-wave");
    const retireRow = real.rows.find((r) => r.disposition === "RETIRE");

    // bite 1 — dropped row → L1 RED.
    {
        const rows = cloneRows().slice(0, -1);
        bites.push(["dropped-row → L1", clausesHit(runChecks(withRows(rows)).failures).has("L1")]);
    }
    // bite 2 — bad disposition → L2 RED.
    {
        const rows = cloneRows();
        rows.find((r) => r.wave === landedRow.wave).disposition = "book";
        bites.push(["bad-disposition → L2", clausesHit(runChecks(withRows(rows)).failures).has("L2")]);
    }
    // bite 3 — LANDED with non-existent evidence path → L3 RED.
    {
        const rows = cloneRows();
        rows.find((r) => r.wave === landedRow.wave)["landed-evidence"] = "src/does/not/exist.ts";
        bites.push(["landed-phantom-path → L3", clausesHit(runChecks(withRows(rows)).failures).has("L3")]);
    }
    // bite 4 — NEVER-BUILT phantom dest → L4 RED.
    {
        const rows = cloneRows();
        rows.find((r) => r.wave === neverRow.wave)["carry-dest"] = "BG.W-DOES-NOT-EXIST";
        bites.push(["phantom-dest → L4", clausesHit(runChecks(withRows(rows)).failures).has("L4")]);
    }
    // bite 5 — bare RETIRE → L5 RED.
    {
        const rows = cloneRows();
        rows.find((r) => r.wave === retireRow.wave).rationale = "x";
        bites.push(["bare-RETIRE → L5", clausesHit(runChecks(withRows(rows)).failures).has("L5")]);
    }
    // bite 6 — extra unknown row → L1 RED.
    {
        const rows = [...cloneRows(), { tranche: "BE", wave: "BE.W-PHANTOM", disposition: "RETIRE", "landed-evidence": "—", "carry-dest": "—", rationale: "a synthetic unknown row not on disk" }];
        bites.push(["extra-unknown-row → L1", clausesHit(runChecks(withRows(rows)).failures).has("L1")]);
    }
    // bite 7 — band-only dest → L4 RED.
    {
        const rows = cloneRows();
        rows.find((r) => r.wave === neverRow.wave)["carry-dest"] = "Band 0";
        bites.push(["band-only-dest → L4", clausesHit(runChecks(withRows(rows)).failures).has("L4")]);
    }

    console.log("proof:be-bf-ledger — SELF-TEST (born-RED→GREEN, 7 bites)");
    let allFlag = true;
    for (const [name, flagged] of bites) {
        console.log(`  ${flagged ? "FLAGGED" : "MISSED "}  ${name}`);
        if (!flagged) allFlag = false;
    }
    const realRun = runChecks(real);
    console.log(`  real ledger failures   : ${realRun.failures.length}`);
    for (const f of realRun.failures.slice(0, 25)) console.log(`    [${f.clause}] ${f.msg}`);
    if (!allFlag) {
        console.error("\n[proof:be-bf-ledger] SELF-TEST FAILED — a synthetic-broken fixture did not flag its clause; the detector is not load-bearing.");
        process.exit(1);
    }
    if (realRun.failures.length > 0) {
        console.error("\n[proof:be-bf-ledger] SELF-TEST FAILED — the REAL ledger is not clean (the GREEN-after state must pass every clause).");
        process.exit(1);
    }
    console.log("\n[proof:be-bf-ledger] SELF-TEST GREEN — all 7 bites flag born-RED, the real ledger passes every clause.");
    process.exit(0);
}

if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    const real = loadReal();
    const { failures, counts, rowCount } = runChecks(real);
    console.log("proof:be-bf-ledger — the 70-wave BE+BF parity floor (BG.W-BE-BF-LEDGER)");
    console.log(`  ledger rows            : ${rowCount} (expected 70 — ${counts.BE} BE + ${counts.BF} BF)`);
    console.log(`  LANDED-no-build        : ${counts.LANDED}`);
    console.log(`  NEVER-BUILT-names-wave : ${counts.NEVER}`);
    console.log(`  RETIRE                 : ${counts.RETIRE}`);
    console.log(`  BG registry entries    : ${real.registry.size}`);
    console.log(`  failures               : ${failures.length}`);
    for (const f of failures) console.error(`  [${f.clause}] ${f.msg}`);
    if (failures.length > 0) {
        console.error(`\n[proof:be-bf-ledger] ${failures.length} parity violation(s) — a BE/BF wave was dropped, left undecided, or names a phantom/landed-but-absent destination. The close cannot proceed.`);
        process.exit(1);
    }
    console.log("\n[proof:be-bf-ledger] all 70 BE+BF waves are present + DECIDED + evidence-sound — the parity floor holds.");
    process.exit(0);
}
