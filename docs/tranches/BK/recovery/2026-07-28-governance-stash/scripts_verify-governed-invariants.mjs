#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
    existsSync,
    readFileSync,
    readdirSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { parse as parseSfc } from "@vue/compiler-sfc";
import ts from "typescript";

export const C19_ROSTER_PATH =
    "docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json";
export const C19_ROSTER_SHA256 =
    "dc05df9124024d721ce3a69dca297c237c965fa31921fbae6e0e46bb72257b52";
export const GOVERNED_BINDING_PATH =
    "tests/governance/governedInvariant.ts";
export const GOVERNED_GLOBAL_SETUP_PATH = "vitest.governed-setup.mjs";
export const GOVERNED_VERIFIER_PATH = "scripts/verify-governed-invariants.mjs";

const POSIX = (value) => value.split(sep).join("/");
const sha256 = (value) =>
    createHash("sha256").update(value).digest("hex");
const stableJson = (value) => JSON.stringify(value);

export class GovernedRosterError extends Error {
    constructor(violations) {
        super(
            `P-EX1 governed semantic preflight failed (${violations.length})\n${violations
                .map((violation, index) => `${index + 1}. ${violation}`)
                .join("\n")}`,
        );
        this.name = "GovernedRosterError";
        this.violations = violations;
    }
}

const listTree = (root, current, read, exists) => {
    const absolute = resolve(root, current);
    if (!exists(current)) return [];
    return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
        const child = POSIX(join(current, entry.name));
        return entry.isDirectory()
            ? listTree(root, child, read, exists)
            : [child];
    });
};

const parseJson = (text, label, violations) => {
    try {
        return JSON.parse(text);
    } catch (error) {
        violations.push(`${label} is not valid JSON: ${error.message}`);
        return null;
    }
};

const propertyName = (property) => {
    if (
        ts.isIdentifier(property.name) ||
        ts.isStringLiteral(property.name) ||
        ts.isNumericLiteral(property.name)
    ) {
        return property.name.text;
    }
    return null;
};

const literalString = (node) =>
    ts.isStringLiteral(node) ? node.text : null;

const parseStringArray = (node) => {
    if (!ts.isArrayLiteralExpression(node)) return null;
    const values = node.elements.map(literalString);
    return values.every((value) => value !== null) ? values : null;
};

const parseObject = (node, violations, label) => {
    if (!ts.isObjectLiteralExpression(node)) {
        violations.push(`${label} must be an object literal`);
        return null;
    }
    const entries = new Map();
    for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) {
            violations.push(`${label} must use direct property assignments only`);
            continue;
        }
        const name = propertyName(property);
        if (name === null) {
            violations.push(`${label} contains an unresolved computed property`);
            continue;
        }
        if (entries.has(name)) {
            violations.push(`${label} duplicates property ${name}`);
        }
        entries.set(name, property.initializer);
    }
    return entries;
};

const parseCaseIdentity = (node, violations, label) => {
    const object = parseObject(node, violations, label);
    if (!object) return null;
    const allowed = new Set(["count", "keys", "orderedKeysSha256"]);
    for (const key of object.keys()) {
        if (!allowed.has(key)) violations.push(`${label} has unknown property ${key}`);
    }
    const result = {};
    if (object.has("count")) {
        const value = object.get("count");
        if (!ts.isNumericLiteral(value)) {
            violations.push(`${label}.count must be a numeric literal`);
        } else {
            result.count = Number(value.text);
        }
    }
    if (object.has("keys")) {
        const keys = parseStringArray(object.get("keys"));
        if (!keys) violations.push(`${label}.keys must be a literal string array`);
        else result.keys = keys;
    }
    if (object.has("orderedKeysSha256")) {
        const digest = literalString(object.get("orderedKeysSha256"));
        if (digest === null) {
            violations.push(`${label}.orderedKeysSha256 must be a string literal`);
        } else {
            result.orderedKeysSha256 = digest;
        }
    }
    return result;
};

const resolveImport = (specifier, sourcePath, root) => {
    const result = ts.resolveModuleName(
        specifier,
        resolve(root, sourcePath),
        {
            module: ts.ModuleKind.ESNext,
            moduleResolution: ts.ModuleResolutionKind.Bundler,
            allowImportingTsExtensions: true,
        },
        ts.sys,
    ).resolvedModule?.resolvedFileName;
    return result ? POSIX(relative(root, result.replace(/\.d\.ts$/, ".ts"))) : null;
};

const disabledExpression = (expression) => {
    if (ts.isPropertyAccessExpression(expression)) {
        const mode = expression.name.text;
        if (["skip", "todo", "only", "fails", "skipIf", "runIf"].includes(mode)) {
            return expression.getText();
        }
    }
    return null;
};

const disabledObjectOption = (call) => {
    for (const argument of call.arguments) {
        if (!ts.isObjectLiteralExpression(argument)) continue;
        for (const property of argument.properties) {
            if (!ts.isPropertyAssignment(property)) continue;
            const name = propertyName(property);
            if (!["skip", "todo", "only", "fails"].includes(name)) continue;
            if (property.initializer.kind !== ts.SyntaxKind.FalseKeyword) return name;
        }
    }
    return null;
};

const sourceUnits = (path, text, violations) => {
    if (!path.endsWith(".vue")) {
        return [
            ts.createSourceFile(
                path,
                text,
                ts.ScriptTarget.Latest,
                true,
                path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
            ),
        ];
    }
    const parsed = parseSfc(text, { filename: path });
    for (const error of parsed.errors) violations.push(`${path}: ${String(error)}`);
    return [parsed.descriptor.script, parsed.descriptor.scriptSetup]
        .filter(Boolean)
        .map((block, index) =>
            ts.createSourceFile(
                `${path}#script${index}`,
                block.content,
                ts.ScriptTarget.Latest,
                true,
                block.lang === "tsx" ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
            ),
        );
};

const scanRegistrations = (root, paths, read, violations) => {
    const registrations = [];
    for (const path of paths) {
        const text = read(path);
        if (text === null) continue;
        for (const sourceFile of sourceUnits(path, text, violations)) {
            const governedLocals = new Set();
            const wrongLocals = new Set();
            for (const statement of sourceFile.statements) {
                if (!ts.isImportDeclaration(statement)) continue;
                if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;
                const clause = statement.importClause;
                if (!clause || clause.isTypeOnly || !clause.namedBindings) continue;
                if (!ts.isNamedImports(clause.namedBindings)) continue;
                const resolved = resolveImport(statement.moduleSpecifier.text, path, root);
                for (const element of clause.namedBindings.elements) {
                    if (element.isTypeOnly) continue;
                    const imported = element.propertyName?.text ?? element.name.text;
                    if (imported !== "governedInvariant") continue;
                    if (resolved === GOVERNED_BINDING_PATH) governedLocals.add(element.name.text);
                    else wrongLocals.add(element.name.text);
                }
            }

            const visit = (node) => {
                if (ts.isCallExpression(node)) {
                    const isDirect = ts.isIdentifier(node.expression);
                    const isEach =
                        ts.isPropertyAccessExpression(node.expression) &&
                        node.expression.name.text === "each" &&
                        ts.isIdentifier(node.expression.expression);
                    const local = isDirect
                        ? node.expression.text
                        : isEach
                          ? node.expression.expression.text
                          : null;
                    if (local === null) {
                        ts.forEachChild(node, visit);
                        return;
                    }
                    if (wrongLocals.has(local)) {
                        violations.push(
                            `${path}: ${local} resolves from a non-governed module`,
                        );
                    }
                    if (governedLocals.has(local)) {
                        const label = `${path}:${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
                        const expectedArguments = isEach ? 5 : 4;
                        if (node.arguments.length !== expectedArguments) {
                            violations.push(`${label} governedInvariant${isEach ? ".each" : ""} requires exactly ${expectedArguments} arguments`);
                        }
                        const id = node.arguments[0]
                            ? literalString(node.arguments[0])
                            : null;
                        if (id === null) {
                            violations.push(`${label} governed ID must be a string literal`);
                        }
                        const metadataNode = node.arguments[1];
                        const metadata = metadataNode
                            ? parseObject(metadataNode, violations, `${label} metadata`)
                            : null;
                        let semanticClass = null;
                        let mode = null;
                        let caseIdentity = null;
                        if (metadata) {
                            const allowed = new Set(["semanticClass", "mode", "caseIdentity"]);
                            for (const key of metadata.keys()) {
                                if (!allowed.has(key)) {
                                    violations.push(`${label} metadata has unknown property ${key}`);
                                }
                            }
                            semanticClass = metadata.has("semanticClass")
                                ? literalString(metadata.get("semanticClass"))
                                : null;
                            mode = metadata.has("mode")
                                ? literalString(metadata.get("mode"))
                                : null;
                            if (metadata.has("caseIdentity")) {
                                caseIdentity = parseCaseIdentity(
                                    metadata.get("caseIdentity"),
                                    violations,
                                    `${label} caseIdentity`,
                                );
                            }
                        }
                        const titleIndex = isEach ? 3 : 2;
                        const handlerIndex = isEach ? 4 : 3;
                        const title = node.arguments[titleIndex]
                            ? literalString(node.arguments[titleIndex])
                            : null;
                        if (title === null) {
                            violations.push(`${label} title must be a string literal`);
                        }
                        if (!node.arguments[handlerIndex] || !ts.isFunctionLike(node.arguments[handlerIndex])) {
                            violations.push(`${label} handler must be an inline function`);
                        }

                        let ancestor = node.parent;
                        while (ancestor) {
                            if (ts.isCallExpression(ancestor)) {
                                const disabled = disabledExpression(ancestor.expression);
                                const option = disabledObjectOption(ancestor);
                                if (disabled || option) {
                                    violations.push(
                                        `${label} is beneath disabled/exclusive registration ${disabled ?? option}`,
                                    );
                                    break;
                                }
                            }
                            ancestor = ancestor.parent;
                        }
                        registrations.push({
                            id,
                            path,
                            semanticClass,
                            mode,
                            caseIdentity,
                            title,
                            label,
                        });
                    }
                }
                ts.forEachChild(node, visit);
            };
            visit(sourceFile);
        }
    }
    return registrations;
};

const digestIds = (rows, semanticClass) =>
    sha256(stableJson(rows.filter((row) => row.semanticClass === semanticClass).map((row) => row.id)));

const sameJson = (left, right) => stableJson(left) === stableJson(right);

const verifyParserDependencies = (pkg, lock, violations) => {
    const expected = {
        typescript: "^6.0.3",
        "@vue/compiler-sfc": "^3.5.40",
        postcss: "^8.5.19",
    };
    for (const [name, range] of Object.entries(expected)) {
        if (pkg.devDependencies?.[name] !== range) {
            violations.push(`package.json must declare direct devDependency ${name}@${range}`);
        }
        if (lock.packages?.[""]?.devDependencies?.[name] !== range) {
            violations.push(`package-lock root must declare direct devDependency ${name}@${range}`);
        }
        if (!lock.packages?.[`node_modules/${name}`]?.version) {
            violations.push(`package-lock must resolve node_modules/${name}`);
        }
    }
    const vue = lock.packages?.["node_modules/vue"]?.version;
    const compiler = lock.packages?.["node_modules/@vue/compiler-sfc"]?.version;
    if (!vue || !compiler || vue !== compiler) {
        violations.push(`clean-lock Vue/compiler-sfc versions must match (vue=${vue}, compiler=${compiler})`);
    }
};

const verifyEnrollment = (pkg, vitestConfig, globalSetup, violations) => {
    const exact = "npm run verify:governed &&";
    for (const script of ["test", "iter-test", "iter-test-watch"]) {
        if (!pkg.scripts?.[script]?.includes(exact)) {
            violations.push(`package.json#scripts.${script} must run verify:governed first`);
        }
    }
    if (pkg.scripts?.["verify:governed"] !== `node ${GOVERNED_VERIFIER_PATH}`) {
        violations.push("package.json#scripts.verify:governed must name the canonical verifier");
    }
    if (!vitestConfig.includes(GOVERNED_GLOBAL_SETUP_PATH)) {
        violations.push("vitest.config.ts must enroll the governed global setup");
    }
    if (
        !globalSetup.includes(GOVERNED_VERIFIER_PATH) ||
        !globalSetup.includes("onTestsRerun") ||
        !globalSetup.includes("verifyGovernedRoster")
    ) {
        violations.push("governed global setup must call the canonical verifier initially and on rerun");
    }
};

const verifyExternalEdges = (root, roster, read, exists, violations) => {
    for (const row of roster.externalEnforcement) {
        if (!exists(row.sourcePath)) {
            violations.push(`${row.id} sourcePath is missing: ${row.sourcePath}`);
        }
        for (const edge of row.enrollment) {
            const [path, fragment] = edge.split("#");
            if (!exists(path)) {
                violations.push(`${row.id} enrollment file is missing: ${path}`);
                continue;
            }
            if (!fragment) continue;
            const text = read(path);
            if (path.endsWith("package.json") && fragment.startsWith("scripts.")) {
                const json = parseJson(text, path, violations);
                const key = fragment.slice("scripts.".length);
                if (!json?.scripts?.[key]) {
                    violations.push(`${row.id} enrollment script is missing: ${edge}`);
                }
            } else if (!text.includes(fragment)) {
                violations.push(`${row.id} enrollment anchor is missing: ${edge}`);
            }
        }
    }
};

/**
 * Verify the exact C19 roster and its one canonical source binding.
 * Overrides/missingPaths exist solely for the detector mutation suite; the CLI
 * always reads the physical repository.
 */
export function verifyGovernedRoster(options = {}) {
    const root = resolve(options.root ?? process.cwd());
    const overrides = options.overrides ?? new Map();
    const missingPaths = options.missingPaths ?? new Set();
    const violations = [];
    const read = (path) => {
        const rel = POSIX(path);
        if (missingPaths.has(rel)) return null;
        if (overrides.has(rel)) return overrides.get(rel);
        const absolute = resolve(root, rel);
        return existsSync(absolute) ? readFileSync(absolute, "utf8") : null;
    };
    const exists = (path) => {
        const rel = POSIX(path);
        if (missingPaths.has(rel)) return false;
        if (overrides.has(rel)) return true;
        return existsSync(resolve(root, rel));
    };

    for (const required of [
        C19_ROSTER_PATH,
        GOVERNED_BINDING_PATH,
        GOVERNED_VERIFIER_PATH,
        GOVERNED_GLOBAL_SETUP_PATH,
        "package.json",
        "package-lock.json",
        "vitest.config.ts",
    ]) {
        if (!exists(required) || missingPaths.has(required)) {
            violations.push(`required governed path is missing: ${required}`);
        }
    }

    const rosterText = read(C19_ROSTER_PATH);
    const expectedRosterSha = options.expectedRosterSha256 ?? C19_ROSTER_SHA256;
    if (rosterText !== null && sha256(rosterText) !== expectedRosterSha) {
        violations.push(
            `C19 roster digest mismatch: expected ${expectedRosterSha}, got ${sha256(rosterText)}`,
        );
    }
    const roster = rosterText ? parseJson(rosterText, C19_ROSTER_PATH, violations) : null;
    const pkg = parseJson(read("package.json") ?? "", "package.json", violations);
    const lock = parseJson(read("package-lock.json") ?? "", "package-lock.json", violations);
    if (!roster || !pkg || !lock) throw new GovernedRosterError(violations);

    if (roster.authority?.canonicalBinding !== "governedInvariant") {
        violations.push("roster canonicalBinding must be governedInvariant");
    }
    if (roster.authority?.mode !== "enabled") {
        violations.push("roster authority mode must be enabled");
    }
    const partitions = [
        ...roster.activeVitest,
        ...roster.reservedVitest,
        ...roster.externalEnforcement,
    ];
    const ids = partitions.map((row) => row.id);
    if (new Set(ids).size !== ids.length) violations.push("roster IDs are not globally unique");
    const hard = roster.reservedVitest.filter((row) => row.reservation === "hard").length;
    const conditional = roster.reservedVitest.filter((row) => row.reservation === "conditional").length;
    const worstCase = roster.activeVitest.length + hard + conditional;
    if (worstCase > roster.authority.maximumCountedSeats) {
        violations.push(
            `active + reserved ceiling exceeded: ${worstCase} > ${roster.authority.maximumCountedSeats}`,
        );
    }
    const recomputedCounts = {
        activeVitest: roster.activeVitest.length,
        hardReservedVitest: hard,
        conditionalReservedVitest: conditional,
        worstCaseCountedSeats: worstCase,
        remainingSeats: roster.authority.maximumCountedSeats - worstCase,
        externalEnforcement: roster.externalEnforcement.length,
        baseProductTooling: roster.activeVitest.filter((row) => row.semanticClass === "base-product-tooling").length,
        componentBehavior: roster.activeVitest.filter((row) => row.semanticClass === "component-behavior").length,
        preBindingDetectorRedress: roster.activeVitest.filter((row) => row.requiredDetectorRedress?.phase === "pre-binding").length,
    };
    if (!sameJson(recomputedCounts, roster.counts)) {
        violations.push(`roster count object is stale: ${stableJson(recomputedCounts)}`);
    }
    for (const semanticClass of ["base-product-tooling", "component-behavior"]) {
        const actual = digestIds(roster.activeVitest, semanticClass);
        const expected = roster.machineLaw.activeSemanticClassIdDigests[semanticClass];
        if (actual !== expected) {
            violations.push(`${semanticClass} ordered ID digest mismatch: ${actual}`);
        }
    }

    const physical = ["tests", "scripts"].flatMap((dir) =>
        exists(dir) ? listTree(root, dir, read, exists) : [],
    );
    const candidates = new Set(
        [...physical, ...overrides.keys()].filter((path) =>
            /(?:^|\/)(?:[^/]+\.)?(?:test|spec)\.(?:ts|tsx)$/.test(path) ||
            path.endsWith(".vue"),
        ),
    );
    for (const row of roster.activeVitest) candidates.add(row.sourcePath);
    const registrations = scanRegistrations(root, [...candidates].sort(), read, violations);
    const byId = new Map();
    for (const registration of registrations) {
        if (!registration.id) continue;
        const list = byId.get(registration.id) ?? [];
        list.push(registration);
        byId.set(registration.id, list);
        if (!roster.activeVitest.some((row) => row.id === registration.id)) {
            violations.push(`${registration.label} uses unrostered governed ID ${registration.id}`);
        }
    }
    for (const row of roster.activeVitest) {
        const list = byId.get(row.id) ?? [];
        if (list.length !== 1) {
            violations.push(`${row.id} must resolve exactly once; found ${list.length}`);
            continue;
        }
        const registration = list[0];
        if (registration.path !== row.sourcePath) {
            violations.push(`${row.id} is in ${registration.path}, expected ${row.sourcePath}`);
        }
        if (registration.title !== row.currentRegistration) {
            violations.push(`${row.id} title does not match the frozen registration`);
        }
        if (registration.semanticClass !== row.semanticClass) {
            violations.push(`${row.id} semanticClass does not match ${row.semanticClass}`);
        }
        if (registration.mode !== "enabled") {
            violations.push(`${row.id} mode must be the literal enabled`);
        }
        const expectedCase = row.requiredCaseIdentity ?? null;
        if (!sameJson(registration.caseIdentity, expectedCase)) {
            violations.push(
                `${row.id} caseIdentity mismatch: expected ${stableJson(expectedCase)}, got ${stableJson(registration.caseIdentity)}`,
            );
        }
        if (!/^(?:tests|scripts)\/.+\.(?:test|spec)\.(?:ts|tsx)$/.test(row.sourcePath)) {
            violations.push(`${row.id} declared path is outside the configured Vitest include`);
        }
    }

    verifyParserDependencies(pkg, lock, violations);
    verifyEnrollment(
        pkg,
        read("vitest.config.ts") ?? "",
        read(GOVERNED_GLOBAL_SETUP_PATH) ?? "",
        violations,
    );
    verifyExternalEdges(root, roster, read, exists, violations);

    if (violations.length > 0) throw new GovernedRosterError(violations);
    return {
        rosterSha256: sha256(rosterText),
        active: roster.activeVitest.length,
        reserved: hard + conditional,
        worstCase,
        remaining: roster.authority.maximumCountedSeats - worstCase,
        external: roster.externalEnforcement.length,
        registrations: registrations.length,
    };
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
    try {
        const result = verifyGovernedRoster({ root: process.cwd() });
        process.stdout.write(`${JSON.stringify(result)}\n`);
    } catch (error) {
        process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
        process.exitCode = 1;
    }
}
