// token-manifest.mjs — the countable-token-basis scanner (BG.W-TOKEN-MANIFEST).
//
// The token basis is uncountable across FOUR consumption channels, so accretion
// is invisible and every tranche nets tokens. This leaf makes the basis
// countable: it scans every DECLARED CSS custom property under `src/styles/` and
// resolves each to its consumption channel(s) — `var()`, Tailwind `@theme`
// utility-gen, the Tailwind `prop-(--token)` arbitrary shorthand, and the JS
// read surface (`getPropertyValue`/`readNum`/`readToken`/`setProperty` +
// template-literal families) — then marks each token alive|dead. A token with
// ZERO live channel is dead surface.
//
// The scan is precise (channel-specific, never raw name-matching) so a token
// mentioned ONLY in a comment does NOT read as alive — the false-alive class the
// anti-accretion floor exists to catch. Dynamic template-literal reads
// (`--section-color-${i}`, `--spring-${name}`, `--${prefix}-flow`) are handled
// via a static prefix/suffix family match so a whole read-by-family cohort is
// never false-flagged dead.
//
// Pure core: `classifyTokens({ declSources, consumeSources })` operates on
// in-memory `{ rel, content }` source pairs (the self-test drives it with
// synthetic sources). `buildTokenManifest({ root })` is the thin file-reading
// wrapper the gate calls. No side effects, no process.exit.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";

/** Strip CSS block comments so a declaration/reference never matches prose. */
function stripBlockComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Strip JS/TS line + block comments so a `--token` inside a line or block JS
 *  comment never reads as a live JS reference (the false-alive class). */
function stripJsComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const SKIP_DIRS = new Set(["node_modules", ".cache", "dist", ".git"]);

/** Recursively gather files under `dir` whose extension is in `exts`. */
function gather(dir, exts, out = []) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return out;
    }
    for (const e of entries) {
        const abs = resolve(dir, e);
        let st;
        try {
            st = statSync(abs);
        } catch {
            continue;
        }
        if (st.isDirectory()) {
            if (SKIP_DIRS.has(e)) continue;
            gather(abs, exts, out);
        } else if (exts.some((x) => e.endsWith(x))) {
            out.push(abs);
        }
    }
    return out;
}

const TOKEN = "--[a-z][a-z0-9-]*";

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/** The [start,end) index spans of every `@theme`/`@theme inline` block body. */
function themeBlockSpans(css) {
    const spans = [];
    const re = /@theme(?:\s+inline)?\s*\{/g;
    let m;
    while ((m = re.exec(css))) {
        let depth = 1;
        let i = re.lastIndex;
        for (; i < css.length && depth > 0; i++) {
            if (css[i] === "{") depth++;
            else if (css[i] === "}") depth--;
        }
        spans.push([m.index, i]);
    }
    return spans;
}

function inSpan(idx, spans) {
    return spans.some(([s, e]) => idx >= s && idx < e);
}

function lineAt(src, idx) {
    let line = 1;
    for (let i = 0; i < idx && i < src.length; i++) if (src[i] === "\n") line++;
    return line;
}

/**
 * Scan the DECLARATION surface from `{ rel, content }` sources: every
 * `--token: …` declaration + `@property --token` registration, tracking which
 * declarations sit inside an `@theme` block (alive via the build-time Tailwind
 * utility-generation channel).
 *
 * @returns {Map<string, { decls: string[], theme: boolean }>}
 */
export function scanDeclarationSources(sources) {
    const decls = new Map();
    const declRe = new RegExp(`(?:^|[;{])\\s*(${TOKEN})\\s*:`, "g");
    const propRe = new RegExp(`@property\\s+(${TOKEN})`, "g");

    for (const { rel, content } of sources) {
        const raw = stripBlockComments(content);
        const themeSpans = themeBlockSpans(raw);
        const record = (name, idx) => {
            const cur = decls.get(name) ?? { decls: [], theme: false };
            cur.decls.push(`${rel}:${lineAt(raw, idx)}`);
            if (inSpan(idx, themeSpans)) cur.theme = true;
            decls.set(name, cur);
        };
        for (const m of raw.matchAll(declRe)) record(m[1], m.index);
        for (const m of raw.matchAll(propRe)) record(m[1], m.index);
    }
    return decls;
}

/**
 * Extract dynamic token families from template literals like
 *   `--section-color-${i}`  → prefix `--section-color-`
 *   `--spring-${name}`       → prefix `--spring-`
 *   `--${tokenPrefix}-flow`  → suffix `-flow`
 * A `--${string}` TS TYPE annotation (no static prefix/suffix) contributes
 * nothing. A prefix must be `--` + ≥3 real chars; a suffix `-` + ≥3 real chars —
 * long enough that the family match is specific, not a catch-all.
 */
function collectDynamicFamilies(src, prefixes, suffixes) {
    const tplRe = /`(--[^`]*\$\{[^`]*)`/g;
    for (const m of src.matchAll(tplRe)) {
        const body = m[1];
        const firstInterp = body.indexOf("${");
        const lastClose = body.lastIndexOf("}");
        const prefix = body.slice(0, firstInterp);
        const suffix = lastClose >= 0 ? body.slice(lastClose + 1) : "";
        if (
            /^--[a-z][a-z0-9-]{2,}$/.test(prefix.replace(/-+$/, "")) &&
            prefix.length >= 5
        ) {
            prefixes.add(prefix);
        }
        if (/^-[a-z][a-z0-9-]{2,}$/.test(suffix)) suffixes.add(suffix);
    }
}

/**
 * Scan the CONSUMPTION surface from `{ rel, content }` sources. `rel` ending in
 * `.css` selects CSS-comment stripping (and disables the JS channels for that
 * file). Returns the live-channel sets: exact `var()` reads, exact Tailwind
 * `prop-(--token)` shorthands, exact JS string-literal reads, and the DYNAMIC
 * template-literal families.
 */
export function scanConsumptionSources(sources) {
    const varSet = new Set();
    const propSet = new Set();
    const jsSet = new Set();
    const dynPrefixes = new Set();
    const dynSuffixes = new Set();

    const varRe = new RegExp(`var\\(\\s*(${TOKEN})`, "g");
    const propRe = new RegExp(`-\\(\\s*(?:[a-z-]+\\s*:\\s*)?(${TOKEN})\\s*\\)`, "g");
    const jsStrRe = new RegExp(`["'\`](${TOKEN})["'\`]`, "g");

    for (const { rel, content } of sources) {
        const isCss = rel.endsWith(".css");
        const src = isCss ? stripBlockComments(content) : stripJsComments(content);
        for (const m of src.matchAll(varRe)) varSet.add(m[1]);
        for (const m of src.matchAll(propRe)) propSet.add(m[1]);
        if (!isCss) {
            for (const m of src.matchAll(jsStrRe)) jsSet.add(m[1]);
            collectDynamicFamilies(src, dynPrefixes, dynSuffixes);
        }
    }
    return { varSet, propSet, jsSet, dynPrefixes, dynSuffixes };
}

/** The live channels for `name`; empty ⇒ dead. */
export function channelsFor(name, decl, live) {
    const { varSet, propSet, jsSet, dynPrefixes, dynSuffixes } = live;
    const channels = [];
    if (decl.theme) channels.push("theme");
    if (varSet.has(name)) channels.push("var");
    if (propSet.has(name)) channels.push("prop");
    if (jsSet.has(name)) channels.push("js");
    if (
        [...dynPrefixes].some((p) => name.startsWith(p)) ||
        [...dynSuffixes].some((s) => name.endsWith(s))
    ) {
        channels.push("js-dynamic");
    }
    return channels;
}

/**
 * The PURE core: classify every declared token against the consumption channels.
 * @param {{ declSources: {rel,content}[], consumeSources: {rel,content}[] }} args
 */
export function classifyTokens({ declSources, consumeSources }) {
    const decls = scanDeclarationSources(declSources);
    const live = scanConsumptionSources(consumeSources);

    const tokens = [];
    for (const [name, decl] of decls) {
        const channels = channelsFor(name, decl, live);
        tokens.push({
            name,
            decls: decl.decls,
            channels,
            alive: channels.length > 0,
        });
    }
    tokens.sort((a, b) => a.name.localeCompare(b.name));

    const dead = tokens.filter((t) => !t.alive).map((t) => t.name);
    return {
        total: tokens.length,
        aliveCount: tokens.length - dead.length,
        deadCount: dead.length,
        dead,
        tokens,
    };
}

/** Read the CSS declaration files under `src/styles` into `{ rel, content }`. */
export function readDeclarationSources(root) {
    const dir = resolve(root, "src/styles");
    return gather(dir, [".css"]).map((abs) => ({
        rel: relative(root, abs),
        content: safeRead(abs),
    }));
}

/**
 * Read the consumption files into `{ rel, content }`. Consumption is repo-wide:
 * the LIBRARY (`src/`) and the reference CONSUMER (`demo/` — a public token the
 * demo `<main>` reads is alive-via-consumer, not accretion). A token dead across
 * BOTH is truly dead surface.
 */
export function readConsumptionSources(root) {
    const exts = [".css", ".vue", ".ts", ".mjs"];
    return [
        ...gather(resolve(root, "src"), exts),
        ...gather(resolve(root, "demo"), exts),
    ].map((abs) => ({ rel: relative(root, abs), content: safeRead(abs) }));
}

/**
 * Build the full manifest by reading the repo and classifying.
 * @param {{ root: string }} opts
 */
export function buildTokenManifest({ root }) {
    return classifyTokens({
        declSources: readDeclarationSources(root),
        consumeSources: readConsumptionSources(root),
    });
}
