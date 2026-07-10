#!/usr/bin/env node
// BG.W-GOODOT-PRUNE — proof:viz-hybrid, REWRITTEN in place onto a DEFINITION-ABSENT survivor
// tooth (the 6.7 "rewritten, not de-registered" discipline — a retired gate is REWRITTEN to
// assert the absence, NEVER silently de-registered; inv-11 forbids a silent prune).
//
// THE PRUNE. `goo-dot-matrix` (the BC.W-VIZ-HYBRID goo+dot-matrix HYBRID) is RETIRED with
// rationale at BG.W-GOODOT-PRUNE: a demonstration HYBRID that earned NO external consumer
// since BC (one demo story ≠ the ≥2-consumer bar; J-inv-10 / L-inv-8 substrate-without-
// consumer, binary at the close). It is retire-with-rationale, NOT a delete-in-the-dark: its
// two halves both SURVIVE it — the goo-blob FIELD donor (byte-untouched, still first-class)
// and the dot-matrix RENDER register (still first-class). This gate is the terminal lock.
//
// This gate was BORN-RED at HEAD (the goo-dot-matrix dir + subpath + `./goo-dot-matrix`
// export all resolved, so the DEFINITION-ABSENT asserts red) → GREEN once the prune lands.
//
// FALSIFIABLE WITNESSES:
//
//   1 — goo-dot-matrix DEFINITION-ABSENT (src). The `src/components/custom/goo-dot-matrix/`
//       dir + every carved leaf (useGooDotMatrix / gooDotFrame / gooDotSetup / gooDotLattice /
//       uniformBridgeWGPU / the goo-dot.{wgsl,frag} shaders / GooDotMatrix.vue / constants /
//       index / README) resolve to NOTHING on disk. A re-minted goo-dot dir REDs.
//
//   2 — goo-dot-matrix DEFINITION-ABSENT (publication). `src/subpaths/goo-dot-matrix.ts` is
//       gone AND `package.json` publishes NO `./goo-dot-matrix` export / typesVersions row.
//       A dangling subpath OR a surviving export REDs (the d6 silent-prune class).
//
//   3 — goo-dot-matrix DEFINITION-ABSENT (demo). `demo/stories/substrates/goo-dot.vue` is gone
//       AND the manifest carries no `substrates/goo-dot` route / preview-still entry. A
//       surviving demo story REDs (a retired viz must leave no live route).
//
//   4 — THE SURVIVOR TOOTH. The two halves that survive the hybrid stay FIRST-CLASS: the
//       goo-blob FIELD donor (`src/components/custom/goo-blob/` + its metaball shader source
//       the field spliced FROM) AND the dot-matrix RENDER register
//       (`src/components/custom/dot-matrix/` + its fibonacciDot lattice) both resolve on disk.
//       A prune that OVER-CUT a survivor (deleted goo-blob or dot-matrix) REDs — the rationale
//       is "both halves survive," so their absence is the crime this tooth catches.
//
// + a self-test bite per clause (a synthetic re-minted goo-dot / a surviving export / a
//   deleted survivor each REDs).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const GOODOT_DIR = resolve(ROOT, "src/components/custom/goo-dot-matrix");
const SUBPATH = resolve(ROOT, "src/subpaths/goo-dot-matrix.ts");
const PKG = resolve(ROOT, "package.json");
const DEMO_STORY = resolve(ROOT, "demo/stories/substrates/goo-dot.vue");
const MANIFEST = resolve(ROOT, "demo/stories/manifest.ts");
const PREVIEW_STILL = resolve(ROOT, "demo/chassis/landing/vizPreviewStill.ts");
// The two survivors — the halves that outlive the hybrid.
const GOOBLOB_DIR = resolve(ROOT, "src/components/custom/goo-blob");
const GOOBLOB_METABALL = resolve(
    ROOT,
    "src/components/custom/goo-blob/shaders/metaball.wgsl.ts",
);
const DOTMATRIX_DIR = resolve(ROOT, "src/components/custom/dot-matrix");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** The goo-dot leaf set — every path that must be DEFINITION-ABSENT. */
const GOODOT_LEAVES = [
    ["goo-dot-matrix/ dir", GOODOT_DIR],
    ["GooDotMatrix.vue", resolve(GOODOT_DIR, "GooDotMatrix.vue")],
    ["index.ts", resolve(GOODOT_DIR, "index.ts")],
    ["constants.ts", resolve(GOODOT_DIR, "constants.ts")],
    ["composables/useGooDotMatrix.ts", resolve(GOODOT_DIR, "composables/useGooDotMatrix.ts")],
    ["composables/gooDotFrame.ts", resolve(GOODOT_DIR, "composables/gooDotFrame.ts")],
    ["composables/gooDotSetup.ts", resolve(GOODOT_DIR, "composables/gooDotSetup.ts")],
    ["composables/gooDotLattice.ts", resolve(GOODOT_DIR, "composables/gooDotLattice.ts")],
    ["composables/uniformBridgeWGPU.ts", resolve(GOODOT_DIR, "composables/uniformBridgeWGPU.ts")],
    ["shaders/goo-dot.wgsl.ts", resolve(GOODOT_DIR, "shaders/goo-dot.wgsl.ts")],
    ["shaders/goo-dot.frag.ts", resolve(GOODOT_DIR, "shaders/goo-dot.frag.ts")],
];

// ── 1: goo-dot-matrix DEFINITION-ABSENT (src) ────────────────────────────────────
function clauseSrcAbsent(over) {
    const viol = [];
    for (const [label, p] of GOODOT_LEAVES) {
        if (over?.[label] === true) {
            viol.push(`1 src-absent: ${label} STILL RESOLVES — goo-dot-matrix must be DEFINITION-ABSENT (BG.W-GOODOT-PRUNE)`);
            continue;
        }
        if (over?.[label] === undefined && existsSync(p))
            viol.push(`1 src-absent: ${label} STILL RESOLVES on disk — the retired goo-dot-matrix viz must be DEFINITION-ABSENT`);
    }
    return viol;
}

// ── 2: goo-dot-matrix DEFINITION-ABSENT (publication) ────────────────────────────
function clausePublicationAbsent(over) {
    const viol = [];
    const subpathExists =
        over?.subpath !== undefined ? over.subpath : existsSync(SUBPATH);
    if (subpathExists)
        viol.push("2 pub-absent: src/subpaths/goo-dot-matrix.ts STILL RESOLVES — the /goo-dot-matrix subpath must be retired (no dangling barrel)");
    const pkg = over?.pkg ?? read(PKG);
    if (pkg && /"\.\/goo-dot-matrix"\s*:/.test(pkg))
        viol.push('2 pub-absent: package.json STILL publishes the "./goo-dot-matrix" export — a retired subpath must be un-published (the d6 silent-prune class)');
    if (pkg && /"goo-dot-matrix"\s*:\s*\[/.test(pkg))
        viol.push('2 pub-absent: package.json typesVersions STILL carries a "goo-dot-matrix" row — the retired subpath must be un-published');
    return viol;
}

// ── 3: goo-dot-matrix DEFINITION-ABSENT (demo) ───────────────────────────────────
function clauseDemoAbsent(over) {
    const viol = [];
    const storyExists =
        over?.story !== undefined ? over.story : existsSync(DEMO_STORY);
    if (storyExists)
        viol.push("3 demo-absent: demo/stories/substrates/goo-dot.vue STILL RESOLVES — a retired viz must leave no live demo story");
    const manifest = over?.manifest ?? read(MANIFEST);
    if (manifest && /["']substrates\/goo-dot["']/.test(manifest))
        viol.push("3 demo-absent: the manifest STILL carries a substrates/goo-dot route — the retired viz must leave no live route");
    const still = over?.still ?? read(PREVIEW_STILL);
    if (still && /["']\/substrates\/goo-dot["']/.test(still))
        viol.push("3 demo-absent: vizPreviewStill STILL carries a /substrates/goo-dot preview-still entry — the retired viz must leave no live preview");
    return viol;
}

// ── 4: the survivor tooth — the two halves stay first-class ──────────────────────
function clauseSurvivors(over) {
    const viol = [];
    const gooblobDir =
        over?.gooblobDir !== undefined ? over.gooblobDir : existsSync(GOOBLOB_DIR);
    if (!gooblobDir)
        viol.push("4 survivor: the goo-blob FIELD donor (src/components/custom/goo-blob/) is ABSENT — the prune OVER-CUT a survivor (the hybrid retires, its FIELD half stays first-class)");
    const metaball =
        over?.metaball !== undefined ? over.metaball : existsSync(GOOBLOB_METABALL);
    if (!metaball)
        viol.push("4 survivor: the goo-blob metaball.wgsl source (the field the hybrid spliced FROM) is ABSENT — the FIELD donor must stay whole");
    const dotmatrixDir =
        over?.dotmatrixDir !== undefined ? over.dotmatrixDir : existsSync(DOTMATRIX_DIR);
    if (!dotmatrixDir)
        viol.push("4 survivor: the dot-matrix RENDER register (src/components/custom/dot-matrix/) is ABSENT — the prune OVER-CUT a survivor (the RENDER half stays first-class)");
    return viol;
}

function runAll(over = {}) {
    return [
        ...clauseSrcAbsent(over),
        ...clausePublicationAbsent(over),
        ...clauseDemoAbsent(over),
        ...clauseSurvivors(over),
    ];
}

// ── Self-test: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];

    // (1) a synthetic re-minted goo-dot leaf reds clause 1.
    const reminted = runAll({ "composables/useGooDotMatrix.ts": true });
    if (!reminted.some((v) => v.startsWith("1")))
        fails.push("self-test: a re-minted goo-dot leaf did NOT red clause 1");

    // (2a) a surviving subpath reds clause 2.
    const subpathLive = runAll({ subpath: true });
    if (!subpathLive.some((v) => v.startsWith("2")))
        fails.push("self-test: a surviving goo-dot-matrix subpath did NOT red clause 2");

    // (2b) a surviving package export reds clause 2.
    const exportLive = runAll({
        pkg: '{ "exports": { "./goo-dot-matrix": { "import": "./dist/goo-dot-matrix.js" } } }',
    });
    if (!exportLive.some((v) => v.startsWith("2")))
        fails.push("self-test: a surviving ./goo-dot-matrix export did NOT red clause 2");

    // (3) a surviving demo route reds clause 3.
    const routeLive = runAll({
        manifest: 'const x = { "substrates/goo-dot": "@mkbabb/glass-ui/goo-dot-matrix" };',
    });
    if (!routeLive.some((v) => v.startsWith("3")))
        fails.push("self-test: a surviving substrates/goo-dot route did NOT red clause 3");

    // (4) an over-cut survivor (goo-blob deleted) reds clause 4.
    const overcut = runAll({ gooblobDir: false });
    if (!overcut.some((v) => v.startsWith("4")))
        fails.push("self-test: an over-cut goo-blob survivor did NOT red clause 4");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:viz-hybrid",
        wave: "BG.W-GOODOT-PRUNE",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath(
        "GLASS_UI_VIZ_HYBRID_ARTIFACT",
        "proof-viz-hybrid.json",
    );
    writeGateArtifact(out, artifact);

    console.log(
        "proof:viz-hybrid — goo-dot-matrix RETIRED with rationale (0 external consumers); DEFINITION-ABSENT survivor tooth (BG.W-GOODOT-PRUNE)",
    );
    if (viol.length) {
        console.error("  RED:");
        for (const v of viol) console.error("    ✗ " + v);
    } else {
        console.log(
            "  GREEN (1 src-absent · 2 publication-absent · 3 demo-absent · 4 survivors first-class: goo-blob FIELD + dot-matrix RENDER)",
        );
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

export { runAll };
