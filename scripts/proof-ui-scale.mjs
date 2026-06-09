// proof:ui-scale — AX.W51 D18: the ONE comfortable-sizing master-scalar gate.
//
// The device-free SOURCE arm: a source-parse + token-resolution + literal-absence
// gate that asserts the `--ui-scale` master comfort scalar is minted (typed
// @property <number>, inherits:true), the `--control-h-*` / `--control-text` /
// `--ui-glyph` cohorts derive through it, the CVA bases + the control pills read
// the cohort (no buried raw `h-N`/`text-sm`/`size-4` comfort literal off the axis),
// `--dock-scale` is RECONCILED onto the master (the retro-reconcile, NOT a parallel
// 1.5×), the coarse-pointer amplification is GLOBAL, the WCAG-44px floor survives as
// a clamp, and the φ-display ladder stays UNTOUCHED (the scope-discipline guard).
//
// THE PAINTED SIZE TRUTH IS PROVEN BY THE π ARM (the live getComputedStyle readback
// the orchestrator runs — the `--ui-scale: 1.3` override grows every control in
// lockstep), NEVER this source gate alone (the cardinal AX lesson: a green CPU gate
// over a still-compact live render is not done). This arm proves the calc STRUCTURE;
// the π arm proves the RENDER grows.
//
// Born-RED at HEAD `6569b7a` on five witnesses: no --ui-scale token; the buried
// h-N/text-sm/size-4 CVA literals; the literal .btn-pill/.input-pill geometry; the
// parallel calc-free --dock-scale: 1; no global coarse :root --ui-scale block. The
// asserts below invert each.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:ui-scale";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS block + line comments so a prose mention (a comment naming a token or a
// literal) is never a false hit/miss.
const stripCss = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
// strip JS/TS comments (block + line) so a literal named in a CVA comment is not a
// false buried-literal hit.
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (_m, p) => p + " ");

const tokens = stripCss(read("src/styles/tokens.css"));
const glass = stripCss(read("src/styles/glass.css"));
const typography = stripCss(read("src/styles/typography.css"));
const dockOverflow = stripCss(read("src/styles/dock/overflow.css"));
const dockDensity = stripCss(read("src/styles/dock/density.css"));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── 1. The master scalar is minted + typed (RED 1 — the headline) ────────────────
add(
    "master-scalar-property-typed",
    /@property\s+--ui-scale\s*\{[^}]*syntax:\s*"<number>"[^}]*inherits:\s*true[^}]*initial-value:\s*1/s.test(
        tokens,
    ),
    "@property --ui-scale { syntax:<number>; inherits:true; initial-value:1 } registered (the cascading typed scalar)",
);
add(
    "master-scalar-root-default",
    /--ui-scale:\s*1\s*;/.test(tokens),
    ":root { --ui-scale: 1 } default (the desktop identity — byte-exact preservation)",
);
add(
    "coarse-default-minted",
    /--ui-coarse-scale:\s*1\.5\s*;/.test(tokens),
    "--ui-coarse-scale: 1.5 minted (the global coarse-pointer comfort default)",
);

// ── 2. The cohorts derive through the master scalar (RED 2/3/4) ──────────────────
const heightCohort = ["--control-h-xs", "--control-h-sm", "--control-h-md", "--control-h-lg"];
for (const tok of heightCohort) {
    const re = new RegExp(`${tok}:\\s*max\\(\\s*calc\\([^)]*\\*\\s*var\\(--ui-scale\\)`);
    add(
        `height-cohort-${tok}`,
        re.test(tokens),
        `${tok} derives max(calc(<base> * var(--ui-scale)), …) (the scaled control-height with the WCAG floor clamp)`,
    );
}
add(
    "control-text-derives-scale",
    /--control-text:\s*calc\(var\(--type-small\)\s*\*\s*var\(--ui-scale\)\)/.test(tokens),
    "--control-text: calc(var(--type-small) * var(--ui-scale)) (the comfort-scaled control-font register)",
);
add(
    "control-text-sm-derives-scale",
    /--control-text-sm:\s*calc\(var\(--type-caption\)\s*\*\s*var\(--ui-scale\)\)/.test(tokens),
    "--control-text-sm: calc(var(--type-caption) * var(--ui-scale)) (the quieter control-font rung)",
);
add(
    "ui-glyph-derives-scale",
    /--ui-glyph:\s*calc\([^)]*\*\s*var\(--ui-scale\)\)/.test(tokens) &&
        /--ui-glyph-sm:\s*calc\([^)]*\*\s*var\(--ui-scale\)\)/.test(tokens),
    "--ui-glyph / --ui-glyph-sm derive calc(<base> * var(--ui-scale)) (the glyph grows WITH the box)",
);
add(
    "control-floor-clamp-seam",
    /--control-floor:\s*0px\s*;/.test(tokens),
    "--control-floor: 0px default (the WCAG-44px clamp seam; lifted to --touch-target under coarse-pointer)",
);

// ── 3. No buried comfort-literal in the CVA bases (RED 2/3/4) ────────────────────
// The interactive-atom CVA bases must carry NO raw control height/font/glyph literal
// off the axis. The allow-list: the host-sized-icon escape, the φ-display literals,
// out-of-scope container literals. The deny-list is the COMFORT-bearing control
// literals on these four bases + the button/toggle size rungs.
const buttonCva = stripJs(read("src/components/ui/button/index.ts"));
const toggleCva = stripJs(read("src/components/ui/toggle/index.ts"));
const badgeCva = stripJs(read("src/components/ui/badge/index.ts"));
const alertCva = stripJs(read("src/components/ui/alert/index.ts"));

// Button: no raw control-height literal in the size rungs (h-7/h-9/h-10/h-11 as a
// standalone Tailwind class — the var-class `h-[var(--control-h-*)]` is the form).
const rawHeightRe = /(?:^|['"\s])h-(?:7|8|9|10|11)(?=['"\s])/;
add(
    "button-no-raw-height-literal",
    !rawHeightRe.test(buttonCva) && buttonCva.includes("h-[var(--control-h-md)]"),
    "button CVA size rungs read h-[var(--control-h-*)], no raw h-7/h-9/h-10/h-11 control-height literal",
);
add(
    "button-font-on-control-text",
    /text-\[length:var\(--control-text\)\]/.test(buttonCva) && !/(?:^|['"\s])text-sm(?=['"\s])/.test(buttonCva),
    "button base font reads text-[length:var(--control-text)], no raw text-sm",
);
add(
    "button-glyph-on-ui-glyph",
    /size-\[var\(--ui-glyph\)\]/.test(buttonCva) &&
        !/\[&_svg:not\(\[class\*=size-\]\)\]:size-4(?![\d\w])/.test(buttonCva),
    "button un-sized glyph reads size-[var(--ui-glyph)], no raw :size-4 default (host-sized escape intact)",
);
add(
    "toggle-no-raw-height-literal",
    !rawHeightRe.test(toggleCva) && toggleCva.includes("h-[var(--control-h-md)]"),
    "toggle CVA size rungs read h-[var(--control-h-*)], no raw h-N control-height literal",
);
add(
    "toggle-font-glyph-on-axis",
    /text-\[length:var\(--control-text\)\]/.test(toggleCva) &&
        /size-\[var\(--ui-glyph\)\]/.test(toggleCva),
    "toggle base font + glyph read --control-text / --ui-glyph",
);
add(
    "badge-font-glyph-on-axis",
    /text-\[length:var\(--control-text-sm\)\]/.test(badgeCva) &&
        /text-\[length:var\(--control-text\)\]/.test(badgeCva) &&
        /size-\[var\(--ui-glyph-sm\)\]/.test(badgeCva),
    "badge size-rung fonts read --control-text-sm/--control-text + glyph reads --ui-glyph-sm",
);
add(
    "alert-font-glyph-on-axis",
    /text-\[length:var\(--control-text\)\]/.test(alertCva) &&
        /size-\[var\(--ui-glyph\)\]/.test(alertCva),
    "alert base font reads --control-text + glyph reads --ui-glyph",
);

// ── 4. The control pills derive through the scale (RED 2/3) ──────────────────────
const btnPillBlock = glass.match(/\.btn-pill\s*\{([\s\S]*?)\}/);
const btnPill = btnPillBlock ? btnPillBlock[1] : "";
add(
    "btn-pill-padding-scaled",
    /padding:\s*calc\([^)]*\*\s*var\(--ui-scale\)\)\s+calc\([^)]*\*\s*var\(--ui-scale\)\)/.test(btnPill),
    ".btn-pill padding rides calc(<base> * var(--ui-scale)) (no raw 0.5rem 1rem off the axis)",
);
add(
    "btn-pill-font-on-control-text",
    /font-size:\s*var\(--control-text\)/.test(btnPill) && !/font-size:\s*1rem/.test(btnPill),
    ".btn-pill font-size reads var(--control-text), no raw 1rem",
);
const inputPillBlock = glass.match(/\.input-pill\s*\{([\s\S]*?)\}/);
const inputPill = inputPillBlock ? inputPillBlock[1] : "";
add(
    "input-pill-height-on-cohort",
    /height:\s*var\(--control-h-md\)/.test(inputPill) && !/height:\s*2\.5rem/.test(inputPill),
    ".input-pill height reads var(--control-h-md), no raw 2.5rem",
);
add(
    "input-pill-font-on-control-text",
    /font-size:\s*var\(--control-text\)/.test(inputPill) && !/font-size:\s*1rem/.test(inputPill),
    ".input-pill font-size reads var(--control-text), no raw 1rem",
);

// ── 5. --dock-scale is RECONCILED onto the master (RED 5 — the retro-reconcile) ──
add(
    "dock-scale-reconciled",
    /--dock-scale:\s*calc\(\s*var\(--ui-scale\)\s*\*\s*var\(--dock-local-scale,\s*1\)\)/.test(tokens),
    "--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1)) (re-homed onto the master — NOT a bare 1)",
);
// The dock geometry cascade is UNCHANGED — it reads the re-homed scalar (the reconcile
// is at the DEFINITION, not the consumers).
add(
    "dock-geometry-cascade-untouched",
    /calc\(\s*var\(--dock-density-[a-z]+-control-size[^)]*\)\s*\*\s*var\(--dock-scale\)/.test(dockDensity),
    "the dock density geometry cascade still reads var(--dock-scale) (the reconcile cascades through it for free)",
);
// The dock coarse block honors the GLOBAL axis — it sets --dock-local-scale (the
// stack-extra), NOT a parallel hardcoded --dock-scale: 1.5.
add(
    "dock-coarse-honors-global",
    /@media\s*\(pointer:\s*coarse\)\s*\{[\s\S]*?\.glass-dock\[data-density\]\s*\{[\s\S]*?--dock-local-scale:\s*var\(--dock-mobile-scale,\s*1\)/s.test(
        dockOverflow,
    ) && !/--dock-scale:\s*var\(--dock-mobile-scale/.test(dockOverflow),
    "the dock coarse block sets --dock-local-scale (the stack-extra), NOT a parallel --dock-scale: 1.5 (no double-scale)",
);

// ── 6. The coarse-pointer amplification is GLOBAL (RED 5 — ONE touch scale) ──────
add(
    "global-coarse-block",
    /@media\s*\(pointer:\s*coarse\)\s*\{[\s\S]*?:root\s*\{[\s\S]*?--ui-scale:\s*var\(--ui-coarse-scale,\s*1\.5\)/s.test(
        tokens,
    ),
    "@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5) } } (the WHOLE library grows on touch from ONE place)",
);
add(
    "global-coarse-44px-floor",
    /@media\s*\(pointer:\s*coarse\)\s*\{[\s\S]*?:root\s*\{[\s\S]*?--control-floor:\s*var\(--touch-target/s.test(
        tokens,
    ),
    "the coarse block lifts --control-floor to --touch-target (the WCAG-2.5.5 44px clamp inside the scaled control-size)",
);

// ── 7. The φ-display ladder is UNTOUCHED (the scope-discipline regression-guard) ─
// No --ui-scale factor may leak into the typographic identity (display headings do
// NOT grow on the comfort/touch axis).
const displayLadder = typography.match(
    /--type-(?:display-\d|display-mega|display-hero|display-audacious|title|heading|subheading)[^;]*;/g,
) ?? [];
const tokensDisplay = tokens.match(
    /--type-(?:display-\d|display-mega|display-hero|display-audacious|title|heading|subheading)[^;]*;/g,
) ?? [];
const displayLeak = [...displayLadder, ...tokensDisplay].some((d) => /var\(--ui-scale\)/.test(d));
add(
    "display-ladder-untouched",
    !displayLeak,
    "no --ui-scale factor leaks into the φ-display ladder (--type-display-*/title/heading/subheading stay a pure φ-scale)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:ui-scale — the ONE comfortable-sizing master-scalar gate (AX.W51 D18)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_UI_SCALE_OUT", "AX-ui-scale");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:ui-scale",
    command: COMMAND,
    note: "SOURCE arm only — the painted lockstep-growth truth is proven by the live π getComputedStyle readback (the orchestrator's --ui-scale:1.3 audit), never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:ui-scale] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:ui-scale] ONE comfort scalar locked — every control height/font/glyph derives through --ui-scale; the dock/dropdown specialize it; the φ-display ladder stays pure; the π arm proves the lockstep render.",
);
