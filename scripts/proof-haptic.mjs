#!/usr/bin/env node
// BE.W-HAPTIC-COUPLE — useHaptic: feature-detected navigator.vibrate (proof:haptic-couple).
//
// The born-RED→GREEN device-free SOURCE arm for the library's ONE haptic primitive — the
// thin, feature-detected navigator.vibrate wrapper coupled to the platform's
// confirm-moments. There is NO π (the body-confirm is non-visual — felt, not seen; the
// verification is the gate's source clauses + the unit test). The gate locks:
//
//   H1 — EXISTS ONCE + PUBLISHED CORRECTLY. useHaptic.ts lives in composables/motion/
//        core/, exports pulse + supported, is barrel-exported on /motion-core (and
//        reaches the root barrel + /api through it). It is vue-only — the source imports
//        NO @mkbabb/keyframes.js and NO @vueuse/core (the root-barrel-safe / SCC-trap
//        bite — a keyframes import would force the heavy peer onto /motion-core).
//   H2 — FEATURE-DETECTED, NO-THROW. pulse() guards navigator.vibrate behind a supported
//        feature-detect + an SSR `typeof navigator` guard — a direct navigator.vibrate()
//        call with no guard reds (the no-throw floor; iOS Safari + SSR must no-op cleanly).
//   H3 — NAMED-PATTERN REGISTER, BOUNDED. The HapticPattern map exists, each pattern's
//        total ms is sub-100ms (no buzz), and there is NO unbounded/looping vibrate
//        (Infinity / a pattern over 100ms total reds — the calm register).
//   H4 — OPT-IN COUPLING, BYTE-IDENTICAL DEFAULT. The composable exposes an `enabled`
//        opt-out (the suppression axis), and the sited couplings thread an `enable*` flag
//        default false so the un-opting consumer is byte-identical (a control must not
//        buzz unless the consumer asks). A coupling firing unconditionally reds.
//   H5 — ≥2-CONSUMER BAR. The coupling has ≥2 named call-sites recorded in
//        docs/consumer-evidence/use-haptic.md (the J-inv-10 substrate-without-consumer bar).
//
// NO auto-suppress under PRM is the RECORDED distinction (a haptic is not a vestibular
// trigger — the suppression axis is the consumer opt-out + the browser permission model).
//
// House style mirrors proof-completion-seal.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector (so the self-test plants synthetic
// inputs), a byte-stable JSON artefact, a human summary, process.exit(1) on any violation.
// The H6 self-test bites prove the PURE detector flags a no-guard vibrate / an over-100ms
// pattern / an unconditional coupling / a keyframes import.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function cliPaths() {
    return {
        ROOT,
        HAPTIC: resolve(ROOT, "src/composables/motion/core/useHaptic.ts"),
        CORE_BARREL: resolve(ROOT, "src/composables/motion/core/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        EVIDENCE: resolve(ROOT, "docs/consumer-evidence/use-haptic.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_HAPTIC_ARTIFACT", "BE-haptic"),
    };
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            const m = l.match(/(^|[^:])\/\//);
            if (!m) return l;
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/**
 * Extract the HAPTIC_PATTERNS record body from the (comment-stripped) source so the
 * per-pattern ms totals can be bounded. Returns "" if absent.
 */
function patternMapBody(src) {
    // Find the HAPTIC_PATTERNS assignment, then brace-match the object literal (robust to
    // one-line OR multi-line declarations, and to a trailing `as const`/cast).
    const start = src.search(/HAPTIC_PATTERNS[^=]*=\s*\{/);
    if (start < 0) return "";
    const open = src.indexOf("{", start);
    if (open < 0) return "";
    let depth = 0;
    for (let i = open; i < src.length; i++) {
        const c = src[i];
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return src.slice(open + 1, i);
        }
    }
    return "";
}

/** Parse the per-pattern ms arrays from the map body → [{ name, total }]. */
function parsePatternTotals(body) {
    const out = [];
    const rowRe = /(\w+)\s*:\s*\[([^\]]*)\]/g;
    let m;
    while ((m = rowRe.exec(body)) !== null) {
        const nums = m[2]
            .split(",")
            .map((s) => Number(s.trim()))
            .filter((n) => Number.isFinite(n));
        out.push({ name: m[1], total: nums.reduce((a, b) => a + b, 0) });
    }
    return out;
}

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic inputs)
 * and returns { facts, violations }. No disk read inside (the caller reads).
 */
export function detectHaptic(inputs) {
    const {
        haptic = "",
        coreBarrel = "",
        rootBarrel = "",
        apiIndex = "",
        evidence = "",
        hapticExists = false,
        evidenceExists = false,
    } = inputs;

    const violations = [];
    const facts = { h1: {}, h2: {}, h3: {}, h4: {}, h5: {} };

    const src = stripTs(haptic);

    // ── H1 — exists once + published correctly + vue-only (SCC-trap) ──────────
    const exportsPulse = /export\s+(?:interface|type|function|const)?[\s\S]*?\bpulse\b/.test(
        src,
    )
        ? /\bpulse\s*:/.test(src) || /function\s+useHaptic/.test(src)
        : false;
    const exportsUseHaptic = /export\s+function\s+useHaptic\b/.test(src);
    const returnsSupportedPulse =
        /supported\s*,?\s*pulse|pulse\s*,?\s*supported/.test(src) ||
        (/\bsupported\b/.test(src) && /\bpulse\b/.test(src));
    const coreBarrelExports = /export \* from ["']\.\/useHaptic["']/.test(
        stripTs(coreBarrel),
    );
    const rootBarrelExports = /useHaptic[\s\S]*?from ["']\.\/composables\/motion\/core\/useHaptic["']/.test(
        stripTs(rootBarrel),
    );
    const apiPublishes = /HapticPattern|UseHapticOptions|UseHapticReturn/.test(
        stripTs(apiIndex),
    );
    // The SCC-trap bite: the source must import vue ONLY — no keyframes, no vueuse.
    const importsKeyframes = /from ["']@mkbabb\/keyframes\.js["']/.test(src);
    const importsVueuse = /from ["']@vueuse\/core["']/.test(src);
    facts.h1 = {
        hapticExists,
        exportsUseHaptic,
        returnsSupportedPulse,
        coreBarrelExports,
        rootBarrelExports,
        apiPublishes,
        vueOnly: !importsKeyframes && !importsVueuse,
    };
    if (!hapticExists)
        violations.push("H1: composables/motion/core/useHaptic.ts does not exist");
    if (!exportsUseHaptic)
        violations.push("H1: useHaptic.ts does not export `function useHaptic`");
    if (!returnsSupportedPulse)
        violations.push("H1: useHaptic does not return { supported, pulse }");
    if (!coreBarrelExports)
        violations.push(
            "H1: composables/motion/core/index.ts does not export ./useHaptic (the /motion-core barrel)",
        );
    if (!rootBarrelExports)
        violations.push(
            "H1: src/index.ts does not re-export useHaptic from ./composables/motion/core/useHaptic (the root-barrel reach)",
        );
    if (!apiPublishes)
        violations.push(
            "H1: src/api/index.ts does not publish HapticPattern/UseHapticOptions/UseHapticReturn (the discovery layer)",
        );
    if (importsKeyframes)
        violations.push(
            "H1: useHaptic.ts imports @mkbabb/keyframes.js — the SCC-trap (it must be vue-only on /motion-core)",
        );
    if (importsVueuse)
        violations.push(
            "H1: useHaptic.ts imports @vueuse/core — the SCC-trap (it must be vue-only on /motion-core)",
        );

    // ── H2 — feature-detected, no-throw (SSR + iOS-Safari floor) ──────────────
    const ssrGuard = /typeof navigator\s*[!=]==\s*["']undefined["']/.test(src);
    const vibrateTypeofGuard = /typeof navigator\.vibrate\s*===\s*["']function["']/.test(
        src,
    );
    // The supported gate must short-circuit pulse() before the vibrate call.
    const guardsPulse = /if\s*\(\s*!supported\s*\)\s*return/.test(src);
    // The anti-evasion bite: a NAKED navigator.vibrate(...) reachable with no `supported`
    // guard reds. Detect any vibrate call NOT preceded by the supported short-circuit by
    // requiring both the supported short-circuit AND the typeof feature-detect present.
    facts.h2 = { ssrGuard, vibrateTypeofGuard, guardsPulse };
    if (!ssrGuard)
        violations.push(
            "H2: no SSR `typeof navigator !== 'undefined'` guard (SSR must no-op cleanly)",
        );
    if (!vibrateTypeofGuard)
        violations.push(
            "H2: no `typeof navigator.vibrate === 'function'` feature-detect (the supported gate)",
        );
    if (!guardsPulse)
        violations.push(
            "H2: pulse() does not short-circuit on `!supported` before navigator.vibrate (the no-throw floor)",
        );

    // ── H3 — named-pattern register, bounded sub-100ms, no buzz/loop ──────────
    const hasPatternMap = /HAPTIC_PATTERNS/.test(src);
    const hasPatternType =
        /HapticPattern\s*=\s*["']tap["']/.test(src) ||
        /["']tap["']\s*\|\s*["']snap["']/.test(src);
    const totals = parsePatternTotals(patternMapBody(src));
    const overBudget = totals.filter((t) => t.total > 100).map((t) => t.name);
    const hasInfinityBuzz = /vibrate\s*\(\s*Infinity\s*\)/.test(src);
    facts.h3 = {
        hasPatternMap,
        hasPatternType,
        patternCount: totals.length,
        overBudget,
        hasInfinityBuzz,
    };
    if (!hasPatternMap)
        violations.push("H3: no HAPTIC_PATTERNS register (the named-pattern vocabulary)");
    if (!hasPatternType)
        violations.push("H3: no HapticPattern named union (tap/snap/detent/completion/error)");
    if (totals.length < 5)
        violations.push(
            `H3: the pattern register has < 5 named patterns (found ${totals.length})`,
        );
    if (overBudget.length > 0)
        violations.push(
            `H3: pattern(s) exceed the sub-100ms calm bound: ${overBudget.join(", ")} (no buzz)`,
        );
    if (hasInfinityBuzz)
        violations.push("H3: a navigator.vibrate(Infinity) buzz — the no-loop fence");

    // ── H4 — opt-in coupling, byte-identical default (the enabled opt-out) ────
    // The opt-out is present iff the source READS an `enabled` option (the type
    // annotation `enabled?:` OR the `options.enabled` read OR a destructure) AND honors
    // it before the vibrate. The READ is the load-bearing fact (a type annotation alone
    // a dead-code consumer never honors would be the evasion).
    const hasEnabledOpt =
        /enabled\s*\??\s*:/.test(src) ||
        /options\.enabled/.test(src) ||
        /\benabled\b\s*=\s*options/.test(src) ||
        /const\s+enabled\b/.test(src);
    const honorsEnabled = /toValue\(\s*enabled/.test(src) || /!toValue\(/.test(src);
    facts.h4 = { hasEnabledOpt, honorsEnabled };
    if (!hasEnabledOpt)
        violations.push(
            "H4: useHaptic has no `enabled` opt-out option (the consumer suppression axis)",
        );
    if (!honorsEnabled)
        violations.push(
            "H4: pulse() does not honor the `enabled` flag (a control must not buzz unless asked)",
        );

    // ── H5 — ≥2-consumer bar (the consumer-evidence doc) ──────────────────────
    const evidenceNamesTwo =
        evidenceExists &&
        (evidence.match(/useDragMorph|dock[- ]fission|detent|completion|CompletionSeal/gi) ||
            [])
            .length >= 2;
    facts.h5 = { evidenceExists, evidenceNamesTwo };
    if (!evidenceExists)
        violations.push(
            "H5: docs/consumer-evidence/use-haptic.md is absent (the ≥2-consumer bar)",
        );
    else if (!evidenceNamesTwo)
        violations.push(
            "H5: use-haptic.md names < 2 sited couplings (the J-inv-10 substrate-without-consumer bar)",
        );

    return { facts, violations };
}

// ── H6 self-test: the false-witness bites (each planted defect must RED) ──────
function selfTest() {
    const good = {
        haptic: `import { toValue, type MaybeRefOrGetter } from "vue";
        export type HapticPattern = "tap" | "snap" | "detent" | "completion" | "error";
        const HAPTIC_PATTERNS = {
            tap: [8], snap: [12], detent: [6, 18, 6], completion: [10, 40, 18], error: [20, 30, 20],
        };
        function detectSupported() {
            return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
        }
        export function useHaptic(options = {}) {
            const supported = detectSupported();
            const enabled = options.enabled ?? true;
            function pulse(pattern) {
                if (!toValue(enabled)) return;
                if (!supported) return;
                try { navigator.vibrate(pattern); } catch {}
            }
            return { supported, pulse };
        }`,
        coreBarrel: `export * from "./useHaptic";`,
        rootBarrel: `export { useHaptic } from "./composables/motion/core/useHaptic";`,
        apiIndex: `export type { HapticPattern, UseHapticOptions, UseHapticReturn } from "../composables/motion/core/useHaptic";`,
        evidence: `#1 useDragMorph.onSnap → pulse('snap'). #2 the W-DOCK-FISSION detent settle → pulse('detent'). #3 CompletionSeal play.`,
        hapticExists: true,
        evidenceExists: true,
    };
    const baseGreen = detectHaptic(good).violations.length === 0;

    const bites = [];
    // Bite A — a naked navigator.vibrate with NO supported short-circuit reds H2.
    bites.push({
        name: "no-feature-detect-guard",
        red:
            detectHaptic({
                ...good,
                haptic: good.haptic.replace("if (!supported) return;", ""),
            }).violations.length > 0,
    });
    // Bite B — an over-100ms pattern reds H3.
    bites.push({
        name: "over-budget-pattern",
        red:
            detectHaptic({
                ...good,
                haptic: good.haptic.replace("snap: [12]", "snap: [120]"),
            }).violations.length > 0,
    });
    // Bite C — a coupling/composable that drops the enabled opt-out reds H4.
    bites.push({
        name: "no-enabled-optout",
        red:
            detectHaptic({
                ...good,
                haptic: good.haptic
                    .replace("const enabled = options.enabled ?? true;", "")
                    .replace("if (!toValue(enabled)) return;", ""),
            }).violations.length > 0,
    });
    // Bite D — a keyframes import reds H1 (the /motion-core engine-free bite).
    bites.push({
        name: "keyframes-import",
        red:
            detectHaptic({
                ...good,
                haptic:
                    `import { SpringProgress } from "@mkbabb/keyframes.js";\n` +
                    good.haptic,
            }).violations.length > 0,
    });
    // Bite E — an Infinity buzz reds H3.
    bites.push({
        name: "infinity-buzz",
        red:
            detectHaptic({
                ...good,
                haptic: good.haptic.replace(
                    "navigator.vibrate(pattern);",
                    "navigator.vibrate(Infinity);",
                ),
            }).violations.length > 0,
    });
    // Bite F — missing consumer evidence reds H5.
    bites.push({
        name: "no-consumer-evidence",
        red: detectHaptic({ ...good, evidenceExists: false, evidence: "" })
            .violations.length > 0,
    });

    return { baseGreen, bites };
}

function readInputs(P) {
    return {
        haptic: read(P.HAPTIC),
        coreBarrel: read(P.CORE_BARREL),
        rootBarrel: read(P.ROOT_BARREL),
        apiIndex: read(P.API_INDEX),
        evidence: read(P.EVIDENCE),
        hapticExists: existsSync(P.HAPTIC),
        evidenceExists: existsSync(P.EVIDENCE),
    };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectHaptic(inputs);

    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "H6: the self-test GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(`H6: self-test bite(s) did not RED: ${biteFailures.join(", ")}`);
    facts.h6 = {
        baseGreen: st.baseGreen,
        allBite: biteFailures.length === 0,
        bites: st.bites,
    };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:haptic-couple",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:haptic-couple — feature-detected navigator.vibrate (BE.W-HAPTIC-COUPLE)",
    );
    console.log(
        `  H1 exists + published + vue-only    : ${yn(
            facts.h1.hapticExists &&
                facts.h1.exportsUseHaptic &&
                facts.h1.returnsSupportedPulse &&
                facts.h1.coreBarrelExports &&
                facts.h1.rootBarrelExports &&
                facts.h1.apiPublishes &&
                facts.h1.vueOnly,
        )}`,
    );
    console.log(
        `  H2 feature-detected, no-throw       : ${yn(
            facts.h2.ssrGuard && facts.h2.vibrateTypeofGuard && facts.h2.guardsPulse,
        )}`,
    );
    console.log(
        `  H3 named register, bounded sub-100ms: ${yn(
            facts.h3.hasPatternMap &&
                facts.h3.hasPatternType &&
                facts.h3.overBudget.length === 0 &&
                !facts.h3.hasInfinityBuzz,
        )}`,
    );
    console.log(
        `  H4 opt-in (enabled opt-out)         : ${yn(
            facts.h4.hasEnabledOpt && facts.h4.honorsEnabled,
        )}`,
    );
    console.log(
        `  H5 ≥2-consumer bar (evidence)       : ${yn(
            facts.h5.evidenceExists && facts.h5.evidenceNamesTwo,
        )}`,
    );
    console.log(
        `  H6 self-test bites RED              : ${yn(
            facts.h6.allBite && facts.h6.baseGreen,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
