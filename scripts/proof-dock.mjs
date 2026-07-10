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
// ── The GLYPH-RIGID morph arm (BG.W-DOCK-GLYPH-RIGID; F3.R1 + the paint-repair) ──
// The dock morph paints RIGID content over a MORPHING plate. The box-size morph
// (shape.css `.glass-dock[data-morphing]…{scale}`) scales the WHOLE `.glass-dock`
// subtree by the FULL morph-axis factor `--dock-size-scale × --stretch ×
// --dock-punch-stretch` (X on horizontal), reciprocal `1 / (--stretch ×
// --dock-punch-stretch)` (Y), which stretches every glyph mid-morph. The FIX is an
// inner CONTENT layer carrying the per-frame INVERSE of the FULL factor (`scale:
// calc(1 / (max(var(--dock-size-scale),0.06) × var(--stretch) ×
// var(--dock-punch-stretch))) calc(var(--stretch) × var(--dock-punch-stretch))` on
// `.dock-persistent`/`.dock-layers`, compositor-only), so the plate scales/squishes
// and the glyph reads EXACTLY 1:1 in every frame. THE F3.R1 PAINT-REPAIR: the prior
// build inverted ONLY `--dock-size-scale`, cancelling the footprint but leaving the
// punch/stretch UNcompensated in BOTH axes → glyph aspect `(--stretch ×
// --dock-punch-stretch)²` = 1.22² = +48.8% at the punch peak (the paint-judge FAIL).
// The full inverse removes it (aspect ≡ 1.0). At settle the residual scale lives ONLY
// under `[data-morphing]`/`[data-punching]` (the orchestrator clears the attrs BEFORE
// the scalar so the true collapsed/expanded box seats `scale: none`); AND the settle
// fires at the scalar's VISIBLE ARRIVAL (`tValue >= 1`), not the spring's ~1s
// analytic ring-down, so a collapsed dock never paints the reserved-expanded ×
// collapsed-scale sliver for ~1s on a slow-settling engine (the WebKit paint FAIL).
// This arm asserts the SOURCE mechanism (the binding per-frame glyph-bbox ±5%
// screencast π rides the paint judge — device-free here):
//   G1 — FULL-INVERSE-SCALE-CONTENT-LAYER: shape.css declares the FULL inverse-scale
//        rule on BOTH content children (`.dock-persistent` AND `.dock-layers`), on
//        BOTH orientation axes, gated on the morph window
//        (`[data-morphing]`/`[data-punching]`): the morph-axis component is `1 /
//        (max(var(--dock-size-scale),0.06) × var(--stretch) ×
//        var(--dock-punch-stretch))` (the FULL inverse — NOT just the footprint
//        factor; the size-only inverse leaves the +48.8% punch residual and REDs) and
//        the cross-axis component is `var(--stretch) × var(--dock-punch-stretch)` (the
//        squish-carry that cancels the plate's reciprocal cross-squish → aspect 1.0).
//   G2 — SETTLE-DROPS-RESIDUAL: dockMorphContext.ts `maybeSettleRoot` removes the
//        `data-morphing`/`data-punching` attrs BEFORE removing the `--dock-morph-t`
//        scalar, so the box-scale + inverse rules stop matching before the
//        registered property reverts to its `initial-value` — no one-frame
//        collapsed-look flash on the settled true box (spec vocab (b)).
//   G3 — ARRIVAL-SETTLE (F3.R1 secondary): dockMorphContext.ts `onFrame` drops the
//        morph state at the scalar's arrival (`tValue >= 1`) via the shared settle
//        path (which routes through `maybeSettleRoot`, preserving the G2 order), so
//        the true collapsed circle seats within one beat on EVERY engine — the box is
//        clamped-complete at arrival, and holding `[data-morphing]` through the
//        spring's engine-variable ring-down painted a ~1s sliver-at-rest on WebKit.
//   G4 — PUNCH-INHERITS-TO-CONTENT (F3.R1 paint-repair #2 — the INHERITANCE gap):
//        the `@property --dock-punch-stretch` registration in shape.css MUST declare
//        `inherits: true`. G1 checks the content-inverse rule TEXT, but the inverse
//        reads `var(--dock-punch-stretch)` on a CHILD (`.dock-persistent`/`.dock-layers`)
//        while the punch value is DECLARED on the dock ROOT — so a `inherits: false`
//        registration hands the child the `initial-value: 1` (not the root's live
//        overshoot 1.22), the full-inverse silently collapses to the size-only inverse,
//        and the glyph carries the whole `(--dock-punch-stretch)²` = 1.4884 (+48.8%)
//        residual. This is exactly the F3.R1 paint FAIL the G1 text-check could not see;
//        G4 binds the registration so a re-introduced `inherits: false` REDs on the
//        NUMBER (the property flag), not on a present-but-inert CSS string. The other
//        two content-inverse factors (`--stretch`, `--dock-size-scale`) are UNREGISTERED
//        so they inherit by default (no G4 arm owed).
//
// ── The SHELL-MORPH-PAINT arm (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3) ──
// The in-place V↔H shell-dock morph read BORKED in paint (IOS27-MOTION-TRUTH §2.3): ZERO
// painted travel frames — a ~1.3s no-visible-change window (incl. a ~295ms stall right
// after toggle) then a single-frame hard swap. Two root causes, both in the two owned
// files (useDockOrientationMorph.ts + morph-bridge.css), both device-free-detectable:
//   S1 — the MEASURE STORM: `writeScalar` (the per-frame morph write) read
//        `getComputedStyle` back off the DOM every frame (via `maxStretchOf()`'s cap-token
//        read + the `effectiveCap` motion-weight read-back) AFTER writing inline props —
//        a read-after-write forced style/layout flush that stalled the initial fast-rise,
//        so the teardrop frames never composited. The fix pre-warms the cap token once per
//        gesture (`capTokenCached = readCapToken()` in runTo/pin) and computes the
//        per-frame cap arithmetically (`effectiveCapFromVelocity(capTokenCached, v)`, a
//        pure `f(v)`), so the write path does ZERO getComputedStyle.
//   S2 — the RAZOR TRIANGLE: `bridgeGate(t)` (the `--dock-bridge-opacity` output) peaked
//        only at t≈0.5, so the teardrop was legibly opaque for ~1 frame. The fix holds a
//        FULL-opacity plateau across the occluded core (`return 1` for t∈[RUP,RDN], width
//        ≥ 0.2), so the teardrop reads legibly across the whole travel window.
//   S3 — the THIN CROSSFADE: the two bridge plates crossfaded AT 0.5, so the fused mass
//        thinned to a faint neck on the shoulders. The fix WIDENS the overlap (the vertical
//        plate holds full past the midpoint, the horizontal reaches full early) into ONE
//        dense continuous travelling mass, compositor-only (no *-size animates the scalar).
// This arm asserts the SOURCE mechanism; the binding ≥12-painted-travel-frames / no-stall
// screencast π rides the paint judge (device-free here, the non-authoring fence).
//
// Self-test bites (born-RED demonstration): a re-added silhouette composable REDs
// D1; a re-added test REDs D2; a surviving gate script / a re-added
// `proof:dock-context` manifest row / a re-added package script each RED D3 while
// a bare `proof:dock-contextual-layers` row does NOT (the boundary fence); a live
// `import { useDockContextSilhouette }` in the dock tree REDs D4 while a bare
// comment mention does NOT (the strip fence); a missing `DOCK_CONTEXT_LABEL` or a
// deleted `dockContext.ts` REDs D5 (the over-cut); a shape.css MISSING the inverse
// on a content child / on an axis / not gated on the morph window / inverting ONLY
// `--dock-size-scale` (the F3.R1 size-only residual) / missing the punch factor REDs
// G1; a settle that removes the scalar BEFORE the attrs REDs G2; an `onFrame` with no
// `tValue >= 1` arrival-settle guard REDs G3; a `@property --dock-punch-stretch`
// registered `inherits: false` (the child reads the initial 1, not the root's live
// punch) REDs G4 while an `inherits: true` registration does NOT.

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
// ── The NESTED box-hold arm source (BG.W-DOCK-PANE-OVERLAP P4; F3.R2 fix) ──
// The `/dock/layers` route hosts ONLY nested DockLayerGroups (standaloneGroupCount 0), so
// the box is owned by the orchestrator's convex-blend `--dock-live` (layers.css) off the
// directional `--dock-expand-t` derived in dock/morph.css. A pane swap seats `--dock-morph-t`
// at the collapsed 0 endpoint; without the box-HOLD the `.expanded[data-morphing]` arm drove
// `--dock-expand-t` to 0 and the plate collapsed to the pill (the F3.R2 paint FAIL). The fix
// gates the derivation `:not([data-pane-swap])` (morph.css) + arms `data-pane-swap` on the
// nested swap only (dockMorphContext).
const DOCK_MORPH_CSS = resolve(ROOT, "src/styles/dock/morph.css");
// ── The SHELL-MORPH-PAINT arm sources (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3) ──
// The in-place V↔H shell morph paints ZERO travel frames because (S1) the per-frame
// morph write reads `getComputedStyle` back off the DOM (a read-after-write layout
// thrash — the ~295ms "measure storm" that ate the initial fast-rise teardrop frames)
// and (S2) the bridge-opacity gate is a razor TRIANGLE (the teardrop is legibly opaque
// only at the exact t≈0.5 midpoint, so even the frames that DO paint show a sub-legible
// flash, never a travelling teardrop). The driver lives in useDockOrientationMorph.ts;
// the travelling-teardrop plate opacities live in morph-bridge.css.
const ORIENTATION_MORPH_TS = resolve(
    ROOT,
    "src/components/custom/dock/composables/useDockOrientationMorph.ts",
);
const MORPH_BRIDGE_CSS = resolve(ROOT, "src/styles/dock/morph-bridge.css");
// ── The SHELL-MORPH-PAINT ENDPOINT arm sources (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3
// paint-repair) ──
// The travel-frame repair (S1/S2/S3) LANDED, but the paint judge FAILED the wave on the
// SETTLED ENDPOINT: (S4) the shell committed the settled orientation (and so the `<main>`
// column re-margin) at the spring SETTLE (`morphing → false`, bridge opacity 0), so the
// discrete reclaim jumped NAKED with the teardrop fully gone — not hidden at the occluded
// midpoint; and (S5) the shell dock hardcoded `orientation="vertical"` on its `<GlassDock>`,
// so the "horizontal" settled dock stayed a vertical rail (`.glass-dock.vertical`'s column
// grid) that OCCLUDED the re-margined content column. The shell wiring lives in the demo
// layout (the binary consumer #2 of `useDockOrientationMorph`): AppShell.vue drives the
// settled-orientation commit; SidebarDock.vue owns the `<GlassDock>` orientation prop.
const DEMO_APP_SHELL = resolve(ROOT, "demo/shell/AppShell.vue");
const DEMO_SIDEBAR_DOCK = resolve(ROOT, "demo/shell/SidebarDock.vue");
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

// ── GLYPH-RIGID G1 — detect the FULL-inverse-scale content-layer rule. ──
// The box-scale (shape.css above) applies the FULL morph-axis factor to the whole
// `.glass-dock` subtree — `--dock-size-scale × --stretch × --dock-punch-stretch` on the
// morph axis, `1 / (--stretch × --dock-punch-stretch)` on the cross. A child multiplies
// its parent's `scale`, so the rigid content must invert the FULL factor: the morph-axis
// component `1 / (max(var(--dock-size-scale…),0.06) × var(--stretch) ×
// var(--dock-punch-stretch))` cancels the plate's morph-axis scale (→ 1) and the
// cross-axis component `var(--stretch) × var(--dock-punch-stretch)` cancels the plate's
// reciprocal cross-squish (→ 1) — effective glyph aspect ≡ 1.0. Inverting ONLY
// `--dock-size-scale` (the F3.R1 born-RED premise) cancels the footprint but leaves the
// `(--stretch × --dock-punch-stretch)²` = +48.8% glyph residual, so it FAILS this clause.
// For each content child on each axis, find a `[data-morphing]`/`[data-punching]`-gated
// direct-child rule whose two `scale:` components are (fullInverse, squishCarry) in the
// axis order: horizontal `:not(.vertical)` → [inverse (X), carry (Y)]; vertical
// `.vertical` → [carry (X), inverse (Y)].
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
    // Split a `scale:` value into its two top-level components, paren-aware (each
    // component is a `calc(…)` that holds nested parens; a naive whitespace split would
    // shatter them).
    const splitTopLevel = (value) => {
        const parts = [];
        let depth = 0;
        let cur = "";
        for (const ch of value) {
            if (ch === "(") {
                depth++;
                cur += ch;
            } else if (ch === ")") {
                depth--;
                cur += ch;
            } else if (/\s/.test(ch) && depth === 0) {
                if (cur.trim()) parts.push(cur.trim());
                cur = "";
            } else {
                cur += ch;
            }
        }
        if (cur.trim()) parts.push(cur.trim());
        return parts;
    };
    // The FULL-inverse component: a reciprocal `1 / ( … )` of the product of the
    // footprint floor `max(var(--dock-size-scale…),0.06)` AND both squish factors
    // `var(--stretch)` AND `var(--dock-punch-stretch)` (the size-only `1 / max(…)`
    // form — no `1 / (` wrap, no stretch/punch — the F3.R1 residual, FAILS here).
    const isFullInverse = (comp) =>
        /1\s*\/\s*\(/.test(comp) &&
        /max\(\s*var\(\s*--dock-size-scale[^)]*\)\s*,\s*0\.06\s*\)/.test(comp) &&
        /var\(\s*--stretch\b/.test(comp) &&
        /var\(\s*--dock-punch-stretch\b/.test(comp);
    // The cross-axis squish-carry: the product `var(--stretch) × var(--dock-punch-stretch)`
    // — carries BOTH squish factors, is NOT itself a reciprocal, and does NOT re-introduce
    // the footprint factor (a bare `1` identity — the size-only cross axis — FAILS: it
    // leaves the plate's `1 / (stretch × punch)` cross-squish uncompensated on the glyph).
    const isSquishCarry = (comp) =>
        /var\(\s*--stretch\b/.test(comp) &&
        /var\(\s*--dock-punch-stretch\b/.test(comp) &&
        !/1\s*\/\s*\(/.test(comp) &&
        !/--dock-size-scale/.test(comp);
    // A block is the axis inverse for `child` iff its selector targets the child as a
    // direct child under a `[data-morphing]`/`[data-punching]` dock with the axis
    // qualifier, and its two `scale:` components are (fullInverse, squishCarry) in the
    // axis order.
    const findAxisRule = (child, axis) => {
        const axisQual = axis === "x" ? ":not(.vertical)" : ".vertical";
        for (const b of blocks) {
            const sel = b.selector;
            const gated =
                /\.glass-dock\[data-morphing\]/.test(sel) ||
                /\.glass-dock\[data-punching\]/.test(sel);
            const hasAxis = sel.includes(axisQual);
            const hasChild = new RegExp(
                `>\\s*${child.replace(".", "\\.")}\\b`,
            ).test(sel);
            if (!gated || !hasAxis || !hasChild) continue;
            const scaleM = b.body.match(/scale\s*:\s*([^;]+);/);
            if (!scaleM) continue;
            const parts = splitTopLevel(scaleM[1].trim());
            if (parts.length !== 2) continue;
            const [first, second] = parts;
            // Horizontal: [fullInverse (X), squishCarry (Y)].
            if (axis === "x" && isFullInverse(first) && isSquishCarry(second))
                return true;
            // Vertical:   [squishCarry (X), fullInverse (Y)].
            if (axis === "y" && isSquishCarry(first) && isFullInverse(second))
                return true;
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

// ── GLYPH-RIGID G4 — detect the punch channel INHERITS to the rigid content. ──
// The content-inverse rule (G1) reads `var(--dock-punch-stretch)` on a CHILD
// (`.dock-persistent`/`.dock-layers`), while the punch value is DECLARED on the dock
// ROOT (`.glass-dock`). A registered `@property` inherits to descendants ONLY when it
// declares `inherits: true`; a `inherits: false` registration hands the child the
// `initial-value` (1), NOT the root's live overshoot (1.22), so the full-inverse
// collapses to the size-only inverse and the glyph carries the `(--dock-punch-stretch)²`
// = 1.4884 (+48.8%) residual (the F3.R1 paint FAIL). Parse the
// `@property --dock-punch-stretch { … }` block and assert its `inherits:` is `true`.
// (The other two content-inverse factors — `--stretch`, `--dock-size-scale` — are
// UNREGISTERED, so they inherit by default; only the registered punch channel needs
// the explicit `inherits: true`.)
function detectPunchInherits(shapeSrc) {
    const src = stripComments(shapeSrc);
    // Find the @property --dock-punch-stretch { … } block (the registration).
    const blockM = src.match(
        /@property\s+--dock-punch-stretch\s*\{([^}]*)\}/,
    );
    const present = Boolean(blockM);
    let inheritsValue = null;
    if (present) {
        const inhM = blockM[1].match(/inherits\s*:\s*(true|false)\b/);
        inheritsValue = inhM ? inhM[1] : null;
    }
    return {
        ok: present && inheritsValue === "true",
        facts: { present, inheritsValue },
    };
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

// ── GLYPH-RIGID G3 — the settle fires at the scalar's VISIBLE ARRIVAL (F3.R1 secondary). ──
// The DOCK spring (response 0.68, ζ 0.64) overshoots past 1 then rings down over its full
// ~1s 2%-band settle; holding `[data-morphing]` through that engine-variable tail kept the
// box in its reserved-expanded × collapsed-scale sliver state for the whole tail — a
// ~800–1000ms sliver-at-rest on a slow-settling engine (the WebKit paint FAIL). The box is
// VISUALLY complete at the scalar's arrival (`tValue >= 1`, the clamped size seated), so
// `onFrame` must drop the morph state there — via the shared `settleAll()` (which routes
// through `maybeSettleRoot`, preserving the G2 attrs-before-scalar order) — so the true
// collapsed/expanded box seats within one beat on EVERY engine (deterministic off the
// scalar, not the engine-variable ring-down).
function detectArrivalSettle(morphContextSrc) {
    const src = stripComments(morphContextSrc);
    // The arrival guard `tValue >= 1` — the per-frame writer drops the morph state at the
    // scalar's visible arrival (not only the spring's natural `onSettle` ring-down).
    const hasArrivalGuard = /tValue\s*>=\s*1\b/.test(src);
    // …firing a settle: the shared `settleAll()` (which routes through `maybeSettleRoot`,
    // preserving the G2 order) OR an inline attr-drop + `maybeSettleRoot`.
    const firesSettle =
        /settleAll\s*\(\s*\)/.test(src) ||
        (/removeAttribute\(\s*["']data-morphing["']\s*\)/.test(src) &&
            /maybeSettleRoot\s*\(\s*\)/.test(src));
    return {
        ok: hasArrivalGuard && firesSettle,
        facts: { hasArrivalGuard, firesSettle },
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

// ── PANE-OVERLAP P4 — a NESTED pane swap HOLDS the plate box (BG.W-DOCK-PANE-OVERLAP F3.R2). ──
// The `/dock/layers` route is ALL nested (standaloneGroupCount 0), so the orchestrator owns the
// box via the convex-blend `--dock-live` (layers.css) off the directional `--dock-expand-t`
// (dock/morph.css). A pane swap seats `--dock-morph-t` at the collapsed 0 endpoint; HEAD's
// `.expanded[data-morphing]` arm unconditionally derived `--dock-expand-t: var(--dock-morph-t)`,
// so the box collapsed to the pill mid-swap (the paint-judge FAIL: 269→53.68px dip). The FIX
// decouples the collapse/expand box scalar from the pane-swap crossfade:
//   (CSS, morph.css) the `[data-morphing]` --dock-expand-t derivation arms are scoped
//     `:not([data-pane-swap])`, so during a pane swap --dock-expand-t holds the static class
//     endpoint (expanded → 1) and the box + chrome HOLD, while --dock-morph-t still glides.
//   (TS, dockMorphContext) the orchestrator distinguishes the OUTER collapse/expand target
//     (isOuter) from nested pane-swap targets and arms `data-pane-swap` ONLY on a nested swap
//     (`ensureSpringRunning(!t.isOuter)`), clearing it on settle.
function detectPaneSwapBoxHold(morphContextSrc, morphCssSrc) {
    const ts = stripComments(morphContextSrc);
    const css = stripComments(morphCssSrc);
    const facts = {};

    // (CSS) BOTH the expanded/always-expanded arm AND the collapsed arm — the ROOT
    // class-qualified `--dock-expand-t` derivation arms (the box drivers) — carry the
    // `:not([data-pane-swap])` guard.
    const expandArmGuarded =
        /\.glass-dock\.expanded\[data-morphing\]:not\(\[data-pane-swap\]\)/.test(
            css,
        ) &&
        /\.glass-dock\.always-expanded\[data-morphing\]:not\(\[data-pane-swap\]\)/.test(
            css,
        );
    const collapseArmGuarded =
        /\.glass-dock\.collapsed\[data-morphing\]:not\(\[data-pane-swap\]\)/.test(
            css,
        );
    // Anti-evasion: NO ROOT class-qualified `--dock-expand-t` derivation arm may be UNGUARDED
    // (a bare `.glass-dock.expanded[data-morphing] { … }` re-introduces the collapse on a pane
    // swap). Scans for `.glass-dock.{expanded|always-expanded|collapsed}[data-morphing]` NOT
    // immediately followed by `:not([data-pane-swap])` at a selector boundary (`,` or `{`).
    const noUnguardedDerivation =
        !/\.glass-dock\.(?:always-expanded|expanded|collapsed)\[data-morphing\](?!:not\(\[data-pane-swap\]\))\s*(?:,|\{)/.test(
            css,
        );
    facts.expandArmGuarded = expandArmGuarded;
    facts.collapseArmGuarded = collapseArmGuarded;
    facts.noUnguardedDerivation = noUnguardedDerivation;

    // (TS) the orchestrator distinguishes outer vs nested (`isOuter`), passes the box-hold
    // flag off it (`ensureSpringRunning(!t.isOuter)`), SETS `data-pane-swap` on the nested
    // swap, and CLEARS it (on the outer arm + settle). The flag is CONDITIONAL on isOuter —
    // a hardcoded unconditional set would break the outer collapse/expand.
    const hasIsOuter = /\bisOuter\b/.test(ts);
    const swapPassesFlag = /ensureSpringRunning\(\s*!\s*\w+\.isOuter\s*\)/.test(ts);
    const setsPaneSwap = /setAttribute\(\s*["']data-pane-swap["']/.test(ts);
    const clearsPaneSwap = /removeAttribute\(\s*["']data-pane-swap["']/.test(ts);
    facts.hasIsOuter = hasIsOuter;
    facts.swapPassesFlag = swapPassesFlag;
    facts.setsPaneSwap = setsPaneSwap;
    facts.clearsPaneSwap = clearsPaneSwap;

    return {
        ok:
            expandArmGuarded &&
            collapseArmGuarded &&
            noUnguardedDerivation &&
            hasIsOuter &&
            swapPassesFlag &&
            setsPaneSwap &&
            clearsPaneSwap,
        facts,
    };
}

// ── SHELL-MORPH-PAINT S1 — the per-frame morph write does ZERO getComputedStyle. ──
// (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3). The IOS27-MOTION-TRUTH capture timed a ~295ms
// stall "right after toggle" that ate the initial fast-rise teardrop frames — the
// "measure storm". Its root was the per-frame cap read: `writeScalar` called a
// `maxStretchOf()` helper that ran `getComputedStyle(root).getPropertyValue(…)` (twice,
// via the cap token + the `effectiveCap` motion-weight read-back) AFTER writing inline
// custom properties that frame — a read-after-write forced style/layout flush on EVERY
// spring frame. The repair PRE-WARMS the cap token once per gesture (a `readCapToken()`
// called in `runTo`/`pin`, off the animation path) into `capTokenCached`, and computes
// the per-frame effective cap ARITHMETICALLY via `effectiveCapFromVelocity(capTokenCached,
// v)` (a pure `f(v)`, no DOM). So `writeScalar` (and the spring's `play` callback) does
// ZERO `getComputedStyle` — the measure storm is gone, the fast-rise teardrop frames
// paint. Asserts: (a) the `writeScalar` body carries no `getComputedStyle`; (b) the
// per-frame cap is the pure `effectiveCapFromVelocity(` (NOT a `maxStretchOf()` DOM read
// — the HEAD form); (c) the pure helper itself has no `getComputedStyle`; (d) the token
// is still CONSULTED but PRE-WARMED off the gesture path (`capTokenCached = readCapToken()`
// present, and `readCapToken` reads the `--dock-morph-max-stretch` token) — the A4 cap
// thread survives, moved off the per-frame path.
function detectMorphMeasureStorm(orientSrc) {
    const src = stripComments(orientSrc);
    const facts = {};
    // Extract the writeScalar body (4-space-indented function, closes on `\n    }`).
    // The `(?::[^{]*)?` tolerates a TS return-type annotation (`: void`) before `{`.
    const wsM = src.match(
        /function\s+writeScalar\s*\([^)]*\)\s*(?::[^{]*)?\{([\s\S]*?)\n\s{4}\}/,
    );
    const writeScalarBody = wsM ? wsM[1] : null;
    // (a) no getComputedStyle in the per-frame write path.
    const writeScalarNoDomRead =
        writeScalarBody != null && !/getComputedStyle/.test(writeScalarBody);
    // (b) the per-frame cap is the pure arithmetic helper (NOT the HEAD maxStretchOf()
    // DOM read-back). A re-introduced `maxStretchOf(` inside writeScalar reds here.
    const perFramePureCap =
        writeScalarBody != null &&
        /effectiveCapFromVelocity\s*\(/.test(writeScalarBody) &&
        !/maxStretchOf\s*\(/.test(writeScalarBody);
    // (c) the pure cap helper carries no DOM read (it is `f(v)`, not a getComputedStyle).
    const capHelperM = src.match(
        /function\s+effectiveCapFromVelocity\s*\([^)]*\)\s*(?::[^{]*)?\{([\s\S]*?)\n\s{4}\}/,
    );
    const capHelperPure =
        capHelperM != null && !/getComputedStyle/.test(capHelperM[1]);
    // (d) the token is PRE-WARMED off the gesture path: a cached read assignment exists
    // AND the reader consults the `--dock-morph-max-stretch` token (the A4 thread kept).
    const preWarmCached = /capTokenCached\s*=\s*readCapToken\s*\(\s*\)/.test(src);
    const readCapM = src.match(
        /function\s+readCapToken\s*\([^)]*\)\s*(?::[^{]*)?\{([\s\S]*?)\n\s{4}\}/,
    );
    const tokenStillConsulted =
        readCapM != null &&
        /getComputedStyle/.test(readCapM[1]) &&
        /--dock-morph-max-stretch/.test(readCapM[1]);
    facts.writeScalarNoDomRead = writeScalarNoDomRead;
    facts.perFramePureCap = perFramePureCap;
    facts.capHelperPure = capHelperPure;
    facts.preWarmCached = preWarmCached;
    facts.tokenStillConsulted = tokenStillConsulted;
    return {
        ok:
            writeScalarNoDomRead &&
            perFramePureCap &&
            capHelperPure &&
            preWarmCached &&
            tokenStillConsulted,
        facts,
    };
}

// ── SHELL-MORPH-PAINT S2 — the bridge-opacity gate is a legible PLATEAU, not a razor
// triangle (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3). ──
// `bridgeGate(t)` (the `--dock-bridge-opacity` output) was a triangle peaking ONLY at the
// exact t≈0.5 midpoint (smootherstep 0→1 on the way up, 1→0 on the way down), so the
// travelling teardrop was legibly opaque for ~1 frame at 0.5 and near-transparent on
// every other travel frame — the paint judge read "no teardrop". The repair holds FULL
// opacity across the occluded core `t∈[RUP,RDN]` (a trapezoid): smootherstep ramp up to
// 1 by RUP, a flat `return 1` plateau through RDN, ramp down to 0 by HI. So the teardrop
// reads LEGIBLY across the whole window — ≥12 painted travel frames. Asserts the body
// carries a bare `return 1` plateau AND the plateau width (RDN − RUP) is a legible ≥ 0.2.
function detectBridgeGatePlateau(orientSrc) {
    const src = stripComments(orientSrc);
    const facts = {};
    const bgM = src.match(
        /function\s+bridgeGate\s*\([^)]*\)\s*(?::[^{]*)?\{([\s\S]*?)\n\s{4}\}/,
    );
    const body = bgM ? bgM[1] : null;
    // The flat plateau — a bare `return 1;` (the HEAD triangle has no bare-1 return).
    const hasPlateau = body != null && /\breturn\s+1\s*;/.test(body);
    // The plateau boundary constants RUP (ramp-up end) + RDN (ramp-down start).
    const rupM = body ? body.match(/\bRUP\s*=\s*([\d.]+)/) : null;
    const rdnM = body ? body.match(/\bRDN\s*=\s*([\d.]+)/) : null;
    const rup = rupM ? parseFloat(rupM[1]) : null;
    const rdn = rdnM ? parseFloat(rdnM[1]) : null;
    const plateauWidth = rup != null && rdn != null ? rdn - rup : null;
    const wideEnough = plateauWidth != null && plateauWidth >= 0.2;
    facts.hasPlateau = hasPlateau;
    facts.rup = rup;
    facts.rdn = rdn;
    facts.plateauWidth =
        plateauWidth != null ? Number(plateauWidth.toFixed(4)) : null;
    return { ok: hasPlateau && wideEnough, facts };
}

// ── SHELL-MORPH-PAINT S3 — the two bridge plates OVERLAP into a dense fused teardrop +
// the reshape is compositor-only (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3). ──
// The travelling teardrop is the two `.dock-morph-bridge-plate--{vertical,horizontal}`
// plates fused by the goo. At HEAD they crossfaded AT 0.5 (vertical faded from 0.5,
// horizontal reached full at 0.5), so their sum thinned to a faint neck on the shoulders
// of the plateau — the fused mass read sub-legible on the travel frames. The repair
// WIDENS the overlap: the vertical plate HOLDS full opacity past the midpoint (a
// `1 - clamp(0, (t - holdUntil) / span, 1)` with holdUntil ≥ 0.55) and the horizontal
// plate reaches full EARLY (a `clamp(0, (t - onset) / span, 1)` reaching 1 by ≤ 0.45), so
// across the overlap window BOTH plates are ~fully present → one dense continuous mass.
// Also asserts compositor-only: no size property (`width`/`height`/`inline-size`/
// `block-size`) VALUE reads `--dock-morph-t`/`--stretch` (the boxes are static reserves;
// only clip-path/scale/opacity animate — the proof:no-layout-animation floor).
function detectBridgePlateOverlap(bridgeCssSrc) {
    const src = stripComments(bridgeCssSrc);
    const facts = {};
    // Split into rule blocks (selector { body }).
    const blocks = [];
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(src)) !== null) {
        blocks.push({ selector: m[1], body: m[2] });
    }
    const findPlate = (mod) =>
        blocks.find((b) =>
            new RegExp(
                `\\.dock-morph-bridge-plate--${mod}\\b`,
            ).test(b.selector),
        );
    const vRule = findPlate("vertical");
    const hRule = findPlate("horizontal");
    // Vertical: `1 - clamp(0, calc((var(--dock-morph-t,0) - <holdUntil>) / <span>), 1)`.
    let holdUntil = null;
    if (vRule) {
        const om = vRule.body.match(
            /opacity\s*:\s*calc\(\s*1\s*-\s*clamp\(\s*0\s*,\s*calc\(\s*\(\s*var\(\s*--dock-morph-t[^)]*\)\s*-\s*([\d.]+)\s*\)\s*\/\s*[\d.]+\s*\)\s*,\s*1\s*\)\s*\)/,
        );
        if (om) holdUntil = parseFloat(om[1]);
    }
    // Horizontal: `clamp(0, calc((var(--dock-morph-t,0) - <onset>) / <span>), 1)`.
    let reachesFull = null;
    if (hRule) {
        const om = hRule.body.match(
            /opacity\s*:\s*clamp\(\s*0\s*,\s*calc\(\s*\(\s*var\(\s*--dock-morph-t[^)]*\)\s*-\s*([\d.]+)\s*\)\s*\/\s*([\d.]+)\s*\)\s*,\s*1\s*\)/,
        );
        if (om) reachesFull = parseFloat(om[1]) + parseFloat(om[2]);
    }
    const verticalHolds = holdUntil != null && holdUntil >= 0.55;
    const horizontalEarly = reachesFull != null && reachesFull <= 0.45;
    const overlap =
        holdUntil != null && reachesFull != null
            ? holdUntil - reachesFull
            : null;
    const overlaps = overlap != null && overlap >= 0.15;
    // Compositor-only: no *-size property value reads the live scalar/derivative.
    const noSizeAnimatesScalar =
        !/(?:^|[\s;{])(?:width|height|inline-size|block-size)\s*:\s*[^;]*var\(\s*--(?:dock-morph-t|stretch)\b/m.test(
            src,
        );
    facts.holdUntil = holdUntil;
    facts.reachesFull = reachesFull;
    facts.overlap = overlap != null ? Number(overlap.toFixed(4)) : null;
    facts.noSizeAnimatesScalar = noSizeAnimatesScalar;
    return {
        ok:
            verticalHolds &&
            horizontalEarly &&
            overlaps &&
            noSizeAnimatesScalar,
        facts,
    };
}

// ── SHELL-MORPH-PAINT S4 — the settled shell orientation commits AT the 0.5-crossing
// (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3 paint-repair). ──
// The paint judge caught the discrete `<main>` column re-margin firing AT SETTLE
// (`morphing → false`, bridge opacity 0) — a NAKED reclaim with the goo teardrop fully
// gone. The FIX drives the shell's `settledOrientation` off `morph.boundOrientation` (the
// driver's pure `f(t)` at the 0.5 crossing) via a watch on THAT source, so the reclaim
// (and the aside fixed-flip + the dock row-relayout) commit at the occluded midpoint where
// the teardrop covers the flip. Asserts (a) a `watch` whose SOURCE reads
// `morph.boundOrientation.value` drives `settledOrientation`, AND (b) the HEAD settle-commit
// form is ABSENT — no `watch(() => morph.morphing.value, …)` handler that assigns
// `settledOrientation` (the settle-driven reclaim that painted the naked jump).
function detectShellSettleDrive(appShellSrc) {
    const src = stripComments(appShellSrc);
    const facts = {};
    // (a) POSITIVE — the settled orientation is driven off the 0.5-crossing boundOrientation.
    const boundWatch =
        /watch\(\s*\(\s*\)\s*=>\s*morph\.boundOrientation\.value/.test(src);
    const writesSettled = /settledOrientation\.value\s*=/.test(src);
    // (b) NEGATIVE — the HEAD settle-commit is gone (a `watch` on `morph.morphing` that
    // assigns `settledOrientation` = the naked-at-settle reclaim). The lazy `[\s\S]*?`
    // requires the morphing-watch SOURCE to precede a `settledOrientation` assignment; the
    // fixed shell has no `watch(() => morph.morphing.value …)` at all.
    const settleCommit =
        /watch\(\s*\(\s*\)\s*=>\s*morph\.morphing\.value[\s\S]*?settledOrientation\.value\s*=/.test(
            src,
        );
    facts.boundWatch = boundWatch;
    facts.writesSettled = writesSettled;
    facts.noSettleCommit = !settleCommit;
    return { ok: boundWatch && writesSettled && !settleCommit, facts };
}

// ── SHELL-MORPH-PAINT S5 — the shell dock's GlassDock orientation is BOUND, not hardcoded
// vertical (BG.W-SHELL-MORPH-PAINT-REPAIR; F3.R3 paint-repair). ──
// The paint judge found the settled "horizontal" dock stayed a vertical RAIL: SidebarDock
// hardcoded `orientation="vertical"` on its `<GlassDock>`, so `.glass-dock.vertical`'s
// column grid pinned it tall-and-narrow (67×654) and the re-margined content slid UNDER it
// (the left ~50-90px of every line occluded). The FIX binds `:orientation="dockOrientation"`
// (the injected SHELL_DOCK_ORIENTATION the morph commits at 0.5), so the settled-horizontal
// dock drops the column grid for the base row layout — a genuine wide-short top bar the
// `<main>` top-gutter reserve clears. Asserts (a) the bound `:orientation="dockOrientation"`
// prop is present AND (b) the hardcoded `orientation="vertical"` is GONE. The `(?<![\w-])`
// lookbehind FENCES `aria-orientation="vertical"` (the facet-rail's a11y attr) — only a bare
// GlassDock `orientation="vertical"` prop reds.
function detectSidebarDockOrientationBound(sidebarSrc) {
    const src = stripComments(sidebarSrc);
    const facts = {};
    const bound = /:orientation\s*=\s*"dockOrientation"/.test(src);
    const hardcodedVertical = /(?<![\w-])orientation\s*=\s*"vertical"/.test(src);
    facts.orientationBound = bound;
    facts.noHardcodedVertical = !hardcodedVertical;
    return { ok: bound && !hardcodedVertical, facts };
}

// overrides: { silhouetteExists?, testExists?, gateScriptExists?, manifestSrc?,
//              packageSrc?, dockCorpus?, constantsSrc?, dockContextExists?,
//              shapeSrc?, morphContextSrc?, layerGroupVueSrc?, layerTransitionTsSrc?,
//              morphCssSrc?, orientMorphSrc?, bridgeCssSrc?, appShellSrc?,
//              sidebarDockSrc? }.
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
    const morphCssSrc = overrides.morphCssSrc ?? read(DOCK_MORPH_CSS);
    const orientMorphSrc = overrides.orientMorphSrc ?? read(ORIENTATION_MORPH_TS);
    const bridgeCssSrc = overrides.bridgeCssSrc ?? read(MORPH_BRIDGE_CSS);
    const appShellSrc = overrides.appShellSrc ?? read(DEMO_APP_SHELL);
    const sidebarDockSrc = overrides.sidebarDockSrc ?? read(DEMO_SIDEBAR_DOCK);

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

    // ── G3 — ARRIVAL-SETTLE (BG.W-DOCK-GLYPH-RIGID F3.R1 secondary) ──
    const arrival = detectArrivalSettle(morphContextSrc);
    facts.glyphRigidArrivalSettle = arrival.facts;
    assert(
        "G3 — dockMorphContext.onFrame drops the morph state at the scalar's VISIBLE ARRIVAL (`tValue >= 1`) via the shared settle path, so the true collapsed circle seats within one beat on EVERY engine (not the spring's ~1s ring-down that painted a WebKit sliver-at-rest)",
        arrival.ok,
    );

    // ── G4 — PUNCH-INHERITS-TO-CONTENT (BG.W-DOCK-GLYPH-RIGID F3.R1 paint-repair #2) ──
    const punchInherits = detectPunchInherits(shapeSrc);
    facts.glyphRigidPunchInherits = punchInherits.facts;
    assert(
        "G4 — the `@property --dock-punch-stretch` registration declares `inherits: true`, so the rigid-content inverse rule (G1) reads the dock ROOT's live punch overshoot at the CHILD (`.dock-persistent`/`.dock-layers`) and CANCELS it — a `inherits: false` registration hands the child the initial `1`, the full-inverse collapses to the size-only inverse, and the glyph carries the `(--dock-punch-stretch)²` = 1.4884 (+48.8%) residual (the F3.R1 paint FAIL the G1 text-check cannot see)",
        punchInherits.ok,
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

    // ── P4 — PANE-OVERLAP: a NESTED pane swap HOLDS the plate box (F3.R2 fix) ──
    const boxHold = detectPaneSwapBoxHold(morphContextSrc, morphCssSrc);
    facts.paneSwapBoxHold = boxHold.facts;
    assert(
        "P4 — a NESTED DockLayerGroup pane swap HOLDS the plate box (never collapses to the pill): dock/morph.css scopes the `--dock-expand-t` derivation arms `:not([data-pane-swap])` (expanded/always-expanded/collapsed all guarded, none unguarded), and dockMorphContext distinguishes the outer collapse/expand target (isOuter) from a nested pane-swap target, arming `data-pane-swap` ONLY on the nested swap (`ensureSpringRunning(!t.isOuter)`) + clearing it on settle — so the box + chrome hold the expanded endpoint while `--dock-morph-t` still glides the crossfade",
        boxHold.ok,
    );

    // ── S1 — SHELL-MORPH: the per-frame morph write does ZERO getComputedStyle (F3.R3) ──
    const measureStorm = detectMorphMeasureStorm(orientMorphSrc);
    facts.shellMorphMeasureStorm = measureStorm.facts;
    assert(
        "S1 — useDockOrientationMorph's per-frame morph write (`writeScalar` + the spring `play` callback) does ZERO `getComputedStyle`: the `--dock-morph-max-stretch` cap is PRE-WARMED once per gesture (`capTokenCached = readCapToken()` in runTo/pin, off the animation path) and the per-frame effective cap is the pure `effectiveCapFromVelocity(capTokenCached, v)` — the HEAD read-after-write layout thrash (the ~295ms measure storm that ate the initial fast-rise teardrop frames) is gone, so the travelling teardrop frames actually paint (a re-introduced `maxStretchOf()` DOM read in `writeScalar` reds)",
        measureStorm.ok,
    );

    // ── S2 — SHELL-MORPH: the bridge-opacity gate is a legible PLATEAU (F3.R3) ──
    const bridgePlateau = detectBridgeGatePlateau(orientMorphSrc);
    facts.shellMorphBridgePlateau = bridgePlateau.facts;
    assert(
        "S2 — `bridgeGate(t)` (the `--dock-bridge-opacity` output) holds FULL opacity across the occluded core (a `return 1` plateau of width RDN−RUP ≥ 0.2), NOT the HEAD razor triangle that peaked only at the exact t≈0.5 midpoint — so the travelling teardrop reads LEGIBLY across the whole 0.16<t<0.86 window (≥12 painted travel frames), never a single-frame flash",
        bridgePlateau.ok,
    );

    // ── S3 — SHELL-MORPH: the two bridge plates OVERLAP into a dense fused mass (F3.R3) ──
    const bridgeOverlap = detectBridgePlateOverlap(bridgeCssSrc);
    facts.shellMorphBridgeOverlap = bridgeOverlap.facts;
    assert(
        "S3 — the two morph-bridge plates OVERLAP into a dense fused teardrop: the vertical plate HOLDS full opacity past the midpoint (holdUntil ≥ 0.55) and the horizontal plate reaches full EARLY (by ≤ 0.45), so across the overlap window (≥ 0.15 wide) BOTH plates are ~fully present (one dense continuous travelling mass, not the HEAD 0.5-centred crossfade that thinned to a faint neck) — AND the reshape is compositor-only (no width/height/*-size property value reads `--dock-morph-t`/`--stretch`; the plate boxes are static reserves)",
        bridgeOverlap.ok,
    );

    // ── S4 — SHELL-MORPH ENDPOINT: the settled orientation commits at the 0.5-crossing ──
    const settleDrive = detectShellSettleDrive(appShellSrc);
    facts.shellSettleDrive = settleDrive.facts;
    assert(
        "S4 — AppShell drives the shell dock's SETTLED orientation off `morph.boundOrientation` (the driver's pure `f(t)` at the 0.5 crossing) via a `watch(() => morph.boundOrientation.value, …)` → `settledOrientation`, NOT the HEAD settle-commit `watch(() => morph.morphing.value, …)` that flipped it at spring settle (bridge opacity 0) — so the discrete `<main>` column re-margin + the aside fixed-flip commit AT the occluded midpoint where the goo teardrop covers the flip, never NAKED at settle (the paint FAIL). A re-introduced morphing-settle-commit reds",
        settleDrive.ok,
    );

    // ── S5 — SHELL-MORPH ENDPOINT: the shell dock's GlassDock orientation is BOUND ──
    const dockOrientationBound = detectSidebarDockOrientationBound(sidebarDockSrc);
    facts.shellDockOrientationBound = dockOrientationBound.facts;
    assert(
        "S5 — SidebarDock binds `:orientation=\"dockOrientation\"` on its `<GlassDock>` (the injected SHELL_DOCK_ORIENTATION the morph commits at 0.5), so the settled-horizontal shell dock actually lays out as a wide-short top BAR (drops `.glass-dock.vertical`'s column grid) that the `<main>` top-gutter reserve clears — NOT the HEAD hardcoded `orientation=\"vertical\"` that pinned the column grid into a tall RAIL occluding the re-margined content (the `aria-orientation=\"vertical\"` facet-rail attr is fenced by the lookbehind). A re-introduced hardcoded vertical prop reds",
        dockOrientationBound.ok,
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
    // A clean synthetic shape.css carrying the FULL inverse-scale content-layer on both
    // children, both axes, gated on the morph window — the G1-GREEN reference (the
    // morph-axis component inverts the FULL `size × stretch × punch` factor, the cross
    // component carries `stretch × punch`, so the glyph aspect is EXACTLY 1.0).
    const CLEAN_SHAPE = `
@property --dock-punch-stretch {
    syntax: "<number>";
    inherits: true;
    initial-value: 1;
}
@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-persistent,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1))) calc(var(--stretch, 1) * var(--dock-punch-stretch, 1));
        will-change: transform;
    }
    .glass-dock[data-morphing].vertical > .dock-persistent,
    .glass-dock[data-morphing].vertical > .dock-layers,
    .glass-dock[data-punching].vertical > .dock-persistent,
    .glass-dock[data-punching].vertical > .dock-layers {
        scale: calc(var(--stretch, 1) * var(--dock-punch-stretch, 1)) calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1)));
        will-change: transform;
    }
}`;
    // A clean synthetic orchestrator: maybeSettleRoot drops the attrs BEFORE the scalar
    // (the G2-GREEN reference) AND onFrame drops the morph state at the scalar's arrival
    // `tValue >= 1` via the shared settleAll (the G3-GREEN reference). The P4-GREEN
    // reference: the nested-vs-outer isOuter distinction + the `data-pane-swap` box-HOLD.
    const CLEAN_MORPH_CONTEXT = `
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
            r.removeAttribute("data-pane-swap");
            r.style.removeProperty("--dock-morph-t");
        }
        dockSpring.dispose();
    }
    function settleAll() {
        for (const tt of targets) settleTarget(tt);
        maybeSettleRoot();
    }
    function ensureSpringRunning(paneSwap = false) {
        const r = root();
        if (!r) return;
        r.setAttribute("data-morphing", "");
        if (paneSwap) {
            r.setAttribute("data-pane-swap", "");
        } else {
            r.removeAttribute("data-pane-swap");
            r.setAttribute("data-punching", "");
        }
        dockSpring.playTo(0, 1, {
            onFrame: (tValue) => {
                const rr = root();
                if (!rr) return;
                rr.style.setProperty("--dock-morph-t", tValue + "");
                if (tValue > 0.5 && rr.hasAttribute("data-punching")) {
                    rr.removeAttribute("data-punching");
                }
                if (tValue >= 1 && rr.hasAttribute("data-morphing")) {
                    settleAll();
                }
            },
            onSettle: () => {
                settleAll();
            },
        });
    }
    function onSwap(t, newLayer, oldLayer) {
        t.leavingLayer.value = oldLayer;
        t.currentLayer.value = newLayer;
        ensureSpringRunning(!t.isOuter);
    }
    const outerTarget = addTarget({ containerEl: outerEl }, true);`;
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
    // A clean synthetic dock/morph.css — the `--dock-expand-t` derivation arms scoped
    // `:not([data-pane-swap])` (the P4-GREEN reference; the box HOLDS during a pane swap).
    const CLEAN_MORPH_CSS = `
@layer components {
    .glass-dock.expanded,
    .glass-dock.always-expanded {
        --dock-expand-t: 1;
    }
    .glass-dock.collapsed {
        --dock-expand-t: 0;
    }
    .glass-dock.expanded[data-morphing]:not([data-pane-swap]),
    .glass-dock.always-expanded[data-morphing]:not([data-pane-swap]) {
        --dock-expand-t: var(--dock-morph-t);
    }
    .glass-dock.collapsed[data-morphing]:not([data-pane-swap]) {
        --dock-expand-t: calc(1 - var(--dock-morph-t));
    }
    .glass-dock[data-morphing] .dock-layer-stack {
        --dock-expand-t: var(--dock-morph-t);
    }
}`;
    // A clean synthetic useDockOrientationMorph.ts — the SHELL-MORPH-PAINT S1/S2 GREEN
    // reference: `writeScalar` computes the per-frame cap via the pure
    // `effectiveCapFromVelocity(capTokenCached, v)` (ZERO getComputedStyle), the cap is
    // PRE-WARMED once per gesture in `runTo` (`capTokenCached = readCapToken()`), and
    // `bridgeGate` holds a FULL-opacity plateau across the occluded core (RUP..RDN).
    const CLEAN_ORIENT_MORPH = `
    let capTokenCached = DOCK_MORPH_MAX_STRETCH;
    function readCapToken() {
        const r = rootEl.value;
        if (!r) return DOCK_MORPH_MAX_STRETCH;
        const raw = getComputedStyle(r).getPropertyValue("--dock-morph-max-stretch").trim();
        const n = raw ? Number.parseFloat(raw) : NaN;
        return Number.isFinite(n) && n >= 1 ? n : DOCK_MORPH_MAX_STRETCH;
    }
    function effectiveCapFromVelocity(capToken, v) {
        if (capToken <= 1) return 1;
        const weight = MOTION_WEIGHT_REST + (1 - MOTION_WEIGHT_REST) * v;
        const blended = weight + (1 - weight) * v;
        return 1 + (capToken - 1) * (blended / MOTION_WEIGHT_REST);
    }
    function writeScalar(value, velocity) {
        t.value = value;
        const v = Math.min(Math.abs(velocity) / V_NORM, 1);
        const r = rootEl.value;
        if (r) {
            writeVelocityWeight(r, v);
            const cap = effectiveCapFromVelocity(capTokenCached, v);
            const s = 1 + (cap - 1) * v;
            r.style.setProperty("--dock-morph-t", value + "");
            r.style.setProperty("--stretch", s + "");
        }
    }
    function bridgeGate(x) {
        const LO = 0.16;
        const RUP = 0.32;
        const RDN = 0.72;
        const HI = 0.86;
        if (x <= LO || x >= HI) return 0;
        if (x < RUP) {
            const u = (x - LO) / (RUP - LO);
            return u * u * (3 - 2 * u);
        }
        if (x <= RDN) return 1;
        const u = (HI - x) / (HI - RDN);
        return u * u * (3 - 2 * u);
    }
    function runTo(targetT) {
        capTokenCached = readCapToken();
    }`;
    // A clean synthetic morph-bridge.css — the SHELL-MORPH-PAINT S3 GREEN reference: the
    // vertical plate HOLDS full opacity to t=0.6, the horizontal reaches full by t=0.4
    // (overlap 0.2), and no *-size property animates the scalar (static box reserves).
    const CLEAN_BRIDGE_CSS = `
@layer components {
    .dock-morph-bridge-plate--vertical {
        width: var(--dock-bridge-v-w, 3.25rem);
        height: var(--dock-bridge-v-h, 16rem);
        clip-path: inset(var(--dock-bridge-v-neck) 0 var(--dock-bridge-v-neck) 0 round 999px);
        opacity: calc(1 - clamp(0, calc((var(--dock-morph-t, 0) - 0.6) / 0.35), 1));
        scale: calc(1 / var(--stretch, 1)) var(--stretch, 1);
    }
    .dock-morph-bridge-plate--horizontal {
        width: var(--dock-bridge-h-w, 18rem);
        height: var(--dock-bridge-h-h, 3.25rem);
        clip-path: inset(0 var(--dock-bridge-h-neck) 0 var(--dock-bridge-h-neck) round 999px);
        opacity: clamp(0, calc((var(--dock-morph-t, 0) - 0.05) / 0.35), 1);
        scale: var(--stretch, 1) calc(1 / var(--stretch, 1));
    }
}`;
    // A clean synthetic AppShell.vue script — the SHELL-MORPH-PAINT S4 GREEN reference: the
    // settled orientation tracks `morph.boundOrientation` (the 0.5-crossing) via a watch on
    // THAT source, and there is NO `watch(() => morph.morphing.value …)` settle-commit.
    const CLEAN_APP_SHELL = `
<script setup>
const settledOrientation = ref("vertical");
watch(
    () => morph.boundOrientation.value,
    (o) => {
        settledOrientation.value = o;
    },
    { immediate: true },
);
provide(SHELL_DOCK_ORIENTATION, settledOrientation);
</` + `script>`;
    // A clean synthetic SidebarDock.vue — the SHELL-MORPH-PAINT S5 GREEN reference: the
    // GlassDock orientation is BOUND (`:orientation="dockOrientation"`), and the facet rail's
    // `aria-orientation="vertical"` is PRESENT (proving the lookbehind fence does NOT flag it).
    const CLEAN_SIDEBAR_DOCK = `
<template>
    <GlassDock ref="dockRef" :orientation="dockOrientation" always-expanded class="demo-sidebar-dock">
        <div class="demo-facet-rail--vertical" role="tablist" aria-orientation="vertical"></div>
    </GlassDock>
</template>`;
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
        morphCssSrc: CLEAN_MORPH_CSS,
        orientMorphSrc: CLEAN_ORIENT_MORPH,
        bridgeCssSrc: CLEAN_BRIDGE_CSS,
        appShellSrc: CLEAN_APP_SHELL,
        sidebarDockSrc: CLEAN_SIDEBAR_DOCK,
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

    // ── G1 — the FULL-inverse-scale content-layer bites (BG.W-DOCK-GLYPH-RIGID) ──
    // G1: the HEAD-shape — no inverse rule at all (the original born-RED premise).
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) {
        scale: calc(var(--dock-size-scale, 1) * var(--stretch, 1) * var(--dock-punch-stretch, 1)) calc(1 / (var(--stretch, 1) * var(--dock-punch-stretch, 1)));
    }
}`,
        },
        "G1",
        "G1 HEAD shape (box scales the whole subtree, no content-layer inverse) reds",
    );
    // G1: the F3.R1 SIZE-ONLY residual — inverts ONLY --dock-size-scale, leaving the
    // (--stretch × --dock-punch-stretch)² = +48.8% glyph residual (the paint-judge FAIL
    // this repair removes). The CRITICAL new born-RED bite: a re-introduction of the
    // size-only inverse REDs on the number, not just on a missing CSS string.
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
    .glass-dock[data-morphing].vertical > .dock-persistent,
    .glass-dock[data-morphing].vertical > .dock-layers,
    .glass-dock[data-punching].vertical > .dock-persistent,
    .glass-dock[data-punching].vertical > .dock-layers {
        scale: 1 calc(1 / max(var(--dock-size-scale, 1), 0.06));
    }
}`,
        },
        "G1",
        "G1 the F3.R1 SIZE-ONLY residual (inverts only --dock-size-scale, +48.8% punch residual) reds",
    );
    // G1: the FULL inverse present on .dock-layers but MISSING on .dock-persistent.
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1))) calc(var(--stretch, 1) * var(--dock-punch-stretch, 1));
    }
    .glass-dock[data-morphing].vertical > .dock-layers,
    .glass-dock[data-punching].vertical > .dock-layers {
        scale: calc(var(--stretch, 1) * var(--dock-punch-stretch, 1)) calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1)));
    }
}`,
        },
        "G1",
        "G1 full inverse missing on .dock-persistent (only .dock-layers covered) reds",
    );
    // G1: the FULL inverse present horizontal but MISSING the vertical axis.
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-persistent,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1))) calc(var(--stretch, 1) * var(--dock-punch-stretch, 1));
    }
}`,
        },
        "G1",
        "G1 full inverse missing the vertical axis (horizontal-only) reds",
    );
    // G1: the FULL inverse NOT gated on the morph window (a resting-state scale — wrong).
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock:not(.vertical) > .dock-persistent,
    .glass-dock:not(.vertical) > .dock-layers {
        scale: calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1))) calc(var(--stretch, 1) * var(--dock-punch-stretch, 1));
    }
    .glass-dock.vertical > .dock-persistent,
    .glass-dock.vertical > .dock-layers {
        scale: calc(var(--stretch, 1) * var(--dock-punch-stretch, 1)) calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1)));
    }
}`,
        },
        "G1",
        "G1 full inverse not gated on [data-morphing]/[data-punching] (a resting scale) reds",
    );
    // G1: the inverse MISSES the punch factor (inverts size × stretch but not
    // --dock-punch-stretch) — the cartoon overshoot residual survives on the glyph.
    sab(
        {
            ...base,
            shapeSrc: `@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers {
        scale: calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1))) calc(var(--stretch, 1));
    }
    .glass-dock[data-morphing].vertical > .dock-persistent,
    .glass-dock[data-morphing].vertical > .dock-layers {
        scale: calc(var(--stretch, 1)) calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1)));
    }
}`,
        },
        "G1",
        "G1 inverse misses the --dock-punch-stretch factor (cartoon overshoot residual on the glyph) reds",
    );

    // ── G4 — the punch-inherits bite (BG.W-DOCK-GLYPH-RIGID F3.R1 paint-repair #2) ──
    // G4: the F3.R1 INHERITANCE gap — the full-inverse content rule TEXT is present
    // (G1 stays GREEN, no confound), but `@property --dock-punch-stretch` is registered
    // `inherits: false`, so the child reads the initial `1` (not the root's live 1.22),
    // the full-inverse collapses to the size-only inverse, and the glyph carries the
    // `(--dock-punch-stretch)²` = 1.4884 (+48.8%) residual (the exact painted FAIL the
    // G1 text-check could not see). A re-introduction of `inherits: false` MUST red on
    // the property flag.
    sab(
        {
            ...base,
            shapeSrc: `
@property --dock-punch-stretch {
    syntax: "<number>";
    inherits: false;
    initial-value: 1;
}
@layer components {
    .glass-dock[data-morphing]:not(.vertical) > .dock-persistent,
    .glass-dock[data-morphing]:not(.vertical) > .dock-layers,
    .glass-dock[data-punching]:not(.vertical) > .dock-persistent,
    .glass-dock[data-punching]:not(.vertical) > .dock-layers {
        scale: calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1))) calc(var(--stretch, 1) * var(--dock-punch-stretch, 1));
    }
    .glass-dock[data-morphing].vertical > .dock-persistent,
    .glass-dock[data-morphing].vertical > .dock-layers,
    .glass-dock[data-punching].vertical > .dock-persistent,
    .glass-dock[data-punching].vertical > .dock-layers {
        scale: calc(var(--stretch, 1) * var(--dock-punch-stretch, 1)) calc(1 / (max(var(--dock-size-scale, 1), 0.06) * var(--stretch, 1) * var(--dock-punch-stretch, 1)));
    }
}`,
        },
        "G4",
        "G4 @property --dock-punch-stretch registered inherits:false (child reads initial 1, full-inverse collapses to size-only, +48.8% glyph residual) reds",
    );

    // ── G2 — the settle-order bites (BG.W-DOCK-GLYPH-RIGID vocab (b)) ──
    // G2: the HEAD settle order — scalar removed BEFORE the attrs (born-RED premise).
    // (Carries the G3-green onFrame arrival guard so ONLY G2 reds — no confound.)
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
    }
    function settleAll() {
        for (const tt of targets) settleTarget(tt);
        maybeSettleRoot();
    }
    function ensureSpringRunning() {
        dockSpring.playTo(0, 1, {
            onFrame: (tValue) => {
                if (tValue >= 1 && root().hasAttribute("data-morphing")) settleAll();
            },
            onSettle: () => { settleAll(); },
        });
    }`,
        },
        "G2",
        "G2 HEAD settle order (scalar removed before the attrs) reds",
    );

    // ── G3 — the arrival-settle bite (BG.W-DOCK-GLYPH-RIGID F3.R1 secondary) ──
    // G3: the HEAD onFrame — no `tValue >= 1` arrival guard, so the morph state drops ONLY
    // at the spring's ~1s ring-down onSettle (the WebKit ~1s sliver-at-rest premise). The
    // G2-green maybeSettleRoot (attrs-before-scalar) is kept so ONLY G3 reds — no confound.
    sab(
        {
            ...base,
            morphContextSrc: `
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
            r.style.removeProperty("--dock-morph-t");
        }
        dockSpring.dispose();
    }
    function ensureSpringRunning() {
        dockSpring.playTo(0, 1, {
            onFrame: (tValue) => {
                const rr = root();
                if (rr) rr.style.setProperty("--dock-morph-t", tValue + "");
            },
            onSettle: () => {
                for (const tt of targets) settleTarget(tt);
                maybeSettleRoot();
            },
        });
    }`,
        },
        "G3",
        "G3 HEAD onFrame with no `tValue >= 1` arrival-settle guard (morph state drops only at the ~1s ring-down) reds",
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

    // ── P4 — the NESTED box-HOLD bites (BG.W-DOCK-PANE-OVERLAP F3.R2, box axis) ──
    // P4: the HEAD morph.css — the `.expanded[data-morphing]` derivation arm is UNGUARDED (no
    // `:not([data-pane-swap])`), so a pane swap drives `--dock-expand-t: var(--dock-morph-t)`
    // (starts at 0) and the box collapses to the pill — the paint-judge FAIL premise.
    sab(
        {
            ...base,
            morphCssSrc: `
@layer components {
    .glass-dock.expanded,
    .glass-dock.always-expanded { --dock-expand-t: 1; }
    .glass-dock.collapsed { --dock-expand-t: 0; }
    .glass-dock.expanded[data-morphing],
    .glass-dock.always-expanded[data-morphing] {
        --dock-expand-t: var(--dock-morph-t);
    }
    .glass-dock.collapsed[data-morphing] {
        --dock-expand-t: calc(1 - var(--dock-morph-t));
    }
}`,
        },
        "P4",
        "P4 HEAD morph.css (--dock-expand-t derivation arm unguarded, box collapses on a pane swap) reds",
    );
    // P4: the HEAD orchestrator — no isOuter distinction, no data-pane-swap; every swap seats
    // the box scalar at the collapsed 0 endpoint (the box collapses on a nested pane swap).
    sab(
        {
            ...base,
            morphContextSrc: `
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
            r.style.removeProperty("--dock-morph-t");
        }
        dockSpring.dispose();
    }
    function ensureSpringRunning() {
        const r = root();
        if (!r) return;
        r.setAttribute("data-morphing", "");
        r.setAttribute("data-punching", "");
        dockSpring.playTo(0, 1, {});
    }
    function onSwap(t, newLayer, oldLayer) {
        t.currentLayer.value = newLayer;
        ensureSpringRunning();
    }
    const outerTarget = addTarget({ containerEl: outerEl });`,
        },
        "P4",
        "P4 HEAD orchestrator (no isOuter, no data-pane-swap — every swap collapses the box) reds",
    );
    // P4: the orchestrator writes data-pane-swap UNCONDITIONALLY (not off isOuter) — the flag
    // must be derived from isOuter, else the OUTER collapse/expand box morph is broken (the box
    // would HOLD and never collapse). A hardcoded set fails the `ensureSpringRunning(!t.isOuter)`
    // conditional check.
    sab(
        {
            ...base,
            morphContextSrc: `
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
            r.removeAttribute("data-pane-swap");
            r.style.removeProperty("--dock-morph-t");
        }
        dockSpring.dispose();
    }
    function ensureSpringRunning() {
        const r = root();
        if (!r) return;
        r.setAttribute("data-morphing", "");
        r.setAttribute("data-pane-swap", "");
        dockSpring.playTo(0, 1, {});
    }
    function onSwap(t, newLayer, oldLayer) {
        t.currentLayer.value = newLayer;
        ensureSpringRunning();
    }
    const outerTarget = addTarget({ containerEl: outerEl });`,
        },
        "P4",
        "P4 orchestrator sets data-pane-swap unconditionally (not off isOuter — breaks the outer collapse/expand) reds",
    );
    // P4: only the EXPANDED arm guarded, the COLLAPSED arm left UNGUARDED — proves per-arm
    // coverage (a half-guard still lets a collapsed-dock pane swap read the collapse endpoint).
    sab(
        {
            ...base,
            morphCssSrc: `
@layer components {
    .glass-dock.expanded, .glass-dock.always-expanded { --dock-expand-t: 1; }
    .glass-dock.collapsed { --dock-expand-t: 0; }
    .glass-dock.expanded[data-morphing]:not([data-pane-swap]),
    .glass-dock.always-expanded[data-morphing]:not([data-pane-swap]) {
        --dock-expand-t: var(--dock-morph-t);
    }
    .glass-dock.collapsed[data-morphing] {
        --dock-expand-t: calc(1 - var(--dock-morph-t));
    }
}`,
        },
        "P4",
        "P4 the collapsed derivation arm left unguarded (half-guard, per-arm coverage) reds",
    );

    // ── S1 — the measure-storm bite (BG.W-SHELL-MORPH-PAINT-REPAIR F3.R3) ──
    // S1: the HEAD form — `writeScalar` calls a `maxStretchOf()` helper that reads
    // `getComputedStyle` back off the DOM EVERY frame (the read-after-write layout thrash,
    // the ~295ms measure storm). A re-introduction reds on BOTH the getComputedStyle in the
    // write path AND the absent pure `effectiveCapFromVelocity` cap.
    sab(
        {
            ...base,
            orientMorphSrc: `
    const maxStretchOf = () => {
        const r = rootEl.value;
        if (!r) return DOCK_MORPH_MAX_STRETCH;
        return getComputedStyle(r).getPropertyValue("--dock-morph-max-stretch");
    };
    function writeScalar(value, velocity) {
        t.value = value;
        const v = Math.min(Math.abs(velocity) / V_NORM, 1);
        const r = rootEl.value;
        if (r) {
            const cap = maxStretchOf();
            r.style.setProperty("--dock-morph-t", value + "");
        }
    }
    function bridgeGate(x) {
        const LO = 0.16;
        const RUP = 0.32;
        const RDN = 0.72;
        const HI = 0.86;
        if (x <= LO || x >= HI) return 0;
        if (x <= RDN) return 1;
        return 0;
    }`,
        },
        "S1",
        "S1 HEAD writeScalar reads getComputedStyle per frame (the maxStretchOf() measure storm) reds",
    );
    // S1 (evasion): the token read is DELETED entirely (no pre-warm) — the A4 cap thread
    // is severed, not moved. The pure per-frame path is present but the token is never
    // consulted, so a consumer override is dead. Must still red (tokenStillConsulted false).
    sab(
        {
            ...base,
            orientMorphSrc: `
    let capTokenCached = DOCK_MORPH_MAX_STRETCH;
    function effectiveCapFromVelocity(capToken, v) {
        return 1 + (capToken - 1) * v;
    }
    function writeScalar(value, velocity) {
        t.value = value;
        const v = Math.min(Math.abs(velocity) / V_NORM, 1);
        const cap = effectiveCapFromVelocity(capTokenCached, v);
    }
    function bridgeGate(x) {
        const RUP = 0.32;
        const RDN = 0.72;
        if (x <= RUP) return 0;
        if (x <= RDN) return 1;
        return 0;
    }
    function runTo(t) {}`,
        },
        "S1",
        "S1 the cap token pre-warm deleted (no capTokenCached=readCapToken, the A4 thread severed) reds",
    );

    // ── S2 — the bridge-gate razor-triangle bite (BG.W-SHELL-MORPH-PAINT-REPAIR F3.R3) ──
    // S2: the HEAD triangle — `bridgeGate` peaks ONLY at the exact midpoint (no bare
    // `return 1` plateau), so the teardrop flashes for ~1 frame at t≈0.5. (Carries the
    // S1-green pure-cap path so ONLY S2 reds — no confound.)
    sab(
        {
            ...base,
            orientMorphSrc: `
    let capTokenCached = DOCK_MORPH_MAX_STRETCH;
    function readCapToken() {
        const r = rootEl.value;
        return getComputedStyle(r).getPropertyValue("--dock-morph-max-stretch") || DOCK_MORPH_MAX_STRETCH;
    }
    function effectiveCapFromVelocity(capToken, v) {
        return 1 + (capToken - 1) * v;
    }
    function writeScalar(value, velocity) {
        t.value = value;
        const v = Math.min(Math.abs(velocity) / V_NORM, 1);
        const cap = effectiveCapFromVelocity(capTokenCached, v);
    }
    function bridgeGate(x) {
        const LO = 0.18;
        const HI = 0.82;
        const MID = 0.5;
        if (x <= LO || x >= HI) return 0;
        if (x < MID) {
            const u = (x - LO) / (MID - LO);
            return u * u * (3 - 2 * u);
        }
        const u = (HI - x) / (HI - MID);
        return u * u * (3 - 2 * u);
    }
    function runTo(t) {
        capTokenCached = readCapToken();
    }`,
        },
        "S2",
        "S2 HEAD bridgeGate razor triangle (no return-1 plateau, peaks only at t=0.5) reds",
    );
    // S2 (evasion): a plateau exists but is TOO NARROW (RDN−RUP < 0.2) — the teardrop is
    // only fleetingly legible, still not a travelling teardrop.
    sab(
        {
            ...base,
            orientMorphSrc: CLEAN_ORIENT_MORPH.replace(
                "const RUP = 0.32;\n        const RDN = 0.72;",
                "const RUP = 0.46;\n        const RDN = 0.54;",
            ),
        },
        "S2",
        "S2 the plateau too narrow (RDN−RUP < 0.2, a fleeting flash) reds",
    );

    // ── S3 — the bridge plate-overlap bite (BG.W-SHELL-MORPH-PAINT-REPAIR F3.R3) ──
    // S3: the HEAD crossfade — the plates crossfade AT the midpoint (vertical fades from
    // 0.5, horizontal reaches full at 0.5), so the fused mass thins to a faint neck on the
    // shoulders; the overlap window is measure-zero.
    sab(
        {
            ...base,
            bridgeCssSrc: `
@layer components {
    .dock-morph-bridge-plate--vertical {
        width: var(--dock-bridge-v-w, 3.25rem);
        opacity: calc(1 - clamp(0, calc((var(--dock-morph-t, 0) - 0.5) / 0.5), 1));
        scale: calc(1 / var(--stretch, 1)) var(--stretch, 1);
    }
    .dock-morph-bridge-plate--horizontal {
        width: var(--dock-bridge-h-w, 18rem);
        opacity: clamp(0, calc((var(--dock-morph-t, 0) - 0.0) / 0.5), 1);
        scale: var(--stretch, 1) calc(1 / var(--stretch, 1));
    }
}`,
        },
        "S3",
        "S3 HEAD 0.5-centred crossfade (vertical fades from 0.5, horizontal full at 0.5 — no overlap, thin neck) reds",
    );
    // S3 (evasion): the plates OVERLAP correctly, but a plate animates its box SIZE off
    // the live scalar (`width: … var(--dock-morph-t)`) — the per-frame reflow the
    // compositor-only floor forbids. Must red on noSizeAnimatesScalar.
    sab(
        {
            ...base,
            bridgeCssSrc: `
@layer components {
    .dock-morph-bridge-plate--vertical {
        width: calc(var(--dock-bridge-v-w, 3.25rem) * var(--dock-morph-t, 0));
        opacity: calc(1 - clamp(0, calc((var(--dock-morph-t, 0) - 0.6) / 0.35), 1));
    }
    .dock-morph-bridge-plate--horizontal {
        width: var(--dock-bridge-h-w, 18rem);
        opacity: clamp(0, calc((var(--dock-morph-t, 0) - 0.05) / 0.35), 1);
    }
}`,
        },
        "S3",
        "S3 a plate animates its box width off --dock-morph-t (per-frame reflow, not compositor-only) reds",
    );

    // ── S4 — the settle-commit bite (BG.W-SHELL-MORPH-PAINT-REPAIR F3.R3 paint-repair) ──
    // S4: the HEAD form — AppShell commits `settledOrientation` at the spring SETTLE (a
    // `watch(() => morph.morphing.value, …)` handler assigning it under `!isMorphing`), so the
    // `<main>` column re-margin fires NAKED with the bridge opacity 0 (not hidden at the
    // occluded midpoint). Must red (boundWatch false AND settleCommit true).
    sab(
        {
            ...base,
            appShellSrc: `
<script setup>
const settledOrientation = ref("vertical");
watch(
    () => morph.morphing.value,
    (isMorphing) => {
        if (!isMorphing) settledOrientation.value = morph.boundOrientation.value;
    },
);
provide(SHELL_DOCK_ORIENTATION, settledOrientation);
</` + `script>`,
        },
        "S4",
        "S4 HEAD settle-commit (settledOrientation flipped at morphing→false, the naked re-margin at bridge opacity 0) reds",
    );

    // ── S5 — the hardcoded-vertical bite (BG.W-SHELL-MORPH-PAINT-REPAIR F3.R3 paint-repair) ──
    // S5: the HEAD form — SidebarDock hardcodes `orientation="vertical"` on its `<GlassDock>`,
    // so the settled "horizontal" dock stays a vertical RAIL (`.glass-dock.vertical`'s column
    // grid) that occludes the re-margined content. Must red (bound false AND hardcodedVertical).
    sab(
        {
            ...base,
            sidebarDockSrc: `
<template>
    <GlassDock ref="dockRef" orientation="vertical" always-expanded class="demo-sidebar-dock">
        <div role="tablist" aria-orientation="vertical"></div>
    </GlassDock>
</template>`,
        },
        "S5",
        "S5 HEAD hardcoded orientation=\"vertical\" (GlassDock keeps the column grid → the vertical rail that occluded the content) reds",
    );
    // S5 (fence): a BOUND `:orientation` with `aria-orientation="vertical"` (facet rail) +
    // the `--vertical` class present must NOT flag — the lookbehind fences the aria attr.
    sabNot(
        {
            ...base,
            sidebarDockSrc: `
<template>
    <GlassDock :orientation="dockOrientation" always-expanded>
        <nav role="tablist" aria-orientation="vertical"></nav>
        <div class="demo-facet-rail--vertical" aria-orientation="vertical"></div>
    </GlassDock>
</template>`,
        },
        "S5",
        "S5 the aria-orientation=\"vertical\" / --vertical class fence (a bound :orientation with the a11y attr present must NOT flag)",
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
        `  G3 settle at scalar arrival     : ${violations.every((v) => !v.startsWith("G3"))} (arrivalGuard=${facts.glyphRigidArrivalSettle?.hasArrivalGuard}, firesSettle=${facts.glyphRigidArrivalSettle?.firesSettle})`,
    );
    console.log(
        `  G4 punch inherits to content    : ${violations.every((v) => !v.startsWith("G4"))} (inherits=${facts.glyphRigidPunchInherits?.inheritsValue}, present=${facts.glyphRigidPunchInherits?.present})`,
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
        `  P4 nested pane swap HOLDS box   : ${violations.every((v) => !v.startsWith("P4"))} (cssGuarded=${facts.paneSwapBoxHold?.expandArmGuarded && facts.paneSwapBoxHold?.collapseArmGuarded && facts.paneSwapBoxHold?.noUnguardedDerivation}, isOuter=${facts.paneSwapBoxHold?.hasIsOuter}, swapFlag=${facts.paneSwapBoxHold?.swapPassesFlag}, paneSwapAttr=${facts.paneSwapBoxHold?.setsPaneSwap && facts.paneSwapBoxHold?.clearsPaneSwap})`,
    );
    console.log(
        `  S1 shell morph no measure-storm : ${violations.every((v) => !v.startsWith("S1"))} (writeScalarNoDomRead=${facts.shellMorphMeasureStorm?.writeScalarNoDomRead}, pureCap=${facts.shellMorphMeasureStorm?.perFramePureCap}, preWarmed=${facts.shellMorphMeasureStorm?.preWarmCached})`,
    );
    console.log(
        `  S2 bridge teardrop plateau      : ${violations.every((v) => !v.startsWith("S2"))} (plateau=${facts.shellMorphBridgePlateau?.hasPlateau}, width=${facts.shellMorphBridgePlateau?.plateauWidth})`,
    );
    console.log(
        `  S3 bridge plates overlap dense  : ${violations.every((v) => !v.startsWith("S3"))} (holdUntil=${facts.shellMorphBridgeOverlap?.holdUntil}, reachesFull=${facts.shellMorphBridgeOverlap?.reachesFull}, overlap=${facts.shellMorphBridgeOverlap?.overlap}, compositorOnly=${facts.shellMorphBridgeOverlap?.noSizeAnimatesScalar})`,
    );
    console.log(
        `  S4 settle at 0.5-crossing       : ${violations.every((v) => !v.startsWith("S4"))} (boundWatch=${facts.shellSettleDrive?.boundWatch}, writesSettled=${facts.shellSettleDrive?.writesSettled}, noSettleCommit=${facts.shellSettleDrive?.noSettleCommit})`,
    );
    console.log(
        `  S5 dock orientation bound       : ${violations.every((v) => !v.startsWith("S5"))} (bound=${facts.shellDockOrientationBound?.orientationBound}, noHardcodedVertical=${facts.shellDockOrientationBound?.noHardcodedVertical})`,
    );
    console.log(
        `  self-test (bite proof)          : OK — ${selfTestCount} synthetic sabotages handled (D1 + D2 + D3×3 + D3-fence×2 + D4×2 + D4-fence + D5×2 + G1×6 + G4 + G2 + G3 + P1×2 + P2×2 + P3×3 + P4×4 + S1×2 + S2×2 + S3×2 + S4 + S5 + S5-fence)`,
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
