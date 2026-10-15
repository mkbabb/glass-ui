// split.mjs — AUTHOR-SIDE (pass 6, P5-R3): cut a test file into parts by what each test reads.
// A part is assembled from the original text, byte for byte, plus the literal text the part
// names (its imports, which differ by where the part lives) and its own named edits:
//   header     literal text the part starts with (imports, a comment saying where it came from);
//   copy       in order: spans of the original, each [startAnchor, endAnchor) (an anchor occurs
//              once, and a span starts at its anchor's line; a null end runs to the first
//              top-level describe), or a literal string (the part's own imports and notes);
//   edits      [{ from, to, all? }] applied to the assembled part, each `from` once (or, with
//              `all`, at least once): a fixture re-stated where the cut moves its source away;
//   describes  { "<describe title prefix>": "all" | { only: [it title prefixes] } | { except: [...] } }:
//              a top-level describe kept whole, or kept with only (or without) some of its
//              children: its `it`s and its nested `describe`s, each selected by title prefix.
//              A describe's hooks and helpers stay with it. Every prefix must match exactly one.
// Every top-level `describe` of the source must land in at least one part, every child of it
// in exactly one part, and every other top-level statement after the first describe (a
// helper) in some part's copy span, or the cut stops: no test or helper is dropped, and no
// test runs twice.
export function splitTests(ts, file, text, parts) {
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const titleOf = (call) => { const a = call.arguments[0]; return a && (ts.isStringLiteralLike(a) || ts.isTemplateExpression(a)) ? a.getText(sf).slice(1, -1) : null; };
    const callOf = (st, names) => { if (!ts.isExpressionStatement(st)) return null; const x = st.expression; if (!ts.isCallExpression(x)) return null; let c = x.expression; if (ts.isPropertyAccessExpression(c)) c = c.expression; return ts.isIdentifier(c) && names.includes(c.text) ? x : null; };
    const describes = sf.statements.map((st) => ({ st, call: callOf(st, ["describe"]) })).filter((d) => d.call).map(({ st, call }) => {
        const fn = call.arguments[1];
        const body = fn && (ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) && ts.isBlock(fn.body) ? fn.body : null;
        const its = body ? body.statements.map((s) => ({ s, c: callOf(s, ["it", "test", "describe"]) })).filter((x) => x.c).map(({ s, c }) => ({ title: titleOf(c), start: s.getFullStart(), end: s.getEnd() })) : [];
        return { title: titleOf(call), start: st.getFullStart(), end: st.getEnd(), its };
    });
    const firstDescribe = describes.length ? describes[0].start : text.length;
    // a top-level statement after the first describe that is not one (a helper the later
    // describes read) must land in some part through a copy span, or the cut stops
    const loose = sf.statements.filter((st) => st.getStart(sf) >= firstDescribe && !callOf(st, ["describe"])).map((st) => ({ at: st.getStart(sf), what: st.getText(sf).split("\n")[0].slice(0, 70) }));
    const copied = [];
    const once = (s, what) => { const i = text.indexOf(s); if (i < 0 || text.indexOf(s, i + 1) >= 0) throw new Error(`${file}: ${what} ${JSON.stringify(s.slice(0, 60))} does not occur exactly once`); return i; };
    const lineStart = (i) => text.lastIndexOf("\n", i - 1) + 1;
    const usedD = new Map(), usedIt = new Map();
    const out = [];
    for (const p of parts) {
        let body = p.header ?? "";
        for (const c of p.copy ?? []) {
            if (typeof c === "string") { body += c; continue; }
            const [a, b] = c;
            const s = lineStart(once(a, "copy start"));
            const e = b === null ? firstDescribe : lineStart(once(b, "copy end"));
            if (e <= s) throw new Error(`${file}: copy span ends before it starts`);
            copied.push([s, e]);
            body += text.slice(s, e);
        }
        for (const [prefix, sel] of Object.entries(p.describes ?? {})) {
            const hits = describes.filter((d) => d.title?.startsWith(prefix));
            if (hits.length !== 1) throw new Error(`${file}: describe prefix ${JSON.stringify(prefix)} matches ${hits.length}`);
            const d = hits[0];
            let slice;
            if (sel === "all") { slice = text.slice(d.start, d.end); for (const it of d.its) usedIt.set(`${d.title}|${it.title}`, (usedIt.get(`${d.title}|${it.title}`) ?? 0) + 1); }
            else {
                const pick = (it) => (sel.only ? sel.only.some((x) => it.title?.startsWith(x)) : !sel.except.some((x) => it.title?.startsWith(x)));
                for (const x of sel.only ?? sel.except) if (!d.its.some((it) => it.title?.startsWith(x))) throw new Error(`${file}: no it ${JSON.stringify(x)} in ${d.title}`);
                slice = "";
                let at = d.start;
                for (const it of d.its) {
                    if (!pick(it)) { slice += text.slice(at, it.start); at = it.end; }
                    else usedIt.set(`${d.title}|${it.title}`, (usedIt.get(`${d.title}|${it.title}`) ?? 0) + 1);
                }
                slice += text.slice(at, d.end);
            }
            usedD.set(d.title, (usedD.get(d.title) ?? 0) + 1);
            body += slice;
        }
        let partText = `${body.replace(/\n+$/, "")}\n`;
        // the part's own edits after the cut, each `from` exactly once (a fixture re-stated)
        for (const { from, to, all } of p.edits ?? []) {
            const n = partText.split(from).length - 1;
            if (all ? n < 1 : n !== 1) throw new Error(`${file} -> ${p.to}: edit ${JSON.stringify(from.slice(0, 60))} matches ${n}`);
            partText = all ? partText.split(from).join(to) : partText.replace(from, () => to);
        }
        out.push({ to: p.to, text: partText });
    }
    for (const l of loose) if (!copied.some(([s, e]) => l.at >= s && l.at < e)) throw new Error(`${file}: the top-level ${JSON.stringify(l.what)} after the first describe lands in no part`);
    for (const d of describes) {
        if (!usedD.has(d.title)) throw new Error(`${file}: describe ${JSON.stringify(d.title)} lands in no part`);
        for (const it of d.its) { const n = usedIt.get(`${d.title}|${it.title}`) ?? 0; if (n !== 1) throw new Error(`${file}: it ${JSON.stringify(it.title)} lands in ${n} parts`); }
    }
    return out;
}
