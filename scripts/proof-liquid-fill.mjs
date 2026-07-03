#!/usr/bin/env node
// BG.W-LIQUID-FILL — the ONE shared liquid-fill register gate (proof:liquid-fill).
//
// The born-RED→GREEN device-free SOURCE-STRUCTURE arm for the fewer-sharper-
// primitives extraction: Slider's glass-cylinder fill recipe is factored ONCE into
// the shared `.glass-liquid-fill` register (`src/styles/glass/liquid-fill.css`),
// the Slider RE-READS it (consumer #1), and `<Progress variant="liquid">` reads the
// SAME register (consumer #2 — the speedtest fill meter). The PAINTED truth (the
// warm glass cylinder over the track, both modes) is the binding π; this gate is the
// no-device CI half.
//
// Four falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by the
// wave) + a 4-bite self-test:
//
//   W1 — THE REGISTER EXISTS ONCE + CARRIES THE GLASS MECHANICS + IS @IMPORT-ED.
//        `.glass-liquid-fill` is declared in EXACTLY ONE place — the shared seam
//        src/styles/glass/liquid-fill.css — carrying the full glass-cylinder recipe:
//        the oklab warm fill-mix reading `--liquid-fill-tint`, the
//        `backdrop-filter`/`-webkit-backdrop-filter` blur reading `--liquid-fill-blur`,
//        the `box-shadow` composing `--glass-material-rim` + `--liquid-fill-shadow`,
//        and `border-radius: var(--radius-pill)`. glass.css @imports the partial. The
//        anti-evasion floor: EXACTLY ONE `.glass-liquid-fill {` block across the whole
//        glass cascade (a second definition in any other partial is a fork). RED at
//        HEAD: liquid-fill.css does not exist.
//   W2 — SLIDER RE-READS IT, NO FORK (consumer #1). Slider.vue composes the
//        `glass-liquid-fill` class on its `.slider-range`, AND bridges its
//        consumer-override API onto the register (`--liquid-fill-tint:
//        var(--slider-range-bg`), AND its own scoped CSS no longer re-declares the
//        fill recipe — NO `color-mix(in oklab` fill-background survives in Slider.vue
//        AND the base range no longer sets `backdrop-filter: var(--slider-range-blur`
//        (the fill blur moved to the register; the spectrum `backdrop-filter: none`
//        suppression is a different form and is fine). RED at HEAD: the range carries
//        the inline `color-mix(in oklab, …)` fill.
//   W3 — PROGRESS GAINS variant="liquid" (consumer #2 / the speedtest meter). The
//        `ProgressVariant` union includes `"liquid"`, the dispatcher routes it to
//        `<ProgressLiquid`, ProgressLiquid.vue exists and composes the
//        `glass-liquid-fill` class on its indicator, and it is exported from the
//        progress barrel. RED at HEAD: no `"liquid"` variant, no ProgressLiquid.vue.
//   W4 — PHASE-COLOUR COMPOSABLE, ZERO PER-SITE GLASS KNOWLEDGE + THE ≥2-CONSUMER
//        BAR. ProgressLiquid seeds the tint from the phase token
//        (`--liquid-fill-tint: var(--progress-fill`) — the surface's ONLY knowledge is
//        the colour; it references NONE of the glass mechanics (`backdrop-filter` /
//        `--glass-material-rim` / `--glass-blur`), which live entirely in the register.
//        BOTH consumers (Slider + ProgressLiquid) compose the register — the ≥2-bar
//        met honestly. RED at HEAD: ProgressLiquid.vue does not exist.
//
// House style mirrors proof-surface-axis.mjs / proof-border-progress.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a byte-
// stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ui = (p) => resolve(ROOT, "src/components/ui", p);
    _cliPaths = {
        ROOT,
        LIQUID_FILL_CSS: resolve(ROOT, "src/styles/glass/liquid-fill.css"),
        GLASS_ROOT_CSS: resolve(ROOT, "src/styles/glass.css"),
        SLIDER_VUE: ui("slider/Slider.vue"),
        PROGRESS_VUE: ui("progress/Progress.vue"),
        PROGRESS_LIQUID_VUE: ui("progress/ProgressLiquid.vue"),
        PROGRESS_INDEX_TS: ui("progress/index.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_LIQUID_FILL_ARTIFACT", "BG-liquid-fill"),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip /* … */ block comments AND //-line comments (false-witness discipline).
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out render must not
// satisfy or trip a witness.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// The oklab warm fill-mix signature (the defining fill background) reading the
// register's tint knob. Spans nested parens, so match loosely up to the tint var.
const OKLAB_FILL_MIX = /color-mix\(\s*in\s+oklab\s*,[\s\S]*?--liquid-fill-tint/;
// The Slider's PRE-EXTRACTION forked fill-mix (over its own --slider-range-bg).
const SLIDER_FORKED_FILL = /color-mix\(\s*in\s+oklab/;
// The Slider's PRE-EXTRACTION fill blur (must move to the register).
const SLIDER_FORKED_BLUR = /backdrop-filter\s*:\s*var\(\s*--slider-range-blur/;

/**
 * The W-LIQUID-FILL detector. Pure: takes file CONTENTS, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectLiquidFill(sources) {
    const registerCss = stripBlockComments(sources.registerCss ?? "");
    const glassMonolith = stripBlockComments(sources.glassMonolith ?? "");
    const glassRootCss = stripBlockComments(sources.glassRootCss ?? "");
    const slider = stripHtmlComments(stripBlockComments(sources.slider ?? ""));
    const progress = stripHtmlComments(stripBlockComments(sources.progress ?? ""));
    const progressLiquid = stripHtmlComments(
        stripBlockComments(sources.progressLiquid ?? ""),
    );
    const progressIndex = stripBlockComments(sources.progressIndex ?? "");

    const violations = [];

    // ── W1 — the register exists ONCE + carries the glass mechanics + is imported ──
    const registerDefined = /\.glass-liquid-fill\s*\{/.test(registerCss);
    if (!registerDefined) {
        violations.push(
            "W1: src/styles/glass/liquid-fill.css does not declare the `.glass-liquid-fill {` register.",
        );
    }
    const registerHasFillMix = OKLAB_FILL_MIX.test(registerCss);
    if (registerDefined && !registerHasFillMix) {
        violations.push(
            "W1: the register carries no `color-mix(in oklab, …, var(--liquid-fill-tint) …)` warm fill-mix (the glass-cylinder background).",
        );
    }
    const registerHasBlur =
        /backdrop-filter\s*:\s*var\(\s*--liquid-fill-blur/.test(registerCss) &&
        /-webkit-backdrop-filter\s*:\s*var\(\s*--liquid-fill-blur/.test(registerCss);
    if (registerDefined && !registerHasBlur) {
        violations.push(
            "W1: the register does not read `--liquid-fill-blur` on BOTH `backdrop-filter` + `-webkit-backdrop-filter` (the Safari-native §7 blur floor).",
        );
    }
    const registerHasRim =
        /--glass-material-rim/.test(registerCss) &&
        /--liquid-fill-shadow/.test(registerCss);
    if (registerDefined && !registerHasRim) {
        violations.push(
            "W1: the register `box-shadow` does not compose `--glass-material-rim` + `--liquid-fill-shadow` (the unified rim + under-shadow).",
        );
    }
    const registerHasRadius = /border-radius\s*:\s*var\(\s*--radius-pill/.test(
        registerCss,
    );
    if (registerDefined && !registerHasRadius) {
        violations.push(
            "W1: the register does not set `border-radius: var(--radius-pill)` (the rounded glass cylinder).",
        );
    }
    // The anti-evasion floor: EXACTLY ONE `.glass-liquid-fill {` block across the
    // whole glass cascade (a second definition in any partial is a fork).
    const registerCount = (
        glassMonolith.match(/\.glass-liquid-fill\s*\{/g) || []
    ).length;
    if (registerDefined && registerCount !== 1) {
        violations.push(
            `W1: the \`.glass-liquid-fill\` register is defined ${registerCount} times across the glass cascade — it must be factored ONCE (a second definition is a fork).`,
        );
    }
    // glass.css @imports the partial.
    const registerImported = /@import\s+["']\.\/glass\/liquid-fill\.css["']/.test(
        glassRootCss,
    );
    if (!registerImported) {
        violations.push(
            "W1: src/styles/glass.css does not @import `./glass/liquid-fill.css` (the register never reaches the cascade).",
        );
    }

    // ── W2 — Slider RE-READS it, no fork (consumer #1) ────────────────────────────
    const sliderComposes = /class\s*=\s*["'][^"']*\bglass-liquid-fill\b/.test(slider);
    if (!sliderComposes) {
        violations.push(
            "W2: Slider.vue does not compose the `glass-liquid-fill` class on its `.slider-range` (the register is not re-read).",
        );
    }
    const sliderBridges = /--liquid-fill-tint\s*:\s*var\(\s*--slider-range-bg/.test(
        slider,
    );
    if (!sliderBridges) {
        violations.push(
            "W2: Slider.vue does not bridge its `--slider-range-bg` consumer override onto the register's `--liquid-fill-tint` knob (the consumer API must be preserved).",
        );
    }
    // Anti-fork: the fill recipe lives ONCE — no forked oklab fill-mix or fill blur
    // survives in Slider.vue.
    const sliderForksFill = SLIDER_FORKED_FILL.test(slider);
    if (sliderForksFill) {
        violations.push(
            "W2: Slider.vue still carries a `color-mix(in oklab, …)` fill recipe — the glass-cylinder fill must live ONCE in the register (a dual path, forbidden).",
        );
    }
    const sliderForksBlur = SLIDER_FORKED_BLUR.test(slider);
    if (sliderForksBlur) {
        violations.push(
            "W2: Slider.vue still sets `backdrop-filter: var(--slider-range-blur …)` — the fill blur moved to the register's `--liquid-fill-blur` knob (a dual path, forbidden).",
        );
    }

    // ── W3 — Progress gains variant="liquid" (consumer #2 / the speedtest meter) ──
    const unionHasLiquid = /ProgressVariant\s*=\s*[^;]*["']liquid["']/.test(progress);
    if (!unionHasLiquid) {
        violations.push(
            "W3: Progress.vue's `ProgressVariant` union does not include `\"liquid\"`.",
        );
    }
    const routesLiquid =
        /variant\s*===\s*['"]liquid['"]/.test(progress) &&
        /<ProgressLiquid/.test(progress);
    if (!routesLiquid) {
        violations.push(
            "W3: Progress.vue does not route `variant === 'liquid'` to `<ProgressLiquid>`.",
        );
    }
    const liquidExists = progressLiquid.trim().length > 0;
    const liquidComposes = /class\s*=\s*["'][^"']*\bglass-liquid-fill\b/.test(
        progressLiquid,
    );
    if (!liquidExists || !liquidComposes) {
        violations.push(
            "W3: ProgressLiquid.vue does not exist or does not compose the `glass-liquid-fill` class on its indicator (the register is not re-read).",
        );
    }
    const liquidExported = /ProgressLiquid/.test(progressIndex);
    if (!liquidExported) {
        violations.push(
            "W3: ProgressLiquid is not exported from the progress barrel (src/components/ui/progress/index.ts).",
        );
    }

    // ── W4 — phase-colour composable, zero per-site glass knowledge + ≥2-bar ──────
    const liquidSeedsTint = /--liquid-fill-tint\s*:\s*var\(\s*--progress-fill/.test(
        progressLiquid,
    );
    if (!liquidSeedsTint) {
        violations.push(
            "W4: ProgressLiquid does not seed `--liquid-fill-tint` from the phase token `--progress-fill` (the phase-colour composable seam).",
        );
    }
    // Zero per-site glass knowledge: the surface owns ONLY the colour; the glass
    // mechanics (blur / rim / raw glass-blur token) live entirely in the register.
    const liquidLeaksGlass =
        /backdrop-filter/.test(progressLiquid) ||
        /--glass-material-rim/.test(progressLiquid) ||
        /--glass-blur/.test(progressLiquid);
    if (liquidLeaksGlass) {
        violations.push(
            "W4: ProgressLiquid references glass mechanics (backdrop-filter / --glass-material-rim / --glass-blur) — the surface must own ONLY the tint; the register owns the glass (zero per-site glass knowledge).",
        );
    }
    // The ≥2-consumer bar: BOTH consumers compose the register.
    const consumerCount = (sliderComposes ? 1 : 0) + (liquidComposes ? 1 : 0);
    if (consumerCount < 2) {
        violations.push(
            `W4: the register has ${consumerCount} composing consumer(s) — the ≥2-consumer bar (Slider #1 + Progress liquid #2) is not met.`,
        );
    }

    const facts = {
        w1: {
            registerDefined,
            registerHasFillMix,
            registerHasBlur,
            registerHasRim,
            registerHasRadius,
            registerCount,
            registerImported,
        },
        w2: { sliderComposes, sliderBridges, sliderForksFill, sliderForksBlur },
        w3: { unionHasLiquid, routesLiquid, liquidExists, liquidComposes, liquidExported },
        w4: { liquidSeedsTint, liquidLeaksGlass, consumerCount },
    };

    return { facts, violations };
}

// ── The self-test: a GOOD synthetic corpus greens; each planted defect REDs ──────
function selfTest() {
    const good = {
        registerCss: `.glass-liquid-fill {
            border-radius: var(--radius-pill);
            background: color-mix(in oklab, var(--liquid-fill-tint, var(--glass-capsule-warm)) var(--liquid-fill-strength, 88%), oklch(0.9 0.05 75 / 0));
            backdrop-filter: var(--liquid-fill-blur, var(--glass-blur-quiet));
            -webkit-backdrop-filter: var(--liquid-fill-blur, var(--glass-blur-quiet));
            box-shadow: var(--glass-material-rim), var(--liquid-fill-shadow, var(--glass-under-shadow-quiet));
        }`,
        // The glass monolith INCLUDES the register partial once.
        glassMonolith: `.glass-liquid-fill { background: color-mix(in oklab, var(--liquid-fill-tint), oklch(0.9 0.05 75 / 0)); }`,
        glassRootCss: `@import "./glass/glass-capsule.css";\n@import "./glass/liquid-fill.css";\n@import "./glass/surface-axis.css";`,
        slider: `<SliderRange class="slider-range glass-liquid-fill" />
            .slider-range { --liquid-fill-tint: var(--slider-range-bg, var(--glass-capsule-warm)); }`,
        progress: `type ProgressVariant = "default" | "gradient" | "liquid" | "sectioned";
            <ProgressLiquid v-else-if="props.variant === 'liquid'" />`,
        progressLiquid: `<ProgressIndicator class="glass-liquid-fill progress-liquid-fill" />
            .progress-liquid-fill { --liquid-fill-tint: var(--progress-fill, var(--primary)); }`,
        progressIndex: `export { default as ProgressLiquid } from "./ProgressLiquid.vue";`,
    };
    const baseGreen = detectLiquidFill(good).violations.length === 0;

    const bites = [];
    // Bite A — the register drops the oklab fill-mix reds W1.
    bites.push({
        name: "register-missing-fill-mix",
        red:
            detectLiquidFill({
                ...good,
                registerCss: good.registerCss.replace(
                    /background:[\s\S]*?;/,
                    "background: red;",
                ),
                glassMonolith: `.glass-liquid-fill { background: red; }`,
            }).violations.length > 0,
    });
    // Bite B — Slider re-declares the oklab fill (a dual path) reds W2.
    bites.push({
        name: "slider-forks-fill",
        red:
            detectLiquidFill({
                ...good,
                slider:
                    good.slider +
                    "\n.slider-range { background: color-mix(in oklab, var(--slider-range-bg), transparent); }",
            }).violations.length > 0,
    });
    // Bite C — Progress drops the `"liquid"` variant reds W3.
    bites.push({
        name: "progress-no-liquid-variant",
        red:
            detectLiquidFill({
                ...good,
                progress: `type ProgressVariant = "default" | "gradient" | "sectioned";`,
                progressLiquid: "",
                progressIndex: "",
            }).violations.length > 0,
    });
    // Bite D — ProgressLiquid leaks glass knowledge (a backdrop-filter) reds W4.
    bites.push({
        name: "liquid-leaks-glass",
        red:
            detectLiquidFill({
                ...good,
                progressLiquid:
                    good.progressLiquid +
                    "\n.progress-liquid-fill { backdrop-filter: var(--glass-blur-quiet); }",
            }).violations.length > 0,
    });

    return { baseGreen, bites };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectLiquidFill({
        registerCss: safeRead(P.LIQUID_FILL_CSS),
        glassMonolith: readMonolith(ROOT, "glass"),
        glassRootCss: safeRead(P.GLASS_ROOT_CSS),
        slider: safeRead(P.SLIDER_VUE),
        progress: safeRead(P.PROGRESS_VUE),
        progressLiquid: safeRead(P.PROGRESS_LIQUID_VUE),
        progressIndex: safeRead(P.PROGRESS_INDEX_TS),
    });

    // The self-test bites.
    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen) {
        violations.push(
            "SELF-TEST: the GOOD synthetic corpus did not green (detector over-strict).",
        );
    }
    if (biteFailures.length > 0) {
        violations.push(
            `SELF-TEST: bite(s) did not RED: ${biteFailures.join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:liquid-fill",
        facts: { ...facts, selfTest: { baseGreen: st.baseGreen, biteFailures } },
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:liquid-fill — the ONE shared liquid-fill register (BG.W-LIQUID-FILL)",
    );
    console.log(
        `  W1 register ONCE + mechanics + import : ${yn(
            facts.w1.registerDefined &&
                facts.w1.registerHasFillMix &&
                facts.w1.registerHasBlur &&
                facts.w1.registerHasRim &&
                facts.w1.registerHasRadius &&
                facts.w1.registerCount === 1 &&
                facts.w1.registerImported,
        )}  (count:${facts.w1.registerCount})`,
    );
    console.log(
        `  W2 Slider re-reads, no fork           : ${yn(
            facts.w2.sliderComposes &&
                facts.w2.sliderBridges &&
                !facts.w2.sliderForksFill &&
                !facts.w2.sliderForksBlur,
        )}`,
    );
    console.log(
        `  W3 Progress variant="liquid"          : ${yn(
            facts.w3.unionHasLiquid &&
                facts.w3.routesLiquid &&
                facts.w3.liquidExists &&
                facts.w3.liquidComposes &&
                facts.w3.liquidExported,
        )}`,
    );
    console.log(
        `  W4 phase-colour, zero glass knowledge : ${yn(
            facts.w4.liquidSeedsTint &&
                !facts.w4.liquidLeaksGlass &&
                facts.w4.consumerCount >= 2,
        )}  (consumers:${facts.w4.consumerCount})`,
    );
    console.log(
        `  self-test (base-green + bites RED)    : ${yn(
            st.baseGreen && biteFailures.length === 0,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
