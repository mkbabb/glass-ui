// BK #30 W-DISSOLVE — the close-battery arms for the vaporize and the corner affordance.
//
// WHAT WAS FALSE AT HEAD, AND IS THE REASON THIS FILE EXISTS. Every dismissal in the
// library released its surface the same way: scale it down, fade it out, blur its own
// pixels. Nothing anywhere released the BACKDROP — `rg -w 'backdrop-filter' src/styles`
// found only resting rungs, never a channel a dismissal drives. The owner's ask
// ("notification vaporizing and dissolving effect… re-deployed in our own facilities") is
// for the one mechanism the corpus actually measured, and `IOS27-ARCHIVE.md` §4b names it
// exactly: a DESYNCHRONISED THREE-CHANNEL RELEASE OF THE BACKDROP FILTER ITSELF, sat : dim
// : blur = 1 : 1.36 : 1.72, with the element's own ink dropped first.
//
// THE THING THAT ROTS, AND WHY THESE ARE SOURCE ARMS. The effect exists ONLY in the gap
// between the three clocks: collapse them and you get a fade with extra steps, and every
// suite stays green through it. So the arms below read the ratio out of the stylesheet and
// check the arithmetic against `dissolveGrammar.ts`, which is the one place the measured
// numbers are written down. A retune that shortens a channel, an "optimisation" that folds
// three animations into one, a transform quietly added to the recipe, or a keyframe stop
// nudged off its derivation all fail here — and each of those is a mutation this file was
// bitten with.
//
// SCOPE, STATED. Two things this cannot see:
//   1. Paint. A frame is not source; whether the mid-dissolve beat really reads as colour
//      with no form is the row's live capture, not an arm's business.
//   2. A consumer's own override of `--vap-*` on their own surface. The recipe publishes
//      knobs on purpose; the arms hold the LIBRARY's grammar, which is the only place the
//      library authors one.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import postcss, { type AtRule, type Rule } from "postcss";
import { describe, expect, it } from "vitest";

import { FRAME_MS } from "../../src/composables/motion/core/constants";
import {
    CORNER_AFFORDANCE,
    DISSOLVE_DIALECTS,
    VAPORIZE_CONSTANTS,
    backdropOutlivesPanel,
    channelFraction,
    cornerAffordanceOffset,
    dissolveDialect,
    inkBlurFraction,
} from "../../src/composables/motion/dissolve/dissolveGrammar";

const REPO_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(REPO_ROOT, rel), "utf8");
const readStyle = (rel: string): string => read(join("src/styles", rel));

const DISSOLVE_CSS = readStyle("glass/dissolve.css");
const ANIMATIONS_CSS = readStyle("animations.css");
const PROPERTY_REGS_CSS = readStyle("tokens/property-regs.css");
const SPRING_CSS = readStyle("tokens/scheme-spring.css");
const REGISTERS_CSS = readStyle("tokens/motion-registers.css");
const GLASS_CSS = readStyle("glass.css");
const REVEAL_CSS = readStyle("glass/reveal.css");
const A11Y_CSS = readStyle("utilities/a11y-overrides.css");

const dissolveRoot = postcss.parse(DISSOLVE_CSS);

/** Every ordinary rule in the recipe, selector-normalised (whitespace collapsed). */
const rules: Rule[] = [];
dissolveRoot.walkRules((rule) => rules.push(rule));

const normalise = (selector: string): string => selector.replace(/\s+/g, " ").trim();

/** The `@`-rules a rule sits inside, innermost first (`@layer`, `@media`, …). */
const ancestorAtRules = (rule: Rule): AtRule[] => {
    const chain: AtRule[] = [];
    let node: Rule["parent"] = rule.parent;
    while (node) {
        if (node.type === "atrule") chain.push(node as AtRule);
        node = (node as { parent?: Rule["parent"] }).parent;
    }
    return chain;
};

const inMedia = (rule: Rule): boolean =>
    ancestorAtRules(rule).some((at) => at.name === "media");

/** The unconditional rule for a selector — never one of the media carves. */
const ruleFor = (selector: string): Rule => {
    const found = rules.filter(
        (rule) => normalise(rule.selector) === selector && !inMedia(rule),
    );
    if (found.length !== 1) {
        throw new Error(`${found.length} unconditional rules for selector: ${selector}`);
    }
    return found[0];
};

/**
 * (id, class/attribute/pseudo-class, element) — enough for the flat, single-compound
 * selectors both recipes write, and the only way an arm can see a declaration OUTRANKED
 * rather than merely present.
 */
const specificity = (selector: string): [number, number, number] => {
    const flat = normalise(selector).replace(/::[\w-]+/g, "");
    const count = (pattern: RegExp): number => (flat.match(pattern) ?? []).length;
    return [
        count(/#[\w-]+/g),
        count(/\.[\w-]+|\[[^\]]*\]|:[\w-]+(?:\([^)]*\))?/g),
        count(/(?:^|[\s>+~])[a-z][\w-]*/gi),
    ];
};

/** Lexicographic (id, class, element) comparison — CSS's own order. */
const outranks = (a: [number, number, number], b: [number, number, number]): boolean =>
    a[0] !== b[0] ? a[0] > b[0] : a[1] !== b[1] ? a[1] > b[1] : a[2] >= b[2];

const declOf = (rule: Rule, prop: string): string => {
    let value: string | null = null;
    rule.walkDecls(prop, (decl) => {
        value = decl.value.replace(/\s+/g, " ").trim();
    });
    if (value === null) throw new Error(`No \`${prop}\` on \`${rule.selector}\``);
    return value;
};

const hasDecl = (rule: Rule, prop: string): boolean => {
    let found = false;
    rule.walkDecls(prop, () => {
        found = true;
    });
    return found;
};

/** Every `@keyframes` in `animations.css`, by name. */
const keyframes = new Map<string, AtRule>();
postcss.parse(ANIMATIONS_CSS).walkAtRules("keyframes", (at) => {
    keyframes.set(at.params.trim(), at);
});

const keyframeStops = (name: string): Array<{ at: number; decls: Map<string, string> }> => {
    const at = keyframes.get(name);
    if (!at) throw new Error(`No @keyframes ${name}`);
    const stops: Array<{ at: number; decls: Map<string, string> }> = [];
    at.walkRules((rule) => {
        const decls = new Map<string, string>();
        rule.walkDecls((decl) => decls.set(decl.prop, decl.value.trim()));
        for (const selector of rule.selector.split(",")) {
            const key = selector.trim();
            const fraction =
                key === "from" ? 0 : key === "to" ? 1 : Number.parseFloat(key) / 100;
            stops.push({ at: fraction, decls });
        }
    });
    return stops.sort((a, b) => a.at - b.at);
};

/**
 * The travel the recipe actually spends, in ms, DERIVED — never a remembered figure.
 * `--vap-clock` reads `--exit-overlay-duration`, which reads `--spring-panel-exit-duration`,
 * which is `clamp(lo, settle * factor, hi) * tempo` over the `panel` row's own settle.
 */
const shippedTravelMs = (): number => {
    const settle = SPRING_CSS.match(/--spring-panel-settle:\s*([\d.]+)s/);
    const exit = SPRING_CSS.match(
        /--spring-panel-exit-duration:\s*calc\(clamp\(([\d.]+)s,\s*var\(--spring-panel-settle\)\s*\*\s*([\d.]+),\s*([\d.]+)s\)/,
    );
    if (!settle || !exit) throw new Error("the panel row's exit clock is not derivable");
    const [, lo, factor, hi] = exit;
    const raw = Number.parseFloat(settle[1]) * Number.parseFloat(factor);
    const clamped = Math.min(Math.max(raw, Number.parseFloat(lo)), Number.parseFloat(hi));
    return clamped * 1000;
};

const SIDES = ["top", "bottom", "left", "right"] as const;

const base = () => ruleFor(".glass-vaporize");
const closed = () => ruleFor('.glass-vaporize[data-state="closed"]');
const ink = () => ruleFor('.glass-vaporize[data-state="closed"] > *');
/** The neutraliser rule answers the reveal at every specificity the reveal writes. */
const NEUTRALISER_SELECTOR = [
    '.glass-vaporize[data-state="closed"]',
    ...SIDES.map((side) => `.glass-vaporize[data-state="closed"][data-side="${side}"]`),
].join(", ");
const neutralisers = () => ruleFor(NEUTRALISER_SELECTOR);

/** The keyframe names the root itself runs — the recipe's own exit-name set. */
const rootExitKeyframes = (): string[] =>
    [...declOf(closed(), "animation").matchAll(/glass-vaporize-[\w-]+/g)].map((m) => m[0]);

describe("the vaporize — three channels, three clocks, one direction", () => {
    it("spends ONE clock and states no duration of its own", () => {
        expect(declOf(base(), "--vap-clock")).toBe("var(--exit-overlay-duration)");
        expect(REGISTERS_CSS).toContain("--exit-overlay-duration:");

        // No absolute duration anywhere in the recipe — a dismissal that names its own
        // milliseconds is one retune away from outlasting the arrival it reverses.
        expect(DISSOLVE_CSS.replace(/\/\*[\s\S]*?\*\//g, "")).not.toMatch(/[\d.]+m?s\b/);
    });

    it("gives the presence-gated root exactly ONE end-time, or reka unmounts it early", () => {
        // reka's `usePresence` dispatches ANIMATION_END on the FIRST `animationend`
        // whose name appears in the node's computed `animation-name` list and unmounts
        // there, so on a presence-gated root the SHORTEST clock is the element's real
        // lifetime. Three unequal durations here tore the toast out at 58% of its own
        // dismissal — shadow still cast, backdrop still blurred, ink at 0.07 — with
        // every source arm green. Every channel on the root rides `--vap-clock`; the
        // ratio lives in the keyframe stops instead (the arm below).
        const durations = declOf(closed(), "animation")
            .split(",")
            .map((leg) => leg.trim().split(/\s+/)[1]);
        expect(durations).toHaveLength(3);
        for (const duration of durations) expect(duration).toBe("var(--vap-clock)");
        // …and no channel may re-time itself past the shorthand either.
        expect(hasDecl(closed(), "animation-duration")).toBe(false);
    });

    it("lands saturation first and blur last, with the panel between them — as STOPS", () => {
        // The desynchronisation the mechanism is made of, carried where it cannot
        // change the root's lifetime: each channel lands on its own ratio and is PINNED
        // from that stop through 100%.
        const landings: Array<[string, number]> = [
            ["glass-vaporize-saturate", channelFraction("saturate")],
            ["glass-vaporize-panel", channelFraction("dim")],
            ["glass-vaporize-blur", channelFraction("blur")],
        ];
        for (const [name, fraction] of landings) {
            const stops = keyframeStops(name);
            // The landing is the first stop; the last stop is always 100%.
            expect(stops[0].at, `${name} lands off its ratio`).toBeCloseTo(fraction, 4);
            expect(stops.at(-1)!.at, `${name} does not reach 100%`).toBe(1);
            // Landing and pin are ONE declaration — they cannot drift apart.
            for (const stop of stops) {
                expect([...stop.decls], `${name} @ ${stop.at}`).toEqual([
                    ...stops[0].decls,
                ]);
            }
        }
        expect(channelFraction("saturate")).toBeLessThan(channelFraction("dim"));
        expect(channelFraction("dim")).toBeLessThan(channelFraction("blur"));
        expect(channelFraction("blur")).toBe(1);
    });

    it("drives ONE backdrop-filter from THREE animations, which is why the channels are registered", () => {
        // Two clocks cannot drive one declaration except through custom properties, and a
        // bare var() in a filter function snaps. CWT F-11 / archive §4b.
        expect(declOf(closed(), "backdrop-filter")).toBe(
            "blur(var(--vap-blur)) saturate(var(--vap-saturate))",
        );

        expect(rootExitKeyframes()).toEqual([
            "glass-vaporize-saturate",
            "glass-vaporize-panel",
            "glass-vaporize-blur",
        ]);

        for (const name of ["--vap-saturate", "--vap-blur", "--vap-ink-blur"]) {
            expect(PROPERTY_REGS_CSS).toMatch(
                new RegExp(`@property\\s+${name}\\s*\\{[^}]*syntax:`),
            );
        }
    });

    it("is a KEYFRAME exit, never a transition — reka's usePresence has no transitionend path", () => {
        // CWT F-11 (`:1343`): a transition-only dismissal is torn down in ~11ms, under one
        // frame, because `usePresence` awaits animationstart/animationend on animationName.
        expect(hasDecl(closed(), "animation")).toBe(true);
        expect(hasDecl(closed(), "transition")).toBe(false);
        expect(hasDecl(closed(), "transition-property")).toBe(false);
        // Neither backdrop keyframe writes a `0%`, so the release starts from the
        // element's own cascaded rung rather than from a value this sheet restates.
        for (const name of ["glass-vaporize-saturate", "glass-vaporize-blur"]) {
            expect(keyframeStops(name).some((stop) => stop.at === 0)).toBe(false);
        }
    });

    it("releases the panel's whole paint — plate, rim AND cast — from one keyframe", () => {
        const stops = keyframeStops("glass-vaporize-panel");
        expect(stops.some((stop) => stop.at === 0)).toBe(false);
        const decls = stops[0].decls;
        expect(decls.get("background-color")).toBe("transparent");
        expect(decls.get("border-color")).toBe("transparent");
        // Against `none` a shadow list interpolates as the same list with transparent
        // colours — the one line that releases ANY rung's stack without restating it. A
        // cast left standing over a released plate is the visible defect this prevents.
        expect(decls.get("box-shadow")).toBe("none");
    });
});

describe("the vaporize — TR#30's four amendments", () => {
    it("1 · is transform-free: nothing spatial moves, and the neutralisers say so", () => {
        // The recipe may write scale/translate ONLY as `none` (killing a co-composed
        // recipe's end-state). Any other value is a transform channel, which amendment 1
        // forbids outright.
        for (const rule of rules) {
            rule.walkDecls(/^(transform|scale|translate|rotate)$/, (decl) => {
                expect(
                    decl.value.trim(),
                    `${rule.selector} { ${decl.prop}: ${decl.value} }`,
                ).toBe("none");
            });
        }
        for (const name of keyframes.keys()) {
            if (!name.startsWith("glass-vaporize")) continue;
            for (const stop of keyframeStops(name)) {
                for (const prop of ["transform", "scale", "translate", "rotate"]) {
                    expect(stop.decls.has(prop), `${name} @ ${stop.at}`).toBe(false);
                }
            }
        }
    });

    it("2 · blur LEADS the fade, at half the element's own height, floored at 0.30", () => {
        expect(declOf(base(), "--vap-ink-blur")).toBe(
            `calc(${VAPORIZE_CONSTANTS.inkBlurHeightRatio} * var(--vap-height))`,
        );
        expect(declOf(base(), "--vap-ink-floor")).toBe(
            String(VAPORIZE_CONSTANTS.inkOpacityFloor),
        );

        const stops = keyframeStops("glass-vaporize-ink");
        const blurPeak = stops.find((s) => s.decls.get("filter") === "blur(var(--vap-ink-blur))");
        const floor = stops.find((s) => s.decls.get("opacity") === "var(--vap-ink-floor)");
        expect(blurPeak, "the ink blur never reaches its peak").toBeDefined();
        expect(floor, "the ink alpha never reaches its floor").toBeDefined();

        // LEADS: the blur has landed before the fade's collapse does, and the lead is the
        // mechanism's own ratio spent twice, not a second figure.
        expect(blurPeak!.at).toBeLessThan(floor!.at);
        expect(blurPeak!.at).toBeCloseTo(inkBlurFraction(), 4);
    });

    it("3 · the ink's collapse dies at 40% of travel and evaporates with the panel", () => {
        const stops = keyframeStops("glass-vaporize-ink");
        const floor = stops.find((s) => s.decls.get("opacity") === "var(--vap-ink-floor)");
        const gone = stops.find((s) => s.decls.get("opacity") === "0");
        expect(floor!.at).toBeCloseTo(VAPORIZE_CONSTANTS.inkCollapseFraction, 4);
        // Nothing may still be standing on a transparent plate: the residue reaches zero
        // exactly where the dim channel lands.
        expect(gone, "the ink never reaches zero").toBeDefined();
        expect(gone!.at).toBeCloseTo(channelFraction("dim"), 4);
        expect(declOf(ink(), "animation")).toBe(
            "glass-vaporize-ink var(--vap-clock) var(--vap-curve) both",
        );
    });

    it("no channel RESURRECTS — every animated property is pinned from its landing to 100%", () => {
        // css-animations-1 synthesises an implicit 100% keyframe from the element's
        // UNDERLYING value for any property whose stops end early, so a channel that
        // simply stops being mentioned interpolates BACK to where it started. Live on the
        // paused animation this read alpha 0 at 79.1% and 1.000 at 100% — the dismissed
        // toast returning from the dead over the last fifth of its own dismissal, with
        // every headless suite green. Every keyframe here names every one of its own
        // properties at 100%, and this arm is what keeps that true.
        //
        // The channels that LAND EARLY need the second clause: since the ratio is spent
        // as stops rather than as clocks, a channel is home well before 100% and must
        // HOLD there. Being merely mentioned at 100% is not holding — it may carry a
        // different value, which is the same resurrection by another route. So the last
        // stop before 100% and the 100% stop must agree, property for property.
        for (const name of keyframes.keys()) {
            if (!name.startsWith("glass-vaporize")) continue;
            const stops = keyframeStops(name);
            const touched = new Set(stops.flatMap((stop) => [...stop.decls.keys()]));
            const terminal = stops.find((stop) => stop.at === 1);
            expect(terminal, `${name} has no 100% stop`).toBeDefined();
            for (const prop of touched) {
                expect(terminal!.decls.has(prop), `${name} drops \`${prop}\` before 100%`).toBe(
                    true,
                );
            }
            const landing = stops.filter((stop) => stop.at < 1).at(-1);
            if (!landing) continue;
            for (const [prop, value] of landing.decls) {
                expect(
                    terminal!.decls.get(prop),
                    `${name} moves \`${prop}\` after it lands at ${landing.at}`,
                ).toBe(value);
            }
        }
    });

    it("4 · the backdrop outlives the panel by at least two frames at the shipped travel", () => {
        const travel = shippedTravelMs();
        expect(travel).toBeGreaterThan(0);
        const outlives = backdropOutlivesPanel(travel);
        expect(outlives).toBeGreaterThanOrEqual(2 * FRAME_MS);
        // Stated as the arithmetic, not as a remembered millisecond: the gap IS the
        // fraction of the travel the blur channel runs on alone.
        expect(outlives).toBeCloseTo(travel * (1 - channelFraction("dim")), 6);
    });
});

describe("the vaporize — composition with the reveal it does not replace", () => {
    it("is imported after reveal.css so its exit legs win at equal specificity", () => {
        const reveal = GLASS_CSS.indexOf('@import "./glass/reveal.css"');
        const dissolve = GLASS_CSS.indexOf('@import "./glass/dissolve.css"');
        expect(reveal).toBeGreaterThan(-1);
        expect(dissolve).toBeGreaterThan(reveal);
    });

    it("neutralises the reveal's closed-state statics, which is what keeps the effect alive", () => {
        // `.glass-reveal[data-state="closed"]` carries a squished scale, `opacity: 0` and a
        // filter blur as its non-supporting-engine floor. Statics apply on frame one. An
        // `opacity < 1` element also composites its backdrop-filter result at that alpha,
        // which would collapse all three channels onto one clock.
        expect(REVEAL_CSS).toContain('.glass-reveal[data-state="closed"]');
        expect(declOf(neutralisers(), "opacity")).toBe("1");
        expect(declOf(neutralisers(), "scale")).toBe("none");
        expect(declOf(neutralisers(), "translate")).toBe("none");
        expect(declOf(neutralisers(), "filter")).toBe("none");
    });

    it("WINS them, side by side — a neutraliser that is outranked neutralises nothing", () => {
        // The reveal re-states `translate` once per side at (0,3,0); a bare
        // `.glass-vaporize[data-state="closed"]` is (0,2,0) and loses, so a Popover or
        // Sheet taking this recipe would slide out with the arm above still green. Every
        // closed-state transform declaration the reveal writes must meet a neutraliser
        // selector that outranks or ties it (source order settles ties: dissolve.css is
        // @import-ed after reveal.css, asserted above).
        const mine = normalise(neutralisers().selector)
            .split(",")
            .map((selector) => specificity(selector));
        let answered = 0;
        postcss.parse(REVEAL_CSS).walkRules((rule) => {
            if (!rule.selector.includes('[data-state="closed"]')) return;
            let spatial = false;
            rule.walkDecls(/^(transform|scale|translate|rotate|opacity|filter)$/, () => {
                spatial = true;
            });
            if (!spatial) return;
            for (const selector of rule.selector.split(",")) {
                const theirs = specificity(selector);
                expect(
                    mine.some((ours) => outranks(ours, theirs)),
                    `nothing in the neutraliser answers \`${normalise(selector)}\``,
                ).toBe(true);
                answered += 1;
            }
        });
        expect(answered).toBeGreaterThanOrEqual(SIDES.length);
    });

    it("owns the root's OWN reduced-motion exit — the material release and the fade survive", () => {
        const reduced = keyframeStops("glass-vaporize-ink-reduced");
        expect(reduced.some((s) => s.decls.has("filter"))).toBe(false);
        expect(reduced.map((s) => s.decls.get("opacity"))).toEqual([
            "1",
            "var(--vap-ink-floor)",
            "0",
            "0",
        ]);

        // The carve must beat TWO rules or the surface simply vanishes: reveal.css's
        // UNLAYERED PRM `animation-name` (which only an `!important` can lose to) and
        // a11y-overrides.css's universal `animation-duration: 0.01ms !important` (which
        // only a LAYERED `!important` can lose to). Both halves, both selectors, or the
        // contract this recipe states in prose is false in paint — which it was, with a
        // source-text arm green over it.
        const carve = rules.filter((rule) => {
            const chain = ancestorAtRules(rule);
            return (
                chain.some((at) => /prefers-reduced-motion:\s*reduce/.test(at.params)) &&
                chain.some((at) => at.name === "layer" && at.params.trim() === "components")
            );
        });
        const rootCarve = carve.find(
            (rule) => normalise(rule.selector) === '.glass-vaporize[data-state="closed"]',
        );
        const inkCarve = carve.find(
            (rule) => normalise(rule.selector) === '.glass-vaporize[data-state="closed"] > *',
        );
        expect(rootCarve, "the root has no PRM exit of its own").toBeDefined();
        expect(inkCarve, "the ink has no PRM exit of its own").toBeDefined();
        for (const rule of [rootCarve!, inkCarve!]) {
            for (const prop of ["animation-name", "animation-duration"]) {
                expect(declOf(rule, prop)).not.toBe("");
                expect(
                    rule.toString(),
                    `${normalise(rule.selector)} { ${prop} } is not !important`,
                ).toMatch(new RegExp(`${prop}:[^;]*!important`));
            }
            expect(declOf(rule, "animation-duration")).toContain("var(--vap-clock)");
        }
        // ONE exit-name set, not two: the reduced path runs the same three channels the
        // root runs otherwise, so `Toaster.vue`'s removal guard covers both paths.
        expect(
            [...declOf(rootCarve!, "animation-name").matchAll(/glass-vaporize-[\w-]+/g)].map(
                (m) => m[0],
            ),
        ).toEqual(rootExitKeyframes());
        expect(declOf(inkCarve!, "animation-name")).toContain("glass-vaporize-ink-reduced");

        // MEMBERSHIP, ENUMERATED AND HASHED. A nonzero PRM clock is legitimate only
        // while it is a row in the register `a11y-overrides.css` itself points at — read
        // the pointer out of that file rather than restating the path here, so a stale
        // pointer reds too. And the row's digest must be THIS carve's: an authorization
        // that has drifted from the rule it authorizes is not an authorization.
        const register = A11Y_CSS.match(/(docs\/[\w./-]+\.md)\s*§PRM-AUTHORIZED-SET/);
        expect(
            register,
            "a11y-overrides.css no longer names its authorized-set register",
        ).not.toBeNull();
        const row = read(register![1])
            .split("\n")
            .find(
                (line) =>
                    /^\|\s*AUTH-\d+\s*\|/.test(line) && line.includes("glass/dissolve.css"),
            );
        expect(row, "the vaporize's PRM carve is not enumerated in the authorized set")
            .toBeDefined();
        expect(row).toContain('.glass-vaporize[data-state="closed"]');
        const carveText = DISSOLVE_CSS.slice(
            DISSOLVE_CSS.search(/^[^\S\n]*@media \(prefers-reduced-motion/m),
        );
        expect(row).toContain(
            createHash("sha256").update(carveText).digest("hex").slice(0, 8),
        );
    });
});

describe("the corner affordance — IOS27-ARCHIVE §3, adjudicated by CWT O-10", () => {
    it("puts the disc's centre ON the corner point, nudged inward by 6.5% of its diameter", () => {
        const host = ruleFor(".glass-corner-host");
        expect(declOf(host, "--corner-affordance-offset")).toBe(
            `calc( (${CORNER_AFFORDANCE.inwardNudge} - 0.5) * var(--corner-affordance-size) - var(--corner-affordance-host-border) )`,
        );
        // The host's rim is subtracted because an absolute child resolves against the
        // PADDING box while §3 measures against the corner POINT. Default 0px — most
        // hosts have no rim, and the one that does declares it.
        expect(declOf(host, "--corner-affordance-host-border")).toBe("0px");
        // ~70% of the disc floats free, which is only true while the offset is negative.
        expect(cornerAffordanceOffset()).toBeLessThan(0);
        // §3: "the parent must not clip" — a clipping host has half a disc, not a mark.
        expect(declOf(host, "overflow")).toBe("visible");
    });

    it("is the one element in the language that is NOT glass", () => {
        const disc = ruleFor(".glass-corner-affordance");
        expect(declOf(disc, "border")).toBe("0");
        expect(declOf(disc, "box-shadow")).toBe("none");
        expect(declOf(disc, "backdrop-filter")).toBe("none");
        expect(declOf(disc, "border-radius")).toBe("50%");
        // Separation is by VALUE, per §3's four-pixel boundary sample; the high-chroma arm
        // is a knob so the status badge can take it without every dismiss mark shouting.
        expect(declOf(disc, "background-color")).toContain("var(--foreground)");
        expect(disc.toString()).not.toMatch(/\bfilter:\s*blur/);
    });

    it("binds LAW 13 — the corner it sits on is the host's own vanishing point", () => {
        const corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
        const origins = ["left top", "right top", "left bottom", "right bottom"];
        corners.forEach((corner, index) => {
            const host = ruleFor(`.glass-corner-host[data-corner="${corner}"]`);
            expect(declOf(host, "transform-origin")).toBe(origins[index]);
            const placed = ruleFor(
                `.glass-corner-host[data-corner="${corner}"] > .glass-corner-affordance`,
            );
            // Both insets take the SAME offset — the centre is on the corner POINT.
            const values = new Set<string>();
            placed.walkDecls(/^inset-/, (decl) => values.add(decl.value.trim()));
            expect(values).toEqual(new Set(["var(--corner-affordance-offset)"]));
        });
    });

    it("grows the TARGET, not the mark, under a coarse pointer (G-COARSE-TARGET)", () => {
        const coarse = DISSOLVE_CSS.slice(DISSOLVE_CSS.indexOf("@media (pointer: coarse)"));
        expect(coarse).toContain(".glass-corner-affordance::after");
        expect(coarse).toContain(
            "inset: calc((var(--corner-affordance-size) - var(--touch-target)) / 2)",
        );
    });
});

/**
 * Every `.css` under `src/` (the whole cascade, not just the styles tree — a component
 * partial is as capable of authoring a release as a glass one).
 */
const allCssUnderSrc = (): Array<{ path: string; css: string }> => {
    const walk = (dir: string): string[] =>
        readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
            const path = join(dir, entry.name);
            return entry.isDirectory() ? walk(path) : path.endsWith(".css") ? [path] : [];
        });
    return walk(join(REPO_ROOT, "src")).map((path) => ({
        path: path.slice(REPO_ROOT.length + 1),
        css: readFileSync(path, "utf8"),
    }));
};

describe("the census — who releases a backdrop, and how many of them there are", () => {
    // THIS IS THE BORN-RED ARM. At the pre-cut tree it returns the empty set: every
    // dismissal in the library released its own pixels (scale / opacity / `filter`) and
    // NOTHING released the backdrop, which is the one thing the owner's ask names and the
    // one thing §4b measured. It is also the arm that bites a future "simplification":
    // fold the two backdrop channels back into one `backdrop-filter` transition and the
    // set empties again, with every other suite still green.
    const releasers = (): Map<string, string[]> => {
        const found = new Map<string, string[]>();
        for (const { path, css } of allCssUnderSrc()) {
            const root = postcss.parse(css);
            const consumed = new Set<string>();
            root.walkDecls(/^(?:-webkit-)?backdrop-filter$/, (decl) => {
                for (const match of decl.value.matchAll(/var\(\s*(--[\w-]+)/g)) {
                    consumed.add(match[1]);
                }
            });
            if (consumed.size === 0) continue;
            root.walkAtRules("keyframes", (at) => {
                at.walkDecls((decl) => {
                    if (!consumed.has(decl.prop)) return;
                    found.set(path, [...(found.get(path) ?? []), at.params.trim()]);
                });
            });
        }
        return found;
    };

    it("finds a backdrop RELEASE in the library, and finds it exactly once", () => {
        const found = releasers();
        // The keyframes and the consuming declaration are allowed to live in different
        // files (animations.css owns every @keyframes in this cascade), so the census runs
        // over the union the emitted bundle actually is.
        const bundle = allCssUnderSrc()
            .map(({ css }) => css)
            .join("\n");
        const root = postcss.parse(bundle);
        const consumed = new Set<string>();
        root.walkDecls(/^(?:-webkit-)?backdrop-filter$/, (decl) => {
            for (const match of decl.value.matchAll(/var\(\s*(--[\w-]+)/g)) {
                consumed.add(match[1]);
            }
        });
        const released = new Set<string>();
        root.walkAtRules("keyframes", (at) => {
            at.walkDecls((decl) => {
                if (consumed.has(decl.prop)) released.add(at.params.trim());
            });
        });
        expect([...released].sort()).toEqual([
            "glass-vaporize-blur",
            "glass-vaporize-saturate",
        ]);
        expect(found.size).toBe(0); // no single file both consumes and releases — by design
    });
});

describe("the dialect table — five exits, one built here", () => {
    it("names an owner for every dialect this row does not build", () => {
        expect(DISSOLVE_DIALECTS).toHaveLength(5);
        for (const row of DISSOLVE_DIALECTS) {
            expect(row.owner, row.dialect).toMatch(/#\d+/);
            expect(row.comment.length).toBeGreaterThan(0);
        }
        const built = DISSOLVE_DIALECTS.filter((row) => row.built).map((row) => row.dialect);
        // The row dissolve is not a sixth recipe: TR#30 folds it into the vaporize as two
        // of the four amendments, so both rows point at the same built mechanism.
        expect(built.sort()).toEqual(["row-dissolve", "vaporize"]);
        expect(dissolveDialect("vaporize").owner).toBe("#30 W-DISSOLVE");
    });

    it("keeps the measured ratio in ONE place — the table, and nowhere in src/", () => {
        // The census that matters: the measurement lives in the table, and the cascade
        // SPENDS it as the stop each channel lands on (checked against `channelFraction`
        // above). The figures themselves appear in no stylesheet at all — a second
        // written copy of a measurement is a second source of truth for it.
        expect(VAPORIZE_CONSTANTS.channelRatio).toEqual({
            saturate: 1,
            dim: 1.36,
            blur: 1.72,
        });
        const strip = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");
        for (const { path, css } of allCssUnderSrc()) {
            expect(strip(css), path).not.toMatch(/\b1\.72\b|\b1\.36\b/);
        }
    });
});
