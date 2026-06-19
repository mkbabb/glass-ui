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
// bite-check (each clause carries a planted self-test below): a planted `draggable:
// false` default reds L1; a cap >1.2 (taffy) OR a constant/token fork reds L2; a
// planted local rAF spring in the tab drag reds L3; a missing CONSUME marker / book
// reds L4; a drag that gates selection behind the pull (removing the click path) reds
// L5; a drag-snap that does not write the model reds L5.

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

// ── L2 — the squish cap is the VISIBLE register, constant + token in lockstep.
//   DEFAULT_INDICATOR_MAX_STRETCH ≥ 1.12 (the visible-gel band, ≤1.2 anti-taffy) AND
//   --tab-indicator-max-stretch matches it (the SOLE cap source — the constant + the
//   token in lockstep, NOT a fork). Born-RED: HEAD 1.08.
export function detectVisibleSquishCap(constantsRaw, scalePaperRaw) {
    const violations = [];
    const facts = {};
    const constants = stripJs(constantsRaw ?? readFile(CONSTANTS));
    const scalePaper = stripCss(scalePaperRaw ?? readFile(SCALE_PAPER));

    const constM = constants.match(/DEFAULT_INDICATOR_MAX_STRETCH\s*=\s*([\d.]+)\b/);
    const tokenM = scalePaper.match(/--tab-indicator-max-stretch:\s*([\d.]+)\s*;/);
    facts.cap = constM ? Number(constM[1]) : null;
    facts.token = tokenM ? Number(tokenM[1]) : null;

    if (facts.cap == null) {
        violations.push("L2: DEFAULT_INDICATOR_MAX_STRETCH not found in constants.ts");
    } else {
        if (facts.cap < 1.12) {
            violations.push(`L2: DEFAULT_INDICATOR_MAX_STRETCH=${facts.cap} is below the visible-gel band (≥1.12) — the liquid-tab pull will not read as a swell (the HEAD 1.08 defect)`);
        }
        if (facts.cap > 1.2) {
            violations.push(`L2: DEFAULT_INDICATOR_MAX_STRETCH=${facts.cap} exceeds the anti-taffy bar (≤1.2) — the pill taffy-pulls instead of swelling`);
        }
    }
    if (facts.token == null) {
        violations.push("L2: --tab-indicator-max-stretch not found in scale-paper.css (the cap token authority)");
    } else {
        if (facts.token < 1.12) {
            violations.push(`L2: --tab-indicator-max-stretch=${facts.token} is below the visible-gel band (≥1.12)`);
        }
        if (facts.token > 1.2) {
            violations.push(`L2: --tab-indicator-max-stretch=${facts.token} exceeds the anti-taffy bar (≤1.2)`);
        }
    }
    // Lockstep — the constant + the token are the SOLE cap source, never a fork.
    if (facts.cap != null && facts.token != null && facts.cap !== facts.token) {
        violations.push(`L2: the squish cap FORKED — DEFAULT_INDICATOR_MAX_STRETCH=${facts.cap} ≠ --tab-indicator-max-stretch=${facts.token} (the constant + token are ONE cap source, in lockstep)`);
    }
    return { facts, violations };
}

// ── L3 — no second engine / no re-fork; the drag rides the `snappy` SPRING_PRESETS row.
//   useTabDragMorph composes useDragMorph (which composes kf Draggable + SpringProgress
//   + useLiquidFlex + decayRest); no hand-rolled pointer-velocity sampler or parallel
//   rAF spring integrator in the TAB drag (the D1/D2 fence). The drag spring is a
//   SPRING_PRESETS row (`snappy`), never a new clock.
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
    facts.composesDecayRest = /\bdecayRest\b/.test(dragMorph);
    if (!facts.composesDraggable) violations.push("L3: useDragMorph does not compose the kf Draggable substrate (the load-bearing reuse — no re-fork)");
    if (!facts.composesSpring) violations.push("L3: useDragMorph does not compose SpringProgress (the physics core)");
    if (!facts.composesLiquidFlex) violations.push("L3: useDragMorph does not compose useLiquidFlex (the `tanh` squish)");
    if (!facts.composesDecayRest) violations.push("L3: useDragMorph does not compose decayRest (the fling-to-nearest projection)");

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

// ── L4 — the kf consume is BOOKED, not faked.
//   asks-and-consumes.md names the kf `snap`/`rubberBand` republish ask + the consume-
//   and-delete target lines; useDragMorph.ts carries the `// CONSUME(kf snap):` marker.
//   Born-RED if the book is absent.
export function detectKfConsumeBooked(asksRaw, useDragMorphRaw) {
    const violations = [];
    const facts = {};
    const asks = asksRaw ?? readFile(ASKS);
    // The marker check reads the RAW (un-stripped) source — `// CONSUME(kf snap):` IS
    // a comment, so it must survive (we look for the literal marker line).
    const dragMorphRaw = useDragMorphRaw ?? readFile(USE_DRAG_MORPH);

    facts.hasConsumeMarker = /\/\/\s*CONSUME\(kf snap\):/.test(dragMorphRaw);
    if (!facts.hasConsumeMarker) {
        violations.push("L4: useDragMorph.ts carries no `// CONSUME(kf snap):` marker (the consume-and-delete target — where the published-surface re-roll collapses onto the native kf `snap`)");
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
export function detectAdditiveA11y(sfcRaw, tabDragRaw) {
    const violations = [];
    const facts = {};
    const sfc = stripJs(sfcRaw ?? readFile(SFC));
    const tabDrag = stripJs(tabDragRaw ?? readFile(TAB_DRAG));

    // (b) the roving-tabindex + arrow-key nav is present + ungated (the keyboard-
    // operable floor — the drag is a pointer ENHANCEMENT, never the sole mechanism).
    facts.hasRovingTabindex = /:tabindex="rovingTabindex/.test(sfc) && /function\s+rovingTabindex/.test(sfc);
    facts.hasStripKeydown = /@keydown="onStripKeydown"/.test(sfc) && /function\s+onStripKeydown/.test(sfc);
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

    // L2: a cap > 1.2 (taffy) reds.
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.35;", "--tab-indicator-max-stretch: 1.35;").violations.length === 0) {
        fails.push("self-test L2: a planted taffy cap (1.35 > 1.2) did NOT red");
    }
    // L2: a constant/token fork reds.
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.15;", "--tab-indicator-max-stretch: 1.13;").violations.length === 0) {
        fails.push("self-test L2: a planted constant/token fork (1.15 vs 1.13) did NOT red");
    }
    // L2: the good lockstep visible cap passes.
    if (detectVisibleSquishCap("const DEFAULT_INDICATOR_MAX_STRETCH = 1.15;", "--tab-indicator-max-stretch: 1.15;").violations.length !== 0) {
        fails.push("self-test L2: the good lockstep visible cap (1.15 == 1.15) unexpectedly red");
    }

    // L3: a planted local rAF spring in the tab drag reds.
    const tabWithRaf =
        "import { useDragMorph } from '...'; function useTabDragMorph(){ const x = useDragMorph<string>({}); requestAnimationFrame(() => {}); return x; }";
    const goodMorph =
        "import { Draggable, SpringProgress, decayRest } from '@mkbabb/keyframes.js'; import { useLiquidFlex } from './useLiquidFlex'; const { response } = springPreset('snappy');";
    if (detectNoSecondEngine(tabWithRaf, goodMorph).violations.every((v) => !v.includes("requestAnimationFrame"))) {
        fails.push("self-test L3: a planted rAF loop in the tab drag did NOT red");
    }

    // L4: a missing CONSUME marker / book reds.
    if (detectKfConsumeBooked("no booking here", "function x(){ decayRest(); }").violations.length === 0) {
        fails.push("self-test L4: a missing CONSUME marker + empty book did NOT red");
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
    console.log(`  L2 squish cap reads  : const=${facts.cap.cap ?? "MISSING"}  token=${facts.cap.token ?? "MISSING"}  lockstep=${facts.cap.cap === facts.cap.token ? "yes ✓" : "NO ✗"}`);
    console.log(`  L3 no 2nd engine     : tab→useDragMorph=${facts.engine.tabUsesDragMorph} kf(Draggable,Spring,Flex,decayRest)=${facts.engine.composesDraggable}/${facts.engine.composesSpring}/${facts.engine.composesLiquidFlex}/${facts.engine.composesDecayRest} snappy-preset=${facts.engine.springIsPreset}`);
    console.log(`  L4 kf consume booked : marker=${facts.consume.hasConsumeMarker ? "yes ✓" : "NO ✗"}  book(snap+rubberBand)=${facts.consume.booksSnap ? "yes ✓" : "NO ✗"}  by-name=${facts.consume.booksByName ? "yes ✓" : "NO ✗"}`);
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
