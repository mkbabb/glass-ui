// recipes.mjs — classes as the source composes them (P4-F4, P4-F7). A class recipe is one
// string in `src` that lists two or more class tokens (`"glass-chip glass-capsule
// accent-tone …"` in chipVariants.ts, a template `class="…"`). Two classes co-occur when one
// recipe carries both: an element that wears one wears the other, so a rule on either paints
// it. A class is owned by the style files whose selectors name it (src CSS and SFC <style>).
// The browser seat selects the specs that read a changed file's classes and the classes whose
// every wearer wears one of them; the cascade verifier refuses a reorder that swaps two rules on
// co-occurring classes. Both read this one index.
import { createRequire } from "node:module";
import { join } from "node:path";

const TOKEN = /^-?[_a-zA-Z][-_a-zA-Z0-9]*$/;
const STRING = /"([^"\\\n]*)"|'([^'\\\n]*)'|`([^`\\$]*)`/g;

/** Every src string with at least two class-shaped tokens, as a Set of its tokens. */
export function classRecipes(tree) {
    const out = [];
    for (const f of tree.files) {
        if (!f.startsWith("src/") || !/\.(ts|tsx|vue)$/.test(f) || /\.d\.ts$/.test(f) || f.includes("/__tests__/")) continue;
        let text;
        try { text = tree.read(f); } catch { continue; }
        for (const m of text.matchAll(STRING)) {
            const s = m[1] ?? m[2] ?? m[3];
            const toks = s.split(/\s+/).map((t) => t.replace(/^[a-z-]+:/, "")).filter((t) => TOKEN.test(t));
            if (toks.length >= 2) out.push({ file: f, classes: new Set(toks) });
        }
    }
    return out;
}

/** Class tokens a stylesheet's selectors name (postcss), each with the selectors naming it. */
export function selectorClasses(postcss, css, from = "x.css") {
    const out = new Set();
    let root;
    try { root = postcss.parse(css, { from }); } catch { return out; }
    root.walkRules((r) => { for (const m of r.selector.matchAll(/\.(-?[_a-zA-Z][-_a-zA-Z0-9]*)/g)) out.add(m[1]); });
    return out;
}

const styleText = (f, text) => (f.endsWith(".vue") ? [...text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n") : text);

/** class → the src style files (CSS, SFC <style>) whose selectors name it. */
export function classOwners(tree) {
    const postcss = createRequire(join(tree.root, "package.json"))("postcss");
    const owners = new Map();
    for (const f of tree.files) {
        if (!f.startsWith("src/") || !/\.(css|vue)$/.test(f) || f.includes("/__tests__/")) continue;
        let text;
        try { text = styleText(f, tree.read(f)); } catch { continue; }
        for (const c of selectorClasses(postcss, text, f)) (owners.get(c) ?? owners.set(c, new Set()).get(c)).add(f);
    }
    return { owners, postcss };
}

/** The classes a file contributes: a style file's selector classes, a script's recipe tokens. */
export function classesOf(tree, file, { owners, postcss }, recipes) {
    let text;
    try { text = tree.read(file); } catch { return new Set(); }
    if (/\.(css|vue)$/.test(file)) {
        const own = selectorClasses(postcss, styleText(file, text), file);
        if (file.endsWith(".vue")) for (const r of recipes) if (r.file === file) for (const c of r.classes) if (owners.has(c)) own.add(c);
        return own;
    }
    const own = new Set();
    for (const r of recipes) if (r.file === file) for (const c of r.classes) if (owners.has(c)) own.add(c);
    return own;
}

/** The owned classes whose every wearer also wears one of `classes`: each recipe that
 *  carries such a class carries one of them (`glass-chip` is only ever composed with
 *  `accent-tone`), so a spec that reads it reads an element the changed rules paint. */
export function impliedBy(classes, recipes, owners) {
    const out = new Set();
    const carrying = new Map();
    for (const r of recipes) for (const c of r.classes) if (owners.has(c) && !classes.has(c)) (carrying.get(c) ?? carrying.set(c, []).get(c)).push(r);
    for (const [c, rs] of carrying) if (rs.every((r) => [...classes].some((x) => r.classes.has(x)))) out.add(c);
    return out;
}

/** Do `a` and `b` (class sets) co-occur in one recipe, or share a class? The recipe file. */
export function coOccurrence(a, b, recipes) {
    for (const c of a) if (b.has(c)) return { shared: c };
    for (const r of recipes) {
        const x = [...a].find((c) => r.classes.has(c));
        const y = [...b].find((c) => r.classes.has(c));
        if (x && y) return { recipe: r.file, classes: [x, y] };
    }
    return null;
}
