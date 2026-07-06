#!/usr/bin/env node
// AY.W-COLOCATE — the feature-dir colocation convention gate (proof:colocation).
//
// The user's directive: "Complex components should be structured into sub-
// component dirs with components, composeables, constants, skeletons, thereof,
// if needed" + "Components and composeables should be colocated together when
// befitting." This gate makes ONE convention machine-enforced over the carved
// god-module dirs so it cannot silently drift the way it did pre-AY (goo-blob/
// dock/tabs grew a composables/ subdir organically; constellation stayed flat;
// no package ever extracted a constants.ts).
//
// For each TARGET dir it asserts (the §6 clauses):
//   (a) every composable (`^use[A-Z]` or a `*Context.ts` DI module) lives under
//       `<dir>/composables/` — NOT at the package root;
//   (b) a `<dir>/constants.ts` exists AND no composable carries a surviving
//       module-scope `const [A-Z_]{3,} = <number>` magic-number outside it;
//   (c) any `*.frag.ts`/`*.vert.ts`/`*.glsl.ts` shader OR `*Skeleton.vue` asset
//       lives in a named `shaders/`/`skeleton/` subdir (co-location WHEN present,
//       not existence — "if needed");
//   (d) a `<dir>/README.md` exists.
//
// PLUS the design-idiom-home doc-presence clause: docs/precepts/design-idioms.md
// is > 1 KB AND both CONTRIBUTING.md + src/styles/index.css carry the literal
// `design-idioms` reference.
//
// Born-RED on the pre-carve tree (constellation flat, no constants.ts).
// bite-check: move a composable to the package root, delete a constants.ts,
// inline a magic-number, or delete a target README → RED.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const CUSTOM = resolve(SRC, "components/custom");
const ARTIFACT = gateArtifactPath("GLASS_UI_COLOCATION_ARTIFACT", "AY-colocation");

// BA.W-HYGIENE (P-6): the TARGET set is DERIVED, not a frozen hand-list. A `custom/`
// dir is a COMPLEX feature-dir — bound by the colocation convention — iff it carries a
// `README.md`, the convention's OWN adoption marker (the §6 clause (d) "+ a README.md":
// the README is the authored signal that a dir adopted the feature-dir layout). Deriving
// off the marker the convention itself defines means a future complex dir gains coverage
// AUTOMATICALLY the moment it adds its README — there is no frozen list to forget to
// extend, and the gate cannot be gamed by adding a complex dir un-listed.
//
// At HEAD this widens coverage to {aurora, constellation, dock, fourier-field, goo-blob,
// tabs, underline} — the original four PLUS the two escaping complex dirs P-6 names
// (aurora/ — composables/ + a constants/ dir + shaders/; fourier-field/ — math.ts +
// presets.ts) PLUS underline/ (a README-bearing simple dir). The spec's literal
// "composables/ OR shaders/ subdir" criterion was the AUTHORING approximation, but the
// HEAD re-grep falsifies it: fourier-field/ carries NEITHER subdir (its domain lives in
// math.ts/presets.ts FILES), so that criterion would MISS the named target, while it
// would over-pull infinite-scroll/search/typewriter (composables/-bearing but NOT
// README-adopted, so NOT convention-bound). The README marker is the principled
// derivation that yields exactly the convention-adopted complex set. (§0 drift recorded
// in the BA.W-HYGIENE report.)
function deriveTargetDirs() {
    return readdirSync(CUSTOM, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .filter((e) => existsSync(resolve(CUSTOM, e.name, "README.md")))
        .map((e) => `components/custom/${e.name}`)
        .sort();
}

const TARGET_DIRS = deriveTargetDirs();

const rel = (p) => relative(ROOT, p).split(sep).join("/");

/** A composable file: a `useXxx.ts` (camel after `use`) or a `*Context.ts`. */
function isComposable(name) {
    return /^use[A-Z]/.test(name) || /Context\.ts$/.test(name);
}
/** A shader asset. */
function isShader(name) {
    return /\.(frag|vert|glsl)\.ts$/.test(name) || /\.(frag|vert)$/.test(name);
}
/** A loading-skeleton component. */
function isSkeleton(name) {
    return /Skeleton\.vue$/.test(name);
}

/** List the immediate `.ts`/`.vue` entries at the package ROOT (non-recursive). */
function rootEntries(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isFile() && (e.name.endsWith(".ts") || e.name.endsWith(".vue")))
        .map((e) => e.name);
}

/** Recursively list `.ts` files under a sub-dir. */
function tsUnder(dir) {
    if (!existsSync(dir)) return [];
    const out = [];
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) out.push(...tsUnder(full));
        else if (e.isFile() && e.name.endsWith(".ts")) out.push(full);
    }
    return out;
}

/** Recursively list files under a dir whose name matches `extRe`. */
function filesUnder(dir, extRe) {
    if (!existsSync(dir)) return [];
    const out = [];
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) out.push(...filesUnder(full, extRe));
        else if (e.isFile() && extRe.test(e.name)) out.push(full);
    }
    return out;
}

/** Module-scope magic-number constants: `const NAME = <number...>` where NAME is
 *  SCREAMING_SNAKE (≥3 chars). Returns the matched names. Comments/strings are
 *  stripped first so a name mentioned in prose is not counted. */
function magicNumberConsts(file) {
    let css = readFileSync(file, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");
    const names = [];
    // module-scope (line begins, optional `export `) const NAME = <numeric/array>
    const re = /^\s*(?:export\s+)?const\s+([A-Z][A-Z0-9_]{2,})\s*[:=]/gm;
    let m;
    while ((m = re.exec(css))) {
        // Only count it as a magic-number const if the RHS looks numeric/array-of-
        // number/string-tuple (a magic constant), not a function/object factory.
        const tail = css.slice(m.index, m.index + 240);
        if (/=\s*(-?\d|\[|\(?\s*\d|1\s*\/|Math\.|\{?\s*["']?\w)/.test(tail)) {
            names.push(m[1]);
        }
    }
    return names;
}

function checkDir(dirRel) {
    const dir = resolve(ROOT, "src", dirRel);
    const violations = [];
    const facts = { dir: `src/${dirRel}`, exists: existsSync(dir) };
    if (!facts.exists) {
        violations.push(`${facts.dir} — target dir is absent`);
        return { violations, facts };
    }

    // (a) composables at the package root → violation.
    const rootComposables = rootEntries(dir).filter(isComposable);
    facts.rootComposables = rootComposables;
    for (const c of rootComposables) {
        violations.push(
            `src/${dirRel}/${c} — a composable lives at the package ROOT; relocate it under composables/`,
        );
    }

    // (b) a constants HOME exists when the dir has composables, + no UN-HOMED magic-
    //     number scattered across the composables. BA.W-HYGIENE: the home is a
    //     `constants.ts` FILE *or* a `constants/` DIR (aurora's pattern — the carve
    //     promoted its named ceilings into constants/{budget,presets,renderMode}.ts).
    //     The home is required only for a dir that HAS a composables/ subdir (the
    //     extraction target); a README-adopted simple dir with no composables (underline,
    //     fourier-field) has nothing to home, so the requirement is vacuous there.
    const composablesDir = resolve(dir, "composables");
    const hasComposablesDir = existsSync(composablesDir);
    const hasConstantsFile = existsSync(resolve(dir, "constants.ts"));
    const hasConstantsDir = existsSync(resolve(dir, "constants"));
    facts.hasConstants = hasConstantsFile || hasConstantsDir;
    if (hasComposablesDir && !facts.hasConstants) {
        violations.push(`src/${dirRel}/constants.ts — missing (extract the module-scope magic-numbers here; a constants/ dir also satisfies)`);
    }
    const composableFiles = tsUnder(composablesDir).filter((f) => {
        const base = f.split(sep).pop();
        return isComposable(base) || /^build|^upload/.test(base); // carve leaves
    });
    const stray = [];
    for (const f of composableFiles) {
        const names = magicNumberConsts(f);
        if (names.length) stray.push({ file: rel(f), names });
    }
    facts.strayMagicNumbers = stray;
    // A scattered magic-number is a violation ONLY when the dir has NO constants home at
    // all (the consts are genuinely homeless). A dir that HAS a home has made the
    // colocation decision; composable-local tuning consts beside their consumer are then
    // a permitted colocation choice ("colocate composables together" — aurora's
    // CURSOR_* lerp consts live with cursorModel.ts by design), not scatter. The bite
    // survives on the carve set: the original four carry a constants.ts AND ZERO strays,
    // so this clause is unchanged for them; a NEW homeless stray REDs.
    if (!facts.hasConstants) {
        for (const s of stray) {
            violations.push(
                `${s.file} — module-scope magic-number const(s) [${s.names.join(", ")}] with NO constants home in the dir; add a constants.ts/ dir`,
            );
        }
    }

    // (c) shaders/skeletons co-located WHEN present.
    const rootShaders = rootEntries(dir).filter(isShader);
    const rootSkeletons = rootEntries(dir).filter(isSkeleton);
    facts.rootShaders = rootShaders;
    facts.rootSkeletons = rootSkeletons;
    for (const s of rootShaders)
        violations.push(`src/${dirRel}/${s} — shader asset at the package root; co-locate under shaders/`);
    for (const s of rootSkeletons)
        violations.push(`src/${dirRel}/${s} — skeleton at the package root; co-locate under skeleton/`);

    // (d) README present.
    facts.hasReadme = existsSync(resolve(dir, "README.md"));
    if (!facts.hasReadme) violations.push(`src/${dirRel}/README.md — missing`);

    return { violations, facts };
}

function checkIdiomHome() {
    const violations = [];
    const doc = resolve(ROOT, "docs/precepts/design-idioms.md");
    const facts = { docExists: existsSync(doc), docBytes: 0, citedByContributing: false, citedByIndexCss: false, precepteSubmodulePresent: true };
    // docs/precepts is a git SUBMODULE (a sibling private repo). On a CI runner
    // the checkout does not initialize it (and cannot — the default token has no
    // cross-repo grant), so the dir is empty. Absent-submodule → skip-by-policy
    // (the sibling-gate convention: proof:resolution et al.) — never a hard
    // failure on a runner that cannot see the doc. Locally the clause BITES.
    const preceptsDir = resolve(ROOT, "docs/precepts");
    const submodulePresent =
        existsSync(preceptsDir) && readdirSync(preceptsDir).length > 0;
    facts.precepteSubmodulePresent = submodulePresent;
    if (!submodulePresent) {
        console.log(
            "  idiom-home: SKIP-BY-POLICY — docs/precepts submodule not initialized on this runner (the doc clause bites locally)",
        );
    } else if (!facts.docExists) {
        violations.push("docs/precepts/design-idioms.md — the design-idiom home is missing");
    } else {
        facts.docBytes = statSync(doc).size;
        if (facts.docBytes < 1024)
            violations.push(`docs/precepts/design-idioms.md is ${facts.docBytes}B (< 1 KB) — a stub, not the enumerated home`);
        const body = readFileSync(doc, "utf8");
        // Must enumerate the @theme + @utility homes + the partial rule.
        for (const needle of ["@theme", "@utility", "@apply", "@import"]) {
            if (!body.includes(needle))
                violations.push(`docs/precepts/design-idioms.md — does not enumerate the ${needle} home`);
        }
    }
    const contributing = resolve(ROOT, "CONTRIBUTING.md");
    if (existsSync(contributing) && readFileSync(contributing, "utf8").includes("design-idioms"))
        facts.citedByContributing = true;
    else violations.push("CONTRIBUTING.md — does not cite design-idioms");
    const indexCss = resolve(ROOT, "src/styles/index.css");
    if (existsSync(indexCss) && readFileSync(indexCss, "utf8").includes("design-idioms"))
        facts.citedByIndexCss = true;
    else violations.push("src/styles/index.css — cascade header does not cite design-idioms");
    return { violations, facts };
}

// BH.B2.4a — the CARVE-LEAF clause. The colocation convention's dir-scan covers the
// `components/custom/` README-bearing feature-dirs; this clause additionally asserts the
// THREE god-module carves this wave landed live as colocated `composables/` (or sibling)
// leaves, each IMPORTED BACK by its host (the carve MOVED the logic, it did not duplicate
// it). The gate FOLLOWS the composition into the leaf (the `proof:webgl-substrate-single`
// precedent). Born-RED on the pre-carve tree (the leaves are absent — the worm/field logic
// still lives inline in the SFCs/composable), GREEN once the carve lands. Two arms reach
// dirs the README-derived target-scan does NOT cover (`components/ui/carousel`,
// `composables/motion`), so the convention is enforced beyond the custom-dir census.
const CARVE_LEAVES = [
    {
        host: "components/ui/carousel/CarouselContent.vue",
        leaf: "components/ui/carousel/composables/useCarouselWorm.ts",
        symbol: "useCarouselWorm",
        importPath: "./composables/useCarouselWorm",
    },
    {
        host: "components/custom/pager-dots/PagerDots.vue",
        leaf: "components/custom/pager-dots/composables/usePagerWorm.ts",
        symbol: "usePagerWorm",
        importPath: "./composables/usePagerWorm",
    },
    {
        host: "composables/motion/useBloomUp.ts",
        leaf: "composables/motion/bloomUpField.ts",
        symbol: "resolveField",
        importPath: "./bloomUpField",
    },
];

/** The reusable carve-leaf clause checker (runs over provided source so the self-test can
 *  feed it synthetic strings). Returns the violation strings for ONE carve entry. */
function evaluateCarveLeaf(entry, leafExists, leafSrc, hostSrc) {
    const violations = [];
    if (!leafExists) {
        violations.push(
            `src/${entry.leaf} — the carved colocation leaf is ABSENT; the ${entry.symbol} logic must live in the colocated leaf, not inline in src/${entry.host}`,
        );
        return violations;
    }
    const exportRe = new RegExp(
        `export\\s+(?:async\\s+)?(?:function|const|class)\\s+${entry.symbol}\\b`,
    );
    if (!exportRe.test(leafSrc)) {
        violations.push(
            `src/${entry.leaf} — does not export ${entry.symbol} (the carved leaf must publish the moved symbol)`,
        );
    }
    if (!hostSrc.includes(entry.importPath)) {
        violations.push(
            `src/${entry.host} — does not import from "${entry.importPath}" (the carve must be IMPORTED back, not duplicated)`,
        );
    }
    return violations;
}

function checkCarveLeaf(entry) {
    const leafPath = resolve(ROOT, "src", entry.leaf);
    const hostPath = resolve(ROOT, "src", entry.host);
    const leafExists = existsSync(leafPath);
    const leafSrc = leafExists ? readFileSync(leafPath, "utf8") : "";
    const hostSrc = existsSync(hostPath) ? readFileSync(hostPath, "utf8") : "";
    return evaluateCarveLeaf(entry, leafExists, leafSrc, hostSrc);
}

/** The self-test bite — synthetic carve states MUST each flag (or pass) the clause. */
function selfTestCarveLeaves() {
    const fails = [];
    const probe = { host: "x.vue", leaf: "x.ts", symbol: "useFoo", importPath: "./foo" };
    if (evaluateCarveLeaf(probe, false, "", "").length === 0) {
        fails.push(
            "[SELF-TEST] an ABSENT carve leaf did NOT flag (the carve-isomorphism detector is broken)",
        );
    }
    if (
        evaluateCarveLeaf(probe, true, "export function useFoo() {}", "no import here")
            .length === 0
    ) {
        fails.push(
            "[SELF-TEST] a leaf the host does NOT import did not flag (the import-back detector is broken — a duplicated carve would pass)",
        );
    }
    if (
        evaluateCarveLeaf(probe, true, "// no export of the symbol", 'import { useFoo } from "./foo"')
            .length === 0
    ) {
        fails.push(
            "[SELF-TEST] a leaf that does NOT export the symbol did not flag (the export detector is broken)",
        );
    }
    if (
        evaluateCarveLeaf(
            probe,
            true,
            "export function useFoo() {}",
            'import { useFoo } from "./foo"',
        ).length !== 0
    ) {
        fails.push(
            "[SELF-TEST] a correctly carved-and-imported leaf FALSELY flagged (the clause is over-strict)",
        );
    }
    return fails;
}

// BH.B2.5 — the DOCK-LEAF-VERIFY clause (W-dock-leaf-verify). WS2 owns the dock
// god-module carves; this wave is VERIFY-ONLY (ZERO carve) — it asserts the three facts
// the WS2 dock carve produced hold on the frontier + cleans the ONE stale comment the
// dead-engine cut left behind. The facts:
//   DL1 — GlassDock.vue is the carved SFC shell: it imports its state/morph/fission
//         logic back from `./composables/*` (the carve MOVED the logic into colocated
//         leaves, it did not inline it).
//   DL2 — useDockFission.ts is the carved fission leaf: it lives under composables/ AND
//         publishes `useDockFission` (the host composes it via useDockFissionWiring).
//   DL3 — useDockContextSilhouette.ts (the drained 551L BE context→silhouette engine) is
//         DEFINITION-ABSENT (the BG.W-DEAD-COMPOSABLE-CUT delete).
//   DL4 — the dock src + dock demo trees carry ZERO un-stripped reference (comment OR
//         code) to the dead engine token. DISTINCT from proof:dock D4: D4 STRIPS comments
//         (a dead-engine comment is not a live import, so D4 tolerates it); this is the
//         doc-hygiene assertion the D4 tolerance leaves open — the AppSwitcher.vue header
//         prose still named `useDockContextSilhouette`, and DL4 is the un-stripped scan
//         that flags it. scripts/ is EXCLUDED (the gate machinery legitimately documents
//         + self-tests the dead engine by name).
// Born-RED on HEAD (the AppSwitcher stale comment present) → GREEN once it is cleaned.
const DOCK_DIR = "components/custom/dock";
const DOCK_LEAF_VERIFY = {
    host: `${DOCK_DIR}/GlassDock.vue`,
    hostImportMarker: "./composables/",
    fissionLeaf: `${DOCK_DIR}/composables/useDockFission.ts`,
    fissionSymbol: "useDockFission",
    deadFile: `${DOCK_DIR}/composables/useDockContextSilhouette.ts`,
    deadTokens: ["useDockContextSilhouette", "DockSilhouetteDescriptor"],
    // the un-stripped scan trees (dock src + dock demo). scripts/ is deliberately absent.
    scanDirs: ["src/components/custom/dock", "demo/stories/dock"],
};

/** The reusable dock-leaf-verify clause checker (runs over provided state so the self-test
 *  can feed synthetic inputs). Returns the violation strings. */
function evaluateDockLeafVerify(s) {
    const violations = [];
    // DL1 — the carved host imports its composables back.
    if (!s.hostExists) {
        violations.push(`src/${DOCK_LEAF_VERIFY.host} — the dock host SFC is ABSENT`);
    } else if (!s.hostSrc.includes(DOCK_LEAF_VERIFY.hostImportMarker)) {
        violations.push(
            `src/${DOCK_LEAF_VERIFY.host} — imports no ./composables/* leaf (the dock logic must be carved into colocated composables + imported back, not inline)`,
        );
    }
    // DL2 — the fission carve leaf present + exports its symbol.
    if (!s.fissionExists) {
        violations.push(
            `src/${DOCK_LEAF_VERIFY.fissionLeaf} — the carved useDockFission leaf is ABSENT`,
        );
    } else if (
        !new RegExp(
            `export\\s+(?:async\\s+)?(?:function|const)\\s+${DOCK_LEAF_VERIFY.fissionSymbol}\\b`,
        ).test(s.fissionSrc)
    ) {
        violations.push(
            `src/${DOCK_LEAF_VERIFY.fissionLeaf} — does not export ${DOCK_LEAF_VERIFY.fissionSymbol} (the carved leaf must publish the moved symbol)`,
        );
    }
    // DL3 — the drained dead-engine composable is DEFINITION-ABSENT.
    if (s.deadFileExists) {
        violations.push(
            `src/${DOCK_LEAF_VERIFY.deadFile} — the drained useDockContextSilhouette engine must be DEFINITION-ABSENT (BG.W-DEAD-COMPOSABLE-CUT)`,
        );
    }
    // DL4 — no un-stripped dead-token reference (comment OR code) in the dock trees.
    for (const hit of s.deadHits) {
        violations.push(
            `${hit.file}:${hit.line} — a stale reference to the dead engine token "${hit.token}" survives; clean it (the engine is drained, the prose must not name it)`,
        );
    }
    return violations;
}

/** Scan the dock src + demo trees for un-stripped dead-engine token references. */
function scanDockDeadTokens() {
    const hits = [];
    for (const d of DOCK_LEAF_VERIFY.scanDirs) {
        const dir = resolve(ROOT, d);
        for (const f of filesUnder(dir, /\.(ts|vue)$/)) {
            const lines = readFileSync(f, "utf8").split("\n");
            lines.forEach((ln, i) => {
                for (const tok of DOCK_LEAF_VERIFY.deadTokens) {
                    if (ln.includes(tok)) hits.push({ file: rel(f), line: i + 1, token: tok });
                }
            });
        }
    }
    return hits;
}

function checkDockLeafVerify() {
    const hostPath = resolve(ROOT, "src", DOCK_LEAF_VERIFY.host);
    const fissionPath = resolve(ROOT, "src", DOCK_LEAF_VERIFY.fissionLeaf);
    const deadPath = resolve(ROOT, "src", DOCK_LEAF_VERIFY.deadFile);
    const state = {
        hostExists: existsSync(hostPath),
        hostSrc: existsSync(hostPath) ? readFileSync(hostPath, "utf8") : "",
        fissionExists: existsSync(fissionPath),
        fissionSrc: existsSync(fissionPath) ? readFileSync(fissionPath, "utf8") : "",
        deadFileExists: existsSync(deadPath),
        deadHits: scanDockDeadTokens(),
    };
    const violations = evaluateDockLeafVerify(state);
    return {
        violations,
        facts: {
            hostCarved: state.hostExists && state.hostSrc.includes(DOCK_LEAF_VERIFY.hostImportMarker),
            fissionLeaf: state.fissionExists,
            deadEngineAbsent: !state.deadFileExists,
            deadRefs: state.deadHits.length,
        },
    };
}

/** The self-test bite — synthetic dock-leaf states MUST each flag (or pass) the clause. */
function selfTestDockLeafVerify() {
    const fails = [];
    const OK = {
        hostExists: true,
        hostSrc: "import { useDockState } from './composables/useDockState'",
        fissionExists: true,
        fissionSrc: "export function useDockFission() {}",
        deadFileExists: false,
        deadHits: [],
    };
    const bite = (patch, msg) => {
        if (evaluateDockLeafVerify({ ...OK, ...patch }).length === 0) fails.push(msg);
    };
    bite({ hostExists: false, hostSrc: "" }, "[SELF-TEST] an absent GlassDock host did NOT flag");
    bite(
        { hostSrc: "import { x } from './other'" },
        "[SELF-TEST] a GlassDock host importing no ./composables/* leaf did NOT flag (a re-inlined dock would pass)",
    );
    bite(
        { fissionExists: false, fissionSrc: "" },
        "[SELF-TEST] an absent useDockFission leaf did NOT flag",
    );
    bite(
        { fissionSrc: "// no export of the symbol" },
        "[SELF-TEST] a fission leaf that does NOT export useDockFission did NOT flag",
    );
    bite(
        { deadFileExists: true },
        "[SELF-TEST] a surviving useDockContextSilhouette.ts did NOT flag",
    );
    bite(
        { deadHits: [{ file: "demo/stories/dock/examples/AppSwitcher.vue", line: 3, token: "useDockContextSilhouette" }] },
        "[SELF-TEST] a stale dead-engine comment reference did NOT flag (the AppSwitcher class this wave cleans)",
    );
    if (evaluateDockLeafVerify(OK).length !== 0) {
        fails.push(
            "[SELF-TEST] a correctly carved-and-cleaned dock state FALSELY flagged (the clause is over-strict)",
        );
    }
    return fails;
}

function run() {
    void SRC;
    const allViolations = [];
    const dirFacts = [];
    for (const d of TARGET_DIRS) {
        const { violations, facts } = checkDir(d);
        dirFacts.push(facts);
        allViolations.push(...violations);
    }
    const idiom = checkIdiomHome();
    allViolations.push(...idiom.violations);

    // BH.B2.4a — the carve-leaf clause + its self-test bite.
    const carveFacts = [];
    for (const entry of CARVE_LEAVES) {
        const violations = checkCarveLeaf(entry);
        carveFacts.push({ leaf: `src/${entry.leaf}`, ok: violations.length === 0 });
        allViolations.push(...violations);
    }
    const selfTestFails = selfTestCarveLeaves();
    allViolations.push(...selfTestFails);

    // BH.B2.5 — the dock-leaf-verify clause + its self-test bite.
    const dockLeaf = checkDockLeafVerify();
    allViolations.push(...dockLeaf.violations);
    allViolations.push(...selfTestDockLeafVerify());

    const status = allViolations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:colocation",
        facts: {
            targets: dirFacts,
            idiomHome: idiom.facts,
            carveLeaves: carveFacts,
            dockLeafVerify: dockLeaf.facts,
        },
        violations: allViolations,
    });

    console.log("proof:colocation — the feature-dir convention over the carved god-module dirs (AY.W-COLOCATE)");
    for (const f of dirFacts) {
        const flags = [
            f.hasConstants ? "constants✓" : "constants✗",
            (f.rootComposables?.length ?? 0) === 0 ? "composables✓" : "composables✗",
            f.hasReadme ? "readme✓" : "readme✗",
        ].join(" ");
        console.log(`  ${f.dir}  ${flags}`);
    }
    console.log(
        `  idiom-home: doc=${idiom.facts.docExists ? idiom.facts.docBytes + "B" : "MISSING"} contributing=${idiom.facts.citedByContributing} index.css=${idiom.facts.citedByIndexCss}`,
    );
    for (const c of carveFacts) {
        console.log(`  carve-leaf ${c.ok ? "✓" : "✗"} ${c.leaf}`);
    }
    const dl = dockLeaf.facts;
    console.log(
        `  dock-leaf-verify (B2.5): host-carved=${dl.hostCarved} fission-leaf=${dl.fissionLeaf} silhouette-absent=${dl.deadEngineAbsent} stale-dead-refs=${dl.deadRefs}`,
    );
    if (allViolations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${rel(ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
