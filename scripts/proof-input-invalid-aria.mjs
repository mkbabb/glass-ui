#!/usr/bin/env node
// AW.W18 — proof:input-invalid-aria (the AW.W18 base) + BB.W-INVALID-RING extension.
//
// ── AW.W18 (the base, UNCHANGED in spirit) ────────────────────────────────────
// The slides `DeckGate` drives validity imperatively (a custom key match, not a
// native `required`/`pattern`), so it sets `aria-invalid="true"` — but the
// shipped `.input-pill` invalid ring keyed ONLY off `:user-invalid` +
// `.user-invalid-fallback` (the browser-constraint path), so the gate had to
// re-paint the ring with a `:deep(input[aria-invalid])`. W18 widened the library
// ring to honor `[aria-invalid="true"]` so any app-driven form gets the
// destructive ring with NO consumer `:deep()`. The base asserts: every
// `.input-pill` invalid rule carries ALL THREE trigger members AND at least one
// resolves the destructive recipe.
//
// ── BB.W-INVALID-RING (the extension — no new gate key) ───────────────────────
// The aria-invalid destructive ring was THREE divergent recipes for ONE register
// (the AW.W26 chronic, audit lane L28): the `.input-pill` focus-gated ring
// (recipe #1, re-spelled inline), SelectTrigger's always-on inline arbitrary
// (recipe #2, same 35% NUMBERS hand-copied), ComboboxInput's text-only tint
// (recipe #3, NO ring) — plus TagsInput's fourth, latent gap (NO invalid arm).
// This wave mints ONE token `--invalid-ring` (the --focus-ring-shadow sibling, in
// tokens/scale-paper.css) and every form surface reads it. Four NEW witnesses
// (each born-RED at HEAD pre-wave, GREEN at close):
//
//   W1 — the register is minted ONCE. `--invalid-ring:` exists in EXACTLY ONE
//        place (scale-paper.css), declared the --focus-ring-shadow way (reuses
//        --focus-ring-width, parameterized on --invalid-ring-tint, resolves
//        var(--destructive)). RED at HEAD: no --invalid-ring token exists.
//   W2 — every form surface reads the token, NONE re-spells the recipe. The four
//        surfaces (.input-pill ring arm + SelectTrigger + ComboboxInput +
//        TagsInput) each carry `var(--invalid-ring)`/`shadow-(--invalid-ring)`,
//        and ZERO of them re-spell `color-mix(in srgb, var(--destructive) 35%, …)`
//        inline (the anti-evasion bite — a fifth re-paste reds). RED at HEAD:
//        SelectTrigger + surfaces.css carry the inline 35% recipe; ComboboxInput
//        carries no ring at all.
//   W3 — the three-member trigger group holds where the surface supports it. The
//        .input-pill group stays (the AW.W18 assert), SelectTrigger + TagsInput
//        carry the widened group (or the documented `[aria-invalid]` attr floor).
//        RED at HEAD: SelectTrigger carries the attr arm only; TagsInput none.
//   W4 — TagsInput has an invalid arm reading the shared token. RED at HEAD:
//        grep -c "aria-invalid|user-invalid" TagsInput.vue → 0.
//
// House style mirrors proof-eyebrow-union.mjs / proof-menu-glass.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a self-test bite (the anti-evasion
// detector proves it bites on a synthetic re-spell), process.exit(1) on violation.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip CSS block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Strip JS/TS/Vue `//` line + block comments so a class string in a comment
 *  cannot satisfy (or evade) a clause. Conservative: drops `/* *​/` blocks and
 *  whole `//` lines (the SFC class attrs we read are never `//`-commented). */
function stripVueComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

// The inline destructive-RING re-spell the wave forbids — the box-shadow ring
// recipe (`0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) N%,
// transparent)`), in either whitespace form (CSS spaced or the Tailwind
// underscore arbitrary). SCOPED to the RING geometry (`0 0 0 var(--focus-ring-
// width)`) so it bites the ring recipe ONLY — a SUPPLEMENTARY text/placeholder
// tint (`text-[color-mix(in srgb, var(--destructive) 60%, transparent)]`, the
// kept non-color-redundant cue) is NOT a ring re-spell and is left alone. The ONE
// sanctioned ring spelling is the --invalid-ring token declaration in
// scale-paper.css; anywhere else is a re-divergence (the fifth-divergence bite).
const INLINE_RESPELL_RE =
    /0[\s_]0[\s_]0[\s_]var\(--focus-ring-width\)[\s_]+color-mix\(\s*in[\s_]srgb\s*,\s*var\(--destructive\)/;

/**
 * Pure detector — given the source strings, return { facts, violations }.
 * `sources` = { glassCss, scaleCss, selectVue, comboboxVue, tagsVue }.
 */
export function detectInvalidRing(sources) {
    const { glassCss, scaleCss, selectVue, comboboxVue, tagsVue } = sources;
    const facts = {};
    const violations = [];

    const glass = stripComments(glassCss);
    const scale = stripComments(scaleCss);
    const select = stripVueComments(selectVue);
    const combobox = stripVueComments(comboboxVue);
    const tags = stripVueComments(tagsVue);

    // ── AW.W18 base — the .input-pill three-member group + destructive intact ──
    const ruleRe =
        /\.input-pill:where\(([^)]*:user-invalid[^)]*)\)([^{]*)\{([^}]*)\}/g;
    const rules = [...glass.matchAll(ruleRe)];
    facts.invalidRuleCount = rules.length;
    if (rules.length === 0) {
        violations.push(
            "no `.input-pill:where(:user-invalid, …)` invalid-ring rule found",
        );
    }
    const REQUIRED = [":user-invalid", ".user-invalid-fallback", '[aria-invalid="true"]'];
    let allHaveThreeMembers = rules.length > 0;
    // "destructive intact" now means: the ring rule resolves the destructive
    // affordance — EITHER via the shared `var(--invalid-ring)` token OR directly
    // `var(--destructive)` (the at-rest border/bg arm). After the wave the ring
    // arm reads `var(--invalid-ring)`; the at-rest arm still reads
    // `var(--destructive)`. Both keep the destructive register intact.
    let destructiveIntact = false;
    for (const m of rules) {
        const group = m[1];
        for (const member of REQUIRED) {
            if (!group.includes(member)) {
                allHaveThreeMembers = false;
                violations.push(
                    `the .input-pill invalid-ring selector group is missing \`${member}\` (group: \`${group.trim()}\`)`,
                );
            }
        }
        if (/var\(--destructive\)/.test(m[3]) || /var\(--invalid-ring\)/.test(m[3]))
            destructiveIntact = true;
    }
    facts.allHaveThreeMembers = allHaveThreeMembers;
    facts.destructiveRecipeIntact = destructiveIntact;
    if (rules.length > 0 && !destructiveIntact) {
        violations.push(
            "no `.input-pill` invalid-ring rule resolves the destructive register (`var(--destructive)` / `var(--invalid-ring)`) — the recipe was dropped, not factored",
        );
    }

    // ── W1 — the register is minted ONCE, the --focus-ring-shadow way ─────────
    facts.w1 = {};
    // count --invalid-ring: declarations across the two token surfaces we read
    // (scale-paper carved partial = scaleCss; glass monolith = glassCss). The
    // token must live in scale-paper, and exactly once.
    const declCountScale = (scale.match(/--invalid-ring\s*:/g) ?? []).length;
    const declCountGlass = (glass.match(/--invalid-ring\s*:/g) ?? []).length;
    facts.w1.declCountScale = declCountScale;
    facts.w1.declCountGlass = declCountGlass;
    facts.w1.mintedInScalePaper = declCountScale === 1;
    facts.w1.notMintedElsewhere = declCountGlass === 0;
    // the declaration shape: reuses --focus-ring-width, parameterized on
    // --invalid-ring-tint, resolves var(--destructive).
    const tokenBlock =
        scale.match(/--invalid-ring\s*:[^;]*;/)?.[0] ?? "";
    facts.w1.reusesFocusRingWidth = /var\(--focus-ring-width\)/.test(tokenBlock);
    facts.w1.parameterizedOnTint = /var\(--invalid-ring-tint\)/.test(tokenBlock);
    facts.w1.resolvesDestructive = /var\(--destructive\)/.test(tokenBlock);
    facts.w1.tintKnobDeclared = /--invalid-ring-tint\s*:/.test(scale);
    if (!facts.w1.mintedInScalePaper) {
        violations.push(
            `W1: --invalid-ring must be declared EXACTLY ONCE in tokens/scale-paper.css (found ${declCountScale})`,
        );
    }
    if (!facts.w1.notMintedElsewhere) {
        violations.push(
            "W1: --invalid-ring is declared a SECOND place (glass monolith) — the register must be minted ONCE",
        );
    }
    if (!facts.w1.tintKnobDeclared) {
        violations.push(
            "W1: --invalid-ring-tint knob must be declared (the documented retint axis)",
        );
    }
    if (
        !(
            facts.w1.reusesFocusRingWidth &&
            facts.w1.parameterizedOnTint &&
            facts.w1.resolvesDestructive
        )
    ) {
        violations.push(
            "W1: --invalid-ring must be the --focus-ring-shadow sibling — reuse var(--focus-ring-width), parameterize on var(--invalid-ring-tint), resolve var(--destructive)",
        );
    }

    // ── W2 — every surface reads the token, NONE re-spells the recipe ─────────
    facts.w2 = {};
    // the .input-pill RING arm (the :focus-visible rule) must read var(--invalid-ring).
    const ringRule =
        glass.match(
            /\.input-pill:where\([^)]*\):focus-visible\s*\{([^}]*)\}/,
        )?.[1] ?? "";
    facts.w2.inputPillReadsToken = /var\(--invalid-ring\)/.test(ringRule);
    facts.w2.selectReadsToken = /shadow-\(--invalid-ring\)/.test(select);
    facts.w2.comboboxReadsToken = /shadow-\(--invalid-ring\)/.test(combobox);
    facts.w2.tagsReadsToken = /shadow-\(--invalid-ring\)/.test(tags);
    // the inline-respell bite: ZERO surface re-spells the destructive RING inline.
    // INLINE_RESPELL_RE matches the box-shadow ring geometry (`0 0 0 var(--focus-
    // ring-width) color-mix(in srgb, var(--destructive) …)`) ONLY, so the
    // .input-pill at-rest `8%` glass-tint bg arm (a distinct surface-local
    // decoration, NOT the ring) and ComboboxInput's kept `60%` placeholder TEXT
    // tint (the supplementary cue) are both left alone — only the RING recipe
    // bites. The ONE sanctioned ring spelling is the --invalid-ring token decl.
    const respellGlass = INLINE_RESPELL_RE.test(ringRule);
    const respellSelect = INLINE_RESPELL_RE.test(select);
    const respellCombobox = INLINE_RESPELL_RE.test(combobox);
    const respellTags = INLINE_RESPELL_RE.test(tags);
    facts.w2.noInlineRespell =
        !respellGlass && !respellSelect && !respellCombobox && !respellTags;
    facts.w2.respellSites = [
        respellGlass && ".input-pill ring arm",
        respellSelect && "SelectTrigger",
        respellCombobox && "ComboboxInput",
        respellTags && "TagsInput",
    ].filter(Boolean);

    if (!facts.w2.inputPillReadsToken) {
        violations.push(
            "W2: the .input-pill :focus-visible invalid-ring arm must read `box-shadow: var(--invalid-ring)`",
        );
    }
    if (!facts.w2.selectReadsToken) {
        violations.push(
            "W2: SelectTrigger must read `shadow-(--invalid-ring)` for its invalid ring (not the inline 35% arbitrary)",
        );
    }
    if (!facts.w2.comboboxReadsToken) {
        violations.push(
            "W2: ComboboxInput must read `shadow-(--invalid-ring)` (the borderless input's ring routed onto the wrapper row) — the text-only tint is not a ring",
        );
    }
    if (!facts.w2.tagsReadsToken) {
        violations.push(
            "W2: TagsInput must read `shadow-(--invalid-ring)` for its invalid ring (the fourth-gap close)",
        );
    }
    if (!facts.w2.noInlineRespell) {
        violations.push(
            `W2 (anti-evasion bite): an inline destructive-ring recipe is re-spelled outside the ONE token declaration: ${facts.w2.respellSites.join(", ")} — read --invalid-ring instead`,
        );
    }

    // ── W3 — the three-member trigger group holds where supported ─────────────
    facts.w3 = {};
    // .input-pill is the AW.W18 three-member assert (allHaveThreeMembers above).
    facts.w3.inputPillThreeMember = allHaveThreeMembers;
    // SelectTrigger + TagsInput must carry the widened group (`:user-invalid` +
    // `[aria-invalid]`), not the attr-only subset. The §Divergence-decisions
    // table widens onto the three-member set wherever the surface supports it;
    // `:user-invalid` (the `user-invalid:` Tailwind variant) is the propagated
    // member, and the `aria-invalid:`/`[aria-invalid]` attr is the floor.
    facts.w3.selectHasAria = /aria-invalid:/.test(select);
    facts.w3.selectHasUserInvalid = /user-invalid:/.test(select);
    facts.w3.tagsHasAria = /aria-invalid:/.test(tags);
    facts.w3.tagsHasUserInvalid = /user-invalid:/.test(tags);
    // the trigger must NOT be a strict subset of the canon the table did not
    // sanction: each picker carries BOTH the attr arm AND the user-invalid arm.
    if (!(facts.w3.selectHasAria && facts.w3.selectHasUserInvalid)) {
        violations.push(
            "W3: SelectTrigger must carry the widened trigger group (`aria-invalid:` + `user-invalid:`), not the attr-only subset",
        );
    }
    if (!(facts.w3.tagsHasAria && facts.w3.tagsHasUserInvalid)) {
        violations.push(
            "W3: TagsInput must carry the widened trigger group (`aria-invalid:` + `user-invalid:`), not the attr-only subset",
        );
    }
    if (!facts.w3.inputPillThreeMember) {
        violations.push(
            "W3: the .input-pill three-member trigger group (AW.W18) must hold",
        );
    }

    // ── W4 — TagsInput has an invalid arm reading the shared token ────────────
    facts.w4 = {};
    facts.w4.tagsHasInvalidArm =
        (/aria-invalid:/.test(tags) || /user-invalid:/.test(tags)) &&
        /shadow-\(--invalid-ring\)/.test(tags);
    if (!facts.w4.tagsHasInvalidArm) {
        violations.push(
            "W4: TagsInput.vue must carry an aria-invalid/user-invalid ring arm reading `--invalid-ring` (the fourth-gap close)",
        );
    }

    return { facts, violations };
}

// ── Self-test bite (anti-evasion): the detector MUST flag a synthetic surface
//    that re-spells the destructive ring inline, and MUST NOT flag the canonical
//    token read. Proves the W2 inline-respell partition bites every run,
//    independent of the live corpus. ──
function selfTest() {
    // a synthetic SelectTrigger that re-pastes the inline 35% recipe (the fifth
    // divergence the bite forbids) — the detector must FLAG it.
    const badSelect = `<template><div class="aria-invalid:shadow-[0_0_0_var(--focus-ring-width)_color-mix(in_srgb,var(--destructive)_35%,transparent)]" /></template>`;
    // a synthetic SelectTrigger that reads the token — the detector must NOT flag
    // (for the respell bite).
    const goodSelect = `<template><div class="aria-invalid:shadow-(--invalid-ring) user-invalid:shadow-(--invalid-ring) aria-invalid:border-(--destructive)" /></template>`;
    const goodScale = `:root { --invalid-ring-tint: 35%; --invalid-ring: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) var(--invalid-ring-tint), transparent); }`;
    const goodGlass = `.input-pill:where(:user-invalid, .user-invalid-fallback, [aria-invalid="true"]):focus-visible { border-color: var(--destructive); box-shadow: var(--invalid-ring); }`;
    const goodCombobox = `<div class="has-[[aria-invalid='true']]:shadow-(--invalid-ring)" />`;
    const goodTags = `<div class="aria-invalid:shadow-(--invalid-ring) user-invalid:shadow-(--invalid-ring) aria-invalid:border-(--destructive) user-invalid:border-(--destructive)" />`;

    const bad = detectInvalidRing({
        glassCss: goodGlass,
        scaleCss: goodScale,
        selectVue: badSelect,
        comboboxVue: goodCombobox,
        tagsVue: goodTags,
    });
    const good = detectInvalidRing({
        glassCss: goodGlass,
        scaleCss: goodScale,
        selectVue: goodSelect,
        comboboxVue: goodCombobox,
        tagsVue: goodTags,
    });
    // the bad surface must trip the W2 anti-evasion bite; the good must not.
    const badBites = bad.violations.some((v) => v.includes("anti-evasion bite"));
    const goodClean = !good.violations.some((v) => v.includes("anti-evasion bite"));
    return badBites && goodClean;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_INPUT_INVALID_ARIA_ARTIFACT",
        "AW-input-invalid-aria",
    );

    const glassPath = resolve(ROOT, "src/styles/glass.css");
    const violations = [];

    if (!existsSync(glassPath)) {
        violations.push("src/styles/glass.css is absent");
    }

    const glassCss = existsSync(glassPath) ? readMonolith(ROOT, "glass") : "";
    const scaleCss = safeRead(resolve(ROOT, "src/styles/tokens/scale-paper.css"));
    const selectVue = safeRead(
        resolve(ROOT, "src/components/ui/select/SelectTrigger.vue"),
    );
    const comboboxVue = safeRead(
        resolve(ROOT, "src/components/ui/combobox/ComboboxInput.vue"),
    );
    const tagsVue = safeRead(
        resolve(ROOT, "src/components/ui/tags-input/TagsInput.vue"),
    );

    const { facts, violations: detected } = detectInvalidRing({
        glassCss,
        scaleCss,
        selectVue,
        comboboxVue,
        tagsVue,
    });
    violations.push(...detected);

    // self-test bite — the detector itself must bite on a synthetic re-spell.
    const biteHolds = selfTest();
    facts.selfTestBite = biteHolds;
    if (!biteHolds) {
        violations.push(
            "self-test bite broke: the detector did not flag a synthetic inline-recipe re-spell (or false-flagged the token read)",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        gate: "proof:input-invalid-aria",
        command: "npm run proof:input-invalid-aria",
        facts,
        violations,
    });

    const yn = (b) => (b ? "yes ✓" : "NO ✗");
    console.log(
        "proof:input-invalid-aria — the ONE shared aria-invalid ring register (AW.W18 + BB.W-INVALID-RING)",
    );
    console.log(
        `  AW.W18 .input-pill three-member group: ${yn(facts.allHaveThreeMembers)}   (rules: ${facts.invalidRuleCount ?? 0})`,
    );
    console.log(`  AW.W18 destructive recipe intact     : ${yn(facts.destructiveRecipeIntact)}`);
    console.log(
        `  W1 --invalid-ring minted ONCE (scale): ${yn(
            facts.w1?.mintedInScalePaper &&
                facts.w1?.notMintedElsewhere &&
                facts.w1?.tintKnobDeclared &&
                facts.w1?.reusesFocusRingWidth &&
                facts.w1?.parameterizedOnTint &&
                facts.w1?.resolvesDestructive,
        )}`,
    );
    console.log(
        `  W2 every surface reads token, no respell: ${yn(
            facts.w2?.inputPillReadsToken &&
                facts.w2?.selectReadsToken &&
                facts.w2?.comboboxReadsToken &&
                facts.w2?.tagsReadsToken &&
                facts.w2?.noInlineRespell,
        )}`,
    );
    console.log(
        `  W3 three-member group where supported : ${yn(
            facts.w3?.inputPillThreeMember &&
                facts.w3?.selectHasAria &&
                facts.w3?.selectHasUserInvalid &&
                facts.w3?.tagsHasAria &&
                facts.w3?.tagsHasUserInvalid,
        )}`,
    );
    console.log(`  W4 TagsInput has invalid arm          : ${yn(facts.w4?.tagsHasInvalidArm)}`);
    console.log(`  self-test bite holds                  : ${yn(facts.selfTestBite)}`);

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
