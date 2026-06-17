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
}

// ── Verdict ───────────────────────────────────────────────────────────────────────
if (fails.length) {
    console.error("proof:dockmorph-cta — FAIL");
    for (const f of fails) console.error("  " + f);
    process.exit(1);
}
console.log(
    "proof:dockmorph-cta — PASS (R1 kf-substrate+compositor-only · R2 byte-fence-beside-dock-morph · R3 sampled-register · R4 PRM-seats · R5 demonstrated+wired · self-test bites fired)",
);
