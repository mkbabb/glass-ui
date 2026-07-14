#!/usr/bin/env node
// proof:drawer-stage — BI.W-DRAWER-PERF: the drawer-lag fix (scope `--stage-t` off
// `documentElement`, cache the drag-span gBCR, blur-once, delete the
// `shouldScaleBackground` dead-knob).
//
// THE DEFECT IT LOCKS. The drawer drag was laggy (HEAD live 90-frame p50 14.7 / max
// 22.5 ms, 6 janky frames, a ForcedReflow flagged in the CDP trace). The root cause is
// NOT the `DRAWER_SNAP` spring — it is three main-thread levers on the per-frame path:
//   (1) `useDrawerSnap.writeScalar` wrote `--stage-t` on `document.documentElement`
//       every frame. `--stage-t` inherited (`inherits: true`), so the write invalidated
//       the inherited-property cache for the WHOLE document — a 120× lever measured
//       (12.53 ms/frame vs 0.104 ms scrim-scoped). `DialogContent.vue` ALSO wrote
//       `--stage-t` at `:root` for the centered-modal flip. BOTH writers must scope onto
//       the reader roots (the sheet · the scrim `[data-stage-scrim]` · the page-wrapper
//       `[data-stage-wrapper]`), and `--stage-t` flips to `inherits: false` so each
//       scoped write recalcs ONLY its own element (a write on the app-root wrapper would
//       otherwise still recalc the whole app subtree).
//   (2) `dragSpan()` called `getBoundingClientRect()` every `onPointerMove` — a forced
//       synchronous reflow. The sheet size is fixed for the gesture, so it is measured
//       ONCE at `onPointerDown` and cached.
//   (3) the `[data-stage-scrim][data-stage-immersive]` backdrop-filter ramped its blur
//       RADIUS on `--stage-t` (`blur(calc(--stage-t * 16px))`) — a per-frame blur
//       re-raster. It becomes a FIXED-radius blur (the dim ramps via the scrim α
//       coupling already present); the backdrop blur ENGAGES at a fixed depth
//       (MOTION-LADDER §1.3, more iOS-faithful) and never re-rasters per frame.
//   (4) `shouldScaleBackground` (retired to the honest `stage=` enum by
//       BD.W-OVERLAY-STAGE-COUPLE) leaves NO lingering name in the live drawer source
//       (clean break, no legacy).
//
// FOUR falsifiable SOURCE witnesses (device-free — the perf win's binding truth is the
// π/DELTA frame-series, W-DRAWER-PERF-DELTA.md; this is the no-device CI half):
//
//   C1 — STAGE-T SCOPED (no `documentElement`/`:root` write). Over useDrawerSnap.ts +
//        DialogContent.vue (comment-stripped): NEITHER references `document.documentElement`,
//        AND NO `--stage-t` setProperty/removeProperty targets `documentElement`/a `root`
//        alias, AND each writer POSITIVELY scopes `--stage-t` onto the reader roots
//        (`[data-stage-scrim]` / `[data-stage-wrapper]`) so the staging is SCOPED, not
//        deleted. RED at HEAD: useDrawerSnap writes `documentElement --stage-t`;
//        DialogContent writes `:root --stage-t` via `document.documentElement`.
//   C2 — DRAGSPAN NOT PER-FRAME. Over useDrawerSnap.ts: `onPointerMove` contains NO
//        `getBoundingClientRect()` (the per-frame reflow), `onPointerDown` measures the
//        span (the cache-at-gesture-start), and `onPointerMove` reads a CACHED span.
//        RED at HEAD: `dragSpan()` (a gBCR) is called inside `onPointerMove`.
//   C3 — NO `--stage-t` BLUR-RADIUS RAMP. Over drawer.css (comment-stripped): NO
//        `backdrop-filter: blur(...)` value contains `--stage-t` (a per-frame radius
//        re-raster). RED at HEAD: `[data-stage-scrim][data-stage-immersive]` ramps
//        `blur(calc(clamp(0, var(--stage-t), 1) * 16px))`.
//   C4 — `shouldScaleBackground` DEFINITION-ABSENT. The identifier appears NOWHERE in
//        the live drawer source (Drawer.vue · DrawerContent.vue · index.ts · drawer.css)
//        NOR the containers/drawer.vue live-behind section — clean break, no lingering
//        legacy name. RED at HEAD if a prop/comment mention survives.
//
// House style mirrors proof-drawer-abrogate.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact via
// gate-output, a human summary, `process.exit(1)` on any violation. `--self-test` feeds
// a synthetic broken set (a `documentElement.style.setProperty('--stage-t', …)` write,
// a per-frame gBCR, a `--stage-t` blur ramp, a `shouldScaleBackground` mention) + a
// clean set and asserts the detector REDS the broken set + GREENS the clean set.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const drawer = (p) => resolve(ROOT, "src/components/ui/drawer", p);
    _cliPaths = {
        ROOT,
        USE_DRAWER_SNAP_TS: drawer("composables/useDrawerSnap.ts"),
        DIALOG_CONTENT_VUE: resolve(
            ROOT,
            "src/components/ui/dialog/DialogContent.vue",
        ),
        DRAWER_CSS: resolve(ROOT, "src/styles/drawer.css"),
        DRAWER_VUE: drawer("Drawer.vue"),
        DRAWER_CONTENT_VUE: drawer("DrawerContent.vue"),
        DRAWER_INDEX_TS: drawer("index.ts"),
        // BI.W-COMPOSITIONS-PRUNE — the live-behind mode folded from its own
        // compositions demo INTO containers/drawer.vue (one comprehensive Drawer page:
        // snap · fixed · live-behind sections). The `shouldScaleBackground`-absent C4
        // arm now scans the merged page.
        DEMO_LIVE_BEHIND: resolve(
            ROOT,
            "demo/stories/containers/drawer.vue",
        ),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DRAWER_STAGE_ARTIFACT",
            "BI-drawer-stage",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out attr/import must not
// satisfy or trip a witness.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Extract the body of a `function <name>(` block by brace-matching from the first `{`
// after the signature. Returns "" when the function is absent.
function functionBody(src, name) {
    const sig = new RegExp(`function\\s+${name}\\s*\\(`);
    const m = sig.exec(src);
    if (!m) return "";
    let i = src.indexOf("{", m.index + m[0].length);
    if (i === -1) return "";
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
            depth--;
            if (depth === 0) return src.slice(start + 1, i);
        }
    }
    return src.slice(start + 1);
}

// A `--stage-t` write (set/remove) whose receiver is `document.documentElement` — the
// precise cross-subtree-storm witness. The aliased form (`const root =
// document.documentElement; root.style.setProperty('--stage-t', …)`) is caught by the
// `referencesDocElem` check (any `document.documentElement` reference in a writer reds),
// so the direct regex stays scoped to the literal receiver — a reader-root loop var
// named `root`/`el` is NEVER a false witness.
const DOCELEM_STAGE_WRITE_RE =
    /document\s*\.\s*documentElement\s*\.\s*style\s*\.\s*(?:set|remove)Property\s*\(\s*["'`]--stage-t["'`]/;

// Any `--stage-t` write at all (used for the positive "scoped, not deleted" assert).
const STAGE_T_WRITE_RE = /\.style\s*\.\s*setProperty\s*\(\s*["'`]--stage-t["'`]/;

/**
 * The W-DRAWER-PERF detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectDrawerStage(sources) {
    const snapTs = stripBlockComments(sources.useDrawerSnapTs ?? "");
    const dialogVue = stripHtmlComments(
        stripBlockComments(sources.dialogContentVue ?? ""),
    );
    const drawerCss = stripBlockComments(sources.drawerCss ?? "");
    // RAW (comments included) — the clean-break scrub of the retired name is a NAME
    // check, so it reads the raw source (a lingering doc-comment mention reds).
    const drawerVueRaw = sources.drawerVue ?? "";
    const drawerContentRaw = sources.drawerContentVue ?? "";
    const drawerIndexRaw = sources.drawerIndexTs ?? "";
    const drawerCssRaw = sources.drawerCss ?? "";
    const demoRaw = sources.demoLiveBehind ?? "";

    const violations = [];

    // ── C1 — STAGE-T SCOPED (no documentElement / :root write) ────────────────
    const writers = {
        "useDrawerSnap.ts": snapTs,
        "DialogContent.vue": dialogVue,
    };
    const c1 = {};
    for (const [name, src] of Object.entries(writers)) {
        const referencesDocElem = /document\s*\.\s*documentElement/.test(src);
        const docElemStageWrite = DOCELEM_STAGE_WRITE_RE.test(src);
        // The positive "scoped, not deleted" assert — the writer still writes
        // `--stage-t` AND resolves the cross-subtree reader roots by their markers.
        const writesStageT = STAGE_T_WRITE_RE.test(src);
        const scopesReaderRoots =
            /data-stage-scrim/.test(src) && /data-stage-wrapper/.test(src);
        c1[name] = {
            referencesDocElem,
            docElemStageWrite,
            writesStageT,
            scopesReaderRoots,
        };
        if (referencesDocElem) {
            violations.push(
                `C1: ${name} still references \`document.documentElement\` — the \`--stage-t\` write must scope onto the reader roots (the sheet · [data-stage-scrim] · [data-stage-wrapper]), NOT the whole document (the 120× main-thread lever).`,
            );
        }
        if (docElemStageWrite) {
            violations.push(
                `C1: ${name} writes \`--stage-t\` on \`documentElement\`/a \`:root\` alias (the whole-document inherited-property invalidation the scoping retires).`,
            );
        }
        if (!writesStageT) {
            violations.push(
                `C1: ${name} writes NO \`--stage-t\` (the staging must be SCOPED to the reader roots, never deleted — a silent removal would break the scrim-deepen / page-recede).`,
            );
        }
        if (!scopesReaderRoots) {
            violations.push(
                `C1: ${name} does not resolve BOTH reader-root markers (\`[data-stage-scrim]\` + \`[data-stage-wrapper]\`) — the scoped write must reach the cross-subtree readers (the 91% critic correction: all three roots, both writers).`,
            );
        }
    }

    // ── C2 — DRAGSPAN NOT PER-FRAME (the gBCR off the settle path) ────────────
    const moveBody = functionBody(snapTs, "onPointerMove");
    const downBody = functionBody(snapTs, "onPointerDown");
    // The per-frame move path must carry NEITHER an inline `getBoundingClientRect()`
    // NOR a call to a measure fn (`dragSpan()`/`measureDragSpan()`) — both are the HEAD
    // per-frame reflow. It reads a CACHED span instead.
    const gbcrInMove = /getBoundingClientRect/.test(moveBody);
    const moveCallsMeasure = /(?:dragSpan|measureDragSpan)\s*\(/.test(moveBody);
    const gbcrInDown = /getBoundingClientRect/.test(downBody);
    const fileHasGbcr = /getBoundingClientRect/.test(snapTs);
    const moveReadsCache = /cachedDragSpan/.test(moveBody);
    // The measure runs at gesture start — `onPointerDown` seeds the cache either by
    // calling the factored measure (`cachedDragSpan = measureDragSpan()`) or by an
    // inline gBCR. Either proves the span is measured ONCE at pointerdown, not per frame.
    const downMeasuresCache =
        /cachedDragSpan\s*=\s*measureDragSpan\s*\(/.test(downBody) || gbcrInDown;
    if (gbcrInMove) {
        violations.push(
            "C2: `onPointerMove` calls `getBoundingClientRect()` (the per-frame forced reflow — the ForcedReflow the trace flagged). Measure the drag span ONCE at `onPointerDown` and read the cache in the move path.",
        );
    }
    if (moveCallsMeasure) {
        violations.push(
            "C2: `onPointerMove` calls a live measure (`dragSpan()`/`measureDragSpan()`) on the per-frame path — the HEAD forced reflow. The move path must read the pointerdown-cached span.",
        );
    }
    if (!fileHasGbcr) {
        violations.push(
            "C2: the drag span is measured nowhere (`getBoundingClientRect` absent) — the gesture still needs the sheet extent, measured ONCE at gesture start.",
        );
    }
    if (!moveReadsCache) {
        violations.push(
            "C2: `onPointerMove` does not read a cached drag span (`cachedDragSpan`) — the per-frame path must consume the pointerdown-cached measure, never a live gBCR.",
        );
    }
    if (!downMeasuresCache) {
        violations.push(
            "C2: `onPointerDown` does not measure + seed the cached drag span (`cachedDragSpan = measureDragSpan()`) — the gesture-start measure must fill the cache the move path reads.",
        );
    }

    // ── C3 — NO `--stage-t` BLUR-RADIUS RAMP ──────────────────────────────────
    // Every `backdrop-filter` / `-webkit-backdrop-filter` declaration value up to the
    // `;`; a value containing BOTH `blur(` and `--stage-t` is a per-frame radius ramp.
    const stageTBlurRamps = [];
    const declRe = /(?:-webkit-)?backdrop-filter\s*:\s*([^;]*);/g;
    let dm;
    while ((dm = declRe.exec(drawerCss)) !== null) {
        const value = dm[1];
        if (/blur\s*\(/.test(value) && /--stage-t/.test(value)) {
            stageTBlurRamps.push(value.trim().replace(/\s+/g, " "));
        }
    }
    if (stageTBlurRamps.length > 0) {
        violations.push(
            `C3: drawer.css carries ${stageTBlurRamps.length} per-frame \`backdrop-filter: blur(...)\` ramp(s) driven by \`--stage-t\` (a per-frame blur re-raster). Use a FIXED-radius blur + the scrim α dim ramp (the backdrop blur ENGAGES at a fixed depth, MOTION-LADDER §1.3).`,
        );
    }

    // ── C4 — `shouldScaleBackground` DEFINITION-ABSENT (clean break) ──────────
    const nameSites = {
        "Drawer.vue": drawerVueRaw,
        "DrawerContent.vue": drawerContentRaw,
        "index.ts": drawerIndexRaw,
        "drawer.css": drawerCssRaw,
        "demo/.../containers/drawer.vue": demoRaw,
    };
    const shouldScaleSites = [];
    for (const [name, src] of Object.entries(nameSites)) {
        if (/shouldScaleBackground/.test(src)) shouldScaleSites.push(name);
    }
    for (const site of shouldScaleSites) {
        violations.push(
            `C4: \`shouldScaleBackground\` still appears in ${site} — the dead knob is RETIRED onto the honest \`stage=\` enum (BD.W-OVERLAY-STAGE-COUPLE); the name must be DEFINITION-ABSENT (clean break, no lingering legacy).`,
        );
    }

    const facts = {
        c1,
        c2: {
            gbcrInMove,
            moveCallsMeasure,
            gbcrInDown,
            fileHasGbcr,
            moveReadsCache,
            downMeasuresCache,
        },
        c3: { stageTBlurRamps },
        c4: { shouldScaleSites },
    };

    return { facts, violations };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// ── The self-test bite (the false-witness discipline) ─────────────────────────
function selfTest() {
    const bad = detectDrawerStage({
        useDrawerSnapTs: `
            function writeScalar(t) {
              const el = contentEl();
              if (el) el.style.setProperty("--glass-drawer-t", \`\${t}\`);
              document.documentElement.style.setProperty("--stage-t", \`\${t}\`);
            }
            function dragSpan() { return contentEl().getBoundingClientRect().height; }
            function onPointerDown(e) { startFraction = 0; }
            function onPointerMove(e) { const d = (coord - startCoord) / dragSpan(); }
        `,
        dialogContentVue: `
            const root = document.documentElement
            root.style.setProperty('--stage-t', '0')
            requestAnimationFrame(() => root.style.setProperty('--stage-t', '1'))
        `,
        drawerCss: `
            [data-stage-scrim][data-stage-immersive] {
              backdrop-filter: blur(calc(clamp(0, var(--stage-t), 1) * 16px));
            }
        `,
        drawerVue: `const shouldScaleBackground = true`,
        drawerContentVue: ``,
        drawerIndexTs: `/* retiring the dead shouldScaleBackground boolean */`,
        demoLiveBehind: `// shouldScaleBackground: false`,
    });
    const good = detectDrawerStage({
        useDrawerSnapTs: `
            let cachedDragSpan = 1;
            function measureDragSpan() { return contentEl().getBoundingClientRect().height; }
            function writeScalar(t) {
              const sheet = contentEl();
              if (sheet) { sheet.style.setProperty("--glass-drawer-t", \`\${t}\`); sheet.style.setProperty("--stage-t", \`\${t}\`); }
              for (const root of crossSubtreeStageRoots()) root.style.setProperty("--stage-t", \`\${t}\`);
            }
            function crossSubtreeStageRoots() {
              scrimEl = document.querySelector("[data-stage-scrim]");
              wrapperEl = document.querySelector("[data-stage-wrapper]");
              return [scrimEl, wrapperEl].filter(Boolean);
            }
            function onPointerDown(e) { startFraction = 0; cachedDragSpan = measureDragSpan(); }
            function onPointerMove(e) { const d = (coord - startCoord) / cachedDragSpan; }
        `,
        dialogContentVue: `
            function syncStage(open) {
              const wrapper = document.querySelector('[data-stage-wrapper]')
              const scrim = document.querySelector('[data-stage-scrim]')
              if (open) requestAnimationFrame(() => {
                for (const el of [wrapper, scrim]) { if (el) { el.setAttribute('data-stage-flip',''); el.style.setProperty('--stage-t','0'); } }
                requestAnimationFrame(() => { for (const el of [wrapper, scrim]) if (el) el.style.setProperty('--stage-t','1') })
              })
            }
        `,
        drawerCss: `
            [data-stage-scrim][data-stage-immersive] {
              backdrop-filter: blur(16px);
            }
            [data-stage-scrim] { background: color-mix(in srgb, var(--overlay-scrim-ink) calc((0.28 + clamp(0, var(--stage-t), 1) * 0.44) * 100%), transparent); }
        `,
        drawerVue: `const stage = 'scale'`,
        drawerContentVue: `const surface = 'glass'`,
        drawerIndexTs: `export type DrawerStage = 'none' | 'dim' | 'scale' | 'immersive'`,
        demoLiveBehind: `const liveOpen = ref(false)`,
    });
    const checks = [
        ["bad set reds C1 (documentElement --stage-t)", bad.violations.some((v) => v.startsWith("C1"))],
        ["bad set reds C2 (per-frame gBCR)", bad.violations.some((v) => v.startsWith("C2"))],
        ["bad set reds C3 (--stage-t blur ramp)", bad.violations.some((v) => v.startsWith("C3"))],
        ["bad set reds C4 (shouldScaleBackground)", bad.violations.some((v) => v.startsWith("C4"))],
        ["good set is CLEAN", good.violations.length === 0],
    ];
    let ok = true;
    console.log("proof:drawer-stage --self-test (the false-witness bite)");
    for (const [label, pass] of checks) {
        console.log(`  ${pass ? "✓" : "✗"} ${label}`);
        if (!pass) ok = false;
    }
    if (!ok && good.violations.length) {
        console.log("  good-set residual violations:");
        for (const v of good.violations) console.log(`    - ${v}`);
    }
    process.exit(ok ? 0 : 1);
}

function run() {
    if (process.argv.includes("--self-test")) {
        selfTest();
        return;
    }
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectDrawerStage({
        useDrawerSnapTs: safeRead(P.USE_DRAWER_SNAP_TS),
        dialogContentVue: safeRead(P.DIALOG_CONTENT_VUE),
        drawerCss: safeRead(P.DRAWER_CSS),
        drawerVue: safeRead(P.DRAWER_VUE),
        drawerContentVue: safeRead(P.DRAWER_CONTENT_VUE),
        drawerIndexTs: safeRead(P.DRAWER_INDEX_TS),
        demoLiveBehind: safeRead(P.DEMO_LIVE_BEHIND),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:drawer-stage",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    const snapClean =
        !facts.c1["useDrawerSnap.ts"].referencesDocElem &&
        facts.c1["useDrawerSnap.ts"].writesStageT &&
        facts.c1["useDrawerSnap.ts"].scopesReaderRoots;
    const dialogClean =
        !facts.c1["DialogContent.vue"].referencesDocElem &&
        facts.c1["DialogContent.vue"].writesStageT &&
        facts.c1["DialogContent.vue"].scopesReaderRoots;
    console.log(
        "proof:drawer-stage — the drawer-lag fix (stage-scope both writers, cached rect, blur-once, dead-knob delete) (BI.W-DRAWER-PERF)",
    );
    console.log(
        `  C1 --stage-t scoped (both writers): ${yn(snapClean && dialogClean)}  (snap:${yn(snapClean)} dialog:${yn(dialogClean)})`,
    );
    console.log(
        `  C2 dragSpan not per-frame         : ${yn(
            !facts.c2.gbcrInMove &&
                !facts.c2.moveCallsMeasure &&
                facts.c2.fileHasGbcr &&
                facts.c2.moveReadsCache &&
                facts.c2.downMeasuresCache,
        )}  (gBCR-in-move:${yn(facts.c2.gbcrInMove)} move-calls-measure:${yn(facts.c2.moveCallsMeasure)})`,
    );
    console.log(
        `  C3 no --stage-t blur ramp         : ${yn(facts.c3.stageTBlurRamps.length === 0)}  (ramps:${facts.c3.stageTBlurRamps.length})`,
    );
    console.log(
        `  C4 shouldScaleBackground absent   : ${yn(facts.c4.shouldScaleSites.length === 0)}  (sites:${facts.c4.shouldScaleSites.length})`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
