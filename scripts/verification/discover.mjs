import { createHash } from "node:crypto";
import { opendir, readFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import ts from "typescript";

import { isPlainObject } from "./invariants.mjs";

const TEST_FILE = /(?:^|\/)(?:tests?|tests-visual|__tests__)\/.*\.(?:test|spec)\.[cm]?[jt]sx?$/;
const BROWSER_TEST_FILE = /(?:^|\/)tests-visual\/.*\.spec\.[cm]?[jt]sx?$/;
const SCENARIO_FILE = /(?:^|\/)[^/]+(?:\.verification-scenario|\.scenario)\.json$/;
const IGNORED_DIRECTORIES = new Set([
    ".git",
    ".output",
    ".turbo",
    ".vite",
    "coverage",
    "dist",
    "node_modules",
    "playwright-report",
    "test-results",
]);
const SHA256 = /^[0-9a-f]{64}$/;
const GIT_SHA = /^[0-9a-f]{40}$/;
const WAVE_ID = /^BI\.W-P[0-9]{3}$/;
const FAMILY_ID = /^[a-z]+(?:[.-][a-z]+)+$/;

function sha256(value) {
    return createHash("sha256").update(value).digest("hex");
}

function toRepoPath(root, path) {
    return relative(root, path).split(sep).join("/");
}

function comparePaths(left, right) {
    return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

async function walk(root, directory, files) {
    const handle = await opendir(directory);
    for await (const entry of handle) {
        if (entry.isSymbolicLink()) continue;
        if (entry.isDirectory()) {
            if (!IGNORED_DIRECTORIES.has(entry.name)) await walk(root, resolve(directory, entry.name), files);
            continue;
        }
        if (entry.isFile()) files.push(toRepoPath(root, resolve(directory, entry.name)));
    }
}

export async function discoverRepositoryFiles(root = process.cwd()) {
    const files = [];
    await walk(root, root, files);
    return files.sort(comparePaths);
}

function calleeText(expression) {
    if (ts.isIdentifier(expression)) return expression.text;
    if (ts.isPropertyAccessExpression(expression)) return `${calleeText(expression.expression)}.${expression.name.text}`;
    if (ts.isElementAccessExpression(expression) && ts.isStringLiteral(expression.argumentExpression)) {
        return `${calleeText(expression.expression)}.${expression.argumentExpression.text}`;
    }
    if (ts.isCallExpression(expression)) return calleeText(expression.expression);
    return "";
}

function isAssertionCall(node) {
    if (!ts.isCallExpression(node)) return false;
    const name = calleeText(node.expression);
    if (name === "expect") {
        const parent = node.parent;
        if (ts.isPropertyAccessExpression(parent) && parent.expression === node && ts.isCallExpression(parent.parent)) return false;
        return true;
    }
    if (name === "assert" || name.startsWith("assert.")) return true;
    if (!ts.isPropertyAccessExpression(node.expression) || !ts.isCallExpression(node.expression.expression)) return false;
    return calleeText(node.expression.expression.expression) === "expect";
}

function assertionName(node) {
    if (ts.isPropertyAccessExpression(node.expression) && ts.isCallExpression(node.expression.expression)) {
        return `expect.${node.expression.name.text}`;
    }
    return calleeText(node.expression);
}

export function discoverAssertionSites(source, path = "fixture.test.ts") {
    const kind = path.endsWith("x") ? ts.ScriptKind.TSX : path.endsWith(".js") || path.endsWith(".mjs") ? ts.ScriptKind.JS : ts.ScriptKind.TS;
    const sourceFile = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
    const assertions = [];
    function visit(node) {
        if (isAssertionCall(node)) {
            const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
            assertions.push({
                callee: assertionName(node),
                line: location.line + 1,
                column: location.character + 1,
            });
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return assertions;
}

export function discoverRetiredTestIdentities(source, path = "fixture.test.ts") {
    const kind = path.endsWith("x") ? ts.ScriptKind.TSX : path.endsWith(".js") || path.endsWith(".mjs") ? ts.ScriptKind.JS : ts.ScriptKind.TS;
    const sourceFile = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
    const findings = [];
    function visit(node) {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ["describe", "it", "test", "suite"].includes(node.expression.text)) {
            const title = node.arguments[0];
            if (title && ts.isStringLiteralLike(title) && /^(?:proof|gates?):[^\s]+/.test(title.text)) {
                const location = sourceFile.getLineAndCharacterOfPosition(title.getStart(sourceFile));
                findings.push({ title: title.text, line: location.line + 1, column: location.character + 1 });
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return findings;
}

export function discoverInvariantAnnotations(source) {
    const families = new Set();
    const annotation = /@glass-invariant\s+([^\r\n*]+)/g;
    for (const match of source.matchAll(annotation)) {
        for (const token of match[1].split(/[\s,]+/)) {
            if (FAMILY_ID.test(token)) families.add(token);
        }
    }
    return [...families].sort(comparePaths);
}

function allowedKeys(value, keys, path, errors) {
    if (!isPlainObject(value)) {
        errors.push(`${path}: expected an object`);
        return;
    }
    for (const key of Object.keys(value)) {
        if (!keys.has(key)) errors.push(`${path}.${key}: unexpected property`);
    }
}

function nonEmpty(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function substantive(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (["boolean", "number"].includes(typeof value)) return Number.isFinite(value) || typeof value === "boolean";
    if (Array.isArray(value)) return value.length > 0 && value.every(substantive);
    if (isPlainObject(value)) return Object.keys(value).length > 0 && Object.values(value).every(substantive);
    return false;
}

function uniqueStrings(value, path, errors, pattern = null) {
    if (!Array.isArray(value) || value.length === 0) {
        errors.push(`${path}: expected a non-empty array`);
        return [];
    }
    const seen = new Set();
    for (const item of value) {
        if (!nonEmpty(item) || (pattern && !pattern.test(item))) errors.push(`${path}: invalid value ${String(item)}`);
        if (seen.has(item)) errors.push(`${path}: duplicate value ${String(item)}`);
        seen.add(item);
    }
    return [...seen];
}

export function validateExternalScenario(value, knownFamilies = null) {
    const errors = [];
    allowedKeys(value, new Set([
        "schemaVersion", "scenarioId", "ownerWave", "title", "candidate", "invariantFamilies",
        "environments", "steps", "assertions", "receiptContract",
    ]), "scenario", errors);
    if (!isPlainObject(value)) return { ok: false, errors };
    if (value.schemaVersion !== "1.0.0") errors.push("scenario.schemaVersion: expected 1.0.0");
    if (!/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(value.scenarioId ?? "")) errors.push("scenario.scenarioId: invalid identifier");
    if (!WAVE_ID.test(value.ownerWave ?? "")) errors.push("scenario.ownerWave: invalid BI wave");
    if (!nonEmpty(value.title)) errors.push("scenario.title: expected non-empty text");

    allowedKeys(value.candidate, new Set(["repository", "testedSourceSha", "packageName", "tarballSha256"]), "scenario.candidate", errors);
    if (isPlainObject(value.candidate)) {
        if (!nonEmpty(value.candidate.repository)) errors.push("scenario.candidate.repository: required");
        if (!GIT_SHA.test(value.candidate.testedSourceSha ?? "")) errors.push("scenario.candidate.testedSourceSha: expected full Git SHA");
        if (!nonEmpty(value.candidate.packageName)) errors.push("scenario.candidate.packageName: required");
        if (!SHA256.test(value.candidate.tarballSha256 ?? "")) errors.push("scenario.candidate.tarballSha256: expected SHA-256");
    }

    const families = uniqueStrings(value.invariantFamilies, "scenario.invariantFamilies", errors, FAMILY_ID);
    if (knownFamilies) {
        for (const family of families) {
            if (!knownFamilies.has(family)) errors.push(`scenario.invariantFamilies: unknown family ${family}`);
        }
    }

    if (!Array.isArray(value.environments) || value.environments.length === 0) {
        errors.push("scenario.environments: expected at least one environment");
    } else {
        value.environments.forEach((environment, index) => {
            const path = `scenario.environments[${index}]`;
            allowedKeys(environment, new Set(["browser", "viewport", "colorScheme", "input", "reducedMotion", "forcedColors", "reducedTransparency"]), path, errors);
            if (!isPlainObject(environment)) return;
            if (!["chromium", "firefox", "webkit"].includes(environment.browser)) errors.push(`${path}.browser: unsupported browser`);
            if (!["light", "dark"].includes(environment.colorScheme)) errors.push(`${path}.colorScheme: invalid`);
            if (!["fine", "coarse", "keyboard"].includes(environment.input)) errors.push(`${path}.input: invalid`);
            allowedKeys(environment.viewport, new Set(["width", "height"]), `${path}.viewport`, errors);
            if (isPlainObject(environment.viewport)) {
                for (const dimension of ["width", "height"]) {
                    if (!Number.isInteger(environment.viewport[dimension]) || environment.viewport[dimension] < 240) {
                        errors.push(`${path}.viewport.${dimension}: expected integer >= 240`);
                    }
                }
            }
            for (const flag of ["reducedMotion", "forcedColors", "reducedTransparency"]) {
                if (environment[flag] !== undefined && typeof environment[flag] !== "boolean") errors.push(`${path}.${flag}: expected boolean`);
            }
        });
    }

    if (!Array.isArray(value.steps) || value.steps.length === 0) {
        errors.push("scenario.steps: expected at least one step");
    } else {
        const actions = new Set(["navigate", "keyboard", "pointer", "touch", "configure", "wait-for-state"]);
        value.steps.forEach((step, index) => {
            const path = `scenario.steps[${index}]`;
            allowedKeys(step, new Set(["action", "target", "value", "state"]), path, errors);
            if (!isPlainObject(step)) return;
            if (!actions.has(step.action)) {
                errors.push(`${path}.action: unsupported action`);
                return;
            }
            if (step.action === "navigate" && !nonEmpty(step.target)) errors.push(`${path}.target: navigate requires a destination`);
            if (["keyboard", "pointer", "touch", "configure"].includes(step.action)) {
                if (!nonEmpty(step.target)) errors.push(`${path}.target: ${step.action} requires an operable target`);
                if (!("value" in step) || !substantive(step.value)) errors.push(`${path}.value: ${step.action} requires a substantive input`);
            }
            if (step.action === "wait-for-state" && !nonEmpty(step.state)) errors.push(`${path}.state: wait-for-state requires an observable terminal state`);
        });
    }

    if (!Array.isArray(value.assertions) || value.assertions.length === 0) {
        errors.push("scenario.assertions: expected at least one assertion");
    } else {
        const kinds = new Set(["semantic", "geometry", "visual-order", "motion-trajectory", "performance", "accessibility", "resource-ownership"]);
        value.assertions.forEach((assertion, index) => {
            const path = `scenario.assertions[${index}]`;
            allowedKeys(assertion, new Set(["kind", "subject", "expected"]), path, errors);
            if (!isPlainObject(assertion)) return;
            if (!kinds.has(assertion.kind)) errors.push(`${path}.kind: unsupported assertion kind`);
            if (!nonEmpty(assertion.subject)) errors.push(`${path}.subject: required`);
            if (!("expected" in assertion) || !substantive(assertion.expected)) errors.push(`${path}.expected: substantive expected behavior is required`);
        });
    }

    allowedKeys(value.receiptContract, new Set(["testedSourceSha", "browserIdentity", "assertionOutcomes", "artifactDigests"]), "scenario.receiptContract", errors);
    if (isPlainObject(value.receiptContract)) {
        for (const key of ["testedSourceSha", "browserIdentity", "assertionOutcomes", "artifactDigests"]) {
            if (value.receiptContract[key] !== true) errors.push(`scenario.receiptContract.${key}: must be true`);
        }
    }
    return { ok: errors.length === 0, errors };
}

function findExecutableIdentity(value, path, errors) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => findExecutableIdentity(item, `${path}[${index}]`, errors));
        return;
    }
    if (!isPlainObject(value)) return;
    for (const [key, nested] of Object.entries(value)) {
        if (["argv", "command", "executableId", "gateId", "packageScript", "tablePath"].includes(key)) {
            errors.push(`${path}.${key}: evidence plans cannot mint executable family identities`);
        }
        findExecutableIdentity(nested, `${path}.${key}`, errors);
    }
}

export function validateEvidencePlan(value, knownFamilies = null, knownRouteFamilies = knownFamilies) {
    const errors = [];
    allowedKeys(value, new Set(["schemaVersion", "waveId", "profile", "authority", "invariantFamilies", "sources", "currentReds", "summary"]), "plan", errors);
    if (!isPlainObject(value)) return { ok: false, errors };
    if (value.schemaVersion !== "1.0.0") errors.push("plan.schemaVersion: expected 1.0.0");
    if (!WAVE_ID.test(value.waveId ?? "")) errors.push("plan.waveId: invalid BI wave");
    if (!["bootstrap", "commit", "ci", "local", "native", "release"].includes(value.profile)) errors.push("plan.profile: unsupported profile");
    if (!["IMMUTABLE_FORMATION_P000_PLAN_ONLY", "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS"].includes(value.authority)) errors.push("plan.authority: unsupported authority");
    const families = uniqueStrings(value.invariantFamilies, "plan.invariantFamilies", errors, FAMILY_ID);
    if (knownFamilies) for (const family of families) if (!knownFamilies.has(family)) errors.push(`plan.invariantFamilies: unknown family ${family}`);
    const familySet = new Set(families);

    if (!Array.isArray(value.sources)) {
        errors.push("plan.sources: expected an array");
    } else {
        value.sources.forEach((source, index) => {
            const path = `plan.sources[${index}]`;
            if (!isPlainObject(source)) {
                errors.push(`${path}: expected an object`);
                return;
            }
            if (!nonEmpty(source.path)) errors.push(`${path}.path: required`);
            if (!SHA256.test(source.sha256 ?? "")) errors.push(`${path}.sha256: expected SHA-256`);
            const sourceFamilies = Array.isArray(source.invariantFamilies) ? source.invariantFamilies : [];
            if (new Set(sourceFamilies).size !== sourceFamilies.length) errors.push(`${path}.invariantFamilies: duplicates`);
            for (const family of sourceFamilies) if (!familySet.has(family)) errors.push(`${path}.invariantFamilies: ${family} is not selected`);
            if (source.kind === "normal-test") {
                allowedKeys(source, new Set(["kind", "path", "sha256", "assertions", "invariantFamilies"]), path, errors);
                if (!Array.isArray(source.assertions) || source.assertions.length === 0) errors.push(`${path}.assertions: expected discovered assertion sites`);
            } else if (source.kind === "browser-scenario") {
                allowedKeys(source, new Set(["kind", "path", "sha256", "assertions", "invariantFamilies", "currentProductPiCredit"]), path, errors);
                if (!Array.isArray(source.assertions) || source.assertions.length === 0) errors.push(`${path}.assertions: expected discovered browser assertion sites`);
                if (source.currentProductPiCredit !== false) errors.push(`${path}.currentProductPiCredit: P000 discovery confers zero product pi credit`);
            } else if (source.kind === "external-scenario") {
                allowedKeys(source, new Set(["kind", "path", "sha256", "scenarioId", "invariantFamilies"]), path, errors);
                if (!nonEmpty(source.scenarioId)) errors.push(`${path}.scenarioId: required`);
            } else {
                errors.push(`${path}.kind: unsupported source kind`);
            }
        });
    }

    if (!Array.isArray(value.currentReds)) {
        errors.push("plan.currentReds: expected an array");
    } else {
        const findingIds = new Set();
        value.currentReds.forEach((finding, index) => {
            const path = `plan.currentReds[${index}]`;
            allowedKeys(finding, new Set(["findingId", "invariantFamily", "summary", "status", "ownerWave", "evidencePath"]), path, errors);
            if (!isPlainObject(finding)) return;
            if (!nonEmpty(finding.findingId) || findingIds.has(finding.findingId)) errors.push(`${path}.findingId: required and unique`);
            findingIds.add(finding.findingId);
            if (knownRouteFamilies && !knownRouteFamilies.has(finding.invariantFamily)) errors.push(`${path}.invariantFamily: must exist in anchored taxonomy`);
            if (finding.status !== "ROUTED_RED") errors.push(`${path}.status: routed findings remain ROUTED_RED`);
            if (!/^BI\.W-P(?:00[1-9]|0[1-9][0-9]|1[0-2][0-9]|13[0-3])$/.test(finding.ownerWave ?? "")) errors.push(`${path}.ownerWave: expected exactly one future owner`);
            if (!nonEmpty(finding.summary) || !nonEmpty(finding.evidencePath)) errors.push(`${path}: summary and evidencePath are required`);
            if (finding.evidencePath !== "docs/tranches/BI/BOOTSTRAP.json") errors.push(`${path}.evidencePath: must be the canonical bootstrap receipt`);
        });
    }

    allowedKeys(value.summary, new Set(["normalTestFiles", "browserScenarioFiles", "assertionSites", "externalScenarios"]), "plan.summary", errors);
    if (isPlainObject(value.summary)) {
        for (const key of ["normalTestFiles", "browserScenarioFiles", "assertionSites", "externalScenarios"]) {
            if (!Number.isInteger(value.summary[key]) || value.summary[key] < 0) errors.push(`plan.summary.${key}: expected a nonnegative integer`);
        }
    }
    findExecutableIdentity(value, "plan", errors);
    return { ok: errors.length === 0, errors };
}

export async function discoverEvidencePlan({
    root = process.cwd(),
    waveId,
    profile = "local",
    authority = "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS",
    invariantFamilies,
    knownInvariantFamilies = null,
    currentReds = [],
    files = null,
    readSource = null,
} = {}) {
    const selected = invariantFamilies.map((family) => typeof family === "string" ? family : family.id);
    const knownFamilies = new Set(selected);
    const knownRouteFamilies = new Set(knownInvariantFamilies ?? selected);
    const repositoryFiles = files ?? await discoverRepositoryFiles(root);
    const sources = [];

    for (const path of repositoryFiles) {
        if (!TEST_FILE.test(path) && !SCENARIO_FILE.test(path)) continue;
        const bytes = readSource ? await readSource(path) : await readFile(resolve(root, path));
        const source = bytes.toString("utf8");
        if (TEST_FILE.test(path)) {
            const retiredIdentities = discoverRetiredTestIdentities(source, path);
            if (retiredIdentities.length > 0) throw new Error(`${path}: ordinary test titles revive retired proof/gate identities (${retiredIdentities.map((finding) => `${finding.title}@${finding.line}:${finding.column}`).join(", ")})`);
            const assertions = discoverAssertionSites(source, path);
            if (assertions.length === 0) continue;
            const annotations = discoverInvariantAnnotations(source).filter((family) => knownFamilies.has(family));
            sources.push({
                kind: BROWSER_TEST_FILE.test(path) ? "browser-scenario" : "normal-test",
                path,
                sha256: sha256(bytes),
                assertions,
                invariantFamilies: annotations,
                ...(BROWSER_TEST_FILE.test(path) ? { currentProductPiCredit: false } : {}),
            });
            continue;
        }

        let scenario;
        try {
            scenario = JSON.parse(source);
        } catch (error) {
            throw new Error(`${path}: invalid external scenario JSON: ${error.message}`);
        }
        const validation = validateExternalScenario(scenario, knownFamilies);
        if (!validation.ok) throw new Error(`${path}: invalid external scenario:\n${validation.errors.join("\n")}`);
        if (scenario.ownerWave !== waveId) continue;
        sources.push({
            kind: "external-scenario",
            path,
            sha256: sha256(bytes),
            scenarioId: scenario.scenarioId,
            invariantFamilies: [...scenario.invariantFamilies].sort(comparePaths),
        });
    }

    sources.sort((a, b) => comparePaths(a.path, b.path));
    const plan = {
        schemaVersion: "1.0.0",
        waveId,
        profile,
        authority,
        invariantFamilies: selected,
        sources,
        currentReds,
        summary: {
            normalTestFiles: sources.filter((source) => source.kind === "normal-test").length,
            browserScenarioFiles: sources.filter((source) => source.kind === "browser-scenario").length,
            assertionSites: sources.filter((source) => source.kind === "normal-test" || source.kind === "browser-scenario").reduce((sum, source) => sum + source.assertions.length, 0),
            externalScenarios: sources.filter((source) => source.kind === "external-scenario").length,
        },
    };
    const validation = validateEvidencePlan(plan, knownFamilies, knownRouteFamilies);
    if (!validation.ok) throw new Error(validation.errors.join("\n"));
    return plan;
}
