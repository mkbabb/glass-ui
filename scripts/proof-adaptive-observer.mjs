// proof:adaptive-observer — AZ.W-ADAPTIVE-AUTO Arm 2 (G2).
//
// The SOURCE-WITNESS arm for the sampled-luminance observer (the iOS-27 dynamic
// refinement of the W55 declarative bright bucket). Asserts the
// `useGlassBackdropLuminance` composable:
//   1. exists + writes BOTH the numeric `--glass-backdrop-luma` (0..1) AND the discrete
//      `--glass-backdrop: light|dark` bucket on its target;
//   2. is rAF-THROTTLED ≤ 4 Hz (a ≥ 250 ms min interval) + IntersectionObserver-gated,
//      COMPOSING the existing substrates (it IMPORTS useRAFLoop / useIntersectionPause /
//      useResizeObserver + the resolveTokenColor leaf — NOT a hand-rolled
//      requestAnimationFrame throttle path);
//   3. collapses the live re-sample loop to a single mount sample under
//      `prefers-reduced-motion: reduce` (reads matchMedia('(prefers-reduced-motion:
//      reduce)') + gates the loop on it — the substrate-PRM-mirror);
//   4. parks on document.hidden / offscreen (via the composed substrates);
//   5. meets the NO-OVERFITTING bar by the reconciled path-A-or-path-B test — a demo
//      mount is NOT a binary consumer (the W-PRUNE2 E4-3 own-story exclusion is binding),
//      so a PUBLIC glass-barrel seat requires a 2nd BINARY consumer beyond the dock; the
//      recommended close is path B (demo-private + the use-glass-backdrop-luminance.md
//      evidence doc naming the 2nd-binary-consumer trigger). The gate REDs a public
//      barrel export whose only consumers are the dock + a demo mount, and PASSES the
//      demo-private path with the evidence doc present.
//
// The device-free SOURCE-WITNESS half carries `ci` (the gates.mjs row); its π DELTA (the
// `--glass-backdrop-luma` write moving the dock plate over a live aurora) is the
// local-only capture under the ledger.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:adaptive-observer";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const COMPOSABLE = "src/composables/glass/useGlassBackdropLuminance.ts";
// BI.W-ENCAP-REDRAIN — the stateless sampling family (the elementsFromPoint stack-walk
// + the downsampled field reader + the resolveTokenColor un-wrap) carved into a
// colocated leaf the observer COMPOSES. The "composes the resolveTokenColor leaf" fact
// FOLLOWS the carve: it now resolves in the sample leaf (observer → sample leaf →
// resolveTokenColor). The composition check reads the union (observer ∪ sample leaf).
const SAMPLE_LEAF = "src/composables/glass/backdropLuminanceSample.ts";
const BARREL = "src/composables/glass/index.ts";
const DOCK = "src/components/custom/dock/GlassDock.vue";
const EVIDENCE = "docs/consumer-evidence/use-glass-backdrop-luminance.md";
const DEMO = "demo/stories/substrates/glass-material.vue";

const src = read(COMPOSABLE);
const sampleLeaf = read(SAMPLE_LEAF);
const barrel = read(BARREL);
const dock = read(DOCK);
const evidence = read(EVIDENCE);
const demo = read(DEMO);

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── 1. The composable exists + writes BOTH tokens on the target ────────────────────
add(
    "composable-exists",
    src.length > 0 && /export function useGlassBackdropLuminance\b/.test(src),
    "useGlassBackdropLuminance composable exists + is exported from its module",
);
add(
    "writes-luma-token",
    /setProperty\(\s*["']--glass-backdrop-luma["']/.test(src),
    "writes the numeric --glass-backdrop-luma (0..1) on the target (its FIRST real consumer — the B3-1/E3G-4 delta)",
);
add(
    "writes-bucket-token",
    /setProperty\(\s*["']--glass-backdrop["']/.test(src),
    "derives + writes the discrete --glass-backdrop: light|dark bucket on the target (re-engages the W55 machinery)",
);

// ── 2. Composes the existing substrates (NO hand-rolled throttle/raf path) ─────────
add(
    "composes-raf-loop",
    /import\s*\{[^}]*\buseRAFLoop\b[^}]*\}\s*from\s*["'][^"']*useRAFLoop["']/.test(src) &&
        /\buseRAFLoop\s*\(/.test(src),
    "imports + uses useRAFLoop (the shared throttled rAF substrate — NOT a hand-rolled requestAnimationFrame)",
);
add(
    "composes-intersection-pause",
    /import\s*\{[^}]*\buseIntersectionPause\b[^}]*\}\s*from\s*["'][^"']*useIntersectionPause["']/.test(
        src,
    ) && /\buseIntersectionPause\s*\(/.test(src),
    "imports + uses useIntersectionPause (the IntersectionObserver gate — offscreen surfaces attach no sample)",
);
// The composition FOLLOWS the BI.W-ENCAP-REDRAIN carve — the resolveTokenColor un-wrap
// lives in the sample leaf the observer composes, so read the union (observer ∪ leaf).
const composesResolveTokenColor = (text) =>
    /import\s*\{[^}]*\bresolveTokenColor\b[^}]*\}\s*from\s*["'][^"']*useResolveTokenColor["']/.test(
        text,
    ) && /\bresolveTokenColor\s*\(/.test(text);
add(
    "composes-resolve-token-color",
    composesResolveTokenColor(src) || composesResolveTokenColor(sampleLeaf),
    "imports + uses the resolveTokenColor leaf (the AX.W16 single-source var(--token)→rgb un-wrap for the backdrop sample) — composed via the backdropLuminanceSample carve leaf",
);
// NO hand-rolled requestAnimationFrame — the throttle rides the composed loop.
add(
    "no-hand-rolled-raf",
    !/\brequestAnimationFrame\s*\(/.test(src),
    "no hand-rolled requestAnimationFrame — the rAF throttle is the composed useRAFLoop (no parallel loop path)",
);

// ── 3. rAF-throttled ≤ 4 Hz (a ≥ 250 ms min interval, bounded) ─────────────────────
add(
    "throttle-bounded-4hz",
    /Math\.max\(\s*250\s*,/.test(src),
    "the sample interval is bounded ≥ 250 ms (≤ 4 Hz — the C5-9 budget floor; a faster sample is the named perf risk)",
);

// ── 4. PRM mirror — the live loop collapses to a single sample under reduce ─────────
// The query string may be inlined OR held in a `const PRM_QUERY = "(...)"` then
// passed to matchMedia — accept either (the substrate uses the constant form too).
const hasPrmQueryString = /["'(]\s*prefers-reduced-motion:\s*reduce\s*[)"']/.test(src);
const hasMatchMediaCall = /\bmatchMedia\(/.test(src);
const hasChangeListener = /addEventListener\(\s*["']change["']/.test(src);
add(
    "prm-matchmedia-monitor",
    hasPrmQueryString && hasMatchMediaCall && hasChangeListener,
    "reads matchMedia('(prefers-reduced-motion: reduce)') + a live 'change' monitor (mirrors the useWebGLCanvas substrate PRM discipline)",
);
add(
    "prm-collapses-loop",
    /prefersReduced/.test(src) && /loop\.stop\(\)/.test(src),
    "under reduce the live re-sample loop COLLAPSES (loop.stop) to a single mount sample (a frozen-canvas re-sample is pure waste)",
);

// ── 5. The no-overfitting bar — path A (≥2 binary + barrel) XOR path B (demo-private) ─
const barrelExported = /useGlassBackdropLuminance/.test(barrel);
const dockWires = /useGlassBackdropLuminance/.test(dock);
const demoExercises = /useGlassBackdropLuminance/.test(demo) || /data-glass-sample/.test(demo);
const evidenceExists = evidence.length > 0;

add(
    "dock-binary-consumer",
    dockWires,
    "the dock (GlassDock.vue) wires the observer — binary consumer #1 (the library source wire-point, arm a)",
);

// Path A: barrel-exported → REQUIRES a recorded 2nd BINARY consumer (a demo mount is
// NOT binary — the W-PRUNE2 E4-3 own-story exclusion). At HEAD the 2nd binary consumer
// does not exist, so a barrel export is the substrate-without-binary-consumer trap.
// The gate has no way to detect a 2nd BINARY consumer beyond the dock at HEAD, so a
// barrel export REDs unless the evidence doc records path A with a 2nd binary cite —
// which it does not (it records path B). A barrel export therefore REDs here.
if (barrelExported) {
    const evidenceRecordsPathA =
        /path A/i.test(evidence) && /2nd[\s-]*binary/i.test(evidence) &&
        /binary consumer #2/i.test(evidence);
    add(
        "barrel-export-has-2nd-binary",
        evidenceRecordsPathA,
        "PUBLIC barrel export present — REQUIRES a recorded 2nd BINARY consumer (a demo mount is NOT binary, W-PRUNE2 E4-3); the evidence doc must record path A with binary consumer #2",
    );
} else {
    // Path B (RECOMMENDED): demo-private (off the barrel) + the dock wire + a demo
    // exerciser + the evidence doc naming the booked 2nd-binary-consumer trigger.
    add(
        "path-b-demo-private",
        !barrelExported,
        "DEMO-PRIVATE (off the glass barrel) — the recommended path B at HEAD (the dock is the only binary consumer; a public seat without a 2nd binary consumer is the L-inv-8 trap)",
    );
    add(
        "path-b-demo-exerciser",
        demoExercises,
        "a content-glass DEMO exerciser mounts the observer at data-glass-sample=live (NOT a binary consumer — it exercises the live path for verification)",
    );
    add(
        "path-b-evidence-doc",
        evidenceExists &&
            /2nd[\s-]*binary/i.test(evidence) &&
            /trigger/i.test(evidence),
        "the use-glass-backdrop-luminance.md evidence doc exists + names the booked 2nd-binary-consumer promotion trigger (the E4-3/E4-9 discipline)",
    );
}

// ── Report ─────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:adaptive-observer — the sampled-luminance observer gate (AZ Arm 2)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_ADAPTIVE_OBSERVER_OUT", "AZ-adaptive-observer");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:adaptive-observer",
    command: COMMAND,
    note: "SOURCE-WITNESS arm — the π DELTA (the --glass-backdrop-luma write moving the dock plate over a live aurora) is the local-only capture under the ledger.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:adaptive-observer] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:adaptive-observer] the sampled observer locked — writes --glass-backdrop-luma + the bucket, throttled ≤4Hz on the composed substrates, PRM-collapses the loop, demo-private (path B) with the evidence doc.",
);
