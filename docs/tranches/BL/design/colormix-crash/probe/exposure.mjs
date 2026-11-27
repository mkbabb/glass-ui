// Consumer exposure: the gate's two-mix detector over a tree's src/ CSS and Vue
// <style> blocks, once alone and once per consumer with every custom property
// that consumer's own source declares added as a producer. Lists the glass
// declarations that take the WebKit abort shape only once a consumer's real
// values are in. Producers are pooled across selectors and schemes, so a hit
// is a candidate for the WebKit witness, not a proven abort.
//
// usage: node exposure.mjs <tree-root> <consumers-root> <out.json> <repo[/sub]>...
import { readFileSync, writeFileSync, readdirSync, lstatSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import postcss from "postcss";

const [ROOT, HOME, OUT, ...REPOS] = process.argv.slice(2);
// Built bundles, caches, vendored copies of glass, tests and probes are not a
// consumer's own source.
const SKIP = new Set(["node_modules", "bench", "build", "cache", "coverage", "public", "test-results", "playwright-report", "docs", "glass-ui", "tests", "test", "e2e", "probe", "probes", "scratch", "vendor"]);
const SKIP_DIR = (name) => SKIP.has(name) || /^dist/.test(name);
const SKIP_FILE = (name) => /\.min\./.test(name) || /-[A-Za-z0-9_-]{8}\.css$/.test(name);

const walk = (dir, acc = []) => {
    for (const name of readdirSync(dir)) {
        if (name.startsWith(".")) continue;
        const p = join(dir, name);
        let s;
        try { s = lstatSync(p); } catch { continue; }
        if (s.isSymbolicLink()) continue;
        if (s.isDirectory()) { if (!SKIP_DIR(name)) walk(p, acc); }
        else if (/\.(css|vue)$/.test(name) && !SKIP_FILE(name) && s.size < 2_000_000) acc.push(p);
    }
    return acc;
};
const sheetsOf = (base, files) => files.flatMap((file) => {
    const text = readFileSync(file, "utf8");
    if (file.endsWith(".css")) return [{ id: relative(base, file), css: text, offset: 0 }];
    return [...text.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style\s*>/gi)]
        .filter((m) => !/\blang\s*=\s*["']?(?!css)/i.test(m[1]))
        .map((m) => ({ id: relative(base, file), css: m[2], offset: text.slice(0, m.index + m[0].indexOf(">") + 1).split("\n").length - 1 }));
});

// The same function walker as the gate.
const calls = (value) => {
    const found = [];
    const scan = (from, to) => {
        for (let i = from; i < to; i += 1) {
            if (value.startsWith("/*", i)) { i = value.indexOf("*/", i + 2); if (i < 0) return; continue; }
            const m = value.slice(i, to).match(/^([A-Za-z_][\w-]*)\s*\(/);
            if (!m) continue;
            const open = i + m[0].length - 1;
            let depth = 1, part = open + 1, close = -1;
            const args = [];
            for (let j = open + 1; j < to; j += 1) {
                if (value.startsWith("/*", j)) { j = value.indexOf("*/", j + 2); if (j < 0) break; continue; }
                if (value[j] === "(") depth += 1;
                else if (value[j] === ")" && --depth === 0) { args.push(value.slice(part, j).trim()); close = j; break; }
                else if (value[j] === "," && depth === 1) { args.push(value.slice(part, j).trim()); part = j + 1; }
            }
            if (close < 0) continue;
            found.push({ name: m[1].toLowerCase(), args });
            scan(open + 1, close);
            i = close;
        }
    };
    scan(0, value.length);
    return found;
};

const parse = (sheets, keep) => {
    const declarations = [];
    const producers = new Map();
    for (const s of sheets) {
        let tree;
        try { tree = postcss.parse(s.css); } catch { continue; }
        tree.walkDecls((d) => {
            if (keep) declarations.push({ id: `${s.id}:${d.source.start.line + s.offset} ${d.prop}`, value: d.value });
            if (d.prop.startsWith("--")) producers.set(d.prop, [...(producers.get(d.prop) ?? []), { from: `${s.id}:${d.source.start.line + s.offset}`, value: d.value }]);
        });
    }
    return { declarations, producers };
};

// For each declaration whose color-mix has two arms that each hold a mix, the
// first chain of producers that brings a mix into each arm.
const sites = (declarations, producers) => {
    const pathToMix = (value, stack) => {
        for (const call of calls(value)) {
            if (call.name === "color-mix") return [];
            if (call.name !== "var") continue;
            const name = call.args[0]?.trim() ?? "";
            if (call.args.length > 1) {
                const via = pathToMix(call.args.slice(1).join(", "), stack);
                if (via) return via;
            }
            if (stack.includes(name)) continue;
            for (const p of producers.get(name) ?? []) {
                const via = pathToMix(p.value, [...stack, name]);
                if (via) return [`${name} @ ${p.from}`, ...via];
            }
        }
        return null;
    };
    const found = new Map();
    for (const d of declarations)
        for (const mix of calls(d.value).filter((c) => c.name === "color-mix")) {
            const [a, b] = mix.args.slice(1, 3);
            if (!a || !b) continue;
            const pa = pathToMix(a, []), pb = pathToMix(b, []);
            if (pa && pb && !found.has(d.id)) found.set(d.id, { arm1: pa, arm2: pb });
        }
    return found;
};

const glass = parse(sheetsOf(ROOT, walk(join(ROOT, "src"))), true);
// Every custom property glass reads or declares: a consumer's value for one of
// these reaches glass's declarations.
const glassNames = new Set(glass.producers.keys());
for (const d of glass.declarations) for (const c of calls(d.value)) if (c.name === "var") glassNames.add(c.args[0]?.trim());
const alone = sites(glass.declarations, glass.producers);
const result = { tree: ROOT, alone: Object.fromEntries(alone), consumers: {} };
console.log(`alone: ${alone.size}`, [...alone.keys()].join(" | "));
for (const repo of REPOS) {
    const base = join(HOME, repo);
    if (!existsSync(base)) continue;
    const mine = parse(sheetsOf(base, walk(base)), false);
    const merged = new Map(glass.producers);
    const overrides = [];
    for (const [name, list] of mine.producers) {
        merged.set(name, [...(glass.producers.get(name) ?? []), ...list]);
        if (!glassNames.has(name)) continue;
        for (const p of list) if (/color-mix\(/i.test(p.value)) overrides.push(`${name} @ ${p.from}`);
    }
    const added = Object.fromEntries([...sites(glass.declarations, merged)].filter(([id]) => !alone.has(id)));
    result.consumers[repo] = { mixOverridesOfGlassTokens: overrides, added };
    console.log(`${repo}: ${overrides.length} glass tokens set to a mix; +${Object.keys(added).length} sites`);
    for (const [id, why] of Object.entries(added)) console.log("   ", id, "\n        arm 1:", why.arm1.join(" > ") || "(literal)", "\n        arm 2:", why.arm2.join(" > ") || "(literal)");
}
writeFileSync(OUT, JSON.stringify(result, null, 1));
