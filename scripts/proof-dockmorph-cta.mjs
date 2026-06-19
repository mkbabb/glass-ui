#!/usr/bin/env node
// BB.B2 W-DOCKMORPH-CTA — proof:dockmorph-cta, the external-CTA-MORPHS-INTO-dock
// receive seam gate (born-RED at HEAD, driven GREEN by the wave).
//
// THE ASK (cross-repo-inbound.md §5): a seam where an EXTERNAL CTA (a button/control
// OUTSIDE the dock) MORPHS INTO the dock — a continuous compositor-flat morph (the CTA
// flies/reshapes onto a dock control, the iOS bloom-from-source INVERSE), PRM-seats.
//
// THE CONFIRM-OR-BUILD verdict: BUILD (a thin composition). W-DOCK-MORPH-FAMILY's
// dock morph mechanism (dockMorphContext/dockMorphMeasure + the --dock-morph-t scalar)
// owns the dock's OWN collapse/expand morph; `useLiquidReveal` blooms a SURFACE from a
// trigger onto its OWN settled rect (the open). NEITHER expresses an EXTERNAL element
// morphing onto a FOREIGN dock-control target. The seam is the reveal's complement —
// the FORWARD play of the SAME kf ElementMorph substrate (CTA-rect → dock-control-
// rect), built as a thin CONSUMING leaf `useDockCtaReceive` BESIDE the dock morph
// mechanism (no dockMorphContext/DOCK_SPRING edit).
//
// This is the device-free SOURCE arm (R1-R5). The PAINTED truth — the CTA fly+reshape
// frame-series onto the dock control, the coupled fade+congest, the PRM single-paint —
// is the binding π that rides W-REFLECT3 + the proof:ba-gestalt dock verdict (the
// AY W-LIVE1 LOCAL-ONLY split). A source-green/visually-broken close is the AZ failure
// class the gestalt bar kills; both halves must hold for a clean close.
//
// FIVE FALSIFIABLE WITNESSES (each born-RED at HEAD pre-wave — the leaf does not exist):
//
//   R1 — THE RECEIVE LEAF COMPOSES THE KF SUBSTRATE + IS COMPOSITOR-ONLY.
//        src/composables/motion/useDockCtaReceive.ts imports ElementMorph +
//        springTimingFunction from @mkbabb/keyframes.js (NOT a hand-rolled rAF spring /
//        a second physics core) and writes ONLY transform/opacity/filter on the receive
//        path. BITE (anti-evasion): BOTH arms — (a) the kf import present AND (b) NO
//        width/height/top/left/right/bottom/margin/padding/font-size write on the
//        receive path (the compositor-only floor — a layout-property write reds even
//        with the kf import present, the A'-3 lesson W-MOTION-CANON enforces).
//   R2 — THE SEAM IS A CONSUMING LEAF BESIDE W-DOCK-MORPH-FAMILY (the byte-fence).
//        useDockCtaReceive does NOT import/edit dockMorphContext / dockMorphMeasure /
//        DOCK_SPRING (the dock's own morph mechanism is W-DOCK-MORPH-FAMILY's; this
//        seam morphs an EXTERNAL element ONTO a dock control, beside it). BITE: a
//        dockMorphContext/dockMorphMeasure/DOCK_SPRING import in the leaf reds.
//   R3 — THE SPRING IS THE SAME SAMPLED REGISTER (no second clock).
//        The leaf reads springPreset(name) from the shared SPRING_PRESETS table (the
//        SAME row the --spring-<name> CSS tokens + useLiquidReveal generate from), NOT
//        a hand (response, ζ) literal. BITE: the leaf references springPreset AND
//        carries NO inline { response: 0.NN, dampingFraction: 0.NN } object literal
//        (a hand-tuned spring reds — the W-GLASS-CAL fence).
//   R4 — PRM SEATS DETERMINISTICALLY (snap + hand-off, zero motion frames).
//        Under prefers-reduced-motion: reduce the leaf SNAPS the CTA to opacity 0
//        (the dock control is already in place) in ONE synchronous step, zero
//        transform/blur frames, then fires onReceived (the gesture completes). BITE:
//        the leaf checks prefersReducedMotion AND, in that branch, writes opacity but
//        NO morph.apply / requestAnimationFrame (a PRM branch that still animates the
//        transform reds) AND still calls the hand-off.
//   R5 — THE SEAM IS DEMONSTRATED + WIRED.
//        The demo (demo/stories/dock/cta-receive.vue) composes useDockCtaReceive (NO
//        demo-local re-implementation of the morph) with a real <DockIconButton> as the
//        receive target + an external <Button> CTA, and the leaf is exported on the
//        /motion barrel (src/composables/motion/index.ts). BITE: the demo imports the
//        leaf AND references no hand-rolled ElementMorph/rAF of its own; the barrel
//        re-exports it.
//
//   R6 — THE PENDING-STATE LANDING SEAT (BC.W-AX-DOCK-CTA-SEAT — the speedtest-AX
//        BC-W2 + BC-W3 fold). The CTA does not vanish onto a static control — the
//        control is a SEAT that was visibly RESERVED for it, revealed with a plain
//        FLIP. Four born-RED-at-HEAD witnesses:
//          R6a — the pending API: useDockCtaReceive returns setPending / clearPending
//                (the arm/clear seam) + a reactive `pending` ref (the consumer binds
//                off it). BITE: the return shape must carry all three.
//          R6b — the [data-cta-pending] seat partial (src/styles/dock/cta-seat.css)
//                carries the STATIC resting-geometry reserve (a `min-inline-size`/
//                `min-block-size` off --dock-control-size/--dock-layer-height — a
//                one-time reservation, NOT an animated dimension) AND the FLIP reveal
//                is a plain `transition: opacity` (NOT the morph-stagger). BITE: a
//                `transition` naming a min-*-size/width/height/inline-size reds (an
//                animated dimension CLS-storms — the proof:no-layout-animation mirror);
//                a `--dock-expand-t`/morph-stagger reference on the seat reveal reds (a
//                content swap must not ride the box-morph clock).
//          R6c — useDockCtaReceive is re-exported from the /dock subpath barrel
//                (src/components/custom/dock/index.ts) — the natural home beside
//                GlassDock/useDockState. BITE: the /dock barrel must name it.
//          R6d — the data-attr seam is compositor-only: setPending/clearPending write
//                `data-cta-pending` (a CSS state toggle), they do NOT animate a layout
//                property. BITE: the methods reference data-cta-pending AND write no
//                width/height/inline-size/etc on the pending path (the compositor-only
//                floor extends to the seat).
//        + the self-test bites: a setPending that animates `width` reds R6b; a
//          morph-stagger reveal reds R6b; a missing /dock re-export reds R6c.
//
// + the inline self-test bite (a synthetic leaf that hand-rolls the spring / writes a
//   layout property / imports DOCK_SPRING MUST flag the matching clause — proven every
//   run). The GL shader fence + ppmycota + the foreign-tree fence (the kf re-exports
//   are READ-ONLY references this seam ACTIVATES — recorded, never edited) hold.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function read(rel) {
    try {
        return readFileSync(join(ROOT, rel), "utf8");
    } catch {
        return null;
    }
}

// The house comment-strip detector (URL-safe `//` strip — the clause-7 idiom).
function stripComments(src) {
    if (src == null) return "";
    return src
        .replace(/<!--[\s\S]*?-->/g, "") // HTML/Vue-template comments
        .replace(/\/\*[\s\S]*?\*\//g, "") // block comments
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1"); // line comments (URL-safe)
}

// The reflow set the compositor-only floor forbids on the receive path (the SHARED
// W-MOTION-CANON reflow vocabulary).
const REFLOW_PROPS = [
    "width",
    "height",
    "inline-size",
    "block-size",
    "top",
    "left",
    "right",
    "bottom",
    "margin",
    "padding",
    "font-size",
];

const LEAF = "src/composables/motion/useDockCtaReceive.ts";
const BARREL = "src/composables/motion/index.ts";
const DEMO = "demo/stories/dock/cta-receive.vue";
// BC.W-AX-DOCK-CTA-SEAT (R6) — the landing-seat surfaces.
const SEAT = "src/styles/dock/cta-seat.css";
const DOCK_BARREL = "src/components/custom/dock/index.ts";

// ── The reusable clause checker (runs over a provided source so the self-test can
//    feed it a synthetic body) ───────────────────────────────────────────────────
function checkLeaf(rawLeaf, { fail }) {
    if (rawLeaf == null) {
        fail("R1", `${LEAF} does not exist (the CTA-receive seam has no home)`);
        return;
    }
    const src = stripComments(rawLeaf);

    // R1 — the kf substrate + compositor-only.
    const importsMorph = /\bElementMorph\b/.test(src);
    const importsSpring = /\bspringTimingFunction\b/.test(src);
    const fromKf = /from\s+["']@mkbabb\/keyframes\.js["']/.test(src);
    if (!importsMorph)
        fail("R1", "useDockCtaReceive does not reference the kf ElementMorph (the rect-delta morph core)");
    if (!importsSpring)
        fail("R1", "useDockCtaReceive does not reference springTimingFunction (the spring curve is not the kf {fn,css} pair)");
    if (!fromKf)
        fail("R1", "useDockCtaReceive does not import the kf substrate from @mkbabb/keyframes.js");
    // The anti-evasion: NO hand-rolled rAF spring integrator (the reuse is the wired
    // substrate, not a re-fork — mirrors proof:liquid-reveal / proof:drag-morph D1).
    if (
        /requestAnimationFrame\s*\(\s*function|requestAnimationFrame\s*\(\s*\(/.test(src) &&
        /\bstiffness\b|\bvelocity\s*[+\-*]|\bdamping\b\s*\*/.test(src)
    )
        fail("R1", "useDockCtaReceive hand-rolls a rAF spring integrator (the kf substrate is the single physics source — no re-fork)");
    // The compositor-only floor — NO layout-property write on the receive path.
    for (const p of REFLOW_PROPS) {
        const setProp = new RegExp(`setProperty\\(\\s*["']${p}["']`);
        const styleKey = new RegExp(`\\.style\\.${p.replace(/-/g, "")}\\s*=`);
        if (setProp.test(src))
            fail("R1", `useDockCtaReceive writes the layout property "${p}" via setProperty (compositor-only floor: transform/opacity/filter ONLY)`);
        if (styleKey.test(src))
            fail("R1", `useDockCtaReceive writes the layout property "${p}" on .style (compositor-only floor)`);
    }

    // R2 — the byte-fence: no dock morph orchestrator / DOCK_SPRING edit.
    if (/dockMorphContext/.test(src))
        fail("R2", "useDockCtaReceive imports dockMorphContext (the dock's own morph mechanism is W-DOCK-MORPH-FAMILY's — this is a CONSUMING seam beside it, not an orchestrator edit)");
    if (/dockMorphMeasure/.test(src))
        fail("R2", "useDockCtaReceive imports dockMorphMeasure (the byte-fence — no orchestrator-internal reach)");
    if (/\bDOCK_SPRING\b/.test(src))
        fail("R2", "useDockCtaReceive imports DOCK_SPRING (the dock spring register is byte-fenced — the receive seam samples its OWN register from SPRING_PRESETS)");

    // R3 — the same sampled register (no second clock).
    if (!/\bspringPreset\b/.test(src))
        fail("R3", "useDockCtaReceive does not read springPreset (the spring must be sampled from the shared SPRING_PRESETS table, not a hand (response, ζ))");
    // A hand-tuned inline spring literal reds (the W-GLASS-CAL fence). Match an object
    // literal carrying BOTH response: <num> AND dampingFraction: <num> as numeric
    // literals (the sampled value is destructured FROM springPreset, never authored).
    if (/response\s*:\s*0?\.\d+[\s\S]{0,80}?dampingFraction\s*:\s*0?\.\d+/.test(src))
        fail("R3", "useDockCtaReceive carries an inline hand-tuned { response: 0.NN, dampingFraction: 0.NN } spring literal (the W-GLASS-CAL clock fence — sample from SPRING_PRESETS)");

    // R4 — PRM seats deterministically.
    const hasPrmCheck = /prefersReducedMotion\s*\(\s*\)/.test(src);
    if (!hasPrmCheck)
        fail("R4", "useDockCtaReceive does not honor prefers-reduced-motion (the PRM seat is missing)");
    // Locate the PRM branch and assert it snaps (writes opacity) + hands off WITHOUT a
    // morph.apply / requestAnimationFrame inside the branch (zero transform frames).
    const prmIdx = src.search(/if\s*\([^)]*prefersReducedMotion\s*\(\s*\)[^)]*\)\s*{/);
    if (prmIdx >= 0) {
        // Extract the braced PRM block body (balanced-brace scan from the opening `{`).
        const open = src.indexOf("{", prmIdx);
        let depth = 0;
        let end = open;
        for (let i = open; i < src.length; i++) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") {
                depth--;
                if (depth === 0) {
                    end = i;
                    break;
                }
            }
        }
        const prmBody = src.slice(open, end + 1);
        if (/\bmorph\.apply\b|\brequestAnimationFrame\b/.test(prmBody))
            fail("R4", "the PRM branch still drives the transform morph (morph.apply / requestAnimationFrame) — PRM must SEAT deterministically with zero motion frames");
        if (!/opacity/.test(prmBody))
            fail("R4", "the PRM branch does not snap opacity (the deterministic seat — snap the CTA to gone)");
        if (!/handOff\s*\(\s*\)|onReceived/.test(prmBody))
            fail("R4", "the PRM branch does not hand off (onReceived) — the gesture must still complete under reduce");
    } else if (hasPrmCheck) {
        fail("R4", "the prefersReducedMotion check is not the receive-path guard branch (cannot verify the deterministic seat)");
    }

    // R6a — the pending-state API on the return (BC.W-AX-DOCK-CTA-SEAT). The seat is
    // armed/cleared by the consumer through setPending/clearPending, and the reactive
    // `pending` ref drives the consumer's :class/v-if.
    if (!/\bsetPending\b/.test(src))
        fail("R6", "useDockCtaReceive does not expose setPending() (the landing seat cannot be armed — the resting geometry is never reserved, the box jumps when the CTA lands)");
    if (!/\bclearPending\b/.test(src))
        fail("R6", "useDockCtaReceive does not expose clearPending() (the seat cannot reveal its real content — the FLIP reveal is unreachable)");
    if (!/\bpending\b/.test(src))
        fail("R6", "useDockCtaReceive does not expose a reactive `pending` ref (the consumer cannot bind the seat state)");

    // R6d — the data-attr seam is compositor-only. setPending/clearPending toggle the
    // `data-cta-pending` CSS state; they MUST NOT animate a layout property (the
    // compositor-only floor extends to the seat — the seat paint is the partial's, the
    // methods only flip a data attribute + set a one-time static reserve).
    const writesDataAttr =
        /["']data-cta-pending["']/.test(src) || /\bdataset\.ctaPending\b/.test(src);
    if (!writesDataAttr)
        fail("R6", "setPending/clearPending do not write the data-cta-pending attribute (the [data-cta-pending] seat seam — the methods must toggle the CSS state the partial paints)");
    // The reserve write is allowed ONLY as a one-time STATIC min-*-size reservation
    // (setProperty/style write at setPending), never an animated dimension — but the
    // pending path must not write a NON-min layout property (top/left/margin/etc) nor
    // mutate `transition` to animate a size. The compositor-only floor: the reserve is
    // a static min-* set; the reveal is the partial's `transition: opacity`.
    if (/\.style\.(?:transition|animation)\s*=|setProperty\(\s*["'](?:transition|animation)["']/.test(src) &&
        /min-inline-size|min-block-size|\bwidth\b|\bheight\b|inline-size|block-size/.test(src))
        fail("R6", "useDockCtaReceive writes a transition/animation that animates a dimension on the pending path (the seat reserve is a STATIC min-*-size reservation, the reveal is the partial's transition:opacity — never an animated dimension)");
}

// R6b — the [data-cta-pending] seat partial: the STATIC resting-geometry reserve + the
// plain transition:opacity FLIP reveal. NO animated dimension; NO morph-stagger clock.
function checkSeat(rawSeat, { fail }) {
    if (rawSeat == null) {
        fail("R6", `${SEAT} does not exist (the [data-cta-pending] landing-seat partial has no home — there is no reserved seat for the CTA to land into)`);
        return;
    }
    const css = stripComments(rawSeat);
    if (!/\[data-cta-pending\]/.test(css))
        fail("R6", "the cta-seat partial does not target [data-cta-pending] (the ghost/reserve state has no selector)");
    // The STATIC resting-geometry reserve — a min-inline-size/min-block-size keyed off
    // --dock-control-size/--dock-layer-height (the no-box-jump). At least one min-*-size
    // reserve must be present (the seat is sized for its arrival from frame 0).
    if (!/min-inline-size\s*:/.test(css) && !/min-block-size\s*:/.test(css))
        fail("R6", "the cta-seat partial declares no static min-inline-size/min-block-size reserve (the resting geometry is not un-gated — the dock box jumps when the CTA lands)");
    if (
        !/--dock-control-size/.test(css) &&
        !/--dock-layer-height/.test(css)
    )
        fail("R6", "the seat reserve is not keyed off --dock-control-size/--dock-layer-height (the reserve must be the control's resting footprint, not a magic literal)");
    // The FLIP reveal must be a PLAIN transition: opacity. A transition naming a
    // dimension reds (an animated min-*/width/height CLS-storms — the
    // proof:no-layout-animation mirror).
    if (!/transition\s*:\s*opacity/.test(css))
        fail("R6", "the seat reveal is not a plain `transition: opacity` (the FLIP reveal is a content fade — a non-opacity transition reds; the box is already sized, only the content reveals)");
    const SEAT_REFLOW = [
        "width",
        "height",
        "inline-size",
        "block-size",
        "min-inline-size",
        "min-block-size",
        "min-width",
        "min-height",
        "padding",
        "margin",
        "top",
        "left",
        "right",
        "bottom",
    ];
    // Extract transition/transition-property declarations and assert none animates a
    // dimension (the seat reveal is opacity-only; the reserve is static).
    const transitionLegs = css.match(/transition(?:-property)?\s*:[^;}]+/g) ?? [];
    for (const leg of transitionLegs) {
        for (const p of SEAT_REFLOW) {
            // word-boundary match on the property name inside the transition value
            if (new RegExp(`\\b${p}\\b`).test(leg))
                fail("R6", `the cta-seat partial animates the layout property "${p}" in a transition (\`${leg.trim()}\`) — the reserve is STATIC, only opacity transitions (the proof:no-layout-animation mirror; an animated dimension CLS-storms)`);
        }
    }
    // The reveal must NOT ride the morph-stagger clock — a --dock-expand-t/morph-t
    // reference on the seat reveal reds (a content swap is not a box morph).
    if (/--dock-expand-t|--dock-morph-t/.test(css))
        fail("R6", "the cta-seat reveal references the dock morph-stagger clock (--dock-expand-t/--dock-morph-t) — the seat is a CONTENT swap, NOT a box morph; it must NOT ride the morph clock (a janky stagger-restart on the reveal)");
}

// R6c — the /dock subpath re-export (the natural home beside GlassDock/useDockState).
function checkDockBarrel(rawDockBarrel, { fail }) {
    if (rawDockBarrel == null) {
        fail("R6", `${DOCK_BARREL} does not exist (the /dock subpath barrel is absent — useDockCtaReceive cannot be re-exported)`);
        return;
    }
    const barrel = stripComments(rawDockBarrel);
    if (!/useDockCtaReceive/.test(barrel))
        fail("R6", "the /dock subpath barrel (components/custom/dock/index.ts) does not re-export useDockCtaReceive (a dock consumer cannot reach the CTA-receive seat from @mkbabb/glass-ui/dock beside GlassDock — the natural-home discoverability gap)");
}

function checkBarrel(rawBarrel, { fail }) {
    const barrel = stripComments(rawBarrel ?? "");
    if (!/useDockCtaReceive/.test(barrel))
        fail("R5", "the /motion barrel (composables/motion/index.ts) does not re-export useDockCtaReceive (the keyframes-bearing leaf must ship on /motion, never the root)");
}

function checkDemo(rawDemo, { fail }) {
    if (rawDemo == null) {
        fail("R5", `${DEMO} does not exist (the CTA-receive seam is not demonstrated)`);
        return;
    }
    const demo = stripComments(rawDemo);
    if (!/useDockCtaReceive/.test(demo))
        fail("R5", "the demo does not compose useDockCtaReceive (a demo-local morph re-implementation is forbidden — compose the shipped leaf)");
    if (!/DockIconButton/.test(demo))
        fail("R5", "the demo does not host a <DockIconButton> receive target (the dock control is the morph destination)");
    // The anti-fork: the demo must NOT hand-roll its own ElementMorph / rAF spring.
    if (/\bnew ElementMorph\b/.test(demo) || /from\s+["']@mkbabb\/keyframes\.js["']/.test(demo))
        fail("R5", "the demo hand-rolls the kf morph (it must compose the shipped useDockCtaReceive leaf, NOT re-fork the substrate)");
}

// ── The real run ─────────────────────────────────────────────────────────────────
const fails = [];
const ctx = { fail: (clause, msg) => fails.push(`[${clause}] ${msg}`) };

checkLeaf(read(LEAF), ctx);
checkBarrel(read(BARREL), ctx);
checkDemo(read(DEMO), ctx);
// BC.W-AX-DOCK-CTA-SEAT (R6) — the landing-seat arm.
checkSeat(read(SEAT), ctx);
checkDockBarrel(read(DOCK_BARREL), ctx);

// ── The self-test bite — synthetic violators MUST each flag the matching clause ───
{
    const selfFails = [];
    const selfCtx = { fail: (clause, msg) => selfFails.push({ clause, msg }) };

    // A1 — a leaf that hand-rolls the spring + writes a layout property + imports the
    //      dock orchestrator MUST flag R1 (compositor) + R2 (fence).
    const synthLeaf = `
        function prefersReducedMotion() { return false; }
        import { dockMorphContext } from "../../components/custom/dock/composables/dockMorphContext";
        export function useDockCtaReceive(cta, options) {
            let raf = 0;
            function receive() {
                const el = cta.value;
                el.style.width = "10px";
                el.style.setProperty("padding", "4px");
                raf = requestAnimationFrame(function step(ts) {
                    const velocity = velocity + 1; // hand-rolled spring
                });
            }
            return { receive, reset() {} };
        }
    `;
    checkLeaf(synthLeaf, selfCtx);
    const flaggedR1 = selfFails.some((f) => f.clause === "R1");
    const flaggedR2 = selfFails.some((f) => f.clause === "R2");
    if (!flaggedR1)
        fails.push("[SELF-TEST] the synthetic layout-property/hand-rolled-spring leaf did NOT flag R1 (the compositor-only / no-re-fork detector is broken)");
    if (!flaggedR2)
        fails.push("[SELF-TEST] the synthetic dockMorphContext-importing leaf did NOT flag R2 (the byte-fence detector is broken)");

    // A2 — a leaf whose PRM branch still animates MUST flag R4.
    const selfFails2 = [];
    const selfCtx2 = { fail: (clause, msg) => selfFails2.push({ clause, msg }) };
    const synthPrmLeaf = `
        import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";
        import { springPreset } from "./springPresets";
        function prefersReducedMotion() { return false; }
        export function useDockCtaReceive(cta, options) {
            const { response, dampingFraction } = springPreset("snappy");
            let morph = null;
            function handOff() { options.onReceived && options.onReceived(); }
            function receive() {
                if (prefersReducedMotion()) {
                    morph.apply(cta.value, 1);
                    requestAnimationFrame(() => {});
                }
            }
            return { receive, reset() {} };
        }
    `;
    checkLeaf(synthPrmLeaf, selfCtx2);
    const flaggedR4 = selfFails2.some((f) => f.clause === "R4");
    if (!flaggedR4)
        fails.push("[SELF-TEST] the synthetic still-animating PRM branch did NOT flag R4 (the deterministic-seat detector is broken)");

    // A3 — a demo that hand-rolls the morph MUST flag R5.
    const selfFails3 = [];
    const selfCtx3 = { fail: (clause, msg) => selfFails3.push({ clause, msg }) };
    checkDemo(
        `import { ElementMorph } from "@mkbabb/keyframes.js"; const m = new ElementMorph(a, b); <DockIconButton />`,
        selfCtx3,
    );
    const flaggedR5 = selfFails3.some((f) => f.clause === "R5");
    if (!flaggedR5)
        fails.push("[SELF-TEST] the synthetic demo-local morph re-implementation did NOT flag R5 (the anti-fork detector is broken)");

    // A4 (R6b) — a seat partial that ANIMATES its dimension reserve (a transition on
    // min-inline-size) MUST flag R6 (the proof:no-layout-animation mirror — the reserve
    // is STATIC, only opacity transitions).
    const selfFails4 = [];
    const selfCtx4 = { fail: (clause, msg) => selfFails4.push({ clause, msg }) };
    checkSeat(
        `[data-cta-pending] {
            min-inline-size: var(--dock-control-size);
            transition: opacity 0.2s ease-out, min-inline-size 0.3s ease-out;
        }`,
        selfCtx4,
    );
    if (!selfFails4.some((f) => f.clause === "R6"))
        fails.push("[SELF-TEST] the synthetic animated-dimension seat reserve did NOT flag R6 (the static-reserve / no-layout-animation mirror detector is broken)");

    // A5 (R6b) — a seat reveal that rides the morph-stagger clock (--dock-expand-t)
    // MUST flag R6 (a content swap is NOT a box morph).
    const selfFails5 = [];
    const selfCtx5 = { fail: (clause, msg) => selfFails5.push({ clause, msg }) };
    checkSeat(
        `[data-cta-pending] {
            min-block-size: var(--dock-layer-height);
            transition: opacity calc(var(--dock-expand-t) * 1s) ease-out;
        }`,
        selfCtx5,
    );
    if (!selfFails5.some((f) => f.clause === "R6"))
        fails.push("[SELF-TEST] the synthetic morph-stagger seat reveal did NOT flag R6 (the content-swap-not-box-morph detector is broken)");

    // A6 (R6c) — a /dock barrel that omits useDockCtaReceive MUST flag R6 (the natural-
    // home re-export gap).
    const selfFails6 = [];
    const selfCtx6 = { fail: (clause, msg) => selfFails6.push({ clause, msg }) };
    checkDockBarrel(`export { default as GlassDock } from "./GlassDock.vue";`, selfCtx6);
    if (!selfFails6.some((f) => f.clause === "R6"))
        fails.push("[SELF-TEST] the synthetic /dock barrel missing the re-export did NOT flag R6 (the natural-home re-export detector is broken)");
}

// ── Verdict ───────────────────────────────────────────────────────────────────────
if (fails.length) {
    console.error("proof:dockmorph-cta — FAIL");
    for (const f of fails) console.error("  " + f);
    process.exit(1);
}
console.log(
    "proof:dockmorph-cta — PASS (R1 kf-substrate+compositor-only · R2 byte-fence-beside-dock-morph · R3 sampled-register · R4 PRM-seats · R5 demonstrated+wired · R6 pending-seat[api+partial+/dock-re-export+data-attr-compositor] · self-test bites fired)",
);
