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
// BG.W-GLASS-SIGNAL-TRUTH — the sampled-luminance observer (the SOLE `--glass-
// backdrop-luma`/`--glass-ambient-hue` writer). The signal-truth arm reads it to
// assert the writer-fired witness (`data-backdrop-sampled` / `--glass-backdrop-
// sampled: 1`) stamps on write (M8) + the real hue-channel write (M9).
const BACKDROP_LUMINANCE_FILE =
    "src/composables/glass/useGlassBackdropLuminance.ts";
// BG.W-GLASS-SIGNAL-TRUTH (NF.3 paint re-open) — the dock SFC that WIRES the observer.
// The ST7 arm reads it to assert the observer is default-ON (the `autoLuminance` boolean
// prop defaults TRUE via `withDefaults`), the device-free lock for the paint-DELTA's
// blocking mustFix (0 of 12 docks fired because Vue casts an absent `boolean` prop to
// `false`, so the `props.autoLuminance !== false` guard was a dead binding).
const GLASSDOCK_FILE = "src/components/custom/dock/GlassDock.vue";
const DARK_ARM_FILE = "src/styles/tokens/dark-arm.css";
const LIGHT_DARK_FILE = "src/styles/tokens/light-dark.css";
const GLASS_SURFACES_FILE = "src/styles/glass/surfaces.css";
// BG.W-GLASS-CONSUMER-BAND — the tokens home for the SHARED `--glass-fill-tinted`
// plate + the two consumer recipes (`.glass-atom`/`.glass-chip`) that fold onto it.
const TOKENS_GLASS_FILE = "src/styles/tokens/glass.css";
const GLASS_ATOM_FILE = "src/styles/glass/glass-atom.css";
const GLASS_CHIP_FILE = "src/styles/glass/glass-chip.css";
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

// ── the depth-tier predicate (pure) — BG.W-GLASS-DEPTH-TIER ───────────────────
// iOS-27 grammar: larger glass = thicker material AUTOMATICALLY (a control flexing
// into a menu GAINS depth as part of the morph — WWDC25). glass-ui's deep tier was
// opt-in per class at a UNIFORM --glass-depth: 1, so thickness did NOT track surface
// prominence. This wave maps the ONE inheriting --glass-depth scalar onto the tier
// ladder so the deep register's thickness tracks prominence BY CONSTRUCTION —
// overlay/menu rungs default a HIGHER depth than content rungs (menu > popover >
// button). ZERO new machinery: a per-rung DEFAULT of the EXISTING scalar the deep
// recipe already LERPs on (D1). Two files — the named grade tokens live in
// tokens/glass-deep.css (glassDeepText), the tier-ladder MAP in glass/deep.css
// (part of the glass monolith).
//   DT1 — the three named grade tokens are declared in glass-deep.css as numeric
//         values: --glass-depth-content, --glass-depth-popover, --glass-depth-menu.
//   DT2 — MONOTONE by prominence: content < popover < menu, each in [0,1], content > 0
//         (a deep content control still clears the calm floating floor at depth 0 —
//         only the menu/overlay rung reaches the full ceiling at depth 1).
//   DT3 — the tier-ladder MAP: the overlay rung sets --glass-depth to the menu grade,
//         the floating rung to the popover grade, the content band to the content grade
//         (overlay/menu default HIGHER than content — the finding's core).
//   DT4 — ZERO new machinery + D5-safe + the FREEZE-GUARD: NO --glass-depth-setting
//         tier rule reads var(--glass-blur-deep) or re-points a --glass-blur-* token (a
//         base-tier deep leak the opt-in fence forbids — the map is a SCALAR default
//         only); the deep LERP still READS var(--glass-depth) (load-bearing, not a dead
//         knob); the LERP that reads the REGISTERED @property --glass-depth is declared
//         at/below the tier-grade site (.glass-deep), NEVER at :root (where --glass-depth
//         eager-substitutes to its @property initial-value 1 and FREEZES the calc at the
//         depth-1 endpoint — the C18 dual-engine painted dead-knob, 2026-07-05); AND the
//         LERP evaluated at the three grades is a STRICTLY-increasing blur ladder (a flat
//         result — the deep==floating endpoint, or the frozen-at-:root paint — reds).
// Born-RED at HEAD (no grade tokens, no tier map). A --self-test bite proves each
// clause has teeth (a flat/reversed map, a missing grade, a blur-leak, a missing map,
// the LERP-at-:root freeze).
export function depthTierViolations(glassDeepText, glassCss, tokensGlassText) {
    const violations = [];
    const facts = {};
    const deep = stripCss(glassDeepText || "");
    const glass = squish(stripCss(glassCss || ""));

    // DT1 — the named grade tokens (numeric).
    const grade = (name) => {
        const m = new RegExp(`--glass-depth-${name}\\s*:\\s*([0-9.]+)`).exec(deep);
        return m ? Number(m[1]) : null;
    };
    const content = grade("content");
    const popover = grade("popover");
    const menu = grade("menu");
    facts.grades = { content, popover, menu };
    const missing = [];
    if (content === null) missing.push("--glass-depth-content");
    if (popover === null) missing.push("--glass-depth-popover");
    if (menu === null) missing.push("--glass-depth-menu");
    if (missing.length) {
        violations.push(
            `DT1: the tier-depth grade token(s) ${missing.join(", ")} are not declared in glass-deep.css — the ONE --glass-depth scalar maps onto the tier ladder via named per-band grades (zero new machinery)`,
        );
    }

    // DT2 — MONOTONE by prominence (overlay/menu HIGHER than content).
    if (content !== null && popover !== null && menu !== null) {
        facts.gradesInRange = [content, popover, menu].every((v) => v >= 0 && v <= 1);
        facts.gradesMonotone = content < popover && popover < menu;
        if (!facts.gradesInRange) {
            violations.push(
                `DT2: a tier-depth grade is outside [0,1] (content=${content}, popover=${popover}, menu=${menu}) — --glass-depth is a 0..1 LERP scalar`,
            );
        }
        if (!facts.gradesMonotone) {
            violations.push(
                `DT2: the tier-depth grades are NOT strictly increasing by prominence (content=${content} < popover=${popover} < menu=${menu} required) — overlay/menu rungs must default a HIGHER depth than content (menu > popover > button)`,
            );
        }
        if (!(content > 0)) {
            violations.push(
                `DT2: --glass-depth-content is ${content} — a deep content control at depth 0 collapses to the calm floating floor (no "deep" read); the content grade must be > 0`,
            );
        }
        if (!(menu <= 1)) {
            violations.push(
                `DT2: --glass-depth-menu is ${menu} — the deep register ceiling is depth 1 (the decided 16px); the menu grade must be ≤ 1`,
            );
        }
    }

    // DT3 — the tier-ladder MAP: each band sets --glass-depth from its grade. CSS rule
    // bodies carry no nested braces (gradients use `()`), so the innermost `sel { body }`
    // match is robust to the @layer wrapper (the definedControlFloor precedent). Only
    // rules whose body sets --glass-depth are the tier-map rules (the `.glass-deep`
    // floating re-point sets --glass-blur-floating, so it is NOT collected here).
    const depthRules = [];
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let rm;
    while ((rm = ruleRe.exec(glass))) {
        if (/--glass-depth\s*:/.test(rm[2])) depthRules.push({ sel: rm[1].trim(), body: rm[2] });
    }
    const bandRule = (clsRe) => depthRules.find((r) => clsRe.test(r.sel));
    const overlayRule = bandRule(/\.glass-overlay\b/);
    const floatingRule = bandRule(/\.glass-floating\b/);
    const contentRule = bandRule(/\.glass-(resting|quiet|wash|card)\b/);
    facts.overlayMapsMenu =
        !!overlayRule && /--glass-depth\s*:\s*var\(--glass-depth-menu\)/.test(overlayRule.body);
    facts.floatingMapsPopover =
        !!floatingRule && /--glass-depth\s*:\s*var\(--glass-depth-popover\)/.test(floatingRule.body);
    facts.contentMapsContent =
        !!contentRule && /--glass-depth\s*:\s*var\(--glass-depth-content\)/.test(contentRule.body);
    if (!facts.overlayMapsMenu) {
        violations.push(
            "DT3: no tier rule maps the .glass-overlay rung to `--glass-depth: var(--glass-depth-menu)` (glass/deep.css) — the overlay/menu band must default the highest deep grade",
        );
    }
    if (!facts.floatingMapsPopover) {
        violations.push(
            "DT3: no tier rule maps the .glass-floating rung to `--glass-depth: var(--glass-depth-popover)` — the popover band must default the mid deep grade",
        );
    }
    if (!facts.contentMapsContent) {
        violations.push(
            "DT3: no tier rule maps the content band (.glass-resting/.glass-quiet/.glass-wash/.glass-card) to `--glass-depth: var(--glass-depth-content)` — the content/button band must default the lowest deep grade (so menu > popover > button)",
        );
    }

    // DT4 (a) — no --glass-depth-setting tier rule reads var(--glass-blur-deep) OR
    // re-points a --glass-blur-* token (a base-tier deep leak proof:glass-depth D5
    // forbids; the map is a --glass-depth SCALAR default only).
    const leakRule = depthRules.find(
        (r) => /var\(--glass-blur-deep\)/.test(r.body) || /--glass-blur-[a-z]+\s*:/.test(r.body),
    );
    facts.noBlurLeak = !leakRule;
    if (leakRule) {
        violations.push(
            `DT4: a tier-depth map rule (${leakRule.sel}) reads var(--glass-blur-deep) or re-points a --glass-blur-* token — the map is a --glass-depth SCALAR default ONLY (a base-tier blur re-point is the deep-into-content leak proof:glass-depth D5 forbids; zero new machinery = no new blur recipe)`,
        );
    }

    // DT4 (b)+(c) — locate the deep LERP declaration across BOTH the token family
    // (:root, tokens/glass-deep.css) AND the glass monolith (.glass-deep, glass/deep.css)
    // and inspect its DECLARING SELECTOR. squish(deep) preserves the :root{} structure
    // the pre-fix / regression form uses; `glass` is already the squished monolith. The
    // non-nested `sel { body }` rule regex is robust to the @layer wrapper (the DT3 /
    // definedControlFloor precedent — CSS rule bodies carry no nested braces).
    const lerpRules = [];
    const combinedText = `${squish(deep)} ${glass}`;
    const lerpRuleRe = /([^{}]+)\{([^{}]*)\}/g;
    let lrm;
    while ((lrm = lerpRuleRe.exec(combinedText))) {
        if (/--glass-blur-deep-active-radius\s*:/.test(lrm[2])) {
            lerpRules.push({ sel: lrm[1].trim(), body: lrm[2] });
        }
    }
    const lerpRule = lerpRules[0];
    const deepActiveRadius = /--glass-blur-deep-active-radius\s*:\s*([^;]+);/.exec(
        lerpRule?.body ?? "",
    )?.[1] ?? "";
    // (b) load-bearing: the LERP reads var(--glass-depth) (else the grade is a dead knob).
    facts.deepRecipeReadsDepth = /var\(--glass-depth\)/.test(deepActiveRadius);
    if (!facts.deepRecipeReadsDepth) {
        violations.push(
            "DT4: the deep recipe (--glass-blur-deep-active-radius) does not read var(--glass-depth) — the tier-depth grade would be a DEAD KNOB (the deep blur must be driven by the scalar the map grades)",
        );
    }
    // (c) FREEZE-GUARD: the LERP reads the REGISTERED @property --glass-depth, whose var()
    // inside another custom property is eager-substituted with its COMPUTED value AT THE
    // DECLARING ELEMENT (CSS Properties & Values API). Declared at :root, --glass-depth is
    // its @property initial-value (1), so the LERP FREEZES at the depth-1 endpoint and every
    // deep surface paints the 16px ceiling regardless of tier grade (a deep button reads as
    // thick as a deep menu — the painted dead-knob). It MUST be declared on .glass-deep, the
    // tier-grade site, so it resolves per-element.
    const lerpSel = lerpRule?.sel ?? "";
    facts.lerpDeclaringSelector = lerpSel;
    const lerpAtRoot = /(^|[\s,{])(:root|html)\b/.test(lerpSel);
    facts.lerpAtConsumingElement = !!lerpSel && !lerpAtRoot && /\.glass-deep\b/.test(lerpSel);
    if (lerpRule && lerpAtRoot) {
        violations.push(
            `DT4: the deep LERP (--glass-blur-deep-active-radius) is declared at \`${lerpSel}\` (a :root/html block) — it reads the REGISTERED @property --glass-depth, which eager-substitutes to its initial-value (1) at :root, FREEZING the LERP at the depth-1 endpoint (every deep surface paints the 16px ceiling regardless of tier grade — the painted dead-knob). Declare it on \`.glass-deep\` (glass/deep.css), the tier-grade site, so --glass-depth resolves per-element`,
        );
    } else if (lerpRule && !facts.lerpAtConsumingElement) {
        violations.push(
            `DT4: the deep LERP (--glass-blur-deep-active-radius) is declared at \`${lerpSel}\`, not on \`.glass-deep\` — the LERP reading the REGISTERED @property --glass-depth must be declared at/below the tier-grade site so it resolves per-element (never frozen at the :root @property initial-value)`,
        );
    }

    // DT4 (d) NUMERIC LADDER — evaluate the LERP at the three grades from the ENDPOINTS
    // (floating depth-0 floor / deep depth-1 ceiling); the three resolved blur radii must
    // be STRICTLY increasing (a flat/reversed ladder — the deep endpoint == the floating
    // endpoint, or the grades collapsed — means the depth grade does not differentiate
    // thickness: menu > popover > button must PAINT). The device-free numeric mirror of the
    // painted-flat defect (distinct from the freeze-guard, which catches the :root scope).
    const numFrom = (re, text) => {
        const m = new RegExp(re).exec(text || "");
        return m ? Number(m[1]) : null;
    };
    const floatingRadius =
        numFrom(/--glass-blur-floating-radius\s*:\s*([0-9.]+)px/, stripCss(tokensGlassText || "")) ??
        13;
    const deepRadius = numFrom(/--glass-blur-deep-radius\s*:\s*([0-9.]+)px/, deep);
    if (deepRadius !== null && content !== null && popover !== null && menu !== null) {
        const lerp = (g) => floatingRadius + (deepRadius - floatingRadius) * g;
        const ladder = [lerp(content), lerp(popover), lerp(menu)];
        facts.depthBlurLadder = ladder;
        if (!(ladder[0] < ladder[1] && ladder[1] < ladder[2])) {
            violations.push(
                `DT4: the deep blur ladder evaluated at the three grades is NOT strictly increasing (content=${ladder[0].toFixed(2)}px, popover=${ladder[1].toFixed(2)}px, menu=${ladder[2].toFixed(2)}px) — a flat/reversed ladder means the depth grade does not differentiate thickness (the deep endpoint == the floating endpoint, or the grades collapsed); menu > popover > button must paint`,
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

// ── the consumer-band predicate (pure) — BG.W-GLASS-CONSUMER-BAND ─────────────
// The fill-tint CONSUMERS (Badge-glass · SelectableChip · IconChip-glass, via the
// `.glass-atom`/`.glass-chip` recipes) FOLD onto ONE shared per-instance PLATE recipe
// `--glass-fill-tinted` (tokens/glass.css) reading the `--glass-fill-tint`/`--glass-
// fill-strength` axis — instead of each carrying its own forked `color-mix(in oklab,
// …)` re-spell. The `.glass-atom` fork was worse than a duplicate: it mixed a FIXED
// `--glass-capsule-warm` cream regardless of the per-instance hue, so a `destructive`/
// `success`/`info` glass badge dropped its semantic tint. Three clauses:
//   C1 — `--glass-fill-tinted` is declared EXACTLY ONCE (the shared plate HOME) and
//        reads BOTH `--glass-fill-tint` AND `--glass-fill-strength` in an `in oklab`
//        color-mix (the data-hue-at-strength seam; a fixed-source or in-srgb form REDs).
//   C2 — BOTH `.glass-atom` and `.glass-chip` READ `var(--glass-fill-tinted)` (the
//        `background-image` plate layer) — the load-bearing fold.
//   C3 — the anti-fork bite: NEITHER recipe declares a forked per-instance tint token
//        (`--glass-atom-tinted`/`--glass-chip-tinted`) NOR an inline `color-mix(in oklab,
//        …--glass-fill-strength…)` re-spell — a re-introduced fork REDs.
// Born-RED at HEAD (the two forks + no shared token) -> GREEN at the fold.
export function consumerBandViolations(tokensCss, atomCss, chipCss) {
    const violations = [];
    const facts = {};
    const tokens = stripCss(tokensCss || "");
    const tokensSq = squish(tokens);
    const atom = stripCss(atomCss || "");
    const atomSq = squish(atom);
    const chip = stripCss(chipCss || "");
    const chipSq = squish(chip);

    // C1 — the shared plate token declared ONCE, reading BOTH axis legs in an oklab mix.
    const declCount = (tokens.match(/--glass-fill-tinted\s*:/g) || []).length;
    facts.plateDeclCount = declCount;
    if (declCount === 0) {
        violations.push(
            "C1: `--glass-fill-tinted` (the shared per-instance PLATE recipe) is NOT declared in tokens/glass.css — the fold home is missing; the two forked `--glass-atom-tinted`/`--glass-chip-tinted` re-spells cannot collapse onto ONE plate",
        );
    } else if (declCount > 1) {
        violations.push(
            `C1: \`--glass-fill-tinted\` is declared ${declCount} times — the shared plate is declared ONCE (a second declaration re-forks the recipe home)`,
        );
    }
    // The shared plate must read the data hue (`--glass-fill-tint`) AT the strength
    // (`--glass-fill-strength`) in an `in oklab` mix — the CORRECT data-hue seam. A
    // fixed-source form (the `.glass-atom` fork mixed `--glass-capsule-warm`) or an
    // in-srgb space breaks the fold's intent.
    const plateReadsAxis =
        /--glass-fill-tinted\s*:\s*color-mix\(\s*in\s+oklab\s*,\s*var\(--glass-fill-tint[^;]*var\(--glass-fill-strength/.test(
            tokensSq,
        );
    facts.plateReadsAxis = plateReadsAxis;
    if (declCount >= 1 && !plateReadsAxis) {
        violations.push(
            "C1: `--glass-fill-tinted` does not read `color-mix(in oklab, var(--glass-fill-tint …) var(--glass-fill-strength …), …)` — the shared plate must tint toward the per-instance DATA hue at the bounded strength (a fixed `--glass-capsule-warm` source, an in-srgb space, or a dropped strength leg breaks the fold: the data hue would never reach the plate)",
        );
    }

    // C2 — both recipes READ the shared plate as their `background-image` layer.
    const atomReadsPlate =
        /background-image\s*:\s*linear-gradient\(\s*var\(--glass-fill-tinted\)/.test(atomSq);
    facts.atomReadsPlate = atomReadsPlate;
    if (!atomReadsPlate) {
        violations.push(
            "C2: `.glass-atom` does not read `background-image: linear-gradient(var(--glass-fill-tinted) …)` — the atom must compose the SHARED plate (the fold), not a local re-spell",
        );
    }
    const chipReadsPlate =
        /background-image\s*:\s*linear-gradient\(\s*var\(--glass-fill-tinted\)/.test(chipSq);
    facts.chipReadsPlate = chipReadsPlate;
    if (!chipReadsPlate) {
        violations.push(
            "C2: `.glass-chip` does not read `background-image: linear-gradient(var(--glass-fill-tinted) …)` — the chip must compose the SHARED plate (the fold), not a local re-spell",
        );
    }

    // C3 — the anti-fork bite: NEITHER recipe re-declares a forked per-instance tint
    // token, NOR carries an inline `color-mix(in oklab, …--glass-fill-strength…)` fill
    // re-spell. A re-introduced fork (the exact class this wave collapses) REDs.
    const forkedTokens = [];
    if (/--glass-atom-tinted\s*:/.test(atom)) forkedTokens.push("--glass-atom-tinted");
    if (/--glass-chip-tinted\s*:/.test(chip)) forkedTokens.push("--glass-chip-tinted");
    facts.forkedTokens = forkedTokens;
    if (forkedTokens.length) {
        violations.push(
            `C3: forked per-instance tint token(s) survive (${forkedTokens.join(", ")}) — the fold DELETES these onto the shared \`--glass-fill-tinted\`; a re-declared fork is the N-pastes anti-pattern`,
        );
    }
    // An inline oklab color-mix that reads `--glass-fill-strength` (a re-spelled plate)
    // in either recipe is a fork even if the token name changed — scoped to the
    // strength-reading form so the unrelated `.glass-chip::after` bloom / `.accent-tone`
    // mixes are NOT caught.
    const respellRe = /color-mix\(\s*in\s+oklab\s*,[^;{}]*var\(--glass-fill-strength/g;
    const atomRespells = (atomSq.match(respellRe) || []).length;
    const chipRespells = (chipSq.match(respellRe) || []).length;
    facts.atomRespells = atomRespells;
    facts.chipRespells = chipRespells;
    if (atomRespells > 0) {
        violations.push(
            `C3: \`.glass-atom\` carries ${atomRespells} inline \`color-mix(in oklab, … var(--glass-fill-strength …))\` fill re-spell(s) — the plate compose lives ONCE in \`--glass-fill-tinted\`; a recipe re-spell reds`,
        );
    }
    if (chipRespells > 0) {
        violations.push(
            `C3: \`.glass-chip\` carries ${chipRespells} inline \`color-mix(in oklab, … var(--glass-fill-strength …))\` fill re-spell(s) — the plate compose lives ONCE in \`--glass-fill-tinted\`; a recipe re-spell reds`,
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
        !/--glass-accent|--glass-backdrop-hue|--glass-ambient-hue|--glass-specular-core/.test(boxShadow);
    if (boxShadowMatch && !facts.hairlineNeutral) {
        violations.push(
            "GD2: the resting hairline `box-shadow` is NOT neutral — it must read the RAW warm-cream `hsl(40 35% 92%)`, NEVER `--glass-specular-core`/`--glass-accent`/`--glass-ambient-hue`/`--glass-backdrop-hue` (the REFERENCE FENCE: the resting hairline stays NEUTRAL, prismatic reserved for WS6)",
        );
    }

    // GD3 — the backdrop-HUE sample seam (bounded, neutral default). BG.W-GLASS-
    // SIGNAL-TRUTH (M9) — the seam reads the REAL-writer channel `--glass-ambient-hue`
    // (the observer's live write), NOT the never-written `--glass-backdrop-hue`; ONE
    // hue channel, ONE writer. The strength is the companion `--glass-ambient-strength`.
    const coreMatch = /--glass-specular-core\s*:\s*([^;]*);/.exec(baseBlock);
    const coreVal = coreMatch ? coreMatch[1] : "";
    facts.backdropHueSeam =
        /--glass-ambient-hue\b/.test(coreVal) &&
        /--glass-ambient-strength\b/.test(coreVal);
    // the DEAD-CHANNEL fence: the seam must NOT read the never-written
    // `--glass-backdrop-hue`/`-strength` names (the M9 excision — a re-introduction reds).
    facts.noDeadHueChannel = !/--glass-backdrop-hue\b/.test(coreVal);
    if (!facts.backdropHueSeam) {
        violations.push(
            "GD3: `--glass-specular-core` does not fold the backdrop-HUE sample seam via the REAL-writer channel `var(--glass-ambient-hue) var(--glass-ambient-strength)` (BG.W-GLASS-SIGNAL-TRUTH M9 — ONE hue channel, ONE writer; the observer writes `--glass-ambient-hue`, so the seam must read it, not the never-written `--glass-backdrop-hue`)",
        );
    }
    if (!facts.noDeadHueChannel) {
        violations.push(
            "GD3: `--glass-specular-core` still reads the DEAD `--glass-backdrop-hue` channel (0 writers — the observer writes `--glass-ambient-hue`) — the M9 excision requires the dead name gone (a writer-LESS channel does not ship)",
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

// ── the glass-SIGNAL-TRUTH predicate (pure) — BG.W-GLASS-SIGNAL-TRUTH (NF.3) ────
// The dead glass adaptive-signal channels become writer-true or die (NO-MASKING-
// FALLBACK-EDICT §2a M6-M9). Four arms, all pure over the glass monolith
// (material.css + ladder.css, squished) + the observer's TS text:
//   ST1 (M6) — the `.glass-clear` MANDATORY scrim is a STATIC FLOOR the luma can
//              only LIFT (`calc(<floor>% + var(--glass-backdrop-luma) * <ramp>%)`)
//              and the DEAD `var(--glass-backdrop-luma, 0.5)` fallback is GONE — an
//              unwired clear plate paints the floor scrim, never `calc(0·40%) = 0%`.
//   ST2 (M9) — the catch-light seam reads the REAL-writer hue channel `--glass-
//              ambient-hue` (the observer's live write), NEVER the never-written
//              `--glass-backdrop-hue`; ONE hue channel, one writer.
//   ST3 (M8) — the observer stamps the WRITER-FIRED WITNESS on write: the
//              `data-backdrop-sampled` attribute + the paired `--glass-backdrop-
//              sampled: 1`, so a dead-observer≡calm-backdrop mask is observable.
//   ST4 (M7) — the band-driver canon is RECONCILED to ONE: the contradictory
//              "the clamp RETIRES the bucket as THE driver" claim is GONE from
//              ladder.css, and BOTH glass-fx.css + ladder.css record the ONE
//              decision (the bucket is the band driver, the clamp is the refinement).
// Born-RED on HEAD (the `, 0.5` fallback, the `--glass-backdrop-hue` seam, no witness
// stamp, the contradictory canon) → GREEN on the wave's edits.
export function glassSignalTruthViolations(glassCss, luminanceText, glassDockText) {
    const violations = [];
    const facts = {};
    const glass = squish(stripCss(glassCss || ""));
    // ST4 reads the canon COMMENTS (the reconcile is a documented decision), so keep
    // a comment-bearing copy squished-but-not-stripped for that arm alone.
    const glassWithComments = squish(glassCss || "");
    const js = luminanceText || "";

    // ── ST1 (M6) — the `.glass-clear` scrim static floor ─────────────────────────
    // Locate the `--glass-clear-scrim-strength` declaration (the block carrying it).
    const scrimMatch =
        /--glass-clear-scrim-strength\s*:\s*calc\(([^;]*)\)\s*;/.exec(glass);
    facts.scrimStrengthFound = !!scrimMatch;
    const scrimVal = scrimMatch ? scrimMatch[1] : "";
    // the STATIC-FLOOR form: floor% + luma * ramp% (a floor term the luma can only lift).
    facts.scrimHasStaticFloor =
        /--glass-clear-scrim-floor\b/.test(scrimVal) &&
        /--glass-clear-scrim-ramp\b/.test(scrimVal) &&
        /var\(--glass-backdrop-luma\)/.test(scrimVal);
    // the DEAD `, 0.5` (or any bare-numeric) fallback on the registered luma is GONE.
    facts.scrimNoDeadFallback = !/var\(--glass-backdrop-luma\s*,/.test(scrimVal);
    // the floor + ramp tokens are declared (a real static minimum + a real ramp).
    facts.scrimFloorDeclared = /--glass-clear-scrim-floor\s*:\s*\d/.test(glass);
    facts.scrimRampDeclared = /--glass-clear-scrim-ramp\s*:\s*\d/.test(glass);
    if (!facts.scrimStrengthFound) {
        violations.push(
            "ST1: could not locate `--glass-clear-scrim-strength: calc(…)` in the glass cascade — the `.glass-clear` MANDATORY scrim declaration (material.css) is the M6 edit site",
        );
    } else {
        if (!facts.scrimHasStaticFloor) {
            violations.push(
                "ST1: the `.glass-clear` scrim strength is not a STATIC FLOOR the luma can only LIFT — it must be `calc(var(--glass-clear-scrim-floor) + var(--glass-backdrop-luma) * var(--glass-clear-scrim-ramp))` (M6: an unwired clear plate paints the floor scrim, never `calc(0 * 40%) = 0%`)",
            );
        }
        if (!facts.scrimNoDeadFallback) {
            violations.push(
                "ST1: the `.glass-clear` scrim still carries a DEAD `var(--glass-backdrop-luma, <literal>)` fallback — the registered `@property` initial 0 is never guaranteed-invalid, so the fallback CANNOT fire (M6: collapse to bare `var(--glass-backdrop-luma)`, the floor term owns the unwired minimum)",
            );
        }
        if (!facts.scrimFloorDeclared || !facts.scrimRampDeclared) {
            violations.push(
                "ST1: the `--glass-clear-scrim-floor` (mandatory minimum) + `--glass-clear-scrim-ramp` (luma lift) tokens are not both declared with a numeric value — the static floor + the ramp must be real magnitudes",
            );
        }
    }

    // ── ST2 (M9) — the catch-light seam reads the REAL-writer hue channel ────────
    const coreMatch = /--glass-specular-core\s*:\s*([^;]*);/.exec(glass);
    const coreVal = coreMatch ? coreMatch[1] : "";
    facts.coreFound = !!coreMatch;
    facts.seamReadsAmbientHue =
        /--glass-ambient-hue\b/.test(coreVal) &&
        /--glass-ambient-strength\b/.test(coreVal);
    facts.seamNoDeadHue = !/--glass-backdrop-hue\b/.test(coreVal);
    if (!facts.coreFound) {
        violations.push(
            "ST2: could not locate the `--glass-specular-core` catch-light seam (material.css) — the M9 hue-channel edit site is absent",
        );
    } else {
        if (!facts.seamReadsAmbientHue) {
            violations.push(
                "ST2: the `--glass-specular-core` catch-light seam does not read the REAL-writer hue channel `var(--glass-ambient-hue) var(--glass-ambient-strength)` (M9: ONE hue channel, ONE writer — the observer writes `--glass-ambient-hue`)",
            );
        }
        if (!facts.seamNoDeadHue) {
            violations.push(
                "ST2: the `--glass-specular-core` seam still reads the DEAD `--glass-backdrop-hue` channel (0 writers — writer-LESS) — the M9 excision requires the dead name gone",
            );
        }
    }
    // the DEAD channel is GONE from the WHOLE glass cascade (no reader survives).
    facts.deadHueChannelGoneCascade = !/var\(--glass-backdrop-hue\b/.test(glass);
    if (!facts.deadHueChannelGoneCascade) {
        violations.push(
            "ST2: a `var(--glass-backdrop-hue)` read survives elsewhere in the glass cascade — the never-written channel has NO reachable writer and must not ship (M9)",
        );
    }

    // ── ST3 (M8) — the observer stamps the WRITER-FIRED WITNESS on write ─────────
    facts.observerFound = js.length > 0;
    // the witness stamp lives inside the `write(result)` fn — assert both the data-attr
    // AND the paired custom property are set (the two witness shapes the edict names).
    facts.witnessDataAttr =
        /setAttribute\(\s*["']data-backdrop-sampled["']/.test(js);
    facts.witnessCustomProp =
        /setProperty\(\s*["']--glass-backdrop-sampled["']\s*,\s*["']1["']\s*\)/.test(js);
    // the witness sits in the same write path as the real luma/hue writes (not a stub).
    facts.witnessInWritePath =
        /setProperty\(\s*["']--glass-backdrop-luma["']/.test(js) &&
        /setProperty\(\s*["']--glass-ambient-hue["']/.test(js);
    if (!facts.observerFound) {
        violations.push(
            "ST3: could not read the sampled-luminance observer (useGlassBackdropLuminance.ts) — the M8 writer-fired-witness edit site is absent",
        );
    } else {
        if (!facts.witnessDataAttr) {
            violations.push(
                "ST3: the observer does not stamp the `data-backdrop-sampled` witness attribute on write — a dead/silently-failed observer is otherwise indistinguishable from a calm backdrop (M8: the writer-fired witness must fire)",
            );
        }
        if (!facts.witnessCustomProp) {
            violations.push(
                "ST3: the observer does not set the paired `--glass-backdrop-sampled: 1` custom property on write — the witness pair (data-attr + custom prop) is the M8 fired-witness (a wired-but-never-written channel must be observable)",
            );
        }
        if (!facts.witnessInWritePath) {
            violations.push(
                "ST3: the witness stamp is not in the SAME `write()` path as the real `--glass-backdrop-luma`/`--glass-ambient-hue` writes — the witness must fire on the real write, not a decoupled stub",
            );
        }
    }

    // ── ST5 (M8 runtime completeness) — the live-gate CONSIDERS a resolvable field
    // canvas, not the data-attr/option ALONE ─────────────────────────────────────
    // The paint-DELTA caught the source-green witness NEVER firing at runtime: the
    // dock hands the DockStage aurora canvas but no `live` flag, so a data-attr-only
    // `isLive()` left the `sampleAnimated` LIVE path UNREACHABLE and the observer was
    // DEAD on the whole dock band (0 of 12 docks stamped the witness). A resolvable
    // field canvas IS the live signal — `isLive()` must reach `resolveSourceCanvas(
    // options.backgroundCanvas)` so a canvas-fed surface samples its field + fires the
    // witness. The device-free proxy for the paint-judge "the dock observer fires"
    // mustFix; a regression back to attr-only re-reds. Bounded to the `isLive` body so
    // the `sampleAnimated`'s own `resolveSourceCanvas` call cannot false-GREEN it.
    const isLiveBody = (() => {
        const idx = js.indexOf("function isLive");
        if (idx < 0) return "";
        const open = js.indexOf("{", idx);
        if (open < 0) return "";
        let depth = 1;
        let i = open + 1;
        for (; i < js.length && depth > 0; i++) {
            if (js[i] === "{") depth++;
            else if (js[i] === "}") depth--;
        }
        return js.slice(open + 1, i - 1);
    })();
    facts.isLiveFound = isLiveBody.length > 0;
    facts.liveConsidersCanvas = /resolveSourceCanvas\s*\(/.test(isLiveBody);
    if (facts.observerFound) {
        if (!facts.isLiveFound) {
            violations.push(
                "ST5: could not locate the observer's `isLive()` gate (useGlassBackdropLuminance.ts) — the live-path decision is the M8 witness-fires-on-the-dock edit site",
            );
        } else if (!facts.liveConsidersCanvas) {
            violations.push(
                "ST5: the observer's `isLive()` does not CONSIDER a resolvable field canvas (`resolveSourceCanvas(options.backgroundCanvas)`) — a surface handed (or auto-discovering) a live field canvas but no `live` flag (the dock) never enters the `sampleAnimated` live path, so the observer is DEAD on the whole dock band (the paint-DELTA ST3: 0 of 12 docks fired the writer-fired witness). A resolvable field canvas IS the live signal.",
            );
        }
    }

    // ── ST6 (M8 runtime, part 2) — the loop ARMS on live INTENT, not a RESOLVED
    // canvas at the single mount instant ─────────────────────────────────────────
    // The ST5 fix (isLive considers a resolvable canvas) was NECESSARY but not
    // SUFFICIENT: `isLive()` is evaluated ONCE at the mount `watch` (flush:post), when
    // the DockStage aurora `<canvas>` is still unresolved (the field paints a beat AFTER
    // the surface), so `isLive()===false`, `loop.start()` never fires, and — with NO
    // watcher on the getter's resolution — the observer stays DEAD forever (the paint-
    // DELTA re-open: the M8/ST5 fix did NOT change the paint; 0 of 12 docks fired). The
    // ARM must key off live INTENT (a PROVIDED source signals live NOW, even before it
    // resolves); the running loop's per-tick `isLive()` re-check then picks up the field
    // the instant it paints. This arm asserts a `wantsLiveLoop()` INTENT predicate exists,
    // treats a provided `options.backgroundCanvas` as intent WITHOUT requiring
    // resolveSourceCanvas to return non-null, AND is the predicate the loop-arm
    // (`applyMotionState`'s `loop.start()`) reads — not the resolution-requiring
    // `isLive()`. Born-RED at HEAD (no wantsLiveLoop; the arm reads isLive()).
    const braceBody = (marker) => {
        const idx = js.indexOf(marker);
        if (idx < 0) return "";
        const open = js.indexOf("{", idx);
        if (open < 0) return "";
        let depth = 1;
        let i = open + 1;
        for (; i < js.length && depth > 0; i++) {
            if (js[i] === "{") depth++;
            else if (js[i] === "}") depth--;
        }
        return js.slice(open + 1, i - 1);
    };
    // strip JS comments so a docstring mentioning `isLive()` / `wantsLiveLoop()` cannot
    // false-signal the code-shape detectors (the gate analyzes CODE, not commentary).
    const stripJs = (s) =>
        s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const wantsBody = stripJs(braceBody("function wantsLiveLoop"));
    const applyBody = stripJs(braceBody("function applyMotionState"));
    facts.wantsLiveFound = wantsBody.length > 0;
    // the intent predicate treats a PROVIDED source as live WITHOUT requiring
    // resolution — a null-check on `options.backgroundCanvas` (`!= null`/`!== undefined`),
    // NOT `resolveSourceCanvas(options.backgroundCanvas)` (which requires the canvas to
    // resolve THIS instant — the exact mount-race that left the band dead).
    facts.wantsLiveReadsProvidedSource =
        /options\.backgroundCanvas\s*!=\s*null/.test(wantsBody) ||
        /options\.backgroundCanvas\s*!==?\s*undefined/.test(wantsBody);
    // the loop ARM (`applyMotionState`) reads the INTENT predicate, and NOT the
    // resolution-requiring `isLive()` at the `loop.start()` guard.
    facts.armFound = applyBody.length > 0;
    facts.armReadsIntent = /wantsLiveLoop\s*\(/.test(applyBody);
    facts.armDropsIsLive = !/isLive\s*\(/.test(applyBody);
    if (facts.observerFound) {
        if (!facts.wantsLiveFound) {
            violations.push(
                "ST6: the observer has NO `wantsLiveLoop()` INTENT predicate — the loop arms off `isLive()` at the single mount instant (when the DockStage aurora canvas is still unresolved), so `loop.start()` never fires and the observer is DEAD on the whole dock band (the paint-DELTA re-open: the M8/ST5 fix did NOT change the paint, 0 of 12 docks fired). Add a `wantsLiveLoop()` that treats a PROVIDED source as live intent.",
            );
        } else if (!facts.wantsLiveReadsProvidedSource) {
            violations.push(
                "ST6: `wantsLiveLoop()` does not treat a PROVIDED `options.backgroundCanvas` as live intent (a `!= null`/`!== undefined` provided-source check) — it must arm the loop even before the field canvas RESOLVES (the aurora `<canvas>` mounts a beat after the surface); requiring `resolveSourceCanvas() !== null` at mount is the exact mount-race that left the dock band dead.",
            );
        }
        if (!facts.armFound) {
            violations.push(
                "ST6: could not locate the loop-arm `applyMotionState()` — the `loop.start()` decision is the M8-runtime edit site (it must read `wantsLiveLoop()`)",
            );
        } else if (!facts.armReadsIntent || !facts.armDropsIsLive) {
            violations.push(
                "ST6: the loop-arm `applyMotionState()` does not gate `loop.start()` on `wantsLiveLoop()` (or still reads the resolution-requiring `isLive()`) — the arm must key off live INTENT so the loop starts even when the field canvas resolves post-mount; the per-tick `isLive()` re-check inside the loop is the only correct `isLive()` reader.",
            );
        }
    }

    // ── ST7 (M8 runtime, part 3) — the observer is default-ON: the `autoLuminance`
    // boolean prop defaults TRUE via `withDefaults`, NOT a bare optional boolean ────
    // The paint-DELTA's BLOCKING mustFix: 0 of 12 docks fired the witness because the
    // dock guarded the observer on `props.autoLuminance !== false` while `autoLuminance`
    // was a bare optional `boolean` prop with NO `withDefaults` default. Vue's
    // BOOLEAN-PROP CASTING resolves an ABSENT `boolean`-typed prop to `false` (NOT
    // `undefined`), so `false !== false` → the sampled-luminance observer was NEVER wired
    // on any default dock (the whole adaptive-luminance band dead library-wide — ST5/ST6
    // source-green but never REACHED at runtime). The fix makes the default TRUE via
    // `withDefaults(defineProps<…>(), { autoLuminance: true })` so an unpassed dock is
    // default-ON while `:auto-luminance="false"` still opts out. This arm is the
    // device-free lock: the observer must be wired AND the boolean default must be
    // explicitly true. Born-RED at HEAD (bare `defineProps` + the `!== false` guard).
    // Run ST7 only when a dock text is PASSED (the real gate + the dedicated ST7 bites);
    // the ST1-ST6 self-test invocations omit the arg (undefined) and skip ST7 — a
    // `readFile()` that returns "" (an ABSENT GlassDock.vue) still fires ST7.
    if (glassDockText !== undefined) {
        const dock = glassDockText || "";
        facts.dockFound = dock.length > 0;
        facts.dockWiresObserver = /useGlassBackdropLuminance\s*\(/.test(dock);
        facts.autoLuminanceDefaultsTrue =
            /withDefaults\s*\(\s*defineProps\b/.test(dock) &&
            /autoLuminance\s*:\s*true\b/.test(dock);
        if (!facts.dockFound) {
            violations.push(
                "ST7: could not read GlassDock.vue — the dock observer default-ON wiring is the M8 blocking-mustFix edit site (the paint-DELTA: 0 of 12 docks fired the witness)",
            );
        } else {
            if (!facts.dockWiresObserver) {
                violations.push(
                    "ST7: GlassDock.vue does not wire `useGlassBackdropLuminance(` — the dock is the observer's sole binary consumer (H3 arm a); an unwired dock is a dead adaptive-luminance band",
                );
            }
            if (!facts.autoLuminanceDefaultsTrue) {
                violations.push(
                    "ST7: `autoLuminance` does not default TRUE via `withDefaults(defineProps<…>(), { autoLuminance: true })` — a bare optional `boolean` prop guarded by `props.autoLuminance !== false` is a DEAD binding: Vue's boolean-prop CASTING resolves an ABSENT `boolean` prop to `false` (NOT `undefined`), so `false !== false` never wires the observer (the paint-DELTA: 0 of 12 docks stamped the witness — the whole dock adaptive-luminance band dead library-wide). Set the default explicitly true.",
                );
            }
        }
    }

    // ── ST4 (M7) — the band-driver canon reconciled to ONE ───────────────────────
    // the contradictory "the clamp RETIRES the bucket as THE driver" claim is GONE.
    facts.noRetiresBucketAsDriver =
        !/RETIRES the discrete `?@container[^]*?bucket as the strength\s*driver/i.test(
            glassWithComments,
        ) && !/clamp subsumes it/i.test(glassWithComments);
    // the ONE reconciled decision is recorded (the band-driver decision marker present).
    facts.bandDriverRecorded =
        /BG\.W-GLASS-SIGNAL-TRUTH \(M7\)/.test(glassWithComments) &&
        /BAND\s*DRIVER/i.test(glassWithComments);
    if (!facts.noRetiresBucketAsDriver) {
        violations.push(
            "ST4: the contradictory canon `\"the continuous clamp RETIRES the @container bucket as THE strength driver\"` still stands (glass/ladder.css) — the M7 band-driver decision reconciles to ONE (the bucket is the band driver, the clamp is the refinement); the double-ownership claim must go",
        );
    }
    if (!facts.bandDriverRecorded) {
        violations.push(
            "ST4: the M7 band-driver decision is not recorded — the reconciled ONE text (the declarative bucket IS the BAND DRIVER, the continuous luma clamp is the refinement where a writer fires) must be documented with the `BG.W-GLASS-SIGNAL-TRUTH (M7)` marker",
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
    const consumerBand = consumerBandViolations(
        readFile(TOKENS_GLASS_FILE),
        readFile(GLASS_ATOM_FILE),
        readFile(GLASS_CHIP_FILE),
    );
    const safari = safariBlurVarViolations(readFile(VITE_STYLE_ASSETS));
    const defined = definedControlFloorViolations(glassMonolith, tokensMonolith);
    const dynamics = glassDynamicsViolations(glassMonolith, readFile(SPECULAR_POINTER_FILE));
    const signalTruth = glassSignalTruthViolations(
        glassMonolith,
        readFile(BACKDROP_LUMINANCE_FILE),
        readFile(GLASSDOCK_FILE),
    );
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
    const depthTier = depthTierViolations(readFile(GLASS_DEEP_FILE), glassMonolith, tokensMonolith);
    // the self-test bites run EVERY run (the "proven every run" discipline) — a
    // bite that loses its teeth REDs the gate, so the anti-gameability arm can
    // never silently rot.
    const biteFails = selfTest();
    return {
        violations: [
            ...decide.violations,
            ...glassFill.violations,
            ...consumerBand.violations,
            ...safari.violations,
            ...defined.violations,
            ...dynamics.violations,
            ...signalTruth.violations,
            ...reversal.violations,
            ...cornerBackplate.violations,
            ...refractWebgl.violations,
            ...depthTier.violations,
            ...biteFails,
        ],
        facts: {
            deepGlassDecided: decide.facts,
            glassFillHome: glassFill.facts,
            consumerBand: consumerBand.facts,
            safariBlurVar: safari.facts,
            definedControlFloor: defined.facts,
            glassDynamics: dynamics.facts,
            glassSignalTruth: signalTruth.facts,
            darkArmColorReversal: reversal.facts,
            cornerBackplate: cornerBackplate.facts,
            refractWebgl: refractWebgl.facts,
            depthTier: depthTier.facts,
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

    // ── consumer-band bites (C1/C2/C3) — BG.W-GLASS-CONSUMER-BAND ──────────────
    const goodTokens =
        ":root { --glass-fill-tinted: color-mix(in oklab, var(--glass-fill-tint, oklch(0.9 0.05 75 / 0)) var(--glass-fill-strength, 0%), oklch(0.9 0.05 75 / 0)); }";
    const goodAtom =
        ".glass-atom[data-surface=\"glass\"] { background-image: linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted)); }";
    const goodChip =
        ".glass-chip { background-image: linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted)); }";
    // sanity — the GREEN triple must pass (a false-RED detector is as bad as a
    // toothless one).
    if (consumerBandViolations(goodTokens, goodAtom, goodChip).violations.length !== 0) {
        fails.push(
            "self-test C: the GREEN consumer-band triple (shared plate + both recipes reading it, no fork) was FLAGGED (the detector false-REDs a correct fold)",
        );
    }
    // bite C1a — a MISSING shared plate token reds home-missing.
    if (consumerBandViolations("/* no plate */", goodAtom, goodChip).violations.length === 0) {
        fails.push(
            "self-test C1: a tokens cascade with NO `--glass-fill-tinted` was NOT flagged (the shared-plate-missing detector has no teeth)",
        );
    }
    // bite C1b — a DOUBLED shared plate reds declared-once.
    if (consumerBandViolations(goodTokens + " " + goodTokens, goodAtom, goodChip).violations.length === 0) {
        fails.push(
            "self-test C1: a DOUBLED `--glass-fill-tinted` was NOT flagged (the declared-once detector has no teeth)",
        );
    }
    // bite C1c — the `.glass-atom` FORK shape (a fixed `--glass-capsule-warm` source
    // that DROPS the per-instance hue) reds the axis-read: the plate must tint toward
    // `--glass-fill-tint`, not a fixed warm cream.
    const fixedSourcePlate =
        ":root { --glass-fill-tinted: color-mix(in oklab, var(--glass-capsule-warm) calc(var(--atom-tint-floor) + var(--glass-fill-strength)), oklch(0.9 0.05 75 / 0)); }";
    if (consumerBandViolations(fixedSourcePlate, goodAtom, goodChip).violations.length === 0) {
        fails.push(
            "self-test C1: a shared plate reading a FIXED `--glass-capsule-warm` source (the `.glass-atom` fork that dropped the data hue) was NOT flagged (the data-hue-reads-axis detector has no teeth)",
        );
    }
    // bite C1d — an in-srgb (not oklab) plate reds the perceptual-family fence.
    const srgbPlate =
        ":root { --glass-fill-tinted: color-mix(in srgb, var(--glass-fill-tint) var(--glass-fill-strength), oklch(0.9 0.05 75 / 0)); }";
    if (consumerBandViolations(srgbPlate, goodAtom, goodChip).violations.length === 0) {
        fails.push(
            "self-test C1: an in-srgb `--glass-fill-tinted` plate was NOT flagged (the oklab-family detector has no teeth)",
        );
    }
    // bite C2a — a recipe NOT reading the shared plate (a bare fill) reds the fold.
    const bareAtom = ".glass-atom[data-surface=\"glass\"] { background-image: none; }";
    if (consumerBandViolations(goodTokens, bareAtom, goodChip).violations.length === 0) {
        fails.push(
            "self-test C2: a `.glass-atom` NOT reading `var(--glass-fill-tinted)` was NOT flagged (the recipes-read-the-plate detector has no teeth)",
        );
    }
    // bite C3a — a re-introduced forked `--glass-atom-tinted` token reds the anti-fork.
    const forkedAtom =
        ".glass-atom { --glass-atom-tinted: color-mix(in oklab, var(--glass-capsule-warm) var(--glass-fill-strength), oklch(0.9 0.05 75 / 0)); background-image: linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted)); }";
    if (consumerBandViolations(goodTokens, forkedAtom, goodChip).violations.length === 0) {
        fails.push(
            "self-test C3: a re-declared forked `--glass-atom-tinted` token was NOT flagged (the anti-fork detector has no teeth)",
        );
    }
    // bite C3b — an inline `color-mix(in oklab, … --glass-fill-strength …)` re-spell
    // in a recipe (even under a renamed token) reds the anti-fork.
    const respellChip =
        ".glass-chip { --x: color-mix(in oklab, var(--glass-fill-tint) var(--glass-fill-strength), oklch(0.9 0.05 75 / 0)); background-image: linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted)); }";
    if (consumerBandViolations(goodTokens, goodAtom, respellChip).violations.length === 0) {
        fails.push(
            "self-test C3: an inline strength-reading `color-mix(in oklab, …)` fill re-spell in `.glass-chip` was NOT flagged (the inline-respell detector has no teeth)",
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
        " --glass-specular-core: color-mix( in oklab, color-mix( in oklab, hsl(40 35% 92%), var(--glass-accent) var(--glass-accent-strength) ), var(--glass-ambient-hue) var(--glass-ambient-strength) );" +
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
    // bite GD3 (M9) — a seam reading the DEAD `--glass-backdrop-hue` channel must flag.
    const deadHueSeam = goodDynGlass.replace(
        "var(--glass-ambient-hue) var(--glass-ambient-strength)",
        "var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%)",
    );
    if (!glassDynamicsViolations(deadHueSeam, goodDynJs).violations.some((v) => /GD3/.test(v))) {
        fails.push(
            "self-test GD3: a seam reading the DEAD `--glass-backdrop-hue` channel (0 writers) was NOT flagged (the M9 real-writer-channel fence has no teeth)",
        );
    }
    // bite GD3 — the seam ABSENT (core carries no --glass-ambient-hue fold) must flag.
    const noSeam = goodDynGlass.replace(
        ", var(--glass-ambient-hue) var(--glass-ambient-strength) )",
        " )",
    );
    if (!glassDynamicsViolations(noSeam, goodDynJs).violations.some((v) => /GD3/.test(v))) {
        fails.push(
            "self-test GD3: a core with NO ambient-hue fold was NOT flagged (the seam-present detector has no teeth)",
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

    // ── signal-truth bites (ST1-ST4) — BG.W-GLASS-SIGNAL-TRUTH (NF.3) ─────────────
    const goodSignalGlass =
        "@layer components { .glass-clear {" +
        " --glass-clear-scrim-floor: 12%; --glass-clear-scrim-ramp: 28%;" +
        " --glass-clear-scrim-strength: calc( var(--glass-clear-scrim-floor) + var(--glass-backdrop-luma) * var(--glass-clear-scrim-ramp) ); }" +
        " .glass-material::before {" +
        " --glass-specular-core: color-mix( in oklab, color-mix( in oklab, hsl(40 35% 92%), var(--glass-accent) var(--glass-accent-strength) ), var(--glass-ambient-hue) var(--glass-ambient-strength) ); }" +
        " /* BG.W-GLASS-SIGNAL-TRUTH (M7) — the declarative bucket IS the BAND DRIVER; the continuous luma clamp is the refinement where a writer fires. */ }";
    const goodWantsLive =
        ' function wantsLiveLoop() { if (options.live !== undefined) return options.live;' +
        ' if (target.value?.dataset.glassSample === "live") return true;' +
        ' if (options.backgroundCanvas != null) return true;' +
        ' return resolveSourceCanvas(undefined) !== null; }';
    const goodApplyMotion =
        ' function applyMotionState() { prefersReduced = prmMql.matches;' +
        ' if (prefersReduced) { loop.stop(); sampleNow(); }' +
        ' else if (wantsLiveLoop()) { loop.start(); } }';
    const goodSignalJs =
        'function isLive() { if (options.live !== undefined) return options.live;' +
        ' if (target.value?.dataset.glassSample === "live") return true;' +
        ' return resolveSourceCanvas(options.backgroundCanvas) !== null; }' +
        goodWantsLive +
        goodApplyMotion +
        ' function write(result) { const el = target.value; if (!el) return;' +
        ' el.style.setProperty("--glass-backdrop-luma", result.luma.toFixed(3));' +
        ' el.style.setProperty("--glass-ambient-hue", result.ambientHue);' +
        ' el.setAttribute("data-backdrop-sampled", "");' +
        ' el.style.setProperty("--glass-backdrop-sampled", "1"); }';
    // sanity — the GOOD fixture must be CLEAN (else a bite could false-pass).
    if (glassSignalTruthViolations(goodSignalGlass, goodSignalJs).violations.length !== 0) {
        fails.push(
            "self-test signal-truth: the synthetic GOOD fixture is NOT clean (the predicate over-fires — a real bite could false-pass): " +
                glassSignalTruthViolations(goodSignalGlass, goodSignalJs).violations.join(" | "),
        );
    }
    // bite ST1 — the DEAD `var(--glass-backdrop-luma, 0.5)` fallback must flag.
    const deadScrimFallback = goodSignalGlass.replace(
        "--glass-clear-scrim-strength: calc( var(--glass-clear-scrim-floor) + var(--glass-backdrop-luma) * var(--glass-clear-scrim-ramp) )",
        "--glass-clear-scrim-strength: calc( var(--glass-backdrop-luma, 0.5) * 40% )",
    );
    if (!glassSignalTruthViolations(deadScrimFallback, goodSignalJs).violations.some((v) => /ST1/.test(v))) {
        fails.push(
            "self-test ST1: a `.glass-clear` scrim with the DEAD `var(--glass-backdrop-luma, 0.5)` fallback (no static floor) was NOT flagged (the M6 static-floor fence has no teeth)",
        );
    }
    // bite ST2 — a seam reading the DEAD `--glass-backdrop-hue` channel must flag.
    const deadSignalHue = goodSignalGlass.replace(
        "var(--glass-ambient-hue) var(--glass-ambient-strength)",
        "var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%)",
    );
    if (!glassSignalTruthViolations(deadSignalHue, goodSignalJs).violations.some((v) => /ST2/.test(v))) {
        fails.push(
            "self-test ST2: a catch-light seam reading the DEAD `--glass-backdrop-hue` channel (0 writers) was NOT flagged (the M9 real-writer-channel fence has no teeth)",
        );
    }
    // bite ST3 — an observer that does NOT stamp the witness must flag.
    const noWitnessJs = goodSignalJs
        .replace('el.setAttribute("data-backdrop-sampled", "");', "")
        .replace('el.style.setProperty("--glass-backdrop-sampled", "1");', "");
    if (!glassSignalTruthViolations(goodSignalGlass, noWitnessJs).violations.some((v) => /ST3/.test(v))) {
        fails.push(
            "self-test ST3: an observer that does NOT stamp the `data-backdrop-sampled`/`--glass-backdrop-sampled:1` witness was NOT flagged (the M8 writer-fired-witness fence has no teeth)",
        );
    }
    // bite ST4 — the contradictory "clamp RETIRES the bucket as THE driver" claim must flag.
    const contradictoryCanon = goodSignalGlass.replace(
        "/* BG.W-GLASS-SIGNAL-TRUTH (M7) — the declarative bucket IS the BAND DRIVER; the continuous luma clamp is the refinement where a writer fires. */",
        "/* This RETIRES the discrete @container --glass-backdrop: light bucket as the strength driver — the continuous calc subsumes it. */",
    );
    if (!glassSignalTruthViolations(contradictoryCanon, goodSignalJs).violations.some((v) => /ST4/.test(v))) {
        fails.push(
            "self-test ST4: the contradictory `\"clamp RETIRES the bucket as THE driver\"` canon (the double-ownership claim) was NOT flagged (the M7 band-driver reconcile fence has no teeth)",
        );
    }

    // bite ST5 — an `isLive()` gate that does NOT consider a resolvable canvas (the
    // attr-only form that left the whole dock band a DEAD observer) must flag.
    const attrOnlyLiveJs = goodSignalJs.replace(
        " return resolveSourceCanvas(options.backgroundCanvas) !== null; }",
        " return false; }",
    );
    if (!glassSignalTruthViolations(goodSignalGlass, attrOnlyLiveJs).violations.some((v) => /ST5/.test(v))) {
        fails.push(
            "self-test ST5: an `isLive()` that does NOT reach `resolveSourceCanvas(options.backgroundCanvas)` (the attr-only form that left a canvas-fed dock's `sampleAnimated` path unreachable → the dead-observer band) was NOT flagged (the M8 runtime-completeness fence has no teeth)",
        );
    }

    // bite ST6-missing — an observer with NO `wantsLiveLoop` predicate (the HEAD form,
    // where the arm keys off the un-resolved-at-mount `isLive()`) must flag.
    const noIntentJs = goodSignalJs
        .replace(goodWantsLive, "")
        .replace(
            "else if (wantsLiveLoop()) { loop.start(); }",
            "else if (isLive()) { loop.start(); }",
        );
    if (!glassSignalTruthViolations(goodSignalGlass, noIntentJs).violations.some((v) => /ST6/.test(v))) {
        fails.push(
            "self-test ST6: an observer with NO `wantsLiveLoop()` intent predicate + an `applyMotionState` that arms off `isLive()` (the HEAD mount-race form that left 0 of 12 docks firing) was NOT flagged (the M8-runtime loop-arm fence has no teeth)",
        );
    }
    // bite ST6-arm — a `wantsLiveLoop` present but the loop-arm STILL reads the
    // resolution-requiring `isLive()` must flag (the arm keyed off the wrong predicate).
    const armIsLiveJs = goodSignalJs.replace(
        "else if (wantsLiveLoop()) { loop.start(); }",
        "else if (isLive()) { loop.start(); }",
    );
    if (!glassSignalTruthViolations(goodSignalGlass, armIsLiveJs).violations.some((v) => /ST6/.test(v))) {
        fails.push(
            "self-test ST6: an `applyMotionState()` that arms `loop.start()` off `isLive()` rather than `wantsLiveLoop()` (the resolution-requiring predicate at the single mount instant) was NOT flagged (the arm-reads-intent fence has no teeth)",
        );
    }
    // bite ST6-intent — a `wantsLiveLoop` that does NOT treat a provided source as
    // intent (drops the `options.backgroundCanvas != null` check) must flag.
    const noProvidedCheckJs = goodSignalJs.replace(
        " if (options.backgroundCanvas != null) return true;",
        "",
    );
    if (!glassSignalTruthViolations(goodSignalGlass, noProvidedCheckJs).violations.some((v) => /ST6/.test(v))) {
        fails.push(
            "self-test ST6: a `wantsLiveLoop()` that does NOT treat a PROVIDED `options.backgroundCanvas` as live intent (only `resolveSourceCanvas` which requires resolution) was NOT flagged (the provided-source-is-intent fence has no teeth)",
        );
    }

    // ── ST7 bites — the dock observer default-ON wiring (the paint-DELTA blocking fix) ─
    // the GOOD dock: wires the observer AND defaults `autoLuminance` true via withDefaults.
    const goodSignalDock =
        "const props = withDefaults(defineProps<DockProps>(), { autoLuminance: true });" +
        " if (props.autoLuminance !== false) { useGlassBackdropLuminance(dockEl, { backgroundCanvas: () => props.backgroundCanvas }); }";
    // sanity — the GOOD dock fixture must be CLEAN under ST7.
    if (glassSignalTruthViolations(goodSignalGlass, goodSignalJs, goodSignalDock).violations.some((v) => /ST7/.test(v))) {
        fails.push(
            "self-test ST7: the synthetic GOOD dock (withDefaults({autoLuminance:true}) + wired observer) was FLAGGED (the detector false-REDs a correct default-ON dock)",
        );
    }
    // bite ST7-cast — the HEAD form (bare `defineProps` + the `!== false` guard, no
    // withDefaults default) is the Vue boolean-cast-false dead binding — must flag.
    const castTrapDock =
        "const props = defineProps<DockProps>();" +
        " if (props.autoLuminance !== false) { useGlassBackdropLuminance(dockEl, { backgroundCanvas: () => props.backgroundCanvas }); }";
    if (!glassSignalTruthViolations(goodSignalGlass, goodSignalJs, castTrapDock).violations.some((v) => /ST7/.test(v))) {
        fails.push(
            "self-test ST7: the HEAD boolean-cast-false form (bare `defineProps<DockProps>()` + `props.autoLuminance !== false`, NO `withDefaults({autoLuminance:true})`) was NOT flagged (the M8 blocking-mustFix dead-guard fence has no teeth — this is the exact state that left 0 of 12 docks firing)",
        );
    }
    // bite ST7-unwired — a dock that does NOT wire the observer at all must flag.
    const unwiredDock =
        "const props = withDefaults(defineProps<DockProps>(), { autoLuminance: true });";
    if (!glassSignalTruthViolations(goodSignalGlass, goodSignalJs, unwiredDock).violations.some((v) => /ST7/.test(v))) {
        fails.push(
            "self-test ST7: a dock that does NOT call `useGlassBackdropLuminance(` was NOT flagged (the observer-wired fence has no teeth)",
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

    // ── depth-tier bites (BG.W-GLASS-DEPTH-TIER) ────────────────────────────────
    // The endpoints + grades live at :root (tokens/glass-deep.css); the deep LERP is
    // computed at the CONSUMING .glass-deep rule (glass/deep.css) — the freeze-fix.
    const goodDeepGrades =
        "DEEP-GLASS-DECIDED: retired-at-16px-cost-0B\n:root { " +
        "--glass-blur-deep-radius: 16px; " +
        "--glass-depth-content: 0.35; --glass-depth-popover: 0.7; --glass-depth-menu: 1; }";
    const goodDepthMap =
        "@layer components { .glass-deep { " +
        "--glass-blur-deep-active-radius: calc((13px + 3px * var(--glass-depth)) * var(--glass-level)); " +
        "--glass-blur-floating: var(--glass-blur-deep); } " +
        ":where(.glass-overlay) { --glass-depth: var(--glass-depth-menu); } " +
        ":where(.glass-floating) { --glass-depth: var(--glass-depth-popover); } " +
        ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-depth: var(--glass-depth-content); } }";
    const goodDeepTokens = ":root { --glass-blur-floating-radius: 13px; }";
    // positive: the well-formed grade table + tier map + LERP-on-.glass-deep must PASS clean.
    if (depthTierViolations(goodDeepGrades, goodDepthMap, goodDeepTokens).violations.length !== 0) {
        fails.push(
            "self-test depth-tier: the well-formed grade+map fixture unexpectedly RED — " +
                depthTierViolations(goodDeepGrades, goodDepthMap, goodDeepTokens).violations.join(" | "),
        );
    }
    // bite DT1 — a missing grade token must flag.
    const missingGrade = goodDeepGrades.replace("--glass-depth-popover: 0.7; ", "");
    if (!depthTierViolations(missingGrade, goodDepthMap).violations.some((v) => /DT1/.test(v))) {
        fails.push("self-test DT1: a missing --glass-depth-popover grade was NOT flagged");
    }
    // bite DT2 — a flat map (content == menu, no gradient) must flag not-increasing.
    const flatGrades = goodDeepGrades.replace("--glass-depth-menu: 1;", "--glass-depth-menu: 0.35;");
    if (!depthTierViolations(flatGrades, goodDepthMap).violations.some((v) => /DT2/.test(v))) {
        fails.push("self-test DT2: a flat (content==menu) grade table was NOT flagged (no prominence gradient)");
    }
    // bite DT2 — a reversed map (content > menu) must flag.
    const reversedGrades = goodDeepGrades
        .replace("--glass-depth-content: 0.35;", "--glass-depth-content: 1;")
        .replace("--glass-depth-menu: 1;", "--glass-depth-menu: 0.35;");
    if (!depthTierViolations(reversedGrades, goodDepthMap).violations.some((v) => /DT2/.test(v))) {
        fails.push("self-test DT2: a reversed (content>menu) grade table was NOT flagged");
    }
    // bite DT3 — a glass cascade with grades but NO tier map must flag.
    const noMap = "@layer components { .glass-deep { --glass-blur-floating: var(--glass-blur-deep); } }";
    if (!depthTierViolations(goodDeepGrades, noMap).violations.some((v) => /DT3/.test(v))) {
        fails.push("self-test DT3: a missing tier-ladder map (grades but no --glass-depth rungs) was NOT flagged");
    }
    // bite DT4 — a tier-map rule that re-points a base-tier blur to the deep family
    // (the deep-into-content leak proof:glass-depth D5 forbids) must flag.
    const leakMap = goodDepthMap.replace(
        ":where(.glass-overlay) { --glass-depth: var(--glass-depth-menu); }",
        ":where(.glass-overlay) { --glass-depth: var(--glass-depth-menu); --glass-blur-overlay: var(--glass-blur-deep); }",
    );
    if (!depthTierViolations(goodDeepGrades, leakMap).violations.some((v) => /DT4/.test(v))) {
        fails.push("self-test DT4: a tier-map rule leaking var(--glass-blur-deep) was NOT flagged (the D5 fence has no teeth)");
    }
    // bite DT4 — a deep recipe that drops var(--glass-depth) (the grade a dead knob) must flag.
    const deadKnobMap = goodDepthMap.replace(
        "--glass-blur-deep-active-radius: calc((13px + 3px * var(--glass-depth)) * var(--glass-level));",
        "--glass-blur-deep-active-radius: calc(16px * var(--glass-level));",
    );
    if (!depthTierViolations(goodDeepGrades, deadKnobMap, goodDeepTokens).violations.some((v) => /DT4/.test(v))) {
        fails.push("self-test DT4: a deep recipe that drops var(--glass-depth) (a dead-knob grade) was NOT flagged");
    }
    // bite DT4-FREEZE — the deep LERP declared at :root (where the REGISTERED @property
    // --glass-depth eager-substitutes to its initial-value 1, FREEZING the calc at the
    // depth-1 endpoint — the C18 dual-engine painted dead-knob) must flag. This is the
    // exact HEAD/regression shape: LERP in the :root token family, map with no LERP.
    const frozenGrades =
        "DEEP-GLASS-DECIDED: retired-at-16px-cost-0B\n:root { " +
        "--glass-blur-deep-radius: 16px; " +
        "--glass-blur-deep-active-radius: calc((13px + 3px * var(--glass-depth)) * var(--glass-level)); " +
        "--glass-depth-content: 0.35; --glass-depth-popover: 0.7; --glass-depth-menu: 1; }";
    const frozenMap =
        "@layer components { .glass-deep { --glass-blur-floating: var(--glass-blur-deep); } " +
        ":where(.glass-overlay) { --glass-depth: var(--glass-depth-menu); } " +
        ":where(.glass-floating) { --glass-depth: var(--glass-depth-popover); } " +
        ":where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) { --glass-depth: var(--glass-depth-content); } }";
    if (!depthTierViolations(frozenGrades, frozenMap, goodDeepTokens).violations.some((v) => /DT4/.test(v))) {
        fails.push(
            "self-test DT4-FREEZE: the deep LERP declared at :root (eager-substituting the registered @property --glass-depth to its initial-value 1 → frozen at the depth-1 endpoint) was NOT flagged (the registered-@property freeze-guard has no teeth)",
        );
    }
    // bite DT4-LADDER — a flat blur ladder (deep endpoint == floating endpoint) must flag,
    // even with the LERP correctly on .glass-deep — the numeric mirror of the painted-flat
    // defect (the depth grade cannot differentiate thickness if the endpoints coincide).
    const flatLadderGrades = goodDeepGrades.replace(
        "--glass-blur-deep-radius: 16px;",
        "--glass-blur-deep-radius: 13px;",
    );
    if (!depthTierViolations(flatLadderGrades, goodDepthMap, goodDeepTokens).violations.some((v) => /DT4/.test(v))) {
        fails.push(
            "self-test DT4-LADDER: a flat blur ladder (deep endpoint == floating 13px) was NOT flagged (the strictly-increasing numeric-ladder arm has no teeth)",
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
    const cbnd = facts.consumerBand ?? {};
    console.log("proof:glass — arm: consumer-band (BG.W-GLASS-CONSUMER-BAND)");
    console.log(
        `  C1 shared plate   : --glass-fill-tinted ×${cbnd.plateDeclCount ?? 0}  reads-axis=${cbnd.plateReadsAxis ? "✓" : "✗"} (data-hue @ strength, in oklab)`,
    );
    console.log(
        `  C2 recipes read   : glass-atom=${cbnd.atomReadsPlate ? "✓" : "✗"}  glass-chip=${cbnd.chipReadsPlate ? "✓" : "✗"} (the fold onto the ONE plate)`,
    );
    console.log(
        `  C3 no fork        : forked-tokens=${(cbnd.forkedTokens ?? []).length ? "✗ " + cbnd.forkedTokens.join(", ") : "✓ none"}  inline-respells=atom:${cbnd.atomRespells ?? 0}/chip:${cbnd.chipRespells ?? 0}`,
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
    const st = facts.glassSignalTruth ?? {};
    console.log("proof:glass — arm: signal-truth (BG.W-GLASS-SIGNAL-TRUTH · NF.3)");
    console.log(
        `  ST1 clear scrim   : static-floor=${st.scrimHasStaticFloor ? "✓" : "✗"}  no-dead-0.5=${st.scrimNoDeadFallback ? "✓" : "✗"}  floor+ramp-declared=${st.scrimFloorDeclared && st.scrimRampDeclared ? "✓" : "✗"} (M6: unwired plate paints the floor, never 0%)`,
    );
    console.log(
        `  ST2 hue channel   : reads-ambient-hue=${st.seamReadsAmbientHue ? "✓" : "✗"}  no-dead-backdrop-hue=${st.deadHueChannelGoneCascade ? "✓" : "✗"} (M9: ONE hue channel, ONE writer)`,
    );
    console.log(
        `  ST3 writer witness: data-attr=${st.witnessDataAttr ? "✓" : "✗"}  --sampled:1=${st.witnessCustomProp ? "✓" : "✗"}  in-write-path=${st.witnessInWritePath ? "✓" : "✗"} (M8: dead-observer≡calm-backdrop mask observable)`,
    );
    console.log(
        `  ST5 live-path     : isLive-considers-canvas=${st.liveConsidersCanvas ? "✓" : "✗"} (M8 runtime: a canvas-fed dock enters sampleAnimated + the witness fires — the dead-observer band closed)`,
    );
    console.log(
        `  ST6 loop-arm      : wantsLiveLoop=${st.wantsLiveFound ? "✓" : "✗"}  provided-is-intent=${st.wantsLiveReadsProvidedSource ? "✓" : "✗"}  arm-reads-intent=${st.armReadsIntent && st.armDropsIsLive ? "✓" : "✗"} (M8 runtime.2: the loop arms on live INTENT so it starts even when the field canvas resolves post-mount — 0/12→12/12 docks fire)`,
    );
    console.log(
        `  ST7 default-ON    : dock-wires-observer=${st.dockWiresObserver ? "✓" : "✗"}  autoLuminance-defaults-true=${st.autoLuminanceDefaultsTrue ? "✓" : "✗"} (M8 runtime.3: withDefaults({autoLuminance:true}) — the Vue boolean-cast-false dead-guard closed; the paint 0/12→12/12)`,
    );
    console.log(
        `  ST4 band-driver   : no-retires-claim=${st.noRetiresBucketAsDriver ? "✓" : "✗"}  decision-recorded=${st.bandDriverRecorded ? "✓" : "✗"} (M7: bucket=driver, clamp=refinement — canon reconciled to ONE)`,
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
    const dt = facts.depthTier ?? {};
    const dtg = dt.grades ?? {};
    console.log("proof:glass — arm: depth-tier (BG.W-GLASS-DEPTH-TIER — --glass-depth mapped onto the tier ladder)");
    console.log(
        `  DT1/2 grades      : content=${dtg.content ?? "?"} < popover=${dtg.popover ?? "?"} < menu=${dtg.menu ?? "?"}  monotone=${dt.gradesMonotone ? "✓" : "✗"} in-range=${dt.gradesInRange ? "✓" : "✗"} (overlay/menu > content by construction)`,
    );
    console.log(
        `  DT3 tier map      : overlay→menu=${dt.overlayMapsMenu ? "✓" : "✗"}  floating→popover=${dt.floatingMapsPopover ? "✓" : "✗"}  content→content=${dt.contentMapsContent ? "✓" : "✗"}`,
    );
    console.log(
        `  DT4 zero-machinery: no-blur-leak=${dt.noBlurLeak ? "✓" : "✗"}  deep-recipe-reads-depth=${dt.deepRecipeReadsDepth ? "✓" : "✗"} (scalar default only; the grade is load-bearing)`,
    );
    console.log(
        `  DT4 freeze-guard  : lerp-at=${dt.lerpDeclaringSelector || "?"}  per-element=${dt.lerpAtConsumingElement ? "✓" : "✗"}  ladder=${dt.depthBlurLadder ? dt.depthBlurLadder.map((n) => n.toFixed(2) + "px").join(" < ") : "?"} (the LERP resolves --glass-depth per-tier, never frozen at :root — the C18 painted dead-knob close)`,
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
