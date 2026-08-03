// The contrast-safe ink resolver π (the JS half of the tonal
// register). The ink is a pure tone→ink map: value.js `safeAccentColor` shifts the
// ink's OKLCh lightness AWAY from the resolved active-band fill until it clears the
// contrast target. This test proves the contrast-safe CONTRACT holds for N synthetic
// tones in BOTH modes — the load-bearing invariant fourier asked for.

import { describe, expect, it, vi } from "vitest";
import { useAccentTone } from "@glass/composables/color";
import {
    convertColor,
    mixColors,
    type AnyColor,
    type ColorIssue,
    type Result,
} from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";

function value<T>(result: Result<T, ColorIssue>): T {
    if (!result.ok) throw new Error(result.error.code);
    return result.value;
}

function parse(css: string): AnyColor {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(parsed.diagnostics[0].code);
    return parsed.value;
}

function labOfCss(css: string): [number, number, number] {
    return [...value(convertColor(parse(css), "oklab")).channels] as [number, number, number];
}
/** The band fill = color-mix(in oklab, surface, tone 18%). */
function band(surfaceCss: string, toneCss: string, p = 0.18): AnyColor {
    return value(mixColors(parse(surfaceCss), parse(toneCss), p, { space: "oklab" }));
}
function relLum(color: AnyColor) {
    const [r, g, b] = value(convertColor(color, "srgb-linear")).channels as readonly number[];
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}
function wcag(a: AnyColor, b: AnyColor) {
    const l1 = relLum(a), l2 = relLum(b), hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
}

const LIGHT_CARD = "hsl(36 48% 97%)";
const DARK_CARD = "hsl(24 8% 16%)";

// carved the ink SOLVE behind a dynamic import (the value.js
// quarantine — the eager /chip chunk stays value.js-free): `ink` is the synchronous
// interim "" until the solve leaf loads and the reactive counter bumps. The contract
// tests await that settle; the CONTRACT itself (contrast-safe ink) is unchanged.
async function settledInk(get: () => string): Promise<string> {
    await vi.waitFor(() => {
        if (get() === "") throw new Error("ink not yet resolved");
    });
    return get();
}

// N synthetic tones spanning the wheel + the L axis (chromatic + near-ink).
const TONES = [
    "oklch(0.532 0.180 317.5)", // violet
    "oklch(0.542 0.089 222.8)", // teal
    "oklch(0.623 0.124 69.6)", // amber (light)
    "oklch(0.813 0.109 78.2)", // amber (dark arm)
    "oklch(0.35 0.15 264)", // deep blue
    "oklch(0.9 0.05 100)", // pale yellow
    "#1a1a2e", // near-black navy
    "#ffd166", // warm gold
    "oklch(0.55 0.2 30)", // orange-red
    "oklch(0.7 0.15 145)", // green
];

describe("useAccentTone controlled cache boundaries", () => {
    it("quietly caches a rejected lazy module for every same-key consumer", async () => {
        const unhandled: unknown[] = [];
        const onUnhandled = (reason: unknown) => unhandled.push(reason);
        process.on("unhandledRejection", onUnhandled);
        try {
            vi.resetModules();
            vi.doMock("@glass/composables/color/accent-tone-solve", () => {
                throw new Error("controlled optional module absence");
            });
            const { useAccentTone: isolatedUseAccentTone } = await import(
                "@glass/composables/color/useAccentTone"
            );
            const sameA = isolatedUseAccentTone(() => "#d14a7c");
            const sameB = isolatedUseAccentTone(() => "#d14a7c");
            const differentA = isolatedUseAccentTone(() => "#2a7bd6");
            const differentB = isolatedUseAccentTone(() => "#2a7bd6");
            for (const consumer of [sameA, sameB, differentA, differentB]) {
                expect(consumer.ink.value).toBe("");
            }
            await new Promise((resolve) => setTimeout(resolve, 0));
            for (const consumer of [sameA, sameB, differentA, differentB]) {
                expect(consumer.ink.value).toBe("");
            }
            const postReject = isolatedUseAccentTone(() => "#4c9f70");
            expect(postReject.ink.value).toBe("");
            await vi.waitFor(() => expect(postReject.ink.value).toBe(""));
            await new Promise((resolve) => setTimeout(resolve, 0));
            expect(unhandled).toEqual([]);
        } finally {
            vi.doUnmock("@glass/composables/color/accent-tone-solve");
            process.removeListener("unhandledRejection", onUnhandled);
            vi.resetModules();
        }
    });

    it("degrades a solver failure to the CSS fallback ink with one warning", async () => {
        const unhandled: unknown[] = [];
        const onUnhandled = (reason: unknown) => unhandled.push(reason);
        process.on("unhandledRejection", onUnhandled);
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        try {
            vi.resetModules();
            const { useAccentTone: isolatedUseAccentTone } = await import("@glass/composables/color/useAccentTone");
            const failedA = isolatedUseAccentTone(() => "not-a-color");
            const failedB = isolatedUseAccentTone(() => "not-a-color");
            const healthy = isolatedUseAccentTone(() => "#2a7bd6");
            expect(failedA.ink.value).toBe("");
            expect(failedB.ink.value).toBe("");
            expect(healthy.ink.value).toBe("");
            await vi.waitFor(() => {
                expect(healthy.ink.value).toMatch(/^oklch\(/);
                expect(warn).toHaveBeenCalledTimes(1);
            });
            // The failed key stays terminal: the CSS fallback ink, no throw, no retry.
            expect(failedA.ink.value).toBe("");
            expect(failedB.ink.value).toBe("");
            expect(isolatedUseAccentTone(() => "not-a-color").ink.value).toBe("");
            await new Promise((resolve) => setTimeout(resolve, 0));
            expect(warn).toHaveBeenCalledTimes(1);
            expect(unhandled).toEqual([]);
        } finally {
            warn.mockRestore();
            process.removeListener("unhandledRejection", onUnhandled);
            vi.resetModules();
        }
    });
});

describe("useAccentTone — the contrast-safe ink contract", () => {
    it("a var(--…) tone passes through (no resolved override — the CSS fallback ink)", () => {
        const { ink, toneStyle } = useAccentTone(() => "var(--section-color-7)");
        expect(ink.value).toBe("");
        expect(toneStyle.value["--tone"]).toBe("var(--section-color-7)");
        // no resolved override is emitted — the CSS `var(--accent-ink-resolved, …)`
        // fallback carries the ink for the pure-cascade path.
        expect(toneStyle.value["--accent-ink-resolved"]).toBeUndefined();
    });

    it("a concrete tone resolves an oklch() ink + emits the override", async () => {
        const { ink, toneStyle } = useAccentTone(() => "oklch(0.532 0.180 317.5)");
        await settledInk(() => ink.value);
        expect(ink.value).toMatch(/^oklch\(/);
        expect(toneStyle.value["--accent-ink-resolved"]).toBe(ink.value);
    });

    it("settles every concurrent same-key consumer and keeps different keys independent", async () => {
        const sameKey = "oklch(0.471 0.137 123.4)";
        const otherKey = "oklch(0.471 0.137 124.4)";
        const first = useAccentTone(() => sameKey);
        const second = useAccentTone(() => sameKey);
        const other = useAccentTone(() => otherKey);

        expect(first.ink.value).toBe("");
        expect(second.ink.value).toBe("");
        expect(other.ink.value).toBe("");
        await Promise.all([
            settledInk(() => first.ink.value),
            settledInk(() => second.ink.value),
            settledInk(() => other.ink.value),
        ]);
        expect(second.ink.value).toBe(first.ink.value);
        expect(other.ink.value).toMatch(/^oklch\(/);
    });

    it("over the LIGHT card: the band is light, so the ink resolves DARK", async () => {
        const { ink } = useAccentTone(() => "oklch(0.35 0.15 264)", { surface: LIGHT_CARD });
        await settledInk(() => ink.value);
        const inkLab = labOfCss(ink.value);
        // dark ink over the light band — ink L well below the band L.
        expect(inkLab[0]).toBeLessThan(0.6);
    });

    it("over the DARK card: the band is dark, so the ink resolves LIGHT", async () => {
        const { ink } = useAccentTone(() => "oklch(0.739 0.134 318.1)", { surface: DARK_CARD });
        await settledInk(() => ink.value);
        const inkL = Number(ink.value.match(/oklch\(([\d.]+)/)![1]);
        expect(inkL).toBeGreaterThan(0.6);
    });

    it("the resolved ink ALWAYS clears 4.5:1 over the band — every tone, both modes", async () => {
        for (const surface of [LIGHT_CARD, DARK_CARD]) {
            for (const tone of TONES) {
                const { ink } = useAccentTone(() => tone, { surface });
                await settledInk(() => ink.value);
                const ratio = wcag(parse(ink.value), band(surface, tone));
                expect(
                    ratio,
                    `ink-over-band for tone=${tone} on ${surface} was ${ratio.toFixed(2)}:1`,
                ).toBeGreaterThanOrEqual(4.5);
            }
        }
    });

    it("a tighter inkContrast target is honored (the ink lifts further)", async () => {
        const tone = "oklch(0.55 0.2 30)";
        const loose = useAccentTone(() => tone, { surface: LIGHT_CARD, inkContrast: 4.5 });
        const tight = useAccentTone(() => tone, { surface: LIGHT_CARD, inkContrast: 7 });
        await settledInk(() => loose.ink.value);
        await settledInk(() => tight.ink.value);
        const looseRatio = wcag(parse(loose.ink.value), band(LIGHT_CARD, tone));
        const tightRatio = wcag(parse(tight.ink.value), band(LIGHT_CARD, tone));
        expect(tightRatio).toBeGreaterThan(looseRatio);
    });

    it("an unparseable concrete tone fails explicitly", async () => {
        const { solveAccentInk: actualSolveAccentInk } = await vi.importActual<
            typeof import("@glass/composables/color/accent-tone-solve")
        >("@glass/composables/color/accent-tone-solve");
        expect(() => actualSolveAccentInk("not-a-color")).toThrow(
            /solveAccentInk:tone/,
        );
    });
});
