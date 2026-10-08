#!/usr/bin/env node
// sfc-split.mjs --root <tree> --mode keep|value | --undo <saved.json>
// critique-B pass 6 · S-10 (P6-F1): an SFC style split chosen on the tree under judgement, NOT the route's Timeline split.
// Written and hashed BEFORE reading pass-6/B-kit or B-proto.md.
//   Candidate: the first (path order) src .vue with `<script setup lang="ts">`, exactly one plain `<style scoped>` block,
//   at least three root-level rules, and no file `<Name>Shade.vue` beside it. The LAST root-level rule leaves the parent
//   for a new child SFC `<Name>Shade.vue` (its own `<style scoped>`), which the parent imports and renders (v-if false),
//   so the child's CSS is in the build.
//   keep : the rule moves with its declarations byte-identical (expected: RED unlisted; GREEN once listed by `scopes`
//          `<Name> → <Name>Shade` plus the moved rules verify prints).
//   value: the same split with the first declaration's value changed (expected: RED content changed, even when listed).
// Writes <root>/.crit-sfc-undo.json (original bytes of every touched file) and prints `SPLIT <parent> -> <child>`.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
if (arg("--undo")) {
    const s = JSON.parse(readFileSync(arg("--undo"), "utf8"));
    for (const [f, t] of Object.entries(s.files)) { if (t === null) rmSync(join(root, f), { force: true }); else writeFileSync(join(root, f), t); }
    console.log(`UNDO ${Object.keys(s.files).join(", ")}`); process.exit(0);
}
const mode = arg("--mode");
if (!["keep", "value"].includes(mode)) { console.error("usage: --mode keep|value | --undo f"); process.exit(9); }
const postcss = createRequire(join(root, "package.json"))("postcss");
const vues = [];
(function walk(d) { for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
    if (["node_modules", "__tests__"].includes(e.name) || e.isSymbolicLink()) continue;
    const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else if (p.endsWith(".vue")) vues.push(p);
} })("src");
vues.sort();
const STYLE = /<style\s+scoped\s*>([\s\S]*?)<\/style>/g;
let pick = null;
for (const f of vues) {
    const t = readFileSync(join(root, f), "utf8");
    if (!/<script\s+setup\s+lang="ts"\s*>/.test(t)) continue;
    const styles = [...t.matchAll(/<style\b[^>]*>/g)];
    const scoped = [...t.matchAll(STYLE)];
    if (styles.length !== 1 || scoped.length !== 1) continue;
    let css; try { css = postcss.parse(scoped[0][1]); } catch { continue; }
    // amendment 1: the tree's scoped styles wrap their rules in `@layer x { … }`; a rule is a root rule or a direct
    // child of a root @layer block, and the moved rule keeps its layer in the child
    const isRule = (n) => n.type === "rule" && n.nodes?.some((d) => d.type === "decl");
    const rules = [...css.nodes.filter(isRule), ...css.nodes.filter((n) => n.type === "atrule" && n.name === "layer" && n.nodes).flatMap((l) => l.nodes.filter(isRule))];
    const name = basename(f, ".vue");
    if (rules.length < 3 || existsSync(join(root, dirname(f), `${name}Shade.vue`))) continue;
    pick = { f, t, css, rule: rules.at(-1), name, block: scoped[0] };
    break;
}
if (!pick) { console.log("NO-CANDIDATE"); process.exit(2); }
const { f, t, css, rule, name, block } = pick;
const child = `${dirname(f)}/${name}Shade.vue`;
const moved = rule.clone();
if (mode === "value") {
    const d = moved.nodes.find((x) => x.type === "decl");
    const before = d.value;
    d.value = before === "inherit" ? "initial" : "inherit";
    console.log(`VALUE ${d.prop}: ${before} -> ${d.value}`);
}
const layer = rule.parent?.type === "atrule" && rule.parent.name === "layer" ? rule.parent.params : null;
const body = layer ? `@layer ${layer} {\n${moved.toString()}\n}` : moved.toString();
const childText = `<script setup lang="ts"></script>\n\n<template>\n    <span class="zq-shade" />\n</template>\n\n<style scoped>\n${body}\n</style>\n`;
rule.remove();
let parent = t.replace(block[0], `<style scoped>${css.toString()}</style>`);
parent = parent.replace(/<script\s+setup\s+lang="ts"\s*>\n?/, (m) => `${m}import ${name}Shade from "./${name}Shade.vue";\n`);
// render the child inside the template's first element so the parent's root count is unchanged
const ti = parent.indexOf("<template>");
const firstClose = parent.indexOf(">", parent.indexOf("<", ti + "<template>".length) + 1);
// amendment 2: v-if="false" let the bundler fold the branch away and drop the child's CSS; v-show keeps it built
parent = `${parent.slice(0, firstClose + 1)}\n        <${name}Shade v-show="false" />${parent.slice(firstClose + 1)}`;
writeFileSync(join(root, ".crit-sfc-undo.json"), JSON.stringify({ files: { [f]: t, [child]: null } }));
writeFileSync(join(root, f), parent);
writeFileSync(join(root, child), childText);
console.log(`SPLIT ${f} -> ${child} (${mode}) rule: ${moved.selector}`);
console.log(`SCOPES ${JSON.stringify({ scopes: [{ from: name, to: `${name}Shade`, reason: "critic plant: one scoped rule re-homed into a child SFC" }] })}`);
