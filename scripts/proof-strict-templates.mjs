#!/usr/bin/env node
// AU.W3 — the strict-templates keystone gate (proof:strict-templates).
//
// The silent-no-op CLOSER. `vueCompilerOptions.checkUnknownProps` makes a bogus
// prop on a glass-ui component a RED typecheck — closing, library-wide, the class
// that seeded the AS.W7 dock bug (a stale/typo'd prop binds to nothing and no tool
// complains). The AT campaign landed the W6/W7 clean breaks UNGUARDED by this gate;
// AU lands it FIRST within W3, then re-verifies every break under it.
//
// Three falsifiable clauses:
//   (a) FLAG ON — `checkUnknownProps: true` is the effective vueCompilerOptions in
//       EACH of the three tsconfigs (resolving `extends`).
//   (b) BOGUS-PROP IS RED — vue-tsc over the dedicated fixture (a `<GlassDock
//       bogus-prop-does-not-exist>`) emits the unknown-prop diagnostic. The fixture
//       lives under scripts/ (outside the main include) so it never breaks
//       `npm run typecheck`.
//   (c) NO SUPPRESSIONS — zero `// @ts-expect-error` / `@ts-ignore` DIRECTIVES were
//       added to src/ to pass the gate (the AU inv-P1 idiomatic-root rule).
//
// inv ε / bite-check: removing `checkUnknownProps` greens the fixture → clause (b)
// reddens (the diagnostic vanished). Adding a `// @ts-expect-error` directive to
// src/ reddens clause (c).

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        TSCONFIGS: ["tsconfig.json", "tsconfig.src.json", "tsconfig.build.json"].map((f) => resolve(ROOT, f)),
        FIXTURE_TSCONFIG: resolve(ROOT, "scripts/fixtures/tsconfig.strict-fixture.json"),
        ARTIFACT: gateArtifactPath("GLASS_UI_STRICT_TEMPLATES_ARTIFACT", "AU-strict-templates"),
    };
    return _cliPaths;
}

// Resolve the effective `vueCompilerOptions.checkUnknownProps` for a tsconfig,
// following `extends` until found (JSONC-lenient: strip // and /* */).
function effectiveCheckUnknownProps(tsconfigPath, seen = new Set()) {
    const p = resolve(tsconfigPath);
    if (seen.has(p) || !existsSync(p)) return undefined;
    seen.add(p);
    const raw = readFileSync(p, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");
    let cfg;
    try { cfg = JSON.parse(raw); } catch { return undefined; }
    const here = cfg?.vueCompilerOptions?.checkUnknownProps;
    if (here !== undefined) return here;
    if (cfg.extends) return effectiveCheckUnknownProps(resolve(dirname(p), cfg.extends), seen);
    return undefined;
}

function walk(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        if (name === "node_modules") continue;
        const fp = join(dir, name);
        const st = statSync(fp);
        if (st.isDirectory()) walk(fp, acc);
        else if (/\.(ts|tsx|vue)$/.test(name)) acc.push(fp);
    }
    return acc;
}

function run() {
    const { ROOT, SRC, TSCONFIGS, FIXTURE_TSCONFIG, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // (a) the flag is on (effective) in each tsconfig.
    facts.configs = {};
    for (const tc of TSCONFIGS) {
        const v = effectiveCheckUnknownProps(tc);
        facts.configs[tc.slice(ROOT.length + 1)] = v;
        if (v !== true) {
            violations.push(`${tc.slice(ROOT.length + 1)}: effective vueCompilerOptions.checkUnknownProps is ${JSON.stringify(v)} (must be true)`);
        }
    }

    // (b) the bogus-prop fixture emits the unknown-prop diagnostic.
    let fixtureOut = "";
    try {
        execSync(`npx vue-tsc --noEmit -p ${FIXTURE_TSCONFIG}`, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
        fixtureOut = "(vue-tsc exited 0 — the fixture compiled CLEAN)";
    } catch (e) {
        fixtureOut = `${e.stdout?.toString() ?? ""}${e.stderr?.toString() ?? ""}`;
    }
    const bogusCaught = /bogusPropDoesNotExist|bogus-prop-does-not-exist/.test(fixtureOut);
    facts.bogusCaught = bogusCaught;
    if (!bogusCaught) {
        violations.push("the strict-templates fixture did NOT flag the bogus prop — checkUnknownProps is not catching unknown props (the keystone is inert)");
    }

    // (c) zero suppression DIRECTIVES in src/ (prose mentioning the term is fine).
    const SUPPRESSION_RE = /^\s*(?:\/\/|\/\*)\s*@ts-(?:expect-error|ignore)\b/;
    const suppressions = [];
    for (const file of walk(SRC)) {
        const lines = readFileSync(file, "utf8").split("\n");
        lines.forEach((line, i) => {
            if (SUPPRESSION_RE.test(line)) suppressions.push(`${file.slice(ROOT.length + 1)}:${i + 1}`);
        });
    }
    facts.suppressions = suppressions;
    if (suppressions.length > 0) {
        violations.push(`${suppressions.length} @ts-expect-error/@ts-ignore suppression directive(s) in src/ (AU adds none to pass the gate — fix at the idiomatic root): ${suppressions.join(", ")}`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:strict-templates", facts, violations });

    console.log("proof:strict-templates — the silent-no-op keystone (AU.W3)");
    for (const [tc, v] of Object.entries(facts.configs)) console.log(`  checkUnknownProps  ${tc.padEnd(22)} : ${v}`);
    console.log(`  bogus-prop caught (fixture)  : ${bogusCaught ? "YES ✓" : "NO ✗"}`);
    console.log(`  src/ suppression directives  : ${suppressions.length}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
