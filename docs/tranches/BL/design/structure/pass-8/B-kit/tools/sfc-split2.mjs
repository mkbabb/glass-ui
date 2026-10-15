#!/usr/bin/env node
// sfc-split2.mjs --root <linked worktree> --mode keep|value | --undo <saved.json>
// PLANT (pass 7, FP6-4): an SFC style split into TWO children, the case P6-F1 admits and no seat
// had planted. Modelled on the pass-6 critic's sfc-split.mjs (one child), on the same candidate:
// the first (path order) src .vue with `<script setup lang="ts">`, exactly one plain
// `<style scoped>` block and at least four rules (root, or direct children of a root @layer).
// Its LAST TWO rules leave the parent, one each, for `<Name>ShadeA.vue` and `<Name>ShadeB.vue`
// (each its own `<style scoped>`, keeping the rule's layer), which the parent imports and renders
// (`v-show="false"`, so both children's CSS is built).
//   keep : both rules move with their declarations byte-identical
//   value: the same split with ShadeB's first declaration value changed
// Writes <root>/.p7-sfc-undo.json (the original bytes of every touched file) and prints
// `SPLIT …` and `SCOPES <json>` (both scopes) and `SCOPES-A <json>` (ShadeA's only).
// Refuses the main checkout.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("sfc-split2.mjs refuses the main checkout"); process.exit(2); }
if (arg("--undo")) {
    const s = JSON.parse(readFileSync(arg("--undo"), "utf8"));
    for (const [f, t] of Object.entries(s.files)) { if (t === null) rmSync(join(root, f)); else writeFileSync(join(root, f), t); }
    console.log(`UNDO ${Object.keys(s.files).join(", ")}`);
    process.exit(0);
}
const mode = arg("--mode");
if (!["keep", "value"].includes(mode)) { console.error("usage: --mode keep|value | --undo f"); process.exit(2); }
const postcss = createRequire(join(root, "package.json"))("postcss");
const vues = [];
(function walk(d) {
    for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
        if (["node_modules", "__tests__"].includes(e.name) || e.isSymbolicLink()) continue;
        const p = `${d}/${e.name}`;
        if (e.isDirectory()) walk(p); else if (p.endsWith(".vue")) vues.push(p);
    }
})("src");
vues.sort();
const STYLE = /<style\s+scoped\s*>([\s\S]*?)<\/style>/g;
const isRule = (n) => n.type === "rule" && n.nodes?.some((d) => d.type === "decl");
let pick = null;
for (const f of vues) {
    const t = readFileSync(join(root, f), "utf8");
    if (!/<script\s+setup\s+lang="ts"\s*>/.test(t)) continue;
    const styles = [...t.matchAll(/<style\b[^>]*>/g)];
    const scoped = [...t.matchAll(STYLE)];
    if (styles.length !== 1 || scoped.length !== 1) continue;
    const css = postcss.parse(scoped[0][1]);
    const rules = [...css.nodes.filter(isRule), ...css.nodes.filter((n) => n.type === "atrule" && n.name === "layer" && n.nodes).flatMap((l) => l.nodes.filter(isRule))];
    const name = basename(f, ".vue");
    if (rules.length < 4 || existsSync(join(root, dirname(f), `${name}ShadeA.vue`))) continue;
    pick = { f, t, css, rules: rules.slice(-2), name, block: scoped[0] };
    break;
}
if (!pick) { console.log("NO-CANDIDATE"); process.exit(2); }
const { f, t, css, rules, name, block } = pick;
const children = [`${name}ShadeA`, `${name}ShadeB`];
const texts = rules.map((rule, i) => {
    const moved = rule.clone();
    if (mode === "value" && i === 1) {
        const d = moved.nodes.find((x) => x.type === "decl");
        const before = d.value;
        d.value = before === "inherit" ? "initial" : "inherit";
        console.log(`VALUE ${children[i]} ${d.prop}: ${before} -> ${d.value}`);
    }
    const layer = rule.parent?.type === "atrule" && rule.parent.name === "layer" ? rule.parent.params : null;
    const body = layer ? `@layer ${layer} {\n${moved.toString()}\n}` : moved.toString();
    return `<script setup lang="ts"></script>\n\n<template>\n    <span class="zq-shade" />\n</template>\n\n<style scoped>\n${body}\n</style>\n`;
});
const selectors = rules.map((r) => r.selector);
for (const r of rules) r.remove();
let parent = t.replace(block[0], `<style scoped>${css.toString()}</style>`);
parent = parent.replace(/<script\s+setup\s+lang="ts"\s*>\n?/, (m) => `${m}${children.map((c) => `import ${c} from "./${c}.vue";\n`).join("")}`);
const ti = parent.indexOf("<template>");
const firstClose = parent.indexOf(">", parent.indexOf("<", ti + "<template>".length) + 1);
parent = `${parent.slice(0, firstClose + 1)}\n${children.map((c) => `        <${c} v-show="false" />`).join("\n")}${parent.slice(firstClose + 1)}`;
const undo = { files: { [f]: t } };
for (const c of children) undo.files[`${dirname(f)}/${c}.vue`] = null;
writeFileSync(join(root, ".p7-sfc-undo.json"), JSON.stringify(undo));
writeFileSync(join(root, f), parent);
children.forEach((c, i) => writeFileSync(join(root, `${dirname(f)}/${c}.vue`), texts[i]));
const scope = (c, i) => ({ from: name, to: c, reason: `pass-7 plant (FP6-4): the rule ${selectors[i]} re-homed into one of two child SFCs` });
console.log(`SPLIT ${f} -> ${children.join(" + ")} (${mode}) rules: ${selectors.join(" | ")}`);
console.log(`SCOPES ${JSON.stringify({ scopes: children.map(scope) })}`);
console.log(`SCOPES-A ${JSON.stringify({ scopes: [scope(children[0], 0)] })}`);
