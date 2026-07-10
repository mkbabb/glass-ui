// proof:bg-deferred-ledger — BG.W-DEFERRED-LEDGER: the no-silent-drop machine, BUILT this time.
//
// The BE.W-FOLD-LEDGER / BF.W-FOLD-LEDGER disposition machine was itself the deferred item (the
// D11 chronic — `proof:be-fold-ledger` ABSENT, the 32 BF census deferrals + the 70 BE/BF wave
// specs riding UN-DECIDED a third tranche). This gate is the literal cure: it DERIVES the 135-item
// deferred corpus from disk (AX DISPOSITION-REGISTER 31 + BF DEFERRED-CENSUS 32 + BE waves 39 +
// BF waves 31 + in-`src` CONSUME/BOOKED markers 2) and REDs the close on any dropped / undecided /
// blanket-routed / templated / over-concentrated row.
//
// (BH.B1-W3 reconcile: the in-`src` marker count fell 3->2 when the useDragMorph.ts
// `CONSUME(kf snap)` marker was consumed-and-deleted onto kf 5.1.0 native `DragOptions.snap`,
// so the corpus is 135, not 136 — EXPECTED_COUNT tracks the disk.)
//
// It COMPOSES `scripts/lib/fold-ledger-core.mjs` (the DRY leaf proof:bc-fold-ledger also imports —
// the no-clone contract) and adds the THREE BG teeth the §L.11 producer-evasion class demands:
//
//   F2 (a) charter-match           — a BUILD/MET/COORDINATED row's destination is NEVER a
//                                     RETIRE/SWEEP wave (the 23-rows→BG.W-DEAD-GATE-SWEEP evasion);
//                                     a RETIRE lands in a sweep/decide wave; the dest resolves in
//                                     the build-map roster.
//   F4 (b) templated-evidence      — N rows sharing an identical evidence SKELETON (id/wave/path/
//                                     digit-stripped) reds, AND the placeholder phrase is banned —
//                                     a structural skeleton-match, not an evadeable literal list.
//   F5 (c) concentration-ceiling   — ≥24 rows routed to ONE destination reds (no catch-all home).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-bg-deferred-ledger.mjs --self-test` runs 9
// synthetic-fixture bites — AX-31-vs-32, de-shadcn-not-a-false-orphan, no-clone, disjoint-namespace,
// F0-scoped no-orphan, charter-match, templated-evidence, concentration, the count assert.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { clausesHit } from "./lib/fold-ledger-core.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const LEDGER_JSON = join(ROOT, "docs/tranches/BG/FOLD-LEDGER.json");
const LEDGER_DOC = join(ROOT, "docs/tranches/BG/FOLD-LEDGER.md");
const AX_REGISTER = join(ROOT, "docs/tranches/AX/audit/DISPOSITION-REGISTER.json");
const BF_CENSUS = join(ROOT, "docs/tranches/BF/audit/DEFERRED-CENSUS.md");
const BE_WAVES_DIR = join(ROOT, "docs/tranches/BE/waves");
const BF_WAVES_DIR = join(ROOT, "docs/tranches/BF/waves");
const SRC_DIR = join(ROOT, "src");
const BUILD_MAP = join(ROOT, "docs/tranches/BG/execution/bg-build-map.md");
const BC_GATE = join(ROOT, "scripts/proof-bc-fold-ledger.mjs");
const BG_GATE = join(ROOT, "scripts/proof-bg-deferred-ledger.mjs");

const EXPECTED_COUNT = 135;
const AX_EXPECTED = 31; // the AX register is 31 rows, NOT 32 (the chronic mis-count) — bite #1.
const CONCENTRATION_CEILING = 24; // ≥24 rows → one home REDs (tooth c).
const SKELETON_SHARE_THRESHOLD = 4; // ≥4 rows sharing one evidence skeleton REDs (tooth b).
const PLACEHOLDER_PHRASE = "per-ws-coordinated destination is the band-0 build's refinement";

const DISPOSITIONS = new Set([
    "BUILD",
    "MET",
    "COORDINATED",
    "RETIRE",
    "SUPERSEDED",
    "DEFER-with-trigger",
]);
const BUILD_CLASS = new Set(["BUILD", "MET", "COORDINATED"]);

// The build-map charter classes (auditable named constants, like BC's OPEN_DESTS). A SWEEP wave is
// an unconditional dead-code cut (only RETIRE/SUPERSEDED route here — BG.W-DEAD-GATE-SWEEP's own
// build-map line: "a RETIRE/SWEEP charter (no BUILD row routes here)"). A DECIDE wave is a
// build-or-retire / coordinated-decision / ledger wave (accepts BUILD..RETIRE). Every other wave in
// the build-map roster is a BUILD/coordination charter.
const SWEEP_CHARTER = new Set([
    "BG.W-DEAD-GATE-SWEEP",
    "BG.W-DEAD-TOKEN-SWEEP",
    "BG.W-DEAD-COMPOSABLE-CUT",
    "BG.W-CHIP-ALIAS-KILL",
    "BG.W-VIZ-SUBSTRATE-DELETE",
    "BG.W-VIZ-SUBSTRATE-DELETE2",
    "BG.W-DOCK-CAST-RETIRE",
    "BG.W-DOCK-PERSISTENT-CUT",
    "BG.W-SPIKE-DELETE",
    "BG.W-CUT",
]);
const DECIDE_CHARTER = new Set([
    "BG.W-DOCK-CUT",
    "BG.W-JUBILANCE-DECIDE",
    "BG.W-DISPOSITION-RESTAMP",
    "BG.W-BE-BF-LEDGER",
    "BG.W-DEFERRED-LEDGER",
    "BG.W-DS-COMPLETE",
    // F8.7 — the GA-6 RETIRE-in-place charter: the 7 speculative registers flip
    // DEFER-with-trigger → RETIRE here (a ledger-flip DECIDE wave, zero pixels).
    "BG.W-DEFERRAL-DISPOSITIONS",
]);

// ── corpus derivation (the SAME derivation the producer ran) ─────────────────────
function deriveAxIds() {
    return JSON.parse(readFileSync(AX_REGISTER, "utf8")).items.map((r) => r.id);
}
function deriveCensusIds() {
    const ids = [];
    for (const line of readFileSync(BF_CENSUS, "utf8").split("\n")) {
        const m = line.match(/^\|\s*(D\d+)\s*\|/);
        if (m) ids.push(m[1]);
    }
    return ids;
}
function deriveWaveIds(dir) {
    return readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.slice(0, -3));
}
function slugify(s) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function walkSrc(dir, acc) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory()) walkSrc(p, acc);
        else if (/\.(ts|vue)$/.test(e.name)) acc.push(p);
    }
    return acc;
}
// in-`src` CONSUME(...)/BOOKED: markers — scoped to .ts/.vue (a README.md marker is EXCLUDED).
// id = `<relpath>#<KIND>#<slug>`; a 2nd marker that would collide in one file gets an index suffix.
function deriveInSrcMarkers() {
    const out = [];
    const seen = new Set();
    for (const file of walkSrc(SRC_DIR, []).sort()) {
        const rel = relative(ROOT, file).split("\\").join("/");
        for (const line of readFileSync(file, "utf8").split("\n")) {
            let kind = null;
            let slug = null;
            const c = line.match(/\bCONSUME\(([^)]+)\)/);
            if (c) {
                kind = "CONSUME";
                slug = slugify(c[1]).split("-").slice(0, 3).join("-");
            } else {
                const b = line.match(/\bBOOKED:\s*(\S+)/);
                if (b) {
                    kind = "BOOKED";
                    slug = slugify(b[1]);
                }
            }
            if (!kind) continue;
            let id = `${rel}#${kind}#${slug}`;
            let n = 2;
            while (seen.has(id)) id = `${rel}#${kind}#${slug}-${n++}`;
            seen.add(id);
            out.push(id);
        }
    }
    return out;
}

// the BG wave roster — every bold `**BG.W-*` introduced in the build map (the single authority).
function deriveBgWaves() {
    if (!existsSync(BUILD_MAP)) return null; // fail-LOUD (never vacuous-green) — see runReal.
    const text = readFileSync(BUILD_MAP, "utf8");
    const set = new Set();
    for (const m of text.matchAll(/\*\*(BG\.W-[A-Z0-9-]+)/g)) set.add(m[1]);
    return set;
}

function buildDerived() {
    const axIds = deriveAxIds();
    const dIds = deriveCensusIds();
    const beIds = deriveWaveIds(BE_WAVES_DIR);
    const bfIds = deriveWaveIds(BF_WAVES_DIR);
    const inSrcIds = deriveInSrcMarkers();
    return {
        sets: {
            "ax-register": new Set(axIds),
            "bf-census": new Set(dIds),
            "be-wave": new Set(beIds),
            "bf-wave": new Set(bfIds),
            "in-src": new Set(inSrcIds),
        },
        counts: {
            "ax-register": axIds.length,
            "bf-census": dIds.length,
            "be-wave": beIds.length,
            "bf-wave": bfIds.length,
            "in-src": inSrcIds.length,
        },
    };
}

// ── evidence skeleton (tooth b) ──────────────────────────────────────────────────
// Strip the row-specific tokens (own id, wave id, any wave/id token, file paths, digits, backticks,
// punctuation) to leave the STRUCTURAL skeleton. N rows sharing a skeleton are templated.
function evidenceSkeleton(evidence, row) {
    let s = ` ${(evidence || "").toLowerCase()} `;
    if (row?.id) s = s.split(row.id.toLowerCase()).join(" ");
    if (row?.wave) s = s.split(row.wave.toLowerCase()).join(" ");
    s = s
        .replace(/\b(bg|be|bf|ay|az|ba|bb|bc|bd)\.w-[a-z0-9-]+/g, " ") // wave ids
        .replace(/\bd\d+\b/g, " ") // census ids
        .replace(/[a-z0-9_./-]+\.(ts|vue|css|mjs|md|json|glsl|wgsl)\b/g, " ") // file paths
        .replace(/[`#]/g, " ")
        .replace(/\d+/g, " ")
        .replace(/[^a-z]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return s;
}

// ── md id extraction (doc⟷JSON parity) ───────────────────────────────────────────
// The generated `.md` wraps each id in backticks in the table first cell: `| \`<id>\` | … |`.
function extractMdIds(mdText) {
    const ids = new Set();
    for (const line of mdText.split("\n")) {
        const m = line.match(/^\|\s*`([^`]+)`\s*\|/);
        if (m) ids.add(m[1]);
    }
    return ids;
}

// ── core check (operates on already-loaded objects so the self-test can feed fixtures) ──
function runChecks({ ledger, mdIds, derived, bgWaves }) {
    const failures = [];
    const fail = (clause, msg) => failures.push({ clause, msg });

    const rows = Array.isArray(ledger?.items) ? ledger.items : [];
    const jsonIds = new Set(rows.map((r) => r.id));

    // F1.count — the DERIVED corpus is exactly EXPECTED_COUNT (135).
    const sumCounts = Object.values(derived.counts).reduce((a, b) => a + b, 0);
    if (sumCounts !== EXPECTED_COUNT) {
        fail("F1", `the DERIVED corpus is ${sumCounts} (AX ${derived.counts["ax-register"]} + BF-census ${derived.counts["bf-census"]} + BE ${derived.counts["be-wave"]} + BF ${derived.counts["bf-wave"]} + in-src ${derived.counts["in-src"]}), expected ${EXPECTED_COUNT} — a corpus drift REDs.`);
    }
    if (derived.counts["ax-register"] !== AX_EXPECTED) {
        fail("F1", `the AX DISPOSITION-REGISTER derived ${derived.counts["ax-register"]} rows, expected ${AX_EXPECTED} (NOT 32 — the chronic mis-count).`);
    }
    if (rows.length !== EXPECTED_COUNT) {
        fail("F1", `FOLD-LEDGER.json carries ${rows.length} rows, expected ${EXPECTED_COUNT}.`);
    }

    // F1.disjoint — the 5 namespaces are pairwise disjoint AND Σ === union.
    const union = new Set();
    let overlap = 0;
    for (const [src, set] of Object.entries(derived.sets)) {
        for (const id of set) {
            if (union.has(id)) {
                overlap++;
                fail("F1", `id "${id}" (source ${src}) collides across corpus namespaces — the disjoint-namespace assert requires AX/census/BE/BF/in-src id-sets to be pairwise disjoint.`);
            }
            union.add(id);
        }
    }
    if (overlap === 0 && union.size !== sumCounts) {
        fail("F1", `the derived union is ${union.size} but Σ counts is ${sumCounts} — a namespace overlap leaked.`);
    }

    // F1.completeness — every derived id has a JSON row (no silent drop).
    for (const id of union) {
        if (!jsonIds.has(id))
            fail("F1", `derived corpus id "${id}" has no FOLD-LEDGER.json row (a deferred item silently dropped from the machine source).`);
    }
    // F1.no-orphan (F0-scoped) — every JSON row id is a DERIVED corpus id (no phantom row). The
    // derivation reads ONLY the 4 corpus docs + the src markers, so an unrelated committed file
    // (e.g. scripts/proof-de-shadcn.mjs) never becomes a derived id — it cannot false-orphan.
    for (const id of jsonIds) {
        if (!union.has(id))
            fail("F1", `FOLD-LEDGER.json row "${id}" is not in the DERIVED corpus (a phantom/orphan row — every row must trace to AX/census/BE/BF/in-src).`);
    }

    // F1.parity — doc⟷JSON.
    if (mdIds) {
        for (const id of jsonIds)
            if (!mdIds.has(id)) fail("F1", `id "${id}" is in FOLD-LEDGER.json but absent from FOLD-LEDGER.md (the doc⟷JSON parity broke).`);
        for (const id of mdIds)
            if (!jsonIds.has(id)) fail("F1", `id "${id}" is in FOLD-LEDGER.md but absent from FOLD-LEDGER.json.`);
    }

    // per-row clauses.
    const concentration = {};
    const skeletonGroups = {};
    for (const row of rows) {
        const id = row.id ?? "<no-id>";
        const disp = row.disposition;
        const wave = row.wave ?? "";

        // F3 — every row DECIDED with a known disposition.
        if (!DISPOSITIONS.has(disp)) {
            fail("F3", `id "${id}" disposition "${disp}" ∉ {BUILD,MET,COORDINATED,RETIRE,SUPERSEDED,DEFER-with-trigger} — every item is DECIDED (no book/empty/re-stamped).`);
            continue;
        }

        if (disp === "DEFER-with-trigger") {
            // F3 — a DEFER carries a trigger; its dest is empty (foreign-tree/Baseline/republish)
            // or a DECIDE book-keeper wave; NEVER a build/sweep dest.
            if (!row.trigger || !String(row.trigger).trim())
                fail("F3", `id "${id}" is DEFER-with-trigger but names no trigger (the Baseline/republish/≥2-consumer condition that re-enters it).`);
            if (wave && !DECIDE_CHARTER.has(wave))
                fail("F2", `id "${id}" is DEFER-with-trigger but routes to "${wave}" — a deferred item carries NO build/sweep destination (empty, or a DECIDE book-keeper).`);
            // a DEFER with a (book-keeper) dest still counts toward concentration.
            if (wave) concentration[wave] = (concentration[wave] || 0) + 1;
            continue;
        }

        // F6 — non-DEFER rows carry real evidence + a destination.
        if (!row.evidence || !String(row.evidence).trim())
            fail("F6", `id "${id}" (${disp}) carries no evidence — every DECIDED row needs ROW-SPECIFIC evidence (a file/symbol/(-call-site), not a blank cell).`);
        if (!wave || !String(wave).trim()) {
            fail("F2", `id "${id}" is ${disp} but carries an EMPTY wave — a non-deferred disposition MUST resolve to a BG.W-* destination.`);
            continue;
        }

        // F2 — destination soundness + charter-match (tooth a).
        if (bgWaves && !bgWaves.has(wave)) {
            fail("F2", `id "${id}" is ${disp} but its wave "${wave}" is not in the BG build-map roster (a phantom destination).`);
        } else {
            if (BUILD_CLASS.has(disp) && SWEEP_CHARTER.has(wave)) {
                fail("F2", `id "${id}" is ${disp} but routes to "${wave}", a RETIRE/SWEEP-charter wave — a BUILD/MET/COORDINATED row NEVER routes to a sweep/cut wave (the blanket-route evasion §L.11).`);
            }
            if (disp === "RETIRE" && !(SWEEP_CHARTER.has(wave) || DECIDE_CHARTER.has(wave))) {
                fail("F2", `id "${id}" is RETIRE but routes to "${wave}", a BUILD-charter wave — a RETIRE lands in a sweep/cut or a decide wave, never a build wave.`);
            }
        }

        // F5 — destination-concentration (tooth c).
        concentration[wave] = (concentration[wave] || 0) + 1;

        // F4 — evidence skeleton (tooth b).
        const skel = evidenceSkeleton(row.evidence, row);
        if (skel.length >= 24) (skeletonGroups[skel] ||= []).push(id);
        if (String(row.evidence).toLowerCase().includes(PLACEHOLDER_PHRASE))
            fail("F4", `id "${id}" evidence carries the templated placeholder phrase — every row needs row-specific evidence, never the catch-all skeleton.`);
    }

    // F4 — N rows sharing an identical evidence skeleton are templated.
    for (const [skel, ids] of Object.entries(skeletonGroups)) {
        if (ids.length >= SKELETON_SHARE_THRESHOLD)
            fail("F4", `${ids.length} rows share one evidence skeleton ("${skel.slice(0, 60)}…": ${ids.slice(0, 5).join(", ")}…) — templated evidence; each row needs a row-specific shape.`);
    }

    // F5 — concentration ceiling.
    for (const [wave, n] of Object.entries(concentration)) {
        if (n >= CONCENTRATION_CEILING)
            fail("F5", `destination "${wave}" receives ${n} rows (ceiling ${CONCENTRATION_CEILING}) — a catch-all home is the blanket-route evasion; distribute to charter-matched destinations.`);
    }

    return { failures, count: rows.length, concentration, sumCounts };
}

// ── no-clone (G6): both fold-ledger gates IMPORT the core, never re-define its bodies ──
function checkNoClone(fail, { bcSrc, bgSrc } = {}) {
    const bc = bcSrc ?? (existsSync(BC_GATE) ? readFileSync(BC_GATE, "utf8") : "");
    const bg = bgSrc ?? readFileSync(BG_GATE, "utf8");
    const importRe = /from\s+["'][^"']*lib\/fold-ledger-core\.mjs["']/;
    if (!importRe.test(bc))
        fail("G6", `proof-bc-fold-ledger.mjs does not import scripts/lib/fold-ledger-core.mjs — the fold-ledger primitive must be the ONE shared leaf, never re-cloned.`);
    if (!importRe.test(bg))
        fail("G6", `proof-bg-deferred-ledger.mjs does not import scripts/lib/fold-ledger-core.mjs — the no-clone contract requires both gates compose the leaf.`);
}

// ── real load + entry ─────────────────────────────────────────────────────────────
function loadReal() {
    for (const [label, p] of [
        ["FOLD-LEDGER.json", LEDGER_JSON],
        ["FOLD-LEDGER.md", LEDGER_DOC],
        ["DISPOSITION-REGISTER.json", AX_REGISTER],
        ["DEFERRED-CENSUS.md", BF_CENSUS],
        ["BE/waves", BE_WAVES_DIR],
        ["BF/waves", BF_WAVES_DIR],
    ]) {
        if (!existsSync(p)) {
            console.error(`[proof:bg-deferred-ledger] missing input: ${label} (${p})`);
            process.exit(1);
        }
    }
    const bgWaves = deriveBgWaves();
    if (!bgWaves || bgWaves.size === 0) {
        console.error(`[proof:bg-deferred-ledger] the BG build-map roster (docs/tranches/BG/execution/bg-build-map.md) is absent or empty — the charter-match clause cannot run (fail-LOUD, never vacuous-green).`);
        process.exit(1);
    }
    return {
        ledger: JSON.parse(readFileSync(LEDGER_JSON, "utf8")),
        mdIds: extractMdIds(readFileSync(LEDGER_DOC, "utf8")),
        derived: buildDerived(),
        bgWaves,
    };
}

function runReal() {
    const real = loadReal();
    const { failures, count, concentration, sumCounts } = runChecks(real);
    const extra = [];
    checkNoClone((c, m) => extra.push({ clause: c, msg: m }));
    const all = [...failures, ...extra];
    const maxConc = Math.max(0, ...Object.values(concentration));
    console.log("proof:bg-deferred-ledger — the no-silent-drop machine (BG.W-DEFERRED-LEDGER)");
    console.log(`  DERIVED corpus         : ${sumCounts} (expected ${EXPECTED_COUNT})`);
    console.log(`  ledger rows            : ${count}`);
    console.log(`  max dest concentration : ${maxConc} (ceiling ${CONCENTRATION_CEILING})`);
    console.log(`  failures               : ${all.length}`);
    for (const f of all) console.error(`  [${f.clause}] ${f.msg}`);
    if (all.length > 0) {
        console.error(`\n[proof:bg-deferred-ledger] ${all.length} fold-ledger violation(s) — a deferred item was dropped, left undecided, blanket-routed, templated, or over-concentrated. The close cannot proceed.`);
        process.exit(1);
    }
    console.log(`\n[proof:bg-deferred-ledger] every one of the ${EXPECTED_COUNT} DERIVED deferred items is present + DECIDED + charter-matched — the no-silent-drop floor holds.`);
    process.exit(0);
}

// ── self-test ─────────────────────────────────────────────────────────────────────
function selfTest() {
    const real = loadReal();
    const bites = [];
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const run = (over) => {
        const r = runChecks({ ...real, ...over });
        return clausesHit(r.failures);
    };

    // bite 1 — AX-31-vs-32 (FIRST): a corpus that treats AX as 32 → F1 count REDs (Sets are not
    // JSON-cloneable, so override only the counts, keep the live Sets).
    {
        const derived = {
            sets: real.derived.sets,
            counts: { ...real.derived.counts, "ax-register": 32 },
        };
        bites.push(["ax-31-vs-32 → F1", run({ derived }).has("F1")]);
    }
    // bite 2 — de-shadcn-not-a-false-orphan: the REAL ledger is clean even though a committed
    // gate file (scripts/proof-de-shadcn.mjs) exists — the derivation never picks it up as an id.
    {
        const realRun = runChecks(real);
        const noScriptOrphan = !realRun.failures.some((f) => /proof-de-shadcn|\.mjs/.test(f.msg));
        const cleanReal = realRun.failures.length === 0;
        bites.push(["de-shadcn-not-a-false-orphan (real clean, no script id)", noScriptOrphan && cleanReal]);
    }
    // bite 3 — no-clone: a gate source lacking the core import REDs G6.
    {
        const extra = [];
        checkNoClone((c, m) => extra.push({ clause: c, msg: m }), {
            bcSrc: "// a clone that re-defines extractDocIds inline, no import",
            bgSrc: real ? "import { clausesHit } from './lib/fold-ledger-core.mjs'" : "",
        });
        bites.push(["no-clone-on-planted-clone → G6", new Set(extra.map((f) => f.clause)).has("G6")]);
    }
    // bite 4 — disjoint-namespace: a planted id-collision (D5 also in the AX set) → F1 REDs.
    {
        const d2 = {
            sets: {
                "ax-register": new Set([...real.derived.sets["ax-register"], "D5"]),
                "bf-census": real.derived.sets["bf-census"],
                "be-wave": real.derived.sets["be-wave"],
                "bf-wave": real.derived.sets["bf-wave"],
                "in-src": real.derived.sets["in-src"],
            },
            counts: { ...real.derived.counts, "ax-register": real.derived.counts["ax-register"] + 1 },
        };
        bites.push(["disjoint-namespace (planted D5 collision) → F1", run({ derived: d2 }).has("F1")]);
    }
    // bite 5 — F0-scoped no-orphan: a JSON row not in the derived set → F1 REDs.
    {
        const led = clone(real.ledger);
        led.items.push({ id: "phantom-orphan-row", source: "ax-register", disposition: "MET", wave: "BG.W-DISPOSITION-RESTAMP", evidence: "synthetic orphan", trigger: "" });
        bites.push(["F0-scoped no-orphan → F1", run({ ledger: led }).has("F1")]);
    }
    // bite 6 — charter-match (tooth a): a BUILD row routed to a SWEEP wave → F2 REDs.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => BUILD_CLASS.has(x.disposition) && x.wave && !SWEEP_CHARTER.has(x.wave));
        r.disposition = "BUILD";
        r.wave = "BG.W-DEAD-GATE-SWEEP";
        bites.push(["charter-match (BUILD→SWEEP) → F2", run({ ledger: led }).has("F2")]);
    }
    // bite 7 — templated-evidence (tooth b): N identical-skeleton rows + the placeholder → F4 REDs.
    {
        const led = clone(real.ledger);
        for (let i = 0; i < SKELETON_SHARE_THRESHOLD; i++) {
            const r = led.items.find((x) => x.id === led.items[i].id);
            r.evidence = "the per-WS-coordinated destination is the Band-0 build's refinement";
        }
        bites.push(["templated-evidence → F4", run({ ledger: led }).has("F4")]);
    }
    // bite 8 — concentration (tooth c): ≥24 rows → one home → F5 REDs.
    {
        const led = clone(real.ledger);
        let n = 0;
        for (const r of led.items) {
            if (n >= CONCENTRATION_CEILING) break;
            if (r.disposition !== "DEFER-with-trigger") {
                r.disposition = "COORDINATED";
                r.wave = "BG.W-12-LAWS-UNIVERSAL";
                n++;
            }
        }
        bites.push(["concentration (24→one home) → F5", run({ ledger: led }).has("F5")]);
    }
    // bite 9 — count assert: a corpus ≠ EXPECTED_COUNT → F1 REDs (drop one census id from the derived set).
    {
        const trimmed = new Set([...real.derived.sets["bf-census"]]);
        trimmed.delete("D32");
        const d2 = {
            sets: { ...real.derived.sets, "bf-census": trimmed },
            counts: { ...real.derived.counts, "bf-census": real.derived.counts["bf-census"] - 1 },
        };
        bites.push(["count-assert (≠EXPECTED) → F1", run({ derived: d2 }).has("F1")]);
    }

    console.log("proof:bg-deferred-ledger — SELF-TEST (born-RED→GREEN, 9 bites)");
    let allFlag = true;
    for (const [name, flagged] of bites) {
        console.log(`  ${flagged ? "FLAGGED" : "MISSED "}  ${name}`);
        if (!flagged) allFlag = false;
    }
    const realRun = runChecks(real);
    const cloneExtra = [];
    checkNoClone((c, m) => cloneExtra.push({ clause: c, msg: m }));
    const realFails = [...realRun.failures, ...cloneExtra];
    console.log(`  real ledger failures   : ${realFails.length}`);
    for (const f of realFails.slice(0, 20)) console.log(`    [${f.clause}] ${f.msg}`);
    if (!allFlag) {
        console.error("\n[proof:bg-deferred-ledger] SELF-TEST FAILED — a synthetic-broken fixture did not flag its clause; the detector is not load-bearing.");
        process.exit(1);
    }
    if (realFails.length > 0) {
        console.error("\n[proof:bg-deferred-ledger] SELF-TEST FAILED — the REAL ledger is not clean (the GREEN-after state must pass every clause).");
        process.exit(1);
    }
    console.log(`\n[proof:bg-deferred-ledger] SELF-TEST GREEN — all 9 bites flag born-RED, the real ${EXPECTED_COUNT}-item ledger passes every clause.`);
    process.exit(0);
}

if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    runReal();
}
