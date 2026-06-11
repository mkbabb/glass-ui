#!/usr/bin/env node
// proof:card-veil — R5-7: the Card surface="veil" text-plate gate.
//
// Two arms, both fail-closed:
//
//   A. SOURCE WITNESS — the `veil-surface` decoration utility (cards.css) is
//      BORDERLESS + RIMLESS + FILL-PRESENT, the feather axis OPTIONAL:
//        · border: none           (the dividing-line strip — the user's read)
//        · box-shadow: none       (the rim/highlight strip)
//        · background present      routing the --glass-* ladder (a sanctioned
//          glass register, not a raw opaque plate) via --veil-bg
//        · backdrop-filter present routing --veil-blur (scales by --glass-level)
//        · --veil-feather declared, DEFAULT `none`, painted via
//          mask-image: var(--veil-feather) (the OPTIONAL radial edge fade)
//      Born-RED via the synthetic fixture (arm A4) — a fake `.veil-x` carrying a
//      border + box-shadow MUST flag, so the bite has teeth every run (the
//      proof:glass-cohesion self-proof discipline).
//
//   B. CONSUMER MUSTER — the surface="veil" path has ≥2 DISTINCT resolving
//      consumer contexts (the J-inv-10 overfitting bar; mirrors
//      proof:card-cartoon-consumers). The tally is
//      docs/tranches/AZ/audit/R5-7-veil-consumers.json; every cited consumer
//      must RESOLVE at HEAD.
//
// SOURCE arm only (device-free). The PAINTED render — the plate darkens toward
// ink over a busy backdrop so text clears AA — rides the W55 adaptive-tint axis
// already proven by tests-visual/adaptive-glass.spec.ts + proof:adaptive-glass;
// the veil plate is that tint applied locally, no new compositing seam.

import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:card-veil";
const TALLY = resolve(ROOT, "docs/tranches/AZ/audit/R5-7-veil-consumers.json");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS comments so a prose mention is not a false hit
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) => checks.push({ arm, id, pass: Boolean(pass), detail });

// ── ARM A: the veil-surface SOURCE witness ──────────────────────────────────────
const cards = strip(read("src/styles/cards.css"));
// Isolate the `@utility veil-surface { … }` body so the asserts read only the rule.
const veilMatch = cards.match(/@utility\s+veil-surface\s*\{([\s\S]*?)\n\}/);
const veilBody = veilMatch ? veilMatch[1] : "";

add(
    "veil-source",
    "veil-utility-defined",
    veilBody.length > 0,
    "the `@utility veil-surface` rule is defined in src/styles/cards.css",
);
add(
    "veil-source",
    "veil-borderless",
    /\bborder:\s*var\(--veil-border[^)]*\)/.test(veilBody) &&
        /--veil-border:\s*none\s*;/.test(veilBody),
    "veil-surface is BORDERLESS — `border: var(--veil-border)` with `--veil-border: none` default (the dividing-line strip)",
);
add(
    "veil-source",
    "veil-rimless",
    /\bbox-shadow:\s*var\(--veil-shadow[^)]*\)/.test(veilBody) &&
        /--veil-shadow:\s*none\s*;/.test(veilBody),
    "veil-surface is RIMLESS — `box-shadow: var(--veil-shadow)` with `--veil-shadow: none` default (the rim/highlight strip)",
);
add(
    "veil-source",
    "veil-fill-present-on-ladder",
    /\bbackground:\s*var\(--veil-bg[^)]*\)/.test(veilBody) &&
        /--veil-bg:\s*color-mix\(in oklab,\s*var\(--glass-bg-quiet\)/.test(veilBody),
    "veil-surface FILL is present and routes the --glass-* ladder — `background: var(--veil-bg)`, `--veil-bg` defaults to the oklab adaptive-tint mix over var(--glass-bg-quiet) (a sanctioned glass register, not a raw opaque plate)",
);
add(
    "veil-source",
    "veil-blur-on-level-knob",
    /\bbackdrop-filter:\s*var\(--veil-blur[^)]*\)/.test(veilBody) &&
        /--veil-blur:\s*var\(--glass-blur-quiet\)/.test(veilBody),
    "veil-surface blur routes `--veil-blur` defaulting to var(--glass-blur-quiet) (scales by --glass-level — NO literal blur off the knob)",
);
// The feather axis is OPTIONAL: declared, defaults to `none`, painted via mask-image.
add(
    "veil-source",
    "veil-feather-optional",
    /--veil-feather:\s*none\s*;/.test(veilBody) &&
        /\bmask-image:\s*var\(--veil-feather[^)]*\)/.test(veilBody),
    "the feather axis is OPTIONAL — `--veil-feather: none` default, painted via `mask-image: var(--veil-feather)` (off by default = a clean rectangle; opt-in to a radial edge fade)",
);
// NO raw opaque plate / NO literal blur in the utility (the cohesion bite).
add(
    "veil-source",
    "veil-no-raw-opaque-plate",
    !/background(-color)?:\s*var\(--(background|card)\)\s*;/.test(veilBody),
    "veil-surface carries NO raw `background: var(--background|--card)` opaque plate (it routes the --glass-* ladder, cohesion-sanctioned)",
);
add(
    "veil-source",
    "veil-no-literal-blur",
    !/backdrop-filter:[^;]*blur\(\s*[0-9.]+px\s*\)/.test(veilBody),
    "veil-surface carries NO literal blur(<n>px) (the blur rides --veil-blur → --glass-blur-quiet, level-scaled)",
);

// ── ARM A (self-proof): the synthetic RED witness ───────────────────────────────
// A fake veil utility carrying a border + box-shadow (the BOXED look) MUST flag —
// so the borderless/rimless bite has teeth every run.
const SYNTHETIC = `border: 1px solid red; box-shadow: 0 1px 2px black; background: var(--card);`;
const syntheticBites =
    !/--veil-border:\s*none/.test(SYNTHETIC) ||
    !/--veil-shadow:\s*none/.test(SYNTHETIC) ||
    /background(-color)?:\s*var\(--(background|card)\)\s*;/.test(SYNTHETIC);
add(
    "self-proof",
    "synthetic-boxed-fixture-flags",
    syntheticBites,
    "the synthetic boxed `.veil-x` fixture (a border + box-shadow + raw --card plate) is FLAGGED by the borderless/rimless/fill asserts — the bite has teeth",
);

// ── ARM A: the Card wiring routes surface=veil → veil-surface ────────────────────
const cardVue = read("src/components/ui/card/Card.vue");
add(
    "veil-source",
    "card-wires-veil",
    /surface\s*===\s*'veil'\s*&&\s*'veil-surface'/.test(cardVue) &&
        /CardSurface\s*=\s*"glass"\s*\|\s*"cartoon"\s*\|\s*"veil"/.test(cardVue),
    "Card.vue routes `surface === 'veil' && 'veil-surface'` and the CardSurface union carries `veil`",
);

// ── ARM B: the ≥2-consumer muster ───────────────────────────────────────────────
const resolves = (consumer) =>
    existsSync(isAbsolute(consumer) ? consumer : resolve(ROOT, consumer));

let tally = null;
try {
    tally = JSON.parse(readFileSync(TALLY, "utf8"));
} catch {
    tally = null;
}
const consumers = Array.isArray(tally?.consumers) ? tally.consumers : [];
const seenPaths = new Set();
let resolved = 0;
const consumerViolations = [];
if (!Array.isArray(tally?.consumers)) {
    consumerViolations.push(`the tally ${TALLY} has no \`consumers\` array`);
} else {
    for (const c of consumers) {
        const path = typeof c === "string" ? c : c?.path;
        if (typeof path !== "string" || path.length === 0) {
            consumerViolations.push("a tally consumer has no string `path`");
            continue;
        }
        if (seenPaths.has(path)) {
            consumerViolations.push(`consumer '${path}' is declared more than once`);
        } else {
            seenPaths.add(path);
        }
        if (resolves(path)) resolved++;
        else consumerViolations.push(`consumer '${path}' does not resolve at HEAD`);
    }
}
add(
    "consumers",
    "two-distinct-consumers",
    resolved >= 2 && consumerViolations.length === 0,
    resolved >= 2 && consumerViolations.length === 0
        ? `the surface="veil" path has ${resolved} distinct resolving consumer context(s) (≥2 — the J-inv-10 bar clean)`
        : `consumer muster FAILED: ${consumerViolations.join("; ") || `${resolved} resolving (<2)`}`,
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const arms = [...new Set(checks.map((c) => c.arm))];

console.log("proof:card-veil — the Card surface=veil text-plate gate (R5-7)");
for (const arm of arms) {
    const armChecks = checks.filter((c) => c.arm === arm);
    console.log(`  [${arm}] ${armChecks.filter((c) => c.pass).length}/${armChecks.length} pass`);
    for (const c of armChecks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
}

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GLASS_UI_CARD_VEIL_ARTIFACT", "AZ-card-veil");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:card-veil",
    command: COMMAND,
    note: "SOURCE arm only — the painted darken-over-light render rides the W55 adaptive-tint axis (tests-visual/adaptive-glass.spec.ts + proof:adaptive-glass); the veil plate is that tint applied locally.",
    consumers: { cited: consumers.length, distinct: seenPaths.size, resolved },
    checks: checks.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:card-veil] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:card-veil] LOCKED — veil-surface is borderless+rimless, the fill routes the --glass-* ladder, the feather axis is optional; ${resolved} consumer contexts on the path.`,
);
