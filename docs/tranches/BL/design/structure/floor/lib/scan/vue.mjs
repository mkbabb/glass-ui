// scan/vue.mjs — references in a Vue SFC: block src, every <script> through the script
// scanner, every <style> through the CSS scanner, template asset src/href and url().
import { scanCss } from "./css.mjs";
import { scanScript } from "./script.mjs";

export function scanVue(ts, postcss, sfc, file, code, ctx) {
    const refs = [];
    const exp = { own: new Set(["default"]), local: [], importBindings: new Map() };
    const { descriptor, errors } = sfc.parse(code, { filename: file, ignoreEmpty: false });
    if (errors?.length) refs.push({ kind: "sfc-parse-error", mode: "error", spec: String(errors[0].message ?? errors[0]).slice(0, 120), start: 0, end: 0 });
    for (const m of code.matchAll(/<(style|script|template)\b[^>]*?\bsrc\s*=\s*(["'])([^"']+)\2/g)) {
        const v = m[3];
        const start = m.index + m[0].lastIndexOf(v);
        refs.push({ kind: `sfc-${m[1]}-src`, mode: "module", spec: v, start, end: start + v.length, spans: [{ start, end: start + v.length, value: v }] });
    }
    for (const block of [descriptor.script, descriptor.scriptSetup]) {
        if (!block || block.src) continue;
        const r = scanScript(ts, `${file}.${block.lang === "ts" ? "ts" : "js"}`, block.content, block.loc.start.offset, { ...ctx, abs: () => ctx.abs(file) });
        for (const ref of r.refs) refs.push(ref);
        for (const [k, v] of r.exp.importBindings) exp.importBindings.set(k, { ...v, ref: v.ref + refs.length - r.refs.length });
        for (const n of r.exp.own) if (block === descriptor.script) exp.own.add(n);
    }
    for (const style of descriptor.styles) {
        if (style.src) continue;
        for (const ref of scanCss(postcss, file, style.content, style.loc.start.offset, { inline: true }).refs) refs.push(ref);
    }
    const tpl = descriptor.template;
    if (tpl && !tpl.src) {
        const base = tpl.loc.start.offset;
        for (const m of tpl.content.matchAll(/\s(?:src|href)\s*=\s*(["'])(\.{1,2}\/[^"']+|\/(?:src|demo)\/[^"']+)\1/g)) {
            const start = base + m.index + m[0].lastIndexOf(m[2]);
            refs.push({ kind: "template-asset", mode: "module", spec: m[2], start, end: start + m[2].length, spans: [{ start, end: start + m[2].length, value: m[2] }] });
        }
        for (const m of tpl.content.matchAll(/url\(\s*(['"]?)(\.{1,2}\/[^'")\s]+)\1\s*\)/g)) {
            const start = base + m.index + m[0].indexOf(m[2]);
            refs.push({ kind: "template-asset", mode: "module", spec: m[2], start, end: start + m[2].length, spans: [{ start, end: start + m[2].length, value: m[2] }] });
        }
    }
    return { refs, exp };
}
