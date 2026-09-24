// scan/text.mjs — references in JSON (tsconfig, package.json, the floor records), shell,
// CI YAML (FD-10) and HTML, and the one predicate for a string that names a repo location.

/** A string that names (or tries to name) a repo location. */
export function pathCandidate(v) {
    if (!v || v.length > 300 || /[\s\n<>|"'`$]/.test(v) || v.includes("://") || v.startsWith("data:")) return null;
    const bare = v.replace(/[?#].*$/, "");
    const glob = /[*{]/.test(bare);
    if (/^\/?(src|demo|tests|tests-visual|scripts|docs)\/./.test(bare) || /^\/?(src|demo|tests|tests-visual|scripts)$/.test(bare)) return { glob, zoneRooted: true };
    if (/^(\.\.?\/)+./.test(bare)) return { glob, zoneRooted: /^(\.\.?\/)+(src|demo|tests|tests-visual|scripts|docs)(\/|$)/.test(bare), hasExt: /\.[a-z0-9]{1,6}$/i.test(bare) };
    return null;
}

export function jsonStrings(code) {
    const out = [];
    let i = 0;
    const stack = [];
    let expectKey = false;
    while (i < code.length) {
        const c = code[i];
        if (c === "/" && code[i + 1] === "/") { while (i < code.length && code[i] !== "\n") i++; continue; }
        if (c === "/" && code[i + 1] === "*") { i = code.indexOf("*/", i + 2) + 2; continue; }
        if (c === "{") { stack.push("o"); expectKey = true; i++; continue; }
        if (c === "[") { stack.push("a"); expectKey = false; i++; continue; }
        if (c === "}" || c === "]") { stack.pop(); i++; continue; }
        if (c === ",") { expectKey = stack.at(-1) === "o"; i++; continue; }
        if (c === ":") { expectKey = false; i++; continue; }
        if (c === '"') {
            let j = i + 1;
            while (j < code.length && code[j] !== '"') j += code[j] === "\\" ? 2 : 1;
            const raw = code.slice(i + 1, j);
            let value;
            try { value = JSON.parse(`"${raw}"`); } catch { value = raw; }
            out.push({ value, start: i + 1, end: j, isKey: expectKey, path: [...stack] });
            i = j + 1;
            continue;
        }
        i++;
    }
    return out;
}

/** `records`: this tree's floor records dir (`<floor home>/records/`), whose JSON names
 *  export keys and phantoms as data; only their zone-rooted strings (and a ledger's
 *  `file` values) are paths. */
export function scanJson(file, code, { records = null } = {}) {
    const refs = [];
    const strings = jsonStrings(code);
    const isPkg = /(^|\/)package\.json$/.test(file);
    const isRecord = !!records && file.startsWith(records);
    const isLedger = isRecord && file.endsWith("/opaque-ledger.json");
    let key = null;
    for (const s of strings) {
        if (s.isKey) { key = s.value; continue; }
        if (isPkg && /\s/.test(s.value)) {
            for (const tok of commandTokens(s.value, s.start)) refs.push({ kind: "json-command", mode: "path", spec: tok.value, start: tok.start, end: tok.end, spans: [tok], rootFirst: false, claim: true });
            continue;
        }
        const c = pathCandidate(s.value) ?? (/^(\.\/)?(dist|MIGRATION\.md|tests-visual)(\/|$)/.test(s.value) ? { glob: /\*/.test(s.value), zoneRooted: true, hasExt: /\.[a-z]+$/.test(s.value) } : null);
        if (!c) continue;
        if (isRecord && !c.zoneRooted) continue; // export keys ("./styles"), not paths
        if (isLedger && key !== "file") continue; // a ledger names phantoms as data; only `file` is a path
        refs.push({ kind: c.glob ? "json-glob" : "json-ref", mode: c.glob ? "glob" : "path", spec: s.value, start: s.start, end: s.end, spans: [{ start: s.start, end: s.end, value: s.value }], rootFirst: isRecord || c.zoneRooted, claim: true, hasExt: c.hasExt ?? true });
    }
    return { refs };
}

/** Tokens of a shell command line that name repo files (scripts, configs). */
export function commandTokens(cmd, base) {
    const out = [];
    for (const m of cmd.matchAll(/[^\s"';&|=()]+/g)) {
        const v = m[0];
        if (/^(\.\/)?(src|demo|tests|tests-visual|scripts|docs)\/[^\s]*\.[a-z0-9]+$/i.test(v) || /^(\.\/)?[\w.-]+\.(mjs|cjs|mts|ts|js|sh)$/.test(v))
            out.push({ value: v, start: base + m.index, end: base + m.index + v.length });
    }
    return out;
}

export function scanSh(file, code) {
    const refs = [];
    code.split("\n").reduce((off, line) => {
        if (!/^\s*#/.test(line)) for (const tok of commandTokens(line, off)) refs.push({ kind: "sh-ref", mode: "path", spec: tok.value, start: tok.start, end: tok.end, spans: [tok], rootFirst: true, hasExt: true, claim: true });
        return off + line.length + 1;
    }, 0);
    return { refs };
}

/** FD-10 · CI workflows: every non-comment command token that names a repo file, and every
 *  `npm run <script>` / `npm -w <ws> run <script>` naming a package script. */
export function scanYaml(file, code) {
    const refs = [];
    code.split("\n").reduce((off, line) => {
        const text = line.replace(/(^|\s)#.*$/, "$1");
        if (text.trim()) {
            for (const tok of commandTokens(text, off)) refs.push({ kind: "yaml-command", mode: "path", spec: tok.value, start: tok.start, end: tok.end, spans: [tok], rootFirst: true, hasExt: true, claim: true });
            for (const m of text.matchAll(/\bnpm\s+(?:(?:-w|--workspace)[\s=]+([\w./@-]+)\s+)?run(?:-script)?\s+([\w:.-]+)/g)) {
                const start = off + m.index + m[0].lastIndexOf(m[2]);
                refs.push({ kind: "yaml-npm-script", mode: "npm-script", spec: m[2], workspace: m[1] ?? null, start, end: start + m[2].length, spans: [] });
            }
        }
        return off + line.length + 1;
    }, 0);
    return { refs };
}

export function scanHtml(file, code) {
    const refs = [];
    for (const m of code.matchAll(/<(?:script|link|img|source)\b[^>]*?\b(?:src|href)\s*=\s*(["'])([^"']+)\1/g)) {
        const v = m[2];
        if (/^(https?:|data:|#|\/\/)/.test(v)) continue;
        const start = m.index + m[0].lastIndexOf(v);
        refs.push({ kind: "html-ref", mode: v.startsWith("/") ? "module" : "path", spec: v, start, end: start + v.length, spans: [{ start, end: start + v.length, value: v }] });
    }
    return { refs };
}
