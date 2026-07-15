import { createHash } from "node:crypto";

import { isPlainObject } from "./invariants.mjs";

const SHA256 = /^[0-9a-f]{64}$/;
const GIT_SHA = /^[0-9a-f]{40}$/;
const WAVE_ID = /^BI\.W-P[0-9]{3}$/;

function canonicalJson(value) {
    if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
    if (value !== null && typeof value === "object") {
        return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

function digest(value) {
    return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function clone(value) {
    return structuredClone(value);
}

function red(errors) {
    return { ok: false, status: "RED", exitCode: 1, errors };
}

function pass() {
    return { ok: true, status: "PASS", exitCode: 0, errors: [] };
}

export function evaluateDeviceFreeObservation(value, { expectedSourceSha } = {}) {
    const errors = [];
    if (!isPlainObject(value)) return red(["device-free observation must be an object"]);
    const allowed = new Set(["schemaVersion", "kind", "sourceSha256", "assertionSites", "outcomes"]);
    for (const key of Object.keys(value)) if (!allowed.has(key)) errors.push(`${key}: unexpected property`);
    if (value.schemaVersion !== "1.0.0") errors.push("schemaVersion: expected 1.0.0");
    if (value.kind !== "device-free") errors.push("kind: expected device-free");
    if (!SHA256.test(value.sourceSha256 ?? "")) errors.push("sourceSha256: expected SHA-256");
    if (expectedSourceSha && value.sourceSha256 !== expectedSourceSha) errors.push("sourceSha256: does not bind the tested source bytes");
    if (!Array.isArray(value.assertionSites) || value.assertionSites.length === 0) {
        errors.push("assertionSites: at least one semantically discovered assertion is required");
    }
    if (!Array.isArray(value.outcomes) || value.outcomes.length === 0) {
        errors.push("outcomes: at least one assertion outcome is required");
    } else {
        const names = new Set();
        for (const [index, outcome] of value.outcomes.entries()) {
            if (!isPlainObject(outcome) || typeof outcome.subject !== "string" || outcome.subject.length === 0) {
                errors.push(`outcomes[${index}]: subject is required`);
                continue;
            }
            if (names.has(outcome.subject)) errors.push(`outcomes[${index}]: duplicate subject`);
            names.add(outcome.subject);
            if (outcome.status !== "PASS") errors.push(`outcomes[${index}]: assertion remains ${String(outcome.status)}`);
        }
    }
    return errors.length === 0 ? pass() : red(errors);
}

export function evaluateBrowserReceipt(value, { expectedTestedSourceSha, expectedWaveId } = {}) {
    const errors = [];
    if (!isPlainObject(value)) return red(["browser receipt must be an object"]);
    const allowed = new Set([
        "schemaVersion", "kind", "fixtureOnly", "waveId", "scenarioId", "testedSourceSha",
        "browser", "assertionOutcomes", "artifactDigests",
    ]);
    for (const key of Object.keys(value)) if (!allowed.has(key)) errors.push(`${key}: unexpected property`);
    if (value.schemaVersion !== "1.0.0") errors.push("schemaVersion: expected 1.0.0");
    if (value.kind !== "browser-receipt") errors.push("kind: expected browser-receipt");
    if (value.fixtureOnly !== true) errors.push("fixtureOnly: P000 may validate only a synthetic browser-receipt adapter");
    if (!WAVE_ID.test(value.waveId ?? "")) errors.push("waveId: invalid BI wave");
    if (expectedWaveId && value.waveId !== expectedWaveId) errors.push("waveId: receipt belongs to another wave");
    if (typeof value.scenarioId !== "string" || value.scenarioId.length === 0) errors.push("scenarioId: required");
    if (!GIT_SHA.test(value.testedSourceSha ?? "")) errors.push("testedSourceSha: expected a full Git SHA");
    if (expectedTestedSourceSha && value.testedSourceSha !== expectedTestedSourceSha) {
        errors.push("testedSourceSha: receipt is stale or belongs to another source");
    }
    if (!isPlainObject(value.browser) || !["chromium", "firefox", "webkit"].includes(value.browser.name) || typeof value.browser.version !== "string" || value.browser.version.length === 0) {
        errors.push("browser: exact supported browser identity is required");
    }
    if (!Array.isArray(value.assertionOutcomes) || value.assertionOutcomes.length === 0) {
        errors.push("assertionOutcomes: at least one outcome is required");
    } else {
        for (const [index, outcome] of value.assertionOutcomes.entries()) {
            if (!isPlainObject(outcome) || typeof outcome.subject !== "string" || outcome.subject.length === 0) {
                errors.push(`assertionOutcomes[${index}]: subject is required`);
            }
            if (!isPlainObject(outcome) || outcome.status !== "PASS") {
                errors.push(`assertionOutcomes[${index}]: browser assertion remains ${String(outcome?.status)}`);
            }
        }
    }
    if (!Array.isArray(value.artifactDigests) || value.artifactDigests.length === 0) {
        errors.push("artifactDigests: at least one content-bound artifact is required");
    } else {
        for (const [index, artifact] of value.artifactDigests.entries()) {
            if (!isPlainObject(artifact) || typeof artifact.path !== "string" || artifact.path.length === 0 || !SHA256.test(artifact.sha256 ?? "")) {
                errors.push(`artifactDigests[${index}]: path and SHA-256 are required`);
            }
        }
    }
    return errors.length === 0 ? pass() : red(errors);
}

function deviceFreeFixture() {
    const sourceSha256 = "1".repeat(64);
    return {
        expectedSourceSha: sourceSha256,
        value: {
            schemaVersion: "1.0.0",
            kind: "device-free",
            sourceSha256,
            assertionSites: [{ callee: "expect.toBe", line: 3, column: 5 }],
            outcomes: [{ subject: "restored semantic assertion", status: "PASS" }],
        },
    };
}

function browserReceiptFixture(waveId) {
    const testedSourceSha = "2".repeat(40);
    return {
        expectedTestedSourceSha: testedSourceSha,
        value: {
            schemaVersion: "1.0.0",
            kind: "browser-receipt",
            fixtureOnly: true,
            waveId,
            scenarioId: "bootstrap.browser-receipt-adapter",
            testedSourceSha,
            browser: { name: "webkit", version: "fixture-1" },
            assertionOutcomes: [{ subject: "receipt binds the tested source", status: "PASS" }],
            artifactDigests: [{ path: "fixture/browser-receipt.json", sha256: "3".repeat(64) }],
        },
    };
}

function normalizeResult(result) {
    const ok = result?.ok === true || result?.status === "PASS";
    return {
        ok,
        status: ok ? "PASS" : "RED",
        exitCode: Number.isInteger(result?.exitCode) ? result.exitCode : ok ? 0 : 1,
        errors: Array.isArray(result?.errors) ? result.errors : ok ? [] : ["production validator returned no RED diagnostic"],
    };
}

const REQUIRED_PRODUCTION_REQUIREMENTS = new Set([
    "proof-alias", "ordinary-acceptance", "proof-path", "family-table", "fixed-count",
    "active-surface", "bootstrap-scope", "exit-laundering", "route-drop", "route-multiple",
    "route-false-pass", "route-binding", "route-owner", "route-evidence",
    "build-css", "build-declaration", "build-public-export", "build-public-types-target",
    "build-types-versions-target", "build-top-level-target", "build-export-leaf-type", "build-runtime-normalization",
    "foreign-scope", "verify-scope", "verify-blob", "verify-mode", "create-disposition", "delete-disposition",
    "receipt-acyclic", "receipt-commands", "receipt-evidence", "receipt-payload", "manifest-closure",
    "dag-edge", "dag-transitive", "dag-lock", "dag-tail", "recovery-parent", "recovery-payload",
    "recovery-trailer", "recovery-unique", "installer-config", "installer-owner", "env-isolation",
    "env-script-shell-isolation", "env-user-npmrc-isolation", "env-global-npmrc-isolation",
    "ci-pr-head-checkout", "trailer-block", "adjunct-stability", "vitest-skipped",
]);

export function runMutationContract({ waveId = "BI.W-P000", productionCases = [], requiredProductionRequirements = [], adapterOnly = false } = {}) {
    if (waveId !== "BI.W-P000") {
        return {
            ok: false,
            status: "RED",
            currentProductBrowserCredit: false,
            errors: ["the immutable bootstrap mutation contract is available only to BI.W-P000"],
            cases: [],
        };
    }

    const device = deviceFreeFixture();
    const browser = browserReceiptFixture(waveId);
    const definitions = [
        {
            adapter: "device-free",
            mutation: "assertion outcome fails",
            pristine: device.value,
            mutate(value) { value.outcomes[0].status = "FAIL"; },
            evaluate(value) { return evaluateDeviceFreeObservation(value, { expectedSourceSha: device.expectedSourceSha }); },
        },
        {
            adapter: "device-free",
            mutation: "semantic assertion discovery is removed",
            pristine: device.value,
            mutate(value) { value.assertionSites = []; },
            evaluate(value) { return evaluateDeviceFreeObservation(value, { expectedSourceSha: device.expectedSourceSha }); },
        },
        {
            adapter: "browser-receipt",
            mutation: "receipt tested-source binding is stale",
            pristine: browser.value,
            mutate(value) { value.testedSourceSha = "4".repeat(40); },
            evaluate(value) { return evaluateBrowserReceipt(value, { expectedTestedSourceSha: browser.expectedTestedSourceSha, expectedWaveId: waveId }); },
        },
        {
            adapter: "browser-receipt",
            mutation: "browser assertion remains RED",
            pristine: browser.value,
            mutate(value) { value.assertionOutcomes[0].status = "FAIL"; },
            evaluate(value) { return evaluateBrowserReceipt(value, { expectedTestedSourceSha: browser.expectedTestedSourceSha, expectedWaveId: waveId }); },
        },
        {
            adapter: "browser-receipt",
            mutation: "receipt artifact binding is removed",
            pristine: browser.value,
            mutate(value) { value.artifactDigests = []; },
            evaluate(value) { return evaluateBrowserReceipt(value, { expectedTestedSourceSha: browser.expectedTestedSourceSha, expectedWaveId: waveId }); },
        },
    ];

    const adapterCases = definitions.map((definition) => {
        const mutated = clone(definition.pristine);
        definition.mutate(mutated);
        const redResult = definition.evaluate(mutated);
        const restoredResult = definition.evaluate(clone(definition.pristine));
        return {
            adapter: definition.adapter,
            mutation: definition.mutation,
            mutatedStatus: redResult.status,
            mutatedExitCode: redResult.exitCode,
            restoredStatus: restoredResult.status,
            restoredExitCode: restoredResult.exitCode,
            mutationErrors: redResult.errors,
            restoredEvidenceDigest: digest(definition.pristine),
        };
    });
    const productionResults = productionCases.map((definition) => {
        const pristine = clone(definition.pristine);
        const pristineDigest = digest(pristine);
        const mutated = clone(pristine);
        let harnessError = null;
        try {
            definition.mutate(mutated);
        } catch (error) {
            harnessError = `production mutator threw: ${error.message}`;
        }
        let redResult = pass();
        try {
            if (!harnessError) redResult = normalizeResult(definition.validator(clone(mutated)));
        } catch (error) {
            harnessError = `production validator threw for the planted defect: ${error.message}`;
        }
        let restoredResult = red(["production restored validator was not executed"]);
        const restored = clone(pristine);
        try {
            restoredResult = normalizeResult(definition.validator(restored));
        } catch (error) {
            harnessError = `${harnessError ? `${harnessError}; ` : ""}production validator threw after restoration: ${error.message}`;
        }
        const restoredDigest = digest(restored);
        if (restoredDigest !== pristineDigest) harnessError = `${harnessError ? `${harnessError}; ` : ""}mutation fixture did not restore byte-equivalent canonical input`;
        return {
            adapter: definition.adapter ?? "production-validator",
            mutation: definition.mutation,
            requirement: definition.requirement,
            validator: definition.validatorName,
            mutatedStatus: harnessError ? "HARNESS_ERROR" : redResult.status,
            mutatedExitCode: harnessError ? 70 : redResult.exitCode,
            restoredStatus: restoredResult.status,
            restoredExitCode: restoredResult.exitCode,
            mutationErrors: harnessError ? [harnessError] : redResult.errors,
            pristineEvidenceDigest: pristineDigest,
            restoredEvidenceDigest: restoredDigest,
        };
    });
    const cases = [...adapterCases, ...productionResults];
    const coveredRequirements = new Set(productionResults.map((item) => item.requirement));
    const expectedRequirements = new Set([...REQUIRED_PRODUCTION_REQUIREMENTS, ...requiredProductionRequirements]);
    const missingRequirements = !adapterOnly
        ? [...expectedRequirements].filter((requirement) => !coveredRequirements.has(requirement))
        : [];
    const ok = missingRequirements.length === 0 && cases.every((item) => item.mutatedStatus === "RED" && item.mutatedExitCode !== 0 && item.restoredStatus === "PASS" && item.restoredExitCode === 0 && (!item.pristineEvidenceDigest || item.pristineEvidenceDigest === item.restoredEvidenceDigest));
    const result = {
        schemaVersion: "1.0.0",
        kind: "P000_MUTATION_CONTRACT",
        status: ok ? "PASS" : "RED",
        currentProductBrowserCredit: false,
        missingProductionRequirements: missingRequirements,
        cases,
    };
    return { ...result, ok, digest: digest(result) };
}

export { canonicalJson };
