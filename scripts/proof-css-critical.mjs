#!/usr/bin/env node
// BB.W-CSS-CRITICAL — proof:css-critical, the render-blocking `/styles` split gate.
//
// THE DEFECT (the AY-measured Shared #1 render-block, ~602ms mobile): the whole
// `@mkbabb/glass-ui/styles` draw ships as ONE monolithic dist/styles/index.css —
// the token cascade + every component SFC scoped rule + the Tailwind utility
// surface — in ONE eager render-blocking <head> stylesheet, the FCP/LCP gate on
// mobile. The FONT split (AM-W1-α) is the only split shipped; the broader
// critical/deferred boundary the `styles-critical-split` disposition book names
// (a standing carry since AT.W0-L4) was never drawn.
//
// THE FIX (the chronic decided, BUILT not re-booked): partition the resolved draw
// at the EXISTING cascade boundary (AY.W-CSS1 thin-root-over-partials) into a small
// CRITICAL above-the-fold subset (./styles/critical → dist/styles/critical.css,
// render-blocking-early — the token cascade + 5-rung glass ladder + typography +
// theme) and a DEFERRED below-the-fold tail (./styles/deferred → dist/styles/
// deferred.css, loaded non-blocking — the component recipes + the SFC scoped
// payload + the components.css utility surface). The union is BYTE-COMPLETE (every
// partial/fold in exactly one bucket) and FOUC-safe (the deferred tail's late
// arrival shifts no above-the-fold pixel). The ./styles union entry STAYS (the
// byte-complete one-import simplicity entry, NOT a back-compat alias).
//
// THIS GATE is the SOURCE/BUILD half — device-free, headless-CI-safe. Four
// falsifiable witnesses:
//   W1 — the split is published: ./styles/critical + ./styles/deferred in
//        package.json exports resolve to emitted dist/styles/{critical,deferred}.css;
//        the ./styles union still resolves index.css (NOT removed).
//   W2 — the union is byte-complete: critical.css's @imports ∪ deferred.css's
//        @imports ≡ the monolith index.css's resolved-draw partial+fold set —
//        every partial/fold in EXACTLY ONE bucket (none dropped, none duplicated);
//        the components.css + ../glass-ui.css folds land in DEFERRED (no leak).
//   W3 — the critical subset is under the recorded gzip ceiling (the resolved
//        consumer draw), the small-above-the-fold-subset bar — a component recipe
//        folded back into critical climbs the ceiling → RED.
//   W4 — the CRITICAL_PARTITION manifest is the SOLE partition source: the build
//        emits both subsets off it, and no second hand-extracted critical block
//        exists outside the manifest-driven emit.
//
// BORN-RED at HEAD: W1-W4 vacuously fail (no subpath in package.json, no
// critical-partition.mjs manifest, no dist/styles/critical.css). FLIPS GREEN on
// the orchestrator build once the split is wired + emitted. The BINDING visual/
// perf truth is the FOUC-safe π + the render-block DELTA (W5,
// tests-visual + W-CSS-CRITICAL-DELTA.md) + the W-LIGHTHOUSE render-block floor
// (W6) — NEVER this gate alone (the BA P-1 source-green/visually-broken close-class).
//
// Reads the BUILT artefact (dist/styles/*.css) — run `npm run build` first.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:css-critical";
const DIST_STYLES = resolve(ROOT, "dist/styles");

const read = (abs) => (existsSync(abs) ? readFileSync(abs, "utf8") : "");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
const facts = {};

// ── Load the boundary manifest (the SOLE partition source) ──────────────────────────
let manifest = null;
const manifestPath = resolve(ROOT, "src/styles/critical-partition.mjs");
try {
    manifest = await import(manifestPath);
} catch {
    manifest = null;
}
facts.manifestExists = manifest !== null;

// Helper: parse a CSS file's top-level @import partial/fold targets + any @source
// directive — the partition SET a subset/monolith carries.
const parseImportSet = (css) => {
    const partials = new Set();
    const folds = new Set();
    let hasSource = false;
    // Strip block comments so an @import/@source mentioned in PROSE is not counted.
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const importRe = /@import\s+["']([^"']+\.css)["']\s*;/g;
    let m;
    while ((m = importRe.exec(stripped))) {
        const ref = m[1];
        // ./<partial>.css are cascade partials; ../glass-ui.css + ./components.css
        // are the build-time folds. Normalize to the bare basename-key so a
        // critical `./tokens.css` and a monolith `./tokens.css` compare equal.
        if (ref.startsWith("../") || ref === "./components.css") folds.add(ref);
        else partials.add(ref.replace(/^\.\//, ""));
    }
    if (/@source\s+["'][^"']+["']\s*;/.test(stripped)) hasSource = true;
    return { partials, folds, hasSource };
};

// ── W1 — the split is published + resolves ──────────────────────────────────────────
const pkg = JSON.parse(read(resolve(ROOT, "package.json")) || "{}");
const exportsMap = pkg.exports ?? {};
const critExport = exportsMap["./styles/critical"];
const defExport = exportsMap["./styles/deferred"];
const unionExport = exportsMap["./styles"];

const critPath = resolve(DIST_STYLES, "critical.css");
const defPath = resolve(DIST_STYLES, "deferred.css");
const indexPath = resolve(DIST_STYLES, "index.css");

const critExportOk = critExport === "./dist/styles/critical.css";
const defExportOk = defExport === "./dist/styles/deferred.css";
const unionStays = unionExport === "./dist/styles/index.css";
const critFileExists = existsSync(critPath);
const defFileExists = existsSync(defPath);
const indexFileExists = existsSync(indexPath);

facts.w1 = {
    critExport,
    defExport,
    unionExport,
    critFileExists,
    defFileExists,
    indexFileExists,
};
add(
    "w1-split-published",
    critExportOk &&
        defExportOk &&
        unionStays &&
        critFileExists &&
        defFileExists &&
        indexFileExists,
    critExportOk &&
        defExportOk &&
        unionStays &&
        critFileExists &&
        defFileExists &&
        indexFileExists
        ? "./styles/critical + ./styles/deferred export to dist/styles/{critical,deferred}.css (both emitted on disk); the ./styles union still resolves dist/styles/index.css (NOT removed)"
        : `the split is NOT fully published — ./styles/critical=${critExport} (file ${critFileExists}), ./styles/deferred=${defExport} (file ${defFileExists}), ./styles union=${unionExport} (file ${indexFileExists}). BORN-RED at HEAD (no subpath, no emitted split — flips GREEN on the orchestrator build).`,
);

// ── W2 — the union is byte-complete (the partition floor) ───────────────────────────
let w2Pass = false;
let w2Detail =
    "BORN-RED — the dist/styles/{critical,deferred}.css subsets do not exist (run the orchestrator build to emit the split)";
if (critFileExists && defFileExists && indexFileExists) {
    const critSet = parseImportSet(read(critPath));
    const defSet = parseImportSet(read(defPath));
    const monoSet = parseImportSet(read(indexPath));

    // The union (partials + folds) must EQUAL the monolith's set, with EMPTY
    // intersection between buckets (every partial/fold in exactly one bucket).
    const unionPartials = new Set([...critSet.partials, ...defSet.partials]);
    const unionFolds = new Set([...critSet.folds, ...defSet.folds]);

    const setEq = (a, b) =>
        a.size === b.size && [...a].every((x) => b.has(x));
    const disjoint = (a, b) => ![...a].some((x) => b.has(x));

    const partialsComplete = setEq(unionPartials, monoSet.partials);
    const foldsComplete = setEq(unionFolds, monoSet.folds);
    const partialsDisjoint = disjoint(critSet.partials, defSet.partials);
    const foldsDisjoint = disjoint(critSet.folds, defSet.folds);

    // The anti-evasion BITE: the SFC-fold (../glass-ui.css) + components.css MUST
    // land in DEFERRED, never critical (a leak fails byte-complete-in-one-bucket).
    const foldsInDeferred =
        defSet.folds.has("../glass-ui.css") &&
        defSet.folds.has("./components.css") &&
        !critSet.folds.has("../glass-ui.css") &&
        !critSet.folds.has("./components.css");
    // The @source content-scan backstop rides DEFERRED, never critical.
    const sourceInDeferred = defSet.hasSource && !critSet.hasSource;

    // Set-difference diffs for the artefact (empty = byte-complete).
    const dropped = [...monoSet.partials].filter((p) => !unionPartials.has(p));
    const dupedPartials = [...critSet.partials].filter((p) => defSet.partials.has(p));

    w2Pass =
        partialsComplete &&
        foldsComplete &&
        partialsDisjoint &&
        foldsDisjoint &&
        foldsInDeferred &&
        sourceInDeferred;
    facts.w2 = {
        critPartials: [...critSet.partials],
        defPartials: [...defSet.partials],
        monoPartials: [...monoSet.partials],
        critFolds: [...critSet.folds],
        defFolds: [...defSet.folds],
        monoFolds: [...monoSet.folds],
        partialsComplete,
        foldsComplete,
        partialsDisjoint,
        foldsDisjoint,
        foldsInDeferred,
        sourceInDeferred,
        dropped,
        dupedPartials,
    };
    w2Detail = w2Pass
        ? `critical (${critSet.partials.size}) ∪ deferred (${defSet.partials.size}) partials ≡ the monolith's ${monoSet.partials.size}-partial set (no rule dropped, none duplicated), the SFC-fold + components.css + @source all land in DEFERRED (no leak into critical)`
        : `the union is NOT byte-complete — partialsComplete=${partialsComplete} foldsComplete=${foldsComplete} disjoint(${partialsDisjoint},${foldsDisjoint}) foldsInDeferred=${foldsInDeferred} sourceInDeferred=${sourceInDeferred}; dropped=[${dropped.join(",")}] duped=[${dupedPartials.join(",")}]`;
}
add("w2-union-byte-complete", w2Pass, w2Detail);

// ── W3 — the critical subset is under the recorded gzip ceiling ─────────────────────
let w3Pass = false;
let w3Detail =
    "BORN-RED — dist/styles/critical.css does not exist (run the orchestrator build)";
if (critFileExists && manifest) {
    // Resolve the critical subset RECURSIVELY (the real consumer first-paint
    // draw — the critical partials' @import roots resolved through their nested
    // tokens/* + glass/* sub-partials). The ceiling is measured on this draw.
    const resolveRecursive = (css, baseDir) =>
        css.replace(/@import\s+["']([^"']+\.css)["']\s*;/g, (m, ref) => {
            const target = resolve(baseDir, ref);
            if (!existsSync(target)) return m;
            const dir = target.slice(0, target.lastIndexOf("/"));
            return `\n${resolveRecursive(readFileSync(target, "utf8"), dir)}\n`;
        });
    const draw = resolveRecursive(read(critPath), DIST_STYLES);
    const rawBytes = Buffer.byteLength(draw);
    const gzipBytes = gzipSync(draw).length;
    const ceiling = manifest.CRITICAL_GZIP_CEILING;
    w3Pass = gzipBytes <= ceiling;
    facts.w3 = { rawBytes, gzipBytes, ceiling };
    w3Detail = w3Pass
        ? `the critical subset resolves to gzip ${gzipBytes} (raw ${rawBytes}) ≤ the recorded ceiling ${ceiling} — the small above-the-fold token+ladder+type surface, NOT the component-recipe tail`
        : `the critical subset gzip ${gzipBytes} EXCEEDS the recorded ceiling ${ceiling} (raw ${rawBytes}) — a component recipe folded back into critical (the revert-toward-monolith bite). Re-base via --rebaseline with a recorded rationale, never silently.`;
}
add("w3-critical-under-ceiling", w3Pass, w3Detail);

// ── W4 — the manifest is the SOLE partition source ──────────────────────────────────
// (a) the manifest exists + carries the two non-overlapping bucket lists; (b) the
// build reads it (vite.style-assets.ts imports the manifest + emits off it); (c) no
// second hand-extracted critical block exists outside the manifest-driven emit.
let w4Pass = false;
let w4Detail = "BORN-RED — src/styles/critical-partition.mjs does not exist";
if (manifest) {
    const critList = manifest.CRITICAL_PARTIALS ?? [];
    const defList = manifest.DEFERRED_PARTIALS ?? [];
    const listsNonEmpty = critList.length > 0 && defList.length > 0;
    const listsDisjoint = !critList.some((p) => defList.includes(p));

    // (b) the build reads the manifest off the single source.
    const viteSrc = read(resolve(ROOT, "vite.style-assets.ts"));
    const buildReadsManifest =
        /from\s+["']\.\/src\/styles\/critical-partition\.mjs["']/.test(viteSrc) &&
        /emitCriticalDeferredSplit/.test(viteSrc);

    // (c) no forked hand-extracted critical block — a second critical.css-shaped
    // authoring under src/styles/ (the manifest + the dist emit are the ONLY two
    // critical-named artefacts; a src/styles/critical.css authored by hand is a fork).
    const forkedCriticalSrc = existsSync(resolve(ROOT, "src/styles/critical.css"));
    const forkedDeferredSrc = existsSync(resolve(ROOT, "src/styles/deferred.css"));

    w4Pass =
        listsNonEmpty &&
        listsDisjoint &&
        buildReadsManifest &&
        !forkedCriticalSrc &&
        !forkedDeferredSrc;
    facts.w4 = {
        critList: [...critList],
        defList: [...defList],
        listsNonEmpty,
        listsDisjoint,
        buildReadsManifest,
        forkedCriticalSrc,
        forkedDeferredSrc,
    };
    w4Detail = w4Pass
        ? `the CRITICAL_PARTITION manifest carries the two disjoint bucket lists (critical ${critList.length} / deferred ${defList.length}), vite.style-assets.ts imports it + emits off emitCriticalDeferredSplit, and NO forked hand-extracted critical/deferred src block exists`
        : `the manifest is NOT the sole source — listsNonEmpty=${listsNonEmpty} disjoint=${listsDisjoint} buildReadsManifest=${buildReadsManifest} forkedCriticalSrc=${forkedCriticalSrc} forkedDeferredSrc=${forkedDeferredSrc}`;
}
add("w4-manifest-single-source", w4Pass, w4Detail);

// ── The FOUC-safe π + the render-block DELTA are wired (the BINDING close) ───────────
add(
    "delta-capture-exists",
    existsSync(resolve(ROOT, "docs/tranches/BB/audit/visual/W-CSS-CRITICAL-DELTA.md")),
    "docs/tranches/BB/audit/visual/W-CSS-CRITICAL-DELTA.md exists (the render-block before/after + the FOUC-safe critical-only-vs-both above-the-fold pixel-stability pair, both modes, AZ-form freshness headers — the cardinal-lesson on-disk artefact; the render-block FLOOR is W-LIGHTHOUSE's W3-arm-1 gate)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:css-critical — the render-blocking /styles split gate (BB.W-CSS-CRITICAL)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_CSS_CRITICAL_OUT", "BB-css-critical");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:css-critical",
    command: COMMAND,
    note: "SOURCE/BUILD arm — reads dist/styles/*.css (run `npm run build` first). Born-RED at HEAD (no split exists). The BINDING visual/perf truth is the FOUC-safe π + the render-block DELTA (W5) + the W-LIGHTHOUSE render-block floor (W6, proof:lighthouse W3-arm-1) — never this gate alone (the BA P-1 source-green/visually-broken close-class fix).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:css-critical] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:css-critical] the /styles split is SOUND — the resolved draw is partitioned at the cascade boundary into a critical above-the-fold subset + a deferred tail off the CRITICAL_PARTITION manifest, the union is byte-complete (every partial/fold in exactly one bucket, the SFC-fold + components.css in DEFERRED), the critical subset is under the recorded gzip ceiling, and the ./styles union stays. The FOUC-safe π + the W-LIGHTHOUSE render-block floor prove the split WON.",
);
