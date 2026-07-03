#!/usr/bin/env node
// proof:glass — the F2 Glass family gate (BG plan §1 F2).
//
// The consolidated device-free SOURCE gate for the Glass family. It is seeded
// here with its FIRST arm — `deep-glass-decided` (BG.W-DEEP-GLASS-DECIDE) — and
// grows one clause per F2 wave (the family-gate consolidation, R3 taxonomy).
// BG.W-GLASS-REGISTER-UNIFY adds two arms: `glass-fill-home` (the R9 tint-recipe
// HOME) and `safari-blur-var` (the Safari `blur(var())` webkit-prefix assert).
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
// `vite.style-assets.ts` injects the `-webkit-backdrop-filter:` pair into the
// shipped dist so Safari <=17 (webkit-only) paints the blur. Its `bdfDeclRe`
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
const VITE_STYLE_ASSETS = "vite.style-assets.ts";
const SPECULAR_POINTER_FILE = "src/composables/glass/useSpecularPointer.ts";

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
// Extract the live `bdfDeclRe` webkit-backdrop matcher from vite.style-assets.ts
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
            "safari-blur-var: could not locate the `bdfDeclRe` webkit-backdrop matcher in vite.style-assets.ts — the Safari blur-prefix pass is the gate's subject (its absence breaks the shipped-dist webkit pairing)",
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

export function detect() {
    const decide = decideViolations(readFile(GLASS_DEEP_FILE));
    const glassMonolith = readMonolith(ROOT, "glass");
    const tokensMonolith = readMonolith(ROOT, "tokens");
    const glassFill = glassFillHomeViolations(glassMonolith);
    const safari = safariBlurVarViolations(readFile(VITE_STYLE_ASSETS));
    const defined = definedControlFloorViolations(glassMonolith, tokensMonolith);
    const dynamics = glassDynamicsViolations(glassMonolith, readFile(SPECULAR_POINTER_FILE));
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
            ...biteFails,
        ],
        facts: {
            deepGlassDecided: decide.facts,
            glassFillHome: glassFill.facts,
            safariBlurVar: safari.facts,
            definedControlFloor: defined.facts,
            glassDynamics: dynamics.facts,
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
