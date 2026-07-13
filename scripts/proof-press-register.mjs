#!/usr/bin/env node
// BI.W-ACCORDION-PRESS — the press register is a BOUNDED-CONTROL register
// (proof:press-register).
//
// THE RULE (minted here, library-wide): the press register — the `:active`
// scale-press feedback (`tap-squish` / `scale-press` / an `active:scale-<shrink>`
// Tailwind utility) — is a BOUNDED-CONTROL register: buttons, chips, small
// toggles. It is NEVER a full-width-row / disclosure register. A scale about a
// wide center reads as a positional "indent"/jump (UF-G5: "I don't like how
// these indent on click." — /containers/accordion). The dock press bounded-
// control law (D7) is D-DOCK's surface; this gate owns the LIBRARY-WIDE rule +
// the accordion.
//
// THE DEFECT this closes (BORN-RED at HEAD): AccordionTrigger.vue composed
// `tap-squish` on a `flex flex-1 items-center justify-between … px-1 py-4`
// FULL-WIDTH disclosure row — a press scale about a ~600px header center reads
// as a horizontal jump, AND `tap-squish`'s scale-only `transition` shorthand
// clobbered the row's `transition-control` surface legs (SUFFUSION-MAP R22). The
// fix DROPS `tap-squish` (clean break, no alias — press feedback is the surface
// register already on the trigger: `transition-control` + the chevron
// `transition-disclosure`).
//
// THE DETECTION is string-level, not file-level: a full-width disclosure press
// is a SINGLE class string that binds a press token AND is itself a full-width
// flex row — `flex-1` (an exact token on the element, NOT a child utility like
// `[&>*]:flex-1`) together with `justify-between`. So a bounded reset chip that
// composes `tap-squish` on an `inline-flex h-6 w-6 rounded-pill` row in ONE
// string while a SIBLING string elsewhere in the same SFC carries `[&>*]:flex-1`
// (ConfiguratorRow) is CORRECTLY green — the tokens are not co-bound on one
// element. That string-level scope is the resolution the census depends on.
//
// CLAUSES:
//   P1 — no full-width disclosure row binds the press register. Every
//        `src/components/**/*.vue` class string that binds a press token AND is a
//        full-width flex row (`flex-1` + `justify-between` co-bound) is a
//        violation.
//   P2 — the press-consumer census is recorded as a fact: every SFC binding a
//        press token, split into BOUNDED (the pass roster) vs FULL-WIDTH
//        (violations). The named bounded roster (Button/Card/Checkbox/
//        RadioGroupItem/SelectTrigger/TabsTrigger/CollapsibleTrigger +
//        configurator/labeled-field/pager-dots atoms) is asserted present-and-
//        bounded so a future regression that turns one into a full-width row reds.
//   SELF-TEST — a synthetic full-width `tap-squish` disclosure row MUST flag; a
//        bounded `tap-squish` control (a Button-shaped row) MUST stay green (the
//        detector distinguishes bounded from full-width, not merely "has a press
//        token").

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function walk(dir, out) {
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) {
            if (name === "__tests__" || name === "node_modules") continue;
            walk(p, out);
        } else if (name.endsWith(".vue")) {
            out.push(p);
        }
    }
}

// ── The press register — the tokens that engage a `:active` scale-press.
//    `tap-squish` / `scale-press` are the named house recipes; an
//    `active:scale-<shrink>` Tailwind utility is the inline form (a press is a
//    SHRINK — `active:scale-95`/`active:scale-[0.96]`/`active:scale-[var(--scale-press…)]`).
//    A scale-UP (`active:scale-105`/`active:scale-100`) is NOT a press.
function isPressToken(tok) {
    if (tok === "tap-squish" || tok === "scale-press") return true;
    if (tok.startsWith("active:scale-")) {
        // exclude identity / scale-up (100/105/110/…): those start `active:scale-1`.
        return !tok.startsWith("active:scale-1");
    }
    return false;
}

// ── A full-width flex row: `flex-1` AND `justify-between` co-bound as EXACT
//    tokens on the element itself. `[&>*]:flex-1` (a child utility) is a
//    DIFFERENT token and is correctly excluded.
function isFullWidthRow(tokens) {
    return tokens.has("flex-1") && tokens.has("justify-between");
}

// Extract every quoted class-shaped string literal from an SFC's raw text. This
// reaches both `class="…"` static strings and `cn('…', props.class)` literals —
// the two forms a class string appears in. A string is a candidate iff it looks
// like a class list (whitespace-separated utility tokens).
function extractClassStrings(src) {
    const out = [];
    // THREE INDEPENDENT quote passes (single / double / backtick) — NOT one
    // alternation. A single alternation lets an outer double-quoted attribute
    // (`:class="cn('…')"` on one line) swallow the inner single-quoted class
    // literal, gluing `cn('tap-squish` into one token so the exact press token
    // never surfaces. Scanning each quote kind independently means the inner
    // `'…'` class literal is ALWAYS matched on its own, regardless of an
    // enclosing double-quoted attribute.
    for (const re of [/'([^'\n]*)'/g, /"([^"\n]*)"/g, /`([^`\n]*)`/g]) {
        let m;
        while ((m = re.exec(src)) !== null) {
            const s = m[1] ?? "";
            // Heuristic: a class string carries at least one utility-shaped token
            // and no markup/expression. Cheap + sufficient — the detection only
            // fires when a press token co-occurs, so non-class strings are inert.
            if (!s.includes(" ") && !isPressToken(s)) continue;
            if (s.includes("<") || s.includes("{{")) continue;
            out.push(s);
        }
    }
    return out;
}

function tokenize(s) {
    return new Set(s.split(/\s+/).filter(Boolean));
}

// The named bounded press consumers the census asserts remain bounded (a future
// regression that turns one into a full-width disclosure row reds P2).
const NAMED_BOUNDED = [
    "ui/button/Button.vue",
    "ui/card/Card.vue",
    "ui/checkbox/Checkbox.vue",
    "ui/radio-group/RadioGroupItem.vue",
    "ui/select/SelectTrigger.vue",
    // BI.W-DOCK-FOLD — ui/tabs/TabsTrigger.vue retired (the reka `ui/tabs` substrate is
    // DEFINITION-ABSENT; its sole consumer DockLayerGroup re-points onto useSelectionGroup).
    "ui/collapsible/CollapsibleTrigger.vue",
    "custom/configurator/ConfiguratorRow.vue",
    "custom/labeled-field/LabeledField.vue",
    "custom/pager-dots/PagerDots.vue",
];

// Scan one SFC's class strings; return { pressStrings, fullWidthStrings }.
function scanSfc(content) {
    const pressStrings = [];
    const fullWidthStrings = [];
    for (const s of extractClassStrings(content)) {
        const toks = tokenize(s);
        const hasPress = [...toks].some(isPressToken);
        if (!hasPress) continue;
        pressStrings.push(s);
        if (isFullWidthRow(toks)) fullWidthStrings.push(s);
    }
    return { pressStrings, fullWidthStrings };
}

// ── P1/P2 — scan the component tree.
export function detect({ filesOverride } = {}) {
    const violations = [];
    const facts = { pressConsumers: [], fullWidthPress: [], namedBoundedOk: {} };

    let files;
    if (filesOverride) {
        files = filesOverride; // [{ rel, content }]
    } else {
        const roots = [
            resolve(ROOT, "src/components/ui"),
            resolve(ROOT, "src/components/custom"),
        ];
        const abs = [];
        for (const r of roots) if (existsSync(r)) walk(r, abs);
        files = abs.map((p) => ({
            rel: relative(ROOT, p).replace(/\\/g, "/").replace(/^src\/components\//, ""),
            content: readFileSync(p, "utf8"),
        }));
    }

    const boundedFound = new Set();
    for (const { rel, content } of files) {
        const { pressStrings, fullWidthStrings } = scanSfc(content);
        if (pressStrings.length === 0) continue;
        const isFullWidth = fullWidthStrings.length > 0;
        facts.pressConsumers.push({ file: rel, fullWidth: isFullWidth });
        if (isFullWidth) {
            facts.fullWidthPress.push(rel);
            for (const s of fullWidthStrings) {
                violations.push(
                    `P1: ${rel} binds the press register on a FULL-WIDTH disclosure row (flex-1 + justify-between + a press token) — press is a bounded-control register only, never a full-width row (a scale about a wide center reads as a positional jump). Offending class: "${s.slice(0, 120)}${s.length > 120 ? "…" : ""}"`,
                );
            }
        } else {
            boundedFound.add(rel);
        }
    }

    // P2 — every named bounded consumer is present AND bounded (not full-width).
    for (const name of NAMED_BOUNDED) {
        const present = facts.pressConsumers.some((c) => c.file === name);
        const bounded = boundedFound.has(name);
        facts.namedBoundedOk[name] = present && bounded;
        if (!present) {
            violations.push(
                `P2: census roster member ${name} no longer binds the press register — the recorded bounded roster must stay stable (if the consumer legitimately dropped the press register, update the roster in this gate)`,
            );
        } else if (!bounded) {
            violations.push(
                `P2: census roster member ${name} became a FULL-WIDTH disclosure press — a bounded control regressed into a full-width row`,
            );
        }
    }

    return { facts, violations };
}

// ── SELF-TEST — the detector distinguishes bounded from full-width.
function selfTest() {
    const failures = [];

    // Bite 1 — a synthetic FULL-WIDTH tap-squish disclosure row MUST flag.
    {
        const synthetic = [
            {
                rel: "ui/_synthetic/BadDisclosure.vue",
                content: `<template><button :class="cn('tap-squish flex flex-1 items-center justify-between px-1 py-4', props.class)">x</button></template>`,
            },
        ];
        const { violations } = detect({ filesOverride: synthetic });
        if (!violations.some((v) => v.startsWith("P1:") && v.includes("BadDisclosure"))) {
            failures.push("self-test bite 1 (synthetic full-width tap-squish disclosure row) did NOT flag");
        }
    }

    // Bite 2 — a synthetic BOUNDED tap-squish control (a Button-shaped row) MUST
    //   stay green (no P1). It has a press token but is NOT a full-width flex row.
    {
        const synthetic = [
            {
                rel: "ui/_synthetic/GoodButton.vue",
                content: `<template><button :class="cn('tap-squish focus-ring inline-flex items-center justify-center rounded-control px-3 py-2', props.class)">x</button></template>`,
            },
        ];
        const { violations } = detect({ filesOverride: synthetic });
        // Only the P2 roster violations (the synthetic set lacks the named roster) —
        // there must be NO P1 full-width violation on the bounded control.
        if (violations.some((v) => v.startsWith("P1:"))) {
            failures.push("self-test bite 2 (bounded tap-squish control) FALSE-flagged a full-width press");
        }
    }

    // Bite 3 — an active:scale-<shrink> press on a full-width row MUST flag (the
    //   inline Tailwind press form, not just the named `tap-squish` recipe).
    {
        const synthetic = [
            {
                rel: "ui/_synthetic/BadInlinePress.vue",
                content: `<template><button class="flex flex-1 items-center justify-between active:scale-95">x</button></template>`,
            },
        ];
        const { violations } = detect({ filesOverride: synthetic });
        if (!violations.some((v) => v.startsWith("P1:") && v.includes("BadInlinePress"))) {
            failures.push("self-test bite 3 (active:scale-95 press on a full-width row) did NOT flag");
        }
    }

    // Bite 4 — a scale-UP on a full-width row is NOT a press (must NOT flag).
    {
        const synthetic = [
            {
                rel: "ui/_synthetic/HoverGrow.vue",
                content: `<template><div class="flex flex-1 items-center justify-between active:scale-105">x</div></template>`,
            },
        ];
        const { violations } = detect({ filesOverride: synthetic });
        if (violations.some((v) => v.startsWith("P1:"))) {
            failures.push("self-test bite 4 (active:scale-105 scale-up) FALSE-flagged as a press");
        }
    }

    return failures;
}

export function detectAll() {
    const { facts, violations } = detect();
    const selfTestFailures = selfTest();
    return {
        violations: [...violations, ...selfTestFailures.map((f) => `SELF-TEST: ${f}`)],
        facts: { ...facts, selfTestPassed: selfTestFailures.length === 0 },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_PRESS_REGISTER_ARTIFACT", "BI-press-register");
    const { violations, facts } = detectAll();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:press-register",
        facts,
        violations,
    });

    console.log("proof:press-register — press is a BOUNDED-CONTROL register, never a full-width disclosure row (BI.W-ACCORDION-PRESS)");
    console.log(`  press consumers: ${facts.pressConsumers.length}  (bounded: ${facts.pressConsumers.filter((c) => !c.fullWidth).length}, full-width: ${facts.fullWidthPress.length})`);
    console.log(`  full-width press: ${facts.fullWidthPress.length ? facts.fullWidthPress.join(", ") + " ✗" : "none ✓"}`);
    console.log(`  named bounded roster: ${Object.values(facts.namedBoundedOk).every(Boolean) ? "all present + bounded ✓" : "GAP ✗"}`);
    console.log(`  self-test: ${facts.selfTestPassed ? "all bites correct ✓" : "A BITE FAILED ✗"}`);

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
