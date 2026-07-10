// proof:no-paper-field — BG.W-FIELD-AURORA (M2): the `.paper-field` CSS plane is
// RETIRED onto the ONE shell `<Aurora>` (a recessive vividness:0 painterly field),
// SURGICALLY — the grain register (`.paper-underpaint` / `.paper-grain-overlay`)
// SURVIVES. A tag-presence-only gate greens over a props delete that orphans the
// grain; a blind line-span delete reds the grain-survival arm. This gate proves
// BOTH: the recipe ABSENT (the source kind it lives in, comment-blind) AND the
// grain register PRESENT.
//
// The witnesses (each device-free, comment-blind):
//   W1 — the `.paper-field` recipe selector is ABSENT from paper.css (the recipe +
//        its `.dark` arm + the `::before` cel-drift + `@keyframes field-cel-drift`).
//   W2 — the field PROPS are ABSENT from PaperBackdrop.vue (`field?`, `fieldHue`,
//        `fieldIntensity`, `fieldStyle`) — the pure grain register.
//   W3 — the `@property --field-h-raw` / `--field-intensity` regs are ABSENT from
//        property-regs.css (dead after the props strip).
//   W4 (grain-survival) — the grain register PRESENT: `.paper-underpaint` +
//        `.paper-grain-overlay::after` rules + the prefers-reduced-transparency
//        grain opacity:0 rule + the grain tooth tokens (`--paper-grain-tooth`).
//   W5 (BG.W-PAPER-GRAIN-OPTIN — born-RED, GREENs at wave 2.5) — the grain is NOT
//        mounted universally in AppShell (no bare `<PaperBackdrop>` shell mount). The
//        FIELD-AURORA wave keeps the universal grain (W5 RED, advisory); GRAIN-OPTIN
//        demotes it to opt-in (W5 GREEN). Gated by GRAIN_OPTIN_ACTIVE below.
//
// A self-test bite (--self-test) proves each absence-detector flags a synthetic
// reintroduction.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:no-paper-field";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// CSS-aware comment strip: block comments only (CSS has no `//`, and the grain
// tooth data-URI carries `http://…` which a `//` strip would corrupt). Preserve
// newlines for line geometry.
const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

// SFC/TS strip: block + line + HTML comments.
const stripTs = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── The absence/presence detectors (pure — reusable by the self-test) ─────────

/** W1 — the `.paper-field` recipe selector is absent from paper.css source. */
function paperFieldRecipeAbsent(paperCssStripped) {
    // A selector rule or @keyframes — a `.paper-field` selector or the cel-drift
    // keyframes name in the (comment-stripped) source.
    return (
        !/\.paper-field\b/.test(paperCssStripped) &&
        !/field-cel-drift/.test(paperCssStripped)
    );
}

/** W2 — the field props are absent from PaperBackdrop.vue source. */
function fieldPropsAbsent(paperBackdropStripped) {
    return (
        !/\bfield\??\s*:/.test(paperBackdropStripped) &&
        !/\bfieldHue\b/.test(paperBackdropStripped) &&
        !/\bfieldIntensity\b/.test(paperBackdropStripped) &&
        !/\bfieldStyle\b/.test(paperBackdropStripped)
    );
}

/** W3 — the `@property --field-h-raw` / `--field-intensity` regs are absent. */
function fieldRegsAbsent(propRegsStripped) {
    return (
        !/@property\s+--field-h-raw\b/.test(propRegsStripped) &&
        !/@property\s+--field-intensity\b/.test(propRegsStripped)
    );
}

/** W4 — the grain register is present in paper.css source. */
function grainRegisterPresent(paperCssStripped) {
    const underpaint = /@utility\s+paper-underpaint\b|\.paper-underpaint\b/.test(
        paperCssStripped,
    );
    const overlay = /paper-grain-overlay\b/.test(paperCssStripped);
    const tooth = /--paper-grain-tooth\b/.test(paperCssStripped);
    // the PRT opacity:0 grain rule survives (the grain is a transmissive
    // enhancement, never a legibility dependency).
    const prtGrain =
        /prefers-reduced-transparency/.test(paperCssStripped) &&
        /\.paper-underpaint\s*,\s*\.paper-grain-overlay::after\s*\{[^}]*opacity:\s*0/.test(
            paperCssStripped,
        );
    return underpaint && overlay && tooth && prtGrain;
}

// ── Self-test: each detector must FLAG a synthetic reintroduction ─────────────
if (SELF_TEST) {
    const bites = [];
    const bite = (id, pass, detail) => bites.push({ id, pass, detail });
    bite(
        "w1-recipe-detector-has-teeth",
        !paperFieldRecipeAbsent(".paper-field { position: fixed; }"),
        "a synthetic `.paper-field` recipe rule is flagged as PRESENT (W1 would RED)",
    );
    bite(
        "w1-keyframes-detector-has-teeth",
        !paperFieldRecipeAbsent("@keyframes field-cel-drift { from { scale: 1; } }"),
        "a synthetic `field-cel-drift` keyframes is flagged (W1 would RED)",
    );
    bite(
        "w2-props-detector-has-teeth",
        !fieldPropsAbsent("    field?: boolean;\n    fieldHue?: number;"),
        "a synthetic `field?`/`fieldHue` prop is flagged (W2 would RED)",
    );
    bite(
        "w3-regs-detector-has-teeth",
        !fieldRegsAbsent("@property --field-h-raw { syntax: '<number>'; }"),
        "a synthetic `@property --field-h-raw` reg is flagged (W3 would RED)",
    );
    bite(
        "w4-grain-detector-has-teeth",
        !grainRegisterPresent("/* no grain here */"),
        "an empty source is flagged as grain-ABSENT (W4 would RED on a blind delete)",
    );
    const failed = bites.filter((b) => !b.pass);
    console.log("proof:no-paper-field --self-test");
    for (const b of bites) console.log(`  ${b.pass ? "✓" : "✗"} ${b.id} — ${b.detail}`);
    if (failed.length) {
        console.error(`\n[self-test] ${failed.length} bite(s) without teeth`);
        process.exit(1);
    }
    console.log("\n[self-test] all absence/presence detectors have teeth");
    process.exit(0);
}

// ── Run against the real tree ─────────────────────────────────────────────────
const paperCss = stripCss(read("src/styles/paper.css"));
const paperBackdrop = stripTs(read("src/components/custom/paper-backdrop/PaperBackdrop.vue"));
const propRegs = stripCss(read("src/styles/tokens/property-regs.css"));
const appShell = stripTs(read("demo/shell/AppShell.vue"));

// BG.W-PAPER-GRAIN-OPTIN (wave 2.5) flips W5 from advisory to enforced: the universal
// grain mount is RETIRED (per-surface opt-in), the grain tokens stay intact.
const GRAIN_OPTIN_ACTIVE = true;

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

add(
    "w1-paper-field-recipe-absent",
    paperFieldRecipeAbsent(paperCss),
    paperFieldRecipeAbsent(paperCss)
        ? "the `.paper-field` recipe (selector + `.dark` arm + `::before` cel-drift + `@keyframes field-cel-drift`) is ABSENT from paper.css — retired onto the shell <Aurora>"
        : "a `.paper-field` recipe/keyframes survives in paper.css source (comment-blind) — the CSS field plane was not retired",
);
add(
    "w2-field-props-absent",
    fieldPropsAbsent(paperBackdrop),
    fieldPropsAbsent(paperBackdrop)
        ? "PaperBackdrop.vue carries NO field props (`field`/`fieldHue`/`fieldIntensity`/`fieldStyle`) — the pure grain register"
        : "PaperBackdrop.vue still declares a field prop or fieldStyle — the props were not stripped",
);
add(
    "w3-field-property-regs-absent",
    fieldRegsAbsent(propRegs),
    fieldRegsAbsent(propRegs)
        ? "the `@property --field-h-raw` / `--field-intensity` regs are ABSENT from property-regs.css — dead after the props strip"
        : "a `@property --field-h-raw`/`--field-intensity` reg survives in property-regs.css",
);
add(
    "w4-grain-register-survives",
    grainRegisterPresent(paperCss),
    grainRegisterPresent(paperCss)
        ? "the grain register SURVIVES: `.paper-underpaint` + `.paper-grain-overlay::after` + the `--paper-grain-tooth` token + the prefers-reduced-transparency opacity:0 grain rule are intact"
        : "the grain register was orphaned/clobbered by the field delete (the blind-delete trap) — `.paper-underpaint`/`.paper-grain-overlay`/the PRT grain rule must survive",
);

// W5 — the universal grain mount (BG.W-PAPER-GRAIN-OPTIN demotes it). Advisory until
// wave 2.5 sets GRAIN_OPTIN_ACTIVE.
const universalGrainMount = /<PaperBackdrop\b(?![^>]*\bv-if)/.test(appShell);
const glassFx = stripCss(read("src/styles/tokens/glass-fx.css"));
// the grain TOKENS stay intact (the opt-in surfaces still get grain — the register is
// demoted, NOT deleted): the paper grain opacity token + the shared tooth source.
const grainTokensIntact =
    /--paper-grain-opacity\s*:/.test(glassFx) &&
    /--paper-grain-tooth\s*:/.test(paperCss);
if (GRAIN_OPTIN_ACTIVE) {
    add(
        "w5-no-universal-grain-mount",
        !universalGrainMount && grainTokensIntact,
        !universalGrainMount && grainTokensIntact
            ? "no universal `<PaperBackdrop>` shell mount AND the grain tokens (`--paper-grain-opacity`, `--paper-grain-tooth`) are intact — the grain is per-surface opt-in (BG.W-PAPER-GRAIN-OPTIN)"
            : `the grain demote is incomplete (no-universal-mount=${!universalGrainMount} grain-tokens-intact=${grainTokensIntact}) — either AppShell still mounts a universal grain plane or a grain token was deleted with the universal register`,
    );
} else {
    add(
        "w5-grain-optin-deferred",
        true,
        `the universal grain mount is KEPT by BG.W-FIELD-AURORA (universalGrainMount=${universalGrainMount}); BG.W-PAPER-GRAIN-OPTIN (wave 2.5) flips GRAIN_OPTIN_ACTIVE and enforces the demote`,
    );
}

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:no-paper-field — the `.paper-field` CSS plane retired onto the shell <Aurora>, the grain register SURVIVES (BG.W-FIELD-AURORA)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BG_NO_PAPER_FIELD_OUT", "BG-no-paper-field");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:no-paper-field",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the recipe-absent + grain-survives asserts; the binding paint (the recessive shell aurora reads warm, the grain still tooths) rides the BG gestalt roster.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:no-paper-field] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:no-paper-field] the `.paper-field` CSS plane is gone (recipe + props + regs), the grain register survives intact, and the warm field is the ONE recessive shell aurora.",
);
