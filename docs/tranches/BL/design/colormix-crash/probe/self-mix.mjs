// Shared-token sweep: every color-mix() in a tree's src/ CSS and Vue <style>
// blocks whose two arms can both take their colour from one custom property.
// If a consumer sets that property to a color-mix, both arms hold a mix, which
// is the shape WebKit aborts on, whatever glass's own producers say.
//
// Three readings of "take their colour from":
//   direct: the arm names the property itself, as its var() or a fallback
//           (no producers followed: the cured gate's rule);
//   alias:  the arm can BE the property (var(), its fallback, and pure var()
//           aliases through every producer of each property);
//   colour: the property sits anywhere the arm's colour comes from (the arm, a
//           fallback, a relative colour's origin, a light-dark() or color-mix()
//           argument), followed through every producer.
//
// usage: node self-mix.mjs <tree-root> <out.json>
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import postcss from "postcss";

const [ROOT, OUT] = process.argv.slice(2);

const walk = (dir, acc = []) => {
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p, acc);
        else if (/\.(css|vue)$/.test(name)) acc.push(p);
    }
    return acc;
};

// The same function walker as tests/styles/color-mix-endpoints.test.ts.
const calls = (value) => {
    const found = [];
    const scan = (from, to) => {
        for (let i = from; i < to; i += 1) {
            const m = value.slice(i, to).match(/^([A-Za-z_][\w-]*)\s*\(/);
            if (!m) continue;
            const open = i + m[0].length - 1;
            let depth = 1, part = open + 1, close = -1;
            const args = [];
            for (let j = open + 1; j < to; j += 1) {
                if (value[j] === "(") depth += 1;
                else if (value[j] === ")" && --depth === 0) { args.push(value.slice(part, j).trim()); close = j; break; }
                else if (value[j] === "," && depth === 1) { args.push(value.slice(part, j).trim()); part = j + 1; }
            }
            if (close < 0) continue;
            found.push({ name: m[1].toLowerCase(), args, start: i, end: close + 1 });
            scan(open + 1, close);
            i = close;
        }
    };
    scan(0, value.length);
    return found;
};
// Top-level calls only (not those nested inside another call).
const topCalls = (value) => {
    const all = calls(value);
    return all.filter((c) => !all.some((o) => o !== c && o.start <= c.start && o.end >= c.end));
};

const decls = [];
const producers = new Map();
for (const file of walk(join(ROOT, "src"))) {
    const text = readFileSync(file, "utf8");
    const blocks = file.endsWith(".css")
        ? [{ css: text, offset: 0 }]
        : [...text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)].map((m) => ({ css: m[1], offset: text.slice(0, m.index).split("\n").length - 1 }));
    for (const { css, offset } of blocks)
        postcss.parse(css).walkDecls((d) => {
            const value = d.value.replace(/\/\*[\s\S]*?\*\//g, " ");
            decls.push({ at: `${relative(ROOT, file)}:${d.source.start.line + offset}`, prop: d.prop, value });
            if (d.prop.startsWith("--")) producers.set(d.prop, [...(producers.get(d.prop) ?? []), value]);
        });
}

// An arm with its weight (a percentage or a calc()) stripped.
const WEIGHT = String.raw`(?:-?[\d.]+%|calc\(.*\))`;
const bare = (arm) => arm.trim().replace(new RegExp(String.raw`\s+${WEIGHT}$`, "s"), "").replace(new RegExp(String.raw`^${WEIGHT}\s+`, "s"), "").trim();

const directOf = (arm) => {
    const out = new Set();
    let v = bare(arm);
    for (;;) {
        const c = topCalls(v);
        if (c.length !== 1 || c[0].name !== "var" || c[0].start !== 0 || c[0].end !== v.length) return out;
        out.add(c[0].args[0].trim());
        if (c[0].args.length < 2) return out;
        v = c[0].args.slice(1).join(", ").trim();
    }
};

const aliasOf = (arm, stack = []) => {
    const out = new Set();
    const v = bare(arm);
    const c = topCalls(v);
    if (c.length !== 1 || c[0].name !== "var" || c[0].start !== 0 || c[0].end !== v.length) return out;
    const name = c[0].args[0].trim();
    out.add(name);
    if (c[0].args.length > 1) for (const n of aliasOf(c[0].args.slice(1).join(", "), stack)) out.add(n);
    if (!stack.includes(name)) for (const p of producers.get(name) ?? []) for (const n of aliasOf(p, [...stack, name])) out.add(n);
    return out;
};

const COLOUR_ARGS = new Set(["color-mix", "light-dark"]);
const RELATIVE = new Set(["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color"]);
const colourOf = (arm, stack = []) => {
    const out = new Set();
    const visit = (value) => {
        for (const c of topCalls(bare(value))) {
            if (c.name === "var") {
                const name = c.args[0].trim();
                out.add(name);
                if (c.args.length > 1) visit(c.args.slice(1).join(", "));
                if (!stack.includes(name)) for (const p of producers.get(name) ?? []) for (const n of colourOf(p, [...stack, name])) out.add(n);
            } else if (COLOUR_ARGS.has(c.name)) {
                for (const a of c.name === "color-mix" ? c.args.slice(1) : c.args) visit(a);
            } else if (RELATIVE.has(c.name) && /^from\s/.test(c.args[0] ?? "")) {
                const rest = c.args[0].slice(4).trim();
                const first = topCalls(rest)[0];
                visit(first && first.start === 0 ? rest.slice(0, first.end) : rest.split(/\s+/)[0]);
            }
        }
    };
    visit(arm);
    return out;
};

const rows = [];
for (const d of decls)
    for (const mix of calls(d.value).filter((c) => c.name === "color-mix")) {
        const [a, b] = mix.args.slice(1, 3);
        if (!a || !b) continue;
        const da = directOf(a), db = directOf(b);
        const direct = [...da].filter((n) => db.has(n));
        const aa = aliasOf(a), ab = aliasOf(b);
        const alias = [...aa].filter((n) => ab.has(n));
        const ca = colourOf(a), cb = colourOf(b);
        const colour = [...ca].filter((n) => cb.has(n));
        if (direct.length || alias.length || colour.length) rows.push({ at: d.at, prop: d.prop, mix: `color-mix(${mix.args.join(", ")})`.slice(0, 220), direct, alias, colour });
    }
const summary = { direct: rows.filter((r) => r.direct.length).length, alias: rows.filter((r) => r.alias.length).length, colour: rows.filter((r) => r.colour.length).length };
writeFileSync(OUT, JSON.stringify({ tree: ROOT, summary, rows }, null, 1));
console.log(JSON.stringify(summary));
for (const r of rows) console.log(r.at, r.prop, "| direct:", r.direct.join(" "), "| alias:", r.alias.join(" "), "| colour:", r.colour.join(" "));
