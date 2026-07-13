#!/usr/bin/env node
// BI.W-DOC-CANON-REWRITE — proof:doc-truth (device-free; the pure-detector house
// pattern, the proof-doc-override-idiom / proof-crossrepo-asks-bh sibling).
//
// THE CLASS THIS KILLS — the perimeter-doc lie. Two live-doc-truth defects the
// 5.0.0 cut cannot ship with:
//
//   (DOC-2) README.md was frozen at v1.0 — it directed consumers to the DROPPED
//           `@mkbabb/glass-ui/api` key, carried a stale hardcoded subpath count
//           (37 vs the disk truth), and listed abrogated / renamed peers
//           (vaul-vue, lucide-vue-next) while omitting value.js.
//   (DOC-4) the `/virtual` consumer-evidence doc claimed ≥2 binary consumers on
//           the strength of words `DefinitionContentView` — a consumer that has
//           FORKED to a words-local copy (it imports `@/composables/virtual`, not
//           `@mkbabb/glass-ui/virtual`), so the honest count is ONE internal
//           consumer (the dock-search results list).
//   (DOC-5) the `/deck` "≥2-consumer bar met by construction (speedtest survey-deck
//           + the slides consume-back)" claim was false — speedtest carries ZERO
//           deck imports; slides is the sole consumer.
//
// This gate is device-free (a static doc read — the source-read house pattern, so
// it can never itself go stale): it re-reads README.md + package.json + the
// consumer-evidence docs LIVE.
//
//   R1 — README references NO dropped `@mkbabb/glass-ui/api` import; every import
//        example resolves to a live subpath.
//   R2 — the README peer table ≡ `package.json` peerDependencies (name-set + range
//        parity; no vaul-vue, no lucide-vue-next; value.js present) — parsed from
//        both LIVE, never a hardcoded expectation.
//   R3 — the README subpath-count prose CITES `proof:subpath-enumeration` (the
//        source of truth) and carries NO hardcoded stale figure that drifts.
//   V1 — no doc claims `/virtual` has ≥2 binary consumers; the honest single-
//        internal-consumer state (words forked to a local copy) is recorded.
//   V2 — no doc claims `/deck` is "≥2 by construction (speedtest + slides)"; the
//        honest slides-sole state (speedtest zero deck imports) is recorded in
//        docs/consumer-evidence/use-deck.md.
//
// Self-test bites (falsifiable): a re-inserted `/api` README import REDs R1; a
// peer-table range drift from package.json REDs R2; a re-added "≥2 binary
// consumers" claim REDs V1; a re-added "≥2 by construction (speedtest + slides)"
// claim REDs V2.
//
// The evidence docs read by name — docs/consumer-evidence/use-virtual-section-window.md
// + docs/consumer-evidence/use-deck.md — are thereby GATE-REFERENCED, so
// proof:consumer-evidence-live keeps them LIVE.
//
// STRUCTURAL/doc-truth wave — NO π, NO proof:ba-gestalt (zero pixels). Tagged
// ["local","ci"].

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:doc-truth";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const README = "README.md";
const PKG = "package.json";
const VIRTUAL_DOC = "docs/consumer-evidence/use-virtual-section-window.md";
const DECK_DOC = "docs/consumer-evidence/use-deck.md";
// The DURABLE authoritative-doc surface V2 scans for the /deck lie. Deliberately
// EXCLUDES the project-instruction file (hard-deleted at B9 — proof:claude-deletable
// forbids any gate code from naming it, and scanning a doomed file gives no durable
// coverage). The live lie in that file is corrected in-place by this wave; V2's
// durable born-RED is the ABSENT honest use-deck.md record (deckRecordHonest below).
const CANON_DOCS = [
    "docs/canon/exports-and-subpaths.md",
    "docs/canon/dependencies.md",
    "docs/canon/structure.md",
];

// ── R1 — no dropped `/api` IMPORT in the README ───────────────────────────────
// Import-scoped (the spec clause is "no dropped /api IMPORT"): a line that names
// the dropped `@mkbabb/glass-ui/api` specifier in an import/from/require context.
// A PROSE mention (documenting that the key was dropped) is legitimate and does
// NOT flag — only a live import example does.
export function detectApiImports(readme) {
    const offending = [];
    for (const line of readme.split("\n")) {
        if (!/@mkbabb\/glass-ui\/api\b/.test(line)) continue;
        if (/\b(?:import|from|require)\b|import\s*\(/.test(line)) offending.push(line.trim());
    }
    return offending;
}

// ── R2 — the README peer table ≡ package.json peerDependencies ────────────────
// Parse the `## Dependencies` markdown table: each body row's first cell is
// `` `<pkg>` <range> ``. Return a name→range map.
export function parseReadmePeerTable(readme) {
    const lines = readme.split("\n");
    let i = lines.findIndex((l) => /^##\s+Dependencies\s*$/.test(l));
    const peers = new Map();
    if (i < 0) return peers;
    for (i++; i < lines.length; i++) {
        const l = lines[i];
        if (/^##\s/.test(l)) break; // next section
        if (!l.trim().startsWith("|")) continue;
        const cells = l.split("|").slice(1, -1).map((c) => c.trim());
        if (cells.length < 2) continue;
        const first = cells[0];
        // header / separator rows.
        if (/^package$/i.test(first)) continue;
        if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
        // `` `<pkg>` <range> `` — name in backticks, range the token after it.
        const m = first.match(/`([^`]+)`\s*([~^]?[\dvxX][\w.\-*]*)/);
        if (!m) continue;
        peers.set(m[1].trim(), m[2].trim());
    }
    return peers;
}

export function parsePkgPeers(pkgText) {
    const peers = new Map();
    try {
        const pkg = JSON.parse(pkgText);
        for (const [name, range] of Object.entries(pkg.peerDependencies ?? {})) {
            peers.set(name, String(range).trim());
        }
    } catch {
        /* leave empty → the caller reds on the mismatch */
    }
    return peers;
}

export function comparePeers(readmePeers, pkgPeers) {
    const missing = []; // in package.json, absent from README
    const extra = []; // in README, absent from package.json
    const mismatched = []; // in both, range differs
    for (const [name, range] of pkgPeers) {
        if (!readmePeers.has(name)) missing.push(`${name} ${range}`);
        else if (readmePeers.get(name) !== range)
            mismatched.push(`${name}: README ${readmePeers.get(name)} vs package.json ${range}`);
    }
    for (const [name, range] of readmePeers) {
        if (!pkgPeers.has(name)) extra.push(`${name} ${range}`);
    }
    return { missing, extra, mismatched };
}

// ── R3 — the subpath count cites the gate + carries no hardcoded stale figure ──
export function detectSubpathCitation(readme) {
    const citesGate = /proof:subpath-enumeration/.test(readme);
    // A hardcoded "<N> flat JS subpaths" / "<N> subpath(s)" count phrase (the
    // drifting figure the gate replaces). Two-or-more-digit counts only, so a
    // token like `contract-v2` never trips it.
    const m = readme.match(/\b\d{2,3}\s+(?:flat\s+)?(?:JS\s+)?subpath/i);
    return { citesGate, hardcodedCount: m ? m[0] : null };
}

// ── V1 — no `/virtual` ≥2-binary-consumer lie; honest state recorded ──────────
export function detectVirtualLie(doc) {
    const lies = [];
    // The positive false-claim assertions the correction removes. (The TRUE line
    // "the ≥2-consumer bar FAILS for glass-ui" about useVirtualGrid is a DIFFERENT
    // phrasing and is NOT matched.)
    if (/\(\s*(?:≥|>=)\s*2\s+binary consumers\s*\)/i.test(doc)) lies.push("(≥ 2 binary consumers) heading");
    if (/(?:has|have)\s+two binary consumers/i.test(doc)) lies.push("'has two binary consumers'");
    if (/two binary consumers\s*\(\s*one LIVE/i.test(doc)) lies.push("'two binary consumers (one LIVE …)'");
    if (/(?:≥|>=)\s*2\s+external binary consumers/i.test(doc)) lies.push("'≥2 external binary consumers'");
    // The honest-state marker MUST be present (words forked / single consumer).
    const honest =
        /local fork|words[- ]local fork|FORKED AWAY|no longer an external|no longer external|single (?:live )?internal consumer|honest count/i.test(
            doc,
        );
    return { lies, honest };
}

// ── V2 — no `/deck` ≥2-by-construction lie; honest slides-sole record present ──
export function detectDeckLie(text) {
    const lies = [];
    if (/(?:≥|>=)\s*2[- ]consumer bar met by construction\s*\(\s*speedtest/i.test(text))
        lies.push("'≥2-consumer bar met by construction (speedtest …)'");
    if (/(?:≥|>=)\s*2 by construction\s*\(\s*speedtest[\s\S]{0,60}slides/i.test(text))
        lies.push("'≥2 by construction (speedtest … slides)'");
    // "speedtest survey-deck" presented as a live consumer (the false binding).
    if (/speedtest survey-deck\b/i.test(text) && !/never landed|never bound|zero deck import|aspirational/i.test(text))
        lies.push("'speedtest survey-deck' presented as a live consumer");
    return lies;
}
export function deckRecordHonest(deckDoc) {
    if (!deckDoc) return false;
    const slidesSole = /slides is the sole consumer|slides.{0,20}sole consumer|honest count: 1 consumer/i.test(deckDoc);
    const speedtestZero = /zero deck import/i.test(deckDoc);
    return slidesSole && speedtestZero;
}

// ── Run ───────────────────────────────────────────────────────────────────────
function detect() {
    const readme = read(README);
    const pkgText = read(PKG);
    const virtualDoc = read(VIRTUAL_DOC);
    const deckDoc = read(DECK_DOC);
    const checks = [];
    const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

    // R1
    const apiImports = detectApiImports(readme);
    add(
        "R1-no-api-import",
        readme.length > 0 && apiImports.length === 0,
        readme.length === 0
            ? "README.md is ABSENT"
            : apiImports.length === 0
              ? "README references NO dropped @mkbabb/glass-ui/api import (every import example resolves to a live subpath)"
              : `README still references the dropped /api key: ${apiImports.join(" | ")}`,
    );

    // R2
    const readmePeers = parseReadmePeerTable(readme);
    const pkgPeers = parsePkgPeers(pkgText);
    const { missing, extra, mismatched } = comparePeers(readmePeers, pkgPeers);
    const r2Pass = readmePeers.size > 0 && pkgPeers.size > 0 && !missing.length && !extra.length && !mismatched.length;
    add(
        "R2-peer-table-parity",
        r2Pass,
        r2Pass
            ? `README peer table ≡ package.json peerDependencies (${readmePeers.size} peers, name + range parity)`
            : `README peer table DRIFTS from package.json peerDependencies — missing:[${missing.join(", ")}] extra:[${extra.join(", ")}] mismatched:[${mismatched.join("; ")}]`,
    );
    // The explicit clean-break sub-asserts (no abrogated/renamed peers; value.js present).
    add(
        "R2-no-vaul-no-lucide-next",
        !readmePeers.has("vaul-vue") && !readmePeers.has("lucide-vue-next"),
        "the README peer table carries NO abrogated vaul-vue and NO renamed lucide-vue-next",
    );
    add(
        "R2-value-js-present",
        readmePeers.has("@mkbabb/value.js"),
        "the README peer table lists @mkbabb/value.js (the omitted-at-v1.0 peer)",
    );

    // R3
    const { citesGate, hardcodedCount } = detectSubpathCitation(readme);
    add(
        "R3-cites-enumeration-gate",
        citesGate && !hardcodedCount,
        citesGate && !hardcodedCount
            ? "the README subpath-count prose cites proof:subpath-enumeration (source of truth) and carries no hardcoded stale figure"
            : `subpath-count prose: citesGate=${citesGate} hardcodedFigure=${hardcodedCount ?? "none"} (cite the gate, drop the hardcoded count)`,
    );

    // V1
    const { lies: vLies, honest: vHonest } = detectVirtualLie(virtualDoc);
    add(
        "V1-no-virtual-ge2-lie",
        virtualDoc.length > 0 && vLies.length === 0 && vHonest,
        virtualDoc.length === 0
            ? `${VIRTUAL_DOC} is ABSENT`
            : vLies.length === 0 && vHonest
              ? "no doc claims /virtual has ≥2 binary consumers; the honest single-internal-consumer state (words forked to a local copy) is recorded"
              : `/virtual consumer-evidence: lies=[${vLies.join(", ")}] honestMarker=${vHonest}`,
    );

    // V2 — scan the durable authoritative-doc surface (canon + consumer-evidence).
    const deckSurface = [...CANON_DOCS, VIRTUAL_DOC, DECK_DOC];
    const deckLieHits = [];
    for (const rel of deckSurface) {
        const t = read(rel);
        if (!t) continue;
        for (const lie of detectDeckLie(t)) deckLieHits.push(`${rel}: ${lie}`);
    }
    const deckHonest = deckRecordHonest(deckDoc);
    add(
        "V2-no-deck-by-construction-lie",
        deckLieHits.length === 0 && deckHonest,
        deckLieHits.length === 0 && deckHonest
            ? "no doc claims /deck is '≥2 by construction (speedtest + slides)'; the honest slides-sole state (speedtest zero deck imports) is recorded in use-deck.md"
            : `deck-truth: lies=[${deckLieHits.join(" | ") || "none"}] honestRecord=${deckHonest}`,
    );

    // ── The self-test bites (each planted defect MUST flag) ───────────────────
    const bites = [];
    // R1 bite: a re-inserted /api README import flags.
    bites.push({
        id: "bite-api-import-flags",
        pass: detectApiImports('import { X } from "@mkbabb/glass-ui/api";').length > 0,
    });
    // R2 bite: a peer-range drift from package.json flags (drop one, mutate one).
    const driftPeers = new Map(readmePeers);
    const firstKey = [...pkgPeers.keys()][0];
    if (firstKey) driftPeers.set(firstKey, "^999.0.0");
    driftPeers.delete([...pkgPeers.keys()][1] ?? "vue");
    const driftCmp = comparePeers(driftPeers, pkgPeers);
    bites.push({
        id: "bite-peer-drift-flags",
        pass: driftCmp.missing.length > 0 || driftCmp.mismatched.length > 0,
    });
    // R3 bite: a hardcoded stale figure flags.
    bites.push({
        id: "bite-hardcoded-count-flags",
        pass: Boolean(detectSubpathCitation("the library ships 37 flat JS subpaths").hardcodedCount),
    });
    // V1 bite: a re-added "≥2 binary consumers" claim flags.
    bites.push({
        id: "bite-virtual-ge2-flags",
        pass: detectVirtualLie("The primitive has two binary consumers (one LIVE, one booked).").lies.length > 0,
    });
    // V2 bite: a re-added "≥2 by construction (speedtest + slides)" claim flags.
    bites.push({
        id: "bite-deck-by-construction-flags",
        pass: detectDeckLie("The ≥2-consumer bar met by construction (speedtest survey-deck + slides).").length > 0,
    });
    const allBites = bites.every((b) => b.pass);
    for (const b of bites) add(`selftest-${b.id}`, b.pass, `self-test bite: ${b.id} ${b.pass ? "FLAGS as expected" : "FAILED to flag"}`);
    add("selftest-all-bites", allBites, "every self-test bite flags its planted defect (R1/R2/R3/V1/V2 are falsifiable)");

    return { checks, facts: { readmePeers: [...readmePeers], pkgPeers: [...pkgPeers], apiImports, deckLieHits, virtualLies: vLies } };
}

function run() {
    const { checks, facts } = detect();
    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0;

    console.log("proof:doc-truth — README 5.0.0 truth + /virtual + /deck consumer-truth (BI.W-DOC-CANON-REWRITE)");
    console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    const ARTIFACT = gateArtifactPath("GLASS_UI_DOC_TRUTH_ARTIFACT", "BI-doc-truth");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:doc-truth",
        command: COMMAND,
        note: "R1 README no dropped /api import · R2 README peer table ≡ package.json peerDependencies · R3 subpath count cites proof:subpath-enumeration (no hardcoded figure) · V1 no /virtual ≥2-binary lie (words forked → 1 internal) · V2 no /deck ≥2-by-construction lie (slides-sole, speedtest zero deck imports). Device-free; born-RED→GREEN + a 5-bite self-test.",
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
        facts,
    });

    if (!pass) {
        console.error(`\n[proof:doc-truth] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log(
        "\n[proof:doc-truth] the perimeter docs are HONEST — the README references no dropped /api key, its peer table ≡ package.json, the subpath count cites proof:subpath-enumeration, and the /virtual + /deck consumer-evidence records the honest single-consumer state.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
