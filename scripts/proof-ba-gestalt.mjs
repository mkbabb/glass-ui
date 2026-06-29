#!/usr/bin/env node
// BG.W-PAINT-IS-THE-GATE — proof:ba-gestalt reads LIVE BG paint, DEFECT-LOCALIZING.
//
// The Stage-0 ground-freeze. BC.W-GESTALT-FIRST made this gate a PIXEL reader (G5
// luminance/chroma band + G7 auto-revoke + G8 no-terminal-reflect). BG re-points it
// to the BG tranche, PURGES the hardcoded surface set, and extends the decoder so a
// RED NAMES the failing region (the D5 top-bar, the D2 metallic field) instead of
// "the surface broke":
//   - RE-POINTED to docs/tranches/BG/audit/reflect/bg-gestalt-roster.md. The gate
//     reads LIVE BG paint; the roster + the 4.2.0 Metal ground-freeze captures land
//     via the NON-AUTHORING capture agent (the building agent never judges its own
//     paint — real-paint-protocol §3). Until they land the gate is born-RED (no
//     roster present → [ROSTER-PRESENT]); the SELF-TEST below is the device-free
//     proof the new clauses are load-bearing.
//   - G6 PURGED — the hardcoded REQUIRED_SURFACES list is GONE (a hand-maintained
//     per-tranche array is the exact close-class drift it tried to catch). DERIVED-
//     from-route-files completeness (surface-closure.mjs routeSeeds) is the next wave
//     (BG.W-GESTALT-ROSTER-RE-POINT).
//   - DEFECT-LOCALIZATION (new) — the expect band gains the `topDelta` axis (the OKLab
//     ΔE between a declared top-bar probe (tx=,ty=,tw=,th=) and the field probe — the
//     D5 aberrant-top-bar localization) + the `meanChroma<=<ceiling>` ceiling (the D2
//     metallic-vs-aurora over-saturation), and every failed predicate is TAGGED with
//     its localized defect (D5-TOP-BAR @ top-bar, D2-METALLIC @ field, D-GREY @ field,
//     …). The FIELD probe is declared away from content, so a high-chroma CONTENT
//     rainbow never trips the field ceiling (content-rainbow-no-false-RED).
//   - G5 (PIXEL band) — the gate reads the captured PNG at the FIELD probe + asserts
//     the warm-translucent band (NOT the grey oklab(0.695) slab — grey separates from
//     warm by CHROMA, not L). A hand-typed "PASS" is not sufficient.
//   - G7 (auto-revoke) — a drifted surface-hash AUTO-REVERTS the PASS to FAIL (the
//     all-PASS-re-shot-broken regression: a green capture replaced by a broken one
//     auto-reverts; the surface must be re-captured + re-pixel-read).
//   - G8 (no-terminal-reflect) — scans docs/tranches/BG/waves/*.md + .../PROGRESS*.md
//     for a wave DEFERRING its verdict to a terminal-reflect wave (the BB disease).
//     CONTEXT-AWARE (forensic-quote + RETIRE exemptions).
//
// PAINT/GESTALT split: the real-surface roster verdicts stay born-RED (the 4.2.0
// Metal ground); they flip GREEN ONLY when a paint wave lands warm-cream over a fresh
// source AND a NON-AUTHORING agent re-captures + pixel-reads inside the warm-glass
// band. The SELF-TEST fixtures are the proof the gate's logic is load-bearing; the
// real-surface arm staying born-RED is EXPECTED + CORRECT. There is NO terminal
// reflect wave — the close is the UNION of per-wave non-authoring verdicts.
//
// ONE hash leaf + ONE PNG decoder (BB.W-GESTALT-GATE2 + BC.W-GESTALT-FIRST + BG.W-
// PAINT-IS-THE-GATE): the pixel reader + the defect-localizing pngRegionDelta extend
// scripts/reflect-capture-verify.mjs; a second createHash/PNG-decoder outside the leaf
// is forbidden. The OKLab decompose lives in the leaf. The import.meta.url run-guard
// is preserved (importing the leaf never runs this gate).

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
    pngRegionDelta,
    regionStatsDelta,
} from "./reflect-capture-verify.mjs";
// BG.W-GESTALT-ROSTER-RE-POINT — the routeSeeds HARD-RED arm. The roster's `routes`
// cells are DERIVED-resolved against the real demo route files (`surface-closure.mjs`);
// a 2-segment `/cat/story` token whose SFC is absent on disk is a `[ROUTE-RESOLVES]`
// HARD-RED here. This is NOT a closure-emptiness guard (SHELL_SEED always makes the
// closure non-empty) — it is route RESOLUTION at the gate boundary.
import { routeSeeds } from "./lib/surface-closure.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:ba-gestalt";
// BG.W-PAINT-IS-THE-GATE re-points the close oracle to the BG tranche: the gate
// reads LIVE BG paint (the 4.2.0 Metal ground-freeze roster + captures land via the
// non-authoring capture agent per the real-paint protocol §3). The roster/per-surface
// records resolve under docs/tranches/BG/audit/reflect/.
const REFLECT_DIR = resolve(ROOT, "docs/tranches/BG/audit/reflect");
const ROSTER = resolve(REFLECT_DIR, "bg-gestalt-roster.md");
const WAVES_DIR = resolve(ROOT, "docs/tranches/BG/waves");
const TRANCHE_DIR = resolve(ROOT, "docs/tranches/BG");

// The whole-page-capture dimension floor (BB.W-GESTALT-GATE2 — preserved).
const MIN_CAPTURE_WIDTH = 320;
const MIN_CAPTURE_HEIGHT = 320;

// ── G6 PURGED (BG.W-PAINT-IS-THE-GATE) ──────────────────────────────────────────
// The HARDCODED `REQUIRED_SURFACES` completeness list is RETIRED. A hand-maintained
// per-tranche surface array is the exact close-class drift it was meant to catch — it
// went stale every tranche and a surface a wave painted but the array omitted sailed
// past. The DERIVED-from-route-files surface completeness (the routeSeeds closure over
// the real demo route leaf) is BG.W-GESTALT-ROSTER-RE-POINT's `surface-closure.mjs`.
// This wave reads the roster the gate is POINTED at + pixel-reads every declared
// surface; it does not assert a fixed surface set.

// ── BG.W-PAINT-IS-THE-GATE — the DEFECT-LOCALIZATION map ────────────────────────
// The decoder extension turns a RED from "the surface broke" into "the FAILING REGION
// is <region>, the defect is <D#>." A failed expect-band predicate is keyed (by its
// `key`+direction) to the defect class it localizes; the violation message NAMES it.
// The map mirrors docs/tranches/BG/DEFECT-LOCALIZATION-MAP.md (the human ledger). The
// `region` distinguishes the FIELD-probe (the aurora backdrop / glass plate) from the
// TOP-BAR probe — so a high-chroma CONTENT rainbow is never read against the FIELD
// chroma-ceiling (the field probe is declared away from content; D2 is a backdrop
// defect, not a palette demo).
const DEFECT_LOCALIZATION = {
    // D5 — the aberrant full-width top bar (it reads as a distinct slab divergent from
    // the field, instead of composing INTO it). Localized by topDelta = OKLab ΔE
    // between the top-bar region and the field region.
    topDelta: {
        defect: "D5-TOP-BAR",
        region: "top-bar",
        note: "the top region reads as a distinct slab divergent from the field (the aberrant full-width top bar) — it must compose INTO the field, not stack as a separate band",
    },
    // D2 — the metallic background (the gray→metallic over-correction). The field
    // OVER-saturates past the warm-aurora ceiling → a `meanChroma<=<ceiling>` failure.
    "meanChroma<=": {
        defect: "D2-METALLIC",
        region: "field",
        note: "the field over-saturates past the warm-aurora ceiling (the gray→metallic over-correction) — the backdrop must read warm-translucent AURORA glass, not a metallic sheen",
    },
    // D-grey — the warm-chroma floor (the oklab(0.695) grey slab). A `meanChroma>=`
    // floor failure: the field collapsed to neutral grey.
    "meanChroma>=": {
        defect: "D-GREY",
        region: "field",
        note: "the field drops below the warm-chroma floor (the oklab(0.695) grey slab) — it reads neutral grey, not warm-cream glass",
    },
    // D-cold-hue — a cold metallic/blue cast (negative warm-amber a/b). The D2 hue axis
    // the meanA/meanB exposure unlocks.
    meanB: {
        defect: "D2-COLD-HUE",
        region: "field",
        note: "the field hue is cold (the warm-amber b channel collapsed/inverted) — a metallic/blue cast, not the warm-amber identity",
    },
    meanA: {
        defect: "D2-COLD-HUE",
        region: "field",
        note: "the field hue is cold (the warm-amber a channel collapsed/inverted) — a metallic/blue cast, not the warm-amber identity",
    },
    // D-luma — the field luminance outside the mode's expect band (a too-dark void or a
    // blown-out plate).
    meanL: {
        defect: "D-LUMA",
        region: "field",
        note: "the field luminance is outside the mode's expect band (a too-dark void or a blown-out plate)",
    },
};

/**
 * Localize a failed predicate to its defect class. Keyed by `key` (with the `<=`
 * direction folded onto meanChroma so the ceiling [D2-metallic] and the floor
 * [D-grey] are distinguished). Returns null for an un-mapped key (no localization tag).
 * @param {{key:string, op?:string}} p
 * @returns {{defect:string, region:string, note:string}|null}
 */
function localizeFail(p) {
    if (p.key === "meanChroma")
        return p.op === "<=" || p.op === "<"
            ? DEFECT_LOCALIZATION["meanChroma<="]
            : DEFECT_LOCALIZATION["meanChroma>="];
    return DEFECT_LOCALIZATION[p.key] ?? null;
}

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

// ── The probe region + expect band parse (G5 + BG.W-PAINT-IS-THE-GATE) ───────────
// probe cell: `x=0.00,y=0.40,w=0.30,h=0.20` → the FIELD probe (the glass plate /
// aurora backdrop). An OPTIONAL second `tx=,ty=,tw=,th=` box declares the TOP-BAR
// probe (the D5 localization region); when present + the expect band carries a
// `topDelta` predicate, the gate feeds OKLab ΔE(top-bar, field) as `topDelta`.
// expect cell: `meanL=0.85..0.99;meanChroma>=0.02;meanChroma<=0.18;topDelta<=0.10`.
/** @returns {{field:{x:number,y:number,w:number,h:number}, topbar:{x:number,y:number,w:number,h:number}|null}|null} */
function parseProbe(cell) {
    const m = {};
    for (const part of cell.split(/[,;]/)) {
        const kv = part.trim().match(/^(t?[xywh])\s*=\s*([0-9.]+)$/);
        if (kv) m[kv[1]] = parseFloat(kv[2]);
    }
    const field = ["x", "y", "w", "h"].every((k) => Number.isFinite(m[k]))
        ? { x: m.x, y: m.y, w: m.w, h: m.h }
        : null;
    if (!field) return null;
    const topbar = ["tx", "ty", "tw", "th"].every((k) => Number.isFinite(m[k]))
        ? { x: m.tx, y: m.ty, w: m.tw, h: m.th }
        : null;
    return { field, topbar };
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
        // BG.W-PAINT-IS-THE-GATE — every fail string carries its localized defect tag
        // (D5-TOP-BAR @ top-bar, D2-METALLIC @ field, …), so a RED NAMES the region.
        const loc = localizeFail(p);
        const tag = loc ? ` [${loc.defect} @ ${loc.region}]` : "";
        if (!Number.isFinite(v)) {
            fails.push(`${p.key} unread${tag}`);
            continue;
        }
        if (p.lo !== undefined) {
            if (v < p.lo || v > p.hi)
                fails.push(`${p.key} ${v.toFixed(3)} ∉ [${p.lo},${p.hi}]${tag}`);
        } else {
            const ok =
                p.op === ">=" ? v >= p.val :
                p.op === "<=" ? v <= p.val :
                p.op === ">" ? v > p.val :
                v < p.val;
            if (!ok) fails.push(`${p.key} ${v.toFixed(3)} not ${p.op} ${p.val}${tag}`);
        }
    }
    return { ok: fails.length === 0, fails };
}

// ── G7 (auto-revoke) — the surface-hash freshness clause, RE-PURPOSED ────────────
// BB held freshness behind --strict-freshness (an opt-in NOTE on the bare arm). BC
// made auto-revoke the DEFAULT; BC keeps it (the real-paint-protocol §4 G7 default):
// a drifted surface-hash AUTO-REVERTS the verdict to FAIL (not a warning). The
// per-surface record docs/tranches/BG/audit/reflect/<surface>.md carries the
// <!-- surface-paths --> + <!-- surface-hash --> header.
/**
 * @param {string} surface
 * @returns {{state:"fresh"|"stale"|"no-header"|"no-record", reason?:string, recordPath:string}}
 */
function surfaceFreshness(surface) {
    const recordPath = resolve(REFLECT_DIR, `${surface}.md`);
    if (!existsSync(recordPath))
        return {
            state: "no-record",
            reason: `the per-surface record docs/tranches/BG/audit/reflect/${surface}.md is absent — the freshness header cannot be read`,
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
    /\b(RETIRE[DS]?|forbidden|mechanically forbidden|DECIDED\s*[—-]\s*RETIRE|never a (?:B[A-Z] )?carry|abolished|zero ["`]?rides?)\b/i;

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
                reason: `forward-deferral "${a[0]}" asserts this wave's π/verdict rides a terminal-reflect wave (the BB disease) — a BG verdict is mechanically derived at the wave's OWN close by the non-authoring judge; there is no terminal reflect wave to defer to`,
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
                reason: `staged/deferred gestalt verdict "${b[0]}" punts the verdict to a later wave — every BG verdict is mechanically derived at the wave's own close`,
            };
    }
    return null;
}

/** Recursively collect the *.md files under a dir that match the G8 scope. */
function g8ScopedFiles() {
    const files = [];
    // every docs/tranches/BG/waves/*.md
    if (existsSync(WAVES_DIR))
        for (const f of readdirSync(WAVES_DIR))
            if (f.endsWith(".md")) files.push(join(WAVES_DIR, f));
    // every docs/tranches/BG/**/PROGRESS*.md
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

    const rosterSource = readFileSync(ROSTER, "utf8");
    const parsed = parseRoster(rosterSource);
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

    // ── COMPLETENESS PURGED (BG.W-PAINT-IS-THE-GATE) ─────────────────────────────
    // No hardcoded REQUIRED_SURFACES set. This gate reads + pixel-reads whatever the
    // BG roster declares.
    const present = new Set(data.map((r) => r.surface));
    facts.surfaces = [...present];

    // ── [ROUTE-RESOLVES] — the routeSeeds HARD-RED arm (BG.W-GESTALT-ROSTER-RE-POINT)
    // The roster's surface-paths are DERIVED, not hand-listed: every `routes` cell's
    // 2-segment `/cat/story` token must resolve to a real demo SFC. A token whose SFC
    // is ABSENT on disk is a HARD-RED — a typo'd story slug silently vanishing from the
    // watched surface is the exact class this closes. A 1-segment `/cat` resolves the
    // generic SectionLanding; free prose (the shell / cross-repo rows) yields no token.
    const rs = routeSeeds(rosterSource, { root: ROOT });
    facts.routeTokens = rs.tokens.length;
    facts.routeSeeds = rs.seeds.length;
    facts.routeHardReds = rs.hardReds;
    for (const hr of rs.hardReds)
        violations.push(
            `[ROUTE-RESOLVES] the roster declares route ${hr.token} but its demo SFC ${hr.expected} does NOT exist on disk — a typo'd 2-segment story slug cannot silently vanish from the watched surface (surface-closure.mjs routeSeeds); fix the slug or land the SFC`,
        );

    // ── per-row checks ──────────────────────────────────────────────────────────
    const surfaceVerdicts = {};
    const captureDimensions = {};
    const brokenCaptures = [];
    const pixelStats = {}; // G5: surface → {light, dark} stats or "unread"
    const freshness = {}; // G7: surface → fresh | stale | no-header | no-record
    let allPass = data.length > 0;
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
        const wantsTopDelta = expect.some((p) => p.key === "topDelta");
        if (verdict === "PASS") {
            if (!probe) {
                violations.push(
                    `[G5-PIXEL] surface "${surface}" PASS but the probe cell "${row.probe}" is not a fractional box (x=,y=,w=,h=) — the pixel band cannot be read`,
                );
                allPass = false;
            }
            if (!expect.length) {
                violations.push(
                    `[G5-PIXEL] surface "${surface}" PASS but the expect cell "${row.expect}" declares no band (meanL=lo..hi; meanChroma>=v; meanChroma<=v; topDelta<=v)`,
                );
                allPass = false;
            }
            // BG.W-PAINT-IS-THE-GATE — a topDelta predicate demands a top-bar probe
            // region (tx=,ty=,tw=,th=) to localize the D5 defect against.
            if (wantsTopDelta && probe && !probe.topbar) {
                violations.push(
                    `[G5-PIXEL/D5-TOP-BAR] surface "${surface}" PASS declares a topDelta predicate but the probe cell "${row.probe}" carries no top-bar region (tx=,ty=,tw=,th=) — the D5 top-bar/field delta cannot be measured`,
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
                // G5: read the pixels at the FIELD probe region + assert the expect band.
                if (probe && expect.length) {
                    const abs = resolve(ROOT, p);
                    const stats = pngRegionStats(abs, probe.field);
                    pixelStats[surface] = pixelStats[surface] || {};
                    if (!stats) {
                        pixelStats[surface][col] = "unread";
                        violations.push(
                            `[G5-PIXEL] surface "${surface}" ${col} "${p}": the probe region could not be pixel-read (undecodable PNG colour-type or empty region) — the gestalt cannot verify the warm-translucent band`,
                        );
                        allPass = false;
                        continue;
                    }
                    // BG.W-PAINT-IS-THE-GATE — inject the D5 top-bar/field OKLab ΔE as
                    // the `topDelta` axis when the row declares both a top-bar region and
                    // a topDelta predicate (the metallic/grey/luma axes read the field
                    // stats directly).
                    if (wantsTopDelta && probe.topbar) {
                        const delta = pngRegionDelta(abs, probe.topbar, probe.field);
                        if (delta) stats.topDelta = delta.dE;
                    }
                    pixelStats[surface][col] = {
                        meanL: +stats.meanL.toFixed(4),
                        meanChroma: +stats.meanChroma.toFixed(4),
                        meanAlpha: +stats.meanAlpha.toFixed(4),
                        ...(Number.isFinite(stats.topDelta)
                            ? { topDelta: +stats.topDelta.toFixed(4) }
                            : {}),
                    };
                    const band = evalBand(stats, expect);
                    if (!band.ok) {
                        violations.push(
                            `[G5-PIXEL] surface "${surface}" ${col} reads ${band.fails.join(", ")} — OUTSIDE the warm-translucent expect band [${row.expect}]; a hand-typed PASS over a grey/metallic/broken capture is no longer sufficient (the localized pixel stats are the operative verdict)`,
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
                `[OPERATIVE] ${openFails} of ${data.length} roster surfaces hold an open FAIL verdict — the gestalt acceptance bar is not met (each flips to PASS ONLY when a paint wave lands warm-cream over a fresh source AND a NON-AUTHORING agent re-captures + pixel-reads the surface inside the warm-glass band; the building agent never flips its own row)`,
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
            // BG.W-PAINT-IS-THE-GATE — D2 metallic field ceiling RED. A 4.2.0-grade
            // metallic field (meanChroma 0.30) BREACHES the warm-aurora ceiling
            // (meanChroma<=0.18) → flags AND localizes D2-METALLIC @ field.
            label: "D2-METALLIC field-ceiling — a metallic field (meanChroma 0.30) breaches meanChroma<=0.18 and localizes D2-METALLIC @ field",
            flag: (() => {
                const band = parseExpect("meanChroma>=0.02;meanChroma<=0.18");
                const metallic = evalBand({ meanChroma: 0.3 }, band);
                return !metallic.ok && metallic.fails.some((f) => f.includes("D2-METALLIC @ field"))
                    ? "flagged"
                    : null;
            })(),
        },
        {
            // The content-rainbow-does-not-false-RED inverse witness: the FIELD probe
            // reads a warm-translucent field (meanChroma 0.05) UNDER the ceiling — even
            // though a high-chroma CONTENT rainbow elsewhere reads 0.30, the ceiling is
            // a FIELD-region predicate, never evaluated against content (the field probe
            // is declared away from content). The warm field must NOT flag.
            label: "content-rainbow-no-false-RED — a warm field (meanChroma 0.05) passes the field ceiling (the rainbow content at a separate region never trips it)",
            flag: (() => {
                const band = parseExpect("meanChroma>=0.02;meanChroma<=0.18");
                const warmField = evalBand({ meanChroma: 0.05 }, band);
                return warmField.ok ? "flagged" : null;
            })(),
        },
        {
            // D5 top-bar topDelta RED — a divergent top bar (OKLab ΔE 0.30 vs the field)
            // breaches topDelta<=0.10 → flags AND localizes D5-TOP-BAR @ top-bar. The ΔE
            // is computed by the SAME regionStatsDelta math the on-disk pngRegionDelta
            // wraps (the pure-function bite proves the decoder primitive end-to-end).
            label: "D5-TOP-BAR topDelta — a divergent top bar (regionStatsDelta dE ≈ 0.30) breaches topDelta<=0.10 and localizes D5-TOP-BAR @ top-bar",
            flag: (() => {
                const topbar = { meanL: 0.4, meanChroma: 0.02, meanA: -0.04, meanB: -0.02 };
                const field = { meanL: 0.85, meanChroma: 0.05, meanA: 0.02, meanB: 0.06 };
                const dE = regionStatsDelta(topbar, field).dE;
                const band = parseExpect("topDelta<=0.10");
                const out = evalBand({ topDelta: dE }, band);
                return dE > 0.1 &&
                    !out.ok &&
                    out.fails.some((f) => f.includes("D5-TOP-BAR @ top-bar"))
                    ? "flagged"
                    : null;
            })(),
        },
        {
            // D5 clean inverse witness — a top bar composed INTO the field (ΔE ≈ 0.03)
            // passes topDelta<=0.10 (must NOT flag).
            label: "D5-TOP-BAR clean — a top bar matching the field (regionStatsDelta dE ≈ 0.03) passes topDelta<=0.10",
            flag: (() => {
                const a = { meanL: 0.84, meanChroma: 0.05, meanA: 0.02, meanB: 0.06 };
                const b = { meanL: 0.85, meanChroma: 0.05, meanA: 0.03, meanB: 0.07 };
                const dE = regionStatsDelta(a, b).dE;
                const band = parseExpect("topDelta<=0.10");
                return dE <= 0.1 && evalBand({ topDelta: dE }, band).ok ? "flagged" : null;
            })(),
        },
        {
            // The topDelta-without-top-bar-region bite — a topbar-less probe parses to
            // {field, topbar:null}; the gate refuses to greenwash a topDelta predicate it
            // cannot measure (the wantsTopDelta && !probe.topbar guard).
            label: "D5 probe-discipline — a probe with no top-bar region (tx=,ty=,tw=,th=) parses topbar:null (the gate refuses an un-measurable topDelta)",
            flag: (() => {
                const p = parseProbe("x=0.2,y=0.3,w=0.3,h=0.4");
                return p && p.field && p.topbar === null ? "flagged" : null;
            })(),
        },
        {
            // The re-shot-broken regression bite — an all-PASS roster whose capture is
            // RE-SHOT broken (a previously-warm field now reads metallic) AUTO-RED's via
            // the SAME field-ceiling band; a green capture cannot be silently replaced by
            // a broken one and ride the stale PASS.
            label: "re-shot-broken — a re-captured field that drifted metallic (meanChroma 0.30) re-RED's the field ceiling (the all-PASS-re-shot-broken regression)",
            flag: (() => {
                const band = parseExpect("meanChroma>=0.02;meanChroma<=0.18");
                return !evalBand({ meanChroma: 0.3 }, band).ok ? "flagged" : null;
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
        {
            // BG.W-GESTALT-ROSTER-RE-POINT — the routeSeeds HARD-RED RED-witness: a
            // 2-segment `/dock/typoo` route token whose `demo/stories/dock/typoo.vue` is
            // ABSENT on disk produces a HARD-RED (the `[ROUTE-RESOLVES]` arm flags it).
            label: "[ROUTE-RESOLVES] HARD-RED — a routes cell `/dock/typoo` (no demo/stories/dock/typoo.vue) produces a route HARD-RED",
            flag: (() => {
                const synthetic =
                    "| surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |\n" +
                    "|---|---|---|---|---|---|---|---|\n" +
                    "| t | /dock/typoo | a | b | x=0,y=0,w=1,h=1 | meanL=0..1 | FAIL | g |\n";
                const r = routeSeeds(synthetic, { root: ROOT });
                return r.hardReds.some((h) => h.token === "/dock/typoo") ? "flagged" : null;
            })(),
        },
        {
            // The GREEN-witness inverse: free prose ("the shell BottomDock") in a routes
            // cell carries no `/cat/story` slash-pattern, so routeSeeds produces ZERO
            // tokens + ZERO HARD-REDs — a prose mention never false-REDs the route arm.
            label: "[ROUTE-RESOLVES] prose-GREEN — `the shell BottomDock` (free prose, no /cat/story) produces no route token + no HARD-RED",
            flag: (() => {
                const synthetic =
                    "| surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |\n" +
                    "|---|---|---|---|---|---|---|---|\n" +
                    "| p | the shell BottomDock | a | b | x=0,y=0,w=1,h=1 | meanL=0..1 | FAIL | g |\n";
                const r = routeSeeds(synthetic, { root: ROOT });
                return r.tokens.length === 0 && r.hardReds.length === 0 ? "flagged" : null;
            })(),
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

    console.log("proof:ba-gestalt — the PIXEL-reading, ci-blocking gestalt close oracle (BG.W-PAINT-IS-THE-GATE; reads LIVE BG paint, defect-localizing)");
    console.log(`  roster ledger        : ${facts.rosterPresent ? relative(ROOT, ROSTER) : "ABSENT (born-RED ground-freeze — the BG roster + Metal captures land via the non-authoring capture agent)"}`);
    console.log(`  self-test (bite proof): OK — ${facts.selfTestChecks ?? 0} synthetic checks flagged (G5 grey-RED + warm-GREEN, D2-METALLIC ceiling, content-rainbow-no-false-RED, D5-TOP-BAR topDelta RED/clean + probe-discipline + re-shot-broken, G7 auto-revoke, G8 negation-pair i/i′/ii/iii/iv, ROUTE-RESOLVES /dock/typoo-RED + prose-GREEN)`);
    console.log(`  G8 no-terminal-reflect: ${facts.g8FilesScanned ?? 0} files scanned — ${(facts.g8Hits ?? []).length ? (facts.g8Hits.length + " DEFERRAL HIT(S)") : "clean (the corpus RETIRES the deferral)"}`);
    if (facts.rosterPresent) {
        console.log(`  surfaces present     : ${(facts.surfaces ?? []).length} (${(facts.surfaces ?? []).join(", ")})`);
        console.log(`  route-resolution arm : ${facts.routeTokens ?? 0} tokens → ${facts.routeSeeds ?? 0} seeds — ${(facts.routeHardReds ?? []).length ? (facts.routeHardReds.length + " HARD-RED(S): " + facts.routeHardReds.map((h) => h.token).join(", ")) : "GREEN (every /cat/story route resolves to a real demo SFC)"}`);
        console.log(`  verdicts             : ${facts.passCount ?? 0} PASS / ${facts.failCount ?? 0} FAIL`);
        if (facts.verdicts)
            for (const [s, v] of Object.entries(facts.verdicts)) {
                const px = facts.pixelStats?.[s]?.["capture-light"];
                const pxStr = px && px !== "unread"
                    ? ` L=${px.meanL} chroma=${px.meanChroma} α=${px.meanAlpha}${px.topDelta !== undefined ? ` topΔ=${px.topDelta}` : ""}`
                    : "";
                console.log(`    ${v === "PASS" ? "✓" : "✗"} ${s.padEnd(20)} ${v}  freshness:${facts.freshness?.[s] ?? "?"}${pxStr}`);
            }
        console.log(`  operative result     : ${facts.operativePass ? "PASS (every surface paints warm-translucent in the pixel-read over a fresh source, judged by a non-authoring agent)" : "FAIL (born-RED until a paint wave lands warm-cream + a non-authoring agent re-captures + the localized pixel band reads warm-translucent)"}`);
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
