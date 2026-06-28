// PROTOTYPE — resolved-cascade flattener. Follows index.css @import "./x.css"
// recursively (the src-level partials only; build-time folds ../glass-ui.css /
// components.css are out-of-scope injects). Emits ONE flattened CSS string in
// cascade order. Used to prove colocation-via-@import-path-change preserves the
// resolved cascade byte-for-byte.
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

const IMPORT_RE = /^[ \t]*@import\s+["']([^"']+)["']\s*;/gm;

export function resolveCascade(indexPath, seen = new Set()) {
    const dir = dirname(indexPath);
    const src = readFileSync(indexPath, "utf-8");
    let out = "";
    let last = 0;
    let m;
    IMPORT_RE.lastIndex = 0;
    while ((m = IMPORT_RE.exec(src))) {
        const spec = m[1];
        // emit text before this @import (preserves comments/whitespace)
        out += src.slice(last, m.index);
        last = m.index + m[0].length;
        // skip non-css / build folds (tailwindcss, package specifiers, glass-ui.css)
        if (!spec.endsWith(".css") || spec.startsWith("@") || spec.includes("glass-ui.css")) {
            out += `/*SKIP-FOLD:${spec}*/`;
            continue;
        }
        const partial = resolve(dir, spec);
        if (!existsSync(partial)) { out += `/*MISSING:${spec}*/`; continue; }
        if (seen.has(partial)) { out += `/*DUP:${spec}*/`; continue; }
        seen.add(partial);
        out += `\n/*<<<INLINE ${spec}>>>*/\n` + resolveCascade(partial, seen) + `\n/*<<<END ${spec}>>>*/\n`;
    }
    out += src.slice(last);
    return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const idx = process.argv[2];
    process.stdout.write(resolveCascade(idx));
}
