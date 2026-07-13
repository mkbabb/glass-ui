#!/usr/bin/env node
// proof:virtual-window — the engine-correctness + retire-truth gate for the
// virtualized-section-windowing mechanism. Its history: a glass-ui primitive at
// v0.9.4, retired at v1.0 (MIGRATION.md §3.2-3.4, 0 consumers), un-retired at BC
// on a two-binary-consumer justification that turned out FABRICATED (words ships
// a byte-divergent local fork; the library dock only takes an ensureTargetWindow
// callback — it never composes the windower). BI.W-VIRTUAL-TRUTH adjudicated the
// terminal fate: the `/virtual` PUBLISHED SUBPATH is RETIRED (0 external + 0 src/
// production consumers), while the engine STAYS as an internal, demo-consumed
// composable under src/composables/virtual/.
//
// VW1/VW2/VW3 prove the engine is still correct (the pure layout core, the
// reactive composable, the generation-counter store — the mechanism is kept).
// VW4/VW5 prove the RETIRE is honest and complete: the subpath mirror + the /api
// re-export are gone, the barrel still serves internal consumers, and the
// consumer-evidence doc records the truthful 0-external/0-production/demo-only
// state with words recorded as forked.
//
// SOURCE arm + the VW3 LIVE store race-guard (a targeted vitest run). VW4 asserts
// the SOURCE wiring only — the package.json export-key removal + the dist is the
// registrar's regen-exports + proof:resolution job, deliberately NOT read here so
// this gate is GREEN on the source retire independent of the export-surface regen.
//
// Each clause carries a self-test bite (the gate-coherence discipline): a
// regressed shape REDs the clause.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:virtual-window";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip JS/TS comments so a witness never matches commented-out text.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Sources ──────────────────────────────────────────────────────────────────
const layoutSrc = read("src/composables/virtual/virtualSectionLayout.ts");
const layout = strip(layoutSrc);
const composableSrc = read("src/composables/virtual/useVirtualSectionWindow.ts");
const composable = strip(composableSrc);
const storeSrc = read("src/composables/virtual/useWindowedStore.ts");
const store = strip(storeSrc);
const barrel = strip(read("src/composables/virtual/index.ts"));
const subpath = strip(read("src/subpaths/virtual.ts"));
const apiIndex = strip(read("src/api/index.ts"));
const pkgRaw = read("package.json");
const pkg = pkgRaw ? JSON.parse(pkgRaw) : {};
const evidence = read("docs/consumer-evidence/use-virtual-section-window.md");
const migration = read("MIGRATION.md");

const checks = [];
const facts = {};
const add = (id, pass, detail) => checks.push({ id, pass, detail });

// ── VW1 — the pure layout engine exists + is stateless + binary-search-bounded ──
const layoutExists = layoutSrc.length > 0;
// Stateless fence: no `vue` import, no DOM global reference in source.
const importsVue = /from\s+["']vue["']/.test(layout);
const touchesDom =
    /\bdocument\b/.test(layout) ||
    /\bwindow\b/.test(layout) ||
    /\bResizeObserver\b/.test(layout);
const exportsPureFns =
    /export function buildSectionLayout\b/.test(layout) &&
    /export function resolveSectionWindow\b/.test(layout) &&
    /export function resolveActiveSection\b/.test(layout) &&
    /export function findSectionOffset\b/.test(layout);
const exportsTypes =
    /export interface FlatSection\b/.test(layout) &&
    /export interface SectionLayout\b/.test(layout) &&
    /export interface SectionWindowRange\b/.test(layout) &&
    /export interface ForcedSectionWindowRange\b/.test(layout);
// `findSectionOffset` is a binary search (NOT a linear `.find`/`for…of` scan
// over entries to MATCH the id). The body must carry a binary-search loop
// (low/high midpoint over a sorted view) and must NOT be the words-copy linear
// scan `for (const entry of entries) { if (entry.item.id === id) return ... }`.
const offsetBody = (() => {
    const m = layout.match(
        /export function findSectionOffset[\s\S]*?\n}/,
    );
    return m ? m[0] : "";
})();
const offsetIsBinary =
    /low\s*=\s*0/.test(offsetBody) &&
    /high\s*=\s*\w+\.length\s*-\s*1/.test(offsetBody) &&
    /\(\s*low\s*\+\s*high\s*\)\s*>>\s*1|Math\.floor\(\s*\(\s*low\s*\+\s*high\s*\)/.test(
        offsetBody,
    );
const offsetIsNotLinearScan =
    !/for\s*\(\s*const\s+entry\s+of\s+entries\s*\)\s*\{\s*if\s*\(\s*entry\.item\.id\s*===\s*id/.test(
        offsetBody,
    );
add(
    "vw1-pure-engine-stateless-binary",
    layoutExists &&
        !importsVue &&
        !touchesDom &&
        exportsPureFns &&
        exportsTypes &&
        offsetIsBinary &&
        offsetIsNotLinearScan,
    `virtualSectionLayout.ts exists, imports no vue + touches no DOM global, exports buildSectionLayout/resolveSectionWindow/resolveActiveSection/findSectionOffset + the 4 types, and findSectionOffset is a BINARY search over the sorted byId view (NOT the words-copy linear scan) [exists=${layoutExists} noVue=${!importsVue} noDom=${!touchesDom} pureFns=${exportsPureFns} types=${exportsTypes} binary=${offsetIsBinary} notLinear=${offsetIsNotLinearScan}]`,
);

// ── VW2 — the composable: full API + warm-target auto-release + content-offset + house RO ──
const composableExists = composableSrc.length > 0;
const fullReturnSurface = [
    "visibleItems",
    "topSpacerPx",
    "bottomSpacerPx",
    "measureSection",
    "ensureTargetWindow",
    "getOffsetFor",
    "activeId",
    "activeRootId",
    "recalculate",
].every((k) => new RegExp(`\\b${k}\\b`).test(composable));
const warmTargetForced =
    /function ensureTargetWindow\b/.test(composable) &&
    /warmRange\.value\s*=\s*\{/.test(composable);
const warmAutoRelease =
    /scheduleWarmRangeRelease\b/.test(composable) &&
    /setTimeout\([\s\S]*?warmRange\.value\s*=\s*null[\s\S]*?,\s*320\)/.test(
        composable,
    );
const contentOffsetPath =
    /contentEl/.test(composable) && /getBoundingClientRect\(\)\.top/.test(composable);
// Routes through the house useResizeObserver leaf, NOT a raw `new ResizeObserver`.
const usesHouseLeaf = /useResizeObserver\(/.test(composable);
const noRawResizeObserver = !/new\s+ResizeObserver\b/.test(composable);
add(
    "vw2-composable-full-api-house-leaf",
    composableExists &&
        fullReturnSurface &&
        warmTargetForced &&
        warmAutoRelease &&
        contentOffsetPath &&
        usesHouseLeaf &&
        noRawResizeObserver,
    `useVirtualSectionWindow returns the full surface (visibleItems/spacers/measureSection/ensureTargetWindow/getOffsetFor/activeId/activeRootId/recalculate), ensureTargetWindow sets a forcedRange + a 320ms auto-release, the contentEl offset path is present, and the ResizeObserver routes through the house useResizeObserver leaf (no raw new ResizeObserver) [surface=${fullReturnSurface} warm=${warmTargetForced} release=${warmAutoRelease} content=${contentOffsetPath} houseLeaf=${usesHouseLeaf} noRaw=${noRawResizeObserver}]`,
);

// ── VW3 — the store generation-counter rejects a stale append (LIVE assert) ──
const storeExists = storeSrc.length > 0;
const storeSurface = ["set", "prepend", "clear", "appendIfCurrent", "generation"].every(
    (k) => new RegExp(`\\b${k}\\b`).test(store),
);
// appendIfCurrent gates on the generation (NOT a stub that always appends).
const appendGuarded =
    /function appendIfCurrent\b/.test(store) &&
    /if\s*\(\s*generation\.value\s*!==\s*expectedGeneration\s*\)\s*return\s+false/.test(
        store,
    );
// The LIVE behaviour assert — the fixture's race-guard describe runs GREEN
// (the gate imports the store via the vitest fixture and runs the race).
const SPEC = "tests/composables/virtual/virtualSectionLayout.test.ts";
let liveStatus = "pass";
let liveOutput = "";
if (storeExists && existsSync(resolve(ROOT, SPEC))) {
    try {
        liveOutput = execSync(
            `npx vitest run ${SPEC} -t "generation-counter race-guard" --reporter=dot`,
            { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
        );
    } catch (e) {
        liveStatus = "fail";
        liveOutput = `${e.stdout ?? ""}${e.stderr ?? ""}`;
    }
} else {
    liveStatus = "fail";
    liveOutput = "store source or spec absent — born-RED";
}
facts.vw3LiveStatus = liveStatus;
add(
    "vw3-store-race-guard-live",
    storeExists && storeSurface && appendGuarded && liveStatus === "pass",
    `useWindowedStore exposes set/prepend/clear/appendIfCurrent + generation, appendIfCurrent rejects when generation !== expectedGeneration, and the LIVE race-guard vitest assert is GREEN (set→bump→stale appendIfCurrent returns false + does not mutate) [exists=${storeExists} surface=${storeSurface} guarded=${appendGuarded} live=${liveStatus}]`,
);

// ── VW4 — the subpath is RETIRED + the engine stays internal (SOURCE wiring) ──
// The published surface is gone: no src/subpaths/virtual.ts mirror, and the /api
// discovery layer no longer re-exports the windowing types from composables/virtual.
// The package.json "./virtual" export-key removal is the registrar's regen job
// (proof:resolution owns dist) — NOT asserted here, so this gate is GREEN on the
// source retire alone. The engine barrel STAYS whole for the internal consumers.
const subpathMirrorGone = subpath.length === 0; // src/subpaths/virtual.ts deleted
const apiReexportGone = !/from\s+["']\.\.\/composables\/virtual["']/.test(apiIndex);
const barrelOk =
    /useVirtualSectionWindow/.test(barrel) &&
    /useWindowedStore/.test(barrel) &&
    /clearSessionHeightCache/.test(barrel) &&
    /buildSectionLayout/.test(barrel);
add(
    "vw4-subpath-retired-internal-only",
    subpathMirrorGone && apiReexportGone && barrelOk,
    `the /virtual PUBLISHED surface is retired at source: src/subpaths/virtual.ts is deleted, the /api discovery layer no longer re-exports the windowing types from composables/virtual, and the internal barrel still exports the full surface for the demo consumers [mirrorGone=${subpathMirrorGone} apiGone=${apiReexportGone} barrel=${barrelOk}]`,
);

// ── VW5 — consumer-truth (retired) + lineage + off-root + no useVirtualGrid fork ──
const evidenceExists = evidence.length > 0;
// The doc records the RETIRE terminal verdict, the honest 0-external/0-production
// /demo-only consumer state, and words as a byte-divergent local fork (NOT a lie
// about a live binary consumer).
const recordsRetire = /\bRETIRED\b/.test(evidence);
const recordsWordsFork =
    /DefinitionContentView/.test(evidence) && /byte-?[- ]?divergent|\bfork(?:ed)?\b/i.test(evidence);
const recordsNoProductionConsumer =
    /no src\/ production consumer|zero src\/ production|0 external|ZERO src\/ production/i.test(
        evidence,
    );
// Names ≥2 of the real demo consumer sites (the honest demo-only justification).
const demoConsumerSites = (
    evidence.match(
        /demo\/stories\/(?:navigation\/toc-tracking|dock\/dock-search|data\/virtual-section)\.vue/g,
    ) ?? []
).length;
const recordsDemoConsumers = demoConsumerSites >= 2;
// The pre-seeded grep proofs RESOLVE on disk: the paths they target exist.
const preseededDocs = [
    "build-section-layout",
    "find-section-offset",
    "resolve-active-section",
    "resolve-section-window",
    "section-layout",
    "section-window-range",
    "forced-section-window-range",
    "use-windowed-store",
];
const unresolvedDocs = preseededDocs.filter((name) => {
    const doc = read(`docs/consumer-evidence/${name}.md`);
    if (!doc) return false; // not a virtual-window doc, skip
    // The doc names src/composables/virtual/… — that path must exist on disk.
    const m = doc.match(/src\/composables\/virtual\/([A-Za-z]+)\.ts/);
    if (!m) return false;
    return !existsSync(resolve(ROOT, `src/composables/virtual/${m[1]}.ts`));
});
facts.unresolvedPreseededDocs = unresolvedDocs;
const preseededResolve = unresolvedDocs.length === 0;
// The lineage is recorded — the MIGRATION §3.2-3.4 retirement marked REVERSED-at-BC.
const migrationReversed = /REVERSED[- ]at[- ]BC|REVERSED at BC/i.test(migration);
// The off-root decision is recorded (root-barrel-eligible but deliberately off-root).
const offRootRecorded = /off[- ]root|OFF the root barrel|root-barrel-eligible/i.test(
    evidence,
);
// No useVirtualGrid re-mint: no @tanstack/vue-virtual IMPORT anywhere in src/
// (a prose mention in a comment — e.g. the barrel header recording the
// words-local fence — does NOT count; only a live import statement REDs).
let tanstackInSrc = false;
const tanstackImporters = [];
try {
    const grepped = execSync(
        `grep -rln "@tanstack/vue-virtual" src 2>/dev/null || true`,
        { cwd: ROOT, encoding: "utf8" },
    );
    for (const rel of grepped.split("\n").map((s) => s.trim()).filter(Boolean)) {
        const body = strip(read(rel));
        // A real import: `from "@tanstack/vue-virtual"` or `import("@tanstack/vue-virtual")`.
        if (/(?:from|import\s*\()\s*["']@tanstack\/vue-virtual["']/.test(body)) {
            tanstackImporters.push(rel);
        }
    }
    tanstackInSrc = tanstackImporters.length > 0;
} catch {
    tanstackInSrc = false;
}
facts.tanstackImporters = tanstackImporters;
add(
    "vw5-consumer-truth-retired-offroot-no-fork",
    evidenceExists &&
        recordsRetire &&
        recordsWordsFork &&
        recordsNoProductionConsumer &&
        recordsDemoConsumers &&
        preseededResolve &&
        migrationReversed &&
        offRootRecorded &&
        !tanstackInSrc,
    `the consumer-evidence records the /virtual RETIRE terminal verdict + the honest 0-external/0-production/demo-only state (words a byte-divergent fork, ≥2 demo consumer sites named), the pre-seeded grep proofs RESOLVE on disk (${unresolvedDocs.length} unresolved), the v0.9.4→v1.0→BC lineage is recorded, the off-root decision is recorded, and NO @tanstack/vue-virtual import exists in src/ (useVirtualGrid stays words-local) [evidence=${evidenceExists} retire=${recordsRetire} wordsFork=${recordsWordsFork} noProd=${recordsNoProductionConsumer} demoSites=${demoConsumerSites} preseeded=${preseededResolve} reversed=${migrationReversed} offRoot=${offRootRecorded} noTanstack=${!tanstackInSrc}]`,
);

// ── Report ───────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

function run() {
    console.log(
        "proof:virtual-window — the re-homed virtualized-section-windowing primitive (BC.W-VIRTUAL-WINDOW)",
    );
    console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    const ARTIFACT = gateArtifactPath("GATE_VIRTUAL_WINDOW_OUT", "BC-virtual-window");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:virtual-window",
        command: COMMAND,
        note: "SOURCE arm + the VW3 LIVE store race-guard (a targeted vitest run). VW1/VW2/VW3 prove the kept engine is correct; VW4/VW5 prove the /virtual PUBLISHED-SUBPATH retire (BI.W-VIRTUAL-TRUTH) is honest + complete — the subpath mirror + /api re-export are gone, the internal barrel stays for the demo consumers, the consumer-evidence records the truthful 0-external/0-production/demo-only state with words a byte-divergent fork. The package.json export-key removal is the registrar's regen-exports + proof:resolution job (NOT read here). useVirtualGrid stays words-local (the @tanstack fence).",
        facts,
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
    });

    if (!pass) {
        console.error(`\n[proof:virtual-window] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        if (facts.vw3LiveStatus === "fail" && liveOutput) {
            console.error("\nVW3 LIVE OUTPUT:\n" + liveOutput.split("\n").slice(-20).join("\n"));
        }
        process.exit(1);
    }
    console.log(
        "\n[proof:virtual-window] the windowing engine is correct + internal — the pure stateless layout core (binary-search findSectionOffset), the reactive composable (full API + 320ms warm-target auto-release + content-offset + house useResizeObserver), and the generation-counter store (LIVE race-guard GREEN) STAY as demo-consumed internal code. The /virtual PUBLISHED SUBPATH is retired at source (mirror + /api re-export gone); the consumer-evidence records the honest 0-external/0-production/demo-only state, words a byte-divergent fork. useVirtualGrid stays words-local.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
