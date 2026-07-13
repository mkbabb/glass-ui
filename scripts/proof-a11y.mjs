#!/usr/bin/env node
// proof:a11y — BI.W-SLIDER-THUMB-NAME — the device-free a11y SOURCE-GATE FRAMEWORK.
//
// The axe-class assertions that are expressible from SOURCE (the device-free floor).
// The per-arm axe π specs (Playwright + real WebKit, the aria-input-field-name /
// forced-colors readback) remain the binding PAINT truth; this gate is the floor that
// makes a name-drop a RED before the browser ever runs. Authored born-RED on the
// nameless slider thumbs at HEAD; the work (the LabeledSlider forward + the aurora LCH
// names + the EasingPicker preset name) flips it GREEN.
//
// ARMS:
//   S1  slider-thumb accessible-name
//        S1a — LabeledSlider forwards the field <Label> to the slotted <Slider> as
//              `aria-label` (the ONLY name path that reaches the reka role="slider"
//              thumb; an `aria-labelledby` falls through to the roleless SliderRoot).
//        S1b — aurora enrollment: every bare <Slider> on the /substrates/aurora subtree
//              carries an accessible name (aria-label / aria-labelledby).
//   LF  LabeledField for/id — the label↔control association is wired on every
//        for/id-capable wrapper (Input / Select / Switch bind `:id="controlId"`; the
//        parent renders `<label :for="controlId">`). Slider names via aria-label (S1).
//   BUNDLE  the speedtest a11y BUNDLE is decomposed — no un-decomposed
//        `data-a11y-ask` / `speedtest-a11y-ask` bundle marker survives as a live
//        consumer marker; each concrete a11y row is owned by a real arm here.
//   EP  EasingPicker — every SelectTrigger carries a real accessible name (the
//        R→S→T SelectTrigger-name CHRONIC dies as a framework arm).
//   SD  StatusDot forced-colors — the dot keeps a non-color-perception signal under
//        `forced-colors: active` (a CanvasText-bordered glyph + a per-data-status
//        system-color triplet), delegated to the co-located a11y-fallback.css skin
//        (atlas O-E8 / GU-3-ASK-A — re-grounded: discharged by the skin, guarded here).
//   SC  SplitChars (EXTENDED by the SPLITCHARS-ARIA wave) — the split word keeps ONE
//        accessible name (the wrapper carries `aria-label`, glyphs are hidden), AND
//        (SC1) the labeled wrapper carries a name-bearing `:role` resolving to "img"
//        so the bound `aria-label` on a role-less generic element is spec-valid
//        (ARIA-in-HTML / aria-prohibited-attr); the StatusDot conditional-role idiom.
//
// Device-free SOURCE detectors + self-test bites (the anti-de-fang floor).
// Run: node scripts/proof-a11y.mjs

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:a11y";

// ── source targets (re-located by symbol/content, not spec line number) ──
const LABELED_SLIDER = "src/components/custom/labeled-field/LabeledSlider.vue";
const LABELED_FIELD = "src/components/custom/labeled-field/LabeledField.vue";
const LABELED_INPUT = "src/components/custom/labeled-field/LabeledInput.vue";
const LABELED_SELECT = "src/components/custom/labeled-field/LabeledSelect.vue";
const LABELED_SWITCH = "src/components/custom/labeled-field/LabeledSwitch.vue";
const EASING_PICKER = "src/components/custom/easing/EasingPicker.vue";
const SPLIT_CHARS = "src/components/custom/split-chars/SplitChars.vue";
const A11Y_FALLBACK = "src/styles/glass/a11y-fallback.css";
const AURORA_DIR = "demo/stories/substrates/aurora";
// The consumer trees the BUNDLE-decompose arm sweeps for a live bundle marker.
const BUNDLE_ROOTS = ["src", "demo"];

// ── helpers ──
const stripHtml = (s) =>
    s.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Isolate the SFC <template> body so a marker in a <script>/<style> string can never
// satisfy a DOM-shape clause. Capture from the FIRST <template …> to the LAST
// </template> (nested <template v-if> are common), then strip HTML comments.
function templateBody(sfc) {
    const open = /<template\b[^>]*>/i.exec(sfc);
    if (!open) return "";
    const lastClose = sfc.lastIndexOf("</template>");
    if (lastClose < 0) return "";
    return stripHtml(sfc.slice(open.index + open[0].length, lastClose));
}

// Every opening tag of `<Name …>` (self-closing or not). `<Slider\b` never matches
// `<LabeledSlider` (that begins `<L`, so the `<S` anchor cannot align) — the bare-vs-
// wrapper distinction is free.
function openTags(html, name) {
    const re = new RegExp(`<${name}\\b[\\s\\S]*?\\/?>`, "g");
    return html.match(re) ?? [];
}

const IGNORE_DIRS = new Set([
    "node_modules",
    ".git",
    ".claude",
    "dist",
    ".cache",
    "coverage",
]);
function walk(relDir, exts, out = []) {
    const abs = resolve(ROOT, relDir);
    if (!existsSync(abs)) return out;
    for (const entry of readdirSync(abs)) {
        if (IGNORE_DIRS.has(entry)) continue;
        const childRel = `${relDir}/${entry}`;
        const childAbs = resolve(ROOT, childRel);
        const st = statSync(childAbs);
        if (st.isDirectory()) walk(childRel, exts, out);
        else if (exts.some((e) => entry.endsWith(e))) out.push(childRel);
    }
    return out;
}

// ── S1a — LabeledSlider forwards the field label to the thumb via aria-label ──
export function detectS1a() {
    const violations = [];
    const facts = {};
    const tpl = templateBody(readRel(LABELED_SLIDER));
    const sliderTags = openTags(tpl, "Slider");
    facts.sliderTagCount = sliderTags.length;
    const forwards = sliderTags.some((t) => /:aria-label="label"/.test(t));
    // the OLD broken shape: an `aria-labelledby` (which never reaches the reka thumb)
    // WITHOUT an `aria-label`.
    facts.labelledByOnly = sliderTags.some(
        (t) => /:aria-labelledby=/.test(t) && !/:aria-label=/.test(t),
    );
    facts.forwardsLabelAsAriaLabel = forwards;
    if (!forwards)
        violations.push(
            "S1a: LabeledSlider does not forward the field label to the slotted <Slider> as `:aria-label=\"label\"` — an `aria-labelledby` alone falls through to the roleless reka SliderRoot, never naming the role=\"slider\" thumb (getLabel() mints no fallback for a single thumb)",
        );
    return { violations, facts };
}

// ── S1b — every bare <Slider> on the /substrates/aurora subtree is named ──
export function detectS1b() {
    const violations = [];
    const facts = { scanned: 0, bareSliders: 0, unnamed: [] };
    for (const rel of walk(AURORA_DIR, [".vue"])) {
        facts.scanned++;
        const tpl = templateBody(readRel(rel));
        for (const tag of openTags(tpl, "Slider")) {
            facts.bareSliders++;
            const named =
                /\baria-label\b/.test(tag) || /\baria-labelledby\b/.test(tag);
            if (!named) facts.unnamed.push(rel);
        }
    }
    if (facts.unnamed.length > 0)
        violations.push(
            `S1b: ${facts.unnamed.length} bare <Slider> on the aurora subtree carries no accessible name (aria-label / aria-labelledby): ${[...new Set(facts.unnamed)].join(", ")}`,
        );
    return { violations, facts };
}

// ── LF — the LabeledField for/id association is wired on every for/id wrapper ──
export function detectLF() {
    const violations = [];
    const facts = {};
    const field = readRel(LABELED_FIELD);
    const fieldTpl = templateBody(field);
    facts.parentLabelFor = /<label\b[^>]*\s:for="controlId"/.test(fieldTpl);
    facts.parentControlId = /const\s+controlId\s*=\s*useId\(\)/.test(field);
    if (!facts.parentLabelFor)
        violations.push(
            'LF: LabeledField does not render `<label :for="controlId">` — the label↔control programmatic association is absent',
        );
    if (!facts.parentControlId)
        violations.push(
            "LF: LabeledField does not mint a `controlId = useId()` — no stable id to associate",
        );
    // the for/id-capable wrappers bind `:id="controlId"` onto their control.
    const wrappers = {
        LabeledInput: LABELED_INPUT,
        LabeledSelect: LABELED_SELECT,
        LabeledSwitch: LABELED_SWITCH,
    };
    facts.wrappers = {};
    for (const [name, rel] of Object.entries(wrappers)) {
        const tpl = templateBody(readRel(rel));
        const bound = /:id="controlId"/.test(tpl);
        facts.wrappers[name] = bound;
        if (!bound)
            violations.push(
                `LF: ${name} does not bind \`:id="controlId"\` onto its control — the LabeledField \`for\` target is dangling (the input is unnamed by its label)`,
            );
    }
    return { violations, facts };
}

// ── BUNDLE — no un-decomposed a11y bundle marker survives as a live consumer marker ──
export function detectBundle() {
    const violations = [];
    const facts = { hits: [] };
    const marker = /\b(data-a11y-ask|speedtest-a11y-ask)\b/;
    for (const root of BUNDLE_ROOTS) {
        for (const rel of walk(root, [".vue", ".ts", ".css"])) {
            if (marker.test(readRel(rel))) facts.hits.push(rel);
        }
    }
    facts.decomposedRows = ["slider-thumb-name (S1)", "labeled-field-for-id (LF)"];
    if (facts.hits.length > 0)
        violations.push(
            `BUNDLE: an un-decomposed a11y bundle marker (data-a11y-ask / speedtest-a11y-ask) survives as a live consumer marker in: ${facts.hits.join(", ")} — a bundle is un-auditable; decompose it into the concrete owned rows`,
        );
    return { violations, facts };
}

// ── EP — every EasingPicker SelectTrigger carries a real accessible name ──
export function detectEP() {
    const violations = [];
    const facts = { triggers: 0, unnamed: 0 };
    const tpl = templateBody(readRel(EASING_PICKER));
    for (const tag of openTags(tpl, "SelectTrigger")) {
        facts.triggers++;
        if (!/\baria-label\b/.test(tag)) facts.unnamed++;
    }
    if (facts.triggers === 0)
        violations.push("EP: no <SelectTrigger> found in EasingPicker — the arm cannot locate the target");
    if (facts.unnamed > 0)
        violations.push(
            `EP: ${facts.unnamed} EasingPicker <SelectTrigger> has no \`aria-label\` — the combobox is named only by its selected value (the R→S→T SelectTrigger-name chronic); every trigger carries a real accessible name`,
        );
    return { violations, facts };
}

// ── SD — the StatusDot forced-colors non-color signal is carried by the skin ──
//     (atlas O-E8 re-grounded: the fix already ships in a11y-fallback.css; this is the
//      regression guard within the a11y framework).
export function detectSD() {
    const violations = [];
    const facts = {};
    const css = stripCss(readRel(A11Y_FALLBACK));
    // the forced-colors block co-located with the skin.
    facts.forcedColorsBlock = /@media\s*\(forced-colors:\s*active\)/.test(css);
    // the bordered glyph (the dot is visible under WHC without hue).
    facts.canvasTextBorder =
        /\.status-dot__dot\s*\{[\s\S]*?border:\s*1px solid CanvasText/.test(css);
    // the per-data-status system-color triplet (the variants stay distinguishable).
    const statuses = ["active", "paused", "error"];
    facts.perStatus = statuses.filter((s) =>
        new RegExp(
            `\\.status-dot__dot\\[data-status="${s}"\\][\\s\\S]*?background:\\s*\\w+\\s*!important`,
        ).test(css),
    );
    if (!facts.forcedColorsBlock)
        violations.push("SD: a11y-fallback.css carries no `@media (forced-colors: active)` block — the WHC skin is absent");
    if (!facts.canvasTextBorder)
        violations.push(
            "SD: the StatusDot dot (`.status-dot__dot`) resolves no `1px solid CanvasText` ring under forced-colors — the bordered glyph (the non-color-perception signal) is gone; the dot collapses to one system fill",
        );
    if (facts.perStatus.length < statuses.length)
        violations.push(
            `SD: the StatusDot per-data-status system-color triplet is incomplete (have ${facts.perStatus.join("/") || "none"}, need active/paused/error) — the variants stop being distinguishable under forced-colors`,
        );
    return { violations, facts };
}

// ── SC — the SplitChars accessible-name contract + the role="img" clause ──
//     BI.W-SPLITCHARS-ARIA EXTENDS the SLIDER-authored hook: the ONE-accessible-name
//     contract (the wrapper carries `aria-label`) PLUS the SC1 role clause — a bound
//     `aria-label` on a role-LESS generic wrapper is an ARIA-in-HTML violation
//     (`aria-prohibited-attr`), so the labeled <Primitive> must carry a name-bearing
//     `:role` resolving to "img" (the StatusDot conditional-role idiom, so a consumer
//     `as` override to a natively name-bearing element is not clobbered).
export function detectSC() {
    const violations = [];
    const facts = {};
    const sfc = readRel(SPLIT_CHARS);
    const tpl = templateBody(sfc);
    const primitiveTags = openTags(tpl, "Primitive");
    facts.wrapperHasAriaLabel = primitiveTags.some((t) =>
        /:aria-label="props\.text"|:aria-label="text"/.test(t),
    );
    // SC1 — the labeled wrapper carries a name-bearing `:role` binding that resolves
    // to "img". The binding is CONDITIONAL (`hostRole`, not a literal) so an `as`
    // override to a natively-labelable host keeps its own role — the StatusDot idiom.
    facts.wrapperRoleBinding = primitiveTags.some((t) => /:role\b/.test(t));
    facts.roleImgValue = /["']img["']/.test(sfc);
    if (!facts.wrapperHasAriaLabel)
        violations.push(
            "SC: SplitChars wrapper carries no `:aria-label` — the split word must keep ONE accessible name (glyph spans aria-hidden); the a11y contract is on the wrapper",
        );
    if (!(facts.wrapperRoleBinding && facts.roleImgValue))
        violations.push(
            'SC1: the SplitChars <Primitive> binds `:aria-label` on a role-LESS generic element (ARIA-in-HTML / aria-prohibited-attr) — a bare `<span aria-label>` bears no name from author, so the label is invalid-per-spec and AT support is undefined; the labeled wrapper must carry a name-bearing `:role` resolving to "img" whenever an accessible name is present (the StatusDot conditional-role idiom)',
        );
    return { violations, facts };
}

// ── self-test bites (the anti-de-fang floor) ──
function selfTest() {
    // S1a — the label-forward vs the old aria-labelledby-only shape.
    const s1aGood = `<Slider :aria-label="label" class="py-2" />`;
    const s1aBad = `<Slider :aria-labelledby="labelledBy" class="py-2" />`;
    const forwards = (t) => /:aria-label="label"/.test(t);

    // S1b — a bare <Slider> with a name vs without.
    const s1bNamed = `<Slider variant="spectrum" :aria-label="\`Stop 1 hue\`" />`;
    const s1bBare = `<Slider variant="spectrum" :model-value="[x]" />`;
    const named = (t) => /\baria-label\b/.test(t) || /\baria-labelledby\b/.test(t);

    // LF — a wrapper that binds :id="controlId" vs one that drops it.
    const lfGood = `<Input :id="controlId" />`;
    const lfBad = `<Input :type="type" />`;
    const idBound = (t) => /:id="controlId"/.test(t);

    // EP — a SelectTrigger with a name vs without.
    const epGood = `<SelectTrigger aria-label="Easing preset">`;
    const epBad = `<SelectTrigger>`;
    const trigNamed = (t) => /\baria-label\b/.test(t);

    // BUNDLE — a live marker reds; clean source passes.
    const bundleHit = `<div data-a11y-ask="3 asks">`;
    const bundleClean = `<div class="row">`;
    const hasMarker = (s) => /\b(data-a11y-ask|speedtest-a11y-ask)\b/.test(s);

    // SD — the CanvasText border present vs absent.
    const sdGood = `.status-dot__dot { border: 1px solid CanvasText; }`;
    const sdBad = `.status-dot__dot { border: none; }`;
    const hasBorder = (s) =>
        /\.status-dot__dot\s*\{[\s\S]*?border:\s*1px solid CanvasText/.test(s);

    // SC1 — a labeled wrapper WITH a `:role` binding passes; a role-LESS one that
    // still binds `aria-label` reds SC1 (the ARIA-in-HTML fixture).
    const scGood = `<Primitive :role="hostRole" :aria-label="props.text">x</Primitive>`;
    const scBad = `<Primitive :aria-label="props.text">x</Primitive>`;
    const scRoled = (t) => /:role\b/.test(t);

    return {
        s1aBite: forwards(s1aGood) === true && forwards(s1aBad) === false,
        s1bBite: named(s1bNamed) === true && named(s1bBare) === false,
        lfBite: idBound(lfGood) === true && idBound(lfBad) === false,
        epBite: trigNamed(epGood) === true && trigNamed(epBad) === false,
        bundleBite: hasMarker(bundleHit) === true && hasMarker(bundleClean) === false,
        sdBite: hasBorder(sdGood) === true && hasBorder(sdBad) === false,
        scBite: scRoled(scGood) === true && scRoled(scBad) === false,
    };
}

export function detect() {
    if (!existsSync(resolve(ROOT, LABELED_SLIDER)))
        return { violations: [`A0: ${LABELED_SLIDER} not found`], facts: {} };
    const s1a = detectS1a();
    const s1b = detectS1b();
    const lf = detectLF();
    const bundle = detectBundle();
    const ep = detectEP();
    const sd = detectSD();
    const sc = detectSC();
    const bites = selfTest();
    const biteViolations = [];
    for (const [k, ok] of Object.entries(bites)) {
        if (!ok)
            biteViolations.push(
                `SELF-TEST: the \`${k}\` bite BROKE — the detector no longer distinguishes its planted fixture`,
            );
    }
    const violations = [
        ...s1a.violations,
        ...s1b.violations,
        ...lf.violations,
        ...bundle.violations,
        ...ep.violations,
        ...sd.violations,
        ...sc.violations,
        ...biteViolations,
    ];
    return {
        violations,
        facts: {
            s1a: s1a.facts,
            s1b: s1b.facts,
            lf: lf.facts,
            bundle: bundle.facts,
            ep: ep.facts,
            sd: sd.facts,
            sc: sc.facts,
            selfTests: bites,
            // The binding PAINT truth (booked on the π batch #92, NOT asserted here):
            piObligation:
                "axe `aria-input-field-name` = 0 on /substrates/aurora + the configurator routes; forced-colors readback on StatusDot; both modes, Chromium + real WebKit (tests-visual/a11y-slider.spec.ts).",
        },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_A11Y_ARTIFACT", "BI-a11y");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:a11y",
        command: COMMAND,
        note: "BI.W-SLIDER-THUMB-NAME device-free a11y SOURCE-GATE FRAMEWORK — S1 slider-thumb accessible-name (S1a LabeledSlider forwards the label as aria-label; S1b aurora bare <Slider>s named) · LF LabeledField for/id association · BUNDLE the a11y bundle is decomposed (no live marker) · EP every EasingPicker SelectTrigger named (the R→S→T chronic) · SD StatusDot forced-colors non-color signal (re-grounded onto the a11y-fallback.css skin) · SC SplitChars one-accessible-name contract + the SC1 role=\"img\" clause (the labeled wrapper carries a name-bearing role so the bound aria-label is spec-valid — the SPLITCHARS-ARIA extension). The axe π readback is the binding paint truth (booked on the π batch).",
        facts,
        violations,
    });
    console.log(`proof:a11y — ${status.toUpperCase()}`);
    console.log(`  S1a labeled-slider-forward=${facts.s1a?.forwardsLabelAsAriaLabel}`);
    console.log(`  S1b aurora bare-sliders=${facts.s1b?.bareSliders} unnamed=${facts.s1b?.unnamed?.length}`);
    console.log(`  LF  parent-for=${facts.lf?.parentLabelFor} wrappers=${JSON.stringify(facts.lf?.wrappers)}`);
    console.log(`  BUNDLE live-markers=${facts.bundle?.hits?.length}`);
    console.log(`  EP  triggers=${facts.ep?.triggers} unnamed=${facts.ep?.unnamed}`);
    console.log(`  SD  border=${facts.sd?.canvasTextBorder} per-status=${facts.sd?.perStatus?.length}`);
    console.log(`  SC  wrapper-aria-label=${facts.sc?.wrapperHasAriaLabel} role-binding=${facts.sc?.wrapperRoleBinding} role-img=${facts.sc?.roleImgValue}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
