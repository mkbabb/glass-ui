#!/usr/bin/env node
// proof:dock-fission — BE.W-DOCK-FISSION — the n-ary detach orchestrator + the per-context
// goo-SIGNATURE + the pointer-reactive seam-tension floors.
//
// Device-free SOURCE arm ["local","ci","release"]. The BINDING painted truth is the π
// readback tests-visual/dock-fission.spec.ts + the W-DOCK-FISSION-DELTA (the per-context
// detach frame-series, the seam-tension resist, the PRM single-paint, box-INVIOLATE, both
// modes) — the orchestrator's, NOT this gate alone (the BC anti-disease law: no
// source-green close).
//
// BORN-RED anchor (verified on disk at spec time): `useDockFission`/`DockGooFilter` +
// `--dock-split-t` + `fission-bridge.css` ABSENT; this script ABSENT → born-RED by
// construction. The clauses drive born-RED→GREEN at the build.
//
//   F1 — the n-ary detach rides ONE SpringProgress writing --dock-split-t off
//        DOCK_SPRING/--spring-dock (no new spring family — assert the import + that NO
//        bespoke spring constant is minted in the orchestrator).
//   F2 — bidirectional re-merge (the split is reversible on the SAME scalar — both
//        directions wired, not split-only: split()/merge() both flip the ONE target).
//   F3 — the PER-CONTEXT goo-SIGNATURE is a descriptor-driven FLOOR (search=radial /
//        media=lateral / nav=inward-merge each present in the signature MAP, NOT three
//        hardcoded code paths).
//   F4 — POINTER-REACTIVE SEAM-TENSION is a FLOOR (the --seam-tension scalar wired off
//        usePointerVelocityField from INSIDE the driver's loop — NO second rAF, the cap
//        present).
//   F5 — PRM=instant (the prefersReducedMotion() seat-synchronously branch + field.tick(0)
//        present).
//   F6 — compositor-only by construction (the fission CSS animates ONLY
//        transform/clip-path/opacity/filter/--* — leans on proof:no-layout-animation for
//        the library-wide floor; here we assert NO animated layout property in
//        fission-bridge.css).
//
// Self-test bites (each planted defect MUST red, the proof-dock-stack-rail selfTests
// pattern): (a) a piece transition writing a second bespoke @keyframes/transition clock →
// F1; (b) a uni-directional-only fission (split with no re-merge) → F2; (c) a per-context
// hardcoded literal silhouette (not signature-driven) → F3; (d) a fission piece writing a
// SECOND rAF for the pointer field → F4; (e) a piece transition animating a LAYOUT axis →
// F6.
//
// Run: node scripts/proof-dock-fission.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-fission";

const FISSION_TS =
    "src/components/custom/dock/composables/useDockFission.ts";
// BG.W-DOCK-FISSION-WIRE — the fission SIGNATURE data (the DOCK_SPLIT_SIGNATURES MAP +
// placement vectors) carved into this colocated leaf (the no-god-module drain). The F3
// map-presence asserts FOLLOW the carve into the leaf; the orchestrator READS the
// descriptor (F3 read-check stays on FISSION_TS). The dock CSS assembly (goo NECK +
// island) likewise carved into fission-island.css, @import-ed into the SAME layer.
const FISSION_SIGNATURES_TS =
    "src/components/custom/dock/composables/dockFissionSignatures.ts";
const FISSION_ISLAND_CSS = "src/styles/dock/fission-island.css";
const RAIL_PROJECTION_TS =
    "src/components/custom/dock/composables/railProjection.ts";
const DOCK_SPRING_TS = "src/components/custom/dock/composables/useDockSpring.ts";
const FISSION_CSS = "src/styles/dock/fission-bridge.css";
// P7 unified GlassGooFilter + DockGooFilter + the inline showcase/pager mounts into ONE
// GooFilter.vue (the DRY win — a single goo <filter> graph; the per-scale presets carry
// the `dock-fission-goo` id the dock fission consumes). The mount-presence + Safari-floor
// witness follows the unification into the shared component.
const GOO_FILTER = "src/components/custom/goo-filter/GooFilter.vue";

function readRel(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip /* */ + // comments so a detector matches CODE, not prose (the house pure-detector
// idiom). A naive strip is fine for our CSS/TS (no `//` inside a string we scan for).
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
}

// ── F1 — ONE SpringProgress off DOCK_SPRING, no bespoke spring family ──
function detectF1() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.fissionExists = ts.length > 0;
    // BG.W-DOCK-FISSION-WIRE — the DECIDE routes the fission spring through the band's SOLE
    // `new SpringProgress` factory `useDockSpring`, so the one-spring substrate is reached
    // via the factory import (the direct `SpringProgress` import is retired). Accept EITHER
    // (a direct import survives the fence too — no bespoke spring is minted either way).
    facts.importsSpringProgress = /import\s*\{[^}]*\bSpringProgress\b[^}]*\}\s*from\s*["']@mkbabb\/keyframes\.js["']/.test(ts);
    facts.importsUseDockSpring = /import\s*\{[^}]*\buseDockSpring\b[^}]*\}\s*from\s*["']\.\/useDockSpring["']/.test(ts);
    facts.oneSpringSubstrate = facts.importsSpringProgress || facts.importsUseDockSpring;
    facts.importsDockSpring = /import\s*\{[^}]*\bDOCK_SPRING\b[^}]*\}\s*from\s*["']\.\.\/constants["']/.test(ts);
    facts.readsDockSpring =
        /response:\s*DOCK_SPRING\.response/.test(ts) &&
        /dampingFraction:\s*DOCK_SPRING\.dampingFraction/.test(ts);
    facts.writesSplitT = /setProperty\(\s*["']--dock-split-t["']/.test(ts);
    // A bespoke spring constant minted in the orchestrator (a NEW response/damping literal
    // pair NOT reading DOCK_SPRING) is the no-new-spring-family violation.
    facts.mintsBespokeSpring =
        /new\s+SpringProgress\(\s*\{[^}]*response:\s*0?\.\d+/.test(ts);

    if (!facts.fissionExists)
        violations.push("F1: useDockFission.ts is ABSENT");
    if (facts.fissionExists && !facts.oneSpringSubstrate)
        violations.push("F1: the orchestrator does not reach the ONE SpringProgress substrate — it must import useDockSpring (the band's sole `new SpringProgress` factory) OR SpringProgress directly");
    if (facts.fissionExists && !(facts.importsDockSpring && facts.readsDockSpring))
        violations.push("F1: the spring is not constructed off DOCK_SPRING (response/dampingFraction) — a bespoke spring family or a re-tune");
    if (facts.fissionExists && facts.mintsBespokeSpring)
        violations.push("F1: a bespoke spring (a literal response: 0.xx pair) is minted — no new spring family allowed (read DOCK_SPRING)");
    if (facts.fissionExists && !facts.writesSplitT)
        violations.push("F1: the orchestrator does not write --dock-split-t to the root (the single-property-write idiom)");
    return { violations, facts };
}

// ── F2 — bidirectional re-merge (split AND merge on the same scalar) ──
function detectF2() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.hasSplit = /function\s+split\s*\(/.test(ts) || /\bsplit\s*\(\)\s*:/.test(ts);
    facts.hasMerge = /function\s+merge\s*\(/.test(ts) || /\bmerge\s*\(\)\s*:/.test(ts);
    // Both directions must flip the ONE target (target = 1 AND target = 0) — not a
    // split-only one-way fission.
    facts.targetsOne = /target\s*=\s*1\b/.test(ts);
    facts.targetsZero = /target\s*=\s*0\b/.test(ts);
    facts.bidirectional = facts.hasSplit && facts.hasMerge && facts.targetsOne && facts.targetsZero;
    if (!facts.bidirectional)
        violations.push("F2: the fission is not bidirectional — split() AND merge() must both flip the ONE --dock-split-t target (split=1, merge=0), not a one-way detach");
    return { violations, facts };
}

// ── F3 — the per-context goo-SIGNATURE is descriptor-driven (search/media/nav) ──
function detectF3() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    // BG.W-DOCK-FISSION-WIRE — the DATA MAP moved to the colocated signatures leaf; the
    // presence asserts FOLLOW the carve (read leaf-OR-orchestrator, the "asserts follow
    // the composition into the carved leaf" precedent). The orchestrator READ-checks stay
    // on FISSION_TS (the orchestrator is the reader).
    const data = stripComments(
        readRel(FISSION_TS) + "\n" + readRel(FISSION_SIGNATURES_TS),
    );
    const facts = {};
    // The signature MAP must enumerate all three contexts with their distinct vectors.
    facts.hasSignatureMap = /DOCK_SPLIT_SIGNATURES\s*[:=]/.test(data);
    facts.hasRadial = /vector:\s*["']radial["']/.test(data);
    facts.hasLateral = /vector:\s*["']lateral["']/.test(data);
    facts.hasInwardMerge = /vector:\s*["']inward-merge["']/.test(data);
    // The orchestrator must READ the signature to compute the vectors (descriptor-driven),
    // not a `if (context === 'search')`-style hardcoded code path.
    facts.readsSignature = /signature\.value/.test(ts) || /sig\.(vector|staggerRank|neckHold|squishPeak)/.test(ts);
    // The anti-evasion bite: a hardcoded per-context if/switch silhouette (three code
    // paths) is the F3 defect.
    facts.hasHardcodedContextSwitch =
        /context\s*===\s*["'](search|media|nav)["']/.test(ts) ||
        /switch\s*\(\s*[a-zA-Z.]*context\s*\)/.test(ts);
    facts.descriptorDriven =
        facts.hasSignatureMap &&
        facts.hasRadial &&
        facts.hasLateral &&
        facts.hasInwardMerge &&
        facts.readsSignature &&
        !facts.hasHardcodedContextSwitch;
    if (!facts.descriptorDriven)
        violations.push("F3: the per-context goo-signature is not a descriptor-driven FLOOR — the DOCK_SPLIT_SIGNATURES map must carry radial/lateral/inward-merge AND the orchestrator must READ the signature (not a hardcoded `context === 'search'` code-path switch)");
    return { violations, facts };
}

// ── F4 — pointer-reactive seam-tension, no second rAF ──
function detectF4() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.usesPointerField = /usePointerVelocityField\s*\(/.test(ts);
    facts.writesSeamTension = /setProperty\(\s*["']--seam-tension["']/.test(ts);
    // The field is FED from inside the driver's loop via tick() — the no-own-rAF discipline.
    facts.fieldTicked = /field\.tick\(/.test(ts);
    facts.hasTensionCap = /seamTensionCap/.test(ts) && /Math\.min\(\s*seamTensionCap/.test(ts);
    // The anti-evasion bite: the orchestrator owning a SECOND requestAnimationFrame for the
    // pointer field (a private loop, breaking the one-loop/offscreen-pause discipline).
    facts.hasSecondRaf = /requestAnimationFrame\s*\(/.test(ts);
    facts.seamTensionFloor =
        facts.usesPointerField &&
        facts.writesSeamTension &&
        facts.fieldTicked &&
        facts.hasTensionCap &&
        !facts.hasSecondRaf;
    if (!facts.usesPointerField)
        violations.push("F4: the orchestrator does not compose usePointerVelocityField (the seam-tension reader)");
    if (!facts.writesSeamTension)
        violations.push("F4: the orchestrator does not write --seam-tension (the pointer-reactive scalar)");
    if (!facts.fieldTicked)
        violations.push("F4: the velocity field is not fed via field.tick() from inside the driver loop");
    if (!facts.hasTensionCap)
        violations.push("F4: the --seam-tension is not clamped to a LOW cap (Math.min(seamTensionCap, …)) — the anti-taffy fence");
    if (facts.hasSecondRaf)
        violations.push("F4: the orchestrator owns a SECOND requestAnimationFrame — the seam-tension must be fed from INSIDE the spring's ONE loop (no second rAF — the one-loop/offscreen-pause discipline)");
    return { violations, facts };
}

// ── F5 — PRM=instant sync-seat + field.tick(0) ──
function detectF5() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.hasPrmProbe = /prefersReducedMotion\s*\(/.test(ts);
    facts.hasSyncSeat = /function\s+seatSync\s*\(/.test(ts) || /seatSync\s*\(\)/.test(ts);
    facts.fieldTickZero = /field\.tick\(\s*0\s*\)/.test(ts);
    facts.prmSeats =
        facts.hasPrmProbe && facts.hasSyncSeat && facts.fieldTickZero;
    if (!facts.prmSeats)
        violations.push("F5: PRM is not an instant sync-seat — the prefersReducedMotion() branch + a synchronous seat + field.tick(0) (the zero-velocity freeze) must all be present");
    return { violations, facts };
}

// ── F6 — compositor-only (no animated layout property in fission-bridge.css) ──
function detectF6() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const facts = {};
    facts.cssExists = css.length > 0;
    // The fission CSS must declare --dock-split-t / --neck-t and use clip-path/translate/
    // scale/opacity/filter — and must NOT animate a layout property via transition/keyframes.
    facts.hasNeckClip = /clip-path:\s*inset\(/.test(css);
    facts.usesTranslate = /\btranslate:/.test(css);
    // The piece detach scales on the compositor reading the volume-preserving --stretch
    // squish. BD folds --stretch with --piece-progress in a `scale: calc(...)` fold
    // (not the bare `scale: var(--stretch ...)`), so detect --stretch inside a `scale:`
    // declaration anywhere in the file (the reciprocal-pair squish is the witness).
    facts.usesScaleStretch =
        /scale:\s*[^;]*var\(\s*--stretch[^;]*1\s*\/\s*var\(\s*--stretch/.test(css);
    // A `transition`/`@keyframes` animating a layout axis (inline-size/block-size/width/
    // height/inset/padding) is the no-layout-animation violation.
    facts.animatesLayout =
        /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b|\bpadding\b|grid-template)/.test(css) ||
        /transition-property:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b|\bpadding\b)/.test(css);
    // The REGULAR filter goo (NOT backdrop-filter: url()) — the Safari floor cross-checked
    // here too (it's a metaball-bridge2 B4 clause but the fission CSS is the same file).
    facts.usesBackdropFilterUrl = /backdrop-filter:\s*url\(/.test(css);
    if (!facts.cssExists)
        violations.push("F6: fission-bridge.css is ABSENT");
    if (facts.cssExists && !facts.hasNeckClip)
        violations.push("F6: fission-bridge.css does not carry the clip-path: inset() neck (the compositor silhouette carve)");
    if (facts.cssExists && !(facts.usesTranslate && facts.usesScaleStretch))
        violations.push("F6: the piece detach is not compositor-only translate + --stretch scale");
    if (facts.animatesLayout)
        violations.push("F6: fission-bridge.css animates a LAYOUT property (inline-size/block-size/width/height/inset/padding) — proof:no-layout-animation floor (compositor-only required)");
    if (facts.usesBackdropFilterUrl)
        violations.push("F6: the goo uses backdrop-filter: url() (WebKit-unsupported) — must be the REGULAR filter property (the Safari floor)");
    return { violations, facts };
}

// ── the goo filter mount (the library promotion — sRGB + region + non-zero host) ──
function detectGooMount() {
    const violations = [];
    const vue = stripComments(readRel(GOO_FILTER));
    const facts = {};
    // The unified GooFilter must still carry the `dock-fission-goo` preset (the id the
    // dock fission filter:url() targets) — a mount that dropped the dock id would no-op
    // the fission goo even though the component exists.
    facts.gooMountExists = vue.length > 0 && /dock-fission-goo/.test(vue);
    facts.hasSrgb = /color-interpolation-filters=["']sRGB["']/.test(vue);
    // A GENEROUS region (x=-50% width=200% …) so the necks + flying pieces never clip.
    facts.hasGenerousRegion =
        /x=["']-50%["']/.test(vue) && /width=["']200%["']/.test(vue);
    facts.hasGooGraph =
        /feGaussianBlur/.test(vue) && /feColorMatrix/.test(vue) && /feComposite/.test(vue);
    // NON-ZERO host (a zero-sized SVG is a WebKit no-op). The host carries width=1/height=1
    // + an off-screen position (not width=0).
    facts.nonZeroHost = /width=["']1["']/.test(vue) && /height=["']1["']/.test(vue);
    facts.notBackdropFilter = !/backdrop-filter:\s*url\(/.test(vue);
    if (!facts.gooMountExists)
        violations.push("GOO: the unified GooFilter.vue (the library goo mount) is ABSENT or no longer carries the `dock-fission-goo` preset id the dock fission targets");
    if (facts.gooMountExists && !facts.hasSrgb)
        violations.push("GOO: the goo filter omits color-interpolation-filters=\"sRGB\" (WebKit thresholds in linearRGB → wrong neck — the §W7 Safari floor)");
    if (facts.gooMountExists && !facts.hasGenerousRegion)
        violations.push("GOO: the goo filter has no GENEROUS region (x=-50% width=200%) — the necks + flying pieces clip at the filter edge");
    if (facts.gooMountExists && !facts.hasGooGraph)
        violations.push("GOO: the goo graph is incomplete (feGaussianBlur + feColorMatrix + feComposite required)");
    if (facts.gooMountExists && !facts.nonZeroHost)
        violations.push("GOO: the filter host is not NON-ZERO-size (a zero-sized SVG is a WebKit no-op) — width/height must be 1, off-screen");
    if (facts.gooMountExists && !facts.notBackdropFilter)
        violations.push("GOO: the goo uses backdrop-filter: url() — must be the REGULAR filter (WebKit-safe)");
    return { violations, facts };
}

// ── W1 (BG.W-DOCK-FISSION-WIRE) — the rail-facet fade floor is a LEGIBLE whisper, not 0 ──
// The receding φ-tier facets must stay readable (the C-DOCK "rail facets fade to 0"
// defect). railProjection's DEFAULT_GEOMETRY.fadeMinAlpha must be a legible floor (≥ 0.15),
// NOT 0. Born-RED on HEAD (fadeMinAlpha: 0).
function detectW1FadeFloor() {
    const violations = [];
    const ts = stripComments(readRel(RAIL_PROJECTION_TS));
    const facts = {};
    facts.railProjectionExists = ts.length > 0;
    const m = ts.match(/fadeMinAlpha:\s*([0-9]*\.?[0-9]+)\s*,/);
    facts.fadeMinAlphaDefault = m ? Number(m[1]) : null;
    facts.legibleFloor = facts.fadeMinAlphaDefault !== null && facts.fadeMinAlphaDefault >= 0.15;
    if (!facts.railProjectionExists)
        violations.push("W1: railProjection.ts is ABSENT — the φ-tier facet projection math is missing");
    else if (facts.fadeMinAlphaDefault === null)
        violations.push("W1: railProjection's DEFAULT_GEOMETRY has no fadeMinAlpha default");
    else if (!facts.legibleFloor)
        violations.push(`W1: the rail-facet fade floor is ${facts.fadeMinAlphaDefault} — the receding φ-tier facets fade to (near-)invisible (the C-DOCK "fade to 0" defect). Lift fadeMinAlpha to a LEGIBLE whisper (≥ 0.15)`);
    return { violations, facts };
}

// ── W2 (BG.W-DOCK-FISSION-WIRE) — the fission spring is ROUTED through the ONE factory ──
// The DECIDE keeps the fission WIRED (not retired) AND routes its spring through the band's
// SOLE `new SpringProgress` factory `useDockSpring`. The orchestrator imports the factory,
// PLAYS it (`.playTo(`), reads the byte-fenced DOCK_SPRING clock, and mints NO `new
// SpringProgress` of its own. Born-RED on HEAD (the orchestrator hand-rolled `new
// SpringProgress` directly).
function detectW2SpringRouted() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const factory = stripComments(readRel(DOCK_SPRING_TS));
    const facts = {};
    facts.importsUseDockSpring = /import\s*\{[^}]*\buseDockSpring\b[^}]*\}\s*from\s*["']\.\/useDockSpring["']/.test(ts);
    facts.playsFactory = /\.playTo\(/.test(ts);
    facts.readsDockSpring =
        /response:\s*DOCK_SPRING\.response/.test(ts) &&
        /dampingFraction:\s*DOCK_SPRING\.dampingFraction/.test(ts);
    // The orchestrator mints NO `new SpringProgress` of its own — the factory owns it.
    facts.noOwnNewSpring = !/new\s+SpringProgress\(/.test(ts);
    // The factory it routes through is the REAL sole-site factory (a sanity floor — the
    // factory must itself own the `new SpringProgress`).
    facts.factoryOwnsSpring = /new\s+SpringProgress\(/.test(factory);
    facts.routed =
        facts.importsUseDockSpring &&
        facts.playsFactory &&
        facts.readsDockSpring &&
        facts.noOwnNewSpring &&
        facts.factoryOwnsSpring;
    if (!facts.importsUseDockSpring)
        violations.push("W2: the orchestrator does not import useDockSpring (the band's sole `new SpringProgress` factory) — the DECIDE routes the fission spring through it");
    if (!facts.playsFactory)
        violations.push("W2: the orchestrator does not play the factory (`dockSpring.playTo(...)`) — the spring is not routed through useDockSpring");
    if (facts.importsUseDockSpring && !facts.readsDockSpring)
        violations.push("W2: the routed spring is not constructed off DOCK_SPRING.response/dampingFraction — a re-tune or bespoke clock");
    if (!facts.noOwnNewSpring)
        violations.push("W2: the orchestrator STILL hand-rolls `new SpringProgress` — the factory (useDockSpring) must own the sole `new SpringProgress` site");
    if (!facts.factoryOwnsSpring)
        violations.push("W2: useDockSpring does not own a `new SpringProgress` — the factory is not the real sole-site spring owner");
    return { violations, facts };
}

// ── W3 (BG.W-DOCK-FISSION-WIRE) — the goo bridge is DRY onto ONE GooFilter ──
// The fission bridge references EXACTLY ONE goo `<filter>` id (`#dock-fission-goo`), the id
// the ONE unified `GooFilter.vue` mount carries — never a second inline goo graph or a
// forked goo id (the P7 DRY win locked). A `<defs>`/`<filter>`/`feGaussianBlur` re-mint in
// the fission CSS (a duplicate goo graph) reds.
function detectW3DryGoo() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS) + "\n" + readRel(FISSION_ISLAND_CSS));
    const vue = stripComments(readRel(GOO_FILTER));
    const facts = {};
    // Every goo url() the fission bridge references, de-duped.
    const gooUrls = [...css.matchAll(/url\(\s*#([a-z0-9-]*goo[a-z0-9-]*)\s*\)/gi)].map(
        (m) => m[1],
    );
    facts.gooUrlIds = [...new Set(gooUrls)];
    facts.exactlyOneGooId = facts.gooUrlIds.length === 1;
    facts.gooIdIsDockFission = facts.gooUrlIds[0] === "dock-fission-goo";
    // The fission CSS must NOT re-mint its own goo `<filter>` graph (a duplicate mount).
    facts.noForkedGooGraph = !/feGaussianBlur|feColorMatrix|<filter\b/.test(css);
    // The ONE GooFilter mount carries the dock-fission-goo preset (the id the bridge targets).
    facts.gooFilterCarriesId = vue.length > 0 && /dock-fission-goo/.test(vue);
    facts.dryGoo =
        facts.exactlyOneGooId &&
        facts.gooIdIsDockFission &&
        facts.noForkedGooGraph &&
        facts.gooFilterCarriesId;
    if (!facts.exactlyOneGooId)
        violations.push(`W3: the fission bridge references ${facts.gooUrlIds.length} distinct goo id(s) [${facts.gooUrlIds.join(", ")}] — it must DRY onto EXACTLY ONE (#dock-fission-goo)`);
    else if (!facts.gooIdIsDockFission)
        violations.push(`W3: the fission bridge references goo id #${facts.gooUrlIds[0]} — it must be #dock-fission-goo (the ONE GooFilter preset)`);
    if (!facts.noForkedGooGraph)
        violations.push("W3: the fission CSS re-mints a goo `<filter>` graph (feGaussianBlur/feColorMatrix) — the goo mount is the ONE GooFilter.vue, NEVER an inline duplicate");
    if (!facts.gooFilterCarriesId)
        violations.push("W3: the unified GooFilter.vue does not carry the `dock-fission-goo` preset the bridge targets");
    return { violations, facts };
}

// ── W4 (BG.W-DOCK-FISSION-WIRE) — the DECIDE: the fission is WIRED to a real src consumer ──
// The wire-≥2-real-or-retire DECIDE (BB.W-NDA-DECIDE shape): the fission is KEPT because it
// is WIRED — the `useDockFissionWiring` seam instantiates the engine, and `GlassDock.vue`
// composes that seam behind the `:splittable` facility (the real binary src consumer; the
// demo stories are the ≥2). A retire would DELETE the engine; a wire keeps it live.
function detectW4Wire() {
    const violations = [];
    const wiring = stripComments(
        readRel("src/components/custom/dock/composables/useDockFissionWiring.ts"),
    );
    const sfc = stripComments(readRel("src/components/custom/dock/GlassDock.vue"));
    const facts = {};
    facts.wiringComposesEngine =
        wiring.length > 0 && /useDockFission\s*\(/.test(wiring);
    facts.sfcComposesWiring =
        sfc.length > 0 && /useDockFissionWiring\s*\(/.test(sfc);
    facts.sfcHasSplittable = /\bsplittable\b/.test(sfc);
    facts.wired =
        facts.wiringComposesEngine && facts.sfcComposesWiring && facts.sfcHasSplittable;
    if (!facts.wiringComposesEngine)
        violations.push("W4: useDockFissionWiring does not instantiate useDockFission() — the fission engine has no wiring seam (the DECIDE keeps it WIRED, not dead)");
    if (!facts.sfcComposesWiring)
        violations.push("W4: GlassDock.vue does not compose useDockFissionWiring() — the fission engine reaches no real src consumer");
    if (!facts.sfcHasSplittable)
        violations.push("W4: GlassDock.vue exposes no `:splittable` facility — the fission wire has no consumer-facing entry (wire ≥2 real or retire)");
    return { violations, facts };
}

// ── self-tests (each planted defect MUST red) ──
function selfTests() {
    const out = {};
    // (a) a second bespoke spring clock literal reds F1.
    out.a = (() => {
        const body = "spring = new SpringProgress({ response: 0.44, dampingFraction: 0.9 });";
        return /new\s+SpringProgress\(\s*\{[^}]*response:\s*0?\.\d+/.test(body);
    })();
    // (b) a uni-directional-only fission (no merge) reds F2.
    out.b = (() => {
        const body = "function split(){ target = 1; ensureSpringRunning(); }";
        const hasMerge = /function\s+merge\s*\(/.test(body) || /\bmerge\s*\(\)\s*:/.test(body);
        return hasMerge === false; // the bite fires (RED) when merge is absent.
    })();
    // (c) a hardcoded per-context switch reds F3.
    out.c = (() => {
        const body = "if (context === 'search') { /* radial */ } else if (context === 'media') {}";
        return /context\s*===\s*["'](search|media|nav)["']/.test(body);
    })();
    // (d) a second rAF for the pointer field reds F4.
    out.d = (() => {
        const body = "requestAnimationFrame(() => field.tick(16));";
        return /requestAnimationFrame\s*\(/.test(body);
    })();
    // (e) a piece animating a layout axis reds F6.
    out.e = (() => {
        const body = "transition: inline-size 0.4s var(--spring-dock);";
        return /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b)/.test(body);
    })();
    // (f) a fadeMinAlpha of 0 (the fade-to-invisible defect) reds W1.
    out.f = (() => {
        const body = "fadeMinAlpha: 0,";
        const m = body.match(/fadeMinAlpha:\s*([0-9]*\.?[0-9]+)\s*,/);
        const val = m ? Number(m[1]) : null;
        return !(val !== null && val >= 0.15); // the bite fires (RED) when the floor is 0.
    })();
    // (g) a hand-rolled `new SpringProgress` in the orchestrator reds W2.
    out.g = (() => {
        const body = "spring = new SpringProgress({ response: DOCK_SPRING.response });";
        return /new\s+SpringProgress\(/.test(body); // the bite fires when the orchestrator mints its own.
    })();
    // (h) a second inline goo `<filter>` graph in the fission CSS reds W3.
    out.h = (() => {
        const body = ".x { filter: url(#dock-fission-goo); } .y filter: url(#other-goo);";
        const ids = [...new Set([...body.matchAll(/url\(\s*#([a-z0-9-]*goo[a-z0-9-]*)\s*\)/gi)].map((m) => m[1]))];
        return ids.length !== 1; // the bite fires (RED) when a second goo id appears.
    })();
    // (i) a wiring seam that composes nothing (the engine unwired → retire, not wire) reds W4.
    out.i = (() => {
        const emptyWiring = "// the wiring seam that never instantiates the engine";
        return /useDockFission\s*\(/.test(emptyWiring) === false; // fires (RED) when no compose.
    })();
    return out;
}

export function detect() {
    const f1 = detectF1();
    const f2 = detectF2();
    const f3 = detectF3();
    const f4 = detectF4();
    const f5 = detectF5();
    const f6 = detectF6();
    const goo = detectGooMount();
    // BG.W-DOCK-FISSION-WIRE clauses.
    const w1 = detectW1FadeFloor();
    const w2 = detectW2SpringRouted();
    const w3 = detectW3DryGoo();
    const w4 = detectW4Wire();

    const st = selfTests();
    const stViolations = [];
    for (const [k, ok] of Object.entries(st))
        if (!ok) stViolations.push(`${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);

    const violations = [
        ...f1.violations,
        ...f2.violations,
        ...f3.violations,
        ...f4.violations,
        ...f5.violations,
        ...f6.violations,
        ...goo.violations,
        ...w1.violations,
        ...w2.violations,
        ...w3.violations,
        ...w4.violations,
        ...stViolations,
    ];
    return {
        violations,
        facts: {
            f1: f1.facts,
            f2: f2.facts,
            f3: f3.facts,
            f4: f4.facts,
            f5: f5.facts,
            f6: f6.facts,
            goo: goo.facts,
            w1: w1.facts,
            w2: w2.facts,
            w3: w3.facts,
            w4: w4.facts,
            selfTests: st,
        },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_FISSION_ARTIFACT", "BE-dock-fission");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-fission",
        command: COMMAND,
        note: "BE.W-DOCK-FISSION + BG.W-DOCK-FISSION-WIRE device-free SOURCE arm (F1 the ONE SpringProgress substrate — via the useDockSpring factory OR a direct import — off DOCK_SPRING writing --dock-split-t, no bespoke spring family · F2 bidirectional split/merge on the ONE scalar · F3 the per-context goo-SIGNATURE descriptor-driven (radial/lateral/inward-merge), the MAP in the colocated dockFissionSignatures leaf, NOT three code paths · F4 pointer-reactive --seam-tension off usePointerVelocityField fed from INSIDE the ONE loop, capped LOW, no second rAF · F5 PRM=instant sync-seat + field.tick(0) · F6 compositor-only — the fission CSS animates NO layout property · GOO the library mount sRGB + generous region + non-zero host · W1 the rail-facet fade floor is a LEGIBLE whisper (≥0.15), not 0 · W2 the DECIDE routes the spring through the SOLE useDockSpring factory (no own new SpringProgress) · W3 the goo bridge is DRY onto ONE #dock-fission-goo GooFilter · W4 the fission is WIRED to a real src consumer, GlassDock :splittable). The LIVE per-context frame-series + the seam-tension resist + box-INVIOLATE + the no-goo-regression carousel/pager paint are the orchestrator's W-DOCK-FISSION-WIRE-DELTA (tests-visual/dock-fission.spec.ts).",
        facts,
        violations,
    });
    console.log(`proof:dock-fission — ${status.toUpperCase()}`);
    console.log(`  F1 one-spring: exists=${facts.f1.fissionExists} substrate=${facts.f1.oneSpringSubstrate}(factory=${facts.f1.importsUseDockSpring}/direct=${facts.f1.importsSpringProgress}) dock-spring=${facts.f1.readsDockSpring} writes-split-t=${facts.f1.writesSplitT} no-bespoke=${!facts.f1.mintsBespokeSpring}`);
    console.log(`  F2 bidirectional: split=${facts.f2.hasSplit} merge=${facts.f2.hasMerge} targets-1=${facts.f2.targetsOne} targets-0=${facts.f2.targetsZero}`);
    console.log(`  F3 signature: map=${facts.f3.hasSignatureMap} radial/lateral/inward=${facts.f3.hasRadial}/${facts.f3.hasLateral}/${facts.f3.hasInwardMerge} reads-sig=${facts.f3.readsSignature} no-hardcode-switch=${!facts.f3.hasHardcodedContextSwitch}`);
    console.log(`  F4 seam-tension: field=${facts.f4.usesPointerField} writes-tension=${facts.f4.writesSeamTension} ticked=${facts.f4.fieldTicked} cap=${facts.f4.hasTensionCap} no-second-raf=${!facts.f4.hasSecondRaf}`);
    console.log(`  F5 prm: probe=${facts.f5.hasPrmProbe} sync-seat=${facts.f5.hasSyncSeat} tick0=${facts.f5.fieldTickZero}`);
    console.log(`  F6 compositor: css=${facts.f6.cssExists} neck-clip=${facts.f6.hasNeckClip} translate+scale=${facts.f6.usesTranslate && facts.f6.usesScaleStretch} no-layout-anim=${!facts.f6.animatesLayout} no-backdrop-url=${!facts.f6.usesBackdropFilterUrl}`);
    console.log(`  GOO mount: exists=${facts.goo.gooMountExists} sRGB=${facts.goo.hasSrgb} region=${facts.goo.hasGenerousRegion} graph=${facts.goo.hasGooGraph} non-zero=${facts.goo.nonZeroHost}`);
    console.log(`  W1 fade-floor: fadeMinAlpha=${facts.w1.fadeMinAlphaDefault} legible=${facts.w1.legibleFloor}`);
    console.log(`  W2 spring-routed: useDockSpring=${facts.w2.importsUseDockSpring} playTo=${facts.w2.playsFactory} reads-dock-spring=${facts.w2.readsDockSpring} no-own-new=${facts.w2.noOwnNewSpring} factory-owns=${facts.w2.factoryOwnsSpring}`);
    console.log(`  W3 dry-goo: ids=[${facts.w3.gooUrlIds.join(",")}] one-id=${facts.w3.exactlyOneGooId} is-dock-fission=${facts.w3.gooIdIsDockFission} no-forked-graph=${facts.w3.noForkedGooGraph} filter-carries-id=${facts.w3.gooFilterCarriesId}`);
    console.log(`  W4 wired: wiring-composes=${facts.w4.wiringComposesEngine} sfc-composes=${facts.w4.sfcComposesWiring} splittable=${facts.w4.sfcHasSplittable}`);
    console.log(`  self-tests: ${Object.entries(facts.selfTests).map(([k, v]) => `${k}=${v ? "OK" : "BROKE"}`).join(" ")}`);
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
