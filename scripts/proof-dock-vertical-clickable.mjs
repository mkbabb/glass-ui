#!/usr/bin/env node
// proof:dock-vertical-clickable — BC.W-DOCK-VERTICAL-FIX — the vertical dock works +
// is CLICKABLE (the one-line gating correction at the root of the BB unclickable defect).
//
// THE DEFECT (USER-DEFECTS §A, glass-dock-codebase.md §2.3). GlassDock's full pane
// read its VISIBILITY off `visualExpanded` (`alwaysExpanded || expanded`) but its
// `inert` off the RAW `expanded` ref. For any state where `expanded` is false but
// `visualExpanded` is true — an always-expanded vertical dock, or a collapsible
// vertical dock mid-flip, or the `dock-f2-first-mount-flip` degenerate first-mount —
// the full pane was `is-active` (visible + painted) yet `inert` (every control
// non-interactive). The whole vertical dock read as a dead painted column.
//
// THE FIX (this wave, two-line): gate `inert` on `visualExpanded`, not `expanded`, on
// BOTH panes. The full pane is inert IFF NOT visualExpanded; the summary pane is inert
// IFF visualExpanded. Now ONE signal (`visualExpanded`) drives BOTH the `is-active`
// class (paint) AND the `inert` attribute (interactivity) — they can never drift.
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the SOURCE arm; the
// device-free arm runs on every runner ["local","ci","release"]). The LIVE morph /
// clickable PAINT is the orchestrator's (proof:dock-vertical-clickable live + the
// W-DOCK-VERTICAL-FIX-DELTA capture on /dock/layers + a collapsible vertical fixture).
//
//   V1 — inert reads visualExpanded (NOT raw expanded). The full pane's `inert`
//        binding references `visualExpanded`; the summary pane's inverse references
//        `visualExpanded` too. Born-RED: HEAD reads `!expanded`/`expanded`.
//        Self-test bite: a planted `:inert="!expanded"` reds.
//   V2 — one signal drives paint + interactivity. The full pane's `is-active` class
//        AND its `inert` attribute reference the SAME identifier (`visualExpanded`) —
//        they cannot drift. Self-test bite: a planted is-active(visualExpanded) +
//        inert(expanded) drift reds (the bug WAS this drift).
//   V3 — no second CSS interactivity gate disagrees. No `layers.css` rule sets
//        `pointer-events: none` keyed off a state OTHER than `.is-active`/`.is-leaving`
//        (the sanctioned set). Self-test bite: a planted pointer-events:none on a
//        `.glass-dock.vertical .dock-layer--full` rule reds.
//   V4 — the scale-floor dependency is declared (cross-gate no-regression, NOT a
//        re-author). BC.W-DOCK-ENGINE's `--dock-morph-scale: max(..., 0.0x)` floor is
//        present in layers.css so a vertical active pane is never zero-hit-area.
//        Self-test bite: a removed floor reds.
//   V5 — the dock root presentational + trigger-aria contract is intact (the AM.W0
//        gap-3 / AN.W4 floor — no silent a11y drop while fixing interactivity). The
//        GlassDock root carries NO `role` and NO `aria-expanded` (the expand-state
//        aria rides the trigger child, never the presentational root). Self-test bite:
//        a planted `aria-expanded`/`role` on the dock root reds.
//   V6 — born-RED via git-show: the pre-fix tree read `inert` off `expanded`.
//
// Run: node scripts/proof-dock-vertical-clickable.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-vertical-clickable";

const GLASS_DOCK = "src/components/custom/dock/GlassDock.vue";
const LAYERS_CSS = "src/styles/dock/layers.css";

// PINNED pre-fix tree — the commit that landed BC.W-DOCK-ENGINE and STILL carried the
// raw-`expanded` inert gating. Pinning keeps the born-RED proof EXECUTABLE forever
// against the true pre-fix tree (the moving-HEAD-anchor trap: once the fix merges, a
// `HEAD:` anchor inverts into a permanent false-RED).
const PRE_FIX_COMMIT = "452846c4";

// ── comment-strip (false-witness discipline) ───────────────────────────────────
const stripVueComments = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
const stripCssComments = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Pull the two morph-pane `inert` bindings out of the template. Returns the raw
// expression each `:inert=` is bound to (the full pane and the summary pane).
function extractInertBindings(src) {
    const full = /dock-layer--full[\s\S]{0,160}?:inert="([^"]+)"/.exec(src);
    const summary = /dock-layer--summary[\s\S]{0,160}?:inert="([^"]+)"/.exec(src);
    return {
        fullInert: full ? full[1].trim() : null,
        summaryInert: summary ? summary[1].trim() : null,
    };
}
// Pull the `is-active` class expression for the full pane.
function extractFullIsActive(src) {
    const m = /dock-layer--full['"][\s\S]{0,80}?'is-active':\s*([A-Za-z0-9_.]+)/.exec(src);
    return m ? m[1].trim() : null;
}

// ── V1 + V2 — inert reads visualExpanded; one signal drives paint + interactivity ──
export function detectGating(glassDockSrc) {
    const violations = [];
    const src = stripVueComments(glassDockSrc);
    const { fullInert, summaryInert } = extractInertBindings(src);
    const fullActive = extractFullIsActive(src);
    const facts = { fullInert, summaryInert, fullIsActive: fullActive };

    // V1 — the full pane's inert references visualExpanded (NOT the raw expanded).
    const fullReadsVisual =
        fullInert != null &&
        /visualExpanded/.test(fullInert) &&
        !/(^|[^a-zA-Z])expanded(?![a-zA-Z])/.test(fullInert.replace(/visualExpanded/g, ""));
    const summaryReadsVisual =
        summaryInert != null &&
        /visualExpanded/.test(summaryInert) &&
        !/(^|[^a-zA-Z])expanded(?![a-zA-Z])/.test(summaryInert.replace(/visualExpanded/g, ""));
    facts.fullReadsVisual = fullReadsVisual;
    facts.summaryReadsVisual = summaryReadsVisual;
    if (!fullReadsVisual)
        violations.push(
            `V1: the full pane's \`inert\` does not read \`visualExpanded\` (found \`${fullInert}\`) — it must be \`!visualExpanded || undefined\` so a VISIBLE pane is never inert (the dead-column bug)`,
        );
    if (!summaryReadsVisual)
        violations.push(
            `V1: the summary pane's inverse \`inert\` does not read \`visualExpanded\` (found \`${summaryInert}\`) — it must be \`visualExpanded || undefined\` (the single-source symmetry)`,
        );

    // V2 — the full pane's is-active class AND its inert both reference visualExpanded
    // (the SAME computed) — paint + interactivity read ONE source, cannot drift.
    const oneSignal =
        fullActive === "visualExpanded" &&
        fullInert != null &&
        /visualExpanded/.test(fullInert);
    facts.oneSignal = oneSignal;
    if (!oneSignal)
        violations.push(
            `V2: the full pane's \`is-active\` class (\`${fullActive}\`) and its \`inert\` attribute do not BOTH read \`visualExpanded\` — paint and interactivity must key off ONE signal so they can never disagree (the drift the bug WAS)`,
        );

    return { violations, facts };
}
// V1/V2 self-test bites.
function detectGatingSelfTest() {
    // The drift the bug WAS: is-active on visualExpanded, inert on raw expanded.
    const BAD = `
      <div :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
           :inert="!expanded || undefined"><slot /></div>
      <div :class="['dock-layer dock-layer--summary', { 'is-active': !visualExpanded }]"
           :inert="expanded || undefined"></div>`;
    const GOOD = `
      <div :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
           :inert="!visualExpanded || undefined"><slot /></div>
      <div :class="['dock-layer dock-layer--summary', { 'is-active': !visualExpanded }]"
           :inert="visualExpanded || undefined"></div>`;
    const badFlags = detectGating(BAD).violations.length > 0;
    const goodClean = detectGating(GOOD).violations.length === 0;
    return badFlags && goodClean;
}

// ── V3 — no second CSS interactivity gate disagrees ──
// The ONLY sanctioned `pointer-events: none` selectors gate on the layer state set
// {`:not(.is-active):not(.is-leaving)`, `.is-leaving`} — the visualExpanded-bound class
// vocabulary. A `pointer-events: none` keyed off any OTHER dock-layer state (e.g. a
// vertical-dock selector) is a second gate that can disagree with `inert`.
export function detectNoSecondGate(layersCssSrc) {
    const violations = [];
    const facts = { pointerNoneRules: [] };
    const src = stripCssComments(layersCssSrc);
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const selector = m[1].trim().replace(/\s+/g, " ");
        const body = m[2];
        if (!/pointer-events:\s*none/.test(body)) continue;
        // Only dock-layer rules concern us (the interactivity gate surface).
        if (!/\.dock-layer/.test(selector)) continue;
        facts.pointerNoneRules.push(selector.slice(0, 64));
        const sanctioned =
            /:not\(\.is-active\):not\(\.is-leaving\)/.test(selector) ||
            /\.is-leaving/.test(selector);
        if (!sanctioned)
            violations.push(
                `V3: a \`pointer-events: none\` on a dock-layer selector keyed off a state OTHER than \`.is-active\`/\`.is-leaving\` (\`${selector.slice(0, 64)}\`) — a SECOND interactivity gate that can disagree with the visualExpanded-bound \`inert\``,
            );
    }
    return { violations, facts };
}
// V3 self-test bite — a planted vertical-dock pointer-events:none reds.
function detectNoSecondGateSelfTest() {
    const PLANTED = `.glass-dock.vertical .dock-layer--full { pointer-events: none; }`;
    return detectNoSecondGate(PLANTED).violations.length > 0;
}

// ── V4 — the scale-floor dependency is declared (cross-gate no-regression) ──
export function detectScaleFloor(layersCssSrc) {
    const violations = [];
    const facts = {};
    const src = stripCssComments(layersCssSrc);
    // The BC.W-DOCK-ENGINE floor: `--dock-morph-scale: max( <ratio expr>, <floor> )`.
    const floor = /--dock-morph-scale:\s*max\([\s\S]*?,\s*(0?\.\d+)\s*\)/.exec(src);
    facts.scaleFloor = floor ? floor[1] : null;
    facts.floorPresent = floor != null;
    if (!facts.floorPresent)
        violations.push(
            "V4: the `--dock-morph-scale` floor (`max(..., 0.0x)`, BC.W-DOCK-ENGINE) is absent from layers.css — a vertical active pane could resolve scaleY(0) (zero hit area), so a correctly-gated pane would still be unclickable mid-morph",
        );
    return { violations, facts };
}
function detectScaleFloorSelfTest() {
    // A degenerate scale WITHOUT the max() floor reds.
    const NO_FLOOR = `--dock-morph-scale: calc(var(--dock-morph-ratio) + (1 - var(--dock-morph-ratio)) * var(--dock-morph-t, 0));`;
    return detectScaleFloor(NO_FLOOR).violations.length > 0;
}

// ── V5 — the dock root stays presentational (no aria-expanded/role on the root) ──
export function detectRootPresentational(glassDockSrc) {
    const violations = [];
    const facts = {};
    const src = stripVueComments(glassDockSrc);
    // Isolate the `.glass-dock` root element's OPENING tag (the dockEl div). It opens at
    // `ref="dockEl"` and closes at the first `>`. We scan that tag for aria-expanded/role.
    const openTag = /ref="dockEl"[\s\S]*?>/.exec(src);
    const tag = openTag ? openTag[0] : "";
    facts.rootTagFound = Boolean(openTag);
    const rootHasAriaExpanded = /aria-expanded/.test(tag);
    // `role=` (not `aria-role`); the class binding uses `:class` — exclude that.
    const rootHasRole = /\srole=|:role=/.test(tag);
    facts.rootAriaExpanded = rootHasAriaExpanded;
    facts.rootRole = rootHasRole;
    if (rootHasAriaExpanded)
        violations.push(
            "V5: the GlassDock `.glass-dock` root carries `aria-expanded` — the root is presentational (AM.W0.2 gap-3); the expand-state aria belongs on the TRIGGER child (axe `aria-allowed-attr` trips on aria-expanded on a non-interactive root)",
        );
    if (rootHasRole)
        violations.push(
            "V5: the GlassDock `.glass-dock` root carries a `role` — the root is presentational; the inert fix touches interactivity gating, never adds a role to the root",
        );
    return { violations, facts };
}
function detectRootPresentationalSelfTest() {
    const PLANTED = `<div ref="dockEl" class="glass-dock" aria-expanded="true" role="region">`;
    return detectRootPresentational(PLANTED).violations.length > 0;
}

// ── V6 — born-RED via git-show (the pre-fix tree read inert off `expanded`) ──
async function reconstructHeadState() {
    const { execFileSync } = await import("node:child_process");
    let preFix = "";
    try {
        preFix = execFileSync("git", ["show", `${PRE_FIX_COMMIT}:${GLASS_DOCK}`], {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        });
    } catch {
        return { reconstructed: false };
    }
    const stripped = stripVueComments(preFix);
    const { fullInert, summaryInert } = extractInertBindings(stripped);
    // Born-RED IFF the pre-fix full pane read the RAW `expanded` (not visualExpanded).
    const fullReadsRawExpanded =
        fullInert != null &&
        /expanded/.test(fullInert) &&
        !/visualExpanded/.test(fullInert);
    return {
        reconstructed: true,
        preFixFullInert: fullInert,
        preFixSummaryInert: summaryInert,
        bornRed: fullReadsRawExpanded,
    };
}
export function detectBornRed(headState) {
    const violations = [];
    const facts = { ...headState };
    if (!headState.reconstructed) {
        // Non-fatal on a runner with no git history of the pinned commit; the live
        // SOURCE arm (V1-V5) is the binding proof, this is the corroborating witness.
        facts.bornRed = null;
        return { violations, facts };
    }
    if (!headState.bornRed)
        violations.push(
            `V6: the pre-fix tree (${PRE_FIX_COMMIT}) did NOT read the full-pane \`inert\` off the raw \`expanded\` (found \`${headState.preFixFullInert}\`) — the gate is not born-RED against the true pre-fix tree (a stale-base trap)`,
        );
    return { violations, facts };
}

// ── compose ──
export async function detect() {
    const glassDockSrc = readRel(GLASS_DOCK);
    const layersCssSrc = readRel(LAYERS_CSS);

    const v1v2 = detectGating(glassDockSrc);
    const v3 = detectNoSecondGate(layersCssSrc);
    const v4 = detectScaleFloor(layersCssSrc);
    const v5 = detectRootPresentational(glassDockSrc);
    const headState = await reconstructHeadState();
    const v6 = detectBornRed(headState);

    const selfTests = {
        gating: detectGatingSelfTest(),
        noSecondGate: detectNoSecondGateSelfTest(),
        scaleFloor: detectScaleFloorSelfTest(),
        rootPresentational: detectRootPresentationalSelfTest(),
    };
    const selfTestViolations = [];
    for (const [k, ok] of Object.entries(selfTests))
        if (!ok)
            selfTestViolations.push(
                `${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`,
            );

    const violations = [
        ...v1v2.violations,
        ...v3.violations,
        ...v4.violations,
        ...v5.violations,
        ...v6.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: {
            v1v2: v1v2.facts,
            v3: v3.facts,
            v4: v4.facts,
            v5: v5.facts,
            v6: v6.facts,
            selfTests,
        },
    };
}

async function run() {
    const { violations, facts } = await detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_VERTICAL_CLICKABLE_ARTIFACT",
        "BC-dock-vertical-clickable",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-vertical-clickable",
        command: COMMAND,
        note: "BC.W-DOCK-VERTICAL-FIX device-free SOURCE arm (V1 inert reads visualExpanded not raw expanded · V2 ONE signal drives paint+interactivity · V3 no second CSS pointer-events gate disagrees · V4 the BC.W-DOCK-ENGINE scale floor present so a vertical active pane is never zero-hit-area · V5 the dock root stays presentational, no aria-expanded/role · V6 born-RED via git-show against the pre-fix tree). The LIVE clickable PAINT (every vertical icon takes a click at rest + a collapsed vertical taps open + its revealed control takes the next tap, desktop + coarse-touch + WebKit) is the orchestrator's W-DOCK-VERTICAL-FIX-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:dock-vertical-clickable — ${status.toUpperCase()}`);
    console.log(
        `  V1 full-inert=${facts.v1v2.fullInert} summary-inert=${facts.v1v2.summaryInert} reads-visual(full/summary)=${facts.v1v2.fullReadsVisual}/${facts.v1v2.summaryReadsVisual}`,
    );
    console.log(`  V2 one-signal(is-active+inert==visualExpanded)=${facts.v1v2.oneSignal}`);
    console.log(`  V3 dock-layer pointer-none rules=${facts.v3.pointerNoneRules.length} (all sanctioned)`);
    console.log(`  V4 scale-floor=${facts.v4.scaleFloor} present=${facts.v4.floorPresent}`);
    console.log(`  V5 root presentational: aria-expanded=${facts.v5.rootAriaExpanded} role=${facts.v5.rootRole}`);
    console.log(`  V6 born-RED=${facts.v6.bornRed} (pre-fix full-inert=${facts.v6.preFixFullInert ?? "n/a"})`);
    console.log(
        `  self-tests: ${Object.entries(facts.selfTests).map(([k, v]) => `${k}=${v ? "OK" : "BROKE"}`).join(" ")}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
