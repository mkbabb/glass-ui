#!/usr/bin/env node
// proof:dock — the dock-band silhouette-CUT VERIFY + dock-side clearance gate
// (BG.W-DOCK-CUT; F3 dock, paint-class H) + the GLYPH-RIGID morph arm
// (BG.W-DOCK-GLYPH-RIGID; F3.R1, IOS27-MOTION-TRUTH paint-repair).
//
// `useDockContextSilhouette.ts` (551L) was the BE dock context→silhouette state
// machine with ZERO real import consumers (only an AppSwitcher.vue rationale
// COMMENT, which imports `useBloomUp` instead). The DELETE is owned ONCE by
// `BG.W-DEAD-COMPOSABLE-CUT` (ratchet #8 — R1); THIS wave VERIFIES the dock band
// is CLEAR of the dead engine + its retired companions, from the DOCK side.
//
// The distinct value beside proof:motion (which owns the MOTION-band dead-cut
// census — the composable + the retired gate SCRIPT) is the CHRONIC-5 close:
// "every dock cut reds a registered gate." A retired gate whose ID lingers in
// the manifest (`gates.mjs`) or `package.json` re-emits into `ci.yml` and CI
// then runs a non-existent npm script. proof:dock asserts `proof:dock-context`
// is FULLY de-registered (script file gone AND no manifest row AND no package
// script), plus the anti-over-cut fence: the LIVE `DOCK_CONTEXT_LABEL` +
// `dockContext.ts` dock-context DI primitive (UNRELATED to the dead silhouette
// engine, only a name overlap) is KEPT.
//
// Pure FS, device-free (paint-class H). On HEAD the cut + retirement already
// landed (precond 10.5), so the clauses are GREEN; the born-RED capability is
// proven by the self-test bites — each synthetic sabotage reproduces a
// pre-cut / re-registration fragment and REDs its clause, and each fence bite
// (a comment mention, the `-contextual-layers` substring, the live DI) must NOT
// flag.
//
// Asserts:
//   D1 — SILHOUETTE-COMPOSABLE-ABSENT: the 551L
//        `src/components/custom/dock/composables/useDockContextSilhouette.ts`
//        is DEFINITION-ABSENT on disk.
//   D2 — SILHOUETTE-TEST-ABSENT:
//        `tests/components/custom/dock/useDockContextSilhouette.test.ts` gone.
//   D3 — DEAD-GATE-FULLY-RETIRED: `scripts/proof-dock-context.mjs` gone AND
//        `gates.mjs` carries NO `proof:dock-context` row AND `package.json`
//        carries NO `proof:dock-context` script (the CHRONIC-5 dead-gate
//        re-point closed at the manifest — so `renderCiYaml` never re-emits it;
//        the `-contextual-layers` sibling is FENCED by the boundary regex).
//   D4 — DOCK-SURFACES-CLEAR: no comment-stripped live reference to
//        `useDockContextSilhouette` / `DockSilhouetteDescriptor` survives in the
//        dock source tree (`src/components/custom/dock/**`) or the dock demo
//        stories (`demo/stories/dock/**`) — a runtime import of a deleted module
//        breaks build. A historical rationale COMMENT does NOT flag (the
//        comment-strip fence — AppSwitcher.vue's "as fits" note is history).
//   D5 — LIVE-DOCK-CONTEXT-DI-KEPT (the anti-over-cut fence): the LIVE
//        `DOCK_CONTEXT_LABEL` constant (constants.ts) + `dockContext.ts` DI
//        primitive SURVIVE — the dock-context DI shares the "context" name with
//        the dead silhouette engine but is a DISTINCT live consumer; an
//        over-eager cut deleting it is forbidden.
//
// ── The GLYPH-RIGID morph arm (BG.W-DOCK-GLYPH-RIGID; F3.R1) ────────────────────
// The dock morph paints RIGID content over a MORPHING plate. The box-size morph
// (shape.css `.glass-dock[data-morphing]…{scale}`) scales the WHOLE `.glass-dock`
// subtree by `--dock-size-scale` on the morph axis (1 → 0.06 on collapse), which
// scaleX-squishes every glyph to a compressed SLIVER mid-morph and left the
// collapsed REST a compressed glyph in a rounded square (not the AY.W-DOCK-NAV B4
// 1:1 circle). The FIX is an inner CONTENT layer carrying the per-frame INVERSE of
// the root morph-axis footprint scale (`scale: calc(1 / max(var(--dock-size-scale),
// 0.06)) …` on `.dock-persistent`/`.dock-layers`, compositor-only), so the plate
// scales and the glyphs do NOT; at settle the residual scale lives ONLY under
// `[data-morphing]` (the orchestrator clears the attrs BEFORE the scalar so the
// true collapsed/expanded box seats `scale: none`). This arm asserts the SOURCE
// mechanism (the binding per-frame glyph-bbox ±5% screencast π rides the paint
// judge — device-free here):
//   G1 — INVERSE-SCALE-CONTENT-LAYER: shape.css declares the inverse-scale rule on
//        BOTH content children (`.dock-persistent` AND `.dock-layers`), on BOTH
//        orientation axes (horizontal inverts X, vertical inverts Y), gated on the
//        morph window (`[data-morphing]`/`[data-punching]`), inverting the footprint
//        factor `--dock-size-scale` (NOT `--stretch`/`--dock-punch-stretch` — those
//        are the sub-perceptual volume-preserving squish the content is MEANT to
//        carry), with the `max(…, 0.06)` div-by-zero clamp floor.
//   G2 — SETTLE-DROPS-RESIDUAL: dockMorphContext.ts `maybeSettleRoot` removes the
//        `data-morphing`/`data-punching` attrs BEFORE removing the `--dock-morph-t`
//        scalar, so the box-scale + inverse rules stop matching before the
//        registered property reverts to its `initial-value` — no one-frame
//        collapsed-look flash on the settled true box (spec vocab (b)).
//
// Self-test bites (born-RED demonstration): a re-added silhouette composable REDs
// D1; a re-added test REDs D2; a surviving gate script / a re-added
// `proof:dock-context` manifest row / a re-added package script each RED D3 while
// a bare `proof:dock-contextual-layers` row does NOT (the boundary fence); a live
// `import { useDockContextSilhouette }` in the dock tree REDs D4 while a bare
// comment mention does NOT (the strip fence); a missing `DOCK_CONTEXT_LABEL` or a
// deleted `dockContext.ts` REDs D5 (the over-cut); a shape.css MISSING the inverse
// on a content child / on an axis / not gated on the morph window / inverting the
// wrong factor REDs G1; a settle that removes the scalar BEFORE the attrs REDs G2.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock";
const SELF_TEST = process.argv.includes("--self-test");

const SILHOUETTE_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/useDockContextSilhouette.ts",
);
const SILHOUETTE_TEST = resolve(
    ROOT,
    "tests/components/custom/dock/useDockContextSilhouette.test.ts",
);
const DEAD_GATE_SCRIPT = resolve(ROOT, "scripts/proof-dock-context.mjs");
const GATES_MJS = resolve(ROOT, "scripts/gates.mjs");
const PACKAGE_JSON = resolve(ROOT, "package.json");
const DOCK_CONSTANTS = resolve(ROOT, "src/components/custom/dock/constants.ts");
const DOCK_CONTEXT_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/dockContext.ts",
);
// ── The GLYPH-RIGID arm sources ──
const DOCK_SHAPE_CSS = resolve(ROOT, "src/styles/dock/shape.css");
const DOCK_MORPH_CONTEXT_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/dockMorphContext.ts",
);
// ── The PANE-OVERLAP arm sources (BG.W-DOCK-PANE-OVERLAP; F3.R2) ──
// The overlapped crossfade lives in DockLayerGroup.vue's unlayered SFC `<style>` block
// (it wins over the `@layer components` sequential base ramps in dock/layers.css); the
// standalone-stack box-FLIP monotonic reserve+clip-reveal drive lives in
// useLayerTransition.ts (the standalone engine — a nested group defers to the
// orchestrator's convex-blend box).
const DOCK_LAYER_GROUP_VUE = resolve(
    ROOT,
    "src/components/custom/dock/DockLayerGroup.vue",
);
const USE_LAYER_TRANSITION_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/useLayerTransition.ts",
);
// The two morph-region CONTENT children that carry the inverse-scale (the plate
// scales, these do NOT). Both must carry the inverse on both axes.
const RIGID_CONTENT_CHILDREN = [".dock-persistent", ".dock-layers"];

// The dead-engine identifiers a live wire would name.
const DEAD_TOKENS = ["useDockContextSilhouette", "DockSilhouetteDescriptor"];
// The live dock-context DI constant — KEPT (the anti-over-cut fence).
const LIVE_DI_LABEL = "DOCK_CONTEXT_LABEL";

// The dock corpus for D4 — the dock band's own source turf + its demo stories.
const DOCK_CORPUS_ROOTS = ["src/components/custom/dock", "demo/stories/dock"];
const CORPUS_EXTS = new Set([".ts", ".vue", ".mjs"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);

// Retired-gate REGISTRATION matchers — the FORM, not prose. The closing quote
// must sit immediately after `context`, so the `-contextual-layers` sibling is
// FENCED (its quote is after `layers`), AND a note STRING that merely NAMES the
// retired gate ("supersedes proof:dock-context") never false-REDs (only an
// actual `id:`/`cmd:` manifest row or a package script KEY is a registration).
const MANIFEST_ROW_RE = /\b(?:id|cmd)\s*:\s*["']proof:dock-context["']/;
const PACKAGE_SCRIPT_RE = /["']proof:dock-context["']\s*:/;

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip /* block */ + // line + <!-- vue --> comments so a provenance comment
// that NAMES the retired engine is never a false RED — a token named in a
// comment is history, never a live wire. The // strip is URL-safe (the
// `(^|[^:])//` house idiom) so a `://` in a string literal survives.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/gm, "$1");
}

// Walk the dock corpus roots → [{ rel, stripped }].
function collectDockCorpus() {
    const out = [];
    const walk = (dir) => {
        let entries;
        try {
            entries = readdirSync(dir, { withFileTypes: true });
        } catch {
            return;
        }
        for (const e of entries) {
            if (IGNORE_DIRS.has(e.name)) continue;
            const full = resolve(dir, e.name);
            if (e.isDirectory()) {
                walk(full);
                continue;
            }
            const dot = e.name.lastIndexOf(".");
            const ext = dot >= 0 ? e.name.slice(dot) : "";
            if (!CORPUS_EXTS.has(ext)) continue;
            out.push({
                rel: full.slice(ROOT.length + 1),
                stripped: stripComments(readFileSync(full, "utf8")),
            });
        }
    };
    for (const r of DOCK_CORPUS_ROOTS) walk(resolve(ROOT, r));
    return out;
}

// ── GLYPH-RIGID G1 — detect the inverse-scale content-layer rule. ──
// For each content child on each orientation axis, find a rule whose SELECTOR list
// carries `.glass-dock[data-morphing]…{axis}…> <child>` (the morph-window gate + the
// axis qualifier + the direct-child content selector) AND whose BODY inverts the
// footprint factor via `1 / max(var(--dock-size-scale)…, 0.06)` on a `scale:` decl.
// The horizontal axis is `:not(.vertical)` inverting X (first scale component);
// vertical is `.vertical` inverting Y (second component).
function detectGlyphRigid(shapeSrc) {
    const src = stripComments(shapeSrc);
    // Split into rule blocks (selector { body }). A coarse split on `}` is enough
    // here — we only need to find a block whose selector + body both match.
    const blocks = [];
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(src)) !== null) {
        blocks.push({ selector: m[1], body: m[2] });
    }
    // The inverse decl: a `scale:` that carries `1 / max(var(--dock-size-scale…,0.06)`.
    // (Whitespace-insensitive; the `--dock-size-scale` fallback + the 0.06 floor.)
    const invertsFootprint = (body) =>
        /scale\s*:/.test(body) &&
        /1\s*\/\s*max\(\s*var\(\s*--dock-size-scale[^)]*\)\s*,\s*0\.06\s*\)/.test(
            body,
        );
    // A block is the HORIZONTAL inverse for `child` iff its selector targets the
    // child as a direct child under a `[data-morphing]`/`[data-punching]` +
    // `:not(.vertical)` dock, and the FIRST scale component is the inverse (X).
    const findAxisRule = (child, axis) => {
        const axisQual = axis === "x" ? ":not(.vertical)" : ".vertical";
        for (const b of blocks) {
            const sel = b.selector;
            const gated =
                /\.glass-dock\[data-morphing\]/.test(sel) ||
                /\.glass-dock\[data-punching\]/.test(sel);
            const hasAxis = sel.includes(axisQual);
            const hasChild =
                new RegExp(`>\\s*${child.replace(".", "\\.")}\\b`).test(sel);
            if (!gated || !hasAxis || !hasChild) continue;
            if (!invertsFootprint(b.body)) continue;
            // The axis component check: horizontal must invert the FIRST scale
            // component (X free, Y = 1); vertical the SECOND (X = 1, Y free). Read
            // the `scale:` value and confirm the inverse sits on the right axis.
            const scaleM = b.body.match(/scale\s*:\s*([^;]+);/);
            if (!scaleM) continue;
            const scaleVal = scaleM[1].trim();
            // Horizontal: `<inverse> 1` — inverse first, identity `1` last.
            // Vertical:   `1 <inverse>` — identity `1` first, inverse last.
            const idxInverse = scaleVal.indexOf("--dock-size-scale");
            const idxOne = scaleVal.search(/(^|\s)1(\s|$)/);
            if (idxInverse < 0 || idxOne < 0) continue;
            const inverseFirst = idxInverse < idxOne;
            if (axis === "x" && inverseFirst) return true; // X inverted, Y = 1
            if (axis === "y" && !inverseFirst) return true; // X = 1, Y inverted
        }
        return false;
    };
    const facts = {};
    let ok = true;
    for (const child of RIGID_CONTENT_CHILDREN) {
        const xOk = findAxisRule(child, "x");
        const yOk = findAxisRule(child, "y");
        facts[`${child}-x`] = xOk;
        facts[`${child}-y`] = yOk;
        if (!xOk || !yOk) ok = false;
    }
    return { ok, facts };
}

// ── GLYPH-RIGID G2 — detect the settle drops the morph attrs BEFORE the scalar. ──
// In `maybeSettleRoot`, `removeAttribute("data-morphing")` (and `data-punching`)
// must appear BEFORE `removeProperty("--dock-morph-t")` in SOURCE ORDER, so the
// morph-window-gated rules stop matching before the registered scalar reverts.
function detectSettleOrder(morphContextSrc) {
    const src = stripComments(morphContextSrc);
    // Scope to the maybeSettleRoot body (the settle clear site).
    const fnM = src.match(
        /function\s+maybeSettleRoot\s*\([^)]*\)\s*\{([\s\S]*?)\n\s{4}\}/,
    );
    const body = fnM ? fnM[1] : src;
    const idxMorph = body.search(
        /removeAttribute\(\s*["']data-morphing["']\s*\)/,
    );
    const idxScalar = body.search(
        /removeProperty\(\s*["']--dock-morph-t["']\s*\)/,
    );
    const present = idxMorph >= 0 && idxScalar >= 0;
    return {
        ok: present && idxMorph < idxScalar,
        facts: { attrIdx: idxMorph, scalarIdx: idxScalar, present },
    };
}

// ── PANE-OVERLAP P1/P2 — the OVERLAPPED pane-swap crossfade (BG.W-DOCK-PANE-OVERLAP). ──
// The DockLayerGroup.vue SFC `<style>` must express BOTH ramps on the ONE `--dock-morph-t`
// scalar, scoped to `.dock-layer-item-host` (the inner group pane) + gated on an ancestor
// `[data-morphing]` — so both panes are CO-PRESENT mid-swap (no blank-plate dead-zone):
//   P1 entering (`.is-active`): a RAMP-UP that engages PAST t=0 — the canonical form
//      `clamp(0, calc((var(--dock-morph-t) - <onset>) / <window>), 1)` with a NON-ZERO
//      onset (so it engages by ~t≈0.15, not a static `opacity:1` HEAD painted).
//   P2 leaving (`.is-leaving`): a persist-then-fade `1 - clamp(0, calc(var(--dock-morph-t)
//      / <window>), 1)` with window ≥ 0.5 — so the leaving pane is still >0.3 alpha when
//      the entering pane crosses ~0.3 (the OVERLAP: leaving persists PAST where entering
//      engages). A bare `calc(1 - var(--dock-morph-t))` (HEAD) reaches 0 at t=1 with no
//      persist window and no overlap — flagged.
function detectPaneOverlap(vueSrc) {
    // Read only the `<style>` block(s) (the crossfade is CSS). Strip comments so a
    // rationale mention never false-greens.
    const styleBlocks = [...vueSrc.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
        .map((m) => stripComments(m[1]))
        .join("\n");
    const facts = {};

    // Split into rule blocks (selector { body }).
    const blocks = [];
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(styleBlocks)) !== null) {
        blocks.push({ selector: m[1], body: m[2] });
    }
    // A pane-crossfade rule targets `.dock-layer-item-host.<state>`, is gated on an
    // ancestor `[data-morphing]`, and sets `opacity`.
    const isPaneRule = (sel, state) =>
        /\[data-morphing\]/.test(sel) &&
        new RegExp(`\\.dock-layer-item-host\\.${state}\\b`).test(sel);

    // P1 — the entering ramp: an `opacity` `clamp(0, calc((var(--dock-morph-t) - <onset>)
    // …), 1)` with a strictly-positive onset (engages past t=0). The onset guards against
    // a static `opacity:1` or a zero-onset ramp.
    let enterRamp = false;
    let enterOnset = null;
    for (const b of blocks) {
        if (!isPaneRule(b.selector, "is-active")) continue;
        const om = b.body.match(
            /opacity\s*:\s*clamp\(\s*0\s*,\s*calc\(\s*\(\s*var\(\s*--dock-morph-t\s*\)\s*-\s*([\d.]+)\s*\)\s*\/\s*[\d.]+\s*\)\s*,\s*1\s*\)/,
        );
        if (om) {
            const onset = parseFloat(om[1]);
            if (onset > 0) {
                enterRamp = true;
                enterOnset = onset;
            }
        }
    }
    facts.enterRamp = enterRamp;
    facts.enterOnset = enterOnset;

    // P2 — the leaving persist: `opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) /
    // <window>), 1))` with window ≥ 0.5 (persists past where the entering pane engages —
    // the OVERLAP). A bare `calc(1 - var(--dock-morph-t))` or a window < 0.5 does not
    // overlap.
    let leaveOverlap = false;
    let leaveWindow = null;
    for (const b of blocks) {
        if (!isPaneRule(b.selector, "is-leaving")) continue;
        const lm = b.body.match(
            /opacity\s*:\s*calc\(\s*1\s*-\s*clamp\(\s*0\s*,\s*calc\(\s*var\(\s*--dock-morph-t\s*\)\s*\/\s*([\d.]+)\s*\)\s*,\s*1\s*\)\s*\)/,
        );
        if (lm) {
            const win = parseFloat(lm[1]);
            leaveWindow = win;
            if (win >= 0.5) leaveOverlap = true;
        }
    }
    facts.leaveOverlap = leaveOverlap;
    facts.leaveWindow = leaveWindow;

    // The OVERLAP invariant: the leaving pane must still be > 0.3 alpha at the t where
    // the entering pane crosses 0.3 (no dead-zone). Compute the crossings from the parsed
    // onset/window and assert co-presence.
    let coPresent = false;
    if (enterRamp && leaveOverlap && enterOnset != null && leaveWindow != null) {
        // entering(t) = clamp(0,(t-onset)/win_e,1); we only need t where entering==0.3.
        // Its window is not captured above (only the onset), so re-parse the enter win.
        let enterWin = null;
        for (const b of blocks) {
            if (!isPaneRule(b.selector, "is-active")) continue;
            const om = b.body.match(
                /opacity\s*:\s*clamp\(\s*0\s*,\s*calc\(\s*\(\s*var\(\s*--dock-morph-t\s*\)\s*-\s*[\d.]+\s*\)\s*\/\s*([\d.]+)\s*\)\s*,\s*1\s*\)/,
            );
            if (om) enterWin = parseFloat(om[1]);
        }
        if (enterWin != null) {
            const tEnter03 = enterOnset + 0.3 * enterWin; // entering hits 0.3 here
            const leaveAt = 1 - Math.min(1, tEnter03 / leaveWindow); // leaving alpha then
            facts.enterWin = enterWin;
            facts.tEnter03 = Number(tEnter03.toFixed(4));
            facts.leaveAlphaAtEnter03 = Number(leaveAt.toFixed(4));
            coPresent = leaveAt > 0.3;
        }
    }
    facts.coPresent = coPresent;

    return { p1: enterRamp, p2: leaveOverlap && coPresent, facts };
}

// ── PANE-OVERLAP P3 — the standalone-stack box FLIP is monotonic (BG.W-DOCK-PANE-OVERLAP
// §2.2 vocab b). ──
// The SFC `<style>` must reveal the reserved box via a `clip-path: inset()` aperture off
// `--dock-stack-reveal` (content-RIGID, no per-frame layout write), and
// useLayerTransition.ts must (a) reserve `Math.max(fromSize, toSize)` on
// `--dock-stack-morph-reserve` (one layout solve — the box can never dip below the
// smaller endpoint) and (b) drive `--dock-stack-reveal = box(t)/max` with a CLAMPED `t`
// (the convex `clamp(0,t,1)` cap absorbs the spring overshoot).
function detectBoxFlipMonotonic(vueSrc, tsSrc) {
    const style = [...vueSrc.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
        .map((m) => stripComments(m[1]))
        .join("\n");
    const ts = stripComments(tsSrc);
    const facts = {};

    // (CSS) the stack reveals via `clip-path: inset(...)` reading `--dock-stack-reveal`,
    // gated on `[style*="--dock-stack-morph-reserve"]` (the standalone-only presence
    // gate), and reserves the axis off `--dock-stack-morph-reserve` — NO `scale`/
    // `transform` on the stack (content-rigid; a scale would distort glyphs).
    const clipReveal =
        /clip-path\s*:\s*inset\([^;]*var\(\s*--dock-stack-reveal/.test(style) &&
        /\[style\*=["']--dock-stack-morph-reserve["']\]/.test(style) &&
        /(?:inline-size|block-size)\s*:\s*var\(\s*--dock-stack-morph-reserve\s*\)/.test(
            style,
        );
    // Anti-distortion: the reserved-stack rule must NOT scale the box (a `scale`/
    // `transform: scale` on the reserved stack squishes the pane content).
    const noStackScale =
        !/\[style\*=["']--dock-stack-morph-reserve["']\][\s\S]{0,200}?(?:^|\s)(?:scale\s*:|transform\s*:\s*scale)/m.test(
            style,
        );
    facts.clipReveal = clipReveal;
    facts.noStackScale = noStackScale;

    // (TS) the engine reserves the MAX endpoint + drives a clamped reveal fraction.
    const reservesMax =
        /Math\.max\(\s*fromSize\s*,\s*toSize\s*\)/.test(ts) &&
        /setProperty\(\s*["']--dock-stack-morph-reserve["']/.test(ts);
    // The reveal drive: a `setProperty("--dock-stack-reveal", …)` whose value is a
    // box(t)/max fraction computed off a CLAMPED t (the `t < 0 ? 0 : t > 1 ? 1 : t`
    // convex cap — the overshoot-absorbing bound).
    const clampedReveal =
        /setProperty\(\s*["']--dock-stack-reveal["']/.test(ts) &&
        /t\s*<\s*0\s*\?\s*0\s*:\s*t\s*>\s*1\s*\?\s*1\s*:\s*t/.test(ts) &&
        /fromSize\s*\+\s*\(\s*toSize\s*-\s*fromSize\s*\)\s*\*\s*clamped/.test(ts);
    // The vars are cleared on settle (the box hands back to the natural shrink-wrap).
    const clearsOnSettle =
        /removeProperty\(\s*["']--dock-stack-morph-reserve["']\s*\)/.test(ts) &&
        /removeProperty\(\s*["']--dock-stack-reveal["']\s*\)/.test(ts);
    facts.reservesMax = reservesMax;
    facts.clampedReveal = clampedReveal;
    facts.clearsOnSettle = clearsOnSettle;

    return {
        ok:
            clipReveal &&
            noStackScale &&
            reservesMax &&
            clampedReveal &&
            clearsOnSettle,
        facts,
    };
}

// overrides: { silhouetteExists?, testExists?, gateScriptExists?, manifestSrc?,
//              packageSrc?, dockCorpus?, constantsSrc?, dockContextExists?,
//              shapeSrc?, morphContextSrc?, layerGroupVueSrc?, layerTransitionTsSrc? }.
function detect(overrides = {}) {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const silhouetteExists =
        overrides.silhouetteExists ?? existsSync(SILHOUETTE_TS);
    const testExists = overrides.testExists ?? existsSync(SILHOUETTE_TEST);
    const gateScriptExists =
        overrides.gateScriptExists ?? existsSync(DEAD_GATE_SCRIPT);
    const manifestSrc = overrides.manifestSrc ?? read(GATES_MJS);
    const packageSrc = overrides.packageSrc ?? read(PACKAGE_JSON);
    const dockCorpus = overrides.dockCorpus ?? collectDockCorpus();
    const constantsSrc = overrides.constantsSrc ?? read(DOCK_CONSTANTS);
    const dockContextExists =
        overrides.dockContextExists ?? existsSync(DOCK_CONTEXT_TS);
    const shapeSrc = overrides.shapeSrc ?? read(DOCK_SHAPE_CSS);
    const morphContextSrc =
        overrides.morphContextSrc ?? read(DOCK_MORPH_CONTEXT_TS);
    const layerGroupVueSrc =
        overrides.layerGroupVueSrc ?? read(DOCK_LAYER_GROUP_VUE);
    const layerTransitionTsSrc =
        overrides.layerTransitionTsSrc ?? read(USE_LAYER_TRANSITION_TS);

    // ── D1 — SILHOUETTE-COMPOSABLE-ABSENT ──
    facts.silhouetteExists = silhouetteExists;
    assert(
        "D1 — useDockContextSilhouette.ts (the 551L dead context→silhouette engine) is DEFINITION-ABSENT",
        !silhouetteExists,
    );

    // ── D2 — SILHOUETTE-TEST-ABSENT ──
    facts.testExists = testExists;
    assert(
        "D2 — tests/components/custom/dock/useDockContextSilhouette.test.ts is DEFINITION-ABSENT",
        !testExists,
    );

    // ── D3 — DEAD-GATE-FULLY-RETIRED (CHRONIC-5: a retired gate re-emits into ci.yml) ──
    const manifestRowPresent = MANIFEST_ROW_RE.test(manifestSrc);
    const packageScriptPresent = PACKAGE_SCRIPT_RE.test(packageSrc);
    facts.gateScriptExists = gateScriptExists;
    facts.deadGateManifestRowPresent = manifestRowPresent;
    facts.deadGatePackageScriptPresent = packageScriptPresent;
    assert(
        "D3 — proof:dock-context is FULLY retired (script file gone, no gates.mjs row, no package.json script — so renderCiYaml never re-emits a dead CI step)",
        !gateScriptExists && !manifestRowPresent && !packageScriptPresent,
    );

    // ── D4 — DOCK-SURFACES-CLEAR (no live import of the deleted module) ──
    const liveRefs = [];
    for (const f of dockCorpus) {
        for (const t of DEAD_TOKENS) {
            if (f.stripped.includes(t)) {
                liveRefs.push(`${f.rel}:${t}`);
                break;
            }
        }
    }
    facts.dockCorpusFiles = dockCorpus.length;
    facts.liveDeadRefs = liveRefs;
    assert(
        "D4 — the dock source tree + dock demo stories carry ZERO comment-stripped live reference to the dead engine (useDockContextSilhouette / DockSilhouetteDescriptor)",
        liveRefs.length === 0,
    );

    // ── D5 — LIVE-DOCK-CONTEXT-DI-KEPT (the anti-over-cut fence) ──
    const labelKept = constantsSrc.includes(LIVE_DI_LABEL);
    facts.liveDiLabelKept = labelKept;
    facts.dockContextExists = dockContextExists;
    assert(
        "D5 — the LIVE dock-context DI (DOCK_CONTEXT_LABEL in constants.ts + dockContext.ts) SURVIVES the cut (the name-overlap anti-over-cut fence)",
        labelKept && dockContextExists,
    );

    // ── G1 — INVERSE-SCALE-CONTENT-LAYER (BG.W-DOCK-GLYPH-RIGID) ──
    const rigid = detectGlyphRigid(shapeSrc);
    facts.glyphRigidInverse = rigid.facts;
    assert(
        "G1 — shape.css declares the inverse-scale content-layer (`scale: 1/max(--dock-size-scale,0.06)`) on `.dock-persistent` AND `.dock-layers`, on BOTH axes (horizontal inverts X, vertical inverts Y), gated on the `[data-morphing]`/`[data-punching]` morph window (rigid content over the morphing plate)",
        rigid.ok,
    );

    // ── G2 — SETTLE-DROPS-RESIDUAL (BG.W-DOCK-GLYPH-RIGID vocab (b)) ──
    const settle = detectSettleOrder(morphContextSrc);
    facts.glyphRigidSettle = settle.facts;
    assert(
        "G2 — dockMorphContext.maybeSettleRoot removes the data-morphing/data-punching attrs BEFORE the --dock-morph-t scalar, so the box-scale + inverse rules stop matching before the registered property reverts (no one-frame collapsed-look flash at settle)",
        settle.ok,
    );

    // ── P1/P2 — PANE-OVERLAP: the OVERLAPPED pane-swap crossfade (BG.W-DOCK-PANE-OVERLAP) ──
    const overlap = detectPaneOverlap(layerGroupVueSrc);
    facts.paneOverlap = overlap.facts;
    assert(
        "P1 — DockLayerGroup.vue's SFC <style> ramps the ENTERING pane (.dock-layer-item-host.is-active) opacity UP off `--dock-morph-t` with a strictly-positive onset (engages by ~t≈0.15, NOT the static opacity:1 HEAD painted), gated on an ancestor [data-morphing]",
        overlap.p1,
    );
    assert(
        "P2 — the LEAVING pane (.dock-layer-item-host.is-leaving) opacity PERSISTS to t≈0.6 (a `1 - clamp(0, --dock-morph-t / window≥0.5, 1)` form, NOT the bare `calc(1 - --dock-morph-t)` HEAD gone-at-t=1) so it OVERLAPS the entering ramp — both panes co-present >0.3 alpha mid-swap, no blank-plate dead-zone",
        overlap.p2,
    );

    // ── P3 — PANE-OVERLAP: the standalone-stack box FLIP is monotonic (vocab b) ──
    const boxFlip = detectBoxFlipMonotonic(layerGroupVueSrc, layerTransitionTsSrc);
    facts.boxFlipMonotonic = boxFlip.facts;
    assert(
        "P3 — the standalone box FLIP interpolates MONOTONICALLY between the two pre-measured endpoints: useLayerTransition reserves Math.max(from,to) on `--dock-stack-morph-reserve` + drives a clamped `--dock-stack-reveal=box(t)/max`, and the SFC <style> reveals the reserved box via a content-RIGID `clip-path: inset()` aperture (no stack `scale`, no per-frame layout write; cleared on settle) — the box never dips below the smaller endpoint",
        boxFlip.ok,
    );

    return { facts, violations };
}

// ── The self-test bites (anti-vacuity / born-RED demonstration). ──
function selfTest() {
    let flagged = 0;
    const sab = (overrides, labelFrag, name) => {
        const { violations } = detect(overrides);
        if (violations.some((v) => v.startsWith(labelFrag))) flagged++;
        else
            throw new Error(
                `[proof:dock self-test] the bite FAILED to flag: ${name}`,
            );
    };
    const sabNot = (overrides, labelFrag, name) => {
        const { violations } = detect(overrides);
        if (!violations.some((v) => v.startsWith(labelFrag))) flagged++;
        else
            throw new Error(
                `[proof:dock self-test] the fence bite WRONGLY flagged: ${name}`,
            );
    };

    // A clean synthetic baseline — every subject in its post-cut state, so a
    // single planted fragment is the sole cause of the RED (no live-tree confound).
    const CLEAN_MANIFEST = `{ id: "proof:dock-contextual-layers", cmd: "proof:dock-contextual-layers", tags: ["ci"] },`;
    const CLEAN_PACKAGE = `"proof:dock-contextual-layers": "node scripts/proof-dock-contextual-layers.mjs",`;
    const CLEAN_CONSTANTS = `export const ${LIVE_DI_LABEL} = "glass-ui:dock-context";`;
    const CLEAN_CORPUS = [
        {
            rel: "demo/stories/dock/examples/AppSwitcher.vue",
            // A rationale COMMENT naming the dead engine — history, comment-stripped.
            stripped: stripComments(
                `// audit §W10: "AppSwitcher->useDockContextSilhouette as fits"; the silhouette engine is overkill\nimport { useBloomUp } from "../../../../src/composables/motion";`,
            ),
        },
        {
            rel: "src/components/custom/dock/composables/index.ts",
            stripped: `export { useDockState } from "./useDockState";`,
        },
    ];
    // A clean synthetic shape.css carrying the inverse-scale content-layer on both
    // children, both axes, gated on the morph window — the G1-GREEN reference.
    const CLEAN_SHAPE = `
@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-persistent,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / max(var(--dock-size-scale, 1), 0.06)) 1;
        will-change: transform;
    }
    .glass-dock[data-morphing].vertical > .dock-persistent,
    .glass-dock[data-morphing].vertical > .dock-layers,
    .glass-dock[data-punching].vertical > .dock-persistent,
    .glass-dock[data-punching].vertical > .dock-layers {
        scale: 1 calc(1 / max(var(--dock-size-scale, 1), 0.06));
        will-change: transform;
    }
}`;
    // A clean synthetic maybeSettleRoot that drops the attrs BEFORE the scalar — the
    // G2-GREEN reference.
    const CLEAN_MORPH_CONTEXT = `
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
            r.style.removeProperty("--dock-morph-t");
        }
        dockSpring.dispose();
    }`;
    // A clean synthetic DockLayerGroup.vue `<style>` — the overlapped crossfade (P1/P2) +
    // the standalone-stack content-rigid clip-reveal box (P3 CSS half). The P1/P2-GREEN
    // reference.
    const CLEAN_LAYER_GROUP_VUE = `
<template><div class="dock-layer-group"></div></template>
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-active {
    opacity: clamp(0, calc((var(--dock-morph-t) - 0.15) / 0.5), 1);
}
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) / 0.6), 1));
}
.dock-layer-group.horizontal .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    clip-path: inset(0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0 0);
    will-change: clip-path;
}
.dock-layer-group.vertical .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    block-size: var(--dock-stack-morph-reserve);
    clip-path: inset(0 0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0);
    will-change: clip-path;
}
</style>`;
    // A clean synthetic useLayerTransition.ts armSpring/settle — reserves the MAX + drives
    // a clamped reveal + clears on settle. The P3-TS-GREEN reference.
    const CLEAN_LAYER_TRANSITION = `
    function clearMorphVars(el) {
        el.style.removeProperty("--dock-morph-from");
        el.style.removeProperty("--dock-stack-morph-reserve");
        el.style.removeProperty("--dock-stack-reveal");
    }
    function armSpring(el, root, id, fromSize, toSize) {
        const maxSize = Math.max(fromSize, toSize);
        el.style.setProperty("--dock-stack-morph-reserve", maxSize + "px");
        activeSpring.play((t) => {
            const clamped = t < 0 ? 0 : t > 1 ? 1 : t;
            const boxSize = fromSize + (toSize - fromSize) * clamped;
            const reveal = maxSize > 0 ? boxSize / maxSize : 1;
            el.style.setProperty("--dock-stack-reveal", reveal + "");
        });
    }`;
    const base = {
        silhouetteExists: false,
        testExists: false,
        gateScriptExists: false,
        manifestSrc: CLEAN_MANIFEST,
        packageSrc: CLEAN_PACKAGE,
        dockCorpus: CLEAN_CORPUS,
        constantsSrc: CLEAN_CONSTANTS,
        dockContextExists: true,
        shapeSrc: CLEAN_SHAPE,
        morphContextSrc: CLEAN_MORPH_CONTEXT,
        layerGroupVueSrc: CLEAN_LAYER_GROUP_VUE,
        layerTransitionTsSrc: CLEAN_LAYER_TRANSITION,
    };

    // Sanity: the clean synthetic baseline is fully GREEN (no confound).
    if (detect(base).violations.length !== 0)
        throw new Error(
            `[proof:dock self-test] the clean synthetic baseline is not GREEN: ${JSON.stringify(detect(base).violations)}`,
        );

    // D1: a re-added silhouette composable.
    sab(
        { ...base, silhouetteExists: true },
        "D1",
        "D1 silhouette composable re-added",
    );
    // D2: a re-added test.
    sab({ ...base, testExists: true }, "D2", "D2 silhouette test re-added");
    // D3: a surviving gate script.
    sab(
        { ...base, gateScriptExists: true },
        "D3",
        "D3 proof-dock-context.mjs survives on disk",
    );
    // D3: a re-registered manifest row.
    sab(
        {
            ...base,
            manifestSrc:
                CLEAN_MANIFEST +
                `\n{ id: "proof:dock-context", cmd: "proof:dock-context", tags: ["ci"] },`,
        },
        "D3",
        "D3 proof:dock-context re-added to the gates.mjs manifest",
    );
    // D3: a re-registered package script.
    sab(
        {
            ...base,
            packageSrc:
                CLEAN_PACKAGE +
                `\n"proof:dock-context": "node scripts/proof-dock-context.mjs",`,
        },
        "D3",
        "D3 proof:dock-context re-added to package.json scripts",
    );
    // D3 (fence): the `-contextual-layers` sibling alone does NOT flag (boundary regex).
    sabNot(
        { ...base, manifestSrc: CLEAN_MANIFEST, packageSrc: CLEAN_PACKAGE },
        "D3",
        "D3 the proof:dock-contextual-layers sibling substring fence",
    );
    // D3 (fence): a PROSE note NAMING the retired gate is NOT a registration.
    sabNot(
        {
            ...base,
            manifestSrc:
                CLEAN_MANIFEST +
                `\n{ id: "proof:dock", cmd: "proof:dock", note: "supersedes the retired proof:dock-context census" },`,
            packageSrc:
                CLEAN_PACKAGE + `\n"proof:dock": "node scripts/proof-dock.mjs",`,
        },
        "D3",
        "D3 the prose-note fence (a note naming proof:dock-context is not a registration row)",
    );
    // D4: a live import of the deleted module in the dock tree.
    sab(
        {
            ...base,
            dockCorpus: [
                ...CLEAN_CORPUS,
                {
                    rel: "src/components/custom/dock/composables/index.ts",
                    stripped: `import { useDockContextSilhouette } from "./useDockContextSilhouette";`,
                },
            ],
        },
        "D4",
        "D4 a live useDockContextSilhouette import survives in the dock tree",
    );
    // D4: a live DockSilhouetteDescriptor type reference.
    sab(
        {
            ...base,
            dockCorpus: [
                {
                    rel: "src/components/custom/dock/constants.ts",
                    stripped: `import type { DockSilhouetteDescriptor } from "./composables/useDockContextSilhouette";`,
                },
            ],
        },
        "D4",
        "D4 a live DockSilhouetteDescriptor type import survives",
    );
    // D4 (fence): a bare COMMENT mention does NOT flag (the comment-strip fence).
    sabNot(
        {
            ...base,
            dockCorpus: [
                {
                    rel: "demo/stories/dock/examples/AppSwitcher.vue",
                    stripped: stripComments(
                        `// the useDockContextSilhouette engine is overkill; use useBloomUp\n<!-- DockSilhouetteDescriptor was the dead type -->\nimport { useBloomUp } from "x";`,
                    ),
                },
            ],
        },
        "D4",
        "D4 the comment-mention fence (a provenance note is not a live wire)",
    );
    // D5: the live DI label deleted (the over-cut).
    sab(
        { ...base, constantsSrc: `export const OTHER = 1;` },
        "D5",
        "D5 DOCK_CONTEXT_LABEL co-deleted (the anti-over-cut fence)",
    );
    // D5: dockContext.ts co-deleted (the over-cut).
    sab(
        { ...base, dockContextExists: false },
        "D5",
        "D5 dockContext.ts co-deleted (the anti-over-cut fence)",
    );

    // ── G1 — the inverse-scale content-layer bites (BG.W-DOCK-GLYPH-RIGID) ──
    // G1: the HEAD-shape — no inverse rule at all (the born-RED premise).
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) {
        scale: calc(var(--dock-size-scale, 1)) calc(1 / var(--stretch, 1));
    }
}`,
        },
        "G1",
        "G1 HEAD shape (box scales the whole subtree, no content-layer inverse) reds",
    );
    // G1: the inverse present on .dock-layers but MISSING on .dock-persistent.
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / max(var(--dock-size-scale, 1), 0.06)) 1;
    }
    .glass-dock[data-morphing].vertical > .dock-layers,
    .glass-dock[data-punching].vertical > .dock-layers {
        scale: 1 calc(1 / max(var(--dock-size-scale, 1), 0.06));
    }
}`,
        },
        "G1",
        "G1 inverse missing on .dock-persistent (only .dock-layers covered) reds",
    );
    // G1: the inverse present horizontal but MISSING the vertical axis.
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-persistent,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / max(var(--dock-size-scale, 1), 0.06)) 1;
    }
}`,
        },
        "G1",
        "G1 inverse missing the vertical axis (horizontal-only) reds",
    );
    // G1: the inverse NOT gated on the morph window (a resting-state scale — wrong).
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock:not(.vertical) > .dock-persistent,
    .glass-dock:not(.vertical) > .dock-layers {
        scale: calc(1 / max(var(--dock-size-scale, 1), 0.06)) 1;
    }
    .glass-dock.vertical > .dock-persistent,
    .glass-dock.vertical > .dock-layers {
        scale: 1 calc(1 / max(var(--dock-size-scale, 1), 0.06));
    }
}`,
        },
        "G1",
        "G1 inverse not gated on [data-morphing]/[data-punching] (a resting scale) reds",
    );
    // G1: the inverse targets the WRONG factor (--stretch, not --dock-size-scale).
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers {
        scale: calc(1 / max(var(--stretch, 1), 0.06)) 1;
    }
    .glass-dock[data-morphing].vertical > .dock-persistent,
    .glass-dock[data-morphing].vertical > .dock-layers {
        scale: 1 calc(1 / max(var(--stretch, 1), 0.06));
    }
}`,
        },
        "G1",
        "G1 inverse targets the wrong factor (--stretch, not --dock-size-scale) reds",
    );

    // ── G2 — the settle-order bites (BG.W-DOCK-GLYPH-RIGID vocab (b)) ──
    // G2: the HEAD settle order — scalar removed BEFORE the attrs (born-RED premise).
    sab(
        {
            ...base,
            morphContextSrc: `
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            r.style.removeProperty("--dock-morph-t");
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
        }
        dockSpring.dispose();
    }`,
        },
        "G2",
        "G2 HEAD settle order (scalar removed before the attrs) reds",
    );

    // ── P1 — the entering-ramp bites (BG.W-DOCK-PANE-OVERLAP §2.2 vocab a) ──
    // P1: the HEAD shape — the entering pane is STATICALLY opacity:1 (no ramp) → the
    // sequential blank-plate dead-zone (born-RED premise).
    sab(
        {
            ...base,
            layerGroupVueSrc: `
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-active {
    opacity: 1;
    transition: visibility 0s;
}
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) / 0.6), 1));
}
.dock-layer-group.horizontal .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    clip-path: inset(0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0 0);
}
</style>`,
        },
        "P1",
        "P1 HEAD entering pane statically opacity:1 (no ramp-up) reds",
    );
    // P1 (evasion): a ZERO-onset ramp (engages at t=0, not the ~t≈0.15 overlap start).
    sab(
        {
            ...base,
            layerGroupVueSrc: `
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-active {
    opacity: clamp(0, calc((var(--dock-morph-t) - 0) / 0.5), 1);
}
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) / 0.6), 1));
}
.dock-layer-group.horizontal .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    clip-path: inset(0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0 0);
}
</style>`,
        },
        "P1",
        "P1 zero-onset entering ramp (engages at t=0, no overlap start) reds",
    );

    // ── P2 — the leaving-overlap bites (BG.W-DOCK-PANE-OVERLAP §2.2 vocab a) ──
    // P2: the HEAD shape — the leaving pane is the bare `calc(1 - --dock-morph-t)` (gone
    // at t=1, no persist window → no overlap, the blank-plate dead-zone).
    sab(
        {
            ...base,
            layerGroupVueSrc: `
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-active {
    opacity: clamp(0, calc((var(--dock-morph-t) - 0.15) / 0.5), 1);
}
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - var(--dock-morph-t));
}
.dock-layer-group.horizontal .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    clip-path: inset(0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0 0);
}
</style>`,
        },
        "P2",
        "P2 HEAD leaving pane bare calc(1 - --dock-morph-t) (no persist window, no overlap) reds",
    );
    // P2 (evasion): a persist window < 0.5 (fades too fast — the leaving pane is <0.3
    // alpha before the entering pane reaches 0.3, the dead-zone survives).
    sab(
        {
            ...base,
            layerGroupVueSrc: `
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-active {
    opacity: clamp(0, calc((var(--dock-morph-t) - 0.15) / 0.5), 1);
}
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) / 0.2), 1));
}
.dock-layer-group.horizontal .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    clip-path: inset(0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0 0);
}
</style>`,
        },
        "P2",
        "P2 leaving persist window < 0.5 (fades too fast, no overlap co-presence) reds",
    );

    // ── P3 — the box-FLIP-monotonic bites (BG.W-DOCK-PANE-OVERLAP §2.2 vocab b) ──
    // P3: the HEAD shape — the TS engine writes no `--dock-stack-*` reserve/reveal (the
    // box JUMPS on the class flip → the plate dips below both endpoints).
    sab(
        {
            ...base,
            layerTransitionTsSrc: `
    function clearMorphVars(el) {
        el.style.removeProperty("--dock-morph-from");
    }
    function armSpring(el, root, id, fromSize, toSize) {
        activeSpring.play((t) => {
            root.style.setProperty("--dock-morph-t", t + "");
        });
    }`,
        },
        "P3",
        "P3 HEAD engine writes no --dock-stack-* reserve/reveal (box jumps, dips below endpoints) reds",
    );
    // P3 (evasion): the SFC SCALES the reserved stack instead of clipping it (distorts
    // the pane content — the W-DOCK-GLYPH-RIGID violation).
    sab(
        {
            ...base,
            layerGroupVueSrc: `
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-active {
    opacity: clamp(0, calc((var(--dock-morph-t) - 0.15) / 0.5), 1);
}
:where(.glass-dock, .dock-layer-group)[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) / 0.6), 1));
}
.dock-layer-group.horizontal .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    transform: scaleX(var(--dock-stack-reveal, 1));
}
</style>`,
        },
        "P3",
        "P3 SFC scales the reserved stack (content-distorting, not the rigid clip aperture) reds",
    );
    // P3 (evasion): the engine drives the reveal off an UN-clamped t (the >1 spring
    // overshoot inflates the box past the reserved max — non-monotonic).
    sab(
        {
            ...base,
            layerTransitionTsSrc: `
    function clearMorphVars(el) {
        el.style.removeProperty("--dock-stack-morph-reserve");
        el.style.removeProperty("--dock-stack-reveal");
    }
    function armSpring(el, root, id, fromSize, toSize) {
        const maxSize = Math.max(fromSize, toSize);
        el.style.setProperty("--dock-stack-morph-reserve", maxSize + "px");
        activeSpring.play((t) => {
            const boxSize = fromSize + (toSize - fromSize) * t;
            el.style.setProperty("--dock-stack-reveal", (boxSize / maxSize) + "");
        });
    }`,
        },
        "P3",
        "P3 engine drives reveal off an un-clamped t (overshoot inflates past max, non-monotonic) reds",
    );

    return flagged;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_ARTIFACT", "BG-dock");

    const selfTestCount = selfTest();
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock",
        command: COMMAND,
        selfTestChecks: selfTestCount,
        facts,
        violations,
    });

    console.log(
        "proof:dock — the dead useDockContextSilhouette engine cut + the dock-side clearance VERIFY (BG.W-DOCK-CUT; delete owned by BG.W-DEAD-COMPOSABLE-CUT)",
    );
    console.log(`  D1 silhouette composable absent : ${!facts.silhouetteExists}`);
    console.log(`  D2 silhouette test absent       : ${!facts.testExists}`);
    console.log(
        `  D3 dead gate fully retired      : ${violations.every((v) => !v.startsWith("D3"))} (script=${facts.gateScriptExists}, manifest=${facts.deadGateManifestRowPresent}, package=${facts.deadGatePackageScriptPresent})`,
    );
    console.log(
        `  D4 dock surfaces clear          : ${violations.every((v) => !v.startsWith("D4"))} (files=${facts.dockCorpusFiles}, liveRefs=${JSON.stringify(facts.liveDeadRefs)})`,
    );
    console.log(
        `  D5 live dock-context DI kept    : ${violations.every((v) => !v.startsWith("D5"))} (label=${facts.liveDiLabelKept}, dockContext.ts=${facts.dockContextExists})`,
    );
    console.log(
        `  G1 glyph-rigid inverse layer    : ${violations.every((v) => !v.startsWith("G1"))} (${JSON.stringify(facts.glyphRigidInverse)})`,
    );
    console.log(
        `  G2 settle drops residual first  : ${violations.every((v) => !v.startsWith("G2"))} (attrIdx=${facts.glyphRigidSettle?.attrIdx}, scalarIdx=${facts.glyphRigidSettle?.scalarIdx})`,
    );
    console.log(
        `  P1 entering pane ramps up       : ${violations.every((v) => !v.startsWith("P1"))} (onset=${facts.paneOverlap?.enterOnset})`,
    );
    console.log(
        `  P2 leaving pane overlaps        : ${violations.every((v) => !v.startsWith("P2"))} (window=${facts.paneOverlap?.leaveWindow}, leaveAlphaAtEnter03=${facts.paneOverlap?.leaveAlphaAtEnter03})`,
    );
    console.log(
        `  P3 box FLIP monotonic (rigid)   : ${violations.every((v) => !v.startsWith("P3"))} (clip=${facts.boxFlipMonotonic?.clipReveal}, reserveMax=${facts.boxFlipMonotonic?.reservesMax}, clamped=${facts.boxFlipMonotonic?.clampedReveal})`,
    );
    console.log(
        `  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (D1 + D2 + D3×3 + D3-fence×2 + D4×2 + D4-fence + D5×2 + G1×5 + G2 + P1×2 + P2×2 + P3×3)`,
    );

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );

    if (SELF_TEST)
        console.log(
            `\n[proof:dock --self-test] ${selfTestCount} bite(s) handled; tree ${status === "pass" ? "GREEN" : "RED"}`,
        );

    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, selfTest };
