import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import {
    CONSUMERS,
    ROOT,
    resolveSibling,
    skipSibling,
} from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";

const root = ROOT;
const artifactPath = gateArtifactPath(
    "GLASS_UI_CONSUMERS_STATIC_ARTIFACT",
    "W1-consumers-static",
);
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

// The consumers THIS gate scans — the four sibling app repos it walked before
// AS.W2 (fourier-analysis/web, words/frontend, bbnf-lang/playground, speedtest).
// Drawn from the constellation table by id, EXCLUDING self/glass-ui and the
// publishers (keyframes.js, value.js) this surface-creep gate never scanned, and
// bbnf-buddy (not in the original scanned set). Absent siblings on a clean runner
// are a graceful logged skip via skipSibling (registry-default policy).
const SCANNED_CONSUMER_IDS = new Set([
    "fourier-analysis/web",
    "words/frontend",
    "bbnf-lang/playground",
    "speedtest",
]);
const consumers = CONSUMERS.filter((c) => SCANNED_CONSUMER_IDS.has(c.id))
    .map((c) => {
        const { present, dir } = resolveSibling(c);
        if (!present) {
            skipSibling("proof:consumers:static", c);
            return null;
        }
        return { id: c.id, dir };
    })
    .filter(Boolean);

const sourceExts = new Set([".ts", ".tsx", ".js", ".jsx", ".vue", ".css", ".scss", ".pcss", ".json"]);
const ignoredDirs = new Set([
    ".git",
    ".vite",
    "dist",
    "build",
    "coverage",
    "node_modules",
    ".output",
    ".nuxt",
    // Sibling consumers stash throwaway agent checkouts under
    // `.claude/worktrees/agent-*/src/`; walking them lints stale copies as
    // live consumer source (false-witness noise). `.claude` stops the descent
    // at the dir; `worktrees` defends a `worktrees/` tree rooted elsewhere.
    ".claude",
    "worktrees",
]);

function resolveModulePath(fromFile, specifier) {
    const base = resolve(dirname(fromFile), specifier);
    const candidates = [
        `${base}.ts`,
        `${base}.tsx`,
        `${base}.js`,
        `${base}.mjs`,
        join(base, "index.ts"),
        join(base, "index.tsx"),
        join(base, "index.js"),
        join(base, "index.mjs"),
        base,
    ];
    return candidates.find(
        (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
    );
}

function parseExportList(source) {
    return source
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part.replace(/^type\s+/, ""))
        .map((part) => {
            const asMatch = part.match(/^(.*?)\s+as\s+([A-Za-z_$][\w$]*)$/);
            if (asMatch) return asMatch[2];
            const name = part.match(/[A-Za-z_$][\w$]*/)?.[0];
            return name === "default" ? null : name;
        })
        .filter(Boolean);
}

function collectExports(filePath, seen = new Set()) {
    const resolved = resolve(filePath);
    if (seen.has(resolved) || !existsSync(resolved)) return new Set();
    seen.add(resolved);

    // Comment-strip BEFORE scanning: a commented example of an export directive
    // (e.g. `src/index.ts`'s `// NOT `export * from "./composables/motion/core"``)
    // must not be followed as a real re-export — the AP.W4 false-witness class
    // (bb4e79b) applied to the root-surface collector, not just the consumer scan.
    const source = stripComments(readFileSync(resolved, "utf8"));
    const exports = new Set();

    for (const match of source.matchAll(/export\s+\*\s+from\s+["']([^"']+)["']/g)) {
        const target = resolveModulePath(resolved, match[1]);
        if (!target) continue;
        for (const name of collectExports(target, seen)) exports.add(name);
    }

    for (const match of source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}(?:\s+from\s+["'][^"']+["'])?/g)) {
        for (const name of parseExportList(match[1])) exports.add(name);
    }

    for (const match of source.matchAll(/export\s+(?:declare\s+)?(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g)) {
        exports.add(match[1]);
    }

    return exports;
}

function unionExports(files) {
    const exports = new Set();
    for (const file of files) {
        for (const name of collectExports(file)) exports.add(name);
    }
    return exports;
}

// The intended root-barrel contract — the exact per-package sources `src/index.ts`
// re-exports. Drift between this list and `src/index.ts` is the surface-creep this
// proof guards. The dark/ + keyboard/ + motion/ sub-trees are subpath-only (vueuse-
// or keyframes.js-bearing, SCC-trap closure) and are deliberately absent here — save
// the dependency-free View-Transitions trio, allowed explicitly below (AQ.W5).
const rootContractFiles = [
    "src/components/ui/index.ts",
    // The cherry-picked custom/ packages on the root barrel.
    "src/components/custom/instrument-chassis/index.ts",
    "src/components/custom/instrument-rail/index.ts",
    "src/components/custom/hover-popover/index.ts",
    "src/components/custom/configurator/index.ts",
    "src/components/custom/scrolling-text/index.ts",
    // BA.W-ICON-CHIP — the section-color POP primitive joins the root barrel
    // (`export * from "./components/custom/icon-chip"`; also /icon-chip subpath).
    "src/components/custom/icon-chip/index.ts",
    // BC.W-SPLIT-CHARS — the per-glyph split COMPONENT face <SplitChars> joins the
    // root barrel (`export * from "./components/custom/split-chars"`; engine-FREE —
    // vueuse + keyframes free, the icon-chip/vReveal precedent; also /motion-core).
    "src/components/custom/split-chars/index.ts",
    // The vueuse-free composable sub-trees.
    "src/composables/reactive/index.ts",
    "src/composables/dom/index.ts",
    "src/composables/glass/index.ts",
    "src/composables/sortable/index.ts",
    "src/utils/index.ts",
].map((file) => resolve(root, file));
const rootAllowed = unionExports(rootContractFiles);
// AQ.W5 §Design 3 — the View-Transitions substrate is the ONE motion symbol set
// deliberately re-exported to the root barrel, via a TARGETED
// `export { … } from "./composables/motion/useViewTransition"` (dependency-free —
// no vue, no keyframes.js, no vueuse — so SCC-trap-safe on the curated root). The
// whole-file contract above cannot express a partial (3-of-N) re-export, so the
// trio is allowed explicitly here.
for (const name of ["startViewTransition", "supportsViewTransitions", "ViewTransitionResult"]) {
    rootAllowed.add(name);
}
// BA.W-ATLAS-RECONCILE — navigate()/NavigateOptions/supportsRouteTransitions are the
// route-transition convenience over startViewTransition, targeted-re-exported to the
// root barrel from the SAME ./composables/motion/useViewTransition module (dependency-
// free, per the trio above). The whole-file contract cannot express the partial
// re-export, so they are allowed explicitly here.
for (const name of ["navigate", "supportsRouteTransitions", "NavigateOptions"]) {
    rootAllowed.add(name);
}
// AV.W3 — `vReveal` is the same shape: a dependency-free motion symbol
// (`vue` type-only — no keyframes.js, no vueuse) targeted-re-exported to the
// root barrel from `./composables/motion/vReveal`, per the useViewTransition
// precedent. A single-symbol re-export the whole-file contract cannot express.
rootAllowed.add("vReveal");
// AY.W-CLOSE1 — DeckProgress + DeckProgressProps were RETIRED (PRUNE-LEDGER R2;
// the deck-position rail wrapper had 0 real consumers — slides ships its own
// deck-local progress bar over <Progress variant="gradient">). The component dir,
// the ./deck-progress export, the api seat, and the root-barrel re-export are all
// gone; this gate no longer asserts the retired symbols on the root surface
// (a stale `rootAllowed.add` would FALSE-RED as "missing core export").
// AX.W37 — useTextHighlight + its types are the named CSS Custom Highlight
// composable, re-homed from /dom to /motion-core and targeted-re-exported to the
// root barrel (keyframes-FREE + vueuse-FREE, per the vReveal precedent). It WAS
// root-public via the ./composables/dom contract-file walk before the re-home; the
// re-home preserved the reach but moved it off a rootContractFile, so the union
// no longer captures it. These three single-symbol adds restore the allowlist.
rootAllowed.add("useTextHighlight");
rootAllowed.add("HighlightMatcher");
rootAllowed.add("UseTextHighlightControls");
// AZ.W-MORPH-SHOWCASE (the W-LIQUID fold) — useLiquidFlex is the shared amorphous
// flex+squish primitive (a PURE projection of a caller-driven scalar; engine-FREE +
// vueuse-FREE), targeted-re-exported to the root barrel from
// ./composables/motion/useLiquidFlex per the vReveal/useViewTransition precedent
// (on /motion-core + the root; ≥2 consumers: useDockOrientationMorph + the
// tabs-indicator squish).
rootAllowed.add("useLiquidFlex");
rootAllowed.add("LiquidFlexAxis");
rootAllowed.add("UseLiquidFlexParams");
rootAllowed.add("UseLiquidFlexReturn");
// BB.B4 (W-VIZ-POINTER) — usePointerVelocityField is the shared viz-pointer-physics
// field (pointer position + derived velocity + the ACCEL term), fed by the renderer's
// frame tick (NO own rAF), frozen under PRM (tick(0)). Engine-FREE + vueuse-FREE
// (imports `vue` only), targeted-re-exported to the root barrel from
// ./composables/motion/usePointerVelocityField per the useLiquidFlex precedent (on
// /motion-core + the root; booked binary consumers: W-FLOWFIELD + W-CONCENTRIC).
rootAllowed.add("usePointerVelocityField");
rootAllowed.add("PointerVec2");
rootAllowed.add("UsePointerVelocityField");
rootAllowed.add("UsePointerVelocityFieldOptions");
// BC.W-SPLIT-CHARS — useCharStagger is the engine-free per-glyph stagger composable
// the <SplitChars> face composes, targeted-re-exported to the root barrel from
// ./composables/motion/useCharStagger (vueuse-FREE + keyframes-FREE — the CSS owns
// the motion, per the vReveal/useLiquidFlex precedent; on /motion-core + the root).
rootAllowed.add("useCharStagger");
rootAllowed.add("UseCharStaggerOptions");
rootAllowed.add("UseCharStaggerReturn");
// L.W1 SCC-trap closure — the 4 vueuse-bearing ui families (input/, textarea/,
// combobox/, carousel/) are subpath-only (`/forms`, `/carousel`): the curated root
// barrel re-exports the 37 vueuse-FREE ui packages but NOT these. The `ui/index.ts`
// contract above is the FULL barrel (it includes them), so subtract their exports
// from rootAllowed to match the curated, vueuse-free root surface.
const subpathOnlyUiFiles = [
    "src/components/ui/input/index.ts",
    "src/components/ui/textarea/index.ts",
    "src/components/ui/combobox/index.ts",
    "src/components/ui/carousel/index.ts",
    // BB.W-DRAWER-ABROGATE — Drawer is OFF the root barrel (a clean break, no alias):
    // the reka rebuild's `useDrawerSnap` engine is a keyframes.js SpringProgress
    // consumer, so the Drawer is keyframes-BEARING and must NOT inline its optional
    // peer into the vueuse-free root bundle. It ships via the `/drawer` subpath only;
    // `ui/index.ts` still re-exports it (the ui barrel), so subtract it from the
    // curated root surface (the input/textarea/combobox/carousel precedent above).
    "src/components/ui/drawer/index.ts",
    // BC — FocusScope (the substrate-single focus-trap host over reka's FocusScope)
    // ships via the `/focus-scope` subpath + the ui barrel, NOT the curated root
    // barrel. Same subtraction as Drawer above (in ui/index.ts, off src/index.ts).
    "src/components/ui/focus-scope/index.ts",
].map((file) => resolve(root, file));
for (const name of unionExports(subpathOnlyUiFiles)) rootAllowed.delete(name);
const actualRootExports = collectExports(resolve(root, "src/index.ts"));
const unexpectedRootExports = [...actualRootExports]
    .filter((name) => !rootAllowed.has(name))
    .sort();
const missingRootExports = [...rootAllowed]
    .filter((name) => !actualRootExports.has(name))
    .sort();
const exportsMap = new Set(Object.keys(packageJson.exports ?? {}));

function walk(dir) {
    if (!existsSync(dir)) return [];
    const files = [];
    for (const entry of readdirSync(dir)) {
        if (ignoredDirs.has(entry)) continue;
        const full = join(dir, entry);
        const stats = statSync(full);
        if (stats.isDirectory()) {
            files.push(...walk(full));
        } else if (stats.isFile() && sourceExts.has(extname(full))) {
            files.push(full);
        }
    }
    return files;
}

function parseNamedImports(clause) {
    const named = clause.match(/\{([\s\S]*?)\}/);
    if (!named) return [];
    return named[1]
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part.replace(/^type\s+/, ""))
        .map((part) => part.split(/\s+as\s+/)[0]?.trim())
        .filter(Boolean);
}

function parseImportDeclarations(source) {
    const declarations = [];
    const lines = source.split("\n");
    let current = null;

    function finish(index) {
        if (!current) return;
        const statement = current.lines.join("\n");
        const fromMatch = statement.match(/\sfrom\s+["']([^"']+)["']/);
        const sideEffectMatch = statement.match(/^import\s+["']([^"']+)["']/);
        const specifier = fromMatch?.[1] ?? sideEffectMatch?.[1];
        if (specifier) {
            declarations.push({
                statement,
                specifier,
                line: current.startLine,
            });
        }
        current = null;
    }

    lines.forEach((line, index) => {
        if (!current && !line.trimStart().startsWith("import ")) return;
        if (!current) {
            current = {
                startLine: index + 1,
                lines: [],
            };
        }
        current.lines.push(line);

        if (
            /\sfrom\s+["'][^"']+["']/.test(line) ||
            /^import\s+["'][^"']+["']/.test(line.trim())
        ) {
            finish(index);
        }
    });

    finish(lines.length);
    return declarations;
}

function lineNumber(source, index) {
    return source.slice(0, index).split("\n").length;
}

// AP.W4 — false-witness fix. The CSS-directive scan must not flag an
// `@import`/`@source` that lives inside a COMMENT (consumers legitimately
// document retired directives in prose — flagging those is a lying gate).
// Blank out comment bodies with spaces (newlines + length preserved, so match
// positions + line numbers stay exact). String-aware: `//` and `/* */` inside a
// '…'/"…"/`…` literal are NOT comments. The import-declaration scan is already
// comment-safe (its per-line guard skips lines that do not start with `import`).
function stripComments(src) {
    let out = "";
    let state = "code"; // code | line | block | sq | dq | tq | regex
    // Previous SIGNIFICANT (non-whitespace) char emitted in `code` — disambiguates
    // a regex literal (`/…/`) from a division operator. A regex may legally open
    // only where a value is expected: after one of = ( , : [ ! & | ? { ; , after
    // `return`, or at start-of-input. After an identifier/`)`/`]`/`}`/digit a
    // leading `/` is DIVISION, not a regex. `}` is EXCLUDED (like `)` and `]`): it
    // is lexically ambiguous (block-close → regex-legal, but object/expression-close
    // → division), and a JSX `}/>` self-close or a `} / 2` division would otherwise
    // open a spurious regex that desyncs the scan and could leak a following
    // COMMENTED directive (the false-positive class this gate exists to avoid —
    // strip-misclassify re-verification). The only cost is reading a genuine
    // block-statement-then-regex `{}/re/` as division — a false-NEGATIVE that the
    // 1577-file consumer differential shows never fires.
    let prevSig = "";
    let inCharClass = false; // inside a regex [...] character class — `/` does not terminate
    const regexAllowedPrev = new Set(["", "=", "(", ",", ":", "[", "!", "&", "|", "?", "{", ";"]);
    function regexLegalHere() {
        if (regexAllowedPrev.has(prevSig)) return true;
        // `return /…/` — the only keyword that ends in a regex-legal position and
        // whose trailing char (`n`) would otherwise read as an identifier.
        return /(^|[^A-Za-z0-9_$])return$/.test(out.replace(/\s+$/, ""));
    }
    for (let i = 0; i < src.length; i++) {
        const c = src[i];
        const d = i + 1 < src.length ? src[i + 1] : "";
        if (state === "code") {
            if (c === "/" && d === "/") { out += "  "; i++; state = "line"; }
            else if (c === "/" && d === "*") { out += "  "; i++; state = "block"; }
            else if (c === "/" && regexLegalHere()) { out += c; state = "regex"; inCharClass = false; prevSig = c; }
            else if (c === "'") { out += c; state = "sq"; prevSig = c; }
            else if (c === '"') { out += c; state = "dq"; prevSig = c; }
            else if (c === "`") { out += c; state = "tq"; prevSig = c; }
            else { out += c; if (c.trim() !== "") prevSig = c; }
        } else if (state === "line") {
            if (c === "\n") { out += "\n"; state = "code"; }
            else out += " ";
        } else if (state === "block") {
            if (c === "*" && d === "/") { out += "  "; i++; state = "code"; }
            else out += c === "\n" ? "\n" : " ";
        } else if (state === "regex") {
            // regex literal — copy the BODY verbatim (it is code, not a comment).
            // Honor `\` escapes and `[...]` character classes (a `/` inside a class
            // does NOT terminate); exit on the first unescaped, non-class-internal `/`.
            out += c;
            if (c === "\\" && i + 1 < src.length) { out += src[i + 1]; i++; }
            else if (c === "[") inCharClass = true;
            else if (c === "]") inCharClass = false;
            else if (c === "/" && !inCharClass) { state = "code"; prevSig = c; }
        } else {
            // string literal — copy verbatim, honor escapes + the matching terminator
            out += c;
            if (c === "\\" && i + 1 < src.length) { out += src[i + 1]; i++; }
            else if ((state === "sq" && c === "'") || (state === "dq" && c === '"') || (state === "tq" && c === "`")) { state = "code"; prevSig = c; }
            // Defensive bound: a single-quoted/double-quoted literal cannot legally
            // span a raw newline (only a template literal can). If we hit a newline
            // not preceded by a `\` line-continuation, the open quote was a misdetection
            // (e.g. a regex-internal apostrophe) — reset to code so any residual
            // mis-parse is bounded to a single line. Template literals + blocks are
            // exempt (they legally span newlines).
            else if (c === "\n" && (state === "sq" || state === "dq")) { state = "code"; prevSig = ""; }
        }
    }
    return out;
}

function scanFile(consumer, file) {
    const rel = file.slice(consumer.dir.length + 1);
    const source = readFileSync(file, "utf8");
    const failures = [];
    const cssPattern = /@(import|source)\s+(?:url\()?["']([^"']+)["']\)?/g;

    for (const declaration of parseImportDeclarations(source)) {
        const { specifier, line, statement } = declaration;
        if (specifier !== "@mkbabb/glass-ui") continue;
        const clause = statement
            .replace(/^import\s+/, "")
            .replace(/\sfrom\s+["']@mkbabb\/glass-ui["'][\s;]*$/, "")
            .trim();
        if (clause.startsWith("* as ")) {
            failures.push({
                file: rel,
                line,
                type: "root-namespace-import",
                message: "Root namespace imports hide public-surface drift.",
            });
            continue;
        }

        const named = parseNamedImports(clause);
        if (named.length === 0) {
            failures.push({
                file: rel,
                line,
                type: "root-default-import",
                message: "The package root has no default import contract.",
            });
            continue;
        }

        for (const name of named) {
            if (!rootAllowed.has(name)) {
                failures.push({
                    file: rel,
                    line,
                    type: "non-core-root-symbol",
                    symbol: name,
                    message: `${name} must import from an explicit @mkbabb/glass-ui subpath.`,
                });
            }
        }
    }

    for (const declaration of parseImportDeclarations(source)) {
        const { specifier, line } = declaration;
        if (specifier.includes("glass-ui/src")) {
            failures.push({
                file: rel,
                line,
                type: "source-relative-import",
                specifier,
                message: "Consumers must not import from glass-ui/src.",
            });
        }
        if (specifier.startsWith("@mkbabb/glass-ui/") && specifier !== "@mkbabb/glass-ui/styles") {
            const exportKey = `./${specifier.slice("@mkbabb/glass-ui/".length)}`;
            if (!exportsMap.has(exportKey)) {
                failures.push({
                    file: rel,
                    line,
                    type: "unknown-package-subpath",
                    specifier,
                    message: `${specifier} is not declared in package exports.`,
                });
            }
        }
    }

    const styleSource = stripComments(source);
    for (const match of styleSource.matchAll(cssPattern)) {
        const directive = match[1];
        const specifier = match[2];
        const line = lineNumber(styleSource, match.index ?? 0);
        if (specifier.includes("glass-ui/src")) {
            failures.push({
                file: rel,
                line,
                type: "source-relative-style",
                specifier,
                message: "Style tooling must not source glass-ui/src from consumers.",
            });
        }
        if (
            directive === "import" &&
            specifier.includes("@mkbabb/glass-ui") &&
            specifier !== "@mkbabb/glass-ui/styles"
        ) {
            failures.push({
                file: rel,
                line,
                type: "invalid-style-path",
                directive,
                specifier,
                message: "The only public stylesheet path is @mkbabb/glass-ui/styles.",
            });
        }
    }

    return failures;
}

const results = consumers.map((consumer) => {
    const files = walk(consumer.dir);
    const failures = files.flatMap((file) => scanFile(consumer, file));
    return {
        consumer: consumer.id,
        path: consumer.dir,
        filesScanned: files.length,
        status: failures.length === 0 ? "pass" : "fail",
        failures,
    };
});

writeGateArtifact(artifactPath, {
    generatedAt: new Date().toISOString(),
    rootContractFiles: rootContractFiles.map((file) => file.slice(root.length + 1)),
    rootAllowedSymbols: [...rootAllowed].sort(),
    actualRootExports: [...actualRootExports].sort(),
    rootSurfaceFailures: {
        unexpectedRootExports,
        missingRootExports,
    },
    consumers: results,
});

const failed = results.filter((result) => result.failures.length > 0);
if (unexpectedRootExports.length > 0 || missingRootExports.length > 0 || failed.length > 0) {
    console.error(`Consumer static policy failed: ${artifactPath}`);
    for (const name of unexpectedRootExports) {
        console.error(`root-surface unexpected export ${name}`);
    }
    for (const name of missingRootExports) {
        console.error(`root-surface missing core export ${name}`);
    }
    for (const result of failed) {
        for (const failure of result.failures) {
            console.error(
                `${result.consumer}:${failure.file}:${failure.line} ${failure.type} ${failure.message}`,
            );
        }
    }
    process.exit(1);
}

console.log(`Consumer static policy passed: ${artifactPath}`);
