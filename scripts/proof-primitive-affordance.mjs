#!/usr/bin/env node
// AW.W25 — proof:primitive-affordance.
//
// The cross-atom affordance/state/motion/a11y sweep gate. Every interactive
// primitive must speak ONE design+interaction language:
//   1. the iOS-26 press-spring (`.tap-squish` or the button's own
//      `active:scale-[var(--scale-press-btn)]` on the spring channel) fires on
//      each named interactive atom; the `.tap-squish` PRM reset is reachable.
//   2. the four-state contract (hover ∧ active-press ∧ `.focus-ring` ∧
//      `disabled:opacity-disabled`/`pointer-events-none`) is present on the
//      atoms that previously carried no focus paint (Accordion + Collapsible
//      triggers now carry `.focus-ring`).
//   3. transition-discipline: the bare `transition-colors` atoms (Switch /
//      Toggle / Badge / AccordionTrigger) migrate to `transition-control`.
//   4. the Checkbox renders the dash (`<Minus>`) — not a check — at
//      `data-state="indeterminate"` (the indicator branches on the root state).
//   5. form-radius canon: NO multi-line / stepper form atom resolves `9999px`
//      (Textarea + NumberFieldInput take `rounded-field`; Input / SelectTrigger
//      keep the pill); `--radius-field` + `--radius-control` are minted in
//      theme.css.
//   6. overlay-band material: Toast + Command compose a `glass-*` tier.
//   7. semantic-tone parity: `alertVariants` + the Toast `variant` resolve
//      `success`/`warning`/`info` from the `--{success,warning,info}` tokens.
//   8. Switch material (spring channel + glass-tint track) + the base Tabs
//      indicator pill wired into TabsList.
//
// Born RED on HEAD: 5+ atoms had no press transform; Accordion/Collapsible
// carried no `.focus-ring`; the Checkbox always rendered `<Check>`; Textarea
// inherited the `9999px` stadium; Toast/Command were flat; Alert/Toast carried
// only default/destructive.
//
// bite-check: strip a `.tap-squish` from any atom → RED; re-add the
// `transition-colors` on Switch → RED; revert the Checkbox to always-`<Check>`
// → RED; drop the Textarea `rounded-field` → RED; flatten Toast off
// `glass-floating` → RED; remove a tone variant → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

/** Strip HTML + block + line comments so a class assertion cannot be satisfied
 *  (or falsely tripped) by commentary referencing the retired surface. */
const stripComments = (src) =>
    (src ?? "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");

function run() {
    const violations = [];
    const facts = {};

    // ── 1. Press-spring universalization ───────────────────────────────
    // Each named interactive atom composes the press-spring (`.tap-squish`),
    // EXCEPT Button which keeps its own `active:scale-[var(--scale-press-btn)]`
    // on the spring channel (it composes `.tap-squish` for the channel +
    // overrides the scale value).
    const pressAtoms = {
        "src/components/ui/checkbox/Checkbox.vue": "tap-squish",
        "src/components/ui/radio-group/RadioGroupItem.vue": "tap-squish",
        "src/components/ui/select/SelectTrigger.vue": "tap-squish",
        "src/components/ui/tabs/TabsTrigger.vue": "tap-squish",
        "src/components/ui/accordion/AccordionTrigger.vue": "tap-squish",
        "src/components/ui/collapsible/CollapsibleTrigger.vue": "tap-squish",
    };
    facts.pressAtoms = {};
    for (const [file, token] of Object.entries(pressAtoms)) {
        const src = read(file);
        const has = !!src && src.includes(token);
        facts.pressAtoms[file] = has;
        if (!has) violations.push(`press-spring: ${file} does not compose \`${token}\``);
    }
    // Button composes `.tap-squish` (spring channel) AND keeps `--scale-press-btn`.
    const button = read("src/components/ui/button/index.ts");
    const buttonPress =
        !!button &&
        button.includes("tap-squish") &&
        // AY.W-CSS1 — accept BOTH the v4 shorthand active:scale-(--x) and the
        // arbitrary active:scale-[var(--x)] form (both compile identically).
        (button.includes("active:scale-(--scale-press-btn)") ||
            button.includes("active:scale-[var(--scale-press-btn)]"));
    facts.buttonPress = buttonPress;
    if (!buttonPress)
        violations.push(
            "press-spring: button/index.ts must compose `.tap-squish` (spring channel) and keep `active:scale-[var(--scale-press-btn)]`",
        );
    // Switch thumb springs on a `--spring-*` channel (translate transition).
    const sw = read("src/components/ui/switch/Switch.vue");
    const switchSpring = !!sw && /transition:\s*translate[^;]*var\(--spring-/.test(sw);
    facts.switchSpring = switchSpring;
    if (!switchSpring)
        violations.push(
            "press-spring: Switch thumb travel must read a `--spring-*` channel (transition: translate … var(--spring-*))",
        );

    // PRM reset reachable on `.tap-squish` (utilities.css).
    const util = readMonolith(ROOT, "utilities");
    const prmReset =
        !!util &&
        /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.tap-squish:active\s*\{[\s\S]*?scale:\s*1/.test(
            util,
        );
    facts.prmResetReachable = prmReset;
    if (!prmReset)
        violations.push(
            "press-spring: the `.tap-squish` `prefers-reduced-motion: reduce` reset (scale:1) is not reachable",
        );

    // ── 2. Four-state focus-ring completion ────────────────────────────
    // Accordion + Collapsible triggers newly carry `.focus-ring`.
    for (const file of [
        "src/components/ui/accordion/AccordionTrigger.vue",
        "src/components/ui/collapsible/CollapsibleTrigger.vue",
    ]) {
        const src = read(file);
        const has = !!src && src.includes("focus-ring");
        facts[`focusRing:${file}`] = has;
        if (!has) violations.push(`four-state: ${file} must carry \`.focus-ring\``);
    }

    // ── 3. Transition-discipline uniformity ────────────────────────────
    // Switch/Toggle/Badge/AccordionTrigger migrated to `transition-control`
    // and carry NO bare `transition-colors`.
    const transitionAtoms = [
        "src/components/ui/switch/Switch.vue",
        "src/components/ui/toggle/index.ts",
        "src/components/ui/badge/index.ts",
        "src/components/ui/accordion/AccordionTrigger.vue",
    ];
    facts.transitionControl = {};
    for (const file of transitionAtoms) {
        const src = stripComments(read(file) ?? "");
        const hasControl = src.includes("transition-control");
        // The bare `transition-colors` utility must be gone from the base string.
        const hasBareColors = /\btransition-colors\b/.test(src);
        facts.transitionControl[file] = { hasControl, hasBareColors };
        if (!hasControl)
            violations.push(`transition-discipline: ${file} must compose \`transition-control\``);
        if (hasBareColors)
            violations.push(
                `transition-discipline: ${file} still carries a bare \`transition-colors\` (migrate to transition-control)`,
            );
    }

    // ── 4. Checkbox indeterminate <Minus> branch ───────────────────────
    const cb = read("src/components/ui/checkbox/Checkbox.vue");
    const minusBranch =
        !!cb &&
        cb.includes("Minus") &&
        /indeterminate/.test(cb) &&
        // the dash glyph is gated by the indeterminate state (not unconditional)
        /Minus[\s\S]*?indeterminate|indeterminate[\s\S]*?Minus/.test(cb);
    facts.checkboxIndeterminateMinus = minusBranch;
    if (!minusBranch)
        violations.push(
            "indeterminate: Checkbox must render `<Minus>` branched on `data-[state=indeterminate]` (not always `<Check>`)",
        );

    // ── 5. Form-radius canon ───────────────────────────────────────────
    // AZ.W-CARVE — theme.css drained into theme/*.css partials; the
    // --radius-field/--radius-control semantic radius aliases live in
    // theme/radius.css, so the form-radius witness reads composed (else it
    // mis-asserts against the thin @import root).
    const theme = readMonolith(ROOT, "theme") ?? "";
    const hasRadiusField = /--radius-field:\s*var\(/.test(theme);
    const hasRadiusControl = /--radius-control:\s*var\(/.test(theme);
    facts.radiusFieldMinted = hasRadiusField;
    facts.radiusControlMinted = hasRadiusControl;
    if (!hasRadiusField)
        violations.push("form-radius: `--radius-field` is not minted in theme.css");
    if (!hasRadiusControl)
        violations.push("form-radius: `--radius-control` is not minted in theme.css");

    // Textarea + NumberFieldInput resolve `rounded-field` (NOT the pill);
    // Input + SelectTrigger keep `rounded-pill`.
    const textarea = read("src/components/ui/textarea/Textarea.vue") ?? "";
    const nfi = read("src/components/ui/number-field/NumberFieldInput.vue") ?? "";
    const input = read("src/components/ui/input/Input.vue") ?? "";
    const selTrig = read("src/components/ui/select/SelectTrigger.vue") ?? "";
    const taField = textarea.includes("rounded-field");
    const nfiField = nfi.includes("rounded-field");
    // Neither multi-line/stepper atom hard-sets a 9999px pill radius.
    const taNoPill = !/rounded-pill/.test(textarea);
    const nfiNoPill = !/rounded-pill/.test(nfi);
    const inputPill = input.includes("input-pill"); // single-line keeps pill via .input-pill
    const selPill = selTrig.includes("rounded-pill");
    facts.formRadius = { taField, nfiField, taNoPill, nfiNoPill, inputPill, selPill };
    if (!taField) violations.push("form-radius: Textarea must resolve `rounded-field`");
    if (!nfiField) violations.push("form-radius: NumberFieldInput must resolve `rounded-field`");
    if (!taNoPill) violations.push("form-radius: Textarea must not hard-set `rounded-pill`");
    if (!nfiNoPill)
        violations.push("form-radius: NumberFieldInput must not hard-set `rounded-pill`");
    if (!inputPill) violations.push("form-radius: Input must keep the pill (`.input-pill`)");
    if (!selPill) violations.push("form-radius: SelectTrigger must keep `rounded-pill`");

    // ── 6. Overlay-band material ───────────────────────────────────────
    const toast = read("src/components/ui/toast/Toast.vue") ?? "";
    const command = read("src/components/ui/command/Command.vue") ?? "";
    const toastCode = stripComments(toast);
    const commandCode = stripComments(command);
    const toastGlass = toastCode.includes("glass-floating");
    const commandGlass = commandCode.includes("glass-floating");
    // and the flat surfaces are gone (comment-stripped so a "was bg-background"
    // note cannot trip the negative assertion).
    const toastFlat = /\bbg-background\b/.test(toastCode) || /shadow-modal/.test(toastCode);
    const commandFlat = /\bbg-popover\b/.test(commandCode);
    facts.overlayMaterial = { toastGlass, commandGlass, toastFlat, commandFlat };
    if (!toastGlass) violations.push("overlay: Toast must compose `glass-floating`");
    if (!commandGlass) violations.push("overlay: Command must compose `glass-floating`");
    if (toastFlat)
        violations.push("overlay: Toast still carries the flat `bg-background`/`shadow-modal`");
    if (commandFlat) violations.push("overlay: Command still carries the flat `bg-popover`");

    // ── 7. Semantic-tone parity ────────────────────────────────────────
    const alert = read("src/components/ui/alert/index.ts") ?? "";
    const TONES = ["success", "warning", "info"];
    facts.tones = { alert: {}, toast: {} };
    for (const tone of TONES) {
        const inAlert = new RegExp(`\\b${tone}:`).test(alert) && alert.includes(tone);
        facts.tones.alert[tone] = inAlert;
        if (!inAlert)
            violations.push(`tone: alertVariants is missing the \`${tone}\` variant`);
        // Toast variant union + the class branch.
        const inToast = toastCode.includes(`'${tone}'`) || toastCode.includes(`"${tone}"`);
        const toastTokenPaint = new RegExp(`(bg|text|border)-${tone}`).test(toastCode);
        facts.tones.toast[tone] = inToast && toastTokenPaint;
        if (!inToast)
            violations.push(`tone: Toast variant union is missing \`${tone}\``);
        if (!toastTokenPaint)
            violations.push(`tone: Toast does not paint the \`--${tone}\` token for the \`${tone}\` variant`);
    }

    // ── 8. Switch material + base Tabs indicator ───────────────────────
    const switchGlassTrack =
        sw.includes("glass-bg-quiet") || sw.includes("glass-highlight");
    facts.switchGlassTrack = switchGlassTrack;
    if (!switchGlassTrack)
        violations.push(
            "switch-material: Switch must compose a glass-tint rung (`--glass-bg-quiet` track or `--glass-highlight` thumb)",
        );
    const tabsList = read("src/components/ui/tabs/TabsList.vue") ?? "";
    const tabsIndicatorWired = /TabsIndicator/.test(tabsList);
    facts.tabsIndicatorWired = tabsIndicatorWired;
    if (!tabsIndicatorWired)
        violations.push(
            "tabs-indicator: the base `TabsList` must render the `TabsIndicator` pill",
        );

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_PRIMITIVE_AFFORDANCE_ARTIFACT",
        "AW-primitive-affordance",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:primitive-affordance",
        facts,
        violations,
    });

    console.log(
        "proof:primitive-affordance — the cross-atom press-spring + four-state + radius + overlay + tone sweep (AW.W25)",
    );
    console.log(`  press-spring atoms     : ${Object.values(facts.pressAtoms).every(Boolean) && buttonPress && switchSpring ? "all ✓" : "GAP ✗"}`);
    console.log(`  PRM reset reachable    : ${prmReset ? "yes ✓" : "NO ✗"}`);
    console.log(`  focus-ring completion  : ${facts["focusRing:src/components/ui/accordion/AccordionTrigger.vue"] && facts["focusRing:src/components/ui/collapsible/CollapsibleTrigger.vue"] ? "yes ✓" : "NO ✗"}`);
    console.log(`  Checkbox indeterminate : ${minusBranch ? "<Minus> ✓" : "NO ✗"}`);
    console.log(`  form-radius canon      : ${taField && nfiField && taNoPill && nfiNoPill ? "yes ✓" : "NO ✗"}`);
    console.log(`  overlay glass tier     : ${toastGlass && commandGlass ? "yes ✓" : "NO ✗"}`);
    console.log(`  semantic tones         : ${TONES.every((t) => facts.tones.alert[t] && facts.tones.toast[t]) ? "all ✓" : "GAP ✗"}`);
    console.log(`  switch+tabs indicator  : ${switchGlassTrack && tabsIndicatorWired ? "yes ✓" : "NO ✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
