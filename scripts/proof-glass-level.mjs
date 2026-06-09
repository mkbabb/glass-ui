// proof:glass-level + proof:glass-one-model — AX.W54: the glass-first ROOT gate.
//
// Two arms (run both by default; `--one-model` runs the G-1 cohesion arm only):
//
// ARM 1 — the --glass-level SCALAR (the level threads both ladders at their ONE
//   sites; level=1 byte-identical by construction; the opaque escape + the a11y
//   brackets ride the ONE level path).
// ARM 2 — proof:glass-one-model (G-1 of the GOLDEN done-definition): glass
//   cohesion is MEASURED, not asserted. No ui/ chrome-or-content surface paints a
//   solid bg-{card,background,muted,secondary,primary} WITHOUT the glass tier or
//   the named .glass-opaque escape — born-RED on the four divergent recipes the
//   census named (SegmentedTabs track+indicator, ui Tabs indicator, Alert,
//   TagsInput) + the two recipe-level divergences (.input-pill blur(1px), the
//   --glass-bg-dock flat-srgb bypass). The legibility allowlist
//   (avatar/label/separator/skeleton/table/data-table/badge) is exempt.
//
// Device-free SOURCE arm (always gates). The PAINTED render — the level=1
// byte-identity + a mounted SegmentedTabs/Alert/TagsInput backdrop-filter being a
// real glass blur over its backdrop — is the W00 π live audit (the cardinal
// lesson: a source gate alone is the headless-green trap; the orchestrator drives
// the live readback + the DELTA capture).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ONE_MODEL_ONLY = process.argv.includes("--one-model");
const COMMAND = ONE_MODEL_ONLY ? "npm run proof:glass-one-model" : "npm run proof:glass-level";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS/JS + HTML/Vue comments so a prose mention (e.g. a comment naming the
// `bg-background` it replaced) is not a false hit
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const tokens = read("src/styles/tokens.css");
const tokensB = strip(tokens);
const glass = read("src/styles/glass.css");
const glassB = strip(glass);

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) => checks.push({ arm, id, pass: Boolean(pass), detail });

// ── ARM 1: the --glass-level scalar ───────────────────────────────────────────
if (!ONE_MODEL_ONLY) {
    add(
        "level",
        "property-registered",
        /@property\s+--glass-level\s*\{[^}]*syntax:\s*["']<number>["'][^}]*inherits:\s*true[^}]*initial-value:\s*1/s.test(
            tokensB,
        ),
        "@property --glass-level { syntax:<number>; inherits:true; initial-value:1 }",
    );
    // opacity seam: every --glass-bg-* rung threads the level inversion
    const bgRungs = ["wash", "quiet", "resting", "floating", "overlay", "dock", "chassis"];
    const opacityThreaded = bgRungs.every((r) => {
        const m = tokensB.match(new RegExp(`--glass-bg-${r}:[^;]*`));
        return m && /\(1 - \(1 - var\(--glass-opacity-[a-z]+\)\) \* var\(--glass-level\)\)/.test(m[0]);
    });
    add("level", "opacity-seam-threaded", opacityThreaded, "all 7 --glass-bg-* rungs invert through var(--glass-level)");
    // blur seam: every --glass-blur-* token scales its radius by the level
    const blurRungs = ["wash", "quiet", "resting", "floating", "overlay", "dock", "btn"];
    const blurThreaded = blurRungs.every((r) => {
        const m = tokensB.match(new RegExp(`--glass-blur-${r}:[^;]*`));
        return m && /blur\(calc\(var\(--glass-blur-[a-z]+-radius\) \* var\(--glass-level\)\)\)/.test(m[0]);
    });
    add("level", "blur-seam-threaded", blurThreaded, "all 6 --glass-blur-* + --glass-blur-btn scale the radius by var(--glass-level)");
    add(
        "level",
        "opaque-escape",
        /\.glass-opaque\s*\{[^}]*--glass-level:\s*0/s.test(glassB),
        ".glass-opaque { --glass-level: 0 }",
    );
    add(
        "level",
        "a11y-reduce-rides-level",
        /prefers-reduced-transparency:\s*reduce\)\s*\{[^}]*--glass-level:\s*0/s.test(glassB),
        "prefers-reduced-transparency: reduce → :root{ --glass-level: 0 }",
    );
    add(
        "level",
        "a11y-contrast-rides-level",
        /prefers-contrast:\s*more\)\s*\{[^}]*--glass-level:\s*0?\.\d/s.test(glassB),
        "prefers-contrast: more → :root{ --glass-level: <bounded> }",
    );
}

// ── ARM 2: proof:glass-one-model (G-1 cohesion) ───────────────────────────────
// A glass marker = any sign the surface routes through the one glass model.
const GLASS_MARKER =
    /--glass-bg-|--glass-blur-|glass-wash|glass-quiet|glass-resting|glass-floating|glass-overlay|glass-opaque|input-pill|\.glass-|backdrop-filter/;

function surfaceFixed(file, forbiddenRe, label) {
    const src = read(file);
    if (!src) {
        add("one-model", label, false, `${file} not found`);
        return;
    }
    const body = strip(src);
    const stillSolid = forbiddenRe.test(body);
    const hasGlass = GLASS_MARKER.test(body);
    add(
        "one-model",
        label,
        !stillSolid && hasGlass,
        stillSolid
            ? `${file} still carries the forbidden solid surface (${forbiddenRe})`
            : hasGlass
              ? `${file} routes through the glass model`
              : `${file} dropped the solid bg but shows no glass marker`,
    );
}

// The four named divergent recipes (born-RED at the CSS-core commit; GREEN once flipped).
surfaceFixed(
    "src/components/custom/tabs/SegmentedTabs.vue",
    /background:\s*var\(--muted-medium\)|background:\s*var\(--background\)\b/,
    "segmented-tabs-glass",
);
surfaceFixed("src/components/ui/tabs/TabsIndicator.vue", /\bbg-secondary\/80\b|\bbg-secondary\b/, "ui-tabs-indicator-glass");
surfaceFixed("src/components/ui/alert/index.ts", /\bbg-card\b/, "alert-glass");
surfaceFixed("src/components/ui/tags-input/TagsInput.vue", /\bbg-background\b/, "tags-input-glass");

// The two recipe-level divergences (fixed in the W54 core).
add(
    "one-model",
    "input-pill-real-glass",
    /\.input-pill\s*\{[^}]*backdrop-filter:\s*var\(--glass-blur-quiet\)/s.test(glassB) ||
        /\.input-pill\s*\{[\s\S]*?backdrop-filter:\s*var\(--glass-blur-quiet\)/.test(glassB),
    ".input-pill reads --glass-blur-quiet (real glass), not the blur(1px) wash",
);
add(
    "one-model",
    "dock-bg-oklab-tint",
    /--glass-bg-dock:[^;]*color-mix\(in oklab[^;]*--glass-tint-source/.test(tokensB),
    "--glass-bg-dock rides the oklab tint seam (W55-reachable)",
);

// The default-register flips.
const button = strip(read("src/components/ui/button/index.ts"));
add(
    "one-model",
    "button-default-glass",
    GLASS_MARKER.test(button) && /default:/.test(button),
    "Button default variant routes through the glass model",
);
const card = strip(read("src/components/ui/card/Card.vue"));
add(
    "one-model",
    "card-opaque-tier",
    /["']opaque["']/.test(card),
    "Card CardTier union includes the opaque (level-0) rung",
);

// ── Report ────────────────────────────────────────────────────────────────────
const arms = ONE_MODEL_ONLY ? ["one-model"] : ["level", "one-model"];
const active = checks.filter((c) => arms.includes(c.arm));
const failed = active.filter((c) => !c.pass);

console.log(`${COMMAND.replace("npm run ", "")} — the glass-first ROOT gate (AX.W54)`);
for (const arm of arms) {
    const armChecks = active.filter((c) => c.arm === arm);
    console.log(`  [${arm}] ${armChecks.filter((c) => c.pass).length}/${armChecks.length} pass`);
    for (const c of armChecks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
}

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_GLASS_LEVEL_OUT", ONE_MODEL_ONLY ? "AX-glass-one-model" : "AX-glass-level");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: COMMAND.replace("npm run ", ""),
    command: COMMAND,
    checks: active.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[${COMMAND.replace("npm run ", "")}] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(`\n[${COMMAND.replace("npm run ", "")}] glass-first cohesion locked — one model, one knob.`);
