#!/usr/bin/env node
// BB.W-LIQUID-REVEAL — proof:liquid-reveal, the iOS-27 bloom-from-source open gate
// (born-RED at HEAD, driven GREEN by the wave).
//
// THE HEADLINE: every top-layer surface MATERIALIZES as glass coalescing — it
// SCALES + FADES + DECONGESTS (blur(4px)→0) from its trigger/anchor on a snappy/
// bouncy spring, never flies in on a flat fixed-bezier zoom-95. glass-ui owned every
// INGREDIENT of the bloom (the dormant kf flipShared + springTimingFunction on the
// /motion surface, the .glass-top-layer @starting-style spring grammar, the per-spring
// clock) and composed NONE into the headline primitive. This wave is the activating
// consumer: useLiquidReveal (the source-rect bloom leaf) + the .glass-reveal
// LIQUID-ENTER recipe (the spring-clocked top-layer default replacing popover-animate).
//
// This is the device-free SOURCE half (R1-R5). The PAINTED truth — the bloom
// frame-series (t=0/.25/.5/.75/1, the source-origin scale + coupled fade + blur-
// settle), the ≥8-surface rendered enter over the live aurora, the PRM single-paint
// — is the binding π captured in docs/tranches/BB/audit/visual/W-LIQUID-REVEAL-DELTA.md
// + the proof:ba-gestalt overlay-band verdict (the AY W-LIVE1 LOCAL-ONLY split,
// backstopped on CI by proof:live-verified-ledger). A source-green/visually-broken
// close (the overlays still bezier-zoom, OR the bloom flies in from center, OR the
// PRM open still scales) is the exact AZ failure class the gestalt bar kills; both
// halves must hold for a clean close.
//
// FIVE FALSIFIABLE WITNESSES (each born-RED at HEAD pre-wave):
//
//   R1 — useLiquidReveal COMPOSES THE KF SUBSTRATE + IS COMPOSITOR-ONLY.
//        src/composables/motion/useLiquidReveal.ts imports flipShared +
//        springTimingFunction from @mkbabb/keyframes.js (NOT a hand-rolled rAF loop /
//        a second spring solver) and writes ONLY transform/opacity/backdrop-filter on
//        the reveal path. RED at HEAD: the file does not exist; flipShared/
//        springTimingFunction have ZERO glass-ui consumer (suite.ts re-export
//        unconsumed). BITE (anti-evasion): the source asserts BOTH arms — (a) the kf
//        import is present AND (b) NO width/height/top/left/right/bottom/margin/
//        padding/font-size write on the reveal path (the compositor-only floor — a
//        layout-property write reds even with the kf import present, the A'-3 lesson
//        W-MOTION-CANON enforces).
//   R2 — THE LIQUID-ENTER RECIPE RIDES THE PER-SPRING CLOCK + THE COUPLED BLUR-SETTLE.
//        The .glass-reveal recipe (src/styles/glass/reveal.css) AND the .glass-top-
//        layer enter (animations.css) ride --spring-<name> + the matching --spring-
//        <name>-duration (NOT a fixed cubic-bezier + --duration-normal) on the SPATIAL
//        (scale/translate) channel AND carry the coupled backdrop-filter blur(4px)→0
//        decongest on the SAME spring clock. RED at HEAD: popover-animate is the
//        fixed-bezier zoom-95; .glass-top-layer springs scale but has NO blur-settle.
//        BITE: the recipe's transform leg names a --spring-* token AND a --spring-*-
//        duration token AND a backdrop-filter blur interp — a spring-the-scale-but-
//        keep-a-generic-duration OR an omit-the-blur-settle reds.
//   R3 — THE RECIPE IS THE TOP-LAYER DEFAULT (the bezier zoom-95 retires).
//        Each enrolled overlay SFC composes .glass-reveal and NONE composes the bezier
//        popover-animate zoom-95 enter on its default path. RED at HEAD: every enrolled
//        surface composes popover-animate. BITE: the POSITIVE (each routes its default
//        enter through .glass-reveal) AND the NEGATIVE (no enrolled surface retains
//        popover-animate — a wave that adds .glass-reveal but leaves popover-animate
//        aliased on the same element reds, BB inv-7 no-legacy) AND popover-animate's
//        bezier zoom-95 @utility body is RETIRED (the clean break).
//   R4 — EXIT IS --ease-out, NO OVERSHOOT.
//        The recipe's data-[state=closed]/exit leg reads --ease-out (a bezier, no
//        overshoot), NEVER a --spring-* token (a closing surface must not overshoot
//        past gone — §6/W-MOTION-CANON P2). BITE: the exit leg carries NO --spring-*
//        token (only --ease-out/--ease-standard); a bouncy exit reds.
//   R5 — PRM SNAPS TO THE ENDPOINT WITH ZERO IN-BETWEEN FRAMES.
//        Under prefers-reduced-motion: reduce, BOTH the CSS recipe (a @media
//        (prefers-reduced-motion: reduce) carve zeroing scale/translate/blur, keeping
//        the opacity fade) AND the JS leaf (useLiquidReveal snaps the surface to its
//        settled rect + opacity 1 synchronously) drop the transform/blur. BITE: the
//        PRM carve zeroes scale/translate/backdrop-filter (the vestibular triggers)
//        AND retains an opacity leg (the fade survives — a PRM block that kills the
//        fade too is wrong; a PRM block that leaves the scale animating reds).
//
// The dock-expand bloom beat (DOCK-EXPAND-CONSUMER) is a CSS surface arm reading the
// --dock-expand-t scalar W-DOCK-MORPH-FAMILY owns (the backdrop-filter blur-settle on
// the collapsed→expanded morph) — asserted in R3's dock clause.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const R = (p) => resolve(ROOT, p);
const read = (p) => (existsSync(R(p)) ? readFileSync(R(p), "utf8") : null);

// ── House comment-strip (the pure-detector floor; the URL-safe `//` strip the
//    clause-7 idiom uses). Strips /* */ blocks + line comments, leaving the
//    declarations the witnesses scan against a false positive in prose. ──
function stripComments(src) {
    if (src == null) return "";
    return src
        .replace(/<!--[\s\S]*?-->/g, "") // HTML/Vue-template comments
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// The reflow set the compositor-only floor forbids on the reveal path (the SHARED
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

const LEAF = "src/composables/motion/useLiquidReveal.ts";
// BG.W-MOTION-SPINE — the ONE FLIP/morph runner the leaf now COMPOSES. The kf substrate
// (ElementMorph + springTimingFunction + the rAF loop) carved OUT of the leaf into this
// runner; the R1 substrate-compose FOLLOWS the carve into it (the BB.W-CARVE4 reader
// precedent — "the reader gates that read a carved symbol by name FOLLOW the carve").
const SPINE = "src/composables/motion/useElementMorph.ts";
const RECIPE = "src/styles/glass/reveal.css";
// BI.W-REGISTER-TABLE — the named-register token home. The .glass-reveal recipe now
// TOKENIZES onto register knobs (--reveal-spring / --reveal-clock / --reveal-exit-curve),
// resolved HERE onto the parity-fixed --spring-* / --spring-*-duration / --ease-out
// tokens. R2/R4 FOLLOW the register indirection (the same "reader gates FOLLOW the carve"
// precedent R1 uses for the useElementMorph spine): the recipe rides the per-spring clock
// THROUGH the register, and the register default (enter-overlay) resolves to --spring-snappy
// + --spring-snappy-duration (the W-GLASS-CAL thread persists via the register).
const REGISTERS = "src/styles/tokens/motion-registers.css";
const ANIM = "src/styles/animations.css";
const ANIMATE_UTIL = "src/styles/utilities/animate.css";
const DOCK_MORPH = "src/styles/dock/morph.css";

// The enrolled overlay SFCs that composed popover-animate at HEAD (the de-facto
// consumer set — re-greped, not the spec's round figure). Each re-points off
// popover-animate's bezier zoom-95 onto .glass-reveal.
const ENROLLED = [
    "src/components/ui/dialog/DialogContent.vue",
    "src/components/ui/popover/PopoverContent.vue",
    "src/components/ui/tooltip/TooltipContent.vue",
    "src/components/ui/hover-card/HoverCardContent.vue",
    "src/components/ui/dropdown-menu/DropdownMenuContent.vue",
    "src/components/ui/dropdown-menu/DropdownMenuSubContent.vue",
    // BI.W-MENU-TRIGGER — context-menu folded onto dropdown-menu (`trigger="context"`);
    // the dropdown Content/SubContent above compose .glass-reveal for both trigger modes.
    "src/components/ui/combobox/ComboboxList.vue",
    "src/components/ui/select/SelectContent.vue",
];

const fails = [];
const fail = (clause, msg) => fails.push(`[${clause}] ${msg}`);

// ── R1 — useLiquidReveal composes the kf substrate + is compositor-only ──
{
    const raw = read(LEAF);
    if (raw == null) {
        fail("R1", `${LEAF} does not exist (the source-rect bloom leaf has no home)`);
    } else {
        const src = stripComments(raw);
        const spineSrc = stripComments(read(SPINE) ?? "");
        // BG.W-MOTION-SPINE — the leaf COMPOSES the ONE runner (`useElementMorph`), which
        // owns the kf substrate. The substrate-compose FOLLOWS the carve into the spine (the
        // BB.W-CARVE4 reader precedent). The direct-in-leaf form (pre-spine) still satisfies;
        // the delegated form satisfies via (leaf composes useElementMorph) AND (spine holds
        // ElementMorph + springTimingFunction) — a severed compose (no `useElementMorph`
        // reference) does NOT get the spine's substrate.
        const composesSpine = /\buseElementMorph\b/.test(src);
        const morphSrc = composesSpine ? `${src}\n${spineSrc}` : src;
        const importsFlip = /\bflipShared\b/.test(morphSrc) || /\bElementMorph\b/.test(morphSrc);
        const importsSpring = /\bspringTimingFunction\b/.test(morphSrc);
        // The import must reach the kf surface — directly (keyframes.js / the /motion suite
        // re-export) OR via the spine the leaf composes (the runner imports it from kf).
        const fromKf =
            /from\s+["']@mkbabb\/keyframes\.js["']/.test(morphSrc) ||
            /from\s+["']\.\.\/suite["']/.test(morphSrc) ||
            /from\s+["']\.\/suite["']/.test(morphSrc) ||
            (composesSpine && /from\s+["']\.\/useElementMorph["']/.test(src));
        if (!importsFlip)
            fail("R1", "useLiquidReveal does not reference the kf shared-element FLIP (flipShared / ElementMorph) — nor compose the useElementMorph runner that does");
        if (!importsSpring)
            fail("R1", "useLiquidReveal does not reference springTimingFunction (the spring curve is not the kf {fn,css} pair) — nor compose the useElementMorph runner that does");
        if (!fromKf)
            fail("R1", "useLiquidReveal does not import the kf substrate from @mkbabb/keyframes.js, the /motion suite, or the useElementMorph runner");
        // The compositor-only floor — NO layout-property write on the reveal path. The real
        // writer is the runner now, so the scan FOLLOWS the carve: the leaf AND (when it
        // delegates) the spine must both be free of reflow-property writes. A hand-rolled rAF
        // spring integrator is the anti-evasion bite (the reuse is the wired substrate).
        for (const scanSrc of composesSpine ? [src, spineSrc] : [src]) {
            if (/requestAnimationFrame\s*\(\s*function|requestAnimationFrame\s*\(\s*\(/.test(scanSrc) &&
                /\bvelocity\b|\bstiffness\b|\bdamping\b\s*\*/.test(scanSrc))
                fail("R1", "the reveal path hand-rolls a rAF spring integrator (the kf substrate is the single physics source — no re-fork)");
            for (const p of REFLOW_PROPS) {
                const setProp = new RegExp(`setProperty\\(\\s*["']${p}["']`);
                const styleKey = new RegExp(`\\b(?:style\\.)?${p.replace(/-/g, "")}\\s*=`);
                if (setProp.test(scanSrc))
                    fail("R1", `the reveal path writes the layout property "${p}" via setProperty (compositor-only floor: transform/opacity/filter ONLY)`);
                if (/\.style\./.test(scanSrc) && styleKey.test(scanSrc))
                    fail("R1", `the reveal path writes a layout property "${p}" on .style (compositor-only floor)`);
            }
        }
    }
}

// ── R2 — the LIQUID-ENTER recipe rides the per-spring clock + the coupled blur-settle ──
{
    // BI.W-REGISTER-TABLE — the register default (enter-overlay) resolves the reveal's +
    // the folded top-layer's spring/clock knobs onto --spring-snappy + its duration.
    // Hoisted to the R2 block level so BOTH the recipe check AND the top-layer check use it.
    const registers = stripComments(read(REGISTERS) ?? "");
    const registerDefinesSpring =
        /--enter-overlay-spring:\s*var\(--spring-(snappy|bouncy|dock|smooth|gentle|transient)\)/.test(registers);
    const registerDefinesClock =
        /--enter-overlay-clock:\s*var\(--spring-(snappy|bouncy|dock|smooth|gentle|transient)-duration\)/.test(registers);
    const recipeRaw = read(RECIPE);
    if (recipeRaw == null) {
        fail("R2", `${RECIPE} does not exist (the .glass-reveal LIQUID-ENTER recipe has no home)`);
    } else {
        const recipe = stripComments(recipeRaw);
        const hasGlassReveal = /\.glass-reveal\b/.test(recipe);
        if (!hasGlassReveal)
            fail("R2", ".glass-reveal selector absent from reveal.css");
        // The SPATIAL channel rides a --spring-<name> token — DIRECTLY or through the
        // --reveal-spring register knob (resolved by motion-registers.css onto --spring-*).
        const ridesSpring =
            /var\(--spring-(snappy|bouncy|dock|smooth|gentle)\)/.test(recipe) ||
            (/var\(--reveal-spring\)/.test(recipe) && registerDefinesSpring);
        if (!ridesSpring)
            fail("R2", ".glass-reveal does not ride a --spring-<name> token on the enter (directly or via the --reveal-spring register knob → motion-registers.css --enter-overlay-spring)");
        // The per-spring duration clock (NOT a generic --duration-*) — directly or via
        // the --reveal-clock register knob (resolved onto --spring-<name>-duration).
        const ridesClock =
            /var\(--spring-(snappy|bouncy|dock|smooth|gentle)-duration\)/.test(recipe) ||
            (/var\(--reveal-clock\)/.test(recipe) && registerDefinesClock);
        if (!ridesClock)
            fail("R2", ".glass-reveal does not ride a --spring-<name>-duration clock (directly or via the --reveal-clock register knob → --enter-overlay-clock; the generic --duration-* re-times the spring — W-GLASS-CAL Unit 3)");
        // The coupled blur-settle decongest — a filter/backdrop-filter blur interp.
        // (The recipe rides `filter` on the surface's own pixels, NOT backdrop-filter,
        // so the resting glass-floating plate blur is not clobbered — see reveal.css.)
        if (!/\bfilter\b/.test(recipe) || !/blur\(/.test(recipe))
            fail("R2", ".glass-reveal carries no filter/backdrop-filter blur-settle decongest (the iOS light-bending arrival)");
    }
    // The .glass-top-layer native enter gains the SAME coupled blur-settle.
    const anim = stripComments(read(ANIM) ?? "");
    // Isolate the @supports (overlay: auto) top-layer block region.
    const topLayerIdx = anim.indexOf(".glass-top-layer[popover]");
    if (topLayerIdx < 0) {
        fail("R2", ".glass-top-layer top-layer enter block not found in animations.css");
    } else {
        const region = anim.slice(topLayerIdx, topLayerIdx + 2400);
        // BI.W-REGISTER-TABLE — the FOURTH register RETIRED: the native top-layer enter is
        // FOLDED onto the enter-overlay register (--enter-overlay-spring / --enter-overlay-
        // clock), which motion-registers.css resolves onto --spring-snappy + its duration
        // (one enter grammar — the native dialog/popover enter matches the reka Dialog
        // enter). The W-GLASS-CAL per-spring thread persists THROUGH the register; the
        // legacy direct --spring-bouncy pair still satisfies (back-compat for the gate).
        const topRidesSpring =
            (/var\(--spring-bouncy\)/.test(region) && /var\(--spring-bouncy-duration\)/.test(region)) ||
            (/var\(--enter-overlay-spring\)/.test(region) &&
                /var\(--enter-overlay-clock\)/.test(region) &&
                registerDefinesSpring &&
                registerDefinesClock);
        if (!topRidesSpring)
            fail("R2", ".glass-top-layer enter lost its per-spring clock (neither the legacy --spring-bouncy pair NOR the folded enter-overlay register that resolves onto --spring-snappy + its duration — the W-GLASS-CAL thread must persist)");
        // The blur-settle on the top-layer is `filter` (the surface's own pixels) so
        // the resting glass-tier backdrop-filter plate blur survives.
        if (!/\bfilter:\s*blur\(/.test(region))
            fail("R2", ".glass-top-layer enter carries no filter blur-settle (the light-bending decongest — REVEAL-TOPLAYER-NO-BLUR)");
    }
}

// ── R3 — the recipe is the top-layer DEFAULT (the bezier zoom-95 retires) ──
{
    // The NEGATIVE: popover-animate's bezier zoom-95 @utility body is RETIRED.
    const utilRaw = read(ANIMATE_UTIL);
    if (utilRaw != null) {
        const util = stripComments(utilRaw);
        // popover-animate must NOT survive as a zoom-95-bearing @utility (the clean
        // break — its body either deletes or re-points; a residual zoom-in-95 +
        // @utility popover-animate is the legacy alias R3 forbids).
        if (/@utility\s+popover-animate\b/.test(util) && /zoom-in-95/.test(util))
            fail("R3", "popover-animate @utility still carries the bezier zoom-in-95 (the clean break did not land — BB inv-7 no-legacy)");
    }
    // The POSITIVE + NEGATIVE per enrolled surface.
    for (const f of ENROLLED) {
        const raw = read(f);
        if (raw == null) {
            fail("R3", `${f} missing (enrolled overlay surface not found)`);
            continue;
        }
        const src = stripComments(raw);
        if (!/\bglass-reveal\b/.test(src))
            fail("R3", `${f} does not compose .glass-reveal (its default enter is not the spring-clocked liquid open)`);
        // The NEGATIVE — no enrolled surface retains popover-animate on its default
        // class string (a residual alias reds).
        if (/\bpopover-animate\b/.test(src))
            fail("R3", `${f} still composes popover-animate (the bezier zoom-95 alias survives — clean break required)`);
    }
    // The dock-expand bloom beat reads the --dock-expand-t scalar (a backdrop-filter
    // blur-settle keyed off the directional expanded-ness — DOCK-EXPAND-CONSUMER).
    const morphRaw = read(DOCK_MORPH);
    if (morphRaw == null) {
        fail("R3", `${DOCK_MORPH} missing (the dock-expand bloom beat has no home)`);
    } else {
        const morph = stripComments(morphRaw);
        // The reveal beat is a filter/backdrop-filter blur interp gated on
        // --dock-expand-t (the dock pill blooms open as it expands; collapsed = more
        // blur). The dock decongests its OWN pixels (`filter`) so the resting
        // glass-tier plate blur survives.
        const hasRevealBeat =
            /\bfilter:\s*blur\(/.test(morph) &&
            /--dock-expand-t/.test(morph) &&
            /--dock-reveal/.test(morph);
        if (!hasRevealBeat)
            fail("R3", "dock/morph.css carries no --dock-reveal filter blur-settle beat keyed off --dock-expand-t (the dock-expand bloom — DOCK-EXPAND-CONSUMER)");
    }
}

// ── R4 — exit is --ease-out, NO overshoot ──
{
    const recipe = stripComments(read(RECIPE) ?? "");
    // Isolate the data-[state=closed] / exit region. The recipe must carry a closed
    // arm and that arm must read --ease-out (a bezier), never a --spring-* token.
    const closedIdx = recipe.search(/data-\[state=closed\]|\[data-state="?closed"?\]/);
    if (closedIdx < 0) {
        fail("R4", ".glass-reveal has no data-[state=closed] exit leg (the exit recipe is missing)");
    } else {
        const registers = stripComments(read(REGISTERS) ?? "");
        // BI.W-REGISTER-TABLE — the exit-curve is tokenized onto --reveal-exit-curve,
        // resolved by motion-registers.css onto --ease-out (the named exit register). R4
        // FOLLOWS the indirection (or the legacy direct --ease-out/--ease-standard form
        // still satisfies). The exit clock is likewise --reveal-exit-clock → --exit-*-duration.
        const registerExitIsBezier = /--exit-curve:\s*var\(--ease-(out|standard)\)/.test(registers);
        const closedRegion = recipe.slice(closedIdx, closedIdx + 900);
        const exitReadsBezier =
            /var\(--ease-out\)|var\(--ease-standard\)/.test(closedRegion) ||
            (/var\(--reveal-exit-curve\)/.test(closedRegion) && registerExitIsBezier);
        if (!exitReadsBezier)
            fail("R4", ".glass-reveal exit leg does not read --ease-out/--ease-standard (directly or via --reveal-exit-curve → motion-registers.css --exit-curve; the no-overshoot bezier — §6/W-MOTION-CANON P2)");
        // The exit must NOT ride a spring — directly OR through a register knob that
        // resolves to a spring (--reveal-exit-curve resolves to --ease-out, never a spring).
        if (/var\(--spring-(snappy|bouncy|dock|smooth|gentle|transient)\)/.test(closedRegion))
            fail("R4", ".glass-reveal exit leg reads a --spring-* token (a closing surface must NOT overshoot past gone)");
    }
}

// ── R5 — PRM snaps to the endpoint with zero in-between frames ──
{
    // The CSS recipe carve.
    const recipe = stripComments(read(RECIPE) ?? "");
    const prmIdx = recipe.indexOf("prefers-reduced-motion: reduce");
    if (prmIdx < 0) {
        fail("R5", ".glass-reveal has no @media (prefers-reduced-motion: reduce) carve (the vestibular floor)");
    } else {
        const prmRegion = recipe.slice(prmIdx, prmIdx + 700);
        // The carve zeroes the spatial channels (scale/translate) + the blur.
        const zeroesScale = /scale:\s*(none|1)\b/.test(prmRegion) || /scale:\s*1\s*1/.test(prmRegion);
        const zeroesTranslate = /translate:\s*(none|0)\b/.test(prmRegion);
        const zeroesBlur = /(?:filter|backdrop-filter):\s*(none|blur\(0)/.test(prmRegion) || /blur\(0/.test(prmRegion);
        if (!zeroesScale)
            fail("R5", ".glass-reveal PRM carve does not zero `scale` (the vestibular trigger must be off under reduce)");
        if (!zeroesTranslate)
            fail("R5", ".glass-reveal PRM carve does not zero `translate` (the vestibular trigger must be off under reduce)");
        if (!zeroesBlur)
            fail("R5", ".glass-reveal PRM carve does not zero the filter blur-settle (the blur-settle must snap under reduce)");
        // The fade must SURVIVE — the carve must NOT kill opacity (a PRM block that
        // forces opacity off is wrong; the surface fades, never flies).
        if (/opacity:\s*0\b/.test(prmRegion))
            fail("R5", ".glass-reveal PRM carve forces opacity:0 (the fade must survive — the surface fades, never disappears)");
    }
    // The JS leaf snap.
    const leaf = stripComments(read(LEAF) ?? "");
    if (leaf) {
        // The leaf threads a reduced-motion gate (respectReducedMotion / a
        // matchMedia('(prefers-reduced-motion: reduce)') read) and snaps to the
        // settled endpoint (opacity 1) with zero transform frames.
        const hasPRMGate =
            /respectReducedMotion/.test(leaf) ||
            /prefers-reduced-motion:\s*reduce/.test(leaf);
        if (!hasPRMGate)
            fail("R5", "useLiquidReveal does not thread a reduced-motion gate (the JS snap-to-endpoint path is absent)");
    }
}

// ── The inline self-test bite (proven every run — anti-gameability) ──
// A synthetic recipe that springs the scale but keeps a generic --duration-normal
// MUST flag against R2's per-spring-clock detector; a synthetic exit that reads a
// --spring-* token MUST flag against R4's no-overshoot detector. Run the detectors
// against in-memory synthetic strings and assert they catch.
{
    const synthGenericClock = `.glass-reveal[data-state="open"] { transition: scale var(--duration-normal) var(--spring-snappy); }`;
    const s = stripComments(synthGenericClock);
    const ridesPerSpringClock = /var\(--spring-(snappy|bouncy|dock|smooth|gentle)-duration\)/.test(s);
    if (ridesPerSpringClock)
        fail("SELFTEST", "the per-spring-clock detector did NOT flag a synthetic generic-duration recipe (R2 bite broken)");

    const synthBouncyExit = `.glass-reveal[data-state="closed"] { transition-timing-function: var(--spring-bouncy); }`;
    const e = stripComments(synthBouncyExit);
    const exitHasSpring = /var\(--spring-(snappy|bouncy|dock|smooth|gentle)\)/.test(e);
    if (!exitHasSpring)
        fail("SELFTEST", "the no-overshoot-exit detector did NOT flag a synthetic bouncy exit (R4 bite broken)");
}

// ── Report ──
if (fails.length) {
    console.error("proof:liquid-reveal FAILED\n");
    for (const f of fails) console.error("  " + f);
    console.error(`\n${fails.length} clause(s) red.`);
    process.exit(1);
}
console.log("proof:liquid-reveal PASSED — R1-R5 green (useLiquidReveal composes the kf bloom + the .glass-reveal spring-clocked liquid-enter recipe is the top-layer default + popover-animate retired + exit no-overshoot + PRM snaps).");
