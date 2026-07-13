// BI.W-PI-IN-CLOSE — proof:pi-attestation (Arm B, the binding-π tag-push BLOCKER).
// Registered `["ci","release"]`.
//
// THE 3-TRANCHE DISEASE (H-2 / C-PAINT / WS7-01 / GATE-1). glass-ui shipped
// source-green/visually-broken 3× (BB/BC/BD): real-paint-verify NEVER blocked the
// tag. The 161 committed `tests-visual/*.spec.ts` are the binding painted truth —
// the per-mechanism π readbacks — yet they are in NO close battery: `--run pi` is a
// SPEC-runner MODE (gates.mjs), not a gate tag, so `--run full` never spawns it, and
// `proof:visual-runner`'s W4 (the local-paint arm) is deliberately born-RED with its
// DELTA absent. So the cut rests on `proof:ba-gestalt`'s 10-surface roster alone (10
// whole-page surfaces vs 161 per-mechanism specs).
//
// THE CLOSURE (the `ship-attestation` two-arm split transposed to the binding-π
// SUITE — the `proof:live-verified-ledger` cardinal-lesson precedent):
//
//   • Arm A — the PAINT (local, real-GPU, by physics). `gates.mjs --run pi`
//     (`runPi()`, called by `release.sh` between the ship ceremony and `--run full`)
//     runs the ENROLLED `tests-visual/*.spec.ts` set over BOTH Playwright projects
//     [chromium-headless-new, coarse-touch] against `:5199`, served-app-sentinel
//     fail-closed; on a GREEN run it writes the per-spec verdict LEDGER + the derived
//     `suiteHash` into docs/tranches/BI/PI-ATTESTATION.json + the human DELTA.
//   • Arm B — the FRESHNESS (CI/anywhere, THIS gate). Registered `["ci","release"]`
//     so `release.yml`'s `--run full` RUNS it on every tag-push publish. DEVICE-FREE:
//     it RECOMPUTES the enrolled-suite content hash at HEAD (the spec SET + each
//     spec's content bytes) and re-applies the per-spec verdict + coverage grammar to
//     the EMBEDDED ledger, REDing on absent / stale / FAIL-verdict / any-non-pass-spec
//     / missing-project / count-drift. THE ONLY device-free enforcer on the
//     git-push→release.yml→npm-publish path — without it registered ci/release, the
//     local paint block is theater.
//
// suiteHash binds the REAL binding-π suite: sha256(enrolled spec NAMES + each enrolled
// spec's content sha256). A spec added / removed / a spec's content edited / an
// EXCLUDE row flipped drifts the hash, so a stale attestation (a re-stamp / frozen /
// skip of an old suite state) REDs. A per-spec FAIL that the ceremony recorded (or a
// partial run missing an enrolled spec) REDs the coverage grammar. The bounded trust
// (the `ship-attestation` threat model): re-stamp/frozen/skip/stale/partial/FAIL REDs;
// a malicious hand-forge is OUT of the Phase-1 model.
//
// The structural self-test (every run, the `proof:strict-freshness-armed` precedent):
// the gate's verdict CORE (`--evaluate <path>`) is spawned as a SUBPROCESS over seven
// synthetic fixtures (valid / stale-hash / FAIL-verdict / spec-fail / missing-project
// / count-drift / absent) and the differential exit codes are asserted — the mechanism
// GREENs on a fresh valid attestation and REDs on each forgery, proven as a real
// subprocess, not a string-fed inline assertion. So the tag-blocker cannot silently
// un-arm.
//
// NOTE — this gate carries NO browser spawn: it reads the enrolled spec FILES + the
// pi-runner-manifest, recomputes a content hash, and re-applies a pure verdict grammar
// to the embedded ledger — a genuine DEVICE-FREE static src-scan, correctly ci+release
// (the tag-push publish path runs it on ubuntu/SwiftShader). Because it references the
// binding-π suite BY NAME (the enrolled `tests-visual` spec set + the two project
// names), proof:tag-parity's substring live-gate classifier detects it as "live" — a
// BENIGN false-positive that produces NO parity violation (a detected-live gate may
// carry ci/release; the classifier only enforces static→ci, and this gate carries ci).
// The SISTER arm proof:visual-runner is likewise detected-live (via its project names)
// and ci-green in production. The binding paint runs on a real GPU via `gates.mjs
// --run pi` (Arm A); THIS gate is the device-free freshness witness of that run.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { enrolledSpecs } from "../tests-visual/pi-runner-manifest.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:pi-attestation";

// The canonical attestation path Arm A (runPi) writes, Arm B (this gate) reads —
// mirroring docs/tranches/BG/SHIP-ATTESTATION.json at the BI tranche root.
export const PI_ATTESTATION_REL = "docs/tranches/BI/PI-ATTESTATION.json";
export const PI_ATTESTATION_PATH = resolve(ROOT, PI_ATTESTATION_REL);
// The human per-spec verdict LEDGER Arm A also writes (born-RED ground state on disk).
export const PI_DELTA_REL = "docs/tranches/BI/audit/visual/W-PI-IN-CLOSE-DELTA.md";
export const PI_DELTA_PATH = resolve(ROOT, PI_DELTA_REL);

// The two Playwright projects the `--run pi` runner declares (desktop + the coarse/
// touch mobile viewport the gestalt close needs). The attestation MUST cover both.
export const EXPECTED_PROJECTS = ["chromium-headless-new", "coarse-touch"];

/**
 * The DERIVED pi-attestation suiteHash — the freshness binding. Binds the REAL
 * binding-π suite: sha256(the sorted enrolled spec NAMES + each enrolled spec's
 * content sha256). Reading the spec SET (from enrolledSpecs, computed-from-disk) AND
 * each spec's content is the "the binding-π suite changed since capture" axis: a spec
 * added/removed (set drift), a spec's readback edited (content drift), or an EXCLUDE
 * row flipped (set drift) all re-hash. Exported so Arm A (runPi) stamps the SAME hash
 * it will be re-checked against.
 *
 * @param {string} [root]
 * @returns {string} the sha256 hex
 */
export function computeSuiteHash(root = ROOT) {
    const names = enrolledSpecs(); // sorted, computed-from-disk (no hand-list)
    const h = createHash("sha256");
    h.update(`enrolled:${names.length}\n`);
    for (const name of names) {
        const p = resolve(root, "tests-visual", name);
        const bytes = existsSync(p) ? readFileSync(p) : Buffer.from("");
        const specHash = createHash("sha256").update(bytes).digest("hex");
        h.update(`${name}\t${specHash}\n`);
    }
    return h.digest("hex");
}

/**
 * The PURE verdict over a parsed attestation object. Re-applies the freshness
 * recompute + the per-spec verdict + coverage grammar. PURE over (attestation, root)
 * so `--evaluate` and the self-test exercise it deterministically.
 *
 * @param {any} att the parsed PI-ATTESTATION.json (or null = absent)
 * @param {{root?:string}} [opts]
 * @returns {{ok:boolean, violations:string[], facts:object}}
 */
export function evaluatePiAttestation(att, { root = ROOT } = {}) {
    const violations = [];
    const facts = { present: att != null };
    if (att == null) {
        violations.push(
            "[absent] docs/tranches/BI/PI-ATTESTATION.json is absent — no `--run pi` close ceremony has run (born-RED ground state; the tag is BLOCKED until the local real-GPU `gates.mjs --run pi` writes a fresh green attestation)",
        );
        return { ok: false, violations, facts };
    }

    // (1) verdict — a skeleton / FAIL / unverified attestation REDs (a green skeleton
    // re-creates the source-green/visually-broken trap at the META level).
    facts.verdict = att.verdict ?? null;
    if (att.verdict !== "pass")
        violations.push(
            `[verdict] attestation verdict is "${att.verdict ?? "MISSING"}" (expect "pass") — a FAIL/unverified/skeleton pi-block leaves the binding-π paint unverified`,
        );

    // (2) freshness — recompute the suiteHash at HEAD; a stale digest (a re-stamp /
    // frozen / skip of an old suite state) REDs. THE tag-blocker mechanism.
    const recomputed = computeSuiteHash(root);
    facts.suiteHash = { embedded: att.suiteHash ?? null, recomputed };
    if (typeof att.suiteHash !== "string" || !att.suiteHash)
        violations.push(
            "[stale] attestation carries no suiteHash — the freshness binding is absent (a suite state that cannot be proven current)",
        );
    else if (att.suiteHash !== recomputed)
        violations.push(
            `[stale] embedded suiteHash ${att.suiteHash.slice(0, 12)}… ≠ HEAD-recomputed ${recomputed.slice(0, 12)}… — the enrolled binding-π suite (spec SET + spec CONTENT) DRIFTED since capture; re-run the local \`gates.mjs --run pi\` ceremony before the tag`,
        );

    // (3) both projects — a single-project attestation misses the coarse-touch mobile
    // viewport the gestalt close needs.
    const projects = Array.isArray(att.projects) ? att.projects : [];
    facts.projects = projects;
    for (const p of EXPECTED_PROJECTS)
        if (!projects.includes(p))
            violations.push(
                `[projects] attestation does not cover the "${p}" Playwright project — the two-project (desktop + coarse-touch mobile) run the gestalt close needs is incomplete`,
            );

    // (4) the per-spec verdict LEDGER — every enrolled spec GREEN, the ledger covers
    // the full enrolled set (a partial run cannot attest the whole binding suite).
    const specs = Array.isArray(att.specs) ? att.specs : [];
    const enrolled = enrolledSpecs();
    const attestedNames = new Set(specs.map((s) => s?.spec));
    const missingSpecs = enrolled.filter((n) => !attestedNames.has(n));
    const failedSpecs = specs.filter((s) => s?.verdict !== "pass").map((s) => s?.spec);
    facts.specCount = specs.length;
    facts.enrolledCount = enrolled.length;
    facts.missingSpecs = missingSpecs.length;
    facts.failedSpecs = failedSpecs;
    if (!specs.length)
        violations.push(
            "[digest] attestation embeds no per-spec verdict ledger — the paint-teeth cannot be re-applied",
        );
    if (missingSpecs.length)
        violations.push(
            `[digest] the per-spec ledger is MISSING ${missingSpecs.length} enrolled spec(s) (e.g. ${missingSpecs.slice(0, 4).join(", ")}) — a partial run cannot attest the full binding-π suite`,
        );
    if (failedSpecs.length)
        violations.push(
            `[digest] ${failedSpecs.length} enrolled spec(s) recorded a non-pass verdict (${failedSpecs.slice(0, 4).join(", ")}${failedSpecs.length > 4 ? " …" : ""}) — the binding-π paint FAILED`,
        );

    // (5) count consistency — the embedded enrolledCount must match HEAD (the suite
    // grew/shrank since capture; a redundant belt-and-braces on the suiteHash drift).
    if (Number.isFinite(att.enrolledCount) && att.enrolledCount !== enrolled.length)
        violations.push(
            `[count] attestation enrolledCount ${att.enrolledCount} ≠ HEAD enrolled ${enrolled.length} — the enrolled suite grew/shrank since capture`,
        );

    return { ok: violations.length === 0, violations, facts };
}

/** Read + parse the attestation file at `path`, or null if absent/unparseable. */
export function readPiAttestation(path = PI_ATTESTATION_PATH) {
    if (!existsSync(path)) return null;
    try {
        return JSON.parse(readFileSync(path, "utf8"));
    } catch {
        return { verdict: "unparseable" }; // a corrupt file is a FAIL, not "absent"
    }
}

/**
 * Parse a Playwright JSON report into a per-spec-FILE verdict Map (basename →
 * "pass"|"fail"). A file passes iff every spec in it is `ok`. Returns null on an
 * absent/unparseable report (the caller falls back to the enrolled all-pass ledger
 * since the runner already exited 0). Recursively walks nested `suites`.
 *
 * @param {string} reportPath
 * @returns {Map<string,"pass"|"fail">|null}
 */
export function parsePiReport(reportPath) {
    if (!existsSync(reportPath)) return null;
    let report;
    try {
        report = JSON.parse(readFileSync(reportPath, "utf8"));
    } catch {
        return null;
    }
    const byFile = new Map();
    const noteSpec = (file, ok) => {
        if (!file) return;
        const base = file.split("/").pop();
        const prev = byFile.get(base);
        const verdict = ok ? "pass" : "fail";
        // once a file has any failing spec it stays "fail"
        byFile.set(base, prev === "fail" ? "fail" : verdict);
    };
    const walk = (suite) => {
        if (!suite || typeof suite !== "object") return;
        for (const spec of suite.specs ?? [])
            noteSpec(spec.file ?? suite.file, spec.ok !== false);
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of report.suites ?? []) walk(suite);
    return byFile;
}

/** Assemble the human per-spec verdict LEDGER markdown for the DELTA. */
function renderDelta(att) {
    const ledger = Array.isArray(att.specs) ? att.specs : [];
    const failed = ledger.filter((s) => s?.verdict !== "pass");
    const L = [];
    L.push("# W-PI-IN-CLOSE — the binding-π suite verdict ledger (DELTA)");
    L.push("");
    L.push(
        "Written by the local real-GPU close ceremony `gates.mjs --run pi` (Arm A). The",
    );
    L.push(
        "device-free `proof:pi-attestation` (Arm B, `[\"ci\",\"release\"]`, in `--run full`)",
    );
    L.push(
        "recomputes the enrolled-suite content hash at HEAD + re-applies this ledger, REDing",
    );
    L.push(
        "the tag-push publish path on absent/stale/FAIL. The binding paint is this run; the",
    );
    L.push("gate is the device-free witness that it happened GREEN.");
    L.push("");
    L.push(`- **verdict**: ${att.verdict ?? "MISSING"}`);
    L.push(`- **capturedAt**: ${att.capturedAt ?? "—"}`);
    L.push(`- **capturedCommit**: ${att.capturedCommit ?? "—"}`);
    L.push(`- **suiteHash**: \`${att.suiteHash ?? "—"}\``);
    L.push(`- **enrolledCount**: ${att.enrolledCount ?? "—"}`);
    L.push(`- **projects**: ${(att.projects ?? []).join(", ") || "—"}`);
    if (att.renderer)
        L.push(
            `- **renderer**: ${att.renderer.unmaskedRenderer ?? att.renderer.verdict ?? JSON.stringify(att.renderer)}`,
        );
    L.push("");
    L.push(`## Per-spec verdicts (${ledger.length} enrolled × both projects)`);
    L.push("");
    if (failed.length) {
        L.push(`**${failed.length} FAIL:**`);
        for (const s of failed) L.push(`- ✗ ${s.spec}`);
        L.push("");
    } else {
        L.push(
            `All ${ledger.length} enrolled binding-π specs PASSED over both projects.`,
        );
        L.push("");
    }
    L.push("<details><summary>full ledger</summary>");
    L.push("");
    for (const s of ledger)
        L.push(`- ${s.verdict === "pass" ? "✓" : "✗"} ${s.spec} — ${s.verdict}`);
    L.push("");
    L.push("</details>");
    L.push("");
    return L.join("\n");
}

/**
 * Arm A — write the fresh PI-ATTESTATION.json digest + the human DELTA after a GREEN
 * `--run pi`. Called by `gates.mjs runPi()` on a passing local real-GPU run. The
 * `specs` ledger is the parsed per-spec verdict set (or the enrolled all-pass fallback
 * — the runner already exited 0 by the time this is called).
 *
 * @param {{root?:string, specs?:Array<{spec:string,verdict:string}>, projects?:string[], renderer?:any, capturedCommit?:string|null}} opts
 * @returns {any} the written attestation object
 */
export function writePiAttestation({
    root = ROOT,
    specs,
    projects = [...EXPECTED_PROJECTS],
    renderer = null,
    capturedCommit = null,
} = {}) {
    const suiteHash = computeSuiteHash(root);
    const enrolled = enrolledSpecs();
    const ledger =
        Array.isArray(specs) && specs.length
            ? enrolled.map((n) => {
                  const row = specs.find((s) => s.spec === n);
                  return { spec: n, verdict: row?.verdict ?? "pass" };
              })
            : enrolled.map((n) => ({ spec: n, verdict: "pass" }));
    const anyFail = ledger.some((s) => s.verdict !== "pass");
    const att = {
        schema: "bi-pi-attestation/v1",
        tranche: "BI",
        verdict: anyFail ? "fail" : "pass",
        capturedAt: new Date().toISOString(),
        capturedCommit,
        suiteHash,
        enrolledCount: enrolled.length,
        projects,
        renderer,
        specs: ledger,
    };
    mkdirSync(dirname(resolve(root, PI_ATTESTATION_REL)), { recursive: true });
    writeFileSync(resolve(root, PI_ATTESTATION_REL), JSON.stringify(att, null, 2) + "\n");
    mkdirSync(dirname(resolve(root, PI_DELTA_REL)), { recursive: true });
    writeFileSync(resolve(root, PI_DELTA_REL), renderDelta(att));
    return att;
}

// ── The `--evaluate <path>` verdict CORE (the self-test subprocess target) ──────────
// Evaluate ONE attestation file and exit 0 (clean) / 1 (any violation). The self-test
// spawns this over synthetic fixtures.
function runEvaluate(path) {
    const att = readPiAttestation(resolve(path));
    const { ok, violations } = evaluatePiAttestation(att, { root: ROOT });
    if (!ok) {
        console.error(`[proof:pi-attestation --evaluate] FAIL (${violations.length}):`);
        for (const v of violations) console.error(`  x ${v}`);
    } else {
        console.log(
            "[proof:pi-attestation --evaluate] PASS — the attestation is fresh, full-coverage, all-green.",
        );
    }
    process.exit(ok ? 0 : 1);
}

// ── The structural self-test (subprocess differential; born-RED → GREEN) ────────────
const SELFTEST_DIR = resolve(ROOT, ".cache/pi-attestation-selftest");
const SELF = fileURLToPath(import.meta.url);

function baseAttestation(realHash) {
    const enrolled = enrolledSpecs();
    return {
        schema: "bi-pi-attestation/v1",
        tranche: "BI",
        verdict: "pass",
        capturedAt: new Date(0).toISOString(),
        capturedCommit: "selftest",
        suiteHash: realHash,
        enrolledCount: enrolled.length,
        projects: [...EXPECTED_PROJECTS],
        renderer: {
            unmaskedRenderer: "ANGLE (Apple, Apple M3 Pro, OpenGL 4.1 Metal - 89.3)",
            verdict: "hardware-metal",
        },
        specs: enrolled.map((n) => ({ spec: n, verdict: "pass" })),
    };
}

function spawnEvaluate(path) {
    const res = spawnSync(process.execPath, [SELF, "--evaluate", path], {
        cwd: ROOT,
        encoding: "utf8",
        env: { ...process.env },
    });
    return { status: res.status ?? 1, out: `${res.stdout ?? ""}\n${res.stderr ?? ""}` };
}

function runSelfTest() {
    const realHash = computeSuiteHash(ROOT);
    rmSync(SELFTEST_DIR, { recursive: true, force: true });
    mkdirSync(SELFTEST_DIR, { recursive: true });
    const checks = [];
    try {
        const valid = baseAttestation(realHash);
        const stale = { ...baseAttestation(realHash), suiteHash: "0".repeat(64) };
        const failVerdict = { ...baseAttestation(realHash), verdict: "unverified" };
        const specFail = (() => {
            const a = baseAttestation(realHash);
            const s = a.specs.map((r, i) => (i === 0 ? { ...r, verdict: "fail" } : r));
            return { ...a, specs: s };
        })();
        const missingProject = {
            ...baseAttestation(realHash),
            projects: ["chromium-headless-new"],
        };
        const countDrift = (() => {
            const a = baseAttestation(realHash);
            return { ...a, enrolledCount: a.enrolledCount + 1 };
        })();

        const fixtures = [
            { id: "valid-fresh-green", att: valid, expect: 0, tag: null },
            { id: "stale-hash-red", att: stale, expect: 1, tag: "stale" },
            { id: "fail-verdict-red", att: failVerdict, expect: 1, tag: "verdict" },
            { id: "spec-fail-red", att: specFail, expect: 1, tag: "digest" },
            { id: "missing-project-red", att: missingProject, expect: 1, tag: "projects" },
            { id: "count-drift-red", att: countDrift, expect: 1, tag: "count" },
        ];
        for (const fx of fixtures) {
            const p = join(SELFTEST_DIR, `${fx.id}.json`);
            writeFileSync(p, JSON.stringify(fx.att, null, 2));
            const { status, out } = spawnEvaluate(p);
            const exitOk = status === fx.expect;
            const tagOk = fx.tag == null ? true : new RegExp(`\\[${fx.tag}\\]`).test(out);
            checks.push({
                id: fx.id,
                ok: exitOk && tagOk,
                detail: `exit ${status} (expect ${fx.expect})${fx.tag ? `, names [${fx.tag}]: ${tagOk}` : ""}`,
            });
        }
        // The ABSENT leg — a non-existent path must RED (the born-RED ground state).
        const absent = join(SELFTEST_DIR, "does-not-exist.json");
        const { status: aStatus, out: aOut } = spawnEvaluate(absent);
        checks.push({
            id: "absent-red",
            ok: aStatus === 1 && /\[absent\]/.test(aOut),
            detail: `exit ${aStatus} (expect 1), names [absent]`,
        });
    } finally {
        rmSync(SELFTEST_DIR, { recursive: true, force: true });
    }
    return checks;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_PI_ATTESTATION_ARTIFACT", "BI-pi-attestation");
    const violations = [];
    const facts = {};

    // ── The structural self-test FIRST (the mechanism MUST be sound) ────────────────
    const selfChecks = runSelfTest();
    const selfFailed = selfChecks.filter((c) => !c.ok);
    facts.selfTest = {
        total: selfChecks.length,
        passing: selfChecks.length - selfFailed.length,
        validGreen: selfChecks.find((c) => c.id === "valid-fresh-green")?.ok ?? false,
        legs: selfChecks.map((c) => `${c.id}:${c.ok ? "✓" : "✗"}`),
    };
    for (const c of selfFailed)
        violations.push(
            `[self-test] ${c.id} — ${c.detail} (the tag-blocker mechanism is BROKEN: the subprocess differential failed)`,
        );

    // ── The REAL attestation check (born-RED on HEAD: absent → RED, the tag-blocker) ─
    const att = readPiAttestation(PI_ATTESTATION_PATH);
    const real = evaluatePiAttestation(att, { root: ROOT });
    facts.attestation = { path: PI_ATTESTATION_REL, present: real.facts.present, ...real.facts };
    for (const v of real.violations) violations.push(v);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, command: COMMAND, facts, violations });

    console.log(
        'proof:pi-attestation — Arm B, the binding-π tag-push BLOCKER (BI.W-PI-IN-CLOSE; ["ci","release"])',
    );
    console.log(
        `  attestation          : ${PI_ATTESTATION_REL} — ${real.facts.present ? `present (verdict ${facts.attestation.verdict})` : "ABSENT (born-RED ground state — the local `--run pi` close ceremony has not run)"}`,
    );
    console.log(
        `  suiteHash (HEAD)     : ${computeSuiteHash(ROOT).slice(0, 16)}… (${enrolledSpecs().length} enrolled specs)`,
    );
    console.log(`  self-test (subproc)  : ${facts.selfTest.passing}/${facts.selfTest.total} legs — ${facts.selfTest.legs.join(" ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    console.log("  NOTE: a pi-attestation is written ONLY by `gates.mjs --run pi` on a real GPU (Arm A) after a");
    console.log("        GREEN run of the enrolled binding-π suite over both projects. Arm B (this gate) is the");
    console.log('        device-free freshness enforcer registered ["ci","release"] — it REDs the');
    console.log("        git-push→release.yml→npm-publish path until that ceremony writes a fresh, full-coverage, all-green attestation.");
    process.exit(status === "pass" ? 0 : 1);
}

// CLI dispatch (guarded so importing the leaf — writePiAttestation from runPi, the
// self-test subprocess, the proof-visual-runner W4 oracle — never runs the gate).
// `--evaluate <path>` is the verdict CORE the self-test spawns.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const arg = process.argv[2];
    if (arg === "--evaluate") {
        const p = process.argv[3];
        if (!p) {
            console.error("usage: proof-pi-attestation.mjs --evaluate <attestation.json>");
            process.exit(2);
        }
        runEvaluate(p);
    } else {
        run();
    }
}
