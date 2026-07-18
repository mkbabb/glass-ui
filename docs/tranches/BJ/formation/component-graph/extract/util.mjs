// util.mjs — shared deterministic helpers for the component-graph extractor.
// No design judgment lives here; pure mechanical transforms.
import { createHash } from "node:crypto";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

function isFile(p) {
    try { return statSync(p).isFile(); } catch { return false; }
}

// extract/ → component-graph → formation → BJ → tranches → docs → <repo root>
export const REPO_ROOT = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../../../../../..",
);
export const SRC = path.join(REPO_ROOT, "src");

/** sha1 of a string (used for shape hashes). */
export function sha1(s) {
    return createHash("sha1").update(s).digest("hex");
}

/** PascalCase or camelCase → kebab-case. `DropdownMenu` → `dropdown-menu`. */
export function kebab(name) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .replace(/_/g, "-")
        .toLowerCase();
}

/** kebab-case dir → PascalCase. `dropdown-menu` → `DropdownMenu`. */
export function pascal(name) {
    return name
        .split(/[-_]/)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("");
}

/** Round to fixed precision so re-runs diff clean. */
export function round(n, p = 4) {
    if (n == null || Number.isNaN(n)) return 0;
    return Number(n.toFixed(p));
}

/** Canonical string sort. */
export function csort(arr) {
    return [...arr].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/** Unique + canonical sort. */
export function usort(arr) {
    return csort([...new Set(arr)]);
}

/** Jaccard index over two arrays (as sets). */
export function jaccard(a, b) {
    const A = new Set(a);
    const B = new Set(b);
    if (A.size === 0 && B.size === 0) return 0;
    let inter = 0;
    for (const x of A) if (B.has(x)) inter++;
    const union = A.size + B.size - inter;
    return union === 0 ? 0 : inter / union;
}

/**
 * Resolve a relative import specifier from an importing file to an on-disk path.
 * Tries `.vue`, `.ts`, `/index.ts`, `.css`, and the literal path. Returns the
 * absolute path or null (external / unresolved).
 */
export function resolveImport(fromFile, spec) {
    if (!spec.startsWith(".")) return null; // external package
    const base = path.resolve(path.dirname(fromFile), spec);
    const candidates = [
        `${base}.vue`,
        `${base}.ts`,
        `${base}.mjs`,
        `${base}.css`,
        path.join(base, "index.ts"),
        path.join(base, "index.vue"),
        base, // a bare file (no extension) — checked last, must be a FILE not a dir
    ];
    for (const c of candidates) if (isFile(c)) return c;
    return null;
}

/** Extract every `import ... from "X"` / bare `import "X"` specifier from JS/TS source. */
export function scanImportSpecifiers(code) {
    const out = [];
    const re =
        /import\s+(?:type\s+)?(?:[^'";]*?\bfrom\s+)?["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(code))) out.push(m[1]);
    // also `export ... from "X"` re-exports
    const re2 = /export\s+(?:type\s+)?(?:\*|\{[^}]*\})\s+from\s+["']([^"']+)["']/g;
    while ((m = re2.exec(code))) out.push(m[1]);
    return out;
}

/** Path under src/ relative form, POSIX. */
export function relSrc(abs) {
    return path.relative(SRC, abs).split(path.sep).join("/");
}

/** Path relative to repo root, POSIX. */
export function relRepo(abs) {
    return path.relative(REPO_ROOT, abs).split(path.sep).join("/");
}
