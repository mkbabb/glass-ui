#!/usr/bin/env node
// proof:dock — the dock-band silhouette-CUT VERIFY + dock-side clearance gate
// (BG.W-DOCK-CUT; F3 dock, paint-class H).
//
// `useDockContextSilhouette.ts` (551L) was the BE dock context→silhouette state
// machine with ZERO real import consumers (only an AppSwitcher.vue rationale
// COMMENT, which imports `useBloomUp` instead). The DELETE is owned ONCE by
// `BG.W-DEAD-COMPOSABLE-CUT` (ratchet #8 — R1); THIS wave VERIFIES the dock band
// is CLEAR of the dead engine + its retired companions, from the DOCK side.
//
// The distinct value beside proof:motion (which owns the MOTION-band dead-cut
// census — the composable + the retired gate SCRIPT) is the CHRONIC-5 close:
// "every dock cut reds a registered gate." A retired gate whose ID lingers in
// the manifest (`gates.mjs`) or `package.json` re-emits into `ci.yml` and CI
// then runs a non-existent npm script. proof:dock asserts `proof:dock-context`
// is FULLY de-registered (script file gone AND no manifest row AND no package
// script), plus the anti-over-cut fence: the LIVE `DOCK_CONTEXT_LABEL` +
// `dockContext.ts` dock-context DI primitive (UNRELATED to the dead silhouette
// engine, only a name overlap) is KEPT.
//
// Pure FS, device-free (paint-class H). On HEAD the cut + retirement already
// landed (precond 10.5), so the clauses are GREEN; the born-RED capability is
// proven by the self-test bites — each synthetic sabotage reproduces a
// pre-cut / re-registration fragment and REDs its clause, and each fence bite
// (a comment mention, the `-contextual-layers` substring, the live DI) must NOT
// flag.
//
// Asserts:
//   D1 — SILHOUETTE-COMPOSABLE-ABSENT: the 551L
//        `src/components/custom/dock/composables/useDockContextSilhouette.ts`
//        is DEFINITION-ABSENT on disk.
//   D2 — SILHOUETTE-TEST-ABSENT:
//        `tests/components/custom/dock/useDockContextSilhouette.test.ts` gone.
//   D3 — DEAD-GATE-FULLY-RETIRED: `scripts/proof-dock-context.mjs` gone AND
//        `gates.mjs` carries NO `proof:dock-context` row AND `package.json`
//        carries NO `proof:dock-context` script (the CHRONIC-5 dead-gate
//        re-point closed at the manifest — so `renderCiYaml` never re-emits it;
//        the `-contextual-layers` sibling is FENCED by the boundary regex).
//   D4 — DOCK-SURFACES-CLEAR: no comment-stripped live reference to
//        `useDockContextSilhouette` / `DockSilhouetteDescriptor` survives in the
//        dock source tree (`src/components/custom/dock/**`) or the dock demo
//        stories (`demo/stories/dock/**`) — a runtime import of a deleted module
//        breaks build. A historical rationale COMMENT does NOT flag (the
//        comment-strip fence — AppSwitcher.vue's "as fits" note is history).
//   D5 — LIVE-DOCK-CONTEXT-DI-KEPT (the anti-over-cut fence): the LIVE
//        `DOCK_CONTEXT_LABEL` constant (constants.ts) + `dockContext.ts` DI
//        primitive SURVIVE — the dock-context DI shares the "context" name with
//        the dead silhouette engine but is a DISTINCT live consumer; an
//        over-eager cut deleting it is forbidden.
//
// Self-test bites (born-RED demonstration): a re-added silhouette composable REDs
// D1; a re-added test REDs D2; a surviving gate script / a re-added
// `proof:dock-context` manifest row / a re-added package script each RED D3 while
// a bare `proof:dock-contextual-layers` row does NOT (the boundary fence); a live
// `import { useDockContextSilhouette }` in the dock tree REDs D4 while a bare
// comment mention does NOT (the strip fence); a missing `DOCK_CONTEXT_LABEL` or a
// deleted `dockContext.ts` REDs D5 (the over-cut).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock";
const SELF_TEST = process.argv.includes("--self-test");

const SILHOUETTE_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/useDockContextSilhouette.ts",
);
const SILHOUETTE_TEST = resolve(
    ROOT,
    "tests/components/custom/dock/useDockContextSilhouette.test.ts",
);
const DEAD_GATE_SCRIPT = resolve(ROOT, "scripts/proof-dock-context.mjs");
const GATES_MJS = resolve(ROOT, "scripts/gates.mjs");
const PACKAGE_JSON = resolve(ROOT, "package.json");
const DOCK_CONSTANTS = resolve(ROOT, "src/components/custom/dock/constants.ts");
const DOCK_CONTEXT_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/dockContext.ts",
);

// The dead-engine identifiers a live wire would name.
const DEAD_TOKENS = ["useDockContextSilhouette", "DockSilhouetteDescriptor"];
// The live dock-context DI constant — KEPT (the anti-over-cut fence).
const LIVE_DI_LABEL = "DOCK_CONTEXT_LABEL";

// The dock corpus for D4 — the dock band's own source turf + its demo stories.
const DOCK_CORPUS_ROOTS = ["src/components/custom/dock", "demo/stories/dock"];
const CORPUS_EXTS = new Set([".ts", ".vue", ".mjs"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);

// Retired-gate REGISTRATION matchers — the FORM, not prose. The closing quote
// must sit immediately after `context`, so the `-contextual-layers` sibling is
// FENCED (its quote is after `layers`), AND a note STRING that merely NAMES the
// retired gate ("supersedes proof:dock-context") never false-REDs (only an
// actual `id:`/`cmd:` manifest row or a package script KEY is a registration).
const MANIFEST_ROW_RE = /\b(?:id|cmd)\s*:\s*["']proof:dock-context["']/;
const PACKAGE_SCRIPT_RE = /["']proof:dock-context["']\s*:/;

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip /* block */ + // line + <!-- vue --> comments so a provenance comment
// that NAMES the retired engine is never a false RED — a token named in a
// comment is history, never a live wire. The // strip is URL-safe (the
// `(^|[^:])//` house idiom) so a `://` in a string literal survives.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/gm, "$1");
}

// Walk the dock corpus roots → [{ rel, stripped }].
function collectDockCorpus() {
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
            if (e.isDirectory()) {
                walk(full);
                continue;
            }
            const dot = e.name.lastIndexOf(".");
            const ext = dot >= 0 ? e.name.slice(dot) : "";
            if (!CORPUS_EXTS.has(ext)) continue;
            out.push({
                rel: full.slice(ROOT.length + 1),
                stripped: stripComments(readFileSync(full, "utf8")),
            });
        }
    };
    for (const r of DOCK_CORPUS_ROOTS) walk(resolve(ROOT, r));
    return out;
}

// overrides: { silhouetteExists?, testExists?, gateScriptExists?, manifestSrc?,
//              packageSrc?, dockCorpus?, constantsSrc?, dockContextExists? }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const silhouetteExists =
        overrides.silhouetteExists ?? existsSync(SILHOUETTE_TS);
    const testExists = overrides.testExists ?? existsSync(SILHOUETTE_TEST);
    const gateScriptExists =
        overrides.gateScriptExists ?? existsSync(DEAD_GATE_SCRIPT);
    const manifestSrc = overrides.manifestSrc ?? read(GATES_MJS);
    const packageSrc = overrides.packageSrc ?? read(PACKAGE_JSON);
    const dockCorpus = overrides.dockCorpus ?? collectDockCorpus();
    const constantsSrc = overrides.constantsSrc ?? read(DOCK_CONSTANTS);
    const dockContextExists =
        overrides.dockContextExists ?? existsSync(DOCK_CONTEXT_TS);

    // ── D1 — SILHOUETTE-COMPOSABLE-ABSENT ──
    facts.silhouetteExists = silhouetteExists;
    assert(
        "D1 — useDockContextSilhouette.ts (the 551L dead context→silhouette engine) is DEFINITION-ABSENT",
        !silhouetteExists,
    );

    // ── D2 — SILHOUETTE-TEST-ABSENT ──
    facts.testExists = testExists;
    assert(
        "D2 — tests/components/custom/dock/useDockContextSilhouette.test.ts is DEFINITION-ABSENT",
        !testExists,
    );

    // ── D3 — DEAD-GATE-FULLY-RETIRED (CHRONIC-5: a retired gate re-emits into ci.yml) ──
    const manifestRowPresent = MANIFEST_ROW_RE.test(manifestSrc);
    const packageScriptPresent = PACKAGE_SCRIPT_RE.test(packageSrc);
    facts.gateScriptExists = gateScriptExists;
    facts.deadGateManifestRowPresent = manifestRowPresent;
    facts.deadGatePackageScriptPresent = packageScriptPresent;
    assert(
        "D3 — proof:dock-context is FULLY retired (script file gone, no gates.mjs row, no package.json script — so renderCiYaml never re-emits a dead CI step)",
        !gateScriptExists && !manifestRowPresent && !packageScriptPresent,
    );

    // ── D4 — DOCK-SURFACES-CLEAR (no live import of the deleted module) ──
    const liveRefs = [];
    for (const f of dockCorpus) {
        for (const t of DEAD_TOKENS) {
            if (f.stripped.includes(t)) {
                liveRefs.push(`${f.rel}:${t}`);
                break;
            }
        }
    }
    facts.dockCorpusFiles = dockCorpus.length;
    facts.liveDeadRefs = liveRefs;
    assert(
        "D4 — the dock source tree + dock demo stories carry ZERO comment-stripped live reference to the dead engine (useDockContextSilhouette / DockSilhouetteDescriptor)",
        liveRefs.length === 0,
    );

    // ── D5 — LIVE-DOCK-CONTEXT-DI-KEPT (the anti-over-cut fence) ──
    const labelKept = constantsSrc.includes(LIVE_DI_LABEL);
    facts.liveDiLabelKept = labelKept;
    facts.dockContextExists = dockContextExists;
    assert(
        "D5 — the LIVE dock-context DI (DOCK_CONTEXT_LABEL in constants.ts + dockContext.ts) SURVIVES the cut (the name-overlap anti-over-cut fence)",
        labelKept && dockContextExists,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, labelFrag, name) => {
        const { violations } = detect(overrides);
        if (violations.some((v) => v.startsWith(labelFrag))) flagged++;
        else
            throw new Error(
                `[proof:dock self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, labelFrag, name) => {
        const { violations } = detect(overrides);
        if (!violations.some((v) => v.startsWith(labelFrag))) flagged++;
        else
            throw new Error(
                `[proof:dock self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // A clean synthetic baseline — every subject in its post-cut state, so a
    // single planted fragment is the sole cause of the RED (no live-tree confound).
    const CLEAN_MANIFEST = `{ id: "proof:dock-contextual-layers", cmd: "proof:dock-contextual-layers", tags: ["ci"] },`;
    const CLEAN_PACKAGE = `"proof:dock-contextual-layers": "node scripts/proof-dock-contextual-layers.mjs",`;
    const CLEAN_CONSTANTS = `export const ${LIVE_DI_LABEL} = "glass-ui:dock-context";`;
    const CLEAN_CORPUS = [
        {
            rel: "demo/stories/dock/examples/AppSwitcher.vue",
            // A rationale COMMENT naming the dead engine — history, comment-stripped.
            stripped: stripComments(
                `// audit §W10: "AppSwitcher->useDockContextSilhouette as fits"; the silhouette engine is overkill\nimport { useBloomUp } from "../../../../src/composables/motion";`,
            ),
        },
        {
            rel: "src/components/custom/dock/composables/index.ts",
            stripped: `export { useDockState } from "./useDockState";`,
        },
    ];
    const base = {
        silhouetteExists: false,
        testExists: false,
        gateScriptExists: false,
        manifestSrc: CLEAN_MANIFEST,
        packageSrc: CLEAN_PACKAGE,
        dockCorpus: CLEAN_CORPUS,
        constantsSrc: CLEAN_CONSTANTS,
        dockContextExists: true,
    };

    // Sanity: the clean synthetic baseline is fully GREEN (no confound).
    if (detect(base).violations.length !== 0)
        throw new Error(
            `[proof:dock self-test] the clean synthetic baseline is not GREEN: ${JSON.stringify(detect(base).violations)}`,
        );

    // D1: a re-added silhouette composable.
    sab(
        { ...base, silhouetteExists: true },
        "D1",
        "D1 silhouette composable re-added",
    );
    // D2: a re-added test.
    sab({ ...base, testExists: true }, "D2", "D2 silhouette test re-added");
    // D3: a surviving gate script.
    sab(
        { ...base, gateScriptExists: true },
        "D3",
        "D3 proof-dock-context.mjs survives on disk",
    );
    // D3: a re-registered manifest row.
    sab(
        {
            ...base,
            manifestSrc:
                CLEAN_MANIFEST +
                `\n{ id: "proof:dock-context", cmd: "proof:dock-context", tags: ["ci"] },`,
        },
        "D3",
        "D3 proof:dock-context re-added to the gates.mjs manifest",
    );
    // D3: a re-registered package script.
    sab(
        {
            ...base,
            packageSrc:
                CLEAN_PACKAGE +
                `\n"proof:dock-context": "node scripts/proof-dock-context.mjs",`,
        },
        "D3",
        "D3 proof:dock-context re-added to package.json scripts",
    );
    // D3 (fence): the `-contextual-layers` sibling alone does NOT flag (boundary regex).
    sabNot(
        { ...base, manifestSrc: CLEAN_MANIFEST, packageSrc: CLEAN_PACKAGE },
        "D3",
        "D3 the proof:dock-contextual-layers sibling substring fence",
    );
    // D3 (fence): a PROSE note NAMING the retired gate is NOT a registration.
    sabNot(
        {
            ...base,
            manifestSrc:
                CLEAN_MANIFEST +
                `\n{ id: "proof:dock", cmd: "proof:dock", note: "supersedes the retired proof:dock-context census" },`,
            packageSrc:
                CLEAN_PACKAGE + `\n"proof:dock": "node scripts/proof-dock.mjs",`,
        },
        "D3",
        "D3 the prose-note fence (a note naming proof:dock-context is not a registration row)",
    );
    // D4: a live import of the deleted module in the dock tree.
    sab(
        {
            ...base,
            dockCorpus: [
                ...CLEAN_CORPUS,
                {
                    rel: "src/components/custom/dock/composables/index.ts",
                    stripped: `import { useDockContextSilhouette } from "./useDockContextSilhouette";`,
                },
            ],
        },
        "D4",
        "D4 a live useDockContextSilhouette import survives in the dock tree",
    );
    // D4: a live DockSilhouetteDescriptor type reference.
    sab(
        {
            ...base,
            dockCorpus: [
                {
                    rel: "src/components/custom/dock/constants.ts",
                    stripped: `import type { DockSilhouetteDescriptor } from "./composables/useDockContextSilhouette";`,
                },
            ],
        },
        "D4",
        "D4 a live DockSilhouetteDescriptor type import survives",
    );
    // D4 (fence): a bare COMMENT mention does NOT flag (the comment-strip fence).
    sabNot(
        {
            ...base,
            dockCorpus: [
                {
                    rel: "demo/stories/dock/examples/AppSwitcher.vue",
                    stripped: stripComments(
                        `// the useDockContextSilhouette engine is overkill; use useBloomUp\n<!-- DockSilhouetteDescriptor was the dead type -->\nimport { useBloomUp } from "x";`,
                    ),
                },
            ],
        },
        "D4",
        "D4 the comment-mention fence (a provenance note is not a live wire)",
    );
    // D5: the live DI label deleted (the over-cut).
    sab(
        { ...base, constantsSrc: `export const OTHER = 1;` },
        "D5",
        "D5 DOCK_CONTEXT_LABEL co-deleted (the anti-over-cut fence)",
    );
    // D5: dockContext.ts co-deleted (the over-cut).
    sab(
        { ...base, dockContextExists: false },
        "D5",
        "D5 dockContext.ts co-deleted (the anti-over-cut fence)",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_ARTIFACT", "BG-dock");

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:dock — the dead useDockContextSilhouette engine cut + the dock-side clearance VERIFY (BG.W-DOCK-CUT; delete owned by BG.W-DEAD-COMPOSABLE-CUT)",
    );
    console.log(`  D1 silhouette composable absent : ${!facts.silhouetteExists}`);
    console.log(`  D2 silhouette test absent       : ${!facts.testExists}`);
    console.log(
        `  D3 dead gate fully retired      : ${violations.every((v) => !v.startsWith("D3"))} (script=${facts.gateScriptExists}, manifest=${facts.deadGateManifestRowPresent}, package=${facts.deadGatePackageScriptPresent})`,
    );
    console.log(
        `  D4 dock surfaces clear          : ${violations.every((v) => !v.startsWith("D4"))} (files=${facts.dockCorpusFiles}, liveRefs=${JSON.stringify(facts.liveDeadRefs)})`,
    );
    console.log(
        `  D5 live dock-context DI kept    : ${violations.every((v) => !v.startsWith("D5"))} (label=${facts.liveDiLabelKept}, dockContext.ts=${facts.dockContextExists})`,
    );
    console.log(
        `  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (D1 + D2 + D3×3 + D3-fence×2 + D4×2 + D4-fence + D5×2)`,
    );

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST)
        console.log(
            `\n[proof:dock --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, selfTest };
