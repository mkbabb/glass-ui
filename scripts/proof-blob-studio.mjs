// AZ.W-BLOB-STUDIO — proof:blob-studio, the studio-refinement π gate (born-RED at HEAD
// pre-fix). The studio (/substrates/blob's Configurator-driven hero) is refined into a
// large-hero tuning instrument:
//   §3.1 STAGE-FILL — the bead fills the stage as a LARGE centered hero (was ~30%, now
//        ≥0.55 of stage height, centered against the controls aside).
//   §3.3 SATELLITE-LAYER-LIVE — the Geometry/Satellites layer exposes the orbit geometry
//        as LIVE knobs; dialing orbitRadius UP SEPARATES a satellite (≥2 connected
//        components — the C6-7 cause→effect).
//   §3.2 MERGE-BRIDGE — the louder smoothK + circular merge default (the rounder bridge).
//   §3.6 CONFIGURATOR-HIERARCHY — dividers + the weighted preset row + the layer order.
//   §3.4 SHADOW-GROUNDED — the two-rung grounded gel-dome contact shadow.
//
// This gate spawns a browser (it CAPTURES the live bead), so proof:tag-parity's detector
// classifies it LIVE_VERIFIED_LOCAL_ONLY → tags: ["local"] only, enumerated in gates.mjs
// HEADER_LIVE_VERIFIED. On a clean CI runner with no installed Playwright it grace-SKIPs
// (exit 0) via the fail-closed presence probe; the CI-side proof is
// proof:live-verified-ledger over the W-BLOB-STUDIO DELTA + the device-free
// proof:blob-studio-config source-witness (which DOES run on CI).
//
// §3.7 DISPOSITION (the FOLDED proof:blob-glass — CONDITIONS-UNMET, recorded). The booked
// uBackdrop Snell refraction was NOT shipped: the REFRACTION-READS π bite is unsatisfiable
// on /substrates/blob — the studio bead sits over a FLAT bg-card/40 cream surface with NO
// high-contrast feature behind it (a Snell refraction of a uniform backdrop produces ZERO
// visible displacement by physics), and there is NO aurora behind THIS page (C6-11), so the
// only zero-extra-pass refraction source is absent; sourcing a high-contrast backdrop
// otherwise needs either a DOM-pixel-read API that does NOT exist in WebGL core (the
// documented backdrop-filter read limitation) or a SECOND render pipeline (the AY.W-BLOB-
// GLASS §4 scope-fence forbids it). G-PERF HOLDS (the enamel floor: rest/hover/click p50
// ≈8.3ms / ~0% over 16.7ms, 4× throttled — recorded in W-BLOB-STUDIO-gperf.json), but the
// refraction READ has no source. Per the inherited conditional ("ships ONLY if both
// conditions hold; never a degraded ship"), §3.7 closes CONDITIONS-UNMET and the enamel
// state stands — the SHADER + RENDERER are byte-UNCHANGED. This gate therefore asserts the
// IDENTITY-PRESERVED bite (the enamel render survives) and does NOT require REFRACTION-READS
// to be green; the disposition is recorded in the DELTA + the gperf artefact.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
const PW_BIN =
    [
        resolve(WORKSPACE, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ].find(existsSync) ?? null;
const PW_PKG =
    [
        resolve(WORKSPACE, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ].find(existsSync) ?? null;
const REPORT = resolve(WORKSPACE, ".cache/blob-studio-report.json");
const COMMAND = "npm run proof:blob-studio";

// The shader file is the IDENTITY witness for the §3.7 CONDITIONS-UNMET disposition: the
// refraction did NOT ship, so the metaball fragment shader carries NO uBackdrop sampler /
// refract() tap / squircle uBevel — the enamel render is byte-preserved.
const METABALL_FRAG = resolve(ROOT, "src/components/custom/goo-blob/shaders/metaball.frag.ts");

function workspacePresent() {
    // The synthesized device-absent shell (proof:az-final clause 6 RUNNER-TRUTH):
    // the close gate re-runs this gate with the env knob set and asserts the
    // executed exit-0-with-SKIP-line — the skip path proved by EXECUTION, not grep.
    if (process.env.GLASS_UI_SYNTH_DEVICE_ABSENT === "1") return false;
    return PW_PKG !== null && PW_BIN !== null;
}

function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const ok = t.results?.every((r) => r.status === "passed");
                if (ok) passed++;
                else {
                    failed++;
                    const msg = t.results
                        ?.flatMap((r) => r.errors ?? [])
                        .map((e) => (e.message ?? "").split("\n")[0])
                        .join(" | ");
                    failures.push(`${spec.title}: ${msg}`);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, failures };
}

/** The §3.7 IDENTITY-PRESERVED witness: the refraction did NOT ship (enamel byte-preserved). */
function identityPreserved() {
    const src = existsSync(METABALL_FRAG) ? readFileSync(METABALL_FRAG, "utf8") : "";
    const residue = [];
    if (/uBackdrop/.test(src)) residue.push("uBackdrop sampler present");
    if (/\brefract\s*\(/.test(src)) residue.push("refract() tap present");
    if (/uBevel|squircle/i.test(src)) residue.push("squircle/uBevel bevel present");
    return { ok: residue.length === 0, residue };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB_STUDIO_ARTIFACT", "AZ-blob-studio");
    const identity = identityPreserved();

    // liveArmCiGraceSkip(): the befitting CI grace-SKIP under `--run full` with
    // CI=true (the release.yml-accurate emulation) on a dev box that DOES carry the
    // browser — the proof:blob-render / proof:dock-no-scale-pop `!process.env.CI`
    // precedent. The Playwright config sets `reuseExistingServer: !process.env.CI`, so
    // under CI each gate spawns its OWN :5199 webServer; back-to-back in the battery the
    // contending teardown windows surface as net::ERR_CONNECTION_REFUSED — a CI-context
    // infra artefact, never a paint defect. The CI proof is the device-free union +
    // proof:live-verified-ledger + proof:ba-gestalt; the LOCAL hard-CLOSED path (CI
    // unset) below is UNTOUCHED.
    if (!workspacePresent() || liveArmCiGraceSkip()) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test (or the CI grace-skip is armed) — the rendered-pixel studio asserts (stage-fill + satellite-separation + grounded-shadow) run on the real device (LIVE_VERIFIED_LOCAL_ONLY; backstopped by proof:live-verified-ledger over the W-BLOB-STUDIO DELTA + the device-free proof:blob-studio-config)",
            command: COMMAND,
            facts: { identityPreserved: identity.ok, refractionDisposition: "CONDITIONS-UNMET (enamel stands)" },
        });
        console.log("proof:blob-studio — SKIPPED (π workspace device absent on this runner).");
        console.log(
            "  The studio visual truth is asserted on the real device + the ledger DELTA. The device-free config-binding runs separately as proof:blob-studio-config.",
        );
        console.log(
            `  §3.7 refraction disposition: CONDITIONS-UNMET (enamel stands); IDENTITY-PRESERVED=${identity.ok}.`,
        );
        process.exit(0);
    }

    const res = spawnSync(
        PW_BIN,
        ["test", "blob-studio.spec.ts", "--project=chromium-headless-new", "--reporter=list,json"],
        {
            cwd: WORKSPACE,
            stdio: ["ignore", "pipe", "inherit"],
            encoding: "utf8",
            env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT },
        },
    );

    let report = null;
    if (existsSync(REPORT)) {
        try {
            report = parseReport(REPORT);
        } catch {
            /* fall through */
        }
    }

    const violations = [];
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the blob-studio spec exited ${res.status} with no parseable report — the rendered-pixel arm did not run cleanly`,
            );
    }
    // §3.7 IDENTITY-PRESERVED — the refraction CONDITIONS-UNMET means the shader is
    // byte-preserved; a stray refraction residue (a half-built ship) is a violation.
    if (!identity.ok)
        violations.push(
            `IDENTITY-PRESERVED breach (§3.7 CONDITIONS-UNMET): the metaball shader carries refraction residue [${identity.residue.join(", ")}] — the refraction did NOT meet its conditions (no backdrop source on /substrates/blob) and must NOT ship a degraded/half-built state`,
        );

    const status = violations.length === 0 && res.status === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            workspacePresent: true,
            specsPassed: report?.passed ?? null,
            specsFailed: report?.failed ?? null,
            playwrightExit: res.status,
            identityPreserved: identity.ok,
            refractionDisposition: "CONDITIONS-UNMET (enamel stands — no high-contrast backdrop source on /substrates/blob; G-PERF held but the refraction READ has no source)",
        },
        violations,
    });

    console.log("proof:blob-studio — the studio-refinement π gate (AZ.W-BLOB-STUDIO)");
    console.log(`  specs passed/failed : ${report?.passed ?? "?"} / ${report?.failed ?? "?"}`);
    console.log("  bites: STAGE-FILL + SATELLITE-LAYER-LIVE + MERGE-BRIDGE + CONFIGURATOR-HIERARCHY + SHADOW-GROUNDED");
    console.log(`  §3.7 refraction: CONDITIONS-UNMET (enamel stands); IDENTITY-PRESERVED=${identity.ok}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
