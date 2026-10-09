#!/usr/bin/env node
// sfc-split2.mjs --root <tree> --mode keep|value | --undo <saved.json> · critique-B pass 7 · FP6-4: an SFC style split
// into TWO children. Written and hashed BEFORE reading pass-7/B-kit. Extends pass-6/critique-B/battery/sfc-split.mjs
// (its two amendments included: a rule is a root rule or a direct child of a root @layer and keeps its layer; the child
// renders with v-show so its CSS is built).
//   Candidate: the first (path order) src .vue with <script setup lang="ts">, exactly one plain <style scoped>, at least
//   FOUR rules, no <Name>Shade.vue / <Name>Rim.vue beside it, and not the component pass 6's critic split (Aurora.vue),
//   so the plant is new. The LAST rule moves to <Name>Shade.vue, the second-to-last to <Name>Rim.vue.
//   keep : both rules move byte-identical. Expected: RED with no listing; RED with both scopes but no rules; GREEN with
//          both scopes plus the transcribed rules; RED when the listing names only one scope.
//   value: the same split with the Rim child's first value changed. Expected: RED content changed under the keep listing.
// Writes <root>/.crit-sfc2-undo.json; prints SPLIT2, SCOPES (both), SCOPES-ONE (Shade only).
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
    if (basename(f) === "Aurora.vue") continue;
    const t = readFileSync(join(root, f), "utf8");
    if (!/<script\s+setup\s+lang="ts"\s*>/.test(t)) continue;
    const styles = [...t.matchAll(/<style\b[^>]*>/g)];
    const scoped = [...t.matchAll(STYLE)];
    if (styles.length !== 1 || scoped.length !== 1) continue;
    let css; try { css = postcss.parse(scoped[0][1]); } catch { continue; }
    const isRule = (n) => n.type === "rule" && n.nodes?.some((d) => d.type === "decl");
    const rules = [...css.nodes.filter(isRule), ...css.nodes.filter((n) => n.type === "atrule" && n.name === "layer" && n.nodes).flatMap((l) => l.nodes.filter(isRule))];
    const name = basename(f, ".vue");
    if (rules.length < 4 || existsSync(join(root, dirname(f), `${name}Shade.vue`)) || existsSync(join(root, dirname(f), `${name}Rim.vue`))) continue;
    pick = { f, t, css, r1: rules.at(-1), r2: rules.at(-2), name, block: scoped[0] };
    break;
}
if (!pick) { console.log("NO-CANDIDATE"); process.exit(2); }
const { f, t, css, r1, r2, name, block } = pick;
const kids = [[`${name}Shade`, r1], [`${name}Rim`, r2]];
const bodies = kids.map(([kid, rule], i) => {
    const moved = rule.clone();
    if (mode === "value" && i === 1) {
        const d = moved.nodes.find((x) => x.type === "decl");
        const before = d.value; d.value = before === "inherit" ? "initial" : "inherit";
        console.log(`VALUE ${kid} ${d.prop}: ${before} -> ${d.value}`);
    }
    const layer = rule.parent?.type === "atrule" && rule.parent.name === "layer" ? rule.parent.params : null;
    return [kid, moved.selector, layer ? `@layer ${layer} {\n${moved.toString()}\n}` : moved.toString()];
});
r1.remove(); r2.remove();
let parent = t.replace(block[0], `<style scoped>${css.toString()}</style>`);
parent = parent.replace(/<script\s+setup\s+lang="ts"\s*>\n?/, (m) => `${m}${kids.map(([k]) => `import ${k} from "./${k}.vue";\n`).join("")}`);
const ti = parent.indexOf("<template>");
const firstClose = parent.indexOf(">", parent.indexOf("<", ti + "<template>".length) + 1);
parent = `${parent.slice(0, firstClose + 1)}\n${kids.map(([k]) => `        <${k} v-show="false" />`).join("\n")}${parent.slice(firstClose + 1)}`;
const undo = { [f]: t };
for (const [kid, , body] of bodies) undo[`${dirname(f)}/${kid}.vue`] = null;
writeFileSync(join(root, ".crit-sfc2-undo.json"), JSON.stringify({ files: undo }));
writeFileSync(join(root, f), parent);
for (const [kid, , body] of bodies) writeFileSync(join(root, dirname(f), `${kid}.vue`), `<script setup lang="ts"></script>\n\n<template>\n    <span class="zq-${kid.toLowerCase()}" />\n</template>\n\n<style scoped>\n${body}\n</style>\n`);
console.log(`SPLIT2 ${f} -> ${bodies.map(([k, s]) => `${k}.vue (${s})`).join(", ")} (${mode})`);
const sc = bodies.map(([k]) => ({ from: name, to: k, reason: "critic plant: a scoped rule re-homed into one of two child SFCs" }));
console.log(`SCOPES ${JSON.stringify({ scopes: sc })}`);
console.log(`SCOPES-ONE ${JSON.stringify({ scopes: sc.slice(0, 1) })}`);
