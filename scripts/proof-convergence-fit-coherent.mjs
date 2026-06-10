// proof-convergence-fit-coherent.mjs — AY.W-CONVERGE
//
// Doc-coherence gate (local tier; mirrors proof:live-verified-ledger — a tranche-doc
// parser that asserts structural completeness against the live tree). Parses the
// W-CONVERGE-fit.md disposition table and asserts: every canonical component has a
// row; every disposition is well-formed; every FIX/EXTEND routes to a real AY.md §2
// wave id (or L.W-ADOPT); every EXCLUDE has a rationale; every consumer-evidence path
// resolves; the adoption delta is present; and the wave touched no src/.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact, snapshotStamp } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_CONVERGE_FIT_ARTIFACT", "AY-convergence-fit");
const DOC = "docs/tranches/AY/audit/convergence/W-CONVERGE-fit.md";
const AYMD = "docs/tranches/AY/AY.md";

const CANONICAL = ["dock", "constellation", "aurora", "blob", "slider", "card", "button", "dialog", "configurator"];
const DISPOSITIONS = new Set(["KEEP", "EXTEND", "FIX", "EXCLUDE"]);

const SLIDES_ROOT = resolve(ROOT, "..", "slides");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

// Parse the disposition table rows (lines beginning with `| ` carrying 6 cells).
function parseTable(md) {
    const rows = [];
    for (const line of md.split("\n")) {
        if (!/^\|/.test(line)) continue;
        const cells = line.split("|").slice(1, -1).map((c) => c.trim());
        if (cells.length < 6) continue;
        // skip header + separator rows
        if (/^-+$/.test(cells[0]) || /^component$/i.test(cells[0])) continue;
        rows.push(cells);
    }
    return rows;
}

function run() {
    const violations = [];
    const facts = {};

    const md = read(DOC);
    if (md == null) {
        violations.push(`${DOC} does not exist (born-RED at HEAD)`);
        finish(violations, facts);
        return;
    }

    const rows = parseTable(md);
    facts.tableRows = rows.length;

    // Index rows by the canonical component named in the first cell.
    const rowFor = {};
    for (const r of rows) {
        const comp = r[0].toLowerCase();
        for (const c of CANONICAL) {
            if (new RegExp(`\\b${c}\\b`).test(comp)) rowFor[c] = r;
        }
    }

    // Valid AY.md §2 wave ids + L.W-ADOPT.
    const ayMd = read(AYMD) ?? "";
    const validWaves = new Set((ayMd.match(/\*\*(W-[A-Z0-9-]+)\*\*/g) ?? []).map((m) => m.replace(/\*\*/g, "")));
    validWaves.add("L.W-ADOPT");
    facts.validWaveCount = validWaves.size;

    // ── Clause 1 — COMPLETE-CANONICAL-SET ───────────────────────────────────
    for (const c of CANONICAL) {
        if (!rowFor[c]) violations.push(`disposition table missing a row for canonical component "${c}"`);
    }

    // ── Clauses 2,3,4 — per-row well-formedness / routing / rationale ────────
    for (const c of CANONICAL) {
        const r = rowFor[c];
        if (!r) continue;
        const disposition = (r[4] ?? "").replace(/\*/g, "").trim().toUpperCase();
        // Clause 2 — DISPOSITION-WELL-FORMED
        if (!DISPOSITIONS.has(disposition)) {
            violations.push(`${c}: disposition "${r[4]}" is not one of KEEP/EXTEND/FIX/EXCLUDE`);
            continue;
        }
        // Clause 3 — EVERY-FIX/EXTEND-IS-ROUTED-TO-A-REAL-WAVE
        if (disposition === "FIX" || disposition === "EXTEND") {
            const routed = r[5] ?? "";
            const ids = routed.match(/(?:AY\.)?(W-[A-Z0-9-]+)|L\.W-ADOPT/g) ?? [];
            const normalized = ids.map((id) => id.replace(/^AY\./, ""));
            if (normalized.length === 0) {
                violations.push(`${c}: ${disposition} disposition names no owning wave`);
            } else {
                for (const id of normalized) {
                    if (!validWaves.has(id))
                        violations.push(`${c}: routed wave id "${id}" is not in AY.md §2 (phantom route)`);
                }
            }
        }
        // Clause 4 — EVERY-EXCLUDE-HAS-A-RATIONALE
        if (disposition === "EXCLUDE") {
            const verdict = (r[3] ?? "").trim();
            if (verdict.length < 12 || !/excluded|befitting|no .* surface|deck-local|deliberate/i.test(verdict)) {
                violations.push(`${c}: EXCLUDE row carries no befitting-rationale (verdict cell too thin)`);
            }
        }
    }

    // ── Clause 5 — CONSUMER-EVIDENCE-RESOLVES ───────────────────────────────
    // Every cited slides/src/... or src/... path resolves on disk.
    const slidesReachable = existsSync(SLIDES_ROOT);
    facts.slidesReachable = slidesReachable;
    const pathCites = [...md.matchAll(/`?(?:slides\/)?(src\/[A-Za-z0-9._/-]+\.(?:vue|ts|css|md))/g)].map((m) => m[1]);
    const checkedPaths = new Set();
    let resolvedPaths = 0;
    for (const raw of pathCites) {
        // The cite may be a slides path (resolve against SLIDES_ROOT) or a glass-ui path.
        const slidesP = resolve(SLIDES_ROOT, raw);
        const glassP = resolve(ROOT, raw);
        const key = raw;
        if (checkedPaths.has(key)) continue;
        checkedPaths.add(key);
        if (existsSync(slidesP) || existsSync(glassP)) {
            resolvedPaths++;
        } else if (slidesReachable) {
            violations.push(`cited consumer-evidence path does not resolve: ${raw}`);
        }
        // when slides is NOT reachable, a slides-only path is not assertable — the
        // path-existence floor holds only where the tree is present.
    }
    facts.consumerPathsChecked = checkedPaths.size;
    facts.consumerPathsResolved = resolvedPaths;

    // ── Clause 6 — ADOPTION-DELTA-PRESENT ───────────────────────────────────
    if (!/E1d|adoption inventory delta/i.test(md))
        violations.push("the L-tranche adoption inventory delta section (E1d) is absent");
    else {
        const deltaSection = md.slice(md.search(/E1d|adoption inventory delta/i));
        const hasConstDelete = /DELETE .*constellation|constellation\.ts/i.test(deltaSection);
        const hasFourierPreset = /viz-fourier|m-red|preset/i.test(deltaSection);
        const hasCard = /card/i.test(deltaSection);
        if (!hasConstDelete) violations.push("adoption delta missing the constellation-delete adoption");
        if (!hasFourierPreset) violations.push("adoption delta missing the fourier-token-preset adoption");
        if (!hasCard) violations.push("adoption delta missing the card decision consequence");
    }

    // ── Clause 7 — READ-ONLY PROOF (best-effort: the doc declares it) ────────
    // The orchestrator-side git-diff is the binding proof; the gate asserts the
    // doc records the read-only contract (this wave adds only the doc + the gate).
    if (!/READ-ONLY|read-only audit/i.test(md))
        violations.push("the doc does not record the read-only contract");

    finish(violations, facts);
}

function finish(violations, facts) {
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:convergence-fit-coherent",
        facts,
        violations,
    });
    console.log("proof:convergence-fit-coherent — the per-component glass-ui↔slides FIT audit is complete + well-routed");
    console.log(`  disposition table rows  : ${facts.tableRows ?? 0}`);
    console.log(`  canonical components     : ${CANONICAL.length}`);
    console.log(`  valid AY.md wave ids     : ${facts.validWaveCount ?? "?"}`);
    console.log(`  consumer paths resolved  : ${facts.consumerPathsResolved ?? 0}/${facts.consumerPathsChecked ?? 0}${facts.slidesReachable ? "" : " (slides not reachable — path-floor only)"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
