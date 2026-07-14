#!/usr/bin/env node
// BI.W-XR-PRODUCER-REPAIRS — the cross-repo producer reds + the dist/build-
// correctness family (proof:xr-producer-repairs).
//
// The device-free SOURCE/DIST arm. Three value.js BLOCKING-a-red producer defects
// (PKT-1 · T-45 · P1-R3) were verified UNOWNED across the BI corpus, then the
// 2026-07-12 marking pass widened the scope with the dist/build-correctness family
// (X4-X8). This gate locks the clauses that are device-free FALSIFIABLE at source
// or on the FRESH-built dist (G-CUR-1: the orchestrator runs `vite build` before
// this gate so X1/X4 read the real emission). Each clause is born-RED at HEAD
// pre-wave and GREEN by the wave's work; a self-test bite gives every clause teeth.
//
//   X1 — PKT-1 (value.js P2 P0): the fresh `dist/styles/components.css` R3 base
//        block routes `--default-transition-duration` THROUGH the house token
//        (`var(--duration-fast, 150ms)`), never a BARE `150ms` `:root` re-declare
//        that clobbers a consumer's own `@theme` alias (the T-58 clock confound).
//        Bite: a re-introduced bare `150ms` REDs.
//   X3 — P1-R3 (value.js §1.8): the spectrum-thumb `:focus-visible` rule pairs the
//        UA-outline SUPPRESSION (`outline: none`/`transparent`) WITH the house ring
//        (`var(--focus-ring-shadow)`) in the SAME rule — never the ring alone
//        (Chromium else paints its accent outline OVER the ring). Bite: dropping the
//        `outline` suppression REDs.
//   X4 — value.js A6+L16: the fresh dist carries the UNPREFIXED `backdrop-filter:
//        none` (the veil-off / spectrum-range reset) beside its `-webkit-` pair —
//        the lexical minifier is prefix-blind, so a vendor-prefix collapse never
//        drops the unprefixed reset. Bite: dropping the unprefixed `none` REDs.
//   X6 — value.js P5 rider: the WatercolorDot ghost ring firms to SOLID at ≤48px
//        (a `@container (max-width: 48px)` → `border-style: solid` on the ghost
//        stroke), never a sparse dashed hairline at swatch sizes. Bite: reverting
//        the ring to `dashed` in the query REDs.
//   X7 — value.js P10/T-40: the DISPLAY/HEADING/TITLE weight axis is tokenised
//        (`--type-weight-display/-heading/-title`) and `text-title`'s weight reads
//        `var(--type-weight-title)` (the bold-letterform root), never a hardcoded
//        `700`. Bite: a hardcoded `700` on `text-title` REDs.
//
// NOT asserted here (device-free-untestable → booked, NEVER faked):
//   X2 — T-45 (the glass-ladder backdrop edge-bleed) is an in-PAINT delta whose
//        oversampled-pseudo cure is ARCHITECTURALLY BLOCKED at the rung: the ladder
//        claims both pseudos (material.css §pseudo-budget), and `.btn-glass`/
//        `.glass-deep`/the dock re-declare `backdrop-filter` ON THE HOST — moving
//        the plate to a pseudo double-blurs + orphans the tint on every host-blur
//        consumer, and the rung's edge rim interferes with an edge-oversampling
//        blur. Routed to a follow-up wrapper-architecture wave + the #92 paint
//        batch (see W-XR-PRODUCER-REPAIRS-DELTA.md); NOT a source clause here.
//   X5 — value.js CC-1 (the registered-@property-in-color-mix collapse on bare
//        `.glass-wash`, `--glass-level` nested in the rung `color-mix` percentage)
//        is a live-paint engine bug; the recipe-form cure needs paint reproduction.
//        Booked to #92, NOT a source clause here.
//   X8 — the pencil-boil optionalPeer widen (^0.8.1) is a package.json registrar
//        row (orchestrator-owned), NOT a script assertion.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/**
 * Pure detector — given the source strings, return { facts, violations }. Sources
 * are passed in so the self-test bites can inject a mutated fixture.
 */
export function detectXrProducerRepairs(s) {
    const violations = [];

    // ── X1 — PKT-1: the emitted duration default routes through the house token ──
    const durDecl = s.distComponents.match(
        /--default-transition-duration\s*:\s*([^;}]+)/,
    );
    const x1DistPresent = s.distComponents.length > 0;
    let x1Routed = false;
    let x1BareLiteral = false;
    if (durDecl) {
        const val = durDecl[1].trim();
        x1BareLiteral = /^150ms$/i.test(val);
        x1Routed = /var\(\s*--duration-fast/.test(val);
    }
    if (!x1DistPresent) {
        violations.push(
            "X1: dist/styles/components.css is absent — run `vite build` before this gate (G-CUR-1)",
        );
    } else if (x1BareLiteral || (durDecl && !x1Routed)) {
        violations.push(
            "X1 (PKT-1): the emitted `--default-transition-duration` must route through `var(--duration-fast, 150ms)`, NOT a bare `150ms` :root re-declare that clobbers a consumer @theme alias",
        );
    }

    // ── X3 — P1-R3: the spectrum-thumb focus rule pairs suppression WITH the ring ─
    const focusRule = s.sliderVue.match(
        /\[data-variant="spectrum"\]\s*\.slider-thumb:focus-visible\s*\{([^}]*)\}/,
    );
    const x3RuleFound = !!focusRule;
    const x3Body = focusRule ? focusRule[1] : "";
    const x3Suppressed = /outline\s*:\s*(none|transparent)\b/.test(x3Body);
    const x3Ring = /var\(\s*--focus-ring-shadow\s*\)/.test(x3Body);
    if (!x3RuleFound) {
        violations.push(
            "X3 (P1-R3): the `[data-variant=\"spectrum\"] .slider-thumb:focus-visible` rule was not found in Slider.vue",
        );
    } else if (!x3Suppressed || !x3Ring) {
        violations.push(
            "X3 (P1-R3): the spectrum-thumb :focus-visible rule must pair UA-outline suppression (`outline: none`/`transparent`) WITH `var(--focus-ring-shadow)` in the SAME rule",
        );
    }

    // ── X4 — the unprefixed `backdrop-filter: none` survives to dist, webkit-paired
    const distCss = s.distSurfaceAxis + "\n" + s.distSfc;
    const x4Unprefixed = /(?<!-webkit-)backdrop-filter\s*:\s*none/.test(distCss);
    const x4Webkit = /-webkit-backdrop-filter\s*:\s*none/.test(distCss);
    if (distCss.trim().length === 0) {
        violations.push(
            "X4: the dist CSS carrying `backdrop-filter: none` is absent — run `vite build` before this gate (G-CUR-1)",
        );
    } else if (!x4Unprefixed) {
        violations.push(
            "X4 (A6+L16): the fresh dist must carry the UNPREFIXED `backdrop-filter: none` (a vendor-prefix collapse must NOT drop it)",
        );
    } else if (!x4Webkit) {
        violations.push(
            "X4 (A6+L16): the `backdrop-filter: none` reset must ship webkit-PAIRED (`-webkit-backdrop-filter: none`) — the ONE prefix policy",
        );
    }

    // ── X6 — the WatercolorDot ghost ring firms SOLID at ≤48px ──────────────────
    const x6Query = /@container\s*\(\s*max-width:\s*48px\s*\)/.test(
        s.watercolorVue,
    );
    const x6ContainerType = /container-type\s*:\s*inline-size/.test(
        s.watercolorVue,
    );
    // The `border-style: solid` must live inside the 48px query window.
    const qIdx = s.watercolorVue.search(
        /@container\s*\(\s*max-width:\s*48px\s*\)/,
    );
    const x6SolidInQuery =
        qIdx >= 0 &&
        /\.watercolor-ghost-stroke\s*\{[^}]*border-style\s*:\s*solid/.test(
            s.watercolorVue.slice(qIdx, qIdx + 300),
        );
    if (!x6Query || !x6ContainerType || !x6SolidInQuery) {
        violations.push(
            "X6 (P5 rider): the ghost swatch must be a size container (`container-type: inline-size`) with a `@container (max-width: 48px)` that firms `.watercolor-ghost-stroke` to `border-style: solid`",
        );
    }

    // ── X7 — the display/heading/title weight axis is tokenised + read ──────────
    const x7TokDisplay = /--type-weight-display\s*:/.test(s.scaleCss);
    const x7TokHeading = /--type-weight-heading\s*:/.test(s.scaleCss);
    const x7TokTitle = /--type-weight-title\s*:/.test(s.scaleCss);
    const titleUtil = s.semanticCss.match(/@utility text-title\s*\{([^}]*)\}/);
    const x7TitleReads =
        !!titleUtil &&
        /font-weight\s*:\s*var\(\s*--type-weight-title\s*\)/.test(titleUtil[1]);
    if (!x7TokDisplay || !x7TokHeading || !x7TokTitle) {
        violations.push(
            "X7 (P10/T-40): the `--type-weight-display/-heading/-title` tokens must be declared (the bold-letterform axis)",
        );
    }
    if (!x7TitleReads) {
        violations.push(
            "X7 (P10/T-40): `@utility text-title` must read `font-weight: var(--type-weight-title)`, not a hardcoded `700`",
        );
    }

    const facts = {
        x1Routed: x1DistPresent && !x1BareLiteral && (!durDecl || x1Routed),
        x3Paired: x3RuleFound && x3Suppressed && x3Ring,
        x4Preserved: x4Unprefixed && x4Webkit,
        x6SolidRing: x6Query && x6ContainerType && x6SolidInQuery,
        x7Tokenised:
            x7TokDisplay && x7TokHeading && x7TokTitle && x7TitleReads,
    };
    return { facts, violations };
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_XR_PRODUCER_REPAIRS_ARTIFACT",
        "BI-xr-producer-repairs",
    );
    const distComponents = safeRead(
        resolve(ROOT, "dist/styles/components.css"),
    );
    const sources = {
        distComponents,
        sliderVue: safeRead(
            resolve(ROOT, "src/components/ui/slider/Slider.vue"),
        ),
        distSurfaceAxis: safeRead(
            resolve(ROOT, "dist/styles/glass/surface-axis.css"),
        ),
        distSfc: safeRead(resolve(ROOT, "dist/glass-ui.css")),
        watercolorVue: safeRead(
            resolve(ROOT, "src/components/custom/watercolor-dot/WatercolorDot.vue"),
        ),
        scaleCss: safeRead(resolve(ROOT, "src/styles/typography/scale.css")),
        semanticCss: safeRead(
            resolve(ROOT, "src/styles/typography/semantic.css"),
        ),
    };

    const { facts, violations } = detectXrProducerRepairs(sources);

    // ── SELF-TEST BITES — each mutated fixture must RED its clause (teeth). A FAIL
    //    here is a gate-integrity violation, NOT a source violation. ──
    const bites = [
        [
            "X1",
            {
                ...sources,
                distComponents: sources.distComponents.replace(
                    /--default-transition-duration\s*:\s*var\([^;}]+/,
                    "--default-transition-duration: 150ms",
                ),
            },
        ],
        [
            "X3",
            {
                ...sources,
                sliderVue: sources.sliderVue.replace(
                    /(\.slider-thumb:focus-visible\s*\{)\s*outline\s*:\s*(none|transparent)\s*;/,
                    "$1",
                ),
            },
        ],
        [
            "X4",
            {
                ...sources,
                distSurfaceAxis: sources.distSurfaceAxis.replace(
                    /(?<!-webkit-)backdrop-filter\s*:\s*none\s*;?/g,
                    "",
                ),
                distSfc: sources.distSfc.replace(
                    /(?<!-webkit-)backdrop-filter\s*:\s*none\s*;?/g,
                    "",
                ),
            },
        ],
        [
            "X6",
            {
                ...sources,
                watercolorVue: sources.watercolorVue.replace(
                    /(border-style\s*:\s*)solid/,
                    "$1dashed",
                ),
            },
        ],
        [
            "X7",
            {
                ...sources,
                semanticCss: sources.semanticCss.replace(
                    /(@utility text-title[\s\S]*?font-weight\s*:\s*)var\(\s*--type-weight-title\s*\)/,
                    "$1700",
                ),
            },
        ],
    ];
    const biteResults = {};
    for (const [tag, biteSrc] of bites) {
        const red = detectXrProducerRepairs(biteSrc).violations.some((v) =>
            v.startsWith(tag),
        );
        biteResults[tag] = red;
        if (!red) {
            violations.push(
                `SELF-TEST: the ${tag} bite did NOT red on its injected regression — the fence has no teeth (gate integrity failure)`,
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const yn = (b) => (b ? "yes" : "NO");

    writeGateArtifact(ARTIFACT, { status, facts, violations, biteResults });

    console.log("proof:xr-producer-repairs — BI.W-XR-PRODUCER-REPAIRS\n");
    console.log(`  X1 duration routes house token    : ${yn(facts.x1Routed)}`);
    console.log(`  X3 spectrum focus outline+ring     : ${yn(facts.x3Paired)}`);
    console.log(`  X4 dist backdrop-filter:none pair  : ${yn(facts.x4Preserved)}`);
    console.log(`  X6 watercolor ring solid ≤48px     : ${yn(facts.x6SolidRing)}`);
    console.log(`  X7 type-weight tokens + text-title : ${yn(facts.x7Tokenised)}`);
    console.log(
        `  self-test bites red                : ${yn(
            Object.values(biteResults).every(Boolean),
        )}`,
    );
    console.log(
        "  (X2 T-45 + X5 CC-1 booked to #92 paint batch; X8 is a package.json registrar row)",
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
