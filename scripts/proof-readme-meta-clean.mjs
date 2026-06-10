// proof-readme-meta-clean.mjs — AY.W-DOC1
//
// Fail-closed gate over the four shipped component READMEs + CLAUDE.md + glass.css.
// Asserts the META-STRIP (no provenance / wave-arc / restoration prose), the
// RESEARCH-CITATION presence (each lane cites its on-disk research artefact), and
// the DOC-SYNC subset (the D5 ledger rows grep can hold honest — gate names, prop
// unions, token cohorts, the palette literal — read LIVE from package.json/source
// so the gate cannot itself go stale).

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact, snapshotStamp } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_README_META_ARTIFACT", "AY-readme-meta-clean");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

const AURORA = "src/components/custom/aurora/README.md";
const BLOB = "src/components/custom/goo-blob/README.md";
const DOCK = "src/components/custom/dock/README.md";
const CONST = "src/components/custom/constellation/README.md";
const FF = "src/components/custom/fourier-field/README.md";
const FIELD = "src/components/custom/constellation/constellationField.ts";
const CIDX = "src/components/custom/constellation/index.ts";
const CLAUDE = "CLAUDE.md";
const GLASSCSS = "src/styles/glass.css";

// The four README package barrels the gate also head-scans (public surface).
const BARRELS = [
    "src/components/custom/aurora/index.ts",
    "src/components/custom/goo-blob/index.ts",
    "src/components/custom/dock/index.ts",
    "src/components/custom/constellation/index.ts",
];

const WAVE_TAG = /A[VWX]\.W\d+/;

// Strip the gate-table / proof-table region from a README before the prose scan.
// The gate-table rows legitimately carry `shipped (AV.W1)` provenance (a capability
// ledger) — they are fenced out by the `## Gates` / `## proof` section marker.
function stripGateTable(md) {
    const lines = md.split("\n");
    const out = [];
    let inGateTable = false;
    for (const line of lines) {
        if (/^##+\s+(Gates|proof)/i.test(line)) inGateTable = true;
        else if (/^##+\s/.test(line) && inGateTable) inGateTable = false;
        if (!inGateTable) out.push(line);
    }
    return out.join("\n");
}

function run() {
    const violations = [];
    const facts = {};

    // ── Clause 1 — META-STRIP (deletion proof) ──────────────────────────────
    // ZERO wave-tag in README PROSE (gate-table fenced out) or scanned file-heads.
    const readmes = { aurora: AURORA, blob: BLOB, dock: DOCK, constellation: CONST };
    for (const [name, rel] of Object.entries(readmes)) {
        const md = read(rel);
        if (md == null) {
            violations.push(`${rel} is missing`);
            continue;
        }
        const prose = stripGateTable(md);
        const tagMatch = prose.match(new RegExp(WAVE_TAG.source, "g"));
        if (tagMatch) {
            violations.push(
                `${name}/README.md PROSE carries tranche-letter tag(s): ${[...new Set(tagMatch)].join(", ")}`
            );
        }
    }

    // The provenance-blockquote signature must be GONE.
    const provSig =
        /authored but GATED-NOT-LANDED|perfection arc landed across|completes the abstraction|consumer #2 that adopts/;
    for (const [name, rel] of Object.entries(readmes)) {
        const md = read(rel) ?? "";
        if (provSig.test(md)) {
            violations.push(`${name}/README.md still carries the provenance-blockquote signature`);
        }
    }

    // File-head doc-comments (engine module + the four barrels) must be tag-clean.
    for (const rel of [FIELD, CIDX, ...BARRELS]) {
        const src = read(rel);
        if (src == null) continue;
        const head = src.split("\n").slice(0, 1).join("\n");
        if (WAVE_TAG.test(head)) {
            violations.push(`${rel} file-head doc-comment carries a tranche-letter tag`);
        }
    }
    facts.metaStripScanned = Object.keys(readmes).length + 2 + BARRELS.length;

    // ── Clause 2 — W14-RECONCILE (regression guard) ─────────────────────────
    const aurora = read(AURORA) ?? "";
    const w14Bad = [
        /restoration wave is AX\.W14/,
        /until the W14 .*finalize/,
        /W14 follow-up/,
        /W14 painterly finalize/,
    ];
    for (const re of w14Bad) {
        if (re.test(aurora)) violations.push(`aurora/README.md re-introduced a stale W14 line: ${re}`);
    }

    // ── Clause 3 — STATUS-CLEAN (deletion proof) ────────────────────────────
    const statusBad = /\(planned — |\(coming — |\bTODO\b|will ship/;
    const allowlist = [/no longer "planned"/, /coming alive/];
    for (const [name, rel] of Object.entries(readmes)) {
        const md = read(rel) ?? "";
        for (const line of md.split("\n")) {
            if (statusBad.test(line) && !allowlist.some((a) => a.test(line))) {
                violations.push(`${name}/README.md carries status-stale prose: "${line.trim().slice(0, 70)}"`);
            }
        }
    }

    // ── Clause 4 — RESEARCH-CITATION (presence proof) ───────────────────────
    if (!/RESEARCH\.md/.test(aurora)) violations.push("aurora/README.md does not cite ./RESEARCH.md");
    if (!existsSync(resolve(ROOT, "src/components/custom/aurora/RESEARCH.md")))
        violations.push("aurora/RESEARCH.md does not exist on disk (dangling citation)");
    const blob = read(BLOB) ?? "";
    if (!/RESEARCH\.md/.test(blob)) violations.push("goo-blob/README.md does not cite ./RESEARCH.md");
    if (!existsSync(resolve(ROOT, "src/components/custom/goo-blob/RESEARCH.md")))
        violations.push("goo-blob/RESEARCH.md does not exist on disk (dangling citation)");
    const dock = read(DOCK) ?? "";
    if (!/dock-facilities-corpus|dock-liquidglass/.test(dock))
        violations.push("dock/README.md does not cite the dock research corpus");
    if (!/accessed 2026-06-06/.test(dock))
        violations.push("dock/README.md lost its cited-source access date");
    const constMd = read(CONST) ?? "";
    if (!/## References/.test(constMd)) violations.push("constellation/README.md has no ## References heading");
    if (!/Garey/.test(constMd)) violations.push("constellation/README.md lost the proximity-graph reference");

    // ── Clause 5 — DOC-SYNC (source ↔ doc) ──────────────────────────────────
    // aurora: no bare ACES; PBR-Neutral present.
    {
        const prose = stripGateTable(aurora);
        // ACES is allowed only as the kept GLSL slot-name parenthetical.
        const acesHits = prose.match(/ACES/g) ?? [];
        const slotNameForm = /slot-name `aces\(\)`/.test(prose) || /keeps the slot-name `aces\(\)`/.test(prose);
        if (acesHits.length && !slotNameForm) {
            violations.push(`aurora/README.md carries a bare ACES token (${acesHits.length}) outside the aces() slot-name note`);
        }
        if (!/PBR-Neutral/.test(aurora)) violations.push("aurora/README.md does not name PBR-Neutral");
        for (const m of ["vangogh", "oil-pastel", "crayon"]) {
            if (!new RegExp(`\`${m}\``).test(aurora)) violations.push(`aurora/README.md mediums missing ${m}`);
        }
        for (const f of ["atoms.ts", "configSource.ts", "cursorModel.ts", "frameLoop.ts", "glSetup.ts"]) {
            if (!aurora.includes(f)) violations.push(`aurora/README.md architecture tree missing ${f}`);
        }
        // No retired WebGPU references.
        if (/w3\.org\/TR\/WGSL|webgpufundamentals\.org/.test(aurora))
            violations.push("aurora/README.md still links the retired WGSL/WebGPU references");
        // The 7 shipped gates named.
        for (const g of [
            "aurora-fill-resize",
            "aurora-stroke-composite",
            "aurora-painterly-statistics",
            "aurora-arresting-ref",
            "aurora-arresting",
            "aurora-chrome-idiomatic",
            "aurora-preset-roster",
        ]) {
            if (!aurora.includes(`proof:${g}`)) violations.push(`aurora/README.md gate table missing proof:${g}`);
        }
    }

    // dock: no VT-driver / motion-resize claim; dockMorphContext; card shape; layout prop.
    {
        if (/document\.startViewTransition/.test(dock))
            violations.push("dock/README.md still claims a startViewTransition driver");
        if (/:active-view-transition-type/.test(dock))
            violations.push("dock/README.md still claims typed View-Transitions");
        if (/proof:dock-motion-single-source|proof:dock-motion-parity/.test(dock))
            violations.push("dock/README.md still lists a retired dock-motion gate");
        // --dock-motion-resize is allowed ONLY in a "NO --dock-motion-resize" negation.
        for (const line of dock.split("\n")) {
            if (/--dock-motion-resize/.test(line) && !/NO `?--dock-motion-resize/.test(line)) {
                violations.push(`dock/README.md asserts the retired --dock-motion-resize clock: "${line.trim().slice(0, 60)}"`);
            }
        }
        if (!/dockMorphContext\.ts/.test(dock)) violations.push("dock/README.md does not name dockMorphContext.ts as the DOCK_SPRING home");
        if (!/"card"/.test(dock)) violations.push('dock/README.md shape row missing "card"');
        if (!/`layout`/.test(dock)) violations.push("dock/README.md missing the layout prop row");
        // Every shipped proof:dock-* gate name read LIVE from package.json must appear.
        const pkg = read("package.json") ?? "{}";
        const shippedDockGates = [...new Set((pkg.match(/proof:dock-[a-z-]+/g) ?? []))];
        facts.shippedDockGates = shippedDockGates.length;
        const missingDockGates = shippedDockGates.filter((g) => !dock.includes(g));
        // The README names the load-bearing gate family; a handful of internal CSS-split
        // gates (dock-css-carve/dock-css-split/dock-items-lag-capture) are build-infra,
        // not the falsifiable-contract table — exempt those three.
        const infraExempt = new Set(["proof:dock-css-carve", "proof:dock-css-split", "proof:dock-items-lag-capture"]);
        const realMissing = missingDockGates.filter((g) => !infraExempt.has(g));
        if (realMissing.length)
            violations.push(`dock/README.md gate table missing shipped gate(s): ${realMissing.join(", ")}`);
    }

    // constellation: props table has wander + gravityWell; the 9 numeric tokens.
    {
        if (!/`wander`/.test(constMd)) violations.push("constellation/README.md props missing wander row");
        if (!/`gravityWell`/.test(constMd)) violations.push("constellation/README.md props missing gravityWell row");
        const tokensCss = read("src/styles/tokens.css") ?? "";
        const cohort = [...new Set((tokensCss.match(/--constellation-(?:warp|well|wander)-[a-z-]+/g) ?? []))];
        facts.constellationCohort = cohort.length;
        const missingTok = cohort.filter((t) => !constMd.includes(t));
        if (missingTok.length)
            violations.push(`constellation/README.md tokens section missing: ${missingTok.join(", ")}`);
    }

    // CLAUDE.md: no phantom composable / removed gate; keyframes peer matches; luma RESERVE.
    {
        const cm = read(CLAUDE) ?? "";
        if (/useDockTransition/.test(cm)) violations.push("CLAUDE.md names phantom useDockTransition");
        if (/proof:glass-one-model/.test(cm)) violations.push("CLAUDE.md names removed proof:glass-one-model");
        if (/useSpringOrchestrator/.test(cm)) violations.push("CLAUDE.md names phantom useSpringOrchestrator");
        if (!/\^2\.2\.0 \\\|\\\| \^3\.0\.0 \\\|\\\| \^4\.0\.0/.test(cm) && !/\^2\.2\.0 \|\| \^3\.0\.0 \|\| \^4\.0\.0/.test(cm))
            violations.push("CLAUDE.md keyframes peer-range line does not carry ^4.0.0");
        if (!/RESERVED/.test(cm) || !/no observer ships|NO observer ships/i.test(cm)) {
            // luma RESERVE sentinel
            if (/ships demo-private/.test(cm) && /glass-backdrop-luma/.test(cm))
                violations.push("CLAUDE.md still claims --glass-backdrop-luma ships demo-private");
        }
    }

    // goo-blob: documented paletteStops literal equals the types.ts shipped array.
    {
        const types = read("src/components/custom/goo-blob/types.ts") ?? "";
        const m = types.match(/paletteStops:\s*\[([^\]]+)\]/);
        if (m) {
            const stops = [...m[1].matchAll(/#[0-9a-fA-F]{3,8}/g)].map((x) => x[0].toLowerCase());
            facts.shippedStops = stops;
            for (const s of stops) {
                if (!blob.toLowerCase().includes(s))
                    violations.push(`goo-blob/README.md default paletteStops out of sync — missing ${s}`);
            }
        }
    }

    // glass.css: the plate-in-plate re-scope sentinel; no un-scoped bare rule.
    {
        const css = read(GLASSCSS) ?? "";
        if (!/PLATE-in-PLATE/.test(css))
            violations.push("glass.css header missing the PLATE-in-PLATE re-scope sentinel");
        if (/A glass surface nested INSIDE another glass surface is a discipline violation/.test(css))
            violations.push("glass.css header still carries the un-scoped no-glass-on-glass bare form");
    }

    // fourier-field: light-mode caveat OR the verified survival claim.
    {
        const ff = read(FF) ?? "";
        if (!/Caveat:|light-mode|on cream/.test(ff))
            violations.push("fourier-field/README.md missing the light-mode survival caveat (W-FF2 D5 light floor did not land)");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:readme-meta-clean",
        facts,
        violations,
    });

    console.log("proof:readme-meta-clean — the four shipped READMEs + CLAUDE.md + glass.css meta-free, research-cited, source-synced");
    console.log(`  meta-strip surfaces scanned : ${facts.metaStripScanned}`);
    console.log(`  shipped dock gates (live)   : ${facts.shippedDockGates ?? "?"}`);
    console.log(`  constellation token cohort  : ${facts.constellationCohort ?? "?"}/9`);
    console.log(`  blob shipped stops          : ${(facts.shippedStops ?? []).join(", ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
