#!/usr/bin/env node
// proof:build — the BG F8 MACHINE close-family gate (R3 close taxonomy:
// proof:build machine · proof:meta plan/process · proof:warm-identity paint;
// there is NO proof:close). ONE growing clause runner each F8 MACHINE close wave
// appends to; BG.W-CSS-MINIFY (F8.4) SEEDS it with the css-minify + critical-prune
// clauses.
//
// THE WAVE (F8.4 / W-CSS-MINIFY, GD-FOLD-5 — the perf transposition):
//   - MINIFY every published `dist/styles/**/*.css` partial at publish time
//     (strip comments + collapse whitespace, string-safe) — `vite.style-fold.ts`
//     `minifyStyleAssets`, wired LAST in `vite.style-assets.ts publishStyleAssets`.
//     src/styles KEEP their comments (publish-time only).
//   - PRUNE the BB.W-CSS-CRITICAL critical/deferred split: after minify the ~13KB
//     saving on the ~35KB-gz cascade was not worth a wave + gate + manifest + two
//     exports. `src/styles/critical-partition.mjs`, `scripts/proof-css-critical.mjs`,
//     `vite.critical-split.ts` DEFINITION-ABSENT; the `./styles/critical` +
//     `./styles/deferred` exports + the `proof:css-critical` script retired. The
//     `./styles` union stays the one byte-complete entry.
//
// THE WAVE (F8 / BG.W-CUT — the 5.0.0 tag, the LAST core wave): the cut is
// MACHINE-READY. The version bumped to the 5.0.0 clean-break major, the local Mac
// release path (scripts/release.sh) carries the `--run ship` live-Metal ceremony
// ship-block (Arm A) BEFORE the tag AND the `--run full` union (BB.W-CLOSE-BATTERY),
// and the CI publish path (.github/workflows/release.yml) runs the `--run full`
// union (Arm B = proof:ship-attestation, the device-free tag enforcer). B4 is the
// cut-readiness clause the growing runner appends here.
//
// Device-free. THREE source arms (build-free, the born-RED anchors — run
// siblings-absent) + ONE conditional build arm:
//   B1 css-minify-wired  — `minifyStyleAssets` exported from vite.style-fold.ts
//                          AND invoked in the orchestrator AND the shared minify
//                          core (scripts/lib/minify-css.mjs) exports minifyCss.
//   B2 critical-absent   — the three machinery files DEFINITION-ABSENT; the two
//                          split exports + the proof:css-critical script absent
//                          from package.json AND the subpath policy; the
//                          orchestrator references no emitCriticalDeferredSplit.
//   B4 cut-ready         — package.json version === 5.0.0 AND release.sh runs
//                          `--run full` + carries the `--run ship` ship-block
//                          BEFORE `git tag` AND release.yml runs `--run full`.
//   B3 css-minified      — (conditional on a BUILT dist/styles) every published
//                          partial isMinified AND the minified index.css preserves
//                          `@source "../*.js"` (the /*-in-string trap).
//
// Born-RED on HEAD: B1 RED (minify unwired), B2 RED (machinery present),
// B4 RED (version 4.2.0 + no ship-block) → GREEN on the edit + the version
// sharedFileRequest; + a self-test bite per clause (each synthetic sabotage REDs
// its clause, incl. the REAL minifyCss/isMinified over the `@source` string-trap
// fixture — the detector is not hollow). B3 skips (pass) on a no-dist run, binds on
// the CI build. (B4's version arm reads the LIVE package.json — the hot-file bump
// rides a sharedFileRequest, so the fence bite injects a synthetic 5.0.0 pkg.)

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
import {
    minifyCss,
    isMinified,
    hasCommentOutsideString,
} from "./lib/minify-css.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:build";
const SELF_TEST = process.argv.includes("--self-test");

const STYLE_FOLD = resolve(ROOT, "vite.style-fold.ts");
const ORCHESTRATOR = resolve(ROOT, "vite.style-assets.ts");
const MINIFY_CORE = resolve(ROOT, "scripts/lib/minify-css.mjs");
const CRITICAL_PARTITION = resolve(ROOT, "src/styles/critical-partition.mjs");
const CRITICAL_SPLIT = resolve(ROOT, "vite.critical-split.ts");
const PROOF_CSS_CRITICAL = resolve(ROOT, "scripts/proof-css-critical.mjs");
const PACKAGE_JSON = resolve(ROOT, "package.json");
const SUBPATH_POLICY = resolve(ROOT, "scripts/lib/subpath-policy.mjs");
const DIST_STYLES = resolve(ROOT, "dist/styles");
const RELEASE_SH = resolve(ROOT, "scripts/release.sh");
const RELEASE_YML = resolve(ROOT, ".github/workflows/release.yml");

// BG.W-CUT — the exact 5.0.0 clean-break major the cut tags (the born-RED anchor
// is HEAD's 4.2.0). A future tranche re-baselines this constant or appends its own
// cut clause (the growing-runner pattern).
const CUT_VERSION = "5.0.0";

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function exportsFn(src, name) {
    return new RegExp(`export\\s+(?:async\\s+)?function\\s+${name}\\b`).test(src);
}

// Recursively collect every published *.css under dist/styles (the subdir
// partials — glass/, dock-controls/, tokens/, … — ship + are @import-referenced).
function collectDistCss(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { recursive: true })
        .filter((rel) => typeof rel === "string" && rel.endsWith(".css"))
        .map((rel) => resolve(dir, rel));
}

// ── The detector — runs over a SOURCE MAP so a self-test can sabotage inputs. ──
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const styleFoldSrc = overrides.styleFoldSource ?? read(STYLE_FOLD);
    const orchestratorSrc = overrides.orchestratorSource ?? read(ORCHESTRATOR);
    const minifyCoreSrc = overrides.minifyCoreSource ?? read(MINIFY_CORE);
    const pkgSrc = overrides.pkgSource ?? read(PACKAGE_JSON);
    const subpathPolicySrc = overrides.subpathPolicySource ?? read(SUBPATH_POLICY);
    const releaseShSrc = overrides.releaseShSource ?? read(RELEASE_SH);
    const releaseYmlSrc = overrides.releaseYmlSource ?? read(RELEASE_YML);

    // ── B1 — the minify mechanism is WIRED (source arm, build-free). ──
    const foldExportsMinify = exportsFn(styleFoldSrc, "minifyStyleAssets");
    const orchestratorImportsMinify =
        /import\s*\{[^}]*\bminifyStyleAssets\b[^}]*\}\s*from\s*"\.\/vite\.style-fold"/.test(
            orchestratorSrc,
        );
    const orchestratorInvokesMinify = /\bminifyStyleAssets\s*\(/.test(
        orchestratorSrc,
    );
    const minifyCoreExportsCore =
        /export\s+function\s+minifyCss\b/.test(minifyCoreSrc) &&
        /export\s+function\s+isMinified\b/.test(minifyCoreSrc);
    facts.b1 = {
        foldExportsMinify,
        orchestratorImportsMinify,
        orchestratorInvokesMinify,
        minifyCoreExportsCore,
    };
    assert(
        "B1 css-minify-wired — minifyStyleAssets exported from vite.style-fold.ts + imported & invoked in the orchestrator + the shared minify core (scripts/lib/minify-css.mjs) exports minifyCss/isMinified",
        foldExportsMinify &&
            orchestratorImportsMinify &&
            orchestratorInvokesMinify &&
            minifyCoreExportsCore,
    );

    // ── B2 — the BB.W-CSS-CRITICAL machinery is DEFINITION-ABSENT (source arm). ──
    const criticalPartitionAbsent =
        overrides.criticalPartitionExists === undefined
            ? !existsSync(CRITICAL_PARTITION)
            : !overrides.criticalPartitionExists;
    const criticalSplitAbsent =
        overrides.criticalSplitExists === undefined
            ? !existsSync(CRITICAL_SPLIT)
            : !overrides.criticalSplitExists;
    const proofCssCriticalAbsent =
        overrides.proofCssCriticalExists === undefined
            ? !existsSync(PROOF_CSS_CRITICAL)
            : !overrides.proofCssCriticalExists;
    let pkg = null;
    try {
        pkg = JSON.parse(pkgSrc);
    } catch {
        pkg = null;
    }
    const exportsClean =
        pkg !== null &&
        pkg.exports?.["./styles/critical"] === undefined &&
        pkg.exports?.["./styles/deferred"] === undefined;
    const scriptClean = pkg !== null && pkg.scripts?.["proof:css-critical"] === undefined;
    const policyClean =
        !subpathPolicySrc.includes('"./styles/critical"') &&
        !subpathPolicySrc.includes('"./styles/deferred"');
    const orchestratorSplitClean = !/emitCriticalDeferredSplit/.test(orchestratorSrc);
    facts.b2 = {
        criticalPartitionAbsent,
        criticalSplitAbsent,
        proofCssCriticalAbsent,
        exportsClean,
        scriptClean,
        policyClean,
        orchestratorSplitClean,
    };
    assert(
        "B2 critical-machinery-absent — critical-partition.mjs / vite.critical-split.ts / proof-css-critical.mjs DEFINITION-ABSENT; the ./styles/critical+deferred exports + the proof:css-critical script gone from package.json + the subpath policy; the orchestrator references no emitCriticalDeferredSplit",
        criticalPartitionAbsent &&
            criticalSplitAbsent &&
            proofCssCriticalAbsent &&
            exportsClean &&
            scriptClean &&
            policyClean &&
            orchestratorSplitClean,
    );

    // ── B4 — the 5.0.0 CUT is machinery-ready (BG.W-CUT source arm). ──
    // The LAST core wave: (a) package.json bumped to the CUT_VERSION clean-break
    // major (the version bump rides a sharedFileRequest — package.json is a hot
    // file), (b) the local Mac release path release.sh runs the `--run full` union
    // (BB.W-CLOSE-BATTERY) AND carries the `--run ship` live-Metal ceremony
    // ship-block BEFORE `git tag` (Arm A produces the attestation, `--run full`'s
    // Arm B re-verifies it), and (c) the CI publish path release.yml runs the
    // `--run full` union (Arm B tag enforcer). `pkg` was parsed for B2 above.
    const cutVersion = pkg !== null && pkg.version === CUT_VERSION;
    // Anchor to the COMMAND forms (`node … gates.mjs --run …`, `git tag -a`) — a
    // bare `gates.mjs --run …` / `git tag` prose mention in a comment must never
    // fool the ordering check (the ship-block header itself names both).
    const RUN_FULL = /node\s+\S*gates\.mjs\s+--run\s+full\b/;
    const RUN_SHIP = /node\s+\S*gates\.mjs\s+--run\s+ship\b/;
    const GIT_TAG_CMD = /git\s+tag\s+-a\b/;
    const releaseShRunsFull = RUN_FULL.test(releaseShSrc);
    const shipIdx = releaseShSrc.search(RUN_SHIP);
    const tagIdx = releaseShSrc.search(GIT_TAG_CMD);
    const releaseShShipBlock = shipIdx >= 0;
    // The ship ceremony (Arm A) must precede the irreversible tag-fire.
    const shipBeforeTag = shipIdx >= 0 && tagIdx >= 0 && shipIdx < tagIdx;
    const releaseYmlRunsFull = RUN_FULL.test(releaseYmlSrc);
    facts.b4 = {
        cutVersion,
        version: pkg?.version ?? null,
        releaseShRunsFull,
        releaseShShipBlock,
        shipBeforeTag,
        releaseYmlRunsFull,
    };
    assert(
        `B4 cut-ready (BG.W-CUT) — package.json version === ${CUT_VERSION} (the clean-break major) AND scripts/release.sh runs \`gates.mjs --run full\` + carries the \`--run ship\` live-Metal ceremony ship-block BEFORE \`git tag\` AND .github/workflows/release.yml runs \`gates.mjs --run full\` (Arm B tag enforcer)`,
        cutVersion &&
            releaseShRunsFull &&
            releaseShShipBlock &&
            shipBeforeTag &&
            releaseYmlRunsFull,
    );

    // ── B3 — the BUILT /styles cascade is minified (conditional build arm). ──
    // Runs iff a built dist/styles exists (CI builds first) OR a self-test injects
    // a cssFiles fixture; a no-dist local run SKIPS (pass, build-free source arms
    // carry B1/B2). Every published partial isMinified AND the minified index.css
    // preserves `@source "../*.js"` (the /*-in-string trap did not eat it).
    const cssFiles =
        overrides.cssFiles ??
        collectDistCss(DIST_STYLES).map((p) => ({
            path: p,
            content: read(p),
        }));
    const buildArmRan = cssFiles.length > 0;
    let unminified = [];
    let sourceDirectiveIntact = true;
    if (buildArmRan) {
        unminified = cssFiles
            .filter((f) => !isMinified(f.content))
            .map((f) => f.path);
        const index = cssFiles.find((f) => /(^|[\\/])index\.css$/.test(f.path));
        if (index) {
            sourceDirectiveIntact = index.content.includes('@source "../*.js"');
        }
    }
    facts.b3 = {
        buildArmRan,
        partials: cssFiles.length,
        unminified,
        sourceDirectiveIntact,
    };
    assert(
        "B3 css-minified — every BUILT dist/styles/**/*.css partial is single-line + comment-free AND the minified index.css preserves the `@source \"../*.js\"` directive (skips on a no-dist run)",
        !buildArmRan || (unminified.length === 0 && sourceDirectiveIntact),
    );

    return { facts, violations };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). ──
function selfTest() {
    let flagged = 0;
    const B1 =
        "B1 css-minify-wired — minifyStyleAssets exported from vite.style-fold.ts + imported & invoked in the orchestrator + the shared minify core (scripts/lib/minify-css.mjs) exports minifyCss/isMinified";
    const B2 =
        "B2 critical-machinery-absent — critical-partition.mjs / vite.critical-split.ts / proof-css-critical.mjs DEFINITION-ABSENT; the ./styles/critical+deferred exports + the proof:css-critical script gone from package.json + the subpath policy; the orchestrator references no emitCriticalDeferredSplit";
    const B3 =
        "B3 css-minified — every BUILT dist/styles/**/*.css partial is single-line + comment-free AND the minified index.css preserves the `@source \"../*.js\"` directive (skips on a no-dist run)";
    const B4 = `B4 cut-ready (BG.W-CUT) — package.json version === ${CUT_VERSION} (the clean-break major) AND scripts/release.sh runs \`gates.mjs --run full\` + carries the \`--run ship\` live-Metal ceremony ship-block BEFORE \`git tag\` AND .github/workflows/release.yml runs \`gates.mjs --run full\` (Arm B tag enforcer)`;

    const sab = (overrides, label, name) => {
        const { violations } = detect(overrides);
        if (violations.includes(label)) flagged++;
        else
            throw new Error(
                `[proof:build self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, label, name) => {
        const { violations } = detect(overrides);
        if (!violations.includes(label)) flagged++;
        else
            throw new Error(
                `[proof:build self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // B1: the orchestrator never invokes the minify pass (the unwired state).
    sab(
        {
            orchestratorSource:
                'import { copyStyleAssets } from "./vite.style-fold";\nexport function publishStyleAssets() {}\n',
        },
        B1,
        "B1 minify unwired in the orchestrator",
    );
    // B1: style-fold drops the minifyStyleAssets export.
    sab(
        { styleFoldSource: "// no minifyStyleAssets export here" },
        B1,
        "B1 style-fold drops the minify export",
    );
    // B1 (fence): the live wired tree passes.
    sabNot({}, B1, "B1 fence — the live wired minify is accepted");

    // B2: the critical machinery still on disk.
    sab({ criticalSplitExists: true }, B2, "B2 vite.critical-split.ts present");
    sab(
        { criticalPartitionExists: true },
        B2,
        "B2 src/styles/critical-partition.mjs present",
    );
    // B2: the split exports still in package.json.
    sab(
        {
            pkgSource: JSON.stringify({
                exports: { "./styles/critical": "./dist/styles/critical.css" },
                scripts: {},
            }),
        },
        B2,
        "B2 ./styles/critical export still published",
    );
    // B2: the proof:css-critical script still registered.
    sab(
        {
            pkgSource: JSON.stringify({
                exports: {},
                scripts: { "proof:css-critical": "node scripts/proof-css-critical.mjs" },
            }),
        },
        B2,
        "B2 proof:css-critical script still registered",
    );
    // B2 (fence): a fully-pruned SYNTHETIC tree passes (hot-file-independent — the
    // real package.json edit rides a sharedFileRequest, so the fence injects the
    // clean pkg + policy rather than reading the pending live files).
    sabNot(
        {
            pkgSource: JSON.stringify({ exports: {}, scripts: {} }),
            subpathPolicySource: 'export const CSS_FONT_EXPORTS = { "./styles": "x" };',
            orchestratorSource: 'import { minifyStyleAssets } from "./vite.style-fold";',
            criticalPartitionExists: false,
            criticalSplitExists: false,
            proofCssCriticalExists: false,
        },
        B2,
        "B2 fence — a fully-pruned synthetic tree is accepted",
    );

    // B4 — the cut-readiness bites. The version arm reads the LIVE package.json (the
    // bump rides a sharedFileRequest), so every bite INJECTS a synthetic pkg +
    // release files: a correct baseline with exactly ONE condition broken per bite.
    const okCutPkg = JSON.stringify({
        version: CUT_VERSION,
        exports: {},
        scripts: {},
    });
    const okReleaseSh =
        'node scripts/gates.mjs --run ship\nnode scripts/gates.mjs --run full\ngit tag -a "$VERSION"\n';
    const okReleaseYml = "run: node scripts/gates.mjs --run full";

    // B4: the version was not bumped to the cut (still the prior 4.2.0).
    sab(
        {
            pkgSource: JSON.stringify({
                version: "4.2.0",
                exports: {},
                scripts: {},
            }),
            releaseShSource: okReleaseSh,
            releaseYmlSource: okReleaseYml,
        },
        B4,
        "B4 version still 4.2.0 (not bumped to the cut)",
    );
    // B4: release.sh carries no `--run ship` ship-block.
    sab(
        {
            pkgSource: okCutPkg,
            releaseShSource:
                'node scripts/gates.mjs --run full\ngit tag -a "$VERSION"\n',
            releaseYmlSource: okReleaseYml,
        },
        B4,
        "B4 release.sh missing the --run ship ship-block",
    );
    // B4: the ship-block fires AFTER the irreversible git tag (ordering broken).
    sab(
        {
            pkgSource: okCutPkg,
            releaseShSource:
                'git tag -a "$VERSION"\nnode scripts/gates.mjs --run ship\nnode scripts/gates.mjs --run full\n',
            releaseYmlSource: okReleaseYml,
        },
        B4,
        "B4 release.sh runs --run ship AFTER git tag",
    );
    // B4: release.sh dropped the `--run full` union.
    sab(
        {
            pkgSource: okCutPkg,
            releaseShSource:
                'node scripts/gates.mjs --run ship\ngit tag -a "$VERSION"\n',
            releaseYmlSource: okReleaseYml,
        },
        B4,
        "B4 release.sh dropped the --run full union",
    );
    // B4: release.yml dropped the `--run full` union (Arm B tag enforcer).
    sab(
        {
            pkgSource: okCutPkg,
            releaseShSource: okReleaseSh,
            releaseYmlSource: "run: node scripts/gates.mjs --run release",
        },
        B4,
        "B4 release.yml dropped the --run full union",
    );
    // B4 (fence): the correct cut world (5.0.0 + ship-before-tag + both --run full)
    // passes — hot-file-independent (the pkg + release files injected).
    sabNot(
        {
            pkgSource: okCutPkg,
            releaseShSource: okReleaseSh,
            releaseYmlSource: okReleaseYml,
        },
        B4,
        "B4 fence — the correct 5.0.0 cut world is accepted",
    );

    // B3: an un-minified partial fixture (multi-line + comment) flags.
    sab(
        {
            cssFiles: [
                {
                    path: "/x/dock.css",
                    content: "/* head */\n.a { color: red; }\n.b { gap: 1rem; }\n",
                },
            ],
        },
        B3,
        "B3 un-minified partial (multi-line + comment)",
    );
    // B3: the /*-in-string trap — a minified index.css that DROPPED @source fails.
    sab(
        {
            cssFiles: [
                { path: "/x/index.css", content: '@import "./g.css"; .a{color:red}' },
            ],
        },
        B3,
        "B3 minified index.css missing @source",
    );
    // B3 (fence): the REAL minifyCss output over the @source string-trap fixture is
    // single-line, comment-free, AND preserves @source — the string-aware core is
    // provably not hollow (device-free, no build needed).
    const trap =
        '/* head */\n@import "./glass.css";\n@source "../*.js";\n.x { color: red; /* inline */ }';
    const minned = minifyCss(trap);
    if (
        isMinified(minned) &&
        !hasCommentOutsideString(minned) &&
        minned.includes('@source "../*.js"')
    ) {
        flagged++;
    } else {
        throw new Error(
            "[proof:build self-test] the real minifyCss failed the @source string-trap fence",
        );
    }
    sabNot(
        {
            cssFiles: [{ path: "/x/index.css", content: minned }],
        },
        B3,
        "B3 fence — the real minified @source-bearing index.css is accepted",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BUILD_ARTIFACT", "BG-build");

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:build",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:build — the BG F8 MACHINE close gate (seed: W-CSS-MINIFY minify + critical-prune)",
    );
    console.log(
        `  B1 css-minify-wired          : foldExports=${facts.b1.foldExportsMinify} orchInvokes=${facts.b1.orchestratorInvokesMinify} core=${facts.b1.minifyCoreExportsCore}`,
    );
    console.log(
        `  B2 critical-machinery-absent : split=${facts.b2.criticalSplitAbsent} partition=${facts.b2.criticalPartitionAbsent} gate=${facts.b2.proofCssCriticalAbsent} exports=${facts.b2.exportsClean} policy=${facts.b2.policyClean}`,
    );
    console.log(
        `  B4 cut-ready (BG.W-CUT)      : version=${facts.b4.version} shipBlock=${facts.b4.releaseShShipBlock} shipBeforeTag=${facts.b4.shipBeforeTag} shFull=${facts.b4.releaseShRunsFull} ymlFull=${facts.b4.releaseYmlRunsFull}`,
    );
    console.log(
        `  B3 css-minified (build arm)  : ran=${facts.b3.buildArmRan} partials=${facts.b3.partials} unminified=${facts.b3.unminified.length} sourceIntact=${facts.b3.sourceDirectiveIntact}`,
    );
    console.log(
        `  self-test (bite proof)       : OK — ${selfTestCount} synthetic sabotages handled`,
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
            `\n[proof:build --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
