#!/usr/bin/env node
// BC.W-RADIO-FIX — radios toggle on every input path + read a clear glass selected-state.
// The SOURCE/MECHANISM arm of proof:radio-fix (device-free; the PAINT arm is the live
// π paint — the radio TOGGLES on mouse/touch/keyboard + the glass selected-state reads —
// owned by the orchestrator's capture + the π readback tests-visual/radio-fix.spec.ts).
// Per BC anti-disease law a per-mechanism green alone does NOT close the visual wave; the
// captured DELTA (the toggle on every input path + the filled glass disc) is the binding
// truth.
//
// FOUR source arms, each born-RED at HEAD pre-wave:
//   R1 — the selection-fill register is minted ONCE in tokens/scale-paper.css
//        (`--control-checked-bg` + `--control-ring`) AND read by BOTH RadioGroupItem.vue
//        (`data-[state=checked]` fill + the unchecked `--control-ring` outline) AND
//        Checkbox.vue (the SAME `--control-checked-bg` token). The anti-paste bite: a
//        SECOND inline `color-mix(... var(--primary) 88% ...)` literal on a checks atom
//        reds — the recipe IS the token.
//   R2 — the checked dot reads a CONTRAST ink. RadioGroupItem's indicator resolves
//        `--primary-foreground` (or `text-primary-foreground`) when checked (HEAD's
//        `fill-current text-current` = `--primary` on a `--primary` fill would vanish —
//        the gate asserts a contrast PAIR: the fill is `--control-checked-bg`/`--primary`,
//        the dot is `--primary-foreground`).
//   R3 — the four-state + a11y contract is intact (the WCAG/aria floor):
//        `tap-squish focus-ring touch-hit-area` present on RadioGroupItem; the
//        `disabled:opacity-disabled` arm survives; the SFC adds NO conflicting
//        `role`/`aria-pressed`/`aria-selected` on the radio item (role is reka-OWNED);
//        the centre `<Circle>` dot is NOT a focus/aria target (decorative); AND the
//        `touch-hit-area` hit pseudo is `pointer-events: none` (the swallow-fix — a
//        `pointer-events: auto` hit pseudo reds: the floor is the HIT box, never a
//        pointer-swallowing overlay).
//   R4 — no demo-local radio fork. demo/stories/forms/checks.vue binds the published
//        `<RadioGroup v-model>` + `<RadioGroupItem :value>` with NO local CSS override of
//        the ring/fill (the component owns the register).
//
// SELF-PROVING (the bite proof, every run): a planted same-hue dot reds R2; a missing
// checked-bg read reds R1; a SECOND inline 88%-color-mix literal reds R1; a planted
// `pointer-events: auto` hit pseudo reds R3; a planted `aria-pressed` on the radio item
// reds R3; a dropped `.focus-ring` reds R3; a local `[data-slot=radio-group-item]` ring
// override in the demo reds R4. If any synthetic check fails to flag, the gate reds loudly
// (acceptance is the RED-witness inverse).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:radio-fix";
const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const RADIO_ITEM = "src/components/ui/radio-group/RadioGroupItem.vue";
const CHECKBOX = "src/components/ui/checkbox/Checkbox.vue";
const SCALE_PAPER = "src/styles/tokens/scale-paper.css";
const HIT_AREA = "src/styles/utilities/a11y-overrides.css";
const DEMO_CHECKS = "demo/stories/forms/checks.vue";

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// The forbidden inline checked-fill literal (the recipe that MUST be the token, not pasted).
// Matches the spacing-agnostic `color-mix(in srgb, var(--primary) 88%, var(--glass-bg-floating))`
// form in either the bracket-arbitrary `bg-[...]` or a raw CSS declaration.
const INLINE_88_LITERAL =
    /color-mix\([_\s]*in[_\s]+srgb[_\s]*,[_\s]*var\(--primary\)[_\s]*88%[_\s]*,[_\s]*var\(--glass-bg-floating\)[_\s]*\)/i;

// ════════════════════════════════════════════════════════════════════════════════════
// R1 — the selection-fill register is minted ONCE + read by BOTH (the anti-paste bite).
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{scalePaper?:string, radio?:string, checkbox?:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectRegisterMintedOnce(src) {
    const violations = [];
    const facts = {};
    const scalePaper = src.scalePaper ?? readFile(SCALE_PAPER);
    const radio = src.radio ?? readFile(RADIO_ITEM);
    const checkbox = src.checkbox ?? readFile(CHECKBOX);
    const scaleCode = stripCss(scalePaper);

    // (1) the two tokens are DECLARED in scale-paper.css (the one register home).
    facts.controlCheckedBgDeclared = /--control-checked-bg\s*:/.test(scaleCode);
    facts.controlRingDeclared = /--control-ring\s*:/.test(scaleCode);
    if (!facts.controlCheckedBgDeclared)
        violations.push("R1: tokens/scale-paper.css does not declare `--control-checked-bg` (the selection glass-fill register must be minted ONCE)");
    if (!facts.controlRingDeclared)
        violations.push("R1: tokens/scale-paper.css does not declare `--control-ring` (the unchecked-outline register must be minted ONCE)");

    // (2) `--control-checked-bg` carries the canonical glass-`--primary` recipe AT THE TOKEN
    //     (the recipe is the token, declared once).
    const checkedBgDecl = scaleCode.match(/--control-checked-bg\s*:[^;]+;/i);
    facts.controlCheckedBgRecipe = !!(checkedBgDecl && INLINE_88_LITERAL.test(checkedBgDecl[0]));
    if (!facts.controlCheckedBgRecipe)
        violations.push("R1: `--control-checked-bg` does not resolve the glass-`--primary` recipe (color-mix(in srgb, var(--primary) 88%, var(--glass-bg-floating))) — the recipe must live AT the token");

    // (3) RadioGroupItem READS both: the checked fill `--control-checked-bg` + the unchecked
    //     ring `--control-ring`.
    facts.radioReadsCheckedBg = /--control-checked-bg/.test(radio);
    facts.radioReadsRing = /--control-ring/.test(radio);
    if (!facts.radioReadsCheckedBg)
        violations.push("R1: RadioGroupItem.vue does not read `--control-checked-bg` on the checked state (the ring must go outline → filled glass disc)");
    if (!facts.radioReadsRing)
        violations.push("R1: RadioGroupItem.vue does not read `--control-ring` on the unchecked outline (the soft warm-ink circle, not the dark `border-primary` hairline)");

    // (4) Checkbox READS the SAME `--control-checked-bg` token (one selection register).
    facts.checkboxReadsCheckedBg = /--control-checked-bg/.test(checkbox);
    if (!facts.checkboxReadsCheckedBg)
        violations.push("R1: Checkbox.vue does not read the shared `--control-checked-bg` token (the checks family must share ONE selection register)");

    // (5) the ANTI-PASTE bite: NEITHER checks atom carries a SECOND inline 88%-color-mix
    //     literal in a LIVE class/style (the recipe is the token, never pasted twice). The
    //     literal is allowed ONLY in scale-paper.css (the one home, the token body).
    facts.radioInlineLiteral = INLINE_88_LITERAL.test(radio);
    facts.checkboxInlineLiteral = INLINE_88_LITERAL.test(checkbox);
    if (facts.radioInlineLiteral)
        violations.push("R1: RadioGroupItem.vue carries an INLINE `color-mix(... var(--primary) 88% ...)` literal — the recipe IS the `--control-checked-bg` token, never pasted on the atom (the anti-paste bite)");
    if (facts.checkboxInlineLiteral)
        violations.push("R1: Checkbox.vue carries an INLINE `color-mix(... var(--primary) 88% ...)` literal — re-point onto the shared `--control-checked-bg` token (the recipe is minted ONCE, not twice)");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// R2 — the checked dot reads a CONTRAST ink (the fill/dot are NOT the same hue).
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{radio?:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectContrastDot(src) {
    const violations = [];
    const facts = {};
    const radio = src.radio ?? readFile(RADIO_ITEM);

    // The checked HOST sets the dot ink to `--primary-foreground` (the warm-cream that reads
    // ON the filled `--primary` disc) — either directly on the indicator/Circle, or on the
    // host with the dot inheriting via `text-current`/`fill-current`.
    facts.checkedDotInk =
        /data-\[state=checked\]:text-primary-foreground/.test(radio) ||
        /text-primary-foreground/.test(radio);
    if (!facts.checkedDotInk)
        violations.push("R2: RadioGroupItem.vue does not lift the checked dot to `--primary-foreground` (HEAD's `fill-current text-current` = `--primary` on a `--primary` fill VANISHES — the gate asserts a contrast PAIR)");

    // The dot must NOT stay the SAME hue as the fill: a `text-primary`/`fill-primary` dot ink
    // on a `--primary`/`--control-checked-bg` fill is the disease (dot present/absent only, no
    // material step). The dot ink reads `--primary-foreground` (above), NOT `--primary` when
    // checked. We flag a LITERAL same-hue checked dot (`data-[state=checked]:text-primary`).
    facts.sameHueDot = /data-\[state=checked\]:(text|fill)-primary(?!-foreground)\b/.test(radio);
    if (facts.sameHueDot)
        violations.push("R2: RadioGroupItem.vue paints the CHECKED dot the same `--primary` hue as the fill — the dot vanishes on the disc (assert the `--primary` fill / `--primary-foreground` dot contrast pair)");

    // The indicator's Circle reads `fill-current` so it inherits the host's contrast ink
    // (the one-source dot colour) — NOT a forked `fill-[#…]`/`fill-primary` literal.
    facts.dotFillCurrent = /<Circle[^>]*\bfill-current\b/.test(radio);
    if (!facts.dotFillCurrent)
        violations.push("R2: the indicator `<Circle>` does not read `fill-current` (the dot must inherit the host's checked `--primary-foreground` ink, one-source, not a forked fill literal)");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// R3 — the four-state + a11y contract is intact (WCAG/aria floor) + the swallow-fix.
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{radio?:string, hitArea?:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectA11yContract(src) {
    const violations = [];
    const facts = {};
    const radio = src.radio ?? readFile(RADIO_ITEM);
    const hitArea = src.hitArea ?? readFile(HIT_AREA);

    // (1) the four-state + a11y classes survive the re-skin.
    facts.tapSquish = /\btap-squish\b/.test(radio);
    facts.focusRing = /\bfocus-ring\b/.test(radio);
    facts.touchHitArea = /\btouch-hit-area\b/.test(radio);
    facts.disabledOpacity = /disabled:opacity-disabled/.test(radio);
    if (!facts.tapSquish)
        violations.push("R3: RadioGroupItem.vue dropped `tap-squish` (the press-squish affordance — the AFFORDANCE-MAP P leg)");
    if (!facts.focusRing)
        violations.push("R3: RadioGroupItem.vue dropped `.focus-ring` (the keyboard-focus a11y floor, WCAG 2.4.7 — a re-skin that drops it reds)");
    if (!facts.touchHitArea)
        violations.push("R3: RadioGroupItem.vue dropped `touch-hit-area` (the WCAG-2.5.5 44px hit floor)");
    if (!facts.disabledOpacity)
        violations.push("R3: RadioGroupItem.vue dropped `disabled:opacity-disabled` (the disabled `drone` option must stay inert+dim)");

    // (2) the SFC adds NO conflicting role/aria on the radio item (role is reka-OWNED — the
    //     AN.W4 "role via reka, no SFC re-author" discipline). A planted `role="radio"`/
    //     `aria-pressed`/`aria-selected`/`aria-checked` on the RadioGroupItem host reds (a
    //     role="radio" host must NOT also carry aria-pressed — the aria-allowed-attr floor).
    const itemTag = radio.match(/<RadioGroupItem[\s\S]*?>/);
    const itemAttrs = itemTag ? itemTag[0] : "";
    facts.noConflictRole = !/\b(role=|aria-pressed|aria-selected|aria-checked)\b/.test(itemAttrs);
    if (!facts.noConflictRole)
        violations.push("R3: RadioGroupItem.vue authors a conflicting `role`/`aria-pressed`/`aria-selected`/`aria-checked` on the radio item — role + aria-checked are reka-OWNED (a role=radio host must not also carry aria-pressed, the aria-allowed-attr floor)");

    // (3) the centre dot is DECORATIVE — NOT a focus/aria target. The `<Circle>` carries no
    //     `role`/`aria-*`/`tabindex` (a pure-decorative glyph stays role/aria-free; the
    //     selected state is announced via reka's `aria-checked`, not the glyph).
    const circleTag = radio.match(/<Circle[\s\S]*?\/?>/);
    const circleAttrs = circleTag ? circleTag[0] : "";
    facts.dotDecorative = !/\b(role=|aria-(?!hidden)|tabindex)\b/.test(circleAttrs);
    if (!facts.dotDecorative)
        violations.push("R3: the centre `<Circle>` dot authors a `role`/`aria-*`/`tabindex` — the decorative glyph must stay focus/aria-free (the state is announced via reka's `aria-checked`, not the glyph)");

    // (4) THE SWALLOW-FIX — the `touch-hit-area` hit pseudo is `pointer-events: none` (so the
    //     pointer falls through to the host = reka's listener, the §F "radios don't work" root).
    //     A `pointer-events: auto` hit pseudo reds (the floor is the HIT box, not a swallow).
    const hitCode = stripCss(hitArea);
    const utilBlock = hitCode.match(/@utility\s+touch-hit-area\s*\{[\s\S]*?\n\}/);
    const utilBody = utilBlock ? utilBlock[0] : hitCode;
    facts.hitPseudoPointerNone = /pointer-events\s*:\s*none/.test(utilBody);
    facts.hitPseudoPointerAuto = /pointer-events\s*:\s*auto/.test(utilBody);
    if (!facts.hitPseudoPointerNone)
        violations.push("R3: the `@utility touch-hit-area` hit pseudo (::before) is not `pointer-events: none` — the swallow-fix is missing (a tap on the 44px overlay never reaches reka's host listener: the §F 'radios don't work' root)");
    if (facts.hitPseudoPointerAuto)
        violations.push("R3: the `@utility touch-hit-area` hit pseudo carries `pointer-events: auto` — the overlay SWALLOWS the pointer before reka's host listener (the floor must be the HIT box geometry, never a pointer-capturing overlay)");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// R4 — no demo-local radio fork (the component owns the register).
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * @param {{demo?:string}} src
 * @returns {{facts:object, violations:string[]}}
 */
export function detectNoDemoFork(src) {
    const violations = [];
    const facts = {};
    const demo = src.demo ?? readFile(DEMO_CHECKS);

    // (1) the demo binds the PUBLISHED API: `<RadioGroup v-model=…>` + `<RadioGroupItem :value=…>`.
    facts.demoBindsVModel = /<RadioGroup\b[^>]*v-model/.test(demo);
    facts.demoBindsValue = /<RadioGroupItem\b[^>]*:value/.test(demo);
    if (!facts.demoBindsVModel)
        violations.push("R4: demo/stories/forms/checks.vue does not bind `<RadioGroup v-model>` (the published model API)");
    if (!facts.demoBindsValue)
        violations.push("R4: demo/stories/forms/checks.vue does not bind `<RadioGroupItem :value>` (the published item API)");

    // (2) NO local CSS override of the radio ring/fill register in the demo (the component
    //     owns the register — a `[data-slot="radio-group-item"]` ring/fill override in a
    //     demo `<style>` reds; the consumer re-tints via the `--control-*` tokens, not a fork).
    const demoCss = stripCss(demo);
    facts.demoRadioOverride =
        /\[data-slot=["']?radio-group-item["']?\][^{}]*\{[^}]*(border|background|--control-)/i.test(demoCss);
    if (facts.demoRadioOverride)
        violations.push("R4: demo/stories/forms/checks.vue overrides the radio ring/fill locally (`[data-slot=radio-group-item]` border/background) — the component owns the register; re-tint via the `--control-*` tokens, not a demo fork");

    return { facts, violations };
}

// ════════════════════════════════════════════════════════════════════════════════════
// Self-tests (the bite proof — each MUST flag; acceptance is the RED-witness inverse).
// ════════════════════════════════════════════════════════════════════════════════════

export function selfTests() {
    const bites = [];

    // (a) a missing checked-bg read on the radio reds R1.
    const noCheckedRead = detectRegisterMintedOnce({
        scalePaper: readFile(SCALE_PAPER),
        radio: '<RadioGroupItem class="border border-(--control-ring)" />',
        checkbox: readFile(CHECKBOX),
    });
    bites.push({
        label: "R1 missing-read — a RadioGroupItem that never reads `--control-checked-bg` reds",
        flag: noCheckedRead.violations.some((v) => /does not read `--control-checked-bg`/.test(v)) ? "flagged" : null,
    });

    // (b) a SECOND inline 88%-color-mix literal on a checks atom reds R1 (the anti-paste bite).
    const pastedLiteral = detectRegisterMintedOnce({
        scalePaper: readFile(SCALE_PAPER),
        radio: 'data-[state=checked]:bg-[color-mix(in_srgb,var(--primary)_88%,var(--glass-bg-floating))]',
        checkbox: readFile(CHECKBOX),
    });
    bites.push({
        label: "R1 anti-paste — a SECOND inline `color-mix(... --primary 88% ...)` literal on the radio reds",
        flag: pastedLiteral.violations.some((v) => /INLINE `color-mix/.test(v)) ? "flagged" : null,
    });

    // (c) a same-hue checked dot reds R2 (the planted vanishing dot).
    const sameHue = detectContrastDot({
        radio: '<RadioGroupItem class="data-[state=checked]:bg-(--control-checked-bg) data-[state=checked]:text-primary"><Circle class="fill-current" /></RadioGroupItem>',
    });
    bites.push({
        label: "R2 same-hue-dot — a `data-[state=checked]:text-primary` dot on a `--primary` fill reds (the vanishing dot)",
        flag: sameHue.violations.some((v) => /same `--primary` hue/.test(v)) ? "flagged" : null,
    });

    // (d) a planted `pointer-events: auto` hit pseudo reds R3 (the swallow).
    const swallow = detectA11yContract({
        radio: readFile(RADIO_ITEM),
        hitArea: "@utility touch-hit-area { position: relative; @media (pointer: coarse) { &::before { content: \"\"; min-width: 44px; pointer-events: auto; } } }",
    });
    bites.push({
        label: "R3 swallow — a `pointer-events: auto` hit pseudo reds (the overlay swallows the pointer before reka)",
        flag: swallow.violations.some((v) => /carries `pointer-events: auto`/.test(v)) ? "flagged" : null,
    });

    // (e) a planted `aria-pressed` on the radio item reds R3 (the aria-allowed-attr floor).
    const ariaPressed = detectA11yContract({
        radio: '<RadioGroupItem aria-pressed="false" class="tap-squish focus-ring touch-hit-area disabled:opacity-disabled"><Circle class="fill-current" /></RadioGroupItem>',
        hitArea: readFile(HIT_AREA),
    });
    bites.push({
        label: "R3 aria-conflict — a planted `aria-pressed` on the radio item reds (role=radio must not also carry aria-pressed)",
        flag: ariaPressed.violations.some((v) => /conflicting `role`\/`aria-pressed`/.test(v)) ? "flagged" : null,
    });

    // (f) a dropped `.focus-ring` reds R3 (the keyboard a11y floor).
    const noFocus = detectA11yContract({
        radio: '<RadioGroupItem class="tap-squish touch-hit-area disabled:opacity-disabled"><Circle class="fill-current" /></RadioGroupItem>',
        hitArea: readFile(HIT_AREA),
    });
    bites.push({
        label: "R3 focus-floor — a re-skin that drops `.focus-ring` reds (the keyboard-focus a11y floor)",
        flag: noFocus.violations.some((v) => /dropped `\.focus-ring`/.test(v)) ? "flagged" : null,
    });

    // (g) a local `[data-slot=radio-group-item]` ring override in the demo reds R4.
    const demoFork = detectNoDemoFork({
        demo: '<RadioGroup v-model="plan"><RadioGroupItem :value="p" /></RadioGroup><style>[data-slot="radio-group-item"] { border: 1px solid red; }</style>',
    });
    bites.push({
        label: "R4 demo-fork — a local `[data-slot=radio-group-item]` ring override in the demo reds",
        flag: demoFork.violations.some((v) => /overrides the radio ring\/fill locally/.test(v)) ? "flagged" : null,
    });

    return bites;
}

// ════════════════════════════════════════════════════════════════════════════════════
// Run.
// ════════════════════════════════════════════════════════════════════════════════════

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
    const src = {};
    const r1 = detectRegisterMintedOnce(src);
    const r2 = detectContrastDot(src);
    const r3 = detectA11yContract(src);
    const r4 = detectNoDemoFork(src);

    const bites = selfTests();
    const missed = bites.filter((b) => !b.flag);

    console.log('proof:radio-fix — radios toggle on every input path + the glass selected-state (BC.W-RADIO-FIX)');
    console.log(`  R1 register-minted-once   : ${r1.violations.length === 0 ? "OK" : r1.violations.length + " violation(s)"}`);
    console.log(`  R2 contrast-dot           : ${r2.violations.length === 0 ? "OK" : r2.violations.length + " violation(s)"}`);
    console.log(`  R3 a11y-contract+swallow  : ${r3.violations.length === 0 ? "OK" : r3.violations.length + " violation(s)"}`);
    console.log(`  R4 no-demo-fork           : ${r4.violations.length === 0 ? "OK" : r4.violations.length + " violation(s)"}`);
    console.log(`  self-test bites           : ${bites.length} (${missed.length === 0 ? "all flagged" : missed.length + " NOT flagged"})`);

    if (missed.length) {
        for (const m of missed) console.error(`  SELF-TEST MISS  ${m.label}`);
        console.error("\n[proof:radio-fix] SELF-TEST FAILED — a synthetic bite did NOT flag; the gate is not load-bearing.");
        process.exit(1);
    }

    const violations = [...r1.violations, ...r2.violations, ...r3.violations, ...r4.violations];
    for (const v of violations) console.error(`  ${v}`);

    const pass = violations.length === 0;
    const ARTIFACT = gateArtifactPath("GATE_RADIO_FIX_OUT", "radio-fix");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:radio-fix",
        command: COMMAND,
        r1: r1.facts,
        r2: r2.facts,
        r3: r3.facts,
        r4: r4.facts,
        selfTests: bites.length,
        violations,
    });

    if (!pass) {
        console.error(`\n[proof:radio-fix] ${violations.length} violation(s) — the radio must read the SHARED --control-checked-bg/--control-ring register (minted ONCE), lift the checked dot to the --primary-foreground contrast ink, keep the tap-squish/focus-ring/touch-hit-area a11y contract with the hit pseudo pointer-events:none (the swallow-fix), and own the register (no demo fork).`);
        process.exit(1);
    }
    console.log("\n[proof:radio-fix] the radio reads the shared selection register, the checked dot is a legible contrast disc, the a11y contract + the pointer-through swallow-fix hold, and the component owns the ring/fill (no demo fork).");
}
