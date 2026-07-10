// proof:register-ios — AZ.W-REGISTER-IOS: the de-red'd iOS-glassy interactive
// register gate (born-RED, source arm a–e).
//
// R3-6: "I don't like the red. Tune this to be more iOS inspired and glassy — at
// the root, within our icons and buttons." The warm-red SELECTED register (the
// `--viz-fourier` NCSU/Fourier identity) retires from EVERY interactive state
// (hover/active/selected/pressed) and becomes the iOS-26/27 luminance-lift glass
// register AT THE LIBRARY ROOT. Red survives ONLY as static brand INK — the ℱ
// wordmark, the data-viz strokes (`--viz-fourier`/`--chart-download`), and the
// gold/red CTA family — never on an interactive register (H1 arm-a).
//
// THE DEVICE-FREE SOURCE ARM proves the RECIPE STRUCTURE; the π arm
// (tests-visual/register-ios.spec.ts) proves the RENDER reads no brand-red on a
// selected dock control in light+dark (the cardinal AX lesson — a green CPU gate
// over a still-red live render is the gap). This arm asserts:
//   (a) the rail active ::before BAR reads `--dock-selected-accent`, not a
//       `--primary`/brand solid; the active-GLYPH `color` resolves to
//       `--foreground`/warm-ink (NOT a saturated brand hue).
//   (b) `--dock-selected-accent` + `--dock-control-press-bg` are minted; the BAR
//       consumes `--dock-selected-accent`. (Per arm-a the glyph is NOT required to
//       consume the accent token — it stays `--foreground`.)
//   (c) the dock control `:active` reads the press-darken token (`--dock-control-press-bg`).
//   (d) the demo `dock-nav.css` carries NO `--demo-nav-accent: var(--viz-fourier)`
//       mint and NO red glyph/accent re-point on an interactive register (the retire).
//   (e) the surviving-red allowlist holds as a MACHINE-CHECKABLE NEGATIVE PREDICATE:
//       across src/styles/** + demo/**, NO rule whose SELECTOR carries an interactive
//       state token declares a color/background/fill/--*-accent reading var(--viz-fourier)
//       (or a --demo-nav-accent that resolves to it). The named static wordmark/viz/CTA
//       surfaces survive precisely by sitting OUTSIDE that predicate — no positive census.
//
// Born-RED at the pre-edit tree on clauses (a)+(d)+(e): the rail bar/glyph fell back
// to `var(--dock-rail-active-accent, var(--primary))` and the demo wired
// `--demo-nav-accent: var(--viz-fourier)` on `.is-active`/`[aria-current]`
// (dock-nav.css:58,103-104). The asserts below invert each.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:register-ios";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip CSS comments so a prose mention (a comment naming a token) is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines so line geometry holds.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// The carved tokens monolith carries offsets-sizing.css (the dock token home).
const tokens = strip(readMonolith(ROOT, "tokens"));
// AZ.W-CARVE — dock-controls.css drained into dock-controls/*.css partials;
// readMonolith concatenates root + the five family partials so the iOS
// press-darken witnesses (`--dock-control-press-bg` on the icon/tab/picker
// :active rules) resolve against the carved content.
const dockControls = strip(readMonolith(ROOT, "dock-controls"));
const dockNav = strip(read("demo/shell/dock-nav.css"));

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── (b) — the two new tokens are minted ─────────────────────────────────────────
add(
    "selected-accent-token-minted",
    /--dock-selected-accent:\s*color-mix\(\s*in oklab,\s*var\(--foreground\)/.test(
        tokens,
    ),
    "--dock-selected-accent minted as a translucent foreground luminance-lift (color-mix in oklab over --foreground)",
);
add(
    "press-bg-token-minted",
    /--dock-control-press-bg:\s*color-mix\(\s*in oklab,\s*var\(--glass-bg-resting\)/.test(
        tokens,
    ),
    "--dock-control-press-bg minted as a darken-toward-foreground mix off --glass-bg-resting (the iOS press-darken)",
);

// ── (a) — the rail ::before BAR reads --dock-selected-accent, not a brand solid ──
// The active ::before bar block: scoped to .glass-dock.vertical …::before, background reads
// the luminance-lift token.
const railBeforeBlock = dockControls.match(
    /\.glass-dock\.vertical[\s\S]*?:is\([^)]*\)::before\s*\{([\s\S]*?)\}/,
);
const railBeforeBody = railBeforeBlock ? railBeforeBlock[1] : "";
add(
    "rail-bar-reads-selected-accent",
    /background:\s*var\(--dock-selected-accent\)/.test(railBeforeBody),
    "the .glass-dock.vertical active ::before bar background reads var(--dock-selected-accent) (the luminance-lift)",
);
add(
    "rail-bar-not-brand-solid",
    railBeforeBody.length > 0 &&
        !/background:[^;]*var\(--dock-rail-active-accent\s*,\s*var\(--primary\)\)/.test(
            railBeforeBody,
        ) &&
        !/background:[^;]*var\(--primary\)/.test(railBeforeBody),
    "the .glass-dock.vertical active ::before bar no longer falls back to a --primary/brand solid stripe",
);

// ── (a) — the active GLYPH color resolves to --foreground/warm-ink ──────────────
// The active rule (NOT the ::before) re-points the glyph color. Match the
// .glass-dock.vertical …:is(.is-active, …) { … } block that is NOT the ::before.
const railGlyphBlock = dockControls.match(
    /\.glass-dock\.vertical\s*\.dock-icon-button:is\([^)]*\)\s*\{([\s\S]*?)\}/,
);
const railGlyphBody = railGlyphBlock ? railGlyphBlock[1] : "";
add(
    "rail-glyph-warm-ink",
    /color:\s*var\(--foreground\)/.test(railGlyphBody) &&
        /--dock-active-color:\s*var\(--foreground\)/.test(railGlyphBody),
    "the .glass-dock.vertical active glyph color + --dock-active-color resolve to var(--foreground) warm-ink (NOT a brand hue)",
);
add(
    "rail-glyph-not-brand",
    railGlyphBody.length > 0 &&
        !/color:[^;]*var\(--dock-rail-active-accent\s*,\s*var\(--primary\)\)/.test(
            railGlyphBody,
        ) &&
        !/color:[^;]*var\(--primary\)/.test(railGlyphBody),
    "the .glass-dock.vertical active glyph color no longer falls back to a --primary/brand hue",
);

// ── (c) — the dock control :active reads the press-darken token ─────────────────
// Every dock-control :active rule (icon/tab/select/dropdown) reads
// --dock-control-press-bg. Count the :active blocks that carry the background; the
// icon-button + tab-button + select/dropdown ≥ 3 distinct press surfaces.
const activeBlocks = (
    dockControls.match(/:active:not\(:disabled\)[^{]*\{[^}]*\}/g) ?? []
).filter((b) => /background:\s*var\(--dock-control-press-bg\)/.test(b));
add(
    "active-reads-press-darken",
    activeBlocks.length >= 3,
    `${activeBlocks.length} dock-control :active rule(s) read background: var(--dock-control-press-bg) (need ≥3 — icon/tab/select+dropdown)`,
);

// ── (d) — the demo dock-nav.css red overrides are retired ───────────────────────
add(
    "demo-no-viz-fourier-mint",
    !/--demo-nav-accent:\s*var\(--viz-fourier\)/.test(dockNav),
    "demo dock-nav.css carries NO --demo-nav-accent: var(--viz-fourier) mint (the retire)",
);
add(
    "demo-no-red-rail-repoint",
    !/--dock-rail-active-accent:\s*var\(--demo-nav-accent\)/.test(dockNav),
    "demo dock-nav.css carries NO --dock-rail-active-accent: var(--demo-nav-accent) re-point on .is-active",
);
add(
    "demo-no-red-bottom-repoint",
    !/--dock-active-color:\s*var\(--demo-nav-accent\)/.test(dockNav) &&
        !/(?<!-)color:\s*var\(--demo-nav-accent\)/.test(dockNav),
    "demo dock-nav.css carries NO bottom-dock --dock-active-color/color: var(--demo-nav-accent) red glyph re-point",
);

// ── (e) — the surviving-red allowlist as a MACHINE-CHECKABLE NEGATIVE PREDICATE ──
// Sweep every .css under src/styles/** + demo/**; for each RULE whose SELECTOR
// carries an interactive state token, assert its declaration body declares NO
// color/background/fill/--*-accent reading var(--viz-fourier) (or a --demo-nav-accent
// that resolves to it). The named static wordmark/viz/CTA surfaces survive by sitting
// OUTSIDE the interactive predicate — no positive census (63 --viz-fourier consumers
// at HEAD make a positive list brittle; this is the single negative + a re-intro guard).

const INTERACTIVE_SELECTOR =
    /:hover|:active|:focus-visible|\.is-active|\.active|\[aria-current|\[aria-pressed|\[aria-selected|\[data-state\s*[~|^$*]?=\s*["'](?:active|on|checked|open)["']/;
// A declaration that paints a brand-red on an interactive register.
const RED_PROP =
    /(?:color|background(?:-color)?|fill|--[a-z-]*accent|--demo-nav-accent)\s*:[^;}]*var\(\s*(?:--viz-fourier|--demo-nav-accent)\s*\)/;

/** Recursively collect .css files under a dir. */
function cssFilesUnder(relDir) {
    const abs = resolve(ROOT, relDir);
    if (!existsSync(abs)) return [];
    const out = [];
    const walk = (dir) => {
        for (const entry of readdirSync(dir)) {
            const p = join(dir, entry);
            const st = statSync(p);
            if (st.isDirectory()) {
                if (entry === "node_modules" || entry === "dist") continue;
                walk(p);
            } else if (entry.endsWith(".css")) {
                out.push(p);
            }
        }
    };
    walk(abs);
    return out;
}

/**
 * Split a comment-stripped stylesheet into top-level `selector { body }` rules.
 * Nested at-rules (@media/@container/@supports/@layer) are flattened — their inner
 * rules are still scanned because the splitter walks every `{ … }` whose preamble
 * names a selector (the at-rule preamble itself never carries an interactive state
 * token + a red-prop, so flattening is sound for this negative predicate).
 */
function ruleViolations(css, file) {
    const violations = [];
    // Walk brace-balanced blocks. For each block, the text between the previous
    // block-close (or @-rule-open) and this block's `{` is the selector preamble.
    let depth = 0;
    let preambleStart = 0;
    const stack = [];
    for (let i = 0; i < css.length; i++) {
        const ch = css[i];
        if (ch === "{") {
            const preamble = css.slice(preambleStart, i);
            stack.push({ preamble, bodyStart: i + 1 });
            depth++;
        } else if (ch === "}") {
            depth--;
            const frame = stack.pop();
            if (frame) {
                const body = css.slice(frame.bodyStart, i);
                // The selector preamble is the LAST segment after the nearest
                // separator (`{`/`}`/`;`) — the immediate selector list.
                const sel = frame.preamble
                    .replace(/[\s\S]*[{};]/, "")
                    .trim();
                if (
                    INTERACTIVE_SELECTOR.test(sel) &&
                    // body is THIS rule's own declarations (the part before any nested `{`).
                    RED_PROP.test(body.replace(/\{[\s\S]*$/, ""))
                ) {
                    violations.push({ file, sel });
                }
            }
            preambleStart = i + 1;
        } else if (ch === ";" && depth >= 0) {
            preambleStart = i + 1;
        }
    }
    return violations;
}

const sweepFiles = [
    ...cssFilesUnder("src/styles"),
    ...cssFilesUnder("demo"),
];
const allViolations = [];
for (const f of sweepFiles) {
    const css = strip(readFileSync(f, "utf8"));
    allViolations.push(...ruleViolations(css, f.replace(ROOT + "/", "")));
}
add(
    "no-interactive-red-anywhere",
    allViolations.length === 0,
    allViolations.length === 0
        ? `the negative predicate holds: 0 interactive-selector rule across ${sweepFiles.length} css files reads var(--viz-fourier)/--demo-nav-accent on color/bg/fill/--*-accent`
        : `RE-INTRODUCED brand-red on an interactive register: ${allViolations
              .map((v) => `${v.file} { ${v.sel} }`)
              .join("; ")}`,
);

// ── (f) — the π readback spec is wired (the BINDING close) ──────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/register-ios.spec.ts")),
    "tests-visual/register-ios.spec.ts exists (the π light+dark readback — the BINDING close)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:register-ios — the de-red'd iOS-glassy interactive register gate (AZ.W-REGISTER-IOS, arm-a)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_REGISTER_IOS_OUT", "AZ-register-ios");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:register-ios",
    command: COMMAND,
    note: "SOURCE arm only (arm-a) — the painted no-brand-red truth is proven by tests-visual/register-ios.spec.ts (the π light+dark readback of a selected dock control), never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:register-ios] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:register-ios] the interactive dock register is the iOS luminance-lift — red survives only as static wordmark/viz/CTA ink; the π arm proves no brand-red on a selected control.",
);
