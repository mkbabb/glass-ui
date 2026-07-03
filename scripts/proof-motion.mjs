// proof:motion — BG.W-DEAD-COMPOSABLE-CUT (F5 Motion): the dead-composable cut is COMPLETE.
//
// The F5 motion band carried FIVE dead composables + one dead weld that shipped with
// their own gates + "≥2-consumer" evidence docs while their ACTUAL binary-consumer count
// was 0-1 (the shelf-ware class the SOTA fewer-sharper-primitives law forbids):
//   • useHaptic (core/) — the navigator.vibrate wrapper, no live consumer.
//   • useCelebrationBurst (+ jubilance.css) — the earned-petal bloom, no live consumer.
//   • useVizChoreography (glass/) — the viz entrance-choreography leaf, spec-only.
//   • useLiquidMorph (+ liquid-morph.css) — the BE liquid-dock spike; the composable had
//     ZERO importer, the CSS is demo-only (MOVED to demo/ — the god-module #1 drain).
//   • useDockContextSilhouette — the BE dock context→silhouette state machine, its only
//     demo (AppSwitcher.vue) reads useBloomUp not this; no live consumer (the #8 drain).
//   • useMorphField() — the WELD weld body had ZERO callers; only its motion-named
//     `MORPH_SIGNATURES` DATA map was live, so it is GUTTED to morphSignatures.ts (the
//     DATA kept on the barrel; morph-field.css deleted).
//
// This gate LOCKS the DEFINITION-ABSENCE: each dead file gone, no surviving import, the
// paired CSS out of src/ + unwired from the cascade, the DATA survives on the barrel, the
// three lying evidence docs deleted, the retired subject-gates deleted — AND the
// NAME-COLLISION FENCE (proof:liquid-morph, the BC dock-morph teardrop gate, is DISTINCT
// from useLiquidMorph and MUST survive untouched).
//
// SELF-PROVING: the detector runs a second time against a synthetic state that re-plants a
// dead composable (file present + a live import), and asserts it FLAGS — so the gate's
// teeth cannot silently rot (the born-RED→GREEN discipline, the house comment-strip-free
// pure-detector pattern).
//
// Device-free. Tags ["local","ci","release"].

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:motion";

// ── The dead composables (DEFINITION-ABSENT) ───────────────────────────────────
const DEAD = [
    { name: "useHaptic", path: "src/composables/motion/core/useHaptic.ts", base: "useHaptic" },
    { name: "useCelebrationBurst", path: "src/composables/motion/useCelebrationBurst.ts", base: "useCelebrationBurst" },
    { name: "useVizChoreography", path: "src/composables/glass/useVizChoreography.ts", base: "useVizChoreography" },
    { name: "useLiquidMorph", path: "src/composables/motion/useLiquidMorph.ts", base: "useLiquidMorph" },
    { name: "useDockContextSilhouette", path: "src/components/custom/dock/composables/useDockContextSilhouette.ts", base: "useDockContextSilhouette" },
    // GUTTED — the weld function is gone; only morphSignatures.ts survives (M3).
    { name: "useMorphField", path: "src/composables/motion/useMorphField.ts", base: "useMorphField" },
];

// The paired CSS that must leave src/ (deleted or moved to demo/).
const DEAD_SRC_CSS = [
    "src/styles/jubilance.css",
    "src/styles/motion/morph-field.css",
    "src/styles/glass/liquid-morph.css",
];

// The three lying "≥2-consumer" evidence docs (deleted with their subjects — the
// proof:consumer-evidence-live forcing rule keeps this consistent).
const DEAD_EVIDENCE = [
    "docs/consumer-evidence/use-haptic.md",
    "docs/consumer-evidence/use-celebration-burst.md",
    "docs/consumer-evidence/use-viz-choreography.md",
];

// The retired subject-gates (their subject composable is deleted — a surviving gate REDs).
const DEAD_GATES = [
    "scripts/proof-haptic.mjs",
    "scripts/proof-celebration-burst.mjs",
    "scripts/proof-viz-choreography.mjs",
    "scripts/proof-dock-context.mjs",
];

// ── The import corpus — every src/ + demo/ .ts/.vue/.mjs source (the grep surface for a
//    surviving live import of a deleted module). ──────────────────────────────────
const CORPUS_ROOTS = ["src", "demo"];
const CORPUS_EXTS = new Set([".ts", ".vue", ".mjs"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);

function collectCorpus() {
    const out = [];
    const walk = (dir) => {
        let entries;
        try {
            entries = readdirSync(dir, { withFileTypes: true });
        } catch {
            return;
        }
        for (const e of entries) {
            if (IGNORE_DIRS.has(e.name)) continue;
            const full = resolve(dir, e.name);
            if (e.isDirectory()) walk(full);
            else if (e.isFile() && CORPUS_EXTS.has(extname(e.name))) {
                out.push({ path: full.slice(ROOT.length + 1), content: readFileSync(full, "utf8") });
            }
        }
    };
    for (const r of CORPUS_ROOTS) walk(resolve(ROOT, r));
    return out;
}

// ── The pure detector — takes an environment so the self-test can inject a synthetic
//    mutated state (a re-planted dead composable). ─────────────────────────────────
function detect({ existsFn, readFn, corpus }) {
    const V = [];

    // M1 — the dead composables are DEFINITION-ABSENT + no live import survives.
    for (const c of DEAD) {
        if (existsFn(c.path))
            V.push(`M1: ${c.name} — ${c.path} still on disk (must be DEFINITION-ABSENT)`);
        const spec = new RegExp(`from\\s+["'][^"']*${c.base}["']`);
        for (const f of corpus) {
            if (spec.test(f.content))
                V.push(`M1: ${c.name} — a live import of the deleted module survives in ${f.path}`);
        }
    }

    // M2 — the paired CSS left src/ AND the cascade + partition-manifest are unwired.
    for (const css of DEAD_SRC_CSS) {
        if (existsFn(css))
            V.push(`M2: paired CSS still in src/ (${css}) — must be deleted or moved to demo/`);
    }
    const indexCss = readFn("src/styles/index.css");
    if (/@import\s+["']\.\/jubilance\.css["']/.test(indexCss))
        V.push("M2: jubilance.css still @import-ed in styles/index.css");
    if (/@import\s+["']\.\/motion\/morph-field\.css["']/.test(indexCss))
        V.push("M2: motion/morph-field.css still @import-ed in styles/index.css");
    const partition = readFn("src/styles/critical-partition.mjs");
    if (/["']jubilance\.css["']/.test(partition))
        V.push("M2: jubilance.css still enrolled in critical-partition DEFERRED_PARTIALS");
    if (/["']motion\/morph-field\.css["']/.test(partition))
        V.push("M2: motion/morph-field.css still enrolled in critical-partition DEFERRED_PARTIALS");

    // M3 — the GUT: MORPH_SIGNATURES survives on morphSignatures.ts + the root barrel.
    if (!existsFn("src/composables/motion/morphSignatures.ts"))
        V.push("M3: morphSignatures.ts (the gutted DATA leaf) is missing");
    const sig = readFn("src/composables/motion/morphSignatures.ts");
    if (!/export const MORPH_SIGNATURES\b/.test(sig))
        V.push("M3: morphSignatures.ts does not export MORPH_SIGNATURES");
    if (!/export type MorphSignatureName\b/.test(sig))
        V.push("M3: morphSignatures.ts does not export the MorphSignatureName type");
    const rootBarrel = readFn("src/index.ts");
    if (!/MORPH_SIGNATURES[\s\S]{0,240}from\s+["']\.\/composables\/motion\/morphSignatures["']/.test(rootBarrel))
        V.push("M3: the root barrel does not re-export MORPH_SIGNATURES from ./composables/motion/morphSignatures");

    // M4 — the three lying evidence docs are deleted.
    for (const d of DEAD_EVIDENCE) {
        if (existsFn(d)) V.push(`M4: lying consumer-evidence doc still present (${d})`);
    }

    // M5 — NAME-COLLISION FENCE: proof:liquid-morph (the BC dock-morph teardrop gate, a
    //      DISTINCT concern from the deleted useLiquidMorph composable) MUST survive.
    if (!existsFn("scripts/proof-liquid-morph.mjs"))
        V.push(
            "M5: NAME-COLLISION FENCE breached — scripts/proof-liquid-morph.mjs (the BC.W-LIQUID-MORPH dock-morph gate, NOT the deleted useLiquidMorph composable) must NOT be touched",
        );

    // M6 — the retired subject-gates are deleted (their subject composable is gone).
    for (const g of DEAD_GATES) {
        if (existsFn(g))
            V.push(`M6: retired subject-gate still present (${g}) — its subject composable is DEFINITION-ABSENT`);
    }

    return V;
}

// ── The live disk run ───────────────────────────────────────────────────────────
const diskExists = (rel) => existsSync(resolve(ROOT, rel));
const diskRead = (rel) => (existsSync(resolve(ROOT, rel)) ? readFileSync(resolve(ROOT, rel), "utf8") : "");
const corpus = collectCorpus();

const violations = detect({ existsFn: diskExists, readFn: diskRead, corpus });

// ── The self-test bite — re-plant a dead composable (file present + a live import) and
//    assert the detector FLAGS it (the teeth-are-real proof). ─────────────────────
const synthCorpus = [
    ...corpus,
    {
        path: "src/_synthetic-motion-regression.ts",
        content: 'import { useHaptic } from "./composables/motion/core/useHaptic";\n',
    },
];
const synthExists = (rel) =>
    rel === "src/composables/motion/core/useHaptic.ts" ? true : diskExists(rel);
const synthViolations = detect({ existsFn: synthExists, readFn: diskRead, corpus: synthCorpus });
const selfTestFlags = synthViolations.length > violations.length;
if (!selfTestFlags) {
    console.error(
        "proof:motion — SELF-TEST FAILED: the detector did NOT flag a re-planted dead composable (useHaptic). The gate's teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── Report ──────────────────────────────────────────────────────────────────────
console.log("proof:motion — the F5 dead-composable cut is COMPLETE (BG.W-DEAD-COMPOSABLE-CUT)");
console.log(`  dead composables      : ${DEAD.map((d) => d.name).join(", ")}`);
console.log(`  paired CSS out of src/: ${DEAD_SRC_CSS.length} (jubilance · morph-field deleted; liquid-morph → demo/)`);
console.log(`  gutted DATA leaf      : morphSignatures.ts (MORPH_SIGNATURES on the barrel)`);
console.log(`  evidence docs deleted : ${DEAD_EVIDENCE.length}`);
console.log(`  retired gates deleted : ${DEAD_GATES.length}`);
console.log(`  name-collision fence  : proof-liquid-morph.mjs ${diskExists("scripts/proof-liquid-morph.mjs") ? "PRESENT (untouched)" : "MISSING"}`);
console.log(`  self-test (bite proof): OK — a re-planted dead composable is flagged`);
console.log(`  corpus scanned        : ${corpus.length} src/+demo/ sources`);
console.log(`  violations            : ${violations.length}`);
for (const m of violations) console.error(`  CUT-INCOMPLETE   ${m}`);

const ARTIFACT = gateArtifactPath("GATE_MOTION_OUT", "BG-motion");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    command: COMMAND,
    dead: DEAD.map((d) => d.name),
    deadSrcCss: DEAD_SRC_CSS,
    deadEvidence: DEAD_EVIDENCE,
    deadGates: DEAD_GATES,
    corpusScanned: corpus.length,
    selfTestFlagged: selfTestFlags,
    violations,
    green: violations.length === 0,
});

if (violations.length > 0) {
    console.error(`proof:motion — ${violations.length} cut-incomplete violation(s); the dead-composable cut is not GREEN.`);
    process.exit(1);
}
process.exit(0);
