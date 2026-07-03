#!/usr/bin/env node
// BC.W-LIQUID-TAB — the LIQUID TAB: pull the active pill → it MORPHS/squishes/flings
// to location (the iOS-27 liquid pull-morph). This wave turns the PILL (Register B,
// BC.W-TABS-IOS) into the FULL iOS-27 glass tab SYSTEM (Register A): the drag-morph
// is WIRED ON as the primary affordance, the squish cap is lifted so the gel-squish
// READS, the fling rides the eased `snappy` (BC.W-SPRING-EASE), and the kf
// `snap`/`rubberBand` consume is BOOKED.
//
// The SOURCE/MECHANISM arm of proof:liquid-tab (device-free; the PAINT arm is the
// bc-gestalt-roster pixel-read over a live :5199 capture the orchestrator owns + the
// π readback tests-visual/liquid-tab.spec.ts — the pull morphs+squishes+flings).
// Per-mechanism greens alone do NOT close the visual wave — the captured DELTA is the
// binding truth (BC anti-disease law).
//
// The comment-strip + pure-detector house pattern (mirroring proof-tabs-ios.mjs).
// Each witness is born-RED at HEAD pre-wave:
//   - HEAD SegmentedTabs `draggable` defaults `false` (L1 reds — the pull is NOT the
//     pill default; it is a dormant opt-in capability).
//   - HEAD DEFAULT_INDICATOR_MAX_STRETCH = 1.08 / --tab-indicator-max-stretch: 1.08
//     (L2 reds — the squish is too low to READ as a liquid swell).
//   - HEAD useDragMorph.ts carries no `// CONSUME(kf snap):` marker + asks-and-
//     consumes.md books no kf snap/rubberBand republish (L4 reds).
//
// BH.B1-W3 RECONCILE: kf 5.1.0 published the native `DragOptions.snap` (machine-verified
// in node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts), so the consume-and-delete
// FIRED — the `// CONSUME(kf snap):` marker + the glass-ui `decayRest`+`spring.target`
// re-roll are DELETED and useDragMorph wires the native `snap:` option. L3's
// fling-projection check + L4's consume check are RE-POINTED onto the native snap path
// (the consume LANDED, not pending); the asks-and-consumes.md book stays GREEN.
//
// bite-check (each clause carries a planted self-test below): a planted `draggable:
// false` default reds L1; a cap >1.2 (taffy) OR a constant/token fork reds L2; a
// planted local rAF spring in the tab drag reds L3; a useDragMorph that neither wires
// the native snap nor carries the deleted re-roll / an absent book reds L4; a drag that
// gates selection behind the pull (removing the click path) reds L5; a drag-snap that
// does not write the model reds L5.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip JS/TS line + block comments (preserve newlines) — the false-witness
// discipline (a prose mention of `draggable: false` in a doc-comment is never a hit).
function stripJs(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}
function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ");
}

const SFC = "src/components/custom/tabs/SegmentedTabs.vue";
const CONSTANTS = "src/components/custom/tabs/constants.ts";
const SCALE_PAPER = "src/styles/tokens/scale-paper.css";
const TAB_DRAG = "src/components/custom/tabs/composables/useTabDragMorph.ts";
// BG.W-COLOCATE — the roving-tabindex machine carved OUT of the SFC into this
// colocated composable (ratchet-drain #13). The L5 function-def checks FOLLOW the
// carve into the leaf (the "asserts follow the composition into the carved leaf"
// precedent); the SFC keeps the template wiring (`:tabindex`/`@keydown`).
const ROVING_FOCUS =
    "src/components/custom/tabs/composables/useTabRovingFocus.ts";
const USE_DRAG_MORPH = "src/composables/motion/useDragMorph.ts";
const ASKS = "docs/tranches/BC/coordination/asks-and-consumes.md";

// ── L1 — the pull is the pill DEFAULT, the click path byte-unchanged.
//   SegmentedTabs `draggable` default is `true` (the pull is the iOS-27 primary
//   affordance); the click path (`select`/`squishOnTravel`/`@click=select(`) is
//   byte-unchanged (the drag did NOT edit the click branch). Born-RED: HEAD default
//   `false`.
export function detectPullIsDefault(sfcRaw) {
    const violations = [];
    const facts = {};
    const sfc = stripJs(sfcRaw ?? readFile(SFC));

    // The `draggable` prop exists.
    facts.hasDraggableProp = /draggable\s*\?\s*:\s*boolean/.test(sfc);
    if (!facts.hasDraggableProp) {
        violations.push("L1: SegmentedTabs declares no `draggable?: boolean` prop (the :draggable axis is gone)");
    }

    // The withDefaults default is `true` (the pull is the pill DEFAULT). Match the
    // withDefaults object's `draggable:` entry specifically.
    const defM = sfc.match(/withDefaults\s*\([\s\S]*?\{([\s\S]*?)\}\s*\)/);
    const defBlock = defM ? defM[1] : sfc;
    const draggableDefM = defBlock.match(/draggable\s*:\s*(true|false)\b/);
    facts.draggableDefault = draggableDefM ? draggableDefM[1] : null;
    if (facts.draggableDefault !== "true") {
        violations.push(`L1: the SegmentedTabs \`draggable\` default is not \`true\` (the pull must be the pill DEFAULT — the iOS-27 primary affordance): '${facts.draggableDefault ?? "MISSING"}'`);
    }

    // The click path is byte-unchanged — the drag is additive over it, never a rewrite.
    facts.clickPathIntact =
        /function\s+select\s*\(/.test(sfc) &&
        /squishOnTravel\s*\(/.test(sfc) &&
        /@click\s*=\s*["']select\(/.test(sfc);
    if (!facts.clickPathIntact) {
        violations.push("L1: the click-selection path (`select` + `squishOnTravel` + `@click=select(`) is not intact — enabling the pull by default must NOT make selection drag-only (the byte-identical click bite)");
    }

    // The underline stays no-op by `dragEnabled = draggable() && !isUnderline.value`.
    facts.dragGatedUnderline = /dragEnabled\s*=\s*computed\([\s\S]*?draggable\(\)\s*&&\s*!isUnderline\.value/.test(
        stripJs(readFile(TAB_DRAG)),
    );
    if (!facts.dragGatedUnderline) {
        violations.push("L1: the drag is not gated off the underline material (`dragEnabled = draggable() && !isUnderline.value`) — the ink hairline has no indicator to deform");
    }

    return { facts, violations };
}

// ── L2 — the visible swell is the BLOB area-inflation register; the per-axis squish is
//   the (volume-preserving) travel-stretch. BD.W-TABS-LIQUID re-pointed the swell:
//   the liquid pull READS via the `--tab-indicator-blob-max` area-inflation channel
//   (grow→overshoot→shrink), NOT the bare per-axis `--tab-indicator-max-stretch` (which
//   re-tuned 1.18 → 1.11 — a reciprocal squish, NOT the swell). The new fence:
//     · the BLOB channel exists, > 1 (a real swell), and its AREA (≈ blob², the squish
//       being volume-preserving) ≤ 1.14 (anti-taffy); constant + token in lockstep.
//     · the per-axis stretch cap is in the lively-but-anti-taffy band [1.0, 1.2];
//       constant + token in lockstep (the SOLE cap source — never a fork).
//   The runtime COMPOSED-peak (`blob × stretch`) ≤ 1.14 upper-bound is the π readback
//   arm (tab-ios-capsule.spec.ts) — a device-free source gate cannot measure the live
//   transform; this L2 asserts the STATIC two-channel token relationship.
//   Born-RED on HEAD: no blob channel (`--tab-indicator-blob-max` absent) + cap 1.08.
export function detectVisibleSquishCap(constantsRaw, scalePaperRaw) {
    const violations = [];
    const facts = {};
    const constants = stripJs(constantsRaw ?? readFile(CONSTANTS));
    const scalePaper = stripCss(scalePaperRaw ?? readFile(SCALE_PAPER));

    // — the per-axis travel-squish cap (the reciprocal squish, NOT the swell) —
    const constM = constants.match(/DEFAULT_INDICATOR_MAX_STRETCH\s*=\s*([\d.]+)\b/);
    const tokenM = scalePaper.match(/--tab-indicator-max-stretch:\s*([\d.]+)\s*;/);
    facts.cap = constM ? Number(constM[1]) : null;
    facts.token = tokenM ? Number(tokenM[1]) : null;

    if (facts.cap == null) {
        violations.push("L2: DEFAULT_INDICATOR_MAX_STRETCH not found in constants.ts");
    } else if (facts.cap < 1.0 || facts.cap > 1.2) {
        violations.push(`L2: DEFAULT_INDICATOR_MAX_STRETCH=${facts.cap} is out of the lively-but-anti-taffy band [1.0, 1.2]`);
    }
    if (facts.token == null) {
        violations.push("L2: --tab-indicator-max-stretch not found in scale-paper.css (the cap token authority)");
    } else if (facts.token < 1.0 || facts.token > 1.2) {
        violations.push(`L2: --tab-indicator-max-stretch=${facts.token} is out of the lively-but-anti-taffy band [1.0, 1.2]`);
    }
    if (facts.cap != null && facts.token != null && facts.cap !== facts.token) {
        violations.push(`L2: the squish cap FORKED — DEFAULT_INDICATOR_MAX_STRETCH=${facts.cap} ≠ --tab-indicator-max-stretch=${facts.token} (the constant + token are ONE cap source, in lockstep)`);
    }

    // — the BLOB area-inflation channel: the VISIBLE swell (the load-bearing fence) —
    const blobConstM = constants.match(/DEFAULT_INDICATOR_BLOB_MAX\s*=\s*([\d.]+)\b/);
    const blobTokenM = scalePaper.match(/--tab-indicator-blob-max:\s*([\d.]+)\s*;/);
    facts.blobCap = blobConstM ? Number(blobConstM[1]) : null;
    facts.blobToken = blobTokenM ? Number(blobTokenM[1]) : null;

    if (facts.blobCap == null) {
        violations.push("L2: DEFAULT_INDICATOR_BLOB_MAX not found in constants.ts — the area-inflation BLOB channel is the visible swell (the liquid pull will not read without it)");
    } else if (facts.blobCap <= 1.0) {
        violations.push(`L2: DEFAULT_INDICATOR_BLOB_MAX=${facts.blobCap} is not a swell (≤1) — the liquid-tab pull must inflate the pill's area (the visible gel)`);
    } else if (facts.blobCap * facts.blobCap > 1.14) {
        // the AREA ≈ blob² (the per-axis squish is volume-preserving) — the anti-taffy fence.
        violations.push(`L2: DEFAULT_INDICATOR_BLOB_MAX=${facts.blobCap} inflates the AREA (≈blob²=${(facts.blobCap * facts.blobCap).toFixed(3)}) past the ≤1.14 anti-taffy fence — the pill taffy-blows instead of swelling`);
    }
    if (facts.blobToken == null) {
        violations.push("L2: --tab-indicator-blob-max not found in scale-paper.css (the blob-cap token authority)");
    } else if (facts.blobToken <= 1.0) {
        violations.push(`L2: --tab-indicator-blob-max=${facts.blobToken} is not a swell (≤1)`);
    } else if (facts.blobToken * facts.blobToken > 1.14) {
        violations.push(`L2: --tab-indicator-blob-max=${facts.blobToken} inflates the AREA (≈blob²=${(facts.blobToken * facts.blobToken).toFixed(3)}) past the ≤1.14 anti-taffy fence`);
    }
    if (facts.blobCap != null && facts.blobToken != null && facts.blobCap !== facts.blobToken) {
        violations.push(`L2: the blob cap FORKED — DEFAULT_INDICATOR_BLOB_MAX=${facts.blobCap} ≠ --tab-indicator-blob-max=${facts.blobToken} (the SOLE blob-cap source, in lockstep)`);
    }
    return { facts, violations };
}

// ── L3 — no second engine / no re-fork; the drag rides the `snappy` SPRING_PRESETS row.
//   useTabDragMorph composes useDragMorph (which composes kf Draggable + SpringProgress
//   + useLiquidFlex + the NATIVE kf snap); no hand-rolled pointer-velocity sampler or
//   parallel rAF spring integrator in the TAB drag (the D1/D2 fence). The drag spring is
//   a SPRING_PRESETS row (`snappy`), never a new clock.
//   (BH.B1-W3: the fling-to-nearest projection moved off glass-ui's `decayRest`+
//   `spring.target` re-roll onto kf 5.1.0's native `DragOptions.snap` — useDragMorph now
//   hands the Draggable a `snap:` option; the projection lives INSIDE the engine.)
export function detectNoSecondEngine(tabDragRaw, useDragMorphRaw) {
    const violations = [];
    const facts = {};
    const tabDrag = stripJs(tabDragRaw ?? readFile(TAB_DRAG));
    const dragMorph = stripJs(useDragMorphRaw ?? readFile(USE_DRAG_MORPH));

    // The tab drag composes useDragMorph (NOT a second engine).
    facts.tabUsesDragMorph = /useDragMorph\s*(<[^>]*>)?\s*\(/.test(tabDrag);
    if (!facts.tabUsesDragMorph) {
        violations.push("L3: useTabDragMorph does not compose useDragMorph (the tab drag must ride the ONE drag engine, not a second one)");
    }

    // useDragMorph composes the kf substrate.
    facts.composesDraggable = /\bDraggable\b/.test(dragMorph) && /@mkbabb\/keyframes\.js/.test(dragMorph);
    facts.composesSpring = /\bSpringProgress\b/.test(dragMorph);
    facts.composesLiquidFlex = /useLiquidFlex/.test(dragMorph);
    // The fling-to-nearest projection is the NATIVE kf snap (kf 5.1.0 `DragOptions.snap`):
    // useDragMorph hands the Draggable construction a `snap:` option, the engine projects
    // `decayRest` + re-seats to the nearest center INTERNALLY (BH.B1-W3 excised the glass-ui
    // re-roll). Assert the native snap is WIRED, not the retired glass-ui-side `decayRest`.
    facts.wiresNativeSnap = /\bnew\s+Draggable\s*\(/.test(dragMorph) && /\bsnap\s*:/.test(dragMorph);
    if (!facts.composesDraggable) violations.push("L3: useDragMorph does not compose the kf Draggable substrate (the load-bearing reuse — no re-fork)");
    if (!facts.composesSpring) violations.push("L3: useDragMorph does not compose SpringProgress (the physics core)");
    if (!facts.composesLiquidFlex) violations.push("L3: useDragMorph does not compose useLiquidFlex (the `tanh` squish)");
    if (!facts.wiresNativeSnap) violations.push("L3: useDragMorph does not wire the native kf `snap:` option on its Draggable construction (the fling-to-nearest projection is now native kf 5.1.0 `DragOptions.snap`, not a glass-ui `decayRest` re-roll)");

    // The drag spring is a SPRING_PRESETS row (`snappy`), NOT a new clock.
    facts.springIsPreset = /springPreset\s*\(\s*["']snappy["']\s*\)/.test(dragMorph);
    if (!facts.springIsPreset) {
        violations.push("L3: the drag spring is not the `snappy` SPRING_PRESETS row (`springPreset(\"snappy\")`) — a new clock violates the one-clock fence (the eased curve is BC.W-SPRING-EASE's, READ by name)");
    }

    // No hand-rolled pointer-velocity sampler or parallel rAF spring integrator in the
    // TAB drag composable (the D1/D2 fence — the tab consumer owns NO local engine).
    facts.tabHasNoRaf = !/requestAnimationFrame/.test(tabDrag);
    facts.tabHasNoLocalSpring = !/new\s+SpringProgress/.test(tabDrag);
    if (!facts.tabHasNoRaf) {
        violations.push("L3: useTabDragMorph hand-rolls a `requestAnimationFrame` loop (a parallel rAF spring in the tab drag — the D1/D2 fence forbids a second engine)");
    }
    if (!facts.tabHasNoLocalSpring) {
        violations.push("L3: useTabDragMorph mints its own `new SpringProgress` (the tab drag must ride useDragMorph's ONE spring, not a local one)");
    }

    return { facts, violations };
}

// ── L4 — the kf snap consume LANDED (consume-and-delete terminal state, BH.B1-W3).
//   asks-and-consumes.md names the kf `snap`/`rubberBand` republish ask + the consume-
//   and-delete target lines; the consume FIRED — kf 5.1.0 published `DragOptions.snap`,
//   so the `// CONSUME(kf snap):` marker + the `decayRest`+`spring.target` re-roll were
//   DELETED and useDragMorph wires the native `snap:` option. Born-RED if the consume did
//   not land (no native snap wired) OR the re-roll lingers (a forbidden dual path) OR the
//   book is absent.
export function detectKfConsumeBooked(asksRaw, useDragMorphRaw) {
    const violations = [];
    const facts = {};
    const asks = asksRaw ?? readFile(ASKS);
    const dragMorphRaw = useDragMorphRaw ?? readFile(USE_DRAG_MORPH);
    // Code-shape checks read the COMMENT-STRIPPED source — the module header narrates
    // "the native snap" / "decayRest, internal" in prose, which must never be a witness.
    const dragMorph = stripJs(dragMorphRaw);

    // The consume-and-delete terminal state: the native kf snap is WIRED (the consume
    // landed) AND the glass-ui `decayRest`+`spring.target` re-roll is GONE (no dual path).
    facts.nativeSnapWired = /\bnew\s+Draggable\s*\(/.test(dragMorph) && /\bsnap\s*:/.test(dragMorph);
    facts.reRollGone = !(/\bdecayRest\s*\(/.test(dragMorph) && /\bspring\.target\s*=/.test(dragMorph));
    facts.consumeLanded = facts.nativeSnapWired && facts.reRollGone;
    if (!facts.nativeSnapWired) {
        violations.push("L4: useDragMorph.ts does not wire the native kf `snap:` option on its Draggable construction — the kf 5.1.0 `DragOptions.snap` consume-and-delete must have LANDED (the published-surface re-roll collapsed onto it)");
    }
    if (!facts.reRollGone) {
        violations.push("L4: useDragMorph.ts still carries the `decayRest`+`spring.target` snap RE-ROLL — the consume-and-delete must DELETE the re-roll; a lingering re-roll is the forbidden dual path now that kf 5.1.0 `DragOptions.snap` is native");
    }

    // The book names the kf snap/rubberBand republish ask in the BC ledger.
    facts.booksSnap = /snap/i.test(asks) && /rubberBand/i.test(asks) && /Draggable/i.test(asks);
    facts.booksByName = /by-name/i.test(asks) && /(NO peer-spine widen|peer-spine)/i.test(asks);
    facts.booksRepublish = /republish/i.test(asks);
    if (!facts.booksSnap) {
        violations.push("L4: asks-and-consumes.md does not name the kf Draggable `snap`/`rubberBand` ask (the by-name republish book)");
    }
    if (!facts.booksRepublish) {
        violations.push("L4: asks-and-consumes.md does not record the kf republish gating (the consume-and-delete fires on the kf republish)");
    }
    if (!facts.booksByName) {
        violations.push("L4: asks-and-consumes.md does not record the by-name / NO peer-spine-widen disposition (the foreign-tree fence — glass-ui edits zero kf tree)");
    }

    return { facts, violations };
}

// ── L5 — the drag is ADDITIVE to the a11y contract, never a substitute (WCAG 2.1.1).
//   (a) the click path is byte-identical (L1); (b) the roving-tabindex + arrow-key nav
//   is byte-untouched (this wave edits the draggable default + the cap, NEVER the
//   keyboard handler); (c) the aria state reflects after a DRAG-snap exactly as after a
//   click (the drag writes the SAME model → the same aria flip). A drag that gates
//   selection behind the pull (removing the click path) reds; a drag-snap that does not
//   write the model reds.
export function detectAdditiveA11y(sfcRaw, tabDragRaw, rovingRaw) {
    const violations = [];
    const facts = {};
    const sfc = stripJs(sfcRaw ?? readFile(SFC));
    const tabDrag = stripJs(tabDragRaw ?? readFile(TAB_DRAG));
    // The function DEFINITIONS live in the carved `useTabRovingFocus` leaf; the SFC
    // keeps the template wiring. The check reads (SFC OR the leaf) so the carve is
    // followed (BG.W-COLOCATE — ratchet-drain #13).
    const roving = stripJs(rovingRaw ?? readFile(ROVING_FOCUS));

    // (b) the roving-tabindex + arrow-key nav is present + ungated (the keyboard-
    // operable floor — the drag is a pointer ENHANCEMENT, never the sole mechanism).
    facts.hasRovingTabindex =
        /:tabindex="rovingTabindex/.test(sfc) &&
        (/function\s+rovingTabindex/.test(sfc) ||
            /function\s+rovingTabindex/.test(roving));
    facts.hasStripKeydown =
        /@keydown="onStripKeydown"/.test(sfc) &&
        (/function\s+onStripKeydown/.test(sfc) ||
            /function\s+onStripKeydown/.test(roving));
    if (!facts.hasRovingTabindex) {
        violations.push("L5: the roving-tabindex wiring (:tabindex=\"rovingTabindex(idx)\") is gone — the keyboard-operable selection floor must survive (WCAG 2.1.1; the drag has no keyboard equivalent)");
    }
    if (!facts.hasStripKeydown) {
        violations.push("L5: the @keydown=\"onStripKeydown\" arrow-nav contract is gone — a drag-only strip strands a keyboard user");
    }
    // The roving is NOT gated behind :draggable (the keyboard contract is every-strip).
    facts.rovingNotGatedOnDraggable =
        !/:tabindex\s*=\s*["'][^"']*draggable/.test(sfc) &&
        !/draggable[^?]*\?\s*[^:]*tabindex/.test(sfc);
    if (!facts.rovingNotGatedOnDraggable) {
        violations.push("L5: the roving-tabindex is gated behind :draggable — the keyboard contract applies to EVERY strip (a draggable-only roving leaves a keyboard user stranded)");
    }

    // (c) the drag-snap writes the SAME model a click does (the aria flip follows the
    // model). useTabDragMorph's onSnap writes `model.value = value` — the same single
    // source of truth the click path writes. A drag that moves the pill but leaves the
    // model (and thus aria-pressed/aria-selected) stale is the silent-no-op.
    facts.dragWritesModel = /onSnap\s*:\s*\([^)]*\)\s*=>\s*\{[\s\S]*?model\.value\s*=\s*value/.test(tabDrag) ||
        /model\.value\s*=\s*value/.test(tabDrag);
    if (!facts.dragWritesModel) {
        violations.push("L5: useTabDragMorph's onSnap does not write `model.value = value` (the drag-snap must write the SAME model a click does → the same aria flip; a stale aria after a drag is the silent-no-op)");
    }
    // The aria-state is per-variant + reflects the model (the click writes the model →
    // the same aria binding the drag-snap re-reads).
    facts.ariaReflectsModel =
        /aria-pressed.*isActive\(option\.value\)/s.test(sfc) &&
        /aria-selected.*isActive\(option\.value\)/s.test(sfc);
    if (!facts.ariaReflectsModel) {
        violations.push("L5: the aria-pressed/aria-selected bindings do not reflect isActive(option.value) (the model-derived state both the click and the drag-snap flip)");
    }

    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor).
export function selfTest() {
    const fails = [];

    // L1: a planted `draggable: false` default reds.
    const sfcDefaultFalse =
        "interface P { draggable?: boolean }\nwithDefaults(defineProps(), { variant: 'pill', draggable: false });\nfunction select() {} squishOnTravel(0);\n<button @click=\"select(o, i)\" />";
    if (detectPullIsDefault(sfcDefaultFalse).violations.length === 0) {
        fails.push("self-test L1: a planted `draggable: false` default did NOT red");
    }
    // L1: the good default-true shape with an intact click path + underline gate passes
    // the default-true clause (the underline-gate + clickPathIntact may still flag on a
    // stub — assert specifically the default-true clause is satisfied).
    const goodDefault = detectPullIsDefault(
        "interface P { draggable?: boolean }\nwithDefaults(defineProps(), { draggable: true });\nfunction select() {} squishOnTravel(0);\n<button @click=\"select(o, i)\" />",
    );
    if (goodDefault.violations.some((v) => v.startsWith("L1: the SegmentedTabs `draggable` default is not"))) {
        fails.push("self-test L1: the good `draggable: true` default unexpectedly flagged the default clause");
    }

    // the good two-channel shape (per-axis stretch in band + blob swell area ≤1.14).
    const goodConst =
        "const DEFAULT_INDICATOR_MAX_STRETCH = 1.11; const DEFAULT_INDICATOR_BLOB_MAX = 1.045;";
    const goodScale =
        "--tab-indicator-max-stretch: 1.11; --tab-indicator-blob-max: 1.045;";
    // L2: a per-axis cap > 1.2 (taffy) reds.
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.35; const DEFAULT_INDICATOR_BLOB_MAX = 1.045;", "--tab-indicator-max-stretch: 1.35; --tab-indicator-blob-max: 1.045;").violations.length === 0) {
        fails.push("self-test L2: a planted taffy cap (1.35 > 1.2) did NOT red");
    }
    // L2: a per-axis constant/token fork reds.
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.11; const DEFAULT_INDICATOR_BLOB_MAX = 1.045;", "--tab-indicator-max-stretch: 1.13; --tab-indicator-blob-max: 1.045;").violations.length === 0) {
        fails.push("self-test L2: a planted constant/token fork (1.11 vs 1.13) did NOT red");
    }
    // L2: a missing BLOB channel reds (the swell is gone — the bare squish does not read).
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.11;", "--tab-indicator-max-stretch: 1.11;").violations.length === 0) {
        fails.push("self-test L2: a missing --tab-indicator-blob-max swell channel did NOT red");
    }
    // L2: a blob that taffy-blows the area (blob²>1.14, e.g. 1.10→1.21) reds.
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.11; const DEFAULT_INDICATOR_BLOB_MAX = 1.10;", "--tab-indicator-max-stretch: 1.11; --tab-indicator-blob-max: 1.10;").violations.length === 0) {
        fails.push("self-test L2: a planted taffy blob (area blob²=1.21 > 1.14) did NOT red");
    }
    // L2: the good two-channel shape passes.
    if (detectVisibleSquishCap(goodConst, goodScale).violations.length !== 0) {
        fails.push("self-test L2: the good two-channel cap (stretch 1.11 + blob 1.045) unexpectedly red");
    }

    // L3: a planted local rAF spring in the tab drag reds.
    const tabWithRaf =
        "import { useDragMorph } from '...'; function useTabDragMorph(){ const x = useDragMorph<string>({}); requestAnimationFrame(() => {}); return x; }";
    const goodMorph =
        "import { Draggable, SpringProgress } from '@mkbabb/keyframes.js'; import { useLiquidFlex } from './useLiquidFlex'; const { response } = springPreset('snappy'); new Draggable({ spring, axis, snap: targets.map(t => t.center) });";
    if (detectNoSecondEngine(tabWithRaf, goodMorph).violations.every((v) => !v.includes("requestAnimationFrame"))) {
        fails.push("self-test L3: a planted rAF loop in the tab drag did NOT red");
    }

    // L4: a useDragMorph that did NOT land the native-snap consume + an empty book reds.
    if (detectKfConsumeBooked("no booking here", "function x(){ /* no native snap wired */ }").violations.length === 0) {
        fails.push("self-test L4: a not-landed native-snap consume + empty book did NOT red");
    }

    // L5: a draggable-gated roving reds.
    const sfcGatedRoving =
        '<button :tabindex="draggable ? rovingTabindex(idx) : -1" /> @keydown="onStripKeydown" function rovingTabindex(){} function onStripKeydown(){}';
    if (detectAdditiveA11y(sfcGatedRoving, "model.value = value").violations.every((v) => !v.includes("gated behind :draggable"))) {
        fails.push("self-test L5: a planted :draggable-gated roving did NOT red");
    }
    // L5: a drag that does not write the model reds.
    if (detectAdditiveA11y(
        '<button :tabindex="rovingTabindex(idx)" /> @keydown="onStripKeydown" function rovingTabindex(){} function onStripKeydown(){} aria-pressed isActive(option.value) aria-selected isActive(option.value)',
        "onSnap: (value) => { /* no model write */ }",
    ).violations.every((v) => !v.includes("does not write"))) {
        fails.push("self-test L5: a drag-snap that never writes the model did NOT red");
    }

    return fails;
}

export function detect() {
    const pull = detectPullIsDefault();
    const cap = detectVisibleSquishCap();
    const engine = detectNoSecondEngine();
    const consume = detectKfConsumeBooked();
    const a11y = detectAdditiveA11y();
    const selfTestFails = selfTest();
    const violations = [
        ...pull.violations,
        ...cap.violations,
        ...engine.violations,
        ...consume.violations,
        ...a11y.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            pull: pull.facts,
            cap: cap.facts,
            engine: engine.facts,
            consume: consume.facts,
            a11y: a11y.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_LIQUID_TAB_ARTIFACT", "BC-liquid-tab");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:liquid-tab",
        facts,
        violations,
    });

    console.log("proof:liquid-tab — the LIQUID TAB: pull the active pill → it morphs/squishes/flings to location (BC.W-LIQUID-TAB, Band 3)");
    console.log(`  L1 pull is default   : draggable=${facts.pull.draggableDefault ?? "MISSING"}  click-path-intact=${facts.pull.clickPathIntact ? "yes ✓" : "NO ✗"}  underline-gated=${facts.pull.dragGatedUnderline ? "yes ✓" : "NO ✗"}`);
    console.log(`  L2 squish cap reads  : stretch const=${facts.cap.cap ?? "MISSING"} token=${facts.cap.token ?? "MISSING"} | blob const=${facts.cap.blobCap ?? "MISSING"} token=${facts.cap.blobToken ?? "MISSING"} (area≈${facts.cap.blobCap ? (facts.cap.blobCap * facts.cap.blobCap).toFixed(3) : "?"}) lockstep=${facts.cap.cap === facts.cap.token && facts.cap.blobCap === facts.cap.blobToken ? "yes ✓" : "NO ✗"}`);
    console.log(`  L3 no 2nd engine     : tab→useDragMorph=${facts.engine.tabUsesDragMorph} kf(Draggable,Spring,Flex,nativeSnap)=${facts.engine.composesDraggable}/${facts.engine.composesSpring}/${facts.engine.composesLiquidFlex}/${facts.engine.wiresNativeSnap} snappy-preset=${facts.engine.springIsPreset}`);
    console.log(`  L4 kf consume landed : native-snap=${facts.consume.consumeLanded ? "yes ✓" : "NO ✗"}  book(snap+rubberBand)=${facts.consume.booksSnap ? "yes ✓" : "NO ✗"}  by-name=${facts.consume.booksByName ? "yes ✓" : "NO ✗"}`);
    console.log(`  L5 additive a11y     : roving=${facts.a11y.hasRovingTabindex} keydown=${facts.a11y.hasStripKeydown} ungated=${facts.a11y.rovingNotGatedOnDraggable} drag-writes-model=${facts.a11y.dragWritesModel}`);
    console.log(`  self-tests           : ${facts.selfTestFails.length === 0 ? "all bites fire ✓" : `BROKEN ✗ (${facts.selfTestFails.length})`}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
