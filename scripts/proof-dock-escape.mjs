#!/usr/bin/env node
// BI.W-DOCK-ESCAPE — proof:dock-escape, the born-RED top-layer popover ESCAPE gate
// (PASS-1 §2.3, PASS-4B rulings 2 + 4 — the UF-C2 rail-overlap cure).
//
// The rail/fan defect (UF-C2 — "fanned chips overlap the dock body, misaligned geometry")
// is a downstream compensation for the triple-identity clip box: the fan escaped a clipping
// ancestor via the hand-rolled `.glass-dock-frame` `display:contents` sibling + the
// `railProjection.ts` φ²-crossing ring math. The idiomatic fix is the TOP LAYER: the
// satellite fan / facet strip / dock menus / search dropdown render as native `popover`
// elements, exempt from ancestor `overflow`/`clip`/`contain`/`transform`/`filter` BY SPEC.
// Placement is the JS ONE-SHOT (`getBoundingClientRect`) — byte-identical on both engines;
// native CSS anchor positioning (`anchor()`/`position-anchor`/`@position-try`) is BANKED
// (the SAF-1 Safari-transform-chain landmine fenced by construction).
//
// PURE DEVICE-FREE static src-scan (Vue-template + TS + CSS scans; no browser, no GPU).
// Runs on EVERY runner → carries `tags: ["local","ci"]`.
//
// CLAUSES (born-RED on the pre-wave tree — `railProjection.ts` + the `.glass-dock-frame`
// escape live on disk; the fan is a clipped in-box sibling, no popover):
//   E1 top-layer-fan — the fan surface is a `popover` element composing `useDockPopover`;
//      `railProjection` is DEFINITION-ABSENT (ZERO `railProjection`/`projectFacets`/
//      `RAIL_GOLDEN_SQ` in `src/`); GlassDock.vue no longer RENDERS `.glass-dock-frame`
//      (the escape retired); the rail CSS (`stack-rail.css`) is DEFINITION-ABSENT. [The
//      full-`src/` `.glass-dock-frame` sweep — the fission/siri/reserve residuals —
//      terminalizes in W-DOCK-RETIRES R4 per the interlock; ESCAPE retires the RENDER +
//      the rail CSS + railProjection, wiring the replacement so R4 is a clean delete.]
//   E2 single-placement-path — exactly ONE placement mechanism (the JS one-shot writes
//      `position: fixed` + top/left); ZERO `anchor-name`/`position-anchor`/`@position-try`/
//      bare `anchor()` in the dock CSS (the banked native arm is absent — no dual path).
//   E3 transform-safe — the placement reads `getBoundingClientRect`; the SAF-1 fence holds
//      (the placement path carries ZERO native `anchor()`/`anchor-name`/`position-anchor`
//      read — placement is transform-safe rect math, working through the transform-free
//      centered dock on both engines).
//
// Self-test bites (each planted defect MUST flag): a synthetic re-added native `anchor-name`
// arm in the dock CSS REDs E2; a synthetic re-minted `railProjection` export REDs E1.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const PATHS = {
    ROOT,
    DOCKSTACK: resolve(ROOT, "src/components/custom/dock/DockStack.vue"),
    POPOVER_TS: resolve(ROOT, "src/components/custom/dock/composables/useDockPopover.ts"),
    GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
    POPOVER_CSS: resolve(ROOT, "src/styles/dock/popover.css"),
    STACK_RAIL: resolve(ROOT, "src/styles/dock/stack-rail.css"),
    RAILPROJ: resolve(ROOT, "src/components/custom/dock/composables/railProjection.ts"),
    DOCK_CSS_DIR: resolve(ROOT, "src/styles/dock"),
    DOCK_CSS_ROOT: resolve(ROOT, "src/styles/dock.css"),
    SRC_DIR: resolve(ROOT, "src"),
    ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_ESCAPE_ARTIFACT", "dock-escape"),
};

/** Blank CSS `/* *​/` comments (the house stripComments idiom — a documented HEAD pattern
 *  in prose never false-matches a live-rule scan). */
function stripCssComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}
/** Blank Vue `<!-- -->` template comments + `// …` and `/* *​/` script comments. */
function stripVueComments(text) {
    return text
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}
/** Blank TS line + block comments (URL-safe `//` strip — the clause-7 house idiom). */
function stripTsComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/** Walk `src/` for `.ts`/`.vue`/`.mts` files, returning `[{ path, text }]`. */
function walkSrc(dir) {
    const out = [];
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) {
            out.push(...walkSrc(full));
        } else if (/\.(ts|mts|vue)$/.test(name)) {
            out.push({ path: full, text: readFileSync(full, "utf8") });
        }
    }
    return out;
}

/** The concatenated dock CSS (all partials + the dock.css root), comments stripped. */
function dockCssConcat() {
    let text = "";
    if (existsSync(PATHS.DOCK_CSS_DIR)) {
        for (const name of readdirSync(PATHS.DOCK_CSS_DIR)) {
            if (name.endsWith(".css")) {
                text += "\n/* FILE " + name + " */\n" + read(join(PATHS.DOCK_CSS_DIR, name));
            }
        }
    }
    text += "\n/* FILE dock.css */\n" + read(PATHS.DOCK_CSS_ROOT);
    return stripCssComments(text);
}

// ── E1 — top-layer-fan ─────────────────────────────────────────────────────────
function checkE1({ dockStackText, glassDockText, popoverCssText, railProjectionHits, stackRailExists }) {
    const violations = [];
    const facts = {};

    // (a) the fan surface is a `popover` element composing useDockPopover.
    const stack = stripVueComments(dockStackText);
    const fanIsPopover = /popover\s*=\s*["']?(manual|auto|"")/.test(stack) || /\bpopover=/.test(stack);
    const composesPopover = /useDockPopover\s*\(/.test(stack) && /useDockPopover/.test(dockStackText);
    facts.e1FanIsPopover = fanIsPopover;
    facts.e1ComposesUseDockPopover = composesPopover;
    if (!fanIsPopover) {
        violations.push(
            "E1 — DockStack's fan surface is NOT a `popover` element; the fan must render in the TOP LAYER (spec-exempt from ancestor clip/contain/transform)",
        );
    }
    if (!composesPopover) {
        violations.push(
            "E1 — DockStack does NOT compose `useDockPopover` (the JS one-shot placement of the top-layer surface)",
        );
    }

    // (b) railProjection DEFINITION-ABSENT — ZERO railProjection/projectFacets/RAIL_GOLDEN_SQ in src/.
    facts.e1RailProjectionHits = railProjectionHits;
    if (railProjectionHits.length) {
        violations.push(
            `E1 — railProjection is NOT definition-absent (${railProjectionHits.length} src reference(s): ${railProjectionHits
                .slice(0, 4)
                .join(", ")}); the φ²-crossing ring math RETIRES (PASS-4B ruling 4 — an anchored flex strip needs no tier math)`,
        );
    }

    // (c) the `.glass-dock-frame` ESCAPE retired from the RENDER + the rail CSS.
    const glassDock = stripVueComments(glassDockText);
    const rendersFrame = /glass-dock-frame/.test(glassDock);
    facts.e1GlassDockRendersFrame = rendersFrame;
    if (rendersFrame) {
        violations.push(
            "E1 — GlassDock.vue still RENDERS `.glass-dock-frame` (the hand-rolled display:contents escape); the top-layer popover replaces it — there is nothing to escape from",
        );
    }
    const popoverCssRefsFrame = /glass-dock-frame|dock-hairline-slot/.test(stripCssComments(popoverCssText));
    facts.e1PopoverCssRefsFrame = popoverCssRefsFrame;
    if (popoverCssRefsFrame) {
        violations.push(
            "E1 — the rail popover CSS references `.glass-dock-frame`/`.dock-hairline-slot`; the escape wrapper is retired (the fan is top-layer)",
        );
    }
    facts.e1StackRailAbsent = !stackRailExists;
    if (stackRailExists) {
        violations.push(
            "E1 — `stack-rail.css` (the rail-escape CSS) is NOT definition-absent; it is replaced by `popover.css` (the top-layer fan surface)",
        );
    }

    return { violations, facts };
}

// ── E2 — single-placement-path ──────────────────────────────────────────────────
function checkE2({ dockCssText, popoverTsText }) {
    const violations = [];
    const facts = {};

    // (a) ZERO native CSS anchor positioning in the dock CSS (comments already stripped).
    const anchorHits = [];
    if (/anchor-name\s*:/.test(dockCssText)) anchorHits.push("anchor-name");
    if (/position-anchor\s*:/.test(dockCssText)) anchorHits.push("position-anchor");
    if (/@position-try/.test(dockCssText)) anchorHits.push("@position-try");
    // a bare `anchor(` in a live CSS value (a `top: anchor(bottom)` native arm).
    if (/[:(]\s*anchor\s*\(/.test(dockCssText)) anchorHits.push("anchor()");
    facts.e2DockCssAnchorHits = anchorHits;
    if (anchorHits.length) {
        violations.push(
            `E2 — the dock CSS carries native anchor positioning (${anchorHits.join(
                ", ",
            )}); the banked native arm must be ABSENT — the JS one-shot is THE path (no dual path)`,
        );
    }

    // (b) exactly ONE placement mechanism — the JS one-shot writes `position: fixed` + top/left.
    const ts = stripTsComments(popoverTsText);
    const writesFixed = /position\s*=\s*["']fixed["']/.test(ts);
    const writesCoords = /\.style\.top\s*=/.test(ts) && /\.style\.left\s*=/.test(ts);
    facts.e2JsOneShotWritesFixed = writesFixed;
    facts.e2JsOneShotWritesCoords = writesCoords;
    if (!writesFixed || !writesCoords) {
        violations.push(
            "E2 — the JS one-shot placement does NOT write `position: fixed` + top/left; the sole placement mechanism must set the fixed coords",
        );
    }

    return { violations, facts };
}

// ── E3 — transform-safe (the SAF-1 fence) ───────────────────────────────────────
function checkE3({ popoverTsText }) {
    const violations = [];
    const facts = {};
    const ts = stripTsComments(popoverTsText);

    const readsRect = /getBoundingClientRect\s*\(/.test(ts);
    facts.e3ReadsBoundingRect = readsRect;
    if (!readsRect) {
        violations.push(
            "E3 — the placement does NOT read `getBoundingClientRect`; the transform-safe rect one-shot is the SAF-1-fenced placement (native `anchor()` mis-resolves through a transformed chain on Safari 26)",
        );
    }

    // the SAF-1 fence: ZERO native anchor READ in the placement path (comments stripped).
    // Native CSS anchor positioning in JS is ALWAYS a string form (`.style.top =
    // "anchor(…)"` / `.setProperty("position-anchor", …)`), so the CSS-token + quoted-
    // `anchor(` scan catches a re-added native arm WITHOUT false-matching the composable's
    // own `options.anchor()` element-getter method call (a `.anchor(` method, not CSS).
    const anchorReadHits = [];
    if (/anchor-name/.test(ts)) anchorReadHits.push("anchor-name");
    if (/position-anchor/.test(ts)) anchorReadHits.push("position-anchor");
    if (/@position-try|position-try/.test(ts)) anchorReadHits.push("position-try");
    if (/["'`]\s*anchor\s*\(/.test(ts)) anchorReadHits.push("anchor() CSS string");
    facts.e3AnchorReadHits = anchorReadHits;
    if (anchorReadHits.length) {
        violations.push(
            `E3 — the placement path reads native anchor positioning (${anchorReadHits.join(
                ", ",
            )}); the SAF-1 fence forbids it (banked native arm — no anchor() read)`,
        );
    }

    return { violations, facts };
}

// ── self-test bites ──────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // E2 bite — a synthetic re-added native `anchor-name` arm in the dock CSS MUST flag.
    const e2 = checkE2({
        dockCssText: ".dock-stack-fan { anchor-name: --dock-anchor; position-anchor: --dock-anchor; }",
        popoverTsText: 'el.style.position = "fixed"; el.style.top = x; el.style.left = y;',
    });
    if (!e2.violations.some((v) => v.startsWith("E2") && /anchor-name/.test(v))) {
        errors.push("E2 self-test BROKE — a synthetic native `anchor-name` arm was NOT flagged (the banked-arm fence not load-bearing)");
    }

    // E1 bite — a synthetic re-minted `railProjection` export MUST flag.
    const e1 = checkE1({
        dockStackText: '<div popover="manual"></div> useDockPopover({})',
        glassDockText: "<div class=\"glass-dock\"></div>",
        popoverCssText: ".dock-stack-fan[popover] {}",
        railProjectionHits: ["src/components/custom/dock/composables/railProjection.ts: export function projectFacets"],
        stackRailExists: false,
    });
    if (!e1.violations.some((v) => v.startsWith("E1") && /railProjection/.test(v))) {
        errors.push("E1 self-test BROKE — a synthetic re-minted `railProjection` export was NOT flagged");
    }

    return { ok: errors.length === 0, errors };
}

function railProjectionHitsInSrc() {
    const hits = [];
    const rx = /\b(railProjection|projectFacets|RAIL_GOLDEN_SQ)\b/;
    for (const { path, text } of walkSrc(PATHS.SRC_DIR)) {
        const clean = /\.vue$/.test(path) ? stripVueComments(text) : stripTsComments(text);
        const m = clean.match(rx);
        if (m) hits.push(`${relative(PATHS.ROOT, path)}: ${m[1]}`);
    }
    return hits;
}

function run() {
    const dockStackText = read(PATHS.DOCKSTACK);
    const popoverTsText = read(PATHS.POPOVER_TS);
    const glassDockText = read(PATHS.GLASSDOCK);
    const popoverCssText = read(PATHS.POPOVER_CSS);
    const stackRailExists = existsSync(PATHS.STACK_RAIL);
    const dockCssText = dockCssConcat();
    const railProjectionHits = railProjectionHitsInSrc();

    const e1 = checkE1({ dockStackText, glassDockText, popoverCssText, railProjectionHits, stackRailExists });
    const e2 = checkE2({ dockCssText, popoverTsText });
    const e3 = checkE3({ popoverTsText });
    const self = selfTest();

    const violations = [...e1.violations, ...e2.violations, ...e3.violations, ...self.errors];
    const facts = { ...e1.facts, ...e2.facts, ...e3.facts, selfTest: self.ok };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-escape",
        note: "BI.W-DOCK-ESCAPE — the top-layer popover ESCAPE (fans / satellites / menus / search). The fan/facet strip render as native `popover` elements (top layer, spec-exempt from ancestor clip/transform/contain), placed by the JS one-shot `getBoundingClientRect` (native CSS anchor positioning BANKED — the SAF-1 fence). E1 top-layer-fan (railProjection DEFINITION-ABSENT + the `.glass-dock-frame` render retired) · E2 single-placement-path (ZERO anchor-name/position-anchor/@position-try in the dock CSS) · E3 transform-safe (getBoundingClientRect, no native anchor() read) + 2 self-test bites. [The full-src `.glass-dock-frame` sweep terminalizes in W-DOCK-RETIRES R4.]",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-escape — the top-layer popover ESCAPE gate (BI.W-DOCK-ESCAPE; UF-C2 rail-overlap cure)");
    console.log(
        `  E1 top-layer-fan          : popover=${facts.e1FanIsPopover} useDockPopover=${facts.e1ComposesUseDockPopover} railProjection-hits=${facts.e1RailProjectionHits?.length ?? "?"} frame-render=${facts.e1GlassDockRendersFrame} stack-rail-absent=${facts.e1StackRailAbsent} ${ok(e1.violations.length === 0)}`,
    );
    console.log(
        `  E2 single-placement-path  : dock-css-anchor-hits=${facts.e2DockCssAnchorHits?.length ?? "?"} js-fixed=${facts.e2JsOneShotWritesFixed} js-coords=${facts.e2JsOneShotWritesCoords} ${ok(e2.violations.length === 0)}`,
    );
    console.log(
        `  E3 transform-safe         : getBoundingClientRect=${facts.e3ReadsBoundingRect} anchor-read-hits=${facts.e3AnchorReadHits?.length ?? "?"} ${ok(e3.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, PATHS.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkE1, checkE2, checkE3, selfTest };
