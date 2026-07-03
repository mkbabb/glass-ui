// BG.W-COMPOSITED-GESTALT-GATE — NON-AUTHORING PAINT-JUDGE dominant-hue histogram over ROUTE
// REGIONS (not a mean-L box). For each of the 4 wave routes × {light,dark} × {chrome,safari},
// read the composited FIELD region through the SAME kernel the gate uses
// (pngRegionHueHistogram + warmIdentityVerdict) and gate the PAINT verdict on the DOMINANT-HUE
// predicates (hueBand + chromaCeiling + routeNavigates) per the mandate ("a dominant-hue
// histogram over a route REGION, not a mean-L box"). The edgeCast/topBar mean-L delta axes are
// reported INFORMATIONAL (roster probe-geometry, explicitly out of this judge's gating scope).
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
    isRealPng,
    pngDimensions,
    pngRegionHueHistogram,
    pngRegionStats,
    pngRegionDelta,
} from "file:///Users/mkbabb/Programming/glass-ui/scripts/reflect-capture-verify.mjs";
import { warmIdentityVerdict } from "file:///Users/mkbabb/Programming/glass-ui/scripts/lib/paint-arm.mjs";

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-close";

// The WARM_BAND — the DOMINANT-HUE axes (warmFractionFloor, chromaCeiling) are the operative
// paint gate per the mandate. The delta axes (edgeCastCeiling/topBarCeiling/cornerClipFloor)
// are computed for the record but NOT gated (probe-geometry, the roster-recalibration arm).
const WARM_BAND = {
    warmFractionFloor: 0.55,
    chromaCeiling: 0.3,
    edgeCastCeiling: 0.16,
    topBarCeiling: 0.14,
    cornerClipFloor: 0.04,
};
const MIN_W = 320,
    MIN_H = 320;

// route -> composited FIELD region (broad, over the primary field; deliberately below the
// page-top margin and above the bottom dock nav + live-specimen strip — the route REGION, not
// a mean-L delta box).
const ROUTES = {
    "foundations-intro": {
        slug: "foundations-intro",
        route: "/foundations/intro",
        field: { x: 0.15, y: 0.14, w: 0.52, h: 0.42 },
    },
    "substrates-aurora": {
        slug: "substrates-aurora",
        route: "/substrates/aurora",
        field: { x: 0.15, y: 0.14, w: 0.58, h: 0.42 },
    },
    "dock-overview": {
        slug: "dock-overview",
        route: "/dock/overview",
        field: { x: 0.12, y: 0.34, w: 0.5, h: 0.3 },
    },
    "compositions-configurator": {
        slug: "compositions-configurator",
        route: "/compositions/configurator",
        field: { x: 0.14, y: 0.18, w: 0.5, h: 0.32 },
    },
};

function edgeRegion(field) {
    return { x: field.x, y: field.y, w: Math.min(0.02, field.w), h: field.h };
}
const CORNER = { x: 0, y: 0, w: 0.04, h: 0.04 };

function readOne(path, field) {
    const abs = resolve(OUT, path);
    if (!existsSync(abs)) return { state: "absent" };
    const hist = pngRegionHueHistogram(abs, field);
    if (!hist) return { state: "undecodable" };
    const real = isRealPng(abs);
    const dims = pngDimensions(abs);
    const captureReal = real && !!dims && dims.w >= MIN_W && dims.h >= MIN_H;
    const stats = {
        dominantFamily: hist.dominantFamily,
        warm: hist.warm,
        warmFraction: hist.warmFraction,
        coldFraction: hist.coldFraction,
        neutralFraction: hist.neutralFraction,
        meanChroma: hist.meanChroma,
        meanL: hist.meanL,
        captureReal,
    };
    // informational-only delta axes
    const ed = pngRegionDelta(abs, edgeRegion(field), field);
    if (ed) stats.edgeDelta = ed.dE;
    const corner = pngRegionStats(abs, CORNER);
    if (corner) stats.cornerL = corner.meanL;

    // FULL verdict (all predicates) — for the record
    const fullVerdict = warmIdentityVerdict(stats, WARM_BAND);
    // PAINT verdict — dominant-hue only (hueBand + chromaCeiling + routeNavigates), the mandate's gate
    const paintStats = {
        dominantFamily: stats.dominantFamily,
        warm: stats.warm,
        warmFraction: stats.warmFraction,
        meanChroma: stats.meanChroma,
        captureReal: stats.captureReal,
    };
    const paintVerdict = warmIdentityVerdict(paintStats, WARM_BAND);
    return {
        state: paintVerdict.pass ? "warm" : "not-warm",
        stats,
        paintVerdict,
        fullVerdict,
        dims,
    };
}

const rows = [];
let warm = 0,
    total = 0;
for (const [route, cfg] of Object.entries(ROUTES)) {
    for (const engine of ["chrome", "safari"]) {
        for (const mode of ["light", "dark"]) {
            const path = `${cfg.slug}-${engine}-${mode}-desktop-full.png`;
            const r = readOne(path, cfg.field);
            total++;
            if (r.state === "warm") warm++;
            const s = r.stats;
            rows.push({
                route,
                slug: cfg.slug,
                engine,
                mode,
                state: r.state,
                dom: s?.dominantFamily,
                warmFrac: s ? +s.warmFraction.toFixed(3) : null,
                coldFrac: s ? +s.coldFraction.toFixed(3) : null,
                neutralFrac: s ? +s.neutralFraction.toFixed(3) : null,
                chroma: s ? +s.meanChroma.toFixed(4) : null,
                meanL: s ? +s.meanL.toFixed(3) : null,
                edge: s?.edgeDelta != null ? +s.edgeDelta.toFixed(3) : null,
                cornerL: s?.cornerL != null ? +s.cornerL.toFixed(3) : null,
                dims: r.dims ? `${r.dims.w}x${r.dims.h}` : null,
                paintReasons: r.paintVerdict && !r.paintVerdict.pass ? r.paintVerdict.reasons : undefined,
                fullPass: r.fullVerdict?.pass,
            });
        }
    }
}

for (const r of rows) {
    const mark = r.state === "warm" ? "✓" : "✗";
    console.log(
        `${mark} ${r.route.padEnd(26)} ${r.engine.padEnd(6)} ${r.mode.padEnd(5)} dom=${String(r.dom).padEnd(8)} warmF=${r.warmFrac} coldF=${r.coldFrac} neutF=${r.neutralFrac} chroma=${r.chroma} L=${r.meanL} edge=${r.edge} cL=${r.cornerL} ${r.dims} full=${r.fullPass ? "✓" : "✗"}`,
    );
    if (r.paintReasons) for (const rr of r.paintReasons) console.log(`      ↳ ${rr}`);
}
console.log(`\nPAINT (dominant-hue) WARM: ${warm}/${total} route-region composites read all-warm`);
writeFileSync(`${OUT}/analysis.json`, JSON.stringify({ warm, total, band: WARM_BAND, rows }, null, 2));
