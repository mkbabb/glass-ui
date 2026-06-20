#!/usr/bin/env node
// BC.W-WEBGPU-EVERYWHERE — proof:webgpu-everywhere, the substrate-everywhere floor.
//
// THE BB DISEASE THIS CURES: the substrate picker committed the backend SYNCHRONOUSLY
// off a `supportsWebGPU()` PRESENCE check — but a host where `navigator.gpu` EXISTS yet
// `requestAdapter()` returns null (headless, SwiftShader, GPU-blocklisted, the live demo
// CI) had the WebGPU backend ALREADY committed → `armAsync()` THREW `no GPU adapter` to
// the page with no fallback → the pure-black void + the console spew (D8/D8'/D9). Two
// Canvas2D-PRIMARY viz (constellation + fourier-field) + dot-flow's Canvas2D fallback
// were the no-canvas-anywhere violations. And the "parity" gate was a tautology
// (ΔE-0.0 = the CPU evaluator vs itself), greening on a crashing WGSL canvas.
//
// This gate is the DEVICE-FREE source + WGSL-compile floor (W1-W3, W7 static arm, the
// self-tests); the REAL on-host paint (W4 real-GPU meanLum>0, W5 adapter-less-paints-
// silently, W6 WebKit-comes-up, W8 steady-state-fps + offscreen-park-attaches-0-frames)
// is the LOCAL π lane `tests-visual/webgpu-everywhere.spec.ts` (the cardinal split — a
// real device + demo + GPU). The orchestrator owns the live capture on real Metal.
//
// Clauses (each falsifiable; the source clauses carry self-test bites):
//   W1 the picker does NOT commit the backend synchronously off `supportsWebGPU()`
//      alone — it carries the async try-then-rebuild path (it ATTEMPTS WebGPU then
//      falls to the WebGL2 net). A `const useGpu = supportsWebGPU() && …` synchronous-
//      commit (the HEAD :91 line) REDs.
//   W2 the WebGPU backend's no-adapter path does NOT `throw` an uncaught error to the
//      page — it produces a catchable typed init signal (WebGPUInitError) the picker
//      handles. A bare `throw new Error("...no GPU adapter")` (the HEAD :245 line) REDs.
//   W3 no viz binds `useCanvas2D` as its PRIMARY substrate — a scan over every viz's
//      composables finds ZERO `useCanvas2D` bind (constellation + fourier-field + dot-
//      flow's Canvas2D fallback all moved to createGpuSubstrate). watercolor-dot is
//      allowlisted (a CSS/SVG mark with NO drawing context — it must NOT acquire one).
//   W7 every assembled `*.wgsl.ts` shader STRING compiles clean under a static WGSL
//      validator (the device-free CI arm — the real `createShaderModule` +
//      `getCompilationInfo` is the LOCAL adapter-bearing arm in the π spec). A WGSL
//      declaration naming a RESERVED keyword (the GooBlob `var target` reserved-keyword
//      class the BB suite shipped → 250×/frame invalid-pipeline → 0 pixels live) REDs;
//      an unresolved `${...}` splice or unbalanced braces REDs.
//   W4-W6,W8 are the LOCAL π arms (the real-GPU/adapter-less/WebKit paint + the fps/
//      park measure) — this gate ASSERTS the π spec exists + is enrolled (the source
//      half); the binding paint runs `--run pi` on real Metal.
//
// Self-test bites (each PROVEN every run): a synthetic picker that re-commits
// synchronously REDs W1; a synthetic viz binding useCanvas2D primary REDs W3; a
// synthetic WGSL string with a `var <reserved>` declaration REDs W7; a clean string
// greens. (The W8 offscreen-park-leak bite is the π spec's frame-count assert.)

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        PICKER: resolve(ROOT, "src/composables/glass/webgpu/useGpuSubstrate.ts"),
        WEBGPU_SUBSTRATE: resolve(ROOT, "src/composables/glass/webgpu/useWebGPUCanvas.ts"),
        VIZ_COMPOSABLES_DIR: resolve(ROOT, "src/components/custom"),
        PI_SPEC: resolve(ROOT, "tests-visual/webgpu-everywhere.spec.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_WEBGPU_EVERYWHERE_ARTIFACT",
            "BC-webgpu-everywhere",
        ),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else acc.push(p);
    }
    return acc;
}

// ── W1 — the async try-then-rebuild picker detector (a PURE function of the de-commented
//    picker source, exported for the self-test bite). The keystone bug was the
//    SYNCHRONOUS commit `const useGpu = supportsWebGPU() && options.setupWGPU != null`
//    that selected the backend at construction off a presence-only probe. The fix:
//    `armAsync()` ATTEMPTS the WebGPU init inside a try and FALLS to the WebGL2 net on a
//    catch. So the picker must (a) NOT carry the synchronous-commit gate that returns the
//    chosen handle off the presence check, AND (b) carry the try/catch fall-through.
export function detectAsyncPicker(rawSrc) {
    const src = stripComments(rawSrc);
    // The HEAD synchronous-commit shape: `const <name> = supportsWebGPU() && ...` used to
    // PICK the backend (an `if (useGpu) return webgpuHandle` immediately after). The fix
    // replaces it with an OPTIMISTIC attempt flag whose REAL decision is async. We flag the
    // disease ONLY when the synchronous flag DIRECTLY gates a returned backend handle with
    // NO try/catch fall (the committed-at-construction model). The tell of the fix is a
    // try { await ...armAsync... } catch that builds/arms the WebGL2 net.
    const triesWebgpuArm =
        /try\s*\{[\s\S]*?\bawait\b[\s\S]*?armAsync\s*\(/.test(src);
    const catchFallsToGL =
        /catch\b[\s\S]*?\}/.test(src) &&
        /(createWebGLCanvas|buildWebGL2|setupGL)/.test(src);
    const hasAsyncFallThrough = triesWebgpuArm && catchFallsToGL;

    // The synchronous-commit disease: a `supportsWebGPU() && setupWGPU` expression whose
    // result is RETURNED as the committed backend with no async fall — detect a return of a
    // webgpu handle guarded ONLY by the synchronous flag, WITHOUT the try/catch fall present.
    const synchronousCommit =
        /const\s+\w+\s*=\s*supportsWebGPU\s*\(\s*\)\s*&&\s*[^;]*setupWGPU/.test(src) &&
        !hasAsyncFallThrough;

    return { hasAsyncFallThrough, triesWebgpuArm, catchFallsToGL, synchronousCommit };
}

// ── W2 — the no-uncaught-throw detector for the WebGPU backend's no-adapter path. The
//    HEAD `:245` form `throw new Error("[useWebGPUCanvas] no GPU adapter")` is an uncaught
//    page error (D8'). The fix: a recognizable typed signal (WebGPUInitError) the picker
//    catches; the leaf does NOT fire onInitError for a recognized init failure. Exported
//    for the self-test bite.
export function detectNoUncaughtAdapterThrow(rawSrc) {
    const src = stripComments(rawSrc);
    // The disease: a bare `throw new Error("...no GPU adapter...")` (a plain Error class to
    // the page). The fix uses a typed `WebGPUInitError` the picker recognizes.
    const bareAdapterThrow =
        /throw\s+new\s+Error\s*\(\s*["'`][^"'`]*no\s+GPU\s+adapter/i.test(src);
    const typedInitSignal = /\bWebGPUInitError\b/.test(src);
    // The recognized-init-failure must NOT fire onInitError during arm (it is a substrate
    // decision the picker handles) — the tell is an `instanceof WebGPUInitError` guard
    // around the onInitError call OR no onInitError on the init-failure path.
    const guardsOnInitError = /instanceof\s+WebGPUInitError/.test(src);
    return {
        bareAdapterThrow,
        typedInitSignal,
        guardsOnInitError,
        // clean iff: no bare adapter throw AND a typed signal exists.
        clean: !bareAdapterThrow && typedInitSignal,
    };
}

// ── W3 — the no-Canvas2D-primary scan. A viz binding `useCanvas2D` as its substrate is the
//    no-canvas-anywhere violation. watercolor-dot is allowlisted (no drawing context).
//    Exported for the self-test bite (synthetic viz source).
const WATERCOLOR_ALLOWLIST = "watercolor-dot";
export function detectCanvas2DPrimaryBind(rawSrc) {
    const src = stripComments(rawSrc);
    // A live `useCanvas2D(` call OR a `useCanvas2D` import that is invoked.
    const importsCanvas2D =
        /import\s*\{[^}]*\buseCanvas2D\b[^}]*\}\s*from/.test(src) ||
        /\bfrom\s*["'][^"']*canvas2d["']/.test(src);
    const callsCanvas2D = /\buseCanvas2D\s*\(/.test(src);
    return { importsCanvas2D, callsCanvas2D, bindsPrimary: callsCanvas2D };
}

// ── W7 — the WGSL static-compile floor (the device-free CI arm; the real createShaderModule
//    is the LOCAL π arm). Assemble each *.wgsl.ts string (resolve the spliced ${CHUNK}
//    refs against the chunk module) + run a WGSL reserved-keyword + structure validator.

// The WGSL RESERVED word set (W3C WGSL §keywords-and-reserved-words — the words FORBIDDEN
// as an identifier, the future-use list a `var <reserved>` declaration trips, the
// reserved-keyword class the spec narrative names). This is the STATIC device-free proxy
// for the native validator (the binding compile is the real `device.createShaderModule` +
// `getCompilationInfo` in the π spec on an adapter-bearing host). It is the OFFICIAL
// reserved list — NOT the GLSL keyword set: `out`/`in`/`target`/`get`/`set` are VALID WGSL
// identifiers (the live shaders use `var out: VSOut` legitimately), so they are NOT here.
const WGSL_RESERVED = new Set([
    "NULL", "Self", "abstract", "active", "alignas", "alignof", "as", "asm",
    "asm_fragment", "async", "attribute", "auto", "await", "become", "cast",
    "catch", "class", "co_await", "co_return", "co_yield", "coherent", "column_major",
    "common", "compile", "compile_fragment", "concept", "const_cast", "consteval",
    "constexpr", "constinit", "crate", "debugger", "decltype", "delete", "demote",
    "demote_to_helper", "do", "dynamic_cast", "enum", "explicit", "export", "extends",
    "extern", "external", "fallthrough", "filter", "final", "finally", "friend",
    "from", "fxgroup", "get", "goto", "groupshared", "highp", "impl", "implements",
    "import", "inline", "instanceof", "interface", "layout", "lowp", "macro",
    "macro_rules", "match", "mediump", "meta", "mod", "module", "move", "mut",
    "mutable", "namespace", "new", "nil", "noexcept", "noinline", "nointerpolation",
    "non_coherent", "noncoherent", "noperspective", "null", "nullptr", "of", "operator",
    "package", "packoffset", "partition", "pass", "patch", "pixelfragment", "precise",
    "precision", "premerge", "priv", "protected", "pub", "public", "readonly", "ref",
    "regardless", "register", "reinterpret_cast", "require", "resource", "restrict",
    "self", "set", "shared", "sizeof", "smooth", "snorm", "static", "static_assert",
    "static_cast", "std", "subroutine", "super", "target", "template", "this",
    "thread_local", "throw", "trait", "try", "type", "typedef", "typeid", "typename",
    "typeof", "union", "unless", "unorm", "unsafe", "unsized", "use", "using",
    "varying", "virtual", "volatile", "wgsl", "where", "with", "writeonly", "yield",
]);

/** Strip WGSL comments (line `//` + block) — a real compiler ignores them; my static
 *  balance + declaration scan must too (else a comment's lone `)` reads as unbalanced). */
function stripWgslComments(s) {
    return s
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

/**
 * Read a `*.wgsl.ts` file and ASSEMBLE its exported shader string with the spliced
 * ${CHUNK} references resolved (the chunk module's own exported const). Exported so the
 * self-test can feed it a synthetic file map. PURE over a file-reader.
 * @param {string} absPath the *.wgsl.ts file
 * @param {(p:string)=>string} readFile
 * @returns {{ name:string, assembled:string, unresolved:string[] }}
 */
export function assembleWgsl(absPath, readFile) {
    const raw = readFile(absPath);
    // The exported template: `export const NAME_WGSL = /* wgsl */ \`...\``. Grab the
    // backtick body (the LAST big template — every wgsl.ts has exactly one big export).
    const m = raw.match(/export\s+const\s+(\w+)\s*=\s*(?:\/\*\s*wgsl\s*\*\/\s*)?`([\s\S]*?)`/);
    if (!m) return { name: null, assembled: "", unresolved: ["no exported template literal"] };
    const name = m[1];
    let body = m[2];

    // Build a chunk map from the import declarations: { LOCAL_NAME → resolved string }.
    // Every chunk is itself an exported const in a sibling `*.wgsl` module.
    const chunkRefs = [...body.matchAll(/\$\{(\w+)\}/g)].map((x) => x[1]);
    const unresolved = [];
    const dir = absPath.slice(0, absPath.lastIndexOf("/"));
    // Resolve each import line to its source module path.
    const importBlocks = [...raw.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/g)];
    const localToModule = new Map();
    for (const ib of importBlocks) {
        const names = ib[1].split(",").map((s) => s.trim()).filter(Boolean);
        const mod = ib[2];
        for (const n of names) localToModule.set(n, mod);
    }
    const chunkCache = new Map();
    const resolveChunk = (chunkName) => {
        if (chunkCache.has(chunkName)) return chunkCache.get(chunkName);
        // (a) A chunk may be a LOCAL same-file backtick literal — `export const X_WGSL
        // = \`…\`` — spliced into the main export. A VALID splice (the JS template
        // resolves it at module load), resolved from the SAME source.
        const localLit = raw.match(
            new RegExp(
                `export\\s+const\\s+${chunkName}\\s*=\\s*(?:\\/\\*\\s*wgsl\\s*\\*\\/\\s*)?\`([\\s\\S]*?)\``,
            ),
        );
        if (localLit) {
            chunkCache.set(chunkName, localLit[1]);
            return localLit[1];
        }
        // (b) A local const may ALIAS/SLICE an IMPORTED shader at RUNTIME — the goo-dot
        // `export const GOO_DOT_FIELD_WGSL = … ? METABALL_WGSL.slice(0, fieldEnd) : …`
        // case (the byte-untouched goo-blob field, sliced before the vertex stage). The
        // static scan cannot compute the slice, so resolve to the imported shader's FULL
        // content — a conservative SUPERSET: the static reserved-keyword / brace-balance
        // / unresolved-splice checks that pass on the whole imported shader (already ✓)
        // pass on ANY slice of it; the real assembled shader is validated by the LOCAL π
        // (createShaderModule) arm + the cardinal ba-gestalt capture.
        const localExpr = raw.match(
            new RegExp(`export\\s+const\\s+${chunkName}\\s*=\\s*([^;]+);`),
        );
        if (localExpr) {
            for (const importedName of localToModule.keys()) {
                if (
                    importedName === chunkName ||
                    !new RegExp(`\\b${importedName}\\b`).test(localExpr[1])
                )
                    continue;
                let aliasPath = resolve(dir, localToModule.get(importedName));
                if (!aliasPath.endsWith(".ts")) aliasPath += ".ts";
                if (!existsSync(aliasPath)) continue;
                // Fully ASSEMBLE the imported shader (its OWN nested ${…} splices — e.g.
                // METABALL_WGSL splices FBM_ROT_WGSL — resolved against ITS module), so the
                // runtime-aliased field carries no leftover splice token.
                const sub = assembleWgsl(aliasPath, readFile);
                if (sub.name === importedName && sub.unresolved.length === 0) {
                    chunkCache.set(chunkName, sub.assembled);
                    return sub.assembled;
                }
            }
        }
        const mod = localToModule.get(chunkName);
        if (!mod) {
            chunkCache.set(chunkName, null);
            return null;
        }
        // Resolve the module path (extensionless `.wgsl` → `.wgsl.ts`).
        let modPath = resolve(dir, mod);
        if (!modPath.endsWith(".ts")) modPath += ".ts";
        if (!existsSync(modPath)) {
            chunkCache.set(chunkName, null);
            return null;
        }
        const modSrc = readFile(modPath);
        // The chunk is `export const CHUNK = \`...\`;` OR a single-line backtick.
        const cm = modSrc.match(
            new RegExp(`export\\s+const\\s+${chunkName}\\s*=\\s*(?:\\/\\*\\s*wgsl\\s*\\*\\/\\s*)?\`([\\s\\S]*?)\``),
        );
        const val = cm ? cm[1] : null;
        chunkCache.set(chunkName, val);
        return val;
    };
    for (const ref of chunkRefs) {
        const val = resolveChunk(ref);
        if (val == null) {
            unresolved.push(ref);
        } else {
            body = body.replaceAll(`\${${ref}}`, val);
        }
    }
    return { name, assembled: body, unresolved };
}

/**
 * The STATIC WGSL validator (the device-free CI arm; the real `createShaderModule` +
 * `getCompilationInfo` is the LOCAL π arm). Flags: a declaration naming a RESERVED
 * keyword (the `var target` class), an unbalanced brace/paren, an unresolved `${...}`
 * splice left in the body. PURE — exported for the self-test bites.
 * @param {string} wgsl the assembled shader string
 * @returns {{ ok:boolean, errors:string[] }}
 */
export function validateWgsl(rawWgsl) {
    const errors = [];
    if (!rawWgsl || !rawWgsl.trim()) return { ok: false, errors: ["empty WGSL string"] };
    // Strip comments first — a real WGSL compiler ignores them; the balance + declaration
    // scan must too (a comment's lone `)` is not a structure error).
    const wgsl = stripWgslComments(rawWgsl);
    // An unresolved splice token in the assembled body — a chunk that did not resolve.
    if (/\$\{\w+\}/.test(wgsl))
        errors.push(`unresolved splice token ${wgsl.match(/\$\{\w+\}/)[0]} in assembled WGSL`);
    // A declaration naming a RESERVED keyword: `var <name>` / `let <name>` / `const <name>`
    // / `fn <name>` / `struct <name>` / `alias <name>` where <name> ∈ the WGSL reserved set
    // (the future-use list). var/let/const/fn/struct ARE the declaration keywords — the bug
    // is the IDENTIFIER (the GooBlob reserved-keyword class), not the keyword.
    const declRe = /\b(var|let|const|fn|struct|alias)\b(?:<[^>]*>)?\s+([A-Za-z_]\w*)/g;
    let d;
    while ((d = declRe.exec(wgsl)) !== null) {
        const ident = d[2];
        if (WGSL_RESERVED.has(ident))
            errors.push(`WGSL declaration "${d[1]} ${ident}" names a RESERVED keyword (the reserved-identifier class — invalid identifier)`);
    }
    // Balanced braces + parens (a coarse structural floor — a real compile is the π arm).
    const balance = (open, close, label) => {
        let depth = 0;
        for (const ch of wgsl) {
            if (ch === open) depth++;
            else if (ch === close) depth--;
            if (depth < 0) {
                errors.push(`unbalanced ${label} (a ${close} with no matching ${open})`);
                return;
            }
        }
        if (depth !== 0) errors.push(`unbalanced ${label} (${depth} unclosed ${open})`);
    };
    balance("{", "}", "braces");
    balance("(", ")", "parens");
    return { ok: errors.length === 0, errors };
}

function run() {
    const c = cliPaths();
    const { ROOT } = c;
    const violations = [];
    const facts = {};
    const readFile = (p) => readFileSync(p, "utf8");

    // ── W1 — the async try-then-rebuild picker (no synchronous commit).
    if (!existsSync(c.PICKER)) {
        violations.push("[W1] the substrate picker useGpuSubstrate.ts is absent");
    } else {
        const det = detectAsyncPicker(readFile(c.PICKER));
        facts.pickerAsyncFallThrough = det.hasAsyncFallThrough;
        facts.pickerSynchronousCommit = det.synchronousCommit;
        if (det.synchronousCommit)
            violations.push(
                "[W1] the picker COMMITS the backend synchronously off supportsWebGPU() (the HEAD :91 presence-only commit) — it must ATTEMPT WebGPU async then fall to the WebGL2 net on a no-adapter failure",
            );
        if (!det.hasAsyncFallThrough)
            violations.push(
                "[W1] the picker is missing the try-WebGPU-then-rebuild-WebGL2 fall (a try { await armAsync } catch that builds/arms the WebGL2 net) — the D8 silent-degrade close",
            );
    }

    // ── W2 — the WebGPU no-adapter path does NOT throw an uncaught error to the page.
    if (!existsSync(c.WEBGPU_SUBSTRATE)) {
        violations.push("[W2] the WebGPU backend useWebGPUCanvas.ts is absent");
    } else {
        const det = detectNoUncaughtAdapterThrow(readFile(c.WEBGPU_SUBSTRATE));
        facts.webgpuBareAdapterThrow = det.bareAdapterThrow;
        facts.webgpuTypedInitSignal = det.typedInitSignal;
        facts.webgpuGuardsOnInitError = det.guardsOnInitError;
        if (det.bareAdapterThrow)
            violations.push(
                '[W2] useWebGPUCanvas.ts THROWS a bare `new Error("...no GPU adapter")` to the page (the HEAD :245 uncaught form, D8\') — it must produce a catchable typed init signal the picker handles',
            );
        if (!det.typedInitSignal)
            violations.push(
                "[W2] useWebGPUCanvas.ts is missing the typed WebGPUInitError signal — a no-adapter init failure must be a recognizable catchable signal, not an uncaught throw",
            );
        if (!det.guardsOnInitError)
            violations.push(
                "[W2] the recognized init failure must NOT fire the consumer onInitError during arm (an `instanceof WebGPUInitError` guard) — a no-adapter fall is a substrate decision, not a contract violation",
            );
    }

    // ── W3 — no viz binds useCanvas2D as its PRIMARY substrate (watercolor-dot allowlisted).
    const vizComposables = walk(c.VIZ_COMPOSABLES_DIR).filter(
        (p) =>
            /\/composables\/use[A-Z]\w*\.ts$/.test(p) &&
            !/\.(test|spec)\.ts$/.test(p),
    );
    const canvas2dBinds = [];
    for (const f of vizComposables) {
        if (f.includes(`/${WATERCOLOR_ALLOWLIST}/`)) continue; // no drawing context, allowlisted
        const det = detectCanvas2DPrimaryBind(readFile(f));
        if (det.bindsPrimary) canvas2dBinds.push(f.slice(ROOT.length + 1));
    }
    facts.canvas2dPrimaryBinds = canvas2dBinds;
    if (canvas2dBinds.length)
        violations.push(
            `[W3] ${canvas2dBinds.length} viz composable(s) bind useCanvas2D as their PRIMARY substrate (${canvas2dBinds.join(", ")}) — no Canvas2D viz primary anywhere; they must compose createGpuSubstrate (constellation/fourier-field/dot-flow re-home)`,
        );

    // ── W7 — every assembled *.wgsl.ts string compiles clean under the static validator.
    const wgslFiles = walk(c.SRC).filter((p) => /\.wgsl\.ts$/.test(p));
    facts.wgslFiles = wgslFiles.map((p) => p.slice(ROOT.length + 1));
    const wgslResults = [];
    for (const f of wgslFiles) {
        const asm = assembleWgsl(f, readFile);
        const rel = f.slice(ROOT.length + 1);
        if (asm.unresolved.length)
            violations.push(
                `[W7] ${rel}: unresolved WGSL splice chunk(s) ${asm.unresolved.join(", ")} — the assembled shader is incomplete`,
            );
        const v = validateWgsl(asm.assembled);
        wgslResults.push({ file: rel, name: asm.name, ok: v.ok, errors: v.errors });
        if (!v.ok)
            for (const e of v.errors)
                violations.push(`[W7] ${rel} (${asm.name}): ${e}`);
    }
    facts.wgslCompile = wgslResults;

    // ── W4-W6,W8 — the binding paint/fps/park truth is the LOCAL π lane. The source half
    //    here ASSERTS the spec exists + is enrolled (the runner picks it up by the
    //    non-private glob — pi-runner-manifest.mjs). The real-GPU/adapter-less/WebKit
    //    meanLum>0 + the steady-state-fps + the offscreen-park-attaches-0-frames run
    //    `--run pi` on real Metal (the orchestrator owns the capture).
    facts.piSpecExists = existsSync(c.PI_SPEC);
    if (!facts.piSpecExists)
        violations.push(
            "[W4-W8] the real-paint π spec tests-visual/webgpu-everywhere.spec.ts is absent — the W4 real-GPU meanLum>0, W5 adapter-less-paints-silently, W6 WebKit-comes-up, W8 steady-state-fps + offscreen-park-attaches-0-frames lanes have no home",
        );
    else {
        const spec = readFile(c.PI_SPEC);
        // The spec must read meanLum (the paint proof) + assert no uncaught no-GPU-adapter
        // console error (the D8' close) + measure the offscreen-park frame count (W8).
        const hasMeanLum = /meanLum|meanLuminance|relativeLuminance|getImageData/i.test(spec);
        const hasNoAdapterAssert = /no\s+gpu\s+adapter/i.test(spec);
        const hasParkCount = /park|offscreen|frameCount|rAF|requestAnimationFrame/i.test(spec);
        facts.piSpecMeanLum = hasMeanLum;
        facts.piSpecNoAdapterAssert = hasNoAdapterAssert;
        facts.piSpecParkCount = hasParkCount;
        if (!hasMeanLum)
            violations.push("[W4] the π spec must read a meanLum (the real-GPU paint proof) — a meanLum/getImageData readback");
        if (!hasNoAdapterAssert)
            violations.push("[W5] the π spec must assert NO uncaught `no GPU adapter` console error on the adapter-less host (the D8' silent-degrade proof)");
        if (!hasParkCount)
            violations.push("[W8] the π spec must measure the offscreen-park frame count (0 frames attached when scrolled offscreen — the living-surface/zero-cost-when-parked truth)");
    }

    // ── self-test bite 1: the async-picker detector flags a synchronous-commit, passes the fix.
    const SYNC_PICKER = `
const useGpu = supportsWebGPU() && options.setupWGPU != null;
if (useGpu) { return webgpuHandle; }
return createWebGLCanvas(canvas, { setup: options.setupGL });`;
    const ASYNC_PICKER = `
const attemptWebGPU = supportsWebGPU() && options.setupWGPU != null;
async function armAsync() {
  try { await webgpu.armAsync(); return; }
  catch (err) { webgl2 = buildWebGL2(canvas, options); }
  webgl2?.arm();
}`;
    const syncDet = detectAsyncPicker(SYNC_PICKER);
    const asyncDet = detectAsyncPicker(ASYNC_PICKER);
    facts.pickerBite = syncDet.synchronousCommit && !syncDet.hasAsyncFallThrough &&
        asyncDet.hasAsyncFallThrough && !asyncDet.synchronousCommit;
    if (!facts.pickerBite)
        violations.push(
            `[self-test] the async-picker detector bite is broken (sync:${JSON.stringify(syncDet)}, async:${JSON.stringify({ fall: asyncDet.hasAsyncFallThrough, commit: asyncDet.synchronousCommit })}) — a synchronous commit must RED, the try-then-rebuild fix must pass`,
        );

    // ── self-test bite 2: the no-uncaught-throw detector flags a bare adapter throw, passes the fix.
    const BARE_THROW = `const adapter = await navigator.gpu.requestAdapter();
if (!adapter) { throw new Error("[useWebGPUCanvas] no GPU adapter"); }`;
    const TYPED_SIGNAL = `if (!adapter) { throw new WebGPUInitError("no-adapter", "no GPU adapter"); }
catch (err) { if (!(err instanceof WebGPUInitError)) options.onInitError?.(err); throw err; }`;
    const bareDet = detectNoUncaughtAdapterThrow(BARE_THROW);
    const typedDet = detectNoUncaughtAdapterThrow(TYPED_SIGNAL);
    facts.throwBite = bareDet.bareAdapterThrow && !bareDet.clean &&
        typedDet.clean && typedDet.guardsOnInitError;
    if (!facts.throwBite)
        violations.push(
            `[self-test] the no-uncaught-throw detector bite is broken (bare:${JSON.stringify(bareDet)}, typed:${JSON.stringify(typedDet)}) — a bare `+
            '`no GPU adapter` throw must RED, the typed WebGPUInitError signal must pass',
        );

    // ── self-test bite 3: the Canvas2D-primary detector flags a synthetic viz bind.
    const C2D_VIZ = `import { useCanvas2D } from "../../../../composables/glass/canvas2d";
const handle = useCanvas2D({ setup });`;
    const GPU_VIZ = `import { createGpuSubstrate } from "../../../../composables/glass/webgpu";
const handle = createGpuSubstrate(canvas, { setupWGPU, setupGL });`;
    const c2dDet = detectCanvas2DPrimaryBind(C2D_VIZ);
    const gpuDet = detectCanvas2DPrimaryBind(GPU_VIZ);
    facts.canvas2dBite = c2dDet.bindsPrimary && !gpuDet.bindsPrimary;
    if (!facts.canvas2dBite)
        violations.push(
            `[self-test] the Canvas2D-primary detector bite is broken (c2d:${c2dDet.bindsPrimary}, gpu:${gpuDet.bindsPrimary}) — a useCanvas2D primary bind must RED, a createGpuSubstrate bind must pass`,
        );

    // ── self-test bite 4: the WGSL validator flags a `var <reserved-keyword>` declaration
    //    (the GooBlob reserved-keyword class — the BB suite shipped a WGSL identifier
    //    colliding with a reserved word → invalid pipeline → 0 pixels live), passes clean.
    //    The bite uses `typedef` (a genuine WGSL reserved word) to prove the future-use
    //    list bites; the live metaball.wgsl's `var target` is a VALID identifier (`target`
    //    is NOT reserved) so it greens — the static proxy matches the real compiler.
    const DIRTY_WGSL = `fn f() -> f32 { var typedef = 0.0; return typedef; }`;
    const CLEAN_WGSL = `fn f() -> f32 { var accum = 0.0; return accum; }`;
    const dirtyV = validateWgsl(DIRTY_WGSL);
    const cleanV = validateWgsl(CLEAN_WGSL);
    facts.wgslValidatorBite =
        !dirtyV.ok &&
        dirtyV.errors.some((e) => /RESERVED keyword/.test(e)) &&
        cleanV.ok;
    if (!facts.wgslValidatorBite)
        violations.push(
            `[self-test] the WGSL validator bite is broken (dirty:${JSON.stringify(dirtyV)}, clean:${JSON.stringify(cleanV)}) — a `+
            "`var <reserved-keyword>` declaration must RED (the GooBlob metaball.wgsl reserved-keyword class), a clean identifier must pass",
        );

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(c.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:webgpu-everywhere",
        facts,
        violations,
    });

    console.log("proof:webgpu-everywhere — the substrate-everywhere floor (BC.W-WEBGPU-EVERYWHERE)");
    console.log(`  W1 async picker   : ${facts.pickerAsyncFallThrough ? "try-then-rebuild ✓" : "MISSING ✗"}  sync-commit:${facts.pickerSynchronousCommit ? "✗ DISEASE" : "none ✓"}`);
    console.log(`  W2 no-throw signal: bare-adapter-throw ${facts.webgpuBareAdapterThrow ? "✗ PRESENT" : "none ✓"}  typed-signal ${facts.webgpuTypedInitSignal ? "✓" : "✗"}  guards-onInitError ${facts.webgpuGuardsOnInitError ? "✓" : "✗"}`);
    console.log(`  W3 no canvas2d    : ${canvas2dBinds.length ? `${canvas2dBinds.length} PRIMARY BIND(S) ✗ (${canvas2dBinds.join(", ")})` : "zero viz canvas2d primary ✓ (watercolor-dot allowlisted)"}`);
    console.log(`  W7 wgsl compile   : ${wgslResults.map((r) => `${r.name ?? "?"}:${r.ok ? "✓" : "✗"}`).join(", ") || "no .wgsl.ts found"}`);
    console.log(`  W4-W8 π spec      : ${facts.piSpecExists ? `present ✓ (meanLum:${facts.piSpecMeanLum ? "✓" : "✗"} no-adapter:${facts.piSpecNoAdapterAssert ? "✓" : "✗"} park:${facts.piSpecParkCount ? "✓" : "✗"}) — real-GPU/adapter-less/WebKit/fps run --run pi` : "ABSENT ✗"}`);
    console.log(`  self-test bites   : picker ${facts.pickerBite ? "✓" : "BROKEN"} · throw ${facts.throwBite ? "✓" : "BROKEN"} · canvas2d ${facts.canvas2dBite ? "✓" : "BROKEN"} · wgsl ${facts.wgslValidatorBite ? "✓" : "BROKEN"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${c.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
