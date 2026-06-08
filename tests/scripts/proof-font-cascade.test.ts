// AX.W22 — unit bite-tests for the proof:font-cascade detectors.
//
// The gate's device-free arm is a set of pure detectors over CSS/source text.
// These tests freeze the born-RED → GREEN witnesses: the reconciled brand
// default passes; the pre-wave Fraunces/Computer-Modern default + the
// data-typography-preset escape-hatch + a non-shipped FONT_OPTIONS face each
// RED. A `.cm-serif` collateral-delete or a brand-text math voice also RED.

import { describe, expect, it } from "vitest";
import {
    assertDefaultRegister,
    assertMathVoice,
    assertReferences,
    bodyFontToken,
    deriveShipped,
    splitStack,
    tokenStacks,
    tokenValue,
} from "../../scripts/proof-font-cascade.mjs";

const SHIPPED_FONTS_CSS = `
@font-face { font-family: "Plus Jakarta Sans"; src: url("x.woff2"); }
@font-face { font-family: "Plus Jakarta Sans Fallback"; }
@font-face { font-family: "Fira Code"; src: url("y.woff2"); }
@font-face { font-family: "Fira Code Fallback"; }
`;

const RECONCILED_TOKENS = `:root {
    --font-stack-text: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif;
    --font-stack-display: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif;
    --font-stack-sans: "Helvetica Neue", system-ui, sans-serif;
    --font-stack-serif: Georgia, "Times New Roman", serif;
    --font-stack-mono: "Fira Code", "Fira Code Fallback", monospace;
}`;

const RECONCILED_TYPOGRAPHY = `
body { font-family: var(--font-text); color: var(--foreground); }
@utility cm-serif { font-family: var(--font-serif); }
`;

const PREWAVE_TOKENS = `:root {
    --font-stack-display: "Fraunces", Georgia, serif;
    --font-stack-serif: "Computer Modern Serif", "Latin Modern Roman", Georgia, serif;
    --font-stack-sans: "Helvetica Neue", system-ui, sans-serif;
    --font-stack-mono: "Fira Code", monospace;
}`;

const PREWAVE_TYPOGRAPHY = `
:root[data-typography-preset="brand-uniform-sans"] { --font-serif: var(--font-brand-sans); }
body { font-family: var(--font-serif); }
@utility cm-serif { font-family: var(--font-serif); }
`;

describe("proof:font-cascade — pure helpers", () => {
    it("splitStack splits a font stack into family tokens", () => {
        expect(splitStack('"Plus Jakarta Sans", system-ui, sans-serif')).toEqual([
            '"Plus Jakarta Sans"',
            "system-ui",
            "sans-serif",
        ]);
    });

    it("tokenValue reads a declaration value", () => {
        expect(tokenValue(RECONCILED_TOKENS, "--font-stack-text")).toBe(
            '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif',
        );
    });

    it("deriveShipped collects every @font-face family", () => {
        const shipped = deriveShipped([SHIPPED_FONTS_CSS]);
        expect(shipped.has("plus jakarta sans")).toBe(true);
        expect(shipped.has("fira code")).toBe(true);
        expect(shipped.has("fraunces")).toBe(false);
    });

    it("bodyFontToken returns the body font-family var", () => {
        expect(bodyFontToken(RECONCILED_TYPOGRAPHY)).toBe("--font-text");
        expect(bodyFontToken(PREWAVE_TYPOGRAPHY)).toBe("--font-serif");
    });
});

describe("proof:font-cascade — default register (born-RED → GREEN)", () => {
    it("GREEN on the reconciled brand default", () => {
        const v = assertDefaultRegister({
            tokens: RECONCILED_TOKENS,
            typography: RECONCILED_TYPOGRAPHY,
            indexHtml: '<html lang="en">',
        });
        expect(v).toEqual([]);
    });

    it("RED when body reads a non-text serif register", () => {
        const v = assertDefaultRegister({
            tokens: RECONCILED_TOKENS,
            typography: "body { font-family: var(--font-serif); }",
            indexHtml: '<html lang="en">',
        });
        expect(v.some((x) => x.includes("body{} reads --font-serif"))).toBe(true);
    });

    it("RED when the default display token names Fraunces (the excised substrate)", () => {
        const v = assertDefaultRegister({
            tokens: PREWAVE_TOKENS,
            typography: RECONCILED_TYPOGRAPHY,
            indexHtml: '<html lang="en">',
        });
        expect(v.some((x) => x.includes("fraunces"))).toBe(true);
        expect(v.some((x) => x.includes("--font-stack-text is not declared"))).toBe(true);
    });

    it("RED when a data-typography-preset escape-hatch survives", () => {
        const v = assertDefaultRegister({
            tokens: RECONCILED_TOKENS,
            typography: PREWAVE_TYPOGRAPHY,
            indexHtml: '<html lang="en" data-typography-preset="brand-uniform-sans">',
        });
        expect(v.some((x) => x.includes("typography.css carries a `data-typography-preset`"))).toBe(true);
        expect(v.some((x) => x.includes("index.html carries a `data-typography-preset`"))).toBe(true);
    });
});

describe("proof:font-cascade — .cm-serif math voice survival", () => {
    it("GREEN — .cm-serif rides a distinct system serif", () => {
        expect(
            assertMathVoice({ tokens: RECONCILED_TOKENS, typography: RECONCILED_TYPOGRAPHY }),
        ).toEqual([]);
    });

    it("RED — .cm-serif collateral-deleted", () => {
        const v = assertMathVoice({ tokens: RECONCILED_TOKENS, typography: "body{}" });
        expect(v.some((x) => x.includes("collateral-deleted"))).toBe(true);
    });

    it("RED — the math register is the brand text face", () => {
        const tokens = RECONCILED_TOKENS.replace(
            '--font-stack-serif: Georgia, "Times New Roman", serif;',
            '--font-stack-serif: "Plus Jakarta Sans", serif;',
        );
        const v = assertMathVoice({ tokens, typography: RECONCILED_TYPOGRAPHY });
        expect(v.some((x) => x.includes("DISTINCT serif"))).toBe(true);
    });

    it("RED — the excised Fraunces survives on the math register", () => {
        const tokens = RECONCILED_TOKENS.replace(
            '--font-stack-serif: Georgia, "Times New Roman", serif;',
            '--font-stack-serif: "Fraunces", Georgia, serif;',
        );
        const v = assertMathVoice({ tokens, typography: RECONCILED_TYPOGRAPHY });
        expect(v.some((x) => x.includes("excised substrate cannot survive"))).toBe(true);
    });
});

describe("proof:font-cascade — canon pre-check (every named face paints)", () => {
    const shipped = deriveShipped([SHIPPED_FONTS_CSS]);

    it("GREEN — token stacks name shipped faces or generics", () => {
        expect(assertReferences(tokenStacks(RECONCILED_TOKENS), shipped)).toEqual([]);
    });

    it("RED — a non-shipped named face in a stack", () => {
        const v = assertReferences(
            [{ site: "FONT_OPTIONS", stack: '"Fraunces", Georgia, serif' }],
            shipped,
        );
        expect(v.some((x) => x.includes("Fraunces"))).toBe(true);
    });

    it("GREEN — a pure generic keyword stack", () => {
        const v = assertReferences(
            [{ site: "neutral", stack: "system-ui, -apple-system, sans-serif" }],
            shipped,
        );
        expect(v).toEqual([]);
    });
});
