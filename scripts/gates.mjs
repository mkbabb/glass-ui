// gates.mjs — the SINGLE gate manifest (AS.W2, inv-θ / the F3 fix).
//
// Before AS.W2 three hand-curated "gate sets" disagreed: `proof:all` ran 6,
// `ci.yml` ran 11, `release.sh` ran 4 (zero proof:*). So a local `proof:all`
// went GREEN while CI was RED (the aggregate lied), and a tagged release
// re-checked no binding-correctness gate at all (surface/VT-name/phantom drift
// between the last CI run and the tag shipped unguarded). This module is the
// one manifest: every gate tagged `{local, ci, release}` (+ `sibling` where it
// walks a sibling checkout). The three aggregates are FILTERS over it:
//   - `proof:all`   → `node scripts/gates.mjs --run local`   (the local proof set)
//   - `release.sh`  → `node scripts/gates.mjs --run release`
//   - `ci.yml`      → keeps explicit per-step visibility, VERIFIED against the
//                     manifest by `--verify-ci` (drift fails closed).
//
// So local == ci == release is STRUCTURAL, not coincidental.

import { execSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { argv } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
// The gate-row DATA manifest (BH.B5b-gate-manifest-extract) — the 349-row table +
// its per-row `note` rationale live in scripts/gates.manifest.mjs; this runner is the
// thin orchestrator over it. GATES is re-exported so the downstream consumers that
// `import { GATES } from "./gates.mjs"` (proof-meta / proof-close-sweep / the two
// parity gates / proof-gate-manifest-sound) keep resolving through the facade.
import { GATES } from "./gates.manifest.mjs";
export { GATES };
// BI.W-PI-IN-CLOSE — Arm A writes the binding-π attestation after a GREEN `--run pi`.
// The CLI dispatch in that leaf is guarded, so importing it never runs the sibling
// gate (device-free by construction — it reads spec files + the pi-runner-manifest).
import { writePiAttestation, parsePiReport } from "./proof-pi-attestation.mjs";

/** The gate cmds tagged for a given aggregate, in manifest order. */
export function gatesFor(mode) {
    if (mode === "full") {
        // BB.W-CLOSE-BATTERY — the DEDUPED union of the three tag sets (local ∪ ci ∪
        // release), in manifest order, a row tagged in >1 set running ONCE. This is
        // the close-battery set: the close/release path runs `--run full`
        // siblings-absent before the tag, so a `--run local`-only close (the BA
        // over-claim — `ci ⊂ local` carried 18 reds AND the close never ran the
        // union) is structurally impossible. `proof:close-battery-parity` locks it.
        return GATES.filter((g) =>
            ["local", "ci", "release"].some((t) => g.tags.includes(t)),
        );
    }
    return GATES.filter((g) => g.tags.includes(mode));
}

/** Run a tagged subset sequentially; exit nonzero on the first failure. */
function runMode(mode) {
    const set = gatesFor(mode);
    if (!set.length) {
        console.error(`[gates] unknown mode '${mode}' (expected local|ci|release)`);
        process.exit(2);
    }
    console.log(
        `[gates] running '${mode}' set (${set.length} gates): ${set.map((g) => g.id).join(", ")}`,
    );
    for (const g of set) {
        console.log(`\n[gates] ── ${g.id} ──`);
        try {
            execSync(`npm run ${g.cmd}`, { cwd: ROOT, stdio: "inherit" });
        } catch {
            console.error(`\n[gates] FAIL at '${g.id}' (mode '${mode}')`);
            process.exit(1);
        }
    }
    console.log(`\n[gates] '${mode}' set PASSED (${set.length} gates).`);
}

// ── BG.W-CLOSE-SWEEP — the `--run sweep`/`--run sweep-fast` spawn-all dispatch ──
// Delegates to proof-close-sweep.mjs's --sweep/--sweep-fast mode (ONE sweep
// implementation, no fork): it names EVERY red (NOT runMode's fail-fast). `sweep`
// runs the full closeDisease set (incl. the 112s gate-manifest-sound); `sweep-fast`
// runs the 7 sub-second members (the commit-hook + per-wave discipline arm).
function runSweep(fast) {
    const res = spawnSync(
        process.execPath,
        [resolve(ROOT, "scripts/proof-close-sweep.mjs"), fast ? "--sweep-fast" : "--sweep"],
        { cwd: ROOT, stdio: "inherit" },
    );
    process.exit(res.status ?? 1);
}

// ── BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION — runShip() (Arm A, Mac-only, FAIL-CLOSED) ──
// The live-Metal ship ceremony release.sh's ship-block calls via `--run ship`. Mac-only
// BY PHYSICS (CI=ubuntu/SwiftShader cannot paint Metal; release.yml runs `--run full`
// = Arm B = proof:ship-attestation, NEVER `--run ship`). FAIL-CLOSED: a skeleton MUST
// exit non-zero (a green skeleton re-creates the source-green/visually-broken trap at
// the META level). The live roster capture + the UNMASKED_RENDERER anti-SwiftShader
// guard (scripts/lib/gl-renderer-probe.mjs, committed) + the per-region DIGEST + the
// webkit.{glass,goo} verdict + the DERIVED surfaceHash (scripts/proof-ship-attestation.mjs
// computeSurfaceHash) -> committed docs/tranches/BG/SHIP-ATTESTATION.json is BG.W-CUT's
// ceremony body; until it lands, runShip refuses to write a green attestation (trap-clean).
async function runShip() {
    if (process.platform !== "darwin") {
        console.error(
            "[gates --run ship] runShip is Mac-only (the live-Metal ship ceremony). CI=SwiftShader " +
                "cannot paint Metal; release.yml runs `--run full` (Arm B = proof:ship-attestation), never `--run ship`.",
        );
        process.exit(2);
    }
    const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? "http://127.0.0.1:5199";
    let served = false;
    try {
        served = (await fetch(DEMO_URL, { signal: AbortSignal.timeout(2000) })).ok;
    } catch {
        served = false;
    }
    if (!served) {
        console.error(
            `[gates --run ship] no served demo at ${DEMO_URL} — run \`npm run demo:serve\` ` +
                "(vite --port 5199) first. Fail-CLOSED (never a silent green).",
        );
        process.exit(2);
    }
    console.error(
        "[gates --run ship] FAIL-CLOSED — the live Metal roster capture + the UNMASKED_RENDERER " +
            "anti-SwiftShader guard + the band re-apply + the committed SHIP-ATTESTATION.json is BG.W-CUT's " +
            "ceremony body (composing scripts/lib/gl-renderer-probe.mjs + scripts/proof-ship-attestation.mjs " +
            "computeSurfaceHash). Arm B (proof:ship-attestation, the device-free bypass-closer registered " +
            "['ci','release']) is the binding tag enforcer and is LANDED. No attestation written (trap-clean).",
    );
    process.exit(1);
}

// ── BB.W-VISUAL-RUNNER — the `--run pi` visual-π runner mode ───────────────────
//
// `pi` is NOT a gate-tag aggregate (it does not pass through gatesFor): it is a
// SPEC-runner mode that spawns the ENROLLED `tests-visual/*.spec.ts` set as ONE
// command — the non-private glob MINUS the declared EXCLUDE allowlist
// (`tests-visual/pi-runner-manifest.mjs`, computed-from-disk), over BOTH Playwright
// projects against the `:5199` demo origin the config defaults, served-app-sentinel
// fail-closed. `local`-tagged ONLY (a real browser + demo + GPU). It reuses the
// canonical `spawnSync(PW_BIN, ["test", …, "--reporter=list,json"])` idiom
// (proof-blob-render.mjs) — the runner resolution across the workspace-local AND the
// hoisted-root node_modules layout, the workspace-absent fail-closed.
const PI_WORKSPACE = resolve(ROOT, "tests-visual");
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the runner
// across BOTH the workspace-local AND hoisted-root layout (else a hoisted install
// false-SKIPs the fail-closed arm — the proof-blob-render.mjs:33-37 idiom).
const PI_PW_BIN =
    [
        resolve(PI_WORKSPACE, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ].find(existsSync) ?? null;
const PI_PW_PKG =
    [
        resolve(PI_WORKSPACE, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ].find(existsSync) ?? null;
// The two Playwright projects the config declares (the desktop + the coarse/touch
// mobile viewport the gestalt close needs). Asserted by proof:visual-runner.
const PI_PROJECTS = ["chromium-headless-new", "coarse-touch"];

/** Lazy-load the computed enrollment (the no-hand-list source of truth). */
async function piEnrolledSpecs() {
    const mod = await import(
        pathToFileURL(resolve(PI_WORKSPACE, "pi-runner-manifest.mjs")).href
    );
    return mod.enrolledSpecs();
}

/**
 * `--list pi` — print the ENROLLED visual-π spec set (computed-from-disk), one per
 * line. The runner-mode twin of `--list <gate-mode>` (which lists gate cmds); this
 * lists spec filenames so a human can see exactly what `--run pi` spawns.
 */
async function listPi() {
    const specs = await piEnrolledSpecs();
    console.log(specs.join("\n"));
}

/**
 * `--run pi` — spawn the ENROLLED visual-π set over both Playwright projects against
 * the `:5199` demo origin, served-app-sentinel fail-closed. Fails-closed on the
 * workspace-absent case AND on the first red spec. The `local`-binding real-device
 * run; on a GPU-less runner the workspace-absent path is the only honest exit.
 */
async function runPi() {
    if (!PI_PW_PKG || !PI_PW_BIN) {
        // Genuine device absence — fail-CLOSED with the install hint (NOT a silent
        // green). The binding paint runs on the real device; a GPU-less CI runner
        // does NOT paint the WebGL2 shaders, so it relies on the headless
        // `proof:visual-runner` enrollment-soundness arm instead.
        console.error(
            "[gates --run pi] the tests-visual π workspace has no installed @playwright/test — " +
                "run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo " +
                "dev server, for the rendered-pixel visual-π suite. (The local real-device run is the " +
                "binding paint; CI proves ENROLLMENT via proof:visual-runner, not the pixels.)",
        );
        process.exit(2);
    }
    const specs = await piEnrolledSpecs();
    if (!specs.length) {
        console.error(
            "[gates --run pi] the enrolled visual-π set is EMPTY — the pi-runner-manifest glob " +
                "matched no non-private *.spec.ts. The workspace spec tree moved; fix the manifest.",
        );
        process.exit(1);
    }
    console.log(
        `[gates --run pi] running the enrolled visual-π set (${specs.length} specs) over ` +
            `${PI_PROJECTS.length} projects [${PI_PROJECTS.join(", ")}] against the :5199 demo origin ` +
            `(served-app-sentinel fail-closed).`,
    );
    const reportPath = resolve(PI_WORKSPACE, ".cache/pi-report.json");
    const args = [
        "test",
        ...specs,
        ...PI_PROJECTS.flatMap((p) => ["--project", p]),
        "--reporter=list,json",
    ];
    const res = spawnSync(PI_PW_BIN, args, {
        cwd: PI_WORKSPACE,
        stdio: "inherit",
        encoding: "utf8",
        env: {
            ...process.env,
            PLAYWRIGHT_JSON_OUTPUT_NAME: reportPath,
        },
    });
    if (res.status !== 0) {
        console.error(
            `\n[gates --run pi] FAIL — the visual-π suite did not pass (exit ${res.status}). ` +
                `The served-app-sentinel fails-CLOSED on a foreign app on the port (never a silent skip); ` +
                `a red spec is the binding-truth rot the runner exists to surface.`,
        );
        process.exit(1);
    }
    console.log(`\n[gates --run pi] the enrolled visual-π set PASSED (${specs.length} specs, both projects).`);

    // BI.W-PI-IN-CLOSE — Arm A: write the fresh binding-π attestation. The run passed
    // (exit 0), so the ledger is honest — parse the JSON report for the real per-spec
    // verdicts (all pass by construction of the exit), fall back to the enrolled
    // all-pass set on an unparseable report. The device-free proof:pi-attestation (Arm
    // B, ['ci','release'], in --run full) re-verifies this at HEAD, so the tag-push
    // publish path cannot fire without a fresh, full-coverage, all-green pi attestation.
    let capturedCommit = null;
    try {
        capturedCommit = execSync("git rev-parse HEAD", { cwd: ROOT, encoding: "utf8" }).trim();
    } catch {
        capturedCommit = null;
    }
    const report = parsePiReport(reportPath);
    const ledger = report
        ? specs.map((f) => ({ spec: f, verdict: report.get(f) ?? "pass" }))
        : undefined;
    const att = writePiAttestation({
        root: ROOT,
        specs: ledger,
        projects: PI_PROJECTS,
        capturedCommit,
    });
    console.log(
        `[gates --run pi] wrote docs/tranches/BI/PI-ATTESTATION.json (verdict ${att.verdict}, ` +
            `${att.enrolledCount} specs, suiteHash ${att.suiteHash.slice(0, 12)}…) + the W-PI-IN-CLOSE-DELTA ledger. ` +
            `proof:pi-attestation (the device-free tag-blocker) will re-verify it on the git-push publish path.`,
    );
}

/**
 * Verify the ci.yml step set matches the manifest's ci-tagged set exactly —
 * so the explicit per-step YAML (kept for Actions-UI visibility) can never
 * silently drift from the manifest. Fails closed on any add/drop.
 */
function verifyCi() {
    const ciPath = resolve(ROOT, ".github/workflows/ci.yml");
    const yaml = readFileSync(ciPath, "utf8");
    const ciSteps = new Set(
        [...yaml.matchAll(/run:\s*npm run ([A-Za-z0-9:_-]+)/g)].map((m) => m[1]),
    );
    const expected = new Set(gatesFor("ci").map((g) => g.cmd));
    // META-STEPS — ci.yml `npm run` lines that are NOT proof gates and so never
    // appear in GATES (the verify-ci meta-step runs the drift check itself). They
    // are allowlisted explicitly: anything ci.yml runs that is neither a ci-tagged
    // gate NOR an allowlisted meta-step is an UNKNOWN step and fails closed (a
    // truly-novel `run: npm run …` line added to ci.yml must be classified here or
    // ci-tagged in the manifest — it can no longer slip through undetected).
    const CI_META_STEPS = new Set(["gates:verify-ci", "proof:gen-ci-fresh"]);
    const missing = [...expected].filter((c) => !ciSteps.has(c));
    const extra = [...ciSteps].filter((c) => !expected.has(c) && !CI_META_STEPS.has(c));
    if (missing.length || extra.length) {
        console.error("[gates:verify-ci] ci.yml drifted from the gate manifest:");
        for (const c of missing) console.error(`  MISSING from ci.yml: ${c}`);
        for (const c of extra) {
            const known = GATES.some((g) => g.cmd === c);
            console.error(
                known
                    ? `  EXTRA in ci.yml (manifest gate, not ci-tagged): ${c}`
                    : `  UNKNOWN in ci.yml (no manifest gate, not an allowlisted meta-step): ${c}`,
            );
        }
        process.exit(1);
    }
    console.log(
        `[gates:verify-ci] ci.yml matches the manifest ci set (${expected.size} gates).`,
    );
}

/**
 * Render the `.github/workflows/ci.yml` content from the ci-tagged manifest set
 * — the single source of truth. Each ci gate becomes one `- name:` step (the
 * per-step Actions-UI view the team wanted; option (a), never the collapse), in
 * manifest order, followed by the two drift-check meta-steps. Per-gate
 * documentation stays in the manifest `note` (duplicating it here would be the
 * exact drift this generator kills), so the YAML is a clean generated artefact.
 *
 * RED-NAMING (the W62 forcing function): a ci-tagged gate whose backing
 * `scripts/*.mjs` is absent on disk THROWS, naming it — never a silent skip. So
 * a dangling gate can no longer ride into a generated ci.yml and crash the
 * runner; its fix-or-retire is forced at emit time.
 */
export function renderCiYaml() {
    const ciGates = gatesFor("ci");
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const missing = [];
    for (const g of ciGates) {
        const script = pkg.scripts?.[g.cmd] ?? "";
        const m = script.match(/scripts\/([\w.-]+\.mjs)/);
        if (m && !existsSync(resolve(ROOT, "scripts", m[1]))) missing.push(g.cmd);
    }
    if (missing.length) {
        throw new Error(
            `[gates --emit-ci] refusing to emit: ${missing.length} ci-tagged gate(s) have no backing script on disk:\n` +
                missing.map((c) => `  - ${c} (${pkg.scripts?.[c] ?? "no npm script"})`).join("\n") +
                `\nFix-or-retire these (the gate owner / W25 / W27a) before ci.yml can be generated.`,
        );
    }
    const I = " ".repeat(12); // `- name:` step indent (matches the repo style)
    const L = [];
    L.push("# GENERATED by `node scripts/gates.mjs --emit-ci` (npm run gates:emit-ci) — DO NOT EDIT BY HAND.");
    L.push("# The ci-tagged gate set in scripts/gates.mjs is the single source of truth; per-gate");
    L.push("# documentation lives in that manifest's `note` field. A drift between this file and the");
    L.push("# manifest fails closed via proof:gen-ci-fresh (byte-match) — so the CI mirror can never");
    L.push("# silently fall behind the gate set again. To change CI: edit the manifest, re-emit, commit.");
    L.push("");
    L.push("name: ci");
    L.push("");
    L.push("on:");
    L.push("    pull_request:");
    L.push("        branches: [master]");
    L.push("    push:");
    L.push("        branches: [master]");
    L.push("");
    L.push("jobs:");
    L.push("    gates:");
    L.push("        runs-on: ubuntu-latest");
    L.push("        steps:");
    L.push("            - uses: actions/checkout@v4");
    L.push("              with:");
    // fetch-depth: 0 — full history so the git-ancestor gates (proof:au-w0-reground
    // et al.) can resolve the historical dock SHAs (a shallow clone fails them).
    L.push("                  fetch-depth: 0");
    L.push("            - uses: actions/setup-node@v4");
    L.push("              with:");
    L.push("                  node-version: 24");
    L.push("            - run: npm ci");
    for (const g of ciGates) {
        L.push(`${I}- name: ${g.id}`);
        if (g.env) {
            L.push(`${I}  env:`);
            for (const [k, v] of Object.entries(g.env))
                L.push(`${I}      ${k}: ${JSON.stringify(String(v))}`);
        }
        L.push(`${I}  run: npm run ${g.cmd}`);
    }
    // The two drift-check meta-steps (NOT manifest gates — they verify the mirror).
    L.push(`${I}- name: gates:verify-ci`);
    L.push(`${I}  run: npm run gates:verify-ci`);
    L.push(`${I}- name: proof:gen-ci-fresh`);
    L.push(`${I}  run: npm run proof:gen-ci-fresh`);
    return L.join("\n") + "\n";
}

/** Write the generated ci.yml to disk. */
function emitCi() {
    const yaml = renderCiYaml();
    const ciPath = resolve(ROOT, ".github/workflows/ci.yml");
    writeFileSync(ciPath, yaml);
    console.log(
        `[gates --emit-ci] wrote ${ciPath} (${gatesFor("ci").length} ci gates + 2 meta-steps).`,
    );
}

// Run-as-main guard — gates.mjs is also IMPORTED (proof:gen-ci-fresh consumes
// renderCiYaml), so the CLI dispatch must not fire on import.
const isMain = Boolean(argv[1]) && resolve(argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
    const arg = argv[2];
    // `pi` is the SPEC-runner mode (BB.W-VISUAL-RUNNER) — it spawns the enrolled
    // visual-π set, NOT a gatesFor aggregate. It dispatches off the runMode/list
    // branches BEFORE the gate-tag path so `gatesFor("pi")` is never consulted.
    if (arg === "--run" && argv[3] === "ship") runShip();
    else if (arg === "--run" && argv[3] === "pi") runPi();
    else if (arg === "--run" && (argv[3] === "sweep" || argv[3] === "sweep-fast"))
        runSweep(argv[3] === "sweep-fast");
    else if (arg === "--run") runMode(argv[3]);
    else if (arg === "--verify-ci") verifyCi();
    else if (arg === "--emit-ci") emitCi();
    else if (arg === "--list" && argv[3] === "pi") listPi();
    else if (arg === "--list") {
        const mode = argv[3] ?? "local";
        console.log(
            gatesFor(mode)
                .map((g) => g.cmd)
                .join("\n"),
        );
    } else {
        console.error(
            "usage: gates.mjs --run <local|ci|release|full|pi|ship|sweep|sweep-fast> | --verify-ci | --emit-ci | --list <mode|pi>",
        );
        process.exit(2);
    }
}
