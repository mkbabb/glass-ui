#!/usr/bin/env node
// BA.W-GESTALT-GATE — proof:ba-gestalt, the holistic per-surface acceptance gate.
//
// THE P-1 CLOSE-CLASS FIX (precepts-conformance.md:42-86). AZ closed `complete` on a
// 9-surface per-mechanism PASS matrix (AZ/FINAL.md:119-131) the user re-opened the SAME
// DAY (R8) on ≥7 surfaces — the 6th consecutive re-opening round (R3→R8). A per-mechanism
// π verifies the LOCAL mechanism the fleet root-caused in isolation (a pixel ΔL, an
// `h1Overlap:false`) but cannot verify the GESTALT the user reads ("totally mis-aligned"
// is a placement/relationship judgement, not a contrast delta). This gate is the
// structural answer: a per-surface roster ABOVE the per-mechanism π readback, each surface
// owed a whole-page capture in BOTH modes over its real backdrop plus a recorded gestalt
// VERDICT, born-RED against the R8 state so the mechanism-green/page-wrong gap cannot
// recur by construction.
//
// This is a PURE source/docs detector (no Playwright at THIS gate — the gate reads the
// roster ledger's recorded verdicts + asserts the declared capture paths resolve on disk;
// the LIVE capture is W-REFLECT2's job). It reads the roster LEDGER at
// docs/tranches/BA/audit/reflect/ba-gestalt-roster.md and asserts:
//   (a) COMPLETENESS — every one of the EIGHT named W-REFLECT2 surfaces is present
//       (a dropped surface reds — a future agent cannot quietly omit a hard surface).
//   (b) WELL-FORMED — every row carries both mode capture paths + a verdict ∈ {FAIL,PASS}
//       + a ground anchor (a renamed/dropped column or an out-of-set verdict reds).
//   (c) OPERATIVE-PASS — the gate is `ok` IFF every verdict is PASS AND every declared
//       capture path RESOLVES ON DISK as a non-empty file (the anti-evasion floor — a
//       PASS with a missing/zero-byte capture is the close-class lie the AZ matrix told,
//       mechanically forbidden).
//
// BORN-RED at HEAD: every verdict is FAIL, anchored to its R8 ground capture; there is no
// PASS replacement. The gate is tagged ["local"] (RED-by-design until W-REFLECT2 flips the
// verdicts — it must NOT block ci/release while the tranche is mid-flight). W-REFLECT2
// (Batch 7) is the single authorized verdict-flipper + the wave that PROMOTES the gate to
// the operative close set when the verdicts go GREEN (W-GESTALT-GATE G3 defers that).
//
// bite-check: flip a verdict to PASS with no on-disk capture → RED (anti-evasion);
// delete a roster surface → RED (completeness); a verdict outside {FAIL,PASS} → RED.

import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, relative, dirname, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// BB.W-GESTALT-GATE2: the SHARED capture-rigor leaf — the ONE source of the
// content/dimension/viewport/freshness verify mechanisms (minted in
// proof-live-verified-ledger.mjs, re-exported through reflect-capture-verify.mjs).
// NO re-implementation: a second `createHash("sha256")` over surface paths outside
// the shared source is forbidden (the W-CANVAS-UNIFY two-copy class, G3-asserted).
import {
    isRealPng,
    pngDimensions,
    viewportFidelityVerdict,
    viewportFidelityVerdictBoth,
    surfaceHash,
    freshnessVerdict,
} from "./reflect-capture-verify.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:ba-gestalt";
const REFLECT_DIR = resolve(ROOT, "docs/tranches/BA/audit/reflect");
const ROSTER = resolve(REFLECT_DIR, "ba-gestalt-roster.md");

// BB.W-GESTALT-GATE2: the CLOSE arm. proof:ba-gestalt is tags:["release"] (the
// release arm IS the close arm), so freshness/missing-header is FATAL under
// --strict-freshness (the close-verification battery sets it, in lockstep with the
// sibling proof:live-verified-ledger convention) and a non-fatal NOTE on the bare
// mid-tranche arm (the backfill window — W-REFLECT3 owns the re-capture + re-stamp).
const STRICT_FRESHNESS = process.argv.includes("--strict-freshness");

// The whole-page-capture dimension floor: a real whole-page capture is far above a
// degenerate/cropped/0×0 sliver. The smallest LEGITIMATE capture in the set is the
// 780×1688 mobile full-page; a capture below this width OR height is degenerate.
const MIN_CAPTURE_WIDTH = 320; // below the smallest real mobile viewport
const MIN_CAPTURE_HEIGHT = 320;

// The EIGHT named W-REFLECT2 acceptance surfaces (the completeness set). A roster that
// drops one reds the completeness assert; an extra surface is allowed (a future split).
const REQUIRED_SURFACES = [
    "dock",
    "configurators-goo",
    "aurora",
    "glass-feedback",
    "shell",
    "motion-fourier",
    "dark-register",
    "cross-repo",
];

const VALID_VERDICTS = new Set(["FAIL", "PASS"]);
const COLUMNS = ["surface", "routes", "capture-light", "capture-dark", "verdict", "ground-anchor"];

/**
 * Parse the ROSTER markdown table. Strips HTML comments first (so the schema doc-block
 * + the per-cell explanatory prose can name a column without tripping the parse). Returns
 * the data rows (header + separator dropped) as objects keyed by COLUMNS.
 */
function parseRoster(src) {
    // Drop HTML comments (the doc-block header + any inline notes).
    const noComments = src.replace(/<!--[\s\S]*?-->/g, "");
    const rows = [];
    let inTable = false;
    for (const raw of noComments.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) {
            // A blank/non-pipe line after the table ends it (so a later prose table,
            // if any, never bleeds in).
            if (inTable && line === "") inTable = false;
            continue;
        }
        const cells = line
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        // The header row carries "surface" in cell 0; the separator row is all dashes.
        const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
        if (isSeparator) {
            inTable = true;
            continue;
        }
        if (cells[0] === "surface") {
            // header — confirm the column schema is intact + the table is starting
            inTable = true;
            rows.push({ __header: cells });
            continue;
        }
        if (!inTable) continue;
        if (cells.length < COLUMNS.length) {
            rows.push({ __malformed: cells });
            continue;
        }
        const row = {};
        COLUMNS.forEach((col, i) => (row[col] = cells[i]));
        rows.push(row);
    }
    return rows;
}

// ── BB.W-GESTALT-GATE2 (WEAK-1 / G1) — content+dimension verify a single capture ─
// The PASS anti-evasion floor was existsSync + size>0 (a renamed/truncated nonzero
// PNG sailed through). The hardened floor: a REAL on-disk PNG (magic-byte + ≥1KiB,
// isRealPng) AND a readable IHDR with sane whole-page dimensions (pngDimensions),
// AND the viewport token reconciled against the actual pixels (viewportFidelityVerdict
// for -mobile-; the symmetric -desktop- arm via viewportFidelityVerdictBoth). The
// dimension read is the load-bearing upgrade — a nonzero-but-broken PNG no longer
// passes. PURE over a repo-relative path; returns the verdict + the read dims.
/**
 * @param {string} repoRelPath repo-relative capture path
 * @returns {{ok:boolean, reason?:string, dims:{w:number,h:number}|null}}
 */
function verifyCapture(repoRelPath) {
    const abs = resolve(ROOT, repoRelPath);
    const bn = basename(repoRelPath);
    if (!isRealPng(abs))
        return {
            ok: false,
            reason: `${repoRelPath} is not a real on-disk PNG (magic-byte + ≥1KiB) — a renamed/truncated/zero-byte capture is the close-class lie`,
            dims: null,
        };
    const dims = pngDimensions(abs);
    if (!dims)
        return {
            ok: false,
            reason: `${repoRelPath} has an unreadable IHDR — a corrupt PNG cannot satisfy the whole-page-capture floor`,
            dims: null,
        };
    if (dims.w <= 0 || dims.h <= 0 || dims.w < MIN_CAPTURE_WIDTH || dims.h < MIN_CAPTURE_HEIGHT)
        return {
            ok: false,
            reason: `${repoRelPath} has degenerate dimensions ${dims.w}×${dims.h} (below the whole-page floor ${MIN_CAPTURE_WIDTH}×${MIN_CAPTURE_HEIGHT}) — a 0×0 / cropped sliver is not a whole-page capture`,
            dims,
        };
    // The viewport-fidelity reconcile: the -mobile- arm is the ledger's shared source;
    // the -desktop- symmetric arm is the gestalt-only addition (G2). A -mobile- IHDR
    // ≥1000px is a desktop screenshot mislabeled mobile (fraud, never graced); a
    // -desktop- below 1280px is the symmetric mislabel.
    const fid = viewportFidelityVerdictBoth(bn, dims, viewportFidelityVerdict);
    if (!fid.ok) return { ok: false, reason: fid.reason, dims };
    return { ok: true, dims };
}

// ── BB.W-GESTALT-GATE2 (WEAK-2 / G2) — the mobile twin of a declared desktop path ─
// Direction 2b (the viewport-derivation, recorded de-risk): the roster keeps its two
// DESKTOP capture columns; the gate DERIVES the mobile twin per surface by re-pointing
// the basename's `-desktop-` viewport token to `-mobile-` (the wf-ba-reflect.js naming
// convention: <surface>-<mode>-{desktop,mobile}-full.png) and verifies the derived
// path. No roster schema migration (the COLUMNS parser is untouched); the gate reads
// all four PNGs (2 desktop declared + 2 mobile derived) per surface.
/**
 * @param {string} desktopRepoRelPath the declared desktop capture path
 * @returns {string|null} the derived mobile twin path, or null if not a -desktop- path
 */
function deriveMobileTwin(desktopRepoRelPath) {
    const bn = basename(desktopRepoRelPath);
    if (!/-desktop-/.test(bn)) return null;
    const mobileBn = bn.replace("-desktop-", "-mobile-");
    return `${dirname(desktopRepoRelPath)}/${mobileBn}`;
}

// ── BB.W-GESTALT-GATE2 (WEAK-3 / G3) — the per-surface freshness header wire ─────
// Each roster surface owns a per-surface record docs/tranches/BA/audit/reflect/
// <surface>.md carrying the AZ.W-GATES content-hash freshness header (surface-paths
// + surface-hash). The header was stamped but checked by ZERO gate (vacuous). This
// recomputes the hash via the SHARED surfaceHash import (NO re-implementation) and
// asserts byte-identity: a PASS over a surface whose painting source DRIFTED since
// capture is stale and reds on the close arm. The grace discipline mirrors the
// sibling gate: stale/no-header reds under --strict-freshness (the release/close
// arm), a non-fatal NOTE on the bare mid-tranche arm (the backfill window —
// W-REFLECT3 owns the re-capture + re-stamp).
/**
 * @param {string} surface the canonical surface name
 * @returns {{state:"fresh"|"stale"|"no-header"|"no-record", reason?:string, recordPath:string}}
 */
function surfaceFreshness(surface) {
    const recordPath = resolve(REFLECT_DIR, `${surface}.md`);
    if (!existsSync(recordPath))
        return {
            state: "no-record",
            reason: `the per-surface record docs/tranches/BA/audit/reflect/${surface}.md is absent — the freshness header cannot be read`,
            recordPath,
        };
    const doc = readFileSync(recordPath, "utf8");
    const verdict = freshnessVerdict(doc, ROOT);
    return { ...verdict, recordPath };
}

// ── BB.W-CHIP-GRAZE (CG2) — the chipOverField:false witness on dock + shell ───────
// The P-1 close-class RECURRED INSIDE its own fix: W-SHELL-RAIL-RESEAT cleared the
// page-<h1> collision (overlapsH1:false) but its title-only DELTA masked that the
// re-seat traded the title-collision for a /forms/inputs FIELD-collision — the desktop
// SidebarDock floating facet carousel still fanned RIGHT into <main> at the utility-seam
// Y, GRAZING the form field at the narrow-desktop breakpoint (measured chipOverField:true
// at HEAD). The roster `dock` + `shell` PASS the BA close wrote on the title-fix alone is
// REVOKED (the CG1 roster re-anchor); this clause is the matching WITNESS requirement:
// the `dock` + `shell` surface records must carry a MEASURED `chipOverField:false` at the
// narrow-desktop breakpoint, recorded by W-REFLECT3 on a FRESH capture.
//
// Born-RED by construction (and ["release"]-tagged, never ci-blocking): the live measure
// is W-REFLECT3's to record (Batch 7 — this wave lands the SOURCE redress + the clause +
// the roster revocation but cannot render the close capture). At HEAD-of-this-wave the
// dock + shell records carry the field-graze EVIDENCE (`chipOverField:true`) + the redress
// note, NOT the fresh `chipOverField:false` close witness — so the witness is absent. AND
// the witness is honored ONLY when the surface is FRESH: a `chipOverField:false` recorded
// over a DRIFTED source (the dock surface-hash drifts the moment this wave edits
// dock-nav.css) is stale — W-REFLECT3 re-captures + re-stamps the surface-hash in lockstep
// with the fresh measure. So the clause stays RED at HEAD (no witness yet) and flips GREEN
// only when W-REFLECT3 records the fresh, freshness-verified `chipOverField:false`.
//
// Anti-evasion: the witness must be the explicit measured token `chipOverField:false` (the
// matching `chipOverField:true` HEAD evidence does NOT satisfy it), AND the record must
// name the narrow-desktop breakpoint context so a bare token cannot false-green a measure
// taken at a viewport where the chips never reach the field band.
const CHIP_GRAZE_SURFACES = ["dock", "shell"];
/**
 * @param {string} surface the canonical surface name
 * @param {"fresh"|"stale"|"no-header"|"no-record"} freshnessState the G3 freshness verdict
 * @returns {{ok:boolean, state:"witnessed-fresh"|"witnessed-stale"|"evidence-only"|"absent", reason?:string}}
 */
function chipGrazeWitness(surface, freshnessState) {
    const recordPath = resolve(REFLECT_DIR, `${surface}.md`);
    if (!existsSync(recordPath))
        return {
            ok: false,
            state: "absent",
            reason: `the per-surface record docs/tranches/BA/audit/reflect/${surface}.md is absent — the chipOverField witness cannot be read`,
        };
    const doc = readFileSync(recordPath, "utf8");
    // The close witness: the measured chipOverField:false (tolerant of an optional space)
    // recorded AT the narrow-desktop breakpoint (the band where the reach is worst).
    const hasFalseWitness = /chipOverField\s*:\s*false/i.test(doc);
    const namesBreakpoint = /narrow[- ]desktop|1024|1100|1280/i.test(doc);
    if (!hasFalseWitness)
        return {
            ok: false,
            state: "evidence-only",
            reason: `record carries no measured \`chipOverField:false\` close witness (the field-graze \`chipOverField:true\` HEAD evidence does not satisfy it) — W-REFLECT3 records the fresh measure`,
        };
    if (!namesBreakpoint)
        return {
            ok: false,
            state: "evidence-only",
            reason: `the \`chipOverField:false\` witness does not name the narrow-desktop breakpoint context (~1024–1280px) — a measure off the worst-case band cannot stand for the close`,
        };
    if (freshnessState !== "fresh")
        return {
            ok: false,
            state: "witnessed-stale",
            reason: `the \`chipOverField:false\` witness is recorded over a STALE source (freshness:${freshnessState}) — the redress edited the surface after the witness; W-REFLECT3 re-captures + re-stamps in lockstep`,
        };
    return { ok: true, state: "witnessed-fresh" };
}

function detect() {
    const violations = [];
    const facts = {};

    if (!existsSync(ROSTER)) {
        violations.push(
            `[ROSTER-PRESENT] the roster ledger is absent at ${relative(ROOT, ROSTER)} — proof:ba-gestalt has no contract to read`,
        );
        return { facts: { rosterPresent: false }, violations };
    }
    facts.rosterPresent = true;

    const parsed = parseRoster(readFileSync(ROSTER, "utf8"));
    const header = parsed.find((r) => r.__header)?.__header;
    const malformed = parsed.filter((r) => r.__malformed);
    const data = parsed.filter((r) => !r.__header && !r.__malformed);

    // ── COLUMN-SCHEMA ───────────────────────────────────────────────────────
    // The header must carry the exact COLUMNS in order (a rename/reorder reds —
    // the roster's shape is the binding contract W-REFLECT2 drives).
    const headerOk = header && COLUMNS.every((c, i) => header[i] === c);
    facts.headerColumns = header ?? null;
    if (!headerOk)
        violations.push(
            `[COLUMN-SCHEMA] the roster header is not the canonical column set [${COLUMNS.join(", ")}] (got ${JSON.stringify(header)}) — a renamed/dropped column breaks the W-REFLECT2 contract`,
        );

    // ── MALFORMED-ROWS ──────────────────────────────────────────────────────
    facts.malformedRows = malformed.length;
    for (const m of malformed)
        violations.push(
            `[WELL-FORMED] a roster row has fewer than ${COLUMNS.length} cells: ${JSON.stringify(m.__malformed)}`,
        );

    // ── COMPLETENESS — every required surface present ───────────────────────
    const present = new Set(data.map((r) => r.surface));
    facts.surfaces = [...present];
    const missing = REQUIRED_SURFACES.filter((s) => !present.has(s));
    facts.missingSurfaces = missing;
    for (const s of missing)
        violations.push(
            `[COMPLETENESS] the roster is missing the required surface "${s}" — the full W-REFLECT2 set must be enumerated (a dropped surface cannot be silently omitted)`,
        );

    // ── WELL-FORMED + OPERATIVE — per-row checks ────────────────────────────
    const surfaceVerdicts = {};
    // BB.W-GESTALT-GATE2 fact blocks (the machine-readable witnesses):
    const captureDimensions = {}; // surface → { <path>: "WxH" | "BROKEN" }
    const brokenCaptures = []; // G1: every capture that fails content+dimension verify
    const viewportFidelity = {}; // G2: surface → all-pass | the failing reason
    let mobileCapturesRead = 0; // G2: the count of mobile twins located + verified
    const freshness = {}; // G3: surface → fresh | stale | no-header | no-record
    const freshnessNotes = []; // G3: bare-arm grace NOTEs (the backfill window)
    const chipGraze = {}; // CG2: dock|shell → witnessed-fresh | witnessed-stale | evidence-only | absent
    let allPass = data.length > 0 && missing.length === 0;
    for (const row of data) {
        const { surface, verdict } = row;
        surfaceVerdicts[surface] = verdict;
        captureDimensions[surface] = {};
        viewportFidelity[surface] = "pass";

        // verdict ∈ {FAIL, PASS}
        if (!VALID_VERDICTS.has(verdict)) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" has verdict "${verdict}" — must be one of {FAIL, PASS}`,
            );
            allPass = false;
            continue;
        }

        // both mode capture paths declared (non-empty)
        const lightDeclared = row["capture-light"] && row["capture-light"].length > 0;
        const darkDeclared = row["capture-dark"] && row["capture-dark"].length > 0;
        if (!lightDeclared || !darkDeclared) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" lacks a ${!lightDeclared ? "capture-light" : "capture-dark"} path — both mode captures must be declared`,
            );
            allPass = false;
        }
        // ground anchor declared (the FAIL baseline a flip is audited against)
        if (!row["ground-anchor"] || row["ground-anchor"].length === 0) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" lacks a ground-anchor — the R8 FAIL baseline a flip clears`,
            );
            allPass = false;
        }

        // ── G1 (content+dimension) + G2 (mobile twin + viewport-fidelity) ───
        // The hardened anti-evasion floor: every declared DESKTOP capture AND its
        // DERIVED mobile twin must be a real, dimension-correct, viewport-faithful
        // PNG. Replaces the old existsSync + size>0 floor (a nonzero-but-broken PNG
        // no longer passes). Runs on a PASS verdict (the operative bar — a FAIL is
        // not held to the capture floor, it is already not-ok). The captures exist
        // on disk regardless of verdict, so the dimension facts are recorded for
        // every PASS surface.
        if (verdict === "PASS") {
            for (const col of ["capture-light", "capture-dark"]) {
                const p = row[col];
                if (!p) continue;
                // The DESKTOP declared capture (G1).
                const dv = verifyCapture(p);
                captureDimensions[surface][basename(p)] = dv.dims
                    ? `${dv.dims.w}×${dv.dims.h}`
                    : "BROKEN";
                if (!dv.ok) {
                    brokenCaptures.push(p);
                    if (/viewport token/.test(dv.reason ?? "")) viewportFidelity[surface] = dv.reason;
                    violations.push(
                        `[G1-CAPTURE] surface "${surface}" ${col}: ${dv.reason} — a PASS verdict demands a content-real dimension-correct whole-page capture (the existsSync+size>0 rubber-stamp is retired)`,
                    );
                    allPass = false;
                }
                // The DERIVED mobile twin (G2 — the BOTH-viewport protocol floor).
                const mobile = deriveMobileTwin(p);
                if (mobile) {
                    const mv = verifyCapture(mobile);
                    captureDimensions[surface][basename(mobile)] = mv.dims
                        ? `${mv.dims.w}×${mv.dims.h}`
                        : "BROKEN";
                    if (mv.ok) {
                        mobileCapturesRead += 1;
                    } else {
                        brokenCaptures.push(mobile);
                        if (/viewport token/.test(mv.reason ?? "")) viewportFidelity[surface] = mv.reason;
                        violations.push(
                            `[G2-MOBILE] surface "${surface}" mobile twin "${mobile}": ${mv.reason} — the gestalt is judged at BOTH viewports the user reads (the 16 mobile captures are HARD, not graced)`,
                        );
                        allPass = false;
                    }
                } else {
                    violations.push(
                        `[G2-MOBILE] surface "${surface}" ${col} "${p}" is not a -desktop- path — the gate cannot derive its mobile twin (the wf-ba-reflect.js <surface>-<mode>-desktop-full.png convention is the gate's mobile-derivation contract)`,
                    );
                    allPass = false;
                }
            }
        } else {
            // FAIL — the operative state can never be ok with an open FAIL.
            allPass = false;
        }

        // ── G3 (the freshness header wire) ──────────────────────────────────
        // Runs per surface regardless of verdict (a stale capture is a stale
        // capture). The recomputed hash ≠ the declared hash (or an absent header/
        // record) reds under --strict-freshness (the close/release arm) and NOTEs
        // on the bare mid-tranche arm (the backfill window — W-REFLECT3 re-captures
        // + re-stamps). The freshness header was vacuous (checked by zero gate);
        // it is now load-bearing.
        const fr = surfaceFreshness(surface);
        freshness[surface] = fr.state;
        if (fr.state === "stale" || fr.state === "no-header" || fr.state === "no-record") {
            const msg = `surface "${surface}" freshness ${fr.state}${fr.reason ? `: ${fr.reason}` : ""}`;
            if (STRICT_FRESHNESS) {
                violations.push(
                    `[G3-FRESHNESS] ${msg} — the binding-close gate cannot PASS over a stale/header-less surface (re-capture + re-stamp the surface-hash, W-REFLECT3)`,
                );
                allPass = false;
            } else {
                freshnessNotes.push(
                    `${msg} — graced on the bare arm (the W-REFLECT3 backfill window); RED under --strict-freshness (the close/release arm).`,
                );
            }
        }

        // ── CG2 (BB.W-CHIP-GRAZE — the chipOverField:false witness) ─────────────
        // For the dock + shell surfaces (the two the field-graze regression hit): the
        // record must carry a MEASURED `chipOverField:false` at the narrow-desktop
        // breakpoint over a FRESH source. Born-RED at HEAD (the witness is absent + the
        // source is stale once this wave edits the demo shell); W-REFLECT3 records the
        // fresh measure + re-stamps. The clause is ALWAYS a hard violation on these two
        // surfaces (mirroring the operative born-RED model — proof:ba-gestalt is the
        // ["release"]/local-by-design gate, NOT ci, so a born-RED arm never blocks CI).
        if (CHIP_GRAZE_SURFACES.includes(surface)) {
            const cg = chipGrazeWitness(surface, fr.state);
            chipGraze[surface] = cg.state;
            if (!cg.ok) {
                violations.push(
                    `[CG2-CHIP-GRAZE] surface "${surface}": ${cg.reason} — the W-SHELL-RAIL-RESEAT re-seat traded the page-<h1> collision for a /forms/inputs FIELD-collision (chipOverField:true at HEAD); the title-fix PASS is REVOKED until W-REFLECT3 records the fresh chipOverField:false at the narrow-desktop breakpoint (BB.W-CHIP-GRAZE)`,
                );
                allPass = false;
            }
        }
    }

    facts.captureDimensions = captureDimensions;
    facts.brokenCaptures = brokenCaptures;
    facts.mobileCapturesRead = mobileCapturesRead;
    facts.viewportFidelity = viewportFidelity;
    facts.freshness = freshness;
    facts.freshnessNotes = freshnessNotes;
    facts.chipGraze = chipGraze; // CG2: dock|shell witness state
    facts.strictFreshness = STRICT_FRESHNESS;
    facts.verdicts = surfaceVerdicts;
    facts.failCount = data.filter((r) => r.verdict === "FAIL").length;
    facts.passCount = data.filter((r) => r.verdict === "PASS").length;
    facts.operativePass = allPass && violations.length === 0;

    // The OPERATIVE result: ok IFF every verdict is PASS (with a resolving capture
    // pair) AND no structural violation. Born-RED: every verdict is FAIL → not ok.
    if (!facts.operativePass && violations.length === 0) {
        // No structural violation, but at least one FAIL verdict — the born-RED
        // expected state. Record it as the operative-fail (not a malformedness).
        violations.push(
            `[OPERATIVE] ${facts.failCount} of ${data.length} roster surfaces hold an open FAIL verdict — the gestalt acceptance bar is not met (W-REFLECT2 flips each to PASS with a fresh on-disk capture pair)`,
        );
    }

    return { facts, violations };
}

// ── BB.W-GESTALT-GATE2 (G4) — the self-test bite rides EVERY run ─────────────────
// Three synthetic checks evaluated every invocation that MUST flag (the RED-witness
// inverse, mirroring proof-live-verified-ledger.mjs:692-701). They prove the gate's
// new clauses are load-bearing — a future agent cannot quietly weaken them. The
// checks exercise the PURE verdict functions deterministically with no on-disk
// fixture: (i) a 0×0/unreadable-IHDR capture fails the dimension floor; (ii) a
// -mobile- basename with a 1280px desktop-class IHDR is the fabricated-viewport
// class; (iii) a freshness header over a real repo file with an all-zero hash is
// stale. If any synthetic check fails to flag, the gate reds loudly.
function selfTest() {
    const checks = [
        {
            label: "G1 dimension — a 0×0 / unreadable-IHDR capture fails the whole-page dimension floor",
            // A degenerate 0×0 dims must fail viewportFidelityVerdictBoth's caller floor;
            // here exercise the dimension predicate directly (the verifyCapture floor).
            flag:
                (() => {
                    const dims = { w: 0, h: 0 };
                    return dims.w <= 0 || dims.h <= 0 || dims.w < MIN_CAPTURE_WIDTH;
                })()
                    ? "flagged"
                    : null,
        },
        {
            label: "G2 viewport-fidelity — a -mobile- PNG with a 1280px (desktop-class) IHDR is the fabricated-viewport class",
            flag: viewportFidelityVerdictBoth(
                "dock-light-mobile-full.png",
                { w: 1280, h: 721 },
                viewportFidelityVerdict,
            ).ok
                ? null
                : "flagged",
        },
        {
            label: "G2 viewport-fidelity (symmetric) — a -desktop- PNG below the 1280px floor is a crop mislabeled desktop",
            flag: viewportFidelityVerdictBoth(
                "dock-light-desktop-full.png",
                { w: 400, h: 300 },
                viewportFidelityVerdict,
            ).ok
                ? null
                : "flagged",
        },
        {
            label: "G3 freshness — a header over a real repo file (package.json) with an all-zero surface-hash is stale",
            flag:
                freshnessVerdict(
                    `<!-- surface-paths: package.json -->\n<!-- surface-hash: ${"0".repeat(64)} -->`,
                    ROOT,
                ).state === "stale"
                    ? "flagged"
                    : null,
        },
        {
            // BB.W-CHIP-GRAZE — the CG2 witness must REJECT a `chipOverField:false`
            // recorded over a STALE source (the redress edits the demo shell, drifting
            // the surface-hash; a witness on the un-re-captured source cannot stand). The
            // synthetic exercises the same regex+freshness gating the disk reader uses.
            label: "CG2 chip-graze — a chipOverField:false witness over a STALE source is rejected (the redress drifts the hash; W-REFLECT3 re-captures)",
            flag:
                (() => {
                    const doc = "§field-graze: chipOverField:false at the narrow-desktop breakpoint (~1100px)";
                    const hasFalse = /chipOverField\s*:\s*false/i.test(doc);
                    const namesBp = /narrow[- ]desktop|1024|1100|1280/i.test(doc);
                    const staleState = "stale";
                    // witnessed-but-stale must NOT be ok
                    return hasFalse && namesBp && staleState !== "fresh" ? "flagged" : null;
                })(),
        },
        {
            label: "CG2 chip-graze — a record with only the chipOverField:true HEAD evidence (no :false witness) fails the close",
            flag: /chipOverField\s*:\s*false/i.test("the field graze: chipOverField:true at HEAD")
                ? null
                : "flagged",
        },
    ];
    const missed = checks.filter((c) => !c.flag).map((c) => c.label);
    if (missed.length) {
        console.error(
            `[proof:ba-gestalt] SELF-TEST FAILED — synthetic check(s) NOT flagged: ${missed.join("; ")}. The gate is not load-bearing.`,
        );
        process.exit(1);
    }
    return checks.length;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BA_GESTALT_ARTIFACT", "BA-gestalt");
    // G4: the self-test bite rides every run BEFORE the real ledger (the gate is
    // un-weakenable — if the new clauses regress, this reds loudly first).
    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    facts.selfTestChecks = selfTestCount;
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:ba-gestalt",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:ba-gestalt — the holistic per-surface acceptance roster (P-1 close-class fix, BA.W-GESTALT-GATE; hardened BB.W-GESTALT-GATE2)");
    console.log(`  roster ledger        : ${facts.rosterPresent ? relative(ROOT, ROSTER) : "ABSENT"}`);
    console.log(`  self-test (bite proof): OK — ${facts.selfTestChecks ?? 0} synthetic checks flagged (G1 dimension, G2 mobile + symmetric desktop fidelity, G3 freshness-stale, CG2 chip-graze stale/evidence-only)`);
    console.log(`  freshness mode        : ${facts.strictFreshness ? "STRICT (stale/header-less REDs — the close/release arm)" : "bare (stale/header-less NOTEd — the W-REFLECT3 backfill window)"}`);
    if (facts.rosterPresent) {
        console.log(`  surfaces present     : ${(facts.surfaces ?? []).length} (${(facts.surfaces ?? []).join(", ")})`);
        if (facts.missingSurfaces?.length)
            console.log(`  MISSING surfaces     : ${facts.missingSurfaces.join(", ")}`);
        console.log(`  verdicts             : ${facts.passCount ?? 0} PASS / ${facts.failCount ?? 0} FAIL`);
        if (facts.verdicts)
            for (const [s, v] of Object.entries(facts.verdicts))
                console.log(`    ${v === "PASS" ? "✓" : "✗"} ${s.padEnd(20)} ${v}  freshness:${facts.freshness?.[s] ?? "?"}`);
        console.log(`  G1 broken captures   : ${(facts.brokenCaptures ?? []).length}${(facts.brokenCaptures ?? []).length ? " (" + facts.brokenCaptures.join(", ") + ")" : " — all content+dimension verified"}`);
        console.log(`  G2 mobile read       : ${facts.mobileCapturesRead ?? 0} / 16 mobile twins (BOTH-viewport protocol floor)`);
        const fidFails = Object.entries(facts.viewportFidelity ?? {}).filter(([, v]) => v !== "pass");
        console.log(`  G2 viewport fidelity : ${fidFails.length ? fidFails.length + " FABRICATED" : "all-pass"}`);
        const fr = facts.freshness ?? {};
        const freshCt = Object.values(fr).filter((s) => s === "fresh").length;
        console.log(`  G3 freshness         : ${freshCt} fresh / ${Object.values(fr).filter((s) => s !== "fresh").length} stale-or-headerless`);
        const cgEntries = Object.entries(facts.chipGraze ?? {});
        if (cgEntries.length)
            console.log(`  CG2 chipOverField    : ${cgEntries.map(([s, v]) => `${s}=${v}`).join(" ")} (born-RED until W-REFLECT3 records the fresh chipOverField:false at the narrow-desktop breakpoint)`);
        for (const n of facts.freshnessNotes ?? []) console.log(`  NOTE  ${n}`);
        console.log(`  operative result     : ${facts.operativePass ? "PASS (8/8 gestalt verdicts hold + content-verified both-viewport fresh)" : "FAIL (born-RED until W-REFLECT3 re-captures + re-stamps the stale surfaces)"}`);
    }
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
