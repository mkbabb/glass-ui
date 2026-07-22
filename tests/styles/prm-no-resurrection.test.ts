// PRM no-resurrection — FM W3 (row 12 `BJ.W-FEEDBACK-MOTION-TUNE`).
//
// Q-PRM-NO-RESURRECTION-C2 (`04fe76f9…`, Q critic `e5d1a16c…`) overturned the old
// BAND-A11Y "wildcard reduced-motion substrate CONFIRMED KEEP" ruling. Under
// `prefers-reduced-motion: reduce` the last-cascade wildcard `*:not([data-allow-motion])`
// set `transition-duration: 0.1s !important` and INVENTED a `transition-property`
// list (opacity, color, background-color, border-color, box-shadow). That is not
// shortening existing motion — it OVERRODE an authored `transition:none` (SCI focal
// chip / plate rim) and attached a fresh 100ms clock to a receiver that authored no
// transition at all (VFT `.focus-ring` colour change).
//
// The producer contract: a global PRM fallback SUPPRESSES motion; it may not create
// transition eligibility, re-enable a de-animated receiver, or attach a nonzero clock
// to a receiver that authored none. The KISS safe default is an INSTANT wildcard —
// `transition-duration: 0s`, NO minted `transition-property` list. Any retained
// nonzero PRM transition is a narrow, explicit, producer-owned authorization that
// outranks the fallback NOT by specificity (both are `!important`) but by cascade
// LAYER — it is `!important` inside `@layer components`, and per CSS Cascade L5 a
// layered `!important` beats an unlayered `!important` (index.css:1 layer order;
// enumerated + hashed in BAND-FEEDBACK-MOTION.md §PRM-AUTHORIZED-SET), never
// inferred from `*`.
//
// happy-dom runs no cascade engine, so these are SOURCE-shape mutations over the
// shipped partial — the packed / computed-cascade Chromium arm rides the receipt.
// Each `it` names one of the three mandated born-RED mutations; restoring that exact
// defect REDs the case (watched RED in the receipt).

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const A11Y = read("src/styles/utilities/a11y-overrides.css");
const TRANSITIONS = read("src/styles/transitions.css");

// Strip CSS comments so prose that quotes the retired defect never trips a scan.
const decomment = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

// Brace-matched extraction of the FIRST `@media (prefers-reduced-motion: reduce)`
// block body (handles the nested rule braces the naive indexOf split cannot).
const prmBlock = (css: string): string => {
    const src = decomment(css);
    const at = src.search(/@media[^{]*prefers-reduced-motion:\s*reduce[^{]*\{/);
    if (at < 0) return "";
    let i = src.indexOf("{", at);
    let depth = 0;
    const start = i + 1;
    for (; i < src.length; i += 1) {
        if (src[i] === "{") depth += 1;
        else if (src[i] === "}") {
            depth -= 1;
            if (depth === 0) return src.slice(start, i);
        }
    }
    return "";
};

// Split a block body into [selectorList, declarations] rule pairs (one nesting level).
const rules = (block: string): Array<{ selector: string; body: string }> => {
    const out: Array<{ selector: string; body: string }> = [];
    let i = 0;
    while (i < block.length) {
        const open = block.indexOf("{", i);
        if (open < 0) break;
        const selector = block.slice(i, open).trim();
        let depth = 1;
        let j = open + 1;
        for (; j < block.length && depth > 0; j += 1) {
            if (block[j] === "{") depth += 1;
            else if (block[j] === "}") depth -= 1;
        }
        out.push({ selector, body: block.slice(open + 1, j - 1) });
        i = j;
    }
    return out;
};

const A11Y_PRM = prmBlock(A11Y);
const A11Y_RULES = rules(A11Y_PRM);

// A "universal" reduced-motion rule: a bare `*` (optionally with `::before`/`::after`
// or a `:not()` carve) — i.e. the global fallback, not a narrow authored selector.
const isUniversal = (selector: string): boolean =>
    selector
        .split(",")
        .some((s) => /^\*(\s*::(before|after)|:not\([^)]*\))?\s*$/.test(s.trim()));

const universalRules = A11Y_RULES.filter((r) => isUniversal(r.selector));

// nonzero transition-duration = anything other than `0` / `0s` / `0ms`.
const declValues = (body: string, prop: string): string[] =>
    [...body.matchAll(new RegExp(`(?:^|;|\\{)\\s*${prop}\\s*:\\s*([^;}]+)`, "gi"))].map((m) =>
        m[1].replace(/!important/i, "").trim(),
    );

const isZeroDuration = (v: string): boolean => /^0(s|ms)?$/.test(v.trim());

describe("PRM no-resurrection — the global fallback is instant (FM W3 / Q-PRM-NO-RESURRECTION)", () => {
    it("has exactly one universal reduced-motion rule (the single instant fallback)", () => {
        expect(A11Y_PRM).not.toBe("");
        expect(universalRules).toHaveLength(1);
        // accessibility is absolute — the fallback is NOT carved out of by
        // `[data-allow-motion]`; a plain `*` covers motion-allowed elements too.
        expect(universalRules[0].selector).not.toMatch(/data-allow-motion/);
    });

    // MUTATION 1 — RESTORE THE WILDCARD 0.1s CLOCK.
    // Reintroducing `transition-duration: 0.1s` (or any nonzero value) on the universal
    // fallback REDs here: the global fallback may not attach a clock.
    it("mutation[restore-wildcard]: no universal rule carries a nonzero transition-duration", () => {
        for (const r of universalRules) {
            for (const v of declValues(r.body, "transition-duration")) {
                expect(isZeroDuration(v)).toBe(true);
            }
        }
        // and no `*:not(...)`-shaped nonzero-duration wildcard survives anywhere in the block.
        for (const r of A11Y_RULES) {
            if (!/\*/.test(r.selector)) continue;
            for (const v of declValues(r.body, "transition-duration")) {
                expect(isZeroDuration(v)).toBe(true);
            }
        }
    });

    // MUTATION 2 — DEFEAT SCI CHIP/RIM `transition:none`.
    // Minting a `transition-property` list on the wildcard is the exact mechanism that
    // overrode an authored `transition:none`. The fallback must declare NONE — leaving
    // `transition-property` untouched keeps a receiver's authored `none` in effect.
    it("mutation[defeat-chip-rim-none]: the universal fallback mints no transition-property list", () => {
        for (const r of universalRules) {
            expect(declValues(r.body, "transition-property")).toHaveLength(0);
        }
        // The retired resurrection signature specifically listed these paint props.
        expect(A11Y_PRM).not.toMatch(
            /transition-property\s*:\s*[^;}]*\b(opacity|color|background-color|border-color|box-shadow)\b/i,
        );
    });

    // MUTATION 3 — ATTACH A CLOCK TO AN UN-AUTHORED HOVER/FOCUS COLOUR CHANGE.
    // The universal fallback's transition-duration must be a genuine ZERO clock (`0s`),
    // not a forensically-visible 0.01ms nor 0.1s — either would clock an un-authored
    // colour change on an element that authored no transition.
    it("mutation[unauthored-hover-focus-clock]: the universal transition-duration is exactly zero", () => {
        const durations = universalRules.flatMap((r) =>
            declValues(r.body, "transition-duration"),
        );
        expect(durations.length).toBeGreaterThan(0);
        for (const v of durations) expect(v).toMatch(/^0s?$/);
    });

    it("still snaps animation to a single endpoint frame (motion IS suppressed)", () => {
        const body = universalRules[0].body;
        expect(declValues(body, "animation-duration").some((v) => /^0\.01ms$/.test(v))).toBe(
            true,
        );
        expect(declValues(body, "animation-iteration-count").some((v) => v === "1")).toBe(true);
    });
});

describe("PRM authorized-set — the theme-flip marker stays separate; narrow authors are exact", () => {
    it("preserves the theme-flip `.no-transition` marker as a SEPARATE (non-PRM) suppression", () => {
        // The marker lives outside the PRM media query and only ever ZEROS duration —
        // it is a flip-storm suppressor, never a public PRM license.
        expect(A11Y).toMatch(/html\.no-transition\b/);
        const flip = A11Y.slice(A11Y.indexOf("html.no-transition"));
        expect(flip).toMatch(/transition-duration:\s*0s\s*!important/);
        // It is not nested inside the reduced-motion block.
        expect(A11Y_PRM).not.toMatch(/html\.no-transition/);
    });

    // The only surviving nonzero PRM transition clocks are the narrow opacity-only Vue
    // transition classes in transitions.css. They outrank the `*` fallback NOT by
    // specificity (both `!important`) but by cascade LAYER — layered `!important` in
    // `@layer components` beats the unlayered `!important` fallback (CSS Cascade L5).
    // They are exact, enumerated authorizations — never a wildcard.
    it("the retained transitions.css authorizations are narrow class selectors (no wildcard)", () => {
        const block = prmBlock(TRANSITIONS);
        expect(block).not.toBe("");
        const nonzero = rules(block).filter((r) =>
            declValues(r.body, "transition-duration").some((v) => !isZeroDuration(v)),
        );
        expect(nonzero.length).toBeGreaterThan(0);
        for (const r of nonzero) {
            expect(isUniversal(r.selector)).toBe(false);
            // opacity-only / fade-class family — no bare element or `*` reach.
            expect(r.selector).toMatch(/\.(fade|tab-fade|pane-swap|metric-swap)-/);
            expect(r.selector).not.toMatch(/\*/);
        }
    });
});
