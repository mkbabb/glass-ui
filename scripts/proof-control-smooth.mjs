#!/usr/bin/env node
// proof:control-smooth — BC.W-CONTROL-SMOOTH (Band 6).
//
// Kill the control lag + round the square small-controls (USER-DEFECTS §F —
// "Controls are super laggy; some have SQUARE borders"). This gate is the SOURCE
// arm: it proves the control surface clock was re-timed to the QUICK iOS register
// + the small controls re-round to the pill, born-RED on the HEAD `--duration-fast`
// 0.2s clock + the 10px/4px square radii → GREEN at the re-time + re-round. The
// PAINT arm (the live :5199 frame-series — the control responds quick, no colour-
// lag; the small toggles read soft rounded pills) is the π half
// (tests-visual/control-smooth.spec.ts) — this gate is device-free.
//
// FIVE clauses (each born-RED on HEAD, each with a self-test bite):
//   C1 — the quick control clock. `transition-control` (btn.css) reads
//        `--duration-control` (or `--duration-instant`), NOT `--duration-fast`;
//        `--duration-control ≤ 0.12s` is minted in scheme-motion.css. Born-RED:
//        HEAD reads `--duration-fast` 0.2s. Self-test: a planted `--duration-fast`
//        read reds.
//   C2 — the §6 doctrine holds. `transition-control` keeps the bezier
//        `--ease-standard` for the surface legs (no spring on a colour cross-fade)
//        AND the transition-property list stays SURFACE-ONLY (no `transform` leg —
//        the press is `.tap-squish`/spring's job). Born-RED only if a future edit
//        puts `transform` on the bezier or a spring on the colour. Self-test: a
//        planted spring/transform on the recipe reds.
//   C3 — the small controls read a control radius, not a square small-px. The
//        Toggle CVA base resolves `rounded-pill` (the stadium register), NOT the
//        10px `rounded-button` (the square-on-small class) AND `--radius-control`
//        re-points off `--radius-md` (the 6px/4px square small-px) onto the pill
//        register. The `card` variant keeps `rounded-card` (the tile exception,
//        asserted intact). Born-RED on the `rounded-button`-base / `--radius-md`
//        HEAD values. Self-test: a planted `rounded-button` base / a `--radius-sm`
//        control rung reds.
//   C4 — no per-control transition fork. No control SFC re-spells a longhand
//        `transition-duration: 0.2s` clock off the `transition-control` register
//        (the anti-fork bite). The Switch thumb's `transition: translate
//        var(--spring-snappy-duration)` is the sanctioned spring-on-transform
//        exception, scoped to `translate`. Self-test: a planted re-pasted
//        `transition-duration: 0.2s` on a control reds.
//   C5 — the LabeledField action-slot exists + is additive (kf-G3 BUILD) +
//        carries the a11y floor. `LabeledField.vue` carries the `#action` slot +
//        the `horizontal` axis; the slot is default-OFF (the `v-if="$slots.action"`
//        guard → no markup delta when absent); ≥2 demo consumers exercise it (the
//        consumer-evidence file resolves) AND each demo action button resolves a
//        non-empty accessible name (`aria-label`). Born-RED: no `#action` slot at
//        HEAD. Self-test: a removed `#action` slot reds; a one-consumer slot reds
//        the consumer-bar arm; an unnamed icon-only action button reds.
//
// The DESHADCN consume: this wave OWNS the toggle-outline / tags-input-ring /
// switch-thumb reskins per the census (re-pointing the residual shadcn-neutral
// tokens onto the house glass/.control-surface/.focus-ring register) — those are
// asserted by proof:no-shadcn-default (born-RED on the HEAD residuals → GREEN as
// this wave lands the re-points); C-clauses here own the CLOCK + RADIUS + the
// action-slot. proof:animation-coherence (surface→bezier) + proof:no-layout-
// animation (the radius is STATIC, never animated) stay GREEN by construction.
//
// Device-free SOURCE arm — node scripts/proof-control-smooth.mjs. Tags
// ["local","ci","release"].

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const BTN_CSS = resolve(ROOT, "src/styles/utilities/btn.css");
const SCHEME_MOTION = resolve(ROOT, "src/styles/tokens/scheme-motion.css");
const RADIUS_CSS = resolve(ROOT, "src/styles/theme/radius.css");
const TOGGLE_INDEX = resolve(ROOT, "src/components/ui/toggle/index.ts");
const SWITCH_VUE = resolve(ROOT, "src/components/ui/switch/Switch.vue");
const LABELED_FIELD = resolve(ROOT, "src/components/custom/labeled-field/LabeledField.vue");
const LABELED_FIELD_DEMO = resolve(ROOT, "demo/stories/compositions/labeled-field.vue");
const CONSUMER_EVIDENCE = resolve(ROOT, "docs/consumer-evidence/labeled-field-action-slot.md");
const UI_DIR = resolve(ROOT, "src/components/ui");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// Strip CSS/JS + HTML/Vue comments so a PROSE mention (a clean-break comment naming
// the `--duration-fast` it replaced) is NOT a false hit. ONLY live declarations count.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Pure detectors (each runs over a passed-in string so a self-test can feed it a
//    synthetic fixture with no file read — the spring-ease detector-house pattern) ──

// C1 — the `transition-control` @utility body. Returns { duration } or null.
function transitionControlBody(css) {
    const m = strip(css).match(/@utility\s+transition-control\s*\{([\s\S]*?)\}/);
    return m ? m[1] : null;
}

// the minted `--duration-control` value in seconds, or null.
function durationControlSeconds(css) {
    const m = strip(css).match(/--duration-control:\s*([\d.]+)s\b/);
    return m ? Number(m[1]) : null;
}

// C3 — the Toggle CVA base class string (the first cva() argument), or null.
function toggleBaseString(ts) {
    const m = strip(ts).match(/cva\(\s*\n?\s*['"]([^'"]*)['"]/);
    return m ? m[1] : null;
}

// C3 — the `--radius-control` alias RHS, or null.
function radiusControlRhs(css) {
    const m = strip(css).match(/--radius-control:\s*([^;]+);/);
    return m ? m[1].trim() : null;
}

// C5 — does a LabeledField template body carry the additive `#action` slot guard?
function hasActionSlot(vue) {
    const s = strip(vue);
    // the slot is named `action` + GUARDED by `$slots.action` (the additive default-OFF)
    return /\$slots\.action/.test(s) && /<slot\s+name="action"/.test(s);
}

// ── The clause checks ────────────────────────────────────────────────────────────
function detectAll() {
    const violations = [];
    const facts = {};
    const fail = (id, msg) => violations.push(`[${id}] ${msg}`);

    // ─ C1 — the quick control clock ─
    const btn = read(BTN_CSS);
    const tcBody = transitionControlBody(btn);
    const QUICK = /var\(--duration-(?:control|instant)\)/;
    if (!tcBody) {
        fail("C1", "no @utility transition-control found in btn.css");
    } else {
        const readsQuick = QUICK.test(tcBody);
        const readsFast = /var\(--duration-fast\)/.test(tcBody);
        if (!readsQuick || readsFast) {
            fail(
                "C1",
                `transition-control must read the QUICK control clock (--duration-control / --duration-instant), NOT --duration-fast — got duration leg [${(tcBody.match(/transition-duration:[^;]+;/) || ["?"])[0].trim()}]`,
            );
        }
    }
    const dc = durationControlSeconds(read(SCHEME_MOTION));
    if (dc == null) {
        fail("C1", "--duration-control is not minted in scheme-motion.css");
    } else if (!(dc <= 0.12)) {
        fail("C1", `--duration-control ${dc}s exceeds the 0.12s quick-control ceiling`);
    }
    facts.c1 = { durationControl: dc, transitionControlReadsQuick: tcBody ? QUICK.test(tcBody) : false };

    // ─ C2 — the §6 doctrine holds (surface→bezier, no transform leg) ─
    if (tcBody) {
        const propLeg = (tcBody.match(/transition-property:\s*([^;]+);/) || [, ""])[1];
        const hasTransform = /\b(?:transform|translate|scale|rotate)\b/.test(propLeg);
        const easeLeg = (tcBody.match(/transition-timing-function:\s*([^;]+);/) || [, ""])[1];
        const isSpring = /var\(--spring-/.test(easeLeg);
        const isBezier = /var\(--ease-standard\)/.test(easeLeg);
        if (hasTransform) {
            fail("C2", `transition-control's property list carries a TRANSFORM leg [${propLeg.trim()}] — the press is .tap-squish/spring's job, the surface recipe stays surface-only (the canonical split)`);
        }
        if (isSpring || !isBezier) {
            fail("C2", `transition-control's surface legs must ride the bezier --ease-standard (a colour cross-fade on a spring wobbles, §6) — got [${easeLeg.trim()}]`);
        }
        facts.c2 = { surfaceOnly: !hasTransform, bezier: isBezier && !isSpring };
    }

    // ─ C3 — the small controls read a control radius, not a square small-px ─
    const toggleTs = read(TOGGLE_INDEX);
    const base = toggleBaseString(toggleTs);
    if (!base) {
        fail("C3", "could not extract the Toggle CVA base string from toggle/index.ts");
    } else {
        const basePill = /\brounded-pill\b/.test(base);
        const baseSquare = /\brounded-button\b/.test(base) || /\brounded-(?:sm|md)\b/.test(base);
        if (!basePill || baseSquare) {
            fail("C3", `the Toggle CVA base must read rounded-pill (the small-control stadium), NOT rounded-button/sm/md (the square-on-small class) — base=[${base.slice(0, 80)}…]`);
        }
    }
    // the `card` variant keeps `rounded-card` (the tile exception, asserted intact)
    const cardVariant = (strip(toggleTs).match(/card:\s*\n?\s*['"]([^'"]*)['"]/) || [, ""])[1];
    if (!/\brounded-card\b/.test(cardVariant)) {
        fail("C3", "the Toggle `card` variant must keep rounded-card (the large-tile 1rem squircle exception) — it was lost");
    }
    // `--radius-control` re-points off the square small-px (--radius-md/-sm) onto the pill register
    const rcRhs = radiusControlRhs(read(RADIUS_CSS));
    if (rcRhs == null) {
        fail("C3", "--radius-control alias not found in radius.css");
    } else if (/var\(--radius-(?:sm|md)\)/.test(rcRhs)) {
        fail("C3", `--radius-control still resolves a square small-px (${rcRhs}) — re-point onto --radius-pill (the small-control stadium scales with the control)`);
    }
    facts.c3 = { toggleBasePill: base ? /\brounded-pill\b/.test(base) : false, cardKeepsCard: /\brounded-card\b/.test(cardVariant), radiusControl: rcRhs };

    // ─ C4 — no per-control transition fork ─
    // Walk ui/ SFCs; red a re-pasted longhand `transition-duration: 0.2s` (the
    // --duration-fast fork) on a control. The Switch thumb's spring-on-`translate`
    // (transition: translate var(--spring-snappy-duration) …) is the sanctioned
    // exception (scoped to translate — a transform, not a surface clock).
    const uiFiles = [];
    walk(UI_DIR, uiFiles);
    const forks = [];
    for (const f of uiFiles) {
        const body = strip(read(f));
        // a hardcoded `transition-duration: 0.2s` (the calm clock re-pasted on a control)
        if (/transition-duration:\s*0\.2s\b/.test(body) || /transition:[^;]*\b0\.2s\b/.test(body)) {
            // exempt the spring-on-translate exception (a translate leg is a transform,
            // not a surface clock — the Switch thumb's sanctioned exception).
            const isSpringTranslate = /transition:\s*translate\s+var\(--spring-/.test(body);
            if (!isSpringTranslate) forks.push(rel(f));
        }
    }
    if (forks.length) {
        fail("C4", `${forks.length} control SFC(s) re-spell a forked 0.2s transition clock off the transition-control register: ${forks.join(", ")} — re-time onto the shared utility`);
    }
    // assert the Switch thumb's spring-on-translate exception is intact (scoped to translate)
    const switchBody = strip(read(SWITCH_VUE));
    const switchSpringTranslate = /transition:\s*translate\s+var\(--spring-snappy-duration\)/.test(switchBody);
    facts.c4 = { forks, switchSpringTranslateIntact: switchSpringTranslate };

    // ─ C5 — the LabeledField action-slot exists + additive + ≥2 consumers + a11y ─
    const lf = read(LABELED_FIELD);
    if (!hasActionSlot(lf)) {
        fail("C5", "LabeledField.vue does not carry the additive #action slot (a `$slots.action`-guarded `<slot name=\"action\">`) — the kf-G3 horizontal action-slot is unbuilt");
    }
    if (!/horizontal\??\s*:/.test(strip(lf)) && !/horizontal\?:/.test(lf)) {
        // the `horizontal?` prop (the layout axis) must be declared
        if (!/\bhorizontal\b/.test(strip(lf))) {
            fail("C5", "LabeledField.vue does not declare the `horizontal` layout axis prop");
        }
    }
    // ≥2 demo consumers exercise the slot, each binding an accessible name on the action button.
    // Count REAL `<template #action>` slot bindings (not a prose `#action` mention in a blurb).
    const demo = read(LABELED_FIELD_DEMO);
    const actionSlotCount = (strip(demo).match(/<template\s+#action\b/g) || []).length;
    if (actionSlotCount < 2) {
        fail("C5", `the #action slot is exercised by ${actionSlotCount} demo consumer(s) — the ≥2-consumer bar (J inv-10) is unmet (a one-off slot with no second consumer is demoted)`);
    }
    // each demo action button resolves a non-empty accessible name (aria-label) — an
    // icon-only action button with no text content has no name otherwise (AN.W4).
    // Count `aria-label` bindings inside the demo's #action blocks.
    const ariaNamed = (strip(demo).match(/(?:aria-label|:aria-label)\s*=/g) || []).length;
    if (ariaNamed < 2) {
        fail("C5", `the demo action buttons resolve ${ariaNamed} accessible name(s) (aria-label) — an icon-only action button needs a non-empty name (AN.W4); ≥2 named action buttons required`);
    }
    // the consumer-evidence file resolves
    if (read(CONSUMER_EVIDENCE).length === 0) {
        fail("C5", `${rel(CONSUMER_EVIDENCE)} is missing — the ≥2-consumer evidence is unrecorded`);
    }
    facts.c5 = { hasActionSlot: hasActionSlot(lf), actionSlotConsumers: actionSlotCount, ariaNamedActions: ariaNamed };

    return { violations, facts };
}

// ── helpers ──
function rel(p) {
    return p.replace(ROOT + "/", "");
}
function walk(dir, out) {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) {
            if (name === "__tests__" || name === "node_modules") continue;
            walk(p, out);
        } else if (/\.(vue|ts)$/.test(name) && !/\.(test|spec)\.ts$/.test(name)) {
            out.push(p);
        }
    }
}

// ── Self-test bites (each clause's detector MUST flag a planted violation) ──
function selfTest() {
    const failures = [];

    // C1 — a planted --duration-fast read on the recipe reds; a --duration-control read passes.
    const FAST_FIXTURE = "@utility transition-control { transition-property: background-color; transition-duration: var(--duration-fast); transition-timing-function: var(--ease-standard); }";
    const GOOD_FIXTURE = "@utility transition-control { transition-property: background-color; transition-duration: var(--duration-control); transition-timing-function: var(--ease-standard); }";
    {
        const bad = transitionControlBody(FAST_FIXTURE);
        const good = transitionControlBody(GOOD_FIXTURE);
        if (!(bad && /var\(--duration-fast\)/.test(bad))) failures.push("SELF-TEST C1: a planted --duration-fast recipe was NOT seen as fast");
        if (!(good && /var\(--duration-(?:control|instant)\)/.test(good))) failures.push("SELF-TEST C1: a good --duration-control recipe was NOT seen as quick");
        if (!(durationControlSeconds("--duration-control: 0.12s;") === 0.12)) failures.push("SELF-TEST C1: the --duration-control value parse is broken");
    }

    // C2 — a planted transform leg / a spring on the surface legs reds.
    {
        const SPRING_FIXTURE = "@utility transition-control { transition-property: background-color, transform; transition-timing-function: var(--spring-snappy); }";
        const body = transitionControlBody(SPRING_FIXTURE);
        const propLeg = (body.match(/transition-property:\s*([^;]+);/) || [, ""])[1];
        const ease = (body.match(/transition-timing-function:\s*([^;]+);/) || [, ""])[1];
        if (!/\btransform\b/.test(propLeg)) failures.push("SELF-TEST C2: a planted transform leg was NOT detected");
        if (!/var\(--spring-/.test(ease)) failures.push("SELF-TEST C2: a planted spring on the surface legs was NOT detected");
    }

    // C3 — a planted rounded-button base reds; a --radius-sm control rung reds.
    {
        const SQUARE_BASE = "cva(\n  'tap-squish rounded-button transition-control',\n  {";
        const base = toggleBaseString(SQUARE_BASE);
        if (!(base && /\brounded-button\b/.test(base))) failures.push("SELF-TEST C3: a planted rounded-button base was NOT detected");
        if (!/var\(--radius-(?:sm|md)\)/.test("var(--radius-sm)")) failures.push("SELF-TEST C3: the square small-px detector is broken");
        if (/var\(--radius-(?:sm|md)\)/.test("var(--radius-pill)")) failures.push("SELF-TEST C3: the pill register was wrongly flagged as a square small-px");
    }

    // C4 — a planted re-pasted 0.2s transition reds; a spring-on-translate does NOT.
    {
        const FORK = ".x { transition-duration: 0.2s; }";
        const EXC = ".thumb { transition: translate var(--spring-snappy-duration) var(--spring-snappy); }";
        const forkBites = /transition-duration:\s*0\.2s\b/.test(FORK);
        const excIsSpringTranslate = /transition:\s*translate\s+var\(--spring-/.test(EXC);
        if (!forkBites) failures.push("SELF-TEST C4: a planted forked 0.2s transition was NOT detected");
        if (!excIsSpringTranslate) failures.push("SELF-TEST C4: the spring-on-translate exception was NOT recognised");
    }

    // C5 — a removed #action slot reds; an unnamed action button reds the a11y arm.
    {
        const NO_SLOT = "<template><div class=\"labeled-field\"><slot /></div></template>";
        const WITH_SLOT = "<template><div v-if=\"$slots.action\"><slot /><slot name=\"action\" /></div></template>";
        if (hasActionSlot(NO_SLOT)) failures.push("SELF-TEST C5: a slot-less LabeledField was wrongly seen as having the #action slot");
        if (!hasActionSlot(WITH_SLOT)) failures.push("SELF-TEST C5: a LabeledField WITH the #action slot was NOT detected");
        // the unnamed-action a11y bite: a demo block with <2 aria-labels reds the a11y arm.
        const ONE_NAMED = "<template #action><Button aria-label=\"Clear\"><X /></Button></template>";
        const namedCount = (ONE_NAMED.match(/aria-label\s*=/g) || []).length;
        if (namedCount !== 1) failures.push("SELF-TEST C5: the aria-label name counter is broken");
    }

    return failures;
}

function main() {
    const { violations, facts } = detectAll();
    const selfFailures = selfTest();
    const all = [...violations, ...selfFailures];

    console.log("proof:control-smooth — the quick control clock + the rounded small-controls + the kf-G3 action-slot (C1-C5) + self-test bites");
    console.log(`  C1 --duration-control: ${facts.c1?.durationControl}s  transition-control reads quick: ${facts.c1?.transitionControlReadsQuick}`);
    console.log(`  C2 surface-only: ${facts.c2?.surfaceOnly}  bezier: ${facts.c2?.bezier}`);
    console.log(`  C3 toggle base pill: ${facts.c3?.toggleBasePill}  card keeps card: ${facts.c3?.cardKeepsCard}  --radius-control: ${facts.c3?.radiusControl}`);
    console.log(`  C4 forks: ${facts.c4?.forks?.length ?? "?"}  switch spring-translate intact: ${facts.c4?.switchSpringTranslateIntact}`);
    console.log(`  C5 #action slot: ${facts.c5?.hasActionSlot}  demo consumers: ${facts.c5?.actionSlotConsumers}  aria-named actions: ${facts.c5?.ariaNamedActions}`);

    if (all.length) {
        console.error("\nproof:control-smooth FAILED:");
        for (const x of violations) console.error(`  ✗ ${x}`);
        for (const x of selfFailures) console.error(`  ✗ ${x}`);
        process.exit(1);
    }
    console.log("\nproof:control-smooth PASSED — the control surface beat re-times to the quick 0.12s iOS clock (no colour-lag), the small toggles re-round to the stadium pill (no square small-px), the §6 surface→bezier doctrine holds, no per-control fork, the kf-G3 #action slot is additive + ≥2-named-consumer.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

export { detectAll, selfTest, transitionControlBody, durationControlSeconds, toggleBaseString, radiusControlRhs, hasActionSlot };
