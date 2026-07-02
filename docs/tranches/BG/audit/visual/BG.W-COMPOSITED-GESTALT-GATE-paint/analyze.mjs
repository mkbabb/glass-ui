// BG.W-COMPOSITED-GESTALT-GATE — the dominant-hue paint judgment (FRESH re-judge).
// For each enrolled roster surface × {light,dark} × {chrome,safari}, read the composited
// FIELD region through the SAME kernel proof:warm-identity uses (pngRegionHueHistogram +
// warmIdentityVerdict) with the CURRENT (post paint-fix / roster-recalibrated) probes, and
// verify the region reads all-warm. NON-AUTHORING paint judge.
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";
import {
    isRealPng,
    pngDimensions,
    pngRegionHueHistogram,
    pngRegionStats,
    pngRegionDelta,
} from "file:///Users/mkbabb/Programming/glass-ui/scripts/reflect-capture-verify.mjs";
import { warmIdentityVerdict } from "file:///Users/mkbabb/Programming/glass-ui/scripts/lib/paint-arm.mjs";

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-paint";

// The WARM_BAND — verbatim from scripts/proof-warm-identity.mjs (the operative band).
const WARM_BAND = {
    warmFractionFloor: 0.55,
    chromaCeiling: 0.3,
    edgeCastCeiling: 0.16,
    topBarCeiling: 0.14,
    cornerClipFloor: 0.04,
};
const MIN_W = 320,
    MIN_H = 320;

// surface -> { captureSlug, field probe, optional topbar } — verbatim from the CURRENT
// bg-gestalt-roster.md rows (post paint-fix 5eb1933d + roster recalibration).
const SURFACES = {
    dock: {
        slug: "dock-overview",
        field: { x: 0.18, y: 0.5, w: 0.2, h: 0.12 },
        topbar: { x: 0.52, y: 0.0, w: 0.46, h: 0.05 },
    },
    "configurators-goo": {
        slug: "substrates-blob",
        field: { x: 0.6, y: 0.3, w: 0.18, h: 0.1 },
    },
    aurora: { slug: "substrates-aurora", field: { x: 0.2, y: 0.2, w: 0.6, h: 0.5 } },
    "glass-feedback": {
        slug: "feedback-toast",
        field: { x: 0.45, y: 0.4, w: 0.14, h: 0.12 },
    },
    shell: { slug: "foundations-intro", field: { x: 0.15, y: 0.1, w: 0.2, h: 0.12 } },
    "motion-fourier": {
        slug: "motion-curve-gallery",
        field: { x: 0.6, y: 0.28, w: 0.18, h: 0.12 },
    },
    "dark-register": {
        slug: "substrates-glass-material",
        field: { x: 0.18, y: 0.4, w: 0.18, h: 0.14 },
    },
    "tabs-segmented": {
        slug: "navigation-tabs",
        field: { x: 0.12, y: 0.6, w: 0.3, h: 0.07 },
    },
    "page-band": {
        slug: "foundations-intro",
        field: { x: 0.18, y: 0.2, w: 0.18, h: 0.12 },
        topbar: { x: 0.52, y: 0.0, w: 0.46, h: 0.05 },
    },
};

function edgeRegion(field) {
    return { x: field.x, y: field.y, w: Math.min(0.02, field.w), h: field.h };
}
const CORNER = { x: 0, y: 0, w: 0.04, h: 0.04 };

function readOne(path, field, topbar) {
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
    if (topbar) {
        const td = pngRegionDelta(abs, topbar, field);
        if (td) stats.topDelta = td.dE;
    }
    const corner = pngRegionStats(abs, CORNER);
    if (corner) stats.cornerL = corner.meanL;
    const verdict = warmIdentityVerdict(stats, WARM_BAND);
    return { state: verdict.pass ? "warm" : "not-warm", stats, verdict, dims };
}

const rows = [];
let warm = 0,
    total = 0;
for (const [surface, cfg] of Object.entries(SURFACES)) {
    for (const engine of ["chrome", "safari"]) {
        for (const mode of ["light", "dark"]) {
            const path = `${cfg.slug}-${engine}-${mode}-desktop-full.png`;
            const r = readOne(path, cfg.field, cfg.topbar ?? null);
            total++;
            if (r.state === "warm") warm++;
            const s = r.stats;
            rows.push({
                surface,
                slug: cfg.slug,
                engine,
                mode,
                state: r.state,
                dom: s?.dominantFamily,
                warmFrac: s ? +s.warmFraction.toFixed(3) : null,
                coldFrac: s ? +s.coldFraction.toFixed(3) : null,
                chroma: s ? +s.meanChroma.toFixed(4) : null,
                meanL: s ? +s.meanL.toFixed(3) : null,
                edge: s?.edgeDelta != null ? +s.edgeDelta.toFixed(3) : null,
                top: s?.topDelta != null ? +s.topDelta.toFixed(3) : null,
                cornerL: s?.cornerL != null ? +s.cornerL.toFixed(3) : null,
                dims: r.dims ? `${r.dims.w}x${r.dims.h}` : null,
                reasons: r.verdict && !r.verdict.pass ? r.verdict.reasons : undefined,
            });
        }
    }
}

for (const r of rows) {
    const mark = r.state === "warm" ? "✓" : "✗";
    console.log(
        `${mark} ${r.surface.padEnd(18)} ${r.engine.padEnd(6)} ${r.mode.padEnd(5)} dom=${String(r.dom).padEnd(8)} warmF=${r.warmFrac} coldF=${r.coldFrac} chroma=${r.chroma} L=${r.meanL} edge=${r.edge} top=${r.top} cL=${r.cornerL} ${r.dims}`,
    );
    if (r.reasons) for (const rr of r.reasons) console.log(`      ↳ ${rr}`);
}
console.log(`\nWARM: ${warm}/${total} composites read all-warm`);
writeFileSync(`${OUT}/analysis.json`, JSON.stringify({ warm, total, rows }, null, 2));
