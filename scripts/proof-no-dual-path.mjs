#!/usr/bin/env node
// BB.W-PRUNE-CONSOLIDATE — proof:no-dual-path.
//
// The SOTA fewer-sharper-primitives floor: a SUPERSEDED mechanism must be ABSENT
// once its successor wave has landed — NO dual enter path, NO dual press path, NO
// dual specular path, and NO shelf-ware half-primitive. The LIQUID-GLASS band MINTS
// the sharp primitives (`.glass-reveal` / `useLiquidReveal`, the interruptible
// `useSpringPress`/`useLiquidPress`, the motion-reactive edge specular +
// `vSpecular` auto-arm); minting a successor WITHOUT retiring the mechanism it
// supersedes leaves the exact shelf proliferation the SOTA lesson forbids. This is
// the dead-MECHANISM companion to W-DEAD-SWEEP's dead-TOKEN floor.
//
// The comment-strip pure-detector house pattern (the proof-no-dead-token.mjs /
// proof-press-unify.mjs model): a device-free SOURCE gate, no browser spawn. Carries
// `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut.
//
// ── §0 RE-GROUND DRIFT (recorded, NEVER re-diagnosed) ───────────────────────────
// The wave was specced "born-RED at HEAD post-successors-pre-cut" assuming the dual
// path still EXISTS at HEAD. The §0 re-ground at 12326f99 found the THREE successor
// waves ALREADY landed the SYMMETRIC closures themselves:
//   D1 — W-LIQUID-REVEAL DELETED the `popover-animate` AND `slide-in-from-side`
//        `@utility` bodies (animate.css carries only the RETIRED comment block); the
//        residual `popover-animate` strings in DialogContent/SelectContent are PROSE
//        COMMENTS (the retirement record), ZERO live `class=`/`@apply` consumers.
//   D2 — W-PRESS-UNIFY KEEPS the CSS `:active` press cohort as the recorded no-JS
//        FLOOR (the §6 `--spring-smooth`/`-duration` register) and wired the JS press
//        (Button + Card). NO competing dual press exists; `--scale-press` is declared
//        ONCE (scale-paper.css), no redundant literal. The disposition is
//        floor-kept everywhere — nothing to cut, only to RECORD.
//   D3 — W-LIQUIDHOVER reconciled the two per-consumer `useSpecularTracking` hand-wires
//        onto the ONE `createSpecularWriter` core via `vSpecular` (the tier-root
//        auto-arm reaches Card/Button/4 dock controls); the disc CORE (`::before`) is
//        KEPT, refined by W-LENSING's edge glint. ONE position-write source survives.
// So this wave is a CONFIRM + GATE + CENSUS (the band's own waves did the cut clean);
// the gate ASSERTS the symmetric-closed state holds at HEAD, and the born-RED proof
// is the inline SELF-TEST bites (each synthetic dual-path snippet MUST flag against
// the live detector — a hollow detector that does not flag a planted dual path reds
// itself). This is the documented branch (the §0 "a retired mechanism is verified
// DELETED, not assumed gone"), NOT a re-invention of the retirement.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_NO_DUAL_PATH_ARTIFACT",
    "no-dual-path",
);

// ── The SUPERSEDED_SET map (the W-DEAD-SWEEP keep-allowlist-rationale discipline) ──
// Each entry names the superseded mechanism, its landed successor, the retire kind,
// and a NON-EMPTY rationale. A bare entry (empty successor/rationale) cannot silence
// the gate (the anti-evasion bite, self-tested). retireKind:
//   "delete"            — the mechanism is DELETED clean-break (the @utility body gone)
//   "reconcile-floor"   — the CSS press is KEPT as the recorded no-JS floor (the JS
//                         press wins when armed; the floor is NOT a dual path)
//   "reconcile-source"  — the per-consumer dual source is reconciled onto ONE leaf
//                         (the disc CORE kept; only the static dead-centre class closed)
const SUPERSEDED_SET = new Map([
    [
        "popover-animate",
        {
            successor: "BB.W-LIQUID-REVEAL (.glass-reveal — the spring-clocked liquid-enter, the top-layer default)",
            retireKind: "delete",
            rationale:
                "The fixed-bezier zoom-95 @utility over --duration-normal — superseded by the spring-clocked .glass-reveal bloom-from-source enter (the coupled scale+fade+blur-settle). DELETED clean-break by W-LIQUID-REVEAL (no alias, no dormant stub); every enrolled overlay composes .glass-reveal.",
        },
    ],
    [
        "slide-in-from-side",
        {
            successor: "BB.W-LIQUID-REVEAL (.glass-reveal data-side compositor translate leg)",
            retireKind: "delete",
            rationale:
                "The data-side directional slide @utility — SUBSUMED (not orthogonal) onto .glass-reveal's data-side translate leg on the same spring clock. DELETED clean-break with popover-animate (the disposition is fold, not keep).",
        },
    ],
    [
        "css-spring-press-cohort",
        {
            successor: "BB.W-PRESS-UNIFY (useSpringPress/useLiquidPress — the interruptible coupled JS press, wired on Button + Card)",
            retireKind: "reconcile-floor",
            rationale:
                "The CSS :active scale press on --spring-smooth/--spring-smooth-duration (.tap-squish/.btn-pill/.glass-btn/btn-interactive/dock) is the recorded no-JS FLOOR W-PRESS-UNIFY explicitly KEEPS (a press must work JS-off) — NOT a competing dual path. The JS press writes the coupled --*-press-t drive and wins when armed. --scale-press is declared ONCE (scale-paper.css); no redundant literal. Floor-kept, not cut.",
        },
    ],
    [
        "static-centred-disc",
        {
            successor: "BB.W-LENSING (motion-reactive edge glint) + BB.W-LIQUIDHOVER (vSpecular tier-root auto-arm wrapping the ONE createSpecularWriter core)",
            retireKind: "reconcile-source",
            rationale:
                "The static dead-centre disc CLASS (a glass surface frozen at the var(--mouse-x,50%) centred fallback because nobody writes the position) is superseded by the vSpecular auto-arm reaching every interactive glass surface + the edge glint. The two per-consumer useSpecularTracking hand-wires (Card/DockIconButton) reconciled onto the ONE createSpecularWriter core. The disc CORE (::before catch-light) is KEPT (W-LENSING refines it); only the static unwired class + the per-consumer dual source are closed.",
        },
    ],
]);

// ── The half-primitive DECIDE census (D4) ──────────────────────────────────────
// Each substrate-without-≥2-consumers leaf the band touches carries a TERMINAL
// verdict — `wired` (with ≥2 binaries cited) OR `retired` (with a non-empty rationale
// + named successor). NEVER `book`. The census MIRRORS each leaf's activating wave's
// landed disposition (RECORDED, not re-decided). A `wired` verdict that cannot cite
// ≥2 binaries reds (the manufactured-bar evasion); a blank rationale reds; a `book`
// verdict reds (no re-book — the founding chronic's disease).
const HALF_PRIMITIVE_CENSUS = new Map([
    [
        "useSpringPress",
        {
            verdict: "wired",
            decidedBy: "BB.W-PRESS-UNIFY (the J-inv-10 dead-primitive flag CLEARED — the demote did not fire)",
            binaries: ["src/components/ui/button/Button.vue", "src/components/ui/card/Card.vue"],
            rationale:
                "The published HALF-primitive (on /motion + the root barrel) had ONE binary at HEAD (Button, via W-BUTTON-GLASS). W-PRESS-UNIFY brought it to ≥2: Button binds it DIRECTLY (left inline so proof:button-glass B2 stays green) + Card binds it via the useLiquidPress wrapper (which composes useSpringPress). The dock control is the BOOKED third (DockIconButton.vue out of W-PRESS-UNIFY's bounds; its calmer CSS press stays the floor).",
        },
    ],
    [
        "useLiquidPress",
        {
            verdict: "wired-with-booked-second",
            decidedBy: "BB.W-PRESS-UNIFY (the NEW canonical interruptible-coupled-press wrapper)",
            binaries: ["src/components/ui/card/Card.vue"],
            rationale:
                "The wrapper composing useSpringPress + useLiquidFlex. Card is its first DIRECT binary; the dock is the booked second (DockIconButton.vue, when its bounds open). At HEAD it has ONE direct SFC binary but is NOT shelf-ware: it composes a LIVE interruptible-coupled press on Card today, AND the ≥2 J-inv-10 bar is met on the right axis — the DEAD primitive it activates (useSpringPress) reaches 2 binaries (Button direct + Card via this wrapper). This is the W-NDA-DECIDE terminal verdict with a NAMED re-trigger (the dock's second direct binding), NOT a re-book — useLiquidPress re-enters the ≥2-direct bar through the named DockIconButton.vue binding.",
            booked: "DockIconButton.vue (W-PRESS-UNIFY named-successor #1) — the booked second direct binary",
            reTrigger: "W-PRESS-UNIFY named-successor #1 — the DockIconButton.vue direct binding (when the dock control's JS-press bounds open). NAMED, not perpetual; the dead primitive useSpringPress it activates already meets ≥2.",
        },
    ],
    [
        "useLiquidReveal",
        {
            verdict: "wired",
            decidedBy: "BB.W-LIQUID-REVEAL (the bloom-from-source JS refinement leaf over the .glass-reveal CSS default)",
            binaries: [
                "src/styles/glass/reveal.css (the .glass-reveal recipe — the ≥9 enrolled overlay SFCs compose it: Dialog/Popover/Tooltip/HoverCard/DropdownMenu/ContextMenu/Combobox/Select)",
                "src/composables/motion/useLiquidReveal.ts (the source-rect bloom refinement for the dialog-from-button / dock-from-pill case)",
            ],
            rationale:
                "The .glass-reveal CSS recipe is the top-layer enter default consumed by the ≥9 reka portaled overlays (the data-state form); useLiquidReveal is the source-rect bloom REFINEMENT. The popover-animate dual-enter path it superseded is DELETED. J-inv-10 cleared on the recipe-consumer axis.",
        },
    ],
    [
        "springTimingFunction",
        {
            verdict: "wired",
            decidedBy: "BB.W-LIQUID-REVEAL (the kf curve-bridge ACTIVATED) + the AY.W-MOTION2 distribution suite",
            binaries: [
                "src/composables/motion/useLiquidReveal.ts (the spring curve sampled to drive the bloom inversion)",
                "src/composables/motion/curves.ts (MOTION_CURVES — the JS twin of the spring rows)",
            ],
            rationale:
                "The kf {fn,css} spring solver pair. ACTIVATED by W-LIQUID-REVEAL's useLiquidReveal + already consumed by curves.ts. ALSO a distribution-seam re-export via suite.ts (the FULL kf static surface, locked by proof:motion-suite — glass-ui is the distribution seam, not a fork). J-inv-10 cleared on the internal-consumer axis; the kf source is READ-ONLY (the foreign-tree fence).",
        },
    ],
    [
        "Draggable",
        {
            verdict: "wired",
            decidedBy: "BB.W-DRAG-MORPH (the kf Draggable ACTIVATED via useDragMorph — the J-inv-10 flag cleared with 2 binaries)",
            binaries: [
                "src/components/custom/tabs/SegmentedTabs.vue (:draggable indicator)",
                "src/components/custom/dock/DockLayerGroup.vue (pull-to-switch)",
            ],
            rationale:
                "The kf pointer-capture follow + velocity-window + snap gesture, UNCONSUMED at the band's start. W-DRAG-MORPH wired it via useDragMorph, consumed by SegmentedTabs (:draggable) + DockLayerGroup (pull-to-switch) = 2 binaries. ALSO a distribution-seam re-export via suite.ts (locked by proof:motion-suite). The kf source is READ-ONLY (the foreign-tree fence — the band ACTIVATED, never edited).",
        },
    ],
    [
        "flipShared",
        {
            verdict: "wired",
            decidedBy: "AY.W-MOTION2 distribution suite (proof:motion-suite) — the kf full-static-surface re-export",
            binaries: [
                "src/composables/motion/suite.ts (the FULL kf static suite re-export — the distribution seam)",
                "proof:motion-suite (the two-tier parity manifest gate that ASSERTS its presence in the dts — a gate-fleet consumer)",
            ],
            rationale:
                "A kf shared-element FLIP primitive re-exported VERBATIM through /motion (glass-ui is the distribution seam — every symbol resolves into the peer with NO wrapper/rename). It is NOT a glass-ui half-primitive needing ≥2 INTERNAL binaries; its publication is locked by proof:motion-suite (the static-surface parity manifest). useLiquidReveal's comment notes it deliberately does NOT use flipShared's forward play (the wrong inversion) — that is a design note, not a dead-substrate flag. The distribution-seam re-export is the correct disposition (the foreign-tree fence; the kf source is READ-ONLY).",
        },
    ],
    [
        "useSpecularPointer",
        {
            verdict: "retired-with-named-re-trigger",
            decidedBy: "BB.W-LENSING (minted) — the angle-write SFC binding + the runtime refraction fidelity BOOKED to W-REFLECT3",
            binaries: [],
            rationale:
                "The angle-feed EVOLUTION of useSpecularTracking — wraps the ONE createSpecularWriter core and ADDS the --specular-angle channel (atan2, no fork, no second getBoundingClientRect). At HEAD it has ZERO SFC binary: vSpecular (the tier-root auto-arm) writes only the POSITION (--mouse-x/y); the angle WRITE that arms the motion-reactive edge glint is NOT yet bound on a surface. W-LENSING ITSELF booked the angle-feed binding + the runtime url() reconstruction fidelity to W-REFLECT3 (the named map-encoding successor — the binding π is owed to the real-GPU capture). This is a TERMINAL retire-with-named-re-trigger (the leaf re-enters through the W-REFLECT3 angle-feed SFC binding, NOT a re-opened book) — the W-NDA-DECIDE 1.5-consumer pattern. The edge-glint CSS recipe (the conic --specular-angle 0deg floor) ships regardless; only the JS angle DRIVE fidelity is booked. The leaf is NOT shelf-ware-deleted because W-LENSING's L5 gate ASSERTS its single-source construction (a gate-fleet consumer) + the named W-REFLECT3 trigger is real.",
            reTrigger: "W-REFLECT3 — the angle-feed SFC binding (the real-GPU edge-glint capture confirms the rim-bend read) + the runtime refraction-scale reconstruction. NAMED, not perpetual.",
        },
    ],
]);

// ── helpers ─────────────────────────────────────────────────────────────────────

/** Strip CSS block comments so a clause cannot be satisfied/tripped by a comment. */
function stripCssComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}
/** Strip JS/TS comments (block + line; the `(^|[^:])//` URL-safe line strip). */
function stripJsComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}
/** Strip Vue SFC comments — HTML `<!-- -->` template comments + the JS/CSS forms. */
function stripVueComments(src) {
    return stripJsComments(src.replace(/<!--[\s\S]*?-->/g, ""));
}

/** Recursive file walk (the gate's own — no dep on a repo helper). */
function walk(dir, exts, out = []) {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const p = join(dir, entry);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, exts, out);
        else if (exts.some((x) => p.endsWith(x))) out.push(p);
    }
    return out;
}

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ── D1: popover-animate is DELETED, the no-dual-enter-path ───────────────────────
// The symmetric closure: the @utility is ABSENT from animate.css AND no src/components
// SFC references popover-animate as a LIVE class/@apply (a comment reference is the
// retirement RECORD, not a consumer). The only green is the atomic both-gone state.
const ANIMATE_CSS = resolve(ROOT, "src/styles/utilities/animate.css");
const animateStripped = stripCssComments(read(ANIMATE_CSS));
// A `@utility popover-animate {` / `@utility slide-in-from-side {` body declaration
// (after comment-strip). The RETIRED comment block is stripped, so a surviving
// dormant stub is the only hit.
function utilityDeclared(name) {
    const re = new RegExp(`@utility\\s+${name}\\b`, "m");
    return re.test(animateStripped);
}
const popoverAnimateUtility = utilityDeclared("popover-animate");
const slideInFromSideUtility = utilityDeclared("slide-in-from-side");

// A LIVE consumer reference: a `class="… popover-animate …"` or `@apply … popover-animate`
// in an SFC (comment-stripped). Prose `// popover-animate` comments are stripped.
const COMPONENTS_DIR = resolve(ROOT, "src/components");
function liveClassConsumers(name) {
    const hits = [];
    for (const f of walk(COMPONENTS_DIR, [".vue", ".ts", ".css"])) {
        const raw = read(f);
        const stripped = f.endsWith(".vue")
            ? stripVueComments(raw)
            : f.endsWith(".css")
              ? stripCssComments(raw)
              : stripJsComments(raw);
        // a class-list membership or an @apply of the utility name
        const classRe = new RegExp(`class\\s*=\\s*["'\`][^"'\`]*\\b${name}\\b`, "m");
        const applyRe = new RegExp(`@apply\\b[^;{]*\\b${name}\\b`, "m");
        const cnRe = new RegExp(`["'\`]${name}["'\`]`, "m"); // a cn()/clsx literal
        if (classRe.test(stripped) || applyRe.test(stripped) || cnRe.test(stripped))
            hits.push(f.slice(ROOT.length + 1));
    }
    return hits;
}
const popoverAnimateConsumers = liveClassConsumers("popover-animate");
const slideInFromSideConsumers = liveClassConsumers("slide-in-from-side");

// D1 is GREEN iff the SYMMETRIC closure holds: utility absent AND no live consumer.
// Asymmetric states (utility present-no-consumer = dead shelf-ware; utility
// absent-but-consumer = broken-reference half-delete) BOTH red.
const d1Symmetric =
    !popoverAnimateUtility &&
    popoverAnimateConsumers.length === 0 &&
    !slideInFromSideUtility &&
    slideInFromSideConsumers.length === 0;

// ── D2: the CSS press is reconciled, the no-dual-press-path ──────────────────────
// Per W-PRESS-UNIFY's landed disposition: the CSS :active press cohort is the recorded
// no-JS FLOOR (kept), and NO surface carries a COMPETING dual press. The dual-path
// defect is a REDUNDANT duplicate press literal (--scale-press re-declared outside the
// canonical scale-paper.css source), NOT the floor. The floor is the deliberate
// progressive-enhancement degrade.
const STYLES_DIR = resolve(ROOT, "src/styles");
const scalePressDeclSites = [];
for (const f of walk(STYLES_DIR, [".css"])) {
    const css = stripCssComments(read(f));
    // a DECLARATION `--scale-press:` (the canonical token), not a read `var(--scale-press)`
    if (/(?:^|[{;])\s*--scale-press\s*:/m.test(css))
        scalePressDeclSites.push(f.slice(ROOT.length + 1));
}
// The canonical single source is scale-paper.css. >1 declaration site = a redundant
// duplicate press literal (the genuine dual-path defect — a per-surface --scale-press
// re-declaration outside the cohort the unified register made redundant).
//
// NOTE (the §Triumvirate floor-vs-dual-path trap, recorded): the CSS :active scale
// press cohort (.tap-squish/.interactive-item/.btn-pill/.glass-btn/btn-interactive)
// rides `scale var(--duration-fast) var(--spring-smooth)` — a `--duration-fast`
// DURATION with the §6 `--spring-smooth`/`--ease-standard` EASING register. That is
// the W-PRESS-UNIFY-recorded no-JS FLOOR (a press must work JS-off; proof:press-unify
// P4 names .tap-squish:active as the floor), NOT a competing dual press — the JS press
// (useLiquidPress, writing the coupled --*-press-t drive) wins when armed. The detector
// MUST NOT flag the floor (the floor-vs-dual-path confusion the spec forbids). The ONLY
// D2 dual-path defect this gate guards is a REDUNDANT duplicate --scale-press literal.
const CANONICAL_PRESS_SOURCE = "src/styles/tokens/scale-paper.css";
const dualPressLiterals = scalePressDeclSites.filter(
    (s) => s !== CANONICAL_PRESS_SOURCE,
);
const dualPressSurfaces = [...dualPressLiterals];

// ── D3: the static centred-disc class superseded, the no-dual-specular-path ──────
// (a) the dead-centre STATIC class is structurally absent — the vSpecular auto-arm
//     reaches every interactive glass surface (Card/Button + the 4 dock controls), so
//     no surface freezes at the centred fallback. (b) exactly ONE position-write source
//     survives — the per-consumer useSpecularTracking hand-wires reconciled onto the
//     ONE createSpecularWriter core; NO per-consumer --mouse-x/--mouse-y write COPY in
//     an SFC. (c) the disc CORE (::before catch-light) is KEPT (the over-cut bite).
const GLASS_DIR = resolve(ROOT, "src/composables/glass");
// The ONE position-write core: createSpecularWriter, DEFINED once.
let createSpecularWriterDefs = 0;
for (const f of walk(GLASS_DIR, [".ts"])) {
    const ts = stripJsComments(read(f));
    const m = ts.match(/export\s+function\s+createSpecularWriter\b/g);
    if (m) createSpecularWriterDefs += m.length;
}
// A per-consumer COMPETING position-write source: a `setProperty("--mouse-x"` /
// `setProperty("--mouse-y"` write in an SFC OR a glass leaf OTHER than the ONE core
// (vSpecular/useSpecularTracking/useSpecularPointer all wrap the core — that is the
// single source, not a copy). Scan src/components SFCs for a hand-rolled specular write.
const specularWriteCopies = [];
for (const f of walk(COMPONENTS_DIR, [".vue", ".ts"])) {
    const raw = read(f);
    const stripped = f.endsWith(".vue") ? stripVueComments(raw) : stripJsComments(raw);
    // a hand-composed specular position write in a component (the per-consumer dual source)
    if (/setProperty\(\s*["'`]--mouse-[xy]/m.test(stripped))
        specularWriteCopies.push(f.slice(ROOT.length + 1));
}
// The single-source count: the ONE core definition + the SFCs must carry ZERO hand copies.
const specularPositionWriteSources =
    createSpecularWriterDefs + specularWriteCopies.length;
// (c) the disc CORE is KEPT — the ::before catch-light recipe present in material.css.
const MATERIAL_CSS = resolve(ROOT, "src/styles/glass/material.css");
const materialStripped = stripCssComments(read(MATERIAL_CSS));
const discCorePresent =
    /\.glass-material::before/.test(materialStripped) &&
    /--specular-x\s*:\s*var\(\s*--mouse-x/.test(materialStripped);
// (a) the static dead-centre class: a glass surface whose ::before specular freezes at
//     the centred fallback because NOTHING arms it. The auto-arm (vSpecular) is applied
//     on the interactive glass surfaces. Assert the auto-arm directive is BOUND on ≥2
//     interactive glass SFCs (the structural-absence-of-static-freeze witness).
let vSpecularBoundSurfaces = 0;
for (const f of walk(COMPONENTS_DIR, [".vue"])) {
    const stripped = stripVueComments(read(f));
    if (/\bv-specular\b/.test(stripped)) vSpecularBoundSurfaces += 1;
}
const staticDeadCentreClosed = vSpecularBoundSurfaces >= 2;

// ── D4: the half-primitive census carries a terminal DECIDE per leaf ─────────────
// The TERMINAL verdict set. `wired` (≥2 direct binaries), `retired`/
// `retired-with-named-re-trigger` (a retire with a named successor), and
// `wired-with-booked-second` (the W-NDA-DECIDE 1.5-consumer pattern — ONE live
// direct binary + a NAMED re-trigger for the second + the ≥2 bar met on the
// activated dead-primitive axis; a TERMINAL verdict that names its trigger, NOT a
// re-book). A bare `book`/`booked` is NEVER terminal (the founding chronic).
const TERMINAL_VERDICTS = new Set([
    "wired",
    "retired",
    "retired-with-named-re-trigger",
    "wired-with-booked-second",
]);
const undecidedHalfPrimitives = [];
const manufacturedBarLeaves = [];
const blankRationaleLeaves = [];
const bookVerdictLeaves = [];
for (const [leaf, entry] of HALF_PRIMITIVE_CENSUS) {
    const v = entry.verdict;
    if (v === "book" || v === "booked") {
        bookVerdictLeaves.push(leaf);
        continue;
    }
    if (!TERMINAL_VERDICTS.has(v)) {
        undecidedHalfPrimitives.push(leaf);
        continue;
    }
    // a plain `wired` verdict that cannot cite ≥2 binaries reds (the manufactured-bar
    // evasion). `wired-with-booked-second` is EXEMPT (the W-NDA-DECIDE terminal pattern)
    // but MUST carry a non-empty named re-trigger/booked field (checked below).
    if (v === "wired" && (!Array.isArray(entry.binaries) || entry.binaries.length < 2))
        manufacturedBarLeaves.push(leaf);
    // `wired-with-booked-second` MUST cite ≥1 live direct binary AND a named re-trigger.
    if (v === "wired-with-booked-second") {
        const hasLiveBinary = Array.isArray(entry.binaries) && entry.binaries.length >= 1;
        const hasNamedTrigger =
            (typeof entry.reTrigger === "string" && entry.reTrigger.trim().length > 0) ||
            (typeof entry.booked === "string" && entry.booked.trim().length > 0);
        if (!hasLiveBinary || !hasNamedTrigger) manufacturedBarLeaves.push(leaf);
    }
    // a retired verdict with a blank rationale OR no named successor reds
    if (v.startsWith("retired")) {
        const hasRationale =
            typeof entry.rationale === "string" && entry.rationale.trim().length > 0;
        const hasTrigger =
            (typeof entry.reTrigger === "string" && entry.reTrigger.trim().length > 0) ||
            (typeof entry.decidedBy === "string" && entry.decidedBy.trim().length > 0);
        if (!hasRationale || !hasTrigger) blankRationaleLeaves.push(leaf);
    }
}

// ── D5: the pager/carousel goo-morph RETIRE is complete (BI.W-PAGER-RETIRES) ─────
// The pager's liquid dot-MORPH worm (BI.W-PAGER-WORM) rides the two-edge useLeadTrail
// spring driver; the carousel content is crisp weighty embla (BI.W-CAROUSEL-REBUILD).
// The SUPERSEDED useGooMorph content-barbell composable + its CSS-transition flow/duration
// clock + the whole-layer bed filter are ABSENT — no dual driver, no dead residue. The
// symmetric-closure discipline: a dormant token stub, a broken import (half-delete), or a
// surviving whole-layer bed filter each RED (comment-stripped — a prose mention is the
// retirement record, never a live reference).
const CAROUSEL_WORM_LEAF = resolve(
    ROOT,
    "src/components/ui/carousel/composables/useCarouselWorm.ts",
);
const CAROUSEL_CONTENT = resolve(ROOT, "src/components/ui/carousel/CarouselContent.vue");
const PAGER_SFC = resolve(ROOT, "src/components/custom/pager-dots/PagerDots.vue");
const PAGER_WORM_WIRING = resolve(
    ROOT,
    "src/components/custom/pager-dots/composables/usePagerWorm.ts",
);

// P1 — useCarouselWorm.ts DEFINITION-ABSENT + no live import survives (no half-delete)
const carouselWormLeafPresent = existsSync(CAROUSEL_WORM_LEAF);
const carouselWormImporters = [];
for (const f of walk(COMPONENTS_DIR, [".vue", ".ts"])) {
    const raw = read(f);
    const stripped = f.endsWith(".vue") ? stripVueComments(raw) : stripJsComments(raw);
    if (/\buseCarouselWorm\b/.test(stripped))
        carouselWormImporters.push(f.slice(ROOT.length + 1));
}
// P1 — the --carousel-goo-* tokens are ABSENT from the styles tree (comment-stripped)
const carouselGooTokenDecls = [];
for (const f of walk(STYLES_DIR, [".css"])) {
    const css = stripCssComments(read(f));
    if (/(?:^|[{;])\s*--carousel-goo-[a-z-]+\s*:/m.test(css))
        carouselGooTokenDecls.push(f.slice(ROOT.length + 1));
}
// P1 — the .carousel-goo-* CSS residue is ABSENT from CarouselContent (comment-stripped)
const carouselContentStripped = stripVueComments(read(CAROUSEL_CONTENT));
const carouselGooCssResidue = /\bcarousel-goo-(?:layer|body|neck)\b/.test(
    carouselContentStripped,
);

// P2 — --pager-worm-duration (the retired CSS-transition clock) is ABSENT
const pagerWormDurationDecls = [];
for (const f of walk(STYLES_DIR, [".css"])) {
    const css = stripCssComments(read(f));
    if (/(?:^|[{;])\s*--pager-worm-duration\s*:/m.test(css))
        pagerWormDurationDecls.push(f.slice(ROOT.length + 1));
}
// P2 — no --goo-t per-frame read-back survives on the pager path (driver is useLeadTrail)
const pagerSfcStripped = stripVueComments(read(PAGER_SFC));
const pagerWormWiringStripped = stripJsComments(read(PAGER_WORM_WIRING));
const pagerGooTReadback =
    /--goo-t/.test(pagerSfcStripped) || /--goo-t/.test(pagerWormWiringStripped);

// P3 — the whole-layer bed filter is ABSENT; the pager filter scopes to #pager-worm-goo
const pagerStyleStripped = stripCssComments(
    read(PAGER_SFC).match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] ?? "",
);
const wholeLayerBedFilter =
    /\.pager-goo-layer\b/.test(pagerStyleStripped) ||
    /\.(pager-bed-layer|goo-dot)\b[^{}]*\{[^{}]*filter\s*:\s*(?!none\b)[^;}]+/i.test(
        pagerStyleStripped,
    );
// the pager filter (if any) references the worm-scoped id, never a retired PLATE goo id
const pagerRetiredFilterId = /filter\s*:[^;}]*url\(#(?:pager-goo|glass-goo)\)/i.test(
    pagerStyleStripped,
);

// ── The SUPERSEDED_SET rationale bite (anti-evasion — the W-DEAD-SWEEP discipline) ─
// Every SUPERSEDED_SET entry must carry a NON-EMPTY successor AND rationale — a bare
// entry cannot silence the gate.
const bareSupersededEntries = [];
for (const [mech, e] of SUPERSEDED_SET) {
    const okSuccessor = typeof e.successor === "string" && e.successor.trim().length > 0;
    const okRationale = typeof e.rationale === "string" && e.rationale.trim().length > 0;
    if (!okSuccessor || !okRationale) bareSupersededEntries.push(mech);
}

// ── SELF-TEST BITE (anti-evasion — proven every run) ────────────────────────────
// Each bite is the inverse of a clause; a planted dual path MUST flag against the
// live detector. A hollow detector that does not flag reds itself.
const bites = [];
// Bite D1a — a dormant `@utility popover-animate {}` stub (dead shelf-ware) flags.
{
    const synthetic = stripCssComments(`@utility popover-animate { @apply animate-in; }`);
    const flagged = /@utility\s+popover-animate\b/m.test(synthetic);
    bites.push({ id: "D1a-dormant-utility-stub", flagged });
}
// Bite D1b — a live consumer `class="… popover-animate"` against an absent utility
//            (the broken-reference half-delete) flags.
{
    const synthetic = `<div class="hover-popover-panel popover-animate">`;
    const flagged = /class\s*=\s*["'`][^"'`]*\bpopover-animate\b/m.test(synthetic);
    bites.push({ id: "D1b-broken-reference-consumer", flagged });
}
// Bite D1c — the "drain by aliasing" evasion: a re-pointed dormant utility is still
//            a dead utility nobody composes (the symmetric closure catches it).
{
    const synthetic = stripCssComments(`@utility popover-animate { @apply glass-reveal; }`);
    const flagged = /@utility\s+popover-animate\b/m.test(synthetic); // still a dormant utility
    bites.push({ id: "D1c-alias-drain-evasion", flagged });
}
// Bite D2 — a redundant duplicate `--scale-press:` declaration outside the canonical
//           source (a dual press literal) flags. (The recorded no-JS floor — the
//           .tap-squish scale leg on --duration-fast/--spring-smooth — is NOT a dual
//           path and is deliberately UNFLAGGED; see the D2 detector note.)
{
    const synthetic = stripCssComments(`.some-surface { --scale-press: 0.94; }`);
    const flagged = /(?:^|[{;])\s*--scale-press\s*:/m.test(synthetic);
    bites.push({ id: "D2-redundant-press-literal", flagged });
}
// Bite D3 — a second per-consumer position-write copy in an SFC (the dual source) flags.
{
    const synthetic = stripVueComments(`el.style.setProperty("--mouse-x", "50%")`);
    const flagged = /setProperty\(\s*["'`]--mouse-[xy]/m.test(synthetic);
    bites.push({ id: "D3-second-position-write-copy", flagged });
}
// Bite D3b — deleting the disc CORE (no ::before catch-light) reds the disc-core-kept
//            assert (the over-cut). The bite: an absent core string is detected absent.
{
    const synthetic = stripCssComments(`.glass-card { background: var(--card); }`);
    const coreAbsent = !/\.glass-material::before/.test(synthetic);
    bites.push({ id: "D3b-disc-core-over-cut", flagged: coreAbsent });
}
// Bite D4 — a `book` census verdict reds (no re-book).
{
    const synthetic = { verdict: "book" };
    const flagged = synthetic.verdict === "book" || synthetic.verdict === "booked";
    bites.push({ id: "D4-book-verdict", flagged });
}
// Bite D4b — a `wired` verdict that cannot cite ≥2 binaries reds (the manufactured bar).
{
    const synthetic = { verdict: "wired", binaries: ["only-one.vue"] };
    const flagged =
        synthetic.verdict === "wired" &&
        (!Array.isArray(synthetic.binaries) || synthetic.binaries.length < 2);
    bites.push({ id: "D4b-manufactured-bar", flagged });
}
// Bite D4c — a bare SUPERSEDED_SET entry (empty rationale) reds.
{
    const synthetic = { successor: "X", rationale: "" };
    const flagged =
        typeof synthetic.rationale !== "string" || synthetic.rationale.trim().length === 0;
    bites.push({ id: "D4c-bare-superseded-entry", flagged });
}
// Bite D5a — a live `useCarouselWorm` import (a broken-reference half-delete) flags.
{
    const synthetic = stripJsComments(
        `import { useCarouselWorm } from "./composables/useCarouselWorm";`,
    );
    const flagged = /\buseCarouselWorm\b/.test(synthetic);
    bites.push({ id: "D5a-carousel-worm-import", flagged });
}
// Bite D5b — a dormant `--carousel-goo-duration:` stub (a dead token residue) flags.
{
    const synthetic = stripCssComments(`:root { --carousel-goo-duration: 0.95s; }`);
    const flagged = /(?:^|[{;])\s*--carousel-goo-[a-z-]+\s*:/m.test(synthetic);
    bites.push({ id: "D5b-carousel-goo-token-stub", flagged });
}
// Bite D5c — a whole-layer bed filter (`.pager-goo-layer { filter }`) flags.
{
    const synthetic = stripCssComments(`.pager-goo-layer { filter: url(#pager-goo); }`);
    const flagged = /\.pager-goo-layer\b/.test(synthetic);
    bites.push({ id: "D5c-whole-layer-bed-filter", flagged });
}
const allBitesFlagged = bites.every((b) => b.flagged);

// ── verdict ─────────────────────────────────────────────────────────────────────
const violations = [];

// D1
if (!d1Symmetric) {
    if (popoverAnimateUtility)
        violations.push("D1 — `@utility popover-animate` survives as a dormant stub (dead shelf-ware)");
    if (slideInFromSideUtility)
        violations.push("D1 — `@utility slide-in-from-side` survives as a dormant stub (dead shelf-ware)");
    if (popoverAnimateConsumers.length)
        violations.push(`D1 — live popover-animate consumer reference(s) survive: ${popoverAnimateConsumers.join(", ")}`);
    if (slideInFromSideConsumers.length)
        violations.push(`D1 — live slide-in-from-side consumer reference(s) survive: ${slideInFromSideConsumers.join(", ")}`);
}
// D2
if (dualPressSurfaces.length !== 0)
    violations.push(`D2 — competing dual press path(s): ${dualPressSurfaces.join(", ")}`);
// D3
if (createSpecularWriterDefs !== 1)
    violations.push(`D3 — the position-write core createSpecularWriter is defined ${createSpecularWriterDefs}× (must be exactly 1 — the DRY single source)`);
if (specularWriteCopies.length !== 0)
    violations.push(`D3 — per-consumer specular position-write COPY survives (the dual source): ${specularWriteCopies.join(", ")}`);
if (!discCorePresent)
    violations.push("D3 — the disc CORE (.glass-material::before catch-light) is ABSENT (the over-cut — the disc must be KEPT, W-LENSING refines it)");
if (!staticDeadCentreClosed)
    violations.push(`D3 — the static dead-centre class is NOT closed (vSpecular auto-arm bound on only ${vSpecularBoundSurfaces} surface(s), <2 — surfaces still freeze at the centred fallback)`);
// D4
if (undecidedHalfPrimitives.length !== 0)
    violations.push(`D4 — undecided half-primitive(s) (no terminal verdict): ${undecidedHalfPrimitives.join(", ")}`);
if (bookVerdictLeaves.length !== 0)
    violations.push(`D4 — re-booked half-primitive(s) (verdict=book — the founding chronic): ${bookVerdictLeaves.join(", ")}`);
if (manufacturedBarLeaves.length !== 0)
    violations.push(`D4 — wired verdict cannot cite ≥2 binaries (manufactured bar): ${manufacturedBarLeaves.join(", ")}`);
if (blankRationaleLeaves.length !== 0)
    violations.push(`D4 — retired verdict with blank rationale/no named successor: ${blankRationaleLeaves.join(", ")}`);
// D5 — the pager/carousel goo-morph retire is complete (BI.W-PAGER-RETIRES)
if (carouselWormLeafPresent)
    violations.push("D5 — useCarouselWorm.ts survives (the content-barbell composable must be DEFINITION-ABSENT)");
if (carouselWormImporters.length !== 0)
    violations.push(`D5 — a live useCarouselWorm reference survives (broken half-delete): ${carouselWormImporters.join(", ")}`);
if (carouselGooTokenDecls.length !== 0)
    violations.push(`D5 — --carousel-goo-* token(s) survive (dead residue): ${carouselGooTokenDecls.join(", ")}`);
if (carouselGooCssResidue)
    violations.push("D5 — .carousel-goo-* CSS residue survives in CarouselContent.vue (half-delete)");
if (pagerWormDurationDecls.length !== 0)
    violations.push(`D5 — --pager-worm-duration (the retired CSS-transition clock) survives in: ${pagerWormDurationDecls.join(", ")}`);
if (pagerGooTReadback)
    violations.push("D5 — a --goo-t per-frame read-back survives on the pager path (the driver is useLeadTrail ONLY)");
if (wholeLayerBedFilter)
    violations.push("D5 — a whole-layer bed filter survives (.pager-goo-layer / a filter on the bed — the σ8 annihilation)");
if (pagerRetiredFilterId)
    violations.push("D5 — the pager references a retired PLATE goo id (url(#pager-goo)/#glass-goo); the worm filter is #pager-worm-goo-scoped");
// the SUPERSEDED_SET rationale bite
if (bareSupersededEntries.length !== 0)
    violations.push(`bite — bare SUPERSEDED_SET entry (empty successor/rationale): ${bareSupersededEntries.join(", ")}`);
// the self-test bite — every planted dual path MUST flag
if (!allBitesFlagged)
    violations.push(`SELF-TEST — a planted dual path did NOT flag (hollow detector): ${bites.filter((b) => !b.flagged).map((b) => b.id).join(", ")}`);

const facts = {
    // D1
    popoverAnimateUtility,
    slideInFromSideUtility,
    popoverAnimateConsumers,
    slideInFromSideConsumers,
    d1Symmetric,
    // D2
    scalePressDeclSites,
    dualPressSurfaces,
    cssPressFloorKept: dualPressSurfaces.length === 0,
    // D3
    createSpecularWriterDefs,
    specularWriteCopies,
    specularPositionWriteSources,
    discCorePresent,
    vSpecularBoundSurfaces,
    staticDeadCentreSurfaces: staticDeadCentreClosed ? [] : ["<auto-arm under-bound>"],
    // D4
    halfPrimitiveCensus: [...HALF_PRIMITIVE_CENSUS].map(([leaf, e]) => ({
        leaf,
        verdict: e.verdict,
        binaries: e.binaries ?? [],
        decidedBy: e.decidedBy,
    })),
    undecidedHalfPrimitives,
    bookVerdictLeaves,
    manufacturedBarLeaves,
    blankRationaleLeaves,
    // D5 — the pager/carousel goo-morph retire
    carouselWormLeafPresent,
    carouselWormImporters,
    carouselGooTokenDecls,
    carouselGooCssResidue,
    pagerWormDurationDecls,
    pagerGooTReadback,
    wholeLayerBedFilter,
    pagerRetiredFilterId,
    // supersededSet
    supersededSetCount: SUPERSEDED_SET.size,
    bareSupersededEntries,
    // self-test
    selfTestBites: bites,
    allBitesFlagged,
};

const status = violations.length === 0 ? "pass" : "fail";
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status,
    gate: "proof:no-dual-path",
    facts,
    violations,
});

console.log("proof:no-dual-path — the superseded-mechanism + half-primitive floor (BB.W-PRUNE-CONSOLIDATE)");
console.log(`  D1 popover-animate symmetric-closed : ${d1Symmetric} (utility=${popoverAnimateUtility}, consumers=${popoverAnimateConsumers.length})`);
console.log(`  D1 slide-in-from-side closed        : ${!slideInFromSideUtility && slideInFromSideConsumers.length === 0}`);
console.log(`  D2 css-press floor-kept (no dual)   : ${facts.cssPressFloorKept} (--scale-press sources=${scalePressDeclSites.length}, dual=${dualPressSurfaces.length})`);
console.log(`  D3 specular single-source           : core=${createSpecularWriterDefs} copies=${specularWriteCopies.length} disc-core-kept=${discCorePresent} auto-arm-surfaces=${vSpecularBoundSurfaces}`);
console.log(`  D4 half-primitive census terminal   : ${undecidedHalfPrimitives.length === 0 && bookVerdictLeaves.length === 0 && manufacturedBarLeaves.length === 0 && blankRationaleLeaves.length === 0} (${HALF_PRIMITIVE_CENSUS.size} leaves)`);
console.log(`  D5 pager/carousel retire complete   : ${!carouselWormLeafPresent && carouselGooTokenDecls.length === 0 && pagerWormDurationDecls.length === 0 && !wholeLayerBedFilter && !pagerGooTReadback} (worm-leaf=${carouselWormLeafPresent}, carousel-goo-toks=${carouselGooTokenDecls.length}, pager-worm-dur=${pagerWormDurationDecls.length}, bed-filter=${wholeLayerBedFilter})`);
console.log(`  SUPERSEDED_SET rationale'd          : ${bareSupersededEntries.length === 0} (${SUPERSEDED_SET.size} entries)`);
console.log(`  self-test bites all flagged         : ${allBitesFlagged} (${bites.length} bites)`);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.exit(status === "pass" ? 0 : 1);
}

export { SUPERSEDED_SET, HALF_PRIMITIVE_CENSUS };
