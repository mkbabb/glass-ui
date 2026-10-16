// AMEND-6, K-3 (CRITIQUE-5 §1 amends 1-4): M-08's source arm, v6. Extends amend5/tools/dtgate.mjs (sha256 5c5d53ee…78ed).
//
// What v6 adds over v5 (each closes a CRITIQUE-5 escape or one this seat found while extending it):
//   DEFS     definitions are recorded for object/array binding patterns (declarations, parameters, for-of), destructuring
//            assignments (`[a] = …`, `({ a } = …)`), element writes (`x[i] = …` defines `x` and the shared key `[]`),
//            property writes (`x.p = …` defines `.p` AND the root `x`), object-literal members (`{ p: … }` defines `.p`),
//            class fields, mutating calls on a receiver (`x.m(…)` defines `x`; the sink calls excepted) and
//            Object.assign / Object.defineProperty / Reflect.set on their first argument.
//   EXIT     (fail closed) a reached identifier the TypeScript binder resolves to an import, an ambient `declare`, or
//            nothing in the file (a free global not on the allow-list) is UNRESOLVED; so is a parameter of a function
//            that is exported, passed as a value anywhere but the global requestAnimationFrame, or never called in the
//            file; so is `this.p` with no in-file write of `.p`.
//   CONTROL  a node's guards are its control dependence inside its function: every enclosing if / ?: / && || ?? /
//            switch / loop condition (as v5), PLUS the conditions on the path to every return / continue / break /
//            throw in an earlier sibling statement (and in a later one when a loop encloses both), PLUS the guards of
//            each same-file call site of the function, or of the call it is handed to as a callback. Applied to the
//            sink and to every definition in its slice.
//   SINKS    `.tickDt(` / `.tickToTime(` / `.tickVector(` (SpringProgress's three time entries, keyframes.d.ts:3616-3624,
//            3664). Any other reference to those names (`.bind`, a destructured method, `x["tickDt"]`) is an
//            unanalysable sink and FAILs the file.
//   CLAUSE   v5's (no < > <= >=, no %, no call but performance.now() / Date.now()) plus: no bitwise operator (a sign
//            shift orders two numbers), no `**` (sqrt(d²) is |d|), no `new`, no template literal and no `.length` (digit
//            count orders numbers), no element read with a computed index (a lookup table). performance / Date /
//            requestAnimationFrame count only when they are the free globals, not a local or an import of that name.
//            `springStepper(…)` (W-F.1 item 1's leaf) is an allowed call.
//   HAND     unchanged from v5 (an Euler acceleration `X·X·(…) + 2·…·X`, any names).
//
// usage (from apple-homeview/):
//   node amend6/tools/dtgate.mjs <glass-ui root> [plant files...]  -> amend6/data/dtgate6.json (or $DTGATE_OUT)
// Each plant's first line is `// EXPECT PASS|FAIL|RESIDUAL: why`. RESIDUAL marks an unfinished form this arm is known
// to pass (a documented miss, scored as expected when the gate PASSes it). A first line that is none of these marks a
// provider file (run, reported, not scored).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = path.resolve(process.argv[2] ?? ".");
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");
const HERE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const K = ts.SyntaxKind;

const RELATIONAL = new Set([K.LessThanToken, K.GreaterThanToken, K.LessThanEqualsToken, K.GreaterThanEqualsToken]);
const BITWISE = new Set([K.AmpersandToken, K.BarToken, K.CaretToken, K.LessThanLessThanToken, K.GreaterThanGreaterThanToken,
    K.GreaterThanGreaterThanGreaterThanToken, K.AmpersandEqualsToken, K.BarEqualsToken, K.CaretEqualsToken,
    K.LessThanLessThanEqualsToken, K.GreaterThanGreaterThanEqualsToken, K.GreaterThanGreaterThanGreaterThanEqualsToken]);
const MODULO = new Set([K.PercentToken, K.PercentEqualsToken]);
const POWER = new Set([K.AsteriskAsteriskToken, K.AsteriskAsteriskEqualsToken]);
const isAssign = (k) => k >= K.FirstAssignment && k <= K.LastAssignment;
const SINKS = new Set(["tickDt", "tickToTime", "tickVector"]);
const GLOBAL_OK = new Set(["performance", "Date", "Math", "Number", "Infinity", "NaN", "undefined", "globalThis", "window"]);
const OK_CALLS = new Set(["performance.now", "Date.now", "globalThis.performance.now", "window.performance.now"]);
const MUTATORS = new Set(["Object.assign", "Object.defineProperty", "Object.defineProperties", "Reflect.set", "Reflect.defineProperty"]);
const LEAF = "springStepper";

function scriptOf(file) {
    const raw = fs.readFileSync(file, "utf8");
    if (!file.endsWith(".vue")) return raw;
    let out = raw.replace(/[^\n]/g, " ");
    for (const m of raw.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) {
        const start = m.index + m[0].indexOf(m[1]);
        out = out.slice(0, start) + m[1] + out.slice(start + m[1].length);
    }
    return out;
}

function program(file) {
    const name = file.endsWith(".vue") ? file + ".ts" : file;
    const sf = ts.createSourceFile(name, scriptOf(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const options = { noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.Latest };
    const host = ts.createCompilerHost(options);
    host.getSourceFile = (f) => (path.resolve(f) === path.resolve(name) ? sf : undefined);
    host.fileExists = (f) => path.resolve(f) === path.resolve(name);
    host.readFile = () => undefined;
    const prog = ts.createProgram({ rootNames: [name], options, host });
    return { sf, checker: prog.getTypeChecker() };
}

const unwrap = (e) => { while (e && (ts.isParenthesizedExpression(e) || ts.isNonNullExpression(e) || ts.isAsExpression(e) || ts.isTypeAssertionExpression(e) || (ts.isSatisfiesExpression && ts.isSatisfiesExpression(e)))) e = e.expression; return e; };

function analyse(file, rel) {
    const { sf, checker } = program(file);
    const line = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
    const txt = (n) => n.getText(sf);
    const defs = new Map(); // key -> [{kind, node, rhs: Node[], fn?, index?}]
    const add = (k, d) => (defs.has(k) ? defs.get(k).push(d) : defs.set(k, [d]));
    // the identifier a plain-name key is written through (its binder symbol decides which reads it reaches)
    const rootId = (e) => { e = unwrap(e); while (e && (ts.isPropertyAccessExpression(e) || ts.isElementAccessExpression(e))) e = unwrap(e.expression); return e && ts.isIdentifier(e) ? e : null; };
    const sinks = [], hand = [], indirect = [];
    const symOf = (id) => {
        if (ts.isShorthandPropertyAssignment(id.parent) && id.parent.name === id) return checker.getShorthandAssignmentValueSymbol(id.parent);
        return checker.getSymbolAtLocation(id);
    };
    const isGlobalName = (id, name) => ts.isIdentifier(id) && id.text === name && !symOf(id)?.declarations?.length;
    // the root of a call's callee text must be a free global for OK_CALLS / rAF to count
    const calleeOk = (c) => {
        const t = txt(c).replace(/\s+/g, "");
        if (OK_CALLS.has(t)) { let r = c; while (ts.isPropertyAccessExpression(r)) r = r.expression; return ts.isIdentifier(r) && !symOf(r)?.declarations?.length; }
        if (ts.isIdentifier(c) && c.text === LEAF) {
            const d = symOf(c)?.declarations ?? [];
            return d.length > 0 && d.every((x) => ts.isImportSpecifier(x) && /springStepper['"]?$/.test(x.parent.parent.parent.moduleSpecifier.text.replace(/\.(ts|js)$/, "")));
        }
        return false;
    };
    const isRaf = (c) => isGlobalName(c, "requestAnimationFrame") ||
        (ts.isPropertyAccessExpression(c) && c.name.text === "requestAnimationFrame" && ts.isIdentifier(c.expression) && ["window", "globalThis"].includes(c.expression.text) && !symOf(c.expression)?.declarations?.length);

    // keys a write to `t` defines
    function chainKeys(e) {
        e = unwrap(e);
        if (!e) return [];
        if (ts.isIdentifier(e)) return [e.text];
        if (e.kind === K.ThisKeyword) return ["this"];
        if (ts.isPropertyAccessExpression(e)) return ["." + e.name.text, ...chainKeys(e.expression)];
        if (ts.isElementAccessExpression(e)) {
            const a = e.argumentExpression;
            return ["[]", ...(a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a)) ? ["." + a.text] : []), ...chainKeys(e.expression)];
        }
        return [];
    }
    function targets(t, out = []) { // destructuring-assignment targets
        t = unwrap(t);
        if (ts.isObjectLiteralExpression(t)) for (const p of t.properties) {
            if (ts.isPropertyAssignment(p)) targets(p.initializer, out);
            else if (ts.isShorthandPropertyAssignment(p)) out.push(p.name);
            else if (ts.isSpreadAssignment(p)) targets(p.expression, out);
        }
        else if (ts.isArrayLiteralExpression(t)) for (const el of t.elements) {
            if (ts.isSpreadElement(el)) targets(el.expression, out);
            else if (ts.isBinaryExpression(el) && el.operatorToken.kind === K.EqualsToken) targets(el.left, out);
            else if (!ts.isOmittedExpression(el)) targets(el, out);
        }
        else if (ts.isBinaryExpression(t) && t.operatorToken.kind === K.EqualsToken) targets(t.left, out);
        else out.push(t);
        return out;
    }
    function boundNames(name, out = []) { // binding-pattern identifiers + element defaults
        if (ts.isIdentifier(name)) out.push(name);
        else for (const el of name.elements) if (!ts.isOmittedExpression(el)) boundNames(el.name, out);
        return out;
    }
    function bindingDefaults(name, out = []) {
        if (!ts.isIdentifier(name)) for (const el of name.elements) {
            if (ts.isOmittedExpression(el)) continue;
            if (el.initializer) out.push(el.initializer);
            if (el.propertyName && ts.isComputedPropertyName(el.propertyName)) out.push(el.propertyName.expression);
            bindingDefaults(el.name, out);
        }
        return out;
    }

    (function visit(n) {
        if (ts.isVariableDeclaration(n)) {
            const fo = n.parent?.parent;
            const src = n.initializer ?? (fo && (ts.isForOfStatement(fo) || ts.isForInStatement(fo)) ? fo.expression : null);
            const rhs = [src, ...bindingDefaults(n.name)].filter(Boolean);
            for (const id of boundNames(n.name)) add(id.text, { kind: "decl", node: n, rhs, id });
        }
        if (ts.isBinaryExpression(n) && isAssign(n.operatorToken.kind)) {
            const destr = ts.isObjectLiteralExpression(unwrap(n.left)) || ts.isArrayLiteralExpression(unwrap(n.left));
            const rhs = n.operatorToken.kind === K.EqualsToken ? [n.right] : [n];
            for (const t of destr ? targets(n.left) : [n.left]) {
                const extra = []; // defaults inside a destructuring target
                for (const k of chainKeys(t)) add(k, { kind: "assign", node: n, rhs: [...rhs, ...extra], id: k[0] === "." || k === "[]" ? null : rootId(t) });
            }
            if (destr) for (const el of ts.isArrayLiteralExpression(unwrap(n.left)) ? unwrap(n.left).elements : [])
                if (ts.isBinaryExpression(el) && el.operatorToken.kind === K.EqualsToken) for (const k of chainKeys(el.left)) add(k, { kind: "assign", node: n, rhs: [el.right], id: k[0] === "." || k === "[]" ? null : rootId(el.left) });
        }
        if ((ts.isPrefixUnaryExpression(n) || ts.isPostfixUnaryExpression(n)) && (n.operator === K.PlusPlusToken || n.operator === K.MinusMinusToken))
            for (const k of chainKeys(n.operand)) add(k, { kind: "assign", node: n, rhs: [n.operand], id: k[0] === "." || k === "[]" ? null : rootId(n.operand) });
        if (ts.isDeleteExpression(n)) for (const k of chainKeys(n.expression)) add(k, { kind: "assign", node: n, rhs: [], id: k[0] === "." || k === "[]" ? null : rootId(n.expression) });
        if (ts.isPropertyAssignment(n) && (ts.isIdentifier(n.name) || ts.isStringLiteral(n.name)))
            add("." + n.name.text, { kind: "member", node: n, rhs: [n.initializer] });
        if (ts.isShorthandPropertyAssignment(n)) add("." + n.name.text, { kind: "member", node: n, rhs: [n.name] });
        if (ts.isGetAccessorDeclaration(n) && ts.isIdentifier(n.name) && n.body) add("." + n.name.text, { kind: "member", node: n, rhs: [n.body] });
        if (ts.isPropertyDeclaration(n) && ts.isIdentifier(n.name)) add("." + n.name.text, { kind: "member", node: n, rhs: n.initializer ? [n.initializer] : [] });
        if (ts.isFunctionLike(n) && n.parameters)
            n.parameters.forEach((p, i) => {
                const rhs = [p.initializer, ...bindingDefaults(p.name)].filter(Boolean);
                for (const id of boundNames(p.name)) add(id.text, { kind: "param", node: p, fn: n, index: i, rhs, id });
            });
        if (ts.isCatchClause(n) && n.variableDeclaration)
            for (const id of boundNames(n.variableDeclaration.name)) add(id.text, { kind: "opaque", node: n, rhs: [], what: "catch binding", id });
        if (ts.isCallExpression(n)) {
            const c = unwrap(n.expression);
            if (ts.isPropertyAccessExpression(c) && SINKS.has(c.name.text) && n.arguments[0]) sinks.push({ node: n, arg: n.arguments[0] });
            else if (ts.isPropertyAccessExpression(c)) for (const k of chainKeys(c.expression)) add(k, { kind: "mutcall", node: n, rhs: [n], id: k[0] === "." || k === "[]" || k === "this" ? null : rootId(c.expression) });
            const ct = txt(c).replace(/\s+/g, "");
            if (MUTATORS.has(ct) && n.arguments[0]) for (const k of chainKeys(n.arguments[0])) add(k, { kind: "mutcall", node: n, rhs: [n], id: k[0] === "." || k === "[]" || k === "this" ? null : rootId(n.arguments[0]) });
        }
        // any reference to a sink name that is not `.tick*(` called directly and not a declaration's own name
        if ((ts.isIdentifier(n) || ts.isPrivateIdentifier(n)) && SINKS.has(n.text)) {
            const p = n.parent;
            const direct = ts.isPropertyAccessExpression(p) && p.name === n && ts.isCallExpression(p.parent) && unwrap(p.parent.expression) === p;
            const declName = (ts.isMethodDeclaration(p) || ts.isMethodSignature(p) || ts.isPropertySignature(p) || ts.isPropertyDeclaration(p) || ts.isPropertyAssignment(p) || ts.isFunctionDeclaration(p)) && p.name === n;
            if (!direct && !declName) indirect.push({ line: line(n), what: `indirect sink reference ${txt(p).slice(0, 60)}` });
        }
        if (ts.isElementAccessExpression(n) && n.argumentExpression && ts.isStringLiteral(n.argumentExpression) && SINKS.has(n.argumentExpression.text))
            indirect.push({ line: line(n), what: `indirect sink reference ${txt(n).slice(0, 60)}` });
        // v5's hand-rolled oscillator, unchanged
        if (ts.isBinaryExpression(n) && n.operatorToken.kind === K.AsteriskToken) {
            const strip = (e) => { while (ts.isParenthesizedExpression(e) || (ts.isPrefixUnaryExpression(e) && e.operator === K.MinusToken)) e = ts.isParenthesizedExpression(e) ? e.expression : e.operand; return e; };
            const q = strip(n.left);
            if (ts.isBinaryExpression(q) && q.operatorToken.kind === K.AsteriskToken) {
                const X = txt(strip(q.left));
                if (X === txt(strip(q.right)) && /^[A-Za-z_$][\w$.]*$/.test(X)) {
                    let term = n;
                    const mul = (e) => e && (ts.isParenthesizedExpression(e) || ts.isPrefixUnaryExpression(e) || (ts.isBinaryExpression(e) && [K.AsteriskToken, K.SlashToken].includes(e.operatorToken.kind)));
                    while (mul(term.parent)) term = term.parent;
                    let root = term;
                    const sum = (e) => e && ts.isBinaryExpression(e) && [K.PlusToken, K.MinusToken].includes(e.operatorToken.kind);
                    while (sum(root.parent)) root = root.parent;
                    const terms = [];
                    (function flat(e) { if (sum(e)) { flat(e.left); flat(e.right); } else terms.push(e); })(root);
                    const esc = X.replace(/[.$]/g, "\\$&");
                    const damp = terms.some((t) => t !== term && /(^|[^\w.])2(\s*\*|$)/.test(txt(t)) && new RegExp(`(^|[^\\w$])${esc}($|[^\\w$])`).test(txt(t)));
                    if (damp && !hand.some((h) => h.line === line(root))) hand.push({ line: line(root), text: txt(root).replace(/\s+/g, " ").slice(0, 100) });
                }
            }
        }
        ts.forEachChild(n, visit);
    })(sf);

    // ── functions: call sites and escapes, by binder symbol (name match added for method calls) ──
    const fnSymbol = (fn) => {
        if (fn.name && ts.isIdentifier(fn.name)) return symOf(fn.name);
        if (fn.parent && ts.isVariableDeclaration(fn.parent) && ts.isIdentifier(fn.parent.name)) return symOf(fn.parent.name);
        return undefined;
    };
    const fnLabel = (fn) => (fn.name && ts.isIdentifier(fn.name) ? fn.name.text : fn.parent && ts.isVariableDeclaration(fn.parent) && ts.isIdentifier(fn.parent.name) ? fn.parent.name.text : null);
    const isExported = (fn) => {
        const holder = fn.parent && ts.isVariableDeclaration(fn.parent) ? fn.parent.parent.parent : fn;
        if (holder && ts.canHaveModifiers?.(holder) && (ts.getModifiers(holder) ?? []).some((m) => m.kind === K.ExportKeyword || m.kind === K.DefaultKeyword)) return true;
        const s = fnSymbol(fn);
        let viaClause = false;
        if (s) (function v(n) { if (ts.isExportSpecifier(n) && (n.propertyName ?? n.name).text === s.name) viaClause = true; if (ts.isExportAssignment(n) && ts.isIdentifier(n.expression) && n.expression.text === s.name) viaClause = true; ts.forEachChild(n, v); })(sf);
        return viaClause;
    };
    const uses = new Map(); // fn node -> {calls: CallExpression[], raf: bool, escapes: Node[]}
    function usesOf(fn) {
        if (uses.has(fn)) return uses.get(fn);
        const u = { calls: [], raf: false, rafCalls: [], escapes: [], exported: isExported(fn) };
        const s = fnSymbol(fn), label = fnLabel(fn);
        // the function expression itself handed to a call
        const holder = fn.parent;
        if (holder && ts.isCallExpression(holder) && holder.arguments.includes(fn)) {
            if (isRaf(unwrap(holder.expression))) { u.raf = true; u.rafCalls.push(holder); } else u.escapes.push(holder);
        } else if (holder && !(ts.isVariableDeclaration(holder) && holder.initializer === fn) && !ts.isSourceFile(holder) && !ts.isBlock(holder) && !ts.isModuleBlock(holder) && !ts.isClassLike(holder) && !ts.isObjectLiteralExpression(holder)) {
            u.escapes.push(holder);
        }
        if (s || label) (function v(n) {
            if (ts.isIdentifier(n) && n !== fn.name && !(fn.parent && ts.isVariableDeclaration(fn.parent) && n === fn.parent.name) && ((s && symOf(n) === s) || (!s && n.text === label))) {
                const p = n.parent;
                if (ts.isCallExpression(p) && unwrap(p.expression) === n) u.calls.push(p);
                else if (ts.isCallExpression(p) && p.arguments.includes(n) && isRaf(unwrap(p.expression))) { u.raf = true; u.rafCalls.push(p); }
                else if (!(ts.isExportSpecifier(p))) u.escapes.push(p);
            }
            // a method-style call `x.label(…)` matches by name (over-includes)
            if (label && ts.isCallExpression(n) && ts.isPropertyAccessExpression(unwrap(n.expression)) && unwrap(n.expression).name.text === label) u.calls.push(n);
            ts.forEachChild(n, v);
        })(sf);
        uses.set(fn, u);
        return u;
    }
    const enclosingFn = (n) => { for (let p = n.parent; p; p = p.parent) if (ts.isFunctionLike(p)) return p; return null; };

    // ── control dependence ──
    const isLoop = (n) => ts.isWhileStatement(n) || ts.isDoStatement(n) || ts.isForStatement(n) || ts.isForOfStatement(n) || ts.isForInStatement(n);
    function condsUpTo(node, top) { // conditions on the path from node up to (and including) top
        const out = [];
        for (let p = node.parent, c = node; p && !ts.isFunctionLike(p); c = p, p = p.parent) {
            if (ts.isIfStatement(p) && c !== p.expression) out.push([p.expression, false]);
            if (ts.isConditionalExpression(p) && c !== p.condition) out.push([p.condition, false]);
            if (ts.isBinaryExpression(p) && c === p.right && [K.AmpersandAmpersandToken, K.BarBarToken, K.QuestionQuestionToken].includes(p.operatorToken.kind)) out.push([p.left, false]);
            if (ts.isCaseClause(p)) out.push([p.expression, false], [p.parent.parent.expression, false]);
            if (ts.isDefaultClause(p)) out.push([p.parent.parent.expression, false]);
            if ((ts.isWhileStatement(p) || ts.isDoStatement(p)) && c !== p.expression) out.push([p.expression, true, p]);
            if (ts.isForStatement(p) && (c === p.statement || c === p.incrementor) && p.condition) out.push([p.condition, true, p]);
            if ((ts.isForOfStatement(p) || ts.isForInStatement(p)) && c === p.statement) out.push([p.expression, true, p]);
            if (p === top) break;
        }
        return out;
    }
    function exitsIn(s) { // jumps inside statement s that leave s (nested functions excluded)
        const out = [];
        if (ts.isFunctionLike(s) || ts.isClassLike(s)) return out; // a declaration's own body never runs here
        (function v(n, inLoop, inSwitch) {
            if (n !== s && (ts.isFunctionLike(n) || ts.isClassLike(n))) return;
            if (ts.isReturnStatement(n) || ts.isThrowStatement(n)) out.push(n);
            if (ts.isBreakStatement(n) && (n.label || !(inLoop || inSwitch))) out.push(n);
            if (ts.isContinueStatement(n) && (n.label || !inLoop)) out.push(n);
            const L = n !== s && isLoop(n), S = n !== s && ts.isSwitchStatement(n);
            ts.forEachChild(n, (c) => v(c, inLoop || L, inSwitch || S));
        })(s, false, false);
        return out;
    }
    function controlDeps(node, seen = new Set()) {
        if (seen.has(node)) return [];
        seen.add(node);
        const out = condsUpTo(node, null);
        const fn = enclosingFn(node);
        // sibling statements with an exit, on every statement list between node and its function
        // earlier siblings always; later siblings only when a loop above the list re-runs the node
        const chain = [];
        for (let c = node, p = node.parent; p && p !== fn; c = p, p = p.parent) chain.push([c, p]);
        chain.forEach(([c, p], idx) => {
            const list = ts.isBlock(p) || ts.isSourceFile(p) || ts.isModuleBlock(p) || ts.isCaseClause(p) || ts.isDefaultClause(p) ? p.statements : null;
            if (!list) return;
            const loopAbove = chain.slice(idx + 1).some(([, q]) => isLoop(q));
            const i = list.indexOf(c);
            list.forEach((s, j) => {
                if (j === i || (j > i && !loopAbove)) return;
                for (const J of exitsIn(s)) for (const g of condsUpTo(J, s)) out.push([g[0], false]);
            });
        });
        // the function's invocations: same-file call sites, or the call it is handed to
        if (fn) {
            const u = usesOf(fn);
            for (const call of u.calls) out.push(...controlDeps(call, seen));
            for (const e of u.escapes) if (ts.isCallExpression(e)) out.push(...controlDeps(e, seen));
            // a frame scheduled from ANOTHER function under a guard is skipped by that guard; a loop re-scheduling itself
            // (`if (!settled) requestAnimationFrame(step)` inside step) only stops, and its next dt is the true gap
            for (const r of u.rafCalls) if (enclosingFn(r) !== fn) out.push(...controlDeps(r, seen));
        }
        return out;
    }

    function isConst(e, depth = 0) {
        e = unwrap(e);
        if (!e || depth > 8) return false;
        if (ts.isNumericLiteral(e)) return true;
        if (ts.isPrefixUnaryExpression(e) && e.operator === K.MinusToken) return isConst(e.operand, depth + 1);
        if (ts.isBinaryExpression(e) && [K.PlusToken, K.MinusToken, K.AsteriskToken, K.SlashToken].includes(e.operatorToken.kind)) return isConst(e.left, depth + 1) && isConst(e.right, depth + 1);
        if (ts.isIdentifier(e)) {
            const d = symOf(e)?.declarations ?? [];
            return d.length === 1 && ts.isVariableDeclaration(d[0]) && !!(ts.getCombinedNodeFlags(d[0]) & ts.NodeFlags.Const) && !!d[0].initializer && isConst(d[0].initializer, depth + 1);
        }
        return false;
    }
    const within = (n, anc) => { for (let p = n; p; p = p.parent) if (p === anc) return true; return false; };
    function slice(arg, sinkNode) {
        const violations = [], unresolved = [], review = [], seenKey = new Set(), seenNode = new Set();
        const R = (n, what) => { if (!review.some((r) => r.line === line(n) && r.what === what)) review.push({ line: line(n), what }); };
        const V = (n, what, why) => violations.push({ line: line(n), what, via: why });
        const U = (n, what) => unresolved.push({ line: line(n), what });
        const walkKey = (k, why, ref) => {
            const sym = ref ? symOf(ref) : undefined;
            const seenAs = sym ? sym : k;
            if (seenKey.has(seenAs) || !defs.has(k)) return;
            seenKey.add(seenAs);
            for (const d of defs.get(k)) {
                // a plain name reaches only the definitions written through the same binding (fail closed: a definition
                // whose identifier the binder cannot resolve is kept)
                if (sym && d.id) { const ds = symOf(d.id); if (ds && ds !== sym) continue; }
                if (d.kind === "opaque") { U(d.node, `${k}: ${d.what}`); continue; }
                if (d.kind === "param") {
                    const fn = d.fn, u = usesOf(fn), label = fnLabel(fn) ?? "an anonymous function";
                    for (const r of d.rhs) walk(r, `default of ${k} at :${line(d.node)}`);
                    if (u.exported) U(d.node, `parameter ${k} of exported ${label}: callers outside this file`);
                    if (u.escapes.length) U(d.node, `parameter ${k} of ${label}: the function is passed as a value at :${u.escapes.map(line).join(",:")}`);
                    if (u.raf && d.index === 0 && !u.escapes.length && !u.exported) { /* the frame timestamp */ }
                    else if (!u.calls.length && !u.raf) U(d.node, `parameter ${k} of ${label}: provider outside this file`);
                    for (const c of u.calls) {
                        const spread = c.arguments.some(ts.isSpreadElement);
                        for (const a of spread ? c.arguments : [c.arguments[d.index]]) walk(a, `${k} <- call at :${line(c)}`);
                    }
                    continue;
                }
                for (const r of d.rhs) walk(r, `${k} = … at :${line(d.node)}`);
                const dfn = enclosingFn(d.node);
                if (dfn && dfn !== enclosingFn(sinkNode) && usesOf(dfn).escapes.some((e) => ts.isCallExpression(e)))
                    R(d.node, `${k} written from a function handed to ${usesOf(dfn).escapes.filter(ts.isCallExpression).map((e) => txt(e.expression)).join(", ")} (another task; r04's timer and p04's visibility reset have this shape)`);
                for (const [g, loop, stmt] of controlDeps(d.node)) {
                    if (loop && within(sinkNode, stmt) && ts.isBinaryExpression(g) && RELATIONAL.has(g.operatorToken.kind)) {
                        walk(g.left, `loop guard of ${k} at :${line(d.node)}`);
                        walk(g.right, `loop guard of ${k} at :${line(d.node)}`);
                    } else walk(g, `guard of ${k} at :${line(d.node)}`);
                }
            }
        };
        const classify = (id, why) => {
            const s = symOf(id), decls = s?.declarations ?? [];
            if (!decls.length) { if (!GLOBAL_OK.has(id.text)) U(id, `free identifier ${id.text} (no declaration in this file)`); return; }
            if (decls.some((x) => ts.isImportSpecifier(x) || ts.isImportClause(x) || ts.isNamespaceImport(x) || ts.isImportEqualsDeclaration(x))) U(id, `imported ${id.text}: provider outside this file`);
            else if (decls.some((x) => (x.flags & ts.NodeFlags.Ambient) || (ts.isVariableDeclaration(x) && (ts.getCombinedModifierFlags(x) & ts.ModifierFlags.Ambient))))
                U(id, `ambient ${id.text} (declare): provider outside this file`);
        };
        const walk = (n, why) => {
            if (!n || seenNode.has(n)) return;
            seenNode.add(n);
            if (ts.isTypeNode(n) || ts.isTypeParameterDeclaration(n)) return;
            if (ts.isCallExpression(n) || ts.isNewExpression(n)) {
                const c = unwrap(n.expression);
                if (ts.isNewExpression(n)) V(n, `new ${txt(c)}(…)`, why);
                else if (!calleeOk(c)) V(n, `call ${txt(c).slice(0, 50)}(…)`, why);
                return;
            }
            if (ts.isTaggedTemplateExpression(n)) { V(n, "tagged template", why); return; }
            if (ts.isTemplateExpression(n)) V(n, "template literal (a string of the value)", why);
            if (ts.isBinaryExpression(n)) {
                const o = n.operatorToken.kind;
                if (RELATIONAL.has(o)) V(n, `comparison ${txt(n).slice(0, 60)}`, why);
                if (MODULO.has(o)) V(n, `modulo ${txt(n).slice(0, 60)}`, why);
                if (BITWISE.has(o)) V(n, `bitwise ${txt(n).slice(0, 60)}`, why);
                if (POWER.has(o)) V(n, `power ${txt(n).slice(0, 60)}`, why);
                // REVIEW (not a FAIL): arithmetic that is not a unit change can bound a number without any comparison
                if ((o === K.SlashToken || o === K.SlashEqualsToken) && !isConst(n.right)) R(n, `division by a non-constant ${txt(n).slice(0, 60)} (r01's soft bound has this shape)`);
                if ((o === K.AsteriskToken || o === K.AsteriskEqualsToken) && !isConst(n.left) && !isConst(n.right)) R(n, `product of two non-constants ${txt(n).slice(0, 60)}`);
            }
            if (ts.isPrefixUnaryExpression(n) && n.operator === K.TildeToken) V(n, `bitwise ${txt(n).slice(0, 60)}`, why);
            if (ts.isPropertyAssignment(n)) { if (ts.isComputedPropertyName(n.name)) walk(n.name.expression, why); walk(n.initializer, why); return; }
            if (ts.isShorthandPropertyAssignment(n)) { walk(n.name, why); return; }
            if (ts.isIdentifier(n)) {
                if (n.text === "undefined") return;
                classify(n, why);
                walkKey(n.text, why, n);
                return;
            }
            if (n.kind === K.ThisKeyword) return;
            if (ts.isPropertyAccessExpression(n)) {
                const k = "." + n.name.text;
                if (n.name.text === "length") V(n, `.length ${txt(n).slice(0, 60)}`, why);
                if (!defs.has(k) && unwrap(n.expression).kind === K.ThisKeyword) U(n, `${txt(n)}: no write in this file`);
                walkKey(k, why);
                walkKey("[]", why);
                walk(n.expression, why);
                return;
            }
            if (ts.isElementAccessExpression(n)) {
                const a = n.argumentExpression;
                if (a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a))) walkKey("." + a.text, why);
                else if (!(a && ts.isNumericLiteral(a))) V(n, `computed index ${txt(n).slice(0, 60)}`, why);
                walkKey("[]", why);
                walk(n.expression, why);
                walk(a, why);
                return;
            }
            ts.forEachChild(n, (c) => walk(c, why));
        };
        walk(arg, "sink argument");
        // REVIEW: a call that runs before the sink in its function can throw and skip the step (r03)
        {
            const fn = enclosingFn(sinkNode);
            const chain = [];
            for (let c = sinkNode, p = sinkNode.parent; p && p !== fn; c = p, p = p.parent) chain.push([c, p]);
            for (const [c, p] of chain) {
                const list = ts.isBlock(p) || ts.isSourceFile(p) || ts.isCaseClause(p) || ts.isDefaultClause(p) ? p.statements : null;
                if (!list) continue;
                for (const st of list.slice(0, list.indexOf(c))) (function v(n) {
                    if (ts.isFunctionLike(n) || ts.isClassLike(n)) return;
                    const ce = unwrap(n.expression ?? n);
                    const pure = ts.isCallExpression(n) && (/^Math\.\w+$/.test(txt(ce).replace(/\s+/g, "")) || (ts.isPropertyAccessExpression(ce) && SINKS.has(ce.name.text)));
                    if (ts.isCallExpression(n) && !pure && !calleeOk(ce) && !isRaf(ce)) R(n, `call before the sink ${txt(n.expression).slice(0, 40)}(…) may throw and skip the step (r03)`);
                    ts.forEachChild(n, v);
                })(st);
            }
        }
        for (const [g, loop] of controlDeps(sinkNode)) {
            if (loop && ts.isBinaryExpression(g) && RELATIONAL.has(g.operatorToken.kind)) {
                walk(g.left, `loop guard of the sink at :${line(g)}`);
                walk(g.right, `loop guard of the sink at :${line(g)}`);
            } else walk(g, `guard of the sink at :${line(g)}`);
        }
        return { violations, unresolved, review };
    }

    const out = { file: rel, sinks: [], hand_rolled: hand, indirect_sinks: indirect, review: [] };
    if (!sinks.length) (function v(n) {
        if (ts.isCallExpression(n) && /^Math\.exp$/.test(txt(n.expression).replace(/\s+/g, ""))) out.review.push({ line: line(n), what: "Math.exp in a file with no SpringProgress step: a hand-written closed form (r02) steps on its own clock here" });
        if (ts.isCallExpression(n) && isRaf(unwrap(n.expression))) out.review.push({ line: line(n), what: "requestAnimationFrame loop in a file with no SpringProgress step: anything it moves steps on its own dt (r02, r05)" });
        ts.forEachChild(n, v);
    })(sf);
    for (const s of sinks) {
        const r = slice(s.arg, s.node);
        out.sinks.push({ line: line(s.node), call: txt(s.node).slice(0, 90), pass: !r.violations.length && !r.unresolved.length, ...r });
    }
    out.pass = out.sinks.every((s) => s.pass) && hand.length === 0 && indirect.length === 0;
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

const wave = fs.readFileSync(path.join(ROOT, "docs/tranches/BL/waves/W-F.1.md"), "utf8");
const g4line = wave.split("\n").find((l) => /const g4 = grepSrc\(/.test(l));
const G4 = new RegExp(g4line.match(/grepSrc\(\/(.*)\/\);/)[1]);
const g4hits = (file) => scriptOf(file).split("\n").map((l, i) => [i + 1, l]).filter(([, l]) => G4.test(l)).map(([i]) => i);

const OUT = { tool: "amend6/tools/dtgate.mjs", F1_G4_regex_from_wave: G4.source, wave_line: wave.split("\n").indexOf(g4line) + 1 };
const files = walkDir(path.join(ROOT, "src"));
const all = files.map((f) => analyse(f, path.relative(ROOT, f)));
const rows = all.filter((r) => r.sinks.length || r.hand_rolled.length || r.indirect_sinks.length);
const reviewOf = (r) => r.review.concat(r.sinks.flatMap((s) => s.review)).map((x) => `${r.file}:${x.line} ${x.what}`);
OUT.head = { files_scanned: files.length, rows, gate_pass: rows.every((r) => r.pass), review: all.flatMap(reviewOf) };

OUT.plants = {};
OUT.providers = {};
for (const p of process.argv.slice(3)) {
    const head = fs.readFileSync(p, "utf8").split("\n")[0].replace(/^\/\/\s*/, "");
    const r = analyse(p, path.relative(HERE, p));
    const m = head.match(/^EXPECT (PASS|FAIL|RESIDUAL)/);
    const key = path.relative(HERE, p);
    if (!m) { OUT.providers[key] = { head, gate_pass: r.pass, sinks: r.sinks.length }; continue; }
    const expectGate = m[1] !== "FAIL";
    OUT.plants[key] = { expect: head, expect_class: m[1], gate_pass: r.pass, as_expected: r.pass === expectGate, F1_G4_pass: g4hits(p).length === 0, review: reviewOf(r).map((x) => x.replace(/^[^:]+:/, "")), detail: r };
}
const pv = Object.values(OUT.plants);
OUT.tally = {
    plants: pv.length,
    as_expected: pv.filter((v) => v.as_expected).length,
    by_class: Object.fromEntries(["PASS", "FAIL", "RESIDUAL"].map((c) => [c, { n: pv.filter((v) => v.expect_class === c).length, gate_pass: pv.filter((v) => v.expect_class === c && v.gate_pass).length }])),
    F1_G4_passes: pv.filter((v) => v.F1_G4_pass).length,
    residual_with_review_hit: pv.filter((v) => v.expect_class === "RESIDUAL" && v.review.length).length,
    pass_plants_with_review_hit: pv.filter((v) => v.expect_class === "PASS" && v.review.length).map((v) => v.expect.slice(0, 40)),
};
const outPath = process.env.DTGATE_OUT ? path.resolve(HERE, process.env.DTGATE_OUT) : path.join(HERE, "amend6/data/dtgate6.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(OUT, null, 1));
const why = (d) => d.sinks.flatMap((s) => s.violations.map((x) => `${x.line} ${x.what}`).concat(s.unresolved.map((u) => `${u.line} UNRESOLVED ${u.what}`))).concat(d.hand_rolled.map((h) => `hand ${h.line}`), d.indirect_sinks.map((x) => `${x.line} ${x.what}`));
console.log(JSON.stringify({
    head_gate_pass: OUT.head.gate_pass,
    head_rows: OUT.head.rows.map((r) => ({ file: r.file, pass: r.pass, why: why(r).slice(0, 4) })),
    head_review: OUT.head.review,
    plants: Object.fromEntries(Object.entries(OUT.plants).map(([k, v]) => [path.basename(k), [v.expect_class, v.gate_pass ? "gate PASS" : "gate FAIL", v.as_expected ? "ok" : "UNEXPECTED", why(v.detail).slice(0, 3)]])),
    providers: OUT.providers,
    tally: OUT.tally,
}, null, 1));
