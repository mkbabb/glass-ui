// syntax.mjs — P5-F4: every file an engine writes is parsed before it is written. A script
// (`.ts`, `.tsx`, `.mts`, `.cts`, `.js`, `.mjs`, `.cjs`, `.jsx`) by the TypeScript parser, an
// SFC by `@vue/compiler-sfc` with each of its script blocks by the TypeScript parser and each
// plain-CSS style block by postcss, a sheet by postcss, JSON by `JSON.parse` (a tsconfig or
// `.jsonc` by TypeScript's JSON-with-comments reader). Any other file is not parsed and says
// so. `deps` is F-1's parser set (`loadDeps` in lib/graph.mjs). The move engine (lib/move.mjs) and the row transaction (rows/lib.mjs) call `unparsed`
// on their staged texts and refuse the step, with nothing written, when one fails.
const SCRIPT = /\.(tsx?|mts|cts|jsx?|mjs|cjs)$/;
const kindOf = (ts, file) => (/\.tsx$/.test(file) ? ts.ScriptKind.TSX : /\.jsx$/.test(file) ? ts.ScriptKind.JSX : /\.(ts|mts|cts)$/.test(file) ? ts.ScriptKind.TS : ts.ScriptKind.JS);

function scriptError(ts, file, text, kind = kindOf(ts, file)) {
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false, kind);
    const d = sf.parseDiagnostics?.[0];
    if (!d) return null;
    const { line, character } = sf.getLineAndCharacterOfPosition(d.start ?? 0);
    return `${line + 1}:${character + 1} ${ts.flattenDiagnosticMessageText(d.messageText, " ")}`;
}

function cssError(postcss, file, text) {
    try { postcss.parse(text, { from: file }); return null; } catch (e) { return String(e.reason ?? e.message).slice(0, 160) + (e.line ? ` at ${e.line}:${e.column}` : ""); }
}

/**
 * The parse verdict of one text: `null` when it parses, a message when it does not, and
 * `undefined` for a file kind this module does not parse.
 */
export function parseError(deps, file, text) {
    const { ts, postcss, sfc } = deps;
    if (SCRIPT.test(file)) return scriptError(ts, file, text);
    if (file.endsWith(".css")) return cssError(postcss, file, text);
    if (file.endsWith(".vue")) {
        const { descriptor, errors } = sfc.parse(text, { filename: file, ignoreEmpty: false });
        if (errors?.length) return `sfc: ${String(errors[0].message ?? errors[0]).slice(0, 160)}`;
        for (const b of [descriptor.script, descriptor.scriptSetup]) {
            if (!b || b.src) continue;
            const lang = b.lang ?? "js";
            const kind = lang === "tsx" ? ts.ScriptKind.TSX : lang === "ts" ? ts.ScriptKind.TS : lang === "jsx" ? ts.ScriptKind.JSX : ts.ScriptKind.JS;
            const err = scriptError(ts, `${file}.${lang}`, b.content, kind);
            if (err) return `<script${b.setup ? " setup" : ""}> ${err}`;
        }
        for (const s of descriptor.styles) {
            if (s.src || (s.lang && s.lang !== "css" && s.lang !== "postcss")) continue;
            const err = cssError(postcss, file, s.content);
            if (err) return `<style> ${err}`;
        }
        return null;
    }
    if (/(^|\/)(tsconfig|jsconfig)[^/]*\.json$/.test(file) || file.endsWith(".jsonc")) {
        const r = ts.parseConfigFileTextToJson(file, text);
        return r.error ? ts.flattenDiagnosticMessageText(r.error.messageText, " ") : null;
    }
    if (file.endsWith(".json")) {
        try { JSON.parse(text); return null; } catch (e) { return String(e.message).slice(0, 160); }
    }
    return undefined;
}

/** Every staged write that does not parse: `[{ file, error }]`. `writes` is an iterable of
 *  `[path, text]`; a removal (`null`) and a kind this module does not parse are skipped. */
export function unparsed(deps, writes) {
    const out = [];
    for (const [file, text] of writes) {
        if (text === null || text === undefined) continue;
        const error = parseError(deps, file, typeof text === "string" ? text : text.toString("utf8"));
        if (error) out.push({ file, error });
    }
    return out;
}
