import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { parse as parseSfc } from "@vue/compiler-sfc";
import postcss from "postcss";
import ts from "typescript";

const POSIX = (value: string): string => value.split(sep).join("/");
const TOKEN_DEFINITION = /\[(--[\w-]+):/g;

export interface CarrierCensusEntry {
    sourcePath: string;
    sinkOrigins: Array<{
        tag: string;
        kind: string;
        module?: string;
        imported?: string;
    }>;
    flows: string[];
}

export interface TokenGraphDetectorResult {
    cssDeclarations: Map<string, Set<string>>;
    arbitraryDefinitions: Set<string>;
    grammarCases: Set<string>;
    errors: string[];
}

interface ImportBinding {
    imported: string;
    local: string;
    module: string;
    typeOnly: boolean;
}

const walkFiles = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        return entry.isDirectory() ? walkFiles(path) : [path];
    });

const importsFrom = (sourceFile: ts.SourceFile): ImportBinding[] =>
    sourceFile.statements.flatMap((statement) => {
        if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
            return [];
        }
        const clause = statement.importClause;
        if (!clause) return [];
        const result: ImportBinding[] = [];
        if (clause.name) {
            result.push({
                imported: "default",
                local: clause.name.text,
                module: statement.moduleSpecifier.text,
                typeOnly: clause.isTypeOnly,
            });
        }
        if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
            for (const element of clause.namedBindings.elements) {
                result.push({
                    imported: element.propertyName?.text ?? element.name.text,
                    local: element.name.text,
                    module: statement.moduleSpecifier.text,
                    typeOnly: clause.isTypeOnly || element.isTypeOnly,
                });
            }
        }
        return result;
    });

const visit = (node: ts.Node, callback: (node: ts.Node) => void): void => {
    callback(node);
    ts.forEachChild(node, (child) => visit(child, callback));
};

const resolvedRelative = (sourcePath: string, specifier: string): string => {
    const base = POSIX(resolve(dirname(sourcePath), specifier));
    return base.replace(/\.(?:js|ts)$/, "");
};

const classTokens = (literal: string): string[] =>
    [...literal.matchAll(TOKEN_DEFINITION)].map((match) => match[1]!);

const expression = (content: string): ts.Expression | null => {
    const source = ts.createSourceFile(
        "template-expression.ts",
        `const __glass = (${content});`,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );
    const statement = source.statements[0];
    let initializer = statement && ts.isVariableStatement(statement)
        ? statement.declarationList.declarations[0]?.initializer ?? null
        : null;
    while (initializer && ts.isParenthesizedExpression(initializer)) {
        initializer = initializer.expression;
    }
    return initializer;
};

const stringArguments = (
    call: ts.CallExpression,
    topLevelStrings: Map<string, string>,
): { direct: string[]; topLevel: string[]; unsupported: boolean } => {
    const direct: string[] = [];
    const topLevel: string[] = [];
    let unsupported = false;
    for (const argument of call.arguments) {
        if (ts.isStringLiteral(argument)) direct.push(argument.text);
        else if (ts.isIdentifier(argument) && topLevelStrings.has(argument.text)) {
            topLevel.push(topLevelStrings.get(argument.text)!);
        } else if (
            ts.isNoSubstitutionTemplateLiteral(argument) &&
            classTokens(argument.text).length > 0
        ) {
            unsupported = true;
        }
    }
    return { direct, topLevel, unsupported };
};

const runtimeExported = (
    sourcePath: string,
    read: (path: string) => string | null,
): boolean => {
    const indexPath = POSIX(join(dirname(sourcePath), "index.ts"));
    const text = read(indexPath);
    if (text === null) return false;
    const source = ts.createSourceFile(indexPath, text, ts.ScriptTarget.Latest, true);
    const target = `./${sourcePath.split("/").at(-1)}`;
    return source.statements.some(
        (statement) =>
            ts.isExportDeclaration(statement) &&
            !statement.isTypeOnly &&
            ts.isStringLiteral(statement.moduleSpecifier) &&
            statement.moduleSpecifier.text === target,
    );
};

const analyzeCarrier = (
    root: string,
    census: CarrierCensusEntry,
    read: (path: string) => string | null,
    result: TokenGraphDetectorResult,
): void => {
    const text = read(census.sourcePath);
    if (text === null) {
        result.errors.push(`${census.sourcePath}: missing carrier`);
        return;
    }
    if (!runtimeExported(census.sourcePath, read)) {
        result.errors.push(`${census.sourcePath}: not runtime exported from its public component entry`);
    }
    const parsed = parseSfc(text, { filename: census.sourcePath });
    if (parsed.errors.length > 0) {
        result.errors.push(...parsed.errors.map((error) => `${census.sourcePath}: ${String(error)}`));
        return;
    }
    const script = parsed.descriptor.scriptSetup ?? parsed.descriptor.script;
    const template = parsed.descriptor.template;
    if (!script || !template) {
        result.errors.push(`${census.sourcePath}: requires script and template`);
        return;
    }
    const sourceFile = ts.createSourceFile(
        census.sourcePath,
        script.content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );
    const imports = importsFrom(sourceFile);
    const cn = imports.find(
        (binding) =>
            !binding.typeOnly &&
            binding.imported === "cn" &&
            POSIX(resolvedRelative(census.sourcePath, binding.module)) ===
                POSIX(resolve(root, "src/components/_shared/class-names")),
    )?.local;
    const computed = imports.find(
        (binding) =>
            !binding.typeOnly && binding.imported === "computed" && binding.module === "vue",
    )?.local;
    if (!cn) result.errors.push(`${census.sourcePath}: cn does not resolve to the approved source`);

    const topLevelStrings = new Map<string, string>();
    const computedClasses = new Map<
        string,
        { direct: string[]; topLevel: string[]; unsupported: boolean }
    >();
    for (const statement of sourceFile.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
            if (ts.isStringLiteral(declaration.initializer)) {
                topLevelStrings.set(declaration.name.text, declaration.initializer.text);
                continue;
            }
            if (
                computed && cn && ts.isCallExpression(declaration.initializer) &&
                ts.isIdentifier(declaration.initializer.expression) &&
                declaration.initializer.expression.text === computed
            ) {
                let cnCall: ts.CallExpression | null = null;
                visit(declaration.initializer, (node) => {
                    if (
                        ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
                        node.expression.text === cn
                    ) cnCall = node;
                });
                if (cnCall) {
                    computedClasses.set(
                        declaration.name.text,
                        stringArguments(cnCall, topLevelStrings),
                    );
                }
            }
        }
    }

    const expectedOrigins = new Map(census.sinkOrigins.map((origin) => [origin.tag, origin]));
    const observedOrigins = new Set<string>();
    const observedFlows = new Set<string>();
    const walkTemplate = (node: Record<string, unknown>): void => {
        if (node.type === 1 && typeof node.tag === "string" && Array.isArray(node.props)) {
            for (const property of node.props as Array<Record<string, unknown>>) {
                if (
                    property.type !== 7 || property.name !== "bind" ||
                    (property.arg as { content?: string } | undefined)?.content !== "class"
                ) continue;
                const content = (property.exp as { content?: string } | undefined)?.content;
                if (!content) continue;
                const parsedExpression = expression(content);
                let values: { direct: string[]; topLevel: string[]; unsupported: boolean } | null = null;
                if (
                    parsedExpression && cn && ts.isCallExpression(parsedExpression) &&
                    ts.isIdentifier(parsedExpression.expression) && parsedExpression.expression.text === cn
                ) {
                    values = stringArguments(parsedExpression, topLevelStrings);
                } else if (parsedExpression && ts.isIdentifier(parsedExpression)) {
                    values = computedClasses.get(parsedExpression.text) ?? null;
                }
                if (!values) continue;
                const origin = expectedOrigins.get(node.tag);
                if (!origin) {
                    if ([...values.direct, ...values.topLevel].some((value) => classTokens(value).length > 0)) {
                        result.errors.push(`${census.sourcePath}: token writer reaches unapproved sink ${node.tag}`);
                    }
                    continue;
                }
                if (origin.module) {
                    const binding = imports.find(
                        (candidate) =>
                            !candidate.typeOnly && candidate.local === node.tag &&
                            candidate.module === origin.module && candidate.imported === origin.imported,
                    );
                    if (!binding) {
                        result.errors.push(`${census.sourcePath}: ${node.tag} has wrong component origin`);
                        continue;
                    }
                }
                observedOrigins.add(node.tag);
                if (values.unsupported) {
                    result.errors.push(`${census.sourcePath}: unsupported template literal writer`);
                }
                for (const value of values.direct) {
                    for (const token of classTokens(value)) result.arbitraryDefinitions.add(token);
                }
                for (const value of values.topLevel) {
                    for (const token of classTokens(value)) result.arbitraryDefinitions.add(token);
                }
                const isComputed = parsedExpression && ts.isIdentifier(parsedExpression);
                const isNative = /^[a-z]/.test(node.tag);
                if (
                    values.topLevel.some((value) => classTokens(value).length > 0) &&
                    isComputed && !isNative
                ) {
                    observedFlows.add("top-level-const-computed-cn-string");
                    result.grammarCases.add("approved-component-v-bind:class/top-level-const-computed-cn-string");
                } else if (values.topLevel.some((value) => classTokens(value).length > 0)) {
                    result.errors.push(`${census.sourcePath}: top-level writer is outside the admitted computed component path`);
                }
                if (values.direct.some((value) => classTokens(value).length > 0)) {
                    const flow = isComputed ? "computed-cn-string" : "direct-cn-string";
                    observedFlows.add(flow);
                    result.grammarCases.add(
                        `${isNative ? "native" : "approved-component"}-v-bind:class/${flow}`,
                    );
                }
            }
        }
        for (const child of (node.children as Array<Record<string, unknown>> | undefined) ?? []) {
            walkTemplate(child);
        }
    };
    walkTemplate(template.ast as unknown as Record<string, unknown>);
    for (const origin of census.sinkOrigins) {
        if (!observedOrigins.has(origin.tag)) {
            result.errors.push(`${census.sourcePath}: missing governed sink ${origin.tag}`);
        }
    }
    for (const flow of census.flows) {
        const normalized = flow.includes(":") ? flow.slice(flow.lastIndexOf(":") + 1) : flow;
        if (!observedFlows.has(normalized)) {
            result.errors.push(`${census.sourcePath}: missing governed flow ${flow}`);
        }
    }
};

export function analyzeTokenGraph(options: {
    root: string;
    census: CarrierCensusEntry[];
    read?: (path: string) => string | null;
}): TokenGraphDetectorResult {
    const root = resolve(options.root);
    const read = options.read ?? ((path: string) => {
        try {
            return readFileSync(resolve(root, path), "utf8");
        } catch {
            return null;
        }
    });
    const result: TokenGraphDetectorResult = {
        cssDeclarations: new Map(),
        arbitraryDefinitions: new Set(),
        grammarCases: new Set(),
        errors: [],
    };
    const sourceFiles = walkFiles(join(root, "src"));
    for (const absolute of sourceFiles) {
        const path = POSIX(relative(root, absolute));
        const text = read(path);
        if (text === null) continue;
        const cssBlocks = path.endsWith(".css")
            ? [text]
            : path.endsWith(".vue")
              ? parseSfc(text, { filename: path }).descriptor.styles.map((style) => style.content)
              : [];
        for (const css of cssBlocks) {
            const parsed = postcss.parse(css, { from: path });
            parsed.walkDecls((declaration) => {
                if (!declaration.prop.startsWith("--")) return;
                const refs = result.cssDeclarations.get(declaration.prop) ?? new Set<string>();
                for (const match of declaration.value.matchAll(/var\(\s*(--[\w-]+)/g)) {
                    refs.add(match[1]!);
                }
                result.cssDeclarations.set(declaration.prop, refs);
            });
        }
    }
    for (const carrier of options.census) analyzeCarrier(root, carrier, read, result);
    return result;
}
