import { createHash, randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
    existsSync,
    closeSync,
    fstatSync,
    fsyncSync,
    lstatSync,
    mkdirSync,
    openSync,
    realpathSync,
    readFileSync,
    readSync,
    readdirSync,
    renameSync,
    rmdirSync,
    statSync,
    unlinkSync,
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
const canonicalGraphGeneratorPath =
    "docs/tranches/BJ/audits/2026-07-28-library-dag/build-import-dag-v3.mjs";
const graphOwnerManifestPath =
    "docs/tranches/BJ/audits/2026-07-28-library-dag/OWNER-MANIFEST.json";
const emittedGraphArtifactPaths = new Set([
    "docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3.json",
    "docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3-SUMMARY.md",
]);
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
    "fork",
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

function forceEsModuleParsing(path) {
    const extension = extname(path).toLowerCase();
    return extension === ".mjs" || extension === ".mts";
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

function unwrapTransparentSyntax(node) {
    let current = node;
    while (
        current &&
        (ts.isParenthesizedExpression(current) ||
            ts.isAsExpression(current) ||
            ts.isTypeAssertionExpression(current) ||
            ts.isSatisfiesExpression(current) ||
            ts.isNonNullExpression(current))
    ) {
        current = current.expression;
    }
    return current;
}

function numericPropertyKey(node) {
    const current = unwrapTransparentSyntax(node);
    if (ts.isNumericLiteral(current)) {
        const value = Number(current.text.replaceAll("_", ""));
        return Number.isFinite(value) ? String(value) : null;
    }
    if (
        ts.isPrefixUnaryExpression(current) &&
        [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(current.operator)
    ) {
        const operand = unwrapTransparentSyntax(current.operand);
        if (!ts.isNumericLiteral(operand)) return null;
        const magnitude = Number(operand.text.replaceAll("_", ""));
        if (!Number.isFinite(magnitude)) return null;
        return String(current.operator === ts.SyntaxKind.MinusToken ? -magnitude : magnitude);
    }
    if (ts.isBigIntLiteral(current)) {
        try {
            return String(BigInt(current.text.replace(/n$/i, "")));
        } catch {
            return null;
        }
    }
    if (
        ts.isPrefixUnaryExpression(current) &&
        current.operator === ts.SyntaxKind.MinusToken &&
        ts.isBigIntLiteral(unwrapTransparentSyntax(current.operand))
    ) {
        try {
            return String(-BigInt(unwrapTransparentSyntax(current.operand).text.replace(/n$/i, "")));
        } catch {
            return null;
        }
    }
    return null;
}

const unknownProperty = Symbol("unknown-property");

function exactPropertyKey(node, allowIdentifier = true) {
    let current = unwrapTransparentSyntax(node);
    if (ts.isComputedPropertyName(current)) {
        return exactPropertyKey(current.expression, false);
    }
    const string = literalString(current);
    if (string !== null) return string;
    const numeric = numericPropertyKey(current);
    if (numeric !== null) return numeric;
    if (current.kind === ts.SyntaxKind.NullKeyword) return "null";
    if (current.kind === ts.SyntaxKind.TrueKeyword) return "true";
    if (current.kind === ts.SyntaxKind.FalseKeyword) return "false";
    return allowIdentifier && ts.isIdentifier(current)
        ? current.text
        : unknownProperty;
}

const exactProperty = (left, right) =>
    left === unknownProperty || right === unknownProperty
        ? left === right
        : String(left) === String(right);
const overlappingProperty = (left, right) =>
    left === unknownProperty ||
    right === unknownProperty ||
    exactProperty(left, right);

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
        if (clause.namedBindings.elements.length === 0 && !clause.isTypeOnly) {
            return [{ name: "*side-effect*", typeOnly: false }];
        }
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
const fsModules = new Set(["fs", "node:fs", "fs/promises", "node:fs/promises"]);
const promiseFsModules = new Set(["fs/promises", "node:fs/promises"]);
const pathModules = new Set(["path", "node:path"]);
const processModules = new Set(["process", "node:process"]);
const urlModules = new Set(["url", "node:url"]);
const builtinRootNames = new Map(
    ["fs", "path", "child_process", "module", "url"].flatMap((name) => [
        [name, name],
        [`node:${name}`, name],
    ]).concat([
        ["fs/promises", "fs-promises"],
        ["node:fs/promises", "fs-promises"],
    ]),
);
const canonicalBuiltinRoot = (moduleName) => builtinRootNames.get(moduleName) ?? null;
const builtinCanonicalRoots = new Set([
    "fs",
    "fs-promises",
    "path",
    "child_process",
    "module",
    "url",
]);
const esmModulesByRoot = new Map([
    ["fs", ["fs", "node:fs"]],
    ["fs-promises", ["fs/promises", "node:fs/promises"]],
    ["path", ["path", "node:path"]],
    ["child_process", ["child_process", "node:child_process"]],
    ["url", ["url", "node:url"]],
    ["module", ["module", "node:module"]],
]);
const builtinMemberKinds = new Set(["fs-member", "path-member", "module-member", "url-member", "create-require-factory", "fs-promises-namespace", "fs-promises-property"]);
const pathMemberNames = new Set(["dirname", "join", "resolve"]);
const fsOperationNames = new Set([
    ...fsReadNames,
    ...fsWriteNames,
    ...fsCopyNames,
    "rm",
    "rmSync",
]);
const promiseFsOperationNames = new Set([
    "readFile",
    "readdir",
    "stat",
    "appendFile",
    "mkdir",
    "writeFile",
    "copyFile",
    "cp",
    "rm",
]);
const fsDeleteNames = new Set(["rm", "rmSync"]);

function createBindingResolver(sourceFile, options = {}) {
    const scopeByNode = new Map();
    let parameterValues = options.parameterValues ?? new Map();
    let dynamicImportResolver = options.dynamicImportResolver ?? null;
    let configurationRevision = 0;
    let finalizedConfigurationRevision = -1;
    let finalizingWrites = false;
    const repositoryRoot = options.repositoryRoot ?? process.cwd();
    const iterateInitialProperty = Symbol("iterate-initial-property");
    const rootScope = {
        node: sourceFile,
        parent: null,
        bindings: new Map(),
        parameterBindings: new Map(),
        functionScope: null,
        kind: "module",
    };
    rootScope.functionScope = rootScope;
    const logicalAssignmentOperators = new Set([
        ts.SyntaxKind.AmpersandAmpersandEqualsToken,
        ts.SyntaxKind.BarBarEqualsToken,
        ts.SyntaxKind.QuestionQuestionEqualsToken,
    ]);
    const assignmentOperators = new Set([
        ts.SyntaxKind.EqualsToken,
        ts.SyntaxKind.PlusEqualsToken,
        ts.SyntaxKind.MinusEqualsToken,
        ts.SyntaxKind.AsteriskEqualsToken,
        ts.SyntaxKind.AsteriskAsteriskEqualsToken,
        ts.SyntaxKind.SlashEqualsToken,
        ts.SyntaxKind.PercentEqualsToken,
        ts.SyntaxKind.LessThanLessThanEqualsToken,
        ts.SyntaxKind.GreaterThanGreaterThanEqualsToken,
        ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
        ts.SyntaxKind.AmpersandEqualsToken,
        ts.SyntaxKind.BarEqualsToken,
        ts.SyntaxKind.CaretEqualsToken,
        ...logicalAssignmentOperators,
    ]);

    const canonicalRootModule = (moduleName, imported) => {
        if (!["REPO_ROOT", "ROOT"].includes(imported)) return false;
        if (!moduleName.startsWith(".")) return false;
        const sourceAbsolute = resolve(repositoryRoot, sourceFile.fileName);
        const importedPath = portable(resolve(dirname(sourceAbsolute), moduleName));
        return new Set([
            portable(resolve(repositoryRoot, "scripts/lib/subpath-policy.mjs")),
            portable(resolve(repositoryRoot, "scripts/lib/canon-doc.mjs")),
        ]).has(importedPath);
    };
    const directImportProvenance = (moduleName, imported) => {
        if (canonicalRootModule(moduleName, imported)) {
            return { kind: "repository-root" };
        }
        if (processModules.has(moduleName) && imported === "default") {
            return { kind: "process-global", moduleName };
        }
        const builtinRoot = canonicalBuiltinRoot(moduleName);
        if (builtinRoot && imported === "default") {
            return {
                kind: "cjs-module-namespace",
                moduleName,
                cjsRoot: builtinRoot,
            };
        }
        if (
            (pathModules.has(moduleName) || fsModules.has(moduleName)) &&
            imported === "promises" &&
            (moduleName === "fs" || moduleName === "node:fs")
        ) {
            return {
                kind: "fs-promises-namespace",
                moduleName,
                cjsRoot: "fs-promises",
                esmRoot: moduleName,
            };
        }
        if (childProcessModules.has(moduleName) && processExecutionNames.has(imported)) {
            return { kind: "module-member", moduleName, member: imported };
        }
        if (nodeModuleModules.has(moduleName) && imported === "createRequire") {
            return { kind: "create-require-factory", moduleName, member: imported };
        }
        if (
            nodeModuleModules.has(moduleName) &&
            imported === "syncBuiltinESMExports"
        ) {
            return { kind: "module-member", moduleName, member: imported };
        }
        if (pathModules.has(moduleName) && pathMemberNames.has(imported)) {
            return { kind: "path-member", moduleName, member: imported };
        }
        if (processModules.has(moduleName) && ["cwd", "chdir"].includes(imported)) {
            return { kind: "process-member", moduleName, member: imported };
        }
        if (urlModules.has(moduleName) && imported === "fileURLToPath") {
            return { kind: "url-member", moduleName, member: imported };
        }
        if (
            promiseFsModules.has(moduleName) &&
            fsOperationNames.has(imported) &&
            !promiseFsOperationNames.has(imported)
        ) {
            return {
                kind: "unsupported-fs-promises-member",
                moduleName,
                member: imported,
            };
        }
        if (fsModules.has(moduleName) && fsOperationNames.has(imported)) {
            return { kind: "fs-member", moduleName, member: imported };
        }
        if (
            childProcessModules.has(moduleName) ||
            nodeModuleModules.has(moduleName) ||
            fsModules.has(moduleName) ||
            pathModules.has(moduleName) ||
            processModules.has(moduleName) ||
            urlModules.has(moduleName)
        ) {
            return { kind: "module", moduleName };
        }
        return { kind: "local-import-member", moduleName, member: imported };
    };
    const bindingPropertyKey = (
        node,
        scope,
        seen = new Set(),
        valueContext = false,
    ) => {
        const unwrapped = unwrapTransparentSyntax(node);
        const computed = ts.isComputedPropertyName(unwrapped);
        const current = computed ? unwrapped.expression : unwrapped;
        const direct = exactPropertyKey(current, !computed && !valueContext);
        if (direct !== unknownProperty) return direct;
        if (!ts.isIdentifier(current)) return unknownProperty;
        let currentScope = scope;
        while (currentScope && !currentScope.bindings.has(current.text)) {
            currentScope = currentScope.parent;
        }
        const record = currentScope?.bindings.get(current.text);
        return record?.initializer && !seen.has(record)
            ? bindingPropertyKey(
                  record.initializer,
                  record.scope,
                  new Set(seen).add(record),
                  true,
              )
            : current.text === "undefined" && !record
              ? "undefined"
              : unknownProperty;
    };
    const registerPattern = (
        name,
        scope,
        initializer,
        propertyPath = [],
        iterate = false,
        kind = "variable",
        parameterIndex = null,
        defaultInitializer = null,
        propertyDefaults = [],
    ) => {
        if (ts.isIdentifier(name)) {
            const record = {
                kind,
                initializer,
                propertyPath,
                propertyDefaults,
                assignmentSources: [],
                unknownWrite: false,
                unknownWriteSites: [],
                rootDefaultInitializer: defaultInitializer,
                iterate,
                tainted: false,
                taintedFsMember: null,
                taintedFsNamespace: null,
                written: false,
                propertyWritten: false,
                scope,
                declaration: name,
                parameterIndex,
                defaultInitializer,
            };
            scope.bindings.set(name.text, record);
            if (kind === "parameter") scope.parameterBindings.set(name.text, record);
            return;
        }
        if (ts.isObjectBindingPattern(name)) {
            for (const element of name.elements) {
                if (element.dotDotDotToken) {
                    registerPattern(element.name, scope, null);
                    continue;
                }
                const property = element.propertyName
                    ? bindingPropertyKey(element.propertyName, scope)
                    : null;
                const shorthand = ts.isIdentifier(element.name) ? element.name.text : null;
                registerPattern(
                    element.name,
                    scope,
                    initializer,
                    [...propertyPath, element.propertyName ? property : shorthand],
                    iterate,
                    kind,
                    parameterIndex,
                    defaultInitializer,
                    [...propertyDefaults, element.initializer ?? null],
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
                    kind,
                    parameterIndex,
                    defaultInitializer,
                    [...propertyDefaults, element.initializer ?? null],
                );
            }
        }
    };
    const createsScope = (node) =>
        ts.isFunctionLike(node) ||
        ts.isBlock(node) ||
        ts.isModuleBlock(node) ||
        ts.isCatchClause(node) ||
        ts.isForStatement(node) ||
        ts.isForInStatement(node) ||
        ts.isForOfStatement(node) ||
        ts.isSwitchStatement(node) ||
        ts.isClassExpression(node);

    function walk(node, parentScope) {
        if (ts.isFunctionDeclaration(node) && node.name) {
            parentScope.bindings.set(node.name.text, {
                kind: "local",
                declaration: node.name,
                functionNode: node,
            });
        } else if (ts.isClassDeclaration(node) && node.name) {
            parentScope.bindings.set(node.name.text, {
                kind: "local",
                declaration: node.name,
            });
        }
        const scope =
            node !== sourceFile && createsScope(node)
                ? {
                      node,
                      parent: parentScope,
                      bindings: new Map(),
                      parameterBindings: new Map(),
                      functionScope: ts.isFunctionLike(node)
                          ? null
                          : parentScope.functionScope,
                      kind: ts.isFunctionLike(node)
                          ? "function"
                          : ts.isModuleBlock(node)
                            ? "module"
                            : "lexical",
                  }
                : parentScope;
        if (scope.functionScope === null) scope.functionScope = scope;
        scopeByNode.set(node, scope);

        if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier)) {
            const moduleName = node.moduleSpecifier.text;
            const clause = node.importClause;
            if (clause && !clause.isTypeOnly) {
                if (clause.name) {
                    scope.bindings.set(clause.name.text, {
                        ...directImportProvenance(moduleName, "default"),
                        declaration: clause.name,
                    });
                }
                if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
                    scope.bindings.set(clause.namedBindings.name.text, {
                        kind: processModules.has(moduleName)
                            ? "process-global"
                            : "module-namespace",
                        moduleName,
                        declaration: clause.namedBindings.name,
                    });
                } else if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
                    for (const element of clause.namedBindings.elements) {
                        if (element.isTypeOnly) continue;
                        scope.bindings.set(
                            element.name.text,
                            {
                                ...directImportProvenance(
                                    moduleName,
                                    element.propertyName?.text ?? element.name.text,
                                ),
                                declaration: element.name,
                                imported: element.propertyName?.text ?? element.name.text,
                            },
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
            const declarationScope =
                ts.isVariableDeclarationList(node.parent) &&
                !(node.parent.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const))
                    ? scope.functionScope
                    : scope;
            registerPattern(
                node.name,
                declarationScope,
                node.initializer ?? forOf?.expression ?? null,
                [],
                Boolean(forOf && !node.initializer),
            );
        } else if (ts.isParameter(node)) {
            registerPattern(
                node.name,
                scope,
                null,
                [],
                false,
                "parameter",
                node.parent.parameters.indexOf(node),
                node.initializer ?? null,
            );
        }
        if (
            scope !== parentScope &&
            (ts.isFunctionExpression(node) || ts.isClassExpression(node)) &&
            node.name
        ) {
            scope.bindings.set(node.name.text, { kind: "local" });
        }
        ts.forEachChild(node, (child) => walk(child, scope));
    }
    walk(sourceFile, rootScope);

    const parameterContext = (node) => {
        let current = node;
        while (current) {
            if (ts.isParameter(current)) {
                return current.parent;
            }
            current = current.parent;
        }
        return null;
    };

    const lookup = (name, node) => {
        let scope = scopeByNode.get(node) ?? rootScope;
        while (scope) {
            if (scope.bindings.has(name)) return scope.bindings.get(name);
            scope = scope.parent;
        }
        return null;
    };
    const lookupInitial = (name, node) => {
        let scope = scopeByNode.get(node) ?? rootScope;
        const parameterInfo = parameterContext(node);
        while (scope) {
            if (parameterInfo && scope.node === parameterInfo) {
                if (scope.parameterBindings.has(name)) {
                    return scope.parameterBindings.get(name);
                }
                scope = scope.parent;
                continue;
            }
            if (scope.bindings.has(name)) return scope.bindings.get(name);
            scope = scope.parent;
        }
        return null;
    };
    const functionNodeFor = (node) =>
        scopeByNode.get(node)?.functionScope?.node ?? rootScope;
    const uncertainContext = (site) => {
        if (!site) return true;
        let current = site;
        while (current && current !== sourceFile) {
            if (
                ts.isIfStatement(current) ||
                ts.isConditionalExpression(current) ||
                ts.isSwitchStatement(current) ||
                ts.isCaseClause(current) ||
                ts.isForStatement(current) ||
                ts.isForInStatement(current) ||
                ts.isForOfStatement(current) ||
                ts.isWhileStatement(current) ||
                ts.isDoStatement(current) ||
                ts.isTryStatement(current) ||
                ts.isCatchClause(current)
            ) return true;
            if (
                ts.isBinaryExpression(current) &&
                [
                    ts.SyntaxKind.AmpersandAmpersandToken,
                    ts.SyntaxKind.BarBarToken,
                    ts.SyntaxKind.QuestionQuestionToken,
                ].includes(current.operatorToken.kind) &&
                current.right.getStart(sourceFile) <= site.getStart(sourceFile)
            ) return true;
            current = current.parent;
        }
        return false;
    };
    const uncertainWrite = (site, record) => {
        if (!site) return true;
        const recordFunction =
            record?.scope?.functionScope?.node ?? functionNodeFor(record?.declaration);
        return functionNodeFor(site) !== recordFunction || uncertainContext(site);
    };
    const writeAppliesAt = (write, useNode) => {
        if (!write.site || !useNode) return true;
        if (functionNodeFor(write.site) !== functionNodeFor(useNode)) return true;
        return write.site.getStart(sourceFile) < useNode.getStart(sourceFile);
    };
    const writeIsDefiniteAt = (write, useNode) => {
        if (!write.may) return true;
        if (!write.site || !useNode || !ts.isForOfStatement(write.site)) return false;
        let current = useNode;
        while (current && current !== sourceFile) {
            if (current === write.site.statement) return true;
            current = current.parent;
        }
        return false;
    };
    const latestDefiniteWrite = (record, useNode, predicate = () => true) =>
        (record?.assignmentSources ?? []).filter(
            (write) =>
                writeAppliesAt(write, useNode) &&
                writeIsDefiniteAt(write, useNode) &&
                !write.crossFunction &&
                predicate(write),
        ).at(-1) ?? null;
    const isUnshadowedUndefined = (node, useNode = node, initial = false) => {
        const current = unwrapTransparentSyntax(node);
        return (
            ts.isIdentifier(current) &&
            current.text === "undefined" &&
            (initial ? lookupInitial : lookup)("undefined", useNode) === null
        );
    };
    const resolvedPropertyKey = (
        node,
        useNode = node,
        allowIdentifier = true,
        seen = new Set(),
    ) => {
        const unwrapped = unwrapTransparentSyntax(node);
        const computed = ts.isComputedPropertyName(unwrapped);
        const current = computed ? unwrapped.expression : unwrapped;
        const direct = exactPropertyKey(current, computed ? false : allowIdentifier);
        if (direct !== unknownProperty) return direct;
        if (
            ts.isIdentifier(current) &&
            current.text === "undefined" &&
            lookup("undefined", useNode) === null
        ) return "undefined";
        const evaluated = staticValueResolver?.(current, useNode);
        const values = evaluated && ["strings", "primitive"].includes(evaluated.kind)
            ? evaluated.values
            : [];
        if (
            values.length === 1 &&
            (values[0] === null ||
                values[0] === undefined ||
                ["string", "number", "boolean", "bigint"].includes(typeof values[0]))
        ) return String(values[0]);
        if (!ts.isIdentifier(current)) return unknownProperty;
        const record = lookupInitial(current.text, useNode);
        if (
            !record ||
            seen.has(record) ||
            record.written ||
            record.propertyWritten ||
            record.unknownWrite ||
            record.assignmentSources?.length
        ) return unknownProperty;
        const initializer = record.initializer ?? record.defaultInitializer;
        return initializer
            ? resolvedPropertyKey(
                  initializer,
                  record.declaration,
                  false,
                  new Set(seen).add(record),
              )
            : unknownProperty;
    };
    const provenanceFields = [
        "kind",
        "moduleName",
        "member",
        "loader",
        "value",
        "cjsRoot",
        "esmRoot",
        "parentRoot",
        "capturedAt",
        "specifiers",
        "functionNode",
    ];
    const immutableProvenance = (value) => {
        if (!value || typeof value !== "object") return { kind: "local" };
        const provenance = {};
        for (const key of provenanceFields) {
            if (key in value) {
                provenance[key] = key === "specifiers" && Array.isArray(value[key])
                    ? [...value[key]]
                    : value[key];
            }
        }
        return provenance;
    };
    const originMember = (base, name, captureNode = null) => {
        if (base.kind === "module" || base.kind === "module-namespace") {
            return directImportProvenance(base.moduleName, name);
        }
        if (base.kind === "fs-promises-namespace") {
            const resolved = directImportProvenance("fs/promises", name);
            return resolved.kind === "fs-member"
                ? { ...resolved, cjsRoot: "fs-promises" }
                : resolved;
        }
        if (base.kind === "fs-promises-property") {
            const resolved = directImportProvenance("fs/promises", name);
            return resolved.kind === "fs-member"
                ? {
                      ...resolved,
                      cjsRoot: "fs-promises",
                      parentRoot: "fs",
                      capturedAt: base.capturedAt ?? captureNode,
                  }
                : resolved;
        }
        if (base.kind === "cjs-module-namespace") {
            const resolved = directImportProvenance(base.moduleName, name);
            if (base.cjsRoot === "fs" && name === "promises") {
                return {
                    kind: "fs-promises-property",
                    moduleName: base.moduleName,
                    cjsRoot: "fs",
                    capturedAt: captureNode,
                };
            }
            if (resolved.kind === "fs-promises-namespace") {
                return { ...resolved, cjsRoot: "fs-promises", esmRoot: null };
            }
            return builtinMemberKinds.has(resolved.kind)
                ? { ...resolved, cjsRoot: base.cjsRoot }
                : resolved;
        }
        if (base.kind === "process-global" && ["cwd", "chdir"].includes(name)) {
            return { kind: "process-member", moduleName: "runtime", member: name };
        }
        if (base.kind === "require-loader" && name === "resolve") {
            return { kind: "require-resolve", loader: base.loader };
        }
        return { kind: "local" };
    };
    const mutationProperty = (node) => {
        if (ts.isPropertyAccessExpression(node)) return node.name.text;
        if (!ts.isElementAccessExpression(node) || !node.argumentExpression) {
            return unknownProperty;
        }
        return resolvedPropertyKey(node.argumentExpression, node, false);
    };
    const mutationReceiverPrefixes = (node, property = undefined) => {
        const receiverNodes = [];
        const path = [];
        let current = unwrapTransparentSyntax(node);
        while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
            path.unshift(mutationProperty(current));
            receiverNodes.push(current);
            current = unwrapTransparentSyntax(current.expression);
        }
        receiverNodes.push(current);
        const suffix = property !== undefined ? [...path, property] : path;
        return receiverNodes.map((receiver, index) => ({
            receiver: unwrapTransparentSyntax(receiver),
            properties: suffix.slice(path.length - index),
        }));
    };
    const selectMutationReceivers = (node, property, expressionResolver, useNode = node) => {
        for (const candidate of mutationReceiverPrefixes(node, property)) {
            if (
                candidate.properties.length === 0 &&
                (ts.isPropertyAccessExpression(candidate.receiver) ||
                    ts.isElementAccessExpression(candidate.receiver))
            ) continue;
            const resolved = expressionResolver(candidate.receiver, useNode);
            const provenances = Array.isArray(resolved) ? resolved : [resolved];
            const matches = provenances.filter(
                (provenance) =>
                    provenance.kind === "process-global" ||
                    (provenance.kind === "cjs-module-namespace" &&
                        builtinCanonicalRoots.has(provenance.cjsRoot)) ||
                    (provenance.kind === "fs-promises-namespace" &&
                        builtinCanonicalRoots.has(provenance.cjsRoot)) ||
                    (provenance.kind === "fs-promises-property" &&
                        provenance.cjsRoot === "fs" &&
                        candidate.properties.length > 0),
            );
            if (matches.length > 0) {
                return matches.map((provenance) => ({
                    provenance: provenance.kind === "fs-promises-property"
                        ? { ...provenance, cjsRoot: "fs-promises" }
                        : provenance,
                    properties: candidate.properties,
                }));
            }
        }
        return [];
    };
    const sharedMutations = [];
    const mutationEffects = [];
    let projectedMutationIndex = null;
    let projectedMutationEntries = null;
    let containerIdentityIndex = null;
    let canonicalContainerCache = new WeakMap();
    const runtimeCallSites = [];
    const runtimeEffects = [];
    const invalidateProjectionCaches = () => {
        canonicalContainerCache = new WeakMap();
        containerIdentityIndex = null;
        projectedMutationIndex = null;
        projectedMutationEntries = null;
    };
    const mutationAppliesAt = (mutation, useNode) => {
        if (mutation.crossFunction || !mutation.site || !useNode) return true;
        if (functionNodeFor(mutation.site) !== functionNodeFor(useNode)) return true;
        return mutation.site.getStart(sourceFile) < useNode.getStart(sourceFile);
    };
    const capturedBuiltinReplacement = (provenance, site) =>
        site &&
        ["fs-member", "path-member", "module-member", "url-member", "process-member"].includes(
            provenance.kind,
        )
            ? { ...provenance, capturedAt: site }
            : provenance;
    const replacementProvenances = (mutation, useNode) =>
        mutation?.replacementKnown && !mutation.definitelyUndefined
            ? projectInitialCases(
                  mutation.replacement,
                  mutation.site ?? useNode ?? mutation.replacement,
                  new Set([mutation]),
              ).map(({ provenance }) =>
                  capturedBuiltinReplacement(provenance, mutation.site),
              )
            : [];
    const replacementPreservesMember = (root, properties, mutation, useNode) => {
        if (!mutation?.replacementKnown || mutation.definitelyUndefined || properties.length !== 1) {
            return false;
        }
        const replacements = replacementProvenances(mutation, useNode);
        if (replacements.length === 0) return false;
        return replacements.every((replacement) => {
            if (replacement.kind === "local" || replacement.kind.startsWith("tainted-")) return false;
            if (replacement.member !== properties[0]) return false;
            if (root === "process") return replacement.kind === "process-member";
            if (root === "fs" && properties[0] === "promises") {
                return ["fs-promises-property", "fs-promises-namespace"].includes(replacement.kind);
            }
            return replacement.cjsRoot === root &&
                ["fs-member", "module-member", "path-member", "url-member"].includes(replacement.kind);
        });
    };
    const mutationState = (root, properties, useNode) => {
        let affected = false;
        let crossFunctionSticky = false;
        let replacement = null;
        let directRestore = false;
        for (const effect of mutationEffects) {
            if (
                effect.root !== root ||
                !mutationAppliesAt(effect, useNode) ||
                (!effect.all &&
                    (effect.properties.length !== properties.length ||
                        effect.properties.some((property, index) =>
                            !overlappingProperty(property, properties[index]),
                        )))
            ) continue;
            const mutation = effect.mutation;
            const nextAffected = effect.state
                ? effect.state.affected
                : !replacementPreservesMember(
                      root,
                      properties,
                      mutation,
                      useNode,
                  );
            const nextReplacement = effect.state
                ? effect.state.replacement ?? null
                : null;
            const sticky =
                effect.crossFunction ||
                !effect.site ||
                functionNodeFor(effect.site) !== functionNodeFor(useNode);
            if (sticky) {
                crossFunctionSticky ||= nextAffected;
                if (nextAffected) {
                    replacement = null;
                    directRestore = false;
                }
            } else if (effect.may) {
                if (nextAffected) {
                    affected = true;
                    replacement = null;
                    directRestore = false;
                }
            } else if (!crossFunctionSticky) {
                affected = nextAffected;
                const replacements = nextAffected && !effect.state
                    ? replacementProvenances(mutation, useNode).filter(
                          (item) =>
                              item.kind !== "local" &&
                              !item.kind.startsWith("tainted-"),
                      )
                    : [];
                replacement = nextReplacement ??
                    (replacements.length === 1 ? replacements[0] : null);
                let target = mutation?.target &&
                    unwrapTransparentSyntax(mutation.target);
                while (
                    target &&
                    (ts.isPropertyAccessExpression(target) ||
                        ts.isElementAccessExpression(target))
                ) target = unwrapTransparentSyntax(target.expression);
                directRestore = Boolean(
                    root === "process" &&
                    !nextAffected &&
                    !effect.state &&
                    ts.isIdentifier(target) &&
                    target.text === "process" &&
                    lookup("process", mutation.site) === null,
                );
            }
        }
        return {
            affected: crossFunctionSticky || affected,
            replacement: crossFunctionSticky ? null : replacement,
            directRestore: !crossFunctionSticky && directRestore,
        };
    };
    const mutationAffects = (root, properties, useNode) =>
        mutationState(root, properties, useNode).affected;
    const taintTarget = (node) => {
        if (!node) return;
        if (ts.isIdentifier(node)) {
            const record = lookup(node.text, node);
            if (record) record.tainted = true;
            return;
        }
        if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
            taintTarget(node.expression);
            return;
        }
        ts.forEachChild(node, taintTarget);
    };
    const markGlobalProcessMutation = (
        node,
        property = undefined,
        expressionResolver = resolveExpression,
        mutation = null,
    ) => {
        if (!node) return false;
        const receivers = selectMutationReceivers(
            node,
            property,
            expressionResolver,
            mutation?.site ?? node,
        );
        let matched = false;
        for (const { provenance, properties } of receivers) {
            if (provenance.kind !== "process-global") continue;
            matched = true;
            const all =
                properties.length === 0 ||
                properties.length > 1 ||
                properties.includes(unknownProperty);
            mutationEffects.push({
                root: "process",
                properties,
                all,
                site: mutation?.site ?? null,
                may: Boolean(mutation?.may),
                crossFunction: Boolean(mutation?.crossFunction),
                definitelyUndefined: Boolean(mutation?.definitelyUndefined),
                mutation,
            });
        }
        return matched;
    };
    const markCjsModuleMutation = (
        node,
        property = undefined,
        expressionResolver = resolveExpression,
        mutation = null,
    ) => {
        const receivers = selectMutationReceivers(
            node,
            property,
            expressionResolver,
            mutation?.site ?? node,
        );
        let matched = false;
        for (const { provenance, properties } of receivers) {
            if (
                !["cjs-module-namespace", "fs-promises-namespace", "fs-promises-property"].includes(provenance.kind) ||
                !builtinCanonicalRoots.has(provenance.cjsRoot)
            ) {
                continue;
            }
            matched = true;
            mutationEffects.push({
                root: provenance.cjsRoot,
                properties,
                all:
                    properties.length !== 1 ||
                    properties[0] === unknownProperty,
                site: mutation?.site ?? null,
                may: Boolean(mutation?.may),
                crossFunction: Boolean(mutation?.crossFunction),
                definitelyUndefined: Boolean(mutation?.definitelyUndefined),
                mutation,
            });
        }
        return matched;
    };
    const markEsmNamespaceMutation = (
        node,
        property = undefined,
        expressionResolver = resolveExpression,
        mutation = null,
    ) => {
        for (const candidate of mutationReceiverPrefixes(node, property)) {
            const resolved = expressionResolver(
                candidate.receiver,
                mutation?.site ?? candidate.receiver,
            );
            const provenances = Array.isArray(resolved) ? resolved : [resolved];
            for (const provenance of provenances) {
                if (
                    provenance.kind === "module-namespace" &&
                    builtinRootNames.has(provenance.moduleName) &&
                    candidate.properties.length > 1
                ) {
                    mutationEffects.push({
                        root: `esm:${provenance.moduleName}`,
                        properties: [],
                        all: true,
                        site: mutation?.site ?? null,
                        may: Boolean(mutation?.may),
                        crossFunction: Boolean(mutation?.crossFunction),
                        definitelyUndefined: Boolean(mutation?.definitelyUndefined),
                        mutation,
                    });
                    return true;
                }
                if (
                    provenance.kind === "fs-promises-namespace" &&
                    provenance.esmRoot &&
                    candidate.properties.length > 0
                ) {
                    mutationEffects.push({
                        root: "fs-promises",
                        properties: candidate.properties.length === 1
                            ? candidate.properties
                            : [],
                        all: candidate.properties.length !== 1,
                        site: mutation?.site ?? null,
                        may: Boolean(mutation?.may),
                        crossFunction: Boolean(mutation?.crossFunction),
                        definitelyUndefined: Boolean(mutation?.definitelyUndefined),
                        mutation,
                    });
                    mutationEffects.push({
                        root: `esm:${provenance.esmRoot}`,
                        properties: [],
                        all: true,
                        site: mutation?.site ?? null,
                        may: Boolean(mutation?.may),
                        crossFunction: Boolean(mutation?.crossFunction),
                        definitelyUndefined: Boolean(mutation?.definitelyUndefined),
                        mutation,
                    });
                    return true;
                }
            }
        }
        return false;
    };
    const assignmentLeaves = (node, visit, path = [], defaults = []) => {
        if (!node) return;
        if (
            ts.isParenthesizedExpression(node) ||
            ts.isAsExpression(node) ||
            ts.isTypeAssertionExpression(node) ||
            ts.isSatisfiesExpression(node) ||
            ts.isNonNullExpression(node)
        ) {
            assignmentLeaves(node.expression, visit, path, defaults);
            return;
        }
        if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
            visit(node, path, defaults);
            return;
        }
        if (ts.isBindingElement(node)) {
            const property = node.propertyName
                ? resolvedPropertyKey(node.propertyName, node)
                : ts.isIdentifier(node.name)
                  ? node.name.text
                  : null;
            assignmentLeaves(
                node.name,
                visit,
                property === unknownProperty ? null : [...(path ?? []), property],
                property === unknownProperty
                    ? []
                    : [...defaults, node.initializer ?? null],
            );
            return;
        }
        if (ts.isObjectBindingPattern(node) || ts.isObjectLiteralExpression(node)) {
            for (const element of node.elements ?? node.properties) {
                if (ts.isBindingElement(element)) {
                    assignmentLeaves(element, visit, path, defaults);
                } else if (ts.isPropertyAssignment(element)) {
                    const property = resolvedPropertyKey(element.name, element);
                    assignmentLeaves(
                        element.initializer,
                        visit,
                        property === unknownProperty ? null : [...(path ?? []), property],
                        property === unknownProperty ? [] : [...defaults, null],
                    );
                } else if (ts.isShorthandPropertyAssignment(element)) {
                    assignmentLeaves(
                        element.name,
                        visit,
                        [...(path ?? []), element.name.text],
                        [...defaults, element.objectAssignmentInitializer ?? null],
                    );
                } else if (ts.isSpreadAssignment(element)) {
                    assignmentLeaves(element.expression, visit, null, []);
                }
            }
            return;
        }
        if (ts.isArrayBindingPattern(node) || ts.isArrayLiteralExpression(node)) {
            for (const element of node.elements) {
                if (element && !ts.isOmittedExpression(element)) {
                    assignmentLeaves(
                        element,
                        visit,
                        [...(path ?? []), node.elements.indexOf(element)],
                        [...defaults, null],
                    );
                }
            }
            return;
        }
        if (ts.isSpreadElement(node)) {
            assignmentLeaves(node.expression, visit, null, []);
            return;
        }
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
            const leafDefaults = path?.length
                ? [...defaults.slice(0, -1), node.right]
                : defaults;
            assignmentLeaves(node.left, visit, path, leafDefaults);
        }
    };
    const mutationCrossFunction = (target, site) => {
        if (!target || !site) return false;
        const receivers = mutationReceiverPrefixes(target).filter((candidate) =>
            ts.isIdentifier(candidate.receiver),
        );
        const record = receivers.flatMap((candidate) => {
            const found = lookup(candidate.receiver.text, site);
            return found ? [found] : [];
        })[0];
        if (record) {
            return functionNodeFor(site) !== functionNodeFor(record.declaration);
        }
        const globalProcess = receivers.some(
            ({ receiver }) =>
                receiver.text === "process" && lookup("process", site) === null,
        );
        return globalProcess && functionNodeFor(site) !== rootScope.node;
    };
    const recordMutation = (
        target,
        property = undefined,
        whole = false,
        site = null,
        definitelyUndefined = false,
        replacement = null,
        replacementKnown = false,
    ) => {
        if (!target) return;
        invalidateProjectionCaches();
        sharedMutations.push({
            target,
            property,
            whole,
            site,
            may: uncertainContext(site),
            crossFunction: mutationCrossFunction(target, site),
            definitelyUndefined,
            replacement,
            replacementKnown,
        });
    };
    const censusWriteLeaf = (
        leaf,
        represented = false,
        site = null,
        definitelyUndefined = false,
        replacement = null,
        replacementKnown = false,
    ) => {
        if (ts.isIdentifier(leaf)) {
            const record = lookup(leaf.text, leaf);
            if (record) {
                invalidateProjectionCaches();
                record.written = true;
                if (!represented) {
                    record.unknownWrite = true;
                    record.unknownWriteSites.push({
                        site,
                        may: uncertainWrite(site, record),
                        crossFunction: Boolean(
                            site && functionNodeFor(site) !== functionNodeFor(record.declaration),
                        ),
                    });
                }
            }
            else if (leaf.text === "process") recordMutation(leaf, undefined, true, site);
            return;
        }
        let root = leaf;
        while (ts.isPropertyAccessExpression(root) || ts.isElementAccessExpression(root)) {
            root = root.expression;
        }
        if (ts.isIdentifier(root)) {
            const record = lookup(root.text, root);
            if (record) record.propertyWritten = true;
        }
        recordMutation(
            leaf,
            undefined,
            false,
            site,
            definitelyUndefined,
            replacement,
            replacementKnown,
        );
    };
    const propertyStateAt = (node, property, useSite = node, seen = new Set(), selection = []) => {
        const unknown = () => ({ present: true, value: null, unknown: true });
        let current = unwrapTransparentSyntax(node);
        const members = [];
        while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
            const key = initialProperty(current);
            if (key === unknownProperty) return unknown();
            members.unshift(key);
            current = unwrapTransparentSyntax(current.expression);
        }
        if (members.length > 0) {
            return propertyStateAt(current, property, useSite, seen, [...members, ...selection]);
        }
        if (ts.isIdentifier(current)) {
            const record = lookupInitial(current.text, useSite);
            if (!record || seen.has(record)) return unknown();
            const writes = (record.assignmentSources ?? [])
                .filter((write) => writeAppliesAt(write, useSite));
            const unsupportedWrite = (write) =>
                write.operator !== ts.SyntaxKind.EqualsToken ||
                write.crossFunction || !writeIsDefiniteAt(write, useSite);
            if ((record.unknownWriteSites ?? []).some((write) =>
                writeAppliesAt(write, useSite)) || writes.some(unsupportedWrite)) return unknown();
            const latest = writes.at(-1);
            const source = latest?.node ?? record.initializer ?? record.defaultInitializer;
            if (!source) return unknown();
            const selected = selectFiniteExpressionPath(source, [
                ...(latest ? latest.properties ?? [] : record.propertyPath ?? []),
                ...selection,
            ]);
            let state = propertyStateAt(
                selected.node, property, latest?.site ?? record.declaration,
                new Set(seen).add(record), selected.remaining,
            );
            ensureProjectedMutations();
            const paths = projectedUsePaths(record, selection, useSite);
            if (paths.length !== 1) return unknown();
            const path = paths[0];
            let sticky = false;
            for (const { mutation, properties: writePath } of
                orderedProjectedMutationEntries(path, useSite)) {
                const replaces =
                    writePath.length <= path.properties.length &&
                    writePath.every((key, index) =>
                        overlappingProperty(key, path.properties[index]));
                if (replaces) {
                    const uncertain = [
                        mutation.may ||
                        mutation.crossFunction || !mutation.site,
                        mutation.whole || writePath.includes(unknownProperty),
                        mutation.definitelyUndefined ||
                            !mutation.replacementKnown || !mutation.replacement,
                    ].some(Boolean);
                    sticky ||= mutation.crossFunction || !mutation.site;
                    if (uncertain) state = unknown();
                    else if (!sticky) {
                        state = propertyStateAt(
                            mutation.replacement, property, mutation.site,
                            new Set(seen).add(mutation), path.properties.slice(writePath.length),
                        );
                    }
                    continue;
                }
                if (writePath.length < path.properties.length ||
                    path.properties.some((key, index) =>
                        !overlappingProperty(writePath[index], key))) continue;
                const suffix = writePath.slice(path.properties.length);
                if (mutation.whole || suffix.includes(unknownProperty)) {
                    sticky ||= mutation.crossFunction || !mutation.site;
                    state = unknown();
                    continue;
                }
                if (suffix.length !== 1 || !exactProperty(suffix[0], property)) continue;
                sticky ||= mutation.crossFunction || !mutation.site;
                if (sticky && !mutation.crossFunction && mutation.site) continue;
                if (mutation.may || mutation.crossFunction || !mutation.site) state = unknown();
                else if (!mutation.replacementKnown || !mutation.replacement) {
                    state = mutation.definitelyUndefined
                        ? { present: false, value: null, unknown: false }
                        : unknown();
                } else {
                    state = { present: true, value: mutation.replacement, unknown: false };
                }
            }
            return state;
        }
        if (selection.length > 0) {
            const selected = selectFiniteExpressionPath(current, selection);
            return selected.node === current ||
                selected.remaining.length === selection.length
                ? unknown()
                : propertyStateAt(selected.node, property, useSite, seen, selected.remaining);
        }
        if (!ts.isObjectLiteralExpression(current)) return unknown();
        let state = { present: false, value: null, unknown: false };
        for (const entry of current.properties) {
            if (ts.isSpreadAssignment(entry)) {
                const spread = propertyStateAt(entry.expression, property, entry.expression, seen);
                if (spread.present || spread.unknown) state = spread;
                continue;
            }
            const key = entry.name ? resolvedPropertyKey(entry.name, entry) : unknownProperty;
            if (key === unknownProperty) state = unknown();
            else if (exactProperty(key, property)) {
                const value = ts.isPropertyAssignment(entry)
                    ? entry.initializer
                    : ts.isShorthandPropertyAssignment(entry) ||
                        ts.isMethodDeclaration(entry)
                      ? entry.name
                      : null;
                state = value ? { present: true, value, unknown: false } : unknown();
            }
        }
        return state;
    };
    const descriptorValue = (descriptor, useSite) => {
        if (!descriptor) return { known: false, value: null };
        const get = propertyStateAt(descriptor, "get", useSite);
        const set = propertyStateAt(descriptor, "set", useSite);
        if (get.unknown || set.unknown) return { known: false, value: null, accessor: true };
        if (get?.present || set?.present) return {
            known: false, value: null, accessor: true, spreadKnown: true,
        };
        const value = propertyStateAt(descriptor, "value", useSite);
        return {
            known: Boolean(!value.unknown && value.present && value.value),
            spreadKnown: true,
            value: value.present ? value.value : null,
        };
    };
    const intrinsicMutator = (node) => {
        if (!ts.isCallExpression(node)) {
            return null;
        }
        const access = unwrapTransparentSyntax(node.expression);
        if (!ts.isPropertyAccessExpression(access) && !ts.isElementAccessExpression(access)) {
            return null;
        }
        const receiver = unwrapTransparentSyntax(access.expression);
        const name = ts.isPropertyAccessExpression(access)
            ? access.name.text
            : access.argumentExpression
              ? resolvedPropertyKey(access.argumentExpression, node, false)
              : unknownProperty;
        if (!ts.isIdentifier(receiver) || !["Object", "Reflect"].includes(receiver.text)) {
            return null;
        }
        if (typeof name !== "string") return null;
        if (lookup(receiver.text, receiver) !== null) return null;
        if (receiver.text === "Object" && name === "defineProperty") {
            const key = node.arguments[1]
                ? resolvedPropertyKey(node.arguments[1], node, false)
                : unknownProperty;
            const descriptor = descriptorValue(node.arguments[2], node);
            return {
                target: node.arguments[0],
                property: key,
                whole: key === unknownProperty,
                definitelyUndefined: descriptor.known && Boolean(
                    descriptor.value &&
                    (isUnshadowedUndefined(descriptor.value, descriptor.value) ||
                        ts.isVoidExpression(unwrapTransparentSyntax(descriptor.value))),
                ),
                replacement: descriptor.value,
                replacementKnown: descriptor.known,
            };
        }
        if (receiver.text === "Object" && name === "defineProperties") {
            if (!ts.isObjectLiteralExpression(node.arguments[1])) {
                return [{ target: node.arguments[0], whole: true }];
            }
            const mutations = [];
            const seen = new Set();
            for (const property of node.arguments[1].properties) {
                if (!ts.isPropertyAssignment(property)) {
                    return [{ target: node.arguments[0], whole: true }];
                }
                const key = resolvedPropertyKey(property.name, property);
                if (typeof key !== "string") {
                    return [{ target: node.arguments[0], whole: true }];
                }
                const descriptor = descriptorValue(property.initializer, node);
                if (seen.has(key)) {
                    for (const prior of mutations.filter((item) => item.property === key)) {
                        prior.replacementKnown = false;
                    }
                }
                seen.add(key);
                mutations.push({
                    target: node.arguments[0],
                    property: key,
                    replacement: descriptor.value,
                    replacementKnown: descriptor.known,
                    definitelyUndefined: descriptor.known && Boolean(
                        descriptor.value &&
                        (isUnshadowedUndefined(descriptor.value, descriptor.value) ||
                            ts.isVoidExpression(unwrapTransparentSyntax(descriptor.value))),
                    ),
                });
            }
            return mutations;
        }
        if (receiver.text === "Object" && name === "assign") {
            const mutations = [];
            for (const source of node.arguments.slice(1)) {
                if (!ts.isObjectLiteralExpression(source)) {
                    mutations.push({ target: node.arguments[0], whole: true });
                    continue;
                }
                for (const property of source.properties) {
                    if (
                        !ts.isPropertyAssignment(property) &&
                        !ts.isShorthandPropertyAssignment(property)
                    ) {
                        mutations.push({ target: node.arguments[0], whole: true });
                        continue;
                    }
                    const key = resolvedPropertyKey(property.name, property);
                    if (typeof key !== "string") {
                        mutations.push({ target: node.arguments[0], whole: true });
                        continue;
                    }
                    const replacement = ts.isPropertyAssignment(property)
                        ? property.initializer
                        : property.name;
                    mutations.push({
                        target: node.arguments[0],
                        property: key,
                        replacement,
                        replacementKnown: true,
                        definitelyUndefined:
                            isUnshadowedUndefined(replacement, replacement) ||
                            ts.isVoidExpression(unwrapTransparentSyntax(replacement)),
                    });
                }
            }
            return mutations;
        }
        if (receiver.text === "Reflect" && name === "set") {
            const key = node.arguments[1]
                ? resolvedPropertyKey(node.arguments[1], node, false)
                : unknownProperty;
            return {
                target: node.arguments[0],
                property: key,
                whole: key === unknownProperty,
                replacement: node.arguments[2] ?? null,
                replacementKnown: Boolean(node.arguments[2]),
            };
        }
        if (receiver.text === "Reflect" && name === "defineProperty") {
            const key = node.arguments[1]
                ? resolvedPropertyKey(node.arguments[1], node, false)
                : unknownProperty;
            const descriptor = descriptorValue(node.arguments[2], node);
            return {
                target: node.arguments[0],
                property: key,
                whole: key === unknownProperty,
                definitelyUndefined: descriptor.known && Boolean(
                    descriptor.value &&
                    (isUnshadowedUndefined(descriptor.value, descriptor.value) ||
                        ts.isVoidExpression(unwrapTransparentSyntax(descriptor.value))),
                ),
                replacement: descriptor.value,
                replacementKnown: descriptor.known,
            };
        }
        if (receiver.text === "Reflect" && name === "deleteProperty") {
            const key = node.arguments[1]
                ? resolvedPropertyKey(node.arguments[1], node, false)
                : unknownProperty;
            return {
                target: node.arguments[0],
                property: key,
                whole: key === unknownProperty,
                definitelyUndefined: true,
            };
        }
        return null;
    };
    const assignmentSource = (
        record,
        node,
        properties,
        defaults = [],
        iterate = false,
        operator = ts.SyntaxKind.EqualsToken,
        site = null,
    ) => {
        if (!record || !node || properties === null) return false;
        record.assignmentSources ??= [];
        const write = {
            node,
            properties,
            defaults,
            operator,
            site,
            may: uncertainWrite(site, record),
            crossFunction: Boolean(
                site && functionNodeFor(site) !== functionNodeFor(record.declaration),
            ),
        };
        const current = unwrapTransparentSyntax(node);
        if (iterate && ts.isArrayLiteralExpression(current)) {
            for (const [index, element] of current.elements.entries()) {
                if (element && !ts.isSpreadElement(element)) {
                    record.assignmentSources.push({ ...write, node: element });
                } else {
                    record.assignmentSources.push({ ...write, node: null });
                }
            }
        } else {
            record.assignmentSources.push(write);
        }
        return true;
    };
    const censusAssignment = (
        target,
        rhs = null,
        iterate = false,
        operator = ts.SyntaxKind.EqualsToken,
        site = null,
        definitelyUndefined = false,
    ) =>
        assignmentLeaves(target, (leaf, path, defaults) => {
            const record = ts.isIdentifier(leaf) ? lookup(leaf.text, leaf) : null;
            censusWriteLeaf(
                leaf,
                assignmentSource(record, rhs, path, defaults, iterate, operator, site),
                site,
                definitelyUndefined,
                rhs,
                operator === ts.SyntaxKind.EqualsToken && Boolean(rhs),
            );
        });
    const isDestructuringDefault = (node) => {
        let current = node;
        let parent = node.parent;
        while (
            parent &&
            (
                ts.isObjectLiteralExpression(parent) ||
                ts.isArrayLiteralExpression(parent) ||
                ts.isObjectBindingPattern(parent) ||
                ts.isArrayBindingPattern(parent) ||
                ts.isPropertyAssignment(parent) ||
                ts.isBindingElement(parent)
            )
        ) {
            current = parent;
            parent = parent.parent;
        }
        return Boolean(
            parent &&
                ts.isBinaryExpression(parent) &&
                parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
                parent.left === current,
        );
    };
    const markWrites = (node) => {
        if (ts.isCallExpression(node)) runtimeCallSites.push(node);
        if (isDestructuringDefault(node)) {
            ts.forEachChild(node, markWrites);
            return;
        }
        if (ts.isBinaryExpression(node) && assignmentOperators.has(node.operatorToken.kind)) {
            const canCaptureRhs =
                node.operatorToken.kind === ts.SyntaxKind.EqualsToken ||
                node.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken ||
                logicalAssignmentOperators.has(node.operatorToken.kind);
            censusAssignment(
                node.left,
                canCaptureRhs ? node.right : null,
                false,
                node.operatorToken.kind,
                node,
                node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
                    (isUnshadowedUndefined(node.right, node.right) ||
                        ts.isVoidExpression(unwrapTransparentSyntax(node.right))),
            );
        } else if (
            (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) &&
            [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken].includes(node.operator)
        ) {
            assignmentLeaves(node.operand, (leaf) => censusWriteLeaf(leaf, false, node));
        } else if (node.kind === ts.SyntaxKind.DeleteExpression) {
            assignmentLeaves(node.expression, (leaf) => censusWriteLeaf(leaf, false, node, true));
        } else if (ts.isForInStatement(node) || ts.isForOfStatement(node)) {
            if (!ts.isVariableDeclarationList(node.initializer)) {
                censusAssignment(
                    node.initializer,
                    ts.isForOfStatement(node) ? node.expression : null,
                    true,
                    ts.SyntaxKind.EqualsToken,
                    node,
                );
            }
        } else {
            const mutation = intrinsicMutator(node);
            if (mutation) {
                for (const item of Array.isArray(mutation) ? mutation : [mutation]) {
                    recordMutation(
                        item.target,
                        item.property,
                        item.whole,
                        node,
                        item.definitelyUndefined ?? false,
                        item.replacement ?? null,
                        item.replacementKnown ?? false,
                    );
                }
            }
        }
        ts.forEachChild(node, markWrites);
    };
    const member = (base, name, useNode = null) => {
        if (base.tainted) return { kind: "local" };
        if (base.kind === "tainted-fs-namespace") {
            return {
                kind: "tainted-fs-member",
                moduleName: base.moduleName,
                member: name,
                ...(base.cjsRoot ? { cjsRoot: base.cjsRoot } : {}),
            };
        }
        if (base.kind === "tainted-fs-member") return { kind: "local" };
        if (base.kind === "module" || base.kind === "module-namespace") {
            const state = mutationState(`esm:${base.moduleName}`, [name], useNode);
            if (state.replacement) return state.replacement;
            if (state.affected) {
                const resolved = directImportProvenance(base.moduleName, name);
                return fsModules.has(base.moduleName) && fsOperationNames.has(resolved.member)
                    ? { ...resolved, kind: "tainted-fs-member" }
                    : { kind: "local" };
            }
            return directImportProvenance(base.moduleName, name);
        }
        if (base.kind === "module-promise") {
            return name === "then" && fsModules.has(base.moduleName)
                ? { kind: "module-promise-boundary", moduleName: base.moduleName }
                : { kind: "local" };
        }
        if (base.kind === "fs-promises-namespace") {
            if (
                (base.esmRoot && mutationAffects(`esm:${base.esmRoot}`, [name], useNode)) ||
                mutationAffects(base.cjsRoot ?? "fs-promises", [name], useNode)
            ) {
                return {
                    kind: "tainted-builtin-member",
                    moduleName: base.moduleName,
                    member: name,
                    cjsRoot: "fs-promises",
                };
            }
            const resolved = directImportProvenance("fs/promises", name);
            return resolved.kind === "fs-member"
                ? { ...resolved, cjsRoot: "fs-promises" }
                : resolved;
        }
        if (base.kind === "fs-promises-property") {
            const parentUseNode = base.capturedAt ?? useNode;
            if (
                mutationAffects("fs", ["promises"], parentUseNode) ||
                mutationAffects("fs-promises", [name], useNode)
            ) {
                return {
                    kind: "tainted-builtin-member",
                    moduleName: base.moduleName,
                    member: name,
                    cjsRoot: "fs-promises",
                };
            }
            const resolved = directImportProvenance("fs/promises", name);
            return resolved.kind === "fs-member"
                ? { ...resolved, cjsRoot: "fs-promises", parentRoot: "fs", capturedAt: base.capturedAt }
                : resolved;
        }
        if (base.kind === "cjs-module-namespace") {
            if (base.cjsRoot === "fs" && name === "promises") {
                if (mutationAffects("fs", ["promises"], useNode)) {
                    return {
                        kind: "tainted-fs-namespace",
                        moduleName: base.moduleName,
                        cjsRoot: "fs-promises",
                    };
                }
                return {
                    kind: "fs-promises-property",
                    moduleName: base.moduleName,
                    cjsRoot: "fs",
                    capturedAt: useNode,
                };
            }
            const state = mutationState(base.cjsRoot, [name], useNode);
            if (state.replacement) return state.replacement;
            if (state.affected) {
                return {
                    kind: "tainted-builtin-member",
                    moduleName: base.moduleName,
                    member: name,
                    cjsRoot: base.cjsRoot,
                };
            }
            const resolved = directImportProvenance(base.moduleName, name);
            return builtinMemberKinds.has(resolved.kind)
                ? { ...resolved, cjsRoot: base.cjsRoot }
                : resolved;
        }
        if (base.kind === "require-loader" && name === "resolve") {
            return { kind: "require-resolve", loader: base.loader };
        }
        if (
            base.kind === "process-global" &&
            ["cwd", "chdir"].includes(name) &&
            !mutationAffects("process", [name], useNode)
        ) {
            return { kind: "process-member", moduleName: "runtime", member: name };
        }
        if (base.kind === "process-global" && ["cwd", "chdir"].includes(name)) {
            return mutationState("process", [name], useNode).replacement ?? { kind: "local" };
        }
        return { kind: "local" };
    };
    const initialOrigins = new Map();
    let staticValueResolver = null;
    const isStableBindingIdentity = (record) => {
        let declaration = record?.declaration;
        while (declaration && !ts.isVariableDeclaration(declaration)) {
            declaration = declaration.parent;
        }
        return Boolean(
            record &&
                record.kind === "variable" &&
                declaration &&
                ts.isVariableDeclarationList(declaration.parent) &&
                Boolean(declaration?.parent.flags & ts.NodeFlags.Const) &&
                !record.written,
        );
    };
    const isImmutableBinding = (record) =>
        isStableBindingIdentity(record) && !record.propertyWritten;
    const hasAppliedWrite = (record, useNode) =>
        Boolean(
            (record?.assignmentSources ?? []).some((write) => writeAppliesAt(write, useNode)) ||
                (record?.unknownWriteSites ?? []).some((write) => writeAppliesAt(write, useNode)),
        );
    const resolveRecord = (record, seen, useNode = record?.declaration) => {
        const canonical = canonicalContainerRecord(record);
        if (canonical && canonical !== record) {
            return resolveRecord(canonical, seen, useNode);
        }
        if (record?.taintedFsMember && hasAppliedWrite(record, useNode)) {
            return { ...record.taintedFsMember, kind: "tainted-fs-member" };
        }
        if (record?.taintedFsNamespace && hasAppliedWrite(record, useNode)) {
            return { ...record.taintedFsNamespace, kind: "tainted-fs-namespace" };
        }
        if (record?.tainted) return { kind: "local" };
        const knownValue = parameterValues.get(record) ??
            parameterValues.get(record?.declaration?.getStart(sourceFile));
        if (knownValue !== undefined) return { kind: "known-path", value: knownValue };
        if (!record) return { kind: "local" };
        if (record.kind !== "variable") return record;
        const initializer = record.initializer ?? record.defaultInitializer;
        if (!initializer || seen.has(record)) return { kind: "local" };
        seen.add(record);
        const resolutionNode = isImmutableBinding(record)
            ? initializer
            : useNode ?? initializer;
        let resolved = resolveExpression(initializer, resolutionNode, seen);
        if (resolved.kind === "local") {
            const fallbacks = projectInitialCases(record.declaration, record.declaration, new Set())
                .filter(({ provenance }) => isDefiniteProvenance(provenance, record));
            if (fallbacks.length === 1) resolved = fallbacks[0].provenance;
        }
        for (const property of record.propertyPath) {
            if (property === unknownProperty) return { kind: "local" };
            resolved = member(resolved, property, useNode);
        }
        return resolved;
    };
    function resolveExpression(node, useNode = node, seen = new Set()) {
        if (!node) return { kind: "local" };
        if (
            ts.isParenthesizedExpression(node) ||
            ts.isAsExpression(node) ||
            ts.isTypeAssertionExpression(node) ||
            ts.isSatisfiesExpression(node) ||
            ts.isNonNullExpression(node)
        ) {
            return resolveExpression(node.expression, useNode, seen);
        }
        if (ts.isAwaitExpression(node)) {
            const awaited = resolveExpression(node.expression, useNode, seen);
            if (awaited.kind !== "module-promise") return awaited;
            const candidates = awaited.specifiers ??
                (awaited.moduleName ? [awaited.moduleName] : []);
            const roots = uniqueSorted(
                candidates
                    .map((moduleName) =>
                        processModules.has(moduleName)
                            ? "process"
                            : canonicalBuiltinRoot(moduleName),
                    )
                    .filter(Boolean),
            );
            if (roots.length === 1 && roots[0] === "process") {
                return { kind: "process-global", moduleName: candidates[0] };
            }
            if (roots.length === 1 && candidates.length > 0) {
                return {
                    kind: "cjs-module-namespace",
                    moduleName: candidates[0],
                    cjsRoot: roots[0],
                };
            }
            return awaited.moduleName
                ? { kind: "module-namespace", moduleName: awaited.moduleName }
                : awaited;
        }
        if (ts.isIdentifier(node)) {
            const record = lookup(node.text, useNode);
            if (record) {
                if (record.taintedFsMember && hasAppliedWrite(record, useNode)) {
                    return { ...record.taintedFsMember, kind: "tainted-fs-member" };
                }
                if (record.taintedFsNamespace && hasAppliedWrite(record, useNode)) {
                    return { ...record.taintedFsNamespace, kind: "tainted-fs-namespace" };
                }
                if (record.tainted && !(record.assignmentSources?.length ?? 0)) {
                    return { kind: "local" };
                }
                if (
                    !seen.has(record) &&
                    (record.written || (record.assignmentSources?.length ?? 0) > 0)
                ) {
                    const cases = projectInitialCases(node, useNode, new Set(seen));
                    return cases.length === 1 ? cases[0].provenance : { kind: "local" };
                }
                return resolveRecord(record, seen, useNode);
            }
            if (node.text === "require") return { kind: "require-loader", loader: "require" };
            if (node.text === "process") {
                return { kind: "process-global" };
            }
            return { kind: "local" };
        }
        if (ts.isPropertyAccessExpression(node)) {
            const resolved = resolveExpression(node.expression, useNode, seen);
            return member(resolved, node.name.text, useNode);
        }
        if (ts.isElementAccessExpression(node)) {
            const property = node.argumentExpression
                ? resolvedPropertyKey(node.argumentExpression, useNode, false)
                : unknownProperty;
            return property !== unknownProperty
                ? member(
                      resolveExpression(node.expression, useNode, seen),
                      property,
                      useNode,
                  )
                : { kind: "local" };
        }
        if (ts.isCallExpression(node)) {
            if (
                node.expression.kind === ts.SyntaxKind.ImportKeyword &&
                (node.arguments.length === 1 || node.arguments.length === 2)
            ) {
                const literal = literalString(node.arguments[0]);
                const evaluated =
                    literal === null
                        ? dynamicImportResolver?.(node.arguments[0], node)
                        : null;
                const specifiers = literal !== null
                    ? [literal]
                    : evaluated?.specifiers?.length
                      ? evaluated.specifiers
                      : null;
                return {
                    kind: "module-promise",
                    moduleName: specifiers?.length === 1 ? specifiers[0] : null,
                    ...(specifiers ? { specifiers } : {}),
                    unknown: specifiers === null,
                };
            }
            let callee = resolveExpression(node.expression, useNode, seen);
            if (
                ts.isIdentifier(node.expression) &&
                callee.kind === "create-require-factory"
            ) {
                const calleeCases = resolveCases(
                    node.expression,
                    node.expression,
                    new Set(seen),
                );
                callee = calleeCases.length === 1
                    ? calleeCases[0]
                    : { kind: "local" };
            }
            if (callee.kind === "create-require-factory") {
                const state = mutationState(
                    `esm:${callee.moduleName}`,
                    [callee.member],
                    node.expression,
                );
                if (state.affected &&
                    state.replacement?.kind !== "create-require-factory") {
                    return { kind: "local" };
                }
                return { kind: "require-loader", loader: "createRequire" };
            }
            if (
                callee.kind === "process-member" &&
                callee.member === "cwd" &&
                node.arguments.length === 0
            ) {
                return { kind: "repository-root" };
            }
            if (callee.kind === "require-loader") {
                const moduleName = node.arguments[0] && literalString(node.arguments[0]);
                if (
                    moduleName &&
                    (processModules.has(moduleName) || builtinRootNames.has(moduleName) || localSpecifierPattern.test(moduleName))
                ) {
                    if (processModules.has(moduleName)) {
                        return { kind: "process-global", moduleName };
                    }
                    return {
                        kind: "cjs-module-namespace",
                        moduleName,
                        cjsRoot: canonicalBuiltinRoot(moduleName) ?? moduleName,
                    };
                }
            }
        }
        return { kind: "local" };
    }

    const initialProperty = (node) => {
        if (ts.isPropertyAccessExpression(node)) return node.name.text;
        if (!ts.isElementAccessExpression(node) || !node.argumentExpression) {
            return unknownProperty;
        }
        const key = resolvedPropertyKey(node.argumentExpression, node, false);
        if (key === unknownProperty) return unknownProperty;
        const numeric = numericPropertyKey(node.argumentExpression);
        return numeric !== null &&
            Number.isSafeInteger(Number(numeric)) &&
            String(Number(numeric)) === numeric
            ? Number(numeric)
            : key;
    };
    const applyInitialProperties = (origin, properties, captureNode = null) => {
        let current = origin;
        for (const property of properties) {
            if (
                (typeof property !== "string" && typeof property !== "number") ||
                (typeof property === "number" && !Number.isInteger(property))
            ) {
                return { kind: "local" };
            }
            current = originMember(current, property, captureNode);
        }
        return current;
    };
    const definedness = {
        undefined: "undefined",
        nonUndefined: "non-undefined",
        unknown: "unknown-maybe",
    };
    const valueStates = {
        truthy: "truthy",
        falsy: "falsy",
        nullish: "nullish",
        unknown: "unknown",
    };
    const caseOf = (provenance, state, valueState = null, present = null) => ({
        provenance: immutableProvenance(provenance),
        definedness: state,
        valueState: valueState ??
            (state === definedness.undefined
                ? valueStates.nullish
                : state === definedness.nonUndefined
                  ? valueStates.truthy
                  : valueStates.unknown),
        present,
    });
    const unknownCase = () => caseOf({ kind: "local" }, definedness.unknown);
    const undefinedCase = (present = false) =>
        caseOf({ kind: "local" }, definedness.undefined, null, present);
    const literalValueState = (node) => {
        const current = unwrapTransparentSyntax(node);
        if (current.kind === ts.SyntaxKind.NullKeyword) return valueStates.nullish;
        if (current.kind === ts.SyntaxKind.TrueKeyword) return valueStates.truthy;
        if (current.kind === ts.SyntaxKind.FalseKeyword) return valueStates.falsy;
        if (ts.isStringLiteralLike(current)) {
            return current.text.length > 0 ? valueStates.truthy : valueStates.falsy;
        }
        if (ts.isNumericLiteral(current)) {
            return Number(current.text) === 0 ? valueStates.falsy : valueStates.truthy;
        }
        if (ts.isBigIntLiteral(current)) {
            return BigInt(current.text.slice(0, -1)) === 0n
                ? valueStates.falsy
                : valueStates.truthy;
        }
        if (
            ts.isPrefixUnaryExpression(current) &&
            [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(current.operator)
        ) {
            const operand = unwrapTransparentSyntax(current.operand);
            if (ts.isNumericLiteral(operand)) {
                return Number(operand.text) === 0 ? valueStates.falsy : valueStates.truthy;
            }
            if (ts.isBigIntLiteral(operand)) {
                return BigInt(operand.text.slice(0, -1)) === 0n
                    ? valueStates.falsy
                    : valueStates.truthy;
            }
        }
        return null;
    };
    const caseValueState = (item) => item.valueState ??
        (item.definedness === definedness.undefined
            ? valueStates.nullish
            : item.definedness === definedness.nonUndefined
              ? valueStates.truthy
              : valueStates.unknown);
    const provenanceKeyCache = new WeakMap();
    const caseKeyCache = new WeakMap();
    const nodeKeyCache = new WeakMap();
    const keyPart = (value) => {
        let text;
        if (value === null) text = "null";
        else if (value === undefined) text = "undefined";
        else if (typeof value === "object" && typeof value.getStart === "function") {
            text = nodeKeyCache.get(value);
            if (text === undefined) {
                text = `node:${value.getStart(sourceFile)}`;
                nodeKeyCache.set(value, text);
            }
        } else text = `${typeof value}:${String(value)}`;
        return `${text.length}:${text}`;
    };
    const provenanceKey = (provenance) => {
        const current = provenance ?? {};
        const cached = provenanceKeyCache.get(current);
        if (cached !== undefined) return cached;
        const key = provenanceFields.map((field) =>
            field === "specifiers" && Array.isArray(current[field])
                ? [...current[field]].sort().map(keyPart).join("")
                : current[field],
        ).map(keyPart).join("");
        provenanceKeyCache.set(current, key);
        return key;
    };
    const logicalRightPossible = (leftCases, operator) =>
        leftCases.some(({ valueState }) =>
            operator === ts.SyntaxKind.AmpersandAmpersandToken
                ? [valueStates.truthy, valueStates.unknown].includes(valueState)
                : operator === ts.SyntaxKind.BarBarToken
                  ? [valueStates.falsy, valueStates.nullish, valueStates.unknown].includes(valueState)
                  : [valueStates.nullish, valueStates.unknown].includes(valueState),
        );
    const logicalResultCases = (leftCases, rightCases, operator) => {
        const result = [];
        for (const left of leftCases) {
            const state = caseValueState(left);
            const leftSelected =
                operator === ts.SyntaxKind.AmpersandAmpersandToken
                    ? [valueStates.falsy, valueStates.nullish].includes(state)
                    : operator === ts.SyntaxKind.BarBarToken
                      ? state === valueStates.truthy
                      : operator === ts.SyntaxKind.QuestionQuestionToken
                        ? [valueStates.truthy, valueStates.falsy].includes(state)
                        : false;
            const rightSelected =
                operator === ts.SyntaxKind.AmpersandAmpersandToken
                    ? state === valueStates.truthy
                    : operator === ts.SyntaxKind.BarBarToken
                      ? [valueStates.falsy, valueStates.nullish].includes(state)
                      : operator === ts.SyntaxKind.QuestionQuestionToken
                        ? state === valueStates.nullish
                        : false;
            if (leftSelected) result.push(left);
            if (rightSelected) result.push(...rightCases);
            if (state === valueStates.unknown) result.push(left, ...rightCases);
        }
        return dedupeCases(result);
    };
    const definiteProvenanceKinds = new Set([
        "process-global", "process-member", "repository-root", "cjs-module-namespace",
        "module-namespace", "module-promise", "fs-member", "path-member", "module-member",
        "url-member", "create-require-factory", "require-loader", "module",
        "fs-promises-namespace", "fs-promises-property",
    ]);
    const isDefiniteProvenance = (provenance, record = null) =>
        definiteProvenanceKinds.has(provenance.kind) ||
        Boolean(
            provenance.kind === "local" &&
                record &&
                (record.functionNode ||
                    ts.isFunctionDeclaration(record.declaration?.parent) ||
                    ts.isClassDeclaration(record.declaration?.parent) ||
                    ts.isClassExpression(record.declaration?.parent)),
        );
    const dedupeCases = (cases) => {
        const seenCases = new Set();
        return cases.filter((item) => {
            let key = caseKeyCache.get(item);
            if (key === undefined) {
                key = [
                item.definedness,
                caseValueState(item),
                item.present,
                provenanceKey(item.provenance),
                ].map(keyPart).join("");
                caseKeyCache.set(item, key);
            }
            if (seenCases.has(key)) return false;
            seenCases.add(key);
            return true;
        });
    };
    const applyCaseProperties = (cases, properties, captureNode = null) =>
        dedupeCases(
            cases.map((item) => {
                if (item.definedness === definedness.undefined) return item;
                const provenance = applyInitialProperties(item.provenance, properties, captureNode);
                return caseOf(
                    provenance,
                    isDefiniteProvenance(provenance)
                        ? definedness.nonUndefined
                        : definedness.unknown,
                );
            }),
        );
    const liveAt = (provenance, stateNode) => {
        const parentUseNode = provenance.capturedAt ?? stateNode;
        if (
            provenance.parentRoot &&
            mutationAffects(provenance.parentRoot, ["promises"], parentUseNode)
        ) {
            return {
                ...provenance,
                kind: "tainted-builtin-member",
                cjsRoot: "fs-promises",
            };
        }
        if (provenance.parentRoot || provenance.capturedAt) {
            const { parentRoot, capturedAt, ...stable } = provenance;
            return stable;
        }
        if (
            provenance.kind === "process-member"
        ) {
            const state = mutationState("process", [provenance.member], stateNode);
            if (state.replacement) {
                const { parentRoot, capturedAt, ...stable } = state.replacement;
                return stable;
            }
            if (state.affected) return { kind: "local" };
        }
        if (
            provenance.kind === "process-global" &&
            mutationAffects("process", [], stateNode)
        ) return { kind: "local" };
        if (
            provenance.moduleName &&
            provenance.member
        ) {
            const state = mutationState(
                `esm:${provenance.moduleName}`,
                [provenance.member],
                stateNode,
            );
            if (state.replacement) {
                const { parentRoot, capturedAt, ...stable } = state.replacement;
                return stable;
            }
            if (state.affected) {
                return fsModules.has(provenance.moduleName) &&
                fsOperationNames.has(provenance.member)
                    ? { ...provenance, kind: "tainted-fs-member" }
                    : {
                          ...provenance,
                          kind: "tainted-builtin-member",
                          cjsRoot: canonicalBuiltinRoot(provenance.moduleName),
                      };
            }
        }
        if (
            ["fs-member", "module-member", "path-member", "url-member"].includes(provenance.kind) &&
            provenance.cjsRoot
        ) {
            const state = mutationState(
                provenance.cjsRoot,
                [provenance.member],
                stateNode,
            );
            if (state.replacement) {
                const { parentRoot, capturedAt, ...stable } = state.replacement;
                return stable;
            }
            if (state.affected) {
                return { ...provenance, kind: "tainted-builtin-member" };
            }
        }
        return provenance;
    };
    const syncableEsmCapture = (provenance) => {
        if (!provenance?.member || provenance.capturedAt) return false;
        const esmModule = provenance.esmRoot ??
            (provenance.cjsRoot ? null : provenance.moduleName);
        return esmModulesByRoot.has(canonicalBuiltinRoot(esmModule));
    };
    const snapshotSyncableEsmCases = (cases, producerSite) =>
        cases.map((item) => {
            if (!syncableEsmCapture(item.provenance)) return item;
            return {
                ...item,
                provenance: immutableProvenance({
                    ...liveAt(item.provenance, producerSite),
                    capturedAt: producerSite,
                }),
            };
        });
    const projectInitialCases = (
        node,
        useNode = node,
        seen = new Set(),
        properties = [],
        defaults = [],
        history = false,
        captureNode = null,
    ) => {
        if (!node) return [undefinedCase()];
        let current = unwrapTransparentSyntax(node);
        if (isUnshadowedUndefined(current, useNode, true) || ts.isVoidExpression(current)) {
            return [undefinedCase()];
        }
        if (ts.isIdentifier(current)) {
            let record = lookupInitial(current.text, useNode);
            const canonical = canonicalContainerRecord(record);
            if (canonical && canonical !== record) record = canonical;
            if (
                record &&
                (["variable", "parameter"].includes(record.kind) ||
                    (record.assignmentSources?.length ?? 0) > 0)
            ) {
                if (seen.has(record)) {
                    return unknownProjectionCases(
                        restProperties(properties),
                        [...(record.propertyDefaults ?? []), ...defaults],
                        seen,
                    );
                }
                const initialRoots = record.initializer
                    ? [{
                          node: record.initializer,
                          site: record.declaration,
                          properties: record.iterate
                              ? [iterateInitialProperty, ...record.propertyPath]
                              : record.propertyPath,
                          defaults: record.propertyDefaults,
                      }]
                    : record.rootDefaultInitializer ?? record.defaultInitializer
                      ? [{
                            node: record.rootDefaultInitializer ?? record.defaultInitializer,
                            site: record.declaration,
                            properties: record.propertyPath,
                            defaults: record.propertyDefaults,
                        }]
                      : [];
                const importedInitial =
                    !["variable", "parameter"].includes(record.kind)
                        ? [caseOf(
                              immutableProvenance(record),
                              isDefiniteProvenance(record)
                                  ? definedness.nonUndefined
                                  : definedness.unknown,
                          )]
                        : [];
                const allAssignmentRoots = record.assignmentSources ?? [];
                const assignmentRoots = allAssignmentRoots.filter((root) =>
                    history || writeAppliesAt(root, useNode),
                );
                const unknownWrites = (record.unknownWriteSites ?? []).filter((write) =>
                    history || writeAppliesAt(write, useNode),
                );
                if (
                    assignmentRoots.some((write) => write.crossFunction) ||
                    unknownWrites.some((write) => write.crossFunction)
                ) return [unknownCase()];
                if (
                    initialRoots.length === 0 &&
                    importedInitial.length === 0 &&
                    assignmentRoots.length === 0 &&
                    unknownWrites.length === 0
                ) {
                    if (properties.length === 0 && defaults.length === 0) {
                        return [undefinedCase()];
                    }
                    return unknownProjectionCases(
                        restProperties([...record.propertyPath, ...properties]),
                        [...(record.propertyDefaults ?? []), ...defaults],
                        seen,
                    );
                }
                const nextSeen = new Set(seen).add(record);
                const projectRoot = (root) =>
                    projectInitialCases(
                        root.node,
                        root.site ?? root.node,
                        nextSeen,
                        [...(root.properties ?? []), ...properties],
                        [...(root.defaults ?? []), ...defaults],
                        history,
                        captureNode ?? record.declaration,
                    );
                const initialCases = initialRoots.flatMap(projectRoot);
                let cases = initialRoots.length > 0
                    ? initialCases
                    : importedInitial.length > 0
                      ? importedInitial
                      : [undefinedCase()];
                const historyCases = history
                    ? [...initialCases, ...importedInitial]
                    : [];
                for (const root of assignmentRoots) {
                    const operator = root.operator ?? ts.SyntaxKind.EqualsToken;
                    const sourceCases = projectRoot(root);
                    if (operator === ts.SyntaxKind.EqualsToken) {
                        cases = writeIsDefiniteAt(root, useNode)
                            ? sourceCases
                            : root.may
                            ? dedupeCases([...cases, ...sourceCases])
                            : sourceCases;
                        if (history) historyCases.push(...sourceCases);
                    } else {
                        const logicalOperator = operator === ts.SyntaxKind.AmpersandAmpersandEqualsToken
                            ? ts.SyntaxKind.AmpersandAmpersandToken
                            : operator === ts.SyntaxKind.BarBarEqualsToken
                              ? ts.SyntaxKind.BarBarToken
                              : ts.SyntaxKind.QuestionQuestionToken;
                        if (history && logicalRightPossible(cases, logicalOperator)) {
                            historyCases.push(...sourceCases);
                        }
                        cases = logicalResultCases(cases, sourceCases, logicalOperator);
                    }
                }
                if (unknownWrites.length > 0) {
                    cases.push(
                        ...unknownProjectionCases(
                            restProperties([...record.propertyPath, ...properties]),
                            [...(record.propertyDefaults ?? []), ...defaults],
                            seen,
                        ),
                    );
                }
                return foldProjectedMutations(dedupeCases([
                    ...cases,
                    ...historyCases,
                ]), record, properties, defaults, useNode, history, nextSeen,
                    captureNode ?? record.declaration);
            }
            if (record?.written) return [unknownCase()];
            const provenance = record
                ? immutableProvenance(record)
                : current.text === "process"
                  ? { kind: "process-global" }
                  : current.text === "require"
                    ? { kind: "require-loader", loader: "require" }
                    : { kind: "local" };
            const item = caseOf(
                provenance,
                isDefiniteProvenance(provenance, record)
                    ? definedness.nonUndefined
                    : definedness.unknown,
            );
            return properties.length > 0
                ? item.definedness === definedness.nonUndefined
                    ? applyCaseProperties([item], properties, useNode)
                    : unknownProjectionCases(restProperties(properties), defaults, seen)
                : [item];
        }
        if (
            ts.isStringLiteralLike(current) ||
            ts.isNumericLiteral(current) ||
            ts.isBigIntLiteral(current) ||
            (ts.isPrefixUnaryExpression(current) &&
                [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(current.operator) &&
                (ts.isNumericLiteral(unwrapTransparentSyntax(current.operand)) ||
                    ts.isBigIntLiteral(unwrapTransparentSyntax(current.operand)))) ||
            current.kind === ts.SyntaxKind.TrueKeyword ||
            current.kind === ts.SyntaxKind.FalseKeyword ||
            current.kind === ts.SyntaxKind.NullKeyword ||
            ts.isFunctionLike(current) ||
            ts.isClassExpression(current)
        ) {
            return properties.length > 0
                ? unknownProjectionCases(restProperties(properties), defaults, seen)
                : [caseOf({ kind: "local" }, definedness.nonUndefined, literalValueState(current))];
        }
        if (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
            const property = initialProperty(current);
            if (property === unknownProperty) {
                return unknownProjectionCases(properties, defaults, seen, current.expression);
            }
            return projectInitialCases(
                current.expression,
                useNode,
                seen,
                [property, ...properties],
                [null, ...defaults],
                history,
                captureNode,
            );
        }
        if (ts.isAwaitExpression(current)) {
            const awaitedCases = projectInitialCases(
                current.expression,
                current.expression,
                seen,
                [],
                [],
                history,
                captureNode,
            );
            const namespaces = awaitedCases.flatMap((item) => {
                if (item.provenance.kind !== "module-promise") return [item];
                const candidates = item.provenance.specifiers ??
                    (item.provenance.moduleName ? [item.provenance.moduleName] : []);
                return candidates.length > 0
                    ? candidates.map((moduleName) =>
                          caseOf(
                              processModules.has(moduleName)
                                  ? { kind: "process-global", moduleName }
                                  : canonicalBuiltinRoot(moduleName)
                                    ? {
                                          kind: "cjs-module-namespace",
                                          moduleName,
                                          cjsRoot: canonicalBuiltinRoot(moduleName),
                                      }
                                    : { kind: "module-namespace", moduleName },
                              definedness.nonUndefined,
                          ),
                      )
                    : [item];
            });
            return properties.length > 0
                    ? applyCaseProperties(namespaces, properties, captureNode ?? useNode)
                : dedupeCases(namespaces);
        }
        if (ts.isObjectLiteralExpression(current)) {
            if (properties.length === 0) return [caseOf({ kind: "local" }, definedness.nonUndefined)];
            return projectFiniteObjectCases(current, properties[0], properties.slice(1), defaults, seen, history);
        }
        if (ts.isArrayLiteralExpression(current)) {
            if (properties.length === 0) return [caseOf({ kind: "local" }, definedness.nonUndefined)];
            return projectFiniteArrayCases(current, properties[0], properties.slice(1), defaults, seen, history);
        }
        if (ts.isBinaryExpression(current)) {
            if (current.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                return projectInitialCases(current.right, current.right, seen, properties, defaults, history);
            }
            if (current.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
                return projectInitialCases(current.right, current.right, seen, properties, defaults, history);
            }
            if (logicalAssignmentOperators.has(current.operatorToken.kind)) {
                const leftCases = projectInitialCases(current.left, current.left, seen, [], [], history);
                const rightCases = projectInitialCases(current.right, current.right, seen, [], [], history);
                const operator = current.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken
                    ? ts.SyntaxKind.AmpersandAmpersandToken
                    : current.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken
                      ? ts.SyntaxKind.BarBarToken
                      : ts.SyntaxKind.QuestionQuestionToken;
                const selected = logicalResultCases(leftCases, rightCases, operator);
                return properties.length > 0
                    ? applyCaseProperties(selected, properties, useNode)
                    : selected;
            }
            if (
                [
                    ts.SyntaxKind.AmpersandAmpersandToken,
                    ts.SyntaxKind.BarBarToken,
                    ts.SyntaxKind.QuestionQuestionToken,
                ].includes(current.operatorToken.kind)
            ) {
                const leftCases = projectInitialCases(current.left, current.left, seen, [], [], history);
                const rightCases = projectInitialCases(current.right, current.right, seen, [], [], history);
                const selected = logicalResultCases(
                    leftCases,
                    rightCases,
                    current.operatorToken.kind,
                );
                return properties.length > 0
                    ? applyCaseProperties(selected, properties, useNode)
                    : selected;
            }
        }
        if (ts.isConditionalExpression(current)) {
            return dedupeCases([
                ...projectInitialCases(current.whenTrue, current.whenTrue, seen, properties, defaults, history),
                ...projectInitialCases(current.whenFalse, current.whenFalse, seen, properties, defaults, history),
            ]);
        }
        if (ts.isCallExpression(current)) {
            let calleeCases = projectInitialCases(
                current.expression,
                current.expression,
                seen,
            );
            if (
                ts.isIdentifier(current.expression) &&
                calleeCases.some(
                    ({ provenance }) =>
                        provenance.kind === "create-require-factory",
                )
            ) {
                calleeCases = resolveCases(
                      current.expression,
                      current.expression,
                      new Set(seen),
                  ).map((provenance) =>
                      caseOf(
                          provenance,
                          isDefiniteProvenance(provenance)
                              ? definedness.nonUndefined
                              : definedness.unknown,
                      ),
                  );
            }
            const derived = calleeCases.flatMap(({ provenance }) => {
                if (provenance.kind === "create-require-factory") {
                    const state = mutationState(
                        `esm:${provenance.moduleName}`,
                        [provenance.member],
                        current.expression,
                    );
                    if (state.affected &&
                        state.replacement?.kind !== "create-require-factory") {
                        return [];
                    }
                    return [caseOf({ kind: "require-loader", loader: "createRequire" }, definedness.nonUndefined)];
                }
                if (provenance.kind !== "require-loader") return [];
                const moduleName = current.arguments[0] && literalString(current.arguments[0]);
                if (!moduleName) return [unknownCase()];
                if (processModules.has(moduleName)) {
                    return [caseOf({ kind: "process-global", moduleName }, definedness.nonUndefined)];
                }
                const cjsRoot = canonicalBuiltinRoot(moduleName);
                return cjsRoot
                    ? [caseOf({ kind: "cjs-module-namespace", moduleName, cjsRoot }, definedness.nonUndefined)]
                    : [];
            });
            if (derived.length > 0) {
                return properties.length > 0
                    ? applyCaseProperties(derived, properties, captureNode ?? useNode)
                    : dedupeCases(derived);
            }
        }
        const resolved = resolveExpression(current, useNode, seen);
        const item = caseOf(
            resolved,
            isDefiniteProvenance(resolved) ? definedness.nonUndefined : definedness.unknown,
        );
        return properties.length > 0
            ? item.definedness === definedness.nonUndefined
                ? applyCaseProperties([item], properties, useNode)
                : unknownProjectionCases(restProperties(properties), defaults, seen)
            : [item];
    };
    const restProperties = (properties) => properties.slice(1);
    const unknownProjectionCases = (rest, defaults, seen, source = null) => {
        const cases = [unknownCase()];
        if (source) {
            const current = unwrapTransparentSyntax(source);
            if (ts.isObjectLiteralExpression(current)) {
                for (const entry of current.properties) {
                    if (ts.isSpreadAssignment(entry)) {
                        cases.push(...projectInitialCases(
                            entry.expression,
                            entry.expression,
                            seen,
                            [unknownProperty, ...rest],
                            defaults,
                        ));
                    } else if (ts.isPropertyAssignment(entry)) {
                        cases.push(...selectInitialSegment(
                            entry.initializer,
                            entry,
                            rest,
                            defaults,
                            seen,
                        ));
                    } else if (ts.isShorthandPropertyAssignment(entry)) {
                        cases.push(...selectInitialSegment(
                            entry.name,
                            entry,
                            rest,
                            defaults,
                            seen,
                        ));
                    }
                }
            } else if (ts.isArrayLiteralExpression(current)) {
                for (const element of current.elements) {
                    if (element && ts.isSpreadElement(element)) {
                        cases.push(...projectInitialCases(
                            element.expression,
                            element.expression,
                            seen,
                            [unknownProperty, ...rest],
                            defaults,
                        ));
                    } else {
                        cases.push(...selectInitialSegment(
                            element && !ts.isOmittedExpression(element) ? element : null,
                            element ?? current,
                            rest,
                            defaults,
                            seen,
                        ));
                    }
                }
            } else if (ts.isIdentifier(current)) {
                const record = lookupInitial(current.text, current);
                if (record && !seen.has(record)) {
                    cases.push(...projectInitialCases(
                        current,
                        current,
                        seen,
                        [unknownProperty, ...rest],
                        defaults,
                    ));
                }
            }
        }
        for (let index = 0; index < defaults.length; index += 1) {
            const initializer = defaults[index];
            if (!initializer) continue;
            cases.push(
                ...projectInitialCases(
                    initializer,
                    initializer,
                    seen,
                    rest.slice(index),
                    defaults.slice(index + 1),
                ),
            );
        }
        return dedupeCases(cases);
    };
    const selectInitialSegment = (
        value,
        useNode,
        rest,
        defaults,
        seen,
        present = value !== null,
    ) => {
        const direct = projectInitialCases(value, useNode, seen);
        const states = new Set(direct.map(({ definedness: state }) => state));
        const maybeUndefined = states.has(definedness.unknown) ||
            (states.has(definedness.undefined) && states.has(definedness.nonUndefined));
        const valueCases = states.has(definedness.nonUndefined) || states.has(definedness.unknown)
            ? projectInitialCases(value, useNode, seen, rest, defaults.slice(1)).map(
                  (item) => ({ ...item, present }),
              )
            : [];
        const defaultCases = defaults[0]
            ? projectInitialCases(defaults[0], defaults[0], seen, rest, defaults.slice(1)).map(
                  (item) => ({ ...item, present: true }),
              )
            : [undefinedCase(present)];
        if (states.size === 1 && states.has(definedness.undefined)) return defaultCases;
        return dedupeCases([
            ...valueCases,
            ...(maybeUndefined ? defaultCases : []),
        ]);
    };
    const directContainerAlias = (record) => {
        if (
            !record ||
            !isStableBindingIdentity(record) ||
            record.propertyPath?.length
        ) return null;
        const initializer =
            record.initializer && unwrapTransparentSyntax(record.initializer);
        if (!initializer || !ts.isIdentifier(initializer)) return null;
        const next = lookupInitial(initializer.text, record.declaration);
        return next && next !== record ? next : null;
    };
    const canonicalContainerRecord = (record) => {
        if (!record || typeof record !== "object") return record;
        const cached = canonicalContainerCache.get(record);
        if (cached) return cached;
        const path = [];
        const visited = new Set();
        let current = record;
        while (current && !visited.has(current)) {
            const compressed = canonicalContainerCache.get(current);
            if (compressed) {
                current = compressed;
                break;
            }
            visited.add(current);
            path.push(current);
            const next = directContainerAlias(current);
            if (!next) break;
            current = next;
        }
        const canonical = current ?? record;
        for (const item of path) canonicalContainerCache.set(item, canonical);
        return canonical;
    };
    const pathPrefix = (prefix, properties, includeExact = false) =>
        (includeExact ? prefix.length <= properties.length : prefix.length < properties.length) &&
        prefix.every((property, index) =>
            overlappingProperty(property, properties[index]),
        );
    const dedupeProjectedPaths = (paths) => {
        const result = [];
        for (const path of paths) {
            if (
                !result.some(
                    (item) =>
                        item.record === path.record &&
                        item.snapshotDepth === path.snapshotDepth &&
                        item.snapshotAt === path.snapshotAt &&
                        item.properties.length === path.properties.length &&
                        item.properties.every((property, index) =>
                            exactProperty(property, path.properties[index]),
                        ),
                )
            ) result.push(path);
        }
        return result;
    };
    const recordReboundBetween = (record, start, end) => {
        if (!record || !start || !end) return false;
        const startPosition = start.getStart(sourceFile);
        const endPosition = end.getStart(sourceFile);
        return (record.assignmentSources ?? []).some(
            (write) =>
                write.operator === ts.SyntaxKind.EqualsToken &&
                write.site &&
                write.site.getStart(sourceFile) > startPosition &&
                write.site.getStart(sourceFile) < endPosition,
        );
    };
    const selectFiniteExpressionPath = (node, properties) => {
        let current = unwrapTransparentSyntax(node);
        let index = 0;
        while (index < properties.length) {
            const property = properties[index];
            if (ts.isObjectLiteralExpression(current)) {
                let selected = null;
                for (let candidateIndex = current.properties.length - 1; candidateIndex >= 0; candidateIndex -= 1) {
                    const candidate = current.properties[candidateIndex];
                    if (ts.isSpreadAssignment(candidate)) break;
                    if (
                        candidate.name &&
                        exactProperty(
                            resolvedPropertyKey(candidate.name, candidate),
                            property,
                        ) &&
                        (ts.isPropertyAssignment(candidate) ||
                            ts.isShorthandPropertyAssignment(candidate))
                    ) {
                        selected = ts.isPropertyAssignment(candidate)
                            ? candidate.initializer
                            : candidate.name;
                        break;
                    }
                }
                if (!selected) break;
                current = unwrapTransparentSyntax(selected);
                index += 1;
                continue;
            }
            if (ts.isArrayLiteralExpression(current)) {
                const arrayIndex = typeof property === "number"
                    ? property
                    : typeof property === "string" && /^\d+$/.test(property)
                      ? Number(property)
                      : -1;
                const selected = current.elements[arrayIndex];
                if (
                    arrayIndex < 0 ||
                    !selected ||
                    ts.isOmittedExpression(selected) ||
                    ts.isSpreadElement(selected)
                ) break;
                current = unwrapTransparentSyntax(selected);
                index += 1;
                continue;
            }
            break;
        }
        return {
            node: current,
            remaining: properties.slice(index),
        };
    };
    const exactExpressionEndpoint = (node, site) => {
        let current = unwrapTransparentSyntax(node);
        const properties = [];
        while (
            ts.isPropertyAccessExpression(current) ||
            ts.isElementAccessExpression(current)
        ) {
            const property = initialProperty(current);
            if (property === unknownProperty) return null;
            properties.unshift(property);
            current = unwrapTransparentSyntax(current.expression);
        }
        if (!ts.isIdentifier(current)) return null;
        const record = lookupInitial(current.text, site ?? current);
        if (!record) return null;
        return {
            record: canonicalContainerRecord(record),
            properties: [...(record.propertyPath ?? []), ...properties],
        };
    };
    const reachingRecordSource = (record, site) => {
        const latest = latestDefiniteWrite(
            record,
            site,
            (write) =>
                write.operator === ts.SyntaxKind.EqualsToken &&
                write.node,
        );
        const node = latest?.node ?? record.initializer ?? record.defaultInitializer;
        return node
            ? {
                  node,
                  site: latest?.site ?? record.declaration,
                  properties: latest
                      ? latest.properties ?? []
                      : record.propertyPath ?? [],
              }
            : null;
    };
    const containerValuedExpression = (node, site, seen = new Set()) => {
        let current = unwrapTransparentSyntax(node);
        if (
            ts.isObjectLiteralExpression(current) ||
            ts.isArrayLiteralExpression(current)
        ) return true;
        const endpoint = exactExpressionEndpoint(current, site);
        if (!endpoint || seen.has(endpoint.record)) return false;
        const record = endpoint.record;
        const source = reachingRecordSource(record, site);
        if (!source) return false;
        const selected = selectFiniteExpressionPath(
            source.node,
            [...source.properties, ...endpoint.properties],
        );
        return selected.remaining.length === 0 &&
            containerValuedExpression(
                selected.node,
                source.site,
                new Set(seen).add(record),
            );
    };
    const sameProjectedEndpoint = (left, right) =>
        canonicalContainerRecord(left.record) ===
            canonicalContainerRecord(right.record) &&
        left.properties.length === right.properties.length &&
        left.properties.every((property, index) =>
            exactProperty(property, right.properties[index]),
        );
    const reachingContainerSourceState = (edge, site) => {
        const record = edge.source.record;
        let state = edge.source.initial ? "exact" : "inactive";
        let sticky = false;
        const events = [
            ...(record.assignmentSources ?? []).map((write) => ({ write })),
            ...(record.unknownWriteSites ?? []).map((write) => ({ write, unknown: true })),
        ].sort(
            (left, right) =>
                (left.write.site?.getStart(sourceFile) ?? 0) -
                (right.write.site?.getStart(sourceFile) ?? 0),
        );
        for (const event of events) {
            const write = event.write;
            if (!writeAppliesAt(write, site)) continue;
            if (event.unknown || write.crossFunction || !write.site) {
                sticky = true;
                state = "possible";
                continue;
            }
            if (write.operator !== ts.SyntaxKind.EqualsToken) {
                state = "possible";
                continue;
            }
            const selected = edge.source.write === write;
            if (write.may) {
                if (selected || state !== "inactive") state = "possible";
            } else if (!sticky) {
                state = selected ? "exact" : "inactive";
            }
        }
        return edge.possible && state === "exact" ? "possible" : state;
    };
    const ensureContainerIdentityIndex = () => {
        if (containerIdentityIndex) return;
        containerIdentityIndex = new Map();
        const put = (edge) => {
            const canonical = canonicalContainerRecord(edge.slot.record);
            const edges = containerIdentityIndex.get(canonical) ?? [];
            if (!edges.includes(edge)) edges.push(edge);
            containerIdentityIndex.set(canonical, edges);
        };
        const finiteSources = (node, site, properties = [], seen = new Set()) => {
            const current = unwrapTransparentSyntax(node);
            if (!current) return [];
            if (ts.isConditionalExpression(current)) {
                return [
                    ...finiteSources(current.whenTrue, current.whenTrue, properties, seen),
                    ...finiteSources(current.whenFalse, current.whenFalse, properties, seen),
                ].map((source) => ({ ...source, possible: true }));
            }
            if (ts.isIdentifier(current)) {
                const record = canonicalContainerRecord(
                    lookupInitial(current.text, site ?? current),
                );
                if (!record || seen.has(record)) return [];
                const source = reachingRecordSource(record, site);
                if (!source) return [];
                return finiteSources(
                    source.node,
                    source.site,
                    [
                        ...source.properties,
                        ...properties,
                    ],
                    new Set(seen).add(record),
                );
            }
            if (
                ts.isPropertyAccessExpression(current) ||
                ts.isElementAccessExpression(current)
            ) {
                const property = initialProperty(current);
                return property === unknownProperty
                    ? []
                    : finiteSources(
                          current.expression,
                          site,
                          [property, ...properties],
                          seen,
                      );
            }
            if (properties.length === 0) {
                return ts.isObjectLiteralExpression(current) ||
                    ts.isArrayLiteralExpression(current)
                    ? [{ node: current, possible: false }]
                    : [];
            }
            const [property, ...rest] = properties;
            if (ts.isObjectLiteralExpression(current)) {
                const candidates = [];
                let uncertainLater = false;
                for (let index = current.properties.length - 1; index >= 0; index -= 1) {
                    const entry = current.properties[index];
                    if (ts.isSpreadAssignment(entry)) {
                        const spread = finiteSources(
                            entry.expression,
                            entry.expression,
                            properties,
                            seen,
                        );
                        if (spread.length === 0) {
                            uncertainLater = true;
                        } else {
                            candidates.push(...spread.map((item) => ({
                                ...item,
                                possible: item.possible || uncertainLater,
                            })));
                            uncertainLater ||= spread.some((item) => item.possible);
                        }
                        continue;
                    }
                    if (
                        !entry.name ||
                        (!ts.isPropertyAssignment(entry) &&
                            !ts.isShorthandPropertyAssignment(entry))
                    ) {
                        uncertainLater = true;
                        continue;
                    }
                    const key = resolvedPropertyKey(entry.name, entry);
                    if (!overlappingProperty(key, property)) continue;
                    const value = ts.isPropertyAssignment(entry)
                        ? entry.initializer
                        : entry.name;
                    const selected = finiteSources(value, entry, rest, seen).map((item) => ({
                        ...item,
                        possible:
                            item.possible ||
                            key === unknownProperty ||
                            uncertainLater,
                    }));
                    candidates.push(...selected);
                    if (key !== unknownProperty && !uncertainLater) break;
                    uncertainLater = true;
                }
                return candidates;
            }
            if (!ts.isArrayLiteralExpression(current)) return [];
            const index = typeof property === "number"
                ? property
                : typeof property === "string" && /^\d+$/.test(property)
                  ? Number(property)
                  : -1;
            if (
                index < 0 ||
                current.elements.some((element) => element && ts.isSpreadElement(element))
            ) return [];
            const element = current.elements[index];
            return element && !ts.isOmittedExpression(element)
                ? finiteSources(element, element, rest, seen)
                : [];
        };
        const visitValue = (
            node,
            slot,
            source,
            possible,
            seen,
        ) => {
            const current = unwrapTransparentSyntax(node);
            if (seen.has(current)) return;
            const nextSeen = new Set(seen).add(current);
            if (ts.isConditionalExpression(current)) {
                visitValue(current.whenTrue, slot, source, true, nextSeen);
                visitValue(current.whenFalse, slot, source, true, nextSeen);
                return;
            }
            if (ts.isObjectLiteralExpression(current)) {
                const flattened = [];
                const pending = [...current.properties].reverse()
                    .map((property) => ({ property, possible: false }));
                while (pending.length > 0) {
                    const { property, possible: spreadPossible } = pending.pop();
                    if (ts.isSpreadAssignment(property)) {
                        const spreads = finiteSources(
                            property.expression, property.expression, [], nextSeen,
                        );
                        if (
                            spreads.length === 0 ||
                            spreads.some(({ node }) => !ts.isObjectLiteralExpression(node))
                        ) {
                            flattened.push({
                                key: unknownProperty, value: null,
                                possible: true, unknown: true,
                            });
                            continue;
                        }
                        for (let index = spreads.length - 1; index >= 0; index -= 1) {
                            const spread = spreads[index];
                            for (let propertyIndex = spread.node.properties.length - 1;
                                propertyIndex >= 0; propertyIndex -= 1) {
                                pending.push({
                                    property: spread.node.properties[propertyIndex],
                                    possible: spreadPossible || spread.possible,
                                });
                            }
                        }
                        continue;
                    }
                    if (
                        !property.name ||
                        (!ts.isPropertyAssignment(property) &&
                            !ts.isShorthandPropertyAssignment(property))
                    ) {
                        flattened.push({
                            key: unknownProperty, value: null,
                            possible: true, unknown: true,
                        });
                        continue;
                    }
                    const key = resolvedPropertyKey(property.name, property);
                    flattened.push({
                        key,
                        value: ts.isPropertyAssignment(property)
                            ? property.initializer
                            : property.name,
                        possible: spreadPossible || key === unknownProperty,
                        unknown: false,
                    });
                }
                for (const [index, entry] of flattened.entries()) {
                    if (entry.unknown) continue;
                    const later = flattened.slice(index + 1).filter((candidate) =>
                        overlappingProperty(entry.key, candidate.key),
                    );
                    if (
                        later.some(
                            (candidate) => !candidate.possible && !candidate.unknown,
                        )
                    ) continue;
                    entry.possible ||= later.length > 0;
                    const { key, value } = entry;
                    visitValue(
                        value, {
                            record: slot.record,
                            properties: [...slot.properties, key],
                        },
                        source, possible || entry.possible, nextSeen,
                    );
                }
                return;
            }
            if (ts.isArrayLiteralExpression(current)) {
                if (current.elements.some((element) => element && ts.isSpreadElement(element))) {
                    return;
                }
                current.elements.forEach((element, index) => {
                    if (!element || ts.isOmittedExpression(element)) return;
                    visitValue(
                        element,
                        {
                            record: slot.record,
                            properties: [...slot.properties, index],
                        },
                        source,
                        possible,
                        nextSeen,
                    );
                });
                return;
            }
            const endpoint = exactExpressionEndpoint(current, source.createdAt);
            if (
                endpoint &&
                containerValuedExpression(current, source.createdAt)
            ) {
                put({
                    slot,
                    value: endpoint,
                    source,
                    createdAt: source.createdAt,
                    possible,
                });
            }
        };
        for (const record of records) {
            if (
                !["variable", "parameter"].includes(record.kind) ||
                directContainerAlias(record) !== null
            ) continue;
            const roots = [
                ...(record.initializer || record.defaultInitializer
                    ? [{
                          node: record.initializer ?? record.defaultInitializer,
                          properties: record.propertyPath ?? [],
                          createdAt: record.declaration,
                          initial: true,
                          write: null,
                      }]
                    : []),
                ...(record.assignmentSources ?? [])
                    .filter((write) =>
                        write.operator === ts.SyntaxKind.EqualsToken && write.node,
                    )
                    .map((write) => ({
                        node: write.node,
                        properties: write.properties ?? [],
                        createdAt: write.site ?? write.node,
                        initial: false,
                        write,
                    })),
            ];
            for (const source of roots) {
                source.record = record;
                for (const selected of finiteSources(
                    source.node,
                    source.createdAt,
                    source.properties,
                )) {
                    visitValue(
                        selected.node,
                        {
                            record: canonicalContainerRecord(record),
                            properties: [],
                        },
                        source,
                        selected.possible,
                        new Set(),
                    );
                }
            }
        }
    };
    const identityEdgeState = (edge, site, priorEntries) => {
        if (
            edge.createdAt &&
            site &&
            functionNodeFor(edge.createdAt) === functionNodeFor(site) &&
            edge.createdAt.getStart(sourceFile) >= site.getStart(sourceFile)
        ) return "inactive";
        let state = reachingContainerSourceState(edge, site);
        if (state === "inactive") return state;
        let sticky = false;
        for (const entry of priorEntries) {
            const mutation = entry.mutation;
            if (!mutationAppliesAt(mutation, site)) continue;
            if (
                edge.createdAt &&
                mutation.site &&
                !mutation.crossFunction &&
                functionNodeFor(mutation.site) === functionNodeFor(edge.createdAt) &&
                mutation.site.getStart(sourceFile) <=
                    edge.createdAt.getStart(sourceFile)
            ) continue;
            const matches = entry.paths.filter(
                (candidate) =>
                    canonicalContainerRecord(candidate.record) ===
                        canonicalContainerRecord(edge.slot.record) &&
                    pathPrefix(candidate.properties, edge.slot.properties, true),
            );
            if (matches.length === 0) continue;
            if (mutation.crossFunction || !mutation.site) {
                sticky = true;
                state = "possible";
                continue;
            }
            if (mutation.may) {
                state = "possible";
                continue;
            }
            if (sticky) continue;
            state = matches.some((candidate) => {
                const suffix = edge.slot.properties.slice(candidate.properties.length);
                return entry.replacementPaths.some((replacement) =>
                    sameProjectedEndpoint(
                        {
                            ...replacement,
                            properties: [...replacement.properties, ...suffix],
                        },
                        edge.value,
                    ),
                );
            })
                ? "exact"
                : "inactive";
        }
        return state;
    };
    const expandProjectedIdentityPaths = (
        input,
        site,
        priorEntries,
        includeExact = true,
    ) => {
        ensureContainerIdentityIndex();
        const result = dedupeProjectedPaths(input);
        const queue = [...result];
        while (queue.length > 0) {
            const path = queue.shift();
            const canonical = canonicalContainerRecord(path.record);
            for (const edge of containerIdentityIndex.get(canonical) ?? []) {
                if (identityEdgeState(edge, site, priorEntries) === "inactive") continue;
                if (!pathPrefix(edge.slot.properties, path.properties, includeExact)) {
                    continue;
                }
                const mapped = {
                    ...path,
                    record: edge.value.record,
                    properties: [
                        ...edge.value.properties,
                        ...path.properties.slice(edge.slot.properties.length),
                    ],
                    snapshotDepth: path.snapshotAt &&
                        edge.slot.properties.length <= path.snapshotDepth
                        ? edge.value.properties.length +
                            (path.snapshotDepth - edge.slot.properties.length)
                        : path.snapshotDepth,
                };
                const duplicate = result.some((candidate) =>
                    sameProjectedEndpoint(candidate, mapped) &&
                    candidate.snapshotAt === mapped.snapshotAt &&
                    candidate.snapshotDepth === mapped.snapshotDepth,
                );
                if (duplicate) continue;
                result.push(mapped);
                queue.push(mapped);
            }
        }
        return dedupeProjectedPaths(result).filter((path) => {
            const canonical = canonicalContainerRecord(path.record);
            return !(containerIdentityIndex.get(canonical) ?? []).some(
                (edge) =>
                    identityEdgeState(edge, site, priorEntries) === "exact" &&
                    pathPrefix(edge.slot.properties, path.properties, includeExact),
            );
        });
    };
    const redirectProjectedPaths = (input, site, priorEntries, includeExact = false) => {
        let paths = dedupeProjectedPaths(input);
        for (const entry of priorEntries) {
            const mutation = entry.mutation;
            if (!mutationAppliesAt(mutation, site)) continue;
            const uncertain = mutation.may || mutation.crossFunction || !mutation.site;
            const next = [];
            for (const path of paths) {
                if (
                    path.snapshotAt &&
                    recordReboundBetween(path.record, path.snapshotAt, site)
                ) {
                    continue;
                }
                const matches = entry.paths.filter(
                    (candidate) =>
                        canonicalContainerRecord(candidate.record) ===
                            canonicalContainerRecord(path.record) &&
                        pathPrefix(candidate.properties, path.properties, includeExact),
                );
                if (matches.length === 0) {
                    next.push(path);
                    continue;
                }
                const invalidatesSnapshot = path.snapshotAt && matches.some(
                    (candidate) =>
                        mutation.site?.getStart(sourceFile) >
                            path.snapshotAt.getStart(sourceFile) &&
                        candidate.properties.length <= path.snapshotDepth,
                );
                if (invalidatesSnapshot) {
                    if (uncertain) next.push(path);
                    continue;
                }
                const mapped = matches.flatMap((candidate) =>
                    entry.replacementPaths.map((replacement) => ({
                        ...replacement,
                        properties: [
                            ...replacement.properties,
                            ...path.properties.slice(candidate.properties.length),
                        ],
                    })),
                );
                const replacement = unwrapTransparentSyntax(mutation.replacement);
                const retainsLiteralContainer =
                    mutation.replacementKnown &&
                    (ts.isObjectLiteralExpression(replacement) ||
                        ts.isArrayLiteralExpression(replacement));
                const redirected = mapped.length === 0 && retainsLiteralContainer
                    ? [path]
                    : mapped;
                if (uncertain) next.push(path, ...redirected);
                else next.push(...redirected);
            }
            paths = dedupeProjectedPaths(next);
        }
        return paths;
    };
    const projectedExpressionPaths = (
        node,
        site,
        priorEntries,
        seen = new Set(),
        capture = false,
    ) => {
        let current = unwrapTransparentSyntax(node);
        const properties = [];
        while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
            const property = initialProperty(current);
            if (property === unknownProperty) return [];
            properties.unshift(property);
            current = unwrapTransparentSyntax(current.expression);
        }
        if (!ts.isIdentifier(current)) return [];
        const record = lookupInitial(current.text, site ?? current);
        if (!record) return [];
        const roots = resolveProjectedAlias(record, site, priorEntries, seen);
        const redirected = redirectProjectedPaths(
            roots.map((root) => ({
                ...root,
                properties: [...root.properties, ...properties],
            })),
            site,
            priorEntries,
            true,
        );
        const expanded = expandProjectedIdentityPaths(
            redirected,
            site,
            priorEntries,
        );
        return capture
            ? expanded.map((path) => ({
                  ...path,
                  snapshotAt: site,
                  snapshotDepth: path.properties.length,
              }))
            : expanded;
    };
    const resolveProjectedAlias = (record, site, priorEntries, seen = new Set()) => {
        if (!record || seen.has(record)) return [];
        const canonical = canonicalContainerRecord(record);
        if (canonical && canonical !== record) {
            return resolveProjectedAlias(canonical, site, priorEntries, seen);
        }
        const nextSeen = new Set(seen).add(record);
        const source = reachingRecordSource(record, site);
        const effectiveProperties = source?.properties ?? record.propertyPath ?? [];
        if (!source) {
            return [{
                record,
                properties: [...effectiveProperties],
                snapshotAt: null,
                snapshotDepth: 0,
            }];
        }
        const selected = selectFiniteExpressionPath(source.node, effectiveProperties);
        const aliases = projectedExpressionPaths(
            selected.node,
            source.site,
            priorEntries,
            nextSeen,
            true,
        );
        const selectedContainer =
            ts.isObjectLiteralExpression(selected.node) ||
            ts.isArrayLiteralExpression(selected.node);
        return aliases.length > 0
            ? aliases.map((alias) => ({
                  ...alias,
                  properties: [...alias.properties, ...selected.remaining],
                  snapshotDepth: alias.snapshotDepth + selected.remaining.length,
              }))
            : [{
                  record,
                  properties: selectedContainer
                      ? [...selected.remaining]
                      : [...effectiveProperties],
                  snapshotAt: null,
                  snapshotDepth: 0,
              }];
    };
    const projectedMutationPath = (mutation, priorEntries) => {
        if (!mutation.target) return [];
        return dedupeProjectedPaths(
            mutationReceiverPrefixes(
                mutation.target,
                mutation.whole ? undefined : mutation.property,
            ).flatMap((candidate) => {
                if (!ts.isIdentifier(candidate.receiver)) return [];
                const record = lookupInitial(
                    candidate.receiver.text,
                    mutation.site ?? candidate.receiver,
                );
                if (!record) return [];
                const aliases = resolveProjectedAlias(
                    record,
                    mutation.site ?? candidate.receiver,
                    priorEntries,
                );
                return expandProjectedIdentityPaths(
                    aliases.flatMap((alias) =>
                        redirectProjectedPaths(
                            [{
                                ...alias,
                                properties: [...alias.properties, ...candidate.properties],
                            }],
                            mutation.site ?? candidate.receiver,
                            priorEntries,
                        ),
                    ),
                    mutation.site ?? candidate.receiver,
                    priorEntries,
                    mutation.whole,
                );
            }),
        );
    };
    const projectedBuiltin = (item) => [
        "fs-member", "module-member", "path-member", "url-member", "process-member",
        "fs-promises-namespace", "fs-promises-property", "cjs-module-namespace",
        "module-namespace", "require-loader", "create-require-factory",
    ].includes(item.provenance?.kind);
    const ensureProjectedMutations = () => {
        if (projectedMutationIndex && projectedMutationEntries) return;
        projectedMutationIndex = new Map();
        projectedMutationEntries = [];
        for (const mutation of sharedMutations) {
            const paths = projectedMutationPath(mutation, projectedMutationEntries);
            const replacementPaths =
                mutation.replacementKnown &&
                !mutation.definitelyUndefined &&
                mutation.replacement
                    ? projectedExpressionPaths(
                          mutation.replacement,
                          mutation.site ?? mutation.replacement,
                          projectedMutationEntries,
                          new Set([mutation]),
                          true,
                      )
                    : [];
            const projectedEntry = { mutation, paths, replacementPaths };
            projectedMutationEntries.push(projectedEntry);
            for (const path of paths) {
                const target = canonicalContainerRecord(path.record);
                if (!target) continue;
                const entries = projectedMutationIndex.get(target) ?? [];
                entries.push({ mutation, path, properties: path.properties });
                projectedMutationIndex.set(target, entries);
            }
        }
        for (const entries of projectedMutationIndex.values()) {
            entries.sort(
                (left, right) =>
                    (left.mutation.site?.getStart(sourceFile) ?? 0) -
                    (right.mutation.site?.getStart(sourceFile) ?? 0),
            );
        }
    };
    const orderedProjectedMutationEntries = (
        path,
        useNode,
        history = false,
    ) => {
        ensureProjectedMutations();
        const canonical = canonicalContainerRecord(path.record);
        return (projectedMutationIndex.get(canonical) ?? []).filter((entry) => {
            const mutation = entry.mutation;
            if (!history && !mutationAppliesAt(mutation, useNode)) return false;
            if (
                path.snapshotAt &&
                mutation.site &&
                !mutation.crossFunction &&
                functionNodeFor(mutation.site) === functionNodeFor(path.snapshotAt) &&
                mutation.site.getStart(sourceFile) <=
                    path.snapshotAt.getStart(sourceFile)
            ) return false;
            const common = Math.min(
                entry.properties.length,
                path.properties.length,
            );
            return entry.properties
                .slice(0, common)
                .every((property, index) =>
                    overlappingProperty(property, path.properties[index]),
                );
        });
    };
    const projectedUsePaths = (record, properties, useNode) => {
        ensureProjectedMutations();
        const aliases = expandProjectedIdentityPaths(
            resolveProjectedAlias(
                record,
                useNode,
                projectedMutationEntries,
            ).map((alias) => ({
                ...alias,
                properties: [...alias.properties, ...properties],
            })),
            useNode,
            projectedMutationEntries,
        );
        return dedupeProjectedPaths(
            aliases.flatMap((alias) => {
                const path = alias;
                if (!path.snapshotAt) return [path];
                const snapshotPosition = path.snapshotAt.getStart(sourceFile);
                const detachments = projectedMutationEntries.filter(({ mutation, paths }) =>
                    mutationAppliesAt(mutation, useNode) &&
                    (!mutation.site ||
                        mutation.crossFunction ||
                        mutation.site.getStart(sourceFile) > snapshotPosition) &&
                    paths.some(
                        (candidate) =>
                            canonicalContainerRecord(candidate.record) ===
                                canonicalContainerRecord(path.record) &&
                            pathPrefix(candidate.properties, path.properties, true) &&
                            candidate.properties.length <= path.snapshotDepth,
                    ),
                );
                if (detachments.length === 0) return [path];
                const detached = {
                    record,
                    properties: [...properties],
                    snapshotAt: null,
                    snapshotDepth: 0,
                };
                if (path.properties.length === path.snapshotDepth) {
                    return [detached];
                }
                return detachments.some(
                    ({ mutation }) =>
                        mutation.may || mutation.crossFunction || !mutation.site,
                )
                    ? [path, detached]
                    : [detached];
            }),
        );
    };
    const foldProjectedMutations = (
        initialCases,
        record,
        properties,
        defaults,
        useNode,
        history,
        seen,
        captureNode,
    ) => {
        ensureProjectedMutations();
        const usePaths = projectedUsePaths(record, properties, useNode);
        if (usePaths.length === 0) return initialCases;
        const folded = usePaths.map((usePath) => {
            const canonical = canonicalContainerRecord(usePath.record);
            let cases = initialCases;
            const baselineCases = initialCases;
            let stickyCases = [];
            if (!canonical || !["variable", "parameter"].includes(canonical.kind)) {
                return cases;
            }
            for (const entry of orderedProjectedMutationEntries(
                usePath,
                useNode,
                history,
            )) {
                const mutation = entry.mutation;
                if (seen.has(mutation)) continue;
                const writePath = entry.properties;
                const unknownPath =
                    mutation.whole || writePath.includes(unknownProperty);
                if (
                    writePath.length > usePath.properties.length ||
                    writePath.some((item, index) =>
                        !overlappingProperty(item, usePath.properties[index]),
                    )
                ) continue;
                const uncertain = mutation.may || mutation.crossFunction || !mutation.site;
                let replacementCases;
                if (unknownPath || (!mutation.definitelyUndefined && !mutation.replacementKnown)) {
                    replacementCases = unknownProjectionCases(
                        restProperties(usePath.properties),
                        defaults,
                        seen,
                    );
                } else {
                    const remaining = usePath.properties.slice(writePath.length);
                    const mutationSeen = new Set(seen);
                    mutationSeen.delete(record);
                    mutationSeen.add(mutation);
                    replacementCases = mutation.definitelyUndefined
                        ? selectInitialSegment(
                              null,
                              mutation.site ?? useNode,
                              remaining,
                              defaults,
                              mutationSeen,
                          )
                        : remaining.length === 0
                          ? (() => {
                                const replacementCases = snapshotSyncableEsmCases(
                                    projectInitialCases(
                                        mutation.replacement,
                                        mutation.site ?? useNode ?? mutation.replacement,
                                        mutationSeen,
                                    ),
                                    mutation.site ?? useNode,
                                ).map((item) => ({
                                    ...item,
                                    provenance: capturedBuiltinReplacement(
                                        item.provenance,
                                        mutation.site,
                                    ),
                                }));
                                return replacementCases.length > 0
                                    ? replacementCases
                                    : [unknownCase()];
                            })()
                        : selectInitialSegment(
                              mutation.replacement,
                              mutation.site ?? useNode,
                              remaining,
                              defaults,
                              mutationSeen,
                          );
                    if (mutation.definitelyUndefined && defaults[0]) {
                        replacementCases = replacementCases.map((item) =>
                            item.provenance.kind === "fs-member" &&
                            item.provenance.cjsRoot === "fs-promises"
                                ? {
                                      ...item,
                                      provenance: {
                                          ...item.provenance,
                                          capturedAt: captureNode,
                                      },
                                  }
                                : item,
                        );
                    }
                }
                const boundarySourceCases = (
                    unknownPath && !cases.some(projectedBuiltin)
                        ? baselineCases
                        : cases
                ).filter(
                    (item) =>
                        projectedBuiltin(item) || item.provenance.kind.startsWith("tainted-"),
                );
                const replacementBoundaryCases = boundarySourceCases
                    .filter(projectedBuiltin)
                    .filter(() => !replacementCases.some(projectedBuiltin))
                    .map((item) =>
                        caseOf(
                            {
                                ...item.provenance,
                                kind: item.provenance.kind.startsWith("tainted-")
                                    ? item.provenance.kind
                                    : item.provenance.kind === "fs-member"
                                      ? "tainted-fs-member"
                                      : item.provenance.kind === "fs-promises-namespace"
                                        ? "tainted-fs-namespace"
                                        : "tainted-builtin-member",
                            },
                            definedness.unknown,
                        ),
                    );
                if (mutation.crossFunction || !mutation.site) {
                    stickyCases = dedupeCases([
                        ...stickyCases,
                        ...cases,
                        ...replacementCases,
                        ...replacementBoundaryCases,
                    ]);
                }
                cases = uncertain || history
                    ? dedupeCases([
                          ...cases,
                          ...replacementCases,
                          ...replacementBoundaryCases,
                      ])
                    : dedupeCases([
                          ...replacementCases,
                          ...replacementBoundaryCases,
                      ]);
                if (stickyCases.length > 0) {
                    cases = dedupeCases([...cases, ...stickyCases]);
                }
            }
            return cases;
        });
        return dedupeCases(folded.flat());
    };
    const projectFiniteLiteralValue = (
        value,
        useNode,
        rest,
        defaults,
        seen,
    ) => {
        const cases = selectInitialSegment(
            value,
            useNode,
            rest,
            defaults,
            seen,
        );
        return rest.length === 0
            ? snapshotSyncableEsmCases(cases, useNode)
            : cases;
    };
    const projectFiniteObjectCases = (
        node,
        property,
        rest,
        defaults,
        seen,
    ) => {
        const entries = [];
        for (const entry of node.properties) {
            if (ts.isSpreadAssignment(entry)) {
                continue;
            }
            if (
                !entry.name ||
                (!ts.isPropertyAssignment(entry) && !ts.isShorthandPropertyAssignment(entry))
            ) return unknownProjectionCases(rest, defaults, seen, node);
            const name = resolvedPropertyKey(entry.name, entry);
            if (name === unknownProperty) {
                return unknownProjectionCases(rest, defaults, seen, node);
            }
            entries.push({
                entry,
                name: String(name),
                value: ts.isPropertyAssignment(entry) ? entry.initializer : entry.name,
            });
        }
        if (property === unknownProperty) {
            if (node.properties.some((entry) => ts.isSpreadAssignment(entry))) {
                return unknownProjectionCases(rest, defaults, seen, node);
            }
            return dedupeCases([
                ...entries.flatMap((item) =>
                    projectFiniteLiteralValue(
                        item.value,
                        item.entry,
                        rest,
                        defaults,
                        seen,
                    ),
                ),
                ...selectInitialSegment(null, node, rest, defaults, seen),
            ]);
        }
        const earlier = [];
        for (let index = node.properties.length - 1; index >= 0; index -= 1) {
            const entry = node.properties[index];
            if (ts.isSpreadAssignment(entry)) {
                const spreadCases = projectInitialCases(
                    entry.expression,
                    entry.expression,
                    seen,
                    [property, ...rest],
                    defaults,
                );
                if (spreadCases.some((item) => item.present !== false)) {
                    return dedupeCases([
                        ...spreadCases,
                        ...earlier,
                        ...(spreadCases.some((item) => item.definedness === definedness.unknown)
                            ? unknownProjectionCases(rest, defaults, seen, node)
                            : []),
                    ]);
                }
                continue;
            }
            const name = resolvedPropertyKey(entry.name, entry);
            if (exactProperty(name, property)) {
                return dedupeCases([
                    ...projectFiniteLiteralValue(
                        ts.isPropertyAssignment(entry) ? entry.initializer : entry.name,
                        entry,
                        rest,
                        defaults,
                        seen,
                    ),
                    ...earlier,
                ]);
            }
        }
        return selectInitialSegment(null, node, rest, defaults, seen);
    };
    const projectFiniteArrayCases = (
        node,
        property,
        rest,
        defaults,
        seen,
    ) => {
        const index =
            typeof property === "number"
                ? property
                : typeof property === "string" && /^\d+$/.test(property)
                  ? Number(property)
                  : -1;
        if (node.elements.some((element) => element && ts.isSpreadElement(element))) {
            return unknownProjectionCases(rest, defaults, seen, node);
        }
        if (property === iterateInitialProperty) {
            if (node.elements.length === 0) return [unknownCase()];
            return dedupeCases(
                node.elements.map((element) =>
                    element && !ts.isOmittedExpression(element)
                        ? projectFiniteLiteralValue(
                              element,
                              element,
                              rest,
                              defaults,
                              seen,
                          )
                        : [undefinedCase()],
                ).flat(),
            );
        }
        if (property === unknownProperty) {
            return dedupeCases([
                ...node.elements.map((element) =>
                    projectFiniteLiteralValue(
                        element && !ts.isOmittedExpression(element) ? element : null,
                        element ?? node,
                        rest,
                        defaults,
                        seen,
                    ),
                ).flat(),
                ...selectInitialSegment(null, node, rest, defaults, seen),
            ]);
        }
        if (!Number.isInteger(index) || index < 0 || index >= node.elements.length) {
            return selectInitialSegment(null, node, rest, defaults, seen);
        }
        const element = node.elements[index];
        return projectFiniteLiteralValue(
            element && !ts.isOmittedExpression(element) ? element : null,
            element ?? node,
            rest,
            defaults,
            seen,
        );
    };
    const initialVariants = (node, useNode = node) =>
        projectInitialCases(node, useNode, new Set(), [], [], true).map(
            ({ provenance }) => provenance,
        );
    const isUnreachableLogicalOperand = (node) => {
        let child = node;
        while (child.parent) {
            const parent = child.parent;
            if (ts.isCallExpression(parent) && parent.expression === child) {
                child = parent;
                continue;
            }
            if (
                ts.isPropertyAccessExpression(parent) &&
                parent.expression === child
            ) {
                child = parent;
                continue;
            }
            if (
                ts.isElementAccessExpression(parent) &&
                parent.expression === child
            ) {
                child = parent;
                continue;
            }
            if (
                !ts.isBinaryExpression(parent) ||
                ![
                    ts.SyntaxKind.AmpersandAmpersandToken,
                    ts.SyntaxKind.BarBarToken,
                    ts.SyntaxKind.QuestionQuestionToken,
                    ...logicalAssignmentOperators,
                ].includes(parent.operatorToken.kind) ||
                parent.right !== child
            ) {
                child = parent;
                continue;
            }
            const leftCases = projectInitialCases(parent.left, parent.left, new Set());
            const rightPossible = leftCases.some(({ valueState }) =>
                parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
                parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken
                    ? [valueStates.truthy, valueStates.unknown].includes(valueState)
                    : parent.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
                        parent.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken
                      ? [valueStates.falsy, valueStates.nullish, valueStates.unknown].includes(valueState)
                      : [valueStates.nullish, valueStates.unknown].includes(valueState),
            );
            if (!rightPossible) return true;
            child = parent;
        }
        return false;
    };
    const resolveCases = (node, useNode = node, seen = new Set()) => {
        if (isUnreachableLogicalOperand(node)) return [];
        let currentRoot = unwrapTransparentSyntax(node);
        while (
            ts.isPropertyAccessExpression(currentRoot) ||
            ts.isElementAccessExpression(currentRoot)
        ) currentRoot = unwrapTransparentSyntax(currentRoot.expression);
        const rootRecord = ts.isIdentifier(currentRoot)
            ? lookup(currentRoot.text, currentRoot)
            : null;
        const projected = projectInitialCases(node, useNode, seen);
        const current = resolveExpression(node, useNode, new Set(seen));
        const liveCurrent = liveAt(current, useNode);
        const projectedMutationMayApply = rootRecord &&
            projectedMutationIndex?.get(canonicalContainerRecord(rootRecord))?.some(
                ({ mutation }) => mutationAppliesAt(mutation, useNode),
            );
        const reachingAssignments = (rootRecord?.assignmentSources ?? []).filter(
            (write) => writeAppliesAt(write, useNode),
        );
        const lastAssignment = reachingAssignments.at(-1);
        const definitelyRebound = Boolean(
            lastAssignment &&
            lastAssignment.operator === ts.SyntaxKind.EqualsToken &&
            lastAssignment.node &&
            !lastAssignment.crossFunction &&
            writeIsDefiniteAt(lastAssignment, useNode),
        );
        const historicalTainted = liveCurrent.kind === "local" &&
            rootRecord?.propertyWritten &&
            projectedMutationMayApply &&
            !definitelyRebound &&
            (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) &&
            !projected.some(projectedBuiltin)
            ? projectInitialCases(node, useNode, new Set(seen), [], [], true)
                  .filter(({ provenance }) => provenance.kind.startsWith("tainted-"))
            : [];
        const representedAssignment = Boolean(
            rootRecord?.assignmentSources?.length && !rootRecord.unknownWrite,
        );
        const projectedHasNonLocal = projected.some(
            ({ provenance }) => provenance.kind !== "local",
        );
        const currentIsUnresolvedRecord = Boolean(
            rootRecord && liveCurrent === rootRecord,
        );
        const captureNode = rootRecord?.initializer ?? rootRecord?.defaultInitializer;
        const isCapturedAlias = (provenance) =>
            ts.isIdentifier(node) ||
            ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) &&
                unwrapTransparentSyntax(node.expression) === currentRoot &&
                provenance.cjsRoot === "fs-promises" &&
                (provenance.parentRoot === "fs" || provenance.capturedAt));
        const capturePreservesMember = (provenance) => {
            if (
                !isCapturedAlias(provenance) ||
                !isImmutableBinding(rootRecord) ||
                !captureNode ||
                !["fs-member", "path-member", "url-member", "module-member", "process-member"].includes(
                    provenance.kind,
                )
            ) return false;
            const captureAt = provenance.capturedAt ?? captureNode;
            if (provenance.parentRoot && mutationAffects(provenance.parentRoot, ["promises"], captureAt)) {
                return false;
            }
            if (provenance.cjsRoot && provenance.member) {
                return !mutationAffects(provenance.cjsRoot, [provenance.member], captureAt);
            }
            if (provenance.kind === "process-member") {
                return !mutationAffects("process", [provenance.member], captureAt);
            }
            return provenance.moduleName && provenance.member
                ? !mutationAffects(`esm:${provenance.moduleName}`, [], captureAt)
                : true;
        };
        const captureResult = (provenance) => {
            const assignmentCapture =
                ["variable", "parameter"].includes(rootRecord?.kind) &&
                lastAssignment &&
                lastAssignment.operator === ts.SyntaxKind.EqualsToken &&
                lastAssignment.node &&
                !lastAssignment.crossFunction &&
                writeIsDefiniteAt(lastAssignment, useNode)
                    ? lastAssignment.site ?? lastAssignment.node
                    : null;
            const bindingCapture =
                ["variable", "parameter"].includes(rootRecord?.kind) &&
                (reachingAssignments.length === 0 || assignmentCapture)
                    ? assignmentCapture ??
                      rootRecord.initializer ??
                      rootRecord.defaultInitializer
                    : null;
            const captureAt = provenance.capturedAt ?? bindingCapture;
            if (
                isCapturedAlias(provenance) &&
                captureAt &&
                syncableEsmCapture(provenance)
            ) {
                return snapshotSyncableEsmCases(
                    [caseOf(provenance, definedness.nonUndefined)],
                    captureAt,
                )[0].provenance;
            }
            return capturePreservesMember(provenance) ? provenance : null;
        };
        const captureResults = projected.map(({ provenance }) =>
            captureResult(provenance),
        );
        const suppressLiveCurrent = captureResults.some(Boolean);
        const currentCases = suppressLiveCurrent
            ? []
            : ["tainted-fs-member", "tainted-fs-namespace", "tainted-builtin-member"].includes(liveCurrent.kind)
                ? [
                      caseOf(
                          liveCurrent,
                          definedness.unknown,
                      ),
                  ]
                : historicalTainted.length > 0
                  ? historicalTainted
                : representedAssignment ||
            ((liveCurrent.kind === "local" || currentIsUnresolvedRecord) && projectedHasNonLocal)
                ? []
                : [
                      caseOf(
                          liveCurrent,
                          isDefiniteProvenance(liveCurrent)
                              ? definedness.nonUndefined
                              : definedness.unknown,
                      ),
                ];
        let finalCases = dedupeCases([
            ...projected.map((item, index) => ({
                ...item,
                provenance: captureResults[index] ??
                    liveAt(item.provenance, useNode),
            })),
            ...currentCases,
        ]).map(({ provenance }) => provenance);
        const memberAccess =
            ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)
                ? node
                : null;
        const memberName = memberAccess && initialProperty(memberAccess);
        const liveProcessNamespace = memberAccess &&
            memberName === "cwd" &&
            projectInitialCases(
                memberAccess.expression,
                useNode,
                new Set(seen),
            ).some(({ provenance }) => provenance.kind === "process-global");
        if (liveProcessNamespace) {
            const state = mutationState("process", ["cwd"], useNode);
            if (state.directRestore && !state.affected) {
                finalCases = [{
                    kind: "process-member",
                    moduleName: "runtime",
                    member: "cwd",
                }];
            }
        }
        return dedupeCases(
            finalCases.map((provenance) =>
                caseOf(
                    provenance,
                    isDefiniteProvenance(provenance)
                        ? definedness.nonUndefined
                        : definedness.unknown,
                ),
            ),
        ).map(({ provenance }) => provenance);
    };
    const knownPathValue = (node, useNode = node) => {
        const record = ts.isIdentifier(node) ? lookup(node.text, useNode) : null;
        if (!record || record.tainted || record.written) return null;
        const knownValue = parameterValues.get(record) ??
            parameterValues.get(record.declaration?.getStart(sourceFile));
        return knownValue === undefined ? null : knownValue;
    };
    const isUnshadowed = (name, node) => lookup(name, node) === null;
    const initialCarrierInvalidated = (node, useNode = node) => {
        const record = ts.isIdentifier(node) ? lookup(node.text, useNode) : null;
        return Boolean(
            record &&
                (record.written ||
                    record.propertyWritten ||
                    record.unknownWrite ||
                    (record.assignmentSources?.length ?? 0) > 0),
        );
    };
    const recordsForPattern = (pattern) => {
        const records = [];
        function visitPattern(node) {
            if (ts.isIdentifier(node)) {
                const record = lookup(node.text, node);
                if (record && !records.includes(record)) records.push(record);
            } else {
                ts.forEachChild(node, visitPattern);
            }
        }
        visitPattern(pattern);
        return records;
    };
    const records = new Set();
    for (const scope of new Set(scopeByNode.values())) {
        for (const record of scope.bindings.values()) records.add(record);
    }
    markWrites(sourceFile);

    const applySharedMutation = (mutation, expressionResolver = resolveExpression) => {
        const { target, property, whole } = mutation;
        if (!target) return;
        const mutationProperty = whole ? unknownProperty : property;
        const args = [target, mutationProperty, expressionResolver, mutation];
        const processMutation = markGlobalProcessMutation(...args);
        const cjsMutation = markCjsModuleMutation(...args);
        const esmMutation = markEsmNamespaceMutation(...args);
        if (!processMutation && !cjsMutation && !esmMutation && whole) taintTarget(target);
    };
    const classifyRuntimeCall = (site) => {
        let cases = resolveCases(site.expression, site);
        const callee = unwrapTransparentSyntax(site.expression);
        const record = ts.isIdentifier(callee) ? lookup(callee.text, callee) : null;
        const source = record && reachingRecordSource(record, site);
        if (source && source.properties.length === 0) {
            const captured = resolveCases(source.node, source.site);
            if (captured.some(({ kind }) => kind !== "local")) cases = captured;
        }
        const matches = cases.flatMap((provenance) => {
            if (provenance.kind === "process-member" &&
                provenance.member === "chdir") return ["chdir"];
            if (
                provenance.kind === "module-member" &&
                nodeModuleModules.has(provenance.moduleName) &&
                provenance.member === "syncBuiltinESMExports"
            ) return ["sync"];
            return [];
        });
        if (matches.length === 0 || new Set(matches).size !== 1) return null;
        return { kind: matches[0], site,
            may: uncertainContext(site) ||
                cases.length !== matches.length || matches.length !== 1 };
    };
    const cwdStateAt = (useNode) => {
        const state = { base: repositoryRoot, unknown: false };
        let sticky = false;
        for (const effect of runtimeEffects) {
            if (effect.kind !== "chdir") continue;
            const sameFunction = functionNodeFor(effect.site) === functionNodeFor(useNode);
            if (
                sameFunction &&
                effect.site.getEnd() > useNode.getStart(sourceFile)
            ) continue;
            const argument = effect.site.arguments[0];
            const staticValue = argument && staticValueResolver?.(argument, argument);
            let value = literalString(argument) ??
                (staticValue &&
                    ["strings", "primitive"].includes(staticValue.kind) &&
                    staticValue.values.length === 1 &&
                    typeof staticValue.values[0] === "string"
                    ? staticValue.values[0] : null);
            if (
                value === null &&
                argument &&
                ts.isCallExpression(unwrapTransparentSyntax(argument))
            ) {
                const call = unwrapTransparentSyntax(argument);
                const cases = resolveCases(call.expression, call);
                if (
                    call.arguments.length === 0 &&
                    cases.length > 0 &&
                    cases.every((candidate) =>
                        candidate.kind === "process-member" && candidate.member === "cwd")
                ) {
                    const current = cwdStateAt(call);
                    value = current.unknown ? null : current.base;
                }
            }
            if (value === ".") continue;
            if (!sameFunction) {
                sticky = true;
                state.unknown = true;
                continue;
            }
            if (effect.may || value === null) {
                state.unknown = true;
                continue;
            }
            if (sticky) continue;
            if (isAbsolute(value)) {
                state.base = value;
                state.unknown = false;
            } else if (!state.unknown) {
                state.base = resolve(state.base, value);
            }
        }
        return state;
    };
    const appendSyncEffects = (effect) => {
        for (const [root, moduleNames] of esmModulesByRoot) {
            const prior = mutationEffects.filter((candidate) =>
                candidate.root === root &&
                mutationAppliesAt(candidate, effect.site) &&
                candidate.site !== effect.site);
            if (prior.length === 0) continue;
            const properties = new Set(prior.flatMap((candidate) =>
                candidate.all ? [] : candidate.properties));
            const wildcard = prior.some((candidate) =>
                candidate.all || candidate.properties.includes(unknownProperty));
            for (const moduleName of moduleNames) {
                const append = (propertyList, all) => {
                    mutationEffects.push({
                        root: `esm:${moduleName}`,
                        properties: all ? [] : propertyList,
                        all, site: effect.site, may: effect.may,
                        crossFunction: false, runtime: true,
                        state: mutationState(root, propertyList, effect.site),
                        mutation: null,
                    });
                };
                if (wildcard) append([unknownProperty], true);
                for (const property of properties) append([property], false);
            }
        }
    };
    const finalizeWrites = () => {
        if (finalizingWrites || finalizedConfigurationRevision === configurationRevision) return;
        finalizingWrites = true;
        try {
            initialOrigins.clear();
            mutationEffects.length = 0;
            runtimeEffects.length = 0;
            for (const record of records) {
                record.tainted = false;
                delete record.origin;
                delete record.taintedFsMember;
                delete record.taintedFsNamespace;
            }
            for (const record of records) {
                const originNode = record.initializer ?? record.rootDefaultInitializer ??
                    record.defaultInitializer;
                const originProperties = record.initializer && record.iterate
                    ? [iterateInitialProperty, ...record.propertyPath]
                    : record.propertyPath;
                const originCases = originNode
                    ? projectInitialCases(
                          originNode, originNode, new Set(), originProperties,
                          record.propertyDefaults ?? [],
                      )
                    : [];
                const origins = (originCases.length > 0
                    ? originCases
                    : [caseOf(immutableProvenance(record), definedness.unknown)]
                ).map(({ provenance }) => immutableProvenance(provenance));
                initialOrigins.set(record, origins);
            }
            for (const record of records) {
                const rebindingWrite = record.unknownWrite ||
                    (record.assignmentSources ?? []).some(({ operator }) =>
                        operator === ts.SyntaxKind.EqualsToken);
                if (!record.written || !rebindingWrite) continue;
                const origins = initialOrigins.get(record) ?? [{ kind: "local" }];
                if (!["variable", "parameter"].includes(record.kind)) {
                    for (const origin of origins) {
                        if (["fs-member", "tainted-fs-member"].includes(origin.kind)) {
                            record.taintedFsMember = origin;
                        } else if (
                            (origin.kind === "module-namespace" && fsModules.has(origin.moduleName)) ||
                            (origin.kind === "cjs-module-namespace" && fsModules.has(origin.moduleName)) ||
                            origin.kind === "tainted-fs-namespace"
                        ) {
                            record.taintedFsNamespace = { kind: "tainted-fs-namespace",
                                moduleName: origin.moduleName,
                                ...(origin.cjsRoot ? { cjsRoot: origin.cjsRoot } : {}) };
                        }
                    }
                }
                record.tainted = true;
            }
            const initialResolver = (node, useNode = node) => {
                const current = projectInitialCases(node, useNode, new Set(), [], [], false)
                    .map(({ provenance }) => provenance);
                if (
                    current.length > 0 &&
                    current.every((provenance) =>
                        provenance.kind === "local" ||
                        provenance.kind.startsWith("tainted-"))
                ) return current;
                return projectInitialCases(node, useNode, new Set(), [], [], true)
                    .map(({ provenance }) => provenance);
            };
            for (const mutation of sharedMutations) applySharedMutation(
                mutation,
                initialResolver,
            );
            for (const site of runtimeCallSites) {
                const effect = classifyRuntimeCall(site);
                if (!effect) continue;
                runtimeEffects.push(effect);
                if (effect.kind === "sync") appendSyncEffects(effect);
            }
            finalizedConfigurationRevision = configurationRevision;
        } finally {
            finalizingWrites = false;
        }
    };
    return {
        lookup,
        resolveExpression,
        resolveCases,
        initialVariants,
        initialCarrierInvalidated,
        knownPathValue,
        isUnshadowed,
        recordsForPattern,
        setParameterValues(values) {
            parameterValues = values;
            configurationRevision += 1;
        },
        setDynamicImportResolver(resolver) {
            dynamicImportResolver = resolver;
            configurationRevision += 1;
        },
        setStaticValueResolver(resolver) {
            staticValueResolver = resolver;
        },
        writeAppliesAt,
        staticValue(node, useNode = node) {
            return staticValueResolver?.(node, useNode) ?? null;
        },
        propertyStateAt,
        cwdStateAt,
        finalizeWrites,
    };
}

function createStaticSpecifierResolver(sourceFile, bindingResolver) {
    const unknown = { kind: "unknown" };
    const logicalAssignmentOperators = new Set([
        ts.SyntaxKind.AmpersandAmpersandEqualsToken,
        ts.SyntaxKind.BarBarEqualsToken,
        ts.SyntaxKind.QuestionQuestionEqualsToken,
    ]);
    const localPrefixPotential = (value) =>
        value === "" || value === "." || value === ".." ||
        (value.startsWith("@glass") &&
            (value.length <= "@glass".length || value["@glass".length] === "/")) ||
        ("@glass".startsWith(value) && value.startsWith("@"));
    const incompletePrefix = (value) =>
        localPrefixPotential(value);
    const strings = (values) => ({
        kind: "strings",
        values: uniqueSorted(values),
    });
    const primitive = (values) => ({ kind: "primitive", values });
    const plus = (left, right) => {
        if (!left || !right || !["strings", "primitive"].includes(left.kind) ||
            !["strings", "primitive"].includes(right.kind)) return unknown;
        if (left.values.length > 1 && right.values.length > 1) return unknown;
        const stringResults = [];
        const primitiveResults = [];
        for (const prefix of left.values) for (const suffix of right.values) {
            const prefixType = typeof prefix;
            const suffixType = typeof suffix;
            const isPrimitive = (value, type) =>
                value === null || value === undefined ||
                ["string", "number", "boolean", "bigint"].includes(type);
            if (!isPrimitive(prefix, prefixType) || !isPrimitive(suffix, suffixType)) return unknown;
            if (prefixType === "string" || suffixType === "string") {
                stringResults.push(`${String(prefix)}${String(suffix)}`);
            } else if (prefixType === "bigint" || suffixType === "bigint") {
                if (prefixType !== "bigint" || suffixType !== "bigint") return unknown;
                primitiveResults.push(prefix + suffix);
            } else {
                const number = (value) =>
                    value === null ? 0 : value === undefined ? NaN : Number(value);
                primitiveResults.push(number(prefix) + number(suffix));
            }
            if (stringResults.length + primitiveResults.length > 64) return unknown;
        }
        if (stringResults.length > 0 && primitiveResults.length > 0) return unknown;
        return stringResults.length > 0
            ? strings(stringResults)
            : primitive(primitiveResults);
    };
    const valueTruth = (value) => {
        if (value.kind === "primitive") {
            const states = uniqueSorted(value.values.map((item) =>
                item === null || item === undefined
                    ? "nullish"
                    : item === false || item === 0 || item === ""
                      ? "falsy"
                      : "truthy",
            ));
            return states.length === 1 ? states[0] : "unknown";
        }
        if (value.kind === "strings") {
            const states = uniqueSorted(value.values.map((item) => item === "" ? "falsy" : "truthy"));
            return states.length === 1 ? states[0] : "unknown";
        }
        return ["array", "object"].includes(value.kind) ? "truthy" : "unknown";
    };
    const merge = (values, correlated = false) => {
        const known = values.filter(({ kind }) => kind !== "unknown");
        if (known.length !== values.length || known.length === 0) return unknown;
        if (known.every(({ kind }) => kind === "strings")) {
            return strings(known.flatMap(({ values: items }) => items));
        }
        if (known.every(({ kind }) => kind === "primitive")) {
            return primitive(known.flatMap(({ values: items }) => items));
        }
        if (known.every(({ kind }) => kind === "array")) {
            const length = known[0].values.length;
            if (!known.every(({ values: items }) => items.length === length)) return unknown;
            return {
                kind: "array",
                values: Array.from({ length }, (_, index) =>
                    merge(known.map(({ values: items }) => items[index])),
                ),
                correlated: correlated || known.some((item) => item.correlated),
            };
        }
        return unknown;
    };
    const elementOf = (value) =>
        value.kind === "array" ? merge(value.values) : unknown;
    const logical = (left, right, operator) => {
        const result = [];
        for (const item of [left]) {
            const state = valueTruth(item);
            const leftSelected =
                operator === ts.SyntaxKind.AmpersandAmpersandToken
                    ? ["falsy", "nullish"].includes(state)
                    : operator === ts.SyntaxKind.BarBarToken
                      ? state === "truthy"
                      : ["truthy", "falsy"].includes(state);
            const rightSelected =
                operator === ts.SyntaxKind.AmpersandAmpersandToken
                    ? state === "truthy"
                    : operator === ts.SyntaxKind.BarBarToken
                      ? ["falsy", "nullish"].includes(state)
                      : ["nullish", "unknown"].includes(state);
            if (leftSelected) result.push(left);
            if (rightSelected) result.push(right);
            if (state === "unknown") result.push(left, right);
        }
        return result.length === 0 ? unknown : merge(result, result.length > 1);
    };
    const propertyOf = (value, property) => {
        if (value.kind === "array" && Number.isInteger(Number(property))) {
            if (value.correlated && value.values.length > 1) return unknown;
            return value.values[Number(property)] ?? unknown;
        }
        if (value.kind === "object") {
            const key = [...value.values.keys()].find((candidate) =>
                exactProperty(candidate, property),
            );
            return key === undefined ? unknown : value.values.get(key);
        }
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
        if (node.kind === ts.SyntaxKind.TrueKeyword) return primitive([true]);
        if (node.kind === ts.SyntaxKind.FalseKeyword) return primitive([false]);
        if (node.kind === ts.SyntaxKind.NullKeyword) return primitive([null]);
        if (ts.isNumericLiteral(node)) return primitive([Number(node.text)]);
        if (
            ts.isIdentifier(node) &&
            ["NaN", "Infinity"].includes(node.text) &&
            bindingResolver.lookup(node.text, useNode) === null
        ) {
            return primitive([node.text === "NaN" ? NaN : Infinity]);
        }
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
            if (node.text === "undefined" && bindingResolver.lookup(node.text, useNode) === null) {
                return primitive([undefined]);
            }
            const record = bindingResolver.lookup(node.text, useNode);
            if (
                !record ||
                record.kind !== "variable" ||
                (record.tainted && !(record.assignmentSources?.length ?? 0)) ||
                record.propertyWritten ||
                seen.has(record)
            ) {
                return unknown;
            }
            if (
                (record.assignmentSources ?? []).some((source) => source.crossFunction) ||
                (record.unknownWriteSites ?? []).some((write) => write.crossFunction)
            ) return unknown;
            const nextSeen = new Set(seen).add(record);
            let value = record.initializer
                ? evaluate(record.initializer, record.initializer, nextSeen)
                : primitive([undefined]);
            if (record.iterate) value = elementOf(value);
            for (const property of record.propertyPath) {
                value = propertyOf(value, property);
            }
            for (const source of record.assignmentSources ?? []) {
                if (!bindingResolver.writeAppliesAt?.(source, useNode)) {
                    continue;
                }
                let sourceValue = source.node
                    ? evaluate(source.node, source.site ?? source.node, nextSeen)
                    : unknown;
                for (const property of source.properties ?? []) {
                    sourceValue = propertyOf(sourceValue, property);
                }
                if (source.operator === ts.SyntaxKind.EqualsToken) {
                    value = source.may
                        ? merge([value, sourceValue], value.kind === "array" || sourceValue.kind === "array")
                        : sourceValue;
                } else if (source.operator === ts.SyntaxKind.PlusEqualsToken) {
                    const next = plus(value, sourceValue);
                    value = source.may
                        ? merge([value, next], value.kind === "array" || next.kind === "array")
                        : next;
                } else {
                    const operator = source.operator === ts.SyntaxKind.AmpersandAmpersandEqualsToken
                        ? ts.SyntaxKind.AmpersandAmpersandToken
                        : source.operator === ts.SyntaxKind.BarBarEqualsToken
                          ? ts.SyntaxKind.BarBarToken
                          : ts.SyntaxKind.QuestionQuestionToken;
                    const next = logical(value, sourceValue, operator);
                    value = source.may
                        ? merge([value, next], value.kind === "array" || next.kind === "array")
                        : next;
                }
            }
            if ((record.unknownWriteSites ?? []).some((write) =>
                bindingResolver.writeAppliesAt?.(write, useNode),
            )) return unknown;
            return value;
        }
        if (ts.isBigIntLiteral(node)) return primitive([BigInt(node.text.slice(0, -1))]);
        if (
            ts.isPrefixUnaryExpression(node) &&
            [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(node.operator) &&
            (ts.isNumericLiteral(unwrap(node.operand)) || ts.isBigIntLiteral(unwrap(node.operand)))
        ) {
            const operand = unwrap(node.operand);
            const value = ts.isBigIntLiteral(operand)
                ? BigInt(operand.text.slice(0, -1))
                : Number(operand.text);
            if (ts.isBigIntLiteral(operand) && node.operator === ts.SyntaxKind.PlusToken) {
                return unknown;
            }
            return primitive([node.operator === ts.SyntaxKind.MinusToken ? -value : value]);
        }
        if (ts.isVoidExpression(node)) return primitive([undefined]);
        if (ts.isBinaryExpression(node) &&
            [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(node.operatorToken.kind)) {
            return logical(
                evaluate(node.left, useNode, seen),
                evaluate(node.right, useNode, seen),
                node.operatorToken.kind,
            );
        }
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
            return evaluate(node.right, node.right, seen);
        }
        if (ts.isBinaryExpression(node) && logicalAssignmentOperators.has(node.operatorToken.kind)) {
            const operator = node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken
                ? ts.SyntaxKind.AmpersandAmpersandToken
                : node.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken
                  ? ts.SyntaxKind.BarBarToken
                  : ts.SyntaxKind.QuestionQuestionToken;
            return logical(
                evaluate(node.left, useNode, seen),
                evaluate(node.right, node.right, seen),
                operator,
            );
        }
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
            return plus(
                evaluate(node.left, useNode, seen),
                evaluate(node.right, useNode, seen),
            );
        }
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) {
            return plus(
                evaluate(node.left, useNode, seen),
                evaluate(node.right, useNode, seen),
            );
        }
        if (ts.isTemplateExpression(node)) {
            let values = [node.head.text];
            for (const span of node.templateSpans) {
                const expression = evaluate(span.expression, useNode, seen);
                if (!["strings",
                    "primitive",
                ].includes(expression.kind)) return unknown;
                if (values.length > 1 && expression.values.length > 1) return unknown;
                values = values.flatMap((prefix) =>
                    expression.values.map((value) => `${prefix}${String(value)}${span.literal.text}`),
                );
                if (values.length > 64) return unknown;
            }
            return strings(values);
        }
        if (ts.isConditionalExpression(node)) {
            return merge([
                evaluate(node.whenTrue, useNode, seen),
                evaluate(node.whenFalse, useNode, seen),
            ], true);
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
            if (incompletePrefix(value)) return "local";
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
            let prefixes = [node.head.text];
            for (const span of node.templateSpans) {
                const evaluated = evaluate(span.expression, useNode, seen);
                if (evaluated?.kind !== "strings" || evaluated.values.length === 0) break;
                prefixes = uniqueSorted(
                    prefixes.flatMap((prefix) =>
                        evaluated.values.map((value) => `${prefix}${value}${span.literal.text}`),
                    ),
                );
            }
            const kinds = uniqueSorted(prefixes.map((value) => prefixKind(
                ts.factory.createStringLiteral(value),
                useNode,
                seen,
            )));
            return kinds.length === 1 ? kinds[0] : "unknown";
        }
        if (ts.isIdentifier(node)) {
            const record = bindingResolver.lookup(node.text, useNode);
            if (
                !record ||
                record.kind !== "variable" ||
                record.tainted ||
                record.propertyWritten ||
                seen.has(record)
            ) {
                return "unknown";
            }
            const roots = [
                ...(record.initializer ? [{ node: record.initializer, site: record.initializer }] : []),
                ...(record.assignmentSources ?? []),
            ].filter(({ site }) => bindingResolver.writeAppliesAt?.({ site }, useNode) ?? true);
            const kinds = roots.map(({ node }) => prefixKind(
                node,
                node,
                new Set(seen).add(record),
            ));
            return kinds.length === 0 || kinds.includes("unknown")
                ? "unknown"
                : uniqueSorted(kinds).length === 1
                  ? kinds[0]
                  : "unknown";
        }
        return "unknown";
    };
    const resolve = (node, useNode = node) => {
        const value = evaluate(node, useNode);
        if (value.kind === "strings" && value.values.length > 0) {
            if (value.values.some(incompletePrefix)) {
                return {
                    kind: prefixKind(node, useNode),
                    specifiers: null,
                    provenance: "prefix-or-conservative",
                };
            }
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
        if (value.kind === "primitive" && value.values.length > 0 && value.values.every(
            (item) => item === null || ["undefined", "string", "number", "boolean", "bigint"].includes(typeof item),
        )) {
            const specifiers = uniqueSorted(value.values.map(String));
            return {
                kind: "nonlocal",
                specifiers,
                provenance: "finite-static",
            };
        }
        return {
            kind: prefixKind(node, useNode),
            specifiers: null,
            provenance: "prefix-or-conservative",
        };
    };
    bindingResolver.setStaticValueResolver?.((node, useNode) => evaluate(node, useNode));
    return { resolve };
}

export function extractScriptReferences(
    source,
    path = "fixture.ts",
    origin = null,
    context = {},
    options = {},
) {
    const sourceFile = ts.createSourceFile(
        path,
        source,
        forceEsModuleParsing(path)
            ? {
                  languageVersion: ts.ScriptTarget.Latest,
                  impliedNodeFormat: ts.ModuleKind.ESNext,
                  setExternalModuleIndicator(file) {
                      file.externalModuleIndicator = file;
                  },
              }
            : ts.ScriptTarget.Latest,
        true,
        scriptKind(path),
    );
    const references = [];
    const nonliteralReferences = [];
    const bindingResolver = createBindingResolver(sourceFile, {
        repositoryRoot: options.repositoryRoot,
    });
    const specifierResolver = createStaticSpecifierResolver(
        sourceFile,
        bindingResolver,
    );
    bindingResolver.setDynamicImportResolver((node, useNode) =>
        specifierResolver.resolve(node, useNode),
    );
    if (!options.deferFinalization) bindingResolver.finalizeWrites();
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
            ...context,
            ...location,
            message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        };
    });
    const add = (specifier, edgeKind, node, metadata = {}) => {
        const location = sourceLocation(node.getStart(sourceFile));
        references.push({
            specifier,
            edgeKind,
            ...context,
            ...location,
            metadata: { ...metadata, ...context },
        });
    };
    const addNonliteral = (edgeKind, node, localHint = false) => {
        const location = sourceLocation(node.getStart(sourceFile));
        nonliteralReferences.push({
            source: path,
            edgeKind,
            expression: expressionText(node, sourceFile),
            ...context,
            ...location,
            localHint,
        });
    };

    function visit(node) {
        const callCases = ts.isCallExpression(node)
            ? bindingResolver.resolveCases?.(node.expression, node) ?? [
                  bindingResolver.resolveExpression(node.expression, node),
              ]
            : [];
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
        } else if (
            ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword &&
            (node.arguments.length === 1 || node.arguments.length === 2)
        ) {
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
            callCases.length > 0 &&
            callCases.every(({ kind }) => kind === "require-loader")
        ) {
            const requireCases = callCases;
            if (
                requireCases.length > 0
            ) {
                const loader = requireCases[0];
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
            }
        } else if (
            ts.isCallExpression(node) &&
            callCases.length > 0 &&
            callCases.every(({ kind }) => kind === "require-resolve")
        ) {
            const requireResolveCases = callCases;
            if (requireResolveCases.length > 0
            ) {
                const loader = requireResolveCases[0];
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
    return { sourceFile, bindingResolver, references, nonliteralReferences, parseErrors };
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
            ...context,
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
                ...context,
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

export function extractTemplateReferences(
    source,
    path = "fixture.vue",
    origin = null,
    context = {},
) {
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
                ...context,
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
            ...context,
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
                metadata: { tag: node.tag, attribute: "style", ...context },
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
                            metadata: { tag: node.tag, attribute: name, ...context },
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
            .filter((candidate) => !emittedGraphArtifactPaths.has(candidate))
            .filter((candidate) => !exclude(candidate))
            .sort()) {
            if (projectionByPath.has(path)) {
                throw new Error(`graph-v3: ${path} appears in two projections`);
            }
            projectionByPath.set(path, projection);
        }
    };
    const addFile = (projection, path) => {
        if (emittedGraphArtifactPaths.has(path)) return;
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
    addFile("scripts-generators", canonicalGraphGeneratorPath);
    addFile("scripts-generators", graphOwnerManifestPath);
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

function resolveRuntimePath(value, cwdState, repositoryRoot, options = {}) {
    if (typeof value !== "string") return { target: null, dynamic: false };
    const absoluteValue = isAbsolute(value);
    const pathLike = absoluteValue || /^[.]{1,2}[\\/]/.test(value) ||
        (!/\s/.test(value) && (value.includes("/") || value.includes("\\")));
    if (options.pathLikeOnly && !pathLike) return { target: null, dynamic: false };
    if (!absoluteValue && cwdState.unknown) return { target: null, dynamic: true };
    const absolute = absoluteValue ? value : resolve(cwdState.base, value);
    return {
        target: pathWithin(repositoryRoot, absolute)
            ? portable(relative(repositoryRoot, absolute)) || "."
            : options.insideOnly ? null : portable(absolute),
        dynamic: false,
    };
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

function evaluatePathExpression(
    node,
    sourceFile,
    sourcePath,
    repositoryRoot,
    seen = new Set(),
    bindingResolver = null,
) {
    if (!node) return null;
    const string = literalString(node);
    if (string !== null) return string;
    if (ts.isTemplateExpression(node)) {
        let value = node.head.text;
        for (const span of node.templateSpans) {
            const evaluated = bindingResolver?.staticValue?.(
                span.expression,
                span.expression,
            );
            let part = null;
            if (evaluated?.kind === "strings" && evaluated.values.length === 1) {
                part = evaluated.values[0];
            } else if (
                evaluated?.kind === "primitive" &&
                evaluated.values.length === 1 &&
                (evaluated.values[0] === null ||
                    evaluated.values[0] === undefined ||
                    ["string", "number", "boolean", "bigint"].includes(
                        typeof evaluated.values[0],
                    ))
            ) {
                part = evaluated.values[0];
            } else {
                part = evaluatePathExpression(
                    span.expression,
                    sourceFile,
                    sourcePath,
                    repositoryRoot,
                    new Set(seen),
                    bindingResolver,
                );
            }
            if (part === null) return null;
            value += `${String(part)}${span.literal.text}`;
        }
        return value;
    }
    if (ts.isIdentifier(node)) {
        const binding = bindingResolver?.lookup(node.text, node);
        if (binding) {
            if (binding.tainted || binding.written) return null;
            const known = bindingResolver.knownPathValue(node, node);
            if (known !== null) return known;
            const provenance = bindingResolver.resolveExpression(node, node);
            const initializer = binding.initializer ?? binding.defaultInitializer;
            if (provenance.kind === "repository-root" && !initializer) {
                return repositoryRoot;
            }
            if (!initializer || seen.has(binding)) return null;
            let value = evaluatePathExpression(
                initializer,
                sourceFile,
                sourcePath,
                repositoryRoot,
                new Set(seen).add(binding),
                bindingResolver,
            );
            if (value === null && binding.propertyPath.length > 0) {
                const property = binding.propertyPath.at(-1);
                if (ts.isObjectLiteralExpression(initializer) && property !== undefined) {
                    const member = initializer.properties.find((candidate) => {
                        const name = candidate.name &&
                            (candidate.name.text ?? literalString(candidate.name));
                        return exactProperty(name, property);
                    });
                    if (member) {
                        const valueNode = ts.isPropertyAssignment(member)
                            ? member.initializer
                            : ts.isShorthandPropertyAssignment(member)
                              ? member.name
                              : null;
                        value = evaluatePathExpression(
                            valueNode,
                            sourceFile,
                            sourcePath,
                            repositoryRoot,
                            new Set(seen).add(binding),
                            bindingResolver,
                        );
                    }
                }
            }
            return value;
        }
        if (
            node.text === "__dirname" &&
            bindingResolver?.isUnshadowed("__dirname", node)
        ) {
            return dirname(join(repositoryRoot, sourcePath));
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
        (bindingResolver?.resolveCases(node.expression, node) ?? []).length > 0 &&
        (bindingResolver?.resolveCases(node.expression, node) ?? []).every(
            (binding) => binding.kind === "process-member",
        ) &&
        node.expression.name.text === "cwd" &&
        node.arguments.length === 0
    ) {
        const state = bindingResolver.cwdStateAt?.(node) ?? {
            base: repositoryRoot,
            unknown: false,
        };
        return state.unknown ? null : state.base;
    }
    if (ts.isCallExpression(node)) {
        const pathBindings = bindingResolver?.resolveCases(node.expression, node) ?? [];
        const pathBinding = pathBindings.length === 1 ? pathBindings[0] : null;
        if (
            pathBinding?.kind === "process-member" &&
            pathBinding.member === "cwd" &&
            node.arguments.length === 0
        ) {
            const state = bindingResolver.cwdStateAt?.(node) ?? {
                base: repositoryRoot,
                unknown: false,
            };
            return state.unknown ? null : state.base;
        }
        const isPathFunction =
            pathBinding?.kind === "path-member" &&
            pathMemberNames.has(pathBinding.member);
        if (
            pathBinding?.kind === "url-member" &&
            pathBinding.member === "fileURLToPath"
        ) {
            const value = evaluatePathExpression(
                node.arguments[0],
                sourceFile,
                sourcePath,
                repositoryRoot,
                new Set(seen),
                bindingResolver,
            );
            if (value === null) return null;
            const optionsArgument = node.arguments[1];
            let windows = null;
            if (optionsArgument) {
                const options = bindingResolver?.staticValue?.(
                    optionsArgument,
                    optionsArgument,
                );
                if (
                    options?.kind === "primitive" &&
                    options.values.length === 1 &&
                    options.values[0] === undefined
                ) {
                    windows = null;
                } else if (options?.kind === "object") {
                    const option = options.values.get("windows");
                    if (option) {
                        if (
                            option.kind !== "primitive" ||
                            option.values.length !== 1 ||
                            ![undefined, true, false].includes(option.values[0])
                        ) return null;
                        windows =
                            typeof option.values[0] === "boolean"
                                ? option.values[0]
                                : null;
                    }
                } else {
                    return null;
                }
            }
            try {
                return windows === null
                    ? fileURLToPath(value)
                    : fileURLToPath(value, { windows });
            } catch {
                return null;
            }
        }
        const values = node.arguments.map((argument) =>
            evaluatePathExpression(
                argument,
                sourceFile,
                sourcePath,
                repositoryRoot,
                new Set(seen),
                bindingResolver,
            ),
        );
        if (values.some((value) => value === null)) return null;
        if (pathBinding?.member === "resolve" && isPathFunction) {
            const state = bindingResolver.cwdStateAt?.(node) ?? {
                base: repositoryRoot,
                unknown: false,
            };
            if (state.unknown && !values.some((value) => isAbsolute(value))) return null;
            return resolve(state.base, ...values);
        }
        if (pathBinding?.member === "join" && isPathFunction) return join(...values);
        if (pathBinding?.member === "dirname" && isPathFunction) return dirname(values[0]);
    }
    if (
        ts.isNewExpression(node) &&
        callName(node.expression) === "URL" &&
        bindingResolver?.isUnshadowed("URL", node.expression)
    ) {
        const value = evaluatePathExpression(
            node.arguments?.[0],
            sourceFile,
            sourcePath,
            repositoryRoot,
            new Set(seen),
            bindingResolver,
        );
        const base = evaluatePathExpression(
            node.arguments?.[1],
            sourceFile,
            sourcePath,
            repositoryRoot,
            new Set(seen),
            bindingResolver,
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

function namedFunction(sourceFile, name) {
    return sourceFile?.statements.find(
        (node) => ts.isFunctionDeclaration(node) && node.name?.text === name,
    ) ?? null;
}

function parameterRecord(bindingResolver, functionNode, index, property = null) {
    const parameter = functionNode?.parameters[index];
    if (!parameter) return null;
    return bindingResolver
        .recordsForPattern(parameter.name)
        .find(
            (record) =>
                record.parameterIndex === index &&
                (property === null || record.propertyPath.at(-1) === property),
        ) ?? null;
}

function setParameterValue(
    valuesBySource,
    sourcePath,
    bindingResolver,
    functionNode,
    index,
    value,
    property = null,
) {
    const record = parameterRecord(bindingResolver, functionNode, index, property);
    if (value === null || !record) return false;
    valuesBySource.get(sourcePath).set(record, value);
    return true;
}

function functionVariableDeclaration(functionNode, name) {
    let result = null;
    function visit(node) {
        if (result || (node !== functionNode && ts.isFunctionLike(node))) return;
        if (
            ts.isVariableDeclaration(node) &&
            ts.isIdentifier(node.name) &&
            node.name.text === name
        ) {
            result = node;
            return;
        }
        ts.forEachChild(node, visit);
    }
    visit(functionNode?.body ?? functionNode);
    return result;
}

function resolveContractModulePath(
    repositoryRoot,
    sourcePath,
    moduleName,
    repositoryVisibility,
) {
    const resolution = resolveReference(
        repositoryRoot,
        sourcePath,
        moduleName,
        "module",
        repositoryVisibility,
    );
    return resolution.resolution === "repository-file" ? resolution.target : null;
}

function auditTargetUsage(
    sourceFile,
    bindingResolver,
    sourcePath,
    target,
    repositoryRoot,
    repositoryVisibility,
) {
    const calls = new Set();
    let invalid = false;
    const unwrap = (node) => {
        let current = node;
        while (
            current &&
            (ts.isParenthesizedExpression(current) ||
                ts.isAsExpression(current) ||
                ts.isTypeAssertionExpression(current) ||
                ts.isSatisfiesExpression(current) ||
                ts.isNonNullExpression(current))
        ) {
            current = current.expression;
        }
        return current;
    };
    const isTargetBinding = (binding) => {
        if (!binding) return false;
        const localDeclaration =
            binding.kind === "local" &&
            sourcePath === target.sourcePath &&
            binding.functionNode === target.functionNode;
        const importedDeclaration =
            binding.kind === "local-import-member" &&
            binding.member === target.exportName &&
            resolveContractModulePath(
                repositoryRoot,
                sourcePath,
                binding.moduleName,
                repositoryVisibility,
            ) === target.sourcePath;
        return localDeclaration || importedDeclaration;
    };
    const targetProvenances = (node) => [
        ...(bindingResolver.resolveCases?.(node, node) ?? [
            bindingResolver.resolveExpression(node, node),
        ]),
        ...(bindingResolver.initialVariants?.(node, node) ?? []),
    ];
    const isTargetReference = (node) =>
        targetProvenances(node).some(isTargetBinding);
    const targetCarrierWasInvalidated = (node) =>
        bindingResolver.initialCarrierInvalidated?.(node, node) ?? false;
    const isDirectAwaitNamespace = (node) => {
        const current = unwrap(node);
        if (!ts.isAwaitExpression(current)) return false;
        const imported = unwrap(current.expression);
        if (!ts.isCallExpression(imported)) return false;
        const dynamicImport = isExactTargetDynamicImport(imported);
        return (
            dynamicImport.singletonTarget &&
            isDirectAwaitImport(imported) &&
            (isStandaloneDiscardedAwait(node) || isNamespaceBindingInitializer(node))
        );
    };
    const isTargetNamespace = (node) => {
        return targetProvenances(node).some(
            (binding) =>
                binding &&
                ["module-namespace", "cjs-module-namespace"].includes(binding.kind) &&
                resolveContractModulePath(
                    repositoryRoot,
                    sourcePath,
                    binding.moduleName,
                    repositoryVisibility,
                ) === target.sourcePath,
        );
    };
    const isDeclarationName = (node) => {
        const parent = node.parent;
        return (
            (ts.isVariableDeclaration(parent) && parent.name === node) ||
            (ts.isBindingElement(parent) && parent.name === node) ||
            (ts.isParameter(parent) && parent.name === node) ||
            ((ts.isFunctionDeclaration(parent) || ts.isClassDeclaration(parent)) &&
                parent.name === node) ||
            (ts.isImportSpecifier(parent) && parent.name === node) ||
            (ts.isNamespaceImport(parent) && parent.name === node) ||
            (ts.isImportClause(parent) && parent.name === node)
        );
    };
    const isPropertyName = (node) =>
        (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) ||
        ((ts.isPropertyAssignment(node.parent) ||
            ts.isMethodDeclaration(node.parent)) &&
            node.parent.name === node);
    const isImportSite = (node) => {
        let current = node.parent;
        while (current) {
            if (ts.isImportDeclaration(current)) return true;
            if (ts.isSourceFile(current)) return false;
            current = current.parent;
        }
        return false;
    };
    const isNamespaceBindingInitializer = (node) => {
        let outer = node;
        while (
            outer.parent &&
            (ts.isParenthesizedExpression(outer.parent) ||
                ts.isAsExpression(outer.parent) ||
                ts.isTypeAssertionExpression(outer.parent) ||
                ts.isSatisfiesExpression(outer.parent) ||
                ts.isNonNullExpression(outer.parent)) &&
            outer.parent.expression === outer
        ) {
            outer = outer.parent;
        }
        const declaration = outer.parent;
        if (
            !ts.isVariableDeclaration(declaration) ||
            declaration.initializer !== outer ||
            !ts.isIdentifier(declaration.name)
        ) {
            return false;
        }
        const bindings = bindingResolver.resolveCases?.(node, node) ?? [
            bindingResolver.resolveExpression(node, node),
        ];
        return (
            bindings.length > 0 &&
            bindings.every((binding) =>
                (binding.kind === "cjs-module-namespace" && ts.isCallExpression(unwrap(node))) ||
                (binding.kind === "module-namespace" && ts.isAwaitExpression(unwrap(node))),
            )
        );
    };
    const isDirectAwaitImport = (node) => {
        let current = node;
        let parent = node.parent;
        while (
            parent &&
            (
                ts.isParenthesizedExpression(parent) ||
                ts.isAsExpression(parent) ||
                ts.isTypeAssertionExpression(parent) ||
                ts.isSatisfiesExpression(parent) ||
                ts.isNonNullExpression(parent)
            ) &&
            parent.expression === current
        ) {
            current = parent;
            parent = parent.parent;
        }
        return Boolean(parent && ts.isAwaitExpression(parent) && parent.expression === current);
    };
    const isStandaloneDiscardedAwait = (node) => {
        if (!ts.isAwaitExpression(unwrap(node))) return false;
        let outer = node;
        let parent = outer.parent;
        while (
            parent &&
            (ts.isParenthesizedExpression(parent) ||
                ts.isAsExpression(parent) ||
                ts.isTypeAssertionExpression(parent) ||
                ts.isSatisfiesExpression(parent) ||
                ts.isNonNullExpression(parent)) &&
            parent.expression === outer
        ) {
            outer = parent;
            parent = parent.parent;
        }
        return Boolean(parent && ts.isExpressionStatement(parent) && parent.expression === outer);
    };
    const isExactTargetDynamicImport = (node) => {
        if (
            !ts.isCallExpression(node) ||
            node.expression.kind !== ts.SyntaxKind.ImportKeyword ||
            (node.arguments.length !== 1 && node.arguments.length !== 2)
        ) {
            return false;
        }
        const promise = bindingResolver.resolveExpression(node, node);
        if (promise.kind !== "module-promise") {
            return { targetBearing: false, singletonTarget: false };
        }
        if (promise.unknown || !promise.specifiers) {
            return { targetBearing: true, singletonTarget: false };
        }
        const candidates = promise.specifiers ??
            (promise.moduleName ? [promise.moduleName] : []);
        const resolvedTargets = candidates.map((specifier) =>
            resolveContractModulePath(
                repositoryRoot,
                sourcePath,
                specifier,
                repositoryVisibility,
            ),
        );
        const targetBearing = resolvedTargets.includes(target.sourcePath);
        return {
            targetBearing,
            singletonTarget:
                candidates.length === 1 &&
                resolvedTargets.length === 1 &&
                resolvedTargets[0] === target.sourcePath,
        };
    };
    let escapedTargetPromise = false;
    function inspectTargetPromises(node) {
        const dynamicImport = isExactTargetDynamicImport(node);
        if (
            dynamicImport.targetBearing &&
            (!dynamicImport.singletonTarget || !isDirectAwaitImport(node))
        ) {
            escapedTargetPromise = true;
            return;
        }
        ts.forEachChild(node, inspectTargetPromises);
    }
    inspectTargetPromises(sourceFile);
    if (escapedTargetPromise) return null;
    const isStableAliasInitializer = (node) => {
        const declaration = node.parent;
        if (!ts.isVariableDeclaration(declaration) || !declaration.initializer) return false;
        if (unwrap(declaration.initializer) !== unwrap(node)) return false;
        if (!ts.isIdentifier(declaration.name)) return false;
        const record = bindingResolver.lookup(declaration.name.text, declaration.name);
        return Boolean(record && !record.tainted && !record.written && isTargetBinding(
            bindingResolver.resolveExpression(declaration.name, declaration.name),
        ));
    };
    const directCallFor = (node) => {
        let current = node;
        let parent = node.parent;
        while (
            parent &&
            (ts.isParenthesizedExpression(parent) ||
                ts.isAsExpression(parent) ||
                ts.isSatisfiesExpression(parent) ||
                ts.isNonNullExpression(parent)) &&
            parent.expression === current
        ) {
            current = parent;
            parent = parent.parent;
        }
        return parent && ts.isCallExpression(parent) && parent.expression === current
            ? parent
            : null;
    };
    const completeTarget = (node) => {
        if (isDeclarationName(node) || isPropertyName(node) || isImportSite(node)) return;
        if (targetCarrierWasInvalidated(node)) {
            invalid = true;
            return;
        }
        const call = directCallFor(node);
        if (call) {
            calls.add(call);
        } else if (!isStableAliasInitializer(node)) {
            invalid = true;
        }
    };
    function visit(node) {
        if (isTargetReference(node)) {
            completeTarget(node);
            return;
        }
        if (isTargetNamespace(node)) {
            if (
                isDeclarationName(node) ||
                isPropertyName(node) ||
                isImportSite(node) ||
                isNamespaceBindingInitializer(node) ||
                isDirectAwaitNamespace(node)
            ) {
                return;
            }
            invalid = true;
            return;
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return invalid ? null : [...calls];
}

function targetFunction(scriptAsts, sourcePath, exportName) {
    const sourceFile = scriptAsts.get(sourcePath);
    const functionNode = namedFunction(sourceFile, exportName);
    return functionNode
        ? { sourcePath, exportName, functionNode }
        : null;
}

function provenTargetCallValue(
    sourceFile,
    bindingResolver,
    sourcePath,
    target,
    index,
    repositoryRoot,
    repositoryVisibility,
) {
    const calls = auditTargetUsage(
        sourceFile,
        bindingResolver,
        sourcePath,
        target,
        repositoryRoot,
        repositoryVisibility,
    );
    if (!calls || calls.length === 0) return null;
    const values = calls.map((call) =>
        evaluatePathExpression(
            call.arguments[index],
            sourceFile,
            sourcePath,
            repositoryRoot,
            new Set(),
            bindingResolver,
        ),
    );
    return values.every((value) => value !== null && value === values[0])
        ? values[0]
        : null;
}

function setRecordValue(values, record, value) {
    if (record && value !== null) values.set(record, value);
}

function callerDestructuringRecords(
    sourceFile,
    bindingResolver,
    calls,
    properties,
) {
    const results = [];
    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.initializer &&
            ts.isCallExpression(node.initializer) &&
            calls.includes(node.initializer)
        ) {
            const records = bindingResolver.recordsForPattern(node.name);
            results.push(
                Object.fromEntries(
                    properties.map((property) => [
                        property,
                        records.find(
                            (record) => record.propertyPath.at(-1) === property,
                        ) ?? null,
                    ]),
                ),
            );
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return results;
}

function loopRecord(bindingResolver, functionNode, name) {
    let result = null;
    function visit(node) {
        if (result || (node !== functionNode && ts.isFunctionLike(node))) return;
        if (ts.isForOfStatement(node) || ts.isForInStatement(node)) {
            const initializer = node.initializer;
            if (ts.isVariableDeclarationList(initializer)) {
                for (const declaration of initializer.declarations) {
                    if (ts.isIdentifier(declaration.name) && declaration.name.text === name) {
                        result = bindingResolver.lookup(name, declaration.name);
                        return;
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(functionNode?.body ?? functionNode);
    return result;
}

function collectPathParameterContracts(
    scriptAsts,
    scriptResolvers,
    repositoryRoot,
    repositoryVisibility,
) {
    const valuesBySource = new Map(
        [...scriptAsts.keys()].map((path) => [path, new Map()]),
    );
    for (const [path, resolver] of scriptResolvers) {
        resolver?.setParameterValues(valuesBySource.get(path) ?? new Map());
    }
    const put = (path, resolver, fn, index, value, property = null) =>
        setParameterValue(valuesBySource, path, resolver, fn, index, value, property);

    // These exact source/call contracts are the finite generator API in this
    // corpus. An identifier named root elsewhere never receives provenance.
    const styleAssetsPath = "vite.style-assets.ts";
    const styleFoldPath = "vite.style-fold.ts";
    const utilityEmitPath = "vite.utility-emit.ts";
    const styleAssets = scriptAsts.get(styleAssetsPath);
    const styleFold = scriptAsts.get(styleFoldPath);
    const utilityEmit = scriptAsts.get(utilityEmitPath);
    const styleAssetsResolver = scriptResolvers.get(styleAssetsPath);
    const styleFoldResolver = scriptResolvers.get(styleFoldPath);
    const utilityEmitResolver = scriptResolvers.get(utilityEmitPath);
    const copyTarget = targetFunction(scriptAsts, styleFoldPath, "copyStyleAssets");
    const foldTarget = targetFunction(scriptAsts, styleFoldPath, "foldSfcBundle");
    const injectTarget = targetFunction(
        scriptAsts,
        styleFoldPath,
        "injectWebkitBackdropFile",
    );
    const emitTarget = targetFunction(
        scriptAsts,
        utilityEmitPath,
        "emitComponentUtilities",
    );
    if (
        styleAssets &&
        styleFold &&
        styleAssetsResolver &&
        styleFoldResolver &&
        copyTarget
    ) {
        const copyCalls = auditTargetUsage(
            styleAssets,
            styleAssetsResolver,
            styleAssetsPath,
            copyTarget,
            repositoryRoot,
            repositoryVisibility,
        );
        const copy = namedFunction(styleFold, "copyStyleAssets");
        const root = provenTargetCallValue(
            styleAssets,
            styleAssetsResolver,
            styleAssetsPath,
            copyTarget,
            0,
            repositoryRoot,
            repositoryVisibility,
        );
        const copyValues = valuesBySource.get(styleFoldPath);
        if (copy && root !== null) {
            put(styleFoldPath, styleFoldResolver, copy, 0, root);
            const returnValues = {};
            for (const property of ["srcFonts", "distStyles", "distComponents"]) {
                const declaration = functionVariableDeclaration(copy, property);
                returnValues[property] = declaration
                    ? evaluatePathExpression(
                          declaration.name,
                          styleFold,
                          styleFoldPath,
                          repositoryRoot,
                          new Set(),
                          styleFoldResolver,
                      )
                    : null;
            }
            for (const records of callerDestructuringRecords(
                styleAssets,
                styleAssetsResolver,
                copyCalls ?? [],
                ["srcFonts", "distStyles", "distComponents"],
            )) {
                for (const property of Object.keys(records)) {
                    setRecordValue(
                        valuesBySource.get(styleAssetsPath),
                        records[property],
                        returnValues[property],
                    );
                }
            }
        }
        if (foldTarget) {
            put(
                styleFoldPath,
                styleFoldResolver,
                namedFunction(styleFold, "foldSfcBundle"),
                0,
                provenTargetCallValue(
                    styleAssets,
                    styleAssetsResolver,
                    styleAssetsPath,
                    foldTarget,
                    0,
                    repositoryRoot,
                    repositoryVisibility,
                ),
            );
            put(
                styleFoldPath,
                styleFoldResolver,
                namedFunction(styleFold, "foldSfcBundle"),
                1,
                provenTargetCallValue(
                    styleAssets,
                    styleAssetsResolver,
                    styleAssetsPath,
                    foldTarget,
                    1,
                    repositoryRoot,
                    repositoryVisibility,
                ),
            );
        }
        if (injectTarget) {
            put(
                styleFoldPath,
                styleFoldResolver,
                injectTarget.functionNode,
                0,
                provenTargetCallValue(
                    styleAssets,
                    styleAssetsResolver,
                    styleAssetsPath,
                    injectTarget,
                    0,
                    repositoryRoot,
                    repositoryVisibility,
                ),
            );
            const fileRecord = loopRecord(
                styleFoldResolver,
                injectTarget.functionNode,
                "file",
            );
            const injected = parameterRecord(
                styleFoldResolver,
                injectTarget.functionNode,
                0,
            );
            setRecordValue(copyValues, fileRecord, copyValues.get(injected));
        }
        if (utilityEmit && utilityEmitResolver && emitTarget) {
            put(
                utilityEmitPath,
                utilityEmitResolver,
                emitTarget.functionNode,
                0,
                provenTargetCallValue(
                    styleAssets,
                    styleAssetsResolver,
                    styleAssetsPath,
                    emitTarget,
                    0,
                    repositoryRoot,
                    repositoryVisibility,
                ),
            );
            put(
                utilityEmitPath,
                utilityEmitResolver,
                emitTarget.functionNode,
                1,
                provenTargetCallValue(
                    styleAssets,
                    styleAssetsResolver,
                    styleAssetsPath,
                    emitTarget,
                    1,
                    repositoryRoot,
                    repositoryVisibility,
                ),
            );
        }
    }

    const graphPath = canonicalGraphGeneratorPath;
    const graphSource = scriptAsts.get(graphPath);
    if (graphSource) {
        const build = namedFunction(graphSource, "buildGraph");
        const visibility = namedFunction(graphSource, "gitRepositoryVisibility");
        const graphResolver = scriptResolvers.get(graphPath);
        const defaultValue = (property) => {
            const record = parameterRecord(graphResolver, build, 0, property);
            const initializer = record?.propertyDefaults?.at(-1) ?? record?.defaultInitializer;
            return initializer
                ? evaluatePathExpression(
                      initializer,
                      graphSource,
                      graphPath,
                      repositoryRoot,
                      new Set(),
                      graphResolver,
                  )
                : null;
        };
        if (build && graphResolver) {
            put(graphPath, graphResolver, build, 0, defaultValue("repositoryRoot"), "repositoryRoot");
            put(graphPath, graphResolver, build, 0, defaultValue("outputDirectory"), "outputDirectory");
        }
        if (build && visibility && graphResolver) {
            put(
                graphPath,
                graphResolver,
                visibility,
                0,
                provenTargetCallValue(
                    graphSource,
                    graphResolver,
                    graphPath,
                    { sourcePath: graphPath, exportName: "gitRepositoryVisibility", functionNode: visibility },
                    0,
                    repositoryRoot,
                    repositoryVisibility,
                ),
            );
        }
    }
    for (const [path, resolver] of scriptResolvers) {
        resolver?.setParameterValues(valuesBySource.get(path) ?? new Map());
        resolver?.finalizeWrites();
    }
    return valuesBySource;
}

export function extractFileOperations(
    sourceFile,
    sourcePath,
    repositoryRoot,
    origin = null,
    parameterValues = new Map(),
    bindingResolver = null,
) {
    const operations = [];
    const unmodeled = [];
    const resolver = bindingResolver ?? createBindingResolver(sourceFile, {
        parameterValues,
        repositoryRoot,
    });
    resolver.setParameterValues(parameterValues);
    resolver.finalizeWrites();
    const sourceLocation = (node) => {
        const local = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        return offsetLocation(
            { line: local.line + 1, column: local.character + 1 },
            origin,
        );
    };
    function resolvedArgument(argument, useNode) {
        const value = evaluatePathExpression(
            argument,
            sourceFile,
            sourcePath,
            repositoryRoot,
            new Set(),
            resolver,
        );
        if (value === null) return null;
        return resolveRuntimePath(
            value,
            resolver.cwdStateAt?.(useNode) ?? {
                base: repositoryRoot,
                unknown: false,
            },
            repositoryRoot,
        ).target;
    }
    function visit(node) {
        if (ts.isCallExpression(node)) {
            const bindings = resolver.resolveCases
                ? resolver.resolveCases(node.expression, node)
                : [resolver.resolveExpression(node.expression, node)];
            const binding = bindings.length === 1 ? bindings[0] : null;
            const name = binding?.member ?? bindings.find((candidate) => candidate.member)?.member;
            const location = sourceLocation(node);
            const promiseBoundary = bindings.find(
                ({ kind }) => kind === "module-promise-boundary",
            );
            if (promiseBoundary) {
                unmodeled.push({
                    source: sourcePath,
                    operation: "then",
                    boundary: "module-promise",
                    moduleName: promiseBoundary.moduleName,
                    ...location,
                });
                ts.forEachChild(node, visit);
                return;
            }
            const isTaintedFsOperation =
                bindings.some((candidate) =>
                    (candidate.kind === "tainted-fs-member" ||
                        (candidate.kind === "tainted-builtin-member" &&
                            ["fs", "fs-promises"].includes(candidate.cjsRoot))) &&
                    fsOperationNames.has(candidate.member),
                );
            const isFsOperation =
                binding?.kind === "fs-member" &&
                fsModules.has(binding.moduleName) &&
                fsOperationNames.has(name) &&
                (!promiseFsModules.has(binding.moduleName) || promiseFsOperationNames.has(name));
            const isUnsupportedPromiseFsOperation = bindings.some(
                (candidate) =>
                    candidate.kind === "unsupported-fs-promises-member" &&
                    fsOperationNames.has(candidate.member),
            );
            const hasFsCandidate = bindings.some(
                (candidate) =>
                    ["fs-member", "tainted-fs-member", "tainted-builtin-member"].includes(candidate.kind) &&
                    fsOperationNames.has(candidate.member) &&
                    (candidate.kind !== "tainted-builtin-member" ||
                        ["fs", "fs-promises"].includes(candidate.cjsRoot)),
            );
            if (isUnsupportedPromiseFsOperation) {
                unmodeled.push({
                    source: sourcePath,
                    operation: name ?? "filesystem",
                    boundary: "unsupported-fs-promises-api",
                    ...location,
                });
            } else if (isTaintedFsOperation) {
                unmodeled.push({
                    source: sourcePath,
                    operation: name,
                    boundary: "tainted-fs-member",
                    ...location,
                });
            } else if (hasFsCandidate && !isFsOperation) {
                unmodeled.push({
                    source: sourcePath,
                    operation: name ?? "filesystem",
                    boundary: "tainted-fs-member",
                    ...location,
                });
            } else if (isFsOperation && (fsReadNames.has(name) || fsWriteNames.has(name) || fsDeleteNames.has(name))) {
                const target = resolvedArgument(node.arguments[0], node);
                if (target) {
                    operations.push({
                        edgeKind: fsReadNames.has(name)
                            ? "generator-read"
                            : "generator-write",
                        target,
                        ...location,
                        operation: name,
                        ...(fsDeleteNames.has(name) ? { effect: "delete" } : {}),
                    });
                } else {
                    unmodeled.push({ source: sourcePath, operation: name, ...location });
                }
            } else if (isFsOperation && fsCopyNames.has(name)) {
                const source = resolvedArgument(node.arguments[0], node);
                const target = resolvedArgument(node.arguments[1], node);
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

function childCallShape(node, member, resolver) {
    const form = (argument, seen = new Set()) => {
        if (!argument) return "missing";
        const current = unwrapTransparentSyntax(argument);
        if (
            ts.isVoidExpression(current) ||
            (ts.isIdentifier(current) &&
                current.text === "undefined" &&
                resolver.lookup("undefined", current) === null)
        ) return "missing";
        if (ts.isArrayLiteralExpression(current)) return "array";
        if (ts.isObjectLiteralExpression(current)) return "object";
        if (ts.isIdentifier(current)) {
            const record = resolver.lookup(current.text, current);
            if (
                record &&
                !seen.has(record) &&
                !(record.assignmentSources?.length ?? 0) &&
                !(record.unknownWriteSites?.length ?? 0)
            ) {
                return form(
                    record.initializer ?? record.defaultInitializer,
                    new Set(seen).add(record),
                );
            }
        }
        const value = resolver.staticValue?.(argument, argument);
        if (
            value?.kind === "primitive" &&
            value.values.length === 1 &&
            value.values[0] === undefined
        ) return "missing";
        return ["array", "object"].includes(value?.kind) ? value.kind : "unknown";
    };
    const second = node.arguments[1];
    const third = node.arguments[2];
    const secondForm = form(second);
    const thirdForm = form(third);
    if (["exec", "execSync"].includes(member)) {
        return ["missing", "object"].includes(secondForm)
            ? { argv: null, options: secondForm === "object" ? second : null, ambiguous: false }
            : { argv: null, options: null, ambiguous: true };
    }
    const ambiguous = { argv: null, options: null, ambiguous: true };
    if (!["spawn", "spawnSync", "execFile", "execFileSync", "fork"].includes(member)) {
        return ambiguous;
    }
    if (secondForm === "object" && thirdForm === "missing") {
        return { argv: null, options: second, ambiguous: false };
    }
    if (["array", "missing"].includes(secondForm) &&
        ["object", "missing"].includes(thirdForm)) {
        return {
            argv: secondForm === "array" ? second : null,
            options: thirdForm === "object" ? third : null,
            ambiguous: false,
        };
    }
    return { ...ambiguous, argv: secondForm === "array" ? second : null };
}

export function extractProcessInvocations(
    sourceFile,
    sourcePath,
    repositoryRoot,
    origin = null,
    context = {},
    parameterValues = new Map(),
    bindingResolver = null,
) {
    const invocations = [];
    const resolver = bindingResolver ??
        createBindingResolver(sourceFile, { parameterValues, repositoryRoot });
    resolver.setParameterValues(parameterValues);
    resolver.finalizeWrites();
    const sourceLocation = (node) => {
        const local = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        return offsetLocation({ line: local.line + 1, column: local.character + 1 }, origin);
    };
    const describeStaticArgument = (
        value,
        index,
        expression,
        pathContext = { base: repositoryRoot, unknown: false },
        pathValue = undefined,
        forceDynamic = false,
    ) => {
        const primitive = value?.kind === "primitive"
            ? value.values.length === 1 ? value.values[0] : undefined
            : value?.kind === "strings"
              ? value.values.length === 1 ? value.values[0] : undefined
              : undefined;
        const path = resolveRuntimePath(pathValue === undefined ? primitive : pathValue,
            pathContext, repositoryRoot, { pathLikeOnly: true, insideOnly: true });
        return {
            index,
            value: ["string", "number", "boolean"].includes(typeof primitive)
                ? primitive
                : null,
            target: path.target,
            expression,
            dynamic: forceDynamic ||
                (pathValue === undefined && primitive === undefined) || path.dynamic,
        };
    };
    const describeArgument = (argument, index, pathContext) => {
        const staticValue = resolver.staticValue?.(argument, argument);
        const primitive = staticValue?.kind === "primitive"
            ? staticValue.values.length === 1 ? staticValue.values[0] : undefined
            : staticValue?.kind === "strings"
              ? staticValue.values.length === 1 ? staticValue.values[0] : undefined
              : staticPrimitive(argument);
        const evaluated = evaluatePathExpression(argument, sourceFile, sourcePath,
            repositoryRoot, new Set(), resolver);
        return describeStaticArgument(
            staticValue ?? (primitive === undefined ? null : { kind: "primitive", values: [primitive] }),
            index, expressionText(argument, sourceFile), pathContext,
            evaluated ?? primitive, evaluated === null && primitive === undefined,
        );
    };
    const describeArgumentVariants = (argument, index, pathContext) => {
        const staticValue = resolver.staticValue?.(argument, argument);
        const values = staticValue && ["primitive", "strings"].includes(staticValue.kind)
            ? staticValue.values
            : null;
        return values?.length
            ? values.map((value) => describeStaticArgument(
                  { kind: "primitive", values: [value] },
                  index, expressionText(argument, sourceFile), pathContext))
            : [describeArgument(argument, index, pathContext)];
    };
    const describeArgvVariants = (argument, pathContext) => {
        if (!argument) return [[]];
        const staticValue = resolver.staticValue?.(argument, argument);
        if (
            staticValue?.kind === "array" &&
            staticValue.correlated &&
            staticValue.values.length > 1
        ) {
            return [[describeArgument(argument, 0, pathContext)]];
        }
        const elements = ts.isArrayLiteralExpression(argument)
            ? argument.elements
            : staticValue?.kind === "array"
              ? staticValue.values
              : null;
        if (!elements) return [[describeArgument(argument, 0, pathContext)]];
        const multiValueElements = elements.filter((element) => {
            const value = element && typeof element.getStart === "function"
                ? resolver.staticValue?.(element, element)
                : element;
            return value &&
                ["primitive", "strings"].includes(value.kind) &&
                value.values.length > 1;
        });
        if (multiValueElements.length > 1) {
            return [[describeArgument(argument, 0, pathContext)]];
        }
        let variants = [[]];
        for (const [index, element] of elements.entries()) {
            const choices = element && typeof element.getStart === "function"
                ? describeArgumentVariants(element, index, pathContext)
                : element?.kind && ["primitive", "strings"].includes(element.kind) && element.values.length
                  ? element.values.map((value) => describeStaticArgument(
                        { kind: "primitive", values: [value] },
                        index, expressionText(argument, sourceFile), pathContext))
                  : null;
            if (!choices || choices.length === 0 || variants.length * choices.length > 64) {
                return [[describeArgument(argument, 0, pathContext)]];
            }
            variants = variants.flatMap((prefix) =>
                choices.map((choice) => [...prefix, choice]));
        }
        return variants;
    };
    const childCwdState = (node, shape) => {
        const inherited = resolver.cwdStateAt?.(node) ??
            { base: repositoryRoot, unknown: false };
        if (shape.ambiguous) return { ...inherited, unknown: true };
        if (!shape.options) return inherited;
        const cwd = resolver.propertyStateAt?.(shape.options, "cwd", node);
        if (!cwd || !cwd.present) return inherited;
        if (cwd.unknown || !cwd.value) return { ...inherited, unknown: true };
        const value = resolver.staticValue?.(cwd.value, cwd.value);
        const resolved = value &&
            ["strings", "primitive"].includes(value.kind) &&
            value.values.length === 1
                ? { known: true, value: value.values[0] }
                : null;
        const direct = staticPrimitive(cwd.value);
        const exactUndefined =
            ts.isVoidExpression(unwrapTransparentSyntax(cwd.value)) ||
            (ts.isIdentifier(unwrapTransparentSyntax(cwd.value)) &&
                unwrapTransparentSyntax(cwd.value).text === "undefined" &&
                resolver.lookup("undefined", cwd.value) === null);
        const exact = resolved?.value ?? direct;
        if (!resolved && direct === undefined && !exactUndefined) {
            return { ...inherited, unknown: true };
        }
        if (exact === undefined) return inherited;
        if (typeof exact !== "string") return { ...inherited, unknown: true };
        if (isAbsolute(exact)) return { base: exact, unknown: false };
        return inherited.unknown
            ? { ...inherited, unknown: true }
            : { base: resolve(inherited.base, exact), unknown: false };
    };
    function visit(node) {
        if (ts.isCallExpression(node)) {
            const bindings = resolver.resolveCases
                ? resolver.resolveCases(node.expression, node)
                : [resolver.resolveExpression(node.expression, node)];
            let carrier = unwrapTransparentSyntax(node.expression);
            while (ts.isPropertyAccessExpression(carrier) || ts.isElementAccessExpression(carrier)) {
                carrier = unwrapTransparentSyntax(carrier.expression);
            }
            const carrierRecord = ts.isIdentifier(carrier)
                ? resolver.lookup(carrier.text, node) : null;
            const mutableMaybe = Boolean(
                carrierRecord &&
                    bindings.some(({ kind }) => kind === "local") &&
                    (carrierRecord.assignmentSources?.length || carrierRecord.unknownWriteSites?.length),
            );
            const exactBindings = bindings.filter((binding) =>
                    binding.kind === "module-member" &&
                    childProcessModules.has(binding.moduleName) &&
                    processExecutionNames.has(binding.member));
            const taintedBindings = bindings.filter((binding) =>
                    binding.kind === "tainted-builtin-member" &&
                    binding.cjsRoot === "child_process" &&
                    processExecutionNames.has(binding.member));
            const callableBindings = [...exactBindings, ...taintedBindings];
            if (callableBindings.length > 0 && (!mutableMaybe || taintedBindings.length > 0)) {
                const location = sourceLocation(node);
                const ambiguousCarrier = bindings.some(({ kind }) =>
                    kind === "local" || kind === "tainted-builtin-member");
                for (const member of new Set(callableBindings.map((binding) => binding.member))) {
                    const shape = childCallShape(node, member, resolver);
                    const pathContext = childCwdState(node, shape);
                    const commands = node.arguments[0]
                        ? describeArgumentVariants(node.arguments[0], 0, pathContext) : [null];
                    const argvVariants = describeArgvVariants(shape.argv, pathContext);
                    const ambiguousComposite =
                        shape.ambiguous ||
                        (commands.length > 1 && argvVariants.length > 1) ||
                        (bindings.length > exactBindings.length && argvVariants.length > 1) ||
                        (exactBindings.length > 1 && argvVariants.length > 1) ||
                        (commands.length > 1 && bindings.length > exactBindings.length) ||
                        (commands.length > 1 && exactBindings.length > 1);
                    const emittedCommands = ambiguousComposite && node.arguments[0]
                        ? [describeArgument(node.arguments[0], 0, pathContext)] : commands;
                    const emittedArgv = ambiguousComposite
                        ? shape.argv
                            ? [[describeArgument(shape.argv, 0, pathContext)]]
                            : [[]]
                        : argvVariants;
                    for (const command of emittedCommands) {
                        for (const argv of emittedArgv) {
                            invocations.push({
                                source: sourcePath, ...context, ...location,
                                api: member,
                                binding: expressionText(node.expression, sourceFile),
                                command, argv,
                                dynamicArguments:
                                    Number(command?.dynamic ?? false) +
                                    argv.filter(({ dynamic }) => dynamic).length +
                                    Number(ambiguousCarrier || shape.ambiguous),
                            });
                        }
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return invocations.sort((left, right) =>
            left.source.localeCompare(right.source) ||
            left.line - right.line ||
            (left.column ?? 0) - (right.column ?? 0) ||
            left.api.localeCompare(right.api));
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
        const policy = await import("../../../../../scripts/lib/subpath-policy.mjs");
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

function normalizedVueLang(block, fallback) {
    const lang = String(block?.lang ?? fallback).trim().toLowerCase();
    return lang || fallback;
}

function vueBlockContext(kind, block, blockIndex, setup = false, extra = {}) {
    return {
        blockKind: kind,
        blockType: kind,
        blockIndex,
        lang: normalizedVueLang(block, kind === "template" ? "html" : kind === "style" ? "css" : "js"),
        setup,
        src: block?.src ?? null,
        ...extra,
    };
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
    const scriptResolvers = new Map();
    const scriptExtractions = [];

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
            const extracted = extractScriptReferences(source, path, null, {}, {
                repositoryRoot,
                deferFinalization: true,
            });
            scriptAsts.set(path, extracted.sourceFile);
            scriptResolvers.set(path, extracted.bindingResolver);
            scriptExtractions.push({
                sourcePath: path,
                extracted,
                origin: null,
                context: {},
            });
            parseErrors.push(...extracted.parseErrors);
        } else if (extname(path).toLowerCase() === ".vue") {
            const parsed = parseSfc(source, { filename: path, sourceMap: false });
            for (const error of parsed.errors) {
                parseErrors.push({ source: path, message: String(error) });
            }
            const { descriptor } = parsed;
            const blockEntries = [
                { kind: "script", block: descriptor.script, setup: false },
                { kind: "script", block: descriptor.scriptSetup, setup: true },
                { kind: "template", block: descriptor.template, setup: false },
                ...descriptor.styles.map((block, styleIndex) => ({
                    kind: "style",
                    block,
                    setup: false,
                    styleIndex,
                })),
            ]
                .filter(({ block }) => block)
                .sort(
                    (left, right) =>
                        (left.block.loc?.start?.offset ?? 0) -
                        (right.block.loc?.start?.offset ?? 0),
                )
                .map((entry, blockIndex) => ({
                    ...entry,
                    context: vueBlockContext(
                        entry.kind,
                        entry.block,
                        blockIndex,
                        entry.setup,
                        entry.kind === "style"
                            ? {
                                  styleIndex: entry.styleIndex,
                                  scoped: Boolean(entry.block.scoped),
                                  module: entry.block.module ?? false,
                              }
                            : {},
                    ),
                }));
            for (const { kind, block, context } of blockEntries) {
                if (kind === "style") continue;
                if (block?.src) {
                    addResolvedReference(path, {
                        specifier: block.src,
                        edgeKind: "vue-block",
                        line: block.loc?.start?.line ?? null,
                        column: block.loc?.start?.column ?? null,
                        metadata: context,
                    });
                }
            }
            for (const { block: style, context } of blockEntries.filter(
                ({ kind }) => kind === "style",
            )) {
                if (style.src) {
                    addResolvedReference(path, {
                        specifier: style.src,
                        edgeKind: "vue-block",
                        line: style.loc?.start?.line ?? null,
                        column: style.loc?.start?.column ?? null,
                        metadata: context,
                    });
                } else {
                    const css = extractCssReferences(
                        style.content,
                        path,
                        context,
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
            }
            for (const { block, context } of blockEntries.filter(
                ({ kind }) => kind === "script",
            )) {
                if (!block || block.src) continue;
                const suffix = context.lang;
                const virtualPath = `${path}.${suffix}`;
                const extracted = extractScriptReferences(
                    block.content,
                    virtualPath,
                    block.loc?.start ?? null,
                    context,
                    { repositoryRoot, deferFinalization: true },
                );
                scriptAsts.set(
                    path,
                    extracted.sourceFile,
                );
                scriptResolvers.set(path, extracted.bindingResolver);
                scriptExtractions.push({
                    sourcePath: path,
                    extracted,
                    origin: block.loc?.start ?? null,
                    context,
                });
                parseErrors.push(
                    ...extracted.parseErrors.map((error) => ({ ...error, source: path })),
                );
            }
            const templateBlock = blockEntries.find(({ kind }) => kind === "template");
            if (templateBlock?.block && !templateBlock.block.src) {
                const template = extractTemplateReferences(
                    templateBlock.block.content,
                    path,
                    templateBlock.block.loc?.start ?? null,
                    templateBlock.context,
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

    const pathContracts = collectPathParameterContracts(
        scriptAsts,
        scriptResolvers,
        repositoryRoot,
        repositoryVisibility,
    );
    for (const { sourcePath, extracted, origin, context } of scriptExtractions) {
        for (const reference of extracted.references) {
            if (reference.patterns) {
                const expansion = expandLiteralGlob(sourcePath, reference.patterns, seedPaths);
                for (const [pattern, targets] of expansion.matches) {
                    if (targets.length === 0) {
                        unresolvedGlobPatterns.push({
                            source: sourcePath,
                            pattern,
                            line: reference.line,
                            column: reference.column ?? null,
                        });
                    }
                }
                for (const target of expansion.targets) {
                    internalEdges.push({
                        source: sourcePath,
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
                addResolvedReference(
                    sourcePath,
                    reference,
                    reference.edgeKind === "new-url" ? "asset" : "module",
                );
            }
        }
        nonliteralLocalReferences.push(
            ...extracted.nonliteralReferences
                .filter(({ localHint }) => localHint)
                .map((reference) => ({ ...reference, source: sourcePath })),
        );
        dynamicModuleReferences.push(
            ...extracted.nonliteralReferences
                .filter(({ localHint }) => !localHint)
                .map((reference) => ({ ...reference, source: sourcePath })),
        );
        const parameterValues = pathContracts.get(sourcePath) ?? new Map();
        processInvocations.push(
            ...extractProcessInvocations(
                extracted.sourceFile,
                sourcePath,
                repositoryRoot,
                origin,
                context,
                parameterValues,
                extracted.bindingResolver,
            ),
        );
        const fileOperations = extractFileOperations(
            extracted.sourceFile,
            sourcePath,
            repositoryRoot,
            origin,
            parameterValues,
            extracted.bindingResolver,
        );
        unmodeledFileOperations.push(...fileOperations.unmodeled);
        for (const operation of fileOperations.operations) {
            const operationEdgeKind =
                ["scripts-generators", "build-config"].includes(projectionByPath.get(sourcePath))
                    ? operation.edgeKind
                    : operation.edgeKind === "generator-read"
                      ? "file-read"
                      : "file-write";
            const absoluteTarget = isAbsolute(operation.target)
                ? operation.target
                : join(repositoryRoot, operation.target);
            const operationMetadata = {
                operation: operation.operation,
                ...(operation.effect ? { effect: operation.effect } : {}),
            };
            if (!pathWithin(repositoryRoot, absoluteTarget)) {
                externalEdges.push({
                    source: sourcePath,
                    target: portable(absoluteTarget),
                    edgeKind: operationEdgeKind,
                    ...operationMetadata,
                    line: operation.line,
                    column: operation.column ?? null,
                    resolution: "external-file-operation",
                });
                continue;
            }
            const target = portable(relative(repositoryRoot, absoluteTarget)) || ".";
            if (emittedGraphArtifactPaths.has(target)) continue;
            if (target === "node_modules" || target.startsWith("node_modules/")) {
                externalEdges.push({
                    source: sourcePath,
                    target,
                    edgeKind: operationEdgeKind,
                    ...operationMetadata,
                    line: operation.line,
                    column: operation.column ?? null,
                    resolution: "external-package-file-operation",
                });
                continue;
            }
            const deleteEffect = operation.effect === "delete";
            const modeledGeneratorWrite =
                operationEdgeKind === "generator-write" &&
                !deleteEffect &&
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
                modeledGeneratorWrite ? sourcePath : null,
            );
            if (!targetNode) continue;
            if (
                modeledGeneratorWrite &&
                targetNode.nodeKind !== "generated-by-write"
            ) {
                targetNode.nodeKind = "generated-by-write";
                targetNode.generatedBy = sourcePath;
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
                source: sourcePath,
                target,
                specifier: null,
                edgeKind: operationEdgeKind,
                line: operation.line,
                column: operation.column ?? null,
                boundary: projectionByPath.has(target)
                    ? "within-projections"
                    : "repository-boundary",
                metadata: operationMetadata,
                projections: { eagerRuntime: false, buildLoad: true, ownership: true },
            });
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

Publication relies on POSIX directory fsync after the ordered sibling renames;
that directory-fsync contract is part of this generator-owned receipt protocol.

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
| Unresolved supported filesystem calls and opaque fs-module-promise boundaries | ${graph.summary.unmodeledFileOperations} |
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
error, including TypeScript syntactic diagnostics. Supported filesystem calls
are modeled when their path expression can be reduced from literals,
\`resolve\`/\`join\`, \`new URL(..., import.meta.url)\`, and lexical bindings;
unresolved supported filesystem calls and opaque fs-module-promise boundaries
remain counted in \`unmodeledFileOperations\` and are not represented as false
edges. This snapshot contains ${graph.summary.unmodeledFileOperations} such
ledger rows; this is not an exhaustive census of Node filesystem activity.
Literal CommonJS \`require\` and
\`createRequire\` targets are graph edges; \`exec\`/\`execFile\`/\`spawn\`/\`fork\`
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

export function assertStoredArtifacts(outputDirectory, graph) {
    const jsonPath = join(outputDirectory, "IMPORT-DAG-V3.json");
    const summaryPath = join(outputDirectory, "IMPORT-DAG-V3-SUMMARY.md");
    assertArtifactDestination(jsonPath);
    assertArtifactDestination(summaryPath);
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
}

const artifactLockFile = ".IMPORT-DAG-V3.lock";
const artifactTempPrefix = ".IMPORT-DAG-V3.";

function artifactTempFiles(outputDirectory) {
    return readdirSync(outputDirectory).filter((name) => name.startsWith(artifactTempPrefix) && name.endsWith(".tmp"));
}

function removeArtifactTemps(outputDirectory) {
    for (const name of artifactTempFiles(outputDirectory)) {
        try {
            unlinkSync(join(outputDirectory, name));
        } catch (error) { if (error.code !== "ENOENT") throw error; }
    }
}

function fsyncArtifactDirectory(outputDirectory) {
    const descriptor = openSync(outputDirectory, "r");
    try { fsyncSync(descriptor); } finally { closeSync(descriptor); }
}

function sameFileIdentity(left, right) {
    return left.dev === right.dev && left.ino === right.ino;
}

function assertArtifactDestination(path) {
    try {
        const stat = lstatSync(path);
        if (stat.isSymbolicLink() || !stat.isFile()) {
            throw new Error(`graph-v3: artifact destination is not a regular file: ${path}`);
        }
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
    }
}

function artifactFileState(path) {
    let before;
    try {
        before = lstatSync(path);
    } catch (error) {
        throw new Error(`graph-v3: artifact temporary file is absent or replaced: ${path}: ${error.message}`);
    }
    if (before.isSymbolicLink() || !before.isFile()) {
        throw new Error(`graph-v3: artifact temporary file is symbolic or replaced: ${path}`);
    }
    const descriptor = openSync(path, "r");
    try {
        const descriptorStat = fstatSync(descriptor);
        if (!sameFileIdentity(before, descriptorStat)) {
            throw new Error(`graph-v3: artifact temporary file was replaced: ${path}`);
        }
        const bytes = readFileSync(descriptor);
        const after = fstatSync(descriptor);
        if (!sameFileIdentity(descriptorStat, after) || after.size !== bytes.length) {
            throw new Error(`graph-v3: artifact temporary file changed while reading: ${path}`);
        }
        return {
            dev: descriptorStat.dev,
            ino: descriptorStat.ino,
            size: descriptorStat.size,
            sha256: createHash("sha256").update(bytes).digest("hex"),
        };
    } finally {
        closeSync(descriptor);
    }
}

function assertArtifactFileState(path, expected, label = "temporary") {
    const actual = artifactFileState(path);
    if (
        actual.dev !== expected.dev ||
        actual.ino !== expected.ino ||
        actual.size !== expected.size ||
        actual.sha256 !== expected.sha256
    ) {
        throw new Error(`graph-v3: ${label} artifact changed or was replaced: ${path}`);
    }
}

function assertOwnedArtifactLock(ownership, requireOwner = true) {
    let lockStat;
    try {
        lockStat = lstatSync(ownership.lockPath);
    } catch (error) {
        throw new Error(`graph-v3: artifact publication lock directory is absent or replaced: ${error.message}`);
    }
    if (lockStat.isSymbolicLink()) {
        throw new Error("graph-v3: artifact publication lock directory is symbolic or replaced");
    }
    if (!sameFileIdentity(lockStat, ownership.lockStat)) {
        throw new Error("graph-v3: artifact publication lock directory was replaced");
    }
    if (!requireOwner) return;
    let ownerStat;
    try {
        ownerStat = lstatSync(ownership.ownerPath);
    } catch (error) {
        throw new Error(`graph-v3: artifact publication lock owner is absent or replaced: ${error.message}`);
    }
    if (ownerStat.isSymbolicLink()) {
        throw new Error("graph-v3: artifact publication lock owner is symbolic or replaced");
    }
    if (!sameFileIdentity(ownerStat, ownership.ownerStat)) {
        throw new Error("graph-v3: artifact publication lock owner was replaced");
    }
    let owner;
    try {
        owner = JSON.parse(readFileSync(ownership.ownerPath, "utf8"));
    } catch (error) {
        throw new Error(`graph-v3: artifact publication lock owner is indeterminate: ${error.message}`);
    }
    if (owner?.token !== ownership.token || Number(owner?.pid) !== process.pid) {
        throw new Error("graph-v3: artifact publication lock owner was replaced");
    }
}

function closeArtifactOwnership(ownership) {
    for (const descriptor of [ownership.ownerDescriptor, ownership.lockDescriptor]) {
        if (descriptor === null || descriptor === undefined) continue;
        try { closeSync(descriptor); } catch (error) { if (error.code !== "EBADF") throw error; }
    }
    ownership.ownerDescriptor = null;
    ownership.lockDescriptor = null;
}

function removeOwnedArtifactLock(ownership, validatePayload = true) {
    assertOwnedArtifactLock(ownership, validatePayload);
    if (!validatePayload) {
        const ownerStat = lstatSync(ownership.ownerPath);
        if (ownerStat.isSymbolicLink()) {
            throw new Error("graph-v3: artifact publication lock owner is symbolic or replaced");
        }
        if (!sameFileIdentity(ownerStat, ownership.ownerStat)) {
            throw new Error("graph-v3: artifact publication lock owner was replaced");
        }
    }
    unlinkSync(ownership.ownerPath);
    fsyncArtifactDirectory(ownership.lockPath);
    rmdirSync(ownership.lockPath);
    fsyncArtifactDirectory(ownership.outputDirectory);
}

function inspectExistingArtifactLock(lockPath) {
    let lockStat;
    try {
        lockStat = lstatSync(lockPath);
    } catch (error) {
        throw new Error(`graph-v3: artifact publication lock is active or indeterminate: ${error.message}`);
    }
    if (lockStat.isSymbolicLink()) {
        throw new Error("graph-v3: artifact publication lock is active or indeterminate (symbolic link)");
    }
    let entries;
    try {
        entries = readdirSync(lockPath);
    } catch (error) {
        throw new Error(
            `graph-v3: artifact publication lock is active or indeterminate: ${error.message}`,
        );
    }
    if (entries.length !== 1 || !/^owner\.[A-Za-z0-9-]+\.json$/.test(entries[0])) {
        throw new Error("graph-v3: artifact publication lock is active or indeterminate");
    }
    const ownerPath = join(lockPath, entries[0]);
    let ownerStat;
    try {
        ownerStat = lstatSync(ownerPath);
    } catch {
        throw new Error("graph-v3: artifact publication lock is active or indeterminate");
    }
    if (ownerStat.isSymbolicLink()) {
        throw new Error("graph-v3: artifact publication lock is active or indeterminate (symbolic link)");
    }
    const expectedToken = entries[0].slice("owner.".length, -".json".length);
    let owner;
    try {
        owner = JSON.parse(readFileSync(ownerPath, "utf8"));
    } catch {
        throw new Error("graph-v3: artifact publication lock is active or indeterminate");
    }
    const ownerPid = Number(owner?.pid);
    const token = String(owner?.token ?? "");
    if (!Number.isInteger(ownerPid) || ownerPid <= 0 || !token || token !== expectedToken) {
        throw new Error("graph-v3: artifact publication lock is active or indeterminate");
    }
    try {
        process.kill(ownerPid, 0);
        throw new Error(`graph-v3: artifact publication lock is active (pid ${ownerPid})`);
    } catch (probeError) {
        if (probeError.message?.startsWith("graph-v3:")) throw probeError;
        if (probeError.code === "EPERM") {
            throw new Error(`graph-v3: artifact publication lock is active (pid ${ownerPid})`);
        }
        throw new Error(
            `graph-v3: artifact publication lock is stale (pid ${ownerPid}); explicit recovery required`,
        );
    }
}

function acquireArtifactLock(outputDirectory) {
    const lockPath = join(outputDirectory, artifactLockFile);
    const token = randomUUID();
    const ownerPath = join(lockPath, `owner.${token}.json`);
    let lockDirectoryCreated = false;
    let lockDescriptor = null;
    let ownerDescriptor = null;
    let ownership = null;
    try {
        mkdirSync(lockPath, { recursive: false, mode: 0o700 });
        lockDirectoryCreated = true;
        lockDescriptor = openSync(lockPath, "r");
        const lockStat = fstatSync(lockDescriptor);
        ownerDescriptor = openSync(ownerPath, "wx", 0o600);
        ownership = {
            outputDirectory,
            lockPath,
            ownerPath,
            token,
            lockDescriptor,
            ownerDescriptor,
            lockStat,
            ownerStat: fstatSync(ownerDescriptor),
        };
        writeFileSync(
            ownerDescriptor,
            `${JSON.stringify({ pid: process.pid, token, createdAt: new Date().toISOString() })}\n`,
        );
        fsyncSync(ownerDescriptor);
        fsyncArtifactDirectory(lockPath);
        removeArtifactTemps(outputDirectory);
        fsyncArtifactDirectory(outputDirectory);
        const release = () => {
            try {
                if (process.env.GRAPH_V3_TEST_FAIL_RELEASE === "1") {
                    throw new Error("graph-v3: injected artifact lock release failure");
                }
                removeOwnedArtifactLock(ownership);
            } finally {
                closeArtifactOwnership(ownership);
            }
        };
        return {
            assertOwned: () => assertOwnedArtifactLock(ownership),
            release,
        };
    } catch (error) {
        if (error.code === "EEXIST" && !lockDirectoryCreated) {
            inspectExistingArtifactLock(lockPath);
        }
        if (ownership) {
            try {
                removeOwnedArtifactLock(ownership, false);
            } catch {
                // Preserve the acquisition failure; any remaining owned lock is explicit residue.
            } finally {
                closeArtifactOwnership(ownership);
            }
        } else {
            let canRemoveLockDirectory = false;
            if (lockDirectoryCreated && lockDescriptor !== null) {
                try {
                    let ownerAbsent = false;
                    try {
                        lstatSync(ownerPath);
                    } catch (error) {
                        if (error.code === "ENOENT") ownerAbsent = true;
                        else throw error;
                    }
                    canRemoveLockDirectory =
                        !lstatSync(lockPath).isSymbolicLink() &&
                        sameFileIdentity(fstatSync(lockDescriptor), lstatSync(lockPath)) &&
                        ownerAbsent;
                } catch {}
            }
            closeArtifactOwnership({ ownerDescriptor, lockDescriptor });
            if (canRemoveLockDirectory) {
                try {
                    rmdirSync(lockPath);
                    fsyncArtifactDirectory(outputDirectory);
                } catch {
                    // Preserve the acquisition failure; a replaced lock is never removed.
                }
            }
        }
        throw error;
    }
}

function durableArtifactWrite(path, content) {
    const bytes = Buffer.from(content);
    const descriptor = openSync(path, "wx+", 0o600);
    try {
        writeFileSync(descriptor, bytes);
        fsyncSync(descriptor);
        const expectedStat = fstatSync(descriptor);
        if (expectedStat.size !== bytes.length) {
            throw new Error(`graph-v3: artifact temporary bytes changed before publication: ${path}`);
        }
        if (
            process.env.GRAPH_V3_TEST_MUTATE_FIRST_TEMP_BEFORE_STATE === "1" &&
            path.endsWith(".json.tmp")
        ) {
            writeFileSync(path, Buffer.concat([bytes, Buffer.from("tampered")]), { flag: "r+" });
        }
        const actual = Buffer.alloc(bytes.length);
        let offset = 0;
        while (offset < actual.length) {
            const count = readSync(descriptor, actual, offset, actual.length - offset, offset);
            if (count === 0) {
                throw new Error(`graph-v3: unexpected EOF while verifying artifact temporary: ${path}`);
            }
            offset += count;
        }
        const actualStat = fstatSync(descriptor);
        const expectedHash = createHash("sha256").update(bytes).digest("hex");
        if (
            offset !== bytes.length ||
            !sameFileIdentity(expectedStat, actualStat) ||
            actualStat.size !== bytes.length ||
            createHash("sha256").update(actual).digest("hex") !== expectedHash
        ) {
            throw new Error(`graph-v3: artifact temporary bytes changed before publication: ${path}`);
        }
        return {
            dev: expectedStat.dev,
            ino: expectedStat.ino,
            size: bytes.length,
            sha256: expectedHash,
        };
    } finally {
        closeSync(descriptor);
    }
}

async function publishArtifacts(outputDirectory, graph, assertOwned) {
    const token = `${process.pid}.${randomUUID()}`;
    const jsonTemp = join(outputDirectory, `${artifactTempPrefix}${token}.json.tmp`);
    const summaryTemp = join(outputDirectory, `${artifactTempPrefix}${token}.summary.tmp`);
    let summaryPublished = false;
    let failurePresent = false;
    let failure = null;
    const normalizeFailure = (thrown, preserveLock) => {
        const normalized = new Error("graph-v3: publication failed");
        if (preserveLock) {
            try { normalized.preserveArtifactLock = true; } catch {}
        }
        let isError = false;
        try { isError = thrown instanceof Error; } catch {}
        let detail = null;
        if (isError) {
            try { detail = thrown.message; } catch {}
        } else {
            try { detail = `publication threw ${String(thrown)}`; } catch {}
        }
        try {
            if (typeof detail === "string" && detail.length > 0) {
                normalized.message = `graph-v3: ${detail}`;
            }
        } catch {}
        try { normalized.cause = thrown; } catch {}
        if (isError) {
            let stack = null;
            try { stack = thrown.stack; } catch {}
            try {
                if (typeof stack === "string" && stack.length > 0) {
                    normalized.stack = `${normalized.stack}\nCaused by:\n${stack}`;
                }
            } catch {}
        }
        return normalized;
    };
    const rememberFailure = (thrown) => {
        if (failurePresent) return;
        failurePresent = true;
        const preserveLock = summaryPublished;
        try {
            failure = normalizeFailure(thrown, preserveLock);
        } catch {
            failure = new Error("graph-v3: publication failed");
            if (preserveLock) failure.preserveArtifactLock = true;
        }
    };
    try {
        const jsonState = durableArtifactWrite(jsonTemp, `${JSON.stringify(graph, null, 2)}\n`);
        if (process.env.GRAPH_V3_TEST_FAIL_SECOND_TEMP_WRITE === "1") {
            throw new Error("graph-v3: injected second temporary artifact write failure");
        }
        const summaryState = durableArtifactWrite(summaryTemp, renderSummary(graph));
        const pauseMs = Number(process.env.GRAPH_V3_TEST_PAUSE_BEFORE_PUBLICATION_MS ?? 0);
        if (Number.isFinite(pauseMs) && pauseMs > 0) {
            await new Promise((resolvePromise) => setTimeout(resolvePromise, pauseMs));
        }
        assertArtifactDestination(join(outputDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
        assertArtifactDestination(join(outputDirectory, "IMPORT-DAG-V3.json"));
        assertArtifactFileState(summaryTemp, summaryState, "summary temporary");
        assertArtifactFileState(jsonTemp, jsonState, "JSON temporary");
        assertOwned();
        renameSync(summaryTemp, join(outputDirectory, "IMPORT-DAG-V3-SUMMARY.md"));
        summaryPublished = true;
        const afterSummaryPauseMs = Number(
            process.env.GRAPH_V3_TEST_PAUSE_AFTER_SUMMARY_RENAME_MS ?? 0,
        );
        if (Number.isFinite(afterSummaryPauseMs) && afterSummaryPauseMs > 0) {
            await new Promise((resolvePromise) => setTimeout(resolvePromise, afterSummaryPauseMs));
        }
        const injectedFailure = process.env.GRAPH_V3_TEST_THROW_AFTER_SUMMARY_FAILURE;
        if (injectedFailure === "falsy") throw 0;
        if (injectedFailure === "truthy") throw "injected post-summary primitive";
        if (injectedFailure === "error") throw new Error("injected post-summary primary failure");
        if (injectedFailure === "hostile") {
            throw {
                [Symbol.toPrimitive]() {
                    throw 0;
                },
            };
        }
        if (injectedFailure === "revoked") {
            const revoked = Proxy.revocable({}, () => {});
            revoked.revoke();
            throw revoked.proxy;
        }
        // The machine JSON is the final commit marker for the pair.
        assertArtifactDestination(join(outputDirectory, "IMPORT-DAG-V3.json"));
        assertArtifactFileState(jsonTemp, jsonState, "JSON temporary");
        assertOwned();
        renameSync(jsonTemp, join(outputDirectory, "IMPORT-DAG-V3.json"));
        fsyncArtifactDirectory(outputDirectory);
        assertArtifactFileState(
            join(outputDirectory, "IMPORT-DAG-V3-SUMMARY.md"),
            summaryState,
            "published summary",
        );
        assertArtifactFileState(
            join(outputDirectory, "IMPORT-DAG-V3.json"),
            jsonState,
            "published JSON",
        );
    } catch (error) {
        rememberFailure(error);
    } finally {
        for (const path of [jsonTemp, summaryTemp]) {
            try {
                if (
                    process.env.GRAPH_V3_TEST_THROW_NULL_CLEANUP === "1" &&
                    path.endsWith(".json.tmp")
                ) throw null;
                unlinkSync(path);
            } catch (error) {
                let code;
                try { code = error?.code; } catch {}
                if (code !== "ENOENT") rememberFailure(error);
            }
        }
    }
    if (failurePresent) throw failure;
}

async function main() {
    const options = parseArguments(process.argv.slice(2));
    const artifactLock = acquireArtifactLock(options.outputDirectory);
    let stdout = null;
    let preserveArtifactLock = false;
    try {
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
        if (options.check) {
            assertStoredArtifacts(options.outputDirectory, graph);
        } else {
            await publishArtifacts(options.outputDirectory, graph, artifactLock.assertOwned);
        }
        stdout = `${JSON.stringify(graph.summary, null, 2)}\nreceiptSha256=${graph.receiptSha256}\n`;
    } catch (error) {
        preserveArtifactLock = Boolean(error?.preserveArtifactLock);
        throw error;
    } finally {
        if (!preserveArtifactLock) artifactLock.release();
    }
    if (stdout !== null) process.stdout.write(stdout);
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
