#!/usr/bin/env node
// BI.W-PAGER-WORM — proof:pager-worm, the liquid dot-MORPH worm source gate.
//
// The pager painted an EMPTY / SMEARED pill (D-PAGER PASS-1 §0 Defect 1): the σ8
// whole-layer goo filter OVER-blurred a small 13px pip BELOW its own alpha threshold
// (0.281 < 0.389) → the connected-component readback found ZERO worm mass, engine-
// agnostic (SAF: EMPTY on both engines). The cure is the two-edge lead/trail worm on a
// THREE-LAYER split (the filter DECOUPLED from the bed) + the worm-scoped #pager-worm-goo
// (σ4, a true smooth throat > the threshold) as the ONE shipped 13px arm (ruling 13,
// judgment (b) RATIFIED) + the clip-path barbell as the @supports-not degrade FLOOR.
//
// Born-RED at HEAD: PagerDots painted EMPTY (no `.pager-bed-layer`, the whole-layer
// filter over the bed, no `#pager-worm-goo`, the useGooMorph `--goo-t` driver). GREEN
// here. Device-free SOURCE arm (W1-W6); the BINDING painted truth is the π readback
// tests-visual/pager-worm.spec.ts (the composed MOVING worm — one connected component,
// waist ≤ 0.45 — on real Chrome + Metal WebKit, both modes) + the W-PAGER-WORM-DELTA
// capture that banks the losing (clip) arm.
//
// W1 — the BED group carries NO filter (the decouple); the WORM group is aria-hidden +
//      pointer-events:none + carries the goo filter ONCE.
// W2 — useLeadTrail exists once, keyframes-FREE (no @mkbabb/keyframes on the /motion-core
//      reach), ONE rAF (a single self-rescheduling loop), exported on /motion-core + root
//      barrel, ≥2 consumers recorded (pager + eyeglass), the pager imports it, and the
//      pager path carries NO second `--goo-t` transition-restart driver.
// W3 — exactly ONE 13px paint arm ships: the #pager-worm-goo filter is the base worm paint
//      (Arm A); the #pager-neck-throat clip is reached ONLY inside `@supports not
//      (filter: url())` (Arm B degrade floor) — no clip in the base rule (no dual path at
//      13px); the losing arm is banked in the W-PAGER-WORM-DELTA.
// W4 — the useLiquidFlex squish cap `--pager-worm-max-stretch` ∈ [1.08, 1.2] (the 1.45
//      taffy value GONE); no cap literal > 1.2 in the pager worm path; the driver reads it.
// W5 — PRM: the driver SEATS under reduce (one body, zero in-between frames); the SFC PRM
//      block DROPS the filter + zeroes `--stretch`; the bed is static.
// W6 — the `@supports not (filter: url())` floor renders the un-merged clip-path barbell
//      (filter:none + the neck clip); the worm masses always render (empty-pill unreachable).
//
// SELF-TEST (--selftest): a planted whole-layer bed filter REDs W1; a planted `--goo-t`
// transition-restart second driver REDs W2; a planted taffy cap > 1.2 REDs W4; a planted
// empty-pill (the honest floor removed) REDs W3+W6.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const P = {
    sfc: "src/components/custom/pager-dots/PagerDots.vue",
    wormWiring: "src/components/custom/pager-dots/composables/usePagerWorm.ts",
    leadTrail: "src/composables/motion/useLeadTrail.ts",
    constants: "src/components/custom/pager-dots/constants.ts",
    gooFilter: "src/components/custom/goo-filter/GooFilter.vue",
    springTokens: "src/styles/tokens/scheme-spring.css",
    motionCoreBarrel: "src/composables/motion/core/index.ts",
    rootBarrel: "src/index.ts",
    evidence: "docs/consumer-evidence/use-lead-trail.md",
    delta: "docs/tranches/BI/audit/visual/W-PAGER-WORM-DELTA.md",
};

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

/** Strip /* *​/ + // comments (the house pure-detector pattern). */
const stripComments = (s) =>
    (s ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");

/** Pull the `<style …>…</style>` body out of an SFC. */
const styleOf = (sfc) => {
    const m = (sfc ?? "").match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return m ? m[1] : "";
};
/** Pull the `<template>…</template>` body out of an SFC. */
const templateOf = (sfc) => {
    const m = (sfc ?? "").match(/<template>([\s\S]*?)<\/template>/i);
    return m ? m[1] : "";
};

// ── Clause runners (each returns a violation string[]) ─────────────────────────

function w1BedDecoupled(o = {}) {
    const viol = [];
    const sfc = o.sfc ?? read(P.sfc);
    if (!sfc) return ["W1: PagerDots.vue missing"];
    const style = stripComments(styleOf(sfc));
    const tpl = templateOf(sfc);

    // the three-layer split exists in the template
    if (!/class="pager-bed-layer"/.test(tpl))
        viol.push("W1: no `.pager-bed-layer` group in the template (the bed layer)");
    if (!/class="pager-worm-layer"/.test(tpl))
        viol.push("W1: no `.pager-worm-layer` group in the template (the worm layer)");

    // the BED group carries NO live filter (the decouple) — a `filter:<non-none>` on any
    // `.pager-bed-layer`/`.goo-dot` rule is the whole-layer-filter annihilation crime.
    const bedFilter =
        /\.(pager-bed-layer|goo-dot)\b[^{}]*\{[^{}]*filter\s*:\s*(?!none\b)[^;}]+/i;
    if (bedFilter.test(style))
        viol.push(
            "W1: the BED group carries a `filter` (the σ8 whole-layer annihilation) — the bed must NEVER be filtered",
        );

    // the WORM group carries the goo filter ONCE + is aria-hidden + pointer-events:none
    if (!/\.pager-worm-layer\b[^{}]*\{[^{}]*filter\s*:\s*var\(--pager-goo-filter/i.test(style))
        viol.push("W1: `.pager-worm-layer` does not carry the goo filter (Arm A)");
    if (!/\.pager-worm-layer\b[^{}]*\{[^{}]*pointer-events\s*:\s*none/i.test(style))
        viol.push("W1: `.pager-worm-layer` is not `pointer-events: none`");
    // both presentational layers are aria-hidden (the buttons own a11y)
    const wormTag = tpl.match(/<div[^>]*class="pager-worm-layer"[^>]*>/i)?.[0] ?? "";
    const bedTag = tpl.match(/<div class="pager-bed-layer"[^>]*>/i)?.[0] ?? "";
    if (!/aria-hidden="true"/.test(wormTag))
        viol.push("W1: `.pager-worm-layer` is not aria-hidden");
    if (!/aria-hidden="true"/.test(bedTag))
        viol.push("W1: `.pager-bed-layer` is not aria-hidden");
    return viol;
}

function w2LeadTrailDriver(o = {}) {
    const viol = [];
    const lt = o.leadTrail ?? read(P.leadTrail);
    if (!lt) return ["W2: useLeadTrail.ts missing (the two-edge driver)"];
    const ltCode = stripComments(lt);

    // keyframes-FREE + vueuse-FREE (the /motion-core + root-barrel reach)
    if (/from\s+["']@mkbabb\/keyframes\.js["']/.test(ltCode))
        viol.push("W2: useLeadTrail imports @mkbabb/keyframes.js (must be keyframes-FREE)");
    if (/from\s+["']@vueuse\/core["']/.test(ltCode))
        viol.push("W2: useLeadTrail imports @vueuse/core (must be vueuse-FREE)");
    // it exports the integrator
    if (!/export\s+function\s+useLeadTrail\b/.test(ltCode))
        viol.push("W2: useLeadTrail is not exported from its leaf");

    // ONE rAF — a single self-rescheduling loop (every requestAnimationFrame(<cb>) schedules
    // the SAME `step`; no second parallel loop / setInterval / setTimeout loop).
    const rafCbs = [...ltCode.matchAll(/requestAnimationFrame\(\s*(\w+)\s*\)/g)].map((m) => m[1]);
    if (rafCbs.length === 0)
        viol.push("W2: useLeadTrail owns no rAF (it is the pager's driver — it owns ONE loop)");
    const distinctCbs = new Set(rafCbs);
    if (distinctCbs.size > 1)
        viol.push(
            `W2: useLeadTrail schedules >1 distinct rAF callback (${[...distinctCbs].join(", ")}) — ONE loop only`,
        );
    if (/setInterval\(/.test(ltCode))
        viol.push("W2: useLeadTrail owns a setInterval loop (ONE rAF loop only)");

    // exported on /motion-core + the root barrel
    const core = stripComments(o.motionCoreBarrel ?? read(P.motionCoreBarrel));
    if (!/export \* from "\.\.\/useLeadTrail"/.test(core))
        viol.push("W2: useLeadTrail not re-exported on the /motion-core barrel");
    const rb = stripComments(o.rootBarrel ?? read(P.rootBarrel));
    if (!/useLeadTrail/.test(rb))
        viol.push("W2: useLeadTrail not re-exported on the root barrel");

    // ≥2 consumers recorded (pager + eyeglass)
    const ev = o.evidence ?? read(P.evidence);
    if (!ev) viol.push("W2: docs/consumer-evidence/use-lead-trail.md missing (≥2-consumer record)");
    else {
        if (!/pager/i.test(ev)) viol.push("W2: consumer-evidence names no pager consumer");
        if (!/eyeglass/i.test(ev)) viol.push("W2: consumer-evidence names no eyeglass (B3) consumer");
    }

    // the pager consumes it AND carries NO second `--goo-t` transition-restart driver
    const wiring = stripComments(o.wormWiring ?? read(P.wormWiring));
    if (!/useLeadTrail\b/.test(wiring))
        viol.push("W2: usePagerWorm does not compose useLeadTrail (the pager is not on the ONE driver)");
    const sfcCode = stripComments(o.sfc ?? read(P.sfc));
    if (/--goo-t/.test(wiring) || /--goo-t/.test(sfcCode))
        viol.push(
            "W2: a second `--goo-t` transition-restart driver survives in the pager worm path (the CSS-transition dual-driver — the driver is useLeadTrail ONLY)",
        );
    return viol;
}

function w3OneArm(o = {}) {
    const viol = [];
    const sfc = o.sfc ?? read(P.sfc);
    if (!sfc) return ["W3: PagerDots.vue missing"];
    const style = stripComments(styleOf(sfc));

    // Arm A — the #pager-worm-goo filter is the base worm paint + the id is registered
    if (!/url\(#pager-worm-goo\)/.test(style))
        viol.push("W3: the worm layer does not paint `url(#pager-worm-goo)` (Arm A)");
    const goo = o.gooFilter ?? read(P.gooFilter);
    if (!goo || !/id:\s*"pager-worm-goo"/.test(goo))
        viol.push("W3: `#pager-worm-goo` not registered in GooFilter LIBRARY_IDS");

    // Arm B — the clip barbell is reached ONLY inside `@supports not (filter: url())`
    const supIdx = style.search(/@supports not \(filter:\s*url\(/i);
    if (supIdx < 0)
        viol.push("W3: no `@supports not (filter: url())` degrade block (the honest floor is missing)");
    else {
        const preSupports = style.slice(0, supIdx);
        const supBlock = style.slice(supIdx);
        // NO clip-path in the base (before the @supports-not block) — a base clip is the
        // dual-path-at-13px crime (the filter AND the clip both painting the primary).
        if (/clip-path/i.test(preSupports))
            viol.push(
                "W3: `clip-path` in the BASE rule — the clip barbell must be `@supports not`-scoped ONLY (no dual path at 13px)",
            );
        // the degrade block renders the un-merged barbell (filter:none + the neck clip)
        if (!/clip-path\s*:\s*url\(#pager-neck-throat\)/i.test(supBlock))
            viol.push("W3: the degrade block does not render the `#pager-neck-throat` clip barbell");
    }

    // the loser is banked in the DELTA
    const delta = o.delta ?? read(P.delta);
    if (!delta) viol.push("W3: W-PAGER-WORM-DELTA.md missing (the loser is not banked)");
    else if (!/clip/i.test(delta) || !/bank/i.test(delta))
        viol.push("W3: the DELTA does not bank the losing (clip) arm");
    return viol;
}

function w4CapInBand(o = {}) {
    const viol = [];
    const spring = stripComments(o.springTokens ?? read(P.springTokens));
    const m = spring.match(/--pager-worm-max-stretch\s*:\s*([\d.]+)/);
    if (!m) viol.push("W4: `--pager-worm-max-stretch` not declared");
    else {
        const cap = parseFloat(m[1]);
        if (!(cap >= 1.08 && cap <= 1.2))
            viol.push(
                "W4: --pager-worm-max-stretch=" +
                    cap +
                    " is outside the 1.08–1.2 band (the 1.45 taffy value must be GONE)",
            );
    }
    // the pager worm path carries no cap literal > 1.2 (the anti-taffy fence)
    const wiring = stripComments(o.wormWiring ?? read(P.wormWiring));
    const consts = stripComments(o.constants ?? read(P.constants));
    for (const [name, code] of [["usePagerWorm", wiring], ["constants", consts]]) {
        for (const lit of (code.match(/\b1\.(?:[3-9]\d?|2[1-9])\b/g) ?? [])) {
            const v = parseFloat(lit);
            if (v > 1.2) viol.push(`W4: a taffy cap literal ${lit} > 1.2 in the pager path (${name})`);
        }
    }
    // the driver READS the token (the consumer-retune seam)
    if (!/["']--pager-worm-max-stretch["']/.test(wiring))
        viol.push("W4: usePagerWorm does not read `--pager-worm-max-stretch` (the squish cap seam)");
    if (!/useLiquidFlex\b/.test(wiring))
        viol.push("W4: usePagerWorm does not compose useLiquidFlex (the ONE squish law)");
    return viol;
}

function w5Prm(o = {}) {
    const viol = [];
    const lt = stripComments(o.leadTrail ?? read(P.leadTrail));
    // the driver SEATS under reduce (zero in-between frames; no spring)
    if (!/reduced\)\s*\{\s*seat\(/.test(lt) && !/if \(respectPRM && reduced\)/.test(lt))
        viol.push("W5: useLeadTrail.drive does not seat instantly under PRM");
    if (!/prefers-reduced-motion/.test(lt))
        viol.push("W5: useLeadTrail carries no `prefers-reduced-motion` signal");

    const sfc = o.sfc ?? read(P.sfc);
    const style = stripComments(styleOf(sfc));
    const prm = style.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)$/i);
    const prmBlock = prm ? prm[1] : "";
    if (!/\.pager-worm-layer[^{}]*\{[^{}]*filter\s*:\s*none/i.test(prmBlock))
        viol.push("W5: the PRM block does not DROP the worm filter");
    if (!/scale\s*:\s*1\s+1/i.test(prmBlock))
        viol.push("W5: the PRM block does not zero `--stretch` (scale: 1 1)");
    // the bed is static under PRM — no animation/transition on the bed group in the PRM block
    if (/\.(pager-bed-layer|goo-dot)\b[^{}]*\{[^{}]*(animation|transition)\s*:/i.test(prmBlock))
        viol.push("W5: the PRM block animates the bed (the bed must be static)");
    return viol;
}

function w6HonestFloor(o = {}) {
    const viol = [];
    const sfc = o.sfc ?? read(P.sfc);
    if (!sfc) return ["W6: PagerDots.vue missing"];
    const style = stripComments(styleOf(sfc));
    const tpl = templateOf(sfc);

    const supIdx = style.search(/@supports not \(filter:\s*url\(/i);
    if (supIdx < 0) {
        viol.push("W6: no `@supports not (filter: url())` honest floor — the empty-pill state is REACHABLE");
        return viol;
    }
    const supBlock = style.slice(supIdx);
    if (!/filter\s*:\s*none/i.test(supBlock))
        viol.push("W6: the degrade floor does not DROP the filter");
    if (!/clip-path\s*:\s*url\(#pager-neck-throat\)/i.test(supBlock))
        viol.push("W6: the degrade floor does not render the un-merged clip barbell");
    // the worm masses ALWAYS render (unconditional — no v-if) so a floor never shows an empty pill
    const bodies = (tpl.match(/class="goo-body"/g) ?? []).length;
    if (bodies < 2) viol.push("W6: the two worm bodies are not unconditionally rendered (empty-pill risk)");
    if (!/class="goo-neck"/.test(tpl))
        viol.push("W6: the worm neck is not unconditionally rendered (empty-pill risk)");
    return viol;
}

const CLAUSES = [
    ["W1", w1BedDecoupled],
    ["W2", w2LeadTrailDriver],
    ["W3", w3OneArm],
    ["W4", w4CapInBand],
    ["W5", w5Prm],
    ["W6", w6HonestFloor],
];

function runAll(overrides = {}) {
    return CLAUSES.flatMap(([, fn]) => fn(overrides));
}

// ── Self-test: each planted defect MUST red its clause ─────────────────────────

function selfTest() {
    const fails = [];
    const sfc = read(P.sfc);
    const style = styleOf(sfc);

    // 1. a whole-layer bed filter → W1 reds
    const bedFiltered = sfc.replace(
        /\.pager-bed-layer\s*\{/,
        ".pager-bed-layer {\n    filter: url(#pager-worm-goo);",
    );
    if (w1BedDecoupled({ sfc: bedFiltered }).length === 0)
        fails.push("bite1: a planted whole-layer bed filter did NOT red W1");

    // 2. a `--goo-t` transition-restart second driver → W2 reds
    const wiring = read(P.wormWiring);
    const dualDriver = wiring + '\nhost.style.setProperty("--goo-t", String(idx));\n';
    if (w2LeadTrailDriver({ wormWiring: dualDriver }).length === 0)
        fails.push("bite2: a planted `--goo-t` transition-restart driver did NOT red W2");

    // 3. a taffy cap > 1.2 → W4 reds
    const spring = read(P.springTokens).replace(
        /--pager-worm-max-stretch:\s*[\d.]+/,
        "--pager-worm-max-stretch: 1.45",
    );
    if (w4CapInBand({ springTokens: spring }).length === 0)
        fails.push("bite3: a planted taffy cap 1.45 did NOT red W4");

    // 4. the honest floor removed (an empty-pill) → W3 + W6 red
    const noFloor = sfc.replace(/@supports not \(filter: url\([\s\S]*?\n\}/, "");
    if (w3OneArm({ sfc: noFloor }).length === 0)
        fails.push("bite4a: removing the @supports-not floor did NOT red W3");
    if (w6HonestFloor({ sfc: noFloor }).length === 0)
        fails.push("bite4b: removing the @supports-not floor did NOT red W6");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:pager-worm",
        wave: "BI.W-PAGER-WORM",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_PAGER_WORM_ARTIFACT", "proof-pager-worm.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:pager-worm — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:pager-worm — GREEN (W1-W6)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:pager-worm --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:pager-worm --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
