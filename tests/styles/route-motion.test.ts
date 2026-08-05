// BK #29 W-ROUTE-MOTION — the close-battery arms for the seated MOTION gate G-NO-FLASH.
//
// WAVES:659 states the gate as a frame assertion: "no route change produces a frame whose
// mean luminance deviates beyond threshold from both its endpoints." That is a π
// measurement, and it is taken live at the row's capture. What a headless arm can hold —
// and what nothing held before this file — is the MECHANISM that assertion depends on.
//
// THE FLASH IS AN ALPHA DEFECT, AND IT HAS EXACTLY ONE SHAPE. The two halves of a View
// Transition's root pair are composited under `mix-blend-mode: plus-lighter`, so the page
// stays at full opacity through the swap if and only if α_old(t) + α_new(t) = 1 at every
// t. Give either half a spring curve and the sum dips mid-flight; over a light page a sum
// below 1 IS the white flash, and over a dark one it is the black one. BK ⊕²¹ cured
// exactly this on the root pair and then nothing kept it cured — the linear clock was one
// careless retune away from coming back, with every suite green.
//
// So the arms below hold the invariant numerically rather than by inspection: the
// keyframes are parsed, the two alpha curves are sampled, and the sum is asserted at every
// sample. A retune to a spring, a duration split, or a non-complementary keyframe all
// fail it, and each of those is a mutation this file was bitten with.
//
// SCOPE, STATED. Three things this cannot see, all of them by construction:
//   1. Real luminance. A frame is paint; this is source. The π capture is the frame half.
//   2. A consumer's own root-pair override in ITS stylesheet. The arms read the library's
//      grammar block, which is the only place the library authors one.
//   3. Whether the runtime typed the transition at all. `routeTransition` is the one
//      writer of those types and its own arms are at the foot of this file, but a caller
//      reaching past it into `startViewTransition` gets the untyped default and no rule
//      here applies to it. That is the substrate's documented contract, not a hole.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import postcss, { type AtRule, type Rule } from "postcss";
import { describe, expect, it } from "vitest";

import {
    ROUTE_CONSTANTS,
    ROUTE_GRAMMAR,
    foregroundClockToken,
    foregroundCurveToken,
    routeNav,
    worldClockToken,
    type RouteNavRow,
} from "../../src/composables/motion/route/routeGrammar";

const REPO_ROOT = process.cwd();
const readCss = (rel: string): string =>
    readFileSync(join(REPO_ROOT, "src/styles", rel), "utf8");

const VIEW_TRANSITION_CSS = readCss("view-transition.css");
const REGISTERS_CSS = readCss("tokens/motion-registers.css");
const SPRING_CSS = readCss("tokens/scheme-spring.css");

const vtRoot = postcss.parse(VIEW_TRANSITION_CSS);

/** Every `@keyframes` in the grammar's own stylesheet, by name. */
const keyframes = new Map<string, AtRule>();
vtRoot.walkAtRules("keyframes", (at) => keyframes.set(at.params.trim(), at));

/** Every ordinary rule in the grammar's stylesheet, selector-normalised. */
const rules: Rule[] = [];
vtRoot.walkRules((rule) => {
    if (rule.parent?.type === "atrule") return;
    rules.push(rule);
});

const declOf = (rule: Rule, prop: string): string | null => {
    let value: string | null = null;
    rule.walkDecls(prop, (decl) => {
        value = decl.value.trim();
    });
    return value;
};

/** The declared value of a `:root` custom property, from whichever file declares it. */
function tokenValue(css: string, token: string): string | null {
    const match = css.match(
        new RegExp(`(?:^|[;{\\s])${token}\\s*:\\s*([^;{}]+);`, "m"),
    );
    return match ? match[1]!.trim() : null;
}

// ── The alpha model ──────────────────────────────────────────────────────────────────
//
// A keyframe body that writes `opacity` and nothing else is a pure alpha curve, and a
// linear-timed animation over it is a straight line between its stops. That is enough to
// integrate the pair exactly, which is why the grammar keeps opacity in keyframes of its
// own and every other channel in separate ones.

interface AlphaStop {
    readonly at: number;
    readonly opacity: number;
}

function alphaStops(name: string): AlphaStop[] {
    const at = keyframes.get(name);
    if (!at) throw new Error(`route grammar: no @keyframes ${name}`);
    const stops: AlphaStop[] = [];
    at.walkRules((frame) => {
        const opacity = declOf(frame, "opacity");
        for (const selector of frame.selector.split(",")) {
            const key = selector.trim();
            const offset =
                key === "from" ? 0 : key === "to" ? 1 : Number.parseFloat(key) / 100;
            if (!Number.isFinite(offset)) continue;
            // An absent `opacity` at a stop means "the element's own value", which for a
            // VT snapshot is 1 — the same default the UA animation assumes.
            stops.push({ at: offset, opacity: opacity === null ? 1 : Number(opacity) });
        }
    });
    // A one-sided keyframe (`from { opacity: 0 }`) implies its other end at 1.
    if (!stops.some((s) => s.at === 0)) stops.push({ at: 0, opacity: 1 });
    if (!stops.some((s) => s.at === 1)) stops.push({ at: 1, opacity: 1 });
    return stops.sort((a, b) => a.at - b.at);
}

function alphaAt(stops: readonly AlphaStop[], t: number): number {
    for (let i = 1; i < stops.length; i++) {
        const lo = stops[i - 1]!;
        const hi = stops[i]!;
        if (t <= hi.at) {
            const span = hi.at - lo.at;
            const k = span === 0 ? 0 : (t - lo.at) / span;
            return lo.opacity + (hi.opacity - lo.opacity) * k;
        }
    }
    return stops[stops.length - 1]!.opacity;
}

// ── The generated settles, read from the ONE place they are written ──────────────────

function settleSeconds(token: string): number {
    const raw = tokenValue(SPRING_CSS, token);
    if (raw === null) throw new Error(`no such generated token: ${token}`);
    // ONLY a BARE `0.45s` is a figure. Anything else is an expression, and a loose read of
    // one answers with whatever number it meets first: `calc(clamp(0.12s, var(--spring-
    // panel-settle) * 0.6, 0.25s) * var(--motion-tempo))` reads as 0.12 for a clock that
    // ships at 0.25, which measured half the shipped exit and left the re-derivation below
    // as dead code.
    const literal = raw.match(/^\s*(-?[\d.]+)s\s*$/);
    if (literal) return Number(literal[1]);
    // A `-duration` / `-exit-duration` reader is a calc over its own `-settle`; resolve
    // it through the same arithmetic the generator emits rather than restating a figure.
    const settle = token.replace(/-(?:exit-)?duration$/, "-settle");
    const base = settleSeconds(settle);
    return token.endsWith("-exit-duration")
        ? Math.min(0.25, Math.max(0.12, base * 0.6))
        : base;
}

const foregroundEnd = (row: RouteNavRow): number =>
    settleSeconds(foregroundClockToken(row));

function worldEnd(row: RouteNavRow): number {
    const token = worldClockToken(row);
    if (!token) return 0;
    return (
        (row.worldWaitsForForeground ? foregroundEnd(row) : 0) + settleSeconds(token)
    );
}

// ── The rules the grammar authors on the root pair ───────────────────────────────────

const ROOT_PAIR = /::view-transition-(old|new)\(root\)/;
const rootPairRules = rules.filter((rule) => ROOT_PAIR.test(rule.selector));

/** The nav classes a `:active-view-transition-type()` selector forks on. */
function typesOf(selector: string): string[] {
    const match = selector.match(/:active-view-transition-type\(([^)]*)\)/);
    return match ? match[1]!.split(",").map((type) => type.trim()) : [];
}

/** The ALPHA leg of a comma-list — every multi-leg rule in the grammar puts it first. */
const alphaLeg = (value: string | null): string | null =>
    value === null ? null : value.split(",")[0]!.trim();

/** The clock the ROOT pair runs on in one class — that class's own conserved clock. */
function rootClockOf(type: string): string {
    const clocks = new Set(
        rootPairRules
            .filter((rule) => typesOf(rule.selector).includes(type))
            .map((rule) => alphaLeg(declOf(rule, "animation-duration")))
            .filter((value): value is string => value !== null),
    );
    expect(clocks.size, `${type}: the root pair does not state one clock`).toBe(1);
    return [...clocks][0]!;
}

/**
 * Every OLD/NEW pair the grammar composites, by the keyframe each half rides.
 *
 * The root pair is not the only one, and learning that cost this row a cure. A departure
 * held opaque over an arrival fading in ordinarily sums to 1.9 mid-flight — the same
 * additive defect, pointed the other way, painting a magnified double exposure instead of
 * a white frame. It survived an arm that read only the root, and it was found in paint.
 */
const COMPOSITED_PAIRS: ReadonlyArray<readonly [string, string, string]> = [
    ["root cross-fade", "gl-vt-route-out", "gl-vt-route-in"],
    ["the window's handover", "gl-vt-route-out", "gl-vt-route-in"],
    ["the collapse cut", "gl-route-cut", "gl-route-cut-in"],
];

function worstSumError(outName: string, inName: string): number {
    const out = alphaStops(outName);
    const inn = alphaStops(inName);
    return Array.from({ length: 201 }, (_, i) => i / 200).reduce(
        (acc, t) => Math.max(acc, Math.abs(alphaAt(out, t) + alphaAt(inn, t) - 1)),
        0,
    );
}

describe("G-NO-FLASH — the route grammar conserves alpha", () => {
    it("sums every composited pair to 1 at every t, not only the root's", () => {
        for (const [label, outName, inName] of COMPOSITED_PAIRS) {
            expect(worstSumError(outName, inName), label).toBeLessThan(1e-9);
        }
    });

    it("leaves no alpha keyframe in the grammar without a conserving twin", () => {
        // Scoped to the ROUTE grammar's own rules. The `.gl-list-item` group's
        // `:only-child` slide keyframes also write opacity and are deliberately
        // UNPAIRED — a member present in exactly one state has nothing to conserve
        // against, which is the whole meaning of that selector. Pulling them in would
        // make the arm demand a twin for a thing that by definition has none.
        const authored = new Set<string>();
        for (const rule of rules) {
            if (!rule.selector.includes(":active-view-transition-type(")) continue;
            const names = declOf(rule, "animation-name");
            if (!names) continue;
            for (const n of names.split(",")) {
                const name = n.trim();
                if (!/opacity/.test(keyframes.get(name)?.toString() ?? "")) continue;
                authored.add(name);
            }
        }
        const paired = new Set(COMPOSITED_PAIRS.flatMap(([, o, i]) => [o, i]));
        expect([...authored].filter((n) => !paired.has(n))).toEqual([]);
        // …and the census is not vacuous.
        expect(authored.size).toBeGreaterThanOrEqual(4);
    });

    it("rides an UNMATCHED window on the root pair's own curve and clock, per class", () => {
        // A named half with no partner is composited over the root pair, not against a
        // twin, so its own handover clock is exactly wrong: it reaches α=1 while the root
        // pair is still conserving to 1 and the rect sums to ~1.9. Over the unmatched rect
        // the sum is `α_root-other-half + α_window`, which is 1 iff the window rides the
        // ROOT curve on the ROOT clock — so that is what the `:only-child` fork writes,
        // per class, because the root's clock is per class.
        const HALVES = [
            ["old", "gl-vt-route-out"],
            ["new", "gl-vt-route-in"],
        ] as const;
        for (const row of ROUTE_GRAMMAR) {
            if (row.nav === "route") continue; // no window is named, so none can be unmatched
            const clock = rootClockOf(row.nav);
            for (const [half, keyframe] of HALVES) {
                const forks = rules.filter(
                    (rule) =>
                        rule.selector.includes(
                            `::view-transition-${half}(gl-route-window):only-child`,
                        ) && typesOf(rule.selector).includes(row.nav),
                );
                const where = `${row.nav}/${half}`;
                expect(forks.length, `${where}: no :only-child fork`).toBe(1);
                const fork = forks[0]!;
                expect(alphaLeg(declOf(fork, "animation-name")), where).toBe(keyframe);
                expect(alphaLeg(declOf(fork, "animation-duration")), where).toBe(clock);
                expect(alphaLeg(declOf(fork, "animation-timing-function")), where).toBe(
                    "linear",
                );
            }
        }
    });

    it("clocks both halves of the pair identically in every class", () => {
        for (const row of ROUTE_GRAMMAR) {
            const type = row.nav;
            const durations = new Set(
                rootPairRules
                    .filter((rule) => rule.selector.includes(`(${type})`))
                    .map((rule) => declOf(rule, "animation-duration"))
                    .filter((v): v is string => v !== null)
                    // A multi-leg list clocks the ALPHA leg first; the world channels
                    // that follow it are free to run on their own.
                    .map((v) => v.split(",")[0]!.trim()),
            );
            expect(durations.size, `${type} splits its root-pair alpha clock`).toBe(1);
        }
    });

    it("times every alpha leg linearly — a spring on this channel IS the flash", () => {
        for (const rule of rootPairRules) {
            const timing = declOf(rule, "animation-timing-function");
            if (timing === null) continue;
            expect(
                timing.split(",")[0]!.trim(),
                `${rule.selector} curves its alpha leg`,
            ).toBe("linear");
        }
    });

    it("keeps every non-alpha channel out of the alpha keyframes, and vice versa", () => {
        for (const [name, at] of keyframes) {
            if (!name.startsWith("gl-route-") && !name.startsWith("gl-vt-route-"))
                continue;
            const props = new Set<string>();
            at.walkDecls((decl) => props.add(decl.prop));
            const alpha = props.has("opacity");
            const spatial = ["translate", "scale", "filter", "transform"].some((p) =>
                props.has(p),
            );
            expect(
                alpha && spatial,
                `@keyframes ${name} mixes alpha with a spatial channel`,
            ).toBe(false);
        }
    });
});

describe("the route grammar — the CSS registers mirror the table", () => {
    it("binds each class to the row its table names, and to no figure", () => {
        for (const row of ROUTE_GRAMMAR) {
            expect(tokenValue(REGISTERS_CSS, `--route-${row.nav}-spring`)).toBe(
                `var(${foregroundCurveToken(row)})`,
            );
            expect(tokenValue(REGISTERS_CSS, `--route-${row.nav}-clock`)).toBe(
                `var(${foregroundClockToken(row)})`,
            );
        }
        expect(tokenValue(REGISTERS_CSS, "--route-world-clock")).toBe(
            `var(${worldClockToken(routeNav("zoom"))})`,
        );
        expect(tokenValue(REGISTERS_CSS, "--route-world-exit-clock")).toBe(
            `var(${worldClockToken(routeNav("collapse"))})`,
        );
    });

    it("takes a bezier on the exit and a spring nowhere near it (§7)", () => {
        const collapse = routeNav("collapse");
        expect(collapse.foreground).toBeNull();
        expect(tokenValue(REGISTERS_CSS, "--route-collapse-spring")).toBe(
            "var(--ease-in)",
        );
        expect(tokenValue(REGISTERS_CSS, "--route-collapse-spring")).not.toMatch(
            /--spring-/,
        );
    });

    it("carries the codex's measured constants at one CSS site each, on the table's values", () => {
        const mirrored: Array<[string, string]> = [
            ["--route-inhale-scale", String(ROUTE_CONSTANTS.inhaleScale)],
            ["--route-inhale-clock", `${ROUTE_CONSTANTS.inhaleMs}ms`],
            ["--route-parallax", String(ROUTE_CONSTANTS.parallax)],
        ];
        for (const [token, expected] of mirrored) {
            expect(tokenValue(REGISTERS_CSS, token)).toBe(expected);
            const declarations = REGISTERS_CSS.match(
                new RegExp(`${token}\\s*:`, "g"),
            );
            expect(declarations?.length, `${token} is declared twice`).toBe(1);
        }
    });

    it("restates no constant and no --route-* token anywhere else in src/", () => {
        // THE CENSUS IS THE CLAIM THE SHIPPED COMMENTS MAKE, AND IT READS THE WHOLE TREE.
        // A constant fenced at one site is only fenced if something looks everywhere else,
        // and an arm that reads back the file it is fencing proves nothing: a duplicate
        // `--route-inhale-scale` planted in a neighbouring token sheet stayed green under
        // one that did. Comments are prose and string literals are data, so both are
        // stripped before the look.
        const CANONICAL = [
            "src/composables/motion/route/routeGrammar.ts",
            "src/styles/tokens/motion-registers.css",
        ];
        const files: string[] = [];
        const walk = (dir: string): void => {
            for (const entry of readdirSync(dir)) {
                const path = join(dir, entry);
                if (statSync(path).isDirectory()) walk(path);
                else if (/\.(ts|css|vue)$/.test(entry)) files.push(path);
            }
        };
        walk(join(REPO_ROOT, "src"));

        const valueText = (source: string): string =>
            source
                .replace(/\/\*[\s\S]*?\*\//g, " ")
                .replace(/(^|[^:"'`\\])\/\/[^\n]*/g, "$1 ")
                .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
                .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
                .replace(/`(?:[^`\\]|\\.)*`/g, "``");

        // A stylesheet writes a duration with its unit; a module writes the millisecond
        // count. `1.57` and the parallax ratio are dimensionless in both.
        const FORMS: ReadonlyArray<{
            readonly literal: RegExp;
            readonly scope: "styles" | "modules";
        }> = [
            { literal: /(?<![\w.$-])1\.57(?![\w.])/, scope: "styles" },
            { literal: /(?<![\w.$-])1\.57(?![\w.])/, scope: "modules" },
            { literal: /(?<![\w.$-])42ms(?![\w.])/, scope: "styles" },
            { literal: /(?<![\w.$-])42(?![\w.])/, scope: "modules" },
            { literal: /(?<![\w.$-])0\.125(?![\w.])/, scope: "styles" },
            { literal: /(?<![\w.$-])0\.125(?![\w.])/, scope: "modules" },
        ];
        // Every stylesheet in the library, and every module on the MOTION surface. A
        // dimensionless 0.125 elsewhere in `src/` is a different quantity that happens to
        // share a value — `staffGeometry`'s thirty-second note is 0.125 BEATS — and a
        // census that called that a restatement would be a census nobody could keep green.
        const inScope = (file: string, scope: string): boolean =>
            scope === "styles"
                ? /\.(css|vue)$/.test(file)
                : file.endsWith(".ts") &&
                  file.startsWith(join(REPO_ROOT, "src/composables/motion"));

        const restated = new Set<string>();
        const routeTokens = new Map<string, Set<string>>();
        for (const file of files) {
            const text = valueText(readFileSync(file, "utf8"));
            const rel = relative(REPO_ROOT, file);
            for (const { literal, scope } of FORMS) {
                if (!inScope(file, scope)) continue;
                if (literal.test(text)) restated.add(rel);
            }
            for (const [, token] of text.matchAll(/(--route-[\w-]+)\s*:/g)) {
                routeTokens.set(token, (routeTokens.get(token) ?? new Set()).add(rel));
            }
        }

        expect([...restated].sort()).toEqual(CANONICAL);
        // …and every register the grammar reads is declared at exactly one site.
        expect(routeTokens.size).toBeGreaterThanOrEqual(3);
        for (const [token, sites] of routeTokens) {
            expect([...sites], `${token} is declared in more than one file`).toEqual([
                "src/styles/tokens/motion-registers.css",
            ]);
        }
    });

    it("cuts the held opacity at the table's tenth", () => {
        const cut = keyframes.get("gl-route-cut");
        expect(cut).toBeDefined();
        const held = alphaStops("gl-route-cut")
            .filter((s) => s.opacity === 1)
            .map((s) => s.at);
        expect(Math.max(...held)).toBeCloseTo(ROUTE_CONSTANTS.opacityCutAt, 10);
    });
});

describe("the route grammar — the world outlives the foreground", () => {
    it("finishes the world last in every class that moves a window", () => {
        for (const row of ROUTE_GRAMMAR) {
            if (!row.world) continue;
            expect(
                worldEnd(row),
                `${row.nav}: the world does not outlive its foreground`,
            ).toBeGreaterThan(foregroundEnd(row));
        }
    });

    it("reports the shipped world:foreground multiples rather than asserting a band", () => {
        // EXEMPLARS-CODEX I4 measures 1.7-2x on Apple's clocks. Ours are table-fixed by
        // BK #26 and no row may own a second job, so the multiple is whatever the two
        // named rows produce — recorded here, never tuned to fit. `collapse` lands inside
        // the band; `zoom` and `lateral` bracket it.
        const measured = Object.fromEntries(
            ROUTE_GRAMMAR.filter((r) => r.world).map((r) => [
                r.nav,
                Number((worldEnd(r) / foregroundEnd(r)).toFixed(3)),
            ]),
        );
        expect(measured).toEqual({ zoom: 1.267, lateral: 2.714, collapse: 2 });
    });
});

describe("the route grammar — non-dock, and one window at a time", () => {
    it("names no dock anywhere in the grammar (GREENFIELD-TERMINAL R-D)", () => {
        for (const rule of rules) {
            expect(
                /dock/i.test(rule.selector),
                `${rule.selector} pulls the dock into the route grammar`,
            ).toBe(false);
        }
        // Prose is not paint: the file's own record of the RETIRED dock-collapse recipe
        // names `.gl-dock-layer` in a comment, and striking that sentence to satisfy a
        // detector would delete the reason the retirement is legible. The census reads
        // declarations.
        const declared: string[] = [];
        vtRoot.walkDecls((decl) => declared.push(decl.value));
        expect(declared.filter((value) => /dock/i.test(value))).toEqual([]);
    });

    it("clips the window group — the difference between arriving and spilling", () => {
        // A snapshot lays out at the group's inline size with its OWN aspect, so a tall
        // page flying into a short cell paints far outside the rect it is travelling to.
        // Found in paint, not in source; §9.6's "revealed by clip" is the cure and this
        // is what holds it.
        const clip = rules.filter(
            (rule) =>
                rule.selector.includes("::view-transition-group(gl-route-window)") &&
                declOf(rule, "overflow") !== null,
        );
        expect(clip.length).toBe(1);
        expect(declOf(clip[0]!, "overflow")).toBe("clip");
    });

    it("hands persistent chrome its own class, resolved on the handover clock", () => {
        // Chrome present in BOTH states is not the world: unnamed it recedes against its
        // own unmoved copy, and named without a clock it dissolves on the UA's quarter
        // second while its contents swap. Also found in paint.
        const chrome = rules.filter((rule) =>
            rule.selector.includes(".gl-route-chrome"),
        );
        expect(chrome.length).toBe(1);
        expect(declOf(chrome[0]!, "animation-duration")).toBe(
            "var(--route-inhale-clock)",
        );
        for (const part of ["group", "old", "new"]) {
            expect(chrome[0]!.selector).toContain(
                `::view-transition-${part}(.gl-route-chrome)`,
            );
        }
    });

    it("forks every CLOCK and CURVE off a type, never off a bare pseudo", () => {
        // Geometry that is true of the window in every class (the clip) is deliberately
        // untyped — a class fork on it would be four copies of one rule. What must be
        // typed is anything that decides a class's timing.
        const timed = rules.filter(
            (rule) =>
                rule.selector.includes("(gl-route-window)") &&
                (declOf(rule, "animation-duration") !== null ||
                    declOf(rule, "animation-timing-function") !== null),
        );
        expect(timed.length).toBeGreaterThan(0);
        for (const rule of timed) {
            expect(rule.selector).toMatch(/:active-view-transition-type\(/);
        }
    });
});
