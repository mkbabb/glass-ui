// names.mjs <ref> [<ref> ...] [--json]: MEASURE-7, RU-63's public-name table by SURFACE.md's one method, read from a git
// ref of this worktree (git show, no checkout): components, functions and keys, props, slots, emits, exposed members
// and documented attributes. Types are counted on neither side. Per ref:
//   components   `export { default as X }` in src/components/dock/index.ts and trigger.ts
//   functions    every other value export of those two files (an `export { a, type B }` list, `type` members out)
//   props        each exported SFC's defineProps keys (the type literal, or the named interface it reads, with
//                `& { ... }` intersections), plus defineModel names (a v-model counts once, as SURFACE's `v-model:active`)
//   slots        each exported SFC's `<slot>` (default) and `<slot name="x">`, unique per component. Every default slot is
//                counted, on every side: SURFACE.md's table counted GlassDock's and DockTrigger's slots only, so by this one
//                method v11.0.2 reads four more (DockLayerGroup, DockLayer, DockCrossfade and DockControl's default slots)
//   emits        each exported SFC's defineEmits keys, less a model's own update event
//   exposed      each exported SFC's defineExpose keys
//   attributes   SURFACE.md's eleven root and control attributes, each kept while the ref's src still names it,
//                plus every site-facing input attribute the ref's source reads that v11.0.2's does not
//                (`[data-dock-glyph]` in a selector, `closest("[data-dock-scope]")`)
// DockControl's `class` (SURFACE: "pass-through") is counted as SURFACE counted it (8 props at v11.0.2).
import { execFileSync } from "node:child_process";
const W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8";
const D = "src/components/dock/";
const show = (ref, p) => { try { return execFileSync("git", ["-C", W, "show", `${ref}:${p}`], { encoding: "utf8", maxBuffer: 1 << 26, stdio: ["ignore", "pipe", "ignore"] }); } catch { return null; } };
const grepL = (ref, pat, dir = "src/components/dock") => { try { return execFileSync("git", ["-C", W, "grep", "-l", "-E", pat, ref, "--", dir], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split("\n").filter(Boolean); } catch { return []; } };
const SURFACE_ATTRS = ["data-morphing", "data-preset", "data-active", "data-glass-dock-seat", "data-anchor", "data-backdrop-mode", "data-held", "data-crossfading", "data-glass-dock-face", "data-glass-dock-owner", "data-glass-dock-portal"];
const INPUTS = [["data-dock-glyph", "\\[data-dock-glyph\\]"], ["data-dock-scope", "\\[data-dock-scope\\]"]];
function block(src, open, at) {
    // the balanced {...} or <...> starting at index `at` (src[at] === open)
    const close = open === "{" ? "}" : ">";
    let d = 0;
    for (let i = at; i < src.length; i++) {
        const c = src[i];
        if (c === open) d++;
        else if (c === close) { d--; if (d === 0) return src.slice(at + 1, i); }
    }
    return "";
}
function topKeys(body) {
    // keys at depth 0 of an object literal or type literal body
    const out = [];
    let d = 0, tok = "";
    for (let i = 0; i < body.length; i++) {
        const c = body[i];
        if ("{([<".includes(c)) d++;
        else if ("})]>".includes(c)) d--;
        if (d === 0 && (c === "," || c === ";" || c === "\n")) {
            const m = /^\s*(?:readonly\s+)?(?:["']([A-Za-z_$][\w$:-]*)["']|([A-Za-z_$][\w$]*))/.exec(tok);
            if (m && !/^\s*(\/\/|\*)/.test(tok)) out.push(m[1] ?? m[2]);
            tok = "";
        } else tok += c;
    }
    const m = /^\s*(?:readonly\s+)?(?:["']([A-Za-z_$][\w$:-]*)["']|([A-Za-z_$][\w$]*))/.exec(tok);
    if (m && tok.trim()) out.push(m[1] ?? m[2]);
    return [...new Set(out.filter((k) => !/^(get|set)$/.test(k)))];
}
function stripComments(s) { return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1"); }
function interfaceKeys(ref, src, name, file) {
    // `export interface Name { ... }` or `type Name = { ... }` in src or in the file it imports Name from
    const re = new RegExp(`(?:interface\\s+${name}\\b[^{]*|type\\s+${name}\\s*=\\s*)\\{`);
    let m = re.exec(src);
    if (m) return topKeys(stripComments(block(src, "{", m.index + m[0].length - 1)));
    const imp = new RegExp(`import\\s+(?:type\\s+)?\\{[^}]*\\b${name}\\b[^}]*\\}\\s+from\\s+["']([^"']+)["']`).exec(src);
    if (!imp) return null;
    const base = file.split("/").slice(0, -1).join("/");
    let p = imp[1].startsWith(".") ? new URL(imp[1], `file:///${base}/`).pathname.slice(1) : null;
    if (!p) return null;
    for (const cand of [p, p + ".ts", p + "/index.ts"]) { const s = show(ref, cand); if (s) return interfaceKeys(ref, s, name, cand); }
    return null;
}
function sfc(ref, file) {
    const src = show(ref, file);
    if (!src) return null;
    const script = (/<script setup[^>]*>([\s\S]*?)<\/script>/.exec(src) || [, ""])[1];
    const tpl = (/<template>([\s\S]*)<\/template>/.exec(src) || [, ""])[1];
    const s = stripComments(script);
    const props = [];
    const dp = /defineProps\s*</.exec(s);
    if (dp) {
        const typ = block(s, "<", dp.index + dp[0].length - 1);
        for (const part of typ.split(/&(?![^{]*\})/)) {
            const t = part.trim();
            if (t.startsWith("{")) props.push(...topKeys(block(t, "{", 0)));
            else if (/^[A-Z]\w*$/.test(t)) props.push(...(interfaceKeys(ref, script, t, file) ?? [`?${t}`]));
        }
    } else {
        const dr = /defineProps\s*\(\s*\{/.exec(s);
        if (dr) props.push(...topKeys(block(s, "{", dr.index + dr[0].length - 1)));
    }
    const models = [...s.matchAll(/defineModel\s*(?:<[^>]*>)?\s*\(\s*["']([\w-]+)["']/g)].map((m) => m[1]);
    if (/defineModel\s*(?:<[^>]*>)?\s*\(\s*(?:\{|\))/.test(s)) models.push("modelValue");
    const emits = [];
    const de = /defineEmits\s*</.exec(s);
    if (de) emits.push(...topKeys(block(s, "<", de.index + de[0].length - 1).replace(/^\s*\{|\}\s*$/g, "")));
    const da = /defineEmits\s*\(\s*\[([^\]]*)\]/.exec(s);
    if (da) emits.push(...[...da[1].matchAll(/["']([\w:-]+)["']/g)].map((m) => m[1]));
    const exposed = [];
    const dx = /defineExpose\s*\(\s*\{/.exec(s);
    if (dx) exposed.push(...topKeys(block(s, "{", dx.index + dx[0].length - 1)));
    const slots = new Set();
    for (const m of tpl.matchAll(/<slot\b([^>]*)>/g)) { const n = /\bname="([\w-]+)"/.exec(m[1]); slots.add(n ? n[1] : "default"); }
    return {
        props: [...new Set([...props, ...models])],
        emits: [...new Set(emits)].filter((e) => !models.some((mm) => e === `update:${mm}`)),
        exposed: [...new Set(exposed)],
        slots: [...slots],
    };
}
function exportsOf(src) {
    const comps = [], fns = [];
    const s = stripComments(src);
    for (const m of s.matchAll(/export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*["'][^"']+\.vue["']/g)) comps.push(m[1]);
    for (const m of s.matchAll(/export\s*\{([^}]*)\}\s*from/g)) {
        if (/default\s+as/.test(m[1])) continue;
        for (const part of m[1].split(",")) { const t = part.trim(); if (!t || t.startsWith("type ")) continue; fns.push(t.split(/\s+as\s+/).pop()); }
    }
    for (const m of s.matchAll(/export\s+(?:function|const)\s+(\w+)/g)) fns.push(m[1]);
    return { comps, fns };
}
function table(ref) {
    const idx = show(ref, D + "index.ts") ?? "";
    const trg = show(ref, D + "trigger.ts") ?? "";
    const e1 = exportsOf(idx), e2 = exportsOf(trg);
    const comps = [...e1.comps, ...e2.comps];
    const fns = [...new Set([...e1.fns, ...e2.fns])];
    const per = {};
    for (const c of comps) per[c] = sfc(ref, `${D}${c}.vue`);
    const attrs = SURFACE_ATTRS.filter((a) => grepL(ref, a, "src").length > 0);
    for (const [a, pat] of INPUTS) if (grepL(ref, pat).length) attrs.push(a);
    const rows = [];
    for (const c of comps) rows.push(["component", c]);
    for (const f of fns) rows.push(["function", f]);
    for (const c of comps) {
        const x = per[c];
        if (!x) continue;
        for (const p of x.props) rows.push(["prop", `${c}.${p}`]);
        for (const p of x.slots) rows.push(["slot", `${c}#${p}`]);
        for (const p of x.emits) rows.push(["emit", `${c}@${p}`]);
        for (const p of x.exposed) rows.push(["exposed", `${c}.${p}()`]);
    }
    for (const a of attrs) rows.push(["attribute", a]);
    return rows;
}
const a = process.argv.slice(2);
const json = a.includes("--json");
const refs = a.filter((x) => x !== "--json");
const tabs = refs.map((r) => [r, table(r)]);
if (json) { console.log(JSON.stringify(Object.fromEntries(tabs.map(([r, t]) => [r, t.map(([k, n]) => `${k} ${n}`)])), null, 1)); process.exit(0); }
for (const [r, t] of tabs) {
    const by = {};
    for (const [k] of t) by[k] = (by[k] || 0) + 1;
    console.log(`${r}: ${t.length} names  ${JSON.stringify(by)}`);
}
if (tabs.length > 1) {
    const [r0, t0] = tabs[0];
    const s0 = new Set(t0.map(([k, n]) => `${k} ${n}`));
    for (const [r, t] of tabs.slice(1)) {
        const s = new Set(t.map(([k, n]) => `${k} ${n}`));
        const add = [...s].filter((x) => !s0.has(x)), rem = [...s0].filter((x) => !s.has(x));
        console.log(`\n${r} against ${r0}: +${add.length} -${rem.length} net ${add.length - rem.length >= 0 ? "+" : ""}${add.length - rem.length}`);
        for (const x of add) console.log(`  + ${x}`);
        for (const x of rem) console.log(`  - ${x}`);
    }
}
