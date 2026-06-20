#!/usr/bin/env node
// proof:page-prune — the demo-route + dead-CTA + platitude prune gate (BC.W-PAGE-PRUNE).
//
// A developer walking the demo never lands on a dead/unreachable page, never reads a
// platitude / out-of-date claim, never sees a "View the source" button that goes
// nowhere, and never hits an orphan SFC on disk with no route. Every surviving page
// earns its place; every cut is recorded in PRUNE-LEDGER.md (the no-silent-prune
// floor — a future agent cannot re-add a dead route without re-tripping the gate).
//
// Pure FS, device-free. The PAINTED render (the surviving pages reading legible) is
// the proof:ba-gestalt page-band verdict + the dev-tools MCP walk; this is the
// ABSENCE arm — a prune paints zero new pixels (the BB "register-disposition flip
// carries no gestalt verdict" precedent).
//
// Asserts (born-RED on the pre-prune tree → GREEN at close):
//   P1 — ZERO "View the source" / "view-source" string in demo/stories/**.
//   P2 — ZERO orphan SFC under demo/stories/composables/ (the dir is GONE), except a
//        verified-kept set recorded in PRUNE-LEDGER.md (the anti-re-add floor).
//   P3 — ZERO "coming soon" / "lorem" / TODO-in-template platitude in the enrolled
//        demo set (the sortable-list kanban "Todo" column label is allowlisted by
//        exact context — a rendered column heading, not a TODO comment).
//   P4 — the IA ≡ disk bidirectional assert: every manifest route resolves to an SFC
//        on disk, AND every kebab-case <category>/<id>.vue has a manifest row (the
//        PascalCase chassis-partials are import primitives, exempt — the
//        proof:claude-structure-sync precedent transposed to the demo IA).
//   P5 — PRUNE-LEDGER.md records every cut with a why + the pre-flight verification.
//
// Self-test bite: a synthetic re-added "View the source" REDs P1; a synthetic
// re-added orphan composables SFC with no manifest row + no ledger entry REDs P2/P4;
// a synthetic "coming soon" REDs P3.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:page-prune";
const SELF_TEST = process.argv.includes("--self-test");

const STORIES_DIR = resolve(ROOT, "demo/stories");
const MANIFEST = "demo/stories/manifest.ts";
const LEDGER = "docs/tranches/BC/audit/PRUNE-LEDGER.md";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Walk demo/stories/<category>/<id>.vue — the manifest glob ./*/*.vue reach (one
// dir level deep). Returns { kebab: [...], pascal: [...] } relative paths.
function walkCategorySfcs() {
    const kebab = [];
    const pascal = [];
    if (!existsSync(STORIES_DIR)) return { kebab, pascal };
    for (const cat of readdirSync(STORIES_DIR)) {
        const catDir = resolve(STORIES_DIR, cat);
        if (!statSync(catDir).isDirectory()) continue;
        for (const f of readdirSync(catDir)) {
            if (!f.endsWith(".vue")) continue;
            const rel = `demo/stories/${cat}/${f}`;
            // PascalCase (starts with an uppercase letter) → a chassis/import
            // partial, not a route slug; kebab-case → a navigable story route.
            if (/^[A-Z]/.test(f)) pascal.push(rel);
            else kebab.push(rel);
        }
    }
    return { kebab: kebab.sort(), pascal: pascal.sort() };
}

// Parse the manifest s("cat", "id", ...) calls → the route SFC paths.
function manifestRoutes(manifest) {
    const out = [];
    const re = /\bs\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(manifest)) !== null) {
        out.push(`demo/stories/${m[1]}/${m[2]}.vue`);
    }
    return out.sort();
}

// Strip // line + /* block */ + <!-- vue --> comments so a prose mention in a
// comment is not mistaken for a rendered string. P1/P3 scan the STRIPPED text
// (a platitude in a comment is not rendered — but a "View the source" BUTTON is
// in the template, which survives the strip).
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "")
        .replace(/<!--[\s\S]*?-->/g, "");
}

// Recursively gather every demo/stories/**/*.{vue,ts} (for the P1/P3 string scan).
function allStoryFiles(dir = STORIES_DIR, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const f of readdirSync(dir)) {
        const p = resolve(dir, f);
        if (statSync(p).isDirectory()) allStoryFiles(p, acc);
        else if (/\.(vue|ts)$/.test(f)) acc.push(p);
    }
    return acc;
}

// The kanban "Todo" column label is a legitimate rendered heading, not a TODO
// platitude. P3 allowlists the exact rendered/label contexts.
function isKanbanTodo(line) {
    return (
        />Todo</.test(line) ||
        /"Todo"/.test(line) ||
        /'Todo'/.test(line) ||
        /Todo \/ Doing \/ Done/.test(line) ||
        /<!--\s*Todo\s*-->/.test(line)
    );
}

// ── The detector — runs over a SOURCE MAP so the self-test can sabotage inputs.
// `sources` overrides: { storiesText?, manifest?, ledger?, syntheticOrphan?,
// kebabExtra?[] } — when absent, the real FS is read.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const manifest = overrides.manifest ?? read(MANIFEST);
    const ledger = overrides.ledger ?? read(LEDGER);

    // The string corpus: every demo/stories file's STRIPPED text, plus any
    // synthetic text the self-test injects.
    const realFiles = allStoryFiles();
    const corpusParts = realFiles.map((p) => ({
        path: p.slice(ROOT.length + 1),
        text: stripComments(readFileSync(p, "utf8")),
        raw: readFileSync(p, "utf8"),
    }));
    if (overrides.storiesText) {
        corpusParts.push({
            path: "demo/stories/__synthetic__.vue",
            text: stripComments(overrides.storiesText),
            raw: overrides.storiesText,
        });
    }

    // ── P1 — no "View the source" / view-source string survives. ──
    const viewSourceHits = corpusParts.filter((c) =>
        /view[\s-]+(the[\s-]+)?source/i.test(c.text),
    );
    facts.viewSourceHits = viewSourceHits.map((c) => c.path);
    assert("P1 — zero 'View the source' string survives", viewSourceHits.length === 0);

    // ── P2 — the orphan composables/ dir is GONE (or only a ledgered keep set). ──
    const composablesDir = resolve(STORIES_DIR, "composables");
    let composablesSfcs = [];
    if (existsSync(composablesDir) && statSync(composablesDir).isDirectory()) {
        composablesSfcs = readdirSync(composablesDir)
            .filter((f) => f.endsWith(".vue"))
            .map((f) => `composables/${f}`);
    }
    if (overrides.syntheticOrphan) composablesSfcs.push(overrides.syntheticOrphan);
    // A surviving composables SFC must be recorded as a KEEP in the ledger (the
    // anti-re-add floor). With the shelf retired, the kept set is empty → the dir
    // GONE is the GREEN state.
    const unledgeredOrphans = composablesSfcs.filter(
        (s) => !ledger.includes(basename(s, ".vue")) || !/KEEP/i.test(ledger),
    );
    facts.composablesSfcs = composablesSfcs;
    assert(
        "P2 — zero un-ledgered orphan SFC under composables/",
        unledgeredOrphans.length === 0,
    );

    // ── P3 — no "coming soon" / "lorem" / TODO-platitude survives. ──
    const platitudeHits = [];
    for (const c of corpusParts) {
        for (const line of c.text.split("\n")) {
            if (/coming\s+soon/i.test(line)) platitudeHits.push([c.path, line.trim()]);
            else if (/\blorem\b/i.test(line)) platitudeHits.push([c.path, line.trim()]);
            else if (/\bTODO\b/.test(line) && !isKanbanTodo(line))
                platitudeHits.push([c.path, line.trim()]);
        }
    }
    facts.platitudeHits = platitudeHits;
    assert("P3 — zero platitude (coming soon / lorem / TODO)", platitudeHits.length === 0);

    // ── P4 — the IA ≡ disk bidirectional assert. ──
    const { kebab, pascal } = walkCategorySfcs();
    const kebabSet = new Set(kebab);
    if (overrides.kebabExtra) for (const k of overrides.kebabExtra) kebabSet.add(k);
    const routes = manifestRoutes(manifest);
    const routeSet = new Set(routes);

    // (a) every manifest route resolves to a real SFC on disk (no dangling row).
    const danglingRows = routes.filter((r) => !kebabSet.has(r));
    facts.danglingRows = danglingRows;
    assert("P4a — every manifest route resolves to an SFC on disk", danglingRows.length === 0);

    // (b) every kebab-case category SFC has a manifest row (no orphan content SFC).
    const orphanSfcs = [...kebabSet].filter((k) => !routeSet.has(k));
    facts.orphanSfcs = orphanSfcs;
    assert("P4b — every story SFC has a manifest row (no orphan)", orphanSfcs.length === 0);

    // The PascalCase partials are recorded as the exempt chassis-import set.
    facts.chassisPartials = pascal;

    // ── P5 — the PRUNE-LEDGER records the cuts with why + pre-flight. ──
    assert("P5 — PRUNE-LEDGER.md exists", ledger.length > 0);
    assert(
        "P5 — ledger records the view-source cut",
        /View the source/i.test(ledger) && /CUT/i.test(ledger),
    );
    assert(
        "P5 — ledger records the 21 orphan composables + the pre-flight",
        /21 orphan/i.test(ledger) && /pre-flight/i.test(ledger),
    );
    assert(
        "P5 — ledger records the 'coming soon' cut",
        /coming soon/i.test(ledger),
    );
    assert(
        "P5 — ledger records the paper-texture rename",
        /paper-texture/i.test(ledger) && /RENAMED/i.test(ledger),
    );

    return { facts, violations };
}

// ── The self-test bite (anti-evasion) — each sabotage REDs its clause. Proves the
// gate is not vacuous (the proof-demo-design / proof-page-redesign house pattern).
function selfTest() {
    let flagged = 0;
    const sab = (overrides, clauseLabels, name) => {
        const { violations } = detect(overrides);
        const tripped = clauseLabels.some((l) => violations.includes(l));
        if (tripped) flagged++;
        else
            throw new Error(
                `[proof:page-prune self-test] the bite FAILED to flag the sabotage: ${name}`,
            );
    };
    // P1: re-add a "View the source" button → REDs P1.
    sab(
        { storiesText: `<Button variant="ghost">View the source</Button>` },
        ["P1 — zero 'View the source' string survives"],
        "P1 view-source re-added",
    );
    // P2: re-add an orphan composables SFC with no ledger keep → REDs P2.
    sab(
        { syntheticOrphan: "composables/use-ghost.vue" },
        ["P2 — zero un-ledgered orphan SFC under composables/"],
        "P2 orphan composable re-added",
    );
    // P3: re-add a "coming soon" platitude → REDs P3.
    sab(
        { storiesText: `<SelectItem disabled>Brutalist (coming soon)</SelectItem>` },
        ["P3 — zero platitude (coming soon / lorem / TODO)"],
        "P3 coming-soon re-added",
    );
    // P4: a kebab SFC with no manifest row → REDs P4b.
    sab(
        { kebabExtra: ["demo/stories/foundations/ghost-route.vue"] },
        ["P4b — every story SFC has a manifest row (no orphan)"],
        "P4 orphan-route re-added",
    );
    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_PAGE_PRUNE_ARTIFACT", "BC-page-prune");

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:page-prune",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log("proof:page-prune — every surviving demo page earns its place");
    console.log(`  P1 no view-source        : ${facts["P1 — zero 'View the source' string survives"]}`);
    console.log(`  P2 composables/ pruned    : ${facts["P2 — zero un-ledgered orphan SFC under composables/"]}`);
    console.log(`  P3 no platitude           : ${facts["P3 — zero platitude (coming soon / lorem / TODO)"]}`);
    console.log(`  P4a routes resolve        : ${facts["P4a — every manifest route resolves to an SFC on disk"]}`);
    console.log(`  P4b no orphan SFC         : ${facts["P4b — every story SFC has a manifest row (no orphan)"]}`);
    console.log(`  P5 ledger records cuts    : ${facts["P5 — PRUNE-LEDGER.md exists"]}`);
    console.log(`  chassis partials (exempt) : ${facts.chassisPartials.length}`);
    console.log(`  self-test (bite proof)    : OK — ${selfTestCount} synthetic sabotages flagged (P1/P2/P3/P4)`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
        if (facts.danglingRows?.length)
            console.log(`  dangling rows: ${JSON.stringify(facts.danglingRows)}`);
        if (facts.orphanSfcs?.length)
            console.log(`  orphan SFCs: ${JSON.stringify(facts.orphanSfcs)}`);
        if (facts.viewSourceHits?.length)
            console.log(`  view-source hits: ${JSON.stringify(facts.viewSourceHits)}`);
        if (facts.platitudeHits?.length)
            console.log(`  platitude hits: ${JSON.stringify(facts.platitudeHits)}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST) {
        console.log(`\n[proof:page-prune --self-test] ${selfTestCount} bite(s) flagged; ledger ${status === "pass" ? "GREEN" : "RED"}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
