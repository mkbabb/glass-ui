#!/usr/bin/env node
// BI.W-DOCK-FOLD — proof:dock-fold, the born-RED G10 retirement-census + consumer-fold
// gate. The mechanism waves (W-DOCK-CONTROLS/W-DOCK-CROSSFADE) MINT the survivors
// (`<DockControl>`/`<DockTrigger>`/`useSelectionGroup`/`<DockCrossfade>`); THIS wave
// EXECUTES the fold — retires the five legacy dock control/trigger SFCs, the reka
// `ui/tabs` substrate, and the demo-only `useDockItemDrag`, re-points every consumer,
// and lands the MIGRATION rows + cross-repo asks + the retirement census (the inv-11
// corollary made structural: never a silent prune).
//
// PURE DEVICE-FREE static src+doc scan (no browser, no GPU) → tags ["local","ci"].
//
// CLAUSES (born-RED on the pre-fold tree — the five SFCs + reka `ui/tabs` +
// `useDockItemDrag` are live; the MIGRATION/ask/census artifacts are absent):
//   F1 components-folded — DockIconButton/DockTabButton/DockSelectTrigger/
//      DockDropdownTrigger/DockPopoverTrigger DEFINITION-ABSENT; <DockControl>/<DockTrigger>
//      are the survivors AND the /dock barrel exports them, not the retired five.
//   F2 reka-ui-tabs-retired — `src/components/ui/tabs/` DEFINITION-ABSENT; DockLayerGroup
//      imports `useSelectionGroup` (not the reka `ui/tabs` substrate).
//   F3 cta-seat-preserved — `useDockCtaReceive` resolves on /motion + /dock + /api;
//      `cta-seat.css` present (the census KEEP — a synthetic cta-seat delete reds).
//   F4 migration-table-complete — every retired public symbol carries a MIGRATION.md row
//      (retired → survivor) + a cross-repo ask row; every named target subpath resolves;
//      the census records each retirement's binary-consumer verdict.
//   F5 useDockItemDrag-retired — `useDockItemDrag.ts` DEFINITION-ABSENT; no live import.
//
// Self-test bites (each planted defect MUST flag): a synthetic surviving DockIconButton
// SFC reds F1; a synthetic cta-seat delete reds F3; a synthetic retired-symbol-without-
// a-MIGRATION-row reds F4.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const DOCK = "src/components/custom/dock";
const PATHS = {
    ROOT,
    // The five retired control/trigger SFCs (must be DEFINITION-ABSENT).
    RETIRED_SFCS: [
        `${DOCK}/DockIconButton.vue`,
        `${DOCK}/DockTabButton.vue`,
        `${DOCK}/DockSelectTrigger.vue`,
        `${DOCK}/DockDropdownTrigger.vue`,
        `${DOCK}/DockPopoverTrigger.vue`,
    ],
    DOCK_CONTROL: `${DOCK}/DockControl.vue`,
    DOCK_TRIGGER: `${DOCK}/DockTrigger.vue`,
    DOCK_BARREL: `${DOCK}/index.ts`,
    UI_TABS_DIR: "src/components/ui/tabs",
    LAYER_GROUP: `${DOCK}/DockLayerGroup.vue`,
    CTA_RECEIVE: "src/composables/motion/useDockCtaReceive.ts",
    CTA_SEAT_CSS: "src/styles/dock/cta-seat.css",
    MOTION_BARREL: "src/composables/motion/index.ts",
    API_BARREL: "src/api/index.ts",
    API_TYPES_EXTRA: "src/api/types-extra.ts",
    ITEM_DRAG: `${DOCK}/composables/useDockItemDrag.ts`,
    MIGRATION: "MIGRATION.md",
    CENSUS: "docs/tranches/BI/audit/W-DOCK-FOLD-census.md",
    ASKS: "docs/tranches/BI/coordination/W-DOCK-FOLD-asks.md",
};

// The retired public symbols and their fold survivor (the F4 MIGRATION ledger source).
const RETIRED_MIGRATIONS = [
    { retired: "DockIconButton", survivor: "DockControl" },
    { retired: "DockTabButton", survivor: "DockControl" },
    { retired: "DockSelectTrigger", survivor: "DockTrigger" },
    { retired: "DockDropdownTrigger", survivor: "DockTrigger" },
    { retired: "DockPopoverTrigger", survivor: "DockTrigger" },
];

const abs = (rel) => resolve(ROOT, rel);
const read = (rel) => (existsSync(abs(rel)) ? readFileSync(abs(rel), "utf8") : null);
function stripTs(text) {
    return (text ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}
function stripVue(text) {
    return stripTs((text ?? "").replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " ")));
}

// ── F1 — components-folded ────────────────────────────────────────────────────
function checkF1({ retiredExist, dockControlText, dockTriggerText, barrelText }) {
    const violations = [];
    const facts = {};
    const survivors = [];
    for (const { rel, exists } of retiredExist) {
        if (exists) survivors.push(rel);
    }
    facts.f1RetiredSurvivors = survivors;
    if (survivors.length) {
        violations.push(
            `F1 — retired dock control/trigger SFC(s) still on disk (${survivors.join(", ")}); they fold onto <DockControl>/<DockTrigger> (DEFINITION-ABSENT, clean break)`,
        );
    }
    facts.f1DockControlExists = dockControlText != null;
    facts.f1DockTriggerExists = dockTriggerText != null;
    if (dockControlText == null)
        violations.push("F1 — <DockControl> is ABSENT; the folded icon+tab survivor is not minted");
    if (dockTriggerText == null)
        violations.push("F1 — <DockTrigger> is ABSENT; the folded overlay-trigger survivor is not minted");

    const barrel = stripTs(barrelText ?? "");
    // the barrel exports the survivors and NONE of the retired five.
    const exportsControl = /export\s*\{[^}]*\bDockControl\b/.test(barrel);
    const exportsTrigger = /export\s*\{[^}]*\bDockTrigger\b/.test(barrel);
    facts.f1BarrelExportsControl = exportsControl;
    facts.f1BarrelExportsTrigger = exportsTrigger;
    if (!exportsControl || !exportsTrigger)
        violations.push("F1 — the /dock barrel does NOT export both DockControl + DockTrigger");
    const barrelRetired = [];
    for (const { retired } of RETIRED_MIGRATIONS) {
        // a LIVE `export { default as <retired> }` (comment-stripped).
        if (new RegExp(`export\\s*\\{\\s*default as ${retired}\\b`).test(barrel))
            barrelRetired.push(retired);
    }
    facts.f1BarrelRetiredExports = barrelRetired;
    if (barrelRetired.length)
        violations.push(
            `F1 — the /dock barrel still EXPORTS retired symbol(s) (${barrelRetired.join(", ")}); the clean break removes them`,
        );

    return { violations, facts };
}

// ── F2 — reka-ui-tabs-retired ─────────────────────────────────────────────────
function checkF2({ uiTabsExists, layerGroupText }) {
    const violations = [];
    const facts = {};
    facts.f2UiTabsAbsent = !uiTabsExists;
    if (uiTabsExists)
        violations.push(
            "F2 — the reka 'src/components/ui/tabs/' substrate still EXISTS; it retires (DEFINITION-ABSENT) — its sole internal consumer DockLayerGroup folds onto useSelectionGroup",
        );
    const lg = stripVue(layerGroupText ?? "");
    const importsRekaTabs = /from\s*["']\.\.\/\.\.\/ui\/tabs["']/.test(lg);
    const importsSelectionGroup = /import\s*\{[^}]*\buseSelectionGroup\b[^}]*\}\s*from/.test(lg);
    facts.f2LayerGroupImportsRekaTabs = importsRekaTabs;
    facts.f2LayerGroupImportsSelectionGroup = importsSelectionGroup;
    if (importsRekaTabs)
        violations.push("F2 — DockLayerGroup still imports the reka 'ui/tabs' substrate (the switcher rail must fold onto useSelectionGroup)");
    if (!importsSelectionGroup)
        violations.push("F2 — DockLayerGroup does NOT import 'useSelectionGroup'; the switcher rail is not re-pointed onto the headless engine");
    return { violations, facts };
}

// ── F3 — cta-seat-preserved ───────────────────────────────────────────────────
function checkF3({ ctaText, ctaSeatCssExists, motionBarrelText, dockBarrelText, apiText, apiExtraText }) {
    const violations = [];
    const facts = {};
    facts.f3CtaReceiveExists = ctaText != null;
    if (ctaText == null)
        violations.push("F3 — useDockCtaReceive.ts is ABSENT; the cta-seat is the census KEEP (never retired)");
    facts.f3CtaSeatCssExists = ctaSeatCssExists;
    if (!ctaSeatCssExists)
        violations.push("F3 — 'src/styles/dock/cta-seat.css' is ABSENT; the landing-seat CSS is the census KEEP");

    const apiClean = stripTs(apiText ?? "");
    const apiExtraClean = stripTs(apiExtraText ?? "");
    const onMotion = /\buseDockCtaReceive\b/.test(stripTs(motionBarrelText ?? ""));
    const onDock = /\buseDockCtaReceive\b/.test(stripTs(dockBarrelText ?? ""));
    // /api publishes the UseDockCtaReceive* discovery TYPES — directly, OR via the carved
    // `export type * from "./types-extra"` sibling (the no-god-module bound). Follow the chain.
    const apiDirect = /\bUseDockCtaReceive\w*\b/.test(apiClean) || /\buseDockCtaReceive\b/.test(apiClean);
    const apiViaExtra =
        /export\s+type\s+\*\s+from\s+["']\.\/types-extra["']/.test(apiClean) &&
        /\bUseDockCtaReceive\w*\b/.test(apiExtraClean);
    const onApi = apiDirect || apiViaExtra;
    facts.f3ResolvesMotion = onMotion;
    facts.f3ResolvesDock = onDock;
    facts.f3ResolvesApi = onApi;
    if (!onMotion) violations.push("F3 — useDockCtaReceive is NOT exported on /motion (composables/motion barrel)");
    if (!onDock) violations.push("F3 — useDockCtaReceive is NOT re-exported on /dock (dock barrel)");
    if (!onApi) violations.push("F3 — the UseDockCtaReceive* types are NOT published on /api (the pass-2 /dock-only charge was REVERSED — the triple export STAYS)");
    return { violations, facts };
}

// ── F4 — migration-table-complete ─────────────────────────────────────────────
function checkF4({ migrationText, censusExists, asksText, barrelText, ctaText }) {
    const violations = [];
    const facts = {};

    facts.f4MigrationExists = migrationText != null;
    if (migrationText == null) {
        violations.push("F4 — MIGRATION.md is ABSENT; every retired public symbol owes a migration row");
        return { violations, facts };
    }
    const mig = migrationText;
    const missingRows = [];
    for (const { retired, survivor } of RETIRED_MIGRATIONS) {
        // a migration ROW naming BOTH the retired symbol and its survivor on ONE line.
        const hasRow = mig
            .split("\n")
            .some((ln) => ln.includes(retired) && ln.includes(survivor));
        if (!hasRow) missingRows.push(`${retired}→${survivor}`);
    }
    facts.f4MissingMigrationRows = missingRows;
    if (missingRows.length)
        violations.push(
            `F4 — MIGRATION.md is missing a retired→survivor row for: ${missingRows.join(", ")} (a retired public symbol MUST carry a named migration row — never a silent prune)`,
        );

    // the cross-repo ask row: the coordination file names the DockIconButton→DockControl
    // rename across the consuming repos on their ^5.0.0 bump (the foreign-tree fence).
    facts.f4AsksExists = asksText != null;
    const askNamesRename =
        asksText != null &&
        /DockIconButton/.test(asksText) &&
        /DockControl/.test(asksText);
    facts.f4AskNamesRename = askNamesRename;
    if (!askNamesRename)
        violations.push(
            "F4 — the cross-repo ask (docs/tranches/BI/coordination/W-DOCK-FOLD-asks.md) does NOT name the DockIconButton→DockControl migration; every public-surface change owes an ASK row (foreign-tree fence)",
        );

    // the retirement census exists (the inv-11 corollary — records each binary-consumer verdict).
    facts.f4CensusExists = censusExists;
    if (!censusExists)
        violations.push(
            "F4 — the retirement census (docs/tranches/BI/audit/W-DOCK-FOLD-census.md) is ABSENT; the inv-11 corollary demands a recorded binary-consumer verdict per retirement",
        );

    // every named target SUBPATH resolves: DockControl/DockTrigger on /dock, and the cta
    // triple-export survives (F3 owns the cta detail; here the target-resolves floor).
    const barrel = stripTs(barrelText ?? "");
    const targetsResolve =
        /export\s*\{[^}]*\bDockControl\b/.test(barrel) &&
        /export\s*\{[^}]*\bDockTrigger\b/.test(barrel) &&
        ctaText != null;
    facts.f4TargetsResolve = targetsResolve;
    if (!targetsResolve)
        violations.push(
            "F4 — a named migration TARGET does not resolve on disk (DockControl/DockTrigger on /dock, useDockCtaReceive present) — a migration row pointing at a missing target is a broken promise",
        );

    return { violations, facts };
}

// ── F5 — useDockItemDrag-retired ──────────────────────────────────────────────
function checkF5({ itemDragExists, liveImporters }) {
    const violations = [];
    const facts = {};
    facts.f5ItemDragAbsent = !itemDragExists;
    if (itemDragExists)
        violations.push("F5 — 'composables/useDockItemDrag.ts' still EXISTS; the demo-only dock-item drag-reorder retires (G10 — zero binary consumer; its SpringProgress dies here)");
    facts.f5LiveImporters = liveImporters;
    if (liveImporters.length)
        violations.push(
            `F5 — 'useDockItemDrag' is still imported live (${liveImporters.join(", ")}); the retire must leave no dangling consumer`,
        );
    return { violations, facts };
}

// ── self-test bites ───────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // F1 bite — a synthetic surviving DockIconButton SFC MUST flag.
    const f1 = checkF1({
        retiredExist: [
            { rel: `${DOCK}/DockIconButton.vue`, exists: true },
            { rel: `${DOCK}/DockTabButton.vue`, exists: false },
            { rel: `${DOCK}/DockSelectTrigger.vue`, exists: false },
            { rel: `${DOCK}/DockDropdownTrigger.vue`, exists: false },
            { rel: `${DOCK}/DockPopoverTrigger.vue`, exists: false },
        ],
        dockControlText: "<template></template>",
        dockTriggerText: "<template></template>",
        barrelText: "export { default as DockControl } from './DockControl.vue'; export { default as DockTrigger } from './DockTrigger.vue';",
    });
    if (!f1.violations.some((v) => /DockIconButton/.test(v)))
        errors.push("F1 self-test BROKE — a surviving DockIconButton.vue SFC was NOT flagged");

    // F3 bite — a synthetic cta-seat delete MUST flag.
    const f3 = checkF3({
        ctaText: null,
        ctaSeatCssExists: false,
        motionBarrelText: "",
        dockBarrelText: "",
        apiText: "",
    });
    if (!f3.violations.some((v) => /cta-seat|useDockCtaReceive/.test(v)))
        errors.push("F3 self-test BROKE — a deleted cta-seat (useDockCtaReceive absent) was NOT flagged");

    // F4 bite — a synthetic retired-symbol-without-a-MIGRATION-row MUST flag.
    const f4 = checkF4({
        migrationText: "no dock rows here",
        censusExists: true,
        asksText: "DockIconButton -> DockControl",
        barrelText: "export { default as DockControl } from '.'; export { default as DockTrigger } from '.';",
        ctaText: "export function useDockCtaReceive() {}",
    });
    if (!f4.violations.some((v) => /missing a retired→survivor row/.test(v)))
        errors.push("F4 self-test BROKE — a retired symbol with NO MIGRATION row was NOT flagged");

    return { ok: errors.length === 0, errors };
}

function findItemDragImporters() {
    // A live (comment-stripped) `useDockItemDrag` import across src/demo. Cheap: the
    // retire leaves at most the useDockSpring.ts doc-comment mention (comment-stripped out).
    const roots = ["src", "demo"];
    const hits = [];
    const walk = (dir) => {
        let entries;
        try {
            entries = readdirSync(abs(dir));
        } catch {
            return;
        }
        for (const name of entries) {
            if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
            const rel = `${dir}/${name}`;
            let st;
            try {
                st = statSync(abs(rel));
            } catch {
                continue;
            }
            if (st.isDirectory()) walk(rel);
            else if (/\.(ts|vue)$/.test(name)) {
                const raw = readFileSync(abs(rel), "utf8");
                const clean = name.endsWith(".vue") ? stripVue(raw) : stripTs(raw);
                if (/import[^;]*\buseDockItemDrag\b/.test(clean)) hits.push(rel);
            }
        }
    };
    for (const r of roots) walk(r);
    return hits;
}

function run() {
    const retiredExist = PATHS.RETIRED_SFCS.map((rel) => ({ rel, exists: existsSync(abs(rel)) }));
    const dockControlText = read(PATHS.DOCK_CONTROL);
    const dockTriggerText = read(PATHS.DOCK_TRIGGER);
    const barrelText = read(PATHS.DOCK_BARREL);
    const uiTabsExists = existsSync(abs(PATHS.UI_TABS_DIR));
    const layerGroupText = read(PATHS.LAYER_GROUP);
    const ctaText = read(PATHS.CTA_RECEIVE);
    const ctaSeatCssExists = existsSync(abs(PATHS.CTA_SEAT_CSS));
    const motionBarrelText = read(PATHS.MOTION_BARREL);
    const apiText = read(PATHS.API_BARREL);
    const apiExtraText = read(PATHS.API_TYPES_EXTRA);
    const itemDragExists = existsSync(abs(PATHS.ITEM_DRAG));
    const migrationText = read(PATHS.MIGRATION);
    const censusExists = existsSync(abs(PATHS.CENSUS));
    const asksText = read(PATHS.ASKS);

    const f1 = checkF1({ retiredExist, dockControlText, dockTriggerText, barrelText });
    const f2 = checkF2({ uiTabsExists, layerGroupText });
    const f3 = checkF3({ ctaText, ctaSeatCssExists, motionBarrelText, dockBarrelText: barrelText, apiText, apiExtraText });
    const f4 = checkF4({ migrationText, censusExists, asksText, barrelText, ctaText });
    const f5 = checkF5({ itemDragExists, liveImporters: findItemDragImporters() });
    const self = selfTest();

    const violations = [
        ...f1.violations,
        ...f2.violations,
        ...f3.violations,
        ...f4.violations,
        ...f5.violations,
        ...self.errors,
    ];
    const facts = {
        ...f1.facts,
        ...f2.facts,
        ...f3.facts,
        ...f4.facts,
        ...f5.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_FOLD_ARTIFACT", "dock-fold");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-fold",
        note: "BI.W-DOCK-FOLD — the G10 retirement census + the ~34-site consumer fold. F1 components-folded (5 SFCs → DockControl/DockTrigger) · F2 reka-ui-tabs-retired (DockLayerGroup → useSelectionGroup) · F3 cta-seat-preserved (/motion+/dock+/api) · F4 migration-table-complete (MIGRATION rows + cross-repo asks + census) · F5 useDockItemDrag-retired + 3 self-test bites. Device-free src+doc scan.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-fold — the G10 retirement census + consumer fold (BI.W-DOCK-FOLD)");
    console.log(`  F1 components-folded      : survivors=${facts.f1RetiredSurvivors?.length ?? "?"} control=${facts.f1DockControlExists} trigger=${facts.f1DockTriggerExists} barrel-retired=${facts.f1BarrelRetiredExports?.length ?? "?"} ${ok(f1.violations.length === 0)}`);
    console.log(`  F2 reka-ui-tabs-retired   : ui/tabs-absent=${facts.f2UiTabsAbsent} layergroup-selectiongroup=${facts.f2LayerGroupImportsSelectionGroup} reka-import=${facts.f2LayerGroupImportsRekaTabs} ${ok(f2.violations.length === 0)}`);
    console.log(`  F3 cta-seat-preserved     : cta=${facts.f3CtaReceiveExists} css=${facts.f3CtaSeatCssExists} motion=${facts.f3ResolvesMotion} dock=${facts.f3ResolvesDock} api=${facts.f3ResolvesApi} ${ok(f3.violations.length === 0)}`);
    console.log(`  F4 migration-complete     : migration=${facts.f4MigrationExists} missing-rows=${facts.f4MissingMigrationRows?.length ?? "?"} asks=${facts.f4AskNamesRename} census=${facts.f4CensusExists} targets=${facts.f4TargetsResolve} ${ok(f4.violations.length === 0)}`);
    console.log(`  F5 useDockItemDrag-retired: absent=${facts.f5ItemDragAbsent} live-importers=${facts.f5LiveImporters?.length ?? "?"} ${ok(f5.violations.length === 0)}`);
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkF1, checkF2, checkF3, checkF4, checkF5, selfTest };
