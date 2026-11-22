// The collapsed face sizes to its content. One glyph is a circular pane (and, with the
// root's symmetric padding, a circular dock); a glyph and a short reading ("⌁ 12") or a
// word widen the pane instead of being clipped, and the settled dock is a stadium.
// jsdom has no layout, so this is a source detector; the engines measure the face in
// docs/release-11.1.0/lane-L1 (the probe, both engines, 390 and 1440).
// W-I.8 (C2-1), restated at the merge of 11.1.0 (RU-66): the face is as wide as its
// content (`max-content`) with a floor of its own height, which 11.1.0 wrote as a 1:1
// box with an `auto` inline minimum; the inline padding keeps words clear of the caps.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const morph = readFileSync(resolve(process.cwd(), "src/components/dock/styles/morph.css"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "");

describe("the collapsed face", () => {
    const rule = morph.match(/\.glass-dock \.dock-layer--summary\s*\{([^}]*)\}/)?.[1] ?? "";

    it("is as wide as its content, never narrower than it is tall", () => {
        expect(rule).toMatch(/inline-size:\s*max-content;/);
        expect(rule).toMatch(/min-inline-size:\s*var\(--dock-layer-height/);
        expect(rule).toMatch(/block-size:\s*var\(\s*--dock-collapsed-summary-min-size/);
        expect(rule).not.toMatch(/aspect-ratio/);
    });

    // W-I.8 RU-112: master's second case ("carries no padding or box model of its own", so the
    // 1:1 square held) in the redesign's form. A one-glyph face at or under the icon share is its
    // floor, and square: its inline padding is the room the floor leaves the glyph at the share,
    // never a fixed length (`0.5rem` made a 52 px face in a 40 px layer).
    it("pads its glyph by the room its floor leaves it, so one glyph is square", () => {
        expect(rule).toMatch(
            /padding-inline:\s*calc\(\s*\(\s*var\(--dock-layer-height,\s*2\.5rem\)\s*-\s*var\(--dock-control-glyph-size\)\s*\)\s*\/\s*2\s*\);/,
        );
        expect(rule).not.toMatch(/padding-inline:\s*[\d.]+(rem|px|em);/);
        expect(rule).not.toMatch(/box-sizing/);
    });
});
