#!/usr/bin/env node
// D6.c M3/M12 — proof:glass-gilt, the gilt-edge modifier + gold-specular gate.
//
// The gilt family completes the gold register: `.glass-gilt` is a fine book's
// gold-TOOLED edge on a glass surface (a hairline gold catch, NEVER a gold fill),
// and `.glass-gilt::before` overrides the moving-specular sweep COLOR from
// warm-cream to GOLD — the liquid-metal catch-light (the single richest
// composition in the platform, the title-page flourish). This gate asserts the
// two halves are present + correct + composed the right way:
//
//   (1) THE MODIFIER COMPOSES ON ANY TIER. `.glass-gilt` is a BARE modifier class
//       (not bound to a single `.glass-floating`/`.glass-overlay` tier), and its
//       box-shadow is ADDITIVE — it lays the two gilt layers (the gold rim + the
//       gold top-catch) AND re-includes the tier's own lift (`--glass-shadow-*` /
//       `--glass-material-rim`), so the gilt is the EDGE and the tier underneath
//       is the FROST. A box-shadow that DROPPED the tier's lift would replace the
//       tier's elevation (wrong — the gilt must compose, not override).
//
//   (2) THE GILT EDGE READS THE GOLD TOKENS. The rim is a 1px INSET ring on
//       `--gold-rim` (the D6.b gilt-edge token, referenced BY NAME); the top-catch
//       is a gold highlight mixing `--gold-light`. Both are gold, not white — a
//       white rim would be a generic bevel, not a gilt edge.
//
//   (3) THE SPECULAR GOLD OVERRIDE RESOLVES. `.glass-gilt::before` re-declares the
//       radial-gradient `background` so the catch-light core is a GOLD mix (reads
//       `--gold-light` in the gradient), inheriting the bounded geometry
//       (`--glass-specular-size`) from the shared `::before` — so the travelling
//       catch-light is golden, not warm-cream. Without this the gilt edge would be
//       static gold under a white sweep (the "gold leaf catches a WHITE highlight"
//       wrongness the M12 intersection exists to fix).
//
// This is a device-free SOURCE gate (a read-and-detect over glass.css), the same
// shape as proof:liquid-glass-material — happy-dom does not resolve scoped
// pseudo-element custom properties, so the composition is proven at the source
// level. The gold-INK contrast (the cream-law ② Lc≥45) is a SEPARATE gate
// (proof:gold-ink-contrast, D6.b) — this gate owns only the gilt-EDGE + the
// gold-specular composition, not the legible-text arm.
//
// SELF-TEST (the planted-fixture discipline, mirrors proof-no-disco-star): `node
// proof-glass-gilt.mjs --selftest` plants a WHITE-rim gilt + a tier-LIFT-dropping
// box-shadow + a WHITE-only specular override and asserts the detector REDDENS on
// each — proving the gate bites, not a vacuous pass.
//
// bite-checks (the born-RED witnesses this gate inverts):
//   • bind `.glass-gilt` to a single `.glass-floating.glass-gilt` tier → the
//     compose-on-any-tier clause reddens (it is no longer a bare modifier).
//   • drop `--gold-rim` from the inset ring (white the rim) → the gold-edge clause reddens.
//   • drop the tier lift (`--glass-shadow-*` / `--glass-material-rim`) from the
//     box-shadow → the additive-compose clause reddens (the gilt replaces the tier).
//   • drop the `--gold-light` mix from the `::before` gradient (a white sweep) →
//     the gold-specular clause reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Extract the body of the FIRST rule whose selector list EQUALS (trimmed) one of
 * `selectors` exactly — so `.glass-gilt` matches the bare modifier but NOT a
 * `.glass-floating .glass-gilt` descendant. Returns `{ selector, body }` or null.
 */
function exactRule(src, selectors) {
    const want = new Set(selectors);
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(src))) {
        const sel = m[1].trim();
        if (want.has(sel)) return { selector: sel, body: m[2] };
    }
    return null;
}

/**
 * Scan one stylesheet's effective (comment-stripped) CSS for the gilt clauses.
 * Returns `{ facts, violations }` for the SOURCE arm (no FS, pure detector) so
 * the self-test can drive it over an in-memory fixture.
 */
export function detectGilt(css, label = "glass.css") {
    const violations = [];
    const facts = {};
    const src = stripComments(css);

    // ── 1. The `.glass-gilt` MODIFIER exists as a BARE class (composes on any tier). ──
    const giltRule = exactRule(src, [".glass-gilt"]);
    facts.giltModifierFound = Boolean(giltRule);
    if (!giltRule) {
        violations.push(
            `${label}: no bare \`.glass-gilt\` rule — the gilt modifier must be a tier-agnostic class (it composes on ANY tier; a tier-bound \`.glass-floating.glass-gilt\` would not)`,
        );
        // Without the rule the remaining edge clauses cannot resolve.
        return { facts, violations };
    }
    const body = giltRule.body;

    // ── 2. The gilt EDGE reads the GOLD tokens (the rim + the top-catch). ──
    // (2a) the 1px INSET ring on `--gold-rim` (the D6.b token, by name).
    facts.giltRimGold = /inset\s+0\s+0\s+0\s+1px\s+var\(\s*--gold-rim/.test(body);
    if (!facts.giltRimGold) {
        violations.push(
            `${label}: the \`.glass-gilt\` box-shadow has no \`inset 0 0 0 1px var(--gold-rim …)\` ring — the tooled gold EDGE (the D6.b --gold-rim token) is absent`,
        );
    }
    // (2b) the gold top-catch highlight mixes `--gold-light` (a gold bevel-light,
    // not a white one). The top-catch layer is `inset 0 0.5px 0 0 color-mix(…
    // --gold-light …)`; the `[\s\S]*?` (lazy, semicolon-bounded by the declaration
    // body) tolerates the commas INSIDE the color-mix() — a `[^,]*` would break on
    // the first internal comma.
    facts.giltTopCatchGold = /inset\s+0\s+0\.5px[\s\S]*?--gold-light/.test(body);
    if (!facts.giltTopCatchGold) {
        violations.push(
            `${label}: the \`.glass-gilt\` box-shadow has no gold top-catch (\`inset 0 0.5px … --gold-light\`) — the bevel light is white, not gilt`,
        );
    }

    // ── 3. The box-shadow COMPOSES (additive) — it re-includes the tier's own lift
    // so the gilt is the EDGE and the tier is the FROST, not a replacement. ──
    facts.giltComposesTierLift =
        /var\(\s*--glass-shadow-/.test(body) ||
        /var\(\s*--glass-material-rim/.test(body);
    if (!facts.giltComposesTierLift) {
        violations.push(
            `${label}: the \`.glass-gilt\` box-shadow drops the tier's own lift (no \`--glass-shadow-*\` / \`--glass-material-rim\`) — the gilt REPLACES the tier elevation instead of composing ON it`,
        );
    }

    // ── 4. The GOLD specular override — `.glass-gilt::before` re-declares the
    // gradient `background` so the catch-light is GOLD, not warm-cream. ──
    const beforeRule = exactRule(src, [".glass-gilt::before"]);
    facts.giltSpecularOverrideFound = Boolean(beforeRule);
    if (!beforeRule) {
        violations.push(
            `${label}: no \`.glass-gilt::before\` rule — the gold-specular override (the liquid-metal catch-light, M12) is absent`,
        );
    } else {
        const bb = beforeRule.body;
        // The override re-declares a radial-gradient background…
        facts.giltSpecularIsRadial =
            /background\s*:\s*radial-gradient\(/.test(bb);
        // …whose core mixes `--gold-light` (the warm-gold catch).
        facts.giltSpecularGold = /--gold-light/.test(bb);
        // …and inherits the bounded geometry (the `--glass-specular-size` falloff)
        // so it stays a bounded glint, not a full-plate gold wash.
        facts.giltSpecularBounded = /var\(\s*--glass-specular-size/.test(bb);
        if (!facts.giltSpecularIsRadial || !facts.giltSpecularGold) {
            violations.push(
                `${label}: the \`.glass-gilt::before\` background is not a gold radial-gradient (reads --gold-light) — the catch-light sweep is still warm-cream/white, not gilt (M12)`,
            );
        }
        if (!facts.giltSpecularBounded) {
            violations.push(
                `${label}: the \`.glass-gilt::before\` gold gradient is not bounded by \`circle var(--glass-specular-size …)\` — the gold sweep is a full-plate wash, not the bounded glint inherited from the shared ::before`,
            );
        }
    }

    return { facts, violations };
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        ARTIFACT: gateArtifactPath("GLASS_UI_GLASS_GILT_ARTIFACT", "D6-glass-gilt"),
    };
    return _cliPaths;
}

// ── Self-test: plant born-RED fixtures, assert the detector bites ──
function selftest() {
    const cases = [
        {
            name: "white-rim gilt (no --gold-rim)",
            css: `.glass-gilt { box-shadow: inset 0 0 0 1px white, inset 0 0.5px 0 0 color-mix(in oklab, var(--gold-light) 35%, transparent), var(--glass-shadow-floating); }
                  .glass-gilt::before { background: radial-gradient(circle var(--glass-specular-size) at 50% 50%, color-mix(in oklab, var(--gold-light) 60%, white) 0%, transparent 100%); }`,
            wantClause: "var(--gold-rim",
        },
        {
            name: "tier-lift dropped (no --glass-shadow-* / --glass-material-rim)",
            css: `.glass-gilt { box-shadow: inset 0 0 0 1px var(--gold-rim), inset 0 0.5px 0 0 color-mix(in oklab, var(--gold-light) 35%, transparent); }
                  .glass-gilt::before { background: radial-gradient(circle var(--glass-specular-size) at 50% 50%, color-mix(in oklab, var(--gold-light) 60%, white) 0%, transparent 100%); }`,
            wantClause: "REPLACES the tier elevation",
        },
        {
            name: "white-only specular override (no --gold-light sweep)",
            css: `.glass-gilt { box-shadow: inset 0 0 0 1px var(--gold-rim), inset 0 0.5px 0 0 color-mix(in oklab, var(--gold-light) 35%, transparent), var(--glass-shadow-floating); }
                  .glass-gilt::before { background: radial-gradient(circle var(--glass-specular-size) at 50% 50%, white 0%, transparent 100%); }`,
            wantClause: "still warm-cream/white",
        },
        {
            name: "tier-bound (no bare .glass-gilt modifier)",
            css: `.glass-floating.glass-gilt { box-shadow: inset 0 0 0 1px var(--gold-rim), var(--glass-shadow-floating); }`,
            wantClause: "must be a tier-agnostic class",
        },
    ];
    let ok = true;
    for (const c of cases) {
        const { violations } = detectGilt(c.css, "<fixture>");
        const bit = violations.some((v) => v.includes(c.wantClause));
        console.log(`  selftest [${c.name}] → ${bit ? "REDDENS ✓" : "MISSED ✗"}`);
        if (!bit) ok = false;
    }
    // The inverse: the CORRECT gilt recipe stays GREEN.
    const good = `.glass-gilt {
        box-shadow:
            inset 0 0 0 1px var(--gold-rim, color-mix(in oklab, var(--gold) 40%, transparent)),
            inset 0 0.5px 0 0 color-mix(in oklab, var(--gold-light) 35%, transparent),
            var(--glass-material-rim),
            var(--glass-shadow-floating);
    }
    .glass-gilt::before {
        background: radial-gradient(
            circle var(--glass-specular-size, 36%) at var(--specular-x, 50%) var(--specular-y, 50%),
            color-mix(in oklab, var(--gold-light) 60%, hsl(40 35% 92%)) 0%,
            hsl(40 35% 92% / 0) 70%,
            transparent 100%
        );
    }`;
    const goodGreen = detectGilt(good, "<fixture-good>").violations.length === 0;
    console.log(`  selftest [correct gilt recipe] → ${goodGreen ? "stays GREEN ✓" : "false-reddens ✗"}`);
    if (!goodGreen) ok = false;

    console.log(`\n  selftest: ${ok ? "PASS (the gate bites)" : "FAIL (the gate is vacuous)"}`);
    process.exit(ok ? 0 : 1);
}

function run() {
    if (process.argv.includes("--selftest")) return selftest();

    const { ROOT, GLASS, ARTIFACT } = cliPaths();
    const violations = [];
    let facts = {};

    if (!existsSync(GLASS)) {
        violations.push("glass.css is absent");
    } else {
        const res = detectGilt(readFileSync(GLASS, "utf8"), "src/styles/glass.css");
        facts = res.facts;
        violations.push(...res.violations);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-gilt",
        facts,
        violations,
    });

    console.log(
        "proof:glass-gilt — the gilt-edge modifier composes on any tier + the gold-specular override resolves (D6.c M3/M12)",
    );
    console.log(
        `  modifier            : bare .glass-gilt=${facts.giltModifierFound ? "✓" : "✗"}  composes-tier-lift=${facts.giltComposesTierLift ? "✓" : "✗"}`,
    );
    console.log(
        `  gilt edge (gold)    : --gold-rim ring=${facts.giltRimGold ? "✓" : "✗"}  --gold-light top-catch=${facts.giltTopCatchGold ? "✓" : "✗"}`,
    );
    console.log(
        `  gold specular (M12) : ::before override=${facts.giltSpecularOverrideFound ? "✓" : "✗"}  gold-gradient=${facts.giltSpecularGold ? "✓" : "✗"}  bounded=${facts.giltSpecularBounded ? "✓" : "✗"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
