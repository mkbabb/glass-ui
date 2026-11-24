// Sweep: every color-mix() in a tree's src/ CSS and Vue <style> blocks, with
// var() chains resolved through every declaration of each custom property.
// For each color-mix occurrence on each resolution path it records what its two
// arms resolve to, so the WebKit crash shape (a color-mix whose BOTH arms are
// themselves color-mix) and the relative-colour variant can be read off.
//
// usage: node sweep.mjs <tree-root> <out.json>
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import postcss from "postcss";
import { parse as parseSfc } from "@vue/compiler-sfc";

const ROOT = process.argv[2];
const OUT = process.argv[3];

function walk(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const s = statSync(p);
        if (s.isDirectory()) walk(p, acc);
        else if (/\.(css|vue)$/.test(name)) acc.push(p);
    }
    return acc;
}

// ── collect declarations ──────────────────────────────────────────────────
const decls = []; // {file, line, prop, value, selector}
const registered = new Map(); // --name -> syntax
function selectorOf(node) {
    const parts = [];
    for (let n = node.parent; n && n.type !== "root"; n = n.parent) {
        if (n.type === "rule") parts.unshift(n.selector.replace(/\s+/g, " "));
        else if (n.type === "atrule") parts.unshift(`@${n.name} ${n.params}`.trim());
    }
    return parts.join(" › ");
}
function collect(css, file, lineOffset) {
    let root;
    try {
        root = postcss.parse(css);
    } catch (e) {
        console.error("parse fail", file, e.message);
        return;
    }
    root.walkAtRules("property", (r) => {
        let syntax = null;
        r.walkDecls("syntax", (d) => (syntax = d.value.replace(/["']/g, "")));
        registered.set(r.params.trim(), syntax);
    });
    root.walkDecls((d) => {
        decls.push({
            file,
            line: d.source.start.line + lineOffset,
            prop: d.prop,
            value: d.value.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\s+/g, " ").trim(),
            selector: selectorOf(d),
        });
    });
}
for (const f of walk(join(ROOT, "src"))) {
    const rel = relative(ROOT, f);
    const text = readFileSync(f, "utf8");
    if (f.endsWith(".css")) collect(text, rel, 0);
    else {
        const { descriptor } = parseSfc(text, { filename: f });
        for (const s of descriptor.styles) collect(s.content, rel, s.loc.start.line - 1);
    }
}
const defs = new Map();
for (const d of decls) if (d.prop.startsWith("--")) (defs.get(d.prop) ?? defs.set(d.prop, []).get(d.prop)).push(d);

// ── a small value parser: function tree with top-level comma splits ───────
function parseValue(s) {
    let i = 0;
    function parseSeq(stopAtParen) {
        const items = [];
        let text = "";
        while (i < s.length) {
            const c = s[i];
            if (c === ")") {
                if (stopAtParen) break;
                text += c;
                i++;
                continue;
            }
            const m = /^[-a-zA-Z_][-a-zA-Z0-9_]*\(/.exec(s.slice(i));
            if (m) {
                if (text) items.push({ t: "text", v: text }), (text = "");
                const name = m[0].slice(0, -1).toLowerCase();
                i += m[0].length;
                const args = parseSeq(true);
                i++; // ')'
                items.push({ t: "fn", name, args });
                continue;
            }
            text += c;
            i++;
        }
        if (text) items.push({ t: "text", v: text });
        return items;
    }
    return parseSeq(false);
}
function splitArgs(items) {
    const out = [[]];
    for (const it of items) {
        if (it.t === "text" && it.v.includes(",")) {
            const parts = it.v.split(",");
            parts.forEach((p, k) => {
                if (k > 0) out.push([]);
                if (p.trim()) out[out.length - 1].push({ t: "text", v: p });
            });
        } else out[out.length - 1].push(it);
    }
    return out;
}
function stringify(items) {
    return items.map((it) => (it.t === "text" ? it.v : `${it.name}(${stringify(it.args)})`)).join("");
}

// ── var() expansion over every declaration path ────────────────────────────
const CAP = Number(process.env.CAP ?? 400);
function expand(value, seen = []) {
    // returns [{text, chain}] — chain: the var decls taken
    const items = parseValue(value);
    let alts = [{ text: "", chain: [] }];
    function append(list) {
        const next = [];
        for (const a of alts) for (const b of list) if (next.length < CAP) next.push({ text: a.text + b.text, chain: [...a.chain, ...b.chain] });
        alts = next;
    }
    function expandItems(items) {
        let local = [{ text: "", chain: [] }];
        const push = (list) => {
            const next = [];
            for (const a of local) for (const b of list) if (next.length < CAP) next.push({ text: a.text + b.text, chain: [...a.chain, ...b.chain] });
            local = next;
        };
        for (const it of items) {
            if (it.t === "text") push([{ text: it.v, chain: [] }]);
            else if (it.name === "var") {
                const args = splitArgs(it.args);
                const name = stringify(args[0]).trim();
                const fallback = args.length > 1 ? stringify(it.args).slice(stringify(it.args).indexOf(",") + 1) : null;
                const syn = registered.get(name);
                const ds = defs.get(name) ?? [];
                const list = [];
                if (seen.includes(name)) list.push({ text: `⟲${name}`, chain: [] });
                else if (syn && syn !== "*") {
                    // a registered custom property substitutes its computed value
                    list.push({ text: `⟨registered ${syn} ${name}⟩`, chain: [{ name, registered: syn }] });
                } else {
                    for (const d of ds) for (const e of expand(d.value, [...seen, name])) list.push({ text: e.text, chain: [{ name, file: d.file, line: d.line, selector: d.selector }, ...e.chain] });
                    if (fallback && (ds.length === 0 || true)) for (const e of expand(fallback, [...seen, name])) list.push({ text: e.text, chain: [{ name, fallback: true }, ...e.chain] });
                    if (list.length === 0) list.push({ text: `⟨undefined ${name}⟩`, chain: [{ name, undefined: true }] });
                }
                push(list.slice(0, CAP));
            } else {
                const inner = expandItems(it.args);
                push(inner.map((e) => ({ text: `${it.name}(${e.text})`, chain: e.chain })));
            }
        }
        return local;
    }
    append(expandItems(items));
    return alts;
}

// ── classify arms ─────────────────────────────────────────────────────────
const COLOR_FNS = new Set(["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color"]);
function hasRelative(items) {
    for (const it of items) {
        if (it.t !== "fn") continue;
        if (COLOR_FNS.has(it.name) && /^\s*from\b/i.test(stringify(it.args))) return true;
        if (hasRelative(it.args)) return true;
    }
    return false;
}
function armKind(armItems) {
    // drop a trailing/leading percentage
    const fns = armItems.filter((x) => x.t === "fn");
    const txt = armItems.filter((x) => x.t === "text").map((x) => x.v).join(" ").trim();
    if (fns.length === 0) return { kind: txt.replace(/[\d.]+%/g, "").trim() || "?", text: txt };
    const f = fns[0];
    let kind = f.name;
    if (f.name === "color-mix") kind = "mix";
    else if (COLOR_FNS.has(f.name) && /^\s*from\b/i.test(stringify(f.args))) kind = "relative";
    else if (f.name === "light-dark") kind = "light-dark";
    else if (f.name === "calc") kind = "calc";
    return { kind, relInside: hasRelative([f]), text: stringify(armItems).trim() };
}
function findMixes(items, path = []) {
    const out = [];
    for (const it of items) {
        if (it.t !== "fn") continue;
        if (it.name === "color-mix") {
            const args = splitArgs(it.args);
            const arms = args.slice(1).map(armKind);
            out.push({ depth: path.length, arms, text: stringify([it]) });
        }
        out.push(...findMixes(it.args, [...path, it.name]));
    }
    return out;
}

// ── run over every declaration that holds color-mix() after expansion ─────
const sites = [];
for (const d of decls) {
    if (!/color-mix|var\(/.test(d.value)) continue;
    const alts = expand(d.value);
    const hits = [];
    for (const a of alts) {
        const mixes = findMixes(parseValue(a.text));
        for (const m of mixes) {
            const both = m.arms.length === 2 && m.arms.every((x) => x.kind === "mix");
            const relBoth = both && m.arms.some((x) => x.relInside);
            const mixRelArm = m.arms.some((x) => x.kind === "mix" && x.relInside);
            const mixArm = m.arms.some((x) => x.kind === "mix");
            if (both || mixRelArm || mixArm) hits.push({ both, relBoth, mixRelArm, mixArm, arms: m.arms.map((x) => x.kind + (x.relInside ? "+rel" : "")), chain: a.chain.filter((c) => c.file || c.registered).map((c) => (c.registered ? `${c.name} (registered ${c.registered})` : `${c.name} @ ${c.file}:${c.line}`)), expanded: a.text.length > 900 ? a.text.slice(0, 900) + "…" : a.text });
        }
    }
    if (hits.length) {
        // dedupe by chain
        const seen = new Set();
        const uniq = hits.filter((h) => {
            const k = h.chain.join("|") + h.arms.join(",");
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
        });
        sites.push({ file: d.file, line: d.line, selector: d.selector, prop: d.prop, value: d.value, custom: d.prop.startsWith("--"), hits: uniq });
    }
}
const summary = {
    tree: ROOT,
    files: new Set(decls.map((d) => d.file)).size,
    declarations: decls.length,
    colorMixDeclarations: decls.filter((d) => d.value.includes("color-mix")).length,
    registeredColor: [...registered].filter(([, s]) => s && s.includes("color")).map(([n, s]) => `${n} ${s}`),
    sites: sites.length,
};
writeFileSync(OUT, JSON.stringify({ summary, sites }, null, 1));
console.log(JSON.stringify(summary, null, 1));
for (const s of sites) {
    const cls = s.hits.some((h) => h.both) ? "BOTH-ARMS-MIX" : s.hits.some((h) => h.mixRelArm) ? "arm-mix+rel" : "arm-mix";
    s.cls = cls;
    console.log(`${cls.padEnd(13)} ${s.custom ? "token" : "rule "} ${s.file}:${s.line}  ${s.prop}  [${s.selector}]  paths=${s.hits.length}`);
}
writeFileSync(OUT, JSON.stringify({ summary, sites }, null, 1));
