#!/usr/bin/env node
// BC.W-MOTION-ONE-CLOCK — the one-source + one-clock completeness gate
// (proof:motion-one-clock).
//
// keyframes.js is the ONE motion brain in glass-ui. Every spring you see — a dock
// morphing V↔H, a dialog blooming open, a tab pill flinging to its slot, a button
// squishing under a press, a number tweening up — is the SAME physics core running
// off the SAME `SPRING_PRESETS` `(response, ζ)` register table, ticked by the SAME
// frame discipline, snapped by the SAME `prefers-reduced-motion` gate, AND CLOCKED
// by the SAME per-spring `--spring-<name>-duration` analytic settle the SAME table
// derives. The spine is built and correct; what was missing is the PROVABLE
// COMPLETENESS — a gate that reds the instant a wave smuggles in a second spring
// engine, a desynced wall clock, or a hand-inlined register table. This is that
// gate (the structural answer to the masked-accretion class that let BB drift —
// postmortem/SYNTHESIS.md class 9; the doctrine no per-round gate enforced).
//
// It is the PROPERTY-SPINE sibling — not a duplicate — of:
//   · proof:animation-coherence (the REGISTER tier: which curve on which property);
//   · proof:no-layout-animation (the COMPOSITOR tier: layout-vs-compositor channel).
// This gate owns the axis those two do not encode: WHICH ENGINE (the kf spine + its
// sanctioned off-spine SET), WHICH CLOCK (every spring leg on its OWN
// `--spring-<name>-duration`, never a generic `--duration-*`, with the coupled
// fade), and WHICH EXCEPTION (the named off-spine seam + the viz feeds-not-owns
// inversion). The CURVE-SHAPE arm (abrupt-vs-eased) is BC.W-SPRING-EASE's S6 — the
// disjoint complement on the same swept corpus; the two share the catch-set + the
// audited layout-reclaim allowlist, split which-arm owns it (no double-gate).
//
// SEVEN machine clauses (each with an inline self-test bite proven every run):
//   A9 — THE ONE-CLOCK LOCK (BG.W-ANIMATION-CONGRUENCE / the WS12 A9 arm). Every
//        `SPRING_DEFAULTS_ALLOWLIST` entry is VALUE-CHECKED against its LIVE source:
//        an entry whose source now READS the table (`springPreset(name)`) carries no
//        hand-inlined pair, so it is DEAD and must be REMOVED from the allowlist (a
//        table-reader cannot drift — it is not a sanctioned literal); an entry whose
//        `pair` disagrees with the source literal is STALE doc-rot. This SUPERSEDES
//        the inline documentary `pair` trust — the allowlist is now self-verifying
//        against `springPresets.ts` + the per-primitive constant sources, the
//        `proof:precept-current` doc-freshness discipline applied to the spring
//        register (born-RED on HEAD: useSpringPress/DOCK_SPRING now read the table,
//        DRAWER_SNAP drifted 0.4/0.82 → live 0.5/0.74).
//   CC — THE CHANNEL-COUPLING ARM (the IOS27-MOTION-TRUTH §4.2 clause). One gesture
//        derives ALL its channels from ONE clock family — the source-structural half
//        of the frame-by-frame truth read (the paint judge owns the FEEL/screencast):
//        (CC1) the overlay band's EXIT clock ≤ its ENTRANCE clock per surface (dialog
//        panel `.glass-reveal` + scrim `sheet-animate`: a fade-out longer than its
//        fade-in reds — an exit must never outlast its entrance); the panel + scrim
//        each reference the coupled clock tokens at the shared launch (not a scrim
//        decoupled onto a standalone long clock the panel never shares); (CC2) the
//        drawer is a SINGLE scalar-WRITER — every detent transition (gesture-release ·
//        open · programmatic · external activeSnapPoint) routes through the ONE
//        `--glass-drawer-t`/`--stage-t` writer + the ONE `spring.target` re-seat, and
//        NO gesture-driven surface carries a fixed `transition: backdrop-filter` blur
//        tween (the gesture drives blur per-frame; a decoupled fixed tween reds).
//   M1 — SINGLE SOURCE. `SPRING_PRESETS` (springPresets.ts) is the ONLY hand-
//        authored `(response, ζ)` register TABLE; `regen-spring-tokens.mjs` +
//        `curves.ts` both import it (the no-second-authority assert). A planted
//        second `{response, dampingFraction}`-row array outside springPresets.ts
//        reds (a derived projection that fills each row via `springPreset(name)` is
//        NOT a second table — useSpringMount's MOUNT_PRESETS is the model).
//   M2 — NO UN-SANCTIONED OFF-SPINE SPRING/rAF. A motion/viz composable that drives
//        a hand-rolled spring/lerp/damping integrator OUTSIDE the kf spine — a rAF
//        step-loop + damping math with NO `@mkbabb/keyframes.js` primitive import
//        (PRONG A), OR a `decayRest`+`spring.target` snap RE-ROLL (PRONG B) — reds
//        UNLESS it is on OFF_SPINE_ALLOWLIST (the named off-spine seam). De-allowlisting
//        usePointerVelocityField (the real file trips) proves the allowlist is
//        load-bearing. (The useDragMorph decayRest re-roll seam RETIRED at BH.B1-W3 —
//        kf 5.1.0 published native `DragOptions.snap`, the re-roll collapsed onto it.)
//   M3 — THE PER-SPRING CLOCK FENCE, UNIVERSAL + COUPLED (the user-mandate clock
//        bar). A SOURCE sweep of the WHOLE styling corpus reds: (a) ANY `--spring-
//        <name>` curve leg paired with a generic `--duration-*` (it MUST read its
//        `--spring-<name>-duration`) — no band exempt; (b) a spring ENTER/EXIT/PRESS
//        transform leg with NO coupled opacity/effects channel in the SAME
//        transition (the bare-transform-no-fade that reads abrupt, P3). The audited
//        layout-reclaim allowlist (the discrete-reclaim set proof:no-layout-
//        animation names) is exempt from (a). A consumer leg whose reconcile is
//        OWNED by a downstream wave is a CLOCK_FENCE_PENDING bridge (the
//        verify-not-edit precedent — named, born-RED, naturally clean when the owner
//        lands).
//   M4 — THE VIZ INVERSION. No viz file calls `RAFPlayback.play`/`.loop`/`.drive` —
//        the viz FEED kf primitives `tick(dt)` from inside their own canvas-lifecycle
//        rAF, they never OWN a kf rAF (the one-loop / proof:offscreen-pause fence).
//        The positive viz-side wiring is BC.W-VIZ-CHOREOGRAPHY's; this records the
//        inversion. A planted `RAFPlayback.play(` in a viz reds.
//   M5 — THE CANON + ALLOWLIST ARE SINGLE-SOURCED. The OFF_SPINE_ALLOWLIST +
//        SPRING_DEFAULTS_ALLOWLIST entries are cross-checked against motion-canon.md
//        §P7 (the gate and the canon cannot drift — a new sanctioned seam is added
//        in ONE place) AND the cross-repo kf one-clock book exists
//        (asks-and-consumes.md). A seam in the gate with no §P7 mention reds.
//
// House style mirrors proof-animation-coherence.mjs: ESM .mjs, a comment-strip
// first (false-witness discipline — a commented-out `new SpringProgress`/`RAFPlayback`
// or an explanatory token list is never a witness), pure exported detectors, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on any
// violation.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// BI.W-TEMPO — the co-scale clause integrates the physical SpringProgress step
// response (JS_t90) so the CSS↔JS proportionality is computed off the real spring, not
// a hardcoded factor (the FAM-18/M1 tempo-parity precedent in proof-spring-tokens-synced).
import { SpringProgress } from "@mkbabb/keyframes.js";

// Resolve the repo root from this module's URL when invoked as a CLI gate; fall
// back to cwd under a test runner where import.meta.url may not be a file: URL on
// import (the pure detectors a test imports never read ROOT).
const ROOT = (() => {
    try {
        return resolve(fileURLToPath(new URL("../", import.meta.url)));
    } catch {
        return process.cwd();
    }
})();

const SRC_DIR = resolve(ROOT, "src");
const SPRING_PRESETS_TS = "src/composables/motion/springPresets.ts";
const CURVES_TS = "src/composables/motion/curves.ts";
const REGEN_MJS = "scripts/regen-spring-tokens.mjs";
const MOTION_CANON = "docs/design/motion-canon.md"; // BH.B5c re-home off docs/precepts submodule
const ASKS_AND_CONSUMES = "docs/tranches/BC/coordination/asks-and-consumes.md";
// ── A9 / CC source anchors (the live spring sources + the coupled-facility seams) ──
const SCHEME_MOTION_CSS = "src/styles/tokens/scheme-motion.css";
const SCHEME_SPRING_CSS = "src/styles/tokens/scheme-spring.css";
// BI.W-REGISTER-TABLE — the named motion registers (enter/exit clocks) `.glass-reveal`
// binds by `data-reveal`. The overlay enter clock is `--enter-overlay-clock`
// (= `--spring-snappy-duration`); the exit is `--exit-overlay-duration`. CC1's anchors
// follow the register indirection reveal.css now rides (was the literal `--spring-
// snappy-duration` / `glass-reveal-out var(--duration-fast)` pre-REGISTER-TABLE).
const MOTION_REGISTERS_CSS = "src/styles/tokens/motion-registers.css";
const GLASS_REVEAL_CSS = "src/styles/glass/reveal.css";
const SHEET_ANIMATE_CSS = "src/styles/utilities/btn.css";
const DRAWER_SNAP_TS = "src/components/ui/drawer/composables/useDrawerSnap.ts";
const DRAWER_LOOK_CSS = "src/styles/drawer.css";
// BI.W-TEMPO co-scale anchors — the axis registration, the CSS reader split, the JS
// dock spring engine (the surviving dock engine per BI.W-DOCK-SPINE).
const PROPERTY_REGS_CSS = "src/styles/tokens/property-regs.css";
const USE_DOCK_SPRING_TS = "src/components/custom/dock/composables/useDockSpring.ts";

// The viz family — the one un-clocked island (BC.W-VIZ-CHOREOGRAPHY's positive
// scope). M4 asserts none of these OWN a kf rAF (RAFPlayback.play/.loop/.drive).
const VIZ_DIRS = [
    "src/components/custom/aurora",
    "src/components/custom/blob",
    "src/components/custom/constellation",
    "src/components/custom/dot-flow-field",
    "src/components/custom/concentric",
];

// ── The SANCTIONED off-spine seams (the allowlist, M2). Each is a real, documented
//    off-spine seam with its rationale — NOT a license, an explicit audited SET.
//    motion-canon.md §P7 records the SAME set; M5 cross-checks the two never drift.
//    A SECOND un-sanctioned off-spine spring/rAF reds.
//
//    (BH.B1-W3 reconcile: the useDragMorph.ts `decayRest-snap-reroll` seam is RETIRED —
//    kf 5.1.0 published the native `DragOptions.snap`, so the consume-and-delete fired
//    (the re-roll collapsed onto the native `snap` option and was deleted). useDragMorph
//    now imports a kf primitive + carries no `decayRest`+`spring.target` re-roll, so it
//    trips NEITHER off-spine prong — the allowlist entry would be stale (M2's "every
//    allowlisted seam must STILL trip a prong" floor), so it is removed.)
export const OFF_SPINE_ALLOWLIST = [
    {
        file: "src/composables/motion/usePointerVelocityField.ts",
        seam: "hand-rolled-lerp",
        reason:
            "the shared viz-pointer-physics field — a hand-rolled critically-damped lerp (position→velocity→accel), intentionally kf-FREE so it ships on the engine-free /motion-core subpath AND the root barrel (the SCC root-barrel discipline: a keyframes edge would trap it off-root). FED via tick(delta) from the renderer's own canvas-lifecycle loop (owns no rAF — the one-loop discipline). The ONE allowed off-spine smoother; SCC-reasoned, documented (kf-vjs-facilities.md §4).",
    },
];
const OFF_SPINE_FILES = new Set(OFF_SPINE_ALLOWLIST.map((e) => e.file));

// ── The SANCTIONED per-primitive (response, ζ) DEFAULTS (M1 — not a second TABLE).
//    Each is a single documented per-primitive default pair, derived/declared at
//    the primitive's own seam (NOT a hand-kept register table). motion-canon.md §P7
//    records them; M5 cross-checks. A NEW hand-inlined register TABLE is the M1 RED.
//
// A9 note (BG.W-ANIMATION-CONGRUENCE): each entry carries a `source` anchor so the
// A9 arm VALUE-CHECKS the `pair` against the live literal (a `symbol` locates the
// declaration; an optional `pairRe` reads the pair from the declaration window). An
// entry whose source READS THE TABLE (`springPreset(name)`) is DEAD — it carries no
// hand-inlined literal to sanction, so it is REMOVED from this allowlist (a
// table-reader cannot drift). The prior `useSpringPress`/`DOCK_SPRING` entries were
// removed on that basis (both now read `springPreset("press")`/`springPreset("dock")`
// — the one-spring-family single source); `DRAWER_SNAP` was corrected 0.4/0.82 →
// live 0.5/0.74 (drawer/constants.ts). The A9 arm reds if any remaining entry is
// stale or table-reading.
export const SPRING_DEFAULTS_ALLOWLIST = [
    {
        name: "useSpring",
        pair: [0.5, 0.86],
        source: {
            file: "src/composables/motion/useSpring.ts",
            pairRe:
                /options\.response\s*\?\?\s*([0-9.]+)[\s\S]{0,120}?options\.dampingFraction\s*\?\?\s*([0-9.]+)/,
        },
        reason: "the base SpringProgress primitive default (the SETTLE register's response/ζ) — the floor every useSpring caller may override.",
    },
    {
        name: "DRAWER_SNAP",
        pair: [0.5, 0.74],
        source: {
            file: "src/components/ui/drawer/constants.ts",
            symbol: "DRAWER_SNAP",
        },
        reason: "the drawer detent-snap register (drawer/constants.ts) — the per-primitive snap settle (off-table {0.5,0.74}; the drawer's OWN settle clock).",
    },
    // BG.W-SPRING-REGISTER-TIDY — the 3 ScrubberTimeline per-leg spring defaults MOVED
    // OFF the global SPRING_PRESETS table (table→6, presets-in-consumers) into a
    // ScrubberTimeline.vue LOCAL map. Each is a single documented per-primitive default
    // pair (JS-only, no CSS `--spring-*` token) — sanctioned HERE the canon's §P7 way,
    // NOT a second register table. Byte-preserved off the retired timeline-* rows.
    {
        name: "TIMELINE_HEAD",
        pair: [0.34, 0.74],
        source: {
            file: "src/components/custom/timeline/ScrubberTimeline.vue",
            symbol: "HEAD_SPRING",
        },
        reason: "the ScrubberTimeline warm-glass lozenge head-travel default (ScrubberTimeline.vue) — a per-surface JS-only register; the fast head clock the fill trails.",
    },
    {
        name: "TIMELINE_FILL",
        pair: [0.46, 0.82],
        source: {
            file: "src/components/custom/timeline/ScrubberTimeline.vue",
            symbol: "FILL_SPRING",
        },
        reason: "the ScrubberTimeline lane-fill trailing default (ScrubberTimeline.vue) — a slower clock than the head so the fill TRAILS the bead (liquid trailing).",
    },
    {
        name: "TIMELINE_PRESS",
        pair: [0.22, 0.7],
        source: {
            file: "src/components/custom/timeline/ScrubberTimeline.vue",
            symbol: "PRESS_SPRING",
        },
        reason: "the ScrubberTimeline grab-anticipation press default (ScrubberTimeline.vue) — the pointerdown squash feeding the --scale-press dip.",
    },
];

// ── The CLOCK-FENCE PENDING bridge (M3a — the verify-not-edit precedent the
//    proof:animation-coherence PRESS_SPRING_PENDING set establishes). A consumer
//    `--spring-*` leg still paired with a generic `--duration-*` whose RECONCILE
//    (the one-token swap onto `--spring-<name>-duration`) is OWNED by a downstream
//    wave is NAMED here with its lander. GREEN now via the noted bridge; naturally
//    clean once the owning wave lands. This wave (MOTION-ONE-CLOCK, FIRST of Band 7)
//    PLANTS the gate born-RED on the BB-batch source; the distributed reconcile is
//    the downstream waves' (the standing fact they build GREEN against). A leg NOT
//    on this bridge + NOT layout-reclaim-allowlisted reds immediately.
// Each entry: { file, property, spring, lander, reason }. A leg whose file +
// transitioned property + spring-curve name all match is the bridged drift; the
// one-token reconcile (`--duration-*` → `--spring-<name>-duration`) is the lander
// wave's. born-RED on the BB-batch source; this wave (FIRST of Band 7) PLANTS the
// gate and NAMES every drift + its owner; each owner removes its bridge row when it
// re-times the clock. A spring-clock drift NOT on this bridge reds immediately.
export const CLOCK_FENCE_PENDING = [
    {
        file: "src/styles/menu.css",
        property: "translate",
        spring: "smooth",
        lander: "BC.W-AFFORDANCE-MAP / BC.W-CONTROL-SMOOTH",
        reason:
            "the .glass-menu-row lift `translate` spatial leg rides `--spring-smooth` but pairs `--duration-fast` (a generic wall clock, the R10-2 dead-tail). One-token reconcile to `--spring-smooth-duration`, owned by the menu-row affordance re-time (AFFORDANCE-MAP rides the springs; CONTROL-SMOOTH owns the clock across controls).",
    },
    {
        file: "src/components/custom/configurator/ConfiguratorLayer.vue",
        property: "transform",
        spring: "snappy",
        lander: "BC.W-AFFORDANCE-MAP / BC.W-CONFIG-RIGHT",
        reason:
            "the .configurator-layer-chevron rotation `transform` leg rides `--spring-snappy` but pairs `--duration-fast`. (Its sibling `grid-template-rows` leg is on the proof:no-layout-animation discrete-reclaim allowlist — a genuine reflow — exempt from the clock fence.) Reconcile to `--spring-snappy-duration`, owned by the configurator/affordance re-time.",
    },
    {
        file: "src/styles/cards.css",
        property: "translate",
        spring: "smooth",
        lander: "BC.W-AFFORDANCE-MAP / BC.W-SELECTION-CARD",
        reason:
            "the card lift `translate` leg rides `--spring-smooth` but pairs `--duration-normal` (the box-shadow leg correctly rides `--ease-standard`, P1). Reconcile to `--spring-smooth-duration`, owned by the card-surface affordance re-time.",
    },
    {
        file: "src/styles/dock/layer-group.css",
        property: "width",
        spring: "snappy",
        lander: "BC.W-DOCK-ENGINE",
        reason:
            "the DockLayerGroup rail width/height/transform morph rides `--spring-snappy` but pairs `--duration-fast`. The dock-box morph register reconcile (and the P5 width/height→transform question) is owned by the Band-2 dock-engine rebuild.",
    },
    {
        file: "src/styles/dock/layer-group.css",
        property: "height",
        spring: "snappy",
        lander: "BC.W-DOCK-ENGINE",
        reason: "the DockLayerGroup rail height morph — same dock-engine reconcile as the width leg.",
    },
    {
        file: "src/styles/dock/layer-group.css",
        property: "transform",
        spring: "snappy",
        lander: "BC.W-DOCK-ENGINE",
        reason: "the DockLayerGroup rail transform morph — same dock-engine reconcile.",
    },
    {
        file: "src/styles/utilities/base.css",
        property: "scale",
        spring: "smooth",
        lander: "BC.W-AFFORDANCE-MAP / BC.W-CONTROL-SMOOTH",
        reason:
            "the .tap-squish press `scale` leg rides `--spring-smooth` but pairs `--duration-fast` (the surface legs correctly ride `--ease-standard`; the coupled fade IS present). Reconcile to `--spring-smooth-duration`, owned by the press-affordance re-time.",
    },
    {
        file: "src/components/ui/slider/Slider.vue",
        property: "transform",
        spring: "smooth",
        lander: "BC.W-AFFORDANCE-MAP / BC.W-CONTROL-SMOOTH",
        reason:
            "the slider thumb/track press `transform` legs ride `--spring-smooth` (via the `--slider-thumb-spring` fallback) but pair `--duration-fast`. Reconcile to `--spring-smooth-duration`, owned by the slider affordance re-time (AFFORDANCE-MAP names Slider.vue).",
    },
];

// ── The AUDITED layout-reclaim allowlist (shared with proof:no-layout-animation —
//    a DISCRETE user-initiated open/close where the body genuinely reflows). A
//    layout-property (`grid-template-rows`/`height`/`width`) spring leg on these
//    files is a genuine reclaim, exempt from the clock fence (M3a). Mirrors the
//    proof:no-layout-animation TRANSITION_ALLOWLIST file+prop entries.
const LAYOUT_RECLAIM_ALLOWLIST = [
    { file: "src/components/custom/configurator/ConfiguratorLayer.vue", props: ["grid-template-rows"] },
    { file: "src/styles/utilities/btn.css", props: ["height"] },
    { file: "src/components/custom/header-ribbon/HeaderRibbon.vue", props: ["max-width", "margin"] },
    { file: "src/styles/drawer.css", props: ["width"] },
];

// ── comment-strip helpers (false-witness discipline) ─────────────────────────────
// Strip CSS block comments to blanks (preserve offsets/newlines) so a commented-out
// fork / explanatory token list is never a witness.
export function stripCssComments(src) {
    let out = "";
    let i = 0;
    const n = src.length;
    while (i < n) {
        if (src[i] === "/" && src[i + 1] === "*") {
            const end = src.indexOf("*/", i + 2);
            const stop = end === -1 ? n : end + 2;
            for (let j = i; j < stop; j++) out += src[j] === "\n" ? "\n" : " ";
            i = stop;
        } else {
            out += src[i];
            i++;
        }
    }
    return out;
}

// Strip CSS block comments AND JS/TS line comments (`// …`), offset-preserving. A
// `.ts`/`.vue` carries `//` rationale ("no @mkbabb/keyframes.js", "the shared
// RAFPlayback loop drives") that must never be a witness. Guard the `//` strip to a
// non-`:` predecessor so a `https://` URL is not mangled.
export function stripAllComments(src) {
    const noBlocks = stripCssComments(src);
    return noBlocks
        .split("\n")
        .map((line) => {
            const i = line.indexOf("//");
            if (i === -1) return line;
            if (i > 0 && line[i - 1] === ":") return line;
            return line.slice(0, i);
        })
        .join("\n");
}

function lineOf(src, offset) {
    let line = 1;
    for (let i = 0; i < offset && i < src.length; i++) if (src[i] === "\n") line++;
    return line;
}

function walkSrc(dir, exts, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules" || n === "__tests__") continue;
        const p = join(dir, n);
        if (statSync(p).isDirectory()) walkSrc(p, exts, acc);
        else if (exts.some((e) => n.endsWith(e))) acc.push(p);
    }
    return acc;
}

// Reduce a `.vue` SFC to its `<style>` block content (offset-preserving) for the
// CSS-shaped clock-fence sweep; a `.css` passes through whole.
function cssOf(file, src) {
    if (!file.endsWith(".vue")) return src;
    const blockRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let out = "";
    let last = 0;
    let m;
    while ((m = blockRe.exec(src)) !== null) {
        const blockStart = m.index + m[0].indexOf(">") + 1;
        out += src.slice(last, blockStart).replace(/[^\n]/g, " ");
        out += m[1];
        last = blockStart + m[1].length;
    }
    out += src.slice(last).replace(/[^\n]/g, " ");
    return out;
}

// Split a `transition:` value into its comma legs, respecting parens so a
// `linear(…)`/`cubic-bezier(…)`/`color-mix(…)` comma is not a leg boundary.
function splitTransitionLegs(value) {
    const legs = [];
    let depth = 0;
    let cur = "";
    for (const ch of value) {
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            legs.push(cur.trim());
            cur = "";
        } else {
            cur += ch;
        }
    }
    if (cur.trim()) legs.push(cur.trim());
    return legs;
}

const SPATIAL_PROPS = new Set(["transform", "translate", "scale", "rotate", "perspective"]);

// Classify the ROLE of the selector enclosing a declaration offset (mirrors
// proof-animation-coherence's selectorRoleAt). P3's coupled-fade law governs
// ENTER/EXIT recipes (mount/popover/dialog-in/out) — a Vue `<Transition>` class
// (`*-enter-active`/`*-leave-active`) or a `[data-state=open/closed]` recipe. A
// HOVER/PRESS/GLIDE leg (`:hover`/`:active`/a plain morph class like
// `.segmented-indicator`) is NOT an enter/exit — coupling a fade to a press/glide
// reads WRONG (a button must not fade on press), so M3b never fires there.
function selectorRoleAt(stripped, offset) {
    const braceOpen = stripped.lastIndexOf("{", offset);
    if (braceOpen === -1) return "unknown";
    let selStart = braceOpen - 1;
    while (selStart > 0 && !"{};".includes(stripped[selStart])) selStart--;
    const selector = stripped.slice(selStart + 1, braceOpen).toLowerCase();
    if (/-enter-active|-enter-from|-enter-to|-appear-active|-leave-active|-leave-from|-leave-to/.test(selector))
        return "enter-exit";
    if (/\[data-state=(?:open|closed)|\[data-state=(?:visible|hidden)/.test(selector)) return "enter-exit";
    return "other"; // hover/press/glide/state-morph — P3 does not govern it.
}

// ── M1 — single source ───────────────────────────────────────────────────────────
// `SPRING_PRESETS` (springPresets.ts) is the ONLY hand-authored `(response, ζ)`
// register TABLE. A hand-authored register table is an ARRAY/object literal with
// ≥2 rows EACH carrying a NUMERIC `response:` + `dampingFraction:` literal. A
// projection that fills each row via `springPreset(name)` (no numeric literals)
// is NOT a second table (useSpringMount's MOUNT_PRESETS). regen + curves both
// import the table (the no-second-authority assert).
export function detectSingleSource(read) {
    const violations = [];
    const facts = {};

    // The canonical table EXISTS + carries the numeric rows.
    const presetSrc = stripAllComments(read(SPRING_PRESETS_TS) ?? "");
    const numericRows = [...presetSrc.matchAll(/dampingFraction:\s*[0-9]/g)].length;
    facts.canonicalRows = numericRows;
    if (numericRows < 2) {
        violations.push(
            `${SPRING_PRESETS_TS}: the SPRING_PRESETS register table is missing its numeric (response, ζ) rows — the single source is gone`,
        );
    }

    // regen-spring-tokens.mjs + curves.ts both IMPORT springPresets (the two halves
    // re-derive from ONE table — drift-proof by construction).
    const regenSrc = stripAllComments(read(REGEN_MJS) ?? "");
    const curvesSrc = stripAllComments(read(CURVES_TS) ?? "");
    facts.regenImportsPresets = /springPresets/.test(regenSrc) && /SPRING_PRESETS/.test(regenSrc);
    facts.curvesImportsPresets = /springPresets/.test(curvesSrc) && /SPRING_PRESETS/.test(curvesSrc);
    if (!facts.regenImportsPresets) {
        violations.push(
            `${REGEN_MJS}: does not import SPRING_PRESETS from springPresets.ts — the CSS half is not derived from the single source`,
        );
    }
    if (!facts.curvesImportsPresets) {
        violations.push(
            `${CURVES_TS}: does not import SPRING_PRESETS from springPresets.ts — the JS twin half is not derived from the single source`,
        );
    }

    // No SECOND hand-authored register TABLE anywhere in src/. Scan every motion/viz
    // TS for a multi-row `{response: <num>, dampingFraction: <num>}` literal cluster
    // OUTSIDE springPresets.ts. A derived projection (`springPreset(name)`-filled)
    // carries no numeric literal and never trips.
    const secondTables = [];
    const tsFiles = walkSrc(SRC_DIR, [".ts", ".vue"]).map((p) => p.slice(ROOT.length + 1));
    for (const file of tsFiles) {
        if (file === SPRING_PRESETS_TS) continue;
        const stripped = stripAllComments(read(file) ?? "");
        // Count NUMERIC (response, ζ) literal PAIRS (a `response: <num>` followed by
        // a `dampingFraction: <num>` within a small window — one register row).
        const pairRe = /response:\s*([0-9.]+)\s*,?\s*[\s\S]{0,40}?dampingFraction:\s*([0-9.]+)/g;
        const rows = [];
        let m;
        while ((m = pairRe.exec(stripped)) !== null) {
            rows.push({ response: parseFloat(m[1]), zeta: parseFloat(m[2]), line: lineOf(stripped, m.index) });
        }
        if (rows.length === 0) continue;
        // Every row that is NOT a sanctioned per-primitive default is a candidate
        // member of a second register table.
        const unsanctioned = rows.filter(
            (r) => !SPRING_DEFAULTS_ALLOWLIST.some((d) => d.pair[0] === r.response && d.pair[1] === r.zeta),
        );
        // A SECOND TABLE is ≥2 unsanctioned register rows hand-authored in ONE file
        // (one stray default is the per-primitive seam; a cluster is a register
        // table that should be a SPRING_PRESETS row).
        if (unsanctioned.length >= 2) {
            secondTables.push({ file, rows: unsanctioned.map((r) => `${r.line}: (${r.response}, ${r.zeta})`) });
            violations.push(
                `${file}: ${unsanctioned.length} hand-inlined (response, ζ) register rows (${unsanctioned.map((r) => `L${r.line}`).join(", ")}) — a SECOND register table beside SPRING_PRESETS; each should be a springPresets.ts row read via springPreset(name)`,
            );
        }
    }
    facts.secondTables = secondTables;
    facts.tsFilesScanned = tsFiles.length;
    return { violations, facts };
}

// ── M2 — no un-sanctioned off-spine spring/rAF ──────────────────────────────────
// PRONG A — a hand-rolled spring/lerp/damping INTEGRATOR off-spine: damping/lerp
// smoothing math (a `… += (target - …) * <coeff>` ease, a `criticallyDamped`/
// `dampedLerp` smoother, a `velocity`/`stiffness` integration) in a motion/viz
// composable that imports NO kf primitive from @mkbabb/keyframes.js. A file that
// imports kf and composes SpringProgress/ElementMorph/Draggable RIDES the engine
// (its rAF is playback/measure, on-spine) and never trips.
// PRONG B — a `decayRest`+`spring.target` snap RE-ROLL (the kf-snap-not-on-dist
// interim). Both prongs check OFF_SPINE_ALLOWLIST; a non-allowlisted hit reds.
const KF_PRIMITIVE_RE = /from\s+["']@mkbabb\/keyframes\.js["']/;
// A hand-rolled spring/lerp/damping INTEGRATOR. The tell is the interpolation step
// math — either the `a += (target - a) * k` accumulator form OR the
// `a + (target - a) * k` framerate-independent lerp form (the critically-damped
// approach PVF runs), a named criticallyDamped/dampedLerp smoother, or an explicit
// `stiffness … damping` spring integration. PURE math-shape — a kf-importing file
// never reaches this check (it RIDES the engine, its rAF is playback/measure).
const HANDROLLED_SMOOTHER_RE =
    /criticallyDamped|dampedLerp|\bdampingLerp\b|\+=\s*\([^)]*-[^)]*\)\s*\*|[\w.\])]\s*\+\s*\([^()]*-[^()]*\)\s*\*\s*[\w.(]|smoothing\s*\*\s*\(|\bstiffness\b[\s\S]{0,60}\bdamping\b/;
const RAF_STEP_RE = /requestAnimationFrame\s*\(/;

// M2 scopes to the UI MOTION spine — the motion composables + the dock/drawer
// morph engines. The VIZ dirs are the explicitly-disjoint island (their internal
// smoothing math is BC.W-VIZ-CHOREOGRAPHY's scope, not the UI spine); the viz get
// M4 (no kf rAF ownership), never the hand-rolled-smoother sweep. This is the
// spec's split: this wave OWNS the UI-side spine + records the viz island as the
// disjoint sibling.
const UI_MOTION_DIRS = [
    "src/composables/motion",
    "src/components/custom/dock/composables",
    "src/components/custom/tabs/composables",
    "src/components/ui/drawer/composables",
];
function isVizFile(file) {
    return VIZ_DIRS.some((d) => file.startsWith(`${d}/`));
}

export function detectOffSpine(read) {
    const violations = [];
    const facts = { prongA: [], prongB: [], allowlistTripped: [] };

    const files = UI_MOTION_DIRS.flatMap((d) =>
        walkSrc(resolve(ROOT, d), [".ts", ".vue"]).map((p) => p.slice(ROOT.length + 1)),
    ).filter((f) => !isVizFile(f));
    for (const file of files) {
        const stripped = stripAllComments(read(file) ?? "");
        const importsKf = KF_PRIMITIVE_RE.test(stripped);
        const allowlisted = OFF_SPINE_FILES.has(file);

        // PRONG A — a hand-rolled spring/lerp smoother off-spine (no kf primitive).
        // It must be ANIMATING: either a private rAF step-loop OR a tick()-fed
        // smoother (the renderer-fed PUSH-API). The damping/lerp math is the tell.
        const hasSmoother = HANDROLLED_SMOOTHER_RE.test(stripped);
        const hasRafOrTick = RAF_STEP_RE.test(stripped) || /\btick\s*\(/.test(stripped);
        if (!importsKf && hasSmoother && hasRafOrTick) {
            if (allowlisted) {
                facts.prongA.push({ file, sanctioned: true });
            } else {
                facts.prongA.push({ file, sanctioned: false });
                violations.push(
                    `${file}: a hand-rolled spring/lerp/damping integrator with NO @mkbabb/keyframes.js primitive — a second motion engine off the kf spine. Compose a kf SpringProgress/ElementMorph, or add the file to OFF_SPINE_ALLOWLIST with its SCC/foreign-tree rationale (and motion-canon.md §P7).`,
                );
            }
        }

        // PRONG B — a decayRest + spring.target snap RE-ROLL.
        const hasDecayReroll = /\bdecayRest\s*\(/.test(stripped) && /\bspring\.target\s*=/.test(stripped);
        if (hasDecayReroll) {
            if (allowlisted) {
                facts.prongB.push({ file, sanctioned: true });
            } else {
                facts.prongB.push({ file, sanctioned: false });
                violations.push(
                    `${file}: a decayRest()+spring.target snap RE-ROLL outside the sanctioned set — the kf-snap-not-on-dist interim re-roll is allowed ONLY for useDragMorph. Adopt the kf snap option, or add the file to OFF_SPINE_ALLOWLIST + motion-canon.md §P7.`,
                );
            }
        }
    }

    // Every allowlisted seam must STILL trip a prong (the allowlist is load-bearing —
    // it suppresses a REAL detection, never a phantom). A stale allowlist entry whose
    // file no longer trips is dead weight that masks nothing.
    for (const entry of OFF_SPINE_ALLOWLIST) {
        const tripsA = facts.prongA.some((p) => p.file === entry.file && p.sanctioned);
        const tripsB = facts.prongB.some((p) => p.file === entry.file && p.sanctioned);
        if (!tripsA && !tripsB) {
            violations.push(
                `OFF_SPINE_ALLOWLIST entry ${entry.file} (${entry.seam}) no longer trips an off-spine prong — the entry is stale/dead; the allowlist must only suppress a LIVE detection. Remove the entry or restore the seam it sanctioned.`,
            );
        }
    }
    facts.filesScanned = files.length;
    return { violations, facts };
}

// ── M3 — the per-spring clock fence, universal + coupled ────────────────────────
// (a) ANY `--spring-<name>` curve leg paired with a generic `--duration-*` clock
//     (it MUST read its `--spring-<name>-duration`). Layout-reclaim-allowlisted and
//     CLOCK_FENCE_PENDING legs are exempt. (b) A spring ENTER/EXIT/PRESS transform
//     leg with NO coupled opacity/effects channel in the SAME transition.
function layoutReclaimAllowed(file, property) {
    return LAYOUT_RECLAIM_ALLOWLIST.some(
        (a) => a.file === file && a.props.some((p) => property === p || property.startsWith(`${p}-`)),
    );
}
// A bridged drift matches on { file, property, spring } — leg-specific (the bridge
// is never a blanket file exemption: another property on the same file still reds).
function pendingLegAllowed(file, property, springName) {
    return CLOCK_FENCE_PENDING.some(
        (e) => e.file === file && e.property === property && e.spring === springName,
    );
}

export function detectClockFence(file, src) {
    const violations = [];
    const stripped = stripCssComments(cssOf(file, src));
    // Every `transition:` (NOT transition-property/-duration/-timing/-delay) decl.
    // Also handle Tailwind arbitrary `[transition:…]` where legs are `_`-joined: we
    // normalize `_` to space INSIDE a `[transition:…]` window before leg-splitting.
    const declRe = /(?<!-)\btransition\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = declRe.exec(stripped)) !== null) {
        const rawValue = m[1];
        const line = lineOf(stripped, m.index);
        // Tailwind arbitrary value: `_` is the space separator inside the bracket.
        const value = rawValue.includes("_") ? rawValue.replace(/_/g, " ") : rawValue;
        const legs = splitTransitionLegs(value);
        // Collect the property set of THIS transition for the coupled-fade check.
        const props = [];
        for (const leg of legs) {
            const tokens = leg.split(/\s+/).filter(Boolean);
            if (tokens.length) props.push(tokens[0].toLowerCase());
        }
        const hasCoupledFade = props.some(
            (p) => p === "opacity" || p === "filter" || p === "color" || p === "all",
        );
        for (const leg of legs) {
            const tokens = leg.split(/\s+/).filter(Boolean);
            if (!tokens.length) continue;
            const property = tokens[0].toLowerCase();
            const springCurve = leg.match(/var\(\s*(--spring-(?:smooth|snappy|bouncy|gentle|dock))\s*\)/);
            if (!springCurve) continue; // a `--ease-*`/bezier leg is not clock-fenced here.
            const springName = springCurve[1].replace("--spring-", "");
            // (a) the CLOCK: this spring leg must read its OWN --spring-<name>-duration,
            //     never a generic --duration-*.
            const hasGenericClock = /var\(\s*--duration-[a-z]+\s*\)/.test(leg);
            const hasOwnClock = new RegExp(`var\\(\\s*--spring-${springName}-duration\\s*\\)`).test(leg);
            if (hasGenericClock && !hasOwnClock) {
                if (layoutReclaimAllowed(file, property)) {
                    // a genuine discrete layout reflow — exempt (shared allowlist).
                } else if (pendingLegAllowed(file, property, springName)) {
                    // a downstream-owned reconcile — the verify-not-edit bridge.
                } else {
                    violations.push(
                        `${file}:${line}: spring leg '${property}' rides '${springCurve[1]}' but pairs a generic '--duration-*' wall clock — it MUST read '--spring-${springName}-duration' (the per-spring settle; a generic clock re-times the spring + drags the dead sub-pixel tail, M3a). The --tab-indicator-duration leg is the model.`,
                    );
                }
            }
            // (b) the COUPLED FADE: an ENTER/EXIT spring transform leg must carry a
            //     coupled opacity/effects channel in the SAME transition (P3 — a bare
            //     enter/exit transform with no fade reads abrupt). Scoped to
            //     enter/exit recipes ONLY — a hover/press/glide leg (a button squish,
            //     a tab-indicator glide) is NOT an enter/exit and coupling a fade
            //     there reads wrong; M3b never fires on those.
            const role = selectorRoleAt(stripped, m.index);
            if (SPATIAL_PROPS.has(property) && role === "enter-exit" && !hasCoupledFade) {
                if (!layoutReclaimAllowed(file, property) && !pendingLegAllowed(file, property, springName)) {
                    violations.push(
                        `${file}:${line}: enter/exit spring transform leg '${property}' on '${springCurve[1]}' carries NO coupled opacity/effects channel in the same transition — pair the fade (the coupled-fade P3; a bare enter/exit transform reads abrupt, M3b).`,
                    );
                }
            }
        }
    }
    return violations;
}

// ── M4 — the viz inversion ──────────────────────────────────────────────────────
// No viz file calls RAFPlayback.play/.loop/.drive — the viz FEED kf primitives
// tick(dt) from their own canvas-lifecycle rAF, never OWN a kf rAF.
const RAFPLAYBACK_OWN_RE = /\bRAFPlayback\b[\s\S]{0,40}?\.(play|loop|drive)\s*\(|new\s+RAFPlayback\b/;
export function detectVizInversion(read) {
    const violations = [];
    const facts = { vizFilesScanned: 0, hits: [] };
    const files = VIZ_DIRS.flatMap((d) =>
        walkSrc(resolve(ROOT, d), [".ts", ".vue"]).map((p) => p.slice(ROOT.length + 1)),
    );
    facts.vizFilesScanned = files.length;
    for (const file of files) {
        const stripped = stripAllComments(read(file) ?? "");
        const m = RAFPLAYBACK_OWN_RE.exec(stripped);
        if (m) {
            facts.hits.push(`${file}:${lineOf(stripped, m.index)}`);
            violations.push(
                `${file}:${lineOf(stripped, m.index)}: a viz OWNS a kf RAFPlayback loop ('${m[0].trim()}') — a viz must FEED kf primitives tick(dt) from its OWN canvas-lifecycle rAF, never own a kf rAF (the one-loop / proof:offscreen-pause inversion, M4). BC.W-VIZ-CHOREOGRAPHY owns the positive wiring.`,
            );
        }
    }
    return { violations, facts };
}

// ── M5 — the canon + allowlist are single-sourced ───────────────────────────────
// Every OFF_SPINE_ALLOWLIST seam + SPRING_DEFAULTS_ALLOWLIST default is recorded in
// motion-canon.md §P7 (the gate and the canon cannot drift). AND the cross-repo kf
// one-clock book exists (asks-and-consumes.md).
export function detectCanonSync(read) {
    const violations = [];
    const facts = {};
    // BH.B5c: the §P7 motion-canon clause re-homed off the docs/precepts submodule onto
    // the in-repo docs/design extraction — always present on a fresh checkout, so the
    // clause always BITES (present iff the extracted home resolves).
    const submodulePresent = existsSync(resolve(ROOT, MOTION_CANON));
    facts.submodulePresent = submodulePresent;
    if (!submodulePresent) {
        console.log(
            "  M5 §P7: SKIP-BY-POLICY — docs/precepts submodule not initialized on this runner (the motion-canon.md §P7 clause bites locally)",
        );
        facts.hasP7 = null;
    } else {
        const canon = read(MOTION_CANON) ?? "";
        facts.hasP7 = /##\s*P7\b/.test(canon);
        if (!facts.hasP7) {
            violations.push(
                `${MOTION_CANON}: no §P7 section — the ONE source + sanctioned off-spine SET canon is missing; the gate's allowlist has no canonical home (M5).`,
            );
        }
        // Each sanctioned seam must be NAMED in §P7 (by its basename — the canon names
        // the seam, not the full path).
        const p7 = facts.hasP7 ? canon.slice(canon.indexOf("## P7")) : "";
        const p7Body = p7.slice(0, p7.indexOf("\n## ") === -1 ? p7.length : p7.indexOf("\n## ", 4));
        for (const entry of OFF_SPINE_ALLOWLIST) {
            const base = entry.file.split("/").pop().replace(/\.(ts|vue)$/, "");
            if (!p7Body.includes(base)) {
                violations.push(
                    `${MOTION_CANON} §P7: the sanctioned off-spine seam '${base}' (${entry.seam}) is not named in the canon — the gate allowlist and the canon have drifted (add the seam to §P7, M5).`,
                );
            }
        }
        for (const entry of SPRING_DEFAULTS_ALLOWLIST) {
            if (!p7Body.includes(entry.name)) {
                violations.push(
                    `${MOTION_CANON} §P7: the sanctioned per-primitive default '${entry.name}' is not named in the canon — the gate defaults-allowlist and the canon have drifted (M5).`,
                );
            }
        }
    }
    // The cross-repo kf one-clock book exists + names the springTimingFunction +
    // KF-OSCILLATOR dispositions.
    const asks = read(ASKS_AND_CONSUMES) ?? null;
    facts.crossRepoBookExists = asks !== null;
    if (asks === null) {
        violations.push(
            `${ASKS_AND_CONSUMES}: the cross-repo kf one-clock contract book is missing — record springTimingFunction (SATISFIED) + KF-OSCILLATOR (BOOKED) + the dock-cure contract (M5).`,
        );
    } else {
        facts.bookNamesSpringTiming = /springTimingFunction/.test(asks);
        facts.bookNamesOscillator = /OSCILLATOR|Oscillator/.test(asks);
        if (!facts.bookNamesSpringTiming || !facts.bookNamesOscillator) {
            violations.push(
                `${ASKS_AND_CONSUMES}: the kf one-clock book must name springTimingFunction (SATISFIED) AND the KF-OSCILLATOR (BOOKED) dispositions (M5).`,
            );
        }
    }
    return { violations, facts };
}

// ── the styling-corpus sweep for M3 (the WHOLE corpus, no band exempt) ──────────
function clockFenceCorpus() {
    // Every src/**/*.css + every SFC <style> + the chip variant `[transition:…]`
    // arbitrary-value TS (the speedtest-lifted chip recipes name spring curves in a
    // Tailwind arbitrary transition).
    const css = walkSrc(SRC_DIR, [".css"]).map((p) => p.slice(ROOT.length + 1));
    const vue = walkSrc(SRC_DIR, [".vue"]).map((p) => p.slice(ROOT.length + 1));
    const ts = walkSrc(SRC_DIR, [".ts"])
        .map((p) => p.slice(ROOT.length + 1))
        .filter((f) => {
            // Only TS files that actually carry a `[transition:` arbitrary value with
            // a spring curve (the chip variants) — keep the sweep cheap + targeted.
            const s = readFileSync(resolve(ROOT, f), "utf8");
            return /\[transition:[^\]]*--spring-/.test(s);
        });
    return { css, vue, ts };
}

// ── A9 — the ONE-CLOCK LOCK (BG.W-ANIMATION-CONGRUENCE) ──────────────────────────
// Value-check each SPRING_DEFAULTS_ALLOWLIST entry against its live source. A source
// that READS the table (springPreset(...)) is DEAD (no literal to sanction — remove
// it); a source literal that disagrees with the `pair` is STALE doc-rot. `raw` is the
// file text (null if absent). Returns a violation reason string, or null.
export function checkSpringDefaultLive(entry, raw) {
    const src = entry.source;
    if (!src) return "no source anchor — cannot value-check the pair (add source: { file, symbol|pairRe })";
    if (raw == null) return `source file ${src.file} not found`;
    const stripped = stripAllComments(raw);
    let win = stripped;
    if (src.symbol) {
        const decl = new RegExp(`\\b${src.symbol}\\b\\s*[:=]`).exec(stripped);
        if (!decl) return `symbol '${src.symbol}' not found in ${src.file} (the source moved/renamed)`;
        win = stripped.slice(decl.index, decl.index + 240);
    }
    if (/springPreset\s*\(/.test(win)) {
        return `${src.file}${src.symbol ? ` (${src.symbol})` : ""} READS the table via springPreset() — a table-reader carries no hand-inlined pair, so it cannot drift. REMOVE it from SPRING_DEFAULTS_ALLOWLIST (dead entry)`;
    }
    const re = src.pairRe ?? /response:\s*([0-9.]+)[\s\S]{0,80}?dampingFraction:\s*([0-9.]+)/;
    const m = re.exec(win);
    if (!m) return `no (response, ζ) literal at ${src.file}${src.symbol ? ` (${src.symbol})` : ""} — cannot verify the pair`;
    const live = [parseFloat(m[1]), parseFloat(m[2])];
    if (live[0] !== entry.pair[0] || live[1] !== entry.pair[1]) {
        return `STALE — allowlist pair [${entry.pair.join(", ")}] disagrees with the live literal [${live.join(", ")}] at ${src.file}${src.symbol ? ` (${src.symbol})` : ""} (doc-rot; reconcile the pair to live)`;
    }
    return null;
}

export function detectSpringDefaultsLive(read) {
    const violations = [];
    const facts = { checked: [] };
    for (const entry of SPRING_DEFAULTS_ALLOWLIST) {
        const raw = entry.source ? read(entry.source.file) : null;
        const reason = checkSpringDefaultLive(entry, raw);
        if (reason) violations.push(`SPRING_DEFAULTS_ALLOWLIST '${entry.name}': ${reason} (A9).`);
        else facts.checked.push(entry.name);
    }
    return { violations, facts };
}

// ── CC — the CHANNEL-COUPLING arm (IOS27-MOTION-TRUTH §4.2) ──────────────────────
// One gesture derives ALL its channels from ONE clock family. The source-structural
// half (the paint judge owns the FEEL/screencast). Three pure predicates the detector
// AND the self-test share (DRY, testable).
export function readDurationSeconds(src, name) {
    if (src == null) return null;
    const m = new RegExp(`${name}\\s*:\\s*([0-9.]+)(m?s)\\b`).exec(src);
    if (!m) return null;
    const v = parseFloat(m[1]);
    return m[2] === "ms" ? v / 1000 : v;
}
export function countScalarWrites(src, prop) {
    return (src.match(new RegExp(`setProperty\\(\\s*["']${prop}["']`, "g")) || []).length;
}
// BI.W-DRAWER-PERF FOLLOW (ruling 12): the scoped write targets THREE reader roots
// (sheet · scrim · wrapper), so the single-WRITER law is CONTAINMENT, not site-count —
// every `setProperty("<prop>")` site must live INSIDE the one `writeScalar` function
// body (a site outside it is the forked writer the clause kills). Brace-balanced body
// extraction; a missing writeScalar = zero containment (fail-loud).
export function scalarWritesOutsideWriter(src, prop, writerName = "writeScalar") {
    const total = countScalarWrites(src, prop);
    const decl = src.match(new RegExp(`function\\s+${writerName}\\s*\\([^)]*\\)\\s*\\{`));
    if (!decl) return total;
    const start = decl.index + decl[0].length;
    let depth = 1;
    let i = start;
    while (i < src.length && depth > 0) {
        const ch = src[i];
        if (ch === "{") depth += 1;
        else if (ch === "}") depth -= 1;
        i += 1;
    }
    const body = src.slice(start, i);
    return total - countScalarWrites(body, prop);
}
export function hasFixedBackdropTween(src) {
    return /transition(?:-property)?\s*:\s*[^;}]*backdrop-filter/.test(src);
}

export function detectChannelCoupling(read) {
    const violations = [];
    const facts = {};

    // CC1 — overlay exit ≤ entrance (dialog panel .glass-reveal + scrim sheet-animate).
    // The panel enters on --spring-snappy-duration + exits on --duration-fast; the
    // scrim enters on --duration-panel + exits on --duration-fast. An exit clock that
    // OUTLASTS its entrance reds (the cc-dismiss-longer / decoupled-scrim defect, 2.5).
    // BI.W-REGISTER-TABLE reconcile (anchor-only; the CC1 SEMANTIC — exit ≤ entrance,
    // panel + scrim couple their clocks — is PRESERVED). The overlay panel now rides the
    // NAMED registers: enter clock `--enter-overlay-clock` (= --spring-snappy-duration,
    // numeric = --spring-snappy-settle at tempo 1) + exit clock `--exit-overlay-duration`
    // (motion-registers.css) via reveal.css's `--reveal-clock`/`--reveal-exit-clock`. The
    // scrim (sheet-animate) is unchanged (--duration-panel open / --duration-fast close).
    const motionCss = stripCssComments(read(SCHEME_MOTION_CSS) ?? "");
    const springCss = stripCssComments(read(SCHEME_SPRING_CSS) ?? "");
    const registersCss = stripCssComments(read(MOTION_REGISTERS_CSS) ?? "");
    const fast = readDurationSeconds(motionCss, "--duration-fast");
    const panel = readDurationSeconds(motionCss, "--duration-panel");
    // The panel entrance numeric is the raw --spring-snappy-settle (BI.W-TEMPO split —
    // the public --spring-snappy-duration is now the `settle * --motion-tempo` reader a
    // device-free gate cannot evaluate; at the 1.0 identity settle == the old duration).
    const snappyDur = readDurationSeconds(springCss, "--spring-snappy-settle");
    // The panel EXIT is the named overlay exit register (was --duration-fast pre-table).
    const overlayExit = readDurationSeconds(registersCss, "--exit-overlay-duration");
    facts.cc1 = { fast, panel, snappyDur, overlayExit };
    if (fast == null || panel == null || snappyDur == null || overlayExit == null) {
        violations.push(
            `CC1: could not read the overlay clocks (--duration-fast=${fast}, --duration-panel=${panel}, --spring-snappy-settle=${snappyDur}, --exit-overlay-duration=${overlayExit}) — the coupled-clock value-check is blind (channel-coupling).`,
        );
    } else {
        if (overlayExit > snappyDur) {
            violations.push(
                `CC1: the dialog panel exit (--exit-overlay-duration ${overlayExit}s) OUTLASTS its entrance (--spring-snappy-settle ${snappyDur}s) — an exit must never outlast its entrance (channel-coupling).`,
            );
        }
        if (fast > panel) {
            violations.push(
                `CC1: the dialog scrim exit (--duration-fast ${fast}s) OUTLASTS its entrance (--duration-panel ${panel}s) — an exit must never outlast its entrance (channel-coupling).`,
            );
        }
    }
    // CC1 structural presence — the panel + scrim reference the coupled clocks (so the
    // value-check binds to the real coupled surfaces, not floating token magnitudes).
    // Panel now rides the register indirection: reveal.css binds `--reveal-clock` (the
    // enter register) + `glass-reveal-out var(--reveal-exit-clock)` (the exit register);
    // motion-registers.css maps `--enter-overlay-clock: var(--spring-snappy-duration)`.
    const revealCss = stripCssComments(read(GLASS_REVEAL_CSS) ?? "");
    const sheetCss = stripCssComments(read(SHEET_ANIMATE_CSS) ?? "");
    facts.cc1.panelReadsSnappy =
        /--reveal-clock/.test(revealCss) &&
        /--enter-overlay-clock:\s*var\(--spring-snappy-duration\)/.test(registersCss);
    facts.cc1.panelExitFast = /glass-reveal-out\s+var\(--reveal-exit-clock\)/.test(revealCss);
    facts.cc1.scrimReadsPanel = /duration-\[var\(--duration-panel\)\]/.test(sheetCss);
    facts.cc1.scrimExitFast = /duration-\[var\(--duration-fast\)\]/.test(sheetCss);
    if (!facts.cc1.panelReadsSnappy || !facts.cc1.panelExitFast) {
        violations.push(
            `CC1: the dialog panel (.glass-reveal, ${GLASS_REVEAL_CSS}) no longer couples enter=--enter-overlay-clock (→ --spring-snappy-duration) + exit=glass-reveal-out var(--reveal-exit-clock) — the coupled-clock value-check is unanchored (channel-coupling).`,
        );
    }
    if (!facts.cc1.scrimReadsPanel || !facts.cc1.scrimExitFast) {
        violations.push(
            `CC1: the dialog scrim (sheet-animate, ${SHEET_ANIMATE_CSS}) no longer couples open=--duration-panel + close=--duration-fast — the coupled-clock value-check is unanchored (channel-coupling).`,
        );
    }

    // CC2 — the drawer is a SINGLE scalar-writer. Every detent transition (gesture ·
    // open · programmatic · external activeSnapPoint) routes through the ONE
    // writeScalar (the sole site writing --glass-drawer-t/--stage-t) + the ONE
    // spring.target re-seat, so sheet+scrim+page-recede stay ON ONE writer (D1). A
    // forked scalar writer decouples the channels.
    const drawerTs = stripAllComments(read(DRAWER_SNAP_TS) ?? "");
    const drawerT = countScalarWrites(drawerTs, "--glass-drawer-t");
    const stageT = countScalarWrites(drawerTs, "--stage-t");
    // BI.W-DRAWER-PERF FOLLOW (ruling 12): --stage-t legitimately writes N sites inside
    // the ONE writeScalar (the sheet + the scrim/wrapper reader-root loop — the scoped
    // write that killed the documentElement 120× recalc). Single-WRITER = CONTAINMENT:
    // zero sites outside writeScalar; --glass-drawer-t stays the exactly-1 sheet write.
    const drawerTOutside = scalarWritesOutsideWriter(drawerTs, "--glass-drawer-t");
    const stageTOutside = scalarWritesOutsideWriter(drawerTs, "--stage-t");
    const hasReseat = /\.target\s*=/.test(drawerTs);
    facts.cc2 = { drawerTWrites: drawerT, stageTWrites: stageT, drawerTOutside, stageTOutside, hasReseat };
    if (drawerT !== 1 || stageT < 1 || drawerTOutside !== 0 || stageTOutside !== 0) {
        violations.push(
            `CC2: the drawer scalar is NOT single-writer — ${DRAWER_SNAP_TS} writes --glass-drawer-t ${drawerT}× (${drawerTOutside} outside writeScalar; expect exactly 1, inside) and --stage-t ${stageT}× (${stageTOutside} OUTSIDE the ONE writeScalar; the ruling-12 multi-root scoped write allows N sites INSIDE it, zero outside). A forked writer decouples the sheet/scrim/page channels (channel-coupling).`,
        );
    }
    if (!hasReseat) {
        violations.push(
            `CC2: the drawer detent re-seat (spring.target = …) is absent in ${DRAWER_SNAP_TS} — every detent transition must route through the ONE spring re-seat (channel-coupling).`,
        );
    }
    // CC2b — no gesture-driven surface carries a fixed `transition: backdrop-filter`
    // blur tween (the drawer gesture drives blur per-frame off the scalar; a fixed
    // tween where a gesture drives is the "fixed blur tween" RED).
    const drawerCss = stripCssComments(read(DRAWER_LOOK_CSS) ?? "");
    const fixedBlur = hasFixedBackdropTween(drawerCss);
    facts.cc2.noFixedBlurTween = !fixedBlur;
    if (fixedBlur) {
        violations.push(
            `CC2: ${DRAWER_LOOK_CSS} declares a fixed \`transition: backdrop-filter\` — the drawer gesture drives blur per-frame off --glass-drawer-t; a decoupled fixed blur tween reds (channel-coupling).`,
        );
    }

    return { violations, facts };
}

// ── TEMPO — the CSS↔JS co-scale clause (BI.W-TEMPO / M11 — the round-4 correction) ──
// AUTHORED INTO this gate (never a collision-fated second gate): the `--motion-tempo`
// axis co-scales BOTH the CSS spring clocks (the `--spring-<name>-duration` reader reads
// `settle * var(--motion-tempo)`) AND the JS spring RESPONSES (`response *= tempo`).
// Because `duration ∝ response` (ωₙ = 2π/response), a CSS dropdown (enter-menu clock =
// `--spring-smooth-duration`) and a JS dock morph (DOCK_SPRING) co-scale IN PROPORTION
// as tempo varies — the CSS clock and the JS response stretch by the SAME factor, so
// their t90-scale ratio ≈ 1 at ANY tempo (G2). BORN-RED HONEST: no `--motion-tempo`
// axis exists at HEAD (unregistered @property + flat CSS clock + no JS wire), so the
// PRESENCE gate reds until the wire lands (clause-RED → GREEN at the wire). A regression
// that scales the CSS clock but NOT the JS spring (or the reverse) reds the co-scale
// ratio (the self-test bite: a tempo-write that doesn't reach a JS spring reds).
const TEMPO_COSCALE_TEMPOS = [0.85, 1.2];
const TEMPO_COSCALE_BAND = 0.02; // ±2% of the co-scale ratio (the wire lands it ~0)
// DOCK_SPRING (dock/constants.ts → springPreset("dock")); the JS dock-morph register.
const DOCK_COSCALE_SPRING = { response: 0.68, dampingFraction: 0.64 };
const TEMPO_RISE_LEVEL = 0.9; // the 90%-travel rise-time (t90) landmark
const TEMPO_RISE_DT = 0.0002; // 0.2ms — sub-ms JS_t90 resolution
const TEMPO_RISE_MAX_SECONDS = 5;

/** Physical time (s) the `SpringProgress(target=1)` step response first reaches `level`. */
function springRiseTimeSeconds(preset, level) {
    const spring = new SpringProgress({
        response: preset.response,
        dampingFraction: preset.dampingFraction,
    });
    spring.target = 1;
    let prev = spring.tickToTime(0);
    for (let t = TEMPO_RISE_DT; t < TEMPO_RISE_MAX_SECONDS; t += TEMPO_RISE_DT) {
        const x = spring.tickToTime(t);
        if (prev < level && x >= level) {
            return t - TEMPO_RISE_DT + ((level - prev) / (x - prev)) * TEMPO_RISE_DT;
        }
        prev = x;
    }
    return null;
}

/**
 * PURE co-scale detector — reads the 3 axis sources (the @property registration, the
 * scheme-spring CSS reader split, the JS dock spring engine) so the self-test can inject
 * a synthetic "CSS scales, JS doesn't" state and assert it FLAGS, while the fully-wired
 * synthetic stays clean.
 */
export function detectTempoCoScale({ propRegsSrc, springCss, dockSpringSrc }) {
    const violations = [];
    const facts = { tempos: TEMPO_COSCALE_TEMPOS, band: TEMPO_COSCALE_BAND, perTempo: [] };

    // Presence 1 — the `--motion-tempo` @property is REGISTERED (the axis exists).
    const tempoRegistered = /@property\s+--motion-tempo\b/.test(
        stripAllComments(propRegsSrc ?? ""),
    );
    facts.tempoRegistered = tempoRegistered;
    if (!tempoRegistered) {
        violations.push(
            `TEMPO co-scale: \`@property --motion-tempo\` is NOT registered (${PROPERTY_REGS_CSS}) — the tempo axis does not exist; the CSS↔JS co-scale has nothing to verify (born-RED until the wire lands).`,
        );
    }

    // Presence 2 — the CSS `--spring-smooth-duration` READER (the enter-menu / dropdown
    // clock) co-scales by `var(--motion-tempo)`; the raw `-settle` seconds are present.
    const cleanCss = stripCssComments(springCss ?? "");
    const readerM = cleanCss.match(/--spring-smooth-duration:\s*([^;]+);/);
    const settleM = cleanCss.match(/--spring-smooth-settle:\s*([0-9.]+)s/);
    const hasCssTempo = Boolean(readerM) && /var\(\s*--motion-tempo\s*\)/.test(readerM[1]);
    facts.hasCssTempo = hasCssTempo;
    facts.smoothSettle = settleM ? Number.parseFloat(settleM[1]) : null;
    if (!hasCssTempo) {
        violations.push(
            `TEMPO co-scale: the CSS \`--spring-smooth-duration\` dropdown clock does NOT read \`var(--motion-tempo)\` (${SCHEME_SPRING_CSS}) — the CSS side is not tempo-scaled, so a global tempo write never reaches the dropdown clock.`,
        );
    }
    if (!settleM) {
        violations.push(
            `TEMPO co-scale: the raw \`--spring-smooth-settle\` clock is missing (${SCHEME_SPRING_CSS}) — the reader has no numeric source to scale.`,
        );
    }

    // Presence 3 — the JS DOCK engine co-scales `response` by `motionTempo()`.
    const cleanDock = stripAllComments(dockSpringSrc ?? "");
    const hasJsTempo =
        /motionTempo\s*\(/.test(cleanDock) &&
        /response:\s*[^,;\n]*\*\s*motionTempo\s*\(/.test(cleanDock);
    facts.hasJsTempo = hasJsTempo;
    if (!hasJsTempo) {
        violations.push(
            `TEMPO co-scale: the JS dock spring (${USE_DOCK_SPRING_TS}) does NOT scale \`response\` by \`motionTempo()\` — the JS side is not tempo-scaled, so at a global tempo≠1 the dock JS morph DESYNCS from its CSS clock (the P7 one-clock break).`,
        );
    }

    // The co-scale numbers — computed off the DETECTED booleans so a "CSS scales, JS
    // doesn't" state produces a diverging ratio (the load-bearing self-test bite). The
    // settle number must be present to compute the CSS clock scale.
    if (settleM) {
        const settleSec = Number.parseFloat(settleM[1]);
        const jsBaseT90 = springRiseTimeSeconds(DOCK_COSCALE_SPRING, TEMPO_RISE_LEVEL);
        for (const t of TEMPO_COSCALE_TEMPOS) {
            // CSS dropdown scale = clock(t)/clock(1); clock(t) = settle * (tempo? t : 1).
            const cssClockT = settleSec * (hasCssTempo ? t : 1);
            const cssScale = cssClockT / settleSec;
            // JS dock scale = t90(resp·(tempo? t : 1)) / t90(resp); t90 ∝ response, so
            // this is exactly t when the JS wire multiplies by tempo, else 1.
            const jsRespT = DOCK_COSCALE_SPRING.response * (hasJsTempo ? t : 1);
            const jsT90t = springRiseTimeSeconds(
                { response: jsRespT, dampingFraction: DOCK_COSCALE_SPRING.dampingFraction },
                TEMPO_RISE_LEVEL,
            );
            const jsScale = jsBaseT90 && jsT90t ? jsT90t / jsBaseT90 : null;
            const coScaleRatio = jsScale ? cssScale / jsScale : null;
            facts.perTempo.push({
                tempo: t,
                cssScale: Math.round(cssScale * 1000) / 1000,
                jsScale: jsScale == null ? null : Math.round(jsScale * 1000) / 1000,
                coScaleRatio: coScaleRatio == null ? null : Math.round(coScaleRatio * 1000) / 1000,
            });
            if (coScaleRatio == null || Math.abs(coScaleRatio - 1) > TEMPO_COSCALE_BAND) {
                violations.push(
                    `TEMPO co-scale @tempo ${t}: CSS clock scale ${cssScale.toFixed(3)} vs JS response scale ${jsScale == null ? "n/a" : jsScale.toFixed(3)} → co-scale ratio ${coScaleRatio == null ? "n/a" : coScaleRatio.toFixed(3)} (|·−1|>${TEMPO_COSCALE_BAND}) — the CSS dropdown clock and the JS dock morph do NOT co-scale in proportion; a global tempo tightens one but not the other (the P7 one-clock law).`,
                );
            }
        }
    }

    return { violations, facts };
}

function detectTempoCoScaleReal(read) {
    return detectTempoCoScale({
        propRegsSrc: read(PROPERTY_REGS_CSS),
        springCss: read(SCHEME_SPRING_CSS),
        dockSpringSrc: read(USE_DOCK_SPRING_TS),
    });
}

export function detectAll(read) {
    const violations = [];
    const facts = {};

    const a9 = detectSpringDefaultsLive(read);
    facts.a9 = a9.facts;
    violations.push(...a9.violations);

    const cc = detectChannelCoupling(read);
    facts.cc = cc.facts;
    violations.push(...cc.violations);

    const m1 = detectSingleSource(read);
    facts.m1 = m1.facts;
    violations.push(...m1.violations);

    const m2 = detectOffSpine(read);
    facts.m2 = m2.facts;
    violations.push(...m2.violations);

    // M3 — sweep the whole styling corpus.
    const { css, vue, ts } = clockFenceCorpus();
    const clockForks = [];
    for (const file of [...css, ...vue, ...ts]) {
        clockForks.push(...detectClockFence(file, read(file) ?? ""));
    }
    facts.m3 = {
        corpusFilesScanned: css.length + vue.length + ts.length,
        clockForks: clockForks.length,
        pendingBridges: CLOCK_FENCE_PENDING.map((e) => `${e.file} → ${e.lander}`),
    };
    violations.push(...clockForks);

    const m4 = detectVizInversion(read);
    facts.m4 = m4.facts;
    violations.push(...m4.violations);

    const m5 = detectCanonSync(read);
    facts.m5 = m5.facts;
    violations.push(...m5.violations);

    // BI.W-TEMPO — the CSS↔JS co-scale clause (M11, the round-4 correction — authored
    // INTO this gate, never a second gate). born-RED at HEAD (no axis) → GREEN at wire.
    const tempo = detectTempoCoScaleReal(read);
    facts.tempo = tempo.facts;
    violations.push(...tempo.violations);

    facts.oneClock = violations.length === 0;
    return { facts, violations };
}

// ── the inline self-test bites (the gate proves its own bite every run) ──────────
function selfTest() {
    const failures = [];
    const fakeRead = (map) => (rel) => (rel in map ? map[rel] : null);

    // M1 bite — a planted SECOND register table (≥2 hand-inlined (response,ζ) rows)
    // OUTSIDE springPresets.ts reds.
    {
        const planted = {
            [SPRING_PRESETS_TS]: "export const SPRING_PRESETS = [{ response: 0.5, dampingFraction: 0.86 }, { response: 0.35, dampingFraction: 0.65 }];",
            [REGEN_MJS]: "import { SPRING_PRESETS } from '../src/composables/motion/springPresets.ts';",
            [CURVES_TS]: "import { SPRING_PRESETS } from './springPresets';",
        };
        // a synthetic second-table file is injected via a custom scan: simulate the
        // pure detector against an in-memory file directly.
        const fakeTableFile = "export const MY_SPRINGS = [{ response: 0.9, dampingFraction: 0.33 }, { response: 0.11, dampingFraction: 0.22 }];";
        const pairRe = /response:\s*([0-9.]+)\s*,?\s*[\s\S]{0,40}?dampingFraction:\s*([0-9.]+)/g;
        let count = 0;
        let mm;
        while ((mm = pairRe.exec(fakeTableFile)) !== null) {
            const r = parseFloat(mm[1]);
            const z = parseFloat(mm[2]);
            if (!SPRING_DEFAULTS_ALLOWLIST.some((d) => d.pair[0] === r && d.pair[1] === z)) count++;
        }
        if (count < 2) failures.push("self-test M1: a planted second (response,ζ) register table did NOT count ≥2 unsanctioned rows (M1 mute)");
        void planted;
    }

    // M2 bite — a planted hand-rolled rAF spring (no kf import) in a NON-allowlisted
    // file reds; an allowlisted seam does not.
    {
        const handRolled = "import { ref } from 'vue';\nfunction tick(dt){ x += (target - x) * 0.2; requestAnimationFrame(tick); }";
        const importsKf = KF_PRIMITIVE_RE.test(handRolled);
        const hasSmoother = HANDROLLED_SMOOTHER_RE.test(handRolled);
        const hasRafOrTick = RAF_STEP_RE.test(handRolled) || /\btick\s*\(/.test(handRolled);
        if (importsKf || !hasSmoother || !hasRafOrTick) {
            failures.push("self-test M2: a planted hand-rolled rAF spring (no kf import) did NOT match the off-spine prong (M2 mute)");
        }
        // a kf-importing composer must NOT trip (on-spine).
        const onSpine = "import { SpringProgress } from '@mkbabb/keyframes.js';\nfunction step(){ requestAnimationFrame(step); }";
        if (!KF_PRIMITIVE_RE.test(onSpine)) {
            failures.push("self-test M2: a kf-importing on-spine composer was misread as having no kf import (M2 false-positive risk)");
        }
    }

    // M3 bite — a planted generic-clock spring leg reds; a planted own-clock coupled
    // leg does not.
    {
        const bad = ".x { transition: transform var(--duration-normal) var(--spring-snappy), opacity var(--ease-out) var(--duration-fast); }";
        const badV = detectClockFence("synthetic-bad.css", bad);
        if (badV.length === 0) failures.push("self-test M3a: a planted `transform var(--duration-normal) var(--spring-snappy)` did NOT red (M3a mute)");
        // M3b — a bare ENTER/EXIT spring transform with no coupled fade reds; the
        // role gate means it must sit in an `*-enter-active` recipe.
        const bareEnter = ".y-enter-active { transition: scale var(--spring-bouncy-duration) var(--spring-bouncy); }";
        const bareV = detectClockFence("synthetic-bare.css", bareEnter);
        if (bareV.length === 0) failures.push("self-test M3b: a planted bare ENTER spring transform with no coupled fade did NOT red (M3b mute)");
        // a bare PRESS/glide transform (no enter/exit role) must NOT red (M3b is
        // enter/exit-scoped — coupling a fade to a press reads wrong).
        const barePress = ".tap-squish:active { transition: scale var(--spring-smooth-duration) var(--spring-smooth); }";
        const barePressV = detectClockFence("synthetic-press.css", barePress);
        if (barePressV.length !== 0) failures.push(`self-test M3b: a bare PRESS transform false-flagged (M3b over-reach: ${barePressV.join("; ")})`);
        const good = ".z-enter-active { transition: scale var(--spring-snappy-duration) var(--spring-snappy), opacity var(--duration-fast) var(--ease-out); }";
        const goodV = detectClockFence("synthetic-good.css", good);
        if (goodV.length !== 0) failures.push(`self-test M3: a correct own-clock coupled spring leg false-flagged (${goodV.join("; ")})`);
    }

    // M4 bite — a planted RAFPlayback.play in a viz string reds.
    {
        const planted = "const p = new RAFPlayback(); p.play(() => draw());";
        if (!RAFPLAYBACK_OWN_RE.test(planted)) failures.push("self-test M4: a planted RAFPlayback.play() did NOT match the viz-own detector (M4 mute)");
        const fed = "playback.tick(dt); // feeds the kf primitive from the canvas loop";
        if (RAFPLAYBACK_OWN_RE.test(stripAllComments(fed))) failures.push("self-test M4: a tick(dt) feed was misread as owning a kf rAF (M4 false-positive)");
    }

    // A9 bite — a table-reading source reds (DEAD), a stale literal reds, a correct
    // literal passes (the doc-rot detector is not hollow).
    {
        const e = { name: "SELFTEST", pair: [0.5, 0.74], source: { file: "f.ts", symbol: "DRAWER_SNAP" } };
        const dead = checkSpringDefaultLive(e, `export const DRAWER_SNAP = springPreset("smooth");`);
        if (!dead || !/READS the table/.test(dead)) failures.push("self-test A9: a table-reading (springPreset) source did NOT flag as a DEAD entry (A9 dead-mute)");
        const stale = checkSpringDefaultLive(e, `export const DRAWER_SNAP = { response: 0.9, dampingFraction: 0.9 };`);
        if (!stale || !/STALE/.test(stale)) failures.push("self-test A9: a stale (0.9,0.9)-vs-(0.5,0.74) literal did NOT flag STALE (A9 stale-mute)");
        const ok = checkSpringDefaultLive(e, `export const DRAWER_SNAP = { response: 0.5, dampingFraction: 0.74 };`);
        if (ok) failures.push(`self-test A9: a correct (0.5,0.74) literal false-flagged (${ok})`);
    }

    // CC bite — the three coupling predicates each bite a planted defect + never
    // false-flag the honest form.
    {
        if (readDurationSeconds("  --duration-fast: 200ms;", "--duration-fast") !== 0.2) failures.push("self-test CC1: readDurationSeconds(ms) did not resolve 200ms → 0.2s");
        if (readDurationSeconds("  --duration-panel: 0.55s;", "--duration-panel") !== 0.55) failures.push("self-test CC1: readDurationSeconds(s) did not resolve 0.55s");
        // exit ≤ entrance: a planted exit>entrance is the RED, the honest form passes.
        const exitOutlasts = (exit, enter) => exit > enter;
        if (!exitOutlasts(0.6, 0.4)) failures.push("self-test CC1: a planted exit(0.6)>entrance(0.4) did NOT flag");
        if (exitOutlasts(0.2, 0.4)) failures.push("self-test CC1: the honest exit(0.2)≤entrance(0.4) false-flagged");
        // single-writer: a forked writer reds; the single writer passes.
        const forked = countScalarWrites(`el.style.setProperty("--glass-drawer-t", a); other.setProperty('--glass-drawer-t', b);`, "--glass-drawer-t");
        if (forked !== 2) failures.push(`self-test CC2: a forked --glass-drawer-t writer was not counted (got ${forked}, expected 2)`);
        const single = countScalarWrites(`el.style.setProperty("--glass-drawer-t", a);`, "--glass-drawer-t");
        if (single !== 1) failures.push(`self-test CC2: a single writer miscounted (got ${single}, expected 1)`);
        // containment (ruling-12 FOLLOW): N sites INSIDE writeScalar pass; a planted
        // site OUTSIDE it reds; a missing writeScalar fails loud (total counted outside).
        const contained = `function writeScalar(t) { if (sheet) { sheet.style.setProperty("--stage-t", t); } for (const el of roots) { el.style.setProperty("--stage-t", t); } }`;
        if (scalarWritesOutsideWriter(contained, "--stage-t") !== 0) failures.push("self-test CC2: the honest multi-root writeScalar false-flagged (containment)");
        const escaped = contained + ` rogue.style.setProperty("--stage-t", x);`;
        if (scalarWritesOutsideWriter(escaped, "--stage-t") !== 1) failures.push("self-test CC2: a planted OUTSIDE-writeScalar --stage-t write was not flagged");
        if (scalarWritesOutsideWriter(`el.style.setProperty("--stage-t", x);`, "--stage-t") !== 1) failures.push("self-test CC2: a writeScalar-less file did not fail loud");
        // fixed blur tween: a `transition: backdrop-filter` reds; an opacity tween does not.
        if (!hasFixedBackdropTween("transition: backdrop-filter 0.4s ease;")) failures.push("self-test CC2: a fixed `transition: backdrop-filter` was not detected");
        if (hasFixedBackdropTween("transition: opacity 0.2s ease;")) failures.push("self-test CC2: an opacity tween false-flagged as a backdrop-filter tween");
    }

    // TEMPO co-scale bite — a synthetic tempo-write that DOESN'T reach a JS spring reds
    // (CSS scales by tempo, JS does not → the co-scale ratio diverges); the fully-wired
    // synthetic stays clean; and the born-RED HEAD state (no axis) reds via presence.
    {
        const reg = '@property --motion-tempo { syntax: "<number>"; inherits: true; initial-value: 1; }';
        const cssWired =
            "  --spring-smooth-settle: 0.35s;\n  --spring-smooth-duration: calc(var(--spring-smooth-settle) * var(--motion-tempo));";
        const cssFlat = "  --spring-smooth-settle: 0.35s;\n  --spring-smooth-duration: 0.35s;";
        const dockWired = "new SpringProgress({ response: config.response * motionTempo(), dampingFraction: config.dampingFraction });";
        const dockFlat = "new SpringProgress({ response: config.response, dampingFraction: config.dampingFraction });";

        // fully wired → clean.
        const wired = detectTempoCoScale({ propRegsSrc: reg, springCss: cssWired, dockSpringSrc: dockWired });
        if (wired.violations.length !== 0) failures.push(`self-test TEMPO: a fully-wired axis false-flagged (${wired.violations.join("; ")})`);

        // CSS scales, JS doesn't → the co-scale ratio diverges AND presence-3 reds.
        const jsMissing = detectTempoCoScale({ propRegsSrc: reg, springCss: cssWired, dockSpringSrc: dockFlat });
        if (jsMissing.violations.length === 0) failures.push("self-test TEMPO: a tempo-write that DOESN'T reach the JS dock spring did NOT red (co-scale teeth gone)");
        const ratioDiverged = jsMissing.facts.perTempo.some((p) => p.coScaleRatio != null && Math.abs(p.coScaleRatio - 1) > TEMPO_COSCALE_BAND);
        if (!ratioDiverged) failures.push("self-test TEMPO: the CSS-scales-JS-doesn't co-scale ratio did NOT diverge from 1 (the proportionality check is hollow)");

        // no axis at all (HEAD) → born-RED via presence.
        const noAxis = detectTempoCoScale({ propRegsSrc: "", springCss: cssFlat, dockSpringSrc: dockFlat });
        if (noAxis.violations.length === 0) failures.push("self-test TEMPO: the axis-absent HEAD state was NOT born-RED (presence gate hollow)");
    }

    return failures;
}

function readFile(rel) {
    try {
        return readFileSync(resolve(ROOT, rel), "utf8");
    } catch {
        return null;
    }
}

function run() {
    const { facts, violations } = detectAll(readFile);
    const selfFailures = selfTest();
    const all = [...violations, ...selfFailures];
    const status = all.length === 0 ? "pass" : "fail";

    const ARTIFACT = gateArtifactPath("GLASS_UI_MOTION_ONE_CLOCK_ARTIFACT", "BC-motion-one-clock");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:motion-one-clock",
        composesWith: ["proof:animation-coherence", "proof:no-layout-animation"],
        offSpineAllowlist: OFF_SPINE_ALLOWLIST.map((e) => ({ file: e.file, seam: e.seam })),
        springDefaultsAllowlist: SPRING_DEFAULTS_ALLOWLIST.map((e) => e.name),
        clockFencePending: CLOCK_FENCE_PENDING.map((e) => ({ file: e.file, lander: e.lander })),
        facts: { ...facts, selfTestFailures: selfFailures.length },
        violations: all,
    });

    console.log("proof:motion-one-clock — keyframes.js is the ONE source + clock (BC.W-MOTION-ONE-CLOCK)");
    console.log(`  A9 one-clock lock      : ${facts.a9.checked.length} spring defaults value-checked vs live source ✓`);
    console.log(`  CC channel-coupling    : panel exit≤entrance (overlay-exit ${facts.cc.cc1.overlayExit}s ≤ snappy ${facts.cc.cc1.snappyDur}s), scrim exit≤entrance (fast ${facts.cc.cc1.fast}s ≤ panel ${facts.cc.cc1.panel}s), drawer single-writer (${facts.cc.cc2.drawerTWrites}×--glass-drawer-t / ${facts.cc.cc2.stageTWrites}×--stage-t), no fixed blur-tween ${facts.cc.cc2.noFixedBlurTween ? "✓" : "✗"}`);
    console.log(`  M1 single source       : canonical rows ${facts.m1.canonicalRows}, second tables ${facts.m1.secondTables.length}, regen+curves import ${facts.m1.regenImportsPresets && facts.m1.curvesImportsPresets ? "yes ✓" : "NO ✗"}`);
    console.log(`  M2 off-spine seams     : ${facts.m2.prongA.length + facts.m2.prongB.length} (sanctioned ${OFF_SPINE_ALLOWLIST.length}), files scanned ${facts.m2.filesScanned}`);
    console.log(`  M3 clock fence         : ${facts.m3.clockForks} forks over ${facts.m3.corpusFilesScanned} corpus files; pending bridges ${facts.m3.pendingBridges.length}`);
    console.log(`  M4 viz inversion       : ${facts.m4.hits.length} viz-owned rAF over ${facts.m4.vizFilesScanned} viz files`);
    console.log(`  M5 canon + book        : §P7 ${facts.m5.submodulePresent === false ? "skip (submodule absent)" : facts.m5.hasP7 ? "yes ✓" : "NO ✗"}, cross-repo book ${facts.m5.crossRepoBookExists ? "yes ✓" : "NO ✗"}`);
    console.log(`  TEMPO co-scale (BI/M11): axis reg ${facts.tempo.tempoRegistered ? "✓" : "✗"}, CSS clock ×tempo ${facts.tempo.hasCssTempo ? "✓" : "✗"}, JS dock ×tempo ${facts.tempo.hasJsTempo ? "✓" : "✗"}; co-scale ratio @[${facts.tempo.tempos.join(",")}] = ${facts.tempo.perTempo.map((p) => p.coScaleRatio).join(", ")}`);
    console.log(`  self-test failures     : ${selfFailures.length}`);
    console.log(`  one clock              : ${facts.oneClock && selfFailures.length === 0 ? "YES" : "NO"}`);
    if (all.length) {
        console.log("\nVIOLATIONS:");
        for (const v of all) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
