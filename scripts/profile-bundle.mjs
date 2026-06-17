import { execFileSync } from "node:child_process";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { gzipSync } from "node:zlib";
import { dirname, extname, join, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import {
    gateArtifactPath,
    isSnapshot,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
// BB.W-PAYLOAD-DEFER (W1) — the SHARED transitive-import walker (the no-second-copy
// leaf proof-vueuse-free-root.mjs also consumes). The critical-path-weight arm walks
// the root-barrel eager SOURCE graph with it, asserting ZERO reach to the heavy-leaf
// set (the WebGL substrate / GL shader strings / value.js color-math leaf).
import { findReach } from "./lib/critical-path-walk.mjs";

// ROOT is the glass-ui repo root — sourced from constellation.mjs (the single
// constellation/path authority), not re-derived locally.
const root = ROOT;
// Pure-output artefact (AS.W2 inv-θ): the per-run profile JSON routes to the
// byte-stable `.cache/gates/W4-bundle-profile.json` by default; the existing
// GLASS_UI_BUNDLE_ARTIFACT env still overrides to a committed snapshot path.
// The run timestamp + timing fields (buildDurationMs/durationMs) are volatile —
// dropped from the cache artefact so a run leaves git status clean; only the
// gzip/raw byte measurements (the budget gate's POINT) persist, and those move
// only when the bundle actually changes.
const artifactPath = gateArtifactPath(
    "GLASS_UI_BUNDLE_ARTIFACT",
    "W4-bundle-profile",
);
// The companion markdown table is likewise pure output — route it beside the
// JSON in the cache by default (its own env override for a deliberate snapshot),
// so neither artefact re-dirties the committed K/audit tree per run.
const subpathMarkdownPath = resolve(
    process.env.GLASS_UI_SUBPATH_TABLE ??
        resolve(dirname(artifactPath), "W4-subpath-sizes.md"),
);
// D5 drift baseline — a COMMITTED, reviewed reference distinct from the
// ephemeral per-run profile (`artifactPath`). The gate READS this file; only
// a deliberate `--rebaseline` flag (or a `GLASS_UI_BUNDLE_BASELINE` override)
// WRITES it. Splitting read-baseline from write-profile is what makes drift a
// real measurement against the last reviewed point — the prior code read and
// wrote the same `artifactPath`, so every run gated against numbers it had
// just written (self-erasing baseline, drift structurally ~0%).
const baselinePath = resolve(
    process.env.GLASS_UI_BUNDLE_BASELINE ??
        resolve(root, "docs/tranches/AP/W4-bundle-profile.baseline.json"),
);
const startedAt = Date.now();

// Bundle budget — enforced via `npm run profile:budget` (passes --enforce).
// `npm run profile:bundle` keeps its measurement-only contract and prints the
// same report without exiting non-zero on FAIL.
//
// The JS key gates the root barrel `dist/glass-ui.js`; the CSS key gates the
// fully-resolved `dist/styles/index.css` consumer draw (the cascade @imports
// inlined — see combinedStylesDraw below), which is the real artifact a
// consumer's bundler resolves through `@import "@mkbabb/glass-ui/styles"`.
//
// CSS ceiling — re-based ONCE at AO.W4 (D4) against the measured
// post-consolidation resolved draw of dist/styles/index.css (gzip 74928 /
// raw 308645) plus ~10% tranche-close headroom (74928 × 1.10 ≈ 82421 →
// 82500). This retires the SFC-only 8650 ceiling that gated the wrong (tiny)
// dist/glass-ui.css fragment, and the N.W0→P.W0→P.W3→Q.W4 bump-at-every-close
// cadence that chased it: the gate now measures the real consumer artifact, so
// the ceiling is set against reality, not bumped per tranche.
//
// CSS ceiling re-based AGAIN at AQ.W7 (the sanctioned AQ-close rebase). The AQ
// tranche legitimately grew the CSS substrate against the platform-native
// modern-web swaps — W2 (color-scheme/light-dark mirror collapse/color-mix
// alpha), W3 (:has() selectors/.deferred-section/tokenized scrollbars), W4
// (form vocabulary), W5 (scroll-driven animations/@starting-style top-layer/
// View-Transitions grammar). Measured AQ-final resolved draw of
// dist/styles/index.css: gzip 87928 / raw 349789. Re-based at × 1.10 close
// headroom (87928 × 1.10 ≈ 96721 → 96800; 349789 × 1.10 ≈ 384768 → 385000),
// per the same set-against-reality methodology AO.W4 used — re-based ONCE at
// close, not bumped per wave.
// CSS ceiling re-based at AS.W5 (P9 — the build-independent component-utility
// ship). P9 emits glass-ui's own component-utility rules (rounded-panel,
// text-muted-foreground, h-full, the CVA variants, …) into the published
// dist/styles bundle so a consumer paints correctly with no `@source` glob (the
// constellation-wide silent-styling repair). components.css adds raw ≈ 57 KB /
// gzip ≈ 9 KB to the resolved draw → measured dist/styles/index.css gzip 97749 /
// raw 412097. Re-based with modest headroom (gzip 100000, raw 420000) — this is
// a ONE-TIME structural correctness addition, not per-wave creep.
// CSS ceiling re-based at AT.W6-dock-c (the dock VT/FLIP timing-parity slice).
// Minting `--dock-resize-spring` (the single source curve both engine paths of
// the dock layer-swap morph now consume) + its lean rationale in the three CSS
// rungs (tokens/dock/view-transition) lifts the measured resolved draw of
// dist/styles/index.css to gzip 99958 / raw 419727 — within the AS.W5 ceiling
// but with knife's-edge headroom (42 gzip bytes), too tight to survive a zlib
// drift across runners. Re-based against the measured reality with the same
// modest ~3% close headroom the prior re-bases used (gzip 99958 → 103000;
// raw 419727 → 432000) — a one-time conscious lift for a real feature landing,
// not per-wave creep.
//
// AU.W8/W8b landing (the dock-motion overhaul): the 50-stop --spring-dock
// linear() token + the W8b native arms (@supports interpolate-size width
// morph; @starting-style + allow-discrete discrete-transition arm) + the
// dock-controls.css carve preamble + the transition-control/transition-collapse
// @utility recipes lift the measured draw to raw 441623 / gzip 106614.
// Re-based with the SAME ~3% close headroom (raw 441623 → 455000; gzip
// 106614 → 110000) — the second one-time conscious lift, for the dock-motion
// feature landing (the 3.3.0 headline), not per-wave creep. The dock.js
// drift re-baseline (+SpringProgress LIGHT driver) rides the same commit.
//
// AV.W15/W16 landing (the iOS-26 Liquid Glass token surface + the modern-v4
// idiom cohesion): the W15 token evolution (--glass-edge-light rim, the moving
// specular @property regs + glass-specular-track.css rung, the oklch ramp
// light-dark() pairs) + the W16 container-query rules (dock/chassis/typography
// @container contexts) lift the measured draw to raw 459897 / gzip 114456.
// Re-based with the SAME ~3% close headroom (raw 459897 → 474000; gzip
// 114456 → 118000) — the third one-time conscious lift, for the iOS-26 +
// idiom feature landing, not per-wave creep.
//
// AW re-base (the 3.5.0 cut): the dock clip-reveal aperture grammar, the
// GlassPanel five-rung per-tier CSS, the .glass-progress-rail recipe, and the
// at-rest affordance pass lift the measured draw to gzip ~118315 / raw ~472108
// (the raw is still under, the gzip tipped 0.3% over). Lifted to gzip 124000 /
// raw 486000 — the FOURTH one-time conscious lift, sized to carry the rest of
// the AW band CSS (glass-atoms material/card, the big-dock card-radius grammar,
// band-G) so this is not re-based per sub-cut. The lib's material identity
// evolving with the AW feature landing, not per-wave creep.
// AW re-base (the 3.6.0 cut): the dock W3 big-dock card/grid grammar + the
// unified .glass-material mixin + the four Baseline-2025 SOTA folds
// (glass-refract/specular-track) lift the draw to gzip ~124.9k / raw ~495.9k.
// Lifted to gzip 130000 / raw 504000 — the FIFTH conscious lift, sized to carry
// the rest of the AW band CSS (glass-atoms W24-W26, band-G), not per-wave creep.
// AW re-base (the 3.7.0 cut — batch-1 integration): glass-atoms W25/W26
// (primitive press-spring + form-radius + switch/checkbox glass + overlay glass
// band + semantic tones) + band-G W28 (demo dock-nav SidebarDock/BottomDock +
// dock-nav.css) + W31 (the press-token fold) lift the raw to ~504.8k (gzip
// 126.7k stays well under). Lifted to gzip 134000 / raw 516000 — the SIXTH
// conscious lift, sized to carry the remaining band-G (W29/W30 restyles, W32)
// + W33 close, not per-wave creep.
//
// AW.W4.0 governor preamble (the load-bearing budget fix): aurora ships as
// `dist/aurora.js` — the `/aurora` subpath chunk, NOT root-barrel cherry-picked —
// so its shader growth NEVER entered the BUDGETS walk and every prior "stays inside
// profile:budget" for shader payload was a NO-OP. This entry closes that hole: the
// aurora-chunk ceiling is the genuine cost gate the W4 painterly folds (structure
// tensor + impasto height→normal→relight + the vangogh medium + the oil-pastel
// rework) and the W7 WGSL+compute twins answer to. HEAD is raw ≈60.9k / gzip
// ≈20.3k; the ceiling is a ONE-TIME conscious lift sized to carry the whole AW
// aurora band (the painterly GLSL growth + the bundled WGSL aurora/painterly/wake
// twins), NOT open-ended per-wave creep. An overrun HALTS the wave and triggers the
// W4 §3a field-bake-hoist triumvirate (a structural transposition, not a tap-count
// tweak). Orthogonal to `profile:aurora` (the FPS/ALU floor) — this bounds gzip
// chunk SIZE, that bounds runtime draw cost.
// AX re-base (the 3.8.0 cut): the dock content-driven wrap recipe + card-tier
// shadow/radius morph (W04), the van-Gogh/oil-pastel medium ground + profile fields
// (W13), the /deck-progress rail + carousel dot rail (W23/W24), and the font-register
// reconciliation (W22) lift the measured /styles draw to gzip ~134.6k / raw ~526.9k.
// Lifted to gzip 140000 / raw 548000 — the SEVENTH conscious lift, sized to carry the
// AX convergence CSS (the dock showcase section, the idiomatic configurator restyle,
// the uniform dropdown type-scale) net of the convergence trims (blob-page
// consolidation, chassis retire), NOT per-wave creep.
// AY re-base (the 3.10.0 cut, W-CLOSE1): the AY aurora band — the painterly rebuild
// (W-AUR-PAINTERLY), the van-Gogh rebuild (W-AUR-VANGOGH-REBUILD), the aurora-config
// + studio chrome (W-AUR-CONFIG/W-AUR-STUDIO), and the T5 medium fold — grows the
// shader+chrome draw of `dist/aurora.js` to gzip ≈38.6k (raw ≈114.5k, well under its
// 130k cap). The prior AX-era 38000 gzip ceiling is 599 bytes short. Lifted to gzip
// 40000 — the EIGHTH conscious lift, sized to carry the AY aurora band with a thin
// headroom, NOT open-ended per-wave creep (an overrun still HALTS per the W4 §3a
// field-bake-hoist triumvirate). The raw 130000 stays (88% utilized). The /styles +
// glass-ui.js caps are UNCHANGED — the AY squircle/glass-level deltas land inside them.
// BB.W-PAYLOAD-DEFER (W2) — the four WebGL entry chunks each carry a recorded gzip
// ceiling so a renderer ballooning (a shader payload growth) OR a renderer landing
// on the root path (glass-ui.js climbing past its cap — the W1 lock catches the
// EDGE, the budget catches the BYTE) REDS. The aurora ceiling pre-existed (the
// AW.W4.0 governor preamble above); goo-blob / constellation / fourier-field are
// added here, sized at the HEAD measure + ~10% tranche-close headroom (the same
// convention the aurora/CSS rebases use):
//   goo-blob       gzip 20_769 → 22_900   raw 56_940 → 62_700
//   constellation  gzip  6_043 →  6_700   raw 17_281 → 19_000
//   fourier-field  gzip  2_856 →  3_200   raw  7_690 →  8_500
// An overrun is a real payload regression — it HALTS the budget gate (the same
// fail-closed shape the aurora ceiling has), not a silent re-base.
// BB re-base (the 4.1.0 cut): the BB aurora band — the structure-tensor field
// (aurora-tensor-field), the impasto height→normal→relight, the van-Gogh +
// oil-pastel mediums (aurora-vangogh-preset / aurora-oilpastel-medium), the
// stroke-composite, and the software-raster luminance-faithful fallback ground
// (aurora-swraster) — grows the shader+chrome draw of `dist/aurora.js` to gzip
// ≈40.4k (raw ≈120.0k, 92% of its 130k cap). The AY-era 40000 gzip ceiling is
// 351 bytes short. Lifted to gzip 42000 — the NINTH conscious lift, sized to
// carry the BB aurora band with a thin headroom, NOT open-ended per-wave creep
// (an overrun still HALTS per the W4 §3a field-bake-hoist triumvirate). The raw
// 130000 stays (92% utilized). A future Batch-V WebGPU aurora migration /
// kuwahara medium that re-grows the chunk bumps this again at its own landing.
const BUDGETS = {
    "dist/glass-ui.js": { raw: 190_000, gzip: 33_700 },
    "dist/styles/index.css": { raw: 548_000, gzip: 140_000 },
    "dist/aurora.js": { raw: 130_000, gzip: 42_000 },
    "dist/goo-blob.js": { raw: 62_700, gzip: 22_900 },
    "dist/constellation.js": { raw: 19_000, gzip: 6_700 },
    "dist/fourier-field.js": { raw: 8_500, gzip: 3_200 },
};

// AO.W2 (inv α) — the real consumer-draw CSS artifact.
// `@import "@mkbabb/glass-ui/styles"` resolves to dist/styles/index.css, which
// @imports the 17 sibling cascade rungs (./tokens.css …) AND the folded
// ../glass-ui.css (the AN.W1 SFC fold). Resolve ALL of them and gzip the
// concatenation — that is glass-ui's published /styles draw. A byte added to
// any cascade rung moves this number (the cascade arm is INSIDE the gate).
function combinedStylesDraw(distRoot) {
    const stylesDir = resolve(distRoot, "styles");
    const indexPath = resolve(stylesDir, "index.css");
    if (!existsSync(indexPath)) return null;
    let css = readFileSync(indexPath, "utf-8");
    // One-level resolve: ./*.css siblings + ../glass-ui.css both resolve under stylesDir.
    css = css.replace(/@import\s+["']([^"']+\.css)["'];?/g, (m, ref) => {
        const target = resolve(stylesDir, ref);
        return existsSync(target) ? `\n${readFileSync(target, "utf-8")}\n` : m;
    });
    return { raw: Buffer.byteLength(css), gzip: gzipSync(css).length };
}

// ─────────────────────────────────────────────────────────────────────────────
// BB.W-PAYLOAD-DEFER — the critical-path-WEIGHT arm.
//
// The JS critical path (the cost a Card/Button-only consumer pays through
// `@mkbabb/glass-ui`) is DEFENDED by a gate, not by accident. The arm has three
// falsifiable sub-witnesses, all extending profile:budget IN PLACE (no new gate
// row — the registry stays single-owner). It is born-RED on the arm's ABSENCE at
// HEAD (the favourable HEAD is LOCKED so a regression reds), NOT on a violation.
//
//   W1 — the WebGL substrate + the GL shader strings + the value.js color-math
//        leaf stay OFF the root barrel's eager graph. Two tiers, mirroring
//        proof-vueuse-free-root.mjs:
//          SOURCE tier — the shared transitive walk from src/index.ts reaches ZERO
//            heavy-leaf module/specifier (the inverse-DataTable bite: re-exporting
//            the WebGL substrate or a value.js color core into any root-reachable
//            module reddens the SOURCE tier EVEN WHILE the DIST tier passes, because
//            the consumer's bundler walks the eager graph the dist split tree-shook).
//          DIST tier — the built dist/glass-ui.js names ZERO value.js color-math
//            symbol / GL string (the literal-floor).
//   W2 — the four WebGL entry chunks each carry a recorded gzip ceiling (in BUDGETS
//        above) — handled by the standard budget loop, surfaced here as a roll-up.
//   W3 — the aurora MEDIUM tail's lazy-split status. At HEAD the painterly mediums
//        are eagerly template-spliced into the single-program FRAGMENT_SRC (a
//        compile-time splice, not a runtime-selectable module — the scope-reveal
//        recorded in W-PAYLOAD-DEFER-DELTA.md), so the witness records the eager
//        medium count as a FACT (not a fail — the GL-fence-respecting split is a
//        named successor). A future module split that makes the mediums lazy flips
//        this to a separate-chunk assert; until then it is an informational fact
//        the DELTA cites, never a green-faking pass.

const CRIT_HEAVY_LEAVES = [
    // The WebGL substrate (the rAF/GL-context lifecycle the renderers compose).
    { name: "useWebGLCanvas", kind: "webgl-substrate" },
    { name: "useGlassRenderer", kind: "webgl-substrate" },
    // The GL shader-string modules (the .frag/.glsl payload).
    { name: "aurora.frag", kind: "gl-shader" },
    { name: "metaball.frag", kind: "gl-shader" },
    { name: "procedural-color.glsl", kind: "gl-shader" },
    // The value.js color-math peer (the ~124 KB peer a root-reachable import would
    // force the consumer's bundler to resolve for a Button-only import).
    { name: "@mkbabb/value.js", kind: "value-js" },
];
// A SOURCE-graph reach is a heavy-leaf IMPORT SPECIFIER naming one of the leaves
// (a `from "…/glass/webgl/useWebGLCanvas"`, a `from "…/aurora.frag"`, a
// `from "@mkbabb/value.js"`) OR a bare named-symbol reach to the GL rotation
// constant FBM_ROT (belt-and-suspenders — the shader-module import carries it, but
// a future direct `import { FBM_ROT }` is also caught).
const CRIT_SPECIFIER_RE =
    /(?:import|export)\s+[^"';]*?from\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g;
function critHeavyMatch(source) {
    for (const m of source.matchAll(CRIT_SPECIFIER_RE)) {
        const spec = m[1] ?? m[2] ?? m[3];
        if (!spec) continue;
        for (const leaf of CRIT_HEAVY_LEAVES) {
            // value.js is a bare peer specifier (exact); the others are path tails.
            const hit =
                leaf.kind === "value-js"
                    ? spec === leaf.name
                    : spec.includes(leaf.name);
            if (hit) return { specifier: `${spec} (${leaf.kind})` };
        }
    }
    // Direct FBM_ROT named import (the GL rotation constant) — a non-specifier reach.
    if (/\bimport\b[^;]*\bFBM_ROT\b/.test(source))
        return { specifier: "FBM_ROT (gl-shader symbol)" };
    return null;
}

// The DIST literal-floor — the built root barrel names ZERO of these (value.js
// color-math symbols + GL strings). Mirrors proof-vueuse-free-root.mjs's DIST tier.
const CRIT_DIST_FLOOR_RE =
    /oklabToLinearSRGB|interpolateHue|rawOklchToOklab|colorUnit|useWebGLCanvas|useGlassRenderer|FBM_ROT|gl_FragColor/g;

function evaluateCriticalPath(distRootDir) {
    const entry = resolve(root, "src/index.ts");
    const facts = {};
    const violations = [];

    // W1 SOURCE tier — the shared transitive walk reaches ZERO heavy leaf.
    const reach = findReach(entry, critHeavyMatch);
    facts.sourceReach = reach ? reach.specifier : null;
    if (reach) {
        const rel = (p) => p.slice(root.length + 1);
        violations.push(
            `CRITICAL-PATH SOURCE: the root barrel reaches ${reach.specifier} via ${reach.path.map(rel).join(" → ")}`,
        );
    }

    // W1 DIST tier — the built root barrel literal-floor.
    const distGlassUi = resolve(distRootDir, "glass-ui.js");
    if (existsSync(distGlassUi)) {
        const hits = (
            readFileSync(distGlassUi, "utf8").match(CRIT_DIST_FLOOR_RE) ?? []
        ).length;
        facts.distHits = hits;
        if (hits > 0)
            violations.push(
                `CRITICAL-PATH DIST: dist/glass-ui.js names a value.js-color-math / GL string ${hits}× (the built root barrel must be WebGL-free + value.js-color-free)`,
            );
    } else {
        facts.distHits = "(dist absent — run npm run build)";
        violations.push(
            "CRITICAL-PATH DIST: dist/glass-ui.js absent — build before the gate (the dist-floor tier cannot run)",
        );
    }

    // W3 — the aurora MEDIUM tail status. At HEAD the mediums are template-spliced
    // into the single-program aurora.js (the scope-reveal); record the eager medium
    // count as a FACT, and whether a lazy aurora-medium chunk exists. This is
    // informational until the GL-fence-respecting module split lands (the named
    // successor in the DELTA) — it never reds the budget (a compile-time splice is
    // not a regression, it is the as-shipped architecture).
    const distAurora = resolve(distRootDir, "aurora.js");
    if (existsSync(distAurora)) {
        const src = readFileSync(distAurora, "utf8");
        const eagerMedia = (
            src.match(/impasto|oil-pastel|vangogh|mediumVangogh|mediumOilPastel/g) ??
            []
        ).length;
        facts.auroraEagerMediumHits = eagerMedia;
        const lazyChunk = walk(distRootDir).some((f) =>
            /aurora-medium[-.].*\.js$/.test(f),
        );
        facts.auroraMediumLazyChunk = lazyChunk;
        facts.auroraMediumSplit = lazyChunk
            ? "split (lazy medium tail chunk present)"
            : "eager (compile-time spliced — GL-fence scope-reveal, named-successor split)";
    } else {
        facts.auroraEagerMediumHits = "(dist absent)";
        facts.auroraMediumSplit = "(dist absent)";
    }

    // W4 — the dts build-arm wall-clock fact slot. `.2` supplies the measured
    // emit-types arm wall-clock via GLASS_UI_DTS_ARM_MS (cold) /
    // GLASS_UI_DTS_ARM_WARM_MS (warm re-emit); the gate RECORDS them (the perf
    // witness the DELTA cites). Absent → null (the fact is supplied out-of-band by
    // the build the DELTA captures, not measured inside the budget run).
    const dtsCold = process.env.GLASS_UI_DTS_ARM_MS;
    const dtsWarm = process.env.GLASS_UI_DTS_ARM_WARM_MS;
    facts.dtsArmMs = dtsCold ? Number(dtsCold) : null;
    facts.dtsArmWarmMs = dtsWarm ? Number(dtsWarm) : null;

    return { facts, violations };
}

const args = new Set(process.argv.slice(2));
const skipBuild =
    args.has("--skip-build") || process.env.GLASS_UI_BUDGET_SKIP_BUILD === "1";
const budgetMode =
    args.has("--enforce") || process.env.GLASS_UI_BUDGET_MODE === "1";
// The ONLY path that updates the committed D5 baseline. Without it the
// baseline is immutable across runs; with it, a human rebaselines + commits.
const rebaseline = args.has("--rebaseline");

function walk(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) return walk(full);
        if (entry.isFile()) return [full];
        return [];
    });
}

function runBuild() {
    const started = Date.now();
    execFileSync("npm", ["run", "iter-build"], {
        cwd: root,
        stdio: "inherit",
        env: { ...process.env, npm_config_audit: "false", npm_config_fund: "false" },
    });
    return Date.now() - started;
}

const buildDurationMs = skipBuild ? 0 : runBuild();
const distRoot = resolve(root, "dist");
const files = walk(distRoot)
    .map((file) => {
        const contents = readFileSync(file);
        return {
            file: file.slice(root.length + 1),
            ext: extname(file) || "(none)",
            bytes: statSync(file).size,
            gzipBytes: gzipSync(contents).length,
        };
    })
    .sort((a, b) => b.bytes - a.bytes);

const totals = files.reduce(
    (acc, file) => {
        acc.bytes += file.bytes;
        acc.gzipBytes += file.gzipBytes;
        acc.byExt[file.ext] ??= { bytes: 0, gzipBytes: 0, files: 0 };
        acc.byExt[file.ext].bytes += file.bytes;
        acc.byExt[file.ext].gzipBytes += file.gzipBytes;
        acc.byExt[file.ext].files += 1;
        return acc;
    },
    { bytes: 0, gzipBytes: 0, byExt: {} },
);

// Per-subpath gzipped-size disclosure (gap 14). Every `dist/<name>.js` chunk
// is classified as a published library ENTRY (a subpath the consumer imports
// — `aurora.js`, `dock.js`, the root `glass-ui.js`, …) or a SHARED leaf (a
// Rolldown-extracted hashed chunk like `DialogContent-Cr7pJCiA.js` that
// several entries reference). The entry set is read authoritatively from the
// `package.json` exports' `import` targets — not pattern-matched — so a
// hyphenated subpath name (`metric-badge`, `paper-backdrop`) is never
// mistaken for a content-hashed leaf. The split tells a consumer the cost of
// an import choice: the standalone weight of the subpath + whatever shared
// leaves it drags in. The data was already gzipped above (`:111`); this only
// surfaces it as a published table — additive + informational, it does NOT
// touch the glass-ui.js / glass-ui.css enforce gate.
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const entryFiles = new Set();
for (const cond of Object.values(pkg.exports ?? {})) {
    const target = cond && typeof cond === "object" ? cond.import : undefined;
    if (typeof target === "string" && target.endsWith(".js")) {
        entryFiles.add(target.replace(/^\.\//, ""));
    }
}
const distName = (f) => f.file.replace(/^dist\//, "");
const subpathEntries = files
    .filter((f) => f.ext === ".js" && f.file.startsWith("dist/"))
    .map((f) => ({
        name: distName(f),
        kind: entryFiles.has(f.file) ? "entry" : "shared",
        bytes: f.bytes,
        gzipBytes: f.gzipBytes,
    }))
    .sort((a, b) => b.gzipBytes - a.gzipBytes);

const subpathTotals = subpathEntries.reduce(
    (acc, e) => {
        acc[e.kind].bytes += e.bytes;
        acc[e.kind].gzipBytes += e.gzipBytes;
        acc[e.kind].files += 1;
        return acc;
    },
    {
        entry: { bytes: 0, gzipBytes: 0, files: 0 },
        shared: { bytes: 0, gzipBytes: 0, files: 0 },
    },
);

// Budget evaluation — independent of artefact emission. Emits a per-file
// PASS/FAIL line and a final summary. Exits non-zero only when --enforce
// (or GLASS_UI_BUDGET_MODE=1) is set, so `profile:bundle` keeps its
// measurement-only contract.
const budgetReport = [];
let anyBudgetExceeded = false;

for (const [path, budget] of Object.entries(BUDGETS)) {
    // AO.W2 (inv α) — the CSS key gates the resolved `dist/styles/index.css`
    // draw (cascade @imports inlined), not any single on-disk file. The JS
    // entry keeps the per-file `files.find` path. A null (file absent — the
    // footgun left no dist) fails closed, the same shape as a MISSING entry.
    const measured =
        path === "dist/styles/index.css"
            ? combinedStylesDraw(distRoot)
            : files.find((f) => f.file === path);
    const entry = measured
        ? { bytes: measured.bytes ?? measured.raw, gzipBytes: measured.gzipBytes ?? measured.gzip }
        : null;
    if (!entry) {
        budgetReport.push({
            file: path,
            status: "MISSING",
            raw: null,
            gzip: null,
            budgetRaw: budget.raw,
            budgetGzip: budget.gzip,
        });
        anyBudgetExceeded = true;
        continue;
    }
    const rawOk = entry.bytes <= budget.raw;
    const gzipOk = entry.gzipBytes <= budget.gzip;
    const status = rawOk && gzipOk ? "PASS" : "FAIL";
    if (status === "FAIL") anyBudgetExceeded = true;
    budgetReport.push({
        file: path,
        status,
        raw: entry.bytes,
        gzip: entry.gzipBytes,
        budgetRaw: budget.raw,
        budgetGzip: budget.gzip,
        rawHeadroom: budget.raw - entry.bytes,
        gzipHeadroom: budget.gzip - entry.gzipBytes,
    });
}

// D5 (AO.W4; baseline split AP.W4) — per-subpath drift enforcement. Promote
// the subpathEntries table from informational to ENFORCED via a drift-%
// threshold against the COMMITTED `baselinePath` reference — a reviewed git
// object distinct from the ephemeral `artifactPath` profile this run writes.
// The gate reads the baseline; only `--rebaseline` updates it (AP.W4 split,
// retiring the self-erasing read-and-write-the-same-path no-op). Drift-% (not
// absolute per-chunk caps) flags a *regression* — an entry that grew
// unexpectedly — while letting legitimate growth re-baseline via a deliberate
// `--rebaseline` commit: one reviewed reference, one gate, no constant-per-
// chunk maintenance.
//
// Scope:
//   - ENTRY chunks only (kind "entry"). Shared leaves are content-hashed and
//     their names rotate per build, so they are not stable enough to drift-gate.
//   - MIN_GATED_GZIP floor (1024 = 1 KiB): skip drift on sub-1-KiB re-export
//     shim entries (configurator/command/…) so the gate spends enforcement on
//     the chunks that move payload (aurora, dock, glass-ui root, typewriter,
//     search, timeline) and does not flap on 200-byte shim noise.
//   - DRIFT_CEIL = 0.10 (10%, matching the tranche-close headroom convention).
//     FAIL a chunk when drift > DRIFT_CEIL.
//   - A baseline entry absent from current dist is a MISSING FAIL (a published
//     subpath vanished). A current entry absent from baseline is reported but
//     NOT failed (a new subpath — re-baseline to adopt it).
const DRIFT_CEIL = 0.1;
const MIN_GATED_GZIP = 1024;
const subpathReport = [];
let baselineEntries = new Map();
if (existsSync(baselinePath)) {
    try {
        const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
        for (const e of baseline.subpathTable ?? []) {
            if (e.kind === "entry") baselineEntries.set(e.name, e);
        }
    } catch {
        // A malformed/absent baseline leaves baselineEntries empty — D5 simply
        // reports every current entry as NEW (un-failed) until a baseline is
        // committed. The first canonical run writes the baseline the next run
        // drifts against.
    }
}
const currentEntries = new Map(
    subpathEntries.filter((e) => e.kind === "entry").map((e) => [e.name, e]),
);
for (const [name, base] of baselineEntries) {
    const cur = currentEntries.get(name);
    if (!cur) {
        subpathReport.push({
            name,
            status: "MISSING",
            gzip: null,
            baselineGzip: base.gzipBytes,
            drift: null,
        });
        anyBudgetExceeded = true;
        continue;
    }
    if (base.gzipBytes < MIN_GATED_GZIP) {
        subpathReport.push({
            name,
            status: "SKIP",
            gzip: cur.gzipBytes,
            baselineGzip: base.gzipBytes,
            drift: (cur.gzipBytes - base.gzipBytes) / base.gzipBytes,
        });
        continue;
    }
    const drift = (cur.gzipBytes - base.gzipBytes) / base.gzipBytes;
    const status = drift > DRIFT_CEIL ? "FAIL" : "PASS";
    if (status === "FAIL") anyBudgetExceeded = true;
    subpathReport.push({
        name,
        status,
        gzip: cur.gzipBytes,
        baselineGzip: base.gzipBytes,
        drift,
    });
}
for (const [name, cur] of currentEntries) {
    if (baselineEntries.has(name)) continue;
    subpathReport.push({
        name,
        status: "NEW",
        gzip: cur.gzipBytes,
        baselineGzip: null,
        drift: null,
    });
}

// BB.W-PAYLOAD-DEFER — evaluate the critical-path-weight arm (W1 SOURCE+DIST clean,
// W3 aurora-medium status, W4 dts-arm fact). Its SOURCE/DIST violations FAIL the
// budget gate (the lock — a heavy-leaf reach onto the root path reds), folded into
// the same anyBudgetExceeded flag the per-entry ceilings (W2) use.
const criticalPath = evaluateCriticalPath(distRoot);
if (criticalPath.violations.length > 0) anyBudgetExceeded = true;

const profile = {
    generatedAt: snapshotStamp(),
    status: anyBudgetExceeded ? "fail" : "pass",
    command: budgetMode ? "npm run profile:budget" : "npm run profile:bundle",
    buildDurationMs,
    durationMs: Date.now() - startedAt,
    budgets: BUDGETS,
    budgetReport,
    subpathReport,
    criticalPath: { facts: criticalPath.facts, violations: criticalPath.violations },
    totals,
    subpathTotals,
    subpathTable: subpathEntries,
    files,
};

// Ephemeral per-run profile — the informational artifact. NOT the baseline
// the next run reads (that is `baselinePath`, committed + `--rebaseline`-only).
// writeGateArtifact drops `generatedAt` + the volatile timing fields unless
// GATE_SNAPSHOT=1, so the default cache artefact is byte-stable run-to-run and
// only the gzip/raw budget measurements move it. The gate's POINT — those raw
// + gzip byte counts — stays in the artefact.
writeGateArtifact(artifactPath, profile, {
    volatile: ["buildDurationMs", "durationMs"],
});

// `--rebaseline` — the ONLY path that moves the committed D5 reference. A
// reviewed git mutation: a human runs `profile:budget -- --rebaseline` once
// against a canonical `npm run build` dist, then commits the result. The
// baseline carries the same shape the read path parses (`subpathTable`); it
// keeps a real `generatedAt` (a deliberate, reviewed snapshot regardless of
// GATE_SNAPSHOT) for provenance.
if (rebaseline) {
    mkdirSync(dirname(baselinePath), { recursive: true });
    const baselineProfile = {
        ...profile,
        generatedAt: new Date().toISOString(),
    };
    writeFileSync(baselinePath, `${JSON.stringify(baselineProfile, null, 2)}\n`);
    console.log(`D5 baseline rebased: ${baselinePath}`);
}

console.log(`Bundle profile written: ${artifactPath}`);

// Per-subpath gzipped-size table — published as a markdown artefact (so a
// consumer can read it from the repo / a release asset) AND echoed to stdout.
// Sorted largest-gzip first. The `kind` column flags whether the chunk is a
// publishable subpath ENTRY or a SHARED leaf pulled in transitively.
const fmtKiB = (n) => `${(n / 1024).toFixed(1)} KiB`;
const mdRows = subpathEntries.map(
    (e) =>
        `| \`dist/${e.name}\` | ${e.kind} | ${e.bytes} (${fmtKiB(e.bytes)}) | ${e.gzipBytes} (${fmtKiB(e.gzipBytes)}) |`,
);
// The `Generated …` provenance line is volatile — included only under
// GATE_SNAPSHOT so the default cache markdown is byte-stable run-to-run (same
// inv-θ discipline the JSON artefact follows).
const generatedLine = isSnapshot
    ? [`Generated ${snapshotStamp()} by \`scripts/profile-bundle.mjs\`.`]
    : ["Generated by `scripts/profile-bundle.mjs`."];
mkdirSync(dirname(subpathMarkdownPath), { recursive: true });
writeFileSync(
    subpathMarkdownPath,
    [
        "# Per-subpath gzipped-size table",
        "",
        ...generatedLine,
        "Every `dist/*.js` chunk, sorted largest-gzip first. `entry` = a",
        "publishable subpath a consumer imports; `shared` = a Rolldown-extracted",
        "leaf several entries reference. Informational — not gated.",
        "",
        "| Chunk | Kind | Raw | Gzip |",
        "|---|---|---|---|",
        ...mdRows,
        "",
        `**Entries** — ${subpathTotals.entry.files} files, ${subpathTotals.entry.bytes} raw / ${subpathTotals.entry.gzipBytes} gzip.`,
        `**Shared** — ${subpathTotals.shared.files} files, ${subpathTotals.shared.bytes} raw / ${subpathTotals.shared.gzipBytes} gzip.`,
        "",
    ].join("\n"),
);
console.log(`Per-subpath size table written: ${subpathMarkdownPath}`);

console.log("");
console.log("Per-subpath gzipped-size table (largest gzip first):");
console.log(
    `  ${"chunk".padEnd(38)} ${"kind".padEnd(7)} ${"raw".padStart(10)} ${"gzip".padStart(10)}`,
);
for (const e of subpathEntries) {
    console.log(
        `  ${`dist/${e.name}`.padEnd(38)} ${e.kind.padEnd(7)} ${fmtKiB(e.bytes).padStart(10)} ${fmtKiB(e.gzipBytes).padStart(10)}`,
    );
}
console.log(
    `  ${"— entries".padEnd(38)} ${String(subpathTotals.entry.files).padEnd(7)} ${fmtKiB(subpathTotals.entry.bytes).padStart(10)} ${fmtKiB(subpathTotals.entry.gzipBytes).padStart(10)}`,
);
console.log(
    `  ${"— shared".padEnd(38)} ${String(subpathTotals.shared.files).padEnd(7)} ${fmtKiB(subpathTotals.shared.bytes).padStart(10)} ${fmtKiB(subpathTotals.shared.gzipBytes).padStart(10)}`,
);

// Print budget report. Always emitted (including from profile:bundle), but
// only --enforce / profile:budget exits non-zero on FAIL. Format is
// rg-friendly so the CI log filter can pick it up without parsing JSON.
console.log("");
console.log("Bundle budget report:");
for (const row of budgetReport) {
    if (row.status === "MISSING") {
        console.log(`  [MISSING] ${row.file} — expected entry not in dist/`);
        continue;
    }
    const pct = (n, d) => `${((n / d) * 100).toFixed(1)}%`;
    console.log(
        `  [${row.status}] ${row.file} — raw ${row.raw} / ${row.budgetRaw} (${pct(row.raw, row.budgetRaw)}); gzip ${row.gzip} / ${row.budgetGzip} (${pct(row.gzip, row.budgetGzip)})`,
    );
}

// Per-subpath drift report (D5). Same rg-friendly format as the budget report.
// SKIP rows (sub-1-KiB shim entries) and NEW rows (un-baselined subpaths) are
// informational; PASS/FAIL/MISSING are the gated verdicts.
console.log("");
console.log("Per-subpath drift report (entry chunks ≥ 1 KiB, drift vs baseline):");
const driftPct = (d) => `${d >= 0 ? "+" : ""}${(d * 100).toFixed(1)}%`;
for (const row of subpathReport) {
    if (row.status === "MISSING") {
        console.log(
            `  [MISSING] dist/${row.name} — gzip <absent> vs baseline ${row.baselineGzip}`,
        );
        continue;
    }
    if (row.status === "NEW") {
        console.log(
            `  [NEW] dist/${row.name} — gzip ${row.gzip} (no baseline — re-baseline to adopt)`,
        );
        continue;
    }
    if (row.status === "SKIP") {
        console.log(
            `  [SKIP] dist/${row.name} — gzip ${row.gzip} vs baseline ${row.baselineGzip} (below ${MIN_GATED_GZIP}-byte floor)`,
        );
        continue;
    }
    console.log(
        `  [${row.status}] dist/${row.name} — gzip ${row.gzip} vs baseline ${row.baselineGzip} (drift ${driftPct(row.drift)})`,
    );
}

// BB.W-PAYLOAD-DEFER — the critical-path-weight report. Same rg-friendly format.
console.log("");
console.log("Critical-path-weight report (BB.W-PAYLOAD-DEFER):");
{
    const f = criticalPath.facts;
    console.log(
        `  [W1 SOURCE] root-barrel heavy-leaf reach : ${f.sourceReach ?? "none ✓"}`,
    );
    console.log(`  [W1 DIST]   dist/glass-ui.js heavy hits : ${f.distHits}`);
    console.log(
        `  [W3 AURORA] medium tail                  : ${f.auroraMediumSplit} (${f.auroraEagerMediumHits} eager hits)`,
    );
    console.log(
        `  [W4 DTS]    emit-types arm cold / warm   : ${f.dtsArmMs ?? "(not supplied)"}ms / ${f.dtsArmWarmMs ?? "(not supplied)"}ms`,
    );
    if (criticalPath.violations.length) {
        console.log("\n  CRITICAL-PATH VIOLATIONS:");
        for (const v of criticalPath.violations) console.log(`    ✗ ${v}`);
    }
}

if (budgetMode && anyBudgetExceeded) {
    console.error("");
    console.error("Bundle budget exceeded — see report above.");
    process.exit(1);
}
