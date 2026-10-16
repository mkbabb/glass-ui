// AMEND-5, K-3 (CRITIQUE-4 §3 amend 2): the source arm M-08 needs, a gate a RENAMED dt clamp cannot pass.
//
// F1-G4 (W-F.1.md appendix A, row G4) greps four literals. Its regex is read from W-F.1.md at run time and reported beside
// this gate, so the comparison is against the wave's own text. W-F.1 item 2 says "no stability clamp is kept anywhere;
// each stepper takes the true frame dt from its loop". This gate states that as a property of the code, not of names:
//
//   SINK    every argument of `.tickDt(` / `.tickToTime(` in src (keyframes.js SpringProgress, the leaf W-F.1's
//           `springStepper` returns). The engine's own playback (`drive`) passes `now - lastFrameT` unclamped, so a
//           clamp can only enter through src code that calls the step itself.
//   SLICE   the sink's backward slice inside its file (and the conditions that decide whether the sink runs): every assignment and declaration of each identifier (and of each
//           `obj.prop` by property name) it reads, transitively; the conditions (if / ?: / && || ?? / switch) that guard
//           an assignment to a slice variable; and, for a parameter of a function called in the same file, the matching
//           argument at every call site. A parameter of a function handed to requestAnimationFrame is the frame time.
//   CLAUSE  the slice holds no relational comparison (< > <= >=), no `%`, and no call except performance.now() /
//           Date.now(). Every bound on a number needs one of those (Math.min/max, a clamp helper of any name, a
//           comparing ternary, an `if (dt > CAP) dt = CAP`), so a rename cannot pass. A null check on the previous
//           timestamp (`last ? now - last : FRAME`) and unit scaling (`/ 1000`) pass.
//   HAND    a file that steps a damped oscillator by hand (an AST product `-X * X`, any name; F1-G1 sees only `omega`)
//           has no sink this gate can read, so it FAILs here too: its dt is unverifiable until it steps through tickDt.
//   EXIT    a slice that reaches a parameter whose provider is outside the file is UNRESOLVED and counts as FAIL; the
//           seat placing the gate puts the provider (e.g. aurora/composables/frameLoop.ts) in scope.
//
// usage (from apple-homeview/):
//   node amend5/tools/dtgate.mjs <glass-ui root> [plant files...]  -> amend5/data/dtgate.json
// It reads src read-only. Plants are standalone files under amend5/plants/ (never library code).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = path.resolve(process.argv[2] ?? ".");
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");
const HERE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");

const RELATIONAL = new Set([
    ts.SyntaxKind.LessThanToken, ts.SyntaxKind.GreaterThanToken,
    ts.SyntaxKind.LessThanEqualsToken, ts.SyntaxKind.GreaterThanEqualsToken,
]);
const ASSIGN = new Set([
    ts.SyntaxKind.EqualsToken, ts.SyntaxKind.PlusEqualsToken, ts.SyntaxKind.MinusEqualsToken,
    ts.SyntaxKind.AsteriskEqualsToken, ts.SyntaxKind.SlashEqualsToken, ts.SyntaxKind.PercentEqualsToken,
    ts.SyntaxKind.QuestionQuestionEqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken,
]);
const OK_CALLS = new Set(["performance.now", "Date.now", "globalThis.performance.now", "window.performance.now"]);
const SINKS = new Set(["tickDt", "tickToTime"]);

function scriptOf(file) {
    const raw = fs.readFileSync(file, "utf8");
    if (!file.endsWith(".vue")) return raw;
    // keep line numbers: blank everything outside <script> blocks
    let out = raw.replace(/[^\n]/g, " ");
    for (const m of raw.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) {
        const start = m.index + m[0].indexOf(m[1]);
        out = out.slice(0, start) + m[1] + out.slice(start + m[1].length);
    }
    return out;
}

function analyse(file, rel) {
    const sf = ts.createSourceFile(file, scriptOf(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const line = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
    const txt = (n) => n.getText(sf);
    const defs = new Map(); // key -> [{kind, node, rhs, fn, index}]
    const add = (k, d) => (defs.has(k) ? defs.get(k).push(d) : defs.set(k, [d]));
    const keyOf = (n) =>
        ts.isIdentifier(n) ? n.text : ts.isPropertyAccessExpression(n) ? "." + n.name.text : null;
    const sinks = [], hand = [], calls = new Map(); // fnName -> [CallExpression]
    const rafFns = new Set(); // functions handed to requestAnimationFrame (by name, or the node)
    const fnName = (fn) =>
        fn.name && ts.isIdentifier(fn.name) ? fn.name.text
            : fn.parent && ts.isVariableDeclaration(fn.parent) && ts.isIdentifier(fn.parent.name) ? fn.parent.name.text : null;

    (function visit(n) {
        if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer)
            add(n.name.text, { kind: "decl", node: n, rhs: n.initializer });
        if (ts.isBinaryExpression(n) && ASSIGN.has(n.operatorToken.kind)) {
            const k = keyOf(n.left);
            if (k) add(k, { kind: "assign", node: n, rhs: n.operatorToken.kind === ts.SyntaxKind.EqualsToken ? n.right : n });
        }
        if ((ts.isPrefixUnaryExpression(n) || ts.isPostfixUnaryExpression(n)) &&
            (n.operator === ts.SyntaxKind.PlusPlusToken || n.operator === ts.SyntaxKind.MinusMinusToken)) {
            const k = keyOf(n.operand);
            if (k) add(k, { kind: "assign", node: n, rhs: n.operand });
        }
        if (ts.isFunctionLike(n) && n.parameters)
            n.parameters.forEach((p, i) => ts.isIdentifier(p.name) && add(p.name.text, { kind: "param", node: p, fn: n, index: i }));
        if (ts.isCallExpression(n)) {
            const c = n.expression;
            if (ts.isPropertyAccessExpression(c) && SINKS.has(c.name.text) && n.arguments[0])
                sinks.push({ node: n, arg: n.arguments[0] });
            const cname = ts.isIdentifier(c) ? c.text : ts.isPropertyAccessExpression(c) ? c.name.text : null;
            if (cname) (calls.get(cname) ?? calls.set(cname, []).get(cname)).push(n);
            if (cname === "requestAnimationFrame" && n.arguments[0]) {
                const a = n.arguments[0];
                if (ts.isIdentifier(a)) rafFns.add(a.text);
                else rafFns.add(a);
            }
        }
        // a hand-rolled damped oscillator, any names (F1-G1 sees only "omega"): a sum whose one term is X·X·(…) and whose
        // other term is 2·…·X·(…), i.e. -ω²·(x - target) - 2ζω·v. Code only: shader text inside strings is never parsed.
        if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.AsteriskToken) {
            const strip = (e) => { while (ts.isParenthesizedExpression(e) || (ts.isPrefixUnaryExpression(e) && e.operator === ts.SyntaxKind.MinusToken)) e = ts.isParenthesizedExpression(e) ? e.expression : e.operand; return e; };
            const q = strip(n.left);
            if (ts.isBinaryExpression(q) && q.operatorToken.kind === ts.SyntaxKind.AsteriskToken) {
                const X = txt(strip(q.left));
                if (X === txt(strip(q.right)) && /^[A-Za-z_$][\w$.]*$/.test(X)) {
                    let term = n;
                    const mul = (e) => e && (ts.isParenthesizedExpression(e) || ts.isPrefixUnaryExpression(e) ||
                        (ts.isBinaryExpression(e) && [ts.SyntaxKind.AsteriskToken, ts.SyntaxKind.SlashToken].includes(e.operatorToken.kind)));
                    while (mul(term.parent)) term = term.parent;
                    let root = term;
                    const add = (e) => e && ts.isBinaryExpression(e) && [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(e.operatorToken.kind);
                    while (add(root.parent)) root = root.parent;
                    const terms = [];
                    (function flat(e) { if (add(e)) { flat(e.left); flat(e.right); } else terms.push(e); })(root);
                    const esc = X.replace(/[.$]/g, "\\$&");
                    const damp = terms.some((t) => t !== term && /(^|[^\w.])2(\s*\*|$)/.test(txt(t)) && new RegExp(`(^|[^\\w$])${esc}($|[^\\w$])`).test(txt(t)));
                    if (damp && !hand.some((h) => h.line === line(root)))
                        hand.push({ line: line(root), text: txt(root).replace(/\s+/g, " ").slice(0, 100) });
                }
            }
        }
        ts.forEachChild(n, visit);
    })(sf);

    function guards(node) {
        // conditions that decide whether this node runs, up to its function: [expr, isLoopCondition]
        const out = [];
        for (let p = node.parent, c = node; p && !ts.isFunctionLike(p); c = p, p = p.parent) {
            if (ts.isIfStatement(p) && c !== p.expression) out.push([p.expression, false]);
            if (ts.isConditionalExpression(p) && c !== p.condition) out.push([p.condition, false]);
            if (ts.isBinaryExpression(p) && c === p.right &&
                [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(p.operatorToken.kind))
                out.push([p.left, false]);
            if (ts.isCaseClause(p)) out.push([p.expression, false], [p.parent.parent.expression, false]);
            if ((ts.isWhileStatement(p) || ts.isDoStatement(p)) && c !== p.expression) out.push([p.expression, true, p]);
            if (ts.isForStatement(p) && c === p.statement && p.condition) out.push([p.condition, true, p]);
        }
        return out;
    }

    const within = (n, anc) => { for (let p = n; p; p = p.parent) if (p === anc) return true; return false; };
    function slice(arg, sinkNode) {
        const violations = [], unresolved = [], seenKey = new Set(), seenNode = new Set();
        const walk = (n, why) => {
            if (!n || seenNode.has(n)) return;
            seenNode.add(n);
            if (ts.isCallExpression(n)) {
                const t = txt(n.expression);
                if (!OK_CALLS.has(t)) violations.push({ line: line(n), what: `call ${t}(…)`, via: why });
                return; // its arguments are inside the violation already
            }
            if (ts.isBinaryExpression(n)) {
                if (RELATIONAL.has(n.operatorToken.kind)) violations.push({ line: line(n), what: `comparison ${txt(n).slice(0, 60)}`, via: why });
                if (n.operatorToken.kind === ts.SyntaxKind.PercentToken) violations.push({ line: line(n), what: `modulo ${txt(n).slice(0, 60)}`, via: why });
            }
            if (ts.isIdentifier(n) || ts.isPropertyAccessExpression(n)) {
                const k = keyOf(n);
                if (k && !seenKey.has(k) && defs.has(k)) {
                    seenKey.add(k);
                    for (const d of defs.get(k)) {
                        if (d.kind === "param") {
                            const nm = fnName(d.fn);
                            if (rafFns.has(d.fn) || (nm && rafFns.has(nm))) continue; // the frame timestamp
                            const sites = nm ? (calls.get(nm) ?? []) : [];
                            if (!sites.length) unresolved.push({ line: line(d.node), what: `parameter ${k} of ${nm ?? "an anonymous function"}: provider outside this file` });
                            for (const c of sites) walk(c.arguments[d.index], `${k} <- call ${nm}() at :${line(c)}`);
                        } else {
                            walk(d.rhs, `${k} = … at :${line(d.node)}`);
                            for (const [g, loop, stmt] of guards(d.node)) {
                                // an assignment inside the same loop as the sink (an accumulator paying out its steps) is
                                // walked through the loop condition's operands; a loop that only shrinks a value before
                                // the sink (`while (d > CAP) d -= CAP`) is a bound and is flagged
                                if (loop && within(sinkNode, stmt) && ts.isBinaryExpression(g) && RELATIONAL.has(g.operatorToken.kind)) {
                                    walk(g.left, `loop guard of ${k} at :${line(d.node)}`);
                                    walk(g.right, `loop guard of ${k} at :${line(d.node)}`);
                                } else walk(g, `guard of ${k} at :${line(d.node)}`);
                            }
                        }
                    }
                }
                if (ts.isPropertyAccessExpression(n)) walk(n.expression, why);
                return;
            }
            ts.forEachChild(n, (c) => walk(c, why));
        };
        walk(arg, "sink argument");
        // the sink's own guards: an if / ?: / && comparison decides whether a frame's time reaches the step at all, so it
        // is flagged; a loop condition (substeps, a fixed-step accumulator) is walked through its operands only, so an
        // accumulator that carries its remainder passes and one whose total is capped fails on the cap
        for (const [g, loop] of guards(sinkNode)) {
            if (loop && ts.isBinaryExpression(g) && RELATIONAL.has(g.operatorToken.kind)) {
                walk(g.left, `loop guard of the sink at :${line(g)}`);
                walk(g.right, `loop guard of the sink at :${line(g)}`);
            } else walk(g, `guard of the sink at :${line(g)}`);
        }
        return { violations, unresolved };
    }

    const out = { file: rel, sinks: [], hand_rolled: hand };
    for (const s of sinks) {
        const r = slice(s.arg, s.node);
        out.sinks.push({ line: line(s.node), call: txt(s.node).slice(0, 90), pass: !r.violations.length && !r.unresolved.length, ...r });
    }
    out.pass = out.sinks.every((s) => s.pass) && hand.length === 0;
    return out;
}

const walkDir = (d, acc = []) => {
    for (const e of fs.readdirSync(d)) {
        const p = path.join(d, e);
        if (fs.statSync(p).isDirectory()) walkDir(p, acc);
        else if (/\.(ts|vue)$/.test(e) && !/\.(test|spec)\./.test(e) && !/\.d\.ts$/.test(e)) acc.push(p);
    }
    return acc;
};

// F1-G4's own regex, read from the wave text (W-F.1.md appendix A, the `const g4 = grepSrc(/…/)` line)
const wave = fs.readFileSync(path.join(ROOT, "docs/tranches/BL/waves/W-F.1.md"), "utf8");
const g4line = wave.split("\n").find((l) => /const g4 = grepSrc\(/.test(l));
const g4src = g4line.match(/grepSrc\(\/(.*)\/\);/)[1];
const G4 = new RegExp(g4src);
const g4hits = (file) => scriptOf(file).split("\n").map((l, i) => [i + 1, l]).filter(([, l]) => G4.test(l)).map(([i]) => i);
const g1 = /-\s*(\w*omega\w*)\s*\*\s*\1\b/i;
const g1hits = (file) => scriptOf(file).split("\n").map((l, i) => [i + 1, l]).filter(([, l]) => g1.test(l)).map(([i]) => i);

const OUT = { F1_G4_regex_from_wave: g4src, wave_line: wave.split("\n").indexOf(g4line) + 1 };

// 1 · glass-ui src at the checkout's HEAD (read-only)
const files = walkDir(path.join(ROOT, "src"));
const rows = files.map((f) => analyse(f, path.relative(ROOT, f))).filter((r) => r.sinks.length || r.hand_rolled.length);
OUT.head = {
    files_scanned: files.length,
    rows,
    F1_G4_sites: files.flatMap((f) => g4hits(f).map((l) => `${path.relative(ROOT, f)}:${l}`)),
    gate_pass: rows.every((r) => r.pass),
};

// 2 · plants: each is a stepper module; the expected verdict is in its first line (`// EXPECT PASS|FAIL: why`)
OUT.plants = {};
for (const p of process.argv.slice(3)) {
    const head = fs.readFileSync(p, "utf8").split("\n")[0];
    const r = analyse(p, path.relative(HERE, p));
    OUT.plants[path.basename(p)] = {
        expect: head.replace(/^\/\/\s*/, ""),
        gate_pass: r.pass,
        F1_G4_pass: g4hits(p).length === 0,
        F1_G1_pass: g1hits(p).length === 0,
        detail: r,
    };
}
OUT.plants_as_expected = Object.values(OUT.plants).every((v) => v.gate_pass === /EXPECT PASS/.test(v.expect));
fs.writeFileSync(path.join(HERE, process.env.DTGATE_OUT ?? "amend5/data/dtgate.json"), JSON.stringify(OUT, null, 1));
console.log(JSON.stringify({
    head_gate_pass: OUT.head.gate_pass,
    head_rows: OUT.head.rows.map((r) => ({ file: r.file, pass: r.pass, hand: r.hand_rolled.map((h) => h.line), sinks: r.sinks.map((s) => [s.line, s.pass, s.violations.map((v) => `${v.line} ${v.what}`), s.unresolved.map((u) => u.what)]) })),
    F1_G4_head_sites: OUT.head.F1_G4_sites.length,
    plants: Object.fromEntries(Object.entries(OUT.plants).map(([k, v]) => [k, { expect: v.expect, gate: v.gate_pass, F1_G4: v.F1_G4_pass, F1_G1: v.F1_G1_pass, why: v.detail.sinks.flatMap((s) => s.violations.map((x) => x.what).concat(s.unresolved.map((u) => u.what))).concat(v.detail.hand_rolled.map((h) => "hand-rolled " + h.text)) }])),
    plants_as_expected: OUT.plants_as_expected,
}, null, 1));
