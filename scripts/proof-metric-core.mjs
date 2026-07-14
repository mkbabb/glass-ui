// AZ.W-METRIC-UNIFY — proof:metric-core, the Metric* value-display unification gate.
//
// Three primitives — MetricBadge, MetricCell, MetricRow — paint the SAME
// "value + unit + placeholder" gestalt over three distinct registers. They USED
// to share NO core: two named the primary field
// `amount` and two `value`, the `placeholder: "—"` default was redeclared per
// SFC, and the empty-check DIVERGED — the `amount` copies coalesced on
// truthiness (`amount || placeholder` + `!amount`), which renders a VALID `0` as
// the em-dash placeholder, muted, color-stripped (a silent data-falsification
// bug). This wave lands ONE shared core — `src/utils/coalesceMetric.ts` — that
// the four SFCs consume; the bug dies as a consequence.
//
// This DEVICE-FREE SOURCE gate machine-locks the structural unify:
//   (a) `coalesceMetric` is imported by all FOUR Metric* SFCs;
//   (b) no Metric* SFC redeclares the `placeholder: "—"` default locally (the
//       default lives ONCE, in the leaf);
//   (c) the primary value field is named `value` on all four (NO prop `amount`);
//   (d) MetricBadge's index.ts exports its prop type (parity with cell/stack).
//
// The runtime-behaviour bug proof is the FOCUSED unit test
// (tests/components/custom/metric-badge/zero-value.test.ts), NOT this grep — a
// 0-renders-as-empty bug needs a runtime test. This gate is the structural arm.
//
// Born-RED at the pre-wave HEAD: the four diverge, `amount` lives, the default is
// redeclared 4×, the leaf does not exist, the index does not export the type.
// Bite: re-introduce an `amount` prop → clause (c) reds; re-declare a local
// `placeholder: "—"` → clause (b) reds; drop a coalesceMetric import → (a) reds.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:metric-core";
const ARTIFACT = gateArtifactPath("METRIC_CORE_ARTIFACT", "metric-core");

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments so a prose mention of "amount" / "—" in a
// docstring is not mistaken for live code. Newlines preserved.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

const LEAF = "src/utils/coalesceMetric.ts";

// The three value-display surfaces (AnimatedDigit is a distinct animated reel —
// out of scope, recorded as a deliberate keep in its docstring; the MetricPill
// delegate was RETIRED at BI.W-S-METRIC-PILL-DELETE — the sole clean in-repo
// overfit-delete).
//
// MetricBadge / MetricCell / MetricRow each render the value DIRECTLY and so must
// import the core — no SFC re-rolls the empty-check or the "—" default.
const DIRECT_SFCS = [
    "src/components/custom/metric-badge/MetricBadge.vue",
    "src/components/custom/metric-cell/MetricCell.vue",
    "src/components/custom/metric-stack/MetricRow.vue",
];
const SFCS = [...DIRECT_SFCS];
const BADGE_INDEX = "src/components/custom/metric-badge/index.ts";

// The em-dash placeholder literal the prior 4-5 redeclarations carried. The core
// owns the default, so a `placeholder: "—"` withDefaults entry on ANY of the
// three SFCs is a re-divergence.
const PLACEHOLDER_DEFAULT = /placeholder\s*:\s*["'`]—["'`]/;

function run() {
    const violations = [];
    const facts = {};

    // ── (0) the leaf exists + carries coalesceMetric + the default ────────────
    const leafSrc = read(LEAF);
    facts.leafExists = leafSrc.length > 0;
    if (!facts.leafExists) {
        violations.push(`the shared value core ${LEAF} does not exist`);
    } else {
        const hasFn = /export\s+function\s+coalesceMetric\b/.test(leafSrc);
        const hasDefault = PLACEHOLDER_DEFAULT.test(leafSrc) || /METRIC_PLACEHOLDER\s*=\s*["'`]—["'`]/.test(leafSrc);
        facts.leafDeclaresCoalesce = hasFn;
        facts.leafOwnsPlaceholderDefault = hasDefault;
        if (!hasFn) violations.push(`${LEAF} does not export function coalesceMetric`);
        if (!hasDefault) violations.push(`${LEAF} does not own the "—" placeholder default`);
    }

    // ── (a) coalesceMetric imported by all four ───────────────────────────────
    // ── (b) no local placeholder "—" default on any SFC ───────────────────────
    // ── (c) the primary field is `value`, NOT `amount` ────────────────────────
    facts.sfcs = {};
    for (const rel of SFCS) {
        const raw = read(rel);
        const code = stripComments(raw);
        const importsCoalesce = /\bcoalesceMetric\b/.test(code);
        // Each direct SFC must import coalesceMetric itself.
        const composesBadge = /\bMetricBadge\b/.test(code);
        const consumesCore = importsCoalesce;
        const redeclaresDefault = PLACEHOLDER_DEFAULT.test(code);
        // A prop named `amount` declared on the props object (`amount:` or
        // `amount?:` at a props-type position). The CSS class `metric-badge__amount`
        // and the `pill.amount` data key are not prop declarations, and live in
        // template/comment regions stripComments + the `:` shape excludes.
        const declaresAmountProp = /\bamount\s*\??\s*:\s*(string|number|MetricValue|[A-Za-z])/i.test(
            code,
        );
        const declaresValueProp = /\bvalue\s*\??\s*:\s*(string|number|MetricValue)/i.test(code) ||
            /:value=/.test(raw) /* pill delegate */ ;
        facts.sfcs[rel] = {
            consumesCore,
            importsCoalesce,
            composesBadge,
            redeclaresDefault,
            declaresAmountProp,
            declaresValueProp,
        };
        if (!consumesCore)
            violations.push(`${rel} does not import/use coalesceMetric`);
        if (redeclaresDefault)
            violations.push(`${rel} redeclares a local placeholder: "—" default (must live only in ${LEAF})`);
        if (declaresAmountProp)
            violations.push(`${rel} still declares a prop named 'amount' (clean break to 'value' required)`);
        if (!declaresValueProp)
            violations.push(`${rel} does not declare the canonical 'value' field`);
    }

    // ── (d) MetricBadge index exports its prop type ───────────────────────────
    const badgeIndex = read(BADGE_INDEX);
    const exportsType = /export\s+type\s*\{[^}]*MetricBadgeProps/.test(badgeIndex);
    facts.badgeIndexExportsType = exportsType;
    if (!exportsType)
        violations.push(`${BADGE_INDEX} does not export the MetricBadgeProps type (parity with cell/stack)`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:metric-core",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:metric-core — the Metric* value-display unification gate (AZ.W-METRIC-UNIFY)");
    console.log(`  coalesceMetric leaf      : ${facts.leafExists}`);
    console.log(`  leaf owns "—" default    : ${facts.leafOwnsPlaceholderDefault}`);
    for (const rel of SFCS) {
        const f = facts.sfcs[rel];
        const name = rel.split("/").pop();
        console.log(
            `  ${name.padEnd(16)} : consumesCore=${f.consumesCore} noLocalDefault=${!f.redeclaresDefault} value=${f.declaresValueProp} noAmountProp=${!f.declaresAmountProp}`,
        );
    }
    console.log(`  Badge prop-type export   : ${facts.badgeIndexExportsType}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
