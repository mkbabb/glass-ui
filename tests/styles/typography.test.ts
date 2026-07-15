import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const scale = readFileSync("src/styles/typography/scale.css", "utf8");
const semantic = readFileSync("src/styles/typography/semantic.css", "utf8");
const utilities = readFileSync("src/styles/typography/utilities.css", "utf8");
const storyHero = readFileSync("demo/chassis/hero/story-hero.css", "utf8");

describe("display typography weight", () => {
    it("routes the public display-weight override through the canonical utility token", () => {
        expect(scale).toMatch(/--font-display-weight:\s*600\s*;/);
        expect(scale).toMatch(
            /--type-weight-display:\s*var\(--font-display-weight\)\s*;/,
        );
        expect(semantic).toMatch(
            /@utility text-display[^}]+font-weight:\s*var\(--type-weight-display\)/s,
        );
    });
});

describe("semantic hierarchy", () => {
    it("keeps pane and chrome titles on the display scale and weight seams", () => {
        expect(utilities).toMatch(
            /\.text-pane-title\s*\{[^}]+font-size:\s*var\(--type-display-2\)[^}]+font-weight:\s*var\(--type-weight-display\)/s,
        );
        expect(storyHero).toMatch(
            /\.story-hero-title\.story-chrome-title\s*\{[^}]+font-weight:\s*var\(--type-weight-display\)[^}]+line-height:\s*var\(--type-leading-display\)/s,
        );
    });

    it("defines the numeric role with stable-width lining figures", () => {
        expect(utilities).toMatch(
            /\.tabular-nums\s*\{\s*font-variant-numeric:\s*tabular-nums lining-nums\s*;/,
        );
    });
});

describe("restrained colour events", () => {
    it("owns one logical accent rail without a local physical palette", () => {
        expect(storyHero).toMatch(
            /\.story-color-event\s*\{[^}]+border-inline-start:[^}]+var\(--section-label-accent/s,
        );
        expect(storyHero).not.toMatch(
            /\.constellation\.story-hero-bg--bleed\s*\{[^}]+--constellation-(?:node|node-dim|line):/s,
        );
    });
});
