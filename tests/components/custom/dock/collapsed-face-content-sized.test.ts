// The collapsed face sizes to its content. One glyph is a square pane (and, with the
// root's symmetric padding, a circular dock); a glyph and a short reading ("⌁ 12") widen
// the pane instead of being clipped by a 1:1 box, and the settled dock is a stadium.
// jsdom has no layout, so this is a source detector; the engines measure the face in
// docs/release-11.1.0/lane-L1 (the probe, both engines, 390 and 1440).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const morph = readFileSync(resolve(process.cwd(), "src/components/dock/styles/morph.css"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "");

describe("the collapsed face", () => {
    const rule = morph.match(/\.glass-dock \.dock-layer--summary\s*\{([^}]*)\}/)?.[1] ?? "";

    // `aspect-ratio: 1` with an `auto` inline minimum: the ratio box's automatic minimum
    // is its min-content width, so wide content grows the pane. A length minimum lets
    // the ratio pin the width to the height and the content overflow (the 11.0.0 clip).
    it("is a 1:1 box whose inline minimum is its content", () => {
        expect(rule).toMatch(/aspect-ratio:\s*1;/);
        expect(rule).toMatch(/min-width:\s*auto;/);
        expect(rule).toMatch(/block-size:\s*var\(\s*--dock-collapsed-summary-min-size/);
    });

    // No padding of its own, so the 1:1 square holds under either box model.
    it("carries no padding or box model of its own", () => {
        expect(rule).not.toMatch(/padding|box-sizing/);
    });
});
