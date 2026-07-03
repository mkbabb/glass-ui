#!/usr/bin/env node
// proof:glass — the F2 Glass family gate (BG plan §1 F2).
//
// The consolidated device-free SOURCE gate for the Glass family. It is seeded
// here with its FIRST arm — `deep-glass-decided` (BG.W-DEEP-GLASS-DECIDE) — and
// grows one clause per F2 wave (the family-gate consolidation, R3 taxonomy).
// BG.W-GLASS-REGISTER-UNIFY adds two arms: `glass-fill-home` (the R9 tint-recipe
// HOME) and `safari-blur-var` (the Safari `blur(var())` webkit-prefix assert).
// BG.W-GLASS-BASIS-CONSOLIDATE adds `dark-arm-color-reversal` (the R16 MN-1 idiom
// reversal — colors → light-dark() canonical, the .dark {} color arm as lockstep
// witnesses; shadows/insets → .dark {} plain arms, never light-dark()).
// BG.W-GLASS-REFRACT-WEBGL adds `refract-webgl` (the C-SAFARI Tier-1 WebGL2 refraction
// floor gate — born-RED with the shader ABSENT → GREEN once `glass-refract.glsl.ts`
// lands: RW1 the fence operator is `uChromatic` not the spike's `uDispersion`
// (refraction=depth, hue=an absolute rim offset), RW2 ONE pinned CHROMATIC_SCALE=0.0045
// named const across BOTH stacks read by the `ca=` operator (the drift-at-root fence),
// RW3 the canonical GLSL rim form + the SHAPE-aligned split, RW4 refraction reads
// uRefractionStrength through the squircle lens, RW5 ONE `sampleBG` sampler wrapper /
// ≥2 sites — the Tier-2 discipline transposed to WebGL2).
//
// ── ARM: glass-fill-home (BG.W-GLASS-REGISTER-UNIFY · R9) ────────────────────
// The tint-recipe HOME is the applied `@utility glass-fill` (glass/surfaces.css) —
// the element-level compose that kills the substitution trap structurally (the mix
// resolves AT the element, so an ancestor's W55 tint re-point reaches every
// descendant `glass-fill` surface; the pre-baked `--glass-bg-dock`/`-*-tinted`
// tokens are the trap forms it supersedes). This arm asserts it is declared EXACTLY
// ONCE, composes the W55 oklab seam reading the per-element `--glass-fill-rung` +
// paints `background: var(--glass-fill)` (the nestable value), AND has ≥1 `@apply
// glass-fill` consumer (the visual-load-bearing floor, J-inv-10). Born-RED at HEAD
// (no `@utility glass-fill`) -> GREEN at the mint.
//
// ── ARM: safari-blur-var (BG.W-GLASS-REGISTER-UNIFY) ─────────────────────────
// `vite.style-fold.ts` (carved from vite.style-assets.ts at BH.B5a) injects the
// `-webkit-backdrop-filter:` pair into the shipped dist so Safari <=17 (webkit-only)
// paints the blur. Its `bdfDeclRe`
// matcher MUST match a `backdrop-filter: blur(var(--x, 8px));` declaration (the
// nested-paren `blur(var())` form — the `.glass-top-layer` entry) so the pair
// reaches the dist, WHILE still NOT matching an `@supports` prelude condition (the
// corruption fence). Born-RED at HEAD (the single-level `\([^()]*\)` value class
// STOPPED at the inner `(` of `blur(var(…))`, so the whole decl never matched → NO
// pair → Safari paints no blur). The gate extracts the live regex + FUNCTIONALLY
// tests it (format-robust).
//
// ── ARM: deep-glass-decided (BG.W-DEEP-GLASS-DECIDE · GA-7) ──────────────────
// The `.glass-deep`/`--glass-blur-deep` tier rode the Apple `blur(20px)/saturate
// 1.8` ceiling "BOOKED" for FIVE tranches (BB->BC->BD->BE->BF->BG) on a
// `profile:budget` clearance nobody ran at 20px. W-DEEP-GLASS-DECIDE ENDS the
// chronic with a MEASUREMENT, not a 6th re-book: `src/styles/tokens/glass-deep.css`
// carries a TERMINAL verdict header (`landed-20px` OR `retired-at-16px-cost-<N>`),
// NEVER `booked`. The decision at BG: RETIRE at 16px — `profile:budget` is
// byte-measuring (a token bump is delta-0 bytes, per-frame-BLIND, so its clearance
// can NOT fence a super-linear-past-16px backdrop-filter over the deep tier's live
// animated backdrops), so 16px IS the substrate's ceiling (IDENTITY, not debt).
//
// This gate LOCKS that terminal decision (the proof:nda-decided terminal-lock
// shape): a flip back to `booked`, a missing verdict, a malformed verdict, a
// surviving "book" re-booking prose survivor, or a verdict that disagrees with
// the shipped `--glass-blur-deep-radius` value — any of these REDs.
//
//   D1 — the machine-parseable TERMINAL verdict marker is present exactly ONCE
//        and is one of {`landed-20px`, `retired-at-16px-cost-<N>`} with a
//        non-empty recorded number N; a `booked`/absent/malformed state REDs.
//   D2 — ZERO surviving `book`/`booked` re-booking prose in glass-deep.css (this
//        file IS the deep-glass decision, so any book-token is the forbidden
//        re-book state — the anti-6th-re-book fence).
//   D3 — verdict/value consistency: the shipped `--glass-blur-deep-radius` matches
//        the verdict (16px when retired-at-16px, 20px when landed-20px), so a
//        header verdict can never diverge from the tier that actually ships.
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-
// idiom-factor.mjs / proof-glass-cal.mjs). Born-RED at HEAD (no verdict marker +
// 7 surviving "BOOKED" tokens in glass-deep.css) -> GREEN at the decide. A
// `--self-test` arm runs every invocation and proves each clause has teeth: a
// synthetic `booked` verdict + BOOKED prose (D1/D2), a verdict/value mismatch
// (D3), and an ABSENT verdict marker (D1) are each flagged.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const GLASS_DEEP_FILE = "src/styles/tokens/glass-deep.css";
// BH.B5a-deps-currency carved vite.style-assets.ts into three sub-plugin modules;
// the `-webkit-backdrop-filter` injector (`bdfDeclRe`) now lives in vite.style-fold.ts
// (its own comment: "Locked by `proof:glass`'s safari-blur-var arm"). The reader
// FOLLOWS the carve into the leaf (the house reader-follows-carve discipline).
const VITE_STYLE_ASSETS = "vite.style-fold.ts";
const SPECULAR_POINTER_FILE = "src/composables/glass/useSpecularPointer.ts";
const DARK_ARM_FILE = "src/styles/tokens/dark-arm.css";
const LIGHT_DARK_FILE = "src/styles/tokens/light-dark.css";
const GLASS_SURFACES_FILE = "src/styles/glass/surfaces.css";
const TRANSITIONS_FILE = "src/styles/transitions.css";
const STORY_HERO_CSS_FILE = "demo/stories/story-hero.css";
const STORY_HERO_SFC_FILE = "demo/stories/StoryHero.vue";
const GLASS_REFRACT_SHADER_FILE =
    "src/composables/glass/webgl/shaders/glass-refract.glsl.ts";
// The pinned cross-stack chromatic scale (must match the exported CHROMATIC_SCALE
// in glass-refract.glsl.ts + the WGSL twin — the drift-at-root fence).
const CHROMATIC_SCALE_LITERAL = "0.0045";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function squish(src) {
    return src.replace(/\s+/g, " ");
}

function readFile(rel) {
    const file = resolve(ROOT, rel);
    return existsSync(file) ? readFileSync(file, "utf8") : "";
}

// ── the deep-glass-decided terminal-lock predicate (pure) ────────────────────
// Returns { violations, facts } for a given glass-deep.css text — pure so the
// self-test can run it against synthetic mutated copies.
export function decideViolations(text) {
    const violations = [];
    const facts = {};

    if (!text) {
        violations.push(
            `deep-glass-decided: ${GLASS_DEEP_FILE} is ABSENT (the deep-glass tier + its terminal verdict must exist)`,
        );
        return { violations, facts };
    }

    // D1 — the machine-parseable TERMINAL verdict marker.
    const markers = [...text.matchAll(/DEEP-GLASS-DECIDED:\s*(\S+)/g)];
    facts.markerCount = markers.length;
    if (markers.length === 0) {
        violations.push(
            "D1: no `DEEP-GLASS-DECIDED:` verdict marker in glass-deep.css — the deep-glass chronic is UNDECIDED (a `booked`/absent state; the 5-tranche ride must TERMINATE with a `landed-20px` OR `retired-at-16px-cost-<N>` verdict)",
        );
    } else if (markers.length > 1) {
        violations.push(
            `D1: ${markers.length} \`DEEP-GLASS-DECIDED:\` markers — the terminal verdict is declared ONCE`,
        );
    }

    const verdict = markers.length ? markers[0][1] : "";
    facts.verdict = verdict;
    const isLanded = verdict === "landed-20px";
    const isRetired = /^retired-at-16px-cost-.+$/.test(verdict);
    facts.terminal = isLanded || isRetired;
    if (markers.length && !isLanded && !isRetired) {
        violations.push(
            `D1: verdict "${verdict}" is NON-terminal — a \`booked\`/malformed state REDs (must be \`landed-20px\` or \`retired-at-16px-cost-<N>\` with a non-empty recorded number, the proof:nda-decided terminal-lock shape)`,
        );
    }

    // D2 — ZERO surviving `book`/`booked` re-booking prose anywhere in the file.
    // This file IS the deep-glass decision, so any book-token is the forbidden
    // re-book state (the anti-6th-re-book fence).
    const bookHits = [...text.matchAll(/\bbook\w*/gi)].map((m) => m[0]);
    facts.bookTokens = [...new Set(bookHits.map((b) => b.toLowerCase()))];
    if (bookHits.length) {
        violations.push(
            `D2: ${bookHits.length} surviving book-token(s) (${facts.bookTokens.join(", ")}) in glass-deep.css — a DECIDED deep-glass tier carries ZERO "booked"/"book" re-booking prose (the terminal chronic must not re-book a 6th time)`,
        );
    }

    // D3 — verdict/value consistency: the shipped `--glass-blur-deep-radius` must
    // agree with the verdict, so a header claim can never diverge from the tier
    // that actually ships.
    const radiusMatch = /--glass-blur-deep-radius:\s*(\d+)px/.exec(text);
    facts.radiusPx = radiusMatch ? Number(radiusMatch[1]) : null;
    if (facts.terminal) {
        if (facts.radiusPx === null) {
            violations.push(
                "D3: `--glass-blur-deep-radius` declaration not found — the terminal verdict cannot be reconciled to the shipped value",
            );
        } else if (isRetired && facts.radiusPx !== 16) {
            violations.push(
                `D3: verdict is retired-at-16px but --glass-blur-deep-radius is ${facts.radiusPx}px — the verdict and the shipped value MUST agree (retire = the tier stays 16px)`,
            );
        } else if (isLanded && facts.radiusPx !== 20) {
            violations.push(
                `D3: verdict is landed-20px but --glass-blur-deep-radius is ${facts.radiusPx}px — the verdict and the shipped value MUST agree (land = the tier reaches 20px)`,
            );
        }
    }

    return { violations, facts };
}

// ── the glass-fill-home predicate (pure) — BG.W-GLASS-REGISTER-UNIFY · R9 ─────
// Given the concatenated glass cascade text, assert the `@utility glass-fill` HOME
// is declared ONCE, composes the W55 oklab seam over the per-element rung, paints
// the nestable value, and has ≥1 `@apply glass-fill` consumer.
export function glassFillHomeViolations(glassCss) {
    const violations = [];
    const facts = {};
    const glass = stripCss(glassCss || "");
    const sq = squish(glass);

    const homeCount = (glass.match(/@utility\s+glass-fill\s*\{/g) || []).length;
    facts.homeCount = homeCount;
    if (homeCount === 0) {
        violations.push(
            "A1: `@utility glass-fill` is NOT declared in the glass cascade — the tint-recipe HOME (R9, the applied element-level compose) is missing",
        );
        return { violations, facts };
    }
    if (homeCount > 1) {
        violations.push(
            `A1: \`@utility glass-fill\` is declared ${homeCount} times — the HOME is declared ONCE (a second @utility is a forked recipe home; consumers APPLY the one utility)`,
        );
    }

    const composesSeam =
        /@utility\s+glass-fill\s*\{[^}]*--glass-fill\s*:\s*color-mix\(\s*in\s+oklab\s*,\s*var\(--glass-fill-rung[^}]*var\(--glass-tint-source\)\s*var\(--glass-tint-strength\)/.test(
            sq,
        );
    facts.composesSeam = composesSeam;
    if (!composesSeam) {
        violations.push(
            "A1: `@utility glass-fill` does not compose `--glass-fill: color-mix(in oklab, var(--glass-fill-rung …), var(--glass-tint-source) var(--glass-tint-strength))` — the HOME must be the W55 oklab tint seam reading the per-element `--glass-fill-rung` indirection (an in-srgb mix, a baked rung, or a dropped tint leg breaks the net-neutral floor)",
        );
    }

    const paintsFill = /@utility\s+glass-fill\s*\{[^}]*background\s*:\s*var\(--glass-fill\)/.test(sq);
    facts.paintsFill = paintsFill;
    if (!paintsFill) {
        violations.push(
            "A1: `@utility glass-fill` does not paint `background: var(--glass-fill)` — the applied utility must paint the composed value AND expose the nestable `--glass-fill` token for a composing consumer",
        );
    }

    const consumers = (glass.match(/@apply\s+glass-fill\b/g) || []).length;
    facts.consumers = consumers;
    if (consumers < 1) {
        violations.push(
            "A1: `@utility glass-fill` has ZERO `@apply glass-fill` consumers in the glass cascade — a minted HOME with no consumer is substrate-without-consumer (J-inv-10); a surface must APPLY it",
        );
    }

    return { violations, facts };
}

// ── the safari-blur-var predicate (pure) — BG.W-GLASS-REGISTER-UNIFY ──────────
// Extract the live `bdfDeclRe` webkit-backdrop matcher from vite.style-fold.ts
// and FUNCTIONALLY test it: it MUST match `backdrop-filter: blur(var(--x, 8px));`
// (the nested-paren `blur(var())` form) so the `-webkit-` pair reaches the dist,
// MUST still match the 1-level `var(--token)` form (superset), and MUST NOT match
// an `@supports` prelude condition (the corruption fence).
export function safariBlurVarViolations(viteText) {
    const violations = [];
    const facts = {};

    const m = /const\s+bdfDeclRe\s*=\s*\/([\s\S]*?)\/([gimsuy]*)\s*;/.exec(viteText || "");
    facts.regexFound = Boolean(m);
    if (!m) {
        violations.push(
            "safari-blur-var: could not locate the `bdfDeclRe` webkit-backdrop matcher in vite.style-fold.ts — the Safari blur-prefix pass is the gate's subject (its absence breaks the shipped-dist webkit pairing)",
        );
        return { violations, facts };
    }
    let re;
    try {
        re = new RegExp(m[1], m[2].includes("g") ? m[2] : m[2] + "g");
    } catch (e) {
        violations.push(`safari-blur-var: the extracted \`bdfDeclRe\` pattern does not compile: ${e.message}`);
        return { violations, facts };
    }

    const countMatches = (sample) => {
        re.lastIndex = 0;
        return [...sample.matchAll(re)].length;
    };

    // MUST match the nested-paren `blur(var())` declaration form (the born-RED clause).
    const blurVarSample = "{\n    backdrop-filter: blur(var(--top-layer-backdrop-blur, 8px));\n}";
    facts.matchesBlurVar = countMatches(blurVarSample) === 1;
    if (!facts.matchesBlurVar) {
        violations.push(
            "safari-blur-var: `bdfDeclRe` does NOT match `backdrop-filter: blur(var(--x, 8px));` — the nested `blur(var())` form gets NO `-webkit-backdrop-filter` pair in the shipped dist, so Safari <=17 paints no blur (the `.glass-top-layer` entry regression). The value matcher must admit ≥2 levels of balanced parens.",
        );
    }

    // MUST still match the 1-level `var(--token)` form (the widen is a superset).
    facts.matchesSimple = countMatches("{ backdrop-filter: var(--glass-blur-resting); }") === 1;
    if (!facts.matchesSimple) {
        violations.push(
            "safari-blur-var: `bdfDeclRe` no longer matches the 1-level `backdrop-filter: var(--glass-blur-*)` form — the widen must be a SUPERSET of the prior matcher, never a replacement that drops the base ladder rungs",
        );
    }

    // MUST NOT match an `@supports`/`@container` prelude condition (the corruption fence).
    facts.matchesPrelude = countMatches("@supports (backdrop-filter: blur(1px)) or (x: y) {") > 0;
    if (facts.matchesPrelude) {
        violations.push(
            "safari-blur-var: `bdfDeclRe` matches an `@supports` prelude condition — a widened matcher must still STOP at the `;` terminator / the `) or (` operators (never inject a webkit pair INSIDE an at-rule query)",
        );
    }

    return { violations, facts };
}

// ── the defined-control-floor predicate (pure) — BG.W-GLASS-DEFAULT-DEFINITION · GA-1
// Glass is the maximal default (AX.W54), but the blur is imperceptible over a FLAT
// page — a bare <Button>/.input-pill reads as a near-gray shape (chroma 0.0138, BD
// GOLDEN). The DEFINED tier gives a CONTROL a read-carrying warm rim + a warm-cream
// floor over ANY backdrop, on the ONE --glass-level/edge machinery. This arm asserts
// the mechanism + the control-cohort default flip, device-free over the SOURCE:
//   DF1 — @property --glass-definition registered typed INHERITING <number>, initial 0
//         (the transmissive default; the one load-bearing engage scalar §3.2).
//   DF2 — --glass-floor-fill composes color-mix(in srgb, var(--card)
//         calc(var(--glass-definition) * …), transparent) — the alpha-of-`--card` PLATE
//         leg reading the scalar (dead-knob-proof) — AND --glass-floor-fill-max is a
//         NON-ZERO % (the floor actually engages at definition 1).
//   DF3 — --glass-border-defined is a LIFTED warm rim reading var(--glass-definition) +
//         var(--foreground) with a multiplier STRICTLY ABOVE the ≤5% content hairline.
//   DF4 — the `.glass-defined` recipe zeroes `background-color: transparent`
//         (LOAD-BEARING — the base rung paints its plate via background-COLOR, so the
//         two-image plate-over-floor only orders correctly with the color zeroed) AND
//         layers the floor UNDER the plate via TWO linear-gradient image layers, one
//         reading --glass-floor-fill.
//   DF5 — the control cohort (.btn-glass · .input-pill · .control-surface — the gate's
//         three witnesses <Button>/.input-pill/SelectTrigger) is DEFINED by default:
//         each is a co-member of a rule setting `--glass-definition: 1`.
//   DF6 — the NEGATIVE arm: a plain content tier (.glass-card/.glass-resting/
//         .glass-quiet/.glass-wash) is NOT a co-member of any `--glass-definition: 1`
//         rule — the default flip must NOT bleed onto content (content stays
//         transmissive; the floor is sub-perceptual over a real field).
//   DF7 — the substitution-trap fix REACHES PAINT: the `--glass-definition: 1` cohort
//         rule RE-DECLARES --glass-floor-fill + --glass-border-defined (each reading
//         var(--glass-definition)) so they re-resolve at the element (definition 1 ->
//         card@15% / foreground@14% actually paint). A custom property's inner var()
//         substitutes at the DECLARING element, so the :root copies (definition 0)
//         resolve TRANSPARENT and inherit down already-resolved — the flip is a DEAD
//         KNOB (the control reads as a pale lozenge) without the re-declare. The
//         device-free proxy for the paint-judge "scalar reaches paint" mustFix.
// Born-RED at HEAD (no @property, no floor token, no .glass-defined, no cohort flip;
// and — at the paint-DELTA re-open — the cohort flips the scalar but does NOT re-declare
// the tokens, so DF7 is the born-RED clause the fix greens).
export function definedControlFloorViolations(glassCss, tokensCss) {
    const violations = [];
    const facts = {};
    const glass = squish(stripCss(glassCss || ""));
    const tokens = squish(stripCss(tokensCss || ""));

    // Collect every rule whose body sets `--glass-definition: 1` (the defined cohort).
    // A CSS rule body has no nested braces (the @layer wrapper aside), so the innermost
    // `selector { body }` match is robust to the @layer nesting + selector ordering.
    const definedRules = [];
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(glass))) {
        if (/--glass-definition\s*:\s*1\b/.test(m[2])) {
            definedRules.push({ selector: m[1].trim(), body: m[2] });
        }
    }
    const cohortSelectors = definedRules.map((r) => r.selector).join(" || ");
    const cohortBodies = definedRules.map((r) => r.body).join(" ");
    const hasClass = (cls) => new RegExp(`\\.${cls}(?![\\w-])`).test(cohortSelectors);

    // DF1 — the @property registration.
    const propMatch = /@property\s+--glass-definition\s*\{([^}]*)\}/.exec(tokens);
    facts.propertyRegistered = !!propMatch;
    if (!propMatch) {
        violations.push(
            "DF1: `@property --glass-definition` is NOT registered in the tokens cascade — the ONE defined-tier engage scalar must be a typed inheriting <number> (property-regs.css)",
        );
    } else {
        const pbody = propMatch[1];
        facts.propertyInherits = /inherits\s*:\s*true/.test(pbody);
        facts.propertyInitialZero = /initial-value\s*:\s*0\b/.test(pbody);
        facts.propertyNumber = /syntax\s*:\s*"\s*<number>\s*"/.test(pbody);
        if (!facts.propertyNumber) {
            violations.push('DF1: `@property --glass-definition` syntax is not `"<number>"`');
        }
        if (!facts.propertyInherits) {
            violations.push(
                "DF1: `@property --glass-definition` is not `inherits: true` — a host must dial definition on any ancestor (the --glass-level/--glass-depth cascading-scalar idiom)",
            );
        }
        if (!facts.propertyInitialZero) {
            violations.push(
                "DF1: `@property --glass-definition` initial-value is not `0` — the transmissive default (content tier) must be fully transmissive; `.glass-defined` engages the floor",
            );
        }
    }

    // DF2 — the floor-fill token: alpha-of-`--card` plate leg reading the scalar.
    const floorFill = /--glass-floor-fill\s*:\s*([^;]+);/.exec(tokens);
    facts.floorFillComposes =
        !!floorFill &&
        /color-mix\(\s*in\s+srgb/.test(floorFill[1]) &&
        /var\(--card\)/.test(floorFill[1]) &&
        /var\(--glass-definition\)/.test(floorFill[1]);
    if (!facts.floorFillComposes) {
        violations.push(
            "DF2: `--glass-floor-fill` does not compose `color-mix(in srgb, var(--card) calc(var(--glass-definition) * …), transparent)` — it must be the alpha-of-`--card` PLATE leg reading the `--glass-definition` scalar (an in-oklab mix, a missing --card, or a dropped scalar breaks the plate/dead-knob-proof)",
        );
    }
    const floorMax = /--glass-floor-fill-max\s*:\s*(\d+(?:\.\d+)?)%/.exec(tokens);
    facts.floorFillMaxPct = floorMax ? Number(floorMax[1]) : null;
    if (facts.floorFillMaxPct === null) {
        violations.push("DF2: `--glass-floor-fill-max` (the calibration knob) is not declared as a %");
    } else if (facts.floorFillMaxPct <= 0) {
        violations.push(
            `DF2: --glass-floor-fill-max is ${facts.floorFillMaxPct}% — a 0% floor never engages (the floor must be a NON-ZERO warm-cream backplate at definition 1)`,
        );
    }

    // DF3 — the defined rim: a lifted warm alpha above the ≤5% content hairline.
    const rim = /--glass-border-defined\s*:\s*([^;]+);/.exec(tokens);
    const rimMul = rim ? /var\(--glass-definition\)\s*\*\s*(\d+(?:\.\d+)?)%/.exec(rim[1]) : null;
    facts.rimReadsScalar = !!rim && /var\(--glass-definition\)/.test(rim[1]) && /var\(--foreground\)/.test(rim[1]);
    facts.rimMulPct = rimMul ? Number(rimMul[1]) : null;
    if (!rim) {
        violations.push("DF3: `--glass-border-defined` is not declared — the defined tier needs a read-carrying warm rim rung");
    } else {
        if (!facts.rimReadsScalar) {
            violations.push(
                "DF3: `--glass-border-defined` must read `var(--foreground)` (the warm ink) scaled by `var(--glass-definition)` — a static literal cannot flip with the scalar or the warm ink",
            );
        }
        if (facts.rimMulPct === null) {
            violations.push("DF3: `--glass-border-defined` has no `var(--glass-definition) * N%` multiplier — the rim alpha must scale with definition");
        } else if (facts.rimMulPct <= 5) {
            violations.push(
                `DF3: --glass-border-defined lifts to ${facts.rimMulPct}% — the defined rim must clear the ≤5% content hairline (glass.css --glass-border-* is 4-5%); a hairline-tier defined rim is not read-carrying`,
            );
        }
    }

    // DF4 — the recipe: transparent background-color (load-bearing) + two-image floor-under-plate.
    facts.recipeZeroesBg = /background-color\s*:\s*transparent/.test(cohortBodies);
    const gradientCount = (cohortBodies.match(/linear-gradient\(/g) || []).length;
    facts.recipeTwoImageLayers = gradientCount >= 2;
    facts.recipeReadsFloor = /background-image\s*:[^;]*var\(--glass-floor-fill\)/.test(cohortBodies);
    if (definedRules.length === 0) {
        violations.push(
            "DF4/DF5: NO rule sets `--glass-definition: 1` — the `.glass-defined` decoration + the control-cohort default flip are ABSENT (born-RED near-gray control state)",
        );
    } else {
        if (!facts.recipeZeroesBg) {
            violations.push(
                "DF4: the `.glass-defined` recipe does not `background-color: transparent` — LOAD-BEARING (critic M1): the base rung paints its plate via the `background:` SHORTHAND → background-COLOR, so an un-zeroed color counts the plate TWICE (plate-image ⊕ floor-image ⊕ plate-color); zeroing orders exactly ONE plate over ONE floor",
            );
        }
        if (!facts.recipeTwoImageLayers) {
            violations.push(
                "DF4: the `.glass-defined` recipe does not layer TWO `linear-gradient()` image layers — the floor must sit UNDER the plate (CSS image layers paint OVER background-color; a two-image plate-over-floor is the only correct ordering)",
            );
        }
        if (!facts.recipeReadsFloor) {
            violations.push("DF4: the `.glass-defined` recipe's background-image does not read `var(--glass-floor-fill)` — the floor leg is missing");
        }
    }

    // DF5 — the control cohort default flip (the three gate witnesses).
    const cohort = ["glass-defined", "btn-glass", "input-pill", "control-surface"];
    const missing = cohort.filter((c) => !hasClass(c));
    facts.cohortPresent = cohort.filter((c) => hasClass(c));
    if (definedRules.length > 0 && missing.length) {
        violations.push(
            `DF5: the control cohort is not DEFINED by default — ${missing.join(", ")} do not compose the .glass-defined recipe (each of .btn-glass/.input-pill/.control-surface — <Button>/.input-pill/SelectTrigger — must set --glass-definition:1 so a control reads as a control over a flat page)`,
        );
    }

    // DF6 — the negative arm: content tiers stay transmissive (the flip must not bleed).
    const contentTiers = ["glass-card", "glass-resting", "glass-quiet", "glass-wash"];
    const bled = contentTiers.filter((c) => hasClass(c));
    facts.contentTiersBled = bled;
    if (bled.length) {
        violations.push(
            `DF6: a plain content tier (${bled.join(", ")}) is a co-member of a --glass-definition:1 rule — the default flip must NOT bleed onto content (a content surface stays transmissive; the floor is the CONTROL register only)`,
        );
    }

    // DF7 — the substitution-vs-inheritance fix REACHES PAINT (the dead-knob close).
    // DF2/DF3 verify the :root token FORMULAS, but a custom property's inner var()
    // substitutes at the DECLARING element — so --glass-floor-fill/--glass-border-defined
    // composed at :root (where --glass-definition is 0) resolve TRANSPARENT and inherit
    // down already-resolved. The definition-1 cohort rule flipping the scalar is a DEAD
    // KNOB unless it ALSO re-declares the two color tokens (so they re-resolve against the
    // element's own --glass-definition: 1). This is the device-free proxy for "the scalar
    // reaches paint" — the paint-judge DELTA's mustFix. Each re-declaration must read
    // var(--glass-definition) (stays scalar-driven, never a hardcoded strength).
    const floorRedecl = /--glass-floor-fill\s*:\s*([^;]+);/.exec(cohortBodies);
    const rimRedecl = /--glass-border-defined\s*:\s*([^;]+);/.exec(cohortBodies);
    facts.cohortRedeclaresFloor =
        !!floorRedecl && /var\(--glass-definition\)/.test(floorRedecl[1]) && /var\(--card\)/.test(floorRedecl[1]);
    facts.cohortRedeclaresRim =
        !!rimRedecl && /var\(--glass-definition\)/.test(rimRedecl[1]) && /var\(--foreground\)/.test(rimRedecl[1]);
    if (definedRules.length > 0) {
        if (!facts.cohortRedeclaresFloor) {
            violations.push(
                "DF7: the `--glass-definition: 1` cohort rule does not RE-DECLARE `--glass-floor-fill: color-mix(… var(--card) … var(--glass-definition) …)` — the :root copy resolves TRANSPARENT (calc(0 * N%)) and inherits down already-resolved, so the flip is a DEAD KNOB (the floor never paints, the control reads as a pale lozenge). Re-declare the token on the definition-1 scope (the --dock-scale re-declare precedent) so it re-resolves at strength.",
            );
        }
        if (!facts.cohortRedeclaresRim) {
            violations.push(
                "DF7: the `--glass-definition: 1` cohort rule does not RE-DECLARE `--glass-border-defined: color-mix(… var(--foreground) … var(--glass-definition) …)` — the :root copy resolves transparent at the DECLARING element (substitution-vs-inheritance trap), so the defined rim never paints. Re-declare it on the definition-1 scope so the warm rim re-resolves.",
            );
        }
    }

    return { violations, facts };
}

// ── the glass-dynamics predicate (pure) — BG.W-GLASS-DYNAMICS ────────────────
// WS3 demoted the blur ladder (quiet/resting → 8px), so the plate needs a stronger
// READ-CARRIER to still read as GLASS at rest. This wave strengthens the neutral
// specular hairline on the `.glass-material::before` recipe (material.css), mints the
// iOS-27 backdrop-HUE sample seam (the 2nd of the ≤2 chromatic pairs), and couples the
// specular magnitude to the `--glass-btn-press-t` press spring (soft-gated) — both the
// CSS half (material.css) and the JS half (useSpecularPointer.ts). The REFERENCE FENCE:
// the RESTING hairline is NEUTRAL — prismatic is reserved for WS6.
//   GD1 — the resting NEUTRAL specular hairline: the base `::before` carries an inset
//         `box-shadow` rim AND its `opacity` floors on a non-zero `--glass-specular-
//         rest-hairline` (the read-carrier at the demoted blur). Born-RED (HEAD carries
//         a bare `opacity: var(--specular-intensity, 0)`, no rest rim on the pseudo).
//   GD2 — the resting hairline is NEUTRAL (the fence): the box-shadow reads the RAW
//         warm-cream `hsl(40 35% 92%)`, NEVER `--glass-specular-core`/`--glass-accent`/
//         `--glass-backdrop-hue` (a chromatic resting hairline is forbidden; prismatic
//         → WS6).
//   GD3 — the backdrop-HUE sample seam (bounded, neutral default): `--glass-specular-
//         core` folds `var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-
//         strength, 0%)` so an unwired surface reads the warm-cream core byte-identical
//         (a `color-mix(in oklab, X, transparent 0%) === X` no-op), the fence + the
//         2nd-chromatic-pair mint at once. Born-RED (HEAD core has no backdrop-hue).
//   GD4 — the press-couple (soft-gated), reading the ONE `--glass-btn-press-t` channel:
//         the CSS base `--specular-intensity` reads it inside a `max(…)` (the release-
//         settle returns), AND useSpecularPointer.ts folds an optional `press` scalar
//         onto the SAME channel (never a forked press var). Born-RED (HEAD reads a bare
//         rest token + the leaf has no press param).
export function glassDynamicsViolations(glassCss, specularPointerText) {
    const violations = [];
    const facts = {};
    const glass = squish(stripCss(glassCss || ""));
    const js = specularPointerText || "";

    // Extract the BASE `.glass-material::before` recipe (the block carrying the
    // `--glass-specular-core` disc/conic recipe). CSS rule bodies carry no nested `{}`
    // (gradients use `()`), so the `sel { body }` match is robust to the @layer wrapper.
    let baseBlock = "";
    for (const m of glass.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
        if (/\.glass-material::before/.test(m[1]) && /--glass-specular-core\s*:/.test(m[2])) {
            baseBlock = m[2];
            break;
        }
    }
    facts.baseBlockFound = baseBlock.length > 0;
    if (!baseBlock) {
        violations.push(
            "GD: could not locate the base `.glass-material::before` specular recipe (the block carrying `--glass-specular-core`) in the glass cascade — the wave's read-carrier edits live here",
        );
        return { violations, facts };
    }

    // GD1 — the resting NEUTRAL specular hairline (the read-carrier).
    const boxShadowMatch = /box-shadow\s*:\s*inset[^;]*;/.exec(baseBlock);
    facts.hasHairlineBoxShadow = !!boxShadowMatch;
    const opacityMatch = /opacity\s*:\s*([^;]*);/.exec(baseBlock);
    const opacityVal = opacityMatch ? opacityMatch[1] : "";
    facts.opacityFloorsHairline =
        /max\(/.test(opacityVal) && /--glass-specular-rest-hairline/.test(opacityVal);
    if (!boxShadowMatch) {
        violations.push(
            "GD1: the base `.glass-material::before` recipe carries no `box-shadow: inset …` — the resting NEUTRAL specular hairline (the read-carrier at the demoted blur) is ABSENT (born-RED: HEAD paints no rest rim on the pseudo)",
        );
    }
    if (!facts.opacityFloorsHairline) {
        violations.push(
            "GD1: the `::before` `opacity` does not `max(var(--specular-intensity …), var(--glass-specular-rest-hairline …))` — the rest hairline never lights (a bare `opacity: var(--specular-intensity, 0)` reds; the read-carrier floor is missing)",
        );
    }

    // GD2 — the resting hairline is NEUTRAL (the REFERENCE FENCE; prismatic → WS6).
    const boxShadow = boxShadowMatch ? boxShadowMatch[0] : "";
    facts.hairlineNeutral =
        /hsl\(40 35% 92%\)/.test(boxShadow) &&
        !/--glass-accent|--glass-backdrop-hue|--glass-specular-core/.test(boxShadow);
    if (boxShadowMatch && !facts.hairlineNeutral) {
        violations.push(
            "GD2: the resting hairline `box-shadow` is NOT neutral — it must read the RAW warm-cream `hsl(40 35% 92%)`, NEVER `--glass-specular-core`/`--glass-accent`/`--glass-backdrop-hue` (the REFERENCE FENCE: the resting hairline stays NEUTRAL, prismatic reserved for WS6)",
        );
    }

    // GD3 — the backdrop-HUE sample seam (bounded, neutral default).
    const coreMatch = /--glass-specular-core\s*:\s*([^;]*);/.exec(baseBlock);
    const coreVal = coreMatch ? coreMatch[1] : "";
    facts.backdropHueSeam =
        /--glass-backdrop-hue\s*,\s*transparent/.test(coreVal) &&
        /--glass-backdrop-hue-strength\s*,\s*0%/.test(coreVal);
    if (!facts.backdropHueSeam) {
        violations.push(
            "GD3: `--glass-specular-core` does not fold the backdrop-HUE sample seam `var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%)` (the 2nd chromatic pair) — the seam must be present AND default NEUTRAL (transparent + 0% → the outer mix is a byte-identical no-op at rest, the fence)",
        );
    }

    // GD4 — the press-couple (soft-gated), CSS + JS halves reading the ONE channel.
    const intensityMatch = /--specular-intensity\s*:\s*max\(([^;]*)\)\s*;/.exec(baseBlock);
    facts.cssPressCouple = !!intensityMatch && /--glass-btn-press-t/.test(intensityMatch[1]);
    if (!facts.cssPressCouple) {
        violations.push(
            "GD4: the base `--specular-intensity` does not read `--glass-btn-press-t` inside a `max(…)` — the press-COUPLED release-settle (soft-gated) is missing (born-RED: HEAD reads a bare `var(--glass-specular-intensity-rest, 0)`)",
        );
    }
    facts.jsPressCouple = /options\.press/.test(js) && /"--glass-btn-press-t"/.test(js);
    facts.jsNoForkedPress = !/"--specular-press"|"--press-t"/.test(js);
    if (!facts.jsPressCouple) {
        violations.push(
            "GD4: useSpecularPointer.ts does not fold an optional `press` scalar onto `--glass-btn-press-t` — the JS half of the press-couple is missing (soft-gated: an omitted `press` emits no key)",
        );
    }
    if (!facts.jsNoForkedPress) {
        violations.push(
            "GD4: useSpecularPointer.ts writes a FORKED press channel (`--specular-press`/`--press-t`) — the press-couple must reuse the ONE `--glass-btn-press-t` channel, never a second drive",
        );
    }

    return { violations, facts };
}

// ── the dark-arm-color-reversal predicate (pure) — BG.W-GLASS-BASIS-CONSOLIDATE ─
// The idiom REVERSAL, machine-enforced (R16 MN-1). The house pre-BG idiom held a
// COLOR token in TWO arms — the `light-dark()` enhancement (light-dark.css) AND the
// `.dark {}` plain re-declaration (dark-arm.css) — as the "plain per-mode pair".
// BG makes light-dark() the CANONICAL single source for COLOR; the `.dark {}` color
// values become fallback-floor LOCKSTEP WITNESSES that MUST byte-agree with the
// light-dark() dark arg (a divergence paints two different dark colors — the bug the
// reversal forbids). SHADOW/INSET tokens go the OTHER way: they stay `.dark {}` plain
// arms and are NEVER folded into `light-dark()`, because a `light-dark()` wrapping
// shadow FRAGMENTS computes the whole box-shadow to `none` (the MEMORY inset-shadow
// trap). One mechanism per token TYPE — colors → light-dark(); shadows/insets → .dark {}.
//
//   DA1 — lockstep integrity (the single-source guarantee): EVERY token declared in
//         BOTH the `.dark {}` block (dark-arm.css) AND as a `light-dark()` (light-
//         dark.css) MUST byte-agree (dark-arm value == light-dark dark-arg). A
//         divergence REDs. This generalizes proof:no-gray's single-token
//         `dark-foreground-arms-lockstep` to the WHOLE ~60-token color basis, so the
//         reversal's "light-dark() canonical, .dark {} agrees" is provably zero-pixel.
//   DA2 — reversal boundary (the no-color-feeds-inset bite): NO `light-dark()` in
//         light-dark.css holds a shadow/inset value — every light-dark() is a pure
//         `<color>` (no `inset`, no `px` length). A shadow/inset token folded into
//         light-dark() re-arms the whole-box-shadow-none trap; the fence keeps
//         shadows/insets as `.dark {}` plain arms.
//   DA3 — canon recorded: the intentional idiom-reversal canon row is present in BOTH
//         light-dark.css AND dark-arm.css (the "supersedes the plain per-mode pair
//         idiom" + the wave id). Born-RED at HEAD (no canon) -> GREEN at the record.
//   DA4 — shadows kept as `.dark {}`: surfaces.css retains a `.dark … { box-shadow: … }`
//         arm — the POSITIVE example that the reversal did NOT over-fold shadow arms
//         into light-dark(). Ties surfaces.css into the gate with teeth.
//
// Pure so the self-test can run it against synthetic mutated copies.
export function darkArmColorReversalViolations(darkArmText, lightDarkText, surfacesText) {
    const violations = [];
    const facts = {};
    const darkRaw = darkArmText || "";
    const ldRaw = lightDarkText || "";
    const surfRaw = surfacesText || "";
    const dark = stripCss(darkRaw);
    const ld = stripCss(ldRaw);
    const surf = stripCss(surfRaw);

    const norm = (v) => v.replace(/\s+/g, " ").trim().toLowerCase();

    // Parse every `--tok: light-dark(LIGHT, DARK);` decl (brace-matched, nested-paren-safe).
    const parseLightDark = (text) => {
        const out = [];
        const re = /(--[a-z0-9-]+)\s*:\s*light-dark\(/gi;
        let m;
        while ((m = re.exec(text))) {
            const token = m[1];
            const open = text.indexOf("light-dark(", m.index) + "light-dark(".length;
            let depth = 1;
            let i = open;
            let commaTop = -1;
            for (; i < text.length && depth > 0; i++) {
                const c = text[i];
                if (c === "(") depth++;
                else if (c === ")") depth--;
                else if (c === "," && depth === 1 && commaTop === -1) commaTop = i;
            }
            if (depth !== 0 || commaTop === -1) continue;
            const lightArg = text.slice(open, commaTop).trim();
            const darkArg = text.slice(commaTop + 1, i - 1).trim();
            const value = `light-dark(${text.slice(open, i - 1)})`;
            out.push({ token, lightArg, darkArg, value });
        }
        return out;
    };

    // Extract the `.dark { … }` rule body (brace-matched) so we read token
    // declarations that live ONLY in the class arm.
    const darkBlockBody = (text) => {
        const start = text.indexOf(".dark");
        if (start < 0) return "";
        const open = text.indexOf("{", start);
        if (open < 0) return "";
        let depth = 1;
        let i = open + 1;
        for (; i < text.length && depth > 0; i++) {
            if (text[i] === "{") depth++;
            else if (text[i] === "}") depth--;
        }
        return text.slice(open + 1, i - 1);
    };
    const darkTokenVal = (body, token) => {
        const re = new RegExp(`(?:^|[;{\\s])${token.replace(/-/g, "\\-")}\\s*:\\s*([^;]+);`);
        const m = body.match(re);
        return m ? m[1].trim() : null;
    };

    const ldDecls = parseLightDark(ld);
    const block = darkBlockBody(dark);
    facts.lightDarkTokens = ldDecls.length;

    if (!block) {
        violations.push(
            "DA: could not locate the `.dark { … }` block in dark-arm.css — the fallback-floor lockstep witnesses live here",
        );
    }
    if (ldDecls.length === 0) {
        violations.push(
            "DA: no `light-dark()` color declarations found in light-dark.css — the canonical single source of COLOR is missing",
        );
    }

    // DA1 — lockstep integrity across the dual-arm overlap.
    let dualArmCount = 0;
    const diverged = [];
    for (const d of ldDecls) {
        const dv = block ? darkTokenVal(block, d.token) : null;
        if (dv === null) continue; // single-sourced (light-dark() only) — the canonical goal, fine
        dualArmCount++;
        if (norm(dv) !== norm(d.darkArg)) {
            diverged.push({ token: d.token, dark: dv, ld: d.darkArg });
        }
    }
    facts.dualArmCount = dualArmCount;
    facts.divergedCount = diverged.length;
    for (const d of diverged) {
        violations.push(
            `DA1 (lockstep): ${d.token} — the .dark {} fallback-floor value "${d.dark}" DIVERGES from the light-dark() dark arg "${d.ld}". The two arms paint two different dark colors (a @supports-split engine vs a class-toggle engine desync). The fallback floor MUST byte-agree with the single source, or be deleted.`,
        );
    }

    // DA2 — reversal boundary: no light-dark() value is a shadow/inset (the trap fence).
    // A pure <color> never contains `inset` or a `px` length; a shadow/inset value does.
    const shadowValued = ldDecls.filter((d) => /\binset\b|\dpx|\spx\b/i.test(d.value));
    facts.shadowValuedLightDark = shadowValued.map((d) => d.token);
    for (const d of shadowValued) {
        violations.push(
            `DA2 (no-color-feeds-inset): ${d.token} is declared via light-dark() with a shadow/inset value "${d.value}" — a light-dark() wrapping shadow fragments computes the WHOLE box-shadow to none (the inset-shadow trap). Shadows/insets stay .dark {} plain arms; only pure colors fold into light-dark().`,
        );
    }

    // DA3 — the intentional idiom-reversal canon, recorded in BOTH files. The
    // canon lives in a wrapped comment, so match whitespace-tolerantly (newlines +
    // comment-indent between words).
    const canonRe = /supersedes\s+the\s+plain\s+per-mode\s+pair\s+idiom/i;
    const waveRe = /BASIS-CONSOLIDATE/;
    facts.canonInLightDark = canonRe.test(ldRaw) && waveRe.test(ldRaw);
    facts.canonInDarkArm = canonRe.test(darkRaw) && waveRe.test(darkRaw);
    if (!facts.canonInLightDark) {
        violations.push(
            "DA3 (canon): light-dark.css does not record the idiom-REVERSAL canon (the `supersedes the plain per-mode pair idiom` row for BG.W-GLASS-BASIS-CONSOLIDATE) — the reversal must be recorded as INTENTIONAL where the single COLOR source lives",
        );
    }
    if (!facts.canonInDarkArm) {
        violations.push(
            "DA3 (canon): dark-arm.css does not record the reciprocal idiom-REVERSAL canon (the `supersedes the plain per-mode pair idiom` row for BG.W-GLASS-BASIS-CONSOLIDATE) — the fallback-floor arm must name its lockstep-witness role",
        );
    }

    // DA4 — shadows kept as `.dark {}` plain arms (the positive example survives).
    facts.surfacesShadowArm = /\.dark[^{}]*\{[^{}]*box-shadow\s*:/.test(surf);
    if (!facts.surfacesShadowArm) {
        violations.push(
            "DA4 (shadows stay .dark {}): surfaces.css no longer carries a `.dark … { box-shadow: … }` arm — the reversal KEEPS shadow/inset dark values as `.dark {}` plain arms (never light-dark()); the positive example must survive",
        );
    }

    return { violations, facts };
}

// ── ARM: corner-backplate (BG.W-CORNER-ALIAS-KILL — the white corner wedge) ───
// The user's chronic: an opaque light backplate painting to the SQUARE corner box
// behind a rounded host's radius curve (the white wedges on the landing/hero card
// over the warm field). The paint-proven mechanism was COMPOUND, so the arm locks
// each layer of the class fix (pure over the three source texts — the self-test
// runs it against synthetic mutants):
//
//   CB1 — the route root's entrance fill is `backwards`, NEVER `both`/`forwards`.
//         `.route-enter` is the universal ancestor; a `both` fill keeps applying
//         the `to` keyframe's transform FOREVER (a computed transform ≠ none), so
//         the route root becomes a PERMANENT fixed-position containing block and
//         every `position: fixed` descendant (the full-bleed field wash) silently
//         re-parents to the ARTICLE box — an opaque square-cornered plate behind
//         the rounded card.
//   CB2 — the bleed background arms TELEPORT to <body> (StoryHero.vue): a
//         viewport-fixed field layer never rides inside the (transiently
//         transformed) route subtree — immune to any future ancestor promotion.
//   CB3 — `.grid-bg` paints NO opaque `background-color`: the grid is a
//         translucent TEXTURE over the ONE shell warm field, not a second opaque
//         page background (the two-backgrounds collision).
//   CB4 — the corner-backplate discipline: the boxed `.story-hero-bg` layer
//         carries `border-radius: inherit` (follows the host's rendered corner
//         even un-clipped), the `--bleed` arm resets `border-radius: 0`, and the
//         `.story-hero` host keeps its `overflow: hidden` + radius clip.
export function cornerBackplateViolations(transitions, heroCss, heroSfc) {
    const violations = [];
    const facts = {};
    const tSrc = stripCss(transitions);
    const cSrc = stripCss(heroCss);

    // CB1 — every `.route-enter` animation shorthand fills `backwards`.
    const routeBlocks = [...tSrc.matchAll(/\.route-enter\s*\{([^{}]*)\}/g)].map(
        (m) => m[1],
    );
    const animLines = routeBlocks
        .flatMap((b) => [...b.matchAll(/animation\s*:\s*([^;]+);/g)])
        .map((m) => m[1]);
    facts.routeEnterAnimCount = animLines.length;
    facts.routeEnterAllBackwards =
        animLines.length > 0 &&
        animLines.every(
            (l) => /\bbackwards\b/.test(l) && !/\b(both|forwards)\b/.test(l),
        );
    if (!facts.routeEnterAllBackwards) {
        violations.push(
            "CB1 (route-root fill releases): a `.route-enter` animation shorthand fills `both`/`forwards` (or is missing `backwards`) — a filled transform on the route root is a PERMANENT fixed-position containing block that traps every fixed descendant to the article box (the white square-corner wedge class)",
        );
    }

    // CB2 — the StoryHero bleed arms teleport to <body>.
    facts.bleedTeleports =
        /<Teleport\s+to="body"/.test(heroSfc) && /bgTeleported/.test(heroSfc);
    if (!facts.bleedTeleports) {
        violations.push(
            "CB2 (bleed escapes the route subtree): StoryHero.vue does not mount its bleed background arms via `<Teleport to=\"body\">` — a viewport-fixed field layer inside the route subtree is one transformed ancestor away from the trapped square-cornered wash",
        );
    }

    // CB3 — `.grid-bg` carries no opaque background-color plate.
    const gridBlock = /\.grid-bg\s*\{([^{}]*)\}/.exec(cSrc)?.[1] ?? "";
    facts.gridBgFound = gridBlock.length > 0;
    facts.gridBgNoOpaqueBase = facts.gridBgFound && !/background-color\s*:/.test(gridBlock);
    if (!facts.gridBgNoOpaqueBase) {
        violations.push(
            "CB3 (the wash is a texture): `.grid-bg` declares a `background-color` — an opaque base on the full-bleed wash is a SECOND page background that whites-out the shell warm field (and, trapped, painted the square plate behind the rounded card)",
        );
    }

    // CB4 — the boxed backplate radius discipline + the host clip.
    const bgBase = /\.story-hero-bg\s*\{([^{}]*)\}/.exec(cSrc)?.[1] ?? "";
    const bgBleed = /\.story-hero-bg--bleed\s*\{([^{}]*)\}/.exec(cSrc)?.[1] ?? "";
    const heroHost = /\.story-hero\s*\{([^{}]*)\}/.exec(cSrc)?.[1] ?? "";
    facts.boxedRadiusInherit = /border-radius\s*:\s*inherit/.test(bgBase);
    facts.bleedRadiusReset = /border-radius\s*:\s*0/.test(bgBleed);
    facts.hostClips =
        /overflow\s*:\s*hidden/.test(heroHost) && /border-radius\s*:/.test(heroHost);
    if (!facts.boxedRadiusInherit) {
        violations.push(
            "CB4 (corner-backplate discipline): `.story-hero-bg` does not carry `border-radius: inherit` — a boxed backplate under a rounded host must follow the host's rendered corner",
        );
    }
    if (!facts.bleedRadiusReset) {
        violations.push(
            "CB4 (bleed radius reset): `.story-hero-bg--bleed` does not reset `border-radius: 0` — a viewport layer has no host corner to follow",
        );
    }
    if (!facts.hostClips) {
        violations.push(
            "CB4 (host clip): `.story-hero` no longer clips with a radius (`overflow: hidden` + `border-radius`) — the boxed backplate's belt is gone",
        );
    }

    return { violations, facts };
}

// ── ARM: refract-webgl (BG.W-GLASS-REFRACT-WEBGL — the C-SAFARI Tier-1 floor) ───
// The Tier-1 WebGL2 refraction floor is the universal Safari-safe primary of the
// SOTA degrade ladder (Tier-0 CSS box-shadow → Tier-1 WebGL2 here → Tier-2 WGSL).
// This arm scans `glass-refract.glsl.ts` (born-RED: the file is ABSENT at HEAD →
// GREEN once the compliant shader lands) + locks the RESPEC-AMENDED operator fence:
//
//   RW1 — the fence operator is `uChromatic`, NOT the spike's invented `uDispersion`
//         (refraction = DEPTH not hue): the shader declares `uniform float uChromatic`
//         AND carries NO `uDispersion` uniform/identifier NOR a per-channel
//         `(1.0 ± u…)` UV-fraction chromatic re-roll (the future-rainbow class).
//   RW2 — ONE pinned `CHROMATIC_SCALE = 0.0045` named const, present in BOTH the JS
//         `export const CHROMATIC_SCALE` AND a GLSL `const float CHROMATIC_SCALE`, and
//         the `ca =` operator READS the named const — NO bare `0.003`/`0.004`/`0.0045`
//         chromatic literal in the operator line (the drift-at-root fence).
//   RW3 — the canonical rim form is the GLSL source-of-truth
//         `rim = 1.0 - smoothstep(0.0, 0.16, edge)` (NOT the Tier-2 `edge = prof`
//         squircle weight), AND the chromatic split is the SHAPE-aligned
//         `ca = inward * rim * uChromatic * CHROMATIC_SCALE`.
//   RW4 — refraction = DEPTH: the displacement reads `uRefractionStrength` (a squircle
//         UV-offset), so depth + hue are DISJOINT channels (the squircleProfile lens
//         carries the bend, the absolute rim-offset carries the fringe).
//   RW5 — ONE sampler-read wrapper `sampleBG` (the Tier-2 discipline): exactly one
//         `texture(`/`textureLod(` call in the whole source (inside `sampleBG`), and
//         ≥2 `sampleBG(` call-sites (the blur + the ≥2-distinct GL-refraction bar).
export function refractWebglViolations(src) {
    const violations = [];
    const facts = {};

    if (!src) {
        violations.push(
            `refract-webgl: ${GLASS_REFRACT_SHADER_FILE} is ABSENT — the C-SAFARI Tier-1 WebGL2 refraction floor must exist (the Tier-0 CSS-SVG #glass-refract filter is DEAD on Safari/WebKit + Firefox 2026)`,
        );
        return { violations, facts };
    }

    // strip JS line/block comments so a commented note never satisfies a scan.
    const bare = src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");

    // RW1 — the operator is uChromatic, not an invented uDispersion / UV-fraction.
    facts.declaresUChromatic = /uniform\s+float\s+uChromatic\b/.test(bare);
    facts.hasDispersionReroll = /\buDispersion\b/.test(bare);
    // a per-channel UV-FRACTION chromatic split `uv * (1.0 ± u…)` fakes refraction as
    // hue — the future-rainbow class the fence forbids (depth is an ABSOLUTE offset).
    facts.hasUvFractionSplit =
        /\(\s*1\.0?\s*[-+]\s*u[A-Za-z]/.test(bare) &&
        /\buChromatic\b|\bchromat/i.test(bare) &&
        !/uRefractionStrength/.test(
            (/(\(\s*1\.0?\s*[-+]\s*u[A-Za-z][^)]*\))/.exec(bare) || [])[0] || "",
        );
    if (!facts.declaresUChromatic) {
        violations.push(
            "RW1: glass-refract.glsl.ts does not declare `uniform float uChromatic` — the fence operator is `uChromatic`, NOT the spike's invented `uDispersion` (refraction = depth, hue = the absolute rim offset)",
        );
    }
    if (facts.hasDispersionReroll) {
        violations.push(
            "RW1: a `uDispersion` uniform/identifier survives — the operator was re-rolled off the canonical `uChromatic`; refraction = DEPTH not hue (a `(1±uDispersion)` UV-fraction is the future-rainbow class)",
        );
    }
    if (facts.hasUvFractionSplit) {
        violations.push(
            "RW1: a per-channel `(1.0 ± u…)` UV-fraction chromatic split fakes refraction as hue — the chromatic split must be the ABSOLUTE rim offset `ca = inward * rim * uChromatic * CHROMATIC_SCALE`",
        );
    }

    // RW2 — ONE pinned CHROMATIC_SCALE = 0.0045 named const in BOTH stacks + the
    // operator reads the const (no bare chromatic literal in the ca= line).
    facts.jsConst = new RegExp(
        `export\\s+const\\s+CHROMATIC_SCALE\\s*=\\s*${CHROMATIC_SCALE_LITERAL}\\b`,
    ).test(bare);
    facts.glslConst = new RegExp(
        `const\\s+float\\s+CHROMATIC_SCALE\\s*=\\s*\\$\\{CHROMATIC_SCALE\\}|const\\s+float\\s+CHROMATIC_SCALE\\s*=\\s*${CHROMATIC_SCALE_LITERAL}`,
    ).test(bare);
    facts.namedScale = facts.jsConst && facts.glslConst;
    // the ca= operator line reads the named const, never a bare drift literal.
    const caLine = /\bca\s*=\s*[^;]*/.exec(bare)?.[0] ?? "";
    facts.caReadsNamedConst =
        caLine.length > 0 && /CHROMATIC_SCALE/.test(caLine);
    facts.caBareLiteral =
        caLine.length > 0 && /\b0\.00[345]\b/.test(caLine);
    if (!facts.namedScale) {
        violations.push(
            `RW2: the ONE pinned CHROMATIC_SCALE = ${CHROMATIC_SCALE_LITERAL} named const is not present in BOTH the JS export AND the GLSL const (js=${facts.jsConst} glsl=${facts.glslConst}) — the drift-at-root fence pins the scalar once across both stacks`,
        );
    }
    if (!facts.caReadsNamedConst) {
        violations.push(
            "RW2: the `ca =` chromatic operator does not read the named `CHROMATIC_SCALE` const — the absolute rim offset must ride the pinned scalar",
        );
    }
    if (facts.caBareLiteral) {
        violations.push(
            "RW2: the `ca =` operator carries a bare `0.003`/`0.004`/`0.0045` chromatic literal — the drift-at-root fence forbids a raw magnitude in the operator (read CHROMATIC_SCALE)",
        );
    }

    // RW3 — the canonical GLSL source-of-truth rim form + the SHAPE-aligned split.
    facts.canonicalRim =
        /rim\s*=\s*1\.0\s*-\s*smoothstep\(\s*0\.0\s*,\s*0\.16\s*,\s*edge\s*\)/.test(
            bare,
        );
    facts.shapeAlignedOperator =
        /ca\s*=\s*inward\s*\*\s*rim\s*\*\s*uChromatic\s*\*\s*CHROMATIC_SCALE/.test(
            bare,
        );
    if (!facts.canonicalRim) {
        violations.push(
            "RW3: the canonical rim form `rim = 1.0 - smoothstep(0.0, 0.16, edge)` (the GLSL source-of-truth edge-band, NOT the Tier-2 `edge = prof` squircle weight) is absent",
        );
    }
    if (!facts.shapeAlignedOperator) {
        violations.push(
            "RW3: the chromatic operator is not the SHAPE-aligned `ca = inward * rim * uChromatic * CHROMATIC_SCALE` (the rim-band mask × the fence operator × the pinned scale)",
        );
    }

    // RW4 — refraction = DEPTH: the displacement reads uRefractionStrength.
    facts.refractionIsDepth =
        /uniform\s+float\s+uRefractionStrength\b/.test(bare) &&
        /disp\s*=\s*[^;]*uRefractionStrength/.test(bare) &&
        /squircleProfile\s*\(/.test(bare);
    if (!facts.refractionIsDepth) {
        violations.push(
            "RW4: refraction is not a DEPTH channel — the displacement must read `uRefractionStrength` through the `squircleProfile` lens (a pure UV offset), disjoint from the hue rim-offset",
        );
    }

    // RW5 — ONE sampler-read wrapper `sampleBG`, ≥2 sample sites.
    facts.rawTextureReads = (bare.match(/\btextureLod\s*\(|\btexture\s*\(/g) || [])
        .length;
    facts.hasSampleBGWrapper =
        /vec3\s+sampleBG\s*\(\s*vec2[^)]*\)\s*\{/.test(bare);
    // sampleBG call-sites exclude the wrapper's OWN definition line.
    const sampleBGCalls = (bare.match(/\bsampleBG\s*\(/g) || []).length;
    facts.sampleBGCallSites = Math.max(0, sampleBGCalls - 1); // minus the def
    facts.oneWrapper = facts.rawTextureReads === 1 && facts.hasSampleBGWrapper;
    if (!facts.oneWrapper) {
        violations.push(
            `RW5: the backdrop is not read through EXACTLY ONE sampleBG wrapper (rawTextureReads=${facts.rawTextureReads}, hasWrapper=${facts.hasSampleBGWrapper}) — a second raw texture()/textureLod() outside the wrapper breaks the Tier-2 1-wrapper discipline`,
        );
    }
    if (facts.sampleBGCallSites < 2) {
        violations.push(
            `RW5: only ${facts.sampleBGCallSites} sampleBG( call-site(s) — the ≥2-distinct-refraction-site bar (base pass-through + the blur/chromatic taps) is unmet`,
        );
    }

    return { violations, facts };
}

export function detect() {
    const decide = decideViolations(readFile(GLASS_DEEP_FILE));
    const glassMonolith = readMonolith(ROOT, "glass");
    const tokensMonolith = readMonolith(ROOT, "tokens");
    const glassFill = glassFillHomeViolations(glassMonolith);
    const safari = safariBlurVarViolations(readFile(VITE_STYLE_ASSETS));
    const defined = definedControlFloorViolations(glassMonolith, tokensMonolith);
    const dynamics = glassDynamicsViolations(glassMonolith, readFile(SPECULAR_POINTER_FILE));
    const reversal = darkArmColorReversalViolations(
        readFile(DARK_ARM_FILE),
        readFile(LIGHT_DARK_FILE),
        readFile(GLASS_SURFACES_FILE),
    );
    const cornerBackplate = cornerBackplateViolations(
        readFile(TRANSITIONS_FILE),
        readFile(STORY_HERO_CSS_FILE),
        readFile(STORY_HERO_SFC_FILE),
    );
    const refractWebgl = refractWebglViolations(readFile(GLASS_REFRACT_SHADER_FILE));
    // the self-test bites run EVERY run (the "proven every run" discipline) — a
    // bite that loses its teeth REDs the gate, so the anti-gameability arm can
    // never silently rot.
    const biteFails = selfTest();
    return {
        violations: [
            ...decide.violations,
            ...glassFill.violations,
            ...safari.violations,
            ...defined.violations,
            ...dynamics.violations,
            ...reversal.violations,
            ...cornerBackplate.violations,
            ...refractWebgl.violations,
            ...biteFails,
        ],
        facts: {
            deepGlassDecided: decide.facts,
            glassFillHome: glassFill.facts,
            safariBlurVar: safari.facts,
            definedControlFloor: defined.facts,
            glassDynamics: dynamics.facts,
            darkArmColorReversal: reversal.facts,
            cornerBackplate: cornerBackplate.facts,
            refractWebgl: refractWebgl.facts,
            selfTestOk: biteFails.length === 0,
        },
    };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
function selfTest() {
    const fails = [];
    const green = readFile(GLASS_DEEP_FILE);
    if (!green) {
        // no source to mutate — the bite substrate constructs its own below.
    }

    // bite 1 — a synthetic `booked` verdict + a "BOOKED to a successor" prose
    // survivor must both be flagged (D1 NON-terminal + D2 re-book fence teeth).
    const bookedMutant =
        (green || "--glass-blur-deep-radius: 16px;").replace(
            /DEEP-GLASS-DECIDED:\s*\S+/,
            "DEEP-GLASS-DECIDED: booked",
        ) + "\n/* the full 20px push is BOOKED to a successor */\n";
    if (decideViolations(bookedMutant).violations.length === 0) {
        fails.push(
            "self-test D1/D2: a synthetic `booked` verdict + BOOKED prose survivor was NOT flagged (the terminal-lock / re-book fence has no teeth)",
        );
    }

    // bite 2 — a verdict/value MISMATCH must be flagged: the real retired-16px
    // verdict with the shipped radius bumped to 20px (a header that lies about
    // the tier that ships).
    const mismatchBase = green || "DEEP-GLASS-DECIDED: retired-at-16px-cost-0B\n--glass-blur-deep-radius: 16px;";
    const mismatch = mismatchBase.replace(/(--glass-blur-deep-radius:\s*)\d+px/, "$120px");
    if (decideViolations(mismatch).violations.length === 0) {
        fails.push(
            "self-test D3: a synthetic verdict/value mismatch (retired-16px verdict + 20px radius) was NOT flagged (the consistency detector has no teeth)",
        );
    }

    // bite 3 — an ABSENT verdict marker must be flagged (D1 decided-required teeth).
    const noMarkerBase = green || "DEEP-GLASS-DECIDED: retired-at-16px-cost-0B\n--glass-blur-deep-radius: 16px;";
    const noMarker = noMarkerBase.replace(/DEEP-GLASS-DECIDED:\s*\S+/, "(deep glass verdict removed)");
    if (decideViolations(noMarker).violations.length === 0) {
        fails.push(
            "self-test D1: an ABSENT verdict marker was NOT flagged (the decided-required detector has no teeth)",
        );
    }

    // ── glass-fill-home bites (A1) ───────────────────────────────────────────
    const goodHome =
        "@utility glass-fill { --glass-fill: color-mix(in oklab, var(--glass-fill-rung, var(--glass-bg-resting)), var(--glass-tint-source) var(--glass-tint-strength)); background: var(--glass-fill); } .glass-card { --glass-fill-rung: var(--glass-bg-quiet); @apply glass-fill; }";
    // bite A1a — a cascade with NO `@utility glass-fill` reds home-missing.
    if (glassFillHomeViolations("/* no home */ .x { color: red }").violations.length === 0) {
        fails.push(
            "self-test A1: a glass cascade with NO `@utility glass-fill` was NOT flagged (the home-missing detector has no teeth)",
        );
    }
    // bite A1b — a DOUBLED `@utility glass-fill` reds declared-once.
    if (glassFillHomeViolations(goodHome + " " + goodHome).violations.length === 0) {
        fails.push(
            "self-test A1: a DOUBLED `@utility glass-fill` was NOT flagged (the declared-once detector has no teeth)",
        );
    }
    // bite A1c — an in-srgb (not oklab) recipe reds the seam.
    if (
        glassFillHomeViolations(
            "@utility glass-fill { --glass-fill: color-mix(in srgb, var(--glass-fill-rung, var(--glass-bg-resting)), var(--glass-tint-source) var(--glass-tint-strength)); background: var(--glass-fill); } .y { @apply glass-fill; }",
        ).violations.length === 0
    ) {
        fails.push(
            "self-test A1: an in-srgb `@utility glass-fill` recipe was NOT flagged (the oklab-seam detector has no teeth)",
        );
    }
    // bite A1d — a HOME with ZERO `@apply glass-fill` consumers reds (J-inv-10).
    if (
        glassFillHomeViolations(
            "@utility glass-fill { --glass-fill: color-mix(in oklab, var(--glass-fill-rung, var(--glass-bg-resting)), var(--glass-tint-source) var(--glass-tint-strength)); background: var(--glass-fill); }",
        ).violations.length === 0
    ) {
        fails.push(
            "self-test A1: a `@utility glass-fill` with ZERO `@apply glass-fill` consumers was NOT flagged (the ≥1-consumer detector has no teeth)",
        );
    }

    // ── safari-blur-var bites ─────────────────────────────────────────────────
    // bite SW-a — the HEAD single-level matcher (`\([^()]*\)`) FAILS `blur(var())`,
    // the born-RED shape, so the arm must flag it (proves the detector has teeth).
    const headSingleLevel =
        "const bdfDeclRe = /([{};]|\\n)(\\s*)backdrop-filter\\s*:\\s*((?:[^;{}()]|\\([^()]*\\))+);/g;";
    const swHead = safariBlurVarViolations(headSingleLevel).violations;
    if (!swHead.some((v) => /blur\(var\(\)\)|nested/.test(v))) {
        fails.push(
            "self-test safari-blur-var: the HEAD single-level `\\([^()]*\\)` matcher (which FAILS `blur(var())`) was NOT flagged (the born-RED detector has no teeth)",
        );
    }
    // bite SW-b — a matcher that would corrupt an `@supports` prelude (terminates on
    // `{` not `;`) must trip the corruption fence.
    const preludeBreaker = "const bdfDeclRe = /()()backdrop-filter\\s*:\\s*([^{]+)\\{/g;";
    if (!safariBlurVarViolations(preludeBreaker).violations.some((v) => /prelude/.test(v))) {
        fails.push(
            "self-test safari-blur-var: a matcher that matches an `@supports` prelude was NOT flagged (the corruption fence has no teeth)",
        );
    }

    // ── defined-control-floor bites (DF) — BG.W-GLASS-DEFAULT-DEFINITION ───────────
    const goodDefinedGlass =
        "@layer components { .glass-defined, .btn-glass, .input-pill, .control-surface { --glass-definition: 1; --glass-floor-fill: color-mix(in srgb, var(--card) calc(var(--glass-definition) * var(--glass-floor-fill-max)), transparent); --glass-border-defined: color-mix(in srgb, var(--foreground) calc(var(--glass-definition) * 14%), transparent); background-color: transparent; background-image: linear-gradient(var(--glass-defined-plate, var(--glass-plate-tinted)), var(--glass-defined-plate, var(--glass-plate-tinted))), linear-gradient(var(--glass-floor-fill), var(--glass-floor-fill)); border-color: var(--glass-border-defined); } .btn-glass { --glass-defined-plate: var(--glass-fill); } }";
    const goodDefinedTokens =
        '@property --glass-definition { syntax: "<number>"; inherits: true; initial-value: 0; } :root { --glass-floor-fill-max: 15%; --glass-floor-fill: color-mix(in srgb, var(--card) calc(var(--glass-definition) * var(--glass-floor-fill-max)), transparent); --glass-border-defined: color-mix(in srgb, var(--foreground) calc(var(--glass-definition) * 14%), transparent); }';
    // sanity — the good fixture MUST be clean (else a bite would false-pass).
    if (definedControlFloorViolations(goodDefinedGlass, goodDefinedTokens).violations.length !== 0) {
        fails.push(
            "self-test defined-control-floor: the synthetic GOOD fixture is NOT clean (the predicate over-fires — a real bite could false-pass)",
        );
    }
    // bite DF5 — a cohort member (.btn-glass) DROPPED from the defined recipe must flag.
    const missingCohort = goodDefinedGlass.replace(".glass-defined, .btn-glass, .input-pill, .control-surface", ".glass-defined, .input-pill, .control-surface");
    if (!definedControlFloorViolations(missingCohort, goodDefinedTokens).violations.some((v) => /DF5/.test(v))) {
        fails.push(
            "self-test DF5: a cohort member missing the .glass-defined class (.btn-glass dropped) was NOT flagged (the default-flip detector has no teeth)",
        );
    }
    // bite DF2 — a floor-fill-max at 0% (the floor never engages) must flag.
    const floorAtZero = goodDefinedTokens.replace("--glass-floor-fill-max: 15%", "--glass-floor-fill-max: 0%");
    if (!definedControlFloorViolations(goodDefinedGlass, floorAtZero).violations.some((v) => /DF2/.test(v))) {
        fails.push(
            "self-test DF2: a --glass-floor-fill-max of 0% (dead floor) was NOT flagged (the floor-engages detector has no teeth)",
        );
    }
    // bite DF3 — a defined rim at the ≤5% content hairline must flag.
    const rimAtHairline = goodDefinedTokens.replace("var(--glass-definition) * 14%", "var(--glass-definition) * 4%");
    if (!definedControlFloorViolations(goodDefinedGlass, rimAtHairline).violations.some((v) => /DF3/.test(v))) {
        fails.push(
            "self-test DF3: a --glass-border-defined at the 4% content-hairline tier was NOT flagged (the read-carrying-rim detector has no teeth)",
        );
    }
    // bite DF6 — a content tier (.glass-card) bled into the defined cohort must flag.
    const contentBled = goodDefinedGlass.replace(".glass-defined, .btn-glass", ".glass-defined, .glass-card, .btn-glass");
    if (!definedControlFloorViolations(contentBled, goodDefinedTokens).violations.some((v) => /DF6/.test(v))) {
        fails.push(
            "self-test DF6: a content tier (.glass-card) bled into a --glass-definition:1 rule was NOT flagged (the no-bleed negative arm has no teeth)",
        );
    }
    // bite DF7 — a cohort that flips --glass-definition:1 but does NOT re-declare the
    // floor/rim tokens (the dead-knob substitution trap the paint-DELTA caught) must flag.
    const deadKnob = goodDefinedGlass
        .replace(
            "--glass-floor-fill: color-mix(in srgb, var(--card) calc(var(--glass-definition) * var(--glass-floor-fill-max)), transparent); ",
            "",
        )
        .replace(
            "--glass-border-defined: color-mix(in srgb, var(--foreground) calc(var(--glass-definition) * 14%), transparent); ",
            "",
        );
    if (!definedControlFloorViolations(deadKnob, goodDefinedTokens).violations.some((v) => /DF7/.test(v))) {
        fails.push(
            "self-test DF7: a cohort that flips --glass-definition:1 but does NOT re-declare --glass-floor-fill/--glass-border-defined (the dead-knob substitution trap) was NOT flagged (the reaches-paint detector has no teeth)",
        );
    }

    // ── glass-dynamics bites (GD) — BG.W-GLASS-DYNAMICS ───────────────────────────
    const goodDynGlass =
        "@layer components { .glass-material::before, .glass-wash::before {" +
        " --specular-intensity: max( var(--glass-specular-intensity-rest, 0), calc(var(--glass-specular-intensity-active, 0.16) * var(--glass-btn-press-t, 0)) );" +
        " --glass-specular-core: color-mix( in oklab, color-mix( in oklab, hsl(40 35% 92%), var(--glass-accent) var(--glass-accent-strength) ), var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%) );" +
        " background: radial-gradient(circle, transparent);" +
        " box-shadow: inset 0 0 0 var(--glass-specular-hairline-width, 0.75px) color-mix(in srgb, hsl(40 35% 92%) var(--glass-specular-hairline-ink, 70%), transparent);" +
        " opacity: max( var(--specular-intensity, 0), var(--glass-specular-rest-hairline, 0.07) ); } }";
    const goodDynJs =
        'export function useSpecularPointer(options = {}) { const specularStyle = computed(() => { if (options.press == null) return pointerStyle.value; const t = toValue(options.press); return { ...pointerStyle.value, "--glass-btn-press-t": (Number.isFinite(t) ? t : 0).toFixed(4) }; }); }';
    // sanity — the good fixture MUST be clean (else a bite could false-pass).
    if (glassDynamicsViolations(goodDynGlass, goodDynJs).violations.length !== 0) {
        fails.push(
            "self-test glass-dynamics: the synthetic GOOD fixture is NOT clean (the predicate over-fires — a real bite could false-pass): " +
                glassDynamicsViolations(goodDynGlass, goodDynJs).violations.join(" | "),
        );
    }
    // bite GD1 — a recipe WITHOUT the box-shadow hairline must flag.
    const noHairline = goodDynGlass.replace(/box-shadow\s*:\s*inset[^;]*;/, "");
    if (!glassDynamicsViolations(noHairline, goodDynJs).violations.some((v) => /GD1/.test(v))) {
        fails.push(
            "self-test GD1: a recipe missing the resting `box-shadow: inset` hairline was NOT flagged (the read-carrier detector has no teeth)",
        );
    }
    // bite GD1 — a bare `opacity: var(--specular-intensity, 0)` (no rest floor) must flag.
    const noFloor = goodDynGlass.replace(
        /opacity\s*:\s*max\([^;]*\);/,
        "opacity: var(--specular-intensity, 0);",
    );
    if (!glassDynamicsViolations(noFloor, goodDynJs).violations.some((v) => /GD1/.test(v))) {
        fails.push(
            "self-test GD1: a bare `opacity: var(--specular-intensity, 0)` (no rest-hairline floor) was NOT flagged (the floor detector has no teeth)",
        );
    }
    // bite GD2 — a CHROMATIC resting hairline (reads --glass-specular-core) must flag.
    const chromaticHairline = goodDynGlass.replace(
        "color-mix(in srgb, hsl(40 35% 92%) var(--glass-specular-hairline-ink, 70%), transparent)",
        "var(--glass-specular-core)",
    );
    if (!glassDynamicsViolations(chromaticHairline, goodDynJs).violations.some((v) => /GD2/.test(v))) {
        fails.push(
            "self-test GD2: a chromatic resting hairline (box-shadow reads --glass-specular-core) was NOT flagged (the neutral-fence has no teeth; prismatic must stay reserved for WS6)",
        );
    }
    // bite GD3 — a NON-neutral backdrop-hue default (strength 10% not 0%) must flag.
    const notNeutralSeam = goodDynGlass.replace(
        "var(--glass-backdrop-hue-strength, 0%)",
        "var(--glass-backdrop-hue-strength, 10%)",
    );
    if (!glassDynamicsViolations(notNeutralSeam, goodDynJs).violations.some((v) => /GD3/.test(v))) {
        fails.push(
            "self-test GD3: a backdrop-hue seam defaulting to a non-zero strength (10%) was NOT flagged (the neutral-default fence has no teeth)",
        );
    }
    // bite GD3 — the seam ABSENT (core carries no --glass-backdrop-hue) must flag.
    const noSeam = goodDynGlass.replace(
        ", var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%) )",
        " )",
    );
    if (!glassDynamicsViolations(noSeam, goodDynJs).violations.some((v) => /GD3/.test(v))) {
        fails.push(
            "self-test GD3: a core with NO backdrop-hue fold was NOT flagged (the seam-present detector has no teeth)",
        );
    }
    // bite GD4 — a bare `--specular-intensity` (no press-t couple) must flag.
    const noCssPress = goodDynGlass.replace(
        /--specular-intensity\s*:\s*max\([^;]*\);/,
        "--specular-intensity: var(--glass-specular-intensity-rest, 0);",
    );
    if (!glassDynamicsViolations(noCssPress, goodDynJs).violations.some((v) => /GD4/.test(v))) {
        fails.push(
            "self-test GD4: a base --specular-intensity with no --glass-btn-press-t couple was NOT flagged (the CSS press-couple detector has no teeth)",
        );
    }
    // bite GD4 — a JS leaf that does NOT fold the press channel must flag.
    const noJsPress = goodDynJs.replace(/if \(options\.press == null\)[\s\S]*?\}\);/, "return pointerStyle.value; });");
    if (!glassDynamicsViolations(goodDynGlass, noJsPress).violations.some((v) => /GD4/.test(v))) {
        fails.push(
            "self-test GD4: a JS leaf that does NOT fold `press` onto --glass-btn-press-t was NOT flagged (the JS press-couple detector has no teeth)",
        );
    }
    // bite GD4 — a JS leaf that FORKS the press channel (writes --specular-press) must flag.
    const forkedJsPress = goodDynJs.replace(
        '"--glass-btn-press-t": (Number.isFinite(t) ? t : 0).toFixed(4)',
        '"--glass-btn-press-t": t, "--specular-press": t',
    );
    if (!glassDynamicsViolations(goodDynGlass, forkedJsPress).violations.some((v) => /GD4/.test(v))) {
        fails.push(
            "self-test GD4: a JS leaf that FORKS a second press channel (--specular-press) was NOT flagged (the one-channel fence has no teeth)",
        );
    }

    // ── dark-arm-color-reversal bites (DA1-DA4) — BG.W-GLASS-BASIS-CONSOLIDATE ──
    const goodDark =
        `.dark {\n` +
        `  --foreground: hsl(30 14% 90%);\n` +
        `  --gold: oklch(0.784 0.143 86.0);\n` +
        `  /* a shadow/inset token stays a plain .dark {} arm — NEVER light-dark() */\n` +
        `  --glass-rim-top: inset 0 1px 0 hsl(0 0% 100% / 0.40);\n` +
        `}\n` +
        `/* BG.W-GLASS-BASIS-CONSOLIDATE — supersedes the plain per-mode pair idiom for COLOR tokens */`;
    const goodLd =
        `@supports (color: light-dark(white, black)) {\n:root {\n` +
        `  --foreground: light-dark(hsl(24 10% 10%), hsl(30 14% 90%));\n` +
        `  --gold: light-dark(oklch(0.751 0.147 84.2), oklch(0.784 0.143 86.0));\n` +
        `}\n}\n` +
        `/* IDIOM-REVERSAL BG.W-GLASS-BASIS-CONSOLIDATE — supersedes the plain per-mode pair idiom for COLOR tokens */`;
    const goodSurf = `.dark .glass-pager-ring { box-shadow: var(--glass-edge-light-dark); }`;

    // bite DA-good — the clean fixture must produce ZERO violations (no clause over-fires).
    if (darkArmColorReversalViolations(goodDark, goodLd, goodSurf).violations.length !== 0) {
        fails.push(
            "self-test DA: the GOOD reversal fixture is NOT clean (a clause over-fires — a real bite could false-pass): " +
                darkArmColorReversalViolations(goodDark, goodLd, goodSurf).violations.join(" | "),
        );
    }
    // bite DA1 — a DIVERGENT .dark fallback value (the two-arms-two-colors bug) must flag.
    const divergedDark = goodDark.replace("--foreground: hsl(30 14% 90%);", "--foreground: hsl(30 14% 88%);");
    if (!darkArmColorReversalViolations(divergedDark, goodLd, goodSurf).violations.some((v) => /DA1/.test(v))) {
        fails.push(
            "self-test DA1: a divergent .dark fallback-floor value (dark-arm != light-dark dark-arg) was NOT flagged (the lockstep-integrity detector has no teeth)",
        );
    }
    // bite DA2 — a shadow-valued light-dark() (the inset-shadow trap) must flag.
    const shadowLd = goodLd.replace(
        "--gold: light-dark(oklch(0.751 0.147 84.2), oklch(0.784 0.143 86.0));",
        "--gold: light-dark(oklch(0.751 0.147 84.2), oklch(0.784 0.143 86.0));\n  --glass-rim: light-dark(inset 0 1px 0 white, inset 0 1px 0 black);",
    );
    if (!darkArmColorReversalViolations(goodDark, shadowLd, goodSurf).violations.some((v) => /DA2/.test(v))) {
        fails.push(
            "self-test DA2: a shadow-valued light-dark() (a token folded into light-dark() with an inset fragment) was NOT flagged (the inset-shadow-trap fence has no teeth)",
        );
    }
    // bite DA3 — an ABSENT reversal canon (in either file) must flag.
    const noCanonDark = goodDark.replace(/\/\*[^*]*supersedes[\s\S]*?\*\//, "/* (canon removed) */");
    if (!darkArmColorReversalViolations(noCanonDark, goodLd, goodSurf).violations.some((v) => /DA3/.test(v))) {
        fails.push(
            "self-test DA3: an absent reversal canon in dark-arm.css was NOT flagged (the canon-recorded detector has no teeth)",
        );
    }
    // bite DA4 — surfaces.css missing its `.dark … box-shadow` arm must flag.
    if (
        !darkArmColorReversalViolations(goodDark, goodLd, ".x { color: red }").violations.some((v) =>
            /DA4/.test(v),
        )
    ) {
        fails.push(
            "self-test DA4: surfaces.css missing its `.dark … box-shadow` arm was NOT flagged (the shadows-stay-.dark detector has no teeth)",
        );
    }

    // ── corner-backplate bites (BG.W-CORNER-ALIAS-KILL) ─────────────────────
    const goodTransitions =
        ".route-enter { animation: gl-route-enter 0.34s linear backwards; }";
    const goodHeroCss =
        ".story-hero { position: relative; overflow: hidden; border-radius: var(--radius-card); } " +
        ".story-hero-bg { position: absolute; inset: 0; border-radius: inherit; } " +
        ".story-hero-bg--bleed { position: fixed; inset: 0; border-radius: 0; } " +
        ".grid-bg { background-image: repeating-linear-gradient(to right, red 0 1px, transparent 1px 5rem); }";
    const goodHeroSfc = '<Teleport to="body" :disabled="!bgTeleported">…</Teleport>';
    // bite CB1 — a `both`-filled route-enter (the permanent containing-block trap) must flag.
    if (
        !cornerBackplateViolations(
            ".route-enter { animation: gl-route-enter 0.34s linear both; }",
            goodHeroCss,
            goodHeroSfc,
        ).violations.some((v) => /CB1/.test(v))
    ) {
        fails.push(
            "self-test CB1: a `both`-filled .route-enter was NOT flagged (the containing-block-trap detector has no teeth)",
        );
    }
    // bite CB2 — a StoryHero with NO body-teleport for the bleed arms must flag.
    if (
        !cornerBackplateViolations(goodTransitions, goodHeroCss, "<Aurora class=\"story-hero-bg--bleed\" />").violations.some(
            (v) => /CB2/.test(v),
        )
    ) {
        fails.push(
            "self-test CB2: a StoryHero without the <Teleport to=\"body\"> bleed escape was NOT flagged",
        );
    }
    // bite CB3 — an opaque background-color re-added to .grid-bg must flag.
    if (
        !cornerBackplateViolations(
            goodTransitions,
            goodHeroCss.replace(
                ".grid-bg { ",
                ".grid-bg { background-color: var(--background); ",
            ),
            goodHeroSfc,
        ).violations.some((v) => /CB3/.test(v))
    ) {
        fails.push(
            "self-test CB3: an opaque `.grid-bg` background-color was NOT flagged (the second-page-background detector has no teeth)",
        );
    }
    // bite CB4 — the boxed backplate radius-inherit stripped must flag.
    if (
        !cornerBackplateViolations(
            goodTransitions,
            goodHeroCss.replace("border-radius: inherit; ", ""),
            goodHeroSfc,
        ).violations.some((v) => /CB4/.test(v))
    ) {
        fails.push(
            "self-test CB4: a `.story-hero-bg` without `border-radius: inherit` was NOT flagged (the corner-backplate discipline has no teeth)",
        );
    }

    // ── refract-webgl bites (BG.W-GLASS-REFRACT-WEBGL) ───────────────────────
    // A self-contained GOOD Tier-1 shader fixture the bites mutate — teeth prove
    // every RW clause fires on the exact regression it guards.
    const goodRefract = [
        "export const CHROMATIC_SCALE = 0.0045;",
        "export const GLASS_REFRACT_FRAG_GLSL = `#version 300 es",
        "precision highp float;",
        "uniform sampler2D uBackdrop;",
        "uniform float uChromatic;",
        "uniform float uRefractionStrength;",
        "const float CHROMATIC_SCALE = 0.0045;",
        "vec3 sampleBG(vec2 uv) { return textureLod(uBackdrop, uv, 0.0).rgb; }",
        "float squircleProfile(float x) { return sqrt(sqrt(max(0.0, 1.0 - x))); }",
        "void mainImage() {",
        "  vec3 base = sampleBG(vec2(0.5));",
        "  vec2 dir = vec2(1.0, 0.0);",
        "  float prof = squircleProfile(0.5);",
        "  vec2 disp = dir * prof * (uRefractionStrength * 0.04 / 1.5);",
        "  vec2 refrUv = vec2(0.5) + disp;",
        "  float edge = 0.1;",
        "  float rim = 1.0 - smoothstep(0.0, 0.16, edge);",
        "  vec2 inward = dir;",
        "  vec2 ca = inward * rim * uChromatic * CHROMATIC_SCALE;",
        "  vec3 c = sampleBG(refrUv + ca);",
        "}`;",
    ].join("\n");

    // bite 0 — the GOOD fixture is clean (the predicate does not over-fire).
    if (refractWebglViolations(goodRefract).violations.length !== 0) {
        fails.push(
            "self-test refract-webgl: the synthetic GOOD Tier-1 shader is NOT clean (a clause over-fires — a real bite could false-pass): " +
                refractWebglViolations(goodRefract).violations.join(" | "),
        );
    }

    // bite RW-absent — an ABSENT shader file must be flagged (born-RED teeth).
    if (refractWebglViolations("").violations.length === 0) {
        fails.push(
            "self-test refract-webgl: an ABSENT glass-refract.glsl.ts was NOT flagged (the born-RED file-present detector has no teeth)",
        );
    }

    // bite RW1 — a `uDispersion` re-roll must be flagged.
    if (
        !refractWebglViolations(
            goodRefract.replace(/uChromatic/g, "uDispersion"),
        ).violations.some((v) => /RW1/.test(v))
    ) {
        fails.push(
            "self-test RW1: a `uDispersion` re-roll off `uChromatic` was NOT flagged (the operator-is-uChromatic fence has no teeth)",
        );
    }

    // bite RW2 — a bare chromatic literal in the ca= operator must be flagged.
    if (
        !refractWebglViolations(
            goodRefract.replace("uChromatic * CHROMATIC_SCALE", "uChromatic * 0.004"),
        ).violations.some((v) => /RW2/.test(v))
    ) {
        fails.push(
            "self-test RW2: a bare `0.004` chromatic literal in the operator was NOT flagged (the drift-at-root fence has no teeth)",
        );
    }

    // bite RW3 — a stripped canonical rim form must be flagged.
    if (
        !refractWebglViolations(
            goodRefract.replace("1.0 - smoothstep(0.0, 0.16, edge)", "0.5"),
        ).violations.some((v) => /RW3/.test(v))
    ) {
        fails.push(
            "self-test RW3: a stripped canonical `rim = 1.0 - smoothstep(0.0, 0.16, edge)` was NOT flagged (the source-of-truth rim fence has no teeth)",
        );
    }

    // bite RW5 — a second raw texture() outside the wrapper must be flagged.
    if (
        !refractWebglViolations(
            goodRefract.replace(
                "vec3 base = sampleBG(vec2(0.5));",
                "vec3 base = texture(uBackdrop, vec2(0.5)).rgb;",
            ),
        ).violations.some((v) => /RW5/.test(v))
    ) {
        fails.push(
            "self-test RW5: a second raw texture() outside the sampleBG wrapper was NOT flagged (the one-wrapper discipline has no teeth)",
        );
    }

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_ARTIFACT", "BG-glass");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass --self-test — the bite arm (anti-gameability)");
        if (ok) {
            console.log("  all clause bites have teeth ✓");
        } else {
            for (const f of fails) console.log(`  ✗ ${f}`);
        }
        process.exit(ok ? 0 : 1);
    }

    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass",
        facts,
        violations,
    });

    const d = facts.deepGlassDecided;
    console.log("proof:glass — the F2 Glass family gate — arm: deep-glass-decided (BG.W-DEEP-GLASS-DECIDE)");
    console.log(
        `  D1 verdict        : "${d.verdict ?? ""}" (markers=${d.markerCount ?? 0}, terminal=${d.terminal ? "✓" : "✗"})`,
    );
    console.log(
        `  D2 no re-book     : ${d.bookTokens && d.bookTokens.length ? `✗ ${d.bookTokens.join(", ")}` : "✓ (zero book-tokens)"}`,
    );
    console.log(
        `  D3 verdict==value : --glass-blur-deep-radius = ${d.radiusPx ?? "?"}px  ${
            d.terminal
                ? (d.verdict === "landed-20px" ? d.radiusPx === 20 : d.radiusPx === 16)
                    ? "✓"
                    : "✗ MISMATCH"
                : "n/a"
        }`,
    );
    const gf = facts.glassFillHome ?? {};
    console.log("proof:glass — arm: glass-fill-home (BG.W-GLASS-REGISTER-UNIFY · R9)");
    console.log(
        `  A1 home           : @utility glass-fill ×${gf.homeCount ?? 0}   oklab-seam=${gf.composesSeam ? "✓" : "✗"}   paints-value=${gf.paintsFill ? "✓" : "✗"}   @apply consumers=${gf.consumers ?? 0}`,
    );
    const sw = facts.safariBlurVar ?? {};
    console.log("proof:glass — arm: safari-blur-var (BG.W-GLASS-REGISTER-UNIFY)");
    console.log(
        `  SW blur(var())    : regex=${sw.regexFound ? "found" : "MISSING"}   matches-blur(var())=${sw.matchesBlurVar ? "✓" : "✗"}   matches-1-level=${sw.matchesSimple ? "✓" : "✗"}   no-prelude-corruption=${sw.matchesPrelude === false ? "✓" : "✗"}`,
    );
    const df = facts.definedControlFloor ?? {};
    console.log("proof:glass — arm: defined-control-floor (BG.W-GLASS-DEFAULT-DEFINITION · GA-1)");
    console.log(
        `  DF1 @property     : registered=${df.propertyRegistered ? "✓" : "✗"} inherits=${df.propertyInherits ? "✓" : "✗"} initial-0=${df.propertyInitialZero ? "✓" : "✗"}`,
    );
    console.log(
        `  DF2 floor-fill    : plate-leg=${df.floorFillComposes ? "✓" : "✗"}  max=${df.floorFillMaxPct ?? "?"}%`,
    );
    console.log(
        `  DF3 defined rim   : reads-scalar=${df.rimReadsScalar ? "✓" : "✗"}  lift=${df.rimMulPct ?? "?"}% (>5)`,
    );
    console.log(
        `  DF4 recipe        : bg-transparent=${df.recipeZeroesBg ? "✓" : "✗"}  two-image=${df.recipeTwoImageLayers ? "✓" : "✗"}  reads-floor=${df.recipeReadsFloor ? "✓" : "✗"}`,
    );
    console.log(
        `  DF5/6 cohort      : defined=[${(df.cohortPresent ?? []).join(", ")}]  content-bled=${(df.contentTiersBled ?? []).length ? "✗ " + df.contentTiersBled.join(", ") : "✓ none"}`,
    );
    console.log(
        `  DF7 reaches-paint : cohort re-declares floor=${df.cohortRedeclaresFloor ? "✓" : "✗"}  rim=${df.cohortRedeclaresRim ? "✓" : "✗"} (substitution-trap fix)`,
    );
    const gd = facts.glassDynamics ?? {};
    console.log("proof:glass — arm: glass-dynamics (BG.W-GLASS-DYNAMICS)");
    console.log(
        `  GD1 rest hairline : box-shadow=${gd.hasHairlineBoxShadow ? "✓" : "✗"}  opacity-floor=${gd.opacityFloorsHairline ? "✓" : "✗"} (the read-carrier at the demoted blur)`,
    );
    console.log(
        `  GD2 neutral fence : hairline-neutral=${gd.hairlineNeutral ? "✓" : "✗"} (raw hsl(40 35% 92%); prismatic reserved for WS6)`,
    );
    console.log(
        `  GD3 backdrop-hue  : seam=${gd.backdropHueSeam ? "✓" : "✗"} (bounded, neutral default — the 2nd chromatic pair)`,
    );
    console.log(
        `  GD4 press-couple  : css=${gd.cssPressCouple ? "✓" : "✗"}  js=${gd.jsPressCouple ? "✓" : "✗"}  no-fork=${gd.jsNoForkedPress ? "✓" : "✗"} (the ONE --glass-btn-press-t channel, soft-gated)`,
    );
    const da = facts.darkArmColorReversal ?? {};
    console.log("proof:glass — arm: dark-arm-color-reversal (BG.W-GLASS-BASIS-CONSOLIDATE · R16 MN-1)");
    console.log(
        `  DA1 lockstep      : dual-arm=${da.dualArmCount ?? "?"} witnesses  diverged=${(da.divergedCount ?? 0) === 0 ? "✓ none" : "✗ " + da.divergedCount} (each .dark {} color byte-agrees with its light-dark() dark arg)`,
    );
    console.log(
        `  DA2 no-color-inset: shadow-valued light-dark()=${(da.shadowValuedLightDark ?? []).length === 0 ? "✓ none" : "✗ " + (da.shadowValuedLightDark ?? []).join(", ")} (the inset-shadow-trap fence)`,
    );
    console.log(
        `  DA3 canon         : light-dark.css=${da.canonInLightDark ? "✓" : "✗"}  dark-arm.css=${da.canonInDarkArm ? "✓" : "✗"} (the intentional reversal recorded in both)`,
    );
    console.log(
        `  DA4 shadows→.dark : surfaces.css ".dark … box-shadow"=${da.surfacesShadowArm ? "✓" : "✗"} (the positive example survives)`,
    );
    const cb = facts.cornerBackplate ?? {};
    console.log("proof:glass — arm: corner-backplate (BG.W-CORNER-ALIAS-KILL)");
    console.log(
        `  CB1 fill releases : route-enter backwards=${cb.routeEnterAllBackwards ? "✓" : "✗"} (${cb.routeEnterAnimCount ?? 0} anim lines — no permanent fixed-containing-block)`,
    );
    console.log(
        `  CB2 bleed escapes : teleport-to-body=${cb.bleedTeleports ? "✓" : "✗"} (the viewport wash never rides the route subtree)`,
    );
    console.log(
        `  CB3 wash=texture  : grid-bg-no-opaque-base=${cb.gridBgNoOpaqueBase ? "✓" : "✗"} (one page background — the shell field)`,
    );
    console.log(
        `  CB4 backplate     : boxed-radius-inherit=${cb.boxedRadiusInherit ? "✓" : "✗"}  bleed-radius-0=${cb.bleedRadiusReset ? "✓" : "✗"}  host-clips=${cb.hostClips ? "✓" : "✗"}`,
    );
    const rw = facts.refractWebgl ?? {};
    console.log("proof:glass — arm: refract-webgl (BG.W-GLASS-REFRACT-WEBGL — the C-SAFARI Tier-1 floor)");
    console.log(
        `  RW1 operator      : uChromatic=${rw.declaresUChromatic ? "✓" : "✗"}  no-uDispersion=${rw.hasDispersionReroll === false ? "✓" : "✗"}  no-uv-fraction=${rw.hasUvFractionSplit === false ? "✓" : "✗"}`,
    );
    console.log(
        `  RW2 scale         : CHROMATIC_SCALE=${CHROMATIC_SCALE_LITERAL} js+glsl=${rw.namedScale ? "✓" : "✗"}  ca-reads-const=${rw.caReadsNamedConst ? "✓" : "✗"}  no-bare-literal=${rw.caBareLiteral === false ? "✓" : "✗"}`,
    );
    console.log(
        `  RW3 canonical rim : rim-form=${rw.canonicalRim ? "✓" : "✗"}  shape-aligned-ca=${rw.shapeAlignedOperator ? "✓" : "✗"}`,
    );
    console.log(
        `  RW4 depth channel : refraction-reads-uRefractionStrength=${rw.refractionIsDepth ? "✓" : "✗"} (squircle lens, disjoint from hue)`,
    );
    console.log(
        `  RW5 one wrapper   : raw-reads=${rw.rawTextureReads ?? "?"} sampleBG-sites=${rw.sampleBGCallSites ?? "?"}  one-wrapper=${rw.oneWrapper ? "✓" : "✗"}`,
    );
    console.log(`  self-test bites   : ${facts.selfTestOk ? "all teeth ✓" : "✗ BROKE"}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
