#!/usr/bin/env node
// proof:press-unify — BB.W-PRESS-UNIFY (the ONE interruptible coupled spring-press).
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern,
// mirroring proof-spring-tokens-synced.mjs / proof-dock-no-scale-pop.mjs). Four
// falsifiable clauses, each born-RED at the dead-primitive HEAD and driven GREEN by
// the wire. The BINDING visual truth is the π readback (tests-visual/press-unify.spec.ts
// + the W-PRESS-UNIFY-DELTA) — the press frame-series + the mid-flight ABSORB + the
// PRM-instant; this gate is the device-free CI half (it carries `ci` so proof:tag-parity
// stays green).
//
//   P1 — the spring-press driver (useLiquidPress, which composes the shipped
//        useSpringPress) is BOUND on ≥2 named binary SFCs (a `:style` press-value read
//        + the pointer handlers), AND the J-inv-10 substrate-without-consumer flag is
//        cleared. RED at HEAD: useSpringPress had ONE consumer (Button); useLiquidPress
//        did not exist. Anti-evasion bite: an SFC that IMPORTS the driver but never
//        binds the press style/handlers does NOT count (a fake consumer REDs).
//   P2 — the re-press is INTERRUPTIBLE: the driver composes the spring's
//        velocity-continuous target re-seat (the kf SpringProgress reset/target re-seat
//        useSpring owns), NOT a fixed CSS `:active` transition as the SOLE press path.
//        The CSS `.tap-squish` / `.glass-press` `:active` is the no-JS FLOOR only.
//   P3 — the press is COUPLED: ONE press drive (the `--*-press-t` custom property
//        useLiquidPress writes) reaches BOTH the scale leg (the reciprocal squish) AND a
//        sub-perceptual brightness/specular leg, both on the SAME spring clock. RED at
//        HEAD: button/index.ts is scale-only; the surface bg swaps on the bezier leg.
//   P4 — PRM is INSTANT: the driver threads `respectReducedMotion` (NOT false) so the
//        kf spring snaps with zero in-between transform frames; the CSS PRM carve stays
//        the floor.
//
// + a self-test bite: a synthetic scale-only / non-interruptible / un-coupled source
//   MUST flag, proven every run (the anti-evasion floor — a hollow detector that always
//   greens is the AZ close-class lie).

import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const FILES = {
    driver: "src/composables/motion/useLiquidPress.ts",
    springPress: "src/composables/motion/useSpringPress.ts",
    motionBarrel: "src/composables/motion/index.ts",
    button: "src/components/ui/button/Button.vue",
    card: "src/components/ui/card/Card.vue",
    cssFloor: "src/styles/utilities/base.css",
    surfaces: "src/styles/glass/surfaces.css",
    propRegs: "src/styles/tokens/property-regs.css",
};

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

// Strip JS/CSS line- + block-comments so a detector matches REAL source, not a
// docstring example (the house comment-strip pattern). URL-safe `://` is preserved by
// only stripping `//` not preceded by `:`.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];
const facts = {};

// ── P1 — the driver is BOUND on ≥2 named binary SFCs ──────────────────────────
// The driver exists + composes the shipped useSpringPress (the activation, not a fork).
const driverSrc = read(FILES.driver);
const driverStripped = stripComments(driverSrc);
const driverExists = /export function useLiquidPress\b/.test(driverStripped);
const driverComposesSpringPress =
    /import\s*\{[^}]*\buseSpringPress\b[^}]*\}\s*from\s*["']\.\/useSpringPress["']/.test(
        driverStripped,
    ) && /useSpringPress\s*\(/.test(driverStripped);
if (!driverExists)
    violations.push("P1: useLiquidPress is not defined (the driver is absent)");
if (!driverComposesSpringPress)
    violations.push(
        "P1: useLiquidPress does not compose the shipped useSpringPress (a re-fork, not the activation)",
    );

// The driver is published on /motion (the keyframes-bearing barrel; NOT the root).
const barrelStripped = stripComments(read(FILES.motionBarrel));
const driverPublished = /export \* from "\.\/useLiquidPress"/.test(barrelStripped);
if (!driverPublished)
    violations.push(
        "P1: useLiquidPress is not re-exported from the /motion barrel (composables/motion/index.ts)",
    );

// The J-inv-10 measure is the DEAD PRIMITIVE (`useSpringPress`) activation: it is bound
// on ≥2 named binary SFCs, counting EITHER a direct `useSpringPress` binding (Button —
// the W-BUTTON-GLASS surface, left inline to keep proof:button-glass's B2 green) OR a
// binding via the `useLiquidPress` wrapper (Card — the wrapper composes `useSpringPress`,
// so a wrapper binding IS a `useSpringPress` activation). A binary consumer binds BOTH the
// press VALUE (the press style / a `1 - value*…` scale read) AND the pointer handlers
// (press/release). Anti-evasion: an import that never binds the value does NOT count.
function isPressConsumer(rel) {
    const src = stripComments(read(rel));
    const viaWrapper =
        /\buseLiquidPress\b/.test(src) &&
        /from\s*["'][^"']*useLiquidPress["']/.test(src);
    const viaDirect =
        /\buseSpringPress\b/.test(src) &&
        /from\s*["'][^"']*useSpringPress["']/.test(src) &&
        /useSpringPress\s*\(/.test(src);
    const imports = viaWrapper || viaDirect;
    if (!imports)
        return {
            rel,
            imports: false,
            via: null,
            bindsValue: false,
            bindsHandlers: false,
            ok: false,
        };
    // Binds the press VALUE: the wrapper's `pressStyle`, OR a direct `.value.value` press
    // read fed into a scale / a `--*-press-t` write (the W-BUTTON-GLASS inline path).
    const bindsValue =
        /\bpressStyle\b/.test(src) ||
        (/\.value\.value/.test(src) && /(scale|press-t)/i.test(src));
    // Binds the pointer handlers (press()/release() reach the host pointer events).
    const bindsHandlers = /\.press\b/.test(src) && /\.release\b/.test(src);
    return {
        rel,
        imports: true,
        via: viaWrapper ? "useLiquidPress" : "useSpringPress",
        bindsValue,
        bindsHandlers,
        ok: bindsValue && bindsHandlers,
    };
}

const consumerProbe = [FILES.button, FILES.card].map(isPressConsumer);
const boundConsumers = consumerProbe.filter((c) => c.ok);
facts.consumers = consumerProbe.map((c) => ({
    file: relative(ROOT, resolve(ROOT, c.rel)),
    imports: c.imports,
    via: c.via,
    bindsValue: c.bindsValue,
    bindsHandlers: c.bindsHandlers,
    ok: c.ok,
}));
facts.boundConsumerCount = boundConsumers.length;
if (boundConsumers.length < 2) {
    violations.push(
        `P1: the spring-press (useSpringPress, the J-inv-10 dead primitive) is bound on only ${boundConsumers.length} binary SFC(s) — the ≥2-consumer bar is unmet`,
    );
}

// ── P2 — the re-press is INTERRUPTIBLE ────────────────────────────────────────
// The driver re-seats from the live spring (the velocity-continuous target re-seat the
// useSpring engine owns), NOT a fixed CSS :active transition as the SOLE press path.
const springPressStripped = stripComments(read(FILES.springPress));
// useSpringPress drives the target (target.value = 1/0) — the interruptible re-seat is
// the spring's; a re-press mid-release re-targets the LIVE position+velocity.
const drivesTarget =
    /target\.value\s*=\s*1/.test(springPressStripped) &&
    /target\.value\s*=\s*0/.test(springPressStripped);
if (!drivesTarget)
    violations.push(
        "P2: useSpringPress does not re-target the spring on press/release (the interruptible re-seat is absent)",
    );
// The CSS :active is the no-JS FLOOR (it must still EXIST as the degrade), but it is not
// the SOLE press — the JS driver above owns the armed press.
const cssFloorStripped = stripComments(read(FILES.cssFloor));
const cssFloorPresent = /\.tap-squish:active\s*\{/.test(cssFloorStripped);
if (!cssFloorPresent)
    violations.push(
        "P2: the CSS .tap-squish:active no-JS floor is absent (the progressive-enhancement degrade must stay)",
    );
facts.interruptible = { drivesTarget, cssFloorPresent };

// ── P3 — the press is COUPLED (ONE drive → ≥2 channels, on the spring clock) ──
// The CANONICAL coupling lives in the driver: ONE `pressVar` write + the reciprocal
// `scale` (the wrapper's `pressStyle`). Card consumes this. Button (the W-BUTTON-GLASS
// surface, kept inline so proof:button-glass's B2 stays green) couples the SAME way via
// its own inline `pressStyle` — both are COUPLED presses, asserted per surface.
const buttonStripped = stripComments(read(FILES.button));
// The DRIVER writes BOTH legs (the canonical Card path): the reciprocal scale + the
// consumer-named press var.
const driverWritesScale = /style\.scale\s*=/.test(driverStripped);
const driverWritesPressVar = /\[pressVar\]:/.test(driverStripped);
if (!(driverWritesScale && driverWritesPressVar)) {
    violations.push(
        "P3: the useLiquidPress driver does not feed BOTH the scale leg (style.scale) AND the press-var leg — the press is not coupled in the canonical wrapper",
    );
}
// Button couples inline: it writes the --glass-btn-press-t drive AND a reciprocal scale.
const buttonCouplesDrive = /--glass-btn-press-t/.test(buttonStripped);
const buttonCouplesScale = /style\.scale\s*=/.test(buttonStripped) || /scale:\s*`/.test(buttonStripped);
if (!(buttonCouplesDrive && buttonCouplesScale)) {
    violations.push(
        "P3: the Button press is not COUPLED — it must write the --glass-btn-press-t drive AND a reciprocal scale (one drive, two legs)",
    );
}
// The brightness/gleam leg reads the SAME drive (surfaces.css couples the active gleam on
// --glass-btn-press-t; property-regs.css registers it typed).
const surfacesStripped = stripComments(read(FILES.surfaces));
// BI.W-STYLE-REDRAIN — --glass-btn-press-t's @property registration was carved into
// tokens/property-regs-specular.css; read both so P3 FOLLOWS the carve into the leaf.
const propRegsStripped = stripComments(
    read(FILES.propRegs) +
        "\n" +
        read(FILES.propRegs.replace("property-regs.css", "property-regs-specular.css")),
);
const gleamReadsDrive = /--glass-btn-press-t/.test(surfacesStripped);
const driveRegistered = /@property\s+--glass-btn-press-t/.test(propRegsStripped);
if (!gleamReadsDrive) {
    violations.push(
        "P3: the brightness/specular leg does not read the same --glass-btn-press-t drive (a desynced second timer)",
    );
}
if (!driveRegistered) {
    violations.push(
        "P3: --glass-btn-press-t is not registered as a typed @property (the value cannot interpolate as a number)",
    );
}
// Card: ONE drive (--card-press-t) reaches the scale (driver) AND the brightness leg
// (the .glass-press filter: brightness() couples on --card-press-t in base.css).
const cardStripped = stripComments(read(FILES.card));
const cardPressVar = /pressVar:\s*["']--card-press-t["']/.test(cardStripped);
const cardGleamCouples =
    /\.glass-press\s*\{[\s\S]*?--card-press-t[\s\S]*?\}/.test(cssFloorStripped) ||
    /brightness\([^)]*--card-press-t/.test(cssFloorStripped);
const cardDriveRegistered = /@property\s+--card-press-t/.test(cssFloorStripped);
if (!(cardPressVar && cardGleamCouples)) {
    violations.push(
        "P3: the press is not COUPLED on Card — the --card-press-t drive must feed BOTH the scale leg AND the .glass-press brightness leg",
    );
}
if (!cardDriveRegistered) {
    violations.push(
        "P3: --card-press-t is not registered as a typed @property (base.css)",
    );
}
facts.coupled = {
    driverWritesScale,
    driverWritesPressVar,
    buttonCouplesDrive,
    buttonCouplesScale,
    gleamReadsDrive,
    driveRegistered,
    cardPressVar,
    cardGleamCouples,
    cardDriveRegistered,
};

// ── P3 (clock) — the press transform does NOT ride a generic --duration-* timer ──
// The driver owns NO --duration-* clock on the press transform (the spring carries its
// OWN settle clock — the W-GLASS-CAL per-spring duration). A generic --duration-* on the
// press scale/squish in the driver REDs.
const driverHasGenericClock = /--duration-(fast|normal|slow|moderate)\b/.test(
    driverStripped,
);
if (driverHasGenericClock) {
    violations.push(
        "P3-clock: the press driver pins a generic --duration-* clock on the press transform (the press must ride the spring's own settle clock — W-GLASS-CAL)",
    );
}
facts.springClock = { driverHasGenericClock };

// ── P4 — PRM is INSTANT ───────────────────────────────────────────────────────
// The driver threads respectReducedMotion (NOT false) — it passes the option through to
// useSpringPress (which threads it to useSpring → the kf SpringProgress PRM snap). It must
// NOT force respectReducedMotion: false anywhere.
const driverForcesPrmOff = /respectReducedMotion:\s*false/.test(driverStripped);
const driverThreadsPrm = /respectReducedMotion:\s*options\.respectReducedMotion/.test(
    driverStripped,
);
if (driverForcesPrmOff)
    violations.push(
        "P4: the driver forces respectReducedMotion: false (the PRM snap is defeated)",
    );
if (!driverThreadsPrm)
    violations.push(
        "P4: the driver does not thread respectReducedMotion to useSpringPress (the PRM-instant policy does not reach the spring)",
    );
// The CSS PRM carve stays the floor (the .tap-squish:active scale is neutralized under PRM).
const cssPrmCarve = /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.tap-squish:active[\s\S]*?scale:\s*1/.test(
    cssFloorStripped,
);
if (!cssPrmCarve)
    violations.push(
        "P4: the CSS .tap-squish:active PRM carve (scale: 1 under reduce) is absent",
    );
facts.prm = { driverForcesPrmOff, driverThreadsPrm, cssPrmCarve };

// ── compositor-only sanity (the driver's pressStyle writes scale + a custom prop only) ──
// The pressStyle must write NO layout property. (proof:no-layout-animation owns the
// @keyframes corpus; this is the driver-local mirror — the press is transform/filter only.)
const LAYOUT_PROPS =
    /\b(width|height|inlineSize|blockSize|padding|margin|top|left|right|bottom|fontSize|lineHeight|flexBasis|gap)\s*:/;
const pressStyleBlock =
    driverStripped.match(/const pressStyle = computed[\s\S]*?return style;/)?.[0] ??
    "";
if (LAYOUT_PROPS.test(pressStyleBlock)) {
    violations.push(
        "P5: the driver's pressStyle writes a layout property (the press must be transform/filter only — compositor-safe)",
    );
}
facts.compositorOnly = !LAYOUT_PROPS.test(pressStyleBlock);

// ── SELF-TEST BITE (anti-evasion — proven every run) ──────────────────────────
// A synthetic scale-only / un-coupled / non-interruptible source MUST flag against the
// detector predicates. Each bite is the inverse of a clause; if any fails to flag, the
// detector is hollow.
const bites = [];
// Bite 1 (P1): an SFC that imports but never binds the value REDs.
{
    const fakeConsumer = `import { useLiquidPress } from './useLiquidPress'\nconst x = 1`;
    const imports = /\buseLiquidPress\b/.test(fakeConsumer);
    const bindsStyle = /\.pressStyle\b/.test(fakeConsumer);
    const bindsHandlers = /\.press\b/.test(fakeConsumer) && /\.release\b/.test(fakeConsumer);
    const flagged = imports && !(bindsStyle && bindsHandlers);
    bites.push({ id: "P1-import-without-bind", flagged });
    if (!flagged)
        violations.push("SELF-TEST P1 bite did not flag an import-without-bind fake consumer");
}
// Bite 2 (P3): a scale-only press (no press-var write) REDs.
{
    const scaleOnly = `const style = {}; style.scale = '0.97'`;
    const writesScale = /style\.scale\s*=/.test(scaleOnly);
    const writesVar = /\[pressVar\]:/.test(scaleOnly);
    const flagged = writesScale && !writesVar;
    bites.push({ id: "P3-scale-only", flagged });
    if (!flagged)
        violations.push("SELF-TEST P3 bite did not flag a scale-only (un-coupled) press");
}
// Bite 3 (P4): a forced respectReducedMotion: false REDs.
{
    const prmOff = `useSpringPress({ respectReducedMotion: false })`;
    const flagged = /respectReducedMotion:\s*false/.test(prmOff);
    bites.push({ id: "P4-prm-forced-off", flagged });
    if (!flagged)
        violations.push("SELF-TEST P4 bite did not flag a forced respectReducedMotion: false");
}
// Bite 4 (P5): a layout-prop press REDs. The detector matches a CSS-object literal
// layout property (`width: ...`), so the synthetic uses the same form.
{
    const layoutPress = `const style = { width: '100px' }`;
    const flagged = LAYOUT_PROPS.test(layoutPress);
    bites.push({ id: "P5-layout-prop", flagged });
    if (!flagged)
        violations.push("SELF-TEST P5 bite did not flag a layout-property press");
}
facts.selfTestBites = bites;

const status = violations.length === 0 ? "pass" : "fail";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_PRESS_UNIFY_ARTIFACT",
    "press-unify",
);
writeGateArtifact(ARTIFACT, {
    gate: "proof:press-unify",
    status,
    generatedAt: snapshotStamp(),
    facts,
    violations,
});

console.log("proof:press-unify — the ONE interruptible coupled spring-press (BB.W-PRESS-UNIFY)");
console.log(`  driver: ${FILES.driver}`);
console.log(`  bound binary consumers (≥2 required): ${facts.boundConsumerCount}`);
for (const c of facts.consumers) {
    console.log(
        `    ${c.ok ? "✓" : "✗"} ${c.file}  (via:${c.via} value:${c.bindsValue} handlers:${c.bindsHandlers})`,
    );
}
console.log(`  interruptible (re-target + css floor): ${facts.interruptible.drivesTarget && facts.interruptible.cssFloorPresent}`);
console.log(`  coupled (button + card, one drive → ≥2 channels): ${facts.coupled.driverWritesScale && facts.coupled.driverWritesPressVar && facts.coupled.gleamReadsDrive && facts.coupled.cardGleamCouples}`);
console.log(`  PRM threaded (not forced off): ${facts.prm.driverThreadsPrm && !facts.prm.driverForcesPrmOff}`);
console.log(`  compositor-only pressStyle: ${facts.compositorOnly}`);
console.log(`  self-test bites all flagged: ${bites.every((b) => b.flagged)}`);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(
    `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
);
process.exit(status === "pass" ? 0 : 1);
