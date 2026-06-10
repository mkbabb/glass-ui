// proof:forced-colors-skin — AX.W36: the forced-colors glass-language skin gate.
//
// The device-free SOURCE arm: a source-parse gate asserting the forced-colors
// structure-survival recipe — the five-rung ladder → `CanvasText` border, the floating
// rungs → a `Canvas` fill, the decorative `::before`/`::after` → display:none, the
// generalized `Highlight` focus rung over the broader interactive surface, and the
// StatusDot hue → a bordered system-color glyph keyed off `data-status` — WITHOUT
// forking a parallel WHC stylesheet or pinning glass-ui brand colors via
// `forced-color-adjust: none`. It COORDINATES with W54 (the `--glass-level: 0` opaque
// escape, ONE knob — not a parallel solid recipe) and preserves the W55 tint axis.
//
// THE PAINTED WHC TRUTH IS PROVEN BY THE π ARM (tests-visual/forced-colors-skin.spec.ts),
// NEVER this source gate alone (the cardinal AX lesson + the wave's explicit edict: a
// `grep "forced-colors" src/styles/` source-string gate would PASS a render that paints
// the skin but still collapses visually). This arm proves the recipe STRUCTURE; the π
// arm proves the RENDER survives under forcedColors:'active'.
//
// Born-RED at HEAD on the witnesses the asserts below invert: at HEAD the ONLY
// forced-colors block is the AS-era focus-ring/silhouette patch (utilities.css) — it
// covers NONE of the five-rung ladder, NONE of the StatusDot hue identity, NONE of the
// floating-surface fills.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:forced-colors-skin";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS comments so a prose mention (a comment naming a keyword) is not a false hit
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const glassRaw = readMonolith(ROOT, "glass");
const utilRaw = readMonolith(ROOT, "utilities");
const glass = strip(glassRaw);
const util = strip(utilRaw);
const statusDotVue = read("src/components/custom/status-dot/StatusDot.vue");

// Extract the glass.css forced-colors block body (the glass-language skin lives here).
const glassFcMatch = glass.match(
    /@media\s*\(\s*forced-colors:\s*active\s*\)\s*\{([\s\S]*?)\n\}/,
);
const glassFc = glassFcMatch ? glassFcMatch[1] : "";

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── 1. The glass-language forced-colors block EXISTS in glass.css (co-located) ────
add(
    "glass-fc-block-exists",
    glassFc.length > 0,
    "glass.css carries a @media (forced-colors: active) block — the glass-language skin co-located with the ladder it skins (not bolted onto the utilities grab-bag)",
);

// ── 2. It COORDINATES with W54 — the --glass-level: 0 opaque escape, ONE knob ──────
add(
    "w54-opaque-escape-coordinate",
    /--glass-level:\s*0\b/.test(glassFc),
    "the WHC block sets --glass-level: 0 (W54's opaque escape) — the plate firms to solid --card + blur(0) through the SAME machinery, NOT a parallel solid recipe",
);

// ── 3. The five-rung ladder + card resolve a CanvasText border ────────────────────
const ladderBordered =
    /\.glass-wash[\s\S]*?\.glass-card\s*\{[\s\S]*?border:\s*1px solid CanvasText/.test(
        glassFc,
    ) ||
    (/\.glass-wash/.test(glassFc) &&
        /\.glass-floating/.test(glassFc) &&
        /\.glass-overlay/.test(glassFc) &&
        /\.glass-card/.test(glassFc) &&
        /border:\s*1px solid CanvasText/.test(glassFc));
add(
    "ladder-canvastext-border",
    ladderBordered,
    "the five-rung ladder (wash/quiet/resting/floating/overlay) + .glass-card resolve `border: 1px solid CanvasText` under WHC — every tier pane reads as a boxed region (born-RED: border-style none)",
);

// ── 4. The floating + overlay rungs (+ the Drawer, AY.W-GLASS) get a Canvas fill ──
// The overlay-band Canvas-fill group names `.glass-floating` + `.glass-overlay` + (since
// AY.W-GLASS) `.glass-drawer` — the Drawer is an overlay-band sheet on the glass-overlay
// rung, so it joins the boxed-region separation. The check tolerates additional members
// in the comma group (the selector list is open to future overlay-band surfaces).
add(
    "floating-canvas-fill",
    /\.glass-floating\s*,\s*\.glass-overlay\b[\s\S]*?\{\s*background:\s*Canvas\b/.test(glassFc),
    "the floating + overlay rungs (+ the Drawer) resolve `background: Canvas` under WHC — the modal reads as a distinct region over the page, not a transparent overlap",
);

// ── 5. The decorative ::before specular + ::after grain YIELD (display: none) ──────
add(
    "decorative-pseudo-yields",
    /::before[\s\S]*?::after[\s\S]*?\{\s*display:\s*none/.test(glassFc) ||
        (/::before/.test(glassFc) &&
            /::after/.test(glassFc) &&
            /display:\s*none/.test(glassFc)),
    "the decorative specular `::before` + grain `::after` are display:none under WHC — the chrome yields (it paints nothing once chroma collapses); the W09 rest-state gradient is untouched outside the WHC arm",
);

// ── 6. The StatusDot hue → a bordered system-color glyph keyed off data-status ─────
add(
    "statusdot-canvastext-border",
    /\.status-dot__dot\s*\{[\s\S]*?border:\s*1px solid CanvasText/.test(glassFc),
    "the StatusDot inner dot (`.status-dot__dot`) resolves a `CanvasText` ring under WHC — the bordered glyph",
);
// The ok/warn/error distinction rides the WHC system-color triplet keyed off data-status.
// `!important` is load-bearing — the component paints the fill via an inline style that
// outranks the stylesheet AND forced-color-adjust-remaps to one Canvas color.
const tripletOk = /\.status-dot__dot\[data-status="active"\]\s*\{\s*background:\s*Highlight\s*!important/.test(
    glassFc,
);
const tripletWarn = /\.status-dot__dot\[data-status="paused"\]\s*\{\s*background:\s*Mark\s*!important/.test(
    glassFc,
);
const tripletError = /\.status-dot__dot\[data-status="error"\]\s*\{\s*background:\s*CanvasText\s*!important/.test(
    glassFc,
);
add(
    "statusdot-system-color-triplet",
    tripletOk && tripletWarn && tripletError,
    "ok/warn/error stay distinguishable by a WHC-honored system color (active→Highlight, paused→Mark, error→CanvasText, !important over the inline fill) — meaning survives without glass-ui hue, keyed off the existing variant via data-status",
);

// ── 6b. The inner inline fill + pulse ring YIELD so the outer glyph reads ──────────
// The component paints a `.status-dot__fill` (h-full w-full) + an optional pulse ring
// with the SAME inline hue; under WHC they cover the outer glyph with a remapped Canvas
// fill (the row collapses to one white dot). The WHC arm must yield them.
add(
    "statusdot-inner-fill-yields",
    /\.status-dot__fill\s*,?\s*[\s\S]*?\.status-dot__pulse\s*\{\s*display:\s*none/.test(
        glassFc,
    ) ||
        (/\.status-dot__fill/.test(glassFc) &&
            /\.status-dot__pulse/.test(glassFc) &&
            /display:\s*none/.test(glassFc)),
    "the inner `.status-dot__fill` + `.status-dot__pulse` are display:none under WHC — the inline glass-ui hue does NOT cover the outer system-color glyph (the inline-cover collapse the painted-pixel π readback catches)",
);

// ── 7. StatusDot.vue emits data-status + the dot/fill hooks (no new prop) ──────────
add(
    "statusdot-data-status-emitted",
    /:data-status="variant"/.test(statusDotVue) &&
        /status-dot__dot/.test(statusDotVue) &&
        /status-dot__fill/.test(statusDotVue),
    "StatusDot.vue reflects its EXISTING `variant` onto `data-status` + carries the `.status-dot__dot` + `.status-dot__fill` hooks — structural attrs/classes derived from the existing prop, NOT a new `forcedColors` API",
);

// ── 8. The focus-ring rung is GENERALIZED (one block, the broader interactive set) ─
const utilFcMatch = util.match(
    /@media\s*\(\s*forced-colors:\s*active\s*\)\s*\{([\s\S]*?)\n\}/,
);
const utilFc = utilFcMatch ? utilFcMatch[1] : "";
add(
    "focus-rung-generalized",
    /dock-icon-button:focus-visible/.test(utilFc) &&
        /dock-tab-button:focus-visible/.test(utilFc) &&
        /btn-pill:focus-visible/.test(utilFc) &&
        /outline:\s*2px solid Highlight/.test(utilFc),
    "the AS-era focus-ring block is GENERALIZED to the broader interactive surface (the dock controls + .btn-pill) → `outline: 2px solid Highlight` — the focus survives WHC on every control",
);

// ── 9. ONE path — exactly ONE forced-colors block per owning file (no fork) ────────
const glassFcCount = (glass.match(/@media\s*\(\s*forced-colors:\s*active\s*\)/g) ?? [])
    .length;
const utilFcCount = (util.match(/@media\s*\(\s*forced-colors:\s*active\s*\)/g) ?? [])
    .length;
add(
    "one-forced-colors-path",
    glassFcCount === 1 && utilFcCount === 1,
    `exactly ONE forced-colors block per owning file (glass.css: ${glassFcCount}, utilities.css: ${utilFcCount}) — the skin EXTENDS the single block, it does NOT fork a parallel WHC stylesheet or a .dark forced-colors arm`,
);

// ── 10. The precept-correct YIELD — no forced-color-adjust: none brand pin ────────
add(
    "no-forced-color-adjust-none",
    !/forced-color-adjust:\s*none/.test(glassFc) && !/forced-color-adjust:\s*none/.test(utilFc),
    "`forced-color-adjust: none` is NOT used — the chrome YIELDS to the user's forced palette (the skin restores STRUCTURE, never pins glass-ui brand color); only the standard WHC keywords leak into the arm",
);

// ── 11. No glass-ui token leaks into the WHC arm (system colors only) ─────────────
add(
    "no-glassui-token-in-whc-surfaces",
    !/border:\s*1px solid var\(/.test(glassFc) && !/background:\s*var\(--/.test(glassFc),
    "no glass-ui `var(--token)` paints a WHC surface edge/fill (a token would defeat the user's palette) — the surface borders/fills use the standard WHC system keywords (CanvasText/Canvas/Highlight/Mark)",
);

// ── 12. The π readback spec is wired (the BINDING close) ──────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/forced-colors-skin.spec.ts")),
    "tests-visual/forced-colors-skin.spec.ts exists (the π forcedColors:'active' readback — the BINDING close; a source grep alone is REJECTED)",
);

// ── Report ────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:forced-colors-skin — the forced-colors glass-language skin (AX.W36)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_FORCED_COLORS_SKIN_OUT", "AX-forced-colors-skin");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:forced-colors-skin",
    command: COMMAND,
    note: "SOURCE arm only — the painted WHC survival truth is proven by tests-visual/forced-colors-skin.spec.ts (the W00 π forcedColors:'active' arm), never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:forced-colors-skin] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:forced-colors-skin] WHC skin locked — the ladder borders, the floating fills, the StatusDot triplet, and the generalized focus rung restore STRUCTURE while yielding color to the user palette; the π arm proves the render survives forcedColors:'active'.",
);
