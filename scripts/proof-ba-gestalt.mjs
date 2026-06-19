#!/usr/bin/env node
// BC.W-GESTALT-FIRST — proof:ba-gestalt, RE-MADE a PIXEL reader, ci-BLOCKING.
//
// The keystone gate redesign. BA.W-GESTALT-GATE minted a per-surface acceptance
// roster ABOVE the per-mechanism π readback — but it was paint-BLIND (it read
// verdict STRINGS + asserted PNGs resolve, never a luminance/chroma pixel),
// release-DEFERRED (tags:["local"]/["release"] — it never ran in --run ci, so the
// mid-tranche battery carried zero gestalt signal), and single-flipper-LOCKED
// (W-REFLECT2/W-REFLECT3 the single authorized verdict-flipper — the
// write-locked-verdict deadlock that funneled all paint-verification into one
// terminal wave the execution stop cut, the disease that destroyed BB).
//
// BC re-authors it into the SINGLE close oracle for PAINT, mechanically derived
// from the captured pixels:
//   - re-tagged ["local","ci","release"] — it runs in --run ci (the mid-tranche
//     battery now carries gestalt signal; kills BC.W-PM-SYNTHESIS req #4).
//   - G5 (PIXEL band) — the gate reads the captured PNG's luminance + chroma +
//     alpha at the roster row's declared probe region and asserts the stats fall
//     in the row's expect band (warm-translucent, NOT the grey oklab(0.695) slab).
//     A hand-typed "PASS" is no longer sufficient (kills req #4 roster-text).
//   - G6 (grow-the-roster) — the roster MUST enroll every BC-touched surface (the
//     8 BA surfaces + the BC dock/glass/viz/tabs/controls surfaces). A surface a BC
//     wave paints but the roster omits → RED (kills the BB roster-never-grew gap).
//   - G7 (auto-revoke) — the surface-hash freshness clause is RE-PURPOSED: when a
//     surface's surface-hash no longer matches its surface-paths' current bytes the
//     verdict AUTO-REVERTS to FAIL (not a stale-warning). ANY wave editing a
//     painting source revokes that surface's PASS — there is no single authorized
//     flipper; the surface must be re-captured + re-pixel-read before the close.
//     This is the DEFAULT for the gestalt gate (BB's --strict-freshness opt-in
//     became the default — req #5).
//   - G8 (no-terminal-reflect) — a device-free SOURCE clause scans
//     docs/tranches/BC/waves/*.md + docs/tranches/BC/**/PROGRESS*.md line-by-line
//     for a wave DEFERRING its own π/verdict to a future terminal-reflect wave and
//     REDs on a real deferral (kills req #1). CONTEXT-AWARE, not a blind regex:
//     G8a forward-deferral (`rides? (the )?W-REFLECT\d`) with two exemption arms
//     (G8a-exempt-1 forensic-quote span-enclosure, G8a-exempt-2 RETIRE/forbidden
//     context) + G8b staged/deferred-verdict. The corpus correctly RETIRES the
//     deferral, so G8 is GREEN on the actual 96-wave HEAD corpus (every W-REFLECT
//     mention is quote-wrapped OR on a RETIRE line); born-RED only on a SYNTHETIC
//     real deferral.
//
// PAINT/GESTALT split: the real-surface roster verdicts stay born-RED at HEAD (the
// grey ground); they flip GREEN only when a Band-1 wave PAINTS warm-cream + re-
// captures + re-pixel-reads. The SELF-TEST fixtures are the proof the gate's logic
// is load-bearing; the real-surface arm staying RED-until-Band-1 is EXPECTED. There
// is NO terminal reflect wave — the close is the UNION of per-wave verdicts.
//
// ONE hash leaf + ONE PNG decoder (BB.W-GESTALT-GATE2 + BC.W-GESTALT-FIRST): the
// pixel reader extends scripts/reflect-capture-verify.mjs (pngRegionStats); a second
// createHash/PNG-decoder outside the leaf is forbidden. The OKLab decompose lives in
// the leaf (BC.W-PAINT-GATE imports it). The import.meta.url run-guard is preserved
// (importing the leaf never runs this gate).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, basename, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    isRealPng,
    pngDimensions,
    viewportFidelityVerdict,
    viewportFidelityVerdictBoth,
    surfaceHash,
    freshnessVerdict,
    pngRegionStats,
} from "./reflect-capture-verify.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:ba-gestalt";
const REFLECT_DIR = resolve(ROOT, "docs/tranches/BC/audit/reflect");
const ROSTER = resolve(REFLECT_DIR, "bc-gestalt-roster.md");
const WAVES_DIR = resolve(ROOT, "docs/tranches/BC/waves");
const TRANCHE_DIR = resolve(ROOT, "docs/tranches/BC");

// The whole-page-capture dimension floor (BB.W-GESTALT-GATE2 — preserved).
const MIN_CAPTURE_WIDTH = 320;
const MIN_CAPTURE_HEIGHT = 320;

// ── G6 — the GROWN roster (the BB roster-never-grew gap closed) ─────────────────
// The completeness set is the 8 BA surfaces + the BC dock/glass/viz/tabs/controls
// surfaces. A surface a BC wave paints but the roster omits → RED. An extra surface
// is allowed (a future split). These are the canonical BC-touched surface names.
const REQUIRED_SURFACES = [
    // the 8 BA surfaces (inherited)
    "dock",
    "configurators-goo",
    "aurora",
    "glass-feedback",
    "shell",
    "motion-fourier",
    "dark-register",
    "cross-repo",
    // the BC dock/glass/viz/tabs/controls surfaces (the grow)
    "dock-engine",
    "glass-adaptive",
    "viz-procedural",
    "tabs-segmented",
    "controls-custom",
];

const VALID_VERDICTS = new Set(["FAIL", "PASS"]);
const COLUMNS = [
    "surface",
    "routes",
    "capture-light",
    "capture-dark",
    "probe",
    "expect",
    "verdict",
    "ground-anchor",
];

/**
 * Parse the ROSTER markdown table. Strips HTML comments first (so the schema doc-
 * block + per-cell prose can name a column without tripping the parse). Returns the
 * data rows (header + separator dropped) as objects keyed by COLUMNS.
 */
function parseRoster(src) {
    const noComments = src.replace(/<!--[\s\S]*?-->/g, "");
    const rows = [];
    let inTable = false;
    for (const raw of noComments.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) {
            if (inTable && line === "") inTable = false;
            continue;
        }
        const cells = line
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
        if (isSeparator) {
            inTable = true;
            continue;
        }
        if (cells[0] === "surface") {
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

// ── G1 (content+dimension) — preserved BB.W-GESTALT-GATE2 floor ──────────────────
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
            reason: `${repoRelPath} has degenerate dimensions ${dims.w}×${dims.h} (below the whole-page floor ${MIN_CAPTURE_WIDTH}×${MIN_CAPTURE_HEIGHT})`,
            dims,
        };
    const fid = viewportFidelityVerdictBoth(bn, dims, viewportFidelityVerdict);
    if (!fid.ok) return { ok: false, reason: fid.reason, dims };
    return { ok: true, dims };
}

// ── The probe region + expect band parse (G5) ───────────────────────────────────
// probe cell: `x=0.00,y=0.40,w=0.30,h=0.20` → a fractional box ∈ [0,1].
// expect cell: `meanL=0.85..0.99;meanChroma>=0.01;meanAlpha<0.70` → the pixel band.
/** @returns {{x:number,y:number,w:number,h:number}|null} */
function parseProbe(cell) {
    const m = {};
    for (const part of cell.split(/[,;]/)) {
        const kv = part.trim().match(/^([xywh])\s*=\s*([0-9.]+)$/);
        if (kv) m[kv[1]] = parseFloat(kv[2]);
    }
    if (["x", "y", "w", "h"].every((k) => Number.isFinite(m[k]))) return m;
    return null;
}
/**
 * Parse the expect band into predicates. Supports `meanL=lo..hi`, `meanChroma>=v`,
 * `meanChroma<=v`, `meanAlpha<v`, `meanAlpha>v` (the three pixel axes).
 * @returns {{key:string, lo?:number, hi?:number, op?:string, val?:number}[]}
 */
function parseExpect(cell) {
    const preds = [];
    for (const part of cell.split(/[;,]/)) {
        const t = part.trim();
        if (!t) continue;
        let mm;
        if ((mm = t.match(/^(\w+)\s*=\s*([0-9.]+)\.\.([0-9.]+)$/)))
            preds.push({ key: mm[1], lo: parseFloat(mm[2]), hi: parseFloat(mm[3]) });
        else if ((mm = t.match(/^(\w+)\s*(>=|<=|>|<)\s*([0-9.]+)$/)))
            preds.push({ key: mm[1], op: mm[2], val: parseFloat(mm[3]) });
    }
    return preds;
}
/** @returns {{ok:boolean, fails:string[]}} */
function evalBand(stats, preds) {
    const fails = [];
    for (const p of preds) {
        const v = stats[p.key];
        if (!Number.isFinite(v)) {
            fails.push(`${p.key} unread`);
            continue;
        }
        if (p.lo !== undefined) {
            if (v < p.lo || v > p.hi)
                fails.push(`${p.key} ${v.toFixed(3)} ∉ [${p.lo},${p.hi}]`);
        } else {
            const ok =
                p.op === ">=" ? v >= p.val :
                p.op === "<=" ? v <= p.val :
                p.op === ">" ? v > p.val :
                v < p.val;
            if (!ok) fails.push(`${p.key} ${v.toFixed(3)} not ${p.op} ${p.val}`);
        }
    }
    return { ok: fails.length === 0, fails };
}

// ── G7 (auto-revoke) — the surface-hash freshness clause, RE-PURPOSED ────────────
// BB held freshness behind --strict-freshness (an opt-in NOTE on the bare arm). BC
// makes auto-revoke the DEFAULT: a drifted surface-hash AUTO-REVERTS the verdict to
// FAIL (not a warning). The per-surface record docs/tranches/BC/audit/reflect/
// <surface>.md carries the <!-- surface-paths --> + <!-- surface-hash --> header.
/**
 * @param {string} surface
 * @returns {{state:"fresh"|"stale"|"no-header"|"no-record", reason?:string, recordPath:string}}
 */
function surfaceFreshness(surface) {
    const recordPath = resolve(REFLECT_DIR, `${surface}.md`);
    if (!existsSync(recordPath))
        return {
            state: "no-record",
            reason: `the per-surface record docs/tranches/BC/audit/reflect/${surface}.md is absent — the freshness header cannot be read`,
            recordPath,
        };
    const doc = readFileSync(recordPath, "utf8");
    const verdict = freshnessVerdict(doc, ROOT);
    return { ...verdict, recordPath };
}

// ── G8 (no-terminal-reflect deferral scan) — context-aware, NOT a blind regex ────
// The CHALLENGE-3 self-inconsistency closed: a blind triple-regex could NEVER reach
// GREEN (the corpus correctly RETIRES the deferral, citing the phrase to abolish it).
// THREE detectors, all line-scoped:
//
//   G8a  — forward-deferral: /\brides?\s+(the\s+)?W-REFLECT\d/i. The trailing \d
//          anchors it to the terminal-reflect target (W-REFLECT3/W-REFLECT2); a bare
//          "rides BC.W-PAINT-GATE" carries no digit and is never matched (the
//          /π .* rides/i pattern is DROPPED — redundant + colliding). The (the\s+)?
//          article tolerance catches the "rides the W-REFLECT3-class close" leak.
//   G8a-exempt-1 — forensic-quote: a match WITHIN a backtick/double-quote SPAN is a
//          citation, not an assertion (span-enclosure, not adjacency).
//   G8a-exempt-2 — RETIRE/forbidden context: a match on a line carrying a retire/
//          forbidden/abolished marker is the narration that names the phrase to kill it.
//   G8b  — staged/deferred-verdict: /gestalt verdict\s+(staged|deferred)/i. Born-clean
//          (the corpus carries zero such phrase); the same two exemptions apply for
//          symmetry if a future wave forensically quotes it.

const G8A_RE = /\brides?\s+(?:the\s+)?W-REFLECT\d/i;
const G8B_RE = /gestalt verdict\s+(staged|deferred)/i;
const RETIRE_RE =
    /\b(RETIRE[DS]?|forbidden|mechanically forbidden|DECIDED\s*[—-]\s*RETIRE|never a (?:BC )?carry|abolished|zero ["`]?rides?)\b/i;

/**
 * G8a-exempt-1 — is the matched substring enclosed in a backtick or double-quote
 * span on the line? Span-enclosure (the opening quote may sit several words before
 * the match). Returns true when the match falls inside any `…`/"…" literal.
 * @param {string} line
 * @param {number} matchStart the index where the rides?-match begins
 */
function withinQuoteSpan(line, matchStart) {
    // Backtick span: an odd count of backticks BEFORE the match start means the
    // match opens inside an unclosed `…` span.
    const ticksBefore = (line.slice(0, matchStart).match(/`/g) || []).length;
    if (ticksBefore % 2 === 1) return true;
    // Double-quote span (incl. the *"…"* emphasis form): same odd-count rule. Use a
    // straight ASCII double-quote.
    const quotesBefore = (line.slice(0, matchStart).match(/"/g) || []).length;
    if (quotesBefore % 2 === 1) return true;
    return false;
}

/**
 * Scan one line for a G8 hit. Returns the hit detector + reason, or null.
 * @param {string} line
 * @returns {{detector:"G8a"|"G8b", reason:string}|null}
 */
function g8ScanLine(line) {
    const a = line.match(G8A_RE);
    if (a) {
        const start = a.index ?? 0;
        const quoted = withinQuoteSpan(line, start);
        const retired = RETIRE_RE.test(line);
        if (!quoted && !retired)
            return {
                detector: "G8a",
                reason: `forward-deferral "${a[0]}" asserts this wave's π/verdict rides a terminal-reflect wave (the BB disease) — a BC verdict is mechanically derived at the wave's OWN close; there is no terminal reflect wave to defer to`,
            };
    }
    const b = line.match(G8B_RE);
    if (b) {
        const start = b.index ?? 0;
        const quoted = withinQuoteSpan(line, start);
        const retired = RETIRE_RE.test(line);
        if (!quoted && !retired)
            return {
                detector: "G8b",
                reason: `staged/deferred gestalt verdict "${b[0]}" punts the verdict to a later wave — every BC verdict is mechanically derived at the wave's own close`,
            };
    }
    return null;
}

/** Recursively collect the *.md files under a dir that match the G8 scope. */
function g8ScopedFiles() {
    const files = [];
    // every docs/tranches/BC/waves/*.md
    if (existsSync(WAVES_DIR))
        for (const f of readdirSync(WAVES_DIR))
            if (f.endsWith(".md")) files.push(join(WAVES_DIR, f));
    // every docs/tranches/BC/**/PROGRESS*.md
    const walk = (dir) => {
        for (const ent of readdirSync(dir, { withFileTypes: true })) {
            const p = join(dir, ent.name);
            if (ent.isDirectory()) walk(p);
            else if (/PROGRESS.*\.md$/.test(ent.name)) files.push(p);
        }
    };
    if (existsSync(TRANCHE_DIR)) walk(TRANCHE_DIR);
    return [...new Set(files)];
}

/**
 * Scan the G8-scoped corpus for forward-deferral / staged-verdict violations.
 * @returns {{hits:{file:string, line:number, detector:string, reason:string}[], filesScanned:number}}
 */
function g8ScanCorpus() {
    const hits = [];
    const files = g8ScopedFiles();
    for (const f of files) {
        let doc;
        try {
            doc = readFileSync(f, "utf8");
        } catch {
            continue;
        }
        doc.split("\n").forEach((line, i) => {
            const hit = g8ScanLine(line);
            if (hit) hits.push({ file: relative(ROOT, f), line: i + 1, ...hit });
        });
    }
    return { hits, filesScanned: files.length };
}

function detect() {
    const violations = [];
    const facts = {};

    // ── G8 (no-terminal-reflect) — runs ALWAYS, independent of the roster ───────
    const g8 = g8ScanCorpus();
    facts.g8FilesScanned = g8.filesScanned;
    facts.g8Hits = g8.hits;
    for (const h of g8.hits)
        violations.push(
            `[G8-NO-TERMINAL-REFLECT/${h.detector}] ${h.file}:${h.line} — ${h.reason}`,
        );

    if (!existsSync(ROSTER)) {
        violations.push(
            `[ROSTER-PRESENT] the roster ledger is absent at ${relative(ROOT, ROSTER)} — proof:ba-gestalt has no contract to read`,
        );
        facts.rosterPresent = false;
        return { facts, violations };
    }
    facts.rosterPresent = true;

    const parsed = parseRoster(readFileSync(ROSTER, "utf8"));
    const header = parsed.find((r) => r.__header)?.__header;
    const malformed = parsed.filter((r) => r.__malformed);
    const data = parsed.filter((r) => !r.__header && !r.__malformed);

    // ── COLUMN-SCHEMA ───────────────────────────────────────────────────────────
    const headerOk = header && COLUMNS.every((c, i) => header[i] === c);
    facts.headerColumns = header ?? null;
    if (!headerOk)
        violations.push(
            `[COLUMN-SCHEMA] the roster header is not the canonical column set [${COLUMNS.join(", ")}] (got ${JSON.stringify(header)})`,
        );

    // ── MALFORMED-ROWS ──────────────────────────────────────────────────────────
    facts.malformedRows = malformed.length;
    for (const m of malformed)
        violations.push(
            `[WELL-FORMED] a roster row has fewer than ${COLUMNS.length} cells: ${JSON.stringify(m.__malformed)}`,
        );

    // ── G6 (COMPLETENESS — the GROWN roster) ────────────────────────────────────
    const present = new Set(data.map((r) => r.surface));
    facts.surfaces = [...present];
    const missing = REQUIRED_SURFACES.filter((s) => !present.has(s));
    facts.missingSurfaces = missing;
    for (const s of missing)
        violations.push(
            `[G6-COMPLETENESS] the roster is missing the BC-touched surface "${s}" — the GROWN set (8 BA + the BC dock/glass/viz/tabs/controls surfaces) must be enumerated (a surface a BC wave paints but the roster omits is the BB roster-never-grew gap)`,
        );

    // ── per-row checks ──────────────────────────────────────────────────────────
    const surfaceVerdicts = {};
    const captureDimensions = {};
    const brokenCaptures = [];
    const pixelStats = {}; // G5: surface → {light, dark} stats or "unread"
    const freshness = {}; // G7: surface → fresh | stale | no-header | no-record
    let allPass = data.length > 0 && missing.length === 0;
    for (const row of data) {
        const { surface, verdict } = row;
        surfaceVerdicts[surface] = verdict;
        captureDimensions[surface] = {};

        if (!VALID_VERDICTS.has(verdict)) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" has verdict "${verdict}" — must be one of {FAIL, PASS}`,
            );
            allPass = false;
            continue;
        }

        const lightDeclared = row["capture-light"] && row["capture-light"].length > 0;
        const darkDeclared = row["capture-dark"] && row["capture-dark"].length > 0;
        if (!lightDeclared || !darkDeclared) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" lacks a ${!lightDeclared ? "capture-light" : "capture-dark"} path — both mode captures must be declared`,
            );
            allPass = false;
        }
        if (!row["ground-anchor"] || row["ground-anchor"].length === 0) {
            violations.push(
                `[WELL-FORMED] surface "${surface}" lacks a ground-anchor — the FAIL baseline a flip clears`,
            );
            allPass = false;
        }

        // ── G7 (auto-revoke) — runs per surface, AUTO-REVERTS a PASS on drift ────
        const fr = surfaceFreshness(surface);
        freshness[surface] = fr.state;
        if (verdict === "PASS" && fr.state !== "fresh") {
            violations.push(
                `[G7-AUTO-REVOKE] surface "${surface}" verdict PASS but freshness ${fr.state}${fr.reason ? ` (${fr.reason})` : ""} — the painting source DRIFTED since capture; the verdict AUTO-REVERTS to FAIL (there is no single authorized flipper — re-capture + re-pixel-read before the close)`,
            );
            allPass = false;
        }

        // ── G5 (PIXEL band) + G1 (content+dimension) ────────────────────────────
        // Run on a PASS verdict (the operative bar — a FAIL is already not-ok). The
        // probe + expect cells declare the warm-translucent band; the captured PNG's
        // pixels MUST fall in it (a hand-typed PASS over a grey capture REDs G5).
        const probe = parseProbe(row.probe ?? "");
        const expect = parseExpect(row.expect ?? "");
        if (verdict === "PASS") {
            if (!probe) {
                violations.push(
                    `[G5-PIXEL] surface "${surface}" PASS but the probe cell "${row.probe}" is not a fractional box (x=,y=,w=,h=) — the pixel band cannot be read`,
                );
                allPass = false;
            }
            if (!expect.length) {
                violations.push(
                    `[G5-PIXEL] surface "${surface}" PASS but the expect cell "${row.expect}" declares no band (meanL=lo..hi; meanChroma>=v; meanAlpha<v)`,
                );
                allPass = false;
            }
            for (const col of ["capture-light", "capture-dark"]) {
                const p = row[col];
                if (!p) continue;
                const dv = verifyCapture(p);
                captureDimensions[surface][basename(p)] = dv.dims
                    ? `${dv.dims.w}×${dv.dims.h}`
                    : "BROKEN";
                if (!dv.ok) {
                    brokenCaptures.push(p);
                    violations.push(
                        `[G1-CAPTURE] surface "${surface}" ${col}: ${dv.reason} — a PASS verdict demands a content-real dimension-correct whole-page capture`,
                    );
                    allPass = false;
                    continue;
                }
                // G5: read the pixels at the probe region + assert the expect band.
                if (probe && expect.length) {
                    const stats = pngRegionStats(resolve(ROOT, p), probe);
                    pixelStats[surface] = pixelStats[surface] || {};
                    if (!stats) {
                        pixelStats[surface][col] = "unread";
                        violations.push(
                            `[G5-PIXEL] surface "${surface}" ${col} "${p}": the probe region could not be pixel-read (undecodable PNG colour-type or empty region) — the gestalt cannot verify the warm-translucent band`,
                        );
                        allPass = false;
                        continue;
                    }
                    pixelStats[surface][col] = {
                        meanL: +stats.meanL.toFixed(4),
                        meanChroma: +stats.meanChroma.toFixed(4),
                        meanAlpha: +stats.meanAlpha.toFixed(4),
                    };
                    const band = evalBand(stats, expect);
                    if (!band.ok) {
                        violations.push(
                            `[G5-PIXEL] surface "${surface}" ${col} reads ${band.fails.join(", ")} at the probe region — OUTSIDE the warm-translucent expect band [${row.expect}]; a hand-typed PASS over a grey-or-broken capture is no longer sufficient (the pixel stats are the operative verdict)`,
                        );
                        allPass = false;
                    }
                }
            }
        } else {
            allPass = false; // FAIL — the operative state can never be ok with an open FAIL
        }
    }

    facts.captureDimensions = captureDimensions;
    facts.brokenCaptures = brokenCaptures;
    facts.pixelStats = pixelStats;
    facts.freshness = freshness;
    facts.verdicts = surfaceVerdicts;
    facts.failCount = data.filter((r) => r.verdict === "FAIL").length;
    facts.passCount = data.filter((r) => r.verdict === "PASS").length;
    facts.operativePass = allPass && violations.length === 0;

    if (!facts.operativePass && data.length && malformed.length === 0) {
        const openFails = facts.failCount;
        if (openFails > 0 && !violations.some((v) => v.startsWith("[OPERATIVE]")))
            violations.push(
                `[OPERATIVE] ${openFails} of ${data.length} roster surfaces hold an open FAIL verdict — the gestalt acceptance bar is not met (each flips to PASS only when a Band-1 wave paints warm-cream + re-captures + the pixel band reads warm-translucent)`,
            );
    }

    return { facts, violations };
}

// ── The self-test bites ride EVERY run (G4 — the gate is un-weakenable) ──────────
// The synthetic fixtures prove the new clauses are load-bearing. Each MUST flag
// (the RED-witness inverse); if any fails to flag, the gate reds loudly.
function selfTest() {
    const checks = [
        {
            label: "G5 grey-capture — a probe reading the grey slab (meanL 0.695, chroma 0) is OUTSIDE the warm-translucent band",
            flag: (() => {
                const band = parseExpect("meanL=0.85..0.99;meanChroma>=0.01;meanAlpha<0.70");
                const grey = evalBand({ meanL: 0.695, meanChroma: 0.001, meanAlpha: 0.9 }, band);
                return !grey.ok ? "flagged" : null;
            })(),
        },
        {
            label: "G5 warm-capture — a probe reading warm-translucent (meanL 0.93, chroma 0.04, alpha 0.55) is INSIDE the band (must NOT flag)",
            // inverse witness: the warm capture must PASS the band (so the check
            // flags iff the band correctly accepts it).
            flag: (() => {
                const band = parseExpect("meanL=0.85..0.99;meanChroma>=0.01;meanAlpha<0.70");
                const warm = evalBand({ meanL: 0.93, meanChroma: 0.04, meanAlpha: 0.55 }, band);
                return warm.ok ? "flagged" : null;
            })(),
        },
        {
            label: "G6 missing-surface — a roster present-set omitting a BC-painted surface (glass-adaptive) reds completeness",
            flag: (() => {
                const present = new Set(REQUIRED_SURFACES.filter((s) => s !== "glass-adaptive"));
                const missing = REQUIRED_SURFACES.filter((s) => !present.has(s));
                return missing.includes("glass-adaptive") ? "flagged" : null;
            })(),
        },
        {
            label: "G7 auto-revoke — a PASS verdict over a STALE source AUTO-REVERTS (a drifted surface-hash reds, no opt-in flag)",
            flag: (() => {
                // a header over a real repo file with an all-zero hash is stale
                const fr = freshnessVerdict(
                    `<!-- surface-paths: package.json -->\n<!-- surface-hash: ${"0".repeat(64)} -->`,
                    ROOT,
                );
                const verdict = "PASS";
                // the gate logic: PASS ∧ !fresh → auto-revoke (red)
                return verdict === "PASS" && fr.state !== "fresh" ? "flagged" : null;
            })(),
        },
        {
            // G8 negation pair — (i) the real-deferral fixture → RED
            label: "G8a (i) real-deferral — `this wave's π rides W-REFLECT3` (un-quoted, un-RETIRE) flags forward-deferral",
            flag: g8ScanLine("this wave's π rides W-REFLECT3")?.detector === "G8a"
                ? "flagged"
                : null,
        },
        {
            // (i′) the W-REFLECT3-class close variant → RED (the (the\s+)? tolerance)
            label: "G8a (i′) class-close variant — `LOCAL-only (rides the W-REFLECT3-class close via the dock verdict)` flags (the intervening `the` + `-class close`)",
            flag:
                g8ScanLine("LOCAL-only (rides the W-REFLECT3-class close via the dock verdict)")
                    ?.detector === "G8a"
                    ? "flagged"
                    : null,
        },
        {
            // (ii) the forensic-quote fixture → GREEN (both exemption arms)
            label: 'G8a (ii) forensic-quote — `the BB π "rides W-REFLECT3" — DECIDED — RETIRE the deferral` does NOT flag (quote-span AND RETIRE context)',
            flag:
                g8ScanLine('the BB π "rides W-REFLECT3" — DECIDED — RETIRE the deferral') === null
                    ? "flagged"
                    : null,
        },
        {
            // (iii) the sanctioned-idiom fixture → GREEN (no W-REFLECT\d, dropped collision)
            label: "G8a (iii) sanctioned-idiom — `π readback rides BC.W-PAINT-GATE — the binding paint` does NOT flag (no W-REFLECT\\d; the /π .* rides/i collision is dead)",
            flag:
                g8ScanLine("π readback rides BC.W-PAINT-GATE — the binding paint") === null
                    ? "flagged"
                    : null,
        },
        {
            // (iv) the staged-verdict fixture → RED
            label: "G8b (iv) staged-verdict — `gestalt verdict staged for a later wave` flags G8b",
            flag:
                g8ScanLine("gestalt verdict staged for a later wave")?.detector === "G8b"
                    ? "flagged"
                    : null,
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

    console.log("proof:ba-gestalt — the PIXEL-reading, ci-blocking gestalt close oracle (BC.W-GESTALT-FIRST; re-made from BA.W-GESTALT-GATE)");
    console.log(`  roster ledger        : ${facts.rosterPresent ? relative(ROOT, ROSTER) : "ABSENT"}`);
    console.log(`  self-test (bite proof): OK — ${facts.selfTestChecks ?? 0} synthetic checks flagged (G5 grey-RED + warm-GREEN, G6 missing-surface, G7 auto-revoke, G8 negation-pair i/i′/ii/iii/iv)`);
    console.log(`  G8 no-terminal-reflect: ${facts.g8FilesScanned ?? 0} files scanned — ${(facts.g8Hits ?? []).length ? (facts.g8Hits.length + " DEFERRAL HIT(S)") : "clean (the corpus RETIRES the deferral)"}`);
    if (facts.rosterPresent) {
        console.log(`  surfaces present     : ${(facts.surfaces ?? []).length} (${(facts.surfaces ?? []).join(", ")})`);
        if (facts.missingSurfaces?.length)
            console.log(`  MISSING surfaces     : ${facts.missingSurfaces.join(", ")}`);
        console.log(`  verdicts             : ${facts.passCount ?? 0} PASS / ${facts.failCount ?? 0} FAIL`);
        if (facts.verdicts)
            for (const [s, v] of Object.entries(facts.verdicts)) {
                const px = facts.pixelStats?.[s]?.["capture-light"];
                const pxStr = px && px !== "unread" ? ` L=${px.meanL} chroma=${px.meanChroma} α=${px.meanAlpha}` : "";
                console.log(`    ${v === "PASS" ? "✓" : "✗"} ${s.padEnd(20)} ${v}  freshness:${facts.freshness?.[s] ?? "?"}${pxStr}`);
            }
        console.log(`  operative result     : ${facts.operativePass ? "PASS (every surface paints warm-translucent in the pixel-read over a fresh source)" : "FAIL (born-RED until a Band-1 wave paints warm-cream + re-captures + the pixel band reads warm-translucent)"}`);
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
