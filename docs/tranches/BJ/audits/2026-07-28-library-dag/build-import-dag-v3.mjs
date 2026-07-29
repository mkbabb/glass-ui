import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
    existsSync,
    realpathSync,
    readFileSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import {
    basename,
    dirname,
    extname,
    isAbsolute,
    join,
    relative,
    resolve,
    sep,
} from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse as parseTemplate } from "@vue/compiler-dom";
import { parse as parseSfc } from "@vue/compiler-sfc";
import postcss from "postcss";
import ts from "typescript";

const defaultRepositoryRoot = resolve(import.meta.dirname, "../../../../..");
const defaultOutputDirectory = import.meta.dirname;
const importedExtensions = [
    ".ts",
    ".tsx",
    ".mts",
    ".cts",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".vue",
    ".css",
    ".json",
    ".md",
    ".txt",
    ".html",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".woff",
    ".woff2",
];
const scriptExtensions = new Set([
    ".ts",
    ".tsx",
    ".mts",
    ".cts",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
]);
const binaryExtensions = new Set([
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".avif",
    ".ico",
    ".pdf",
    ".tar",
    ".gz",
    ".zip",
]);
const declarationPattern = /\.d\.(?:ts|mts|cts)$/;
const localSpecifierPattern = /^(?:\.{1,2}\/|\/|@glass(?:\/|$))/;
const templateAssetAttributes = new Map([
    ["audio", new Set(["src"])],
    ["embed", new Set(["src"])],
    ["image", new Set(["href", "xlink:href"])],
    ["img", new Set(["src", "srcset"])],
    ["input", new Set(["src"])],
    ["link", new Set(["href"])],
    ["object", new Set(["data"])],
    ["source", new Set(["src", "srcset"])],
    ["track", new Set(["src"])],
    ["use", new Set(["href", "xlink:href"])],
    ["video", new Set(["poster", "src"])],
]);
const fsReadNames = new Set([
    "createReadStream",
    "readFile",
    "readFileSync",
    "readdir",
    "readdirSync",
    "stat",
    "statSync",
]);
const fsWriteNames = new Set([
    "appendFile",
    "appendFileSync",
    "createWriteStream",
    "mkdir",
    "mkdirSync",
    "writeFile",
    "writeFileSync",
]);
const fsCopyNames = new Set(["copyFile", "copyFileSync", "cp", "cpSync"]);
const processExecutionNames = new Set([
    "exec",
    "execFile",
    "execFileSync",
    "execSync",
    "spawn",
    "spawnSync",
]);

function portable(path) {
    return path.split(sep).join("/");
}

function digest(value) {
    return createHash("sha256").update(value).digest("hex");
}

function offsetLocation(location, origin = null) {
    if (!location || location.line === null || location.line === undefined) {
        return { line: null, column: null };
    }
    if (!origin) {
        return {
            line: location.line,
            column: location.column ?? null,
        };
    }
    return {
        line: origin.line + location.line - 1,
        column:
            location.line === 1 && location.column !== null && location.column !== undefined
                ? origin.column + location.column - 1
                : location.column ?? null,
    };
}

function gitRepositoryVisibility(repositoryRoot) {
    let output;
    try {
        output = execFileSync(
            "git",
            [
                "-C",
                repositoryRoot,
                "ls-files",
                "-co",
                "--exclude-standard",
                "-z",
            ],
            { encoding: "utf8" },
        );
    } catch (error) {
        throw new Error(
            `graph-v3: Git-aware repository census failed: ${error.stderr?.toString() || error.message}`,
        );
    }
    const files = new Set(
        output
            .split("\0")
            .filter(Boolean)
            .map(portable)
            .filter(
                (path) =>
                    path !== "node_modules" &&
                    !path.startsWith("node_modules/") &&
                    existsSync(join(repositoryRoot, path)) &&
                    !statSync(join(repositoryRoot, path)).isDirectory(),
            ),
    );
    const directories = new Set(["."]);
    for (const path of files) {
        let parent = portable(dirname(path));
        while (parent !== "." && parent !== "") {
            directories.add(parent);
            parent = portable(dirname(parent));
        }
    }
    return { files, directories };
}

function uniqueSorted(values) {
    return [...new Set(values)].sort();
}

function stableSortEdges(edges) {
    return edges.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.target ?? "").localeCompare(right.target ?? "") ||
            left.edgeKind.localeCompare(right.edgeKind) ||
            (left.specifier ?? "").localeCompare(right.specifier ?? "") ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0) ||
            JSON.stringify(left.metadata ?? {}).localeCompare(JSON.stringify(right.metadata ?? {})),
    );
}

function stripQuery(specifier) {
    return specifier.split(/[?#]/, 1)[0];
}

function scriptKind(path) {
    if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
    if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
    if (path.endsWith(".js") || path.endsWith(".mjs") || path.endsWith(".cjs")) {
        return ts.ScriptKind.JS;
    }
    return ts.ScriptKind.TS;
}

function isImportMeta(node) {
    return (
        (ts.isMetaProperty(node) &&
            node.keywordToken === ts.SyntaxKind.ImportKeyword &&
            node.name.text === "meta") ||
        (ts.isPropertyAccessExpression(node) &&
            node.name.text === "meta" &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword)
    );
}

function isImportMetaUrl(node) {
    return (
        ts.isPropertyAccessExpression(node) &&
        node.name.text === "url" &&
        isImportMeta(node.expression)
    );
}

function callName(expression) {
    if (ts.isIdentifier(expression)) return expression.text;
    if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
    return null;
}

function literalString(node) {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    return null;
}

function literalWithFallback(node) {
    const direct = literalString(node);
    if (direct !== null) return { value: direct, conditional: false };
    if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken
    ) {
        const fallback = literalString(node.right);
        if (fallback !== null) return { value: fallback, conditional: true };
    }
    return null;
}

function expressionText(node, sourceFile) {
    return node.getText(sourceFile).replace(/\s+/g, " ").slice(0, 240);
}

function staticPrimitive(node) {
    const string = literalString(node);
    if (string !== null) return string;
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isArrayLiteralExpression(node)) {
        const values = node.elements.map(staticPrimitive);
        return values.some((value) => value === undefined) ? undefined : values;
    }
    if (ts.isObjectLiteralExpression(node)) {
        const result = {};
        for (const property of node.properties) {
            if (!ts.isPropertyAssignment(property)) return undefined;
            const name = property.name && (property.name.text ?? literalString(property.name));
            const value = staticPrimitive(property.initializer);
            if (typeof name !== "string" || value === undefined) return undefined;
            result[name] = value;
        }
        return result;
    }
    return undefined;
}

function staticStringArray(node) {
    const single = literalString(node);
    if (single !== null) return [single];
    if (!ts.isArrayLiteralExpression(node)) return null;
    const values = node.elements.map(literalString);
    return values.some((value) => value === null) ? null : values;
}

function importedSymbolMetadata(clause) {
    if (!clause) return [{ name: "*side-effect*", typeOnly: false }];
    const symbols = [];
    if (clause.name) symbols.push({ name: "default", local: clause.name.text, typeOnly: clause.isTypeOnly });
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
        symbols.push({
            name: "*",
            local: clause.namedBindings.name.text,
            typeOnly: clause.isTypeOnly,
        });
    }
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const element of clause.namedBindings.elements) {
            symbols.push({
                name: element.propertyName?.text ?? element.name.text,
                local: element.name.text,
                typeOnly: clause.isTypeOnly || element.isTypeOnly,
            });
        }
    }
    return symbols;
}

const childProcessModules = new Set(["child_process", "node:child_process"]);
const nodeModuleModules = new Set(["module", "node:module"]);

function createBindingResolver(sourceFile) {
    const scopeByNode = new Map();
    const rootScope = { parent: null, bindings: new Map() };

    const directImportProvenance = (moduleName, imported) => {
        if (childProcessModules.has(moduleName) && processExecutionNames.has(imported)) {
            return { kind: "module-member", moduleName, member: imported };
        }
        if (nodeModuleModules.has(moduleName) && imported === "createRequire") {
            return { kind: "create-require-factory", moduleName };
        }
        return { kind: "local" };
    };
    const registerPattern = (
        name,
        scope,
        initializer,
        propertyPath = [],
        iterate = false,
    ) => {
        if (ts.isIdentifier(name)) {
            scope.bindings.set(name.text, {
                kind: "variable",
                initializer,
                propertyPath,
                iterate,
                scope,
            });
            return;
        }
        if (ts.isObjectBindingPattern(name)) {
            for (const element of name.elements) {
                if (element.dotDotDotToken) {
                    registerPattern(element.name, scope, null);
                    continue;
                }
                const property =
                    element.propertyName && (element.propertyName.text ?? literalString(element.propertyName));
                const shorthand = ts.isIdentifier(element.name) ? element.name.text : null;
                registerPattern(
                    element.name,
                    scope,
                    initializer,
                    [...propertyPath, property ?? shorthand],
                    iterate,
                );
            }
            return;
        }
        for (const [index, element] of name.elements.entries()) {
            if (ts.isBindingElement(element)) {
                registerPattern(
                    element.name,
                    scope,
                    initializer,
                    [...propertyPath, index],
                    iterate,
                );
            }
        }
    };
    const createsScope = (node) =>
        ts.isFunctionLike(node) ||
        ts.isBlock(node) ||
        ts.isModuleBlock(node) ||
        ts.isCatchClause(node);

    function walk(node, parentScope) {
        if (ts.isFunctionDeclaration(node) && node.name) {
            parentScope.bindings.set(node.name.text, { kind: "local" });
        } else if (ts.isClassDeclaration(node) && node.name) {
            parentScope.bindings.set(node.name.text, { kind: "local" });
        }
        const scope =
            node !== sourceFile && createsScope(node)
                ? { parent: parentScope, bindings: new Map() }
                : parentScope;
        scopeByNode.set(node, scope);

        if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier)) {
            const moduleName = node.moduleSpecifier.text;
            const clause = node.importClause;
            if (clause && !clause.isTypeOnly) {
                if (clause.name) {
                    scope.bindings.set(
                        clause.name.text,
                        childProcessModules.has(moduleName) || nodeModuleModules.has(moduleName)
                            ? { kind: "module", moduleName }
                            : { kind: "local" },
                    );
                }
                if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
                    scope.bindings.set(clause.namedBindings.name.text, {
                        kind: "module",
                        moduleName,
                    });
                } else if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
                    for (const element of clause.namedBindings.elements) {
                        if (element.isTypeOnly) continue;
                        scope.bindings.set(
                            element.name.text,
                            directImportProvenance(
                                moduleName,
                                element.propertyName?.text ?? element.name.text,
                            ),
                        );
                    }
                }
            }
        } else if (ts.isVariableDeclaration(node)) {
            const forOf =
                ts.isVariableDeclarationList(node.parent) &&
                ts.isForOfStatement(node.parent.parent)
                    ? node.parent.parent
                    : null;
            registerPattern(
                node.name,
                scope,
                node.initializer ?? forOf?.expression ?? null,
                [],
                Boolean(forOf && !node.initializer),
            );
        } else if (ts.isParameter(node)) {
            registerPattern(node.name, scope, null);
        } else if (
            (ts.isFunctionExpression(node) || ts.isClassExpression(node)) &&
            node.name
        ) {
            scope.bindings.set(node.name.text, { kind: "local" });
        }
        ts.forEachChild(node, (child) => walk(child, scope));
    }
    walk(sourceFile, rootScope);

    const lookup = (name, node) => {
        let scope = scopeByNode.get(node) ?? rootScope;
        while (scope) {
            if (scope.bindings.has(name)) return scope.bindings.get(name);
            scope = scope.parent;
        }
        return null;
    };
    const member = (base, name) => {
        if (base.kind === "module") {
            return directImportProvenance(base.moduleName, name);
        }
        if (base.kind === "require-loader" && name === "resolve") {
            return { kind: "require-resolve", loader: base.loader };
        }
        return { kind: "local" };
    };
    const resolveRecord = (record, seen) => {
        if (!record || record.kind !== "variable") return record ?? { kind: "local" };
        if (!record.initializer || seen.has(record)) return { kind: "local" };
        seen.add(record);
        let resolved = resolveExpression(record.initializer, record.initializer, seen);
        for (const property of record.propertyPath) {
            if (!property) return { kind: "local" };
            resolved = member(resolved, property);
        }
        return resolved;
    };
    function resolveExpression(node, useNode = node, seen = new Set()) {
        if (!node) return { kind: "local" };
        if (
            ts.isParenthesizedExpression(node) ||
            ts.isAsExpression(node) ||
            ts.isSatisfiesExpression(node) ||
            ts.isNonNullExpression(node)
        ) {
            return resolveExpression(node.expression, useNode, seen);
        }
        if (ts.isIdentifier(node)) {
            const record = lookup(node.text, useNode);
            if (record) return resolveRecord(record, seen);
            return node.text === "require"
                ? { kind: "require-loader", loader: "require" }
                : { kind: "local" };
        }
        if (ts.isPropertyAccessExpression(node)) {
            return member(resolveExpression(node.expression, useNode, seen), node.name.text);
        }
        if (ts.isElementAccessExpression(node)) {
            const property = node.argumentExpression && literalString(node.argumentExpression);
            return property
                ? member(resolveExpression(node.expression, useNode, seen), property)
                : { kind: "local" };
        }
        if (ts.isCallExpression(node)) {
            const callee = resolveExpression(node.expression, useNode, seen);
            if (callee.kind === "create-require-factory") {
                return { kind: "require-loader", loader: "createRequire" };
            }
            if (callee.kind === "require-loader") {
                const moduleName = node.arguments[0] && literalString(node.arguments[0]);
                if (moduleName && (childProcessModules.has(moduleName) || nodeModuleModules.has(moduleName))) {
                    return { kind: "module", moduleName };
                }
            }
        }
        return { kind: "local" };
    }
    return { lookup, resolveExpression };
}

function createStaticSpecifierResolver(sourceFile, bindingResolver) {
    const unknown = { kind: "unknown" };
    const strings = (values) => ({
        kind: "strings",
        values: uniqueSorted(values),
    });
    const merge = (values) => {
        const known = values.filter(({ kind }) => kind !== "unknown");
        if (known.length !== values.length || known.length === 0) return unknown;
        if (known.every(({ kind }) => kind === "strings")) {
            return strings(known.flatMap(({ values: items }) => items));
        }
        if (known.every(({ kind }) => kind === "array")) {
            const length = known[0].values.length;
            if (!known.every(({ values: items }) => items.length === length)) return unknown;
            return {
                kind: "array",
                values: Array.from({ length }, (_, index) =>
                    merge(known.map(({ values: items }) => items[index])),
                ),
            };
        }
        return unknown;
    };
    const elementOf = (value) =>
        value.kind === "array" ? merge(value.values) : unknown;
    const propertyOf = (value, property) => {
        if (value.kind === "array" && Number.isInteger(Number(property))) {
            return value.values[Number(property)] ?? unknown;
        }
        if (value.kind === "object") return value.values.get(String(property)) ?? unknown;
        return unknown;
    };
    const unwrap = (node) => {
        let current = node;
        while (
            ts.isParenthesizedExpression(current) ||
            ts.isAsExpression(current) ||
            ts.isTypeAssertionExpression(current) ||
            ts.isNonNullExpression(current) ||
            (ts.isSatisfiesExpression && ts.isSatisfiesExpression(current))
        ) {
            current = current.expression;
        }
        return current;
    };
    const evaluate = (input, useNode, seen = new Set()) => {
        if (!input) return unknown;
        const node = unwrap(input);
        const literal = literalString(node);
        if (literal !== null) return strings([literal]);
        if (ts.isArrayLiteralExpression(node)) {
            return {
                kind: "array",
                values: node.elements.map((element) => evaluate(element, useNode, seen)),
            };
        }
        if (ts.isObjectLiteralExpression(node)) {
            const values = new Map();
            for (const property of node.properties) {
                if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) {
                    return unknown;
                }
                const name = property.name && (property.name.text ?? literalString(property.name));
                if (typeof name !== "string") return unknown;
                values.set(
                    name,
                    ts.isPropertyAssignment(property)
                        ? evaluate(property.initializer, useNode, seen)
                        : evaluate(property.name, useNode, seen),
                );
            }
            return { kind: "object", values };
        }
        if (ts.isIdentifier(node)) {
            const record = bindingResolver.lookup(node.text, useNode);
            if (!record || record.kind !== "variable" || !record.initializer || seen.has(record)) {
                return unknown;
            }
            const nextSeen = new Set(seen).add(record);
            let value = evaluate(record.initializer, record.initializer, nextSeen);
            if (record.iterate) value = elementOf(value);
            for (const property of record.propertyPath) {
                value = propertyOf(value, property);
            }
            return value;
        }
        if (
            ts.isBinaryExpression(node) &&
            node.operatorToken.kind === ts.SyntaxKind.PlusToken
        ) {
            const left = evaluate(node.left, useNode, seen);
            const right = evaluate(node.right, useNode, seen);
            if (left.kind !== "strings" || right.kind !== "strings") return unknown;
            const combinations = [];
            for (const prefix of left.values) {
                for (const suffix of right.values) {
                    combinations.push(`${prefix}${suffix}`);
                    if (combinations.length > 64) return unknown;
                }
            }
            return strings(combinations);
        }
        if (ts.isTemplateExpression(node)) {
            let values = [node.head.text];
            for (const span of node.templateSpans) {
                const expression = evaluate(span.expression, useNode, seen);
                if (expression.kind !== "strings") return unknown;
                values = values.flatMap((prefix) =>
                    expression.values.map((value) => `${prefix}${value}${span.literal.text}`),
                );
                if (values.length > 64) return unknown;
            }
            return strings(values);
        }
        if (ts.isConditionalExpression(node)) {
            return merge([
                evaluate(node.whenTrue, useNode, seen),
                evaluate(node.whenFalse, useNode, seen),
            ]);
        }
        if (ts.isPropertyAccessExpression(node)) {
            return propertyOf(
                evaluate(node.expression, useNode, seen),
                node.name.text,
            );
        }
        if (ts.isElementAccessExpression(node)) {
            const property = node.argumentExpression && staticPrimitive(node.argumentExpression);
            return property === undefined
                ? unknown
                : propertyOf(evaluate(node.expression, useNode, seen), property);
        }
        if (ts.isCallExpression(node)) {
            if (
                ts.isPropertyAccessExpression(node.expression) &&
                ts.isIdentifier(node.expression.expression) &&
                node.expression.expression.text === "Object" &&
                ["entries", "values"].includes(node.expression.name.text)
            ) {
                const object = evaluate(node.arguments[0], useNode, seen);
                if (object.kind !== "object") return unknown;
                if (node.expression.name.text === "values") {
                    return { kind: "array", values: [...object.values.values()] };
                }
                return {
                    kind: "array",
                    values: [...object.values.entries()].map(([name, value]) => ({
                        kind: "array",
                        values: [strings([name]), value],
                    })),
                };
            }
            if (
                ts.isPropertyAccessExpression(node.expression) &&
                node.expression.name.text === "split"
            ) {
                const base = evaluate(node.expression.expression, useNode, seen);
                const separator = node.arguments[0] && literalString(node.arguments[0]);
                if (base.kind !== "strings" || separator === null) return unknown;
                return merge(
                    base.values.map((value) => ({
                        kind: "array",
                        values: value.split(separator).map((part) => strings([part])),
                    })),
                );
            }
        }
        return unknown;
    };
    const prefixKind = (input, useNode, seen = new Set()) => {
        if (!input) return "unknown";
        const node = unwrap(input);
        const value = literalString(node);
        if (value !== null) {
            if (localSpecifierPattern.test(value)) return "local";
            return "nonlocal";
        }
        if (
            ts.isBinaryExpression(node) &&
            node.operatorToken.kind === ts.SyntaxKind.PlusToken
        ) {
            return prefixKind(node.left, useNode, seen);
        }
        if (ts.isTemplateExpression(node)) {
            return node.head.text
                ? prefixKind(ts.factory.createStringLiteral(node.head.text), useNode, seen)
                : "unknown";
        }
        if (ts.isIdentifier(node)) {
            const record = bindingResolver.lookup(node.text, useNode);
            if (!record || record.kind !== "variable" || !record.initializer || seen.has(record)) {
                return "unknown";
            }
            return prefixKind(
                record.initializer,
                record.initializer,
                new Set(seen).add(record),
            );
        }
        return "unknown";
    };
    const resolve = (node, useNode = node) => {
        const value = evaluate(node, useNode);
        if (value.kind === "strings" && value.values.length > 0) {
            const kinds = uniqueSorted(
                value.values.map((specifier) =>
                    localSpecifierPattern.test(specifier) ? "local" : "nonlocal",
                ),
            );
            return {
                kind: kinds.length === 1 ? kinds[0] : "unknown",
                specifiers: value.values,
                provenance: "finite-static",
            };
        }
        return {
            kind: prefixKind(node, useNode),
            specifiers: null,
            provenance: "prefix-or-conservative",
        };
    };
    return { resolve };
}

export function extractScriptReferences(source, path = "fixture.ts", origin = null) {
    const sourceFile = ts.createSourceFile(
        path,
        source,
        ts.ScriptTarget.Latest,
        true,
        scriptKind(path),
    );
    const references = [];
    const nonliteralReferences = [];
    const bindingResolver = createBindingResolver(sourceFile);
    const specifierResolver = createStaticSpecifierResolver(
        sourceFile,
        bindingResolver,
    );
    const sourceLocation = (position) => {
        const local = sourceFile.getLineAndCharacterOfPosition(position);
        return offsetLocation(
            { line: local.line + 1, column: local.character + 1 },
            origin,
        );
    };
    const parseErrors = sourceFile.parseDiagnostics.map((diagnostic) => {
        const location =
            diagnostic.start === undefined
                ? {}
                : sourceLocation(diagnostic.start);
        return {
            source: path,
            ...location,
            message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        };
    });
    const add = (specifier, edgeKind, node, metadata = {}) => {
        const location = sourceLocation(node.getStart(sourceFile));
        references.push({
            specifier,
            edgeKind,
            ...location,
            metadata,
        });
    };
    const addNonliteral = (edgeKind, node, localHint = false) => {
        const location = sourceLocation(node.getStart(sourceFile));
        nonliteralReferences.push({
            source: path,
            edgeKind,
            expression: expressionText(node, sourceFile),
            ...location,
            localHint,
        });
    };

    function visit(node) {
        if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier)) {
            const symbols = importedSymbolMetadata(node.importClause);
            const runtimeSymbols = symbols.filter(({ typeOnly }) => !typeOnly);
            const typeSymbols = symbols.filter(({ typeOnly }) => typeOnly);
            if (runtimeSymbols.length > 0) {
                add(node.moduleSpecifier.text, "eager-runtime", node, {
                    symbols: runtimeSymbols,
                });
            }
            if (typeSymbols.length > 0 || node.importClause?.isTypeOnly) {
                add(node.moduleSpecifier.text, "type-only", node, {
                    symbols: typeSymbols.length > 0 ? typeSymbols : symbols,
                });
            }
        } else if (
            ts.isExportDeclaration(node) &&
            node.moduleSpecifier &&
            ts.isStringLiteralLike(node.moduleSpecifier)
        ) {
            const symbols = node.exportClause && ts.isNamedExports(node.exportClause)
                ? node.exportClause.elements.map((element) => ({
                    name: element.propertyName?.text ?? element.name.text,
                    exported: element.name.text,
                    typeOnly: node.isTypeOnly || element.isTypeOnly,
                }))
                : [{ name: "*", typeOnly: node.isTypeOnly }];
            add(node.moduleSpecifier.text, "export-from", node, {
                typeOnly: node.isTypeOnly || symbols.every(({ typeOnly }) => typeOnly),
                symbols,
            });
        } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
            const specifier = node.arguments[0] && literalString(node.arguments[0]);
            if (specifier !== null && specifier !== undefined) {
                add(specifier, "literal-dynamic", node);
            } else if (node.arguments[0]) {
                const resolved = specifierResolver.resolve(node.arguments[0], node);
                if (resolved.specifiers) {
                    for (const candidate of resolved.specifiers) {
                        add(candidate, "finite-dynamic", node, {
                            expression: expressionText(node.arguments[0], sourceFile),
                            provenance: resolved.provenance,
                        });
                    }
                } else {
                    addNonliteral(
                        "finite-dynamic",
                        node.arguments[0],
                        resolved.kind !== "nonlocal",
                    );
                }
            }
        } else if (
            ts.isCallExpression(node) &&
            bindingResolver.resolveExpression(node.expression, node).kind === "require-loader"
        ) {
            const loader = bindingResolver.resolveExpression(node.expression, node);
            const specifier = node.arguments[0] && literalString(node.arguments[0]);
            if (specifier !== null && specifier !== undefined) {
                add(specifier, "literal-require", node, {
                    binding: expressionText(node.expression, sourceFile),
                    loader: loader.loader,
                });
            } else if (node.arguments[0]) {
                const text = expressionText(node.arguments[0], sourceFile);
                addNonliteral(
                    "literal-require",
                    node.arguments[0],
                    localSpecifierPattern.test(text.replace(/^['"`]/, "")),
                );
            }
        } else if (
            ts.isCallExpression(node) &&
            bindingResolver.resolveExpression(node.expression, node).kind === "require-resolve"
        ) {
            const loader = bindingResolver.resolveExpression(node.expression, node);
            const specifier = node.arguments[0] && literalString(node.arguments[0]);
            if (specifier !== null && specifier !== undefined) {
                add(specifier, "require-resolve", node, {
                    binding: expressionText(node.expression, sourceFile),
                    loader: loader.loader,
                });
            } else if (node.arguments[0]) {
                const text = expressionText(node.arguments[0], sourceFile);
                addNonliteral(
                    "require-resolve",
                    node.arguments[0],
                    localSpecifierPattern.test(text.replace(/^['"`]/, "")),
                );
            }
        } else if (
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === "glob" &&
            isImportMeta(node.expression.expression)
        ) {
            const patterns = node.arguments[0] && staticStringArray(node.arguments[0]);
            const options = node.arguments[1] ? staticPrimitive(node.arguments[1]) : {};
            if (!patterns || options === undefined || typeof options !== "object" || Array.isArray(options)) {
                addNonliteral("vite-import-meta-glob", node, true);
            } else {
                const location = sourceLocation(node.getStart(sourceFile));
                references.push({
                    edgeKind: options.eager === true ? "glob-eager" : "glob-lazy",
                    patterns,
                    options: {
                        eager: options.eager === true,
                        import: options.import ?? null,
                        query: options.query ?? null,
                    },
                    ...location,
                    metadata: {},
                });
            }
        } else if (
            ts.isNewExpression(node) &&
            ts.isIdentifier(node.expression) &&
            ["Worker", "SharedWorker"].includes(node.expression.text)
        ) {
            const argument = node.arguments?.[0];
            if (argument && ts.isNewExpression(argument) && callName(argument.expression) === "URL") {
                const specifier = argument.arguments?.[0] && literalString(argument.arguments[0]);
                const base = argument.arguments?.[1];
                if (specifier !== null && specifier !== undefined && base && isImportMetaUrl(base)) {
                    add(specifier, "worker", node, {
                        workerType: node.expression.text,
                        options: node.arguments?.[1] ? staticPrimitive(node.arguments[1]) ?? null : null,
                    });
                } else {
                    addNonliteral("worker", node, true);
                }
            } else if (argument) {
                const specifier = literalString(argument);
                if (specifier !== null) {
                    add(specifier, "worker", node, { workerType: node.expression.text });
                } else {
                    addNonliteral("worker", node, true);
                }
            }
        } else if (
            ts.isNewExpression(node) &&
            callName(node.expression) === "URL" &&
            !(ts.isNewExpression(node.parent) && ["Worker", "SharedWorker"].includes(callName(node.parent.expression)))
        ) {
            const literal = node.arguments?.[0] && literalWithFallback(node.arguments[0]);
            const base = node.arguments?.[1];
            if (literal && base && isImportMetaUrl(base)) {
                add(literal.value, "new-url", node, {
                    conditionalFallback: literal.conditional,
                });
            } else if (base && isImportMetaUrl(base)) {
                addNonliteral("new-url", node, true);
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return { sourceFile, references, nonliteralReferences, parseErrors };
}

function scanBalancedFunction(value, start) {
    let depth = 0;
    let quote = null;
    for (let index = start; index < value.length; index += 1) {
        const character = value[index];
        if (quote) {
            if (character === "\\") index += 1;
            else if (character === quote) quote = null;
            continue;
        }
        if (character === "'" || character === '"') quote = character;
        else if (character === "(") depth += 1;
        else if (character === ")" && --depth === 0) return index + 1;
    }
    return value.length;
}

function extractCssUrlsFromValue(value) {
    const urls = [];
    for (let index = 0; index < value.length; index += 1) {
        if (value.slice(index, index + 4).toLowerCase() !== "url(") continue;
        const end = scanBalancedFunction(value, index + 3);
        let body = value.slice(index + 4, end - 1).trim();
        if (
            body.length >= 2 &&
            ((body.startsWith('"') && body.endsWith('"')) ||
                (body.startsWith("'") && body.endsWith("'")))
        ) {
            body = body.slice(1, -1);
        }
        urls.push(body);
        index = end - 1;
    }
    return urls;
}

function consumeCssImportTarget(params) {
    const trimmed = params.trim();
    if (/^url\(/i.test(trimmed)) {
        const end = scanBalancedFunction(trimmed, 3);
        const [specifier] = extractCssUrlsFromValue(trimmed.slice(0, end));
        return { specifier, rest: trimmed.slice(end).trim() };
    }
    if (trimmed[0] === "'" || trimmed[0] === '"') {
        const quote = trimmed[0];
        let end = 1;
        while (end < trimmed.length && trimmed[end] !== quote) {
            if (trimmed[end] === "\\") end += 1;
            end += 1;
        }
        return { specifier: trimmed.slice(1, end), rest: trimmed.slice(end + 1).trim() };
    }
    return { specifier: null, rest: trimmed };
}

function consumeNamedClause(rest, name) {
    const matcher = new RegExp(`^${name}\\b`, "i");
    if (!matcher.test(rest)) return null;
    const afterName = rest.replace(matcher, "").trimStart();
    if (!afterName.startsWith("(")) {
        return { value: true, rest: afterName };
    }
    const end = scanBalancedFunction(afterName, 0);
    return {
        value: afterName.slice(1, end - 1).trim(),
        rest: afterName.slice(end).trimStart(),
    };
}

function parseCssImportMetadata(rest) {
    let remainder = rest;
    let layer = null;
    let supports = null;
    for (let pass = 0; pass < 2; pass += 1) {
        const layerClause = consumeNamedClause(remainder, "layer");
        if (layerClause && layer === null) {
            layer = layerClause.value;
            remainder = layerClause.rest;
            continue;
        }
        const supportsClause = consumeNamedClause(remainder, "supports");
        if (supportsClause && supports === null) {
            supports = supportsClause.value;
            remainder = supportsClause.rest;
        }
    }
    return { layer, supports, media: remainder || null };
}

export function extractCssReferences(
    source,
    path = "fixture.css",
    context = {},
    origin = null,
) {
    const references = [];
    const parseErrors = [];
    const sourceLocation = (location) => offsetLocation(location, origin);
    let root;
    try {
        root = postcss.parse(source, { from: path });
    } catch (error) {
        parseErrors.push({
            source: path,
            ...sourceLocation({ line: error.line ?? null, column: error.column ?? null }),
            message: error.message,
        });
        return { references, parseErrors };
    }
    root.walkAtRules("import", (rule) => {
        const { specifier, rest } = consumeCssImportTarget(rule.params);
        const location = sourceLocation(rule.source?.start);
        if (!specifier) {
            parseErrors.push({
                source: path,
                ...location,
                message: `nonliteral CSS @import: ${rule.params}`,
            });
            return;
        }
        references.push({
            specifier,
            edgeKind: "css-import",
            ...location,
            metadata: { ...parseCssImportMetadata(rest), ...context },
        });
    });
    root.walk((node) => {
        if (node.type === "atrule" && node.name.toLowerCase() === "import") return;
        const values = [];
        if (node.type === "decl") values.push(node.value);
        if (node.type === "atrule") values.push(node.params);
        const location = sourceLocation(node.source?.start);
        for (const value of values) {
            for (const specifier of extractCssUrlsFromValue(value)) {
                if (
                    !specifier ||
                    /^(?:data:|https?:|blob:|#)/i.test(specifier) ||
                    specifier.includes("#{")
                ) {
                    continue;
                }
                references.push({
                    specifier,
                    edgeKind: "asset-url",
                    ...location,
                    metadata: { ...context },
                });
            }
        }
    });
    return { references, parseErrors };
}

function staticVueBinding(expression) {
    if (!expression) return null;
    const trimmed = expression.trim();
    const quote = trimmed[0];
    if ((quote === "'" || quote === '"') && trimmed.at(-1) === quote) {
        return trimmed.slice(1, -1);
    }
    if (trimmed.startsWith("`") && trimmed.endsWith("`") && !trimmed.includes("${")) {
        return trimmed.slice(1, -1);
    }
    return null;
}

function splitSrcset(value) {
    return value
        .split(",")
        .map((part) => part.trim().split(/\s+/, 1)[0])
        .filter(Boolean);
}

export function extractTemplateReferences(source, path = "fixture.vue", origin = null) {
    const references = [];
    const parseErrors = [];
    const dynamicAssetReferences = [];
    const sourceLocation = (location) => offsetLocation(location, origin);
    let ast;
    try {
        ast = parseTemplate(source, { comments: false });
    } catch (error) {
        const location = error.loc?.start
            ? sourceLocation(error.loc.start)
            : { line: null, column: null };
        return {
            references,
            dynamicAssetReferences,
            parseErrors: [{
                source: path,
                ...location,
                message: `Vue template parse: ${error.message}`,
            }],
        };
    }
    const addDynamic = (node, property, attribute, expression) => {
        const location = sourceLocation(property.loc?.start);
        dynamicAssetReferences.push({
            source: path,
            edgeKind:
                attribute === "style" ? "template-style-asset" : "template-asset",
            tag: node.tag,
            attribute,
            expression,
            ...location,
        });
    };
    const addInlineStyle = (node, property, value) => {
        const location = sourceLocation(property.loc?.start);
        for (const specifier of extractCssUrlsFromValue(value)) {
            if (!specifier || /^(?:data:|https?:|blob:|#|\/)/i.test(specifier)) continue;
            if (/(?:\{\{|v-bind\(|var\(|#\{|\$\{)/.test(specifier)) {
                addDynamic(node, property, "style", specifier);
                continue;
            }
            references.push({
                specifier,
                edgeKind: "template-style-asset",
                ...location,
                metadata: { tag: node.tag, attribute: "style" },
            });
        }
    };
    function visit(node) {
        if (node.type === 1) {
            const allowed = templateAssetAttributes.get(node.tag.toLowerCase());
            if (allowed) {
                for (const property of node.props) {
                    let name = null;
                    let value = null;
                    let nonliteral = false;
                    if (property.type === 6) {
                        name = property.name.toLowerCase();
                        value = property.value?.content ?? null;
                    } else if (
                        property.type === 7 &&
                        property.name === "bind" &&
                        property.arg?.type === 4 &&
                        property.arg.isStatic
                    ) {
                        name = property.arg.content.toLowerCase();
                        value = staticVueBinding(property.exp?.content);
                        nonliteral = value === null;
                    }
                    if (!name || !allowed.has(name)) continue;
                    if (nonliteral) {
                        addDynamic(
                            node,
                            property,
                            name,
                            property.exp?.content ?? "<missing expression>",
                        );
                        continue;
                    }
                    if (!value) continue;
                    const location = sourceLocation(property.loc?.start);
                    for (const specifier of name === "srcset" ? splitSrcset(value) : [value]) {
                        if (!specifier || /^(?:data:|https?:|blob:|#|\/)/i.test(specifier)) continue;
                        references.push({
                            specifier,
                            edgeKind: "template-asset",
                            ...location,
                            metadata: { tag: node.tag, attribute: name },
                        });
                    }
                }
            }
            for (const property of node.props) {
                if (property.type === 6 && property.name.toLowerCase() === "style") {
                    if (property.value?.content) {
                        addInlineStyle(node, property, property.value.content);
                    }
                } else if (
                    property.type === 7 &&
                    property.name === "bind" &&
                    property.arg?.type === 4 &&
                    property.arg.isStatic &&
                    property.arg.content.toLowerCase() === "style"
                ) {
                    const value = staticVueBinding(property.exp?.content);
                    if (value === null) {
                        addDynamic(
                            node,
                            property,
                            "style",
                            property.exp?.content ?? "<missing expression>",
                        );
                    } else {
                        addInlineStyle(node, property, value);
                    }
                }
            }
            for (const child of node.children) visit(child);
        } else if (node.children) {
            for (const child of node.children) visit(child);
        } else if (node.branches) {
            for (const branch of node.branches) visit(branch);
        }
    }
    visit(ast);
    return { references, dynamicAssetReferences, parseErrors };
}

function extractHtmlEntryReferences(source) {
    return [...source.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)].map(
        (match) => ({
            specifier: match[1],
            edgeKind: "build-entry",
            line: source.slice(0, match.index).split(/\r?\n/).length,
            metadata: { entryKind: "html-script" },
        }),
    );
}

function globToRegExp(pattern) {
    let expression = "^";
    for (let index = 0; index < pattern.length; index += 1) {
        const character = pattern[index];
        if (character === "*" && pattern[index + 1] === "*") {
            if (pattern[index + 2] === "/") {
                expression += "(?:.*/)?";
                index += 2;
            } else {
                expression += ".*";
                index += 1;
            }
        } else if (character === "*") {
            expression += "[^/]*";
        } else if (character === "?") {
            expression += "[^/]";
        } else if (character === "[") {
            const end = pattern.indexOf("]", index + 1);
            if (end !== -1) {
                expression += pattern.slice(index, end + 1);
                index = end;
            } else {
                expression += "\\[";
            }
        } else if (character === "{") {
            const end = pattern.indexOf("}", index + 1);
            if (end !== -1) {
                const alternatives = pattern
                    .slice(index + 1, end)
                    .split(",")
                    .map((value) => value.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"));
                expression += `(?:${alternatives.join("|")})`;
                index = end;
            } else {
                expression += "\\{";
            }
        } else {
            expression += character.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
        }
    }
    return new RegExp(`${expression}$`);
}

function expandLiteralGlob(importer, patterns, nodePaths) {
    const positives = patterns.filter((pattern) => !pattern.startsWith("!"));
    const negatives = patterns.filter((pattern) => pattern.startsWith("!")).map((pattern) => pattern.slice(1));
    const matches = new Map();
    for (const pattern of positives) {
        const repositoryPattern = portable(resolve("/", dirname(importer), pattern)).slice(1);
        const matcher = globToRegExp(repositoryPattern);
        const targets = nodePaths.filter((candidate) => matcher.test(candidate));
        matches.set(pattern, targets);
    }
    const negativeMatchers = negatives.map((pattern) =>
        globToRegExp(portable(resolve("/", dirname(importer), pattern)).slice(1)),
    );
    const targets = uniqueSorted(
        [...matches.values()]
            .flat()
            .filter((candidate) => !negativeMatchers.some((matcher) => matcher.test(candidate))),
    );
    return { positives, negatives, matches, targets };
}

function manifestMatcher(pattern) {
    return globToRegExp(pattern);
}

export function validateOwnerAssignments(paths, manifest) {
    const matchers = Object.entries(manifest.owners).flatMap(([owner, patterns]) =>
        patterns.map((pattern) => ({ owner, pattern, matcher: manifestMatcher(pattern) })),
    );
    const assignments = {};
    const defects = [];
    for (const path of uniqueSorted(paths)) {
        const matches = matchers.filter(({ matcher }) => matcher.test(path));
        if (matches.length !== 1) {
            defects.push({
                path,
                owners: uniqueSorted(matches.map(({ owner }) => owner)),
                patterns: matches.map(({ pattern }) => pattern),
            });
        } else {
            assignments[path] = matches[0].owner;
        }
    }
    const knownOwners = new Set(Object.keys(manifest.owners));
    for (const [entry, owner] of Object.entries(manifest.publicEntries)) {
        if (!knownOwners.has(owner)) defects.push({ publicEntry: entry, missingOwner: owner });
    }
    return { assignments, defects };
}

function projectionInventory(repositoryRoot, visibility) {
    const projectionByPath = new Map();
    const addDirectory = (projection, directory, exclude = () => false) => {
        const prefix = `${directory.replace(/\/$/, "")}/`;
        for (const path of [...visibility.files]
            .filter((candidate) => candidate.startsWith(prefix))
            .filter((candidate) => !exclude(candidate))
            .sort()) {
            if (projectionByPath.has(path)) {
                throw new Error(`graph-v3: ${path} appears in two projections`);
            }
            projectionByPath.set(path, projection);
        }
    };
    const addFile = (projection, path) => {
        if (!visibility.files.has(path)) return;
        if (projectionByPath.has(path)) {
            throw new Error(`graph-v3: ${path} appears in two projections`);
        }
        projectionByPath.set(path, projection);
    };

    addDirectory("product", "src");
    addDirectory("demo", "demo", (path) => path === "demo/vite.demo-dist.config.ts");
    addDirectory("tests", "tests");
    addDirectory(
        "visual-tests",
        "tests-visual",
        (path) => path === "tests-visual/package.json",
    );
    addDirectory("scripts-generators", "scripts");
    for (const path of [
        "demo/vite.demo-dist.config.ts",
        "index.html",
        "tsconfig.json",
        "tsconfig.build.json",
        "tsconfig.src.json",
        "tsconfig.test.json",
        "vite.config.ts",
        "vite.iter.config.ts",
        "vite.library.ts",
        "vite.style-assets.ts",
        "vite.style-fold.ts",
        "vite.targets.ts",
        "vite.utility-emit.ts",
        "vitest.config.ts",
    ]) {
        addFile("build-config", path);
    }
    addFile("package-surface", "package.json");
    addFile("package-surface", "tests-visual/package.json");
    return projectionByPath;
}

function nodeType(path, bytes, text) {
    if (/^(?:license|copying|ofl)(?:\.|$)/i.test(basename(path))) return "license";
    if (declarationPattern.test(path)) return "declaration";
    if (binaryExtensions.has(extname(path).toLowerCase())) return "binary";
    if (extname(path).toLowerCase() === ".css") return "style";
    if ([".md", ".mdx", ".txt", ".rst"].includes(extname(path).toLowerCase())) {
        return "documentation";
    }
    return "source";
}

function buildNode(
    repositoryRoot,
    path,
    projection,
    owner,
    nodeKind = "repository-file",
    generatedBy = null,
) {
    const absolutePath = join(repositoryRoot, path);
    const isDirectory =
        nodeKind === "directory" ||
        (nodeKind === "generated-by-write" && extname(path) === "");
    const virtual =
        [
            "declared-package-output",
            "generated-by-write",
            "missing-runtime-placeholder",
        ].includes(nodeKind);
    if (isDirectory || virtual) {
        return {
            path,
            projection,
            owner,
            nodeType:
                nodeKind === "declared-package-output"
                    ? "package-output"
                    : nodeKind === "missing-runtime-placeholder"
                      ? "virtual-placeholder"
                      : isDirectory
                        ? "directory"
                        : "generated-artifact",
            nodeKind,
            virtual,
            bytes: null,
            sha256: null,
            generatedBy,
        };
    }
    const bytes = readFileSync(absolutePath);
    const extension = extname(path).toLowerCase();
    const binary = binaryExtensions.has(extension);
    const text = binary ? null : bytes.toString("utf8");
    const type = nodeType(path, bytes, text);
    const node = {
        path,
        projection,
        owner,
        nodeType: type,
        nodeKind,
        virtual: false,
        bytes: bytes.byteLength,
        sha256: digest(bytes),
        generatedBy,
    };
    if (type !== "binary") {
        node.lines = text === "" ? 0 : text.split(/\r?\n/).length;
    }
    return node;
}

function projectionsForEdge(edgeKind, metadata = {}) {
    const ownership = true;
    const buildLoad = ![
        "asset-url",
        "template-asset",
        "template-style-asset",
        "new-url",
    ].includes(edgeKind);
    const eagerRuntime =
        edgeKind === "eager-runtime" ||
        edgeKind === "literal-require" ||
        edgeKind === "glob-eager" ||
        (edgeKind === "export-from" && metadata.typeOnly !== true) ||
        (edgeKind === "vue-block" && ["script", "template"].includes(metadata.blockKind));
    return {
        eagerRuntime,
        buildLoad,
        ownership,
    };
}

function tarjan(nodes, edges) {
    const adjacency = new Map(nodes.map((node) => [node, []]));
    for (const { source, target } of edges) {
        if (adjacency.has(source) && adjacency.has(target)) adjacency.get(source).push(target);
    }
    for (const targets of adjacency.values()) targets.sort();
    let nextIndex = 0;
    const indices = new Map();
    const lowLinks = new Map();
    const stack = [];
    const onStack = new Set();
    const components = [];
    function visit(node) {
        indices.set(node, nextIndex);
        lowLinks.set(node, nextIndex);
        nextIndex += 1;
        stack.push(node);
        onStack.add(node);
        for (const target of adjacency.get(node)) {
            if (!indices.has(target)) {
                visit(target);
                lowLinks.set(node, Math.min(lowLinks.get(node), lowLinks.get(target)));
            } else if (onStack.has(target)) {
                lowLinks.set(node, Math.min(lowLinks.get(node), indices.get(target)));
            }
        }
        if (lowLinks.get(node) === indices.get(node)) {
            const component = [];
            while (stack.length > 0) {
                const member = stack.pop();
                onStack.delete(member);
                component.push(member);
                if (member === node) break;
            }
            components.push(component.sort());
        }
    }
    for (const node of [...nodes].sort()) if (!indices.has(node)) visit(node);
    return components.sort((left, right) => right.length - left.length || left[0].localeCompare(right[0]));
}

function cyclesFromSccs(sccs, edges) {
    return sccs.filter(
        (component) =>
            component.length > 1 ||
            edges.some(
                ({ source, target }) => source === component[0] && target === component[0],
            ),
    );
}

function ownerEdges(fileEdges, ownerByPath) {
    const map = new Map();
    for (const edge of fileEdges) {
        const source = ownerByPath[edge.source];
        const target = ownerByPath[edge.target];
        if (!source || !target || source === target) continue;
        const key = `${source}\0${target}`;
        if (!map.has(key)) map.set(key, { source, target, edgeCount: 0, edgeKinds: new Set() });
        const ownerEdge = map.get(key);
        ownerEdge.edgeCount += 1;
        ownerEdge.edgeKinds.add(edge.edgeKind);
    }
    return [...map.values()]
        .map((edge) => ({ ...edge, edgeKinds: [...edge.edgeKinds].sort() }))
        .sort(
            (left, right) =>
                left.source.localeCompare(right.source) || left.target.localeCompare(right.target),
        );
}

function makeProjection(name, nodes, internalEdges, ownerByPath) {
    const fileEdges = internalEdges.filter((edge) => edge.projections[name]);
    const fileSccs = tarjan(nodes, fileEdges);
    const fileCycles = cyclesFromSccs(fileSccs, fileEdges);
    const crossOwnerEdges = ownerEdges(fileEdges, ownerByPath);
    const owners = uniqueSorted(nodes.map((path) => ownerByPath[path]).filter(Boolean));
    const ownerSccs = tarjan(owners, crossOwnerEdges);
    const ownerCycles = cyclesFromSccs(ownerSccs, crossOwnerEdges);
    return {
        edgeCount: fileEdges.length,
        fileSccs,
        fileCycles,
        ownerEdges: crossOwnerEdges,
        ownerSccs,
        ownerCycles,
    };
}

export function validateCycleRatchets(projections, baseline) {
    const defects = [];
    const metrics = {};
    const componentRegistry = baseline?.components ?? {};
    for (const [view, projection] of Object.entries(projections)) {
        const rules = baseline?.projections?.[view];
        metrics[view] = {};
        if (!rules) {
            defects.push({ view, defect: "missing-projection-baseline" });
            continue;
        }
        for (const [cycleField, ruleField] of [
            ["fileCycles", "fileComponents"],
            ["ownerCycles", "ownerComponents"],
        ]) {
            const allowedIds = rules[ruleField] ?? [];
            const allowed = allowedIds.flatMap((id) => {
                const members = componentRegistry[id];
                if (!Array.isArray(members)) {
                    defects.push({ view, cycleField, defect: "missing-component", id });
                    return [];
                }
                return [{ id, members }];
            });
            const cycles = projection[cycleField];
            const allowedMembers = new Set(allowed.flatMap(({ members }) => members));
            const baselineTotal = allowed.reduce(
                (sum, { members }) => sum + members.length,
                0,
            );
            const baselineMaximum = Math.max(
                0,
                ...allowed.map(({ members }) => members.length),
            );
            const total = cycles.reduce((sum, members) => sum + members.length, 0);
            const maximum = Math.max(0, ...cycles.map((members) => members.length));
            metrics[view][cycleField] = {
                components: cycles.length,
                cyclicNodes: total,
                maxComponentSize: maximum,
                baselineCyclicNodes: baselineTotal,
                baselineMaxComponentSize: baselineMaximum,
            };
            if (total > baselineTotal) {
                defects.push({
                    view,
                    cycleField,
                    defect: "total-cyclic-node-growth",
                    baseline: baselineTotal,
                    actual: total,
                });
            }
            if (maximum > baselineMaximum) {
                defects.push({
                    view,
                    cycleField,
                    defect: "max-scc-growth",
                    baseline: baselineMaximum,
                    actual: maximum,
                });
            }
            for (const members of cycles) {
                if (
                    allowed.some(({ members: baselineMembers }) =>
                        members.every((member) => baselineMembers.includes(member)),
                    )
                ) {
                    continue;
                }
                const newMembers = members.filter((member) => !allowedMembers.has(member));
                const mergedBaselines = allowed
                    .filter(({ members: baselineMembers }) =>
                        members.some((member) => baselineMembers.includes(member)),
                    )
                    .map(({ id }) => id);
                defects.push({
                    view,
                    cycleField,
                    defect:
                        newMembers.length > 0
                            ? "new-cycle-members"
                            : mergedBaselines.length > 1
                              ? "baseline-components-merged"
                              : "unapproved-cycle",
                    members,
                    newMembers,
                    mergedBaselines,
                });
            }
        }
    }
    return { pass: defects.length === 0, defects, metrics };
}

function pathWithin(root, path) {
    const rel = relative(root, path);
    return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

function packageName(specifier) {
    if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
    return specifier.split("/", 1)[0];
}

function resolveReference(
    repositoryRoot,
    importer,
    rawSpecifier,
    resolutionMode = "module",
    visibility = null,
) {
    const specifier = stripQuery(rawSpecifier);
    if (/^(?:data:|https?:|blob:|#)/i.test(specifier)) {
        return { resolution: "external-url", specifier: rawSpecifier };
    }
    let base;
    if (specifier === "@glass") {
        base = join(repositoryRoot, "src");
    } else if (specifier.startsWith("@glass/")) {
        base = join(repositoryRoot, "src", specifier.slice("@glass/".length));
    } else if (specifier.startsWith(".")) {
        base = resolve(dirname(join(repositoryRoot, importer)), specifier);
    } else if (/^\/(?:src|demo|tests|tests-visual|scripts)\//.test(specifier)) {
        base = join(repositoryRoot, specifier.slice(1));
    } else if (specifier.startsWith("/") && resolutionMode !== "module") {
        return { resolution: "external-url", specifier: rawSpecifier };
    } else if (isAbsolute(specifier)) {
        base = specifier;
    } else {
        return {
            resolution: "external-package",
            package: packageName(specifier),
            specifier: rawSpecifier,
        };
    }
    const candidates =
        resolutionMode === "module"
            ? [
                  base,
                  ...importedExtensions.map((extension) => `${base}${extension}`),
                  ...importedExtensions.map((extension) => join(base, `index${extension}`)),
              ]
            : [base];
    for (const candidate of candidates) {
        if (pathWithin(repositoryRoot, candidate) && visibility) {
            const target = portable(relative(repositoryRoot, candidate)) || ".";
            if (visibility.files.has(target)) {
                return {
                    resolution: "repository-file",
                    target,
                    specifier: rawSpecifier,
                };
            }
            if (
                visibility.directories.has(target) &&
                resolutionMode !== "module"
            ) {
                return {
                    resolution: "repository-directory",
                    target,
                    specifier: rawSpecifier,
                };
            }
            continue;
        }
        if (!existsSync(candidate)) continue;
        if (resolutionMode === "module" && statSync(candidate).isDirectory()) continue;
        const target = portable(relative(repositoryRoot, candidate));
        if (pathWithin(repositoryRoot, candidate)) {
            return {
                resolution: statSync(candidate).isDirectory() ? "repository-directory" : "repository-file",
                target: target || ".",
                specifier: rawSpecifier,
            };
        }
        return { resolution: "external-file", target: portable(candidate), specifier: rawSpecifier };
    }
    return {
        resolution: "unresolved-local",
        target: portable(relative(repositoryRoot, base)),
        specifier: rawSpecifier,
    };
}

function collectConstInitializers(sourceFile) {
    const values = new Map();
    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            ts.isIdentifier(node.name) &&
            node.initializer &&
            !values.has(node.name.text)
        ) {
            values.set(node.name.text, node.initializer);
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return values;
}

function evaluatePathExpression(node, sourceFile, sourcePath, repositoryRoot, constants, seen = new Set()) {
    if (!node) return null;
    const string = literalString(node);
    if (string !== null) return string;
    if (ts.isIdentifier(node)) {
        if (node.text === "__dirname") return dirname(join(repositoryRoot, sourcePath));
        if (seen.has(node.text)) return null;
        if (constants.has(node.text)) {
            seen.add(node.text);
            return evaluatePathExpression(
                constants.get(node.text),
                sourceFile,
                sourcePath,
                repositoryRoot,
                constants,
                seen,
            );
        }
        if (["root", "repoRoot", "repositoryRoot", "REPO_ROOT", "ROOT"].includes(node.text)) {
            return repositoryRoot;
        }
        return null;
    }
    if (
        ts.isPropertyAccessExpression(node) &&
        node.name.text === "dirname" &&
        isImportMeta(node.expression)
    ) {
        return dirname(join(repositoryRoot, sourcePath));
    }
    if (isImportMetaUrl(node)) return pathToFileURL(join(repositoryRoot, sourcePath)).href;
    if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === "process" &&
        node.expression.name.text === "cwd"
    ) {
        return repositoryRoot;
    }
    if (ts.isCallExpression(node)) {
        const name = callName(node.expression);
        const isPathFunction =
            ts.isIdentifier(node.expression) ||
            (ts.isPropertyAccessExpression(node.expression) &&
                ts.isIdentifier(node.expression.expression) &&
                ["path", "nodePath"].includes(node.expression.expression.text));
        const values = node.arguments.map((argument) =>
            evaluatePathExpression(
                argument,
                sourceFile,
                sourcePath,
                repositoryRoot,
                constants,
                new Set(seen),
            ),
        );
        if (values.some((value) => value === null)) return null;
        if (name === "resolve" && isPathFunction) return resolve(...values);
        if (name === "join" && isPathFunction) return join(...values);
        if (name === "dirname" && isPathFunction) return dirname(values[0]);
        if (name === "fileURLToPath") {
            try {
                return fileURLToPath(values[0]);
            } catch {
                return null;
            }
        }
    }
    if (ts.isNewExpression(node) && callName(node.expression) === "URL") {
        const value = evaluatePathExpression(
            node.arguments?.[0],
            sourceFile,
            sourcePath,
            repositoryRoot,
            constants,
            new Set(seen),
        );
        const base = evaluatePathExpression(
            node.arguments?.[1],
            sourceFile,
            sourcePath,
            repositoryRoot,
            constants,
            new Set(seen),
        );
        if (value === null || base === null) return null;
        try {
            return new URL(value, base).pathname;
        } catch {
            return null;
        }
    }
    return null;
}

function extractFileOperations(sourceFile, sourcePath, repositoryRoot, origin = null) {
    const operations = [];
    const unmodeled = [];
    const constants = collectConstInitializers(sourceFile);
    const sourceLocation = (node) => {
        const local = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        return offsetLocation(
            { line: local.line + 1, column: local.character + 1 },
            origin,
        );
    };
    function resolvedArgument(argument) {
        const value = evaluatePathExpression(
            argument,
            sourceFile,
            sourcePath,
            repositoryRoot,
            constants,
        );
        if (value === null) return null;
        const absolutePath = isAbsolute(value) ? value : resolve(repositoryRoot, value);
        return pathWithin(repositoryRoot, absolutePath)
            ? portable(relative(repositoryRoot, absolutePath)) || "."
            : portable(absolutePath);
    }
    function visit(node) {
        if (ts.isCallExpression(node)) {
            const name = callName(node.expression);
            const location = sourceLocation(node);
            if (fsReadNames.has(name) || fsWriteNames.has(name)) {
                const target = resolvedArgument(node.arguments[0]);
                if (target) {
                    operations.push({
                        edgeKind: fsReadNames.has(name) ? "generator-read" : "generator-write",
                        target,
                        ...location,
                        operation: name,
                    });
                } else {
                    unmodeled.push({ source: sourcePath, operation: name, ...location });
                }
            } else if (fsCopyNames.has(name)) {
                const source = resolvedArgument(node.arguments[0]);
                const target = resolvedArgument(node.arguments[1]);
                if (source && target) {
                    operations.push({
                        edgeKind: "generator-read",
                        target: source,
                        ...location,
                        operation: name,
                    });
                    operations.push({
                        edgeKind: "generator-write",
                        target,
                        ...location,
                        operation: name,
                    });
                } else {
                    unmodeled.push({ source: sourcePath, operation: name, ...location });
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return { operations, unmodeled };
}

export function extractProcessInvocations(
    sourceFile,
    sourcePath,
    repositoryRoot,
    origin = null,
) {
    const invocations = [];
    const constants = collectConstInitializers(sourceFile);
    const bindingResolver = createBindingResolver(sourceFile);
    const sourceLocation = (node) => {
        const local = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        return offsetLocation(
            { line: local.line + 1, column: local.character + 1 },
            origin,
        );
    };
    const describeArgument = (argument, index) => {
        const primitive = staticPrimitive(argument);
        const evaluated = evaluatePathExpression(
            argument,
            sourceFile,
            sourcePath,
            repositoryRoot,
            constants,
        );
        let target = null;
        if (typeof evaluated === "string") {
            const absolute = isAbsolute(evaluated) ? evaluated : resolve(repositoryRoot, evaluated);
            const pathLike =
                isAbsolute(evaluated) ||
                /^[.]{1,2}[\\/]/.test(evaluated) ||
                (!/\s/.test(evaluated) &&
                    (evaluated.includes("/") ||
                        evaluated.includes("\\") ||
                        existsSync(absolute)));
            if (pathLike && pathWithin(repositoryRoot, absolute)) {
                target = portable(relative(repositoryRoot, absolute)) || ".";
            }
        }
        return {
            index,
            value:
                typeof primitive === "string" ||
                typeof primitive === "number" ||
                typeof primitive === "boolean"
                    ? primitive
                    : null,
            target,
            expression: expressionText(argument, sourceFile),
            dynamic: primitive === undefined && evaluated === null,
        };
    };
    function visit(node) {
        if (ts.isCallExpression(node)) {
            const binding = bindingResolver.resolveExpression(node.expression, node);
            if (
                binding.kind === "module-member" &&
                childProcessModules.has(binding.moduleName) &&
                processExecutionNames.has(binding.member)
            ) {
                const location = sourceLocation(node);
                const command = node.arguments[0]
                    ? describeArgument(node.arguments[0], 0)
                    : null;
                let argv = [];
                if (node.arguments[1] && ts.isArrayLiteralExpression(node.arguments[1])) {
                    argv = node.arguments[1].elements.map((argument, index) =>
                        describeArgument(argument, index),
                    );
                } else if (node.arguments[1]) {
                    argv = [describeArgument(node.arguments[1], 0)];
                }
                invocations.push({
                    source: sourcePath,
                    ...location,
                    api: binding.member,
                    binding: expressionText(node.expression, sourceFile),
                    command,
                    argv,
                    dynamicArguments:
                        Number(command?.dynamic ?? false) +
                        argv.filter(({ dynamic }) => dynamic).length,
                });
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return invocations.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            left.line - right.line ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.api.localeCompare(right.api),
    );
}

function flattenExportTargets(entry, value, conditionPath = []) {
    if (typeof value === "string") {
        return [{ entry, conditions: conditionPath, target: value }];
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) return [];
    return Object.entries(value).flatMap(([condition, nested]) =>
        flattenExportTargets(entry, nested, [...conditionPath, condition]),
    );
}

async function readBuildEntryMap(repositoryRoot) {
    const policyPath = join(repositoryRoot, "scripts/lib/subpath-policy.mjs");
    if (!existsSync(policyPath)) return { entries: {}, error: "subpath policy absent" };
    try {
        const policy = await import(`${pathToFileURL(policyPath).href}?graph-v3=${Date.now()}`);
        const tree = policy.readTree({ repoRoot: repositoryRoot });
        const classification = policy.classifyAll(tree);
        if (!classification.pass) {
            return {
                entries: {},
                error: `subpath policy unclassified: ${classification.unclassified.join(", ")}`,
            };
        }
        return { entries: policy.buildEntrySet(tree).entries, error: null };
    } catch (error) {
        return { entries: {}, error: error.message };
    }
}

function directExports(sourceFile) {
    const symbols = [];
    const reexports = [];
    const hasExport = (node) =>
        node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    for (const statement of sourceFile.statements) {
        if (ts.isExportDeclaration(statement)) {
            const specifier =
                statement.moduleSpecifier && ts.isStringLiteralLike(statement.moduleSpecifier)
                    ? statement.moduleSpecifier.text
                    : null;
            if (specifier) {
                reexports.push({
                    specifier,
                    exportAll: !statement.exportClause,
                    typeOnly: statement.isTypeOnly,
                    symbols:
                        statement.exportClause && ts.isNamedExports(statement.exportClause)
                            ? statement.exportClause.elements.map((element) => ({
                                  name: element.name.text,
                                  imported: element.propertyName?.text ?? element.name.text,
                                  typeOnly: statement.isTypeOnly || element.isTypeOnly,
                              }))
                            : [],
                });
            } else if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
                for (const element of statement.exportClause.elements) {
                    symbols.push({
                        name: element.name.text,
                        declarationKind: "local-export",
                        typeOnly: statement.isTypeOnly || element.isTypeOnly,
                    });
                }
            }
        } else if (ts.isExportAssignment(statement)) {
            symbols.push({ name: "default", declarationKind: "default", typeOnly: false });
        } else if (hasExport(statement)) {
            const typeOnly =
                ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement);
            if (
                ts.isFunctionDeclaration(statement) ||
                ts.isClassDeclaration(statement) ||
                ts.isInterfaceDeclaration(statement) ||
                ts.isTypeAliasDeclaration(statement) ||
                ts.isEnumDeclaration(statement)
            ) {
                if (statement.name) {
                    symbols.push({
                        name: statement.name.text,
                        declarationKind: ts.SyntaxKind[statement.kind],
                        typeOnly,
                    });
                }
            } else if (ts.isVariableStatement(statement)) {
                for (const declaration of statement.declarationList.declarations) {
                    if (ts.isIdentifier(declaration.name)) {
                        symbols.push({
                            name: declaration.name.text,
                            declarationKind: "variable",
                            typeOnly: false,
                        });
                    }
                }
            }
            if (statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)) {
                symbols.push({ name: "default", declarationKind: "default", typeOnly });
            }
        }
    }
    return { symbols, reexports };
}

function publicSymbols(
    entrySource,
    scriptAsts,
    repositoryRoot,
    visibility,
    seen = new Set(),
) {
    if (seen.has(entrySource)) return [];
    seen.add(entrySource);
    const sourceFile = scriptAsts.get(entrySource);
    if (!sourceFile) return [];
    const { symbols, reexports } = directExports(sourceFile);
    const result = symbols.map((symbol) => ({ ...symbol, declaredIn: entrySource }));
    for (const reexport of reexports) {
        const resolution = resolveReference(
            repositoryRoot,
            entrySource,
            reexport.specifier,
            "module",
            visibility,
        );
        if (resolution.resolution !== "repository-file") continue;
        if (reexport.exportAll) {
            for (const symbol of publicSymbols(
                resolution.target,
                scriptAsts,
                repositoryRoot,
                visibility,
                new Set(seen),
            )) {
                if (symbol.name !== "default") result.push(symbol);
            }
        } else {
            for (const symbol of reexport.symbols) {
                result.push({
                    name: symbol.name,
                    imported: symbol.imported,
                    typeOnly: symbol.typeOnly,
                    declarationKind: "re-export",
                    declaredIn: resolution.target,
                });
            }
        }
    }
    const map = new Map();
    for (const symbol of result) {
        const key = `${symbol.name}\0${symbol.typeOnly}`;
        if (!map.has(key)) map.set(key, symbol);
    }
    return [...map.values()].sort(
        (left, right) =>
            left.name.localeCompare(right.name) ||
            Number(left.typeOnly) - Number(right.typeOnly) ||
            left.declaredIn.localeCompare(right.declaredIn),
    );
}

function parseArguments(argv) {
    const options = {
        repositoryRoot: defaultRepositoryRoot,
        outputDirectory: defaultOutputDirectory,
        check: false,
    };
    for (let index = 0; index < argv.length; index += 1) {
        const argument = argv[index];
        if (argument === "--check") options.check = true;
        else if (argument === "--repository-root") options.repositoryRoot = resolve(argv[++index]);
        else if (argument === "--output-directory") options.outputDirectory = resolve(argv[++index]);
        else throw new Error(`graph-v3: unknown argument ${argument}`);
    }
    return options;
}

export async function buildGraph({
    repositoryRoot = defaultRepositoryRoot,
    outputDirectory = defaultOutputDirectory,
} = {}) {
    const manifestPath = join(outputDirectory, "OWNER-MANIFEST.json");
    const ownerManifestBytes = readFileSync(manifestPath);
    const ownerManifest = JSON.parse(ownerManifestBytes.toString("utf8"));
    if (ownerManifest.schema !== "glass-ui-owner-manifest/1") {
        throw new Error(`graph-v3: unsupported owner manifest schema ${ownerManifest.schema}`);
    }
    const repositoryVisibility = gitRepositoryVisibility(repositoryRoot);
    const projectionByPath = projectionInventory(
        repositoryRoot,
        repositoryVisibility,
    );
    const seedPaths = [...projectionByPath.keys()].sort();
    const initialOwnership = validateOwnerAssignments(seedPaths, ownerManifest);
    if (initialOwnership.defects.length > 0) {
        throw new Error(
            `graph-v3: owner manifest does not assign exactly one owner/file:\n${JSON.stringify(initialOwnership.defects, null, 2)}`,
        );
    }

    const nodesByPath = new Map();
    const ownerByPath = { ...initialOwnership.assignments };
    const ownerDefects = [];
    const addNode = (
        path,
        projection = "repository-boundary",
        nodeKind = "repository-file",
        generatedBy = null,
    ) => {
        if (nodesByPath.has(path)) return nodesByPath.get(path);
        const isDirectory =
            (nodeKind === "repository-file" &&
                repositoryVisibility.directories.has(path) &&
                !repositoryVisibility.files.has(path)) ||
            (nodeKind !== "repository-file" && extname(path) === "");
        if (isDirectory) {
            const ownershipProbe = validateOwnerAssignments(
                [`${path.replace(/\/$/, "")}/__directory__`],
                ownerManifest,
            );
            const owner =
                ownershipProbe.defects.length === 0
                    ? ownershipProbe.assignments[`${path.replace(/\/$/, "")}/__directory__`]
                    : "repository/directory";
            ownerByPath[path] = owner;
            const node = buildNode(
                repositoryRoot,
                path,
                projectionByPath.get(path) ?? projection,
                owner,
                nodeKind === "repository-file" ? "directory" : nodeKind,
                generatedBy,
            );
            nodesByPath.set(path, node);
            return node;
        }
        const ownership = validateOwnerAssignments([path], ownerManifest);
        if (ownership.defects.length > 0) {
            ownerDefects.push(...ownership.defects);
            return null;
        }
        ownerByPath[path] = ownership.assignments[path];
        const node = buildNode(
            repositoryRoot,
            path,
            projectionByPath.get(path) ?? projection,
            ownerByPath[path],
            nodeKind,
            generatedBy,
        );
        nodesByPath.set(path, node);
        return node;
    };
    for (const path of seedPaths) addNode(path, projectionByPath.get(path));

    const internalEdges = [];
    const externalEdges = [];
    const unresolvedLocalReferences = [];
    const nonliteralLocalReferences = [];
    const dynamicModuleReferences = [];
    const dynamicAssetReferences = [];
    const parseErrors = [];
    const unresolvedGlobPatterns = [];
    const unmodeledFileOperations = [];
    const processInvocations = [];
    const scriptAsts = new Map();

    const addResolvedReference = (
        source,
        reference,
        resolutionMode = "module",
        projectionOverrides = null,
    ) => {
        const resolution = resolveReference(
            repositoryRoot,
            source,
            reference.specifier,
            resolutionMode,
            repositoryVisibility,
        );
        const edgeBase = {
            source,
            specifier: reference.specifier,
            edgeKind: reference.edgeKind,
            line: reference.line ?? null,
            column: reference.column ?? null,
            metadata: reference.metadata ?? {},
        };
        if (resolution.resolution === "repository-file" || resolution.resolution === "repository-directory") {
            const seedProjection = projectionByPath.get(resolution.target);
            const targetNode = addNode(
                resolution.target,
                seedProjection ?? "repository-boundary",
            );
            if (!targetNode) return;
            internalEdges.push({
                ...edgeBase,
                target: resolution.target,
                boundary: seedProjection ? "within-projections" : "repository-boundary",
                projections:
                    projectionOverrides ??
                    projectionsForEdge(reference.edgeKind, reference.metadata),
            });
        } else if (
            resolution.resolution === "external-package" ||
            resolution.resolution === "external-url" ||
            resolution.resolution === "external-file"
        ) {
            externalEdges.push({ ...edgeBase, ...resolution });
        } else {
            const sourceProjection = projectionByPath.get(source);
            if (
                reference.edgeKind === "new-url" &&
                ["tests", "visual-tests", "scripts-generators", "build-config"].includes(sourceProjection)
            ) {
                const targetNode = addNode(
                    resolution.target,
                    "repository-boundary",
                    "missing-runtime-placeholder",
                );
                if (targetNode) {
                    internalEdges.push({
                        ...edgeBase,
                        target: resolution.target,
                        boundary: "repository-boundary",
                        metadata: { ...edgeBase.metadata, targetExists: false },
                        projections:
                            projectionOverrides ??
                            projectionsForEdge(reference.edgeKind, reference.metadata),
                    });
                }
            } else {
                unresolvedLocalReferences.push({ ...edgeBase, target: resolution.target });
            }
        }
    };

    for (const path of seedPaths) {
        const node = nodesByPath.get(path);
        if (!node || node.nodeType === "binary" || node.nodeType === "directory") continue;
        const source = readFileSync(join(repositoryRoot, path), "utf8");
        if (scriptExtensions.has(extname(path).toLowerCase())) {
            const extracted = extractScriptReferences(source, path);
            scriptAsts.set(path, extracted.sourceFile);
            parseErrors.push(...extracted.parseErrors);
            for (const reference of extracted.references) {
                if (reference.patterns) {
                    const expansion = expandLiteralGlob(path, reference.patterns, seedPaths);
                    for (const [pattern, targets] of expansion.matches) {
                        if (targets.length === 0) {
                            unresolvedGlobPatterns.push({
                                source: path,
                                pattern,
                                line: reference.line,
                                column: reference.column ?? null,
                            });
                        }
                    }
                    for (const target of expansion.targets) {
                        internalEdges.push({
                            source: path,
                            target,
                            specifier: reference.patterns.join(","),
                            edgeKind: reference.edgeKind,
                            line: reference.line,
                            column: reference.column ?? null,
                            boundary: "within-projections",
                            metadata: {
                                ...reference.metadata,
                                patterns: reference.patterns,
                                negativePatterns: expansion.negatives,
                                options: reference.options,
                            },
                            projections: projectionsForEdge(reference.edgeKind),
                        });
                    }
                } else {
                    addResolvedReference(path, reference, reference.edgeKind === "new-url" ? "asset" : "module");
                }
            }
            nonliteralLocalReferences.push(
                ...extracted.nonliteralReferences.filter(({ localHint }) => localHint),
            );
            dynamicModuleReferences.push(
                ...extracted.nonliteralReferences.filter(({ localHint }) => !localHint),
            );
            processInvocations.push(
                ...extractProcessInvocations(extracted.sourceFile, path, repositoryRoot),
            );
            const fileOperations = extractFileOperations(
                extracted.sourceFile,
                path,
                repositoryRoot,
            );
            unmodeledFileOperations.push(...fileOperations.unmodeled);
            for (const operation of fileOperations.operations) {
                const operationEdgeKind =
                    ["scripts-generators", "build-config"].includes(projectionByPath.get(path))
                        ? operation.edgeKind
                        : operation.edgeKind === "generator-read"
                          ? "file-read"
                          : "file-write";
                const absoluteTarget = isAbsolute(operation.target)
                    ? operation.target
                    : join(repositoryRoot, operation.target);
                if (!pathWithin(repositoryRoot, absoluteTarget)) {
                    externalEdges.push({
                        source: path,
                        target: portable(absoluteTarget),
                        edgeKind: operationEdgeKind,
                        operation: operation.operation,
                        line: operation.line,
                        column: operation.column ?? null,
                        resolution: "external-file-operation",
                    });
                    continue;
                }
                const target = portable(relative(repositoryRoot, absoluteTarget)) || ".";
                if (target === "node_modules" || target.startsWith("node_modules/")) {
                    externalEdges.push({
                        source: path,
                        target,
                        edgeKind: operationEdgeKind,
                        operation: operation.operation,
                        line: operation.line,
                        column: operation.column ?? null,
                        resolution: "external-package-file-operation",
                    });
                    continue;
                }
                const modeledGeneratorWrite =
                    operationEdgeKind === "generator-write" &&
                    !projectionByPath.has(target);
                const canonicalTarget =
                    repositoryVisibility.files.has(target) ||
                    repositoryVisibility.directories.has(target);
                const nodeKind = modeledGeneratorWrite
                    ? "generated-by-write"
                    : canonicalTarget
                      ? "repository-file"
                      : "missing-runtime-placeholder";
                const targetNode = addNode(
                    target,
                    "repository-boundary",
                    nodeKind,
                    modeledGeneratorWrite ? path : null,
                );
                if (!targetNode) continue;
                if (
                    modeledGeneratorWrite &&
                    targetNode.nodeKind !== "generated-by-write"
                ) {
                    targetNode.nodeKind = "generated-by-write";
                    targetNode.generatedBy = path;
                    targetNode.virtual = true;
                    targetNode.bytes = null;
                    targetNode.sha256 = null;
                    delete targetNode.lines;
                    targetNode.nodeType =
                        extname(targetNode.path) === ""
                            ? "directory"
                            : "generated-artifact";
                }
                internalEdges.push({
                    source: path,
                    target,
                    specifier: null,
                    edgeKind: operationEdgeKind,
                    line: operation.line,
                    column: operation.column ?? null,
                    boundary: projectionByPath.has(target)
                        ? "within-projections"
                        : "repository-boundary",
                    metadata: { operation: operation.operation },
                    projections: { eagerRuntime: false, buildLoad: true, ownership: true },
                });
            }
        } else if (extname(path).toLowerCase() === ".vue") {
            const parsed = parseSfc(source, { filename: path, sourceMap: false });
            for (const error of parsed.errors) {
                parseErrors.push({ source: path, message: String(error) });
            }
            const { descriptor } = parsed;
            for (const [blockKind, block] of [
                ["script", descriptor.script],
                ["script", descriptor.scriptSetup],
                ["template", descriptor.template],
            ]) {
                if (block?.src) {
                    addResolvedReference(path, {
                        specifier: block.src,
                        edgeKind: "vue-block",
                        line: block.loc?.start?.line ?? null,
                        column: block.loc?.start?.column ?? null,
                        metadata: {
                            blockKind,
                            blockType: blockKind,
                            src: block.src,
                            lang: block.lang ?? null,
                            setup: blockKind === "script" && block === descriptor.scriptSetup,
                        },
                    });
                }
            }
            descriptor.styles.forEach((style, index) => {
                const metadata = {
                    blockKind: "style",
                    blockType: "style",
                    styleIndex: index,
                    src: style.src ?? null,
                    lang: style.lang ?? "css",
                    scoped: Boolean(style.scoped),
                    module: style.module ?? false,
                };
                if (style.src) {
                    addResolvedReference(path, {
                        specifier: style.src,
                        edgeKind: "vue-block",
                        line: style.loc?.start?.line ?? null,
                        column: style.loc?.start?.column ?? null,
                        metadata,
                    });
                } else {
                    const css = extractCssReferences(
                        style.content,
                        path,
                        metadata,
                        style.loc?.start ?? null,
                    );
                    parseErrors.push(...css.parseErrors);
                    for (const reference of css.references) {
                        addResolvedReference(
                            path,
                            reference,
                            reference.edgeKind === "css-import" ? "module" : "asset",
                        );
                    }
                }
            });
            for (const [block, suffix] of [
                [descriptor.script, descriptor.script?.lang ?? "js"],
                [descriptor.scriptSetup, descriptor.scriptSetup?.lang ?? "js"],
            ]) {
                if (!block || block.src) continue;
                const virtualPath = `${path}.${suffix}`;
                const extracted = extractScriptReferences(
                    block.content,
                    virtualPath,
                    block.loc?.start ?? null,
                );
                scriptAsts.set(
                    path,
                    extracted.sourceFile,
                );
                parseErrors.push(
                    ...extracted.parseErrors.map((error) => ({ ...error, source: path })),
                );
                for (const reference of extracted.references) {
                    if (reference.patterns) {
                        const expansion = expandLiteralGlob(path, reference.patterns, seedPaths);
                        for (const [pattern, targets] of expansion.matches) {
                            if (targets.length === 0) {
                                unresolvedGlobPatterns.push({
                                    source: path,
                                    pattern,
                                    line: reference.line,
                                    column: reference.column ?? null,
                                });
                            }
                        }
                        for (const target of expansion.targets) {
                            internalEdges.push({
                                source: path,
                                target,
                                specifier: reference.patterns.join(","),
                                edgeKind: reference.edgeKind,
                                line: reference.line,
                                column: reference.column ?? null,
                                boundary: "within-projections",
                                metadata: {
                                    patterns: reference.patterns,
                                    negativePatterns: expansion.negatives,
                                    options: reference.options,
                                },
                                projections: projectionsForEdge(reference.edgeKind),
                            });
                        }
                    } else {
                        addResolvedReference(
                            path,
                            reference,
                            reference.edgeKind === "new-url" ? "asset" : "module",
                        );
                    }
                }
                nonliteralLocalReferences.push(
                    ...extracted.nonliteralReferences
                        .filter(({ localHint }) => localHint)
                        .map((reference) => ({ ...reference, source: path })),
                );
                dynamicModuleReferences.push(
                    ...extracted.nonliteralReferences
                        .filter(({ localHint }) => !localHint)
                        .map((reference) => ({ ...reference, source: path })),
                );
                processInvocations.push(
                    ...extractProcessInvocations(
                        extracted.sourceFile,
                        path,
                        repositoryRoot,
                        block.loc?.start ?? null,
                    ),
                );
            }
            if (descriptor.template && !descriptor.template.src) {
                const template = extractTemplateReferences(
                    descriptor.template.content,
                    path,
                    descriptor.template.loc?.start ?? null,
                );
                parseErrors.push(...template.parseErrors);
                dynamicAssetReferences.push(...template.dynamicAssetReferences);
                for (const reference of template.references) {
                    addResolvedReference(path, reference, "asset");
                }
            }
        } else if (extname(path).toLowerCase() === ".html") {
            for (const reference of extractHtmlEntryReferences(source)) {
                addResolvedReference(path, reference, "module");
            }
        } else if (extname(path).toLowerCase() === ".css") {
            const css = extractCssReferences(source, path);
            parseErrors.push(...css.parseErrors);
            for (const reference of css.references) {
                addResolvedReference(
                    path,
                    reference,
                    reference.edgeKind === "css-import" ? "module" : "asset",
                );
            }
        }
    }

    const packagePath = join(repositoryRoot, "package.json");
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    const packageExports = Object.entries(packageJson.exports ?? {}).flatMap(([entry, value]) =>
        flattenExportTargets(entry, value),
    );
    const buildEntryResult = await readBuildEntryMap(repositoryRoot);
    if (buildEntryResult.error) parseErrors.push({ source: "vite.library.ts", message: buildEntryResult.error });
    const entrySourceByPackageKey = new Map(
        Object.entries(buildEntryResult.entries).map(([name, source]) => [
            name === "index" ? "." : `./${name}`,
            source,
        ]),
    );
    const packageSurfaceEdges = [];
    for (const exported of packageExports) {
        const target = stripQuery(exported.target.replace(/^\.\//, ""));
        const targetPath = target.startsWith("dist/") ? target : null;
        if (targetPath) {
            const targetNode = addNode(
                targetPath,
                "repository-boundary",
                "declared-package-output",
            );
            if (targetNode) {
                packageSurfaceEdges.push({
                    source: "package.json",
                    target: targetPath,
                    specifier: exported.entry,
                    edgeKind: "package-export",
                    line: null,
                    boundary: "repository-boundary",
                    metadata: { conditions: exported.conditions },
                    projections: { eagerRuntime: false, buildLoad: true, ownership: true },
                });
            }
        }
    }
    for (const [name, source] of Object.entries(buildEntryResult.entries)) {
        if (!ownerByPath[source]) continue;
        packageSurfaceEdges.push({
            source: "vite.config.ts",
            target: source,
            specifier: name,
            edgeKind: "build-entry",
            line: null,
            boundary: "within-projections",
            metadata: { bundler: "vite/rolldown", entryName: name },
            projections: { eagerRuntime: false, buildLoad: true, ownership: true },
        });
    }
    for (const [range, mappings] of Object.entries(packageJson.typesVersions ?? {})) {
        for (const [entry, targets] of Object.entries(mappings)) {
            for (const rawTarget of targets) {
                const target = rawTarget.replace(/^\.\//, "");
                const targetNode = addNode(
                    target,
                    "repository-boundary",
                    "declared-package-output",
                );
                if (!targetNode) continue;
                packageSurfaceEdges.push({
                    source: "package.json",
                    target,
                    specifier: entry,
                    edgeKind: "types-version",
                    line: null,
                    boundary: "repository-boundary",
                    metadata: { range },
                    projections: { eagerRuntime: false, buildLoad: true, ownership: true },
                });
            }
        }
    }
    const sideEffectPatterns = Array.isArray(packageJson.sideEffects)
        ? packageJson.sideEffects
        : [];
    const sideEffectTargets = uniqueSorted(
        packageExports
            .map(({ target }) => target.replace(/^\.\//, ""))
            .filter((target) =>
                sideEffectPatterns.some((pattern) =>
                    globToRegExp(pattern.includes("/") ? pattern : `**/${pattern}`).test(target),
                ),
            ),
    );
    for (const target of sideEffectTargets) {
        const targetNode = addNode(
            target,
            "repository-boundary",
            "declared-package-output",
        );
        if (!targetNode) continue;
        packageSurfaceEdges.push({
            source: "package.json",
            target,
            specifier: sideEffectPatterns.join(","),
            edgeKind: "package-side-effect",
            line: null,
            boundary: "repository-boundary",
            metadata: {},
            projections: { eagerRuntime: false, buildLoad: true, ownership: true },
        });
    }
    internalEdges.push(...packageSurfaceEdges);

    const packageKeys = Object.keys(packageJson.exports ?? {}).sort();
    const manifestKeys = Object.keys(ownerManifest.publicEntries).sort();
    const missingPublicOwners = packageKeys.filter((entry) => !(entry in ownerManifest.publicEntries));
    const stalePublicOwners = manifestKeys.filter((entry) => !(entry in (packageJson.exports ?? {})));
    if (missingPublicOwners.length > 0 || stalePublicOwners.length > 0) {
        ownerDefects.push({ missingPublicOwners, stalePublicOwners });
    }
    const publicSourceOwnerMismatches = packageKeys.flatMap((entry) => {
        const sourceEntry = entrySourceByPackageKey.get(entry) ?? null;
        if (!sourceEntry) return [];
        const declaredOwner = ownerManifest.publicEntries[entry];
        const sourceOwner = ownerByPath[sourceEntry] ?? null;
        return declaredOwner === sourceOwner
            ? []
            : [{ entry, sourceEntry, declaredOwner, sourceOwner }];
    });
    if (publicSourceOwnerMismatches.length > 0) {
        ownerDefects.push({ publicSourceOwnerMismatches });
    }
    const publicReach = packageKeys.map((entry) => {
        const sourceEntry = entrySourceByPackageKey.get(entry) ?? null;
        const targets = packageExports
            .filter((candidate) => candidate.entry === entry)
            .map(({ conditions, target }) => ({ conditions, target }));
        let symbols = [];
        if (sourceEntry) {
            symbols = publicSymbols(
                sourceEntry,
                scriptAsts,
                repositoryRoot,
                repositoryVisibility,
            );
        }
        if (!sourceEntry && targets.every(({ target }) => !/\.(?:m?js|cjs)$/.test(target))) {
            symbols = [{ name: "*asset*", declaredIn: targets.map(({ target }) => target).join(", "), typeOnly: false }];
        }
        return {
            entry,
            owner: ownerManifest.publicEntries[entry],
            sourceEntry,
            sourceOwner: sourceEntry ? ownerByPath[sourceEntry] ?? null : null,
            targets,
            symbols,
        };
    });
    const activeOwnerSet = new Set([...nodesByPath.values()].map(({ owner }) => owner));
    const unusedOwnerRules = Object.keys(ownerManifest.owners)
        .filter((owner) => !activeOwnerSet.has(owner))
        .sort();
    if (unusedOwnerRules.length > 0) ownerDefects.push({ unusedOwnerRules });

    if (ownerDefects.length > 0) {
        throw new Error(
            `graph-v3: owner manifest does not assign exactly one owner to every graph file/public entry:\n${JSON.stringify(ownerDefects, null, 2)}`,
        );
    }

    stableSortEdges(internalEdges);
    stableSortEdges(externalEdges);
    unresolvedLocalReferences.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.edgeKind.localeCompare(right.edgeKind),
    );
    nonliteralLocalReferences.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0),
    );
    dynamicModuleReferences.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.edgeKind.localeCompare(right.edgeKind),
    );
    dynamicAssetReferences.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.edgeKind.localeCompare(right.edgeKind) ||
            left.expression.localeCompare(right.expression),
    );
    processInvocations.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            left.line - right.line ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.api.localeCompare(right.api),
    );
    unresolvedGlobPatterns.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.pattern.localeCompare(right.pattern),
    );
    parseErrors.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0),
    );
    unmodeledFileOperations.sort(
        (left, right) =>
            left.source.localeCompare(right.source) ||
            (left.line ?? 0) - (right.line ?? 0) ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.operation.localeCompare(right.operation),
    );

    const nodes = [...nodesByPath.values()].sort((left, right) => left.path.localeCompare(right.path));
    const allowedNodeKinds = new Set([
        "repository-file",
        "generated-by-write",
        "declared-package-output",
        "missing-runtime-placeholder",
        "directory",
    ]);
    const taxonomyDefects = nodes.flatMap((node) => {
        const defects = [];
        const generatorEdge = internalEdges.some(
            ({ source, target, edgeKind }) =>
                source === node.generatedBy &&
                target === node.path &&
                edgeKind === "generator-write",
        );
        if (!allowedNodeKinds.has(node.nodeKind)) {
            defects.push({ path: node.path, defect: "unknown-node-kind", nodeKind: node.nodeKind });
        }
        if (
            (node.nodeKind === "generated-by-write") !==
            (typeof node.generatedBy === "string" && generatorEdge)
        ) {
            defects.push({
                path: node.path,
                defect: "generated-by-write-provenance",
                nodeKind: node.nodeKind,
                generatedBy: node.generatedBy,
                generatorEdge,
            });
        }
        const expectedVirtualType = {
            "declared-package-output": "package-output",
            "missing-runtime-placeholder": "virtual-placeholder",
        }[node.nodeKind];
        if (expectedVirtualType && node.nodeType !== expectedVirtualType) {
            defects.push({
                path: node.path,
                defect: "virtual-kind-type-mismatch",
                nodeKind: node.nodeKind,
                nodeType: node.nodeType,
            });
        }
        if (
            node.nodeKind === "generated-by-write" &&
            !["generated-artifact", "directory"].includes(node.nodeType)
        ) {
            defects.push({
                path: node.path,
                defect: "generated-artifact-type-mismatch",
                nodeType: node.nodeType,
            });
        }
        if (
            [
                "generated-by-write",
                "declared-package-output",
                "missing-runtime-placeholder",
            ].includes(node.nodeKind) &&
            (!node.virtual || node.bytes !== null || node.sha256 !== null)
        ) {
            defects.push({
                path: node.path,
                defect: "virtual-provenance-carries-physical-payload",
                nodeKind: node.nodeKind,
                virtual: node.virtual,
                bytes: node.bytes,
                sha256: node.sha256,
            });
        }
        if (
            node.nodeKind === "repository-file" &&
            (node.virtual || node.generatedBy !== null)
        ) {
            defects.push({
                path: node.path,
                defect: "canonical-source-has-virtual-provenance",
                virtual: node.virtual,
                generatedBy: node.generatedBy,
            });
        }
        return defects;
    });
    const packageNode = nodesByPath.get("package.json");
    if (
        !packageNode ||
        packageNode.nodeKind !== "repository-file" ||
        packageNode.generatedBy !== null
    ) {
        taxonomyDefects.push({
            path: "package.json",
            defect: "canonical-rewritten-file-misclassified",
            nodeKind: packageNode?.nodeKind ?? null,
            generatedBy: packageNode?.generatedBy ?? null,
        });
    }
    if (taxonomyDefects.length > 0) {
        throw new Error(
            `graph-v3: node taxonomy is incomplete or conflated:\n${JSON.stringify(taxonomyDefects, null, 2)}`,
        );
    }
    const fileNodePaths = nodes.filter(({ nodeType }) => nodeType !== "directory").map(({ path }) => path);
    const edgeKindCounts = [...internalEdges, ...externalEdges].reduce((counts, edge) => {
        counts[edge.edgeKind] = (counts[edge.edgeKind] ?? 0) + 1;
        return counts;
    }, {});
    const nodeTypeCounts = nodes.reduce((counts, node) => {
        counts[node.nodeType] = (counts[node.nodeType] ?? 0) + 1;
        return counts;
    }, {});
    const nodeKindCounts = nodes.reduce((counts, node) => {
        counts[node.nodeKind] = (counts[node.nodeKind] ?? 0) + 1;
        return counts;
    }, {});
    const projectionCounts = nodes.reduce((counts, node) => {
        counts[node.projection] = (counts[node.projection] ?? 0) + 1;
        return counts;
    }, {});
    const projections = {
        eagerRuntime: makeProjection("eagerRuntime", fileNodePaths, internalEdges, ownerByPath),
        buildLoad: makeProjection("buildLoad", fileNodePaths, internalEdges, ownerByPath),
        ownership: makeProjection("ownership", fileNodePaths, internalEdges, ownerByPath),
    };
    const cycleRatchets = validateCycleRatchets(
        projections,
        ownerManifest.cycleBaselines,
    );
    if (!cycleRatchets.pass) {
        throw new Error(
            `graph-v3: SCC ratchet exceeded:\n${JSON.stringify(cycleRatchets.defects, null, 2)}`,
        );
    }
    const graph = {
        schema: "glass-ui-import-dag/3",
        observedAt: new Date().toISOString(),
        repositoryRoot: ".",
        ownerManifest: {
            path: portable(relative(outputDirectory, manifestPath)),
            schema: ownerManifest.schema,
            sha256: digest(ownerManifestBytes),
            owners: Object.keys(ownerManifest.owners).length,
            unusedOwners: unusedOwnerRules,
            publicEntries: Object.keys(ownerManifest.publicEntries).length,
        },
        scope: {
            fileUniverse:
                "Git-tracked files plus nonignored untracked files; ordinary ignored build, cache, screenshot, and test-result artifacts do not affect the graph. node_modules is always excluded.",
            projections: {
                product: ["src/**"],
                demo: ["demo/**", "!demo/vite.demo-dist.config.ts"],
                tests: ["tests/**"],
                visualTests: [
                    "tests-visual/**",
                    "!tests-visual/{.cache,test-results,node_modules}/**",
                    "!tests-visual/package.json",
                ],
                scriptsGenerators: ["scripts/**"],
                buildConfig: [
                    "demo/vite.demo-dist.config.ts",
                    "index.html",
                    "tsconfig*.json",
                    "vite*.ts",
                    "vitest.config.ts",
                ],
                packageSurface: ["package.json", "tests-visual/package.json"],
                repositoryBoundary: "Local targets reached outside the seven seed projections.",
            },
            edgeDefinition:
                "Vue/TypeScript AST imports, export-from, finite provenance-resolved dynamic imports, glob/worker/URL and provenance-backed require loaders; Vue external blocks, literal bound template assets, and static inline-style URLs with file-native line/column locations; HTML script entries; PostCSS imports and URLs; package/build/type/side-effect metadata; detectable filesystem and binding-proven child-process invocation targets.",
        },
        summary: {
            nodes: nodes.length,
            internalEdges: internalEdges.length,
            externalEdges: externalEdges.length,
            owners: uniqueSorted(Object.values(ownerByPath)).length,
            publicEntries: packageKeys.length,
            publicSymbols: publicReach.reduce((sum, entry) => sum + entry.symbols.length, 0),
            unresolvedLocalReferences: unresolvedLocalReferences.length,
            nonliteralLocalReferences: nonliteralLocalReferences.length,
            dynamicModuleReferences: dynamicModuleReferences.length,
            dynamicAssetReferences: dynamicAssetReferences.length,
            unresolvedGlobPatterns: unresolvedGlobPatterns.length,
            parseErrors: parseErrors.length,
            unmodeledFileOperations: unmodeledFileOperations.length,
            processInvocations: processInvocations.length,
            dynamicProcessArguments: processInvocations.reduce(
                (sum, invocation) => sum + invocation.dynamicArguments,
                0,
            ),
            nodeTypeCounts: Object.fromEntries(Object.entries(nodeTypeCounts).sort()),
            nodeKindCounts: Object.fromEntries(Object.entries(nodeKindCounts).sort()),
            projectionCounts: Object.fromEntries(Object.entries(projectionCounts).sort()),
            edgeKindCounts: Object.fromEntries(Object.entries(edgeKindCounts).sort()),
            eagerRuntimeFileCycles: projections.eagerRuntime.fileCycles.length,
            eagerRuntimeOwnerCycles: projections.eagerRuntime.ownerCycles.length,
            buildLoadFileCycles: projections.buildLoad.fileCycles.length,
            buildLoadOwnerCycles: projections.buildLoad.ownerCycles.length,
            ownershipFileCycles: projections.ownership.fileCycles.length,
            ownershipOwnerCycles: projections.ownership.ownerCycles.length,
        },
        nodes,
        internalEdges,
        externalEdges,
        unresolvedLocalReferences,
        nonliteralLocalReferences,
        dynamicModuleReferences,
        dynamicAssetReferences,
        unresolvedGlobPatterns,
        parseErrors,
        unmodeledFileOperations,
        processInvocations,
        packageSurface: {
            exports: packageExports,
            typesVersions: packageJson.typesVersions ?? {},
            sideEffects: {
                declaration: packageJson.sideEffects ?? false,
                matchedExportTargets: sideEffectTargets,
            },
            viteRollupEntries: buildEntryResult.entries,
        },
        publicReach,
        projections,
        cycleRatchets,
    };
    const canonical = JSON.stringify(
        { ...graph, observedAt: "<excluded-from-receipt>" },
        null,
        2,
    );
    graph.receiptSha256 = digest(canonical);
    return graph;
}

function markdownRows(record) {
    return Object.entries(record)
        .map(([name, count]) => `| \`${name}\` | ${count} |`)
        .join("\n");
}

function cycleRows(projections) {
    return Object.entries(projections)
        .map(
            ([name, projection]) =>
                `| \`${name}\` | ${projection.edgeCount} | ${projection.fileCycles.length} | ${projection.ownerCycles.length} |`,
        )
        .join("\n");
}

function sccRows(projections, cycleField) {
    const rows = Object.entries(projections).flatMap(([name, projection]) =>
        projection[cycleField].map((members, index) => {
            const renderedMembers = members.map((member) => `\`${member}\``).join("<br>");
            return `| \`${name}\` | ${index + 1} | ${members.length} | ${renderedMembers} |`;
        }),
    );
    return rows.length > 0 ? rows.join("\n") : "| — | — | — | None |";
}

function cycleRatchetRows(cycleRatchets) {
    return Object.entries(cycleRatchets.metrics)
        .flatMap(([view, metrics]) =>
            Object.entries(metrics).map(
                ([kind, values]) =>
                    `| \`${view}\` | \`${kind}\` | ${values.cyclicNodes}/${values.baselineCyclicNodes} | ${values.maxComponentSize}/${values.baselineMaxComponentSize} |`,
            ),
        )
        .join("\n");
}

function renderSummary(graph) {
    const buildOwnershipDegenerate =
        JSON.stringify(graph.projections.buildLoad.fileCycles) ===
            JSON.stringify(graph.projections.ownership.fileCycles) &&
        JSON.stringify(graph.projections.buildLoad.ownerCycles) ===
            JSON.stringify(graph.projections.ownership.ownerCycles);
    return `# Glass UI repository graph — schema v3

Observed: ${graph.observedAt}

Deterministic receipt (the \`observedAt\` value is excluded):
\`${graph.receiptSha256}\`

Owner manifest receipt: \`${graph.ownerManifest.sha256}\`

## Scope and result

This is the pre-source execution instrument required by BK PLAN §6. Its seven
seed projections are product, demo, tests, visual tests, scripts/generators,
build configuration, and package surface. Local targets outside those seeds are
added as repository-boundary nodes, so a boundary edge remains traversable.
The file universe is Git-tracked files plus nonignored untracked files.
Ordinary ignored build products, caches, screenshots, and test results cannot
change the payload; \`node_modules\` is excluded explicitly.

Vue SFCs are parsed with \`@vue/compiler-sfc\`, their script blocks with the
TypeScript AST, their templates with the Vue template AST, and CSS with
PostCSS. Block-relative parser locations are translated to exact file-native
line and column locations. Finite local dynamic-import values derived from
constants, collections, property access, string concatenation, template
expressions, and loops become exact edges; unresolved provenance fails closed
as potentially local. Literal Vite glob arrays retain negative patterns and
\`eager\`/\`import\`/\`query\` options. CSS imports retain layer, supports, and
media clauses. Every graph file matches exactly one checked owner rule and every
package export key maps to exactly one owner.

| Measure | Count |
| --- | ---: |
| Nodes | ${graph.summary.nodes} |
| Internal edges | ${graph.summary.internalEdges} |
| External edges | ${graph.summary.externalEdges} |
| Owners | ${graph.summary.owners} |
| Public entries | ${graph.summary.publicEntries} |
| Public symbols | ${graph.summary.publicSymbols} |
| Unresolved local references | ${graph.summary.unresolvedLocalReferences} |
| Nonliteral local references | ${graph.summary.nonliteralLocalReferences} |
| Dynamic nonlocal module references | ${graph.summary.dynamicModuleReferences} |
| Dynamic template/style asset expressions | ${graph.summary.dynamicAssetReferences} |
| Unmatched literal globs | ${graph.summary.unresolvedGlobPatterns} |
| Parse errors | ${graph.summary.parseErrors} |
| Detectable-but-unmodeled file operations | ${graph.summary.unmodeledFileOperations} |
| Process invocations | ${graph.summary.processInvocations} |
| Dynamic process arguments | ${graph.summary.dynamicProcessArguments} |

## Node types

Physical/content types remain separate from lifecycle provenance:

| Type | Count |
| --- | ---: |
${markdownRows(graph.summary.nodeTypeCounts)}

## Node lifecycle taxonomy

| Kind | Count |
| --- | ---: |
${markdownRows(graph.summary.nodeKindCounts)}

\`repository-file\` is canonical source content even when a tool rewrites it
(for example, \`package.json\`). \`generated-by-write\` requires a real modeled
\`generator-write\` edge and names that generator in \`generatedBy\`.
\`declared-package-output\` is a pre-build package declaration, while
\`missing-runtime-placeholder\` is a missing path referenced by a test,
runtime, or ordinary file operation. Directories remain explicit rather than
masquerading as generated files. Every node belongs to exactly one lifecycle
kind; a generated directory therefore retains physical type \`directory\` and
lifecycle kind \`generated-by-write\`. Generated and declared output nodes are
virtual, provenance-defined graph facts: an ignored physical build artifact
never supplies their bytes, hash, or type.

## Joinable projections

| Projection | Nodes |
| --- | ---: |
${markdownRows(graph.summary.projectionCounts)}

Every node carries one \`projection\` and one \`owner\`; every internal edge
carries its source/target, semantic \`edgeKind\`, boundary class, and membership
in the three SCC views. That makes product/demo/test/visual/script/build/package
queries directly joinable without conflating them.

## Edge kinds

| Edge kind | Count |
| --- | ---: |
${markdownRows(graph.summary.edgeKindCounts)}

## Separate SCC views

| View | Edges | File cycles | Owner cycles |
| --- | ---: | ---: | ---: |
${cycleRows(graph.projections)}

\`eagerRuntime\` excludes type-only, lazy, CSS/asset, and generator reach.
\`buildLoad\` adds compile/load/package/generator relations.
\`ownership\` retains every internal dependency, including assets. Type-erased
and lazy edges therefore remain visible as ownership constraints even when
they do not create eager runtime cycles. The build-load and ownership
projections are definitionally distinct: ownership includes asset, template,
and URL relations that build-load excludes. Their cycle memberships in this
snapshot are ${buildOwnershipDegenerate ? "nevertheless identical (degenerate)" : "not identical"};
their edge counts remain independently reported above.

### File-cycle membership

| View | Cycle | Size | Members |
| --- | ---: | ---: | --- |
${sccRows(graph.projections, "fileCycles")}

### Owner-cycle membership

| View | Cycle | Size | Members |
| --- | ---: | ---: | --- |
${sccRows(graph.projections, "ownerCycles")}

### SCC containment ratchets

Current/baseline counts below are cyclic-node totals and maximum component
sizes. The checked manifest permits removals and splits, but rejects a new
member, a merge of previously separate baseline components, total cyclic-node
growth, or maximum-SCC growth.

| View | Kind | Cyclic nodes | Maximum SCC |
| --- | --- | ---: | ---: |
${cycleRatchetRows(graph.cycleRatchets)}

## Package and public-symbol reach

\`packageSurface\` records every \`exports\` condition target,
\`typesVersions\`, \`sideEffects\`, and the Vite/Rolldown entry map obtained from
the repository's fail-closed subpath policy. \`publicReach\` joins each package
key to its owner, source entry, output targets, and AST-derived exported symbol
set. Whenever a source entry resolves, its node owner must equal the manifest's
declared public owner. CSS and font entries carry an explicit asset symbol.

## Failure contract and bounded limitations

Generation exits non-zero for an unowned or multiply owned graph file, a
package key without exactly one owner, an unresolved literal local reference,
an unmatched positive glob, a nonliteral local loader/worker/URL, or a parser
error, including TypeScript syntactic diagnostics. Generator filesystem calls
are modeled when their path expression can be
reduced from literals, \`resolve\`/\`join\`, \`new URL(..., import.meta.url)\`,
and local constants; irreducibly dynamic operations remain counted in
\`unmodeledFileOperations\` and are not represented as false edges. This
snapshot contains ${graph.summary.unmodeledFileOperations} such operations
(251 at the pre-source challenge seal). Literal CommonJS \`require\` and
\`createRequire\` targets are graph edges; \`exec\`/\`execFile\`/\`spawn\`
families are retained in a process-invocation ledger with statically reducible
command and argv targets plus an explicit dynamic-argument count. Dynamic
nonlocal module references are also ledgered, not falsely resolved into local
edges. Unknown dynamic-import provenance is conservatively treated as local and
therefore fails the generation contract. Literal Vue bindings and static
inline-style \`url()\` values become
asset edges; dynamic template or style asset expressions are retained in
\`dynamicAssetReferences\` rather than silently omitted.

Runtime template bindings that can resolve to network data are not guessed to
be local assets. Generated-write artifacts, declared package outputs, missing
runtime placeholders, and directories have distinct lifecycle kinds; a
generator's own file remains canonical source. Package outputs under \`dist/\`
remain virtual declarations because this is a pre-build source graph, whether
or not an ordinary ignored build has populated those paths on disk.

The instrument is intentionally visible inside its own measurement boundary:
its architecture test imports the generator, and literal manifest/package
loads are ordinary graph edges. The emitted JSON and Markdown artifacts remain
excluded from seed discovery to avoid a recursive receipt in which the graph
hashes itself. The round-one machine JSON was approximately 4.7 MB; the
binding, asset-expression, lifecycle, and ratchet ledgers bring this snapshot
to approximately 4.85 MB. That size is accepted because the tranche requires a
committed, exact every-node/every-edge snapshot, and the preserved v1/v2
machine receipts establish the same audit pattern.

The machine-readable graph contains every node, edge, defect ledger, package
relation, public symbol, file SCC, and owner SCC. Pass 1 and v2 remain separate
historical artifacts and are not rewritten by this generator.
`;
}

function normalizedGraphPayload(graph) {
    return JSON.stringify(
        { ...graph, observedAt: "<normalized-for-check>" },
        null,
        2,
    );
}

async function main() {
    const options = parseArguments(process.argv.slice(2));
    const graph = await buildGraph(options);
    const defects =
        graph.unresolvedLocalReferences.length +
        graph.nonliteralLocalReferences.length +
        graph.unresolvedGlobPatterns.length +
        graph.parseErrors.length;
    if (defects > 0) {
        process.stderr.write(
            `${JSON.stringify(
                {
                    unresolvedLocalReferences: graph.unresolvedLocalReferences,
                    nonliteralLocalReferences: graph.nonliteralLocalReferences,
                    unresolvedGlobPatterns: graph.unresolvedGlobPatterns,
                    parseErrors: graph.parseErrors,
                },
                null,
                2,
            )}\n`,
        );
        process.exitCode = 1;
        return;
    }
    const jsonPath = join(options.outputDirectory, "IMPORT-DAG-V3.json");
    const summaryPath = join(options.outputDirectory, "IMPORT-DAG-V3-SUMMARY.md");
    if (options.check) {
        if (!existsSync(jsonPath)) throw new Error("graph-v3: IMPORT-DAG-V3.json is absent");
        const recorded = JSON.parse(readFileSync(jsonPath, "utf8"));
        if (normalizedGraphPayload(recorded) !== normalizedGraphPayload(graph)) {
            throw new Error(
                `graph-v3: stored JSON payload differs from the recomputed graph (recorded receipt ${recorded.receiptSha256}; current ${graph.receiptSha256})`,
            );
        }
        if (!existsSync(summaryPath)) {
            throw new Error("graph-v3: IMPORT-DAG-V3-SUMMARY.md is absent");
        }
        const recordedSummary = readFileSync(summaryPath, "utf8");
        const currentSummary = renderSummary({
            ...graph,
            observedAt: recorded.observedAt,
        });
        if (recordedSummary !== currentSummary) {
            throw new Error(
                "graph-v3: stored human summary differs from the recomputed graph",
            );
        }
    } else {
        writeFileSync(jsonPath, `${JSON.stringify(graph, null, 2)}\n`);
        writeFileSync(summaryPath, renderSummary(graph));
    }
    process.stdout.write(`${JSON.stringify(graph.summary, null, 2)}\n`);
    process.stdout.write(`receiptSha256=${graph.receiptSha256}\n`);
}

function isCliInvocation(entryPath) {
    if (!entryPath) return false;
    try {
        return (
            realpathSync(fileURLToPath(import.meta.url)) ===
            realpathSync(resolve(entryPath))
        );
    } catch {
        return false;
    }
}

const isCli = isCliInvocation(process.argv[1]);
if (isCli) {
    main().catch((error) => {
        process.stderr.write(`${error.stack ?? error.message}\n`);
        process.exitCode = 1;
    });
}
