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
// Born-RED at HEAD (no @property, no floor token, no .glass-defined, no cohort flip).
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

    return { violations, facts };
}

export function detect() {
    const decide = decideViolations(readFile(GLASS_DEEP_FILE));
    const glassMonolith = readMonolith(ROOT, "glass");
    const tokensMonolith = readMonolith(ROOT, "tokens");
    const glassFill = glassFillHomeViolations(glassMonolith);
    const safari = safariBlurVarViolations(readFile(VITE_STYLE_ASSETS));
    const defined = definedControlFloorViolations(glassMonolith, tokensMonolith);
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
            ...biteFails,
        ],
        facts: {
            deepGlassDecided: decide.facts,
            glassFillHome: glassFill.facts,
            safariBlurVar: safari.facts,
            definedControlFloor: defined.facts,
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
        "@layer components { .glass-defined, .btn-glass, .input-pill, .control-surface { --glass-definition: 1; background-color: transparent; background-image: linear-gradient(var(--glass-defined-plate, var(--glass-plate-tinted)), var(--glass-defined-plate, var(--glass-plate-tinted))), linear-gradient(var(--glass-floor-fill), var(--glass-floor-fill)); border-color: var(--glass-border-defined); } .btn-glass { --glass-defined-plate: var(--glass-fill); } }";
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
