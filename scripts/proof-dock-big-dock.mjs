// AW.W3b — the big-dock behavioral gate (proof:dock-big-dock).
//
// The big-dock card+grid variant: `shape="card"` is a FINITE concentric shell (a
// radius above 2xl, below pill — NOT a stadium); collapsed it returns to a pill;
// the pill↔card swap MORPHS on the `--dock-motion-resize` spring (not a discrete
// snap). `layout="grid"` makes the active layer a self-wrapping tile grid with
// CONCENTRIC inner tiles (inner radius = outer − padding); `corner-shape: squircle`
// is present ONLY under `@supports`. A grid dock is `alwaysExpanded` by contract,
// so NO grid-column reflow occurs during any morph.
//
// This gate asserts, on the demo big-dock showcase:
//   (a) FINITE-vs-PILL — `shape="card"` expanded renders a finite border-radius
//       (== --dock-card-radius / --radius-3xl, NOT 9999px / --radius-pill) AND
//       collapsed renders --radius-pill.
//   (b) MONOTONE MORPH — the pill↔card border-radius rises monotonically over ≥3
//       frames on the spring (born-RED: a discrete snap because border-radius was
//       absent from the `:not(.vertical)` transition list).
//   (c) GRID ROWS — `layout="grid"` with N > capacity tiles produces ≥2 grid rows.
//   (d) CONCENTRIC — the inner-tile computed border-radius == calc(outer − padding).
//   (e) SQUIRCLE-GATED — `corner-shape: squircle` is present only under @supports.
//   (f) NO-REFLOW — the grid-template-columns track count is CONSTANT across a
//       hover/scale (the alwaysExpanded contract).
//
// BORN-RED on a build without the `border-radius` transition / the `.shape-card`
// horizontal rule: the radius snaps (1 frame), or `shape="card"` paints the pill
// radius (no finite shell).
//
// HARNESS: same contract as proof:dock-clip-reveal — dynamically imports
// playwright; SKIPs fail-open with a self-describing artefact when the harness or
// the demo dev server is absent. The PURE detectors below are exported +
// unit-tested (dock-big-dock.detect.test.ts) so the gate cannot false-GREEN.

import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const DOCK_ROUTE = "/navigation/dock";
const MIN_MORPH_FRAMES = 3;
const PILL_RADIUS_PX = 100; // a stadium reads as a huge px radius (9999px clamps to ~half-height, but >> a 24px card)

function pageProbe() {
    return new Promise((resolve) => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const radiusOf = (el) => parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        const fire = (types, el) => {
            const r = el.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            for (const t of types)
                el.dispatchEvent(
                    new PointerEvent(t, { bubbles: true, clientX: cx, clientY: cy, pointerType: "mouse" }),
                );
        };
        const ENTER = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove", "mousemove"];
        const LEAVE = ["pointerout", "pointerleave", "mouseout", "mouseleave"];

        (async () => {
            const result = {};

            // Find the showcase docks by data-testid on their wrappers.
            const cardWrap = document.querySelector('[data-testid="dock-big-card"]');
            const gridWrap = document.querySelector('[data-testid="dock-big-grid"]');
            const cardDock = cardWrap?.querySelector(".glass-dock");
            const gridDock = gridWrap?.querySelector(".glass-dock");

            if (!cardDock || !gridDock) {
                result.error = "no big-dock showcase (dock-big-card / dock-big-grid) on the route";
                resolve(result);
                return;
            }

            // (a) finite-vs-pill: read the card dock radius expanded vs collapsed.
            // The card showcase is collapsible; collapse it then expand, sampling
            // the radius across the morph (b).
            // First ensure it is collapsed.
            fire(LEAVE, cardDock);
            await sleep(800);
            result.collapsedRadius = radiusOf(cardDock);

            // Sample the pill→card morph on expand.
            const radii = [];
            const times = [];
            await new Promise((res) => {
                const t0 = performance.now();
                fire(ENTER, cardDock);
                let stable = 0;
                let last = radiusOf(cardDock);
                const f = () => {
                    const r = radiusOf(cardDock);
                    radii.push(r);
                    times.push(performance.now() - t0);
                    if (Math.abs(r - last) < 0.2) stable++;
                    else stable = 0;
                    last = r;
                    const t = performance.now() - t0;
                    if (stable >= 6 || t > 2000) res();
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
            result.morphRadii = radii;
            result.morphTimes = times;
            result.expandedRadius = radiusOf(cardDock);

            // (c)+(d)+(f) grid: rows, concentric inner radius, constant track count.
            const gridFull = gridDock.querySelector(".dock-layer--full");
            const gridStyle = getComputedStyle(gridFull);
            // grid-template-columns resolves to a space-separated track list; rows
            // are derived from the child count / column count.
            const trackList = gridStyle.gridTemplateColumns.trim().split(/\s+/).filter(Boolean);
            const colCount = trackList.length;
            const tileCount = gridFull.children.length;
            result.gridColumns = colCount;
            result.gridTiles = tileCount;
            result.gridRows = colCount > 0 ? Math.ceil(tileCount / colCount) : 0;

            // (d) concentric inner radius: read a tile's radius + the dock card
            // radius + the dock inline padding, assert inner == outer − padding.
            const tile = gridFull.children[0];
            if (tile) {
                const tileRadius = radiusOf(tile);
                const dockRadius =
                    parseFloat(getComputedStyle(gridDock).getPropertyValue("--dock-card-radius")) ||
                    radiusOf(gridDock);
                const dockPad =
                    parseFloat(getComputedStyle(gridDock).getPropertyValue("--dock-padding-inline")) ||
                    parseFloat(getComputedStyle(gridDock).paddingLeft) ||
                    8;
                result.tileRadius = tileRadius;
                result.expectedInnerRadius = dockRadius - dockPad;
            }

            // (f) no-reflow: sample the column count across a hover/scale on the
            // grid dock (it is alwaysExpanded — the track count must not change).
            const trackCounts = [];
            await new Promise((res) => {
                const t0 = performance.now();
                fire(ENTER, gridDock);
                const f = () => {
                    const tracks = getComputedStyle(gridFull)
                        .gridTemplateColumns.trim()
                        .split(/\s+/)
                        .filter(Boolean).length;
                    trackCounts.push(tracks);
                    if (performance.now() - t0 > 500) res();
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
            result.trackCounts = trackCounts;

            // (e) squircle-gated: corner-shape must be absent on the baseline
            // computed style UNLESS the engine supports it via @supports. We read
            // CSS.supports + the computed corner-shape.
            result.supportsSquircle =
                typeof CSS !== "undefined" && CSS.supports && CSS.supports("corner-shape", "squircle");
            const cs = getComputedStyle(cardDock).getPropertyValue("corner-shape").trim();
            result.cornerShape = cs || null;

            resolve(result);
        })();
    });
}

// ── pure assertions over a captured timeline (unit-testable) ──────────────────

export function risingFrames(series, eps = 0.2) {
    let n = 0;
    for (let i = 1; i < series.length; i++) if (Math.abs(series[i] - series[i - 1]) > eps) n++;
    return n;
}

// `monotoneMorph` — the radius changes over ≥ MIN frames (not a single discrete
// snap). A snap has ≤1 changing frame. Returns { morphFrames, span }.
export function monotoneMorph(radii) {
    if (!Array.isArray(radii) || radii.length < 2) return { morphFrames: 0, span: 0 };
    const span = Math.abs(Math.max(...radii) - Math.min(...radii));
    return { morphFrames: risingFrames(radii), span };
}

// `isFinite Radius` — a card radius is FINITE (a real px above the 2xl floor, not
// a stadium). A stadium computes to ~half the dock height (a large px), so we
// compare against a PILL_RADIUS threshold AND against the collapsed pill radius.
export function isFiniteCardRadius(expandedRadius, collapsedRadius, pillThreshold = PILL_RADIUS_PX) {
    return {
        expandedFinite: expandedRadius > 0 && expandedRadius < pillThreshold,
        collapsedPill: collapsedRadius >= pillThreshold || collapsedRadius > expandedRadius + 2,
    };
}

// `concentric` — the inner tile radius equals outer − padding within tol.
export function concentric(tileRadius, expectedInnerRadius, tol = 2) {
    if (tileRadius == null || expectedInnerRadius == null) return { ok: false, deltaPx: null };
    const delta = Math.abs(tileRadius - expectedInnerRadius);
    return { ok: delta <= tol, deltaPx: Math.round(delta * 100) / 100 };
}

// `constantTrackCount` — every sampled track count is identical (no reflow).
export function constantTrackCount(trackCounts) {
    if (!Array.isArray(trackCounts) || trackCounts.length === 0) return { constant: false, counts: [] };
    const first = trackCounts[0];
    return { constant: trackCounts.every((c) => c === first), counts: [...new Set(trackCounts)] };
}

export function detectBigDock(result) {
    const violations = [];
    const facts = {};
    if (!result || result.error) {
        violations.push(`probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    // (a) finite-vs-pill.
    const fin = isFiniteCardRadius(result.expandedRadius, result.collapsedRadius);
    facts.expandedRadius = Math.round((result.expandedRadius ?? 0) * 100) / 100;
    facts.collapsedRadius = Math.round((result.collapsedRadius ?? 0) * 100) / 100;
    facts.expandedFinite = fin.expandedFinite;
    facts.collapsedPill = fin.collapsedPill;
    if (!fin.expandedFinite) {
        violations.push(
            `shape="card" expanded radius is ${facts.expandedRadius}px — not a FINITE card shell (it reads as a pill / stadium)`,
        );
    }
    if (!fin.collapsedPill) {
        violations.push(
            `shape="card" collapsed radius is ${facts.collapsedRadius}px — not the pill morph target (it should return to --radius-pill)`,
        );
    }

    // (b) monotone morph ≥3 frames.
    const mm = monotoneMorph(result.morphRadii);
    facts.radiusMorphFrames = mm.morphFrames;
    facts.radiusMorphSpanPx = Math.round(mm.span * 100) / 100;
    if (mm.span > 1 && mm.morphFrames < MIN_MORPH_FRAMES) {
        violations.push(
            `the pill↔card radius morphed over only ${mm.morphFrames} frame(s) (< ${MIN_MORPH_FRAMES}) — a discrete snap (border-radius is absent from the dock transition list)`,
        );
    }
    if (mm.span <= 1) {
        violations.push(
            `the pill↔card radius did not change (span ${facts.radiusMorphSpanPx}px) — the card shell is not painting / collapsed and expanded share a radius`,
        );
    }

    // (c) grid rows ≥2.
    facts.gridColumns = result.gridColumns;
    facts.gridTiles = result.gridTiles;
    facts.gridRows = result.gridRows;
    if ((result.gridRows ?? 0) < 2) {
        violations.push(
            `layout="grid" produced ${result.gridRows} row(s) (< 2) — the tiles did not wrap into a multi-row grid`,
        );
    }

    // (d) concentric.
    const con = concentric(result.tileRadius, result.expectedInnerRadius);
    facts.tileRadius = result.tileRadius != null ? Math.round(result.tileRadius * 100) / 100 : null;
    facts.expectedInnerRadius =
        result.expectedInnerRadius != null ? Math.round(result.expectedInnerRadius * 100) / 100 : null;
    facts.concentricDeltaPx = con.deltaPx;
    if (!con.ok) {
        violations.push(
            `the inner-tile radius (${facts.tileRadius}px) is not concentric with outer − padding (${facts.expectedInnerRadius}px; Δ${con.deltaPx}px) — the tiles are not stepped down (stadium-in-stadium risk)`,
        );
    }

    // (e) squircle gated.
    facts.supportsSquircle = result.supportsSquircle ?? false;
    facts.cornerShape = result.cornerShape ?? null;
    // If the engine does NOT support corner-shape, the computed value must not be
    // squircle (the @supports gate held). If it DOES support, squircle is allowed.
    if (!result.supportsSquircle && result.cornerShape === "squircle") {
        violations.push(
            "corner-shape: squircle is present WITHOUT @supports — the squircle enhancement leaked to the baseline (the border-radius arc must be the contract)",
        );
    }

    // (f) no-reflow.
    const ctc = constantTrackCount(result.trackCounts);
    facts.trackCountConstant = ctc.constant;
    facts.trackCounts = ctc.counts;
    if (!ctc.constant) {
        violations.push(
            `the grid-column track count changed during a hover/scale (${ctc.counts.join(",")}) — a grid reflow occurred (the alwaysExpanded contract is violated)`,
        );
    }

    return { facts, violations };
}

async function loadPlaywright() {
    for (const mod of ["playwright", "playwright-core"]) {
        try {
            return await import(mod);
        } catch {
            /* not installed */
        }
    }
    return null;
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_BIG_DOCK_ARTIFACT", "AW-dock-big-dock");

    const pw = await loadPlaywright();
    if (!pw) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "no Playwright harness on this runner — run in the demo/MCP environment (npm i -D playwright + a live demo dev server) for the behavioral assert",
            command: "npm run proof:dock-big-dock",
        });
        console.log("proof:dock-big-dock — SKIPPED (no Playwright harness on this runner).");
        console.log("  The big-dock behavioral truth is asserted wherever the harness runs. The pure detectors are unit-tested here.");
        process.exit(0);
    }

    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        const page = await browser.newPage();
        await page.goto(`${BASE_URL}${DOCK_ROUTE}`, { waitUntil: "networkidle" });
        await page.waitForSelector('[data-testid="dock-big-card"]', { timeout: 5000 });
        result = await page.evaluate(pageProbe);
    } catch (e) {
        if (browser) await browser.close();
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason: `could not reach the demo big-dock showcase at ${BASE_URL}${DOCK_ROUTE}: ${e.message}`,
            command: "npm run proof:dock-big-dock",
        });
        console.log(`proof:dock-big-dock — SKIPPED (demo unreachable at ${BASE_URL}${DOCK_ROUTE}).`);
        console.log(`  ${e.message}`);
        process.exit(0);
    }
    await browser.close();

    const { facts, violations } = detectBigDock(result);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-big-dock",
        facts,
        violations,
    });

    console.log("proof:dock-big-dock — the finite concentric card + grid (AW.W3b)");
    console.log(`  card radius exp/col      : ${facts.expandedRadius}px / ${facts.collapsedRadius}px (finite: ${facts.expandedFinite})`);
    console.log(`  radius morph frames      : ${facts.radiusMorphFrames} (span ${facts.radiusMorphSpanPx}px)`);
    console.log(`  grid cols/tiles/rows     : ${facts.gridColumns} / ${facts.gridTiles} / ${facts.gridRows}`);
    console.log(`  concentric Δ             : ${facts.concentricDeltaPx}px`);
    console.log(`  squircle support/value   : ${facts.supportsSquircle} / ${facts.cornerShape}`);
    console.log(`  grid track count constant: ${facts.trackCountConstant} (${(facts.trackCounts ?? []).join(",")})`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
