import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

// W-B.19 — the depth sheet's static half of G-RESTRAINT and R-8/R-9/R-11. The rest
// of the gates read paint and are measured in a browser (docs/tranches/BL/design/depth).
const ROOT = process.cwd();
const SHEET = readFileSync(resolve(ROOT, "src/styles/depth.css"), "utf8");
// Comments carry prose ("no script", "the travel"), so the bans read the rules only.
const RULES = SHEET.replace(/\/\*[\s\S]*?\*\//g, "");

describe("depth.css", () => {
    it("is imported once, after the scroll registers", () => {
        const index = readFileSync(resolve(ROOT, "src/styles/index.css"), "utf8");
        const at = (s: string) => index.indexOf(`@import "./${s}"`);
        expect(index.match(/@import "\.\/depth\.css"/g)).toHaveLength(1);
        expect(at("depth.css")).toBeGreaterThan(at("scroll-choreography.css"));
        expect(at("scroll-choreography.css")).toBeGreaterThan(at("scroll-driven.css"));
    });

    it("adds no shading, mask, blend, pin, snap or layer hint", () => {
        for (const banned of [
            "mix-blend-mode",
            "mask",
            "clip-path",
            "filter",
            "box-shadow",
            "text-shadow",
            "gradient",
            "will-change",
            "sticky",
            "scroll-snap",
        ]) {
            expect(RULES, banned).not.toContain(banned);
        }
    });

    it("reads no clock: no spring and no duration token", () => {
        expect(RULES).not.toMatch(/--spring-|--duration-|transition/);
    });

    it("holds the lag at an eighth and the travel to the two bounds", () => {
        expect(RULES).toMatch(/:root\s*\{\s*--depth-lag:\s*0\.125;\s*\}/);
        // On the scene, so a scene's lower --depth-lag reaches it (a :root declaration
        // resolves its var() at the root and never sees the scene's value).
        expect(RULES).toMatch(
            /\.depth\s*\{\s*--depth-travel:\s*calc\(var\(--depth-lag\) \* min\(50lvb, 50cqi\)\);/,
        );
    });

    it("animates one property, translate, across the whole pass", () => {
        const frames = RULES.match(/@keyframes depth-lag\s*\{([\s\S]*?)\n {4}\}/);
        expect(frames).not.toBeNull();
        const props = [...frames![1].matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1]);
        expect(new Set(props)).toEqual(new Set(["translate"]));
        expect(RULES).toMatch(/animation-range:\s*cover;/);
        expect(RULES).toMatch(/animation:\s*depth-lag linear both;/);
    });

    it("binds the animation only under no-preference and a supporting engine", () => {
        const gate = RULES.indexOf("@media (prefers-reduced-motion: no-preference)");
        const supports = RULES.indexOf(
            "@supports ((animation-timeline: view()) and (animation-range: cover))",
        );
        const bind = RULES.indexOf("animation: depth-lag");
        expect(gate).toBeGreaterThan(-1);
        expect(supports).toBeGreaterThan(gate);
        expect(bind).toBeGreaterThan(supports);
        expect(RULES.match(/animation:/g)).toHaveLength(1);
    });

    it("stacks the three rungs in order inside an isolated scene", () => {
        expect(RULES).toMatch(/\.depth\s*\{[^}]*isolation:\s*isolate;/);
        expect(RULES).toMatch(/\[data-depth="behind"\]\s*\{\s*z-index:\s*var\(--z-background\);/);
        expect(RULES).toMatch(/\[data-depth="figure"\]\s*\{\s*z-index:\s*var\(--z-content\);/);
        expect(RULES).toMatch(
            /\[data-depth="front"\]\s*\{\s*z-index:\s*calc\(var\(--z-content\) \+ 1\);/,
        );
    });
});
