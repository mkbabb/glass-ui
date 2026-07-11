// BG.W-COMPOSITED-GESTALT-GATE re-judge2 — NON-AUTHORING PAINT-JUDGE dominant-hue histogram over
// ROUTE REGIONS (the mandate: not a mean-L box). For each enrolled route × {light,dark} ×
// {chrome,safari}, read the composited FIELD region through the SAME kernel the gate uses
// (pngRegionHueHistogram + warmIdentityVerdict) and gate the PAINT verdict on the DOMINANT-HUE
// predicates (hueBand + chromaCeiling + routeNavigates). Delta axes reported INFORMATIONAL.
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
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-rejudge2";

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
// page-top margin and above the bottom dock nav + live-specimen strip — the route REGION).
const ROUTES = {
    "dock-overview": { surface: "dock+shell", field: { x: 0.12, y: 0.34, w: 0.5, h: 0.3 } },
    "dock-layers": { surface: "dock", field: { x: 0.12, y: 0.32, w: 0.5, h: 0.3 } },
    "dock-rail": { surface: "dock", field: { x: 0.12, y: 0.32, w: 0.5, h: 0.3 } },
    "substrates-blob": { surface: "configurators-goo", field: { x: 0.15, y: 0.16, w: 0.55, h: 0.42 } },
    "substrates-aurora": { surface: "aurora", field: { x: 0.15, y: 0.14, w: 0.58, h: 0.42 } },
    "feedback-toast": { surface: "glass-feedback", field: { x: 0.18, y: 0.2, w: 0.55, h: 0.4 } },
    "feedback-notification": { surface: "glass-feedback", field: { x: 0.18, y: 0.2, w: 0.55, h: 0.4 } },
    "display-buttons": { surface: "glass-feedback", field: { x: 0.15, y: 0.2, w: 0.55, h: 0.4 } },
    "motion-curve-gallery": { surface: "motion-fourier", field: { x: 0.15, y: 0.2, w: 0.55, h: 0.4 } },
    "motion-springs": { surface: "motion-fourier", field: { x: 0.15, y: 0.2, w: 0.55, h: 0.4 } },
    "substrates-fourier-field": { surface: "motion-fourier", field: { x: 0.15, y: 0.16, w: 0.55, h: 0.42 } },
    "substrates-glass-material": { surface: "dark-register", field: { x: 0.15, y: 0.2, w: 0.55, h: 0.42 } },
    "navigation-tabs": { surface: "tabs-segmented", field: { x: 0.12, y: 0.2, w: 0.55, h: 0.42 } },
    "foundations-intro": { surface: "page-band", field: { x: 0.15, y: 0.14, w: 0.52, h: 0.42 } },
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
    const ed = pngRegionDelta(abs, edgeRegion(field), field);
    if (ed) stats.edgeDelta = ed.dE;
    const corner = pngRegionStats(abs, CORNER);
    if (corner) stats.cornerL = corner.meanL;

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
            const path = `${route}-${engine}-${mode}-desktop-full.png`;
            const r = readOne(path, cfg.field);
            total++;
            if (r.state === "warm") warm++;
            const s = r.stats;
            rows.push({
                route,
                surface: cfg.surface,
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
    const mark = r.state === "warm" ? "OK " : "XX ";
    console.log(
        `${mark}${r.route.padEnd(26)} ${r.engine.padEnd(6)} ${r.mode.padEnd(5)} dom=${String(r.dom).padEnd(8)} warmF=${r.warmFrac} coldF=${r.coldFrac} neutF=${r.neutralFrac} chroma=${r.chroma} L=${r.meanL} edge=${r.edge} cL=${r.cornerL} ${r.dims} full=${r.fullPass ? "OK" : "xx"}`,
    );
    if (r.paintReasons) for (const rr of r.paintReasons) console.log(`      -> ${rr}`);
}
console.log(`\nPAINT (dominant-hue) WARM: ${warm}/${total} route-region composites read all-warm`);
writeFileSync(`${OUT}/analysis.json`, JSON.stringify({ warm, total, band: WARM_BAND, rows }, null, 2));
