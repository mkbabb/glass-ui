#!/usr/bin/env node
// BI.W-PAGER-A11Y — proof:pager-a11y, the pager roving-tabindex keyboard contract.
//
// D-PAGER PASS-1 §0 Defect 3: the pager was keyboard-BROKEN — PagerDots rendered plain
// `<button role="tab">` with NO roving tabindex + NO root `@keydown` (N independent tab
// stops, no Arrow/Home/End — a WAI-ARIA tabs-pattern violation). The cure is the
// SegmentedTabs roving contract mirrored onto the windowed dot rail (BB.W-DRAG-MORPH the
// model): EXACTLY ONE tab stop, a root axis-derived `@keydown`, Home/End, wrap,
// disabled-skip + the deliberate 24px hit-target exemption RECORDED (D-PAGER §4 G10).
//
// Born-RED at HEAD (pre-A11Y): the button binds no `:tabindex`, the root has no `@keydown`.
// GREEN here. Device-free SOURCE arm (W1-W4); the BINDING keyboard-drive truth is the a11y
// arm of tests-visual/pager-worm.spec.ts (Tab reaches ONE dot, Arrow moves focus + activates
// the adjacent dot, Home/End jump, wrap holds, both modes) + the roving assert.
//
// W1 — the button grid binds a ROVING tabindex (`:tabindex="rovingTabindex(i)"`), the helper
//      returns 0 for exactly the active/tabStop dot and -1 otherwise, off a SINGLE
//      `tabStopIndex` anchor; NO static `tabindex="0"` literal on the button (a per-button 0
//      = N tab stops).
// W2 — a root `@keydown="onKeydown"` covers the AXIS-DERIVED arrows (ArrowRight/Left AND
//      ArrowDown/Up, gated on the orientation) + Home + End + wrap (modulo) + preventDefault
//      + the disabled-skip loop + focus-follows-activation (focusSlide + nextTick re-focus).
// W3 — the pattern ARIA split intact (tabs → role=tab/aria-selected; group → aria-current);
//      per-dot aria-label.
// W4 — the 24px-exemption record exists on disk (WCAG 2.5.8 + the below-44px rationale); the
//      button hit-box ≥28px pulled back by a symmetric NEGATIVE margin (the pip UNMOVED — the
//      bed `.goo-dot` cell stays 24px, `--pager-dot-size` untouched at 0.8125rem).
//
// SELF-TEST (--selftest): a planted static `tabindex="0"` on the button REDs W1; a planted
// missing-arrow-handler (the ArrowDown/Up axis removed) REDs W2.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const P = {
    sfc: "src/components/custom/pager-dots/PagerDots.vue",
    doc: "docs/tranches/BI/audit/W-PAGER-A11Y-hit-target.md",
};

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

/** Strip block + line comments (the house pure-detector pattern). */
const stripComments = (s) =>
    (s ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const styleOf = (sfc) => {
    const m = (sfc ?? "").match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return m ? m[1] : "";
};
const templateOf = (sfc) => {
    const m = (sfc ?? "").match(/<template>([\s\S]*?)<\/template>/i);
    return m ? m[1] : "";
};
const scriptOf = (sfc) => {
    const m = (sfc ?? "").match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    return m ? m[1] : "";
};

// ── Clause runners (each returns a violation string[]) ─────────────────────────

function w1RovingTabindex(o = {}) {
    const viol = [];
    const sfc = o.sfc ?? read(P.sfc);
    if (!sfc) return ["W1: PagerDots.vue missing"];
    const tpl = templateOf(sfc);
    const script = stripComments(scriptOf(sfc));

    // the button binds a ROVING tabindex
    if (!/:tabindex="rovingTabindex\(/.test(tpl))
        viol.push('W1: the pager button does not bind `:tabindex="rovingTabindex(...)"` (no roving tab order)');
    // a bare static `tabindex="0"` = N tab stops (the crime — the roving binding is `:tabindex=`)
    if (/(^|[\s])tabindex="0"/.test(tpl))
        viol.push('W1: a static `tabindex="0"` on the pager button (N independent tab stops)');

    // rovingTabindex returns 0 for the tabStop, -1 otherwise (exactly one 0)
    if (!/function\s+rovingTabindex\b/.test(script))
        viol.push("W1: `rovingTabindex` helper is not defined");
    else if (!/rovingTabindex\([^)]*\)\s*:\s*number\s*\{[\s\S]*?\?\s*0\s*:\s*-1/.test(script))
        viol.push("W1: `rovingTabindex` does not return `0` for the tabStop and `-1` otherwise");
    // the tabStop is a SINGLE computed anchor (the one-tabstop invariant)
    if (!/tabStopIndex\b/.test(script))
        viol.push("W1: no single `tabStopIndex` anchor (the ONE-tabstop invariant)");
    return viol;
}

function w2Keydown(o = {}) {
    const viol = [];
    const sfc = o.sfc ?? read(P.sfc);
    if (!sfc) return ["W2: PagerDots.vue missing"];
    const tpl = templateOf(sfc);
    const script = stripComments(scriptOf(sfc));

    // the root wires the handler
    if (!/@keydown="onKeydown"/.test(tpl))
        viol.push('W2: the rail root has no `@keydown="onKeydown"` handler');
    if (!/function\s+onKeydown\b/.test(script))
        viol.push("W2: `onKeydown` handler is not defined");

    // axis-derived arrows: BOTH axes present, gated on the orientation
    for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"]) {
        if (!new RegExp(`"${key}"`).test(script))
            viol.push(`W2: onKeydown does not name ${key} (the axis-derived arrow set is incomplete)`);
    }
    if (!/vertical\.value\s*\?\s*"Arrow(Down|Up)"/.test(script))
        viol.push("W2: the arrow axis is not derived off the orientation (`vertical.value ? ...`)");

    // Home + End
    if (!/case\s+"Home"/.test(script)) viol.push("W2: onKeydown does not handle Home");
    if (!/case\s+"End"/.test(script)) viol.push("W2: onKeydown does not handle End");

    // wrap (modulo) + preventDefault + disabled-skip
    if (!/%\s*n\b/.test(script)) viol.push("W2: the step logic does not wrap (no modulo `% n`)");
    if (!/\.preventDefault\(\)/.test(script))
        viol.push("W2: onKeydown does not preventDefault the navigation keys");
    if (!/\?\.disabled\b/.test(script) && !/\.disabled\b/.test(script))
        viol.push("W2: the step logic has no disabled-skip guard");

    // focus-follows-activation: select then re-focus across a window recompute
    if (!/function\s+focusSlide\b/.test(script))
        viol.push("W2: no `focusSlide` (focus-follows-activation) helper");
    if (!/nextTick\(/.test(script))
        viol.push("W2: the keyboard step does not re-focus across a window recompute (`nextTick`)");
    return viol;
}

function w3AriaSplit(o = {}) {
    const viol = [];
    const sfc = o.sfc ?? read(P.sfc);
    if (!sfc) return ["W3: PagerDots.vue missing"];
    const sq = templateOf(sfc).replace(/\s+/g, " ");

    if (!/:role="pattern === 'group' \? undefined : 'tab'"/.test(sq))
        viol.push("W3: the tabs register `role=\"tab\"` split is not gated on `pattern`");
    if (!/:aria-selected="pattern === 'group' \? undefined : i === active"/.test(sq))
        viol.push("W3: the tabs register `aria-selected` split is not gated on `pattern`");
    if (!/:aria-current="pattern === 'group' && i === active \? 'true' : undefined"/.test(sq))
        viol.push("W3: the group register `aria-current` is not bound on the group pattern");
    if (!/:aria-label="/.test(sq) || !/Go to slide/.test(sq))
        viol.push("W3: the per-dot `aria-label` is missing");
    return viol;
}

function w4HitTargetRecord(o = {}) {
    const viol = [];
    // the exemption record on disk
    const doc = o.doc ?? read(P.doc);
    if (!doc) viol.push("W4: W-PAGER-A11Y-hit-target.md missing (the 24px exemption is not recorded)");
    else {
        if (!/2\.5\.8/.test(doc)) viol.push("W4: the record does not cite WCAG 2.5.8");
        if (!/(^|[^\d])24([^\d]|$)/.test(doc)) viol.push("W4: the record does not state the 24px target");
        if (!/(^|[^\d])44([^\d]|$)/.test(doc))
            viol.push("W4: the record does not state the below-44px exemption");
    }

    // the button hit box ≥28px + a symmetric NEGATIVE margin pull-back
    const sfc = o.sfc ?? read(P.sfc);
    const style = stripComments(styleOf(sfc));
    const tgt = style.match(/--pager-hit-target\s*:\s*(\d+)px/);
    if (!tgt) viol.push("W4: `--pager-hit-target` not declared");
    else if (parseInt(tgt[1], 10) < 28)
        viol.push(`W4: --pager-hit-target=${tgt[1]}px is below the 28px comfort floor`);
    const inset = style.match(/--pager-hit-inset\s*:\s*(-?[\d.]+)px/);
    if (!inset || parseFloat(inset[1]) >= 0)
        viol.push(
            "W4: `--pager-hit-inset` is not a NEGATIVE pull-back (the target would widen the flow cell and move the pip)",
        );

    // the .pager-dot reads the target + the negative margin
    const dotRule = style.match(/\.pager-dot\s*\{([^}]*)\}/);
    const body = dotRule ? dotRule[1] : "";
    if (!/width\s*:\s*var\(--pager-hit-target\)/.test(body))
        viol.push("W4: `.pager-dot` width does not read `--pager-hit-target`");
    if (!/margin\s*:\s*var\(--pager-hit-inset\)/.test(body))
        viol.push("W4: `.pager-dot` does not pull back with `margin: var(--pager-hit-inset)` (the pip would move)");

    // the pip is UNMOVED — the bed cell stays 24px + the pip token untouched
    if (!/\.goo-dot\s*\{[^}]*width\s*:\s*24px/.test(style))
        viol.push("W4: the bed `.goo-dot` cell is no longer 24px (the painted pip moved)");
    if (!/--pager-dot-size\s*:\s*0\.8125rem/.test(style))
        viol.push("W4: `--pager-dot-size` (the 13px pip) is not the untouched 0.8125rem");
    return viol;
}

const CLAUSES = [
    ["W1", w1RovingTabindex],
    ["W2", w2Keydown],
    ["W3", w3AriaSplit],
    ["W4", w4HitTargetRecord],
];

function runAll(overrides = {}) {
    return CLAUSES.flatMap(([, fn]) => fn(overrides));
}

// ── Self-test: each planted defect MUST red its clause ─────────────────────────

function selfTest() {
    const fails = [];
    const sfc = read(P.sfc);

    // 1. a planted static tabindex="0" on the button → W1 reds
    const dualTabstop = sfc.replace(
        /class="pager-dot focus-ring tap-squish"/,
        'tabindex="0"\n            class="pager-dot focus-ring tap-squish"',
    );
    if (w1RovingTabindex({ sfc: dualTabstop }).length === 0)
        fails.push('bite1: a planted static tabindex="0" did NOT red W1');

    // 2. the ArrowDown/Up axis removed → W2 reds
    const noArrowAxis = sfc
        .replace(/"ArrowDown"/g, '"__gone1__"')
        .replace(/"ArrowUp"/g, '"__gone2__"');
    if (w2Keydown({ sfc: noArrowAxis }).length === 0)
        fails.push("bite2: removing the ArrowDown/Up axis did NOT red W2");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:pager-a11y",
        wave: "BI.W-PAGER-A11Y",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_PAGER_A11Y_ARTIFACT", "proof-pager-a11y.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:pager-a11y — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:pager-a11y — GREEN (W1-W4)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:pager-a11y --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:pager-a11y --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
