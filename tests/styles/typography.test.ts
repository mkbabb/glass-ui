import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const scale = readFileSync("src/styles/typography/scale.css", "utf8");

describe("proportional headline and kicker", () => {
    it("publishes the exact 1/√φ proportional pair", () => {
        const ratio = Number(
            scale.match(/--type-proportional-ratio:\s*([\d.]+)/)?.[1],
        );
        const phi = (1 + Math.sqrt(5)) / 2;

        expect(ratio).toBeCloseTo(1 / Math.sqrt(phi), 15);
        expect(scale).toMatch(
            /--type-proportional-ratio:\s*0\.7861513777574233\s*;/,
        );
        expect(scale).toMatch(
            /--type-proportional-headline-size:\s*var\(--type-display-2\)\s*;/,
        );
        expect(scale).toMatch(
            /--type-proportional-kicker-size:\s*calc\(\s*var\(--type-proportional-headline-size\)\s*\*\s*var\(--type-proportional-ratio\)\s*\)\s*;/s,
        );
        expect(scale).toMatch(/--type-proportional-leading:\s*1\s*;/);
    });
});

/* BK.#33 — the Alert type ladder. Not a gate seat: one row into the standing typography
   suite, because the invariant is a proportion between two shipped tokens and the
   register that owns proportions is this file.

   THE DEFECT IT LOCKS OUT is not a size, it is a token CLASS. The alert root bound
   `--control-text` (= `--type-small` × `--ui-scale`, `tokens/sizing.css`) and the title
   inherited it, while the description bound the bare `--type-small`. `--ui-scale` is the
   coarse-pointer comfort scalar (1 fine, 1.5 coarse), so the title:body ratio was 1.00 on
   a mouse and 1.50 on a finger — the ladder inverted itself with the pointer class, and
   the coarse title reached 24.6px, which is what made a `line-clamp-1` look necessary.
   Reading BOTH steps off the content scale is what makes the ratio a constant:
   `--type-body` and `--type-small` share the same clamp shape and neither multiplies
   `--ui-scale`, so the ratio is 16/14 = 1.1428… at the floor and 1.375/1.25 = 1.10 at the
   ceiling, sitting on the ≈1.13 content step at both pointer classes.

   The row asserts the CLASS (no `--ui-scale` on either step, in the component source and
   in the token declarations) and the resulting floor ratio band, so re-binding either
   step to a control token REDs even if the rendered pixels happen to look similar at one
   viewport. */
/* Comments are stripped before every scan, and the strip is load-bearing rather than
   tidy: these rows assert the ABSENCE of two things (`--control-text`, `line-clamp-*`),
   and a source file that explains why it removed them names them in prose. Without the
   strip the rows are unsatisfiable by their own cut — a gate that can never go green,
   which is the mirror image of one that self-certifies. HTML comments for the template,
   block + line comments for the script. */
const stripSource = (text: string): string =>
    text
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");

const alertTitle = stripSource(
    readFileSync("src/components/alert/AlertTitle.vue", "utf8"),
);
const alertDescription = stripSource(
    readFileSync("src/components/alert/AlertDescription.vue", "utf8"),
);
const alertIndex = stripSource(readFileSync("src/components/alert/index.ts", "utf8"));

const clampFloorRem = (token: string): number => {
    const decl = scale.match(
        new RegExp(`--${token}:\\s*clamp\\(\\s*([\\d.]+)rem`, "s"),
    );
    return Number(decl?.[1]);
};

describe("alert type ladder — content scale on both steps, one constant ratio", () => {
    it("neither step is a control token, and neither multiplies --ui-scale", () => {
        // The title declares its own size off the content scale.
        expect(alertTitle).toMatch(/text-\[length:var\(--type-body\)\]/);
        // The description keeps the bare content token.
        expect(alertDescription).toMatch(/\btext-small\b/);
        // The root binds NO type size at all — bare slot content inherits page body type.
        expect(alertIndex).not.toMatch(/--control-text/);
        expect(alertTitle).not.toMatch(/--control-text/);
        // And the two tokens themselves are `--ui-scale`-free by declaration.
        for (const token of ["type-body", "type-small"]) {
            const decl = scale.match(new RegExp(`--${token}:\\s*([^;]*);`, "s"));
            expect(decl, `--${token} not declared in scale.css`).not.toBeNull();
            expect(decl![1]).not.toMatch(/--ui-scale/);
        }
    });

    it("the floor ratio lands on the content step [1.10, 1.20]", () => {
        const body = clampFloorRem("type-body");
        const small = clampFloorRem("type-small");
        expect(body).toBeGreaterThan(0);
        expect(small).toBeGreaterThan(0);
        const ratio = body / small;
        expect(ratio).toBeGreaterThanOrEqual(1.1);
        expect(ratio).toBeLessThanOrEqual(1.2);
    });

    it("the title is not clamped to one line", () => {
        expect(alertTitle).not.toMatch(/\bline-clamp-\d/);
    });
});
