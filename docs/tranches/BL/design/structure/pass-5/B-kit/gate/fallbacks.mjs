// fallbacks.mjs — clause B17 of the D1-B gate (LAW §10): no masking fallback. A primary works or
// fails loud (the edict: "no masking fallbacks"). Read from the syntax of every script in the five
// zones and the root configs; the gate (seal.mjs) puts each line this returns under B17.
// Pass 5 reads every shape S-35 found live, on any path, literal or parameter:
//  (a) a missing-file fallback: a guard or a ternary that hands back an empty value when
//      `existsSync(p)` says the file is absent. The negative guard (`if (!existsSync(p))
//      return x`), the positive guard (`if (existsSync(p)) return read(p); return x`, the
//      fall-through `return x` or an `else` that returns it, or the implicit `undefined` at
//      a function's end), and the ternary (`existsSync(p) ? read(p) : x`), where the live
//      arm calls something (reads, parses) and the other hands back a value. The value is
//      silent when it is nothing, a nullish or empty literal, or a value the code was
//      handed (an identifier: an accumulator, the input, the text it would have replaced).
//      A record that names the absence reports it, and `false` is a predicate's answer;
//  (b) a swallowed read: `try { read } catch { return x }` whose handler is that one
//      silent return, or `try { read } catch {}` whose handler is empty (comments are not
//      statements: the error is dropped and the code runs on as if the read had found
//      nothing), where `read` is an fs read (`readFileSync`, `readFile`, `readdirSync`);
//      or a `try` that loads a module (`import(…)`) whose handler does not throw. A `stat`
//      is a probe, like `existsSync`: a predicate that answers "absent" is an answer, not
//      a fallback;
//  (c) a swallowed module load: `.catch(h)` or `.then(ok, h)` whose handler never throws,
//      on a chain that starts at `import(…)` or at a call of a loader bound to a name.
//      A loader bound to a name is a local binding or a parameter whose value is a
//      function, called with no arguments: `const c = () => import(…); c().catch(…)`, or
//      `comps.map((c) => c().catch(…))` over route components. A declared function or an
//      import is an API, not a loader value, and is not read this way.
//  (d) a skipped suite: `describe.skipIf(!existsSync(p))`, `it.skipIf(…)`, `test.skipIf(…)`, or
//      `….runIf(existsSync(p))`: a suite that does not run when the file it judges is missing
//      reports nothing, which reads as a pass. A missing subject fails the suite.

/** Every masking fallback in the tree `T` (the floor's file set), one line each. */
export function maskingFallbacks(ts, T, zoneOf, zones) {
    const out = [];
    const put = (_clause, line) => out.push(line);
    const SCRIPT = /\.(ts|mts|cts|js|mjs|cjs|vue)$/;
    const unwrap = (x) => { while (x && (ts.isParenthesizedExpression(x) || ts.isAsExpression(x) || ts.isNonNullExpression(x) || ts.isAwaitExpression(x))) x = x.expression; return x; };
    const calleeName = (n) => (ts.isIdentifier(n.expression) ? n.expression.text : ts.isPropertyAccessExpression(n.expression) ? n.expression.name.text : null);
    const isExists = (n) => ts.isCallExpression(n) && calleeName(n) === "existsSync";
    // the guard's condition: `!existsSync(p)`, or an `||` chain holding one (`!existsSync(a) || !existsSync(b)`)
    const missingGuard = (x) => { x = unwrap(x); if (ts.isPrefixUnaryExpression(x) && x.operator === ts.SyntaxKind.ExclamationToken) return isExists(unwrap(x.operand)); return ts.isBinaryExpression(x) && x.operatorToken.kind === ts.SyntaxKind.BarBarToken && (missingGuard(x.left) || missingGuard(x.right)); };
    // the positive form: `existsSync(p)`, or an `&&` chain holding one
    const presentGuard = (x) => { x = unwrap(x); if (isExists(x)) return true; return ts.isBinaryExpression(x) && x.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken && (presentGuard(x.left) || presentGuard(x.right)); };
    const silentValue = (x) => { if (!x) return true; x = unwrap(x);
        if (ts.isIdentifier(x) || x.kind === ts.SyntaxKind.NullKeyword) return true;
        if (ts.isStringLiteral(x) || ts.isNoSubstitutionTemplateLiteral(x)) return x.text === "";
        if (ts.isArrayLiteralExpression(x)) return x.elements.length === 0;
        if (ts.isObjectLiteralExpression(x)) return x.properties.length === 0;
        if (ts.isVoidExpression(x)) return true;
        return false; };
    const returnOf = (st) => (ts.isReturnStatement(st) ? st : ts.isBlock(st) && st.statements.length === 1 && ts.isReturnStatement(st.statements[0]) ? st.statements[0] : null);
    const onlyReturn = (st) => { const r = returnOf(st); return !!r && silentValue(r.expression); };
    const endsInReturn = (st) => ts.isReturnStatement(st) || (ts.isBlock(st) && st.statements.length > 0 && ts.isReturnStatement(st.statements.at(-1)));
    const isFnBody = (b) => ts.isBlock(b) && b.parent && (ts.isFunctionDeclaration(b.parent) || ts.isFunctionExpression(b.parent) || ts.isArrowFunction(b.parent) || ts.isMethodDeclaration(b.parent));
    const isImportCall = (n) => ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword;
    const FS_READ = new Set(["readFileSync", "readFile", "readdirSync", "readdir", "openSync", "readJsonSync", "readJson"]);
    const isFsRead = (n) => ts.isCallExpression(n) && FS_READ.has(calleeName(n));
    const has = (n, pred) => { let hit = false; const v = (x) => { if (hit) return; if (pred(x)) hit = true; else ts.forEachChild(x, v); }; v(n); return hit; };
    const throws = (n) => !!n && has(n, ts.isThrowStatement);
    const isFnValue = (x) => { x = unwrap(x); return !!x && (ts.isArrowFunction(x) || ts.isFunctionExpression(x)); };
    for (const f of T.files) {
        const z = zoneOf(f);
        if (!(zones.includes(z) || z === "root") || !SCRIPT.test(f) || /\.d\.[mc]?ts$/.test(f)) continue;
        const text = T.read(f);
        if (text === null || text === undefined) throw new Error(`seal B17: ${f} is unreadable`);
        const blocks = f.endsWith(".vue") ? [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => ({ code: m[1], off: text.slice(0, m.index + m[0].indexOf(">") + 1).split("\n").length - 1 })) : [{ code: text, off: 0 }];
        for (const { code, off } of blocks) {
            const sf = ts.createSourceFile(f, code, ts.ScriptTarget.Latest, true);
            const at = (n) => `${f}:${sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1 + off}`;
            // names this file binds to a function value: a local `const c = () => …` or any
            // parameter (a callback's argument); a declared function or an import is an API
            const valueNames = new Set(), apiNames = new Set();
            const bind = (n) => {
                if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) (isFnValue(n.initializer) ? valueNames : apiNames).add(n.name.text);
                if (ts.isParameter(n) && ts.isIdentifier(n.name)) valueNames.add(n.name.text);
                if ((ts.isFunctionDeclaration(n) || ts.isImportSpecifier(n) || ts.isImportClause(n) || ts.isNamespaceImport(n)) && n.name) apiNames.add(n.name.text);
                ts.forEachChild(n, bind);
            };
            bind(sf);
            const loaderCall = (x) => { x = unwrap(x); return ts.isCallExpression(x) && x.arguments.length === 0 && ts.isIdentifier(x.expression) && valueNames.has(x.expression.text) && !apiNames.has(x.expression.text); };
            const loadChain = (n) => { for (let x = n; x; ) { if (isImportCall(x) || loaderCall(x)) return true; if (ts.isCallExpression(x) || ts.isPropertyAccessExpression(x) || ts.isParenthesizedExpression(x) || ts.isAwaitExpression(x)) x = x.expression; else return false; } return false; };
            const visit = (n) => {
                // (a) the missing-file fallback: negative guard, positive guard, ternary
                if (ts.isIfStatement(n) && missingGuard(n.expression) && onlyReturn(n.thenStatement)) put("B17", `${at(n)} returns when a file is missing (a masking fallback: read it and let the read fail, or throw)`);
                if (ts.isIfStatement(n) && presentGuard(n.expression) && endsInReturn(n.thenStatement) && has(n.thenStatement, ts.isCallExpression)) {
                    let silent = false;
                    if (n.elseStatement) silent = onlyReturn(n.elseStatement);
                    else if (ts.isBlock(n.parent)) { const i = n.parent.statements.indexOf(n), next = n.parent.statements[i + 1]; silent = next ? onlyReturn(next) : isFnBody(n.parent); }
                    if (silent) put("B17", `${at(n)} reads a file only when it exists and returns an empty value otherwise (a masking fallback: read it and let the read fail, or throw)`);
                }
                if (ts.isConditionalExpression(n) && ((presentGuard(n.condition) && silentValue(n.whenFalse) && has(n.whenTrue, ts.isCallExpression)) || (missingGuard(n.condition) && silentValue(n.whenTrue) && has(n.whenFalse, ts.isCallExpression)))) put("B17", `${at(n)} falls back to an empty value when a file is missing (a ternary masking fallback)`);
                // (b) the swallowed read
                if (ts.isTryStatement(n) && n.catchClause && !throws(n.catchClause.block)) {
                    const cb = n.catchClause.block;
                    if (has(n.tryBlock, isImportCall)) put("B17", `${at(n)} swallows a failed module load (try/catch without a throw)`);
                    else if (has(n.tryBlock, isFsRead) && (cb.statements.length === 0 || (cb.statements.length === 1 && ts.isReturnStatement(cb.statements[0]) && silentValue(cb.statements[0].expression)))) put("B17", `${at(n)} swallows a failed read (try/catch that ${cb.statements.length ? "hands back an empty value" : "drops the error"})`);
                }
                // (d) the skipped suite: skipIf on a missing file, runIf on a present one
                if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && n.arguments.length >= 1) {
                    const m = n.expression.name.text;
                    if ((m === "skipIf" && missingGuard(n.arguments[0])) || (m === "runIf" && presentGuard(n.arguments[0]))) put("B17", `${at(n)} skips a suite when a file is missing (a masking fallback: a missing subject fails the suite)`);
                }
                // (c) the swallowed load: .catch(h), .then(ok, h), on import(…) or a named loader
                if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && loadChain(n.expression.expression)) {
                    const m = n.expression.name.text;
                    if (m === "catch" && !throws(n.arguments[0])) put("B17", `${at(n)} swallows a failed module load (.catch without a throw)`);
                    if (m === "then" && n.arguments.length >= 2 && !throws(n.arguments[1])) put("B17", `${at(n)} swallows a failed module load (.then with a rejection handler that does not throw)`);
                }
                ts.forEachChild(n, visit);
            };
            visit(sf);
        }
    }

    return out;
}
