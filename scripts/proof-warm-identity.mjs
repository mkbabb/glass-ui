#!/usr/bin/env node
// BG.W-COMPOSITED-GESTALT-GATE — proof:warm-identity, the composited-WHOLE paint battery.
//
// GA-2 · measure the whole, not the part. BC's paint gate (proof:ba-gestalt G5) reads a
// MEAN over a probe box — it catches an isolated-surface grey slab but a warm token
// composited over an achromatic page still reads grey to the EYE while the MEAN passes
// (GF1: BD's greenfield had to re-diagnose by hand a shipped Button rest fill at oklab
// chroma 0.0138 — "NEAR-GRAY" — over a flat page). Change WHAT the probe samples, not the
// kernel: a route's composited region is read by the DOMINANT-HUE HISTOGRAM (the
// chroma-weighted hue family) — a flat achromatic field has NO dominant hue (NEUTRAL, not
// warm), a cerulean field's dominant family is COLD (the GB-5 field-warmth catch), and a
// two-peaked warm+cold field's warmFraction drops below the floor even where its mean is
// neutral. This is the SHARPER twin of ba-gestalt's mean-L box.
//
// THE ARCHITECTURE (the cardinal-lesson split, the proof:visual-runner + proof:ba-gestalt
// precedent):
//   - The DEVICE-FREE arm (ci + release) is this gate's PASS/FAIL: the self-test bites
//     (the born-RED synthetic gray/cerulean/metallic routes MUST flag), the route-
//     resolution soundness (surface-closure.mjs routeSeeds hard-reds → RED), the
//     ANTI-EVASION enforcement (a roster row DECLARED PASS whose captured composite does
//     NOT read warm — or whose capture is missing/broken — REDs, the G5 anti-evasion), and
//     the both-engines wiring (every enrolled surface reads chromium + the derived WebKit
//     capture in BOTH modes). This arm is GREEN on the BUILD edit (the kernel + wiring
//     present, no PASS-over-not-warm), so per-push CI stays green mid-tranche.
//   - The OPERATIVE ALL-WARM state is a REPORTED born-RED BASELINE (0/N warm on the 4.2.0
//     Metal ground — the GROUND_EVIDENCE arm reads the on-disk 4.2.0 captures and confirms
//     they read COLD/METALLIC, the disease the greenfield found by hand). Each BG paint
//     wave flips its OWN roster row FAIL→PASS at its OWN close by capturing a fresh warm
//     LIVE :5199 set (both engines, both modes) — and the anti-evasion above then ENFORCES
//     the warm pixel-read. A NON-AUTHORING agent judges the paint (the building agent never
//     flips its own row). The all-FAIL→all-PASS gate on the CUT is the roster verdicts +
//     ba-gestalt's [OPERATIVE] clause; this battery is the PRIMARY dominant-hue KERNEL over
//     that same enrolled surface set. ba-gestalt's roster becomes ONE enrolled surface set
//     in this battery, NOT the sole oracle; its vacuous mean-L box → this dominant-hue
//     kernel.
//
// ONE colour source + ONE PNG decoder + ONE roster parse: the histogram + hue-family
// classifier extend scripts/reflect-capture-verify.mjs (the OKLab decompose + IDAT
// inflate home); the warm-identity band verdict lives in scripts/lib/paint-arm.mjs (the
// probe home the spec names); the roster parse + probe parse are IMPORTED from
// proof-ba-gestalt.mjs (no second markdown-table reader). The import.meta.url run-guards
// keep importing any of those from spinning the sibling gate.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative, basename, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import {
    isRealPng,
    pngDimensions,
    pngRegionHueHistogram,
    pngRegionHueDivergence,
    hueDivergent,
    pngRegionDelta,
    pngRegionStats,
    regionStatsDelta,
    hueFamily,
    dominantHue,
} from "./reflect-capture-verify.mjs";
import { warmIdentityVerdict } from "./lib/paint-arm.mjs";
import { routeSeeds } from "./lib/surface-closure.mjs";
import { parseRoster, parseProbe, COLUMNS } from "./proof-ba-gestalt.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:warm-identity";
const REFLECT_DIR = resolve(ROOT, "docs/tranches/BG/audit/reflect");
const ROSTER = resolve(REFLECT_DIR, "bg-gestalt-roster.md");

// ── The CROSS-PAGE audit arm (BG.W-PAGE-COMPONENT-AUDIT, 17.6) ────────────────────
// 17.6 EXTENDS this battery with the 480-capture cross-page harmonized-whole read: a
// per-category CONVERGENCE roster (the 7 un-converged Pass-E categories + the C2-SENTINEL
// spot-check, GA-10 / F7.4) DISTINCT from the 10-surface pinned bg-gestalt-roster. The
// device-free arm reads the convergence STRUCTURE (routes resolve, categories + sentinels
// enrolled, the 480-capture instrument on disk, anti-evasion armed); the operative
// all-converged verdict is a REPORTED born-RED baseline the LOCAL late-sweep + the
// non-authoring judge flip (the two-tier model, COHERENCE FOLD G7 L8 — a 480-to-ci
// promotion would re-create the §2.A1 terminal-reflect chokepoint).
const PAGE_AUDIT_ROSTER = resolve(REFLECT_DIR, "bg-page-audit-roster.md");
const COHERENCE_SPEC = resolve(ROOT, "tests-visual/coherence-congruence.spec.ts");
const PAGE_AUDIT_COLUMNS = Object.freeze([
    "category",
    "route",
    "capture-light",
    "capture-dark",
    "probe",
    "expect",
    "verdict",
    "notes",
]);
// The 7 un-converged Pass-E categories (GA-10 / F7.4) — each owes a convergence row.
const PASS_E_CATEGORIES = Object.freeze([
    "display",
    "containers",
    "data",
    "feedback",
    "navigation",
    "compositions",
    "motion",
]);
// The C2-SENTINEL (COHERENCE FOLD G7 L8) mid-tranche spot-check routes — the 4
// no-roster-band representatives (forms/inputs · compositions/settings ·
// containers/sheet · data/metric-stack). The compositions representative moved from
// the retired /compositions/math-paper (BI.W-MATH-PAPER-REMOVE, UF-K3) to
// /compositions/settings — the surviving warm-cream grid-ground composition.
const C2_SENTINEL_ROUTES = Object.freeze([
    "/forms/inputs",
    "/compositions/settings",
    "/containers/sheet",
    "/data/metric-stack",
]);
// A verdict that DECLARES cross-page convergence — the anti-evasion enforces a warm
// dual-engine capture behind it (a hand-typed CONVERGED over a missing/not-warm composite
// is the close-class lie).
const CONVERGED_VERDICTS = new Set(["PASS", "CONVERGED"]);

// The whole-page capture floor (mirrors proof:ba-gestalt; a degenerate crop never proves a
// route navigated + rendered).
const MIN_CAPTURE_WIDTH = 320;
const MIN_CAPTURE_HEIGHT = 320;

// The warm-identity band. warmFractionFloor 0.55 (the chroma-weighted warm fraction must
// dominate); chromaCeiling 0.30 (the coarse metallic/over-saturation bound — the finer
// per-surface ceiling lives in ba-gestalt's expect cells). The delta ceilings localize the
// edge-cast (a cold rim / clip artifact) and the D5 top bar — but F8.2 RE-CALIBRATES those
// two PART probes onto the dominant-hue divergence: the mean-L ΔE is measured ONLY when the
// region reads a DIVERGENT COLOURED slab (readCapture reads pngRegionHueDivergence first), so
// an achromatic page-top MARGIN or a warm-consistent edge no longer FALSE-trips the ceiling.
const WARM_BAND = Object.freeze({
    warmFractionFloor: 0.55,
    chromaCeiling: 0.3,
    edgeCastCeiling: 0.16,
    topBarCeiling: 0.14,
    cornerClipFloor: 0.04,
});

// The 4.2.0 Metal ground-freeze captures on disk (the born-RED EVIDENCE arm — these read
// COLD/METALLIC by the dominant-hue kernel, the disease the greenfield re-diagnosed by
// hand). Not the roster's declared per-row paths (those land warm at flip time); these are
// the frozen 4.2.0 desktop captures the BG.W-PAINT-IS-THE-GATE wave landed.
const GROUND_EVIDENCE = Object.freeze([
    "dock-overview-light-desktop-full.png",
    "dock-overview-dark-desktop-full.png",
    "glass-material-light-desktop-full.png",
    "glass-material-dark-desktop-full.png",
    "shell-aurora-field-light-desktop-full.png",
    "shell-aurora-field-dark-desktop-full.png",
]);
// A generic central FIELD probe for the ground evidence read (the frozen captures carry no
// per-surface probe; the central box samples the backdrop/glass field, away from chrome).
const GROUND_FIELD = Object.freeze({ x: 0.2, y: 0.3, w: 0.5, h: 0.4 });

/**
 * Derive the WebKit (safari) capture path from the Chromium (roster) path — the both-
 * engines wiring. `<surface>-<mode>-desktop-full.png` → `<surface>-safari-<mode>-desktop-
 * full.png`. The non-authoring capture agent fills BOTH at flip time; on HEAD both are
 * absent (born-RED). PURE (a string transform) so a self-test exercises it with no disk.
 * @param {string} repoRelPath
 * @returns {string}
 */
export function webkitCapturePath(repoRelPath) {
    const dir = dirname(repoRelPath);
    const bn = basename(repoRelPath);
    const m = bn.match(/^(.*?)(-(?:light|dark)-desktop-full\.png)$/);
    if (!m) return join(dir, bn.replace(/(\.png)$/, "-safari$1"));
    return join(dir, `${m[1]}-safari${m[2]}`);
}

// The derived edge + corner regions (the widened-predicate probes). Edge = the field's own
// leftmost sliver (an edge cast WITHIN the field reads as a large edge↔field ΔE). Corner =
// the extreme top-left viewport corner (a rounded-clip black notch reads L≈0).
function edgeRegion(field) {
    return { x: field.x, y: field.y, w: Math.min(0.02, field.w), h: field.h };
}
const CORNER_REGION = Object.freeze({ x: 0, y: 0, w: 0.04, h: 0.04 });

/**
 * Read ONE capture's composited stats via the dominant-hue kernel + the widened-predicate
 * probes. Returns null when the capture is absent OR undecodable (the caller treats null
 * as a not-warm/degenerate read). `topbar` is the roster's optional D5 top-bar region.
 * @param {string} repoRelPath
 * @param {{x:number,y:number,w:number,h:number}} field
 * @param {{x:number,y:number,w:number,h:number}|null} topbar
 * @returns {{stats:object, verdict:{pass:boolean,reasons:string[],predicates:object}, dims:{w:number,h:number}|null}|null}
 */
function readCapture(repoRelPath, field, topbar) {
    const abs = resolve(ROOT, repoRelPath);
    if (!existsSync(abs)) return null;
    const hist = pngRegionHueHistogram(abs, field);
    if (!hist) return { stats: null, verdict: warmIdentityVerdict(null, WARM_BAND), dims: null };
    const real = isRealPng(abs);
    const dims = pngDimensions(abs);
    const captureReal =
        real &&
        !!dims &&
        dims.w >= MIN_CAPTURE_WIDTH &&
        dims.h >= MIN_CAPTURE_HEIGHT;
    /** @type {any} */
    const stats = {
        dominantFamily: hist.dominantFamily,
        warm: hist.warm,
        warmFraction: hist.warmFraction,
        meanChroma: hist.meanChroma,
        meanL: hist.meanL,
        captureReal,
    };
    // The PART-probe recalibration (F8.2 — "mean-L box → dominant-hue histogram over real
    // route REGION"). Read the edge / top-bar region's DOMINANT HUE FIRST: a NEUTRAL part (an
    // achromatic page margin — the false-trip the raw mean-L box produced on the browser
    // page-top margin) or a part reading the SAME warm family as the field is CONSISTENT — no
    // aberrant slab, the ΔE box is NOT measured. Only a genuinely DIVERGENT COLOURED part (a
    // cold/magenta aberrant slab, the real D5 defect) feeds the mean-L ΔE the predicate reads.
    const edge = edgeRegion(field);
    const edgeDiv = pngRegionHueDivergence(abs, edge, field);
    stats.edgeDivergent = !!edgeDiv?.divergent;
    stats.edgeFamily = edgeDiv?.partFamily ?? "?";
    if (stats.edgeDivergent) {
        const edgeDelta = pngRegionDelta(abs, edge, field);
        if (edgeDelta) stats.edgeDelta = edgeDelta.dE;
    }
    if (topbar) {
        const topDiv = pngRegionHueDivergence(abs, topbar, field);
        stats.topDivergent = !!topDiv?.divergent;
        stats.topFamily = topDiv?.partFamily ?? "?";
        if (stats.topDivergent) {
            const td = pngRegionDelta(abs, topbar, field);
            if (td) stats.topDelta = td.dE;
        }
    }
    const corner = pngRegionStats(abs, CORNER_REGION);
    if (corner) stats.cornerL = corner.meanL;
    return { stats, verdict: warmIdentityVerdict(stats, WARM_BAND), dims };
}

/**
 * Parse the CROSS-PAGE audit roster (its own `category`-headed 8-column schema, DISTINCT
 * from the `surface`-headed bg-gestalt roster `parseRoster` reads). Strips HTML comments,
 * drops the header + separator. Returns data rows keyed by PAGE_AUDIT_COLUMNS (+ the
 * `__header`/`__malformed` sentinels the schema/well-formed arms read).
 * @param {string} src
 */
export function parsePageAuditRoster(src) {
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
        if (cells[0] === "category") {
            inTable = true;
            rows.push({ __header: cells });
            continue;
        }
        if (!inTable) continue;
        if (cells.length < PAGE_AUDIT_COLUMNS.length) {
            rows.push({ __malformed: cells });
            continue;
        }
        const row = {};
        PAGE_AUDIT_COLUMNS.forEach((col, i) => (row[col] = cells[i]));
        rows.push(row);
    }
    return rows;
}

/**
 * The CROSS-PAGE convergence arm (17.6). Takes the roster SOURCE (so a self-test bite
 * exercises it with a synthetic string, no disk). Verifies the convergence STRUCTURE —
 * schema, the 7 Pass-E categories + the 4 C2-SENTINEL routes enrolled, every route
 * resolves on disk (routeSeeds HARD-RED), the 480-capture instrument present, and the
 * ANTI-EVASION (a CONVERGED row over a missing/not-warm composite REDs). A FAIL/PENDING
 * row owes NO capture yet (the born-RED baseline); only a CONVERGED verdict pulls the
 * pixel-read. `crossPageConvergedBaseline` is a REPORTED fact, not a device-free violation.
 * @param {string} src
 * @returns {{facts:object, violations:string[]}}
 */
export function crossPageAudit(src) {
    const violations = [];
    const facts = {};
    const parsed = parsePageAuditRoster(src);
    const header = parsed.find((r) => r.__header)?.__header;
    const malformed = parsed.filter((r) => r.__malformed);
    const data = parsed.filter((r) => !r.__header && !r.__malformed);
    facts.pageAuditRows = data.length;

    const headerOk = header && PAGE_AUDIT_COLUMNS.every((c, i) => header[i] === c);
    if (!headerOk)
        violations.push(
            `[PAGE-AUDIT-COLUMN-SCHEMA] the page-audit roster header is not the canonical column set [${PAGE_AUDIT_COLUMNS.join(", ")}] (got ${JSON.stringify(header)})`,
        );
    for (const m of malformed)
        violations.push(
            `[PAGE-AUDIT-WELL-FORMED] a page-audit row has fewer than ${PAGE_AUDIT_COLUMNS.length} cells: ${JSON.stringify(m.__malformed)}`,
        );

    // ── the 7 Pass-E categories each owe a convergence row (GA-10 / F7.4) ─────────
    const declaredCategories = new Set(data.map((r) => r.category));
    const missingCategories = PASS_E_CATEGORIES.filter((c) => !declaredCategories.has(c));
    facts.passECategoriesEnrolled = `${PASS_E_CATEGORIES.length - missingCategories.length}/${PASS_E_CATEGORIES.length}`;
    for (const c of missingCategories)
        violations.push(
            `[PAGE-AUDIT-CATEGORY-COMPLETE] the un-converged Pass-E category "${c}" (GA-10 / F7.4) has NO convergence row — the 7 categories (${PASS_E_CATEGORIES.join(", ")}) each owe a representative route`,
        );

    // ── the 4 C2-SENTINEL routes each enrolled (COHERENCE FOLD G7 L8) ─────────────
    const declaredRoutes = new Set(data.map((r) => r.route));
    const missingSentinels = C2_SENTINEL_ROUTES.filter((r) => !declaredRoutes.has(r));
    facts.sentinelRoutesEnrolled = `${C2_SENTINEL_ROUTES.length - missingSentinels.length}/${C2_SENTINEL_ROUTES.length}`;
    for (const r of missingSentinels)
        violations.push(
            `[PAGE-AUDIT-SENTINEL-COMPLETE] the C2-SENTINEL spot-check route "${r}" (COHERENCE FOLD G7 L8) is not enrolled — the 4 no-roster-band representatives are the mid-tranche sentinel`,
        );

    // ── route-resolution soundness (surface-closure routeSeeds HARD-RED) ──────────
    const rs = routeSeeds(src, { root: ROOT });
    facts.pageAuditRouteTokens = rs.tokens.length;
    for (const hr of rs.hardReds)
        violations.push(
            `[PAGE-AUDIT-ROUTE-RESOLVES] the page-audit roster declares route ${hr.token} but its demo SFC ${hr.expected} does NOT exist on disk — a typo'd cross-page slug cannot silently vanish from the audited set`,
        );

    // ── anti-evasion + the convergence baseline ──────────────────────────────────
    let converged = 0;
    const perRow = [];
    for (const row of data) {
        const verdict = (row.verdict ?? "").toUpperCase();
        const isConverged = CONVERGED_VERDICTS.has(verdict);
        if (isConverged) converged++;
        const probe = parseProbe(row.probe ?? "");
        if (!probe) {
            violations.push(
                `[PAGE-AUDIT-PROBE] row "${row.category} ${row.route}" has no fractional FIELD probe (x=,y=,w=,h=) in "${row.probe}"`,
            );
            continue;
        }
        if (isConverged) {
            // The both-engines matrix: chromium (roster path) + webkit (derived) × {light,dark}.
            const captures = [
                { engine: "chromium", mode: "light", path: row["capture-light"] },
                { engine: "chromium", mode: "dark", path: row["capture-dark"] },
                { engine: "webkit", mode: "light", path: webkitCapturePath(row["capture-light"]) },
                { engine: "webkit", mode: "dark", path: webkitCapturePath(row["capture-dark"]) },
            ];
            for (const cap of captures) {
                const read = readCapture(cap.path, probe.field, probe.topbar);
                if (!read) {
                    violations.push(
                        `[PAGE-AUDIT-ANTI-EVASION] "${row.category} ${row.route}" verdict ${verdict} but the ${cap.engine} ${cap.mode} capture "${cap.path}" is ABSENT — a CONVERGED row demands a real warm composite in BOTH modes on BOTH engines (chromium + WebKit)`,
                    );
                    continue;
                }
                if (!read.verdict.pass)
                    violations.push(
                        `[PAGE-AUDIT-ANTI-EVASION] "${row.category} ${row.route}" verdict ${verdict} but the ${cap.engine} ${cap.mode} composite "${cap.path}" reads ${read.verdict.reasons.join(", ")} — OUTSIDE the warm-identity band; the dominant-hue pixel-read is the operative verdict`,
                    );
            }
        }
        perRow.push({ category: row.category, route: row.route, verdict });
    }
    facts.crossPageConvergence = perRow;
    facts.crossPageConvergedBaseline = `${converged}/${data.length} cross-page rows CONVERGED (born-RED until the non-authoring late-sweep judge flips each on a fresh warm dual-engine capture)`;

    return { facts, violations };
}

function detect() {
    const violations = [];
    const facts = {};

    // ── the roster (the enrolled surface set) ────────────────────────────────────
    if (!existsSync(ROSTER)) {
        violations.push(
            `[ROSTER-PRESENT] the enrolled-surface roster is absent at ${relative(ROOT, ROSTER)} — proof:warm-identity has no route set to read`,
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
    facts.enrolledSurfaces = data.length;

    const headerOk = header && COLUMNS.every((c, i) => header[i] === c);
    if (!headerOk)
        violations.push(
            `[COLUMN-SCHEMA] the roster header is not the canonical column set [${COLUMNS.join(", ")}] (got ${JSON.stringify(header)})`,
        );
    for (const m of malformed)
        violations.push(
            `[WELL-FORMED] a roster row has fewer than ${COLUMNS.length} cells: ${JSON.stringify(m.__malformed)}`,
        );

    // ── route-resolution soundness (surface-closure.mjs routeSeeds hard-reds) ─────
    const rs = routeSeeds(rosterSource, { root: ROOT });
    facts.routeTokens = rs.tokens.length;
    facts.routeHardReds = rs.hardReds;
    for (const hr of rs.hardReds)
        violations.push(
            `[ROUTE-RESOLVES] the roster declares route ${hr.token} but its demo SFC ${hr.expected} does NOT exist on disk — a typo'd story slug cannot silently vanish from the watched surface (surface-closure.mjs routeSeeds)`,
        );

    // ── per-surface both-modes both-engines dominant-hue read ─────────────────────
    const surfaceReads = {};
    let warmComposites = 0;
    let readableComposites = 0;
    for (const row of data) {
        const { surface, verdict } = row;
        const probe = parseProbe(row.probe ?? "");
        if (!probe) {
            violations.push(
                `[PROBE] surface "${surface}" has no fractional FIELD probe (x=,y=,w=,h=) in "${row.probe}" — the composited region cannot be read`,
            );
            continue;
        }
        const chromiumLight = row["capture-light"];
        const chromiumDark = row["capture-dark"];
        // The both-engines matrix: chromium (roster path) + webkit (derived) × {light,dark}.
        const captures = [
            { engine: "chromium", mode: "light", path: chromiumLight },
            { engine: "chromium", mode: "dark", path: chromiumDark },
            { engine: "webkit", mode: "light", path: webkitCapturePath(chromiumLight) },
            { engine: "webkit", mode: "dark", path: webkitCapturePath(chromiumDark) },
        ];
        const perCapture = [];
        for (const cap of captures) {
            const read = readCapture(cap.path, probe.field, probe.topbar);
            if (!read) {
                perCapture.push({ ...cap, state: "absent" });
                // A DECLARED-PASS row whose capture is missing is the close-class lie
                // (a PASS with no on-disk warm evidence) — the anti-evasion RED.
                if (verdict === "PASS")
                    violations.push(
                        `[ANTI-EVASION] surface "${surface}" verdict PASS but the ${cap.engine} ${cap.mode} capture "${cap.path}" is ABSENT — a PASS demands a real warm composite in BOTH modes on BOTH engines (chromium + WebKit)`,
                    );
                continue;
            }
            readableComposites++;
            const warm = read.verdict.pass;
            if (warm) warmComposites++;
            perCapture.push({
                ...cap,
                state: warm ? "warm" : "not-warm",
                dominantFamily: read.stats?.dominantFamily ?? "?",
                warmFraction: read.stats ? +Number(read.stats.warmFraction).toFixed(3) : null,
                meanChroma: read.stats ? +Number(read.stats.meanChroma).toFixed(4) : null,
                reasons: warm ? undefined : read.verdict.reasons,
            });
            // Anti-evasion: a DECLARED-PASS row whose composite reads NOT warm REDs (the
            // G5 anti-evasion transposed to the dominant-hue kernel — a hand-typed PASS
            // over a grey/metallic/cold composite is no longer sufficient).
            if (verdict === "PASS" && !warm)
                violations.push(
                    `[ANTI-EVASION] surface "${surface}" verdict PASS but the ${cap.engine} ${cap.mode} composite "${cap.path}" reads ${read.verdict.reasons.join(", ")} — OUTSIDE the warm-identity band; the dominant-hue pixel-read is the operative verdict`,
                );
        }
        surfaceReads[surface] = { verdict, perCapture };
    }
    facts.surfaceReads = surfaceReads;
    facts.warmComposites = warmComposites;
    facts.readableComposites = readableComposites;
    // The born-RED OPERATIVE baseline (reported, NOT a device-free violation — the roster
    // verdicts + ba-gestalt's [OPERATIVE] clause carry the all-warm cut gate; each paint
    // wave flips its row + the anti-evasion above enforces the warm pixel-read at flip).
    facts.operativeWarmBaseline = `${warmComposites}/${readableComposites} readable composites warm`;

    // ── GROUND_EVIDENCE — the born-RED-on-a-real-4.2.0-route arm ──────────────────
    // The frozen 4.2.0 Metal captures on disk read COLD/METALLIC by the dominant-hue
    // kernel (the composited-reads-grey/metallic defect the greenfield found by hand). This
    // is the concrete born-RED baseline the synthetic self-test mirrors.
    const groundEvidence = [];
    let groundNotWarm = 0;
    let groundRead = 0;
    for (const bn of GROUND_EVIDENCE) {
        const path = join("docs/tranches/BG/audit/reflect", bn);
        const read = readCapture(path, GROUND_FIELD, null);
        if (!read || !read.stats) {
            groundEvidence.push({ capture: bn, state: "unread" });
            continue;
        }
        groundRead++;
        const warm = read.verdict.pass;
        if (!warm) groundNotWarm++;
        groundEvidence.push({
            capture: bn,
            dominantFamily: read.stats.dominantFamily,
            warmFraction: +Number(read.stats.warmFraction).toFixed(3),
            state: warm ? "warm" : "not-warm",
        });
    }
    facts.groundEvidence = groundEvidence;
    facts.groundNotWarm = `${groundNotWarm}/${groundRead} 4.2.0 Metal-ground captures read NOT warm (the born-RED disease the composited-gestalt kernel catches)`;

    // ── the CROSS-PAGE audit arm (BG.W-PAGE-COMPONENT-AUDIT, 17.6) ────────────────
    if (!existsSync(PAGE_AUDIT_ROSTER)) {
        violations.push(
            `[PAGE-AUDIT-ROSTER-PRESENT] the cross-page per-category convergence roster is absent at ${relative(ROOT, PAGE_AUDIT_ROSTER)} — 17.6's 480-capture route seeds have no home (the 7 Pass-E categories + the C2-SENTINEL)`,
        );
        facts.pageAuditRosterPresent = false;
    } else {
        facts.pageAuditRosterPresent = true;
        const cross = crossPageAudit(readFileSync(PAGE_AUDIT_ROSTER, "utf8"));
        facts.crossPageAudit = cross.facts;
        violations.push(...cross.violations);
    }
    // The 480-capture LOCAL late-sweep instrument (the two-tier model): its presence is a
    // device-free structural requirement; its GREEN paint is the LOCAL close, not ci/release.
    facts.coherenceSpecPresent = existsSync(COHERENCE_SPEC);
    if (!facts.coherenceSpecPresent)
        violations.push(
            `[PAGE-AUDIT-HARNESS] the 480-capture cross-page instrument ${relative(ROOT, COHERENCE_SPEC)} is absent — the LOCAL late-sweep that produces the harmonized-whole read has no home`,
        );

    return { facts, violations };
}

// ── The self-test bites (G4 — the gate is un-weakenable) ─────────────────────────
// Each synthetic fixture MUST flag (the born-RED-witness inverse). If any fails to flag,
// the gate reds loudly (a de-fanged kernel cannot silently pass). These are the born-RED
// synthetic routes the spec names: gray → RED, cerulean-field → RED (GB-5), warm → GREEN.
function selfTest() {
    // Synthetic OKLab sample sets (the dominant-hue kernel input; no PNG).
    const graySamples = Array.from({ length: 200 }, () => ({ a: 0.002, b: 0.006, chroma: 0.0063 }));
    const warmSamples = Array.from({ length: 200 }, () => ({ a: 0.02, b: 0.04, chroma: Math.hypot(0.02, 0.04) }));
    const ceruleanSamples = Array.from({ length: 200 }, () => ({ a: -0.04, b: -0.09, chroma: Math.hypot(0.04, 0.09) }));
    const mixedSamples = Array.from({ length: 200 }, (_, i) =>
        i % 2 === 0
            ? { a: 0.02, b: 0.04, chroma: Math.hypot(0.02, 0.04) }
            : { a: -0.04, b: -0.09, chroma: Math.hypot(0.04, 0.09) },
    );

    const grayDom = dominantHue(graySamples);
    const warmDom = dominantHue(warmSamples);
    const ceruleanDom = dominantHue(ceruleanSamples);
    const mixedDom = dominantHue(mixedSamples);

    const checks = [
        {
            label: "gray-composited route — a flat achromatic field (chroma 0.0063 < floor) has NO dominant hue (NEUTRAL, not warm) → warmIdentityVerdict REDs [hueBand]",
            flag: (() => {
                const v = warmIdentityVerdict({ ...grayDom, meanChroma: 0.0063 }, WARM_BAND);
                return !v.pass && grayDom.dominantFamily === "neutral" ? "flagged" : null;
            })(),
        },
        {
            label: "gray-slab hue-family — oklab(0.695 0.002 0.006) reads NEUTRAL at the identity chroma floor (0.010) even though its 71.6° angle is warm (angle alone would mis-read it)",
            flag: (() => {
                const atFloor = hueFamily(0.002, 0.006, 0.0063, 0.01);
                const belowFloor = hueFamily(0.002, 0.006, 0.0063, 0.005);
                return atFloor.family === "neutral" && belowFloor.family === "warm" ? "flagged" : null;
            })(),
        },
        {
            label: "cerulean-field route (GB-5) — a cerulean field (θ≈246°) is dominant COLD → warmIdentityVerdict REDs [hueBand]",
            flag: (() => {
                const v = warmIdentityVerdict({ ...ceruleanDom, meanChroma: 0.05 }, WARM_BAND);
                return !v.pass && ceruleanDom.dominantFamily === "cold" ? "flagged" : null;
            })(),
        },
        {
            label: "warm route — a warm-cream field (θ≈63°, chroma above floor) is dominant WARM → warmIdentityVerdict PASSES (the inverse GREEN witness)",
            flag: (() => {
                const v = warmIdentityVerdict(
                    { ...warmDom, meanChroma: 0.03, captureReal: true, edgeDelta: 0.01, topDelta: 0.02, cornerL: 0.6 },
                    WARM_BAND,
                );
                return v.pass && warmDom.dominantFamily === "warm" ? "flagged" : null;
            })(),
        },
        {
            label: "warmFraction mixed — a 50/50 warm+cold field (mean neutral) drops warmFraction below the floor → REDs even where the argmax could tie warm (the mean can't see it)",
            flag: (() => {
                const v = warmIdentityVerdict({ ...mixedDom, meanChroma: 0.06 }, WARM_BAND);
                return !v.pass && mixedDom.warmFraction < WARM_BAND.warmFractionFloor ? "flagged" : null;
            })(),
        },
        {
            label: "chromaCeiling metallic — a warm-hue field over-saturated past the ceiling (meanChroma 0.40) REDs [chromaCeiling] (the gray→metallic over-correction)",
            flag: (() => {
                const v = warmIdentityVerdict({ ...warmDom, meanChroma: 0.4 }, WARM_BAND);
                return !v.pass && v.reasons.some((r) => r.includes("[chromaCeiling]")) ? "flagged" : null;
            })(),
        },
        {
            label: "edgeCast — a warm field with a divergent edge cast (edge↔field ΔE 0.30) REDs [edgeCast]",
            flag: (() => {
                const v = warmIdentityVerdict({ ...warmDom, meanChroma: 0.03, edgeDelta: 0.3 }, WARM_BAND);
                return !v.pass && v.reasons.some((r) => r.includes("[edgeCast]")) ? "flagged" : null;
            })(),
        },
        {
            label: "topBar (present-and-composed) — a warm field with a divergent top bar (top↔field ΔE 0.30, via regionStatsDelta) REDs [topBar]",
            flag: (() => {
                const topbar = { meanL: 0.4, meanChroma: 0.02, meanA: -0.04, meanB: -0.02 };
                const field = { meanL: 0.85, meanChroma: 0.03, meanA: 0.02, meanB: 0.06 };
                const dE = regionStatsDelta(topbar, field).dE;
                const v = warmIdentityVerdict({ ...warmDom, meanChroma: 0.03, topDelta: dE }, WARM_BAND);
                return dE > WARM_BAND.topBarCeiling && !v.pass && v.reasons.some((r) => r.includes("[topBar]")) ? "flagged" : null;
            })(),
        },
        // ── the F8.2 PART-probe recalibration bites (mean-L box → dominant-hue over route REGION) ──
        {
            label: "recalibration — a NEUTRAL top/edge part (an achromatic page-top MARGIN, dominantFamily neutral) over a warm field is NOT a divergent slab (the F8.2 fix: the mean-L box false-tripped the ceiling on the white/near-black page margin; the dominant-hue read makes it moot)",
            flag: hueDivergent({ dominantFamily: "neutral" }, { dominantFamily: "warm" }) === false ? "flagged" : null,
        },
        {
            label: "recalibration — a WARM-consistent part (dominantFamily warm, same as the field) is NOT divergent (a warm masthead / warm edge sliver reads consistent, not an aberrant slab)",
            flag: hueDivergent({ dominantFamily: "warm" }, { dominantFamily: "warm" }) === false ? "flagged" : null,
        },
        {
            label: "recalibration — a DIVERGENT COLOURED part (dominantFamily cold/magenta, ≠ the warm field) IS the genuine D5 aberrant-slab defect (still caught — the recalibration kills only the neutral/consistent false-trips, never the real divergent slab)",
            flag:
                hueDivergent({ dominantFamily: "cold" }, { dominantFamily: "warm" }) === true &&
                hueDivergent({ dominantFamily: "magenta" }, { dominantFamily: "warm" }) === true
                    ? "flagged"
                    : null,
        },
        {
            // The BORN-RED→GREEN on-disk witness: readCapture over a real WARM dock capture at
            // the roster's `ty=0.00` top-bar box. The RETIRED mean-L ΔE box FALSE-trips the
            // ceiling (topDelta 0.184 light / 0.499 dark — the browser page-top margin), but the
            // recalibrated read classifies the top region NEUTRAL → not divergent → readCapture
            // PASSES. Degrades gracefully (flags) if the -close/ capture is pruned — bites above
            // are the disk-free load-bearing proof.
            label: "recalibration (disk) — a real WARM dock capture: the raw mean-L top-bar ΔE FALSE-trips the ceiling (page-margin box) YET the dominant-hue read passes readCapture (topDivergent false; the page-margin false-trip killed)",
            flag: (() => {
                const dockCap = join(
                    "docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-close",
                    "dock-overview-chrome-light-desktop-full.png",
                );
                if (!existsSync(resolve(ROOT, dockCap))) return "flagged"; // fixture absent — degrade
                const dockField = { x: 0.18, y: 0.5, w: 0.2, h: 0.12 };
                const dockTopbar = { x: 0.52, y: 0.0, w: 0.46, h: 0.05 };
                // The raw mean-L box the recalibration RETIRES for this region — the page-margin ΔE.
                const rawBox = pngRegionDelta(resolve(ROOT, dockCap), dockTopbar, dockField);
                const boxFalseTrips = !!rawBox && rawBox.dE > WARM_BAND.topBarCeiling;
                // The recalibrated read — the top region reads NEUTRAL → not divergent → PASSES.
                const read = readCapture(dockCap, dockField, dockTopbar);
                const recalibratedPasses =
                    !!read && read.verdict.pass === true && read.stats?.topDivergent === false;
                return boxFalseTrips && recalibratedPasses ? "flagged" : null;
            })(),
        },
        {
            label: "cornerClip — a warm field with a black-notch corner (corner L 0.01) REDs [cornerClip]",
            flag: (() => {
                const v = warmIdentityVerdict({ ...warmDom, meanChroma: 0.03, cornerL: 0.01 }, WARM_BAND);
                return !v.pass && v.reasons.some((r) => r.includes("[cornerClip]")) ? "flagged" : null;
            })(),
        },
        {
            label: "routeNavigates — a degenerate capture (captureReal false — a blank/error page) REDs [routeNavigates]",
            flag: (() => {
                const v = warmIdentityVerdict({ ...warmDom, meanChroma: 0.03, captureReal: false }, WARM_BAND);
                return !v.pass && v.reasons.some((r) => r.includes("[routeNavigates]")) ? "flagged" : null;
            })(),
        },
        {
            label: "degenerate-read — a null stats object (undecodable PNG / empty region) REDs (never a silent pass)",
            flag: warmIdentityVerdict(null, WARM_BAND).pass === false ? "flagged" : null,
        },
        {
            label: "both-engines wiring — webkitCapturePath derives the WebKit twin (dock-light-desktop-full.png → dock-safari-light-desktop-full.png)",
            flag:
                webkitCapturePath("docs/tranches/BG/audit/reflect/dock-light-desktop-full.png") ===
                join("docs/tranches/BG/audit/reflect", "dock-safari-light-desktop-full.png")
                    ? "flagged"
                    : null,
        },
        {
            // The on-disk anti-evasion witness: readCapture over a REAL frozen 4.2.0 gray
            // Metal-ground capture reads NOT warm end-to-end (decode → histogram → verdict),
            // so a roster row declaring PASS over it would RED the detect() anti-evasion.
            // Degrades gracefully (flags) if the fixture is pruned — the synthetic kernel
            // bites above are the disk-free load-bearing proof.
            label: "anti-evasion (disk) — readCapture over a real 4.2.0 gray Metal-ground capture reads NOT warm (a PASS row over it would RED the anti-evasion)",
            flag: (() => {
                const path = join("docs/tranches/BG/audit/reflect", GROUND_EVIDENCE[0]);
                if (!existsSync(resolve(ROOT, path))) return "flagged"; // fixture absent — degrade
                const read = readCapture(path, GROUND_FIELD, null);
                return read && read.stats && !read.verdict.pass ? "flagged" : null;
            })(),
        },
        {
            label: "[ROUTE-RESOLVES] HARD-RED — a routes cell `/dock/typoo` (no demo/stories/dock/typoo.vue) produces a route HARD-RED (a typo'd slug cannot vanish)",
            flag: (() => {
                const synthetic =
                    "| surface | routes | capture-light | capture-dark | probe | expect | verdict | ground-anchor |\n" +
                    "|---|---|---|---|---|---|---|---|\n" +
                    "| t | /dock/typoo | a | b | x=0,y=0,w=1,h=1 | meanL=0..1 | FAIL | g |\n";
                const r = routeSeeds(synthetic, { root: ROOT });
                return r.hardReds.some((h) => h.token === "/dock/typoo") ? "flagged" : null;
            })(),
        },
        // ── the CROSS-PAGE audit self-test bites (17.6) ──────────────────────────
        (() => {
            const HEAD =
                "| category | route | capture-light | capture-dark | probe | expect | verdict | notes |\n" +
                "|---|---|---|---|---|---|---|---|\n";
            const row = (cat, route, verdict, cap = "docs/tranches/BG/audit/visual/__self-test-absent__.png") =>
                `| ${cat} | ${route} | ${cap} | ${cap} | x=0,y=0,w=1,h=1 | meanL=0..1 | ${verdict} | n |\n`;
            const FULL_ROUTES = {
                display: "/display/atoms",
                containers: "/containers/dialog",
                data: "/data/metrics",
                feedback: "/feedback/toast",
                navigation: "/navigation/tabs",
                compositions: "/compositions/auth-shell",
                motion: "/motion/scroll",
            };
            const SENTINELS = C2_SENTINEL_ROUTES.map((r) => row("sentinel", r, "FAIL"));
            const catRows = (overrides = {}) =>
                PASS_E_CATEGORIES.filter((c) => !(overrides.drop === c)).map((c) =>
                    row(c, overrides.route?.[c] ?? FULL_ROUTES[c], overrides.verdict?.[c] ?? "FAIL"),
                );
            // Bite A — a missing Pass-E category flags [PAGE-AUDIT-CATEGORY-COMPLETE].
            const missingCat = crossPageAudit(HEAD + catRows({ drop: "motion" }).join("") + SENTINELS.join(""));
            // Bite B — a CONVERGED row over an absent capture flags [PAGE-AUDIT-ANTI-EVASION].
            const converged = crossPageAudit(HEAD + catRows({ verdict: { display: "CONVERGED" } }).join("") + SENTINELS.join(""));
            // Bite C — a route whose SFC is absent flags [PAGE-AUDIT-ROUTE-RESOLVES].
            const badRoute = crossPageAudit(HEAD + catRows({ route: { display: "/display/does-not-exist-slug" } }).join("") + SENTINELS.join(""));
            // The GREEN witness — the real committed roster passes the structural arm.
            const realRoster = existsSync(PAGE_AUDIT_ROSTER)
                ? crossPageAudit(readFileSync(PAGE_AUDIT_ROSTER, "utf8"))
                : { violations: ["(roster absent — cannot verify green)"] };
            const flagged =
                missingCat.violations.some((v) => v.includes("[PAGE-AUDIT-CATEGORY-COMPLETE]")) &&
                converged.violations.some((v) => v.includes("[PAGE-AUDIT-ANTI-EVASION]")) &&
                badRoute.violations.some((v) => v.includes("[PAGE-AUDIT-ROUTE-RESOLVES]")) &&
                realRoster.violations.length === 0;
            return {
                label:
                    "cross-page audit (17.6) — missing-category REDs [PAGE-AUDIT-CATEGORY-COMPLETE] · CONVERGED-over-absent-capture REDs [PAGE-AUDIT-ANTI-EVASION] · absent-SFC route REDs [PAGE-AUDIT-ROUTE-RESOLVES] · the real committed roster passes the structural arm (0 violations)",
                flag: flagged ? "flagged" : null,
            };
        })(),
    ];
    const missed = checks.filter((c) => !c.flag).map((c) => c.label);
    if (missed.length) {
        console.error(
            `[proof:warm-identity] SELF-TEST FAILED — synthetic check(s) NOT flagged: ${missed.join("; ")}. The gate is not load-bearing.`,
        );
        process.exit(1);
    }
    return checks.length;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_WARM_IDENTITY_ARTIFACT", "warm-identity");
    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    facts.selfTestChecks = selfTestCount;
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:warm-identity",
        command: COMMAND,
        facts,
        violations,
    });

    console.log(
        "proof:warm-identity — the composited-WHOLE dominant-hue paint battery (BG.W-COMPOSITED-GESTALT-GATE; measure the whole, not the part)",
    );
    console.log(
        `  self-test (bite proof): OK — ${facts.selfTestChecks ?? 0} synthetic checks flagged (gray-RED + gray-slab-neutral + cerulean-RED + warm-GREEN + warmFraction-mixed + chromaCeiling + edgeCast + topBar + recalibration×4 [neutral-margin-consistent + warm-consistent + divergent-slab-caught + disk-false-trip-killed] + cornerClip + routeNavigates + degenerate + both-engines + ROUTE-RESOLVES + cross-page-audit)`,
    );
    if (facts.rosterPresent) {
        console.log(`  enrolled surface set : ${facts.enrolledSurfaces ?? 0} surfaces (the ba-gestalt roster IS one enrolled surface set, NOT the sole oracle)`);
        console.log(`  route-resolution arm : ${facts.routeTokens ?? 0} tokens — ${(facts.routeHardReds ?? []).length ? (facts.routeHardReds.length + " HARD-RED(S)") : "GREEN (every /cat/story resolves)"}`);
        console.log(`  operative baseline   : ${facts.operativeWarmBaseline} — born-RED until each paint wave lands a fresh warm LIVE :5199 set (both engines, both modes) + a non-authoring agent flips its roster row`);
        console.log(`  4.2.0 ground evidence: ${facts.groundNotWarm}`);
        for (const g of facts.groundEvidence ?? [])
            console.log(`    ${g.state === "not-warm" ? "✗" : g.state === "warm" ? "✓" : "·"} ${g.capture.padEnd(46)} ${g.state}${g.dominantFamily ? ` (dom=${g.dominantFamily}, warmFrac=${g.warmFraction})` : ""}`);
    }
    if (facts.pageAuditRosterPresent) {
        const cp = facts.crossPageAudit ?? {};
        console.log(`  cross-page audit (17.6): ${cp.pageAuditRows ?? 0} convergence rows — Pass-E ${cp.passECategoriesEnrolled ?? "?"} · C2-SENTINEL ${cp.sentinelRoutesEnrolled ?? "?"} · ${cp.pageAuditRouteTokens ?? 0} route tokens`);
        console.log(`  cross-page baseline  : ${cp.crossPageConvergedBaseline ?? "0/0"} — the 480-capture harmonized-whole read rides the LOCAL late-sweep (${facts.coherenceSpecPresent ? "instrument present" : "instrument ABSENT"})`);
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
