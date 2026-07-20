#!/usr/bin/env node
// BJ.W-PIXEL-FLOOR-CI — the pixel-floor gate's VERDICT AUTHORITY.
//
// THE PIPE-TRAP RULE: a piped runner's exit status is tail's, not the runner's, and
// a Playwright run that never launched a browser can exit 0 with zero tests. So the
// gate's verdict is read from the MACHINE REPORT (`.cache/pi-report.json`, the JSON
// reporter configured in playwright.config.ts) — never from an exit code.
//
// FAIL-ON-SKIP (adjudicated ruling 5): "no GL context / test SKIPped / no browser
// binary / spec not found" is RED, never a pass. A befitting-silent skip is exactly
// the `gate:unwired-gate-non-execution` this wave exists to cure, so absence of a
// result is treated as a failure to paint, not as an excused run.
//
// Modes:
//   --expect=green        the real render: every required floor ran and PASSED.
//   --expect=planted-red  the self-test bite: every required floor ran and FAILED.
//                         A planted defect that does not RED means the floor is
//                         hollow, so a PASS here is itself the gate failure.

import { readFileSync } from "node:fs";

// The report path is per-ARM: the green and planted runs each bank their own JSON so
// both survive one invocation. A single shared path meant the second arm overwrote the
// first and the DELTA — which IS the pair, not either half — could never be captured.
const REPORT_ARG = (process.argv.find((a) => a.startsWith("--report=")) ?? "").split(
    "=",
)[1];
const REPORT = new URL(REPORT_ARG ?? "./.cache/pi-report.json", import.meta.url);

// The sound floors this gate wires (BAND-GATES W2: the two non-black/coverage
// floors only — the per-preset hue/chroma parity is Family G's).
const FLOORS = {
    aurora: "aurora paints a non-black interior on DEFAULT + every preset at t=1",
    blob: "blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS",
};

// --floors=a,b selects a subset. The CI lane runs `--floors=blob`: on the software
// rasterizer the aurora never ARMS (badge never reaches data-state=ready; measured
// 180s timeout vs 22.8s green on Metal), so wiring it there gates on the runner's
// GPU rather than on our paint. Naming the subset explicitly keeps a dropped floor
// loud — an unnamed floor missing from the report is still RED below.
const REQUIRED = ((process.argv.find((a) => a.startsWith("--floors=")) ?? "")
    .split("=")[1] ?? "")
    .split(",")
    .filter(Boolean)
    .map((k) => {
        if (!FLOORS[k]) {
            console.error(`pi-gate-verify: unknown floor '${k}' (have: ${Object.keys(FLOORS).join(", ")})`);
            process.exit(2);
        }
        return FLOORS[k];
    });
if (REQUIRED.length === 0) REQUIRED.push(...Object.values(FLOORS));

const mode = (process.argv.find((a) => a.startsWith("--expect=")) ?? "").split("=")[1];
if (mode !== "green" && mode !== "planted-red") {
    console.error("pi-gate-verify: --expect=green|planted-red is required");
    process.exit(2);
}

const fail = (lines) => {
    console.error(`\npixel-floor gate: RED (--expect=${mode})\n`);
    for (const l of lines) console.error(`  · ${l}`);
    console.error("");
    process.exit(1);
};

let report;
try {
    report = JSON.parse(readFileSync(REPORT, "utf8"));
} catch (err) {
    fail([
        `no readable machine report at ${REPORT.pathname} — the run produced NO verdict.`,
        `This is the fail-on-SKIP case: a missing report means the browser never launched,`,
        `the spec never matched, or the runner died. It is RED, never an excused skip.`,
        `(${err.message})`,
    ]);
}

/** Flatten every spec in the report's nested suite tree. */
function collectSpecs(node, out = []) {
    for (const spec of node.specs ?? []) out.push(spec);
    for (const child of node.suites ?? []) collectSpecs(child, out);
    return out;
}

// THE BITE MUST BE ATTRIBUTABLE. Crediting ANY failure to the plant cannot tell a
// biting floor from a dead harness: under `PI_PLANT=black-aurora` the rewritten
// fragment shader declares no uniforms, so a page-side location lookup can go null and
// the arm/readiness path may never resolve — `assertLiveWebGLPath` then fails, or the
// run times out, and the verifier prints "the floors bite" having never seen the floor
// assertion evaluate. Each required floor therefore pins the TEXT of its own failure.
const FLOOR_BITE = {
    "aurora paints a non-black interior on DEFAULT + every preset at t=1":
        /painted a BLACK interior/,
    "blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS":
        /below the non-blank floor/,
};

const specs = collectSpecs(report);
const problems = [];

// A top-level reporter error (webServer never came up, global setup threw) is RED
// regardless of per-test outcomes.
for (const e of report.errors ?? []) {
    problems.push(`runner-level error: ${(e.message ?? String(e)).split("\n")[0]}`);
}

for (const title of REQUIRED) {
    const spec = specs.find((s) => s.title === title);
    if (!spec) {
        problems.push(
            `required floor NEVER RAN: "${title}" — absent from the report (renamed, unmatched by the glob, or the file was skipped). RED, never a skip.`,
        );
        continue;
    }
    // The report marks a SKIPPED spec `ok: true` with an empty `results` array —
    // `spec.ok` is not a verdict, it is the absence of one. Read the per-test status
    // and the per-result status; both channels must show a real executed outcome.
    const tests = spec.tests ?? [];
    for (const t of tests) {
        if (t.status === "skipped" || t.status === "interrupted") {
            problems.push(
                `required floor "${title}" was SKIPPED by the runner (project ${t.projectName ?? "?"}, spec.ok=${spec.ok}) — a skip is RED (fail-on-SKIP, ruling 5), never a pass.`,
            );
        }
    }
    const results = tests.flatMap((t) => t.results ?? []);
    if (results.length === 0) {
        problems.push(
            `required floor "${title}" produced ZERO results — it never executed. RED, never a skip.`,
        );
        continue;
    }
    for (const r of results) {
        if (r.status === "skipped" || r.status === "interrupted") {
            problems.push(
                `required floor "${title}" reported result status "${r.status}" — a skip is RED (fail-on-SKIP, ruling 5).`,
            );
        }
    }
    const statuses = results.map((r) => r.status);
    const passed = statuses.every((s) => s === "passed");
    const failed = statuses.some((s) => s === "failed" || s === "timedOut");

    if (mode === "green" && !passed) {
        const first = results.find((r) => r.status !== "passed");
        const why = (first?.error?.message ?? "").split("\n")[0];
        problems.push(
            `required floor "${title}" did not pass on the real render (${statuses.join(", ")})${why ? ` — ${why}` : ""}`,
        );
    }
    if (mode === "planted-red") {
        const msgs = results.map((r) => r.error?.message ?? "").join("\n");
        if (!failed) {
            problems.push(
                `PLANTED DEFECT DID NOT BITE: "${title}" reported ${statuses.join(", ")} with the defect planted. A floor that cannot be made to fail is theatre — this is the gate's own self-test failing.`,
            );
        } else if (!FLOOR_BITE[title].test(msgs)) {
            problems.push(
                `PLANTED DEFECT FAILED THE WRONG ASSERTION: "${title}" failed, but not on its floor (${FLOOR_BITE[title]}) — the harness broke, the floor did not bite. First error: ${msgs.split("\n")[0]}`,
            );
        }
    }
}

if (problems.length > 0) fail(problems);

console.log(
    mode === "green"
        ? `pixel-floor gate: GREEN — ${REQUIRED.length} floors ran on the live paint path and passed.`
        : `pixel-floor gate: GREEN (self-test) — ${REQUIRED.length} floors RED-ed on the planted defect; the floors bite.`,
);
