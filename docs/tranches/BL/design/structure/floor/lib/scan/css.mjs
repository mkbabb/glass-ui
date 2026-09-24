// scan/css.mjs — references in CSS (postcss): @import (with Tailwind's source()),
// @reference, @plugin, @config, @source (a negated one included), url().

export function scanCss(postcss, file, code, offset, { inline = false } = {}) {
    const refs = [];
    let rootNode;
    try { rootNode = postcss.parse(code, { from: file }); } catch (e) { return { refs: [{ kind: "css-parse-error", mode: "error", spec: String(e.message).slice(0, 120), start: offset, end: offset }] }; }
    const quoted = (text, base) => {
        const out = [];
        for (const m of text.matchAll(/url\(\s*(["']?)([^"')\s]+)\1\s*\)|(["'])((?:(?!\3).)*)\3/g)) {
            const value = m[2] ?? m[4];
            const q = m[1] !== undefined ? m[1] : m[3];
            const idx = m.index + m[0].indexOf(value, m[2] !== undefined ? 4 : 1);
            out.push({ value, start: base + idx, end: base + idx + value.length, isUrl: m[2] !== undefined, q });
        }
        return out;
    };
    const tag = inline ? "sfc-inline-" : "";
    rootNode.walk((n) => {
        if (n.type === "atrule") {
            const start = offset + n.source.start.offset;
            const raw = code.slice(n.source.start.offset, n.source.end.offset + 1);
            const pstart = start + raw.indexOf(n.params, n.name.length + 1);
            const qs = quoted(n.params, pstart);
            const name = n.name;
            if (name === "import" && qs[0]) {
                refs.push({ kind: `${tag}css-import`, mode: "module", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]], cssImport: true });
                // Tailwind's `@import "tailwindcss" source("../demo")` names a scan root
                const src = /\bsource\(\s*(["'])([^"']+)\1\s*\)/.exec(n.params);
                const q = src && qs.find((x) => x.value === src[2] && x !== qs[0]);
                if (q) refs.push({ kind: `${tag}css-source`, mode: "glob", spec: q.value, start: q.start, end: q.end, spans: [q], cssSource: true });
            }
            else if (name === "reference" && qs[0]) refs.push({ kind: `${tag}css-reference`, mode: "module", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]] });
            else if ((name === "plugin" || name === "config") && qs[0]) refs.push({ kind: `${tag}css-${name}`, mode: "module", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]] });
            else if (name === "source" && !/^\s*inline\(/.test(n.params.replace(/^not\s+/, "")) && qs[0]) refs.push({ kind: `${tag}css-source`, mode: "glob", spec: qs[0].value, start: qs[0].start, end: qs[0].end, spans: [qs[0]], negated: /^\s*not\b/.test(n.params), cssSource: true });
            else if (name !== "import") for (const q of qs.filter((x) => x.isUrl)) urlRef(q);
        } else if (n.type === "decl" && /url\(/.test(n.value)) {
            const raw = code.slice(n.source.start.offset, n.source.end.offset + 1);
            const vstart = offset + n.source.start.offset + raw.indexOf(n.value, n.prop.length);
            for (const q of quoted(n.value, vstart).filter((x) => x.isUrl)) urlRef(q);
        }
    });
    function urlRef(q) {
        if (/^(data:|https?:|#|\/\/|var\()/.test(q.value) || q.value.startsWith("%23")) return;
        refs.push({ kind: `${tag}css-url`, mode: "module", spec: q.value, start: q.start, end: q.end, spans: [q] });
    }
    return { refs };
}
