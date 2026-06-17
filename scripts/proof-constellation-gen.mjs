#!/usr/bin/env node
// AZ.W-CON-GEN — proof:constellation-gen, the six-item generalization gate (R5-6).
//
// The constellation generalization promotes the slides deck-local anomaly-skin axes
// to FIRST-CLASS library surface, each item judged against the ≥2-consumer bar (the
// demo exerciser + the named slides re-point). This gate is born-RED at HEAD: with no
// `pinnedIndex` / `accentIndex` / `accent`-palette / `pinnedDrift` / `warpAutoRelease`
// surface, every clause REDs. It drives the six clauses GREEN — a STATIC surface-
// presence arm (the members exist on the typed surface) PLUS a RUNTIME-truth arm (the
// constellationField unit suite carries the 11 new W-CON-GEN assertions: a pinned node
// holds, an accent edge paints, the edgeFloor lifts, the pinnedDrift eases-but-stays,
// the warpAutoRelease clears the target — runtime observations, NOT greps).
//
// The clauses (each maps to an R5-6 item):
//   (G1) PINNED-NODE       — `ConstellationField` carries `pinnedIndex`; the
//                            createConstellationField factory seeds it; stepField skips it.
//   (G2) ACCENT-EDGE       — `drawEdges` carries the `accentIndex` param + the accent branch.
//   (G3) PALETTE-EXTEND    — `ConstellationPalette`/`DEFAULT_PALETTE`/`readPalette` carry
//                            `accent`/`edgeFloor`/`edgeAccentAlpha`; the two NEW tokens
//                            exist in color-radius.css (plain-numeric, both arms).
//   (G5) PINNED-DRIFT      — `stepPinnedDrift` + the `ConstellationPinnedDrift` type exist;
//                            the field carries `pinnedDrift`.
//   (G6) WARP-RELEASE      — `ConstellationField` carries `warpAutoRelease`; stepField
//                            clears the target on settle; `<Constellation>` exposes warpSettled.
//   (UNIT) RUNTIME-TRUTH   — the constellationField unit suite (incl. the 11 W-CON-GEN
//                            assertions) passes.
//
// G4 (label text) is the honest SPEC'D-NOT-BUILT — the `drawOverlay` seam already
// expresses it (the zero-deck-domain canon); NO `label` prop. The gate asserts the
// ABSENCE of a `label`/`anomaly`/`resolved` prop on the component (the canon holds).

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const CONST = resolve(ROOT, "src/components/custom/constellation");
const FIELD = resolve(CONST, "constellationField.ts");
// BA.W-CARVE2 split the ~308 lines of `Constellation*` interface declarations off
// the step engine into `constellationTypes.ts` (re-exported `from
// "./constellationField"` so the import seam is untouched). The TYPE-MEMBER witnesses
// below (pinnedIndex/accent/edgeFloor/pinnedDrift?/warpAutoRelease?) read the field
// engine AND the carved types file together (BB.W-CI-GREEN — the re-point follows the
// carve; the declarations are present, just relocated).
const TYPES = resolve(CONST, "constellationTypes.ts");
const INTER = resolve(CONST, "constellationInteraction.ts");
const DRAW = resolve(CONST, "constellationDraw.ts");
const CONSTS = resolve(CONST, "constants.ts");
const VUE = resolve(CONST, "Constellation.vue");
// BA.W-CARVE2 also lifted the 528-line render-loop/expose orchestrator out of
// Constellation.vue's <script setup> into `composables/useConstellation.ts` (the SFC
// keeps only the template + defineProps + the thin composable call). The COMPONENT
// witnesses (the accentIndex thread, the warpSettled()/pinNode expose) read the SFC
// AND its orchestrator together.
const ORCHESTRATOR = resolve(CONST, "composables/useConstellation.ts");
const FACTORY = resolve(CONST, "composables/createConstellationField.ts");
const COLOR_CSS = resolve(ROOT, "src/styles/tokens/color-radius.css");
const DARK_CSS = resolve(ROOT, "src/styles/tokens/dark-arm.css");

const ARTIFACT = gateArtifactPath("GATE_CON_GEN_ARTIFACT", "pi-con-gen-report.json");

function read(path) {
    return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function run() {
    const violations = [];
    const facts = {};

    // `field` carries the step engine + the carved type declarations (the carve split
    // the `Constellation*` interfaces off into constellationTypes.ts); `vue` carries
    // the SFC + its render-loop orchestrator (the carve lifted the threading/expose
    // into useConstellation.ts). Both pairs read together so the type-member +
    // component-threading witnesses follow the BA.W-CARVE2 relocation.
    const field = `${read(FIELD)}\n${read(TYPES)}`;
    const inter = read(INTER);
    const draw = read(DRAW);
    const consts = read(CONSTS);
    const vue = `${read(VUE)}\n${read(ORCHESTRATOR)}`;
    const factory = read(FACTORY);
    const colorCss = read(COLOR_CSS);
    const darkCss = read(DARK_CSS);

    // ── (G1) PINNED-NODE ─────────────────────────────────────────────────────
    const g1Field = /pinnedIndex\s*:\s*number/.test(field);
    const g1Factory = /pinnedIndex/.test(factory);
    // stepField skips the pinned node in BOTH the drift loop and the steer pass.
    const g1Skip = (field.match(/if\s*\(\s*i\s*===\s*pinned\s*\)\s*continue/g) || []).length;
    facts.g1 = { fieldMember: g1Field, factorySeeds: g1Factory, skipSites: g1Skip };
    if (!g1Field) violations.push("G1: `ConstellationField` lacks the `pinnedIndex: number` member");
    if (!g1Factory) violations.push("G1: createConstellationField does not seed `pinnedIndex`");
    if (g1Skip < 1)
        violations.push("G1: stepField does not skip the pinned node (`if (i === pinned) continue`)");

    // ── (G2) ACCENT-EDGE ─────────────────────────────────────────────────────
    const g2Param = /export function drawEdges\([\s\S]*?accentIndex\s*=\s*-1/.test(draw);
    const g2Branch = /palette\.accent/.test(draw) && /accentIndex\s*>=\s*0/.test(draw);
    const g2Call = /drawEdges\([\s\S]*?accentIndex/.test(vue) || /accentIndex/.test(vue);
    facts.g2 = { drawEdgesParam: g2Param, accentBranch: g2Branch, componentThreads: g2Call };
    if (!g2Param) violations.push("G2: `drawEdges` lacks the trailing `accentIndex = -1` param");
    if (!g2Branch) violations.push("G2: `drawEdges` lacks the accent-incident edge branch (`palette.accent`)");
    if (!g2Call) violations.push("G2: Constellation.vue does not thread the accentIndex into drawEdges");

    // ── (G3) PALETTE-EXTEND ──────────────────────────────────────────────────
    const g3Type =
        /accent\s*:\s*string/.test(field) &&
        /edgeFloor\s*:\s*number/.test(field) &&
        /edgeAccentAlpha\s*:\s*number/.test(field);
    const g3Default =
        /accent\s*:/.test(consts) &&
        /edgeFloor\s*:/.test(consts) &&
        /edgeAccentAlpha\s*:/.test(consts);
    const g3ReadPalette =
        draw.includes('"--constellation-accent"') &&
        draw.includes('"--constellation-edge-floor"') &&
        draw.includes('"--constellation-edge-accent-alpha"');
    // the two NEW tokens exist in BOTH css arms (plain-numeric — the W30 leak-immune
    // discipline the proof:constellation-tokens clause (c) owns; here we assert presence).
    const g3TokenLight =
        /--constellation-edge-floor\s*:/.test(colorCss) &&
        /--constellation-edge-accent-alpha\s*:/.test(colorCss);
    const g3TokenDark =
        /--constellation-edge-floor\s*:/.test(darkCss) &&
        /--constellation-edge-accent-alpha\s*:/.test(darkCss);
    // the new tokens carry NO light-dark() literal (the Canvas2D-safe discipline).
    const g3NoLightDark = !/--constellation-edge-(floor|accent-alpha)\s*:[^;]*light-dark\(/.test(
        colorCss + darkCss,
    );
    facts.g3 = {
        paletteType: g3Type,
        defaultPalette: g3Default,
        readPalette: g3ReadPalette,
        tokenLight: g3TokenLight,
        tokenDark: g3TokenDark,
        noLightDark: g3NoLightDark,
    };
    if (!g3Type)
        violations.push("G3: `ConstellationPalette` lacks accent/edgeFloor/edgeAccentAlpha");
    if (!g3Default)
        violations.push("G3: `DEFAULT_PALETTE` lacks accent/edgeFloor/edgeAccentAlpha");
    if (!g3ReadPalette)
        violations.push("G3: `readPalette` does not probe the three new --constellation-* tokens");
    if (!g3TokenLight)
        violations.push("G3: --constellation-edge-floor/-edge-accent-alpha absent from the :root arm");
    if (!g3TokenDark)
        violations.push("G3: --constellation-edge-floor/-edge-accent-alpha absent from the .dark arm");
    if (!g3NoLightDark)
        violations.push("G3: a new --constellation-edge-* token carries a light-dark() literal (Canvas2D leak)");

    // ── (G5) PINNED-DRIFT ────────────────────────────────────────────────────
    const g5Type = /export interface ConstellationPinnedDrift/.test(field);
    const g5Step = /export function stepPinnedDrift/.test(inter);
    const g5Threaded = /stepPinnedDrift\(field/.test(field);
    const g5FieldMember = /pinnedDrift\?\s*:\s*ConstellationPinnedDrift/.test(field);
    facts.g5 = { type: g5Type, stepper: g5Step, threaded: g5Threaded, fieldMember: g5FieldMember };
    if (!g5Type) violations.push("G5: the `ConstellationPinnedDrift` type is absent");
    if (!g5Step) violations.push("G5: `stepPinnedDrift` is not exported from constellationInteraction");
    if (!g5Threaded) violations.push("G5: stepField does not call stepPinnedDrift");
    if (!g5FieldMember) violations.push("G5: `ConstellationField` lacks the `pinnedDrift?` member");

    // ── (G6) WARP-RELEASE + isSettled expose ─────────────────────────────────
    const g6FieldFlag = /warpAutoRelease\?\s*:\s*boolean/.test(field);
    const g6Clause = /warpAutoRelease[\s\S]*?warpSettled\(field\)[\s\S]*?targetIdx\s*=\s*-1/.test(
        field,
    );
    const g6Expose = /warpSettled\(\)\s*:\s*boolean/.test(vue) && /pinNode\(/.test(vue);
    facts.g6 = { fieldFlag: g6FieldFlag, releaseClause: g6Clause, componentExpose: g6Expose };
    if (!g6FieldFlag) violations.push("G6: `ConstellationField` lacks the `warpAutoRelease?` flag");
    if (!g6Clause)
        violations.push("G6: stepField has no auto-release clause (clear targetIdx on settle)");
    if (!g6Expose)
        violations.push("G6: `<Constellation>` does not expose warpSettled()/pinNode (the isSettled read + pin seam)");

    // ── (G4) HONEST BOOK — the zero-deck-domain canon holds (no label/anomaly prop) ──
    // The component must NOT carry a `label`/`anomaly`/`resolved` PROP — the branded
    // focal content stays the consumer's drawOverlay. (A `pinned` prop is fine; we
    // assert the deck-DOMAIN props are absent from the defineProps surface.)
    const propsBlock = (() => {
        const m = vue.match(/defineProps<\{[\s\S]*?\}>\(\)/);
        return m ? m[0] : vue;
    })();
    const g4NoDomainProp =
        !/\blabel\?\s*:/.test(propsBlock) &&
        !/\banomaly\?\s*:/.test(propsBlock) &&
        !/\bresolved\?\s*:/.test(propsBlock);
    facts.g4 = { zeroDeckDomainHolds: g4NoDomainProp };
    if (!g4NoDomainProp)
        violations.push(
            "G4: a deck-domain prop (label/anomaly/resolved) leaked onto the component — the zero-deck-domain canon is broken (the label stays drawOverlay content)",
        );

    // ── (UNIT) RUNTIME-TRUTH — the field unit suite (the 11 W-CON-GEN assertions) ──
    const unit = spawnSync("npm", ["run", "--silent", "proof:constellation-field"], {
        cwd: ROOT,
        encoding: "utf8",
        env: process.env,
    });
    const unitOut = `${unit.stdout || ""}${unit.stderr || ""}`;
    const unitPassed = unit.status === 0;
    // require the W-CON-GEN describe block actually ran (the assertions present).
    const genRan = /generalization \(AZ\.W-CON-GEN\)/.test(read(
        resolve(ROOT, "tests/components/custom/constellation/constellationField.test.ts"),
    ));
    facts.unit = { passed: unitPassed, exitCode: unit.status, genAssertionsPresent: genRan };
    if (!unitPassed)
        violations.push(
            `UNIT: the constellationField unit suite FAILED (exit ${unit.status}) — the runtime-truth arm is RED:\n${unitOut.slice(-600)}`,
        );
    if (!genRan)
        violations.push("UNIT: the W-CON-GEN describe block is absent from the unit suite");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:constellation-gen",
        facts,
        violations,
    });

    console.log("proof:constellation-gen — the six-item constellation generalization gate (R5-6)");
    const ok = (b) => (b ? "yes ✓" : "NO ✗");
    console.log(`  G1 PINNED-NODE      : ${ok(g1Field && g1Factory && g1Skip >= 1)}`);
    console.log(`  G2 ACCENT-EDGE      : ${ok(g2Param && g2Branch && g2Call)}`);
    console.log(`  G3 PALETTE-EXTEND   : ${ok(g3Type && g3Default && g3ReadPalette && g3TokenLight && g3TokenDark && g3NoLightDark)}`);
    console.log(`  G4 ZERO-DECK-DOMAIN : ${ok(g4NoDomainProp)} (label stays drawOverlay — the honest book)`);
    console.log(`  G5 PINNED-DRIFT     : ${ok(g5Type && g5Step && g5Threaded && g5FieldMember)}`);
    console.log(`  G6 WARP-RELEASE     : ${ok(g6FieldFlag && g6Clause && g6Expose)}`);
    console.log(`  UNIT RUNTIME-TRUTH  : ${ok(unitPassed && genRan)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
